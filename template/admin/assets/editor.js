//#region node_modules/svelte/src/internal/shared/utils.js
var e = Array.isArray, t = Array.prototype.indexOf, n = Array.prototype.includes, r = Array.from, i = Object.defineProperty, a = Object.getOwnPropertyDescriptor, o = Object.getOwnPropertyDescriptors, s = Object.prototype, c = Array.prototype, l = Object.getPrototypeOf, u = Object.isExtensible;
function d(e) {
	return typeof e == "function";
}
var f = () => {};
function p(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function m() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
function h(e, t) {
	if (Array.isArray(e)) return e;
	if (t === void 0 || !(Symbol.iterator in e)) return Array.from(e);
	let n = [];
	for (let r of e) if (n.push(r), n.length === t) break;
	return n;
}
var g = 1024, _ = 2048, v = 4096, y = 8192, b = 16384, x = 32768, S = 1 << 25, C = 65536, w = 1 << 19, ee = 1 << 20, te = 1 << 25, ne = 65536, re = 1 << 21, ie = 1 << 22, ae = 1 << 23, oe = Symbol("$state"), se = Symbol("legacy props"), ce = Symbol(""), le = Symbol("attributes"), ue = Symbol("class"), de = Symbol("style"), fe = Symbol("text"), pe = Symbol("form reset"), me = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), he = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
function ge() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function _e(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function ve(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function ye() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function be(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function xe() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Se(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function Ce() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function we() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function Te() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Ee() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
//#endregion
//#region node_modules/svelte/src/constants.js
var De = {}, T = Symbol("uninitialized"), Oe = "http://www.w3.org/1999/xhtml", E = "http://www.w3.org/2000/svg", D = "http://www.w3.org/1998/Math/MathML";
function ke() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function Ae(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function je() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
var Me = !1;
function O(e) {
	Me = e;
}
var Ne;
function Pe(e) {
	if (e === null) throw Ae(), De;
	return Ne = e;
}
function Fe() {
	return Pe(/* @__PURE__ */ pn(Ne));
}
function k(e) {
	if (Me) {
		if (/* @__PURE__ */ pn(Ne) !== null) throw Ae(), De;
		Ne = e;
	}
}
function Ie(e = 1) {
	if (Me) {
		for (var t = e, n = Ne; t--;) n = /* @__PURE__ */ pn(n);
		Ne = n;
	}
}
function Le(e = !0) {
	for (var t = 0, n = Ne;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ pn(n);
		e && n.remove(), n = i;
	}
}
function Re(e) {
	if (!e || e.nodeType !== 8) throw Ae(), De;
	return e.data;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
function ze(e) {
	return e === this.v;
}
function Be(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Ve(e) {
	return !Be(e, this.v);
}
//#endregion
//#region node_modules/svelte/src/internal/shared/clone.js
var He = [];
function Ue(e, t = !1, n = !1) {
	return We(e, /* @__PURE__ */ new Map(), "", He, null, n);
}
function We(t, n, r, i, a = null, o = !1) {
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
				d in t && (u[d] = We(f, n, r, i, null, o));
			}
			return u;
		}
		if (l(t) === s) {
			u = {}, n.set(t, u), a !== null && n.set(a, u);
			for (var p of Object.keys(t)) u[p] = We(t[p], n, r, i, null, o);
			return u;
		}
		if (t instanceof Date) return structuredClone(t);
		if (typeof t.toJSON == "function" && !o) return We(t.toJSON(), n, r, i, t);
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
var Ge = null;
function Ke(e) {
	Ge = e;
}
function qe(e, t = !1, n) {
	Ge = {
		p: Ge,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: Yn,
		l: null
	};
}
function Je(e) {
	var t = Ge, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) wn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, Ge = t.p, e ?? {};
}
function Ye() {
	return !0;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var Xe = [];
function Ze() {
	var e = Xe;
	Xe = [], p(e);
}
function Qe(e) {
	if (Xe.length === 0 && !Ft) {
		var t = Xe;
		queueMicrotask(() => {
			t === Xe && Ze();
		});
	}
	Xe.push(e);
}
function $e() {
	for (; Xe.length > 0;) Ze();
}
function et(e) {
	var t = Yn;
	if (t === null) return Kn.f |= ae, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	tt(e, t);
}
function tt(e, t) {
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
var nt = ~(_ | v | g);
function rt(e, t) {
	e.f = e.f & nt | t;
}
function it(e) {
	e.f & 512 || e.deps === null ? rt(e, g) : rt(e, v);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function at(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= ne, at(t.deps));
}
function ot(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), at(e.deps), rt(e, g);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var st = !1;
function ct(e) {
	var t = st;
	try {
		return st = !1, [e(), st];
	} finally {
		st = t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
function lt(e, t) {
	if (t) {
		let t = document.body;
		e.autofocus = !0, Qe(() => {
			document.activeElement === t && e.focus();
		});
	}
}
function ut(e) {
	Me && /* @__PURE__ */ fn(e) !== null && mn(e);
}
var dt = !1;
function ft() {
	dt || (dt = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[pe]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function pt(e) {
	var t = Kn, n = Yn;
	Jn(null), Xn(null);
	try {
		return e();
	} finally {
		Jn(t), Xn(n);
	}
}
function mt(e, t, n, r = n) {
	e.addEventListener(t, () => pt(n));
	let i = e[pe];
	e[pe] = i ? () => {
		i(), r(!0);
	} : () => r(!0), ft();
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function ht(e) {
	let t = 0, n = Qt(0), r;
	return () => {
		xn() && (z(n), On(() => (t === 0 && (r = _r(() => e(() => nn(n)))), t += 1, () => {
			Qe(() => {
				--t, t === 0 && (r?.(), r = void 0, nn(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var gt = C | w;
function _t(e, t, n, r) {
	new vt(e, t, n, r);
}
var vt = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = Me ? Ne : null;
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
	#h = ht(() => (this.#m = Qt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = Yn;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = Yn.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = kn(() => {
			if (Me) {
				let e = this.#t;
				Fe();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#y() : this.#g();
			} else this.#b();
		}, gt), Me && (this.#e = Ne);
	}
	#g() {
		try {
			this.#a = An(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#v(e);
		Qe(r), t && (this.#s = An(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#v(e) {
		var t = !1, n = !1;
		let r = () => {
			if (t) {
				je();
				return;
			}
			t = !0, n && Ee(), this.#s !== null && Ln(this.#s, () => {
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
					tt(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#y() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = An(() => e(this.#e)), Qe(() => {
			var e = this.#c = document.createDocumentFragment(), t = dn();
			e.append(t), this.#a = this.#S(() => An(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, Ln(this.#o, () => {
				this.#o = null;
			}), this.#x(M));
		}));
	}
	#b() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = An(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Vn(this.#a, e);
				let t = this.#n.pending;
				this.#o = An(() => t(this.#e));
			} else this.#x(M);
		} catch (e) {
			this.error(e);
		}
	}
	#x(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		ot(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#S(e) {
		var t = Yn, n = Kn, r = Ge;
		Xn(this.#i), Jn(this.#i), Ke(this.#i.ctx);
		try {
			return Vt.ensure(), e();
		} catch (e) {
			return et(e), null;
		} finally {
			Xn(t), Jn(n), Ke(r);
		}
	}
	#C(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#C(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#x(t), this.#o && Ln(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#C(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, Qe(() => {
			this.#d = !1, this.#m && en(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), z(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		M?.is_fork ? (this.#a && M.skip_effect(this.#a), this.#o && M.skip_effect(this.#o), this.#s && M.skip_effect(this.#s), M.oncommit(() => {
			this.#w(e);
		})) : this.#w(e);
	}
	#w(e) {
		this.#a &&= (Pn(this.#a), null), this.#o &&= (Pn(this.#o), null), this.#s &&= (Pn(this.#s), null), Me && (Pe(this.#t), Ie(), Pe(Le()));
		let t = this.#n.failed, n = (e) => {
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && (this.#s = this.#S(() => {
				try {
					return An(() => {
						var r = Yn;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return tt(e, this.#i.parent), null;
				}
			}));
		};
		Qe(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				tt(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => tt(e, this.#i && this.#i.parent)) : n(t);
		});
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function yt(e, t, n, r) {
	let i = Ye() ? A : Tt;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = Yn, c = bt(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				tt(e, s);
			}
			xt();
		}
	}
	var d = St();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ wt(e))).then(u).catch((e) => tt(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), xt();
	}) : f();
}
function bt() {
	var e = Yn, t = Kn, n = Ge, r = M;
	return function(i = !0) {
		Xn(e), Jn(t), Ke(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function xt(e = !0) {
	Xn(null), Jn(null), Ke(null), e && M?.deactivate();
}
function St() {
	var e = Yn, t = e.b, n = M, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function A(e) {
	var t = 2 | _;
	return Yn !== null && (Yn.f |= w), {
		ctx: Ge,
		deps: null,
		effects: null,
		equals: ze,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: T,
		wv: 0,
		parent: Yn,
		ac: null
	};
}
var Ct = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function wt(e, t, n) {
	let r = Yn;
	r === null && ge();
	var i = void 0, a = Qt(T), o = !Kn, s = /* @__PURE__ */ new Set();
	return Dn(() => {
		var t = Yn, n = m();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== me && n.reject(e);
			}).finally(xt);
		} catch (e) {
			n.reject(e), xt();
		}
		var c = M;
		if (o) {
			if (t.f & 32768) var l = St();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(Ct);
			else for (let e of s.values()) e.reject(Ct);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== Ct && (c.activate(), t ? (a.f |= ae, en(a, t)) : (a.f & 8388608 && (a.f ^= ae), en(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), Sn(() => {
		for (let e of s) e.reject(Ct);
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
function j(e) {
	let t = /* @__PURE__ */ A(e);
	return Qn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function Tt(e) {
	let t = /* @__PURE__ */ A(e);
	return t.equals = Ve, t;
}
function Et(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) Pn(t[n]);
	}
}
function Dt(e) {
	var t, n = Yn, r = e.parent;
	if (!Wn && r !== null && e.v !== T && r.f & 24576) return ke(), e.v;
	Xn(r);
	try {
		e.f &= ~ne, Et(e), t = ur(e);
	} finally {
		Xn(n);
	}
	return t;
}
function Ot(e) {
	var t = Dt(e);
	if (!e.equals(t) && (e.wv = sr(), (!M?.is_fork || e.deps === null) && (M === null ? e.v = t : (M.capture(e, t, !0), Mt?.capture(e, t, !0)), e.deps === null))) {
		rt(e, g);
		return;
	}
	Wn || (Nt === null ? it(e) : (xn() || M?.is_fork) && Nt.set(e, t));
}
function kt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && pt(() => {
		t.ac.abort(me), t.ac = null;
	}), t.fn !== null && (t.teardown = f), fr(t, 0), Mn(t));
}
function At(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && pr(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var jt = null, M = null, Mt = null, Nt = null, Pt = null, Ft = !1, It = !1, Lt = null, Rt = null, zt = 0, Bt = 1, Vt = class e {
	id = Bt++;
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
		jt === null ? jt = this : (jt.#n = this, this.#t = jt), jt = this;
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
			for (var r of n.d) rt(r, _), t(r);
			for (r of n.m) rt(r, v), t(r);
		}
		this.#p.add(e);
	}
	#g() {
		this.#e = !0, zt++ > 1e3 && (this.#x(), Ut());
		for (let e of this.#u) this.#d.delete(e), rt(e, _), this.schedule(e);
		for (let e of this.#d) rt(e, v), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = Lt = [], r = [], i = Rt = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw Jt(e), this.#h() || this.discard(), t;
		}
		if (M = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (Lt = null, Rt = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) qt(e, t);
			i.length > 0 && M.#g();
			return;
		}
		let o = this.#v();
		if (o) {
			this.#b(r), this.#b(n), o.#y(this);
			return;
		}
		this.#u.clear(), this.#d.clear();
		for (let e of this.#r) e(this);
		this.#r.clear(), Mt = this, Gt(r), Gt(n), Mt = null, this.#s?.resolve();
		var s = M;
		if (this.#a === 0 && (this.#c.length === 0 || s !== null) && this.#x(), this.#c.length > 0) {
			if (s !== null) {
				let e = s;
				e.#c.push(...this.#c.filter((t) => !e.#c.includes(t)));
			} else s = this;
		}
		s !== null && (Xt.clear(), s.#g());
	}
	#_(e, t, n) {
		e.f ^= g;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
				a ? r.f ^= g : i & 4 ? t.push(r) : cr(r) && (i & 16 && this.#d.add(r), pr(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), rt(i, _), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#x(), M = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) ot(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== T && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), Nt?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		M = this;
	}
	deactivate() {
		M = null, Nt = null;
	}
	flush() {
		try {
			It = !0, M = this, this.#g();
		} finally {
			zt = 0, Pt = null, Lt = null, Rt = null, It = !1, M = null, Nt = null, Xt.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(Ct);
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
		this.#m || (this.#m = !0, Qe(() => {
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
		return (this.#s ??= m()).promise;
	}
	static ensure() {
		if (M === null) {
			let t = M = new e();
			!It && !Ft && Qe(() => {
				t.#e || t.flush();
			});
		}
		return M;
	}
	apply() {
		Nt = null;
	}
	schedule(e) {
		if (Pt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if (Lt !== null && t === Yn && (Kn === null || !(Kn.f & 2))) return;
			if (n & 96) {
				if (!(n & 1024)) return;
				t.f ^= g;
			}
		}
		this.#c.push(t);
	}
	#x() {
		if (this.linked) {
			var e = this.#t, t = this.#n;
			e === null || (e.#n = t), t === null ? jt = e : t.#t = e, this.linked = !1;
		}
	}
};
function Ht(e) {
	var t = Ft;
	Ft = !0;
	try {
		var n;
		for (e && (M !== null && !M.is_fork && M.flush(), n = e());;) {
			if ($e(), M === null) return n;
			M.flush();
		}
	} finally {
		Ft = t;
	}
}
function Ut() {
	try {
		xe();
	} catch (e) {
		tt(e, Pt);
	}
}
var Wt = null;
function Gt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && cr(r) && (Wt = /* @__PURE__ */ new Set(), pr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && In(r), Wt?.size > 0)) {
				Xt.clear();
				for (let e of Wt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Wt.has(n) && (Wt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || pr(n);
					}
				}
				Wt.clear();
			}
		}
		Wt = null;
	}
}
function Kt(e) {
	M.schedule(e);
}
function qt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), rt(e, g);
		for (var n = e.first; n !== null;) qt(n, t), n = n.next;
	}
}
function Jt(e) {
	rt(e, g);
	for (var t = e.first; t !== null;) Jt(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var Yt = /* @__PURE__ */ new Set(), Xt = /* @__PURE__ */ new Map(), Zt = !1;
function Qt(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: ze,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function N(e, t) {
	let n = Qt(e, t);
	return Qn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function $t(e, t = !1, n = !0) {
	let r = Qt(e);
	return t || (r.equals = Ve), r;
}
function P(e, t, n = !1) {
	return Kn !== null && (!qn || Kn.f & 131072) && Ye() && Kn.f & 4325394 && (Zn === null || !Zn.has(e)) && Te(), en(e, n ? an(t) : t, Rt);
}
function en(e, t, n = null) {
	if (!e.equals(t)) {
		Wn ? Xt.set(e, t) : Xt.has(e) || Xt.set(e, e.v);
		var r = Vt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && Dt(t), Nt === null && it(t);
		}
		e.wv = sr(), rn(e, _, n), Ye() && Yn !== null && Yn.f & 1024 && !(Yn.f & 96) && (tr === null ? nr([e]) : tr.push(e)), !r.is_fork && Yt.size > 0 && !Zt && tn();
	}
	return t;
}
function tn() {
	Zt = !1;
	for (let e of Yt) {
		e.f & 1024 && rt(e, v);
		let t;
		try {
			t = cr(e);
		} catch {
			t = !0;
		}
		t && pr(e);
	}
	Yt.clear();
}
function nn(e) {
	P(e, e.v + 1);
}
function rn(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Ye(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === Yn)) {
			var l = (c & _) === 0;
			if (l && rt(s, t), c & 131072) Yt.add(s);
			else if (c & 2) {
				var u = s;
				Nt?.delete(u), c & 65536 || (c & 512 && (Yn === null || !(Yn.f & 2097152)) && (s.f |= ne), rn(u, v, n));
			} else if (l) {
				var d = s;
				c & 16 && Wt !== null && Wt.add(d), n === null ? Kt(d) : n.push(d);
			}
		}
	}
}
function an(t) {
	if (typeof t != "object" || !t || oe in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ N(0), u = null, d = ar, f = (e) => {
		if (ar === d) return e();
		var t = Kn, n = ar;
		Jn(null), or(d);
		var r = e();
		return Jn(t), or(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ N(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && Ce();
			var i = r.get(t);
			return i === void 0 ? f(() => {
				var e = /* @__PURE__ */ N(n.value, u);
				return r.set(t, e), e;
			}) : P(i, n.value, !0), !0;
		},
		deleteProperty(e, t) {
			var n = r.get(t);
			if (n === void 0) {
				if (t in e) {
					let e = f(() => /* @__PURE__ */ N(T, u));
					r.set(t, e), nn(o);
				}
			} else P(n, T), nn(o);
			return !0;
		},
		get(e, n, i) {
			if (n === oe) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ N(an(s ? e[n] : T), u)), r.set(n, o)), o !== void 0) {
				var c = z(o);
				return c === T ? void 0 : c;
			}
			return Reflect.get(e, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			var n = Reflect.getOwnPropertyDescriptor(e, t);
			if (n && "value" in n) {
				var i = r.get(t);
				i && (n.value = z(i));
			} else if (n === void 0) {
				var a = r.get(t), o = a?.v;
				if (a !== void 0 && o !== T) return {
					enumerable: !0,
					configurable: !0,
					value: o,
					writable: !0
				};
			}
			return n;
		},
		has(e, t) {
			if (t === oe) return !0;
			var n = r.get(t), i = n !== void 0 && n.v !== T || Reflect.has(e, t);
			return (n !== void 0 || Yn !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ N(i ? an(e[t]) : T, u)), r.set(t, n)), z(n) === T) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ N(T, u)), r.set(d + "", p)) : P(p, T);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ N(void 0, u)), P(c, an(n)), r.set(t, c));
			else {
				l = c.v !== T;
				var m = f(() => an(n));
				P(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && P(g, _ + 1);
				}
				nn(o);
			}
			return !0;
		},
		ownKeys(e) {
			z(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== T;
			});
			for (var [n, i] of r) i.v !== T && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			we();
		}
	});
}
var on, sn, cn, ln;
function un() {
	if (on === void 0) {
		on = window, sn = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		cn = a(t, "firstChild").get, ln = a(t, "nextSibling").get, u(e) && (e[ue] = void 0, e[le] = null, e[de] = void 0, e.__e = void 0), u(n) && (n[fe] = void 0);
	}
}
function dn(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function fn(e) {
	return cn.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function pn(e) {
	return ln.call(e);
}
function F(e, t) {
	if (!Me) return /* @__PURE__ */ fn(e);
	var n = /* @__PURE__ */ fn(Ne);
	if (n === null) n = Ne.appendChild(dn());
	else if (t && n.nodeType !== 3) {
		var r = dn();
		return n?.before(r), Pe(r), r;
	}
	return t && _n(n), Pe(n), n;
}
function I(e, t = !1) {
	if (!Me) {
		var n = /* @__PURE__ */ fn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ pn(n) : n;
	}
	if (t) {
		if (Ne?.nodeType !== 3) {
			var r = dn();
			return Ne?.before(r), Pe(r), r;
		}
		_n(Ne);
	}
	return Ne;
}
function L(e, t = 1, n = !1) {
	let r = Me ? Ne : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ pn(r);
	if (!Me) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = dn();
			return r === null ? i?.after(a) : r.before(a), Pe(a), a;
		}
		_n(r);
	}
	return Pe(r), r;
}
function mn(e) {
	e.textContent = "";
}
function hn() {
	return !1;
}
function gn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function _n(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function vn(e) {
	Yn === null && (Kn === null && be(e), ye()), Wn && ve(e);
}
function yn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function bn(e, t) {
	var n = Yn;
	n !== null && n.f & 8192 && (e |= y);
	var r = {
		ctx: Ge,
		deps: null,
		nodes: null,
		f: e | _ | 512,
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
	M?.register_created_effect(r);
	var i = r;
	if (e & 4) Lt === null ? Vt.ensure().schedule(r) : Lt.push(r);
	else if (t !== null) {
		try {
			pr(r);
		} catch (e) {
			throw Pn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= C));
	}
	if (i !== null && (i.parent = n, n !== null && yn(i, n), Kn !== null && Kn.f & 2 && !(e & 64))) {
		var a = Kn;
		(a.effects ??= []).push(i);
	}
	return r;
}
function xn() {
	return Kn !== null && !qn;
}
function Sn(e) {
	let t = bn(8, null);
	return rt(t, g), t.teardown = e, t;
}
function Cn(e) {
	vn("$effect");
	var t = Yn.f;
	if (!Kn && t & 32 && Ge !== null && !Ge.i) {
		var n = Ge;
		(n.e ??= []).push(e);
	} else return wn(e);
}
function wn(e) {
	return bn(4 | ee, e);
}
function Tn(e) {
	Vt.ensure();
	let t = bn(64 | w, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Ln(t, () => {
			Pn(t), n(void 0);
		}) : (Pn(t), n(void 0));
	});
}
function En(e) {
	return bn(4, e);
}
function Dn(e) {
	return bn(ie | w, e);
}
function On(e, t = 0) {
	return bn(8 | t, e);
}
function R(e, t = [], n = [], r = []) {
	yt(r, t, n, (t) => {
		bn(8, () => {
			e(...t.map(z));
		});
	});
}
function kn(e, t = 0) {
	return bn(16 | t, e);
}
function An(e) {
	return bn(32 | w, e);
}
function jn(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Wn, n = Kn;
		Gn(!0), Jn(null);
		try {
			t.call(null);
		} finally {
			Gn(e), Jn(n);
		}
	}
}
function Mn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && pt(() => {
			e.abort(me);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : Pn(n, t), n = r;
	}
}
function Nn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || Pn(t), t = n;
	}
}
function Pn(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Fn(e.nodes.start, e.nodes.end), n = !0), e.f |= S, Mn(e, t && !n), fr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	jn(e), e.f ^= S, e.f |= b;
	var i = e.parent;
	i !== null && i.first !== null && In(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Fn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ pn(e);
		e.remove(), e = n;
	}
}
function In(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Ln(e, t, n = !0) {
	var r = [];
	Rn(e, r, !0);
	var i = () => {
		n && Pn(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Rn(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= y;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				Rn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function zn(e) {
	Bn(e, !0);
}
function Bn(e, t) {
	if (e.f & 8192) {
		e.f ^= y, e.f & 1024 || (rt(e, _), Vt.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			Bn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Vn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ pn(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var Hn = null, Un = !1, Wn = !1;
function Gn(e) {
	Wn = e;
}
var Kn = null, qn = !1;
function Jn(e) {
	Kn = e;
}
var Yn = null;
function Xn(e) {
	Yn = e;
}
var Zn = null;
function Qn(e) {
	Kn !== null && (Zn ??= /* @__PURE__ */ new Set()).add(e);
}
var $n = null, er = 0, tr = null;
function nr(e) {
	tr = e;
}
var rr = 1, ir = 0, ar = ir;
function or(e) {
	ar = e;
}
function sr() {
	return ++rr;
}
function cr(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~ne), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (cr(a) && Ot(a), a.wv > e.wv) return !0;
		}
		t & 512 && Nt === null && rt(e, g);
	}
	return !1;
}
function lr(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Zn !== null && Zn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? lr(a, t, !1) : t === a && (n ? rt(a, _) : a.f & 1024 && rt(a, v), Kt(a));
	}
}
function ur(e) {
	var t = $n, n = er, r = tr, i = Kn, a = Zn, o = Ge, s = qn, c = ar, l = e.f;
	$n = null, er = 0, tr = null, Kn = l & 96 ? null : e, Zn = null, Ke(e.ctx), qn = !1, ar = ++ir, e.ac !== null && (pt(() => {
		e.ac.abort(me);
	}), e.ac = null);
	try {
		e.f |= re;
		var u = e.fn, d = u();
		e.f |= x;
		var f = e.deps, p = M?.is_fork;
		if ($n !== null) {
			var m;
			if (p || fr(e, er), f !== null && er > 0) for (f.length = er + $n.length, m = 0; m < $n.length; m++) f[er + m] = $n[m];
			else e.deps = f = $n;
			if (xn() && e.f & 512) for (m = er; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && er < f.length && (fr(e, er), f.length = er);
		if (Ye() && tr !== null && !qn && f !== null && !(e.f & 6146)) for (m = 0; m < tr.length; m++) lr(tr[m], e);
		if (i !== null && i !== e) {
			if (ir++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = ir;
			if (t !== null) for (let e of t) e.rv = ir;
			tr !== null && (r === null ? r = tr : r.push(...tr));
		}
		return e.f & 8388608 && (e.f ^= ae), d;
	} catch (e) {
		return et(e);
	} finally {
		e.f ^= re, $n = t, er = n, tr = r, Kn = i, Zn = a, Ke(o), qn = s, ar = c;
	}
}
function dr(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && ($n === null || !n.call($n, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512, s.f &= ~ne), s.v !== T && it(s), s.ac !== null && pt(() => {
			s.ac.abort(me), s.ac = null, rt(s, _);
		}), kt(s), fr(s, 0);
	}
}
function fr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) dr(e, n[r]);
}
function pr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		rt(e, g);
		var n = Yn, r = Un;
		Yn = e, Un = !(t & 96);
		try {
			t & 16777232 ? Nn(e) : Mn(e), jn(e);
			var i = ur(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = rr;
		} finally {
			Un = r, Yn = n;
		}
	}
}
async function mr() {
	await Promise.resolve(), Ht();
}
function z(e) {
	var t = !!(e.f & 2);
	if (Hn?.add(e), Kn !== null && !qn && !(Yn !== null && Yn.f & 16384) && (Zn === null || !Zn.has(e))) {
		var r = Kn.deps;
		if (Kn.f & 2097152) e.rv < ir && (e.rv = ir, $n === null && r !== null && r[er] === e ? er++ : $n === null ? $n = [e] : $n.push(e));
		else {
			Kn.deps ??= [], n.call(Kn.deps, e) || Kn.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [Kn] : n.call(i, Kn) || i.push(Kn);
		}
	}
	if (Wn && Xt.has(e)) return Xt.get(e);
	if (t) {
		var a = e;
		if (Wn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || gr(a)) && (o = Dt(a)), Xt.set(a, o), o;
		}
		var s = !(a.f & 512) && !qn && Kn !== null && (Un || !!(Kn.f & 512)), c = (a.f & x) === 0;
		cr(a) && (s && (a.f |= 512), Ot(a)), s && !c && (At(a), hr(a));
	}
	if (Nt?.has(e)) return Nt.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function hr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (At(t), hr(t));
}
function gr(e) {
	if (e.v === T) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Xt.has(t) || t.f & 2 && gr(t)) return !0;
	return !1;
}
function _r(e) {
	var t = qn;
	try {
		return qn = !0, e();
	} finally {
		qn = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var vr = ["touchstart", "touchmove"];
function yr(e) {
	return vr.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var br = Symbol("events"), xr = /* @__PURE__ */ new Set(), Sr = /* @__PURE__ */ new Set();
function Cr(e) {
	if (!Me) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function wr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || kr.call(t, e), !e.cancelBubble) return pt(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Qe(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function Tr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = wr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && Sn(() => {
		t.removeEventListener(e, o, a);
	});
}
function B(e, t, n) {
	(t[br] ??= {})[e] = n;
}
function Er(e) {
	for (var t = 0; t < e.length; t++) xr.add(e[t]);
	for (var n of Sr) n(e);
}
var Dr = null, Or = !1;
function kr(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	Dr = e, Or || (Or = !0, setTimeout(() => {
		Or = !1, Dr = null;
	}));
	var s = 0, c = Dr === e && e[br];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[br] = t;
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
		var d = Kn, f = Yn;
		Jn(null), Xn(null);
		try {
			for (var p, m = []; o !== null && o !== t;) {
				try {
					var h = o[br]?.[r];
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
			e[br] = t, delete e.currentTarget, Jn(d), Xn(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var Ar = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function jr(e) {
	return Ar?.createHTML(e) ?? e;
}
function Mr(e) {
	var t = gn("template");
	return t.innerHTML = jr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function Nr(e, t) {
	var n = Yn;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function V(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (Me) return Nr(Ne, null), Ne;
		i === void 0 && (i = Mr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ fn(i)));
		var t = r || sn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ fn(t), s = t.lastChild;
			Nr(o, s);
		} else Nr(t, t);
		return t;
	};
}
function Pr(e = "") {
	if (!Me) {
		var t = dn(e + "");
		return Nr(t, t), t;
	}
	var n = Ne;
	return n.nodeType === 3 ? _n(n) : (n.before(n = dn()), Pe(n)), Nr(n, n), n;
}
function Fr() {
	if (Me) return Nr(Ne, null), Ne;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = dn();
	return e.append(t, n), Nr(t, n), e;
}
function H(e, t) {
	if (Me) {
		var n = Yn;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = Ne), Fe();
		return;
	}
	e !== null && e.before(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/render.js
var Ir = !0;
function U(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[fe] ??= e.nodeValue) && (e[fe] = n, e.nodeValue = `${n}`);
}
function Lr(e, t) {
	return zr(e, t);
}
var Rr = /* @__PURE__ */ new Map();
function zr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	un();
	var l = void 0, u = Tn(() => {
		var u = n ?? t.appendChild(dn());
		_t(u, { pending: () => {} }, (t) => {
			qe({});
			var n = Ge;
			if (o && (n.c = o), a && (i.$$events = a), Me && Nr(t, null), Ir = s, l = e(t, i) || {}, Ir = !0, Me && (Yn.nodes.end = Ne, Ne === null || Ne.nodeType !== 8 || Ne.data !== "]")) throw Ae(), De;
			Je();
		}, c);
		var d = /* @__PURE__ */ new Set(), f = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!d.has(r)) {
					d.add(r);
					var i = yr(r);
					for (let e of [t, document]) {
						var a = Rr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Rr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, kr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return f(r(xr)), Sr.add(f), () => {
			for (var e of d) for (let n of [t, document]) {
				var r = Rr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, kr), r.delete(e), r.size === 0 && Rr.delete(n)) : r.set(e, i);
			}
			Sr.delete(f), u !== n && u.parentNode?.removeChild(u);
		};
	});
	return Br.set(l, u), l;
}
var Br = /* @__PURE__ */ new WeakMap(), Vr = class {
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
			if (n) zn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (zn(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (Pn(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						Vn(r, t), t.append(dn()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else Pn(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Ln(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (Pn(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = M, r = hn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = dn();
				i.append(a), this.#n.set(e, {
					effect: An(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, An(() => t(this.anchor)));
		}
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else Me && (this.anchor = Ne), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function W(e, t, n = !1) {
	var r;
	Me && (r = Ne, Fe());
	var i = new Vr(e), a = n ? C : 0;
	function o(e, t) {
		if (Me) {
			var n = Re(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Le();
				Pe(a), i.anchor = a, O(!1), i.ensure(e, t), O(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	kn(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
function Hr(e, t) {
	return t;
}
function Ur(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		Ln(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					Wr(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null && e.pending.size === 0;
		if (l) {
			var u = n, d = u.parentNode;
			mn(d), d.append(u), e.items.clear();
		}
		Wr(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function Wr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= te, Vn(a, document.createDocumentFragment())) : Pn(t[i], n);
	}
}
var Gr;
function Kr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = Me ? Pe(/* @__PURE__ */ fn(u)) : u.appendChild(dn());
	}
	Me && Fe();
	var d = null, f = /* @__PURE__ */ Tt(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Jr(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= te, Xr(d, null, c)) : zn(d) : Ln(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: kn(() => {
			p = z(f);
			var e = p.length;
			let t = !1;
			Me && Re(c) === "[!" != (e === 0) && (c = Le(), Pe(c), O(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = M, v = hn(), y = 0; y < e; y += 1) {
				Me && Ne.nodeType === 8 && Ne.data === "]" && (c = Ne, t = !0, O(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && en(S.v, b), S.i && en(S.i, y), v && u.unskip_effect(S.e)) : (S = Yr(l, h ? c : Gr ??= dn(), b, x, y, o, n, i), h || (S.e.f |= te), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = An(() => s(c)) : (d = An(() => s(Gr ??= dn())), d.f |= te)), e > r.size && _e("", "", ""), Me && e > 0 && Pe(Le()), !h) {
				if (m.set(u, r), v) {
					for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
					u.oncommit(g), u.ondiscard(_);
				} else g(u);
			}
			t && O(!0), z(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, Me && (c = Ne);
}
function qr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Jr(e, t, n, i, a) {
	var o = !!(i & 8), s = t.length, c = e.items, l = qr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (zn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) {
			if (_.f ^= te, _ === l) Xr(_, null, n);
			else {
				var y = d ? d.next : l;
				_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Zr(e, d, _), Zr(e, _, y), Xr(_, y, n), d = _, p = [], m = [], l = qr(d.next);
				continue;
			}
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Xr(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Zr(e, S.prev, C.next), Zr(e, d, S), Zr(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), Xr(_, l, n), Zr(e, _.prev, _.next), Zr(e, _, d === null ? e.effect.first : d.next), Zr(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = qr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = qr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Wr(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var w = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || w.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && w.push(l), l = qr(l.next);
		var ee = w.length;
		if (ee > 0) {
			var ne = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < ee; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < ee; v += 1) w[v].nodes?.a?.fix();
			}
			Ur(e, w, ne);
		}
	}
	o && Qe(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Yr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Qt(n) : /* @__PURE__ */ $t(n, !1, !1) : null, l = o & 2 ? Qt(i) : null;
	return {
		v: c,
		i: l,
		e: An(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Xr(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ pn(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Zr(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function G(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		Me && (o = Pe(/* @__PURE__ */ fn(c)));
	}
	R(() => {
		var e = Yn;
		if (s === (s = t() ?? "")) {
			Me && Fe();
			return;
		}
		if (n && !Me) {
			e.nodes = null, c.innerHTML = s, s !== "" && Nr(/* @__PURE__ */ fn(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (Fn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (Me) {
				for (var a = Ne.data, l = Fe(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ pn(l);
				if (l === null) throw Ae(), De;
				Nr(Ne, u), o = Pe(l);
				return;
			}
			var d = gn(r ? "svg" : i ? "math" : "template", r ? E : i ? D : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (Nr(/* @__PURE__ */ fn(f), f.lastChild), r || i) for (; /* @__PURE__ */ fn(f);) o.before(/* @__PURE__ */ fn(f));
			else o.before(f);
		}
	});
}
//#endregion
//#region node_modules/svelte/src/internal/client/timing.js
var Qr = () => performance.now(), $r = {
	tick: (e) => requestAnimationFrame(e),
	now: () => Qr(),
	tasks: /* @__PURE__ */ new Set()
};
//#endregion
//#region node_modules/svelte/src/internal/client/loop.js
function ei() {
	let e = $r.now();
	$r.tasks.forEach((t) => {
		t.c(e) || ($r.tasks.delete(t), t.f());
	}), $r.tasks.size !== 0 && $r.tick(ei);
}
function ti(e) {
	let t;
	return $r.tasks.size === 0 && $r.tick(ei), {
		promise: new Promise((n) => {
			$r.tasks.add(t = {
				c: e,
				f: n
			});
		}),
		abort() {
			$r.tasks.delete(t);
		}
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/transitions.js
function ni(e, t) {
	pt(() => {
		e.dispatchEvent(new CustomEvent(t));
	});
}
function ri(e) {
	if (e === "float") return "cssFloat";
	if (e === "offset") return "cssOffset";
	if (e.startsWith("--")) return e;
	let t = e.split("-");
	return t.length === 1 ? t[0] : t[0] + t.slice(1).map((e) => e[0].toUpperCase() + e.slice(1)).join("");
}
function ii(e) {
	let t = {}, n = e.split(";");
	for (let e of n) {
		let [n, r] = e.split(":");
		if (!n || r === void 0) break;
		let i = ri(n.trim());
		t[i] = r.trim();
	}
	return t;
}
var ai = (e) => e;
function oi(e, t, n, r) {
	var i = !!(e & 1), a = !!(e & 2), o = i && a, s = !!(e & 4), c = o ? "both" : i ? "in" : "out", l, u = t.inert, d = t.style.overflow, f, p;
	function m() {
		return pt(() => l ??= n()(t, r?.() ?? {}, { direction: c }));
	}
	var h = {
		is_global: s,
		in() {
			if (t.inert = u, !i) {
				p?.abort(), p?.reset?.();
				return;
			}
			a || f?.abort(), f = si(t, m(), p, 1, () => {
				ni(t, "introstart");
			}, () => {
				ni(t, "introend"), f?.abort(), f = l = void 0, t.style.overflow = d;
			});
		},
		out(e) {
			if (!a) {
				e?.(), l = void 0;
				return;
			}
			t.inert = !0, p = si(t, m(), f, 0, () => {
				ni(t, "outrostart");
			}, () => {
				ni(t, "outroend"), e?.();
			});
		},
		stop: () => {
			f?.abort(), p?.abort();
		}
	}, g = Yn;
	if ((g.nodes.t ??= []).push(h), i && Ir) {
		var _ = s;
		if (!_) {
			for (var v = g.parent; v && v.f & 65536;) for (; (v = v.parent) && !(v.f & 16););
			_ = !v || !!(v.f & 32768);
		}
		_ && En(() => {
			_r(() => h.in());
		});
	}
}
function si(e, t, n, r, i, a) {
	var o = r === 1;
	if (d(t)) {
		var s, c = !1;
		return Qe(() => {
			c || (s = si(e, t({ direction: o ? "in" : "out" }), n, r, i, a));
		}), {
			abort: () => {
				c = !0, s?.abort();
			},
			deactivate: () => s.deactivate(),
			reset: () => s.reset(),
			t: () => s.t()
		};
	}
	if (n?.deactivate(), !t?.duration && !t?.delay) return i(), a(), {
		abort: f,
		deactivate: f,
		reset: f,
		t: () => r
	};
	let { delay: l = 0, css: u, tick: p, easing: m = ai } = t;
	var h = [];
	if (o && n === void 0 && (p && p(0, 1), u)) {
		var g = ii(u(0, 1));
		h.push(g, g);
	}
	var _ = () => 1 - r, v = e.animate(h, {
		duration: l,
		fill: "forwards"
	});
	return v.onfinish = () => {
		v.cancel(), i();
		var o = n?.t() ?? 1 - r;
		n?.abort();
		var s = r - o, c = t.duration * Math.abs(s), l = [];
		if (c > 0) {
			var d = !1;
			if (u) for (var f = Math.ceil(c / (1e3 / 60)), h = 0; h <= f; h += 1) {
				var g = o + s * m(h / f), y = ii(u(g, 1 - g));
				l.push(y), d ||= y.overflow === "hidden";
			}
			d && (e.style.overflow = "hidden"), _ = () => {
				var e = v.currentTime;
				return o + s * m(e / c);
			}, p && ti(() => {
				if (v.playState !== "running") return !1;
				var e = _();
				return p(e, 1 - e), !0;
			});
		}
		v = e.animate(l, {
			duration: c,
			fill: "forwards"
		}), v.onfinish = () => {
			_ = () => r, p?.(r, 1 - r), a();
		};
	}, {
		abort: () => {
			v && (v.cancel(), v.effect = null, v.onfinish = f);
		},
		deactivate: () => {
			a = f;
		},
		reset: () => {
			r === 0 && p?.(1, 0);
		},
		t: () => _()
	};
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
var ci = [..." 	\n\r\f\xA0\v﻿"];
function li(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || ci.includes(r[o - 1])) && (s === r.length || ci.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function ui(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function di(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function fi(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\/\*.*?\*\//g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(di)), i && c.push(...Object.keys(i).map(di));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = di(e.substring(l, u).trim());
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
		return r && (n += ui(r)), i && (n += ui(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function pi(e, t, n, r, i, a) {
	var o = e[ue];
	if (Me || o !== n || o === void 0) {
		var s = li(n, r, a);
		(!Me || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[ue] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/style.js
function mi(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function hi(e, t, n, r) {
	var i = e[de];
	if (Me || i !== t) {
		var a = fi(t, r);
		(!Me || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[de] = t;
	} else r && (Array.isArray(r) ? (mi(e, n?.[0], r[0]), mi(e, n?.[1], r[1], "important")) : mi(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var gi = Symbol("is custom element"), _i = Symbol("is html"), vi = he ? "link" : "LINK", yi = he ? "progress" : "PROGRESS";
function K(e) {
	if (Me) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					J(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					J(e, "checked", null), e.checked = r;
				}
			}
		};
		e[pe] = n, Qe(n), ft();
	}
}
function q(e, t) {
	var n = xi(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === yi) && (e.value = t ?? "");
}
function bi(e, t) {
	var n = xi(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function J(e, t, n, r) {
	var i = xi(e);
	Me && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === vi) || i[t] !== (i[t] = n) && (t === "loading" && (e[ce] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Ci(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function xi(e) {
	return e[le] ??= {
		[gi]: e.nodeName.includes("-"),
		[_i]: e.namespaceURI === Oe
	};
}
var Si = /* @__PURE__ */ new Map();
function Ci(e) {
	var t = e.getAttribute("is") || e.nodeName, n = Si.get(t);
	if (n) return n;
	Si.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.push(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function wi(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	mt(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = Ti(e) ? Ei(a) : a, n(a), M !== null && r.add(M), await mr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (Me && e.defaultValue !== e.value || _r(t) == null && e.value) && (n(Ti(e) ? Ei(e.value) : e.value), M !== null && r.add(M)), On(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = M;
			if (r.has(i)) return;
		}
		Ti(e) && n === Ei(e.value) || e.type === "date" && !n && !e.value || n !== e.value && (e.value = n ?? "");
	});
}
function Ti(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function Ei(e) {
	return e === "" ? null : +e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function Di(e, t) {
	return e === t || e?.[oe] === t;
}
function Oi(e = {}, t, n, r) {
	var i = Ge.r, a = Yn;
	return En(() => {
		var o, s;
		return On(() => {
			o = s, s = r?.() || [], _r(() => {
				Di(n(...s), e) || (t(e, ...s), o && Di(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && Di(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
function ki(e, t, n, r) {
	var i = !0, o = !!(n & 8), s = !!(n & 16), c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ A(r), z(u)) : (l && (l = !1, c = s ? _r(r) : r), c);
	let f;
	if (o) {
		var p = oe in e || se in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = ct(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && Se(t), f(m)));
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
	var v = !1, y = (n & 1 ? A : Tt)(() => (v = !1, g()));
	o && z(y);
	var b = Yn;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? z(y) : i && o ? an(e) : e;
			return P(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Wn && v || b.f & 16384 ? y.v : z(y);
	});
}
var Ai = {
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
		"deling.share": "Del på {service}",
		"deling.email": "Del på e-post",
		"deling.copy": "Kopier lenke",
		"deling.copied": "Kopiert!",
		"butikk.addToCart": "Legg i handlekurv",
		"butikk.added": "Lagt i kurven!",
		"butikk.memberPrice": "Medlem: {price}",
		"butikk.cart": "Handlekurv",
		"butikk.cartEmpty": "Handlekurven er tom.",
		"butikk.total": "Sum",
		"butikk.checkout": "Til kassen",
		"butikk.close": "Lukk",
		"butikk.remove": "Fjern varen",
		"butikk.increase": "Flere",
		"butikk.decrease": "Færre",
		"butikk.name": "Navn",
		"butikk.email": "E-post",
		"butikk.phone": "Telefon",
		"butikk.comment": "Kommentar",
		"butikk.sendOrder": "Send bestilling",
		"butikk.orderSubject": "Bestilling fra {site}",
		"butikk.orderSent": "Takk! Bestillingen er sendt.",
		"butikk.orderDraft": "E-postutkastet er åpnet - send det for å fullføre bestillingen.",
		"butikk.fillRequired": "Fyll ut navn og en gyldig e-postadresse.",
		"butikk.sendFailed": "Kunne ikke sende akkurat nå. Prøv igjen senere.",
		"butikk.missingTarget": "Kassen mangler mottaker eller endepunkt.",
		"butikk.vippsHint": "Betaling: Vipps til {number}.",
		"butikk.quickView": "Vis produktet",
		"butikk.payWithVipps": "Betal med Vipps",
		"butikk.vippsUnavailable": "Betaling er ikke satt opp for denne siden ennå.",
		"nedteller.days": "dager",
		"nedteller.hours": "timer",
		"nedteller.minutes": "minutter",
		"nedteller.seconds": "sekunder",
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
}, ji = [
	"nb",
	"nn",
	"en-GB",
	"se",
	"tr"
], Mi = /^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/, Ni = {
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
function Pi(e) {
	let t = String(e ?? "").trim().toLowerCase();
	for (let [e, n] of Object.entries(Ni)) if (n.some((e) => t === e || t.startsWith(`${e}-`))) return e;
	return null;
}
function Fi(e) {
	return ji.includes(String(e ?? ""));
}
function Ii(e) {
	let t = [];
	if (!Array.isArray(e)) return ["languages må være en liste"];
	for (let n of e) {
		if (!n || typeof n != "object" || Array.isArray(n)) {
			t.push("languages: hvert innslag må være et objekt");
			continue;
		}
		let e = String(n.code ?? "");
		Mi.test(e) ? Fi(e) && t.push(`languages: '${e}' er innebygd i Urd og kan ikke overstyres`) : t.push(`languages: '${e}' er ikke en gyldig språkkode`), (typeof n.name != "string" || !n.name.trim()) && t.push(`languages/${e}: name mangler (språkets eget navn)`);
		for (let r of ["site", "admin"]) n[r] !== void 0 && typeof n[r] != "boolean" && t.push(`languages/${e}: ${r} må være boolsk`);
		n.site !== !0 && n.admin !== !0 && t.push(`languages/${e}: må dekke site, admin eller begge`);
	}
	return t;
}
function Li(e) {
	let t = Pi(e);
	if (t) return t;
	let n = String(e ?? "").trim();
	return Mi.test(n) ? n : "nb";
}
async function Ri(e, t) {
	try {
		return await (await import(
			/* @vite-ignore */
			"/assets/urd/language-packs.js"
)).loadPackStrings(e, t);
	} catch {
		return null;
	}
}
({ ...Ai.strings });
var zi = {
	lang: "nb",
	dict: {}
};
function Bi(e, t) {
	if (!t) return e;
	let n = e;
	for (let [e, r] of Object.entries(t)) n = n.replaceAll(`{${e}}`, String(r));
	return n;
}
function Y(e, t) {
	return Bi(zi.dict[e] ?? e, t);
}
function Vi(e) {
	let t = `api.${e?.code}`;
	return e?.code && zi.dict[t] !== void 0 ? Bi(zi.dict[t], e) : e?.error ?? null;
}
function Hi() {
	return zi.lang;
}
function Ui() {
	let e = null;
	try {
		e = localStorage.getItem("urd-admin-lang");
	} catch {}
	if (e) return Li(e);
	for (let e of navigator.languages ?? [navigator.language]) {
		let t = Pi(e);
		if (t) return t;
	}
	return "en-GB";
}
var Wi;
new Promise((e) => {
	Wi = e;
});
async function Gi(e = Ui()) {
	let t = async (e) => (await import(
		/* @vite-ignore */
		`/assets/urd/locales/admin/${e}.js`
)).default.strings;
	zi.lang = Li(e);
	let n = Fi(zi.lang);
	try {
		Object.assign(zi.dict, await t("nb")), n && zi.lang !== "nb" && Object.assign(zi.dict, await t(zi.lang));
	} catch {}
	if (!n) {
		let e = await Ri(zi.lang, "admin");
		e ? Object.assign(zi.dict, e) : zi.lang = "nb";
	}
	return Wi(zi.lang), zi.lang;
}
//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region node_modules/svelte/src/transition/index.js
function Ki(e) {
	let t = e - 1;
	return t * t * t + 1;
}
function qi(e) {
	let t = typeof e == "string" && e.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
	return t ? [parseFloat(t[1]), t[2] || "px"] : [e, "px"];
}
function Ji(e, { delay: t = 0, duration: n = 400, easing: r = Ki, x: i = 0, y: a = 0, opacity: o = 0 } = {}) {
	let s = getComputedStyle(e), c = +s.opacity, l = s.transform === "none" ? "" : s.transform, u = c * (1 - o), [d, f] = qi(i), [p, m] = qi(a);
	return {
		delay: t,
		duration: n,
		easing: r,
		css: (e, t) => `
			transform: ${l} translate(${(1 - e) * d}${f}, ${(1 - e) * p}${m});
			opacity: ${c - u * t}`
	};
}
//#endregion
//#region src/lib/draftStore.js
function Yi(e, t, n) {
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
var Xi = /* @__PURE__ */ V("<button type=\"button\" class=\"cp-clear svelte-zxiloo\">×</button>"), Zi = /* @__PURE__ */ V("<button type=\"button\" class=\"cp-eye svelte-zxiloo\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), Qi = /* @__PURE__ */ V("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), $i = /* @__PURE__ */ V("<button type=\"button\"></button>"), ea = /* @__PURE__ */ V("<span class=\"cp-label svelte-zxiloo\"> <!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), ta = /* @__PURE__ */ V("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\">×</button></span>"), na = /* @__PURE__ */ V("<span class=\"cp-tokens svelte-zxiloo\"></span>"), ra = /* @__PURE__ */ V("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), ia = /* @__PURE__ */ V("<span class=\"cp-label svelte-zxiloo\"> </span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), aa = /* @__PURE__ */ V("<div class=\"cp-pop svelte-zxiloo\"><div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\"> <button type=\"button\" class=\"cp-add svelte-zxiloo\">+</button></span> <!> <!></div>"), oa = /* @__PURE__ */ V("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!> <!></span>");
function sa(e, t) {
	qe(t, !0);
	let n = ki(t, "value", 3, "#000000"), r = ki(t, "tokens", 19, () => []), i = ki(t, "label", 19, () => Y("cp.pickColor")), a = ki(t, "allowClear", 3, !1), o = "urd-recent-colors", s = "urd-saved-colors", c = () => {
		let e = r().find(([e]) => e === n());
		return e ? e[1] : n();
	}, l = () => r().find(([e]) => e === n())?.[0] ?? null, u = /* @__PURE__ */ N(an([])), d = /* @__PURE__ */ N(an([])), f = "", p = "", m = /* @__PURE__ */ N(null), g = /* @__PURE__ */ N(!1), _ = /* @__PURE__ */ N(an({
		top: 0,
		left: 0
	})), v = /* @__PURE__ */ N(0), y = /* @__PURE__ */ N(0), b = /* @__PURE__ */ N(1), x = /* @__PURE__ */ N(1), S = /* @__PURE__ */ N("#000000");
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
	function ee(e, t, n) {
		e /= 255, t /= 255, n /= 255;
		let r = Math.max(e, t, n), i = r - Math.min(e, t, n), a = 0;
		return i && (a = r === e ? (t - n) / i % 6 : r === t ? (n - e) / i + 2 : (e - t) / i + 4, a *= 60, a < 0 && (a += 360)), [
			a,
			r ? i / r : 0,
			r
		];
	}
	function te(e, t, n) {
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
	function ne() {
		return w(...te(z(v), z(y), z(b)));
	}
	function re() {
		let e = ne();
		return z(x) >= .995 ? e : e + Math.round(z(x) * 255).toString(16).padStart(2, "0");
	}
	function ie() {
		P(S, re(), !0), p = z(S), t.onchange?.(z(S));
	}
	function ae(e) {
		let t = C(e);
		return t ? (((e) => {
			var t = h(e, 3);
			P(v, t[0], !0), P(y, t[1], !0), P(b, t[2], !0);
		})(ee(t[0], t[1], t[2])), P(x, t[3], !0), P(S, re(), !0), !0) : !1;
	}
	function oe() {
		ae(c()) || ae("#000000"), f = n(), p = "";
		try {
			let e = JSON.parse(localStorage.getItem(o) ?? "[]");
			P(u, Array.isArray(e) ? e : [], !0);
		} catch {
			P(u, [], !0);
		}
		try {
			let e = JSON.parse(localStorage.getItem(s) ?? "[]");
			P(d, Array.isArray(e) ? e : [], !0);
		} catch {
			P(d, [], !0);
		}
		let e = z(m).getBoundingClientRect(), t = z(m).closest(".panel-body")?.getBoundingClientRect(), r = t ? t.right : window.innerWidth, i = Math.max(8, Math.min(e.right - 236, r - 236 - 8)), a = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		P(_, {
			top: a,
			left: i
		}, !0), P(g, !0);
	}
	function se() {
		if (P(g, !1), p && p !== f) {
			let e = [p, ...z(u).filter((e) => e !== p)].slice(0, 8);
			localStorage.setItem(o, JSON.stringify(e));
		}
	}
	function ce(e, n) {
		ae(n), P(S, n, !0), t.onchange?.(e);
	}
	function le(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			P(y, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), P(b, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), ie();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function ue(e) {
		ae(e.target.value) ? ie() : P(S, ne(), !0);
	}
	function de(e) {
		return (C(ne()) ?? [
			0,
			0,
			0
		])[e];
	}
	function fe(e, t) {
		let n = C(ne()) ?? [
			0,
			0,
			0
		];
		n[e] = Math.min(255, Math.max(0, Number(t) || 0)), ((e) => {
			var t = h(e, 3);
			P(v, t[0], !0), P(y, t[1], !0), P(b, t[2], !0);
		})(ee(...n)), ie();
	}
	let pe = typeof window < "u" && "EyeDropper" in window;
	async function me() {
		try {
			ae((await new window.EyeDropper().open()).sRGBHex) && ie();
		} catch {}
	}
	function he(e) {
		ae(e) && ie();
	}
	function ge() {
		let e = re();
		z(d).includes(e) || (P(d, [e, ...z(d)].slice(0, 12), !0), localStorage.setItem(s, JSON.stringify(Ue(z(d)))));
	}
	function _e(e) {
		P(d, z(d).filter((t) => t !== e), !0), localStorage.setItem(s, JSON.stringify(Ue(z(d))));
	}
	Cn(() => {
		if (!z(g)) return;
		let e = (e) => {
			z(m) && !z(m).contains(e.target) && se();
		}, t = (e) => {
			e.key === "Escape" && se();
		}, n = () => se();
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	var ve = oa(), ye = F(ve);
	let be;
	var xe = L(ye, 2), Se = (e) => {
		var n = Xi();
		R((e, t) => {
			J(n, "title", e), J(n, "aria-label", t);
		}, [() => Y("cp.clearTitle"), () => Y("cp.clear")]), B("click", n, () => t.onchange?.("")), H(e, n);
	};
	W(xe, (e) => {
		a() && n() && e(Se);
	});
	var Ce = L(xe, 2), we = (e) => {
		var t = aa(), i = F(t), a = F(i);
		k(i);
		var o = L(i, 2);
		K(o);
		var s = L(o, 2);
		K(s);
		var c = L(s, 2), f = F(c), p = L(f, 2);
		K(p);
		var m = L(p, 2), g = (e) => {
			var t = Zi();
			R((e) => J(t, "title", e), [() => Y("cp.eyedropper")]), B("click", t, me), H(e, t);
		};
		W(m, (e) => {
			pe && e(g);
		}), k(c);
		var C = L(c, 2);
		Kr(C, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = Qi();
			K(r), R((e) => {
				J(r, "title", t), q(r, e);
			}, [() => de(z(n))]), B("change", r, (e) => fe(z(n), e.target.value)), H(e, r);
		}), k(C);
		var w = L(C, 2), ee = (e) => {
			var t = ea(), i = I(t), a = F(i, !0), o = L(a), s = (e) => {
				var t = Pr();
				R((e) => U(t, e), [() => Y("cp.linkedSuffix", { token: l() })]), H(e, t);
			}, c = /* @__PURE__ */ j(() => l());
			W(o, (e) => {
				z(c) && e(s);
			}), k(i);
			var u = L(i, 2);
			Kr(u, 21, r, ([e, t]) => e, (e, t) => {
				var r = /* @__PURE__ */ j(() => h(z(t), 2));
				let i = () => z(r)[0], a = () => z(r)[1];
				var o = $i();
				let s;
				R((e) => {
					s = pi(o, 1, "cp-token svelte-zxiloo", null, s, { active: n() === i() }), hi(o, `background: ${a() ?? ""}`), J(o, "title", e);
				}, [() => Y("cp.tokenTitle", { name: i() })]), B("click", o, () => ce(i(), a())), H(e, o);
			}), k(u), R((e) => U(a, e), [() => Y("cp.themeColors")]), H(e, t);
		};
		W(w, (e) => {
			r().length && e(ee);
		});
		var te = L(w, 2), re = F(te), ae = L(re);
		k(te);
		var oe = L(te, 2), se = (e) => {
			var t = na();
			Kr(t, 20, () => z(d), (e) => e, (e, t) => {
				var n = ta(), r = F(n), i = L(r, 2);
				k(n), R((e) => {
					hi(r, `background: ${t ?? ""}`), J(r, "title", t), J(i, "title", e);
				}, [() => Y("cp.removeSaved")]), B("click", r, () => he(t)), B("click", i, () => _e(t)), H(e, n);
			}), k(t), H(e, t);
		};
		W(oe, (e) => {
			z(d).length && e(se);
		});
		var ve = L(oe, 2), ye = (e) => {
			var t = ia(), n = I(t), r = F(n, !0);
			k(n);
			var i = L(n, 2);
			Kr(i, 20, () => z(u), (e) => e, (e, t) => {
				var n = ra();
				R(() => {
					hi(n, `background: ${t ?? ""}`), J(n, "title", t);
				}), B("click", n, () => he(t)), H(e, n);
			}), k(i), R((e) => U(r, e), [() => Y("common.recent")]), H(e, t);
		};
		W(ve, (e) => {
			z(u).length && e(ye);
		}), k(t), R((e, n, r, c, l) => {
			hi(t, `top: ${z(_).top ?? ""}px; left: ${z(_).left ?? ""}px`), hi(i, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${z(v) ?? ""}, 100%, 50%)`), hi(a, `left: ${z(y) * 100}%; top: ${(1 - z(b)) * 100}%`), q(o, z(v)), q(s, e), J(s, "title", n), hi(s, `background: linear-gradient(to right, transparent, ${r ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), hi(f, `background: ${z(S) ?? ""}`), q(p, z(S)), U(re, `${c ?? ""} `), J(ae, "title", l);
		}, [
			() => Math.round(z(x) * 100),
			() => Y("cp.alpha"),
			() => ne(),
			() => Y("cp.saved"),
			() => Y("cp.saveTitle")
		]), B("click", t, (e) => e.preventDefault()), B("pointerdown", i, le), B("input", o, (e) => {
			P(v, Number(e.target.value), !0), ie();
		}), B("input", s, (e) => {
			P(x, Number(e.target.value) / 100), ie();
		}), B("change", p, ue), B("click", ae, ge), H(e, t);
	};
	W(Ce, (e) => {
		z(g) && e(we);
	}), k(ve), Oi(ve, (e) => P(m, e), () => z(m)), R((e, t, n) => {
		be = pi(ye, 1, "cp-swatch svelte-zxiloo", null, be, e), hi(ye, `background: ${t ?? ""}`), J(ye, "title", n), J(ye, "aria-label", i());
	}, [
		() => ({
			linked: l(),
			"cp-empty": a() && !n()
		}),
		() => n() ? c() : "transparent",
		() => l() ? Y("cp.linkedTitle", {
			label: i(),
			token: l()
		}) : i()
	]), B("click", ye, () => z(g) ? se() : oe()), H(e, ve), Je();
}
Er([
	"click",
	"pointerdown",
	"input",
	"change"
]);
//#endregion
//#region ../template/assets/engine/0.6.11/imageTools.js
var ca = 1600, la = .82, ua = .6;
async function da(e, t = ca) {
	if (pa(e)) return ma(await e.text());
	let n = await createImageBitmap(e), r = Math.min(1, t / Math.max(n.width, n.height)), i = Math.round(n.width * r), a = Math.round(n.height * r), o = document.createElement("canvas");
	o.width = i, o.height = a, o.getContext("2d").drawImage(n, 0, 0, i, a), n.close();
	let s = (e) => new Promise((t) => o.toBlob(t, "image/webp", e)), c = await s(la);
	return c.size > 4e5 && (c = await s(ua)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(c);
		}),
		bytes: c.size,
		width: i,
		height: a
	};
}
var fa = "image/svg+xml";
function pa(e) {
	return e.type === fa || /\.svg$/i.test(e.name || "");
}
function ma(e) {
	let t = String(e ?? "");
	if (!/<svg[\s>]/i.test(t)) throw Error("Ugyldig SVG");
	if (/<\s*script[\s>]/i.test(t) || /<\s*foreignObject[\s>]/i.test(t) || /\son[a-z]+\s*=/i.test(t) || /javascript:/i.test(t)) throw Error("SVG-en inneholder skript eller hendelser og kan ikke brukes");
	let n = new Blob([t]).size, r = `data:${fa};base64,${btoa(unescape(encodeURIComponent(t)))}`, i = t.match(/<svg\b[^>]*>/i)?.[0] ?? "", a = i.match(/viewBox\s*=\s*["']\s*([-\d.]+(?:[\s,]+[-\d.]+){3})\s*["']/i)?.[1]?.split(/[\s,]+/).map(Number);
	return {
		dataUrl: r,
		bytes: n,
		width: a?.length === 4 ? a[2] : Number.parseFloat(i.match(/\bwidth\s*=\s*["']?([\d.]+)/i)?.[1]) || 0,
		height: a?.length === 4 ? a[3] : Number.parseFloat(i.match(/\bheight\s*=\s*["']?([\d.]+)/i)?.[1]) || 0
	};
}
function ha(e, t, n = .04) {
	let r = String(e ?? "");
	if (!t || !(t.width > 0) || !(t.height > 0)) return r;
	let i = r.match(/<svg\b[^>]*>/i)?.[0];
	if (!i) return r;
	let a = (e) => Math.round(e * 1e3) / 1e3, o = Math.max(t.width, t.height) * Math.max(0, n), s = a(t.x - o), c = a(t.y - o), l = a(t.width + 2 * o), u = a(t.height + 2 * o), d = i.replace(/\sviewBox\s*=\s*["'][^"']*["']/i, "").replace(/\swidth\s*=\s*["'][^"']*["']/i, "").replace(/\sheight\s*=\s*["'][^"']*["']/i, "").replace(/<svg\b/i, `<svg viewBox="${s} ${c} ${l} ${u}" width="${l}" height="${u}"`);
	return r.replace(i, d);
}
function ga(e) {
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
function _a(e) {
	let t = e || "";
	if (/^data:image\/svg\+xml[;,]/.test(t)) return "svg";
	let n = t.match(/^data:audio\/([a-z0-9.+-]+)[;,]/i)?.[1]?.toLowerCase();
	return n ? {
		mpeg: "mp3",
		mp3: "mp3",
		mp4: "m4a",
		"x-m4a": "m4a",
		aac: "aac",
		wav: "wav",
		"x-wav": "wav",
		ogg: "ogg",
		webm: "webm",
		flac: "flac"
	}[n] ?? "mp3" : "webp";
}
function va(e, t = "bilde") {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || t;
}
function ya(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region ../template/assets/engine/0.6.11/glyphs.js
var ba = "urd-recent-glyphs", xa = [
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
function Sa(e, t) {
	return [t, ...(Array.isArray(e) ? e : []).filter((e) => e !== t)].slice(0, 16);
}
function Ca() {
	try {
		let e = JSON.parse(localStorage.getItem("urd-recent-glyphs") ?? "[]");
		return Array.isArray(e) ? e : [];
	} catch {
		return [];
	}
}
function wa(e) {
	let t = Sa(Ca(), e);
	try {
		localStorage.setItem(ba, JSON.stringify(t));
	} catch {}
	return t;
}
//#endregion
//#region ../template/assets/engine/0.6.11/icons.js
var Ta = "fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"", Ea = "fill=\"currentColor\" stroke=\"none\"", Da = {
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
	cart: {
		label: "Handlekurv",
		body: "<circle cx=\"9.3\" cy=\"19.3\" r=\"1.5\"/><circle cx=\"17.3\" cy=\"19.3\" r=\"1.5\"/><path d=\"M3 4.5h2.4l2.3 10.6a1.8 1.8 0 0 0 1.8 1.4h7.6a1.8 1.8 0 0 0 1.8-1.4L20.8 8H6.1\"/>"
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
}, Oa = [
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
		"cart",
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
function ka(e) {
	let t = typeof e == "string" ? Da[e] : null;
	return t ? `<svg viewBox="0 0 24 24" width="100%" height="100%" ${t.fill ? Ea : Ta} aria-hidden="true" focusable="false">${t.body}</svg>` : null;
}
//#endregion
//#region src/lib/GlyphPicker.svelte
var Aa = /* @__PURE__ */ V("<img class=\"gp-own svelte-15ln1c3\"/>"), ja = /* @__PURE__ */ V("<span class=\"gp-svg svelte-15ln1c3\"></span>"), Ma = /* @__PURE__ */ V("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), Na = /* @__PURE__ */ V("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), Pa = /* @__PURE__ */ V("<button type=\"button\"><span class=\"gp-svg svelte-15ln1c3\"></span></button>"), Fa = /* @__PURE__ */ V("<button type=\"button\"> </button>"), Ia = /* @__PURE__ */ V("<div class=\"gp-group svelte-15ln1c3\"> </div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\"> </button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\"> </p>", 1), La = /* @__PURE__ */ V("<div class=\"gp-pop svelte-15ln1c3\"><!> <!> <!> <!></div>"), Ra = /* @__PURE__ */ V("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"><!></button> <!></span>");
function za(e, t) {
	qe(t, !0);
	let n = ki(t, "value", 3, "★"), r = ki(t, "icon", 3, null), i = ki(t, "image", 3, null), a = ki(t, "label", 19, () => Y("gp.pickGlyph")), o = /* @__PURE__ */ N(an([])), s = /* @__PURE__ */ N(null), c = /* @__PURE__ */ N(null), l = /* @__PURE__ */ N(!1), u = /* @__PURE__ */ N(an({
		top: 0,
		left: 0
	}));
	function d() {
		P(o, Ca(), !0);
		let e = z(s).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		P(u, {
			top: n,
			left: t
		}, !0), P(l, !0);
	}
	function f(e) {
		wa(e), t.onpick?.(e), P(l, !1);
	}
	function p(e) {
		t.onicon?.(e), P(l, !1);
	}
	async function m(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", !n) return;
		let r = await da(n, 256);
		t.onimage?.(r.dataUrl), P(l, !1);
	}
	Cn(() => {
		if (!z(l)) return;
		let e = (e) => {
			z(s) && !z(s).contains(e.target) && P(l, !1);
		}, t = (e) => {
			e.key === "Escape" && P(l, !1);
		}, n = (e) => {
			z(s) && e.target instanceof Node && !z(s).contains(e.target) && P(l, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var g = Ra(), _ = F(g), v = F(_), y = (e) => {
		var t = Aa();
		R((e) => {
			J(t, "src", i()), J(t, "alt", e);
		}, [() => Y("gp.ownIcon")]), H(e, t);
	}, b = (e) => {
		var t = ja();
		G(t, () => ka(r()), !0), k(t), H(e, t);
	}, x = (e) => {
		var t = Pr();
		R(() => U(t, n() || "★")), H(e, t);
	};
	W(v, (e) => {
		i() ? e(y) : r() && Da[r()] ? e(b, 1) : e(x, -1);
	}), k(_);
	var S = L(_, 2), C = (e) => {
		var i = La(), a = F(i), s = (e) => {
			var t = Na(), n = I(t), r = F(n, !0);
			k(n);
			var i = L(n, 2);
			Kr(i, 20, () => z(o), (e) => e, (e, t) => {
				var n = Ma(), r = F(n, !0);
				k(n), R(() => U(r, t)), B("click", n, () => f(t)), H(e, n);
			}), k(i), R((e) => U(r, e), [() => Y("common.recent")]), H(e, t);
		};
		W(a, (e) => {
			z(o).length && e(s);
		});
		var l = L(a, 2), d = (e) => {
			var t = Fr();
			Kr(I(t), 17, () => Oa, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ j(() => h(z(t), 2));
				let i = () => z(n)[0], a = () => z(n)[1];
				var o = Na(), s = I(o), c = F(s, !0);
				k(s);
				var l = L(s, 2);
				Kr(l, 20, a, (e) => e, (e, t) => {
					var n = Pa();
					let i;
					var a = F(n);
					G(a, () => ka(t), !0), k(a), k(n), R(() => {
						i = pi(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, i, { active: t === r() }), J(n, "title", Da[t].label);
					}), B("click", n, () => p(t)), H(e, n);
				}), k(l), R((e) => U(c, e), [() => Y(i())]), H(e, o);
			}), H(e, t);
		};
		W(l, (e) => {
			t.onicon && e(d);
		});
		var g = L(l, 2);
		Kr(g, 17, () => xa, ([e, t]) => e, (e, t) => {
			var r = /* @__PURE__ */ j(() => h(z(t), 2));
			let i = () => z(r)[0], a = () => z(r)[1];
			var o = Na(), s = I(o), c = F(s, !0);
			k(s);
			var l = L(s, 2);
			Kr(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var r = Fa();
				let i;
				var a = F(r, !0);
				k(r), R(() => {
					i = pi(r, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === n() }), U(a, t);
				}), B("click", r, () => f(t)), H(e, r);
			}), k(l), R((e) => U(c, e), [() => Y(i())]), H(e, o);
		});
		var _ = L(g, 2), v = (e) => {
			var t = Ia(), n = I(t), r = F(n, !0);
			k(n);
			var i = L(n, 2), a = F(i, !0);
			k(i);
			var o = L(i, 2);
			Oi(o, (e) => P(c, e), () => z(c));
			var s = L(o, 2), l = F(s, !0);
			k(s), R((e, t, n) => {
				U(r, e), U(a, t), U(l, n);
			}, [
				() => Y("gp.ownIcon"),
				() => Y("gp.upload"),
				() => Y("gp.uploadHint")
			]), B("click", i, () => z(c).click()), B("change", o, m), H(e, t);
		};
		W(_, (e) => {
			t.onimage && e(v);
		}), k(i), R(() => hi(i, `top: ${z(u).top ?? ""}px; left: ${z(u).left ?? ""}px`)), H(e, i);
	};
	W(S, (e) => {
		z(l) && e(C);
	}), k(g), Oi(g, (e) => P(s, e), () => z(s)), R(() => {
		J(_, "title", a()), J(_, "aria-label", a());
	}), B("click", _, () => z(l) ? P(l, !1) : d()), H(e, g), Je();
}
Er(["click", "change"]);
//#endregion
//#region src/lib/previewBridge.js
function Ba(e, t = {}) {
	let n = (e) => {
		if (e.origin !== location.origin) return;
		let n = e.data;
		n?.type === "urd-edit" && t.onEdit?.(n), n?.type === "urd-move" && t.onMove?.(n), n?.type === "urd-grow" && t.onGrow?.(n), n?.type === "urd-delete" && t.onDelete?.(n), n?.type === "urd-add-section" && t.onAddSection?.(n), n?.type === "urd-move-section" && t.onMoveSection?.(n), n?.type === "urd-delete-section" && t.onDeleteSection?.(n), n?.type === "urd-section-size" && t.onSectionSize?.(n), n?.type === "urd-undo" && t.onUndo?.(n), n?.type === "urd-select-section" && t.onSelectSection?.(n), n?.type === "urd-select-block" && t.onSelectBlock?.(n), n?.type === "urd-block-menu" && t.onBlockMenu?.(n), n?.type === "urd-plugin-blocks" && t.onPluginBlocks?.(n), n?.type === "urd-ready" && t.onReady?.(n), n?.type === "urd-navigate" && t.onNavigate?.(n), n?.type === "urd-add-block" && t.onAddBlock?.(n), n?.type === "urd-add-blocks" && t.onAddBlocks?.(n), n?.type === "urd-request-block" && t.onRequestBlock?.(n), n?.type === "urd-move-block-section" && t.onMoveBlockSection?.(n), n?.type === "urd-mobile-reset" && t.onMobileReset?.(n), n?.type === "urd-mobile-order" && t.onMobileOrder?.(n), n?.type === "urd-review-done" && t.onReviewDone?.(n), n?.type === "urd-block-flag" && t.onBlockFlag?.(n), n?.type === "urd-collection-edit" && t.onCollectionEdit?.(n), n?.type === "urd-collection-add" && t.onCollectionAdd?.(n), n?.type === "urd-nav-width" && t.onNavWidth?.(n), n?.type === "urd-save-template" && t.onSaveTemplate?.(n), n?.type === "urd-sticky-group" && t.onStickyGroup?.(n), n?.type === "urd-sticky-dock" && t.onStickyDock?.(n), n?.type === "urd-delete-template" && t.onDeleteTemplate?.(n), n?.type === "urd-apply-layout" && t.onApplyLayout?.(n);
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
		sendScrollSection(e) {
			r({
				type: "urd-scroll-section",
				sectionId: e
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
function Va(e, t) {
	return !(e > 0) || !(t > 0) ? 1 : e / t;
}
function Ha(e, t, n, r = 0, i = 0) {
	if (n === "full") return 1;
	let a = i > 0 ? Va(r, i) : Infinity;
	return Math.max(.1, Math.min(1, Va(e, t), a));
}
var Ua = 1920, Wa = [
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
], Ga = [
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
], Ka = [
	1920,
	1536,
	1366
];
function qa(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 1440;
	let n = Math.round(t / 20) * 20;
	return Math.min(Ua, Math.max(960, n));
}
function Ja(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 6;
	let n = Math.round(t / 1) * 1;
	return Math.min(12, Math.max(0, n));
}
function Ya(e, t) {
	if (e === "full") return 0;
	let n = Math.min(49, Math.max(0, Number(t) || 0));
	return Math.ceil(Number(e) / (1 - 2 * n / 100));
}
function Xa(e, t, n) {
	let r = Math.max(0, Number(t) || 0) / 100 * n, i = Math.max(0, n - 2 * r), a = e !== "full" && Number(e) < i, o = a ? Number(e) : i;
	return {
		width: o,
		margin: Math.round((n - o) / 2),
		pct: n > 0 ? o / n * 100 : 0,
		bound: a
	};
}
function Za(e) {
	return Ga.find((t) => t.width === e)?.id ?? null;
}
//#endregion
//#region src/lib/Dropdown.svelte
var Qa = /* @__PURE__ */ V("<button type=\"button\"> </button>"), $a = /* @__PURE__ */ V("<div class=\"dd-pop svelte-vtocc6\"></div>"), eo = /* @__PURE__ */ V("<span class=\"dd svelte-vtocc6\"><button type=\"button\" class=\"dd-btn svelte-vtocc6\"><span class=\"dd-value svelte-vtocc6\"> </span> <span class=\"dd-caret svelte-vtocc6\"> </span></button> <!></span>");
function X(e, t) {
	qe(t, !0);
	let n = ki(t, "value", 3, null), r = ki(t, "options", 19, () => []), i = ki(t, "title", 3, null), a = ki(t, "disabled", 3, !1), o = /* @__PURE__ */ N(!1), s = /* @__PURE__ */ N(null), c = /* @__PURE__ */ N(an({
		top: 0,
		left: 0,
		width: 160
	})), l = () => r().find(([e]) => `${e ?? ""}` == `${n() ?? ""}`)?.[1] ?? "";
	function u() {
		let e = z(s).getBoundingClientRect(), t = Math.min(320, r().length * 32 + 12), n = Math.max(e.width, 160), i = e.bottom + t + 8 <= window.innerHeight;
		P(c, {
			top: i ? e.bottom + 4 : Math.max(8, e.top - t - 4),
			left: Math.max(8, Math.min(e.left, window.innerWidth - n - 8)),
			width: n
		}, !0);
	}
	function d() {
		if (!a()) {
			if (z(o)) {
				P(o, !1);
				return;
			}
			u(), P(o, !0);
		}
	}
	function f(e) {
		P(o, !1), t.onchange?.(e);
	}
	Cn(() => {
		if (!z(o)) return;
		let e = (e) => {
			z(s) && !z(s).contains(e.target) && P(o, !1);
		}, t = (e) => {
			e.key === "Escape" && P(o, !1);
		}, n = (e) => {
			z(s) && e.target instanceof Node && !z(s).contains(e.target) && u();
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var p = eo(), m = F(p), g = F(m), _ = F(g, !0);
	k(g);
	var v = L(g, 2), y = F(v, !0);
	k(v), k(m);
	var b = L(m, 2), x = (e) => {
		var t = $a();
		Kr(t, 21, r, ([e, t]) => `${e ?? ""}`, (e, t) => {
			var r = /* @__PURE__ */ j(() => h(z(t), 2));
			let i = () => z(r)[0], a = () => z(r)[1];
			var o = Qa();
			let s;
			var c = F(o, !0);
			k(o), R(() => {
				s = pi(o, 1, "dd-opt svelte-vtocc6", null, s, { valgt: `${i() ?? ""}` == `${n() ?? ""}` }), U(c, a());
			}), B("click", o, () => f(i())), H(e, o);
		}), k(t), R(() => hi(t, `top: ${z(c).top ?? ""}px; left: ${z(c).left ?? ""}px; min-width: ${z(c).width ?? ""}px`)), H(e, t);
	};
	W(b, (e) => {
		z(o) && e(x);
	}), k(p), Oi(p, (e) => P(s, e), () => z(s)), R((e) => {
		J(m, "title", i()), m.disabled = a(), U(_, e), U(y, z(o) ? "▴" : "▾");
	}, [() => l()]), B("click", m, d), H(e, p), Je();
}
Er(["click"]);
//#endregion
//#region src/lib/IconEditor.svelte
var to = /* @__PURE__ */ V("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\"> </h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\"></canvas> <p class=\"ie-hint svelte-e7sog7\"> </p></div> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"ghost svelte-e7sog7\"> </button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"primary svelte-e7sog7\"> </button></span></div></div>");
function no(e, t) {
	qe(t, !0);
	let n = ki(t, "image", 3, ""), r = /* @__PURE__ */ N(null), i = /* @__PURE__ */ N(null), a = /* @__PURE__ */ N(1), o = /* @__PURE__ */ N(.5), s = /* @__PURE__ */ N(.5), c = /* @__PURE__ */ N(1), l = /* @__PURE__ */ N(1), u = /* @__PURE__ */ N(1);
	Cn(() => {
		if (!n()) return;
		let e = new Image();
		e.onload = () => {
			P(i, e, !0);
		}, e.src = n();
	});
	function d(e, t) {
		if (e.clearRect(0, 0, t, t), !z(i)) return;
		e.filter = `brightness(${z(c)}) contrast(${z(l)}) saturate(${z(u)})`;
		let n = Math.max(t / z(i).width, t / z(i).height) * z(a), r = z(i).width * n, d = z(i).height * n, f = t / 2 - z(o) * r, p = t / 2 - z(s) * d;
		f = Math.min(0, Math.max(t - r, f)), p = Math.min(0, Math.max(t - d, p)), e.drawImage(z(i), f, p, r, d), e.filter = "none";
	}
	Cn(() => {
		z(i), z(a), z(o), z(s), z(c), z(l), z(u), z(r) && d(z(r).getContext("2d"), 220);
	});
	function f(e) {
		if (!z(i)) return;
		e.preventDefault();
		let t = e.clientX, n = e.clientY, r = Math.max(220 / z(i).width, 220 / z(i).height) * z(a), c = z(i).width * r, l = z(i).height * r, u = (e) => {
			P(o, Math.min(1, Math.max(0, z(o) - (e.clientX - t) / c)), !0), P(s, Math.min(1, Math.max(0, z(s) - (e.clientY - n) / l)), !0), t = e.clientX, n = e.clientY;
		}, d = () => {
			window.removeEventListener("pointermove", u), window.removeEventListener("pointerup", d);
		};
		window.addEventListener("pointermove", u), window.addEventListener("pointerup", d);
	}
	function p() {
		P(a, 1), P(o, .5), P(s, .5), P(c, 1), P(l, 1), P(u, 1);
	}
	function m() {
		let e = document.createElement("canvas");
		e.width = 128, e.height = 128, d(e.getContext("2d"), 128), t.onapply?.(e.toDataURL("image/webp", .92));
	}
	var h = to(), g = F(h), _ = F(g), v = F(_, !0);
	k(_);
	var y = L(_, 2), b = F(y);
	J(b, "width", 220), J(b, "height", 220), Oi(b, (e) => P(r, e), () => z(r));
	var x = L(b, 2), S = F(x, !0);
	k(x), k(y);
	var C = L(y, 2), w = F(C), ee = L(w), te = F(ee);
	k(ee), k(C);
	var ne = L(C, 2);
	K(ne);
	var re = L(ne, 2), ie = F(re), ae = L(ie), oe = F(ae);
	k(ae), k(re);
	var se = L(re, 2);
	K(se);
	var ce = L(se, 2), le = F(ce), ue = L(le), de = F(ue);
	k(ue), k(ce);
	var fe = L(ce, 2);
	K(fe);
	var pe = L(fe, 2), me = F(pe), he = L(me), ge = F(he);
	k(he), k(pe);
	var _e = L(pe, 2);
	K(_e);
	var ve = L(_e, 2), ye = F(ve), be = F(ye, !0);
	k(ye);
	var xe = L(ye, 2), Se = F(xe, !0);
	k(xe), k(ve);
	var Ce = L(ve, 2), we = F(Ce), Te = F(we, !0);
	k(we);
	var Ee = L(we, 2), De = F(Ee, !0);
	k(Ee), k(Ce), k(g), k(h), R((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) => {
		U(v, e), J(b, "title", t), U(S, n), U(w, `${r ?? ""} `), U(te, `${i ?? ""}x`), U(ie, `${a ?? ""} `), U(oe, `${o ?? ""}%`), U(le, `${s ?? ""} `), U(de, `${c ?? ""}%`), U(me, `${l ?? ""} `), U(ge, `${u ?? ""}%`), U(be, d), U(Se, f), U(Te, p), U(De, m);
	}, [
		() => Y("ie.title"),
		() => Y("ie.dragTip"),
		() => Y("ie.hint"),
		() => Y("lbl.zoom"),
		() => z(a).toFixed(2),
		() => Y("lbl.brightness"),
		() => Math.round(z(c) * 100),
		() => Y("lbl.contrast"),
		() => Math.round(z(l) * 100),
		() => Y("lbl.saturate"),
		() => Math.round(z(u) * 100),
		() => Y("ie.grayscale"),
		() => Y("common.reset"),
		() => Y("confirm.cancel"),
		() => Y("common.apply")
	]), B("pointerdown", b, f), wi(ne, () => z(a), (e) => P(a, e)), wi(se, () => z(c), (e) => P(c, e)), wi(fe, () => z(l), (e) => P(l, e)), wi(_e, () => z(u), (e) => P(u, e)), B("click", ye, () => P(u, 0)), B("click", xe, p), B("click", we, () => t.oncancel?.()), B("click", Ee, m), H(e, h), Je();
}
Er(["pointerdown", "click"]);
var ro = 24, io = {
	"oppsett-byttet": "layout-changed",
	"blokk-endret": "block-edited",
	"desktop-endret-etter-mobil": "desktop-changed-after-mobile",
	seksjonshøyde: "section-height",
	"blokk-flyttet": "block-moved",
	"blokk-slettet": "block-deleted",
	"blokk-lagt-til": "block-added"
};
function ao(e, t) {
	if (!e || !("y" in e || "h" in e)) return e ?? null;
	if (t && e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h) return null;
	let n = {
		x: e.x,
		w: e.w
	};
	return Number.isFinite(e.y) && (n.row = Math.max(1, Math.round((e.y - ro) / 8) + 1), n.rows = Number.isFinite(e.h) ? Math.max(1, Math.ceil(e.h / 8)) : 1), Number.isFinite(e.z) && e.z !== 1 && (n.z = e.z), e.rot && (n.rot = e.rot), n;
}
var oo = { 1: (e) => {
	for (let t of e.sections ?? []) {
		let e = t.responsive?.mobile;
		for (let e of t.blocks ?? []) e.decor && (e.hideMobile = !0), e.frames?.mobile && (e.frames.mobile = ao(e.frames.mobile, e.frames.desktop));
		e?.mode === "manual" && (e.mode = "auto");
		let n = e?.attention?.reason;
		n && io[n] && (e.attention.reason = io[n]);
	}
	return e;
} }, so = {
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
function co(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 3;) {
		let r = so[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function lo(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 2;) {
		let i = oo[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/0.6.11/plugins.js
function uo(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var fo = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function po(e, t) {
	let n = uo(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = uo(t[2]), a = fo(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var mo = /^[a-z0-9][a-z0-9-]*$/;
function ho(e) {
	let t = [];
	if (!e || typeof e != "object") return ["manifestet er ikke et objekt"];
	mo.test(e.id ?? "") || t.push("id mangler eller er ugyldig"), (typeof e.name != "string" || !e.name) && t.push("name mangler"), uo(e.version ?? "") || t.push("version er ikke semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine mangler");
	let n = Array.isArray(e.languages) && e.languages.length > 0;
	return (e.entry !== void 0 || !n) && (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry mangler eller er ikke en .js-fil"), (e.provides !== void 0 || !n) && (!e.provides || typeof e.provides != "object") && t.push("provides mangler"), e.languages !== void 0 && t.push(...Ii(e.languages)), e.locales !== void 0 && typeof e.locales != "boolean" && t.push("locales må være boolsk"), e.names !== void 0 && (typeof e.names != "object" || e.names === null || Array.isArray(e.names) || Object.values(e.names).some((e) => typeof e != "string" || !e)) && t.push("names må være et objekt med språkkode til navn"), t;
}
//#endregion
//#region ../template/assets/engine/0.6.11/sections/presets.js
function go(e) {
	return typeof crypto < "u" && crypto.randomUUID ? `${e}-${crypto.randomUUID().slice(0, 8)}` : `${e}-${[...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4))].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
var _o = () => ({ mobile: {
	mode: "auto",
	attention: null
} }), Z = (e, t, n, r, i = 1) => ({
	desktop: {
		x: e,
		y: t,
		w: n,
		h: r,
		z: i,
		rot: 0
	},
	mobile: null
}), Q = (e, t, n = {}) => ({
	id: go("blk"),
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
}), vo = (e, t = {}) => ({
	id: go("blk"),
	type: "image",
	version: 1,
	props: {
		src: "",
		alt: Y("seed.imageAlt"),
		fit: "cover",
		radius: "md",
		href: null,
		...t
	},
	animation: null,
	frames: e
}), yo = (e, t, n = {}) => ({
	id: go("blk"),
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
}), bo = (e, t, n = 40) => ({
	id: go("blk"),
	type: "icon",
	version: 1,
	props: {
		glyph: t,
		color: "accent",
		size: n
	},
	animation: null,
	frames: e
}), xo = () => ({
	type: "hover-lift",
	version: 1,
	props: {}
}), So = (e, t, n = {}) => ({
	id: go("blk"),
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
}), Co = (e, t = {}) => ({
	id: go("blk"),
	type: "produkt",
	version: 1,
	props: {
		collection: null,
		limit: 0,
		columns: 0,
		currency: "kr",
		...t
	},
	animation: null,
	frames: e
}), wo = (e, t = {}) => ({
	id: go("blk"),
	type: "handlekurv",
	version: 1,
	props: {
		variant: "button",
		href: "",
		currency: "kr",
		...t
	},
	animation: null,
	frames: e
}), To = (e, t = {}) => ({
	id: go("blk"),
	type: "kasse",
	version: 1,
	props: {
		recipient: "",
		endpoint: "",
		vipps: "",
		currency: "kr",
		...t
	},
	animation: null,
	frames: e
}), Eo = (e, t = {}) => ({
	id: go("blk"),
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
}), Do = (e, t) => ({
	id: go("blk"),
	type: "faq",
	version: 1,
	props: {
		items: t,
		multi: !1
	},
	animation: null,
	frames: e
}), Oo = (e, t = {}) => ({
	id: go("blk"),
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
}), ko = (e, t) => ({
	id: go("blk"),
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
}), Ao = (e, t = {}) => ({
	id: go("blk"),
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
}), jo = (...e) => ({
	version: 1,
	layers: e
}), Mo = (e) => ({
	type: "color",
	version: 1,
	props: { value: e }
}), No = (e, t, n, r = .5) => ({
	type: "glow",
	version: 1,
	props: {
		x: e,
		y: t,
		color: "accent",
		radius: r,
		opacity: n
	}
}), Po = (e) => Math.max(0, ...e.blocks.map((e) => e.frames.desktop.y + e.frames.desktop.h)), Fo = (e, t, n, r, i, a) => ({
	x: n + e % t * r,
	y: i + Math.floor(e / t) * a
}), Io = (e, t, n, r, i, a, o, s, c = 0) => {
	let l = (t) => e.blocks.some((e) => {
		let n = e.frames.desktop;
		return n.x < t.x + t.w - .01 && t.x < n.x + n.w - .01 && n.y < t.y + t.h - .01 && t.y < n.y + n.h - .01;
	});
	for (let e = 0; e < 60; e++) {
		let u = Fo(e, t, n, r, i, a);
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
		y: Po(e) + 16,
		n: 0
	};
}, Lo = (e, t, n) => e + t * .1 + n * .01, Ro = (e, t, n, r, i = null) => ({
	id: go("sec"),
	version: 1,
	preset: e,
	size: { minHeight: t },
	grid: i,
	background: n,
	blocks: r,
	responsive: _o()
});
function zo(e) {
	e.sections.define("tom", {
		label: "Tom seksjon",
		labelKey: "preset.tom.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Blankt lerret å bygge fritt på",
		hintKey: "preset.tom.hint",
		create: () => Ro("tom", "40vh", jo(Mo("bg")), [])
	}), e.sections.define("hero", {
		label: "Hero",
		labelKey: "preset.hero.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Stor åpning med gradient og glød, venstrestilt",
		hintKey: "preset.hero.hint",
		create: () => Ro("hero", "70vh", {
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
				No(.7, .2, .35),
				{
					type: "grain",
					version: 1,
					props: { opacity: .06 }
				}
			]
		}, [
			Q(Z(8.33, 40, 50, 38), Y("seed.hero.title")),
			Q(Z(8.33, 84, 41.67, 26), Y("seed.hero.intro")),
			yo(Z(8.33, 118, 20, 32), Y("seed.readMore"))
		])
	}), e.sections.define("hero-sentrert", {
		label: "Hero, sentrert",
		labelKey: "preset.hero-sentrert.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Sentrert åpning med to knapper",
		hintKey: "preset.hero-sentrert.hint",
		create: () => Ro("hero-sentrert", "60vh", jo(Mo("bg")), [
			Q(Z(15, 64, 70, 44), Y("seed.heroCenter.title"), { align: "center" }),
			Q(Z(25, 116, 50, 26), Y("seed.heroCenter.intro"), { align: "center" }),
			yo(Z(31.5, 160, 17, 40), Y("seed.join")),
			yo(Z(51.5, 160, 17, 40), Y("seed.readMore"), { style: "secondary" })
		])
	}), e.sections.define("bilder", {
		label: "Bilder",
		labelKey: "preset.bilder.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Tittel og tre bilderammer",
		hintKey: "preset.bilder.hint",
		create: () => Ro("bilder", "360px", jo(Mo("bg")), [
			Q(Z(4, 24, 50, 32), Y("seed.images.title")),
			vo(Z(4, 72, 28, 220)),
			vo(Z(36, 72, 28, 220)),
			vo(Z(68, 72, 28, 220))
		]),
		itemLabel: "bilde",
		itemLabelKey: "item.image",
		item: (e) => {
			let { x: t, y: n } = Io(e, 3, 4, 32, 72, 244, 28, 220);
			return {
				blocks: [vo(Z(t, n, 28, 220))],
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
		create: () => Ro("galleri", "440px", jo(Mo("bg")), [Q(Z(4, 24, 50, 32), Y("seed.gallery.title")), Eo(Z(4, 72, 92, 320))])
	}), e.sections.define("kontakt", {
		label: "Kontakt",
		labelKey: "preset.kontakt.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Kontaktinfo i kort med e-postknapp",
		hintKey: "preset.kontakt.hint",
		create: () => Ro("kontakt", "320px", jo(Mo("surface"), No(.2, .8, .2)), [
			Q(Z(10, 32, 40, 36), Y("seed.contact.title")),
			Q(Z(10, 84, 36, 130), Y("seed.contact.info"), { box: !0 }),
			yo(Z(60, 100, 22, 40), Y("seed.contact.button"), { href: "mailto:post@dinforening.no" })
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
				let i = bo(Z(e + 10.5, 88, 4, 52), n), a = Q(Z(e, 152, 25, 200), Y("seed.features.card", { title: r }), {
					align: "center",
					box: !0
				});
				return a.animation = xo(), i.mobileOrder = Lo(88, t, 0), a.mobileOrder = Lo(88, t, 1), [i, a];
			};
			return Ro("funksjonskort", "420px", jo(Mo("bg")), [
				Q(Z(6, 28, 60, 38), Y("seed.features.title")),
				...e(6, 0, "✦", Y("seed.features.card1")),
				...e(37.5, 1, "★", Y("seed.features.card2")),
				...e(69, 2, "✓", Y("seed.features.card3"))
			]);
		},
		itemLabel: "kort",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = Io(e, 3, 6, 31.5, 152, 296, 25, 264, -64), i = bo(Z(t + 10.5, n - 64, 4, 52), "✦"), a = Q(Z(t, n, 25, 200), Y("seed.features.card", { title: Y("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return a.animation = xo(), i.mobileOrder = Lo(88, r, 0), a.mobileOrder = Lo(88, r, 1), {
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
				let r = Q(Z(e, 88, 25, 200), Y("seed.features.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.animation = xo(), r.mobileOrder = Lo(88, t, 0), r;
			};
			return Ro("funksjonskort-enkel", "360px", jo(Mo("bg")), [
				Q(Z(6, 28, 60, 38), Y("seed.features.title")),
				e(6, 0, Y("seed.features.card1")),
				e(37.5, 1, Y("seed.features.card2")),
				e(69, 2, Y("seed.features.card3"))
			]);
		},
		itemLabel: "kort",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = Io(e, 3, 6, 31.5, 88, 232, 25, 200), i = Q(Z(t, n, 25, 200), Y("seed.features.card", { title: Y("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.animation = xo(), i.mobileOrder = Lo(88, r, 0), {
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
				let n = vo(Z(e, 88, 25, 160)), r = Q(Z(e, 256, 25, 160), Y("seed.news.card"));
				return n.mobileOrder = Lo(88, t, 0), r.mobileOrder = Lo(88, t, 1), [n, r];
			};
			return Ro("nyheter", "460px", jo(Mo("bg")), [
				Q(Z(6, 28, 50, 38), Y("seed.news.title")),
				yo(Z(78, 30, 16, 36), Y("seed.news.seeAll"), { style: "secondary" }),
				...e(6, 0),
				...e(37.5, 1),
				...e(69, 2)
			]);
		},
		itemLabel: "sak",
		itemLabelKey: "item.story",
		item: (e) => {
			let { x: t, y: n, n: r } = Io(e, 3, 6, 31.5, 88, 344, 25, 328), i = vo(Z(t, n, 25, 160)), a = Q(Z(t, n + 168, 25, 160), Y("seed.news.card"));
			return i.mobileOrder = Lo(88, r, 0), a.mobileOrder = Lo(88, r, 1), {
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
		create: () => Ro("nyheter-samling", "300px", jo(Mo("bg")), [Q(Z(6, 28, 50, 38), Y("seed.news.title")), So(Z(6, 88, 88, 180), "cards")])
	}), e.sections.define("oppslagstavle", {
		label: "Oppslagstavle",
		labelKey: "preset.oppslagstavle.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Datert liste fra en samling (oppslag/kunngjøringer)",
		hintKey: "preset.oppslagstavle.hint",
		create: () => Ro("oppslagstavle", "300px", jo(Mo("surface")), [Q(Z(6, 28, 50, 38), Y("seed.noticeboard.title")), So(Z(6, 88, 88, 180), "list", { limit: 8 })])
	}), e.sections.define("publikasjonsarkiv", {
		label: "Publikasjonsarkiv",
		labelKey: "preset.publikasjonsarkiv.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "År-gruppert arkiv fra en samling (utgaver, referater, rapporter)",
		hintKey: "preset.publikasjonsarkiv.hint",
		create: () => Ro("publikasjonsarkiv", "300px", jo(Mo("bg")), [Q(Z(6, 28, 60, 38), Y("seed.archive.title")), So(Z(6, 88, 88, 180), "archive", { limit: 0 })])
	}), e.sections.define("arrangementer", {
		label: "Arrangementer",
		labelKey: "preset.arrangementer.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Tre rader med dato-badge og påmeldingsknapp",
		hintKey: "preset.arrangementer.hint",
		create: () => {
			let e = (e, t, n, r) => [
				Q(Z(6, e, 8, 88), Y("seed.events.dateBadge", {
					day: t,
					month: n
				}), {
					align: "center",
					box: !0
				}),
				Q(Z(16, e, 58, 88), Y("seed.events.row", { title: r })),
				yo(Z(78, e + 24, 16, 40), Y("seed.events.signup"), { style: "secondary" })
			];
			return Ro("arrangementer", "440px", jo(Mo("surface")), [
				Q(Z(6, 28, 50, 38), Y("seed.events.title")),
				...e(88, "11", Y("seed.events.monthAug"), Y("seed.events.row1")),
				...e(196, "25", Y("seed.events.monthAug"), Y("seed.events.row2")),
				...e(304, "8", Y("seed.events.monthSep"), Y("seed.events.row3"))
			]);
		},
		itemLabel: "rad",
		itemLabelKey: "item.row",
		item: (e) => {
			let t = Po(e) + 16;
			return {
				blocks: [
					Q(Z(6, t, 8, 88), Y("seed.events.newBadge"), {
						align: "center",
						box: !0
					}),
					Q(Z(16, t, 58, 88), Y("seed.events.row", { title: Y("seed.events.newTitle") })),
					yo(Z(78, t + 24, 16, 40), Y("seed.events.signup"), { style: "secondary" })
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
				let r = vo(Z(e, 80, 22, 180), { alt: Y("seed.team.alt") }), i = Q(Z(e, 268, 22, 84), Y("seed.team.member", { role: n }), { align: "center" });
				return r.mobileOrder = Lo(80, t, 0), i.mobileOrder = Lo(80, t, 1), [r, i];
			};
			return Ro("team", "420px", jo(Mo("surface")), [
				Q(Z(6, 24, 50, 32), Y("seed.team.title")),
				...e(7.5, 0, Y("seed.team.role1")),
				...e(39, 1, Y("seed.team.role2")),
				...e(70.5, 2, Y("seed.team.role3"))
			]);
		},
		itemLabel: "person",
		itemLabelKey: "item.person",
		item: (e) => {
			let { x: t, y: n, n: r } = Io(e, 3, 7.5, 31.5, 80, 288, 22, 272), i = vo(Z(t, n, 22, 180), { alt: Y("seed.team.alt") }), a = Q(Z(t, n + 188, 22, 84), Y("seed.team.member", { role: Y("seed.team.roleNew") }), { align: "center" });
			return i.mobileOrder = Lo(80, r, 0), a.mobileOrder = Lo(80, r, 1), {
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
		create: () => Ro("faq", "520px", jo(Mo("bg")), [
			Q(Z(25, 24, 50, 36), Y("seed.faq.title"), { align: "center" }),
			Do(Z(20, 80, 60, 320), [
				{
					q: Y("seed.faq.q1"),
					a: Y("seed.faq.answer")
				},
				{
					q: Y("seed.faq.q2"),
					a: Y("seed.faq.answer")
				},
				{
					q: Y("seed.faq.q3"),
					a: Y("seed.faq.answer")
				}
			]),
			Q(Z(20, 416, 60, 32), Y("seed.faq.more"), { align: "center" })
		])
	}), e.sections.define("tidslinje", {
		label: "Tidslinje",
		labelKey: "preset.tidslinje.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Historien som hendelser langs en linje",
		hintKey: "preset.tidslinje.hint",
		create: () => Ro("tidslinje", "480px", jo(Mo("bg")), [Q(Z(25, 24, 50, 36), Y("seed.tidslinje.title"), { align: "center" }), ko(Z(25, 88, 50, 330), [
			{
				year: "2019",
				title: Y("seed.tidslinje.t1"),
				text: Y("seed.tidslinje.text")
			},
			{
				year: "2022",
				title: Y("seed.tidslinje.t2"),
				text: Y("seed.tidslinje.text")
			},
			{
				year: "2026",
				title: Y("seed.tidslinje.t3"),
				text: Y("seed.tidslinje.text")
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
				let r = Q(Z(e, 88, 25, 72), `<h3>${t + 1}</h3>`, {
					align: "center",
					size: 44
				}), i = Q(Z(e, 168, 25, 160), Y("seed.steps.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.mobileOrder = Lo(88, t, 0), i.mobileOrder = Lo(88, t, 1), [r, i];
			};
			return Ro("steg", "400px", jo(Mo("bg")), [
				Q(Z(6, 28, 60, 38), Y("seed.steps.title")),
				...e(6, 0, Y("seed.steps.s1")),
				...e(37.5, 1, Y("seed.steps.s2")),
				...e(69, 2, Y("seed.steps.s3"))
			]);
		},
		itemLabel: "steg",
		itemLabelKey: "item.step",
		item: (e) => {
			let { x: t, y: n, n: r } = Io(e, 3, 6, 31.5, 88, 272, 25, 240), i = Q(Z(t, n, 25, 72), `<h3>${r + 1}</h3>`, {
				align: "center",
				size: 44
			}), a = Q(Z(t, n + 80, 25, 160), Y("seed.steps.card", { title: Y("seed.steps.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.mobileOrder = Lo(88, r, 0), a.mobileOrder = Lo(88, r, 1), {
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
				vo(Z(6, 40, 55, 300)),
				Q(Z(6, 348, 55, 108), Y("seed.feature.main")),
				yo(Z(6, 464, 14, 38), Y("seed.readMore"), { style: "secondary" }),
				vo(Z(66, 40, 28, 120)),
				Q(Z(66, 164, 28, 60), Y("seed.feature.small1")),
				vo(Z(66, 244, 28, 120)),
				Q(Z(66, 368, 28, 60), Y("seed.feature.small2"))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = Lo(40, t < 3 ? 0 : 1, t);
			}), Ro("hovedoppslag", "540px", jo(Mo("bg")), e);
		}
	}), e.sections.define("produkter", {
		label: "Produkter",
		labelKey: "preset.produkter.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Tre håndbygde produktkort med egen kjøpslenke; Butikk-presetet gir ekte produkter med handlekurv",
		hintKey: "preset.produkter.hint",
		create: () => {
			let e = (e, t, n, r) => {
				let i = [
					vo(Z(e, 88, 25, 200)),
					Q(Z(e, 296, 25, 76), Y("seed.products.card", {
						name: n,
						price: r
					}), { align: "center" }),
					yo(Z(e + 5, 380, 15, 40), Y("seed.products.buy"))
				];
				return i.forEach((e, n) => {
					e.mobileOrder = Lo(88, t, n);
				}), i;
			};
			return Ro("produkter", "470px", jo(Mo("bg")), [
				Q(Z(6, 28, 50, 38), Y("seed.products.title")),
				...e(6, 0, Y("seed.products.name"), Y("seed.products.price1")),
				...e(37.5, 1, Y("seed.products.name"), Y("seed.products.price2")),
				...e(69, 2, Y("seed.products.name"), Y("seed.products.price3"))
			]);
		},
		itemLabel: "produkt",
		itemLabelKey: "item.product",
		item: (e) => {
			let { x: t, y: n, n: r } = Io(e, 3, 6, 31.5, 88, 348, 25, 332), i = [
				vo(Z(t, n, 25, 200)),
				Q(Z(t, n + 208, 25, 76), Y("seed.products.card", {
					name: Y("seed.products.name"),
					price: Y("seed.products.price1")
				}), { align: "center" }),
				yo(Z(t + 5, n + 292, 15, 40), Y("seed.products.buy"))
			];
			return i.forEach((e, t) => {
				e.mobileOrder = Lo(88, r, t);
			}), {
				blocks: i,
				bottom: n + 356
			};
		}
	}), e.sections.define("butikk", {
		label: "Butikk",
		labelKey: "preset.butikk.label",
		group: "Butikk",
		groupKey: "presetGroup.butikk",
		hint: "Ekte produktkort fra en produktsamling, med handlekurv",
		hintKey: "preset.butikk.hint",
		create: () => Ro("butikk", "544px", jo(Mo("bg")), [
			Q(Z(6, 28, 50, 38), Y("seed.butikk.title")),
			wo(Z(78, 88, 16, 48)),
			Co(Z(6, 176, 88, 320))
		])
	}), e.sections.define("butikk-hero", {
		label: "Butikk-hero",
		labelKey: "preset.butikk-hero.label",
		group: "Butikk",
		groupKey: "presetGroup.butikk",
		hint: "Kampanjebånd: stor overskrift, undertekst, CTA og kampanjebilde",
		hintKey: "preset.butikk-hero.hint",
		create: () => {
			let e = [
				Q(Z(6, 48, 52, 96), Y("seed.butikkHero.title")),
				Q(Z(6, 152, 40, 48), Y("seed.butikkHero.sub")),
				yo(Z(6, 216, 17, 42), Y("seed.butikkHero.cta")),
				vo(Z(62, 40, 32, 300))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = Lo(48, t < 3 ? 0 : 1, t);
			}), Ro("butikk-hero", "400px", {
				version: 1,
				layers: [
					Mo("bg"),
					No(.8, .25, .28, .6),
					{
						type: "grain",
						version: 1,
						props: { opacity: .05 }
					}
				]
			}, e);
		}
	}), e.sections.define("butikk-kategorier", {
		label: "Butikk-kategorier",
		labelKey: "preset.butikk-kategorier.label",
		group: "Butikk",
		groupKey: "presetGroup.butikk",
		hint: "Fire kategorifliser med bilde og navn; lenken settes på bildet i Egenskaper",
		hintKey: "preset.butikk-kategorier.hint",
		create: () => {
			let e = (e, t, n) => {
				let r = vo(Z(e, 88, 21, 170)), i = Q(Z(e, 266, 21, 34), Y("seed.butikkKategorier.tile", { name: n }), { align: "center" });
				return r.mobileOrder = Lo(88, t, 0), i.mobileOrder = Lo(88, t, 1), [r, i];
			}, t = Ro("butikk-kategorier", "360px", jo(Mo("bg")), [
				Q(Z(6, 28, 60, 38), Y("seed.butikkKategorier.title")),
				...e(6, 0, Y("seed.butikkKategorier.cat1")),
				...e(29.5, 1, Y("seed.butikkKategorier.cat2")),
				...e(53, 2, Y("seed.butikkKategorier.cat3")),
				...e(76.5, 3, Y("seed.butikkKategorier.cat4"))
			]);
			return t.theme = "dus", t;
		},
		itemLabel: "kategori",
		itemLabelKey: "item.category",
		item: (e) => {
			let { x: t, y: n, n: r } = Io(e, 4, 6, 23.5, 88, 220, 21, 212), i = vo(Z(t, n, 21, 170)), a = Q(Z(t, n + 178, 21, 34), Y("seed.butikkKategorier.tile", { name: Y("seed.butikkKategorier.newCat") }), { align: "center" });
			return i.mobileOrder = Lo(88, r, 0), a.mobileOrder = Lo(88, r, 1), {
				blocks: [i, a],
				bottom: n + 220
			};
		}
	}), e.sections.define("butikk-tillit", {
		label: "Butikk-tillit",
		labelKey: "preset.butikk-tillit.label",
		group: "Butikk",
		groupKey: "presetGroup.butikk",
		hint: "Tre tillitspunkter med ikon og tekst (retur, hjelp, trygg bestilling)",
		hintKey: "preset.butikk-tillit.hint",
		create: () => {
			let e = (e, t, n, r) => {
				let i = bo(Z(e + 10.5, 88, 4, 52), r, 44), a = Q(Z(e, 148, 25, 96), Y(n), { align: "center" });
				return i.mobileOrder = Lo(88, t, 0), a.mobileOrder = Lo(88, t, 1), [i, a];
			}, t = Ro("butikk-tillit", "300px", jo(Mo("bg")), [
				Q(Z(6, 28, 60, 38), Y("seed.butikkTillit.title")),
				...e(6, 0, "seed.butikkTillit.t1", "✓"),
				...e(37.5, 1, "seed.butikkTillit.t2", "↻"),
				...e(69, 2, "seed.butikkTillit.t3", "✉")
			]);
			return t.theme = "dempet", t;
		},
		itemLabel: "kort",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = Io(e, 3, 6, 31.5, 148, 216, 25, 156, -60), i = bo(Z(t + 10.5, n - 60, 4, 52), "✓", 44), a = Q(Z(t, n, 25, 96), Y("seed.butikkTillit.newItem"), { align: "center" });
			return i.mobileOrder = Lo(88, r, 0), a.mobileOrder = Lo(88, r, 1), {
				blocks: [i, a],
				bottom: n + 104
			};
		}
	}), e.sections.define("butikk-utstilling", {
		label: "Butikk-utstilling",
		labelKey: "preset.butikk-utstilling.label",
		group: "Butikk",
		groupKey: "presetGroup.butikk",
		hint: "Statement-bånd: stor typografi, tekst, CTA og bilde på dyp flate",
		hintKey: "preset.butikk-utstilling.hint",
		create: () => {
			let e = [
				Q(Z(6, 56, 52, 100), Y("seed.butikkUtstilling.title")),
				Q(Z(6, 164, 42, 56), Y("seed.butikkUtstilling.text")),
				yo(Z(6, 236, 18, 42), Y("seed.butikkUtstilling.cta")),
				vo(Z(62, 48, 32, 240))
			];
			e.forEach((e, t) => {
				e.mobileOrder = Lo(56, t < 3 ? 0 : 1, t);
			});
			let t = Ro("butikk-utstilling", "340px", jo(Mo("bg")), e);
			return t.theme = "dyp", t;
		}
	}), e.sections.define("kasse", {
		label: "Kasse",
		labelKey: "preset.kasse.label",
		group: "Butikk",
		groupKey: "presetGroup.butikk",
		hint: "Bestillingsskjema som sender handlekurven som e-post eller til et endepunkt",
		hintKey: "preset.kasse.hint",
		create: () => Ro("kasse", "560px", jo(Mo("bg")), [Q(Z(6, 28, 50, 38), Y("seed.kasse.title")), To(Z(25, 96, 50, 430))])
	}), e.sections.define("cta", {
		label: "CTA-banner",
		labelKey: "preset.cta.label",
		group: "Fremheving",
		groupKey: "presetGroup.highlight",
		hint: "Full bredde med én tydelig handling",
		hintKey: "preset.cta.hint",
		create: () => Ro("cta", "280px", jo(Mo("surface"), No(.5, .5, .3, .7)), [
			Q(Z(20, 56, 60, 40), Y("seed.cta.title"), { align: "center" }),
			Q(Z(25, 104, 50, 26), Y("seed.cta.sub"), { align: "center" }),
			yo(Z(42, 148, 16, 42), Y("seed.join"))
		])
	}), e.sections.define("sitat", {
		label: "Sitat",
		labelKey: "preset.sitat.label",
		group: "Fremheving",
		groupKey: "presetGroup.highlight",
		hint: "Stort sitat med attribusjon",
		hintKey: "preset.sitat.hint",
		create: () => Ro("sitat", "300px", jo(Mo("bg")), [Oo(Z(20, 56, 60, 190), {
			text: Y("seed.sitat.text"),
			attribution: Y("seed.sitat.name"),
			role: Y("seed.sitat.role")
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
				let a = Ao(Z(e, 76, 25, 120), {
					value: n,
					suffix: r,
					label: i
				});
				return a.mobileOrder = Lo(76, t, 0), a;
			};
			return Ro("statistikk", "260px", jo(Mo("surface")), [
				e(6, 0, "120", "+", Y("seed.stats.l1")),
				e(37.5, 1, "25", "", Y("seed.stats.l2")),
				e(69, 2, "1981", "", Y("seed.stats.l3"))
			]);
		},
		itemLabel: "tall",
		itemLabelKey: "item.number",
		item: (e) => {
			let { x: t, y: n, n: r } = Io(e, 3, 6, 31.5, 76, 140, 25, 120), i = Ao(Z(t, n, 25, 120), {
				value: "42",
				label: Y("seed.stats.newLabel")
			});
			return i.mobileOrder = Lo(76, r, 0), {
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
			let e = (e) => vo(Z(e, 108, 18.5, 100), {
				alt: Y("seed.sponsors.alt"),
				fit: "contain",
				radius: null,
				saturate: 0
			});
			return Ro("sponsorer", "280px", jo(Mo("bg")), [
				Q(Z(6, 28, 60, 36), Y("seed.sponsors.title")),
				e(5.5),
				e(29),
				e(52.5),
				e(76)
			]);
		},
		itemLabel: "logo",
		itemLabelKey: "item.logo",
		item: (e) => {
			let { x: t, y: n } = Io(e, 4, 5.5, 23.5, 108, 124, 18.5, 100);
			return {
				blocks: [vo(Z(t, n, 18.5, 100), {
					alt: Y("seed.sponsors.alt"),
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
		create: () => Ro("medlemskap", "500px", jo(Mo("surface")), [
			Q(Z(6, 28, 50, 38), Y("seed.membership.title")),
			Q(Z(14, 88, 32, 250), Y("seed.membership.tier1"), {
				align: "center",
				box: !0
			}),
			Q(Z(54, 88, 32, 250), Y("seed.membership.tier2"), {
				align: "center",
				box: !0
			}),
			yo(Z(42, 358, 16, 42), Y("seed.join")),
			Q(Z(25, 414, 50, 30), Y("seed.membership.vipps"), { align: "center" })
		])
	});
}
//#endregion
//#region ../template/assets/engine/0.6.11/maler-model.js
var Bo = [
	"section",
	"blocks",
	"page"
];
function Vo(e) {
	return va(String(e ?? ""), "");
}
function Ho(e, t, { id: n, title: r }) {
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
//#region ../template/assets/engine/0.6.11/samlinger-csv.js
var Uo = [
	"id",
	"title",
	"date",
	"text",
	"href",
	"image",
	"price",
	"memberPrice",
	"badge",
	"sizes",
	"colors"
];
function Wo(e) {
	let t = String(e ?? "");
	return /[",\n\r]/.test(t) ? `"${t.replaceAll("\"", "\"\"")}"` : t;
}
function Go(e, t) {
	return t === "sizes" ? (e.sizes ?? []).join("|") : t === "colors" ? (e.colors ?? []).map((e) => e.name).join("|") : e[t] ?? "";
}
function Ko(e) {
	let t = [Uo.join(",")];
	for (let n of e ?? []) t.push(Uo.map((e) => Wo(Go(n, e))).join(","));
	return t.join("\n") + "\n";
}
function qo(e) {
	let t = [], n = [], r = "", i = !1, a = String(e ?? "");
	for (let e = 0; e < a.length; e += 1) {
		let o = a[e];
		i ? o === "\"" && a[e + 1] === "\"" ? (r += "\"", e += 1) : o === "\"" ? i = !1 : r += o : o === "\"" ? i = !0 : o === "," ? (n.push(r), r = "") : o === "\n" || o === "\r" ? (o === "\r" && a[e + 1] === "\n" && (e += 1), n.push(r), t.push(n), n = [], r = "") : r += o;
	}
	return (r !== "" || n.length) && (n.push(r), t.push(n)), t.filter((e) => e.some((e) => e.trim() !== ""));
}
var Jo = (e) => String(e ?? "").split("|").map((e) => e.trim()).filter(Boolean);
function Yo(e) {
	let t = qo(e);
	if (t.length < 2) return null;
	let n = t[0].map((e) => e.trim());
	if (!n.includes("title")) return null;
	let r = [], i = 0;
	for (let e of t.slice(1)) {
		let t = {};
		n.forEach((n, r) => {
			t[n] = e[r] ?? "";
		});
		let a = String(t.title ?? "").trim();
		if (!a) {
			i += 1;
			continue;
		}
		let o = {
			id: String(t.id ?? "").trim(),
			title: a
		};
		for (let e of [
			"date",
			"text",
			"href",
			"image",
			"badge"
		]) {
			let n = String(t[e] ?? "").trim();
			n && (o[e] = n);
		}
		for (let e of ["price", "memberPrice"]) {
			let n = String(t[e] ?? "").trim();
			if (n === "") continue;
			let r = Number(n.replace(",", "."));
			Number.isFinite(r) && r >= 0 && (o[e] = r);
		}
		let s = Jo(t.sizes);
		s.length && (o.sizes = s);
		let c = Jo(t.colors);
		c.length && (o.colors = c.map((e) => ({ name: e }))), r.push(o);
	}
	return {
		entries: r,
		skipped: i
	};
}
//#endregion
//#region ../template/assets/engine/0.6.11/feeds.js
function Xo(e) {
	return String(e ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&apos;");
}
function Zo(e, t) {
	let n = String(t ?? "").replace(/\/+$/, "");
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${(e ?? []).filter((e) => !e.noindex).map((e) => `  <url><loc>${Xo(n + (e.path === "/" ? "/" : e.path))}</loc></url>`).join("\n")}\n</urlset>\n`;
}
function Qo(e) {
	return `User-agent: *\nDisallow: /admin/\n\nSitemap: ${String(e ?? "").replace(/\/+$/, "")}/sitemap.xml\n`;
}
var $o = [
	"news",
	"notices",
	"publications"
];
function es(e) {
	let t = String(e.origin ?? "").replace(/\/+$/, ""), n = (e.items ?? []).map((n) => {
		let r = n.href ? new URL(n.href, t + "/").href : t + "/", i = n.date ? new Date(n.date) : null, a = i && !Number.isNaN(i.getTime()) ? `\n      <pubDate>${i.toUTCString()}</pubDate>` : "", o = n.text ? `\n      <description>${Xo(n.text)}</description>` : "";
		return `    <item>\n      <title>${Xo(n.title)}</title>\n      <link>${Xo(r)}</link>\n      <guid isPermaLink="false">${Xo(`${e.path}#${n.id ?? n.title}`)}</guid>${o}${a}\n    </item>`;
	}).join("\n");
	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${Xo(e.title)}</title>\n    <link>${Xo(t + "/")}</link>\n    <description>${Xo(e.description ?? e.title)}</description>\n${n}${n ? "\n" : ""}  </channel>\n</rss>\n`;
}
//#endregion
//#region ../template/assets/engine/0.6.11/preset-thumb.js
var ts = /^#[0-9a-fA-F]{3,8}$/, ns = /^[a-z][a-z0-9-]*$/, rs = "#171c26", is = "#232a38", as = "#98a1b3", os = "#7c5cff", ss = (e, t) => `var(--urd-color-${e}, ${t})`;
function cs(e, t) {
	return typeof e == "string" ? ts.test(e) ? e : ns.test(e) ? ss(e, t) : t : t;
}
function ls(e, t = 800) {
	let n = Number.parseFloat(e);
	return !Number.isFinite(n) || n <= 0 ? 400 : typeof e == "string" && e.trim().endsWith("vh") ? n / 100 * t : n;
}
var $ = (e) => Math.round(e * 10) / 10, us = (e, t, n) => Math.min(n, Math.max(t, e)), ds = (e, t, n, r, i, a = "") => `<rect x="${$(e)}" y="${$(t)}" width="${$(Math.max(n, 1))}" height="${$(Math.max(r, 1))}" fill="${i}"${a}/>`;
function fs(e) {
	if (e?.theme) return e.theme === "invers" || e.theme === "dyp" ? ss("text", as) : e.theme === "aksent" ? ss("accent", os) : ss("surface", is);
	for (let t of e?.background?.layers ?? []) {
		if (t.type === "color") return cs(t.props?.value, rs);
		if (t.type === "gradient") return cs(Array.isArray(t.props?.stops) ? t.props.stops[0] : null, rs);
	}
	return ss("bg", rs);
}
function ps(e, t, n, r, i) {
	let a = /<h[1-3]/.test(String(i?.html ?? "")), o = i?.align === "center", s = ss("text", as), c = [];
	i?.box && c.push(ds(e, t, n, r, ss("surface", is), " rx=\"1.5\""));
	let l = i?.box ? Math.min(2, n * .06) : 0, u = e + l, d = n - l * 2, f = [
		.72,
		.9,
		.5
	], p = [
		a ? 4 : 2.2,
		2.2,
		2.2
	], m = us(r / (p[0] + p[1] + p[2] + 4.8 + 2), 0, 1), h = t + l + Math.min(1, r * .08);
	for (let e = 0; e < 3; e++) {
		let n = Math.min(Math.max(e === 0 ? a ? 1.4 : 1 : .8, p[e] * m), Math.max(r, 1));
		if (e > 0 && h + n > t + r - l) break;
		let i = d * f[e], g = o ? u + (d - i) / 2 : u;
		c.push(ds(g, h, i, n, s, ` opacity="${e === 0 ? .8 : .4}" rx="${$(Math.min(1, n / 2))}"`)), h += n + Math.max(.8, 2.4 * m);
	}
	return c.join("");
}
function ms(e, t, n, r, i = !1) {
	let a = ss("text", as), o = [];
	i ? (o.push(ds(e, t, n, r, ss("surface", is), " rx=\"1.5\" opacity=\"0.35\"")), o.push(`<rect x="${$(e + .4)}" y="${$(t + .4)}" width="${$(Math.max(n - .8, 1))}" height="${$(Math.max(r - .8, 1))}" fill="none" stroke="${a}" stroke-width="0.6" stroke-dasharray="2 2" opacity="0.35" rx="1.5"/>`)) : o.push(ds(e, t, n, r, ss("surface", is), " rx=\"1.5\""));
	let s = i ? .15 : .4, c = (t) => $(e + n * t), l = (e) => $(t + r * e);
	return o.push(`<polygon points="${c(.08)},${l(.9)} ${c(.42)},${l(.38)} ${c(.62)},${l(.68)} ${c(.75)},${l(.5)} ${c(.92)},${l(.9)}" fill="${a}" opacity="${s}"/>`), o.push(`<circle cx="${c(.28)}" cy="${l(.26)}" r="${$(Math.max(1, Math.min(n, r) * .1))}" fill="${a}" opacity="${$(s + .1)}"/>`), o.join("");
}
function hs(e, t, n, r, i) {
	let a = !(Array.isArray(i?.images) && i.images.length), o = Math.max(1, n * .03), s = (n - o * 2) / 3, c = [];
	for (let n = 0; n < 3; n++) c.push(ms(e + n * (s + o), t, s, r, a));
	return c.join("");
}
function gs(e, t, n, r) {
	let i = Math.max(1, n * .03), a = (n - i * 2) / 3, o = [];
	for (let n = 0; n < 3; n++) {
		let s = e + n * (a + i);
		o.push(ds(s, t, a, r * .55, ss("surface", is), " rx=\"1.5\"")), o.push(ds(s, t + r * .62, a * .8, 2, ss("text", as), " opacity=\"0.5\" rx=\"1\""));
	}
	return o.join("");
}
function _s(e, t, n, r, i) {
	let a = cs(i?.color, os), o = i?.kind;
	return o === "circle" ? `<ellipse cx="${$(e + n / 2)}" cy="${$(t + r / 2)}" rx="${$(Math.max(n / 2, 1))}" ry="${$(Math.max(r / 2, 1))}" fill="${a}" opacity="0.8"/>` : o === "triangle" ? `<polygon points="${$(e)},${$(t + r)} ${$(e + n / 2)},${$(t)} ${$(e + n)},${$(t + r)}" fill="${a}" opacity="0.8"/>` : o === "line" || o === "arrow" ? ds(e, t + r / 2 - .75, n, 1.5, a, " opacity=\"0.85\" rx=\"0.75\"") : ds(e, t, n, r, a, " opacity=\"0.8\" rx=\"1\"");
}
function vs(e, t, n, r, i, a) {
	if (e === "text") return ps(t, n, r, i, a);
	if (e === "image") return ms(t, n, r, i, !a?.src);
	if (e === "galleri") return hs(t, n, r, i, a);
	if (e === "samling") return gs(t, n, r, i);
	if (e === "faq") {
		let e = us(Math.floor(i / 5), 2, 3), a = Math.max(.6, i * .04), o = (i - a * (e - 1)) / e, s = [];
		for (let i = 0; i < e; i += 1) {
			let e = n + i * (o + a);
			s.push(ds(t, e, r, o, ss("surface", is), " rx=\"1\"")), s.push(ds(t + r * .06, e + o / 2 - .7, r * .55, 1.4, ss("text", as), " opacity=\"0.5\" rx=\"0.7\"")), s.push(`<circle cx="${$(t + r * .92)}" cy="${$(e + o / 2)}" r="0.9" fill="${ss("text", as)}" opacity="0.4"/>`);
		}
		return s.join("");
	}
	if (e === "shape") return _s(t, n, r, i, a);
	if (e === "button") return ds(t, n, r, i, ss("accent", os), ` rx="${$(Math.min(i / 2, 4))}"`);
	if (e === "icon") {
		let e = Math.max(1.2, Math.min(r, i) / 2);
		return `<circle cx="${$(t + r / 2)}" cy="${$(n + i / 2)}" r="${$(e)}" fill="${ss("accent", os)}" opacity="0.85"/>`;
	}
	if (e === "video") {
		let e = [ds(t, n, r, i, ss("surface", is), " rx=\"1.5\"")], a = t + r / 2, o = n + i / 2, s = Math.max(1.5, Math.min(r, i) * .22);
		return e.push(`<polygon points="${$(a - s / 2)},${$(o - s)} ${$(a - s / 2)},${$(o + s)} ${$(a + s)},${$(o)}" fill="${ss("text", as)}" opacity="0.6"/>`), e.join("");
	}
	if (e === "tidslinje") {
		let e = [ds(t + 1, n, 1.4, i, ss("accent", os), " opacity=\"0.7\" rx=\"0.7\"")];
		for (let a = 0; a < 3; a += 1) {
			let o = n + i * (.18 + a * .32);
			e.push(`<circle cx="${$(t + 1.7)}" cy="${$(o)}" r="1.6" fill="${ss("accent", os)}"/>`), e.push(ds(t + 5, o - 1, r * .5, 2, ss("text", as), " opacity=\"0.5\" rx=\"1\""));
		}
		return e.join("");
	}
	if (e === "sitat") return [
		`<text x="${$(t + r / 2)}" y="${$(n + i * .34)}" text-anchor="middle" font-size="${$(Math.min(r, i) * .5)}" font-family="Georgia, serif" fill="${ss("accent", os)}">“</text>`,
		ds(t + r * .15, n + i * .48, r * .7, 2, ss("text", as), " opacity=\"0.6\" rx=\"1\""),
		ds(t + r * .25, n + i * .62, r * .5, 2, ss("text", as), " opacity=\"0.6\" rx=\"1\""),
		ds(t + r * .35, n + i * .82, r * .3, 1.6, ss("text", as), " opacity=\"0.35\" rx=\"0.8\"")
	].join("");
	if (e === "statistikk") return [ds(t + r * .28, n + i * .15, r * .44, i * .42, ss("accent", os), " opacity=\"0.85\" rx=\"1\""), ds(t + r * .32, n + i * .72, r * .36, 1.6, ss("text", as), " opacity=\"0.4\" rx=\"0.8\"")].join("");
	if (e === "tabell") {
		let e = Math.max(1.6, i * .22), a = [ds(t, n, r, e, ss("accent", os), " opacity=\"0.5\" rx=\"0.8\"")], o = us(Math.floor((i - e) / 3.2), 1, 3);
		for (let s = 0; s < o; s += 1) a.push(ds(t, n + e + 1 + s * ((i - e - 1) / o), r, 1, ss("text", as), " opacity=\"0.3\""));
		return a.push(ds(t + r * .33, n, .6, i, ss("text", as), " opacity=\"0.2\"")), a.push(ds(t + r * .66, n, .6, i, ss("text", as), " opacity=\"0.2\"")), a.join("");
	}
	if (e === "deling") {
		let e = Math.max(1.2, Math.min(i / 2, r / 9)), a = [];
		for (let r = 0; r < 4; r += 1) a.push(`<circle cx="${$(t + e + r * (e * 2 + 1.5))}" cy="${$(n + i / 2)}" r="${$(e)}" fill="${ss("accent", os)}" opacity="0.8"/>`);
		return a.join("");
	}
	if (e === "nedteller") {
		let e = Math.max(.8, r * .03), a = (r - e * 3) / 4, o = [];
		for (let r = 0; r < 4; r += 1) {
			let s = t + r * (a + e);
			o.push(ds(s, n, a, i, ss("surface", is), " rx=\"1\"")), o.push(ds(s + a * .25, n + i * .2, a * .5, i * .35, ss("accent", os), " opacity=\"0.85\" rx=\"0.8\""));
		}
		return o.join("");
	}
	if (e === "audio") {
		let e = [ds(t, n, r, i, ss("surface", is), " rx=\"1.5\"")], a = n + i / 2, o = Math.max(1.2, i * .28);
		return e.push(`<polygon points="${$(t + r * .06)},${$(a - o)} ${$(t + r * .06)},${$(a + o)} ${$(t + r * .06 + o * 1.4)},${$(a)}" fill="${ss("accent", os)}" opacity="0.85"/>`), e.push(ds(t + r * .2, a - .6, r * .7, 1.2, ss("text", as), " opacity=\"0.35\" rx=\"0.6\"")), e.join("");
	}
	if (e === "produkt") {
		let e = Math.max(.8, r * .03), a = (r - e * 2) / 3, o = [];
		for (let r = 0; r < 3; r += 1) {
			let s = t + r * (a + e);
			o.push(ds(s, n, a, i, ss("surface", is), " rx=\"1\"")), o.push(ds(s + a * .08, n + i * .06, a * .84, i * .42, ss("text", as), " opacity=\"0.15\" rx=\"0.8\"")), o.push(ds(s + a * .08, n + i * .56, a * .6, 1.4, ss("text", as), " opacity=\"0.5\" rx=\"0.7\"")), o.push(ds(s + a * .08, n + i * .72, a * .35, 1.4, ss("accent", os), " opacity=\"0.85\" rx=\"0.7\"")), o.push(ds(s + a * .08, n + i * .84, a * .84, i * .1, ss("accent", os), " opacity=\"0.6\" rx=\"1\""));
		}
		return o.join("");
	}
	if (e === "handlekurv") {
		let e = Math.max(1.5, Math.min(r, i) / 2.4), a = t + r / 2, o = n + i / 2;
		return [
			`<circle cx="${$(a)}" cy="${$(o)}" r="${$(e)}" fill="${ss("surface", is)}"/>`,
			ds(a - e * .5, o - e * .25, e, e * .55, ss("text", as), " opacity=\"0.5\" rx=\"0.4\""),
			`<circle cx="${$(a + e * .75)}" cy="${$(o - e * .75)}" r="${$(Math.max(.9, e * .35))}" fill="${ss("accent", os)}"/>`
		].join("");
	}
	return e === "kasse" ? [
		ds(t, n, r * .7, 1.2, ss("text", as), " opacity=\"0.5\" rx=\"0.6\""),
		ds(t, n + i * .12, r * .5, 1.2, ss("text", as), " opacity=\"0.35\" rx=\"0.6\""),
		ds(t, n + i * .3, r, i * .14, ss("surface", is), " rx=\"1\""),
		ds(t, n + i * .5, r, i * .14, ss("surface", is), " rx=\"1\""),
		ds(t, n + i * .78, r * .45, i * .16, ss("accent", os), " opacity=\"0.85\" rx=\"1.2\"")
	].join("") : ds(t, n, r, i, ss("surface", is), " rx=\"1.5\"");
}
function ys(e, t, n) {
	let r = Array.isArray(e?.blocks) ? e.blocks : [], i = r.map((e) => (e.frames?.desktop?.y ?? 0) + (e.frames?.desktop?.h ?? 0)), a = n / Math.max(ls(e?.size?.minHeight), i.length ? Math.max(...i) + 16 : 0), o = [ds(0, 0, t, n, fs(e))];
	for (let r of e?.background?.layers ?? []) {
		if (r.type !== "glow") continue;
		let e = r.props ?? {};
		o.push(`<circle cx="${$(us(e.x ?? .5, 0, 1) * t)}" cy="${$(us(e.y ?? .3, 0, 1) * n)}" r="${$(t * us(e.radius ?? .5, .1, 1) * .5)}" fill="${cs(e.color, os)}" opacity="${$(us(e.opacity ?? .3, 0, .5))}"/>`);
	}
	let s = t * .06, c = t - s * 2;
	for (let e of r) {
		let r = e.frames?.desktop;
		if (!r) continue;
		let i = us(s + (r.x ?? 0) * (c / 100), 0, t - 2), l = us((r.y ?? 0) * a, 0, n - 2), u = us((r.w ?? 10) * (c / 100), 2, t - i), d = us((r.h ?? 20) * a, 2, n - l);
		o.push(vs(e.type, i, l, u, d, e.props));
	}
	return o.join("");
}
function bs(e, { w: t = 96, h: n = 116, max: r = 6 } = {}) {
	let i = (Array.isArray(e?.sections) ? e.sections : []).slice(0, r);
	if (!i.length) return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${ds(0, 0, t, n, ss("bg", rs))}</svg>`;
	let a = i.map((e) => us(ls(e?.size?.minHeight), 160, 900)), o = a.reduce((e, t) => e + t, 0), s = n - 1 * (i.length - 1), c = [], l = 0;
	for (let e = 0; e < i.length; e += 1) {
		let n = Math.max(6, a[e] / o * s);
		c.push(`<g transform="translate(0 ${$(l)})">${ys(i[e], t, n)}</g>`), l += n + 1;
	}
	return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${c.join("")}</svg>`;
}
//#endregion
//#region ../template/assets/engine/0.6.11/page-presets.js
var xs = /* @__PURE__ */ new Map();
zo({ sections: { define: (e, t) => xs.set(e, t) } });
var Ss = [
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
	},
	{
		id: "butikk",
		labelKey: "pageTemplate.butikk",
		sections: [
			"butikk-hero",
			"butikk",
			"faq",
			"cta"
		]
	},
	{
		id: "butikkforside",
		labelKey: "pageTemplate.butikkforside",
		sections: [
			"butikk-hero",
			"butikk",
			"butikk-kategorier",
			"butikk-utstilling",
			"butikk-tillit",
			"cta"
		]
	},
	{
		id: "kasse",
		labelKey: "pageTemplate.kasse",
		sections: ["kasse", "kontakt"]
	}
];
function Cs(e, { pageId: t, title: n }) {
	let r = Ss.find((t) => t.id === e);
	return r ? {
		schemaVersion: 2,
		meta: {
			id: t,
			title: n
		},
		sections: r.sections.map((e) => xs.get(e).create())
	} : null;
}
//#endregion
//#region ../template/assets/engine/0.6.11/palette-search.js
function ws(e) {
	return String(e ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}
function Ts(e, t) {
	let n = ws(t).trim(), r = ws(e);
	return n ? r.startsWith(n) ? 0 : r.split(/[^a-z0-9]+/).some((e) => e.startsWith(n)) ? 1 : r.includes(n) ? 2 : -1 : 2;
}
function Es(e, t, n) {
	return e.map((e, r) => ({
		item: e,
		i: r,
		rank: Ts(n(e), t)
	})).filter((e) => e.rank >= 0).sort((e, t) => e.rank - t.rank || e.i - t.i).map((e) => e.item);
}
//#endregion
//#region ../template/assets/engine/0.6.11/theme.js
function Ds(e, t, n) {
	return t === "light" || t === "dark" ? t : n ? "dark" : "light";
}
function Os(e, t) {
	let n = e.tokens || {}, r = e.scheme === "dark" ? "dark" : "light";
	if (!e.alt?.tokens || t === r) return n;
	let i = {};
	for (let t of /* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(e.alt.tokens)])) i[t] = {
		...n[t],
		...e.alt.tokens[t]
	};
	return i;
}
var ks = /^[a-zA-Z0-9#%.,()'"\s+\-*/]+$/;
function As(e) {
	return typeof e == "string" && ks.test(e) && !/url\(|\/\*|\*\/|expression/i.test(e);
}
function js(e) {
	let t = e.tokens || {}, n = Os(e, "light"), r = Os(e, "dark"), i = e.scheme === "dark" ? "dark" : "light", a = [], o = [], s = [], c = /* @__PURE__ */ new Set([
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
			As(c) && (a.push(`  --urd-${e}-${l}: ${c};`), i && a.push(`  --urd-base-${l}: ${c};`)), u !== d && (i && As(u) && As(d) ? o.push({
				name: l,
				lv: u,
				dv: d
			}) : !i && As(u) && As(d) && s.push({
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
function Ms(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
var Ns = {
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
}, Ps = {
	flate: "sectionTheme.flate",
	aksent: "sectionTheme.aksent",
	invers: "sectionTheme.invers",
	dus: "sectionTheme.dus",
	dempet: "sectionTheme.dempet",
	dyp: "sectionTheme.dyp",
	uthevet: "sectionTheme.uthevet"
};
[...new Set(Object.values(Ns).flatMap(Object.keys))];
function Fs(e) {
	return Ns[e] ?? {};
}
function Is(e) {
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
function Ls(e, t) {
	let n = Is(e), r = Is(t);
	return n == null || r == null ? null : (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
//#endregion
//#region ../template/assets/engine/0.6.11/backgrounds/color.js
var Rs = {
	version: 1,
	label: "Farge",
	labelKey: "bgLayer.color",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = Ms(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, zs = {
	linear: [
		"pan",
		"pan-loop",
		"rotate"
	],
	radial: ["pulse", "orbit"]
};
function Bs(e) {
	let t = Array.isArray(e) && e.length ? e : [{ color: "#0b0e14" }, { color: "#1a1030" }], n = t.map((e) => Math.max(0, Number(e?.share) || 0)), r = n.reduce((e, t) => e + t, 0), i = r <= 0, a = i ? t.length : r, o = 0;
	return t.map((e, t) => {
		let r = i ? 1 : n[t], s = (o + r / 2) / a * 100;
		return o += r, {
			color: e?.color ?? "#0b0e14",
			at: Math.round(s * 100) / 100
		};
	});
}
function Vs(e) {
	let t = (e) => Math.round(e * 100) / 100, n = e[0]?.at ?? 0;
	return [...e.map((e) => ({
		color: e.color,
		at: t(e.at - n)
	})), {
		color: e[0]?.color ?? "#0b0e14",
		at: 100
	}];
}
function Hs(e, t, n, r = .5) {
	let i = n % 360 * Math.PI / 180, a = (e) => Math.round(e * 100) / 100 || 0, o = (Math.abs(e * Math.sin(i)) + Math.abs(t * Math.cos(i))) / (1 - Math.min(Math.max(r, 0), .9));
	return {
		period: a(o),
		dx: a(Math.sin(i) * o),
		dy: a(-Math.cos(i) * o)
	};
}
function Us(e, t, n) {
	return `repeating-linear-gradient(${t}deg, ${e.map((e) => `${Ms(e.color)} ${Math.round(e.at / 100 * n * 100) / 100}px`).join(", ")})`;
}
function Ws(e) {
	let t = e.kind === "radial" ? "radial" : "linear", n = (zs[t] ?? []).includes(e.animation) ? e.animation : null, r = Bs(e.stops), i = r.map((e) => `${Ms(e.color)} ${e.at}%`).join(", "), a = {}, o;
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
					stops: Vs(r),
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
var Gs = /* @__PURE__ */ new Set(), Ks = !1;
function qs(e) {
	Gs.add(e), !(Ks || typeof window > "u") && (Ks = !0, window.addEventListener("resize", () => {
		for (let e of [...Gs]) e() || Gs.delete(e);
	}));
}
var Js = !1;
function Ys() {
	if (!Js) {
		Js = !0;
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
var Xs = {
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
		let n = Ws(t);
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
					let e = Hs(r, i, n.loop.angle, n.loop.maxShare);
					t.style.inset = `${-Math.ceil(e.period)}px`, t.style.background = Us(n.loop.stops, n.loop.angle, e.period), t.style.setProperty("--urd-loop-dx", `${e.dx}px`), t.style.setProperty("--urd-loop-dy", `${e.dy}px`);
				}
				return !0;
			};
			requestAnimationFrame(r), qs(r);
			return;
		}
		if (n.runner) {
			e.classList.add("urd-bg-loop-host");
			let t = document.createElement("div");
			t.className = n.runner.className, t.style.background = n.runner.background, n.runner.left != null && (t.style.left = n.runner.left), n.runner.top != null && (t.style.top = n.runner.top), e.appendChild(t);
			return;
		}
		e.style.background = n.background, n.className && (e.classList.add(n.className), n.className === "urd-bg-rotate" && Ys());
	}
}, Zs = {
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
		let n = Ms(t.color), r = t.x ?? .5, i = t.y ?? .3, a = t.radius ?? .5;
		e.style.background = `radial-gradient(circle at ${r * 100}% ${i * 100}%, ${n} 0%, transparent ${a * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, Qs = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", $s = {
	version: 1,
	label: "Korn",
	labelKey: "bgLayer.grain",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = Qs, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
}, ec = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
function tc(e) {
	return typeof e == "string" && ec.test(e);
}
//#endregion
//#region ../template/assets/engine/0.6.11/backgrounds/image.js
var nc = .4;
function rc(e, t) {
	return `${(e ?? .5) * 100}% ${(t ?? .5) * 100}%`;
}
function ic(e, t) {
	return e === "contain" ? "contain" : e === "cover" ? "cover" : `${Math.max(0, t ?? 1) * 100}%`;
}
function ac(e) {
	let t = "-9999px";
	return e === "up" ? `inset(${t} 0 0 0)` : e === "down" ? `inset(0 0 ${t} 0)` : e === "both" ? `inset(${t} 0 ${t} 0)` : "inset(0)";
}
function oc(e, t, n, r = .18) {
	let i = Math.max(0, Math.min(1, n)) * nc * t;
	return Math.round(Math.min(i, r * e));
}
function sc(e, t, n, r, i) {
	let a = e + t / 2, o = (n / 2 - a) * Math.max(0, Math.min(1, r)) * nc, s = i ?? oc(t, n, r);
	return Math.max(-s, Math.min(s, o)) || 0;
}
var cc = /* @__PURE__ */ new Set(), lc = !1, uc = 0;
function dc() {
	uc = 0;
	for (let e of [...cc]) e() || cc.delete(e);
}
function fc() {
	uc ||= requestAnimationFrame(dc);
}
function pc(e) {
	cc.add(e), e(), !(lc || typeof window > "u") && (lc = !0, window.addEventListener("scroll", fc, { passive: !0 }), window.addEventListener("resize", fc, { passive: !0 }));
}
function mc(e, t, n, r) {
	let i = r === "cover" || r === "flislegg" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement, o = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
	e.style.willChange = "transform";
	let s = (t) => {
		e.style.top = `-${t}px`, e.style.bottom = `-${t}px`;
	}, c = () => {
		if (!e.isConnected) return !1;
		if (o || document.body.classList.contains("urd-mobile")) return s(n), e.style.transform = "", !0;
		let r = (a ?? e).getBoundingClientRect(), c = window.innerHeight || document.documentElement.clientHeight, l = oc(r.height, c, t, i ? .18 : .6);
		s(i ? Math.max(n, l) : n);
		let u = sc(r.top, r.height, c, t, l);
		return e.style.transform = `translateY(${u.toFixed(1)}px)`, !0;
	};
	pc(c), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(c));
}
function hc() {
	return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("animation-timeline", "view()");
}
var gc = /* @__PURE__ */ new Set(), _c = !1, vc = 0;
function yc() {
	vc = 0;
	for (let e of [...gc]) e() || gc.delete(e);
}
function bc() {
	!vc && typeof requestAnimationFrame == "function" && (vc = requestAnimationFrame(yc));
}
function xc(e) {
	gc.add(e), e(), !(_c || typeof window > "u") && (_c = !0, window.addEventListener("resize", bc, { passive: !0 }));
}
function Sc(e, t, n, r) {
	let i = r === "cover" || r === "flislegg" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement;
	e.style.willChange = "transform", e.classList.add("urd-parallax-css");
	let o = () => {
		if (!e.isConnected) return !1;
		let r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || document.body.classList.contains("urd-mobile"), o = (a ?? e).getBoundingClientRect(), s = window.innerHeight || document.documentElement.clientHeight, c = oc(o.height, s, t, i ? .18 : .6), l = i && !r ? Math.max(n, c) : n;
		return e.style.setProperty("--urd-px-shift", `${c}px`), e.style.top = `-${l}px`, e.style.bottom = `-${l}px`, !0;
	};
	xc(o), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(o));
}
var Cc = {
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
		if (!tc(t.src)) return;
		e.style.opacity = String(t.opacity ?? 1), e.style.clipPath = ac(t.bleed), e.style.zIndex = t.bleed === "down" || t.bleed === "both" ? "1" : "";
		let n = document.createElement("div");
		n.className = "urd-bg-image", n.style.position = "absolute", n.style.left = "0", n.style.right = "0", n.style.top = "0", n.style.bottom = "0";
		let r = t.fit === "flislegg" || t.fit === "repeat";
		n.style.backgroundImage = `url("${t.src}")`, n.style.backgroundSize = ic(t.fit, t.size), n.style.backgroundRepeat = r ? "repeat" : "no-repeat", n.style.backgroundPosition = rc(t.x, t.y);
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
			hc() ? Sc(n, t.parallax, i, e) : mc(n, t.parallax, i, e);
		}
	}
};
//#endregion
//#region ../template/assets/engine/0.6.11/galleri-model.js
function wc(e, t, n) {
	return !Number.isFinite(n) || n < 1 ? 0 : (((Number.isFinite(e) ? e : 0) + t) % n + n) % n;
}
function Tc({ count: e = 0, reducedMotion: t = !1 } = {}) {
	return e >= 2 && !t;
}
function Ec(e, { min: t = 2, fallback: n = 5 } = {}) {
	let r = Number(e);
	return !Number.isFinite(r) || r <= 0 ? n : Math.max(t, r);
}
//#endregion
//#region ../template/assets/engine/0.6.11/backgrounds/bildegalleri.js
var Dc = {
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
		let n = (t.images ?? []).filter((e) => tc(e?.src));
		if (!n.length) return;
		e.classList.add("urd-bg-galleri"), e.style.opacity = String(t.opacity ?? 1), t.blur > 0 && (e.style.filter = `blur(${t.blur}px)`, e.style.inset = `-${t.blur * 2}px`);
		let r = Math.max(0, Number(t.fade) || 0);
		e.style.setProperty("--urd-bgg-fade", `${r}s`);
		let i = (e, n) => {
			e.style.backgroundImage = `url("${n.src}")`, e.style.backgroundSize = ic(t.fit), e.style.backgroundRepeat = "no-repeat", e.style.backgroundPosition = rc(n.x, n.y);
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
		if (!Tc({
			count: n.length,
			reducedMotion: s
		})) return;
		let c = document.createElement("div");
		c.className = "urd-bg-slide", e.appendChild(c);
		let l = 0, u = o, d = Math.max(Ec(t.interval, { fallback: 6 }), r + .5) * 1e3, f = setInterval(() => {
			if (!e.isConnected) {
				clearInterval(f);
				return;
			}
			if (document.hidden) return;
			let t = wc(l, 1, n.length), r = new Image();
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
function Oc(e = {}) {
	let t = "#2fd6b6", n = "#5c6b64", r = e.mega ? "#16221d" : "#0e1512", i = e.cols ?? 0, a = e.social ?? 0, o = `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${r}"/>`;
	if (e.mega && (o += `<circle cx="20" cy="6" r="34" fill="${t}" opacity="0.18"/>`), e.bigcta) return o += `<rect x="45" y="18" width="70" height="8" rx="3" fill="${n}" opacity="0.85"/>`, o += `<rect x="56" y="32" width="48" height="4" rx="2" fill="${n}" opacity="0.5"/>`, o += `<rect x="62" y="43" width="36" height="10" rx="3" fill="${t}"/>`, o += kc(n, e.baselineLinks), o + "</svg>";
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
	return o += kc(n, e.baselineLinks), o + "</svg>";
}
function kc(e, t = 0) {
	let n = `<line x1="8" y1="66" x2="152" y2="66" stroke="${e}" stroke-width="0.6" opacity="0.5"/>`;
	return n += `<rect x="8" y="70" width="40" height="3" rx="1.5" fill="${e}" opacity="0.6"/>`, t && (n += `<g fill="${e}" opacity="0.6">` + Array.from({ length: t }, (e, t) => `<rect x="${120 - t * 16}" y="70" width="12" height="3" rx="1.5"/>`).join("") + "</g>"), n;
}
//#endregion
//#region ../template/assets/engine/0.6.11/animations/core.js
var Ac = () => ({
	duration: 600,
	delay: 0
}), jc = 90, Mc = {
	"fade-in": {
		version: 1,
		label: "Ton inn",
		labelKey: "anim.fadeIn",
		entrance: !0,
		defaults: Ac,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Gli opp",
		labelKey: "anim.slideUp",
		entrance: !0,
		defaults: Ac,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom inn",
		labelKey: "anim.zoomIn",
		entrance: !0,
		defaults: Ac,
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
			step: jc,
			effect: "slide-up",
			pattern: "sequence"
		}),
		migrations: {}
	}
}, Nc = [
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
function Pc(e) {
	let t = (e) => Math.round(e * 100) / 100, n = Math.max(0, t(100 - e.w)), r = Math.min(n, Math.max(0, t(e.x - e.w / 2))), i = Math.max(0, e.y - e.h / 2), a = e.snap === !1 || e.grid?.snap === !1, o = e.grid?.size || 8;
	return i = a ? Math.round(i) : Math.round(i / o) * o, {
		x: r,
		y: Math.max(0, i)
	};
}
//#endregion
//#region src/App.svelte
var Fc = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Ic = /* @__PURE__ */ V("<button class=\"ghost row-tool svelte-1n46o8q\"></button>"), Lc = /* @__PURE__ */ V("<span><span class=\"grad-grip svelte-1n46o8q\"><svg viewBox=\"0 0 16 16\" width=\"14\" height=\"14\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"13\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"13\" r=\"1.4\"></circle></svg></span> <!> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span> <!></span>"), Rc = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), zc = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/>", 1), Bc = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Vc = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Hc = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.01\" max=\"0.3\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Uc = /* @__PURE__ */ V("<div class=\"sizefill svelte-1n46o8q\"><button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button> <button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button></div> <label class=\"svelte-1n46o8q\"> </label> <div class=\"focalpad svelte-1n46o8q\"><span class=\"focaldot svelte-1n46o8q\"></span></div> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Wc = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Gc = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> </label> <div class=\"sizestep svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"10\" max=\"400\" class=\"svelte-1n46o8q\"/> <span class=\"sizeunit svelte-1n46o8q\">%</span> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></div> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Kc = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), qc = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"120\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\"> </p>", 1), Jc = /* @__PURE__ */ V("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!></div>"), Yc = /* @__PURE__ */ V("<!> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), Xc = /* @__PURE__ */ V("<input class=\"nav-target svelte-1n46o8q\"/>"), Zc = /* @__PURE__ */ V("<div class=\"nav-row nav-sub-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div>"), Qc = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label>"), $c = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"num-stepper svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"1\" max=\"12\" step=\"1\" class=\"svelte-1n46o8q\"/> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></span></label>", 1), el = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), tl = /* @__PURE__ */ V("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), nl = /* @__PURE__ */ V("<span class=\"nav-line svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span>"), rl = /* @__PURE__ */ V("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), il = /* @__PURE__ */ V("<span class=\"nav-line svelte-1n46o8q\"><input class=\"tl-year svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <input class=\"svelte-1n46o8q\"/>", 1), al = /* @__PURE__ */ V("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), ol = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), sl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), cl = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></span> <span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), ll = /* @__PURE__ */ V("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>"), ul = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"datetime-local\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), dl = /* @__PURE__ */ V("<button class=\"ghost svelte-1n46o8q\"> </button>"), fl = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"audio/*\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), pl = /* @__PURE__ */ V("<input class=\"svelte-1n46o8q\"/>"), ml = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), hl = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), gl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> </label> <input class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), _l = /* @__PURE__ */ V("<input class=\"token-input svelte-1n46o8q\" maxlength=\"4\"/>"), vl = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\"> </button></span>"), yl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"toolbar-row svelte-1n46o8q\"><!> <!></span></label> <!>", 1), bl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), xl = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost action svelte-1n46o8q\"> </button></span>"), Sl = /* @__PURE__ */ V("<button class=\"ghost action svelte-1n46o8q\"> </button>"), Cl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), wl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Tl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"email\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"url\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), El = /* @__PURE__ */ V("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label></div>"), Dl = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Ol = /* @__PURE__ */ V("<p> </p>"), kl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), Al = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" class=\"svelte-1n46o8q\"/></label>"), jl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label>"), Ml = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Nl = /* @__PURE__ */ V("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Pl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Fl = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Il = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Ll = /* @__PURE__ */ V("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Rl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), zl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"24\" max=\"64\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Bl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Vl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Hl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Ul = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Wl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Gl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"60\" class=\"svelte-1n46o8q\"/></label>"), Kl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), ql = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Jl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label>", 1), Yl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"400\" class=\"svelte-1n46o8q\"/></label>"), Xl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!>", 1), Zl = /* @__PURE__ */ V("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Ql = /* @__PURE__ */ V("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), $l = /* @__PURE__ */ V("<!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details>", 1), eu = /* @__PURE__ */ V("<div class=\"props-tabs svelte-1n46o8q\"><span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div> <!>", 1), tu = /* @__PURE__ */ V("<button class=\"chrome-restore svelte-1n46o8q\"><!> </button>"), nu = /* @__PURE__ */ V("<button><!> </button>"), ru = /* @__PURE__ */ V("<div class=\"tool-pop svelte-1n46o8q\"></div>"), iu = /* @__PURE__ */ V("<span class=\"toolmenu svelte-1n46o8q\"><button><!><!></button> <!></span>"), au = /* @__PURE__ */ V("<button></button>"), ou = /* @__PURE__ */ V("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"viewswitch toolgrp svelte-1n46o8q\"></span>", 1), su = /* @__PURE__ */ V("<div class=\"tool-pop svelte-1n46o8q\"><div class=\"tool-pop-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button></div> <button><!> </button></div>"), cu = /* @__PURE__ */ V("<span class=\"toolmenu svelte-1n46o8q\"><button><span class=\"zoom-cap svelte-1n46o8q\"> </span><!></button> <!></span>"), lu = /* @__PURE__ */ V("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"zoomswitch toolgrp svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button> <button></button></span>", 1), uu = /* @__PURE__ */ V("<div class=\"tool-pop svelte-1n46o8q\"><button><!> </button> <button><!> </button></div>"), du = /* @__PURE__ */ V("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"toolgrp svelte-1n46o8q\"><button></button> <button></button></span>", 1), fu = /* @__PURE__ */ V("<button class=\"ghost page-btn svelte-1n46o8q\"> </button> <span class=\"toolset svelte-1n46o8q\"><!> <!> <!></span>", 1), pu = /* @__PURE__ */ V("<button class=\"badge attention svelte-1n46o8q\"><!> <span class=\"btn-label svelte-1n46o8q\"> </span> <span class=\"badge-mini svelte-1n46o8q\"> </span></button>"), mu = /* @__PURE__ */ V("<button class=\"discard-confirm svelte-1n46o8q\"><!> </button>"), hu = /* @__PURE__ */ V("<span class=\"draft-cluster svelte-1n46o8q\"><span class=\"chip draft-chip svelte-1n46o8q\"><span class=\"chip-full svelte-1n46o8q\" aria-hidden=\"true\"> </span> <span class=\"chip-mini svelte-1n46o8q\" aria-hidden=\"true\">!</span></span>  <span class=\"discard-wrap svelte-1n46o8q\"><button><!><span class=\"discard-label svelte-1n46o8q\"> </span></button> <!></span></span>"), gu = /* @__PURE__ */ V("<!> <span class=\"btn-label svelte-1n46o8q\"> </span>", 1), _u = /* @__PURE__ */ V("<span class=\"who svelte-1n46o8q\"><!> </span>"), vu = /* @__PURE__ */ V("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\"> </a>"), yu = /* @__PURE__ */ V("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\"><!> <span class=\"btn-label svelte-1n46o8q\"> </span></a> <button class=\"primary svelte-1n46o8q\"> </button>", 1), bu = /* @__PURE__ */ V("<button> </button>"), xu = /* @__PURE__ */ V("<span class=\"rail-group svelte-1n46o8q\"> </span> <!>", 1), Su = /* @__PURE__ */ V("<div class=\"settings-pop svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label></div>"), Cu = /* @__PURE__ */ V("<span class=\"page-path svelte-1n46o8q\">/</span>"), wu = /* @__PURE__ */ V("<input class=\"page-slug svelte-1n46o8q\"/>"), Tu = /* @__PURE__ */ V("<span class=\"seo-warn svelte-1n46o8q\"></span>"), Eu = /* @__PURE__ */ V("<button class=\"ghost danger svelte-1n46o8q\"><!> </button>"), Du = /* @__PURE__ */ V("<div class=\"page-menu svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"><!> </button> <!></div>"), Ou = /* @__PURE__ */ V("<div><input class=\"page-title svelte-1n46o8q\"/> <!> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <span class=\"page-menu-wrap svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <!></span></span></div>"), ku = /* @__PURE__ */ V("<img class=\"site-icon-preview svelte-1n46o8q\"/>"), Au = /* @__PURE__ */ V("<div><button class=\"page-mal-pick svelte-1n46o8q\"><span class=\"page-mal-thumb svelte-1n46o8q\"></span> <span class=\"page-mal-name svelte-1n46o8q\"> </span></button></div>"), ju = /* @__PURE__ */ V("<div><button class=\"page-mal-pick svelte-1n46o8q\"><span class=\"page-mal-thumb svelte-1n46o8q\"></span> <span class=\"page-mal-name svelte-1n46o8q\"> </span></button> <button class=\"page-mal-del svelte-1n46o8q\"></button></div>"), Mu = /* @__PURE__ */ V("<span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-mal-grid svelte-1n46o8q\"></div>", 1), Nu = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <textarea rows=\"2\" class=\"svelte-1n46o8q\"></textarea></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <textarea rows=\"2\" class=\"svelte-1n46o8q\"></textarea></label> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-mal-grid svelte-1n46o8q\"><div><button class=\"page-mal-pick svelte-1n46o8q\"><span class=\"page-mal-thumb svelte-1n46o8q\"></span> <span class=\"page-mal-name svelte-1n46o8q\"> </span></button></div> <!></div> <!></div>"), Pu = /* @__PURE__ */ V("<input class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\"/> <button><b> </b></button> <button><i> </i></button></span>", 1), Fu = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\"/></span>"), Iu = /* @__PURE__ */ V("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Lu = /* @__PURE__ */ V("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Ru = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), zu = /* @__PURE__ */ V("<div class=\"nav-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div> <!>", 1), Bu = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"4\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details></div>"), Vu = /* @__PURE__ */ V("<div class=\"cw-row svelte-1n46o8q\"><span class=\"mini-label cw-screen svelte-1n46o8q\"> </span> <span><span class=\"cw-fill svelte-1n46o8q\"></span></span> <span class=\"gridmenu-value cw-margin svelte-1n46o8q\"> </span></div>"), Hu = /* @__PURE__ */ V("<div class=\"mini-label cw-binds svelte-1n46o8q\"> </div>"), Uu = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), Wu = /* @__PURE__ */ V("<button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), Gu = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"sample cw-sample svelte-1n46o8q\"><!> <div class=\"cw-legend svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!></div> <div class=\"seg cw-seg svelte-1n46o8q\"></div> <!> <p class=\"mini-label svelte-1n46o8q\"> </p> <div class=\"seg cw-seg svelte-1n46o8q\"></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div>"), Ku = /* @__PURE__ */ V("<div class=\"mini-label tpv-cap svelte-1n46o8q\"> </div>"), qu = /* @__PURE__ */ V("<div class=\"theme-pvw svelte-1n46o8q\"><!> <div class=\"tpv-demo svelte-1n46o8q\"><div class=\"tpv-h svelte-1n46o8q\"> </div> <div class=\"tpv-card svelte-1n46o8q\"> </div> <div class=\"tpv-row svelte-1n46o8q\"><span class=\"tpv-btn svelte-1n46o8q\"> </span><span class=\"tpv-lnk svelte-1n46o8q\"> </span></div></div></div>"), Ju = /* @__PURE__ */ V("<button type=\"button\"><span class=\"tp-band svelte-1n46o8q\"><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i></span> <small class=\"svelte-1n46o8q\"> </small></button>"), Yu = /* @__PURE__ */ V("<div class=\"ctl-row autorow svelte-1n46o8q\"><span class=\"autolbl svelte-1n46o8q\"> </span> <span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div>"), Xu = /* @__PURE__ */ V("<span class=\"mini-label svelte-1n46o8q\"> </span>"), Zu = /* @__PURE__ */ V("<div class=\"palcol svelte-1n46o8q\"><!> <span class=\"palcap svelte-1n46o8q\"> </span> <b class=\"palhex svelte-1n46o8q\"> </b></div>"), Qu = /* @__PURE__ */ V("<div class=\"ctl-row palhead svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <button type=\"button\"> </button></div> <div></div>", 1), $u = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"theme-presets svelte-1n46o8q\"></div> <p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <div class=\"ctl-row palhead svelte-1n46o8q\"><!> <button type=\"button\"> </button></div> <div class=\"palcells svelte-1n46o8q\"></div> <!> <div class=\"theme-previews svelte-1n46o8q\"><!> <!></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <div class=\"sample typo-sample svelte-1n46o8q\"><div class=\"ts-h svelte-1n46o8q\"> </div> <div class=\"ts-b svelte-1n46o8q\"> </div></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"sample form-prev svelte-1n46o8q\"><span class=\"fp-btn svelte-1n46o8q\"> </span> <span class=\"fp-card svelte-1n46o8q\"> </span></div> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"24\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"40\" step=\"1\" class=\"svelte-1n46o8q\"/></div></details></div>"), ed = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label>"), td = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label>"), nd = /* @__PURE__ */ V("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), rd = /* @__PURE__ */ V("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <!> <!>", 1), id = /* @__PURE__ */ V("<div><input type=\"text\" class=\"svelte-1n46o8q\"/> <!></div>"), ad = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), od = /* @__PURE__ */ V("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), sd = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), cd = /* @__PURE__ */ V("<button><span class=\"rs-sample svelte-1n46o8q\"><i class=\"rs-line svelte-1n46o8q\"></i> <i class=\"rs-chip svelte-1n46o8q\"></i> <i class=\"rs-dot svelte-1n46o8q\"></i></span> <span class=\"rs-name svelte-1n46o8q\"> </span></button>"), ld = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"1000\" step=\"10\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), ud = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <!>", 1), dd = /* @__PURE__ */ V("<p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"token-input svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"rs-grid svelte-1n46o8q\"></div> <label class=\"svelte-1n46o8q\"> <span class=\"row-tools svelte-1n46o8q\"><span class=\"gridmenu-value svelte-1n46o8q\"> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label>", 1), fd = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), pd = /* @__PURE__ */ V("<button class=\"footer-tp svelte-1n46o8q\"><span class=\"footer-tp-thumb svelte-1n46o8q\"></span> <span class=\"footer-tp-name svelte-1n46o8q\"> </span></button>"), md = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"16\" max=\"160\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), hd = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!>", 1), gd = /* @__PURE__ */ V("<div class=\"nav-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></div> <!>", 1), _d = /* @__PURE__ */ V("<div class=\"nav-row svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><span class=\"footer-soc-preview svelte-1n46o8q\" aria-hidden=\"true\"></span> <!></span> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <input class=\"nav-target svelte-1n46o8q\"/></div>"), vd = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), yd = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), bd = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"footer-tpick svelte-1n46o8q\"></div></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"svelte-1n46o8q\"> <!></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details></div>"), xd = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"date\" class=\"svelte-1n46o8q\"/></label>"), Sd = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>"), Cd = /* @__PURE__ */ V("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), wd = /* @__PURE__ */ V("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/>"), Td = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span>"), Ed = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" step=\"0.01\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" step=\"0.01\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), Dd = /* @__PURE__ */ V("<details class=\"group samling-entry svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <textarea rows=\"3\" class=\"svelte-1n46o8q\"></textarea> <!> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!></div></details>"), Od = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\".csv,text/csv\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), kd = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button></div>"), Ad = /* @__PURE__ */ V("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), jd = /* @__PURE__ */ V("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), Md = /* @__PURE__ */ V("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <!></div>"), Nd = /* @__PURE__ */ V("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span></div>"), Pd = /* @__PURE__ */ V("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), Fd = /* @__PURE__ */ V("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <!>", 1), Id = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <!> <!></div>"), Ld = /* @__PURE__ */ V("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), Rd = /* @__PURE__ */ V("<button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), zd = /* @__PURE__ */ V("<!> <!>", 1), Bd = /* @__PURE__ */ V("<p class=\"panel-hint svelte-1n46o8q\"> </p> <button class=\"ghost svelte-1n46o8q\"> </button>", 1), Vd = /* @__PURE__ */ V("<span class=\"update-arrow svelte-1n46o8q\"></span> <span class=\"badge svelte-1n46o8q\"> </span>", 1), Hd = /* @__PURE__ */ V("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><p class=\"update-notes svelte-1n46o8q\"> </p></div></details>"), Ud = /* @__PURE__ */ V("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"><span class=\"update-warn svelte-1n46o8q\"></span> </summary> <div class=\"group-items svelte-1n46o8q\"><pre class=\"update-headers svelte-1n46o8q\"> </pre></div></details>"), Wd = /* @__PURE__ */ V("<span class=\"chip svelte-1n46o8q\"> </span>"), Gd = /* @__PURE__ */ V("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <span class=\"update-warn svelte-1n46o8q\"></span></span></div>"), Kd = /* @__PURE__ */ V("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <!></div>"), qd = /* @__PURE__ */ V("<span class=\"update-warn svelte-1n46o8q\"></span>"), Jd = /* @__PURE__ */ V("<div class=\"update-row svelte-1n46o8q\"><span> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <!> <input type=\"checkbox\" class=\"svelte-1n46o8q\"/></span></div>"), Yd = /* @__PURE__ */ V("<div class=\"ctl-row update-opt-head svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!>", 1), Xd = /* @__PURE__ */ V("<p class=\"update-summary svelte-1n46o8q\"> </p> <!> <!> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details> <!> <button class=\"primary update-run svelte-1n46o8q\"> </button>", 1), Zd = /* @__PURE__ */ V("<div class=\"update-versions svelte-1n46o8q\"><span class=\"update-from svelte-1n46o8q\"> </span> <!></div> <!>", 1), Qd = /* @__PURE__ */ V("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), $d = /* @__PURE__ */ V("<nav class=\"rail svelte-1n46o8q\"><!> <span class=\"rail-settings svelte-1n46o8q\"><span class=\"rail-brand svelte-1n46o8q\" title=\"Urd\"><svg class=\"brand-mark svelte-1n46o8q\" viewBox=\"10.3 8.3 19.4 25.4\" aria-hidden=\"true\"><path d=\"M12 32V10l16 6.5V32\" fill=\"none\" stroke=\"var(--urd-brand)\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg> <span class=\"brand-word svelte-1n46o8q\">Urd</span></span> <button></button> <!></span></nav> <!>", 1), ef = /* @__PURE__ */ V("<div class=\"workspace svelte-1n46o8q\"><!> <div><div class=\"stage svelte-1n46o8q\"><iframe class=\"svelte-1n46o8q\"></iframe></div></div></div>"), tf = /* @__PURE__ */ V("<p class=\"loading svelte-1n46o8q\"> </p>"), nf = /* @__PURE__ */ V("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), rf = /* @__PURE__ */ V("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), af = /* @__PURE__ */ V("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <p class=\"panel-hint svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <p class=\"panel-hint svelte-1n46o8q\"> </p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), of = /* @__PURE__ */ V("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\">×</button></div>"), sf = /* @__PURE__ */ V("<div class=\"block-menu svelte-1n46o8q\"><header class=\"block-menu-head svelte-1n46o8q\"><span> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></header> <div class=\"panel-body block-menu-body svelte-1n46o8q\"><!></div></div>"), cf = /* @__PURE__ */ V("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><!> <!></span> <span class=\"topbar-group topbar-draft svelte-1n46o8q\"><!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!> <!></div>   <!>", 1);
function lf(e, t) {
	qe(t, !0);
	let n = (e, t = f, n = f) => {
		var r = Yc(), i = I(r);
		Kr(i, 17, n, Hr, (e, r, i) => {
			var a = Jc(), s = F(a), l = F(s);
			{
				let e = /* @__PURE__ */ j(() => Y("tip.bg.changeType")), n = /* @__PURE__ */ j(() => o.map(([e, t]) => [e, t.labelKey ? Y(t.labelKey) : t.label]));
				X(l, {
					get value() {
						return z(r).type;
					},
					get title() {
						return z(e);
					},
					get options() {
						return z(n);
					},
					onchange: (e) => Gn(t(), i, e)
				});
			}
			var u = L(l, 2), d = F(u);
			d.disabled = i === 0, G(d, () => c.up, !0), k(d);
			var f = L(d, 2);
			G(f, () => c.down, !0), k(f);
			var p = L(f, 2);
			G(p, () => c.cross, !0), k(p), k(u), k(s);
			var m = L(s, 2), h = (e) => {
				var n = Fc(), a = I(n), o = F(a), s = L(o);
				{
					let e = /* @__PURE__ */ j(sr), n = /* @__PURE__ */ j(() => Y("tip.bg.layerColor"));
					sa(s, {
						get value() {
							return z(r).props.value;
						},
						get tokens() {
							return z(e);
						},
						get label() {
							return z(n);
						},
						onchange: (e) => On(t(), i, "value", e)
					});
				}
				k(a);
				var c = L(a, 2), l = F(c), u = L(l), d = F(u);
				k(u), k(c);
				var f = L(c, 2);
				K(f), R((e, t, n) => {
					U(o, `${e ?? ""} `), U(l, `${t ?? ""} `), U(d, `${n ?? ""}%`), q(f, z(r).props.opacity ?? 1);
				}, [
					() => Y("lbl.color"),
					() => Y("lbl.strength"),
					() => Math.round((z(r).props.opacity ?? 1) * 100)
				]), B("input", f, (e) => On(t(), i, "opacity", Number(e.target.value))), H(e, n);
			}, g = (e) => {
				let n = /* @__PURE__ */ j(() => Pn(z(r))), a = /* @__PURE__ */ j(() => z(n).stops.reduce((e, t) => e + Math.max(0, Number(t.share) || 0), 0));
				var o = Bc(), s = I(o), l = F(s), u = L(l);
				{
					let e = /* @__PURE__ */ j(() => z(n).kind ?? "linear"), r = /* @__PURE__ */ j(() => [["linear", Y("opt.grad.linear")], ["radial", Y("opt.grad.radial")]]);
					X(u, {
						get value() {
							return z(e);
						},
						get options() {
							return z(r);
						},
						onchange: (e) => Rn(t(), i, e)
					});
				}
				k(s);
				var d = L(s, 2);
				Kr(d, 17, () => z(n).stops, Hr, (e, r, o) => {
					var s = Lc();
					let l;
					var u = F(s), d = L(u, 2);
					{
						let e = /* @__PURE__ */ j(sr), n = /* @__PURE__ */ j(() => Y("tip.bg.stopColor"));
						sa(d, {
							get value() {
								return z(r).color;
							},
							get tokens() {
								return z(e);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => zn(t(), i, o, { color: e })
						});
					}
					var f = L(d, 2);
					K(f);
					var p = L(f, 2), m = F(p);
					k(p);
					var h = L(p, 2), g = (e) => {
						var n = Ic();
						G(n, () => c.cross, !0), k(n), R((e) => J(n, "title", e), [() => Y("tip.bg.removeStop")]), B("click", n, () => Vn(t(), i, o)), H(e, n);
					};
					W(h, (e) => {
						z(n).stops.length > 2 && e(g);
					}), k(s), R((e, t, a) => {
						l = pi(s, 1, "nav-line grad-stop svelte-1n46o8q", null, l, {
							dragging: z(Un)?.layer === i && z(Un).from === o,
							"drop-above": z(Un)?.layer === i && z(Un).insert === o,
							"drop-below": z(Un)?.layer === i && z(Un).insert === z(n).stops.length && o === z(n).stops.length - 1
						}), J(u, "title", e), q(f, z(r).share ?? 50), J(f, "title", t), U(m, `${a ?? ""}%`);
					}, [
						() => Y("tip.bg.dragStop"),
						() => Y("tip.bg.stopShare"),
						() => z(a) > 0 ? Math.round(Math.max(0, Number(z(r).share) || 0) / z(a) * 100) : Math.round(100 / z(n).stops.length)
					]), B("pointerdown", u, (e) => Wn(t(), e, i, o)), B("input", f, (e) => zn(t(), i, o, { share: Number(e.target.value) })), H(e, s);
				});
				var f = L(d, 2), p = F(f, !0);
				k(f);
				var m = L(f, 2), h = (e) => {
					var r = Rc(), a = I(r), o = F(a), s = L(o), c = F(s);
					k(s), k(a);
					var l = L(a, 2);
					K(l);
					var u = L(l, 2), d = F(u), f = L(d), p = F(f);
					k(f), k(u);
					var m = L(u, 2);
					K(m), R((e, t, r, i) => {
						U(o, `${e ?? ""} `), U(c, `${t ?? ""}%`), q(l, z(n).x ?? .5), U(d, `${r ?? ""} `), U(p, `${i ?? ""}%`), q(m, z(n).y ?? .5);
					}, [
						() => Y("lbl.centerX"),
						() => Math.round((z(n).x ?? .5) * 100),
						() => Y("lbl.centerY"),
						() => Math.round((z(n).y ?? .5) * 100)
					]), B("input", l, (e) => In(t(), i, "x", Number(e.target.value))), B("input", m, (e) => In(t(), i, "y", Number(e.target.value))), H(e, r);
				}, g = (e) => {
					var r = zc(), a = I(r), o = F(a), s = L(o), c = F(s);
					k(s), k(a);
					var l = L(a, 2);
					K(l), R((e) => {
						U(o, `${e ?? ""} `), U(c, `${z(n).angle ?? ""}°`), q(l, z(n).angle);
					}, [() => Y("lbl.angle")]), B("input", l, (e) => In(t(), i, "angle", Number(e.target.value))), H(e, r);
				};
				W(m, (e) => {
					(z(n).kind ?? "linear") === "radial" ? e(h) : e(g, -1);
				});
				var _ = L(m, 2), v = F(_), y = L(v), b = F(y);
				k(y), k(_);
				var x = L(_, 2);
				K(x);
				var S = L(x, 2), C = F(S), w = L(C);
				{
					let e = /* @__PURE__ */ j(() => z(n).animation ?? "none");
					X(w, {
						get value() {
							return z(e);
						},
						get options() {
							return Ln[(z(n).kind ?? "linear") === "radial" ? "radial" : "linear"];
						},
						onchange: (e) => In(t(), i, "animation", e)
					});
				}
				k(S), R((e, t, r, i, a, o, s) => {
					U(l, `${e ?? ""} `), J(f, "title", t), U(p, r), U(v, `${i ?? ""} `), U(b, `${a ?? ""}%`), q(x, z(n).opacity ?? 1), J(S, "title", o), U(C, `${s ?? ""} `);
				}, [
					() => Y("blocks.shape"),
					() => Y("tip.bg.addStop"),
					() => Y("ui.addStop"),
					() => Y("lbl.strength"),
					() => Math.round((z(n).opacity ?? 1) * 100),
					() => Y("tip.bg.motion"),
					() => Y("lbl.motion")
				]), B("click", f, () => Bn(t(), i)), B("input", x, (e) => In(t(), i, "opacity", Number(e.target.value))), H(e, o);
			}, _ = (e) => {
				var n = Vc(), a = I(n), o = F(a), s = L(o);
				{
					let e = /* @__PURE__ */ j(sr), n = /* @__PURE__ */ j(() => Y("tip.bg.glowColor"));
					sa(s, {
						get value() {
							return z(r).props.color;
						},
						get tokens() {
							return z(e);
						},
						get label() {
							return z(n);
						},
						onchange: (e) => On(t(), i, "color", e)
					});
				}
				k(a);
				var c = L(a, 2), l = F(c), u = L(l), d = F(u);
				k(u), k(c);
				var f = L(c, 2);
				K(f);
				var p = L(f, 2), m = F(p), h = L(m), g = F(h);
				k(h), k(p);
				var _ = L(p, 2);
				K(_);
				var v = L(_, 2), y = F(v), b = L(y), x = F(b);
				k(b), k(v);
				var S = L(v, 2);
				K(S);
				var C = L(S, 2), w = F(C), ee = L(w), te = F(ee);
				k(ee), k(C);
				var ne = L(C, 2);
				K(ne), R((e, t, n, i, a, s, c, u, p) => {
					U(o, `${e ?? ""} `), U(l, `${t ?? ""} `), U(d, `${n ?? ""}%`), q(f, z(r).props.x), U(m, `${i ?? ""} `), U(g, `${a ?? ""}%`), q(_, z(r).props.y), U(y, `${s ?? ""} `), U(x, `${c ?? ""}%`), q(S, z(r).props.radius), U(w, `${u ?? ""} `), U(te, `${p ?? ""}%`), q(ne, z(r).props.opacity);
				}, [
					() => Y("lbl.color"),
					() => Y("lbl.posX"),
					() => Math.round(z(r).props.x * 100),
					() => Y("lbl.posY"),
					() => Math.round(z(r).props.y * 100),
					() => Y("lbl.size"),
					() => Math.round(z(r).props.radius * 100),
					() => Y("lbl.strength"),
					() => Math.round(z(r).props.opacity * 100)
				]), B("input", f, (e) => On(t(), i, "x", Number(e.target.value))), B("input", _, (e) => On(t(), i, "y", Number(e.target.value))), B("input", S, (e) => On(t(), i, "radius", Number(e.target.value))), B("input", ne, (e) => On(t(), i, "opacity", Number(e.target.value))), H(e, n);
			}, v = (e) => {
				var n = Hc(), a = I(n), o = F(a), s = L(o), c = F(s);
				k(s), k(a);
				var l = L(a, 2);
				K(l), R((e, t) => {
					U(o, `${e ?? ""} `), U(c, `${t ?? ""}%`), q(l, z(r).props.opacity);
				}, [() => Y("lbl.strength"), () => Math.round(z(r).props.opacity * 100)]), B("input", l, (e) => On(t(), i, "opacity", Number(e.target.value))), H(e, n);
			}, y = (e) => {
				let n = /* @__PURE__ */ j(() => z(r).props.fit === "flislegg" || z(r).props.fit === "repeat");
				var a = Gc(), o = I(a), s = F(o), c = L(s);
				k(o);
				var l = L(o, 2), u = F(l), d = L(u);
				{
					let e = /* @__PURE__ */ j(() => z(n) ? "flislegg" : "vanlig"), r = /* @__PURE__ */ j(() => [["vanlig", Y("opt.img.plain")], ["flislegg", Y("opt.img.tile")]]);
					X(d, {
						get value() {
							return z(e);
						},
						get options() {
							return z(r);
						},
						onchange: (e) => On(t(), i, "fit", e)
					});
				}
				k(l);
				var f = L(l, 2), p = F(f, !0);
				k(f);
				var m = L(f, 2), h = F(m), g = L(h, 2);
				K(g);
				var _ = L(g, 4);
				k(m);
				var v = L(m, 2), y = (e) => {
					var n = Uc(), a = I(n), o = F(a), s = F(o, !0);
					k(o);
					var c = L(o, 2), l = F(c, !0);
					k(c), k(a);
					var u = L(a, 2), d = F(u, !0);
					k(u);
					var f = L(u, 2), p = L(f, 2), m = F(p), h = L(m), g = F(h);
					k(h), k(p);
					var _ = L(p, 2);
					K(_);
					var v = L(_, 2), y = F(v), b = L(y), x = F(b);
					k(b), k(v);
					var S = L(v, 2);
					K(S), R((e, t, n, i, a, p, h, v, b, C, w, ee) => {
						J(o, "title", e), U(s, t), J(c, "title", n), U(l, i), J(u, "title", a), U(d, p), hi(f, `--fx:${h ?? ""}%; --fy:${v ?? ""}%`), U(m, `${b ?? ""} `), U(g, `${C ?? ""}%`), q(_, z(r).props.x ?? .5), U(y, `${w ?? ""} `), U(x, `${ee ?? ""}%`), q(S, z(r).props.y ?? .5);
					}, [
						() => Y("tip.bg.cover"),
						() => Y("ui.cover"),
						() => Y("opt.fitFrame.contain"),
						() => Y("opt.fit.contain"),
						() => Y("tip.bg.position"),
						() => Y("lbl.position"),
						() => Math.max(0, Math.min(1, z(r).props.x ?? .5)) * 100,
						() => Math.max(0, Math.min(1, z(r).props.y ?? .5)) * 100,
						() => Y("lbl.horizontal"),
						() => Math.round((z(r).props.x ?? .5) * 100),
						() => Y("lbl.vertical"),
						() => Math.round((z(r).props.y ?? .5) * 100)
					]), B("click", o, () => Nn(t(), i, z(r), "cover")), B("click", c, () => Nn(t(), i, z(r), "contain")), B("pointerdown", f, (e) => kn(e, t(), i, "xy")), B("input", _, (e) => On(t(), i, "x", Number(e.target.value))), B("input", S, (e) => On(t(), i, "y", Number(e.target.value))), H(e, n);
				};
				W(v, (e) => {
					z(n) || e(y);
				});
				var b = L(v, 2), x = F(b), S = L(x), C = F(S);
				k(S), k(b);
				var w = L(b, 2);
				K(w);
				var ee = L(w, 2), te = F(ee), ne = L(te), re = F(ne);
				k(ne), k(ee);
				var ie = L(ee, 2);
				K(ie);
				var ae = L(ie, 2), oe = F(ae);
				K(oe);
				var se = L(oe);
				k(ae);
				var ce = L(ae, 2), le = (e) => {
					var n = Wc(), a = I(n), o = F(a), s = L(o), c = F(s);
					k(s), k(a);
					var l = L(a, 2);
					K(l);
					var u = L(l, 2), d = F(u), f = L(d);
					{
						let e = /* @__PURE__ */ j(() => z(r).props.bleed ?? "none"), n = /* @__PURE__ */ j(() => [
							["none", Y("common.none")],
							["up", Y("opt.bleed.up")],
							["down", Y("opt.bleed.down")],
							["both", Y("opt.brand.both")]
						]);
						X(f, {
							get value() {
								return z(e);
							},
							get options() {
								return z(n);
							},
							onchange: (e) => On(t(), i, "bleed", e)
						});
					}
					k(u), R((e, t, n, i) => {
						U(o, `${e ?? ""} `), U(c, `${t ?? ""}%`), q(l, z(r).props.parallax ?? .3), J(u, "title", n), U(d, `${i ?? ""} `);
					}, [
						() => Y("lbl.parallaxStrength"),
						() => Math.round((z(r).props.parallax ?? 0) * 100),
						() => Y("tip.bg.bleed"),
						() => Y("lbl.bleed")
					]), B("input", l, (e) => On(t(), i, "parallax", Number(e.target.value))), H(e, n);
				};
				W(ce, (e) => {
					(z(r).props.parallax ?? 0) > 0 && e(le);
				}), R((e, t, n, i, a, c, d, m, v, y, b, S, ee, ne) => {
					J(o, "title", e), U(s, `${t ?? ""} `), J(l, "title", n), U(u, `${i ?? ""} `), J(f, "title", a), U(p, c), J(h, "title", d), q(g, m), J(_, "title", v), U(x, `${y ?? ""} `), U(C, `${z(r).props.blur ?? 0 ?? ""} px`), q(w, z(r).props.blur ?? 0), U(te, `${b ?? ""} `), U(re, `${S ?? ""}%`), q(ie, z(r).props.opacity ?? 1), J(ae, "title", ee), bi(oe, (z(r).props.parallax ?? 0) > 0), U(se, ` ${ne ?? ""}`);
				}, [
					() => Y("tip.webpAuto"),
					() => z(r).props.src ? Y("ui.changeImage") : Y("ui.chooseImage"),
					() => Y("tip.bg.fit"),
					() => Y("lbl.fit"),
					() => Y("tip.bg.size"),
					() => Y("lbl.size"),
					() => Y("tip.smaller"),
					() => Math.round((z(r).props.size ?? 1) * 100),
					() => Y("tip.larger"),
					() => Y("lbl.blur"),
					() => Y("lbl.strength"),
					() => Math.round((z(r).props.opacity ?? 1) * 100),
					() => Y("tip.bg.parallax"),
					() => Y("lbl.parallax")
				]), B("change", c, (e) => Yn(t(), i, e)), B("click", h, () => jn(t(), i, z(r).props.size ?? 1, -.05)), B("change", g, (e) => Mn(t(), i, e.target.value)), B("click", _, () => jn(t(), i, z(r).props.size ?? 1, .05)), B("input", w, (e) => On(t(), i, "blur", Number(e.target.value))), B("input", ie, (e) => On(t(), i, "opacity", Number(e.target.value))), B("change", oe, (e) => On(t(), i, "parallax", e.target.checked ? .3 : 0)), H(e, a);
			}, b = (e) => {
				var n = qc(), a = I(n), o = F(a), s = L(o);
				k(a);
				var l = L(a, 2);
				Kr(l, 17, () => z(r).props.images ?? [], Hr, (e, n, a) => {
					var o = Kc(), s = I(o), l = F(s), u = L(l, 2), d = F(u);
					d.disabled = a === 0, G(d, () => c.up, !0), k(d);
					var f = L(d, 2);
					G(f, () => c.down, !0), k(f);
					var p = L(f, 2);
					G(p, () => c.cross, !0), k(p), k(u), k(s);
					var m = L(s, 2), h = F(m), g = L(h), _ = F(g);
					k(g), k(m);
					var v = L(m, 2);
					K(v);
					var y = L(v, 2), b = F(y), x = L(b), S = F(x);
					k(x), k(y);
					var C = L(y, 2);
					K(C), R((e, t, i, o, s) => {
						J(l, "src", z(n).src), f.disabled = a === z(r).props.images.length - 1, J(p, "title", e), U(h, `${t ?? ""} `), U(_, `${i ?? ""}%`), q(v, z(n).x ?? .5), U(b, `${o ?? ""} `), U(S, `${s ?? ""}%`), q(C, z(n).y ?? .5);
					}, [
						() => Y("tip.removeImage"),
						() => Y("lbl.focusX"),
						() => Math.round((z(n).x ?? .5) * 100),
						() => Y("lbl.focusY"),
						() => Math.round((z(n).y ?? .5) * 100)
					]), B("click", d, () => Zn(t(), i, a, -1)), B("click", f, () => Zn(t(), i, a, 1)), B("click", p, () => Qn(t(), i, a)), B("input", v, (e) => $n(t(), i, a, "x", Number(e.target.value))), B("input", C, (e) => $n(t(), i, a, "y", Number(e.target.value))), H(e, o);
				});
				var u = L(l, 2), d = F(u), f = L(d);
				{
					let e = /* @__PURE__ */ j(() => z(r).props.fit ?? "cover"), n = /* @__PURE__ */ j(() => [["cover", Y("opt.fit.cover")], ["contain", Y("opt.fit.contain")]]);
					X(f, {
						get value() {
							return z(e);
						},
						get options() {
							return z(n);
						},
						onchange: (e) => On(t(), i, "fit", e)
					});
				}
				k(u);
				var p = L(u, 2), m = F(p), h = L(m);
				K(h), k(p);
				var g = L(p, 2), _ = F(g), v = L(_), y = F(v);
				k(v), k(g);
				var b = L(g, 2);
				K(b);
				var x = L(b, 2), S = F(x), C = L(S), w = F(C);
				k(C), k(x);
				var ee = L(x, 2);
				K(ee);
				var te = L(ee, 2), ne = F(te), re = L(ne), ie = F(re);
				k(re), k(te);
				var ae = L(te, 2);
				K(ae);
				var oe = L(ae, 2), se = F(oe, !0);
				k(oe), R((e, t, n, i, s, c, l, u, f, g, v) => {
					J(a, "title", e), U(o, `${t ?? ""} `), U(d, `${n ?? ""} `), J(p, "title", i), U(m, `${s ?? ""} `), q(h, z(r).props.interval ?? 6), U(_, `${c ?? ""} `), U(y, `${l ?? ""} s`), q(b, z(r).props.fade ?? 1.5), U(S, `${u ?? ""} `), U(w, `${z(r).props.blur ?? 0 ?? ""} px`), q(ee, z(r).props.blur ?? 0), U(ne, `${f ?? ""} `), U(ie, `${g ?? ""}%`), q(ae, z(r).props.opacity ?? 1), U(se, v);
				}, [
					() => Y("tip.bg.addImages"),
					() => Y("ui.addImages"),
					() => Y("lbl.fit"),
					() => Y("hint.bg.gallery"),
					() => Y("lbl.secondsPerImage"),
					() => Y("lbl.transition"),
					() => (z(r).props.fade ?? 1.5).toFixed(1),
					() => Y("lbl.blur"),
					() => Y("lbl.strength"),
					() => Math.round((z(r).props.opacity ?? 1) * 100),
					() => Y("hint.bg.gallery")
				]), B("change", s, (e) => Xn(t(), i, e)), B("change", h, (e) => On(t(), i, "interval", Number(e.target.value))), B("input", b, (e) => On(t(), i, "fade", Number(e.target.value))), B("input", ee, (e) => On(t(), i, "blur", Number(e.target.value))), B("input", ae, (e) => On(t(), i, "opacity", Number(e.target.value))), H(e, n);
			};
			W(m, (e) => {
				z(r).type === "color" ? e(h) : z(r).type === "gradient" ? e(g, 1) : z(r).type === "glow" ? e(_, 2) : z(r).type === "grain" ? e(v, 3) : z(r).type === "image" ? e(y, 4) : z(r).type === "bildegalleri" && e(b, 5);
			}), k(a), R((e, t, r) => {
				J(d, "title", e), J(f, "title", t), f.disabled = i === n().length - 1, J(p, "title", r);
			}, [
				() => Y("hint.bg.order"),
				() => Y("hint.bg.order"),
				() => Y("tip.bg.removeLayer")
			]), B("click", d, () => Dn(t(), i, -1)), B("click", f, () => Dn(t(), i, 1)), B("click", p, () => En(t(), i)), H(e, a);
		});
		var a = L(i, 2), s = F(a), l = L(s);
		{
			let e = /* @__PURE__ */ j(() => o.map(([e, t]) => [e, t.labelKey ? Y(t.labelKey) : t.label]));
			X(l, {
				get value() {
					return z(wn);
				},
				get options() {
					return z(e);
				},
				onchange: (e) => P(wn, e, !0)
			});
		}
		k(a);
		var u = L(a, 2), d = F(u, !0);
		k(u), R((e, t) => {
			U(s, `${e ?? ""} `), U(d, t);
		}, [() => Y("lbl.newLayer"), () => Y("ui.addLayer")]), B("click", u, () => Tn(t(), z(wn))), H(e, r);
	}, r = (e, t = f, n = f) => {
		var r = Fr();
		Kr(I(r), 17, n, Hr, (e, r, i) => {
			var a = Zc(), o = F(a);
			K(o);
			var s = L(o, 2), l = F(s);
			l.disabled = i === 0, G(l, () => c.up, !0), k(l);
			var u = L(l, 2);
			G(u, () => c.down, !0), k(u);
			var d = L(u, 2);
			G(d, () => c.cross, !0), k(d), k(s);
			var f = L(s, 2), p = F(f);
			{
				let e = /* @__PURE__ */ j(() => z(r).page ?? "__href"), n = /* @__PURE__ */ j(() => Y("tip.linkTarget")), a = /* @__PURE__ */ j(() => [...z(D).pages.map((e) => [e.id, e.title]), ["__href", Y("opt.linkHref")]]);
				X(p, {
					get value() {
						return z(e);
					},
					get title() {
						return z(n);
					},
					get options() {
						return z(a);
					},
					onchange: (e) => ac(t(), i, e)
				});
			}
			k(f);
			var m = L(f, 2), h = (e) => {
				var n = Xc();
				K(n), R((e, t) => {
					q(n, z(r).href ?? ""), J(n, "placeholder", e), J(n, "title", t);
				}, [() => Y("ph.hrefAnchor"), () => Y("tip.hrefAnchor")]), B("change", n, (e) => oc(t(), i, e.target.value)), H(e, n);
			};
			W(m, (e) => {
				z(r).page || e(h);
			}), k(a), R((e, t) => {
				q(o, z(r).label), J(o, "title", e), u.disabled = i === n().length - 1, J(d, "title", t);
			}, [() => Y("tip.linkLabel"), () => Y("tip.removeLink")]), B("input", o, (e) => ic(t(), i, e.target.value)), B("click", l, () => rc(t(), i, -1)), B("click", u, () => rc(t(), i, 1)), B("click", d, () => nc(t(), i)), H(e, a);
		}), H(e, r);
	}, i = (e) => {
		let t = /* @__PURE__ */ j(() => z(A).props.boxStyle ?? {});
		var n = el(), r = I(n), i = F(r), a = L(i);
		{
			let e = /* @__PURE__ */ j(() => z(t).bg ?? ""), n = /* @__PURE__ */ j(sr), r = /* @__PURE__ */ j(() => Y("tip.box.bg"));
			sa(a, {
				get value() {
					return z(e);
				},
				get tokens() {
					return z(n);
				},
				allowClear: !0,
				get label() {
					return z(r);
				},
				onchange: (e) => Bt({ bg: e || null })
			});
		}
		k(r);
		var o = L(r, 2), s = F(o), c = L(s);
		{
			let e = /* @__PURE__ */ j(() => z(t).shadow ?? ""), n = /* @__PURE__ */ j(() => [
				["", Y("common.none")],
				["soft", Y("opt.shadow.soft")],
				["strong", Y("opt.shadow.strong")]
			]);
			X(c, {
				get value() {
					return z(e);
				},
				get options() {
					return z(n);
				},
				onchange: (e) => Bt({ shadow: e || null })
			});
		}
		k(o);
		var l = L(o, 2), u = (e) => {
			var n = Qc(), r = F(n), i = L(r);
			{
				let e = /* @__PURE__ */ j(() => z(t).shadowColor ?? ""), n = /* @__PURE__ */ j(sr), r = /* @__PURE__ */ j(() => Y("tip.box.shadowColor"));
				sa(i, {
					get value() {
						return z(e);
					},
					get tokens() {
						return z(n);
					},
					allowClear: !0,
					get label() {
						return z(r);
					},
					onchange: (e) => Bt({ shadowColor: e || null })
				});
			}
			k(n), R((e) => U(r, `${e ?? ""} `), [() => Y("lbl.shadowColor")]), H(e, n);
		};
		W(l, (e) => {
			z(t).shadow && e(u);
		});
		var d = L(l, 2), f = F(d), p = L(f);
		{
			let e = /* @__PURE__ */ j(() => z(t).border === "none" ? "none" : z(t).border ? "custom" : ""), n = /* @__PURE__ */ j(() => [
				["", Y("opt.border.theme")],
				["none", Y("common.none")],
				["custom", Y("opt.border.custom")]
			]);
			X(p, {
				get value() {
					return z(e);
				},
				get options() {
					return z(n);
				},
				onchange: (e) => Bt({ border: e === "custom" ? {
					color: "accent",
					width: 1
				} : e || null })
			});
		}
		k(d);
		var m = L(d, 2), h = (e) => {
			let n = /* @__PURE__ */ j(() => typeof z(t).border == "object" ? z(t).border : {
				color: "text",
				width: 1
			});
			var r = $c(), i = I(r), a = F(i), o = L(a);
			{
				let e = /* @__PURE__ */ j(sr), t = /* @__PURE__ */ j(() => Y("tip.box.borderColor"));
				sa(o, {
					get value() {
						return z(n).color;
					},
					get tokens() {
						return z(e);
					},
					get label() {
						return z(t);
					},
					onchange: (e) => Bt({ border: {
						...z(n),
						color: e
					} })
				});
			}
			k(i);
			var s = L(i, 2), c = F(s), l = L(c), u = F(l), d = L(u, 2);
			K(d);
			var f = L(d, 2);
			k(l), k(s), R((e, t, r, i, o, s) => {
				U(a, `${e ?? ""} `), U(c, `${t ?? ""} `), J(u, "title", r), J(u, "aria-label", i), q(d, z(n).width), J(f, "title", o), J(f, "aria-label", s);
			}, [
				() => Y("lbl.borderColor"),
				() => Y("lbl.thicknessPx"),
				() => Y("tip.thinner"),
				() => Y("tip.thinner"),
				() => Y("tip.thicker"),
				() => Y("tip.thicker")
			]), B("click", u, () => Bt({ border: {
				...z(n),
				width: Math.max(1, z(n).width - 1)
			} })), B("change", d, (e) => Bt({ border: {
				...z(n),
				width: Math.min(12, Math.max(1, Number(e.target.value) || 1))
			} })), B("click", f, () => Bt({ border: {
				...z(n),
				width: Math.min(12, z(n).width + 1)
			} })), H(e, r);
		};
		W(m, (e) => {
			z(t).border !== "none" && e(h);
		});
		var g = L(m, 2), _ = F(g);
		K(_);
		var v = L(_);
		k(g), R((e, t, n, r, a, o) => {
			U(i, `${e ?? ""} `), U(s, `${t ?? ""} `), U(f, `${n ?? ""} `), J(g, "title", r), bi(_, a), U(v, ` ${o ?? ""}`);
		}, [
			() => Y("lbl.blockColor"),
			() => Y("lbl.shadow"),
			() => Y("lbl.border"),
			() => Y("tip.box.glass"),
			() => !!z(t).glass,
			() => Y("lbl.glass")
		]), B("change", _, (e) => Bt({ glass: e.target.checked || null })), H(e, n);
	}, a = (e) => {
		var t = eu(), n = I(t), r = F(n), a = F(r);
		let o;
		var s = F(a, !0);
		k(a);
		var l = L(a, 2);
		let u;
		var d = F(l, !0);
		k(l), k(r), k(n);
		var f = L(n, 2), p = (e) => {
			var t = Fr(), n = I(t), r = (e) => {
				var t = tl(), n = F(t, !0);
				k(t), R((e) => U(n, e), [() => Y("hint.textInline")]), H(e, t);
			}, i = (e) => {
				var t = rl(), n = I(t), r = F(n);
				K(r);
				var i = L(r);
				k(n);
				var a = L(n, 2), o = F(a, !0);
				k(a);
				var s = L(a, 2);
				Kr(s, 17, () => z(A).props.items ?? [], Hr, (e, t, n) => {
					var r = nl(), i = F(r);
					K(i);
					var a = L(i, 2), o = F(a);
					o.disabled = n === 0, G(o, () => c.up, !0), k(o);
					var s = L(o, 2);
					G(s, () => c.down, !0), k(s);
					var l = L(s, 2);
					G(l, () => c.cross, !0), k(l), k(a), k(r), R((e, r) => {
						q(i, z(t).q), J(i, "title", e), s.disabled = n === (z(A).props.items?.length ?? 0) - 1, J(l, "title", r);
					}, [() => Y("tip.faq.question"), () => Y("tip.faq.remove")]), B("change", i, (e) => Vt(n, { q: e.target.value })), B("click", o, () => Wt(n, -1)), B("click", s, () => Wt(n, 1)), B("click", l, () => Ut(n)), H(e, r);
				});
				var l = L(s, 2), u = F(l, !0);
				k(l), R((e, t, a, s, c) => {
					J(n, "title", e), bi(r, t), U(i, ` ${a ?? ""}`), U(o, s), U(u, c);
				}, [
					() => Y("tip.faq.multi"),
					() => !!z(A).props.multi,
					() => Y("lbl.faqMulti"),
					() => Y("lbl.questions"),
					() => Y("ui.addQuestion")
				]), B("change", r, (e) => M("multi", e.target.checked)), B("click", l, Ht), H(e, t);
			}, a = (e) => {
				var t = al(), n = I(t), r = F(n, !0);
				k(n);
				var i = L(n, 2);
				Kr(i, 17, () => z(A).props.items ?? [], Hr, (e, t, n) => {
					var r = il(), i = I(r), a = F(i);
					K(a);
					var o = L(a, 2);
					K(o);
					var s = L(o, 2), l = F(s);
					l.disabled = n === 0, G(l, () => c.up, !0), k(l);
					var u = L(l, 2);
					G(u, () => c.down, !0), k(u);
					var d = L(u, 2);
					G(d, () => c.cross, !0), k(d), k(s), k(i);
					var f = L(i, 2);
					K(f), R((e, r, i, s, c, l) => {
						q(a, z(t).year), J(a, "placeholder", e), J(a, "title", r), q(o, z(t).title), J(o, "title", i), u.disabled = n === (z(A).props.items?.length ?? 0) - 1, J(d, "title", s), q(f, z(t).text), J(f, "placeholder", c), J(f, "title", l);
					}, [
						() => Y("ph.tlYear"),
						() => Y("tip.tl.year"),
						() => Y("tip.tl.title"),
						() => Y("tip.tl.remove"),
						() => Y("ph.tlText"),
						() => Y("tip.tl.text")
					]), B("change", a, (e) => Gt(n, { year: e.target.value })), B("change", o, (e) => Gt(n, { title: e.target.value })), B("click", l, () => Jt(n, -1)), B("click", u, () => Jt(n, 1)), B("click", d, () => qt(n)), B("change", f, (e) => Gt(n, { text: e.target.value })), H(e, r);
				});
				var a = L(i, 2), o = F(a, !0);
				k(a), R((e, t) => {
					U(r, e), U(o, t);
				}, [() => Y("lbl.tlItems"), () => Y("ui.addTlItem")]), B("click", a, Kt), H(e, t);
			}, o = (e) => {
				var t = ol(), n = I(t), r = F(n), i = L(r);
				K(i), k(n);
				var a = L(n, 2), o = F(a), s = L(o);
				K(s), k(a);
				var c = L(a, 2), l = F(c), u = L(l);
				K(u), k(c), R((e, t, n) => {
					U(r, `${e ?? ""} `), q(i, z(A).props.text ?? ""), U(o, `${t ?? ""} `), q(s, z(A).props.attribution ?? ""), U(l, `${n ?? ""} `), q(u, z(A).props.role ?? "");
				}, [
					() => Y("lbl.sitatText"),
					() => Y("lbl.sitatName"),
					() => Y("lbl.sitatRole")
				]), B("change", i, (e) => M("text", e.target.value)), B("change", s, (e) => M("attribution", e.target.value)), B("change", u, (e) => M("role", e.target.value)), H(e, t);
			}, s = (e) => {
				var t = sl(), n = I(t), r = F(n), i = L(r);
				K(i), k(n);
				var a = L(n, 2), o = F(a), s = L(o);
				K(s), k(a);
				var c = L(a, 2), l = F(c), u = L(l);
				K(u), k(c);
				var d = L(c, 2), f = F(d), p = L(f);
				K(p), k(d), R((e, t, n, a, c) => {
					U(r, `${e ?? ""} `), q(i, z(A).props.value ?? ""), J(i, "title", t), U(o, `${n ?? ""} `), q(s, z(A).props.prefix ?? ""), U(l, `${a ?? ""} `), q(u, z(A).props.suffix ?? ""), U(f, `${c ?? ""} `), q(p, z(A).props.label ?? "");
				}, [
					() => Y("lbl.statValue"),
					() => Y("tip.stat.value"),
					() => Y("lbl.statPrefix"),
					() => Y("lbl.statSuffix"),
					() => Y("lbl.statLabel")
				]), B("change", i, (e) => M("value", e.target.value)), B("change", s, (e) => M("prefix", e.target.value)), B("change", u, (e) => M("suffix", e.target.value)), B("change", p, (e) => M("label", e.target.value)), H(e, t);
			}, l = (e) => {
				var t = cl(), n = I(t), r = F(n), i = F(r, !0);
				k(r);
				var a = L(r, 2), o = F(a, !0);
				k(a), k(n);
				var s = L(n, 2), c = F(s), l = F(c, !0);
				k(c);
				var u = L(c, 2), d = F(u, !0);
				k(u), k(s);
				var f = L(s, 2), p = F(f);
				K(p);
				var m = L(p);
				k(f), R((e, t, n, r, a, s) => {
					U(i, e), U(o, t), U(l, n), U(d, r), J(f, "title", a), bi(p, z(A).props.header !== !1), U(m, ` ${s ?? ""}`);
				}, [
					() => Y("ui.addRow"),
					() => Y("ui.removeRow"),
					() => Y("ui.addColumn"),
					() => Y("ui.removeColumn"),
					() => Y("tip.tabell.header"),
					() => Y("lbl.tabellHeader")
				]), B("click", r, () => Xt(1, 0)), B("click", a, () => Xt(-1, 0)), B("click", c, () => Xt(0, 1)), B("click", u, () => Xt(0, -1)), B("change", p, (e) => M("header", e.target.checked)), H(e, t);
			}, u = (e) => {
				var t = Fr();
				Kr(I(t), 17, () => [
					["facebook", "Facebook"],
					["x", "X"],
					["linkedin", "LinkedIn"],
					["whatsapp", "WhatsApp"],
					["email", Y("opt.deling.email")],
					["copy", Y("opt.deling.copy")]
				], ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ j(() => h(z(t), 2));
					let r = () => z(n)[0], i = () => z(n)[1];
					var a = ll(), o = F(a);
					K(o);
					var s = L(o);
					k(a), R((e) => {
						bi(o, e), U(s, ` ${i() ?? ""}`);
					}, [() => (z(A).props.services ?? []).includes(r())]), B("change", o, (e) => Zt(r(), e.target.checked)), H(e, a);
				}), H(e, t);
			}, d = (e) => {
				var t = ul(), n = I(t), r = F(n), i = L(r);
				K(i), k(n);
				var a = L(n, 2), o = F(a), s = L(o);
				K(s), k(a), R((e, t, n) => {
					U(r, `${e ?? ""} `), q(i, z(A).props.target ?? ""), J(a, "title", t), U(o, `${n ?? ""} `), q(s, z(A).props.doneText ?? "");
				}, [
					() => Y("lbl.nedtellerTarget"),
					() => Y("tip.nedteller.done"),
					() => Y("lbl.nedtellerDone")
				]), B("change", i, (e) => M("target", e.target.value)), B("change", s, (e) => M("doneText", e.target.value)), H(e, t);
			}, f = (e) => {
				var t = fl(), n = I(t), r = F(n), i = L(r);
				k(n);
				var a = L(n, 2), o = (e) => {
					var t = dl(), n = F(t, !0);
					k(t), R((e) => U(n, e), [() => Y("ui.removeAudio")]), B("click", t, () => M("src", "")), H(e, t);
				};
				W(a, (e) => {
					z(A).props.src && e(o);
				});
				var s = L(a, 2), c = F(s), l = L(c);
				K(l), k(s);
				var u = L(s, 2), d = F(u);
				K(d);
				var f = L(d);
				k(u), R((e, t, i, a, o) => {
					J(n, "title", e), U(r, `${t ?? ""} `), U(c, `${i ?? ""} `), q(l, z(A).props.title ?? ""), bi(d, a), U(f, ` ${o ?? ""}`);
				}, [
					() => Y("tip.blocks.audioFile"),
					() => Y("ui.chooseAudio"),
					() => Y("lbl.audioTitle"),
					() => !!z(A).props.loop,
					() => Y("lbl.audioLoop")
				]), B("change", i, Qt), B("change", l, (e) => M("title", e.target.value)), B("change", d, (e) => M("loop", e.target.checked)), H(e, t);
			}, p = (e) => {
				var t = ml(), n = I(t), r = F(n), i = L(r);
				K(i), k(n);
				var a = L(n, 2), o = F(a), s = L(o);
				{
					let e = /* @__PURE__ */ j(() => z(A).props.page ?? "__href"), t = /* @__PURE__ */ j(() => [...z(D).pages.map((e) => [e.id, e.title]), ["__href", Y("opt.externalLink")]]);
					X(s, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => {
							let t = e === "__href" ? null : e;
							jt(`edit:${z(A).blockId}`, (e) => {
								e.props.page = t, t && (e.props.href = null);
							});
						}
					});
				}
				k(a);
				var c = L(a, 2), l = (e) => {
					var t = pl();
					K(t), R((e) => {
						J(t, "placeholder", e), q(t, z(A).props.href === "#" ? "" : z(A).props.href ?? "");
					}, [() => Y("ph.url")]), B("change", t, (e) => M("href", e.target.value || null)), H(e, t);
				};
				W(c, (e) => {
					z(A).props.page || e(l);
				}), R((e, t) => {
					U(r, `${e ?? ""} `), q(i, z(A).props.label), U(o, `${t ?? ""} `);
				}, [() => Y("blocks.text"), () => Y("lbl.goesTo")]), B("change", i, (e) => M("label", e.target.value)), H(e, t);
			}, m = (e) => {
				var t = hl(), n = I(t), r = F(n), i = L(r);
				k(n);
				var a = L(n, 2), o = F(a), s = L(o);
				K(s), k(a);
				var c = L(a, 2), l = F(c), u = L(l);
				K(u), k(c);
				var d = L(c, 2), f = (e) => {
					var t = ll(), n = F(t);
					K(n);
					var r = L(n);
					k(t), R((e, i, a) => {
						J(t, "title", e), bi(n, i), U(r, ` ${a ?? ""}`);
					}, [
						() => Y("tip.lightbox"),
						() => !!z(A).props.lightbox,
						() => Y("lbl.lightbox")
					]), B("change", n, (e) => M("lightbox", e.target.checked)), H(e, t);
				};
				W(d, (e) => {
					z(A).props.href || e(f);
				}), R((e, t, n, i, a) => {
					U(r, `${e ?? ""} `), U(o, `${t ?? ""} `), q(s, z(A).props.alt ?? ""), J(s, "placeholder", n), U(l, `${i ?? ""} `), q(u, z(A).props.href ?? ""), J(u, "placeholder", a);
				}, [
					() => Y("ui.changeImage"),
					() => Y("lbl.description"),
					() => Y("ph.altText"),
					() => Y("lbl.link"),
					() => Y("ph.optionalImageLink")
				]), B("change", i, en), B("change", s, (e) => M("alt", e.target.value)), B("change", u, (e) => M("href", e.target.value || null)), H(e, t);
			}, g = (e) => {
				var t = gl(), n = I(t), r = F(n, !0);
				k(n);
				var i = L(n, 2);
				K(i);
				var a = L(i, 2), o = F(a), s = L(o);
				K(s), k(a), R((e, t, a, c) => {
					J(n, "title", e), U(r, t), q(i, z(A).props.url ?? ""), J(i, "placeholder", a), U(o, `${c ?? ""} `), q(s, z(A).props.title ?? "");
				}, [
					() => Y("hint.video"),
					() => Y("lbl.videoUrl"),
					() => Y("ph.videoUrl"),
					() => Y("lbl.videoTitle")
				]), B("change", i, (e) => M("url", e.target.value)), B("change", s, (e) => M("title", e.target.value)), H(e, t);
			}, _ = (e) => {
				var t = yl(), n = I(t), r = F(n), i = L(r), a = F(i);
				{
					let e = /* @__PURE__ */ j(() => z(A).props.glyph ?? "★"), t = /* @__PURE__ */ j(() => z(A).props.icon ?? null), n = /* @__PURE__ */ j(() => z(A).props.image ?? null);
					za(a, {
						get value() {
							return z(e);
						},
						get icon() {
							return z(t);
						},
						get image() {
							return z(n);
						},
						onpick: (e) => jt(`edit:${z(A).blockId}`, (t) => {
							t.props.glyph = e, t.props.icon = null, t.props.image = null;
						}),
						onicon: (e) => jt(`edit:${z(A).blockId}`, (t) => {
							t.props.icon = e, t.props.image = null;
						}),
						onimage: (e) => M("image", e)
					});
				}
				var o = L(a, 2), s = (e) => {
					var t = _l();
					K(t), R((e) => {
						q(t, z(A).props.glyph ?? ""), J(t, "title", e);
					}, [() => Y("tip.icon.typeGlyph")]), B("change", t, (e) => M("glyph", e.target.value || "★")), H(e, t);
				}, c = (e) => {
					var t = dl(), n = F(t, !0);
					k(t), R((e, r) => {
						J(t, "title", e), U(n, r);
					}, [() => Y("tip.icon.backToGlyph"), () => Y("ui.removeDrawnIcon")]), B("click", t, () => M("icon", null)), H(e, t);
				};
				W(o, (e) => {
					z(A).props.icon ? e(c, -1) : e(s);
				}), k(i), k(n);
				var l = L(n, 2), u = (e) => {
					var t = vl(), n = F(t), r = L(n, 2), i = F(r, !0);
					k(r), k(t), R((e, r, a) => {
						J(t, "title", e), J(n, "src", z(A).props.image), J(n, "alt", r), U(i, a);
					}, [
						() => Y("hint.icon.ownImage"),
						() => Y("gp.ownIcon"),
						() => Y("ui.removeOwnIcon")
					]), B("click", r, () => M("image", null)), H(e, t);
				};
				W(l, (e) => {
					z(A).props.image && e(u);
				}), R((e) => U(r, `${e ?? ""} `), [() => Y("blocks.icon")]), H(e, t);
			}, v = (e) => {
				var t = bl(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ j(() => z(A).props.collection ?? ""), t = /* @__PURE__ */ j(() => [["", Y("common.choose")], ...z(ao).map((e) => [e, z(oo)[e]?.name ?? e])]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => M("collection", e || null)
					});
				}
				k(n);
				var a = L(n, 2), o = F(a), s = L(o);
				K(s), k(a);
				var c = L(a, 2), l = F(c);
				K(l);
				var u = L(l);
				k(c), R((e, t, i, c, d) => {
					J(n, "title", e), U(r, `${t ?? ""} `), J(a, "title", i), U(o, `${c ?? ""} `), q(s, z(A).props.limit ?? 6), bi(l, z(A).props.newestFirst !== !1), U(u, ` ${d ?? ""}`);
				}, [
					() => Y("tip.samling.source"),
					() => Y("blocks.samling"),
					() => Y("tip.samling.limit"),
					() => Y("lbl.maxCount"),
					() => Y("lbl.newestFirst")
				]), B("change", s, (e) => M("limit", Number(e.target.value))), B("change", l, (e) => M("newestFirst", e.target.checked)), H(e, t);
			}, y = (e) => {
				var t = Cl(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ j(() => z(A).props.collection ?? ""), t = /* @__PURE__ */ j(() => [["", Y("common.choose")], ...z(ao).filter((e) => z(oo)[e]?.kind === "products").map((e) => [e, z(oo)[e]?.name ?? e])]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => M("collection", e || null)
					});
				}
				k(n);
				var a = L(n, 2), o = (e) => {
					var t = xl(), n = F(t), r = F(n, !0);
					k(n);
					var i = L(n, 2), a = F(i, !0);
					k(i), k(t), R((e, t, o, s) => {
						J(n, "title", e), U(r, t), J(i, "title", o), U(a, s);
					}, [
						() => Y("tip.produkt.addProduct"),
						() => Y("ui.addProduct"),
						() => Y("tip.produkt.editCatalog"),
						() => Y("ui.editCatalog")
					]), B("click", n, () => Ro(z(A).props.collection)), B("click", i, () => {
						P(so, z(A).props.collection, !0), P(ct, "collections");
					}), H(e, t);
				}, s = (e) => {
					var t = Sl(), n = F(t, !0);
					k(t), R((e, r) => {
						J(t, "title", e), U(n, r);
					}, [() => Y("tip.produkt.createCatalog"), () => Y("ui.createCatalog")]), B("click", t, Io), H(e, t);
				}, c = /* @__PURE__ */ j(() => !z(ao).some((e) => z(oo)[e]?.kind === "products"));
				W(a, (e) => {
					z(A).props.collection && z(oo)[z(A).props.collection]?.kind === "products" ? e(o) : z(c) && e(s, 1);
				});
				var l = L(a, 2), u = F(l), d = L(u);
				K(d), k(l);
				var f = L(l, 2), p = F(f), m = L(p);
				K(m), k(f), R((e, t, i, a, o, s) => {
					J(n, "title", e), U(r, `${t ?? ""} `), J(l, "title", i), U(u, `${a ?? ""} `), q(d, z(A).props.limit ?? 0), J(f, "title", o), U(p, `${s ?? ""} `), q(m, z(A).props.currency ?? "kr");
				}, [
					() => Y("tip.produkt.source"),
					() => Y("blocks.samling"),
					() => Y("tip.samling.limit"),
					() => Y("lbl.maxCount"),
					() => Y("tip.produkt.currency"),
					() => Y("lbl.currency")
				]), B("change", d, (e) => M("limit", Number(e.target.value))), B("change", m, (e) => M("currency", e.target.value)), H(e, t);
			}, b = (e) => {
				var t = wl(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ j(() => z(A).props.href ?? ""), t = /* @__PURE__ */ j(() => [["", Y("common.none")], ...z(D).pages.map((e) => [e.path, e.title])]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => M("href", e)
					});
				}
				k(n);
				var a = L(n, 2), o = F(a), s = L(o);
				K(s), k(a), R((e, t, i, c) => {
					J(n, "title", e), U(r, `${t ?? ""} `), J(a, "title", i), U(o, `${c ?? ""} `), q(s, z(A).props.currency ?? "kr");
				}, [
					() => Y("tip.handlekurv.checkout"),
					() => Y("lbl.checkoutPage"),
					() => Y("tip.produkt.currency"),
					() => Y("lbl.currency")
				]), B("change", s, (e) => M("currency", e.target.value)), H(e, t);
			}, x = (e) => {
				var t = Tl(), n = I(t), r = F(n), i = L(r);
				K(i), k(n);
				var a = L(n, 2), o = F(a), s = L(o);
				K(s), k(a);
				var c = L(a, 2), l = F(c), u = L(l);
				K(u), k(c);
				var d = L(c, 2), f = F(d);
				K(f);
				var p = L(f);
				k(d);
				var m = L(d, 2), h = F(m), g = L(h);
				K(g), k(m), R((e, t, _, v, y, b, x, S, C, w) => {
					J(n, "title", e), U(r, `${t ?? ""} `), q(i, z(A).props.recipient ?? ""), J(a, "title", _), U(o, `${v ?? ""} `), q(s, z(A).props.endpoint ?? ""), J(c, "title", y), U(l, `${b ?? ""} `), q(u, z(A).props.vipps ?? ""), J(d, "title", x), bi(f, z(A).props.vippsCheckout === !0), U(p, ` ${S ?? ""}`), J(m, "title", C), U(h, `${w ?? ""} `), q(g, z(A).props.currency ?? "kr");
				}, [
					() => Y("tip.kasse.recipient"),
					() => Y("lbl.recipientEmail"),
					() => Y("tip.kasse.endpoint"),
					() => Y("lbl.endpointUrl"),
					() => Y("tip.kasse.vipps"),
					() => Y("lbl.vippsNumber"),
					() => Y("tip.kasse.vippsCheckout"),
					() => Y("lbl.vippsCheckout"),
					() => Y("tip.produkt.currency"),
					() => Y("lbl.currency")
				]), B("change", i, (e) => M("recipient", e.target.value.trim())), B("change", s, (e) => M("endpoint", e.target.value.trim())), B("change", u, (e) => M("vipps", e.target.value.trim())), B("change", f, (e) => M("vippsCheckout", e.target.checked)), B("change", g, (e) => M("currency", e.target.value)), H(e, t);
			}, S = (e) => {
				var t = Dl(), n = I(t), r = F(n), i = L(r);
				k(n), Kr(L(n, 2), 17, () => z(A).props.images ?? [], Hr, (e, t, n) => {
					var r = El(), i = F(r), a = F(i), o = L(a, 2), s = F(o);
					s.disabled = n === 0, G(s, () => c.up, !0), k(s);
					var l = L(s, 2);
					G(l, () => c.down, !0), k(l);
					var u = L(l, 2);
					G(u, () => c.cross, !0), k(u), k(o), k(i);
					var d = L(i, 2), f = F(d), p = L(f);
					K(p), k(d);
					var m = L(d, 2), h = F(m), g = L(h);
					K(g), k(m), k(r), R((e, r, o, s, c, d) => {
						J(i, "title", e), J(a, "src", z(t).src), l.disabled = n === z(A).props.images.length - 1, J(u, "title", r), U(f, `${o ?? ""} `), q(p, z(t).alt ?? ""), J(p, "placeholder", s), U(h, `${c ?? ""} `), q(g, z(t).href ?? ""), J(g, "placeholder", d);
					}, [
						() => Y("hint.gallery"),
						() => Y("tip.removeImage"),
						() => Y("lbl.description"),
						() => Y("ph.altShort"),
						() => Y("lbl.link"),
						() => Y("ph.galleryHref")
					]), B("click", s, () => mp(n, -1)), B("click", l, () => mp(n, 1)), B("click", u, () => hp(n)), B("change", p, (e) => gp(n, "alt", e.target.value)), B("change", g, (e) => gp(n, "href", e.target.value || null)), H(e, r);
				}), R((e, t) => {
					J(n, "title", e), U(r, `${t ?? ""} `);
				}, [() => Y("tip.gallery.addImages"), () => Y("ui.addImages")]), B("change", i, fp), H(e, t);
			}, C = (e) => {
				var t = Qc(), n = F(t);
				X(L(n), {
					get value() {
						return z(A).props.kind;
					},
					get options() {
						return rn;
					},
					onchange: (e) => M("kind", e)
				}), k(t), R((e) => U(n, `${e ?? ""} `), [() => Y("blocks.shape")]), H(e, t);
			}, w = (e) => {
				let t = /* @__PURE__ */ j(() => z(rp).find((e) => e.type === z(A).type)?.fields ?? []);
				var n = Fr(), r = I(n), i = (e) => {
					var n = Fr();
					Kr(I(n), 17, () => z(t), (e) => e.key, (e, t) => {
						var n = Fr(), r = I(n), i = (e) => {
							let n = /* @__PURE__ */ j(() => `${z(A).blockId}:${z(t).key}`);
							var r = kl(), i = I(r), a = F(i), o = L(a);
							K(o), k(i);
							var s = L(i, 2), c = F(s, !0);
							k(s);
							var l = L(s, 2), u = (e) => {
								var t = Ol();
								let r;
								var i = F(t, !0);
								k(t), R(() => {
									r = pi(t, 1, "panel-hint svelte-1n46o8q", null, r, { "place-error": Pt[z(n)].err }), U(i, Pt[z(n)].text);
								}), H(e, t);
							};
							W(l, (e) => {
								Pt[z(n)] && e(u);
							}), R((e) => {
								U(a, `${z(t).label ?? ""} `), J(o, "placeholder", z(t).placeholder), q(o, Nt[z(n)] ?? z(A).props[z(t).key] ?? ""), s.disabled = z(Ft), U(c, e);
							}, [() => Y("props.place.search")]), B("input", o, (e) => {
								Nt[z(n)] = e.target.value;
							}), B("keydown", o, (e) => {
								e.key === "Enter" && Rt(z(t));
							}), B("click", s, () => Rt(z(t))), H(e, r);
						}, a = (e) => {
							var n = Al(), r = F(n), i = L(r);
							K(i), k(n), R(() => {
								U(r, `${z(t).label ?? ""} `), J(i, "min", z(t).min), J(i, "max", z(t).max), J(i, "step", z(t).step ?? 1), q(i, z(A).props[z(t).key]);
							}), B("change", i, (e) => M(z(t).key, Lt(z(t), Number(e.target.value)))), H(e, n);
						}, o = (e) => {
							var n = ll(), r = F(n);
							K(r);
							var i = L(r);
							k(n), R((e) => {
								bi(r, e), U(i, ` ${z(t).label ?? ""}`);
							}, [() => !!z(A).props[z(t).key]]), B("change", r, (e) => M(z(t).key, e.target.checked)), H(e, n);
						}, s = (e) => {
							var n = Qc(), r = F(n), i = L(r);
							{
								let e = /* @__PURE__ */ j(() => (z(t).options ?? []).map((e) => [e.value, e.label]));
								X(i, {
									get value() {
										return z(A).props[z(t).key];
									},
									get options() {
										return z(e);
									},
									onchange: (e) => M(z(t).key, e)
								});
							}
							k(n), R(() => U(r, `${z(t).label ?? ""} `)), H(e, n);
						}, c = (e) => {
							var n = jl(), r = F(n), i = L(r);
							K(i), k(n), R(() => {
								U(r, `${z(t).label ?? ""} `), J(i, "placeholder", z(t).placeholder), q(i, z(A).props[z(t).key] ?? "");
							}), B("change", i, (e) => M(z(t).key, e.target.value)), H(e, n);
						};
						W(r, (e) => {
							z(t).type === "place" ? e(i) : z(t).type === "number" ? e(a, 1) : z(t).type === "toggle" ? e(o, 2) : z(t).type === "select" ? e(s, 3) : e(c, -1);
						}), H(e, n);
					}), H(e, n);
				}, a = (e) => {
					var t = dl(), n = F(t, !0);
					k(t), R((e, r) => {
						J(t, "title", e), U(n, r);
					}, [() => Y("hint.pluginBlock"), () => Y("ui.settings")]), B("click", t, () => E?.sendOpenConfig(z(A).blockId)), H(e, t);
				};
				W(r, (e) => {
					z(t).length ? e(i) : e(a, -1);
				}), H(e, n);
			};
			W(n, (e) => {
				z(A).type === "text" ? e(r) : z(A).type === "faq" ? e(i, 1) : z(A).type === "tidslinje" ? e(a, 2) : z(A).type === "sitat" ? e(o, 3) : z(A).type === "statistikk" ? e(s, 4) : z(A).type === "tabell" ? e(l, 5) : z(A).type === "deling" ? e(u, 6) : z(A).type === "nedteller" ? e(d, 7) : z(A).type === "audio" ? e(f, 8) : z(A).type === "button" ? e(p, 9) : z(A).type === "image" ? e(m, 10) : z(A).type === "video" ? e(g, 11) : z(A).type === "icon" ? e(_, 12) : z(A).type === "samling" ? e(v, 13) : z(A).type === "produkt" ? e(y, 14) : z(A).type === "handlekurv" ? e(b, 15) : z(A).type === "kasse" ? e(x, 16) : z(A).type === "galleri" ? e(S, 17) : z(A).type === "shape" ? e(C, 18) : e(w, -1);
			}), H(e, t);
		}, m = (e) => {
			var t = $l(), n = I(t), r = (e) => {
				var t = Ml(), n = I(t), r = F(n), a = L(r);
				{
					let e = /* @__PURE__ */ j(() => z(A).props.align ?? "left"), t = /* @__PURE__ */ j(() => [
						["left", Y("common.left")],
						["center", Y("common.center")],
						["right", Y("common.right")]
					]);
					X(a, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => M("align", e)
					});
				}
				k(n);
				var o = L(n, 2), s = F(o);
				K(s);
				var c = L(s);
				k(o);
				var l = L(o, 2), u = (e) => {
					i(e);
				};
				W(l, (e) => {
					z(A).props.box && e(u);
				}), Ie(2), R((e, t, n) => {
					U(r, `${e ?? ""} `), bi(s, t), U(c, ` ${n ?? ""}`);
				}, [
					() => Y("lbl.align"),
					() => !!z(A).props.box,
					() => Y("lbl.textBoxToggle")
				]), B("change", s, (e) => M("box", e.target.checked)), H(e, t);
			}, a = (e) => {
				var t = Nl(), n = I(t), r = F(n, !0);
				k(n);
				var a = L(n, 2);
				i(a), Ie(2), R((e) => U(r, e), [() => Y("lbl.cardStyle")]), H(e, t);
			}, o = (e) => {
				var t = Pl(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ j(() => z(A).props.variant ?? "venstre"), t = /* @__PURE__ */ j(() => [["venstre", Y("opt.tl.venstre")], ["veksler", Y("opt.tl.veksler")]]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => M("variant", e)
					});
				}
				k(n);
				var a = L(n, 2), o = F(a), s = L(o);
				{
					let e = /* @__PURE__ */ j(() => z(A).props.marker ?? "fylt"), t = /* @__PURE__ */ j(() => [["fylt", Y("opt.tl.fylt")], ["ring", Y("opt.tl.ring")]]);
					X(s, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => M("marker", e)
					});
				}
				k(a);
				var c = L(a, 2), l = F(c), u = L(l);
				{
					let e = /* @__PURE__ */ j(() => z(A).props.accent ?? "accent"), t = /* @__PURE__ */ j(sr);
					sa(u, {
						get value() {
							return z(e);
						},
						get tokens() {
							return z(t);
						},
						onchange: (e) => M("accent", e === "accent" ? null : e)
					});
				}
				k(c), Ie(2), R((e, t, n) => {
					U(r, `${e ?? ""} `), U(o, `${t ?? ""} `), U(l, `${n ?? ""} `);
				}, [
					() => Y("lbl.variant"),
					() => Y("lbl.tlMarker"),
					() => Y("lbl.color")
				]), H(e, t);
			}, s = (e) => {
				var t = Il(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ j(() => z(A).props.variant ?? "stor"), t = /* @__PURE__ */ j(() => [["stor", Y("opt.sitat.stor")], ["kort", Y("opt.sitat.kort")]]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => M("variant", e)
					});
				}
				k(n);
				var a = L(n, 2), o = (e) => {
					var t = Fl(), n = I(t), r = F(n), i = L(r);
					k(n);
					var a = L(n, 2), o = (e) => {
						var t = dl(), n = F(t, !0);
						k(t), R((e) => U(n, e), [() => Y("ui.sitatPortrettFjern")]), B("click", t, () => M("image", "")), H(e, t);
					};
					W(a, (e) => {
						z(A).props.image && e(o);
					}), R((e) => U(r, `${e ?? ""} `), [() => Y("ui.sitatPortrett")]), B("change", i, tn), H(e, t);
				};
				W(a, (e) => {
					z(A).props.variant === "kort" && e(o);
				});
				var s = L(a, 2), c = F(s), l = L(c);
				{
					let e = /* @__PURE__ */ j(() => z(A).props.accent ?? "accent"), t = /* @__PURE__ */ j(sr);
					sa(l, {
						get value() {
							return z(e);
						},
						get tokens() {
							return z(t);
						},
						onchange: (e) => M("accent", e === "accent" ? null : e)
					});
				}
				k(s), Ie(2), R((e, t) => {
					U(r, `${e ?? ""} `), U(c, `${t ?? ""} `);
				}, [() => Y("lbl.variant"), () => Y("lbl.color")]), H(e, t);
			}, c = (e) => {
				var t = Ll(), n = I(t), r = F(n);
				K(r);
				var i = L(r);
				k(n), Ie(2), R((e, t) => {
					J(n, "title", e), bi(r, z(A).props.countUp !== !1), U(i, ` ${t ?? ""}`);
				}, [() => Y("tip.stat.countUp"), () => Y("lbl.statCountUp")]), B("change", r, (e) => M("countUp", e.target.checked)), H(e, t);
			}, l = (e) => {
				var t = Rl(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ j(() => z(A).props.lines ?? "rows"), t = /* @__PURE__ */ j(() => [
						["rows", Y("opt.tabell.rows")],
						["grid", Y("opt.tabell.grid")],
						["none", Y("common.none")]
					]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => M("lines", e)
					});
				}
				k(n);
				var a = L(n, 2), o = F(a);
				K(o);
				var s = L(o);
				k(a), Ie(2), R((e, t, n) => {
					U(r, `${e ?? ""} `), bi(o, t), U(s, ` ${n ?? ""}`);
				}, [
					() => Y("lbl.tabellLines"),
					() => !!z(A).props.striped,
					() => Y("lbl.tabellStriped")
				]), B("change", o, (e) => M("striped", e.target.checked)), H(e, t);
			}, u = (e) => {
				var t = zl(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ j(() => z(A).props.variant ?? "icons"), t = /* @__PURE__ */ j(() => [["icons", Y("opt.deling.icons")], ["labels", Y("opt.deling.labels")]]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => M("variant", e)
					});
				}
				k(n);
				var a = L(n, 2), o = F(a), s = L(o);
				K(s), k(a);
				var c = L(a, 2), l = F(c), u = L(l);
				{
					let e = /* @__PURE__ */ j(() => z(A).props.color || "accent"), t = /* @__PURE__ */ j(sr);
					sa(u, {
						get value() {
							return z(e);
						},
						get tokens() {
							return z(t);
						},
						onchange: (e) => M("color", e === "accent" ? "" : e)
					});
				}
				k(c), Ie(2), R((e, t, n) => {
					U(r, `${e ?? ""} `), U(o, `${t ?? ""} `), q(s, z(A).props.size ?? 38), U(l, `${n ?? ""} `);
				}, [
					() => Y("lbl.variant"),
					() => Y("lbl.size"),
					() => Y("lbl.color")
				]), B("change", s, (e) => M("size", Number(e.target.value) || 38)), H(e, t);
			}, d = (e) => {
				var t = Rl(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ j(() => z(A).props.variant ?? "boxes"), t = /* @__PURE__ */ j(() => [["boxes", Y("opt.nedteller.boxes")], ["plain", Y("opt.nedteller.plain")]]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => M("variant", e)
					});
				}
				k(n);
				var a = L(n, 2), o = F(a);
				K(o);
				var s = L(o);
				k(a), Ie(2), R((e, t) => {
					U(r, `${e ?? ""} `), bi(o, z(A).props.showSeconds !== !1), U(s, ` ${t ?? ""}`);
				}, [() => Y("lbl.variant"), () => Y("lbl.nedtellerSeconds")]), B("change", o, (e) => M("showSeconds", e.target.checked)), H(e, t);
			}, f = (e) => {
				var t = Bl(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ j(() => [["primary", Y("opt.btn.primary")], ["secondary", Y("opt.btn.secondary")]]);
					X(i, {
						get value() {
							return z(A).props.style;
						},
						get options() {
							return z(e);
						},
						onchange: (e) => M("style", e)
					});
				}
				k(n), Ie(2), R((e) => U(r, `${e ?? ""} `), [() => Y("lbl.style")]), H(e, t);
			}, p = (e) => {
				var t = Vl(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ j(() => z(A).props.fit ?? "cover"), t = /* @__PURE__ */ j(() => [["cover", Y("opt.fitFrame.cover")], ["contain", Y("opt.fitFrame.contain")]]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => M("fit", e)
					});
				}
				k(n);
				var a = L(n, 2), o = F(a), s = L(o);
				{
					let e = /* @__PURE__ */ j(() => z(A).props.radius ?? ""), t = /* @__PURE__ */ j(() => [
						["", Y("common.none")],
						["sm", Y("opt.size.sm")],
						["md", Y("opt.radius.md")]
					]);
					X(s, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => M("radius", e || null)
					});
				}
				k(a);
				var c = L(a, 2), l = F(c), u = L(l), d = F(u);
				k(u), k(c);
				var f = L(c, 2);
				K(f);
				var p = L(f, 2), m = F(p), h = L(m), g = F(h);
				k(h), k(p);
				var _ = L(p, 2);
				K(_);
				var v = L(_, 2), y = F(v), b = L(y), x = F(b);
				k(b), k(v);
				var S = L(v, 2);
				K(S);
				var C = L(S, 2), w = F(C), ee = L(w), te = F(ee);
				k(ee), k(C);
				var ne = L(C, 2);
				K(ne);
				var re = L(ne, 2), ie = F(re), ae = L(ie), oe = F(ae);
				k(ae), k(re);
				var se = L(re, 2);
				K(se);
				var ce = L(se, 2), le = F(ce), ue = L(le), de = F(ue);
				k(ue), k(ce);
				var fe = L(ce, 2);
				K(fe);
				var pe = L(fe, 2), me = F(pe, !0);
				k(pe), Ie(2), R((e, t, n, i, a, s, c, u, p, h, b, C, ee, re, ae, ce, ue) => {
					U(r, `${e ?? ""} `), U(o, `${t ?? ""} `), U(l, `${n ?? ""} `), U(d, `${i ?? ""}%`), q(f, z(A).props.x ?? .5), U(m, `${a ?? ""} `), U(g, `${s ?? ""}%`), q(_, z(A).props.y ?? .5), J(v, "title", c), U(y, `${u ?? ""} `), U(x, `${p ?? ""}x`), q(S, z(A).props.zoom ?? 1), U(w, `${h ?? ""} `), U(te, `${b ?? ""}%`), q(ne, z(A).props.brightness ?? 1), U(ie, `${C ?? ""} `), U(oe, `${ee ?? ""}%`), q(se, z(A).props.contrast ?? 1), U(le, `${re ?? ""} `), U(de, `${ae ?? ""}%`), q(fe, z(A).props.saturate ?? 1), J(pe, "title", ce), U(me, ue);
				}, [
					() => Y("lbl.fit"),
					() => Y("lbl.radius"),
					() => Y("lbl.focusX"),
					() => Math.round((z(A).props.x ?? .5) * 100),
					() => Y("lbl.focusY"),
					() => Math.round((z(A).props.y ?? .5) * 100),
					() => Y("tip.zoomCrop"),
					() => Y("lbl.zoom"),
					() => (z(A).props.zoom ?? 1).toFixed(2),
					() => Y("lbl.brightness"),
					() => Math.round((z(A).props.brightness ?? 1) * 100),
					() => Y("lbl.contrast"),
					() => Math.round((z(A).props.contrast ?? 1) * 100),
					() => Y("lbl.saturate"),
					() => Math.round((z(A).props.saturate ?? 1) * 100),
					() => Y("tip.resetAdjust"),
					() => Y("ui.resetAdjust")
				]), B("input", f, (e) => M("x", Number(e.target.value))), B("input", _, (e) => M("y", Number(e.target.value))), B("input", S, (e) => M("zoom", Number(e.target.value))), B("input", ne, (e) => M("brightness", Number(e.target.value))), B("input", se, (e) => M("contrast", Number(e.target.value))), B("input", fe, (e) => M("saturate", Number(e.target.value))), B("click", pe, () => jt(`edit:${z(A).blockId}`, (e) => {
					e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
				})), H(e, t);
			}, m = (e) => {
				var t = Hl(), n = I(t), r = F(n), i = L(r);
				K(i), k(n);
				var a = L(n, 2), o = F(a), s = L(o);
				{
					let e = /* @__PURE__ */ j(() => z(A).props.color ?? "accent"), t = /* @__PURE__ */ j(sr);
					sa(s, {
						get value() {
							return z(e);
						},
						get tokens() {
							return z(t);
						},
						onchange: (e) => M("color", e)
					});
				}
				k(a), Ie(2), R((e, t, n) => {
					U(r, `${e ?? ""} `), q(i, z(A).props.size ?? 48), J(a, "title", t), U(o, `${n ?? ""} `);
				}, [
					() => Y("lbl.sizePx"),
					() => Y("hint.icon.color"),
					() => Y("lbl.color")
				]), B("change", i, (e) => M("size", Number(e.target.value))), H(e, t);
			}, h = (e) => {
				var t = Bl(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ j(() => z(A).props.view ?? "cards"), t = /* @__PURE__ */ j(() => [
						["cards", Y("opt.collectionView.cards")],
						["list", Y("opt.collectionView.list")],
						["archive", Y("opt.collectionView.archive")]
					]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => M("view", e)
					});
				}
				k(n), Ie(2), R((e) => U(r, `${e ?? ""} `), [() => Y("lbl.view")]), H(e, t);
			}, g = (e) => {
				var t = Ul(), n = I(t), r = F(n), i = L(r);
				K(i), k(n), Ie(2), R((e, t) => {
					J(n, "title", e), U(r, `${t ?? ""} `), q(i, z(A).props.columns ?? 0);
				}, [() => Y("tip.produkt.columns"), () => Y("lbl.columns")]), B("change", i, (e) => M("columns", Number(e.target.value))), H(e, t);
			}, _ = (e) => {
				var t = Bl(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ j(() => z(A).props.variant ?? "button"), t = /* @__PURE__ */ j(() => [["button", Y("opt.handlekurv.button")], ["icon", Y("opt.handlekurv.icon")]]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => M("variant", e)
					});
				}
				k(n), Ie(2), R((e) => U(r, `${e ?? ""} `), [() => Y("lbl.view")]), H(e, t);
			}, v = (e) => {
				var t = Kl(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ j(() => z(A).props.view ?? "grid"), t = /* @__PURE__ */ j(() => [
						["grid", Y("opt.galleryView.grid")],
						["carousel", Y("opt.galleryView.carousel")],
						["slides", Y("opt.galleryView.slides")]
					]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => M("view", e)
					});
				}
				k(n);
				var a = L(n, 2), o = (e) => {
					var t = Wl(), n = I(t), r = F(n), i = L(r);
					K(i), k(n);
					var a = L(n, 2), o = F(a), s = L(o), c = F(s);
					k(s), k(a);
					var l = L(a, 2);
					K(l), R((e, t) => {
						U(r, `${e ?? ""} `), q(i, z(A).props.columns ?? 3), U(o, `${t ?? ""} `), U(c, `${z(A).props.gap ?? 12 ?? ""} px`), q(l, z(A).props.gap ?? 12);
					}, [() => Y("lbl.columns"), () => Y("lbl.imageGap")]), B("change", i, (e) => M("columns", Number(e.target.value))), B("input", l, (e) => M("gap", Number(e.target.value))), H(e, t);
				};
				W(a, (e) => {
					(z(A).props.view ?? "grid") === "grid" && e(o);
				});
				var s = L(a, 2), c = (e) => {
					var t = Gl(), n = F(t), r = L(n);
					K(r), k(t), R((e) => {
						U(n, `${e ?? ""} `), q(r, z(A).props.interval ?? 5);
					}, [() => Y("lbl.secondsPerImage")]), B("change", r, (e) => M("interval", Number(e.target.value))), H(e, t);
				};
				W(s, (e) => {
					z(A).props.view === "slides" && e(c);
				});
				var l = L(s, 2), u = F(l), d = L(u);
				{
					let e = /* @__PURE__ */ j(() => z(A).props.radius ?? ""), t = /* @__PURE__ */ j(() => [
						["", Y("common.none")],
						["sm", Y("opt.size.sm")],
						["md", Y("opt.radius.md")]
					]);
					X(d, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => M("radius", e || null)
					});
				}
				k(l);
				var f = L(l, 2), p = F(f);
				K(p);
				var m = L(p);
				k(f), Ie(2), R((e, t, n, i) => {
					U(r, `${e ?? ""} `), U(u, `${t ?? ""} `), J(f, "title", n), bi(p, z(A).props.lightbox !== !1), U(m, ` ${i ?? ""}`);
				}, [
					() => Y("lbl.view"),
					() => Y("lbl.radius"),
					() => Y("tip.lightbox"),
					() => Y("lbl.lightbox")
				]), B("change", p, (e) => M("lightbox", e.target.checked)), H(e, t);
			}, y = (e) => {
				var t = ql(), n = I(t), r = F(n);
				X(L(r), {
					get value() {
						return z(A).props.color;
					},
					get options() {
						return sn;
					},
					onchange: (e) => M("color", e)
				}), k(n);
				var i = L(n, 2), a = F(i), o = L(a);
				K(o), k(i);
				var s = L(i, 2), c = F(s);
				K(c);
				var l = L(c);
				k(s), Ie(2), R((e, t, n, i, u) => {
					U(r, `${e ?? ""} `), U(a, `${t ?? ""} `), q(o, z(A).props.thickness), J(s, "title", n), bi(c, i), U(l, ` ${u ?? ""}`);
				}, [
					() => Y("lbl.color"),
					() => Y("lbl.thickness"),
					() => Y("tip.shape.fill"),
					() => !!z(A).props.fill,
					() => Y("lbl.filled")
				]), B("change", o, (e) => M("thickness", Number(e.target.value))), B("change", c, (e) => M("fill", e.target.checked ? z(A).props.color : null)), H(e, t);
			};
			W(n, (e) => {
				z(A).type === "text" ? e(r) : z(A).type === "faq" ? e(a, 1) : z(A).type === "tidslinje" ? e(o, 2) : z(A).type === "sitat" ? e(s, 3) : z(A).type === "statistikk" ? e(c, 4) : z(A).type === "tabell" ? e(l, 5) : z(A).type === "deling" ? e(u, 6) : z(A).type === "nedteller" ? e(d, 7) : z(A).type === "button" ? e(f, 8) : z(A).type === "image" ? e(p, 9) : z(A).type === "icon" ? e(m, 10) : z(A).type === "samling" ? e(h, 11) : z(A).type === "produkt" ? e(g, 12) : z(A).type === "handlekurv" ? e(_, 13) : z(A).type === "galleri" ? e(v, 14) : z(A).type === "shape" && e(y, 15);
			});
			var b = L(n, 2), x = F(b), S = L(x);
			{
				let e = /* @__PURE__ */ j(() => hr(z(A).animation) ? z(A).animation.type : "");
				X(S, {
					get value() {
						return z(e);
					},
					get options() {
						return _r;
					},
					onchange: (e) => br(e || null)
				});
			}
			k(b);
			var C = L(b, 2), w = (e) => {
				var t = Jl(), n = I(t), r = F(n), i = L(r);
				K(i), k(n);
				var a = L(n, 2), o = F(a), s = L(o);
				K(s), k(a), R((e, t) => {
					U(r, `${e ?? ""} `), q(i, z(A).animation.props.duration), U(o, `${t ?? ""} `), q(s, z(A).animation.props.delay);
				}, [() => Y("lbl.durationMs"), () => Y("lbl.delayMs")]), B("change", i, (e) => Sr("duration", Number(e.target.value))), B("change", s, (e) => Sr("delay", Number(e.target.value))), H(e, t);
			}, ee = /* @__PURE__ */ j(() => hr(z(A).animation));
			W(C, (e) => {
				z(ee) && e(w);
			});
			var te = L(C, 2), ne = F(te), re = L(ne);
			{
				let e = /* @__PURE__ */ j(() => z(A).hover?.type ?? (z(A).animation && !hr(z(A).animation) ? z(A).animation.type : ""));
				X(re, {
					get value() {
						return z(e);
					},
					get options() {
						return vr;
					},
					onchange: (e) => xr(e || null)
				});
			}
			k(te);
			var ie = L(te, 2), ae = (e) => {
				var t = Zl(), n = L(I(t), 2), r = F(n);
				K(r);
				var i = L(r);
				k(n);
				var a = L(n, 2), o = (e) => {
					var t = Xl(), n = I(t), r = F(n), i = L(r);
					{
						let e = /* @__PURE__ */ j(() => z(A).sticky.mode ?? "scroll"), t = /* @__PURE__ */ j(() => [["scroll", Y("opt.sticky.modeScroll")], ["screen", Y("opt.sticky.modeScreen")]]);
						X(i, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => jt(`edit:${z(A).blockId}`, (t) => {
								t.sticky = {
									...t.sticky,
									mode: e
								};
							})
						});
					}
					k(n);
					var a = L(n, 2), o = (e) => {
						var t = Yl(), n = F(t), r = L(n);
						K(r), k(t), R((e, i) => {
							J(t, "title", e), U(n, `${i ?? ""} `), q(r, z(A).sticky.offset ?? 16);
						}, [() => z(A).sticky.mode === "screen" ? Y("tip.stickyEdge") : Y("tip.stickyOffset"), () => z(A).sticky.mode === "screen" ? Y("lbl.stickyEdge") : Y("lbl.stickyOffset")]), B("change", r, (e) => jt(`edit:${z(A).blockId}`, (t) => {
							t.sticky = {
								...t.sticky,
								offset: Math.max(0, Number(e.target.value) || 0)
							};
						})), H(e, t);
					};
					W(a, (e) => {
						(z(A).sticky.mode !== "screen" || (z(A).sticky.dock ?? "bottom-right") !== "middle-center") && e(o);
					});
					var s = L(a, 2), c = (e) => {
						var t = Qc(), n = F(t), r = L(n);
						{
							let e = /* @__PURE__ */ j(() => z(A).sticky.dock ?? "bottom-right"), t = /* @__PURE__ */ j(() => Ot.map(([e, t]) => [e, Y(t)]));
							X(r, {
								get value() {
									return z(e);
								},
								get options() {
									return z(t);
								},
								onchange: (e) => jt(`edit:${z(A).blockId}`, (t) => {
									t.sticky = {
										...t.sticky,
										dock: e
									};
								})
							});
						}
						k(t), R((e, r) => {
							J(t, "title", e), U(n, `${r ?? ""} `);
						}, [() => Y("tip.stickyDock"), () => Y("lbl.stickyDock")]), H(e, t);
					}, l = (e) => {
						var t = Qc(), n = F(t), r = L(n);
						{
							let e = /* @__PURE__ */ j(() => z(A).sticky.until ?? ""), t = /* @__PURE__ */ j(kt);
							X(r, {
								get value() {
									return z(e);
								},
								get options() {
									return z(t);
								},
								onchange: (e) => jt(`edit:${z(A).blockId}`, (t) => {
									t.sticky = {
										...t.sticky,
										until: e || null
									};
								})
							});
						}
						k(t), R((e, r) => {
							J(t, "title", e), U(n, `${r ?? ""} `);
						}, [() => Y("tip.stickyUntil"), () => Y("lbl.stickyUntil")]), H(e, t);
					};
					W(s, (e) => {
						z(A).sticky.mode === "screen" ? e(c) : e(l, -1);
					}), R((e, t) => {
						J(n, "title", e), U(r, `${t ?? ""} `);
					}, [() => Y("tip.stickyMode"), () => Y("lbl.stickyMode")]), H(e, t);
				};
				W(a, (e) => {
					z(A).sticky && e(o);
				}), R((e, t, a) => {
					J(n, "title", e), bi(r, t), U(i, ` ${a ?? ""}`);
				}, [
					() => Y("tip.sticky"),
					() => !!z(A).sticky,
					() => Y("lbl.sticky")
				]), B("change", r, (e) => jt(`edit:${z(A).blockId}`, (t) => {
					t.sticky = e.target.checked ? {
						offset: 16,
						until: null
					} : null;
				})), H(e, t);
			};
			W(ie, (e) => {
				z(oe) === "desktop" && e(ae);
			});
			var se = L(ie, 4), ce = F(se), le = F(ce, !0);
			k(ce);
			var ue = L(ce, 2), de = F(ue), fe = (e) => {
				var t = Ql(), n = F(t), r = F(n, !0), i = L(r);
				K(i), k(n);
				var a = L(n, 2), o = F(a, !0), s = L(o);
				K(s), k(a);
				var c = L(a, 2), l = F(c, !0), u = L(l);
				K(u), k(c);
				var d = L(c, 2), f = F(d, !0), p = L(f);
				K(p), k(d);
				var m = L(d, 2), h = F(m, !0), g = L(h);
				K(g), k(m);
				var _ = L(m, 2), v = F(_, !0), y = L(v);
				K(y), k(_), k(t), R((e, t, n, a, c, d, _) => {
					U(r, e), q(i, z(A).frame.x), U(o, t), q(s, z(A).frame.y), U(l, n), q(u, z(A).frame.w), U(f, a), q(p, z(A).frame.h), J(m, "title", c), U(h, d), q(g, z(A).frame.z ?? 1), U(v, _), q(y, z(A).frame.rot ?? 0);
				}, [
					() => Y("frame.x"),
					() => Y("frame.y"),
					() => Y("frame.w"),
					() => Y("frame.h"),
					() => Y("tip.frameZ"),
					() => Y("frame.z"),
					() => Y("frame.rot")
				]), B("change", i, (e) => zt("x", Number(e.target.value))), B("change", s, (e) => zt("y", Number(e.target.value))), B("change", u, (e) => zt("w", Number(e.target.value))), B("change", p, (e) => zt("h", Number(e.target.value))), B("change", g, (e) => zt("z", Number(e.target.value))), B("change", y, (e) => zt("rot", Number(e.target.value))), H(e, t);
			};
			W(de, (e) => {
				z(oe) === "desktop" && e(fe);
			});
			var pe = L(de, 2), me = F(pe);
			K(me);
			var he = L(me);
			k(pe);
			var ge = L(pe, 2), _e = F(ge);
			K(_e);
			var ve = L(_e);
			k(ge), k(ue), k(se), R((e, t, n, r, i, a, o, s, c, l) => {
				J(b, "title", e), U(x, `${t ?? ""} `), J(te, "title", n), U(ne, `${r ?? ""} `), J(ce, "title", i), U(le, a), J(pe, "title", o), bi(me, z(A).hideMobile), U(he, ` ${s ?? ""}`), J(ge, "title", c), bi(_e, z(A).decor), U(ve, ` ${l ?? ""}`);
			}, [
				() => Y("tip.props.blockAnim"),
				() => Y("lbl.animIn"),
				() => Y("tip.props.blockHover"),
				() => Y("lbl.onHover"),
				() => Y("hint.placement"),
				() => Y("group.placement"),
				() => Y("tip.hideMobile"),
				() => Y("lbl.hideMobile"),
				() => Y("tip.decor"),
				() => Y("lbl.decor")
			]), B("change", me, (e) => $t(e.target.checked)), B("change", _e, (e) => Yt(e.target.checked)), H(e, t);
		};
		W(f, (e) => {
			z(It) === "content" ? e(p) : e(m, -1);
		}), R((e, t) => {
			o = pi(a, 1, "svelte-1n46o8q", null, o, { on: z(It) === "content" }), U(s, e), u = pi(l, 1, "svelte-1n46o8q", null, u, { on: z(It) === "style" }), U(d, t);
		}, [() => Y("props.tabContent"), () => Y("props.tabStyle")]), B("click", a, () => P(It, "content")), B("click", l, () => P(It, "style")), H(e, t);
	}, o = [
		["color", Rs],
		["gradient", Xs],
		["glow", Zs],
		["image", Cc],
		["bildegalleri", Dc],
		["grain", $s]
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
		["lilla", Y("adminTheme.lilla")],
		["bronn", Y("adminTheme.bronn")],
		["gull", Y("adminTheme.gull")],
		["graa", Y("adminTheme.graa")],
		["nordlys", Y("adminTheme.nordlys")],
		["skumring", Y("adminTheme.skumring")],
		["glo", Y("adminTheme.glo")]
	], u = /* @__PURE__ */ N(an(localStorage.getItem("urd-admin-theme") ?? "graa"));
	Cn(() => {
		document.documentElement.dataset.adminTheme = z(u), localStorage.setItem("urd-admin-theme", z(u)), d();
	});
	function d() {
		let e = getComputedStyle(document.documentElement), t = e.getPropertyValue("--urd-color-accent").trim();
		E?.sendAdminTheme({
			bg: e.getPropertyValue("--urd-color-bg").trim(),
			surface: e.getPropertyValue("--urd-color-surface").trim(),
			accent: t,
			text: e.getPropertyValue("--urd-color-text").trim(),
			"accent-text": p(t)
		});
	}
	function p(e) {
		return Is(e) == null || (Ls(e, "#ffffff") ?? 0) >= (Ls(e, "#0b0e14") ?? 0) ? "#ffffff" : "#0b0e14";
	}
	let m = /* @__PURE__ */ N(null), g = /* @__PURE__ */ N(null), _ = /* @__PURE__ */ N(!1), v = /* @__PURE__ */ N(""), y = /* @__PURE__ */ N("info"), b = 0;
	function x(e, t = "info") {
		P(v, e, !0), P(y, t, !0);
		let n = ++b;
		t === "ok" && setTimeout(() => {
			b === n && (P(v, ""), P(y, "info"));
		}, 8e3);
	}
	function S() {
		x(Y("status.storageFull"), "error");
	}
	function C(e, t) {
		try {
			localStorage.setItem(e, t);
		} catch {
			S();
		}
	}
	let w = /* @__PURE__ */ N(null), ee = /* @__PURE__ */ N(null), te = /* @__PURE__ */ N(an({
		size: 16,
		snap: !0
	})), ne = /* @__PURE__ */ N(!0), re = [
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
	], ie = /* @__PURE__ */ N("desktop"), ae = /* @__PURE__ */ j(() => re.find((e) => e.id === z(ie)) ?? re[0]), oe = /* @__PURE__ */ j(() => z(ae).viewport), se = /* @__PURE__ */ N(null), ce = /* @__PURE__ */ N(0), le = /* @__PURE__ */ N(0), ue = /* @__PURE__ */ N(an(typeof window < "u" ? window.innerWidth : 1280)), de = /* @__PURE__ */ N("fit"), fe = /* @__PURE__ */ N(1), pe = /* @__PURE__ */ j(() => z(ca) === "full" ? z(ue) : 1920), me = /* @__PURE__ */ j(() => Ya(z(ca), z(la))), he = /* @__PURE__ */ j(() => z(ae).width ?? z(pe)), ge = /* @__PURE__ */ j(() => z(de) === "manual" ? z(fe) : Ha(z(ce), z(he), "fit"));
	function _e(e) {
		let t = Math.min(400, Math.max(10, (Math.round(Math.round(z(ge) * 100) / 10) + e) * 10));
		P(fe, t / 100), P(de, "manual");
	}
	let ve = /* @__PURE__ */ j(() => z(ge) > 0 ? z(le) / z(ge) : z(le)), ye = /* @__PURE__ */ j(() => z(he) * z(ge)), be = /* @__PURE__ */ j(() => z(le)), xe = /* @__PURE__ */ j(() => z(ye) > z(ce) + 1 || z(be) > z(le) + 1);
	Cn(() => {
		let e = () => E?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), Cn(() => {
		let e = z(oe);
		E?.sendViewport(e);
	}), Cn(() => {
		let e = z(ge);
		E?.sendZoom(e);
	}), Cn(() => {
		let e = () => {
			P(ue, window.innerWidth, !0);
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}), Cn(() => {
		let e = z(se);
		if (!e || typeof ResizeObserver > "u") return;
		let t = () => {
			P(ce, e.clientWidth, !0), P(le, e.clientHeight, !0);
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	});
	let Se = /* @__PURE__ */ N(0);
	function Ce() {
		P(Se, T?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function we() {
		let e = T?.data.sections.find((e) => e.responsive?.mobile?.attention?.needed);
		P(ie, "mobile"), e && setTimeout(() => E?.sendScrollSection(e.id), 0);
	}
	function Te(e) {
		let t = T.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			Re("layout");
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
			}, De(t, "layout-changed"), e.sectionId === z(cn) && P(un, e.minHeight, !0), z(A)?.sectionId === e.sectionId && wt(), T.save(), O(), E?.sendSection(z(g), t);
		}
	}
	function Ee(e) {
		return e?.blocks?.some((e) => e.frames?.mobile) ?? !1;
	}
	function De(e, t) {
		!e || !Ee(e) || e.responsive?.mobile?.attention?.needed || (e.responsive = {
			...e.responsive ?? {},
			mobile: {
				...e.responsive?.mobile ?? { mode: "auto" },
				attention: {
					needed: !0,
					reason: t,
					since: (/* @__PURE__ */ new Date()).toISOString()
				}
			}
		}, Ce(), E?.sendAttention(e.id, !0));
	}
	let T = null, Oe = null, E = null, D = /* @__PURE__ */ N(null);
	function ke() {
		P(D, Oe.data, !0), Oe.replace(z(D));
	}
	function Ae() {
		E?.sendSite(Ue(z(D)));
	}
	let je = /* @__PURE__ */ new Set(), Me = () => z(D).pages.find((e) => e.id === z(g));
	function O() {
		let e = z(D)?.pages?.some((e) => !je.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = eo?.hasDraft() || Object.values(to).some((e) => e.hasDraft()), n = _o?.hasDraft() || Object.values(Z).some((e) => e.hasDraft());
		P(_, e || T?.hasDraft() && !je.has(z(g)) || Oe?.hasDraft() || as?.hasDraft() || t || n || !1, !0);
	}
	let Ne = [], Pe = [], Fe = null;
	function Le() {
		return JSON.stringify({
			pageId: z(g),
			page: T.data,
			site: Oe.data,
			samlingerIndex: io ? eo.data : null,
			samlinger: io ? Object.fromEntries(Object.entries(to).map(([e, t]) => [e, t.data])) : {},
			malerIndex: vo ? _o.data : null,
			maler: vo ? Object.fromEntries(Object.entries(Z).map(([e, t]) => [e, t.data])) : {},
			plugins: as?.data ?? null
		});
	}
	function Re(e) {
		e === Fe && (e.startsWith("edit:") || e.startsWith("grid:")) || (Ne.push(Le()), Ne.length > 50 && Ne.shift(), Pe.length = 0, Fe = e);
	}
	function ze(e) {
		let { pageId: t, page: n, site: r, samlingerIndex: i, samlinger: a, malerIndex: o, maler: s, plugins: c } = JSON.parse(e);
		if (Oe.replace(r), ke(), Oe.save(), P(te, {
			snap: !0,
			...z(D).grid
		}, !0), Ae(), Be(i, a ?? {}), Ve(o, s ?? {}), He(c), t && t !== z(g) && z(D).pages.some((e) => e.id === t)) {
			C(`urd-draft-${t}`, JSON.stringify(n)), ii(t, { keepHistory: !0 }), O();
			return;
		}
		T.replace(n), T.save(), O(), Ce(), wt(), hn(T.data.sections.find((e) => e.id === z(cn))), z(D).pages.some((e) => e.id === z(g)) ? E?.sendPage(z(g), T.data) : ii(z(D).pages[0].id, { keepHistory: !0 });
	}
	function Be(e, t) {
		if (!(!eo || !e) && JSON.stringify({
			index: eo.data,
			samlinger: Object.fromEntries(Object.entries(to).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			samlinger: t
		})) {
			eo.replace(e), eo.save();
			for (let e of Object.keys(to)) e in t || (localStorage.removeItem(`urd-draft-samling-${e}`), delete to[e]);
			for (let [e, n] of Object.entries(t)) {
				if (!to[e]) {
					let t = ro[e] ?? null;
					to[e] = Yi(`urd-draft-samling-${e}`, () => t, S);
				}
				to[e].replace(n), to[e].save();
			}
			P(ao, [...e.samlinger ?? []], !0), z(so) && !z(ao).includes(z(so)) && P(so, null), Oo();
		}
	}
	function Ve(e, t) {
		if (!(!_o || !e) && JSON.stringify({
			index: _o.data,
			maler: Object.fromEntries(Object.entries(Z).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			maler: t
		})) {
			_o.replace(e), _o.save();
			for (let e of Object.keys(Z)) e in t || (localStorage.removeItem(`urd-draft-mal-${e}`), delete Z[e]);
			for (let [e, n] of Object.entries(t)) Z[e] || (Z[e] = Yi(`urd-draft-mal-${e}`, () => Q[e] ?? null, S)), Z[e].replace(n), Z[e].save();
			P(yo, [...e.maler ?? []], !0), O(), xo();
		}
	}
	function He(e) {
		!as || !e || JSON.stringify(as.data) !== JSON.stringify(e) && (as.replace(e), as.save(), gs(), Ns());
	}
	function We() {
		Ne.length && (Pe.push(Le()), ze(Ne.pop()), Fe = null, x(Y("status.undone")));
	}
	function Ge() {
		Pe.length && (Ne.push(Le()), ze(Pe.pop()), Fe = null, x(Y("status.redone")));
	}
	function Ke(e) {
		z(Et) && (e.target instanceof Element && e.target.closest(".block-menu") || P(Et, null));
	}
	function Ye(e) {
		if (e.key === "Escape" && z(Et)) {
			P(Et, null);
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
			].includes(t.type)) || !z(A) || z(oe) === "mobile") return;
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
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? Ge() : We());
	}
	async function Xe() {
		P(m, co(await (await fetch("/content/site.json")).json()), !0), Oe = Yi("urd-draft-site", () => z(m), S), (Oe.data.schemaVersion ?? 1) > 3 && (console.warn(`Urd: site-utkastet har schemaVersion ${Oe.data.schemaVersion} (motoren har 3) og forkastes`), Oe.replace(Ue(z(m)))), Oe.replace(co(Oe.data)), Oe.save(), ke(), P(te, {
			snap: !0,
			...z(D).grid
		}, !0), await ii(new URLSearchParams(location.search).get("page") ?? z(D).pages[0].id), await xs(), await Do(), await bo(), await V(), z(ee) && Ir(), z(D).site.setup === !0 && !localStorage.getItem("urd-setup-done") && (P(rt, z(D).site.title, !0), P(it, z(D).theme.tokens.color.accent, !0), P(at, z(D).theme.tokens.color.bg, !0), P(nt, !0));
	}
	let Ze = /* @__PURE__ */ N(null);
	function Qe({ title: e, lines: t = [], okLabel: n = Y("confirm.ok"), cancelLabel: r = Y("confirm.cancel") }) {
		return new Promise((i) => {
			P(Ze, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function $e({ title: e, lines: t = [], value: n = "", placeholder: r = "", okLabel: i = Y("confirm.ok"), cancelLabel: a = Y("confirm.cancel") }) {
		return new Promise((o) => {
			P(Ze, {
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
	function et(e) {
		z(Ze)?.resolve(z(Ze).prompt ? e ? z(Ze).value : null : e), P(Ze, null);
	}
	let tt = !1;
	Cn(() => {
		if (!z(Ze)) return;
		let e = (e) => {
			e.key === "Escape" && (e.stopPropagation(), et(!1));
		};
		return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
	});
	let nt = /* @__PURE__ */ N(!1), rt = /* @__PURE__ */ N(""), it = /* @__PURE__ */ N("#7c5cff"), at = /* @__PURE__ */ N("#0b0e14");
	function ot() {
		localStorage.setItem("urd-setup-done", "1"), P(nt, !1);
	}
	function st() {
		let e = z(rt).trim();
		e && (Ti("setup", () => {
			z(D).site.title = e, z(D).nav.logo = {
				type: "text",
				value: e
			}, z(D).theme.tokens.color.accent = z(it), z(D).theme.tokens.color.bg = z(at), delete z(D).site.setup;
		}), ot(), x(Y("status.setupDone"), "ok"));
	}
	let ct = /* @__PURE__ */ N(null), dt = [
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
	], ft = [
		"rail.thisPage",
		"rail.site",
		"rail.system"
	], pt = Object.fromEntries(dt.flat().map((e) => [e, Y(`panel.${e}`)])), mt = {
		pages: ["hint.pages.drafts"],
		blocks: ["hint.blocks.intro"],
		grid: ["hint.grid.intro", "hint.grid.section"],
		collections: ["hint.collections.intro"],
		plugins: ["hint.plugins.intro"],
		history: ["hint.history.intro"]
	}, ht = [
		["se", "Davvisámegiella"],
		["en-GB", "English (UK)"],
		["nb", "Norsk bokmål"],
		["nn", "Norsk nynorsk"],
		["tr", "Türkçe"]
	], gt = (e) => [...e].sort((e, t) => e[1].localeCompare(t[1]));
	function _t(e, t) {
		let n = [];
		for (let r of e) for (let e of ls[r]?.languages ?? []) e?.[t] === !0 && (typeof e.code != "string" || typeof e.name != "string" || !e.name || ht.some(([t]) => t === e.code) || n.some(([t]) => t === e.code) || n.push([e.code, e.name]));
		return n;
	}
	function vt() {
		let e = gt([...ht, ..._t(z(ps), "admin")]);
		return bt === "auto" || e.some(([e]) => e === bt) ? e : [[bt, bt], ...e];
	}
	let yt = () => _t(z(cs)?.enabled ?? [], "site"), bt = localStorage.getItem("urd-admin-lang") ?? "auto";
	function xt(e) {
		e !== bt && (e === "auto" ? localStorage.removeItem("urd-admin-lang") : localStorage.setItem("urd-admin-lang", e), location.reload());
	}
	function St(e) {
		P(ct, z(ct) === e ? null : e, !0), z(ct) === "history" && Vr(), z(ct) === "update" && !z(Xr) && Qr();
	}
	let A = /* @__PURE__ */ N(null);
	function Ct(e, t) {
		let n = T?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function wt() {
		if (!z(A)) return;
		let { block: e } = Ct(z(A).sectionId, z(A).blockId);
		if (!e) {
			P(A, null);
			return;
		}
		P(A, {
			sectionId: z(A).sectionId,
			blockId: z(A).blockId,
			type: e.type,
			decor: !!e.decor,
			hideMobile: !!e.hideMobile,
			props: JSON.parse(JSON.stringify(e.props)),
			frame: { ...e.frames.desktop },
			animation: e.animation ? JSON.parse(JSON.stringify(e.animation)) : null,
			hover: e.hover ? JSON.parse(JSON.stringify(e.hover)) : null,
			sticky: e.sticky ? JSON.parse(JSON.stringify(e.sticky)) : null
		}, !0);
	}
	function Tt(e) {
		if (P(Et, null), !e.blockId) {
			P(A, null);
			return;
		}
		P(A, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), e.sectionId && P(cn, e.sectionId, !0), wt();
	}
	let Et = /* @__PURE__ */ N(null), Dt = window.matchMedia("(prefers-reduced-motion: reduce)").matches, Ot = [
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
	function kt() {
		let e = T?.data.sections ?? [], t = e.findIndex((e) => e.id === z(A)?.sectionId);
		return [["", Y("opt.sticky.ownSection")], ...e.slice(t + 1).map((e, n) => [e.id, Y("opt.sticky.atSection", { n: t + 2 + n })])];
	}
	function At(e) {
		if (Tt(e), !z(A)) return;
		let t = z(w)?.getBoundingClientRect();
		if (!t) return;
		let n = t.left + z(ge) * e.rect.right + 12;
		n + 300 > window.innerWidth - 8 && (n = Math.max(8, t.left + z(ge) * e.rect.left - 300 - 12));
		let r = window.innerHeight - Math.min(window.innerHeight * .7, 560) - 8, i = Math.min(Math.max(8, t.top + z(ge) * e.rect.top), Math.max(8, r));
		P(Et, {
			left: n,
			top: i
		}, !0);
	}
	function jt(e, t) {
		let { section: n, block: r } = Ct(z(A)?.sectionId, z(A)?.blockId);
		r && (e && Re(e), t(r, n), De(n, "block-edited"), T.save(), O(), E?.sendSection(z(g), n), wt());
	}
	function M(e, t) {
		jt(`edit:${z(A).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function Mt(e, t) {
		jt(`edit:${z(A).blockId}:${e}`, (e) => {
			Object.assign(e.props, t);
		});
	}
	let Nt = an({}), Pt = an({}), Ft = /* @__PURE__ */ N(!1), It = /* @__PURE__ */ N("content"), Lt = (e, t) => (Number.isFinite(t) || (t = e.min ?? 0), e.min != null && (t = Math.max(e.min, t)), e.max != null && (t = Math.min(e.max, t)), t);
	async function Rt(e) {
		let t = z(A).blockId, n = `${t}:${e.key}`, r = (Nt[n] ?? z(A).props[e.key] ?? "").trim();
		Pt[n] = null;
		let i = r.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
		if (!r || i || /^https?:\/\//i.test(r)) {
			Mt(e.key, {
				[e.key]: r,
				lat: i ? Number(i[1]) : null,
				lon: i ? Number(i[2]) : null
			});
			return;
		}
		P(Ft, !0), Pt[n] = {
			text: Y("props.place.searching"),
			err: !1
		};
		try {
			let i = await fetch(`/api/geocode?q=${encodeURIComponent(r)}`), a = await i.json().catch(() => null);
			if (z(A)?.blockId !== t) return;
			i.ok && Number.isFinite(a?.lat) ? (Mt(e.key, {
				[e.key]: r,
				lat: a.lat,
				lon: a.lon
			}), Pt[n] = null) : Pt[n] = {
				text: Vi(a) ?? Y("props.place.notFound"),
				err: !0
			};
		} catch {
			Pt[n] = {
				text: Y("props.place.failed"),
				err: !0
			};
		} finally {
			P(Ft, !1);
		}
	}
	function zt(e, t) {
		Number.isFinite(t) && jt(`edit:frame-${z(A).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function Bt(e) {
		jt(`edit:${z(A).blockId}:boxStyle`, (t) => {
			let n = {
				...t.props.boxStyle ?? {},
				...e
			};
			for (let e of Object.keys(n)) n[e] ?? delete n[e];
			Object.keys(n).length ? t.props.boxStyle = n : delete t.props.boxStyle;
		});
	}
	function Vt(e, t) {
		jt(`edit:${z(A).blockId}:faq${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function Ht() {
		jt("faq-item", (e) => {
			(e.props.items ??= []).push({
				q: Y("seed.faq.newQ"),
				a: Y("seed.faq.answer")
			});
		});
	}
	function Ut(e) {
		jt("faq-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function Wt(e, t) {
		let n = e + t;
		jt("faq-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function Gt(e, t) {
		jt(`edit:${z(A).blockId}:tl${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function Kt() {
		jt("tl-item", (e) => {
			(e.props.items ??= []).push({
				year: "",
				title: Y("seed.tidslinje.newTitle"),
				text: ""
			});
		});
	}
	function qt(e) {
		jt("tl-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function Jt(e, t) {
		let n = e + t;
		jt("tl-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function Yt(e) {
		jt("decor", (t) => {
			t.decor = e;
		});
	}
	function Xt(e, t) {
		jt(`edit:${z(A).blockId}:tabell-form`, (n) => {
			let r = (Array.isArray(n.props.rows) && n.props.rows.length ? n.props.rows : [[""]]).map((e) => Array.isArray(e) ? e.map((e) => String(e ?? "")) : [""]), i = Math.max(1, ...r.map((e) => e.length));
			r = r.map((e) => [...e, ...Array(i - e.length).fill("")]), e > 0 ? r.push(Array(i).fill("")) : e < 0 && r.length > 1 && r.pop(), t > 0 ? r = r.map((e) => [...e, ""]) : t < 0 && i > 1 && (r = r.map((e) => e.slice(0, i - 1))), n.props.rows = r;
		});
	}
	function Zt(e, t) {
		jt(`edit:${z(A).blockId}:deling`, (n) => {
			let r = [
				"facebook",
				"x",
				"linkedin",
				"whatsapp",
				"email",
				"copy"
			], i = new Set(n.props.services ?? []);
			t ? i.add(e) : i.delete(e), n.props.services = r.filter((e) => i.has(e));
		});
	}
	function Qt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		let n = new FileReader();
		n.onload = () => {
			M("src", String(n.result ?? "")), t.size > 4e5 && x(Y("status.audioLarge", { kb: Math.round(t.size / 1024) }), "error");
		}, n.onerror = () => x(Y("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function $t(e) {
		let { section: t, block: n } = Ct(z(A)?.sectionId, z(A)?.blockId);
		n && (Re("hide-mobile"), n.hideMobile = e, T.save(), O(), E?.sendSection(z(g), t), wt());
	}
	async function en(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Jn(t);
			jt(`edit:${z(A).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || va(t.name).replaceAll("-", " ");
			});
		} catch {
			x(Y("status.imageReadError"), "error");
		}
	}
	async function tn(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Jn(t);
			jt(`edit:${z(A).blockId}`, (t) => {
				t.props.image = e.dataUrl;
			});
		} catch {
			x(Y("status.imageReadError"), "error");
		}
	}
	let nn = {
		text: Y("blocks.text"),
		button: Y("blocks.button"),
		image: Y("blocks.image"),
		shape: Y("blocks.shape"),
		video: Y("blocks.video"),
		icon: Y("blocks.icon"),
		galleri: Y("blocks.galleri"),
		faq: Y("blocks.faq"),
		samling: Y("blocks.samling"),
		tidslinje: Y("blocks.tidslinje"),
		sitat: Y("blocks.sitat"),
		statistikk: Y("blocks.statistikk"),
		tabell: Y("blocks.tabell"),
		deling: Y("blocks.deling"),
		nedteller: Y("blocks.nedteller"),
		audio: Y("blocks.audio"),
		produkt: Y("blocks.produkt"),
		handlekurv: Y("blocks.handlekurv"),
		kasse: Y("blocks.kasse")
	}, rn = [
		["line", Y("shape.line")],
		["arrow", Y("shape.arrow")],
		["circle", Y("shape.circle")],
		["rect", Y("shape.rect")],
		["triangle", Y("shape.triangle")]
	], sn = [
		["accent", Y("color.accent")],
		["text", Y("color.text")],
		["surface", Y("color.surface")],
		["bg", Y("color.bg")]
	], cn = /* @__PURE__ */ N(null), ln = /* @__PURE__ */ N(null), un = /* @__PURE__ */ N(""), dn = /* @__PURE__ */ N(an([])), fn = /* @__PURE__ */ N(null), pn = /* @__PURE__ */ N(null), mn = /* @__PURE__ */ N("");
	function hn(e) {
		P(ln, e?.grid ? { ...e.grid } : null, !0), P(un, e?.size?.minHeight ?? "", !0), P(dn, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), P(fn, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0), P(pn, e?.hover ? JSON.parse(JSON.stringify(e.hover)) : null, !0), P(mn, e?.theme ?? "", !0);
	}
	let gn = /* @__PURE__ */ N(null), _n = an({});
	function vn() {
		try {
			let e = ((z(w)?.contentDocument)?.querySelector(`.urd-section[data-section-id="${z(cn)}"]`))?.getBoundingClientRect();
			P(gn, e && e.width ? {
				w: e.width,
				h: e.height
			} : null, !0);
		} catch {
			P(gn, null);
		}
	}
	Cn(() => {
		z(cn), z(dn), requestAnimationFrame(() => requestAnimationFrame(vn));
	}), Cn(() => {
		let e = z(w);
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(() => vn());
		return t.observe(e), () => t.disconnect();
	}), Cn(() => {
		for (let e of z(dn)) {
			let t = e?.props?.src;
			if (e?.type === "image" && t && !_n[t]) {
				let e = new Image();
				e.onload = () => {
					_n[t] = {
						w: e.naturalWidth,
						h: e.naturalHeight
					};
				}, e.src = t;
			}
		}
	});
	function yn(e) {
		Sn("section-theme", (t) => {
			e ? t.theme = e : delete t.theme;
		});
	}
	function bn(e) {
		let t = z(or), n = (e) => e.replaceAll("var(--urd-base-bg)", t.bg).replaceAll("var(--urd-base-surface)", t.surface).replaceAll("var(--urd-base-text)", t.text).replaceAll("var(--urd-base-accent)", t.accent).replaceAll("var(--urd-base-accent-text)", t["accent-text"]), r = Fs(e);
		return {
			bg: r["--urd-color-bg"] ? n(r["--urd-color-bg"]) : t.bg,
			surface: r["--urd-color-surface"] ? n(r["--urd-color-surface"]) : t.surface,
			text: r["--urd-color-text"] ? n(r["--urd-color-text"]) : t.text,
			accent: r["--urd-color-accent"] ? n(r["--urd-color-accent"]) : t.accent
		};
	}
	function xn(e) {
		P(cn, e.sectionId, !0), hn(T?.data.sections.find((t) => t.id === e.sectionId));
	}
	function Sn(e, t) {
		let n = T.data.sections.find((e) => e.id === z(cn));
		n && (Re(e), t(n), T.save(), O(), E?.sendSection(z(g), n), hn(n));
	}
	let wn = /* @__PURE__ */ N("color");
	function Tn(e, t) {
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
	function En(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers.splice(t, 1), e.background.layers.length || delete e.background;
		});
	}
	function Dn(e, t, n) {
		let r = t + n;
		e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers;
			r < 0 || r >= n.length || ([n[t], n[r]] = [n[r], n[t]]);
		});
	}
	function On(e, t, n, r) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e.background.layers[t].props[n] = r;
		});
	}
	function kn(e, t, n, r = "xy") {
		e.preventDefault();
		let i = e.currentTarget;
		i.setPointerCapture?.(e.pointerId);
		let a = (e) => {
			let a = i.getBoundingClientRect();
			if (r.includes("x")) {
				let r = Math.min(1, Math.max(0, (e.clientX - a.left) / a.width));
				On(t, n, "x", Math.round(r * 100) / 100);
			}
			if (r.includes("y")) {
				let r = Math.min(1, Math.max(0, (e.clientY - a.top) / a.height));
				On(t, n, "y", Math.round(r * 100) / 100);
			}
		};
		a(e);
		let o = () => {
			i.removeEventListener("pointermove", a), i.removeEventListener("pointerup", o), i.removeEventListener("pointercancel", o);
		};
		i.addEventListener("pointermove", a), i.addEventListener("pointerup", o), i.addEventListener("pointercancel", o);
	}
	let An = (e) => Math.min(4, Math.max(.1, e));
	function jn(e, t, n, r) {
		On(e, t, "size", An(Math.round((n + r) * 100) / 100));
	}
	function Mn(e, t, n) {
		let r = Number(n);
		Number.isFinite(r) && On(e, t, "size", An(r / 100));
	}
	function Nn(e, t, n, r) {
		let i = _n[n.props.src];
		if (!i?.w || !i?.h || !z(gn)?.w || !z(gn)?.h) return;
		let a = z(gn).h * i.w / (z(gn).w * i.h), o = r === "cover" ? Math.max(1, a) : Math.min(1, a);
		(n.props.fit === "flislegg" || n.props.fit === "repeat") && On(e, t, "fit", "vanlig"), On(e, t, "size", An(Math.round(o * 100) / 100));
	}
	function Pn(e) {
		return e.props;
	}
	function Fn(e, t, n, r) {
		e.mutate(n, (e) => {
			r(e.background.layers[t].props);
		});
	}
	function In(e, t, n, r) {
		Fn(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e[n] = r;
		});
	}
	let Ln = {
		linear: [
			["none", Y("common.none")],
			["pan", Y("opt.gradAnim.pan")],
			["pan-loop", Y("opt.gradAnim.panLoop")],
			["rotate", Y("opt.gradAnim.rotate")]
		],
		radial: [
			["none", Y("common.none")],
			["pulse", Y("opt.gradAnim.pulse")],
			["orbit", Y("opt.gradAnim.orbit")]
		]
	};
	function Rn(e, t, n) {
		Fn(e, t, e.keyPrefix, (e) => {
			e.kind = n, Ln[n].some(([t]) => t === (e.animation ?? "none")) || (e.animation = "none");
		});
	}
	function zn(e, t, n, r) {
		Fn(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-stop${n}`, (e) => {
			e.stops[n] = {
				...e.stops[n],
				...r
			};
		});
	}
	function Bn(e, t) {
		Fn(e, t, e.keyPrefix, (e) => {
			let t = Math.round(e.stops.reduce((e, t) => e + (Number(t.share) || 0), 0) / e.stops.length) || 50;
			e.stops.push({
				color: e.stops[e.stops.length - 1]?.color ?? "#ffffff",
				share: t
			});
		});
	}
	function Vn(e, t, n) {
		Fn(e, t, e.keyPrefix, (e) => {
			e.stops.length > 2 && e.stops.splice(n, 1);
		});
	}
	function Hn(e, t, n, r) {
		Fn(e, t, e.keyPrefix, (e) => {
			let [t] = e.stops.splice(n, 1);
			e.stops.splice(r, 0, t);
		});
	}
	let Un = /* @__PURE__ */ N(null);
	function Wn(e, t, n, r) {
		if (t.button !== 0) return;
		t.preventDefault();
		let i = t.currentTarget.closest(".bg-layer"), a = t.currentTarget.closest(".grad-stop");
		P(Un, {
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
			P(Un, {
				...z(Un),
				insert: n
			}, !0);
		}, u = () => {
			window.removeEventListener("pointermove", l), window.removeEventListener("pointerup", u), c.remove();
			let t = z(Un);
			if (P(Un, null), !t) return;
			let n = t.insert > t.from ? t.insert - 1 : t.insert;
			n !== t.from && Hn(e, t.layer, t.from, n);
		};
		window.addEventListener("pointermove", l), window.addEventListener("pointerup", u);
	}
	function Gn(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].type !== n && (e.background.layers[t] = {
				type: n,
				version: s[n].version ?? 1,
				props: s[n].defaults()
			});
		});
	}
	async function Kn(e, t) {
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
	async function qn(e) {
		let t = await e.text(), n = ma(t), r = ga(t);
		if (!r) return n;
		let i = await Kn(n.dataUrl, r);
		if (!i) return n;
		let a = ha(t, i);
		if (a === t) return n;
		try {
			return ma(a);
		} catch {
			return n;
		}
	}
	async function Jn(e) {
		return e.type === "image/svg+xml" || /\.svg$/i.test(e.name || "") ? qn(e) : da(e);
	}
	async function Yn(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			On(e, t, "src", (await Jn(r)).dataUrl);
		} catch {
			x(Y("status.imageReadError"), "error");
		}
	}
	async function Xn(e, t, n) {
		let r = [...n.target.files ?? []];
		if (n.target.value = "", !r.length) return;
		x(Y("status.compressingImages"));
		let { images: i, failed: a, big: o } = await up(r);
		i.length && e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers[t].props;
			n.images ??= [], n.images.push(...i.map(({ src: e }) => ({
				src: e,
				x: .5,
				y: .5
			})));
		}), dp(i.length, a, o);
	}
	function Zn(e, t, n, r) {
		e.mutate(e.keyPrefix, (e) => {
			let i = e.background.layers[t].props.images, a = n + r;
			a < 0 || a >= i.length || ([i[n], i[a]] = [i[a], i[n]]);
		});
	}
	function Qn(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].props.images.splice(n, 1);
		});
	}
	function $n(e, t, n, r, i) {
		e.mutate(`edit:${e.keyPrefix}g-${e.keyId}-${t}-${n}-${r}`, (e) => {
			e.background.layers[t].props.images[n][r] = i;
		});
	}
	function er(e, t) {
		Ti(e, () => {
			z(D).nav.style ??= {}, t(z(D).nav.style);
		});
	}
	let tr = /* @__PURE__ */ j(() => ({
		mutate: Sn,
		keyPrefix: "bg",
		keyId: z(cn)
	})), nr = {
		mutate: er,
		keyPrefix: "navbg",
		keyId: "nav"
	}, rr = {
		mutate: Hs,
		keyPrefix: "footerbg",
		keyId: "footer"
	}, ir = () => {
		let e = null;
		try {
			e = localStorage.getItem("urd-theme-mode");
		} catch {}
		return Ds(z(D)?.theme?.scheme, e, window.matchMedia("(prefers-color-scheme: dark)").matches);
	}, ar = /* @__PURE__ */ N("light");
	Cn(() => {
		P(ar, ir(), !0);
		let e = window.matchMedia("(prefers-color-scheme: dark)"), t = (e) => {
			e instanceof StorageEvent && e.key && e.key !== "urd-theme-mode" || P(ar, ir(), !0);
		};
		return e.addEventListener("change", t), window.addEventListener("storage", t), () => {
			e.removeEventListener("change", t), window.removeEventListener("storage", t);
		};
	});
	let or = /* @__PURE__ */ j(() => z(D)?.theme ? Os(z(D).theme, z(ar)).color ?? {} : {}), sr = () => Object.entries(z(or)), cr = [
		[
			"bg",
			Y("palette.bg"),
			Y("palette.bgShort")
		],
		[
			"surface",
			Y("palette.surface"),
			Y("palette.surfaceShort")
		],
		[
			"text",
			Y("palette.text"),
			Y("palette.textShort")
		],
		[
			"accent",
			Y("palette.accent"),
			Y("palette.accentShort")
		],
		[
			"accent-text",
			Y("palette.accentText"),
			Y("palette.accentTextShort")
		]
	], lr = /* @__PURE__ */ j(() => !!z(D)?.theme.alt), ur = /* @__PURE__ */ j(() => z(D)?.theme.alt?.auto === !0), dr = /* @__PURE__ */ j(() => z(D)?.theme.scheme === "dark" ? "dark" : "light"), fr = /* @__PURE__ */ j(() => z(D)?.theme.tokens.color ?? {}), pr = /* @__PURE__ */ j(() => ({
		...z(D)?.theme.tokens.color ?? {},
		...z(D)?.theme.alt?.tokens?.color ?? {}
	}));
	function mr(e) {
		return {
			type: e,
			version: Mc[e].version,
			props: Mc[e].defaults()
		};
	}
	let hr = (e) => !!(e && Mc[e.type]?.entrance), gr = [["", Y("common.none")], ...Object.entries(Mc).filter(([, e]) => e.entrance).map(([e, t]) => [e, t.labelKey ? Y(t.labelKey) : t.label])], _r = gr.filter(([e]) => !Mc[e]?.group), vr = [["", Y("common.none")], ...Object.entries(Mc).filter(([, e]) => !e.entrance).map(([e, t]) => [e, t.labelKey ? Y(t.labelKey) : t.label])];
	function yr(e) {
		e.animation && !hr(e.animation) && (e.hover ??= e.animation, e.animation = null);
	}
	function br(e) {
		jt(`edit:anim-${z(A).blockId}`, (t) => {
			yr(t), t.animation = e ? mr(e) : null;
		}), z(A) && E?.sendDemoAnim(z(A).sectionId, z(A).blockId);
	}
	function xr(e) {
		jt(`edit:hover-${z(A).blockId}`, (t) => {
			yr(t), t.hover = e ? mr(e) : null;
		});
	}
	function Sr(e, t) {
		Number.isFinite(t) && (jt(`edit:anim-${z(A).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), z(A) && E?.sendDemoAnim(z(A).sectionId, z(A).blockId));
	}
	function wr(e) {
		Sn("section-anim", (t) => {
			yr(t), t.animation = e ? mr(e) : null;
		}), E?.sendDemoAnim(z(cn));
	}
	function Er(e) {
		Sn("section-hover", (t) => {
			yr(t), t.hover = e ? mr(e) : null;
		});
	}
	function Dr(e, t) {
		Number.isFinite(t) && (Sn("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), E?.sendDemoAnim(z(cn)));
	}
	function Or(e, t) {
		Sn("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), E?.sendDemoAnim(z(cn));
	}
	function kr(e) {
		let t = T.data.sections.find((e) => e.id === z(cn));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		Re("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, P(un, r, !0), T.save(), O(), E?.sendSection(z(g), t);
	}
	function Ar() {
		return T.data.sections.find((e) => e.id === z(cn)) ?? T.data.sections[0];
	}
	function jr(e) {
		let t = T.data.sections.find((e) => e.id === z(cn));
		t && (Re("grid:section"), t.grid = e ? { ...Oe.data.grid } : null, P(ln, t.grid ? { ...t.grid } : null, !0), T.save(), O(), E?.sendSection(z(g), t), z(xi) && E?.sendShowGrid(!0));
	}
	function Mr(e, t) {
		let n = T.data.sections.find((e) => e.id === z(cn));
		n?.grid && (Re("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, P(ln, { ...n.grid }, !0), T.save(), O(), E?.sendSection(z(g), n), z(xi) && E?.sendShowGrid(!0));
	}
	function Nr(e, t) {
		Re("grid:site"), P(te, {
			...z(te),
			[e]: t
		}, !0), Oe.data.grid = {
			...Oe.data.grid,
			[e]: t
		}, Oe.save(), O(), Ae(), z(xi) && E?.sendShowGrid(!0);
	}
	async function V() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? P(ee, await e.json(), !0) : e.status !== 503 && P(ee, null);
		} catch {
			P(ee, null);
		}
	}
	let Pr = null;
	async function Ir() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (Pr = (await e.json()).head ?? null);
		} catch {}
	}
	async function Lr(e) {
		if (!Pr) return await Ir(), {
			ok: await Qe({
				title: Y("confirm.conflictUnknown.title"),
				lines: [Y("confirm.conflictUnknown.body"), Y("confirm.conflictUnknown.warning")],
				okLabel: Y("confirm.publishAnyway"),
				cancelLabel: Y("confirm.cancel")
			}),
			head: Pr
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${Pr}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === Pr) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? [Y("confirm.conflict.truncated")] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await Qe({
				title: Y("confirm.conflict.title"),
				lines: [
					Y("confirm.conflict.intro"),
					...i.map((e) => `• ${e}`),
					Y("confirm.conflict.warning")
				],
				okLabel: Y("confirm.publishAnyway"),
				cancelLabel: Y("confirm.cancel")
			}),
			head: n
		};
	}
	let Rr = /* @__PURE__ */ N(null), zr = /* @__PURE__ */ N(""), Br = /* @__PURE__ */ N(!1);
	async function Vr() {
		P(zr, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? P(Rr, (await e.json()).commits, !0) : e.status === 401 ? (P(Rr, [], !0), P(zr, Y("status.historyLoginRequired"), !0)) : (P(Rr, [], !0), P(zr, Vi(await e.json().catch(() => null)) ?? Y("status.historyFetchFailed"), !0));
		} catch {
			P(Rr, [], !0), P(zr, Y("status.historyUnavailable"), !0);
		}
	}
	let Ur = (() => {
		let e = {
			dateStyle: "short",
			timeStyle: "short"
		};
		try {
			return new Intl.DateTimeFormat(Hi(), e);
		} catch {
			return new Intl.DateTimeFormat(void 0, e);
		}
	})(), Wr = !1;
	async function Gr() {
		let e = z(Rr)?.[0];
		if (!(!e || z(Br)) && await Qe({
			title: Y("confirm.revert.title"),
			lines: [`«${e.message}»`, Y("confirm.revert.body")],
			okLabel: Y("confirm.revert.ok"),
			cancelLabel: Y("confirm.cancel")
		})) {
			P(Br, !0), x(Y("status.reverting"));
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? Pr = e : Ir(), Wr = !0, x(Y("status.revertDone"), "ok"), qr();
				} else t.status === 409 ? x(Y("status.revertConflict"), "error") : x(Vi(await t.json().catch(() => null)) ?? Y("status.revertFailed"), "error");
			} catch {
				x(Y("status.publishLayerUnreachable"), "error");
			}
			P(Br, !1), Vr();
		}
	}
	async function qr() {
		let e = ["/content/site.json", ...z(D).pages.map((e) => `/${e.file}`)], t = async () => {
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
				x(Y("status.revertDeployed"), "ok");
				for (let e of Object.keys(localStorage).filter((e) => e.startsWith("urd-draft-"))) localStorage.removeItem(e);
				await new Promise((e) => setTimeout(e, 800)), location.reload();
				return;
			}
		}
		x(Y("status.revertDeployTimeout"), "error");
	}
	let Jr = /* @__PURE__ */ N(null), Yr = /* @__PURE__ */ N(null), Xr = /* @__PURE__ */ N(!1), Zr = /* @__PURE__ */ N(an(/* @__PURE__ */ new Set()));
	async function Qr() {
		P(Xr, !0), P(Yr, null), P(Jr, null);
		try {
			let e = await fetch("/api/github/update"), t = await e.json().catch(() => null);
			e.ok ? (P(Jr, t, !0), P(Zr, /* @__PURE__ */ new Set(), !0)) : P(Yr, Vi(t) ?? Y("update.checkFailed"), !0);
		} catch {
			P(Yr, Y("status.publishLayerUnreachable"), !0);
		}
		P(Xr, !1);
	}
	function $r(e) {
		let t = new Set(z(Zr));
		t.has(e) ? t.delete(e) : t.add(e), P(Zr, t, !0);
	}
	async function ei() {
		if (!z(Jr) || z(Jr).upToDate || z(Xr)) return;
		let e = [...z(Zr)], t = z(Jr).changes.filter((e) => !z(Zr).has(e.path)), n = t.filter((e) => e.atom && e.conflict);
		if (await Qe({
			title: Y("confirm.update.title"),
			lines: [Y("confirm.update.body", {
				target: z(Jr).target,
				writes: t.filter((e) => e.action === "write").length,
				deletes: t.filter((e) => e.action === "delete").length
			}), ...n.length > 0 ? [Y("confirm.update.warnEdited", { paths: n.map((e) => e.path).join(", ") })] : []],
			okLabel: Y("confirm.update.ok"),
			cancelLabel: Y("confirm.cancel")
		})) {
			P(Xr, !0), x(Y("update.running", { target: z(Jr).target }));
			try {
				let t = await fetch("/api/github/update", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						to: z(Jr).target,
						expect: z(Jr).head,
						skip: e
					})
				}), n = await t.json().catch(() => null);
				t.ok ? (x(Y("update.committed", { target: z(Jr).target }), "ok"), await ti(z(Jr).target.replace(/^v/, ""))) : t.status === 409 ? (x(Vi(n) ?? Y("update.checkFailed"), "error"), await Qr()) : x(Vi(n) ?? Y("update.failed"), "error");
			} catch {
				x(Y("status.publishLayerUnreachable"), "error");
			}
			P(Xr, !1);
		}
	}
	async function ti(e) {
		for (let t = 0; t < 18; t++) {
			await new Promise((e) => setTimeout(e, 1e4));
			try {
				if ((await (await fetch("/urd.json", { cache: "no-store" })).json())?.engine === e) {
					x(Y("update.deployed"), "ok"), await new Promise((e) => setTimeout(e, 800)), location.reload();
					return;
				}
			} catch {}
		}
		x(Y("update.deployTimeout"), "error");
	}
	let ni = null;
	function ri(e) {
		return {
			schemaVersion: 2,
			meta: {
				id: e.id,
				title: e.title
			},
			sections: [{
				id: go("sec"),
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
	async function ii(e, { keepHistory: t = !1 } = {}) {
		P(g, e, !0), ni = (async () => {
			let n = Me(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = lo(await e.json(), Oe.data));
			} catch {}
			r ? je.delete(e) : r = ri(n), T = Yi(`urd-draft-${e}`, () => r, S), (T.data.schemaVersion ?? 1) > 2 && (console.warn(`Urd: utkastet for '${e}' har schemaVersion ${T.data.schemaVersion} (motoren har 2) og forkastes`), T.replace(structuredClone(r))), T.replace(lo(T.data, Oe.data)), T.save(), t || (Fe = null), P(cn, null), P(ln, null), O(), Ri(), Ce(), P(v, "");
		})(), await ni;
	}
	function ai() {
		E?.destroy(), z(w)?.contentDocument?.addEventListener("pointerdown", () => {
			z(Et) && P(Et, null);
		}, !0), E = Ba(z(w), {
			onEdit: Rf,
			onMove: zf,
			onGrow: Bf,
			onDelete: Xf,
			onAddSection: Gf,
			onMoveSection: Kf,
			onDeleteSection: qf,
			onSectionSize: Jf,
			onUndo: (e) => e.redo ? Ge() : We(),
			onSelectSection: xn,
			onSelectBlock: Tt,
			onBlockMenu: At,
			onReady: si,
			onNavigate: Ci,
			onAddBlock: (e) => ep(e.sectionId, e.block),
			onAddBlocks: (e) => tp(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: cp,
			onMoveBlockSection: Yf,
			onMobileReset: Vf,
			onMobileOrder: Hf,
			onReviewDone: Uf,
			onBlockFlag: Wf,
			onCollectionEdit: No,
			onCollectionAdd: jo,
			onSaveTemplate: So,
			onStickyGroup: wo,
			onStickyDock: Co,
			onDeleteTemplate: Eo,
			onApplyLayout: Te,
			onPluginBlocks: (e) => {
				P(rp, e.blocks ?? [], !0);
			},
			onNavWidth: (e) => Ti("edit:nav-width", () => {
				z(D).nav.style ??= {}, z(D).nav.style.width = e.width;
			})
		});
	}
	async function si() {
		await ni, await ss, E?.sendPlugins(Ue(z(cs))?.enabled ?? []), E?.sendViewport(z(oe)), E?.sendZoom(z(ge)), ko(), xo(), Oe.hasDraft() && Ae();
		let e = !z(m).pages.some((e) => e.id === z(g));
		(T.hasDraft() || e) && E?.sendPage(z(g), T.data), z(ne) || E?.sendChrome(!1), z(xi) && E?.sendShowGrid(!0), z(ci) && E?.sendShowGuides(!0), d();
	}
	let ci = /* @__PURE__ */ N(localStorage.getItem("urd-guides") === "1"), li = /* @__PURE__ */ N(!1), ui = /* @__PURE__ */ N(an(localStorage.getItem("urd-layout-picker") === "menu" ? "menu" : "strip"));
	function di(e) {
		P(ui, e === "menu" ? "menu" : "strip", !0), z(ui) === "menu" ? localStorage.setItem("urd-layout-picker", "menu") : localStorage.removeItem("urd-layout-picker");
	}
	let fi = /* @__PURE__ */ N(null);
	Cn(() => {
		if (!z(li)) return;
		let e = (e) => {
			z(fi)?.contains(e.target) || P(li, !1);
		}, t = (e) => {
			e.key === "Escape" && P(li, !1);
		}, n = () => {
			P(li, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let mi = {
		view: 1079,
		device: 999,
		zoom: 919
	}, gi = /* @__PURE__ */ N(null), _i = /* @__PURE__ */ N(null), vi = an({
		view: !1,
		device: !1,
		zoom: !1
	});
	Cn(() => {
		let e = Object.entries(mi).map(([e, t]) => {
			let n = window.matchMedia(`(max-width: ${t}px)`), r = () => {
				vi[e] = n.matches;
			};
			return r(), n.addEventListener("change", r), () => n.removeEventListener("change", r);
		});
		return () => e.forEach((e) => e());
	}), Cn(() => {
		z(gi) && !vi[z(gi)] && P(gi, null);
	}), Cn(() => {
		if (!z(gi)) return;
		let e = (e) => {
			z(_i)?.contains(e.target) || P(gi, null);
		}, t = (e) => {
			e.key === "Escape" && P(gi, null);
		}, n = () => {
			P(gi, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	function yi() {
		P(ci, !z(ci)), localStorage.setItem("urd-guides", z(ci) ? "1" : "0"), E?.sendShowGuides(z(ci));
	}
	let xi = /* @__PURE__ */ N(localStorage.getItem("urd-grid-overlay") === "1");
	function Si() {
		P(xi, !z(xi)), localStorage.setItem("urd-grid-overlay", z(xi) ? "1" : "0"), E?.sendShowGrid(z(xi));
	}
	function Ci(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = z(D).pages.find((e) => e.path === t);
		n && n.id !== z(g) && ii(n.id);
	}
	function Ti(e, t) {
		Re(e), t(), Oe.save(), O(), Ae();
	}
	let Ei = /* @__PURE__ */ N(""), Di = /* @__PURE__ */ N(null), ki = Object.fromEntries(Ss.map((e) => [e.id, bs(Cs(e.id, {
		pageId: "forhandsvisning",
		title: ""
	}))])), Ai = /* @__PURE__ */ j(() => {
		let e = z(D)?.theme?.tokens?.color ?? {};
		return [
			"bg",
			"surface",
			"text",
			"accent"
		].filter((t) => typeof e[t] == "string" && As(e[t])).map((t) => `--urd-color-${t}: ${e[t]};`).join(" ");
	}), ji = /* @__PURE__ */ N(null);
	Cn(() => {
		if (!z(ji)) return;
		let e = (e) => {
			e.target.closest?.(".page-menu-wrap") || P(ji, null);
		}, t = (e) => {
			e.key === "Escape" && P(ji, null);
		}, n = () => {
			P(ji, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let Mi = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions",
		"readme"
	];
	function Ni(e, t = null) {
		return e ? Mi.includes(e) ? Y("error.reservedName", { slug: e }) : z(D).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? Y("error.pageExists") : null : Y("error.pageNeedsName");
	}
	function Pi() {
		let e = z(Ei).trim(), t = va(e), n = Ni(t);
		if (n) {
			x(n, "error");
			return;
		}
		let r = z(Di) && !z(Di).startsWith("preset:") ? Z[z(Di)]?.data?.page : null, i = z(Di)?.startsWith("preset:") ? Cs(z(Di).slice(7), {
			pageId: t,
			title: e
		}) ?? ri({
			id: t,
			title: e
		}) : r ? Ho(lo(JSON.parse(JSON.stringify(r)), Oe.data), go, {
			id: t,
			title: e
		}) : ri({
			id: t,
			title: e
		});
		Ti("pages", () => {
			z(D).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), z(D).nav.items.push({
				label: e,
				page: t
			});
		}), C(`urd-draft-${t}`, JSON.stringify(i)), O(), P(Ei, ""), P(Di, null), ii(t);
	}
	async function Fi(e) {
		P(ji, null), await To("page", e.id === z(g) ? JSON.parse(JSON.stringify(T.data)) : await Ki(e));
	}
	function Ii(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		Ti("pages", () => {
			e.title = n;
			for (let t of z(D).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === z(g) ? (T.data.meta.title = n, T.save(), O(), E?.sendPage(z(g), T.data)) : qi(e, (e) => {
			e.meta.title = n;
		});
	}
	let Li = /* @__PURE__ */ N(an({
		description: "",
		ogTitle: "",
		ogDescription: "",
		ogImage: ""
	}));
	function Ri() {
		let e = T?.data?.meta ?? {};
		P(Li, {
			description: e.description ?? "",
			ogTitle: e.og?.title ?? "",
			ogDescription: e.og?.description ?? "",
			ogImage: e.og?.image ?? ""
		}, !0);
	}
	function zi(e, t) {
		let n = String(t ?? "").trim();
		if (e === "description") n ? T.data.meta.description = n : delete T.data.meta.description;
		else {
			let t = {
				ogTitle: "title",
				ogDescription: "description",
				ogImage: "image"
			}[e], r = { ...T.data.meta.og ?? {} };
			n ? r[t] = n : delete r[t], Object.keys(r).length ? T.data.meta.og = r : delete T.data.meta.og;
		}
		T.save(), O(), Ri();
		let r = z(D).pages.find((e) => e.id === z(g));
		z(Ui)[z(g)] = !r?.noindex && !T.data.meta.description;
	}
	function Bi(e) {
		let t = z(D).pages.find((e) => e.id === z(g));
		t && (Ti("edit:page-noindex", () => {
			e ? t.noindex = !0 : delete t.noindex;
		}), z(Ui)[z(g)] = !e && !T?.data?.meta?.description);
	}
	let Ui = /* @__PURE__ */ N(an({}));
	async function Wi() {
		let e = {};
		for (let t of z(D).pages) {
			if (t.noindex) continue;
			if (t.id === z(g)) {
				e[t.id] = !T?.data?.meta?.description;
				continue;
			}
			let n = await Ki(t);
			e[t.id] = !n?.meta?.description;
		}
		P(Ui, e, !0);
	}
	Cn(() => {
		z(ct) === "pages" && z(g) && Wi();
	});
	async function Gi(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			zi("ogImage", (await Jn(t)).dataUrl);
		} catch {
			x(Y("status.imageReadError"), "error");
		}
	}
	async function Ki(e) {
		let t = localStorage.getItem(`urd-draft-${e.id}`);
		if (t) try {
			return JSON.parse(t);
		} catch {}
		try {
			let t = await fetch(`/${e.file}`);
			if (t.ok) return lo(await t.json(), Oe.data);
		} catch {}
		return ri(e);
	}
	async function qi(e, t) {
		let n = await Ki(e);
		t(n), C(`urd-draft-${e.id}`, JSON.stringify(n)), O();
	}
	function Xi(e, t) {
		let n = va(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = Ni(n, e.id);
		if (r) {
			x(r, "error");
			return;
		}
		Ti("pages", () => {
			e.path = `/${n}`;
		});
	}
	function Zi(e) {
		e.path !== "/" && (Ti("pages", () => {
			z(D).pages = z(D).pages.filter((t) => t.id !== e.id), z(D).nav.items = z(D).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of z(D).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			z(D).nav.items = z(D).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === z(g) && ii(z(D).pages[0].id), x(Y("status.pageRemoved")));
	}
	function Qi(e) {
		Ti("edit:nav-logo", () => {
			z(D).nav.logo = {
				type: "text",
				value: "",
				...z(D).nav.logo,
				...e
			};
		});
	}
	function $i(e) {
		Ti("nav", () => {
			z(D).nav.logo ??= {
				type: "text",
				value: z(D).site.title
			};
			let t = z(D).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = z(D).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = z(D).site.title), delete t.image), t.type = e;
		});
	}
	async function ea(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Jn(t);
			Ti("nav", () => {
				let t = z(D).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			x(Y("status.imageReadErrorSvg"), "error");
		}
	}
	let ta = /* @__PURE__ */ N(null);
	async function na(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		if (t.type === "image/svg+xml" || /\.svg$/i.test(t.name || "")) {
			try {
				let e = await qn(t);
				P(ta, e.dataUrl, !0);
			} catch {
				x(Y("status.imageReadErrorSvg"), "error");
			}
			return;
		}
		let n = new FileReader();
		n.onload = () => {
			P(ta, String(n.result), !0);
		}, n.onerror = () => x(Y("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function ra(e) {
		Ti("edit:site-icon", () => {
			z(D).site.icon = e;
		}), P(ta, null);
	}
	function ia() {
		Ti("edit:site-icon", () => {
			delete z(D).site.icon;
		});
	}
	function aa(e) {
		Ti("edit:site-title", () => {
			z(D).site.title = e;
		});
	}
	function oa(e) {
		Ti("edit:site-desc", () => {
			z(D).site.description = e;
		});
	}
	let ca = /* @__PURE__ */ j(() => z(D)?.layout?.contentWidth ?? 1440), la = /* @__PURE__ */ j(() => z(D)?.layout?.gutter ?? 6), ua = /* @__PURE__ */ j(() => Za(z(ca))), fa = /* @__PURE__ */ j(() => Wa.find((e) => e.gutter === z(la))?.id ?? null), pa = /* @__PURE__ */ N(!1), ba = /* @__PURE__ */ j(() => z(ca) === "full" ? Ua : qa(z(ca))), xa = /* @__PURE__ */ j(() => Ka.map((e) => ({
		screen: e,
		...Xa(z(ca), z(la), e)
	})));
	function Sa(e, t) {
		Ti(t, () => {
			z(D).layout = {
				contentWidth: z(ca),
				gutter: z(la),
				...e
			};
		});
	}
	let Ca = (e) => Sa({ contentWidth: e === "full" ? "full" : qa(e) }, "edit:site-width"), wa = (e) => Sa({ gutter: Ja(e) }, "edit:site-gutter");
	function Ta() {
		let e = z(D).site.lang ?? "no";
		return e === "no" ? "nb" : e;
	}
	function Ea() {
		let e = Ta(), t = gt([...ht, ...yt()]);
		return [...t.some(([t]) => t === e) ? [] : [[e, e]], ...t];
	}
	function Aa(e) {
		Ti("site", () => {
			z(D).site.lang = e;
		});
	}
	let ja = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	Cn(() => {
		if (!z(D)?.site) return;
		let e = z(D).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 49.6V14.4l25.6 10.4V49.6' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
				return;
			}
			ja.test(e) && (t.href = e);
		}
	});
	function Ma(e) {
		Ti("nav", () => {
			z(D).nav.layout = e;
		});
	}
	function Na(e, t) {
		Ti(`edit:nav-style-${e}`, () => {
			z(D).nav.style ??= {}, t === void 0 ? delete z(D).nav.style[e] : z(D).nav.style[e] = t;
		});
	}
	let Pa = /* @__PURE__ */ j(() => z(D)?.nav?.variant === "side-left" || z(D)?.nav?.variant === "side-right"), Fa = /* @__PURE__ */ j(() => [
		"floating",
		"floating-square",
		"floating-tab"
	].includes(z(D)?.nav?.variant)), Ia = {
		underline: [Y("hoverColor.underline.label"), Y("hoverColor.underline.title")],
		pill: [Y("hoverColor.pill.label"), Y("hoverColor.pill.title")],
		lift: [Y("hoverColor.lift.label"), Y("hoverColor.lift.title")]
	}, La = /* @__PURE__ */ j(() => Ia[z(D)?.nav?.style?.hover] ?? null);
	function Ra(e) {
		Ti("nav", () => {
			e === "bar" ? delete z(D).nav.variant : z(D).nav.variant = e;
		});
	}
	function Va(e) {
		Ti("nav", () => {
			z(D).nav.style ??= {}, e ? z(D).nav.style.glow = !0 : delete z(D).nav.style.glow;
		});
	}
	function Qa(e) {
		Ti("nav", () => {
			z(D).nav.style ??= {}, e ? delete z(D).nav.style.topGap : z(D).nav.style.topGap = !1;
		});
	}
	function $a(e) {
		Ti("nav", () => {
			z(D).nav.style ??= {}, e === "standard" ? delete z(D).nav.style.hover : z(D).nav.style.hover = e;
		});
	}
	let eo = null, to = {}, ro = {}, io = !1, ao = /* @__PURE__ */ N(an([])), oo = /* @__PURE__ */ N(an({})), so = /* @__PURE__ */ N(null), uo = /* @__PURE__ */ N(""), fo = /* @__PURE__ */ N("news"), mo = [
		["news", Y("collectionKind.news")],
		["notices", Y("collectionKind.notices")],
		["publications", Y("collectionKind.publications")],
		["products", Y("collectionKind.products")],
		["custom", Y("collectionKind.custom")]
	], _o = null, Z = {}, Q = {}, vo = !1, yo = /* @__PURE__ */ N(an([]));
	async function bo() {
		let e = {
			version: 1,
			maler: []
		};
		try {
			e = await (await fetch("/content/maler.json")).json();
		} catch {}
		_o = Yi("urd-draft-maler", () => e, S), P(yo, [..._o.data.maler ?? []], !0);
		for (let e of z(yo)) {
			let t = null;
			try {
				t = await (await fetch(`/content/maler/${e}.json`)).json();
			} catch {}
			Q[e] = t, Z[e] = Yi(`urd-draft-mal-${e}`, () => t, S), (Z[e].data?.schemaVersion ?? 1) > 1 && Z[e].reset();
		}
		vo = !0, xo();
	}
	function xo() {
		let e = z(yo).map((e) => Z[e]?.data ? {
			id: e,
			...JSON.parse(JSON.stringify(Z[e].data))
		} : null).filter(Boolean).map(({ id: e, mal: t, section: n, blocks: r, page: i }) => ({
			id: e,
			name: t.name,
			kind: t.kind,
			section: n,
			blocks: r,
			page: i
		}));
		E?.sendMaler(e);
	}
	function So(e) {
		let t = Bo.includes(e.kind) ? e.kind : "section";
		return To(t, e[t]);
	}
	function Co(e) {
		let { section: t, block: n } = Ct(e.sectionId, e.blockId);
		!t || !n?.sticky || Ot.some(([t]) => t === e.dock) && (Re(`sticky-dock:${e.blockId}`), n.sticky = {
			...n.sticky,
			dock: e.dock
		}, T.save(), O(), E?.sendSection(z(g), t), wt());
	}
	function wo(e) {
		let t = e.blockIds ?? [], { section: n } = Ct(e.sectionId, t[0]);
		if (!n || !t.length) return;
		Re(`sticky-group:${e.sectionId}`);
		let r = e.on ? go("stk") : null;
		for (let e of n.blocks) t.includes(e.id) && (e.sticky = r ? {
			offset: 16,
			until: null,
			...e.sticky,
			group: r
		} : null);
		De(n, "block-edited"), T.save(), O(), E?.sendSection(z(g), n), wt(), x(Y(e.on ? "status.stickyGrouped" : "status.stickyUngrouped"));
	}
	async function To(e, t) {
		if (!t || !_o) return;
		let n = (await $e({
			title: Y("canvas.templateNamePrompt"),
			placeholder: Y("ph.templateName")
		}))?.trim();
		if (!n) return;
		let r = Vo(n);
		if (!r) {
			x(Y("status.invalidName"), "error");
			return;
		}
		if (z(yo).includes(r)) {
			x(Y("status.templateExists"), "error");
			return;
		}
		Re("maler");
		let i = {
			schemaVersion: 1,
			mal: {
				name: n,
				kind: e
			},
			[e]: t
		};
		Z[r] = Yi(`urd-draft-mal-${r}`, () => null, S), Z[r].replace(i), Z[r].save(), _o.data.maler = [...z(yo), r], _o.save(), P(yo, [...z(yo), r], !0), x(Y("status.templateSaved", { name: n }), "ok"), O(), xo();
	}
	async function Eo(e) {
		let t = Z[e.id]?.data?.mal;
		t && await Qe({ title: Y("confirm.deleteTemplate", { name: t.name }) }) && (Re("maler"), z(Di) === e.id && P(Di, null), localStorage.removeItem(`urd-draft-mal-${e.id}`), delete Z[e.id], _o.data.maler = z(yo).filter((t) => t !== e.id), _o.save(), P(yo, z(yo).filter((t) => t !== e.id), !0), O(), xo());
	}
	async function Do() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/samlinger.json")).json();
		} catch {}
		eo = Yi("urd-draft-samlinger", () => e, S), P(ao, [...eo.data.samlinger ?? []], !0);
		for (let e of z(ao)) {
			let t = null;
			try {
				t = await (await fetch(`/content/samlinger/${e}.json`)).json();
			} catch {}
			ro[e] = t, to[e] = Yi(`urd-draft-samling-${e}`, () => t, S), !t && !to[e].data && (to[e].replace({
				schemaVersion: 1,
				id: e,
				name: e,
				kind: "custom",
				entries: []
			}), to[e].save());
		}
		io = !0, Oo();
	}
	function Oo(e = !0) {
		let t = {};
		for (let e of z(ao)) to[e] && (t[e] = JSON.parse(JSON.stringify(to[e].data)));
		P(oo, t, !0), e && ko();
	}
	function ko() {
		E?.sendCollections(Ue(z(oo)) ?? {});
	}
	function Ao(e, t, n, r = !0) {
		let i = to[e];
		i && (Re(t), n(i.data), i.save(), O(), Oo(r));
	}
	function jo(e) {
		to[e.collection] && Ro(e.collection);
	}
	function Mo(e) {
		return (new DOMParser().parseFromString(String(e ?? ""), "text/html").body.textContent ?? "").trim();
	}
	function No(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r === "title" && !Mo(i) || Ao(t, `edit:samling:${t}:${n}:${r}`, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image"));
	}
	function Po(e, t, n) {
		let r = {
			schemaVersion: 1,
			id: e,
			name: t,
			kind: n,
			entries: []
		};
		to[e] = Yi(`urd-draft-samling-${e}`, () => null, S), to[e].replace(r), to[e].save(), eo.data.samlinger = [...z(ao), e], eo.save(), P(ao, [...z(ao), e], !0), P(so, e, !0), O(), Oo();
	}
	function Fo() {
		let e = z(uo).trim();
		if (!e) return;
		let t = va(e);
		if (!t || z(ao).includes(t)) {
			x(Y(t ? "status.collectionExists" : "status.invalidName"), "error");
			return;
		}
		Re("samlinger"), Po(t, e, z(fo)), P(uo, "");
	}
	function Io() {
		let e = Y("seed.productCatalogName"), t = va(e) || "produkter", n = t;
		for (let e = 2; z(ao).includes(n); e += 1) n = `${t}-${e}`;
		Re("samlinger"), Po(n, e, "products"), jt(null, (e) => {
			e.props.collection = n;
		});
	}
	function Lo(e) {
		Re("samlinger"), localStorage.removeItem(`urd-draft-samling-${e}`), delete to[e], eo.data.samlinger = z(ao).filter((t) => t !== e), eo.save(), P(ao, z(ao).filter((t) => t !== e), !0), z(so) === e && P(so, null), O(), Oo();
	}
	function Ro(e) {
		Ao(e, `samling:${e}:add-entry`, (e) => {
			e.kind === "products" ? e.entries.push({
				id: go("innslag"),
				title: Y("seed.newProduct"),
				text: ""
			}) : e.entries.unshift({
				id: go("innslag"),
				title: Y("seed.newEntry"),
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function zo(e, t, n, r) {
		Ao(e, `edit:samling:${e}:${t}:${n}`, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function Uo(e, t, n) {
		Ao(e, `samling:${e}:move-entry`, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function Wo(e, t) {
		Ao(e, `samling:${e}:remove-entry`, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function Go(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && zo(e, t, "image", (await Jn(r)).dataUrl);
	}
	function qo(e, t, n) {
		let r = n.split(",").map((e) => e.trim()).filter(Boolean);
		zo(e, t, "sizes", r.length ? r : "");
	}
	function Jo(e, t) {
		Ao(e, `samling:${e}:${t}:colors`, (e) => {
			let n = e.entries.find((e) => e.id === t);
			n && (n.colors = [...n.colors ?? [], { name: Y("ph.colorName") }]);
		});
	}
	function Xo(e, t, n, r, i) {
		Ao(e, `edit:samling:${e}:${t}:color:${n}:${r}`, (e) => {
			let a = e.entries.find((e) => e.id === t)?.colors?.[n];
			a && (r === "image" && !i ? delete a.image : i && (a[r] = i));
		});
	}
	async function ts(e, t, n, r) {
		let i = r.target.files?.[0];
		r.target.value = "", i && Xo(e, t, n, "image", (await Jn(i)).dataUrl);
	}
	function ns(e, t, n) {
		Ao(e, `samling:${e}:${t}:colors`, (e) => {
			let r = e.entries.find((e) => e.id === t);
			r?.colors && (r.colors = r.colors.filter((e, t) => t !== n), r.colors.length || delete r.colors);
		});
	}
	function rs(e) {
		let t = to[e]?.data;
		if (!t) return;
		let n = URL.createObjectURL(new Blob([Ko(t.entries)], { type: "text/csv" })), r = document.createElement("a");
		r.href = n, r.download = `${e}.csv`, r.click(), URL.revokeObjectURL(n);
	}
	async function is(e, t) {
		let n = t.target.files?.[0];
		if (t.target.value = "", !n) return;
		let r = Yo(await n.text());
		if (!r) {
			x(Y("status.csvInvalid"), "error");
			return;
		}
		let i = /* @__PURE__ */ new Set();
		for (let e of r.entries) (!/^[a-z0-9][a-z0-9-]*$/.test(e.id) || i.has(e.id)) && (e.id = go("innslag")), i.add(e.id);
		Ao(e, `samling:${e}:import`, (e) => {
			e.entries = r.entries;
		}), x(Y("status.csvImported", { count: String(r.entries.length) }), "ok");
	}
	let as = null, os, ss = new Promise((e) => {
		os = e;
	}), cs = /* @__PURE__ */ N(null), ls = an({}), $ = /* @__PURE__ */ N("0.0.0"), us = /* @__PURE__ */ N(""), ds = /* @__PURE__ */ N(""), fs = /* @__PURE__ */ N(an([])), ps = /* @__PURE__ */ N(an([])), ms = /* @__PURE__ */ N("pending"), hs = () => [.../* @__PURE__ */ new Set([...z(cs)?.enabled ?? [], ...z(cs)?.disabled ?? []])];
	function gs() {
		P(cs, JSON.parse(JSON.stringify(as.data)), !0);
	}
	let _s = /* @__PURE__ */ N(null);
	async function vs() {
		try {
			let e = (await fetch("/urd.json", { cache: "no-store" })).headers.get("content-security-policy");
			if (!e) {
				P(_s, { unknown: !0 }, !0);
				return;
			}
			let t = (t) => new Set((e.split(";").map((e) => e.trim()).find((e) => e.startsWith(`${t} `)) ?? "").split(/\s+/).slice(1));
			P(_s, {
				frameSrc: t("frame-src"),
				connectSrc: t("connect-src"),
				scriptSrc: t("script-src")
			}, !0);
		} catch {
			P(_s, { unknown: !0 }, !0);
		}
	}
	function ys(e) {
		let t = [
			...(e.scriptSrc ?? []).map((e) => ["script-src", e]),
			...(e.connectSrc ?? []).map((e) => ["connect-src", e]),
			...(e.frameSrc ?? []).map((e) => ["frame-src", e])
		];
		if (!z(_s) || z(_s).unknown) return [];
		let n = {
			"script-src": z(_s).scriptSrc,
			"connect-src": z(_s).connectSrc,
			"frame-src": z(_s).frameSrc
		};
		return t.filter(([e, t]) => !n[e]?.has(t)).map(([e, t]) => `${e} ${t}`);
	}
	async function xs() {
		vs();
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		P(ps, e.enabled ?? [], !0), as = Yi("urd-draft-plugins", () => e, S), gs();
		try {
			P($, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of hs()) ks(e);
		ws(), os(), E?.sendPlugins(Ue(z(cs))?.enabled ?? []);
	}
	async function ws() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				Ts();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), P(fs, (t ?? []).filter((e) => !hs().includes(e)), !0);
			for (let e of z(fs)) ks(e);
			P(ms, "ok");
		} catch {
			Ts();
		}
	}
	function Ts() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				P(fs, e.filter((e) => !hs().includes(e)), !0);
				for (let e of z(fs)) ks(e);
				P(ms, "ok");
				return;
			}
		} catch {}
		P(ms, "unavailable");
	}
	async function ks(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = ho(t);
			ls[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && po(z($), t.requiresEngine)
			};
		} catch {
			ls[e] = {
				name: e,
				errors: [Y("plugin.manifestNotFound", { id: e })],
				satisfied: !1
			};
		}
	}
	function Ms(e, t) {
		Re("plugins");
		let n = as.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), as.save(), O(), gs(), Ns();
	}
	function Ns() {
		z(w) && (z(w).src = z(w).src);
	}
	function zs(e) {
		Re("plugins");
		let t = as.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), as.save(), O(), gs(), Ns();
	}
	async function Bs() {
		P(ds, "");
		let e = z(us).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			P(ds, Y("plugin.invalidId"), !0);
			return;
		}
		if (hs().includes(e)) {
			P(ds, Y("plugin.alreadyListed"), !0);
			return;
		}
		if (await ks(e), ls[e].errors.length) {
			P(ds, Y("plugin.invalidManifest", { errors: ls[e].errors.join("; ") }), !0);
			return;
		}
		Ms(e, !0), P(us, "");
	}
	function Vs(e) {
		P(fs, z(fs).filter((t) => t !== e), !0), Ms(e, !0);
	}
	function Hs(e, t) {
		Ti(e, () => {
			z(D).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(z(D).footer);
		});
	}
	function Us(e, t) {
		Hs(`edit:footer-brand-${e}`, (n) => {
			n.brand ??= {}, t.trim() ? n.brand[e] = t : delete n.brand[e], !n.brand.title && !n.brand.tagline && !n.brand.logo && delete n.brand;
		});
	}
	function Ws(e) {
		Hs("footer", (t) => {
			t.brand ??= {}, e === "image" || e === "both" ? t.brand.mode = e : delete t.brand.mode;
		});
	}
	async function Gs(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Jn(t);
			Hs("footer", (t) => {
				t.brand ??= {}, t.brand.logo = e.dataUrl, t.brand.mode || (t.brand.mode = "both");
			});
		} catch {
			x(Y("status.imageReadErrorSvg"), "error");
		}
	}
	function Ks() {
		Hs("footer", (e) => {
			e.brand && (delete e.brand.logo, delete e.brand.mode, delete e.brand.logoHeight, !e.brand.title && !e.brand.tagline && delete e.brand);
		});
	}
	function qs(e) {
		Hs("edit:footer-logo-height", (t) => {
			t.brand ??= {};
			let n = Number(e);
			Number.isFinite(n) && (t.brand.logoHeight = Math.min(160, Math.max(16, Math.round(n))));
		});
	}
	function Js(e) {
		Hs("edit:footer-copyright", (t) => {
			e.trim() ? t.copyright = e : delete t.copyright;
		});
	}
	let Ys = [
		{
			id: "minimal",
			label: Y("footerTemplate.minimal"),
			thumb: {
				center: !0,
				social: 2,
				baselineLinks: 1
			}
		},
		{
			id: "sentrert",
			label: Y("footerTemplate.sentrert"),
			thumb: {
				center: !0,
				row: !0,
				social: 3
			}
		},
		{
			id: "kolonner",
			label: Y("footerTemplate.kolonner"),
			thumb: {
				tag: !0,
				cols: 3,
				social: 3,
				baselineLinks: 2
			}
		},
		{
			id: "sitemap",
			label: Y("footerTemplate.sitemap"),
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
			label: Y("footerTemplate.nyhetsbrev"),
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
			label: Y("footerTemplate.storcta"),
			thumb: {
				center: !0,
				bigcta: !0,
				baselineLinks: 2
			}
		},
		{
			id: "kontakt",
			label: Y("footerTemplate.kontakt"),
			thumb: {
				tag: !0,
				cols: 3,
				social: 2,
				baselineLinks: 1
			}
		},
		{
			id: "mega",
			label: Y("footerTemplate.mega"),
			thumb: {
				tag: !0,
				mega: !0,
				cols: 2,
				social: 4,
				baselineLinks: 2
			}
		}
	];
	function Qs(e) {
		let t = Y("seed.orgName"), n = z(D).pages ?? [], r = (e) => n.slice(0, e).map((e) => ({
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
			baseline: [a(Y("seed.footer.privacy"), "#")]
		} : e === "sentrert" ? {
			align: "center",
			brand: { title: t },
			linkRow: r(5),
			social: i([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: `${o} · ${Y("seed.footer.madeWith")}`
		} : e === "kolonner" ? {
			align: "left",
			brand: {
				title: t,
				tagline: Y("seed.footer.tagline1")
			},
			columns: [
				{
					title: Y("seed.footer.colPages"),
					links: r(4)
				},
				{
					title: Y("seed.footer.colCompany"),
					links: [
						a(Y("seed.footer.about"), "#"),
						a(Y("seed.join"), "#"),
						a(Y("seed.footer.press"), "#")
					]
				},
				{
					title: Y("seed.footer.colResources"),
					links: [
						a(Y("seed.footer.bylaws"), "#"),
						a(Y("seed.footer.privacy"), "#"),
						a(Y("seed.footer.contact"), "#")
					]
				}
			],
			social: i([
				"facebook",
				"instagram",
				"linkedin"
			]),
			copyright: o,
			baseline: [a(Y("seed.footer.privacy"), "#"), a(Y("seed.footer.terms"), "#")]
		} : e === "sitemap" ? {
			align: "left",
			brand: {
				title: t,
				tagline: Y("seed.footer.tagline2")
			},
			columns: [
				{
					title: Y("seed.footer.colExplore"),
					links: [
						a(Y("seed.footer.home"), "#"),
						a(Y("seed.footer.events"), "#"),
						a(Y("seed.footer.gallery"), "#"),
						a(Y("seed.footer.blog"), "#")
					]
				},
				{
					title: Y("seed.footer.colCompany"),
					links: [
						a(Y("seed.footer.about"), "#"),
						a(Y("seed.footer.history"), "#"),
						a(Y("seed.footer.press"), "#"),
						a(Y("seed.footer.contact"), "#")
					]
				},
				{
					title: Y("seed.footer.colSupport"),
					links: [
						a(Y("seed.join"), "#"),
						a(Y("seed.footer.faq"), "#"),
						a(Y("seed.footer.help"), "#")
					]
				},
				{
					title: Y("seed.footer.colLegal"),
					links: [
						a(Y("seed.footer.privacy"), "#"),
						a(Y("seed.footer.terms"), "#"),
						a(Y("seed.footer.bylaws"), "#")
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
				a(Y("seed.footer.privacy"), "#"),
				a(Y("seed.footer.terms"), "#"),
				a(Y("seed.footer.cookies"), "#")
			]
		} : e === "nyhetsbrev" ? {
			align: "left",
			brand: {
				title: t,
				tagline: Y("seed.footer.tagline3")
			},
			cta: {
				kind: "newsletter",
				heading: Y("seed.footer.newsletterHeading"),
				label: Y("seed.footer.newsletterButton"),
				recipient: Y("seed.email"),
				success: Y("seed.footer.newsletterSuccess")
			},
			columns: [{
				title: Y("seed.footer.colPages"),
				links: r(4)
			}, {
				title: Y("seed.footer.colMore"),
				links: [
					a(Y("seed.footer.about"), "#"),
					a(Y("seed.footer.contact"), "#"),
					a(Y("seed.footer.privacy"), "#")
				]
			}],
			social: i(["facebook", "instagram"]),
			copyright: o,
			baseline: [a(Y("seed.footer.privacy"), "#")]
		} : e === "storcta" ? {
			align: "center",
			cta: {
				kind: "button",
				big: !0,
				heading: Y("seed.footer.ctaHeading"),
				sub: Y("seed.footer.ctaSub"),
				label: Y("seed.join"),
				href: "#"
			},
			linkRow: r(4),
			social: i([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: o,
			baseline: [a(Y("seed.footer.privacy"), "#"), a(Y("seed.footer.terms"), "#")]
		} : e === "kontakt" ? {
			align: "left",
			brand: {
				title: t,
				tagline: Y("seed.footer.tagline4")
			},
			columns: [
				{
					title: Y("seed.footer.colVisit"),
					links: [
						a(Y("seed.footer.address"), "#"),
						a(Y("seed.email"), "mailto:post@dinforening.no"),
						a("+47 22 00 00 00", "tel:+4722000000")
					]
				},
				{
					title: Y("seed.footer.colHours"),
					links: [a(Y("seed.footer.hours1"), "#"), a(Y("seed.footer.hours2"), "#")]
				},
				{
					title: Y("seed.footer.colPages"),
					links: r(4)
				}
			],
			social: i(["facebook", "instagram"]),
			copyright: o,
			baseline: [a(Y("seed.footer.privacy"), "#")]
		} : {
			align: "left",
			brand: {
				title: t,
				tagline: Y("seed.footer.tagline5")
			},
			columns: [{
				title: Y("seed.footer.colExplore"),
				links: r(4)
			}, {
				title: Y("seed.footer.colFollow"),
				links: [a(Y("seed.footer.newsletter"), "#"), a(Y("seed.email"), "mailto:post@dinforening.no")]
			}],
			social: i([
				"facebook",
				"instagram",
				"linkedin",
				"youtube"
			]),
			copyright: o,
			baseline: [a(Y("seed.footer.privacy"), "#"), a(Y("seed.footer.madeWith"), "#")],
			background: {
				version: 1,
				layers: [{
					type: "glow",
					version: Zs.version ?? 1,
					props: {
						...Zs.defaults(),
						color: "accent",
						x: .12,
						y: 0,
						radius: .6,
						opacity: .45
					}
				}, {
					type: "grain",
					version: $s.version ?? 1,
					props: {
						...$s.defaults(),
						opacity: .08
					}
				}]
			}
		};
	}
	function ec(e) {
		Hs("footer-template", (t) => {
			let n = Qs(e);
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
	function tc(e) {
		Hs("footer", (t) => {
			t[e] ??= [], t[e].push(z(D).pages[0] ? {
				label: Y("seed.link"),
				page: z(D).pages[0].id
			} : {
				label: Y("seed.link"),
				href: "https://"
			});
		});
	}
	function nc(e, t) {
		Hs("footer", (n) => {
			n[e].splice(t, 1), n[e].length || delete n[e];
		});
	}
	function rc(e, t, n) {
		Hs("footer", (r) => {
			let i = r[e], a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function ic(e, t, n) {
		Hs(`edit:footer-${e}-label-${t}`, (r) => {
			r[e][t].label = n;
		});
	}
	function ac(e, t, n) {
		Hs("footer", (r) => {
			let i = r[e][t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function oc(e, t, n) {
		Hs(`edit:footer-${e}-href-${t}`, (r) => {
			r[e][t].href = n;
		});
	}
	function sc(e) {
		Hs("footer", (t) => {
			e === "center" ? t.columnsAlign = "center" : delete t.columnsAlign;
		});
	}
	function cc(e) {
		Hs("footer", (t) => {
			e ? t.cta ??= {
				kind: "button",
				label: Y("seed.join")
			} : delete t.cta;
		});
	}
	function lc(e, t) {
		Hs(`edit:footer-cta-${e}`, (n) => {
			n.cta ??= {}, t === "" || t == null || t === !1 ? delete n.cta[e] : n.cta[e] = t;
		});
	}
	function uc(e) {
		Hs("footer", (t) => {
			t.cta ??= {}, e === "__href" ? (delete t.cta.page, t.cta.href = t.cta.href ?? "https://") : (t.cta.page = e, delete t.cta.href);
		});
	}
	function dc(e, t) {
		Hs("footer", (n) => {
			let r = new Set(n.hideOn ?? []);
			t ? r.delete(e) : r.add(e), r.size ? n.hideOn = [...r] : delete n.hideOn;
		});
	}
	function fc() {
		Hs("footer", (e) => {
			e.columns ??= [], e.columns.push({
				title: Y("seed.column"),
				links: [{
					label: Y("seed.link"),
					page: z(D).pages[0].id
				}]
			});
		});
	}
	function pc(e) {
		Hs("footer", (t) => {
			t.columns.splice(e, 1), t.columns.length || delete t.columns;
		});
	}
	function mc(e, t) {
		Hs("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.columns.length || ([n.columns[e], n.columns[r]] = [n.columns[r], n.columns[e]]);
		});
	}
	function hc(e, t) {
		Hs(`edit:footer-col-title-${e}`, (n) => {
			n.columns[e].title = t;
		});
	}
	function gc(e) {
		Hs("footer", (t) => {
			t.columns[e].links ??= [], t.columns[e].links.push({
				label: Y("seed.link"),
				page: z(D).pages[0].id
			});
		});
	}
	function _c(e, t) {
		Hs("footer", (n) => {
			n.columns[e].links.splice(t, 1);
		});
	}
	function vc(e, t, n) {
		Hs("footer", (r) => {
			let i = r.columns[e].links, a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function yc(e, t, n) {
		Hs(`edit:footer-link-label-${e}-${t}`, (r) => {
			r.columns[e].links[t].label = n;
		});
	}
	function bc(e, t, n) {
		Hs("footer", (r) => {
			let i = r.columns[e].links[t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function xc(e, t, n) {
		Hs(`edit:footer-link-href-${e}-${t}`, (r) => {
			r.columns[e].links[t].href = n;
		});
	}
	function Sc() {
		Hs("footer", (e) => {
			e.social ??= [], e.social.push({
				icon: "facebook",
				url: "https://"
			});
		});
	}
	function wc(e) {
		Hs("footer", (t) => {
			t.social.splice(e, 1), t.social.length || delete t.social;
		});
	}
	function Tc(e, t) {
		Hs("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.social.length || ([n.social[e], n.social[r]] = [n.social[r], n.social[e]]);
		});
	}
	function Ec(e, t) {
		Hs("footer", (n) => {
			n.social[e].icon = t;
		});
	}
	function kc(e, t) {
		Hs(`edit:footer-social-url-${e}`, (n) => {
			n.social[e].url = t;
		});
	}
	let Ac = Oa.filter(([e]) => e === "iconCat.social" || e === "iconCat.communication").flatMap(([, e]) => e.map((e) => [e, Da[e].label]));
	function jc(e, t) {
		Ti(`edit:nav-label-${e}`, () => {
			z(D).nav.items[e].label = t;
		});
	}
	function lf(e, t) {
		Ti("nav", () => {
			let n = z(D).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function uf(e, t) {
		Ti(`edit:nav-href-${e}`, () => {
			z(D).nav.items[e].href = t;
		});
	}
	function df(e, t) {
		let n = e + t, r = z(D).nav.items;
		n < 0 || n >= r.length || Ti("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function ff(e) {
		Ti("nav", () => {
			z(D).nav.items.splice(e, 1);
		});
	}
	function pf() {
		Ti("nav", () => {
			z(D).nav.items.push({
				label: Y("seed.link"),
				page: z(D).pages[0].id
			});
		});
	}
	function mf(e) {
		Ti("nav", () => {
			let t = z(D).nav.items[e];
			t.children ??= [], t.children.push({
				label: Y("seed.link"),
				page: z(D).pages[0].id
			});
		});
	}
	function hf(e, t, n) {
		Ti(`edit:nav-child-label-${e}-${t}`, () => {
			z(D).nav.items[e].children[t].label = n;
		});
	}
	function gf(e, t, n) {
		Ti("nav", () => {
			let r = z(D).nav.items[e].children[t];
			n === "__href" ? (delete r.page, r.href = r.href ?? "https://") : (r.page = n, delete r.href);
		});
	}
	function _f(e, t, n) {
		Ti(`edit:nav-child-href-${e}-${t}`, () => {
			z(D).nav.items[e].children[t].href = n;
		});
	}
	function vf(e, t, n) {
		let r = t + n, i = z(D).nav.items[e].children;
		r < 0 || r >= i.length || Ti("nav", () => {
			[i[t], i[r]] = [i[r], i[t]];
		});
	}
	function yf(e, t) {
		Ti("nav", () => {
			let n = z(D).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = z(D).pages[0].id));
		});
	}
	function bf(e, t) {
		Ti(`edit:theme-color-${e}`, () => {
			z(D).theme.tokens.color[e] = t, z(D).theme.alt?.auto && (z(D).theme.alt.tokens.color = wf());
		});
	}
	function xf(e, t) {
		Ti("theme", () => {
			z(D).theme.tokens.font[e] = t;
		});
	}
	function Sf(e, t) {
		Ti("theme", () => {
			z(D).theme.tokens.radius[e] = t;
		});
	}
	function Cf(e) {
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
	function wf() {
		return Object.fromEntries(Object.entries(z(D).theme.tokens.color).map(([e, t]) => [e, Cf(t)]));
	}
	function Tf(e, t) {
		Ti(`edit:theme-alt-${e}`, () => {
			z(D).theme.alt.tokens.color[e] = t, z(D).theme.alt.auto = !1;
		});
	}
	function Ef(e) {
		Ti("theme", () => {
			e === "light" ? delete z(D).theme.scheme : z(D).theme.scheme = e;
		});
	}
	function Df(e) {
		Ti("theme", () => {
			e ? z(D).theme.alt = {
				auto: !0,
				tokens: { color: wf() }
			} : delete z(D).theme.alt;
		});
	}
	function Of(e) {
		Ti("theme", () => {
			z(D).theme.alt ??= { tokens: { color: wf() } }, z(D).theme.alt.auto = e, e && (z(D).theme.alt.tokens.color = wf());
		});
	}
	function kf(e) {
		let t = z(D).theme.tokens.font[e];
		return [...Nc.some(([, e]) => e === t) ? [] : [[t, Y("opt.customFont")]], ...Nc.map(([e, t]) => [t, Y(e)])];
	}
	let Af = (e) => parseInt(e, 10) || 0;
	function jf(e, t) {
		Sf(e, `${t}px`);
	}
	let Mf = (e, t) => e && t && t[e] ? t[e] : e, Nf = [
		"bg",
		"surface",
		"text",
		"accent",
		"accent-text"
	], Pf = [
		{
			id: "bronn",
			name: Y("themePreset.bronn.name"),
			note: Y("themePreset.bronn.note"),
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
			name: Y("themePreset.stein.name"),
			note: Y("themePreset.stein.note"),
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
			name: Y("themePreset.plomme.name"),
			note: Y("themePreset.plomme.note"),
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
			name: Y("themePreset.rose.name"),
			note: Y("themePreset.rose.note"),
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
			name: Y("themePreset.hav.name"),
			note: Y("themePreset.hav.note"),
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
			name: Y("themePreset.natt.name"),
			note: Y("themePreset.natt.note"),
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
	function Ff(e) {
		Ti("theme", () => {
			let t = e.scheme === "dark", n = t ? e.dark : e.light, r = t ? e.light : e.dark;
			for (let e of Nf) z(D).theme.tokens.color[e] = n[e];
			t ? z(D).theme.scheme = "dark" : delete z(D).theme.scheme, z(D).theme.alt = { tokens: { color: { ...r } } };
		});
	}
	let If = /* @__PURE__ */ j(() => {
		if (!z(D)) return null;
		let e = z(D).theme.tokens.color, t = z(D).theme.alt?.tokens?.color ?? {}, n = z(D).theme.scheme === "dark";
		return Pf.find((r) => {
			let i = n ? r.dark : r.light, a = n ? r.light : r.dark;
			return Nf.every((n) => e[n] === i[n] && t[n] === a[n]);
		})?.id ?? null;
	});
	function Lf() {
		P(ne, !z(ne)), E?.sendChrome(z(ne));
	}
	function Rf(e) {
		let t = T.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (Re(`edit:${e.blockId}`), n.props = e.props, T.save(), O(), z(A)?.blockId === e.blockId && wt(), e.rerender && E?.sendSection(z(g), t), P(v, ""));
	}
	function zf(e) {
		let t = T.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		Re(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && De(t, "desktop-changed-after-mobile"), T.save(), O(), z(A)?.blockId === e.blockId && wt();
	}
	function Bf(e) {
		let t = T.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		!t?.frames?.desktop || t.frames.desktop.h === e.h || (T.amendBaseline((t) => {
			let n = t.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
			n?.frames?.desktop && (n.frames.desktop.h = e.h);
		}), T.hasDraft() && Re(`edit:${e.blockId}`), t.frames.desktop.h = e.h, T.save(), O(), z(A)?.blockId === e.blockId && wt());
	}
	function Vf(e) {
		let t = T.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			if (Re("mobile-reset"), e.blockId) {
				let n = t.blocks.find((t) => t.id === e.blockId);
				n && (n.frames.mobile = null);
			} else for (let e of t.blocks) e.frames.mobile = null;
			!Ee(t) && t.responsive?.mobile && (t.responsive.mobile.attention = null), T.save(), O(), Ce(), E?.sendSection(z(g), t);
		}
	}
	function Hf(e) {
		let t = T.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		!n || typeof e.mobileOrder != "number" || (Re("mobile-order"), n.mobileOrder = e.mobileOrder, T.save(), O(), E?.sendSection(z(g), t));
	}
	function Uf(e) {
		let t = T.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (Re("review-done"), t.responsive.mobile.attention = null, T.save(), O(), Ce());
	}
	function Wf(e) {
		let t = T.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (Re("block-flag"), typeof e.decor == "boolean" && (n.decor = e.decor), typeof e.hideMobile == "boolean" && (n.hideMobile = e.hideMobile), T.save(), O(), typeof e.hideMobile == "boolean" && z(oe) === "mobile" && E?.sendSection(z(g), t), z(A)?.blockId === e.blockId && wt());
	}
	function Gf(e) {
		Re("add-section"), e.section.id || (e.section.id = go("sec")), T.data.sections.splice(e.index, 0, e.section), T.save(), O(), E?.sendPage(z(g), T.data), P(cn, e.section.id, !0), hn(e.section), P(ct, "properties");
	}
	function Kf(e) {
		let t = T.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (Re("move-section"), [t[n], t[r]] = [t[r], t[n]], T.save(), O(), E?.sendPage(z(g), T.data));
	}
	function qf(e) {
		Re("delete-section"), e.sectionId === z(cn) && (P(cn, null), P(ln, null)), z(A)?.sectionId === e.sectionId && P(A, null), T.data.sections = T.data.sections.filter((t) => t.id !== e.sectionId), T.save(), O(), E?.sendPage(z(g), T.data);
	}
	function Jf(e) {
		let t = T.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			Re("section-size"), t.size = {
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
			e.moves?.length && (De(t, "section-height"), z(A)?.sectionId === e.sectionId && wt()), e.sectionId === z(cn) && P(un, e.minHeight, !0), T.save(), O();
		}
	}
	function Yf(e) {
		let t = T.data.sections.find((t) => t.id === e.fromSectionId), n = T.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		!t || !n || !r || (Re("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), De(t, "block-moved"), De(n, "block-moved"), T.save(), O(), Ce(), E?.sendPage(z(g), T.data), z(A)?.blockId === e.blockId && (P(A, {
			...z(A),
			sectionId: e.toSectionId
		}, !0), wt()));
	}
	function Xf(e) {
		let t = T.data.sections.find((t) => t.id === e.sectionId);
		if (!t) return;
		let n = e.blockIds ?? [e.blockId];
		Re("delete-block"), t.blocks = t.blocks.filter((e) => !n.includes(e.id)), n.includes(z(A)?.blockId) && P(A, null), De(t, "block-deleted"), T.save(), O(), E?.sendSection(z(g), t);
	}
	let Zf = {
		text: {
			type: "text",
			props: {
				html: Y("seed.text"),
				align: "left"
			},
			w: 33,
			h: 28
		},
		"text-box": {
			type: "text",
			props: {
				html: Y("seed.textBox"),
				align: "left",
				box: !0
			},
			w: 30,
			h: 150
		},
		button: {
			type: "button",
			props: {
				label: Y("seed.newButton"),
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
			hideMobile: !0,
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
			hideMobile: !0,
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
			hideMobile: !0,
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
			hideMobile: !0,
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
			hideMobile: !0,
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
			hideMobile: !0,
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
						q: Y("seed.faq.q1"),
						a: Y("seed.faq.answer")
					},
					{
						q: Y("seed.faq.q2"),
						a: Y("seed.faq.answer")
					},
					{
						q: Y("seed.faq.q3"),
						a: Y("seed.faq.answer")
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
						title: Y("seed.tidslinje.t1"),
						text: Y("seed.tidslinje.text")
					},
					{
						year: "2022",
						title: Y("seed.tidslinje.t2"),
						text: Y("seed.tidslinje.text")
					},
					{
						year: "2026",
						title: Y("seed.tidslinje.t3"),
						text: Y("seed.tidslinje.text")
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
				text: Y("seed.sitat.text"),
				attribution: Y("seed.sitat.name"),
				role: Y("seed.sitat.role"),
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
				label: Y("seed.statistikk.label"),
				countUp: !0
			},
			w: 20,
			h: 90
		},
		tabell: {
			type: "tabell",
			props: {
				header: !0,
				striped: !1,
				lines: "rows",
				rows: [
					[
						Y("seed.tabell.h1"),
						Y("seed.tabell.h2"),
						Y("seed.tabell.h3")
					],
					[
						Y("seed.tabell.r1c1"),
						Y("seed.tabell.r1c2"),
						""
					],
					[
						Y("seed.tabell.r2c1"),
						Y("seed.tabell.r2c2"),
						""
					]
				]
			},
			w: 50,
			h: 160
		},
		deling: {
			type: "deling",
			props: {
				services: [
					"facebook",
					"x",
					"linkedin",
					"whatsapp",
					"email",
					"copy"
				],
				variant: "icons",
				size: 38,
				color: ""
			},
			w: 34,
			h: 48
		},
		nedteller: {
			type: "nedteller",
			props: {
				target: (() => {
					let e = new Date(Date.now() + 2592e6), t = (e) => String(e).padStart(2, "0");
					return `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}T18:00`;
				})(),
				doneText: Y("seed.nedteller.done"),
				variant: "boxes",
				showSeconds: !0
			},
			w: 40,
			h: 110
		},
		audio: {
			type: "audio",
			props: {
				src: "",
				title: "",
				loop: !1
			},
			w: 34,
			h: 80
		},
		produkt: {
			type: "produkt",
			props: {
				collection: null,
				limit: 0,
				columns: 0,
				currency: "kr"
			},
			w: 90,
			h: 300
		},
		handlekurv: {
			type: "handlekurv",
			props: {
				variant: "button",
				href: "",
				currency: "kr"
			},
			w: 16,
			h: 48
		},
		kasse: {
			type: "kasse",
			props: {
				recipient: "",
				endpoint: "",
				vipps: "",
				currency: "kr",
				vippsCheckout: !1
			},
			w: 44,
			h: 430
		}
	};
	function Qf(e) {
		let t = Zf[e];
		return t ? {
			id: go("blk"),
			type: t.type,
			version: 1,
			decor: !!t.decor,
			hideMobile: !!t.hideMobile,
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
	function $f(e) {
		E ? E.sendPlaceBlock(e) : ep(Ar()?.id, e);
	}
	function ep(e, t) {
		let n = T.data.sections.find((t) => t.id === e) ?? T.data.sections[0];
		if (!n) return;
		Re("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), De(n, "block-added"), T.save(), O(), E?.sendSection(z(g), n);
	}
	function tp(e, t, n, r) {
		let i = T.data.sections.find((t) => t.id === e);
		if (!i || !t?.length) return;
		Re("add-blocks");
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
		}), De(i, "block-added"), T.save(), O(), E?.sendSection(z(g), i);
	}
	function np(e) {
		$f(Qf(e));
	}
	let rp = /* @__PURE__ */ N(an([]));
	function ip(e, t = {}) {
		let n = Ue(e);
		$f({
			id: go("blk"),
			type: n.type,
			version: n.version ?? 1,
			decor: !1,
			props: {
				...n.defaults ?? {},
				...Ue(t)
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
	let ap = /* @__PURE__ */ N("");
	function op() {
		let e = [
			{
				label: Y("blocks.text"),
				act: "block",
				kind: "text"
			},
			{
				label: Y("ui.textBox"),
				act: "block",
				kind: "text-box"
			},
			{
				label: Y("blocks.button"),
				act: "block",
				kind: "button"
			},
			{
				label: Y("blocks.image"),
				act: "image"
			},
			{
				label: Y("blocks.video"),
				act: "block",
				kind: "video"
			},
			{
				label: Y("blocks.icon"),
				act: "block",
				kind: "icon"
			},
			{
				label: Y("blocks.samling"),
				act: "block",
				kind: "samling"
			},
			{
				label: Y("blocks.faq"),
				act: "block",
				kind: "faq"
			},
			{
				label: Y("blocks.tidslinje"),
				act: "block",
				kind: "tidslinje"
			},
			{
				label: Y("blocks.sitat"),
				act: "block",
				kind: "sitat"
			},
			{
				label: Y("blocks.statistikk"),
				act: "block",
				kind: "statistikk"
			},
			{
				label: Y("blocks.tabell"),
				act: "block",
				kind: "tabell"
			},
			{
				label: Y("blocks.deling"),
				act: "block",
				kind: "deling"
			},
			{
				label: Y("blocks.nedteller"),
				act: "block",
				kind: "nedteller"
			},
			{
				label: Y("blocks.audio"),
				act: "block",
				kind: "audio"
			},
			{
				label: Y("blocks.produkt"),
				act: "block",
				kind: "produkt"
			},
			{
				label: Y("blocks.handlekurv"),
				act: "block",
				kind: "handlekurv"
			},
			{
				label: Y("blocks.kasse"),
				act: "block",
				kind: "kasse"
			},
			{
				label: Y("ui.emptyGallery"),
				act: "block",
				kind: "galleri"
			},
			{
				label: Y("ui.galleryWithImages"),
				act: "galleryImages"
			},
			{
				label: Y("shape.line"),
				act: "block",
				kind: "shape-line"
			},
			{
				label: Y("shape.arrow"),
				act: "block",
				kind: "shape-arrow"
			},
			{
				label: Y("shape.circle"),
				act: "block",
				kind: "shape-circle"
			},
			{
				label: Y("shape.rect"),
				act: "block",
				kind: "shape-rect"
			},
			{
				label: Y("shape.triangle"),
				act: "block",
				kind: "shape-triangle"
			}
		];
		for (let t of z(yo)) {
			let n = Z[t]?.data?.mal;
			n?.kind === "blocks" && e.push({
				label: n.name,
				act: "mal",
				id: t
			});
		}
		for (let t of z(rp)) if (t.variants?.length) for (let n of t.variants) e.push({
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
	function sp(e) {
		e.act === "block" ? np(e.kind) : e.act === "plugin" ? ip(e.entry, e.props ?? {}) : e.act === "mal" && E?.sendInsertTemplate(e.id);
	}
	function cp(e) {
		let t = Qf(e.kind);
		if (t) {
			if (e.at && typeof e.at.x == "number" && typeof e.at.y == "number") {
				let n = T.data.sections.find((t) => t.id === e.sectionId)?.grid ?? z(D).grid, r = Pc({
					x: e.at.x,
					y: e.at.y,
					w: t.frames.desktop.w,
					h: t.frames.desktop.h,
					grid: n
				});
				t.frames.desktop.x = r.x, t.frames.desktop.y = r.y;
			} else t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40;
			ep(e.sectionId, t), E?.sendSelect(t.id), e.kind === "image" && x(Y("status.imageBlockAdded")), e.kind === "galleri" && x(Y("status.galleryBlockAdded"));
		}
	}
	async function lp(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		x(Y("status.compressingImage"));
		let n;
		try {
			n = await Jn(t);
		} catch {
			x(Y("status.imageReadError"), "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (z(w)?.clientWidth ?? 1280));
		$f({
			id: go("blk"),
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: va(t.name).replaceAll("-", " "),
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
		}), n.bytes > 4e5 ? x(Y("status.imageLarge", { kb: Math.round(n.bytes / 1024) }), "error") : x("");
	}
	async function up(e) {
		let t = [], n = 0, r = 0;
		for (let i of e) try {
			let e = await Jn(i);
			e.bytes > 4e5 && (r += 1), t.push({
				src: e.dataUrl,
				alt: va(i.name).replaceAll("-", " "),
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
	function dp(e, t, n) {
		t ? x(Y("status.imagesReadFailed", { n: t }), "error") : n ? x(Y("status.imagesLarge", { n }), "error") : x(e ? "" : Y("status.noImagesAdded"));
	}
	async function fp(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		x(Y("status.compressingImages"));
		let { images: n, failed: r, big: i } = await up(t);
		n.length && jt("galleri-add", (e) => {
			e.props.images.push(...n);
		}), dp(n.length, r, i);
	}
	async function pp(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		x(Y("status.compressingImages"));
		let { images: n, failed: r, big: i } = await up(t);
		if (!n.length) {
			dp(0, r, i);
			return;
		}
		let a = Qf("galleri");
		a.props.images = n, $f(a), dp(n.length, r, i);
	}
	function mp(e, t) {
		jt("galleri-move", (n) => {
			let r = e + t;
			r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
		});
	}
	function hp(e) {
		jt("galleri-remove", (t) => {
			t.props.images.splice(e, 1);
		});
	}
	function gp(e, t, n) {
		jt(`edit:${z(A).blockId}:img${e}-${t}`, (r) => {
			r.props.images[e][t] = n;
		});
	}
	function _p(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/") && !i?.startsWith("data:audio/")) return;
		let a = i.split(",", 2)[1], o = `media/${va(n || "bilde")}-${ya(a)}.${_a(i)}`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function vp(e, t) {
		_p(e, "image", e.title, t);
		for (let n of e.colors ?? []) _p(n, "image", `${e.title}-${n.name}`, t);
	}
	function yp(e, t) {
		for (let n of e?.layers ?? []) if (n.type === "image" && _p(n.props, "src", "bakgrunn", t), n.type === "bildegalleri") for (let e of n.props.images ?? []) _p(e, "src", "bakgrunn", t);
	}
	function bp(e, t) {
		if (e.type === "image" && _p(e.props, "src", e.props.alt, t), e.type === "icon" && _p(e.props, "image", "ikon", t), e.type === "galleri") for (let n of e.props.images ?? []) _p(n, "src", n.alt || "galleri", t);
		e.type === "audio" && _p(e.props, "src", e.props.title || "lyd", t);
	}
	function xp(e, t) {
		yp(e.background, t);
		for (let n of e.blocks) bp(n, t);
	}
	function Sp(e) {
		let t = [];
		e.meta?.og && _p(e.meta.og, "image", "deling", t);
		for (let n of e.sections) xp(n, t);
		return t;
	}
	function Cp(e) {
		let t = [], n = e.nav?.logo;
		return n?.type === "image" && _p(n, "value", "logo", t), n?.type === "both" && _p(n, "image", "logo", t), e.nav?.style && _p(e.nav.style, "image", "meny", t), yp(e.nav?.style?.background, t), yp(e.footer?.background, t), e.footer?.brand && _p(e.footer.brand, "logo", "footer-logo", t), _p(e.site, "icon", "ikon", t), t;
	}
	let wp = /* @__PURE__ */ N(!1), Tp = /* @__PURE__ */ N(null);
	function Ep() {
		P(wp, !z(wp));
	}
	function Dp() {
		P(wp, !1), Op();
	}
	Cn(() => {
		if (!z(wp)) return;
		let e = (e) => {
			z(Tp)?.contains(e.target) || P(wp, !1);
		}, t = (e) => {
			e.key === "Escape" && P(wp, !1);
		}, n = () => P(wp, !1);
		return window.addEventListener("click", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			window.removeEventListener("click", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	function Op() {
		Re("discard");
		for (let e of z(D).pages) e.id !== z(g) && !je.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = T.reset();
		if (Oe.reset(), as && (as.reset(), gs()), eo) {
			eo.reset(), P(ao, [...eo.data.samlinger ?? []], !0);
			for (let e of Object.keys(to)) z(ao).includes(e) ? to[e].reset() : delete to[e];
			Oo();
		}
		if (_o) {
			_o.reset(), P(yo, [..._o.data.maler ?? []], !0);
			for (let e of Object.keys(Z)) z(yo).includes(e) ? Z[e].reset() : (localStorage.removeItem(`urd-draft-mal-${e}`), delete Z[e]);
			xo();
		}
		ke(), P(te, {
			snap: !0,
			...z(D).grid
		}, !0), O(), P(v, ""), Ae(), z(D).pages.some((e) => e.id === z(g)) ? E?.sendPage(z(g), e) : ii(z(D).pages[0].id);
	}
	async function kp() {
		if (Wr) {
			x(Y("status.revertReloadBeforePublish"), "error");
			return;
		}
		if (z(Xr)) {
			x(Y("update.publishBlocked"), "error");
			return;
		}
		x(Y("status.publishing"));
		let e = [], t = [], n = [], r = [];
		for (let i of z(D).pages) {
			let a = `urd-draft-${i.id}`, o = je.has(i.id) || !z(m).pages.some((e) => e.id === i.id), s = null;
			if (i.id === z(g) && (T.hasDraft() || o)) s = T.data;
			else if (i.id !== z(g)) {
				let e = localStorage.getItem(a);
				if (e) try {
					s = lo(JSON.parse(e), Oe.data);
				} catch {}
			}
			if (!s && o && (s = ri(i)), !s) continue;
			let c = JSON.parse(JSON.stringify(s));
			e.push(...Sp(c)), e.push({
				path: i.file,
				content: JSON.stringify(c, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (Oe.hasDraft()) {
			let r = JSON.parse(JSON.stringify(z(D)));
			e.push(...Cp(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), e.push({
				path: "content/theme.css",
				content: js(r.theme),
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(z(m).theme, z(D).theme) || t.push("tema"), i(z(m).nav, z(D).nav) || t.push("menyen"), i(z(m).footer, z(D).footer) || t.push("footeren"), i(z(m).pages, z(D).pages) || t.push("sideregisteret"), i(z(m).grid, z(D).grid) || t.push("gridet"), (z(m).site.icon ?? null) !== (z(D).site.icon ?? null) && t.push("nettstedsikonet");
			let { icon: a, ...o } = z(m).site, { icon: s, ...c } = z(D).site;
			i(o, c) || t.push("nettstedsinfo");
		}
		let i = Object.entries(to).filter(([, e]) => e.hasDraft());
		if (i.length || eo?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) vp(t, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), $o.includes(i.kind) && e.push({
					path: `content/samlinger/${t}.xml`,
					content: es({
						title: i.name ?? t,
						origin: location.origin,
						path: `/content/samlinger/${t}.xml`,
						items: i.entries.map((e) => ({
							id: e.id,
							title: Mo(e.title),
							text: Mo(e.text),
							date: e.date,
							href: e.href
						}))
					}),
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (eo?.hasDraft()) {
				e.push({
					path: "content/samlinger.json",
					content: JSON.stringify(eo.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/samlinger.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!z(ao).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push("samlinger");
		}
		let a = Object.entries(Z).filter(([, e]) => e.hasDraft());
		if (a.length || _o?.hasDraft()) {
			for (let [t, r] of a) {
				let i = JSON.parse(JSON.stringify(r.data));
				i.section && xp(i.section, e);
				for (let t of i.blocks ?? []) bp(t, e);
				for (let t of i.page?.sections ?? []) xp(t, e);
				e.push({
					path: `content/maler/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-mal-${t}`);
			}
			if (_o?.hasDraft()) {
				e.push({
					path: "content/maler.json",
					content: JSON.stringify(_o.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-maler");
				let t = { maler: [] };
				try {
					t = await (await fetch("/content/maler.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.maler ?? []) {
					let t = `content/maler/${n}.json`;
					!z(yo).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push("maler");
		}
		as?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(as.data, null, 2) + "\n",
			encoding: "utf-8"
		}), n.push("urd-draft-plugins"), t.push("plugins"));
		try {
			let t = await (await fetch("/index.html")).text();
			for (let n of z(D).pages) n.path !== "/" && e.push({
				path: `${n.path.slice(1)}/index.html`,
				content: t,
				encoding: "utf-8"
			});
		} catch {}
		e.push({
			path: "sitemap.xml",
			content: Zo(z(D).pages, location.origin),
			encoding: "utf-8"
		}), e.push({
			path: "robots.txt",
			content: Qo(location.origin),
			encoding: "utf-8"
		});
		let o = new Set(e.map((e) => e.path)), s = (t) => {
			o.has(t) || e.push({
				path: t,
				delete: !0
			});
		};
		for (let e of z(m).pages) {
			let t = z(D).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && s(`${e.path.slice(1)}/index.html`) : (s(e.file), e.path !== "/" && s(`${e.path.slice(1)}/index.html`));
		}
		let c = await Lr(e);
		if (!c.ok) {
			x(Y("status.publishAborted"), "error");
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
			e ? Pr = e : Ir(), Sp(T.data), Cp(z(D));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) je.add(e);
			if (P(m, JSON.parse(JSON.stringify(z(D))), !0), Oe = Yi("urd-draft-site", () => z(m), S), ke(), as) {
				let e = JSON.parse(JSON.stringify(as.data));
				as = Yi("urd-draft-plugins", () => e, S), gs();
			}
			if (eo) {
				for (let e of Object.values(to)) for (let t of e.data.entries) vp(t, []);
				let e = JSON.parse(JSON.stringify(eo.data));
				eo = Yi("urd-draft-samlinger", () => e, S), ro = {};
				for (let e of z(ao)) {
					if (!to[e]) continue;
					let t = JSON.parse(JSON.stringify(to[e].data));
					ro[e] = t, to[e] = Yi(`urd-draft-samling-${e}`, () => t, S);
				}
				Oo();
			}
			if (_o) {
				for (let e of Object.values(Z)) {
					e.data?.section && xp(e.data.section, []);
					for (let t of e.data?.blocks ?? []) bp(t, []);
					for (let t of e.data?.page?.sections ?? []) xp(t, []);
				}
				let e = JSON.parse(JSON.stringify(_o.data));
				_o = Yi("urd-draft-maler", () => e, S), Q = {};
				for (let e of z(yo)) {
					if (!Z[e]) continue;
					let t = JSON.parse(JSON.stringify(Z[e].data));
					Q[e] = t, Z[e] = Yi(`urd-draft-mal-${e}`, () => t, S);
				}
				xo();
			}
			P(te, {
				snap: !0,
				...z(D).grid
			}, !0);
			let t = JSON.parse(JSON.stringify(T.data));
			T = Yi(`urd-draft-${z(g)}`, () => t, S), je.has(z(g)) && C(`urd-draft-${z(g)}`, JSON.stringify(t)), O(), x(Y("status.published"), "ok");
		} else if (u?.status === 401) {
			let e = await u.json().catch(() => null);
			x(e?.code === "loginExpired" ? Y("status.loginExpired") : Y("status.loginRequired", { reason: Vi(e) ?? Y("status.unknownReason") }), "error"), await V();
		} else u?.status === 403 ? x(Vi(await u.json().catch(() => null)) ?? Y("status.noPublishAccess"), "error") : u?.status === 409 ? x(Y("status.publishRace"), "error") : x(u ? Vi(await u.json().catch(() => null)) ?? Y("status.publishFailed") : Y("status.publishUnavailable"), "error");
	}
	Xe();
	var Ap = cf();
	Tr("keydown", on, Ye), Tr("pointerdown", on, Ke);
	var jp = I(Ap), Mp = F(jp), Np = (e) => {
		var t = tu(), n = F(t);
		G(n, () => c.pencil);
		var r = L(n);
		k(t), R((e, n) => {
			J(t, "title", e), U(r, ` ${n ?? ""}`);
		}, [() => Y("tip.backToEdit"), () => Y("ui.edit")]), B("click", t, Lf), H(e, t);
	};
	W(Mp, (e) => {
		z(ne) || e(Np);
	});
	var Pp = L(Mp, 2);
	let Fp;
	var Ip = F(Pp), Lp = F(Ip), Rp = (e) => {
		var t = fu(), n = I(t), r = F(n, !0);
		k(n);
		var i = L(n, 2), a = F(i), o = (e) => {
			var t = iu(), n = F(t);
			let r;
			var i = F(n);
			G(i, () => c[`device_${z(ie)}`]), G(L(i), () => c.caret), k(n);
			var a = L(n, 2), o = (e) => {
				var t = ru();
				Kr(t, 21, () => re, (e) => e.id, (e, t) => {
					var n = nu();
					let r;
					var i = F(n);
					G(i, () => c[`device_${z(t).id}`]);
					var a = L(i);
					k(n), R((e, i) => {
						r = pi(n, 1, "ghost svelte-1n46o8q", null, r, { active: z(ie) === z(t).id }), J(n, "title", e), U(a, ` ${i ?? ""}`);
					}, [() => Y(`tip.view.${z(t).id}`, {
						w: z(t).width ?? z(pe),
						c: Xa(z(ca), z(la), z(t).width ?? z(pe)).width
					}), () => Y(`lbl.device.${z(t).id}`)]), B("click", n, () => {
						P(ie, z(t).id, !0), P(gi, null);
					}), H(e, n);
				}), k(t), H(e, t);
			};
			W(a, (e) => {
				z(gi) === "device" && e(o);
			}), k(t), R((e) => {
				r = pi(n, 1, "ghost svelte-1n46o8q", null, r, { active: z(gi) === "device" }), J(n, "title", e);
			}, [() => Y("lbl.group.device")]), B("click", n, () => P(gi, z(gi) === "device" ? null : "device", !0)), H(e, t);
		}, s = (e) => {
			var t = ou(), n = I(t), r = F(n, !0);
			k(n);
			var i = L(n, 2);
			Kr(i, 21, () => re, (e) => e.id, (e, t) => {
				var n = au();
				let r;
				G(n, () => c[`device_${z(t).id}`], !0), k(n), R((e) => {
					r = pi(n, 1, "ghost svelte-1n46o8q", null, r, { active: z(ie) === z(t).id }), J(n, "title", e);
				}, [() => Y(`tip.view.${z(t).id}`, {
					w: z(t).width ?? z(pe),
					c: Xa(z(ca), z(la), z(t).width ?? z(pe)).width
				})]), B("click", n, () => P(ie, z(t).id, !0)), H(e, n);
			}), k(i), R((e) => U(r, e), [() => Y("lbl.group.device")]), H(e, t);
		};
		W(a, (e) => {
			vi.device ? e(o) : e(s, -1);
		});
		var l = L(a, 2), u = (e) => {
			var t = cu(), n = F(t);
			let r;
			var i = F(n), a = F(i);
			k(i), G(L(i), () => c.caret), k(n);
			var o = L(n, 2), s = (e) => {
				var t = su(), n = F(t), r = F(n);
				G(r, () => c.minus, !0), k(r);
				var i = L(r, 2), a = F(i);
				k(i);
				var o = L(i, 2);
				G(o, () => c.plus, !0), k(o), k(n);
				var s = L(n, 2);
				let l;
				var u = F(s);
				G(u, () => c.fit);
				var d = L(u);
				k(s), k(t), R((e, t, n, c, u, f) => {
					J(r, "title", e), J(i, "title", t), U(a, `${n ?? ""}%`), J(o, "title", c), l = pi(s, 1, "ghost svelte-1n46o8q", null, l, { active: z(de) === "fit" }), J(s, "title", u), U(d, ` ${f ?? ""}`);
				}, [
					() => Y("tip.zoomOut"),
					() => Y("tip.zoomCurrent"),
					() => Math.round(z(ge) * 100),
					() => Y("tip.zoomIn"),
					() => Y("tip.zoomFit"),
					() => Y("lbl.zoom.fit")
				]), B("click", r, () => _e(-1)), B("click", o, () => _e(1)), B("click", s, () => P(de, "fit")), H(e, t);
			};
			W(o, (e) => {
				z(gi) === "zoom" && e(s);
			}), k(t), R((e, t) => {
				r = pi(n, 1, "ghost svelte-1n46o8q", null, r, { active: z(gi) === "zoom" }), J(n, "title", e), U(a, `${t ?? ""}%`);
			}, [() => Y("lbl.group.zoom"), () => Math.round(z(ge) * 100)]), B("click", n, () => P(gi, z(gi) === "zoom" ? null : "zoom", !0)), H(e, t);
		}, d = (e) => {
			var t = lu(), n = I(t), r = F(n, !0);
			k(n);
			var i = L(n, 2), a = F(i);
			G(a, () => c.minus, !0), k(a);
			var o = L(a, 2), s = F(o);
			k(o);
			var l = L(o, 2);
			G(l, () => c.plus, !0), k(l);
			var u = L(l, 2);
			let d;
			G(u, () => c.fit, !0), k(u), k(i), R((e, t, n, i, c, f) => {
				U(r, e), J(a, "title", t), J(o, "title", n), U(s, `${i ?? ""}%`), J(l, "title", c), d = pi(u, 1, "ghost svelte-1n46o8q", null, d, { active: z(de) === "fit" }), J(u, "title", f);
			}, [
				() => Y("lbl.group.zoom"),
				() => Y("tip.zoomOut"),
				() => Y("tip.zoomCurrent"),
				() => Math.round(z(ge) * 100),
				() => Y("tip.zoomIn"),
				() => Y("tip.zoomFit")
			]), B("click", a, () => _e(-1)), B("click", l, () => _e(1)), B("click", u, () => P(de, "fit")), H(e, t);
		};
		W(l, (e) => {
			vi.zoom ? e(u) : e(d, -1);
		});
		var f = L(l, 2), p = (e) => {
			var t = iu(), n = F(t);
			let r;
			var i = F(n);
			G(i, () => c.gridToggle), G(L(i), () => c.caret), k(n);
			var a = L(n, 2), o = (e) => {
				var t = uu(), n = F(t);
				let r;
				var i = F(n);
				G(i, () => c.gridToggle);
				var a = L(i);
				k(n);
				var o = L(n, 2);
				let s;
				var l = F(o);
				G(l, () => c.guides);
				var u = L(l);
				k(o), k(t), R((e, t, i, c) => {
					r = pi(n, 1, "ghost svelte-1n46o8q", null, r, { active: z(xi) }), J(n, "title", e), U(a, ` ${t ?? ""}`), s = pi(o, 1, "ghost svelte-1n46o8q", null, s, { active: z(ci) }), J(o, "title", i), U(u, ` ${c ?? ""}`);
				}, [
					() => Y("tip.gridToggle"),
					() => Y("lbl.view.grid"),
					() => Y("tip.guides"),
					() => Y("lbl.view.guides")
				]), B("click", n, Si), B("click", o, yi), H(e, t);
			};
			W(a, (e) => {
				z(gi) === "view" && e(o);
			}), k(t), R((e) => {
				r = pi(n, 1, "ghost svelte-1n46o8q", null, r, { active: z(gi) === "view" || z(xi) || z(ci) }), J(n, "title", e);
			}, [() => Y("lbl.group.view")]), B("click", n, () => P(gi, z(gi) === "view" ? null : "view", !0)), H(e, t);
		}, m = (e) => {
			var t = du(), n = I(t), r = F(n, !0);
			k(n);
			var i = L(n, 2), a = F(i);
			let o;
			G(a, () => c.gridToggle, !0), k(a);
			var s = L(a, 2);
			let l;
			G(s, () => c.guides, !0), k(s), k(i), R((e, t, n) => {
				U(r, e), o = pi(a, 1, "ghost svelte-1n46o8q", null, o, { active: z(xi) }), J(a, "title", t), l = pi(s, 1, "ghost svelte-1n46o8q", null, l, { active: z(ci) }), J(s, "title", n);
			}, [
				() => Y("lbl.group.view"),
				() => Y("tip.gridToggle"),
				() => Y("tip.guides")
			]), B("click", a, Si), B("click", s, yi), H(e, t);
		};
		W(f, (e) => {
			vi.view ? e(p) : e(m, -1);
		}), k(i), Oi(i, (e) => P(_i, e), () => z(_i)), R((e, t) => {
			J(n, "title", e), U(r, t);
		}, [() => Y("tip.switchPage"), () => Me()?.title ?? ""]), B("click", n, () => St("pages")), H(e, t);
	};
	W(Lp, (e) => {
		z(m) && e(Rp);
	});
	var zp = L(Lp, 2), Bp = (e) => {
		var t = pu(), n = F(t);
		G(n, () => c.phone);
		var r = L(n, 2), i = F(r, !0);
		k(r);
		var a = L(r, 2), o = F(a, !0);
		k(a), k(t), R((e, n) => {
			J(t, "title", e), U(i, n), U(o, z(Se));
		}, [() => Y("tip.attention"), () => Y(z(Se) === 1 ? "ui.attentionOne" : "ui.attentionMany", { n: z(Se) })]), B("click", t, we), H(e, t);
	};
	W(zp, (e) => {
		z(Se) > 0 && e(Bp);
	}), k(Ip);
	var Vp = L(Ip, 2), Hp = F(Vp), Up = (e) => {
		var t = hu(), n = F(t), r = F(n), i = F(r, !0);
		k(r), Ie(2), k(n);
		var a = L(n, 2), o = F(a);
		let s;
		var l = F(o);
		G(l, () => c.restore);
		var u = L(l), d = F(u, !0);
		k(u), k(o);
		var f = L(o, 2), p = (e) => {
			var t = mu(), n = F(t);
			G(n, () => c.restore);
			var r = L(n);
			k(t), R((e, n) => {
				J(t, "title", e), U(r, ` ${n ?? ""}`);
			}, [() => Y("tip.discardArmed"), () => Y("ui.discardConfirm")]), B("click", t, Dp), H(e, t);
		};
		W(f, (e) => {
			z(wp) && e(p);
		}), k(a), Oi(a, (e) => P(Tp, e), () => z(Tp)), k(t), R((e, t, r, a, c) => {
			J(n, "title", e), J(n, "aria-label", t), U(i, r), s = pi(o, 1, "discard-dot svelte-1n46o8q", null, s, { armed: z(wp) }), J(o, "title", a), U(d, c);
		}, [
			() => Y("ui.unpublished"),
			() => Y("ui.unpublished"),
			() => Y("ui.unpublished"),
			() => z(wp) ? Y("tip.discardArmed") : Y("tip.discard"),
			() => Y("ui.discard")
		]), B("click", o, Ep), oi(2, t, () => Ji, () => ({
			x: 24,
			duration: Dt ? 0 : 150
		})), H(e, t);
	};
	W(Hp, (e) => {
		z(_) && e(Up);
	}), k(Vp);
	var Wp = L(Vp, 2), Gp = F(Wp), Kp = (e) => {
		var t = yu(), n = I(t), r = F(n), i = (e) => {
			var t = gu(), n = I(t);
			G(n, () => c.eye);
			var r = L(n, 2), i = F(r, !0);
			k(r), R((e) => U(i, e), [() => Y("ui.cleanView")]), H(e, t);
		}, a = (e) => {
			var t = gu(), n = I(t);
			G(n, () => c.pencil);
			var r = L(n, 2), i = F(r, !0);
			k(r), R((e) => U(i, e), [() => Y("ui.edit")]), H(e, t);
		};
		W(r, (e) => {
			z(ne) ? e(i) : e(a, -1);
		}), k(n);
		var o = L(n, 2), s = (e) => {
			var t = _u(), n = F(t), r = (e) => {
				var t = Fr();
				G(I(t), () => c.warn), H(e, t);
			};
			W(n, (e) => {
				z(ee).allowed || e(r);
			});
			var i = L(n, 1, !0);
			k(t), R((e) => {
				J(t, "title", e), U(i, z(ee).login);
			}, [() => z(ee).allowed ? Y("tip.hasPublishAccess") : Y("tip.noPublishAccess")]), H(e, t);
		}, l = (e) => {
			var t = vu(), n = F(t, !0);
			k(t), R((e) => U(n, e), [() => Y("ui.loginGitHub")]), H(e, t);
		};
		W(o, (e) => {
			z(ee)?.loggedIn ? e(s) : z(ee) && e(l, 1);
		});
		var u = L(o, 2), d = F(u);
		G(d, () => c.external);
		var f = L(d, 2), p = F(f, !0);
		k(f), k(u);
		var m = L(u, 2), h = F(m, !0);
		k(m), R((e, t, r, i, a) => {
			J(n, "title", e), J(u, "href", t), J(u, "title", r), U(p, i), m.disabled = !z(_), U(h, a);
		}, [
			() => z(ne) ? Y("tip.chromeHide") : Y("tip.chromeShow"),
			() => Me()?.path ?? "/",
			() => Y("ui.viewSite"),
			() => Y("ui.viewSite"),
			() => Y("ui.publish")
		]), B("click", n, Lf), B("click", m, kp), H(e, t);
	};
	W(Gp, (e) => {
		z(m) && e(Kp);
	}), k(Wp), k(Pp);
	var qp = L(Pp, 2), Jp = (e) => {
		var t = ef(), i = F(t), o = (e) => {
			var t = $d(), i = I(t), o = F(i);
			Kr(o, 17, () => dt, Hr, (e, t, n) => {
				var r = xu(), i = I(r), a = F(i, !0);
				k(i), Kr(L(i, 2), 16, () => z(t), (e) => e, (e, t) => {
					var n = bu();
					let r;
					var i = F(n, !0);
					k(n), R(() => {
						r = pi(n, 1, "svelte-1n46o8q", null, r, { active: z(ct) === t }), U(i, pt[t]);
					}), B("click", n, () => St(t)), H(e, n);
				}), R((e) => U(a, e), [() => Y(ft[n])]), H(e, r);
			});
			var s = L(o, 2), d = L(F(s), 2);
			let p;
			G(d, () => c.gear, !0), k(d);
			var m = L(d, 2), _ = (e) => {
				var t = Su(), n = F(t), r = F(n, !0);
				k(n);
				var i = L(n, 2), a = F(i);
				X(L(a), {
					get value() {
						return z(u);
					},
					get options() {
						return l;
					},
					onchange: (e) => P(u, e, !0)
				}), k(i);
				var o = L(i, 2), s = F(o), c = L(s);
				{
					let e = /* @__PURE__ */ j(() => [["auto", Y("lang.auto")], ...vt()]);
					X(c, {
						get value() {
							return bt;
						},
						get options() {
							return z(e);
						},
						onchange: xt
					});
				}
				k(o);
				var d = L(o, 2), f = F(d), p = L(f);
				{
					let e = /* @__PURE__ */ j(() => [["strip", Y("settings.layoutPickerStrip")], ["menu", Y("settings.layoutPickerMenu")]]);
					X(p, {
						get value() {
							return z(ui);
						},
						get options() {
							return z(e);
						},
						onchange: di
					});
				}
				k(d), k(t), R((e, t, n, c, l, u, p) => {
					U(r, e), J(i, "title", t), U(a, `${n ?? ""} `), J(o, "title", c), U(s, `${l ?? ""} `), J(d, "title", u), U(f, `${p ?? ""} `);
				}, [
					() => Y("settings.title"),
					() => Y("topbar.adminTheme.title"),
					() => Y("settings.theme"),
					() => Y("topbar.language.title"),
					() => Y("settings.language"),
					() => Y("tip.settings.layoutPicker"),
					() => Y("settings.layoutPicker")
				]), H(e, t);
			};
			W(m, (e) => {
				z(li) && e(_);
			}), k(s), Oi(s, (e) => P(fi, e), () => z(fi)), k(i);
			var v = L(i, 2), y = (e) => {
				var t = Qd(), i = F(t), o = F(i, !0);
				k(i);
				var s = L(i, 2), l = (e) => {
					var t = Nu(), n = F(t);
					Kr(n, 17, () => z(D).pages, (e) => e.id, (e, t) => {
						var n = Ou();
						let r;
						var i = F(n);
						K(i);
						var a = L(i, 2), o = (e) => {
							var t = Cu();
							R((e) => J(t, "title", e), [() => Y("tip.pages.homeLocked")]), H(e, t);
						}, s = (e) => {
							var n = wu();
							K(n), R((e, t) => {
								q(n, e), J(n, "title", t);
							}, [() => z(t).path.slice(1), () => Y("tip.pages.slug")]), B("change", n, (e) => Xi(z(t), e.target.value)), H(e, n);
						};
						W(a, (e) => {
							z(t).path === "/" ? e(o) : e(s, -1);
						});
						var l = L(a, 2), u = (e) => {
							var t = Tu();
							G(t, () => c.warn, !0), k(t), R((e) => J(t, "title", e), [() => Y("tip.pages.missingDescription")]), H(e, t);
						};
						W(l, (e) => {
							z(Ui)[z(t).id] && e(u);
						});
						var d = L(l, 2), f = F(d);
						G(f, () => c.right, !0), k(f);
						var p = L(f, 2), m = F(p);
						G(m, () => c.kebab, !0), k(m);
						var h = L(m, 2), _ = (e) => {
							var n = Du(), r = F(n), i = F(r);
							G(i, () => c.bookmark);
							var a = L(i);
							k(r);
							var o = L(r, 2), s = (e) => {
								var n = Eu(), r = F(n);
								G(r, () => c.cross);
								var i = L(r);
								k(n), R((e, t) => {
									J(n, "title", e), U(i, ` ${t ?? ""}`);
								}, [() => Y("tip.pages.delete"), () => Y("ui.deletePage")]), B("click", n, () => {
									P(ji, null), Zi(z(t));
								}), H(e, n);
							};
							W(o, (e) => {
								z(t).path !== "/" && e(s);
							}), k(n), R((e) => U(a, ` ${e ?? ""}`), [() => Y("ui.savePageTemplate")]), B("click", r, () => Fi(z(t))), H(e, n);
						};
						W(h, (e) => {
							z(ji) === z(t).id && e(_);
						}), k(p), k(d), k(n), R((e, a, o) => {
							r = pi(n, 1, "page-row svelte-1n46o8q", null, r, { current: z(t).id === z(g) }), q(i, z(t).title), J(i, "title", e), J(f, "title", a), f.disabled = z(t).id === z(g), J(m, "title", o);
						}, [
							() => Y("tip.pages.title"),
							() => Y("tip.pages.open"),
							() => Y("tip.pages.menu")
						]), B("change", i, (e) => Ii(z(t), e.target.value)), B("click", f, () => ii(z(t).id)), B("click", m, () => P(ji, z(ji) === z(t).id ? null : z(t).id, !0)), H(e, n);
					});
					var r = L(n, 2), i = F(r), a = F(i, !0);
					k(i);
					var o = L(i, 2), s = F(o), l = F(s), u = L(l);
					ut(u), k(s);
					var d = L(s, 2), f = F(d), p = L(f);
					K(p), k(d);
					var m = L(d, 2), h = F(m), _ = L(h);
					ut(_), k(m);
					var v = L(m, 2), y = F(v), b = L(y), x = (e) => {
						var t = ku();
						R((e) => {
							J(t, "src", z(Li).ogImage), J(t, "alt", e);
						}, [() => Y("lbl.ogImage")]), H(e, t);
					};
					W(b, (e) => {
						z(Li).ogImage && e(x);
					}), k(v);
					var S = L(v, 2), C = F(S), w = F(C), ee = L(w);
					k(C);
					var te = L(C, 2), ne = (e) => {
						var t = Ic();
						G(t, () => c.cross, !0), k(t), R((e) => J(t, "title", e), [() => Y("tip.seo.removeOgImage")]), B("click", t, () => zi("ogImage", "")), H(e, t);
					};
					W(te, (e) => {
						z(Li).ogImage && e(ne);
					}), k(S);
					var re = L(S, 2), ie = F(re);
					K(ie);
					var ae = L(ie);
					k(re), k(o), k(r);
					var oe = L(r, 4);
					K(oe);
					var se = L(oe, 2), ce = F(se, !0);
					k(se);
					var le = L(se, 2), ue = F(le, !0);
					k(le);
					var de = L(le, 2), fe = F(de);
					let pe;
					var me = F(fe), he = F(me);
					G(he, () => bs({ sections: [] }), !0), k(he);
					var ge = L(he, 2), _e = F(ge, !0);
					k(ge), k(me), k(fe), Kr(L(fe, 2), 17, () => Ss, (e) => e.id, (e, t) => {
						var n = Au();
						let r;
						var i = F(n), a = F(i);
						G(a, () => ki[z(t).id], !0), k(a);
						var o = L(a, 2), s = F(o, !0);
						k(o), k(i), k(n), R((e, a) => {
							r = pi(n, 1, "page-mal-card svelte-1n46o8q", null, r, { picked: z(Di) === `preset:${z(t).id}` }), J(i, "title", e), U(s, a);
						}, [() => Y("tip.pages.templatePick", { name: Y(z(t).labelKey) }), () => Y(z(t).labelKey)]), B("click", i, () => P(Di, z(Di) === `preset:${z(t).id}` ? null : `preset:${z(t).id}`, !0)), H(e, n);
					}), k(de);
					var ve = L(de, 2), ye = (e) => {
						var t = Mu(), n = I(t), r = F(n, !0);
						k(n);
						var i = L(n, 2);
						Kr(i, 20, () => z(yo).filter((e) => Z[e]?.data?.mal?.kind === "page"), (e) => e, (e, t) => {
							var n = ju();
							let r;
							var i = F(n), a = F(i);
							G(a, () => bs(Z[t].data.page), !0), k(a);
							var o = L(a, 2), s = F(o, !0);
							k(o), k(i);
							var l = L(i, 2);
							G(l, () => c.cross, !0), k(l), k(n), R((e, a) => {
								r = pi(n, 1, "page-mal-card svelte-1n46o8q", null, r, { picked: z(Di) === t }), J(i, "title", e), U(s, Z[t].data.mal.name), J(l, "title", a);
							}, [() => Y("tip.pages.templatePick", { name: Z[t].data.mal.name }), () => Y("canvas.deleteTemplate")]), B("click", i, () => P(Di, z(Di) === t ? null : t, !0)), B("click", l, () => Eo({ id: t })), H(e, n);
						}), k(i), R((e) => {
							U(r, e), hi(i, z(Ai));
						}, [() => Y("canvas.tabMyTemplates")]), H(e, t);
					}, be = /* @__PURE__ */ j(() => z(yo).some((e) => Z[e]?.data?.mal?.kind === "page"));
					W(ve, (e) => {
						z(be) && e(ye);
					}), k(t), R((e, t, n, r, i, o, c, g, b, x, S, ee, te, ne, le, he, ge, ve, ye, be, xe, Se) => {
						U(a, e), J(s, "title", t), U(l, `${n ?? ""} `), q(u, z(Li).description), J(d, "title", r), U(f, `${i ?? ""} `), q(p, z(Li).ogTitle), J(p, "placeholder", o), J(m, "title", c), U(h, `${g ?? ""} `), q(_, z(Li).ogDescription), J(_, "placeholder", z(Li).description), J(v, "title", b), U(y, `${x ?? ""} `), J(C, "title", S), U(w, `${ee ?? ""} `), J(re, "title", te), bi(ie, ne), U(ae, ` ${le ?? ""}`), J(oe, "placeholder", he), J(se, "title", ge), se.disabled = ve, U(ce, ye), U(ue, be), hi(de, z(Ai)), pe = pi(fe, 1, "page-mal-card svelte-1n46o8q", null, pe, { picked: z(Di) === null }), J(me, "title", xe), U(_e, Se);
					}, [
						() => Y("ui.seoGroup", { page: z(D).pages.find((e) => e.id === z(g))?.title ?? "" }),
						() => Y("tip.seo.description"),
						() => Y("lbl.seoDescription"),
						() => Y("tip.seo.ogTitle"),
						() => Y("lbl.ogTitle"),
						() => z(D).pages.find((e) => e.id === z(g))?.title ?? "",
						() => Y("tip.seo.ogDescription"),
						() => Y("lbl.ogDescription"),
						() => Y("tip.seo.ogImage"),
						() => Y("lbl.ogImage"),
						() => Y("tip.seo.ogImage"),
						() => z(Li).ogImage ? Y("ui.changeImage") : Y("ui.chooseImage"),
						() => Y("tip.seo.hideFromSearch"),
						() => z(D).pages.find((e) => e.id === z(g))?.noindex === !0,
						() => Y("lbl.hideFromSearch"),
						() => Y("ph.newPageName"),
						() => Y("hint.pages.autoMenu"),
						() => !z(Ei).trim(),
						() => Y("ui.createPage"),
						() => Y("canvas.tabPresets"),
						() => Y("tip.pages.blankPick"),
						() => Y("ui.blankPage")
					]), B("change", u, (e) => zi("description", e.target.value)), B("change", p, (e) => zi("ogTitle", e.target.value)), B("change", _, (e) => zi("ogDescription", e.target.value)), B("change", ee, Gi), B("change", ie, (e) => Bi(e.target.checked)), B("keydown", oe, (e) => e.key === "Enter" && Pi()), wi(oe, () => z(Ei), (e) => P(Ei, e)), B("click", se, Pi), B("click", me, () => P(Di, null)), H(e, t);
				}, u = (e) => {
					var t = Bu(), r = F(t), i = F(r), a = F(i, !0);
					k(i);
					var o = L(i, 2), s = F(o), l = F(s), u = L(l);
					{
						let e = /* @__PURE__ */ j(() => z(D).nav.logo?.type ?? "text"), t = /* @__PURE__ */ j(() => [
							["text", Y("blocks.text")],
							["image", Y("blocks.image")],
							["both", Y("opt.logo.both")]
						]);
						X(u, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => $i(e)
						});
					}
					k(s);
					var d = L(s, 2), f = (e) => {
						var t = Pu(), n = I(t);
						K(n);
						var r = L(n, 2), i = F(r);
						{
							let e = /* @__PURE__ */ j(() => Y("tip.nav.logoFont")), t = /* @__PURE__ */ j(() => z(D).nav.logo?.font ?? ""), n = /* @__PURE__ */ j(() => [["", Y("common.inherit")], ...Nc.map(([e, t]) => [t, Y(e)])]);
							X(i, {
								get title() {
									return z(e);
								},
								get value() {
									return z(t);
								},
								get options() {
									return z(n);
								},
								onchange: (e) => Qi({ font: e || void 0 })
							});
						}
						var a = L(i, 2);
						K(a);
						var o = L(a, 2);
						let s;
						var c = F(o), l = F(c, !0);
						k(c), k(o);
						var u = L(o, 2);
						let d;
						var f = F(u), p = F(f, !0);
						k(f), k(u), k(r), R((e, t, r, i, c, f, m) => {
							q(n, z(D).nav.logo?.value ?? ""), J(n, "placeholder", e), J(a, "title", t), q(a, z(D).nav.logo?.textSize ?? ""), s = pi(o, 1, "tbtn svelte-1n46o8q", null, s, { active: z(D).nav.logo?.bold !== !1 }), J(o, "title", r), U(l, i), d = pi(u, 1, "tbtn svelte-1n46o8q", null, d, c), J(u, "title", f), U(p, m);
						}, [
							() => Y("ph.nav.logoName"),
							() => Y("tip.nav.textSize"),
							() => Y("format.bold"),
							() => Y("format.boldLetter"),
							() => ({ active: !!z(D).nav.logo?.italic }),
							() => Y("format.italic"),
							() => Y("format.italicLetter")
						]), B("input", n, (e) => Qi({ value: e.target.value })), B("change", a, (e) => Qi({ textSize: e.target.value ? Number(e.target.value) : void 0 })), B("click", o, () => Qi({ bold: z(D).nav.logo?.bold === !1 })), B("click", u, () => Qi({ italic: !z(D).nav.logo?.italic })), H(e, t);
					};
					W(d, (e) => {
						(z(D).nav.logo?.type ?? "text") !== "image" && e(f);
					});
					var p = L(d, 2), m = (e) => {
						var t = Fu(), n = F(t), r = F(n), i = L(r);
						k(n);
						var a = L(n, 2);
						K(a);
						var o = L(a, 2);
						K(o), k(t), R((e, t, i, s) => {
							J(n, "title", e), U(r, `${t ?? ""} `), J(a, "title", i), q(a, z(D).nav.logo?.size ?? 32), J(o, "title", s), q(o, z(D).nav.logo?.radius ?? 0);
						}, [
							() => Y("tip.webpAuto"),
							() => (z(D).nav.logo?.type === "image" ? z(D).nav.logo?.value : z(D).nav.logo?.image) ? Y("ui.changeImage") : Y("ui.chooseImage"),
							() => Y("tip.nav.logoHeight"),
							() => Y("tip.nav.logoRadius")
						]), B("change", i, ea), B("change", a, (e) => Qi({ size: Number(e.target.value) })), B("change", o, (e) => Qi({ radius: Number(e.target.value) })), H(e, t);
					};
					W(p, (e) => {
						(z(D).nav.logo?.type ?? "text") !== "text" && e(m);
					});
					var h = L(p, 2), g = (e) => {
						var t = Qc(), n = F(t), r = L(n);
						{
							let e = /* @__PURE__ */ j(() => z(D).nav.logo?.order ?? "image-first"), t = /* @__PURE__ */ j(() => [["image-first", Y("opt.logo.imageFirst")], ["text-first", Y("opt.logo.textFirst")]]);
							X(r, {
								get value() {
									return z(e);
								},
								get options() {
									return z(t);
								},
								onchange: (e) => Qi({ order: e })
							});
						}
						k(t), R((e) => U(n, `${e ?? ""} `), [() => Y("lbl.order")]), H(e, t);
					};
					W(h, (e) => {
						z(D).nav.logo?.type === "both" && e(g);
					}), k(o), k(r);
					var _ = L(r, 2), v = F(_), y = F(v, !0);
					k(v);
					var b = L(v, 2), x = F(b), S = F(x), C = L(S);
					{
						let e = /* @__PURE__ */ j(() => z(D).nav.variant ?? "bar"), t = /* @__PURE__ */ j(() => [
							["bar", Y("opt.navVariant.bar")],
							["floating", Y("opt.navVariant.floating")],
							["floating-square", Y("opt.navVariant.floatingSquare")],
							["floating-tab", Y("opt.navVariant.floatingTab")],
							["side-left", Y("opt.navVariant.sideLeft")],
							["side-right", Y("opt.navVariant.sideRight")]
						]);
						X(C, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => Ra(e)
						});
					}
					k(x);
					var w = L(x, 2), ee = (e) => {
						var t = Iu(), n = I(t), r = F(n);
						K(r);
						var i = L(r);
						k(n);
						var a = L(n, 2), o = F(a);
						K(o);
						var s = L(o);
						k(a), R((e, t, c, l) => {
							J(n, "title", e), bi(r, z(D).nav.style?.glow === !0), U(i, ` ${t ?? ""}`), J(a, "title", c), bi(o, z(D).nav.style?.topGap !== !1), U(s, ` ${l ?? ""}`);
						}, [
							() => Y("tip.nav.glow"),
							() => Y("lbl.navGlow"),
							() => Y("tip.nav.topGap"),
							() => Y("lbl.navTopGap")
						]), B("change", r, (e) => Va(e.target.checked)), B("change", o, (e) => Qa(e.target.checked)), H(e, t);
					};
					W(w, (e) => {
						z(Fa) && e(ee);
					});
					var te = L(w, 2), ne = (e) => {
						var t = ll(), n = F(t);
						K(n);
						var r = L(n);
						k(t), R((e, i) => {
							J(t, "title", e), bi(n, z(D).nav.overlay === !0), U(r, ` ${i ?? ""}`);
						}, [() => Y("tip.nav.overlay"), () => Y("lbl.navOverlay")]), B("change", n, (e) => Ti("nav", () => {
							e.target.checked ? z(D).nav.overlay = !0 : delete z(D).nav.overlay;
						})), H(e, t);
					};
					W(te, (e) => {
						!z(Fa) && !z(Pa) && e(ne);
					});
					var re = L(te, 2), ie = (e) => {
						var t = Qc(), n = F(t), r = L(n);
						{
							let e = /* @__PURE__ */ j(() => z(D).nav.style?.sideAlign ?? "left"), t = /* @__PURE__ */ j(() => [
								["left", Y("common.left")],
								["center", Y("common.center")],
								["right", Y("common.right")]
							]);
							X(r, {
								get value() {
									return z(e);
								},
								get options() {
									return z(t);
								},
								onchange: (e) => Na("sideAlign", e === "left" ? void 0 : e)
							});
						}
						k(t), R((e, r) => {
							J(t, "title", e), U(n, `${r ?? ""} `);
						}, [() => Y("tip.nav.sideAlign"), () => Y("lbl.textAlign")]), H(e, t);
					};
					W(re, (e) => {
						z(Pa) && e(ie);
					});
					var ae = L(re, 2), oe = F(ae);
					K(oe);
					var se = L(oe);
					k(ae);
					var ce = L(ae, 2), le = F(ce), ue = L(le);
					{
						let e = /* @__PURE__ */ j(() => z(D).nav.style?.size ?? "md"), t = /* @__PURE__ */ j(() => [
							["sm", Y("opt.size.sm")],
							["md", Y("opt.size.md")],
							["lg", Y("opt.size.lg")],
							["xl", Y("opt.size.xl")]
						]);
						X(ue, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => Na("size", e === "md" ? void 0 : e)
						});
					}
					k(ce);
					var de = L(ce, 2), fe = F(de), pe = L(fe), me = (e) => {
						{
							let t = /* @__PURE__ */ j(() => z(D).nav.style?.sidePlacement ?? "top"), n = /* @__PURE__ */ j(() => [
								["top", Y("opt.place.top")],
								["middle", Y("opt.place.middle")],
								["bottom", Y("opt.place.bottom")]
							]);
							X(e, {
								get value() {
									return z(t);
								},
								get options() {
									return z(n);
								},
								onchange: (e) => Na("sidePlacement", e === "top" ? void 0 : e)
							});
						}
					}, he = (e) => {
						{
							let t = /* @__PURE__ */ j(() => z(D).nav.layout ?? "right"), n = /* @__PURE__ */ j(() => [
								["right", Y("common.right")],
								["center", Y("common.center")],
								["left", Y("opt.layout.leftAfterLogo")]
							]);
							X(e, {
								get value() {
									return z(t);
								},
								get options() {
									return z(n);
								},
								onchange: (e) => Ma(e)
							});
						}
					};
					W(pe, (e) => {
						z(Pa) ? e(me) : e(he, -1);
					}), k(de);
					var ge = L(de, 2), _e = (e) => {
						var t = Lu(), n = I(t), r = F(n);
						K(r);
						var i = L(r);
						k(n);
						var a = L(n, 2), o = (e) => {
							var t = Qc(), n = F(t), r = L(n);
							{
								let e = /* @__PURE__ */ j(() => z(D).nav.scroll ?? "none"), t = /* @__PURE__ */ j(() => [
									["none", Y("opt.scroll.none")],
									["shrink", Y("opt.scroll.shrink")],
									["hide", Y("opt.scroll.hide")]
								]);
								X(r, {
									get value() {
										return z(e);
									},
									get options() {
										return z(t);
									},
									onchange: (e) => Ti("nav", () => {
										e === "none" ? delete z(D).nav.scroll : z(D).nav.scroll = e;
									})
								});
							}
							k(t), R((e, r) => {
								J(t, "title", e), U(n, `${r ?? ""} `);
							}, [() => Y("tip.nav.scroll"), () => Y("lbl.navScroll")]), H(e, t);
						};
						W(a, (e) => {
							z(D).nav.sticky !== !1 && e(o);
						}), R((e, t) => {
							J(n, "title", e), bi(r, z(D).nav.sticky !== !1), U(i, ` ${t ?? ""}`);
						}, [() => Y("tip.nav.sticky"), () => Y("lbl.navSticky")]), B("change", r, (e) => Ti("nav", () => {
							z(D).nav.sticky = e.target.checked;
						})), H(e, t);
					};
					W(ge, (e) => {
						z(Pa) || e(_e);
					});
					var ve = L(ge, 2), ye = F(ve);
					K(ye);
					var be = L(ye);
					k(ve);
					var xe = L(ve, 2), Se = (e) => {
						var t = Qc(), n = F(t), r = L(n);
						{
							let e = /* @__PURE__ */ j(() => z(D).nav.cart?.href ?? ""), t = /* @__PURE__ */ j(() => [["", Y("common.none")], ...z(D).pages.map((e) => [e.path, e.title])]);
							X(r, {
								get value() {
									return z(e);
								},
								get options() {
									return z(t);
								},
								onchange: (e) => Ti("nav", () => {
									e ? z(D).nav.cart.href = e : delete z(D).nav.cart.href;
								})
							});
						}
						k(t), R((e, r) => {
							J(t, "title", e), U(n, `${r ?? ""} `);
						}, [() => Y("tip.handlekurv.checkout"), () => Y("lbl.checkoutPage")]), H(e, t);
					};
					W(xe, (e) => {
						z(D).nav.cart?.show && e(Se);
					});
					var Ce = L(xe, 2), we = F(Ce), Te = L(we);
					{
						let e = /* @__PURE__ */ j(() => z(D).nav.style?.hover ?? "standard"), t = /* @__PURE__ */ j(() => [
							["standard", Y("opt.hover.standard")],
							["underline", Y("opt.hover.underline")],
							["pill", Y("opt.hover.pill")],
							["lift-plain", Y("opt.hover.liftPlain")],
							["lift", Y("opt.hover.lift")]
						]);
						X(Te, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => $a(e)
						});
					}
					k(Ce);
					var Ee = L(Ce, 2), De = (e) => {
						var t = Ru(), n = I(t), r = F(n), i = L(r), a = F(i);
						k(i), k(n);
						var o = L(n, 2);
						K(o), R((e, t, i) => {
							J(n, "title", e), U(r, `${t ?? ""} `), U(a, `${i ?? ""}%`), q(o, z(D).nav.style?.hoverGlow ?? .6);
						}, [
							() => Y("tip.nav.hoverGlow"),
							() => Y("lbl.glowStrength"),
							() => Math.round((z(D).nav.style?.hoverGlow ?? .6) * 100)
						]), B("input", o, (e) => Na("hoverGlow", Number(e.target.value))), H(e, t);
					};
					W(Ee, (e) => {
						z(D).nav.style?.hover === "lift" && e(De);
					});
					var T = L(Ee, 2), Oe = (e) => {
						var t = Qc(), n = F(t), r = L(n);
						{
							let e = /* @__PURE__ */ j(() => z(D).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ j(sr);
							sa(r, {
								get value() {
									return z(e);
								},
								get tokens() {
									return z(t);
								},
								get label() {
									return z(La)[1];
								},
								onchange: (e) => Na("hoverColor", e)
							});
						}
						k(t), R(() => {
							J(t, "title", z(La)[1]), U(n, `${z(La)[0] ?? ""} `);
						}), H(e, t);
					};
					W(T, (e) => {
						z(La) && e(Oe);
					});
					var E = L(T, 2), ke = F(E), Ae = L(ke);
					{
						let e = /* @__PURE__ */ j(() => z(D).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ j(sr), n = /* @__PURE__ */ j(() => Y("tip.nav.hoverTextColorPick"));
						sa(Ae, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => Na("hoverTextColor", e)
						});
					}
					k(E);
					var je = L(E, 2), Me = F(je), O = L(Me);
					{
						let e = /* @__PURE__ */ j(() => z(D).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ j(sr), n = /* @__PURE__ */ j(() => Y("tip.nav.textColorPick"));
						sa(O, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => Na("textColor", e)
						});
					}
					k(je);
					var Ne = L(je, 4), Pe = F(Ne, !0);
					k(Ne);
					var Fe = L(Ne, 2);
					n(Fe, () => nr, () => z(D).nav?.style?.background?.layers ?? []), k(b), k(_);
					var Ie = L(_, 2), Le = F(Ie), Re = F(Le, !0);
					k(Le);
					var ze = L(Le, 2), Be = F(ze), Ve = F(Be), He = L(Ve);
					{
						let e = /* @__PURE__ */ j(() => z(D).nav.style?.subStyle ?? "card"), t = /* @__PURE__ */ j(() => z(Pa) ? [
							["card", Y("common.standard")],
							["pills", Y("opt.sub.pills")],
							["lines", Y("opt.sub.lines")]
						] : [
							["card", Y("opt.sub.card")],
							["flat", Y("opt.sub.flat")],
							["pills", Y("opt.sub.pills")],
							["lines", Y("opt.sub.lines")],
							["flyout", Y("opt.sub.flyout")]
						]);
						X(He, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => Na("subStyle", e === "card" ? void 0 : e)
						});
					}
					k(Be);
					var Ue = L(Be, 2), We = (e) => {
						var t = Qc(), n = F(t), r = L(n);
						{
							let e = /* @__PURE__ */ j(() => z(D).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ j(sr), n = /* @__PURE__ */ j(() => Y("tip.nav.subPillColorPick"));
							sa(r, {
								get value() {
									return z(e);
								},
								get tokens() {
									return z(t);
								},
								get label() {
									return z(n);
								},
								onchange: (e) => Na("subPillColor", e)
							});
						}
						k(t), R((e, r) => {
							J(t, "title", e), U(n, `${r ?? ""} `);
						}, [() => Y("tip.nav.subPillColor"), () => Y("lbl.subPillColor")]), H(e, t);
					};
					W(Ue, (e) => {
						z(D).nav.style?.subStyle === "pills" && e(We);
					});
					var Ge = L(Ue, 2), Ke = F(Ge), qe = L(Ke);
					K(qe), k(Ge), k(ze), k(Ie);
					var Je = L(Ie, 2), Ye = F(Je), Xe = F(Ye, !0);
					k(Ye);
					var Ze = L(Ye, 2), Qe = F(Ze);
					Kr(Qe, 17, () => z(D).nav.items, Hr, (e, t, n) => {
						var r = zu(), i = I(r), a = F(i);
						K(a);
						var o = L(a, 2), s = F(o);
						G(s, () => c.plus, !0), k(s);
						var l = L(s, 2);
						l.disabled = n === 0, G(l, () => c.up, !0), k(l);
						var u = L(l, 2);
						G(u, () => c.down, !0), k(u);
						var d = L(u, 2);
						G(d, () => c.cross, !0), k(d), k(o);
						var f = L(o, 2), p = F(f);
						{
							let e = /* @__PURE__ */ j(() => z(t).page ?? (z(t).href == null ? "__none" : "__href")), r = /* @__PURE__ */ j(() => Y("tip.linkTarget")), i = /* @__PURE__ */ j(() => [
								...z(D).pages.map((e) => [e.id, e.title]),
								["__href", Y("opt.linkHref")],
								...z(t).children ? [["__none", Y("opt.noLink")]] : []
							]);
							X(p, {
								get value() {
									return z(e);
								},
								get title() {
									return z(r);
								},
								get options() {
									return z(i);
								},
								onchange: (e) => lf(n, e)
							});
						}
						k(f);
						var m = L(f, 2), h = (e) => {
							var r = Xc();
							K(r), R((e, n) => {
								q(r, z(t).href), J(r, "placeholder", e), J(r, "title", n);
							}, [() => Y("ph.hrefAnchor"), () => Y("tip.hrefAnchor")]), B("change", r, (e) => uf(n, e.target.value)), H(e, r);
						};
						W(m, (e) => {
							!z(t).page && z(t).href != null && e(h);
						}), k(i), Kr(L(i, 2), 17, () => z(t).children ?? [], Hr, (e, r, i) => {
							var a = Zc(), o = F(a);
							K(o);
							var s = L(o, 2), l = F(s);
							l.disabled = i === 0, G(l, () => c.up, !0), k(l);
							var u = L(l, 2);
							G(u, () => c.down, !0), k(u);
							var d = L(u, 2);
							G(d, () => c.cross, !0), k(d), k(s);
							var f = L(s, 2), p = F(f);
							{
								let e = /* @__PURE__ */ j(() => z(r).page ?? "__href"), t = /* @__PURE__ */ j(() => Y("tip.linkTarget")), a = /* @__PURE__ */ j(() => [...z(D).pages.map((e) => [e.id, e.title]), ["__href", Y("opt.linkHref")]]);
								X(p, {
									get value() {
										return z(e);
									},
									get title() {
										return z(t);
									},
									get options() {
										return z(a);
									},
									onchange: (e) => gf(n, i, e)
								});
							}
							k(f);
							var m = L(f, 2), h = (e) => {
								var t = Xc();
								K(t), R((e, n) => {
									q(t, z(r).href ?? ""), J(t, "placeholder", e), J(t, "title", n);
								}, [() => Y("ph.hrefAnchor"), () => Y("tip.hrefAnchor")]), B("change", t, (e) => _f(n, i, e.target.value)), H(e, t);
							};
							W(m, (e) => {
								z(r).page || e(h);
							}), k(a), R((e, n) => {
								q(o, z(r).label), J(o, "title", e), u.disabled = i === z(t).children.length - 1, J(d, "title", n);
							}, [() => Y("tip.nav.childLabel"), () => Y("tip.nav.removeChild")]), B("input", o, (e) => hf(n, i, e.target.value)), B("click", l, () => vf(n, i, -1)), B("click", u, () => vf(n, i, 1)), B("click", d, () => yf(n, i)), H(e, a);
						}), R((e, r, i) => {
							q(a, z(t).label), J(a, "title", e), J(s, "title", r), u.disabled = n === z(D).nav.items.length - 1, J(d, "title", i);
						}, [
							() => Y("tip.nav.itemLabel"),
							() => Y("tip.nav.addChild"),
							() => Y("tip.nav.removeItem")
						]), B("input", a, (e) => jc(n, e.target.value)), B("click", s, () => mf(n)), B("click", l, () => df(n, -1)), B("click", u, () => df(n, 1)), B("click", d, () => ff(n)), H(e, r);
					});
					var $e = L(Qe, 2), et = F($e, !0);
					k($e), k(Ze), k(Je), k(t), R((e, t, n, r, o, s, c, u, d, f, p, m, h, g, _, v, b, C, w, ee, te, ne, re, ie) => {
						J(i, "title", e), U(a, t), U(l, `${n ?? ""} `), U(y, r), J(x, "title", o), U(S, `${s ?? ""} `), J(ae, "title", c), bi(oe, z(D).nav.style?.blur !== !1), U(se, ` ${u ?? ""}`), U(le, `${d ?? ""} `), U(fe, `${f ?? ""} `), J(ve, "title", p), bi(ye, z(D).nav.cart?.show === !0), U(be, ` ${m ?? ""}`), U(we, `${h ?? ""} `), J(E, "title", g), U(ke, `${_ ?? ""} `), U(Me, `${v ?? ""} `), U(Pe, b), U(Re, C), U(Ve, `${w ?? ""} `), J(Ge, "title", ee), U(Ke, `${te ?? ""} `), q(qe, z(D).nav.style?.subColumns ?? 1), J(Ye, "title", ne), U(Xe, re), U(et, ie);
					}, [
						() => Y("hint.nav.logoHome"),
						() => Y("group.logo"),
						() => Y("common.type"),
						() => Y("group.appearance"),
						() => Y("tip.nav.variant"),
						() => Y("lbl.navVariant"),
						() => Y("tip.nav.blur"),
						() => Y("lbl.navBlur"),
						() => Y("lbl.size"),
						() => Y("lbl.navPlacement"),
						() => Y("tip.nav.cart"),
						() => Y("lbl.navCart"),
						() => Y("lbl.navHover"),
						() => Y("tip.nav.hoverTextColor"),
						() => Y("lbl.hoverTextColor"),
						() => Y("lbl.textColor"),
						() => Y("lbl.background"),
						() => Y("group.submenu"),
						() => Y("lbl.design"),
						() => Y("tip.nav.subColumns"),
						() => Y("lbl.columns"),
						() => Y("hint.nav.submenu"),
						() => Y("group.menuItems"),
						() => Y("ui.addMenuItem")
					]), B("change", oe, (e) => Na("blur", e.target.checked)), B("change", ye, (e) => Ti("nav", () => {
						e.target.checked ? z(D).nav.cart = {
							...z(D).nav.cart ?? {},
							show: !0
						} : delete z(D).nav.cart;
					})), B("change", qe, (e) => Na("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), B("click", $e, pf), H(e, t);
				}, d = (e) => {
					var t = Gu(), n = F(t), r = F(n), i = L(r);
					K(i), k(n);
					var a = L(n, 2), o = F(a), s = L(o);
					K(s), k(a);
					var l = L(a, 2), u = F(l), d = L(u);
					{
						let e = /* @__PURE__ */ j(Ta), t = /* @__PURE__ */ j(Ea);
						X(d, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => Aa(e)
						});
					}
					k(l);
					var f = L(l, 4), p = F(f, !0);
					k(f);
					var m = L(f, 2), h = F(m);
					Kr(h, 17, () => z(xa), (e) => e.screen, (e, t) => {
						var n = Vu(), r = F(n), i = F(r, !0);
						k(r);
						var a = L(r, 2);
						let o;
						var s = F(a);
						k(a);
						var c = L(a, 2), l = F(c, !0);
						k(c), k(n), R(() => {
							U(i, z(t).screen), o = pi(a, 1, "cw-bar svelte-1n46o8q", null, o, { fluid: !z(t).bound }), hi(s, `width:${z(t).pct ?? ""}%`), U(l, z(t).bound ? `${z(t).margin}` : "-");
						}), H(e, n);
					});
					var g = L(h, 2), _ = F(g), v = F(_, !0);
					k(_);
					var y = L(_, 2), b = F(y, !0);
					k(y), k(g);
					var x = L(g, 2), S = (e) => {
						var t = Hu(), n = F(t, !0);
						k(t), R((e) => U(n, e), [() => Y("lbl.bindsFrom", { n: z(me) })]), H(e, t);
					};
					W(x, (e) => {
						z(ca) !== "full" && e(S);
					}), k(m);
					var C = L(m, 2);
					Kr(C, 21, () => Ga, (e) => e.id, (e, t) => {
						var n = bu();
						let r;
						var i = F(n, !0);
						k(n), R((e) => {
							r = pi(n, 1, "svelte-1n46o8q", null, r, { on: z(ua) === z(t).id }), U(i, e);
						}, [() => Y(`lbl.width.${z(t).id}`)]), B("click", n, () => Ca(z(t).width)), H(e, n);
					}), k(C);
					var w = L(C, 2), ee = (e) => {
						var t = Uu(), n = F(t), r = F(n, !0);
						k(n);
						var i = L(n, 2);
						K(i);
						var a = L(i, 2), o = F(a);
						k(a), k(t), R((e, n) => {
							J(t, "title", e), U(r, n), J(i, "min", 960), J(i, "max", Ua), J(i, "step", 20), q(i, z(ba)), U(o, `${z(ba) ?? ""} px`);
						}, [() => Y("tip.site.contentWidthFree"), () => Y("lbl.widthFree")]), B("input", i, (e) => Ca(e.target.valueAsNumber)), H(e, t);
					};
					W(w, (e) => {
						z(ca) !== "full" && e(ee);
					});
					var te = L(w, 2), ne = F(te, !0);
					k(te);
					var re = L(te, 2);
					Kr(re, 21, () => Wa, (e) => e.id, (e, t) => {
						var n = bu();
						let r;
						var i = F(n, !0);
						k(n), R((e) => {
							r = pi(n, 1, "svelte-1n46o8q", null, r, { on: z(fa) === z(t).id }), U(i, e);
						}, [() => Y(`lbl.gutter.${z(t).id}`)]), B("click", n, () => wa(z(t).gutter)), H(e, n);
					}), k(re);
					var ie = L(re, 2), ae = F(ie), oe = F(ae, !0);
					k(ae);
					var se = L(ae, 2), ce = F(se), le = F(ce), ue = F(le, !0);
					k(le);
					var de = L(le, 2);
					K(de);
					var fe = L(de, 2), pe = F(fe);
					k(fe), k(ce), k(se), k(ie);
					var he = L(ie, 4), ge = F(he), _e = L(ge), ve = (e) => {
						var t = ku();
						R((e) => {
							J(t, "src", z(D).site.icon), J(t, "alt", e);
						}, [() => Y("lbl.siteIcon")]), H(e, t);
					};
					W(_e, (e) => {
						z(D).site.icon && e(ve);
					}), k(he);
					var ye = L(he, 2), be = F(ye), xe = F(be), Se = L(xe);
					k(be);
					var Ce = L(be, 2), we = (e) => {
						var t = Wu(), n = I(t);
						G(n, () => c.pencil ?? "✎", !0), k(n);
						var r = L(n, 2);
						G(r, () => c.cross, !0), k(r), R((e, t) => {
							J(n, "title", e), J(r, "title", t);
						}, [() => Y("tip.site.editIcon"), () => Y("tip.site.removeIcon")]), B("click", n, () => P(ta, z(D).site.icon, !0)), B("click", r, ia), H(e, t);
					};
					W(Ce, (e) => {
						z(D).site.icon && e(we);
					}), k(ye), k(t), R((e, t, c, d, m, h, g, _, y, x, S, C, w, ee, re, ae, se, le, fe, me) => {
						J(n, "title", e), U(r, `${t ?? ""} `), q(i, z(D).site.title ?? ""), J(i, "placeholder", c), J(a, "title", d), U(o, `${m ?? ""} `), q(s, z(D).site.description ?? ""), J(s, "placeholder", h), J(l, "title", g), U(u, `${_ ?? ""} `), J(f, "title", y), U(p, x), U(v, S), U(b, C), J(te, "title", w), U(ne, ee), ie.open = z(fa) === null || z(pa), U(oe, re), J(ce, "title", ae), U(ue, se), J(de, "min", 0), J(de, "max", 12), J(de, "step", 1), q(de, z(la)), U(pe, `${z(la) ?? ""} vw`), U(ge, `${le ?? ""} `), J(be, "title", fe), U(xe, `${me ?? ""} `);
					}, [
						() => Y("tip.site.name"),
						() => Y("lbl.name"),
						() => Y("ph.site.name"),
						() => Y("tip.site.description"),
						() => Y("lbl.description"),
						() => Y("ph.site.description"),
						() => Y("site.langTitle"),
						() => Y("site.langLabel"),
						() => Y("tip.site.contentWidth"),
						() => Y("lbl.contentWidth"),
						() => Y("lbl.screenPx"),
						() => Y("lbl.marginPx"),
						() => Y("tip.site.gutter"),
						() => Y("lbl.gutter"),
						() => Y("group.advanced"),
						() => Y("tip.site.gutterVw"),
						() => Y("lbl.gutterVw"),
						() => Y("lbl.siteIcon"),
						() => Y("tip.site.icon"),
						() => z(D).site.icon ? Y("ui.changeIcon") : Y("ui.chooseIcon")
					]), B("input", i, (e) => aa(e.target.value)), B("input", s, (e) => oa(e.target.value)), Tr("toggle", ie, (e) => P(pa, e.currentTarget.open, !0)), B("input", de, (e) => wa(e.target.valueAsNumber)), B("change", Se, na), H(e, t);
				}, p = (e) => {
					var t = $u();
					{
						let e = (e, t = f, n = f) => {
							var r = qu(), i = F(r), a = (e) => {
								var t = Ku(), r = F(t, !0);
								k(t), R(() => U(r, n())), H(e, t);
							};
							W(i, (e) => {
								n() && e(a);
							});
							var o = L(i, 2), s = F(o), c = F(s, !0);
							k(s);
							var l = L(s, 2), u = F(l, !0);
							k(l);
							var d = L(l, 2), p = F(d), m = F(p, !0);
							k(p);
							var h = L(p), g = F(h, !0);
							k(h), k(d), k(o), k(r), R((e, t, n, r, i, a, s, l, d) => {
								hi(o, `--tv-bg:${e ?? ""};--tv-surface:${t ?? ""};--tv-text:${n ?? ""};--tv-accent:${r ?? ""};--tv-accent-ink:${i ?? ""}`), U(c, a), U(u, s), U(m, l), U(g, d);
							}, [
								() => Mf(t().bg, t()),
								() => Mf(t().surface, t()),
								() => Mf(t().text, t()),
								() => Mf(t().accent, t()),
								() => Mf(t()["accent-text"] ?? t().bg, t()),
								() => Y("preview.heading"),
								() => Y("preview.cardBody"),
								() => Y("preview.button"),
								() => Y("preview.link")
							]), H(e, r);
						};
						var n = F(t), r = F(n, !0);
						k(n);
						var i = L(n, 2);
						Kr(i, 21, () => Pf, (e) => e.id, (e, t) => {
							var n = Ju();
							let r;
							var i = F(n), a = F(i), o = L(a), s = L(o), c = L(s);
							k(i);
							var l = L(i, 2), u = F(l, !0);
							k(l), k(n), R(() => {
								r = pi(n, 1, "theme-preset svelte-1n46o8q", null, r, { sel: z(If) === z(t).id }), J(n, "title", `${z(t).name} - ${z(t).note}`), hi(a, `background:${z(t).light.bg ?? ""}`), hi(o, `background:${z(t).light.surface ?? ""}`), hi(s, `background:${z(t).light.accent ?? ""}`), hi(c, `background:${z(t).light.text ?? ""}`), U(u, z(t).name);
							}), B("click", n, () => Ff(z(t))), H(e, n);
						}), k(i);
						var a = L(i, 2), o = F(a, !0);
						k(a);
						var s = L(a, 2), c = F(s);
						K(c);
						var l = L(c);
						k(s);
						var u = L(s, 2), d = (e) => {
							var t = Yu(), n = F(t), r = F(n, !0);
							k(n);
							var i = L(n, 2), a = F(i);
							let o;
							var s = F(a, !0);
							k(a);
							var c = L(a, 2);
							let l;
							var u = F(c, !0);
							k(c), k(i), k(t), R((e, t, n, i) => {
								U(r, e), J(a, "title", t), o = pi(a, 1, "svelte-1n46o8q", null, o, { on: z(ur) }), U(s, n), l = pi(c, 1, "svelte-1n46o8q", null, l, { on: !z(ur) }), U(u, i);
							}, [
								() => Y("lbl.darkColors"),
								() => Y("hint.theme.autoDark"),
								() => Y("opt.auto"),
								() => Y("opt.custom")
							]), B("click", a, () => Of(!0)), B("click", c, () => Of(!1)), H(e, t);
						};
						W(u, (e) => {
							z(lr) && e(d);
						});
						var p = L(u, 2), m = F(p), g = (e) => {
							var t = Xu(), n = F(t, !0);
							k(t), R((e) => U(n, e), [() => Y("lbl.light")]), H(e, t);
						};
						W(m, (e) => {
							z(lr) && e(g);
						});
						var _ = L(m, 2);
						let O;
						var v = F(_, !0);
						k(_), k(p);
						var y = L(p, 2);
						Kr(y, 21, () => cr, ([e, t, n]) => e, (e, t) => {
							var n = /* @__PURE__ */ j(() => h(z(t), 3));
							let r = () => z(n)[0], i = () => z(n)[1], a = () => z(n)[2];
							var o = Zu(), s = F(o);
							{
								let e = /* @__PURE__ */ j(() => z(D).theme.tokens.color[r()] ?? z(D).theme.tokens.color.bg), t = /* @__PURE__ */ j(sr);
								sa(s, {
									get value() {
										return z(e);
									},
									get tokens() {
										return z(t);
									},
									get label() {
										return i();
									},
									onchange: (e) => bf(r(), e)
								});
							}
							var c = L(s, 2), l = F(c, !0);
							k(c);
							var u = L(c, 2), d = F(u, !0);
							k(u), k(o), R((e) => {
								U(l, a()), U(d, e);
							}, [() => Mf(z(D).theme.tokens.color[r()] ?? z(D).theme.tokens.color.bg, z(fr))]), H(e, o);
						}), k(y);
						var b = L(y, 2), x = (e) => {
							var t = Qu(), n = I(t), r = F(n), i = F(r, !0);
							k(r);
							var a = L(r, 2);
							let o;
							var s = F(a, !0);
							k(a), k(n);
							var c = L(n, 2);
							let l;
							Kr(c, 21, () => cr, ([e, t, n]) => e, (e, t) => {
								var n = /* @__PURE__ */ j(() => h(z(t), 3));
								let r = () => z(n)[0], i = () => z(n)[1], a = () => z(n)[2];
								var o = Zu(), s = F(o);
								{
									let e = /* @__PURE__ */ j(() => z(D).theme.alt.tokens.color[r()] ?? z(pr)[r()] ?? z(D).theme.tokens.color.bg), t = /* @__PURE__ */ j(sr), n = /* @__PURE__ */ j(() => Y("theme.darkColorLabel", { name: i() }));
									sa(s, {
										get value() {
											return z(e);
										},
										get tokens() {
											return z(t);
										},
										get label() {
											return z(n);
										},
										onchange: (e) => Tf(r(), e)
									});
								}
								var c = L(s, 2), l = F(c, !0);
								k(c);
								var u = L(c, 2), d = F(u, !0);
								k(u), k(o), R((e) => {
									U(l, a()), U(d, e);
								}, [() => Mf(z(D).theme.alt.tokens.color[r()] ?? z(pr)[r()], z(pr))]), H(e, o);
							}), k(c), R((e, t, n) => {
								U(i, e), o = pi(a, 1, "chip svelte-1n46o8q", null, o, { accent: z(dr) === "dark" }), J(a, "title", t), U(s, n), l = pi(c, 1, "palcells svelte-1n46o8q", null, l, { autopal: z(ur) });
							}, [
								() => Y("lbl.dark"),
								() => Y("tip.theme.darkDefault"),
								() => Y("common.standard")
							]), B("click", a, () => Ef("dark")), H(e, t);
						};
						W(b, (e) => {
							z(lr) && e(x);
						});
						var S = L(b, 2), C = F(S);
						{
							let t = /* @__PURE__ */ j(() => z(lr) ? Y("lbl.light") : "");
							e(C, () => z(fr), () => z(t));
						}
						var w = L(C, 2), ee = (t) => {
							{
								let n = /* @__PURE__ */ j(() => Y("lbl.dark"));
								e(t, () => z(pr), () => z(n));
							}
						};
						W(w, (e) => {
							z(lr) && e(ee);
						}), k(S);
						var te = L(S, 2), ne = F(te), re = F(ne, !0);
						k(ne);
						var ie = L(ne, 2), ae = F(ie), oe = F(ae), se = L(oe);
						{
							let e = /* @__PURE__ */ j(() => kf("heading"));
							X(se, {
								get value() {
									return z(D).theme.tokens.font.heading;
								},
								get options() {
									return z(e);
								},
								onchange: (e) => xf("heading", e)
							});
						}
						k(ae);
						var ce = L(ae, 2), le = F(ce), ue = L(le);
						{
							let e = /* @__PURE__ */ j(() => kf("body"));
							X(ue, {
								get value() {
									return z(D).theme.tokens.font.body;
								},
								get options() {
									return z(e);
								},
								onchange: (e) => xf("body", e)
							});
						}
						k(ce);
						var de = L(ce, 2), fe = F(de), pe = F(fe, !0);
						k(fe);
						var me = L(fe, 2), he = F(me, !0);
						k(me), k(de), k(ie), k(te);
						var ge = L(te, 2), _e = F(ge), ve = F(_e, !0);
						k(_e);
						var ye = L(_e, 2), be = F(ye), xe = F(be), Se = F(xe, !0);
						k(xe);
						var Ce = L(xe, 2), we = F(Ce, !0);
						k(Ce), k(be);
						var Te = L(be, 2), Ee = F(Te, !0), De = L(Ee), T = F(De, !0);
						k(De), k(Te);
						var Oe = L(Te, 2);
						K(Oe);
						var E = L(Oe, 2), ke = F(E, !0), Ae = L(ke), je = F(Ae, !0);
						k(Ae), k(E);
						var Me = L(E, 2);
						K(Me), k(ye), k(ge), k(t), R((e, t, n, i, a, u, d, f, p, m, h, g, y, b, x, S, C, w) => {
							U(r, e), U(o, t), J(s, "title", n), bi(c, z(lr)), U(l, ` ${i ?? ""}`), O = pi(_, 1, "chip svelte-1n46o8q", null, O, { accent: z(dr) === "light" }), J(_, "title", a), U(v, u), U(re, d), U(oe, `${f ?? ""} `), U(le, `${p ?? ""} `), hi(fe, `font-family:${z(D).theme.tokens.font.heading ?? ""}`), U(pe, m), hi(me, `font-family:${z(D).theme.tokens.font.body ?? ""}`), U(he, h), U(ve, g), hi(be, `--r-sm:${z(D).theme.tokens.radius.sm ?? ""};--r-md:${z(D).theme.tokens.radius.md ?? ""}`), U(Se, y), U(we, b), U(Ee, x), U(T, z(D).theme.tokens.radius.sm), q(Oe, S), U(ke, C), U(je, z(D).theme.tokens.radius.md), q(Me, w);
						}, [
							() => Y("lbl.themePresets"),
							() => Y("lbl.colors"),
							() => Y("tip.theme.dualMode"),
							() => Y("lbl.dualMode"),
							() => Y("tip.theme.defaultScheme"),
							() => Y("common.standard"),
							() => Y("group.typography"),
							() => Y("lbl.headings"),
							() => Y("lbl.bodyText"),
							() => Y("preview.heading"),
							() => Y("preview.bodySample"),
							() => Y("group.shape"),
							() => Y("preview.button"),
							() => Y("preview.card"),
							() => Y("lbl.smallCorners"),
							() => Af(z(D).theme.tokens.radius.sm),
							() => Y("lbl.largeCorners"),
							() => Af(z(D).theme.tokens.radius.md)
						]), B("change", c, (e) => Df(e.target.checked)), B("click", _, () => Ef("light")), B("input", Oe, (e) => jf("sm", Number(e.target.value))), B("input", Me, (e) => jf("md", Number(e.target.value)));
					}
					H(e, t);
				}, m = (e) => {
					var t = id();
					let n;
					var r = F(t);
					K(r);
					var i = L(r, 2), a = (e) => {
						var t = Fr();
						Kr(I(t), 17, () => Es(op(), z(ap), (e) => e.label), (e) => e.label, (e, t) => {
							var n = Fr(), r = I(n), i = (e) => {
								var n = ed(), r = F(n), i = L(r);
								k(n), R((e) => {
									J(n, "title", e), U(r, `${z(t).label ?? ""} `);
								}, [() => Y("tip.webpAuto")]), B("change", i, lp), H(e, n);
							}, a = (e) => {
								var n = td(), r = F(n), i = L(r);
								k(n), R((e) => {
									J(n, "title", e), U(r, `${z(t).label ?? ""} `);
								}, [() => Y("tip.blocks.galleryImages")]), B("change", i, pp), H(e, n);
							}, o = (e) => {
								var n = dl(), r = F(n, !0);
								k(n), R(() => U(r, z(t).label)), B("click", n, () => sp(z(t))), H(e, n);
							};
							W(r, (e) => {
								z(t).act === "image" ? e(i) : z(t).act === "galleryImages" ? e(a, 1) : e(o, -1);
							}), H(e, n);
						}, (e) => {
							var t = tl(), n = F(t, !0);
							k(t), R((e) => U(n, e), [() => Y("canvas.searchEmpty")]), H(e, t);
						}), H(e, t);
					}, o = /* @__PURE__ */ j(() => z(ap).trim()), s = (e) => {
						var t = rd(), n = I(t), r = F(n), i = F(r, !0);
						k(r);
						var a = L(r, 2), o = F(a), s = F(o, !0);
						k(o);
						var c = L(o, 2), l = F(c, !0);
						k(c), k(a), k(n);
						var u = L(n, 2), d = F(u, !0);
						k(u);
						var f = L(u, 2), p = F(f), m = L(p);
						k(f);
						var h = L(f, 2), g = F(h, !0);
						k(h);
						var _ = L(h, 2), v = F(_, !0);
						k(_);
						var y = L(_, 2), b = F(y, !0);
						k(y);
						var x = L(y, 2), S = F(x, !0);
						k(x);
						var C = L(x, 2), w = F(C, !0);
						k(C);
						var ee = L(C, 2), te = F(ee, !0);
						k(ee);
						var ne = L(ee, 2), re = F(ne, !0);
						k(ne);
						var ie = L(ne, 2), ae = F(ie, !0);
						k(ie);
						var oe = L(ie, 2), se = F(oe, !0);
						k(oe);
						var ce = L(oe, 2), le = F(ce, !0);
						k(ce);
						var ue = L(ce, 2), de = F(ue, !0);
						k(ue);
						var fe = L(ue, 2), pe = F(fe, !0);
						k(fe);
						var me = L(fe, 2), he = F(me, !0);
						k(me);
						var ge = L(me, 2), _e = F(ge, !0);
						k(ge);
						var ve = L(ge, 2), ye = F(ve), be = F(ye, !0);
						k(ye);
						var xe = L(ye, 2), Se = F(xe), Ce = F(Se, !0);
						k(Se);
						var we = L(Se, 2), Te = F(we), Ee = L(Te);
						k(we), k(xe), k(ve);
						var De = L(ve, 2), T = F(De), Oe = F(T, !0);
						k(T);
						var D = L(T, 2), ke = F(D), Ae = F(ke, !0);
						k(ke);
						var je = L(ke, 2), Me = F(je, !0);
						k(je);
						var O = L(je, 2), Ne = F(O, !0);
						k(O);
						var Pe = L(O, 2), Fe = F(Pe, !0);
						k(Pe);
						var Ie = L(Pe, 2), Le = F(Ie, !0);
						k(Ie), k(D), k(De);
						var Re = L(De, 2), ze = (e) => {
							let t = /* @__PURE__ */ j(() => z(yo).filter((e) => Z[e]?.data?.mal?.kind === "blocks"));
							var n = nd(), r = F(n), i = F(r, !0);
							k(r);
							var a = L(r, 2);
							Kr(a, 20, () => z(t), (e) => e, (e, t) => {
								var n = dl(), r = F(n, !0);
								k(n), R((e) => {
									J(n, "title", e), U(r, Z[t].data.mal.name);
								}, [() => Y("canvas.insertGroup")]), B("click", n, () => E?.sendInsertTemplate(t)), H(e, n);
							}), k(a), k(n), R((e) => U(i, e), [() => Y("canvas.tabMyTemplates")]), H(e, n);
						}, Be = /* @__PURE__ */ j(() => z(yo).some((e) => Z[e]?.data?.mal?.kind === "blocks"));
						W(Re, (e) => {
							z(Be) && e(ze);
						});
						var Ve = L(Re, 2), He = (e) => {
							var t = nd(), n = F(t), r = F(n, !0);
							k(n);
							var i = L(n, 2);
							Kr(i, 21, () => z(rp), (e) => e.type, (e, t) => {
								var n = Fr(), r = I(n), i = (e) => {
									var n = nd(), r = F(n), i = F(r, !0);
									k(r);
									var a = L(r, 2);
									Kr(a, 21, () => z(t).variants, (e) => e.label, (e, n) => {
										var r = dl(), i = F(r, !0);
										k(r), R((e) => {
											J(r, "title", e), U(i, z(n).label);
										}, [() => Y("tip.blocks.fromPlugin", { plugin: z(t).plugin })]), B("click", r, () => ip(z(t), z(n).props)), H(e, r);
									}), k(a), k(n), R(() => U(i, z(t).label)), H(e, n);
								}, a = (e) => {
									var n = dl(), r = F(n, !0);
									k(n), R((e) => {
										J(n, "title", e), U(r, z(t).label);
									}, [() => Y("tip.blocks.fromPlugin", { plugin: z(t).plugin })]), B("click", n, () => ip(z(t))), H(e, n);
								};
								W(r, (e) => {
									z(t).variants?.length ? e(i) : e(a, -1);
								}), H(e, n);
							}), k(i), k(t), R((e) => U(r, e), [() => Y("panel.plugins")]), H(e, t);
						};
						W(Ve, (e) => {
							z(rp).length && e(He);
						}), R((e, t, n, r, a, o, u, m, ve, ye, xe, Ee, De, T, E, D, ke, je, O, Pe, k, Ie, Re, ze, Be, Ve, He, Ue, We, Ge, Ke, qe, Je, Ye, Xe, Ze, Qe, $e, et, tt, nt, rt, it, at, ot, st) => {
							U(i, e), U(s, t), J(c, "title", n), U(l, r), U(d, a), J(f, "title", o), U(p, `${u ?? ""} `), J(h, "title", m), U(g, ve), J(_, "title", ye), U(v, xe), J(y, "title", Ee), U(b, De), J(x, "title", T), U(S, E), J(C, "title", D), U(w, ke), J(ee, "title", je), U(te, O), J(ne, "title", Pe), U(re, k), J(ie, "title", Ie), U(ae, Re), J(oe, "title", ze), U(se, Be), J(ce, "title", Ve), U(le, He), J(ue, "title", Ue), U(de, We), J(fe, "title", Ge), U(pe, Ke), J(me, "title", qe), U(he, Je), J(ge, "title", Ye), U(_e, Xe), U(be, Ze), J(Se, "title", Qe), U(Ce, $e), J(we, "title", et), U(Te, `${tt ?? ""} `), U(Oe, nt), U(Ae, rt), U(Me, it), U(Ne, at), U(Fe, ot), U(Le, st);
						}, [
							() => Y("blocks.text"),
							() => Y("blocks.text"),
							() => Y("tip.blocks.textBox"),
							() => Y("ui.textBox"),
							() => Y("blocks.button"),
							() => Y("tip.webpAuto"),
							() => Y("blocks.image"),
							() => Y("tip.blocks.video"),
							() => Y("blocks.video"),
							() => Y("tip.blocks.icon"),
							() => Y("blocks.icon"),
							() => Y("tip.blocks.samling"),
							() => Y("blocks.samling"),
							() => Y("tip.blocks.faq"),
							() => Y("blocks.faq"),
							() => Y("tip.blocks.tidslinje"),
							() => Y("blocks.tidslinje"),
							() => Y("tip.blocks.sitat"),
							() => Y("blocks.sitat"),
							() => Y("tip.blocks.statistikk"),
							() => Y("blocks.statistikk"),
							() => Y("tip.blocks.tabell"),
							() => Y("blocks.tabell"),
							() => Y("tip.blocks.deling"),
							() => Y("blocks.deling"),
							() => Y("tip.blocks.nedteller"),
							() => Y("blocks.nedteller"),
							() => Y("tip.blocks.audio"),
							() => Y("blocks.audio"),
							() => Y("tip.blocks.produkt"),
							() => Y("blocks.produkt"),
							() => Y("tip.blocks.handlekurv"),
							() => Y("blocks.handlekurv"),
							() => Y("tip.blocks.kasse"),
							() => Y("blocks.kasse"),
							() => Y("blocks.galleri"),
							() => Y("tip.blocks.gallery"),
							() => Y("ui.emptyGallery"),
							() => Y("tip.blocks.galleryImages"),
							() => Y("ui.galleryWithImages"),
							() => Y("group.shapes"),
							() => Y("shape.line"),
							() => Y("shape.arrow"),
							() => Y("shape.circle"),
							() => Y("shape.rect"),
							() => Y("shape.triangle")
						]), B("click", o, () => np("text")), B("click", c, () => np("text-box")), B("click", u, () => np("button")), B("change", m, lp), B("click", h, () => np("video")), B("click", _, () => np("icon")), B("click", y, () => np("samling")), B("click", x, () => np("faq")), B("click", C, () => np("tidslinje")), B("click", ee, () => np("sitat")), B("click", ne, () => np("statistikk")), B("click", ie, () => np("tabell")), B("click", oe, () => np("deling")), B("click", ce, () => np("nedteller")), B("click", ue, () => np("audio")), B("click", fe, () => np("produkt")), B("click", me, () => np("handlekurv")), B("click", ge, () => np("kasse")), B("click", Se, () => np("galleri")), B("change", Ee, pp), B("click", ke, () => np("shape-line")), B("click", je, () => np("shape-arrow")), B("click", O, () => np("shape-circle")), B("click", Pe, () => np("shape-rect")), B("click", Ie, () => np("shape-triangle")), H(e, t);
					};
					W(i, (e) => {
						z(o) ? e(a) : e(s, -1);
					}), k(t), R((e, i, a) => {
						n = pi(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: z(oe) === "mobile" }), J(t, "title", e), J(r, "placeholder", i), J(r, "title", a);
					}, [
						() => z(oe) === "mobile" ? Y("tip.blocks.mobileLocked") : void 0,
						() => Y("canvas.searchBlocks"),
						() => Y("canvas.searchBlocks")
					]), wi(r, () => z(ap), (e) => P(ap, e)), H(e, t);
				}, _ = (e) => {
					var t = ad(), n = F(t), r = F(n), i = L(r), a = F(i);
					k(i), k(n);
					var o = L(n, 2);
					K(o);
					var s = L(o, 2), c = F(s);
					K(c);
					var l = L(c);
					k(s), k(t), R((e, t) => {
						U(r, `${e ?? ""} `), U(a, `${z(te).size ?? ""} px`), q(o, z(te).size), bi(c, z(te).snap !== !1), U(l, ` ${t ?? ""}`);
					}, [() => Y("lbl.gridSize"), () => Y("lbl.gridSnap")]), B("input", o, (e) => Nr("size", Number(e.target.value))), B("change", c, (e) => Nr("snap", e.target.checked)), H(e, t);
				}, v = (e) => {
					var t = fd(), r = F(t), i = (e) => {
						var t = od(), n = I(t), r = F(n, !0);
						k(n);
						var i = L(n, 2);
						a(i), R((e) => U(r, e), [() => Y("blocks.suffix", { label: nn[z(A).type] ?? z(A).type })]), H(e, t);
					}, o = (e) => {
						var t = dd(), r = I(t), i = F(r, !0);
						k(r);
						var a = L(r, 2), o = F(a), s = L(o);
						K(s), k(a);
						var l = L(a, 4), u = F(l);
						K(u);
						var d = L(u);
						k(l);
						var f = L(l, 2), p = (e) => {
							var t = sd(), n = I(t), r = F(n), i = L(r), a = F(i);
							k(i), k(n);
							var o = L(n, 2);
							K(o), R((e) => {
								U(r, `${e ?? ""} `), U(a, `${z(ln).size ?? ""} px`), q(o, z(ln).size);
							}, [() => Y("lbl.gridSize")]), B("input", o, (e) => Mr("size", Number(e.target.value))), H(e, t);
						};
						W(f, (e) => {
							z(ln) && e(p);
						});
						var m = L(f, 4), g = F(m, !0);
						k(m);
						var _ = L(m, 2);
						Kr(_, 21, () => [["", "common.standard"], ...Object.entries(Ps)], ([e, t]) => e, (e, t) => {
							var n = /* @__PURE__ */ j(() => h(z(t), 2));
							let r = () => z(n)[0], i = () => z(n)[1], a = /* @__PURE__ */ j(() => bn(r()));
							var o = cd();
							let s;
							var c = F(o), l = F(c), u = L(l, 2), d = L(u, 2);
							k(c);
							var f = L(c, 2), p = F(f, !0);
							k(f), k(o), R((e, t) => {
								s = pi(o, 1, "rs-card svelte-1n46o8q", null, s, { on: z(mn) === r() }), J(o, "title", e), hi(c, `background: ${z(a).bg ?? ""}`), hi(l, `background: ${z(a).text ?? ""}`), hi(u, `background: ${z(a).surface ?? ""}`), hi(d, `background: ${z(a).accent ?? ""}`), U(p, t);
							}, [() => Y("tip.props.sectionTheme"), () => Y(i())]), B("click", o, () => yn(r())), H(e, o);
						}), k(_);
						var v = L(_, 2), y = F(v), b = L(y), x = F(b), S = F(x);
						k(x);
						var C = L(x, 2);
						G(C, () => c.copy, !0), k(C), k(b), k(v);
						var w = L(v, 4), ee = F(w, !0);
						k(w);
						var te = L(w, 2);
						n(te, () => z(tr), () => z(dn));
						var ne = L(te, 4), re = F(ne), ie = L(re);
						{
							let e = /* @__PURE__ */ j(() => hr(z(fn)) ? z(fn).type : "");
							X(ie, {
								get value() {
									return z(e);
								},
								get options() {
									return gr;
								},
								onchange: (e) => wr(e || null)
							});
						}
						k(ne);
						var ae = L(ne, 2), oe = (e) => {
							var t = ud(), n = I(t), r = F(n), i = L(r);
							K(i), k(n);
							var a = L(n, 2), o = F(a), s = L(o);
							K(s), k(a);
							var c = L(a, 2), l = (e) => {
								var t = ld(), n = I(t), r = F(n), i = L(r);
								{
									let e = /* @__PURE__ */ j(() => z(fn).props.effect ?? "slide-up"), t = /* @__PURE__ */ j(() => [
										["fade-in", Y("anim.fadeIn")],
										["slide-up", Y("anim.slideUp")],
										["zoom-in", Y("anim.zoomIn")]
									]);
									X(i, {
										get value() {
											return z(e);
										},
										get options() {
											return z(t);
										},
										onchange: (e) => Or("effect", e)
									});
								}
								k(n);
								var a = L(n, 2), o = F(a), s = L(o);
								K(s), k(a);
								var c = L(a, 2), l = F(c), u = L(l);
								{
									let e = /* @__PURE__ */ j(() => z(fn).props.pattern ?? "sequence"), t = /* @__PURE__ */ j(() => [
										["sequence", Y("opt.stagger.sequence")],
										["columns", Y("opt.stagger.columns")],
										["rows", Y("opt.stagger.rows")],
										["center", Y("opt.stagger.center")]
									]);
									X(u, {
										get value() {
											return z(e);
										},
										get options() {
											return z(t);
										},
										onchange: (e) => Or("pattern", e)
									});
								}
								k(c), R((e, t, i, u, d, f) => {
									J(n, "title", e), U(r, `${t ?? ""} `), J(a, "title", i), U(o, `${u ?? ""} `), q(s, z(fn).props.step ?? 90), J(c, "title", d), U(l, `${f ?? ""} `);
								}, [
									() => Y("tip.props.staggerEffect"),
									() => Y("lbl.staggerEffect"),
									() => Y("tip.props.staggerStep"),
									() => Y("lbl.stepMs"),
									() => Y("tip.props.staggerPattern"),
									() => Y("lbl.pattern")
								]), B("change", s, (e) => Dr("step", Number(e.target.value))), H(e, t);
							};
							W(c, (e) => {
								z(fn).type === "stagger" && e(l);
							}), R((e, t) => {
								U(r, `${e ?? ""} `), q(i, z(fn).props.duration), U(o, `${t ?? ""} `), q(s, z(fn).props.delay ?? 0);
							}, [() => Y("lbl.durationMs"), () => Y("lbl.delayMs")]), B("change", i, (e) => Dr("duration", Number(e.target.value))), B("change", s, (e) => Dr("delay", Number(e.target.value))), H(e, t);
						}, se = /* @__PURE__ */ j(() => hr(z(fn)));
						W(ae, (e) => {
							z(se) && e(oe);
						});
						var ce = L(ae, 2), le = F(ce), ue = L(le);
						{
							let e = /* @__PURE__ */ j(() => z(pn)?.type ?? (z(fn) && !hr(z(fn)) ? z(fn).type : ""));
							X(ue, {
								get value() {
									return z(e);
								},
								get options() {
									return vr;
								},
								onchange: (e) => Er(e || null)
							});
						}
						k(ce), R((e, t, n, r, c, l, f, p, h, _, b, x, w, te, ie) => {
							U(i, e), J(a, "title", t), U(o, `${n ?? ""} `), q(s, z(un)), J(s, "placeholder", r), bi(u, z(ln) !== null), U(d, ` ${c ?? ""}`), J(m, "title", l), U(g, f), J(v, "title", p), U(y, `${h ?? ""} `), U(S, `#${z(cn) ?? ""}`), J(C, "title", _), U(ee, b), J(ne, "title", x), U(re, `${w ?? ""} `), J(ce, "title", te), U(le, `${ie ?? ""} `);
						}, [
							() => Y("lbl.section"),
							() => Y("hint.props.minHeight"),
							() => Y("lbl.minHeight"),
							() => Y("ph.minHeight"),
							() => Y("lbl.sectionGrid"),
							() => Y("tip.props.sectionTheme"),
							() => Y("lbl.sectionTheme"),
							() => Y("tip.props.anchor"),
							() => Y("lbl.anchor"),
							() => Y("tip.props.copyAnchor"),
							() => Y("lbl.background"),
							() => Y("tip.props.sectionAnim"),
							() => Y("lbl.animIn"),
							() => Y("tip.props.sectionHover"),
							() => Y("lbl.onHover")
						]), B("change", s, (e) => kr(e.target.value)), B("change", u, (e) => jr(e.target.checked)), B("click", C, () => navigator.clipboard?.writeText(`#${z(cn)}`)), H(e, t);
					}, s = (e) => {
						var t = tl(), n = F(t, !0);
						k(t), R((e) => U(n, e), [() => Y("hint.props.empty")]), H(e, t);
					};
					W(r, (e) => {
						z(A) ? e(i) : z(cn) ? e(o, 1) : e(s, -1);
					}), k(t), H(e, t);
				}, y = (e) => {
					var t = bd(), i = F(t), a = F(i);
					K(a);
					var o = L(a);
					k(i);
					var s = L(i, 2), l = (e) => {
						var t = nd(), n = F(t), r = F(n, !0);
						k(n);
						var i = L(n, 2);
						Kr(i, 21, () => z(D).pages ?? [], (e) => e.id, (e, t) => {
							var n = ll(), r = F(n);
							K(r);
							var i = L(r);
							k(n), R((e, a) => {
								J(n, "title", e), bi(r, a), U(i, ` ${(z(t).title || z(t).id) ?? ""}`);
							}, [() => Y("tip.footer.hideOnPage"), () => !(z(D).footer?.hideOn ?? []).includes(z(t).id)]), B("change", r, (e) => dc(z(t).id, e.target.checked)), H(e, n);
						}), k(i), k(t), R((e) => U(r, e), [() => Y("group.showOnPages")]), H(e, t);
					};
					W(s, (e) => {
						z(D).footer?.show && e(l);
					});
					var u = L(s, 2), d = F(u), f = F(d, !0);
					k(d);
					var p = L(d, 2), m = F(p);
					Kr(m, 21, () => Ys, (e) => e.id, (e, t) => {
						var n = pd(), r = F(n);
						G(r, () => Oc(z(t).thumb), !0), k(r);
						var i = L(r, 2), a = F(i, !0);
						k(i), k(n), R((e) => {
							J(n, "title", e), U(a, z(t).label);
						}, [() => Y("tip.footer.template", { label: z(t).label })]), B("click", n, () => ec(z(t).id)), H(e, n);
					}), k(m), k(p), k(u);
					var h = L(u, 2), g = F(h), _ = F(g, !0);
					k(g);
					var v = L(g, 2), y = F(v), b = F(y), x = L(b);
					K(x), k(y);
					var S = L(y, 2), C = F(S), w = L(C);
					K(w), k(S);
					var ee = L(S, 2), te = F(ee), ne = L(te);
					{
						let e = /* @__PURE__ */ j(() => z(D).footer?.brand?.mode ?? "text"), t = /* @__PURE__ */ j(() => [
							["text", Y("blocks.text")],
							["image", Y("opt.brand.image")],
							["both", Y("opt.brand.both")]
						]);
						X(ne, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => Ws(e)
						});
					}
					k(ee);
					var re = L(ee, 2), ie = (e) => {
						var t = hd(), n = I(t), r = F(n), i = F(r), a = L(i);
						k(r);
						var o = L(r, 2), s = (e) => {
							var t = Ic();
							G(t, () => c.cross, !0), k(t), R((e) => J(t, "title", e), [() => Y("tip.footer.removeLogo")]), B("click", t, Ks), H(e, t);
						};
						W(o, (e) => {
							z(D).footer?.brand?.logo && e(s);
						}), k(n);
						var l = L(n, 2), u = (e) => {
							var t = md(), n = I(t), r = F(n), i = L(r), a = F(i);
							k(i), k(n);
							var o = L(n, 2);
							K(o), R((e) => {
								U(r, `${e ?? ""} `), U(a, `${z(D).footer?.brand?.logoHeight ?? 40 ?? ""} px`), q(o, z(D).footer?.brand?.logoHeight ?? 40);
							}, [() => Y("lbl.logoHeight")]), B("input", o, (e) => qs(e.target.value)), H(e, t);
						};
						W(l, (e) => {
							z(D).footer?.brand?.logo && e(u);
						}), R((e, t) => {
							J(r, "title", e), U(i, `${t ?? ""} `);
						}, [() => Y("tip.webpAutoPublish"), () => z(D).footer?.brand?.logo ? Y("ui.changeLogo") : Y("ui.uploadLogo")]), B("change", a, Gs), H(e, t);
					};
					W(re, (e) => {
						(z(D).footer?.brand?.mode ?? "text") !== "text" && e(ie);
					}), k(v), k(h);
					var ae = L(h, 2), oe = F(ae), se = F(oe, !0);
					k(oe);
					var ce = L(oe, 2), le = F(ce);
					Kr(le, 17, () => z(D).footer?.columns ?? [], Hr, (e, t, n) => {
						var r = gd(), i = I(r), a = F(i);
						K(a);
						var o = L(a, 2), s = F(o);
						G(s, () => c.plus, !0), k(s);
						var l = L(s, 2);
						l.disabled = n === 0, G(l, () => c.up, !0), k(l);
						var u = L(l, 2);
						G(u, () => c.down, !0), k(u);
						var d = L(u, 2);
						G(d, () => c.cross, !0), k(d), k(o), k(i), Kr(L(i, 2), 17, () => z(t).links ?? [], Hr, (e, r, i) => {
							var a = Zc(), o = F(a);
							K(o);
							var s = L(o, 2), l = F(s);
							l.disabled = i === 0, G(l, () => c.up, !0), k(l);
							var u = L(l, 2);
							G(u, () => c.down, !0), k(u);
							var d = L(u, 2);
							G(d, () => c.cross, !0), k(d), k(s);
							var f = L(s, 2), p = F(f);
							{
								let e = /* @__PURE__ */ j(() => z(r).page ?? "__href"), t = /* @__PURE__ */ j(() => Y("tip.linkTarget")), a = /* @__PURE__ */ j(() => [...z(D).pages.map((e) => [e.id, e.title]), ["__href", Y("opt.linkHref")]]);
								X(p, {
									get value() {
										return z(e);
									},
									get title() {
										return z(t);
									},
									get options() {
										return z(a);
									},
									onchange: (e) => bc(n, i, e)
								});
							}
							k(f);
							var m = L(f, 2), h = (e) => {
								var t = Xc();
								K(t), R((e, n) => {
									q(t, z(r).href ?? ""), J(t, "placeholder", e), J(t, "title", n);
								}, [() => Y("ph.hrefAnchor"), () => Y("tip.hrefAnchor")]), B("change", t, (e) => xc(n, i, e.target.value)), H(e, t);
							};
							W(m, (e) => {
								z(r).page || e(h);
							}), k(a), R((e, n) => {
								q(o, z(r).label), J(o, "title", e), u.disabled = i === z(t).links.length - 1, J(d, "title", n);
							}, [() => Y("tip.linkLabel"), () => Y("tip.removeLink")]), B("input", o, (e) => yc(n, i, e.target.value)), B("click", l, () => vc(n, i, -1)), B("click", u, () => vc(n, i, 1)), B("click", d, () => _c(n, i)), H(e, a);
						}), R((e, r, i) => {
							q(a, z(t).title), J(a, "title", e), J(s, "title", r), u.disabled = n === z(D).footer.columns.length - 1, J(d, "title", i);
						}, [
							() => Y("tip.footer.columnTitle"),
							() => Y("tip.footer.addLink"),
							() => Y("tip.footer.removeColumn")
						]), B("input", a, (e) => hc(n, e.target.value)), B("click", s, () => gc(n)), B("click", l, () => mc(n, -1)), B("click", u, () => mc(n, 1)), B("click", d, () => pc(n)), H(e, r);
					});
					var ue = L(le, 2), de = F(ue, !0);
					k(ue);
					var fe = L(ue, 2), pe = F(fe), me = L(pe);
					{
						let e = /* @__PURE__ */ j(() => z(D).footer?.columnsAlign ?? "left"), t = /* @__PURE__ */ j(() => [["left", Y("common.left")], ["center", Y("common.center")]]);
						X(me, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => sc(e)
						});
					}
					k(fe), k(ce), k(ae);
					var he = L(ae, 2), ge = F(he), _e = F(ge, !0);
					k(ge);
					var ve = L(ge, 2), ye = F(ve);
					Kr(ye, 17, () => z(D).footer?.social ?? [], Hr, (e, t, n) => {
						var r = _d(), i = F(r), a = F(i);
						G(a, () => ka(z(t).icon) || "", !0), k(a);
						var o = L(a, 2);
						{
							let e = /* @__PURE__ */ j(() => Y("blocks.icon"));
							X(o, {
								get value() {
									return z(t).icon;
								},
								get title() {
									return z(e);
								},
								get options() {
									return Ac;
								},
								onchange: (e) => Ec(n, e)
							});
						}
						k(i);
						var s = L(i, 2), l = F(s);
						l.disabled = n === 0, G(l, () => c.up, !0), k(l);
						var u = L(l, 2);
						G(u, () => c.down, !0), k(u);
						var d = L(u, 2);
						G(d, () => c.cross, !0), k(d), k(s);
						var f = L(s, 2);
						K(f), k(r), R((e, r) => {
							u.disabled = n === z(D).footer.social.length - 1, J(d, "title", e), q(f, z(t).url), J(f, "placeholder", r);
						}, [() => Y("tip.removeLink"), () => Y("ph.hrefMailto")]), B("click", l, () => Tc(n, -1)), B("click", u, () => Tc(n, 1)), B("click", d, () => wc(n)), B("change", f, (e) => kc(n, e.target.value)), H(e, r);
					});
					var be = L(ye, 2), xe = F(be, !0);
					k(be), k(ve), k(he);
					var Se = L(he, 2), Ce = F(Se), we = F(Ce, !0);
					k(Ce);
					var Te = L(Ce, 2), Ee = F(Te), De = F(Ee);
					K(De);
					var T = L(De);
					k(Ee);
					var Oe = L(Ee, 2), E = (e) => {
						let t = /* @__PURE__ */ j(() => z(D).footer.cta);
						var n = yd(), r = I(n), i = F(r), a = L(i);
						{
							let e = /* @__PURE__ */ j(() => z(t).kind ?? "button"), n = /* @__PURE__ */ j(() => [["button", Y("opt.cta.button")], ["newsletter", Y("opt.cta.newsletter")]]);
							X(a, {
								get value() {
									return z(e);
								},
								get options() {
									return z(n);
								},
								onchange: (e) => lc("kind", e)
							});
						}
						k(r);
						var o = L(r, 2), s = F(o);
						K(s);
						var c = L(s);
						k(o);
						var l = L(o, 2), u = F(l), d = L(u);
						K(d), k(l);
						var f = L(l, 2), p = F(f), m = L(p);
						K(m), k(f);
						var h = L(f, 2), g = F(h), _ = L(g);
						K(_), k(h);
						var v = L(h, 2), y = (e) => {
							var n = vd(), r = I(n), i = F(r), a = L(i);
							{
								let e = /* @__PURE__ */ j(() => z(t).page ?? "__href"), n = /* @__PURE__ */ j(() => [...z(D).pages.map((e) => [e.id, e.title]), ["__href", Y("opt.linkHrefMailto")]]);
								X(a, {
									get value() {
										return z(e);
									},
									get options() {
										return z(n);
									},
									onchange: (e) => uc(e)
								});
							}
							k(r);
							var o = L(r, 2), s = (e) => {
								var n = pl();
								K(n), R((e, r) => {
									q(n, z(t).href ?? ""), J(n, "placeholder", e), J(n, "title", r);
								}, [() => Y("ph.hrefMailtoAnchor"), () => Y("tip.hrefAnchor")]), B("change", n, (e) => lc("href", e.target.value)), H(e, n);
							};
							W(o, (e) => {
								z(t).page || e(s);
							}), R((e, t) => {
								J(r, "title", e), U(i, `${t ?? ""} `);
							}, [() => Y("tip.footer.ctaTarget"), () => Y("lbl.buttonTarget")]), H(e, n);
						}, b = (e) => {
							var n = ol(), r = I(n), i = F(r), a = L(i);
							K(a), k(r);
							var o = L(r, 2), s = F(o), c = L(s);
							K(c), k(o);
							var l = L(o, 2), u = F(l), d = L(u);
							K(d), k(l), R((e, n, f, p, m, h, g, _, v) => {
								J(r, "title", e), U(i, `${n ?? ""} `), q(a, z(t).endpoint ?? ""), J(a, "placeholder", f), J(o, "title", p), U(s, `${m ?? ""} `), q(c, z(t).recipient ?? ""), J(c, "placeholder", h), J(l, "title", g), U(u, `${_ ?? ""} `), q(d, z(t).success ?? ""), J(d, "placeholder", v);
							}, [
								() => Y("tip.footer.ctaEndpoint"),
								() => Y("lbl.newsletterEndpoint"),
								() => Y("ph.endpoint"),
								() => Y("tip.footer.ctaRecipient"),
								() => Y("lbl.recipientFallback"),
								() => Y("ph.email"),
								() => Y("tip.footer.ctaSuccess"),
								() => Y("lbl.confirmation"),
								() => Y("ph.footer.ctaSuccess")
							]), B("change", a, (e) => lc("endpoint", e.target.value)), B("change", c, (e) => lc("recipient", e.target.value)), B("input", d, (e) => lc("success", e.target.value)), H(e, n);
						};
						W(v, (e) => {
							(z(t).kind ?? "button") === "button" ? e(y) : e(b, -1);
						}), R((e, n, a, v, y, b, x, S, C, w, ee, te) => {
							J(r, "title", e), U(i, `${n ?? ""} `), J(o, "title", a), bi(s, z(t).big === !0), U(c, ` ${v ?? ""}`), J(l, "title", y), U(u, `${b ?? ""} `), q(d, z(t).heading ?? ""), J(d, "placeholder", x), J(f, "title", S), U(p, `${C ?? ""} `), q(m, z(t).sub ?? ""), J(h, "title", w), U(g, `${ee ?? ""} `), q(_, z(t).label ?? ""), J(_, "placeholder", te);
						}, [
							() => Y("tip.footer.ctaKind"),
							() => Y("common.type"),
							() => Y("tip.footer.ctaBig"),
							() => Y("lbl.bigCentered"),
							() => Y("tip.footer.ctaHeading"),
							() => Y("lbl.heading"),
							() => Y("ph.footer.ctaHeading"),
							() => Y("tip.footer.ctaSub"),
							() => Y("lbl.subText"),
							() => Y("tip.footer.ctaLabel"),
							() => Y("lbl.buttonText"),
							() => Y("ph.footer.ctaLabel")
						]), B("change", s, (e) => lc("big", e.target.checked)), B("input", d, (e) => lc("heading", e.target.value)), B("input", m, (e) => lc("sub", e.target.value)), B("input", _, (e) => lc("label", e.target.value)), H(e, n);
					};
					W(Oe, (e) => {
						z(D).footer?.cta && e(E);
					}), k(Te), k(Se);
					var ke = L(Se, 2), Ae = F(ke), je = F(Ae, !0);
					k(Ae);
					var Me = L(Ae, 2), O = F(Me);
					r(O, () => "linkRow", () => z(D).footer?.linkRow ?? []);
					var Ne = L(O, 2), Pe = F(Ne, !0);
					k(Ne), k(Me), k(ke);
					var Fe = L(ke, 2), Le = F(Fe), Re = F(Le, !0);
					k(Le);
					var ze = L(Le, 2), Be = F(ze), Ve = (e) => {
						var t = Bl(), n = I(t), r = F(n), i = L(r);
						{
							let e = /* @__PURE__ */ j(() => z(D).footer?.align ?? "left"), t = /* @__PURE__ */ j(() => [
								["left", Y("common.left")],
								["center", Y("common.center")],
								["right", Y("common.right")]
							]);
							X(i, {
								get value() {
									return z(e);
								},
								get options() {
									return z(t);
								},
								onchange: (e) => Hs("footer", (t) => {
									t.align = e;
								})
							});
						}
						k(n), Ie(2), R((e, t) => {
							J(n, "title", e), U(r, `${t ?? ""} `);
						}, [() => Y("tip.footer.align"), () => Y("lbl.align")]), H(e, t);
					};
					W(Be, (e) => {
						z(D).footer?.cta?.big !== !0 && e(Ve);
					});
					var He = L(Be, 2), Ue = F(He, !0);
					k(He);
					var We = L(He, 2);
					n(We, () => rr, () => z(D).footer?.background?.layers ?? []), k(ze), k(Fe);
					var Ge = L(Fe, 2), Ke = F(Ge), qe = F(Ke, !0);
					k(Ke);
					var Je = L(Ke, 2), Ye = F(Je), Xe = F(Ye), Ze = L(Xe);
					K(Ze), k(Ye);
					var Qe = L(Ye, 2), $e = F(Qe, !0);
					k(Qe);
					var et = L(Qe, 2);
					r(et, () => "baseline", () => z(D).footer?.baseline ?? []);
					var tt = L(et, 2), nt = F(tt, !0);
					k(tt), k(Je), k(Ge), k(t), R((e, t, n, r, s, c, l, u, d, p, m, h, g, v, ne, re, ie, ae, oe, ce, le, ue, me, he, ge, ve, ye, be, Se, Ce, Te, Oe) => {
						J(i, "title", e), bi(a, t), U(o, ` ${n ?? ""}`), U(f, r), U(_, s), J(y, "title", c), U(b, `${l ?? ""} `), q(x, z(D).footer?.brand?.title ?? ""), J(x, "placeholder", u), J(S, "title", d), U(C, `${p ?? ""} `), q(w, z(D).footer?.brand?.tagline ?? ""), J(ee, "title", m), U(te, `${h ?? ""} `), U(se, g), U(de, v), J(fe, "title", ne), U(pe, `${re ?? ""} `), U(_e, ie), U(xe, ae), U(we, oe), J(Ee, "title", ce), bi(De, le), U(T, ` ${ue ?? ""}`), U(je, me), U(Pe, he), U(Re, ge), U(Ue, ve), U(qe, ye), J(Ye, "title", be), U(Xe, `${Se ?? ""} `), q(Ze, z(D).footer?.copyright ?? ""), J(Ze, "placeholder", Ce), U($e, Te), U(nt, Oe);
					}, [
						() => Y("tip.footer.show"),
						() => !!z(D).footer?.show,
						() => Y("lbl.showFooter"),
						() => Y("group.startpoint"),
						() => Y("group.brand"),
						() => Y("tip.footer.brandTitle"),
						() => Y("lbl.title"),
						() => Y("ph.footer.brandTitle"),
						() => Y("tip.footer.tagline"),
						() => Y("lbl.tagline"),
						() => Y("tip.footer.brandMode"),
						() => Y("lbl.brandMode"),
						() => Y("group.columns"),
						() => Y("ui.addColumn"),
						() => Y("tip.footer.columnsAlign"),
						() => Y("lbl.splitColumnAlign"),
						() => Y("group.social"),
						() => Y("ui.addSocial"),
						() => Y("group.cta"),
						() => Y("tip.footer.cta"),
						() => !!z(D).footer?.cta,
						() => Y("lbl.showCta"),
						() => Y("group.linkRow"),
						() => Y("ui.addRowLink"),
						() => Y("group.appearance"),
						() => Y("lbl.background"),
						() => Y("group.baseline"),
						() => Y("tip.footer.copyright"),
						() => Y("lbl.copyright"),
						() => Y("ph.footer.copyright"),
						() => Y("lbl.baselineLinks"),
						() => Y("ui.addBaselineLink")
					]), B("change", a, (e) => Hs("footer", (t) => {
						t.show = e.target.checked;
					})), B("input", x, (e) => Us("title", e.target.value)), B("input", w, (e) => Us("tagline", e.target.value)), B("click", ue, fc), B("click", be, Sc), B("change", De, (e) => cc(e.target.checked)), B("click", Ne, () => tc("linkRow")), B("input", Ze, (e) => Js(e.target.value)), B("click", tt, () => tc("baseline")), H(e, t);
				}, b = (e) => {
					var t = kd(), n = F(t), r = (e) => {
						var t = Qc(), n = F(t), r = L(n);
						{
							let e = /* @__PURE__ */ j(() => z(so) ?? ""), t = /* @__PURE__ */ j(() => [["", Y("common.choose")], ...z(ao).map((e) => [e, z(oo)[e]?.name ?? e])]);
							X(r, {
								get value() {
									return z(e);
								},
								get options() {
									return z(t);
								},
								onchange: (e) => P(so, e || null, !0)
							});
						}
						k(t), R((e) => U(n, `${e ?? ""} `), [() => Y("blocks.samling")]), H(e, t);
					};
					W(n, (e) => {
						z(ao).length && e(r);
					});
					var i = L(n, 2), a = (e) => {
						let t = /* @__PURE__ */ j(() => z(oo)[z(so)]);
						var n = Od(), r = I(n), i = F(r), a = F(i, !0);
						k(i);
						var o = L(i, 2), s = F(o, !0);
						k(o);
						var l = L(o, 2), u = F(l), d = L(u);
						k(l);
						var f = L(l, 2);
						G(f, () => c.cross, !0), k(f), k(r);
						var p = L(r, 2);
						Kr(p, 19, () => z(t).entries, (e) => e.id, (e, n, r) => {
							var i = Dd(), a = F(i), o = F(a);
							k(a);
							var s = L(a, 2), l = F(s), u = F(l);
							K(u);
							var d = L(u, 2), f = F(d);
							G(f, () => c.up, !0), k(f);
							var p = L(f, 2);
							G(p, () => c.down, !0), k(p);
							var m = L(p, 2);
							G(m, () => c.cross, !0), k(m), k(d), k(l);
							var h = L(l, 2), g = (e) => {
								var t = xd(), r = F(t), i = L(r);
								K(i), k(t), R((e) => {
									U(r, `${e ?? ""} `), q(i, z(n).date ?? "");
								}, [() => Y("lbl.date")]), B("change", i, (e) => zo(z(so), z(n).id, "date", e.target.value)), H(e, t);
							};
							W(h, (e) => {
								z(t).kind !== "products" && e(g);
							});
							var _ = L(h, 2);
							ut(_);
							var v = L(_, 2), y = (e) => {
								var t = Sd(), r = F(t), i = L(r);
								K(i), k(t), R((e, t) => {
									U(r, `${e ?? ""} `), q(i, z(n).href ?? ""), J(i, "placeholder", t);
								}, [() => Y("lbl.link"), () => Y("ph.collections.href")]), B("change", i, (e) => zo(z(so), z(n).id, "href", e.target.value)), H(e, t);
							};
							W(v, (e) => {
								z(t).kind !== "products" && e(y);
							});
							var b = L(v, 2), x = F(b), S = F(x), C = L(S);
							k(x);
							var w = L(x, 2), ee = (e) => {
								var t = Cd(), r = I(t), i = L(r, 2);
								G(i, () => c.cross, !0), k(i), R((e) => {
									J(r, "src", z(n).image), J(i, "title", e);
								}, [() => Y("tip.removeImage")]), B("click", i, () => zo(z(so), z(n).id, "image", "")), H(e, t);
							};
							W(w, (e) => {
								z(n).image && e(ee);
							}), k(b);
							var te = L(b, 2), ne = (e) => {
								var t = Ed(), r = I(t), i = F(r), a = L(i);
								K(a), k(r);
								var o = L(r, 2), s = F(o), l = L(s);
								K(l), k(o);
								var u = L(o, 2), d = F(u), f = L(d);
								K(f), k(u);
								var p = L(u, 2), m = F(p), h = L(m);
								K(h), k(p);
								var g = L(p, 2);
								Kr(g, 17, () => z(n).colors ?? [], Hr, (e, t, r) => {
									var i = Td(), a = F(i);
									K(a);
									var o = L(a, 2), s = F(o), l = L(s);
									k(o);
									var u = L(o, 2), d = (e) => {
										var n = wd();
										R(() => J(n, "src", z(t).image)), H(e, n);
									};
									W(u, (e) => {
										z(t).image && e(d);
									});
									var f = L(u, 2);
									G(f, () => c.cross, !0), k(f), k(i), R((e, n) => {
										q(a, z(t).name), J(a, "placeholder", e), U(s, `${n ?? ""} `);
									}, [() => Y("ph.colorName"), () => z(t).image ? Y("ui.changeImage") : Y("ui.addImage")]), B("change", a, (e) => Xo(z(so), z(n).id, r, "name", e.target.value)), B("change", l, (e) => ts(z(so), z(n).id, r, e)), B("click", f, () => ns(z(so), z(n).id, r)), H(e, i);
								});
								var _ = L(g, 2), v = F(_, !0);
								k(_), R((e, t, r, c, g, y, b, x, S, C, w) => {
									U(i, `${e ?? ""} `), q(a, z(n).price ?? ""), J(o, "title", t), U(s, `${r ?? ""} `), q(l, z(n).memberPrice ?? ""), J(u, "title", c), U(d, `${g ?? ""} `), q(f, z(n).badge ?? ""), J(p, "title", y), U(m, `${b ?? ""} `), q(h, x), J(h, "placeholder", S), J(_, "title", C), U(v, w);
								}, [
									() => Y("lbl.price"),
									() => Y("tip.entry.memberPrice"),
									() => Y("lbl.memberPrice"),
									() => Y("tip.entry.badge"),
									() => Y("lbl.productBadge"),
									() => Y("tip.entry.sizes"),
									() => Y("lbl.sizes"),
									() => (z(n).sizes ?? []).join(", "),
									() => Y("ph.sizes"),
									() => Y("tip.entry.colors"),
									() => Y("ui.addColor")
								]), B("change", a, (e) => zo(z(so), z(n).id, "price", e.target.value === "" ? "" : Number(e.target.value))), B("change", l, (e) => zo(z(so), z(n).id, "memberPrice", e.target.value === "" ? "" : Number(e.target.value))), B("change", f, (e) => zo(z(so), z(n).id, "badge", e.target.value)), B("change", h, (e) => qo(z(so), z(n).id, e.target.value)), B("click", _, () => Jo(z(so), z(n).id)), H(e, t);
							};
							W(te, (e) => {
								z(t).kind === "products" && e(ne);
							}), k(s), k(i), R((e, i, a, s, c) => {
								U(o, `${e ?? ""}${z(t).kind === "products" ? z(n).price == null ? "" : ` · ${z(n).price}` : z(n).date ? ` · ${z(n).date}` : ""}`), q(u, z(n).title), J(u, "title", i), f.disabled = z(r) === 0, p.disabled = z(r) === z(t).entries.length - 1, J(m, "title", a), J(_, "placeholder", s), q(_, z(n).text ?? ""), U(S, `${c ?? ""} `);
							}, [
								() => Mo(z(n).title),
								() => Y("lbl.title"),
								() => Y("tip.collections.deleteEntry"),
								() => Y("ph.collections.text"),
								() => z(n).image ? Y("ui.changeImage") : Y("ui.addImage")
							]), B("change", u, (e) => zo(z(so), z(n).id, "title", e.target.value || "Uten tittel")), B("click", f, () => Uo(z(so), z(r), -1)), B("click", p, () => Uo(z(so), z(r), 1)), B("click", m, () => Wo(z(so), z(n).id)), B("change", _, (e) => zo(z(so), z(n).id, "text", e.target.value)), B("change", C, (e) => Go(z(so), z(n).id, e)), H(e, i);
						});
						var m = L(p, 2), h = (e) => {
							var t = tl(), n = F(t, !0);
							k(t), R((e) => U(n, e), [() => Y("hint.collections.empty")]), H(e, t);
						};
						W(m, (e) => {
							z(t).entries.length || e(h);
						}), Ie(2), R((e, t, n, r, i, c) => {
							U(a, e), J(o, "title", t), U(s, n), J(l, "title", r), U(u, `${i ?? ""} `), J(f, "title", c);
						}, [
							() => Y("ui.addEntry"),
							() => Y("tip.collections.exportCsv"),
							() => Y("ui.exportCsv"),
							() => Y("tip.collections.importCsv"),
							() => Y("ui.importCsv"),
							() => Y("tip.collections.deleteCollection")
						]), B("click", i, () => Ro(z(so))), B("click", o, () => rs(z(so))), B("change", d, (e) => is(z(so), e)), B("click", f, () => Lo(z(so))), H(e, n);
					};
					W(i, (e) => {
						z(so) && z(oo)[z(so)] && e(a);
					});
					var o = L(i, 2), s = F(o), l = L(s);
					K(l), k(o);
					var u = L(o, 2), d = F(u);
					X(L(d), {
						get value() {
							return z(fo);
						},
						get options() {
							return mo;
						},
						onchange: (e) => P(fo, e, !0)
					}), k(u);
					var f = L(u, 2), p = F(f, !0);
					k(f), k(t), R((e, t, n, r, i) => {
						U(s, `${e ?? ""} `), J(l, "placeholder", t), U(d, `${n ?? ""} `), f.disabled = r, U(p, i);
					}, [
						() => Y("lbl.newCollectionName"),
						() => Y("ph.collections.name"),
						() => Y("common.type"),
						() => !z(uo).trim(),
						() => Y("ui.createCollection")
					]), B("keydown", l, (e) => e.key === "Enter" && Fo()), wi(l, () => z(uo), (e) => P(uo, e)), B("click", f, Fo), H(e, t);
				}, x = (e) => {
					var t = Id(), n = F(t), r = (e) => {
						var t = tl(), n = F(t, !0);
						k(t), R((e) => U(n, e), [() => Y("hint.plugins.empty")]), H(e, t);
					}, i = /* @__PURE__ */ j(() => !hs().length);
					W(n, (e) => {
						z(i) && e(r);
					});
					var a = L(n, 2);
					Kr(a, 16, hs, (e) => e, (e, t) => {
						let n = /* @__PURE__ */ j(() => ls[t]), r = /* @__PURE__ */ j(() => (z(cs)?.enabled ?? []).includes(t));
						var i = Md();
						let a;
						var o = F(i), s = F(o), l = F(s, !0);
						k(s);
						var u = L(s, 2), d = (e) => {
							var t = Ad(), r = F(t);
							k(t), R(() => U(r, `v${z(n).version ?? ""}`)), H(e, t);
						};
						W(u, (e) => {
							z(n)?.version && e(d);
						});
						var f = L(u, 2), p = F(f), m = F(p);
						K(m);
						var h = L(m);
						k(p);
						var g = L(p, 2);
						G(g, () => c.cross, !0), k(g), k(f), k(o);
						var _ = L(o, 2), v = (e) => {
							var t = jd(), r = F(t, !0);
							k(t), R((e) => U(r, e), [() => z(n).errors.join("; ")]), H(e, t);
						}, y = (e) => {
							var t = jd(), r = F(t, !0);
							k(t), R((e) => U(r, e), [() => Y("plugin.engineMismatch", {
								required: z(n).requiresEngine,
								current: z($)
							})]), H(e, t);
						}, b = (e) => {
							var t = jd(), r = F(t, !0);
							k(t), R((e) => U(r, e), [() => Y("plugin.cspNeeded", { list: ys(z(n).csp).join(", ") })]), H(e, t);
						}, x = /* @__PURE__ */ j(() => z(n)?.csp && ys(z(n).csp).length);
						W(_, (e) => {
							z(n)?.errors?.length ? e(v) : z(n) && !z(n).satisfied ? e(y, 1) : z(x) && e(b, 2);
						});
						var S = L(_, 2), C = (e) => {
							var t = tl(), r = F(t, !0);
							k(t), R((e) => U(r, e), [() => Y("plugin.languages", { list: z(n).languages.map((e) => e.name).join(", ") })]), H(e, t);
						};
						W(S, (e) => {
							z(n)?.languages?.length && e(C);
						}), k(i), R((e, t, o, s, c) => {
							a = pi(i, 1, "plugin-row svelte-1n46o8q", null, a, { "plugin-broken": z(n)?.errors?.length }), U(l, e), J(p, "title", t), bi(m, z(r)), m.disabled = o, U(h, ` ${s ?? ""}`), J(g, "title", c);
						}, [
							() => z(n)?.names?.[Hi()] ?? z(n)?.name ?? t,
							() => z(r) ? Y("tip.plugins.on") : Y("tip.plugins.off"),
							() => !!z(n)?.errors?.length,
							() => z(r) ? Y("ui.on") : Y("ui.off"),
							() => Y("tip.plugins.remove")
						]), B("change", m, (e) => Ms(t, e.target.checked)), B("click", g, () => zs(t)), H(e, i);
					});
					var o = L(a, 2), s = (e) => {
						var t = Pd(), n = L(I(t), 2), r = F(n, !0);
						k(n), Kr(L(n, 2), 16, () => z(fs), (e) => e, (e, t) => {
							var n = Nd(), r = F(n), i = F(r), a = F(i, !0);
							k(i);
							var o = L(i, 2), s = (e) => {
								var n = Ad(), r = F(n);
								k(n), R(() => U(r, `v${ls[t].version ?? ""}`)), H(e, n);
							};
							W(o, (e) => {
								ls[t]?.version && e(s);
							});
							var l = L(o, 2), u = F(l);
							G(u, () => c.right, !0), k(u), k(l), k(r), k(n), R((e, t) => {
								U(a, e), J(u, "title", t);
							}, [() => ls[t]?.names?.[Hi()] ?? ls[t]?.name ?? t, () => Y("tip.plugins.addFound")]), B("click", u, () => Vs(t)), H(e, n);
						}), R((e) => U(r, e), [() => Y("hint.plugins.found")]), H(e, t);
					};
					W(o, (e) => {
						z(fs).length && e(s);
					});
					var l = L(o, 2), u = (e) => {
						var t = Fr(), n = I(t), r = (e) => {
							var t = tl(), n = F(t, !0);
							k(t), R((e) => U(n, e), [() => Y("hint.plugins.autoDiscover")]), H(e, t);
						};
						W(n, (e) => {
							z(fs).length || e(r);
						}), H(e, t);
					}, d = (e) => {
						var t = Fd(), n = L(I(t), 2);
						K(n);
						var r = L(n, 2), i = F(r, !0);
						k(r);
						var a = L(r, 2), o = (e) => {
							var t = jd(), n = F(t, !0);
							k(t), R(() => U(n, z(ds))), H(e, t);
						};
						W(a, (e) => {
							z(ds) && e(o);
						}), R((e, t, a) => {
							J(n, "placeholder", e), r.disabled = t, U(i, a);
						}, [
							() => Y("ph.plugins.folder"),
							() => !z(us).trim(),
							() => Y("ui.addPlugin")
						]), B("keydown", n, (e) => e.key === "Enter" && Bs()), wi(n, () => z(us), (e) => P(us, e)), B("click", r, Bs), H(e, t);
					};
					W(l, (e) => {
						z(ms) === "ok" ? e(u) : e(d, -1);
					}), k(t), H(e, t);
				}, S = (e) => {
					var t = fd(), n = F(t), r = (e) => {
						var t = tl(), n = F(t, !0);
						k(t), R((e) => U(n, e), [() => Y("hint.history.loading")]), H(e, t);
					}, i = (e) => {
						var t = zd(), n = I(t), r = (e) => {
							var t = tl(), n = F(t, !0);
							k(t), R(() => U(n, z(zr))), H(e, t);
						};
						W(n, (e) => {
							z(zr) && e(r);
						});
						var i = L(n, 2), a = (e) => {
							var t = Rd(), n = I(t), r = F(n, !0);
							k(n), Kr(L(n, 2), 19, () => z(Rr), (e) => e.sha, (e, t, n) => {
								var r = Ld();
								let i;
								var a = F(r), o = F(a, !0);
								k(a);
								var s = L(a, 2), c = F(s);
								k(s), k(r), R((e) => {
									i = pi(r, 1, "history-row svelte-1n46o8q", null, i, { head: z(n) === 0 }), J(a, "title", z(t).sha), U(o, z(t).message), U(c, `${z(t).author ?? ""}${e ?? ""}`);
								}, [() => z(t).date ? ` · ${Ur.format(new Date(z(t).date))}` : ""]), H(e, r);
							}), R((e, t) => {
								n.disabled = z(Br) || !z(ee)?.allowed, J(n, "title", e), U(r, t);
							}, [() => z(ee)?.allowed ? Y("tip.history.revert") : Y("tip.history.needsAccess"), () => Y("ui.revertLast")]), B("click", n, Gr), H(e, t);
						};
						W(i, (e) => {
							z(Rr).length > 0 && e(a);
						}), H(e, t);
					};
					W(n, (e) => {
						z(Rr) === null ? e(r) : e(i, -1);
					}), k(t), H(e, t);
				}, C = (e) => {
					var t = fd(), n = F(t), r = (e) => {
						var t = tl(), n = F(t, !0);
						k(t), R((e) => U(n, e), [() => Y("update.checking")]), H(e, t);
					}, i = (e) => {
						var t = Bd(), n = I(t), r = F(n, !0);
						k(n);
						var i = L(n, 2), a = F(i, !0);
						k(i), R((e) => {
							U(r, z(Yr)), U(a, e);
						}, [() => Y("update.retry")]), B("click", i, Qr), H(e, t);
					}, a = (e) => {
						var t = Zd(), n = I(t), r = F(n), i = F(r, !0);
						k(r);
						var a = L(r, 2), o = (e) => {
							var t = Vd(), n = I(t);
							G(n, () => c.right, !0), k(n);
							var r = L(n, 2), i = F(r, !0);
							k(r), R(() => U(i, z(Jr).target)), H(e, t);
						};
						W(a, (e) => {
							z(Jr).upToDate || e(o);
						}), k(n);
						var s = L(n, 2), l = (e) => {
							var t = tl(), n = F(t, !0);
							k(t), R((e) => U(n, e), [() => Y("update.upToDate")]), H(e, t);
						}, u = (e) => {
							var t = Xd(), n = I(t), r = F(n, !0);
							k(n);
							var i = L(n, 2), a = (e) => {
								var t = Hd(), n = F(t), r = F(n, !0);
								k(n);
								var i = L(n, 2), a = F(i), o = F(a, !0);
								k(a), k(i), k(t), R((e) => {
									U(r, e), U(o, z(Jr).notes);
								}, [() => Y("update.aboutVersion", { target: z(Jr).target })]), H(e, t);
							};
							W(i, (e) => {
								z(Jr).notes && e(a);
							});
							var o = L(i, 2), s = (e) => {
								var t = Ud(), n = F(t), r = F(n);
								G(r, () => c.warn, !0), k(r);
								var i = L(r);
								k(n);
								var a = L(n, 2), o = F(a), s = F(o, !0);
								k(o), k(a), k(t), R((e, t) => {
									J(n, "title", e), U(i, ` ${t ?? ""}`), U(s, z(Jr).headers.upstream);
								}, [() => Y("update.headersManual"), () => Y("update.headersTitle")]), H(e, t);
							};
							W(o, (e) => {
								z(Jr).headers?.upstream && e(s);
							});
							var l = L(o, 2);
							Kr(l, 17, () => z(Jr).changes.filter((e) => e.atom && e.conflict), (e) => e.path, (e, t) => {
								var n = Gd(), r = F(n), i = F(r, !0);
								k(r);
								var a = L(r, 2), o = F(a), s = (e) => {
									var t = Wd(), n = F(t, !0);
									k(t), R((e) => U(n, e), [() => Y("update.actionDelete")]), H(e, t);
								};
								W(o, (e) => {
									z(t).action === "delete" && e(s);
								});
								var l = L(o, 2);
								G(l, () => c.warn, !0), k(l), k(a), k(n), R((e) => {
									J(r, "title", z(t).path), U(i, z(t).path), J(l, "title", e);
								}, [() => Y(`update.conflict.${z(t).conflict}`)]), H(e, n);
							});
							var u = L(l, 2), d = F(u), f = F(d);
							k(d);
							var p = L(d, 2);
							Kr(p, 21, () => z(Jr).changes.filter((e) => e.atom && !e.conflict), (e) => e.path, (e, t) => {
								var n = Kd(), r = F(n), i = F(r, !0);
								k(r);
								var a = L(r, 2), o = (e) => {
									var t = Wd(), n = F(t, !0);
									k(t), R((e) => U(n, e), [() => Y("update.actionDelete")]), H(e, t);
								};
								W(a, (e) => {
									z(t).action === "delete" && e(o);
								}), k(n), R(() => {
									J(r, "title", z(t).path), U(i, z(t).path);
								}), H(e, n);
							}), k(p), k(u);
							var m = L(u, 2), h = (e) => {
								var t = Yd(), n = I(t), r = F(n), i = F(r, !0);
								k(r);
								var a = L(r, 2), o = F(a, !0);
								k(a), k(n), Kr(L(n, 2), 17, () => z(Jr).changes.filter((e) => !e.atom), (e) => e.path, (e, t) => {
									var n = Jd(), r = F(n);
									let i;
									var a = F(r, !0);
									k(r);
									var o = L(r, 2), s = F(o), l = (e) => {
										var t = Wd(), n = F(t, !0);
										k(t), R((e) => U(n, e), [() => Y("update.actionDelete")]), H(e, t);
									};
									W(s, (e) => {
										z(t).action === "delete" && e(l);
									});
									var u = L(s, 2), d = (e) => {
										var n = qd();
										G(n, () => c.warn, !0), k(n), R((e) => J(n, "title", e), [() => Y(`update.conflict.${z(t).conflict}`)]), H(e, n);
									};
									W(u, (e) => {
										z(t).conflict && e(d);
									});
									var f = L(u, 2);
									K(f), k(o), k(n), R((e, n, o, s) => {
										i = pi(r, 1, "update-path svelte-1n46o8q", null, i, e), J(r, "title", z(t).path), U(a, z(t).path), bi(f, n), J(f, "title", o), J(f, "aria-label", s);
									}, [
										() => ({ skipped: z(Zr).has(z(t).path) }),
										() => z(Zr).has(z(t).path),
										() => Y("update.keepMine.title"),
										() => Y("update.keepMine")
									]), B("change", f, () => $r(z(t).path)), H(e, n);
								}), R((e, t) => {
									U(i, e), U(o, t);
								}, [() => Y("update.optionalTitle"), () => Y("update.keepMine")]), H(e, t);
							}, g = /* @__PURE__ */ j(() => z(Jr).changes.some((e) => !e.atom));
							W(m, (e) => {
								z(g) && e(h);
							});
							var _ = L(m, 2), v = F(_, !0);
							k(_), R((e, t, n, i, a, o) => {
								U(r, e), J(d, "title", t), U(f, `${n ?? ""} · ${i ?? ""}`), _.disabled = z(Xr) || !z(ee)?.allowed, J(_, "title", a), U(v, o);
							}, [
								() => Y("update.summary", {
									writes: z(Jr).changes.filter((e) => e.action === "write").length,
									deletes: z(Jr).changes.filter((e) => e.action === "delete").length
								}),
								() => Y("update.atomGroup.title"),
								() => Y("update.atomTitle"),
								() => z(Jr).changes.filter((e) => e.atom).length,
								() => z(ee)?.allowed ? Y("update.run.title") : Y("tip.history.needsAccess"),
								() => Y("update.run", { target: z(Jr).target })
							]), B("click", _, ei), H(e, t);
						};
						W(s, (e) => {
							z(Jr).upToDate ? e(l) : e(u, -1);
						}), R((e) => U(i, e), [() => Y("update.current", { version: z(Jr).current })]), H(e, t);
					};
					W(n, (e) => {
						z(Xr) && !z(Jr) ? e(r) : z(Yr) ? e(i, 1) : z(Jr) && e(a, 2);
					}), k(t), H(e, t);
				};
				W(s, (e) => {
					z(ct) === "pages" ? e(l) : z(ct) === "nav" ? e(u, 1) : z(ct) === "site" ? e(d, 2) : z(ct) === "theme" ? e(p, 3) : z(ct) === "blocks" ? e(m, 4) : z(ct) === "grid" ? e(_, 5) : z(ct) === "properties" ? e(v, 6) : z(ct) === "footer" ? e(y, 7) : z(ct) === "collections" ? e(b, 8) : z(ct) === "plugins" ? e(x, 9) : z(ct) === "history" ? e(S, 10) : z(ct) === "update" && e(C, 11);
				}), k(t), R((e) => {
					J(i, "title", e), U(o, pt[z(ct)]);
				}, [() => mt[z(ct)]?.map((e) => Y(e)).join("\n")]), H(e, t);
			};
			W(v, (e) => {
				z(ct) && e(y);
			}), R((e) => {
				p = pi(d, 1, "rail-gear svelte-1n46o8q", null, p, { active: z(li) }), J(d, "title", e);
			}, [() => Y("settings.title")]), B("click", d, () => P(li, !z(li))), H(e, t);
		};
		W(i, (e) => {
			z(ne) && e(o);
		});
		var s = L(i, 2);
		let d;
		var p = F(s), m = F(p);
		Oi(m, (e) => P(w, e), () => z(w)), k(p), k(s), Oi(s, (e) => P(se, e), () => z(se)), k(t), R((e) => {
			d = pi(s, 1, "frame-wrap svelte-1n46o8q", null, d, {
				mobile: z(oe) === "mobile",
				pan: z(xe)
			}), hi(p, `width:${z(ye) ?? ""}px; height:${z(be) ?? ""}px`), J(m, "title", e), J(m, "src", `/?page=${z(g)}&preview=1`), hi(m, `width:${z(he) ?? ""}px; height:${z(ve) ?? ""}px; transform:scale(${z(ge) ?? ""}); transform-origin:top left`);
		}, [() => Y("ui.previewTitle")]), Tr("load", m, ai), Cr(m), H(e, t);
	}, Yp = (e) => {
		var t = tf(), n = F(t, !0);
		k(t), R((e) => U(n, e), [() => Y("ui.loading")]), H(e, t);
	};
	W(qp, (e) => {
		z(m) ? e(Jp) : e(Yp, -1);
	});
	var Xp = L(qp, 2), Zp = (e) => {
		no(e, {
			get image() {
				return z(ta);
			},
			onapply: ra,
			oncancel: () => P(ta, null)
		});
	};
	W(Xp, (e) => {
		z(ta) && e(Zp);
	});
	var Qp = L(Xp, 2), $p = (e) => {
		var t = rf(), n = F(t), r = F(n), i = F(r, !0);
		k(r);
		var a = L(r, 2);
		Kr(a, 16, () => z(Ze).lines, (e) => e, (e, t) => {
			var n = nf(), r = F(n, !0);
			k(n), R(() => U(r, t)), H(e, n);
		});
		var o = L(a, 2), s = (e) => {
			var t = pl();
			K(t), lt(t, !0), R(() => J(t, "placeholder", z(Ze).placeholder)), B("keydown", t, (e) => e.key === "Enter" && z(Ze).value.trim() && et(!0)), wi(t, () => z(Ze).value, (e) => z(Ze).value = e), H(e, t);
		};
		W(o, (e) => {
			z(Ze).prompt && e(s);
		});
		var c = L(o, 2), l = F(c), u = F(l, !0);
		k(l);
		var d = L(l, 2), f = F(d, !0);
		k(d), k(c), k(n), k(t), R(() => {
			U(i, z(Ze).title), U(u, z(Ze).cancelLabel), U(f, z(Ze).okLabel);
		}), B("pointerdown", t, (e) => tt = e.target === e.currentTarget), B("click", t, (e) => tt && e.target === e.currentTarget && et(!1)), B("click", l, () => et(!1)), B("click", d, () => et(!0)), H(e, t);
	};
	W(Qp, (e) => {
		z(Ze) && e($p);
	});
	var em = L(Qp, 2), tm = (e) => {
		var t = af(), n = F(t), r = F(n), i = F(r, !0);
		k(r);
		var a = L(r, 2), o = F(a, !0);
		k(a);
		var s = L(a, 2), c = F(s), l = L(c);
		K(l), k(s);
		var u = L(s, 2), d = F(u), f = L(d);
		{
			let e = /* @__PURE__ */ j(() => Y("setup.accentPick"));
			sa(f, {
				get value() {
					return z(it);
				},
				get label() {
					return z(e);
				},
				onchange: (e) => P(it, e, !0)
			});
		}
		k(u);
		var p = L(u, 2), m = F(p), h = L(m);
		{
			let e = /* @__PURE__ */ j(() => Y("setup.bgLabel"));
			sa(h, {
				get value() {
					return z(at);
				},
				get label() {
					return z(e);
				},
				onchange: (e) => P(at, e, !0)
			});
		}
		k(p);
		var g = L(p, 2), _ = F(g, !0);
		k(g);
		var v = L(g, 2), y = F(v), b = F(y, !0);
		k(y);
		var x = L(y, 2), S = F(x, !0);
		k(x), k(v), k(n), k(t), R((e, t, n, r, a, s, u, f, p, h) => {
			U(i, e), U(o, t), U(c, `${n ?? ""} `), J(l, "placeholder", r), U(d, `${a ?? ""} `), U(m, `${s ?? ""} `), U(_, u), U(b, f), x.disabled = p, U(S, h);
		}, [
			() => Y("setup.title"),
			() => Y("setup.intro"),
			() => Y("setup.nameLabel"),
			() => Y("ph.setup.name"),
			() => Y("setup.accentLabel"),
			() => Y("setup.bgLabel"),
			() => Y("setup.outro"),
			() => Y("setup.skip"),
			() => !z(rt).trim(),
			() => Y("setup.start")
		]), B("keydown", l, (e) => e.key === "Enter" && st()), wi(l, () => z(rt), (e) => P(rt, e)), B("click", y, ot), B("click", x, st), H(e, t);
	};
	W(em, (e) => {
		z(nt) && e(tm);
	});
	var nm = L(em, 2), rm = (e) => {
		var t = of();
		let n;
		var r = F(t), i = F(r, !0);
		k(r);
		var a = L(r, 2);
		k(t), R((e) => {
			n = pi(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: z(y) === "ok",
				error: z(y) === "error"
			}), U(i, z(v)), J(a, "title", e);
		}, [() => Y("ui.close")]), B("click", a, () => x("")), H(e, t);
	};
	W(nm, (e) => {
		z(v) && e(rm);
	}), k(jp);
	var im = L(jp, 2), am = (e) => {
		var t = sf(), n = F(t), r = F(n), i = F(r, !0);
		k(r);
		var o = L(r, 2);
		G(o, () => c.cross, !0), k(o), k(n);
		var s = L(n, 2), l = F(s);
		a(l), k(s), k(t), R((e, n) => {
			hi(t, `left: ${z(Et).left ?? ""}px; top: ${z(Et).top ?? ""}px`), U(i, e), J(o, "title", n);
		}, [() => Y("blocks.suffix", { label: nn[z(A).type] ?? z(A).type }), () => Y("tip.closeEsc")]), B("click", o, () => P(Et, null)), H(e, t);
	};
	W(im, (e) => {
		z(Et) && z(A) && e(am);
	}), R(() => Fp = pi(Pp, 1, "topbar svelte-1n46o8q", null, Fp, { hidden: !z(ne) })), H(e, Ap), Je();
}
//#endregion
//#region src/main.js
Er([
	"click",
	"input",
	"pointerdown",
	"change",
	"keydown"
]), document.documentElement.lang = await Gi();
var uf = Lr(lf, { target: document.getElementById("urd-admin") });
//#endregion
export { uf as default };
