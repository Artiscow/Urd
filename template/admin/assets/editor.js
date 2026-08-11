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
var h = 1024, g = 2048, _ = 4096, v = 8192, y = 16384, b = 32768, x = 1 << 25, S = 65536, C = 1 << 19, w = 1 << 20, T = 1 << 25, ee = 65536, te = 1 << 21, ne = 1 << 22, re = 1 << 23, ie = Symbol("$state"), ae = Symbol("legacy props"), oe = Symbol(""), se = Symbol("attributes"), ce = Symbol("class"), le = Symbol("style"), ue = Symbol("text"), de = Symbol("form reset"), fe = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), pe = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
function me() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function he(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function ge(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function _e() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function ve(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function ye() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function be(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function xe() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Se() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function Ce() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function we() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
//#endregion
//#region node_modules/svelte/src/constants.js
var E = {}, D = Symbol("uninitialized"), O = "http://www.w3.org/1999/xhtml", k = "http://www.w3.org/2000/svg", Te = "http://www.w3.org/1998/Math/MathML";
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
	if (e === null) throw De(), E;
	return Ae = e;
}
function Me() {
	return je(/* @__PURE__ */ un(Ae));
}
function j(e) {
	if (A) {
		if (/* @__PURE__ */ un(Ae) !== null) throw De(), E;
		Ae = e;
	}
}
function Ne(e = 1) {
	if (A) {
		for (var t = e, n = Ae; t--;) n = /* @__PURE__ */ un(n);
		Ae = n;
	}
}
function Pe(e = !0) {
	for (var t = 0, n = Ae;;) {
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
function Fe(e) {
	if (!e || e.nodeType !== 8) throw De(), E;
	return e.data;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
function Ie(e) {
	return e === this.v;
}
function Le(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Re(e) {
	return !Le(e, this.v);
}
//#endregion
//#region node_modules/svelte/src/internal/shared/clone.js
var ze = [];
function Be(e, t = !1, n = !1) {
	return Ve(e, /* @__PURE__ */ new Map(), "", ze, null, n);
}
function Ve(t, n, r, i, a = null, o = !1) {
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
				d in t && (u[d] = Ve(f, n, r, i, null, o));
			}
			return u;
		}
		if (l(t) === s) {
			u = {}, n.set(t, u), a !== null && n.set(a, u);
			for (var p of Object.keys(t)) u[p] = Ve(t[p], n, r, i, null, o);
			return u;
		}
		if (t instanceof Date) return structuredClone(t);
		if (typeof t.toJSON == "function" && !o) return Ve(t.toJSON(), n, r, i, t);
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
var He = null;
function Ue(e) {
	He = e;
}
function We(e, t = !1, n) {
	He = {
		p: He,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: Kn,
		l: null
	};
}
function Ge(e) {
	var t = He, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) xn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, He = t.p, e ?? {};
}
function Ke() {
	return !0;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var qe = [];
function Je() {
	var e = qe;
	qe = [], f(e);
}
function Ye(e) {
	if (qe.length === 0 && !Mt) {
		var t = qe;
		queueMicrotask(() => {
			t === qe && Je();
		});
	}
	qe.push(e);
}
function Xe() {
	for (; qe.length > 0;) Je();
}
function Ze(e) {
	var t = Kn;
	if (t === null) return Un.f |= re, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	Qe(e, t);
}
function Qe(e, t) {
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
var $e = ~(g | _ | h);
function et(e, t) {
	e.f = e.f & $e | t;
}
function tt(e) {
	e.f & 512 || e.deps === null ? et(e, h) : et(e, _);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function nt(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= ee, nt(t.deps));
}
function rt(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), nt(e.deps), et(e, h);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var it = !1;
function at(e) {
	var t = it;
	try {
		return it = !1, [e(), it];
	} finally {
		it = t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
function ot(e, t) {
	if (t) {
		let t = document.body;
		e.autofocus = !0, Ye(() => {
			document.activeElement === t && e.focus();
		});
	}
}
function st(e) {
	A && /* @__PURE__ */ ln(e) !== null && dn(e);
}
var ct = !1;
function lt() {
	ct || (ct = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[de]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function ut(e) {
	var t = Un, n = Kn;
	Gn(null), qn(null);
	try {
		return e();
	} finally {
		Gn(t), qn(n);
	}
}
function dt(e, t, n, r = n) {
	e.addEventListener(t, () => ut(n));
	let i = e[de];
	e[de] = i ? () => {
		i(), r(!0);
	} : () => r(!0), lt();
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function ft(e) {
	let t = 0, n = Yt(0), r;
	return () => {
		vn() && (V(n), Tn(() => (t === 0 && (r = mr(() => e(() => $t(n)))), t += 1, () => {
			Ye(() => {
				--t, t === 0 && (r?.(), r = void 0, $t(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var pt = S | C;
function mt(e, t, n, r) {
	new ht(e, t, n, r);
}
var ht = class {
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
	#h = ft(() => (this.#m = Yt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = Kn;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = Kn.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = En(() => {
			if (A) {
				let e = this.#t;
				Me();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#y() : this.#g();
			} else this.#b();
		}, pt), A && (this.#e = Ae);
	}
	#g() {
		try {
			this.#a = Dn(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#v(e);
		Ye(r), t && (this.#s = Dn(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#v(e) {
		var t = !1, n = !1;
		let r = () => {
			if (t) {
				Oe();
				return;
			}
			t = !0, n && we(), this.#s !== null && Pn(this.#s, () => {
				this.#s = null;
			}), this.#S(() => {
				this.#b();
			});
		};
		return {
			reset: r,
			invoke_onerror: () => {
				try {
					n = !0, this.#n.onerror?.(e, r), n = !1;
				} catch (e) {
					Qe(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#y() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = Dn(() => e(this.#e)), Ye(() => {
			var e = this.#c = document.createDocumentFragment(), t = cn();
			e.append(t), this.#a = this.#S(() => Dn(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, Pn(this.#o, () => {
				this.#o = null;
			}), this.#x(Ot));
		}));
	}
	#b() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = Dn(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Rn(this.#a, e);
				let t = this.#n.pending;
				this.#o = Dn(() => t(this.#e));
			} else this.#x(Ot);
		} catch (e) {
			this.error(e);
		}
	}
	#x(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		rt(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#S(e) {
		var t = Kn, n = Un, r = He;
		qn(this.#i), Gn(this.#i), Ue(this.#i.ctx);
		try {
			return Rt.ensure(), e();
		} catch (e) {
			return Ze(e), null;
		} finally {
			qn(t), Gn(n), Ue(r);
		}
	}
	#C(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#C(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#x(t), this.#o && Pn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#C(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, Ye(() => {
			this.#d = !1, this.#m && Zt(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), V(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		Ot?.is_fork ? (this.#a && Ot.skip_effect(this.#a), this.#o && Ot.skip_effect(this.#o), this.#s && Ot.skip_effect(this.#s), Ot.oncommit(() => {
			this.#w(e);
		})) : this.#w(e);
	}
	#w(e) {
		this.#a &&= (jn(this.#a), null), this.#o &&= (jn(this.#o), null), this.#s &&= (jn(this.#s), null), A && (je(this.#t), Ne(), je(Pe()));
		let t = this.#n.failed, n = (e) => {
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && (this.#s = this.#S(() => {
				try {
					return Dn(() => {
						var r = Kn;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return Qe(e, this.#i.parent), null;
				}
			}));
		};
		Ye(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				Qe(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => Qe(e, this.#i && this.#i.parent)) : n(t);
		});
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function gt(e, t, n, r) {
	let i = Ke() ? yt : St;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = Kn, c = _t(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				Qe(e, s);
			}
			vt();
		}
	}
	var d = M();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ xt(e))).then(u).catch((e) => Qe(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), vt();
	}) : f();
}
function _t() {
	var e = Kn, t = Un, n = He, r = Ot;
	return function(i = !0) {
		qn(e), Gn(t), Ue(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function vt(e = !0) {
	qn(null), Gn(null), Ue(null), e && Ot?.deactivate();
}
function M() {
	var e = Kn, t = e.b, n = Ot, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function yt(e) {
	var t = 2 | g;
	return Kn !== null && (Kn.f |= C), {
		ctx: He,
		deps: null,
		effects: null,
		equals: Ie,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: D,
		wv: 0,
		parent: Kn,
		ac: null
	};
}
var bt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function xt(e, t, n) {
	let r = Kn;
	r === null && me();
	var i = void 0, a = Yt(D), o = !Un, s = /* @__PURE__ */ new Set();
	return wn(() => {
		var t = Kn, n = p();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== fe && n.reject(e);
			}).finally(vt);
		} catch (e) {
			n.reject(e), vt();
		}
		var c = Ot;
		if (o) {
			if (t.f & 32768) var l = M();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(bt);
			else for (let e of s.values()) e.reject(bt);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== bt && (c.activate(), t ? (a.f |= re, Zt(a, t)) : (a.f & 8388608 && (a.f ^= re), Zt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), yn(() => {
		for (let e of s) e.reject(bt);
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
	let t = /* @__PURE__ */ yt(e);
	return Yn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function St(e) {
	let t = /* @__PURE__ */ yt(e);
	return t.equals = Re, t;
}
function Ct(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) jn(t[n]);
	}
}
function wt(e) {
	var t, n = Kn, r = e.parent;
	if (!Vn && r !== null && e.v !== D && r.f & 24576) return Ee(), e.v;
	qn(r);
	try {
		e.f &= ~ee, Ct(e), t = sr(e);
	} finally {
		qn(n);
	}
	return t;
}
function Tt(e) {
	var t = wt(e);
	if (!e.equals(t) && (e.wv = ir(), (!Ot?.is_fork || e.deps === null) && (Ot === null ? e.v = t : (Ot.capture(e, t, !0), kt?.capture(e, t, !0)), e.deps === null))) {
		et(e, h);
		return;
	}
	Vn || (At === null ? tt(e) : (vn() || Ot?.is_fork) && At.set(e, t));
}
function Et(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && ut(() => {
		t.ac.abort(fe), t.ac = null;
	}), t.fn !== null && (t.teardown = d), lr(t, 0), kn(t));
}
function P(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && ur(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var Dt = null, Ot = null, kt = null, At = null, jt = null, Mt = !1, Nt = !1, Pt = null, Ft = null, It = 0, Lt = 1, Rt = class e {
	id = Lt++;
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
			for (var r of n.d) et(r, g), t(r);
			for (r of n.m) et(r, _), t(r);
		}
		this.#p.add(e);
	}
	#g() {
		this.#e = !0, It++ > 1e3 && (this.#x(), Bt());
		for (let e of this.#u) this.#d.delete(e), et(e, g), this.schedule(e);
		for (let e of this.#d) et(e, _), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = Pt = [], r = [], i = Ft = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw Gt(e), this.#h() || this.discard(), t;
		}
		if (Ot = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (Pt = null, Ft = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) Wt(e, t);
			i.length > 0 && Ot.#g();
			return;
		}
		let o = this.#v();
		if (o) {
			this.#b(r), this.#b(n), o.#y(this);
			return;
		}
		this.#u.clear(), this.#d.clear();
		for (let e of this.#r) e(this);
		this.#r.clear(), kt = this, Ht(r), Ht(n), kt = null, this.#s?.resolve();
		var s = Ot;
		if (this.#a === 0 && (this.#c.length === 0 || s !== null) && this.#x(), this.#c.length > 0) if (s !== null) {
			let e = s;
			e.#c.push(...this.#c.filter((t) => !e.#c.includes(t)));
		} else s = this;
		s !== null && s.#g();
	}
	#_(e, t, n) {
		e.f ^= h;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), et(i, g), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#x(), Ot = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) rt(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== D && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), At?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		Ot = this;
	}
	deactivate() {
		Ot = null, At = null;
	}
	flush() {
		try {
			Nt = !0, Ot = this, this.#g();
		} finally {
			It = 0, jt = null, Pt = null, Ft = null, Nt = !1, Ot = null, At = null, qt.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(bt);
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
		this.#m || (this.#m = !0, Ye(() => {
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
		if (Ot === null) {
			let t = Ot = new e();
			!Nt && !Mt && Ye(() => {
				t.#e || t.flush();
			});
		}
		return Ot;
	}
	apply() {
		At = null;
	}
	schedule(e) {
		if (jt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if (Pt !== null && t === Kn && (Un === null || !(Un.f & 2))) return;
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
function zt(e) {
	var t = Mt;
	Mt = !0;
	try {
		var n;
		for (e && (Ot !== null && !Ot.is_fork && Ot.flush(), n = e());;) {
			if (Xe(), Ot === null) return n;
			Ot.flush();
		}
	} finally {
		Mt = t;
	}
}
function Bt() {
	try {
		ye();
	} catch (e) {
		Qe(e, jt);
	}
}
var Vt = null;
function Ht(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && ar(r) && (Vt = /* @__PURE__ */ new Set(), ur(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Nn(r), Vt?.size > 0)) {
				qt.clear();
				for (let e of Vt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Vt.has(n) && (Vt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || ur(n);
					}
				}
				Vt.clear();
			}
		}
		Vt = null;
	}
}
function Ut(e) {
	Ot.schedule(e);
}
function Wt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), et(e, h);
		for (var n = e.first; n !== null;) Wt(n, t), n = n.next;
	}
}
function Gt(e) {
	et(e, h);
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
		equals: Ie,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function F(e, t) {
	let n = Yt(e, t);
	return Yn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Xt(e, t = !1, n = !0) {
	let r = Yt(e);
	return t || (r.equals = Re), r;
}
function I(e, t, n = !1) {
	return Un !== null && (!Wn || Un.f & 131072) && Ke() && Un.f & 4325394 && (Jn === null || !Jn.has(e)) && Ce(), Zt(e, n ? tn(t) : t, Ft);
}
function Zt(e, t, n = null) {
	if (!e.equals(t)) {
		qt.set(e, Vn ? t : e.v);
		var r = Rt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && wt(t), At === null && tt(t);
		}
		e.wv = ir(), en(e, g, n), Ke() && Kn !== null && Kn.f & 1024 && !(Kn.f & 96) && (Qn === null ? $n([e]) : Qn.push(e)), !r.is_fork && Kt.size > 0 && !Jt && Qt();
	}
	return t;
}
function Qt() {
	Jt = !1;
	for (let e of Kt) {
		e.f & 1024 && et(e, _);
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
	I(e, e.v + 1);
}
function en(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Ke(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === Kn)) {
			var l = (c & g) === 0;
			if (l && et(s, t), c & 131072) Kt.add(s);
			else if (c & 2) {
				var u = s;
				At?.delete(u), c & 65536 || (c & 512 && (Kn === null || !(Kn.f & 2097152)) && (s.f |= ee), en(u, _, n));
			} else if (l) {
				var d = s;
				c & 16 && Vt !== null && Vt.add(d), n === null ? Ut(d) : n.push(d);
			}
		}
	}
}
function tn(t) {
	if (typeof t != "object" || !t || ie in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ F(0), u = null, d = nr, f = (e) => {
		if (nr === d) return e();
		var t = Un, n = nr;
		Gn(null), rr(d);
		var r = e();
		return Gn(t), rr(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ F(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && xe();
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
					let e = f(() => /* @__PURE__ */ F(D, u));
					r.set(t, e), $t(o);
				}
			} else I(n, D), $t(o);
			return !0;
		},
		get(e, n, i) {
			if (n === ie) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ F(tn(s ? e[n] : D), u)), r.set(n, o)), o !== void 0) {
				var c = V(o);
				return c === D ? void 0 : c;
			}
			return Reflect.get(e, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			var n = Reflect.getOwnPropertyDescriptor(e, t);
			if (n && "value" in n) {
				var i = r.get(t);
				i && (n.value = V(i));
			} else if (n === void 0) {
				var a = r.get(t), o = a?.v;
				if (a !== void 0 && o !== D) return {
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
			var n = r.get(t), i = n !== void 0 && n.v !== D || Reflect.has(e, t);
			return (n !== void 0 || Kn !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ F(i ? tn(e[t]) : D, u)), r.set(t, n)), V(n) === D) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ F(D, u)), r.set(d + "", p)) : I(p, D);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ F(void 0, u)), I(c, tn(n)), r.set(t, c));
			else {
				l = c.v !== D;
				var m = f(() => tn(n));
				I(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && I(g, _ + 1);
				}
				$t(o);
			}
			return !0;
		},
		ownKeys(e) {
			V(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== D;
			});
			for (var [n, i] of r) i.v !== D && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			Se();
		}
	});
}
var nn, rn, an, on;
function sn() {
	if (nn === void 0) {
		nn = window, rn = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		an = a(t, "firstChild").get, on = a(t, "nextSibling").get, u(e) && (e[ce] = void 0, e[se] = null, e[le] = void 0, e.__e = void 0), u(n) && (n[ue] = void 0);
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
function L(e, t) {
	if (!A) return /* @__PURE__ */ ln(e);
	var n = /* @__PURE__ */ ln(Ae);
	if (n === null) n = Ae.appendChild(cn());
	else if (t && n.nodeType !== 3) {
		var r = cn();
		return n?.before(r), je(r), r;
	}
	return t && mn(n), je(n), n;
}
function R(e, t = !1) {
	if (!A) {
		var n = /* @__PURE__ */ ln(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ un(n) : n;
	}
	if (t) {
		if (Ae?.nodeType !== 3) {
			var r = cn();
			return Ae?.before(r), je(r), r;
		}
		mn(Ae);
	}
	return Ae;
}
function z(e, t = 1, n = !1) {
	let r = A ? Ae : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ un(r);
	if (!A) return r;
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
	Kn === null && (Un === null && ve(e), _e()), Vn && ge(e);
}
function gn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function _n(e, t) {
	var n = Kn;
	n !== null && n.f & 8192 && (e |= v);
	var r = {
		ctx: He,
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
	Ot?.register_created_effect(r);
	var i = r;
	if (e & 4) Pt === null ? Rt.ensure().schedule(r) : Pt.push(r);
	else if (t !== null) {
		try {
			ur(r);
		} catch (e) {
			throw jn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= S));
	}
	if (i !== null && (i.parent = n, n !== null && gn(i, n), Un !== null && Un.f & 2 && !(e & 64))) {
		var a = Un;
		(a.effects ??= []).push(i);
	}
	return r;
}
function vn() {
	return Un !== null && !Wn;
}
function yn(e) {
	let t = _n(8, null);
	return et(t, h), t.teardown = e, t;
}
function bn(e) {
	hn("$effect");
	var t = Kn.f;
	if (!Un && t & 32 && He !== null && !He.i) {
		var n = He;
		(n.e ??= []).push(e);
	} else return xn(e);
}
function xn(e) {
	return _n(4 | w, e);
}
function Sn(e) {
	Rt.ensure();
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
	return _n(ne | C, e);
}
function Tn(e, t = 0) {
	return _n(8 | t, e);
}
function B(e, t = [], n = [], r = []) {
	gt(r, t, n, (t) => {
		_n(8, () => {
			e(...t.map(V));
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
		let e = Vn, n = Un;
		Hn(!0), Gn(null);
		try {
			t.call(null);
		} finally {
			Hn(e), Gn(n);
		}
	}
}
function kn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && ut(() => {
			e.abort(fe);
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
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Mn(e.nodes.start, e.nodes.end), n = !0), e.f |= x, kn(e, t && !n), lr(e, 0);
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
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
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
		e.f ^= v, e.f & 1024 || (et(e, g), Rt.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
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
var Un = null, Wn = !1;
function Gn(e) {
	Un = e;
}
var Kn = null;
function qn(e) {
	Kn = e;
}
var Jn = null;
function Yn(e) {
	Un !== null && (Jn ??= /* @__PURE__ */ new Set()).add(e);
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
	if (t & 2 && (e.f &= ~ee), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (ar(a) && Tt(a), a.wv > e.wv) return !0;
		}
		t & 512 && At === null && et(e, h);
	}
	return !1;
}
function or(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Jn !== null && Jn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? or(a, t, !1) : t === a && (n ? et(a, g) : a.f & 1024 && et(a, _), Ut(a));
	}
}
function sr(e) {
	var t = Xn, n = Zn, r = Qn, i = Un, a = Jn, o = He, s = Wn, c = nr, l = e.f;
	Xn = null, Zn = 0, Qn = null, Un = l & 96 ? null : e, Jn = null, Ue(e.ctx), Wn = !1, nr = ++tr, e.ac !== null && (ut(() => {
		e.ac.abort(fe);
	}), e.ac = null);
	try {
		e.f |= te;
		var u = e.fn, d = u();
		e.f |= b;
		var f = e.deps, p = Ot?.is_fork;
		if (Xn !== null) {
			var m;
			if (p || lr(e, Zn), f !== null && Zn > 0) for (f.length = Zn + Xn.length, m = 0; m < Xn.length; m++) f[Zn + m] = Xn[m];
			else e.deps = f = Xn;
			if (vn() && e.f & 512) for (m = Zn; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && Zn < f.length && (lr(e, Zn), f.length = Zn);
		if (Ke() && Qn !== null && !Wn && f !== null && !(e.f & 6146)) for (m = 0; m < Qn.length; m++) or(Qn[m], e);
		if (i !== null && i !== e) {
			if (tr++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = tr;
			if (t !== null) for (let e of t) e.rv = tr;
			Qn !== null && (r === null ? r = Qn : r.push(...Qn));
		}
		return e.f & 8388608 && (e.f ^= re), d;
	} catch (e) {
		return Ze(e);
	} finally {
		e.f ^= te, Xn = t, Zn = n, Qn = r, Un = i, Jn = a, Ue(o), Wn = s, nr = c;
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
		s.f & 512 && (s.f ^= 512, s.f &= ~ee), s.v !== D && tt(s), s.ac !== null && ut(() => {
			s.ac.abort(fe), s.ac = null, et(s, g);
		}), Et(s), lr(s, 0);
	}
}
function lr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) cr(e, n[r]);
}
function ur(e) {
	var t = e.f;
	if (!(t & 16384)) {
		et(e, h);
		var n = Kn, r = Bn;
		Kn = e, Bn = !(t & 96);
		try {
			t & 16777232 ? An(e) : kn(e), On(e);
			var i = sr(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = er;
		} finally {
			Bn = r, Kn = n;
		}
	}
}
async function dr() {
	await Promise.resolve(), zt();
}
function V(e) {
	var t = !!(e.f & 2);
	if (zn?.add(e), Un !== null && !Wn && !(Kn !== null && Kn.f & 16384) && (Jn === null || !Jn.has(e))) {
		var r = Un.deps;
		if (Un.f & 2097152) e.rv < tr && (e.rv = tr, Xn === null && r !== null && r[Zn] === e ? Zn++ : Xn === null ? Xn = [e] : Xn.push(e));
		else {
			Un.deps ??= [], n.call(Un.deps, e) || Un.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [Un] : n.call(i, Un) || i.push(Un);
		}
	}
	if (Vn && qt.has(e)) return qt.get(e);
	if (t) {
		var a = e;
		if (Vn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || pr(a)) && (o = wt(a)), qt.set(a, o), o;
		}
		var s = !(a.f & 512) && !Wn && Un !== null && (Bn || !!(Un.f & 512)), c = (a.f & b) === 0;
		ar(a) && (s && (a.f |= 512), Tt(a)), s && !c && (P(a), fr(a));
	}
	if (At?.has(e)) return At.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function fr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (P(t), fr(t));
}
function pr(e) {
	if (e.v === D) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (qt.has(t) || t.f & 2 && pr(t)) return !0;
	return !1;
}
function mr(e) {
	var t = Wn;
	try {
		return Wn = !0, e();
	} finally {
		Wn = t;
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
	if (!A) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function xr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Tr.call(t, e), !e.cancelBubble) return ut(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Ye(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function Sr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = xr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && yn(() => {
		t.removeEventListener(e, o, a);
	});
}
function H(e, t, n) {
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
		var d = Un, f = Kn;
		Gn(null), qn(null);
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
			e[_r] = t, delete e.currentTarget, Gn(d), qn(f);
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
	var t = pn("template");
	return t.innerHTML = Dr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function kr(e, t) {
	var n = Kn;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function U(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (A) return kr(Ae, null), Ae;
		i === void 0 && (i = Or(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ ln(i)));
		var t = r || rn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ ln(t), s = t.lastChild;
			kr(o, s);
		} else kr(t, t);
		return t;
	};
}
function Ar(e = "") {
	if (!A) {
		var t = cn(e + "");
		return kr(t, t), t;
	}
	var n = Ae;
	return n.nodeType === 3 ? mn(n) : (n.before(n = cn()), je(n)), kr(n, n), n;
}
function jr() {
	if (A) return kr(Ae, null), Ae;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = cn();
	return e.append(t, n), kr(t, n), e;
}
function W(e, t) {
	if (A) {
		var n = Kn;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = Ae), Me();
		return;
	}
	e !== null && e.before(t);
}
function G(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[ue] ??= e.nodeValue) && (e[ue] = n, e.nodeValue = `${n}`);
}
function Mr(e, t) {
	return Pr(e, t);
}
var Nr = /* @__PURE__ */ new Map();
function Pr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	sn();
	var l = void 0, u = Sn(() => {
		var s = n ?? t.appendChild(cn());
		mt(s, { pending: () => {} }, (t) => {
			We({});
			var n = He;
			if (o && (n.c = o), a && (i.$$events = a), A && kr(t, null), l = e(t, i) || {}, A && (Kn.nodes.end = Ae, Ae === null || Ae.nodeType !== 8 || Ae.data !== "]")) throw De(), E;
			Ge();
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
		var n = Ot, r = fn();
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
		} else A && (this.anchor = Ae), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function K(e, t, n = !1) {
	var r;
	A && (r = Ae, Me());
	var i = new Ir(e), a = n ? S : 0;
	function o(e, t) {
		if (A) {
			var n = Fe(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Pe();
				je(a), i.anchor = a, ke(!1), i.ensure(e, t), ke(!0);
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
function Lr(e, t) {
	return t;
}
function Rr(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		Pn(n, () => {
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
			dn(d), d.append(u), e.items.clear();
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
		r?.has(a) ? (a.f |= T, Rn(a, document.createDocumentFragment())) : jn(t[i], n);
	}
}
var Br;
function Vr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = A ? je(/* @__PURE__ */ ln(u)) : u.appendChild(cn());
	}
	A && Me();
	var d = null, f = /* @__PURE__ */ St(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Ur(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= T, Gr(d, null, c)) : In(d) : Pn(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: En(() => {
			p = V(f);
			var e = p.length;
			let t = !1;
			A && Fe(c) === "[!" != (e === 0) && (c = Pe(), je(c), ke(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = Ot, v = fn(), y = 0; y < e; y += 1) {
				A && Ae.nodeType === 8 && Ae.data === "]" && (c = Ae, t = !0, ke(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Zt(S.v, b), S.i && Zt(S.i, y), v && u.unskip_effect(S.e)) : (S = Wr(l, h ? c : Br ??= cn(), b, x, y, o, n, i), h || (S.e.f |= T), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = Dn(() => s(c)) : (d = Dn(() => s(Br ??= cn())), d.f |= T)), e > r.size && he("", "", ""), A && e > 0 && je(Pe()), !h) if (m.set(u, r), v) {
				for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
				u.oncommit(g), u.ondiscard(_);
			} else g(u);
			t && ke(!0), V(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, A && (c = Ae);
}
function Hr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Ur(e, t, n, i, a) {
	var o = !!(i & 8), s = t.length, c = e.items, l = Hr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (In(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= T, _ === l) Gr(_, null, n);
		else {
			var y = d ? d.next : l;
			_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Kr(e, d, _), Kr(e, _, y), Gr(_, y, n), d = _, p = [], m = [], l = Hr(d.next);
			continue;
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Gr(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Kr(e, S.prev, C.next), Kr(e, d, S), Kr(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), Gr(_, l, n), Kr(e, _.prev, _.next), Kr(e, _, d === null ? e.effect.first : d.next), Kr(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = Hr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = Hr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (zr(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var w = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || w.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && w.push(l), l = Hr(l.next);
		var ee = w.length;
		if (ee > 0) {
			var te = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < ee; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < ee; v += 1) w[v].nodes?.a?.fix();
			}
			Rr(e, w, te);
		}
	}
	o && Ye(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Wr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Yt(n) : /* @__PURE__ */ Xt(n, !1, !1) : null, l = o & 2 ? Yt(i) : null;
	return {
		v: c,
		i: l,
		e: Dn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Gr(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ un(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Kr(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function q(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		A && (o = je(/* @__PURE__ */ ln(c)));
	}
	B(() => {
		var e = Kn;
		if (s === (s = t() ?? "")) {
			A && Me();
			return;
		}
		if (n && !A) {
			e.nodes = null, c.innerHTML = s, s !== "" && kr(/* @__PURE__ */ ln(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (Mn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (A) {
				for (var a = Ae.data, l = Me(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ un(l);
				if (l === null) throw De(), E;
				kr(Ae, u), o = je(l);
				return;
			}
			var d = pn(r ? "svg" : i ? "math" : "template", r ? k : i ? Te : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (kr(/* @__PURE__ */ ln(f), f.lastChild), r || i) for (; /* @__PURE__ */ ln(f);) o.before(/* @__PURE__ */ ln(f));
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
	var o = e[ce];
	if (A || o !== n || o === void 0) {
		var s = Jr(n, r, a);
		(!A || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[ce] = n;
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
	var i = e[le];
	if (A || i !== t) {
		var a = Zr(t, r);
		(!A || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[le] = t;
	} else r && (Array.isArray(r) ? ($r(e, n?.[0], r[0]), $r(e, n?.[1], r[1], "important")) : $r(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var ti = Symbol("is custom element"), ni = Symbol("is html"), ri = pe ? "link" : "LINK", ii = pe ? "progress" : "PROGRESS";
function J(e) {
	if (A) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					X(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					X(e, "checked", null), e.checked = r;
				}
			}
		};
		e[de] = n, Ye(n), lt();
	}
}
function Y(e, t) {
	var n = oi(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === ii) && (e.value = t ?? "");
}
function ai(e, t) {
	var n = oi(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function X(e, t, n, r) {
	var i = oi(e);
	A && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === ri) || i[t] !== (i[t] = n) && (t === "loading" && (e[oe] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && ci(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function oi(e) {
	return e[se] ??= {
		[ti]: e.nodeName.includes("-"),
		[ni]: e.namespaceURI === O
	};
}
var si = /* @__PURE__ */ new Map();
function ci(e) {
	var t = e.getAttribute("is") || e.nodeName, n = si.get(t);
	if (n) return n;
	si.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.push(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function li(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	dt(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = ui(e) ? di(a) : a, n(a), Ot !== null && r.add(Ot), await dr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (A && e.defaultValue !== e.value || mr(t) == null && e.value) && (n(ui(e) ? di(e.value) : e.value), Ot !== null && r.add(Ot)), Tn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = Ot;
			if (r.has(i)) return;
		}
		ui(e) && n === di(e.value) || e.type === "date" && !n && !e.value || n !== e.value && (e.value = n ?? "");
	});
}
function ui(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function di(e) {
	return e === "" ? null : +e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function fi(e, t) {
	return e === t || e?.[ie] === t;
}
function pi(e = {}, t, n, r) {
	var i = He.r, a = Kn;
	return Cn(() => {
		var o, s;
		return Tn(() => {
			o = s, s = r?.() || [], mr(() => {
				fi(n(...s), e) || (t(e, ...s), o && fi(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && fi(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
function mi(e, t, n, r) {
	var i = !0, o = !!(n & 8), s = !!(n & 16), c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ yt(r), V(u)) : (l && (l = !1, c = s ? mr(r) : r), c);
	let f;
	if (o) {
		var p = ie in e || ae in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = at(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && be(t), f(m)));
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
	var v = !1, y = (n & 1 ? yt : St)(() => (v = !1, g()));
	o && V(y);
	var b = Kn;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? V(y) : i && o ? tn(e) : e;
			return I(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Vn && v || b.f & 16384 ? y.v : V(y);
	});
}
var hi = {
	lang: "nb",
	strings: {
		"nav.toFront": "Til forsiden",
		"nav.toLightTheme": "Bytt til lyst tema",
		"nav.toDarkTheme": "Bytt til mørkt tema",
		"nav.menu": "Meny",
		"nav.submenuFor": "Undermeny for {label}",
		"nav.toTop": "Til toppen",
		"nav.toTopFull": "Til toppen av siden",
		"lightbox.prev": "Forrige bilde",
		"lightbox.next": "Neste bilde",
		"lightbox.close": "Lukk",
		"footer.readMore": "Les mer",
		"footer.newsletter.subscribe": "Meld på",
		"footer.newsletter.success": "Takk, du er påmeldt!",
		"footer.newsletter.emailPlaceholder": "din@epost.no",
		"footer.newsletter.emailLabel": "E-postadresse",
		"footer.newsletter.invalidEmail": "Skriv inn en gyldig e-postadresse.",
		"footer.newsletter.sendFailed": "Kunne ikke sende akkurat nå. Prøv igjen senere.",
		"footer.newsletter.missingTarget": "Nyhetsbrevet mangler mottaker eller endepunkt.",
		"footer.newsletter.mailtoSubject": "Nyhetsbrev-påmelding",
		"footer.newsletter.mailtoBody": "Meld på nyhetsbrevet: {email}",
		"gallery.prevImages": "Forrige bilder",
		"gallery.nextImages": "Neste bilder",
		"gallery.prevImage": "Forrige bilde",
		"gallery.nextImage": "Neste bilde",
		"gallery.imageN": "Bilde {n}",
		"video.unknownUrl": "Ukjent videolenke (YouTube og Vimeo støttes)",
		"video.emptyHint": "Lim inn en YouTube- eller Vimeo-lenke i Egenskaper",
		"render.missingPlugin": "Blokktypen '{type}' er ikke tilgjengelig (mangler plugin eller nyere Urd?)"
	},
	dates: {
		months: [
			"januar",
			"februar",
			"mars",
			"april",
			"mai",
			"juni",
			"juli",
			"august",
			"september",
			"oktober",
			"november",
			"desember"
		],
		monthsShort: [
			"jan",
			"feb",
			"mar",
			"apr",
			"mai",
			"jun",
			"jul",
			"aug",
			"sep",
			"okt",
			"nov",
			"des"
		],
		weekdays: [
			"mandag",
			"tirsdag",
			"onsdag",
			"torsdag",
			"fredag",
			"lørdag",
			"søndag"
		],
		weekdaysShort: [
			"man",
			"tir",
			"ons",
			"tor",
			"fre",
			"lør",
			"søn"
		]
	}
}, gi = [
	"nb",
	"nn",
	"en-GB",
	"se",
	"tr"
], _i = /^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/, vi = {
	nb: [
		"no",
		"nor",
		"nb",
		"nob"
	],
	nn: ["nn", "nno"],
	se: [
		"se",
		"sme",
		"smj",
		"sma"
	],
	tr: ["tr", "tur"],
	"en-GB": ["en", "eng"]
};
function yi(e) {
	let t = String(e ?? "").trim().toLowerCase();
	for (let [e, n] of Object.entries(vi)) if (n.some((e) => t === e || t.startsWith(`${e}-`))) return e;
	return null;
}
function bi(e) {
	return gi.includes(String(e ?? ""));
}
function xi(e) {
	let t = [];
	if (!Array.isArray(e)) return ["languages må være en liste"];
	for (let n of e) {
		if (!n || typeof n != "object" || Array.isArray(n)) {
			t.push("languages: hvert innslag må være et objekt");
			continue;
		}
		let e = String(n.code ?? "");
		_i.test(e) ? bi(e) && t.push(`languages: '${e}' er innebygd i Urd og kan ikke overstyres`) : t.push(`languages: '${e}' er ikke en gyldig språkkode`), (typeof n.name != "string" || !n.name.trim()) && t.push(`languages/${e}: name mangler (språkets eget navn)`);
		for (let r of ["site", "admin"]) n[r] !== void 0 && typeof n[r] != "boolean" && t.push(`languages/${e}: ${r} må være boolsk`);
		n.site !== !0 && n.admin !== !0 && t.push(`languages/${e}: må dekke site, admin eller begge`);
	}
	return t;
}
function Si(e) {
	let t = yi(e);
	if (t) return t;
	let n = String(e ?? "").trim();
	return _i.test(n) ? n : "nb";
}
async function Ci(e, t) {
	try {
		return await (await import(
			/* @vite-ignore */
			"/assets/urd/language-packs.js"
)).loadPackStrings(e, t);
	} catch {
		return null;
	}
}
({ ...hi.strings });
var wi = {
	lang: "nb",
	dict: {}
};
function Ti(e, t) {
	if (!t) return e;
	let n = e;
	for (let [e, r] of Object.entries(t)) n = n.replaceAll(`{${e}}`, String(r));
	return n;
}
function Z(e, t) {
	return Ti(wi.dict[e] ?? e, t);
}
function Ei(e) {
	let t = `api.${e?.code}`;
	return e?.code && wi.dict[t] !== void 0 ? Ti(wi.dict[t], e) : e?.error ?? null;
}
function Di() {
	return wi.lang;
}
function Oi() {
	let e = null;
	try {
		e = localStorage.getItem("urd-admin-lang");
	} catch {}
	if (e) return Si(e);
	for (let e of navigator.languages ?? [navigator.language]) {
		let t = yi(e);
		if (t) return t;
	}
	return "en-GB";
}
var ki;
new Promise((e) => {
	ki = e;
});
async function Ai(e = Oi()) {
	let t = async (e) => (await import(
		/* @vite-ignore */
		`/assets/urd/locales/admin/${e}.js`
)).default.strings;
	wi.lang = Si(e);
	let n = bi(wi.lang);
	try {
		Object.assign(wi.dict, await t("nb")), n && wi.lang !== "nb" && Object.assign(wi.dict, await t(wi.lang));
	} catch {}
	if (!n) {
		let e = await Ci(wi.lang, "admin");
		e ? Object.assign(wi.dict, e) : wi.lang = "nb";
	}
	return ki(wi.lang), wi.lang;
}
//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region src/lib/draftStore.js
function ji(e, t, n) {
	let r = t(), i = JSON.stringify(r), a = JSON.parse(i), o = localStorage.getItem(e);
	if (o) try {
		a = JSON.parse(o);
	} catch {
		localStorage.removeItem(e);
	}
	return {
		get data() {
			return a;
		},
		save() {
			let t = JSON.stringify(a);
			if (t === i) return localStorage.removeItem(e), !0;
			try {
				return localStorage.setItem(e, t), !0;
			} catch (e) {
				return n?.(e), !1;
			}
		},
		reset() {
			return localStorage.removeItem(e), a = JSON.parse(i), a;
		},
		replace(e) {
			return a = e, a;
		},
		amendBaseline(e) {
			let t = JSON.parse(i);
			e(t), i = JSON.stringify(t);
		},
		hasDraft() {
			return localStorage.getItem(e) !== null;
		}
	};
}
//#endregion
//#region src/lib/ColorPicker.svelte
var Mi = /* @__PURE__ */ U("<button type=\"button\" class=\"cp-clear svelte-zxiloo\">×</button>"), Ni = /* @__PURE__ */ U("<button type=\"button\" class=\"cp-eye svelte-zxiloo\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), Pi = /* @__PURE__ */ U("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), Fi = /* @__PURE__ */ U("<button type=\"button\"></button>"), Ii = /* @__PURE__ */ U("<span class=\"cp-label svelte-zxiloo\"> <!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Li = /* @__PURE__ */ U("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\">×</button></span>"), Ri = /* @__PURE__ */ U("<span class=\"cp-tokens svelte-zxiloo\"></span>"), zi = /* @__PURE__ */ U("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), Bi = /* @__PURE__ */ U("<span class=\"cp-label svelte-zxiloo\"> </span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Vi = /* @__PURE__ */ U("<div class=\"cp-pop svelte-zxiloo\"><div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\"> <button type=\"button\" class=\"cp-add svelte-zxiloo\">+</button></span> <!> <!></div>"), Hi = /* @__PURE__ */ U("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!> <!></span>");
function Ui(e, t) {
	We(t, !0);
	let n = mi(t, "value", 3, "#000000"), r = mi(t, "tokens", 19, () => []), i = mi(t, "label", 19, () => Z("cp.pickColor")), a = mi(t, "allowClear", 3, !1), o = "urd-recent-colors", s = "urd-saved-colors", c = () => {
		let e = r().find(([e]) => e === n());
		return e ? e[1] : n();
	}, l = () => r().find(([e]) => e === n())?.[0] ?? null, u = /* @__PURE__ */ F(tn([])), d = /* @__PURE__ */ F(tn([])), f = "", p = "", h = /* @__PURE__ */ F(null), g = /* @__PURE__ */ F(!1), _ = /* @__PURE__ */ F(tn({
		top: 0,
		left: 0
	})), v = /* @__PURE__ */ F(0), y = /* @__PURE__ */ F(0), b = /* @__PURE__ */ F(1), x = /* @__PURE__ */ F(1), S = /* @__PURE__ */ F("#000000");
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
	let w = (e, t, n) => "#" + [
		e,
		t,
		n
	].map((e) => e.toString(16).padStart(2, "0")).join("");
	function T(e, t, n) {
		e /= 255, t /= 255, n /= 255;
		let r = Math.max(e, t, n), i = r - Math.min(e, t, n), a = 0;
		return i && (a = r === e ? (t - n) / i % 6 : r === t ? (n - e) / i + 2 : (e - t) / i + 4, a *= 60, a < 0 && (a += 360)), [
			a,
			r ? i / r : 0,
			r
		];
	}
	function ee(e, t, n) {
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
	function te() {
		return w(...ee(V(v), V(y), V(b)));
	}
	function ne() {
		let e = te();
		return V(x) >= .995 ? e : e + Math.round(V(x) * 255).toString(16).padStart(2, "0");
	}
	function re() {
		I(S, ne(), !0), p = V(S), t.onchange?.(V(S));
	}
	function ie(e) {
		let t = C(e);
		return t ? (((e) => {
			var t = m(e, 3);
			I(v, t[0], !0), I(y, t[1], !0), I(b, t[2], !0);
		})(T(t[0], t[1], t[2])), I(x, t[3], !0), I(S, ne(), !0), !0) : !1;
	}
	function ae() {
		ie(c()) || ie("#000000"), f = n(), p = "";
		try {
			let e = JSON.parse(localStorage.getItem(o) ?? "[]");
			I(u, Array.isArray(e) ? e : [], !0);
		} catch {
			I(u, [], !0);
		}
		try {
			let e = JSON.parse(localStorage.getItem(s) ?? "[]");
			I(d, Array.isArray(e) ? e : [], !0);
		} catch {
			I(d, [], !0);
		}
		let e = V(h).getBoundingClientRect(), t = V(h).closest(".panel-body")?.getBoundingClientRect(), r = t ? t.right : window.innerWidth, i = Math.max(8, Math.min(e.right - 236, r - 236 - 8)), a = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		I(_, {
			top: a,
			left: i
		}, !0), I(g, !0);
	}
	function oe() {
		if (I(g, !1), p && p !== f) {
			let e = [p, ...V(u).filter((e) => e !== p)].slice(0, 8);
			localStorage.setItem(o, JSON.stringify(e));
		}
	}
	function se(e, n) {
		ie(n), I(S, n, !0), t.onchange?.(e);
	}
	function ce(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			I(y, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), I(b, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), re();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function le(e) {
		ie(e.target.value) ? re() : I(S, te(), !0);
	}
	function ue(e) {
		return (C(te()) ?? [
			0,
			0,
			0
		])[e];
	}
	function de(e, t) {
		let n = C(te()) ?? [
			0,
			0,
			0
		];
		n[e] = Math.min(255, Math.max(0, Number(t) || 0)), ((e) => {
			var t = m(e, 3);
			I(v, t[0], !0), I(y, t[1], !0), I(b, t[2], !0);
		})(T(...n)), re();
	}
	let fe = typeof window < "u" && "EyeDropper" in window;
	async function pe() {
		try {
			ie((await new window.EyeDropper().open()).sRGBHex) && re();
		} catch {}
	}
	function me(e) {
		ie(e) && re();
	}
	function he() {
		let e = ne();
		V(d).includes(e) || (I(d, [e, ...V(d)].slice(0, 12), !0), localStorage.setItem(s, JSON.stringify(Be(V(d)))));
	}
	function ge(e) {
		I(d, V(d).filter((t) => t !== e), !0), localStorage.setItem(s, JSON.stringify(Be(V(d))));
	}
	bn(() => {
		if (!V(g)) return;
		let e = (e) => {
			V(h) && !V(h).contains(e.target) && oe();
		}, t = (e) => {
			e.key === "Escape" && oe();
		}, n = () => oe();
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	var _e = Hi(), ve = L(_e);
	let ye;
	var be = z(ve, 2), xe = (e) => {
		var n = Mi();
		B((e, t) => {
			X(n, "title", e), X(n, "aria-label", t);
		}, [() => Z("cp.clearTitle"), () => Z("cp.clear")]), H("click", n, () => t.onchange?.("")), W(e, n);
	};
	K(be, (e) => {
		a() && n() && e(xe);
	});
	var Se = z(be, 2), Ce = (e) => {
		var t = Vi(), i = L(t), a = L(i);
		j(i);
		var o = z(i, 2);
		J(o);
		var s = z(o, 2);
		J(s);
		var c = z(s, 2), f = L(c), p = z(f, 2);
		J(p);
		var h = z(p, 2), g = (e) => {
			var t = Ni();
			B((e) => X(t, "title", e), [() => Z("cp.eyedropper")]), H("click", t, pe), W(e, t);
		};
		K(h, (e) => {
			fe && e(g);
		}), j(c);
		var C = z(c, 2);
		Vr(C, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = Pi();
			J(r), B((e) => {
				X(r, "title", t), Y(r, e);
			}, [() => ue(V(n))]), H("change", r, (e) => de(V(n), e.target.value)), W(e, r);
		}), j(C);
		var w = z(C, 2), T = (e) => {
			var t = Ii(), i = R(t), a = L(i, !0), o = z(a), s = (e) => {
				var t = Ar();
				B((e) => G(t, e), [() => Z("cp.linkedSuffix", { token: l() })]), W(e, t);
			}, c = /* @__PURE__ */ N(() => l());
			K(o, (e) => {
				V(c) && e(s);
			}), j(i);
			var u = z(i, 2);
			Vr(u, 21, r, ([e, t]) => e, (e, t) => {
				var r = /* @__PURE__ */ N(() => m(V(t), 2));
				let i = () => V(r)[0], a = () => V(r)[1];
				var o = Fi();
				let s;
				B((e) => {
					s = Qr(o, 1, "cp-token svelte-zxiloo", null, s, { active: n() === i() }), ei(o, `background: ${a() ?? ""}`), X(o, "title", e);
				}, [() => Z("cp.tokenTitle", { name: i() })]), H("click", o, () => se(i(), a())), W(e, o);
			}), j(u), B((e) => G(a, e), [() => Z("cp.themeColors")]), W(e, t);
		};
		K(w, (e) => {
			r().length && e(T);
		});
		var ee = z(w, 2), ne = L(ee), ie = z(ne);
		j(ee);
		var ae = z(ee, 2), oe = (e) => {
			var t = Ri();
			Vr(t, 20, () => V(d), (e) => e, (e, t) => {
				var n = Li(), r = L(n), i = z(r, 2);
				j(n), B((e) => {
					ei(r, `background: ${t ?? ""}`), X(r, "title", t), X(i, "title", e);
				}, [() => Z("cp.removeSaved")]), H("click", r, () => me(t)), H("click", i, () => ge(t)), W(e, n);
			}), j(t), W(e, t);
		};
		K(ae, (e) => {
			V(d).length && e(oe);
		});
		var _e = z(ae, 2), ve = (e) => {
			var t = Bi(), n = R(t), r = L(n, !0);
			j(n);
			var i = z(n, 2);
			Vr(i, 20, () => V(u), (e) => e, (e, t) => {
				var n = zi();
				B(() => {
					ei(n, `background: ${t ?? ""}`), X(n, "title", t);
				}), H("click", n, () => me(t)), W(e, n);
			}), j(i), B((e) => G(r, e), [() => Z("common.recent")]), W(e, t);
		};
		K(_e, (e) => {
			V(u).length && e(ve);
		}), j(t), B((e, n, r, c, l) => {
			ei(t, `top: ${V(_).top ?? ""}px; left: ${V(_).left ?? ""}px`), ei(i, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${V(v) ?? ""}, 100%, 50%)`), ei(a, `left: ${V(y) * 100}%; top: ${(1 - V(b)) * 100}%`), Y(o, V(v)), Y(s, e), X(s, "title", n), ei(s, `background: linear-gradient(to right, transparent, ${r ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), ei(f, `background: ${V(S) ?? ""}`), Y(p, V(S)), G(ne, `${c ?? ""} `), X(ie, "title", l);
		}, [
			() => Math.round(V(x) * 100),
			() => Z("cp.alpha"),
			() => te(),
			() => Z("cp.saved"),
			() => Z("cp.saveTitle")
		]), H("click", t, (e) => e.preventDefault()), H("pointerdown", i, ce), H("input", o, (e) => {
			I(v, Number(e.target.value), !0), re();
		}), H("input", s, (e) => {
			I(x, Number(e.target.value) / 100), re();
		}), H("change", p, le), H("click", ie, he), W(e, t);
	};
	K(Se, (e) => {
		V(g) && e(Ce);
	}), j(_e), pi(_e, (e) => I(h, e), () => V(h)), B((e, t, n) => {
		ye = Qr(ve, 1, "cp-swatch svelte-zxiloo", null, ye, e), ei(ve, `background: ${t ?? ""}`), X(ve, "title", n), X(ve, "aria-label", i());
	}, [
		() => ({
			linked: l(),
			"cp-empty": a() && !n()
		}),
		() => n() ? c() : "transparent",
		() => l() ? Z("cp.linkedTitle", {
			label: i(),
			token: l()
		}) : i()
	]), H("click", ve, () => V(g) ? oe() : ae()), W(e, _e), Ge();
}
Cr([
	"click",
	"pointerdown",
	"input",
	"change"
]);
//#endregion
//#region ../template/assets/engine/0.6.11/imageTools.js
var Wi = 1600, Gi = .82, Ki = .6;
async function qi(e, t = Wi) {
	if (Yi(e)) return Xi(await e.text());
	let n = await createImageBitmap(e), r = Math.min(1, t / Math.max(n.width, n.height)), i = Math.round(n.width * r), a = Math.round(n.height * r), o = document.createElement("canvas");
	o.width = i, o.height = a, o.getContext("2d").drawImage(n, 0, 0, i, a), n.close();
	let s = (e) => new Promise((t) => o.toBlob(t, "image/webp", e)), c = await s(Gi);
	return c.size > 4e5 && (c = await s(Ki)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(c);
		}),
		bytes: c.size,
		width: i,
		height: a
	};
}
var Ji = "image/svg+xml";
function Yi(e) {
	return e.type === Ji || /\.svg$/i.test(e.name || "");
}
function Xi(e) {
	let t = String(e ?? "");
	if (!/<svg[\s>]/i.test(t)) throw Error("Ugyldig SVG");
	if (/<\s*script[\s>]/i.test(t) || /<\s*foreignObject[\s>]/i.test(t) || /\son[a-z]+\s*=/i.test(t) || /javascript:/i.test(t)) throw Error("SVG-en inneholder skript eller hendelser og kan ikke brukes");
	let n = new Blob([t]).size, r = `data:${Ji};base64,${btoa(unescape(encodeURIComponent(t)))}`, i = t.match(/<svg\b[^>]*>/i)?.[0] ?? "", a = i.match(/viewBox\s*=\s*["']\s*([-\d.]+(?:[\s,]+[-\d.]+){3})\s*["']/i)?.[1]?.split(/[\s,]+/).map(Number);
	return {
		dataUrl: r,
		bytes: n,
		width: a?.length === 4 ? a[2] : Number.parseFloat(i.match(/\bwidth\s*=\s*["']?([\d.]+)/i)?.[1]) || 0,
		height: a?.length === 4 ? a[3] : Number.parseFloat(i.match(/\bheight\s*=\s*["']?([\d.]+)/i)?.[1]) || 0
	};
}
function Zi(e, t, n = .04) {
	let r = String(e ?? "");
	if (!t || !(t.width > 0) || !(t.height > 0)) return r;
	let i = r.match(/<svg\b[^>]*>/i)?.[0];
	if (!i) return r;
	let a = (e) => Math.round(e * 1e3) / 1e3, o = Math.max(t.width, t.height) * Math.max(0, n), s = a(t.x - o), c = a(t.y - o), l = a(t.width + 2 * o), u = a(t.height + 2 * o), d = i.replace(/\sviewBox\s*=\s*["'][^"']*["']/i, "").replace(/\swidth\s*=\s*["'][^"']*["']/i, "").replace(/\sheight\s*=\s*["'][^"']*["']/i, "").replace(/<svg\b/i, `<svg viewBox="${s} ${c} ${l} ${u}" width="${l}" height="${u}"`);
	return r.replace(i, d);
}
function Qi(e) {
	let t = String(e ?? "").match(/<svg\b[^>]*>/i)?.[0] ?? "", n = t.match(/viewBox\s*=\s*["']\s*([-\d.]+(?:[\s,]+[-\d.]+){3})\s*["']/i)?.[1]?.split(/[\s,]+/).map(Number);
	if (n?.length === 4 && n.every(Number.isFinite)) return n;
	let r = Number.parseFloat(t.match(/\bwidth\s*=\s*["']?([\d.]+)/i)?.[1]), i = Number.parseFloat(t.match(/\bheight\s*=\s*["']?([\d.]+)/i)?.[1]);
	return r > 0 && i > 0 ? [
		0,
		0,
		r,
		i
	] : null;
}
function $i(e) {
	return /^data:image\/svg\+xml[;,]/.test(e || "") ? "svg" : "webp";
}
function ea(e, t = "bilde") {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || t;
}
function ta(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region ../template/assets/engine/0.6.11/glyphs.js
var na = "urd-recent-glyphs", ra = [
	["glyphCat.symbols", "★ ☆ ✦ ✧ ✩ ✪ ✫ ✭ ✮ ✯ ✵ ✳ ✴ ❖ ❋ ✿ ❀ ❁ ✾ ❃ ☘ ◆ ◇ ● ○ ◎ ■ □ ▣ ▲ △ ▼ ▽ ⬡ ⬢ ♦ ♠ ♣ ♥ ♡ ✓ ✔ ✕ ✖ ✗ ✘ ✚ ✜ ☀ ☾ ♪ ♫ ♬ ☮ ☯ ⚜ ⚓ ⚡ ☂ ✂ ✏ ✒ ✉ ☎ ⌛ ⏳ ♻ ⚠ ☑ ⚙ § © ® ™ ° ± × ÷ ∞ ≈ ≠ ≤ ≥ € £ ¥ • ‣ ⁂"],
	["glyphCat.arrows", "→ ← ↑ ↓ ↔ ↕ ↗ ↘ ↙ ↖ ⇒ ⇐ ⇑ ⇓ ⇔ ➜ ➤ ➔ ↩ ↪ ⤴ ⤵ ↺ ↻ ⟲ ⟳ « » ‹ ›"],
	["glyphCat.smileys", "😀 😃 😄 😁 😆 😅 😂 🙂 😉 😊 😇 🥰 😍 🤩 😘 😋 😜 🤪 😎 🥳 😏 😌 😴 🤔 🤗 🤭 🙃 😢 😭 😤 😡 🤯 😱 🥺 😬 🤓 🫠 🫡 🫶"],
	["glyphCat.people", "👍 👎 👏 🙌 🤝 👋 ✌ 🤘 🤞 💪 🙏 👀 🧠 👶 🧒 🧑 🧓 👥 👤 🗣 🏃 🚶 🧍 💃 🕺 🧑‍🤝‍🧑"],
	["glyphCat.nature", "🌞 🌝 🌙 ⭐ 🌟 ✨ ☁ 🌈 🔥 💧 🌊 ❄ ⛄ 🌸 🌼 🌻 🌹 🌷 🌱 🌲 🌳 🍀 🍁 🍂 🐝 🦋 🐶 🐱 🐦 🦉 🐟 🐢 🌍 🏔 🏕"],
	["glyphCat.food", "☕ 🍵 🥤 🍺 🍷 🥂 🍰 🎂 🧁 🍪 🍩 🍕 🌮 🍔 🍟 🥗 🍎 🍊 🍋 🍇 🍓 🫐 🥕 🌽 🍞 🥐 🧀 🍿 🍦 🍫"],
	["glyphCat.activity", "⚽ 🏀 🏐 🎾 🏓 🏸 ⛷ 🏂 🚴 🏊 🎮 🎲 ♟ 🎯 🎳 🎣 🥾 ⛺ 🎪 🎭 🎨 🎬 🎤 🎧 🎸 🎹 🥁 🎻 📚 ✈ 🚗 🚲 ⛵ 🚀 🏋 🧘"],
	["glyphCat.objects", "💡 🔔 📣 📢 📌 📍 📅 ⏰ 🔑 🔒 🔓 🛠 🔧 🔨 🧰 📦 📫 📧 📱 💻 🖥 🖨 📷 📸 🎥 📺 🔍 🔎 📎 📏 📐 📝 📄 📋 📁 💾 🧾 💰 💳 🪙 🎁 🎈 🎉 🎊 🏆 🥇 🥈 🥉 🏅 🚩 🏁 🔗 🧭 🗺 🧲 🧪 🔬 🔭 💊 🩺 🛡 🕯 🪧 🖼"],
	["glyphCat.hearts", "❤ 🧡 💛 💚 💙 💜 🖤 🤍 🤎 💗 💓 💕 💖 💘 💝 💞 💟"]
];
function ia(e, t) {
	return [t, ...(Array.isArray(e) ? e : []).filter((e) => e !== t)].slice(0, 16);
}
function aa() {
	try {
		let e = JSON.parse(localStorage.getItem("urd-recent-glyphs") ?? "[]");
		return Array.isArray(e) ? e : [];
	} catch {
		return [];
	}
}
function oa(e) {
	let t = ia(aa(), e);
	try {
		localStorage.setItem(na, JSON.stringify(t));
	} catch {}
	return t;
}
//#endregion
//#region ../template/assets/engine/0.6.11/icons.js
var sa = "fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"", ca = "fill=\"currentColor\" stroke=\"none\"", la = {
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
}, ua = [
	["iconCat.social", [
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
	["iconCat.communication", [
		"mail",
		"phone",
		"smartphone",
		"chat",
		"send",
		"globe",
		"rss"
	]],
	["iconCat.placeTime", [
		"map-pin",
		"map",
		"home",
		"clock",
		"calendar"
	]],
	["iconCat.symbols", [
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
	["iconCat.arrows", [
		"arrow-right",
		"arrow-left",
		"arrow-up",
		"arrow-down",
		"external-link",
		"download",
		"share"
	]]
];
function da(e) {
	let t = typeof e == "string" ? la[e] : null;
	return t ? `<svg viewBox="0 0 24 24" width="100%" height="100%" ${t.fill ? ca : sa} aria-hidden="true" focusable="false">${t.body}</svg>` : null;
}
//#endregion
//#region src/lib/GlyphPicker.svelte
var fa = /* @__PURE__ */ U("<img class=\"gp-own svelte-15ln1c3\"/>"), pa = /* @__PURE__ */ U("<span class=\"gp-svg svelte-15ln1c3\"></span>"), ma = /* @__PURE__ */ U("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), ha = /* @__PURE__ */ U("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), ga = /* @__PURE__ */ U("<button type=\"button\"><span class=\"gp-svg svelte-15ln1c3\"></span></button>"), _a = /* @__PURE__ */ U("<button type=\"button\"> </button>"), va = /* @__PURE__ */ U("<div class=\"gp-group svelte-15ln1c3\"> </div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\"> </button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\"> </p>", 1), ya = /* @__PURE__ */ U("<div class=\"gp-pop svelte-15ln1c3\"><!> <!> <!> <!></div>"), ba = /* @__PURE__ */ U("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"><!></button> <!></span>");
function xa(e, t) {
	We(t, !0);
	let n = mi(t, "value", 3, "★"), r = mi(t, "icon", 3, null), i = mi(t, "image", 3, null), a = mi(t, "label", 19, () => Z("gp.pickGlyph")), o = /* @__PURE__ */ F(tn([])), s = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F(null), l = /* @__PURE__ */ F(!1), u = /* @__PURE__ */ F(tn({
		top: 0,
		left: 0
	}));
	function d() {
		I(o, aa(), !0);
		let e = V(s).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		I(u, {
			top: n,
			left: t
		}, !0), I(l, !0);
	}
	function f(e) {
		oa(e), t.onpick?.(e), I(l, !1);
	}
	function p(e) {
		t.onicon?.(e), I(l, !1);
	}
	async function h(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", !n) return;
		let r = await qi(n, 256);
		t.onimage?.(r.dataUrl), I(l, !1);
	}
	bn(() => {
		if (!V(l)) return;
		let e = (e) => {
			V(s) && !V(s).contains(e.target) && I(l, !1);
		}, t = (e) => {
			e.key === "Escape" && I(l, !1);
		}, n = (e) => {
			V(s) && e.target instanceof Node && !V(s).contains(e.target) && I(l, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var g = ba(), _ = L(g), v = L(_), y = (e) => {
		var t = fa();
		B((e) => {
			X(t, "src", i()), X(t, "alt", e);
		}, [() => Z("gp.ownIcon")]), W(e, t);
	}, b = (e) => {
		var t = pa();
		q(t, () => da(r()), !0), j(t), W(e, t);
	}, x = (e) => {
		var t = Ar();
		B(() => G(t, n() || "★")), W(e, t);
	};
	K(v, (e) => {
		i() ? e(y) : r() && la[r()] ? e(b, 1) : e(x, -1);
	}), j(_);
	var S = z(_, 2), C = (e) => {
		var i = ya(), a = L(i), s = (e) => {
			var t = ha(), n = R(t), r = L(n, !0);
			j(n);
			var i = z(n, 2);
			Vr(i, 20, () => V(o), (e) => e, (e, t) => {
				var n = ma(), r = L(n, !0);
				j(n), B(() => G(r, t)), H("click", n, () => f(t)), W(e, n);
			}), j(i), B((e) => G(r, e), [() => Z("common.recent")]), W(e, t);
		};
		K(a, (e) => {
			V(o).length && e(s);
		});
		var l = z(a, 2), d = (e) => {
			var t = jr();
			Vr(R(t), 17, () => ua, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ N(() => m(V(t), 2));
				let i = () => V(n)[0], a = () => V(n)[1];
				var o = ha(), s = R(o), c = L(s, !0);
				j(s);
				var l = z(s, 2);
				Vr(l, 20, a, (e) => e, (e, t) => {
					var n = ga();
					let i;
					var a = L(n);
					q(a, () => da(t), !0), j(a), j(n), B(() => {
						i = Qr(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, i, { active: t === r() }), X(n, "title", la[t].label);
					}), H("click", n, () => p(t)), W(e, n);
				}), j(l), B((e) => G(c, e), [() => Z(i())]), W(e, o);
			}), W(e, t);
		};
		K(l, (e) => {
			t.onicon && e(d);
		});
		var g = z(l, 2);
		Vr(g, 17, () => ra, ([e, t]) => e, (e, t) => {
			var r = /* @__PURE__ */ N(() => m(V(t), 2));
			let i = () => V(r)[0], a = () => V(r)[1];
			var o = ha(), s = R(o), c = L(s, !0);
			j(s);
			var l = z(s, 2);
			Vr(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var r = _a();
				let i;
				var a = L(r, !0);
				j(r), B(() => {
					i = Qr(r, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === n() }), G(a, t);
				}), H("click", r, () => f(t)), W(e, r);
			}), j(l), B((e) => G(c, e), [() => Z(i())]), W(e, o);
		});
		var _ = z(g, 2), v = (e) => {
			var t = va(), n = R(t), r = L(n, !0);
			j(n);
			var i = z(n, 2), a = L(i, !0);
			j(i);
			var o = z(i, 2);
			pi(o, (e) => I(c, e), () => V(c));
			var s = z(o, 2), l = L(s, !0);
			j(s), B((e, t, n) => {
				G(r, e), G(a, t), G(l, n);
			}, [
				() => Z("gp.ownIcon"),
				() => Z("gp.upload"),
				() => Z("gp.uploadHint")
			]), H("click", i, () => V(c).click()), H("change", o, h), W(e, t);
		};
		K(_, (e) => {
			t.onimage && e(v);
		}), j(i), B(() => ei(i, `top: ${V(u).top ?? ""}px; left: ${V(u).left ?? ""}px`)), W(e, i);
	};
	K(S, (e) => {
		V(l) && e(C);
	}), j(g), pi(g, (e) => I(s, e), () => V(s)), B(() => {
		X(_, "title", a()), X(_, "aria-label", a());
	}), H("click", _, () => V(l) ? I(l, !1) : d()), W(e, g), Ge();
}
Cr(["click", "change"]);
//#endregion
//#region src/lib/previewBridge.js
function Sa(e, t = {}) {
	let n = (e) => {
		if (e.origin !== location.origin) return;
		let n = e.data;
		n?.type === "urd-edit" && t.onEdit?.(n), n?.type === "urd-move" && t.onMove?.(n), n?.type === "urd-grow" && t.onGrow?.(n), n?.type === "urd-delete" && t.onDelete?.(n), n?.type === "urd-add-section" && t.onAddSection?.(n), n?.type === "urd-move-section" && t.onMoveSection?.(n), n?.type === "urd-delete-section" && t.onDeleteSection?.(n), n?.type === "urd-section-size" && t.onSectionSize?.(n), n?.type === "urd-undo" && t.onUndo?.(n), n?.type === "urd-select-section" && t.onSelectSection?.(n), n?.type === "urd-select-block" && t.onSelectBlock?.(n), n?.type === "urd-block-menu" && t.onBlockMenu?.(n), n?.type === "urd-plugin-blocks" && t.onPluginBlocks?.(n), n?.type === "urd-ready" && t.onReady?.(n), n?.type === "urd-navigate" && t.onNavigate?.(n), n?.type === "urd-add-block" && t.onAddBlock?.(n), n?.type === "urd-add-blocks" && t.onAddBlocks?.(n), n?.type === "urd-request-block" && t.onRequestBlock?.(n), n?.type === "urd-move-block-section" && t.onMoveBlockSection?.(n), n?.type === "urd-mobile-manual" && t.onMobileManual?.(n), n?.type === "urd-mobile-auto" && t.onMobileAuto?.(n), n?.type === "urd-review-done" && t.onReviewDone?.(n), n?.type === "urd-block-flag" && t.onBlockFlag?.(n), n?.type === "urd-collection-edit" && t.onCollectionEdit?.(n), n?.type === "urd-nav-width" && t.onNavWidth?.(n), n?.type === "urd-save-template" && t.onSaveTemplate?.(n), n?.type === "urd-sticky-group" && t.onStickyGroup?.(n), n?.type === "urd-delete-template" && t.onDeleteTemplate?.(n), n?.type === "urd-apply-layout" && t.onApplyLayout?.(n);
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
		sendMaler(e) {
			r({
				type: "urd-maler",
				maler: e
			});
		},
		sendInsertTemplate(e) {
			r({
				type: "urd-insert-template",
				id: e
			});
		},
		sendViewport(e) {
			r({
				type: "urd-viewport",
				mode: e
			});
		},
		sendZoom(e) {
			r({
				type: "urd-zoom",
				scale: e
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
//#region src/lib/preview-scale.js
function Ca(e, t) {
	return !(e > 0) || !(t > 0) ? 1 : e / t;
}
function wa(e, t, n, r = 0, i = 0) {
	if (n === "full") return 1;
	let a = i > 0 ? Ca(r, i) : Infinity;
	return Math.max(.1, Math.min(1, Ca(e, t), a));
}
var Ta = 1920, Ea = [
	{
		id: "none",
		gutter: 0
	},
	{
		id: "small",
		gutter: 3
	},
	{
		id: "medium",
		gutter: 6
	},
	{
		id: "large",
		gutter: 9
	}
], Da = [
	{
		id: "compact",
		width: 1200
	},
	{
		id: "standard",
		width: 1440
	},
	{
		id: "wide",
		width: 1600
	},
	{
		id: "full",
		width: "full"
	}
], Oa = [
	1920,
	1536,
	1366
];
function ka(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 1440;
	let n = Math.round(t / 20) * 20;
	return Math.min(Ta, Math.max(960, n));
}
function Aa(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 6;
	let n = Math.round(t / 1) * 1;
	return Math.min(12, Math.max(0, n));
}
function ja(e, t) {
	if (e === "full") return 0;
	let n = Math.min(49, Math.max(0, Number(t) || 0));
	return Math.ceil(Number(e) / (1 - 2 * n / 100));
}
function Ma(e, t, n) {
	let r = Math.max(0, Number(t) || 0) / 100 * n, i = Math.max(0, n - 2 * r), a = e !== "full" && Number(e) < i, o = a ? Number(e) : i;
	return {
		width: o,
		margin: Math.round((n - o) / 2),
		pct: n > 0 ? o / n * 100 : 0,
		bound: a
	};
}
function Na(e) {
	return Da.find((t) => t.width === e)?.id ?? null;
}
//#endregion
//#region src/lib/Dropdown.svelte
var Pa = /* @__PURE__ */ U("<button type=\"button\"> </button>"), Fa = /* @__PURE__ */ U("<div class=\"dd-pop svelte-vtocc6\"></div>"), Ia = /* @__PURE__ */ U("<span class=\"dd svelte-vtocc6\"><button type=\"button\" class=\"dd-btn svelte-vtocc6\"><span class=\"dd-value svelte-vtocc6\"> </span> <span class=\"dd-caret svelte-vtocc6\"> </span></button> <!></span>");
function Q(e, t) {
	We(t, !0);
	let n = mi(t, "value", 3, null), r = mi(t, "options", 19, () => []), i = mi(t, "title", 3, null), a = mi(t, "disabled", 3, !1), o = /* @__PURE__ */ F(!1), s = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F(tn({
		top: 0,
		left: 0,
		width: 160
	})), l = () => r().find(([e]) => `${e ?? ""}` == `${n() ?? ""}`)?.[1] ?? "";
	function u() {
		let e = V(s).getBoundingClientRect(), t = Math.min(320, r().length * 32 + 12), n = Math.max(e.width, 160), i = e.bottom + t + 8 <= window.innerHeight;
		I(c, {
			top: i ? e.bottom + 4 : Math.max(8, e.top - t - 4),
			left: Math.max(8, Math.min(e.left, window.innerWidth - n - 8)),
			width: n
		}, !0);
	}
	function d() {
		if (!a()) {
			if (V(o)) {
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
		if (!V(o)) return;
		let e = (e) => {
			V(s) && !V(s).contains(e.target) && I(o, !1);
		}, t = (e) => {
			e.key === "Escape" && I(o, !1);
		}, n = (e) => {
			V(s) && e.target instanceof Node && !V(s).contains(e.target) && u();
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var p = Ia(), h = L(p), g = L(h), _ = L(g, !0);
	j(g);
	var v = z(g, 2), y = L(v, !0);
	j(v), j(h);
	var b = z(h, 2), x = (e) => {
		var t = Fa();
		Vr(t, 21, r, ([e, t]) => `${e ?? ""}`, (e, t) => {
			var r = /* @__PURE__ */ N(() => m(V(t), 2));
			let i = () => V(r)[0], a = () => V(r)[1];
			var o = Pa();
			let s;
			var c = L(o, !0);
			j(o), B(() => {
				s = Qr(o, 1, "dd-opt svelte-vtocc6", null, s, { valgt: `${i() ?? ""}` == `${n() ?? ""}` }), G(c, a());
			}), H("click", o, () => f(i())), W(e, o);
		}), j(t), B(() => ei(t, `top: ${V(c).top ?? ""}px; left: ${V(c).left ?? ""}px; min-width: ${V(c).width ?? ""}px`)), W(e, t);
	};
	K(b, (e) => {
		V(o) && e(x);
	}), j(p), pi(p, (e) => I(s, e), () => V(s)), B((e) => {
		X(h, "title", i()), h.disabled = a(), G(_, e), G(y, V(o) ? "▴" : "▾");
	}, [() => l()]), H("click", h, d), W(e, p), Ge();
}
Cr(["click"]);
//#endregion
//#region src/lib/IconEditor.svelte
var La = /* @__PURE__ */ U("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\"> </h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\"></canvas> <p class=\"ie-hint svelte-e7sog7\"> </p></div> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"ghost svelte-e7sog7\"> </button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"primary svelte-e7sog7\"> </button></span></div></div>");
function Ra(e, t) {
	We(t, !0);
	let n = mi(t, "image", 3, ""), r = /* @__PURE__ */ F(null), i = /* @__PURE__ */ F(null), a = /* @__PURE__ */ F(1), o = /* @__PURE__ */ F(.5), s = /* @__PURE__ */ F(.5), c = /* @__PURE__ */ F(1), l = /* @__PURE__ */ F(1), u = /* @__PURE__ */ F(1);
	bn(() => {
		if (!n()) return;
		let e = new Image();
		e.onload = () => {
			I(i, e, !0);
		}, e.src = n();
	});
	function d(e, t) {
		if (e.clearRect(0, 0, t, t), !V(i)) return;
		e.filter = `brightness(${V(c)}) contrast(${V(l)}) saturate(${V(u)})`;
		let n = Math.max(t / V(i).width, t / V(i).height) * V(a), r = V(i).width * n, d = V(i).height * n, f = t / 2 - V(o) * r, p = t / 2 - V(s) * d;
		f = Math.min(0, Math.max(t - r, f)), p = Math.min(0, Math.max(t - d, p)), e.drawImage(V(i), f, p, r, d), e.filter = "none";
	}
	bn(() => {
		V(i), V(a), V(o), V(s), V(c), V(l), V(u), V(r) && d(V(r).getContext("2d"), 220);
	});
	function f(e) {
		if (!V(i)) return;
		e.preventDefault();
		let t = e.clientX, n = e.clientY, r = Math.max(220 / V(i).width, 220 / V(i).height) * V(a), c = V(i).width * r, l = V(i).height * r, u = (e) => {
			I(o, Math.min(1, Math.max(0, V(o) - (e.clientX - t) / c)), !0), I(s, Math.min(1, Math.max(0, V(s) - (e.clientY - n) / l)), !0), t = e.clientX, n = e.clientY;
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
	var h = La(), g = L(h), _ = L(g), v = L(_, !0);
	j(_);
	var y = z(_, 2), b = L(y);
	X(b, "width", 220), X(b, "height", 220), pi(b, (e) => I(r, e), () => V(r));
	var x = z(b, 2), S = L(x, !0);
	j(x), j(y);
	var C = z(y, 2), w = L(C), T = z(w), ee = L(T);
	j(T), j(C);
	var te = z(C, 2);
	J(te);
	var ne = z(te, 2), re = L(ne), ie = z(re), ae = L(ie);
	j(ie), j(ne);
	var oe = z(ne, 2);
	J(oe);
	var se = z(oe, 2), ce = L(se), le = z(ce), ue = L(le);
	j(le), j(se);
	var de = z(se, 2);
	J(de);
	var fe = z(de, 2), pe = L(fe), me = z(pe), he = L(me);
	j(me), j(fe);
	var ge = z(fe, 2);
	J(ge);
	var _e = z(ge, 2), ve = L(_e), ye = L(ve, !0);
	j(ve);
	var be = z(ve, 2), xe = L(be, !0);
	j(be), j(_e);
	var Se = z(_e, 2), Ce = L(Se), we = L(Ce, !0);
	j(Ce);
	var E = z(Ce, 2), D = L(E, !0);
	j(E), j(Se), j(g), j(h), B((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) => {
		G(v, e), X(b, "title", t), G(S, n), G(w, `${r ?? ""} `), G(ee, `${i ?? ""}x`), G(re, `${a ?? ""} `), G(ae, `${o ?? ""}%`), G(ce, `${s ?? ""} `), G(ue, `${c ?? ""}%`), G(pe, `${l ?? ""} `), G(he, `${u ?? ""}%`), G(ye, d), G(xe, f), G(we, p), G(D, m);
	}, [
		() => Z("ie.title"),
		() => Z("ie.dragTip"),
		() => Z("ie.hint"),
		() => Z("lbl.zoom"),
		() => V(a).toFixed(2),
		() => Z("lbl.brightness"),
		() => Math.round(V(c) * 100),
		() => Z("lbl.contrast"),
		() => Math.round(V(l) * 100),
		() => Z("lbl.saturate"),
		() => Math.round(V(u) * 100),
		() => Z("ie.grayscale"),
		() => Z("common.reset"),
		() => Z("confirm.cancel"),
		() => Z("common.apply")
	]), H("pointerdown", b, f), li(te, () => V(a), (e) => I(a, e)), li(oe, () => V(c), (e) => I(c, e)), li(de, () => V(l), (e) => I(l, e)), li(ge, () => V(u), (e) => I(u, e)), H("click", ve, () => I(u, 0)), H("click", be, p), H("click", Ce, () => t.oncancel?.()), H("click", E, m), W(e, h), Ge();
}
Cr(["pointerdown", "click"]);
var za = {}, Ba = {
	1: (e) => ({
		...e,
		layout: e.layout ?? {
			contentWidth: 1440,
			gutter: 6
		}
	}),
	2: (e) => ({
		...e,
		layout: {
			...e.layout ?? { contentWidth: 1440 },
			gutter: 6
		}
	})
};
function Va(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 3;) {
		let r = Ba[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function Ha(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 1;) {
		let i = za[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/0.6.11/plugins.js
function Ua(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var Wa = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function Ga(e, t) {
	let n = Ua(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = Ua(t[2]), a = Wa(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var Ka = /^[a-z0-9][a-z0-9-]*$/;
function qa(e) {
	let t = [];
	if (!e || typeof e != "object") return ["manifestet er ikke et objekt"];
	Ka.test(e.id ?? "") || t.push("id mangler eller er ugyldig"), (typeof e.name != "string" || !e.name) && t.push("name mangler"), Ua(e.version ?? "") || t.push("version er ikke semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine mangler");
	let n = Array.isArray(e.languages) && e.languages.length > 0;
	return (e.entry !== void 0 || !n) && (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry mangler eller er ikke en .js-fil"), (e.provides !== void 0 || !n) && (!e.provides || typeof e.provides != "object") && t.push("provides mangler"), e.languages !== void 0 && t.push(...xi(e.languages)), e.locales !== void 0 && typeof e.locales != "boolean" && t.push("locales må være boolsk"), e.names !== void 0 && (typeof e.names != "object" || e.names === null || Array.isArray(e.names) || Object.values(e.names).some((e) => typeof e != "string" || !e)) && t.push("names må være et objekt med språkkode til navn"), t;
}
//#endregion
//#region ../template/assets/engine/0.6.11/sections/presets.js
function Ja(e) {
	return typeof crypto < "u" && crypto.randomUUID ? `${e}-${crypto.randomUUID().slice(0, 8)}` : `${e}-${[...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4))].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
var Ya = () => ({ mobile: {
	mode: "auto",
	attention: null
} }), $ = (e, t, n, r, i = 1) => ({
	desktop: {
		x: e,
		y: t,
		w: n,
		h: r,
		z: i,
		rot: 0
	},
	mobile: null
}), Xa = (e, t, n = {}) => ({
	id: Ja("blk"),
	type: "text",
	version: 1,
	props: {
		html: t,
		align: "left",
		box: !1,
		...n
	},
	animation: null,
	frames: e
}), Za = (e, t = {}) => ({
	id: Ja("blk"),
	type: "image",
	version: 1,
	props: {
		src: "",
		alt: Z("seed.imageAlt"),
		fit: "cover",
		radius: "md",
		href: null,
		...t
	},
	animation: null,
	frames: e
}), Qa = (e, t, n = {}) => ({
	id: Ja("blk"),
	type: "button",
	version: 1,
	props: {
		label: t,
		page: null,
		href: "#",
		style: "primary",
		...n
	},
	animation: null,
	frames: e
}), $a = (e, t, n = 40) => ({
	id: Ja("blk"),
	type: "icon",
	version: 1,
	props: {
		glyph: t,
		color: "accent",
		size: n
	},
	animation: null,
	frames: e
}), eo = () => ({
	type: "hover-lift",
	version: 1,
	props: {}
}), to = (e, t, n = {}) => ({
	id: Ja("blk"),
	type: "samling",
	version: 1,
	props: {
		collection: null,
		view: t,
		limit: 6,
		newestFirst: !0,
		...n
	},
	animation: null,
	frames: e
}), no = (e, t = {}) => ({
	id: Ja("blk"),
	type: "galleri",
	version: 1,
	props: {
		images: [],
		view: "grid",
		columns: 3,
		gap: 12,
		radius: "md",
		lightbox: !0,
		interval: 5,
		...t
	},
	animation: null,
	frames: e
}), ro = (e, t) => ({
	id: Ja("blk"),
	type: "faq",
	version: 1,
	props: {
		items: t,
		multi: !1
	},
	animation: null,
	frames: e
}), io = (e, t = {}) => ({
	id: Ja("blk"),
	type: "sitat",
	version: 1,
	props: {
		text: "",
		attribution: "",
		role: "",
		variant: "stor",
		image: "",
		accent: null,
		...t
	},
	animation: null,
	frames: e
}), ao = (e, t) => ({
	id: Ja("blk"),
	type: "tidslinje",
	version: 1,
	props: {
		items: t,
		variant: "venstre",
		marker: "fylt",
		accent: null
	},
	animation: null,
	frames: e
}), oo = (e, t = {}) => ({
	id: Ja("blk"),
	type: "statistikk",
	version: 1,
	props: {
		value: "4800",
		prefix: "",
		suffix: "",
		label: "",
		countUp: !0,
		...t
	},
	animation: null,
	frames: e
}), so = (...e) => ({
	version: 1,
	layers: e
}), co = (e) => ({
	type: "color",
	version: 1,
	props: { value: e }
}), lo = (e, t, n, r = .5) => ({
	type: "glow",
	version: 1,
	props: {
		x: e,
		y: t,
		color: "accent",
		radius: r,
		opacity: n
	}
}), uo = (e) => Math.max(0, ...e.blocks.map((e) => e.frames.desktop.y + e.frames.desktop.h)), fo = (e, t, n, r, i, a) => ({
	x: n + e % t * r,
	y: i + Math.floor(e / t) * a
}), po = (e, t, n, r, i, a, o, s, c = 0) => {
	let l = (t) => e.blocks.some((e) => {
		let n = e.frames.desktop;
		return n.x < t.x + t.w - .01 && t.x < n.x + n.w - .01 && n.y < t.y + t.h - .01 && t.y < n.y + n.h - .01;
	});
	for (let e = 0; e < 60; e++) {
		let u = fo(e, t, n, r, i, a);
		if (!l({
			x: u.x,
			y: u.y + c,
			w: o,
			h: s
		})) return {
			...u,
			n: e
		};
	}
	return {
		x: n,
		y: uo(e) + 16,
		n: 0
	};
}, mo = (e, t, n) => e + t * .1 + n * .01, ho = (e, t, n, r, i = null) => ({
	id: Ja("sec"),
	version: 1,
	preset: e,
	size: { minHeight: t },
	grid: i,
	background: n,
	blocks: r,
	responsive: Ya()
});
function go(e) {
	e.sections.define("tom", {
		label: "Tom seksjon",
		labelKey: "preset.tom.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Blankt lerret å bygge fritt på",
		hintKey: "preset.tom.hint",
		create: () => ho("tom", "40vh", so(co("bg")), [])
	}), e.sections.define("hero", {
		label: "Hero",
		labelKey: "preset.hero.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Stor åpning med gradient og glød, venstrestilt",
		hintKey: "preset.hero.hint",
		create: () => ho("hero", "70vh", {
			version: 1,
			layers: [
				{
					type: "gradient",
					version: 1,
					props: {
						stops: ["#0b0e14", "#1a1030"],
						angle: 160,
						animate: !1
					}
				},
				lo(.7, .2, .35),
				{
					type: "grain",
					version: 1,
					props: { opacity: .06 }
				}
			]
		}, [
			Xa($(8.33, 40, 50, 38), Z("seed.hero.title")),
			Xa($(8.33, 84, 41.67, 26), Z("seed.hero.intro")),
			Qa($(8.33, 118, 20, 32), Z("seed.readMore"))
		])
	}), e.sections.define("hero-sentrert", {
		label: "Hero, sentrert",
		labelKey: "preset.hero-sentrert.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Sentrert åpning med to knapper",
		hintKey: "preset.hero-sentrert.hint",
		create: () => ho("hero-sentrert", "60vh", so(co("bg")), [
			Xa($(15, 64, 70, 44), Z("seed.heroCenter.title"), { align: "center" }),
			Xa($(25, 116, 50, 26), Z("seed.heroCenter.intro"), { align: "center" }),
			Qa($(31.5, 160, 17, 40), Z("seed.join")),
			Qa($(51.5, 160, 17, 40), Z("seed.readMore"), { style: "secondary" })
		])
	}), e.sections.define("bilder", {
		label: "Bilder",
		labelKey: "preset.bilder.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Tittel og tre bilderammer",
		hintKey: "preset.bilder.hint",
		create: () => ho("bilder", "360px", so(co("bg")), [
			Xa($(4, 24, 50, 32), Z("seed.images.title")),
			Za($(4, 72, 28, 220)),
			Za($(36, 72, 28, 220)),
			Za($(68, 72, 28, 220))
		]),
		itemLabel: "bilde",
		itemLabelKey: "item.image",
		item: (e) => {
			let { x: t, y: n } = po(e, 3, 4, 32, 72, 244, 28, 220);
			return {
				blocks: [Za($(t, n, 28, 220))],
				bottom: n + 244
			};
		}
	}), e.sections.define("galleri", {
		label: "Galleri",
		labelKey: "preset.galleri.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Bildegalleri i rutenett med fullskjermvisning (lightbox)",
		hintKey: "preset.galleri.hint",
		create: () => ho("galleri", "440px", so(co("bg")), [Xa($(4, 24, 50, 32), Z("seed.gallery.title")), no($(4, 72, 92, 320))])
	}), e.sections.define("kontakt", {
		label: "Kontakt",
		labelKey: "preset.kontakt.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Kontaktinfo i kort med e-postknapp",
		hintKey: "preset.kontakt.hint",
		create: () => ho("kontakt", "320px", so(co("surface"), lo(.2, .8, .2)), [
			Xa($(10, 32, 40, 36), Z("seed.contact.title")),
			Xa($(10, 84, 36, 130), Z("seed.contact.info"), { box: !0 }),
			Qa($(60, 100, 22, 40), Z("seed.contact.button"), { href: "mailto:post@dinforening.no" })
		])
	}), e.sections.define("funksjonskort", {
		label: "Funksjonskort",
		labelKey: "preset.funksjonskort.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Tre kort med ikon, tittel og tekst",
		hintKey: "preset.funksjonskort.hint",
		create: () => {
			let e = (e, t, n, r) => {
				let i = $a($(e + 10.5, 88, 4, 52), n), a = Xa($(e, 152, 25, 200), Z("seed.features.card", { title: r }), {
					align: "center",
					box: !0
				});
				return a.animation = eo(), i.mobileOrder = mo(88, t, 0), a.mobileOrder = mo(88, t, 1), [i, a];
			};
			return ho("funksjonskort", "420px", so(co("bg")), [
				Xa($(6, 28, 60, 38), Z("seed.features.title")),
				...e(6, 0, "✦", Z("seed.features.card1")),
				...e(37.5, 1, "★", Z("seed.features.card2")),
				...e(69, 2, "✓", Z("seed.features.card3"))
			]);
		},
		itemLabel: "kort",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = po(e, 3, 6, 31.5, 152, 296, 25, 264, -64), i = $a($(t + 10.5, n - 64, 4, 52), "✦"), a = Xa($(t, n, 25, 200), Z("seed.features.card", { title: Z("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return a.animation = eo(), i.mobileOrder = mo(88, r, 0), a.mobileOrder = mo(88, r, 1), {
				blocks: [i, a],
				bottom: n + 228
			};
		}
	}), e.sections.define("funksjonskort-enkel", {
		label: "Funksjonskort uten ikoner",
		labelKey: "preset.funksjonskort-enkel.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Tre kort med tittel og tekst (uten ikonene over)",
		hintKey: "preset.funksjonskort-enkel.hint",
		create: () => {
			let e = (e, t, n) => {
				let r = Xa($(e, 88, 25, 200), Z("seed.features.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.animation = eo(), r.mobileOrder = mo(88, t, 0), r;
			};
			return ho("funksjonskort-enkel", "360px", so(co("bg")), [
				Xa($(6, 28, 60, 38), Z("seed.features.title")),
				e(6, 0, Z("seed.features.card1")),
				e(37.5, 1, Z("seed.features.card2")),
				e(69, 2, Z("seed.features.card3"))
			]);
		},
		itemLabel: "kort",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = po(e, 3, 6, 31.5, 88, 232, 25, 200), i = Xa($(t, n, 25, 200), Z("seed.features.card", { title: Z("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.animation = eo(), i.mobileOrder = mo(88, r, 0), {
				blocks: [i],
				bottom: n + 228
			};
		}
	}), e.sections.define("nyheter", {
		label: "Nyheter",
		labelKey: "preset.nyheter.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Tre nyhetskort med bilde, tag og dato",
		hintKey: "preset.nyheter.hint",
		create: () => {
			let e = (e, t) => {
				let n = Za($(e, 88, 25, 160)), r = Xa($(e, 256, 25, 160), Z("seed.news.card"));
				return n.mobileOrder = mo(88, t, 0), r.mobileOrder = mo(88, t, 1), [n, r];
			};
			return ho("nyheter", "460px", so(co("bg")), [
				Xa($(6, 28, 50, 38), Z("seed.news.title")),
				Qa($(78, 30, 16, 36), Z("seed.news.seeAll"), { style: "secondary" }),
				...e(6, 0),
				...e(37.5, 1),
				...e(69, 2)
			]);
		},
		itemLabel: "sak",
		itemLabelKey: "item.story",
		item: (e) => {
			let { x: t, y: n, n: r } = po(e, 3, 6, 31.5, 88, 344, 25, 328), i = Za($(t, n, 25, 160)), a = Xa($(t, n + 168, 25, 160), Z("seed.news.card"));
			return i.mobileOrder = mo(88, r, 0), a.mobileOrder = mo(88, r, 1), {
				blocks: [i, a],
				bottom: n + 352
			};
		}
	}), e.sections.define("nyheter-samling", {
		label: "Nyheter (samling)",
		labelKey: "preset.nyheter-samling.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Nyhetskort fra en samling: skriv innslag, kortene følger med",
		hintKey: "preset.nyheter-samling.hint",
		create: () => ho("nyheter-samling", "300px", so(co("bg")), [Xa($(6, 28, 50, 38), Z("seed.news.title")), to($(6, 88, 88, 180), "cards")])
	}), e.sections.define("oppslagstavle", {
		label: "Oppslagstavle",
		labelKey: "preset.oppslagstavle.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Datert liste fra en samling (oppslag/kunngjøringer)",
		hintKey: "preset.oppslagstavle.hint",
		create: () => ho("oppslagstavle", "300px", so(co("surface")), [Xa($(6, 28, 50, 38), Z("seed.noticeboard.title")), to($(6, 88, 88, 180), "list", { limit: 8 })])
	}), e.sections.define("publikasjonsarkiv", {
		label: "Publikasjonsarkiv",
		labelKey: "preset.publikasjonsarkiv.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "År-gruppert arkiv fra en samling (utgaver, referater, rapporter)",
		hintKey: "preset.publikasjonsarkiv.hint",
		create: () => ho("publikasjonsarkiv", "300px", so(co("bg")), [Xa($(6, 28, 60, 38), Z("seed.archive.title")), to($(6, 88, 88, 180), "archive", { limit: 0 })])
	}), e.sections.define("arrangementer", {
		label: "Arrangementer",
		labelKey: "preset.arrangementer.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Tre rader med dato-badge og påmeldingsknapp",
		hintKey: "preset.arrangementer.hint",
		create: () => {
			let e = (e, t, n, r) => [
				Xa($(6, e, 8, 88), Z("seed.events.dateBadge", {
					day: t,
					month: n
				}), {
					align: "center",
					box: !0
				}),
				Xa($(16, e, 58, 88), Z("seed.events.row", { title: r })),
				Qa($(78, e + 24, 16, 40), Z("seed.events.signup"), { style: "secondary" })
			];
			return ho("arrangementer", "440px", so(co("surface")), [
				Xa($(6, 28, 50, 38), Z("seed.events.title")),
				...e(88, "11", Z("seed.events.monthAug"), Z("seed.events.row1")),
				...e(196, "25", Z("seed.events.monthAug"), Z("seed.events.row2")),
				...e(304, "8", Z("seed.events.monthSep"), Z("seed.events.row3"))
			]);
		},
		itemLabel: "rad",
		itemLabelKey: "item.row",
		item: (e) => {
			let t = uo(e) + 16;
			return {
				blocks: [
					Xa($(6, t, 8, 88), Z("seed.events.newBadge"), {
						align: "center",
						box: !0
					}),
					Xa($(16, t, 58, 88), Z("seed.events.row", { title: Z("seed.events.newTitle") })),
					Qa($(78, t + 24, 16, 40), Z("seed.events.signup"), { style: "secondary" })
				],
				bottom: t + 116
			};
		}
	}), e.sections.define("team", {
		label: "Team/styret",
		labelKey: "preset.team.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Portretter med navn, verv og e-post",
		hintKey: "preset.team.hint",
		create: () => {
			let e = (e, t, n) => {
				let r = Za($(e, 80, 22, 180), { alt: Z("seed.team.alt") }), i = Xa($(e, 268, 22, 84), Z("seed.team.member", { role: n }), { align: "center" });
				return r.mobileOrder = mo(80, t, 0), i.mobileOrder = mo(80, t, 1), [r, i];
			};
			return ho("team", "420px", so(co("surface")), [
				Xa($(6, 24, 50, 32), Z("seed.team.title")),
				...e(7.5, 0, Z("seed.team.role1")),
				...e(39, 1, Z("seed.team.role2")),
				...e(70.5, 2, Z("seed.team.role3"))
			]);
		},
		itemLabel: "person",
		itemLabelKey: "item.person",
		item: (e) => {
			let { x: t, y: n, n: r } = po(e, 3, 7.5, 31.5, 80, 288, 22, 272), i = Za($(t, n, 22, 180), { alt: Z("seed.team.alt") }), a = Xa($(t, n + 188, 22, 84), Z("seed.team.member", { role: Z("seed.team.roleNew") }), { align: "center" });
			return i.mobileOrder = mo(80, r, 0), a.mobileOrder = mo(80, r, 1), {
				blocks: [i, a],
				bottom: n + 296
			};
		}
	}), e.sections.define("faq", {
		label: "FAQ",
		labelKey: "preset.faq.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Spørsmål og svar i kort",
		hintKey: "preset.faq.hint",
		create: () => ho("faq", "520px", so(co("bg")), [
			Xa($(25, 24, 50, 36), Z("seed.faq.title"), { align: "center" }),
			ro($(20, 80, 60, 320), [
				{
					q: Z("seed.faq.q1"),
					a: Z("seed.faq.answer")
				},
				{
					q: Z("seed.faq.q2"),
					a: Z("seed.faq.answer")
				},
				{
					q: Z("seed.faq.q3"),
					a: Z("seed.faq.answer")
				}
			]),
			Xa($(20, 416, 60, 32), Z("seed.faq.more"), { align: "center" })
		])
	}), e.sections.define("tidslinje", {
		label: "Tidslinje",
		labelKey: "preset.tidslinje.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Historien som hendelser langs en linje",
		hintKey: "preset.tidslinje.hint",
		create: () => ho("tidslinje", "480px", so(co("bg")), [Xa($(25, 24, 50, 36), Z("seed.tidslinje.title"), { align: "center" }), ao($(25, 88, 50, 330), [
			{
				year: "2019",
				title: Z("seed.tidslinje.t1"),
				text: Z("seed.tidslinje.text")
			},
			{
				year: "2022",
				title: Z("seed.tidslinje.t2"),
				text: Z("seed.tidslinje.text")
			},
			{
				year: "2026",
				title: Z("seed.tidslinje.t3"),
				text: Z("seed.tidslinje.text")
			}
		])])
	}), e.sections.define("steg", {
		label: "Steg for steg",
		labelKey: "preset.steg.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Tre nummererte kort",
		hintKey: "preset.steg.hint",
		create: () => {
			let e = (e, t, n) => {
				let r = Xa($(e, 88, 25, 72), `<h3>${t + 1}</h3>`, {
					align: "center",
					size: 44
				}), i = Xa($(e, 168, 25, 160), Z("seed.steps.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.mobileOrder = mo(88, t, 0), i.mobileOrder = mo(88, t, 1), [r, i];
			};
			return ho("steg", "400px", so(co("bg")), [
				Xa($(6, 28, 60, 38), Z("seed.steps.title")),
				...e(6, 0, Z("seed.steps.s1")),
				...e(37.5, 1, Z("seed.steps.s2")),
				...e(69, 2, Z("seed.steps.s3"))
			]);
		},
		itemLabel: "steg",
		itemLabelKey: "item.step",
		item: (e) => {
			let { x: t, y: n, n: r } = po(e, 3, 6, 31.5, 88, 272, 25, 240), i = Xa($(t, n, 25, 72), `<h3>${r + 1}</h3>`, {
				align: "center",
				size: 44
			}), a = Xa($(t, n + 80, 25, 160), Z("seed.steps.card", { title: Z("seed.steps.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.mobileOrder = mo(88, r, 0), a.mobileOrder = mo(88, r, 1), {
				blocks: [i, a],
				bottom: n + 268
			};
		}
	}), e.sections.define("hovedoppslag", {
		label: "Hovedoppslag",
		labelKey: "preset.hovedoppslag.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Én stor sak og to små ved siden",
		hintKey: "preset.hovedoppslag.hint",
		create: () => {
			let e = [
				Za($(6, 40, 55, 300)),
				Xa($(6, 348, 55, 108), Z("seed.feature.main")),
				Qa($(6, 464, 14, 38), Z("seed.readMore"), { style: "secondary" }),
				Za($(66, 40, 28, 120)),
				Xa($(66, 164, 28, 60), Z("seed.feature.small1")),
				Za($(66, 244, 28, 120)),
				Xa($(66, 368, 28, 60), Z("seed.feature.small2"))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = mo(40, t < 3 ? 0 : 1, t);
			}), ho("hovedoppslag", "540px", so(co("bg")), e);
		}
	}), e.sections.define("produkter", {
		label: "Produkter",
		labelKey: "preset.produkter.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Tre produktkort; pek Kjøp-knappen på en betalingslenke (f.eks. Vipps)",
		hintKey: "preset.produkter.hint",
		create: () => {
			let e = (e, t, n, r) => {
				let i = [
					Za($(e, 88, 25, 200)),
					Xa($(e, 296, 25, 76), Z("seed.products.card", {
						name: n,
						price: r
					}), { align: "center" }),
					Qa($(e + 5, 380, 15, 40), Z("seed.products.buy"))
				];
				return i.forEach((e, n) => {
					e.mobileOrder = mo(88, t, n);
				}), i;
			};
			return ho("produkter", "470px", so(co("bg")), [
				Xa($(6, 28, 50, 38), Z("seed.products.title")),
				...e(6, 0, Z("seed.products.name"), Z("seed.products.price1")),
				...e(37.5, 1, Z("seed.products.name"), Z("seed.products.price2")),
				...e(69, 2, Z("seed.products.name"), Z("seed.products.price3"))
			]);
		},
		itemLabel: "produkt",
		itemLabelKey: "item.product",
		item: (e) => {
			let { x: t, y: n, n: r } = po(e, 3, 6, 31.5, 88, 348, 25, 332), i = [
				Za($(t, n, 25, 200)),
				Xa($(t, n + 208, 25, 76), Z("seed.products.card", {
					name: Z("seed.products.name"),
					price: Z("seed.products.price1")
				}), { align: "center" }),
				Qa($(t + 5, n + 292, 15, 40), Z("seed.products.buy"))
			];
			return i.forEach((e, t) => {
				e.mobileOrder = mo(88, r, t);
			}), {
				blocks: i,
				bottom: n + 356
			};
		}
	}), e.sections.define("cta", {
		label: "CTA-banner",
		labelKey: "preset.cta.label",
		group: "Fremheving",
		groupKey: "presetGroup.highlight",
		hint: "Full bredde med én tydelig handling",
		hintKey: "preset.cta.hint",
		create: () => ho("cta", "280px", so(co("surface"), lo(.5, .5, .3, .7)), [
			Xa($(20, 56, 60, 40), Z("seed.cta.title"), { align: "center" }),
			Xa($(25, 104, 50, 26), Z("seed.cta.sub"), { align: "center" }),
			Qa($(42, 148, 16, 42), Z("seed.join"))
		])
	}), e.sections.define("sitat", {
		label: "Sitat",
		labelKey: "preset.sitat.label",
		group: "Fremheving",
		groupKey: "presetGroup.highlight",
		hint: "Stort sitat med attribusjon",
		hintKey: "preset.sitat.hint",
		create: () => ho("sitat", "300px", so(co("bg")), [io($(20, 56, 60, 190), {
			text: Z("seed.sitat.text"),
			attribution: Z("seed.sitat.name"),
			role: Z("seed.sitat.role")
		})])
	}), e.sections.define("statistikk", {
		label: "Statistikk",
		labelKey: "preset.statistikk.label",
		group: "Fremheving",
		groupKey: "presetGroup.highlight",
		hint: "Tre store tall med etikett",
		hintKey: "preset.statistikk.hint",
		create: () => {
			let e = (e, t, n, r, i) => {
				let a = oo($(e, 76, 25, 120), {
					value: n,
					suffix: r,
					label: i
				});
				return a.mobileOrder = mo(76, t, 0), a;
			};
			return ho("statistikk", "260px", so(co("surface")), [
				e(6, 0, "120", "+", Z("seed.stats.l1")),
				e(37.5, 1, "25", "", Z("seed.stats.l2")),
				e(69, 2, "1981", "", Z("seed.stats.l3"))
			]);
		},
		itemLabel: "tall",
		itemLabelKey: "item.number",
		item: (e) => {
			let { x: t, y: n, n: r } = po(e, 3, 6, 31.5, 76, 140, 25, 120), i = oo($(t, n, 25, 120), {
				value: "42",
				label: Z("seed.stats.newLabel")
			});
			return i.mobileOrder = mo(76, r, 0), {
				blocks: [i],
				bottom: n + 148
			};
		}
	}), e.sections.define("sponsorer", {
		label: "Sponsorer",
		labelKey: "preset.sponsorer.label",
		group: "Fremheving",
		groupKey: "presetGroup.highlight",
		hint: "Logorad i gråtone med lenker",
		hintKey: "preset.sponsorer.hint",
		create: () => {
			let e = (e) => Za($(e, 108, 18.5, 100), {
				alt: Z("seed.sponsors.alt"),
				fit: "contain",
				radius: null,
				saturate: 0
			});
			return ho("sponsorer", "280px", so(co("bg")), [
				Xa($(6, 28, 60, 36), Z("seed.sponsors.title")),
				e(5.5),
				e(29),
				e(52.5),
				e(76)
			]);
		},
		itemLabel: "logo",
		itemLabelKey: "item.logo",
		item: (e) => {
			let { x: t, y: n } = po(e, 4, 5.5, 23.5, 108, 124, 18.5, 100);
			return {
				blocks: [Za($(t, n, 18.5, 100), {
					alt: Z("seed.sponsors.alt"),
					fit: "contain",
					radius: null,
					saturate: 0
				})],
				bottom: n + 124
			};
		}
	}), e.sections.define("medlemskap", {
		label: "Medlemskap",
		labelKey: "preset.medlemskap.label",
		group: "Fremheving",
		groupKey: "presetGroup.highlight",
		hint: "Prisnivåer med fordeler og Vipps-linje",
		hintKey: "preset.medlemskap.hint",
		create: () => ho("medlemskap", "500px", so(co("surface")), [
			Xa($(6, 28, 50, 38), Z("seed.membership.title")),
			Xa($(14, 88, 32, 250), Z("seed.membership.tier1"), {
				align: "center",
				box: !0
			}),
			Xa($(54, 88, 32, 250), Z("seed.membership.tier2"), {
				align: "center",
				box: !0
			}),
			Qa($(42, 358, 16, 42), Z("seed.join")),
			Xa($(25, 414, 50, 30), Z("seed.membership.vipps"), { align: "center" })
		])
	});
}
//#endregion
//#region ../template/assets/engine/0.6.11/maler-model.js
var _o = [
	"section",
	"blocks",
	"page"
];
function vo(e) {
	return ea(String(e ?? ""), "");
}
function yo(e, t, { id: n, title: r }) {
	let i = structuredClone(e);
	i.meta = {
		...i.meta,
		id: n,
		title: r
	};
	for (let e of i.sections ?? []) {
		e.id = t("sec");
		for (let n of e.blocks ?? []) n.id = t("blk");
	}
	return i;
}
//#endregion
//#region ../template/assets/engine/0.6.11/preset-thumb.js
var bo = /^#[0-9a-fA-F]{3,8}$/, xo = /^[a-z][a-z0-9-]*$/, So = "#171c26", Co = "#232a38", wo = "#98a1b3", To = "#7c5cff", Eo = (e, t) => `var(--urd-color-${e}, ${t})`;
function Do(e, t) {
	return typeof e == "string" ? bo.test(e) ? e : xo.test(e) ? Eo(e, t) : t : t;
}
function Oo(e, t = 800) {
	let n = Number.parseFloat(e);
	return !Number.isFinite(n) || n <= 0 ? 400 : typeof e == "string" && e.trim().endsWith("vh") ? n / 100 * t : n;
}
var ko = (e) => Math.round(e * 10) / 10, Ao = (e, t, n) => Math.min(n, Math.max(t, e)), jo = (e, t, n, r, i, a = "") => `<rect x="${ko(e)}" y="${ko(t)}" width="${ko(Math.max(n, 1))}" height="${ko(Math.max(r, 1))}" fill="${i}"${a}/>`;
function Mo(e) {
	for (let t of e?.background?.layers ?? []) {
		if (t.type === "color") return Do(t.props?.value, So);
		if (t.type === "gradient") return Do(Array.isArray(t.props?.stops) ? t.props.stops[0] : null, So);
	}
	return Eo("bg", So);
}
function No(e, t, n, r, i) {
	let a = /<h[1-3]/.test(String(i?.html ?? "")), o = i?.align === "center", s = Eo("text", wo), c = [], l = [
		.72,
		.9,
		.5
	], u = t + 1;
	for (let i = 0; i < 3; i++) {
		let d = i === 0 && a ? 4 : 2.2;
		if (u + d > t + r) break;
		let f = n * l[i], p = o ? e + (n - f) / 2 : e;
		c.push(jo(p, u, f, d, s, ` opacity="${i === 0 ? .8 : .4}" rx="1"`)), u += d + 2.4;
	}
	return c.join("");
}
function Po(e, t, n, r) {
	let i = Eo("text", wo), a = [jo(e, t, n, r, Eo("surface", Co), " rx=\"1.5\"")], o = (t) => ko(e + n * t), s = (e) => ko(t + r * e);
	return a.push(`<polygon points="${o(.08)},${s(.9)} ${o(.42)},${s(.38)} ${o(.62)},${s(.68)} ${o(.75)},${s(.5)} ${o(.92)},${s(.9)}" fill="${i}" opacity="0.4"/>`), a.push(`<circle cx="${o(.28)}" cy="${s(.26)}" r="${ko(Math.max(1, Math.min(n, r) * .1))}" fill="${i}" opacity="0.5"/>`), a.join("");
}
function Fo(e, t, n, r) {
	let i = Math.max(1, n * .03), a = (n - i * 2) / 3, o = [];
	for (let n = 0; n < 3; n++) o.push(Po(e + n * (a + i), t, a, r));
	return o.join("");
}
function Io(e, t, n, r) {
	let i = Math.max(1, n * .03), a = (n - i * 2) / 3, o = [];
	for (let n = 0; n < 3; n++) {
		let s = e + n * (a + i);
		o.push(jo(s, t, a, r * .55, Eo("surface", Co), " rx=\"1.5\"")), o.push(jo(s, t + r * .62, a * .8, 2, Eo("text", wo), " opacity=\"0.5\" rx=\"1\""));
	}
	return o.join("");
}
function Lo(e, t, n, r, i) {
	let a = Do(i?.color, To), o = i?.kind;
	return o === "circle" ? `<ellipse cx="${ko(e + n / 2)}" cy="${ko(t + r / 2)}" rx="${ko(Math.max(n / 2, 1))}" ry="${ko(Math.max(r / 2, 1))}" fill="${a}" opacity="0.8"/>` : o === "triangle" ? `<polygon points="${ko(e)},${ko(t + r)} ${ko(e + n / 2)},${ko(t)} ${ko(e + n)},${ko(t + r)}" fill="${a}" opacity="0.8"/>` : o === "line" || o === "arrow" ? jo(e, t + r / 2 - .75, n, 1.5, a, " opacity=\"0.85\" rx=\"0.75\"") : jo(e, t, n, r, a, " opacity=\"0.8\" rx=\"1\"");
}
function Ro(e, t, n, r, i, a) {
	if (e === "text") return No(t, n, r, i, a);
	if (e === "image") return Po(t, n, r, i);
	if (e === "galleri") return Fo(t, n, r, i);
	if (e === "samling") return Io(t, n, r, i);
	if (e === "shape") return Lo(t, n, r, i, a);
	if (e === "button") return jo(t, n, r, i, Eo("accent", To), ` rx="${ko(Math.min(i / 2, 4))}"`);
	if (e === "icon") {
		let e = Math.max(1.2, Math.min(r, i) / 2);
		return `<circle cx="${ko(t + r / 2)}" cy="${ko(n + i / 2)}" r="${ko(e)}" fill="${Eo("accent", To)}" opacity="0.85"/>`;
	}
	if (e === "video") {
		let e = [jo(t, n, r, i, Eo("surface", Co), " rx=\"1.5\"")], a = t + r / 2, o = n + i / 2, s = Math.max(1.5, Math.min(r, i) * .22);
		return e.push(`<polygon points="${ko(a - s / 2)},${ko(o - s)} ${ko(a - s / 2)},${ko(o + s)} ${ko(a + s)},${ko(o)}" fill="${Eo("text", wo)}" opacity="0.6"/>`), e.join("");
	}
	if (e === "tidslinje") {
		let e = [jo(t + 1, n, 1.4, i, Eo("accent", To), " opacity=\"0.7\" rx=\"0.7\"")];
		for (let a = 0; a < 3; a += 1) {
			let o = n + i * (.18 + a * .32);
			e.push(`<circle cx="${ko(t + 1.7)}" cy="${ko(o)}" r="1.6" fill="${Eo("accent", To)}"/>`), e.push(jo(t + 5, o - 1, r * .5, 2, Eo("text", wo), " opacity=\"0.5\" rx=\"1\""));
		}
		return e.join("");
	}
	return e === "sitat" ? [
		`<text x="${ko(t + r / 2)}" y="${ko(n + i * .34)}" text-anchor="middle" font-size="${ko(Math.min(r, i) * .5)}" font-family="Georgia, serif" fill="${Eo("accent", To)}">“</text>`,
		jo(t + r * .15, n + i * .48, r * .7, 2, Eo("text", wo), " opacity=\"0.6\" rx=\"1\""),
		jo(t + r * .25, n + i * .62, r * .5, 2, Eo("text", wo), " opacity=\"0.6\" rx=\"1\""),
		jo(t + r * .35, n + i * .82, r * .3, 1.6, Eo("text", wo), " opacity=\"0.35\" rx=\"0.8\"")
	].join("") : e === "statistikk" ? [jo(t + r * .28, n + i * .15, r * .44, i * .42, Eo("accent", To), " opacity=\"0.85\" rx=\"1\""), jo(t + r * .32, n + i * .72, r * .36, 1.6, Eo("text", wo), " opacity=\"0.4\" rx=\"0.8\"")].join("") : jo(t, n, r, i, Eo("surface", Co), " rx=\"1.5\"");
}
function zo(e, t, n) {
	let r = Array.isArray(e?.blocks) ? e.blocks : [], i = r.map((e) => (e.frames?.desktop?.y ?? 0) + (e.frames?.desktop?.h ?? 0)), a = n / Math.max(Oo(e?.size?.minHeight), i.length ? Math.max(...i) + 16 : 0), o = [jo(0, 0, t, n, Mo(e))];
	for (let r of e?.background?.layers ?? []) {
		if (r.type !== "glow") continue;
		let e = r.props ?? {};
		o.push(`<circle cx="${ko(Ao(e.x ?? .5, 0, 1) * t)}" cy="${ko(Ao(e.y ?? .3, 0, 1) * n)}" r="${ko(t * Ao(e.radius ?? .5, .1, 1) * .5)}" fill="${Do(e.color, To)}" opacity="${ko(Ao(e.opacity ?? .3, 0, .5))}"/>`);
	}
	for (let e of r) {
		let r = e.frames?.desktop;
		if (!r) continue;
		let i = Ao((r.x ?? 0) * (t / 100), 0, t - 2), s = Ao((r.y ?? 0) * a, 0, n - 2), c = Ao((r.w ?? 10) * (t / 100), 2, t - i), l = Ao((r.h ?? 20) * a, 2, n - s);
		o.push(Ro(e.type, i, s, c, l, e.props));
	}
	return o.join("");
}
function Bo(e, { w: t = 96, h: n = 116, max: r = 6 } = {}) {
	let i = (Array.isArray(e?.sections) ? e.sections : []).slice(0, r);
	if (!i.length) return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${jo(0, 0, t, n, Eo("bg", So))}</svg>`;
	let a = i.map((e) => Ao(Oo(e?.size?.minHeight), 160, 900)), o = a.reduce((e, t) => e + t, 0), s = n - 1 * (i.length - 1), c = [], l = 0;
	for (let e = 0; e < i.length; e += 1) {
		let n = Math.max(6, a[e] / o * s);
		c.push(`<g transform="translate(0 ${ko(l)})">${zo(i[e], t, n)}</g>`), l += n + 1;
	}
	return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${c.join("")}</svg>`;
}
//#endregion
//#region ../template/assets/engine/0.6.11/page-presets.js
var Vo = /* @__PURE__ */ new Map();
go({ sections: { define: (e, t) => Vo.set(e, t) } });
var Ho = [
	{
		id: "landing",
		labelKey: "pageTemplate.landing",
		sections: [
			"hero",
			"funksjonskort",
			"statistikk",
			"sitat",
			"cta"
		]
	},
	{
		id: "om-oss",
		labelKey: "pageTemplate.about",
		sections: [
			"hero-sentrert",
			"team",
			"tidslinje",
			"sponsorer",
			"cta"
		]
	},
	{
		id: "kontakt",
		labelKey: "pageTemplate.contact",
		sections: [
			"hero-sentrert",
			"kontakt",
			"faq"
		]
	},
	{
		id: "portefolje",
		labelKey: "pageTemplate.portfolio",
		sections: [
			"hero-sentrert",
			"galleri",
			"sitat",
			"cta"
		]
	},
	{
		id: "arrangement",
		labelKey: "pageTemplate.event",
		sections: [
			"hovedoppslag",
			"arrangementer",
			"steg",
			"faq",
			"cta"
		]
	}
];
function Uo(e, { pageId: t, title: n }) {
	let r = Ho.find((t) => t.id === e);
	return r ? {
		schemaVersion: 1,
		meta: {
			id: t,
			title: n
		},
		sections: r.sections.map((e) => Vo.get(e).create())
	} : null;
}
//#endregion
//#region ../template/assets/engine/0.6.11/palette-search.js
function Wo(e) {
	return String(e ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}
function Go(e, t) {
	let n = Wo(t).trim(), r = Wo(e);
	return n ? r.startsWith(n) ? 0 : r.split(/[^a-z0-9]+/).some((e) => e.startsWith(n)) ? 1 : r.includes(n) ? 2 : -1 : 2;
}
function Ko(e, t, n) {
	return e.map((e, r) => ({
		item: e,
		i: r,
		rank: Go(n(e), t)
	})).filter((e) => e.rank >= 0).sort((e, t) => e.rank - t.rank || e.i - t.i).map((e) => e.item);
}
//#endregion
//#region ../template/assets/engine/0.6.11/theme.js
function qo(e, t) {
	let n = e.tokens || {}, r = e.scheme === "dark" ? "dark" : "light";
	if (!e.alt?.tokens || t === r) return n;
	let i = {};
	for (let t of /* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(e.alt.tokens)])) i[t] = {
		...n[t],
		...e.alt.tokens[t]
	};
	return i;
}
var Jo = /^[a-zA-Z0-9#%.,()'"\s+\-*/]+$/;
function Yo(e) {
	return typeof e == "string" && Jo.test(e) && !/url\(|\/\*|\*\/|expression/i.test(e);
}
function Xo(e) {
	let t = e.tokens || {}, n = qo(e, "light"), r = qo(e, "dark"), i = e.scheme === "dark" ? "dark" : "light", a = [], o = [], s = [], c = /* @__PURE__ */ new Set([
		...Object.keys(t),
		...Object.keys(n),
		...Object.keys(r)
	]);
	for (let e of c) {
		let i = e === "color", c = /* @__PURE__ */ new Set([
			...Object.keys(t[e] || {}),
			...Object.keys(n[e] || {}),
			...Object.keys(r[e] || {})
		]);
		for (let l of c) {
			let c = t[e]?.[l], u = n[e]?.[l], d = r[e]?.[l];
			Yo(c) && (a.push(`  --urd-${e}-${l}: ${c};`), i && a.push(`  --urd-base-${l}: ${c};`)), u !== d && (i && Yo(u) && Yo(d) ? o.push({
				name: l,
				lv: u,
				dv: d
			}) : !i && Yo(u) && Yo(d) && s.push({
				group: e,
				name: l,
				lv: u,
				dv: d
			}));
		}
	}
	let l = o.length > 0 || s.length > 0, u = `:root {\n  color-scheme: ${l ? "light dark" : i};\n${a.join("\n")}\n}\n`;
	if (!l) return u;
	let d = [];
	for (let e of o) {
		let t = `light-dark(${e.lv}, ${e.dv})`;
		d.push(`    --urd-color-${e.name}: ${t};`), d.push(`    --urd-base-${e.name}: ${t};`);
	}
	if (u += "@supports (color: light-dark(#000, #fff)) {\n", d.length && (u += `  :root {\n${d.join("\n")}\n  }\n`), u += "  :root[data-urd-theme=\"light\"] { color-scheme: light; }\n", u += "  :root[data-urd-theme=\"dark\"] { color-scheme: dark; }\n", s.length) {
		let e = (e) => s.map((t) => `    --urd-${t.group}-${t.name}: ${e(t)};`).join("\n");
		u += `  @media (prefers-color-scheme: dark) {\n    :root {\n${s.map((e) => `      --urd-${e.group}-${e.name}: ${e.dv};`).join("\n")}\n    }\n  }\n`, u += `  :root[data-urd-theme="light"] {\n${e((e) => e.lv)}\n  }\n`, u += `  :root[data-urd-theme="dark"] {\n${e((e) => e.dv)}\n  }\n`;
	}
	return u += "}\n", u;
}
function Zo(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
var Qo = {
	flate: {
		"--urd-color-bg": "var(--urd-base-surface)",
		"--urd-color-surface": "color-mix(in srgb, var(--urd-base-text) 7%, var(--urd-base-surface))"
	},
	aksent: {
		"--urd-color-bg": "var(--urd-base-accent)",
		"--urd-color-surface": "color-mix(in srgb, var(--urd-base-accent) 82%, #000)",
		"--urd-color-text": "var(--urd-base-accent-text)",
		"--urd-color-accent": "var(--urd-base-accent-text)",
		"--urd-color-accent-text": "var(--urd-base-accent)"
	},
	invers: {
		"--urd-color-bg": "var(--urd-base-text)",
		"--urd-color-surface": "color-mix(in srgb, var(--urd-base-text) 78%, var(--urd-base-bg))",
		"--urd-color-text": "var(--urd-base-bg)"
	},
	dus: {
		"--urd-color-bg": "color-mix(in srgb, var(--urd-base-accent) 12%, var(--urd-base-bg))",
		"--urd-color-surface": "color-mix(in srgb, var(--urd-base-accent) 8%, var(--urd-base-surface))"
	},
	dempet: {
		"--urd-color-bg": "color-mix(in srgb, var(--urd-base-text) 5%, var(--urd-base-bg))",
		"--urd-color-surface": "color-mix(in srgb, var(--urd-base-text) 10%, var(--urd-base-bg))",
		"--urd-color-text": "color-mix(in srgb, var(--urd-base-text) 82%, var(--urd-base-bg))"
	},
	dyp: {
		"--urd-color-bg": "color-mix(in srgb, var(--urd-base-accent) 30%, var(--urd-base-text))",
		"--urd-color-surface": "color-mix(in srgb, var(--urd-base-accent) 40%, var(--urd-base-text))",
		"--urd-color-text": "var(--urd-base-bg)"
	},
	uthevet: { "--urd-color-surface": "color-mix(in srgb, var(--urd-base-accent) 14%, var(--urd-base-surface))" }
}, $o = {
	flate: "sectionTheme.flate",
	aksent: "sectionTheme.aksent",
	invers: "sectionTheme.invers",
	dus: "sectionTheme.dus",
	dempet: "sectionTheme.dempet",
	dyp: "sectionTheme.dyp",
	uthevet: "sectionTheme.uthevet"
};
[...new Set(Object.values(Qo).flatMap(Object.keys))];
function es(e) {
	return Qo[e] ?? {};
}
function ts(e) {
	let t = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(typeof e == "string" ? e.trim() : "");
	if (!t) return null;
	let n = t[1];
	n.length === 3 && (n = n.split("").map((e) => e + e).join(""));
	let r = (e) => {
		let t = parseInt(e, 16) / 255;
		return t <= .03928 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4;
	};
	return .2126 * r(n.slice(0, 2)) + .7152 * r(n.slice(2, 4)) + .0722 * r(n.slice(4, 6));
}
function ns(e, t) {
	let n = ts(e), r = ts(t);
	return n == null || r == null ? null : (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
//#endregion
//#region ../template/assets/engine/0.6.11/backgrounds/color.js
var rs = {
	version: 1,
	label: "Farge",
	labelKey: "bgLayer.color",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = Zo(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, is = {
	linear: [
		"pan",
		"pan-loop",
		"rotate"
	],
	radial: ["pulse", "orbit"]
};
function as(e) {
	let t = Array.isArray(e) && e.length ? e : [{ color: "#0b0e14" }, { color: "#1a1030" }], n = t.map((e) => Math.max(0, Number(e?.share) || 0)), r = n.reduce((e, t) => e + t, 0), i = r <= 0, a = i ? t.length : r, o = 0;
	return t.map((e, t) => {
		let r = i ? 1 : n[t], s = (o + r / 2) / a * 100;
		return o += r, {
			color: e?.color ?? "#0b0e14",
			at: Math.round(s * 100) / 100
		};
	});
}
function os(e) {
	let t = (e) => Math.round(e * 100) / 100, n = e[0]?.at ?? 0;
	return [...e.map((e) => ({
		color: e.color,
		at: t(e.at - n)
	})), {
		color: e[0]?.color ?? "#0b0e14",
		at: 100
	}];
}
function ss(e, t, n, r = .5) {
	let i = n % 360 * Math.PI / 180, a = (e) => Math.round(e * 100) / 100 || 0, o = (Math.abs(e * Math.sin(i)) + Math.abs(t * Math.cos(i))) / (1 - Math.min(Math.max(r, 0), .9));
	return {
		period: a(o),
		dx: a(Math.sin(i) * o),
		dy: a(-Math.cos(i) * o)
	};
}
function cs(e, t, n) {
	return `repeating-linear-gradient(${t}deg, ${e.map((e) => `${Zo(e.color)} ${Math.round(e.at / 100 * n * 100) / 100}px`).join(", ")})`;
}
function ls(e) {
	let t = e.kind === "radial" ? "radial" : "linear", n = (is[t] ?? []).includes(e.animation) ? e.animation : null, r = as(e.stops), i = r.map((e) => `${Zo(e.color)} ${e.at}%`).join(", "), a = {}, o;
	if (t === "radial") {
		let t = Math.round((e.x ?? .5) * 100), r = Math.round((e.y ?? .5) * 100);
		if (o = `radial-gradient(circle at ${t}% ${r}%, ${i})`, n === "orbit") return {
			background: null,
			className: null,
			styles: a,
			runner: {
				className: "urd-bg-orbit-runner",
				background: o,
				left: `${-t}%`,
				top: `${-r}%`
			}
		};
		n === "pulse" && (a["--urd-bg-op"] = String(e.opacity ?? 1));
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
					stops: os(r),
					maxShare: o
				}
			};
		}
		if (o = n === "rotate" ? `linear-gradient(calc(var(--urd-grad-spin, 0deg) + ${t}deg), ${i})` : `linear-gradient(${t}deg, ${i})`, n === "pan") return {
			background: null,
			className: null,
			styles: a,
			runner: {
				className: "urd-bg-pan-runner",
				background: o
			}
		};
	}
	return {
		background: o,
		className: n ? {
			rotate: "urd-bg-rotate",
			pulse: "urd-bg-pulse"
		}[n] ?? null : null,
		styles: a
	};
}
var us = /* @__PURE__ */ new Set(), ds = !1;
function fs(e) {
	us.add(e), !(ds || typeof window > "u") && (ds = !0, window.addEventListener("resize", () => {
		for (let e of [...us]) e() || us.delete(e);
	}));
}
var ps = !1;
function ms() {
	if (!ps) {
		ps = !0;
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
var hs = {
	version: 1,
	label: "Gradient",
	labelKey: "bgLayer.gradient",
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
	migrations: {},
	render(e, t) {
		let n = ls(t);
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
					let e = ss(r, i, n.loop.angle, n.loop.maxShare);
					t.style.inset = `${-Math.ceil(e.period)}px`, t.style.background = cs(n.loop.stops, n.loop.angle, e.period), t.style.setProperty("--urd-loop-dx", `${e.dx}px`), t.style.setProperty("--urd-loop-dy", `${e.dy}px`);
				}
				return !0;
			};
			requestAnimationFrame(r), fs(r);
			return;
		}
		if (n.runner) {
			e.classList.add("urd-bg-loop-host");
			let t = document.createElement("div");
			t.className = n.runner.className, t.style.background = n.runner.background, n.runner.left != null && (t.style.left = n.runner.left), n.runner.top != null && (t.style.top = n.runner.top), e.appendChild(t);
			return;
		}
		e.style.background = n.background, n.className && (e.classList.add(n.className), n.className === "urd-bg-rotate" && ms());
	}
}, gs = {
	version: 1,
	label: "Glød",
	labelKey: "bgLayer.glow",
	defaults: () => ({
		x: .5,
		y: .3,
		color: "accent",
		radius: .5,
		opacity: .35
	}),
	migrations: {},
	render(e, t) {
		let n = Zo(t.color), r = t.x ?? .5, i = t.y ?? .3, a = t.radius ?? .5;
		e.style.background = `radial-gradient(circle at ${r * 100}% ${i * 100}%, ${n} 0%, transparent ${a * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, _s = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", vs = {
	version: 1,
	label: "Korn",
	labelKey: "bgLayer.grain",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = _s, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
}, ys = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
function bs(e) {
	return typeof e == "string" && ys.test(e);
}
//#endregion
//#region ../template/assets/engine/0.6.11/backgrounds/image.js
var xs = .4;
function Ss(e, t) {
	return `${(e ?? .5) * 100}% ${(t ?? .5) * 100}%`;
}
function Cs(e, t) {
	return e === "contain" ? "contain" : e === "cover" ? "cover" : `${Math.max(0, t ?? 1) * 100}%`;
}
function ws(e) {
	let t = "-9999px";
	return e === "up" ? `inset(${t} 0 0 0)` : e === "down" ? `inset(0 0 ${t} 0)` : e === "both" ? `inset(${t} 0 ${t} 0)` : "inset(0)";
}
function Ts(e, t, n, r = .18) {
	let i = Math.max(0, Math.min(1, n)) * xs * t;
	return Math.round(Math.min(i, r * e));
}
function Es(e, t, n, r, i) {
	let a = e + t / 2, o = (n / 2 - a) * Math.max(0, Math.min(1, r)) * xs, s = i ?? Ts(t, n, r);
	return Math.max(-s, Math.min(s, o)) || 0;
}
var Ds = /* @__PURE__ */ new Set(), Os = !1, ks = 0;
function As() {
	ks = 0;
	for (let e of [...Ds]) e() || Ds.delete(e);
}
function js() {
	ks ||= requestAnimationFrame(As);
}
function Ms(e) {
	Ds.add(e), e(), !(Os || typeof window > "u") && (Os = !0, window.addEventListener("scroll", js, { passive: !0 }), window.addEventListener("resize", js, { passive: !0 }));
}
function Ns(e, t, n, r) {
	let i = r === "cover" || r === "flislegg" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement, o = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
	e.style.willChange = "transform";
	let s = (t) => {
		e.style.top = `-${t}px`, e.style.bottom = `-${t}px`;
	}, c = () => {
		if (!e.isConnected) return !1;
		if (o || document.body.classList.contains("urd-mobile")) return s(n), e.style.transform = "", !0;
		let r = (a ?? e).getBoundingClientRect(), c = window.innerHeight || document.documentElement.clientHeight, l = Ts(r.height, c, t, i ? .18 : .6);
		s(i ? Math.max(n, l) : n);
		let u = Es(r.top, r.height, c, t, l);
		return e.style.transform = `translateY(${u.toFixed(1)}px)`, !0;
	};
	Ms(c), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(c));
}
function Ps() {
	return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("animation-timeline", "view()");
}
var Fs = /* @__PURE__ */ new Set(), Is = !1, Ls = 0;
function Rs() {
	Ls = 0;
	for (let e of [...Fs]) e() || Fs.delete(e);
}
function zs() {
	!Ls && typeof requestAnimationFrame == "function" && (Ls = requestAnimationFrame(Rs));
}
function Bs(e) {
	Fs.add(e), e(), !(Is || typeof window > "u") && (Is = !0, window.addEventListener("resize", zs, { passive: !0 }));
}
function Vs(e, t, n, r) {
	let i = r === "cover" || r === "flislegg" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement;
	e.style.willChange = "transform", e.classList.add("urd-parallax-css");
	let o = () => {
		if (!e.isConnected) return !1;
		let r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || document.body.classList.contains("urd-mobile"), o = (a ?? e).getBoundingClientRect(), s = window.innerHeight || document.documentElement.clientHeight, c = Ts(o.height, s, t, i ? .18 : .6), l = i && !r ? Math.max(n, c) : n;
		return e.style.setProperty("--urd-px-shift", `${c}px`), e.style.top = `-${l}px`, e.style.bottom = `-${l}px`, !0;
	};
	Bs(o), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(o));
}
var Hs = {
	version: 1,
	label: "Bilde",
	labelKey: "bgLayer.image",
	defaults: () => ({
		src: "",
		fit: "vanlig",
		x: .5,
		y: .5,
		size: 1,
		opacity: 1,
		blur: 0,
		parallax: 0,
		bleed: "none"
	}),
	migrations: {},
	render(e, t) {
		if (!bs(t.src)) return;
		e.style.opacity = String(t.opacity ?? 1), e.style.clipPath = ws(t.bleed), e.style.zIndex = t.bleed === "down" || t.bleed === "both" ? "1" : "";
		let n = document.createElement("div");
		n.className = "urd-bg-image", n.style.position = "absolute", n.style.left = "0", n.style.right = "0", n.style.top = "0", n.style.bottom = "0";
		let r = t.fit === "flislegg" || t.fit === "repeat";
		n.style.backgroundImage = `url("${t.src}")`, n.style.backgroundSize = Cs(t.fit, t.size), n.style.backgroundRepeat = r ? "repeat" : "no-repeat", n.style.backgroundPosition = Ss(t.x, t.y);
		let i = 0;
		t.blur > 0 && (n.style.filter = `blur(${t.blur}px)`, i = Math.ceil(t.blur), n.style.left = `-${i}px`, n.style.right = `-${i}px`, n.style.top = `-${i}px`, n.style.bottom = `-${i}px`);
		let a = new Image();
		if (a.src = t.src, !a.complete) {
			e.style.visibility = "hidden";
			let t = () => {
				e.style.visibility = "";
			};
			a.addEventListener("load", t, { once: !0 }), a.addEventListener("error", t, { once: !0 });
		}
		if (e.appendChild(n), t.parallax > 0) {
			let e = t.fit ?? "cover";
			Ps() ? Vs(n, t.parallax, i, e) : Ns(n, t.parallax, i, e);
		}
	}
};
//#endregion
//#region ../template/assets/engine/0.6.11/galleri-model.js
function Us(e, t, n) {
	return !Number.isFinite(n) || n < 1 ? 0 : (((Number.isFinite(e) ? e : 0) + t) % n + n) % n;
}
function Ws({ count: e = 0, reducedMotion: t = !1 } = {}) {
	return e >= 2 && !t;
}
function Gs(e, { min: t = 2, fallback: n = 5 } = {}) {
	let r = Number(e);
	return !Number.isFinite(r) || r <= 0 ? n : Math.max(t, r);
}
//#endregion
//#region ../template/assets/engine/0.6.11/backgrounds/bildegalleri.js
var Ks = {
	version: 1,
	label: "Bildegalleri",
	labelKey: "bgLayer.bildegalleri",
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
		let n = (t.images ?? []).filter((e) => bs(e?.src));
		if (!n.length) return;
		e.classList.add("urd-bg-galleri"), e.style.opacity = String(t.opacity ?? 1), t.blur > 0 && (e.style.filter = `blur(${t.blur}px)`, e.style.inset = `-${t.blur * 2}px`);
		let r = Math.max(0, Number(t.fade) || 0);
		e.style.setProperty("--urd-bgg-fade", `${r}s`);
		let i = (e, n) => {
			e.style.backgroundImage = `url("${n.src}")`, e.style.backgroundSize = Cs(t.fit), e.style.backgroundRepeat = "no-repeat", e.style.backgroundPosition = Ss(n.x, n.y);
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
		if (!Ws({
			count: n.length,
			reducedMotion: s
		})) return;
		let c = document.createElement("div");
		c.className = "urd-bg-slide", e.appendChild(c);
		let l = 0, u = o, d = Math.max(Gs(t.interval, { fallback: 6 }), r + .5) * 1e3, f = setInterval(() => {
			if (!e.isConnected) {
				clearInterval(f);
				return;
			}
			if (document.hidden) return;
			let t = Us(l, 1, n.length), r = new Image();
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
//#region ../template/assets/engine/0.6.11/footer-thumb.js
function qs(e = {}) {
	let t = "#2fd6b6", n = "#5c6b64", r = e.mega ? "#16221d" : "#0e1512", i = e.cols ?? 0, a = e.social ?? 0, o = `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${r}"/>`;
	if (e.mega && (o += `<circle cx="20" cy="6" r="34" fill="${t}" opacity="0.18"/>`), e.bigcta) return o += `<rect x="45" y="18" width="70" height="8" rx="3" fill="${n}" opacity="0.85"/>`, o += `<rect x="56" y="32" width="48" height="4" rx="2" fill="${n}" opacity="0.5"/>`, o += `<rect x="62" y="43" width="36" height="10" rx="3" fill="${t}"/>`, o += Js(n, e.baselineLinks), o + "</svg>";
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
	return o += Js(n, e.baselineLinks), o + "</svg>";
}
function Js(e, t = 0) {
	let n = `<line x1="8" y1="66" x2="152" y2="66" stroke="${e}" stroke-width="0.6" opacity="0.5"/>`;
	return n += `<rect x="8" y="70" width="40" height="3" rx="1.5" fill="${e}" opacity="0.6"/>`, t && (n += `<g fill="${e}" opacity="0.6">` + Array.from({ length: t }, (e, t) => `<rect x="${120 - t * 16}" y="70" width="12" height="3" rx="1.5"/>`).join("") + "</g>"), n;
}
//#endregion
//#region ../template/assets/engine/0.6.11/animations/core.js
var Ys = () => ({
	duration: 600,
	delay: 0
}), Xs = {
	"fade-in": {
		version: 1,
		label: "Ton inn",
		labelKey: "anim.fadeIn",
		entrance: !0,
		defaults: Ys,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Gli opp",
		labelKey: "anim.slideUp",
		entrance: !0,
		defaults: Ys,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom inn",
		labelKey: "anim.zoomIn",
		entrance: !0,
		defaults: Ys,
		migrations: {}
	},
	"hover-lift": {
		version: 1,
		label: "Løft ved peker",
		labelKey: "anim.hoverLift",
		entrance: !1,
		defaults: () => ({}),
		migrations: {}
	},
	stagger: {
		version: 1,
		label: "Stagger (kortgruppe)",
		labelKey: "anim.stagger",
		entrance: !0,
		group: !0,
		defaults: () => ({
			duration: 600,
			delay: 0,
			step: 90,
			effect: "slide-up",
			pattern: "sequence"
		}),
		migrations: {}
	}
}, Zs = [
	["font.system", "system-ui, sans-serif"],
	["font.arial", "Arial, Helvetica, sans-serif"],
	["font.verdana", "Verdana, Geneva, sans-serif"],
	["font.trebuchet", "'Trebuchet MS', sans-serif"],
	["font.georgia", "Georgia, 'Times New Roman', serif"],
	["font.palatino", "'Palatino Linotype', Palatino, serif"],
	["font.courier", "'Courier New', monospace"]
];
//#endregion
//#region ../template/assets/engine/0.6.11/place.js
function Qs(e) {
	let t = (e) => Math.round(e * 100) / 100, n = Math.max(0, t(100 - e.w)), r = Math.min(n, Math.max(0, t(e.x - e.w / 2))), i = Math.max(0, e.y - e.h / 2), a = e.snap === !1 || e.grid?.snap === !1, o = e.grid?.size || 8;
	return i = a ? Math.round(i) : Math.round(i / o) * o, {
		x: r,
		y: Math.max(0, i)
	};
}
//#endregion
//#region src/App.svelte
var $s = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), ec = /* @__PURE__ */ U("<button class=\"ghost row-tool svelte-1n46o8q\"></button>"), tc = /* @__PURE__ */ U("<span><span class=\"grad-grip svelte-1n46o8q\"><svg viewBox=\"0 0 16 16\" width=\"14\" height=\"14\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"13\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"13\" r=\"1.4\"></circle></svg></span> <!> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span> <!></span>"), nc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), rc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/>", 1), ic = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), ac = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), oc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.01\" max=\"0.3\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), sc = /* @__PURE__ */ U("<div class=\"sizefill svelte-1n46o8q\"><button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button> <button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button></div> <label class=\"svelte-1n46o8q\"> </label> <div class=\"focalpad svelte-1n46o8q\"><span class=\"focaldot svelte-1n46o8q\"></span></div> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), cc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), lc = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> </label> <div class=\"sizestep svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"10\" max=\"400\" class=\"svelte-1n46o8q\"/> <span class=\"sizeunit svelte-1n46o8q\">%</span> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></div> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), uc = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), dc = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"120\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\"> </p>", 1), fc = /* @__PURE__ */ U("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!></div>"), pc = /* @__PURE__ */ U("<!> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), mc = /* @__PURE__ */ U("<input class=\"nav-target svelte-1n46o8q\"/>"), hc = /* @__PURE__ */ U("<div class=\"nav-row nav-sub-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div>"), gc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label>"), _c = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"num-stepper svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"1\" max=\"12\" step=\"1\" class=\"svelte-1n46o8q\"/> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></span></label>", 1), vc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), yc = /* @__PURE__ */ U("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), bc = /* @__PURE__ */ U("<span class=\"nav-line svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span>"), xc = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), Sc = /* @__PURE__ */ U("<span class=\"nav-line svelte-1n46o8q\"><input class=\"tl-year svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <input class=\"svelte-1n46o8q\"/>", 1), Cc = /* @__PURE__ */ U("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), wc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Tc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Ec = /* @__PURE__ */ U("<input class=\"svelte-1n46o8q\"/>"), Dc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), Oc = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>"), kc = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), Ac = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> </label> <input class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), jc = /* @__PURE__ */ U("<input class=\"token-input svelte-1n46o8q\" maxlength=\"4\"/>"), Mc = /* @__PURE__ */ U("<button class=\"ghost svelte-1n46o8q\"> </button>"), Nc = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\"> </button></span>"), Pc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"toolbar-row svelte-1n46o8q\"><!> <!></span></label> <!>", 1), Fc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Ic = /* @__PURE__ */ U("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label></div>"), Lc = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Rc = /* @__PURE__ */ U("<p> </p>"), zc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), Bc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" class=\"svelte-1n46o8q\"/></label>"), Vc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label>"), Hc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Uc = /* @__PURE__ */ U("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Wc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Gc = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Kc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), qc = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Jc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Yc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Xc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Zc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Qc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"60\" class=\"svelte-1n46o8q\"/></label>"), $c = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), el = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), tl = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label>", 1), nl = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"400\" class=\"svelte-1n46o8q\"/></label>"), rl = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!>", 1), il = /* @__PURE__ */ U("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), al = /* @__PURE__ */ U("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), ol = /* @__PURE__ */ U("<!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details>", 1), sl = /* @__PURE__ */ U("<div class=\"props-tabs svelte-1n46o8q\"><span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div> <!>", 1), cl = /* @__PURE__ */ U("<button class=\"chrome-restore svelte-1n46o8q\"><!> </button>"), ll = /* @__PURE__ */ U("<button><!> </button>"), ul = /* @__PURE__ */ U("<div class=\"tool-pop svelte-1n46o8q\"></div>"), dl = /* @__PURE__ */ U("<span class=\"toolmenu svelte-1n46o8q\"><button><!><!></button> <!></span>"), fl = /* @__PURE__ */ U("<button></button>"), pl = /* @__PURE__ */ U("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"viewswitch toolgrp svelte-1n46o8q\"></span>", 1), ml = /* @__PURE__ */ U("<div class=\"tool-pop svelte-1n46o8q\"><div class=\"tool-pop-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button></div> <button><!> </button></div>"), hl = /* @__PURE__ */ U("<span class=\"toolmenu svelte-1n46o8q\"><button><span class=\"zoom-cap svelte-1n46o8q\"> </span><!></button> <!></span>"), gl = /* @__PURE__ */ U("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"zoomswitch toolgrp svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button> <button></button></span>", 1), _l = /* @__PURE__ */ U("<div class=\"tool-pop svelte-1n46o8q\"><button><!> </button> <button><!> </button></div>"), vl = /* @__PURE__ */ U("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"toolgrp svelte-1n46o8q\"><button></button> <button></button></span>", 1), yl = /* @__PURE__ */ U("<button class=\"ghost page-btn svelte-1n46o8q\"> </button> <span class=\"toolset svelte-1n46o8q\"><!> <!> <!></span>", 1), bl = /* @__PURE__ */ U("<button class=\"badge attention svelte-1n46o8q\"><!> <span class=\"btn-label svelte-1n46o8q\"> </span> <span class=\"badge-mini svelte-1n46o8q\"> </span></button>"), xl = /* @__PURE__ */ U("<button class=\"discard-confirm svelte-1n46o8q\"><!> </button>"), Sl = /* @__PURE__ */ U("<span class=\"chip draft-chip svelte-1n46o8q\"><span class=\"chip-full svelte-1n46o8q\" aria-hidden=\"true\"> </span> <span class=\"chip-mini svelte-1n46o8q\" aria-hidden=\"true\">!</span></span>  <span class=\"discard-wrap svelte-1n46o8q\"><button><!><span class=\"discard-label svelte-1n46o8q\"> </span></button> <!></span>", 1), Cl = /* @__PURE__ */ U("<!> <span class=\"btn-label svelte-1n46o8q\"> </span>", 1), wl = /* @__PURE__ */ U("<span class=\"who svelte-1n46o8q\"><!> </span>"), Tl = /* @__PURE__ */ U("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\"> </a>"), El = /* @__PURE__ */ U("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\"><!> <span class=\"btn-label svelte-1n46o8q\"> </span></a> <button class=\"primary svelte-1n46o8q\"> </button>", 1), Dl = /* @__PURE__ */ U("<button> </button>"), Ol = /* @__PURE__ */ U("<span class=\"rail-group svelte-1n46o8q\"> </span> <!>", 1), kl = /* @__PURE__ */ U("<div class=\"settings-pop svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label></div>"), Al = /* @__PURE__ */ U("<span class=\"page-path svelte-1n46o8q\">/</span>"), jl = /* @__PURE__ */ U("<input class=\"page-slug svelte-1n46o8q\"/>"), Ml = /* @__PURE__ */ U("<button class=\"ghost danger svelte-1n46o8q\"><!> </button>"), Nl = /* @__PURE__ */ U("<div class=\"page-menu svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"><!> </button> <!></div>"), Pl = /* @__PURE__ */ U("<div><input class=\"page-title svelte-1n46o8q\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <span class=\"page-menu-wrap svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <!></span></span></div>"), Fl = /* @__PURE__ */ U("<div><button class=\"page-mal-pick svelte-1n46o8q\"><span class=\"page-mal-thumb svelte-1n46o8q\"></span> <span class=\"page-mal-name svelte-1n46o8q\"> </span></button></div>"), Il = /* @__PURE__ */ U("<div><button class=\"page-mal-pick svelte-1n46o8q\"><span class=\"page-mal-thumb svelte-1n46o8q\"></span> <span class=\"page-mal-name svelte-1n46o8q\"> </span></button> <button class=\"page-mal-del svelte-1n46o8q\"></button></div>"), Ll = /* @__PURE__ */ U("<span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-mal-grid svelte-1n46o8q\"></div>", 1), Rl = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-mal-grid svelte-1n46o8q\"><div><button class=\"page-mal-pick svelte-1n46o8q\"><span class=\"page-mal-thumb svelte-1n46o8q\"></span> <span class=\"page-mal-name svelte-1n46o8q\"> </span></button></div> <!></div> <!></div>"), zl = /* @__PURE__ */ U("<input class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\"/> <button><b> </b></button> <button><i> </i></button></span>", 1), Bl = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\"/></span>"), Vl = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Hl = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Ul = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Wl = /* @__PURE__ */ U("<div class=\"nav-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div> <!>", 1), Gl = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"4\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details></div>"), Kl = /* @__PURE__ */ U("<div class=\"cw-row svelte-1n46o8q\"><span class=\"mini-label cw-screen svelte-1n46o8q\"> </span> <span><span class=\"cw-fill svelte-1n46o8q\"></span></span> <span class=\"gridmenu-value cw-margin svelte-1n46o8q\"> </span></div>"), ql = /* @__PURE__ */ U("<div class=\"mini-label cw-binds svelte-1n46o8q\"> </div>"), Jl = /* @__PURE__ */ U("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), Yl = /* @__PURE__ */ U("<img class=\"site-icon-preview svelte-1n46o8q\"/>"), Xl = /* @__PURE__ */ U("<button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), Zl = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"sample cw-sample svelte-1n46o8q\"><!> <div class=\"cw-legend svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!></div> <div class=\"seg cw-seg svelte-1n46o8q\"></div> <!> <p class=\"mini-label svelte-1n46o8q\"> </p> <div class=\"seg cw-seg svelte-1n46o8q\"></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div>"), Ql = /* @__PURE__ */ U("<div class=\"mini-label tpv-cap svelte-1n46o8q\"> </div>"), $l = /* @__PURE__ */ U("<div class=\"theme-pvw svelte-1n46o8q\"><!> <div class=\"tpv-demo svelte-1n46o8q\"><div class=\"tpv-h svelte-1n46o8q\"> </div> <div class=\"tpv-card svelte-1n46o8q\"> </div> <div class=\"tpv-row svelte-1n46o8q\"><span class=\"tpv-btn svelte-1n46o8q\"> </span><span class=\"tpv-lnk svelte-1n46o8q\"> </span></div></div></div>"), eu = /* @__PURE__ */ U("<button type=\"button\"><span class=\"tp-band svelte-1n46o8q\"><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i></span> <small class=\"svelte-1n46o8q\"> </small></button>"), tu = /* @__PURE__ */ U("<div class=\"ctl-row autorow svelte-1n46o8q\"><span class=\"autolbl svelte-1n46o8q\"> </span> <span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div>"), nu = /* @__PURE__ */ U("<span class=\"mini-label svelte-1n46o8q\"> </span>"), ru = /* @__PURE__ */ U("<div class=\"palcol svelte-1n46o8q\"><!> <span class=\"palcap svelte-1n46o8q\"> </span> <b class=\"palhex svelte-1n46o8q\"> </b></div>"), iu = /* @__PURE__ */ U("<div class=\"ctl-row palhead svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <button type=\"button\"> </button></div> <div></div>", 1), au = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"theme-presets svelte-1n46o8q\"></div> <p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <div class=\"ctl-row palhead svelte-1n46o8q\"><!> <button type=\"button\"> </button></div> <div class=\"palcells svelte-1n46o8q\"></div> <!> <div class=\"theme-previews svelte-1n46o8q\"><!> <!></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <div class=\"sample typo-sample svelte-1n46o8q\"><div class=\"ts-h svelte-1n46o8q\"> </div> <div class=\"ts-b svelte-1n46o8q\"> </div></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"sample form-prev svelte-1n46o8q\"><span class=\"fp-btn svelte-1n46o8q\"> </span> <span class=\"fp-card svelte-1n46o8q\"> </span></div> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"24\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"40\" step=\"1\" class=\"svelte-1n46o8q\"/></div></details></div>"), ou = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label>"), su = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label>"), cu = /* @__PURE__ */ U("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), lu = /* @__PURE__ */ U("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <!> <!>", 1), uu = /* @__PURE__ */ U("<div><input type=\"text\" class=\"svelte-1n46o8q\"/> <!></div>"), du = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), fu = /* @__PURE__ */ U("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), pu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), mu = /* @__PURE__ */ U("<button><span class=\"rs-sample svelte-1n46o8q\"><i class=\"rs-line svelte-1n46o8q\"></i> <i class=\"rs-chip svelte-1n46o8q\"></i> <i class=\"rs-dot svelte-1n46o8q\"></i></span> <span class=\"rs-name svelte-1n46o8q\"> </span></button>"), hu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"1000\" step=\"10\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), gu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <!>", 1), _u = /* @__PURE__ */ U("<p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"token-input svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"rs-grid svelte-1n46o8q\"></div> <label class=\"svelte-1n46o8q\"> <span class=\"row-tools svelte-1n46o8q\"><span class=\"gridmenu-value svelte-1n46o8q\"> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label>", 1), vu = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), yu = /* @__PURE__ */ U("<button class=\"footer-tp svelte-1n46o8q\"><span class=\"footer-tp-thumb svelte-1n46o8q\"></span> <span class=\"footer-tp-name svelte-1n46o8q\"> </span></button>"), bu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"16\" max=\"160\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), xu = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!>", 1), Su = /* @__PURE__ */ U("<div class=\"nav-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></div> <!>", 1), Cu = /* @__PURE__ */ U("<div class=\"nav-row svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><span class=\"footer-soc-preview svelte-1n46o8q\" aria-hidden=\"true\"></span> <!></span> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <input class=\"nav-target svelte-1n46o8q\"/></div>"), wu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), Tu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), Eu = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"footer-tpick svelte-1n46o8q\"></div></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"svelte-1n46o8q\"> <!></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details></div>"), Du = /* @__PURE__ */ U("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), Ou = /* @__PURE__ */ U("<details class=\"group samling-entry svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <input type=\"date\" class=\"svelte-1n46o8q\"/></label> <textarea rows=\"3\" class=\"svelte-1n46o8q\"></textarea> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div></details>"), ku = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Au = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button></div>"), ju = /* @__PURE__ */ U("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), Mu = /* @__PURE__ */ U("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), Nu = /* @__PURE__ */ U("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <!></div>"), Pu = /* @__PURE__ */ U("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span></div>"), Fu = /* @__PURE__ */ U("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), Iu = /* @__PURE__ */ U("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <!>", 1), Lu = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <!> <!></div>"), Ru = /* @__PURE__ */ U("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), zu = /* @__PURE__ */ U("<button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), Bu = /* @__PURE__ */ U("<!> <!>", 1), Vu = /* @__PURE__ */ U("<p class=\"panel-hint svelte-1n46o8q\"> </p> <button class=\"ghost svelte-1n46o8q\"> </button>", 1), Hu = /* @__PURE__ */ U("<span class=\"update-arrow svelte-1n46o8q\"></span> <span class=\"badge svelte-1n46o8q\"> </span>", 1), Uu = /* @__PURE__ */ U("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><p class=\"update-notes svelte-1n46o8q\"> </p></div></details>"), Wu = /* @__PURE__ */ U("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"><span class=\"update-warn svelte-1n46o8q\"></span> </summary> <div class=\"group-items svelte-1n46o8q\"><pre class=\"update-headers svelte-1n46o8q\"> </pre></div></details>"), Gu = /* @__PURE__ */ U("<span class=\"chip svelte-1n46o8q\"> </span>"), Ku = /* @__PURE__ */ U("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <span class=\"update-warn svelte-1n46o8q\"></span></span></div>"), qu = /* @__PURE__ */ U("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <!></div>"), Ju = /* @__PURE__ */ U("<span class=\"update-warn svelte-1n46o8q\"></span>"), Yu = /* @__PURE__ */ U("<div class=\"update-row svelte-1n46o8q\"><span> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <!> <input type=\"checkbox\" class=\"svelte-1n46o8q\"/></span></div>"), Xu = /* @__PURE__ */ U("<div class=\"ctl-row update-opt-head svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!>", 1), Zu = /* @__PURE__ */ U("<p class=\"update-summary svelte-1n46o8q\"> </p> <!> <!> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details> <!> <button class=\"primary update-run svelte-1n46o8q\"> </button>", 1), Qu = /* @__PURE__ */ U("<div class=\"update-versions svelte-1n46o8q\"><span class=\"update-from svelte-1n46o8q\"> </span> <!></div> <!>", 1), $u = /* @__PURE__ */ U("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), ed = /* @__PURE__ */ U("<nav class=\"rail svelte-1n46o8q\"><!> <span class=\"rail-settings svelte-1n46o8q\"><span class=\"rail-brand svelte-1n46o8q\" title=\"Urd\"><svg class=\"brand-mark svelte-1n46o8q\" viewBox=\"0 0 40 40\" aria-hidden=\"true\"><path d=\"M12 32V10l16 6.5V32\" fill=\"none\" stroke=\"var(--urd-brand)\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg> <span class=\"brand-word svelte-1n46o8q\">Urd</span></span> <button></button> <!></span></nav> <!>", 1), td = /* @__PURE__ */ U("<div class=\"workspace svelte-1n46o8q\"><!> <div><div class=\"stage svelte-1n46o8q\"><iframe class=\"svelte-1n46o8q\"></iframe></div></div></div>"), nd = /* @__PURE__ */ U("<p class=\"loading svelte-1n46o8q\"> </p>"), rd = /* @__PURE__ */ U("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), id = /* @__PURE__ */ U("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), ad = /* @__PURE__ */ U("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <p class=\"panel-hint svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <p class=\"panel-hint svelte-1n46o8q\"> </p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), od = /* @__PURE__ */ U("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\">×</button></div>"), sd = /* @__PURE__ */ U("<div class=\"block-menu svelte-1n46o8q\"><header class=\"block-menu-head svelte-1n46o8q\"><span> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></header> <div class=\"panel-body block-menu-body svelte-1n46o8q\"><!></div></div>"), cd = /* @__PURE__ */ U("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><!> <!></span> <span class=\"topbar-group topbar-draft svelte-1n46o8q\"><!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!> <!></div>   <!>", 1);
function ld(e, t) {
	We(t, !0);
	let n = (e, t = d, n = d) => {
		var r = pc(), i = R(r);
		Vr(i, 17, n, Lr, (e, r, i) => {
			var a = fc(), s = L(a), l = L(s);
			{
				let e = /* @__PURE__ */ N(() => Z("tip.bg.changeType")), n = /* @__PURE__ */ N(() => o.map(([e, t]) => [e, t.labelKey ? Z(t.labelKey) : t.label]));
				Q(l, {
					get value() {
						return V(r).type;
					},
					get title() {
						return V(e);
					},
					get options() {
						return V(n);
					},
					onchange: (e) => In(t(), i, e)
				});
			}
			var u = z(l, 2), d = L(u);
			d.disabled = i === 0, q(d, () => c.up, !0), j(d);
			var f = z(d, 2);
			q(f, () => c.down, !0), j(f);
			var p = z(f, 2);
			q(p, () => c.cross, !0), j(p), j(u), j(s);
			var m = z(s, 2), h = (e) => {
				var n = $s(), a = R(n), o = L(a), s = z(o);
				{
					let e = /* @__PURE__ */ N(Yn), n = /* @__PURE__ */ N(() => Z("tip.bg.layerColor"));
					Ui(s, {
						get value() {
							return V(r).props.value;
						},
						get tokens() {
							return V(e);
						},
						get label() {
							return V(n);
						},
						onchange: (e) => vn(t(), i, "value", e)
					});
				}
				j(a);
				var c = z(a, 2), l = L(c), u = z(l), d = L(u);
				j(u), j(c);
				var f = z(c, 2);
				J(f), B((e, t, n) => {
					G(o, `${e ?? ""} `), G(l, `${t ?? ""} `), G(d, `${n ?? ""}%`), Y(f, V(r).props.opacity ?? 1);
				}, [
					() => Z("lbl.color"),
					() => Z("lbl.strength"),
					() => Math.round((V(r).props.opacity ?? 1) * 100)
				]), H("input", f, (e) => vn(t(), i, "opacity", Number(e.target.value))), W(e, n);
			}, g = (e) => {
				let n = /* @__PURE__ */ N(() => Tn(V(r))), a = /* @__PURE__ */ N(() => V(n).stops.reduce((e, t) => e + Math.max(0, Number(t.share) || 0), 0));
				var o = ic(), s = R(o), l = L(s), u = z(l);
				{
					let e = /* @__PURE__ */ N(() => V(n).kind ?? "linear"), r = /* @__PURE__ */ N(() => [["linear", Z("opt.grad.linear")], ["radial", Z("opt.grad.radial")]]);
					Q(u, {
						get value() {
							return V(e);
						},
						get options() {
							return V(r);
						},
						onchange: (e) => kn(t(), i, e)
					});
				}
				j(s);
				var d = z(s, 2);
				Vr(d, 17, () => V(n).stops, Lr, (e, r, o) => {
					var s = tc();
					let l;
					var u = L(s), d = z(u, 2);
					{
						let e = /* @__PURE__ */ N(Yn), n = /* @__PURE__ */ N(() => Z("tip.bg.stopColor"));
						Ui(d, {
							get value() {
								return V(r).color;
							},
							get tokens() {
								return V(e);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => An(t(), i, o, { color: e })
						});
					}
					var f = z(d, 2);
					J(f);
					var p = z(f, 2), m = L(p);
					j(p);
					var h = z(p, 2), g = (e) => {
						var n = ec();
						q(n, () => c.cross, !0), j(n), B((e) => X(n, "title", e), [() => Z("tip.bg.removeStop")]), H("click", n, () => Mn(t(), i, o)), W(e, n);
					};
					K(h, (e) => {
						V(n).stops.length > 2 && e(g);
					}), j(s), B((e, t, a) => {
						l = Qr(s, 1, "nav-line grad-stop svelte-1n46o8q", null, l, {
							dragging: V(Pn)?.layer === i && V(Pn).from === o,
							"drop-above": V(Pn)?.layer === i && V(Pn).insert === o,
							"drop-below": V(Pn)?.layer === i && V(Pn).insert === V(n).stops.length && o === V(n).stops.length - 1
						}), X(u, "title", e), Y(f, V(r).share ?? 50), X(f, "title", t), G(m, `${a ?? ""}%`);
					}, [
						() => Z("tip.bg.dragStop"),
						() => Z("tip.bg.stopShare"),
						() => V(a) > 0 ? Math.round(Math.max(0, Number(V(r).share) || 0) / V(a) * 100) : Math.round(100 / V(n).stops.length)
					]), H("pointerdown", u, (e) => Fn(t(), e, i, o)), H("input", f, (e) => An(t(), i, o, { share: Number(e.target.value) })), W(e, s);
				});
				var f = z(d, 2), p = L(f, !0);
				j(f);
				var m = z(f, 2), h = (e) => {
					var r = nc(), a = R(r), o = L(a), s = z(o), c = L(s);
					j(s), j(a);
					var l = z(a, 2);
					J(l);
					var u = z(l, 2), d = L(u), f = z(d), p = L(f);
					j(f), j(u);
					var m = z(u, 2);
					J(m), B((e, t, r, i) => {
						G(o, `${e ?? ""} `), G(c, `${t ?? ""}%`), Y(l, V(n).x ?? .5), G(d, `${r ?? ""} `), G(p, `${i ?? ""}%`), Y(m, V(n).y ?? .5);
					}, [
						() => Z("lbl.centerX"),
						() => Math.round((V(n).x ?? .5) * 100),
						() => Z("lbl.centerY"),
						() => Math.round((V(n).y ?? .5) * 100)
					]), H("input", l, (e) => Dn(t(), i, "x", Number(e.target.value))), H("input", m, (e) => Dn(t(), i, "y", Number(e.target.value))), W(e, r);
				}, g = (e) => {
					var r = rc(), a = R(r), o = L(a), s = z(o), c = L(s);
					j(s), j(a);
					var l = z(a, 2);
					J(l), B((e) => {
						G(o, `${e ?? ""} `), G(c, `${V(n).angle ?? ""}°`), Y(l, V(n).angle);
					}, [() => Z("lbl.angle")]), H("input", l, (e) => Dn(t(), i, "angle", Number(e.target.value))), W(e, r);
				};
				K(m, (e) => {
					(V(n).kind ?? "linear") === "radial" ? e(h) : e(g, -1);
				});
				var _ = z(m, 2), v = L(_), y = z(v), b = L(y);
				j(y), j(_);
				var x = z(_, 2);
				J(x);
				var S = z(x, 2), C = L(S), w = z(C);
				{
					let e = /* @__PURE__ */ N(() => V(n).animation ?? "none");
					Q(w, {
						get value() {
							return V(e);
						},
						get options() {
							return On[(V(n).kind ?? "linear") === "radial" ? "radial" : "linear"];
						},
						onchange: (e) => Dn(t(), i, "animation", e)
					});
				}
				j(S), B((e, t, r, i, a, o, s) => {
					G(l, `${e ?? ""} `), X(f, "title", t), G(p, r), G(v, `${i ?? ""} `), G(b, `${a ?? ""}%`), Y(x, V(n).opacity ?? 1), X(S, "title", o), G(C, `${s ?? ""} `);
				}, [
					() => Z("blocks.shape"),
					() => Z("tip.bg.addStop"),
					() => Z("ui.addStop"),
					() => Z("lbl.strength"),
					() => Math.round((V(n).opacity ?? 1) * 100),
					() => Z("tip.bg.motion"),
					() => Z("lbl.motion")
				]), H("click", f, () => jn(t(), i)), H("input", x, (e) => Dn(t(), i, "opacity", Number(e.target.value))), W(e, o);
			}, _ = (e) => {
				var n = ac(), a = R(n), o = L(a), s = z(o);
				{
					let e = /* @__PURE__ */ N(Yn), n = /* @__PURE__ */ N(() => Z("tip.bg.glowColor"));
					Ui(s, {
						get value() {
							return V(r).props.color;
						},
						get tokens() {
							return V(e);
						},
						get label() {
							return V(n);
						},
						onchange: (e) => vn(t(), i, "color", e)
					});
				}
				j(a);
				var c = z(a, 2), l = L(c), u = z(l), d = L(u);
				j(u), j(c);
				var f = z(c, 2);
				J(f);
				var p = z(f, 2), m = L(p), h = z(m), g = L(h);
				j(h), j(p);
				var _ = z(p, 2);
				J(_);
				var v = z(_, 2), y = L(v), b = z(y), x = L(b);
				j(b), j(v);
				var S = z(v, 2);
				J(S);
				var C = z(S, 2), w = L(C), T = z(w), ee = L(T);
				j(T), j(C);
				var te = z(C, 2);
				J(te), B((e, t, n, i, a, s, c, u, p) => {
					G(o, `${e ?? ""} `), G(l, `${t ?? ""} `), G(d, `${n ?? ""}%`), Y(f, V(r).props.x), G(m, `${i ?? ""} `), G(g, `${a ?? ""}%`), Y(_, V(r).props.y), G(y, `${s ?? ""} `), G(x, `${c ?? ""}%`), Y(S, V(r).props.radius), G(w, `${u ?? ""} `), G(ee, `${p ?? ""}%`), Y(te, V(r).props.opacity);
				}, [
					() => Z("lbl.color"),
					() => Z("lbl.posX"),
					() => Math.round(V(r).props.x * 100),
					() => Z("lbl.posY"),
					() => Math.round(V(r).props.y * 100),
					() => Z("lbl.size"),
					() => Math.round(V(r).props.radius * 100),
					() => Z("lbl.strength"),
					() => Math.round(V(r).props.opacity * 100)
				]), H("input", f, (e) => vn(t(), i, "x", Number(e.target.value))), H("input", _, (e) => vn(t(), i, "y", Number(e.target.value))), H("input", S, (e) => vn(t(), i, "radius", Number(e.target.value))), H("input", te, (e) => vn(t(), i, "opacity", Number(e.target.value))), W(e, n);
			}, v = (e) => {
				var n = oc(), a = R(n), o = L(a), s = z(o), c = L(s);
				j(s), j(a);
				var l = z(a, 2);
				J(l), B((e, t) => {
					G(o, `${e ?? ""} `), G(c, `${t ?? ""}%`), Y(l, V(r).props.opacity);
				}, [() => Z("lbl.strength"), () => Math.round(V(r).props.opacity * 100)]), H("input", l, (e) => vn(t(), i, "opacity", Number(e.target.value))), W(e, n);
			}, y = (e) => {
				let n = /* @__PURE__ */ N(() => V(r).props.fit === "flislegg" || V(r).props.fit === "repeat");
				var a = lc(), o = R(a), s = L(o), c = z(s);
				j(o);
				var l = z(o, 2), u = L(l), d = z(u);
				{
					let e = /* @__PURE__ */ N(() => V(n) ? "flislegg" : "vanlig"), r = /* @__PURE__ */ N(() => [["vanlig", Z("opt.img.plain")], ["flislegg", Z("opt.img.tile")]]);
					Q(d, {
						get value() {
							return V(e);
						},
						get options() {
							return V(r);
						},
						onchange: (e) => vn(t(), i, "fit", e)
					});
				}
				j(l);
				var f = z(l, 2), p = L(f, !0);
				j(f);
				var m = z(f, 2), h = L(m), g = z(h, 2);
				J(g);
				var _ = z(g, 4);
				j(m);
				var v = z(m, 2), y = (e) => {
					var n = sc(), a = R(n), o = L(a), s = L(o, !0);
					j(o);
					var c = z(o, 2), l = L(c, !0);
					j(c), j(a);
					var u = z(a, 2), d = L(u, !0);
					j(u);
					var f = z(u, 2), p = z(f, 2), m = L(p), h = z(m), g = L(h);
					j(h), j(p);
					var _ = z(p, 2);
					J(_);
					var v = z(_, 2), y = L(v), b = z(y), x = L(b);
					j(b), j(v);
					var S = z(v, 2);
					J(S), B((e, t, n, i, a, p, h, v, b, C, w, T) => {
						X(o, "title", e), G(s, t), X(c, "title", n), G(l, i), X(u, "title", a), G(d, p), ei(f, `--fx:${h ?? ""}%; --fy:${v ?? ""}%`), G(m, `${b ?? ""} `), G(g, `${C ?? ""}%`), Y(_, V(r).props.x ?? .5), G(y, `${w ?? ""} `), G(x, `${T ?? ""}%`), Y(S, V(r).props.y ?? .5);
					}, [
						() => Z("tip.bg.cover"),
						() => Z("ui.cover"),
						() => Z("opt.fitFrame.contain"),
						() => Z("opt.fit.contain"),
						() => Z("tip.bg.position"),
						() => Z("lbl.position"),
						() => Math.max(0, Math.min(1, V(r).props.x ?? .5)) * 100,
						() => Math.max(0, Math.min(1, V(r).props.y ?? .5)) * 100,
						() => Z("lbl.horizontal"),
						() => Math.round((V(r).props.x ?? .5) * 100),
						() => Z("lbl.vertical"),
						() => Math.round((V(r).props.y ?? .5) * 100)
					]), H("click", o, () => wn(t(), i, V(r), "cover")), H("click", c, () => wn(t(), i, V(r), "contain")), H("pointerdown", f, (e) => yn(e, t(), i, "xy")), H("input", _, (e) => vn(t(), i, "x", Number(e.target.value))), H("input", S, (e) => vn(t(), i, "y", Number(e.target.value))), W(e, n);
				};
				K(v, (e) => {
					V(n) || e(y);
				});
				var b = z(v, 2), x = L(b), S = z(x), C = L(S);
				j(S), j(b);
				var w = z(b, 2);
				J(w);
				var T = z(w, 2), ee = L(T), te = z(ee), ne = L(te);
				j(te), j(T);
				var re = z(T, 2);
				J(re);
				var ie = z(re, 2), ae = L(ie);
				J(ae);
				var oe = z(ae);
				j(ie);
				var se = z(ie, 2), ce = (e) => {
					var n = cc(), a = R(n), o = L(a), s = z(o), c = L(s);
					j(s), j(a);
					var l = z(a, 2);
					J(l);
					var u = z(l, 2), d = L(u), f = z(d);
					{
						let e = /* @__PURE__ */ N(() => V(r).props.bleed ?? "none"), n = /* @__PURE__ */ N(() => [
							["none", Z("common.none")],
							["up", Z("opt.bleed.up")],
							["down", Z("opt.bleed.down")],
							["both", Z("opt.brand.both")]
						]);
						Q(f, {
							get value() {
								return V(e);
							},
							get options() {
								return V(n);
							},
							onchange: (e) => vn(t(), i, "bleed", e)
						});
					}
					j(u), B((e, t, n, i) => {
						G(o, `${e ?? ""} `), G(c, `${t ?? ""}%`), Y(l, V(r).props.parallax ?? .3), X(u, "title", n), G(d, `${i ?? ""} `);
					}, [
						() => Z("lbl.parallaxStrength"),
						() => Math.round((V(r).props.parallax ?? 0) * 100),
						() => Z("tip.bg.bleed"),
						() => Z("lbl.bleed")
					]), H("input", l, (e) => vn(t(), i, "parallax", Number(e.target.value))), W(e, n);
				};
				K(se, (e) => {
					(V(r).props.parallax ?? 0) > 0 && e(ce);
				}), B((e, t, n, i, a, c, d, m, v, y, b, S, T, te) => {
					X(o, "title", e), G(s, `${t ?? ""} `), X(l, "title", n), G(u, `${i ?? ""} `), X(f, "title", a), G(p, c), X(h, "title", d), Y(g, m), X(_, "title", v), G(x, `${y ?? ""} `), G(C, `${V(r).props.blur ?? 0 ?? ""} px`), Y(w, V(r).props.blur ?? 0), G(ee, `${b ?? ""} `), G(ne, `${S ?? ""}%`), Y(re, V(r).props.opacity ?? 1), X(ie, "title", T), ai(ae, (V(r).props.parallax ?? 0) > 0), G(oe, ` ${te ?? ""}`);
				}, [
					() => Z("tip.webpAuto"),
					() => V(r).props.src ? Z("ui.changeImage") : Z("ui.chooseImage"),
					() => Z("tip.bg.fit"),
					() => Z("lbl.fit"),
					() => Z("tip.bg.size"),
					() => Z("lbl.size"),
					() => Z("tip.smaller"),
					() => Math.round((V(r).props.size ?? 1) * 100),
					() => Z("tip.larger"),
					() => Z("lbl.blur"),
					() => Z("lbl.strength"),
					() => Math.round((V(r).props.opacity ?? 1) * 100),
					() => Z("tip.bg.parallax"),
					() => Z("lbl.parallax")
				]), H("change", c, (e) => Bn(t(), i, e)), H("click", h, () => Sn(t(), i, V(r).props.size ?? 1, -.05)), H("change", g, (e) => Cn(t(), i, e.target.value)), H("click", _, () => Sn(t(), i, V(r).props.size ?? 1, .05)), H("input", w, (e) => vn(t(), i, "blur", Number(e.target.value))), H("input", re, (e) => vn(t(), i, "opacity", Number(e.target.value))), H("change", ae, (e) => vn(t(), i, "parallax", e.target.checked ? .3 : 0)), W(e, a);
			}, b = (e) => {
				var n = dc(), a = R(n), o = L(a), s = z(o);
				j(a);
				var l = z(a, 2);
				Vr(l, 17, () => V(r).props.images ?? [], Lr, (e, n, a) => {
					var o = uc(), s = R(o), l = L(s), u = z(l, 2), d = L(u);
					d.disabled = a === 0, q(d, () => c.up, !0), j(d);
					var f = z(d, 2);
					q(f, () => c.down, !0), j(f);
					var p = z(f, 2);
					q(p, () => c.cross, !0), j(p), j(u), j(s);
					var m = z(s, 2), h = L(m), g = z(h), _ = L(g);
					j(g), j(m);
					var v = z(m, 2);
					J(v);
					var y = z(v, 2), b = L(y), x = z(b), S = L(x);
					j(x), j(y);
					var C = z(y, 2);
					J(C), B((e, t, i, o, s) => {
						X(l, "src", V(n).src), f.disabled = a === V(r).props.images.length - 1, X(p, "title", e), G(h, `${t ?? ""} `), G(_, `${i ?? ""}%`), Y(v, V(n).x ?? .5), G(b, `${o ?? ""} `), G(S, `${s ?? ""}%`), Y(C, V(n).y ?? .5);
					}, [
						() => Z("tip.removeImage"),
						() => Z("lbl.focusX"),
						() => Math.round((V(n).x ?? .5) * 100),
						() => Z("lbl.focusY"),
						() => Math.round((V(n).y ?? .5) * 100)
					]), H("click", d, () => Hn(t(), i, a, -1)), H("click", f, () => Hn(t(), i, a, 1)), H("click", p, () => Un(t(), i, a)), H("input", v, (e) => Wn(t(), i, a, "x", Number(e.target.value))), H("input", C, (e) => Wn(t(), i, a, "y", Number(e.target.value))), W(e, o);
				});
				var u = z(l, 2), d = L(u), f = z(d);
				{
					let e = /* @__PURE__ */ N(() => V(r).props.fit ?? "cover"), n = /* @__PURE__ */ N(() => [["cover", Z("opt.fit.cover")], ["contain", Z("opt.fit.contain")]]);
					Q(f, {
						get value() {
							return V(e);
						},
						get options() {
							return V(n);
						},
						onchange: (e) => vn(t(), i, "fit", e)
					});
				}
				j(u);
				var p = z(u, 2), m = L(p), h = z(m);
				J(h), j(p);
				var g = z(p, 2), _ = L(g), v = z(_), y = L(v);
				j(v), j(g);
				var b = z(g, 2);
				J(b);
				var x = z(b, 2), S = L(x), C = z(S), w = L(C);
				j(C), j(x);
				var T = z(x, 2);
				J(T);
				var ee = z(T, 2), te = L(ee), ne = z(te), re = L(ne);
				j(ne), j(ee);
				var ie = z(ee, 2);
				J(ie);
				var ae = z(ie, 2), oe = L(ae, !0);
				j(ae), B((e, t, n, i, s, c, l, u, f, g, v) => {
					X(a, "title", e), G(o, `${t ?? ""} `), G(d, `${n ?? ""} `), X(p, "title", i), G(m, `${s ?? ""} `), Y(h, V(r).props.interval ?? 6), G(_, `${c ?? ""} `), G(y, `${l ?? ""} s`), Y(b, V(r).props.fade ?? 1.5), G(S, `${u ?? ""} `), G(w, `${V(r).props.blur ?? 0 ?? ""} px`), Y(T, V(r).props.blur ?? 0), G(te, `${f ?? ""} `), G(re, `${g ?? ""}%`), Y(ie, V(r).props.opacity ?? 1), G(oe, v);
				}, [
					() => Z("tip.bg.addImages"),
					() => Z("ui.addImages"),
					() => Z("lbl.fit"),
					() => Z("hint.bg.gallery"),
					() => Z("lbl.secondsPerImage"),
					() => Z("lbl.transition"),
					() => (V(r).props.fade ?? 1.5).toFixed(1),
					() => Z("lbl.blur"),
					() => Z("lbl.strength"),
					() => Math.round((V(r).props.opacity ?? 1) * 100),
					() => Z("hint.bg.gallery")
				]), H("change", s, (e) => Vn(t(), i, e)), H("change", h, (e) => vn(t(), i, "interval", Number(e.target.value))), H("input", b, (e) => vn(t(), i, "fade", Number(e.target.value))), H("input", T, (e) => vn(t(), i, "blur", Number(e.target.value))), H("input", ie, (e) => vn(t(), i, "opacity", Number(e.target.value))), W(e, n);
			};
			K(m, (e) => {
				V(r).type === "color" ? e(h) : V(r).type === "gradient" ? e(g, 1) : V(r).type === "glow" ? e(_, 2) : V(r).type === "grain" ? e(v, 3) : V(r).type === "image" ? e(y, 4) : V(r).type === "bildegalleri" && e(b, 5);
			}), j(a), B((e, t, r) => {
				X(d, "title", e), X(f, "title", t), f.disabled = i === n().length - 1, X(p, "title", r);
			}, [
				() => Z("hint.bg.order"),
				() => Z("hint.bg.order"),
				() => Z("tip.bg.removeLayer")
			]), H("click", d, () => _n(t(), i, -1)), H("click", f, () => _n(t(), i, 1)), H("click", p, () => gn(t(), i)), W(e, a);
		});
		var a = z(i, 2), s = L(a), l = z(s);
		{
			let e = /* @__PURE__ */ N(() => o.map(([e, t]) => [e, t.labelKey ? Z(t.labelKey) : t.label]));
			Q(l, {
				get value() {
					return V(mn);
				},
				get options() {
					return V(e);
				},
				onchange: (e) => I(mn, e, !0)
			});
		}
		j(a);
		var u = z(a, 2), f = L(u, !0);
		j(u), B((e, t) => {
			G(s, `${e ?? ""} `), G(f, t);
		}, [() => Z("lbl.newLayer"), () => Z("ui.addLayer")]), H("click", u, () => hn(t(), V(mn))), W(e, r);
	}, r = (e, t = d, n = d) => {
		var r = jr();
		Vr(R(r), 17, n, Lr, (e, r, i) => {
			var a = hc(), o = L(a);
			J(o);
			var s = z(o, 2), l = L(s);
			l.disabled = i === 0, q(l, () => c.up, !0), j(l);
			var u = z(l, 2);
			q(u, () => c.down, !0), j(u);
			var d = z(u, 2);
			q(d, () => c.cross, !0), j(d), j(s);
			var f = z(s, 2), p = L(f);
			{
				let e = /* @__PURE__ */ N(() => V(r).page ?? "__href"), n = /* @__PURE__ */ N(() => Z("tip.linkTarget")), a = /* @__PURE__ */ N(() => [...V(k).pages.map((e) => [e.id, e.title]), ["__href", Z("opt.linkHref")]]);
				Q(p, {
					get value() {
						return V(e);
					},
					get title() {
						return V(n);
					},
					get options() {
						return V(a);
					},
					onchange: (e) => _s(t(), i, e)
				});
			}
			j(f);
			var m = z(f, 2), h = (e) => {
				var n = mc();
				J(n), B((e, t) => {
					Y(n, V(r).href ?? ""), X(n, "placeholder", e), X(n, "title", t);
				}, [() => Z("ph.hrefAnchor"), () => Z("tip.hrefAnchor")]), H("change", n, (e) => ys(t(), i, e.target.value)), W(e, n);
			};
			K(m, (e) => {
				V(r).page || e(h);
			}), j(a), B((e, t) => {
				Y(o, V(r).label), X(o, "title", e), u.disabled = i === n().length - 1, X(d, "title", t);
			}, [() => Z("tip.linkLabel"), () => Z("tip.removeLink")]), H("input", o, (e) => ms(t(), i, e.target.value)), H("click", l, () => ps(t(), i, -1)), H("click", u, () => ps(t(), i, 1)), H("click", d, () => fs(t(), i)), W(e, a);
		}), W(e, r);
	}, i = (e) => {
		let t = /* @__PURE__ */ N(() => V(M).props.boxStyle ?? {});
		var n = vc(), r = R(n), i = L(r), a = z(i);
		{
			let e = /* @__PURE__ */ N(() => V(t).bg ?? ""), n = /* @__PURE__ */ N(Yn), r = /* @__PURE__ */ N(() => Z("tip.box.bg"));
			Ui(a, {
				get value() {
					return V(e);
				},
				get tokens() {
					return V(n);
				},
				allowClear: !0,
				get label() {
					return V(r);
				},
				onchange: (e) => Ft({ bg: e || null })
			});
		}
		j(r);
		var o = z(r, 2), s = L(o), c = z(s);
		{
			let e = /* @__PURE__ */ N(() => V(t).shadow ?? ""), n = /* @__PURE__ */ N(() => [
				["", Z("common.none")],
				["soft", Z("opt.shadow.soft")],
				["strong", Z("opt.shadow.strong")]
			]);
			Q(c, {
				get value() {
					return V(e);
				},
				get options() {
					return V(n);
				},
				onchange: (e) => Ft({ shadow: e || null })
			});
		}
		j(o);
		var l = z(o, 2), u = (e) => {
			var n = gc(), r = L(n), i = z(r);
			{
				let e = /* @__PURE__ */ N(() => V(t).shadowColor ?? ""), n = /* @__PURE__ */ N(Yn), r = /* @__PURE__ */ N(() => Z("tip.box.shadowColor"));
				Ui(i, {
					get value() {
						return V(e);
					},
					get tokens() {
						return V(n);
					},
					allowClear: !0,
					get label() {
						return V(r);
					},
					onchange: (e) => Ft({ shadowColor: e || null })
				});
			}
			j(n), B((e) => G(r, `${e ?? ""} `), [() => Z("lbl.shadowColor")]), W(e, n);
		};
		K(l, (e) => {
			V(t).shadow && e(u);
		});
		var d = z(l, 2), f = L(d), p = z(f);
		{
			let e = /* @__PURE__ */ N(() => V(t).border === "none" ? "none" : V(t).border ? "custom" : ""), n = /* @__PURE__ */ N(() => [
				["", Z("opt.border.theme")],
				["none", Z("common.none")],
				["custom", Z("opt.border.custom")]
			]);
			Q(p, {
				get value() {
					return V(e);
				},
				get options() {
					return V(n);
				},
				onchange: (e) => Ft({ border: e === "custom" ? {
					color: "accent",
					width: 1
				} : e || null })
			});
		}
		j(d);
		var m = z(d, 2), h = (e) => {
			let n = /* @__PURE__ */ N(() => typeof V(t).border == "object" ? V(t).border : {
				color: "text",
				width: 1
			});
			var r = _c(), i = R(r), a = L(i), o = z(a);
			{
				let e = /* @__PURE__ */ N(Yn), t = /* @__PURE__ */ N(() => Z("tip.box.borderColor"));
				Ui(o, {
					get value() {
						return V(n).color;
					},
					get tokens() {
						return V(e);
					},
					get label() {
						return V(t);
					},
					onchange: (e) => Ft({ border: {
						...V(n),
						color: e
					} })
				});
			}
			j(i);
			var s = z(i, 2), c = L(s), l = z(c), u = L(l), d = z(u, 2);
			J(d);
			var f = z(d, 2);
			j(l), j(s), B((e, t, r, i, o, s) => {
				G(a, `${e ?? ""} `), G(c, `${t ?? ""} `), X(u, "title", r), X(u, "aria-label", i), Y(d, V(n).width), X(f, "title", o), X(f, "aria-label", s);
			}, [
				() => Z("lbl.borderColor"),
				() => Z("lbl.thicknessPx"),
				() => Z("tip.thinner"),
				() => Z("tip.thinner"),
				() => Z("tip.thicker"),
				() => Z("tip.thicker")
			]), H("click", u, () => Ft({ border: {
				...V(n),
				width: Math.max(1, V(n).width - 1)
			} })), H("change", d, (e) => Ft({ border: {
				...V(n),
				width: Math.min(12, Math.max(1, Number(e.target.value) || 1))
			} })), H("click", f, () => Ft({ border: {
				...V(n),
				width: Math.min(12, V(n).width + 1)
			} })), W(e, r);
		};
		K(m, (e) => {
			V(t).border !== "none" && e(h);
		});
		var g = z(m, 2), _ = L(g);
		J(_);
		var v = z(_);
		j(g), B((e, t, n, r, a, o) => {
			G(i, `${e ?? ""} `), G(s, `${t ?? ""} `), G(f, `${n ?? ""} `), X(g, "title", r), ai(_, a), G(v, ` ${o ?? ""}`);
		}, [
			() => Z("lbl.blockColor"),
			() => Z("lbl.shadow"),
			() => Z("lbl.border"),
			() => Z("tip.box.glass"),
			() => !!V(t).glass,
			() => Z("lbl.glass")
		]), H("change", _, (e) => Ft({ glass: e.target.checked || null })), W(e, n);
	}, a = (e) => {
		var t = sl(), n = R(t), r = L(n), a = L(r);
		let o;
		var s = L(a, !0);
		j(a);
		var l = z(a, 2);
		let u;
		var d = L(l, !0);
		j(l), j(r), j(n);
		var f = z(n, 2), p = (e) => {
			var t = jr(), n = R(t), r = (e) => {
				var t = yc(), n = L(t, !0);
				j(t), B((e) => G(n, e), [() => Z("hint.textInline")]), W(e, t);
			}, i = (e) => {
				var t = xc(), n = R(t), r = L(n);
				J(r);
				var i = z(r);
				j(n);
				var a = z(n, 2), o = L(a, !0);
				j(a);
				var s = z(a, 2);
				Vr(s, 17, () => V(M).props.items ?? [], Lr, (e, t, n) => {
					var r = bc(), i = L(r);
					J(i);
					var a = z(i, 2), o = L(a);
					o.disabled = n === 0, q(o, () => c.up, !0), j(o);
					var s = z(o, 2);
					q(s, () => c.down, !0), j(s);
					var l = z(s, 2);
					q(l, () => c.cross, !0), j(l), j(a), j(r), B((e, r) => {
						Y(i, V(t).q), X(i, "title", e), s.disabled = n === (V(M).props.items?.length ?? 0) - 1, X(l, "title", r);
					}, [() => Z("tip.faq.question"), () => Z("tip.faq.remove")]), H("change", i, (e) => It(n, { q: e.target.value })), H("click", o, () => zt(n, -1)), H("click", s, () => zt(n, 1)), H("click", l, () => Rt(n)), W(e, r);
				});
				var l = z(s, 2), u = L(l, !0);
				j(l), B((e, t, a, s, c) => {
					X(n, "title", e), ai(r, t), G(i, ` ${a ?? ""}`), G(o, s), G(u, c);
				}, [
					() => Z("tip.faq.multi"),
					() => !!V(M).props.multi,
					() => Z("lbl.faqMulti"),
					() => Z("lbl.questions"),
					() => Z("ui.addQuestion")
				]), H("change", r, (e) => P("multi", e.target.checked)), H("click", l, Lt), W(e, t);
			}, a = (e) => {
				var t = Cc(), n = R(t), r = L(n, !0);
				j(n);
				var i = z(n, 2);
				Vr(i, 17, () => V(M).props.items ?? [], Lr, (e, t, n) => {
					var r = Sc(), i = R(r), a = L(i);
					J(a);
					var o = z(a, 2);
					J(o);
					var s = z(o, 2), l = L(s);
					l.disabled = n === 0, q(l, () => c.up, !0), j(l);
					var u = z(l, 2);
					q(u, () => c.down, !0), j(u);
					var d = z(u, 2);
					q(d, () => c.cross, !0), j(d), j(s), j(i);
					var f = z(i, 2);
					J(f), B((e, r, i, s, c, l) => {
						Y(a, V(t).year), X(a, "placeholder", e), X(a, "title", r), Y(o, V(t).title), X(o, "title", i), u.disabled = n === (V(M).props.items?.length ?? 0) - 1, X(d, "title", s), Y(f, V(t).text), X(f, "placeholder", c), X(f, "title", l);
					}, [
						() => Z("ph.tlYear"),
						() => Z("tip.tl.year"),
						() => Z("tip.tl.title"),
						() => Z("tip.tl.remove"),
						() => Z("ph.tlText"),
						() => Z("tip.tl.text")
					]), H("change", a, (e) => Bt(n, { year: e.target.value })), H("change", o, (e) => Bt(n, { title: e.target.value })), H("click", l, () => Ut(n, -1)), H("click", u, () => Ut(n, 1)), H("click", d, () => Ht(n)), H("change", f, (e) => Bt(n, { text: e.target.value })), W(e, r);
				});
				var a = z(i, 2), o = L(a, !0);
				j(a), B((e, t) => {
					G(r, e), G(o, t);
				}, [() => Z("lbl.tlItems"), () => Z("ui.addTlItem")]), H("click", a, Vt), W(e, t);
			}, o = (e) => {
				var t = wc(), n = R(t), r = L(n), i = z(r);
				J(i), j(n);
				var a = z(n, 2), o = L(a), s = z(o);
				J(s), j(a);
				var c = z(a, 2), l = L(c), u = z(l);
				J(u), j(c), B((e, t, n) => {
					G(r, `${e ?? ""} `), Y(i, V(M).props.text ?? ""), G(o, `${t ?? ""} `), Y(s, V(M).props.attribution ?? ""), G(l, `${n ?? ""} `), Y(u, V(M).props.role ?? "");
				}, [
					() => Z("lbl.sitatText"),
					() => Z("lbl.sitatName"),
					() => Z("lbl.sitatRole")
				]), H("change", i, (e) => P("text", e.target.value)), H("change", s, (e) => P("attribution", e.target.value)), H("change", u, (e) => P("role", e.target.value)), W(e, t);
			}, s = (e) => {
				var t = Tc(), n = R(t), r = L(n), i = z(r);
				J(i), j(n);
				var a = z(n, 2), o = L(a), s = z(o);
				J(s), j(a);
				var c = z(a, 2), l = L(c), u = z(l);
				J(u), j(c);
				var d = z(c, 2), f = L(d), p = z(f);
				J(p), j(d), B((e, t, n, a, c) => {
					G(r, `${e ?? ""} `), Y(i, V(M).props.value ?? ""), X(i, "title", t), G(o, `${n ?? ""} `), Y(s, V(M).props.prefix ?? ""), G(l, `${a ?? ""} `), Y(u, V(M).props.suffix ?? ""), G(f, `${c ?? ""} `), Y(p, V(M).props.label ?? "");
				}, [
					() => Z("lbl.statValue"),
					() => Z("tip.stat.value"),
					() => Z("lbl.statPrefix"),
					() => Z("lbl.statSuffix"),
					() => Z("lbl.statLabel")
				]), H("change", i, (e) => P("value", e.target.value)), H("change", s, (e) => P("prefix", e.target.value)), H("change", u, (e) => P("suffix", e.target.value)), H("change", p, (e) => P("label", e.target.value)), W(e, t);
			}, l = (e) => {
				var t = Dc(), n = R(t), r = L(n), i = z(r);
				J(i), j(n);
				var a = z(n, 2), o = L(a), s = z(o);
				{
					let e = /* @__PURE__ */ N(() => V(M).props.page ?? "__href"), t = /* @__PURE__ */ N(() => [...V(k).pages.map((e) => [e.id, e.title]), ["__href", Z("opt.externalLink")]]);
					Q(s, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => {
							let t = e === "__href" ? null : e;
							Et(`edit:${V(M).blockId}`, (e) => {
								e.props.page = t, t && (e.props.href = null);
							});
						}
					});
				}
				j(a);
				var c = z(a, 2), l = (e) => {
					var t = Ec();
					J(t), B((e) => {
						X(t, "placeholder", e), Y(t, V(M).props.href === "#" ? "" : V(M).props.href ?? "");
					}, [() => Z("ph.url")]), H("change", t, (e) => P("href", e.target.value || null)), W(e, t);
				};
				K(c, (e) => {
					V(M).props.page || e(l);
				}), B((e, t) => {
					G(r, `${e ?? ""} `), Y(i, V(M).props.label), G(o, `${t ?? ""} `);
				}, [() => Z("blocks.text"), () => Z("lbl.goesTo")]), H("change", i, (e) => P("label", e.target.value)), W(e, t);
			}, u = (e) => {
				var t = kc(), n = R(t), r = L(n), i = z(r);
				j(n);
				var a = z(n, 2), o = L(a), s = z(o);
				J(s), j(a);
				var c = z(a, 2), l = L(c), u = z(l);
				J(u), j(c);
				var d = z(c, 2), f = (e) => {
					var t = Oc(), n = L(t);
					J(n);
					var r = z(n);
					j(t), B((e, i, a) => {
						X(t, "title", e), ai(n, i), G(r, ` ${a ?? ""}`);
					}, [
						() => Z("tip.lightbox"),
						() => !!V(M).props.lightbox,
						() => Z("lbl.lightbox")
					]), H("change", n, (e) => P("lightbox", e.target.checked)), W(e, t);
				};
				K(d, (e) => {
					V(M).props.href || e(f);
				}), B((e, t, n, i, a) => {
					G(r, `${e ?? ""} `), G(o, `${t ?? ""} `), Y(s, V(M).props.alt ?? ""), X(s, "placeholder", n), G(l, `${i ?? ""} `), Y(u, V(M).props.href ?? ""), X(u, "placeholder", a);
				}, [
					() => Z("ui.changeImage"),
					() => Z("lbl.description"),
					() => Z("ph.altText"),
					() => Z("lbl.link"),
					() => Z("ph.optionalImageLink")
				]), H("change", i, Gt), H("change", s, (e) => P("alt", e.target.value)), H("change", u, (e) => P("href", e.target.value || null)), W(e, t);
			}, d = (e) => {
				var t = Ac(), n = R(t), r = L(n, !0);
				j(n);
				var i = z(n, 2);
				J(i);
				var a = z(i, 2), o = L(a), s = z(o);
				J(s), j(a), B((e, t, a, c) => {
					X(n, "title", e), G(r, t), Y(i, V(M).props.url ?? ""), X(i, "placeholder", a), G(o, `${c ?? ""} `), Y(s, V(M).props.title ?? "");
				}, [
					() => Z("hint.video"),
					() => Z("lbl.videoUrl"),
					() => Z("ph.videoUrl"),
					() => Z("lbl.videoTitle")
				]), H("change", i, (e) => P("url", e.target.value)), H("change", s, (e) => P("title", e.target.value)), W(e, t);
			}, f = (e) => {
				var t = Pc(), n = R(t), r = L(n), i = z(r), a = L(i);
				{
					let e = /* @__PURE__ */ N(() => V(M).props.glyph ?? "★"), t = /* @__PURE__ */ N(() => V(M).props.icon ?? null), n = /* @__PURE__ */ N(() => V(M).props.image ?? null);
					xa(a, {
						get value() {
							return V(e);
						},
						get icon() {
							return V(t);
						},
						get image() {
							return V(n);
						},
						onpick: (e) => Et(`edit:${V(M).blockId}`, (t) => {
							t.props.glyph = e, t.props.icon = null, t.props.image = null;
						}),
						onicon: (e) => Et(`edit:${V(M).blockId}`, (t) => {
							t.props.icon = e, t.props.image = null;
						}),
						onimage: (e) => P("image", e)
					});
				}
				var o = z(a, 2), s = (e) => {
					var t = jc();
					J(t), B((e) => {
						Y(t, V(M).props.glyph ?? ""), X(t, "title", e);
					}, [() => Z("tip.icon.typeGlyph")]), H("change", t, (e) => P("glyph", e.target.value || "★")), W(e, t);
				}, c = (e) => {
					var t = Mc(), n = L(t, !0);
					j(t), B((e, r) => {
						X(t, "title", e), G(n, r);
					}, [() => Z("tip.icon.backToGlyph"), () => Z("ui.removeDrawnIcon")]), H("click", t, () => P("icon", null)), W(e, t);
				};
				K(o, (e) => {
					V(M).props.icon ? e(c, -1) : e(s);
				}), j(i), j(n);
				var l = z(n, 2), u = (e) => {
					var t = Nc(), n = L(t), r = z(n, 2), i = L(r, !0);
					j(r), j(t), B((e, r, a) => {
						X(t, "title", e), X(n, "src", V(M).props.image), X(n, "alt", r), G(i, a);
					}, [
						() => Z("hint.icon.ownImage"),
						() => Z("gp.ownIcon"),
						() => Z("ui.removeOwnIcon")
					]), H("click", r, () => P("image", null)), W(e, t);
				};
				K(l, (e) => {
					V(M).props.image && e(u);
				}), B((e) => G(r, `${e ?? ""} `), [() => Z("blocks.icon")]), W(e, t);
			}, p = (e) => {
				var t = Fc(), n = R(t), r = L(n), i = z(r);
				{
					let e = /* @__PURE__ */ N(() => V(M).props.collection ?? ""), t = /* @__PURE__ */ N(() => [["", Z("common.choose")], ...V(Ia).map((e) => [e, V(La)[e]?.name ?? e])]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => P("collection", e || null)
					});
				}
				j(n);
				var a = z(n, 2), o = L(a), s = z(o);
				J(s), j(a);
				var c = z(a, 2), l = L(c);
				J(l);
				var u = z(l);
				j(c), B((e, t, i, c, d) => {
					X(n, "title", e), G(r, `${t ?? ""} `), X(a, "title", i), G(o, `${c ?? ""} `), Y(s, V(M).props.limit ?? 6), ai(l, V(M).props.newestFirst !== !1), G(u, ` ${d ?? ""}`);
				}, [
					() => Z("tip.samling.source"),
					() => Z("blocks.samling"),
					() => Z("tip.samling.limit"),
					() => Z("lbl.maxCount"),
					() => Z("lbl.newestFirst")
				]), H("change", s, (e) => P("limit", Number(e.target.value))), H("change", l, (e) => P("newestFirst", e.target.checked)), W(e, t);
			}, m = (e) => {
				var t = Lc(), n = R(t), r = L(n), i = z(r);
				j(n), Vr(z(n, 2), 17, () => V(M).props.images ?? [], Lr, (e, t, n) => {
					var r = Ic(), i = L(r), a = L(i), o = z(a, 2), s = L(o);
					s.disabled = n === 0, q(s, () => c.up, !0), j(s);
					var l = z(s, 2);
					q(l, () => c.down, !0), j(l);
					var u = z(l, 2);
					q(u, () => c.cross, !0), j(u), j(o), j(i);
					var d = z(i, 2), f = L(d), p = z(f);
					J(p), j(d);
					var m = z(d, 2), h = L(m), g = z(h);
					J(g), j(m), j(r), B((e, r, o, s, c, d) => {
						X(i, "title", e), X(a, "src", V(t).src), l.disabled = n === V(M).props.images.length - 1, X(u, "title", r), G(f, `${o ?? ""} `), Y(p, V(t).alt ?? ""), X(p, "placeholder", s), G(h, `${c ?? ""} `), Y(g, V(t).href ?? ""), X(g, "placeholder", d);
					}, [
						() => Z("hint.gallery"),
						() => Z("tip.removeImage"),
						() => Z("lbl.description"),
						() => Z("ph.altShort"),
						() => Z("lbl.link"),
						() => Z("ph.galleryHref")
					]), H("click", s, () => uf(n, -1)), H("click", l, () => uf(n, 1)), H("click", u, () => df(n)), H("change", p, (e) => ff(n, "alt", e.target.value)), H("change", g, (e) => ff(n, "href", e.target.value || null)), W(e, r);
				}), B((e, t) => {
					X(n, "title", e), G(r, `${t ?? ""} `);
				}, [() => Z("tip.gallery.addImages"), () => Z("ui.addImages")]), H("change", i, cf), W(e, t);
			}, h = (e) => {
				var t = gc(), n = L(t);
				Q(z(n), {
					get value() {
						return V(M).props.kind;
					},
					get options() {
						return Jt;
					},
					onchange: (e) => P("kind", e)
				}), j(t), B((e) => G(n, `${e ?? ""} `), [() => Z("blocks.shape")]), W(e, t);
			}, g = (e) => {
				let t = /* @__PURE__ */ N(() => V(Qd).find((e) => e.type === V(M).type)?.fields ?? []);
				var n = jr(), r = R(n), i = (e) => {
					var n = jr();
					Vr(R(n), 17, () => V(t), (e) => e.key, (e, t) => {
						var n = jr(), r = R(n), i = (e) => {
							let n = /* @__PURE__ */ N(() => `${V(M).blockId}:${V(t).key}`);
							var r = zc(), i = R(r), a = L(i), o = z(a);
							J(o), j(i);
							var s = z(i, 2), c = L(s, !0);
							j(s);
							var l = z(s, 2), u = (e) => {
								var t = Rc();
								let r;
								var i = L(t, !0);
								j(t), B(() => {
									r = Qr(t, 1, "panel-hint svelte-1n46o8q", null, r, { "place-error": kt[V(n)].err }), G(i, kt[V(n)].text);
								}), W(e, t);
							};
							K(l, (e) => {
								kt[V(n)] && e(u);
							}), B((e) => {
								G(a, `${V(t).label ?? ""} `), X(o, "placeholder", V(t).placeholder), Y(o, Ot[V(n)] ?? V(M).props[V(t).key] ?? ""), s.disabled = V(At), G(c, e);
							}, [() => Z("props.place.search")]), H("input", o, (e) => {
								Ot[V(n)] = e.target.value;
							}), H("keydown", o, (e) => {
								e.key === "Enter" && Nt(V(t));
							}), H("click", s, () => Nt(V(t))), W(e, r);
						}, a = (e) => {
							var n = Bc(), r = L(n), i = z(r);
							J(i), j(n), B(() => {
								G(r, `${V(t).label ?? ""} `), X(i, "min", V(t).min), X(i, "max", V(t).max), X(i, "step", V(t).step ?? 1), Y(i, V(M).props[V(t).key]);
							}), H("change", i, (e) => P(V(t).key, Mt(V(t), Number(e.target.value)))), W(e, n);
						}, o = (e) => {
							var n = Oc(), r = L(n);
							J(r);
							var i = z(r);
							j(n), B((e) => {
								ai(r, e), G(i, ` ${V(t).label ?? ""}`);
							}, [() => !!V(M).props[V(t).key]]), H("change", r, (e) => P(V(t).key, e.target.checked)), W(e, n);
						}, s = (e) => {
							var n = gc(), r = L(n), i = z(r);
							{
								let e = /* @__PURE__ */ N(() => (V(t).options ?? []).map((e) => [e.value, e.label]));
								Q(i, {
									get value() {
										return V(M).props[V(t).key];
									},
									get options() {
										return V(e);
									},
									onchange: (e) => P(V(t).key, e)
								});
							}
							j(n), B(() => G(r, `${V(t).label ?? ""} `)), W(e, n);
						}, c = (e) => {
							var n = Vc(), r = L(n), i = z(r);
							J(i), j(n), B(() => {
								G(r, `${V(t).label ?? ""} `), X(i, "placeholder", V(t).placeholder), Y(i, V(M).props[V(t).key] ?? "");
							}), H("change", i, (e) => P(V(t).key, e.target.value)), W(e, n);
						};
						K(r, (e) => {
							V(t).type === "place" ? e(i) : V(t).type === "number" ? e(a, 1) : V(t).type === "toggle" ? e(o, 2) : V(t).type === "select" ? e(s, 3) : e(c, -1);
						}), W(e, n);
					}), W(e, n);
				}, a = (e) => {
					var t = Mc(), n = L(t, !0);
					j(t), B((e, r) => {
						X(t, "title", e), G(n, r);
					}, [() => Z("hint.pluginBlock"), () => Z("ui.settings")]), H("click", t, () => O?.sendOpenConfig(V(M).blockId)), W(e, t);
				};
				K(r, (e) => {
					V(t).length ? e(i) : e(a, -1);
				}), W(e, n);
			};
			K(n, (e) => {
				V(M).type === "text" ? e(r) : V(M).type === "faq" ? e(i, 1) : V(M).type === "tidslinje" ? e(a, 2) : V(M).type === "sitat" ? e(o, 3) : V(M).type === "statistikk" ? e(s, 4) : V(M).type === "button" ? e(l, 5) : V(M).type === "image" ? e(u, 6) : V(M).type === "video" ? e(d, 7) : V(M).type === "icon" ? e(f, 8) : V(M).type === "samling" ? e(p, 9) : V(M).type === "galleri" ? e(m, 10) : V(M).type === "shape" ? e(h, 11) : e(g, -1);
			}), W(e, t);
		}, m = (e) => {
			var t = ol(), n = R(t), r = (e) => {
				var t = Hc(), n = R(t), r = L(n), a = z(r);
				{
					let e = /* @__PURE__ */ N(() => V(M).props.align ?? "left"), t = /* @__PURE__ */ N(() => [
						["left", Z("common.left")],
						["center", Z("common.center")],
						["right", Z("common.right")]
					]);
					Q(a, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => P("align", e)
					});
				}
				j(n);
				var o = z(n, 2), s = L(o);
				J(s);
				var c = z(s);
				j(o);
				var l = z(o, 2), u = (e) => {
					i(e);
				};
				K(l, (e) => {
					V(M).props.box && e(u);
				}), Ne(2), B((e, t, n) => {
					G(r, `${e ?? ""} `), ai(s, t), G(c, ` ${n ?? ""}`);
				}, [
					() => Z("lbl.align"),
					() => !!V(M).props.box,
					() => Z("lbl.textBoxToggle")
				]), H("change", s, (e) => P("box", e.target.checked)), W(e, t);
			}, a = (e) => {
				var t = Uc(), n = R(t), r = L(n, !0);
				j(n);
				var a = z(n, 2);
				i(a), Ne(2), B((e) => G(r, e), [() => Z("lbl.cardStyle")]), W(e, t);
			}, o = (e) => {
				var t = Wc(), n = R(t), r = L(n), i = z(r);
				{
					let e = /* @__PURE__ */ N(() => V(M).props.variant ?? "venstre"), t = /* @__PURE__ */ N(() => [["venstre", Z("opt.tl.venstre")], ["veksler", Z("opt.tl.veksler")]]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => P("variant", e)
					});
				}
				j(n);
				var a = z(n, 2), o = L(a), s = z(o);
				{
					let e = /* @__PURE__ */ N(() => V(M).props.marker ?? "fylt"), t = /* @__PURE__ */ N(() => [["fylt", Z("opt.tl.fylt")], ["ring", Z("opt.tl.ring")]]);
					Q(s, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => P("marker", e)
					});
				}
				j(a);
				var c = z(a, 2), l = L(c), u = z(l);
				{
					let e = /* @__PURE__ */ N(() => V(M).props.accent ?? "accent"), t = /* @__PURE__ */ N(Yn);
					Ui(u, {
						get value() {
							return V(e);
						},
						get tokens() {
							return V(t);
						},
						onchange: (e) => P("accent", e === "accent" ? null : e)
					});
				}
				j(c), Ne(2), B((e, t, n) => {
					G(r, `${e ?? ""} `), G(o, `${t ?? ""} `), G(l, `${n ?? ""} `);
				}, [
					() => Z("lbl.variant"),
					() => Z("lbl.tlMarker"),
					() => Z("lbl.color")
				]), W(e, t);
			}, s = (e) => {
				var t = Kc(), n = R(t), r = L(n), i = z(r);
				{
					let e = /* @__PURE__ */ N(() => V(M).props.variant ?? "stor"), t = /* @__PURE__ */ N(() => [["stor", Z("opt.sitat.stor")], ["kort", Z("opt.sitat.kort")]]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => P("variant", e)
					});
				}
				j(n);
				var a = z(n, 2), o = (e) => {
					var t = Gc(), n = R(t), r = L(n), i = z(r);
					j(n);
					var a = z(n, 2), o = (e) => {
						var t = Mc(), n = L(t, !0);
						j(t), B((e) => G(n, e), [() => Z("ui.sitatPortrettFjern")]), H("click", t, () => P("image", "")), W(e, t);
					};
					K(a, (e) => {
						V(M).props.image && e(o);
					}), B((e) => G(r, `${e ?? ""} `), [() => Z("ui.sitatPortrett")]), H("change", i, Kt), W(e, t);
				};
				K(a, (e) => {
					V(M).props.variant === "kort" && e(o);
				});
				var s = z(a, 2), c = L(s), l = z(c);
				{
					let e = /* @__PURE__ */ N(() => V(M).props.accent ?? "accent"), t = /* @__PURE__ */ N(Yn);
					Ui(l, {
						get value() {
							return V(e);
						},
						get tokens() {
							return V(t);
						},
						onchange: (e) => P("accent", e === "accent" ? null : e)
					});
				}
				j(s), Ne(2), B((e, t) => {
					G(r, `${e ?? ""} `), G(c, `${t ?? ""} `);
				}, [() => Z("lbl.variant"), () => Z("lbl.color")]), W(e, t);
			}, c = (e) => {
				var t = qc(), n = R(t), r = L(n);
				J(r);
				var i = z(r);
				j(n), Ne(2), B((e, t) => {
					X(n, "title", e), ai(r, V(M).props.countUp !== !1), G(i, ` ${t ?? ""}`);
				}, [() => Z("tip.stat.countUp"), () => Z("lbl.statCountUp")]), H("change", r, (e) => P("countUp", e.target.checked)), W(e, t);
			}, l = (e) => {
				var t = Jc(), n = R(t), r = L(n), i = z(r);
				{
					let e = /* @__PURE__ */ N(() => [["primary", Z("opt.btn.primary")], ["secondary", Z("opt.btn.secondary")]]);
					Q(i, {
						get value() {
							return V(M).props.style;
						},
						get options() {
							return V(e);
						},
						onchange: (e) => P("style", e)
					});
				}
				j(n), Ne(2), B((e) => G(r, `${e ?? ""} `), [() => Z("lbl.style")]), W(e, t);
			}, u = (e) => {
				var t = Yc(), n = R(t), r = L(n), i = z(r);
				{
					let e = /* @__PURE__ */ N(() => V(M).props.fit ?? "cover"), t = /* @__PURE__ */ N(() => [["cover", Z("opt.fitFrame.cover")], ["contain", Z("opt.fitFrame.contain")]]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => P("fit", e)
					});
				}
				j(n);
				var a = z(n, 2), o = L(a), s = z(o);
				{
					let e = /* @__PURE__ */ N(() => V(M).props.radius ?? ""), t = /* @__PURE__ */ N(() => [
						["", Z("common.none")],
						["sm", Z("opt.size.sm")],
						["md", Z("opt.radius.md")]
					]);
					Q(s, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => P("radius", e || null)
					});
				}
				j(a);
				var c = z(a, 2), l = L(c), u = z(l), d = L(u);
				j(u), j(c);
				var f = z(c, 2);
				J(f);
				var p = z(f, 2), m = L(p), h = z(m), g = L(h);
				j(h), j(p);
				var _ = z(p, 2);
				J(_);
				var v = z(_, 2), y = L(v), b = z(y), x = L(b);
				j(b), j(v);
				var S = z(v, 2);
				J(S);
				var C = z(S, 2), w = L(C), T = z(w), ee = L(T);
				j(T), j(C);
				var te = z(C, 2);
				J(te);
				var ne = z(te, 2), re = L(ne), ie = z(re), ae = L(ie);
				j(ie), j(ne);
				var oe = z(ne, 2);
				J(oe);
				var se = z(oe, 2), ce = L(se), le = z(ce), ue = L(le);
				j(le), j(se);
				var de = z(se, 2);
				J(de);
				var fe = z(de, 2), pe = L(fe, !0);
				j(fe), Ne(2), B((e, t, n, i, a, s, c, u, p, h, b, C, T, ne, ie, se, le) => {
					G(r, `${e ?? ""} `), G(o, `${t ?? ""} `), G(l, `${n ?? ""} `), G(d, `${i ?? ""}%`), Y(f, V(M).props.x ?? .5), G(m, `${a ?? ""} `), G(g, `${s ?? ""}%`), Y(_, V(M).props.y ?? .5), X(v, "title", c), G(y, `${u ?? ""} `), G(x, `${p ?? ""}x`), Y(S, V(M).props.zoom ?? 1), G(w, `${h ?? ""} `), G(ee, `${b ?? ""}%`), Y(te, V(M).props.brightness ?? 1), G(re, `${C ?? ""} `), G(ae, `${T ?? ""}%`), Y(oe, V(M).props.contrast ?? 1), G(ce, `${ne ?? ""} `), G(ue, `${ie ?? ""}%`), Y(de, V(M).props.saturate ?? 1), X(fe, "title", se), G(pe, le);
				}, [
					() => Z("lbl.fit"),
					() => Z("lbl.radius"),
					() => Z("lbl.focusX"),
					() => Math.round((V(M).props.x ?? .5) * 100),
					() => Z("lbl.focusY"),
					() => Math.round((V(M).props.y ?? .5) * 100),
					() => Z("tip.zoomCrop"),
					() => Z("lbl.zoom"),
					() => (V(M).props.zoom ?? 1).toFixed(2),
					() => Z("lbl.brightness"),
					() => Math.round((V(M).props.brightness ?? 1) * 100),
					() => Z("lbl.contrast"),
					() => Math.round((V(M).props.contrast ?? 1) * 100),
					() => Z("lbl.saturate"),
					() => Math.round((V(M).props.saturate ?? 1) * 100),
					() => Z("tip.resetAdjust"),
					() => Z("ui.resetAdjust")
				]), H("input", f, (e) => P("x", Number(e.target.value))), H("input", _, (e) => P("y", Number(e.target.value))), H("input", S, (e) => P("zoom", Number(e.target.value))), H("input", te, (e) => P("brightness", Number(e.target.value))), H("input", oe, (e) => P("contrast", Number(e.target.value))), H("input", de, (e) => P("saturate", Number(e.target.value))), H("click", fe, () => Et(`edit:${V(M).blockId}`, (e) => {
					e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
				})), W(e, t);
			}, d = (e) => {
				var t = Xc(), n = R(t), r = L(n), i = z(r);
				J(i), j(n);
				var a = z(n, 2), o = L(a), s = z(o);
				{
					let e = /* @__PURE__ */ N(() => V(M).props.color ?? "accent"), t = /* @__PURE__ */ N(Yn);
					Ui(s, {
						get value() {
							return V(e);
						},
						get tokens() {
							return V(t);
						},
						onchange: (e) => P("color", e)
					});
				}
				j(a), Ne(2), B((e, t, n) => {
					G(r, `${e ?? ""} `), Y(i, V(M).props.size ?? 48), X(a, "title", t), G(o, `${n ?? ""} `);
				}, [
					() => Z("lbl.sizePx"),
					() => Z("hint.icon.color"),
					() => Z("lbl.color")
				]), H("change", i, (e) => P("size", Number(e.target.value))), W(e, t);
			}, f = (e) => {
				var t = Jc(), n = R(t), r = L(n), i = z(r);
				{
					let e = /* @__PURE__ */ N(() => V(M).props.view ?? "cards"), t = /* @__PURE__ */ N(() => [
						["cards", Z("opt.collectionView.cards")],
						["list", Z("opt.collectionView.list")],
						["archive", Z("opt.collectionView.archive")]
					]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => P("view", e)
					});
				}
				j(n), Ne(2), B((e) => G(r, `${e ?? ""} `), [() => Z("lbl.view")]), W(e, t);
			}, p = (e) => {
				var t = $c(), n = R(t), r = L(n), i = z(r);
				{
					let e = /* @__PURE__ */ N(() => V(M).props.view ?? "grid"), t = /* @__PURE__ */ N(() => [
						["grid", Z("opt.galleryView.grid")],
						["carousel", Z("opt.galleryView.carousel")],
						["slides", Z("opt.galleryView.slides")]
					]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => P("view", e)
					});
				}
				j(n);
				var a = z(n, 2), o = (e) => {
					var t = Zc(), n = R(t), r = L(n), i = z(r);
					J(i), j(n);
					var a = z(n, 2), o = L(a), s = z(o), c = L(s);
					j(s), j(a);
					var l = z(a, 2);
					J(l), B((e, t) => {
						G(r, `${e ?? ""} `), Y(i, V(M).props.columns ?? 3), G(o, `${t ?? ""} `), G(c, `${V(M).props.gap ?? 12 ?? ""} px`), Y(l, V(M).props.gap ?? 12);
					}, [() => Z("lbl.columns"), () => Z("lbl.imageGap")]), H("change", i, (e) => P("columns", Number(e.target.value))), H("input", l, (e) => P("gap", Number(e.target.value))), W(e, t);
				};
				K(a, (e) => {
					(V(M).props.view ?? "grid") === "grid" && e(o);
				});
				var s = z(a, 2), c = (e) => {
					var t = Qc(), n = L(t), r = z(n);
					J(r), j(t), B((e) => {
						G(n, `${e ?? ""} `), Y(r, V(M).props.interval ?? 5);
					}, [() => Z("lbl.secondsPerImage")]), H("change", r, (e) => P("interval", Number(e.target.value))), W(e, t);
				};
				K(s, (e) => {
					V(M).props.view === "slides" && e(c);
				});
				var l = z(s, 2), u = L(l), d = z(u);
				{
					let e = /* @__PURE__ */ N(() => V(M).props.radius ?? ""), t = /* @__PURE__ */ N(() => [
						["", Z("common.none")],
						["sm", Z("opt.size.sm")],
						["md", Z("opt.radius.md")]
					]);
					Q(d, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => P("radius", e || null)
					});
				}
				j(l);
				var f = z(l, 2), p = L(f);
				J(p);
				var m = z(p);
				j(f), Ne(2), B((e, t, n, i) => {
					G(r, `${e ?? ""} `), G(u, `${t ?? ""} `), X(f, "title", n), ai(p, V(M).props.lightbox !== !1), G(m, ` ${i ?? ""}`);
				}, [
					() => Z("lbl.view"),
					() => Z("lbl.radius"),
					() => Z("tip.lightbox"),
					() => Z("lbl.lightbox")
				]), H("change", p, (e) => P("lightbox", e.target.checked)), W(e, t);
			}, m = (e) => {
				var t = el(), n = R(t), r = L(n);
				Q(z(r), {
					get value() {
						return V(M).props.color;
					},
					get options() {
						return Yt;
					},
					onchange: (e) => P("color", e)
				}), j(n);
				var i = z(n, 2), a = L(i), o = z(a);
				J(o), j(i);
				var s = z(i, 2), c = L(s);
				J(c);
				var l = z(c);
				j(s), Ne(2), B((e, t, n, i, u) => {
					G(r, `${e ?? ""} `), G(a, `${t ?? ""} `), Y(o, V(M).props.thickness), X(s, "title", n), ai(c, i), G(l, ` ${u ?? ""}`);
				}, [
					() => Z("lbl.color"),
					() => Z("lbl.thickness"),
					() => Z("tip.shape.fill"),
					() => !!V(M).props.fill,
					() => Z("lbl.filled")
				]), H("change", o, (e) => P("thickness", Number(e.target.value))), H("change", c, (e) => P("fill", e.target.checked ? V(M).props.color : null)), W(e, t);
			};
			K(n, (e) => {
				V(M).type === "text" ? e(r) : V(M).type === "faq" ? e(a, 1) : V(M).type === "tidslinje" ? e(o, 2) : V(M).type === "sitat" ? e(s, 3) : V(M).type === "statistikk" ? e(c, 4) : V(M).type === "button" ? e(l, 5) : V(M).type === "image" ? e(u, 6) : V(M).type === "icon" ? e(d, 7) : V(M).type === "samling" ? e(f, 8) : V(M).type === "galleri" ? e(p, 9) : V(M).type === "shape" && e(m, 10);
			});
			var h = z(n, 2), g = L(h), _ = z(g);
			{
				let e = /* @__PURE__ */ N(() => rr(V(M).animation) ? V(M).animation.type : "");
				Q(_, {
					get value() {
						return V(e);
					},
					get options() {
						return ar;
					},
					onchange: (e) => cr(e || null)
				});
			}
			j(h);
			var v = z(h, 2), y = (e) => {
				var t = tl(), n = R(t), r = L(n), i = z(r);
				J(i), j(n);
				var a = z(n, 2), o = L(a), s = z(o);
				J(s), j(a), B((e, t) => {
					G(r, `${e ?? ""} `), Y(i, V(M).animation.props.duration), G(o, `${t ?? ""} `), Y(s, V(M).animation.props.delay);
				}, [() => Z("lbl.durationMs"), () => Z("lbl.delayMs")]), H("change", i, (e) => ur("duration", Number(e.target.value))), H("change", s, (e) => ur("delay", Number(e.target.value))), W(e, t);
			}, b = /* @__PURE__ */ N(() => rr(V(M).animation));
			K(v, (e) => {
				V(b) && e(y);
			});
			var x = z(v, 2), S = L(x), C = z(S);
			{
				let e = /* @__PURE__ */ N(() => V(M).hover?.type ?? (V(M).animation && !rr(V(M).animation) ? V(M).animation.type : ""));
				Q(C, {
					get value() {
						return V(e);
					},
					get options() {
						return or;
					},
					onchange: (e) => lr(e || null)
				});
			}
			j(x);
			var w = z(x, 2), T = (e) => {
				var t = il(), n = z(R(t), 2), r = L(n);
				J(r);
				var i = z(r);
				j(n);
				var a = z(n, 2), o = (e) => {
					var t = rl(), n = R(t), r = L(n), i = z(r);
					{
						let e = /* @__PURE__ */ N(() => V(M).sticky.mode ?? "scroll"), t = /* @__PURE__ */ N(() => [["scroll", Z("opt.sticky.modeScroll")], ["screen", Z("opt.sticky.modeScreen")]]);
						Q(i, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => Et(`edit:${V(M).blockId}`, (t) => {
								t.sticky = {
									...t.sticky,
									mode: e
								};
							})
						});
					}
					j(n);
					var a = z(n, 2), o = (e) => {
						var t = nl(), n = L(t), r = z(n);
						J(r), j(t), B((e, i) => {
							X(t, "title", e), G(n, `${i ?? ""} `), Y(r, V(M).sticky.offset ?? 16);
						}, [() => V(M).sticky.mode === "screen" ? Z("tip.stickyEdge") : Z("tip.stickyOffset"), () => V(M).sticky.mode === "screen" ? Z("lbl.stickyEdge") : Z("lbl.stickyOffset")]), H("change", r, (e) => Et(`edit:${V(M).blockId}`, (t) => {
							t.sticky = {
								...t.sticky,
								offset: Math.max(0, Number(e.target.value) || 0)
							};
						})), W(e, t);
					};
					K(a, (e) => {
						(V(M).sticky.mode !== "screen" || (V(M).sticky.dock ?? "bottom-right") !== "middle-center") && e(o);
					});
					var s = z(a, 2), c = (e) => {
						var t = gc(), n = L(t), r = z(n);
						{
							let e = /* @__PURE__ */ N(() => V(M).sticky.dock ?? "bottom-right"), t = /* @__PURE__ */ N(() => Ct.map(([e, t]) => [e, Z(t)]));
							Q(r, {
								get value() {
									return V(e);
								},
								get options() {
									return V(t);
								},
								onchange: (e) => Et(`edit:${V(M).blockId}`, (t) => {
									t.sticky = {
										...t.sticky,
										dock: e
									};
								})
							});
						}
						j(t), B((e, r) => {
							X(t, "title", e), G(n, `${r ?? ""} `);
						}, [() => Z("tip.stickyDock"), () => Z("lbl.stickyDock")]), W(e, t);
					}, l = (e) => {
						var t = gc(), n = L(t), r = z(n);
						{
							let e = /* @__PURE__ */ N(() => V(M).sticky.until ?? ""), t = /* @__PURE__ */ N(wt);
							Q(r, {
								get value() {
									return V(e);
								},
								get options() {
									return V(t);
								},
								onchange: (e) => Et(`edit:${V(M).blockId}`, (t) => {
									t.sticky = {
										...t.sticky,
										until: e || null
									};
								})
							});
						}
						j(t), B((e, r) => {
							X(t, "title", e), G(n, `${r ?? ""} `);
						}, [() => Z("tip.stickyUntil"), () => Z("lbl.stickyUntil")]), W(e, t);
					};
					K(s, (e) => {
						V(M).sticky.mode === "screen" ? e(c) : e(l, -1);
					}), B((e, t) => {
						X(n, "title", e), G(r, `${t ?? ""} `);
					}, [() => Z("tip.stickyMode"), () => Z("lbl.stickyMode")]), W(e, t);
				};
				K(a, (e) => {
					V(M).sticky && e(o);
				}), B((e, t, a) => {
					X(n, "title", e), ai(r, t), G(i, ` ${a ?? ""}`);
				}, [
					() => Z("tip.sticky"),
					() => !!V(M).sticky,
					() => Z("lbl.sticky")
				]), H("change", r, (e) => Et(`edit:${V(M).blockId}`, (t) => {
					t.sticky = e.target.checked ? {
						offset: 16,
						until: null
					} : null;
				})), W(e, t);
			};
			K(w, (e) => {
				V(ae) === "desktop" && e(T);
			});
			var ee = z(w, 4), te = L(ee), ne = L(te, !0);
			j(te);
			var re = z(te, 2), ie = L(re), oe = (e) => {
				var t = al(), n = L(t), r = L(n, !0), i = z(r);
				J(i), j(n);
				var a = z(n, 2), o = L(a, !0), s = z(o);
				J(s), j(a);
				var c = z(a, 2), l = L(c, !0), u = z(l);
				J(u), j(c);
				var d = z(c, 2), f = L(d, !0), p = z(f);
				J(p), j(d);
				var m = z(d, 2), h = L(m, !0), g = z(h);
				J(g), j(m);
				var _ = z(m, 2), v = L(_, !0), y = z(v);
				J(y), j(_), j(t), B((e, t, n, a, c, d, _) => {
					G(r, e), Y(i, V(M).frame.x), G(o, t), Y(s, V(M).frame.y), G(l, n), Y(u, V(M).frame.w), G(f, a), Y(p, V(M).frame.h), X(m, "title", c), G(h, d), Y(g, V(M).frame.z ?? 1), G(v, _), Y(y, V(M).frame.rot ?? 0);
				}, [
					() => Z("frame.x"),
					() => Z("frame.y"),
					() => Z("frame.w"),
					() => Z("frame.h"),
					() => Z("tip.frameZ"),
					() => Z("frame.z"),
					() => Z("frame.rot")
				]), H("change", i, (e) => Pt("x", Number(e.target.value))), H("change", s, (e) => Pt("y", Number(e.target.value))), H("change", u, (e) => Pt("w", Number(e.target.value))), H("change", p, (e) => Pt("h", Number(e.target.value))), H("change", g, (e) => Pt("z", Number(e.target.value))), H("change", y, (e) => Pt("rot", Number(e.target.value))), W(e, t);
			};
			K(ie, (e) => {
				V(ae) === "desktop" && e(oe);
			});
			var se = z(ie, 2), ce = L(se);
			J(ce);
			var le = z(ce);
			j(se), j(re), j(ee), B((e, t, n, r, i, a, o, s) => {
				X(h, "title", e), G(g, `${t ?? ""} `), X(x, "title", n), G(S, `${r ?? ""} `), X(te, "title", i), G(ne, a), X(se, "title", o), ai(ce, V(M).decor), G(le, ` ${s ?? ""}`);
			}, [
				() => Z("tip.props.blockAnim"),
				() => Z("lbl.animIn"),
				() => Z("tip.props.blockHover"),
				() => Z("lbl.onHover"),
				() => Z("hint.placement"),
				() => Z("group.placement"),
				() => Z("tip.decor"),
				() => Z("lbl.decor")
			]), H("change", ce, (e) => Wt(e.target.checked)), W(e, t);
		};
		K(f, (e) => {
			V(jt) === "content" ? e(p) : e(m, -1);
		}), B((e, t) => {
			o = Qr(a, 1, "svelte-1n46o8q", null, o, { on: V(jt) === "content" }), G(s, e), u = Qr(l, 1, "svelte-1n46o8q", null, u, { on: V(jt) === "style" }), G(d, t);
		}, [() => Z("props.tabContent"), () => Z("props.tabStyle")]), H("click", a, () => I(jt, "content")), H("click", l, () => I(jt, "style")), W(e, t);
	}, o = [
		["color", rs],
		["gradient", hs],
		["glow", gs],
		["image", Hs],
		["bildegalleri", Ks],
		["grain", vs]
	], s = Object.fromEntries(o), c = {
		copy: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"9\" y=\"9\" width=\"11\" height=\"11\" rx=\"2\"/><path d=\"M5 15V5a2 2 0 0 1 2-2h10\"/></svg>",
		phone: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><rect x=\"8\" y=\"3\" width=\"8\" height=\"18\" rx=\"2\"/><path d=\"M11 17.5h2\"/></svg>",
		pencil: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M17 3l4 4L8 20l-5 1 1-5L17 3z\"/></svg>",
		eye: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z\"/><circle cx=\"12\" cy=\"12\" r=\"2.6\"/></svg>",
		warn: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 3L2 20h20L12 3z\"/><path d=\"M12 10v4\"/><path d=\"M12 17.2h.01\"/></svg>",
		up: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 20V4\"/><path d=\"M5 11l7-7 7 7\"/></svg>",
		down: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 4v16\"/><path d=\"M5 13l7 7 7-7\"/></svg>",
		right: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 12h16\"/><path d=\"M13 5l7 7-7 7\"/></svg>",
		cross: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\"><path d=\"M5 5l14 14\"/><path d=\"M19 5L5 19\"/></svg>",
		plus: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\"><path d=\"M12 5v14\"/><path d=\"M5 12h14\"/></svg>",
		minus: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\"><path d=\"M5 12h14\"/></svg>",
		gear: "<svg width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z\"/></svg>",
		guides: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 2v20M2 12h20\" stroke-dasharray=\"3 3\"/><rect x=\"7.5\" y=\"7.5\" width=\"9\" height=\"9\" rx=\"1.5\"/></svg>",
		kebab: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"currentColor\" stroke=\"none\"><circle cx=\"12\" cy=\"5\" r=\"1.8\"/><circle cx=\"12\" cy=\"12\" r=\"1.8\"/><circle cx=\"12\" cy=\"19\" r=\"1.8\"/></svg>",
		bookmark: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z\"/><path d=\"M12 7v6M9 10h6\"/></svg>",
		fit: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4M20 15v4a1 1 0 0 1-1 1h-4\"/></svg>",
		gridToggle: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M9 3v18M15 3v18M3 9h18M3 15h18\"/></svg>",
		restore: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 4v5h5\"/><path d=\"M3.05 13A9 9 0 1 0 6 5.3L3 9\"/><path d=\"M12 8v4.5l3 1.8\"/></svg>",
		caret: "<svg width=\"9\" height=\"9\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6 9l6 6 6-6\"/></svg>",
		external: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14 4h6v6\"/><path d=\"M20 4l-8 8\"/><path d=\"M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5\"/></svg>",
		device_desktop: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2\" y=\"3\" width=\"20\" height=\"13\" rx=\"2\"/><path d=\"M8 21h8M12 16v5\"/></svg>",
		device_laptop: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"4\" y=\"4\" width=\"16\" height=\"11\" rx=\"1.5\"/><path d=\"M2 19h20\"/></svg>",
		device_tablet: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"5\" y=\"2\" width=\"14\" height=\"20\" rx=\"2\"/><path d=\"M11 18.5h2\"/></svg>",
		device_mobile: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"7\" y=\"2\" width=\"10\" height=\"20\" rx=\"2\"/><path d=\"M11 18.5h2\"/></svg>"
	}, l = [
		["lilla", Z("adminTheme.lilla")],
		["bronn", Z("adminTheme.bronn")],
		["gull", Z("adminTheme.gull")],
		["graa", Z("adminTheme.graa")],
		["nordlys", Z("adminTheme.nordlys")],
		["skumring", Z("adminTheme.skumring")],
		["glo", Z("adminTheme.glo")]
	], u = /* @__PURE__ */ F(tn(localStorage.getItem("urd-admin-theme") ?? "graa"));
	bn(() => {
		document.documentElement.dataset.adminTheme = V(u), localStorage.setItem("urd-admin-theme", V(u)), f();
	});
	function f() {
		let e = getComputedStyle(document.documentElement), t = e.getPropertyValue("--urd-color-accent").trim();
		O?.sendAdminTheme({
			bg: e.getPropertyValue("--urd-color-bg").trim(),
			surface: e.getPropertyValue("--urd-color-surface").trim(),
			accent: t,
			text: e.getPropertyValue("--urd-color-text").trim(),
			"accent-text": p(t)
		});
	}
	function p(e) {
		return ts(e) == null || (ns(e, "#ffffff") ?? 0) >= (ns(e, "#0b0e14") ?? 0) ? "#ffffff" : "#0b0e14";
	}
	let h = /* @__PURE__ */ F(null), g = /* @__PURE__ */ F(null), _ = /* @__PURE__ */ F(!1), v = /* @__PURE__ */ F(""), y = /* @__PURE__ */ F("info"), b = 0;
	function x(e, t = "info") {
		I(v, e, !0), I(y, t, !0);
		let n = ++b;
		t === "ok" && setTimeout(() => {
			b === n && (I(v, ""), I(y, "info"));
		}, 8e3);
	}
	function S() {
		x(Z("status.storageFull"), "error");
	}
	function C(e, t) {
		try {
			localStorage.setItem(e, t);
		} catch {
			S();
		}
	}
	let w = /* @__PURE__ */ F(null), T = /* @__PURE__ */ F(null), ee = /* @__PURE__ */ F(tn({
		size: 16,
		snap: !0
	})), te = /* @__PURE__ */ F(!0), ne = [
		{
			id: "desktop",
			width: null,
			viewport: "desktop"
		},
		{
			id: "laptop",
			width: 1280,
			viewport: "desktop"
		},
		{
			id: "tablet",
			width: 810,
			viewport: "desktop"
		},
		{
			id: "mobile",
			width: 390,
			viewport: "mobile"
		}
	], re = /* @__PURE__ */ F("desktop"), ie = /* @__PURE__ */ N(() => ne.find((e) => e.id === V(re)) ?? ne[0]), ae = /* @__PURE__ */ N(() => V(ie).viewport), oe = /* @__PURE__ */ F(null), se = /* @__PURE__ */ F(0), ce = /* @__PURE__ */ F(0), le = /* @__PURE__ */ F(tn(typeof window < "u" ? window.innerWidth : 1280)), ue = /* @__PURE__ */ F("fit"), de = /* @__PURE__ */ F(1), fe = /* @__PURE__ */ N(() => V(zi) === "full" ? V(le) : 1920), pe = /* @__PURE__ */ N(() => ja(V(zi), V(Bi))), me = /* @__PURE__ */ N(() => V(ie).width ?? V(fe)), he = /* @__PURE__ */ N(() => V(ue) === "manual" ? V(de) : wa(V(se), V(me), "fit"));
	function ge(e) {
		let t = Math.min(400, Math.max(10, (Math.round(Math.round(V(he) * 100) / 10) + e) * 10));
		I(de, t / 100), I(ue, "manual");
	}
	let _e = /* @__PURE__ */ N(() => V(he) > 0 ? V(ce) / V(he) : V(ce)), ve = /* @__PURE__ */ N(() => V(me) * V(he)), ye = /* @__PURE__ */ N(() => V(ce)), be = /* @__PURE__ */ N(() => V(ve) > V(se) + 1 || V(ye) > V(ce) + 1);
	bn(() => {
		let e = () => O?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), bn(() => {
		let e = V(ae);
		O?.sendViewport(e);
	}), bn(() => {
		let e = V(he);
		O?.sendZoom(e);
	}), bn(() => {
		let e = () => {
			I(le, window.innerWidth, !0);
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}), bn(() => {
		let e = V(oe);
		if (!e || typeof ResizeObserver > "u") return;
		let t = () => {
			I(se, e.clientWidth, !0), I(ce, e.clientHeight, !0);
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	});
	let xe = /* @__PURE__ */ F(0);
	function Se() {
		I(xe, E?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function Ce(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			Pe("layout");
			for (let n of e.frames ?? []) {
				let e = t.blocks.find((e) => e.id === n.blockId);
				e && (e.frames.desktop = {
					...e.frames.desktop,
					...n.frame
				});
			}
			t.size = {
				...t.size,
				minHeight: e.minHeight
			}, we(t, "oppsett-byttet"), e.sectionId === V(Xt) && I(Qt, e.minHeight, !0), V(M)?.sectionId === e.sectionId && bt(), E.save(), A(), O?.sendSection(V(g), t);
		}
	}
	function we(e, t) {
		!e || e.responsive?.mobile?.mode !== "manual" || e.responsive.mobile.attention?.needed || (e.responsive.mobile.attention = {
			needed: !0,
			reason: t,
			since: (/* @__PURE__ */ new Date()).toISOString()
		}, Se(), O?.sendAttention(e.id, !0));
	}
	let E = null, D = null, O = null, k = /* @__PURE__ */ F(null);
	function Te() {
		I(k, D.data, !0), D.replace(V(k));
	}
	function Ee() {
		O?.sendSite(Be(V(k)));
	}
	let De = /* @__PURE__ */ new Set(), Oe = () => V(k).pages.find((e) => e.id === V(g));
	function A() {
		let e = V(k)?.pages?.some((e) => !De.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = ba?.hasDraft() || Object.values(Ca).some((e) => e.hasDraft()), n = Ka?.hasDraft() || Object.values(Ya).some((e) => e.hasDraft());
		I(_, e || E?.hasDraft() && !De.has(V(g)) || D?.hasDraft() || bo?.hasDraft() || t || n || !1, !0);
	}
	let ke = [], Ae = [], je = null;
	function Me() {
		return JSON.stringify({
			pageId: V(g),
			page: E.data,
			site: D.data,
			samlingerIndex: Fa ? ba.data : null,
			samlinger: Fa ? Object.fromEntries(Object.entries(Ca).map(([e, t]) => [e, t.data])) : {},
			malerIndex: Xa ? Ka.data : null,
			maler: Xa ? Object.fromEntries(Object.entries(Ya).map(([e, t]) => [e, t.data])) : {},
			plugins: bo?.data ?? null
		});
	}
	function Pe(e) {
		e === je && (e.startsWith("edit:") || e.startsWith("grid:")) || (ke.push(Me()), ke.length > 50 && ke.shift(), Ae.length = 0, je = e);
	}
	function Fe(e) {
		let { pageId: t, page: n, site: r, samlingerIndex: i, samlinger: a, malerIndex: o, maler: s, plugins: c } = JSON.parse(e);
		if (D.replace(r), Te(), D.save(), I(ee, {
			snap: !0,
			...V(k).grid
		}, !0), Ee(), Ie(i, a ?? {}), Le(o, s ?? {}), Re(c), t && t !== V(g) && V(k).pages.some((e) => e.id === t)) {
			C(`urd-draft-${t}`, JSON.stringify(n)), Kr(t, { keepHistory: !0 }), A();
			return;
		}
		E.replace(n), E.save(), A(), Se(), bt(), on(E.data.sections.find((e) => e.id === V(Xt))), V(k).pages.some((e) => e.id === V(g)) ? O?.sendPage(V(g), E.data) : Kr(V(k).pages[0].id, { keepHistory: !0 });
	}
	function Ie(e, t) {
		if (!(!ba || !e) && JSON.stringify({
			index: ba.data,
			samlinger: Object.fromEntries(Object.entries(Ca).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			samlinger: t
		})) {
			ba.replace(e), ba.save();
			for (let e of Object.keys(Ca)) e in t || (localStorage.removeItem(`urd-draft-samling-${e}`), delete Ca[e]);
			for (let [e, n] of Object.entries(t)) {
				if (!Ca[e]) {
					let t = Pa[e] ?? null;
					Ca[e] = ji(`urd-draft-samling-${e}`, () => t, S);
				}
				Ca[e].replace(n), Ca[e].save();
			}
			I(Ia, [...e.samlinger ?? []], !0), V(za) && !V(Ia).includes(V(za)) && I(za, null), ao();
		}
	}
	function Le(e, t) {
		if (!(!Ka || !e) && JSON.stringify({
			index: Ka.data,
			maler: Object.fromEntries(Object.entries(Ya).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			maler: t
		})) {
			Ka.replace(e), Ka.save();
			for (let e of Object.keys(Ya)) e in t || (localStorage.removeItem(`urd-draft-mal-${e}`), delete Ya[e]);
			for (let [e, n] of Object.entries(t)) Ya[e] || (Ya[e] = ji(`urd-draft-mal-${e}`, () => $[e] ?? null, S)), Ya[e].replace(n), Ya[e].save();
			I(Za, [...e.maler ?? []], !0), A(), $a();
		}
	}
	function Re(e) {
		!bo || !e || JSON.stringify(bo.data) !== JSON.stringify(e) && (bo.replace(e), bo.save(), Mo(), Wo());
	}
	function ze() {
		ke.length && (Ae.push(Me()), Fe(ke.pop()), je = null, x(Z("status.undone")));
	}
	function Ve() {
		Ae.length && (ke.push(Me()), Fe(Ae.pop()), je = null, x(Z("status.redone")));
	}
	function He(e) {
		V(St) && (e.target instanceof Element && e.target.closest(".block-menu") || I(St, null));
	}
	function Ue(e) {
		if (e.key === "Escape" && V(St)) {
			I(St, null);
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
			].includes(t.type)) || !V(M) || V(ae) === "mobile") return;
			e.preventDefault(), O?.sendDuplicate();
			return;
		}
		if (t !== "z" && t !== "y") return;
		let n = e.target;
		n instanceof HTMLElement && (n.isContentEditable || n.tagName === "TEXTAREA" || n.tagName === "INPUT" && ![
			"number",
			"checkbox",
			"range",
			"color"
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? Ve() : ze());
	}
	async function Ke() {
		I(h, Va(await (await fetch("/content/site.json")).json()), !0), D = ji("urd-draft-site", () => V(h), S), (D.data.schemaVersion ?? 1) > 3 && (console.warn(`Urd: site-utkastet har schemaVersion ${D.data.schemaVersion} (motoren har 3) og forkastes`), D.replace(Be(V(h)))), D.replace(Va(D.data)), D.save(), Te(), I(ee, {
			snap: !0,
			...V(k).grid
		}, !0), await Kr(new URLSearchParams(location.search).get("page") ?? V(k).pages[0].id), await Io(), await io(), await Qa(), await xr(), V(T) && wr(), V(k).site.setup === !0 && !localStorage.getItem("urd-setup-done") && (I($e, V(k).site.title, !0), I(et, V(k).theme.tokens.color.accent, !0), I(tt, V(k).theme.tokens.color.bg, !0), I(Qe, !0));
	}
	let qe = /* @__PURE__ */ F(null);
	function Je({ title: e, lines: t = [], okLabel: n = Z("confirm.ok"), cancelLabel: r = Z("confirm.cancel") }) {
		return new Promise((i) => {
			I(qe, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function Ye({ title: e, lines: t = [], value: n = "", placeholder: r = "", okLabel: i = Z("confirm.ok"), cancelLabel: a = Z("confirm.cancel") }) {
		return new Promise((o) => {
			I(qe, {
				title: e,
				lines: t,
				okLabel: i,
				cancelLabel: a,
				resolve: o,
				prompt: !0,
				value: n,
				placeholder: r
			}, !0);
		});
	}
	function Xe(e) {
		V(qe)?.resolve(V(qe).prompt ? e ? V(qe).value : null : e), I(qe, null);
	}
	let Ze = !1;
	bn(() => {
		if (!V(qe)) return;
		let e = (e) => {
			e.key === "Escape" && (e.stopPropagation(), Xe(!1));
		};
		return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
	});
	let Qe = /* @__PURE__ */ F(!1), $e = /* @__PURE__ */ F(""), et = /* @__PURE__ */ F("#7c5cff"), tt = /* @__PURE__ */ F("#0b0e14");
	function nt() {
		localStorage.setItem("urd-setup-done", "1"), I(Qe, !1);
	}
	function rt() {
		let e = V($e).trim();
		e && (fi("setup", () => {
			V(k).site.title = e, V(k).nav.logo = {
				type: "text",
				value: e
			}, V(k).theme.tokens.color.accent = V(et), V(k).theme.tokens.color.bg = V(tt), delete V(k).site.setup;
		}), nt(), x(Z("status.setupDone"), "ok"));
	}
	let it = /* @__PURE__ */ F(null), at = [
		[
			"pages",
			"blocks",
			"properties",
			"grid"
		],
		[
			"site",
			"theme",
			"nav",
			"footer",
			"collections",
			"plugins"
		],
		["history", "update"]
	], ct = [
		"rail.thisPage",
		"rail.site",
		"rail.system"
	], lt = Object.fromEntries(at.flat().map((e) => [e, Z(`panel.${e}`)])), ut = {
		pages: ["hint.pages.drafts"],
		blocks: ["hint.blocks.intro"],
		grid: ["hint.grid.intro", "hint.grid.section"],
		collections: ["hint.collections.intro"],
		plugins: ["hint.plugins.intro"],
		history: ["hint.history.intro"]
	}, dt = [
		["se", "Davvisámegiella"],
		["en-GB", "English (UK)"],
		["nb", "Norsk bokmål"],
		["nn", "Norsk nynorsk"],
		["tr", "Türkçe"]
	], ft = (e) => [...e].sort((e, t) => e[1].localeCompare(t[1]));
	function pt(e, t) {
		let n = [];
		for (let r of e) for (let e of wo[r]?.languages ?? []) e?.[t] === !0 && (typeof e.code != "string" || typeof e.name != "string" || !e.name || dt.some(([t]) => t === e.code) || n.some(([t]) => t === e.code) || n.push([e.code, e.name]));
		return n;
	}
	function mt() {
		let e = ft([...dt, ...pt(V(ko), "admin")]);
		return gt === "auto" || e.some(([e]) => e === gt) ? e : [[gt, gt], ...e];
	}
	let ht = () => pt(V(Co)?.enabled ?? [], "site"), gt = localStorage.getItem("urd-admin-lang") ?? "auto";
	function _t(e) {
		e !== gt && (e === "auto" ? localStorage.removeItem("urd-admin-lang") : localStorage.setItem("urd-admin-lang", e), location.reload());
	}
	function vt(e) {
		I(it, V(it) === e ? null : e, !0), V(it) === "history" && kr(), V(it) === "update" && !V(Ir) && zr();
	}
	let M = /* @__PURE__ */ F(null);
	function yt(e, t) {
		let n = E?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function bt() {
		if (!V(M)) return;
		let { block: e } = yt(V(M).sectionId, V(M).blockId);
		if (!e) {
			I(M, null);
			return;
		}
		I(M, {
			sectionId: V(M).sectionId,
			blockId: V(M).blockId,
			type: e.type,
			decor: !!e.decor,
			props: JSON.parse(JSON.stringify(e.props)),
			frame: { ...e.frames.desktop },
			animation: e.animation ? JSON.parse(JSON.stringify(e.animation)) : null,
			hover: e.hover ? JSON.parse(JSON.stringify(e.hover)) : null,
			sticky: e.sticky ? JSON.parse(JSON.stringify(e.sticky)) : null
		}, !0);
	}
	function xt(e) {
		if (I(St, null), !e.blockId) {
			I(M, null);
			return;
		}
		I(M, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), e.sectionId && I(Xt, e.sectionId, !0), bt();
	}
	let St = /* @__PURE__ */ F(null), Ct = [
		["top-left", "opt.dock.topLeft"],
		["top-center", "opt.dock.topCenter"],
		["top-right", "opt.dock.topRight"],
		["middle-left", "opt.dock.middleLeft"],
		["middle-center", "opt.dock.middleCenter"],
		["middle-right", "opt.dock.middleRight"],
		["bottom-left", "opt.dock.bottomLeft"],
		["bottom-center", "opt.dock.bottomCenter"],
		["bottom-right", "opt.dock.bottomRight"]
	];
	function wt() {
		let e = E?.data.sections ?? [], t = e.findIndex((e) => e.id === V(M)?.sectionId);
		return [["", Z("opt.sticky.ownSection")], ...e.slice(t + 1).map((e, n) => [e.id, Z("opt.sticky.atSection", { n: t + 2 + n })])];
	}
	function Tt(e) {
		if (xt(e), !V(M)) return;
		let t = V(w)?.getBoundingClientRect();
		if (!t) return;
		let n = t.left + V(he) * e.rect.right + 12;
		n + 300 > window.innerWidth - 8 && (n = Math.max(8, t.left + V(he) * e.rect.left - 300 - 12));
		let r = window.innerHeight - Math.min(window.innerHeight * .7, 560) - 8, i = Math.min(Math.max(8, t.top + V(he) * e.rect.top), Math.max(8, r));
		I(St, {
			left: n,
			top: i
		}, !0);
	}
	function Et(e, t) {
		let { section: n, block: r } = yt(V(M)?.sectionId, V(M)?.blockId);
		r && (Pe(e), t(r, n), we(n, "blokk-endret"), E.save(), A(), O?.sendSection(V(g), n), bt());
	}
	function P(e, t) {
		Et(`edit:${V(M).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function Dt(e, t) {
		Et(`edit:${V(M).blockId}:${e}`, (e) => {
			Object.assign(e.props, t);
		});
	}
	let Ot = tn({}), kt = tn({}), At = /* @__PURE__ */ F(!1), jt = /* @__PURE__ */ F("content"), Mt = (e, t) => (Number.isFinite(t) || (t = e.min ?? 0), e.min != null && (t = Math.max(e.min, t)), e.max != null && (t = Math.min(e.max, t)), t);
	async function Nt(e) {
		let t = V(M).blockId, n = `${t}:${e.key}`, r = (Ot[n] ?? V(M).props[e.key] ?? "").trim();
		kt[n] = null;
		let i = r.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
		if (!r || i || /^https?:\/\//i.test(r)) {
			Dt(e.key, {
				[e.key]: r,
				lat: i ? Number(i[1]) : null,
				lon: i ? Number(i[2]) : null
			});
			return;
		}
		I(At, !0), kt[n] = {
			text: Z("props.place.searching"),
			err: !1
		};
		try {
			let i = await fetch(`/api/geocode?q=${encodeURIComponent(r)}`), a = await i.json().catch(() => null);
			if (V(M)?.blockId !== t) return;
			i.ok && Number.isFinite(a?.lat) ? (Dt(e.key, {
				[e.key]: r,
				lat: a.lat,
				lon: a.lon
			}), kt[n] = null) : kt[n] = {
				text: Ei(a) ?? Z("props.place.notFound"),
				err: !0
			};
		} catch {
			kt[n] = {
				text: Z("props.place.failed"),
				err: !0
			};
		} finally {
			I(At, !1);
		}
	}
	function Pt(e, t) {
		Number.isFinite(t) && Et(`edit:frame-${V(M).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function Ft(e) {
		Et(`edit:${V(M).blockId}:boxStyle`, (t) => {
			let n = {
				...t.props.boxStyle ?? {},
				...e
			};
			for (let e of Object.keys(n)) n[e] ?? delete n[e];
			Object.keys(n).length ? t.props.boxStyle = n : delete t.props.boxStyle;
		});
	}
	function It(e, t) {
		Et(`edit:${V(M).blockId}:faq${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function Lt() {
		Et("faq-item", (e) => {
			(e.props.items ??= []).push({
				q: Z("seed.faq.newQ"),
				a: Z("seed.faq.answer")
			});
		});
	}
	function Rt(e) {
		Et("faq-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function zt(e, t) {
		let n = e + t;
		Et("faq-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function Bt(e, t) {
		Et(`edit:${V(M).blockId}:tl${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function Vt() {
		Et("tl-item", (e) => {
			(e.props.items ??= []).push({
				year: "",
				title: Z("seed.tidslinje.newTitle"),
				text: ""
			});
		});
	}
	function Ht(e) {
		Et("tl-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function Ut(e, t) {
		let n = e + t;
		Et("tl-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function Wt(e) {
		Et("decor", (t) => {
			t.decor = e;
		});
	}
	async function Gt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await zn(t);
			Et(`edit:${V(M).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || ea(t.name).replaceAll("-", " ");
			});
		} catch {
			x(Z("status.imageReadError"), "error");
		}
	}
	async function Kt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await zn(t);
			Et(`edit:${V(M).blockId}`, (t) => {
				t.props.image = e.dataUrl;
			});
		} catch {
			x(Z("status.imageReadError"), "error");
		}
	}
	let qt = {
		text: Z("blocks.text"),
		button: Z("blocks.button"),
		image: Z("blocks.image"),
		shape: Z("blocks.shape"),
		video: Z("blocks.video"),
		icon: Z("blocks.icon"),
		galleri: Z("blocks.galleri"),
		faq: Z("blocks.faq")
	}, Jt = [
		["line", Z("shape.line")],
		["arrow", Z("shape.arrow")],
		["circle", Z("shape.circle")],
		["rect", Z("shape.rect")],
		["triangle", Z("shape.triangle")]
	], Yt = [
		["accent", Z("color.accent")],
		["text", Z("color.text")],
		["surface", Z("color.surface")],
		["bg", Z("color.bg")]
	], Xt = /* @__PURE__ */ F(null), Zt = /* @__PURE__ */ F(null), Qt = /* @__PURE__ */ F(""), $t = /* @__PURE__ */ F(tn([])), en = /* @__PURE__ */ F(null), rn = /* @__PURE__ */ F(null), an = /* @__PURE__ */ F("");
	function on(e) {
		I(Zt, e?.grid ? { ...e.grid } : null, !0), I(Qt, e?.size?.minHeight ?? "", !0), I($t, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), I(en, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0), I(rn, e?.hover ? JSON.parse(JSON.stringify(e.hover)) : null, !0), I(an, e?.theme ?? "", !0);
	}
	let sn = /* @__PURE__ */ F(null), cn = tn({});
	function ln() {
		try {
			let e = ((V(w)?.contentDocument)?.querySelector(`.urd-section[data-section-id="${V(Xt)}"]`))?.getBoundingClientRect();
			I(sn, e && e.width ? {
				w: e.width,
				h: e.height
			} : null, !0);
		} catch {
			I(sn, null);
		}
	}
	bn(() => {
		V(Xt), V($t), requestAnimationFrame(() => requestAnimationFrame(ln));
	}), bn(() => {
		let e = V(w);
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(() => ln());
		return t.observe(e), () => t.disconnect();
	}), bn(() => {
		for (let e of V($t)) {
			let t = e?.props?.src;
			if (e?.type === "image" && t && !cn[t]) {
				let e = new Image();
				e.onload = () => {
					cn[t] = {
						w: e.naturalWidth,
						h: e.naturalHeight
					};
				}, e.src = t;
			}
		}
	});
	function un(e) {
		pn("section-theme", (t) => {
			e ? t.theme = e : delete t.theme;
		});
	}
	function dn(e) {
		let t = V(k).theme.scheme === "dark" ? {
			...V(k).theme.tokens.color,
			...V(k).theme.alt?.tokens?.color ?? {}
		} : V(k).theme.tokens.color, n = (e) => e.replaceAll("var(--urd-base-bg)", t.bg).replaceAll("var(--urd-base-surface)", t.surface).replaceAll("var(--urd-base-text)", t.text).replaceAll("var(--urd-base-accent)", t.accent).replaceAll("var(--urd-base-accent-text)", t["accent-text"]), r = es(e);
		return {
			bg: r["--urd-color-bg"] ? n(r["--urd-color-bg"]) : t.bg,
			surface: r["--urd-color-surface"] ? n(r["--urd-color-surface"]) : t.surface,
			text: r["--urd-color-text"] ? n(r["--urd-color-text"]) : t.text,
			accent: r["--urd-color-accent"] ? n(r["--urd-color-accent"]) : t.accent
		};
	}
	function fn(e) {
		I(Xt, e.sectionId, !0), on(E?.data.sections.find((t) => t.id === e.sectionId));
	}
	function pn(e, t) {
		let n = E.data.sections.find((e) => e.id === V(Xt));
		n && (Pe(e), t(n), E.save(), A(), O?.sendSection(V(g), n), on(n));
	}
	let mn = /* @__PURE__ */ F("color");
	function hn(e, t) {
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
	function gn(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers.splice(t, 1), e.background.layers.length || delete e.background;
		});
	}
	function _n(e, t, n) {
		let r = t + n;
		e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers;
			r < 0 || r >= n.length || ([n[t], n[r]] = [n[r], n[t]]);
		});
	}
	function vn(e, t, n, r) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e.background.layers[t].props[n] = r;
		});
	}
	function yn(e, t, n, r = "xy") {
		e.preventDefault();
		let i = e.currentTarget;
		i.setPointerCapture?.(e.pointerId);
		let a = (e) => {
			let a = i.getBoundingClientRect();
			if (r.includes("x")) {
				let r = Math.min(1, Math.max(0, (e.clientX - a.left) / a.width));
				vn(t, n, "x", Math.round(r * 100) / 100);
			}
			if (r.includes("y")) {
				let r = Math.min(1, Math.max(0, (e.clientY - a.top) / a.height));
				vn(t, n, "y", Math.round(r * 100) / 100);
			}
		};
		a(e);
		let o = () => {
			i.removeEventListener("pointermove", a), i.removeEventListener("pointerup", o), i.removeEventListener("pointercancel", o);
		};
		i.addEventListener("pointermove", a), i.addEventListener("pointerup", o), i.addEventListener("pointercancel", o);
	}
	let xn = (e) => Math.min(4, Math.max(.1, e));
	function Sn(e, t, n, r) {
		vn(e, t, "size", xn(Math.round((n + r) * 100) / 100));
	}
	function Cn(e, t, n) {
		let r = Number(n);
		Number.isFinite(r) && vn(e, t, "size", xn(r / 100));
	}
	function wn(e, t, n, r) {
		let i = cn[n.props.src];
		if (!i?.w || !i?.h || !V(sn)?.w || !V(sn)?.h) return;
		let a = V(sn).h * i.w / (V(sn).w * i.h), o = r === "cover" ? Math.max(1, a) : Math.min(1, a);
		(n.props.fit === "flislegg" || n.props.fit === "repeat") && vn(e, t, "fit", "vanlig"), vn(e, t, "size", xn(Math.round(o * 100) / 100));
	}
	function Tn(e) {
		return e.props;
	}
	function En(e, t, n, r) {
		e.mutate(n, (e) => {
			r(e.background.layers[t].props);
		});
	}
	function Dn(e, t, n, r) {
		En(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e[n] = r;
		});
	}
	let On = {
		linear: [
			["none", Z("common.none")],
			["pan", Z("opt.gradAnim.pan")],
			["pan-loop", Z("opt.gradAnim.panLoop")],
			["rotate", Z("opt.gradAnim.rotate")]
		],
		radial: [
			["none", Z("common.none")],
			["pulse", Z("opt.gradAnim.pulse")],
			["orbit", Z("opt.gradAnim.orbit")]
		]
	};
	function kn(e, t, n) {
		En(e, t, e.keyPrefix, (e) => {
			e.kind = n, On[n].some(([t]) => t === (e.animation ?? "none")) || (e.animation = "none");
		});
	}
	function An(e, t, n, r) {
		En(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-stop${n}`, (e) => {
			e.stops[n] = {
				...e.stops[n],
				...r
			};
		});
	}
	function jn(e, t) {
		En(e, t, e.keyPrefix, (e) => {
			let t = Math.round(e.stops.reduce((e, t) => e + (Number(t.share) || 0), 0) / e.stops.length) || 50;
			e.stops.push({
				color: e.stops[e.stops.length - 1]?.color ?? "#ffffff",
				share: t
			});
		});
	}
	function Mn(e, t, n) {
		En(e, t, e.keyPrefix, (e) => {
			e.stops.length > 2 && e.stops.splice(n, 1);
		});
	}
	function Nn(e, t, n, r) {
		En(e, t, e.keyPrefix, (e) => {
			let [t] = e.stops.splice(n, 1);
			e.stops.splice(r, 0, t);
		});
	}
	let Pn = /* @__PURE__ */ F(null);
	function Fn(e, t, n, r) {
		if (t.button !== 0) return;
		t.preventDefault();
		let i = t.currentTarget.closest(".bg-layer"), a = t.currentTarget.closest(".grad-stop");
		I(Pn, {
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
			I(Pn, {
				...V(Pn),
				insert: n
			}, !0);
		}, u = () => {
			window.removeEventListener("pointermove", l), window.removeEventListener("pointerup", u), c.remove();
			let t = V(Pn);
			if (I(Pn, null), !t) return;
			let n = t.insert > t.from ? t.insert - 1 : t.insert;
			n !== t.from && Nn(e, t.layer, t.from, n);
		};
		window.addEventListener("pointermove", l), window.addEventListener("pointerup", u);
	}
	function In(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].type !== n && (e.background.layers[t] = {
				type: n,
				version: s[n].version ?? 1,
				props: s[n].defaults()
			});
		});
	}
	async function Ln(e, t) {
		try {
			let n = new Image();
			await new Promise((t, r) => {
				n.onload = t, n.onerror = r, n.src = e;
			});
			let r = Math.max(1, Math.round(320 * t[3] / t[2])), i = document.createElement("canvas");
			i.width = 320, i.height = r;
			let a = i.getContext("2d");
			a.drawImage(n, 0, 0, 320, r);
			let o = a.getImageData(0, 0, 320, r).data, s = 320, c = r, l = -1, u = -1;
			for (let e = 0; e < r; e++) for (let t = 0; t < 320; t++) o[(e * 320 + t) * 4 + 3] > 8 && (t < s && (s = t), t > l && (l = t), e < c && (c = e), e > u && (u = e));
			if (l < s) return null;
			let d = t[2] / 320, f = t[3] / r;
			return {
				x: t[0] + s * d,
				y: t[1] + c * f,
				width: (l - s + 1) * d,
				height: (u - c + 1) * f
			};
		} catch {
			return null;
		}
	}
	async function Rn(e) {
		let t = await e.text(), n = Xi(t), r = Qi(t);
		if (!r) return n;
		let i = await Ln(n.dataUrl, r);
		if (!i) return n;
		let a = Zi(t, i);
		if (a === t) return n;
		try {
			return Xi(a);
		} catch {
			return n;
		}
	}
	async function zn(e) {
		return e.type === "image/svg+xml" || /\.svg$/i.test(e.name || "") ? Rn(e) : qi(e);
	}
	async function Bn(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			vn(e, t, "src", (await zn(r)).dataUrl);
		} catch {
			x(Z("status.imageReadError"), "error");
		}
	}
	async function Vn(e, t, n) {
		let r = [...n.target.files ?? []];
		if (n.target.value = "", !r.length) return;
		x(Z("status.compressingImages"));
		let { images: i, failed: a, big: o } = await of(r);
		i.length && e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers[t].props;
			n.images ??= [], n.images.push(...i.map(({ src: e }) => ({
				src: e,
				x: .5,
				y: .5
			})));
		}), sf(i.length, a, o);
	}
	function Hn(e, t, n, r) {
		e.mutate(e.keyPrefix, (e) => {
			let i = e.background.layers[t].props.images, a = n + r;
			a < 0 || a >= i.length || ([i[n], i[a]] = [i[a], i[n]]);
		});
	}
	function Un(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].props.images.splice(n, 1);
		});
	}
	function Wn(e, t, n, r, i) {
		e.mutate(`edit:${e.keyPrefix}g-${e.keyId}-${t}-${n}-${r}`, (e) => {
			e.background.layers[t].props.images[n][r] = i;
		});
	}
	function Gn(e, t) {
		fi(e, () => {
			V(k).nav.style ??= {}, t(V(k).nav.style);
		});
	}
	let Kn = /* @__PURE__ */ N(() => ({
		mutate: pn,
		keyPrefix: "bg",
		keyId: V(Xt)
	})), qn = {
		mutate: Gn,
		keyPrefix: "navbg",
		keyId: "nav"
	}, Jn = {
		mutate: Yo,
		keyPrefix: "footerbg",
		keyId: "footer"
	}, Yn = () => Object.entries(V(k)?.theme.tokens.color ?? {}).map(([e, t]) => [e, t]), Xn = [
		[
			"bg",
			Z("palette.bg"),
			Z("palette.bgShort")
		],
		[
			"surface",
			Z("palette.surface"),
			Z("palette.surfaceShort")
		],
		[
			"text",
			Z("palette.text"),
			Z("palette.textShort")
		],
		[
			"accent",
			Z("palette.accent"),
			Z("palette.accentShort")
		],
		[
			"accent-text",
			Z("palette.accentText"),
			Z("palette.accentTextShort")
		]
	], Zn = /* @__PURE__ */ N(() => !!V(k)?.theme.alt), Qn = /* @__PURE__ */ N(() => V(k)?.theme.alt?.auto === !0), $n = /* @__PURE__ */ N(() => V(k)?.theme.scheme === "dark" ? "dark" : "light"), er = /* @__PURE__ */ N(() => V(k)?.theme.tokens.color ?? {}), tr = /* @__PURE__ */ N(() => ({
		...V(k)?.theme.tokens.color ?? {},
		...V(k)?.theme.alt?.tokens?.color ?? {}
	}));
	function nr(e) {
		return {
			type: e,
			version: Xs[e].version,
			props: Xs[e].defaults()
		};
	}
	let rr = (e) => !!(e && Xs[e.type]?.entrance), ir = [["", Z("common.none")], ...Object.entries(Xs).filter(([, e]) => e.entrance).map(([e, t]) => [e, t.labelKey ? Z(t.labelKey) : t.label])], ar = ir.filter(([e]) => !Xs[e]?.group), or = [["", Z("common.none")], ...Object.entries(Xs).filter(([, e]) => !e.entrance).map(([e, t]) => [e, t.labelKey ? Z(t.labelKey) : t.label])];
	function sr(e) {
		e.animation && !rr(e.animation) && (e.hover ??= e.animation, e.animation = null);
	}
	function cr(e) {
		Et(`edit:anim-${V(M).blockId}`, (t) => {
			sr(t), t.animation = e ? nr(e) : null;
		}), V(M) && O?.sendDemoAnim(V(M).sectionId, V(M).blockId);
	}
	function lr(e) {
		Et(`edit:hover-${V(M).blockId}`, (t) => {
			sr(t), t.hover = e ? nr(e) : null;
		});
	}
	function ur(e, t) {
		Number.isFinite(t) && (Et(`edit:anim-${V(M).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), V(M) && O?.sendDemoAnim(V(M).sectionId, V(M).blockId));
	}
	function dr(e) {
		pn("section-anim", (t) => {
			sr(t), t.animation = e ? nr(e) : null;
		}), O?.sendDemoAnim(V(Xt));
	}
	function fr(e) {
		pn("section-hover", (t) => {
			sr(t), t.hover = e ? nr(e) : null;
		});
	}
	function pr(e, t) {
		Number.isFinite(t) && (pn("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), O?.sendDemoAnim(V(Xt)));
	}
	function mr(e, t) {
		pn("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), O?.sendDemoAnim(V(Xt));
	}
	function hr(e) {
		let t = E.data.sections.find((e) => e.id === V(Xt));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		Pe("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, I(Qt, r, !0), E.save(), A(), O?.sendSection(V(g), t);
	}
	function gr() {
		return E.data.sections.find((e) => e.id === V(Xt)) ?? E.data.sections[0];
	}
	function _r(e) {
		let t = E.data.sections.find((e) => e.id === V(Xt));
		t && (Pe("grid:section"), t.grid = e ? { ...D.data.grid } : null, I(Zt, t.grid ? { ...t.grid } : null, !0), E.save(), A(), O?.sendSection(V(g), t), V(ci) && O?.sendShowGrid(!0));
	}
	function vr(e, t) {
		let n = E.data.sections.find((e) => e.id === V(Xt));
		n?.grid && (Pe("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, I(Zt, { ...n.grid }, !0), E.save(), A(), O?.sendSection(V(g), n), V(ci) && O?.sendShowGrid(!0));
	}
	function yr(e, t) {
		Pe("grid:site"), I(ee, {
			...V(ee),
			[e]: t
		}, !0), D.data.grid = {
			...D.data.grid,
			[e]: t
		}, D.save(), A(), Ee(), V(ci) && O?.sendShowGrid(!0);
	}
	async function xr() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? I(T, await e.json(), !0) : e.status !== 503 && I(T, null);
		} catch {
			I(T, null);
		}
	}
	let Cr = null;
	async function wr() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (Cr = (await e.json()).head ?? null);
		} catch {}
	}
	async function Tr(e) {
		if (!Cr) return await wr(), {
			ok: await Je({
				title: Z("confirm.conflictUnknown.title"),
				lines: [Z("confirm.conflictUnknown.body"), Z("confirm.conflictUnknown.warning")],
				okLabel: Z("confirm.publishAnyway"),
				cancelLabel: Z("confirm.cancel")
			}),
			head: Cr
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${Cr}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === Cr) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? [Z("confirm.conflict.truncated")] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await Je({
				title: Z("confirm.conflict.title"),
				lines: [
					Z("confirm.conflict.intro"),
					...i.map((e) => `• ${e}`),
					Z("confirm.conflict.warning")
				],
				okLabel: Z("confirm.publishAnyway"),
				cancelLabel: Z("confirm.cancel")
			}),
			head: n
		};
	}
	let Er = /* @__PURE__ */ F(null), Dr = /* @__PURE__ */ F(""), Or = /* @__PURE__ */ F(!1);
	async function kr() {
		I(Dr, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? I(Er, (await e.json()).commits, !0) : e.status === 401 ? (I(Er, [], !0), I(Dr, Z("status.historyLoginRequired"), !0)) : (I(Er, [], !0), I(Dr, Ei(await e.json().catch(() => null)) ?? Z("status.historyFetchFailed"), !0));
		} catch {
			I(Er, [], !0), I(Dr, Z("status.historyUnavailable"), !0);
		}
	}
	let U = (() => {
		let e = {
			dateStyle: "short",
			timeStyle: "short"
		};
		try {
			return new Intl.DateTimeFormat(Di(), e);
		} catch {
			return new Intl.DateTimeFormat(void 0, e);
		}
	})(), Ar = !1;
	async function Mr() {
		let e = V(Er)?.[0];
		if (!(!e || V(Or)) && await Je({
			title: Z("confirm.revert.title"),
			lines: [`«${e.message}»`, Z("confirm.revert.body")],
			okLabel: Z("confirm.revert.ok"),
			cancelLabel: Z("confirm.cancel")
		})) {
			I(Or, !0), x(Z("status.reverting"));
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? Cr = e : wr(), Ar = !0, x(Z("status.revertDone"), "ok"), Nr();
				} else t.status === 409 ? x(Z("status.revertConflict"), "error") : x(Ei(await t.json().catch(() => null)) ?? Z("status.revertFailed"), "error");
			} catch {
				x(Z("status.publishLayerUnreachable"), "error");
			}
			I(Or, !1), kr();
		}
	}
	async function Nr() {
		let e = ["/content/site.json", ...V(k).pages.map((e) => `/${e.file}`)], t = async () => {
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
				x(Z("status.revertDeployed"), "ok");
				for (let e of Object.keys(localStorage).filter((e) => e.startsWith("urd-draft-"))) localStorage.removeItem(e);
				await new Promise((e) => setTimeout(e, 800)), location.reload();
				return;
			}
		}
		x(Z("status.revertDeployTimeout"), "error");
	}
	let Pr = /* @__PURE__ */ F(null), Fr = /* @__PURE__ */ F(null), Ir = /* @__PURE__ */ F(!1), Rr = /* @__PURE__ */ F(tn(/* @__PURE__ */ new Set()));
	async function zr() {
		I(Ir, !0), I(Fr, null), I(Pr, null);
		try {
			let e = await fetch("/api/github/update"), t = await e.json().catch(() => null);
			e.ok ? (I(Pr, t, !0), I(Rr, /* @__PURE__ */ new Set(), !0)) : I(Fr, Ei(t) ?? Z("update.checkFailed"), !0);
		} catch {
			I(Fr, Z("status.publishLayerUnreachable"), !0);
		}
		I(Ir, !1);
	}
	function Br(e) {
		let t = new Set(V(Rr));
		t.has(e) ? t.delete(e) : t.add(e), I(Rr, t, !0);
	}
	async function Hr() {
		if (!V(Pr) || V(Pr).upToDate || V(Ir)) return;
		let e = [...V(Rr)], t = V(Pr).changes.filter((e) => !V(Rr).has(e.path)), n = t.filter((e) => e.atom && e.conflict);
		if (await Je({
			title: Z("confirm.update.title"),
			lines: [Z("confirm.update.body", {
				target: V(Pr).target,
				writes: t.filter((e) => e.action === "write").length,
				deletes: t.filter((e) => e.action === "delete").length
			}), ...n.length > 0 ? [Z("confirm.update.warnEdited", { paths: n.map((e) => e.path).join(", ") })] : []],
			okLabel: Z("confirm.update.ok"),
			cancelLabel: Z("confirm.cancel")
		})) {
			I(Ir, !0), x(Z("update.running", { target: V(Pr).target }));
			try {
				let t = await fetch("/api/github/update", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						to: V(Pr).target,
						expect: V(Pr).head,
						skip: e
					})
				}), n = await t.json().catch(() => null);
				t.ok ? (x(Z("update.committed", { target: V(Pr).target }), "ok"), await Ur(V(Pr).target.replace(/^v/, ""))) : t.status === 409 ? (x(Ei(n) ?? Z("update.checkFailed"), "error"), await zr()) : x(Ei(n) ?? Z("update.failed"), "error");
			} catch {
				x(Z("status.publishLayerUnreachable"), "error");
			}
			I(Ir, !1);
		}
	}
	async function Ur(e) {
		for (let t = 0; t < 18; t++) {
			await new Promise((e) => setTimeout(e, 1e4));
			try {
				if ((await (await fetch("/urd.json", { cache: "no-store" })).json())?.engine === e) {
					x(Z("update.deployed"), "ok"), await new Promise((e) => setTimeout(e, 800)), location.reload();
					return;
				}
			} catch {}
		}
		x(Z("update.deployTimeout"), "error");
	}
	let Wr = null;
	function Gr(e) {
		return {
			schemaVersion: 1,
			meta: {
				id: e.id,
				title: e.title
			},
			sections: [{
				id: Ja("sec"),
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
	async function Kr(e, { keepHistory: t = !1 } = {}) {
		I(g, e, !0), Wr = (async () => {
			let n = Oe(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = Ha(await e.json(), D.data));
			} catch {}
			r ? De.delete(e) : r = Gr(n), E = ji(`urd-draft-${e}`, () => r, S), (E.data.schemaVersion ?? 1) > 1 && (console.warn(`Urd: utkastet for '${e}' har schemaVersion ${E.data.schemaVersion} (motoren har 1) og forkastes`), E.replace(structuredClone(r))), E.replace(Ha(E.data, D.data)), E.save(), t || (je = null), I(Xt, null), I(Zt, null), A(), Se(), I(v, "");
		})(), await Wr;
	}
	function qr() {
		O?.destroy(), V(w)?.contentDocument?.addEventListener("pointerdown", () => {
			V(St) && I(St, null);
		}, !0), O = Sa(V(w), {
			onEdit: Nd,
			onMove: Pd,
			onGrow: Fd,
			onDelete: Gd,
			onAddSection: Bd,
			onMoveSection: Vd,
			onDeleteSection: Hd,
			onSectionSize: Ud,
			onUndo: (e) => e.redo ? Ve() : ze(),
			onSelectSection: fn,
			onSelectBlock: xt,
			onBlockMenu: Tt,
			onReady: Jr,
			onNavigate: di,
			onAddBlock: (e) => Yd(e.sectionId, e.block),
			onAddBlocks: (e) => Xd(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: rf,
			onMoveBlockSection: Wd,
			onMobileManual: Id,
			onMobileAuto: Ld,
			onReviewDone: Rd,
			onBlockFlag: zd,
			onCollectionEdit: co,
			onSaveTemplate: eo,
			onStickyGroup: to,
			onDeleteTemplate: ro,
			onApplyLayout: Ce,
			onPluginBlocks: (e) => {
				I(Qd, e.blocks ?? [], !0);
			},
			onNavWidth: (e) => fi("edit:nav-width", () => {
				V(k).nav.style ??= {}, V(k).nav.style.width = e.width;
			})
		});
	}
	async function Jr() {
		await Wr, await So, O?.sendPlugins(Be(V(Co))?.enabled ?? []), O?.sendViewport(V(ae)), O?.sendZoom(V(he)), oo(), $a(), D.hasDraft() && Ee();
		let e = !V(h).pages.some((e) => e.id === V(g));
		(E.hasDraft() || e) && O?.sendPage(V(g), E.data), V(te) || O?.sendChrome(!1), V(ci) && O?.sendShowGrid(!0), V(Yr) && O?.sendShowGuides(!0), f();
	}
	let Yr = /* @__PURE__ */ F(localStorage.getItem("urd-guides") === "1"), Xr = /* @__PURE__ */ F(!1), Zr = /* @__PURE__ */ F(tn(localStorage.getItem("urd-layout-picker") === "menu" ? "menu" : "strip"));
	function $r(e) {
		I(Zr, e === "menu" ? "menu" : "strip", !0), V(Zr) === "menu" ? localStorage.setItem("urd-layout-picker", "menu") : localStorage.removeItem("urd-layout-picker");
	}
	let ti = /* @__PURE__ */ F(null);
	bn(() => {
		if (!V(Xr)) return;
		let e = (e) => {
			V(ti)?.contains(e.target) || I(Xr, !1);
		}, t = (e) => {
			e.key === "Escape" && I(Xr, !1);
		}, n = () => {
			I(Xr, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let ni = {
		view: 1079,
		device: 999,
		zoom: 919
	}, ri = /* @__PURE__ */ F(null), ii = /* @__PURE__ */ F(null), oi = tn({
		view: !1,
		device: !1,
		zoom: !1
	});
	bn(() => {
		let e = Object.entries(ni).map(([e, t]) => {
			let n = window.matchMedia(`(max-width: ${t}px)`), r = () => {
				oi[e] = n.matches;
			};
			return r(), n.addEventListener("change", r), () => n.removeEventListener("change", r);
		});
		return () => e.forEach((e) => e());
	}), bn(() => {
		V(ri) && !oi[V(ri)] && I(ri, null);
	}), bn(() => {
		if (!V(ri)) return;
		let e = (e) => {
			V(ii)?.contains(e.target) || I(ri, null);
		}, t = (e) => {
			e.key === "Escape" && I(ri, null);
		}, n = () => {
			I(ri, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	function si() {
		I(Yr, !V(Yr)), localStorage.setItem("urd-guides", V(Yr) ? "1" : "0"), O?.sendShowGuides(V(Yr));
	}
	let ci = /* @__PURE__ */ F(localStorage.getItem("urd-grid-overlay") === "1");
	function ui() {
		I(ci, !V(ci)), localStorage.setItem("urd-grid-overlay", V(ci) ? "1" : "0"), O?.sendShowGrid(V(ci));
	}
	function di(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = V(k).pages.find((e) => e.path === t);
		n && n.id !== V(g) && Kr(n.id);
	}
	function fi(e, t) {
		Pe(e), t(), D.save(), A(), Ee();
	}
	let mi = /* @__PURE__ */ F(""), hi = /* @__PURE__ */ F(null), gi = Object.fromEntries(Ho.map((e) => [e.id, Bo(Uo(e.id, {
		pageId: "forhandsvisning",
		title: ""
	}))])), _i = /* @__PURE__ */ F(null);
	bn(() => {
		if (!V(_i)) return;
		let e = (e) => {
			e.target.closest?.(".page-menu-wrap") || I(_i, null);
		}, t = (e) => {
			e.key === "Escape" && I(_i, null);
		}, n = () => {
			I(_i, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let vi = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions",
		"readme"
	];
	function yi(e, t = null) {
		return e ? vi.includes(e) ? Z("error.reservedName", { slug: e }) : V(k).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? Z("error.pageExists") : null : Z("error.pageNeedsName");
	}
	function bi() {
		let e = V(mi).trim(), t = ea(e), n = yi(t);
		if (n) {
			x(n, "error");
			return;
		}
		let r = V(hi) && !V(hi).startsWith("preset:") ? Ya[V(hi)]?.data?.page : null, i = V(hi)?.startsWith("preset:") ? Uo(V(hi).slice(7), {
			pageId: t,
			title: e
		}) ?? Gr({
			id: t,
			title: e
		}) : r ? yo(Ha(JSON.parse(JSON.stringify(r)), D.data), Ja, {
			id: t,
			title: e
		}) : Gr({
			id: t,
			title: e
		});
		fi("pages", () => {
			V(k).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), V(k).nav.items.push({
				label: e,
				page: t
			});
		}), C(`urd-draft-${t}`, JSON.stringify(i)), A(), I(mi, ""), I(hi, null), Kr(t);
	}
	async function xi(e) {
		I(_i, null), await no("page", e.id === V(g) ? JSON.parse(JSON.stringify(E.data)) : await Ci(e));
	}
	function Si(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		fi("pages", () => {
			e.title = n;
			for (let t of V(k).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === V(g) ? (E.data.meta.title = n, E.save(), A(), O?.sendPage(V(g), E.data)) : wi(e, (e) => {
			e.meta.title = n;
		});
	}
	async function Ci(e) {
		let t = localStorage.getItem(`urd-draft-${e.id}`);
		if (t) try {
			return JSON.parse(t);
		} catch {}
		try {
			let t = await fetch(`/${e.file}`);
			if (t.ok) return Ha(await t.json(), D.data);
		} catch {}
		return Gr(e);
	}
	async function wi(e, t) {
		let n = await Ci(e);
		t(n), C(`urd-draft-${e.id}`, JSON.stringify(n)), A();
	}
	function Ti(e, t) {
		let n = ea(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = yi(n, e.id);
		if (r) {
			x(r, "error");
			return;
		}
		fi("pages", () => {
			e.path = `/${n}`;
		});
	}
	function Oi(e) {
		e.path !== "/" && (fi("pages", () => {
			V(k).pages = V(k).pages.filter((t) => t.id !== e.id), V(k).nav.items = V(k).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of V(k).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			V(k).nav.items = V(k).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === V(g) && Kr(V(k).pages[0].id), x(Z("status.pageRemoved")));
	}
	function ki(e) {
		fi("edit:nav-logo", () => {
			V(k).nav.logo = {
				type: "text",
				value: "",
				...V(k).nav.logo,
				...e
			};
		});
	}
	function Ai(e) {
		fi("nav", () => {
			V(k).nav.logo ??= {
				type: "text",
				value: V(k).site.title
			};
			let t = V(k).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = V(k).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = V(k).site.title), delete t.image), t.type = e;
		});
	}
	async function Mi(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await zn(t);
			fi("nav", () => {
				let t = V(k).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			x(Z("status.imageReadErrorSvg"), "error");
		}
	}
	let Ni = /* @__PURE__ */ F(null);
	async function Pi(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		if (t.type === "image/svg+xml" || /\.svg$/i.test(t.name || "")) {
			try {
				let e = await Rn(t);
				I(Ni, e.dataUrl, !0);
			} catch {
				x(Z("status.imageReadErrorSvg"), "error");
			}
			return;
		}
		let n = new FileReader();
		n.onload = () => {
			I(Ni, String(n.result), !0);
		}, n.onerror = () => x(Z("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function Fi(e) {
		fi("edit:site-icon", () => {
			V(k).site.icon = e;
		}), I(Ni, null);
	}
	function Ii() {
		fi("edit:site-icon", () => {
			delete V(k).site.icon;
		});
	}
	function Li(e) {
		fi("edit:site-title", () => {
			V(k).site.title = e;
		});
	}
	function Ri(e) {
		fi("edit:site-desc", () => {
			V(k).site.description = e;
		});
	}
	let zi = /* @__PURE__ */ N(() => V(k)?.layout?.contentWidth ?? 1440), Bi = /* @__PURE__ */ N(() => V(k)?.layout?.gutter ?? 6), Vi = /* @__PURE__ */ N(() => Na(V(zi))), Hi = /* @__PURE__ */ N(() => Ea.find((e) => e.gutter === V(Bi))?.id ?? null), Wi = /* @__PURE__ */ F(!1), Gi = /* @__PURE__ */ N(() => V(zi) === "full" ? Ta : ka(V(zi))), Ki = /* @__PURE__ */ N(() => Oa.map((e) => ({
		screen: e,
		...Ma(V(zi), V(Bi), e)
	})));
	function Ji(e, t) {
		fi(t, () => {
			V(k).layout = {
				contentWidth: V(zi),
				gutter: V(Bi),
				...e
			};
		});
	}
	let Yi = (e) => Ji({ contentWidth: e === "full" ? "full" : ka(e) }, "edit:site-width"), na = (e) => Ji({ gutter: Aa(e) }, "edit:site-gutter");
	function ra() {
		let e = V(k).site.lang ?? "no";
		return e === "no" ? "nb" : e;
	}
	function ia() {
		let e = ra(), t = ft([...dt, ...ht()]);
		return [...t.some(([t]) => t === e) ? [] : [[e, e]], ...t];
	}
	function aa(e) {
		fi("site", () => {
			V(k).site.lang = e;
		});
	}
	let oa = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	bn(() => {
		if (!V(k)?.site) return;
		let e = V(k).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 51.2V16l25.6 10.4V51.2' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
				return;
			}
			oa.test(e) && (t.href = e);
		}
	});
	function sa(e) {
		fi("nav", () => {
			V(k).nav.layout = e;
		});
	}
	function ca(e, t) {
		fi(`edit:nav-style-${e}`, () => {
			V(k).nav.style ??= {}, t === void 0 ? delete V(k).nav.style[e] : V(k).nav.style[e] = t;
		});
	}
	let fa = /* @__PURE__ */ N(() => V(k)?.nav?.variant === "side-left" || V(k)?.nav?.variant === "side-right"), pa = /* @__PURE__ */ N(() => [
		"floating",
		"floating-square",
		"floating-tab"
	].includes(V(k)?.nav?.variant)), ma = {
		underline: [Z("hoverColor.underline.label"), Z("hoverColor.underline.title")],
		pill: [Z("hoverColor.pill.label"), Z("hoverColor.pill.title")],
		lift: [Z("hoverColor.lift.label"), Z("hoverColor.lift.title")]
	}, ha = /* @__PURE__ */ N(() => ma[V(k)?.nav?.style?.hover] ?? null);
	function ga(e) {
		fi("nav", () => {
			e === "bar" ? delete V(k).nav.variant : V(k).nav.variant = e;
		});
	}
	function _a(e) {
		fi("nav", () => {
			V(k).nav.style ??= {}, e ? V(k).nav.style.glow = !0 : delete V(k).nav.style.glow;
		});
	}
	function va(e) {
		fi("nav", () => {
			V(k).nav.style ??= {}, e ? delete V(k).nav.style.topGap : V(k).nav.style.topGap = !1;
		});
	}
	function ya(e) {
		fi("nav", () => {
			V(k).nav.style ??= {}, e === "standard" ? delete V(k).nav.style.hover : V(k).nav.style.hover = e;
		});
	}
	let ba = null, Ca = {}, Pa = {}, Fa = !1, Ia = /* @__PURE__ */ F(tn([])), La = /* @__PURE__ */ F(tn({})), za = /* @__PURE__ */ F(null), Ba = /* @__PURE__ */ F(""), Ua = /* @__PURE__ */ F("news"), Wa = [
		["news", Z("collectionKind.news")],
		["notices", Z("collectionKind.notices")],
		["publications", Z("collectionKind.publications")],
		["custom", Z("collectionKind.custom")]
	], Ka = null, Ya = {}, $ = {}, Xa = !1, Za = /* @__PURE__ */ F(tn([]));
	async function Qa() {
		let e = {
			version: 1,
			maler: []
		};
		try {
			e = await (await fetch("/content/maler.json")).json();
		} catch {}
		Ka = ji("urd-draft-maler", () => e, S), I(Za, [...Ka.data.maler ?? []], !0);
		for (let e of V(Za)) {
			let t = null;
			try {
				t = await (await fetch(`/content/maler/${e}.json`)).json();
			} catch {}
			$[e] = t, Ya[e] = ji(`urd-draft-mal-${e}`, () => t, S), (Ya[e].data?.schemaVersion ?? 1) > 1 && Ya[e].reset();
		}
		Xa = !0, $a();
	}
	function $a() {
		let e = V(Za).map((e) => Ya[e]?.data ? {
			id: e,
			...JSON.parse(JSON.stringify(Ya[e].data))
		} : null).filter(Boolean).map(({ id: e, mal: t, section: n, blocks: r, page: i }) => ({
			id: e,
			name: t.name,
			kind: t.kind,
			section: n,
			blocks: r,
			page: i
		}));
		O?.sendMaler(e);
	}
	function eo(e) {
		let t = _o.includes(e.kind) ? e.kind : "section";
		return no(t, e[t]);
	}
	function to(e) {
		let t = e.blockIds ?? [], { section: n } = yt(e.sectionId, t[0]);
		if (!n || !t.length) return;
		Pe(`sticky-group:${e.sectionId}`);
		let r = e.on ? Ja("stk") : null;
		for (let e of n.blocks) t.includes(e.id) && (e.sticky = r ? {
			offset: 16,
			until: null,
			...e.sticky,
			group: r
		} : null);
		we(n, "blokk-endret"), E.save(), A(), O?.sendSection(V(g), n), bt(), x(Z(e.on ? "status.stickyGrouped" : "status.stickyUngrouped"));
	}
	async function no(e, t) {
		if (!t || !Ka) return;
		let n = (await Ye({
			title: Z("canvas.templateNamePrompt"),
			placeholder: Z("ph.templateName")
		}))?.trim();
		if (!n) return;
		let r = vo(n);
		if (!r) {
			x(Z("status.invalidName"), "error");
			return;
		}
		if (V(Za).includes(r)) {
			x(Z("status.templateExists"), "error");
			return;
		}
		Pe("maler");
		let i = {
			schemaVersion: 1,
			mal: {
				name: n,
				kind: e
			},
			[e]: t
		};
		Ya[r] = ji(`urd-draft-mal-${r}`, () => null, S), Ya[r].replace(i), Ya[r].save(), Ka.data.maler = [...V(Za), r], Ka.save(), I(Za, [...V(Za), r], !0), x(Z("status.templateSaved", { name: n }), "ok"), A(), $a();
	}
	async function ro(e) {
		let t = Ya[e.id]?.data?.mal;
		t && await Je({ title: Z("confirm.deleteTemplate", { name: t.name }) }) && (Pe("maler"), V(hi) === e.id && I(hi, null), localStorage.removeItem(`urd-draft-mal-${e.id}`), delete Ya[e.id], Ka.data.maler = V(Za).filter((t) => t !== e.id), Ka.save(), I(Za, V(Za).filter((t) => t !== e.id), !0), A(), $a());
	}
	async function io() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/samlinger.json")).json();
		} catch {}
		ba = ji("urd-draft-samlinger", () => e, S), I(Ia, [...ba.data.samlinger ?? []], !0);
		for (let e of V(Ia)) {
			let t = null;
			try {
				t = await (await fetch(`/content/samlinger/${e}.json`)).json();
			} catch {}
			Pa[e] = t, Ca[e] = ji(`urd-draft-samling-${e}`, () => t, S), !t && !Ca[e].data && (Ca[e].replace({
				schemaVersion: 1,
				id: e,
				name: e,
				kind: "custom",
				entries: []
			}), Ca[e].save());
		}
		Fa = !0, ao();
	}
	function ao(e = !0) {
		let t = {};
		for (let e of V(Ia)) Ca[e] && (t[e] = JSON.parse(JSON.stringify(Ca[e].data)));
		I(La, t, !0), e && oo();
	}
	function oo() {
		O?.sendCollections(Be(V(La)) ?? {});
	}
	function so(e, t, n, r = !0) {
		let i = Ca[e];
		i && (Pe(t), n(i.data), i.save(), A(), ao(r));
	}
	function co(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r === "title" && !String(i ?? "").replace(/<[^>]*>/g, "").trim() || so(t, `edit:samling:${t}:${n}:${r}`, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image"));
	}
	function lo() {
		let e = V(Ba).trim();
		if (!e) return;
		let t = ea(e);
		if (!t || V(Ia).includes(t)) {
			x(Z(t ? "status.collectionExists" : "status.invalidName"), "error");
			return;
		}
		Pe("samlinger");
		let n = {
			schemaVersion: 1,
			id: t,
			name: e,
			kind: V(Ua),
			entries: []
		};
		Ca[t] = ji(`urd-draft-samling-${t}`, () => null, S), Ca[t].replace(n), Ca[t].save(), ba.data.samlinger = [...V(Ia), t], ba.save(), I(Ia, [...V(Ia), t], !0), I(za, t, !0), I(Ba, ""), A(), ao();
	}
	function uo(e) {
		Pe("samlinger"), localStorage.removeItem(`urd-draft-samling-${e}`), delete Ca[e], ba.data.samlinger = V(Ia).filter((t) => t !== e), ba.save(), I(Ia, V(Ia).filter((t) => t !== e), !0), V(za) === e && I(za, null), A(), ao();
	}
	function fo(e) {
		so(e, `samling:${e}:add-entry`, (e) => {
			e.entries.unshift({
				id: Ja("innslag"),
				title: Z("seed.newEntry"),
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function po(e, t, n, r) {
		so(e, `edit:samling:${e}:${t}:${n}`, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function mo(e, t, n) {
		so(e, `samling:${e}:move-entry`, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function ho(e, t) {
		so(e, `samling:${e}:remove-entry`, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function go(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && po(e, t, "image", (await zn(r)).dataUrl);
	}
	let bo = null, xo, So = new Promise((e) => {
		xo = e;
	}), Co = /* @__PURE__ */ F(null), wo = tn({}), To = /* @__PURE__ */ F("0.0.0"), Eo = /* @__PURE__ */ F(""), Do = /* @__PURE__ */ F(""), Oo = /* @__PURE__ */ F(tn([])), ko = /* @__PURE__ */ F(tn([])), Ao = /* @__PURE__ */ F("pending"), jo = () => [.../* @__PURE__ */ new Set([...V(Co)?.enabled ?? [], ...V(Co)?.disabled ?? []])];
	function Mo() {
		I(Co, JSON.parse(JSON.stringify(bo.data)), !0);
	}
	let No = /* @__PURE__ */ F(null);
	async function Po() {
		try {
			let e = (await fetch("/urd.json", { cache: "no-store" })).headers.get("content-security-policy");
			if (!e) {
				I(No, { unknown: !0 }, !0);
				return;
			}
			let t = (t) => new Set((e.split(";").map((e) => e.trim()).find((e) => e.startsWith(`${t} `)) ?? "").split(/\s+/).slice(1));
			I(No, {
				frameSrc: t("frame-src"),
				connectSrc: t("connect-src")
			}, !0);
		} catch {
			I(No, { unknown: !0 }, !0);
		}
	}
	function Fo(e) {
		let t = [...(e.connectSrc ?? []).map((e) => ["connect-src", e]), ...(e.frameSrc ?? []).map((e) => ["frame-src", e])];
		if (!V(No) || V(No).unknown) return [];
		let n = {
			"connect-src": V(No).connectSrc,
			"frame-src": V(No).frameSrc
		};
		return t.filter(([e, t]) => !n[e]?.has(t)).map(([e, t]) => `${e} ${t}`);
	}
	async function Io() {
		Po();
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		I(ko, e.enabled ?? [], !0), bo = ji("urd-draft-plugins", () => e, S), Mo();
		try {
			I(To, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of jo()) zo(e);
		Lo(), xo(), O?.sendPlugins(Be(V(Co))?.enabled ?? []);
	}
	async function Lo() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				Ro();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), I(Oo, (t ?? []).filter((e) => !jo().includes(e)), !0);
			for (let e of V(Oo)) zo(e);
			I(Ao, "ok");
		} catch {
			Ro();
		}
	}
	function Ro() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				I(Oo, e.filter((e) => !jo().includes(e)), !0);
				for (let e of V(Oo)) zo(e);
				I(Ao, "ok");
				return;
			}
		} catch {}
		I(Ao, "unavailable");
	}
	async function zo(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = qa(t);
			wo[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && Ga(V(To), t.requiresEngine)
			};
		} catch {
			wo[e] = {
				name: e,
				errors: [Z("plugin.manifestNotFound", { id: e })],
				satisfied: !1
			};
		}
	}
	function Vo(e, t) {
		Pe("plugins");
		let n = bo.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), bo.save(), A(), Mo(), Wo();
	}
	function Wo() {
		V(w) && (V(w).src = V(w).src);
	}
	function Go(e) {
		Pe("plugins");
		let t = bo.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), bo.save(), A(), Mo(), Wo();
	}
	async function qo() {
		I(Do, "");
		let e = V(Eo).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			I(Do, Z("plugin.invalidId"), !0);
			return;
		}
		if (jo().includes(e)) {
			I(Do, Z("plugin.alreadyListed"), !0);
			return;
		}
		if (await zo(e), wo[e].errors.length) {
			I(Do, Z("plugin.invalidManifest", { errors: wo[e].errors.join("; ") }), !0);
			return;
		}
		Vo(e, !0), I(Eo, "");
	}
	function Jo(e) {
		I(Oo, V(Oo).filter((t) => t !== e), !0), Vo(e, !0);
	}
	function Yo(e, t) {
		fi(e, () => {
			V(k).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(V(k).footer);
		});
	}
	function Zo(e, t) {
		Yo(`edit:footer-brand-${e}`, (n) => {
			n.brand ??= {}, t.trim() ? n.brand[e] = t : delete n.brand[e], !n.brand.title && !n.brand.tagline && !n.brand.logo && delete n.brand;
		});
	}
	function Qo(e) {
		Yo("footer", (t) => {
			t.brand ??= {}, e === "image" || e === "both" ? t.brand.mode = e : delete t.brand.mode;
		});
	}
	async function is(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await zn(t);
			Yo("footer", (t) => {
				t.brand ??= {}, t.brand.logo = e.dataUrl, t.brand.mode || (t.brand.mode = "both");
			});
		} catch {
			x(Z("status.imageReadErrorSvg"), "error");
		}
	}
	function as() {
		Yo("footer", (e) => {
			e.brand && (delete e.brand.logo, delete e.brand.mode, delete e.brand.logoHeight, !e.brand.title && !e.brand.tagline && delete e.brand);
		});
	}
	function os(e) {
		Yo("edit:footer-logo-height", (t) => {
			t.brand ??= {};
			let n = Number(e);
			Number.isFinite(n) && (t.brand.logoHeight = Math.min(160, Math.max(16, Math.round(n))));
		});
	}
	function ss(e) {
		Yo("edit:footer-copyright", (t) => {
			e.trim() ? t.copyright = e : delete t.copyright;
		});
	}
	let cs = [
		{
			id: "minimal",
			label: Z("footerTemplate.minimal"),
			thumb: {
				center: !0,
				social: 2,
				baselineLinks: 1
			}
		},
		{
			id: "sentrert",
			label: Z("footerTemplate.sentrert"),
			thumb: {
				center: !0,
				row: !0,
				social: 3
			}
		},
		{
			id: "kolonner",
			label: Z("footerTemplate.kolonner"),
			thumb: {
				tag: !0,
				cols: 3,
				social: 3,
				baselineLinks: 2
			}
		},
		{
			id: "sitemap",
			label: Z("footerTemplate.sitemap"),
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
			label: Z("footerTemplate.nyhetsbrev"),
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
			label: Z("footerTemplate.storcta"),
			thumb: {
				center: !0,
				bigcta: !0,
				baselineLinks: 2
			}
		},
		{
			id: "kontakt",
			label: Z("footerTemplate.kontakt"),
			thumb: {
				tag: !0,
				cols: 3,
				social: 2,
				baselineLinks: 1
			}
		},
		{
			id: "mega",
			label: Z("footerTemplate.mega"),
			thumb: {
				tag: !0,
				mega: !0,
				cols: 2,
				social: 4,
				baselineLinks: 2
			}
		}
	];
	function ls(e) {
		let t = Z("seed.orgName"), n = V(k).pages ?? [], r = (e) => n.slice(0, e).map((e) => ({
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
			baseline: [a(Z("seed.footer.privacy"), "#")]
		} : e === "sentrert" ? {
			align: "center",
			brand: { title: t },
			linkRow: r(5),
			social: i([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: `${o} · ${Z("seed.footer.madeWith")}`
		} : e === "kolonner" ? {
			align: "left",
			brand: {
				title: t,
				tagline: Z("seed.footer.tagline1")
			},
			columns: [
				{
					title: Z("seed.footer.colPages"),
					links: r(4)
				},
				{
					title: Z("seed.footer.colCompany"),
					links: [
						a(Z("seed.footer.about"), "#"),
						a(Z("seed.join"), "#"),
						a(Z("seed.footer.press"), "#")
					]
				},
				{
					title: Z("seed.footer.colResources"),
					links: [
						a(Z("seed.footer.bylaws"), "#"),
						a(Z("seed.footer.privacy"), "#"),
						a(Z("seed.footer.contact"), "#")
					]
				}
			],
			social: i([
				"facebook",
				"instagram",
				"linkedin"
			]),
			copyright: o,
			baseline: [a(Z("seed.footer.privacy"), "#"), a(Z("seed.footer.terms"), "#")]
		} : e === "sitemap" ? {
			align: "left",
			brand: {
				title: t,
				tagline: Z("seed.footer.tagline2")
			},
			columns: [
				{
					title: Z("seed.footer.colExplore"),
					links: [
						a(Z("seed.footer.home"), "#"),
						a(Z("seed.footer.events"), "#"),
						a(Z("seed.footer.gallery"), "#"),
						a(Z("seed.footer.blog"), "#")
					]
				},
				{
					title: Z("seed.footer.colCompany"),
					links: [
						a(Z("seed.footer.about"), "#"),
						a(Z("seed.footer.history"), "#"),
						a(Z("seed.footer.press"), "#"),
						a(Z("seed.footer.contact"), "#")
					]
				},
				{
					title: Z("seed.footer.colSupport"),
					links: [
						a(Z("seed.join"), "#"),
						a(Z("seed.footer.faq"), "#"),
						a(Z("seed.footer.help"), "#")
					]
				},
				{
					title: Z("seed.footer.colLegal"),
					links: [
						a(Z("seed.footer.privacy"), "#"),
						a(Z("seed.footer.terms"), "#"),
						a(Z("seed.footer.bylaws"), "#")
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
				a(Z("seed.footer.privacy"), "#"),
				a(Z("seed.footer.terms"), "#"),
				a(Z("seed.footer.cookies"), "#")
			]
		} : e === "nyhetsbrev" ? {
			align: "left",
			brand: {
				title: t,
				tagline: Z("seed.footer.tagline3")
			},
			cta: {
				kind: "newsletter",
				heading: Z("seed.footer.newsletterHeading"),
				label: Z("seed.footer.newsletterButton"),
				recipient: Z("seed.email"),
				success: Z("seed.footer.newsletterSuccess")
			},
			columns: [{
				title: Z("seed.footer.colPages"),
				links: r(4)
			}, {
				title: Z("seed.footer.colMore"),
				links: [
					a(Z("seed.footer.about"), "#"),
					a(Z("seed.footer.contact"), "#"),
					a(Z("seed.footer.privacy"), "#")
				]
			}],
			social: i(["facebook", "instagram"]),
			copyright: o,
			baseline: [a(Z("seed.footer.privacy"), "#")]
		} : e === "storcta" ? {
			align: "center",
			cta: {
				kind: "button",
				big: !0,
				heading: Z("seed.footer.ctaHeading"),
				sub: Z("seed.footer.ctaSub"),
				label: Z("seed.join"),
				href: "#"
			},
			linkRow: r(4),
			social: i([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: o,
			baseline: [a(Z("seed.footer.privacy"), "#"), a(Z("seed.footer.terms"), "#")]
		} : e === "kontakt" ? {
			align: "left",
			brand: {
				title: t,
				tagline: Z("seed.footer.tagline4")
			},
			columns: [
				{
					title: Z("seed.footer.colVisit"),
					links: [
						a(Z("seed.footer.address"), "#"),
						a(Z("seed.email"), "mailto:post@dinforening.no"),
						a("+47 22 00 00 00", "tel:+4722000000")
					]
				},
				{
					title: Z("seed.footer.colHours"),
					links: [a(Z("seed.footer.hours1"), "#"), a(Z("seed.footer.hours2"), "#")]
				},
				{
					title: Z("seed.footer.colPages"),
					links: r(4)
				}
			],
			social: i(["facebook", "instagram"]),
			copyright: o,
			baseline: [a(Z("seed.footer.privacy"), "#")]
		} : {
			align: "left",
			brand: {
				title: t,
				tagline: Z("seed.footer.tagline5")
			},
			columns: [{
				title: Z("seed.footer.colExplore"),
				links: r(4)
			}, {
				title: Z("seed.footer.colFollow"),
				links: [a(Z("seed.footer.newsletter"), "#"), a(Z("seed.email"), "mailto:post@dinforening.no")]
			}],
			social: i([
				"facebook",
				"instagram",
				"linkedin",
				"youtube"
			]),
			copyright: o,
			baseline: [a(Z("seed.footer.privacy"), "#"), a(Z("seed.footer.madeWith"), "#")],
			background: {
				version: 1,
				layers: [{
					type: "glow",
					version: gs.version ?? 1,
					props: {
						...gs.defaults(),
						color: "accent",
						x: .12,
						y: 0,
						radius: .6,
						opacity: .45
					}
				}, {
					type: "grain",
					version: vs.version ?? 1,
					props: {
						...vs.defaults(),
						opacity: .08
					}
				}]
			}
		};
	}
	function us(e) {
		Yo("footer-template", (t) => {
			let n = ls(e);
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
	function ds(e) {
		Yo("footer", (t) => {
			t[e] ??= [], t[e].push(V(k).pages[0] ? {
				label: Z("seed.link"),
				page: V(k).pages[0].id
			} : {
				label: Z("seed.link"),
				href: "https://"
			});
		});
	}
	function fs(e, t) {
		Yo("footer", (n) => {
			n[e].splice(t, 1), n[e].length || delete n[e];
		});
	}
	function ps(e, t, n) {
		Yo("footer", (r) => {
			let i = r[e], a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function ms(e, t, n) {
		Yo(`edit:footer-${e}-label-${t}`, (r) => {
			r[e][t].label = n;
		});
	}
	function _s(e, t, n) {
		Yo("footer", (r) => {
			let i = r[e][t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function ys(e, t, n) {
		Yo(`edit:footer-${e}-href-${t}`, (r) => {
			r[e][t].href = n;
		});
	}
	function bs(e) {
		Yo("footer", (t) => {
			e === "center" ? t.columnsAlign = "center" : delete t.columnsAlign;
		});
	}
	function xs(e) {
		Yo("footer", (t) => {
			e ? t.cta ??= {
				kind: "button",
				label: Z("seed.join")
			} : delete t.cta;
		});
	}
	function Ss(e, t) {
		Yo(`edit:footer-cta-${e}`, (n) => {
			n.cta ??= {}, t === "" || t == null || t === !1 ? delete n.cta[e] : n.cta[e] = t;
		});
	}
	function Cs(e) {
		Yo("footer", (t) => {
			t.cta ??= {}, e === "__href" ? (delete t.cta.page, t.cta.href = t.cta.href ?? "https://") : (t.cta.page = e, delete t.cta.href);
		});
	}
	function ws(e, t) {
		Yo("footer", (n) => {
			let r = new Set(n.hideOn ?? []);
			t ? r.delete(e) : r.add(e), r.size ? n.hideOn = [...r] : delete n.hideOn;
		});
	}
	function Ts() {
		Yo("footer", (e) => {
			e.columns ??= [], e.columns.push({
				title: Z("seed.column"),
				links: [{
					label: Z("seed.link"),
					page: V(k).pages[0].id
				}]
			});
		});
	}
	function Es(e) {
		Yo("footer", (t) => {
			t.columns.splice(e, 1), t.columns.length || delete t.columns;
		});
	}
	function Ds(e, t) {
		Yo("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.columns.length || ([n.columns[e], n.columns[r]] = [n.columns[r], n.columns[e]]);
		});
	}
	function Os(e, t) {
		Yo(`edit:footer-col-title-${e}`, (n) => {
			n.columns[e].title = t;
		});
	}
	function ks(e) {
		Yo("footer", (t) => {
			t.columns[e].links ??= [], t.columns[e].links.push({
				label: Z("seed.link"),
				page: V(k).pages[0].id
			});
		});
	}
	function As(e, t) {
		Yo("footer", (n) => {
			n.columns[e].links.splice(t, 1);
		});
	}
	function js(e, t, n) {
		Yo("footer", (r) => {
			let i = r.columns[e].links, a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function Ms(e, t, n) {
		Yo(`edit:footer-link-label-${e}-${t}`, (r) => {
			r.columns[e].links[t].label = n;
		});
	}
	function Ns(e, t, n) {
		Yo("footer", (r) => {
			let i = r.columns[e].links[t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function Ps(e, t, n) {
		Yo(`edit:footer-link-href-${e}-${t}`, (r) => {
			r.columns[e].links[t].href = n;
		});
	}
	function Fs() {
		Yo("footer", (e) => {
			e.social ??= [], e.social.push({
				icon: "facebook",
				url: "https://"
			});
		});
	}
	function Is(e) {
		Yo("footer", (t) => {
			t.social.splice(e, 1), t.social.length || delete t.social;
		});
	}
	function Ls(e, t) {
		Yo("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.social.length || ([n.social[e], n.social[r]] = [n.social[r], n.social[e]]);
		});
	}
	function Rs(e, t) {
		Yo("footer", (n) => {
			n.social[e].icon = t;
		});
	}
	function zs(e, t) {
		Yo(`edit:footer-social-url-${e}`, (n) => {
			n.social[e].url = t;
		});
	}
	let Bs = ua.filter(([e]) => e === "iconCat.social" || e === "iconCat.communication").flatMap(([, e]) => e.map((e) => [e, la[e].label]));
	function Vs(e, t) {
		fi(`edit:nav-label-${e}`, () => {
			V(k).nav.items[e].label = t;
		});
	}
	function Us(e, t) {
		fi("nav", () => {
			let n = V(k).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function Ws(e, t) {
		fi(`edit:nav-href-${e}`, () => {
			V(k).nav.items[e].href = t;
		});
	}
	function Gs(e, t) {
		let n = e + t, r = V(k).nav.items;
		n < 0 || n >= r.length || fi("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function Js(e) {
		fi("nav", () => {
			V(k).nav.items.splice(e, 1);
		});
	}
	function Ys() {
		fi("nav", () => {
			V(k).nav.items.push({
				label: Z("seed.link"),
				page: V(k).pages[0].id
			});
		});
	}
	function ld(e) {
		fi("nav", () => {
			let t = V(k).nav.items[e];
			t.children ??= [], t.children.push({
				label: Z("seed.link"),
				page: V(k).pages[0].id
			});
		});
	}
	function ud(e, t, n) {
		fi(`edit:nav-child-label-${e}-${t}`, () => {
			V(k).nav.items[e].children[t].label = n;
		});
	}
	function dd(e, t, n) {
		fi("nav", () => {
			let r = V(k).nav.items[e].children[t];
			n === "__href" ? (delete r.page, r.href = r.href ?? "https://") : (r.page = n, delete r.href);
		});
	}
	function fd(e, t, n) {
		fi(`edit:nav-child-href-${e}-${t}`, () => {
			V(k).nav.items[e].children[t].href = n;
		});
	}
	function pd(e, t, n) {
		let r = t + n, i = V(k).nav.items[e].children;
		r < 0 || r >= i.length || fi("nav", () => {
			[i[t], i[r]] = [i[r], i[t]];
		});
	}
	function md(e, t) {
		fi("nav", () => {
			let n = V(k).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = V(k).pages[0].id));
		});
	}
	function hd(e, t) {
		fi(`edit:theme-color-${e}`, () => {
			V(k).theme.tokens.color[e] = t, V(k).theme.alt?.auto && (V(k).theme.alt.tokens.color = yd());
		});
	}
	function gd(e, t) {
		fi("theme", () => {
			V(k).theme.tokens.font[e] = t;
		});
	}
	function _d(e, t) {
		fi("theme", () => {
			V(k).theme.tokens.radius[e] = t;
		});
	}
	function vd(e) {
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
	function yd() {
		return Object.fromEntries(Object.entries(V(k).theme.tokens.color).map(([e, t]) => [e, vd(t)]));
	}
	function bd(e, t) {
		fi(`edit:theme-alt-${e}`, () => {
			V(k).theme.alt.tokens.color[e] = t, V(k).theme.alt.auto = !1;
		});
	}
	function xd(e) {
		fi("theme", () => {
			e === "light" ? delete V(k).theme.scheme : V(k).theme.scheme = e;
		});
	}
	function Sd(e) {
		fi("theme", () => {
			e ? V(k).theme.alt = {
				auto: !0,
				tokens: { color: yd() }
			} : delete V(k).theme.alt;
		});
	}
	function Cd(e) {
		fi("theme", () => {
			V(k).theme.alt ??= { tokens: { color: yd() } }, V(k).theme.alt.auto = e, e && (V(k).theme.alt.tokens.color = yd());
		});
	}
	function wd(e) {
		let t = V(k).theme.tokens.font[e];
		return [...Zs.some(([, e]) => e === t) ? [] : [[t, Z("opt.customFont")]], ...Zs.map(([e, t]) => [t, Z(e)])];
	}
	let Td = (e) => parseInt(e, 10) || 0;
	function Ed(e, t) {
		_d(e, `${t}px`);
	}
	let Dd = (e, t) => e && t && t[e] ? t[e] : e, Od = [
		"bg",
		"surface",
		"text",
		"accent",
		"accent-text"
	], kd = [
		{
			id: "bronn",
			name: Z("themePreset.bronn.name"),
			note: Z("themePreset.bronn.note"),
			light: {
				bg: "#f6faf8",
				surface: "#ffffff",
				text: "#16211d",
				accent: "#15b39a",
				"accent-text": "#04241d"
			},
			dark: {
				bg: "#0e1512",
				surface: "#17211d",
				text: "#eaf1ed",
				accent: "#22c3a8",
				"accent-text": "#04241d"
			}
		},
		{
			id: "stein",
			name: Z("themePreset.stein.name"),
			note: Z("themePreset.stein.note"),
			light: {
				bg: "#f4f2ed",
				surface: "#ffffff",
				text: "#262019",
				accent: "#8a5a41",
				"accent-text": "#ffffff"
			},
			dark: {
				bg: "#17130e",
				surface: "#221c15",
				text: "#efe8dd",
				accent: "#c0906f",
				"accent-text": "#1a1109"
			}
		},
		{
			id: "plomme",
			name: Z("themePreset.plomme.name"),
			note: Z("themePreset.plomme.note"),
			light: {
				bg: "#faf5ff",
				surface: "#ffffff",
				text: "#2a1546",
				accent: "#7c3aed",
				"accent-text": "#ffffff"
			},
			dark: {
				bg: "#140f20",
				surface: "#1f1733",
				text: "#ece5f8",
				accent: "#a97cf6",
				"accent-text": "#170a2c"
			}
		},
		{
			id: "rose",
			name: Z("themePreset.rose.name"),
			note: Z("themePreset.rose.note"),
			light: {
				bg: "#faf5f6",
				surface: "#ffffff",
				text: "#241a1d",
				accent: "#b04a63",
				"accent-text": "#ffffff"
			},
			dark: {
				bg: "#171015",
				surface: "#22181c",
				text: "#f1e6ea",
				accent: "#d98098",
				"accent-text": "#2a0f18"
			}
		},
		{
			id: "hav",
			name: Z("themePreset.hav.name"),
			note: Z("themePreset.hav.note"),
			light: {
				bg: "#f1f6fb",
				surface: "#ffffff",
				text: "#13202b",
				accent: "#1a6fa8",
				"accent-text": "#ffffff"
			},
			dark: {
				bg: "#0a1420",
				surface: "#12202f",
				text: "#e2edf5",
				accent: "#47a6df",
				"accent-text": "#06131f"
			}
		},
		{
			id: "natt",
			name: Z("themePreset.natt.name"),
			note: Z("themePreset.natt.note"),
			scheme: "dark",
			light: {
				bg: "#f5f6fb",
				surface: "#ffffff",
				text: "#171a2b",
				accent: "#4f5ed6",
				"accent-text": "#ffffff"
			},
			dark: {
				bg: "#0d0f1a",
				surface: "#171b2e",
				text: "#e7e9f5",
				accent: "#8091ff",
				"accent-text": "#0a0c18"
			}
		}
	];
	function Ad(e) {
		fi("theme", () => {
			let t = e.scheme === "dark", n = t ? e.dark : e.light, r = t ? e.light : e.dark;
			for (let e of Od) V(k).theme.tokens.color[e] = n[e];
			t ? V(k).theme.scheme = "dark" : delete V(k).theme.scheme, V(k).theme.alt = { tokens: { color: { ...r } } };
		});
	}
	let jd = /* @__PURE__ */ N(() => {
		if (!V(k)) return null;
		let e = V(k).theme.tokens.color, t = V(k).theme.alt?.tokens?.color ?? {}, n = V(k).theme.scheme === "dark";
		return kd.find((r) => {
			let i = n ? r.dark : r.light, a = n ? r.light : r.dark;
			return Od.every((n) => e[n] === i[n] && t[n] === a[n]);
		})?.id ?? null;
	});
	function Md() {
		I(te, !V(te)), O?.sendChrome(V(te));
	}
	function Nd(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (Pe(`edit:${e.blockId}`), n.props = e.props, E.save(), A(), V(M)?.blockId === e.blockId && bt(), e.rerender && O?.sendSection(V(g), t), I(v, ""));
	}
	function Pd(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		Pe(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && we(t, "desktop-endret-etter-mobil"), E.save(), A(), V(M)?.blockId === e.blockId && bt();
	}
	function Fd(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		!t?.frames?.desktop || t.frames.desktop.h === e.h || (E.amendBaseline((t) => {
			let n = t.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
			n?.frames?.desktop && (n.frames.desktop.h = e.h);
		}), E.hasDraft() && Pe(`edit:${e.blockId}`), t.frames.desktop.h = e.h, E.save(), A(), V(M)?.blockId === e.blockId && bt());
	}
	function Id(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			Pe("mobile-manual");
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
			}, E.save(), A();
		}
	}
	function Ld(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			Pe("mobile-auto");
			for (let e of t.blocks) e.frames.mobile = null;
			t.responsive = {
				...t.responsive ?? {},
				mobile: {
					mode: "auto",
					attention: null
				}
			}, E.save(), A(), Se(), O?.sendSection(V(g), t);
		}
	}
	function Rd(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (Pe("review-done"), t.responsive.mobile.attention = null, E.save(), A(), Se());
	}
	function zd(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (Pe("decor"), t.decor = e.decor, E.save(), A(), V(M)?.blockId === e.blockId && bt());
	}
	function Bd(e) {
		Pe("add-section"), e.section.id || (e.section.id = Ja("sec")), E.data.sections.splice(e.index, 0, e.section), E.save(), A(), O?.sendPage(V(g), E.data), I(Xt, e.section.id, !0), on(e.section), I(it, "properties");
	}
	function Vd(e) {
		let t = E.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (Pe("move-section"), [t[n], t[r]] = [t[r], t[n]], E.save(), A(), O?.sendPage(V(g), E.data));
	}
	function Hd(e) {
		Pe("delete-section"), e.sectionId === V(Xt) && (I(Xt, null), I(Zt, null)), V(M)?.sectionId === e.sectionId && I(M, null), E.data.sections = E.data.sections.filter((t) => t.id !== e.sectionId), E.save(), A(), O?.sendPage(V(g), E.data);
	}
	function Ud(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			Pe("section-size"), t.size = {
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
			e.moves?.length && (we(t, "seksjonshøyde"), V(M)?.sectionId === e.sectionId && bt()), e.sectionId === V(Xt) && I(Qt, e.minHeight, !0), E.save(), A();
		}
	}
	function Wd(e) {
		let t = E.data.sections.find((t) => t.id === e.fromSectionId), n = E.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		!t || !n || !r || (Pe("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), we(t, "blokk-flyttet"), we(n, "blokk-flyttet"), E.save(), A(), Se(), O?.sendPage(V(g), E.data), V(M)?.blockId === e.blockId && (I(M, {
			...V(M),
			sectionId: e.toSectionId
		}, !0), bt()));
	}
	function Gd(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId);
		if (!t) return;
		let n = e.blockIds ?? [e.blockId];
		Pe("delete-block"), t.blocks = t.blocks.filter((e) => !n.includes(e.id)), n.includes(V(M)?.blockId) && I(M, null), we(t, "blokk-slettet"), E.save(), A(), O?.sendSection(V(g), t);
	}
	let Kd = {
		text: {
			type: "text",
			props: {
				html: Z("seed.text"),
				align: "left"
			},
			w: 33,
			h: 28
		},
		"text-box": {
			type: "text",
			props: {
				html: Z("seed.textBox"),
				align: "left",
				box: !0
			},
			w: 30,
			h: 150
		},
		button: {
			type: "button",
			props: {
				label: Z("seed.newButton"),
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
						q: Z("seed.faq.q1"),
						a: Z("seed.faq.answer")
					},
					{
						q: Z("seed.faq.q2"),
						a: Z("seed.faq.answer")
					},
					{
						q: Z("seed.faq.q3"),
						a: Z("seed.faq.answer")
					}
				],
				multi: !1
			},
			w: 50,
			h: 220
		},
		tidslinje: {
			type: "tidslinje",
			props: {
				items: [
					{
						year: "2019",
						title: Z("seed.tidslinje.t1"),
						text: Z("seed.tidslinje.text")
					},
					{
						year: "2022",
						title: Z("seed.tidslinje.t2"),
						text: Z("seed.tidslinje.text")
					},
					{
						year: "2026",
						title: Z("seed.tidslinje.t3"),
						text: Z("seed.tidslinje.text")
					}
				],
				variant: "venstre",
				marker: "fylt",
				accent: null
			},
			w: 42,
			h: 260
		},
		sitat: {
			type: "sitat",
			props: {
				text: Z("seed.sitat.text"),
				attribution: Z("seed.sitat.name"),
				role: Z("seed.sitat.role"),
				variant: "stor",
				image: "",
				accent: null
			},
			w: 44,
			h: 180
		},
		statistikk: {
			type: "statistikk",
			props: {
				value: "4800",
				prefix: "",
				suffix: "+",
				label: Z("seed.statistikk.label"),
				countUp: !0
			},
			w: 20,
			h: 90
		}
	};
	function qd(e) {
		let t = Kd[e];
		return t ? {
			id: Ja("blk"),
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
	function Jd(e) {
		O ? O.sendPlaceBlock(e) : Yd(gr()?.id, e);
	}
	function Yd(e, t) {
		let n = E.data.sections.find((t) => t.id === e) ?? E.data.sections[0];
		if (!n) return;
		Pe("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), we(n, "blokk-lagt-til"), E.save(), A(), O?.sendSection(V(g), n);
	}
	function Xd(e, t, n, r) {
		let i = E.data.sections.find((t) => t.id === e);
		if (!i || !t?.length) return;
		Pe("add-blocks");
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
		}), we(i, "blokk-lagt-til"), E.save(), A(), O?.sendSection(V(g), i);
	}
	function Zd(e) {
		Jd(qd(e));
	}
	let Qd = /* @__PURE__ */ F(tn([]));
	function $d(e, t = {}) {
		let n = Be(e);
		Jd({
			id: Ja("blk"),
			type: n.type,
			version: n.version ?? 1,
			decor: !1,
			props: {
				...n.defaults ?? {},
				...Be(t)
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
	let ef = /* @__PURE__ */ F("");
	function tf() {
		let e = [
			{
				label: Z("blocks.text"),
				act: "block",
				kind: "text"
			},
			{
				label: Z("ui.textBox"),
				act: "block",
				kind: "text-box"
			},
			{
				label: Z("blocks.button"),
				act: "block",
				kind: "button"
			},
			{
				label: Z("blocks.image"),
				act: "image"
			},
			{
				label: Z("blocks.video"),
				act: "block",
				kind: "video"
			},
			{
				label: Z("blocks.icon"),
				act: "block",
				kind: "icon"
			},
			{
				label: Z("blocks.samling"),
				act: "block",
				kind: "samling"
			},
			{
				label: Z("blocks.faq"),
				act: "block",
				kind: "faq"
			},
			{
				label: Z("blocks.tidslinje"),
				act: "block",
				kind: "tidslinje"
			},
			{
				label: Z("blocks.sitat"),
				act: "block",
				kind: "sitat"
			},
			{
				label: Z("blocks.statistikk"),
				act: "block",
				kind: "statistikk"
			},
			{
				label: Z("ui.emptyGallery"),
				act: "block",
				kind: "galleri"
			},
			{
				label: Z("ui.galleryWithImages"),
				act: "galleryImages"
			},
			{
				label: Z("shape.line"),
				act: "block",
				kind: "shape-line"
			},
			{
				label: Z("shape.arrow"),
				act: "block",
				kind: "shape-arrow"
			},
			{
				label: Z("shape.circle"),
				act: "block",
				kind: "shape-circle"
			},
			{
				label: Z("shape.rect"),
				act: "block",
				kind: "shape-rect"
			},
			{
				label: Z("shape.triangle"),
				act: "block",
				kind: "shape-triangle"
			}
		];
		for (let t of V(Za)) {
			let n = Ya[t]?.data?.mal;
			n?.kind === "blocks" && e.push({
				label: n.name,
				act: "mal",
				id: t
			});
		}
		for (let t of V(Qd)) if (t.variants?.length) for (let n of t.variants) e.push({
			label: `${t.label}: ${n.label}`,
			act: "plugin",
			entry: t,
			props: n.props
		});
		else e.push({
			label: t.label,
			act: "plugin",
			entry: t
		});
		return e;
	}
	function nf(e) {
		e.act === "block" ? Zd(e.kind) : e.act === "plugin" ? $d(e.entry, e.props ?? {}) : e.act === "mal" && O?.sendInsertTemplate(e.id);
	}
	function rf(e) {
		let t = qd(e.kind);
		if (t) {
			if (e.at && typeof e.at.x == "number" && typeof e.at.y == "number") {
				let n = E.data.sections.find((t) => t.id === e.sectionId)?.grid ?? V(k).grid, r = Qs({
					x: e.at.x,
					y: e.at.y,
					w: t.frames.desktop.w,
					h: t.frames.desktop.h,
					grid: n
				});
				t.frames.desktop.x = r.x, t.frames.desktop.y = r.y;
			} else t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40;
			Yd(e.sectionId, t), O?.sendSelect(t.id), e.kind === "image" && x(Z("status.imageBlockAdded")), e.kind === "galleri" && x(Z("status.galleryBlockAdded"));
		}
	}
	async function af(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		x(Z("status.compressingImage"));
		let n;
		try {
			n = await zn(t);
		} catch {
			x(Z("status.imageReadError"), "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (V(w)?.clientWidth ?? 1280));
		Jd({
			id: Ja("blk"),
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: ea(t.name).replaceAll("-", " "),
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
		}), n.bytes > 4e5 ? x(Z("status.imageLarge", { kb: Math.round(n.bytes / 1024) }), "error") : x("");
	}
	async function of(e) {
		let t = [], n = 0, r = 0;
		for (let i of e) try {
			let e = await zn(i);
			e.bytes > 4e5 && (r += 1), t.push({
				src: e.dataUrl,
				alt: ea(i.name).replaceAll("-", " "),
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
	function sf(e, t, n) {
		t ? x(Z("status.imagesReadFailed", { n: t }), "error") : n ? x(Z("status.imagesLarge", { n }), "error") : x(e ? "" : Z("status.noImagesAdded"));
	}
	async function cf(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		x(Z("status.compressingImages"));
		let { images: n, failed: r, big: i } = await of(t);
		n.length && Et("galleri-add", (e) => {
			e.props.images.push(...n);
		}), sf(n.length, r, i);
	}
	async function lf(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		x(Z("status.compressingImages"));
		let { images: n, failed: r, big: i } = await of(t);
		if (!n.length) {
			sf(0, r, i);
			return;
		}
		let a = qd("galleri");
		a.props.images = n, Jd(a), sf(n.length, r, i);
	}
	function uf(e, t) {
		Et("galleri-move", (n) => {
			let r = e + t;
			r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
		});
	}
	function df(e) {
		Et("galleri-remove", (t) => {
			t.props.images.splice(e, 1);
		});
	}
	function ff(e, t, n) {
		Et(`edit:${V(M).blockId}:img${e}-${t}`, (r) => {
			r.props.images[e][t] = n;
		});
	}
	function pf(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/")) return;
		let a = i.split(",", 2)[1], o = `media/${ea(n || "bilde")}-${ta(a)}.${$i(i)}`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function mf(e, t) {
		for (let n of e?.layers ?? []) if (n.type === "image" && pf(n.props, "src", "bakgrunn", t), n.type === "bildegalleri") for (let e of n.props.images ?? []) pf(e, "src", "bakgrunn", t);
	}
	function hf(e, t) {
		if (e.type === "image" && pf(e.props, "src", e.props.alt, t), e.type === "icon" && pf(e.props, "image", "ikon", t), e.type === "galleri") for (let n of e.props.images ?? []) pf(n, "src", n.alt || "galleri", t);
	}
	function gf(e, t) {
		mf(e.background, t);
		for (let n of e.blocks) hf(n, t);
	}
	function _f(e) {
		let t = [];
		for (let n of e.sections) gf(n, t);
		return t;
	}
	function vf(e) {
		let t = [], n = e.nav?.logo;
		return n?.type === "image" && pf(n, "value", "logo", t), n?.type === "both" && pf(n, "image", "logo", t), e.nav?.style && pf(e.nav.style, "image", "meny", t), mf(e.nav?.style?.background, t), mf(e.footer?.background, t), e.footer?.brand && pf(e.footer.brand, "logo", "footer-logo", t), pf(e.site, "icon", "ikon", t), t;
	}
	let yf = /* @__PURE__ */ F(!1), bf = /* @__PURE__ */ F(null);
	function xf() {
		I(yf, !V(yf));
	}
	function Sf() {
		I(yf, !1), Cf();
	}
	bn(() => {
		if (!V(yf)) return;
		let e = (e) => {
			V(bf)?.contains(e.target) || I(yf, !1);
		}, t = (e) => {
			e.key === "Escape" && I(yf, !1);
		}, n = () => I(yf, !1);
		return window.addEventListener("click", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			window.removeEventListener("click", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	function Cf() {
		Pe("discard");
		for (let e of V(k).pages) e.id !== V(g) && !De.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = E.reset();
		if (D.reset(), bo && (bo.reset(), Mo()), ba) {
			ba.reset(), I(Ia, [...ba.data.samlinger ?? []], !0);
			for (let e of Object.keys(Ca)) V(Ia).includes(e) ? Ca[e].reset() : delete Ca[e];
			ao();
		}
		if (Ka) {
			Ka.reset(), I(Za, [...Ka.data.maler ?? []], !0);
			for (let e of Object.keys(Ya)) V(Za).includes(e) ? Ya[e].reset() : (localStorage.removeItem(`urd-draft-mal-${e}`), delete Ya[e]);
			$a();
		}
		Te(), I(ee, {
			snap: !0,
			...V(k).grid
		}, !0), A(), I(v, ""), Ee(), V(k).pages.some((e) => e.id === V(g)) ? O?.sendPage(V(g), e) : Kr(V(k).pages[0].id);
	}
	async function wf() {
		if (Ar) {
			x(Z("status.revertReloadBeforePublish"), "error");
			return;
		}
		if (V(Ir)) {
			x(Z("update.publishBlocked"), "error");
			return;
		}
		x(Z("status.publishing"));
		let e = [], t = [], n = [], r = [];
		for (let i of V(k).pages) {
			let a = `urd-draft-${i.id}`, o = De.has(i.id) || !V(h).pages.some((e) => e.id === i.id), s = null;
			if (i.id === V(g) && (E.hasDraft() || o)) s = E.data;
			else if (i.id !== V(g)) {
				let e = localStorage.getItem(a);
				if (e) try {
					s = Ha(JSON.parse(e), D.data);
				} catch {}
			}
			if (!s && o && (s = Gr(i)), !s) continue;
			let c = JSON.parse(JSON.stringify(s));
			e.push(..._f(c)), e.push({
				path: i.file,
				content: JSON.stringify(c, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (D.hasDraft()) {
			let r = JSON.parse(JSON.stringify(V(k)));
			e.push(...vf(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), e.push({
				path: "content/theme.css",
				content: Xo(r.theme),
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(V(h).theme, V(k).theme) || t.push("tema"), i(V(h).nav, V(k).nav) || t.push("menyen"), i(V(h).footer, V(k).footer) || t.push("footeren"), i(V(h).pages, V(k).pages) || t.push("sideregisteret"), i(V(h).grid, V(k).grid) || t.push("gridet"), (V(h).site.icon ?? null) !== (V(k).site.icon ?? null) && t.push("nettstedsikonet");
			let { icon: a, ...o } = V(h).site, { icon: s, ...c } = V(k).site;
			i(o, c) || t.push("nettstedsinfo");
		}
		let i = Object.entries(Ca).filter(([, e]) => e.hasDraft());
		if (i.length || ba?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) pf(t, "image", t.title, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (ba?.hasDraft()) {
				e.push({
					path: "content/samlinger.json",
					content: JSON.stringify(ba.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/samlinger.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!V(Ia).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push("samlinger");
		}
		let a = Object.entries(Ya).filter(([, e]) => e.hasDraft());
		if (a.length || Ka?.hasDraft()) {
			for (let [t, r] of a) {
				let i = JSON.parse(JSON.stringify(r.data));
				i.section && gf(i.section, e);
				for (let t of i.blocks ?? []) hf(t, e);
				for (let t of i.page?.sections ?? []) gf(t, e);
				e.push({
					path: `content/maler/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-mal-${t}`);
			}
			if (Ka?.hasDraft()) {
				e.push({
					path: "content/maler.json",
					content: JSON.stringify(Ka.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-maler");
				let t = { maler: [] };
				try {
					t = await (await fetch("/content/maler.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.maler ?? []) {
					let t = `content/maler/${n}.json`;
					!V(Za).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push("maler");
		}
		bo?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(bo.data, null, 2) + "\n",
			encoding: "utf-8"
		}), n.push("urd-draft-plugins"), t.push("plugins"));
		try {
			let t = await (await fetch("/index.html")).text();
			for (let n of V(k).pages) n.path !== "/" && e.push({
				path: `${n.path.slice(1)}/index.html`,
				content: t,
				encoding: "utf-8"
			});
		} catch {}
		let o = new Set(e.map((e) => e.path)), s = (t) => {
			o.has(t) || e.push({
				path: t,
				delete: !0
			});
		};
		for (let e of V(h).pages) {
			let t = V(k).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && s(`${e.path.slice(1)}/index.html`) : (s(e.file), e.path !== "/" && s(`${e.path.slice(1)}/index.html`));
		}
		let c = await Tr(e);
		if (!c.ok) {
			x(Z("status.publishAborted"), "error");
			return;
		}
		let l = {
			message: `Oppdater ${t.join(", ") || "nettstedet"} via Urd-admin`,
			files: e,
			...c.head ? { expect: c.head } : {}
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
			e ? Cr = e : wr(), _f(E.data), vf(V(k));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) De.add(e);
			if (I(h, JSON.parse(JSON.stringify(V(k))), !0), D = ji("urd-draft-site", () => V(h), S), Te(), bo) {
				let e = JSON.parse(JSON.stringify(bo.data));
				bo = ji("urd-draft-plugins", () => e, S), Mo();
			}
			if (ba) {
				for (let e of Object.values(Ca)) for (let t of e.data.entries) pf(t, "image", t.title, []);
				let e = JSON.parse(JSON.stringify(ba.data));
				ba = ji("urd-draft-samlinger", () => e, S), Pa = {};
				for (let e of V(Ia)) {
					if (!Ca[e]) continue;
					let t = JSON.parse(JSON.stringify(Ca[e].data));
					Pa[e] = t, Ca[e] = ji(`urd-draft-samling-${e}`, () => t, S);
				}
				ao();
			}
			if (Ka) {
				for (let e of Object.values(Ya)) {
					e.data?.section && gf(e.data.section, []);
					for (let t of e.data?.blocks ?? []) hf(t, []);
					for (let t of e.data?.page?.sections ?? []) gf(t, []);
				}
				let e = JSON.parse(JSON.stringify(Ka.data));
				Ka = ji("urd-draft-maler", () => e, S), $ = {};
				for (let e of V(Za)) {
					if (!Ya[e]) continue;
					let t = JSON.parse(JSON.stringify(Ya[e].data));
					$[e] = t, Ya[e] = ji(`urd-draft-mal-${e}`, () => t, S);
				}
				$a();
			}
			I(ee, {
				snap: !0,
				...V(k).grid
			}, !0);
			let t = JSON.parse(JSON.stringify(E.data));
			E = ji(`urd-draft-${V(g)}`, () => t, S), De.has(V(g)) && C(`urd-draft-${V(g)}`, JSON.stringify(t)), A(), x(Z("status.published"), "ok");
		} else if (u?.status === 401) {
			let e = await u.json().catch(() => null);
			x(e?.code === "loginExpired" ? Z("status.loginExpired") : Z("status.loginRequired", { reason: Ei(e) ?? Z("status.unknownReason") }), "error"), await xr();
		} else u?.status === 403 ? x(Ei(await u.json().catch(() => null)) ?? Z("status.noPublishAccess"), "error") : u?.status === 409 ? x(Z("status.publishRace"), "error") : x(u ? Ei(await u.json().catch(() => null)) ?? Z("status.publishFailed") : Z("status.publishUnavailable"), "error");
	}
	Ke();
	var Tf = cd();
	Sr("keydown", nn, Ue), Sr("pointerdown", nn, He);
	var Ef = R(Tf), Df = L(Ef), Of = (e) => {
		var t = cl(), n = L(t);
		q(n, () => c.pencil);
		var r = z(n);
		j(t), B((e, n) => {
			X(t, "title", e), G(r, ` ${n ?? ""}`);
		}, [() => Z("tip.backToEdit"), () => Z("ui.edit")]), H("click", t, Md), W(e, t);
	};
	K(Df, (e) => {
		V(te) || e(Of);
	});
	var kf = z(Df, 2);
	let Af;
	var jf = L(kf), Mf = L(jf), Nf = (e) => {
		var t = yl(), n = R(t), r = L(n, !0);
		j(n);
		var i = z(n, 2), a = L(i), o = (e) => {
			var t = dl(), n = L(t);
			let r;
			var i = L(n);
			q(i, () => c[`device_${V(re)}`]), q(z(i), () => c.caret), j(n);
			var a = z(n, 2), o = (e) => {
				var t = ul();
				Vr(t, 21, () => ne, (e) => e.id, (e, t) => {
					var n = ll();
					let r;
					var i = L(n);
					q(i, () => c[`device_${V(t).id}`]);
					var a = z(i);
					j(n), B((e, i) => {
						r = Qr(n, 1, "ghost svelte-1n46o8q", null, r, { active: V(re) === V(t).id }), X(n, "title", e), G(a, ` ${i ?? ""}`);
					}, [() => Z(`tip.view.${V(t).id}`, {
						w: V(t).width ?? V(fe),
						c: Ma(V(zi), V(Bi), V(t).width ?? V(fe)).width
					}), () => Z(`lbl.device.${V(t).id}`)]), H("click", n, () => {
						I(re, V(t).id, !0), I(ri, null);
					}), W(e, n);
				}), j(t), W(e, t);
			};
			K(a, (e) => {
				V(ri) === "device" && e(o);
			}), j(t), B((e) => {
				r = Qr(n, 1, "ghost svelte-1n46o8q", null, r, { active: V(ri) === "device" }), X(n, "title", e);
			}, [() => Z("lbl.group.device")]), H("click", n, () => I(ri, V(ri) === "device" ? null : "device", !0)), W(e, t);
		}, s = (e) => {
			var t = pl(), n = R(t), r = L(n, !0);
			j(n);
			var i = z(n, 2);
			Vr(i, 21, () => ne, (e) => e.id, (e, t) => {
				var n = fl();
				let r;
				q(n, () => c[`device_${V(t).id}`], !0), j(n), B((e) => {
					r = Qr(n, 1, "ghost svelte-1n46o8q", null, r, { active: V(re) === V(t).id }), X(n, "title", e);
				}, [() => Z(`tip.view.${V(t).id}`, {
					w: V(t).width ?? V(fe),
					c: Ma(V(zi), V(Bi), V(t).width ?? V(fe)).width
				})]), H("click", n, () => I(re, V(t).id, !0)), W(e, n);
			}), j(i), B((e) => G(r, e), [() => Z("lbl.group.device")]), W(e, t);
		};
		K(a, (e) => {
			oi.device ? e(o) : e(s, -1);
		});
		var l = z(a, 2), u = (e) => {
			var t = hl(), n = L(t);
			let r;
			var i = L(n), a = L(i);
			j(i), q(z(i), () => c.caret), j(n);
			var o = z(n, 2), s = (e) => {
				var t = ml(), n = L(t), r = L(n);
				q(r, () => c.minus, !0), j(r);
				var i = z(r, 2), a = L(i);
				j(i);
				var o = z(i, 2);
				q(o, () => c.plus, !0), j(o), j(n);
				var s = z(n, 2);
				let l;
				var u = L(s);
				q(u, () => c.fit);
				var d = z(u);
				j(s), j(t), B((e, t, n, c, u, f) => {
					X(r, "title", e), X(i, "title", t), G(a, `${n ?? ""}%`), X(o, "title", c), l = Qr(s, 1, "ghost svelte-1n46o8q", null, l, { active: V(ue) === "fit" }), X(s, "title", u), G(d, ` ${f ?? ""}`);
				}, [
					() => Z("tip.zoomOut"),
					() => Z("tip.zoomCurrent"),
					() => Math.round(V(he) * 100),
					() => Z("tip.zoomIn"),
					() => Z("tip.zoomFit"),
					() => Z("lbl.zoom.fit")
				]), H("click", r, () => ge(-1)), H("click", o, () => ge(1)), H("click", s, () => I(ue, "fit")), W(e, t);
			};
			K(o, (e) => {
				V(ri) === "zoom" && e(s);
			}), j(t), B((e, t) => {
				r = Qr(n, 1, "ghost svelte-1n46o8q", null, r, { active: V(ri) === "zoom" }), X(n, "title", e), G(a, `${t ?? ""}%`);
			}, [() => Z("lbl.group.zoom"), () => Math.round(V(he) * 100)]), H("click", n, () => I(ri, V(ri) === "zoom" ? null : "zoom", !0)), W(e, t);
		}, d = (e) => {
			var t = gl(), n = R(t), r = L(n, !0);
			j(n);
			var i = z(n, 2), a = L(i);
			q(a, () => c.minus, !0), j(a);
			var o = z(a, 2), s = L(o);
			j(o);
			var l = z(o, 2);
			q(l, () => c.plus, !0), j(l);
			var u = z(l, 2);
			let d;
			q(u, () => c.fit, !0), j(u), j(i), B((e, t, n, i, c, f) => {
				G(r, e), X(a, "title", t), X(o, "title", n), G(s, `${i ?? ""}%`), X(l, "title", c), d = Qr(u, 1, "ghost svelte-1n46o8q", null, d, { active: V(ue) === "fit" }), X(u, "title", f);
			}, [
				() => Z("lbl.group.zoom"),
				() => Z("tip.zoomOut"),
				() => Z("tip.zoomCurrent"),
				() => Math.round(V(he) * 100),
				() => Z("tip.zoomIn"),
				() => Z("tip.zoomFit")
			]), H("click", a, () => ge(-1)), H("click", l, () => ge(1)), H("click", u, () => I(ue, "fit")), W(e, t);
		};
		K(l, (e) => {
			oi.zoom ? e(u) : e(d, -1);
		});
		var f = z(l, 2), p = (e) => {
			var t = dl(), n = L(t);
			let r;
			var i = L(n);
			q(i, () => c.gridToggle), q(z(i), () => c.caret), j(n);
			var a = z(n, 2), o = (e) => {
				var t = _l(), n = L(t);
				let r;
				var i = L(n);
				q(i, () => c.gridToggle);
				var a = z(i);
				j(n);
				var o = z(n, 2);
				let s;
				var l = L(o);
				q(l, () => c.guides);
				var u = z(l);
				j(o), j(t), B((e, t, i, c) => {
					r = Qr(n, 1, "ghost svelte-1n46o8q", null, r, { active: V(ci) }), X(n, "title", e), G(a, ` ${t ?? ""}`), s = Qr(o, 1, "ghost svelte-1n46o8q", null, s, { active: V(Yr) }), X(o, "title", i), G(u, ` ${c ?? ""}`);
				}, [
					() => Z("tip.gridToggle"),
					() => Z("lbl.view.grid"),
					() => Z("tip.guides"),
					() => Z("lbl.view.guides")
				]), H("click", n, ui), H("click", o, si), W(e, t);
			};
			K(a, (e) => {
				V(ri) === "view" && e(o);
			}), j(t), B((e) => {
				r = Qr(n, 1, "ghost svelte-1n46o8q", null, r, { active: V(ri) === "view" || V(ci) || V(Yr) }), X(n, "title", e);
			}, [() => Z("lbl.group.view")]), H("click", n, () => I(ri, V(ri) === "view" ? null : "view", !0)), W(e, t);
		}, m = (e) => {
			var t = vl(), n = R(t), r = L(n, !0);
			j(n);
			var i = z(n, 2), a = L(i);
			let o;
			q(a, () => c.gridToggle, !0), j(a);
			var s = z(a, 2);
			let l;
			q(s, () => c.guides, !0), j(s), j(i), B((e, t, n) => {
				G(r, e), o = Qr(a, 1, "ghost svelte-1n46o8q", null, o, { active: V(ci) }), X(a, "title", t), l = Qr(s, 1, "ghost svelte-1n46o8q", null, l, { active: V(Yr) }), X(s, "title", n);
			}, [
				() => Z("lbl.group.view"),
				() => Z("tip.gridToggle"),
				() => Z("tip.guides")
			]), H("click", a, ui), H("click", s, si), W(e, t);
		};
		K(f, (e) => {
			oi.view ? e(p) : e(m, -1);
		}), j(i), pi(i, (e) => I(ii, e), () => V(ii)), B((e, t) => {
			X(n, "title", e), G(r, t);
		}, [() => Z("tip.switchPage"), () => Oe()?.title ?? ""]), H("click", n, () => vt("pages")), W(e, t);
	};
	K(Mf, (e) => {
		V(h) && e(Nf);
	});
	var Pf = z(Mf, 2), Ff = (e) => {
		var t = bl(), n = L(t);
		q(n, () => c.phone);
		var r = z(n, 2), i = L(r, !0);
		j(r);
		var a = z(r, 2), o = L(a, !0);
		j(a), j(t), B((e, n) => {
			X(t, "title", e), G(i, n), G(o, V(xe));
		}, [() => Z("tip.attention"), () => Z(V(xe) === 1 ? "ui.attentionOne" : "ui.attentionMany", { n: V(xe) })]), H("click", t, () => I(re, "mobile")), W(e, t);
	};
	K(Pf, (e) => {
		V(xe) > 0 && e(Ff);
	}), j(jf);
	var If = z(jf, 2), Lf = L(If), Rf = (e) => {
		var t = Sl(), n = R(t), r = L(n), i = L(r, !0);
		j(r), Ne(2), j(n);
		var a = z(n, 2), o = L(a);
		let s;
		var l = L(o);
		q(l, () => c.restore);
		var u = z(l), d = L(u, !0);
		j(u), j(o);
		var f = z(o, 2), p = (e) => {
			var t = xl(), n = L(t);
			q(n, () => c.restore);
			var r = z(n);
			j(t), B((e, n) => {
				X(t, "title", e), G(r, ` ${n ?? ""}`);
			}, [() => Z("tip.discardArmed"), () => Z("ui.discardConfirm")]), H("click", t, Sf), W(e, t);
		};
		K(f, (e) => {
			V(yf) && e(p);
		}), j(a), pi(a, (e) => I(bf, e), () => V(bf)), B((e, t, r, a, c) => {
			X(n, "title", e), X(n, "aria-label", t), G(i, r), s = Qr(o, 1, "discard-dot svelte-1n46o8q", null, s, { armed: V(yf) }), X(o, "title", a), G(d, c);
		}, [
			() => Z("ui.unpublished"),
			() => Z("ui.unpublished"),
			() => Z("ui.unpublished"),
			() => V(yf) ? Z("tip.discardArmed") : Z("tip.discard"),
			() => Z("ui.discard")
		]), H("click", o, xf), W(e, t);
	};
	K(Lf, (e) => {
		V(_) && e(Rf);
	}), j(If);
	var zf = z(If, 2), Bf = L(zf), Vf = (e) => {
		var t = El(), n = R(t), r = L(n), i = (e) => {
			var t = Cl(), n = R(t);
			q(n, () => c.eye);
			var r = z(n, 2), i = L(r, !0);
			j(r), B((e) => G(i, e), [() => Z("ui.cleanView")]), W(e, t);
		}, a = (e) => {
			var t = Cl(), n = R(t);
			q(n, () => c.pencil);
			var r = z(n, 2), i = L(r, !0);
			j(r), B((e) => G(i, e), [() => Z("ui.edit")]), W(e, t);
		};
		K(r, (e) => {
			V(te) ? e(i) : e(a, -1);
		}), j(n);
		var o = z(n, 2), s = (e) => {
			var t = wl(), n = L(t), r = (e) => {
				var t = jr();
				q(R(t), () => c.warn), W(e, t);
			};
			K(n, (e) => {
				V(T).allowed || e(r);
			});
			var i = z(n, 1, !0);
			j(t), B((e) => {
				X(t, "title", e), G(i, V(T).login);
			}, [() => V(T).allowed ? Z("tip.hasPublishAccess") : Z("tip.noPublishAccess")]), W(e, t);
		}, l = (e) => {
			var t = Tl(), n = L(t, !0);
			j(t), B((e) => G(n, e), [() => Z("ui.loginGitHub")]), W(e, t);
		};
		K(o, (e) => {
			V(T)?.loggedIn ? e(s) : V(T) && e(l, 1);
		});
		var u = z(o, 2), d = L(u);
		q(d, () => c.external);
		var f = z(d, 2), p = L(f, !0);
		j(f), j(u);
		var m = z(u, 2), h = L(m, !0);
		j(m), B((e, t, r, i, a) => {
			X(n, "title", e), X(u, "href", t), X(u, "title", r), G(p, i), m.disabled = !V(_), G(h, a);
		}, [
			() => V(te) ? Z("tip.chromeHide") : Z("tip.chromeShow"),
			() => Oe()?.path ?? "/",
			() => Z("ui.viewSite"),
			() => Z("ui.viewSite"),
			() => Z("ui.publish")
		]), H("click", n, Md), H("click", m, wf), W(e, t);
	};
	K(Bf, (e) => {
		V(h) && e(Vf);
	}), j(zf), j(kf);
	var Hf = z(kf, 2), Uf = (e) => {
		var t = td(), i = L(t), o = (e) => {
			var t = ed(), i = R(t), o = L(i);
			Vr(o, 17, () => at, Lr, (e, t, n) => {
				var r = Ol(), i = R(r), a = L(i, !0);
				j(i), Vr(z(i, 2), 16, () => V(t), (e) => e, (e, t) => {
					var n = Dl();
					let r;
					var i = L(n, !0);
					j(n), B(() => {
						r = Qr(n, 1, "svelte-1n46o8q", null, r, { active: V(it) === t }), G(i, lt[t]);
					}), H("click", n, () => vt(t)), W(e, n);
				}), B((e) => G(a, e), [() => Z(ct[n])]), W(e, r);
			});
			var s = z(o, 2), f = z(L(s), 2);
			let p;
			q(f, () => c.gear, !0), j(f);
			var h = z(f, 2), _ = (e) => {
				var t = kl(), n = L(t), r = L(n, !0);
				j(n);
				var i = z(n, 2), a = L(i);
				Q(z(a), {
					get value() {
						return V(u);
					},
					get options() {
						return l;
					},
					onchange: (e) => I(u, e, !0)
				}), j(i);
				var o = z(i, 2), s = L(o), c = z(s);
				{
					let e = /* @__PURE__ */ N(() => [["auto", Z("lang.auto")], ...mt()]);
					Q(c, {
						get value() {
							return gt;
						},
						get options() {
							return V(e);
						},
						onchange: _t
					});
				}
				j(o);
				var d = z(o, 2), f = L(d), p = z(f);
				{
					let e = /* @__PURE__ */ N(() => [["strip", Z("settings.layoutPickerStrip")], ["menu", Z("settings.layoutPickerMenu")]]);
					Q(p, {
						get value() {
							return V(Zr);
						},
						get options() {
							return V(e);
						},
						onchange: $r
					});
				}
				j(d), j(t), B((e, t, n, c, l, u, p) => {
					G(r, e), X(i, "title", t), G(a, `${n ?? ""} `), X(o, "title", c), G(s, `${l ?? ""} `), X(d, "title", u), G(f, `${p ?? ""} `);
				}, [
					() => Z("settings.title"),
					() => Z("topbar.adminTheme.title"),
					() => Z("settings.theme"),
					() => Z("topbar.language.title"),
					() => Z("settings.language"),
					() => Z("tip.settings.layoutPicker"),
					() => Z("settings.layoutPicker")
				]), W(e, t);
			};
			K(h, (e) => {
				V(Xr) && e(_);
			}), j(s), pi(s, (e) => I(ti, e), () => V(ti)), j(i);
			var v = z(i, 2), y = (e) => {
				var t = $u(), i = L(t), o = L(i, !0);
				j(i);
				var s = z(i, 2), l = (e) => {
					var t = Rl(), n = L(t);
					Vr(n, 17, () => V(k).pages, (e) => e.id, (e, t) => {
						var n = Pl();
						let r;
						var i = L(n);
						J(i);
						var a = z(i, 2), o = (e) => {
							var t = Al();
							B((e) => X(t, "title", e), [() => Z("tip.pages.homeLocked")]), W(e, t);
						}, s = (e) => {
							var n = jl();
							J(n), B((e, t) => {
								Y(n, e), X(n, "title", t);
							}, [() => V(t).path.slice(1), () => Z("tip.pages.slug")]), H("change", n, (e) => Ti(V(t), e.target.value)), W(e, n);
						};
						K(a, (e) => {
							V(t).path === "/" ? e(o) : e(s, -1);
						});
						var l = z(a, 2), u = L(l);
						q(u, () => c.right, !0), j(u);
						var d = z(u, 2), f = L(d);
						q(f, () => c.kebab, !0), j(f);
						var p = z(f, 2), m = (e) => {
							var n = Nl(), r = L(n), i = L(r);
							q(i, () => c.bookmark);
							var a = z(i);
							j(r);
							var o = z(r, 2), s = (e) => {
								var n = Ml(), r = L(n);
								q(r, () => c.cross);
								var i = z(r);
								j(n), B((e, t) => {
									X(n, "title", e), G(i, ` ${t ?? ""}`);
								}, [() => Z("tip.pages.delete"), () => Z("ui.deletePage")]), H("click", n, () => {
									I(_i, null), Oi(V(t));
								}), W(e, n);
							};
							K(o, (e) => {
								V(t).path !== "/" && e(s);
							}), j(n), B((e) => G(a, ` ${e ?? ""}`), [() => Z("ui.savePageTemplate")]), H("click", r, () => xi(V(t))), W(e, n);
						};
						K(p, (e) => {
							V(_i) === V(t).id && e(m);
						}), j(d), j(l), j(n), B((e, a, o) => {
							r = Qr(n, 1, "page-row svelte-1n46o8q", null, r, { current: V(t).id === V(g) }), Y(i, V(t).title), X(i, "title", e), X(u, "title", a), u.disabled = V(t).id === V(g), X(f, "title", o);
						}, [
							() => Z("tip.pages.title"),
							() => Z("tip.pages.open"),
							() => Z("tip.pages.menu")
						]), H("change", i, (e) => Si(V(t), e.target.value)), H("click", u, () => Kr(V(t).id)), H("click", f, () => I(_i, V(_i) === V(t).id ? null : V(t).id, !0)), W(e, n);
					});
					var r = z(n, 4);
					J(r);
					var i = z(r, 2), a = L(i, !0);
					j(i);
					var o = z(i, 2), s = L(o, !0);
					j(o);
					var l = z(o, 2), u = L(l);
					let d;
					var f = L(u), p = L(f);
					q(p, () => Bo({ sections: [] }), !0), j(p);
					var m = z(p, 2), h = L(m, !0);
					j(m), j(f), j(u), Vr(z(u, 2), 17, () => Ho, (e) => e.id, (e, t) => {
						var n = Fl();
						let r;
						var i = L(n), a = L(i);
						q(a, () => gi[V(t).id], !0), j(a);
						var o = z(a, 2), s = L(o, !0);
						j(o), j(i), j(n), B((e, a) => {
							r = Qr(n, 1, "page-mal-card svelte-1n46o8q", null, r, { picked: V(hi) === `preset:${V(t).id}` }), X(i, "title", e), G(s, a);
						}, [() => Z("tip.pages.templatePick", { name: Z(V(t).labelKey) }), () => Z(V(t).labelKey)]), H("click", i, () => I(hi, V(hi) === `preset:${V(t).id}` ? null : `preset:${V(t).id}`, !0)), W(e, n);
					}), j(l);
					var _ = z(l, 2), v = (e) => {
						var t = Ll(), n = R(t), r = L(n, !0);
						j(n);
						var i = z(n, 2);
						Vr(i, 20, () => V(Za).filter((e) => Ya[e]?.data?.mal?.kind === "page"), (e) => e, (e, t) => {
							var n = Il();
							let r;
							var i = L(n), a = L(i);
							q(a, () => Bo(Ya[t].data.page), !0), j(a);
							var o = z(a, 2), s = L(o, !0);
							j(o), j(i);
							var l = z(i, 2);
							q(l, () => c.cross, !0), j(l), j(n), B((e, a) => {
								r = Qr(n, 1, "page-mal-card svelte-1n46o8q", null, r, { picked: V(hi) === t }), X(i, "title", e), G(s, Ya[t].data.mal.name), X(l, "title", a);
							}, [() => Z("tip.pages.templatePick", { name: Ya[t].data.mal.name }), () => Z("canvas.deleteTemplate")]), H("click", i, () => I(hi, V(hi) === t ? null : t, !0)), H("click", l, () => ro({ id: t })), W(e, n);
						}), j(i), B((e) => G(r, e), [() => Z("canvas.tabMyTemplates")]), W(e, t);
					}, y = /* @__PURE__ */ N(() => V(Za).some((e) => Ya[e]?.data?.mal?.kind === "page"));
					K(_, (e) => {
						V(y) && e(v);
					}), j(t), B((e, t, n, o, c, l, p) => {
						X(r, "placeholder", e), X(i, "title", t), i.disabled = n, G(a, o), G(s, c), d = Qr(u, 1, "page-mal-card svelte-1n46o8q", null, d, { picked: V(hi) === null }), X(f, "title", l), G(h, p);
					}, [
						() => Z("ph.newPageName"),
						() => Z("hint.pages.autoMenu"),
						() => !V(mi).trim(),
						() => Z("ui.createPage"),
						() => Z("canvas.tabPresets"),
						() => Z("tip.pages.blankPick"),
						() => Z("ui.blankPage")
					]), H("keydown", r, (e) => e.key === "Enter" && bi()), li(r, () => V(mi), (e) => I(mi, e)), H("click", i, bi), H("click", f, () => I(hi, null)), W(e, t);
				}, u = (e) => {
					var t = Gl(), r = L(t), i = L(r), a = L(i, !0);
					j(i);
					var o = z(i, 2), s = L(o), l = L(s), u = z(l);
					{
						let e = /* @__PURE__ */ N(() => V(k).nav.logo?.type ?? "text"), t = /* @__PURE__ */ N(() => [
							["text", Z("blocks.text")],
							["image", Z("blocks.image")],
							["both", Z("opt.logo.both")]
						]);
						Q(u, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => Ai(e)
						});
					}
					j(s);
					var d = z(s, 2), f = (e) => {
						var t = zl(), n = R(t);
						J(n);
						var r = z(n, 2), i = L(r);
						{
							let e = /* @__PURE__ */ N(() => Z("tip.nav.logoFont")), t = /* @__PURE__ */ N(() => V(k).nav.logo?.font ?? ""), n = /* @__PURE__ */ N(() => [["", Z("common.inherit")], ...Zs.map(([e, t]) => [t, Z(e)])]);
							Q(i, {
								get title() {
									return V(e);
								},
								get value() {
									return V(t);
								},
								get options() {
									return V(n);
								},
								onchange: (e) => ki({ font: e || void 0 })
							});
						}
						var a = z(i, 2);
						J(a);
						var o = z(a, 2);
						let s;
						var c = L(o), l = L(c, !0);
						j(c), j(o);
						var u = z(o, 2);
						let d;
						var f = L(u), p = L(f, !0);
						j(f), j(u), j(r), B((e, t, r, i, c, f, m) => {
							Y(n, V(k).nav.logo?.value ?? ""), X(n, "placeholder", e), X(a, "title", t), Y(a, V(k).nav.logo?.textSize ?? ""), s = Qr(o, 1, "tbtn svelte-1n46o8q", null, s, { active: V(k).nav.logo?.bold !== !1 }), X(o, "title", r), G(l, i), d = Qr(u, 1, "tbtn svelte-1n46o8q", null, d, c), X(u, "title", f), G(p, m);
						}, [
							() => Z("ph.nav.logoName"),
							() => Z("tip.nav.textSize"),
							() => Z("format.bold"),
							() => Z("format.boldLetter"),
							() => ({ active: !!V(k).nav.logo?.italic }),
							() => Z("format.italic"),
							() => Z("format.italicLetter")
						]), H("input", n, (e) => ki({ value: e.target.value })), H("change", a, (e) => ki({ textSize: e.target.value ? Number(e.target.value) : void 0 })), H("click", o, () => ki({ bold: V(k).nav.logo?.bold === !1 })), H("click", u, () => ki({ italic: !V(k).nav.logo?.italic })), W(e, t);
					};
					K(d, (e) => {
						(V(k).nav.logo?.type ?? "text") !== "image" && e(f);
					});
					var p = z(d, 2), m = (e) => {
						var t = Bl(), n = L(t), r = L(n), i = z(r);
						j(n);
						var a = z(n, 2);
						J(a);
						var o = z(a, 2);
						J(o), j(t), B((e, t, i, s) => {
							X(n, "title", e), G(r, `${t ?? ""} `), X(a, "title", i), Y(a, V(k).nav.logo?.size ?? 32), X(o, "title", s), Y(o, V(k).nav.logo?.radius ?? 0);
						}, [
							() => Z("tip.webpAuto"),
							() => (V(k).nav.logo?.type === "image" ? V(k).nav.logo?.value : V(k).nav.logo?.image) ? Z("ui.changeImage") : Z("ui.chooseImage"),
							() => Z("tip.nav.logoHeight"),
							() => Z("tip.nav.logoRadius")
						]), H("change", i, Mi), H("change", a, (e) => ki({ size: Number(e.target.value) })), H("change", o, (e) => ki({ radius: Number(e.target.value) })), W(e, t);
					};
					K(p, (e) => {
						(V(k).nav.logo?.type ?? "text") !== "text" && e(m);
					});
					var h = z(p, 2), g = (e) => {
						var t = gc(), n = L(t), r = z(n);
						{
							let e = /* @__PURE__ */ N(() => V(k).nav.logo?.order ?? "image-first"), t = /* @__PURE__ */ N(() => [["image-first", Z("opt.logo.imageFirst")], ["text-first", Z("opt.logo.textFirst")]]);
							Q(r, {
								get value() {
									return V(e);
								},
								get options() {
									return V(t);
								},
								onchange: (e) => ki({ order: e })
							});
						}
						j(t), B((e) => G(n, `${e ?? ""} `), [() => Z("lbl.order")]), W(e, t);
					};
					K(h, (e) => {
						V(k).nav.logo?.type === "both" && e(g);
					}), j(o), j(r);
					var _ = z(r, 2), v = L(_), y = L(v, !0);
					j(v);
					var b = z(v, 2), x = L(b), S = L(x), C = z(S);
					{
						let e = /* @__PURE__ */ N(() => V(k).nav.variant ?? "bar"), t = /* @__PURE__ */ N(() => [
							["bar", Z("opt.navVariant.bar")],
							["floating", Z("opt.navVariant.floating")],
							["floating-square", Z("opt.navVariant.floatingSquare")],
							["floating-tab", Z("opt.navVariant.floatingTab")],
							["side-left", Z("opt.navVariant.sideLeft")],
							["side-right", Z("opt.navVariant.sideRight")]
						]);
						Q(C, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => ga(e)
						});
					}
					j(x);
					var w = z(x, 2), T = (e) => {
						var t = Vl(), n = R(t), r = L(n);
						J(r);
						var i = z(r);
						j(n);
						var a = z(n, 2), o = L(a);
						J(o);
						var s = z(o);
						j(a), B((e, t, c, l) => {
							X(n, "title", e), ai(r, V(k).nav.style?.glow === !0), G(i, ` ${t ?? ""}`), X(a, "title", c), ai(o, V(k).nav.style?.topGap !== !1), G(s, ` ${l ?? ""}`);
						}, [
							() => Z("tip.nav.glow"),
							() => Z("lbl.navGlow"),
							() => Z("tip.nav.topGap"),
							() => Z("lbl.navTopGap")
						]), H("change", r, (e) => _a(e.target.checked)), H("change", o, (e) => va(e.target.checked)), W(e, t);
					};
					K(w, (e) => {
						V(pa) && e(T);
					});
					var ee = z(w, 2), te = (e) => {
						var t = Oc(), n = L(t);
						J(n);
						var r = z(n);
						j(t), B((e, i) => {
							X(t, "title", e), ai(n, V(k).nav.overlay === !0), G(r, ` ${i ?? ""}`);
						}, [() => Z("tip.nav.overlay"), () => Z("lbl.navOverlay")]), H("change", n, (e) => fi("nav", () => {
							e.target.checked ? V(k).nav.overlay = !0 : delete V(k).nav.overlay;
						})), W(e, t);
					};
					K(ee, (e) => {
						!V(pa) && !V(fa) && e(te);
					});
					var ne = z(ee, 2), re = (e) => {
						var t = gc(), n = L(t), r = z(n);
						{
							let e = /* @__PURE__ */ N(() => V(k).nav.style?.sideAlign ?? "left"), t = /* @__PURE__ */ N(() => [
								["left", Z("common.left")],
								["center", Z("common.center")],
								["right", Z("common.right")]
							]);
							Q(r, {
								get value() {
									return V(e);
								},
								get options() {
									return V(t);
								},
								onchange: (e) => ca("sideAlign", e === "left" ? void 0 : e)
							});
						}
						j(t), B((e, r) => {
							X(t, "title", e), G(n, `${r ?? ""} `);
						}, [() => Z("tip.nav.sideAlign"), () => Z("lbl.textAlign")]), W(e, t);
					};
					K(ne, (e) => {
						V(fa) && e(re);
					});
					var ie = z(ne, 2), ae = L(ie);
					J(ae);
					var oe = z(ae);
					j(ie);
					var se = z(ie, 2), ce = L(se), le = z(ce);
					{
						let e = /* @__PURE__ */ N(() => V(k).nav.style?.size ?? "md"), t = /* @__PURE__ */ N(() => [
							["sm", Z("opt.size.sm")],
							["md", Z("opt.size.md")],
							["lg", Z("opt.size.lg")],
							["xl", Z("opt.size.xl")]
						]);
						Q(le, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => ca("size", e === "md" ? void 0 : e)
						});
					}
					j(se);
					var ue = z(se, 2), de = L(ue), fe = z(de), pe = (e) => {
						{
							let t = /* @__PURE__ */ N(() => V(k).nav.style?.sidePlacement ?? "top"), n = /* @__PURE__ */ N(() => [
								["top", Z("opt.place.top")],
								["middle", Z("opt.place.middle")],
								["bottom", Z("opt.place.bottom")]
							]);
							Q(e, {
								get value() {
									return V(t);
								},
								get options() {
									return V(n);
								},
								onchange: (e) => ca("sidePlacement", e === "top" ? void 0 : e)
							});
						}
					}, me = (e) => {
						{
							let t = /* @__PURE__ */ N(() => V(k).nav.layout ?? "right"), n = /* @__PURE__ */ N(() => [
								["right", Z("common.right")],
								["center", Z("common.center")],
								["left", Z("opt.layout.leftAfterLogo")]
							]);
							Q(e, {
								get value() {
									return V(t);
								},
								get options() {
									return V(n);
								},
								onchange: (e) => sa(e)
							});
						}
					};
					K(fe, (e) => {
						V(fa) ? e(pe) : e(me, -1);
					}), j(ue);
					var he = z(ue, 2), ge = (e) => {
						var t = Hl(), n = R(t), r = L(n);
						J(r);
						var i = z(r);
						j(n);
						var a = z(n, 2), o = (e) => {
							var t = gc(), n = L(t), r = z(n);
							{
								let e = /* @__PURE__ */ N(() => V(k).nav.scroll ?? "none"), t = /* @__PURE__ */ N(() => [
									["none", Z("opt.scroll.none")],
									["shrink", Z("opt.scroll.shrink")],
									["hide", Z("opt.scroll.hide")]
								]);
								Q(r, {
									get value() {
										return V(e);
									},
									get options() {
										return V(t);
									},
									onchange: (e) => fi("nav", () => {
										e === "none" ? delete V(k).nav.scroll : V(k).nav.scroll = e;
									})
								});
							}
							j(t), B((e, r) => {
								X(t, "title", e), G(n, `${r ?? ""} `);
							}, [() => Z("tip.nav.scroll"), () => Z("lbl.navScroll")]), W(e, t);
						};
						K(a, (e) => {
							V(k).nav.sticky !== !1 && e(o);
						}), B((e, t) => {
							X(n, "title", e), ai(r, V(k).nav.sticky !== !1), G(i, ` ${t ?? ""}`);
						}, [() => Z("tip.nav.sticky"), () => Z("lbl.navSticky")]), H("change", r, (e) => fi("nav", () => {
							V(k).nav.sticky = e.target.checked;
						})), W(e, t);
					};
					K(he, (e) => {
						V(fa) || e(ge);
					});
					var _e = z(he, 2), ve = L(_e), ye = z(ve);
					{
						let e = /* @__PURE__ */ N(() => V(k).nav.style?.hover ?? "standard"), t = /* @__PURE__ */ N(() => [
							["standard", Z("opt.hover.standard")],
							["underline", Z("opt.hover.underline")],
							["pill", Z("opt.hover.pill")],
							["lift-plain", Z("opt.hover.liftPlain")],
							["lift", Z("opt.hover.lift")]
						]);
						Q(ye, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => ya(e)
						});
					}
					j(_e);
					var be = z(_e, 2), xe = (e) => {
						var t = Ul(), n = R(t), r = L(n), i = z(r), a = L(i);
						j(i), j(n);
						var o = z(n, 2);
						J(o), B((e, t, i) => {
							X(n, "title", e), G(r, `${t ?? ""} `), G(a, `${i ?? ""}%`), Y(o, V(k).nav.style?.hoverGlow ?? .6);
						}, [
							() => Z("tip.nav.hoverGlow"),
							() => Z("lbl.glowStrength"),
							() => Math.round((V(k).nav.style?.hoverGlow ?? .6) * 100)
						]), H("input", o, (e) => ca("hoverGlow", Number(e.target.value))), W(e, t);
					};
					K(be, (e) => {
						V(k).nav.style?.hover === "lift" && e(xe);
					});
					var Se = z(be, 2), Ce = (e) => {
						var t = gc(), n = L(t), r = z(n);
						{
							let e = /* @__PURE__ */ N(() => V(k).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ N(Yn);
							Ui(r, {
								get value() {
									return V(e);
								},
								get tokens() {
									return V(t);
								},
								get label() {
									return V(ha)[1];
								},
								onchange: (e) => ca("hoverColor", e)
							});
						}
						j(t), B(() => {
							X(t, "title", V(ha)[1]), G(n, `${V(ha)[0] ?? ""} `);
						}), W(e, t);
					};
					K(Se, (e) => {
						V(ha) && e(Ce);
					});
					var we = z(Se, 2), E = L(we), D = z(E);
					{
						let e = /* @__PURE__ */ N(() => V(k).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ N(Yn), n = /* @__PURE__ */ N(() => Z("tip.nav.hoverTextColorPick"));
						Ui(D, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => ca("hoverTextColor", e)
						});
					}
					j(we);
					var O = z(we, 2), Te = L(O), Ee = z(Te);
					{
						let e = /* @__PURE__ */ N(() => V(k).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ N(Yn), n = /* @__PURE__ */ N(() => Z("tip.nav.textColorPick"));
						Ui(Ee, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => ca("textColor", e)
						});
					}
					j(O);
					var De = z(O, 4), Oe = L(De, !0);
					j(De);
					var A = z(De, 2);
					n(A, () => qn, () => V(k).nav?.style?.background?.layers ?? []), j(b), j(_);
					var ke = z(_, 2), Ae = L(ke), je = L(Ae, !0);
					j(Ae);
					var Me = z(Ae, 2), Ne = L(Me), Pe = L(Ne), Fe = z(Pe);
					{
						let e = /* @__PURE__ */ N(() => V(k).nav.style?.subStyle ?? "card"), t = /* @__PURE__ */ N(() => V(fa) ? [
							["card", Z("common.standard")],
							["pills", Z("opt.sub.pills")],
							["lines", Z("opt.sub.lines")]
						] : [
							["card", Z("opt.sub.card")],
							["flat", Z("opt.sub.flat")],
							["pills", Z("opt.sub.pills")],
							["lines", Z("opt.sub.lines")],
							["flyout", Z("opt.sub.flyout")]
						]);
						Q(Fe, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => ca("subStyle", e === "card" ? void 0 : e)
						});
					}
					j(Ne);
					var Ie = z(Ne, 2), Le = (e) => {
						var t = gc(), n = L(t), r = z(n);
						{
							let e = /* @__PURE__ */ N(() => V(k).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ N(Yn), n = /* @__PURE__ */ N(() => Z("tip.nav.subPillColorPick"));
							Ui(r, {
								get value() {
									return V(e);
								},
								get tokens() {
									return V(t);
								},
								get label() {
									return V(n);
								},
								onchange: (e) => ca("subPillColor", e)
							});
						}
						j(t), B((e, r) => {
							X(t, "title", e), G(n, `${r ?? ""} `);
						}, [() => Z("tip.nav.subPillColor"), () => Z("lbl.subPillColor")]), W(e, t);
					};
					K(Ie, (e) => {
						V(k).nav.style?.subStyle === "pills" && e(Le);
					});
					var Re = z(Ie, 2), ze = L(Re), Be = z(ze);
					J(Be), j(Re), j(Me), j(ke);
					var Ve = z(ke, 2), He = L(Ve), Ue = L(He, !0);
					j(He);
					var We = z(He, 2), Ge = L(We);
					Vr(Ge, 17, () => V(k).nav.items, Lr, (e, t, n) => {
						var r = Wl(), i = R(r), a = L(i);
						J(a);
						var o = z(a, 2), s = L(o);
						q(s, () => c.plus, !0), j(s);
						var l = z(s, 2);
						l.disabled = n === 0, q(l, () => c.up, !0), j(l);
						var u = z(l, 2);
						q(u, () => c.down, !0), j(u);
						var d = z(u, 2);
						q(d, () => c.cross, !0), j(d), j(o);
						var f = z(o, 2), p = L(f);
						{
							let e = /* @__PURE__ */ N(() => V(t).page ?? (V(t).href == null ? "__none" : "__href")), r = /* @__PURE__ */ N(() => Z("tip.linkTarget")), i = /* @__PURE__ */ N(() => [
								...V(k).pages.map((e) => [e.id, e.title]),
								["__href", Z("opt.linkHref")],
								...V(t).children ? [["__none", Z("opt.noLink")]] : []
							]);
							Q(p, {
								get value() {
									return V(e);
								},
								get title() {
									return V(r);
								},
								get options() {
									return V(i);
								},
								onchange: (e) => Us(n, e)
							});
						}
						j(f);
						var m = z(f, 2), h = (e) => {
							var r = mc();
							J(r), B((e, n) => {
								Y(r, V(t).href), X(r, "placeholder", e), X(r, "title", n);
							}, [() => Z("ph.hrefAnchor"), () => Z("tip.hrefAnchor")]), H("change", r, (e) => Ws(n, e.target.value)), W(e, r);
						};
						K(m, (e) => {
							!V(t).page && V(t).href != null && e(h);
						}), j(i), Vr(z(i, 2), 17, () => V(t).children ?? [], Lr, (e, r, i) => {
							var a = hc(), o = L(a);
							J(o);
							var s = z(o, 2), l = L(s);
							l.disabled = i === 0, q(l, () => c.up, !0), j(l);
							var u = z(l, 2);
							q(u, () => c.down, !0), j(u);
							var d = z(u, 2);
							q(d, () => c.cross, !0), j(d), j(s);
							var f = z(s, 2), p = L(f);
							{
								let e = /* @__PURE__ */ N(() => V(r).page ?? "__href"), t = /* @__PURE__ */ N(() => Z("tip.linkTarget")), a = /* @__PURE__ */ N(() => [...V(k).pages.map((e) => [e.id, e.title]), ["__href", Z("opt.linkHref")]]);
								Q(p, {
									get value() {
										return V(e);
									},
									get title() {
										return V(t);
									},
									get options() {
										return V(a);
									},
									onchange: (e) => dd(n, i, e)
								});
							}
							j(f);
							var m = z(f, 2), h = (e) => {
								var t = mc();
								J(t), B((e, n) => {
									Y(t, V(r).href ?? ""), X(t, "placeholder", e), X(t, "title", n);
								}, [() => Z("ph.hrefAnchor"), () => Z("tip.hrefAnchor")]), H("change", t, (e) => fd(n, i, e.target.value)), W(e, t);
							};
							K(m, (e) => {
								V(r).page || e(h);
							}), j(a), B((e, n) => {
								Y(o, V(r).label), X(o, "title", e), u.disabled = i === V(t).children.length - 1, X(d, "title", n);
							}, [() => Z("tip.nav.childLabel"), () => Z("tip.nav.removeChild")]), H("input", o, (e) => ud(n, i, e.target.value)), H("click", l, () => pd(n, i, -1)), H("click", u, () => pd(n, i, 1)), H("click", d, () => md(n, i)), W(e, a);
						}), B((e, r, i) => {
							Y(a, V(t).label), X(a, "title", e), X(s, "title", r), u.disabled = n === V(k).nav.items.length - 1, X(d, "title", i);
						}, [
							() => Z("tip.nav.itemLabel"),
							() => Z("tip.nav.addChild"),
							() => Z("tip.nav.removeItem")
						]), H("input", a, (e) => Vs(n, e.target.value)), H("click", s, () => ld(n)), H("click", l, () => Gs(n, -1)), H("click", u, () => Gs(n, 1)), H("click", d, () => Js(n)), W(e, r);
					});
					var Ke = z(Ge, 2), qe = L(Ke, !0);
					j(Ke), j(We), j(Ve), j(t), B((e, t, n, r, o, s, c, u, d, f, p, m, h, g, _, v, b, C, w, T, ee, te) => {
						X(i, "title", e), G(a, t), G(l, `${n ?? ""} `), G(y, r), X(x, "title", o), G(S, `${s ?? ""} `), X(ie, "title", c), ai(ae, V(k).nav.style?.blur !== !1), G(oe, ` ${u ?? ""}`), G(ce, `${d ?? ""} `), G(de, `${f ?? ""} `), G(ve, `${p ?? ""} `), X(we, "title", m), G(E, `${h ?? ""} `), G(Te, `${g ?? ""} `), G(Oe, _), G(je, v), G(Pe, `${b ?? ""} `), X(Re, "title", C), G(ze, `${w ?? ""} `), Y(Be, V(k).nav.style?.subColumns ?? 1), X(He, "title", T), G(Ue, ee), G(qe, te);
					}, [
						() => Z("hint.nav.logoHome"),
						() => Z("group.logo"),
						() => Z("common.type"),
						() => Z("group.appearance"),
						() => Z("tip.nav.variant"),
						() => Z("lbl.navVariant"),
						() => Z("tip.nav.blur"),
						() => Z("lbl.navBlur"),
						() => Z("lbl.size"),
						() => Z("lbl.navPlacement"),
						() => Z("lbl.navHover"),
						() => Z("tip.nav.hoverTextColor"),
						() => Z("lbl.hoverTextColor"),
						() => Z("lbl.textColor"),
						() => Z("lbl.background"),
						() => Z("group.submenu"),
						() => Z("lbl.design"),
						() => Z("tip.nav.subColumns"),
						() => Z("lbl.columns"),
						() => Z("hint.nav.submenu"),
						() => Z("group.menuItems"),
						() => Z("ui.addMenuItem")
					]), H("change", ae, (e) => ca("blur", e.target.checked)), H("change", Be, (e) => ca("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), H("click", Ke, Ys), W(e, t);
				}, f = (e) => {
					var t = Zl(), n = L(t), r = L(n), i = z(r);
					J(i), j(n);
					var a = z(n, 2), o = L(a), s = z(o);
					J(s), j(a);
					var l = z(a, 2), u = L(l), d = z(u);
					{
						let e = /* @__PURE__ */ N(ra), t = /* @__PURE__ */ N(ia);
						Q(d, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => aa(e)
						});
					}
					j(l);
					var f = z(l, 4), p = L(f, !0);
					j(f);
					var m = z(f, 2), h = L(m);
					Vr(h, 17, () => V(Ki), (e) => e.screen, (e, t) => {
						var n = Kl(), r = L(n), i = L(r, !0);
						j(r);
						var a = z(r, 2);
						let o;
						var s = L(a);
						j(a);
						var c = z(a, 2), l = L(c, !0);
						j(c), j(n), B(() => {
							G(i, V(t).screen), o = Qr(a, 1, "cw-bar svelte-1n46o8q", null, o, { fluid: !V(t).bound }), ei(s, `width:${V(t).pct ?? ""}%`), G(l, V(t).bound ? `${V(t).margin}` : "-");
						}), W(e, n);
					});
					var g = z(h, 2), _ = L(g), v = L(_, !0);
					j(_);
					var y = z(_, 2), b = L(y, !0);
					j(y), j(g);
					var x = z(g, 2), S = (e) => {
						var t = ql(), n = L(t, !0);
						j(t), B((e) => G(n, e), [() => Z("lbl.bindsFrom", { n: V(pe) })]), W(e, t);
					};
					K(x, (e) => {
						V(zi) !== "full" && e(S);
					}), j(m);
					var C = z(m, 2);
					Vr(C, 21, () => Da, (e) => e.id, (e, t) => {
						var n = Dl();
						let r;
						var i = L(n, !0);
						j(n), B((e) => {
							r = Qr(n, 1, "svelte-1n46o8q", null, r, { on: V(Vi) === V(t).id }), G(i, e);
						}, [() => Z(`lbl.width.${V(t).id}`)]), H("click", n, () => Yi(V(t).width)), W(e, n);
					}), j(C);
					var w = z(C, 2), T = (e) => {
						var t = Jl(), n = L(t), r = L(n, !0);
						j(n);
						var i = z(n, 2);
						J(i);
						var a = z(i, 2), o = L(a);
						j(a), j(t), B((e, n) => {
							X(t, "title", e), G(r, n), X(i, "min", 960), X(i, "max", Ta), X(i, "step", 20), Y(i, V(Gi)), G(o, `${V(Gi) ?? ""} px`);
						}, [() => Z("tip.site.contentWidthFree"), () => Z("lbl.widthFree")]), H("input", i, (e) => Yi(e.target.valueAsNumber)), W(e, t);
					};
					K(w, (e) => {
						V(zi) !== "full" && e(T);
					});
					var ee = z(w, 2), te = L(ee, !0);
					j(ee);
					var ne = z(ee, 2);
					Vr(ne, 21, () => Ea, (e) => e.id, (e, t) => {
						var n = Dl();
						let r;
						var i = L(n, !0);
						j(n), B((e) => {
							r = Qr(n, 1, "svelte-1n46o8q", null, r, { on: V(Hi) === V(t).id }), G(i, e);
						}, [() => Z(`lbl.gutter.${V(t).id}`)]), H("click", n, () => na(V(t).gutter)), W(e, n);
					}), j(ne);
					var re = z(ne, 2), ie = L(re), ae = L(ie, !0);
					j(ie);
					var oe = z(ie, 2), se = L(oe), ce = L(se), le = L(ce, !0);
					j(ce);
					var ue = z(ce, 2);
					J(ue);
					var de = z(ue, 2), fe = L(de);
					j(de), j(se), j(oe), j(re);
					var me = z(re, 4), he = L(me), ge = z(he), _e = (e) => {
						var t = Yl();
						B((e) => {
							X(t, "src", V(k).site.icon), X(t, "alt", e);
						}, [() => Z("lbl.siteIcon")]), W(e, t);
					};
					K(ge, (e) => {
						V(k).site.icon && e(_e);
					}), j(me);
					var ve = z(me, 2), ye = L(ve), be = L(ye), xe = z(be);
					j(ye);
					var Se = z(ye, 2), Ce = (e) => {
						var t = Xl(), n = R(t);
						q(n, () => c.pencil ?? "✎", !0), j(n);
						var r = z(n, 2);
						q(r, () => c.cross, !0), j(r), B((e, t) => {
							X(n, "title", e), X(r, "title", t);
						}, [() => Z("tip.site.editIcon"), () => Z("tip.site.removeIcon")]), H("click", n, () => I(Ni, V(k).site.icon, !0)), H("click", r, Ii), W(e, t);
					};
					K(Se, (e) => {
						V(k).site.icon && e(Ce);
					}), j(ve), j(t), B((e, t, c, d, m, h, g, _, y, x, S, C, w, T, ne, ie, oe, ce, de, pe) => {
						X(n, "title", e), G(r, `${t ?? ""} `), Y(i, V(k).site.title ?? ""), X(i, "placeholder", c), X(a, "title", d), G(o, `${m ?? ""} `), Y(s, V(k).site.description ?? ""), X(s, "placeholder", h), X(l, "title", g), G(u, `${_ ?? ""} `), X(f, "title", y), G(p, x), G(v, S), G(b, C), X(ee, "title", w), G(te, T), re.open = V(Hi) === null || V(Wi), G(ae, ne), X(se, "title", ie), G(le, oe), X(ue, "min", 0), X(ue, "max", 12), X(ue, "step", 1), Y(ue, V(Bi)), G(fe, `${V(Bi) ?? ""} vw`), G(he, `${ce ?? ""} `), X(ye, "title", de), G(be, `${pe ?? ""} `);
					}, [
						() => Z("tip.site.name"),
						() => Z("lbl.name"),
						() => Z("ph.site.name"),
						() => Z("tip.site.description"),
						() => Z("lbl.description"),
						() => Z("ph.site.description"),
						() => Z("site.langTitle"),
						() => Z("site.langLabel"),
						() => Z("tip.site.contentWidth"),
						() => Z("lbl.contentWidth"),
						() => Z("lbl.screenPx"),
						() => Z("lbl.marginPx"),
						() => Z("tip.site.gutter"),
						() => Z("lbl.gutter"),
						() => Z("group.advanced"),
						() => Z("tip.site.gutterVw"),
						() => Z("lbl.gutterVw"),
						() => Z("lbl.siteIcon"),
						() => Z("tip.site.icon"),
						() => V(k).site.icon ? Z("ui.changeIcon") : Z("ui.chooseIcon")
					]), H("input", i, (e) => Li(e.target.value)), H("input", s, (e) => Ri(e.target.value)), Sr("toggle", re, (e) => I(Wi, e.currentTarget.open, !0)), H("input", ue, (e) => na(e.target.valueAsNumber)), H("change", xe, Pi), W(e, t);
				}, p = (e) => {
					var t = au();
					{
						let e = (e, t = d, n = d) => {
							var r = $l(), i = L(r), a = (e) => {
								var t = Ql(), r = L(t, !0);
								j(t), B(() => G(r, n())), W(e, t);
							};
							K(i, (e) => {
								n() && e(a);
							});
							var o = z(i, 2), s = L(o), c = L(s, !0);
							j(s);
							var l = z(s, 2), u = L(l, !0);
							j(l);
							var f = z(l, 2), p = L(f), m = L(p, !0);
							j(p);
							var h = z(p), g = L(h, !0);
							j(h), j(f), j(o), j(r), B((e, t, n, r, i, a, s, l, d) => {
								ei(o, `--tv-bg:${e ?? ""};--tv-surface:${t ?? ""};--tv-text:${n ?? ""};--tv-accent:${r ?? ""};--tv-accent-ink:${i ?? ""}`), G(c, a), G(u, s), G(m, l), G(g, d);
							}, [
								() => Dd(t().bg, t()),
								() => Dd(t().surface, t()),
								() => Dd(t().text, t()),
								() => Dd(t().accent, t()),
								() => Dd(t()["accent-text"] ?? t().bg, t()),
								() => Z("preview.heading"),
								() => Z("preview.cardBody"),
								() => Z("preview.button"),
								() => Z("preview.link")
							]), W(e, r);
						};
						var n = L(t), r = L(n, !0);
						j(n);
						var i = z(n, 2);
						Vr(i, 21, () => kd, (e) => e.id, (e, t) => {
							var n = eu();
							let r;
							var i = L(n), a = L(i), o = z(a), s = z(o), c = z(s);
							j(i);
							var l = z(i, 2), u = L(l, !0);
							j(l), j(n), B(() => {
								r = Qr(n, 1, "theme-preset svelte-1n46o8q", null, r, { sel: V(jd) === V(t).id }), X(n, "title", `${V(t).name} - ${V(t).note}`), ei(a, `background:${V(t).light.bg ?? ""}`), ei(o, `background:${V(t).light.surface ?? ""}`), ei(s, `background:${V(t).light.accent ?? ""}`), ei(c, `background:${V(t).light.text ?? ""}`), G(u, V(t).name);
							}), H("click", n, () => Ad(V(t))), W(e, n);
						}), j(i);
						var a = z(i, 2), o = L(a, !0);
						j(a);
						var s = z(a, 2), c = L(s);
						J(c);
						var l = z(c);
						j(s);
						var u = z(s, 2), f = (e) => {
							var t = tu(), n = L(t), r = L(n, !0);
							j(n);
							var i = z(n, 2), a = L(i);
							let o;
							var s = L(a, !0);
							j(a);
							var c = z(a, 2);
							let l;
							var u = L(c, !0);
							j(c), j(i), j(t), B((e, t, n, i) => {
								G(r, e), X(a, "title", t), o = Qr(a, 1, "svelte-1n46o8q", null, o, { on: V(Qn) }), G(s, n), l = Qr(c, 1, "svelte-1n46o8q", null, l, { on: !V(Qn) }), G(u, i);
							}, [
								() => Z("lbl.darkColors"),
								() => Z("hint.theme.autoDark"),
								() => Z("opt.auto"),
								() => Z("opt.custom")
							]), H("click", a, () => Cd(!0)), H("click", c, () => Cd(!1)), W(e, t);
						};
						K(u, (e) => {
							V(Zn) && e(f);
						});
						var p = z(u, 2), h = L(p), g = (e) => {
							var t = nu(), n = L(t, !0);
							j(t), B((e) => G(n, e), [() => Z("lbl.light")]), W(e, t);
						};
						K(h, (e) => {
							V(Zn) && e(g);
						});
						var _ = z(h, 2);
						let Ae;
						var v = L(_, !0);
						j(_), j(p);
						var y = z(p, 2);
						Vr(y, 21, () => Xn, ([e, t, n]) => e, (e, t) => {
							var n = /* @__PURE__ */ N(() => m(V(t), 3));
							let r = () => V(n)[0], i = () => V(n)[1], a = () => V(n)[2];
							var o = ru(), s = L(o);
							{
								let e = /* @__PURE__ */ N(() => V(k).theme.tokens.color[r()] ?? V(k).theme.tokens.color.bg), t = /* @__PURE__ */ N(Yn);
								Ui(s, {
									get value() {
										return V(e);
									},
									get tokens() {
										return V(t);
									},
									get label() {
										return i();
									},
									onchange: (e) => hd(r(), e)
								});
							}
							var c = z(s, 2), l = L(c, !0);
							j(c);
							var u = z(c, 2), d = L(u, !0);
							j(u), j(o), B((e) => {
								G(l, a()), G(d, e);
							}, [() => Dd(V(k).theme.tokens.color[r()] ?? V(k).theme.tokens.color.bg, V(er))]), W(e, o);
						}), j(y);
						var b = z(y, 2), x = (e) => {
							var t = iu(), n = R(t), r = L(n), i = L(r, !0);
							j(r);
							var a = z(r, 2);
							let o;
							var s = L(a, !0);
							j(a), j(n);
							var c = z(n, 2);
							let l;
							Vr(c, 21, () => Xn, ([e, t, n]) => e, (e, t) => {
								var n = /* @__PURE__ */ N(() => m(V(t), 3));
								let r = () => V(n)[0], i = () => V(n)[1], a = () => V(n)[2];
								var o = ru(), s = L(o);
								{
									let e = /* @__PURE__ */ N(() => V(k).theme.alt.tokens.color[r()] ?? V(tr)[r()] ?? V(k).theme.tokens.color.bg), t = /* @__PURE__ */ N(Yn), n = /* @__PURE__ */ N(() => Z("theme.darkColorLabel", { name: i() }));
									Ui(s, {
										get value() {
											return V(e);
										},
										get tokens() {
											return V(t);
										},
										get label() {
											return V(n);
										},
										onchange: (e) => bd(r(), e)
									});
								}
								var c = z(s, 2), l = L(c, !0);
								j(c);
								var u = z(c, 2), d = L(u, !0);
								j(u), j(o), B((e) => {
									G(l, a()), G(d, e);
								}, [() => Dd(V(k).theme.alt.tokens.color[r()] ?? V(tr)[r()], V(tr))]), W(e, o);
							}), j(c), B((e, t, n) => {
								G(i, e), o = Qr(a, 1, "chip svelte-1n46o8q", null, o, { accent: V($n) === "dark" }), X(a, "title", t), G(s, n), l = Qr(c, 1, "palcells svelte-1n46o8q", null, l, { autopal: V(Qn) });
							}, [
								() => Z("lbl.dark"),
								() => Z("tip.theme.darkDefault"),
								() => Z("common.standard")
							]), H("click", a, () => xd("dark")), W(e, t);
						};
						K(b, (e) => {
							V(Zn) && e(x);
						});
						var S = z(b, 2), C = L(S);
						{
							let t = /* @__PURE__ */ N(() => V(Zn) ? Z("lbl.light") : "");
							e(C, () => V(er), () => V(t));
						}
						var w = z(C, 2), T = (t) => {
							{
								let n = /* @__PURE__ */ N(() => Z("lbl.dark"));
								e(t, () => V(tr), () => V(n));
							}
						};
						K(w, (e) => {
							V(Zn) && e(T);
						}), j(S);
						var ee = z(S, 2), te = L(ee), ne = L(te, !0);
						j(te);
						var re = z(te, 2), ie = L(re), ae = L(ie), oe = z(ae);
						{
							let e = /* @__PURE__ */ N(() => wd("heading"));
							Q(oe, {
								get value() {
									return V(k).theme.tokens.font.heading;
								},
								get options() {
									return V(e);
								},
								onchange: (e) => gd("heading", e)
							});
						}
						j(ie);
						var se = z(ie, 2), ce = L(se), le = z(ce);
						{
							let e = /* @__PURE__ */ N(() => wd("body"));
							Q(le, {
								get value() {
									return V(k).theme.tokens.font.body;
								},
								get options() {
									return V(e);
								},
								onchange: (e) => gd("body", e)
							});
						}
						j(se);
						var ue = z(se, 2), de = L(ue), fe = L(de, !0);
						j(de);
						var pe = z(de, 2), me = L(pe, !0);
						j(pe), j(ue), j(re), j(ee);
						var he = z(ee, 2), ge = L(he), _e = L(ge, !0);
						j(ge);
						var ve = z(ge, 2), ye = L(ve), be = L(ye), xe = L(be, !0);
						j(be);
						var Se = z(be, 2), Ce = L(Se, !0);
						j(Se), j(ye);
						var we = z(ye, 2), E = L(we, !0), D = z(E), O = L(D, !0);
						j(D), j(we);
						var Te = z(we, 2);
						J(Te);
						var Ee = z(Te, 2), De = L(Ee, !0), Oe = z(De), A = L(Oe, !0);
						j(Oe), j(Ee);
						var ke = z(Ee, 2);
						J(ke), j(ve), j(he), j(t), B((e, t, n, i, a, u, d, f, p, m, h, g, y, b, x, S, C, w) => {
							G(r, e), G(o, t), X(s, "title", n), ai(c, V(Zn)), G(l, ` ${i ?? ""}`), Ae = Qr(_, 1, "chip svelte-1n46o8q", null, Ae, { accent: V($n) === "light" }), X(_, "title", a), G(v, u), G(ne, d), G(ae, `${f ?? ""} `), G(ce, `${p ?? ""} `), ei(de, `font-family:${V(k).theme.tokens.font.heading ?? ""}`), G(fe, m), ei(pe, `font-family:${V(k).theme.tokens.font.body ?? ""}`), G(me, h), G(_e, g), ei(ye, `--r-sm:${V(k).theme.tokens.radius.sm ?? ""};--r-md:${V(k).theme.tokens.radius.md ?? ""}`), G(xe, y), G(Ce, b), G(E, x), G(O, V(k).theme.tokens.radius.sm), Y(Te, S), G(De, C), G(A, V(k).theme.tokens.radius.md), Y(ke, w);
						}, [
							() => Z("lbl.themePresets"),
							() => Z("lbl.colors"),
							() => Z("tip.theme.dualMode"),
							() => Z("lbl.dualMode"),
							() => Z("tip.theme.defaultScheme"),
							() => Z("common.standard"),
							() => Z("group.typography"),
							() => Z("lbl.headings"),
							() => Z("lbl.bodyText"),
							() => Z("preview.heading"),
							() => Z("preview.bodySample"),
							() => Z("group.shape"),
							() => Z("preview.button"),
							() => Z("preview.card"),
							() => Z("lbl.smallCorners"),
							() => Td(V(k).theme.tokens.radius.sm),
							() => Z("lbl.largeCorners"),
							() => Td(V(k).theme.tokens.radius.md)
						]), H("change", c, (e) => Sd(e.target.checked)), H("click", _, () => xd("light")), H("input", Te, (e) => Ed("sm", Number(e.target.value))), H("input", ke, (e) => Ed("md", Number(e.target.value)));
					}
					W(e, t);
				}, h = (e) => {
					var t = uu();
					let n;
					var r = L(t);
					J(r);
					var i = z(r, 2), a = (e) => {
						var t = jr();
						Vr(R(t), 17, () => Ko(tf(), V(ef), (e) => e.label), (e) => e.label, (e, t) => {
							var n = jr(), r = R(n), i = (e) => {
								var n = ou(), r = L(n), i = z(r);
								j(n), B((e) => {
									X(n, "title", e), G(r, `${V(t).label ?? ""} `);
								}, [() => Z("tip.webpAuto")]), H("change", i, af), W(e, n);
							}, a = (e) => {
								var n = su(), r = L(n), i = z(r);
								j(n), B((e) => {
									X(n, "title", e), G(r, `${V(t).label ?? ""} `);
								}, [() => Z("tip.blocks.galleryImages")]), H("change", i, lf), W(e, n);
							}, o = (e) => {
								var n = Mc(), r = L(n, !0);
								j(n), B(() => G(r, V(t).label)), H("click", n, () => nf(V(t))), W(e, n);
							};
							K(r, (e) => {
								V(t).act === "image" ? e(i) : V(t).act === "galleryImages" ? e(a, 1) : e(o, -1);
							}), W(e, n);
						}, (e) => {
							var t = yc(), n = L(t, !0);
							j(t), B((e) => G(n, e), [() => Z("canvas.searchEmpty")]), W(e, t);
						}), W(e, t);
					}, o = /* @__PURE__ */ N(() => V(ef).trim()), s = (e) => {
						var t = lu(), n = R(t), r = L(n), i = L(r, !0);
						j(r);
						var a = z(r, 2), o = L(a), s = L(o, !0);
						j(o);
						var c = z(o, 2), l = L(c, !0);
						j(c), j(a), j(n);
						var u = z(n, 2), d = L(u, !0);
						j(u);
						var f = z(u, 2), p = L(f), m = z(p);
						j(f);
						var h = z(f, 2), g = L(h, !0);
						j(h);
						var _ = z(h, 2), v = L(_, !0);
						j(_);
						var y = z(_, 2), b = L(y, !0);
						j(y);
						var x = z(y, 2), S = L(x, !0);
						j(x);
						var C = z(x, 2), w = L(C, !0);
						j(C);
						var T = z(C, 2), ee = L(T, !0);
						j(T);
						var te = z(T, 2), ne = L(te, !0);
						j(te);
						var re = z(te, 2), ie = L(re), ae = L(ie, !0);
						j(ie);
						var oe = z(ie, 2), se = L(oe), ce = L(se, !0);
						j(se);
						var le = z(se, 2), ue = L(le), de = z(ue);
						j(le), j(oe), j(re);
						var fe = z(re, 2), pe = L(fe), me = L(pe, !0);
						j(pe);
						var he = z(pe, 2), ge = L(he), _e = L(ge, !0);
						j(ge);
						var ve = z(ge, 2), ye = L(ve, !0);
						j(ve);
						var be = z(ve, 2), xe = L(be, !0);
						j(be);
						var Se = z(be, 2), Ce = L(Se, !0);
						j(Se);
						var we = z(Se, 2), E = L(we, !0);
						j(we), j(he), j(fe);
						var D = z(fe, 2), k = (e) => {
							let t = /* @__PURE__ */ N(() => V(Za).filter((e) => Ya[e]?.data?.mal?.kind === "blocks"));
							var n = cu(), r = L(n), i = L(r, !0);
							j(r);
							var a = z(r, 2);
							Vr(a, 20, () => V(t), (e) => e, (e, t) => {
								var n = Mc(), r = L(n, !0);
								j(n), B((e) => {
									X(n, "title", e), G(r, Ya[t].data.mal.name);
								}, [() => Z("canvas.insertGroup")]), H("click", n, () => O?.sendInsertTemplate(t)), W(e, n);
							}), j(a), j(n), B((e) => G(i, e), [() => Z("canvas.tabMyTemplates")]), W(e, n);
						}, Te = /* @__PURE__ */ N(() => V(Za).some((e) => Ya[e]?.data?.mal?.kind === "blocks"));
						K(D, (e) => {
							V(Te) && e(k);
						});
						var Ee = z(D, 2), De = (e) => {
							var t = cu(), n = L(t), r = L(n, !0);
							j(n);
							var i = z(n, 2);
							Vr(i, 21, () => V(Qd), (e) => e.type, (e, t) => {
								var n = jr(), r = R(n), i = (e) => {
									var n = cu(), r = L(n), i = L(r, !0);
									j(r);
									var a = z(r, 2);
									Vr(a, 21, () => V(t).variants, (e) => e.label, (e, n) => {
										var r = Mc(), i = L(r, !0);
										j(r), B((e) => {
											X(r, "title", e), G(i, V(n).label);
										}, [() => Z("tip.blocks.fromPlugin", { plugin: V(t).plugin })]), H("click", r, () => $d(V(t), V(n).props)), W(e, r);
									}), j(a), j(n), B(() => G(i, V(t).label)), W(e, n);
								}, a = (e) => {
									var n = Mc(), r = L(n, !0);
									j(n), B((e) => {
										X(n, "title", e), G(r, V(t).label);
									}, [() => Z("tip.blocks.fromPlugin", { plugin: V(t).plugin })]), H("click", n, () => $d(V(t))), W(e, n);
								};
								K(r, (e) => {
									V(t).variants?.length ? e(i) : e(a, -1);
								}), W(e, n);
							}), j(i), j(t), B((e) => G(r, e), [() => Z("panel.plugins")]), W(e, t);
						};
						K(Ee, (e) => {
							V(Qd).length && e(De);
						}), B((e, t, n, r, a, o, u, m, re, ie, oe, de, fe, pe, he, ge, ve, be, Se, we, D, O, k, Te, Ee, De, Oe, A, ke, Ae, je, Me) => {
							G(i, e), G(s, t), X(c, "title", n), G(l, r), G(d, a), X(f, "title", o), G(p, `${u ?? ""} `), X(h, "title", m), G(g, re), X(_, "title", ie), G(v, oe), X(y, "title", de), G(b, fe), X(x, "title", pe), G(S, he), X(C, "title", ge), G(w, ve), X(T, "title", be), G(ee, Se), X(te, "title", we), G(ne, D), G(ae, O), X(se, "title", k), G(ce, Te), X(le, "title", Ee), G(ue, `${De ?? ""} `), G(me, Oe), G(_e, A), G(ye, ke), G(xe, Ae), G(Ce, je), G(E, Me);
						}, [
							() => Z("blocks.text"),
							() => Z("blocks.text"),
							() => Z("tip.blocks.textBox"),
							() => Z("ui.textBox"),
							() => Z("blocks.button"),
							() => Z("tip.webpAuto"),
							() => Z("blocks.image"),
							() => Z("tip.blocks.video"),
							() => Z("blocks.video"),
							() => Z("tip.blocks.icon"),
							() => Z("blocks.icon"),
							() => Z("tip.blocks.samling"),
							() => Z("blocks.samling"),
							() => Z("tip.blocks.faq"),
							() => Z("blocks.faq"),
							() => Z("tip.blocks.tidslinje"),
							() => Z("blocks.tidslinje"),
							() => Z("tip.blocks.sitat"),
							() => Z("blocks.sitat"),
							() => Z("tip.blocks.statistikk"),
							() => Z("blocks.statistikk"),
							() => Z("blocks.galleri"),
							() => Z("tip.blocks.gallery"),
							() => Z("ui.emptyGallery"),
							() => Z("tip.blocks.galleryImages"),
							() => Z("ui.galleryWithImages"),
							() => Z("group.shapes"),
							() => Z("shape.line"),
							() => Z("shape.arrow"),
							() => Z("shape.circle"),
							() => Z("shape.rect"),
							() => Z("shape.triangle")
						]), H("click", o, () => Zd("text")), H("click", c, () => Zd("text-box")), H("click", u, () => Zd("button")), H("change", m, af), H("click", h, () => Zd("video")), H("click", _, () => Zd("icon")), H("click", y, () => Zd("samling")), H("click", x, () => Zd("faq")), H("click", C, () => Zd("tidslinje")), H("click", T, () => Zd("sitat")), H("click", te, () => Zd("statistikk")), H("click", se, () => Zd("galleri")), H("change", de, lf), H("click", ge, () => Zd("shape-line")), H("click", ve, () => Zd("shape-arrow")), H("click", be, () => Zd("shape-circle")), H("click", Se, () => Zd("shape-rect")), H("click", we, () => Zd("shape-triangle")), W(e, t);
					};
					K(i, (e) => {
						V(o) ? e(a) : e(s, -1);
					}), j(t), B((e, i, a) => {
						n = Qr(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: V(ae) === "mobile" }), X(t, "title", e), X(r, "placeholder", i), X(r, "title", a);
					}, [
						() => V(ae) === "mobile" ? Z("tip.blocks.mobileLocked") : void 0,
						() => Z("canvas.searchBlocks"),
						() => Z("canvas.searchBlocks")
					]), li(r, () => V(ef), (e) => I(ef, e)), W(e, t);
				}, _ = (e) => {
					var t = du(), n = L(t), r = L(n), i = z(r), a = L(i);
					j(i), j(n);
					var o = z(n, 2);
					J(o);
					var s = z(o, 2), c = L(s);
					J(c);
					var l = z(c);
					j(s), j(t), B((e, t) => {
						G(r, `${e ?? ""} `), G(a, `${V(ee).size ?? ""} px`), Y(o, V(ee).size), ai(c, V(ee).snap !== !1), G(l, ` ${t ?? ""}`);
					}, [() => Z("lbl.gridSize"), () => Z("lbl.gridSnap")]), H("input", o, (e) => yr("size", Number(e.target.value))), H("change", c, (e) => yr("snap", e.target.checked)), W(e, t);
				}, v = (e) => {
					var t = vu(), r = L(t), i = (e) => {
						var t = fu(), n = R(t), r = L(n, !0);
						j(n);
						var i = z(n, 2);
						a(i), B((e) => G(r, e), [() => Z("blocks.suffix", { label: qt[V(M).type] ?? V(M).type })]), W(e, t);
					}, o = (e) => {
						var t = _u(), r = R(t), i = L(r, !0);
						j(r);
						var a = z(r, 2), o = L(a), s = z(o);
						J(s), j(a);
						var l = z(a, 4), u = L(l);
						J(u);
						var d = z(u);
						j(l);
						var f = z(l, 2), p = (e) => {
							var t = pu(), n = R(t), r = L(n), i = z(r), a = L(i);
							j(i), j(n);
							var o = z(n, 2);
							J(o), B((e) => {
								G(r, `${e ?? ""} `), G(a, `${V(Zt).size ?? ""} px`), Y(o, V(Zt).size);
							}, [() => Z("lbl.gridSize")]), H("input", o, (e) => vr("size", Number(e.target.value))), W(e, t);
						};
						K(f, (e) => {
							V(Zt) && e(p);
						});
						var h = z(f, 4), g = L(h, !0);
						j(h);
						var _ = z(h, 2);
						Vr(_, 21, () => [["", "common.standard"], ...Object.entries($o)], ([e, t]) => e, (e, t) => {
							var n = /* @__PURE__ */ N(() => m(V(t), 2));
							let r = () => V(n)[0], i = () => V(n)[1], a = /* @__PURE__ */ N(() => dn(r()));
							var o = mu();
							let s;
							var c = L(o), l = L(c), u = z(l, 2), d = z(u, 2);
							j(c);
							var f = z(c, 2), p = L(f, !0);
							j(f), j(o), B((e, t) => {
								s = Qr(o, 1, "rs-card svelte-1n46o8q", null, s, { on: V(an) === r() }), X(o, "title", e), ei(c, `background: ${V(a).bg ?? ""}`), ei(l, `background: ${V(a).text ?? ""}`), ei(u, `background: ${V(a).surface ?? ""}`), ei(d, `background: ${V(a).accent ?? ""}`), G(p, t);
							}, [() => Z("tip.props.sectionTheme"), () => Z(i())]), H("click", o, () => un(r())), W(e, o);
						}), j(_);
						var v = z(_, 2), y = L(v), b = z(y), x = L(b), S = L(x);
						j(x);
						var C = z(x, 2);
						q(C, () => c.copy, !0), j(C), j(b), j(v);
						var w = z(v, 4), T = L(w, !0);
						j(w);
						var ee = z(w, 2);
						n(ee, () => V(Kn), () => V($t));
						var te = z(ee, 4), ne = L(te), re = z(ne);
						{
							let e = /* @__PURE__ */ N(() => rr(V(en)) ? V(en).type : "");
							Q(re, {
								get value() {
									return V(e);
								},
								get options() {
									return ir;
								},
								onchange: (e) => dr(e || null)
							});
						}
						j(te);
						var ie = z(te, 2), ae = (e) => {
							var t = gu(), n = R(t), r = L(n), i = z(r);
							J(i), j(n);
							var a = z(n, 2), o = L(a), s = z(o);
							J(s), j(a);
							var c = z(a, 2), l = (e) => {
								var t = hu(), n = R(t), r = L(n), i = z(r);
								{
									let e = /* @__PURE__ */ N(() => V(en).props.effect ?? "slide-up"), t = /* @__PURE__ */ N(() => [
										["fade-in", Z("anim.fadeIn")],
										["slide-up", Z("anim.slideUp")],
										["zoom-in", Z("anim.zoomIn")]
									]);
									Q(i, {
										get value() {
											return V(e);
										},
										get options() {
											return V(t);
										},
										onchange: (e) => mr("effect", e)
									});
								}
								j(n);
								var a = z(n, 2), o = L(a), s = z(o);
								J(s), j(a);
								var c = z(a, 2), l = L(c), u = z(l);
								{
									let e = /* @__PURE__ */ N(() => V(en).props.pattern ?? "sequence"), t = /* @__PURE__ */ N(() => [
										["sequence", Z("opt.stagger.sequence")],
										["columns", Z("opt.stagger.columns")],
										["rows", Z("opt.stagger.rows")],
										["center", Z("opt.stagger.center")]
									]);
									Q(u, {
										get value() {
											return V(e);
										},
										get options() {
											return V(t);
										},
										onchange: (e) => mr("pattern", e)
									});
								}
								j(c), B((e, t, i, u, d, f) => {
									X(n, "title", e), G(r, `${t ?? ""} `), X(a, "title", i), G(o, `${u ?? ""} `), Y(s, V(en).props.step ?? 90), X(c, "title", d), G(l, `${f ?? ""} `);
								}, [
									() => Z("tip.props.staggerEffect"),
									() => Z("lbl.staggerEffect"),
									() => Z("tip.props.staggerStep"),
									() => Z("lbl.stepMs"),
									() => Z("tip.props.staggerPattern"),
									() => Z("lbl.pattern")
								]), H("change", s, (e) => pr("step", Number(e.target.value))), W(e, t);
							};
							K(c, (e) => {
								V(en).type === "stagger" && e(l);
							}), B((e, t) => {
								G(r, `${e ?? ""} `), Y(i, V(en).props.duration), G(o, `${t ?? ""} `), Y(s, V(en).props.delay ?? 0);
							}, [() => Z("lbl.durationMs"), () => Z("lbl.delayMs")]), H("change", i, (e) => pr("duration", Number(e.target.value))), H("change", s, (e) => pr("delay", Number(e.target.value))), W(e, t);
						}, oe = /* @__PURE__ */ N(() => rr(V(en)));
						K(ie, (e) => {
							V(oe) && e(ae);
						});
						var se = z(ie, 2), ce = L(se), le = z(ce);
						{
							let e = /* @__PURE__ */ N(() => V(rn)?.type ?? (V(en) && !rr(V(en)) ? V(en).type : ""));
							Q(le, {
								get value() {
									return V(e);
								},
								get options() {
									return or;
								},
								onchange: (e) => fr(e || null)
							});
						}
						j(se), B((e, t, n, r, c, l, f, p, m, _, b, x, w, ee, re) => {
							G(i, e), X(a, "title", t), G(o, `${n ?? ""} `), Y(s, V(Qt)), X(s, "placeholder", r), ai(u, V(Zt) !== null), G(d, ` ${c ?? ""}`), X(h, "title", l), G(g, f), X(v, "title", p), G(y, `${m ?? ""} `), G(S, `#${V(Xt) ?? ""}`), X(C, "title", _), G(T, b), X(te, "title", x), G(ne, `${w ?? ""} `), X(se, "title", ee), G(ce, `${re ?? ""} `);
						}, [
							() => Z("lbl.section"),
							() => Z("hint.props.minHeight"),
							() => Z("lbl.minHeight"),
							() => Z("ph.minHeight"),
							() => Z("lbl.sectionGrid"),
							() => Z("tip.props.sectionTheme"),
							() => Z("lbl.sectionTheme"),
							() => Z("tip.props.anchor"),
							() => Z("lbl.anchor"),
							() => Z("tip.props.copyAnchor"),
							() => Z("lbl.background"),
							() => Z("tip.props.sectionAnim"),
							() => Z("lbl.animIn"),
							() => Z("tip.props.sectionHover"),
							() => Z("lbl.onHover")
						]), H("change", s, (e) => hr(e.target.value)), H("change", u, (e) => _r(e.target.checked)), H("click", C, () => navigator.clipboard?.writeText(`#${V(Xt)}`)), W(e, t);
					}, s = (e) => {
						var t = yc(), n = L(t, !0);
						j(t), B((e) => G(n, e), [() => Z("hint.props.empty")]), W(e, t);
					};
					K(r, (e) => {
						V(M) ? e(i) : V(Xt) ? e(o, 1) : e(s, -1);
					}), j(t), W(e, t);
				}, y = (e) => {
					var t = Eu(), i = L(t), a = L(i);
					J(a);
					var o = z(a);
					j(i);
					var s = z(i, 2), l = (e) => {
						var t = cu(), n = L(t), r = L(n, !0);
						j(n);
						var i = z(n, 2);
						Vr(i, 21, () => V(k).pages ?? [], (e) => e.id, (e, t) => {
							var n = Oc(), r = L(n);
							J(r);
							var i = z(r);
							j(n), B((e, a) => {
								X(n, "title", e), ai(r, a), G(i, ` ${(V(t).title || V(t).id) ?? ""}`);
							}, [() => Z("tip.footer.hideOnPage"), () => !(V(k).footer?.hideOn ?? []).includes(V(t).id)]), H("change", r, (e) => ws(V(t).id, e.target.checked)), W(e, n);
						}), j(i), j(t), B((e) => G(r, e), [() => Z("group.showOnPages")]), W(e, t);
					};
					K(s, (e) => {
						V(k).footer?.show && e(l);
					});
					var u = z(s, 2), d = L(u), f = L(d, !0);
					j(d);
					var p = z(d, 2), m = L(p);
					Vr(m, 21, () => cs, (e) => e.id, (e, t) => {
						var n = yu(), r = L(n);
						q(r, () => qs(V(t).thumb), !0), j(r);
						var i = z(r, 2), a = L(i, !0);
						j(i), j(n), B((e) => {
							X(n, "title", e), G(a, V(t).label);
						}, [() => Z("tip.footer.template", { label: V(t).label })]), H("click", n, () => us(V(t).id)), W(e, n);
					}), j(m), j(p), j(u);
					var h = z(u, 2), g = L(h), _ = L(g, !0);
					j(g);
					var v = z(g, 2), y = L(v), b = L(y), x = z(b);
					J(x), j(y);
					var S = z(y, 2), C = L(S), w = z(C);
					J(w), j(S);
					var T = z(S, 2), ee = L(T), te = z(ee);
					{
						let e = /* @__PURE__ */ N(() => V(k).footer?.brand?.mode ?? "text"), t = /* @__PURE__ */ N(() => [
							["text", Z("blocks.text")],
							["image", Z("opt.brand.image")],
							["both", Z("opt.brand.both")]
						]);
						Q(te, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => Qo(e)
						});
					}
					j(T);
					var ne = z(T, 2), re = (e) => {
						var t = xu(), n = R(t), r = L(n), i = L(r), a = z(i);
						j(r);
						var o = z(r, 2), s = (e) => {
							var t = ec();
							q(t, () => c.cross, !0), j(t), B((e) => X(t, "title", e), [() => Z("tip.footer.removeLogo")]), H("click", t, as), W(e, t);
						};
						K(o, (e) => {
							V(k).footer?.brand?.logo && e(s);
						}), j(n);
						var l = z(n, 2), u = (e) => {
							var t = bu(), n = R(t), r = L(n), i = z(r), a = L(i);
							j(i), j(n);
							var o = z(n, 2);
							J(o), B((e) => {
								G(r, `${e ?? ""} `), G(a, `${V(k).footer?.brand?.logoHeight ?? 40 ?? ""} px`), Y(o, V(k).footer?.brand?.logoHeight ?? 40);
							}, [() => Z("lbl.logoHeight")]), H("input", o, (e) => os(e.target.value)), W(e, t);
						};
						K(l, (e) => {
							V(k).footer?.brand?.logo && e(u);
						}), B((e, t) => {
							X(r, "title", e), G(i, `${t ?? ""} `);
						}, [() => Z("tip.webpAutoPublish"), () => V(k).footer?.brand?.logo ? Z("ui.changeLogo") : Z("ui.uploadLogo")]), H("change", a, is), W(e, t);
					};
					K(ne, (e) => {
						(V(k).footer?.brand?.mode ?? "text") !== "text" && e(re);
					}), j(v), j(h);
					var ie = z(h, 2), ae = L(ie), oe = L(ae, !0);
					j(ae);
					var se = z(ae, 2), ce = L(se);
					Vr(ce, 17, () => V(k).footer?.columns ?? [], Lr, (e, t, n) => {
						var r = Su(), i = R(r), a = L(i);
						J(a);
						var o = z(a, 2), s = L(o);
						q(s, () => c.plus, !0), j(s);
						var l = z(s, 2);
						l.disabled = n === 0, q(l, () => c.up, !0), j(l);
						var u = z(l, 2);
						q(u, () => c.down, !0), j(u);
						var d = z(u, 2);
						q(d, () => c.cross, !0), j(d), j(o), j(i), Vr(z(i, 2), 17, () => V(t).links ?? [], Lr, (e, r, i) => {
							var a = hc(), o = L(a);
							J(o);
							var s = z(o, 2), l = L(s);
							l.disabled = i === 0, q(l, () => c.up, !0), j(l);
							var u = z(l, 2);
							q(u, () => c.down, !0), j(u);
							var d = z(u, 2);
							q(d, () => c.cross, !0), j(d), j(s);
							var f = z(s, 2), p = L(f);
							{
								let e = /* @__PURE__ */ N(() => V(r).page ?? "__href"), t = /* @__PURE__ */ N(() => Z("tip.linkTarget")), a = /* @__PURE__ */ N(() => [...V(k).pages.map((e) => [e.id, e.title]), ["__href", Z("opt.linkHref")]]);
								Q(p, {
									get value() {
										return V(e);
									},
									get title() {
										return V(t);
									},
									get options() {
										return V(a);
									},
									onchange: (e) => Ns(n, i, e)
								});
							}
							j(f);
							var m = z(f, 2), h = (e) => {
								var t = mc();
								J(t), B((e, n) => {
									Y(t, V(r).href ?? ""), X(t, "placeholder", e), X(t, "title", n);
								}, [() => Z("ph.hrefAnchor"), () => Z("tip.hrefAnchor")]), H("change", t, (e) => Ps(n, i, e.target.value)), W(e, t);
							};
							K(m, (e) => {
								V(r).page || e(h);
							}), j(a), B((e, n) => {
								Y(o, V(r).label), X(o, "title", e), u.disabled = i === V(t).links.length - 1, X(d, "title", n);
							}, [() => Z("tip.linkLabel"), () => Z("tip.removeLink")]), H("input", o, (e) => Ms(n, i, e.target.value)), H("click", l, () => js(n, i, -1)), H("click", u, () => js(n, i, 1)), H("click", d, () => As(n, i)), W(e, a);
						}), B((e, r, i) => {
							Y(a, V(t).title), X(a, "title", e), X(s, "title", r), u.disabled = n === V(k).footer.columns.length - 1, X(d, "title", i);
						}, [
							() => Z("tip.footer.columnTitle"),
							() => Z("tip.footer.addLink"),
							() => Z("tip.footer.removeColumn")
						]), H("input", a, (e) => Os(n, e.target.value)), H("click", s, () => ks(n)), H("click", l, () => Ds(n, -1)), H("click", u, () => Ds(n, 1)), H("click", d, () => Es(n)), W(e, r);
					});
					var le = z(ce, 2), ue = L(le, !0);
					j(le);
					var de = z(le, 2), fe = L(de), pe = z(fe);
					{
						let e = /* @__PURE__ */ N(() => V(k).footer?.columnsAlign ?? "left"), t = /* @__PURE__ */ N(() => [["left", Z("common.left")], ["center", Z("common.center")]]);
						Q(pe, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => bs(e)
						});
					}
					j(de), j(se), j(ie);
					var me = z(ie, 2), he = L(me), ge = L(he, !0);
					j(he);
					var _e = z(he, 2), ve = L(_e);
					Vr(ve, 17, () => V(k).footer?.social ?? [], Lr, (e, t, n) => {
						var r = Cu(), i = L(r), a = L(i);
						q(a, () => da(V(t).icon) || "", !0), j(a);
						var o = z(a, 2);
						{
							let e = /* @__PURE__ */ N(() => Z("blocks.icon"));
							Q(o, {
								get value() {
									return V(t).icon;
								},
								get title() {
									return V(e);
								},
								get options() {
									return Bs;
								},
								onchange: (e) => Rs(n, e)
							});
						}
						j(i);
						var s = z(i, 2), l = L(s);
						l.disabled = n === 0, q(l, () => c.up, !0), j(l);
						var u = z(l, 2);
						q(u, () => c.down, !0), j(u);
						var d = z(u, 2);
						q(d, () => c.cross, !0), j(d), j(s);
						var f = z(s, 2);
						J(f), j(r), B((e, r) => {
							u.disabled = n === V(k).footer.social.length - 1, X(d, "title", e), Y(f, V(t).url), X(f, "placeholder", r);
						}, [() => Z("tip.removeLink"), () => Z("ph.hrefMailto")]), H("click", l, () => Ls(n, -1)), H("click", u, () => Ls(n, 1)), H("click", d, () => Is(n)), H("change", f, (e) => zs(n, e.target.value)), W(e, r);
					});
					var ye = z(ve, 2), be = L(ye, !0);
					j(ye), j(_e), j(me);
					var xe = z(me, 2), Se = L(xe), Ce = L(Se, !0);
					j(Se);
					var we = z(Se, 2), E = L(we), D = L(E);
					J(D);
					var O = z(D);
					j(E);
					var Te = z(E, 2), Ee = (e) => {
						let t = /* @__PURE__ */ N(() => V(k).footer.cta);
						var n = Tu(), r = R(n), i = L(r), a = z(i);
						{
							let e = /* @__PURE__ */ N(() => V(t).kind ?? "button"), n = /* @__PURE__ */ N(() => [["button", Z("opt.cta.button")], ["newsletter", Z("opt.cta.newsletter")]]);
							Q(a, {
								get value() {
									return V(e);
								},
								get options() {
									return V(n);
								},
								onchange: (e) => Ss("kind", e)
							});
						}
						j(r);
						var o = z(r, 2), s = L(o);
						J(s);
						var c = z(s);
						j(o);
						var l = z(o, 2), u = L(l), d = z(u);
						J(d), j(l);
						var f = z(l, 2), p = L(f), m = z(p);
						J(m), j(f);
						var h = z(f, 2), g = L(h), _ = z(g);
						J(_), j(h);
						var v = z(h, 2), y = (e) => {
							var n = wu(), r = R(n), i = L(r), a = z(i);
							{
								let e = /* @__PURE__ */ N(() => V(t).page ?? "__href"), n = /* @__PURE__ */ N(() => [...V(k).pages.map((e) => [e.id, e.title]), ["__href", Z("opt.linkHrefMailto")]]);
								Q(a, {
									get value() {
										return V(e);
									},
									get options() {
										return V(n);
									},
									onchange: (e) => Cs(e)
								});
							}
							j(r);
							var o = z(r, 2), s = (e) => {
								var n = Ec();
								J(n), B((e, r) => {
									Y(n, V(t).href ?? ""), X(n, "placeholder", e), X(n, "title", r);
								}, [() => Z("ph.hrefMailtoAnchor"), () => Z("tip.hrefAnchor")]), H("change", n, (e) => Ss("href", e.target.value)), W(e, n);
							};
							K(o, (e) => {
								V(t).page || e(s);
							}), B((e, t) => {
								X(r, "title", e), G(i, `${t ?? ""} `);
							}, [() => Z("tip.footer.ctaTarget"), () => Z("lbl.buttonTarget")]), W(e, n);
						}, b = (e) => {
							var n = wc(), r = R(n), i = L(r), a = z(i);
							J(a), j(r);
							var o = z(r, 2), s = L(o), c = z(s);
							J(c), j(o);
							var l = z(o, 2), u = L(l), d = z(u);
							J(d), j(l), B((e, n, f, p, m, h, g, _, v) => {
								X(r, "title", e), G(i, `${n ?? ""} `), Y(a, V(t).endpoint ?? ""), X(a, "placeholder", f), X(o, "title", p), G(s, `${m ?? ""} `), Y(c, V(t).recipient ?? ""), X(c, "placeholder", h), X(l, "title", g), G(u, `${_ ?? ""} `), Y(d, V(t).success ?? ""), X(d, "placeholder", v);
							}, [
								() => Z("tip.footer.ctaEndpoint"),
								() => Z("lbl.newsletterEndpoint"),
								() => Z("ph.endpoint"),
								() => Z("tip.footer.ctaRecipient"),
								() => Z("lbl.recipientFallback"),
								() => Z("ph.email"),
								() => Z("tip.footer.ctaSuccess"),
								() => Z("lbl.confirmation"),
								() => Z("ph.footer.ctaSuccess")
							]), H("change", a, (e) => Ss("endpoint", e.target.value)), H("change", c, (e) => Ss("recipient", e.target.value)), H("input", d, (e) => Ss("success", e.target.value)), W(e, n);
						};
						K(v, (e) => {
							(V(t).kind ?? "button") === "button" ? e(y) : e(b, -1);
						}), B((e, n, a, v, y, b, x, S, C, w, T, ee) => {
							X(r, "title", e), G(i, `${n ?? ""} `), X(o, "title", a), ai(s, V(t).big === !0), G(c, ` ${v ?? ""}`), X(l, "title", y), G(u, `${b ?? ""} `), Y(d, V(t).heading ?? ""), X(d, "placeholder", x), X(f, "title", S), G(p, `${C ?? ""} `), Y(m, V(t).sub ?? ""), X(h, "title", w), G(g, `${T ?? ""} `), Y(_, V(t).label ?? ""), X(_, "placeholder", ee);
						}, [
							() => Z("tip.footer.ctaKind"),
							() => Z("common.type"),
							() => Z("tip.footer.ctaBig"),
							() => Z("lbl.bigCentered"),
							() => Z("tip.footer.ctaHeading"),
							() => Z("lbl.heading"),
							() => Z("ph.footer.ctaHeading"),
							() => Z("tip.footer.ctaSub"),
							() => Z("lbl.subText"),
							() => Z("tip.footer.ctaLabel"),
							() => Z("lbl.buttonText"),
							() => Z("ph.footer.ctaLabel")
						]), H("change", s, (e) => Ss("big", e.target.checked)), H("input", d, (e) => Ss("heading", e.target.value)), H("input", m, (e) => Ss("sub", e.target.value)), H("input", _, (e) => Ss("label", e.target.value)), W(e, n);
					};
					K(Te, (e) => {
						V(k).footer?.cta && e(Ee);
					}), j(we), j(xe);
					var De = z(xe, 2), Oe = L(De), A = L(Oe, !0);
					j(Oe);
					var ke = z(Oe, 2), Ae = L(ke);
					r(Ae, () => "linkRow", () => V(k).footer?.linkRow ?? []);
					var je = z(Ae, 2), Me = L(je, !0);
					j(je), j(ke), j(De);
					var Pe = z(De, 2), Fe = L(Pe), Ie = L(Fe, !0);
					j(Fe);
					var Le = z(Fe, 2), Re = L(Le), ze = (e) => {
						var t = Jc(), n = R(t), r = L(n), i = z(r);
						{
							let e = /* @__PURE__ */ N(() => V(k).footer?.align ?? "left"), t = /* @__PURE__ */ N(() => [
								["left", Z("common.left")],
								["center", Z("common.center")],
								["right", Z("common.right")]
							]);
							Q(i, {
								get value() {
									return V(e);
								},
								get options() {
									return V(t);
								},
								onchange: (e) => Yo("footer", (t) => {
									t.align = e;
								})
							});
						}
						j(n), Ne(2), B((e, t) => {
							X(n, "title", e), G(r, `${t ?? ""} `);
						}, [() => Z("tip.footer.align"), () => Z("lbl.align")]), W(e, t);
					};
					K(Re, (e) => {
						V(k).footer?.cta?.big !== !0 && e(ze);
					});
					var Be = z(Re, 2), Ve = L(Be, !0);
					j(Be);
					var He = z(Be, 2);
					n(He, () => Jn, () => V(k).footer?.background?.layers ?? []), j(Le), j(Pe);
					var Ue = z(Pe, 2), We = L(Ue), Ge = L(We, !0);
					j(We);
					var Ke = z(We, 2), qe = L(Ke), Je = L(qe), Ye = z(Je);
					J(Ye), j(qe);
					var Xe = z(qe, 2), Ze = L(Xe, !0);
					j(Xe);
					var Qe = z(Xe, 2);
					r(Qe, () => "baseline", () => V(k).footer?.baseline ?? []);
					var $e = z(Qe, 2), et = L($e, !0);
					j($e), j(Ke), j(Ue), j(t), B((e, t, n, r, s, c, l, u, d, p, m, h, g, v, te, ne, re, ie, ae, se, ce, le, pe, me, he, _e, ve, ye, xe, Se, we, Te) => {
						X(i, "title", e), ai(a, t), G(o, ` ${n ?? ""}`), G(f, r), G(_, s), X(y, "title", c), G(b, `${l ?? ""} `), Y(x, V(k).footer?.brand?.title ?? ""), X(x, "placeholder", u), X(S, "title", d), G(C, `${p ?? ""} `), Y(w, V(k).footer?.brand?.tagline ?? ""), X(T, "title", m), G(ee, `${h ?? ""} `), G(oe, g), G(ue, v), X(de, "title", te), G(fe, `${ne ?? ""} `), G(ge, re), G(be, ie), G(Ce, ae), X(E, "title", se), ai(D, ce), G(O, ` ${le ?? ""}`), G(A, pe), G(Me, me), G(Ie, he), G(Ve, _e), G(Ge, ve), X(qe, "title", ye), G(Je, `${xe ?? ""} `), Y(Ye, V(k).footer?.copyright ?? ""), X(Ye, "placeholder", Se), G(Ze, we), G(et, Te);
					}, [
						() => Z("tip.footer.show"),
						() => !!V(k).footer?.show,
						() => Z("lbl.showFooter"),
						() => Z("group.startpoint"),
						() => Z("group.brand"),
						() => Z("tip.footer.brandTitle"),
						() => Z("lbl.title"),
						() => Z("ph.footer.brandTitle"),
						() => Z("tip.footer.tagline"),
						() => Z("lbl.tagline"),
						() => Z("tip.footer.brandMode"),
						() => Z("lbl.brandMode"),
						() => Z("group.columns"),
						() => Z("ui.addColumn"),
						() => Z("tip.footer.columnsAlign"),
						() => Z("lbl.splitColumnAlign"),
						() => Z("group.social"),
						() => Z("ui.addSocial"),
						() => Z("group.cta"),
						() => Z("tip.footer.cta"),
						() => !!V(k).footer?.cta,
						() => Z("lbl.showCta"),
						() => Z("group.linkRow"),
						() => Z("ui.addRowLink"),
						() => Z("group.appearance"),
						() => Z("lbl.background"),
						() => Z("group.baseline"),
						() => Z("tip.footer.copyright"),
						() => Z("lbl.copyright"),
						() => Z("ph.footer.copyright"),
						() => Z("lbl.baselineLinks"),
						() => Z("ui.addBaselineLink")
					]), H("change", a, (e) => Yo("footer", (t) => {
						t.show = e.target.checked;
					})), H("input", x, (e) => Zo("title", e.target.value)), H("input", w, (e) => Zo("tagline", e.target.value)), H("click", le, Ts), H("click", ye, Fs), H("change", D, (e) => xs(e.target.checked)), H("click", je, () => ds("linkRow")), H("input", Ye, (e) => ss(e.target.value)), H("click", $e, () => ds("baseline")), W(e, t);
				}, b = (e) => {
					var t = Au(), n = L(t), r = (e) => {
						var t = gc(), n = L(t), r = z(n);
						{
							let e = /* @__PURE__ */ N(() => V(za) ?? ""), t = /* @__PURE__ */ N(() => [["", Z("common.choose")], ...V(Ia).map((e) => [e, V(La)[e]?.name ?? e])]);
							Q(r, {
								get value() {
									return V(e);
								},
								get options() {
									return V(t);
								},
								onchange: (e) => I(za, e || null, !0)
							});
						}
						j(t), B((e) => G(n, `${e ?? ""} `), [() => Z("blocks.samling")]), W(e, t);
					};
					K(n, (e) => {
						V(Ia).length && e(r);
					});
					var i = z(n, 2), a = (e) => {
						let t = /* @__PURE__ */ N(() => V(La)[V(za)]);
						var n = ku(), r = R(n), i = L(r), a = L(i, !0);
						j(i);
						var o = z(i, 2);
						q(o, () => c.cross, !0), j(o), j(r);
						var s = z(r, 2);
						Vr(s, 19, () => V(t).entries, (e) => e.id, (e, n, r) => {
							var i = Ou(), a = L(i), o = L(a);
							j(a);
							var s = z(a, 2), l = L(s), u = L(l);
							J(u);
							var d = z(u, 2), f = L(d);
							q(f, () => c.up, !0), j(f);
							var p = z(f, 2);
							q(p, () => c.down, !0), j(p);
							var m = z(p, 2);
							q(m, () => c.cross, !0), j(m), j(d), j(l);
							var h = z(l, 2), g = L(h), _ = z(g);
							J(_), j(h);
							var v = z(h, 2);
							st(v);
							var y = z(v, 2), b = L(y), x = z(b);
							J(x), j(y);
							var S = z(y, 2), C = L(S), w = L(C), T = z(w);
							j(C);
							var ee = z(C, 2), te = (e) => {
								var t = Du(), r = R(t), i = z(r, 2);
								q(i, () => c.cross, !0), j(i), B((e) => {
									X(r, "src", V(n).image), X(i, "title", e);
								}, [() => Z("tip.removeImage")]), H("click", i, () => po(V(za), V(n).id, "image", "")), W(e, t);
							};
							K(ee, (e) => {
								V(n).image && e(te);
							}), j(S), j(s), j(i), B((e, i, a, s, c, l, d, h) => {
								G(o, `${e ?? ""}${V(n).date ? ` · ${V(n).date}` : ""}`), Y(u, V(n).title), X(u, "title", i), f.disabled = V(r) === 0, p.disabled = V(r) === V(t).entries.length - 1, X(m, "title", a), G(g, `${s ?? ""} `), Y(_, V(n).date ?? ""), X(v, "placeholder", c), Y(v, V(n).text ?? ""), G(b, `${l ?? ""} `), Y(x, V(n).href ?? ""), X(x, "placeholder", d), G(w, `${h ?? ""} `);
							}, [
								() => V(n).title.replace(/<[^>]*>/g, ""),
								() => Z("lbl.title"),
								() => Z("tip.collections.deleteEntry"),
								() => Z("lbl.date"),
								() => Z("ph.collections.text"),
								() => Z("lbl.link"),
								() => Z("ph.collections.href"),
								() => V(n).image ? Z("ui.changeImage") : Z("ui.addImage")
							]), H("change", u, (e) => po(V(za), V(n).id, "title", e.target.value || "Uten tittel")), H("click", f, () => mo(V(za), V(r), -1)), H("click", p, () => mo(V(za), V(r), 1)), H("click", m, () => ho(V(za), V(n).id)), H("change", _, (e) => po(V(za), V(n).id, "date", e.target.value)), H("change", v, (e) => po(V(za), V(n).id, "text", e.target.value)), H("change", x, (e) => po(V(za), V(n).id, "href", e.target.value)), H("change", T, (e) => go(V(za), V(n).id, e)), W(e, i);
						});
						var l = z(s, 2), u = (e) => {
							var t = yc(), n = L(t, !0);
							j(t), B((e) => G(n, e), [() => Z("hint.collections.empty")]), W(e, t);
						};
						K(l, (e) => {
							V(t).entries.length || e(u);
						}), Ne(2), B((e, t) => {
							G(a, e), X(o, "title", t);
						}, [() => Z("ui.addEntry"), () => Z("tip.collections.deleteCollection")]), H("click", i, () => fo(V(za))), H("click", o, () => uo(V(za))), W(e, n);
					};
					K(i, (e) => {
						V(za) && V(La)[V(za)] && e(a);
					});
					var o = z(i, 2), s = L(o), l = z(s);
					J(l), j(o);
					var u = z(o, 2), d = L(u);
					Q(z(d), {
						get value() {
							return V(Ua);
						},
						get options() {
							return Wa;
						},
						onchange: (e) => I(Ua, e, !0)
					}), j(u);
					var f = z(u, 2), p = L(f, !0);
					j(f), j(t), B((e, t, n, r, i) => {
						G(s, `${e ?? ""} `), X(l, "placeholder", t), G(d, `${n ?? ""} `), f.disabled = r, G(p, i);
					}, [
						() => Z("lbl.newCollectionName"),
						() => Z("ph.collections.name"),
						() => Z("common.type"),
						() => !V(Ba).trim(),
						() => Z("ui.createCollection")
					]), H("keydown", l, (e) => e.key === "Enter" && lo()), li(l, () => V(Ba), (e) => I(Ba, e)), H("click", f, lo), W(e, t);
				}, x = (e) => {
					var t = Lu(), n = L(t), r = (e) => {
						var t = yc(), n = L(t, !0);
						j(t), B((e) => G(n, e), [() => Z("hint.plugins.empty")]), W(e, t);
					}, i = /* @__PURE__ */ N(() => !jo().length);
					K(n, (e) => {
						V(i) && e(r);
					});
					var a = z(n, 2);
					Vr(a, 16, jo, (e) => e, (e, t) => {
						let n = /* @__PURE__ */ N(() => wo[t]), r = /* @__PURE__ */ N(() => (V(Co)?.enabled ?? []).includes(t));
						var i = Nu();
						let a;
						var o = L(i), s = L(o), l = L(s, !0);
						j(s);
						var u = z(s, 2), d = (e) => {
							var t = ju(), r = L(t);
							j(t), B(() => G(r, `v${V(n).version ?? ""}`)), W(e, t);
						};
						K(u, (e) => {
							V(n)?.version && e(d);
						});
						var f = z(u, 2), p = L(f), m = L(p);
						J(m);
						var h = z(m);
						j(p);
						var g = z(p, 2);
						q(g, () => c.cross, !0), j(g), j(f), j(o);
						var _ = z(o, 2), v = (e) => {
							var t = Mu(), r = L(t, !0);
							j(t), B((e) => G(r, e), [() => V(n).errors.join("; ")]), W(e, t);
						}, y = (e) => {
							var t = Mu(), r = L(t, !0);
							j(t), B((e) => G(r, e), [() => Z("plugin.engineMismatch", {
								required: V(n).requiresEngine,
								current: V(To)
							})]), W(e, t);
						}, b = (e) => {
							var t = Mu(), r = L(t, !0);
							j(t), B((e) => G(r, e), [() => Z("plugin.cspNeeded", { list: Fo(V(n).csp).join(", ") })]), W(e, t);
						}, x = /* @__PURE__ */ N(() => V(n)?.csp && Fo(V(n).csp).length);
						K(_, (e) => {
							V(n)?.errors?.length ? e(v) : V(n) && !V(n).satisfied ? e(y, 1) : V(x) && e(b, 2);
						});
						var S = z(_, 2), C = (e) => {
							var t = yc(), r = L(t, !0);
							j(t), B((e) => G(r, e), [() => Z("plugin.languages", { list: V(n).languages.map((e) => e.name).join(", ") })]), W(e, t);
						};
						K(S, (e) => {
							V(n)?.languages?.length && e(C);
						}), j(i), B((e, t, o, s, c) => {
							a = Qr(i, 1, "plugin-row svelte-1n46o8q", null, a, { "plugin-broken": V(n)?.errors?.length }), G(l, e), X(p, "title", t), ai(m, V(r)), m.disabled = o, G(h, ` ${s ?? ""}`), X(g, "title", c);
						}, [
							() => V(n)?.names?.[Di()] ?? V(n)?.name ?? t,
							() => V(r) ? Z("tip.plugins.on") : Z("tip.plugins.off"),
							() => !!V(n)?.errors?.length,
							() => V(r) ? Z("ui.on") : Z("ui.off"),
							() => Z("tip.plugins.remove")
						]), H("change", m, (e) => Vo(t, e.target.checked)), H("click", g, () => Go(t)), W(e, i);
					});
					var o = z(a, 2), s = (e) => {
						var t = Fu(), n = z(R(t), 2), r = L(n, !0);
						j(n), Vr(z(n, 2), 16, () => V(Oo), (e) => e, (e, t) => {
							var n = Pu(), r = L(n), i = L(r), a = L(i, !0);
							j(i);
							var o = z(i, 2), s = (e) => {
								var n = ju(), r = L(n);
								j(n), B(() => G(r, `v${wo[t].version ?? ""}`)), W(e, n);
							};
							K(o, (e) => {
								wo[t]?.version && e(s);
							});
							var l = z(o, 2), u = L(l);
							q(u, () => c.right, !0), j(u), j(l), j(r), j(n), B((e, t) => {
								G(a, e), X(u, "title", t);
							}, [() => wo[t]?.names?.[Di()] ?? wo[t]?.name ?? t, () => Z("tip.plugins.addFound")]), H("click", u, () => Jo(t)), W(e, n);
						}), B((e) => G(r, e), [() => Z("hint.plugins.found")]), W(e, t);
					};
					K(o, (e) => {
						V(Oo).length && e(s);
					});
					var l = z(o, 2), u = (e) => {
						var t = jr(), n = R(t), r = (e) => {
							var t = yc(), n = L(t, !0);
							j(t), B((e) => G(n, e), [() => Z("hint.plugins.autoDiscover")]), W(e, t);
						};
						K(n, (e) => {
							V(Oo).length || e(r);
						}), W(e, t);
					}, d = (e) => {
						var t = Iu(), n = z(R(t), 2);
						J(n);
						var r = z(n, 2), i = L(r, !0);
						j(r);
						var a = z(r, 2), o = (e) => {
							var t = Mu(), n = L(t, !0);
							j(t), B(() => G(n, V(Do))), W(e, t);
						};
						K(a, (e) => {
							V(Do) && e(o);
						}), B((e, t, a) => {
							X(n, "placeholder", e), r.disabled = t, G(i, a);
						}, [
							() => Z("ph.plugins.folder"),
							() => !V(Eo).trim(),
							() => Z("ui.addPlugin")
						]), H("keydown", n, (e) => e.key === "Enter" && qo()), li(n, () => V(Eo), (e) => I(Eo, e)), H("click", r, qo), W(e, t);
					};
					K(l, (e) => {
						V(Ao) === "ok" ? e(u) : e(d, -1);
					}), j(t), W(e, t);
				}, S = (e) => {
					var t = vu(), n = L(t), r = (e) => {
						var t = yc(), n = L(t, !0);
						j(t), B((e) => G(n, e), [() => Z("hint.history.loading")]), W(e, t);
					}, i = (e) => {
						var t = Bu(), n = R(t), r = (e) => {
							var t = yc(), n = L(t, !0);
							j(t), B(() => G(n, V(Dr))), W(e, t);
						};
						K(n, (e) => {
							V(Dr) && e(r);
						});
						var i = z(n, 2), a = (e) => {
							var t = zu(), n = R(t), r = L(n, !0);
							j(n), Vr(z(n, 2), 19, () => V(Er), (e) => e.sha, (e, t, n) => {
								var r = Ru();
								let i;
								var a = L(r), o = L(a, !0);
								j(a);
								var s = z(a, 2), c = L(s);
								j(s), j(r), B((e) => {
									i = Qr(r, 1, "history-row svelte-1n46o8q", null, i, { head: V(n) === 0 }), X(a, "title", V(t).sha), G(o, V(t).message), G(c, `${V(t).author ?? ""}${e ?? ""}`);
								}, [() => V(t).date ? ` · ${U.format(new Date(V(t).date))}` : ""]), W(e, r);
							}), B((e, t) => {
								n.disabled = V(Or) || !V(T)?.allowed, X(n, "title", e), G(r, t);
							}, [() => V(T)?.allowed ? Z("tip.history.revert") : Z("tip.history.needsAccess"), () => Z("ui.revertLast")]), H("click", n, Mr), W(e, t);
						};
						K(i, (e) => {
							V(Er).length > 0 && e(a);
						}), W(e, t);
					};
					K(n, (e) => {
						V(Er) === null ? e(r) : e(i, -1);
					}), j(t), W(e, t);
				}, C = (e) => {
					var t = vu(), n = L(t), r = (e) => {
						var t = yc(), n = L(t, !0);
						j(t), B((e) => G(n, e), [() => Z("update.checking")]), W(e, t);
					}, i = (e) => {
						var t = Vu(), n = R(t), r = L(n, !0);
						j(n);
						var i = z(n, 2), a = L(i, !0);
						j(i), B((e) => {
							G(r, V(Fr)), G(a, e);
						}, [() => Z("update.retry")]), H("click", i, zr), W(e, t);
					}, a = (e) => {
						var t = Qu(), n = R(t), r = L(n), i = L(r, !0);
						j(r);
						var a = z(r, 2), o = (e) => {
							var t = Hu(), n = R(t);
							q(n, () => c.right, !0), j(n);
							var r = z(n, 2), i = L(r, !0);
							j(r), B(() => G(i, V(Pr).target)), W(e, t);
						};
						K(a, (e) => {
							V(Pr).upToDate || e(o);
						}), j(n);
						var s = z(n, 2), l = (e) => {
							var t = yc(), n = L(t, !0);
							j(t), B((e) => G(n, e), [() => Z("update.upToDate")]), W(e, t);
						}, u = (e) => {
							var t = Zu(), n = R(t), r = L(n, !0);
							j(n);
							var i = z(n, 2), a = (e) => {
								var t = Uu(), n = L(t), r = L(n, !0);
								j(n);
								var i = z(n, 2), a = L(i), o = L(a, !0);
								j(a), j(i), j(t), B((e) => {
									G(r, e), G(o, V(Pr).notes);
								}, [() => Z("update.aboutVersion", { target: V(Pr).target })]), W(e, t);
							};
							K(i, (e) => {
								V(Pr).notes && e(a);
							});
							var o = z(i, 2), s = (e) => {
								var t = Wu(), n = L(t), r = L(n);
								q(r, () => c.warn, !0), j(r);
								var i = z(r);
								j(n);
								var a = z(n, 2), o = L(a), s = L(o, !0);
								j(o), j(a), j(t), B((e, t) => {
									X(n, "title", e), G(i, ` ${t ?? ""}`), G(s, V(Pr).headers.upstream);
								}, [() => Z("update.headersManual"), () => Z("update.headersTitle")]), W(e, t);
							};
							K(o, (e) => {
								V(Pr).headers?.upstream && e(s);
							});
							var l = z(o, 2);
							Vr(l, 17, () => V(Pr).changes.filter((e) => e.atom && e.conflict), (e) => e.path, (e, t) => {
								var n = Ku(), r = L(n), i = L(r, !0);
								j(r);
								var a = z(r, 2), o = L(a), s = (e) => {
									var t = Gu(), n = L(t, !0);
									j(t), B((e) => G(n, e), [() => Z("update.actionDelete")]), W(e, t);
								};
								K(o, (e) => {
									V(t).action === "delete" && e(s);
								});
								var l = z(o, 2);
								q(l, () => c.warn, !0), j(l), j(a), j(n), B((e) => {
									X(r, "title", V(t).path), G(i, V(t).path), X(l, "title", e);
								}, [() => Z(`update.conflict.${V(t).conflict}`)]), W(e, n);
							});
							var u = z(l, 2), d = L(u), f = L(d);
							j(d);
							var p = z(d, 2);
							Vr(p, 21, () => V(Pr).changes.filter((e) => e.atom && !e.conflict), (e) => e.path, (e, t) => {
								var n = qu(), r = L(n), i = L(r, !0);
								j(r);
								var a = z(r, 2), o = (e) => {
									var t = Gu(), n = L(t, !0);
									j(t), B((e) => G(n, e), [() => Z("update.actionDelete")]), W(e, t);
								};
								K(a, (e) => {
									V(t).action === "delete" && e(o);
								}), j(n), B(() => {
									X(r, "title", V(t).path), G(i, V(t).path);
								}), W(e, n);
							}), j(p), j(u);
							var m = z(u, 2), h = (e) => {
								var t = Xu(), n = R(t), r = L(n), i = L(r, !0);
								j(r);
								var a = z(r, 2), o = L(a, !0);
								j(a), j(n), Vr(z(n, 2), 17, () => V(Pr).changes.filter((e) => !e.atom), (e) => e.path, (e, t) => {
									var n = Yu(), r = L(n);
									let i;
									var a = L(r, !0);
									j(r);
									var o = z(r, 2), s = L(o), l = (e) => {
										var t = Gu(), n = L(t, !0);
										j(t), B((e) => G(n, e), [() => Z("update.actionDelete")]), W(e, t);
									};
									K(s, (e) => {
										V(t).action === "delete" && e(l);
									});
									var u = z(s, 2), d = (e) => {
										var n = Ju();
										q(n, () => c.warn, !0), j(n), B((e) => X(n, "title", e), [() => Z(`update.conflict.${V(t).conflict}`)]), W(e, n);
									};
									K(u, (e) => {
										V(t).conflict && e(d);
									});
									var f = z(u, 2);
									J(f), j(o), j(n), B((e, n, o, s) => {
										i = Qr(r, 1, "update-path svelte-1n46o8q", null, i, e), X(r, "title", V(t).path), G(a, V(t).path), ai(f, n), X(f, "title", o), X(f, "aria-label", s);
									}, [
										() => ({ skipped: V(Rr).has(V(t).path) }),
										() => V(Rr).has(V(t).path),
										() => Z("update.keepMine.title"),
										() => Z("update.keepMine")
									]), H("change", f, () => Br(V(t).path)), W(e, n);
								}), B((e, t) => {
									G(i, e), G(o, t);
								}, [() => Z("update.optionalTitle"), () => Z("update.keepMine")]), W(e, t);
							}, g = /* @__PURE__ */ N(() => V(Pr).changes.some((e) => !e.atom));
							K(m, (e) => {
								V(g) && e(h);
							});
							var _ = z(m, 2), v = L(_, !0);
							j(_), B((e, t, n, i, a, o) => {
								G(r, e), X(d, "title", t), G(f, `${n ?? ""} · ${i ?? ""}`), _.disabled = V(Ir) || !V(T)?.allowed, X(_, "title", a), G(v, o);
							}, [
								() => Z("update.summary", {
									writes: V(Pr).changes.filter((e) => e.action === "write").length,
									deletes: V(Pr).changes.filter((e) => e.action === "delete").length
								}),
								() => Z("update.atomGroup.title"),
								() => Z("update.atomTitle"),
								() => V(Pr).changes.filter((e) => e.atom).length,
								() => V(T)?.allowed ? Z("update.run.title") : Z("tip.history.needsAccess"),
								() => Z("update.run", { target: V(Pr).target })
							]), H("click", _, Hr), W(e, t);
						};
						K(s, (e) => {
							V(Pr).upToDate ? e(l) : e(u, -1);
						}), B((e) => G(i, e), [() => Z("update.current", { version: V(Pr).current })]), W(e, t);
					};
					K(n, (e) => {
						V(Ir) && !V(Pr) ? e(r) : V(Fr) ? e(i, 1) : V(Pr) && e(a, 2);
					}), j(t), W(e, t);
				};
				K(s, (e) => {
					V(it) === "pages" ? e(l) : V(it) === "nav" ? e(u, 1) : V(it) === "site" ? e(f, 2) : V(it) === "theme" ? e(p, 3) : V(it) === "blocks" ? e(h, 4) : V(it) === "grid" ? e(_, 5) : V(it) === "properties" ? e(v, 6) : V(it) === "footer" ? e(y, 7) : V(it) === "collections" ? e(b, 8) : V(it) === "plugins" ? e(x, 9) : V(it) === "history" ? e(S, 10) : V(it) === "update" && e(C, 11);
				}), j(t), B((e) => {
					X(i, "title", e), G(o, lt[V(it)]);
				}, [() => ut[V(it)]?.map((e) => Z(e)).join("\n")]), W(e, t);
			};
			K(v, (e) => {
				V(it) && e(y);
			}), B((e) => {
				p = Qr(f, 1, "rail-gear svelte-1n46o8q", null, p, { active: V(Xr) }), X(f, "title", e);
			}, [() => Z("settings.title")]), H("click", f, () => I(Xr, !V(Xr))), W(e, t);
		};
		K(i, (e) => {
			V(te) && e(o);
		});
		var s = z(i, 2);
		let f;
		var p = L(s), h = L(p);
		pi(h, (e) => I(w, e), () => V(w)), j(p), j(s), pi(s, (e) => I(oe, e), () => V(oe)), j(t), B((e) => {
			f = Qr(s, 1, "frame-wrap svelte-1n46o8q", null, f, {
				mobile: V(ae) === "mobile",
				pan: V(be)
			}), ei(p, `width:${V(ve) ?? ""}px; height:${V(ye) ?? ""}px`), X(h, "title", e), X(h, "src", `/?page=${V(g)}&preview=1`), ei(h, `width:${V(me) ?? ""}px; height:${V(_e) ?? ""}px; transform:scale(${V(he) ?? ""}); transform-origin:top left`);
		}, [() => Z("ui.previewTitle")]), Sr("load", h, qr), br(h), W(e, t);
	}, Wf = (e) => {
		var t = nd(), n = L(t, !0);
		j(t), B((e) => G(n, e), [() => Z("ui.loading")]), W(e, t);
	};
	K(Hf, (e) => {
		V(h) ? e(Uf) : e(Wf, -1);
	});
	var Gf = z(Hf, 2), Kf = (e) => {
		Ra(e, {
			get image() {
				return V(Ni);
			},
			onapply: Fi,
			oncancel: () => I(Ni, null)
		});
	};
	K(Gf, (e) => {
		V(Ni) && e(Kf);
	});
	var qf = z(Gf, 2), Jf = (e) => {
		var t = id(), n = L(t), r = L(n), i = L(r, !0);
		j(r);
		var a = z(r, 2);
		Vr(a, 16, () => V(qe).lines, (e) => e, (e, t) => {
			var n = rd(), r = L(n, !0);
			j(n), B(() => G(r, t)), W(e, n);
		});
		var o = z(a, 2), s = (e) => {
			var t = Ec();
			J(t), ot(t, !0), B(() => X(t, "placeholder", V(qe).placeholder)), H("keydown", t, (e) => e.key === "Enter" && V(qe).value.trim() && Xe(!0)), li(t, () => V(qe).value, (e) => V(qe).value = e), W(e, t);
		};
		K(o, (e) => {
			V(qe).prompt && e(s);
		});
		var c = z(o, 2), l = L(c), u = L(l, !0);
		j(l);
		var d = z(l, 2), f = L(d, !0);
		j(d), j(c), j(n), j(t), B(() => {
			G(i, V(qe).title), G(u, V(qe).cancelLabel), G(f, V(qe).okLabel);
		}), H("pointerdown", t, (e) => Ze = e.target === e.currentTarget), H("click", t, (e) => Ze && e.target === e.currentTarget && Xe(!1)), H("click", l, () => Xe(!1)), H("click", d, () => Xe(!0)), W(e, t);
	};
	K(qf, (e) => {
		V(qe) && e(Jf);
	});
	var Yf = z(qf, 2), Xf = (e) => {
		var t = ad(), n = L(t), r = L(n), i = L(r, !0);
		j(r);
		var a = z(r, 2), o = L(a, !0);
		j(a);
		var s = z(a, 2), c = L(s), l = z(c);
		J(l), j(s);
		var u = z(s, 2), d = L(u), f = z(d);
		{
			let e = /* @__PURE__ */ N(() => Z("setup.accentPick"));
			Ui(f, {
				get value() {
					return V(et);
				},
				get label() {
					return V(e);
				},
				onchange: (e) => I(et, e, !0)
			});
		}
		j(u);
		var p = z(u, 2), m = L(p), h = z(m);
		{
			let e = /* @__PURE__ */ N(() => Z("setup.bgLabel"));
			Ui(h, {
				get value() {
					return V(tt);
				},
				get label() {
					return V(e);
				},
				onchange: (e) => I(tt, e, !0)
			});
		}
		j(p);
		var g = z(p, 2), _ = L(g, !0);
		j(g);
		var v = z(g, 2), y = L(v), b = L(y, !0);
		j(y);
		var x = z(y, 2), S = L(x, !0);
		j(x), j(v), j(n), j(t), B((e, t, n, r, a, s, u, f, p, h) => {
			G(i, e), G(o, t), G(c, `${n ?? ""} `), X(l, "placeholder", r), G(d, `${a ?? ""} `), G(m, `${s ?? ""} `), G(_, u), G(b, f), x.disabled = p, G(S, h);
		}, [
			() => Z("setup.title"),
			() => Z("setup.intro"),
			() => Z("setup.nameLabel"),
			() => Z("ph.setup.name"),
			() => Z("setup.accentLabel"),
			() => Z("setup.bgLabel"),
			() => Z("setup.outro"),
			() => Z("setup.skip"),
			() => !V($e).trim(),
			() => Z("setup.start")
		]), H("keydown", l, (e) => e.key === "Enter" && rt()), li(l, () => V($e), (e) => I($e, e)), H("click", y, nt), H("click", x, rt), W(e, t);
	};
	K(Yf, (e) => {
		V(Qe) && e(Xf);
	});
	var Zf = z(Yf, 2), Qf = (e) => {
		var t = od();
		let n;
		var r = L(t), i = L(r, !0);
		j(r);
		var a = z(r, 2);
		j(t), B((e) => {
			n = Qr(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: V(y) === "ok",
				error: V(y) === "error"
			}), G(i, V(v)), X(a, "title", e);
		}, [() => Z("ui.close")]), H("click", a, () => x("")), W(e, t);
	};
	K(Zf, (e) => {
		V(v) && e(Qf);
	}), j(Ef);
	var $f = z(Ef, 2), ep = (e) => {
		var t = sd(), n = L(t), r = L(n), i = L(r, !0);
		j(r);
		var o = z(r, 2);
		q(o, () => c.cross, !0), j(o), j(n);
		var s = z(n, 2), l = L(s);
		a(l), j(s), j(t), B((e, n) => {
			ei(t, `left: ${V(St).left ?? ""}px; top: ${V(St).top ?? ""}px`), G(i, e), X(o, "title", n);
		}, [() => Z("blocks.suffix", { label: qt[V(M).type] ?? V(M).type }), () => Z("tip.closeEsc")]), H("click", o, () => I(St, null)), W(e, t);
	};
	K($f, (e) => {
		V(St) && V(M) && e(ep);
	}), B(() => Af = Qr(kf, 1, "topbar svelte-1n46o8q", null, Af, { hidden: !V(te) })), W(e, Tf), Ge();
}
//#endregion
//#region src/main.js
Cr([
	"click",
	"input",
	"pointerdown",
	"change",
	"keydown"
]), document.documentElement.lang = await Ai();
var ud = Mr(ld, { target: document.getElementById("urd-admin") });
//#endregion
export { ud as default };
