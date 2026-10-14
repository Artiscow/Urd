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
//#endregion
//#region node_modules/svelte/src/internal/client/constants.js
var g = 1 << 24, _ = 1024, v = 2048, y = 4096, b = 8192, x = 16384, S = 32768, C = 1 << 25, w = 65536, T = 1 << 19, ee = 1 << 20, te = 1 << 25, ne = 1 << 21, re = 1 << 22, E = 1 << 23, ie = Symbol("$state"), ae = Symbol("component"), oe = Symbol("legacy props"), se = Symbol(""), ce = Symbol("attributes"), le = Symbol("class"), ue = Symbol("style"), de = Symbol("text"), fe = Symbol("form reset"), pe = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), me = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml"), he = {}, ge = Symbol("uninitialized"), _e = "http://www.w3.org/1999/xhtml", ve = "http://www.w3.org/2000/svg", ye = "http://www.w3.org/1998/Math/MathML";
function be() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function xe(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Se() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
var Ce = !1;
function we(e) {
	Ce = e;
}
var Te;
function Ee(e) {
	if (e === null) throw xe(), he;
	return Te = e;
}
function De() {
	return Ee(/* @__PURE__ */ hn(Te));
}
function D(e) {
	if (Ce) {
		if (/* @__PURE__ */ hn(Te) !== null) throw xe(), he;
		Te = e;
	}
}
function Oe(e = 1) {
	if (Ce) {
		for (var t = e, n = Te; t--;) n = /* @__PURE__ */ hn(n);
		Te = n;
	}
}
function ke(e = !0) {
	for (var t = 0, n = Te;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ hn(n);
		e && n.remove(), n = i;
	}
}
function Ae(e) {
	if (!e || e.nodeType !== 8) throw xe(), he;
	return e.data;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
function je(e) {
	return e === this.v;
}
function Me(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Ne(e) {
	return !Me(e, this.v);
}
function Pe(e) {
	throw Error("https://svelte.dev/e/lifecycle_outside_component");
}
//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
function Fe() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function Ie(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function Le(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function Re() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function ze(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function Be() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Ve(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function He() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function O() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function Ue() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function We() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
//#endregion
//#region node_modules/svelte/src/internal/shared/clone.js
var k = [];
function Ge(e, t = !1, n = !1) {
	return Ke(e, /* @__PURE__ */ new Map(), "", k, null, n);
}
function Ke(t, n, r, i, a = null, o = !1) {
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
				d in t && (u[d] = Ke(f, n, r, i, null, o));
			}
			return u;
		}
		if (l(t) === s) {
			u = {}, n.set(t, u), a !== null && n.set(a, u);
			for (var p of Object.keys(t)) u[p] = Ke(t[p], n, r, i, null, o);
			return u;
		}
		if (t instanceof Date) return t.getTime(), structuredClone(t);
		if (typeof t.toJSON == "function" && !o) return Ke(t.toJSON(), n, r, i, t);
	}
	if (t instanceof EventTarget) return t;
	try {
		return structuredClone(t);
	} catch {
		return t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/shared/context.js
function qe(e) {
	let t = e.p;
	for (; t !== null && t.c === null;) t = t.p;
	return t?.c ?? null;
}
function Je(e, t) {
	return e === null && Pe(t), e.c ??= new Map(qe(e) || void 0);
}
//#endregion
//#region node_modules/svelte/src/internal/client/context.js
var Ye = null;
function Xe(e) {
	Ye = e;
}
function Ze(e) {
	return Je(Ye, "getContext").get(e);
}
function Qe(e, t) {
	return Je(Ye, "setContext").set(e, t), t;
}
function $e(e, t = !1, n) {
	Ye = {
		p: Ye,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: er,
		l: null
	};
}
function et(e) {
	var t = Ye, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) On(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, Ye = t.p, tt(e);
}
function tt(e = {}) {
	return i(e, ae, { value: !0 }), e;
}
function nt() {
	return !0;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var rt = [];
function it() {
	var e = rt;
	rt = [], p(e);
}
function at(e) {
	if (rt.length === 0 && !Ft) {
		var t = rt;
		queueMicrotask(() => {
			t === rt && it();
		});
	}
	rt.push(e);
}
function ot() {
	for (; rt.length > 0;) it();
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/status.js
var st = ~(v | y | _);
function ct(e, t) {
	e.f = e.f & st | t;
}
function lt(e) {
	e.f & 512 || e.deps === null ? ct(e, _) : ct(e, y);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function ut(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), ct(e, _);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
function dt(e, t) {
	if (t) {
		let t = document.body;
		e.autofocus = !0, at(() => {
			document.activeElement === t && e.focus();
		});
	}
}
function ft(e) {
	Ce && /* @__PURE__ */ mn(e) !== null && gn(e);
}
var pt = !1;
function mt() {
	pt || (pt = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[fe]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function ht(e) {
	var t = Zn, n = er;
	$n(null), tr(null);
	try {
		return e();
	} finally {
		$n(t), tr(n);
	}
}
function gt(e, t, n, r = n) {
	e.addEventListener(t, () => ht(n));
	let i = e[fe];
	e[fe] = i ? () => {
		i(), r(!0);
	} : () => r(!0), mt();
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function _t(e, t, n, r) {
	let i = nt() ? xt : wt;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = er, c = vt(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				xn(e, s);
			}
			yt();
		}
	}
	var d = bt();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ Ct(e))).then(u).catch((e) => xn(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), yt();
	}) : f();
}
function vt() {
	var e = er, t = Zn, n = Ye, r = jt;
	return function(i = !0) {
		tr(e), $n(t), Xe(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function yt(e = !0) {
	tr(null), $n(null), Xe(null), e && jt?.deactivate();
}
function bt() {
	var e = er, t = e.b, n = jt, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function xt(e) {
	var t = 2 | v;
	return er !== null && (er.f |= T), {
		ctx: Ye,
		deps: null,
		effects: null,
		equals: je,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: ge,
		wv: 0,
		parent: er,
		ac: null
	};
}
var St = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function Ct(e, t, n) {
	let r = er;
	r === null && Fe();
	var i = void 0, a = Qt(ge), o = !Zn, s = /* @__PURE__ */ new Set();
	return jn(() => {
		var t = er, n = m();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== pe && n.reject(e);
			}).finally(yt);
		} catch (e) {
			n.reject(e), yt();
		}
		var c = jt;
		if (o) {
			if (t.f & 32768) var l = bt();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(St);
			else for (let e of s.values()) e.reject(St);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== St && (c.activate(), t ? (a.f |= E, nn(a, t)) : (a.f & 8388608 && (a.f ^= E), nn(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), En(() => {
		for (let e of s) e.reject(St);
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
function A(e) {
	let t = /* @__PURE__ */ xt(e);
	return rr(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function wt(e) {
	let t = /* @__PURE__ */ xt(e);
	return t.equals = Ne, t;
}
function Tt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) zn(t[n]);
	}
}
function Et(e) {
	var t, n = er, r = e.parent;
	if (!Yn && r !== null && e.v !== ge && r.f & 24576) return be(), e.v;
	tr(r);
	try {
		Tt(e), t = hr(e);
	} finally {
		tr(n);
	}
	return t;
}
function Dt(e) {
	var t = Et(e);
	if (!e.equals(t) && (e.wv = fr(), (!jt?.is_fork || e.deps === null) && (jt === null ? e.v = t : (jt.capture(e, t, !0), Mt?.capture(e, t, !0)), e.deps === null))) {
		ct(e, _);
		return;
	}
	Yn || (Nt === null ? lt(e) : (Tn() || jt?.is_fork) && Nt.set(e, t));
}
function Ot(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && ht(() => {
		t.ac.abort(pe), t.ac = null;
	}), t.fn !== null && (t.teardown = f), vr(t, 0), Ln(t));
}
function kt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && yr(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var At = null, jt = null, Mt = null, Nt = null, Pt = null, Ft = !1, It = !1, Lt = null, Rt = null, zt = 0, Bt = 1, Vt = class e {
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
		At === null ? At = this : (At.#n = this, this.#t = At), At = this;
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
			for (var r of n.d) ct(r, v), t(r);
			for (r of n.m) ct(r, y), t(r);
		}
		this.#p.add(e);
	}
	#g() {
		var e = [];
		for (let i of this.#c) if (!(i.f & 16384 || !(i.f & 6144))) {
			for (var t = i, n = !1; t.parent !== null;) {
				t = t.parent;
				var r = t.f;
				if (r & 96) {
					if (!(r & 1024)) {
						n = !0;
						break;
					}
					t.f ^= _;
				}
			}
			n || e.push(t);
		}
		return this.#c = [], e;
	}
	#_() {
		this.#e = !0;
		for (let e of this.#u) this.#d.delete(e), ct(e, v), this.schedule(e);
		for (let e of this.#d) ct(e, y), this.schedule(e);
		this.apply();
		for (var t = Lt = [], n = [], r = Rt = []; this.#c.length > 0;) {
			zt++ > 1e3 && (this.#S(), Ut());
			for (let e of this.#g()) try {
				this.#v(e, t, n);
			} catch (t) {
				throw Jt(e), this.#h() || this.discard(), t;
			}
		}
		if (jt = null, r.length > 0) {
			var i = e.ensure();
			for (let e of r) i.schedule(e);
		}
		if (Lt = null, Rt = null, this.#h()) {
			this.#x(n), this.#x(t);
			for (let [e, t] of this.#f) qt(e, t);
			r.length > 0 && jt.#_();
			return;
		}
		let a = this.#y();
		if (a) {
			this.#x(n), this.#x(t), a.#b(this);
			return;
		}
		this.#u.clear(), this.#d.clear();
		for (let e of this.#r) e(this);
		this.#r.clear(), Mt = this, Gt(n), Gt(t), Mt = null, this.#s?.resolve();
		var o = jt;
		if (this.#a === 0 && (this.#c.length === 0 || o !== null) && this.#S(), this.#c.length > 0) {
			if (o !== null) {
				for (let e of this.#c) o.#c.push(e);
				this.#c = [];
			} else o = this;
		}
		o !== null && (Xt.clear(), o.#_());
	}
	#v(e, t, n) {
		e.f ^= _;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
				a ? r.f ^= _ : i & 4 ? t.push(r) : pr(r) && (i & 16 && this.#d.add(r), yr(r));
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
	#y() {
		for (var e = this.#t; e !== null;) {
			if (!e.is_fork) {
				for (let [t, [, n]] of this.current) if (e.current.has(t) && !n) return e;
			}
			e = e.#t;
		}
		return null;
	}
	#b(e) {
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), ct(i, v), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#S(), jt = this, this.#_();
	}
	#x(e) {
		for (var t = 0; t < e.length; t += 1) ut(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== ge && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), Nt?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		jt = this;
	}
	deactivate() {
		jt = null, Nt = null;
	}
	flush() {
		try {
			It = !0, jt = this, this.#_();
		} finally {
			zt = 0, Pt = null, Lt = null, Rt = null, It = !1, jt = null, Nt = null, Xt.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(St);
		this.#S(), this.#s?.resolve();
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
		this.#m || (this.#m = !0, at(() => {
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
		if (jt === null) {
			let t = jt = new e();
			!It && !Ft && at(() => {
				t.#e || t.flush();
			});
		}
		return jt;
	}
	apply() {
		Nt = null;
	}
	schedule(e) {
		if (Pt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		this.#c.push(e);
	}
	#S() {
		if (this.linked) {
			var e = this.#t, t = this.#n;
			e === null || (e.#n = t), t === null ? At = e : t.#t = e, this.linked = !1;
		}
	}
};
function Ht(e) {
	var t = Ft;
	Ft = !0;
	try {
		var n;
		for (e && (jt !== null && !jt.is_fork && jt.flush(), n = e());;) {
			if (ot(), jt === null) return n;
			jt.flush();
		}
	} finally {
		Ft = t;
	}
}
function Ut() {
	try {
		Be();
	} catch (e) {
		xn(e, Pt);
	}
}
var Wt = null;
function Gt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && pr(r) && (Wt = /* @__PURE__ */ new Set(), yr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Vn(r), Wt?.size > 0)) {
				Xt.clear();
				for (let e of Wt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Wt.has(n) && (Wt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || yr(n);
					}
				}
				Wt.clear();
			}
		}
		Wt = null;
	}
}
function Kt(e) {
	jt.schedule(e);
}
function qt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), ct(e, _);
		for (var n = e.first; n !== null;) qt(n, t), n = n.next;
	}
}
function Jt(e) {
	ct(e, _);
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
		equals: je,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function j(e, t) {
	let n = Qt(e, t);
	return rr(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function $t(e, t = !1, n = !0) {
	let r = Qt(e);
	return t || (r.equals = Ne), r;
}
function M(e, t, n = !1) {
	return Zn !== null && (!Qn || Zn.f & 131072) && nt() && Zn.f & 4325394 && (nr === null || !nr.has(e)) && Ue(), nn(e, n ? sn(t) : t, Rt);
}
var en = null, tn = 0;
function nn(e, t, n = null) {
	if (!e.equals(t)) {
		Yn ? Xt.set(e, t) : Xt.has(e) || Xt.set(e, e.v);
		var r = Vt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && Et(t), Nt === null && lt(t);
		}
		e.wv = fr(), en = null, tn = 0, on(e, v, n), en = null, nt() && er !== null && er.f & 1024 && !(er.f & 96) && (or === null ? sr([e]) : or.push(e)), !r.is_fork && Yt.size > 0 && !Zt && rn();
	}
	return t;
}
function rn() {
	Zt = !1;
	for (let e of Yt) {
		e.f & 1024 && ct(e, y);
		let t;
		try {
			t = pr(e);
		} catch {
			t = !0;
		}
		t && yr(e);
	}
	Yt.clear();
}
function an(e) {
	M(e, e.v + 1);
}
function on(e, t, n) {
	var r = e.reactions;
	if (r !== null) {
		var i = nt(), a = r.length;
		if (tn += a, tn > 1e5 && en === null && (en = /* @__PURE__ */ new Set()), en !== null) {
			if (en.has(e)) return;
			en.add(e);
		}
		for (var o = 0; o < a; o++) {
			var s = r[o], c = s.f;
			if (i || s !== er) {
				var l = (c & v) === 0;
				if (l && ct(s, t), c & 131072) Yt.add(s);
				else if (c & 2) {
					var u = s;
					Nt?.delete(u), on(u, y, n);
				} else if (l) {
					var d = s;
					c & 16 && Wt !== null && Wt.add(d), n === null ? Kt(d) : n.push(d);
				}
			}
		}
	}
}
function sn(t) {
	if (typeof t != "object" || !t || ie in t || ae in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ j(0), u = null, d = ur, f = (e) => {
		if (ur === d) return e();
		var t = Zn, n = ur;
		$n(null), dr(d);
		var r = e();
		return $n(t), dr(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ j(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && He();
			var i = r.get(t);
			return i === void 0 ? f(() => {
				var e = /* @__PURE__ */ j(n.value, u);
				return r.set(t, e), e;
			}) : M(i, n.value, !0), !0;
		},
		deleteProperty(e, t) {
			var n = r.get(t);
			if (n === void 0) {
				if (t in e) {
					let e = f(() => /* @__PURE__ */ j(ge, u));
					r.set(t, e), an(o);
				}
			} else M(n, ge), an(o);
			return !0;
		},
		get(e, n, i) {
			if (n === ie) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ j(sn(s ? e[n] : ge), u)), r.set(n, o)), o !== void 0) {
				var c = R(o);
				return c === ge ? void 0 : c;
			}
			return Reflect.get(e, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			this.has?.(e, t);
			var n = Reflect.getOwnPropertyDescriptor(e, t), i = r.get(t);
			if (i !== void 0) {
				var a = R(i);
				if (a === ge) return;
				if (n && "value" in n) n.value = a;
				else return {
					enumerable: !0,
					configurable: !0,
					value: a,
					writable: !0
				};
			}
			return n;
		},
		has(e, t) {
			if (t === ie) return !0;
			var n = r.get(t), i = n !== void 0 && n.v !== ge || Reflect.has(e, t);
			return (n !== void 0 || er !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ j(i ? sn(e[t]) : ge, u)), r.set(t, n)), R(n) === ge) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ j(ge, u)), r.set(d + "", p)) : M(p, ge);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ j(void 0, u)), M(c, sn(n)), r.set(t, c));
			else {
				l = c.v !== ge;
				var m = f(() => sn(n));
				M(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && M(g, _ + 1);
				}
				an(o);
			}
			return !0;
		},
		ownKeys(e) {
			R(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== ge;
			});
			for (var [n, i] of r) i.v !== ge && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			O();
		}
	});
}
var cn, ln, un, dn;
function fn() {
	if (cn === void 0) {
		cn = window, ln = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		un = a(t, "firstChild").get, dn = a(t, "nextSibling").get, u(e) && (e[le] = void 0, e[ce] = null, e[ue] = void 0, e.__e = void 0), u(n) && (n[de] = void 0);
	}
}
function pn(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function mn(e) {
	return un.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function hn(e) {
	return dn.call(e);
}
function N(e, t) {
	if (!Ce) return /* @__PURE__ */ mn(e);
	var n = /* @__PURE__ */ mn(Te);
	if (n === null) n = Te.appendChild(pn());
	else if (t && n.nodeType !== 3) {
		var r = pn();
		return n?.before(r), Ee(r), r;
	}
	return t && yn(n), Ee(n), n;
}
function P(e, t = !1) {
	if (!Ce) {
		var n = /* @__PURE__ */ mn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ hn(n) : n;
	}
	if (t) {
		if (Te?.nodeType !== 3) {
			var r = pn();
			return Te?.before(r), Ee(r), r;
		}
		yn(Te);
	}
	return Te;
}
function F(e, t = !1) {
	if (!Ce) return /* @__PURE__ */ mn(e);
	var n = N(e, t);
	return D(e), n;
}
function I(e, t = 1, n = !1) {
	let r = Ce ? Te : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ hn(r);
	if (!Ce) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = pn();
			return r === null ? i?.after(a) : r.before(a), Ee(a), a;
		}
		yn(r);
	}
	return Ee(r), r;
}
function gn(e) {
	e.textContent = "";
}
function _n() {
	return !1;
}
function vn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function yn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
function bn(e) {
	var t = er;
	if (t === null) return Zn.f |= E, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	xn(e, t);
}
function xn(e, t) {
	if (!(t !== null && t.f & 16384)) {
		for (; t !== null;) {
			if (t.f & 128 && !(t.f & 33570816)) {
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
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function Sn(e) {
	er === null && (Zn === null && ze(e), Re()), Yn && Le(e);
}
function Cn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function wn(e, t) {
	var n = er;
	n !== null && n.f & 8192 && (e |= b);
	var r = {
		ctx: Ye,
		deps: null,
		nodes: null,
		f: e | v | 512,
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
	jt?.register_created_effect(r);
	var i = r;
	if (e & 4) Lt === null ? Vt.ensure().schedule(r) : Lt.push(r);
	else if (t !== null) {
		try {
			yr(r);
		} catch (e) {
			throw zn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= w));
	}
	if (i !== null && (i.parent = n, n !== null && Cn(i, n), Zn !== null && Zn.f & 2 && !(e & 64))) {
		var a = Zn;
		(a.effects ??= []).push(i);
	}
	return r;
}
function Tn() {
	return Zn !== null && !Qn;
}
function En(e) {
	let t = wn(8, null);
	return ct(t, _), t.teardown = e, t;
}
function Dn(e) {
	Sn("$effect");
	var t = er.f;
	if (!Zn && t & 32 && Ye !== null && !Ye.i) {
		var n = Ye;
		(n.e ??= []).push(e);
	} else return On(e);
}
function On(e) {
	return wn(4 | ee, e);
}
function kn(e) {
	Vt.ensure();
	let t = wn(64 | T, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Hn(t, () => {
			zn(t), n(void 0);
		}) : (zn(t), n(void 0));
	});
}
function An(e) {
	return wn(4, e);
}
function jn(e) {
	return wn(re | T, e);
}
function Mn(e, t = 0) {
	return wn(8 | t, e);
}
function L(e, t = [], n = [], r = []) {
	_t(r, t, n, (t) => {
		wn(8, () => {
			e(...t.map(R));
		});
	});
}
function Nn(e, t = 0) {
	return wn(16 | t, e);
}
function Pn(e, t = 0) {
	return wn(g | t, e);
}
function Fn(e) {
	return wn(32 | T, e);
}
function In(e) {
	var t = e.teardown;
	if (t !== null) {
		let n = Yn, r = Zn;
		Xn(!0), $n(null);
		try {
			t.call(null);
		} catch (t) {
			xn(t, e.parent);
		} finally {
			Xn(n), $n(r);
		}
	}
}
function Ln(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && ht(() => {
			e.abort(pe);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : zn(n, t), n = r;
	}
}
function Rn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || zn(t), t = n;
	}
}
function zn(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Bn(e.nodes.start, e.nodes.end), n = !0), e.f |= C, Ln(e, t && !n), vr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	In(e), e.f ^= C, e.f |= x;
	var i = e.parent;
	i !== null && i.first !== null && Vn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Bn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ hn(e);
		e.remove(), e = n;
	}
}
function Vn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Hn(e, t, n = !0) {
	var r = [];
	e.f |= 256, Un(e, r, !0);
	var i = () => {
		n && zn(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Un(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= b;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				Un(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Wn(e) {
	e.f &= -257, Gn(e, !0);
}
function Gn(e, t) {
	if (!(e.f & 256) && e.f & 8192) {
		e.f ^= b, e.f & 1024 || (ct(e, v), Vt.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			Gn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Kn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ hn(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var qn = null, Jn = !1, Yn = !1;
function Xn(e) {
	Yn = e;
}
var Zn = null, Qn = !1;
function $n(e) {
	Zn = e;
}
var er = null;
function tr(e) {
	er = e;
}
var nr = null;
function rr(e) {
	Zn !== null && (Zn.f & 2097152 || Zn.f & 2) && (nr ??= /* @__PURE__ */ new Set()).add(e);
}
var ir = null, ar = 0, or = null;
function sr(e) {
	or = e;
}
var cr = 1, lr = 0, ur = lr;
function dr(e) {
	ur = e;
}
function fr() {
	return ++cr;
}
function pr(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (pr(a) && Dt(a), a.wv > e.wv) return !0;
		}
		t & 512 && Nt === null && ct(e, _);
	}
	return !1;
}
function mr(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(nr !== null && nr.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? mr(a, t, !1) : t === a && (n ? ct(a, v) : a.f & 1024 && ct(a, y), Kt(a));
	}
}
function hr(e) {
	var t = ir, n = ar, r = or, i = Zn, a = nr, o = Ye, s = Qn, c = ur, l = e.f;
	ir = null, ar = 0, or = null, Zn = l & 96 ? null : e, nr = null, Xe(e.ctx), Qn = !1, ur = ++lr, e.ac !== null && (ht(() => {
		e.ac.abort(pe);
	}), e.ac = null);
	try {
		e.f |= ne;
		var u = e.fn, d = u();
		e.f |= S;
		var f = gr(e);
		if (nt() && or !== null && !Qn && f !== null && !(e.f & 6146)) for (var p = 0; p < or.length; p++) mr(or[p], e);
		if (i !== null && i !== e) {
			if (lr++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = lr;
			if (t !== null) for (let e of t) e.rv = lr;
			or !== null && (r === null ? r = or : r.push(...or));
		}
		return e.f & 8388608 && (e.f ^= E), d;
	} catch (t) {
		return gr(e), bn(t);
	} finally {
		e.f ^= ne, ir = t, ar = n, or = r, Zn = i, nr = a, Xe(o), Qn = s, ur = c;
	}
}
function gr(e) {
	var t = e.deps, n = jt?.is_fork;
	if (ir !== null) {
		var r;
		if (n || vr(e, ar), t !== null && ar > 0) for (t.length = ar + ir.length, r = 0; r < ir.length; r++) t[ar + r] = ir[r];
		else e.deps = t = ir;
		if (Tn() && e.f & 512) for (r = ar; r < t.length; r++) (t[r].reactions ??= []).push(e);
	} else !n && t !== null && ar < t.length && (vr(e, ar), t.length = ar);
	return t;
}
function _r(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && (ir === null || !n.call(ir, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512), s.v !== ge && lt(s), s.ac !== null && ht(() => {
			s.ac.abort(pe), s.ac = null, ct(s, v);
		}), Ot(s), vr(s, 0);
	}
}
function vr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) _r(e, n[r]);
}
function yr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		ct(e, _);
		var n = er, r = Jn;
		er = e, Jn = !(t & 96);
		try {
			t & 16777232 ? Rn(e) : Ln(e), In(e);
			var i = hr(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = cr;
		} finally {
			Jn = r, er = n;
		}
	}
}
async function br() {
	await Promise.resolve(), Ht();
}
function R(e) {
	var t = !!(e.f & 2);
	if (qn?.add(e), Zn !== null && !Qn && !(er !== null && er.f & 16384) && (nr === null || !nr.has(e))) {
		var r = Zn.deps;
		if (Zn.f & 2097152) e.rv < lr && (e.rv = lr, ir === null && r !== null && r[ar] === e ? ar++ : ir === null ? ir = [e] : ir.push(e));
		else {
			Zn.deps ??= [], n.call(Zn.deps, e) || Zn.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [Zn] : n.call(i, Zn) || i.push(Zn);
		}
	}
	if (Yn && Xt.has(e)) return Xt.get(e);
	if (t) {
		var a = e;
		if (Yn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || Sr(a)) && (o = Et(a)), Xt.set(a, o), o;
		}
		var s = !(a.f & 512) && !Qn && Zn !== null && (Jn || !!(Zn.f & 512)), c = (a.f & S) === 0;
		pr(a) && (s && (a.f |= 512), Dt(a)), s && !c && (kt(a), xr(a));
	}
	if (Nt?.has(e)) return Nt.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function xr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (kt(t), xr(t));
}
function Sr(e) {
	if (e.v === ge) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Xt.has(t) || t.f & 2 && Sr(t)) return !0;
	return !1;
}
function Cr(e) {
	var t = Qn;
	try {
		return Qn = !0, e();
	} finally {
		Qn = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var wr = ["touchstart", "touchmove"];
function Tr(e) {
	return wr.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var Er = Symbol("events"), Dr = /* @__PURE__ */ new Set(), Or = /* @__PURE__ */ new Set();
function kr(e) {
	if (!Ce) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function Ar(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Fr.call(t, e), !e.cancelBubble) return ht(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? (i.__removed = !1, at(() => {
		i.__removed || t.addEventListener(e, i, r);
	})) : t.addEventListener(e, i, r), i;
}
function jr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = Ar(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && En(() => {
		o.__removed = !0, t.removeEventListener(e, o, a);
	});
}
function z(e, t, n) {
	(t[Er] ??= {})[e] = n;
}
function Mr(e) {
	for (var t = 0; t < e.length; t++) Dr.add(e[t]);
	for (var n of Or) n(e);
}
var Nr = null, Pr = !1;
function Fr(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	Nr = e, Pr || (Pr = !0, setTimeout(() => {
		Pr = !1, Nr = null;
	}));
	var s = 0, c = Nr === e && e[Er];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[Er] = t;
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
		var d = Zn, f = er;
		$n(null), tr(null);
		try {
			for (var p, m = []; o !== null && o !== t;) {
				try {
					var h = o[Er]?.[r];
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
			e[Er] = t, delete e.currentTarget, $n(d), tr(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var Ir = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Lr(e) {
	return Ir?.createHTML(e) ?? e;
}
function Rr(e) {
	var t = vn("template");
	return t.innerHTML = Lr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function zr(e, t) {
	var n = er;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function B(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (Ce) return zr(Te, null), Te;
		i === void 0 && (i = Rr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ mn(i)));
		var t = r || ln ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ mn(t), s = t.lastChild;
			zr(o, s);
		} else zr(t, t);
		return t;
	};
}
function Br(e = "") {
	if (!Ce) {
		var t = pn(e + "");
		return zr(t, t), t;
	}
	var n = Te;
	return n.nodeType === 3 ? yn(n) : (n.before(n = pn()), Ee(n)), zr(n, n), n;
}
function Vr() {
	if (Ce) return zr(Te, null), Te;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = pn();
	return e.append(t, n), zr(t, n), e;
}
function V(e, t) {
	if (Ce) {
		var n = er;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = Te), De();
		return;
	}
	e !== null && e.before(t);
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function Hr(e) {
	let t = 0, n = Qt(0), r;
	return () => {
		Tn() && (R(n), Mn(() => (t === 0 && (r = Cr(() => e(() => an(n)))), t += 1, () => {
			at(() => {
				--t, t === 0 && (r?.(), r = void 0, an(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Ur = w | T;
function Wr(e, t, n, r) {
	new Gr(e, t, n, r);
}
var Gr = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = Ce ? Te : null;
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
	#h = Hr(() => (this.#m = Qt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = er;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = er.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = Nn(() => {
			if (Ce) {
				let e = this.#t;
				De();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#y() : this.#g();
			} else this.#b();
		}, Ur), Ce && (this.#e = Te);
	}
	#g() {
		try {
			this.#a = Fn(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#v(e);
		at(r), t && (this.#s = Fn(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#v(e) {
		var t = !1, n = !1;
		let r = () => {
			if (t) {
				Se();
				return;
			}
			t = !0, n && We(), this.#s !== null && Hn(this.#s, () => {
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
					xn(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#y() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = Fn(() => e(this.#e)), at(() => {
			var e = this.#c = document.createDocumentFragment(), t = pn(), n = !1;
			if (e.append(t), this.#a = this.#S(() => {
				try {
					return Fn(() => this.#r(t));
				} catch (e) {
					try {
						this.error(e), n = !0;
					} catch (e) {
						xn(e, this.#i.parent);
					}
					return null;
				}
			}), this.#a === null) {
				this.#c = null, n && this.#x(jt);
				return;
			}
			this.#u === 0 && (this.#e.before(e), this.#c = null, Hn(this.#o, () => {
				this.#o = null;
			}), this.#x(jt));
		}));
	}
	#b() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = Fn(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Kn(this.#a, e);
				let t = this.#n.pending;
				this.#o = Fn(() => t(this.#e));
			} else this.#x(jt);
		} catch (e) {
			this.error(e);
		}
	}
	#x(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		ut(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#S(e) {
		var t = er, n = Zn, r = Ye;
		tr(this.#i), $n(this.#i), Xe(this.#i.ctx);
		try {
			return Vt.ensure(), e();
		} finally {
			tr(t), $n(n), Xe(r);
		}
	}
	#C(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#C(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#x(t), this.#o && Hn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#C(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, at(() => {
			this.#d = !1, this.#m && nn(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), R(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		jt?.is_fork ? (this.#a && jt.skip_effect(this.#a), this.#o && jt.skip_effect(this.#o), this.#s && jt.skip_effect(this.#s), jt.oncommit(() => {
			this.#w(e);
		})) : this.#w(e);
	}
	#w(e) {
		this.#a &&= (zn(this.#a), null), this.#o &&= (zn(this.#o), null), this.#s &&= (zn(this.#s), null), Ce && (Ee(this.#t), Oe(), Ee(ke()));
		let t = this.#n.failed, n = (e) => {
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && (this.#s = this.#S(() => {
				try {
					return Fn(() => {
						var r = er;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return xn(e, this.#i.parent), null;
				}
			}));
		};
		at(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				xn(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => xn(e, this.#i && this.#i.parent)) : n(t);
		});
	}
}, Kr = !0;
function H(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[de] ??= e.nodeValue) && (e[de] = n, e.nodeValue = `${n}`);
}
function qr(e, t) {
	return Yr(e, t);
}
var Jr = /* @__PURE__ */ new Map();
function Yr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	fn();
	var l = void 0, u = kn(() => {
		var u = n ?? t.appendChild(pn());
		Wr(u, { pending: () => {} }, (t) => {
			$e({});
			var n = Ye;
			if (o && (n.c = o), a && (i.$$events = a), Ce && zr(t, null), Kr = s, l = e(t, i) || tt(), Kr = !0, Ce && (er.nodes.end = Te, Te === null || Te.nodeType !== 8 || Te.data !== "]")) throw xe(), he;
			et();
		}, c);
		var d = /* @__PURE__ */ new Set(), f = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!d.has(r)) {
					d.add(r);
					var i = Tr(r);
					for (let e of [t, document]) {
						var a = Jr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Jr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Fr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return f(r(Dr)), Or.add(f), () => {
			for (var e of d) for (let n of [t, document]) {
				var r = Jr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Fr), r.delete(e), r.size === 0 && Jr.delete(n)) : r.set(e, i);
			}
			Or.delete(f), u !== n && u.parentNode?.removeChild(u);
		};
	});
	return Xr.set(l, u), l;
}
var Xr = /* @__PURE__ */ new WeakMap(), Zr = class {
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
			if (n) Wn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (Wn(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (zn(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						Kn(r, t), t.append(pn()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else zn(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Hn(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (zn(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = jt, r = _n();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = pn();
				i.append(a), this.#n.set(e, {
					effect: Fn(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, Fn(() => t(this.anchor)));
		}
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else Ce && (this.anchor = Te), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function U(e, t, n = !1) {
	var r;
	Ce && (r = Te, De());
	var i = new Zr(e), a = n ? w : 0;
	function o(e, t) {
		if (Ce) {
			var n = Ae(r);
			if (e !== parseInt(n.substring(1))) {
				var a = ke();
				Ee(a), i.anchor = a, we(!1), i.ensure(e, t), we(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	Nn(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
function Qr(e, t) {
	return t;
}
function $r(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		Hn(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					ei(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null && e.pending.size === 0;
		if (l) {
			var u = n, d = u.parentNode;
			gn(d), d.append(u), e.items.clear();
		}
		ei(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function ei(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= te, Kn(a, document.createDocumentFragment())) : zn(t[i], n);
	}
}
var ti;
function ni(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = Ce ? Ee(/* @__PURE__ */ mn(u)) : u.appendChild(pn());
	}
	Ce && De();
	var d = null, f = /* @__PURE__ */ wt(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, ii(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= te, oi(d, null, c)) : Wn(d) : Hn(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: Nn(() => {
			p = R(f);
			var e = p.length;
			let t = !1;
			Ce && Ae(c) === "[!" != (e === 0) && (c = ke(), Ee(c), we(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = jt, v = _n(), y = 0; y < e; y += 1) {
				Ce && Te.nodeType === 8 && Te.data === "]" && (c = Te, t = !0, we(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && nn(S.v, b), S.i && nn(S.i, y), v && u.unskip_effect(S.e)) : (S = ai(l, h ? c : ti ??= pn(), b, x, y, o, n, i), h || (S.e.f |= te), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = Fn(() => s(c)) : (d = Fn(() => s(ti ??= pn())), d.f |= te)), e > r.size && Ie("", "", ""), Ce && e > 0 && Ee(ke()), !h) {
				if (m.set(u, r), v) {
					for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
					u.oncommit(g), u.ondiscard(_);
				} else g(u);
			}
			t && we(!0), R(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, Ce && (c = Te);
}
function ri(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function ii(e, t, n, i, a) {
	var o = !!(i & 8), s = t.length, c = e.items, l = ri(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (Wn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) {
			if (_.f ^= te, _ === l) oi(_, null, n);
			else {
				var y = d ? d.next : l;
				_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), si(e, d, _), si(e, _, y), oi(_, y, n), d = _, p = [], m = [], l = ri(d.next);
				continue;
			}
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) oi(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					si(e, S.prev, C.next), si(e, d, S), si(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), oi(_, l, n), si(e, _.prev, _.next), si(e, _, d === null ? e.effect.first : d.next), si(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = ri(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = ri(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (ei(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var w = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || w.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && w.push(l), l = ri(l.next);
		var T = w.length;
		if (T > 0) {
			var ee = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.fix();
			}
			$r(e, w, ee);
		}
	}
	o && at(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function ai(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Qt(n) : /* @__PURE__ */ $t(n, !1, !1) : null, l = o & 2 ? Qt(i) : null;
	return {
		v: c,
		i: l,
		e: Fn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function oi(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ hn(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function si(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function W(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		Ce && (o = Ee(/* @__PURE__ */ mn(c)));
	}
	L(() => {
		var e = er;
		if (s === (s = t() ?? "")) {
			Ce && De();
			return;
		}
		if (n && !Ce) {
			e.nodes = null, c.innerHTML = s, s !== "" && zr(/* @__PURE__ */ mn(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (Bn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (Ce) {
				for (var a = Te.data, l = De(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ hn(l);
				if (l === null) throw xe(), he;
				zr(Te, u), o = Ee(l);
				return;
			}
			var d = vn(r ? "svg" : i ? "math" : "template", r ? ve : i ? ye : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (zr(/* @__PURE__ */ mn(f), f.lastChild), r || i) for (; /* @__PURE__ */ mn(f);) o.before(/* @__PURE__ */ mn(f));
			else o.before(f);
		}
	});
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/snippet.js
function ci(e, t, ...n) {
	var r = new Zr(e);
	Nn(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, w);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/svelte-component.js
function li(e, t, n) {
	var r;
	Ce && (r = Te, De());
	var i = new Zr(e);
	Nn(() => {
		var e = t() ?? null;
		if (Ce && Ae(r) === "[" != (e !== null)) {
			var a = ke();
			Ee(a), i.anchor = a, we(!1), i.ensure(e, e && ((t) => n(t, e))), we(!0);
			return;
		}
		i.ensure(e, e && ((t) => n(t, e)));
	}, w);
}
//#endregion
//#region node_modules/svelte/src/internal/client/timing.js
var ui = () => performance.now(), di = {
	tick: (e) => requestAnimationFrame(e),
	now: () => ui(),
	tasks: /* @__PURE__ */ new Set()
};
//#endregion
//#region node_modules/svelte/src/internal/client/loop.js
function fi() {
	let e = di.now();
	di.tasks.forEach((t) => {
		t.c(e) || (di.tasks.delete(t), t.f());
	}), di.tasks.size !== 0 && di.tick(fi);
}
function pi(e) {
	let t;
	return di.tasks.size === 0 && di.tick(fi), {
		promise: new Promise((n) => {
			di.tasks.add(t = {
				c: e,
				f: n
			});
		}),
		abort() {
			di.tasks.delete(t);
		}
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/transitions.js
function mi(e, t) {
	ht(() => {
		e.dispatchEvent(new CustomEvent(t));
	});
}
function hi(e) {
	if (e === "float") return "cssFloat";
	if (e === "offset") return "cssOffset";
	if (e.startsWith("--")) return e;
	let t = e.split("-");
	return t.length === 1 ? t[0] : t[0] + t.slice(1).map((e) => e[0].toUpperCase() + e.slice(1)).join("");
}
function gi(e) {
	let t = {}, n = e.split(";");
	for (let e of n) {
		let [n, r] = e.split(":");
		if (!n || r === void 0) break;
		let i = hi(n.trim());
		t[i] = r.trim();
	}
	return t;
}
var _i = (e) => e;
function vi(e, t, n, r) {
	var i = !!(e & 1), a = !!(e & 2), o = i && a, s = !!(e & 4), c = o ? "both" : i ? "in" : "out", l, u = t.inert, d = t.style.overflow, f, p;
	function m() {
		return ht(() => l ??= n()(t, r?.() ?? {}, { direction: c }));
	}
	var h = {
		is_global: s,
		in() {
			if (t.inert = u, !i) {
				p?.abort(), p?.reset?.();
				return;
			}
			a || f?.abort(), f = yi(t, m(), p, 1, () => {
				mi(t, "introstart");
			}, () => {
				mi(t, "introend"), f?.abort(), f = l = void 0, t.style.overflow = d;
			});
		},
		out(e) {
			if (!a) {
				e?.(), l = void 0;
				return;
			}
			t.inert = !0, p = yi(t, m(), f, 0, () => {
				mi(t, "outrostart");
			}, () => {
				mi(t, "outroend"), e?.();
			});
		},
		stop: () => {
			f?.abort(), p?.abort();
		}
	}, g = er;
	if ((g.nodes.t ??= []).push(h), i && Kr) {
		var _ = s;
		if (!_) {
			for (var v = g.parent; v && v.f & 65536;) for (; (v = v.parent) && !(v.f & 16););
			_ = !v || !!(v.f & 32768);
		}
		_ && An(() => {
			Cr(() => h.in());
		});
	}
}
function yi(e, t, n, r, i, a) {
	var o = r === 1, s = !1;
	if (d(t)) {
		var c;
		return at(() => {
			s || (c = yi(e, t({ direction: o ? "in" : "out" }), n, r, i, a));
		}), {
			abort: () => {
				s = !0, c?.abort();
			},
			deactivate: () => c.deactivate(),
			reset: () => c.reset(),
			t: () => c.t()
		};
	}
	if (n?.deactivate(), !t?.duration && !t?.delay) return i(), a(), {
		abort: f,
		deactivate: f,
		reset: f,
		t: () => r
	};
	let { delay: l = 0, css: u, tick: p, easing: m = _i } = t;
	var h, g = () => 1 - r;
	return at(() => {
		if (!s) {
			var c = [];
			if (o && n === void 0 && (p && p(0, 1), u)) {
				var d = gi(u(0, 1));
				c.push(d, d);
			}
			h = e.animate(c, {
				duration: l,
				fill: "forwards"
			}), h.onfinish = () => {
				h.cancel(), i();
				var o = n?.t() ?? 1 - r;
				n?.abort();
				var s = r - o, c = t.duration * Math.abs(s), l = [];
				if (c > 0) {
					var d = !1;
					if (u) for (var f = Math.ceil(c / (1e3 / 60)), _ = 0; _ <= f; _ += 1) {
						var v = o + s * m(_ / f), y = gi(u(v, 1 - v));
						l.push(y), d ||= y.overflow === "hidden";
					}
					d && (e.style.overflow = "hidden"), g = () => {
						var e = h.currentTime;
						return o + s * m(e / c);
					}, p && pi(() => {
						if (h.playState !== "running") return !1;
						var e = g();
						return p(e, 1 - e), !0;
					});
				}
				h = e.animate(l, {
					duration: c,
					fill: "forwards"
				}), h.onfinish = () => {
					g = () => r, p?.(r, 1 - r), a();
				};
			};
		}
	}), {
		abort: () => {
			s = !0, h && (h.cancel(), h.effect = null, h.onfinish = f);
		},
		deactivate: () => {
			a = f;
		},
		reset: () => {
			r === 0 && p?.(1, 0);
		},
		t: () => g()
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attachments.js
function bi(e, t) {
	var n = void 0, r;
	Pn(() => {
		n !== (n = t()) && (r &&= (zn(r), null), n && (r = Fn(() => {
			An(() => n(e));
		})));
	});
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
var xi = [..." 	\n\r\f\xA0\v﻿"];
function Si(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || xi.includes(r[o - 1])) && (s === r.length || xi.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function Ci(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function wi(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Ti(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\/\*.*?\*\//g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(wi)), i && c.push(...Object.keys(i).map(wi));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = wi(e.substring(l, u).trim());
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
		return r && (n += Ci(r)), i && (n += Ci(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function Ei(e, t, n, r, i, a) {
	var o = e[le];
	if (Ce || o !== n || o === void 0) {
		var s = Si(n, r, a);
		(!Ce || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[le] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/style.js
function Di(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function Oi(e, t, n, r) {
	var i = e[ue];
	if (Ce || i !== t) {
		var a = Ti(t, r);
		(!Ce || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[ue] = t;
	} else r && (Array.isArray(r) ? (Di(e, n?.[0], r[0]), Di(e, n?.[1], r[1], "important")) : Di(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var ki = Symbol("is custom element"), Ai = Symbol("is html"), ji = me ? "link" : "LINK", Mi = me ? "progress" : "PROGRESS";
function G(e) {
	if (Ce) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					q(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					q(e, "checked", null), e.checked = r;
				}
			}
		};
		e[fe] = n, at(n), mt();
	}
}
function K(e, t) {
	var n = Pi(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === Mi) && (e.value = t ?? "");
}
function Ni(e, t) {
	var n = Pi(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function q(e, t, n, r) {
	var i = Pi(e);
	Ce && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === ji) || i[t] !== (i[t] = n) && (t === "loading" && (e[se] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Ii(e).has(t) ? e[t] = n : e.setAttribute(t, n));
}
function Pi(e) {
	return e[ce] ??= {
		[ki]: e.nodeName.includes("-"),
		[Ai]: e.namespaceURI === _e
	};
}
var Fi = /* @__PURE__ */ new Map();
function Ii(e) {
	var t = e.getAttribute("is") || e.nodeName, n = Fi.get(t);
	if (n) return n;
	Fi.set(t, n = /* @__PURE__ */ new Set());
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.add(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function Li(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	gt(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = Ri(e) ? zi(a) : a, n(a), jt !== null && r.add(jt), await br(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (Ce && e.defaultValue !== e.value || Cr(t) == null && e.value) && (n(Ri(e) ? zi(e.value) : e.value), jt !== null && r.add(jt)), Mn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = jt;
			if (r.has(i)) return;
		}
		Ri(e) && n === zi(e.value) || (e.type !== "date" || n || e.value) && n !== e.value && (e.value = n ?? "");
	});
}
function Ri(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function zi(e) {
	return e === "" ? null : +e;
}
var Bi = /* @__PURE__ */ new class e {
	#e = /* @__PURE__ */ new WeakMap();
	#t;
	#n;
	static entries = /* @__PURE__ */ new WeakMap();
	constructor(e) {
		this.#n = e;
	}
	observe(e, t) {
		var n = this.#e.get(e) || /* @__PURE__ */ new Set();
		return n.add(t), this.#e.set(e, n), this.#r().observe(e, this.#n), () => {
			var n = this.#e.get(e);
			n.delete(t), n.size === 0 && (this.#e.delete(e), this.#t.unobserve(e));
		};
	}
	#r() {
		return this.#t ??= new ResizeObserver((t) => {
			for (var n of t) {
				e.entries.set(n.target, n);
				for (var r of this.#e.get(n.target) || []) r(n);
			}
		});
	}
}({ box: "border-box" });
function Vi(e, t, n) {
	var r = Bi.observe(e, () => n(e[t]));
	An(() => (Cr(() => n(e[t])), r));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function Hi(e, t) {
	return e === t || e?.[ie] === t;
}
function Ui(e = tt(), t, n, r) {
	var i = Ye.r, a = er;
	return An(() => {
		var o, s;
		return Mn(() => {
			o = s, s = r?.() || [], Cr(() => {
				Hi(n(...s), e) || (t(e, ...s), o && Hi(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && Hi(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/universal.js
function Wi(e, t, n, r, i) {
	var a = () => {
		r(n[e]);
	};
	n.addEventListener(t, a), i ? Mn(() => {
		n[e] = i();
	}) : a(), (n === document.body || n === window || n === document) && En(() => {
		n.removeEventListener(t, a);
	});
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var Gi = !1;
function Ki(e) {
	var t = Gi;
	try {
		return Gi = !1, [e(), Gi];
	} finally {
		Gi = t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
function qi(e, t, n, r) {
	var i = !0, o = !!(n & 8), s = !!(n & 16), c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ xt(r), R(u)) : (l && (l = !1, c = s ? Cr(r) : r), c);
	let f;
	if (o) {
		var p = ie in e || oe in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = Ki(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && Ve(t), f(m)));
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
	var v = !1, y = (n & 1 ? xt : wt)(() => (v = !1, g()));
	o && R(y);
	var b = er;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? R(y) : i && o ? sn(e) : e;
			return M(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Yn && v || b.f & 16384 ? y.v : R(y);
	});
}
var Ji = {
	lang: "nb",
	strings: {
		"nav.toFront": "Til forsiden",
		"nav.toLightTheme": "Bytt til lyst tema",
		"nav.toDarkTheme": "Bytt til mørkt tema",
		"nav.menu": "Meny",
		"nav.closeMenu": "Lukk menyen",
		"nav.dismissAnnouncement": "Lukk kunngjøringen",
		"nav.launcher": "Snarveier",
		"nav.launcherMore": "Vis flere",
		"nav.launcherLess": "Vis færre",
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
		"share.share": "Del på {service}",
		"share.email": "Del på e-post",
		"share.copy": "Kopier lenke",
		"share.copied": "Kopiert!",
		"shop.addToCart": "Legg i handlekurv",
		"shop.added": "Lagt i kurven!",
		"shop.memberPrice": "Medlem: {price}",
		"shop.cart": "Handlekurv",
		"shop.cartEmpty": "Handlekurven er tom.",
		"shop.total": "Sum",
		"shop.checkout": "Til kassen",
		"shop.close": "Lukk",
		"shop.remove": "Fjern varen",
		"shop.increase": "Flere",
		"shop.decrease": "Færre",
		"shop.name": "Navn",
		"shop.email": "E-post",
		"shop.phone": "Telefon",
		"shop.comment": "Kommentar",
		"shop.sendOrder": "Send bestilling",
		"shop.orderSubject": "Bestilling fra {site}",
		"shop.orderSent": "Takk! Bestillingen er sendt.",
		"shop.orderDraft": "E-postutkastet er åpnet - send det for å fullføre bestillingen.",
		"shop.fillRequired": "Fyll ut navn og en gyldig e-postadresse.",
		"shop.sendFailed": "Kunne ikke sende akkurat nå. Prøv igjen senere.",
		"shop.missingTarget": "Kassen mangler mottaker eller endepunkt.",
		"shop.vippsHint": "Betaling: Vipps til {number}.",
		"shop.quickView": "Vis produktet",
		"shop.payWithVipps": "Betal med Vipps",
		"shop.vippsUnavailable": "Betaling er ikke satt opp for denne siden ennå.",
		"countdown.days": "dager",
		"countdown.hours": "timer",
		"countdown.minutes": "minutter",
		"countdown.seconds": "sekunder",
		"render.missingPlugin": "Blokktypen '{type}' er ikke tilgjengelig (mangler plugin eller nyere Urd?)",
		"map.larger": "Vis større kart",
		"map.mapTitle": "Kart",
		"map.openOsm": "Åpne kartet på OpenStreetMap",
		"form.choose": "Velg …",
		"form.invalidChoice": "Velg et av alternativene",
		"form.invalidDate": "Skriv en gyldig dato",
		"form.invalidEmail": "Skriv en gyldig e-postadresse",
		"form.noRecipient": "Skjemaet mangler mottakeradresse.",
		"form.required": "{label} må fylles ut",
		"form.send": "Send",
		"form.sendFailed": "Kunne ikke sende akkurat nå. Prøv igjen senere.",
		"form.subjectDefault": "Henvendelse fra nettsiden",
		"form.thanks": "Takk! Meldingen er sendt.",
		"form.yes": "Ja",
		"calendar.addGoogle": "Legg til i Google",
		"calendar.addGoogleTitle": "Legger kalenderen til i din egen Google Kalender",
		"calendar.all": "Alle",
		"calendar.dateLine": "{wd} {d}. {m}",
		"calendar.empty": "Ingen kommende arrangementer",
		"calendar.inDays.one": "Om {n} dag",
		"calendar.inDays.other": "Om {n} dager",
		"calendar.more": "+{n}",
		"calendar.next": "Neste arrangement",
		"calendar.now": "Akkurat nå",
		"calendar.later": "Senere",
		"calendar.colDate": "Dato",
		"calendar.colTime": "Tid",
		"calendar.colEvent": "Arrangement",
		"calendar.colPlace": "Sted",
		"calendar.program": "Program",
		"calendar.allDay": "hele dagen",
		"calendar.count.one": "{n} arrangement",
		"calendar.count.other": "{n} arrangementer",
		"calendar.nextShort": "Neste",
		"calendar.thisMonth": "Denne måneden",
		"calendar.scrollPrev": "Forrige kort",
		"calendar.scrollNext": "Neste kort",
		"calendar.weekN": "Uke {n}",
		"calendar.range": "{from} til {to}",
		"calendar.prevWeek": "Forrige uke",
		"calendar.nextWeek": "Neste uke",
		"calendar.prevDay": "Forrige dag",
		"calendar.nextDay": "Neste dag",
		"calendar.todayBtn": "I dag",
		"calendar.todayCount.one": "{n} i dag",
		"calendar.todayCount.other": "{n} i dag",
		"calendar.wheel": "Årshjul",
		"calendar.pickMonth": "Velg en måned på hjulet for å se dens arrangementer",
		"calendar.wholeYear": "Hele året",
		"calendar.fewer": "Færre",
		"calendar.moreLegend": "Flere",
		"calendar.pickDay": "Pek på en dag for å se arrangementene",
		"calendar.showCalendar": "Vis kalenderen {name}",
		"calendar.unnamed": "Arrangementer",
		"calendar.then": "Deretter",
		"calendar.unitDays.one": "dag",
		"calendar.unitDays.other": "dager",
		"calendar.unitHours.one": "time",
		"calendar.unitHours.other": "timer",
		"calendar.unitMin.one": "min",
		"calendar.unitMin.other": "min",
		"calendar.monthNone": "Ingenting denne måneden",
		"calendar.monthYear": "{m} {y}",
		"calendar.monthRange": "{from} · {to}",
		"calendar.dayTime": "{date} {time}",
		"calendar.demoTitle1": "Oppstartskveld",
		"calendar.demoTitle2": "Medlemsmøte",
		"calendar.demoTitle3": "Høsttur",
		"calendar.demoTitle4": "Åpen trening",
		"calendar.demoTitle5": "Dugnad",
		"calendar.demoCat1": "Sosialt",
		"calendar.demoCat2": "Møte",
		"calendar.demoCat3": "Tur",
		"calendar.demoLoc1": "Klubbhuset",
		"calendar.demoLoc2": "Oppmøte ved parkeringen",
		"calendar.demoDesc1": "Lett trening for alle nivåer. Ta med innesko og vannflaske. Mer om treningen:",
		"calendar.demoDesc2": "Vi møtes også på nett for dem som ikke kan komme:",
		"calendar.demoDesc3": "Fast møte for medlemmene. Sakslisten sendes ut uka før.",
		"calendar.demoDesc4": "To dager i marka med overnatting. Påmelding innen fredag:",
		"calendar.browse": "Bla gjennom kortene",
		"calendar.untilStart": "Fram til start",
		"calendar.wholeProgram": "Hele programmet",
		"calendar.noticeLabel": "Kunngjøring",
		"calendar.moreInfo": "Les mer",
		"calendar.readWhole": "Les hele",
		"calendar.nextN.one": "{n} neste",
		"calendar.nextN.other": "{n} neste",
		"calendar.series": "Fast arrangement",
		"calendar.when": "Når",
		"calendar.where": "Hvor",
		"calendar.forWhom": "For hvem",
		"calendar.openAll": "Åpent for alle",
		"calendar.allDates": "Alle datoer",
		"calendar.emptyKicker": "Datoer",
		"calendar.emptyTitle": "Datoer kommer",
		"calendar.swUpcoming": "Kommende",
		"calendar.swWeek": "Uke",
		"calendar.swMonth": "Måned",
		"calendar.recurring": "Gjentas",
		"calendar.organizer": "Arrangør",
		"calendar.moreAbout": "Mer om {name}",
		"calendar.openToAll": "Åpent for alle",
		"calendar.showAll": "Vis alle {n} ({m} til)",
		"calendar.join": "Bli med",
		"calendar.addEvent": "Legg i kalender",
		"calendar.close": "Lukk",
		"calendar.addOne": "Bare dette arrangementet",
		"calendar.addFile": "Last ned som fil (.ics)",
		"calendar.addWhole": "Hele kalenderen",
		"calendar.icalAddress": "Kalenderens iCal-adresse",
		"calendar.cancelled": "Avlyst",
		"calendar.until": "til {date}",
		"calendar.timeRange": "{from}-{to}",
		"calendar.dayMonth": "{d}. {m}",
		"calendar.zoneOf": "Tidene vises i {zone}",
		"calendar.zoneYours": "Tidene vises i din tidssone ({zone})",
		"calendar.loading": "Laster kalenderen",
		"calendar.dayNone": "Ingenting denne dagen",
		"calendar.earlier": "Tidligere ({n})",
		"calendar.search": "Søk i arrangementene",
		"calendar.bandPause": "Sett arrangementene på pause",
		"calendar.bandPlay": "Spill av arrangementene",
		"calendar.noMatch": "Ingen arrangementer passer",
		"calendar.onMap": "Vis i kart",
		"calendar.viewsLabel": "Visning",
		"calendar.categoriesLabel": "Kategorier",
		"calendar.countdownClock": "{d}d {h}t {m}m",
		"calendar.weekdayDay": "{wd} {d}.",
		"calendar.nextMonth": "Neste måned",
		"calendar.prevMonth": "Forrige måned",
		"calendar.signup": "Meld deg på",
		"calendar.signupTitle": "Åpner påmeldingssiden arrangøren har lagt i arrangementets beskrivelse",
		"calendar.subscribe": "Abonner",
		"calendar.subscribeMulti": "Abonner (kalender)",
		"calendar.subscribeTitle": "Åpner kalender-appen din og legger til kalenderen der, så nye og endrede arrangementer følger med automatisk",
		"calendar.timeAt": "kl. {time}",
		"calendar.today": "I dag!",
		"calendar.tomorrow": "I morgen"
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
}, Yi = [
	"nb",
	"nn",
	"en-GB",
	"se",
	"tr"
], Xi = /^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/, Zi = {
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
function Qi(e) {
	let t = String(e ?? "").trim().toLowerCase();
	for (let [e, n] of Object.entries(Zi)) if (n.some((e) => t === e || t.startsWith(`${e}-`))) return e;
	return null;
}
function $i(e) {
	return Yi.includes(String(e ?? ""));
}
function ea(e) {
	let t = [];
	if (!Array.isArray(e)) return ["languages must be a list"];
	for (let n of e) {
		if (!n || typeof n != "object" || Array.isArray(n)) {
			t.push("languages: every entry must be an object");
			continue;
		}
		let e = String(n.code ?? "");
		Xi.test(e) ? $i(e) && t.push(`languages: '${e}' is built into Urd and cannot be overridden`) : t.push(`languages: '${e}' is not a valid language code`), (typeof n.name != "string" || !n.name.trim()) && t.push(`languages/${e}: name is missing (the language's own name)`);
		for (let r of ["site", "admin"]) n[r] !== void 0 && typeof n[r] != "boolean" && t.push(`languages/${e}: ${r} must be a boolean`);
		n.site !== !0 && n.admin !== !0 && t.push(`languages/${e}: must cover site, admin or both`);
	}
	return t;
}
function ta(e) {
	let t = Qi(e);
	if (t) return t;
	let n = String(e ?? "").trim();
	return Xi.test(n) ? n : "nb";
}
async function na(e, t) {
	try {
		return await (await import(
			/* @vite-ignore */
			"/assets/urd/language-packs.js"
)).loadPackStrings(e, t);
	} catch {
		return null;
	}
}
var ra = {
	lang: "nb",
	dict: { ...Ji.strings },
	dates: null
}, ia = {
	lang: "nb",
	dict: {}
};
function aa(e, t) {
	if (!t) return e;
	let n = e;
	for (let [e, r] of Object.entries(t)) n = n.replaceAll(`{${e}}`, String(r));
	return n;
}
function J(e, t) {
	return aa(ia.dict[e] ?? e, t);
}
function oa(e, t) {
	let n = "other";
	try {
		n = new Intl.PluralRules(ra.lang).select(t);
	} catch {}
	let r = ra.dict[`${e}.${n}`] !== void 0 || ra.dict[`${e}.other`] === void 0 ? n : "other";
	return {
		form: r,
		key: `${e}.${r}`
	};
}
function sa(e, t, n) {
	let { key: r } = oa(e, t);
	return aa(ra.dict[r] ?? r, {
		...n,
		n: t
	});
}
function ca(e) {
	let t = `api.${e?.code}`;
	return e?.code && ia.dict[t] !== void 0 ? aa(ia.dict[t], e) : e?.error ?? null;
}
function la() {
	return ia.lang;
}
function ua() {
	let e = null;
	try {
		e = localStorage.getItem("urd-admin-lang");
	} catch {}
	if (e) return ta(e);
	for (let e of navigator.languages ?? [navigator.language]) {
		let t = Qi(e);
		if (t) return t;
	}
	return "en-GB";
}
var da;
new Promise((e) => {
	da = e;
});
async function fa(e = ua()) {
	let t = async (e) => (await import(
		/* @vite-ignore */
		`/assets/urd/locales/admin/${e}.js`
)).default.strings;
	ia.lang = ta(e);
	let n = $i(ia.lang);
	try {
		Object.assign(ia.dict, await t("nb")), n && ia.lang !== "nb" && Object.assign(ia.dict, await t(ia.lang));
	} catch {}
	if (!n) {
		let e = await na(ia.lang, "admin");
		e ? Object.assign(ia.dict, e) : ia.lang = "nb";
	}
	return da(ia.lang), ia.lang;
}
//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region node_modules/svelte/src/transition/index.js
function pa(e) {
	let t = e - 1;
	return t * t * t + 1;
}
function ma(e) {
	let t = typeof e == "string" && e.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
	return t ? [parseFloat(t[1]), t[2] || "px"] : [e, "px"];
}
function ha(e, { delay: t = 0, duration: n = 400, easing: r = pa, x: i = 0, y: a = 0, opacity: o = 0 } = {}) {
	let s = getComputedStyle(e), c = +s.opacity, l = s.transform === "none" ? "" : s.transform, u = c * (1 - o), [d, f] = ma(i), [p, m] = ma(a);
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
function ga(e, t, n, r) {
	if (r) {
		let t = localStorage.getItem(r);
		if (t !== null) {
			if (localStorage.getItem(e) === null) try {
				localStorage.setItem(e, t);
			} catch {}
			localStorage.getItem(e) !== null && localStorage.removeItem(r);
		}
	}
	let i = t(), a = JSON.stringify(i), o = JSON.parse(a), s = localStorage.getItem(e);
	if (s) try {
		o = JSON.parse(s);
	} catch {
		localStorage.removeItem(e);
	}
	return {
		get data() {
			return o;
		},
		save() {
			let t = JSON.stringify(o);
			if (t === a) return localStorage.removeItem(e), !0;
			try {
				return localStorage.setItem(e, t), !0;
			} catch (e) {
				return n?.(e), !1;
			}
		},
		reset() {
			return localStorage.removeItem(e), o = JSON.parse(a), o;
		},
		replace(e) {
			return o = e, o;
		},
		amendBaseline(e) {
			let t = JSON.parse(a);
			e(t), a = JSON.stringify(t);
		},
		hasDraft() {
			return localStorage.getItem(e) !== null;
		}
	};
}
//#endregion
//#region ../template/assets/engine/0.7.4/anchored.js
function _a(e = globalThis) {
	let t = e?.HTMLElement?.prototype, n = e?.CSS;
	return !!(t && "popover" in t && typeof t.showPopover == "function" && typeof n?.supports == "function" && n.supports("anchor-name: --urd") && n.supports("position-try-fallbacks: flip-block"));
}
var va = 0;
function ya(e = "urd-pop") {
	return va += 1, `--${e}-${va}`;
}
function ba(e, t) {
	let n = e?.closest?.(".panel-body, .block-menu-body");
	n && (t ? n.style.setProperty("anchor-name", "--urd-pane") : n.style.removeProperty("anchor-name"));
}
//#endregion
//#region src/lib/ColorPicker.svelte
var xa = /* @__PURE__ */ B("<button type=\"button\" class=\"cp-eye svelte-zxiloo\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), Sa = /* @__PURE__ */ B("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), Ca = /* @__PURE__ */ B("<button type=\"button\"></button>"), wa = /* @__PURE__ */ B("<span class=\"cp-label svelte-zxiloo\"> <!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Ta = /* @__PURE__ */ B("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\">×</button></span>"), Ea = /* @__PURE__ */ B("<span class=\"cp-tokens svelte-zxiloo\"></span>"), Da = /* @__PURE__ */ B("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), Oa = /* @__PURE__ */ B("<span class=\"cp-label svelte-zxiloo\"> </span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), ka = /* @__PURE__ */ B("<div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\"> <button type=\"button\" class=\"cp-add svelte-zxiloo\">+</button></span> <!> <!>", 1), Aa = /* @__PURE__ */ B("<button type=\"button\" class=\"cp-clear svelte-zxiloo\">×</button>"), ja = /* @__PURE__ */ B("<div class=\"cp-pop cp-anchored svelte-zxiloo\" popover=\"auto\"><!></div>"), Ma = /* @__PURE__ */ B("<div class=\"cp-pop svelte-zxiloo\"><!></div>"), Na = /* @__PURE__ */ B("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!> <!></span>");
function Pa(e, t) {
	$e(t, !0);
	let n = (e) => {
		var t = ka(), n = P(t), a = F(n), o = I(n, 2);
		G(o);
		var s = I(o, 2);
		G(s);
		var c = I(s, 2), l = N(c), u = I(l, 2);
		G(u);
		var d = I(u, 2), f = (e) => {
			var t = xa();
			L((e) => q(t, "title", e), [() => J("cp.eyedropper")]), z("click", t, be), V(e, t);
		};
		U(d, (e) => {
			ye && e(f);
		}), D(c);
		var p = I(c, 2);
		ni(p, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = Sa();
			G(r), L((e) => {
				q(r, "title", t), K(r, e);
			}, [() => _e(R(n))]), z("change", r, (e) => ve(R(n), e.target.value)), V(e, r);
		}), D(p);
		var v = I(p, 2), y = (e) => {
			var t = wa(), n = P(t), a = N(n, !0), o = I(a), s = (e) => {
				var t = Br();
				L((e) => H(t, e), [() => J("cp.linkedSuffix", { token: m() })]), V(e, t);
			}, c = /* @__PURE__ */ A(() => m());
			U(o, (e) => {
				R(c) && e(s);
			}), D(n);
			var l = I(n, 2);
			ni(l, 21, i, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ A(() => h(R(t), 2));
				let i = () => R(n)[0], a = () => R(n)[1];
				var o = Ca();
				let s;
				L((e) => {
					s = Ei(o, 1, "cp-token svelte-zxiloo", null, s, { active: r() === i() }), Oi(o, `background: ${a() ?? ""}`), q(o, "title", e);
				}, [() => J("cp.tokenTitle", { name: i() })]), z("click", o, () => me(i(), a())), V(e, o);
			}), D(l), L((e) => H(a, e), [() => J("cp.themeColors")]), V(e, t);
		};
		U(v, (e) => {
			i().length && e(y);
		});
		var b = I(v, 2), x = N(b), S = I(x);
		D(b);
		var ne = I(b, 2), re = (e) => {
			var t = Ea();
			ni(t, 20, () => R(_), (e) => e, (e, t) => {
				var n = Ta(), r = N(n), i = I(r, 2);
				D(n), L((e) => {
					Oi(r, `background: ${t ?? ""}`), q(r, "title", t), q(i, "title", e);
				}, [() => J("cp.removeSaved")]), z("click", r, () => xe(t)), z("click", i, () => Ce(t)), V(e, n);
			}), D(t), V(e, t);
		};
		U(ne, (e) => {
			R(_).length && e(re);
		});
		var E = I(ne, 2), ie = (e) => {
			var t = Oa(), n = P(t), r = F(n, !0), i = I(n, 2);
			ni(i, 20, () => R(g), (e) => e, (e, t) => {
				var n = Da();
				L(() => {
					Oi(n, `background: ${t ?? ""}`), q(n, "title", t);
				}), z("click", n, () => xe(t)), V(e, n);
			}), D(i), L((e) => H(r, e), [() => J("common.recent")]), V(e, t);
		};
		U(E, (e) => {
			R(g).length && e(ie);
		}), L((e, t, r, i, c) => {
			Oi(n, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${R(C) ?? ""}, 100%, 50%)`), Oi(a, `left: ${R(w) * 100}%; top: ${(1 - R(T)) * 100}%`), K(o, R(C)), K(s, e), q(s, "title", t), Oi(s, `background: linear-gradient(to right, transparent, ${r ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), Oi(l, `background: ${R(te) ?? ""}`), K(u, R(te)), H(x, `${i ?? ""} `), q(S, "title", c);
		}, [
			() => Math.round(R(ee) * 100),
			() => J("cp.alpha"),
			() => ae(),
			() => J("cp.saved"),
			() => J("cp.saveTitle")
		]), z("pointerdown", n, he), z("input", o, (e) => {
			M(C, Number(e.target.value), !0), se();
		}), z("input", s, (e) => {
			M(ee, Number(e.target.value) / 100), se();
		}), z("change", u, ge), z("click", S, Se), V(e, t);
	}, r = qi(t, "value", 3, "#000000"), i = qi(t, "tokens", 19, () => []), a = qi(t, "label", 19, () => J("cp.pickColor")), o = qi(t, "allowClear", 3, !1), s = "urd-recent-colors", c = "urd-saved-colors", l = _a(), u = ya("urd-cp"), d = u.slice(2), f = /* @__PURE__ */ j(null), p = () => {
		let e = i().find(([e]) => e === r());
		return e ? e[1] : r();
	}, m = () => i().find(([e]) => e === r())?.[0] ?? null, g = /* @__PURE__ */ j(sn([])), _ = /* @__PURE__ */ j(sn([])), v = "", y = "", b = /* @__PURE__ */ j(null), x = /* @__PURE__ */ j(!1), S = /* @__PURE__ */ j(sn({
		top: 0,
		left: 0
	})), C = /* @__PURE__ */ j(0), w = /* @__PURE__ */ j(0), T = /* @__PURE__ */ j(1), ee = /* @__PURE__ */ j(1), te = /* @__PURE__ */ j("#000000");
	function ne(e) {
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
	let re = (e, t, n) => "#" + [
		e,
		t,
		n
	].map((e) => e.toString(16).padStart(2, "0")).join("");
	function E(e, t, n) {
		e /= 255, t /= 255, n /= 255;
		let r = Math.max(e, t, n), i = r - Math.min(e, t, n), a = 0;
		return i && (a = r === e ? (t - n) / i % 6 : r === t ? (n - e) / i + 2 : (e - t) / i + 4, a *= 60, a < 0 && (a += 360)), [
			a,
			r ? i / r : 0,
			r
		];
	}
	function ie(e, t, n) {
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
	function ae() {
		return re(...ie(R(C), R(w), R(T)));
	}
	function oe() {
		let e = ae();
		return R(ee) >= .995 ? e : e + Math.round(R(ee) * 255).toString(16).padStart(2, "0");
	}
	function se() {
		M(te, oe(), !0), y = R(te), t.onchange?.(R(te));
	}
	function ce(e) {
		let t = ne(e);
		return t ? (((e) => {
			var t = h(e, 3);
			M(C, t[0], !0), M(w, t[1], !0), M(T, t[2], !0);
		})(E(t[0], t[1], t[2])), M(ee, t[3], !0), M(te, oe(), !0), !0) : !1;
	}
	function le() {
		ce(p()) || ce("#000000"), v = r(), y = "";
		try {
			let e = JSON.parse(localStorage.getItem(s) ?? "[]");
			M(g, Array.isArray(e) ? e : [], !0);
		} catch {
			M(g, [], !0);
		}
		try {
			let e = JSON.parse(localStorage.getItem(c) ?? "[]");
			M(_, Array.isArray(e) ? e : [], !0);
		} catch {
			M(_, [], !0);
		}
	}
	function ue(e) {
		e.newState === "open" ? (le(), ba(R(b), !0), M(x, !0)) : R(x) && (ba(R(b), !1), M(x, !1), fe());
	}
	function de() {
		le();
		let e = R(b).getBoundingClientRect(), t = R(b).closest(".panel-body")?.getBoundingClientRect(), n = t ? t.right : window.innerWidth, r = Math.max(8, Math.min(e.right - 236, n - 236 - 8)), i = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		M(S, {
			top: i,
			left: r
		}, !0), M(x, !0);
	}
	function fe() {
		if (y && y !== v) {
			let e = [y, ...R(g).filter((e) => e !== y)].slice(0, 8);
			localStorage.setItem(s, JSON.stringify(e));
		}
	}
	function pe() {
		if (l) {
			R(f)?.hidePopover();
			return;
		}
		M(x, !1), fe();
	}
	function me(e, n) {
		ce(n), M(te, n, !0), t.onchange?.(e);
	}
	function he(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			M(w, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), M(T, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), se();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function ge(e) {
		ce(e.target.value) ? se() : M(te, ae(), !0);
	}
	function _e(e) {
		return (ne(ae()) ?? [
			0,
			0,
			0
		])[e];
	}
	function ve(e, t) {
		let n = ne(ae()) ?? [
			0,
			0,
			0
		];
		n[e] = Math.min(255, Math.max(0, Number(t) || 0)), ((e) => {
			var t = h(e, 3);
			M(C, t[0], !0), M(w, t[1], !0), M(T, t[2], !0);
		})(E(...n)), se();
	}
	let ye = typeof window < "u" && "EyeDropper" in window;
	async function be() {
		try {
			ce((await new window.EyeDropper().open()).sRGBHex) && se();
		} catch {}
	}
	function xe(e) {
		ce(e) && se();
	}
	function Se() {
		let e = oe();
		R(_).includes(e) || (M(_, [e, ...R(_)].slice(0, 12), !0), localStorage.setItem(c, JSON.stringify(Ge(R(_)))));
	}
	function Ce(e) {
		M(_, R(_).filter((t) => t !== e), !0), localStorage.setItem(c, JSON.stringify(Ge(R(_))));
	}
	Dn(() => {
		if (!R(x)) return;
		let e = () => pe();
		if (window.addEventListener("blur", e), l) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			R(b) && !R(b).contains(e.target) && pe();
		}, n = (e) => {
			e.key === "Escape" && pe();
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), () => {
			document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), window.removeEventListener("blur", e);
		};
	});
	var we = Na(), Te = N(we);
	let Ee;
	var De = I(Te, 2), Oe = (e) => {
		var n = Aa();
		L((e, t) => {
			q(n, "title", e), q(n, "aria-label", t);
		}, [() => J("cp.clearTitle"), () => J("cp.clear")]), z("click", n, () => t.onchange?.("")), V(e, n);
	};
	U(De, (e) => {
		o() && r() && e(Oe);
	});
	var ke = I(De, 2), Ae = (e) => {
		var t = ja(), r = N(t), i = (e) => {
			n(e);
		};
		U(r, (e) => {
			R(x) && e(i);
		}), D(t), Ui(t, (e) => M(f, e), () => R(f)), L(() => {
			q(t, "id", d), Oi(t, `position-anchor: ${u ?? ""}`);
		}), jr("toggle", t, ue), z("click", t, (e) => e.preventDefault()), V(e, t);
	}, je = (e) => {
		var t = Ma(), r = N(t);
		n(r), D(t), L(() => Oi(t, `top: ${R(S).top ?? ""}px; left: ${R(S).left ?? ""}px`)), z("click", t, (e) => e.preventDefault()), V(e, t);
	};
	U(ke, (e) => {
		l ? e(Ae) : R(x) && e(je, 1);
	}), D(we), Ui(we, (e) => M(b, e), () => R(b)), L((e, t, n) => {
		Ee = Ei(Te, 1, "cp-swatch svelte-zxiloo", null, Ee, {
			linked: e,
			"cp-empty": o() && !r()
		}), Oi(Te, `background: ${t ?? ""}${l ? `; anchor-name: ${u}` : ""}`), q(Te, "title", n), q(Te, "popovertarget", l ? d : void 0), q(Te, "aria-label", a());
	}, [
		() => m(),
		() => r() ? p() : "transparent",
		() => m() ? J("cp.linkedTitle", {
			label: a(),
			token: m()
		}) : a()
	]), z("click", Te, function(...e) {
		(l ? void 0 : () => R(x) ? pe() : de())?.apply(this, e);
	}), V(e, we), et();
}
Mr([
	"pointerdown",
	"input",
	"change",
	"click"
]);
//#endregion
//#region ../template/assets/engine/0.7.4/imageTools.js
var Fa = 1600, Ia = .82, La = .6, Ra = 15e6, za = 4e6, Ba = 256e3;
function Va(e) {
	if (!Ua(e, 0, "GIF8")) return !1;
	for (let t = 13; t < e.length - 11; t++) if (e[t] === 33 && e[t + 1] === 255 && e[t + 2] === 11 && (Ua(e, t + 3, "NETSCAPE2.0") || Ua(e, t + 3, "ANIMEXTS1.0"))) return !0;
	return !1;
}
var Ha = class extends Error {
	constructor(e) {
		super("The animated image is too large"), this.code = "animatedTooLarge", this.bytes = e;
	}
}, Ua = (e, t, n) => {
	if (t + n.length > e.length) return !1;
	for (let r = 0; r < n.length; r += 1) if (e[t + r] !== n.charCodeAt(r)) return !1;
	return !0;
};
function Wa(e) {
	if (!Ua(e, 0, "GIF87a") && !Ua(e, 0, "GIF89a") || e.length < 13) return !1;
	let t = 13;
	e[10] & 128 && (t += 3 * 2 ** ((e[10] & 7) + 1));
	let n = () => {
		for (; t < e.length;) {
			let n = e[t];
			if (t += 1, n === 0) return;
			t += n;
		}
	}, r = 0;
	for (; t < e.length;) {
		let i = e[t];
		if (t += 1, i === 44) {
			if (r += 1, r > 1) return !0;
			if (t + 9 > e.length) return !1;
			let i = e[t + 8];
			t += 9, i & 128 && (t += 3 * 2 ** ((i & 7) + 1)), t += 1, n();
		} else if (i === 33) t += 1, n();
		else return !1;
	}
	return !1;
}
function Ga(e) {
	return !Ua(e, 0, "RIFF") || !Ua(e, 8, "WEBP") ? !1 : Ua(e, 12, "VP8X") && e.length > 20 && !!(e[20] & 2);
}
function Ka(e) {
	if (e.length < 16 || [
		137,
		80,
		78,
		71,
		13,
		10,
		26,
		10
	].some((t, n) => e[n] !== t)) return !1;
	let t = 8;
	for (; t + 8 <= e.length;) {
		let n = (e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3]) >>> 0;
		if (Ua(e, t + 4, "acTL")) return !0;
		if (Ua(e, t + 4, "IDAT") || Ua(e, t + 4, "IEND")) return !1;
		t += 12 + n;
	}
	return !1;
}
function qa(e) {
	return e instanceof Uint8Array ? Wa(e) ? "gif" : Ga(e) ? "webp" : Ka(e) ? "png" : null : null;
}
async function Ja(e) {
	if (!/^image\/(?:gif|webp|png|apng)$/i.test(e.type || "") && !/\.(?:gif|webp|a?png)$/i.test(e.name || "")) return null;
	if (e.size > 4e6) {
		let t = new Uint8Array(await e.slice(0, Ba).arrayBuffer());
		if (qa(t) || Va(t)) throw new Ha(e.size);
		return null;
	}
	let t = new Uint8Array(await e.arrayBuffer()), n = qa(t);
	if (!n) return null;
	let r = await new Promise((e, r) => {
		let i = new FileReader();
		i.onload = () => e(i.result), i.onerror = () => r(i.error), i.readAsDataURL(new Blob([t], { type: `image/${n}` }));
	}), i = 0, a = 0;
	try {
		let t = await createImageBitmap(e);
		i = t.width, a = t.height, t.close();
	} catch {}
	return {
		dataUrl: r,
		bytes: t.length,
		width: i,
		height: a,
		animated: !0
	};
}
async function Ya(e, t = Fa, { still: n = !1 } = {}) {
	if (Za(e)) return Qa(await e.text());
	let r = n ? null : await Ja(e);
	if (r) return r;
	let i = await createImageBitmap(e), a = Math.min(1, t / Math.max(i.width, i.height)), o = Math.round(i.width * a), s = Math.round(i.height * a), c = document.createElement("canvas");
	c.width = o, c.height = s, c.getContext("2d").drawImage(i, 0, 0, o, s), i.close();
	let l = (e) => new Promise((t) => c.toBlob(t, "image/webp", e)), u = await l(Ia);
	return u.size > 4e5 && (u = await l(La)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(u);
		}),
		bytes: u.size,
		width: o,
		height: s
	};
}
var Xa = "image/svg+xml";
function Za(e) {
	return e.type === Xa || /\.svg$/i.test(e.name || "");
}
function Qa(e) {
	let t = String(e ?? "");
	if (!/<svg[\s>]/i.test(t)) throw Error("Invalid SVG");
	if (/<\s*script[\s>]/i.test(t) || /<\s*foreignObject[\s>]/i.test(t) || /\son[a-z]+\s*=/i.test(t) || /javascript:/i.test(t)) throw Error("The SVG contains scripts or event handlers and cannot be used");
	let n = new Blob([t]).size, r = `data:${Xa};base64,${btoa(unescape(encodeURIComponent(t)))}`, i = t.match(/<svg\b[^>]*>/i)?.[0] ?? "", a = i.match(/viewBox\s*=\s*["']\s*([-\d.]+(?:[\s,]+[-\d.]+){3})\s*["']/i)?.[1]?.split(/[\s,]+/).map(Number);
	return {
		dataUrl: r,
		bytes: n,
		width: a?.length === 4 ? a[2] : Number.parseFloat(i.match(/\bwidth\s*=\s*["']?([\d.]+)/i)?.[1]) || 0,
		height: a?.length === 4 ? a[3] : Number.parseFloat(i.match(/\bheight\s*=\s*["']?([\d.]+)/i)?.[1]) || 0
	};
}
function $a(e, t, n = .04) {
	let r = String(e ?? "");
	if (!t || !(t.width > 0) || !(t.height > 0)) return r;
	let i = r.match(/<svg\b[^>]*>/i)?.[0];
	if (!i) return r;
	let a = (e) => Math.round(e * 1e3) / 1e3, o = Math.max(t.width, t.height) * Math.max(0, n), s = a(t.x - o), c = a(t.y - o), l = a(t.width + 2 * o), u = a(t.height + 2 * o), d = i.replace(/\sviewBox\s*=\s*["'][^"']*["']/i, "").replace(/\swidth\s*=\s*["'][^"']*["']/i, "").replace(/\sheight\s*=\s*["'][^"']*["']/i, "").replace(/<svg\b/i, `<svg viewBox="${s} ${c} ${l} ${u}" width="${l}" height="${u}"`);
	return r.replace(i, d);
}
function eo(e) {
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
function to(e) {
	let t = e || "";
	if (/^data:image\/svg\+xml[;,]/.test(t)) return "svg";
	if (/^data:image\/gif[;,]/.test(t)) return "gif";
	if (/^data:image\/(?:png|apng)[;,]/.test(t)) return "png";
	let n = t.match(/^data:audio\/([a-z0-9.+-]+)[;,]/i)?.[1]?.toLowerCase();
	if (n) return {
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
	}[n] ?? "mp3";
	let r = t.match(/^data:video\/([a-z0-9.+-]+)[;,]/i)?.[1]?.toLowerCase();
	return r ? r === "webm" ? "webm" : "mp4" : "webp";
}
function no(e, t = "image") {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || t;
}
function ro(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region ../template/assets/engine/0.7.4/glyphs.js
var io = "urd-recent-glyphs", ao = "urd-recent-icons", oo = [
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
function so(e, t) {
	return [t, ...(Array.isArray(e) ? e : []).filter((e) => e !== t)].slice(0, 16);
}
var co = (e) => {
	try {
		let t = JSON.parse(localStorage.getItem(e) ?? "[]");
		return Array.isArray(t) ? t : [];
	} catch {
		return [];
	}
}, lo = (e, t, n) => {
	let r = so(t, n);
	try {
		localStorage.setItem(e, JSON.stringify(r));
	} catch {}
	return r;
};
function uo() {
	return co(io);
}
function fo(e) {
	return lo(io, uo(), e);
}
function po() {
	return co(ao);
}
function mo(e) {
	return lo(ao, po(), e);
}
//#endregion
//#region ../template/assets/engine/0.7.4/icons.js
var ho = "fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"", go = "fill=\"currentColor\" stroke=\"none\"", _o = {
	facebook: {
		label: "Facebook",
		labelKey: "icon.facebook",
		body: "<path d=\"M15.5 4H13a3.5 3.5 0 0 0-3.5 3.5V10H7v3.2h2.5V20h3.2v-6.8h2.5l.55-3.2h-3.05V7.8c0-.5.4-.8.9-.8h1.9z\"/>"
	},
	instagram: {
		label: "Instagram",
		labelKey: "icon.instagram",
		body: "<rect x=\"3.5\" y=\"3.5\" width=\"17\" height=\"17\" rx=\"4.5\"/><circle cx=\"12\" cy=\"12\" r=\"3.8\"/><circle cx=\"16.9\" cy=\"7.1\" r=\"1.1\" fill=\"currentColor\" stroke=\"none\"/>"
	},
	x: {
		label: "X (Twitter)",
		labelKey: "icon.x",
		body: "<path d=\"M5 4h3.8l4 5.4L17.4 4h2.4l-5.9 6.9L20.5 20h-3.8l-4.3-5.8L7.4 20H5l6.3-7.4z\"/>",
		fill: !0
	},
	linkedin: {
		label: "LinkedIn",
		labelKey: "icon.linkedin",
		body: "<circle cx=\"4.8\" cy=\"4.8\" r=\"1.7\"/><path d=\"M3.3 9.2h3v11h-3z\"/><path d=\"M9.7 20.2v-11h3v1.6a3.9 3.9 0 0 1 3.3-1.8c2.6 0 4.4 1.8 4.4 4.9v6.3h-3.1v-5.7c0-1.6-.7-2.6-2-2.6-1.4 0-2.5 1-2.5 2.7v5.6z\"/>"
	},
	youtube: {
		label: "YouTube",
		labelKey: "icon.youtube",
		body: "<rect x=\"2.8\" y=\"5.7\" width=\"18.4\" height=\"12.6\" rx=\"3.6\"/><path d=\"M10.2 9.3l5 2.7-5 2.7z\" fill=\"currentColor\" stroke=\"none\"/>"
	},
	tiktok: {
		label: "TikTok",
		labelKey: "icon.tiktok",
		body: "<path d=\"M13.8 5v9.3a3.9 3.9 0 1 1-3.9-3.9\"/><path d=\"M13.8 5c.5 2.9 2.6 4.8 5.6 5v3.1c-2.1-.1-4-.8-5.6-2\"/>"
	},
	whatsapp: {
		label: "WhatsApp",
		labelKey: "icon.whatsapp",
		body: "<path d=\"M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5z\"/><path d=\"M9.2 8.4l1 2-.8 1a7.3 7.3 0 0 0 3.2 3.2l1-.8 2 1c-.3 1.3-1.2 1.9-2.4 1.7-2.9-.5-5.2-2.8-5.7-5.7-.2-1.2.4-2.1 1.7-2.4z\"/>"
	},
	snapchat: {
		label: "Snapchat",
		labelKey: "icon.snapchat",
		body: "<path d=\"M12 3.2c-2.9 0-4.9 2.1-4.9 5v2.1c-.8.3-1.7.3-2.5.1.3 1 1.1 1.8 2.2 2-.4 1.4-1.5 2.5-3 2.8 1 1.2 2.6 1.9 4.3 1.8.9 1.2 2.3 1.9 3.9 1.9s3-.7 3.9-1.9c1.7.1 3.3-.6 4.3-1.8-1.5-.3-2.6-1.4-3-2.8 1.1-.2 1.9-1 2.2-2-.8.2-1.7.2-2.5-.1V8.2c0-2.9-2-5-4.9-5z\"/>"
	},
	pinterest: {
		label: "Pinterest",
		labelKey: "icon.pinterest",
		body: "<path d=\"M9.2 20.5c.4-1.6 1.4-5.6 1.9-7.6\"/><path d=\"M10.4 14.2c.4.9 1.4 1.5 2.6 1.5 2.6 0 4.4-2.2 4.4-5a5.4 5.4 0 1 0-10.4 2.1\"/>"
	},
	spotify: {
		label: "Spotify",
		labelKey: "icon.spotify",
		body: "<circle cx=\"12\" cy=\"12\" r=\"8.8\"/><path d=\"M7.6 9.6c3-.9 6.6-.6 9.1.9\"/><path d=\"M8 12.5c2.5-.7 5.4-.4 7.5.8\"/><path d=\"M8.5 15.2c2-.5 4.2-.3 5.9.7\"/>"
	},
	discord: {
		label: "Discord",
		labelKey: "icon.discord",
		body: "<path d=\"M8 3.9c-1.6.3-3.1.9-4.5 1.7-1.5 3.2-2.1 6.6-1.7 10a12.7 12.7 0 0 0 5 2.6l1-1.9a11 11 0 0 0 8.4 0l1 1.9a12.7 12.7 0 0 0 5-2.6c.4-3.4-.2-6.8-1.7-10A14 14 0 0 0 16 3.9l-.6 1.4a15 15 0 0 0-6.8 0z\"/><circle cx=\"9.3\" cy=\"11.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"14.7\" cy=\"11.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>"
	},
	github: {
		label: "GitHub",
		labelKey: "icon.github",
		body: "<path d=\"M12 2.8a9.2 9.2 0 0 0-2.9 17.9c.5.1.6-.2.6-.4v-1.7c-2.6.6-3.1-1.1-3.1-1.1-.4-1.1-1-1.4-1-1.4-.9-.6 0-.6 0-.6.9.1 1.4 1 1.4 1 .8 1.4 2.2 1 2.7.8.1-.6.3-1 .6-1.3-2-.2-4.2-1-4.2-4.5 0-1 .4-1.8 1-2.5-.1-.2-.4-1.2.1-2.4 0 0 .8-.3 2.5.9a8.8 8.8 0 0 1 4.6 0c1.7-1.2 2.5-.9 2.5-.9.5 1.2.2 2.2.1 2.4.6.7 1 1.5 1 2.5 0 3.5-2.2 4.3-4.2 4.5.3.3.6.9.6 1.8v2.6c0 .2.1.5.6.4A9.2 9.2 0 0 0 12 2.8z\"/>",
		fill: !0
	},
	mail: {
		label: "Email",
		labelKey: "icon.mail",
		body: "<rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2.5\"/><path d=\"M3.5 7l8.5 6 8.5-6\"/>"
	},
	phone: {
		label: "Phone",
		labelKey: "icon.phone",
		body: "<path d=\"M21.2 16.9v2.6a1.8 1.8 0 0 1-2 1.8 18 18 0 0 1-7.8-2.8 17.7 17.7 0 0 1-5.4-5.4A18 18 0 0 1 3.2 5.2a1.8 1.8 0 0 1 1.8-2h2.6a1.8 1.8 0 0 1 1.8 1.5c.1.9.3 1.7.6 2.5a1.8 1.8 0 0 1-.4 1.9l-1.1 1.1a14.4 14.4 0 0 0 5.4 5.4l1.1-1.1a1.8 1.8 0 0 1 1.9-.4c.8.3 1.6.5 2.5.6a1.8 1.8 0 0 1 1.5 1.8z\"/>"
	},
	smartphone: {
		label: "Mobile",
		labelKey: "icon.smartphone",
		body: "<rect x=\"7\" y=\"2.8\" width=\"10\" height=\"18.4\" rx=\"2.5\"/><line x1=\"10.8\" y1=\"18.2\" x2=\"13.2\" y2=\"18.2\"/>"
	},
	chat: {
		label: "Speech bubble",
		labelKey: "icon.chat",
		body: "<path d=\"M20.8 12a8.5 8.5 0 0 1-12.4 7.5L4 20.6l1.1-4.2A8.5 8.5 0 1 1 20.8 12z\"/>"
	},
	send: {
		label: "Send",
		labelKey: "icon.send",
		body: "<path d=\"M21 3.5L10.4 14.1\"/><path d=\"M21 3.5l-6.8 17-3.8-6.4L4 10.3z\"/>"
	},
	globe: {
		label: "Website",
		labelKey: "icon.globe",
		body: "<circle cx=\"12\" cy=\"12\" r=\"8.8\"/><path d=\"M3.2 12h17.6\"/><path d=\"M12 3.2c2.4 2.4 3.6 5.4 3.6 8.8s-1.2 6.4-3.6 8.8c-2.4-2.4-3.6-5.4-3.6-8.8S9.6 5.6 12 3.2z\"/>"
	},
	rss: {
		label: "RSS feed",
		labelKey: "icon.rss",
		body: "<path d=\"M4.5 11a8.5 8.5 0 0 1 8.5 8.5\"/><path d=\"M4.5 5.5a14 14 0 0 1 14 14\"/><circle cx=\"5.5\" cy=\"18.5\" r=\"1.3\" fill=\"currentColor\" stroke=\"none\"/>"
	},
	"map-pin": {
		label: "Map pin",
		labelKey: "icon.map-pin",
		body: "<path d=\"M12 21.5s7-6.2 7-11.3A7 7 0 1 0 5 10.2c0 5.1 7 11.3 7 11.3z\"/><circle cx=\"12\" cy=\"10\" r=\"2.6\"/>"
	},
	map: {
		label: "Map",
		labelKey: "icon.map",
		body: "<path d=\"M9 4L3.5 6v14L9 18l6 2 5.5-2V4L15 6z\"/><path d=\"M9 4v14\"/><path d=\"M15 6v14\"/>"
	},
	home: {
		label: "Home",
		labelKey: "icon.home",
		body: "<path d=\"M4 10.5l8-7 8 7V20a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 20z\"/><path d=\"M9.5 21.5V14h5v7.5\"/>"
	},
	clock: {
		label: "Clock",
		labelKey: "icon.clock",
		body: "<circle cx=\"12\" cy=\"12\" r=\"8.8\"/><path d=\"M12 7v5l3.2 2\"/>"
	},
	calendar: {
		label: "Calendar",
		labelKey: "icon.calendar",
		body: "<rect x=\"3.5\" y=\"5\" width=\"17\" height=\"16\" rx=\"2.5\"/><path d=\"M3.5 10h17\"/><path d=\"M8 2.8V7\"/><path d=\"M16 2.8V7\"/>"
	},
	heart: {
		label: "Heart",
		labelKey: "icon.heart",
		body: "<path d=\"M12 20.5S3.5 15.4 3.5 9.5A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8.5 2.5c0 5.9-8.5 11-8.5 11z\"/>"
	},
	star: {
		label: "Star",
		labelKey: "icon.star",
		body: "<path d=\"M12 3.5l2.7 5.4 6 .9-4.3 4.2 1 6-5.4-2.8-5.4 2.8 1-6L3.3 9.8l6-.9z\"/>"
	},
	check: {
		label: "Check",
		labelKey: "icon.check",
		body: "<path d=\"M4.5 12.8L9.5 18 19.5 6.5\"/>"
	},
	cross: {
		label: "Cross",
		labelKey: "icon.cross",
		body: "<path d=\"M6 6l12 12\"/><path d=\"M18 6L6 18\"/>"
	},
	plus: {
		label: "Plus",
		labelKey: "icon.plus",
		body: "<path d=\"M12 5v14\"/><path d=\"M5 12h14\"/>"
	},
	info: {
		label: "Info",
		labelKey: "icon.info",
		body: "<circle cx=\"12\" cy=\"12\" r=\"8.8\"/><path d=\"M12 11v5.5\"/><line x1=\"12\" y1=\"7.8\" x2=\"12\" y2=\"7.8\"/>"
	},
	question: {
		label: "Question",
		labelKey: "icon.question",
		body: "<circle cx=\"12\" cy=\"12\" r=\"8.8\"/><path d=\"M9.4 9.2A2.7 2.7 0 0 1 12 7.4c1.5 0 2.7 1 2.7 2.4 0 1.8-2.7 2-2.7 4\"/><line x1=\"12\" y1=\"16.8\" x2=\"12\" y2=\"16.8\"/>"
	},
	warning: {
		label: "Warning",
		labelKey: "icon.warning",
		body: "<path d=\"M12 4L2.8 19.5h18.4z\"/><path d=\"M12 10v4\"/><line x1=\"12\" y1=\"16.8\" x2=\"12\" y2=\"16.8\"/>"
	},
	zap: {
		label: "Lightning",
		labelKey: "icon.zap",
		body: "<path d=\"M13 2.8L4.5 13.5H11l-1 7.7 8.5-10.7H12z\"/>"
	},
	sun: {
		label: "Sun",
		labelKey: "icon.sun",
		body: "<circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7\"/>"
	},
	moon: {
		label: "Moon",
		labelKey: "icon.moon",
		body: "<path d=\"M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z\"/>"
	},
	leaf: {
		label: "Leaf",
		labelKey: "icon.leaf",
		body: "<path d=\"M5 19C5 9 11 4.5 20 4.5c0 9-4.5 15-13 14.5z\"/><path d=\"M5 19c2-5.5 5.5-9 10-11\"/>"
	},
	music: {
		label: "Music",
		labelKey: "icon.music",
		body: "<circle cx=\"7\" cy=\"17.5\" r=\"2.8\"/><circle cx=\"17\" cy=\"15.5\" r=\"2.8\"/><path d=\"M9.8 17.5V6.5l10-2v11\"/>"
	},
	camera: {
		label: "Camera",
		labelKey: "icon.camera",
		body: "<path d=\"M3.5 8.5A1.5 1.5 0 0 1 5 7h2.5l1.7-2.3h5.6L16.5 7H19a1.5 1.5 0 0 1 1.5 1.5V18a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 18z\"/><circle cx=\"12\" cy=\"13\" r=\"3.4\"/>"
	},
	image: {
		label: "Image",
		labelKey: "icon.image",
		body: "<rect x=\"3.5\" y=\"4.5\" width=\"17\" height=\"15\" rx=\"2.5\"/><circle cx=\"8.8\" cy=\"9.3\" r=\"1.6\"/><path d=\"M20.5 15.5l-4.7-4.7-9.3 8.7\"/>"
	},
	document: {
		label: "Document",
		labelKey: "icon.document",
		body: "<path d=\"M13.5 3H6.8A1.8 1.8 0 0 0 5 4.8v14.4A1.8 1.8 0 0 0 6.8 21h10.4a1.8 1.8 0 0 0 1.8-1.8V8.5z\"/><path d=\"M13.5 3v5.5H19\"/><path d=\"M8.5 13h7M8.5 16.5h7\"/>"
	},
	"shopping-bag": {
		label: "Shopping bag",
		labelKey: "icon.shopping-bag",
		body: "<path d=\"M5.5 8h13l-1 12a1.8 1.8 0 0 1-1.8 1.5H8.3A1.8 1.8 0 0 1 6.5 20z\"/><path d=\"M8.8 10.5V7a3.2 3.2 0 0 1 6.4 0v3.5\"/>"
	},
	cart: {
		label: "Cart",
		labelKey: "icon.cart",
		body: "<circle cx=\"9.3\" cy=\"19.3\" r=\"1.5\"/><circle cx=\"17.3\" cy=\"19.3\" r=\"1.5\"/><path d=\"M3 4.5h2.4l2.3 10.6a1.8 1.8 0 0 0 1.8 1.4h7.6a1.8 1.8 0 0 0 1.8-1.4L20.8 8H6.1\"/>"
	},
	gift: {
		label: "Gift",
		labelKey: "icon.gift",
		body: "<rect x=\"3.5\" y=\"8\" width=\"17\" height=\"4\"/><path d=\"M5 12v8.5h14V12\"/><path d=\"M12 8v12.5\"/><path d=\"M12 8s-4.5.3-5.5-1.8C5.8 4.7 7.8 3.3 9.3 4.4 10.8 5.5 12 8 12 8z\"/><path d=\"M12 8s4.5.3 5.5-1.8c.7-1.5-1.3-2.9-2.8-1.8C13.2 5.5 12 8 12 8z\"/>"
	},
	wrench: {
		label: "Wrench",
		labelKey: "icon.wrench",
		body: "<path d=\"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z\"/>"
	},
	lock: {
		label: "Lock",
		labelKey: "icon.lock",
		body: "<rect x=\"5\" y=\"10.5\" width=\"14\" height=\"10\" rx=\"2\"/><path d=\"M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3\"/>"
	},
	search: {
		label: "Search",
		labelKey: "icon.search",
		body: "<circle cx=\"10.8\" cy=\"10.8\" r=\"6.8\"/><path d=\"M15.8 15.8L21 21\"/>"
	},
	user: {
		label: "Person",
		labelKey: "icon.user",
		body: "<circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4.5 20.5a7.5 7.5 0 0 1 15 0\"/>"
	},
	users: {
		label: "People",
		labelKey: "icon.users",
		body: "<circle cx=\"9\" cy=\"8.5\" r=\"3.5\"/><path d=\"M2.8 20a6.2 6.2 0 0 1 12.4 0\"/><path d=\"M16 5.4a3.5 3.5 0 0 1 0 6.2\"/><path d=\"M17.8 14.6a6.2 6.2 0 0 1 3.4 5.4\"/>"
	},
	"thumbs-up": {
		label: "Thumbs up",
		labelKey: "icon.thumbs-up",
		body: "<path d=\"M3.5 10.5H7v10H3.5z\"/><path d=\"M7 19.5V11l4.2-5.6a1.7 1.7 0 0 1 3 1.4l-.9 3.7h4.8a2 2 0 0 1 2 2.4l-1.2 5.5a2 2 0 0 1-2 1.6H8.6\"/>"
	},
	"arrow-right": {
		label: "Arrow right",
		labelKey: "icon.arrow-right",
		body: "<path d=\"M4 12h16\"/><path d=\"M13.5 5.5L20 12l-6.5 6.5\"/>"
	},
	"arrow-left": {
		label: "Arrow left",
		labelKey: "icon.arrow-left",
		body: "<path d=\"M20 12H4\"/><path d=\"M10.5 5.5L4 12l6.5 6.5\"/>"
	},
	"arrow-up": {
		label: "Arrow up",
		labelKey: "icon.arrow-up",
		body: "<path d=\"M12 20V4\"/><path d=\"M5.5 10.5L12 4l6.5 6.5\"/>"
	},
	"arrow-down": {
		label: "Arrow down",
		labelKey: "icon.arrow-down",
		body: "<path d=\"M12 4v16\"/><path d=\"M5.5 13.5L12 20l6.5-6.5\"/>"
	},
	"external-link": {
		label: "External link",
		labelKey: "icon.external-link",
		body: "<path d=\"M9.5 5H5.8A1.8 1.8 0 0 0 4 6.8v11.4A1.8 1.8 0 0 0 5.8 20h11.4a1.8 1.8 0 0 0 1.8-1.8v-3.7\"/><path d=\"M13.5 4H20v6.5\"/><path d=\"M20 4l-9 9\"/>"
	},
	download: {
		label: "Download",
		labelKey: "icon.download",
		body: "<path d=\"M12 3.5v11\"/><path d=\"M6.5 9l5.5 5.5L17.5 9\"/><path d=\"M4 20.5h16\"/>"
	},
	share: {
		label: "Share",
		labelKey: "icon.share",
		body: "<circle cx=\"6\" cy=\"12\" r=\"2.6\"/><circle cx=\"17.5\" cy=\"5.5\" r=\"2.6\"/><circle cx=\"17.5\" cy=\"18.5\" r=\"2.6\"/><path d=\"M8.4 10.8l6.8-4M8.4 13.2l6.8 4\"/>"
	}
}, vo = [
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
function yo(e) {
	let t = typeof e == "string" ? _o[e] : null;
	return t ? `<svg viewBox="0 0 24 24" width="100%" height="100%" ${t.fill ? go : ho} aria-hidden="true" focusable="false">${t.body}</svg>` : null;
}
//#endregion
//#region src/lib/GlyphPicker.svelte
var bo = /* @__PURE__ */ B("<button type=\"button\"><span class=\"gp-svg svelte-15ln1c3\"></span></button>"), xo = /* @__PURE__ */ B("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), So = /* @__PURE__ */ B("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"><!> <!></div>", 1), Co = /* @__PURE__ */ B("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), wo = /* @__PURE__ */ B("<button type=\"button\"> </button>"), To = /* @__PURE__ */ B("<div class=\"gp-group svelte-15ln1c3\"> </div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\"> </button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\"> </p>", 1), Eo = /* @__PURE__ */ B("<!> <!> <!> <!>", 1), Do = /* @__PURE__ */ B("<img class=\"gp-own svelte-15ln1c3\"/>"), Oo = /* @__PURE__ */ B("<span class=\"gp-svg svelte-15ln1c3\"></span>"), ko = /* @__PURE__ */ B("<div class=\"gp-pop gp-anchored svelte-15ln1c3\" popover=\"auto\"><!></div>"), Ao = /* @__PURE__ */ B("<div class=\"gp-pop svelte-15ln1c3\"><!></div>"), jo = /* @__PURE__ */ B("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"><!></button> <!></span>");
function Mo(e, t) {
	$e(t, !0);
	let n = (e) => {
		var n = Eo(), a = P(n), o = (e) => {
			var t = So(), n = P(t), r = F(n, !0), a = I(n, 2), o = N(a);
			ni(o, 16, () => R(d), (e) => e, (e, t) => {
				var n = bo();
				let r;
				var a = N(n);
				W(a, () => yo(t), !0), D(a), D(n), L((e) => {
					r = Ei(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, r, { active: t === i() }), q(n, "title", e);
				}, [() => J(_o[t].labelKey)]), z("click", n, () => C(t)), V(e, n);
			}), ni(I(o, 2), 16, () => R(u), (e) => e, (e, t) => {
				var n = xo(), r = F(n, !0);
				L(() => H(r, t)), z("click", n, () => S(t)), V(e, n);
			}), D(a), L((e) => H(r, e), [() => J("common.recent")]), V(e, t);
		};
		U(a, (e) => {
			(R(u).length || R(d).length) && e(o);
		});
		var s = I(a, 2), c = (e) => {
			var t = Vr();
			ni(P(t), 17, () => vo, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ A(() => h(R(t), 2));
				let r = () => R(n)[0], a = () => R(n)[1];
				var o = Co(), s = P(o), c = F(s, !0), l = I(s, 2);
				ni(l, 20, a, (e) => e, (e, t) => {
					var n = bo();
					let r;
					var a = N(n);
					W(a, () => yo(t), !0), D(a), D(n), L((e) => {
						r = Ei(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, r, { active: t === i() }), q(n, "title", e);
					}, [() => J(_o[t].labelKey)]), z("click", n, () => C(t)), V(e, n);
				}), D(l), L((e) => H(c, e), [() => J(r())]), V(e, o);
			}), V(e, t);
		};
		U(s, (e) => {
			t.onicon && e(c);
		});
		var l = I(s, 2);
		ni(l, 17, () => oo, ([e, t]) => e, (e, t) => {
			var n = /* @__PURE__ */ A(() => h(R(t), 2));
			let i = () => R(n)[0], a = () => R(n)[1];
			var o = Co(), s = P(o), c = F(s, !0), l = I(s, 2);
			ni(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var n = wo();
				let i;
				var a = F(n, !0);
				L(() => {
					i = Ei(n, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === r() }), H(a, t);
				}), z("click", n, () => S(t)), V(e, n);
			}), D(l), L((e) => H(c, e), [() => J(i())]), V(e, o);
		});
		var f = I(l, 2), p = (e) => {
			var t = To(), n = P(t), r = F(n, !0), i = I(n, 2), a = F(i, !0), o = I(i, 2);
			Ui(o, (e) => M(m, e), () => R(m));
			var s = F(I(o, 2), !0);
			L((e, t, n) => {
				H(r, e), H(a, t), H(s, n);
			}, [
				() => J("gp.ownIcon"),
				() => J("gp.upload"),
				() => J("gp.uploadHint")
			]), z("click", i, () => R(m).click()), z("change", o, w), V(e, t);
		};
		U(f, (e) => {
			t.onimage && e(p);
		}), V(e, n);
	}, r = qi(t, "value", 3, "★"), i = qi(t, "icon", 3, null), a = qi(t, "image", 3, null), o = qi(t, "label", 19, () => J("gp.pickGlyph")), s = _a(), c = ya("urd-gp"), l = c.slice(2), u = /* @__PURE__ */ j(sn([])), d = /* @__PURE__ */ j(sn([])), f = /* @__PURE__ */ j(null), p = /* @__PURE__ */ j(null), m = /* @__PURE__ */ j(null), g = /* @__PURE__ */ j(!1), _ = /* @__PURE__ */ j(sn({
		top: 0,
		left: 0
	}));
	function v() {
		M(u, uo(), !0), M(d, t.onicon ? po().filter((e) => _o[e]) : [], !0);
	}
	function y(e) {
		M(g, e.newState === "open"), ba(R(f), R(g)), R(g) && v();
	}
	function b() {
		s && R(p)?.hidePopover(), M(g, !1);
	}
	function x() {
		v();
		let e = R(f).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		M(_, {
			top: n,
			left: t
		}, !0), M(g, !0);
	}
	function S(e) {
		fo(e), t.onpick?.(e), b();
	}
	function C(e) {
		mo(e), t.onicon?.(e), b();
	}
	async function w(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", n) {
			try {
				let e = await Ya(n, 256, { still: !0 });
				t.onimage?.(e.dataUrl);
			} catch (e) {
				console.warn("Urd: the icon could not be read", e);
			}
			b();
		}
	}
	Dn(() => {
		if (!R(g)) return;
		let e = () => b();
		if (window.addEventListener("blur", e), s) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			R(f) && !R(f).contains(e.target) && M(g, !1);
		}, n = (e) => {
			e.key === "Escape" && M(g, !1);
		}, r = (e) => {
			R(f) && e.target instanceof Node && !R(f).contains(e.target) && M(g, !1);
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var T = jo(), ee = N(T), te = N(ee), ne = (e) => {
		var t = Do();
		L((e) => {
			q(t, "src", a()), q(t, "alt", e);
		}, [() => J("gp.ownIcon")]), V(e, t);
	}, re = (e) => {
		var t = Oo();
		W(t, () => yo(i()), !0), D(t), V(e, t);
	}, E = (e) => {
		var t = Br();
		L(() => H(t, r() || "★")), V(e, t);
	};
	U(te, (e) => {
		a() ? e(ne) : i() && _o[i()] ? e(re, 1) : e(E, -1);
	}), D(ee);
	var ie = I(ee, 2), ae = (e) => {
		var t = ko(), r = N(t), i = (e) => {
			n(e);
		};
		U(r, (e) => {
			R(g) && e(i);
		}), D(t), Ui(t, (e) => M(p, e), () => R(p)), L(() => {
			q(t, "id", l), Oi(t, `position-anchor: ${c ?? ""}`);
		}), jr("toggle", t, y), V(e, t);
	}, oe = (e) => {
		var t = Ao(), r = N(t);
		n(r), D(t), L(() => Oi(t, `top: ${R(_).top ?? ""}px; left: ${R(_).left ?? ""}px`)), V(e, t);
	};
	U(ie, (e) => {
		s ? e(ae) : R(g) && e(oe, 1);
	}), D(T), Ui(T, (e) => M(f, e), () => R(f)), L(() => {
		q(ee, "title", o()), q(ee, "aria-label", o()), q(ee, "popovertarget", s ? l : void 0), Oi(ee, s ? `anchor-name: ${c}` : void 0);
	}), z("click", ee, function(...e) {
		(s ? void 0 : () => R(g) ? M(g, !1) : x())?.apply(this, e);
	}), V(e, T), et();
}
Mr(["click", "change"]);
//#endregion
//#region src/lib/MarkPicker.svelte
var No = /* @__PURE__ */ B("<span class=\"mp-count svelte-1y5ipgc\"> </span>"), Po = /* @__PURE__ */ B("<div class=\"mp-tabs svelte-1y5ipgc\" role=\"group\"><button type=\"button\"> </button> <button type=\"button\"> <!></button></div>"), Fo = /* @__PURE__ */ B("<button type=\"button\"><span class=\"mp-svg svelte-1y5ipgc\"></span></button>"), Io = /* @__PURE__ */ B("<p class=\"mp-hint svelte-1y5ipgc\"> </p>"), Lo = /* @__PURE__ */ B("<input class=\"mp-search svelte-1y5ipgc\" type=\"search\"/> <div class=\"mp-scroll svelte-1y5ipgc\"><div class=\"mp-grid svelte-1y5ipgc\"><button type=\"button\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" aria-hidden=\"true\" class=\"svelte-1y5ipgc\"><circle cx=\"12\" cy=\"12\" r=\"8.5\"></circle><path d=\"M6 18L18 6\"></path></svg></button> <!></div> <!></div>", 1), Ro = /* @__PURE__ */ B("<button type=\"button\"><img alt=\"\" class=\"svelte-1y5ipgc\"/></button>"), zo = /* @__PURE__ */ B("<div class=\"mp-scroll svelte-1y5ipgc\"><div class=\"mp-grid mp-grid-img svelte-1y5ipgc\"><button type=\"button\" class=\"mp-cell mp-upload svelte-1y5ipgc\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" aria-hidden=\"true\" class=\"svelte-1y5ipgc\"><path d=\"M12 5v14\"></path><path d=\"M5 12h14\"></path></svg> <span> </span></button> <!></div> <p class=\"mp-hint svelte-1y5ipgc\"> </p></div>"), Bo = /* @__PURE__ */ B("<!> <!>", 1), Vo = /* @__PURE__ */ B("<img class=\"mp-own svelte-1y5ipgc\" alt=\"\"/>"), Ho = /* @__PURE__ */ B("<span class=\"mp-svg svelte-1y5ipgc\"></span>"), Uo = /* @__PURE__ */ B("<span class=\"mp-empty svelte-1y5ipgc\" aria-hidden=\"true\">+</span>"), Wo = /* @__PURE__ */ B("<div class=\"mp-pop mp-anchored svelte-1y5ipgc\" popover=\"auto\"><!></div>"), Go = /* @__PURE__ */ B("<div class=\"mp-pop svelte-1y5ipgc\"><!></div>"), Ko = /* @__PURE__ */ B("<span class=\"mp svelte-1y5ipgc\"><button type=\"button\"><!></button> <!> <input type=\"file\" accept=\"image/*\" hidden=\"\"/></span>");
function qo(e, t) {
	$e(t, !0);
	let n = (e) => {
		var t = Bo(), n = P(t), a = (e) => {
			var t = Po(), n = N(t);
			let r;
			var i = F(n, !0), a = I(n, 2);
			let s;
			var c = N(a, !0), l = I(c), u = (e) => {
				var t = No(), n = F(t, !0);
				L(() => H(n, R(S).length)), V(e, t);
			};
			U(l, (e) => {
				R(S).length && e(u);
			}), D(a), D(t), L((e, l) => {
				q(t, "aria-label", o()), r = Ei(n, 1, "mp-tab svelte-1y5ipgc", null, r, { on: R(_) === "icons" }), q(n, "aria-pressed", R(_) === "icons"), H(i, e), s = Ei(a, 1, "mp-tab svelte-1y5ipgc", null, s, { on: R(_) === "images" }), q(a, "aria-pressed", R(_) === "images"), H(c, l);
			}, [() => J("mp.icons"), () => J("mp.images")]), z("click", n, () => M(_, "icons")), z("click", a, () => M(_, "images")), V(e, t);
		};
		U(n, (e) => {
			l() || e(a);
		});
		var c = I(n, 2), u = (e) => {
			var t = Lo(), n = P(t);
			G(n);
			var a = I(n, 2), o = N(a), c = N(o);
			let l;
			ni(I(c, 2), 17, () => R(x), ({ id: e }) => e, (e, t) => {
				let n = () => R(t).id;
				var a = Fo();
				let o;
				var s = N(a);
				W(s, () => yo(n()), !0), D(s), D(a), L((e, t) => {
					o = Ei(a, 1, "mp-cell svelte-1y5ipgc", null, o, { active: n() === r() && !i() }), q(a, "title", e), q(a, "aria-label", t);
				}, [() => J(_o[n()].labelKey), () => J(_o[n()].labelKey)]), z("click", a, () => te(n())), V(e, a);
			}), D(o);
			var u = I(o, 2), d = (e) => {
				var t = Io(), n = F(t, !0);
				L((e) => H(n, e), [() => J("mp.noHits")]), V(e, t);
			};
			U(u, (e) => {
				R(x).length || e(d);
			}), D(a), L((e, t) => {
				q(n, "placeholder", e), q(n, "aria-label", t), l = Ei(c, 1, "mp-cell mp-none svelte-1y5ipgc", null, l, { active: !r() && !i() }), q(c, "title", s()), q(c, "aria-label", s());
			}, [() => J("mp.search"), () => J("mp.search")]), Li(n, () => R(v), (e) => M(v, e)), z("click", c, re), V(e, t);
		}, d = (e) => {
			var t = zo(), n = N(t), r = N(n), a = F(I(N(r), 2), !0);
			D(r), ni(I(r, 2), 16, () => R(S), (e) => e, (e, t) => {
				var n = Ro();
				let r;
				var a = F(n);
				L(() => {
					r = Ei(n, 1, "mp-cell mp-img svelte-1y5ipgc", null, r, { active: t === i() }), q(a, "src", t);
				}), z("click", n, () => ne(t)), V(e, n);
			}), D(n);
			var o = F(I(n, 2), !0);
			D(t), L((e, t) => {
				H(a, e), H(o, t);
			}, [() => J("mp.upload"), () => J("mp.imagesHint")]), z("click", r, ae), V(e, t);
		};
		U(c, (e) => {
			R(_) === "icons" ? e(u) : e(d, -1);
		}), V(e, t);
	}, r = qi(t, "icon", 3, ""), i = qi(t, "image", 3, ""), a = qi(t, "images", 19, () => []), o = qi(t, "label", 19, () => J("mp.pickMark")), s = qi(t, "noneLabel", 19, () => J("common.none")), c = qi(t, "klass", 3, ""), l = qi(t, "iconsOnly", 3, !1), u = _a(), d = ya("urd-mp"), f = d.slice(2), p = /* @__PURE__ */ j(null), m = /* @__PURE__ */ j(null), h = /* @__PURE__ */ j(null), g = /* @__PURE__ */ j(!1), _ = /* @__PURE__ */ j("icons"), v = /* @__PURE__ */ j(""), y = /* @__PURE__ */ j(sn({
		top: 0,
		left: 0
	})), b = vo.flatMap(([e, t]) => t.map((t) => ({
		id: t,
		cat: e
	}))), x = /* @__PURE__ */ A(() => {
		let e = R(v).trim().toLowerCase();
		return e ? b.filter(({ id: t }) => {
			let n = J(_o[t].labelKey) || _o[t].label;
			return t.includes(e) || n.toLowerCase().includes(e);
		}) : b;
	}), S = /* @__PURE__ */ A(() => [...new Set(a().filter(Boolean))]);
	function C() {
		M(v, ""), M(E, !1), M(_, i() && !l() ? "images" : "icons", !0);
	}
	function w(e) {
		M(g, e.newState === "open"), ba(R(p), R(g)), R(g) && C();
	}
	function T() {
		u && R(m)?.hidePopover(), M(g, !1);
	}
	function ee() {
		C();
		let e = R(p).getBoundingClientRect();
		M(y, {
			left: Math.max(8, Math.min(e.left, window.innerWidth - 286 - 8)),
			top: e.bottom + 332 + 8 > window.innerHeight ? Math.max(8, e.top - 332 - 8) : e.bottom + 6
		}, !0), M(g, !0);
	}
	function te(e) {
		t.onpick?.({
			icon: e,
			image: ""
		});
	}
	function ne(e) {
		t.onpick?.({ image: e });
	}
	function re() {
		t.onpick?.({
			icon: "",
			image: ""
		});
	}
	let E = /* @__PURE__ */ j(!1);
	function ie(e) {
		M(E, !1);
		let n = e.target.files?.[0];
		e.target.value = "", n && t.onfile?.(n);
	}
	function ae() {
		M(E, !0), R(h).click();
	}
	Dn(() => {
		if (!R(g)) return;
		let e = () => {
			R(E) || T();
		};
		if (window.addEventListener("blur", e), u) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			R(p) && !R(p).contains(e.target) && M(g, !1);
		}, n = (e) => {
			e.key === "Escape" && M(g, !1);
		}, r = (e) => {
			R(p) && e.target instanceof Node && !R(p).contains(e.target) && M(g, !1);
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var oe = Ko(), se = N(oe), ce = N(se), le = (e) => {
		var n = Vr();
		ci(P(n), () => t.children), V(e, n);
	}, ue = (e) => {
		var t = Vo();
		L(() => q(t, "src", i())), V(e, t);
	}, de = (e) => {
		var t = Ho();
		W(t, () => yo(r()), !0), D(t), V(e, t);
	}, fe = (e) => {
		V(e, Uo());
	};
	U(ce, (e) => {
		t.children ? e(le) : i() ? e(ue, 1) : r() && _o[r()] ? e(de, 2) : e(fe, -1);
	}), D(se);
	var pe = I(se, 2), me = (e) => {
		var t = Wo(), r = N(t), i = (e) => {
			n(e);
		};
		U(r, (e) => {
			R(g) && e(i);
		}), D(t), Ui(t, (e) => M(m, e), () => R(m)), L(() => {
			q(t, "id", f), Oi(t, `position-anchor: ${d ?? ""}`);
		}), jr("toggle", t, w), V(e, t);
	}, he = (e) => {
		var t = Go(), r = N(t);
		n(r), D(t), L(() => Oi(t, `top: ${R(y).top ?? ""}px; left: ${R(y).left ?? ""}px`)), V(e, t);
	};
	U(pe, (e) => {
		u ? e(me) : R(g) && e(he, 1);
	});
	var ge = I(pe, 2);
	Ui(ge, (e) => M(h, e), () => R(h)), D(oe), Ui(oe, (e) => M(p, e), () => R(p)), L(() => {
		Ei(se, 1, `mp-trigger ${c() ?? ""}`, "svelte-1y5ipgc"), q(se, "title", o()), q(se, "aria-label", o()), q(se, "popovertarget", u ? f : void 0), Oi(se, u ? `anchor-name: ${d}` : void 0);
	}), z("click", se, function(...e) {
		(u ? void 0 : () => R(g) ? M(g, !1) : ee())?.apply(this, e);
	}), z("change", ge, ie), jr("cancel", ge, () => M(E, !1)), V(e, oe), et();
}
Mr(["click", "change"]);
//#endregion
//#region src/lib/previewBridge.js
function Jo(e, t = {}) {
	let n = (n) => {
		if (n.origin !== location.origin || n.source !== e.contentWindow) return;
		let r = n.data;
		r?.type === "urd-edit" && t.onEdit?.(r), r?.type === "urd-move" && t.onMove?.(r), r?.type === "urd-grow" && t.onGrow?.(r), r?.type === "urd-delete" && t.onDelete?.(r), r?.type === "urd-add-section" && t.onAddSection?.(r), r?.type === "urd-move-section" && t.onMoveSection?.(r), r?.type === "urd-delete-section" && t.onDeleteSection?.(r), r?.type === "urd-section-size" && t.onSectionSize?.(r), r?.type === "urd-undo" && t.onUndo?.(r), r?.type === "urd-select-section" && t.onSelectSection?.(r), r?.type === "urd-select-block" && t.onSelectBlock?.(r), r?.type === "urd-block-menu" && t.onBlockMenu?.(r), r?.type === "urd-plugin-blocks" && t.onPluginBlocks?.(r), r?.type === "urd-ready" && t.onReady?.(r), r?.type === "urd-navigate" && t.onNavigate?.(r), r?.type === "urd-add-block" && t.onAddBlock?.(r), r?.type === "urd-add-blocks" && t.onAddBlocks?.(r), r?.type === "urd-request-block" && t.onRequestBlock?.(r), r?.type === "urd-move-block-section" && t.onMoveBlockSection?.(r), r?.type === "urd-mobile-reset" && t.onMobileReset?.(r), r?.type === "urd-mobile-order" && t.onMobileOrder?.(r), r?.type === "urd-review-done" && t.onReviewDone?.(r), r?.type === "urd-block-flag" && t.onBlockFlag?.(r), r?.type === "urd-collection-edit" && t.onCollectionEdit?.(r), r?.type === "urd-collection-add" && t.onCollectionAdd?.(r), r?.type === "urd-nav-width" && t.onNavWidth?.(r), r?.type === "urd-save-template" && t.onSaveTemplate?.(r), r?.type === "urd-sticky-group" && t.onStickyGroup?.(r), r?.type === "urd-sticky-dock" && t.onStickyDock?.(r), r?.type === "urd-delete-template" && t.onDeleteTemplate?.(r), r?.type === "urd-apply-layout" && t.onApplyLayout?.(r);
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
		sendAnnounceReset() {
			r({ type: "urd-announce-reset" });
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
		sendTemplates(e) {
			r({
				type: "urd-templates",
				templates: e
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
		sendFitBlock(e, t, n = 0) {
			r({
				type: "urd-fit-block",
				sectionId: e,
				blockId: t,
				seq: n
			});
		},
		sendFrames(e, t) {
			r({
				type: "urd-frames",
				sectionId: e,
				frames: t
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
		sendDemoMotion() {
			r({ type: "urd-demo-motion" });
		},
		sendOpenImageEditor(e) {
			r({
				type: "urd-open-image-editor",
				blockId: e
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
var Yo = 400;
function Xo({ prepare: e, onHeight: t, title: n }) {
	let r = null, i = !1, a = null, o = null, s = null, c = (e) => r?.contentWindow?.postMessage(e, location.origin), l = () => {
		if (a = null, !i || !o) return;
		let { pageId: t, page: n, blocks: r } = o;
		o = null, s = t, e(c, !1), c({
			type: "urd-preview-full",
			pageId: t,
			page: n
		});
		for (let [e, { sectionId: t, seq: n }] of r) c({
			type: "urd-fit-block",
			sectionId: t,
			blockId: e,
			seq: n
		});
	}, u = (n) => {
		if (n.origin !== location.origin || !r || n.source !== r.contentWindow) return;
		let a = n.data;
		a?.type === "urd-ready" ? (i = !0, e(c, !0), c({
			type: "urd-viewport",
			mode: "mobile"
		}), c({
			type: "urd-chrome",
			visible: !1
		}), l()) : a?.type === "urd-grow" && a.fit && s && t(s, a.blockId, a.h, a.seq ?? 0);
	}, d = () => {
		r || (window.addEventListener("message", u), r = document.createElement("iframe"), r.src = "/?preview=1", r.title = n(), r.tabIndex = -1, r.inert = !0, r.setAttribute("aria-hidden", "true"), r.style.cssText = "position:fixed;left:0;top:0;width:390px;height:844px;border:0;opacity:0;pointer-events:none;z-index:-1", document.body.appendChild(r));
	};
	return {
		request(e, t, n, r, i) {
			d();
			let s = o?.pageId === e ? o.blocks : /* @__PURE__ */ new Map();
			s.set(r, {
				sectionId: n,
				seq: i
			}), o = {
				pageId: e,
				page: t,
				blocks: s
			}, clearTimeout(a), a = setTimeout(l, Yo);
		},
		cancel() {
			clearTimeout(a), a = null, o = null, s = null;
		},
		destroy() {
			clearTimeout(a), window.removeEventListener("message", u), r?.remove(), r = null, i = !1;
		}
	};
}
//#endregion
//#region node_modules/svelte/src/reactivity/set.js
var Zo = [
	"forEach",
	"isDisjointFrom",
	"isSubsetOf",
	"isSupersetOf"
], Qo = [
	"difference",
	"intersection",
	"symmetricDifference",
	"union"
], $o = !1, es = class e extends Set {
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ j(0);
	#n = /* @__PURE__ */ j(0);
	#r = ur || -1;
	constructor(e) {
		if (super(), e) {
			for (var t of e) super.add(t);
			this.#n.v = super.size;
		}
		$o || this.#a();
	}
	#i(e) {
		return ur === this.#r ? /* @__PURE__ */ j(e) : Qt(e);
	}
	#a() {
		$o = !0;
		var t = e.prototype, n = Set.prototype;
		for (let e of Zo) t[e] = function(...t) {
			return R(this.#t), n[e].apply(this, t);
		};
		for (let r of Qo) t[r] = function(...t) {
			R(this.#t);
			var i = n[r].apply(this, t);
			return new e(i);
		};
	}
	has(e) {
		var t = super.has(e), n = this.#e, r = n.get(e);
		if (r === void 0) {
			if (!t) return R(this.#t), !1;
			r = this.#i(!0), n.set(e, r);
		}
		return R(r), t;
	}
	add(e) {
		return super.has(e) || (super.add(e), M(this.#n, super.size), an(this.#t)), this;
	}
	delete(e) {
		var t = super.delete(e), n = this.#e, r = n.get(e);
		return r !== void 0 && (n.delete(e), M(r, !1)), t && (M(this.#n, super.size), an(this.#t)), t;
	}
	clear() {
		if (super.size !== 0) {
			super.clear();
			var e = this.#e;
			for (var t of e.values()) M(t, !1);
			e.clear(), M(this.#n, 0), an(this.#t);
		}
	}
	keys() {
		return this.values();
	}
	values() {
		return R(this.#t), super.values();
	}
	entries() {
		return R(this.#t), super.entries();
	}
	[Symbol.iterator]() {
		return this.keys();
	}
	get size() {
		return R(this.#n);
	}
}, ts = "urd-quick-row", ns = ["fit", "phone"], rs = {
	calendar: [
		"design",
		"limit",
		"subscribe"
	],
	text: ["align", "textBox"],
	button: ["goesTo", "btnStyle"],
	image: ["imgFit", "radius"],
	video: ["videoSource"],
	icon: ["iconSize", "iconColor"],
	shape: ["shapeColor", "thickness"],
	gallery: ["galleryView", "columns"],
	ribbon: ["ribbonMotion", "speed"],
	table: ["tableLines"],
	quote: ["variant"],
	stats: ["variant"],
	faq: ["variant"],
	timeline: ["variant"],
	form: ["sendMode"],
	collection: ["collectionView", "limit"],
	product: ["columns"],
	cart: ["cartView"],
	checkout: ["vippsButton"],
	share: ["variant"],
	countdown: ["seconds"],
	audio: ["loop"],
	map: ["zoom"]
};
function is(e) {
	return [...rs[e] ?? [], ...ns];
}
var as = Object.freeze({
	pinned: [],
	removed: []
});
function os(e) {
	let t = (e) => Array.isArray(e) ? [...new Set(e.filter((e) => typeof e == "string" && e))] : [];
	return {
		pinned: t(e?.pinned),
		removed: t(e?.removed)
	};
}
function ss(e, t, n) {
	let r = is(e).filter((e) => !t.removed.includes(e));
	for (let e of t.pinned) r.includes(e) || r.push(e);
	return r.filter((e) => n.has(e));
}
function cs(e, t, n) {
	return is(e).includes(n) ? !t.removed.includes(n) : t.pinned.includes(n);
}
function ls(e, t, n) {
	let r = is(e).includes(n);
	return cs(e, t, n) ? r ? {
		pinned: t.pinned,
		removed: [...t.removed, n]
	} : {
		pinned: t.pinned.filter((e) => e !== n),
		removed: t.removed
	} : r ? {
		pinned: t.pinned,
		removed: t.removed.filter((e) => e !== n)
	} : {
		pinned: [...t.pinned, n],
		removed: t.removed
	};
}
function us(e) {
	return e.pinned.length > 0 || e.removed.length > 0;
}
function ds(e) {
	try {
		let t = JSON.parse(e.getItem("urd-quick-row") ?? "{}");
		return !t || typeof t != "object" || Array.isArray(t) ? {} : Object.fromEntries(Object.entries(t).map(([e, t]) => [e, os(t)]));
	} catch {
		return {};
	}
}
function fs(e, t) {
	let n = Object.fromEntries(Object.entries(t).filter(([, e]) => us(e)));
	try {
		e.setItem(ts, JSON.stringify(n));
	} catch {}
}
//#endregion
//#region src/menu/state.svelte.js
var ps = "urd-admin-menu-width", ms = sn({
	widthPref: localStorage.getItem(ps) === "narrow" ? "narrow" : "wide",
	wide: localStorage.getItem(ps) !== "narrow",
	min: 8,
	room: Infinity,
	menuQuery: "",
	propsQuery: "",
	tab: "content"
});
function hs() {
	return ms.wide && ms.room >= 740;
}
function gs(e) {
	ms.widthPref = e === "narrow" ? "narrow" : "wide", ms.wide = ms.widthPref === "wide", ms.widthPref === "narrow" ? localStorage.setItem(ps, "narrow") : localStorage.removeItem(ps);
}
function _s(e) {
	ms.min = Math.round(e) + 8, ms.room = window.innerWidth - ms.min - 8;
}
var vs = new es(), ys = sn({ choices: ds(localStorage) });
function bs(e) {
	return ys.choices[e] ?? as;
}
function xs(e, t) {
	ys.choices = {
		...ys.choices,
		[e]: t
	}, fs(localStorage, Ge(ys.choices));
}
function Ss(e, t) {
	xs(e, ls(e, bs(e), t));
}
//#endregion
//#region src/menu/options.js
var Cs = () => [["on", J("common.on")], ["off", J("common.off")]], ws = () => [
	["canvas", J("opt.ribbonWidth.content")],
	["page", J("opt.ribbonWidth.page")],
	["content", J("opt.ribbonWidth.own")]
], Ts = (e) => e === "canvas" || e === "page" ? e : "content", Es = () => [
	["roll", J("opt.ribbonMotion.roll")],
	["sway", J("opt.ribbonMotion.sway")],
	["step", J("opt.ribbonMotion.step")],
	["none", J("opt.ribbonMotion.none")]
], Ds = () => [
	["text", J("opt.ribbonStripe.text")],
	["marks", J("opt.ribbonStripe.marks")],
	["plain", J("opt.ribbonStripe.plain")]
], Os = () => [["none", J("common.none")], ...Ds()], ks = () => [
	["dot", J("opt.ribbonSep.dot")],
	["dash", J("opt.ribbonSep.dash")],
	["slash", J("opt.ribbonSep.slash")],
	["star", J("opt.ribbonSep.star")],
	["none", J("common.none")],
	["custom", J("opt.ribbonSep.custom")]
], As = (e) => e.color || (e.variant === "plain" ? "text" : "accent-text"), js = (e) => `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">${e}</svg>`, Ms = {
	dot: js("<circle cx=\"12\" cy=\"12\" r=\"3\"/>"),
	dash: js("<rect x=\"3\" y=\"10.6\" width=\"18\" height=\"2.8\" rx=\"1.4\"/>"),
	slash: js("<path d=\"M15.5 3.5L8.5 20.5\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\" fill=\"none\"/>"),
	star: js("<path d=\"M12 2.8l2.3 6.1 6.5.4-5 4.1 1.6 6.3-5.4-3.5-5.4 3.5 1.6-6.3-5-4.1 6.5-.4z\"/>"),
	none: js("<path d=\"M5 12h14\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\" opacity=\"0.35\"/><path d=\"M6 6l12 12\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>"),
	custom: js("<path d=\"M5 8h14M5 12h9M5 16h12\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>")
}, Ns = () => [
	["line", J("shape.line")],
	["arrow", J("shape.arrow")],
	["circle", J("shape.circle")],
	["rect", J("shape.rect")],
	["triangle", J("shape.triangle")]
], Ps = () => [
	["accent", J("color.accent")],
	["text", J("color.text")],
	["surface", J("color.surface")],
	["bg", J("color.bg")]
], Fs = [
	["top-left", "opt.dock.topLeft"],
	["top-center", "opt.dock.topCenter"],
	["top-right", "opt.dock.topRight"],
	["middle-left", "opt.dock.middleLeft"],
	["middle-center", "opt.dock.middleCenter"],
	["middle-right", "opt.dock.middleRight"],
	["bottom-left", "opt.dock.bottomLeft"],
	["bottom-center", "opt.dock.bottomCenter"],
	["bottom-right", "opt.dock.bottomRight"]
], Is = /* @__PURE__ */ B("<span aria-hidden=\"true\"><svg viewBox=\"0 0 16 16\" width=\"1em\" height=\"1em\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"svelte-vtocc6\"><path d=\"M3.5 6l4.5 4.5L12.5 6\"></path></svg></span>"), Ls = /* @__PURE__ */ B("<span class=\"dd-note svelte-vtocc6\"> </span>"), Rs = /* @__PURE__ */ B("<button type=\"button\"> <!></button>"), zs = /* @__PURE__ */ B("<button type=\"button\"><span class=\"dd-value svelte-vtocc6\"> </span> <!></button> <div class=\"dd-pop dd-anchored svelte-vtocc6\" popover=\"auto\"><!></div>", 1), Bs = /* @__PURE__ */ B("<div class=\"dd-pop svelte-vtocc6\"></div>"), Vs = /* @__PURE__ */ B("<button type=\"button\"><span class=\"dd-value svelte-vtocc6\"> </span> <!></button> <!>", 1), Hs = /* @__PURE__ */ B("<span class=\"dd svelte-vtocc6\"><!></span>");
function Y(e, t) {
	$e(t, !0);
	let n = (e) => {
		var t = Is();
		let n;
		L(() => n = Ei(t, 1, "dd-caret svelte-vtocc6", null, n, { "dd-caret-open": R(f) })), V(e, t);
	}, r = qi(t, "value", 3, null), i = qi(t, "options", 19, () => []), a = qi(t, "title", 3, null), o = qi(t, "disabled", 3, !1), s = qi(t, "filled", 3, !1), c = qi(t, "compact", 3, !1), l = _a(), u = ya("urd-dd"), d = u.slice(2), f = /* @__PURE__ */ j(!1), p = /* @__PURE__ */ j(null), m = /* @__PURE__ */ j(null), g = /* @__PURE__ */ j(sn({
		top: 0,
		left: 0,
		width: 160
	})), _ = () => i().find(([e]) => `${e ?? ""}` == `${r() ?? ""}`)?.[1] ?? "";
	function v() {
		let e = R(p).getBoundingClientRect(), t = Math.min(320, i().reduce((e, t) => e + (t[2] ? 76 : 32), 12)), n = Math.max(e.width, 160), r = e.bottom + t + 8 <= window.innerHeight;
		M(g, {
			top: r ? e.bottom + 4 : Math.max(8, e.top - t - 4),
			left: Math.max(8, Math.min(e.left, window.innerWidth - n - 8)),
			width: n
		}, !0);
	}
	function y() {
		if (!o()) {
			if (R(f)) {
				M(f, !1);
				return;
			}
			v(), M(f, !0);
		}
	}
	function b(e) {
		l && R(m)?.hidePopover(), M(f, !1), t.onchange?.(e);
	}
	Dn(() => {
		if (!R(f)) return;
		let e = () => {
			l ? R(m)?.hidePopover() : M(f, !1);
		};
		if (window.addEventListener("blur", e), l) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			R(p) && !R(p).contains(e.target) && M(f, !1);
		}, n = (e) => {
			e.key === "Escape" && M(f, !1);
		}, r = (e) => {
			R(p) && e.target instanceof Node && !R(p).contains(e.target) && v();
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var x = Hs(), S = N(x), C = (e) => {
		var t = zs(), l = P(t);
		let p;
		var g = N(l), v = F(g, !0), y = I(g, 2);
		n(y), D(l);
		var x = I(l, 2), S = N(x), C = (e) => {
			var t = Vr();
			ni(P(t), 17, i, ([e, t, n]) => `${e ?? ""}`, (e, t) => {
				var n = /* @__PURE__ */ A(() => h(R(t), 3));
				let i = () => R(n)[0], a = () => R(n)[1], o = () => R(n)[2];
				var s = Rs();
				let c;
				var l = N(s, !0), u = I(l), d = (e) => {
					var t = Ls(), n = F(t, !0);
					L(() => H(n, o())), V(e, t);
				};
				U(u, (e) => {
					o() && e(d);
				}), D(s), L(() => {
					c = Ei(s, 1, "dd-opt svelte-vtocc6", null, c, { selected: `${i() ?? ""}` == `${r() ?? ""}` }), H(l, a());
				}), z("click", s, () => b(i())), V(e, s);
			}), V(e, t);
		};
		U(S, (e) => {
			R(f) && e(C);
		}), D(x), Ui(x, (e) => M(m, e), () => R(m)), L((e) => {
			p = Ei(l, 1, "dd-btn svelte-vtocc6", null, p, {
				"dd-filled": s(),
				"dd-compact": c()
			}), q(l, "title", a()), l.disabled = o(), q(l, "popovertarget", d), Oi(l, `anchor-name: ${u ?? ""}`), H(v, e), q(x, "id", d), Oi(x, `position-anchor: ${u ?? ""}`);
		}, [() => _()]), jr("toggle", x, (e) => {
			M(f, e.newState === "open");
		}), V(e, t);
	}, w = (e) => {
		var t = Vs(), l = P(t);
		let u;
		var d = N(l), p = F(d, !0), m = I(d, 2);
		n(m), D(l);
		var v = I(l, 2), x = (e) => {
			var t = Bs();
			ni(t, 21, i, ([e, t, n]) => `${e ?? ""}`, (e, t) => {
				var n = /* @__PURE__ */ A(() => h(R(t), 3));
				let i = () => R(n)[0], a = () => R(n)[1], o = () => R(n)[2];
				var s = Rs();
				let c;
				var l = N(s, !0), u = I(l), d = (e) => {
					var t = Ls(), n = F(t, !0);
					L(() => H(n, o())), V(e, t);
				};
				U(u, (e) => {
					o() && e(d);
				}), D(s), L(() => {
					c = Ei(s, 1, "dd-opt svelte-vtocc6", null, c, { selected: `${i() ?? ""}` == `${r() ?? ""}` }), H(l, a());
				}), z("click", s, () => b(i())), V(e, s);
			}), D(t), L(() => Oi(t, `top: ${R(g).top ?? ""}px; left: ${R(g).left ?? ""}px; min-width: ${R(g).width ?? ""}px`)), V(e, t);
		};
		U(v, (e) => {
			R(f) && e(x);
		}), L((e) => {
			u = Ei(l, 1, "dd-btn svelte-vtocc6", null, u, {
				"dd-filled": s(),
				"dd-compact": c()
			}), q(l, "title", a()), l.disabled = o(), H(p, e);
		}, [() => _()]), z("click", l, y), V(e, t);
	};
	U(S, (e) => {
		l ? e(C) : e(w, -1);
	}), D(x), Ui(x, (e) => M(p, e), () => R(p)), V(e, x), et();
}
Mr(["click"]);
//#endregion
//#region src/lib/icons.js
var X = {
	copy: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"9\" y=\"9\" width=\"11\" height=\"11\" rx=\"2\"/><path d=\"M5 15V5a2 2 0 0 1 2-2h10\"/></svg>",
	phone: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><rect x=\"8\" y=\"3\" width=\"8\" height=\"18\" rx=\"2\"/><path d=\"M11 17.5h2\"/></svg>",
	shuffle: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M16 3h5v5\"/><path d=\"M4 20 21 3\"/><path d=\"M21 16v5h-5\"/><path d=\"M15 15l6 6\"/><path d=\"M4 4l5 5\"/></svg>",
	pencil: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M17 3l4 4L8 20l-5 1 1-5L17 3z\"/></svg>",
	eye: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z\"/><circle cx=\"12\" cy=\"12\" r=\"2.6\"/></svg>",
	warn: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 3L2 20h20L12 3z\"/><path d=\"M12 10v4\"/><path d=\"M12 17.2h.01\"/></svg>",
	up: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 20V4\"/><path d=\"M5 11l7-7 7 7\"/></svg>",
	down: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 4v16\"/><path d=\"M5 13l7 7 7-7\"/></svg>",
	right: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 12h16\"/><path d=\"M13 5l7 7-7 7\"/></svg>",
	pin: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linejoin=\"round\"><path d=\"M14 3l7 7-3 1-4 4 1 4-3 1-3-5-5 5v-2l4-4-5-3 1-3 4 1 4-4z\"/></svg>",
	pinOn: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"currentColor\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linejoin=\"round\"><path d=\"M14 3l7 7-3 1-4 4 1 4-3 1-3-5-5 5v-2l4-4-5-3 1-3 4 1 4-4z\"/></svg>",
	cross: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\"><path d=\"M5 5l14 14\"/><path d=\"M19 5L5 19\"/></svg>",
	plus: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\"><path d=\"M12 5v14\"/><path d=\"M5 12h14\"/></svg>",
	minus: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\"><path d=\"M5 12h14\"/></svg>",
	gear: "<svg width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z\"/></svg>",
	guides: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 2v20M2 12h20\" stroke-dasharray=\"3 3\"/><rect x=\"7.5\" y=\"7.5\" width=\"9\" height=\"9\" rx=\"1.5\"/></svg>",
	image: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"2\"/><circle cx=\"8.5\" cy=\"9.5\" r=\"1.6\"/><path d=\"M4 17l5-5 4 4 3-2 4 4\"/></svg>",
	kebab: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"currentColor\" stroke=\"none\"><circle cx=\"12\" cy=\"5\" r=\"1.8\"/><circle cx=\"12\" cy=\"12\" r=\"1.8\"/><circle cx=\"12\" cy=\"19\" r=\"1.8\"/></svg>",
	bookmark: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z\"/><path d=\"M12 7v6M9 10h6\"/></svg>",
	fit: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4M20 15v4a1 1 0 0 1-1 1h-4\"/></svg>",
	gridToggle: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M9 3v18M15 3v18M3 9h18M3 15h18\"/></svg>",
	restore: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 4v5h5\"/><path d=\"M3.05 13A9 9 0 1 0 6 5.3L3 9\"/><path d=\"M12 8v4.5l3 1.8\"/></svg>",
	foldToggle: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path class=\"ft-top\" d=\"M7 9l5-5 5 5\"/><path class=\"ft-bot\" d=\"M7 15l5 5 5-5\"/></svg>",
	caret: "<svg width=\"9\" height=\"9\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6 9l6 6 6-6\"/></svg>",
	external: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14 4h6v6\"/><path d=\"M20 4l-8 8\"/><path d=\"M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5\"/></svg>",
	device_desktop: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2\" y=\"3\" width=\"20\" height=\"13\" rx=\"2\"/><path d=\"M8 21h8M12 16v5\"/></svg>",
	device_laptop: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"4\" y=\"4\" width=\"16\" height=\"11\" rx=\"1.5\"/><path d=\"M2 19h20\"/></svg>",
	device_tablet: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"5\" y=\"2\" width=\"14\" height=\"20\" rx=\"2\"/><path d=\"M11 18.5h2\"/></svg>",
	device_mobile: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"7\" y=\"2\" width=\"10\" height=\"20\" rx=\"2\"/><path d=\"M11 18.5h2\"/></svg>"
}, Us = /* @__PURE__ */ B("<button type=\"button\"></button>");
function Ws(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock.type), i = /* @__PURE__ */ A(() => cs(R(r), bs(R(r)), t.id));
	var a = Us();
	let o;
	W(a, () => R(i) ? X.pinOn : X.pin, !0), D(a), L((e, t) => {
		o = Ei(a, 1, "menu-pin", null, o, { on: R(i) }), q(a, "aria-pressed", R(i)), q(a, "title", e), q(a, "aria-label", t);
	}, [() => R(i) ? J("menu.unpin") : J("menu.pin"), () => R(i) ? J("menu.unpin") : J("menu.pin")]), z("click", a, () => Ss(R(r), t.id)), V(e, a), et();
}
Mr(["click"]);
//#endregion
//#region ../template/assets/engine/0.7.4/calendar-designs.js
var Gs = [
	"list",
	"cards",
	"month",
	"agenda",
	"next",
	"week",
	"day",
	"year"
], Ks = [
	"title",
	"date",
	"time",
	"place",
	"description",
	"category",
	"number"
], qs = [
	"noticeLabel",
	"noticeTitle",
	"noticeText",
	"emptyKicker",
	"emptyTitle",
	"series",
	"forWhom",
	"openAll"
], Js = {
	noticeTitle: "calendar.noticeTitleHint",
	noticeText: "calendar.noticeTextHint"
}, Ys = ["emptyKicker", "emptyTitle"], Xs = [
	"noticeLabel",
	"noticeTitle",
	"noticeText",
	"readWhole",
	"moreInfo"
], Zs = /* @__PURE__ */ "all.signup.subscribe.subscribeMulti.addGoogle.swUpcoming.swWeek.swMonth.noMatch.earlier.showAll.zoneOf.zoneYours.weekN.range.moreN.dayNone.cancelled.allDay.until.timeAt.today.tomorrow.inDays.when.where.organizer.moreAbout.join.addEvent.addOne.addFile.addWhole.icalAddress.onMap.recurring".split("."), Qs = [
	"modern",
	"next",
	"ap"
];
function $s() {
	return Qs.map((e) => ({
		family: e,
		labelKey: `calendar.family.${e}`,
		designs: ec.filter((t) => t.family === e)
	})).filter((e) => e.designs.length);
}
var Z = (e, t = "colors") => ({
	key: e,
	labelKey: `calendar.slot.${e}`,
	section: t
}), ec = [
	{
		id: "plain",
		labelKey: "calendar.design.plain",
		set: "theme",
		family: "modern",
		phone: "fits",
		view: null,
		stripe: !1,
		slots: [
			Z("accent"),
			Z("surface"),
			Z("line"),
			Z("chip")
		],
		texts: [
			"next",
			"now",
			"later",
			...Zs
		]
	},
	{
		id: "timeline",
		labelKey: "calendar.design.timeline",
		set: "theme",
		family: "modern",
		phone: "fits",
		view: "list",
		module: "list",
		stripe: !1,
		slots: [
			Z("accent"),
			Z("dot"),
			Z("line"),
			Z("chip")
		],
		texts: Zs
	},
	{
		id: "table",
		labelKey: "calendar.design.table",
		set: "theme",
		family: "modern",
		phone: "switch",
		view: "list",
		module: "list",
		stripe: !1,
		slots: [
			Z("accent"),
			Z("head"),
			Z("headText"),
			Z("zebra"),
			Z("line"),
			Z("chip")
		],
		texts: [
			"colDate",
			"colTime",
			"colEvent",
			"colPlace",
			...Zs
		]
	},
	{
		id: "booklet",
		labelKey: "calendar.design.booklet",
		set: "poster",
		family: "modern",
		phone: "fits",
		excerpt: !0,
		view: "list",
		module: "list",
		stripe: !1,
		slots: [
			Z("accent"),
			Z("surface"),
			Z("rule"),
			Z("chip")
		],
		texts: ["program", ...Zs]
	},
	{
		id: "numbered",
		labelKey: "calendar.design.numbered",
		set: "poster",
		family: "modern",
		phone: "fits",
		view: "list",
		module: "list",
		stripe: !1,
		slots: [
			Z("accent"),
			Z("number"),
			Z("line"),
			Z("chip")
		],
		texts: ["count", ...Zs]
	},
	{
		id: "apList",
		labelKey: "calendar.design.apList",
		set: "apNavy",
		family: "ap",
		phone: "fits",
		empty: "ap",
		view: "list",
		module: "list",
		stripe: !1,
		slots: [
			Z("row"),
			Z("text"),
			Z("gold"),
			Z("line"),
			Z("rec")
		],
		texts: [...Ys, ...Zs]
	},
	{
		id: "glass",
		labelKey: "calendar.design.glass",
		set: "lightGlass",
		family: "modern",
		phone: "fits",
		view: "list",
		module: "list",
		stripe: !1,
		slots: [
			Z("ground"),
			Z("text"),
			Z("glass", "glass"),
			Z("glassLine", "glass"),
			Z("chip", "glass"),
			Z("blobA", "blobs"),
			Z("blobB", "blobs"),
			Z("blobC", "blobs")
		],
		texts: Zs
	},
	{
		id: "posters",
		labelKey: "calendar.design.posters",
		set: "poster",
		family: "modern",
		phone: "flows",
		view: "cards",
		module: "cards",
		stripe: !1,
		program: !0,
		slots: [
			Z("accent"),
			Z("surface"),
			Z("line"),
			Z("posterA", "posters"),
			Z("posterAText", "posters"),
			Z("posterB", "posters"),
			Z("posterBText", "posters"),
			Z("posterC", "posters"),
			Z("posterCText", "posters")
		],
		texts: ["wholeProgram", ...Zs]
	},
	{
		id: "tickets",
		labelKey: "calendar.design.tickets",
		set: "theme",
		family: "modern",
		phone: "flows",
		view: "cards",
		module: "cards",
		stripe: !1,
		program: !0,
		open: !0,
		slots: [
			Z("accent"),
			Z("surface"),
			Z("line"),
			Z("stub", "stub"),
			Z("stubText", "stub")
		],
		texts: [
			"wholeProgram",
			"openToAll",
			...Zs
		]
	},
	{
		id: "carousel",
		labelKey: "calendar.design.carousel",
		set: "theme",
		family: "modern",
		phone: "fits",
		view: "cards",
		module: "cards",
		stripe: !1,
		slots: [
			Z("accent"),
			Z("surface"),
			Z("line"),
			Z("chip"),
			Z("card", "first"),
			Z("cardText", "first")
		],
		texts: Zs
	},
	{
		id: "photo",
		labelKey: "calendar.design.photo",
		set: "theme",
		family: "modern",
		phone: "flows",
		view: "cards",
		module: "cards",
		stripe: !1,
		slots: [
			Z("accent"),
			Z("surface"),
			Z("line"),
			Z("placeholder"),
			Z("badge", "onPicture"),
			Z("badgeText", "onPicture"),
			Z("chip", "onPicture")
		],
		texts: Zs
	},
	{
		id: "apGrid",
		labelKey: "calendar.design.apGrid",
		set: "apCream",
		family: "ap",
		phone: "flows",
		empty: "ap",
		view: "cards",
		module: "cards",
		stripe: !1,
		slots: [
			Z("head"),
			Z("card"),
			Z("text"),
			Z("gold"),
			Z("rec")
		],
		texts: [...Ys, ...Zs]
	},
	{
		id: "bento",
		labelKey: "calendar.design.bento",
		set: "bento",
		family: "modern",
		phone: "flows",
		view: "cards",
		module: "cards",
		stripe: !1,
		ownSubscribe: !0,
		slots: [
			Z("accent"),
			Z("soft"),
			Z("tile"),
			Z("line"),
			Z("hero", "hero"),
			Z("heroText", "hero")
		],
		texts: [
			"nextShort",
			"thisMonth",
			...Zs
		]
	},
	{
		id: "weekStrip",
		labelKey: "calendar.design.weekStrip",
		set: "theme",
		family: "modern",
		phone: "flows",
		view: "week",
		module: "time",
		stripe: !1,
		slots: [
			Z("accent"),
			Z("surface"),
			Z("line"),
			Z("todayBg"),
			Z("pill"),
			Z("pillText")
		],
		texts: Zs
	},
	{
		id: "weekPlan",
		labelKey: "calendar.design.weekPlan",
		set: "theme",
		family: "modern",
		phone: "flows",
		view: "week",
		module: "time",
		stripe: !0,
		slots: [
			Z("accent"),
			Z("surface"),
			Z("line"),
			Z("todayBg"),
			Z("event")
		],
		texts: ["todayBtn", ...Zs]
	},
	{
		id: "layers",
		labelKey: "calendar.design.layers",
		set: "theme",
		family: "modern",
		phone: "flows",
		view: "week",
		module: "time",
		stripe: !1,
		ownFilter: !0,
		slots: [
			Z("accent"),
			Z("surface"),
			Z("line"),
			Z("todayBg")
		],
		texts: ["unnamed", ...Zs]
	},
	{
		id: "sidepanel",
		labelKey: "calendar.design.sidepanel",
		set: "theme",
		family: "modern",
		phone: "flows",
		view: "month",
		module: "time",
		stripe: !1,
		slots: [
			Z("accent"),
			Z("surface"),
			Z("panel"),
			Z("line"),
			Z("todayBg"),
			Z("selected"),
			Z("chip")
		],
		texts: Zs
	},
	{
		id: "apMonth",
		labelKey: "calendar.design.apMonth",
		set: "apCream",
		family: "ap",
		phone: "flows",
		empty: "ap",
		view: "month",
		module: "time",
		stripe: !1,
		slots: [
			Z("card"),
			Z("text"),
			Z("gold"),
			Z("goldDark"),
			Z("grid"),
			Z("pill")
		],
		texts: [...Ys, ...Zs]
	},
	{
		id: "dayPlan",
		labelKey: "calendar.design.dayPlan",
		set: "theme",
		family: "modern",
		phone: "fits",
		view: "day",
		module: "time",
		stripe: !0,
		slots: [
			Z("accent"),
			Z("surface"),
			Z("line"),
			Z("past"),
			Z("event")
		],
		texts: [
			"todayBtn",
			"todayCount",
			"count",
			...Zs
		]
	},
	{
		id: "yearWheel",
		labelKey: "calendar.design.yearWheel",
		set: "theme",
		family: "modern",
		phone: "fits",
		view: "year",
		module: "time",
		stripe: !1,
		slots: [
			Z("accent"),
			Z("surface"),
			Z("line"),
			Z("ring", "wheel"),
			Z("past", "wheel"),
			Z("dot", "wheel"),
			Z("dotOff", "wheel")
		],
		texts: [
			"wheel",
			"pickMonth",
			"count",
			"monthNone",
			...Zs
		]
	},
	{
		id: "heatmap",
		labelKey: "calendar.design.heatmap",
		set: "theme",
		family: "modern",
		phone: "switch",
		view: "year",
		module: "time",
		stripe: !1,
		slots: [
			Z("surface"),
			Z("panel"),
			Z("line"),
			Z("cell0", "scale"),
			Z("cell1", "scale"),
			Z("cell2", "scale"),
			Z("cell3", "scale"),
			Z("today", "scale")
		],
		texts: [
			"wholeYear",
			"fewer",
			"more",
			"pickDay",
			"count",
			...Zs
		]
	},
	{
		id: "billboard",
		labelKey: "calendar.design.billboard",
		set: "board",
		family: "next",
		phone: "fits",
		view: "next",
		module: "next",
		stripe: !1,
		ownSubscribe: !0,
		program: !0,
		slots: [
			Z("bg"),
			Z("text"),
			Z("label"),
			Z("pulse"),
			Z("tile", "countdown"),
			Z("tileText", "countdown"),
			Z("button", "buttons"),
			Z("buttonText", "buttons")
		],
		texts: [
			"now",
			"then",
			"unitDays",
			"unitHours",
			"unitMin",
			"wholeProgram",
			...Zs
		]
	},
	{
		id: "stacked",
		labelKey: "calendar.design.stacked",
		set: "theme",
		family: "next",
		phone: "fits",
		view: "next",
		module: "next",
		stripe: !1,
		slots: [
			Z("accent"),
			Z("surface"),
			Z("line"),
			Z("card", "cards"),
			Z("cardText", "cards"),
			Z("cardMid", "cards"),
			Z("cardBack", "cards"),
			Z("badge", "cards"),
			Z("badgeText", "cards")
		],
		texts: [
			"now",
			"browse",
			"nextN",
			...Zs
		]
	},
	{
		id: "noticeboard",
		labelKey: "calendar.design.noticeboard",
		set: "cork",
		family: "next",
		phone: "fits",
		view: "next",
		module: "next",
		stripe: !1,
		notice: !0,
		slots: [
			Z("board"),
			Z("boardText"),
			Z("note", "notes"),
			Z("noteText", "notes"),
			Z("noteLabel", "notes"),
			Z("noteAlt", "notes"),
			Z("noteAltText", "notes"),
			Z("pin", "notes"),
			Z("pinAlt", "notes"),
			Z("button", "buttons"),
			Z("buttonText", "buttons"),
			Z("strip", "later"),
			Z("stripText", "later")
		],
		texts: [
			"now",
			"next",
			"later",
			...Xs,
			...Zs
		]
	},
	{
		id: "split",
		labelKey: "calendar.design.split",
		set: "theme",
		family: "next",
		phone: "fits",
		excerpt: !0,
		view: "next",
		module: "next",
		stripe: !1,
		slots: [
			Z("accent"),
			Z("surface"),
			Z("line"),
			Z("chip"),
			Z("panel", "panel"),
			Z("panelText", "panel"),
			Z("button", "buttons"),
			Z("buttonText", "buttons"),
			Z("laterBg", "later")
		],
		texts: [
			"now",
			"later",
			...Zs
		]
	},
	{
		id: "band",
		labelKey: "calendar.design.band",
		set: "theme",
		family: "next",
		phone: "fits",
		view: "next",
		module: "next",
		stripe: !1,
		slots: [
			Z("band", "band"),
			Z("bandText", "band"),
			Z("dot", "band"),
			Z("tag", "band"),
			Z("tagText", "band")
		],
		texts: ["now", ...Zs]
	},
	{
		id: "oneLine",
		labelKey: "calendar.design.oneLine",
		set: "theme",
		family: "next",
		phone: "fits",
		view: "next",
		module: "next",
		stripe: !0,
		slots: [
			Z("accent"),
			Z("surface"),
			Z("line"),
			Z("ring"),
			Z("button", "buttons"),
			Z("buttonText", "buttons")
		],
		texts: [
			"now",
			"later",
			...Zs
		]
	},
	{
		id: "ring",
		labelKey: "calendar.design.ring",
		set: "theme",
		family: "next",
		phone: "fits",
		view: "next",
		module: "next",
		stripe: !1,
		slots: [
			Z("surface"),
			Z("line"),
			Z("chip"),
			Z("accent", "ring"),
			Z("track", "ring")
		],
		texts: [
			"now",
			"unitDays",
			"unitHours",
			...Zs
		]
	},
	{
		id: "darkGlass",
		labelKey: "calendar.design.darkGlass",
		set: "darkGlass",
		family: "next",
		phone: "fits",
		view: "next",
		module: "next",
		stripe: !1,
		ownSubscribe: !0,
		slots: [
			Z("ground"),
			Z("text"),
			Z("label"),
			Z("edge", "glass"),
			Z("glass", "glass"),
			Z("track", "glass"),
			Z("blobA", "blobs"),
			Z("blobB", "blobs"),
			Z("button", "buttons"),
			Z("buttonText", "buttons")
		],
		texts: [
			"now",
			"then",
			"untilStart",
			"countdownClock",
			...Zs
		]
	},
	{
		id: "nextBento",
		labelKey: "calendar.design.nextBento",
		set: "bento",
		family: "next",
		phone: "fits",
		view: "next",
		module: "next",
		stripe: !1,
		ownSubscribe: !0,
		program: !0,
		slots: [
			Z("accent"),
			Z("accentText"),
			Z("soft"),
			Z("tile"),
			Z("line")
		],
		texts: [
			"now",
			"wholeProgram",
			"count",
			...Zs
		]
	},
	{
		id: "apNow",
		labelKey: "calendar.design.apNow",
		set: "apCream",
		family: "ap",
		phone: "fits",
		view: "next",
		module: "more",
		stripe: !1,
		notice: !0,
		noticeBand: !0,
		empty: "ap",
		slots: [
			Z("head"),
			Z("card"),
			Z("text"),
			Z("panel"),
			Z("panelText"),
			Z("gold"),
			Z("goldDark"),
			Z("alert", "alert"),
			Z("alertText", "alert")
		],
		texts: [
			"now",
			"next",
			"later",
			...Xs,
			...Ys,
			...Zs
		]
	},
	{
		id: "apNavy",
		labelKey: "calendar.design.apNavy",
		set: "apNavy",
		family: "ap",
		phone: "fits",
		view: "next",
		module: "more",
		stripe: !1,
		empty: "ap",
		slots: [
			Z("ground"),
			Z("text"),
			Z("tile"),
			Z("line"),
			Z("gold"),
			Z("goldDark"),
			Z("card", "first"),
			Z("cardText", "first")
		],
		texts: [
			"now",
			"later",
			"moreInfo",
			"nextN",
			...Ys,
			...Zs
		]
	},
	{
		id: "apSeries",
		labelKey: "calendar.design.apSeries",
		set: "apCream",
		family: "ap",
		phone: "fits",
		excerpt: !0,
		view: "list",
		module: "more",
		stripe: !1,
		notice: !0,
		empty: "ap",
		slots: [
			Z("card"),
			Z("row"),
			Z("text"),
			Z("title"),
			Z("gold"),
			Z("goldDark"),
			Z("line")
		],
		texts: [
			"series",
			"forWhom",
			"openAll",
			"allDates",
			...Xs,
			...Ys,
			...Zs
		]
	},
	{
		id: "mobileAgenda",
		labelKey: "calendar.design.mobileAgenda",
		set: "agendaDark",
		family: "modern",
		phone: "fits",
		view: "agenda",
		module: "more",
		stripe: !0,
		ownFilter: !0,
		slots: [
			Z("ground"),
			Z("text"),
			Z("card"),
			Z("edge"),
			Z("accent"),
			Z("chip")
		],
		texts: ["todayBtn", ...Zs]
	}
], tc = (e, t, n, r) => ({
	key: e,
	kind: "choice",
	values: t,
	def: n,
	labelKey: `calendar.opt.${e}`,
	...r ? { when: r } : {}
}), nc = (e, t) => ({
	key: e,
	kind: "switch",
	def: t,
	labelKey: `calendar.opt.${e}`
}), rc = (e) => ({
	key: e,
	kind: "hour",
	def: null,
	labelKey: `calendar.opt.${e}`
}), ic = {
	sidepanel: [tc("panelSide", [
		"right",
		"left",
		"under"
	], "right")],
	weekPlan: [
		rc("hourFrom"),
		rc("hourTo"),
		nc("weekend", !1)
	],
	dayPlan: [
		rc("hourFrom"),
		rc("hourTo"),
		nc("weekend", !1)
	],
	table: [
		nc("colTime", !0),
		nc("colPlace", !0),
		nc("zebra", !0)
	],
	posters: [tc("columns", [
		"auto",
		"2",
		"3",
		"4"
	], "auto")],
	photo: [tc("columns", [
		"auto",
		"2",
		"3",
		"4"
	], "auto")],
	yearWheel: [tc("firstMonth", [
		"0",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"11",
		"now"
	], "0")],
	numbered: [nc("pad", !0)],
	band: [nc("roll", !0), tc("pause", ["button", "touch"], "button", { roll: !0 })]
}, ac = [
	"weekStrip",
	"weekPlan",
	"layers"
], oc = [
	"month",
	"sidepanel",
	"apMonth"
];
function sc(e) {
	let t = pc(e?.design), n = e?.switcherViews ?? {};
	return {
		week: ac.includes(n.week) ? n.week : "weekStrip",
		month: oc.includes(n.month) ? n.month : t.set === "apCream" || t.set === "apNavy" ? "apMonth" : "month"
	};
}
function cc(e) {
	return e?.description === "card" || e?.description === "rows" ? e.description : e?.options?.description === !1 ? "card" : "rows";
}
function lc(e) {
	let t = pc(e?.design);
	return t.excerpt === !0 || t.id === "plain" && mc(e) === "cards";
}
function uc(e) {
	return ic[pc(e).id] ?? [];
}
function dc(e) {
	let t = e?.options ?? {}, n = {};
	for (let r of uc(e?.design)) {
		let e = t[r.key];
		r.kind === "choice" ? n[r.key] = r.values.includes(e) ? e : r.def : r.kind === "switch" ? n[r.key] = typeof e == "boolean" ? e : r.def : n[r.key] = Number.isInteger(e) && e >= 0 && e <= 24 ? e : null;
	}
	return n;
}
function fc(e, t) {
	return !e.when || Object.entries(e.when).every(([e, n]) => t?.[e] === n);
}
function pc(e) {
	return ec.find((t) => t.id === e) ?? ec[0];
}
function mc(e) {
	return pc(e?.design).view || (Gs.includes(e?.view) ? e.view : "list");
}
var hc = [
	"list",
	"cards",
	"agenda",
	"next"
];
function gc() {
	let e = [{
		view: null,
		designs: ec.filter((e) => e.view === null)
	}];
	for (let t of Gs) {
		let n = ec.filter((e) => e.view === t);
		n.length && e.push({
			view: t,
			designs: n
		});
	}
	return e;
}
var _c = /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, vc = /^[a-z][a-z0-9-]*$/;
function yc(e) {
	return typeof e == "string" ? _c.test(e) ? e : vc.test(e) ? `var(--urd-color-${e})` : null : null;
}
function bc(e, t) {
	let n = typeof t?.show == "boolean" ? t.show : e.stripe;
	return {
		show: n,
		color: n ? yc(t?.color) : null
	};
}
var xc = {
	min: 8,
	max: 120
}, Sc = /^(?:\s|&nbsp;|&#160;|<[^<>]*>)*$/i;
function Cc(e) {
	return typeof e != "string" || Sc.test(e);
}
function wc(e, t) {
	return Object.keys(t ?? {}).some((n) => {
		let r = n.split(".")[0];
		return !e.texts.includes(r) || Js[r] ? !1 : t[n] === !1 ? qs.includes(r) : !Cc(t[n]);
	});
}
function Tc(e) {
	let t = {};
	for (let n of Object.keys(Js)) Cc(e?.[n]) || (t[n] = e[n]);
	return Object.keys(t).length ? t : void 0;
}
function Ec(e) {
	return Number(e) === 2 ? 2 : 1;
}
//#endregion
//#region ../template/assets/engine/0.7.4/gallery-layout.js
var Dc = [
	"floating",
	"fill",
	"band",
	"mosaic"
], Oc = [
	"rect",
	"square",
	"circle",
	"oval",
	"pill",
	"arch",
	"triangle",
	"diamond",
	"hexagon",
	"octagon",
	"star",
	"heart",
	"blob",
	"leaf",
	"slant"
], kc = [
	"shadow",
	"plain",
	"polaroid",
	"border",
	"thick",
	"dark",
	"double",
	"glow",
	"tape",
	"pin",
	"stamp",
	"film",
	"soft"
], Ac = [
	"natural",
	"mono",
	"sepia",
	"vintage",
	"faded",
	"warm",
	"cool",
	"duotone",
	"punchy",
	"noir",
	"dim",
	"pop"
], jc = [
	"square",
	"circle",
	"triangle",
	"diamond",
	"hexagon",
	"octagon",
	"star",
	"heart"
], Mc = {
	floating: [
		"none",
		"drift",
		"rise",
		"kenburns",
		"crossfade",
		"bounce"
	],
	fill: [
		"none",
		"drift",
		"kenburns"
	],
	mosaic: [
		"none",
		"crossfade",
		"kenburns"
	],
	band: ["none"]
}, Nc = {
	floating: "drift",
	fill: "none",
	mosaic: "crossfade",
	band: "none"
}, Pc = {
	min: 1,
	max: 20,
	dflt: 8
}, Fc = {
	min: 60,
	max: 400
}, Ic = {
	floating: 140,
	band: 156,
	mosaic: 140,
	fill: 0
}, Lc = {
	polaroid: "#ffffff",
	border: "#ffffff",
	thick: "#ffffff",
	double: "#ffffff",
	dark: "#161616",
	glow: "accent"
}, Rc = 1.35, zc = {
	min: 0,
	max: 1,
	dflt: .85
}, Bc = {
	min: 0,
	max: 15,
	dflt: 5
}, Vc = {
	min: 0,
	max: 48,
	dflt: 5
}, Hc = {
	min: .5,
	max: 90,
	dflt: 30
}, Uc = {
	min: .5,
	max: 90,
	dflt: 12
}, Wc = {
	min: 4,
	max: 20,
	dflt: 12
};
function Gc(e) {
	let t = String(e), n = 5381;
	for (let e = 0; e < t.length; e++) n = (n << 5) + n + t.charCodeAt(e) >>> 0;
	return n;
}
function Kc(e, t) {
	let n = Gc(`${e}:${t}`);
	return n ^= n >>> 15, n = Math.imul(n, 739982445) >>> 0, n ^= n >>> 12, n = Math.imul(n, 695872825) >>> 0, n ^= n >>> 15, (n >>> 0) / 4294967296;
}
function qc(e) {
	let t = Math.abs(Math.round(Number(e) || 0)) % 3, n = (e) => `rgba(128,128,128,${e})`, r = [
		64,
		104,
		150
	][t], i = [
		"M0 150 L60 96 L108 150 Z M84 150 L138 108 L180 150 Z",
		"M0 150 L44 110 L92 150 Z M70 150 L128 88 L180 150 Z",
		"M0 150 L72 84 L132 150 Z M110 150 L156 116 L180 150 Z"
	][t], a = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 150"><rect width="180" height="150" fill="${n(.14 + t * .04)}"/><circle cx="${r}" cy="44" r="15" fill="${n(.4)}"/><path d="${i}" fill="${n(.45)}"/></svg>`;
	return `data:image/svg+xml,${encodeURIComponent(a)}`;
}
function Jc(e) {
	return Array.from({ length: Math.max(1, Math.round(Number(e) || 0)) }, (e, t) => ({ src: qc(t) }));
}
var Yc = (e) => Math.round(e * 100) / 100;
function Xc(e, { min: t, max: n, dflt: r }) {
	if (e == null || e === "") return r;
	let i = Number(e);
	return Number.isFinite(i) ? Math.min(n, Math.max(t, i)) : r;
}
function Zc(e) {
	return Dc.includes(e) ? e : "floating";
}
function Qc(e, t) {
	let n = Zc(e);
	return Mc[n].includes(t) ? t : Nc[n];
}
function $c(e) {
	return Mc[Zc(e)];
}
function el({ style: e = "floating", motion: t, reducedMotion: n = !1 } = {}) {
	return n ? !1 : Zc(e) === "band" || Qc(e, t) !== "none";
}
function tl(e, t, n, r = !1) {
	let i = Math.round(Xc(e, Zc(t) === "mosaic" ? Wc : Pc)), a = Number(n);
	return !r && Number.isFinite(a) && a > 0 ? Math.min(i, a) : i;
}
function nl(e, t) {
	let n = Ic[Zc(t)] || Ic.floating;
	return Math.round(Xc(e, {
		...Fc,
		dflt: n
	}));
}
function rl(e) {
	return ol(e) in Lc;
}
function il(e, t) {
	let n = Lc[ol(e)] ?? "";
	return n && typeof t == "string" && t.trim() ? t.trim() : n;
}
function al(e) {
	return Oc.includes(e) ? e : "rect";
}
function ol(e) {
	return kc.includes(e) ? e : "shadow";
}
function sl(e) {
	return Ac.includes(e) ? e : "natural";
}
function cl(e, t) {
	if (ol(t) === "polaroid") return .84;
	let n = al(e);
	return jc.includes(n) ? 1 : n === "arch" ? .8 : Rc;
}
function ll(e) {
	return ["rect", "square"].includes(al(e));
}
function ul(e) {
	return Xc(e, Uc);
}
function dl(e) {
	return Xc(e, zc);
}
function fl(e) {
	return Xc(e, Bc);
}
function pl(e) {
	return Math.round(Xc(e, Vc));
}
function ml(e) {
	return Xc(e, Hc);
}
function hl(e) {
	return Ec(e);
}
function gl(e, t) {
	let n = Number(e);
	return Number.isFinite(n) && n > 0 ? Math.round(n) : Number(t) || 1;
}
function _l(e, { count: t, seed: n, size: r, spread: i, tilt: a, style: o = "floating", repeat: s = !1 } = {}) {
	let c = (Array.isArray(e) ? e : []).filter((e) => e && typeof e.src == "string" && e.src), l = tl(t, o, c.length, s), u = nl(r, o), d = dl(i), f = fl(a), p = n == null || n === "" ? 1 : n, m = Math.ceil(Math.sqrt(l * 1.6)), h = Math.ceil(l / m), g = Array.from({ length: m * h }, (e, t) => t).map((e) => ({
		cell: e,
		at: Kc(p, `cell${e}`)
	})).sort((e, t) => e.at - t.at).map((e) => e.cell), _ = [];
	for (let e = 0; e < l; e++) {
		let t = g[e], n = (t % m + .5) / m + (Kc(p, `x${e}`) - .5) * (.9 / m), r = (Math.floor(t / m) + .5) / h + (Kc(p, `y${e}`) - .5) * (.9 / h);
		_.push({
			src: c.length ? c[e % c.length].src : "",
			index: c.length ? e % c.length : -1,
			x: Yc(50 + (n - .5) * 100 * d),
			y: Yc(50 + (r - .5) * 100 * d),
			w: Math.round(u * (.8 + Kc(p, `w${e}`) * .4)),
			rot: vl(p, e, f),
			phase: Yc(Kc(p, `p${e}`)),
			heading: Yc(Kc(p, `h${e}`))
		});
	}
	return _;
}
function vl(e, t, n) {
	return Yc((Kc(e == null || e === "" ? 1 : e, `r${t}`) - .5) * 2 * fl(n));
}
function yl(e, t) {
	let n = e == null || e === "" ? 1 : e, r = Kc(n, `m${t}`);
	return {
		cols: r < .3 ? 2 : 1,
		rows: r > .7 || r < .1 ? 2 : 1,
		phase: Yc(Kc(n, `mp${t}`))
	};
}
function bl(e, t, n, r = !1) {
	let i = tl(e, "mosaic", n, r);
	return Array.from({ length: i }, (e, n) => yl(t, n));
}
//#endregion
//#region ../template/assets/engine/0.7.4/gallery-model.js
var xl = [
	"grid",
	"carousel",
	"slides",
	"ribbon",
	"mosaic",
	"polaroid"
], Sl = [
	"grid",
	"mosaic",
	"polaroid"
], Cl = {
	min: 80,
	max: 400,
	dflt: 140
}, wl = {
	min: 0,
	max: 15,
	dflt: 4
};
function Tl(e) {
	return xl.includes(e) ? e : "grid";
}
function El(e, t, n) {
	return !Number.isFinite(n) || n < 1 ? 0 : (((Number.isFinite(e) ? e : 0) + t) % n + n) % n;
}
function Dl({ count: e = 0, reducedMotion: t = !1 } = {}) {
	return e >= 2 && !t;
}
function Ol(e, { min: t = 2, fallback: n = 5 } = {}) {
	let r = Number(e);
	return !Number.isFinite(r) || r <= 0 ? n : Math.max(t, r);
}
var kl = /* @__PURE__ */ new Set([
	"audio",
	"calendar",
	"cart",
	"checkout",
	"collection",
	"countdown",
	"faq",
	"form",
	"product",
	"quote",
	"share",
	"stats",
	"table",
	"timeline"
]);
function Al(e) {
	return kl.has(e?.type) && e.height?.mode !== "own";
}
var jl = /* @__PURE__ */ new Set([
	"calendar",
	"collection",
	"product"
]), Ml = /* @__PURE__ */ new Set([
	"countdown",
	"quote",
	"stats"
]), Nl = /* @__PURE__ */ new Set([
	"image",
	"video",
	"shape",
	"icon"
]), Pl = /* @__PURE__ */ new Set([
	"image",
	"video",
	"shape",
	"icon",
	"map"
]), Fl = {
	min: .4,
	max: 2
}, Il = {
	min: 6,
	max: 200,
	minDefault: 12,
	maxDefault: 96
};
function Ll(e) {
	if (!e || Pl.has(e.type)) return 1;
	let t = Number(e.size);
	return !Number.isFinite(t) || t <= 0 ? 1 : Math.round(Math.min(Fl.max, Math.max(Fl.min, t)) * 100) / 100;
}
function Rl(e) {
	let t = (e, t) => {
		let n = Number(e);
		return Number.isFinite(n) && n > 0 ? Math.min(Il.max, Math.max(Il.min, Math.round(n))) : t;
	}, n = t(e?.sizeMin, Il.minDefault);
	return {
		min: n,
		max: Math.max(n, t(e?.sizeMax, Il.maxDefault))
	};
}
function zl(e, t = {}) {
	let n = t.gapMax ?? 70, r = t.gapMin ?? 10, i = e.filter((e) => e && Number.isFinite(e.y) && Number.isFinite(e.h)).map((e) => ({
		...e,
		grow: Math.max(0, Number(e.grow) || 0)
	})).sort((e, t) => e.y - t.y || (e.x ?? 0) - (t.x ?? 0)), a = new Map(i.map((e) => [e.id, 0])), o = -Infinity;
	for (let e of i) {
		let t = a.get(e.id) + e.grow;
		if (o = Math.max(o, e.y + a.get(e.id) + e.h + e.grow), t <= 0) continue;
		let s = e.y + e.h / 2, c = e.y + e.h;
		for (let o of i) {
			if (o === e || o.y < s) continue;
			let i = Math.max(0, o.y - c), l = i <= n ? t : Math.max(0, t - (i - r));
			l > a.get(o.id) && a.set(o.id, l);
		}
	}
	let s = /* @__PURE__ */ new Map();
	for (let [e, t] of a) t > 0 && s.set(e, t);
	return {
		shifts: s,
		bottom: Number.isFinite(o) ? o : 0
	};
}
function Bl(e, t, n) {
	return Vl(e, /* @__PURE__ */ new Map([[t, n]]));
}
function Vl(e, t) {
	let n = [];
	for (let r of e ?? []) {
		let e = r?.frames?.desktop;
		if (!e || !Number.isFinite(e.y) || !Number.isFinite(e.h)) continue;
		let i = t?.get(r.id), a = Number.isFinite(i) ? Math.max(0, i - e.h) : 0;
		n.push({
			id: r.id,
			x: e.x ?? 0,
			y: e.y,
			h: e.h,
			grow: a
		});
	}
	let r = /* @__PURE__ */ new Map();
	if (!n.some((e) => e.grow > 0)) return r;
	let { shifts: i } = zl(n);
	for (let e of n) {
		let t = i.get(e.id) ?? 0;
		t && r.set(e.id, e.y + t);
	}
	return r;
}
//#endregion
//#region ../template/assets/engine/0.7.4/palette-search.js
function Hl(e) {
	return String(e ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}
function Ul(e, t) {
	let n = Hl(t).trim(), r = Hl(e);
	return n ? r.startsWith(n) ? 0 : r.split(/[^a-z0-9]+/).some((e) => e.startsWith(n)) ? 1 : r.includes(n) ? 2 : -1 : 2;
}
function Wl(e, t) {
	let n = Hl(e);
	return Hl(t).split(/\s+/).filter(Boolean).every((e) => n.includes(e));
}
function Gl(e, t, n) {
	return e.map((e, r) => ({
		item: e,
		i: r,
		rank: Ul(n(e), t)
	})).filter((e) => e.rank >= 0).sort((e, t) => e.rank - t.rank || e.i - t.i).map((e) => e.item);
}
//#endregion
//#region src/lib/menu-search.js
function Kl(e, t, n = "", r = /* @__PURE__ */ new Set()) {
	let i = null;
	for (let a of e ?? []) {
		if (a.kind === "rule") {
			i = null;
			continue;
		}
		if (a.kind === "heading") {
			i = a;
			continue;
		}
		let e = i ? `${n} ${i.text}` : n, o = r.size;
		if (a.kind === "group") {
			if (Kl(a.children, t, `${e} ${a.text}`, r), r.size > o) {
				r.add(a);
				for (let e of a.children ?? []) e.kind === "row" && !e.text.trim() && r.add(e);
			}
		} else t(`${e} ${a.text}`) && r.add(a);
		i && r.size > o && r.add(i);
	}
	return r;
}
var ql = "button, select, textarea, svg, [popover], .dd, .gridmenu-value, .menu-group-value", Jl = ".row-tool, .cp-clear, [popover] *";
function Yl(e) {
	let t = [], n = (e) => {
		for (let r of e.childNodes) r.nodeType === 3 ? t.push(r.data) : r.nodeType === 1 && !r.matches(ql) && n(r);
	};
	n(e);
	let r = e.getAttribute("title");
	r && t.push(r);
	for (let n of e.querySelectorAll("[title]")) n.matches(Jl) || t.push(n.getAttribute("title"));
	return t.join(" ").replace(/\s+/g, " ").trim();
}
function Xl(e, t = "") {
	let n = [];
	for (let r of e.children) if (!(t && r.matches(t))) {
		if (r.tagName === "DETAILS") {
			let e = r.querySelector(":scope > summary"), t = r.querySelector(":scope > .group-items") ?? r;
			n.push({
				kind: "group",
				el: r,
				text: e ? Yl(e) : "",
				children: Xl(t, "summary")
			});
		} else r.tagName === "HR" ? n.push({
			kind: "rule",
			el: r,
			text: ""
		}) : r.matches(".panel-strong, .mini-label") ? n.push({
			kind: "heading",
			el: r,
			text: Yl(r)
		}) : n.push({
			kind: "row",
			el: r,
			text: Yl(r)
		});
	}
	return n;
}
function Zl(e, t) {
	for (let n of e.children) {
		let e = Xl(n, ".emenu-title, .emenu-none"), r = Kl(e, t), i = (e) => {
			for (let t of e) t.el.classList.toggle("menu-miss", !r.has(t)), t.kind === "group" && (r.has(t) && (t.el.open = !0), i(t.children));
		};
		i(e), n.classList.toggle("menu-empty", !e.some((e) => r.has(e)));
	}
}
function Ql(e, t) {
	return (n) => {
		let r = () => Zl(n, (n) => t(n, e));
		r();
		let i = new MutationObserver(r);
		return i.observe(n, {
			childList: !0,
			subtree: !0,
			characterData: !0
		}), () => i.disconnect();
	};
}
//#endregion
//#region src/menu/MenuGroup.svelte
var $l = /* @__PURE__ */ B("<i class=\"menu-group-dot\" aria-hidden=\"true\"></i>"), eu = /* @__PURE__ */ B("<button type=\"button\" class=\"linkish menu-group-reset\"> </button>"), tu = /* @__PURE__ */ B("<details class=\"group menu-group\"><summary><!><span class=\"menu-group-title\"> </span><span class=\"menu-group-value\"> </span></summary> <div class=\"group-items\"><!> <!></div></details>");
function nu(e, t) {
	$e(t, !0);
	let n = qi(t, "reset", 3, null);
	var r = tu(), i = N(r), a = N(i), o = (e) => {
		V(e, $l());
	};
	U(a, (e) => {
		n() && e(o);
	});
	var s = I(a), c = F(s, !0), l = F(I(s), !0);
	D(i);
	var u = I(i, 2), d = N(u);
	ci(d, () => t.children);
	var f = I(d, 2), p = (e) => {
		var t = eu(), r = F(t, !0);
		L((e) => H(r, e), [() => J("menu.reset")]), z("click", t, function(...e) {
			n()?.apply(this, e);
		}), V(e, t);
	};
	U(f, (e) => {
		n() && e(p);
	}), D(u), D(r), L((e) => {
		r.open = e, H(c, t.title), H(l, t.value);
	}, [() => vs.has(t.id)]), jr("toggle", r, (e) => {
		e.currentTarget.closest(".emenu-search") || (e.currentTarget.open ? vs.add(t.id) : vs.delete(t.id));
	}), V(e, r), et();
}
Mr(["click"]);
//#endregion
//#region src/menu/Placement.svelte
var ru = /* @__PURE__ */ B("<div class=\"frame-grid\"><label> <input type=\"number\"/></label> <label> <input type=\"number\"/></label></div>"), iu = /* @__PURE__ */ B("<div class=\"ctl-row\"><span class=\"mini-label\"> </span> <input type=\"range\" step=\"5\"/> <span class=\"gridmenu-value\"> </span> <!></div> <!>", 1), au = /* @__PURE__ */ B("<div class=\"ctl-row\"><span class=\"mini-label\"> </span> <input type=\"range\" min=\"1\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div>"), ou = /* @__PURE__ */ B("<div class=\"pin-line\"><label> <!></label> <!></div> <!>", 1), su = /* @__PURE__ */ B("<label> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\"/></label> <label> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\"/></label>", 1), cu = /* @__PURE__ */ B("<label> <!></label> <!> <label> <!></label>", 1), lu = /* @__PURE__ */ B("<label> <input type=\"number\" min=\"0\" max=\"400\"/></label>"), uu = /* @__PURE__ */ B("<label> <!></label>"), du = /* @__PURE__ */ B("<label> <!></label> <!> <!>", 1), fu = /* @__PURE__ */ B("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!>", 1), pu = /* @__PURE__ */ B("<div class=\"frame-grid\"><label> <input type=\"number\" step=\"0.5\"/></label> <label> <input type=\"number\" step=\"1\"/></label> <label> <input type=\"number\" step=\"0.5\" min=\"1\"/></label> <label> <input type=\"number\" step=\"1\" min=\"1\"/></label> <label> <input type=\"number\" step=\"1\"/></label> <label> <input type=\"number\" step=\"1\"/></label></div>"), mu = /* @__PURE__ */ B("<!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), hu = /* @__PURE__ */ B("<label> <!></label> <!>", 1), gu = /* @__PURE__ */ B("<!> <!> <!> <div class=\"pin-line\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div> <!> <!> <!>", 1);
function _u(e, t) {
	$e(t, !0);
	let n = (e) => {
		var t = iu(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2);
		G(a);
		var o = I(a, 2), l = F(o);
		Ws(I(o, 2), { id: "size" }), D(n);
		var u = I(n, 2), d = (e) => {
			var t = ru(), n = N(t), r = N(n, !0), i = I(r);
			G(i), D(n);
			var a = I(n, 2), o = N(a, !0), s = I(o);
			G(s), D(a), D(t), L((e, t, c, l, u, d) => {
				q(n, "title", e), H(r, t), q(i, "min", Il.min), q(i, "max", Il.max), K(i, c), q(a, "title", l), H(o, u), q(s, "min", Il.min), q(s, "max", Il.max), K(s, d);
			}, [
				() => J("tip.scaleMin"),
				() => J("lbl.scaleMin"),
				() => Rl(R(c)).min,
				() => J("tip.scaleMax"),
				() => J("lbl.scaleMax"),
				() => Rl(R(c)).max
			]), z("change", i, (e) => g("sizeMin", e.target.value)), z("change", s, (e) => g("sizeMax", e.target.value)), V(e, t);
		}, f = /* @__PURE__ */ A(() => Ll(R(c)) !== 1);
		U(u, (e) => {
			R(f) && e(d);
		}), L((e, t, r, o, s) => {
			q(n, "title", e), H(i, t), q(a, "min", Fl.min * 100), q(a, "max", Fl.max * 100), K(a, r), q(a, "aria-label", o), H(l, `${s ?? ""} %`);
		}, [
			() => J("tip.scale"),
			() => J("lbl.scale"),
			() => Math.round(Ll(R(c)) * 100),
			() => J("lbl.scale"),
			() => Math.round(Ll(R(c)) * 100)
		]), z("input", a, (e) => h(e.target.valueAsNumber / 100)), z("change", a, function(...e) {
			s.endSizeGesture?.apply(this, e);
		}), V(e, t);
	}, r = (e) => {
		var t = ou(), n = P(t), r = N(n), i = N(r), a = I(i);
		{
			let e = /* @__PURE__ */ A(() => R(c).fit ?? "wrap"), t = /* @__PURE__ */ A(() => Nl.has(R(c).type) ? [["wrap", J("opt.fit.fluid")], ["shrink", J("opt.fit.floor")]] : [
				["wrap", J("opt.fit.wrap")],
				...ne() || R(c).fit === "shrink" ? [["shrink", J("opt.fit.shrink")]] : [],
				["both", J("opt.fit.both")]
			]);
			Y(a, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => p(e)
			});
		}
		D(r), Ws(I(r, 2), { id: "fit" }), D(n);
		var o = I(n, 2), s = (e) => {
			var t = au(), n = N(t), r = F(n, !0), i = I(n, 2);
			G(i);
			var a = F(I(i, 2));
			D(t), L((e, n, o, s) => {
				q(t, "title", e), H(r, n), K(i, o), H(a, `${s ?? ""} %`);
			}, [
				() => J("tip.fitMin"),
				() => J("lbl.fitMin"),
				() => Math.round((R(c).fitMin ?? .6) * 100),
				() => Math.round((R(c).fitMin ?? .6) * 100)
			]), z("input", i, (e) => m(e.target.valueAsNumber / 100)), V(e, t);
		};
		U(o, (e) => {
			R(c).fit && e(s);
		}), L((e, t) => {
			q(r, "title", e), H(i, `${t ?? ""} `);
		}, [() => J("tip.fit"), () => J("lbl.fit")]), V(e, t);
	}, i = (e) => {
		var t = cu(), n = P(t), r = N(n), i = I(r);
		{
			let e = /* @__PURE__ */ A(() => T(R(c).animation) ? R(c).animation.type : ""), t = /* @__PURE__ */ A(ee);
			Y(i, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => S(e || null)
			});
		}
		D(n);
		var a = I(n, 2), o = (e) => {
			var t = su(), n = P(t), r = N(n), i = I(r);
			G(i), D(n);
			var a = I(n, 2), o = N(a), s = I(o);
			G(s), D(a), L((e, t) => {
				H(r, `${e ?? ""} `), K(i, R(c).animation.props.duration), H(o, `${t ?? ""} `), K(s, R(c).animation.props.delay);
			}, [() => J("lbl.durationMs"), () => J("lbl.delayMs")]), z("change", i, (e) => w("duration", Number(e.target.value))), z("change", s, (e) => w("delay", Number(e.target.value))), V(e, t);
		}, s = /* @__PURE__ */ A(() => T(R(c).animation));
		U(a, (e) => {
			R(s) && e(o);
		});
		var l = I(a, 2), u = N(l), d = I(u);
		{
			let e = /* @__PURE__ */ A(() => R(c).hover?.type ?? (R(c).animation && !T(R(c).animation) ? R(c).animation.type : "")), t = /* @__PURE__ */ A(te);
			Y(d, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => C(e || null)
			});
		}
		D(l), L((e, t, i, a) => {
			q(n, "title", e), H(r, `${t ?? ""} `), q(l, "title", i), H(u, `${a ?? ""} `);
		}, [
			() => J("tip.props.blockAnim"),
			() => J("lbl.animIn"),
			() => J("tip.props.blockHover"),
			() => J("lbl.onHover")
		]), V(e, t);
	}, a = (e) => {
		var t = Vr(), n = P(t), r = (e) => {
			var t = fu(), n = P(t), r = N(n);
			G(r);
			var i = I(r);
			D(n);
			var a = I(n, 2), o = (e) => {
				var t = du(), n = P(t), r = N(n), i = I(r);
				{
					let e = /* @__PURE__ */ A(() => R(c).sticky.mode ?? "scroll"), t = /* @__PURE__ */ A(() => [["scroll", J("opt.sticky.modeScroll")], ["screen", J("opt.sticky.modeScreen")]]);
					Y(i, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => d(`edit:${R(c).blockId}`, (t) => {
							t.sticky = {
								...t.sticky,
								mode: e
							};
						})
					});
				}
				D(n);
				var a = I(n, 2), o = (e) => {
					var t = lu(), n = N(t), r = I(n);
					G(r), D(t), L((e, i) => {
						q(t, "title", e), H(n, `${i ?? ""} `), K(r, R(c).sticky.offset ?? 16);
					}, [() => R(c).sticky.mode === "screen" ? J("tip.stickyEdge") : J("tip.stickyOffset"), () => R(c).sticky.mode === "screen" ? J("lbl.stickyEdge") : J("lbl.stickyOffset")]), z("change", r, (e) => d(`edit:${R(c).blockId}`, (t) => {
						t.sticky = {
							...t.sticky,
							offset: Math.max(0, Number(e.target.value) || 0)
						};
					})), V(e, t);
				};
				U(a, (e) => {
					(R(c).sticky.mode !== "screen" || (R(c).sticky.dock ?? "bottom-right") !== "middle-center") && e(o);
				});
				var s = I(a, 2), l = (e) => {
					var t = uu(), n = N(t), r = I(n);
					{
						let e = /* @__PURE__ */ A(() => R(c).sticky.dock ?? "bottom-right"), t = /* @__PURE__ */ A(() => Fs.map(([e, t]) => [e, J(t)]));
						Y(r, {
							get value() {
								return R(e);
							},
							get options() {
								return R(t);
							},
							onchange: (e) => d(`edit:${R(c).blockId}`, (t) => {
								t.sticky = {
									...t.sticky,
									dock: e
								};
							})
						});
					}
					D(t), L((e, r) => {
						q(t, "title", e), H(n, `${r ?? ""} `);
					}, [() => J("tip.stickyDock"), () => J("lbl.stickyDock")]), V(e, t);
				}, u = (e) => {
					var t = uu(), n = N(t), r = I(n);
					{
						let e = /* @__PURE__ */ A(() => R(c).sticky.until ?? ""), t = /* @__PURE__ */ A(E);
						Y(r, {
							get value() {
								return R(e);
							},
							get options() {
								return R(t);
							},
							onchange: (e) => d(`edit:${R(c).blockId}`, (t) => {
								t.sticky = {
									...t.sticky,
									until: e || null
								};
							})
						});
					}
					D(t), L((e, r) => {
						q(t, "title", e), H(n, `${r ?? ""} `);
					}, [() => J("tip.stickyUntil"), () => J("lbl.stickyUntil")]), V(e, t);
				};
				U(s, (e) => {
					R(c).sticky.mode === "screen" ? e(l) : e(u, -1);
				}), L((e, t) => {
					q(n, "title", e), H(r, `${t ?? ""} `);
				}, [() => J("tip.stickyMode"), () => J("lbl.stickyMode")]), V(e, t);
			};
			U(a, (e) => {
				R(c).sticky && e(o);
			}), L((e, t, a) => {
				q(n, "title", e), Ni(r, t), H(i, ` ${a ?? ""}`);
			}, [
				() => J("tip.sticky"),
				() => !!R(c).sticky,
				() => J("lbl.sticky")
			]), z("change", r, (e) => d(`edit:${R(c).blockId}`, (t) => {
				t.sticky = e.target.checked ? {
					offset: 16,
					until: null
				} : null;
			})), V(e, t);
		};
		U(n, (e) => {
			R(l) === "desktop" && e(r);
		}), V(e, t);
	}, o = (e) => {
		var t = mu(), n = P(t), r = (e) => {
			var t = pu(), n = N(t), r = N(n, !0), i = I(r);
			G(i), D(n);
			var a = I(n, 2), o = N(a, !0), s = I(o);
			G(s), D(a);
			var l = I(a, 2), u = N(l, !0), d = I(u);
			G(d), D(l);
			var p = I(l, 2), m = N(p, !0), h = I(m);
			G(h), D(p);
			var g = I(p, 2), _ = N(g, !0), v = I(_);
			G(v), D(g);
			var y = I(g, 2), b = N(y, !0), x = I(b);
			G(x), D(y), D(t), L((e, t, n, a, l, f, p) => {
				H(r, e), K(i, R(c).frame.x), H(o, t), K(s, R(c).frame.y), H(u, n), K(d, R(c).frame.w), H(m, a), K(h, R(c).frame.h), q(g, "title", l), H(_, f), K(v, R(c).frame.z ?? 1), H(b, p), K(x, R(c).frame.rot ?? 0);
			}, [
				() => J("frame.x"),
				() => J("frame.y"),
				() => J("frame.w"),
				() => J("frame.h"),
				() => J("tip.frameZ"),
				() => J("frame.z"),
				() => J("frame.rot")
			]), z("change", i, (e) => f("x", Number(e.target.value))), z("change", s, (e) => f("y", Number(e.target.value))), z("change", d, (e) => f("w", Number(e.target.value))), z("change", h, (e) => f("h", Number(e.target.value))), z("change", v, (e) => f("z", Number(e.target.value))), z("change", x, (e) => f("rot", Number(e.target.value))), V(e, t);
		};
		U(n, (e) => {
			R(l) === "desktop" && e(r);
		});
		var i = I(n, 2), a = N(i);
		G(a);
		var o = I(a);
		D(i), L((e, t) => {
			q(i, "title", e), Ni(a, R(c).decor), H(o, ` ${t ?? ""}`);
		}, [() => J("tip.decor"), () => J("lbl.decor")]), z("change", a, (e) => x(e.target.checked)), V(e, t);
	}, s = Ze("urd-editor"), c = /* @__PURE__ */ A(() => s.selectedBlock), l = /* @__PURE__ */ A(() => s.viewMode), u = /* @__PURE__ */ A(() => s.sections), { mutateBlock: d, setBlockFrame: f, setBlockFit: p, setBlockFitMin: m, setBlockSize: h, setBlockSizeBound: g, setBlockHeightMode: _, setBlockHeightAlign: v, canStretch: y, setBlockHideMobile: b, setBlockDecor: x, setBlockAnimation: S, setBlockHover: C, setBlockAnimProp: w, isEntrance: T, blockEntranceOptions: ee, hoverOptions: te, designWidth: ne } = s;
	function re() {
		let e = T(R(c).animation) ? R(c).animation.type : R(c).hover?.type, t = e ? [...ee(), ...te()].find(([t]) => t === e) : null;
		return t ? t[1] : J("common.none");
	}
	function E() {
		let e = R(u).findIndex((e) => e.id === R(c)?.sectionId);
		return e < 0 ? [["", J("opt.sticky.ownSection")]] : [["", J("opt.sticky.ownSection")], ...R(u).slice(e + 1).map((t, n) => [t.id, J("opt.sticky.atSection", { n: e + 2 + n })])];
	}
	var ie = gu(), ae = P(ie), oe = (e) => {
		var t = hu(), n = P(t), r = N(n), i = I(r);
		{
			let e = /* @__PURE__ */ A(() => R(c).height?.mode === "own" ? "own" : "content"), t = /* @__PURE__ */ A(() => [["content", J("opt.height.content")], ["own", J("opt.height.own")]]);
			Y(i, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => _(e)
			});
		}
		D(n);
		var a = I(n, 2), o = (e) => {
			let t = /* @__PURE__ */ A(() => [
				"middle",
				"bottom",
				"stretch"
			].includes(R(c).height.align) ? R(c).height.align : "top");
			var n = uu(), r = N(n), i = I(r);
			{
				let e = /* @__PURE__ */ A(() => [
					["top", J("opt.heightAlign.top")],
					["middle", J("opt.heightAlign.middle")],
					["bottom", J("opt.heightAlign.bottom")],
					...y() || R(t) === "stretch" ? [["stretch", J("opt.heightAlign.stretch")]] : []
				]);
				Y(i, {
					get value() {
						return R(t);
					},
					get options() {
						return R(e);
					},
					onchange: (e) => v(e)
				});
			}
			D(n), L((e, t) => {
				q(n, "title", e), H(r, `${t ?? ""} `);
			}, [() => J("tip.heightAlign"), () => J("lbl.heightAlign")]), V(e, n);
		};
		U(a, (e) => {
			R(c).height?.mode === "own" && e(o);
		}), L((e, t) => {
			q(n, "title", e), H(r, `${t ?? ""} `);
		}, [() => J("tip.height"), () => J("lbl.height")]), V(e, t);
	}, se = /* @__PURE__ */ A(() => kl.has(R(c).type));
	U(ae, (e) => {
		R(se) && e(oe);
	});
	var ce = I(ae, 2), le = (e) => {
		n(e);
	}, ue = /* @__PURE__ */ A(() => !Pl.has(R(c).type));
	U(ce, (e) => {
		R(ue) && e(le);
	});
	var de = I(ce, 2);
	r(de);
	var fe = I(de, 2), pe = N(fe), me = N(pe);
	G(me);
	var he = I(me);
	D(pe), Ws(I(pe, 2), { id: "phone" }), D(fe);
	var ge = I(fe, 2);
	a(ge);
	var _e = I(ge, 2);
	{
		let e = /* @__PURE__ */ A(() => J("group.motion")), t = /* @__PURE__ */ A(re);
		nu(_e, {
			id: "motion",
			get title() {
				return R(e);
			},
			get value() {
				return R(t);
			},
			children: (e, t) => {
				i(e);
			},
			$$slots: { default: !0 }
		});
	}
	var ve = I(_e, 2);
	{
		let e = /* @__PURE__ */ A(() => J("group.placement")), t = /* @__PURE__ */ A(() => R(l) === "desktop" ? `${R(c).frame.w} % × ${R(c).frame.h}` : "");
		nu(ve, {
			id: "frame",
			get title() {
				return R(e);
			},
			get value() {
				return R(t);
			},
			children: (e, t) => {
				o(e);
			},
			$$slots: { default: !0 }
		});
	}
	L((e, t) => {
		q(pe, "title", e), Ni(me, R(c).hideMobile), H(he, ` ${t ?? ""}`);
	}, [() => J("tip.hideMobile"), () => J("lbl.hideMobile")]), z("change", me, (e) => b(e.target.checked)), V(e, ie), et();
}
Mr(["input", "change"]);
//#endregion
//#region src/menu/BoxStyle.svelte
var vu = /* @__PURE__ */ B("<label> <!></label>"), yu = /* @__PURE__ */ B("<label> <!></label> <label> <span class=\"num-stepper\"><button type=\"button\">−</button> <input type=\"number\" min=\"1\" max=\"12\" step=\"1\"/> <button type=\"button\">+</button></span></label>", 1), bu = /* @__PURE__ */ B("<label> <!></label> <label> <!></label> <!> <label> <!></label> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1);
function xu(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), { setBoxStyle: i, themeSwatches: a } = n, o = /* @__PURE__ */ A(() => R(r).props.boxStyle ?? {});
	var s = bu(), c = P(s), l = N(c), u = I(l);
	{
		let e = /* @__PURE__ */ A(() => R(o).bg ?? ""), t = /* @__PURE__ */ A(a), n = /* @__PURE__ */ A(() => J("tip.box.bg"));
		Pa(u, {
			get value() {
				return R(e);
			},
			get tokens() {
				return R(t);
			},
			allowClear: !0,
			get label() {
				return R(n);
			},
			onchange: (e) => i({ bg: e || null })
		});
	}
	D(c);
	var d = I(c, 2), f = N(d), p = I(f);
	{
		let e = /* @__PURE__ */ A(() => R(o).shadow ?? ""), t = /* @__PURE__ */ A(() => [
			["", J("common.none")],
			["soft", J("opt.shadow.soft")],
			["strong", J("opt.shadow.strong")]
		]);
		Y(p, {
			get value() {
				return R(e);
			},
			get options() {
				return R(t);
			},
			onchange: (e) => i({ shadow: e || null })
		});
	}
	D(d);
	var m = I(d, 2), h = (e) => {
		var t = vu(), n = N(t), r = I(n);
		{
			let e = /* @__PURE__ */ A(() => R(o).shadowColor ?? ""), t = /* @__PURE__ */ A(a), n = /* @__PURE__ */ A(() => J("tip.box.shadowColor"));
			Pa(r, {
				get value() {
					return R(e);
				},
				get tokens() {
					return R(t);
				},
				allowClear: !0,
				get label() {
					return R(n);
				},
				onchange: (e) => i({ shadowColor: e || null })
			});
		}
		D(t), L((e) => H(n, `${e ?? ""} `), [() => J("lbl.shadowColor")]), V(e, t);
	};
	U(m, (e) => {
		R(o).shadow && e(h);
	});
	var g = I(m, 2), _ = N(g), v = I(_);
	{
		let e = /* @__PURE__ */ A(() => R(o).border === "none" ? "none" : R(o).border ? "custom" : ""), t = /* @__PURE__ */ A(() => [
			["", J("opt.border.theme")],
			["none", J("common.none")],
			["custom", J("opt.border.custom")]
		]);
		Y(v, {
			get value() {
				return R(e);
			},
			get options() {
				return R(t);
			},
			onchange: (e) => i({ border: e === "custom" ? {
				color: "accent",
				width: 1
			} : e || null })
		});
	}
	D(g);
	var y = I(g, 2), b = (e) => {
		let t = /* @__PURE__ */ A(() => typeof R(o).border == "object" ? R(o).border : {
			color: "text",
			width: 1
		});
		var n = yu(), r = P(n), s = N(r), c = I(s);
		{
			let e = /* @__PURE__ */ A(a), n = /* @__PURE__ */ A(() => J("tip.box.borderColor"));
			Pa(c, {
				get value() {
					return R(t).color;
				},
				get tokens() {
					return R(e);
				},
				get label() {
					return R(n);
				},
				onchange: (e) => i({ border: {
					...R(t),
					color: e
				} })
			});
		}
		D(r);
		var l = I(r, 2), u = N(l), d = I(u), f = N(d), p = I(f, 2);
		G(p);
		var m = I(p, 2);
		D(d), D(l), L((e, n, r, i, a, o) => {
			H(s, `${e ?? ""} `), H(u, `${n ?? ""} `), q(f, "title", r), q(f, "aria-label", i), K(p, R(t).width), q(m, "title", a), q(m, "aria-label", o);
		}, [
			() => J("lbl.borderColor"),
			() => J("lbl.thicknessPx"),
			() => J("tip.thinner"),
			() => J("tip.thinner"),
			() => J("tip.thicker"),
			() => J("tip.thicker")
		]), z("click", f, () => i({ border: {
			...R(t),
			width: Math.max(1, R(t).width - 1)
		} })), z("change", p, (e) => i({ border: {
			...R(t),
			width: Math.min(12, Math.max(1, Number(e.target.value) || 1))
		} })), z("click", m, () => i({ border: {
			...R(t),
			width: Math.min(12, R(t).width + 1)
		} })), V(e, n);
	};
	U(y, (e) => {
		R(o).border !== "none" && e(b);
	});
	var x = I(y, 2), S = N(x);
	G(S);
	var C = I(S);
	D(x), L((e, t, n, r, i, a) => {
		H(l, `${e ?? ""} `), H(f, `${t ?? ""} `), H(_, `${n ?? ""} `), q(x, "title", r), Ni(S, i), H(C, ` ${a ?? ""}`);
	}, [
		() => J("lbl.blockColor"),
		() => J("lbl.shadow"),
		() => J("lbl.border"),
		() => J("tip.box.glass"),
		() => !!R(o).glass,
		() => J("lbl.glass")
	]), z("change", S, (e) => i({ glass: e.target.checked || null })), V(e, s), et();
}
Mr(["click", "change"]);
//#endregion
//#region src/menu/groups.js
function Su(e, t) {
	let n = (t) => Object.entries(t).filter(([t, n]) => e()[t] !== void 0 && JSON.stringify(e()[t]) !== JSON.stringify(n));
	return {
		groupReset: (e, r) => n(r).length ? () => t(e, { ...r }) : null,
		groupChanged: (e) => n(e).length
	};
}
//#endregion
//#region src/menu/families/Text.svelte
var Cu = /* @__PURE__ */ B("<p class=\"panel-hint\"> </p>"), wu = /* @__PURE__ */ B("<div class=\"pin-line\"><label> <!></label> <!></div>"), Tu = /* @__PURE__ */ B("<div class=\"pin-line\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div> <!>", 1), Eu = /* @__PURE__ */ B("<!> <!>", 1);
function Du(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), { setBlockProp: i, setBlockProps: a } = n, { groupReset: o, groupChanged: s } = Su(() => R(r).props, a);
	var c = Vr(), l = P(c), u = (e) => {
		var t = Cu(), n = F(t, !0);
		L((e) => H(n, e), [() => J("hint.textInline")]), V(e, t);
	}, d = (e) => {
		let t = (e) => {
			var t = wu(), n = N(t), a = N(n), o = I(a);
			{
				let e = /* @__PURE__ */ A(() => R(r).props.align ?? "left"), t = /* @__PURE__ */ A(() => [
					["left", J("common.left")],
					["center", J("common.center")],
					["right", J("common.right")]
				]);
				Y(o, {
					get value() {
						return R(e);
					},
					get options() {
						return R(t);
					},
					onchange: (e) => i("align", e)
				});
			}
			D(n), Ws(I(n, 2), { id: "align" }), D(t), L((e) => H(a, `${e ?? ""} `), [() => J("lbl.align")]), V(e, t);
		}, n = (e) => {
			var t = Tu(), n = P(t), a = N(n), o = N(a);
			G(o);
			var s = I(o);
			D(a), Ws(I(a, 2), { id: "textBox" }), D(n);
			var c = I(n, 2), l = (e) => {
				xu(e, {});
			};
			U(c, (e) => {
				R(r).props.box && e(l);
			}), L((e, t) => {
				Ni(o, e), H(s, ` ${t ?? ""}`);
			}, [() => !!R(r).props.box, () => J("lbl.textBoxToggle")]), z("change", o, (e) => i("box", e.target.checked)), V(e, t);
		};
		var a = Eu(), s = P(a);
		{
			let e = /* @__PURE__ */ A(() => J("lbl.align")), n = /* @__PURE__ */ A(() => ({
				left: J("common.left"),
				center: J("common.center"),
				right: J("common.right")
			})[R(r).props.align ?? "left"]), i = /* @__PURE__ */ A(() => o("text-align", { align: "left" }));
			nu(s, {
				id: "text-align",
				get title() {
					return R(e);
				},
				get value() {
					return R(n);
				},
				get reset() {
					return R(i);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var c = I(s, 2);
		{
			let e = /* @__PURE__ */ A(() => J("group.textBox")), t = /* @__PURE__ */ A(() => R(r).props.box ? J("common.on") : J("common.off")), i = /* @__PURE__ */ A(() => o("text-box", {
				box: !1,
				boxStyle: null
			}));
			nu(c, {
				id: "text-box",
				get title() {
					return R(e);
				},
				get value() {
					return R(t);
				},
				get reset() {
					return R(i);
				},
				children: (e, t) => {
					n(e);
				},
				$$slots: { default: !0 }
			});
		}
		V(e, a);
	};
	U(l, (e) => {
		t.area === "content" ? e(u) : t.area === "style" && e(d, 1);
	}), V(e, c), et();
}
Mr(["change"]);
//#endregion
//#region src/menu/families/Button.svelte
var Ou = /* @__PURE__ */ B("<input/>"), ku = /* @__PURE__ */ B("<label> <input/></label> <div class=\"pin-line\"><label> <!></label> <!></div> <!>", 1), Au = /* @__PURE__ */ B("<div class=\"pin-line\"><label> <!></label> <!></div>");
function ju(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), { setBlockProp: i, setBlockProps: a, buttonTargets: o, setButtonTarget: s } = n, { groupReset: c, groupChanged: l } = Su(() => R(r).props, a);
	var u = Vr(), d = P(u), f = (e) => {
		let t = (e) => {
			var t = ku(), n = P(t), a = N(n), c = I(a);
			G(c), D(n);
			var l = I(n, 2), u = N(l), d = N(u), f = I(d);
			{
				let e = /* @__PURE__ */ A(() => R(r).props.page ?? "__href"), t = /* @__PURE__ */ A(o);
				Y(f, {
					get value() {
						return R(e);
					},
					get options() {
						return R(t);
					},
					get onchange() {
						return s;
					}
				});
			}
			D(u), Ws(I(u, 2), { id: "goesTo" }), D(l);
			var p = I(l, 2), m = (e) => {
				var t = Ou();
				G(t), L((e) => {
					q(t, "placeholder", e), K(t, R(r).props.href === "#" ? "" : R(r).props.href ?? "");
				}, [() => J("ph.url")]), z("change", t, (e) => i("href", e.target.value || null)), V(e, t);
			};
			U(p, (e) => {
				R(r).props.page || e(m);
			}), L((e, t) => {
				H(a, `${e ?? ""} `), K(c, R(r).props.label), H(d, `${t ?? ""} `);
			}, [() => J("blocks.text"), () => J("lbl.goesTo")]), z("change", c, (e) => i("label", e.target.value)), V(e, t);
		};
		{
			let n = /* @__PURE__ */ A(() => J("group.textLink")), i = /* @__PURE__ */ A(() => o().find(([e]) => e === (R(r).props.page ?? "__href"))?.[1] ?? "");
			nu(e, {
				id: "btn-link",
				get title() {
					return R(n);
				},
				get value() {
					return R(i);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	}, p = (e) => {
		let t = (e) => {
			var t = Au(), n = N(t), a = N(n), o = I(a);
			{
				let e = /* @__PURE__ */ A(() => [["primary", J("opt.btn.primary")], ["secondary", J("opt.btn.secondary")]]);
				Y(o, {
					get value() {
						return R(r).props.style;
					},
					get options() {
						return R(e);
					},
					onchange: (e) => i("style", e)
				});
			}
			D(n), Ws(I(n, 2), { id: "btnStyle" }), D(t), L((e) => H(a, `${e ?? ""} `), [() => J("lbl.style")]), V(e, t);
		};
		{
			let n = /* @__PURE__ */ A(() => J("group.appearance")), i = /* @__PURE__ */ A(() => R(r).props.style === "secondary" ? J("opt.btn.secondary") : J("opt.btn.primary")), a = /* @__PURE__ */ A(() => c("btn-look", { style: "primary" }));
			nu(e, {
				id: "btn-look",
				get title() {
					return R(n);
				},
				get value() {
					return R(i);
				},
				get reset() {
					return R(a);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	};
	U(d, (e) => {
		t.area === "content" ? e(f) : t.area === "style" && e(p, 1);
	}), V(e, u), et();
}
Mr(["change"]);
//#endregion
//#region src/menu/families/Image.svelte
var Mu = /* @__PURE__ */ B("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <label> <input/></label>", 1), Nu = /* @__PURE__ */ B("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), Pu = /* @__PURE__ */ B("<label> <input/></label> <!>", 1), Fu = /* @__PURE__ */ B("<!> <!>", 1), Iu = /* @__PURE__ */ B("<div class=\"pin-line\"><label> <!></label> <!></div> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.01\"/> <button type=\"button\" class=\"linkish\"> </button>", 1), Lu = /* @__PURE__ */ B("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.01\"/>", 1), Ru = /* @__PURE__ */ B("<div class=\"pin-line\"><label> <!></label> <!></div>"), zu = /* @__PURE__ */ B("<!> <!> <!>", 1);
function Bu(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, setBlockProps: o, openImageEditor: s, compressOrTrim: c, imageErrorText: l, setStatus: u } = n, { groupReset: d, groupChanged: f } = Su(() => R(r).props, o);
	async function p(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await c(t);
			i(`edit:${R(r).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || no(t.name).replaceAll("-", " ");
			});
		} catch (e) {
			u(l(e), "error");
		}
	}
	var m = Vr(), h = P(m), g = (e) => {
		let t = (e) => {
			var t = Mu(), n = P(t), i = N(n), o = I(i);
			D(n);
			var s = I(n, 2), c = N(s), l = I(c);
			G(l), D(s), L((e, t, n) => {
				H(i, `${e ?? ""} `), H(c, `${t ?? ""} `), K(l, R(r).props.alt ?? ""), q(l, "placeholder", n);
			}, [
				() => J("ui.changeImage"),
				() => J("lbl.description"),
				() => J("ph.altText")
			]), z("change", o, p), z("change", l, (e) => a("alt", e.target.value)), V(e, t);
		}, n = (e) => {
			var t = Pu(), n = P(t), i = N(n), o = I(i);
			G(o), D(n);
			var s = I(n, 2), c = (e) => {
				var t = Nu(), n = N(t);
				G(n);
				var i = I(n);
				D(t), L((e, r, a) => {
					q(t, "title", e), Ni(n, r), H(i, ` ${a ?? ""}`);
				}, [
					() => J("tip.lightbox"),
					() => !!R(r).props.lightbox,
					() => J("lbl.lightbox")
				]), z("change", n, (e) => a("lightbox", e.target.checked)), V(e, t);
			};
			U(s, (e) => {
				R(r).props.href || e(c);
			}), L((e, t) => {
				H(i, `${e ?? ""} `), K(o, R(r).props.href ?? ""), q(o, "placeholder", t);
			}, [() => J("lbl.link"), () => J("ph.optionalImageLink")]), z("change", o, (e) => a("href", e.target.value || null)), V(e, t);
		};
		var i = Fu(), o = P(i);
		{
			let e = /* @__PURE__ */ A(() => J("blocks.image")), n = /* @__PURE__ */ A(() => R(r).props.alt || J("menu.noAlt"));
			nu(o, {
				id: "img-image",
				get title() {
					return R(e);
				},
				get value() {
					return R(n);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var s = I(o, 2);
		{
			let e = /* @__PURE__ */ A(() => J("group.linkClick")), t = /* @__PURE__ */ A(() => R(r).props.href || (R(r).props.lightbox ? J("menu.lightboxShort") : J("common.none"))), i = /* @__PURE__ */ A(() => d("img-link", {
				href: null,
				lightbox: !1
			}));
			nu(s, {
				id: "img-link",
				get title() {
					return R(e);
				},
				get value() {
					return R(t);
				},
				get reset() {
					return R(i);
				},
				children: (e, t) => {
					n(e);
				},
				$$slots: { default: !0 }
			});
		}
		V(e, i);
	}, _ = (e) => {
		let t = (e) => {
			var t = Iu(), n = P(t), i = N(n), o = N(i), c = I(o);
			{
				let e = /* @__PURE__ */ A(() => R(r).props.fit ?? "cover"), t = /* @__PURE__ */ A(() => [["cover", J("opt.fitFrame.cover")], ["contain", J("opt.fitFrame.contain")]]);
				Y(c, {
					get value() {
						return R(e);
					},
					get options() {
						return R(t);
					},
					onchange: (e) => a("fit", e)
				});
			}
			D(i), Ws(I(i, 2), { id: "imgFit" }), D(n);
			var l = I(n, 2), u = N(l), d = F(I(u));
			D(l);
			var f = I(l, 2);
			G(f);
			var p = I(f, 2), m = N(p), h = F(I(m));
			D(p);
			var g = I(p, 2);
			G(g);
			var _ = I(g, 2), v = N(_), y = F(I(v));
			D(_);
			var b = I(_, 2);
			G(b);
			var x = I(b, 2), S = F(x, !0);
			L((e, t, n, i, a, s, c, l, p) => {
				H(o, `${e ?? ""} `), H(u, `${t ?? ""} `), H(d, `${n ?? ""}%`), K(f, R(r).props.x ?? .5), H(m, `${i ?? ""} `), H(h, `${a ?? ""}%`), K(g, R(r).props.y ?? .5), q(_, "title", s), H(v, `${c ?? ""} `), H(y, `${l ?? ""}x`), K(b, R(r).props.zoom ?? 1), H(S, p);
			}, [
				() => J("lbl.imageFit"),
				() => J("lbl.focusX"),
				() => Math.round((R(r).props.x ?? .5) * 100),
				() => J("lbl.focusY"),
				() => Math.round((R(r).props.y ?? .5) * 100),
				() => J("tip.zoomCrop"),
				() => J("lbl.zoom"),
				() => (R(r).props.zoom ?? 1).toFixed(2),
				() => J("ui.openImageEditor")
			]), z("input", f, (e) => a("x", Number(e.target.value))), z("input", g, (e) => a("y", Number(e.target.value))), z("input", b, (e) => a("zoom", Number(e.target.value))), z("click", x, s), V(e, t);
		}, n = (e) => {
			var t = Lu(), n = P(t), i = N(n), o = F(I(i));
			D(n);
			var s = I(n, 2);
			G(s);
			var c = I(s, 2), l = N(c), u = F(I(l));
			D(c);
			var d = I(c, 2);
			G(d);
			var f = I(d, 2), p = N(f), m = F(I(p));
			D(f);
			var h = I(f, 2);
			G(h), L((e, t, n, a, c, f) => {
				H(i, `${e ?? ""} `), H(o, `${t ?? ""}%`), K(s, R(r).props.brightness ?? 1), H(l, `${n ?? ""} `), H(u, `${a ?? ""}%`), K(d, R(r).props.contrast ?? 1), H(p, `${c ?? ""} `), H(m, `${f ?? ""}%`), K(h, R(r).props.saturate ?? 1);
			}, [
				() => J("lbl.brightness"),
				() => Math.round((R(r).props.brightness ?? 1) * 100),
				() => J("lbl.contrast"),
				() => Math.round((R(r).props.contrast ?? 1) * 100),
				() => J("lbl.saturate"),
				() => Math.round((R(r).props.saturate ?? 1) * 100)
			]), z("input", s, (e) => a("brightness", Number(e.target.value))), z("input", d, (e) => a("contrast", Number(e.target.value))), z("input", h, (e) => a("saturate", Number(e.target.value))), V(e, t);
		}, i = (e) => {
			var t = Ru(), n = N(t), i = N(n), o = I(i);
			{
				let e = /* @__PURE__ */ A(() => R(r).props.radius ?? ""), t = /* @__PURE__ */ A(() => [
					["", J("common.none")],
					["sm", J("opt.size.sm")],
					["md", J("opt.radius.md")]
				]);
				Y(o, {
					get value() {
						return R(e);
					},
					get options() {
						return R(t);
					},
					onchange: (e) => a("radius", e || null)
				});
			}
			D(n), Ws(I(n, 2), { id: "radius" }), D(t), L((e) => H(i, `${e ?? ""} `), [() => J("lbl.radius")]), V(e, t);
		}, o = /* @__PURE__ */ A(() => f({
			fit: "cover",
			x: .5,
			y: .5,
			zoom: 1
		})), c = /* @__PURE__ */ A(() => f({
			brightness: 1,
			contrast: 1,
			saturate: 1
		}));
		var l = zu(), u = P(l);
		{
			let e = /* @__PURE__ */ A(() => J("group.crop")), n = /* @__PURE__ */ A(() => R(o) ? J("menu.changed", { n: R(o) }) : J("menu.standard")), r = /* @__PURE__ */ A(() => d("img-crop", {
				fit: "cover",
				x: .5,
				y: .5,
				zoom: 1
			}));
			nu(u, {
				id: "img-crop",
				get title() {
					return R(e);
				},
				get value() {
					return R(n);
				},
				get reset() {
					return R(r);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var p = I(u, 2);
		{
			let e = /* @__PURE__ */ A(() => J("group.filters")), t = /* @__PURE__ */ A(() => R(c) ? J("menu.changed", { n: R(c) }) : J("menu.standard")), r = /* @__PURE__ */ A(() => d("img-filters", {
				brightness: 1,
				contrast: 1,
				saturate: 1
			}));
			nu(p, {
				id: "img-filters",
				get title() {
					return R(e);
				},
				get value() {
					return R(t);
				},
				get reset() {
					return R(r);
				},
				children: (e, t) => {
					n(e);
				},
				$$slots: { default: !0 }
			});
		}
		var m = I(p, 2);
		{
			let e = /* @__PURE__ */ A(() => J("group.corners")), t = /* @__PURE__ */ A(() => ({
				"": J("common.none"),
				sm: J("opt.size.sm"),
				md: J("opt.radius.md")
			})[R(r).props.radius ?? ""]), n = /* @__PURE__ */ A(() => d("img-corners", { radius: "md" }));
			nu(m, {
				id: "img-corners",
				get title() {
					return R(e);
				},
				get value() {
					return R(t);
				},
				get reset() {
					return R(n);
				},
				children: (e, t) => {
					i(e);
				},
				$$slots: { default: !0 }
			});
		}
		V(e, l);
	};
	U(h, (e) => {
		t.area === "content" ? e(g) : t.area === "style" && e(_, 1);
	}), V(e, m), et();
}
Mr([
	"change",
	"input",
	"click"
]);
//#endregion
//#region src/lib/Choice.svelte
var Vu = /* @__PURE__ */ B("<button type=\"button\"> </button>"), Hu = /* @__PURE__ */ B("<div><span class=\"choice-label svelte-1ehof1c\"> </span> <div class=\"choice-seg svelte-1ehof1c\" role=\"group\"></div></div>");
function Uu(e, t) {
	$e(t, !0);
	let n = qi(t, "title", 3, void 0), r = /* @__PURE__ */ A(() => t.options.length > 3 || t.options.reduce((e, [, t]) => e + `${t}`.length, 0) > 14), i = (e) => `${e ?? ""}`;
	var a = Hu();
	let o;
	var s = N(a), c = F(s, !0), l = I(s, 2);
	ni(l, 21, () => t.options, ([e, t]) => i(e), (e, n) => {
		var r = /* @__PURE__ */ A(() => h(R(n), 2));
		let a = () => R(r)[0], o = () => R(r)[1];
		var s = Vu();
		let c;
		var l = F(s, !0);
		L((e, t) => {
			q(s, "aria-pressed", e), c = Ei(s, 1, "svelte-1ehof1c", null, c, { on: t }), H(l, o());
		}, [() => i(a()) === i(t.value), () => i(a()) === i(t.value)]), z("click", s, () => t.onchange(a())), V(e, s);
	}), D(l), D(a), L(() => {
		o = Ei(a, 1, "choice svelte-1ehof1c", null, o, { stacked: R(r) }), q(a, "title", n()), H(c, t.label), q(l, "aria-label", t.label);
	}), V(e, a), et();
}
Mr(["click"]);
//#endregion
//#region src/menu/families/Video.svelte
var Wu = /* @__PURE__ */ B("<label> </label> <input/>", 1), Gu = /* @__PURE__ */ B("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"video/mp4,video/webm\"/></label> <label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label>", 1), Ku = /* @__PURE__ */ B("<div class=\"pin-line\"><!> <!></div> <!>", 1), qu = /* @__PURE__ */ B("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), Ju = /* @__PURE__ */ B("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!>", 1), Yu = /* @__PURE__ */ B("<label> <input/></label>"), Xu = /* @__PURE__ */ B("<!> <!> <!>", 1);
function Zu(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), { setBlockProp: i, setBlockProps: a, setBlockVideoFile: o, setBlockVideoPoster: s } = n, { groupReset: c, groupChanged: l } = Su(() => R(r).props, a);
	var u = Vr(), d = P(u), f = (e) => {
		let t = (e) => {
			var t = Ku(), n = P(t), a = N(n);
			{
				let e = /* @__PURE__ */ A(() => J("lbl.videoSource")), t = /* @__PURE__ */ A(() => [["embed", J("opt.videoSource.embed")], ["file", J("opt.videoSource.file")]]);
				Uu(a, {
					get label() {
						return R(e);
					},
					get value() {
						return R(u);
					},
					get options() {
						return R(t);
					},
					onchange: (e) => i("source", e)
				});
			}
			Ws(I(a, 2), { id: "videoSource" }), D(n);
			var c = I(n, 2), l = (e) => {
				var t = Wu(), n = P(t), a = F(n, !0), o = I(n, 2);
				G(o), L((e, t, i) => {
					q(n, "title", e), H(a, t), K(o, R(r).props.url ?? ""), q(o, "placeholder", i);
				}, [
					() => J("hint.video"),
					() => J("lbl.videoUrl"),
					() => J("ph.videoUrl")
				]), z("change", o, (e) => i("url", e.target.value)), V(e, t);
			}, d = (e) => {
				var t = Gu(), n = P(t), i = N(n), a = I(i);
				D(n);
				var c = I(n, 2), l = N(c), u = I(l);
				D(c), L((e, t, r, a) => {
					q(n, "title", e), H(i, `${t ?? ""} `), q(c, "title", r), H(l, `${a ?? ""} `);
				}, [
					() => J("tip.video.file"),
					() => R(r).props.src ? J("ui.changeVideo") : J("ui.chooseVideo"),
					() => J("tip.bg.poster"),
					() => R(r).props.poster ? J("ui.changeImage") : J("ui.choosePoster")
				]), z("change", a, o), z("change", u, s), V(e, t);
			};
			U(c, (e) => {
				R(u) === "embed" ? e(l) : e(d, -1);
			}), V(e, t);
		}, n = (e) => {
			var t = Ju(), n = P(t), o = N(n);
			G(o);
			var s = I(o);
			D(n);
			var c = I(n, 2), l = N(c);
			G(l);
			var u = I(l);
			D(c);
			var d = I(c, 2), f = (e) => {
				var t = qu(), n = N(t);
				G(n);
				var a = I(n);
				D(t), L((e, i) => {
					q(t, "title", e), Ni(n, R(r).props.autoplay === !0), H(a, ` ${i ?? ""}`);
				}, [() => J("tip.video.autoplay"), () => J("lbl.videoAutoplay")]), z("change", n, (e) => i("autoplay", e.target.checked)), V(e, t);
			};
			U(d, (e) => {
				R(r).props.muted === !0 && e(f);
			}), L((e, t) => {
				Ni(o, R(r).props.loop === !0), H(s, ` ${e ?? ""}`), Ni(l, R(r).props.muted === !0), H(u, ` ${t ?? ""}`);
			}, [() => J("lbl.videoLoop"), () => J("lbl.videoMuted")]), z("change", o, (e) => i("loop", e.target.checked)), z("change", l, (e) => a("muted", e.target.checked ? { muted: !0 } : {
				muted: !1,
				autoplay: !1
			})), V(e, t);
		}, l = (e) => {
			var t = Yu(), n = N(t), a = I(n);
			G(a), D(t), L((e) => {
				H(n, `${e ?? ""} `), K(a, R(r).props.title ?? "");
			}, [() => J("lbl.videoTitle")]), z("change", a, (e) => i("title", e.target.value)), V(e, t);
		}, u = /* @__PURE__ */ A(() => R(r).props.source === "file" ? "file" : "embed");
		var d = Xu(), f = P(d);
		{
			let e = /* @__PURE__ */ A(() => J("lbl.videoSource")), n = /* @__PURE__ */ A(() => R(u) === "file" ? J("opt.videoSource.file") : J("opt.videoSource.embed"));
			nu(f, {
				id: "video-source",
				get title() {
					return R(e);
				},
				get value() {
					return R(n);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var p = I(f, 2), m = (e) => {
			let t = /* @__PURE__ */ A(() => [
				R(r).props.loop === !0,
				R(r).props.muted === !0,
				R(r).props.autoplay === !0
			].filter(Boolean).length);
			{
				let r = /* @__PURE__ */ A(() => J("group.playback")), i = /* @__PURE__ */ A(() => R(t) ? J("menu.onCount", { n: R(t) }) : J("common.off")), a = /* @__PURE__ */ A(() => c("video-play", {
					loop: !1,
					muted: !1,
					autoplay: !1
				}));
				nu(e, {
					id: "video-play",
					get title() {
						return R(r);
					},
					get value() {
						return R(i);
					},
					get reset() {
						return R(a);
					},
					children: (e, t) => {
						n(e);
					},
					$$slots: { default: !0 }
				});
			}
		};
		U(p, (e) => {
			R(u) === "file" && e(m);
		});
		var h = I(p, 2);
		{
			let e = /* @__PURE__ */ A(() => J("group.accessibility")), t = /* @__PURE__ */ A(() => R(r).props.title || J("menu.noTitle"));
			nu(h, {
				id: "video-a11y",
				get title() {
					return R(e);
				},
				get value() {
					return R(t);
				},
				children: (e, t) => {
					l(e);
				},
				$$slots: { default: !0 }
			});
		}
		V(e, d);
	};
	U(d, (e) => {
		t.area === "content" && e(f);
	}), V(e, u), et();
}
Mr(["change"]);
//#endregion
//#region src/menu/families/Icon.svelte
var Qu = /* @__PURE__ */ B("<input class=\"token-input\" maxlength=\"4\"/>"), $u = /* @__PURE__ */ B("<button class=\"ghost\"> </button>"), ed = /* @__PURE__ */ B("<span class=\"toolbar-row\"><img class=\"site-icon-preview\"/> <button class=\"ghost\"> </button></span>"), td = /* @__PURE__ */ B("<label> <span class=\"toolbar-row\"><!> <!></span></label> <!>", 1), nd = /* @__PURE__ */ B("<div class=\"pin-line\"><label> <input type=\"number\" min=\"8\" max=\"400\"/></label> <!></div> <div class=\"pin-line\"><label> <!></label> <!></div>", 1);
function rd(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, setBlockProps: o, themeSwatches: s } = n, { groupReset: c, groupChanged: l } = Su(() => R(r).props, o);
	var u = Vr(), d = P(u), f = (e) => {
		let t = (e) => {
			var t = td(), n = P(t), o = N(n), s = I(o), c = N(s);
			{
				let e = /* @__PURE__ */ A(() => R(r).props.glyph ?? "★"), t = /* @__PURE__ */ A(() => R(r).props.icon ?? null), n = /* @__PURE__ */ A(() => R(r).props.image ?? null);
				Mo(c, {
					get value() {
						return R(e);
					},
					get icon() {
						return R(t);
					},
					get image() {
						return R(n);
					},
					onpick: (e) => i(`edit:${R(r).blockId}`, (t) => {
						t.props.glyph = e, t.props.icon = null, t.props.image = null;
					}),
					onicon: (e) => i(`edit:${R(r).blockId}`, (t) => {
						t.props.icon = e, t.props.image = null;
					}),
					onimage: (e) => a("image", e)
				});
			}
			var l = I(c, 2), u = (e) => {
				var t = Qu();
				G(t), L((e) => {
					K(t, R(r).props.glyph ?? ""), q(t, "title", e);
				}, [() => J("tip.icon.typeGlyph")]), z("change", t, (e) => a("glyph", e.target.value || "★")), V(e, t);
			}, d = (e) => {
				var t = $u(), n = F(t, !0);
				L((e, r) => {
					q(t, "title", e), H(n, r);
				}, [() => J("tip.icon.backToGlyph"), () => J("ui.removeDrawnIcon")]), z("click", t, () => a("icon", null)), V(e, t);
			};
			U(l, (e) => {
				R(r).props.icon ? e(d, -1) : e(u);
			}), D(s), D(n);
			var f = I(n, 2), p = (e) => {
				var t = ed(), n = N(t), i = I(n, 2), o = F(i, !0);
				D(t), L((e, i, a) => {
					q(t, "title", e), q(n, "src", R(r).props.image), q(n, "alt", i), H(o, a);
				}, [
					() => J("hint.icon.ownImage"),
					() => J("gp.ownIcon"),
					() => J("ui.removeOwnIcon")
				]), z("click", i, () => a("image", null)), V(e, t);
			};
			U(f, (e) => {
				R(r).props.image && e(p);
			}), L((e) => H(o, `${e ?? ""} `), [() => J("blocks.icon")]), V(e, t);
		};
		{
			let n = /* @__PURE__ */ A(() => J("blocks.icon")), i = /* @__PURE__ */ A(() => R(r).props.image ? J("gp.ownIcon") : R(r).props.icon ? J("menu.drawnIcon") : R(r).props.glyph ?? "★");
			nu(e, {
				id: "icon-icon",
				get title() {
					return R(n);
				},
				get value() {
					return R(i);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	}, p = (e) => {
		let t = (e) => {
			var t = nd(), n = P(t), i = N(n), o = N(i), c = I(o);
			G(c), D(i), Ws(I(i, 2), { id: "iconSize" }), D(n);
			var l = I(n, 2), u = N(l), d = N(u), f = I(d);
			{
				let e = /* @__PURE__ */ A(() => R(r).props.color ?? "accent"), t = /* @__PURE__ */ A(s);
				Pa(f, {
					get value() {
						return R(e);
					},
					get tokens() {
						return R(t);
					},
					onchange: (e) => a("color", e)
				});
			}
			D(u), Ws(I(u, 2), { id: "iconColor" }), D(l), L((e, t, n) => {
				H(o, `${e ?? ""} `), K(c, R(r).props.size ?? 48), q(u, "title", t), H(d, `${n ?? ""} `);
			}, [
				() => J("lbl.sizePx"),
				() => J("hint.icon.color"),
				() => J("lbl.color")
			]), z("change", c, (e) => a("size", Number(e.target.value))), V(e, t);
		};
		{
			let n = /* @__PURE__ */ A(() => J("group.appearance")), i = /* @__PURE__ */ A(() => `${R(r).props.size ?? 48} px`), a = /* @__PURE__ */ A(() => c("icon-look", {
				size: 48,
				color: "accent"
			}));
			nu(e, {
				id: "icon-look",
				get title() {
					return R(n);
				},
				get value() {
					return R(i);
				},
				get reset() {
					return R(a);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	};
	U(d, (e) => {
		t.area === "content" ? e(f) : t.area === "style" && e(p, 1);
	}), V(e, u), et();
}
Mr(["change", "click"]);
//#endregion
//#region src/menu/families/Shape.svelte
var id = /* @__PURE__ */ B("<label> <input/></label>"), ad = /* @__PURE__ */ B("<label> <!></label> <!>", 1), od = /* @__PURE__ */ B("<div class=\"pin-line\"><label> <!></label> <!></div> <div class=\"pin-line\"><label> <input type=\"number\" min=\"1\" max=\"40\"/></label> <!></div> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), sd = /* @__PURE__ */ B("<label> <input type=\"number\" min=\"4\" step=\"1\"/></label>"), cd = /* @__PURE__ */ B("<label> <input type=\"number\" min=\"1\" step=\"0.5\"/></label>"), ld = /* @__PURE__ */ B("<!> <!>", 1);
function ud(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), { setBlockProp: i, setBlockProps: a, setBlockFrame: o, designWidth: s, shapePx: c, setShapeSizePx: l } = n, { groupReset: u, groupChanged: d } = Su(() => R(r).props, a);
	var f = Vr(), p = P(f), m = (e) => {
		let t = (e) => {
			var t = ad(), n = P(t), a = N(n), o = I(a);
			{
				let e = /* @__PURE__ */ A(Ns);
				Y(o, {
					get value() {
						return R(r).props.kind;
					},
					get options() {
						return R(e);
					},
					onchange: (e) => i("kind", e)
				});
			}
			D(n);
			var s = I(n, 2), c = (e) => {
				var t = id(), n = N(t), a = I(n);
				G(a), D(t), L((e, i) => {
					q(t, "title", e), H(n, `${i ?? ""} `), K(a, R(r).props.label ?? "");
				}, [() => J("tip.shape.label"), () => J("lbl.shapeLabel")]), z("change", a, (e) => i("label", e.target.value.trim() || void 0)), V(e, t);
			};
			U(s, (e) => {
				R(r).props.kind === "line" && e(c);
			}), L((e) => H(a, `${e ?? ""} `), [() => J("blocks.shape")]), V(e, t);
		};
		{
			let n = /* @__PURE__ */ A(() => J("blocks.shape")), i = /* @__PURE__ */ A(() => Ns().find(([e]) => e === R(r).props.kind)?.[1] ?? "");
			nu(e, {
				id: "shape-shape",
				get title() {
					return R(n);
				},
				get value() {
					return R(i);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	}, h = (e) => {
		let t = (e) => {
			var t = od(), n = P(t), a = N(n), o = N(a), s = I(o);
			{
				let e = /* @__PURE__ */ A(Ps);
				Y(s, {
					get value() {
						return R(r).props.color;
					},
					get options() {
						return R(e);
					},
					onchange: (e) => i("color", e)
				});
			}
			D(a), Ws(I(a, 2), { id: "shapeColor" }), D(n);
			var c = I(n, 2), l = N(c), u = N(l), d = I(u);
			G(d), D(l), Ws(I(l, 2), { id: "thickness" }), D(c);
			var f = I(c, 2), p = N(f);
			G(p);
			var m = I(p);
			D(f), L((e, t, n, i, a) => {
				H(o, `${e ?? ""} `), H(u, `${t ?? ""} `), K(d, R(r).props.thickness), q(f, "title", n), Ni(p, i), H(m, ` ${a ?? ""}`);
			}, [
				() => J("lbl.color"),
				() => J("lbl.thickness"),
				() => J("tip.shape.fill"),
				() => !!R(r).props.fill,
				() => J("lbl.filled")
			]), z("change", d, (e) => i("thickness", Number(e.target.value))), z("change", p, (e) => i("fill", e.target.checked ? R(r).props.color : null)), V(e, t);
		}, n = (e) => {
			var t = Vr(), n = P(t), i = (e) => {
				var t = sd(), n = N(t), i = I(n);
				G(i), D(t), L((e, r, a, o) => {
					q(t, "title", e), H(n, `${r ?? ""} `), q(i, "max", a), K(i, o);
				}, [
					() => J("tip.shapeSize"),
					() => J("lbl.length"),
					() => c(100 - R(r).frame.x),
					() => c(R(r).frame.w)
				]), z("change", i, (e) => l(Number(e.target.value), !1)), V(e, t);
			}, a = /* @__PURE__ */ A(() => (R(r).props.kind === "line" || R(r).props.kind === "arrow") && s()), u = (e) => {
				var t = cd(), n = N(t), i = I(n);
				G(i), D(t), L((e, t) => {
					H(n, `${e ?? ""} `), q(i, "max", t), K(i, R(r).frame.w);
				}, [() => J("lbl.length"), () => Math.max(1, Math.round(100 - R(r).frame.x))]), z("change", i, (e) => o("w", Math.max(1, Math.min(Number(e.target.value), 100 - R(r).frame.x)))), V(e, t);
			}, d = (e) => {
				var t = sd(), n = N(t), i = I(n);
				G(i), D(t), L((e, r, a, o) => {
					q(t, "title", e), H(n, `${r ?? ""} `), q(i, "max", a), K(i, o);
				}, [
					() => J("tip.shapeSize"),
					() => J("lbl.sizePx"),
					() => c(100 - R(r).frame.x),
					() => c(R(r).frame.w)
				]), z("change", i, (e) => l(Number(e.target.value), !0)), V(e, t);
			};
			U(n, (e) => {
				R(a) ? e(i) : R(r).props.kind === "line" || R(r).props.kind === "arrow" ? e(u, 1) : e(d, -1);
			}), V(e, t);
		}, a = /* @__PURE__ */ A(() => R(r).props.kind === "line" || R(r).props.kind === "arrow");
		var d = ld(), f = P(d);
		{
			let e = /* @__PURE__ */ A(() => J("group.strokeFill")), n = /* @__PURE__ */ A(() => `${Ps().find(([e]) => e === R(r).props.color)?.[1] ?? ""} · ${R(r).props.thickness ?? 2} px`), i = /* @__PURE__ */ A(() => u("shape-stroke", {
				color: "accent",
				thickness: 2,
				fill: null
			}));
			nu(f, {
				id: "shape-stroke",
				get title() {
					return R(e);
				},
				get value() {
					return R(n);
				},
				get reset() {
					return R(i);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var p = I(f, 2), m = (e) => {
			{
				let t = /* @__PURE__ */ A(() => J("group.measures")), i = /* @__PURE__ */ A(() => s() ? `${c(R(r).frame.w)} px` : `${R(r).frame.w} %`);
				nu(e, {
					id: "shape-size",
					get title() {
						return R(t);
					},
					get value() {
						return R(i);
					},
					children: (e, t) => {
						n(e);
					},
					$$slots: { default: !0 }
				});
			}
		}, h = /* @__PURE__ */ A(() => R(a) || s());
		U(p, (e) => {
			R(h) && e(m);
		}), V(e, d);
	};
	U(p, (e) => {
		t.area === "content" ? e(m) : t.area === "style" && e(h, 1);
	}), V(e, f), et();
}
Mr(["change"]);
//#endregion
//#region src/menu/families/Gallery.svelte
var dd = /* @__PURE__ */ B("<div class=\"bg-layer\"><span class=\"toolbar-row\"><img class=\"site-icon-preview\" alt=\"\"/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span> <label> <input/></label> <label> <input/></label></div>"), fd = /* @__PURE__ */ B("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\" multiple=\"\"/></label> <!>", 1), pd = /* @__PURE__ */ B("<div class=\"pin-line\"><label> <input type=\"number\" min=\"1\" max=\"6\"/></label> <!></div> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\"/>", 1), md = /* @__PURE__ */ B("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" step=\"10\"/> <span class=\"gridmenu-value\"> </span></div> <button type=\"button\" class=\"ghost action\"><!> </button>", 1), hd = /* @__PURE__ */ B("<button type=\"button\" class=\"ghost action\"><!> </button>"), gd = /* @__PURE__ */ B("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div> <!> <label> <!></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), _d = /* @__PURE__ */ B("<label> <input type=\"number\" min=\"2\" max=\"60\"/></label>"), vd = /* @__PURE__ */ B("<div class=\"pin-line\"><label> <!></label> <!></div> <!> <!> <!> <!> <!>", 1), yd = /* @__PURE__ */ B("<!> <!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"10\" max=\"300\" step=\"5\"/> <span class=\"gridmenu-value\"> </span></div> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"60\" max=\"800\" step=\"10\"/> <span class=\"gridmenu-value\"> </span></div> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\"/> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), bd = /* @__PURE__ */ B("<label> <!></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), xd = /* @__PURE__ */ B("<!> <!> <!>", 1);
function Sd(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), { setBlockProp: i, setBlockProps: a, setBlockFrame: o, addGalleryImages: s, moveGalleryImage: c, removeGalleryImage: l, setGalleryImageField: u, themeSwatches: d, newSeed: f } = n, { groupReset: p, groupChanged: m } = Su(() => R(r).props, a);
	var h = Vr(), g = P(h), _ = (e) => {
		let t = (e) => {
			var t = fd(), n = P(t), i = N(n), a = I(i);
			D(n), ni(I(n, 2), 17, () => R(r).props.images ?? [], Qr, (e, t, n) => {
				var i = dd(), a = N(i), o = N(a), s = I(o, 2), d = N(s);
				d.disabled = n === 0, W(d, () => X.up, !0), D(d);
				var f = I(d, 2);
				W(f, () => X.down, !0), D(f);
				var p = I(f, 2);
				W(p, () => X.cross, !0), D(p), D(s), D(a);
				var m = I(a, 2), h = N(m), g = I(h);
				G(g), D(m);
				var _ = I(m, 2), v = N(_), y = I(v);
				G(y), D(_), D(i), L((e, i, s, c, l, u) => {
					q(a, "title", e), q(o, "src", R(t).src), f.disabled = n === R(r).props.images.length - 1, q(p, "title", i), H(h, `${s ?? ""} `), K(g, R(t).alt ?? ""), q(g, "placeholder", c), H(v, `${l ?? ""} `), K(y, R(t).href ?? ""), q(y, "placeholder", u);
				}, [
					() => J("hint.gallery"),
					() => J("tip.removeImage"),
					() => J("lbl.description"),
					() => J("ph.altShort"),
					() => J("lbl.link"),
					() => J("ph.galleryHref")
				]), z("click", d, () => c(n, -1)), z("click", f, () => c(n, 1)), z("click", p, () => l(n)), z("change", g, (e) => u(n, "alt", e.target.value)), z("change", y, (e) => u(n, "href", e.target.value || null)), V(e, i);
			}), L((e, t) => {
				q(n, "title", e), H(i, `${t ?? ""} `);
			}, [() => J("tip.gallery.addImages"), () => J("ui.addImages")]), z("change", a, s), V(e, t);
		};
		{
			let n = /* @__PURE__ */ A(() => J("group.images")), i = /* @__PURE__ */ A(() => J("menu.imageCount", { n: R(r).props.images?.length ?? 0 }));
			nu(e, {
				id: "gallery-images",
				get title() {
					return R(n);
				},
				get value() {
					return R(i);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	}, v = (e) => {
		let t = (e) => {
			var t = vd(), n = P(t), a = N(n), o = N(a), c = I(o);
			{
				let e = /* @__PURE__ */ A(() => xl.map((e) => [e, J(`opt.galleryView.${e}`)]));
				Y(c, {
					get value() {
						return R(s);
					},
					get options() {
						return R(e);
					},
					onchange: (e) => i("view", e)
				});
			}
			D(a), Ws(I(a, 2), { id: "galleryView" }), D(n);
			var l = I(n, 2), u = (e) => {
				{
					let t = /* @__PURE__ */ A(() => J("lbl.ribbonWidth")), n = /* @__PURE__ */ A(() => Ts(R(r).props.width)), a = /* @__PURE__ */ A(ws);
					Uu(e, {
						get label() {
							return R(t);
						},
						get value() {
							return R(n);
						},
						get options() {
							return R(a);
						},
						onchange: (e) => i("width", e)
					});
				}
			};
			U(l, (e) => {
				R(s) === "ribbon" && e(u);
			});
			var p = I(l, 2), m = (e) => {
				var t = pd(), n = P(t), a = N(n), o = N(a), s = I(o);
				G(s), D(a), Ws(I(a, 2), { id: "columns" }), D(n);
				var c = I(n, 2), l = N(c), u = F(I(l));
				D(c);
				var d = I(c, 2);
				G(d), L((e, t) => {
					H(o, `${e ?? ""} `), K(s, R(r).props.columns ?? 3), H(l, `${t ?? ""} `), H(u, `${R(r).props.gap ?? 12 ?? ""} px`), K(d, R(r).props.gap ?? 12);
				}, [() => J("lbl.columns"), () => J("lbl.imageGap")]), z("change", s, (e) => i("columns", Number(e.target.value))), z("input", d, (e) => i("gap", Number(e.target.value))), V(e, t);
			}, h = /* @__PURE__ */ A(() => Sl.includes(R(s)));
			U(p, (e) => {
				R(h) && e(m);
			});
			var g = I(p, 2), _ = (e) => {
				var t = md(), n = P(t), a = N(n), o = F(a, !0), s = I(a, 2);
				G(s);
				var c = F(I(s, 2));
				D(n);
				var l = I(n, 2), u = N(l);
				W(u, () => X.shuffle);
				var d = I(u);
				D(l), L((e, t, i, a) => {
					q(n, "title", e), H(o, t), q(s, "min", Cl.min), q(s, "max", Cl.max), K(s, R(r).props.rowHeight ?? Cl.dflt), H(c, `${R(r).props.rowHeight ?? Cl.dflt ?? ""} px`), q(l, "title", i), H(d, ` ${a ?? ""}`);
				}, [
					() => J("tip.gallery.rowHeight"),
					() => J("lbl.galleryRowHeight"),
					() => J("tip.gallery.shuffleMosaic"),
					() => J("ui.shufflePhotos")
				]), z("input", s, (e) => i("rowHeight", e.target.valueAsNumber)), z("click", l, () => i("seed", f())), V(e, t);
			};
			U(g, (e) => {
				R(s) === "mosaic" && e(_);
			});
			var v = I(g, 2), y = (e) => {
				var t = gd(), n = P(t), a = N(n), o = F(a, !0), s = I(a, 2);
				G(s);
				var c = F(I(s, 2));
				D(n);
				var l = I(n, 2), u = (e) => {
					var t = hd(), n = N(t);
					W(n, () => X.shuffle);
					var r = I(n);
					D(t), L((e, n) => {
						q(t, "title", e), H(r, ` ${n ?? ""}`);
					}, [() => J("tip.gallery.shuffleTilt"), () => J("ui.shufflePhotos")]), z("click", t, () => i("seed", f())), V(e, t);
				};
				U(l, (e) => {
					(R(r).props.tilt ?? wl.dflt) > 0 && e(u);
				});
				var p = I(l, 2), m = N(p), h = I(m);
				{
					let e = /* @__PURE__ */ A(() => R(r).props.frameColor || "#ffffff"), t = /* @__PURE__ */ A(d), n = /* @__PURE__ */ A(() => J("tip.gallery.frameColor"));
					Pa(h, {
						get value() {
							return R(e);
						},
						get tokens() {
							return R(t);
						},
						allowClear: !0,
						get label() {
							return R(n);
						},
						onchange: (e) => i("frameColor", e ?? "")
					});
				}
				D(p);
				var g = I(p, 2), _ = N(g);
				G(_);
				var v = I(_);
				D(g), L((e, t, i, a, l, u) => {
					q(n, "title", e), H(o, t), q(s, "min", wl.min), q(s, "max", wl.max), K(s, R(r).props.tilt ?? wl.dflt), H(c, `${R(r).props.tilt ?? wl.dflt ?? ""}°`), q(p, "title", i), H(m, `${a ?? ""} `), q(g, "title", l), Ni(_, R(r).props.captions === !0), H(v, ` ${u ?? ""}`);
				}, [
					() => J("tip.gallery.tilt"),
					() => J("lbl.polaroidTilt"),
					() => J("tip.gallery.frameColor"),
					() => J("lbl.frameColor"),
					() => J("tip.gallery.captions"),
					() => J("lbl.galleryCaptions")
				]), z("input", s, (e) => i("tilt", e.target.valueAsNumber)), z("change", _, (e) => i("captions", e.target.checked)), V(e, t);
			};
			U(v, (e) => {
				R(s) === "polaroid" && e(y);
			});
			var b = I(v, 2), x = (e) => {
				var t = _d(), n = N(t), a = I(n);
				G(a), D(t), L((e) => {
					H(n, `${e ?? ""} `), K(a, R(r).props.interval ?? 5);
				}, [() => J("lbl.secondsPerImage")]), z("change", a, (e) => i("interval", Number(e.target.value))), V(e, t);
			};
			U(b, (e) => {
				R(s) === "slides" && e(x);
			}), L((e) => H(o, `${e ?? ""} `), [() => J("lbl.view")]), V(e, t);
		}, n = (e) => {
			var t = yd(), n = P(t);
			{
				let e = /* @__PURE__ */ A(() => J("lbl.ribbonRows")), t = /* @__PURE__ */ A(() => String(R(r).props.rows ?? 1)), a = /* @__PURE__ */ A(() => [["1", J("opt.ribbonRows.one")], ["2", J("opt.ribbonRows.two")]]);
				Uu(n, {
					get label() {
						return R(e);
					},
					get value() {
						return R(t);
					},
					get options() {
						return R(a);
					},
					onchange: (e) => i("rows", Number(e))
				});
			}
			var a = I(n, 2);
			{
				let e = /* @__PURE__ */ A(() => J("lbl.ribbonDirection")), t = /* @__PURE__ */ A(() => R(r).props.direction ?? "left"), n = /* @__PURE__ */ A(() => [["left", J("opt.ribbonDir.left")], ["right", J("opt.ribbonDir.right")]]);
				Uu(a, {
					get label() {
						return R(e);
					},
					get value() {
						return R(t);
					},
					get options() {
						return R(n);
					},
					onchange: (e) => i("direction", e)
				});
			}
			var s = I(a, 2), c = N(s), l = F(c, !0), u = I(c, 2);
			G(u);
			var d = F(I(u, 2), !0);
			D(s);
			var f = I(s, 2), p = N(f), m = F(p, !0), h = I(p, 2);
			G(h);
			var g = F(I(h, 2));
			D(f);
			var _ = I(f, 2), v = N(_), y = F(I(v));
			D(_);
			var b = I(_, 2);
			G(b);
			var x = I(b, 2), S = N(x);
			G(S);
			var C = I(S);
			D(x);
			var w = I(x, 2), T = N(w);
			G(T);
			var ee = I(T);
			D(w), L((e, t, n, i, a, o, c, p, _) => {
				q(s, "title", e), H(l, t), K(u, R(r).props.speed ?? 60), H(d, R(r).props.speed ?? 60), q(f, "title", n), H(m, i), K(h, R(r).frame.h), H(g, `${R(r).frame.h ?? ""} px`), H(v, `${a ?? ""} `), H(y, `${R(r).props.gap ?? 12 ?? ""} px`), K(b, R(r).props.gap ?? 12), q(x, "title", o), Ni(S, R(r).props.pauseOnHover !== !1), H(C, ` ${c ?? ""}`), q(w, "title", p), Ni(T, R(r).props.fade !== !1), H(ee, ` ${_ ?? ""}`);
			}, [
				() => J("tip.ribbon.speed"),
				() => J("lbl.ribbonSpeed"),
				() => J("tip.ribbon.bandHeight"),
				() => J("lbl.ribbonHeight"),
				() => J("lbl.imageGap"),
				() => J("tip.ribbon.pause"),
				() => J("lbl.ribbonPause"),
				() => J("tip.ribbon.fade"),
				() => J("lbl.ribbonFade")
			]), z("input", u, (e) => i("speed", e.target.valueAsNumber)), z("input", h, (e) => o("h", e.target.valueAsNumber)), z("input", b, (e) => i("gap", Number(e.target.value))), z("change", S, (e) => i("pauseOnHover", e.target.checked)), z("change", T, (e) => i("fade", e.target.checked)), V(e, t);
		}, a = (e) => {
			var t = bd(), n = P(t), a = N(n), o = I(a);
			{
				let e = /* @__PURE__ */ A(() => R(r).props.radius ?? ""), t = /* @__PURE__ */ A(() => [
					["", J("common.none")],
					["sm", J("opt.size.sm")],
					["md", J("opt.radius.md")]
				]);
				Y(o, {
					get value() {
						return R(e);
					},
					get options() {
						return R(t);
					},
					onchange: (e) => i("radius", e || null)
				});
			}
			D(n);
			var s = I(n, 2), c = N(s);
			G(c);
			var l = I(c);
			D(s), L((e, t, n) => {
				H(a, `${e ?? ""} `), q(s, "title", t), Ni(c, R(r).props.lightbox !== !1), H(l, ` ${n ?? ""}`);
			}, [
				() => J("lbl.radius"),
				() => J("tip.lightbox"),
				() => J("lbl.lightbox")
			]), z("change", c, (e) => i("lightbox", e.target.checked)), V(e, t);
		}, s = /* @__PURE__ */ A(() => Tl(R(r).props.view));
		var c = xd(), l = P(c);
		{
			let e = /* @__PURE__ */ A(() => J("lbl.view")), n = /* @__PURE__ */ A(() => J(`opt.galleryView.${R(s)}`)), r = /* @__PURE__ */ A(() => p("gallery-view", {
				view: "grid",
				columns: 3,
				gap: 12,
				interval: 5,
				width: "canvas",
				rowHeight: void 0,
				tilt: void 0,
				frameColor: void 0,
				captions: void 0
			}));
			nu(l, {
				id: "gallery-view",
				get title() {
					return R(e);
				},
				get value() {
					return R(n);
				},
				get reset() {
					return R(r);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var u = I(l, 2), m = (e) => {
			{
				let t = /* @__PURE__ */ A(() => J("lbl.ribbonMotion")), i = /* @__PURE__ */ A(() => `${R(r).props.speed ?? 60} px/s`), a = /* @__PURE__ */ A(() => p("gallery-roll", {
					rows: void 0,
					direction: void 0,
					speed: void 0,
					pauseOnHover: void 0,
					fade: void 0
				}));
				nu(e, {
					id: "gallery-roll",
					get title() {
						return R(t);
					},
					get value() {
						return R(i);
					},
					get reset() {
						return R(a);
					},
					children: (e, t) => {
						n(e);
					},
					$$slots: { default: !0 }
				});
			}
		};
		U(u, (e) => {
			R(s) === "ribbon" && e(m);
		});
		var h = I(u, 2);
		{
			let e = /* @__PURE__ */ A(() => J("group.galleryImages")), t = /* @__PURE__ */ A(() => ({
				"": J("common.none"),
				sm: J("opt.size.sm"),
				md: J("opt.radius.md")
			})[R(r).props.radius ?? ""]), n = /* @__PURE__ */ A(() => p("gallery-look", {
				radius: "md",
				lightbox: !0
			}));
			nu(h, {
				id: "gallery-look",
				get title() {
					return R(e);
				},
				get value() {
					return R(t);
				},
				get reset() {
					return R(n);
				},
				children: (e, t) => {
					a(e);
				},
				$$slots: { default: !0 }
			});
		}
		V(e, c);
	};
	U(g, (e) => {
		t.area === "content" ? e(_) : t.area === "style" && e(v, 1);
	}), V(e, h), et();
}
Mr([
	"change",
	"click",
	"input"
]);
//#endregion
//#region src/menu/families/Ribbon.svelte
var Cd = /* @__PURE__ */ B("<span class=\"nav-line\"><input/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span>"), wd = /* @__PURE__ */ B("<!> <button class=\"ghost action\"> </button>", 1), Td = /* @__PURE__ */ B("<button type=\"button\"></button>"), Ed = /* @__PURE__ */ B("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <input class=\"field-filled\"/></label>"), Dd = /* @__PURE__ */ B("<div class=\"ctl-field\"><span class=\"mini-label\"> </span> <div class=\"tile-grid cols-6\" role=\"group\"></div></div> <!>", 1), Od = /* @__PURE__ */ B("<!> <!>", 1), kd = /* @__PURE__ */ B("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"0.5\" max=\"10\" step=\"0.5\"/> <span class=\"gridmenu-value\"> </span></div>"), Ad = /* @__PURE__ */ B("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"10\" max=\"300\" step=\"5\"/> <span class=\"gridmenu-value\"> </span> <!></div>"), jd = /* @__PURE__ */ B("<button class=\"ghost action\"> </button> <!> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), Md = /* @__PURE__ */ B("<div class=\"pin-line\"><!> <!></div> <!>", 1), Nd = /* @__PURE__ */ B("<label> <!></label>"), Pd = /* @__PURE__ */ B("<!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"2\" max=\"40\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div>", 1), Fd = /* @__PURE__ */ B("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <!> <label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <!> <!>", 1), Id = /* @__PURE__ */ B("<!> <!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"-10\" max=\"10\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div>", 1), Ld = /* @__PURE__ */ B("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"8\" max=\"120\" step=\"2\"/> <span class=\"gridmenu-value\"> </span></div>", 1), Rd = /* @__PURE__ */ B("<div class=\"swatch-cell\"><!> <span class=\"mini-label\"> </span></div>"), zd = /* @__PURE__ */ B("<div class=\"swatch-row\"><!> <div class=\"swatch-cell\"><!> <span class=\"mini-label\"> </span></div></div>"), Bd = /* @__PURE__ */ B("<!> <!> <!> <!> <!>", 1);
function Vd(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, setBlockProps: o, themeSwatches: s } = n, { groupReset: c, groupChanged: l } = Su(() => R(r).props, o);
	function u(e, t) {
		i(`edit:${R(r).blockId}:ribbon${e}`, (n) => {
			n.props.items[e] = t;
		});
	}
	function d() {
		i("ribbon-item", (e) => {
			(e.props.items ??= []).push(J("seed.ribbonBlock.new"));
		});
	}
	function f(e) {
		i("ribbon-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function p(e, t) {
		let n = e + t;
		i("ribbon-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	var m = Vr(), g = P(m), _ = (e) => {
		let t = (e) => {
			var t = wd(), n = P(t);
			ni(n, 17, () => R(r).props.items ?? [], Qr, (e, t, n) => {
				var i = Cd(), a = N(i);
				G(a);
				var o = I(a, 2), s = N(o);
				s.disabled = n === 0, W(s, () => X.up, !0), D(s);
				var c = I(s, 2);
				W(c, () => X.down, !0), D(c);
				var l = I(c, 2);
				W(l, () => X.cross, !0), D(l), D(o), D(i), L((e, i, o, u) => {
					K(a, R(t)), q(a, "title", e), q(s, "title", i), q(c, "title", o), c.disabled = n === (R(r).props.items?.length ?? 0) - 1, q(l, "title", u);
				}, [
					() => J("tip.ribbon.item"),
					() => J("tip.moveUp"),
					() => J("tip.moveDown"),
					() => J("tip.ribbon.remove")
				]), z("change", a, (e) => u(n, e.target.value)), z("click", s, () => p(n, -1)), z("click", c, () => p(n, 1)), z("click", l, () => f(n)), V(e, i);
			});
			var i = I(n, 2), a = F(i, !0);
			L((e) => H(a, e), [() => J("ui.addRibbonItem")]), z("click", i, d), V(e, t);
		}, n = (e) => {
			var t = Dd(), n = P(t), i = N(n), o = F(i, !0), s = I(i, 2);
			ni(s, 21, ks, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ A(() => h(R(t), 2));
				let i = () => R(n)[0], o = () => R(n)[1];
				var s = Td();
				let c;
				W(s, () => Ms[i()], !0), D(s), L(() => {
					c = Ei(s, 1, "tile", null, c, { on: (R(r).props.sep ?? "dot") === i() }), q(s, "aria-pressed", (R(r).props.sep ?? "dot") === i()), q(s, "title", o());
				}), z("click", s, () => a("sep", i())), V(e, s);
			}), D(s), D(n);
			var c = I(n, 2), l = (e) => {
				var t = Ed(), n = N(t), i = F(n, !0), o = I(n, 2);
				G(o), D(t), L((e, n) => {
					q(t, "title", e), H(i, n), K(o, R(r).props.sepText ?? "");
				}, [() => J("tip.ribbon.sepText"), () => J("lbl.ribbonSepText")]), z("change", o, (e) => a("sepText", e.target.value)), V(e, t);
			};
			U(c, (e) => {
				R(r).props.sep === "custom" && e(l);
			}), L((e, t) => {
				H(o, e), q(s, "aria-label", t);
			}, [() => J("lbl.ribbonSep"), () => J("lbl.ribbonSep")]), V(e, t);
		};
		var i = Od(), o = P(i);
		{
			let e = /* @__PURE__ */ A(() => J("lbl.ribbonItems")), n = /* @__PURE__ */ A(() => J("menu.wordCount", { n: R(r).props.items?.length ?? 0 }));
			nu(o, {
				id: "ribbon-words",
				get title() {
					return R(e);
				},
				get value() {
					return R(n);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var s = I(o, 2);
		{
			let e = /* @__PURE__ */ A(() => J("lbl.ribbonSep")), t = /* @__PURE__ */ A(() => ks().find(([e]) => e === (R(r).props.sep ?? "dot"))?.[1] ?? ""), i = /* @__PURE__ */ A(() => c("ribbon-sep", {
				sep: "dot",
				sepText: void 0
			}));
			nu(s, {
				id: "ribbon-sep",
				get title() {
					return R(e);
				},
				get value() {
					return R(t);
				},
				get reset() {
					return R(i);
				},
				children: (e, t) => {
					n(e);
				},
				$$slots: { default: !0 }
			});
		}
		V(e, i);
	}, v = (e) => {
		let t = (e) => {
			var t = Md(), i = P(t), o = N(i);
			{
				let e = /* @__PURE__ */ A(Es);
				Y(o, {
					filled: !0,
					get value() {
						return R(f);
					},
					get options() {
						return R(e);
					},
					onchange: (e) => a("motion", e)
				});
			}
			Ws(I(o, 2), { id: "ribbonMotion" }), D(i);
			var s = I(i, 2), c = (e) => {
				var t = jd(), i = P(t), o = F(i, !0), s = I(i, 2);
				{
					let e = /* @__PURE__ */ A(() => J("lbl.ribbonDirection")), t = /* @__PURE__ */ A(() => R(r).props.direction ?? "left"), n = /* @__PURE__ */ A(() => [["left", J("opt.ribbonDir.left")], ["right", J("opt.ribbonDir.right")]]);
					Uu(s, {
						get label() {
							return R(e);
						},
						get value() {
							return R(t);
						},
						get options() {
							return R(n);
						},
						onchange: (e) => a("direction", e)
					});
				}
				var c = I(s, 2), l = (e) => {
					var t = kd(), n = N(t), i = F(n, !0), o = I(n, 2);
					G(o);
					var s = F(I(o, 2));
					D(t), L((e, n) => {
						q(t, "title", e), H(i, n), K(o, R(r).props.dwell ?? 2.5), H(s, `${R(r).props.dwell ?? 2.5 ?? ""} s`);
					}, [() => J("tip.ribbon.dwell"), () => J("lbl.ribbonDwell")]), z("input", o, (e) => a("dwell", e.target.valueAsNumber)), V(e, t);
				}, u = (e) => {
					var t = Ad(), n = N(t), i = F(n, !0), o = I(n, 2);
					G(o);
					var s = I(o, 2), c = F(s, !0);
					Ws(I(s, 2), { id: "speed" }), D(t), L((e, n) => {
						q(t, "title", e), H(i, n), K(o, R(r).props.speed ?? 60), H(c, R(r).props.speed ?? 60);
					}, [() => J("tip.ribbon.speed"), () => J("lbl.ribbonSpeed")]), z("input", o, (e) => a("speed", e.target.valueAsNumber)), V(e, t);
				};
				U(c, (e) => {
					R(f) === "step" ? e(l) : e(u, -1);
				});
				var d = I(c, 2), p = N(d);
				G(p);
				var m = I(p);
				D(d);
				var h = I(d, 2), g = N(h);
				G(g);
				var _ = I(g);
				D(h), L((e, t, n, a, s, c) => {
					q(i, "title", e), H(o, t), q(d, "title", n), Ni(p, R(r).props.pauseOnHover !== !1), H(m, ` ${a ?? ""}`), q(h, "title", s), Ni(g, R(r).props.fade !== !1), H(_, ` ${c ?? ""}`);
				}, [
					() => J("tip.ribbon.play"),
					() => J("ui.ribbonPlay"),
					() => J("tip.ribbon.pause"),
					() => J("lbl.ribbonPause"),
					() => J("tip.ribbon.fade"),
					() => J("lbl.ribbonFade")
				]), z("click", i, () => n.bridge?.sendDemoMotion()), z("change", p, (e) => a("pauseOnHover", e.target.checked)), z("change", g, (e) => a("fade", e.target.checked)), V(e, t);
			};
			U(s, (e) => {
				R(f) !== "none" && e(c);
			}), V(e, t);
		}, i = (e) => {
			var t = Fd(), n = P(t), i = N(n), o = F(i, !0), c = I(i, 2);
			{
				let e = /* @__PURE__ */ A(() => R(r).props.above ?? "none"), t = /* @__PURE__ */ A(Os);
				Y(c, {
					filled: !0,
					get value() {
						return R(e);
					},
					get options() {
						return R(t);
					},
					onchange: (e) => a("above", e)
				});
			}
			D(n);
			var l = I(n, 2), u = (e) => {
				var t = Nd(), n = N(t), i = I(n);
				{
					let e = /* @__PURE__ */ A(() => R(r).props.aboveColor ?? As(R(r).props)), t = /* @__PURE__ */ A(s), n = /* @__PURE__ */ A(() => J("tip.ribbon.stripeColor"));
					Pa(i, {
						get value() {
							return R(e);
						},
						get tokens() {
							return R(t);
						},
						get label() {
							return R(n);
						},
						onchange: (e) => a("aboveColor", e)
					});
				}
				D(t), L((e, r) => {
					q(t, "title", e), H(n, `${r ?? ""} `);
				}, [() => J("tip.ribbon.stripeColor"), () => J("lbl.colour")]), V(e, t);
			};
			U(l, (e) => {
				(R(r).props.above ?? "none") !== "none" && e(u);
			});
			var d = I(l, 2), f = N(d), p = F(f, !0), m = I(f, 2);
			{
				let e = /* @__PURE__ */ A(() => R(r).props.main ?? "text"), t = /* @__PURE__ */ A(Ds);
				Y(m, {
					filled: !0,
					get value() {
						return R(e);
					},
					get options() {
						return R(t);
					},
					onchange: (e) => a("main", e)
				});
			}
			D(d);
			var h = I(d, 2), g = N(h), _ = F(g, !0), v = I(g, 2);
			{
				let e = /* @__PURE__ */ A(() => R(r).props.below ?? "none"), t = /* @__PURE__ */ A(Os);
				Y(v, {
					filled: !0,
					get value() {
						return R(e);
					},
					get options() {
						return R(t);
					},
					onchange: (e) => a("below", e)
				});
			}
			D(h);
			var y = I(h, 2), b = (e) => {
				var t = Nd(), n = N(t), i = I(n);
				{
					let e = /* @__PURE__ */ A(() => R(r).props.belowColor ?? As(R(r).props)), t = /* @__PURE__ */ A(s), n = /* @__PURE__ */ A(() => J("tip.ribbon.stripeColor"));
					Pa(i, {
						get value() {
							return R(e);
						},
						get tokens() {
							return R(t);
						},
						get label() {
							return R(n);
						},
						onchange: (e) => a("belowColor", e)
					});
				}
				D(t), L((e, r) => {
					q(t, "title", e), H(n, `${r ?? ""} `);
				}, [() => J("tip.ribbon.stripeColor"), () => J("lbl.colour")]), V(e, t);
			};
			U(y, (e) => {
				(R(r).props.below ?? "none") !== "none" && e(b);
			});
			var x = I(y, 2), S = (e) => {
				var t = Pd(), n = P(t);
				{
					let e = /* @__PURE__ */ A(() => J("lbl.ribbonStripePlace")), t = /* @__PURE__ */ A(() => J("tip.ribbon.stripePlace")), i = /* @__PURE__ */ A(() => R(r).props.stripePlace ?? "stack"), o = /* @__PURE__ */ A(() => [["stack", J("opt.ribbonPlace.stack")], ["edge", J("opt.ribbonPlace.edge")]]);
					Uu(n, {
						get label() {
							return R(e);
						},
						get title() {
							return R(t);
						},
						get value() {
							return R(i);
						},
						get options() {
							return R(o);
						},
						onchange: (e) => a("stripePlace", e)
					});
				}
				var i = I(n, 2), o = N(i), s = F(o, !0), c = I(o, 2);
				G(c);
				var l = F(I(c, 2));
				D(i), L((e, t) => {
					q(i, "title", e), H(s, t), K(c, R(r).props.thickness ?? 8), H(l, `${R(r).props.thickness ?? 8 ?? ""} px`);
				}, [() => J("tip.ribbon.thickness"), () => J("lbl.ribbonThickness")]), z("input", c, (e) => a("thickness", e.target.valueAsNumber)), V(e, t);
			};
			U(x, (e) => {
				((R(r).props.above ?? "none") !== "none" || (R(r).props.below ?? "none") !== "none") && e(S);
			}), L((e, t, r, i, a, s) => {
				q(n, "title", e), H(o, t), q(d, "title", r), H(p, i), q(h, "title", a), H(_, s);
			}, [
				() => J("tip.ribbon.above"),
				() => J("lbl.ribbonAbove"),
				() => J("tip.ribbon.main"),
				() => J("lbl.ribbonMain"),
				() => J("tip.ribbon.below"),
				() => J("lbl.ribbonBelow")
			]), V(e, t);
		}, o = (e) => {
			var t = Id(), n = P(t);
			{
				let e = /* @__PURE__ */ A(() => J("lbl.ribbonWidth")), t = /* @__PURE__ */ A(() => Ts(R(r).props.width)), i = /* @__PURE__ */ A(ws);
				Uu(n, {
					get label() {
						return R(e);
					},
					get value() {
						return R(t);
					},
					get options() {
						return R(i);
					},
					onchange: (e) => a("width", e)
				});
			}
			var i = I(n, 2);
			{
				let e = /* @__PURE__ */ A(() => J("lbl.ribbonVariant")), t = /* @__PURE__ */ A(() => R(r).props.variant ?? "band"), n = /* @__PURE__ */ A(() => [["band", J("opt.ribbonVariant.band")], ["plain", J("opt.ribbonVariant.plain")]]);
				Uu(i, {
					get label() {
						return R(e);
					},
					get value() {
						return R(t);
					},
					get options() {
						return R(n);
					},
					onchange: (e) => a("variant", e)
				});
			}
			var o = I(i, 2), s = N(o), c = F(s, !0), l = I(s, 2);
			G(l);
			var u = F(I(l, 2));
			D(o), L((e, t) => {
				q(o, "title", e), H(c, t), K(l, R(r).props.tilt ?? 0), H(u, `${R(r).props.tilt ?? 0 ?? ""}°`);
			}, [() => J("tip.ribbon.tilt"), () => J("lbl.ribbonTilt")]), z("input", l, (e) => a("tilt", e.target.valueAsNumber)), V(e, t);
		}, u = (e) => {
			var t = Ld(), n = P(t), i = N(n), o = F(i, !0), s = I(i, 2);
			{
				let e = /* @__PURE__ */ A(() => R(r).props.size ?? "md"), t = /* @__PURE__ */ A(() => [
					["sm", J("opt.size.sm")],
					["md", J("opt.size.md")],
					["lg", J("opt.size.lg")],
					["xl", J("opt.size.xl")]
				]);
				Y(s, {
					filled: !0,
					get value() {
						return R(e);
					},
					get options() {
						return R(t);
					},
					onchange: (e) => a("size", e)
				});
			}
			D(n);
			var c = I(n, 2), l = N(c);
			G(l);
			var u = I(l);
			D(c);
			var d = I(c, 2), f = N(d);
			G(f);
			var p = I(f);
			D(d);
			var m = I(d, 2), h = N(m);
			G(h);
			var g = I(h);
			D(m);
			var _ = I(m, 2), v = N(_), y = F(v, !0), b = I(v, 2);
			G(b);
			var x = F(I(b, 2));
			D(_), L((e, t, n, i, a, s, v, S, C) => {
				H(o, e), q(c, "title", t), Ni(l, R(r).props.caps === !0), H(u, ` ${n ?? ""}`), q(d, "title", i), Ni(f, R(r).props.weight === "bold"), H(p, ` ${a ?? ""}`), q(m, "title", s), Ni(h, R(r).props.outline === !0), H(g, ` ${v ?? ""}`), q(_, "title", S), H(y, C), K(b, R(r).props.gap ?? 40), H(x, `${R(r).props.gap ?? 40 ?? ""} px`);
			}, [
				() => J("lbl.size"),
				() => J("tip.ribbon.caps"),
				() => J("lbl.ribbonCaps"),
				() => J("tip.ribbon.bold"),
				() => J("lbl.ribbonBold"),
				() => J("tip.ribbon.outline"),
				() => J("lbl.ribbonOutline"),
				() => J("tip.ribbon.gap"),
				() => J("lbl.ribbonGap")
			]), z("change", l, (e) => a("caps", e.target.checked)), z("change", f, (e) => a("weight", e.target.checked ? "bold" : "normal")), z("change", h, (e) => a("outline", e.target.checked)), z("input", b, (e) => a("gap", e.target.valueAsNumber)), V(e, t);
		}, d = (e) => {
			var t = zd(), n = N(t), i = (e) => {
				var t = Rd(), n = N(t);
				{
					let e = /* @__PURE__ */ A(() => R(r).props.bg ?? "accent"), t = /* @__PURE__ */ A(s), i = /* @__PURE__ */ A(() => J("tip.ribbon.bg"));
					Pa(n, {
						get value() {
							return R(e);
						},
						get tokens() {
							return R(t);
						},
						get label() {
							return R(i);
						},
						onchange: (e) => a("bg", e)
					});
				}
				var i = F(I(n, 2), !0);
				D(t), L((e, n) => {
					q(t, "title", e), H(i, n);
				}, [() => J("tip.ribbon.bg"), () => J("lbl.background")]), V(e, t);
			};
			U(n, (e) => {
				(R(r).props.variant ?? "band") !== "plain" && e(i);
			});
			var o = I(n, 2), c = N(o);
			{
				let e = /* @__PURE__ */ A(() => R(r).props.color ?? ((R(r).props.variant ?? "band") === "plain" ? "text" : "accent-text")), t = /* @__PURE__ */ A(s), n = /* @__PURE__ */ A(() => J("tip.ribbon.color"));
				Pa(c, {
					get value() {
						return R(e);
					},
					get tokens() {
						return R(t);
					},
					get label() {
						return R(n);
					},
					onchange: (e) => a("color", e)
				});
			}
			var l = F(I(c, 2), !0);
			D(o), D(t), L((e, t) => {
				q(o, "title", e), H(l, t);
			}, [() => J("tip.ribbon.color"), () => J("lbl.textColor")]), V(e, t);
		}, f = /* @__PURE__ */ A(() => R(r).props.motion ?? "roll"), p = /* @__PURE__ */ A(() => [R(r).props.above ?? "none", R(r).props.below ?? "none"].filter((e) => e !== "none").length), m = /* @__PURE__ */ A(() => l({
			bg: void 0,
			color: void 0
		}));
		var h = Bd(), g = P(h);
		{
			let e = /* @__PURE__ */ A(() => J("lbl.ribbonMotion")), n = /* @__PURE__ */ A(() => Es().find(([e]) => e === R(f))?.[1] ?? ""), r = /* @__PURE__ */ A(() => c("ribbon-motion", {
				motion: "roll",
				direction: "left",
				speed: 60,
				dwell: 2.5,
				pauseOnHover: !0,
				fade: !0
			}));
			nu(g, {
				id: "ribbon-motion",
				get title() {
					return R(e);
				},
				get value() {
					return R(n);
				},
				get reset() {
					return R(r);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var _ = I(g, 2);
		{
			let e = /* @__PURE__ */ A(() => J("lbl.ribbonStripes")), t = /* @__PURE__ */ A(() => R(p) ? J("menu.onCount", { n: R(p) }) : J("common.off")), n = /* @__PURE__ */ A(() => c("ribbon-stripes", {
				above: "none",
				below: "none",
				main: "text",
				aboveColor: void 0,
				belowColor: void 0,
				stripePlace: "stack",
				thickness: 8
			}));
			nu(_, {
				id: "ribbon-stripes",
				get title() {
					return R(e);
				},
				get value() {
					return R(t);
				},
				get reset() {
					return R(n);
				},
				children: (e, t) => {
					i(e);
				},
				$$slots: { default: !0 }
			});
		}
		var v = I(_, 2);
		{
			let e = /* @__PURE__ */ A(() => J("lbl.ribbonShape")), t = /* @__PURE__ */ A(() => ws().find(([e]) => e === Ts(R(r).props.width))?.[1] ?? ""), n = /* @__PURE__ */ A(() => c("ribbon-shape", {
				width: "canvas",
				variant: "band",
				tilt: 0
			}));
			nu(v, {
				id: "ribbon-shape",
				get title() {
					return R(e);
				},
				get value() {
					return R(t);
				},
				get reset() {
					return R(n);
				},
				children: (e, t) => {
					o(e);
				},
				$$slots: { default: !0 }
			});
		}
		var y = I(v, 2);
		{
			let e = /* @__PURE__ */ A(() => J("lbl.ribbonText")), t = /* @__PURE__ */ A(() => ({
				sm: J("opt.size.sm"),
				md: J("opt.size.md"),
				lg: J("opt.size.lg"),
				xl: J("opt.size.xl")
			})[R(r).props.size ?? "md"]), n = /* @__PURE__ */ A(() => c("ribbon-text", {
				size: "md",
				caps: !1,
				weight: "normal",
				outline: !1,
				gap: 40
			}));
			nu(y, {
				id: "ribbon-text",
				get title() {
					return R(e);
				},
				get value() {
					return R(t);
				},
				get reset() {
					return R(n);
				},
				children: (e, t) => {
					u(e);
				},
				$$slots: { default: !0 }
			});
		}
		var b = I(y, 2);
		{
			let e = /* @__PURE__ */ A(() => J("group.navColours")), t = /* @__PURE__ */ A(() => R(m) ? J("menu.changed", { n: R(m) }) : J("menu.standard")), n = /* @__PURE__ */ A(() => c("ribbon-colours", {
				bg: void 0,
				color: void 0
			}));
			nu(b, {
				id: "ribbon-colours",
				get title() {
					return R(e);
				},
				get value() {
					return R(t);
				},
				get reset() {
					return R(n);
				},
				children: (e, t) => {
					d(e);
				},
				$$slots: { default: !0 }
			});
		}
		V(e, h);
	};
	U(g, (e) => {
		t.area === "content" ? e(_) : t.area === "style" && e(v, 1);
	}), V(e, m), et();
}
Mr([
	"change",
	"click",
	"input"
]);
//#endregion
//#region ../template/assets/engine/0.7.4/fonts.js
var Hd = [
	["font.system", "system-ui, sans-serif"],
	["font.arial", "Arial, Helvetica, sans-serif"],
	["font.verdana", "Verdana, Geneva, sans-serif"],
	["font.trebuchet", "'Trebuchet MS', sans-serif"],
	["font.georgia", "Georgia, 'Times New Roman', serif"],
	["font.palatino", "'Palatino Linotype', Palatino, serif"],
	["font.courier", "'Courier New', monospace"]
], Ud = (e) => e ? e.startsWith("#") ? e : `var(--urd-color-${e})` : "var(--urd-color-accent)", Wd = /* @__PURE__ */ j("title"), Gd = /* @__PURE__ */ B("<div class=\"bg-layer\"><span class=\"toolbar-row\"><span class=\"cal-ref-swatch\" aria-hidden=\"true\"></span> <span> </span> <button class=\"ghost row-tool\"></button></span></div>"), Kd = /* @__PURE__ */ B("<div class=\"bg-layer\"><span class=\"toolbar-row\"><input class=\"tb-grow\" spellcheck=\"false\"/> <button class=\"ghost row-tool\"></button></span> <span class=\"toolbar-row\"><input class=\"tb-grow\"/> <!></span> <button type=\"button\" class=\"ghost action\"> </button></div>"), qd = /* @__PURE__ */ B("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), Jd = /* @__PURE__ */ B("<span class=\"gridmenu-value\"> </span>"), Yd = /* @__PURE__ */ B("<!> <button type=\"button\" class=\"ghost action\"><!> </button> <span class=\"mini-label\"> </span> <!> <!> <button type=\"button\" class=\"linkish\"> </button>", 1), Xd = /* @__PURE__ */ B("<label> <!></label>"), Zd = /* @__PURE__ */ B("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <!></div> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <!></div>", 1), Qd = /* @__PURE__ */ B("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <!>", 1), $d = /* @__PURE__ */ B("<div class=\"pin-line\"><label> <input type=\"number\" min=\"1\" max=\"50\"/></label> <!></div> <!>", 1), ef = /* @__PURE__ */ B("<!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"0\" max=\"10\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div>", 1), tf = /* @__PURE__ */ B("<!> <!> <!> <!> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <!> <!>", 1), nf = /* @__PURE__ */ B("<label> <input placeholder=\"/program\" spellcheck=\"false\"/></label>"), rf = /* @__PURE__ */ B("<!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <div class=\"pin-line\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <!>", 1), af = /* @__PURE__ */ B("<label> <input/></label> <label> <!></label>", 1), of = /* @__PURE__ */ B("<label class=\"field-stack\"> <textarea rows=\"3\"></textarea></label>"), sf = /* @__PURE__ */ B("<!> <label> <input/></label> <!> <label> <input placeholder=\"https://\" spellcheck=\"false\"/></label>", 1), cf = /* @__PURE__ */ B("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!>", 1), lf = /* @__PURE__ */ B("<button type=\"button\" class=\"ghost action\"> </button>"), uf = /* @__PURE__ */ B("<!> <!> <!> <!> <!> <!>", 1), df = /* @__PURE__ */ B("<label> <input type=\"number\" min=\"0\" max=\"24\"/></label>"), ff = /* @__PURE__ */ B("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <!></div>"), pf = /* @__PURE__ */ B("<span class=\"mini-label\"> </span>"), mf = /* @__PURE__ */ B("<div class=\"cal-slot\"><!> <span class=\"mini-label\"> </span></div>"), hf = /* @__PURE__ */ B("<!> <div class=\"cal-slots\"></div>", 1), gf = /* @__PURE__ */ B("<!> <label> <!></label> <label> <input type=\"number\"/></label> <!> <span class=\"toolbar-row\"><button type=\"button\"><i> </i></button> <button type=\"button\"><u> </u></button> <!></span>", 1), _f = /* @__PURE__ */ B("<div class=\"pin-line\"><button type=\"button\" class=\"menu-row cal-design-row\"><span class=\"menu-group-title\"> </span><span class=\"menu-group-value\"> </span></button> <!></div>   <!> <!> <!> <!>", 1);
function vf(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, setBlockProps: o, siteCalendars: s, siteCalendarById: c, addSiteCalendar: l, themeSwatches: u } = n, d = {
		list: "calendar.viewList",
		cards: "calendar.viewCards",
		month: "calendar.viewMonth",
		agenda: "calendar.viewAgenda",
		next: "calendar.viewNext",
		week: "calendar.viewWeek",
		day: "calendar.viewDay",
		year: "calendar.viewYear"
	};
	function f(e, t) {
		let n = { ...R(r).props.options ?? {} };
		t === e.def || t == null ? delete n[e.key] : n[e.key] = t, a("options", Object.keys(n).length ? n : void 0);
	}
	function p(e, t) {
		return e.key === "firstMonth" && t === "now" ? J("calendar.opt.firstMonth.now") : e.key === "firstMonth" ? new Intl.DateTimeFormat(la(), { month: "long" }).format(new Date(2024, Number(t), 1)) : J(`${e.labelKey}.${t}`);
	}
	function m(e) {
		let t = [];
		for (let n of e.slots) {
			let e = t.find((e) => e.section === n.section);
			e ? e.slots.push(n) : t.push({
				section: n.section,
				slots: [n]
			});
		}
		return t;
	}
	function h() {
		return R(r)?.props.fieldStyle?.[R(Wd)] ?? {};
	}
	function g(e) {
		let t = R(r).props.texts?.[e];
		return typeof t == "string" ? new DOMParser().parseFromString(t.replace(/<br\s*\/?>/gi, "\n"), "text/html").body.textContent.trim() : "";
	}
	function _(e, t) {
		let n = t.trim(), i = { ...R(r).props.texts ?? {} };
		n ? i[e] = n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>") : delete i[e], a("texts", Object.keys(i).length ? i : void 0);
	}
	function v(e, t) {
		let n = { ...R(r).props.colors ?? {} };
		t ? n[e] = t : delete n[e], a("colors", Object.keys(n).length ? n : void 0);
	}
	function y(e) {
		let t = {
			...R(r).props.stripe ?? {},
			...e
		};
		for (let e of Object.keys(t)) t[e] === void 0 && delete t[e];
		a("stripe", Object.keys(t).length ? t : void 0);
	}
	function b(e) {
		let t = { ...R(r).props.fieldStyle ?? {} }, n = {
			...t[R(Wd)] ?? {},
			...e
		};
		for (let e of Object.keys(n)) n[e] === void 0 && delete n[e];
		Object.keys(n).length ? t[R(Wd)] = n : delete t[R(Wd)], a("fieldStyle", Object.keys(t).length ? t : void 0);
	}
	let x = (e) => e && typeof e == "object" && "calendar" in e ? {
		ref: String(e.calendar ?? ""),
		url: "",
		name: "",
		color: ""
	} : e && typeof e == "object" ? {
		ref: "",
		url: e.url ?? "",
		name: e.name ?? "",
		color: e.color ?? ""
	} : {
		ref: "",
		url: typeof e == "string" ? e : "",
		name: "",
		color: ""
	}, S = ({ ref: e, url: t, name: n, color: r }) => e ? { calendar: e } : n || r ? {
		url: t,
		...n ? { name: n } : {},
		...r ? { color: r } : {}
	} : t, C = () => new Set((R(r).props.sources ?? []).map((e) => x(e).ref).filter(Boolean));
	function w(e, t) {
		let n = Ge(R(r).props.sources ?? []).filter((t) => x(t).ref !== e);
		a("sources", t ? [...n, { calendar: e }] : n);
	}
	function T(e) {
		let t = Ge(R(r).props.sources ?? []), { url: n, name: i, color: o } = x(t[e]), s = l({
			url: n.trim(),
			...i ? { name: i } : {},
			...o ? { color: o } : {}
		});
		a("sources", t.map((t, n) => n === e ? { calendar: s } : t));
	}
	function ee(e, t) {
		i(`edit:${R(r).blockId}:source${e}`, (n) => {
			let r = [...n.props.sources ?? []];
			r[e] = S({
				...x(r[e]),
				...t
			}), n.props.sources = r;
		});
	}
	function te() {
		a("sources", [...Ge(R(r).props.sources ?? []), ""]);
	}
	function ne(e) {
		a("sources", Ge(R(r).props.sources ?? []).filter((t, n) => n !== e));
	}
	function re() {
		let e = R(r).props, t = pc(e.design), n = (e, t) => () => o(e, t), i = mc(e), a = i === "agenda" ? 8 : 6, s = i === "next" ? 3 : void 0, l = e.switcher === !0 || e.switcherViews != null || e.toolsSize != null || e.description != null || e.showMore === !1 || (e.limit ?? 6) !== a || e.nextCount !== s || e.laterCount !== s || e.showCancelled === !1 || e.structuredData === !1 || e.clock != null || e.weekStart != null, u = [
			!t.ownFilter && e.showCategories === !0,
			e.showSubscribe !== !1,
			e.showSignup === !0,
			e.showSearch === !0,
			e.showEarlier === !0
		].filter(Boolean).length, f = u > 0 || e.showOpen === !1 || e.showAdd === !1 || !!e.programHref, p = !!e.emptyText || e.emptyIcon != null && e.emptyIcon !== "calendar", m = uc(e.design).filter((t) => e.options?.[t.key] != null).length, h = t.slots.filter((t) => e.colors?.[t.key]).length, g = Object.keys(e.fieldStyle ?? {}).length;
		return {
			sources: String((e.sources ?? []).filter((e) => {
				let t = x(e);
				return t.ref ? !!c(t.ref) : t.url.trim();
			}).length),
			view: J(d[mc(e)]),
			viewReset: l ? n("cal-view", {
				switcher: void 0,
				switcherViews: void 0,
				toolsSize: void 0,
				description: void 0,
				showMore: void 0,
				limit: a,
				nextCount: s,
				laterCount: s,
				showCancelled: void 0,
				structuredData: void 0,
				clock: void 0,
				weekStart: void 0
			}) : null,
			buttons: u ? J("menu.onCount", { n: u }) : J("common.off"),
			buttonsReset: f ? n("cal-buttons", {
				showCategories: !1,
				showSubscribe: !1,
				showSignup: !1,
				showSearch: void 0,
				showEarlier: void 0,
				showOpen: void 0,
				showAdd: void 0,
				programHref: void 0
			}) : null,
			empty: e.emptyText || J("menu.standard"),
			emptyReset: p ? n("cal-empty", {
				emptyText: void 0,
				emptyIcon: void 0
			}) : null,
			notice: e.notice?.show === !0 ? J("common.on") : J("common.off"),
			noticeReset: e.notice ? n("cal-notice", { notice: void 0 }) : null,
			opts: m ? J("menu.changed", { n: m }) : J("menu.standard"),
			optsReset: m ? n("cal-opts", { options: void 0 }) : null,
			colors: h ? J("menu.changedOf", {
				n: h,
				m: t.slots.length
			}) : J("menu.standard"),
			colorsReset: h ? n("cal-colors", { colors: void 0 }) : null,
			stripe: bc(t, e.stripe).show ? J("common.on") : J("common.off"),
			stripeReset: e.stripe ? n("cal-stripe", { stripe: void 0 }) : null,
			fields: g ? J("menu.changed", { n: g }) : J("menu.standard"),
			fieldsReset: g ? n("cal-fields", { fieldStyle: void 0 }) : null
		};
	}
	var E = Vr(), ie = P(E), ae = (e) => {
		let t = (e) => {
			var t = Yd(), i = P(t);
			ni(i, 17, () => R(r).props.sources ?? [], Qr, (e, t, n) => {
				let r = /* @__PURE__ */ A(() => x(R(t)));
				var i = Vr(), a = P(i), o = (e) => {
					let t = /* @__PURE__ */ A(() => c(R(r).ref));
					var i = Gd(), a = N(i), o = N(a);
					let s;
					var l = I(o, 2);
					let u;
					var d = F(l, !0), f = I(l, 2);
					W(f, () => X.cross, !0), D(f), D(a), D(i), L((e, n, r) => {
						s = Oi(o, "", s, { background: e }), u = Ei(l, 1, "tb-grow cal-ref-name", null, u, { muted: !R(t) }), H(d, n), q(f, "title", r);
					}, [
						() => Ud(R(t)?.color),
						() => R(t) ? R(t).name || R(t).url : J("calendar.refMissing"),
						() => J("ui.remove")
					]), z("click", f, () => ne(n)), V(e, i);
				}, s = (e) => {
					var t = Kd(), i = N(t), a = N(i);
					G(a);
					var o = I(a, 2);
					W(o, () => X.cross, !0), D(o), D(i);
					var s = I(i, 2), c = N(s);
					G(c);
					var l = I(c, 2);
					{
						let e = /* @__PURE__ */ A(() => R(r).color || "accent"), t = /* @__PURE__ */ A(u), i = /* @__PURE__ */ A(() => J("tip.calendar.sourceColor"));
						Pa(l, {
							get value() {
								return R(e);
							},
							get tokens() {
								return R(t);
							},
							allowClear: !0,
							get label() {
								return R(i);
							},
							onchange: (e) => ee(n, { color: e ?? "" })
						});
					}
					D(s);
					var d = I(s, 2), f = F(d, !0);
					D(t), L((e, t, n, i, s, l, u, p) => {
						K(a, R(r).url), q(a, "placeholder", e), q(a, "title", t), q(o, "title", n), K(c, R(r).name), q(c, "placeholder", i), q(c, "title", s), q(d, "title", l), d.disabled = u, H(f, p);
					}, [
						() => J("calendar.sourcesPh"),
						() => J("calendar.sourceUrl"),
						() => J("ui.remove"),
						() => J("calendar.sourceName"),
						() => J("tip.calendar.sourceName"),
						() => J("tip.calendar.saveToSite"),
						() => !R(r).url.trim(),
						() => J("calendar.saveToSite")
					]), z("change", a, (e) => ee(n, { url: e.target.value.trim() })), z("click", o, () => ne(n)), z("change", c, (e) => ee(n, { name: e.target.value.trim() })), z("click", d, () => T(n)), V(e, t);
				};
				U(a, (e) => {
					R(r).ref ? e(o) : e(s, -1);
				}), V(e, i);
			});
			var a = I(i, 2), o = N(a);
			W(o, () => X.plus);
			var l = I(o);
			D(a);
			var d = I(a, 2), f = F(d, !0), p = I(d, 2);
			ni(p, 17, s, (e) => e.id, (e, t) => {
				var n = qd(), r = N(n);
				G(r);
				var i = I(r);
				D(n), L((e) => {
					Ni(r, e), H(i, ` ${(R(t).name || R(t).url) ?? ""}`);
				}, [() => C().has(R(t).id)]), z("change", r, (e) => w(R(t).id, e.target.checked)), V(e, n);
			});
			var m = I(p, 2), h = (e) => {
				var t = Jd(), n = F(t, !0);
				L((e) => H(n, e), [() => J("calendar.siteSourcesNone")]), V(e, t);
			}, g = /* @__PURE__ */ A(() => !s().length);
			U(m, (e) => {
				R(g) && e(h);
			});
			var _ = I(m, 2), v = F(_, !0);
			L((e, t, n, r) => {
				H(l, ` ${e ?? ""}`), q(d, "title", t), H(f, n), H(v, r);
			}, [
				() => J("ui.addCalendar"),
				() => J("tip.calendar.siteSources"),
				() => J("calendar.siteSources"),
				() => J("calendar.editSiteCalendars")
			]), z("click", a, te), z("click", _, () => n.openPanel("site", { calendars: !0 })), V(e, t);
		}, i = (e) => {
			var t = tf(), n = P(t), i = (e) => {
				var t = Xd(), n = N(t), i = I(n);
				{
					let e = /* @__PURE__ */ A(() => R(r).props.view ?? "list"), t = /* @__PURE__ */ A(() => [
						["list", J("calendar.viewList")],
						["cards", J("calendar.viewCards")],
						["month", J("calendar.viewMonth")],
						["agenda", J("calendar.viewAgenda")],
						["next", J("calendar.viewNext")]
					]);
					Y(i, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => a("view", e)
					});
				}
				D(t), L((e) => H(n, `${e ?? ""} `), [() => J("lbl.view")]), V(e, t);
			}, o = /* @__PURE__ */ A(() => !pc(R(r).props.design).view);
			U(n, (e) => {
				R(o) && e(i);
			});
			var s = I(n, 2), c = (e) => {
				var t = Qd(), n = P(t), i = N(n);
				G(i);
				var o = I(i);
				D(n);
				var s = I(n, 2), c = (e) => {
					let t = /* @__PURE__ */ A(() => sc(R(r).props));
					var n = Zd(), i = P(n), o = N(i), s = F(o, !0), c = I(o, 2);
					{
						let e = /* @__PURE__ */ A(() => ac.map((e) => [e, J(`calendar.design.${e}`)]));
						Y(c, {
							get value() {
								return R(t).week;
							},
							get options() {
								return R(e);
							},
							onchange: (e) => a("switcherViews", {
								...R(r).props.switcherViews ?? {},
								week: e
							})
						});
					}
					D(i);
					var l = I(i, 2), u = N(l), d = F(u, !0), f = I(u, 2);
					{
						let e = /* @__PURE__ */ A(() => oc.map((e) => [e, J(e === "month" ? "calendar.viewMonth" : `calendar.design.${e}`)]));
						Y(f, {
							get value() {
								return R(t).month;
							},
							get options() {
								return R(e);
							},
							onchange: (e) => a("switcherViews", {
								...R(r).props.switcherViews ?? {},
								month: e
							})
						});
					}
					D(l), L((e, t, n, r) => {
						q(i, "title", e), H(s, t), q(l, "title", n), H(d, r);
					}, [
						() => J("tip.calendar.switchWeek"),
						() => J("calendar.switchWeek"),
						() => J("tip.calendar.switchMonth"),
						() => J("calendar.switchMonth")
					]), V(e, n);
				};
				U(s, (e) => {
					R(r).props.switcher === !0 && e(c);
				});
				var l = I(s, 2);
				{
					let e = /* @__PURE__ */ A(() => J("calendar.toolsSize")), t = /* @__PURE__ */ A(() => J("tip.calendar.toolsSize")), n = /* @__PURE__ */ A(() => ["s", "l"].includes(R(r).props.toolsSize) ? R(r).props.toolsSize : "m"), i = /* @__PURE__ */ A(() => [
						["s", J("calendar.toolsSize.s")],
						["m", J("calendar.toolsSize.m")],
						["l", J("calendar.toolsSize.l")]
					]);
					Uu(l, {
						get label() {
							return R(e);
						},
						get title() {
							return R(t);
						},
						get value() {
							return R(n);
						},
						get options() {
							return R(i);
						},
						onchange: (e) => a("toolsSize", e === "m" ? void 0 : e)
					});
				}
				L((e, t) => {
					q(n, "title", e), Ni(i, R(r).props.switcher === !0), H(o, ` ${t ?? ""}`);
				}, [() => J("tip.calendar.switcher"), () => J("calendar.switcher")]), z("change", i, (e) => a("switcher", e.target.checked || void 0)), V(e, t);
			}, l = /* @__PURE__ */ A(() => hc.includes(mc(R(r).props)));
			U(s, (e) => {
				R(l) && e(c);
			});
			var u = I(s, 2), d = (e) => {
				var t = qd(), n = N(t);
				G(n);
				var i = I(n);
				D(t), L((e, a) => {
					q(t, "title", e), Ni(n, R(r).props.phoneDesign !== !1), H(i, ` ${a ?? ""}`);
				}, [() => J("tip.calendar.phoneDesign"), () => J("calendar.phoneDesign")]), z("change", n, (e) => a("phoneDesign", e.target.checked ? void 0 : !1)), V(e, t);
			}, f = /* @__PURE__ */ A(() => pc(R(r).props.design).phone === "switch");
			U(u, (e) => {
				R(f) && e(d);
			});
			var p = I(u, 2), m = (e) => {
				{
					let t = /* @__PURE__ */ A(() => J("calendar.opt.description")), n = /* @__PURE__ */ A(() => J("tip.calendar.opt.description")), i = /* @__PURE__ */ A(() => cc(R(r).props)), o = /* @__PURE__ */ A(() => [["rows", J("calendar.descriptionRows")], ["card", J("calendar.descriptionCard")]]);
					Uu(e, {
						get label() {
							return R(t);
						},
						get title() {
							return R(n);
						},
						get value() {
							return R(i);
						},
						get options() {
							return R(o);
						},
						onchange: (e) => a("description", e === "rows" ? void 0 : e)
					});
				}
			}, h = /* @__PURE__ */ A(() => lc(R(r).props));
			U(p, (e) => {
				R(h) && e(m);
			});
			var g = I(p, 2), _ = (e) => {
				var t = $d(), n = P(t), i = N(n), o = N(i), s = I(o);
				G(s), D(i), Ws(I(i, 2), { id: "limit" }), D(n);
				var c = I(n, 2), l = (e) => {
					var t = qd(), n = N(t);
					G(n);
					var i = I(n);
					D(t), L((e, a) => {
						q(t, "title", e), Ni(n, R(r).props.showMore !== !1), H(i, ` ${a ?? ""}`);
					}, [() => J("tip.calendar.showMore"), () => J("calendar.showMore")]), z("change", n, (e) => a("showMore", e.target.checked ? void 0 : !1)), V(e, t);
				}, u = /* @__PURE__ */ A(() => mc(R(r).props) === "list" && pc(R(r).props.design).module !== "more");
				U(c, (e) => {
					R(u) && e(l);
				}), L((e, t) => {
					q(i, "title", e), H(o, `${t ?? ""} `), K(s, R(r).props.limit ?? 6);
				}, [() => J("tip.collection.limit"), () => J("lbl.maxCount")]), z("change", s, (e) => a("limit", Math.max(1, Math.min(50, Number(e.target.value) || 6)))), V(e, t);
			}, v = /* @__PURE__ */ A(() => [
				"list",
				"cards",
				"agenda"
			].includes(R(r).props.view ?? "list"));
			U(g, (e) => {
				R(v) && e(_);
			});
			var y = I(g, 2), b = N(y);
			G(b);
			var x = I(b);
			D(y);
			var S = I(y, 2), C = N(S);
			G(C);
			var w = I(C);
			D(S);
			var T = I(S, 2);
			{
				let e = /* @__PURE__ */ A(() => J("calendar.clock")), t = /* @__PURE__ */ A(() => J("tip.calendar.clock")), n = /* @__PURE__ */ A(() => R(r).props.clock === "12" ? "12" : "24"), i = /* @__PURE__ */ A(() => [["24", J("calendar.clock.24")], ["12", J("calendar.clock.12")]]);
				Uu(T, {
					get label() {
						return R(e);
					},
					get title() {
						return R(t);
					},
					get value() {
						return R(n);
					},
					get options() {
						return R(i);
					},
					onchange: (e) => a("clock", e === "12" ? "12" : void 0)
				});
			}
			var ee = I(T, 2), te = (e) => {
				{
					let t = /* @__PURE__ */ A(() => J("calendar.weekStart")), n = /* @__PURE__ */ A(() => J("tip.calendar.weekStart")), i = /* @__PURE__ */ A(() => ["mon", "sun"].includes(R(r).props.weekStart) ? R(r).props.weekStart : "auto"), o = /* @__PURE__ */ A(() => [
						["auto", J("calendar.weekStart.auto")],
						["mon", J("calendar.weekStart.mon")],
						["sun", J("calendar.weekStart.sun")]
					]);
					Uu(e, {
						get label() {
							return R(t);
						},
						get title() {
							return R(n);
						},
						get value() {
							return R(i);
						},
						get options() {
							return R(o);
						},
						onchange: (e) => a("weekStart", e === "auto" ? void 0 : e)
					});
				}
			}, ne = /* @__PURE__ */ A(() => [
				"month",
				"week",
				"year",
				"agenda"
			].includes(mc(R(r).props)) || R(r).props.design === "bento" || R(r).props.switcher === !0);
			U(ee, (e) => {
				R(ne) && e(te);
			});
			var re = I(ee, 2), E = (e) => {
				var t = ef(), n = P(t);
				{
					let e = /* @__PURE__ */ A(() => J("calendar.nextCount")), t = /* @__PURE__ */ A(() => J("tip.calendar.nextCount")), i = /* @__PURE__ */ A(() => String(Math.min(3, Math.max(1, Number(R(r).props.nextCount) || 1))));
					Uu(n, {
						get label() {
							return R(e);
						},
						get title() {
							return R(t);
						},
						get value() {
							return R(i);
						},
						options: [
							["1", "1"],
							["2", "2"],
							["3", "3"]
						],
						onchange: (e) => a("nextCount", Number(e))
					});
				}
				var i = I(n, 2), o = N(i), s = F(o, !0), c = I(o, 2);
				G(c);
				var l = F(I(c, 2), !0);
				D(i), L((e, t) => {
					q(i, "title", e), H(s, t), K(c, R(r).props.laterCount ?? 0), H(l, R(r).props.laterCount ?? 0);
				}, [() => J("tip.calendar.laterCount"), () => J("calendar.laterCount")]), z("input", c, (e) => a("laterCount", e.target.valueAsNumber)), V(e, t);
			};
			U(re, (e) => {
				R(r).props.view === "next" && e(E);
			}), L((e, t, n, i) => {
				q(y, "title", e), Ni(b, R(r).props.showCancelled !== !1), H(x, ` ${t ?? ""}`), q(S, "title", n), Ni(C, R(r).props.structuredData !== !1), H(w, ` ${i ?? ""}`);
			}, [
				() => J("tip.calendar.showCancelled"),
				() => J("calendar.showCancelled"),
				() => J("tip.calendar.structuredData"),
				() => J("calendar.structuredData")
			]), z("change", b, (e) => a("showCancelled", e.target.checked ? void 0 : !1)), z("change", C, (e) => a("structuredData", e.target.checked ? void 0 : !1)), V(e, t);
		}, o = (e) => {
			var t = rf(), n = P(t), i = (e) => {
				var t = qd(), n = N(t);
				G(n);
				var i = I(n);
				D(t), L((e, a) => {
					q(t, "title", e), Ni(n, R(r).props.showCategories === !0), H(i, ` ${a ?? ""}`);
				}, [() => J("tip.calendar.showCategories"), () => J("calendar.showCategories")]), z("change", n, (e) => a("showCategories", e.target.checked)), V(e, t);
			}, o = /* @__PURE__ */ A(() => !pc(R(r).props.design).ownFilter);
			U(n, (e) => {
				R(o) && e(i);
			});
			var s = I(n, 2), c = N(s);
			G(c);
			var l = I(c);
			D(s);
			var u = I(s, 2), d = (e) => {
				var t = qd(), n = N(t);
				G(n);
				var i = I(n);
				D(t), L((e, a) => {
					q(t, "title", e), Ni(n, R(r).props.showEarlier === !0), H(i, ` ${a ?? ""}`);
				}, [() => J("tip.calendar.showEarlier"), () => J("calendar.showEarlier")]), z("change", n, (e) => a("showEarlier", e.target.checked ? !0 : void 0)), V(e, t);
			}, f = /* @__PURE__ */ A(() => ![
				"month",
				"week",
				"day",
				"year"
			].includes(mc(R(r).props)));
			U(u, (e) => {
				R(f) && e(d);
			});
			var p = I(u, 2), m = N(p), h = N(m);
			G(h);
			var g = I(h);
			D(m), Ws(I(m, 2), { id: "subscribe" }), D(p);
			var _ = I(p, 2), v = N(_);
			G(v);
			var y = I(v);
			D(_);
			var b = I(_, 2), x = N(b);
			G(x);
			var S = I(x);
			D(b);
			var C = I(b, 2), w = (e) => {
				var t = qd(), n = N(t);
				G(n);
				var i = I(n);
				D(t), L((e, a) => {
					q(t, "title", e), Ni(n, R(r).props.showOpen !== !1), H(i, ` ${a ?? ""}`);
				}, [() => J("tip.calendar.showOpen"), () => J("calendar.showOpen")]), z("change", n, (e) => a("showOpen", e.target.checked ? void 0 : !1)), V(e, t);
			}, T = /* @__PURE__ */ A(() => pc(R(r).props.design).open);
			U(C, (e) => {
				R(T) && e(w);
			});
			var ee = I(C, 2), te = (e) => {
				var t = nf(), n = N(t), i = I(n);
				G(i), D(t), L((e, a) => {
					q(t, "title", e), H(n, `${a ?? ""} `), K(i, R(r).props.programHref ?? "");
				}, [() => J("tip.calendar.programHref"), () => J("calendar.programHref")]), z("change", i, (e) => a("programHref", e.target.value.trim() || void 0)), V(e, t);
			}, ne = /* @__PURE__ */ A(() => pc(R(r).props.design).program);
			U(ee, (e) => {
				R(ne) && e(te);
			}), L((e, t, n, i, a, o) => {
				q(s, "title", e), Ni(c, R(r).props.showSearch === !0), H(l, ` ${t ?? ""}`), Ni(h, R(r).props.showSubscribe !== !1), H(g, ` ${n ?? ""}`), Ni(v, R(r).props.showSignup === !0), H(y, ` ${i ?? ""}`), q(b, "title", a), Ni(x, R(r).props.showAdd !== !1), H(S, ` ${o ?? ""}`);
			}, [
				() => J("tip.calendar.showSearch"),
				() => J("calendar.showSearch"),
				() => J("calendar.showSubscribe"),
				() => J("calendar.showSignup"),
				() => J("tip.calendar.showAdd"),
				() => J("calendar.showAdd")
			]), z("change", c, (e) => a("showSearch", e.target.checked ? !0 : void 0)), z("change", h, (e) => a("showSubscribe", e.target.checked)), z("change", v, (e) => a("showSignup", e.target.checked)), z("change", x, (e) => a("showAdd", e.target.checked ? void 0 : !1)), V(e, t);
		}, l = (e) => {
			var t = af(), n = P(t), i = N(n), o = I(i);
			G(o), D(n);
			var s = I(n, 2), c = N(s), l = I(c);
			{
				let e = /* @__PURE__ */ A(() => R(r).props.emptyIcon === "none" ? "" : R(r).props.emptyIcon ?? "calendar"), t = /* @__PURE__ */ A(() => J("tip.calendar.emptyIcon"));
				qo(l, {
					iconsOnly: !0,
					get icon() {
						return R(e);
					},
					klass: "lbtn-mark",
					get label() {
						return R(t);
					},
					onpick: (e) => a("emptyIcon", e.icon || "none"),
					children: (e, t) => {
						var n = Vr(), i = P(n), a = (e) => {
							var t = Vr();
							W(P(t), () => yo(R(r).props.emptyIcon ?? "calendar") || yo("calendar")), V(e, t);
						};
						U(i, (e) => {
							R(r).props.emptyIcon !== "none" && e(a);
						}), V(e, n);
					},
					$$slots: { default: !0 }
				});
			}
			D(s), L((e, t, a, l, u) => {
				q(n, "title", e), H(i, `${t ?? ""} `), K(o, R(r).props.emptyText ?? ""), q(o, "placeholder", a), q(s, "title", l), H(c, `${u ?? ""} `);
			}, [
				() => J("tip.calendar.emptyText"),
				() => J("calendar.emptyText"),
				() => J("calendar.emptyPh"),
				() => J("tip.calendar.emptyIcon"),
				() => J("calendar.emptyIcon")
			]), z("change", o, (e) => a("emptyText", e.target.value.trim() || void 0)), V(e, t);
		}, d = (e) => {
			var t = Vr(), n = P(t), i = (e) => {
				var t = cf(), n = P(t), i = N(n);
				G(i);
				var o = I(i);
				D(n);
				var s = I(n, 2), c = (e) => {
					var t = sf(), n = P(t), i = (e) => {
						{
							let t = /* @__PURE__ */ A(() => J("calendar.noticeAs")), n = /* @__PURE__ */ A(() => J("tip.calendar.noticeAs")), i = /* @__PURE__ */ A(() => R(r).props.notice?.as === "band" ? "band" : "note"), o = /* @__PURE__ */ A(() => [["note", J("calendar.noticeAsNote")], ["band", J("calendar.noticeAsBand")]]);
							Uu(e, {
								get label() {
									return R(t);
								},
								get title() {
									return R(n);
								},
								get value() {
									return R(i);
								},
								get options() {
									return R(o);
								},
								onchange: (e) => a("notice", {
									...R(r).props.notice ?? {},
									as: e === "band" ? "band" : void 0
								})
							});
						}
					}, o = /* @__PURE__ */ A(() => pc(R(r).props.design).noticeBand);
					U(n, (e) => {
						R(o) && e(i);
					});
					var s = I(n, 2), c = N(s), l = I(c);
					G(l), D(s);
					var u = I(s, 2), d = (e) => {
						var t = of(), n = N(t), r = I(n);
						ft(r), D(t), L((e, i, a) => {
							q(t, "title", e), H(n, `${i ?? ""} `), K(r, a);
						}, [
							() => J("tip.calendar.noticeBody"),
							() => J("calendar.noticeBody"),
							() => g("noticeText")
						]), z("change", r, (e) => _("noticeText", e.target.value)), V(e, t);
					}, f = /* @__PURE__ */ A(() => R(r).props.notice?.as !== "band" || !pc(R(r).props.design).noticeBand);
					U(u, (e) => {
						R(f) && e(d);
					});
					var p = I(u, 2), m = N(p), h = I(m);
					G(h), D(p), L((e, t, n, i, a, o) => {
						q(s, "title", e), H(c, `${t ?? ""} `), K(l, n), q(l, "placeholder", i), q(p, "title", a), H(m, `${o ?? ""} `), K(h, R(r).props.notice?.href ?? "");
					}, [
						() => J("tip.calendar.noticeHeading"),
						() => J("calendar.noticeHeading"),
						() => g("noticeTitle"),
						() => J("calendar.noticeTitleHint"),
						() => J("tip.calendar.noticeHref"),
						() => J("calendar.noticeHref")
					]), z("change", l, (e) => _("noticeTitle", e.target.value)), z("change", h, (e) => a("notice", {
						...R(r).props.notice ?? {},
						href: e.target.value.trim() || void 0
					})), V(e, t);
				};
				U(s, (e) => {
					R(r).props.notice?.show === !0 && e(c);
				}), L((e, t) => {
					q(n, "title", e), Ni(i, R(r).props.notice?.show === !0), H(o, ` ${t ?? ""}`);
				}, [() => J("tip.calendar.showNotice"), () => J("calendar.showNotice")]), z("change", i, (e) => a("notice", {
					...R(r).props.notice ?? {},
					show: e.target.checked
				})), V(e, t);
			}, o = /* @__PURE__ */ A(() => pc(R(r).props.design).notice);
			U(n, (e) => {
				R(o) && e(i);
			}), V(e, t);
		}, f = /* @__PURE__ */ A(re);
		var p = uf(), m = P(p);
		{
			let e = /* @__PURE__ */ A(() => J("calendar.sources"));
			nu(m, {
				id: "cal-sources",
				get title() {
					return R(e);
				},
				get value() {
					return R(f).sources;
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var h = I(m, 2);
		{
			let e = /* @__PURE__ */ A(() => J("calendar.group.view"));
			nu(h, {
				id: "cal-view",
				get title() {
					return R(e);
				},
				get value() {
					return R(f).view;
				},
				get reset() {
					return R(f).viewReset;
				},
				children: (e, t) => {
					i(e);
				},
				$$slots: { default: !0 }
			});
		}
		var v = I(h, 2);
		{
			let e = /* @__PURE__ */ A(() => J("calendar.group.buttons"));
			nu(v, {
				id: "cal-buttons",
				get title() {
					return R(e);
				},
				get value() {
					return R(f).buttons;
				},
				get reset() {
					return R(f).buttonsReset;
				},
				children: (e, t) => {
					o(e);
				},
				$$slots: { default: !0 }
			});
		}
		var y = I(v, 2);
		{
			let e = /* @__PURE__ */ A(() => J("calendar.group.empty"));
			nu(y, {
				id: "cal-empty",
				get title() {
					return R(e);
				},
				get value() {
					return R(f).empty;
				},
				get reset() {
					return R(f).emptyReset;
				},
				children: (e, t) => {
					l(e);
				},
				$$slots: { default: !0 }
			});
		}
		var b = I(y, 2), S = (e) => {
			{
				let t = /* @__PURE__ */ A(() => J("calendar.group.notice"));
				nu(e, {
					id: "cal-notice",
					get title() {
						return R(t);
					},
					get value() {
						return R(f).notice;
					},
					get reset() {
						return R(f).noticeReset;
					},
					children: (e, t) => {
						d(e);
					},
					$$slots: { default: !0 }
				});
			}
		}, E = /* @__PURE__ */ A(() => pc(R(r).props.design).notice);
		U(b, (e) => {
			R(E) && e(S);
		});
		var ie = I(b, 2), ae = (e) => {
			var t = lf(), n = F(t, !0);
			L((e, r) => {
				q(t, "title", e), H(n, r);
			}, [() => J("tip.calendar.resetTexts"), () => J("calendar.resetTexts")]), z("click", t, () => a("texts", Tc(R(r).props.texts))), V(e, t);
		}, oe = /* @__PURE__ */ A(() => wc(pc(R(r).props.design), R(r).props.texts));
		U(ie, (e) => {
			R(oe) && e(ae);
		}), V(e, p);
	}, oe = (e) => {
		let t = (e) => {
			var t = Vr(), n = P(t), i = (e) => {
				let t = /* @__PURE__ */ A(() => dc(R(r).props));
				var n = Vr();
				ni(P(n), 17, () => uc(R(r).props.design).filter((e) => fc(e, R(t))), (e) => e.key, (e, n) => {
					var r = Vr(), i = P(r), a = (e) => {
						var r = qd(), i = N(r);
						G(i);
						var a = I(i);
						D(r), L((e) => {
							Ni(i, R(t)[R(n).key]), H(a, ` ${e ?? ""}`);
						}, [() => J(R(n).labelKey)]), z("change", i, (e) => f(R(n), e.target.checked)), V(e, r);
					}, o = (e) => {
						var r = df(), i = N(r), a = I(i);
						G(a), D(r), L((e, o, s) => {
							q(r, "title", e), H(i, `${o ?? ""} `), K(a, R(t)[R(n).key] ?? ""), q(a, "placeholder", s);
						}, [
							() => J("tip.calendar.opt.hours"),
							() => J(R(n).labelKey),
							() => J("calendar.opt.columns.auto")
						]), z("change", a, (e) => f(R(n), e.target.value === "" ? null : Math.max(0, Math.min(24, Math.round(Number(e.target.value)) || 0)))), V(e, r);
					}, s = (e) => {
						var r = ff(), i = N(r), a = F(i, !0), o = I(i, 2);
						{
							let e = /* @__PURE__ */ A(() => R(n).values.map((e) => [e, p(R(n), e)]));
							Y(o, {
								get value() {
									return R(t)[R(n).key];
								},
								get options() {
									return R(e);
								},
								onchange: (e) => f(R(n), e)
							});
						}
						D(r), L((e) => H(a, e), [() => J(R(n).labelKey)]), V(e, r);
					}, c = (e) => {
						{
							let r = /* @__PURE__ */ A(() => J(R(n).labelKey)), i = /* @__PURE__ */ A(() => R(n).values.map((e) => [e, p(R(n), e)]));
							Uu(e, {
								get label() {
									return R(r);
								},
								get value() {
									return R(t)[R(n).key];
								},
								get options() {
									return R(i);
								},
								onchange: (e) => f(R(n), e)
							});
						}
					};
					U(i, (e) => {
						R(n).kind === "switch" ? e(a) : R(n).kind === "hour" ? e(o, 1) : R(n).values.length > 4 ? e(s, 2) : e(c, -1);
					}), V(e, r);
				}), V(e, n);
			}, a = /* @__PURE__ */ A(() => uc(R(r).props.design).length);
			U(n, (e) => {
				R(a) && e(i);
			}), V(e, t);
		}, i = (e) => {
			var t = Vr();
			ni(P(t), 19, () => m(R(s)), (e) => e.section, (e, t, n) => {
				var i = hf(), a = P(i), o = (e) => {
					var n = pf(), r = F(n, !0);
					L((e) => H(r, e), [() => J(`calendar.section.${R(t).section}`)]), V(e, n);
				};
				U(a, (e) => {
					R(n) > 0 && e(o);
				});
				var s = I(a, 2);
				ni(s, 21, () => R(t).slots, (e) => e.key, (e, t) => {
					var n = mf(), i = N(n);
					{
						let e = /* @__PURE__ */ A(() => R(r).props.colors?.[R(t).key] ?? ""), n = /* @__PURE__ */ A(u), a = /* @__PURE__ */ A(() => J(R(t).labelKey));
						Pa(i, {
							get value() {
								return R(e);
							},
							get tokens() {
								return R(n);
							},
							allowClear: !0,
							get label() {
								return R(a);
							},
							onchange: (e) => v(R(t).key, e || "")
						});
					}
					var a = F(I(i, 2), !0);
					D(n), L((e, t) => {
						q(n, "title", e), H(a, t);
					}, [() => J("tip.calendar.slot"), () => J(R(t).labelKey)]), V(e, n);
				}), D(s), V(e, i);
			}), V(e, t);
		}, a = (e) => {
			var t = cf(), n = P(t), i = N(n);
			G(i);
			var a = I(i);
			D(n);
			var o = I(n, 2), c = (e) => {
				var t = ff(), n = N(t), i = F(n, !0), a = I(n, 2);
				{
					let e = /* @__PURE__ */ A(() => R(r).props.stripe?.color ?? ""), t = /* @__PURE__ */ A(u), n = /* @__PURE__ */ A(() => J("calendar.stripeColor"));
					Pa(a, {
						get value() {
							return R(e);
						},
						get tokens() {
							return R(t);
						},
						allowClear: !0,
						get label() {
							return R(n);
						},
						onchange: (e) => y({ color: e || void 0 })
					});
				}
				D(t), L((e, n) => {
					q(t, "title", e), H(i, n);
				}, [() => J("tip.calendar.stripeColor"), () => J("calendar.stripeColor")]), V(e, t);
			}, l = /* @__PURE__ */ A(() => bc(R(s), R(r).props.stripe).show);
			U(o, (e) => {
				R(l) && e(c);
			}), L((e, t, r) => {
				q(n, "title", e), Ni(i, t), H(a, ` ${r ?? ""}`);
			}, [
				() => J("tip.calendar.stripe"),
				() => bc(R(s), R(r).props.stripe).show,
				() => J("calendar.stripe")
			]), z("change", i, (e) => y({ show: e.target.checked })), V(e, t);
		}, o = (e) => {
			var t = gf(), n = P(t);
			{
				let e = /* @__PURE__ */ A(() => Ks.map((e) => [e, J(`calendar.field.${e}`)]));
				Y(n, {
					get value() {
						return R(Wd);
					},
					get options() {
						return R(e);
					},
					onchange: (e) => M(Wd, e, !0)
				});
			}
			var r = I(n, 2), i = N(r), a = I(i);
			{
				let e = /* @__PURE__ */ A(() => h().font ?? ""), t = /* @__PURE__ */ A(() => [["", J("common.inherit")], ...Hd.map(([e, t]) => [t, J(e)])]);
				Y(a, {
					get value() {
						return R(e);
					},
					get options() {
						return R(t);
					},
					onchange: (e) => b({ font: e || void 0 })
				});
			}
			D(r);
			var o = I(r, 2), s = N(o), c = I(s);
			G(c), D(o);
			var l = I(o, 2);
			{
				let e = /* @__PURE__ */ A(() => J("calendar.fieldWeight")), t = /* @__PURE__ */ A(() => h().bold === !0 ? "bold" : h().bold === !1 ? "normal" : ""), n = /* @__PURE__ */ A(() => [
					["", J("common.inherit")],
					["bold", J("format.bold")],
					["normal", J("calendar.fieldNormal")]
				]);
				Uu(l, {
					get label() {
						return R(e);
					},
					get value() {
						return R(t);
					},
					get options() {
						return R(n);
					},
					onchange: (e) => b({ bold: e === "bold" || e !== "normal" && void 0 })
				});
			}
			var d = I(l, 2), f = N(d);
			let p;
			var m = F(N(f), !0);
			D(f);
			var g = I(f, 2);
			let _;
			var v = F(N(g), !0);
			D(g);
			var y = I(g, 2);
			{
				let e = /* @__PURE__ */ A(() => h().color ?? ""), t = /* @__PURE__ */ A(u), n = /* @__PURE__ */ A(() => J("calendar.fieldColor"));
				Pa(y, {
					get value() {
						return R(e);
					},
					get tokens() {
						return R(t);
					},
					allowClear: !0,
					get label() {
						return R(n);
					},
					onchange: (e) => b({ color: e || void 0 })
				});
			}
			D(d), L((e, t, n, r, a, l, u, d, h, y, b) => {
				H(i, `${e ?? ""} `), q(o, "title", t), H(s, `${n ?? ""} `), q(c, "min", xc.min), q(c, "max", xc.max), K(c, r), q(c, "placeholder", a), p = Ei(f, 1, "tbtn", null, p, { active: l }), q(f, "title", u), H(m, d), _ = Ei(g, 1, "tbtn", null, _, { active: h }), q(g, "title", y), H(v, b);
			}, [
				() => J("calendar.fieldFont"),
				() => J("tip.calendar.fieldSize"),
				() => J("calendar.fieldSize"),
				() => h().size ?? "",
				() => J("common.inherit"),
				() => h().italic === !0,
				() => J("format.italic"),
				() => J("format.italicLetter"),
				() => h().underline === !0,
				() => J("calendar.fieldUnderline"),
				() => J("format.underlineLetter")
			]), z("change", c, (e) => b({ size: e.target.value === "" ? void 0 : Math.max(xc.min, Math.min(xc.max, Number(e.target.value) || xc.min)) })), z("click", f, () => b({ italic: !h().italic || void 0 })), z("click", g, () => b({ underline: !h().underline || void 0 })), V(e, t);
		}, s = /* @__PURE__ */ A(() => pc(R(r).props.design)), c = /* @__PURE__ */ A(re);
		var l = _f(), d = P(l), g = N(d), _ = N(g), x = F(_, !0), S = F(I(_), !0);
		D(g), Ws(I(g, 2), { id: "design" }), D(d);
		var C = I(d, 2);
		{
			let e = /* @__PURE__ */ A(() => J("calendar.section.options"));
			nu(C, {
				id: "cal-opts",
				get title() {
					return R(e);
				},
				get value() {
					return R(c).opts;
				},
				get reset() {
					return R(c).optsReset;
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var w = I(C, 2);
		{
			let e = /* @__PURE__ */ A(() => J("calendar.colors"));
			nu(w, {
				id: "cal-colors",
				get title() {
					return R(e);
				},
				get value() {
					return R(c).colors;
				},
				get reset() {
					return R(c).colorsReset;
				},
				children: (e, t) => {
					i(e);
				},
				$$slots: { default: !0 }
			});
		}
		var T = I(w, 2);
		{
			let e = /* @__PURE__ */ A(() => J("calendar.stripe"));
			nu(T, {
				id: "cal-stripe",
				get title() {
					return R(e);
				},
				get value() {
					return R(c).stripe;
				},
				get reset() {
					return R(c).stripeReset;
				},
				children: (e, t) => {
					a(e);
				},
				$$slots: { default: !0 }
			});
		}
		var ee = I(T, 2);
		{
			let e = /* @__PURE__ */ A(() => J("calendar.fieldStyle"));
			nu(ee, {
				id: "cal-fields",
				get title() {
					return R(e);
				},
				get value() {
					return R(c).fields;
				},
				get reset() {
					return R(c).fieldsReset;
				},
				children: (e, t) => {
					o(e);
				},
				$$slots: { default: !0 }
			});
		}
		L((e, t, n) => {
			q(g, "title", e), H(x, t), H(S, n);
		}, [
			() => J("tip.calendar.design"),
			() => J("calendar.design"),
			() => J(R(s).labelKey)
		]), z("click", g, function(...e) {
			n.openDesignPicker?.apply(this, e);
		}), V(e, l);
	};
	U(ie, (e) => {
		t.area === "content" ? e(ae) : t.area === "style" && e(oe, 1);
	}), V(e, E), et();
}
Mr([
	"click",
	"change",
	"input"
]);
//#endregion
//#region src/menu/families/Form.svelte
var yf = /* @__PURE__ */ B("<label> <input/></label>"), bf = /* @__PURE__ */ B("<label> <input/></label> <label> <input/></label>", 1), xf = /* @__PURE__ */ B("<input/>"), Sf = /* @__PURE__ */ B("<span class=\"nav-line\"><input/> <!> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!>", 1), Cf = /* @__PURE__ */ B("<label> <!></label> <!> <p class=\"panel-strong\"> </p> <!> <button class=\"ghost action\"> </button> <label> <input/></label> <label> <input/></label>", 1);
function wf(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a } = n, o = [
		"text",
		"email",
		"tel",
		"textarea",
		"select",
		"checkbox",
		"radio",
		"date"
	], s = /* @__PURE__ */ new Set(["select", "radio"]), c = () => "f" + [...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(3))].map((e) => e.toString(16).padStart(2, "0")).join("");
	function l(e, t) {
		i(`edit:${R(r).blockId}:field${e}`, (n) => {
			let r = {
				...n.props.fields[e],
				...t
			};
			s.has(r.type) ? r.options ??= [] : delete r.options, n.props.fields[e] = r;
		});
	}
	function u(e, t) {
		l(e, { options: String(t).split(",").map((e) => e.trim()).filter(Boolean) });
	}
	function d() {
		i("form-field", (e) => {
			(e.props.fields ??= []).push({
				id: c(),
				label: J("form.newField"),
				type: "text",
				required: !1
			});
		});
	}
	function f(e) {
		i("form-field", (t) => {
			t.props.fields.splice(e, 1);
		});
	}
	function p(e, t) {
		let n = e + t;
		i("form-field", (t) => {
			n < 0 || n >= t.props.fields.length || ([t.props.fields[e], t.props.fields[n]] = [t.props.fields[n], t.props.fields[e]]);
		});
	}
	var m = Vr(), h = P(m), g = (e) => {
		var t = Cf(), n = P(t), i = N(n), c = I(i);
		{
			let e = /* @__PURE__ */ A(() => R(r).props.mode ?? "mailto"), t = /* @__PURE__ */ A(() => [["mailto", J("form.modeMailto")], ["endpoint", J("form.modeEndpoint")]]);
			Y(c, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => a("mode", e)
			});
		}
		D(n);
		var m = I(n, 2), h = (e) => {
			var t = yf(), n = N(t), i = I(n);
			G(i), D(t), L((e, a, o) => {
				q(t, "title", e), H(n, `${a ?? ""} `), K(i, R(r).props.endpoint ?? ""), q(i, "placeholder", o);
			}, [
				() => J("form.endpointNote"),
				() => J("form.endpoint"),
				() => J("form.endpointPh")
			]), z("change", i, (e) => a("endpoint", e.target.value.trim())), V(e, t);
		}, g = (e) => {
			var t = bf(), n = P(t), i = N(n), o = I(i);
			G(o), D(n);
			var s = I(n, 2), c = N(s), l = I(c);
			G(l), D(s), L((e, t, n, a) => {
				H(i, `${e ?? ""} `), K(o, R(r).props.recipient ?? ""), q(o, "placeholder", t), H(c, `${n ?? ""} `), K(l, R(r).props.subject ?? ""), q(l, "placeholder", a);
			}, [
				() => J("form.recipient"),
				() => J("form.recipientPh"),
				() => J("form.subject"),
				() => J("form.subjectPh")
			]), z("change", o, (e) => a("recipient", e.target.value.trim())), z("change", l, (e) => a("subject", e.target.value.trim())), V(e, t);
		};
		U(m, (e) => {
			(R(r).props.mode ?? "mailto") === "endpoint" ? e(h) : e(g, -1);
		});
		var _ = I(m, 2), v = F(_, !0), y = I(_, 2);
		ni(y, 19, () => R(r).props.fields ?? [], (e, t) => e.id ?? t, (e, t, n) => {
			var i = Sf(), a = P(i), c = N(a);
			G(c);
			var d = I(c, 2);
			{
				let e = /* @__PURE__ */ A(() => R(t).type ?? "text"), r = /* @__PURE__ */ A(() => o.map((e) => [e, J(`form.type${e[0].toUpperCase()}${e.slice(1)}`)]));
				Y(d, {
					get value() {
						return R(e);
					},
					get options() {
						return R(r);
					},
					onchange: (e) => l(R(n), { type: e })
				});
			}
			var m = I(d, 2), h = N(m);
			W(h, () => X.up, !0), D(h);
			var g = I(h, 2);
			W(g, () => X.down, !0), D(g);
			var _ = I(g, 2);
			W(_, () => X.cross, !0), D(_), D(m), D(a);
			var v = I(a, 2), y = N(v);
			G(y);
			var b = I(y);
			D(v);
			var x = I(v, 2), S = (e) => {
				var r = xf();
				G(r), L((e, t) => {
					K(r, e), q(r, "placeholder", t);
				}, [() => (R(t).options ?? []).join(", "), () => J("form.optionsPh")]), z("change", r, (e) => u(R(n), e.target.value)), V(e, r);
			}, C = /* @__PURE__ */ A(() => s.has(R(t).type));
			U(x, (e) => {
				R(C) && e(S);
			}), L((e, i, a) => {
				K(c, R(t).label), q(c, "placeholder", e), h.disabled = R(n) === 0, g.disabled = R(n) === (R(r).props.fields?.length ?? 0) - 1, q(_, "title", i), Ni(y, R(t).required === !0), H(b, ` ${a ?? ""}`);
			}, [
				() => J("form.fieldNamePh"),
				() => J("form.removeField"),
				() => J("form.required")
			]), z("change", c, (e) => l(R(n), { label: e.target.value.trim() || J("form.fieldFallback") })), z("click", h, () => p(R(n), -1)), z("click", g, () => p(R(n), 1)), z("click", _, () => f(R(n))), z("change", y, (e) => l(R(n), { required: e.target.checked })), V(e, i);
		});
		var b = I(y, 2), x = F(b, !0), S = I(b, 2), C = N(S), w = I(C);
		G(w), D(S);
		var T = I(S, 2), ee = N(T), te = I(ee);
		G(te), D(T), L((e, t, a, o, s, c, l, u) => {
			q(n, "title", e), H(i, `${t ?? ""} `), H(v, a), H(x, o), H(C, `${s ?? ""} `), K(w, R(r).props.submitLabel ?? ""), q(w, "placeholder", c), H(ee, `${l ?? ""} `), K(te, R(r).props.successText ?? ""), q(te, "placeholder", u);
		}, [
			() => J("form.modeTitle"),
			() => J("form.mode"),
			() => J("form.fields"),
			() => J("form.addField"),
			() => J("lbl.buttonText"),
			() => J("form.sendDefault"),
			() => J("form.receipt"),
			() => J("form.thanksDefault")
		]), z("click", b, d), z("change", w, (e) => a("submitLabel", e.target.value.trim() || J("form.sendDefault"))), z("change", te, (e) => a("successText", e.target.value.trim() || J("form.thanksDefault"))), V(e, t);
	};
	U(h, (e) => {
		t.area === "content" && e(g);
	}), V(e, m), et();
}
Mr(["change", "click"]);
//#endregion
//#region src/menu/families/Faq.svelte
var Tf = /* @__PURE__ */ B("<span class=\"nav-line\"><input/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span>"), Ef = /* @__PURE__ */ B("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <p class=\"panel-strong\"> </p> <!> <button class=\"ghost action\"> </button>", 1), Df = /* @__PURE__ */ B("<p class=\"panel-strong\"> </p> <!>", 1), Of = /* @__PURE__ */ B("<!> <!> <hr class=\"gridmenu-divider\"/>", 1);
function kf(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a } = n, o = ["cards", "list"];
	function s(e, t) {
		i(`edit:${R(r).blockId}:faq${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function c() {
		i("faq-item", (e) => {
			(e.props.items ??= []).push({
				q: J("seed.faq.newQ"),
				a: J("seed.faq.answer")
			});
		});
	}
	function l(e) {
		i("faq-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function u(e, t) {
		let n = e + t;
		i("faq-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	var d = Vr(), f = P(d), p = (e) => {
		var t = Ef(), n = P(t), i = N(n);
		G(i);
		var o = I(i);
		D(n);
		var d = I(n, 2), f = F(d, !0), p = I(d, 2);
		ni(p, 17, () => R(r).props.items ?? [], Qr, (e, t, n) => {
			var i = Tf(), a = N(i);
			G(a);
			var o = I(a, 2), c = N(o);
			c.disabled = n === 0, W(c, () => X.up, !0), D(c);
			var d = I(c, 2);
			W(d, () => X.down, !0), D(d);
			var f = I(d, 2);
			W(f, () => X.cross, !0), D(f), D(o), D(i), L((e, i) => {
				K(a, R(t).q), q(a, "title", e), d.disabled = n === (R(r).props.items?.length ?? 0) - 1, q(f, "title", i);
			}, [() => J("tip.faq.question"), () => J("tip.faq.remove")]), z("change", a, (e) => s(n, { q: e.target.value })), z("click", c, () => u(n, -1)), z("click", d, () => u(n, 1)), z("click", f, () => l(n)), V(e, i);
		});
		var m = I(p, 2), h = F(m, !0);
		L((e, t, r, a, s) => {
			q(n, "title", e), Ni(i, t), H(o, ` ${r ?? ""}`), H(f, a), H(h, s);
		}, [
			() => J("tip.faq.multi"),
			() => !!R(r).props.multi,
			() => J("lbl.faqMulti"),
			() => J("lbl.questions"),
			() => J("ui.addQuestion")
		]), z("change", i, (e) => a("multi", e.target.checked)), z("click", m, c), V(e, t);
	}, m = (e) => {
		var t = Of(), n = P(t);
		{
			let e = /* @__PURE__ */ A(() => J("lbl.variant")), t = /* @__PURE__ */ A(() => R(r).props.variant === "list" ? "list" : "cards"), i = /* @__PURE__ */ A(() => o.map((e) => [e, J(`opt.faqVariant.${e}`)]));
			Uu(n, {
				get label() {
					return R(e);
				},
				get value() {
					return R(t);
				},
				get options() {
					return R(i);
				},
				onchange: (e) => a("variant", e)
			});
		}
		var i = I(n, 2), s = (e) => {
			var t = Df(), n = P(t), r = F(n, !0);
			xu(I(n, 2), {}), L((e) => H(r, e), [() => J("lbl.cardStyle")]), V(e, t);
		};
		U(i, (e) => {
			R(r).props.variant !== "list" && e(s);
		}), Oe(2), V(e, t);
	};
	U(f, (e) => {
		t.area === "content" ? e(p) : t.area === "style" && e(m, 1);
	}), V(e, d), et();
}
Mr(["change", "click"]);
//#endregion
//#region src/menu/families/Timeline.svelte
var Af = /* @__PURE__ */ B("<span class=\"nav-line\"><input class=\"tl-year\"/> <input/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span> <input/>", 1), jf = /* @__PURE__ */ B("<p class=\"panel-strong\"> </p> <!> <button class=\"ghost action\"> </button>", 1), Mf = /* @__PURE__ */ B("<label> <!></label> <label> <!></label> <label> <!></label> <hr class=\"gridmenu-divider\"/>", 1);
function Nf(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, themeSwatches: o } = n;
	function s(e, t) {
		i(`edit:${R(r).blockId}:tl${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function c() {
		i("tl-item", (e) => {
			(e.props.items ??= []).push({
				year: "",
				title: J("seed.timeline.newTitle"),
				text: ""
			});
		});
	}
	function l(e) {
		i("tl-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function u(e, t) {
		let n = e + t;
		i("tl-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	var d = Vr(), f = P(d), p = (e) => {
		var t = jf(), n = P(t), i = F(n, !0), a = I(n, 2);
		ni(a, 17, () => R(r).props.items ?? [], Qr, (e, t, n) => {
			var i = Af(), a = P(i), o = N(a);
			G(o);
			var c = I(o, 2);
			G(c);
			var d = I(c, 2), f = N(d);
			f.disabled = n === 0, W(f, () => X.up, !0), D(f);
			var p = I(f, 2);
			W(p, () => X.down, !0), D(p);
			var m = I(p, 2);
			W(m, () => X.cross, !0), D(m), D(d), D(a);
			var h = I(a, 2);
			G(h), L((e, i, a, s, l, u) => {
				K(o, R(t).year), q(o, "placeholder", e), q(o, "title", i), K(c, R(t).title), q(c, "title", a), p.disabled = n === (R(r).props.items?.length ?? 0) - 1, q(m, "title", s), K(h, R(t).text), q(h, "placeholder", l), q(h, "title", u);
			}, [
				() => J("ph.tlYear"),
				() => J("tip.timeline.year"),
				() => J("tip.timeline.title"),
				() => J("tip.timeline.remove"),
				() => J("ph.tlText"),
				() => J("tip.timeline.text")
			]), z("change", o, (e) => s(n, { year: e.target.value })), z("change", c, (e) => s(n, { title: e.target.value })), z("click", f, () => u(n, -1)), z("click", p, () => u(n, 1)), z("click", m, () => l(n)), z("change", h, (e) => s(n, { text: e.target.value })), V(e, i);
		});
		var o = I(a, 2), d = F(o, !0);
		L((e, t) => {
			H(i, e), H(d, t);
		}, [() => J("lbl.timelineItems"), () => J("ui.addTlItem")]), z("click", o, c), V(e, t);
	}, m = (e) => {
		var t = Mf(), n = P(t), i = N(n), s = I(i);
		{
			let e = /* @__PURE__ */ A(() => R(r).props.variant ?? "left"), t = /* @__PURE__ */ A(() => [["left", J("opt.timeline.left")], ["alternating", J("opt.timeline.alternating")]]);
			Y(s, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => a("variant", e)
			});
		}
		D(n);
		var c = I(n, 2), l = N(c), u = I(l);
		{
			let e = /* @__PURE__ */ A(() => R(r).props.marker ?? "filled"), t = /* @__PURE__ */ A(() => [["filled", J("opt.timeline.filled")], ["ring", J("opt.timeline.ring")]]);
			Y(u, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => a("marker", e)
			});
		}
		D(c);
		var d = I(c, 2), f = N(d), p = I(f);
		{
			let e = /* @__PURE__ */ A(() => R(r).props.accent ?? "accent"), t = /* @__PURE__ */ A(o);
			Pa(p, {
				get value() {
					return R(e);
				},
				get tokens() {
					return R(t);
				},
				onchange: (e) => a("accent", e === "accent" ? null : e)
			});
		}
		D(d), Oe(2), L((e, t, n) => {
			H(i, `${e ?? ""} `), H(l, `${t ?? ""} `), H(f, `${n ?? ""} `);
		}, [
			() => J("lbl.variant"),
			() => J("lbl.timelineMarker"),
			() => J("lbl.color")
		]), V(e, t);
	};
	U(f, (e) => {
		t.area === "content" ? e(p) : t.area === "style" && e(m, 1);
	}), V(e, d), et();
}
Mr(["change", "click"]);
//#endregion
//#region src/menu/families/Quote.svelte
var Pf = /* @__PURE__ */ B("<label> <input/></label> <label> <input/></label> <label> <input/></label>", 1), Ff = /* @__PURE__ */ B("<button class=\"ghost\"> </button>"), If = /* @__PURE__ */ B("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <!>", 1), Lf = /* @__PURE__ */ B("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), Rf = /* @__PURE__ */ B("<label> <!></label> <!> <label> <!></label> <hr class=\"gridmenu-divider\"/>", 1);
function zf(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, compressOrTrim: o, imageErrorText: s, setStatus: c, themeSwatches: l } = n;
	async function u(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await o(t);
			i(`edit:${R(r).blockId}`, (t) => {
				t.props.image = e.dataUrl;
			});
		} catch (e) {
			c(s(e), "error");
		}
	}
	var d = Vr(), f = P(d), p = (e) => {
		var t = Pf(), n = P(t), i = N(n), o = I(i);
		G(o), D(n);
		var s = I(n, 2), c = N(s), l = I(c);
		G(l), D(s);
		var u = I(s, 2), d = N(u), f = I(d);
		G(f), D(u), L((e, t, n) => {
			H(i, `${e ?? ""} `), K(o, R(r).props.text ?? ""), H(c, `${t ?? ""} `), K(l, R(r).props.attribution ?? ""), H(d, `${n ?? ""} `), K(f, R(r).props.role ?? "");
		}, [
			() => J("lbl.quoteText"),
			() => J("lbl.quoteName"),
			() => J("lbl.quoteRole")
		]), z("change", o, (e) => a("text", e.target.value)), z("change", l, (e) => a("attribution", e.target.value)), z("change", f, (e) => a("role", e.target.value)), V(e, t);
	}, m = (e) => {
		var t = Rf(), n = P(t), i = N(n), o = I(i);
		{
			let e = /* @__PURE__ */ A(() => R(r).props.variant ?? "large"), t = /* @__PURE__ */ A(() => [["large", J("opt.quote.large")], ["short", J("opt.quote.short")]]);
			Y(o, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => a("variant", e)
			});
		}
		D(n);
		var s = I(n, 2), c = (e) => {
			var t = If(), n = P(t), i = N(n), o = I(i);
			D(n);
			var s = I(n, 2), c = (e) => {
				var t = Ff(), n = F(t, !0);
				L((e) => H(n, e), [() => J("ui.quotePortraitRemove")]), z("click", t, () => a("image", "")), V(e, t);
			};
			U(s, (e) => {
				R(r).props.image && e(c);
			}), L((e) => H(i, `${e ?? ""} `), [() => J("ui.quotePortrait")]), z("change", o, u), V(e, t);
		}, d = (e) => {
			var t = Lf(), n = N(t);
			G(n);
			var i = I(n);
			D(t), L((e, a) => {
				q(t, "title", e), Ni(n, R(r).props.card === !0), H(i, ` ${a ?? ""}`);
			}, [() => J("tip.quote.card"), () => J("lbl.quoteCard")]), z("change", n, (e) => a("card", e.target.checked)), V(e, t);
		};
		U(s, (e) => {
			R(r).props.variant === "short" ? e(c) : e(d, -1);
		});
		var f = I(s, 2), p = N(f), m = I(p);
		{
			let e = /* @__PURE__ */ A(() => R(r).props.accent ?? "accent"), t = /* @__PURE__ */ A(l);
			Pa(m, {
				get value() {
					return R(e);
				},
				get tokens() {
					return R(t);
				},
				onchange: (e) => a("accent", e === "accent" ? null : e)
			});
		}
		D(f), Oe(2), L((e, t) => {
			H(i, `${e ?? ""} `), H(p, `${t ?? ""} `);
		}, [() => J("lbl.variant"), () => J("lbl.color")]), V(e, t);
	};
	U(f, (e) => {
		t.area === "content" ? e(p) : t.area === "style" && e(m, 1);
	}), V(e, d), et();
}
Mr(["change", "click"]);
//#endregion
//#region src/menu/families/Stats.svelte
var Bf = /* @__PURE__ */ B("<label> <input/></label> <label> <input/></label> <label> <input/></label> <label> <input/></label>", 1), Vf = /* @__PURE__ */ B("<!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <hr class=\"gridmenu-divider\"/>", 1);
function Hf(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), { setBlockProp: i } = n, a = [
		"plain",
		"cards",
		"band"
	];
	var o = Vr(), s = P(o), c = (e) => {
		var t = Bf(), n = P(t), a = N(n), o = I(a);
		G(o), D(n);
		var s = I(n, 2), c = N(s), l = I(c);
		G(l), D(s);
		var u = I(s, 2), d = N(u), f = I(d);
		G(f), D(u);
		var p = I(u, 2), m = N(p), h = I(m);
		G(h), D(p), L((e, t, n, i, s) => {
			H(a, `${e ?? ""} `), K(o, R(r).props.value ?? ""), q(o, "title", t), H(c, `${n ?? ""} `), K(l, R(r).props.prefix ?? ""), H(d, `${i ?? ""} `), K(f, R(r).props.suffix ?? ""), H(m, `${s ?? ""} `), K(h, R(r).props.label ?? "");
		}, [
			() => J("lbl.statValue"),
			() => J("tip.stat.value"),
			() => J("lbl.statPrefix"),
			() => J("lbl.statSuffix"),
			() => J("lbl.statLabel")
		]), z("change", o, (e) => i("value", e.target.value)), z("change", l, (e) => i("prefix", e.target.value)), z("change", f, (e) => i("suffix", e.target.value)), z("change", h, (e) => i("label", e.target.value)), V(e, t);
	}, l = (e) => {
		var t = Vf(), n = P(t);
		{
			let e = /* @__PURE__ */ A(() => J("lbl.variant")), t = /* @__PURE__ */ A(() => a.includes(R(r).props.variant) ? R(r).props.variant : "plain"), o = /* @__PURE__ */ A(() => a.map((e) => [e, J(`opt.statVariant.${e}`)]));
			Uu(n, {
				get label() {
					return R(e);
				},
				get value() {
					return R(t);
				},
				get options() {
					return R(o);
				},
				onchange: (e) => i("variant", e)
			});
		}
		var o = I(n, 2), s = N(o);
		G(s);
		var c = I(s);
		D(o), Oe(2), L((e, t) => {
			q(o, "title", e), Ni(s, R(r).props.countUp !== !1), H(c, ` ${t ?? ""}`);
		}, [() => J("tip.stat.countUp"), () => J("lbl.statCountUp")]), z("change", s, (e) => i("countUp", e.target.checked)), V(e, t);
	};
	U(s, (e) => {
		t.area === "content" ? e(c) : t.area === "style" && e(l, 1);
	}), V(e, o), et();
}
Mr(["change"]);
//#endregion
//#region src/menu/families/Table.svelte
var Uf = /* @__PURE__ */ B("<span class=\"toolbar-row\"><button class=\"ghost\"> </button> <button class=\"ghost\"> </button></span> <span class=\"toolbar-row\"><button class=\"ghost\"> </button> <button class=\"ghost\"> </button></span> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), Wf = /* @__PURE__ */ B("<label> <!></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <hr class=\"gridmenu-divider\"/>", 1);
function Gf(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a } = n;
	function o(e, t) {
		i(`edit:${R(r).blockId}:table-form`, (n) => {
			let r = (Array.isArray(n.props.rows) && n.props.rows.length ? n.props.rows : [[""]]).map((e) => Array.isArray(e) ? e.map((e) => String(e ?? "")) : [""]), i = Math.max(1, ...r.map((e) => e.length));
			r = r.map((e) => [...e, ...Array(i - e.length).fill("")]), e > 0 ? r.push(Array(i).fill("")) : e < 0 && r.length > 1 && r.pop(), t > 0 ? r = r.map((e) => [...e, ""]) : t < 0 && i > 1 && (r = r.map((e) => e.slice(0, i - 1))), n.props.rows = r;
		});
	}
	var s = Vr(), c = P(s), l = (e) => {
		var t = Uf(), n = P(t), i = N(n), s = F(i, !0), c = I(i, 2), l = F(c, !0);
		D(n);
		var u = I(n, 2), d = N(u), f = F(d, !0), p = I(d, 2), m = F(p, !0);
		D(u);
		var h = I(u, 2), g = N(h);
		G(g);
		var _ = I(g);
		D(h), L((e, t, n, i, a, o) => {
			H(s, e), H(l, t), H(f, n), H(m, i), q(h, "title", a), Ni(g, R(r).props.header !== !1), H(_, ` ${o ?? ""}`);
		}, [
			() => J("ui.addRow"),
			() => J("ui.removeRow"),
			() => J("ui.addColumn"),
			() => J("ui.removeColumn"),
			() => J("tip.table.header"),
			() => J("lbl.tableHeader")
		]), z("click", i, () => o(1, 0)), z("click", c, () => o(-1, 0)), z("click", d, () => o(0, 1)), z("click", p, () => o(0, -1)), z("change", g, (e) => a("header", e.target.checked)), V(e, t);
	}, u = (e) => {
		var t = Wf(), n = P(t), i = N(n), o = I(i);
		{
			let e = /* @__PURE__ */ A(() => R(r).props.lines ?? "rows"), t = /* @__PURE__ */ A(() => [
				["rows", J("opt.table.rows")],
				["grid", J("opt.table.grid")],
				["none", J("common.none")]
			]);
			Y(o, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => a("lines", e)
			});
		}
		D(n);
		var s = I(n, 2), c = N(s);
		G(c);
		var l = I(c);
		D(s), Oe(2), L((e, t, n) => {
			H(i, `${e ?? ""} `), Ni(c, t), H(l, ` ${n ?? ""}`);
		}, [
			() => J("lbl.tableLines"),
			() => !!R(r).props.striped,
			() => J("lbl.tableStriped")
		]), z("change", c, (e) => a("striped", e.target.checked)), V(e, t);
	};
	U(c, (e) => {
		t.area === "content" ? e(l) : t.area === "style" && e(u, 1);
	}), V(e, s), et();
}
Mr(["click", "change"]);
//#endregion
//#region src/menu/families/Share.svelte
var Kf = /* @__PURE__ */ B("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), qf = /* @__PURE__ */ B("<label> <!></label> <label> <input type=\"number\" min=\"24\" max=\"64\"/></label> <label> <!></label> <hr class=\"gridmenu-divider\"/>", 1);
function Jf(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, themeSwatches: o } = n;
	function s(e, t) {
		i(`edit:${R(r).blockId}:share`, (n) => {
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
	var c = Vr(), l = P(c), u = (e) => {
		var t = Vr();
		ni(P(t), 17, () => [
			["facebook", "Facebook"],
			["x", "X"],
			["linkedin", "LinkedIn"],
			["whatsapp", "WhatsApp"],
			["email", J("opt.share.email")],
			["copy", J("opt.share.copy")]
		], ([e, t]) => e, (e, t) => {
			var n = /* @__PURE__ */ A(() => h(R(t), 2));
			let i = () => R(n)[0], a = () => R(n)[1];
			var o = Kf(), c = N(o);
			G(c);
			var l = I(c);
			D(o), L((e) => {
				Ni(c, e), H(l, ` ${a() ?? ""}`);
			}, [() => (R(r).props.services ?? []).includes(i())]), z("change", c, (e) => s(i(), e.target.checked)), V(e, o);
		}), V(e, t);
	}, d = (e) => {
		var t = qf(), n = P(t), i = N(n), s = I(i);
		{
			let e = /* @__PURE__ */ A(() => R(r).props.variant ?? "icons"), t = /* @__PURE__ */ A(() => [["icons", J("opt.share.icons")], ["labels", J("opt.share.labels")]]);
			Y(s, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => a("variant", e)
			});
		}
		D(n);
		var c = I(n, 2), l = N(c), u = I(l);
		G(u), D(c);
		var d = I(c, 2), f = N(d), p = I(f);
		{
			let e = /* @__PURE__ */ A(() => R(r).props.color || "accent"), t = /* @__PURE__ */ A(o);
			Pa(p, {
				get value() {
					return R(e);
				},
				get tokens() {
					return R(t);
				},
				onchange: (e) => a("color", e === "accent" ? "" : e)
			});
		}
		D(d), Oe(2), L((e, t, n) => {
			H(i, `${e ?? ""} `), H(l, `${t ?? ""} `), K(u, R(r).props.size ?? 38), H(f, `${n ?? ""} `);
		}, [
			() => J("lbl.variant"),
			() => J("lbl.size"),
			() => J("lbl.color")
		]), z("change", u, (e) => a("size", Number(e.target.value) || 38)), V(e, t);
	};
	U(l, (e) => {
		t.area === "content" ? e(u) : t.area === "style" && e(d, 1);
	}), V(e, c), et();
}
Mr(["change"]);
//#endregion
//#region src/menu/families/Countdown.svelte
var Yf = /* @__PURE__ */ B("<label> <input type=\"datetime-local\"/></label> <label> <input/></label>", 1), Xf = /* @__PURE__ */ B("<label> <!></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <hr class=\"gridmenu-divider\"/>", 1);
function Zf(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), { setBlockProp: i } = n;
	var a = Vr(), o = P(a), s = (e) => {
		var t = Yf(), n = P(t), a = N(n), o = I(a);
		G(o), D(n);
		var s = I(n, 2), c = N(s), l = I(c);
		G(l), D(s), L((e, t, n) => {
			H(a, `${e ?? ""} `), K(o, R(r).props.target ?? ""), q(s, "title", t), H(c, `${n ?? ""} `), K(l, R(r).props.doneText ?? "");
		}, [
			() => J("lbl.countdownTarget"),
			() => J("tip.countdown.done"),
			() => J("lbl.countdownDone")
		]), z("change", o, (e) => i("target", e.target.value)), z("change", l, (e) => i("doneText", e.target.value)), V(e, t);
	}, c = (e) => {
		var t = Xf(), n = P(t), a = N(n), o = I(a);
		{
			let e = /* @__PURE__ */ A(() => R(r).props.variant ?? "boxes"), t = /* @__PURE__ */ A(() => [["boxes", J("opt.countdown.boxes")], ["plain", J("opt.countdown.plain")]]);
			Y(o, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => i("variant", e)
			});
		}
		D(n);
		var s = I(n, 2), c = N(s);
		G(c);
		var l = I(c);
		D(s), Oe(2), L((e, t) => {
			H(a, `${e ?? ""} `), Ni(c, R(r).props.showSeconds !== !1), H(l, ` ${t ?? ""}`);
		}, [() => J("lbl.variant"), () => J("lbl.countdownSeconds")]), z("change", c, (e) => i("showSeconds", e.target.checked)), V(e, t);
	};
	U(o, (e) => {
		t.area === "content" ? e(s) : t.area === "style" && e(c, 1);
	}), V(e, a), et();
}
Mr(["change"]);
//#endregion
//#region src/menu/families/Audio.svelte
var Qf = /* @__PURE__ */ B("<button class=\"ghost\"> </button>"), $f = /* @__PURE__ */ B("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"audio/*\"/></label> <!> <label> <input/></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1);
function ep(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), { setBlockProp: i, setStatus: a } = n;
	function o(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		let n = new FileReader();
		n.onload = () => {
			i("src", String(n.result ?? "")), t.size > 4e5 && a(J("status.audioLarge", { kb: Math.round(t.size / 1024) }), "error");
		}, n.onerror = () => a(J("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	var s = Vr(), c = P(s), l = (e) => {
		var t = $f(), n = P(t), a = N(n), s = I(a);
		D(n);
		var c = I(n, 2), l = (e) => {
			var t = Qf(), n = F(t, !0);
			L((e) => H(n, e), [() => J("ui.removeAudio")]), z("click", t, () => i("src", "")), V(e, t);
		};
		U(c, (e) => {
			R(r).props.src && e(l);
		});
		var u = I(c, 2), d = N(u), f = I(d);
		G(f), D(u);
		var p = I(u, 2), m = N(p);
		G(m);
		var h = I(m);
		D(p), L((e, t, i, o, s) => {
			q(n, "title", e), H(a, `${t ?? ""} `), H(d, `${i ?? ""} `), K(f, R(r).props.title ?? ""), Ni(m, o), H(h, ` ${s ?? ""}`);
		}, [
			() => J("tip.blocks.audioFile"),
			() => J("ui.chooseAudio"),
			() => J("lbl.audioTitle"),
			() => !!R(r).props.loop,
			() => J("lbl.audioLoop")
		]), z("change", s, o), z("change", f, (e) => i("title", e.target.value)), z("change", m, (e) => i("loop", e.target.checked)), V(e, t);
	};
	U(c, (e) => {
		t.area === "content" && e(l);
	}), V(e, s), et();
}
Mr(["change", "click"]);
//#endregion
//#region src/menu/families/Collection.svelte
var tp = /* @__PURE__ */ B("<label> <!></label> <label> <input type=\"number\" min=\"0\" max=\"100\"/></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), np = /* @__PURE__ */ B("<label> <!></label> <hr class=\"gridmenu-divider\"/>", 1);
function rp(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), i = /* @__PURE__ */ A(() => n.collectionIds), a = /* @__PURE__ */ A(() => n.collectionsView), { setBlockProp: o } = n;
	var s = Vr(), c = P(s), l = (e) => {
		var t = tp(), n = P(t), s = N(n), c = I(s);
		{
			let e = /* @__PURE__ */ A(() => R(r).props.collection ?? ""), t = /* @__PURE__ */ A(() => [["", J("common.choose")], ...R(i).map((e) => [e, R(a)[e]?.name ?? e])]);
			Y(c, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => o("collection", e || null)
			});
		}
		D(n);
		var l = I(n, 2), u = N(l), d = I(u);
		G(d), D(l);
		var f = I(l, 2), p = N(f);
		G(p);
		var m = I(p);
		D(f), L((e, t, i, a, o) => {
			q(n, "title", e), H(s, `${t ?? ""} `), q(l, "title", i), H(u, `${a ?? ""} `), K(d, R(r).props.limit ?? 6), Ni(p, R(r).props.newestFirst !== !1), H(m, ` ${o ?? ""}`);
		}, [
			() => J("tip.collection.source"),
			() => J("blocks.collection"),
			() => J("tip.collection.limit"),
			() => J("lbl.maxCount"),
			() => J("lbl.newestFirst")
		]), z("change", d, (e) => o("limit", Number(e.target.value))), z("change", p, (e) => o("newestFirst", e.target.checked)), V(e, t);
	}, u = (e) => {
		var t = np(), n = P(t), i = N(n), a = I(i);
		{
			let e = /* @__PURE__ */ A(() => R(r).props.view ?? "cards"), t = /* @__PURE__ */ A(() => [
				["cards", J("opt.collectionView.cards")],
				["list", J("opt.collectionView.list")],
				["archive", J("opt.collectionView.archive")]
			]);
			Y(a, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => o("view", e)
			});
		}
		D(n), Oe(2), L((e) => H(i, `${e ?? ""} `), [() => J("lbl.view")]), V(e, t);
	};
	U(c, (e) => {
		t.area === "content" ? e(l) : t.area === "style" && e(u, 1);
	}), V(e, s), et();
}
Mr(["change"]);
//#endregion
//#region src/menu/families/Product.svelte
var ip = /* @__PURE__ */ B("<span class=\"toolbar-row\"><button class=\"ghost action\"> </button> <button class=\"ghost action\"> </button></span>"), ap = /* @__PURE__ */ B("<button class=\"ghost action\"> </button>"), op = /* @__PURE__ */ B("<label> <!></label> <!> <label> <input type=\"number\" min=\"0\" max=\"100\"/></label> <label> <input/></label>", 1), sp = /* @__PURE__ */ B("<label> <input type=\"number\" min=\"0\" max=\"6\"/></label> <hr class=\"gridmenu-divider\"/>", 1);
function cp(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), i = /* @__PURE__ */ A(() => n.collectionIds), a = /* @__PURE__ */ A(() => n.collectionsView), { setBlockProp: o, addCollectionEntry: s, createCatalogForBlock: c } = n;
	var l = Vr(), u = P(l), d = (e) => {
		var t = op(), l = P(t), u = N(l), d = I(u);
		{
			let e = /* @__PURE__ */ A(() => R(r).props.collection ?? ""), t = /* @__PURE__ */ A(() => [["", J("common.choose")], ...R(i).filter((e) => R(a)[e]?.kind === "products").map((e) => [e, R(a)[e]?.name ?? e])]);
			Y(d, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => o("collection", e || null)
			});
		}
		D(l);
		var f = I(l, 2), p = (e) => {
			var t = ip(), i = N(t), a = F(i, !0), o = I(i, 2), c = F(o, !0);
			D(t), L((e, t, n, r) => {
				q(i, "title", e), H(a, t), q(o, "title", n), H(c, r);
			}, [
				() => J("tip.product.addProduct"),
				() => J("ui.addProduct"),
				() => J("tip.product.editCatalog"),
				() => J("ui.editCatalog")
			]), z("click", i, () => s(R(r).props.collection)), z("click", o, () => n.openCollection(R(r).props.collection)), V(e, t);
		}, m = (e) => {
			var t = ap(), n = F(t, !0);
			L((e, r) => {
				q(t, "title", e), H(n, r);
			}, [() => J("tip.product.createCatalog"), () => J("ui.createCatalog")]), z("click", t, c), V(e, t);
		}, h = /* @__PURE__ */ A(() => !R(i).some((e) => R(a)[e]?.kind === "products"));
		U(f, (e) => {
			R(r).props.collection && R(a)[R(r).props.collection]?.kind === "products" ? e(p) : R(h) && e(m, 1);
		});
		var g = I(f, 2), _ = N(g), v = I(_);
		G(v), D(g);
		var y = I(g, 2), b = N(y), x = I(b);
		G(x), D(y), L((e, t, n, i, a, o) => {
			q(l, "title", e), H(u, `${t ?? ""} `), q(g, "title", n), H(_, `${i ?? ""} `), K(v, R(r).props.limit ?? 0), q(y, "title", a), H(b, `${o ?? ""} `), K(x, R(r).props.currency ?? "kr");
		}, [
			() => J("tip.product.source"),
			() => J("blocks.collection"),
			() => J("tip.collection.limit"),
			() => J("lbl.maxCount"),
			() => J("tip.product.currency"),
			() => J("lbl.currency")
		]), z("change", v, (e) => o("limit", Number(e.target.value))), z("change", x, (e) => o("currency", e.target.value)), V(e, t);
	}, f = (e) => {
		var t = sp(), n = P(t), i = N(n), a = I(i);
		G(a), D(n), Oe(2), L((e, t) => {
			q(n, "title", e), H(i, `${t ?? ""} `), K(a, R(r).props.columns ?? 0);
		}, [() => J("tip.product.columns"), () => J("lbl.columns")]), z("change", a, (e) => o("columns", Number(e.target.value))), V(e, t);
	};
	U(u, (e) => {
		t.area === "content" ? e(d) : t.area === "style" && e(f, 1);
	}), V(e, l), et();
}
Mr(["click", "change"]);
//#endregion
//#region src/menu/families/Cart.svelte
var lp = /* @__PURE__ */ B("<label> <!></label> <label> <input/></label>", 1), up = /* @__PURE__ */ B("<label> <!></label> <hr class=\"gridmenu-divider\"/>", 1);
function dp(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), i = /* @__PURE__ */ A(() => n.siteDraft), { setBlockProp: a } = n;
	var o = Vr(), s = P(o), c = (e) => {
		var t = lp(), n = P(t), o = N(n), s = I(o);
		{
			let e = /* @__PURE__ */ A(() => R(r).props.href ?? ""), t = /* @__PURE__ */ A(() => [["", J("common.none")], ...R(i).pages.map((e) => [e.path, e.title])]);
			Y(s, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => a("href", e)
			});
		}
		D(n);
		var c = I(n, 2), l = N(c), u = I(l);
		G(u), D(c), L((e, t, i, a) => {
			q(n, "title", e), H(o, `${t ?? ""} `), q(c, "title", i), H(l, `${a ?? ""} `), K(u, R(r).props.currency ?? "kr");
		}, [
			() => J("tip.cart.checkout"),
			() => J("lbl.checkoutPage"),
			() => J("tip.product.currency"),
			() => J("lbl.currency")
		]), z("change", u, (e) => a("currency", e.target.value)), V(e, t);
	}, l = (e) => {
		var t = up(), n = P(t), i = N(n), o = I(i);
		{
			let e = /* @__PURE__ */ A(() => R(r).props.variant ?? "button"), t = /* @__PURE__ */ A(() => [["button", J("opt.cart.button")], ["icon", J("opt.cart.icon")]]);
			Y(o, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => a("variant", e)
			});
		}
		D(n), Oe(2), L((e) => H(i, `${e ?? ""} `), [() => J("lbl.view")]), V(e, t);
	};
	U(s, (e) => {
		t.area === "content" ? e(c) : t.area === "style" && e(l, 1);
	}), V(e, o), et();
}
Mr(["change"]);
//#endregion
//#region src/menu/families/Checkout.svelte
var fp = /* @__PURE__ */ B("<label> <input type=\"email\"/></label> <label> <input type=\"url\"/></label> <label> <input/></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label> <input/></label>", 1);
function pp(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), { setBlockProp: i } = n;
	var a = Vr(), o = P(a), s = (e) => {
		var t = fp(), n = P(t), a = N(n), o = I(a);
		G(o), D(n);
		var s = I(n, 2), c = N(s), l = I(c);
		G(l), D(s);
		var u = I(s, 2), d = N(u), f = I(d);
		G(f), D(u);
		var p = I(u, 2), m = N(p);
		G(m);
		var h = I(m);
		D(p);
		var g = I(p, 2), _ = N(g), v = I(_);
		G(v), D(g), L((e, t, i, y, b, x, S, C, w, T) => {
			q(n, "title", e), H(a, `${t ?? ""} `), K(o, R(r).props.recipient ?? ""), q(s, "title", i), H(c, `${y ?? ""} `), K(l, R(r).props.endpoint ?? ""), q(u, "title", b), H(d, `${x ?? ""} `), K(f, R(r).props.vipps ?? ""), q(p, "title", S), Ni(m, R(r).props.vippsCheckout === !0), H(h, ` ${C ?? ""}`), q(g, "title", w), H(_, `${T ?? ""} `), K(v, R(r).props.currency ?? "kr");
		}, [
			() => J("tip.checkout.recipient"),
			() => J("lbl.recipientEmail"),
			() => J("tip.checkout.endpoint"),
			() => J("lbl.endpointUrl"),
			() => J("tip.checkout.vipps"),
			() => J("lbl.vippsNumber"),
			() => J("tip.checkout.vippsCheckout"),
			() => J("lbl.vippsCheckout"),
			() => J("tip.product.currency"),
			() => J("lbl.currency")
		]), z("change", o, (e) => i("recipient", e.target.value.trim())), z("change", l, (e) => i("endpoint", e.target.value.trim())), z("change", f, (e) => i("vipps", e.target.value.trim())), z("change", m, (e) => i("vippsCheckout", e.target.checked)), z("change", v, (e) => i("currency", e.target.value)), V(e, t);
	};
	U(o, (e) => {
		t.area === "content" && e(s);
	}), V(e, a), et();
}
Mr(["change"]);
//#endregion
//#region src/menu/families/Fields.svelte
var mp = sn({}), hp = sn({}), gp = /* @__PURE__ */ j(!1), _p = /* @__PURE__ */ B("<p> </p>"), vp = /* @__PURE__ */ B("<label> <input type=\"text\"/></label> <button class=\"ghost\"> </button> <!>", 1), yp = /* @__PURE__ */ B("<label> <input type=\"number\"/></label>"), bp = /* @__PURE__ */ B("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), xp = /* @__PURE__ */ B("<label> <!></label>"), Sp = /* @__PURE__ */ B("<label> <input type=\"text\"/></label>"), Cp = /* @__PURE__ */ B("<button class=\"ghost\"> </button>");
function wp(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), i = /* @__PURE__ */ A(() => n.pluginBlocks), { setBlockProp: a, setBlockProps: o } = n, s = (e, t) => (Number.isFinite(t) || (t = e.min ?? 0), e.min != null && (t = Math.max(e.min, t)), e.max != null && (t = Math.min(e.max, t)), t);
	async function c(e) {
		let t = R(r).blockId, n = `${t}:${e.key}`, i = (mp[n] ?? R(r).props[e.key] ?? "").trim();
		hp[n] = null;
		let a = i.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
		if (!i || a || /^https?:\/\//i.test(i)) {
			o(e.key, {
				[e.key]: i,
				lat: a ? Number(a[1]) : null,
				lon: a ? Number(a[2]) : null
			});
			return;
		}
		M(gp, !0), hp[n] = {
			text: J("props.place.searching"),
			err: !1
		};
		try {
			let a = await fetch(`/api/geocode?q=${encodeURIComponent(i)}`), s = await a.json().catch(() => null);
			if (R(r)?.blockId !== t) return;
			a.ok && Number.isFinite(s?.lat) ? (o(e.key, {
				[e.key]: i,
				lat: s.lat,
				lon: s.lon
			}), hp[n] = null) : hp[n] = {
				text: ca(s) ?? J("props.place.notFound"),
				err: !0
			};
		} catch {
			hp[n] = {
				text: J("props.place.failed"),
				err: !0
			};
		} finally {
			M(gp, !1);
		}
	}
	let l = { map: [{
		key: "location",
		type: "place",
		label: J("lbl.mapLocation"),
		placeholder: J("ph.mapLocation")
	}, {
		key: "zoom",
		type: "number",
		label: J("lbl.mapZoom"),
		min: 1,
		max: 19
	}] };
	var u = Vr(), d = P(u), f = (e) => {
		let t = /* @__PURE__ */ A(() => l[R(r).type] ?? R(i).find((e) => e.type === R(r).type)?.fields ?? []);
		var o = Vr(), u = P(o), d = (e) => {
			var n = Vr();
			ni(P(n), 17, () => R(t), (e) => e.key, (e, t) => {
				var n = Vr(), i = P(n), o = (e) => {
					let n = /* @__PURE__ */ A(() => `${R(r).blockId}:${R(t).key}`);
					var i = vp(), a = P(i), o = N(a), s = I(o);
					G(s), D(a);
					var l = I(a, 2), u = F(l, !0), d = I(l, 2), f = (e) => {
						var t = _p();
						let r;
						var i = F(t, !0);
						L(() => {
							r = Ei(t, 1, "panel-hint", null, r, { "place-error": hp[R(n)].err }), H(i, hp[R(n)].text);
						}), V(e, t);
					};
					U(d, (e) => {
						hp[R(n)] && e(f);
					}), L((e) => {
						H(o, `${R(t).label ?? ""} `), q(s, "placeholder", R(t).placeholder), K(s, mp[R(n)] ?? R(r).props[R(t).key] ?? ""), l.disabled = R(gp), H(u, e);
					}, [() => J("props.place.search")]), z("input", s, (e) => {
						mp[R(n)] = e.target.value;
					}), z("keydown", s, (e) => {
						e.key === "Enter" && c(R(t));
					}), z("click", l, () => c(R(t))), V(e, i);
				}, l = (e) => {
					var n = yp(), i = N(n), o = I(i);
					G(o), D(n), L(() => {
						H(i, `${R(t).label ?? ""} `), q(o, "min", R(t).min), q(o, "max", R(t).max), q(o, "step", R(t).step ?? 1), K(o, R(r).props[R(t).key]);
					}), z("change", o, (e) => a(R(t).key, s(R(t), Number(e.target.value)))), V(e, n);
				}, u = (e) => {
					var n = bp(), i = N(n);
					G(i);
					var o = I(i);
					D(n), L((e) => {
						Ni(i, e), H(o, ` ${R(t).label ?? ""}`);
					}, [() => !!R(r).props[R(t).key]]), z("change", i, (e) => a(R(t).key, e.target.checked)), V(e, n);
				}, d = (e) => {
					var n = xp(), i = N(n), o = I(i);
					{
						let e = /* @__PURE__ */ A(() => (R(t).options ?? []).map((e) => [e.value, e.label]));
						Y(o, {
							get value() {
								return R(r).props[R(t).key];
							},
							get options() {
								return R(e);
							},
							onchange: (e) => a(R(t).key, e)
						});
					}
					D(n), L(() => H(i, `${R(t).label ?? ""} `)), V(e, n);
				}, f = (e) => {
					var n = Sp(), i = N(n), o = I(i);
					G(o), D(n), L(() => {
						H(i, `${R(t).label ?? ""} `), q(o, "placeholder", R(t).placeholder), K(o, R(r).props[R(t).key] ?? "");
					}), z("change", o, (e) => a(R(t).key, e.target.value)), V(e, n);
				};
				U(i, (e) => {
					R(t).type === "place" ? e(o) : R(t).type === "number" ? e(l, 1) : R(t).type === "toggle" ? e(u, 2) : R(t).type === "select" ? e(d, 3) : e(f, -1);
				}), V(e, n);
			}), V(e, n);
		}, f = (e) => {
			var t = Cp(), i = F(t, !0);
			L((e, n) => {
				q(t, "title", e), H(i, n);
			}, [() => J("hint.pluginBlock"), () => J("ui.settings")]), z("click", t, () => n.bridge?.sendOpenConfig(R(r).blockId)), V(e, t);
		};
		U(u, (e) => {
			R(t).length ? e(d) : e(f, -1);
		}), V(e, o);
	};
	U(d, (e) => {
		t.area === "content" && e(f);
	}), V(e, u), et();
}
Mr([
	"input",
	"keydown",
	"click",
	"change"
]);
//#endregion
//#region src/menu/ElementMenu.svelte
var Tp = (e) => {
	_u(e, {});
}, Ep = /* @__PURE__ */ B("<button type=\"button\" class=\"menu-quick-open\"> </button>"), Dp = /* @__PURE__ */ B("<input type=\"number\"/>"), Op = /* @__PURE__ */ B("<button type=\"button\"> </button>"), kp = /* @__PURE__ */ B("<span class=\"seg\" role=\"group\"></span>"), Ap = /* @__PURE__ */ B("<div class=\"menu-quick-item\"><span class=\"menu-quick-head\"><span class=\"mini-label\"> </span><!></span> <!></div>"), jp = /* @__PURE__ */ B("<button type=\"button\" class=\"linkish menu-quick-reset\"> </button>"), Mp = /* @__PURE__ */ B("<div class=\"menu-quick\"><!> <!></div>"), Np = /* @__PURE__ */ B("<div><section class=\"emenu-col\"><p class=\"panel-strong emenu-title\"> </p><!><p class=\"emenu-none\"> </p></section> <section class=\"emenu-col\"><p class=\"panel-strong emenu-title\"> </p><!><p class=\"emenu-none\"> </p></section> <section class=\"emenu-col\"><p class=\"panel-strong emenu-title\"> </p><!><p class=\"emenu-none\"> </p></section></div>"), Pp = /* @__PURE__ */ B("<div class=\"emenu-cols\"><section class=\"emenu-col\"><p class=\"panel-strong\"> </p><!></section> <section class=\"emenu-col\"><p class=\"panel-strong\"> </p><!></section> <section class=\"emenu-col\"><p class=\"panel-strong\"> </p><!></section></div>"), Fp = /* @__PURE__ */ B("<div class=\"props-tabs\"><span class=\"seg\"><button type=\"button\"> </button> <button type=\"button\"> </button> <button type=\"button\"> </button></span></div> <!>", 1), Ip = /* @__PURE__ */ B("<!> <!>", 1);
function Lp(e, t) {
	$e(t, !0);
	let n = (e) => {
		var t = Vr();
		li(P(t), () => R(_), (e, t) => {
			t(e, { area: "content" });
		}), V(e, t);
	}, r = (e) => {
		var t = Vr();
		li(P(t), () => R(_), (e, t) => {
			t(e, { area: "style" });
		}), V(e, t);
	}, i = Ze("urd-editor"), a = /* @__PURE__ */ A(() => i.selectedBlock), { setBlockProp: o, setBlockFit: s, setBlockSize: c, endSizeGesture: l, setBlockHideMobile: u, designWidth: d, buttonTargets: f, setButtonTarget: p, themeSwatches: m } = i, g = {
		text: Du,
		button: ju,
		image: Bu,
		video: Zu,
		icon: rd,
		shape: ud,
		gallery: Sd,
		ribbon: Vd,
		calendar: vf,
		form: wf,
		faq: kf,
		timeline: Nf,
		quote: zf,
		stats: Hf,
		table: Gf,
		share: Jf,
		countdown: Zf,
		audio: ep,
		collection: rp,
		product: cp,
		cart: dp,
		checkout: pp
	}, _ = /* @__PURE__ */ A(() => g[R(a).type] ?? wp), v = qi(t, "query", 3, "");
	function y() {
		let e = bs(R(a).type), t = new Map(b().map((e) => [e.id, e]));
		return ss(R(a).type, e, new Set(t.keys())).map((e) => t.get(e));
	}
	function b() {
		let e = R(a), t = [];
		e.type === "calendar" && (t.push({
			id: "design",
			label: J("calendar.design"),
			kind: "open",
			value: J(pc(e.props.design).labelKey),
			run: i.openDesignPicker
		}), [
			"list",
			"cards",
			"agenda"
		].includes(mc(e.props)) && t.push({
			id: "limit",
			label: J("lbl.maxCount"),
			kind: "number",
			min: 1,
			max: 50,
			value: e.props.limit ?? 6,
			set: (e) => o("limit", Math.max(1, Math.min(50, Number(e) || 6)))
		}), t.push({
			id: "subscribe",
			label: J("quick.subscribe"),
			kind: "choice",
			value: e.props.showSubscribe === !1 ? "off" : "on",
			options: [["on", J("common.on")], ["off", J("common.off")]],
			set: (e) => o("showSubscribe", e === "on")
		}));
		let n = Nl.has(e.type);
		t.push({
			id: "fit",
			label: J("quick.fit"),
			kind: "choice",
			value: e.fit === "shrink" || e.fit === "both" ? e.fit : "wrap",
			options: n ? [["wrap", J("quick.fit.fluid")], ["shrink", J("quick.fit.floor")]] : [
				["wrap", J("quick.fit.wrap")],
				...d() || e.fit === "shrink" ? [["shrink", J("quick.fit.shrink")]] : [],
				["both", J("quick.fit.both")]
			],
			set: (e) => s(e)
		}), t.push({
			id: "phone",
			label: J("quick.phone"),
			kind: "choice",
			value: e.hideMobile ? "off" : "on",
			options: [["on", J("quick.phone.show")], ["off", J("quick.phone.hide")]],
			set: (e) => u(e === "off")
		});
		let r = e.props;
		if (e.type === "text") t.push({
			id: "align",
			label: J("lbl.align"),
			kind: "choice",
			value: r.align ?? "left",
			options: [
				["left", J("common.left")],
				["center", J("common.center")],
				["right", J("common.right")]
			],
			set: (e) => o("align", e)
		}), t.push({
			id: "textBox",
			label: J("group.textBox"),
			kind: "choice",
			value: r.box ? "on" : "off",
			options: Cs(),
			set: (e) => o("box", e === "on")
		});
		else if (e.type === "button") t.push({
			id: "goesTo",
			label: J("lbl.goesTo"),
			kind: "select",
			value: r.page ?? "__href",
			options: f(),
			set: p
		}), t.push({
			id: "btnStyle",
			label: J("lbl.style"),
			kind: "select",
			value: r.style ?? "primary",
			options: [["primary", J("opt.btn.primary")], ["secondary", J("opt.btn.secondary")]],
			set: (e) => o("style", e)
		});
		else if (e.type === "image") t.push({
			id: "imgFit",
			label: J("lbl.imageFit"),
			kind: "select",
			value: r.fit ?? "cover",
			options: [["cover", J("opt.fitFrame.cover")], ["contain", J("opt.fitFrame.contain")]],
			set: (e) => o("fit", e)
		}), t.push({
			id: "radius",
			label: J("group.corners"),
			kind: "choice",
			value: r.radius ?? "",
			options: [
				["", J("common.none")],
				["sm", J("opt.size.sm")],
				["md", J("opt.radius.md")]
			],
			set: (e) => o("radius", e || null)
		});
		else if (e.type === "video") t.push({
			id: "videoSource",
			label: J("lbl.videoSource"),
			kind: "choice",
			value: r.source === "file" ? "file" : "embed",
			options: [["embed", J("opt.videoSource.embed")], ["file", J("opt.videoSource.file")]],
			set: (e) => o("source", e)
		});
		else if (e.type === "icon") t.push({
			id: "iconSize",
			label: J("lbl.sizePx"),
			kind: "number",
			min: 8,
			max: 400,
			value: r.size ?? 48,
			set: (e) => o("size", Math.max(8, Math.min(400, Number(e) || 48)))
		}), t.push({
			id: "iconColor",
			label: J("lbl.color"),
			kind: "color",
			value: r.color ?? "accent",
			set: (e) => o("color", e)
		});
		else if (e.type === "gallery") {
			let e = Tl(r.view);
			t.push({
				id: "galleryView",
				label: J("lbl.view"),
				kind: "select",
				value: e,
				options: xl.map((e) => [e, J(`opt.galleryView.${e}`)]),
				set: (e) => o("view", e)
			}), Sl.includes(e) && t.push({
				id: "columns",
				label: J("lbl.columns"),
				kind: "number",
				min: 1,
				max: 6,
				value: r.columns ?? 3,
				set: (e) => o("columns", Math.max(1, Math.min(6, Number(e) || 3)))
			});
		} else if (e.type === "ribbon") {
			let e = r.motion ?? "roll";
			t.push({
				id: "ribbonMotion",
				label: J("lbl.ribbonMotion"),
				kind: "select",
				value: e,
				options: Es(),
				set: (e) => o("motion", e)
			}), (e === "roll" || e === "sway") && t.push({
				id: "speed",
				label: J("lbl.ribbonSpeed"),
				kind: "number",
				min: 10,
				max: 300,
				step: 5,
				value: r.speed ?? 60,
				set: (e) => o("speed", Math.max(10, Math.min(300, Number(e) || 60)))
			});
		} else e.type === "shape" && (t.push({
			id: "shapeColor",
			label: J("lbl.color"),
			kind: "select",
			value: r.color ?? "accent",
			options: Ps(),
			set: (e) => o("color", e)
		}), t.push({
			id: "thickness",
			label: J("lbl.thickness"),
			kind: "number",
			min: 1,
			max: 40,
			value: r.thickness ?? 2,
			set: (e) => o("thickness", Math.max(1, Math.min(40, Number(e) || 2)))
		}));
		return Pl.has(e.type) || t.push({
			id: "size",
			label: J("lbl.scale"),
			kind: "number",
			min: Fl.min * 100,
			max: Fl.max * 100,
			step: 5,
			value: Math.round(Ll(e) * 100),
			set: (e) => {
				l(), c(Math.min(Fl.max, Math.max(Fl.min, (Number(e) || 100) / 100))), l();
			}
		}), t;
	}
	var x = Ip(), S = P(x), C = (e) => {
		var t = Mp(), n = N(t);
		ni(n, 17, y, (e) => e.id, (e, t) => {
			var n = Ap(), r = N(n), i = N(r), a = F(i, !0);
			Ws(I(i), { get id() {
				return R(t).id;
			} }), D(r);
			var o = I(r, 2), s = (e) => {
				var n = Ep(), r = F(n, !0);
				L(() => H(r, R(t).value)), z("click", n, function(...e) {
					R(t).run?.apply(this, e);
				}), V(e, n);
			}, c = (e) => {
				var n = Dp();
				G(n), L(() => {
					q(n, "min", R(t).min), q(n, "max", R(t).max), q(n, "step", R(t).step ?? 1), K(n, R(t).value), q(n, "aria-label", R(t).label);
				}), z("change", n, (e) => R(t).set(e.target.value)), V(e, n);
			}, l = (e) => {
				Y(e, {
					get value() {
						return R(t).value;
					},
					get options() {
						return R(t).options;
					},
					get title() {
						return R(t).label;
					},
					compact: !0,
					onchange: (e) => R(t).set(e)
				});
			}, u = (e) => {
				{
					let n = /* @__PURE__ */ A(m);
					Pa(e, {
						get value() {
							return R(t).value;
						},
						get tokens() {
							return R(n);
						},
						get label() {
							return R(t).label;
						},
						onchange: (e) => R(t).set(e)
					});
				}
			}, d = (e) => {
				var n = kp();
				ni(n, 21, () => R(t).options, ([e, t]) => e, (e, n) => {
					var r = /* @__PURE__ */ A(() => h(R(n), 2));
					let i = () => R(r)[0], a = () => R(r)[1];
					var o = Op();
					let s;
					var c = F(o, !0);
					L(() => {
						q(o, "aria-pressed", R(t).value === i()), s = Ei(o, 1, "", null, s, { on: R(t).value === i() }), H(c, a());
					}), z("click", o, () => R(t).set(i())), V(e, o);
				}), D(n), L(() => q(n, "aria-label", R(t).label)), V(e, n);
			};
			U(o, (e) => {
				R(t).kind === "open" ? e(s) : R(t).kind === "number" ? e(c, 1) : R(t).kind === "select" ? e(l, 2) : R(t).kind === "color" ? e(u, 3) : e(d, -1);
			}), D(n), L(() => H(a, R(t).label)), V(e, n);
		});
		var r = I(n, 2), i = (e) => {
			var t = jp(), n = F(t, !0);
			L((e) => H(n, e), [() => J("menu.quickReset")]), z("click", t, () => xs(R(a).type, as)), V(e, t);
		}, o = /* @__PURE__ */ A(() => us(bs(R(a).type)));
		U(r, (e) => {
			R(o) && e(i);
		}), D(t), V(e, t);
	}, w = /* @__PURE__ */ A(() => !v().trim());
	U(S, (e) => {
		R(w) && e(C);
	});
	var T = I(S, 2), ee = (e) => {
		var i = Np();
		let a;
		var o = N(i), s = N(o), c = F(s, !0), l = I(s);
		n(l);
		var u = F(I(l), !0);
		D(o);
		var d = I(o, 2), f = N(d), p = F(f, !0), m = I(f);
		r(m);
		var h = F(I(m), !0);
		D(d);
		var g = I(d, 2), _ = N(g), y = F(_, !0), b = I(_);
		Tp(b);
		var x = F(I(b), !0);
		D(g), D(i), bi(i, () => Ql(v(), Wl)), L((e, n, r, o, s, l) => {
			a = Ei(i, 1, "emenu-cols emenu-search", null, a, { stacked: !t.wide }), H(c, e), H(u, n), H(p, r), H(h, o), H(y, s), H(x, l);
		}, [
			() => J("props.tabContent"),
			() => J("menu.noMatch"),
			() => J("props.tabStyle"),
			() => J("menu.noMatch"),
			() => J("props.tabPlacement"),
			() => J("menu.noMatch")
		]), V(e, i);
	}, te = /* @__PURE__ */ A(() => v().trim()), ne = (e) => {
		var t = Pp(), i = N(t), a = N(i), o = F(a, !0), s = I(a);
		n(s), D(i);
		var c = I(i, 2), l = N(c), u = F(l, !0), d = I(l);
		r(d), D(c);
		var f = I(c, 2), p = N(f), m = F(p, !0);
		Tp(I(p)), D(f), D(t), L((e, t, n) => {
			H(o, e), H(u, t), H(m, n);
		}, [
			() => J("props.tabContent"),
			() => J("props.tabStyle"),
			() => J("props.tabPlacement")
		]), V(e, t);
	}, re = (e) => {
		var t = Fp(), i = P(t), a = N(i), o = N(a);
		let s;
		var c = F(o, !0), l = I(o, 2);
		let u;
		var d = F(l, !0), f = I(l, 2);
		let p;
		var m = F(f, !0);
		D(a), D(i);
		var h = I(i, 2), g = (e) => {
			n(e);
		}, _ = (e) => {
			r(e);
		}, v = (e) => {
			Tp(e);
		};
		U(h, (e) => {
			ms.tab === "content" ? e(g) : ms.tab === "style" ? e(_, 1) : e(v, -1);
		}), L((e, t, n) => {
			s = Ei(o, 1, "", null, s, { on: ms.tab === "content" }), H(c, e), u = Ei(l, 1, "", null, u, { on: ms.tab === "style" }), H(d, t), p = Ei(f, 1, "", null, p, { on: ms.tab === "placement" }), H(m, n);
		}, [
			() => J("props.tabContent"),
			() => J("props.tabStyle"),
			() => J("props.tabPlacement")
		]), z("click", o, () => ms.tab = "content"), z("click", l, () => ms.tab = "style"), z("click", f, () => ms.tab = "placement"), V(e, t);
	};
	U(T, (e) => {
		R(te) ? e(ee) : t.wide ? e(ne, 1) : e(re, -1);
	}), V(e, x), et();
}
Mr(["click", "change"]);
//#endregion
//#region src/menu/SearchField.svelte
var Rp = /* @__PURE__ */ B("<input type=\"search\" class=\"menu-search\"/>");
function zp(e, t) {
	$e(t, !0);
	var n = Rp();
	G(n), L((e, t, r) => {
		q(n, "placeholder", e), q(n, "aria-label", t), q(n, "title", r);
	}, [
		() => J("menu.search"),
		() => J("menu.search"),
		() => J("tip.menu.search")
	]), z("keydown", n, (e) => {
		e.key === "Escape" && t.get() && (e.stopPropagation(), t.set(""));
	}), Li(n, t.get, t.set), V(e, n), et();
}
Mr(["keydown"]);
//#endregion
//#region src/menu/FloatingMenu.svelte
var Bp = /* @__PURE__ */ B("<div><header class=\"block-menu-head\"><span class=\"block-menu-title\"> </span> <!> <button class=\"ghost row-tool menu-width\"></button> <button class=\"ghost row-tool\"></button></header> <div class=\"panel-body block-menu-body\"><!></div></div>");
function Vp(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock);
	var i = Bp();
	let a;
	var o = N(i), s = N(o), c = F(s, !0), l = I(s, 2);
	zp(l, {
		get: () => ms.menuQuery,
		set: (e) => ms.menuQuery = e
	});
	var u = I(l, 2);
	W(u, () => ms.wide ? "<svg viewBox=\"0 0 18 18\" width=\"14\" height=\"14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M2 4l4 5-4 5M16 4l-4 5 4 5\"/></svg>" : "<svg viewBox=\"0 0 18 18\" width=\"14\" height=\"14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M6 4L2 9l4 5M12 4l4 5-4 5\"/></svg>", !0), D(u);
	var d = I(u, 2);
	W(d, () => X.cross, !0), D(d), D(o);
	var f = I(o, 2), p = N(f);
	{
		let e = /* @__PURE__ */ A(hs);
		Lp(p, {
			get wide() {
				return R(e);
			},
			get query() {
				return ms.menuQuery;
			}
		});
	}
	D(f), D(i), L((e, n, r, o, s) => {
		a = Ei(i, 1, "block-menu", null, a, { wide: e }), Oi(i, `--menu-left: ${t.pos.left ?? ""}px; --menu-top: ${t.pos.top ?? ""}px; --menu-min: ${ms.min ?? ""}px`), H(c, n), q(u, "title", r), q(u, "aria-label", o), q(d, "title", s);
	}, [
		() => hs(),
		() => J("blocks.suffix", { label: n.blockLabel(R(r).type) }),
		() => ms.wide ? J("menu.toNarrow") : J("menu.toWide"),
		() => ms.wide ? J("menu.toNarrow") : J("menu.toWide"),
		() => J("tip.closeEsc")
	]), z("click", u, () => ms.wide = !ms.wide), z("click", d, function(...e) {
		t.onclose?.apply(this, e);
	}), V(e, i), et();
}
Mr(["click"]);
//#endregion
//#region src/lib/preview-scale.js
function Hp(e, t) {
	return !(e > 0) || !(t > 0) ? 1 : e / t;
}
function Up(e, t, n, r = 0, i = 0) {
	if (n === "full") return 1;
	let a = i > 0 ? Hp(r, i) : Infinity;
	return Math.max(.1, Math.min(1, Hp(e, t), a));
}
//#endregion
//#region src/lib/deploy-wait.js
function Wp(e, { max: t = 8 } = {}) {
	let n = (e ?? []).filter((e) => e && typeof e.path == "string" && typeof e.content == "string" && e.encoding === "utf-8" && !e.delete && (e.path.startsWith("content/") || e.path === "plugins/plugins.json"));
	return n.sort((e, t) => (e.path === "content/site.json" ? -1 : 0) - (t.path === "content/site.json" ? -1 : 0)), n.slice(0, t).map(({ path: e, content: t }) => ({
		path: e,
		content: t
	}));
}
async function Gp(e, { fetchFn: t = fetch, delayMs: n = 1e4, attempts: r = 18, sleep: i = (e) => new Promise((t) => setTimeout(t, e)) } = {}) {
	let a = [...e];
	if (a.length === 0) return !0;
	for (let e = 0; e < r; e++) {
		await i(n);
		let e = await Promise.all(a.map(async ({ path: e }) => {
			try {
				let n = await t(`/${e}`, { cache: "no-store" });
				return n.ok ? await n.text() : null;
			} catch {
				return null;
			}
		}));
		if (a = a.filter((t, n) => e[n] !== t.content), a.length === 0) return !0;
	}
	return !1;
}
var Kp = 3840, qp = 2400, Jp = (e, t, n) => Math.min(n, Math.max(t, e));
function Yp({ innerWidth: e = 0, screenWidth: t = 0 } = {}) {
	let n = e > 0 ? e : t;
	return Math.max(1, Math.round(n > 0 ? n : 1));
}
function Xp(e) {
	return !e || typeof e.innerWidth != "number" ? null : Yp({
		innerWidth: e.innerWidth,
		screenWidth: e.screen?.width ?? 0
	});
}
function Zp(e, t) {
	let n = e && typeof e == "object" && !Array.isArray(e) ? e : {}, r = n.mode === "custom" ? "custom" : "own", i = Number(n.width), a = Jp(Number.isFinite(i) && i > 0 ? i : t, 640, Kp), o = Number(n.height), s = Number.isFinite(o) && o > 0 ? Jp(o, 480, qp) : 0;
	return {
		mode: r,
		width: Math.round(a),
		height: Math.round(s)
	};
}
function Qp(e, t) {
	return e?.mode === "custom" ? {
		width: e.width,
		height: e.height || 0
	} : {
		width: t,
		height: 0
	};
}
var $p = 1920, em = [
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
], tm = [
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
], nm = [
	1920,
	1536,
	1366
];
function rm(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 1440;
	let n = Math.round(t / 20) * 20;
	return Math.min($p, Math.max(960, n));
}
function im(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 6;
	let n = Math.round(t / 1) * 1;
	return Math.min(12, Math.max(0, n));
}
function am(e, t) {
	if (e === "full") return 0;
	let n = Math.min(49, Math.max(0, Number(t) || 0));
	return Math.ceil(Number(e) / (1 - 2 * n / 100));
}
function om(e, t, n) {
	let r = Math.max(0, Number(t) || 0) / 100 * n, i = Math.max(0, n - 2 * r), a = e !== "full" && Number(e) < i, o = a ? Number(e) : i;
	return {
		width: o,
		margin: Math.round((n - o) / 2),
		pct: n > 0 ? o / n * 100 : 0,
		bound: a
	};
}
function sm(e) {
	return tm.find((t) => t.width === e)?.id ?? null;
}
//#endregion
//#region src/lib/nav-size.js
var cm = {
	min: 0,
	max: 64,
	step: 1
}, lm = {
	min: 12,
	max: 28,
	step: 1
}, um = {
	min: 0,
	max: 80,
	step: 1
}, dm = {
	min: 0,
	max: 64,
	step: 1
}, fm = {
	min: 480,
	max: 1920,
	step: 20
}, pm = {
	min: .3,
	max: .8,
	step: .05
}, mm = {
	min: 0,
	max: 400,
	step: 10
}, hm = {
	min: 0,
	max: 1200,
	step: 20
}, gm = {
	min: 0,
	max: 64,
	step: 1
}, _m = {
	min: 180,
	max: 400,
	step: 1
}, vm = {
	min: 12,
	max: 128,
	step: 1
}, ym = {
	sm: {
		padY: 8.8,
		textSize: 13.6
	},
	md: {
		padY: 14.4,
		textSize: 16
	},
	lg: {
		padY: 20,
		textSize: 16.8
	},
	xl: {
		padY: 27.2,
		textSize: 18.4
	}
}, bm = [
	"sm",
	"md",
	"lg",
	"xl"
], xm = .67;
function Sm(e) {
	return e === "floating" || e === "floating-square" || e === "floating-tab";
}
function Cm(e, { min: t, max: n, step: r = 1 }, i) {
	let a = Number(e);
	if (e == null || e === "" || !Number.isFinite(a)) return i;
	let o = Math.round(a / r) * r, s = Math.min(n, Math.max(t, o));
	return r < 1 ? Math.round(s * 100) / 100 : s;
}
function wm(e, t) {
	if (e?.padY != null && e.padY !== "") return Cm(e.padY, cm, ym.md.padY);
	let n = ym[e?.size] ?? ym.md;
	return Math.round(n.padY * (Sm(t) ? xm : 1));
}
function Tm(e) {
	if (e?.textSize != null && e.textSize !== "") return Cm(e.textSize, lm, ym.md.textSize);
	let t = ym[e?.size] ?? ym.md;
	return Math.round(t.textSize);
}
function Em(e) {
	return e?.padY != null && e.padY !== "" || e?.textSize != null && e.textSize !== "" ? null : bm.includes(e?.size) ? e.size : "md";
}
//#endregion
//#region src/lib/IconEditor.svelte
var Dm = /* @__PURE__ */ B("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\"> </h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\"></canvas> <p class=\"ie-hint svelte-e7sog7\"> </p></div> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"ghost svelte-e7sog7\"> </button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"primary svelte-e7sog7\"> </button></span></div></div>");
function Om(e, t) {
	$e(t, !0);
	let n = qi(t, "image", 3, ""), r = /* @__PURE__ */ j(null), i = /* @__PURE__ */ j(null), a = /* @__PURE__ */ j(1), o = /* @__PURE__ */ j(.5), s = /* @__PURE__ */ j(.5), c = /* @__PURE__ */ j(1), l = /* @__PURE__ */ j(1), u = /* @__PURE__ */ j(1);
	Dn(() => {
		if (!n()) return;
		let e = new Image();
		e.onload = () => {
			M(i, e, !0);
		}, e.src = n();
	});
	function d(e, t) {
		if (e.clearRect(0, 0, t, t), !R(i)) return;
		e.filter = `brightness(${R(c)}) contrast(${R(l)}) saturate(${R(u)})`;
		let n = Math.max(t / R(i).width, t / R(i).height) * R(a), r = R(i).width * n, d = R(i).height * n, f = t / 2 - R(o) * r, p = t / 2 - R(s) * d;
		f = Math.min(0, Math.max(t - r, f)), p = Math.min(0, Math.max(t - d, p)), e.drawImage(R(i), f, p, r, d), e.filter = "none";
	}
	Dn(() => {
		R(i), R(a), R(o), R(s), R(c), R(l), R(u), R(r) && d(R(r).getContext("2d"), 220);
	});
	function f(e) {
		if (!R(i)) return;
		e.preventDefault();
		let t = e.clientX, n = e.clientY, r = Math.max(220 / R(i).width, 220 / R(i).height) * R(a), c = R(i).width * r, l = R(i).height * r, u = (e) => {
			M(o, Math.min(1, Math.max(0, R(o) - (e.clientX - t) / c)), !0), M(s, Math.min(1, Math.max(0, R(s) - (e.clientY - n) / l)), !0), t = e.clientX, n = e.clientY;
		}, d = () => {
			window.removeEventListener("pointermove", u), window.removeEventListener("pointerup", d);
		};
		window.addEventListener("pointermove", u), window.addEventListener("pointerup", d);
	}
	function p() {
		M(a, 1), M(o, .5), M(s, .5), M(c, 1), M(l, 1), M(u, 1);
	}
	function m() {
		let e = document.createElement("canvas");
		e.width = 128, e.height = 128, d(e.getContext("2d"), 128), t.onapply?.(e.toDataURL("image/webp", .92));
	}
	var h = Dm(), g = N(h), _ = N(g), v = F(_, !0), y = I(_, 2), b = N(y);
	q(b, "width", 220), q(b, "height", 220), Ui(b, (e) => M(r, e), () => R(r));
	var x = F(I(b, 2), !0);
	D(y);
	var S = I(y, 2), C = N(S), w = F(I(C));
	D(S);
	var T = I(S, 2);
	G(T);
	var ee = I(T, 2), te = N(ee), ne = F(I(te));
	D(ee);
	var re = I(ee, 2);
	G(re);
	var E = I(re, 2), ie = N(E), ae = F(I(ie));
	D(E);
	var oe = I(E, 2);
	G(oe);
	var se = I(oe, 2), ce = N(se), le = F(I(ce));
	D(se);
	var ue = I(se, 2);
	G(ue);
	var de = I(ue, 2), fe = N(de), pe = F(fe, !0), me = I(fe, 2), he = F(me, !0);
	D(de);
	var ge = I(de, 2), _e = N(ge), ve = F(_e, !0), ye = I(_e, 2), be = F(ye, !0);
	D(ge), D(g), D(h), L((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) => {
		H(v, e), q(b, "title", t), H(x, n), H(C, `${r ?? ""} `), H(w, `${i ?? ""}x`), H(te, `${a ?? ""} `), H(ne, `${o ?? ""}%`), H(ie, `${s ?? ""} `), H(ae, `${c ?? ""}%`), H(ce, `${l ?? ""} `), H(le, `${u ?? ""}%`), H(pe, d), H(he, f), H(ve, p), H(be, m);
	}, [
		() => J("ie.title"),
		() => J("ie.dragTip"),
		() => J("ie.hint"),
		() => J("lbl.zoom"),
		() => R(a).toFixed(2),
		() => J("lbl.brightness"),
		() => Math.round(R(c) * 100),
		() => J("lbl.contrast"),
		() => Math.round(R(l) * 100),
		() => J("lbl.saturate"),
		() => Math.round(R(u) * 100),
		() => J("ie.grayscale"),
		() => J("common.reset"),
		() => J("confirm.cancel"),
		() => J("common.apply")
	]), z("pointerdown", b, f), Li(T, () => R(a), (e) => M(a, e)), Li(re, () => R(c), (e) => M(c, e)), Li(oe, () => R(l), (e) => M(l, e)), Li(ue, () => R(u), (e) => M(u, e)), z("click", fe, () => M(u, 0)), z("click", me, p), z("click", _e, () => t.oncancel?.()), z("click", ye, m), V(e, h), et();
}
Mr(["pointerdown", "click"]);
//#endregion
//#region ../template/assets/engine/0.7.4/calendar-thumb.js
var km = "#0e1512", Am = "#2fd6b6", jm = "#5c6b64", Mm = "#22302a", Nm = "#e8efe9", Pm = "#16221d", Fm = "#1c2340", Im = "#f3ecd8", Lm = "#d0a74a", Rm = (e) => e < 1 ? ` opacity="${e}"` : "", Q = (e, t, n, r, i, a = 1, o = 2) => `<rect x="${e}" y="${t}" width="${n}" height="${r}" rx="${o}" fill="${i}"${Rm(a)}/>`, zm = (e, t, n, r, i = 1) => `<circle cx="${e}" cy="${t}" r="${n}" fill="${r}"${Rm(i)}/>`, Bm = (e, t, n, r, i, a = 1, o = 1) => `<line x1="${e}" y1="${t}" x2="${n}" y2="${r}" stroke="${i}" stroke-width="${a}"${Rm(o)}/>`, Vm = (e, t, n, r) => Array.from({ length: e }, (e, i) => r(t + i * n, i)).join(""), Hm = (e, t = km) => `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${t}"/>${e}</svg>`;
function Um(e, t, n, r, i, a = jm) {
	let o = "", s = n / 7, c = r / 4;
	for (let n = 0; n < 28; n++) {
		let r = e + n % 7 * s + s / 2, l = t + Math.floor(n / 7) * c + c / 2;
		o += zm(r, l, 1.6, i.includes(n) ? Am : a, i.includes(n) ? 1 : .55);
	}
	return o;
}
var Wm = {
	plain: () => Vm(3, 12, 20, (e) => Q(14, e, 14, 14, Mm, 1, 3) + Q(34, e + 2, 70, 4, jm, .9) + Q(34, e + 9, 46, 3, jm, .5)),
	timeline: () => Bm(50, 10, 50, 70, jm, 1.2, .7) + Vm(3, 16, 22, (e, t) => Q(18, e - 3, 24, 5, jm, .9) + zm(50, e, 3.4, t ? jm : Am) + Q(60, e - 3, 62, 4, jm, .9) + Q(60, e + 4, 40, 3, jm, .5)),
	table: () => Q(12, 10, 136, 10, Am, 1, 3) + Vm(4, 26, 12, (e, t) => (t % 2 ? Q(12, e - 3, 136, 12, Mm, .8, 0) : "") + Q(16, e, 20, 3, jm, .9) + Q(44, e, 14, 3, jm, .5) + Q(66, e, 44, 3, jm, .9) + Q(118, e, 24, 3, jm, .5)),
	booklet: () => Q(12, 8, 136, 64, Nm, 1, 2) + Q(20, 14, 40, 7, Pm) + Bm(20, 26, 140, 26, Pm, 1.4) + [20, 84].map((e) => Vm(3, 32, 12, (t) => Q(e, t, 8, 8, Am, 1, 1) + Q(e + 12, t, 36, 3, Pm, .85) + Q(e + 12, t + 5, 26, 2.5, Pm, .4))).join(""),
	numbered: () => Vm(3, 12, 20, (e) => Bm(14, e - 3, 146, e - 3, jm, .8, .6) + Q(14, e, 14, 12, Am, 1, 2) + Q(36, e + 1, 64, 4, jm, .9) + Q(36, e + 8, 44, 3, jm, .5) + Q(120, e + 3, 24, 4, Am, .7)),
	apList: () => Vm(3, 10, 21, (e) => Q(12, e, 136, 17, Fm, 1, 2) + Q(18, e + 4, 10, 9, Lm, 1, 1) + Bm(34, e + 3, 34, e + 14, Lm, .8, .5) + Q(40, e + 4, 26, 3, Lm, .8) + Q(40, e + 10, 56, 3.5, Im, .9)),
	glass: () => zm(30, 14, 34, "#ff8a65", .55) + zm(132, 70, 36, "#7fd1c4", .55) + zm(100, 10, 20, "#ffd36b", .4) + Vm(3, 12, 20, (e) => Q(14, e, 132, 15, "#ffffff", .32, 6) + Q(20, e + 4, 9, 7, Nm, .9, 1) + Q(36, e + 4, 50, 3, Nm, .9) + Q(36, e + 9, 34, 2.5, Nm, .5)),
	posters: () => Q(12, 10, 62, 60, Am, 1, 4) + Q(20, 30, 18, 20, Pm, .9, 2) + Q(20, 56, 40, 4, Pm, .8) + Q(80, 10, 32, 28, Nm, 1, 4) + Q(86, 16, 10, 10, Pm, .8, 1) + Q(116, 10, 32, 28, "#bfe9df", 1, 4) + Q(122, 16, 10, 10, Pm, .8, 1) + Q(80, 42, 32, 28, Mm, 1, 4) + Q(86, 48, 10, 10, Am, 1, 1) + Q(116, 42, 32, 28, Mm, .5, 4),
	tickets: () => Vm(3, 10, 21, (e) => Q(12, e, 136, 17, Mm, 1, 4) + Q(12, e, 30, 17, Am, 1, 4) + Q(20, e + 4, 12, 9, Pm, .85, 1) + Bm(42, e + 1, 42, e + 16, km, 1.6) + Q(50, e + 4, 50, 3.5, jm, .95) + Q(50, e + 10, 34, 2.5, jm, .55) + Q(120, e + 5, 22, 7, Am, .85)),
	carousel: () => [
		12,
		50,
		88,
		126
	].map((e, t) => Q(e, 14, 34, 54, t ? Mm : Am, 1, 4) + Q(e + 6, 22, 12, 14, t ? Am : Pm, .9, 1) + Q(e + 6, 50, 22, 3, t ? jm : Pm, .9) + Q(e + 6, 56, 14, 2.5, t ? jm : Pm, .5)).join(""),
	photo: () => [
		12,
		60,
		108
	].map((e) => Q(e, 12, 40, 56, Mm, 1, 4) + Q(e, 12, 40, 26, Am, .45, 4) + Q(e + 4, 16, 12, 6, Nm, .95, 1) + Q(e + 5, 44, 28, 3.5, jm, .95) + Q(e + 5, 51, 20, 2.5, jm, .5) + Q(e + 5, 58, 14, 5, Am, .9)).join(""),
	apGrid: () => [
		12,
		60,
		108
	].map((e) => Q(e, 12, 40, 56, Im, 1, 2) + Q(e, 12, 40, 16, Fm, 1, 2) + Bm(e, 28, e + 40, 28, Lm, 1.4) + Q(e + 4, 16, 8, 8, Lm, 1, 1) + Q(e + 22, 18, 14, 4, Lm, .9) + Q(e + 5, 36, 28, 4, Fm, .9) + Q(e + 5, 44, 18, 2.5, Fm, .55) + Q(e + 5, 52, 24, 2.5, Fm, .4)).join(""),
	bento: () => Q(12, 10, 66, 40, Nm, 1, 6) + Q(18, 14, 16, 5, Am, 1, 2) + Q(18, 28, 14, 14, Pm, .9, 1) + Q(36, 38, 34, 4, Pm, .8) + Q(82, 10, 31, 18, Mm, 1, 5) + Q(117, 10, 31, 18, Mm, 1, 5) + Q(82, 32, 66, 18, Mm, 1, 5) + Um(86, 34, 58, 14, [
		9,
		12,
		19
	]) + Q(12, 54, 31, 18, Nm, 1, 5) + Q(47, 54, 31, 18, Am, .4, 5) + Q(82, 54, 66, 18, Mm, 1, 5) + Q(88, 60, 30, 4, jm, .9),
	weekStrip: () => Q(60, 8, 40, 5, jm, .9) + Array.from({ length: 7 }, (e, t) => Q(12 + t * 19.6, 20, 17, 50, t === 3 ? Am : Mm, t === 3 ? .25 : 1, 3) + Q(15 + t * 19.6, 24, 6, 5, jm, .9, 1) + ([
		1,
		3,
		5
	].includes(t) ? Q(14 + t * 19.6, 36, 13, 7, Am, 1, 2) : "")).join(""),
	weekPlan: () => Q(12, 8, 136, 64, Mm, .6, 3) + Vm(4, 22, 12, (e) => Bm(12, e, 148, e, jm, .6, .6)) + Array.from({ length: 7 }, (e, t) => Bm(30 + t * 17, 14, 30 + t * 17, 72, jm, .6, .6)).join("") + Q(82, 14, 16, 58, Am, .14, 0) + Q(49, 36, 13, 10, Am, .9, 2) + Q(83, 48, 13, 14, Am, .9, 2) + Q(117, 24, 13, 9, Nm, .7, 2),
	layers: () => Q(12, 8, 136, 64, Mm, .6, 3) + Q(70, 12, 22, 6, Am, .9, 3) + Q(96, 12, 22, 6, Nm, .7, 3) + Q(122, 12, 22, 6, jm, .6, 3) + Vm(3, 26, 15, (e, t) => Bm(12, e - 2, 148, e - 2, jm, .6, .6) + Q(16, e + 3, 16, 3, jm, .9) + Q([
		44,
		62,
		100
	][t], e + 1, [
		46,
		22,
		40
	][t], 8, [
		Am,
		Nm,
		"#7fd1c4"
	][t], .9, 3)),
	sidepanel: () => Q(12, 8, 136, 64, Mm, .6, 3) + Um(18, 18, 76, 48, [
		5,
		10,
		17,
		24
	]) + Q(100, 8, 48, 64, Mm, 1, 3) + Q(106, 14, 26, 5, Nm, .9) + Vm(2, 26, 16, (e) => Q(106, e, 36, 12, km, 1, 2) + Bm(106, e, 106, e + 12, Am, 2) + Q(111, e + 3, 24, 3, jm, .9)),
	apMonth: () => Q(12, 8, 136, 64, Im, 1, 2) + Bm(12, 8, 148, 8, Lm, 2.4) + Q(58, 13, 44, 5, Fm, .9) + Vm(4, 26, 12, (e) => Bm(12, e, 148, e, Lm, .6, .5)) + Array.from({ length: 6 }, (e, t) => Bm(31.4 + t * 19.4, 26, 31.4 + t * 19.4, 72, Lm, .6, .5)).join("") + Q(54, 40, 14, 5, Lm, .6, 0) + Bm(54, 40, 54, 45, Lm, 2) + Q(112, 52, 14, 5, Lm, .6, 0) + Bm(112, 52, 112, 57, Lm, 2) + zm(98, 32, 3.4, Lm),
	dayPlan: () => Q(34, 6, 92, 68, Mm, .6, 5) + Q(42, 12, 40, 5, Nm, .9) + Array.from({ length: 7 }, (e, t) => Q(42 + t * 11, 22, 8, 9, t === 2 ? Am : Mm, 1, 2)).join("") + Vm(4, 38, 9, (e) => Bm(34, e, 126, e, jm, .6, .6)) + Q(56, 39, 62, 7, Nm, .5, 2) + Q(56, 57, 62, 7, Am, .5, 2) + Bm(48, 51, 126, 51, Am, 1.4) + zm(48, 51, 2.2, Am),
	yearWheel: () => `<circle cx="46" cy="40" r="24" fill="none" stroke="${Mm}" stroke-width="9"/><circle cx="46" cy="40" r="24" fill="none" stroke="${jm}" stroke-width="9" stroke-dasharray="100 151" transform="rotate(-90 46 40)"${Rm(.8)}/><circle cx="46" cy="40" r="24" fill="none" stroke="${Am}" stroke-width="9" stroke-dasharray="13 151" stroke-dashoffset="-100" transform="rotate(-90 46 40)"/>` + zm(24, 32, 2, Nm) + zm(26, 50, 2, Nm) + zm(60, 60, 2, Nm, .5) + Q(38, 37, 16, 6, Nm, .9) + Q(88, 20, 20, 4, Am) + Vm(3, 30, 13, (e) => Q(88, e, 56, 9, Mm, 1, 2) + Q(92, e + 3, 34, 3, jm, .9)),
	heatmap: () => Q(12, 8, 136, 64, Mm, .6, 3) + Array.from({ length: 3 }, (e, t) => Array.from({ length: 28 }, (e, n) => Q(18 + t * 44 + n % 7 * 5.4, 16 + Math.floor(n / 7) * 5.4, 4.2, 4.2, [
		3,
		11,
		16,
		24
	].includes((n + t * 5) % 28) ? Am : jm, [
		3,
		11,
		16,
		24
	].includes((n + t * 5) % 28) ? 1 : (n * 7 + t) % 5 == 0 ? .6 : .28, 1)).join("")).join("") + Q(18, 46, 124, 9, km, .8, 2) + Q(22, 49, 30, 3, Nm, .8),
	billboard: () => Q(34, 6, 92, 68, Pm, 1, 6) + zm(42, 14, 2, Am) + Q(48, 12, 24, 4, Am, .9) + Q(42, 22, 60, 7, Nm, .95) + [
		42,
		70,
		98
	].map((e) => Q(e, 36, 22, 16, Mm, 1, 3) + Q(e + 6, 40, 10, 7, Nm, .9, 1)).join("") + Q(42, 58, 78, 9, Am, 1, 3),
	stacked: () => Q(54, 10, 70, 44, Mm, .7, 5) + Q(46, 16, 70, 44, Mm, 1, 5) + Q(38, 22, 70, 44, Nm, 1, 5) + Q(44, 28, 22, 6, Am, 1, 3) + Q(44, 40, 44, 5, Pm, .9) + Q(44, 49, 30, 3, Pm, .5) + Q(44, 56, 20, 6, Am, 1, 2),
	noticeboard: () => Q(34, 6, 92, 68, "#8a5a3c", 1, 5) + Q(42, 14, 64, 28, "#fff7cc", 1, 0) + zm(74, 14, 3, "#d33a2c") + Q(48, 22, 40, 5, Pm, .9) + Q(48, 31, 28, 3, Pm, .5) + Q(48, 46, 58, 20, "#d9ecff", 1, 0) + zm(54, 46, 2.6, "#2f6fd6") + Q(54, 53, 36, 4, Pm, .85) + Q(54, 60, 44, 2.5, Pm, .45),
	split: () => Q(16, 10, 128, 60, Mm, 1, 6) + Q(16, 10, 44, 42, Am, 1, 6) + Q(24, 22, 20, 22, Pm, .9, 2) + Q(68, 16, 20, 5, jm, .7, 2) + Q(68, 26, 58, 6, Nm, .95) + Q(68, 36, 40, 3, jm, .7) + Bm(16, 52, 144, 52, jm, .6, .6) + Q(24, 58, 60, 3, jm, .8) + Q(24, 64, 44, 2.5, jm, .5),
	band: () => Q(8, 30, 144, 20, Am, 1, 0) + Q(8, 30, 40, 20, Pm, 1, 0) + zm(16, 40, 2, Am) + Q(22, 38, 20, 4, Nm, .9) + Q(56, 38, 34, 4, Pm, .85) + zm(96, 40, 1.8, Pm) + Q(102, 38, 34, 4, Pm, .85) + zm(142, 40, 1.8, Pm),
	oneLine: () => Vm(3, 12, 20, (e, t) => Q(12, e, 136, 15, Mm, t ? .7 : 1, 4) + Bm(12, e + 1, 12, e + 14, t ? jm : Am, 3) + zm(22, e + 7.5, 2.4, t ? jm : Am) + Q(30, e + 5.5, 20, 4, t ? jm : Am, .9) + Q(56, e + 5.5, 54, 4, jm, .9) + (t ? "" : Q(124, e + 4, 18, 7, Am, 1, 2))),
	ring: () => Q(30, 6, 100, 68, Mm, 1, 8) + `<circle cx="58" cy="34" r="15" fill="none" stroke="${jm}" stroke-width="5"${Rm(.5)}/><circle cx="58" cy="34" r="15" fill="none" stroke="${Am}" stroke-width="5" stroke-linecap="round" stroke-dasharray="70 94" transform="rotate(-90 58 34)"/>` + Q(53, 31, 10, 6, Nm, .9, 1) + Q(82, 24, 38, 6, Nm, .95) + Q(82, 35, 28, 3, jm, .8) + Bm(38, 56, 122, 56, jm, .6, .6) + Q(38, 61, 50, 3, jm, .7) + Q(38, 67, 40, 3, jm, .5),
	darkGlass: () => Q(34, 6, 92, 68, "#121216", 1, 7) + zm(112, 16, 22, Am, .45) + zm(46, 68, 20, "#3fb8a4", .35) + zm(42, 14, 2, Am) + Q(48, 12, 22, 4, Am, .9) + Q(42, 22, 56, 6, Nm, .95) + Q(42, 34, 76, 3, jm, .6, 1.5) + Q(42, 34, 60, 3, Am, 1, 1.5) + Q(42, 42, 36, 9, Nm, 1, 3) + Q(82, 42, 36, 9, Nm, .18, 3) + Q(42, 56, 76, 14, Nm, .1, 3) + Q(47, 61, 40, 3, Nm, .7),
	nextBento: () => Q(40, 8, 80, 26, Am, 1, 6) + Q(46, 13, 22, 4, Pm, .8) + Q(46, 23, 44, 5, Pm, .9) + Q(40, 38, 38, 16, Mm, 1, 5) + Q(82, 38, 38, 16, Mm, 1, 5) + Q(40, 58, 38, 16, Nm, 1, 5) + Q(82, 58, 38, 16, Am, .4, 5) + Q(46, 42, 8, 7, Nm, .9, 1) + Q(88, 42, 8, 7, Nm, .9, 1) + Q(46, 62, 8, 7, Pm, .9, 1),
	apNow: () => Q(40, 6, 80, 68, Im, 1, 5) + Q(40, 6, 80, 12, Fm, 1, 5) + zm(47, 12, 1.8, Lm) + Q(52, 10, 22, 4, Lm, .9) + Q(46, 24, 14, 14, Fm, 1, 2) + Q(50, 28, 6, 6, Lm, 1, 1) + Q(66, 25, 44, 5, Fm, .9) + Q(66, 34, 32, 3, Fm, .5) + Q(40, 46, 80, 28, "#eae1c7", 1, 0) + Bm(48, 54, 48, 66, Lm, 1) + zm(48, 54, 1.8, Lm) + zm(48, 66, 1.8, Lm) + Q(54, 52, 40, 3.5, Fm, .8) + Q(54, 64, 34, 3.5, Fm, .8),
	apNavy: () => Q(40, 6, 80, 68, Fm, 1, 5) + zm(47, 13, 1.8, Lm) + Q(52, 11, 22, 4, Lm, .9) + Q(46, 20, 68, 22, Im, 1, 3) + Q(51, 25, 8, 10, Lm, 1, 1) + Q(64, 25, 40, 5, Fm, .9) + Q(64, 34, 26, 3, Fm, .5) + `<rect x="46" y="46" width="68" height="14" rx="3" fill="#262e4f" stroke="${Lm}" stroke-width="0.8"/>` + Q(51, 50, 7, 6, Lm, 1, 1) + Q(64, 51, 36, 4, Im, .85) + Q(46, 66, 50, 3, Im, .6),
	apSeries: () => Q(12, 8, 136, 64, "#f5efdd", 1, 2) + Bm(20, 17, 34, 17, Lm, 1) + Q(38, 15, 26, 3.5, Lm, .9) + Q(20, 24, 58, 8, "#7a1a1a") + Q(20, 38, 64, 3, Fm, .6) + Q(20, 44, 52, 3, Fm, .6) + [
		20,
		46,
		72
	].map((e) => Q(e, 54, 12, 2.5, Lm, .9) + Q(e, 60, 20, 3.5, Fm, .8)).join("") + Bm(100, 14, 100, 66, Lm, .8, .6) + Q(108, 18, 30, 8, "#7a1a1a", .85) + Q(108, 32, 32, 2.5, Fm, .5) + Q(108, 38, 26, 2.5, Fm, .5),
	mobileAgenda: () => Q(50, 4, 60, 72, "#121216", 1, 8) + Q(56, 10, 22, 4, Nm, .9) + Array.from({ length: 7 }, (e, t) => Q(56 + t * 7.1, 18, 5.6, 9, t === 2 ? Am : Mm, 1, 2)).join("") + Vm(3, 32, 14, (e) => Q(56, e, 48, 11, "#1c1c22", 1, 3) + Bm(67, e + 2, 67, e + 9, Am, 1.4) + Q(58, e + 4, 6, 3, jm, .8) + Q(70, e + 3, 26, 3, Nm, .85))
};
Object.keys(Wm);
function Gm(e) {
	let t = Wm[e] ?? Wm.plain, n = ["booklet"].includes(e);
	return Hm(t(), n ? "#1a2620" : km);
}
//#endregion
//#region src/lib/DesignPicker.svelte
var Km = /* @__PURE__ */ B("<button type=\"button\"> </button>"), qm = /* @__PURE__ */ B("<img alt=\"\" loading=\"lazy\" decoding=\"async\" class=\"svelte-wurosr\"/>"), Jm = /* @__PURE__ */ B("<span class=\"dp-mark svelte-wurosr\"> </span>"), Ym = /* @__PURE__ */ B("<button type=\"button\"><span class=\"dp-pic svelte-wurosr\"><!></span> <span class=\"dp-name svelte-wurosr\"> </span> <!></button>"), Xm = /* @__PURE__ */ B("<section class=\"dp-family svelte-wurosr\"><h3 class=\"svelte-wurosr\"> </h3> <div class=\"dp-grid svelte-wurosr\"></div></section>"), Zm = /* @__PURE__ */ B("<p class=\"dp-none svelte-wurosr\"> </p>"), Qm = /* @__PURE__ */ B("<span class=\"dp-side-view svelte-wurosr\"> </span>"), $m = /* @__PURE__ */ B("<dialog class=\"dp-overlay svelte-wurosr\"><div class=\"dp-card svelte-wurosr\"><div class=\"dp-head svelte-wurosr\"><h2 class=\"svelte-wurosr\"> </h2> <input class=\"dp-search svelte-wurosr\" type=\"search\"/> <span class=\"dp-count svelte-wurosr\"> </span> <button type=\"button\" class=\"dp-close svelte-wurosr\"><svg viewBox=\"0 0 16 16\" width=\"16\" height=\"16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" aria-hidden=\"true\"><path d=\"M3 3l10 10M13 3L3 13\"></path></svg></button></div> <div class=\"dp-views svelte-wurosr\" role=\"group\"><button type=\"button\"> </button> <!></div> <div class=\"dp-body svelte-wurosr\"><div class=\"dp-list svelte-wurosr\"><!> <!></div> <aside class=\"dp-side svelte-wurosr\"><div class=\"dp-side-head svelte-wurosr\"><strong> </strong> <!></div> <div class=\"dp-preview svelte-wurosr\"><div class=\"dp-stage svelte-wurosr\"><iframe src=\"/?preview=1\" class=\"svelte-wurosr\"></iframe></div></div> <button type=\"button\" class=\"dp-use svelte-wurosr\"> </button></aside></div></div></dialog>");
function eh(e, t) {
	$e(t, !0);
	let n = qi(t, "current", 3, null), r = qi(t, "mode", 3, "set"), i = qi(t, "site", 3, null), a = qi(t, "page", 3, null), o = {
		list: "calendar.viewList",
		cards: "calendar.viewCards",
		month: "calendar.viewMonth",
		agenda: "calendar.viewAgenda",
		next: "calendar.viewNext",
		week: "calendar.viewWeek",
		day: "calendar.viewDay",
		year: "calendar.viewYear"
	}, s = 1040, c = /* @__PURE__ */ j(""), l = /* @__PURE__ */ j(""), u = /* @__PURE__ */ j(sn(n() ?? "plain")), d = /* @__PURE__ */ j(sn(/* @__PURE__ */ new Set())), f = /* @__PURE__ */ j(null), p = /* @__PURE__ */ j(0), m = /* @__PURE__ */ j(!1), h = /* @__PURE__ */ j(600), g = /* @__PURE__ */ j(null), _ = /* @__PURE__ */ j(null), v = (e) => !R(l) || e.view === null || e.view === R(l), y = (e) => v(e) && (!R(c).trim() || J(e.labelKey).toLowerCase().includes(R(c).trim().toLowerCase())), b = /* @__PURE__ */ A(() => $s().map((e) => ({
		...e,
		designs: e.designs.filter(y)
	})).filter((e) => e.designs.length)), x = /* @__PURE__ */ A(() => R(b).reduce((e, t) => e + t.designs.length, 0)), S = /* @__PURE__ */ A(() => pc(R(u))), C = /* @__PURE__ */ A(() => R(p) ? Math.min(1, R(p) / s) : .4);
	Dn(() => {
		R(_) && !R(_).open && R(_).showModal(), R(g)?.focus();
	});
	function w(e) {
		let t = pc(e), n = {
			id: "design-picker-sec",
			version: 1,
			size: { minHeight: "200px" },
			grid: null,
			background: {
				version: 1,
				layers: []
			},
			blocks: [{
				id: "design-picker-cal",
				type: "calendar",
				version: 1,
				decor: !1,
				hideMobile: !1,
				animation: null,
				props: {
					sources: [],
					limit: 4,
					view: t.view ?? "list",
					...t.id === "plain" ? {} : { design: t.id },
					...t.view === "next" ? {
						nextCount: 3,
						laterCount: 3
					} : {}
				},
				frames: {
					desktop: {
						x: 3,
						y: 24,
						w: 94,
						h: 600
					},
					mobile: null
				}
			}]
		};
		return {
			...a() ?? {},
			sections: [n]
		};
	}
	let T = (e) => R(f)?.contentWindow?.postMessage(e, location.origin);
	function ee() {
		let e = R(f)?.contentDocument, t = e?.querySelector(".urd-block[data-block-id=\"design-picker-cal\"]");
		if (!t) return;
		let n = t.getBoundingClientRect().bottom + (e.defaultView?.scrollY ?? 0), r = Math.max(160, Math.ceil(n + 24));
		r !== R(h) && M(h, r, !0);
	}
	let te = null, ne = null;
	function re() {
		te?.disconnect(), te = null;
		let e = R(f)?.contentWindow;
		if (!e?.ResizeObserver) return;
		let t = 0, n = () => {
			let r = e.document.querySelector(".urd-block[data-block-id=\"design-picker-cal\"]");
			r && r !== ne ? (ne = r, te = new e.ResizeObserver(ee), te.observe(r), ee()) : t++ < 300 && e.requestAnimationFrame(n);
		};
		n();
	}
	function E() {
		T({
			type: "urd-preview-full",
			pageId: "design-picker",
			page: w(R(u))
		}), re();
	}
	function ie(e) {
		if (e.origin !== location.origin || e.source !== R(f)?.contentWindow || e.data?.type !== "urd-ready") return;
		let t = R(f)?.contentDocument;
		if (t && !t.getElementById("design-picker-style")) {
			let e = t.createElement("style");
			e.id = "design-picker-style", e.textContent = ".urd-nav, #urd-announce, .urd-nav-announce, #urd-footer, .urd-totop { display: none !important; }", t.head.appendChild(e);
		}
		i() && T({
			type: "urd-site",
			site: i()
		}), T({
			type: "urd-viewport",
			mode: "desktop"
		}), T({
			type: "urd-chrome",
			visible: !1
		}), M(m, !0);
	}
	Dn(() => {
		R(u), R(m) && E();
	}), Dn(() => () => te?.disconnect());
	function ae() {
		t.onclose?.();
	}
	function oe(e) {
		M(d, /* @__PURE__ */ new Set([...R(d), e]), !0);
	}
	var se = $m();
	jr("message", cn, ie);
	var ce = N(se), le = N(ce), ue = N(le), de = F(ue, !0), fe = I(ue, 2);
	G(fe), Ui(fe, (e) => M(g, e), () => R(g));
	var pe = I(fe, 2), me = F(pe, !0), he = I(pe, 2);
	D(le);
	var ge = I(le, 2), _e = N(ge);
	let ve;
	var ye = F(_e, !0);
	ni(I(_e, 2), 16, () => Gs, (e) => e, (e, t) => {
		var n = Km();
		let r;
		var i = F(n, !0);
		L((e) => {
			q(n, "aria-pressed", R(l) === t), r = Ei(n, 1, "svelte-wurosr", null, r, { on: R(l) === t }), H(i, e);
		}, [() => J(o[t])]), z("click", n, () => M(l, t, !0)), V(e, n);
	}), D(ge);
	var be = I(ge, 2), xe = N(be), Se = N(xe);
	ni(Se, 17, () => R(b), (e) => e.family, (e, r) => {
		var i = Xm(), a = N(i), o = F(a, !0), s = I(a, 2);
		ni(s, 21, () => R(r).designs, (e) => e.id, (e, r) => {
			var i = Ym();
			let a;
			var o = N(i), s = N(o), c = (e) => {
				var t = Vr();
				W(P(t), () => Gm(R(r).id)), V(e, t);
			}, l = /* @__PURE__ */ A(() => R(d).has(R(r).id)), f = (e) => {
				var t = qm();
				L(() => q(t, "src", `/admin/designs/${R(r).id}.webp`)), jr("error", t, () => oe(R(r).id)), kr(t), V(e, t);
			};
			U(s, (e) => {
				R(l) ? e(c) : e(f, -1);
			}), D(o);
			var p = I(o, 2), m = F(p, !0), h = I(p, 2), g = (e) => {
				var t = Jm(), n = F(t, !0);
				L((e) => H(n, e), [() => J("calendar.picker.current")]), V(e, t);
			};
			U(h, (e) => {
				n() !== null && R(r).id === n() && e(g);
			}), D(i), L((e, t) => {
				a = Ei(i, 1, "dp-tile svelte-wurosr", null, a, {
					on: R(r).id === R(u),
					current: n() !== null && R(r).id === n()
				}), q(i, "aria-pressed", R(r).id === R(u)), q(i, "title", e), H(m, t);
			}, [() => J(R(r).labelKey), () => J(R(r).labelKey)]), z("click", i, () => M(u, R(r).id, !0)), z("dblclick", i, () => t.onpick?.(R(r).id)), V(e, i);
		}), D(s), D(i), L((e) => H(o, e), [() => J(R(r).labelKey)]), V(e, i);
	});
	var Ce = I(Se, 2), we = (e) => {
		var t = Zm(), n = F(t, !0);
		L((e) => H(n, e), [() => J("calendar.picker.none")]), V(e, t);
	};
	U(Ce, (e) => {
		R(b).length || e(we);
	}), D(xe);
	var Te = I(xe, 2), Ee = N(Te), De = N(Ee), Oe = F(De, !0), ke = I(De, 2), Ae = (e) => {
		var t = Qm(), n = F(t, !0);
		L((e) => H(n, e), [() => J(o[R(S).view])]), V(e, t);
	};
	U(ke, (e) => {
		R(S).view && e(Ae);
	}), D(Ee);
	var je = I(Ee, 2), Me = N(je), Ne = N(Me);
	Ui(Ne, (e) => M(f, e), () => R(f)), D(Me), D(je);
	var Pe = I(je, 2), Fe = F(Pe, !0);
	D(Te), D(be), D(ce), D(se), Ui(se, (e) => M(_, e), () => R(_)), L((e, t, n, r, i, a, o, c, u, d, f) => {
		q(se, "aria-label", e), H(de, t), q(fe, "placeholder", n), q(fe, "aria-label", r), H(me, i), q(he, "aria-label", a), q(he, "title", o), q(_e, "aria-pressed", R(l) === ""), ve = Ei(_e, 1, "svelte-wurosr", null, ve, { on: R(l) === "" }), H(ye, c), H(Oe, u), Oi(Me, `width:${s * R(C)}px; height:${R(h) * R(C)}px`), q(Ne, "title", d), Oi(Ne, `width:1040px; height:${R(h) ?? ""}px; transform:scale(${R(C) ?? ""}); transform-origin:top left`), H(Fe, f);
	}, [
		() => J("calendar.picker.title"),
		() => J("calendar.picker.title"),
		() => J("calendar.picker.search"),
		() => J("calendar.picker.search"),
		() => J("calendar.picker.count", { n: R(x) }),
		() => J("ui.close"),
		() => J("ui.close"),
		() => J("calendar.picker.all"),
		() => J(R(S).labelKey),
		() => J("calendar.picker.preview", { name: J(R(S).labelKey) }),
		() => r() === "add" ? J("calendar.picker.add") : J("calendar.picker.use")
	]), jr("close", se, ae), Li(fe, () => R(c), (e) => M(c, e)), z("click", he, () => t.onclose?.()), z("click", _e, () => M(l, "")), Vi(je, "clientWidth", (e) => M(p, e)), z("click", Pe, () => t.onpick?.(R(u))), V(e, se), et();
}
Mr(["click", "dblclick"]);
//#endregion
//#region ../template/assets/engine/0.7.4/blocks/form.js
var th = () => [
	{
		id: "navn",
		label: J("form.fieldName"),
		type: "text",
		required: !0
	},
	{
		id: "epost",
		label: J("form.fieldEmail"),
		type: "email",
		required: !0
	},
	{
		id: "melding",
		label: J("form.fieldMessage"),
		type: "textarea",
		required: !0
	}
], nh = 24, rh = {
	"oppsett-byttet": "layout-changed",
	"blokk-endret": "block-edited",
	"desktop-endret-etter-mobil": "desktop-changed-after-mobile",
	seksjonshøyde: "section-height",
	"blokk-flyttet": "block-moved",
	"blokk-slettet": "block-deleted",
	"blokk-lagt-til": "block-added"
};
function ih(e, t) {
	if (!e || !("y" in e || "h" in e)) return e ?? null;
	if (t && e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h) return null;
	let n = {
		x: e.x,
		w: e.w
	};
	return Number.isFinite(e.y) && (n.row = Math.max(1, Math.round((e.y - nh) / 8) + 1), n.rows = Number.isFinite(e.h) ? Math.max(1, Math.ceil(e.h / 8)) : 1), Number.isFinite(e.z) && e.z !== 1 && (n.z = e.z), e.rot && (n.rot = e.rot), n;
}
var ah = {
	samling: "collection",
	galleri: "gallery",
	tidslinje: "timeline",
	sitat: "quote",
	statistikk: "stats",
	tabell: "table",
	deling: "share",
	nedteller: "countdown",
	produkt: "product",
	handlekurv: "cart",
	kasse: "checkout"
}, oh = { bildegalleri: "slideshow" }, sh = {
	flate: "surface",
	aksent: "accent",
	invers: "inverse",
	dus: "soft",
	dempet: "muted",
	dyp: "deep",
	uthevet: "highlighted"
}, ch = {
	tom: "blank",
	"hero-sentrert": "hero-centered",
	bilder: "images",
	galleri: "gallery",
	kontakt: "contact",
	funksjonskort: "feature-cards",
	"funksjonskort-enkel": "feature-cards-simple",
	nyheter: "news",
	"nyheter-samling": "news-collection",
	oppslagstavle: "noticeboard",
	publikasjonsarkiv: "publication-archive",
	arrangementer: "events",
	tidslinje: "timeline",
	steg: "steps",
	hovedoppslag: "lead-story",
	produkter: "products",
	butikk: "shop",
	"butikk-hero": "shop-hero",
	"butikk-kategorier": "shop-categories",
	"butikk-tillit": "shop-trust",
	"butikk-utstilling": "shop-showcase",
	kasse: "checkout",
	sitat: "quote",
	statistikk: "stats",
	sponsorer: "sponsors",
	medlemskap: "membership"
};
function lh(e) {
	let t = Array.isArray(e) ? e : e.blocks ?? [];
	for (let e of t) ah[e.type] && (e.type = ah[e.type]);
	if (!Array.isArray(e)) {
		for (let t of e.background?.layers ?? []) oh[t.type] && (t.type = oh[t.type]);
		sh[e.theme] && (e.theme = sh[e.theme]), ch[e.preset] && (e.preset = ch[e.preset]);
	}
	return e;
}
var uh = 26;
function dh(e) {
	for (let t of e?.blocks ?? []) {
		if (t.type !== "calendar" || !t.props || !("scale" in t.props)) continue;
		let e = Ll({
			type: "calendar",
			size: t.props.scale
		});
		delete t.props.scale, e !== 1 && (t.size = e);
	}
}
function fh(e) {
	for (let t of e?.blocks ?? []) {
		if (t.type !== "map" && t.type !== "kart" || !Number.isFinite(t.props?.height)) continue;
		let n = t.frames?.desktop;
		if (n && Number.isFinite(n.h)) {
			let r = Math.max(n.h, Math.round(t.props.height + uh)), i = Bl(e.blocks, t.id, r);
			n.h = r;
			for (let t of e.blocks) {
				let e = i.get(t.id);
				Number.isFinite(e) && t.frames?.desktop && (t.frames.desktop.y = e);
			}
		}
		delete t.props.height;
	}
}
function ph(e, t = !1) {
	for (let n of e?.blocks ?? []) {
		if (n.type !== "gallery" || !n.props) continue;
		let r = n.frames?.desktop;
		if ((t || "bandHeight" in n.props) && n.props.view === "ribbon" && r && Number.isFinite(r.h)) {
			let t = Math.min(400, Math.max(80, Number(n.props.bandHeight) || 160)), i = Number(n.props.rows) === 2 ? 2 : 1, a = Number(n.props.gap) || 0, o = Math.round((i * t + (i - 1) * a) * Ll(n)), s = Bl(e.blocks, n.id, o);
			r.h = o;
			for (let t of e.blocks) {
				let e = s.get(t.id);
				Number.isFinite(e) && t.frames?.desktop && (t.frames.desktop.y = e);
			}
		}
		delete n.props.bandHeight;
	}
}
var mh = {
	1: (e) => {
		for (let t of e.sections ?? []) {
			let e = t.responsive?.mobile;
			for (let e of t.blocks ?? []) e.decor && (e.hideMobile = !0), e.frames?.mobile && (e.frames.mobile = ih(e.frames.mobile, e.frames.desktop));
			e?.mode === "manual" && (e.mode = "auto");
			let n = e?.attention?.reason;
			n && rh[n] && (e.attention.reason = rh[n]);
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) lh(t);
		return e;
	},
	3: (e) => {
		for (let t of e.sections ?? []) lh(t);
		return e;
	},
	4: (e) => {
		for (let t of e.sections ?? []) fh(t);
		return e;
	},
	5: (e) => {
		for (let t of e.sections ?? []) dh(t);
		return e;
	},
	6: (e) => {
		for (let t of e.sections ?? []) ph(t, !0);
		return e;
	}
}, hh = {
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
	}),
	3: (e) => e.nav && e.nav.style?.inset === void 0 ? {
		...e,
		nav: {
			...e.nav,
			style: {
				...e.nav.style ?? {},
				inset: !1
			}
		}
	} : e
};
function gh(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 4;) {
		let r = hh[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function _h(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 7;) {
		let i = mh[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/plugins.js
function vh(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var yh = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function bh(e, t) {
	let n = vh(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = vh(t[2]), a = yh(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var xh = /^[a-z0-9][a-z0-9-]*$/;
function Sh(e) {
	let t = [];
	if (!e || typeof e != "object") return ["the manifest is not an object"];
	xh.test(e.id ?? "") || t.push("id is missing or invalid"), (typeof e.name != "string" || !e.name) && t.push("name is missing"), vh(e.version ?? "") || t.push("version is not semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine is missing");
	let n = Array.isArray(e.languages) && e.languages.length > 0;
	return (e.entry !== void 0 || !n) && (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry is missing or is not a .js file"), (e.provides !== void 0 || !n) && (!e.provides || typeof e.provides != "object") && t.push("provides is missing"), e.languages !== void 0 && t.push(...ea(e.languages)), e.locales !== void 0 && typeof e.locales != "boolean" && t.push("locales must be a boolean"), e.names !== void 0 && (typeof e.names != "object" || e.names === null || Array.isArray(e.names) || Object.values(e.names).some((e) => typeof e != "string" || !e)) && t.push("names must be an object mapping language code to name"), t;
}
Promise.resolve();
//#endregion
//#region ../template/assets/engine/0.7.4/sections/presets.js
function Ch(e) {
	return typeof crypto < "u" && crypto.randomUUID ? `${e}-${crypto.randomUUID().slice(0, 8)}` : `${e}-${[...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4))].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
var wh = () => ({ mobile: {
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
}), Th = (e, t, n = {}) => ({
	id: Ch("blk"),
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
}), Eh = (e, t = {}) => ({
	id: Ch("blk"),
	type: "image",
	version: 1,
	props: {
		src: "",
		alt: J("seed.imageAlt"),
		fit: "cover",
		radius: "md",
		href: null,
		...t
	},
	animation: null,
	frames: e
}), Dh = (e, t, n = {}) => ({
	id: Ch("blk"),
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
}), Oh = (e, t, n = 40) => ({
	id: Ch("blk"),
	type: "icon",
	version: 1,
	props: {
		glyph: t,
		color: "accent",
		size: n
	},
	animation: null,
	frames: e
}), kh = (e, t = {}) => ({
	id: Ch("blk"),
	type: "map",
	version: 2,
	props: {
		location: "",
		zoom: 15,
		...t
	},
	animation: null,
	frames: e
}), Ah = (e, t = {}) => ({
	id: Ch("blk"),
	type: "form",
	version: 1,
	props: {
		recipient: "",
		subject: "",
		mode: "mailto",
		endpoint: "",
		submitLabel: J("form.sendDefault"),
		successText: J("form.thanksDefault"),
		fields: th(),
		...t
	},
	animation: null,
	frames: e
}), jh = (e, t = {}) => ({
	id: Ch("blk"),
	type: "calendar",
	version: 1,
	props: {
		sources: [],
		view: "list",
		limit: 6,
		showCategories: !1,
		showSubscribe: !1,
		showSignup: !1,
		...t
	},
	animation: null,
	frames: e
}), Mh = () => ({
	type: "hover-lift",
	version: 1,
	props: {}
}), Nh = (e, t, n = {}) => ({
	id: Ch("blk"),
	type: "collection",
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
}), Ph = (e, t = {}) => ({
	id: Ch("blk"),
	type: "product",
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
}), Fh = (e, t = {}) => ({
	id: Ch("blk"),
	type: "cart",
	version: 1,
	props: {
		variant: "button",
		href: "",
		currency: "kr",
		...t
	},
	animation: null,
	frames: e
}), Ih = (e, t = {}) => ({
	id: Ch("blk"),
	type: "checkout",
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
}), Lh = (e, t = {}) => ({
	id: Ch("blk"),
	type: "gallery",
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
}), Rh = (e, t) => ({
	id: Ch("blk"),
	type: "faq",
	version: 1,
	props: {
		items: t,
		multi: !1
	},
	animation: null,
	frames: e
}), zh = (e, t = {}) => ({
	id: Ch("blk"),
	type: "quote",
	version: 1,
	props: {
		text: "",
		attribution: "",
		role: "",
		variant: "large",
		image: "",
		accent: null,
		...t
	},
	animation: null,
	frames: e
}), Bh = (e, t) => ({
	id: Ch("blk"),
	type: "timeline",
	version: 1,
	props: {
		items: t,
		variant: "left",
		marker: "filled",
		accent: null
	},
	animation: null,
	frames: e
}), Vh = (e, t = {}) => ({
	id: Ch("blk"),
	type: "stats",
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
}), Hh = (...e) => ({
	version: 1,
	layers: e
}), Uh = (e) => ({
	type: "color",
	version: 1,
	props: { value: e }
}), Wh = (e, t, n, r = .5) => ({
	type: "glow",
	version: 1,
	props: {
		x: e,
		y: t,
		color: "accent",
		radius: r,
		opacity: n
	}
}), Gh = (e) => Math.max(0, ...e.blocks.map((e) => e.frames.desktop.y + e.frames.desktop.h)), Kh = (e, t, n, r, i, a) => ({
	x: n + e % t * r,
	y: i + Math.floor(e / t) * a
}), qh = (e, t, n, r, i, a, o, s, c = 0) => {
	let l = (t) => e.blocks.some((e) => {
		let n = e.frames.desktop;
		return n.x < t.x + t.w - .01 && t.x < n.x + n.w - .01 && n.y < t.y + t.h - .01 && t.y < n.y + n.h - .01;
	});
	for (let e = 0; e < 60; e++) {
		let u = Kh(e, t, n, r, i, a);
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
		y: Gh(e) + 16,
		n: 0
	};
}, Jh = (e, t, n) => e + t * .1 + n * .01, Yh = (e, t, n, r, i = null) => ({
	id: Ch("sec"),
	version: 1,
	preset: e,
	size: { minHeight: t },
	grid: i,
	background: n,
	blocks: r,
	responsive: wh()
});
function Xh(e) {
	e.sections.define("blank", {
		label: "Empty section",
		labelKey: "preset.blank.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "A blank canvas to build on freely",
		hintKey: "preset.blank.hint",
		create: () => Yh("blank", "40vh", Hh(Uh("bg")), [])
	}), e.sections.define("hero", {
		label: "Hero",
		labelKey: "preset.hero.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Large opening with gradient and glow, left-aligned",
		hintKey: "preset.hero.hint",
		create: () => Yh("hero", "70vh", {
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
				Wh(.7, .2, .35),
				{
					type: "grain",
					version: 1,
					props: { opacity: .06 }
				}
			]
		}, [
			Th($(8.33, 40, 50, 38), J("seed.hero.title")),
			Th($(8.33, 84, 41.67, 26), J("seed.hero.intro")),
			Dh($(8.33, 118, 20, 32), J("seed.readMore"))
		])
	}), e.sections.define("hero-centered", {
		label: "Hero, centred",
		labelKey: "preset.hero-centered.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Centred opening with two buttons",
		hintKey: "preset.hero-centered.hint",
		create: () => Yh("hero-centered", "60vh", Hh(Uh("bg")), [
			Th($(15, 64, 70, 44), J("seed.heroCenter.title"), { align: "center" }),
			Th($(25, 116, 50, 26), J("seed.heroCenter.intro"), { align: "center" }),
			Dh($(31.5, 160, 17, 40), J("seed.join")),
			Dh($(51.5, 160, 17, 40), J("seed.readMore"), { style: "secondary" })
		])
	}), e.sections.define("hero-image", {
		label: "Hero over a photo",
		labelKey: "preset.hero-image.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Opening over a photo that creeps slowly, with a veil under the text",
		hintKey: "preset.hero-image.hint",
		create: () => {
			let e = Yh("hero-image", "70vh", {
				version: 1,
				layers: [
					Uh("bg"),
					{
						type: "image",
						version: 3,
						props: {
							src: "",
							fit: "cover",
							x: .5,
							y: .5,
							size: 1,
							opacity: 1,
							blur: 0,
							parallax: 0,
							bleed: "none",
							motion: "kenburns",
							motionSpeed: 24
						}
					},
					{
						type: "gradient",
						version: 1,
						props: {
							kind: "linear",
							angle: 180,
							stops: [{
								color: "#00000000",
								share: 45
							}, {
								color: "#000000b3",
								share: 55
							}]
						}
					}
				]
			}, [
				Th($(8.33, 40, 50, 38), J("seed.hero.title")),
				Th($(8.33, 84, 41.67, 26), J("seed.hero.intro")),
				Dh($(8.33, 118, 20, 32), J("seed.readMore"))
			]);
			return e.theme = "inverse", e;
		}
	}), e.sections.define("hero-photos", {
		label: "Hero with floating photos",
		labelKey: "preset.hero-photos.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Centred opening with scattered photos drifting behind the text",
		hintKey: "preset.hero-photos.hint",
		create: () => {
			let e = Yh("hero-photos", "70vh", {
				version: 1,
				layers: [
					Uh("bg"),
					{
						type: "slideshow",
						version: 2,
						props: {
							images: [],
							source: "upload",
							folder: "",
							order: "random",
							folderMax: 24,
							style: "floating",
							motion: "drift",
							motionSpeed: 30,
							interval: 12,
							fade: 1.5,
							count: 8,
							seed: 0,
							size: null,
							spread: .85,
							tilt: 5,
							radius: 5,
							rows: 2,
							direction: "left",
							underNav: !0,
							underAnnounce: !1,
							fit: "cover",
							blur: 0,
							opacity: .85
						}
					},
					{
						type: "grain",
						version: 1,
						props: { opacity: .06 }
					}
				]
			}, [
				Th($(15, 64, 70, 44), J("seed.heroCenter.title"), { align: "center" }),
				Th($(25, 116, 50, 26), J("seed.heroCenter.intro"), { align: "center" }),
				Dh($(41.5, 160, 17, 40), J("seed.readMore"))
			]);
			return e.theme = "inverse", e;
		}
	}), e.sections.define("images", {
		label: "Images",
		labelKey: "preset.images.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Title and three image frames",
		hintKey: "preset.images.hint",
		create: () => Yh("images", "360px", Hh(Uh("bg")), [
			Th($(4, 24, 50, 32), J("seed.images.title")),
			Eh($(4, 72, 28, 220)),
			Eh($(36, 72, 28, 220)),
			Eh($(68, 72, 28, 220))
		]),
		itemLabel: "image",
		itemLabelKey: "item.image",
		item: (e) => {
			let { x: t, y: n } = qh(e, 3, 4, 32, 72, 244, 28, 220);
			return {
				blocks: [Eh($(t, n, 28, 220))],
				bottom: n + 244
			};
		}
	}), e.sections.define("gallery", {
		label: "Gallery",
		labelKey: "preset.gallery.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Image gallery in a grid with full-screen view (lightbox)",
		hintKey: "preset.gallery.hint",
		create: () => Yh("gallery", "440px", Hh(Uh("bg")), [Th($(4, 24, 50, 32), J("seed.gallery.title")), Lh($(4, 72, 92, 320))])
	}), e.sections.define("find-us", {
		label: "Find us",
		labelKey: "preset.find-us.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Map with your address (privacy-friendly OpenStreetMap)",
		hintKey: "preset.find-us.hint",
		create: () => Yh("find-us", "480px", Hh(Uh("bg")), [Th($(6, 40, 60, 70), J("seed.findUs.title")), kh($(6, 120, 88, 360, 2))])
	}), e.sections.define("whats-on", {
		label: "What is on",
		labelKey: "preset.whats-on.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Event list from a subscribable calendar (iCal/Google)",
		hintKey: "preset.whats-on.hint",
		create: () => Yh("whats-on", "520px", Hh(Uh("bg")), [Th($(6, 40, 60, 70), J("seed.whatsOn.title")), jh($(6, 130, 88, 320, 2), { limit: 5 })])
	});
	let t = (t, n, r) => e.sections.define(t, {
		label: `What is on: ${t.slice(9)}`,
		labelKey: `preset.${t}.label`,
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Events from a subscribable calendar (iCal/Google)",
		hintKey: `preset.${t}.hint`,
		create: () => Yh(t, n, Hh(Uh("bg")), [Th($(6, 40, 60, 70), J("seed.whatsOn.title")), r()])
	});
	t("whats-on-cards", "560px", () => jh($(6, 130, 88, 360, 2), {
		view: "cards",
		limit: 6
	})), t("whats-on-month", "720px", () => jh($(6, 130, 88, 520, 2), { view: "month" })), t("whats-on-week", "560px", () => jh($(6, 130, 88, 360, 2), {
		view: "week",
		design: "weekStrip"
	})), t("whats-on-next", "460px", () => jh($(6, 130, 48, 260, 2), {
		view: "next",
		nextCount: 3,
		laterCount: 3
	})), e.sections.define("contact-form", {
		label: "Contact form",
		labelKey: "preset.contact-form.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Contact form that sends via email (or your own endpoint)",
		hintKey: "preset.contact-form.hint",
		create: () => Yh("contact-form", "520px", Hh(Uh("bg")), [Th($(6, 40, 60, 120), J("seed.contactForm.intro")), Ah($(6, 180, 60, 380, 2))])
	}), e.sections.define("contact", {
		label: "Contact",
		labelKey: "preset.contact.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Contact details in a card with an email button",
		hintKey: "preset.contact.hint",
		create: () => Yh("contact", "320px", Hh(Uh("surface"), Wh(.2, .8, .2)), [
			Th($(10, 32, 40, 36), J("seed.contact.title")),
			Th($(10, 84, 36, 130), J("seed.contact.info"), { box: !0 }),
			Dh($(60, 100, 22, 40), J("seed.contact.button"), { href: `mailto:${J("seed.email")}` })
		])
	}), e.sections.define("feature-cards", {
		label: "Feature cards",
		labelKey: "preset.feature-cards.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Three cards with icon, title and text",
		hintKey: "preset.feature-cards.hint",
		create: () => {
			let e = (e, t, n, r) => {
				let i = Oh($(e + 10.5, 88, 4, 52), n), a = Th($(e, 152, 25, 200), J("seed.features.card", { title: r }), {
					align: "center",
					box: !0
				});
				return a.animation = Mh(), i.mobileOrder = Jh(88, t, 0), a.mobileOrder = Jh(88, t, 1), [i, a];
			};
			return Yh("feature-cards", "420px", Hh(Uh("bg")), [
				Th($(6, 28, 60, 38), J("seed.features.title")),
				...e(6, 0, "✦", J("seed.features.card1")),
				...e(37.5, 1, "★", J("seed.features.card2")),
				...e(69, 2, "✓", J("seed.features.card3"))
			]);
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = qh(e, 3, 6, 31.5, 152, 296, 25, 264, -64), i = Oh($(t + 10.5, n - 64, 4, 52), "✦"), a = Th($(t, n, 25, 200), J("seed.features.card", { title: J("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return a.animation = Mh(), i.mobileOrder = Jh(88, r, 0), a.mobileOrder = Jh(88, r, 1), {
				blocks: [i, a],
				bottom: n + 228
			};
		}
	}), e.sections.define("feature-cards-simple", {
		label: "Feature cards without icons",
		labelKey: "preset.feature-cards-simple.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Three cards with title and text (without the icons above)",
		hintKey: "preset.feature-cards-simple.hint",
		create: () => {
			let e = (e, t, n) => {
				let r = Th($(e, 88, 25, 200), J("seed.features.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.animation = Mh(), r.mobileOrder = Jh(88, t, 0), r;
			};
			return Yh("feature-cards-simple", "360px", Hh(Uh("bg")), [
				Th($(6, 28, 60, 38), J("seed.features.title")),
				e(6, 0, J("seed.features.card1")),
				e(37.5, 1, J("seed.features.card2")),
				e(69, 2, J("seed.features.card3"))
			]);
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = qh(e, 3, 6, 31.5, 88, 232, 25, 200), i = Th($(t, n, 25, 200), J("seed.features.card", { title: J("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.animation = Mh(), i.mobileOrder = Jh(88, r, 0), {
				blocks: [i],
				bottom: n + 228
			};
		}
	}), e.sections.define("news", {
		label: "News",
		labelKey: "preset.news.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Three news cards with image, tag and date",
		hintKey: "preset.news.hint",
		create: () => {
			let e = (e, t) => {
				let n = Eh($(e, 88, 25, 160)), r = Th($(e, 256, 25, 160), J("seed.news.card"));
				return n.mobileOrder = Jh(88, t, 0), r.mobileOrder = Jh(88, t, 1), [n, r];
			};
			return Yh("news", "460px", Hh(Uh("bg")), [
				Th($(6, 28, 50, 38), J("seed.news.title")),
				Dh($(78, 30, 16, 36), J("seed.news.seeAll"), { style: "secondary" }),
				...e(6, 0),
				...e(37.5, 1),
				...e(69, 2)
			]);
		},
		itemLabel: "story",
		itemLabelKey: "item.story",
		item: (e) => {
			let { x: t, y: n, n: r } = qh(e, 3, 6, 31.5, 88, 344, 25, 328), i = Eh($(t, n, 25, 160)), a = Th($(t, n + 168, 25, 160), J("seed.news.card"));
			return i.mobileOrder = Jh(88, r, 0), a.mobileOrder = Jh(88, r, 1), {
				blocks: [i, a],
				bottom: n + 352
			};
		}
	}), e.sections.define("news-collection", {
		label: "News (collection)",
		labelKey: "preset.news-collection.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "News cards from a collection: write entries, the cards follow",
		hintKey: "preset.news-collection.hint",
		create: () => Yh("news-collection", "300px", Hh(Uh("bg")), [Th($(6, 28, 50, 38), J("seed.news.title")), Nh($(6, 88, 88, 180), "cards")])
	}), e.sections.define("noticeboard", {
		label: "Noticeboard",
		labelKey: "preset.noticeboard.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Dated list from a collection (notices/announcements)",
		hintKey: "preset.noticeboard.hint",
		create: () => Yh("noticeboard", "300px", Hh(Uh("surface")), [Th($(6, 28, 50, 38), J("seed.noticeboard.title")), Nh($(6, 88, 88, 180), "list", { limit: 8 })])
	}), e.sections.define("publication-archive", {
		label: "Publication archive",
		labelKey: "preset.publication-archive.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Year-grouped archive from a collection (issues, minutes, reports)",
		hintKey: "preset.publication-archive.hint",
		create: () => Yh("publication-archive", "300px", Hh(Uh("bg")), [Th($(6, 28, 60, 38), J("seed.archive.title")), Nh($(6, 88, 88, 180), "archive", { limit: 0 })])
	}), e.sections.define("events", {
		label: "Events",
		labelKey: "preset.events.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Three rows with date badge and sign-up button",
		hintKey: "preset.events.hint",
		create: () => {
			let e = (e, t, n, r) => [
				Th($(6, e, 8, 88), J("seed.events.dateBadge", {
					day: t,
					month: n
				}), {
					align: "center",
					box: !0
				}),
				Th($(16, e, 58, 88), J("seed.events.row", { title: r })),
				Dh($(78, e + 24, 16, 40), J("seed.events.signup"), { style: "secondary" })
			];
			return Yh("events", "440px", Hh(Uh("surface")), [
				Th($(6, 28, 50, 38), J("seed.events.title")),
				...e(88, "11", J("seed.events.monthAug"), J("seed.events.row1")),
				...e(196, "25", J("seed.events.monthAug"), J("seed.events.row2")),
				...e(304, "8", J("seed.events.monthSep"), J("seed.events.row3"))
			]);
		},
		itemLabel: "row",
		itemLabelKey: "item.row",
		item: (e) => {
			let t = Gh(e) + 16;
			return {
				blocks: [
					Th($(6, t, 8, 88), J("seed.events.newBadge"), {
						align: "center",
						box: !0
					}),
					Th($(16, t, 58, 88), J("seed.events.row", { title: J("seed.events.newTitle") })),
					Dh($(78, t + 24, 16, 40), J("seed.events.signup"), { style: "secondary" })
				],
				bottom: t + 116
			};
		}
	}), e.sections.define("team", {
		label: "Team/board",
		labelKey: "preset.team.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Portraits with name, role and email",
		hintKey: "preset.team.hint",
		create: () => {
			let e = (e, t, n) => {
				let r = Eh($(e, 80, 22, 180), { alt: J("seed.team.alt") }), i = Th($(e, 268, 22, 84), J("seed.team.member", { role: n }), { align: "center" });
				return r.mobileOrder = Jh(80, t, 0), i.mobileOrder = Jh(80, t, 1), [r, i];
			};
			return Yh("team", "420px", Hh(Uh("surface")), [
				Th($(6, 24, 50, 32), J("seed.team.title")),
				...e(7.5, 0, J("seed.team.role1")),
				...e(39, 1, J("seed.team.role2")),
				...e(70.5, 2, J("seed.team.role3"))
			]);
		},
		itemLabel: "person",
		itemLabelKey: "item.person",
		item: (e) => {
			let { x: t, y: n, n: r } = qh(e, 3, 7.5, 31.5, 80, 288, 22, 272), i = Eh($(t, n, 22, 180), { alt: J("seed.team.alt") }), a = Th($(t, n + 188, 22, 84), J("seed.team.member", { role: J("seed.team.roleNew") }), { align: "center" });
			return i.mobileOrder = Jh(80, r, 0), a.mobileOrder = Jh(80, r, 1), {
				blocks: [i, a],
				bottom: n + 296
			};
		}
	}), e.sections.define("faq", {
		label: "FAQ",
		labelKey: "preset.faq.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Questions and answers in cards",
		hintKey: "preset.faq.hint",
		create: () => Yh("faq", "520px", Hh(Uh("bg")), [
			Th($(25, 24, 50, 36), J("seed.faq.title"), { align: "center" }),
			Rh($(20, 80, 60, 320), [
				{
					q: J("seed.faq.q1"),
					a: J("seed.faq.answer")
				},
				{
					q: J("seed.faq.q2"),
					a: J("seed.faq.answer")
				},
				{
					q: J("seed.faq.q3"),
					a: J("seed.faq.answer")
				}
			]),
			Th($(20, 416, 60, 32), J("seed.faq.more"), { align: "center" })
		])
	}), e.sections.define("timeline", {
		label: "Timeline",
		labelKey: "preset.timeline.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Your story as events along a line",
		hintKey: "preset.timeline.hint",
		create: () => Yh("timeline", "480px", Hh(Uh("bg")), [Th($(25, 24, 50, 36), J("seed.timeline.title"), { align: "center" }), Bh($(25, 88, 50, 330), [
			{
				year: "2019",
				title: J("seed.timeline.t1"),
				text: J("seed.timeline.text")
			},
			{
				year: "2022",
				title: J("seed.timeline.t2"),
				text: J("seed.timeline.text")
			},
			{
				year: "2026",
				title: J("seed.timeline.t3"),
				text: J("seed.timeline.text")
			}
		])])
	}), e.sections.define("steps", {
		label: "Step by step",
		labelKey: "preset.steps.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Three numbered cards",
		hintKey: "preset.steps.hint",
		create: () => {
			let e = (e, t, n) => {
				let r = Th($(e, 88, 25, 72), `<h3>${t + 1}</h3>`, {
					align: "center",
					size: 44
				}), i = Th($(e, 168, 25, 160), J("seed.steps.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.mobileOrder = Jh(88, t, 0), i.mobileOrder = Jh(88, t, 1), [r, i];
			};
			return Yh("steps", "400px", Hh(Uh("bg")), [
				Th($(6, 28, 60, 38), J("seed.steps.title")),
				...e(6, 0, J("seed.steps.s1")),
				...e(37.5, 1, J("seed.steps.s2")),
				...e(69, 2, J("seed.steps.s3"))
			]);
		},
		itemLabel: "step",
		itemLabelKey: "item.step",
		item: (e) => {
			let { x: t, y: n, n: r } = qh(e, 3, 6, 31.5, 88, 272, 25, 240), i = Th($(t, n, 25, 72), `<h3>${r + 1}</h3>`, {
				align: "center",
				size: 44
			}), a = Th($(t, n + 80, 25, 160), J("seed.steps.card", { title: J("seed.steps.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.mobileOrder = Jh(88, r, 0), a.mobileOrder = Jh(88, r, 1), {
				blocks: [i, a],
				bottom: n + 268
			};
		}
	}), e.sections.define("lead-story", {
		label: "Lead story",
		labelKey: "preset.lead-story.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "One big story and two small beside it",
		hintKey: "preset.lead-story.hint",
		create: () => {
			let e = [
				Eh($(6, 40, 55, 300)),
				Th($(6, 348, 55, 108), J("seed.feature.main")),
				Dh($(6, 464, 14, 38), J("seed.readMore"), { style: "secondary" }),
				Eh($(66, 40, 28, 120)),
				Th($(66, 164, 28, 60), J("seed.feature.small1")),
				Eh($(66, 244, 28, 120)),
				Th($(66, 368, 28, 60), J("seed.feature.small2"))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = Jh(40, t < 3 ? 0 : 1, t);
			}), Yh("lead-story", "540px", Hh(Uh("bg")), e);
		}
	}), e.sections.define("products", {
		label: "Products",
		labelKey: "preset.products.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Three hand-built product cards with their own buy link; the Shop preset gives real products with a basket",
		hintKey: "preset.products.hint",
		create: () => {
			let e = (e, t, n, r) => {
				let i = [
					Eh($(e, 88, 25, 200)),
					Th($(e, 296, 25, 76), J("seed.products.card", {
						name: n,
						price: r
					}), { align: "center" }),
					Dh($(e + 5, 380, 15, 40), J("seed.products.buy"))
				];
				return i.forEach((e, n) => {
					e.mobileOrder = Jh(88, t, n);
				}), i;
			};
			return Yh("products", "470px", Hh(Uh("bg")), [
				Th($(6, 28, 50, 38), J("seed.products.title")),
				...e(6, 0, J("seed.products.name"), J("seed.products.price1")),
				...e(37.5, 1, J("seed.products.name"), J("seed.products.price2")),
				...e(69, 2, J("seed.products.name"), J("seed.products.price3"))
			]);
		},
		itemLabel: "product",
		itemLabelKey: "item.product",
		item: (e) => {
			let { x: t, y: n, n: r } = qh(e, 3, 6, 31.5, 88, 348, 25, 332), i = [
				Eh($(t, n, 25, 200)),
				Th($(t, n + 208, 25, 76), J("seed.products.card", {
					name: J("seed.products.name"),
					price: J("seed.products.price1")
				}), { align: "center" }),
				Dh($(t + 5, n + 292, 15, 40), J("seed.products.buy"))
			];
			return i.forEach((e, t) => {
				e.mobileOrder = Jh(88, r, t);
			}), {
				blocks: i,
				bottom: n + 356
			};
		}
	}), e.sections.define("shop", {
		label: "Shop",
		labelKey: "preset.shop.label",
		group: "Shop",
		groupKey: "presetGroup.shop",
		hint: "Real product cards from a product collection, with a basket",
		hintKey: "preset.shop.hint",
		create: () => Yh("shop", "544px", Hh(Uh("bg")), [
			Th($(6, 28, 50, 38), J("seed.shop.title")),
			Fh($(78, 88, 16, 48)),
			Ph($(6, 176, 88, 320))
		])
	}), e.sections.define("shop-hero", {
		label: "Shop hero",
		labelKey: "preset.shop-hero.label",
		group: "Shop",
		groupKey: "presetGroup.shop",
		hint: "Campaign band: big heading, subtext, CTA and a campaign image",
		hintKey: "preset.shop-hero.hint",
		create: () => {
			let e = [
				Th($(6, 48, 52, 96), J("seed.shopHero.title")),
				Th($(6, 152, 40, 48), J("seed.shopHero.sub")),
				Dh($(6, 216, 17, 42), J("seed.shopHero.cta")),
				Eh($(62, 40, 32, 300))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = Jh(48, t < 3 ? 0 : 1, t);
			}), Yh("shop-hero", "400px", {
				version: 1,
				layers: [
					Uh("bg"),
					Wh(.8, .25, .28, .6),
					{
						type: "grain",
						version: 1,
						props: { opacity: .05 }
					}
				]
			}, e);
		}
	}), e.sections.define("shop-categories", {
		label: "Shop categories",
		labelKey: "preset.shop-categories.label",
		group: "Shop",
		groupKey: "presetGroup.shop",
		hint: "Four category tiles with image and name; set the link on the image in Properties",
		hintKey: "preset.shop-categories.hint",
		create: () => {
			let e = (e, t, n) => {
				let r = Eh($(e, 88, 21, 170)), i = Th($(e, 266, 21, 34), J("seed.shopCategories.tile", { name: n }), { align: "center" });
				return r.mobileOrder = Jh(88, t, 0), i.mobileOrder = Jh(88, t, 1), [r, i];
			}, t = Yh("shop-categories", "360px", Hh(Uh("bg")), [
				Th($(6, 28, 60, 38), J("seed.shopCategories.title")),
				...e(6, 0, J("seed.shopCategories.cat1")),
				...e(29.5, 1, J("seed.shopCategories.cat2")),
				...e(53, 2, J("seed.shopCategories.cat3")),
				...e(76.5, 3, J("seed.shopCategories.cat4"))
			]);
			return t.theme = "soft", t;
		},
		itemLabel: "category",
		itemLabelKey: "item.category",
		item: (e) => {
			let { x: t, y: n, n: r } = qh(e, 4, 6, 23.5, 88, 220, 21, 212), i = Eh($(t, n, 21, 170)), a = Th($(t, n + 178, 21, 34), J("seed.shopCategories.tile", { name: J("seed.shopCategories.newCat") }), { align: "center" });
			return i.mobileOrder = Jh(88, r, 0), a.mobileOrder = Jh(88, r, 1), {
				blocks: [i, a],
				bottom: n + 220
			};
		}
	}), e.sections.define("shop-trust", {
		label: "Shop trust",
		labelKey: "preset.shop-trust.label",
		group: "Shop",
		groupKey: "presetGroup.shop",
		hint: "Three trust points with icon and text (returns, help, safe ordering)",
		hintKey: "preset.shop-trust.hint",
		create: () => {
			let e = (e, t, n, r) => {
				let i = Oh($(e + 10.5, 88, 4, 52), r, 44), a = Th($(e, 148, 25, 96), J(n), { align: "center" });
				return i.mobileOrder = Jh(88, t, 0), a.mobileOrder = Jh(88, t, 1), [i, a];
			}, t = Yh("shop-trust", "300px", Hh(Uh("bg")), [
				Th($(6, 28, 60, 38), J("seed.shopTrust.title")),
				...e(6, 0, "seed.shopTrust.t1", "✓"),
				...e(37.5, 1, "seed.shopTrust.t2", "↻"),
				...e(69, 2, "seed.shopTrust.t3", "✉")
			]);
			return t.theme = "muted", t;
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = qh(e, 3, 6, 31.5, 148, 216, 25, 156, -60), i = Oh($(t + 10.5, n - 60, 4, 52), "✓", 44), a = Th($(t, n, 25, 96), J("seed.shopTrust.newItem"), { align: "center" });
			return i.mobileOrder = Jh(88, r, 0), a.mobileOrder = Jh(88, r, 1), {
				blocks: [i, a],
				bottom: n + 104
			};
		}
	}), e.sections.define("shop-showcase", {
		label: "Shop feature",
		labelKey: "preset.shop-showcase.label",
		group: "Shop",
		groupKey: "presetGroup.shop",
		hint: "Statement band: big typography, text, CTA and an image on a deep surface",
		hintKey: "preset.shop-showcase.hint",
		create: () => {
			let e = [
				Th($(6, 56, 52, 100), J("seed.shopShowcase.title")),
				Th($(6, 164, 42, 56), J("seed.shopShowcase.text")),
				Dh($(6, 236, 18, 42), J("seed.shopShowcase.cta")),
				Eh($(62, 48, 32, 240))
			];
			e.forEach((e, t) => {
				e.mobileOrder = Jh(56, t < 3 ? 0 : 1, t);
			});
			let t = Yh("shop-showcase", "340px", Hh(Uh("bg")), e);
			return t.theme = "deep", t;
		}
	}), e.sections.define("checkout", {
		label: "Checkout",
		labelKey: "preset.checkout.label",
		group: "Shop",
		groupKey: "presetGroup.shop",
		hint: "Order form that sends the basket as an email or to an endpoint",
		hintKey: "preset.checkout.hint",
		create: () => Yh("checkout", "560px", Hh(Uh("bg")), [Th($(6, 28, 50, 38), J("seed.checkout.title")), Ih($(25, 96, 50, 430))])
	}), e.sections.define("cta", {
		label: "CTA banner",
		labelKey: "preset.cta.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Full width with one clear action",
		hintKey: "preset.cta.hint",
		create: () => Yh("cta", "280px", Hh(Uh("surface"), Wh(.5, .5, .3, .7)), [
			Th($(20, 56, 60, 40), J("seed.cta.title"), { align: "center" }),
			Th($(25, 104, 50, 26), J("seed.cta.sub"), { align: "center" }),
			Dh($(42, 148, 16, 42), J("seed.join"))
		])
	}), e.sections.define("quote", {
		label: "Quote",
		labelKey: "preset.quote.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Large quote with attribution",
		hintKey: "preset.quote.hint",
		create: () => Yh("quote", "300px", Hh(Uh("bg")), [zh($(20, 56, 60, 190), {
			text: J("seed.quoteBlock.text"),
			attribution: J("seed.quoteBlock.name"),
			role: J("seed.quoteBlock.role")
		})])
	}), e.sections.define("stats", {
		label: "Statistics",
		labelKey: "preset.stats.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Three big numbers with labels",
		hintKey: "preset.stats.hint",
		create: () => {
			let e = (e, t, n, r, i) => {
				let a = Vh($(e, 76, 25, 120), {
					value: n,
					suffix: r,
					label: i
				});
				return a.mobileOrder = Jh(76, t, 0), a;
			};
			return Yh("stats", "260px", Hh(Uh("surface")), [
				e(6, 0, "120", "+", J("seed.stats.l1")),
				e(37.5, 1, "25", "", J("seed.stats.l2")),
				e(69, 2, "1981", "", J("seed.stats.l3"))
			]);
		},
		itemLabel: "number",
		itemLabelKey: "item.number",
		item: (e) => {
			let { x: t, y: n, n: r } = qh(e, 3, 6, 31.5, 76, 140, 25, 120), i = Vh($(t, n, 25, 120), {
				value: "42",
				label: J("seed.stats.newLabel")
			});
			return i.mobileOrder = Jh(76, r, 0), {
				blocks: [i],
				bottom: n + 148
			};
		}
	}), e.sections.define("sponsors", {
		label: "Sponsors",
		labelKey: "preset.sponsors.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Greyscale logo row with links",
		hintKey: "preset.sponsors.hint",
		create: () => {
			let e = (e) => Eh($(e, 108, 18.5, 100), {
				alt: J("seed.sponsors.alt"),
				fit: "contain",
				radius: null,
				saturate: 0
			});
			return Yh("sponsors", "280px", Hh(Uh("bg")), [
				Th($(6, 28, 60, 36), J("seed.sponsors.title")),
				e(5.5),
				e(29),
				e(52.5),
				e(76)
			]);
		},
		itemLabel: "logo",
		itemLabelKey: "item.logo",
		item: (e) => {
			let { x: t, y: n } = qh(e, 4, 5.5, 23.5, 108, 124, 18.5, 100);
			return {
				blocks: [Eh($(t, n, 18.5, 100), {
					alt: J("seed.sponsors.alt"),
					fit: "contain",
					radius: null,
					saturate: 0
				})],
				bottom: n + 124
			};
		}
	}), e.sections.define("membership", {
		label: "Membership",
		labelKey: "preset.membership.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Price tiers with benefits and a Vipps line",
		hintKey: "preset.membership.hint",
		create: () => Yh("membership", "500px", Hh(Uh("surface")), [
			Th($(6, 28, 50, 38), J("seed.membership.title")),
			Th($(14, 88, 32, 250), J("seed.membership.tier1"), {
				align: "center",
				box: !0
			}),
			Th($(54, 88, 32, 250), J("seed.membership.tier2"), {
				align: "center",
				box: !0
			}),
			Dh($(42, 358, 16, 42), J("seed.join")),
			Th($(25, 414, 50, 30), J("seed.membership.vipps"), { align: "center" })
		])
	});
}
//#endregion
//#region ../template/assets/engine/0.7.4/templates-model.js
var Zh = [
	"section",
	"blocks",
	"page"
];
function Qh(e) {
	return no(String(e ?? ""), "");
}
function $h(e, t, { id: n, title: r }) {
	let i = structuredClone(e);
	i.meta = {
		...i.meta,
		id: n,
		title: r
	};
	for (let e of i.sections ?? []) {
		e.id = t("sec");
		for (let n of e.blocks ?? []) n.id = t("blk");
		fh(e), dh(e), ph(e);
	}
	return i;
}
//#endregion
//#region ../template/assets/engine/0.7.4/collections-csv.js
var eg = [
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
function tg(e) {
	let t = String(e ?? "");
	return /[",\n\r]/.test(t) ? `"${t.replaceAll("\"", "\"\"")}"` : t;
}
function ng(e, t) {
	return t === "sizes" ? (e.sizes ?? []).join("|") : t === "colors" ? (e.colors ?? []).map((e) => e.name).join("|") : e[t] ?? "";
}
function rg(e) {
	let t = [eg.join(",")];
	for (let n of e ?? []) t.push(eg.map((e) => tg(ng(n, e))).join(","));
	return t.join("\n") + "\n";
}
function ig(e) {
	let t = [], n = [], r = "", i = !1, a = String(e ?? "");
	for (let e = 0; e < a.length; e += 1) {
		let o = a[e];
		i ? o === "\"" && a[e + 1] === "\"" ? (r += "\"", e += 1) : o === "\"" ? i = !1 : r += o : o === "\"" ? i = !0 : o === "," ? (n.push(r), r = "") : o === "\n" || o === "\r" ? (o === "\r" && a[e + 1] === "\n" && (e += 1), n.push(r), t.push(n), n = [], r = "") : r += o;
	}
	return (r !== "" || n.length) && (n.push(r), t.push(n)), t.filter((e) => e.some((e) => e.trim() !== ""));
}
var ag = (e) => String(e ?? "").split("|").map((e) => e.trim()).filter(Boolean);
function og(e) {
	let t = ig(e);
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
		let s = ag(t.sizes);
		s.length && (o.sizes = s);
		let c = ag(t.colors);
		c.length && (o.colors = c.map((e) => ({ name: e }))), r.push(o);
	}
	return {
		entries: r,
		skipped: i
	};
}
//#endregion
//#region ../template/assets/engine/0.7.4/feeds.js
function sg(e) {
	return String(e ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&apos;");
}
function cg(e, t) {
	let n = String(t ?? "").replace(/\/+$/, "");
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${(e ?? []).filter((e) => !e.noindex).map((e) => `  <url><loc>${sg(n + (e.path === "/" ? "/" : e.path))}</loc></url>`).join("\n")}\n</urlset>\n`;
}
function lg(e) {
	return `User-agent: *\nDisallow: /admin/\n\nSitemap: ${String(e ?? "").replace(/\/+$/, "")}/sitemap.xml\n`;
}
var ug = [
	"news",
	"notices",
	"publications"
];
function dg(e) {
	let t = String(e.origin ?? "").replace(/\/+$/, ""), n = (e.items ?? []).map((n) => {
		let r = n.href ? new URL(n.href, t + "/").href : t + "/", i = n.date ? new Date(n.date) : null, a = i && !Number.isNaN(i.getTime()) ? `\n      <pubDate>${i.toUTCString()}</pubDate>` : "", o = n.text ? `\n      <description>${sg(n.text)}</description>` : "";
		return `    <item>\n      <title>${sg(n.title)}</title>\n      <link>${sg(r)}</link>\n      <guid isPermaLink="false">${sg(`${e.path}#${n.id ?? n.title}`)}</guid>${o}${a}\n    </item>`;
	}).join("\n");
	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${sg(e.title)}</title>\n    <link>${sg(t + "/")}</link>\n    <description>${sg(e.description ?? e.title)}</description>\n${n}${n ? "\n" : ""}  </channel>\n</rss>\n`;
}
//#endregion
//#region ../template/assets/engine/0.7.4/preset-thumb.js
var fg = /^#[0-9a-fA-F]{3,8}$/, pg = /^[a-z][a-z0-9-]*$/, mg = "#171c26", hg = "#232a38", gg = "#98a1b3", _g = "#7c5cff", vg = (e, t) => `var(--urd-color-${e}, ${t})`;
function yg(e, t) {
	return typeof e == "string" ? fg.test(e) ? e : pg.test(e) ? vg(e, t) : t : t;
}
function bg(e, t = 800) {
	let n = Number.parseFloat(e);
	return !Number.isFinite(n) || n <= 0 ? 400 : typeof e == "string" && e.trim().endsWith("vh") ? n / 100 * t : n;
}
var xg = (e) => Math.round(e * 10) / 10, Sg = (e, t, n) => Math.min(n, Math.max(t, e)), Cg = (e, t, n, r, i, a = "") => `<rect x="${xg(e)}" y="${xg(t)}" width="${xg(Math.max(n, 1))}" height="${xg(Math.max(r, 1))}" fill="${i}"${a}/>`;
function wg(e) {
	if (e?.theme) return e.theme === "inverse" || e.theme === "deep" ? vg("text", gg) : e.theme === "accent" ? vg("accent", _g) : vg("surface", hg);
	for (let t of e?.background?.layers ?? []) {
		if (t.type === "color") return yg(t.props?.value, mg);
		if (t.type === "gradient") return yg(Array.isArray(t.props?.stops) ? t.props.stops[0] : null, mg);
	}
	return vg("bg", mg);
}
function Tg(e, t, n, r, i) {
	let a = /<h[1-3]/.test(String(i?.html ?? "")), o = i?.align === "center", s = vg("text", gg), c = [];
	i?.box && c.push(Cg(e, t, n, r, vg("surface", hg), " rx=\"1.5\""));
	let l = i?.box ? Math.min(2, n * .06) : 0, u = e + l, d = n - l * 2, f = [
		.72,
		.9,
		.5
	], p = [
		a ? 4 : 2.2,
		2.2,
		2.2
	], m = Sg(r / (p[0] + p[1] + p[2] + 4.8 + 2), 0, 1), h = t + l + Math.min(1, r * .08);
	for (let e = 0; e < 3; e++) {
		let n = Math.min(Math.max(e === 0 ? a ? 1.4 : 1 : .8, p[e] * m), Math.max(r, 1));
		if (e > 0 && h + n > t + r - l) break;
		let i = d * f[e], g = o ? u + (d - i) / 2 : u;
		c.push(Cg(g, h, i, n, s, ` opacity="${e === 0 ? .8 : .4}" rx="${xg(Math.min(1, n / 2))}"`)), h += n + Math.max(.8, 2.4 * m);
	}
	return c.join("");
}
function Eg(e, t, n, r, i = !1) {
	let a = vg("text", gg), o = [];
	i ? (o.push(Cg(e, t, n, r, vg("surface", hg), " rx=\"1.5\" opacity=\"0.35\"")), o.push(`<rect x="${xg(e + .4)}" y="${xg(t + .4)}" width="${xg(Math.max(n - .8, 1))}" height="${xg(Math.max(r - .8, 1))}" fill="none" stroke="${a}" stroke-width="0.6" stroke-dasharray="2 2" opacity="0.35" rx="1.5"/>`)) : o.push(Cg(e, t, n, r, vg("surface", hg), " rx=\"1.5\""));
	let s = i ? .15 : .4, c = (t) => xg(e + n * t), l = (e) => xg(t + r * e);
	return o.push(`<polygon points="${c(.08)},${l(.9)} ${c(.42)},${l(.38)} ${c(.62)},${l(.68)} ${c(.75)},${l(.5)} ${c(.92)},${l(.9)}" fill="${a}" opacity="${s}"/>`), o.push(`<circle cx="${c(.28)}" cy="${l(.26)}" r="${xg(Math.max(1, Math.min(n, r) * .1))}" fill="${a}" opacity="${xg(s + .1)}"/>`), o.join("");
}
function Dg(e, t, n, r, i) {
	let a = !(Array.isArray(i?.images) && i.images.length), o = Math.max(1, n * .03), s = (n - o * 2) / 3, c = [];
	for (let n = 0; n < 3; n++) c.push(Eg(e + n * (s + o), t, s, r, a));
	return c.join("");
}
function Og(e, t, n, r) {
	let i = Math.max(1, n * .03), a = (n - i * 2) / 3, o = [];
	for (let n = 0; n < 3; n++) {
		let s = e + n * (a + i);
		o.push(Cg(s, t, a, r * .55, vg("surface", hg), " rx=\"1.5\"")), o.push(Cg(s, t + r * .62, a * .8, 2, vg("text", gg), " opacity=\"0.5\" rx=\"1\""));
	}
	return o.join("");
}
function kg(e, t, n, r, i) {
	let a = yg(i?.color, _g), o = i?.kind;
	return o === "circle" ? `<ellipse cx="${xg(e + n / 2)}" cy="${xg(t + r / 2)}" rx="${xg(Math.max(n / 2, 1))}" ry="${xg(Math.max(r / 2, 1))}" fill="${a}" opacity="0.8"/>` : o === "triangle" ? `<polygon points="${xg(e)},${xg(t + r)} ${xg(e + n / 2)},${xg(t)} ${xg(e + n)},${xg(t + r)}" fill="${a}" opacity="0.8"/>` : o === "line" || o === "arrow" ? Cg(e, t + r / 2 - .75, n, 1.5, a, " opacity=\"0.85\" rx=\"0.75\"") : Cg(e, t, n, r, a, " opacity=\"0.8\" rx=\"1\"");
}
function Ag(e, t, n, r, i, a) {
	if (e === "text") return Tg(t, n, r, i, a);
	if (e === "image") return Eg(t, n, r, i, !a?.src);
	if (e === "gallery") return Dg(t, n, r, i, a);
	if (e === "collection") return Og(t, n, r, i);
	if (e === "faq") {
		let e = Sg(Math.floor(i / 5), 2, 3), a = Math.max(.6, i * .04), o = (i - a * (e - 1)) / e, s = [];
		for (let i = 0; i < e; i += 1) {
			let e = n + i * (o + a);
			s.push(Cg(t, e, r, o, vg("surface", hg), " rx=\"1\"")), s.push(Cg(t + r * .06, e + o / 2 - .7, r * .55, 1.4, vg("text", gg), " opacity=\"0.5\" rx=\"0.7\"")), s.push(`<circle cx="${xg(t + r * .92)}" cy="${xg(e + o / 2)}" r="0.9" fill="${vg("text", gg)}" opacity="0.4"/>`);
		}
		return s.join("");
	}
	if (e === "shape") return kg(t, n, r, i, a);
	if (e === "button") return Cg(t, n, r, i, vg("accent", _g), ` rx="${xg(Math.min(i / 2, 4))}"`);
	if (e === "icon") {
		let e = Math.max(1.2, Math.min(r, i) / 2);
		return `<circle cx="${xg(t + r / 2)}" cy="${xg(n + i / 2)}" r="${xg(e)}" fill="${vg("accent", _g)}" opacity="0.85"/>`;
	}
	if (e === "video") {
		let e = [Cg(t, n, r, i, vg("surface", hg), " rx=\"1.5\"")], a = t + r / 2, o = n + i / 2, s = Math.max(1.5, Math.min(r, i) * .22);
		return e.push(`<polygon points="${xg(a - s / 2)},${xg(o - s)} ${xg(a - s / 2)},${xg(o + s)} ${xg(a + s)},${xg(o)}" fill="${vg("text", gg)}" opacity="0.6"/>`), e.join("");
	}
	if (e === "timeline") {
		let e = [Cg(t + 1, n, 1.4, i, vg("accent", _g), " opacity=\"0.7\" rx=\"0.7\"")];
		for (let a = 0; a < 3; a += 1) {
			let o = n + i * (.18 + a * .32);
			e.push(`<circle cx="${xg(t + 1.7)}" cy="${xg(o)}" r="1.6" fill="${vg("accent", _g)}"/>`), e.push(Cg(t + 5, o - 1, r * .5, 2, vg("text", gg), " opacity=\"0.5\" rx=\"1\""));
		}
		return e.join("");
	}
	if (e === "quote") return [
		`<text x="${xg(t + r / 2)}" y="${xg(n + i * .34)}" text-anchor="middle" font-size="${xg(Math.min(r, i) * .5)}" font-family="Georgia, serif" fill="${vg("accent", _g)}">“</text>`,
		Cg(t + r * .15, n + i * .48, r * .7, 2, vg("text", gg), " opacity=\"0.6\" rx=\"1\""),
		Cg(t + r * .25, n + i * .62, r * .5, 2, vg("text", gg), " opacity=\"0.6\" rx=\"1\""),
		Cg(t + r * .35, n + i * .82, r * .3, 1.6, vg("text", gg), " opacity=\"0.35\" rx=\"0.8\"")
	].join("");
	if (e === "ribbon") return [
		Cg(t, n + i * .3, r, i * .4, vg("accent", _g), " opacity=\"0.85\" rx=\"1\""),
		Cg(t + r * .08, n + i * .46, r * .18, 1.8, vg("bg", mg), " opacity=\"0.9\" rx=\"0.9\""),
		Cg(t + r * .34, n + i * .46, r * .24, 1.8, vg("bg", mg), " opacity=\"0.9\" rx=\"0.9\""),
		Cg(t + r * .66, n + i * .46, r * .2, 1.8, vg("bg", mg), " opacity=\"0.9\" rx=\"0.9\"")
	].join("");
	if (e === "stats") return [Cg(t + r * .28, n + i * .15, r * .44, i * .42, vg("accent", _g), " opacity=\"0.85\" rx=\"1\""), Cg(t + r * .32, n + i * .72, r * .36, 1.6, vg("text", gg), " opacity=\"0.4\" rx=\"0.8\"")].join("");
	if (e === "table") {
		let e = Math.max(1.6, i * .22), a = [Cg(t, n, r, e, vg("accent", _g), " opacity=\"0.5\" rx=\"0.8\"")], o = Sg(Math.floor((i - e) / 3.2), 1, 3);
		for (let s = 0; s < o; s += 1) a.push(Cg(t, n + e + 1 + s * ((i - e - 1) / o), r, 1, vg("text", gg), " opacity=\"0.3\""));
		return a.push(Cg(t + r * .33, n, .6, i, vg("text", gg), " opacity=\"0.2\"")), a.push(Cg(t + r * .66, n, .6, i, vg("text", gg), " opacity=\"0.2\"")), a.join("");
	}
	if (e === "share") {
		let e = Math.max(1.2, Math.min(i / 2, r / 9)), a = [];
		for (let r = 0; r < 4; r += 1) a.push(`<circle cx="${xg(t + e + r * (e * 2 + 1.5))}" cy="${xg(n + i / 2)}" r="${xg(e)}" fill="${vg("accent", _g)}" opacity="0.8"/>`);
		return a.join("");
	}
	if (e === "countdown") {
		let e = Math.max(.8, r * .03), a = (r - e * 3) / 4, o = [];
		for (let r = 0; r < 4; r += 1) {
			let s = t + r * (a + e);
			o.push(Cg(s, n, a, i, vg("surface", hg), " rx=\"1\"")), o.push(Cg(s + a * .25, n + i * .2, a * .5, i * .35, vg("accent", _g), " opacity=\"0.85\" rx=\"0.8\""));
		}
		return o.join("");
	}
	if (e === "audio") {
		let e = [Cg(t, n, r, i, vg("surface", hg), " rx=\"1.5\"")], a = n + i / 2, o = Math.max(1.2, i * .28);
		return e.push(`<polygon points="${xg(t + r * .06)},${xg(a - o)} ${xg(t + r * .06)},${xg(a + o)} ${xg(t + r * .06 + o * 1.4)},${xg(a)}" fill="${vg("accent", _g)}" opacity="0.85"/>`), e.push(Cg(t + r * .2, a - .6, r * .7, 1.2, vg("text", gg), " opacity=\"0.35\" rx=\"0.6\"")), e.join("");
	}
	if (e === "product") {
		let e = Math.max(.8, r * .03), a = (r - e * 2) / 3, o = [];
		for (let r = 0; r < 3; r += 1) {
			let s = t + r * (a + e);
			o.push(Cg(s, n, a, i, vg("surface", hg), " rx=\"1\"")), o.push(Cg(s + a * .08, n + i * .06, a * .84, i * .42, vg("text", gg), " opacity=\"0.15\" rx=\"0.8\"")), o.push(Cg(s + a * .08, n + i * .56, a * .6, 1.4, vg("text", gg), " opacity=\"0.5\" rx=\"0.7\"")), o.push(Cg(s + a * .08, n + i * .72, a * .35, 1.4, vg("accent", _g), " opacity=\"0.85\" rx=\"0.7\"")), o.push(Cg(s + a * .08, n + i * .84, a * .84, i * .1, vg("accent", _g), " opacity=\"0.6\" rx=\"1\""));
		}
		return o.join("");
	}
	if (e === "cart") {
		let e = Math.max(1.5, Math.min(r, i) / 2.4), a = t + r / 2, o = n + i / 2;
		return [
			`<circle cx="${xg(a)}" cy="${xg(o)}" r="${xg(e)}" fill="${vg("surface", hg)}"/>`,
			Cg(a - e * .5, o - e * .25, e, e * .55, vg("text", gg), " opacity=\"0.5\" rx=\"0.4\""),
			`<circle cx="${xg(a + e * .75)}" cy="${xg(o - e * .75)}" r="${xg(Math.max(.9, e * .35))}" fill="${vg("accent", _g)}"/>`
		].join("");
	}
	return e === "checkout" ? [
		Cg(t, n, r * .7, 1.2, vg("text", gg), " opacity=\"0.5\" rx=\"0.6\""),
		Cg(t, n + i * .12, r * .5, 1.2, vg("text", gg), " opacity=\"0.35\" rx=\"0.6\""),
		Cg(t, n + i * .3, r, i * .14, vg("surface", hg), " rx=\"1\""),
		Cg(t, n + i * .5, r, i * .14, vg("surface", hg), " rx=\"1\""),
		Cg(t, n + i * .78, r * .45, i * .16, vg("accent", _g), " opacity=\"0.85\" rx=\"1.2\"")
	].join("") : Cg(t, n, r, i, vg("surface", hg), " rx=\"1.5\"");
}
function jg(e, t, n) {
	let r = Array.isArray(e?.blocks) ? e.blocks : [], i = r.map((e) => (e.frames?.desktop?.y ?? 0) + (e.frames?.desktop?.h ?? 0)), a = n / Math.max(bg(e?.size?.minHeight), i.length ? Math.max(...i) + 16 : 0), o = [Cg(0, 0, t, n, wg(e))];
	for (let r of e?.background?.layers ?? []) {
		if (r.type !== "glow") continue;
		let e = r.props ?? {};
		o.push(`<circle cx="${xg(Sg(e.x ?? .5, 0, 1) * t)}" cy="${xg(Sg(e.y ?? .3, 0, 1) * n)}" r="${xg(t * Sg(e.radius ?? .5, .1, 1) * .5)}" fill="${yg(e.color, _g)}" opacity="${xg(Sg(e.opacity ?? .3, 0, .5))}"/>`);
	}
	for (let r of e?.background?.layers ?? []) {
		if (r.type !== "slideshow") continue;
		let e = r.props ?? {}, i = e.style ?? "floating", a = vg("surface", hg);
		if (i === "floating") {
			let r = e.look === "polaroid", s = t * (r ? .17 : .13), c = s / (r ? .84 : 1.35);
			for (let r of _l(e.images, {
				...e,
				seed: e.seed || 1,
				style: i
			})) {
				let e = r.x / 100 * t - s / 2, i = r.y / 100 * n - c / 2, l = ` rx="1" opacity="0.75" transform="rotate(${xg(r.rot)} ${xg(e + s / 2)} ${xg(i + c / 2)})"`;
				o.push(Cg(e, i, s, c, a, l));
			}
		} else if (i === "band") {
			let r = Number(e.rows) === 1 ? 1 : 2, i = n * (r === 1 ? .4 : .3), s = i * 1.33;
			for (let e = 0; e < r; e += 1) {
				let c = r === 1 ? (n - i) / 2 : n * .1 + e * (i + n * .1);
				for (let n = -s * (e * .5); n < t; n += s + 3) o.push(Cg(n, c, s, i, a, " rx=\"1\" opacity=\"0.75\""));
			}
		} else if (i === "mosaic") {
			let r = (t - 10) / 4, i = n / 3.4, s = 0, c = 0;
			for (let t of bl(e.count, e.seed || 1)) {
				s + t.cols > 4 && (s = 0, c += 1);
				let e = 2 + c * (i + 2);
				if (e > n) break;
				o.push(Cg(2 + s * (r + 2), e, r * t.cols + 2 * (t.cols - 1), i * t.rows + 2 * (t.rows - 1), a, " rx=\"1\" opacity=\"0.75\"")), s += t.cols, s >= 4 && (s = 0, c += 1);
			}
		}
	}
	let s = t * .06, c = t - s * 2;
	for (let e of r) {
		let r = e.frames?.desktop;
		if (!r) continue;
		let i = Sg(s + (r.x ?? 0) * (c / 100), 0, t - 2), l = Sg((r.y ?? 0) * a, 0, n - 2), u = Sg((r.w ?? 10) * (c / 100), 2, t - i), d = Sg((r.h ?? 20) * a, 2, n - l);
		o.push(Ag(e.type, i, l, u, d, e.props));
	}
	return o.join("");
}
function Mg(e, { w: t = 96, h: n = 116, max: r = 6 } = {}) {
	let i = (Array.isArray(e?.sections) ? e.sections : []).slice(0, r);
	if (!i.length) return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${Cg(0, 0, t, n, vg("bg", mg))}</svg>`;
	let a = i.map((e) => Sg(bg(e?.size?.minHeight), 160, 900)), o = a.reduce((e, t) => e + t, 0), s = n - 1 * (i.length - 1), c = [], l = 0;
	for (let e = 0; e < i.length; e += 1) {
		let n = Math.max(6, a[e] / o * s);
		c.push(`<g transform="translate(0 ${xg(l)})">${jg(i[e], t, n)}</g>`), l += n + 1;
	}
	return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${c.join("")}</svg>`;
}
//#endregion
//#region ../template/assets/engine/0.7.4/page-presets.js
var Ng = /* @__PURE__ */ new Map();
Xh({ sections: { define: (e, t) => Ng.set(e, t) } });
var Pg = [
	{
		id: "landing",
		labelKey: "pageTemplate.landing",
		sections: [
			"hero",
			"feature-cards",
			"stats",
			"quote",
			"cta"
		]
	},
	{
		id: "about",
		labelKey: "pageTemplate.about",
		sections: [
			"hero-centered",
			"team",
			"timeline",
			"sponsors",
			"cta"
		]
	},
	{
		id: "contact",
		labelKey: "pageTemplate.contact",
		sections: [
			"hero-centered",
			"contact",
			"faq"
		]
	},
	{
		id: "portfolio",
		labelKey: "pageTemplate.portfolio",
		sections: [
			"hero-centered",
			"gallery",
			"quote",
			"cta"
		]
	},
	{
		id: "event",
		labelKey: "pageTemplate.event",
		sections: [
			"lead-story",
			"events",
			"steps",
			"faq",
			"cta"
		]
	},
	{
		id: "shop",
		labelKey: "pageTemplate.shop",
		sections: [
			"shop-hero",
			"shop",
			"faq",
			"cta"
		]
	},
	{
		id: "shop-front",
		labelKey: "pageTemplate.shopFront",
		sections: [
			"shop-hero",
			"shop",
			"shop-categories",
			"shop-showcase",
			"shop-trust",
			"cta"
		]
	},
	{
		id: "checkout",
		labelKey: "pageTemplate.checkout",
		sections: ["checkout", "contact"]
	}
];
function Fg(e, { pageId: t, title: n }) {
	let r = Pg.find((t) => t.id === e);
	return r ? {
		schemaVersion: 7,
		meta: {
			id: t,
			title: n
		},
		sections: r.sections.map((e) => Ng.get(e).create())
	} : null;
}
//#endregion
//#region ../template/assets/engine/0.7.4/theme.js
function Ig(e, t, n) {
	return t === "light" || t === "dark" ? t : n ? "dark" : "light";
}
function Lg(e, t) {
	let n = e.tokens || {}, r = e.scheme === "dark" ? "dark" : "light";
	if (!e.alt?.tokens || t === r) return n;
	let i = {};
	for (let t of /* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(e.alt.tokens)])) i[t] = {
		...n[t],
		...e.alt.tokens[t]
	};
	return i;
}
var Rg = /^[a-zA-Z0-9#%.,()'"\s+\-*/]+$/;
function zg(e) {
	return typeof e == "string" && Rg.test(e) && !/url\(|\/\*|\*\/|expression/i.test(e);
}
function Bg(e) {
	let t = e.tokens || {}, n = Lg(e, "light"), r = Lg(e, "dark"), i = e.scheme === "dark" ? "dark" : "light", a = [], o = [], s = [], c = /* @__PURE__ */ new Set([
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
			zg(c) && (a.push(`  --urd-${e}-${l}: ${c};`), i && a.push(`  --urd-base-${l}: ${c};`)), u !== d && (i && zg(u) && zg(d) ? o.push({
				name: l,
				lv: u,
				dv: d
			}) : !i && zg(u) && zg(d) && s.push({
				group: e,
				name: l,
				lv: u,
				dv: d
			}));
		}
	}
	let l = o.length > 0 || s.length > 0, u = ![
		t,
		n,
		r
	].some((e) => zg(e.color?.["accent-text"])) && zg(t.color?.accent);
	u && zg(t.color?.bg) && (a.push(`  --urd-color-accent-text: ${t.color.bg};`), a.push(`  --urd-base-accent-text: ${t.color.bg};`));
	let d = `:root {\n  color-scheme: ${l ? "light dark" : i};\n${a.join("\n")}\n}\n`;
	if (u && (d += "@supports (color: contrast-color(#000)) {\n  :root {\n    --urd-color-accent-text: contrast-color(var(--urd-color-accent));\n    --urd-base-accent-text: contrast-color(var(--urd-base-accent));\n  }\n}\n"), !l) return d;
	let f = [];
	for (let e of o) {
		let t = `light-dark(${e.lv}, ${e.dv})`;
		f.push(`    --urd-color-${e.name}: ${t};`), f.push(`    --urd-base-${e.name}: ${t};`);
	}
	if (d += "@supports (color: light-dark(#000, #fff)) {\n", f.length && (d += `  :root {\n${f.join("\n")}\n  }\n`), d += "  :root[data-urd-theme=\"light\"] { color-scheme: light; }\n", d += "  :root[data-urd-theme=\"dark\"] { color-scheme: dark; }\n", s.length) {
		let e = (e) => s.map((t) => `    --urd-${t.group}-${t.name}: ${e(t)};`).join("\n");
		d += `  @media (prefers-color-scheme: dark) {\n    :root {\n${s.map((e) => `      --urd-${e.group}-${e.name}: ${e.dv};`).join("\n")}\n    }\n  }\n`, d += `  :root[data-urd-theme="light"] {\n${e((e) => e.lv)}\n  }\n`, d += `  :root[data-urd-theme="dark"] {\n${e((e) => e.dv)}\n  }\n`;
	}
	return d += "}\n", d;
}
function Vg(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
var Hg = {
	surface: {
		"--urd-color-bg": "var(--urd-base-surface)",
		"--urd-color-surface": "color-mix(in srgb, var(--urd-base-text) 7%, var(--urd-base-surface))"
	},
	accent: {
		"--urd-color-bg": "var(--urd-base-accent)",
		"--urd-color-surface": "color-mix(in srgb, var(--urd-base-accent) 82%, #000)",
		"--urd-color-text": "var(--urd-base-accent-text)",
		"--urd-color-accent": "var(--urd-base-accent-text)",
		"--urd-color-accent-text": "var(--urd-base-accent)"
	},
	inverse: {
		"--urd-color-bg": "var(--urd-base-text)",
		"--urd-color-surface": "color-mix(in srgb, var(--urd-base-text) 78%, var(--urd-base-bg))",
		"--urd-color-text": "var(--urd-base-bg)"
	},
	soft: {
		"--urd-color-bg": "color-mix(in srgb, var(--urd-base-accent) 12%, var(--urd-base-bg))",
		"--urd-color-surface": "color-mix(in srgb, var(--urd-base-accent) 8%, var(--urd-base-surface))"
	},
	muted: {
		"--urd-color-bg": "color-mix(in srgb, var(--urd-base-text) 5%, var(--urd-base-bg))",
		"--urd-color-surface": "color-mix(in srgb, var(--urd-base-text) 10%, var(--urd-base-bg))",
		"--urd-color-text": "color-mix(in srgb, var(--urd-base-text) 82%, var(--urd-base-bg))"
	},
	deep: {
		"--urd-color-bg": "color-mix(in srgb, var(--urd-base-accent) 30%, var(--urd-base-text))",
		"--urd-color-surface": "color-mix(in srgb, var(--urd-base-accent) 40%, var(--urd-base-text))",
		"--urd-color-text": "var(--urd-base-bg)"
	},
	highlighted: { "--urd-color-surface": "color-mix(in srgb, var(--urd-base-accent) 14%, var(--urd-base-surface))" }
}, Ug = {
	surface: "sectionTheme.surface",
	accent: "sectionTheme.accent",
	inverse: "sectionTheme.inverse",
	soft: "sectionTheme.soft",
	muted: "sectionTheme.muted",
	deep: "sectionTheme.deep",
	highlighted: "sectionTheme.highlighted"
};
[...new Set(Object.values(Hg).flatMap(Object.keys))];
function Wg(e) {
	return Hg[e] ?? {};
}
function Gg(e) {
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
function Kg(e, t) {
	let n = Gg(e), r = Gg(t);
	return n == null || r == null ? null : (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/color.js
var qg = {
	version: 1,
	label: "Colour",
	labelKey: "bgLayer.color",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = Vg(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, Jg = {
	linear: [
		"pan",
		"pan-loop",
		"rotate"
	],
	radial: ["pulse", "orbit"]
};
function Yg(e) {
	let t = Array.isArray(e) && e.length ? e : [{ color: "#0b0e14" }, { color: "#1a1030" }], n = t.map((e) => Math.max(0, Number(e?.share) || 0)), r = n.reduce((e, t) => e + t, 0), i = r <= 0, a = i ? t.length : r, o = 0;
	return t.map((e, t) => {
		let r = i ? 1 : n[t], s = (o + r / 2) / a * 100;
		return o += r, {
			color: e?.color ?? "#0b0e14",
			at: Math.round(s * 100) / 100
		};
	});
}
function Xg(e) {
	let t = (e) => Math.round(e * 100) / 100, n = e[0]?.at ?? 0;
	return [...e.map((e) => ({
		color: e.color,
		at: t(e.at - n)
	})), {
		color: e[0]?.color ?? "#0b0e14",
		at: 100
	}];
}
function Zg(e, t, n, r = .5) {
	let i = n % 360 * Math.PI / 180, a = (e) => Math.round(e * 100) / 100 || 0, o = (Math.abs(e * Math.sin(i)) + Math.abs(t * Math.cos(i))) / (1 - Math.min(Math.max(r, 0), .9));
	return {
		period: a(o),
		dx: a(Math.sin(i) * o),
		dy: a(-Math.cos(i) * o)
	};
}
function Qg(e, t, n) {
	return `repeating-linear-gradient(${t}deg, ${e.map((e) => `${Vg(e.color)} ${Math.round(e.at / 100 * n * 100) / 100}px`).join(", ")})`;
}
function $g(e) {
	let t = e.kind === "radial" ? "radial" : "linear", n = (Jg[t] ?? []).includes(e.animation) ? e.animation : null, r = Yg(e.stops), i = r.map((e) => `${Vg(e.color)} ${e.at}%`).join(", "), a = {}, o;
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
					stops: Xg(r),
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
var e_ = /* @__PURE__ */ new Set(), t_ = !1;
function n_(e) {
	e_.add(e), !(t_ || typeof window > "u") && (t_ = !0, window.addEventListener("resize", () => {
		for (let e of [...e_]) e() || e_.delete(e);
	}));
}
var r_ = !1;
function i_() {
	if (!r_) {
		r_ = !0;
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
var a_ = {
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
		let n = $g(t);
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
					let e = Zg(r, i, n.loop.angle, n.loop.maxShare);
					t.style.inset = `${-Math.ceil(e.period)}px`, t.style.background = Qg(n.loop.stops, n.loop.angle, e.period), t.style.setProperty("--urd-loop-dx", `${e.dx}px`), t.style.setProperty("--urd-loop-dy", `${e.dy}px`);
				}
				return !0;
			};
			requestAnimationFrame(r), n_(r);
			return;
		}
		if (n.runner) {
			e.classList.add("urd-bg-loop-host");
			let t = document.createElement("div");
			t.className = n.runner.className, t.style.background = n.runner.background, n.runner.left != null && (t.style.left = n.runner.left), n.runner.top != null && (t.style.top = n.runner.top), e.appendChild(t);
			return;
		}
		e.style.background = n.background, n.className && (e.classList.add(n.className), n.className === "urd-bg-rotate" && i_());
	}
}, o_ = {
	version: 1,
	label: "Glow",
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
		let n = Vg(t.color), r = t.x ?? .5, i = t.y ?? .3, a = t.radius ?? .5;
		e.style.background = `radial-gradient(circle at ${r * 100}% ${i * 100}%, ${n} 0%, transparent ${a * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, s_ = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", c_ = {
	version: 1,
	label: "Grain",
	labelKey: "bgLayer.grain",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = s_, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
}, l_ = [
	"dots",
	"grid",
	"diagonal",
	"checks",
	"waves",
	"zigzag",
	"plus",
	"triangles"
], u_ = {
	min: 8,
	max: 160,
	dflt: 28
}, d_ = .12, f_ = {
	dots: "<circle cx=\"12\" cy=\"12\" r=\"3\"/>",
	grid: "<rect width=\"24\" height=\"1.6\"/><rect width=\"1.6\" height=\"24\"/>",
	diagonal: "<path d=\"M-6 6L6 -6M0 24L24 0M18 30L30 18\" fill=\"none\" stroke=\"#000\" stroke-width=\"4\"/>",
	checks: "<rect width=\"12\" height=\"12\"/><rect x=\"12\" y=\"12\" width=\"12\" height=\"12\"/>",
	waves: "<path d=\"M0 12Q6 4 12 12T24 12\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\"/>",
	zigzag: "<path d=\"M0 16L6 8L12 16L18 8L24 16\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\"/>",
	plus: "<path d=\"M12 7V17M7 12H17\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\" stroke-linecap=\"round\"/>",
	triangles: "<path d=\"M0 24L12 4L24 24Z\"/>"
};
function p_(e) {
	return l_.includes(e) ? e : "dots";
}
function m_(e) {
	let t = Number(e);
	return !Number.isFinite(t) || t <= 0 ? u_.dflt : Math.min(u_.max, Math.max(u_.min, Math.round(t)));
}
function h_(e) {
	let t = Number(e);
	return Number.isFinite(t) ? (Math.round(t) % 360 + 360) % 360 : 0;
}
function g_(e) {
	let t = Number(e);
	return e == null || e === "" || !Number.isFinite(t) ? d_ : Math.min(1, Math.max(0, t));
}
function __(e = {}) {
	let t = m_(e.size), n = h_(e.rotation), r = f_[p_(e.pattern)], i = `<pattern id="p" width="${t}" height="${t}" patternUnits="userSpaceOnUse"${n ? ` patternTransform="rotate(${n})"` : ""}><g transform="scale(${t / 24})">${r}</g></pattern>`, a = "<rect width=\"100%\" height=\"100%\" fill=\"url(#p)\"/>";
	return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><defs>${i}</defs>${e.invert === !0 ? `<mask id="m"><rect width="100%" height="100%" fill="#fff"/>${a}</mask><rect width="100%" height="100%" mask="url(#m)"/>` : a}</svg>`;
}
var v_ = () => typeof CSS < "u" && typeof CSS.supports == "function" && (CSS.supports("mask-image", "none") || CSS.supports("-webkit-mask-image", "none")), y_ = {
	version: 1,
	label: "Pattern",
	labelKey: "bgLayer.pattern",
	defaults: () => ({
		pattern: "dots",
		color: "text",
		size: u_.dflt,
		opacity: d_,
		rotation: 0,
		invert: !1
	}),
	migrations: {},
	render(e, t) {
		if (!v_()) return;
		let n = `url("data:image/svg+xml,${encodeURIComponent(__(t))}")`;
		e.style.backgroundColor = Vg(t.color ?? "text"), e.style.opacity = String(g_(t.opacity));
		for (let t of ["webkitMask", "mask"]) e.style[`${t}Image`] = n, e.style[`${t}Size`] = "100% 100%", e.style[`${t}Repeat`] = "no-repeat";
	}
}, b_ = [
	"wave",
	"tilt",
	"curve",
	"triangle",
	"zigzag"
], x_ = {
	min: 16,
	max: 240,
	dflt: 64
}, S_ = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/api\/photo\?[^\s"'<>\\]{1,2048}|\/(?!\/)[\w%./-]*)$/;
function C_(e) {
	return typeof e == "string" && S_.test(e);
}
var w_ = /^(?:https?:\/\/|mailto:|tel:)[^\s]+$/i;
function T_(e) {
	return typeof e == "string" && w_.test(e.trim());
}
var E_ = /^(?:\/(?![/\\])[^\s\\]*|#[^\s]*)$/;
function D_(e) {
	return T_(e) || typeof e == "string" && E_.test(e.trim());
}
var O_ = [
	"launcher",
	"cart",
	"theme"
];
function k_(e = {}) {
	let t = Array.isArray(e.tools?.order) ? e.tools.order : [], n = [];
	for (let e of t) O_.includes(e) && !n.includes(e) && n.push(e);
	for (let e of O_) n.includes(e) || n.push(e);
	return n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/image.js
var A_ = .4, j_ = [
	"none",
	"kenburns",
	"drift"
], M_ = {
	min: 6,
	max: 60,
	dflt: 20
};
function N_(e) {
	return j_.includes(e) ? e : "none";
}
function P_(e) {
	let { min: t, max: n, dflt: r } = M_, i = Number(e);
	return !Number.isFinite(i) || i <= 0 ? r : Math.min(n, Math.max(t, i));
}
function F_(e, t) {
	return `${(e ?? .5) * 100}% ${(t ?? .5) * 100}%`;
}
function I_(e, t) {
	return e === "contain" ? "contain" : e === "cover" ? "cover" : `${Math.max(0, t ?? 1) * 100}%`;
}
function L_(e) {
	let t = "-9999px";
	return e === "up" ? `inset(${t} 0 0 0)` : e === "down" ? `inset(0 0 ${t} 0)` : e === "both" ? `inset(${t} 0 ${t} 0)` : "inset(0)";
}
function R_(e, t, n, r = .18) {
	let i = Math.max(0, Math.min(1, n)) * A_ * t;
	return Math.round(Math.min(i, r * e));
}
function z_(e, t, n, r, i) {
	let a = e + t / 2, o = (n / 2 - a) * Math.max(0, Math.min(1, r)) * A_, s = i ?? R_(t, n, r);
	return Math.max(-s, Math.min(s, o)) || 0;
}
var B_ = /* @__PURE__ */ new Set(), V_ = !1, H_ = 0;
function U_() {
	H_ = 0;
	for (let e of [...B_]) e() || B_.delete(e);
}
function W_() {
	H_ ||= requestAnimationFrame(U_);
}
function G_(e) {
	B_.add(e), e(), !(V_ || typeof window > "u") && (V_ = !0, window.addEventListener("scroll", W_, { passive: !0 }), window.addEventListener("resize", W_, { passive: !0 }));
}
function K_(e, t, n, r) {
	let i = r === "cover" || r === "tile" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement, o = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
	e.style.willChange = "transform";
	let s = (t) => {
		e.style.top = `-${t}px`, e.style.bottom = `-${t}px`;
	}, c = () => {
		if (!e.isConnected) return !1;
		if (o || document.body.classList.contains("urd-mobile")) return s(n), e.style.transform = "", !0;
		let r = (a ?? e).getBoundingClientRect(), c = window.innerHeight || document.documentElement.clientHeight, l = R_(r.height, c, t, i ? .18 : .6);
		s(i ? Math.max(n, l) : n);
		let u = z_(r.top, r.height, c, t, l);
		return e.style.transform = `translateY(${u.toFixed(1)}px)`, !0;
	};
	G_(c), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(c));
}
function q_() {
	return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("animation-timeline", "view()");
}
var J_ = /* @__PURE__ */ new Set(), Y_ = !1, X_ = 0;
function Z_() {
	X_ = 0;
	for (let e of [...J_]) e() || J_.delete(e);
}
function Q_() {
	!X_ && typeof requestAnimationFrame == "function" && (X_ = requestAnimationFrame(Z_));
}
function $_(e) {
	J_.add(e), e(), !(Y_ || typeof window > "u") && (Y_ = !0, window.addEventListener("resize", Q_, { passive: !0 }));
}
function ev(e, t, n, r) {
	let i = r === "cover" || r === "tile" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement;
	e.style.willChange = "transform", e.classList.add("urd-parallax-css");
	let o = () => {
		if (!e.isConnected) return !1;
		let r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || document.body.classList.contains("urd-mobile"), o = (a ?? e).getBoundingClientRect(), s = window.innerHeight || document.documentElement.clientHeight, c = R_(o.height, s, t, i ? .18 : .6), l = i && !r ? Math.max(n, c) : n;
		return e.style.setProperty("--urd-px-shift", `${c}px`), e.style.top = `-${l}px`, e.style.bottom = `-${l}px`, !0;
	};
	$_(o), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(o));
}
var tv = {
	version: 3,
	label: "Image",
	labelKey: "bgLayer.image",
	defaults: () => ({
		src: "",
		fit: "plain",
		x: .5,
		y: .5,
		size: 1,
		opacity: 1,
		blur: 0,
		parallax: 0,
		bleed: "none",
		motion: "none",
		motionSpeed: M_.dflt
	}),
	migrations: {
		1: (e) => ({
			...e,
			fit: e.fit === "vanlig" ? "plain" : e.fit === "flislegg" ? "tile" : e.fit === "egen" ? "custom" : e.fit
		}),
		2: (e) => ({
			motion: "none",
			motionSpeed: M_.dflt,
			...e
		})
	},
	render(e, t) {
		let n = !C_(t.src);
		n && e.classList.add("urd-bg-demo");
		let r = n ? qc(0) : t.src;
		e.style.opacity = String(t.opacity ?? 1), e.style.clipPath = L_(t.bleed), e.style.zIndex = t.bleed === "down" || t.bleed === "both" ? "1" : "";
		let i = document.createElement("div");
		i.className = "urd-bg-image", i.style.position = "absolute", i.style.left = "0", i.style.right = "0", i.style.top = "0", i.style.bottom = "0";
		let a = N_(t.motion), o = a === "none" ? i : document.createElement("div");
		o !== i && (o.className = `urd-bg-motion urd-bg-motion-${a}`, o.style.position = "absolute", o.style.left = "0", o.style.right = "0", o.style.top = "0", o.style.bottom = "0", o.style.animationDuration = `${P_(t.motionSpeed)}s`, i.appendChild(o));
		let s = t.fit === "tile" || t.fit === "repeat";
		o.style.backgroundImage = `url("${r}")`, o.style.backgroundSize = I_(t.fit, t.size), o.style.backgroundRepeat = s ? "repeat" : "no-repeat", o.style.backgroundPosition = F_(t.x, t.y);
		let c = 0;
		t.blur > 0 && (o.style.filter = `blur(${t.blur}px)`, c = Math.ceil(t.blur), o.style.left = `-${c}px`, o.style.right = `-${c}px`, o.style.top = `-${c}px`, o.style.bottom = `-${c}px`);
		let l = new Image();
		if (l.src = r, !l.complete) {
			e.style.visibility = "hidden";
			let t = () => {
				e.style.visibility = "";
			};
			l.addEventListener("load", t, { once: !0 }), l.addEventListener("error", t, { once: !0 });
		}
		e.appendChild(i), t.parallax > 0 && nv(i, t.parallax, o === i ? c : 0, t.fit ?? "cover");
	}
};
function nv(e, t, n, r) {
	q_() ? ev(e, t, n, r) : K_(e, t, n, r);
}
//#endregion
//#region ../template/assets/engine/0.7.4/photo-source.js
var rv = [
	"drive",
	"gphotos",
	"nextcloud",
	"json"
], iv = {
	min: 1,
	max: 60,
	dflt: 24
}, av = [
	"name",
	"newest",
	"random"
], ov = [
	480,
	800,
	1200,
	1600,
	2e3
], sv = /^[A-Za-z0-9_-]{10,128}$/, cv = /^(?!\d+(?:\.\d+)*$)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/;
function lv(e) {
	let t = Number(e);
	return !Number.isFinite(t) || t <= 0 ? iv.dflt : Math.min(iv.max, Math.max(iv.min, Math.round(t)));
}
function uv(e) {
	let t = typeof e == "string" ? e.trim() : "";
	if (!t) return null;
	if (sv.test(t) && !t.includes(".")) return {
		provider: "drive",
		id: t
	};
	let n;
	try {
		n = new URL(t);
	} catch {
		return null;
	}
	if (n.protocol !== "https:" || n.username || n.password || n.port) return null;
	let r = n.hostname.toLowerCase();
	if (r === "drive.google.com") {
		let e = /^\/drive\/(?:u\/\d+\/)?folders\/([A-Za-z0-9_-]{10,128})\/?$/.exec(n.pathname);
		if (e) return {
			provider: "drive",
			id: e[1]
		};
		let t = n.searchParams.get("id") ?? "";
		return sv.test(t) ? {
			provider: "drive",
			id: t
		} : null;
	}
	if (r === "photos.google.com") {
		let e = /^\/share\/([A-Za-z0-9_-]{10,256})\/?$/.exec(n.pathname), t = n.searchParams.get("key") ?? "";
		return e ? {
			provider: "gphotos",
			id: e[1],
			...sv.test(t) ? { host: t } : {}
		} : null;
	}
	if (r === "photos.app.goo.gl") {
		let e = /^\/([A-Za-z0-9_-]{6,128})\/?$/.exec(n.pathname);
		return e ? {
			provider: "gphotos",
			id: `s:${e[1]}`
		} : null;
	}
	let i = /^(?:\/index\.php)?\/s\/([A-Za-z0-9]{8,64})\/?$/.exec(n.pathname);
	return i && cv.test(r) ? {
		provider: "nextcloud",
		id: i[1],
		host: r
	} : /\.json$/i.test(n.pathname) && cv.test(r) ? {
		provider: "json",
		url: n.href
	} : null;
}
function dv(e) {
	return av.includes(e) ? e : "name";
}
var fv = (e) => dv(e) === "newest" ? "newest" : "name";
function pv(e, t) {
	if (!e || !rv.includes(e.provider)) return null;
	let n = new URLSearchParams({
		p: e.provider,
		sort: fv(t),
		max: "200"
	});
	return e.id && n.set("id", e.id), e.host && n.set("host", e.host), e.url && n.set("url", e.url), `/api/photos?${n.toString()}`;
}
function mv(e, t = 200) {
	return (Array.isArray(e?.photos) ? e.photos : []).filter((e) => typeof e?.src == "string" && e.src.startsWith("/api/photo?")).slice(0, Math.max(1, Math.min(200, Number(t) || 200))).map((e) => ({
		src: e.src,
		name: typeof e.name == "string" ? e.name : ""
	}));
}
function hv(e) {
	let t = e >>> 0;
	return () => {
		t = t + 1831565813 >>> 0;
		let e = t;
		return e = Math.imul(e ^ e >>> 15, e | 1), e ^= e + Math.imul(e ^ e >>> 7, e | 61), ((e ^ e >>> 14) >>> 0) / 4294967296;
	};
}
function gv(e, t) {
	let n = [...e], r = hv(Number(t) || 0);
	for (let e = n.length - 1; e > 0; e--) {
		let t = Math.floor(r() * (e + 1));
		[n[e], n[t]] = [n[t], n[e]];
	}
	return n;
}
function _v(e, t, n) {
	return dv(t) === "random" ? gv(e, n) : [...e];
}
var vv = 0;
function yv() {
	return vv ||= typeof crypto < "u" && crypto.getRandomValues ? crypto.getRandomValues(/* @__PURE__ */ new Uint32Array(1))[0] || 1 : Date.now() >>> 0 || 1, vv;
}
function bv(e, t = 1) {
	let n = (Number(e) || 0) * Math.min(3, Math.max(1, Number(t) || 1));
	return ov.find((e) => e >= n) ?? ov[ov.length - 1];
}
function xv(e, t) {
	if (typeof e != "string" || !e.startsWith("/api/photo?")) return e;
	let n = new URLSearchParams(e.slice(11));
	return n.set("w", String(t)), `/api/photo?${n.toString()}`;
}
var Sv = 6e5, Cv = 3e4, wv = /* @__PURE__ */ new Map(), Tv = /* @__PURE__ */ new Map();
function Ev(e) {
	return e?.source === "folder" && typeof e.folder == "string" ? e.folder.trim() : "";
}
function Dv(e, t) {
	let n = pv(uv(e), t);
	return n ? Ov(wv.get(n)) : null;
}
function Ov(e) {
	if (!e) return null;
	let t = e.value.photos.length ? Sv : Cv;
	return Date.now() - e.at < t ? e.value : null;
}
function kv(e, t, { force: n = !1 } = {}) {
	let r = pv(uv(e), t);
	if (!r) return Promise.resolve({
		photos: [],
		error: "badAddress",
		code: "photoFolderUnknown"
	});
	if (!n) {
		let e = Ov(wv.get(r));
		if (e) return Promise.resolve(e);
		if (Tv.has(r)) return Tv.get(r);
	}
	let i = (async () => {
		let e;
		try {
			let t = await fetch(r), n = await t.json().catch(() => null);
			e = t.ok ? {
				photos: mv(n),
				error: null,
				code: null
			} : {
				photos: [],
				error: n?.error ?? `status ${t.status}`,
				code: n?.code ?? "photoFolderFailed",
				host: n?.host ?? "",
				status: n?.status ?? t.status
			};
		} catch {
			e = {
				photos: [],
				error: "unreachable",
				code: "photoFolderFailed"
			};
		}
		return wv.set(r, {
			at: Date.now(),
			value: e
		}), Tv.delete(r), e;
	})();
	return Tv.set(r, i), i;
}
function Av(e) {
	let t = Ev(e), n = t ? Dv(t, e.order) : null;
	return n?.photos.length ? _v(n.photos, e.order, yv()).slice(0, lv(e.folderMax)) : e.images ?? [];
}
function jv(e, t, n) {
	let r = Ev(t);
	r && !Dv(r, t.order) && kv(r, t.order).then((r) => {
		e.isConnected && r.photos.length && (e.textContent = "", e.removeAttribute("style"), e.className = "urd-bg-layer", n(e, t));
	}), n(e, t);
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/slideshow.js
var Mv = {
	source: "upload",
	folder: "",
	order: "random",
	folderMax: iv.dflt,
	style: "floating",
	motion: "drift",
	motionSpeed: Hc.dflt,
	interval: Uc.dflt,
	fade: 1.5,
	count: Pc.dflt,
	seed: 0,
	size: null,
	spread: zc.dflt,
	tilt: Bc.dflt,
	radius: Vc.dflt,
	rows: 2,
	direction: "left",
	underNav: !0,
	underAnnounce: !1,
	repeat: !1,
	shape: "rect",
	look: "shadow",
	tone: "natural",
	frameColor: ""
}, Nv = {
	version: 2,
	label: "Image gallery",
	labelKey: "bgLayer.slideshow",
	defaults: () => ({
		images: [],
		fit: "cover",
		opacity: .85,
		blur: 0,
		...Mv
	}),
	migrations: { 1: (e) => ({
		...Mv,
		style: "fill",
		motion: "none",
		interval: 6,
		opacity: 1,
		...e
	}) },
	render(e, t) {
		jv(e, t, Fv);
	}
}, Pv = (e, t) => {
	let n = document.createElement(e);
	return n.className = t, n;
};
function Fv(e, t) {
	let n = Zc(t.style), r = Av(t).filter((e) => C_(e?.src)), i = al(t.shape), a = ol(t.look);
	e.classList.add("urd-bg-slideshow", `urd-gallery-${n}`, `urd-gallery-tone-${sl(t.tone)}`), n !== "fill" && e.classList.add(`urd-gallery-shape-${i}`, `urd-gallery-look-${a}`), e.style.setProperty("--urd-frame-radius", `${pl(t.radius)}px`), r.length || e.classList.add("urd-bg-demo"), e.style.opacity = String(t.opacity ?? .85);
	let o = il(a, t.frameColor);
	o && e.style.setProperty("--urd-frame-color", Vg(o));
	let s = t.underNav === !1 ? ["var(--urd-announce-h, 0px)", "var(--urd-nav-own-h, 0px)"] : t.underAnnounce === !0 ? [] : ["var(--urd-announce-h, 0px)"], c = s.length ? `calc(${s.join(" + ")})` : "", l = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, u = Qc(n, t.motion), d = {
		el: e,
		props: t,
		style: n,
		images: r,
		motion: u,
		shape: i,
		look: a,
		aspect: cl(i, a),
		moves: el({
			style: n,
			motion: u,
			reducedMotion: l
		}),
		reduced: l,
		seed: gl(t.seed, yv()),
		time: ml(t.motionSpeed),
		dwell: ul(t.interval),
		dpr: window.devicePixelRatio || 1
	};
	Kv[n](d), c && (e.style.top = n === "fill" && t.blur > 0 ? `calc(${c} - ${t.blur * 2}px)` : c);
}
function Iv(e, t, n, r, i) {
	let a = t[n];
	e.style.backgroundImage = `url("${a ? xv(a.src, r) : qc(i)}")`, e.style.backgroundPosition = a ? F_(a.x, a.y) : "";
}
function Lv({ el: e, props: t, images: n, motion: r, reduced: i, dpr: a, dwell: o }) {
	let s = !n.length, c = s ? Jc(3) : n, l = bv(window.innerWidth, a);
	t.blur > 0 && (e.style.filter = `blur(${t.blur}px)`, e.style.inset = `-${t.blur * 2}px`);
	let u = Math.max(0, Number(t.fade) || 0);
	e.style.setProperty("--urd-bgg-fade", `${u}s`);
	let d = N_(r === "drift" ? "drift" : r === "kenburns" ? "kenburns" : "none"), f = (e) => {
		let n = Pv("div", e ? "urd-bg-slide on" : "urd-bg-slide");
		return d !== "none" && (n.classList.add("urd-bg-motion", `urd-bg-motion-${d}`), n.style.animationDuration = `${P_(t.motionSpeed)}s`), n;
	}, p = (e, n) => {
		e.style.backgroundImage = `url("${s ? n.src : xv(n.src, l)}")`, e.style.backgroundSize = s ? "240px auto" : I_(t.fit), e.style.backgroundRepeat = s ? "repeat" : "no-repeat", e.style.backgroundPosition = s ? "" : F_(n.x, n.y);
	}, m = new Image();
	if (m.src = s ? c[0].src : xv(c[0].src, l), !m.complete) {
		e.style.visibility = "hidden";
		let t = () => {
			e.style.visibility = "";
		};
		m.addEventListener("load", t, { once: !0 }), m.addEventListener("error", t, { once: !0 });
	}
	let h = f(!0);
	if (p(h, c[0]), e.appendChild(h), !Dl({
		count: c.length,
		reducedMotion: i
	})) return;
	let g = f(!1);
	e.appendChild(g);
	let _ = 0, v = h, y = Math.max(Ol(o, { fallback: Uc.dflt }), u + .5) * 1e3, b = setInterval(() => {
		if (!h.isConnected) {
			clearInterval(b);
			return;
		}
		if (document.hidden) return;
		let e = El(_, 1, c.length), t = new Image();
		t.src = s ? c[e].src : xv(c[e].src, l);
		let n = () => {
			if (!h.isConnected) return;
			let t = v === h ? g : h;
			p(t, c[e]), t.classList.add("on"), v.classList.remove("on"), v = t, _ = e;
		};
		t.complete ? n() : (t.addEventListener("load", n, { once: !0 }), t.addEventListener("error", () => {
			_ = e;
		}, { once: !0 }));
	}, y);
}
function Rv(e, t, n, r, i) {
	let a = Pv("div", "urd-gallery-skin"), o = Pv("div", "urd-gallery-face");
	return Iv(o, t, n, r, i), a.appendChild(o), e.appendChild(a), {
		skin: a,
		face: o
	};
}
function zv(e, t) {
	let { x: n, y: r, heading: i } = e;
	if (t === "rise") return {
		tx0: "0px",
		ty0: `calc(${100 - r}cqh + 60%)`,
		tx1: "0px",
		ty1: `calc(${-r}cqh - 60%)`
	};
	let a = i < .5, o = i * 2 % 1 < .5, s = `calc(${-n}cqw - 60%)`, c = `calc(${100 - n}cqw + 60%)`, l = `calc(${-r}cqh - 60%)`, u = `calc(${100 - r}cqh + 60%)`;
	return {
		tx0: a ? s : c,
		tx1: a ? c : s,
		ty0: o ? l : u,
		ty1: o ? u : l
	};
}
function Bv({ frame: e, skin: t, face: n }, r, i, a) {
	let { motion: o, moves: s, time: c } = a;
	if (!s) return;
	let l = `-${(r.phase * c).toFixed(2)}s`;
	if (o === "drift" || o === "rise") {
		e.classList.add("urd-gallery-travel");
		let t = zv(r, o);
		e.style.setProperty("--tx0", t.tx0), e.style.setProperty("--ty0", t.ty0), e.style.setProperty("--tx1", t.tx1), e.style.setProperty("--ty1", t.ty1), e.style.animationDuration = `${c}s`, e.style.animationDelay = l;
	} else if (o === "kenburns") e.classList.add("urd-gallery-kenburns"), e.style.animationDuration = `${c}s`, e.style.animationDelay = l;
	else if (o === "bounce") {
		e.style.left = "0", e.style.top = "0", e.style.translate = "0 0", e.classList.add("urd-gallery-bounce-x"), t.classList.add("urd-gallery-bounce-y");
		let n = c * (.8 + r.heading * .4), i = c * (.5 + r.phase * .35);
		e.style.animationDuration = `${n.toFixed(2)}s`, e.style.animationDelay = `-${(r.phase * n).toFixed(2)}s`, t.style.animationDuration = `${i.toFixed(2)}s`, t.style.animationDelay = `-${(r.heading * i).toFixed(2)}s`;
	}
}
function Vv(e, t, n) {
	let { images: r, moves: i, dwell: a, motion: o } = t;
	if (o !== "crossfade" || !i) return;
	let s = e.length, c = e.map((e) => e.index), l = r.map((e, t) => c.includes(t) ? 0 : -1), u = 0, d = (e) => {
		if (r.length < 2) return -1;
		let t = (e) => l[e], n = r.map((e, t) => t).filter((e) => !c.includes(e)), i = n.length ? n : r.map((e, t) => t).filter((t) => t !== c[e]);
		return i.reduce((e, n) => t(n) < t(e) ? n : e, i[0]);
	}, f = 0;
	e.forEach((t, i) => {
		t.frame.classList.add("urd-gallery-fade"), t.frame.style.animationDuration = `${a}s`;
		let o = (i / s + t.phase * .3) % 1;
		t.frame.style.animationDelay = `-${(o * a).toFixed(2)}s`, t.frame.addEventListener("animationiteration", () => {
			if (!t.frame.isConnected) return;
			let a = d(i);
			a >= 0 && (Iv(t.face, r, a, t.width, i), c[i] = a, l[a] = ++u), n && (f += 1, Hv(t, n(i, f, e.filter((e) => e !== t))));
		});
	});
}
function Hv(e, t) {
	let n = t.w / 2 * 1.15, r = t.w / e.aspect / 2 * 1.15;
	e.frame.style.left = `clamp(${n.toFixed(1)}px, ${t.x}%, calc(100% - ${n.toFixed(1)}px))`, e.frame.style.top = `clamp(${r.toFixed(1)}px, ${t.y}%, calc(100% - ${r.toFixed(1)}px))`, e.frame.style.width = `${t.w}px`, e.frame.style.rotate = `${t.rot}deg`, e.x = t.x, e.y = t.y;
}
function Uv(e) {
	let { el: t, props: n, style: r, images: i, seed: a, aspect: o, dpr: s } = e, c = {
		count: n.count,
		seed: a,
		size: n.size,
		spread: n.spread,
		tilt: n.tilt,
		style: r,
		repeat: n.repeat === !0
	};
	Vv(_l(i, c).map((n, r) => {
		let a = Pv("div", "urd-gallery-box urd-gallery-frame" + (n.index < 0 ? " urd-gallery-frame-empty" : ""));
		a.style.aspectRatio = String(o);
		let c = bv(n.w, s), { skin: l, face: u } = Rv(a, i, n.index, c, r);
		t.appendChild(a);
		let d = {
			frame: a,
			skin: l,
			face: u,
			width: c,
			aspect: o,
			index: n.index,
			phase: n.phase
		};
		return Hv(d, n), Bv(d, n, r, e), d;
	}), e, (e, t, n) => {
		let r = null, o = -1;
		for (let s = 0; s < 6; s += 1) {
			let l = _l(i, {
				...c,
				seed: `${a}:${t * 6 + s}`
			})[e], u = Math.min(999, ...n.map((e) => Math.hypot(e.x - l.x, e.y - l.y)));
			u > o && (o = u, r = l);
		}
		return r;
	});
}
function Wv(e) {
	let { el: t, props: n, images: r, moves: i, time: a, aspect: o, dpr: s } = e, c = hl(n.rows), l = nl(n.size, "band");
	t.style.setProperty("--urd-band-h", `${l}px`);
	let u = r.length || 8, d = bv(l * o, s);
	for (let e = 0; e < c; e += 1) {
		let s = Pv("div", "urd-gallery-band-row");
		i || s.classList.add("urd-ribbon-still");
		let c = Pv("div", "urd-ribbon-track");
		n.direction === "right" != (e === 1) && c.classList.add("urd-ribbon-right"), c.style.setProperty("--urd-ribbon-ms", `${a * 1e3}ms`), e === 1 && (c.style.animationDelay = `-${(a / 3).toFixed(1)}s`);
		let l = (e) => {
			for (let t = 0; t < u; t += 1) {
				let n = Pv("div", "urd-gallery-box urd-gallery-band-tile" + (r.length ? "" : " urd-gallery-frame-empty"));
				n.style.aspectRatio = String(o), Rv(n, r, r.length ? t : -1, d, t), e.appendChild(n);
			}
		}, f = Pv("div", "urd-ribbon-run");
		l(f);
		let p = Pv("div", "urd-ribbon-run");
		p.setAttribute("aria-hidden", "true"), l(p), c.append(f, p), s.appendChild(c), t.appendChild(s);
	}
}
function Gv(e) {
	let { el: t, props: n, images: r, seed: i, dpr: a, motion: o, moves: s, time: c } = e, l = bl(n.count, i, r.length, n.repeat === !0);
	t.style.setProperty("--urd-mosaic-row", `${nl(n.size, "mosaic")}px`);
	let u = bv(nl(n.size, "mosaic") * 2.2, a);
	Vv(l.map((e, n) => {
		let i = Pv("div", "urd-gallery-box urd-gallery-tile" + (r.length ? "" : " urd-gallery-frame-empty"));
		i.style.gridColumn = `span ${e.cols}`, i.style.gridRow = `span ${e.rows}`;
		let a = r.length ? n % r.length : -1, { face: l } = Rv(i, r, a, u, n);
		return t.appendChild(i), s && o === "kenburns" && (l.classList.add("urd-gallery-kenburns"), l.style.animationDuration = `${c}s`, l.style.animationDelay = `-${(e.phase * c).toFixed(2)}s`), {
			frame: i,
			skin: i,
			face: l,
			width: u,
			index: a,
			phase: e.phase
		};
	}), e);
}
var Kv = {
	fill: Lv,
	floating: Uv,
	band: Wv,
	mosaic: Gv
}, qv = /^(?:data:video\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/media\/[\w%./-]+\.(?:mp4|webm))$/i;
function Jv(e) {
	return typeof e == "string" && qv.test(e);
}
var Yv = null;
function Xv(e) {
	Yv ??= new IntersectionObserver((e) => {
		for (let t of e) {
			if (!t.target.isConnected) {
				Yv.unobserve(t.target);
				continue;
			}
			t.isIntersecting ? t.target.play().catch(() => {}) : t.target.pause();
		}
	}, { threshold: 0 }), Yv.observe(e);
}
var Zv = (e, t, n, r) => {
	e.style.position = "absolute", e.style.inset = "0", e.style.width = "100%", e.style.height = "100%", e.style.objectFit = t === "contain" ? "contain" : "cover", e.style.objectPosition = F_(n, r);
}, Qv = {
	version: 1,
	label: "Video",
	labelKey: "bgLayer.video",
	defaults: () => ({
		src: "",
		poster: "",
		fit: "cover",
		x: .5,
		y: .5,
		opacity: 1,
		parallax: 0
	}),
	migrations: {},
	render(e, t) {
		if (!Jv(t.src)) return;
		if (e.style.opacity = String(t.opacity ?? 1), window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
			if (!C_(t.poster)) return;
			let n = document.createElement("img");
			n.className = "urd-bg-video-poster", n.alt = "", n.setAttribute("aria-hidden", "true"), n.src = t.poster, Zv(n, t.fit, t.x, t.y), e.appendChild(n);
			return;
		}
		let n = document.createElement("video");
		n.className = "urd-bg-video", n.muted = !0, n.setAttribute("muted", ""), n.loop = !0, n.playsInline = !0, n.setAttribute("playsinline", ""), n.preload = "metadata", n.disablePictureInPicture = !0, n.setAttribute("aria-hidden", "true"), C_(t.poster) && (n.poster = t.poster), n.src = t.src, Zv(n, t.fit, t.x, t.y), e.appendChild(n), Xv(n), t.parallax > 0 && nv(n, t.parallax, 0, t.fit === "contain" ? "contain" : "cover");
	}
};
//#endregion
//#region ../template/assets/engine/0.7.4/footer-thumb.js
function $v(e = {}) {
	let t = "#2fd6b6", n = "#5c6b64", r = e.mega ? "#16221d" : "#0e1512", i = e.cols ?? 0, a = e.social ?? 0, o = `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${r}"/>`;
	if (e.mega && (o += `<circle cx="20" cy="6" r="34" fill="${t}" opacity="0.18"/>`), e.bigcta) return o += `<rect x="45" y="18" width="70" height="8" rx="3" fill="${n}" opacity="0.85"/>`, o += `<rect x="56" y="32" width="48" height="4" rx="2" fill="${n}" opacity="0.5"/>`, o += `<rect x="62" y="43" width="36" height="10" rx="3" fill="${t}"/>`, o += ey(n, e.baselineLinks), o + "</svg>";
	if (e.chapters) {
		o += `<rect x="12" y="10" width="20" height="6" rx="2" fill="${t}"/>`, o += `<rect x="12" y="20" width="46" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		let r = i || 3, a = (136 - (r - 1) * 8) / r;
		for (let e = 0; e < r; e++) {
			let r = 12 + e * (a + 8);
			o += `<line x1="${r}" y1="30" x2="${r + a}" y2="30" stroke="${n}" stroke-width="0.8" opacity="0.7"/>`, o += `<rect x="${r}" y="34" width="9" height="6" rx="1.5" fill="${t}"/>`;
			for (let e = 0; e < 3; e++) o += `<rect x="${r}" y="${44 + e * 6}" width="${a * .7}" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		}
		return o += ey(n, e.baselineLinks), o + "</svg>";
	}
	if (e.split) {
		o += `<rect x="8" y="8" width="70" height="52" rx="4" fill="${t}" opacity="0.16"/>`, o += `<rect x="16" y="16" width="20" height="6" rx="2" fill="${t}"/>`, o += `<rect x="16" y="26" width="46" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`, o += `<rect x="16" y="36" width="26" height="9" rx="3" fill="${t}"/>`;
		let r = i || 2;
		for (let e = 0; e < r; e++) {
			let r = 90 + e * 32;
			o += `<rect x="${r}" y="14" width="16" height="3" rx="1.5" fill="${t}" opacity="0.8"/>`;
			for (let e = 0; e < 4; e++) o += `<rect x="${r}" y="${22 + e * 7}" width="22" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		}
		return o += ey(n, e.baselineLinks), o + "</svg>";
	}
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
	return o += ey(n, e.baselineLinks), o + "</svg>";
}
function ey(e, t = 0) {
	let n = `<line x1="8" y1="66" x2="152" y2="66" stroke="${e}" stroke-width="0.6" opacity="0.5"/>`;
	return n += `<rect x="8" y="70" width="40" height="3" rx="1.5" fill="${e}" opacity="0.6"/>`, t && (n += `<g fill="${e}" opacity="0.6">` + Array.from({ length: t }, (e, t) => `<rect x="${120 - t * 16}" y="70" width="12" height="3" rx="1.5"/>`).join("") + "</g>"), n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/animations/core.js
var ty = () => ({
	duration: 600,
	delay: 0
}), ny = 90, ry = {
	"fade-in": {
		version: 1,
		label: "Fade in",
		labelKey: "anim.fadeIn",
		entrance: !0,
		defaults: ty,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Slide up",
		labelKey: "anim.slideUp",
		entrance: !0,
		defaults: ty,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom in",
		labelKey: "anim.zoomIn",
		entrance: !0,
		defaults: ty,
		migrations: {}
	},
	"hover-lift": {
		version: 1,
		label: "Lift on pointer",
		labelKey: "anim.hoverLift",
		entrance: !1,
		defaults: () => ({}),
		migrations: {}
	},
	stagger: {
		version: 1,
		label: "Stagger (card group)",
		labelKey: "anim.stagger",
		entrance: !0,
		group: !0,
		defaults: () => ({
			duration: 600,
			delay: 0,
			step: ny,
			effect: "slide-up",
			pattern: "sequence"
		}),
		migrations: {}
	}
};
//#endregion
//#region ../template/assets/engine/0.7.4/place.js
function iy(e) {
	let t = (e) => Math.round(e * 100) / 100, n = Math.max(0, t(100 - e.w)), r = Math.min(n, Math.max(0, t(e.x - e.w / 2))), i = Math.max(0, e.y - e.h / 2), a = e.snap === !1 || e.grid?.snap === !1, o = e.grid?.size || 8;
	return i = a ? Math.round(i) : Math.round(i / o) * o, {
		x: r,
		y: Math.max(0, i)
	};
}
//#endregion
//#region ../template/assets/engine/0.7.4/calendar-format.js
function ay(e) {
	if (typeof e != "string" || !e.trim()) return !1;
	try {
		return new Intl.DateTimeFormat("en", { timeZone: e.trim() }), !0;
	} catch {
		return !1;
	}
}
//#endregion
//#region ../template/assets/engine/0.7.4/map-links.js
var oy = {
	osm: {
		url: "https://www.openstreetmap.org/search?query=",
		names: !1
	},
	duckduckgo: {
		url: "https://duckduckgo.com/?iaxm=maps&q=",
		names: !0
	},
	brave: {
		url: "https://search.brave.com/maps?q=",
		names: !0
	},
	here: {
		url: "https://wego.here.com/search/",
		names: !0
	},
	google: {
		url: "https://www.google.com/maps/search/?api=1&query=",
		names: !0
	},
	apple: {
		url: "https://maps.apple.com/search?query=",
		names: !0
	},
	norgeskart: {
		url: "https://norgeskart.no/?sok=",
		names: !1
	},
	finn: {
		url: "https://kart.finn.no/?q=",
		names: !0
	}
}, sy = Object.keys(oy);
function cy(e) {
	let t = e?.site?.mapService;
	return Object.hasOwn(oy, t) ? t : "osm";
}
//#endregion
//#region ../template/assets/engine/0.7.4/meeting-links.js
var ly = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/;
function uy(e) {
	let t = Array.isArray(e) ? e : String(e ?? "").split(/[\s,;]+/), n = [];
	for (let e of t) {
		let t = String(e ?? "").trim().toLowerCase();
		if (!t) continue;
		let r = "";
		try {
			r = new URL(/^[a-z][a-z0-9+.-]*:\/\//.test(t) ? t : `https://${t}`).hostname;
		} catch {}
		ly.test(r) && !n.includes(r) && n.push(r);
	}
	return n;
}
//#endregion
//#region src/App.svelte
var dy = /* @__PURE__ */ B("<span class=\"toolbar-row\"><img class=\"site-icon-preview\" alt=\"\"/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/>", 1), fy = /* @__PURE__ */ B("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\" multiple=\"\"/></label> <!>", 1), py = /* @__PURE__ */ B("<p> </p>"), my = /* @__PURE__ */ B("<label> <input type=\"text\" placeholder=\"https://drive.google.com/drive/folders/...\"/></label> <label> <!></label> <label> <input type=\"number\" min=\"1\" max=\"60\"/></label> <button type=\"button\" class=\"ghost action\"><!> </button> <!>", 1), hy = /* @__PURE__ */ B("<label> <!></label> <!>", 1), gy = /* @__PURE__ */ B("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"6\" max=\"60\" step=\"1\"/>", 1), _y = /* @__PURE__ */ B("<label> <!></label> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\"/>", 1), vy = /* @__PURE__ */ B("<button class=\"ghost row-tool\"></button>"), yy = /* @__PURE__ */ B("<span><span class=\"grad-grip\"><svg viewBox=\"0 0 16 16\" width=\"14\" height=\"14\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"13\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"13\" r=\"1.4\"></circle></svg></span> <!> <input type=\"range\" class=\"tb-grow\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value\"> </span> <!></span>"), by = /* @__PURE__ */ B("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/>", 1), xy = /* @__PURE__ */ B("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\"/>", 1), Sy = /* @__PURE__ */ B("<label> <!></label> <!> <button class=\"ghost action\"> </button> <!> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\"/> <label> <!></label>", 1), Cy = /* @__PURE__ */ B("<label> <!></label> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\"/>", 1), wy = /* @__PURE__ */ B("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/>", 1), Ty = /* @__PURE__ */ B("<label> <!></label> <label> <!></label> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" step=\"2\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"180\" step=\"5\"/> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), Ey = /* @__PURE__ */ B("<div class=\"sizefill\"><button type=\"button\" class=\"ghost\"> </button> <button type=\"button\" class=\"ghost\"> </button></div> <label> </label> <div class=\"focalpad\"><span class=\"focaldot\"></span></div> <label class=\"sub\"> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\"/> <label class=\"sub\"> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\"/>", 1), Dy = /* @__PURE__ */ B("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\"/> <label> <!></label>", 1), Oy = /* @__PURE__ */ B("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <label> <!></label> <label> </label> <div class=\"sizestep\"><button type=\"button\">−</button> <input type=\"number\" min=\"10\" max=\"400\"/> <span class=\"sizeunit\">%</span> <button type=\"button\">+</button></div> <!> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\"/> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!>", 1), ky = /* @__PURE__ */ B("<label> <!></label> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.5\" max=\"90\" step=\"0.5\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\"/>", 1), Ay = /* @__PURE__ */ B("<label> <!></label> <label> <!></label>", 1), jy = /* @__PURE__ */ B("<button type=\"button\" class=\"ghost action\"><!> </button>"), My = /* @__PURE__ */ B("<label> <input type=\"number\" max=\"20\"/></label> <label> <!></label> <label> <!></label> <!>", 1), Ny = /* @__PURE__ */ B("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"15\" step=\"1\"/>", 1), Py = /* @__PURE__ */ B("<label> <!></label>"), Fy = /* @__PURE__ */ B("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"48\" step=\"1\"/>", 1), Iy = /* @__PURE__ */ B("<!> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"60\" max=\"400\" step=\"2\"/> <!> <label> <!></label> <label> <!></label> <!> <!>", 1), Ly = /* @__PURE__ */ B("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.5\" max=\"90\" step=\"0.5\"/>", 1), Ry = /* @__PURE__ */ B("<label><input type=\"checkbox\"/> </label>"), zy = /* @__PURE__ */ B("<!> <!> <label> <!></label> <!> <label> <!></label> <!> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\"/>", 1), By = /* @__PURE__ */ B("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\"/>", 1), Vy = /* @__PURE__ */ B("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"video/mp4,video/webm\"/></label> <label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <label> <!></label> <label class=\"sub\"> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label class=\"sub\"> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\"/> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!>", 1), Hy = /* @__PURE__ */ B("<div class=\"bg-layer\"><span class=\"nav-line\"><!> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span> <!></div>"), Uy = /* @__PURE__ */ B("<!> <label> <!></label> <button class=\"ghost action\"> </button>", 1), Wy = /* @__PURE__ */ B("<input class=\"nav-target\"/>"), Gy = /* @__PURE__ */ B("<div class=\"nav-row nav-sub-row\"><input/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span> <span class=\"nav-target\"><!></span> <!></div>"), Ky = /* @__PURE__ */ B("<button class=\"chrome-restore\"><!> </button>"), qy = /* @__PURE__ */ B("<button><!> </button>"), Jy = /* @__PURE__ */ B("<div class=\"tool-pop\"></div>"), Yy = /* @__PURE__ */ B("<span class=\"toolmenu\"><button><!><!></button> <!></span>"), Xy = /* @__PURE__ */ B("<button></button>"), Zy = /* @__PURE__ */ B("<span class=\"tool-cap\"> </span> <span class=\"viewswitch toolgrp\"></span>", 1), Qy = /* @__PURE__ */ B("<div class=\"tool-pop\"><div class=\"tool-pop-row\"><button class=\"ghost\"></button> <span class=\"zoom-readout\"> </span> <button class=\"ghost\"></button></div> <button><!> </button></div>"), $y = /* @__PURE__ */ B("<span class=\"toolmenu\"><button><span class=\"zoom-cap\"> </span><!></button> <!></span>"), eb = /* @__PURE__ */ B("<span class=\"tool-cap\"> </span> <span class=\"zoomswitch toolgrp\"><button class=\"ghost\"></button> <span class=\"zoom-readout\"> </span> <button class=\"ghost\"></button> <button></button></span>", 1), tb = /* @__PURE__ */ B("<div class=\"tool-pop\"><button><!> </button> <button><!> </button></div>"), nb = /* @__PURE__ */ B("<span class=\"tool-cap\"> </span> <span class=\"toolgrp\"><button></button> <button></button></span>", 1), rb = /* @__PURE__ */ B("<button class=\"ghost page-btn\"> </button> <span class=\"toolset\"><!> <!> <!></span>", 1), ib = /* @__PURE__ */ B("<button class=\"badge attention\"><!> <span class=\"btn-label\"> </span> <span class=\"badge-mini\"> </span></button>"), ab = /* @__PURE__ */ B("<button class=\"discard-confirm\"><!> </button>"), ob = /* @__PURE__ */ B("<span class=\"draft-cluster\"><span class=\"chip draft-chip\"><span class=\"chip-full\" aria-hidden=\"true\"> </span> <span class=\"chip-mini\" aria-hidden=\"true\">!</span></span>  <span class=\"discard-wrap\"><button><!><span class=\"discard-label\"> </span></button> <!></span></span>"), sb = /* @__PURE__ */ B("<!> <span class=\"btn-label\"> </span>", 1), cb = /* @__PURE__ */ B("<span class=\"who\"><!> </span>"), lb = /* @__PURE__ */ B("<a class=\"ghost\" href=\"/api/github/login\"> </a>"), ub = /* @__PURE__ */ B("<button class=\"ghost\"><!></button> <!> <a class=\"ghost\" target=\"_blank\" rel=\"noopener\"><!> <span class=\"btn-label\"> </span></a> <button class=\"primary\"> </button>", 1), db = /* @__PURE__ */ B("<button> </button>"), fb = /* @__PURE__ */ B("<span class=\"rail-group\"> </span> <!>", 1), pb = /* @__PURE__ */ B("<div class=\"ctl-row\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\" step=\"10\"/> <span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\" min=\"0\" step=\"10\" placeholder=\"0\"/></div>"), mb = /* @__PURE__ */ B("<p class=\"mini-label\"> </p> <label> <input type=\"text\" spellcheck=\"false\"/></label>", 1), hb = /* @__PURE__ */ B("<div class=\"settings-pop\"><p class=\"panel-strong\"> </p> <label> <!></label> <label> <!></label> <label> <!></label> <label> <!></label> <label> <!></label> <p class=\"mini-label\"> </p> <div class=\"seg\"><button type=\"button\"> </button> <button type=\"button\"> </button></div> <!> <!></div>"), gb = /* @__PURE__ */ B("<button type=\"button\"></button>"), _b = /* @__PURE__ */ B("<span class=\"page-path\">/</span>"), vb = /* @__PURE__ */ B("<input class=\"page-slug\"/>"), yb = /* @__PURE__ */ B("<span class=\"seo-warn\"></span>"), bb = /* @__PURE__ */ B("<button class=\"ghost danger\"><!> </button>"), xb = /* @__PURE__ */ B("<div class=\"page-menu\"><button class=\"ghost\"><!> </button> <!></div>"), Sb = /* @__PURE__ */ B("<div><input class=\"page-title\"/> <!> <!> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <span class=\"page-menu-wrap\"><button class=\"ghost row-tool\"></button> <!></span></span></div>"), Cb = /* @__PURE__ */ B("<img class=\"site-icon-preview\"/>"), wb = /* @__PURE__ */ B("<div><button class=\"page-template-pick\"><span class=\"page-template-thumb\"></span> <span class=\"page-template-name\"> </span></button></div>"), Tb = /* @__PURE__ */ B("<div><button class=\"page-template-pick\"><span class=\"page-template-thumb\"></span> <span class=\"page-template-name\"> </span></button> <button class=\"page-template-del\"></button></div>"), Eb = /* @__PURE__ */ B("<span class=\"mini-label\"> </span> <div class=\"page-template-grid\"></div>", 1), Db = /* @__PURE__ */ B("<div class=\"panel-body\"><!> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><label> <textarea rows=\"2\"></textarea></label> <label> <input/></label> <label> <textarea rows=\"2\"></textarea></label> <label> <!></label> <span class=\"toolbar-row\"><label class=\"ghost filepick tb-grow\"> <input type=\"file\" accept=\"image/*\"/></label> <!></span> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label></div></details> <hr class=\"gridmenu-divider\"/> <input/> <button class=\"ghost action\"> </button> <span class=\"mini-label\"> </span> <div class=\"page-template-grid\"><div><button class=\"page-template-pick\"><span class=\"page-template-thumb\"></span> <span class=\"page-template-name\"> </span></button></div> <!></div> <!></div>"), Ob = /* @__PURE__ */ B("<input/> <span class=\"toolbar-row\"><!> <input type=\"number\" class=\"tb-num\" min=\"8\" max=\"96\" placeholder=\"px\"/> <button><b> </b></button> <button><i> </i></button></span>", 1), kb = /* @__PURE__ */ B("<img alt=\"\"/>"), Ab = /* @__PURE__ */ B("<span class=\"logo-file\"> </span>"), jb = /* @__PURE__ */ B("<div class=\"logo-pick\"><span class=\"logo-thumb\"><!></span> <span class=\"logo-pick-col\"><label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <!></span></div> <div class=\"ctl-triple\"><div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\" min=\"12\" max=\"128\"/></div> <div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\"/></div> <div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\" min=\"0\" max=\"64\"/></div></div>", 1), Mb = /* @__PURE__ */ B("<button type=\"button\"><!><span> </span></button>"), Nb = /* @__PURE__ */ B("<span class=\"toolbar-row\"><span class=\"mini-label tb-grow\"> </span> <input type=\"number\" class=\"tb-num\" placeholder=\"1100\"/></span>"), Pb = /* @__PURE__ */ B("<!> <!> <span class=\"toolbar-row\"><span class=\"mini-label tb-grow\"> </span> <input type=\"number\" class=\"tb-num\"/></span>", 1), Fb = /* @__PURE__ */ B("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), Ib = /* @__PURE__ */ B("<!> <span class=\"toolbar-row\"><span class=\"mini-label tb-grow\"> </span> <input type=\"number\" class=\"tb-num\"/></span>", 1), Lb = /* @__PURE__ */ B("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\"/> <input type=\"number\" class=\"tb-num\"/></div>"), Rb = /* @__PURE__ */ B("<div class=\"ctl-pair\"><div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\"/></div> <div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\"/></div></div>"), zb = /* @__PURE__ */ B("<span class=\"toolbar-row ctl-end\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\" min=\"1\" max=\"8\"/> <span class=\"mini-label\"> </span> <!></span>"), Bb = /* @__PURE__ */ B("<div class=\"ctl-field\"><span class=\"mini-label\"> </span> <div class=\"tile-grid cols-5\" role=\"group\"></div></div> <!>", 1), Vb = /* @__PURE__ */ B("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), Hb = /* @__PURE__ */ B("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"30\" max=\"80\" step=\"5\"/> <span class=\"gridmenu-value\"> </span></div> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"0\" max=\"400\" step=\"10\"/> <span class=\"gridmenu-value\"> </span></div> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"0\" max=\"1200\" step=\"20\"/> <span class=\"gridmenu-value\"> </span></div> <!>", 1), Ub = /* @__PURE__ */ B("<!> <!>", 1), Wb = /* @__PURE__ */ B("<div class=\"mini-card\"><span class=\"mini-label\"> </span> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label></div>"), Gb = /* @__PURE__ */ B("<div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\"/></div>"), Kb = /* @__PURE__ */ B("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label>"), qb = /* @__PURE__ */ B("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <!> <!> <!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <!> <input type=\"range\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label> <!></label>", 1), Jb = /* @__PURE__ */ B("<button type=\"button\"><span> </span><span> </span></button>"), Yb = /* @__PURE__ */ B("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\"/> <span class=\"gridmenu-value\"> </span></div>"), Xb = /* @__PURE__ */ B("<div class=\"swatch-cell\"><!> <span class=\"mini-label\"> </span></div>"), Zb = /* @__PURE__ */ B("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <input type=\"text\" class=\"field-filled\" placeholder=\"https://\"/></label>"), Qb = /* @__PURE__ */ B("<button class=\"ghost\"> </button>"), $b = /* @__PURE__ */ B("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <input type=\"text\" class=\"field-filled\"/></label> <label> <!></label> <!> <!> <!> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <label> <!></label> <label> <!></label>", 1), ex = /* @__PURE__ */ B("<span class=\"tool-move\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span>"), tx = /* @__PURE__ */ B("<div class=\"mini-card\"><span class=\"tool-head\"><span class=\"mini-label\"> </span><!></span> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label></div>"), nx = /* @__PURE__ */ B("<div class=\"mini-card\"><span class=\"tool-head\"><span class=\"mini-label\"> </span><!></span> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div>"), rx = /* @__PURE__ */ B("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <input type=\"text\" class=\"field-filled\"/></label>"), ix = /* @__PURE__ */ B("<span class=\"lrow-warn\"></span>"), ax = /* @__PURE__ */ B("<span class=\"lrow-tile-mark\"><!></span> <span class=\"lrow-tile-name\"> </span>", 1), ox = /* @__PURE__ */ B("<span class=\"bad-target-note\"> </span>"), sx = /* @__PURE__ */ B("<div class=\"lrow-body\"><!> <div class=\"lrow-fields\"><input class=\"field-filled\"/> <input/> <!> <span class=\"lrow-actions\"><!> <button class=\"linkish danger\"> </button></span></div></div>"), cx = /* @__PURE__ */ B("<div><div class=\"lrow-head\" role=\"button\" tabindex=\"0\"><span class=\"lrow-mark\" aria-hidden=\"true\"><!></span> <span class=\"lrow-name\"> </span> <!> <span class=\"row-tools\" role=\"none\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span> <span class=\"lrow-chev\" aria-hidden=\"true\"></span></div> <!></div>"), lx = /* @__PURE__ */ B("<div class=\"ctl-field\"><span class=\"mini-label\"> </span> <div class=\"tile-grid cols-3\" role=\"group\"></div></div> <!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"1\" max=\"24\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <div class=\"mini-card\"><span class=\"mini-label\"> </span> <span class=\"lbtn-pick\"><!> <span class=\"lbtn-name\"><!></span></span></div> <!> <button class=\"ghost action\"> </button>", 1), ux = /* @__PURE__ */ B("<details class=\"group sub-fold\"><summary><span class=\"tool-head\"> <!></span></summary> <div class=\"group-items\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div></details>"), dx = /* @__PURE__ */ B("<div aria-hidden=\"true\"><span class=\"nav-grip\"></span> <div class=\"nav-item-main\"><span class=\"nav-item-name ghost-name\"> </span> <span class=\"ghost-target\"> </span></div></div>"), fx = /* @__PURE__ */ B("<input class=\"nav-item-href\"/>"), px = /* @__PURE__ */ B("<span class=\"nav-item-sub\"></span>"), mx = /* @__PURE__ */ B("<!> <div><span class=\"nav-grip\" draggable=\"true\"></span> <div class=\"nav-item-main\"><input class=\"nav-item-name\"/> <div class=\"nav-item-target\"><!> <!></div></div> <span class=\"nav-actions\"><button class=\"ghost nav-act\"></button> <button class=\"ghost nav-act\"></button> <button class=\"ghost nav-act\"></button></span> <button class=\"ghost row-tool nav-more\"></button></div> <!>", 1), hx = /* @__PURE__ */ B("<!> <div><span class=\"nav-grip\" draggable=\"true\"></span> <div class=\"nav-item-main\"><input class=\"nav-item-name\"/> <div class=\"nav-item-target\"><!> <!></div></div> <!> <span class=\"nav-actions\"><button class=\"ghost nav-act\"></button> <button class=\"ghost nav-act\"></button> <button class=\"ghost nav-act\"></button> <button class=\"ghost nav-act\"></button></span> <button class=\"ghost row-tool nav-more\"></button></div> <!> <!> <!>", 1), gx = /* @__PURE__ */ B("<div class=\"panel-body\"><details class=\"group\"><summary> </summary> <div class=\"group-items\"><!> <!> <!> <!></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><div class=\"ctl-field\"><span class=\"mini-label\"> </span> <div class=\"tile-grid cols-3\" role=\"group\"></div></div> <!> <!> <!> <!> <!></div></details> <hr class=\"gridmenu-divider\"/> <details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><div class=\"seg cw-seg\"></div> <details class=\"sub-inset\"><summary> </summary> <div class=\"sub-inset-body\"><!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\"/> <input type=\"number\" class=\"tb-num\"/></div> <!></div></details></div></details> <hr class=\"gridmenu-divider\"/> <details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><!> <!></div></details> <hr class=\"gridmenu-divider\"/> <details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><!></div></details> <hr class=\"gridmenu-divider\"/> <details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><div class=\"ctl-pair\"><!> <div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\"/></div></div> <div class=\"ctl-pair\"><label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label></div> <div class=\"ctl-pair\"><label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <!></div> <div class=\"ctl-pair\"><label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label></div> <!> <div class=\"ctl-pair\"><label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <!></div> <!> <!></div></details> <hr class=\"gridmenu-divider\"/> <details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><div class=\"ctl-field\"><span class=\"mini-label\"> </span> <div class=\"tile-grid cols-5\" role=\"group\"></div></div> <!> <div class=\"swatch-row\"><!> <div class=\"swatch-cell\"><!> <span class=\"mini-label\"> </span></div> <div class=\"swatch-cell\"><!> <span class=\"mini-label\"> </span></div></div> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label></div></details> <hr class=\"gridmenu-divider\"/> <details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><!></div></details></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><!>  <!></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><div class=\"ctl-field\"><span class=\"mini-label\"> </span> <div role=\"group\"></div></div> <!> <!> <label> <input type=\"number\" min=\"1\" max=\"4\"/></label></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><div class=\"nav-list\" role=\"list\"></div> <button class=\"ghost action\"> </button> <span class=\"toolbar-row\"><input class=\"tb-grow\"/> <button class=\"ghost action\"> </button></span></div></details></div>"), _x = /* @__PURE__ */ B("<p class=\"panel-hint place-error\"> </p>"), vx = /* @__PURE__ */ B("<span class=\"site-cal-color\"><!> <span> </span></span>"), yx = /* @__PURE__ */ B("<div><button type=\"button\" class=\"site-cal-head\"><span class=\"site-cal-dot\" aria-hidden=\"true\"></span> <span class=\"site-cal-text\"><span class=\"site-cal-name\"> </span> <span class=\"site-cal-addr\"> </span></span> <span class=\"site-cal-chev\" aria-hidden=\"true\"></span></button> <div class=\"site-cal-body\"><div class=\"site-cal-clip\"><div class=\"site-cal-fields\"><span class=\"mini-label site-cal-section\"> </span> <label class=\"site-cal-field\"> <input/></label> <label class=\"site-cal-field\"> <input spellcheck=\"false\"/></label> <label class=\"site-cal-field\"> <input/></label> <span class=\"mini-label site-cal-section\"> </span> <div class=\"site-cal-colors\"><span class=\"site-cal-color\"><!> <span> </span></span> <!></div> <span class=\"mini-label site-cal-section\"> </span> <label class=\"site-cal-field\"> <input placeholder=\"https://\" spellcheck=\"false\"/></label> <label class=\"site-cal-field\"> <input/></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <div class=\"site-cal-foot\"><span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span> <button type=\"button\" class=\"site-cal-remove\"> </button></div></div></div></div></div>"), bx = /* @__PURE__ */ B("<div class=\"site-cal-list\"></div>"), xx = /* @__PURE__ */ B("<div class=\"cw-row\"><span class=\"mini-label cw-screen\"> </span> <span><span class=\"cw-fill\"></span></span> <span class=\"gridmenu-value cw-margin\"> </span></div>"), Sx = /* @__PURE__ */ B("<div class=\"mini-label cw-binds\"> </div>"), Cx = /* @__PURE__ */ B("<div class=\"ctl-row\"><span class=\"mini-label\"> </span> <input type=\"range\"/> <span class=\"gridmenu-value\"> </span></div>"), wx = /* @__PURE__ */ B("<button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button>", 1), Tx = /* @__PURE__ */ B("<div class=\"panel-body\"><label> <input/></label> <label> <input/></label> <label> <!></label> <label> <input placeholder=\"Europe/Oslo\" spellcheck=\"false\"/></label> <!> <label> <!></label> <label> <input placeholder=\"meet.example.org\" spellcheck=\"false\"/></label> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><button type=\"button\" class=\"site-cal-add\"><!> </button> <!></div></details> <hr class=\"gridmenu-divider\"/> <p class=\"panel-strong\"> </p> <div class=\"sample cw-sample\"><!> <div class=\"cw-legend\"><span class=\"mini-label\"> </span> <span class=\"mini-label\"> </span></div> <!></div> <div class=\"seg cw-seg\"></div> <!> <p class=\"mini-label\"> </p> <div class=\"seg cw-seg\"></div> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><div class=\"ctl-row\"><span class=\"mini-label\"> </span> <input type=\"range\"/> <span class=\"gridmenu-value\"> </span></div></div></details> <hr class=\"gridmenu-divider\"/> <label> <!></label> <span class=\"toolbar-row\"><label class=\"ghost filepick tb-grow\"> <input type=\"file\" accept=\"image/*\"/></label> <!></span></div>"), Ex = /* @__PURE__ */ B("<div class=\"mini-label tpv-cap\"> </div>"), Dx = /* @__PURE__ */ B("<div class=\"theme-pvw\"><!> <div class=\"tpv-demo\"><div class=\"tpv-h\"> </div> <div class=\"tpv-card\"> </div> <div class=\"tpv-row\"><span class=\"tpv-btn\"> </span><span class=\"tpv-lnk\"> </span></div></div></div>"), Ox = /* @__PURE__ */ B("<button type=\"button\"><span class=\"tp-band\"><i></i><i></i><i></i><i></i></span> <small> </small></button>"), kx = /* @__PURE__ */ B("<div class=\"ctl-row autorow\"><span class=\"autolbl\"> </span> <span class=\"seg\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div>"), Ax = /* @__PURE__ */ B("<span class=\"mini-label\"> </span>"), jx = /* @__PURE__ */ B("<div class=\"palcol\"><!> <span class=\"palcap\"> </span> <b class=\"palhex\"> </b></div>"), Mx = /* @__PURE__ */ B("<div class=\"ctl-row palhead\"><span class=\"mini-label\"> </span> <button type=\"button\"> </button></div> <div></div>", 1), Nx = /* @__PURE__ */ B("<div class=\"panel-body\"><p class=\"panel-strong\"> </p> <div class=\"theme-presets\"></div> <p class=\"panel-strong\"> </p> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <div class=\"ctl-row palhead\"><!> <button type=\"button\"> </button></div> <div class=\"palcells\"></div> <!> <div class=\"ctl-row palauto-row\"><span class=\"mini-label ctl-name\"> </span> <button type=\"button\"> </button></div> <div class=\"theme-previews\"><!> <!></div> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><label> <!></label> <label> <!></label> <div class=\"sample typo-sample\"><div class=\"ts-h\"> </div> <div class=\"ts-b\"> </div></div></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><div class=\"sample form-prev\"><span class=\"fp-btn\"> </span> <span class=\"fp-card\"> </span></div> <label class=\"ctl-row\"> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"24\" step=\"1\"/> <label class=\"ctl-row\"> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"40\" step=\"1\"/></div></details></div>"), Px = /* @__PURE__ */ B("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label>"), Fx = /* @__PURE__ */ B("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\" multiple=\"\"/></label>"), Ix = /* @__PURE__ */ B("<p class=\"panel-hint\"> </p>"), Lx = /* @__PURE__ */ B("<details class=\"group\"><summary> </summary> <div class=\"group-items\"></div></details>"), Rx = /* @__PURE__ */ B("<details class=\"group\"><summary> </summary> <div class=\"group-items\"><button class=\"ghost\"> </button> <button class=\"ghost\"> </button></div></details> <button class=\"ghost\"> </button> <label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><button class=\"ghost\"> </button> <label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\" multiple=\"\"/></label></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button></div> <div class=\"group-items\"><button class=\"ghost\"> </button></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button></div></details> <!> <!>", 1), zx = /* @__PURE__ */ B("<div><input type=\"text\"/> <!></div>"), Bx = /* @__PURE__ */ B("<div class=\"panel-body\"><label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\"/> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label></div>"), Vx = /* @__PURE__ */ B("<p class=\"panel-strong\"> </p> <!> <!>", 1), Hx = /* @__PURE__ */ B("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\"/>", 1), Ux = /* @__PURE__ */ B("<button><span class=\"rs-sample\"><i class=\"rs-line\"></i> <i class=\"rs-chip\"></i> <i class=\"rs-dot\"></i></span> <span class=\"rs-name\"> </span></button>"), Wx = /* @__PURE__ */ B("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" step=\"4\"/> <span class=\"gridmenu-value\"> </span></div> <label> <!></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), Gx = /* @__PURE__ */ B("<label> <!></label> <label> <input type=\"number\" min=\"0\" max=\"1000\" step=\"10\"/></label> <label> <!></label>", 1), Kx = /* @__PURE__ */ B("<label> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\"/></label> <label> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\"/></label> <!>", 1), qx = /* @__PURE__ */ B("<p class=\"panel-strong\"> </p> <label> <input class=\"token-input\"/></label> <hr class=\"gridmenu-divider\"/> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <hr class=\"gridmenu-divider\"/> <p class=\"panel-strong\"> </p> <div class=\"rs-grid\"></div> <label> <span class=\"row-tools\"><span class=\"gridmenu-value\"> </span> <button class=\"ghost row-tool\"></button></span></label> <hr class=\"gridmenu-divider\"/> <p class=\"panel-strong\"> </p> <!> <hr class=\"gridmenu-divider\"/> <p class=\"panel-strong\"> </p> <!> <hr class=\"gridmenu-divider\"/> <label> <!></label> <!> <label> <!></label>", 1), Jx = /* @__PURE__ */ B("<div class=\"panel-body\"><!></div>"), Yx = /* @__PURE__ */ B("<button class=\"footer-tp\"><span class=\"footer-tp-thumb\"></span> <span class=\"footer-tp-name\"> </span></button>"), Xx = /* @__PURE__ */ B("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"16\" max=\"160\" step=\"2\"/>", 1), Zx = /* @__PURE__ */ B("<span class=\"toolbar-row\"><label class=\"ghost filepick tb-grow\"> <input type=\"file\" accept=\"image/*\"/></label> <!></span> <!>", 1), Qx = /* @__PURE__ */ B("<div class=\"nav-row\"><input/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></div> <!>", 1), $x = /* @__PURE__ */ B("<div class=\"nav-row\"><span class=\"nav-line\"><span class=\"footer-soc-preview\" aria-hidden=\"true\"></span> <!></span> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span> <input class=\"nav-target\"/></div>"), eS = /* @__PURE__ */ B("<input/>"), tS = /* @__PURE__ */ B("<label> <input/></label> <label> <input/></label> <label> <input/></label>", 1), nS = /* @__PURE__ */ B("<label> <!></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label> <input/></label> <label> <input/></label> <label> <input/></label> <!>", 1), rS = /* @__PURE__ */ B("<label> <!></label> <hr class=\"gridmenu-divider\"/>", 1), iS = /* @__PURE__ */ B("<div class=\"panel-body\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><div class=\"footer-tpick\"></div></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><label> <input/></label> <label> <input/></label> <label> <!></label> <!></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><!> <button class=\"ghost action\"> </button> <label> <!></label></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><!> <button class=\"ghost action\"> </button></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><!> <button class=\"ghost action\"> </button></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><!> <p class=\"panel-strong\"> </p> <!></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><label> <input/></label> <p class=\"panel-strong\"> </p> <!> <button class=\"ghost action\"> </button></div></details></div>"), aS = /* @__PURE__ */ B("<label> <input type=\"date\"/></label>"), oS = /* @__PURE__ */ B("<label> <input/></label>"), sS = /* @__PURE__ */ B("<img class=\"site-icon-preview\" alt=\"\"/> <button class=\"ghost row-tool\"></button>", 1), cS = /* @__PURE__ */ B("<img class=\"site-icon-preview\" alt=\"\"/>"), lS = /* @__PURE__ */ B("<span class=\"toolbar-row\"><input/> <label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <!> <button class=\"ghost row-tool\"></button></span>"), uS = /* @__PURE__ */ B("<label> <input type=\"number\" min=\"0\" step=\"0.01\"/></label> <label> <input type=\"number\" min=\"0\" step=\"0.01\"/></label> <label> <input/></label> <label> <input/></label> <!> <button class=\"ghost action\"> </button>", 1), dS = /* @__PURE__ */ B("<details class=\"group collection-entry\"><summary> </summary> <div class=\"group-items\"><span class=\"toolbar-row\"><input/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span> <!> <textarea rows=\"3\"></textarea> <!> <span class=\"toolbar-row\"><label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <!></span> <!></div></details>"), fS = /* @__PURE__ */ B("<span class=\"toolbar-row\"><button class=\"ghost action\"> </button> <button class=\"ghost action\"> </button> <label class=\"ghost filepick\"> <input type=\"file\" accept=\".csv,text/csv\"/></label> <button class=\"ghost row-tool\"></button></span> <!> <!> <hr class=\"gridmenu-divider\"/>", 1), pS = /* @__PURE__ */ B("<div class=\"panel-body\"><!> <!> <label> <input/></label> <label> <!></label> <button class=\"ghost action\"> </button></div>"), mS = /* @__PURE__ */ B("<span class=\"plugin-meta\"> </span>"), hS = /* @__PURE__ */ B("<p class=\"panel-hint plugin-warn\"> </p>"), gS = /* @__PURE__ */ B("<div><span class=\"plugin-head\"><span class=\"plugin-name\"> </span> <!> <span class=\"row-tools\"><label class=\"gridmenu-snap plugin-toggle\"><input type=\"checkbox\"/> </label> <button class=\"ghost row-tool\"></button></span></span> <!> <!></div>"), _S = /* @__PURE__ */ B("<div class=\"plugin-row\"><span class=\"plugin-head\"><span class=\"plugin-name\"> </span> <!> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button></span></span></div>"), vS = /* @__PURE__ */ B("<hr class=\"gridmenu-divider\"/> <p class=\"panel-strong\"> </p> <!>", 1), yS = /* @__PURE__ */ B("<hr class=\"gridmenu-divider\"/> <input/> <button class=\"ghost action\"> </button> <!>", 1), bS = /* @__PURE__ */ B("<div class=\"panel-body\"><!> <!> <!> <!></div>"), xS = /* @__PURE__ */ B("<div><span class=\"history-msg\"> </span> <span class=\"history-meta\"> </span></div>"), SS = /* @__PURE__ */ B("<button class=\"ghost\"> </button> <!>", 1), CS = /* @__PURE__ */ B("<p class=\"panel-hint\"> </p> <button class=\"ghost\"> </button>", 1), wS = /* @__PURE__ */ B("<span class=\"update-arrow\"></span> <span class=\"badge\"> </span>", 1), TS = /* @__PURE__ */ B("<details class=\"group\"><summary> </summary> <div class=\"group-items\"><p class=\"update-notes\"> </p></div></details>"), ES = /* @__PURE__ */ B("<details class=\"group\"><summary><span class=\"update-warn\"></span> </summary> <div class=\"group-items\"><pre class=\"update-headers\"> </pre></div></details>"), DS = /* @__PURE__ */ B("<span class=\"chip\"> </span>"), OS = /* @__PURE__ */ B("<div class=\"update-row\"><span class=\"update-path\"> </span> <span class=\"update-flags\"><!> <span class=\"update-warn\"></span></span></div>"), kS = /* @__PURE__ */ B("<div class=\"update-row\"><span class=\"update-path\"> </span> <!></div>"), AS = /* @__PURE__ */ B("<span class=\"update-warn\"></span>"), jS = /* @__PURE__ */ B("<div class=\"update-row\"><span> </span> <span class=\"update-flags\"><!> <!> <input type=\"checkbox\"/></span></div>"), MS = /* @__PURE__ */ B("<div class=\"ctl-row update-opt-head\"><p class=\"panel-strong\"> </p> <span class=\"mini-label\"> </span></div> <!>", 1), NS = /* @__PURE__ */ B("<p class=\"update-summary\"> </p> <!> <!> <!> <details class=\"group\"><summary> </summary> <div class=\"group-items\"></div></details> <!> <button class=\"primary update-run\"> </button>", 1), PS = /* @__PURE__ */ B("<div class=\"update-versions\"><span class=\"update-from\"> </span> <!></div> <!>", 1), FS = /* @__PURE__ */ B("<aside><div class=\"panel-head\"><h2> </h2> <!></div> <!></aside>"), IS = /* @__PURE__ */ B("<div class=\"workspace\"><nav><!> <span class=\"rail-settings\"><span class=\"rail-brand\" title=\"Urd\"><svg class=\"brand-mark\" viewBox=\"10.3 8.3 19.4 25.4\" aria-hidden=\"true\"><path d=\"M12 32V10l16 6.5V32\" fill=\"none\" stroke=\"var(--urd-brand)\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg> <span class=\"brand-word\">Urd</span></span> <button></button> <!></span></nav> <!> <div><div class=\"stage\"><iframe></iframe></div></div></div>"), LS = /* @__PURE__ */ B("<p class=\"loading\"> </p>"), RS = /* @__PURE__ */ B("<p class=\"panel-hint confirm-line\"> </p>"), zS = /* @__PURE__ */ B("<div class=\"setup-overlay\"><div class=\"setup-card\"><h2> </h2> <!> <!> <span class=\"setup-actions\"><button class=\"ghost\"> </button> <button class=\"primary\"> </button></span></div></div>"), BS = /* @__PURE__ */ B("<div class=\"setup-overlay\"><div class=\"setup-card\"><h2> </h2> <p class=\"panel-hint\"> </p> <label> <input/></label> <label> <!></label> <label> <!></label> <p class=\"panel-hint\"> </p> <span class=\"setup-actions\"><button class=\"ghost\"> </button> <button class=\"primary\"> </button></span></div></div>"), VS = /* @__PURE__ */ B("<div><span> </span> <button class=\"toast-x\">×</button></div>"), HS = /* @__PURE__ */ B("<div class=\"editor\"><!> <header><span class=\"topbar-group\"><!> <!></span> <span class=\"topbar-group topbar-draft\"><!></span> <span class=\"topbar-group topbar-right\"><!></span></header> <!> <!> <!> <!> <!> <!></div>   <!>", 1);
function US(e, t) {
	$e(t, !0);
	let n = (e, t = f, n = f, r = f) => {
		var i = Vr(), a = P(i), o = (e) => {
			var i = fy(), a = P(i), o = N(a), s = I(o);
			D(a), ni(I(a, 2), 17, () => r().props.images ?? [], Qr, (e, i, a) => {
				var o = dy(), s = P(o), c = N(s), l = I(c, 2), u = N(l);
				u.disabled = a === 0, W(u, () => X.up, !0), D(u);
				var d = I(u, 2);
				W(d, () => X.down, !0), D(d);
				var f = I(d, 2);
				W(f, () => X.cross, !0), D(f), D(l), D(s);
				var p = I(s, 2), m = N(p), h = F(I(m));
				D(p);
				var g = I(p, 2);
				G(g);
				var _ = I(g, 2), v = N(_), y = F(I(v));
				D(_);
				var b = I(_, 2);
				G(b), L((e, t, n, o, s) => {
					q(c, "src", R(i).src), d.disabled = a === r().props.images.length - 1, q(f, "title", e), H(m, `${t ?? ""} `), H(h, `${n ?? ""}%`), K(g, R(i).x ?? .5), H(v, `${o ?? ""} `), H(y, `${s ?? ""}%`), K(b, R(i).y ?? .5);
				}, [
					() => J("tip.removeImage"),
					() => J("lbl.focusX"),
					() => Math.round((R(i).x ?? .5) * 100),
					() => J("lbl.focusY"),
					() => Math.round((R(i).y ?? .5) * 100)
				]), z("click", u, () => Hr(t(), n(), a, -1)), z("click", d, () => Hr(t(), n(), a, 1)), z("click", f, () => Ur(t(), n(), a)), z("input", g, (e) => Wr(t(), n(), a, "x", Number(e.target.value))), z("input", b, (e) => Wr(t(), n(), a, "y", Number(e.target.value))), V(e, o);
			}), L((e, t) => {
				q(a, "title", e), H(o, `${t ?? ""} `);
			}, [() => J("tip.bg.addImages"), () => J("ui.addImages")]), z("change", s, (e) => B(t(), n(), e)), V(e, i);
		};
		U(a, (e) => {
			(r().props.source ?? "upload") !== "folder" && e(o);
		}), V(e, i);
	}, r = (e, t = f, n = f, r = f) => {
		let i = /* @__PURE__ */ A(() => Ms(r()));
		var a = hy(), o = P(a), s = N(o), c = I(s);
		{
			let e = /* @__PURE__ */ A(() => R(i).source ?? "upload"), r = /* @__PURE__ */ A(() => [["upload", J("opt.photoSource.upload")], ["folder", J("opt.photoSource.folder")]]);
			Y(c, {
				get value() {
					return R(e);
				},
				get options() {
					return R(r);
				},
				onchange: (e) => ar(t(), n(), "source", e)
			});
		}
		D(o);
		var l = I(o, 2), u = (e) => {
			let a = /* @__PURE__ */ A(() => uv(R(i).folder ?? "")), o = /* @__PURE__ */ A(() => !R(a) || R(a).provider === "drive" || R(a).provider === "nextcloud");
			var s = my(), c = P(s), l = N(c), u = I(l);
			G(u);
			let d;
			D(c);
			var f = I(c, 2), p = N(f), m = I(p);
			{
				let e = /* @__PURE__ */ A(() => R(o) || R(i).order === "random" ? R(i).order ?? "name" : "name"), r = /* @__PURE__ */ A(() => R(o) ? [
					["name", J("opt.folderOrder.name")],
					["newest", J("opt.folderOrder.newest")],
					["random", J("opt.folderOrder.random")]
				] : [["name", J("opt.folderOrder.listed")], ["random", J("opt.folderOrder.random")]]);
				Y(m, {
					get value() {
						return R(e);
					},
					get options() {
						return R(r);
					},
					onchange: (e) => ar(t(), n(), "order", e)
				});
			}
			D(f);
			var h = I(f, 2), g = N(h), _ = I(g);
			G(_), D(h);
			var v = I(h, 2), y = N(v);
			W(y, () => X.eye);
			var b = I(y);
			D(v);
			var x = I(v, 2), S = (e) => {
				var r = py();
				let i;
				var a = F(r, !0);
				L((e, t) => {
					i = Ei(r, 1, "folder-status", null, i, { err: e }), H(a, t);
				}, [() => Ir[Lr(t(), n())].err, () => Ir[Lr(t(), n())].text]), V(e, r);
			}, C = /* @__PURE__ */ A(() => Ir[Lr(t(), n())]);
			U(x, (e) => {
				R(C) && e(S);
			}), L((e, t, n, r, o, s, m, y) => {
				q(c, "title", e), H(l, `${t ?? ""} `), K(u, R(i).folder ?? ""), d = Ei(u, 1, "", null, d, { "bad-target": n }), q(f, "title", r), H(p, `${o ?? ""} `), q(h, "title", s), H(g, `${m ?? ""} `), K(_, R(i).folderMax ?? 24), v.disabled = !R(a), H(b, ` ${y ?? ""}`);
			}, [
				() => J("tip.bg.photoFolder"),
				() => J("lbl.photoFolder"),
				() => (R(i).folder ?? "").trim() && !R(a),
				() => J("tip.bg.folderOrder"),
				() => J("lbl.folderOrder"),
				() => J("tip.bg.folderMax"),
				() => J("lbl.folderMax"),
				() => J("ui.checkFolder")
			]), z("change", u, (e) => ar(t(), n(), "folder", e.target.value.trim())), z("change", _, (e) => ar(t(), n(), "folderMax", Number(e.target.value))), z("click", v, () => zr(t(), n(), r())), V(e, s);
		};
		U(l, (e) => {
			(R(i).source ?? "upload") === "folder" && e(u);
		}), L((e, t) => {
			q(o, "title", e), H(s, `${t ?? ""} `);
		}, [() => J("tip.bg.photoSource"), () => J("lbl.photoSource")]), V(e, a);
	}, i = (e, t = f, n = f, r = f) => {
		var i = hy(), a = P(i), o = N(a), s = I(o);
		{
			let e = /* @__PURE__ */ A(() => r().props.motion ?? "none"), i = /* @__PURE__ */ A(() => [
				["none", J("common.none")],
				["kenburns", J("opt.bgMotion.kenburns")],
				["drift", J("opt.bgMotion.drift")]
			]);
			Y(s, {
				get value() {
					return R(e);
				},
				get options() {
					return R(i);
				},
				onchange: (e) => ar(t(), n(), "motion", e)
			});
		}
		D(a);
		var c = I(a, 2), l = (e) => {
			var i = gy(), a = P(i), o = N(a), s = F(I(o));
			D(a);
			var c = I(a, 2);
			G(c), L((e) => {
				H(o, `${e ?? ""} `), H(s, `${r().props.motionSpeed ?? 20 ?? ""} s`), K(c, r().props.motionSpeed ?? 20);
			}, [() => J("lbl.motionSpeed")]), z("input", c, (e) => ar(t(), n(), "motionSpeed", Number(e.target.value))), V(e, i);
		};
		U(c, (e) => {
			(r().props.motion ?? "none") !== "none" && e(l);
		}), L((e, t) => {
			q(a, "title", e), H(o, `${t ?? ""} `);
		}, [() => J("tip.bg.imageMotion"), () => J("lbl.motion")]), V(e, i);
	}, a = (e, t = f, a = f) => {
		var o = Uy(), s = P(o);
		ni(s, 17, a, Qr, (e, o, s) => {
			var c = Hy(), l = N(c), u = N(l);
			{
				let e = /* @__PURE__ */ A(() => J("tip.bg.changeType")), n = /* @__PURE__ */ A(() => _.map(([e, t]) => [e, t.labelKey ? J(t.labelKey) : t.label]));
				Y(u, {
					get value() {
						return R(o).type;
					},
					get title() {
						return R(e);
					},
					get options() {
						return R(n);
					},
					onchange: (e) => Cr(t(), s, e)
				});
			}
			var d = I(u, 2), f = N(d);
			f.disabled = s === 0, W(f, () => X.up, !0), D(f);
			var p = I(f, 2);
			W(p, () => X.down, !0), D(p);
			var m = I(p, 2);
			W(m, () => X.cross, !0), D(m), D(d), D(l);
			var h = I(l, 2), g = (e) => {
				var n = _y(), r = P(n), i = N(r), a = I(i);
				{
					let e = /* @__PURE__ */ A($r), n = /* @__PURE__ */ A(() => J("tip.bg.layerColor"));
					Pa(a, {
						get value() {
							return R(o).props.value;
						},
						get tokens() {
							return R(e);
						},
						get label() {
							return R(n);
						},
						onchange: (e) => ar(t(), s, "value", e)
					});
				}
				D(r);
				var c = I(r, 2), l = N(c), u = F(I(l));
				D(c);
				var d = I(c, 2);
				G(d), L((e, t, n) => {
					H(i, `${e ?? ""} `), H(l, `${t ?? ""} `), H(u, `${n ?? ""}%`), K(d, R(o).props.opacity ?? 1);
				}, [
					() => J("lbl.color"),
					() => J("lbl.strength"),
					() => Math.round((R(o).props.opacity ?? 1) * 100)
				]), z("input", d, (e) => ar(t(), s, "opacity", Number(e.target.value))), V(e, n);
			}, v = (e) => {
				let n = /* @__PURE__ */ A(() => dr(R(o))), r = /* @__PURE__ */ A(() => R(n).stops.reduce((e, t) => e + Math.max(0, Number(t.share) || 0), 0));
				var i = Sy(), a = P(i), c = N(a), l = I(c);
				{
					let e = /* @__PURE__ */ A(() => R(n).kind ?? "linear"), r = /* @__PURE__ */ A(() => [["linear", J("opt.grad.linear")], ["radial", J("opt.grad.radial")]]);
					Y(l, {
						get value() {
							return R(e);
						},
						get options() {
							return R(r);
						},
						onchange: (e) => hr(t(), s, e)
					});
				}
				D(a);
				var u = I(a, 2);
				ni(u, 17, () => R(n).stops, Qr, (e, i, a) => {
					var o = yy();
					let c;
					var l = N(o), u = I(l, 2);
					{
						let e = /* @__PURE__ */ A($r), n = /* @__PURE__ */ A(() => J("tip.bg.stopColor"));
						Pa(u, {
							get value() {
								return R(i).color;
							},
							get tokens() {
								return R(e);
							},
							get label() {
								return R(n);
							},
							onchange: (e) => gr(t(), s, a, { color: e })
						});
					}
					var d = I(u, 2);
					G(d);
					var f = I(d, 2), p = F(f), m = I(f, 2), h = (e) => {
						var n = vy();
						W(n, () => X.cross, !0), D(n), L((e) => q(n, "title", e), [() => J("tip.bg.removeStop")]), z("click", n, () => vr(t(), s, a)), V(e, n);
					};
					U(m, (e) => {
						R(n).stops.length > 2 && e(h);
					}), D(o), L((e, t, r) => {
						c = Ei(o, 1, "nav-line grad-stop", null, c, {
							dragging: R(xr)?.layer === s && R(xr).from === a,
							"drop-above": R(xr)?.layer === s && R(xr).insert === a,
							"drop-below": R(xr)?.layer === s && R(xr).insert === R(n).stops.length && a === R(n).stops.length - 1
						}), q(l, "title", e), K(d, R(i).share ?? 50), q(d, "title", t), H(p, `${r ?? ""}%`);
					}, [
						() => J("tip.bg.dragStop"),
						() => J("tip.bg.stopShare"),
						() => R(r) > 0 ? Math.round(Math.max(0, Number(R(i).share) || 0) / R(r) * 100) : Math.round(100 / R(n).stops.length)
					]), z("pointerdown", l, (e) => Sr(t(), e, s, a)), z("input", d, (e) => gr(t(), s, a, { share: Number(e.target.value) })), V(e, o);
				});
				var d = I(u, 2), f = F(d, !0), p = I(d, 2), m = (e) => {
					var r = by(), i = P(r), a = N(i), o = F(I(a));
					D(i);
					var c = I(i, 2);
					G(c);
					var l = I(c, 2), u = N(l), d = F(I(u));
					D(l);
					var f = I(l, 2);
					G(f), L((e, t, r, i) => {
						H(a, `${e ?? ""} `), H(o, `${t ?? ""}%`), K(c, R(n).x ?? .5), H(u, `${r ?? ""} `), H(d, `${i ?? ""}%`), K(f, R(n).y ?? .5);
					}, [
						() => J("lbl.centerX"),
						() => Math.round((R(n).x ?? .5) * 100),
						() => J("lbl.centerY"),
						() => Math.round((R(n).y ?? .5) * 100)
					]), z("input", c, (e) => pr(t(), s, "x", Number(e.target.value))), z("input", f, (e) => pr(t(), s, "y", Number(e.target.value))), V(e, r);
				}, h = (e) => {
					var r = xy(), i = P(r), a = N(i), o = F(I(a));
					D(i);
					var c = I(i, 2);
					G(c), L((e) => {
						H(a, `${e ?? ""} `), H(o, `${R(n).angle ?? ""}°`), K(c, R(n).angle);
					}, [() => J("lbl.angle")]), z("input", c, (e) => pr(t(), s, "angle", Number(e.target.value))), V(e, r);
				};
				U(p, (e) => {
					(R(n).kind ?? "linear") === "radial" ? e(m) : e(h, -1);
				});
				var g = I(p, 2), _ = N(g), v = F(I(_));
				D(g);
				var y = I(g, 2);
				G(y);
				var b = I(y, 2), x = N(b), S = I(x);
				{
					let e = /* @__PURE__ */ A(() => R(n).animation ?? "none");
					Y(S, {
						get value() {
							return R(e);
						},
						get options() {
							return mr[(R(n).kind ?? "linear") === "radial" ? "radial" : "linear"];
						},
						onchange: (e) => pr(t(), s, "animation", e)
					});
				}
				D(b), L((e, t, r, i, a, o, s) => {
					H(c, `${e ?? ""} `), q(d, "title", t), H(f, r), H(_, `${i ?? ""} `), H(v, `${a ?? ""}%`), K(y, R(n).opacity ?? 1), q(b, "title", o), H(x, `${s ?? ""} `);
				}, [
					() => J("blocks.shape"),
					() => J("tip.bg.addStop"),
					() => J("ui.addStop"),
					() => J("lbl.strength"),
					() => Math.round((R(n).opacity ?? 1) * 100),
					() => J("tip.bg.motion"),
					() => J("lbl.motion")
				]), z("click", d, () => _r(t(), s)), z("input", y, (e) => pr(t(), s, "opacity", Number(e.target.value))), V(e, i);
			}, y = (e) => {
				var n = Cy(), r = P(n), i = N(r), a = I(i);
				{
					let e = /* @__PURE__ */ A($r), n = /* @__PURE__ */ A(() => J("tip.bg.glowColor"));
					Pa(a, {
						get value() {
							return R(o).props.color;
						},
						get tokens() {
							return R(e);
						},
						get label() {
							return R(n);
						},
						onchange: (e) => ar(t(), s, "color", e)
					});
				}
				D(r);
				var c = I(r, 2), l = N(c), u = F(I(l));
				D(c);
				var d = I(c, 2);
				G(d);
				var f = I(d, 2), p = N(f), m = F(I(p));
				D(f);
				var h = I(f, 2);
				G(h);
				var g = I(h, 2), _ = N(g), v = F(I(_));
				D(g);
				var y = I(g, 2);
				G(y);
				var b = I(y, 2), x = N(b), S = F(I(x));
				D(b);
				var C = I(b, 2);
				G(C), L((e, t, n, r, a, s, c, f, g) => {
					H(i, `${e ?? ""} `), H(l, `${t ?? ""} `), H(u, `${n ?? ""}%`), K(d, R(o).props.x), H(p, `${r ?? ""} `), H(m, `${a ?? ""}%`), K(h, R(o).props.y), H(_, `${s ?? ""} `), H(v, `${c ?? ""}%`), K(y, R(o).props.radius), H(x, `${f ?? ""} `), H(S, `${g ?? ""}%`), K(C, R(o).props.opacity);
				}, [
					() => J("lbl.color"),
					() => J("lbl.posX"),
					() => Math.round(R(o).props.x * 100),
					() => J("lbl.posY"),
					() => Math.round(R(o).props.y * 100),
					() => J("lbl.size"),
					() => Math.round(R(o).props.radius * 100),
					() => J("lbl.strength"),
					() => Math.round(R(o).props.opacity * 100)
				]), z("input", d, (e) => ar(t(), s, "x", Number(e.target.value))), z("input", h, (e) => ar(t(), s, "y", Number(e.target.value))), z("input", y, (e) => ar(t(), s, "radius", Number(e.target.value))), z("input", C, (e) => ar(t(), s, "opacity", Number(e.target.value))), V(e, n);
			}, b = (e) => {
				var n = wy(), r = P(n), i = N(r), a = F(I(i));
				D(r);
				var c = I(r, 2);
				G(c), L((e, t) => {
					H(i, `${e ?? ""} `), H(a, `${t ?? ""}%`), K(c, R(o).props.opacity);
				}, [() => J("lbl.strength"), () => Math.round(R(o).props.opacity * 100)]), z("input", c, (e) => ar(t(), s, "opacity", Number(e.target.value))), V(e, n);
			}, x = (e) => {
				var n = Ty(), r = P(n), i = N(r), a = I(i);
				{
					let e = /* @__PURE__ */ A(() => p_(R(o).props.pattern)), n = /* @__PURE__ */ A(() => l_.map((e) => [e, J(`opt.bgPattern.${e}`)]));
					Y(a, {
						get value() {
							return R(e);
						},
						get options() {
							return R(n);
						},
						onchange: (e) => ar(t(), s, "pattern", e)
					});
				}
				D(r);
				var c = I(r, 2), l = N(c), u = I(l);
				{
					let e = /* @__PURE__ */ A(() => R(o).props.color ?? "text"), n = /* @__PURE__ */ A($r), r = /* @__PURE__ */ A(() => J("lbl.color"));
					Pa(u, {
						get value() {
							return R(e);
						},
						get tokens() {
							return R(n);
						},
						get label() {
							return R(r);
						},
						onchange: (e) => ar(t(), s, "color", e)
					});
				}
				D(c);
				var d = I(c, 2), f = N(d), p = F(I(f));
				D(d);
				var m = I(d, 2);
				G(m);
				var h = I(m, 2), g = N(h), _ = F(I(g));
				D(h);
				var v = I(h, 2);
				G(v);
				var y = I(v, 2), b = N(y), x = F(I(b));
				D(y);
				var S = I(y, 2);
				G(S);
				var C = I(S, 2), w = N(C);
				G(w);
				var T = I(w);
				D(C), L((e, t, n, r, a, s, c, u) => {
					H(i, `${e ?? ""} `), H(l, `${t ?? ""} `), H(f, `${n ?? ""} `), H(p, `${R(o).props.size ?? u_.dflt ?? ""} px`), q(m, "min", u_.min), q(m, "max", u_.max), K(m, R(o).props.size ?? u_.dflt), H(g, `${r ?? ""} `), H(_, `${a ?? ""}%`), K(v, R(o).props.opacity ?? .12), H(b, `${s ?? ""} `), H(x, `${R(o).props.rotation ?? 0 ?? ""}°`), K(S, R(o).props.rotation ?? 0), q(C, "title", c), Ni(w, R(o).props.invert === !0), H(T, ` ${u ?? ""}`);
				}, [
					() => J("lbl.bgPattern"),
					() => J("lbl.color"),
					() => J("lbl.size"),
					() => J("lbl.strength"),
					() => Math.round((R(o).props.opacity ?? .12) * 100),
					() => J("lbl.patternRotation"),
					() => J("tip.bg.patternInvert"),
					() => J("lbl.patternInvert")
				]), z("input", m, (e) => ar(t(), s, "size", Number(e.target.value))), z("input", v, (e) => ar(t(), s, "opacity", Number(e.target.value))), z("input", S, (e) => ar(t(), s, "rotation", Number(e.target.value))), z("change", w, (e) => ar(t(), s, "invert", e.target.checked)), V(e, n);
			}, S = (e) => {
				let n = /* @__PURE__ */ A(() => R(o).props.fit === "tile" || R(o).props.fit === "repeat");
				var r = Oy(), a = P(r), c = N(a), l = I(c);
				D(a);
				var u = I(a, 2), d = N(u), f = I(d);
				{
					let e = /* @__PURE__ */ A(() => R(n) ? "tile" : "plain"), r = /* @__PURE__ */ A(() => [["plain", J("opt.img.plain")], ["tile", J("opt.img.tile")]]);
					Y(f, {
						get value() {
							return R(e);
						},
						get options() {
							return R(r);
						},
						onchange: (e) => ar(t(), s, "fit", e)
					});
				}
				D(u);
				var p = I(u, 2), m = F(p, !0), h = I(p, 2), g = N(h), _ = I(g, 2);
				G(_);
				var v = I(_, 4);
				D(h);
				var y = I(h, 2), b = (e) => {
					var n = Ey(), r = P(n), i = N(r), a = F(i, !0), c = I(i, 2), l = F(c, !0);
					D(r);
					var u = I(r, 2), d = F(u, !0), f = I(u, 2), p = I(f, 2), m = N(p), h = F(I(m));
					D(p);
					var g = I(p, 2);
					G(g);
					var _ = I(g, 2), v = N(_), y = F(I(v));
					D(_);
					var b = I(_, 2);
					G(b), L((e, t, n, r, s, p, _, x, S, C, w, T) => {
						q(i, "title", e), H(a, t), q(c, "title", n), H(l, r), q(u, "title", s), H(d, p), Oi(f, `--fx:${_ ?? ""}%; --fy:${x ?? ""}%`), H(m, `${S ?? ""} `), H(h, `${C ?? ""}%`), K(g, R(o).props.x ?? .5), H(v, `${w ?? ""} `), H(y, `${T ?? ""}%`), K(b, R(o).props.y ?? .5);
					}, [
						() => J("tip.bg.cover"),
						() => J("ui.cover"),
						() => J("opt.fitFrame.contain"),
						() => J("opt.fit.contain"),
						() => J("tip.bg.position"),
						() => J("lbl.position"),
						() => Math.max(0, Math.min(1, R(o).props.x ?? .5)) * 100,
						() => Math.max(0, Math.min(1, R(o).props.y ?? .5)) * 100,
						() => J("lbl.horizontal"),
						() => Math.round((R(o).props.x ?? .5) * 100),
						() => J("lbl.vertical"),
						() => Math.round((R(o).props.y ?? .5) * 100)
					]), z("click", i, () => ur(t(), s, R(o), "cover")), z("click", c, () => ur(t(), s, R(o), "contain")), z("pointerdown", f, (e) => or(e, t(), s, "xy")), z("input", g, (e) => ar(t(), s, "x", Number(e.target.value))), z("input", b, (e) => ar(t(), s, "y", Number(e.target.value))), V(e, n);
				};
				U(y, (e) => {
					R(n) || e(b);
				});
				var x = I(y, 2), S = N(x), C = F(I(S));
				D(x);
				var w = I(x, 2);
				G(w);
				var T = I(w, 2), ee = N(T), te = F(I(ee));
				D(T);
				var ne = I(T, 2);
				G(ne);
				var re = I(ne, 2);
				i(re, t, () => s, () => R(o));
				var E = I(re, 2), ie = N(E);
				G(ie);
				var ae = I(ie);
				D(E);
				var oe = I(E, 2), se = (e) => {
					var n = Dy(), r = P(n), i = N(r), a = F(I(i));
					D(r);
					var c = I(r, 2);
					G(c);
					var l = I(c, 2), u = N(l), d = I(u);
					{
						let e = /* @__PURE__ */ A(() => R(o).props.bleed ?? "none"), n = /* @__PURE__ */ A(() => [
							["none", J("common.none")],
							["up", J("opt.bleed.up")],
							["down", J("opt.bleed.down")],
							["both", J("opt.brand.both")]
						]);
						Y(d, {
							get value() {
								return R(e);
							},
							get options() {
								return R(n);
							},
							onchange: (e) => ar(t(), s, "bleed", e)
						});
					}
					D(l), L((e, t, n, r) => {
						H(i, `${e ?? ""} `), H(a, `${t ?? ""}%`), K(c, R(o).props.parallax ?? .3), q(l, "title", n), H(u, `${r ?? ""} `);
					}, [
						() => J("lbl.parallaxStrength"),
						() => Math.round((R(o).props.parallax ?? 0) * 100),
						() => J("tip.bg.bleed"),
						() => J("lbl.bleed")
					]), z("input", c, (e) => ar(t(), s, "parallax", Number(e.target.value))), V(e, n);
				};
				U(oe, (e) => {
					(R(o).props.parallax ?? 0) > 0 && e(se);
				}), L((e, t, n, r, i, s, l, f, h, y, b, x, T, re) => {
					q(a, "title", e), H(c, `${t ?? ""} `), q(u, "title", n), H(d, `${r ?? ""} `), q(p, "title", i), H(m, s), q(g, "title", l), K(_, f), q(v, "title", h), H(S, `${y ?? ""} `), H(C, `${R(o).props.blur ?? 0 ?? ""} px`), K(w, R(o).props.blur ?? 0), H(ee, `${b ?? ""} `), H(te, `${x ?? ""}%`), K(ne, R(o).props.opacity ?? 1), q(E, "title", T), Ni(ie, (R(o).props.parallax ?? 0) > 0), H(ae, ` ${re ?? ""}`);
				}, [
					() => J("tip.webpAuto"),
					() => R(o).props.src ? J("ui.changeImage") : J("ui.chooseImage"),
					() => J("tip.bg.fit"),
					() => J("lbl.imageFit"),
					() => J("tip.bg.size"),
					() => J("lbl.size"),
					() => J("tip.smaller"),
					() => Math.round((R(o).props.size ?? 1) * 100),
					() => J("tip.larger"),
					() => J("lbl.blur"),
					() => J("lbl.strength"),
					() => Math.round((R(o).props.opacity ?? 1) * 100),
					() => J("tip.bg.parallax"),
					() => J("lbl.parallax")
				]), z("change", l, (e) => Nr(t(), s, e)), z("click", g, () => cr(t(), s, R(o).props.size ?? 1, -.05)), z("change", _, (e) => lr(t(), s, e.target.value)), z("click", v, () => cr(t(), s, R(o).props.size ?? 1, .05)), z("input", w, (e) => ar(t(), s, "blur", Number(e.target.value))), z("input", ne, (e) => ar(t(), s, "opacity", Number(e.target.value))), z("change", ie, (e) => ar(t(), s, "parallax", e.target.checked ? .3 : 0)), V(e, r);
			}, C = (e) => {
				let i = /* @__PURE__ */ A(() => Ms(R(o))), a = /* @__PURE__ */ A(() => R(i).style ?? "floating"), c = /* @__PURE__ */ A(() => Qc(R(a), R(i).motion)), l = /* @__PURE__ */ A(() => (R(i).seed ?? 0) > 0);
				var u = zy(), d = P(u);
				r(d, t, () => s, () => R(o));
				var f = I(d, 2);
				n(f, t, () => s, () => R(o));
				var p = I(f, 2), m = N(p), h = I(m);
				{
					let e = /* @__PURE__ */ A(() => Dc.map((e) => [e, J(`opt.galleryStyle.${e}`)]));
					Y(h, {
						get value() {
							return R(a);
						},
						get options() {
							return R(e);
						},
						onchange: (e) => ar(t(), s, "style", e)
					});
				}
				D(p);
				var g = I(p, 2), _ = (e) => {
					var n = ky(), r = P(n), a = N(r), o = I(a);
					{
						let e = /* @__PURE__ */ A(() => R(i).fit ?? "cover"), n = /* @__PURE__ */ A(() => [["cover", J("opt.fit.cover")], ["contain", J("opt.fit.contain")]]);
						Y(o, {
							get value() {
								return R(e);
							},
							get options() {
								return R(n);
							},
							onchange: (e) => ar(t(), s, "fit", e)
						});
					}
					D(r);
					var c = I(r, 2), l = N(c), u = F(I(l));
					D(c);
					var d = I(c, 2);
					G(d);
					var f = I(d, 2), p = N(f), m = F(I(p));
					D(f);
					var h = I(f, 2);
					G(h);
					var g = I(h, 2), _ = N(g), v = F(I(_));
					D(g);
					var y = I(g, 2);
					G(y), L((e, t, n, r, o) => {
						H(a, `${e ?? ""} `), H(l, `${t ?? ""} `), H(u, `${R(i).interval ?? 12 ?? ""} s`), K(d, R(i).interval ?? 12), H(p, `${n ?? ""} `), H(m, `${r ?? ""} s`), K(h, R(i).fade ?? 1.5), H(_, `${o ?? ""} `), H(v, `${R(i).blur ?? 0 ?? ""} px`), K(y, R(i).blur ?? 0);
					}, [
						() => J("lbl.imageFit"),
						() => J("lbl.secondsPerImage"),
						() => J("lbl.transition"),
						() => (R(i).fade ?? 1.5).toFixed(1),
						() => J("lbl.blur")
					]), z("input", d, (e) => ar(t(), s, "interval", Number(e.target.value))), z("input", h, (e) => ar(t(), s, "fade", Number(e.target.value))), z("input", y, (e) => ar(t(), s, "blur", Number(e.target.value))), V(e, n);
				}, v = (e) => {
					var n = Iy(), r = P(n), o = (e) => {
						var n = Ay(), r = P(n), a = N(r), o = I(a);
						{
							let e = /* @__PURE__ */ A(() => String(R(i).rows ?? 2));
							Y(o, {
								get value() {
									return R(e);
								},
								options: [["1", "1"], ["2", "2"]],
								onchange: (e) => ar(t(), s, "rows", Number(e))
							});
						}
						D(r);
						var c = I(r, 2), l = N(c), u = I(l);
						{
							let e = /* @__PURE__ */ A(() => R(i).direction ?? "left"), n = /* @__PURE__ */ A(() => [["left", J("opt.ribbonDir.left")], ["right", J("opt.ribbonDir.right")]]);
							Y(u, {
								get value() {
									return R(e);
								},
								get options() {
									return R(n);
								},
								onchange: (e) => ar(t(), s, "direction", e)
							});
						}
						D(c), L((e, t) => {
							H(a, `${e ?? ""} `), H(l, `${t ?? ""} `);
						}, [() => J("lbl.galleryRows"), () => J("lbl.photoDirection")]), V(e, n);
					}, c = (e) => {
						var n = My(), r = P(n), o = N(r), c = I(o);
						G(c), D(r);
						var u = I(r, 2), d = N(u), f = I(d);
						{
							let e = /* @__PURE__ */ A(() => R(i).repeat === !0 ? "repeat" : "once"), n = /* @__PURE__ */ A(() => [["once", J("opt.galleryRepeat.once")], ["repeat", J("opt.galleryRepeat.repeat")]]);
							Y(f, {
								get value() {
									return R(e);
								},
								get options() {
									return R(n);
								},
								onchange: (e) => ar(t(), s, "repeat", e === "repeat")
							});
						}
						D(u);
						var p = I(u, 2), m = N(p), h = I(m);
						{
							let e = /* @__PURE__ */ A(() => R(l) ? "fixed" : "random"), n = /* @__PURE__ */ A(() => [["random", J("opt.galleryPlace.random")], ["fixed", J("opt.galleryPlace.fixed")]]);
							Y(h, {
								get value() {
									return R(e);
								},
								get options() {
									return R(n);
								},
								onchange: (e) => ar(t(), s, "seed", e === "fixed" ? Rr() : 0)
							});
						}
						D(p);
						var g = I(p, 2), _ = (e) => {
							var n = jy(), r = N(n);
							W(r, () => X.shuffle);
							var i = I(r);
							D(n), L((e, t) => {
								q(n, "title", e), H(i, ` ${t ?? ""}`);
							}, [() => J("tip.bg.photoSeed"), () => J("ui.shufflePhotos")]), z("click", n, () => ar(t(), s, "seed", Rr())), V(e, n);
						};
						U(g, (e) => {
							R(l) && e(_);
						}), L((e, t, n, s, l, f) => {
							q(r, "title", e), H(o, `${t ?? ""} `), q(c, "min", R(a) === "mosaic" ? 4 : 1), K(c, R(i).count ?? (R(a) === "mosaic" ? 12 : 8)), q(u, "title", n), H(d, `${s ?? ""} `), q(p, "title", l), H(m, `${f ?? ""} `);
						}, [
							() => J("tip.bg.photoCount"),
							() => J("lbl.photoCount"),
							() => J("tip.bg.galleryRepeat"),
							() => J("lbl.galleryRepeat"),
							() => J("tip.bg.galleryPlace"),
							() => J("lbl.galleryPlace")
						]), z("change", c, (e) => ar(t(), s, "count", Number(e.target.value))), V(e, n);
					};
					U(r, (e) => {
						R(a) === "band" ? e(o) : e(c, -1);
					});
					var u = I(r, 2), d = N(u), f = F(I(d));
					D(u);
					var p = I(u, 2);
					G(p);
					var m = I(p, 2), h = (e) => {
						var n = Ny(), r = P(n), a = N(r), o = F(I(a));
						D(r);
						var c = I(r, 2);
						G(c);
						var l = I(c, 2), u = N(l), d = F(I(u));
						D(l);
						var f = I(l, 2);
						G(f), L((e, t, n, s) => {
							q(r, "title", e), H(a, `${t ?? ""} `), H(o, `${n ?? ""}%`), K(c, R(i).spread ?? .85), H(u, `${s ?? ""} `), H(d, `${R(i).tilt ?? 5 ?? ""}°`), K(f, R(i).tilt ?? 5);
						}, [
							() => J("tip.bg.photoSpread"),
							() => J("lbl.photoSpread"),
							() => Math.round((R(i).spread ?? .85) * 100),
							() => J("lbl.photoTilt")
						]), z("input", c, (e) => ar(t(), s, "spread", Number(e.target.value))), z("input", f, (e) => ar(t(), s, "tilt", Number(e.target.value))), V(e, n);
					};
					U(m, (e) => {
						R(a) === "floating" && e(h);
					});
					var g = I(m, 2), _ = N(g), v = I(_);
					{
						let e = /* @__PURE__ */ A(() => R(i).shape ?? "rect"), n = /* @__PURE__ */ A(() => Oc.map((e) => [e, J(`opt.galleryShape.${e}`)]));
						Y(v, {
							get value() {
								return R(e);
							},
							get options() {
								return R(n);
							},
							onchange: (e) => ar(t(), s, "shape", e)
						});
					}
					D(g);
					var y = I(g, 2), b = N(y), x = I(b);
					{
						let e = /* @__PURE__ */ A(() => R(i).look ?? "shadow"), n = /* @__PURE__ */ A(() => kc.map((e) => [e, J(`opt.galleryLook.${e}`)]));
						Y(x, {
							get value() {
								return R(e);
							},
							get options() {
								return R(n);
							},
							onchange: (e) => ar(t(), s, "look", e)
						});
					}
					D(y);
					var S = I(y, 2), C = (e) => {
						var n = Py(), r = N(n), a = I(r);
						{
							let e = /* @__PURE__ */ A(() => il(R(i).look, R(i).frameColor)), n = /* @__PURE__ */ A($r), r = /* @__PURE__ */ A(() => J("tip.bg.frameColor"));
							Pa(a, {
								get value() {
									return R(e);
								},
								get tokens() {
									return R(n);
								},
								allowClear: !0,
								get label() {
									return R(r);
								},
								onchange: (e) => ar(t(), s, "frameColor", e ?? "")
							});
						}
						D(n), L((e) => H(r, `${e ?? ""} `), [() => J("lbl.frameColor")]), V(e, n);
					}, w = /* @__PURE__ */ A(() => rl(R(i).look));
					U(S, (e) => {
						R(w) && e(C);
					});
					var T = I(S, 2), ee = (e) => {
						var n = Fy(), r = P(n), a = N(r), o = F(I(a));
						D(r);
						var c = I(r, 2);
						G(c), L((e) => {
							H(a, `${e ?? ""} `), H(o, `${R(i).radius ?? 5 ?? ""} px`), K(c, R(i).radius ?? 5);
						}, [() => J("lbl.rounding")]), z("input", c, (e) => ar(t(), s, "radius", Number(e.target.value))), V(e, n);
					}, te = /* @__PURE__ */ A(() => ll(R(i).shape) && (R(i).look ?? "shadow") !== "polaroid");
					U(T, (e) => {
						R(te) && e(ee);
					}), L((e, t, n, r, i, a, o) => {
						H(d, `${e ?? ""} `), H(f, `${t ?? ""} px`), K(p, n), q(g, "title", r), H(_, `${i ?? ""} `), q(y, "title", a), H(b, `${o ?? ""} `);
					}, [
						() => J("lbl.size"),
						() => nl(R(i).size, R(a)),
						() => nl(R(i).size, R(a)),
						() => J("tip.bg.galleryShape"),
						() => J("lbl.galleryShape"),
						() => J("tip.bg.galleryLook"),
						() => J("lbl.galleryLook")
					]), z("input", p, (e) => ar(t(), s, "size", Number(e.target.value))), V(e, n);
				};
				U(g, (e) => {
					R(a) === "fill" ? e(_) : e(v, -1);
				});
				var y = I(g, 2), b = N(y), x = I(b);
				{
					let e = /* @__PURE__ */ A(() => R(i).tone ?? "natural"), n = /* @__PURE__ */ A(() => Ac.map((e) => [e, J(`opt.galleryTone.${e}`)]));
					Y(x, {
						get value() {
							return R(e);
						},
						get options() {
							return R(n);
						},
						onchange: (e) => ar(t(), s, "tone", e)
					});
				}
				D(y);
				var S = I(y, 2), C = (e) => {
					var n = Py(), r = N(n), i = I(r);
					{
						let e = /* @__PURE__ */ A(() => $c(R(a)).map((e) => [e, J(e === "none" ? "common.none" : `opt.galleryMotion.${e}`)]));
						Y(i, {
							get value() {
								return R(c);
							},
							get options() {
								return R(e);
							},
							onchange: (e) => ar(t(), s, "motion", e)
						});
					}
					D(n), L((e, t) => {
						q(n, "title", e), H(r, `${t ?? ""} `);
					}, [() => J("tip.bg.photoMotion"), () => J("lbl.motion")]), V(e, n);
				}, w = /* @__PURE__ */ A(() => $c(R(a)).length > 1);
				U(S, (e) => {
					R(w) && e(C);
				});
				var T = I(S, 2), ee = (e) => {
					var n = Ly(), r = P(n), a = N(r), o = F(I(a));
					D(r);
					var c = I(r, 2);
					G(c), L((e) => {
						H(a, `${e ?? ""} `), H(o, `${R(i).interval ?? 12 ?? ""} s`), K(c, R(i).interval ?? 12);
					}, [() => J("lbl.secondsPerImage")]), z("input", c, (e) => ar(t(), s, "interval", Number(e.target.value))), V(e, n);
				}, te = (e) => {
					var n = Ly(), r = P(n), a = N(r), o = F(I(a));
					D(r);
					var c = I(r, 2);
					G(c), L((e) => {
						H(a, `${e ?? ""} `), H(o, `${R(i).motionSpeed ?? 30 ?? ""} s`), K(c, R(i).motionSpeed ?? 30);
					}, [() => J("lbl.motionSpeed")]), z("input", c, (e) => ar(t(), s, "motionSpeed", Number(e.target.value))), V(e, n);
				};
				U(T, (e) => {
					R(c) === "crossfade" && R(a) !== "fill" ? e(ee) : (R(c) !== "none" || R(a) === "band") && e(te, 1);
				});
				var ne = I(T, 2), re = N(ne);
				G(re);
				var E = I(re);
				D(ne);
				var ie = I(ne, 2), ae = (e) => {
					var n = Ry();
					let r;
					var a = N(n);
					G(a);
					var o = I(a);
					D(n), L((e, t) => {
						r = Ei(n, 1, "gridmenu-snap", null, r, { muted: R(i).underNav === !1 }), q(n, "title", e), Ni(a, R(i).underAnnounce === !0), a.disabled = R(i).underNav === !1, H(o, ` ${t ?? ""}`);
					}, [() => J("tip.bg.underAnnounce"), () => J("lbl.underAnnounce")]), z("change", a, (e) => e.target.checked ? ir(t(), s, {
						underAnnounce: !0,
						underNav: !0
					}) : ar(t(), s, "underAnnounce", !1)), V(e, n);
				};
				U(ie, (e) => {
					R(k).nav?.announcement?.text && e(ae);
				});
				var oe = I(ie, 2), se = N(oe), ce = F(I(se));
				D(oe);
				var le = I(oe, 2);
				G(le), L((e, t, n, r, a, o, s, c) => {
					q(p, "title", e), H(m, `${t ?? ""} `), q(y, "title", n), H(b, `${r ?? ""} `), q(ne, "title", a), Ni(re, R(i).underNav !== !1), H(E, ` ${o ?? ""}`), H(se, `${s ?? ""} `), H(ce, `${c ?? ""}%`), K(le, R(i).opacity ?? .85);
				}, [
					() => J("tip.bg.galleryStyle"),
					() => J("lbl.galleryStyle"),
					() => J("tip.bg.galleryTone"),
					() => J("lbl.galleryTone"),
					() => J("tip.bg.underNav"),
					() => J("lbl.underNav"),
					() => J("lbl.strength"),
					() => Math.round((R(i).opacity ?? .85) * 100)
				]), z("change", re, (e) => e.target.checked ? ar(t(), s, "underNav", !0) : ir(t(), s, {
					underNav: !1,
					underAnnounce: !1
				})), z("input", le, (e) => ar(t(), s, "opacity", Number(e.target.value))), V(e, u);
			}, w = (e) => {
				var n = Vy(), r = P(n), i = N(r), a = I(i);
				D(r);
				var c = I(r, 2), l = N(c), u = I(l);
				D(c);
				var d = I(c, 2), f = N(d), p = I(f);
				{
					let e = /* @__PURE__ */ A(() => R(o).props.fit ?? "cover"), n = /* @__PURE__ */ A(() => [["cover", J("opt.fit.cover")], ["contain", J("opt.fit.contain")]]);
					Y(p, {
						get value() {
							return R(e);
						},
						get options() {
							return R(n);
						},
						onchange: (e) => ar(t(), s, "fit", e)
					});
				}
				D(d);
				var m = I(d, 2), h = N(m), g = F(I(h));
				D(m);
				var _ = I(m, 2);
				G(_);
				var v = I(_, 2), y = N(v), b = F(I(y));
				D(v);
				var x = I(v, 2);
				G(x);
				var S = I(x, 2), C = N(S), w = F(I(C));
				D(S);
				var T = I(S, 2);
				G(T);
				var ee = I(T, 2), te = N(ee);
				G(te);
				var ne = I(te);
				D(ee);
				var re = I(ee, 2), E = (e) => {
					var n = By(), r = P(n), i = N(r), a = F(I(i));
					D(r);
					var c = I(r, 2);
					G(c), L((e, t) => {
						H(i, `${e ?? ""} `), H(a, `${t ?? ""}%`), K(c, R(o).props.parallax ?? .3);
					}, [() => J("lbl.parallaxStrength"), () => Math.round((R(o).props.parallax ?? 0) * 100)]), z("input", c, (e) => ar(t(), s, "parallax", Number(e.target.value))), V(e, n);
				};
				U(re, (e) => {
					(R(o).props.parallax ?? 0) > 0 && e(E);
				}), L((e, t, n, a, s, u, p, m, v, S, re, E, ie, ae) => {
					q(r, "title", e), H(i, `${t ?? ""} `), q(c, "title", n), H(l, `${a ?? ""} `), q(d, "title", s), H(f, `${u ?? ""} `), H(h, `${p ?? ""} `), H(g, `${m ?? ""}%`), K(_, R(o).props.x ?? .5), H(y, `${v ?? ""} `), H(b, `${S ?? ""}%`), K(x, R(o).props.y ?? .5), H(C, `${re ?? ""} `), H(w, `${E ?? ""}%`), K(T, R(o).props.opacity ?? 1), q(ee, "title", ie), Ni(te, (R(o).props.parallax ?? 0) > 0), H(ne, ` ${ae ?? ""}`);
				}, [
					() => J("tip.bg.videoFile"),
					() => R(o).props.src ? J("ui.changeVideo") : J("ui.chooseVideo"),
					() => J("tip.bg.poster"),
					() => R(o).props.poster ? J("ui.changeImage") : J("ui.choosePoster"),
					() => J("tip.bg.fit"),
					() => J("lbl.imageFit"),
					() => J("lbl.horizontal"),
					() => Math.round((R(o).props.x ?? .5) * 100),
					() => J("lbl.vertical"),
					() => Math.round((R(o).props.y ?? .5) * 100),
					() => J("lbl.strength"),
					() => Math.round((R(o).props.opacity ?? 1) * 100),
					() => J("tip.bg.parallax"),
					() => J("lbl.parallax")
				]), z("change", a, (e) => Pr(t(), s, e)), z("change", u, (e) => Fr(t(), s, e)), z("input", _, (e) => ar(t(), s, "x", Number(e.target.value))), z("input", x, (e) => ar(t(), s, "y", Number(e.target.value))), z("input", T, (e) => ar(t(), s, "opacity", Number(e.target.value))), z("change", te, (e) => ar(t(), s, "parallax", e.target.checked ? .3 : 0)), V(e, n);
			};
			U(h, (e) => {
				R(o).type === "color" ? e(g) : R(o).type === "gradient" ? e(v, 1) : R(o).type === "glow" ? e(y, 2) : R(o).type === "grain" ? e(b, 3) : R(o).type === "pattern" ? e(x, 4) : R(o).type === "image" ? e(S, 5) : R(o).type === "slideshow" ? e(C, 6) : R(o).type === "video" && e(w, 7);
			}), D(c), L((e, t, n) => {
				q(f, "title", e), q(p, "title", t), p.disabled = s === a().length - 1, q(m, "title", n);
			}, [
				() => J("hint.bg.order"),
				() => J("hint.bg.order"),
				() => J("tip.bg.removeLayer")
			]), z("click", f, () => rr(t(), s, -1)), z("click", p, () => rr(t(), s, 1)), z("click", m, () => nr(t(), s)), V(e, c);
		});
		var c = I(s, 2), l = N(c), u = I(l);
		{
			let e = /* @__PURE__ */ A(() => _.map(([e, t]) => [e, t.labelKey ? J(t.labelKey) : t.label]));
			Y(u, {
				get value() {
					return R(er);
				},
				get options() {
					return R(e);
				},
				onchange: (e) => M(er, e, !0)
			});
		}
		D(c);
		var d = I(c, 2), p = F(d, !0);
		L((e, t) => {
			H(l, `${e ?? ""} `), H(p, t);
		}, [() => J("lbl.newLayer"), () => J("ui.addLayer")]), z("click", d, () => tr(t(), R(er))), V(e, o);
	}, o = (e, t = f, n = f) => {
		var r = Vr();
		ni(P(r), 17, n, Qr, (e, r, i) => {
			var a = Gy(), o = N(a);
			G(o);
			var s = I(o, 2), c = N(s);
			c.disabled = i === 0, W(c, () => X.up, !0), D(c);
			var l = I(c, 2);
			W(l, () => X.down, !0), D(l);
			var u = I(l, 2);
			W(u, () => X.cross, !0), D(u), D(s);
			var d = I(s, 2), f = N(d);
			{
				let e = /* @__PURE__ */ A(() => R(r).page ?? "__href"), n = /* @__PURE__ */ A(() => J("tip.linkTarget")), a = /* @__PURE__ */ A(() => [...R(k).pages.map((e) => [e.id, e.title]), ["__href", J("opt.linkHref")]]);
				Y(f, {
					get value() {
						return R(e);
					},
					get title() {
						return R(n);
					},
					get options() {
						return R(a);
					},
					onchange: (e) => Ol(t(), i, e)
				});
			}
			D(d);
			var p = I(d, 2), m = (e) => {
				var n = Wy();
				G(n), L((e, t) => {
					K(n, R(r).href ?? ""), q(n, "placeholder", e), q(n, "title", t);
				}, [() => J("ph.hrefAnchor"), () => J("tip.hrefAnchor")]), z("change", n, (e) => kl(t(), i, e.target.value)), V(e, n);
			};
			U(p, (e) => {
				R(r).page || e(m);
			}), D(a), L((e, t) => {
				K(o, R(r).label), q(o, "title", e), l.disabled = i === n().length - 1, q(u, "title", t);
			}, [() => J("tip.linkLabel"), () => J("tip.removeLink")]), z("input", o, (e) => Dl(t(), i, e.target.value)), z("click", c, () => El(t(), i, -1)), z("click", l, () => El(t(), i, 1)), z("click", u, () => Tl(t(), i)), V(e, a);
		}), V(e, r);
	}, s = (e) => `<svg width="40" height="26" viewBox="0 0 40 26" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${e}</svg>`, c = {
		bar: s("<rect x=\"1\" y=\"1\" width=\"38\" height=\"7\" rx=\"1\"/><rect x=\"1\" y=\"11\" width=\"38\" height=\"14\" rx=\"1\" stroke-opacity=\"0.35\"/>"),
		floating: s("<rect x=\"5\" y=\"2\" width=\"30\" height=\"7\" rx=\"3.5\"/><rect x=\"1\" y=\"11\" width=\"38\" height=\"14\" rx=\"1\" stroke-opacity=\"0.35\"/>"),
		"floating-square": s("<rect x=\"5\" y=\"2\" width=\"30\" height=\"7\"/><rect x=\"1\" y=\"11\" width=\"38\" height=\"14\" rx=\"1\" stroke-opacity=\"0.35\"/>"),
		"floating-tab": s("<path d=\"M5 1h30v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z\"/><rect x=\"1\" y=\"11\" width=\"38\" height=\"14\" rx=\"1\" stroke-opacity=\"0.35\"/>"),
		"side-left": s("<rect x=\"1\" y=\"1\" width=\"9\" height=\"24\" rx=\"1\"/><rect x=\"13\" y=\"1\" width=\"26\" height=\"24\" rx=\"1\" stroke-opacity=\"0.35\"/>"),
		"side-right": s("<rect x=\"30\" y=\"1\" width=\"9\" height=\"24\" rx=\"1\"/><rect x=\"1\" y=\"1\" width=\"26\" height=\"24\" rx=\"1\" stroke-opacity=\"0.35\"/>")
	}, l = {
		"": s("<rect x=\"1\" y=\"4\" width=\"38\" height=\"18\" rx=\"1\" stroke-opacity=\"0.35\"/>"),
		bottom: s("<rect x=\"1\" y=\"4\" width=\"38\" height=\"18\" rx=\"1\" stroke-opacity=\"0.35\"/><path d=\"M1 22h38\" stroke-width=\"2.5\"/>"),
		top: s("<rect x=\"1\" y=\"4\" width=\"38\" height=\"18\" rx=\"1\" stroke-opacity=\"0.35\"/><path d=\"M1 4h38\" stroke-width=\"2.5\"/>"),
		both: s("<rect x=\"1\" y=\"4\" width=\"38\" height=\"18\" rx=\"1\" stroke-opacity=\"0.35\"/><path d=\"M1 4h38M1 22h38\" stroke-width=\"2.5\"/>"),
		all: s("<rect x=\"1\" y=\"4\" width=\"38\" height=\"18\" rx=\"1\" stroke-width=\"2.5\"/>")
	}, u = (e) => `<svg width="48" height="34" viewBox="0 0 48 34" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${e}</svg>`, d = {
		card: u("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><rect x=\"10\" y=\"6\" width=\"28\" height=\"24\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.18\"/><path d=\"M15 13h18M15 19h14M15 25h16\" stroke-opacity=\"0.8\"/>"),
		flat: u("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><rect x=\"1\" y=\"6\" width=\"46\" height=\"24\" fill=\"currentColor\" fill-opacity=\"0.12\" stroke=\"none\"/><path d=\"M15 13h18M15 19h14M15 25h16\" stroke-opacity=\"0.8\"/>"),
		pills: u("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><rect x=\"10\" y=\"7\" width=\"28\" height=\"6\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.35\" stroke=\"none\"/><rect x=\"10\" y=\"16\" width=\"28\" height=\"6\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.2\" stroke=\"none\"/><rect x=\"10\" y=\"25\" width=\"28\" height=\"6\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.2\" stroke=\"none\"/>"),
		lines: u("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><path d=\"M12 12h24M12 21h24M12 30h24\" stroke-opacity=\"0.8\"/>"),
		flyout: u("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><rect x=\"1\" y=\"6\" width=\"46\" height=\"24\" fill=\"currentColor\" fill-opacity=\"0.12\" stroke=\"none\"/><path d=\"M6 13h10M6 19h8M22 13h10M22 19h8M38 13h6M38 19h4\" stroke-opacity=\"0.8\"/>")
	}, p = {
		grid: u("<rect x=\"1\" y=\"1\" width=\"46\" height=\"32\" rx=\"3\" stroke-opacity=\"0.35\"/><rect x=\"6\" y=\"6\" width=\"10\" height=\"10\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><rect x=\"19\" y=\"6\" width=\"10\" height=\"10\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><rect x=\"32\" y=\"6\" width=\"10\" height=\"10\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><path d=\"M7 20h8M20 20h8M33 20h8\" stroke-opacity=\"0.7\"/><path d=\"M6 26h10M19 26h10M32 26h10\" stroke-opacity=\"0.35\"/>"),
		list: u("<rect x=\"1\" y=\"1\" width=\"46\" height=\"32\" rx=\"3\" stroke-opacity=\"0.35\"/><rect x=\"6\" y=\"6\" width=\"7\" height=\"7\" rx=\"2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><rect x=\"6\" y=\"17\" width=\"7\" height=\"7\" rx=\"2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><path d=\"M17 9.5h24M17 20.5h18\" stroke-opacity=\"0.7\"/>"),
		cover: u("<rect x=\"1\" y=\"1\" width=\"46\" height=\"32\" rx=\"3\" stroke-opacity=\"0.35\"/><rect x=\"6\" y=\"6\" width=\"16\" height=\"12\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><rect x=\"26\" y=\"6\" width=\"16\" height=\"12\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><path d=\"M6 14h16M26 14h16\" stroke-opacity=\"0.55\" stroke-width=\"3\"/><path d=\"M6 23h12M26 23h12\" stroke-opacity=\"0.35\"/>")
	}, m = /* @__PURE__ */ j("");
	function g() {
		R(m).trim() && (M(Ta, R(m), !0), M(Ea, null), Ma() !== !1 && M(m, ""));
	}
	let _ = [
		["color", qg],
		["gradient", a_],
		["glow", o_],
		["image", tv],
		["slideshow", Nv],
		["video", Qv],
		["pattern", y_],
		["grain", c_]
	], v = Object.fromEntries(_), y = [
		["purple", J("adminTheme.purple")],
		["well", J("adminTheme.well")],
		["gold", J("adminTheme.gold")],
		["grey", J("adminTheme.grey")],
		["aurora", J("adminTheme.aurora")],
		["dusk", J("adminTheme.dusk")],
		["ember", J("adminTheme.ember")]
	], b = {
		lilla: "purple",
		bronn: "well",
		gull: "gold",
		graa: "grey",
		nordlys: "aurora",
		skumring: "dusk",
		glo: "ember"
	}, x = /* @__PURE__ */ j(sn((() => {
		let e = localStorage.getItem("urd-admin-theme");
		return b[e] ?? e ?? "grey";
	})()));
	Dn(() => {
		document.documentElement.dataset.adminTheme = R(x), localStorage.setItem("urd-admin-theme", R(x)), S();
	});
	function S() {
		let e = getComputedStyle(document.documentElement), t = e.getPropertyValue("--urd-color-accent").trim();
		We?.sendAdminTheme({
			bg: e.getPropertyValue("--urd-color-bg").trim(),
			surface: e.getPropertyValue("--urd-color-surface").trim(),
			accent: t,
			text: e.getPropertyValue("--urd-color-text").trim(),
			"accent-text": C(t)
		});
	}
	function C(e) {
		return Gg(e) == null || (Kg(e, "#ffffff") ?? 0) >= (Kg(e, "#0b0e14") ?? 0) ? "#ffffff" : "#0b0e14";
	}
	let w = /* @__PURE__ */ j(null), T = /* @__PURE__ */ j(null), ee = /* @__PURE__ */ j(!1), te = /* @__PURE__ */ j(""), ne = /* @__PURE__ */ j("info"), re = 0;
	function E(e, t = "info") {
		M(te, e, !0), M(ne, t, !0);
		let n = ++re;
		t === "ok" && setTimeout(() => {
			re === n && (M(te, ""), M(ne, "info"));
		}, 8e3);
	}
	function ie() {
		E(J("status.storageFull"), "error");
	}
	function ae(e, t) {
		try {
			localStorage.setItem(e, t);
		} catch {
			ie();
		}
	}
	let oe = /* @__PURE__ */ j(null), se = /* @__PURE__ */ j(null), ce = /* @__PURE__ */ j(sn({
		size: 16,
		snap: !0
	})), le = /* @__PURE__ */ j(!0), ue = /* @__PURE__ */ j(sn(Xp(typeof window < "u" ? window : null) ?? 1920)), de = "urd-admin-screen";
	function fe() {
		let e = null;
		try {
			e = JSON.parse(localStorage.getItem(de) ?? "null");
		} catch {
			e = null;
		}
		return Zp(e, R(ue));
	}
	let pe = /* @__PURE__ */ j(sn(fe()));
	function me(e) {
		M(pe, Zp({
			...Ge(R(pe)),
			...e
		}, R(ue)), !0);
		try {
			localStorage.setItem(de, JSON.stringify(R(pe)));
		} catch {}
	}
	let he = /* @__PURE__ */ A(() => Qp(R(pe), R(ue))), ge = [
		{
			id: "laptop",
			width: 1280,
			height: null,
			viewport: "desktop"
		},
		{
			id: "tablet",
			width: 810,
			height: null,
			viewport: "desktop"
		},
		{
			id: "mobile",
			width: 390,
			height: null,
			viewport: "mobile"
		}
	], _e = /* @__PURE__ */ A(() => [{
		id: "desktop",
		width: R(he).width,
		height: R(he).height || null,
		viewport: "desktop"
	}, ...ge]);
	function ve(e) {
		let t = om(R(po), R(mo), e.width).width;
		return J(e.id === "desktop" ? R(pe).mode === "own" ? "tip.view.desktop" : e.height ? "tip.view.desktopSizeH" : "tip.view.desktopSize" : `tip.view.${e.id}`, {
			w: e.width,
			h: e.height ?? 0,
			c: t
		});
	}
	let ye = /* @__PURE__ */ j("desktop"), be = /* @__PURE__ */ A(() => R(_e).find((e) => e.id === R(ye)) ?? R(_e)[0]), xe = /* @__PURE__ */ A(() => R(be).viewport === "mobile" || R(be).width <= (R(k)?.breakpoints?.mobile ?? 640) ? "mobile" : "desktop"), Se = /* @__PURE__ */ j(null), Ce = /* @__PURE__ */ j(0), we = /* @__PURE__ */ j(0), Te = /* @__PURE__ */ j("fit"), Ee = /* @__PURE__ */ j(1), De = /* @__PURE__ */ A(() => am(R(po), R(mo))), ke = /* @__PURE__ */ A(() => R(be).width), Ae = /* @__PURE__ */ A(() => R(be).height ?? 0), je = /* @__PURE__ */ A(() => R(Te) === "manual" ? R(Ee) : Up(R(Ce), R(ke), "fit", R(we), R(Ae)));
	function Me(e) {
		let t = Math.min(400, Math.max(10, (Math.round(Math.round(R(je) * 100) / 10) + e) * 10));
		M(Ee, t / 100), M(Te, "manual");
	}
	let Ne = /* @__PURE__ */ A(() => R(Ae) > 0 ? R(Ae) : R(je) > 0 ? R(we) / R(je) : R(we)), Pe = /* @__PURE__ */ A(() => R(ke) * R(je)), Fe = /* @__PURE__ */ A(() => R(Ae) > 0 ? R(Ae) * R(je) : R(we)), Ie = /* @__PURE__ */ A(() => R(Pe) > R(Ce) + 1 || R(Fe) > R(we) + 1);
	Dn(() => {
		let e = () => We?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), Dn(() => {
		let e = R(xe);
		We?.sendViewport(e);
	}), Dn(() => {
		let e = R(je);
		We?.sendZoom(e);
	}), Dn(() => {
		let e = () => {
			M(ue, Xp(window) ?? R(ue), !0);
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}), Dn(() => {
		let e = R(Se);
		if (!e || typeof ResizeObserver > "u") return;
		let t = () => {
			M(Ce, e.clientWidth, !0), M(we, e.clientHeight, !0);
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	});
	let Le = /* @__PURE__ */ j(0);
	function Re() {
		M(Le, O?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function ze() {
		let e = O?.data.sections.find((e) => e.responsive?.mobile?.attention?.needed);
		M(ye, "mobile"), e && setTimeout(() => We?.sendScrollSection(e.id), 0);
	}
	function Be(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			it("layout");
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
			}, He(t, "layout-changed"), e.sectionId === R(Rn) && M(Bn, e.minHeight, !0), R(Gt)?.sectionId === e.sectionId && qt(), O.save(), Xe(), We?.sendSection(R(T), t);
		}
	}
	function Ve(e) {
		return e?.blocks?.some((e) => e.frames?.mobile) ?? !1;
	}
	function He(e, t) {
		e && Ve(e) && (e.responsive?.mobile?.attention?.needed || (e.responsive = {
			...e.responsive ?? {},
			mobile: {
				...e.responsive?.mobile ?? { mode: "auto" },
				attention: {
					needed: !0,
					reason: t,
					since: (/* @__PURE__ */ new Date()).toISOString()
				}
			}
		}, Re(), We?.sendAttention(e.id, !0)));
	}
	let O = null, Ue = null, We = null, k = /* @__PURE__ */ j(null);
	function Ke() {
		M(k, Ue.data, !0), Ue.replace(R(k));
	}
	function qe() {
		We?.sendSite(Ge(R(k)));
	}
	let Je = /* @__PURE__ */ new Set(), Ye = () => R(k).pages.find((e) => e.id === R(T));
	function Xe() {
		let e = R(k)?.pages?.some((e) => !Je.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = Bs?.hasDraft() || Object.values(Vs).some((e) => e.hasDraft()), n = Xs?.hasDraft() || Object.values(Zs).some((e) => e.hasDraft());
		M(ee, e || O?.hasDraft() && !Je.has(R(T)) || Ue?.hasDraft() || Lc?.hasDraft() || t || n || !1, !0);
	}
	let Ze = [], tt = [], nt = null;
	function rt() {
		return JSON.stringify({
			pageId: R(T),
			page: O.data,
			site: Ue.data,
			collectionsIndex: Us ? Bs.data : null,
			collections: Us ? Object.fromEntries(Object.entries(Vs).map(([e, t]) => [e, t.data])) : {},
			templatesIndex: $s ? Xs.data : null,
			templates: $s ? Object.fromEntries(Object.entries(Zs).map(([e, t]) => [e, t.data])) : {},
			plugins: Lc?.data ?? null
		});
	}
	function it(e) {
		(e !== nt || !e.startsWith("edit:") && !e.startsWith("grid:")) && (Ze.push(rt()), Ze.length > 50 && Ze.shift(), tt.length = 0, nt = e);
	}
	function at(e) {
		let { pageId: t, page: n, site: r, collectionsIndex: i, collections: a, templatesIndex: o, templates: s, plugins: c } = JSON.parse(e);
		if (Ue.replace(r), Ke(), Ue.save(), M(ce, {
			snap: !0,
			...R(k).grid
		}, !0), qe(), ot(i, a ?? {}), st(o, s ?? {}), ct(c), t && t !== R(T) && R(k).pages.some((e) => e.id === t)) {
			ae(`urd-draft-${t}`, JSON.stringify(n)), ra(t, { keepHistory: !0 }), Xe();
			return;
		}
		O.replace(n), O.save(), Xe(), Re(), qt(), Kn(O.data.sections.find((e) => e.id === R(Rn))), R(k).pages.some((e) => e.id === R(T)) ? We?.sendPage(R(T), O.data) : ra(R(k).pages[0].id, { keepHistory: !0 });
	}
	function ot(e, t) {
		if (Bs && e && JSON.stringify({
			index: Bs.data,
			collections: Object.fromEntries(Object.entries(Vs).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			collections: t
		})) {
			Bs.replace(e), Bs.save();
			for (let e of Object.keys(Vs)) e in t || (localStorage.removeItem(`urd-draft-collection-${e}`), localStorage.removeItem(`urd-draft-samling-${e}`), delete Vs[e]);
			for (let [e, n] of Object.entries(t)) {
				if (!Vs[e]) {
					let t = Hs[e] ?? null;
					Vs[e] = ga(`urd-draft-collection-${e}`, () => t, ie, `urd-draft-samling-${e}`);
				}
				Vs[e].replace(n), Vs[e].save();
			}
			M(Ws, [...e.samlinger ?? []], !0), R(Ks) && !R(Ws).includes(R(Ks)) && M(Ks, null), cc();
		}
	}
	function st(e, t) {
		if (Xs && e && JSON.stringify({
			index: Xs.data,
			templates: Object.fromEntries(Object.entries(Zs).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			templates: t
		})) {
			Xs.replace(e), Xs.save();
			for (let e of Object.keys(Zs)) e in t || (localStorage.removeItem(`urd-draft-template-${e}`), localStorage.removeItem(`urd-draft-mal-${e}`), delete Zs[e]);
			for (let [e, n] of Object.entries(t)) Zs[e] || (Zs[e] = ga(`urd-draft-template-${e}`, () => Qs[e] ?? null, ie, `urd-draft-mal-${e}`)), Zs[e].replace(n), Zs[e].save();
			M(Z, [...e.maler ?? []], !0), Xe(), tc();
		}
	}
	function ct(e) {
		Lc && e && JSON.stringify(Lc.data) !== JSON.stringify(e) && (Lc.replace(e), Lc.save(), Yc(), ul());
	}
	function lt() {
		Ze.length && (yn(), tt.push(rt()), at(Ze.pop()), nt = null, E(J("status.undone")));
	}
	function ut() {
		tt.length && (yn(), Ze.push(rt()), at(tt.pop()), nt = null, E(J("status.redone")));
	}
	function pt(e) {
		R(Yt) && (e.target instanceof Element && e.target.closest(".block-menu") || M(Yt, null));
	}
	function mt(e) {
		if (e.key === "Escape" && R(Yt)) {
			M(Yt, null);
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
			].includes(t.type)) || !R(Gt) || R(xe) === "mobile") return;
			e.preventDefault(), We?.sendDuplicate();
			return;
		}
		if (t !== "z" && t !== "y") return;
		let n = e.target;
		n instanceof HTMLElement && (n.isContentEditable || n.tagName === "TEXTAREA" || n.tagName === "INPUT" && ![
			"number",
			"checkbox",
			"range",
			"color"
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? ut() : lt());
	}
	async function ht() {
		M(w, gh(await (await fetch("/content/site.json")).json()), !0), Ue = ga("urd-draft-site", () => R(w), ie), (Ue.data.schemaVersion ?? 1) > 4 && (console.warn(`Urd: the site draft has schemaVersion ${Ue.data.schemaVersion} (the engine has 4) and is discarded`), Ue.replace(Ge(R(w)))), Ue.replace(gh(Ue.data)), Ue.save(), Ke(), M(ce, {
			snap: !0,
			...R(k).grid
		}, !0), await ra(new URLSearchParams(location.search).get("page") ?? R(k).pages[0].id), await tl(), await sc(), await ec(), await ki(), R(se) && ji(), Wt(), R(k).site.setup === !0 && !localStorage.getItem("urd-setup-done") && (M(St, R(k).site.title, !0), M(Ct, R(k).theme.tokens.color.accent, !0), M(wt, R(k).theme.tokens.color.bg, !0), M(xt, !0));
	}
	let gt = /* @__PURE__ */ j(null);
	function _t({ title: e, lines: t = [], okLabel: n = J("confirm.ok"), cancelLabel: r = J("confirm.cancel") }) {
		return new Promise((i) => {
			M(gt, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function vt({ title: e, lines: t = [], value: n = "", placeholder: r = "", okLabel: i = J("confirm.ok"), cancelLabel: a = J("confirm.cancel") }) {
		return new Promise((o) => {
			M(gt, {
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
	function yt(e) {
		R(gt)?.resolve(R(gt).prompt ? e ? R(gt).value : null : e), M(gt, null);
	}
	let bt = !1;
	Dn(() => {
		if (!R(gt)) return;
		let e = (e) => {
			e.key === "Escape" && (e.stopPropagation(), yt(!1));
		};
		return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
	});
	let xt = /* @__PURE__ */ j(!1), St = /* @__PURE__ */ j(""), Ct = /* @__PURE__ */ j("#7c5cff"), wt = /* @__PURE__ */ j("#0b0e14");
	function Tt() {
		localStorage.setItem("urd-setup-done", "1"), M(xt, !1);
	}
	function Et() {
		let e = R(St).trim();
		e && (wa("setup", () => {
			R(k).site.title = e, R(k).nav.logo = {
				type: "text",
				value: e
			}, R(k).theme.tokens.color.accent = R(Ct), R(k).theme.tokens.color.bg = R(wt), delete R(k).site.setup;
		}), Tt(), E(J("status.setupDone"), "ok"));
	}
	let Dt = "urd-admin-panels", Ot = "urd-admin-panel-open", kt = /* @__PURE__ */ j(sn(localStorage.getItem(Dt) === "reset" ? "reset" : "remember"));
	function At(e) {
		M(kt, e === "reset" ? "reset" : "remember", !0), R(kt) === "reset" ? localStorage.setItem(Dt, "reset") : localStorage.removeItem(Dt);
	}
	let jt = /* @__PURE__ */ j(sn(R(kt) === "reset" ? null : localStorage.getItem(Ot))), Mt = [
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
	], Nt = [
		"rail.thisPage",
		"rail.site",
		"rail.system"
	], Pt = Object.fromEntries(Mt.flat().map((e) => [e, J(`panel.${e}`)]));
	R(jt) && !Pt[R(jt)] && M(jt, null), Dn(() => {
		if (R(kt) === "reset") {
			localStorage.removeItem(Ot);
			return;
		}
		R(jt) ? localStorage.setItem(Ot, R(jt)) : localStorage.removeItem(Ot);
	});
	let Ft = {
		pages: ["hint.pages.drafts"],
		blocks: ["hint.blocks.intro"],
		grid: ["hint.grid.intro", "hint.grid.section"],
		collections: ["hint.collections.intro"],
		plugins: ["hint.plugins.intro"],
		history: ["hint.history.intro"]
	}, It = [
		["se", "Davvisámegiella"],
		["en-GB", "English (UK)"],
		["nb", "Norsk bokmål"],
		["nn", "Norsk nynorsk"],
		["tr", "Türkçe"]
	], Lt = (e) => [...e].sort((e, t) => e[1].localeCompare(t[1]));
	function Rt(e, t) {
		let n = [];
		for (let r of e) for (let e of Vc[r]?.languages ?? []) e?.[t] === !0 && typeof e.code == "string" && typeof e.name == "string" && e.name && (It.some(([t]) => t === e.code) || n.some(([t]) => t === e.code) || n.push([e.code, e.name]));
		return n;
	}
	function zt() {
		let e = Lt([...It, ...Rt(R(Kc), "admin")]);
		return Vt === "auto" || e.some(([e]) => e === Vt) ? e : [[Vt, Vt], ...e];
	}
	let Bt = () => Rt(R(Bc)?.enabled ?? [], "site"), Vt = localStorage.getItem("urd-admin-lang") ?? "auto";
	function Ht(e) {
		e !== Vt && (e === "auto" ? localStorage.removeItem("urd-admin-lang") : localStorage.setItem("urd-admin-lang", e), location.reload());
	}
	function Ut(e) {
		M(jt, R(jt) === e ? null : e, !0), Wt();
	}
	function Wt() {
		R(jt) === "history" && Ri(), R(jt) === "update" && !R(Yi) && Zi();
	}
	let Gt = /* @__PURE__ */ j(null);
	function Kt(e, t) {
		let n = O?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function qt() {
		if (!R(Gt)) return;
		let { block: e } = Kt(R(Gt).sectionId, R(Gt).blockId);
		if (!e) {
			M(Gt, null);
			return;
		}
		M(Gt, {
			sectionId: R(Gt).sectionId,
			blockId: R(Gt).blockId,
			type: e.type,
			decor: !!e.decor,
			hideMobile: !!e.hideMobile,
			fit: e.fit === "shrink" || e.fit === "both" ? e.fit : void 0,
			fitMin: typeof e.fitMin == "number" ? e.fitMin : void 0,
			size: typeof e.size == "number" ? e.size : void 0,
			sizeMin: typeof e.sizeMin == "number" ? e.sizeMin : void 0,
			sizeMax: typeof e.sizeMax == "number" ? e.sizeMax : void 0,
			height: e.height ? JSON.parse(JSON.stringify(e.height)) : null,
			props: JSON.parse(JSON.stringify(e.props)),
			frame: { ...e.frames.desktop },
			animation: e.animation ? JSON.parse(JSON.stringify(e.animation)) : null,
			hover: e.hover ? JSON.parse(JSON.stringify(e.hover)) : null,
			sticky: e.sticky ? JSON.parse(JSON.stringify(e.sticky)) : null
		}, !0);
	}
	function Jt(e) {
		if (M(Yt, null), !e.blockId) {
			M(Gt, null);
			return;
		}
		M(Gt, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), e.sectionId && M(Rn, e.sectionId, !0), qt();
	}
	let Yt = /* @__PURE__ */ j(null);
	function Xt() {
		_s(R(Se)?.getBoundingClientRect().left ?? 0);
	}
	Dn(() => {
		if (R(Yt)) return Xt(), window.addEventListener("resize", Xt), () => window.removeEventListener("resize", Xt);
	});
	let Zt = /* @__PURE__ */ j(null);
	Dn(() => {
		R(Zt)?.mode === "set" && R(Gt)?.type !== "calendar" && M(Zt, null);
	});
	let Qt = null;
	Dn(() => {
		let e = R(Gt)?.blockId ?? null;
		e !== Qt && (Qt = e, ms.menuQuery = "", ms.propsQuery = "");
	}), Dn(() => {
		R(Yt) || (ms.menuQuery = "");
	});
	let $t = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	function en(e) {
		if (Jt(e), !R(Gt)) return;
		Xt();
		let t = Math.min(ms.wide && ms.room >= 740 ? 740 : 400, window.innerWidth - 16), n = R(oe)?.getBoundingClientRect();
		if (!n) return;
		let r = n.left + R(je) * e.rect.right + 12;
		r + t > window.innerWidth - 8 && (r = Math.max(8, n.left + R(je) * e.rect.left - t - 12));
		let i = window.innerHeight - Math.min(window.innerHeight * .7, 560) - 8, a = Math.min(Math.max(8, n.top + R(je) * e.rect.top), Math.max(8, i));
		M(Yt, {
			left: r,
			top: a
		}, !0);
	}
	function tn(e, t) {
		let { section: n, block: r } = Kt(R(Gt)?.sectionId, R(Gt)?.blockId);
		r && (e && it(e), t(r, n), He(n, "block-edited"), O.save(), Xe(), We?.sendSection(R(T), n), qt(), pn(n.id, r));
	}
	function nn(e, t) {
		tn(`edit:${R(Gt).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function rn(e, t) {
		tn(`edit:${R(Gt).blockId}:${e}`, (e) => {
			Object.assign(e.props, t);
		});
	}
	function an() {
		return [...R(k).pages.map((e) => [e.id, e.title]), ["__href", J("opt.externalLink")]];
	}
	function on(e) {
		let t = e === "__href" ? null : e;
		tn(`edit:${R(Gt).blockId}`, (e) => {
			e.props.page = t, t && (e.props.href = null);
		});
	}
	function ln() {
		We?.sendOpenImageEditor(R(Gt).blockId), M(Yt, null);
	}
	let un = /* @__PURE__ */ new Map(), dn = /* @__PURE__ */ new Map(), fn = 0;
	function pn(e, t) {
		if (_n(e, t), R(xe) !== "desktop" || !Al(t)) return;
		clearTimeout(un.get(t.id));
		let n = ++fn;
		dn.set(t.id, n), un.set(t.id, setTimeout(() => We?.sendFitBlock(e, t.id, n), 60));
	}
	let mn = /* @__PURE__ */ new Map(), hn = null, gn = "";
	function _n(e, t) {
		if (!jl.has(t.type) || !Al(t)) return;
		hn ??= Xo({
			title: () => J("canvas.phoneMeasure"),
			prepare: (e, t) => {
				let n = Ge(R(Bc))?.enabled ?? [], r = JSON.stringify(n);
				(t || r !== gn) && e({
					type: "urd-plugins",
					enabled: n
				}), gn = r, e({
					type: "urd-site",
					site: Ge(R(k))
				}), e({
					type: "urd-collections",
					collections: Ge(R(Gs)) ?? {}
				});
			},
			onHeight: vn
		});
		let n = ++fn;
		mn.set(t.id, n), hn.request(R(T), Ge(O.data), e, t.id, n);
	}
	function vn(e, t, n, r) {
		if (e !== R(T) || r !== mn.get(t)) return;
		let i = O.data.sections.flatMap((e) => e.blocks).find((e) => e.id === t), a = Math.round(n);
		i && a > 0 && i.mobileHeight !== a && (i.mobileHeight = a, O.save(), Xe());
	}
	function yn() {
		for (let e of un.values()) clearTimeout(e);
		un.clear(), dn.clear(), mn.clear(), hn?.cancel();
	}
	function bn(e) {
		let t = pc(e), n = t.view === "next" ? {
			nextCount: R(Gt).props.nextCount ?? 3,
			laterCount: R(Gt).props.laterCount ?? 3
		} : {}, r = t.id === "plain" && ![
			"list",
			"cards",
			"month",
			"agenda",
			"next"
		].includes(mc(R(Gt).props)) ? { view: "list" } : {};
		rn("design", {
			design: t.id === "plain" ? void 0 : t.id,
			...t.view ? { view: t.view } : {},
			...r,
			...n
		});
	}
	function xn(e) {
		tn(`edit:${R(Gt).blockId}:fit`, (t) => {
			e === "shrink" || e === "both" ? (t.fit = e, t.fitMin ??= .6) : (delete t.fit, delete t.fitMin);
		});
	}
	function Sn(e) {
		tn(`edit:${R(Gt).blockId}:fitMin`, (t) => {
			t.fitMin = e;
		});
	}
	let Cn = null;
	function wn(e) {
		tn(`edit:${R(Gt).blockId}:size`, (t, n) => {
			Cn?.blockId !== t.id && (Cn = {
				blockId: t.id,
				size: Ll(t),
				frame: { ...t.frames.desktop },
				ys: new Map(n.blocks.filter((e) => e.frames?.desktop).map((e) => [e.id, e.frames.desktop.y]))
			}), e === 1 ? (delete t.size, delete t.sizeMin, delete t.sizeMax) : t.size = e;
			let r = Cn;
			for (let e of n.blocks) e.id !== t.id && e.frames?.desktop && r.ys.has(e.id) && (e.frames.desktop = {
				...e.frames.desktop,
				y: r.ys.get(e.id)
			});
			t.frames.desktop = { ...r.frame };
			let i = Ll(t) / r.size;
			if (i === 1) return;
			let a = {
				...r.frame,
				w: Math.min(Math.round(r.frame.w * i * 100) / 100, Math.round((100 - r.frame.x) * 100) / 100)
			};
			if (!Al(t)) {
				a.h = Math.max(1, Math.round(r.frame.h * i));
				for (let [e, r] of Bl(n.blocks, t.id, a.h)) {
					let t = n.blocks.find((t) => t.id === e);
					t?.frames?.desktop && (t.frames.desktop = {
						...t.frames.desktop,
						y: r
					});
				}
			}
			t.frames.desktop = a;
		});
	}
	function Tn(e, t) {
		let n = e === "sizeMin" ? Il.minDefault : Il.maxDefault;
		tn(`edit:${R(Gt).blockId}:${e}`, (r) => {
			let i = Math.round(Number(t));
			Number.isFinite(i) && i > 0 && i !== n ? r[e] = Math.min(Il.max, Math.max(Il.min, i)) : delete r[e];
		});
	}
	function En(e) {
		tn(`edit:${R(Gt).blockId}:height`, (t) => {
			e === "own" ? t.height = { mode: "own" } : delete t.height;
		});
	}
	function On(e) {
		tn(`edit:${R(Gt).blockId}:heightAlign`, (t) => {
			t.height = { mode: "own" }, e !== "top" && (t.height.align = e);
		});
	}
	function kn() {
		let e = R(Gt);
		if (Ml.has(e.type)) return !0;
		if (e.type !== "calendar") return !1;
		let t = pc(e.props.design);
		return !t.module && ["list", "cards"].includes(t.view);
	}
	function An(e, t) {
		Number.isFinite(t) && tn(`edit:frame-${R(Gt).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function jn() {
		let e = O.data.sections.find((e) => e.id === R(Gt)?.sectionId)?.size?.maxWidth, t = typeof R(po) == "number" ? R(po) : 0;
		return e === "full" ? 0 : e ? /^\d+(\.\d+)?px$/.test(e) ? Math.min(parseFloat(e), t || Infinity) : 0 : t;
	}
	function Mn(e) {
		return Math.round(e / 100 * jn());
	}
	function Nn(e, t) {
		let n = jn();
		if (!Number.isFinite(e) || e < 4 || !(n > 0)) return;
		let { x: r, w: i, h: a } = R(Gt).frame, o = Math.max(.5, Math.min(Math.round(e / n * 200) / 2, Math.round((100 - r) * 2) / 2)), s = t ? Math.max(1, Math.round(o / i * a)) : a;
		Number.isFinite(o) && Number.isFinite(s) && tn(`edit:frame-${R(Gt).blockId}:size`, (e) => {
			e.frames.desktop = {
				...e.frames.desktop,
				w: o,
				h: s
			};
		});
	}
	function Pn(e) {
		tn(`edit:${R(Gt).blockId}:boxStyle`, (t) => {
			let n = {
				...t.props.boxStyle ?? {},
				...e
			};
			for (let e of Object.keys(n)) n[e] ?? delete n[e];
			Object.keys(n).length ? t.props.boxStyle = n : delete t.props.boxStyle;
		});
	}
	function Fn(e) {
		tn("decor", (t) => {
			t.decor = e;
		});
	}
	function In(e) {
		let { section: t, block: n } = Kt(R(Gt)?.sectionId, R(Gt)?.blockId);
		n && (it("hide-mobile"), n.hideMobile = e, O.save(), Xe(), We?.sendSection(R(T), t), qt());
	}
	let Ln = {
		text: J("blocks.text"),
		button: J("blocks.button"),
		image: J("blocks.image"),
		shape: J("blocks.shape"),
		video: J("blocks.video"),
		icon: J("blocks.icon"),
		gallery: J("blocks.gallery"),
		faq: J("blocks.faq"),
		collection: J("blocks.collection"),
		timeline: J("blocks.timeline"),
		quote: J("blocks.quote"),
		stats: J("blocks.stats"),
		ribbon: J("blocks.ribbon"),
		table: J("blocks.table"),
		share: J("blocks.share"),
		countdown: J("blocks.countdown"),
		audio: J("blocks.audio"),
		product: J("blocks.product"),
		cart: J("blocks.cart"),
		checkout: J("blocks.checkout"),
		map: J("blocks.map"),
		form: J("blocks.form"),
		calendar: J("blocks.calendar")
	}, Rn = /* @__PURE__ */ j(null), zn = /* @__PURE__ */ j(null), Bn = /* @__PURE__ */ j(""), Vn = /* @__PURE__ */ j(sn([])), Hn = /* @__PURE__ */ j(null), Un = /* @__PURE__ */ j(null), Wn = /* @__PURE__ */ j(""), Gn = /* @__PURE__ */ j(sn({}));
	function Kn(e) {
		M(zn, e?.grid ? { ...e.grid } : null, !0), M(Bn, e?.size?.minHeight ?? "", !0), M(Vn, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), M(Hn, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0), M(Un, e?.hover ? JSON.parse(JSON.stringify(e.hover)) : null, !0), M(Wn, e?.theme ?? "", !0), M(Gn, e?.divider ? JSON.parse(JSON.stringify(e.divider)) : {}, !0);
	}
	let qn = /* @__PURE__ */ j(null), Jn = sn({});
	function Yn() {
		try {
			let e = ((R(oe)?.contentDocument)?.querySelector(`.urd-section[data-section-id="${R(Rn)}"]`))?.getBoundingClientRect();
			M(qn, e && e.width ? {
				w: e.width,
				h: e.height
			} : null, !0);
		} catch {
			M(qn, null);
		}
	}
	Dn(() => {
		R(Rn), R(Vn), requestAnimationFrame(() => requestAnimationFrame(Yn));
	}), Dn(() => {
		let e = R(oe);
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(() => Yn());
		return t.observe(e), () => t.disconnect();
	}), Dn(() => {
		for (let e of R(Vn)) {
			let t = e?.props?.src;
			if (e?.type === "image" && t && !Jn[t]) {
				let e = new Image();
				e.onload = () => {
					Jn[t] = {
						w: e.naturalWidth,
						h: e.naturalHeight
					};
				}, e.src = t;
			}
		}
	});
	function Xn(e) {
		$n("section-theme", (t) => {
			e ? t.theme = e : delete t.theme;
		});
	}
	function Zn(e) {
		let t = R(Zr), n = (e) => e.replaceAll("var(--urd-base-bg)", t.bg).replaceAll("var(--urd-base-surface)", t.surface).replaceAll("var(--urd-base-text)", t.text).replaceAll("var(--urd-base-accent)", t.accent).replaceAll("var(--urd-base-accent-text)", t["accent-text"] ?? C(Zu(t.accent ?? "#000000", t))), r = Wg(e);
		return {
			bg: r["--urd-color-bg"] ? n(r["--urd-color-bg"]) : t.bg,
			surface: r["--urd-color-surface"] ? n(r["--urd-color-surface"]) : t.surface,
			text: r["--urd-color-text"] ? n(r["--urd-color-text"]) : t.text,
			accent: r["--urd-color-accent"] ? n(r["--urd-color-accent"]) : t.accent
		};
	}
	function Qn(e) {
		M(Rn, e.sectionId, !0), Kn(O?.data.sections.find((t) => t.id === e.sectionId));
	}
	function $n(e, t) {
		let n = O.data.sections.find((e) => e.id === R(Rn));
		n && (it(e), t(n), O.save(), Xe(), We?.sendSection(R(T), n), Kn(n));
	}
	let er = /* @__PURE__ */ j("color");
	function tr(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background ??= {
				version: 1,
				layers: []
			}, e.background.layers.push({
				type: t,
				version: v[t].version ?? 1,
				props: v[t].defaults()
			});
		});
	}
	function nr(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers.splice(t, 1), e.background.layers.length || delete e.background;
		});
	}
	function rr(e, t, n) {
		let r = t + n;
		e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers;
			r < 0 || r >= n.length || ([n[t], n[r]] = [n[r], n[t]]);
		});
	}
	function ir(e, t, n) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${Object.keys(n).join("+")}`, (e) => {
			Object.assign(e.background.layers[t].props, n);
		});
	}
	function ar(e, t, n, r) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e.background.layers[t].props[n] = r;
		});
	}
	function or(e, t, n, r = "xy") {
		e.preventDefault();
		let i = e.currentTarget;
		i.setPointerCapture?.(e.pointerId);
		let a = (e) => {
			let a = i.getBoundingClientRect();
			if (r.includes("x")) {
				let r = Math.min(1, Math.max(0, (e.clientX - a.left) / a.width));
				ar(t, n, "x", Math.round(r * 100) / 100);
			}
			if (r.includes("y")) {
				let r = Math.min(1, Math.max(0, (e.clientY - a.top) / a.height));
				ar(t, n, "y", Math.round(r * 100) / 100);
			}
		};
		a(e);
		let o = () => {
			i.removeEventListener("pointermove", a), i.removeEventListener("pointerup", o), i.removeEventListener("pointercancel", o);
		};
		i.addEventListener("pointermove", a), i.addEventListener("pointerup", o), i.addEventListener("pointercancel", o);
	}
	let sr = (e) => Math.min(4, Math.max(.1, e));
	function cr(e, t, n, r) {
		ar(e, t, "size", sr(Math.round((n + r) * 100) / 100));
	}
	function lr(e, t, n) {
		let r = Number(n);
		Number.isFinite(r) && ar(e, t, "size", sr(r / 100));
	}
	function ur(e, t, n, r) {
		let i = Jn[n.props.src];
		if (!i?.w || !i?.h || !R(qn)?.w || !R(qn)?.h) return;
		let a = R(qn).h * i.w / (R(qn).w * i.h), o = r === "cover" ? Math.max(1, a) : Math.min(1, a);
		(n.props.fit === "tile" || n.props.fit === "repeat") && ar(e, t, "fit", "plain"), ar(e, t, "size", sr(Math.round(o * 100) / 100));
	}
	function dr(e) {
		return e.props;
	}
	function fr(e, t, n, r) {
		e.mutate(n, (e) => {
			r(e.background.layers[t].props);
		});
	}
	function pr(e, t, n, r) {
		fr(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e[n] = r;
		});
	}
	let mr = {
		linear: [
			["none", J("common.none")],
			["pan", J("opt.gradAnim.pan")],
			["pan-loop", J("opt.gradAnim.panLoop")],
			["rotate", J("opt.gradAnim.rotate")]
		],
		radial: [
			["none", J("common.none")],
			["pulse", J("opt.gradAnim.pulse")],
			["orbit", J("opt.gradAnim.orbit")]
		]
	};
	function hr(e, t, n) {
		fr(e, t, e.keyPrefix, (e) => {
			e.kind = n, mr[n].some(([t]) => t === (e.animation ?? "none")) || (e.animation = "none");
		});
	}
	function gr(e, t, n, r) {
		fr(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-stop${n}`, (e) => {
			e.stops[n] = {
				...e.stops[n],
				...r
			};
		});
	}
	function _r(e, t) {
		fr(e, t, e.keyPrefix, (e) => {
			let t = Math.round(e.stops.reduce((e, t) => e + (Number(t.share) || 0), 0) / e.stops.length) || 50;
			e.stops.push({
				color: e.stops[e.stops.length - 1]?.color ?? "#ffffff",
				share: t
			});
		});
	}
	function vr(e, t, n) {
		fr(e, t, e.keyPrefix, (e) => {
			e.stops.length > 2 && e.stops.splice(n, 1);
		});
	}
	function yr(e, t, n, r) {
		fr(e, t, e.keyPrefix, (e) => {
			let [t] = e.stops.splice(n, 1);
			e.stops.splice(r, 0, t);
		});
	}
	let xr = /* @__PURE__ */ j(null);
	function Sr(e, t, n, r) {
		if (t.button !== 0) return;
		t.preventDefault();
		let i = t.currentTarget.closest(".bg-layer"), a = t.currentTarget.closest(".grad-stop");
		M(xr, {
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
			M(xr, {
				...R(xr),
				insert: n
			}, !0);
		}, u = () => {
			window.removeEventListener("pointermove", l), window.removeEventListener("pointerup", u), c.remove();
			let t = R(xr);
			if (M(xr, null), !t) return;
			let n = t.insert > t.from ? t.insert - 1 : t.insert;
			n !== t.from && yr(e, t.layer, t.from, n);
		};
		window.addEventListener("pointermove", l), window.addEventListener("pointerup", u);
	}
	function Cr(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].type !== n && (e.background.layers[t] = {
				type: n,
				version: v[n].version ?? 1,
				props: v[n].defaults()
			});
		});
	}
	async function wr(e, t) {
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
	async function Tr(e) {
		let t = await e.text(), n = Qa(t), r = eo(t);
		if (!r) return n;
		let i = await wr(n.dataUrl, r);
		if (!i) return n;
		let a = $a(t, i);
		if (a === t) return n;
		try {
			return Qa(a);
		} catch {
			return n;
		}
	}
	async function Er(e) {
		if (e.type === "image/svg+xml" || /\.svg$/i.test(e.name || "")) return Tr(e);
		let t = await Ya(e);
		return t.animated && t.bytes > 1e6 && E(J("status.animatedLarge", { mb: (t.bytes / 1e6).toFixed(1) }), "error"), t;
	}
	function Dr(e) {
		return e?.code === "animatedTooLarge" ? J("status.animatedTooLarge", {
			mb: (e.bytes / 1e6).toFixed(1),
			max: Math.round(za / 1e6)
		}) : J("status.imageReadError");
	}
	function Or(e, t, n) {
		if (!["video/mp4", "video/webm"].includes(e.type)) {
			E(J(t), "error");
			return;
		}
		if (e.size > 15e6) {
			E(J("status.videoTooLarge", {
				mb: (e.size / 1e6).toFixed(1),
				max: Math.round(Ra / 1e6)
			}), "error");
			return;
		}
		let r = new FileReader();
		r.onload = () => {
			n(String(r.result ?? "")), e.size > 4e6 && E(J("status.videoLarge", { mb: (e.size / 1e6).toFixed(1) }), "error");
		}, r.onerror = () => E(J("status.imageReadError"), "error"), r.readAsDataURL(e);
	}
	function Ar(e) {
		let t = e.target.files?.[0];
		e.target.value = "", t && Or(t, "status.videoFileFormat", (e) => nn("src", e));
	}
	async function Mr(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			nn("poster", (await Er(t)).dataUrl);
		} catch (e) {
			E(Dr(e), "error");
		}
	}
	async function Nr(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			ar(e, t, "src", (await Er(r)).dataUrl);
		} catch (e) {
			E(Dr(e), "error");
		}
	}
	function Pr(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && Or(r, "status.videoFormat", (n) => ar(e, t, "src", n));
	}
	async function Fr(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			ar(e, t, "poster", (await Er(r)).dataUrl);
		} catch (e) {
			E(Dr(e), "error");
		}
	}
	let Ir = sn({}), Lr = (e, t) => `${e.keyPrefix}-${e.keyId}-${t}`, Rr = () => 1 + crypto.getRandomValues(/* @__PURE__ */ new Uint32Array(1))[0] % 1e6;
	async function zr(e, t, n) {
		let r = Lr(e, t);
		Ir[r] = {
			text: J("status.folderChecking"),
			err: !1
		};
		let i = await kv(n.props.folder, n.props.order, { force: !0 });
		Ir[r] = i.photos.length ? {
			text: sa("status.folderFound", i.photos.length, { count: i.photos.length }),
			err: !1
		} : {
			text: ca(i) ?? J("status.folderNone"),
			err: !0
		};
	}
	async function B(e, t, n) {
		let r = [...n.target.files ?? []];
		if (n.target.value = "", !r.length) return;
		E(J("status.compressingImages"));
		let { images: i, failed: a, big: o } = await Nd(r);
		i.length && e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers[t].props;
			n.images ??= [], n.images.push(...i.map(({ src: e }) => ({
				src: e,
				x: .5,
				y: .5
			})));
		}), Pd(i.length, a, o);
	}
	function Hr(e, t, n, r) {
		e.mutate(e.keyPrefix, (e) => {
			let i = e.background.layers[t].props.images, a = n + r;
			a < 0 || a >= i.length || ([i[n], i[a]] = [i[a], i[n]]);
		});
	}
	function Ur(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].props.images.splice(n, 1);
		});
	}
	function Wr(e, t, n, r, i) {
		e.mutate(`edit:${e.keyPrefix}g-${e.keyId}-${t}-${n}-${r}`, (e) => {
			e.background.layers[t].props.images[n][r] = i;
		});
	}
	function Gr(e, t) {
		wa(e, () => {
			R(k).nav.style ??= {}, t(R(k).nav.style);
		});
	}
	let Kr = /* @__PURE__ */ A(() => ({
		mutate: $n,
		keyPrefix: "bg",
		keyId: R(Rn)
	})), qr = {
		mutate: Gr,
		keyPrefix: "navbg",
		keyId: "nav"
	}, Jr = {
		mutate: ml,
		keyPrefix: "footerbg",
		keyId: "footer"
	}, Yr = () => {
		let e = null;
		try {
			e = localStorage.getItem("urd-theme-mode");
		} catch {}
		return Ig(R(k)?.theme?.scheme, e, window.matchMedia("(prefers-color-scheme: dark)").matches);
	}, Xr = /* @__PURE__ */ j("light");
	Dn(() => {
		M(Xr, Yr(), !0);
		let e = window.matchMedia("(prefers-color-scheme: dark)"), t = (e) => {
			e instanceof StorageEvent && e.key && e.key !== "urd-theme-mode" || M(Xr, Yr(), !0);
		};
		return e.addEventListener("change", t), window.addEventListener("storage", t), () => {
			e.removeEventListener("change", t), window.removeEventListener("storage", t);
		};
	});
	let Zr = /* @__PURE__ */ A(() => R(k)?.theme ? Lg(R(k).theme, R(Xr)).color ?? {} : {}), $r = () => Object.entries(R(Zr)), ei = [
		[
			"bg",
			J("palette.bg"),
			J("palette.bgShort")
		],
		[
			"surface",
			J("palette.surface"),
			J("palette.surfaceShort")
		],
		[
			"text",
			J("palette.text"),
			J("palette.textShort")
		],
		[
			"accent",
			J("palette.accent"),
			J("palette.accentShort")
		],
		[
			"accent-text",
			J("palette.accentText"),
			J("palette.accentTextShort")
		]
	], ti = /* @__PURE__ */ A(() => !!R(k)?.theme.alt), ri = /* @__PURE__ */ A(() => R(k)?.theme.alt?.auto === !0), ii = /* @__PURE__ */ A(() => R(k)?.theme.scheme === "dark" ? "dark" : "light"), ai = /* @__PURE__ */ A(() => R(k)?.theme.tokens.color ?? {}), oi = /* @__PURE__ */ A(() => ({
		...R(k)?.theme.tokens.color ?? {},
		...R(k)?.theme.alt?.tokens?.color ?? {}
	}));
	function si(e) {
		return {
			type: e,
			version: ry[e].version,
			props: ry[e].defaults()
		};
	}
	let ci = (e) => !!(e && ry[e.type]?.entrance), li = [["", J("common.none")], ...Object.entries(ry).filter(([, e]) => e.entrance).map(([e, t]) => [e, t.labelKey ? J(t.labelKey) : t.label])], ui = li.filter(([e]) => !ry[e]?.group), di = [["", J("common.none")], ...Object.entries(ry).filter(([, e]) => !e.entrance).map(([e, t]) => [e, t.labelKey ? J(t.labelKey) : t.label])];
	function fi(e) {
		e.animation && !ci(e.animation) && (e.hover ??= e.animation, e.animation = null);
	}
	function pi(e) {
		tn(`edit:anim-${R(Gt).blockId}`, (t) => {
			fi(t), t.animation = e ? si(e) : null;
		}), R(Gt) && We?.sendDemoAnim(R(Gt).sectionId, R(Gt).blockId);
	}
	function mi(e) {
		tn(`edit:hover-${R(Gt).blockId}`, (t) => {
			fi(t), t.hover = e ? si(e) : null;
		});
	}
	function hi(e, t) {
		Number.isFinite(t) && (tn(`edit:anim-${R(Gt).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), R(Gt) && We?.sendDemoAnim(R(Gt).sectionId, R(Gt).blockId));
	}
	function gi(e) {
		$n("section-anim", (t) => {
			fi(t), t.animation = e ? si(e) : null;
		}), We?.sendDemoAnim(R(Rn));
	}
	function _i(e, t, n) {
		$n(`section-divider-${e}-${t}`, (r) => {
			let i = { ...r.divider ?? {} };
			if (t === "shape" && !n) delete i[e];
			else {
				let r = { ...i[e] ?? { shape: "wave" } };
				n === void 0 || n === !1 || n === "" ? delete r[t] : r[t] = n, i[e] = r;
			}
			Object.keys(i).length ? r.divider = i : delete r.divider;
		});
	}
	function yi(e) {
		$n("section-hover", (t) => {
			fi(t), t.hover = e ? si(e) : null;
		});
	}
	function bi(e, t) {
		Number.isFinite(t) && ($n("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), We?.sendDemoAnim(R(Rn)));
	}
	function xi(e, t) {
		$n("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), We?.sendDemoAnim(R(Rn));
	}
	function Si(e) {
		let t = O.data.sections.find((e) => e.id === R(Rn));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		it("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, M(Bn, r, !0), O.save(), Xe(), We?.sendSection(R(T), t);
	}
	function Ci() {
		return O.data.sections.find((e) => e.id === R(Rn)) ?? O.data.sections[0];
	}
	function wi(e) {
		let t = O.data.sections.find((e) => e.id === R(Rn));
		t && (it("grid:section"), t.grid = e ? { ...Ue.data.grid } : null, M(zn, t.grid ? { ...t.grid } : null, !0), O.save(), Xe(), We?.sendSection(R(T), t), R(xa) && We?.sendShowGrid(!0));
	}
	function Ti(e, t) {
		let n = O.data.sections.find((e) => e.id === R(Rn));
		n?.grid && (it("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, M(zn, { ...n.grid }, !0), O.save(), Xe(), We?.sendSection(R(T), n), R(xa) && We?.sendShowGrid(!0));
	}
	function Di(e, t) {
		it("grid:site"), M(ce, {
			...R(ce),
			[e]: t
		}, !0), Ue.data.grid = {
			...Ue.data.grid,
			[e]: t
		}, Ue.save(), Xe(), qe(), R(xa) && We?.sendShowGrid(!0);
	}
	async function ki() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? M(se, await e.json(), !0) : e.status !== 503 && M(se, null);
		} catch {
			M(se, null);
		}
	}
	let Ai = null;
	async function ji() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (Ai = (await e.json()).head ?? null);
		} catch {}
	}
	async function Mi(e) {
		if (!Ai) return await ji(), {
			ok: await _t({
				title: J("confirm.conflictUnknown.title"),
				lines: [J("confirm.conflictUnknown.body"), J("confirm.conflictUnknown.warning")],
				okLabel: J("confirm.publishAnyway"),
				cancelLabel: J("confirm.cancel")
			}),
			head: Ai
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${Ai}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === Ai) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? [J("confirm.conflict.truncated")] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await _t({
				title: J("confirm.conflict.title"),
				lines: [
					J("confirm.conflict.intro"),
					...i.map((e) => `• ${e}`),
					J("confirm.conflict.warning")
				],
				okLabel: J("confirm.publishAnyway"),
				cancelLabel: J("confirm.cancel")
			}),
			head: n
		};
	}
	let Pi = /* @__PURE__ */ j(null), Fi = /* @__PURE__ */ j(""), Ii = /* @__PURE__ */ j(!1);
	async function Ri() {
		M(Fi, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? M(Pi, (await e.json()).commits, !0) : e.status === 401 ? (M(Pi, [], !0), M(Fi, J("status.historyLoginRequired"), !0)) : (M(Pi, [], !0), M(Fi, ca(await e.json().catch(() => null)) ?? J("status.historyFetchFailed"), !0));
		} catch {
			M(Pi, [], !0), M(Fi, J("status.historyUnavailable"), !0);
		}
	}
	let zi = (() => {
		let e = {
			dateStyle: "short",
			timeStyle: "short"
		};
		try {
			return new Intl.DateTimeFormat(la(), e);
		} catch {
			return new Intl.DateTimeFormat(void 0, e);
		}
	})(), Bi = !1;
	async function Vi() {
		let e = R(Pi)?.[0];
		if (e && !R(Ii) && await _t({
			title: J("confirm.revert.title"),
			lines: [`«${e.message}»`, J("confirm.revert.body")],
			okLabel: J("confirm.revert.ok"),
			cancelLabel: J("confirm.cancel")
		})) {
			M(Ii, !0), E(J("status.reverting"));
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? Ai = e : ji(), Bi = !0, E(J("status.revertDone"), "ok"), Hi();
				} else t.status === 409 ? E(J("status.revertConflict"), "error") : E(ca(await t.json().catch(() => null)) ?? J("status.revertFailed"), "error");
			} catch {
				E(J("status.publishLayerUnreachable"), "error");
			}
			M(Ii, !1), Ri();
		}
	}
	async function Hi() {
		let e = ["/content/site.json", ...R(k).pages.map((e) => `/${e.file}`)], t = async () => {
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
				E(J("status.revertDeployed"), "ok");
				for (let e of Object.keys(localStorage).filter((e) => e.startsWith("urd-draft-"))) localStorage.removeItem(e);
				await new Promise((e) => setTimeout(e, 800)), location.reload();
				return;
			}
		}
		E(J("status.revertDeployTimeout"), "error");
	}
	let Gi = 0;
	async function Ki(e) {
		let t = ++Gi, n = re, r = await Gp(Wp(e));
		t === Gi && n === re && (r ? E(J("status.publishLive"), "ok") : E(J("status.publishDeployTimeout"), "error"));
	}
	let qi = /* @__PURE__ */ j(null), Ji = /* @__PURE__ */ j(null), Yi = /* @__PURE__ */ j(!1), Xi = /* @__PURE__ */ j(sn(/* @__PURE__ */ new Set()));
	async function Zi() {
		M(Yi, !0), M(Ji, null), M(qi, null);
		try {
			let e = await fetch("/api/github/update"), t = await e.json().catch(() => null);
			e.ok ? (M(qi, t, !0), M(Xi, /* @__PURE__ */ new Set(), !0)) : M(Ji, ca(t) ?? J("update.checkFailed"), !0);
		} catch {
			M(Ji, J("status.publishLayerUnreachable"), !0);
		}
		M(Yi, !1);
	}
	function Qi(e) {
		let t = new Set(R(Xi));
		t.has(e) ? t.delete(e) : t.add(e), M(Xi, t, !0);
	}
	async function $i() {
		if (!R(qi) || R(qi).upToDate || R(Yi)) return;
		let e = [...R(Xi)], t = R(qi).changes.filter((e) => !R(Xi).has(e.path)), n = t.filter((e) => e.atom && e.conflict);
		if (await _t({
			title: J("confirm.update.title"),
			lines: [J("confirm.update.body", {
				target: R(qi).target,
				writes: t.filter((e) => e.action === "write").length,
				deletes: t.filter((e) => e.action === "delete").length
			}), ...n.length > 0 ? [J("confirm.update.warnEdited", { paths: n.map((e) => e.path).join(", ") })] : []],
			okLabel: J("confirm.update.ok"),
			cancelLabel: J("confirm.cancel")
		})) {
			M(Yi, !0), E(J("update.running", { target: R(qi).target }));
			try {
				let t = await fetch("/api/github/update", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						to: R(qi).target,
						expect: R(qi).head,
						skip: e
					})
				}), n = await t.json().catch(() => null);
				t.ok ? (E(J("update.committed", { target: R(qi).target }), "ok"), await ea(R(qi).target.replace(/^v/, ""))) : t.status === 409 ? (E(ca(n) ?? J("update.checkFailed"), "error"), await Zi()) : E(ca(n) ?? J("update.failed"), "error");
			} catch {
				E(J("status.publishLayerUnreachable"), "error");
			}
			M(Yi, !1);
		}
	}
	async function ea(e) {
		for (let t = 0; t < 18; t++) {
			await new Promise((e) => setTimeout(e, 1e4));
			try {
				if ((await (await fetch("/urd.json", { cache: "no-store" })).json())?.engine === e) {
					E(J("update.deployed"), "ok"), await new Promise((e) => setTimeout(e, 800)), location.reload();
					return;
				}
			} catch {}
		}
		E(J("update.deployTimeout"), "error");
	}
	let ta = null;
	function na(e) {
		return {
			schemaVersion: 7,
			meta: {
				id: e.id,
				title: e.title
			},
			sections: [{
				id: Ch("sec"),
				version: 1,
				preset: "blank",
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
	async function ra(e, { keepHistory: t = !1 } = {}) {
		M(T, e, !0), ta = (async () => {
			let n = Ye(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = _h(await e.json(), Ue.data));
			} catch {}
			r ? Je.delete(e) : r = na(n), O = ga(`urd-draft-${e}`, () => r, ie), (O.data.schemaVersion ?? 1) > 7 && (console.warn(`Urd: the draft for '${e}' has schemaVersion ${O.data.schemaVersion} (the engine has 7) and is discarded`), O.replace(structuredClone(r))), O.replace(_h(O.data, Ue.data)), O.save(), t || (nt = null), M(Rn, null), M(zn, null), Xe(), La(), Re(), M(te, "");
		})(), await ta;
	}
	function ia() {
		We?.destroy(), R(oe)?.contentDocument?.addEventListener("pointerdown", () => {
			R(Yt) && M(Yt, null);
		}, !0), We = Jo(R(oe), {
			onEdit: id,
			onMove: ad,
			onGrow: od,
			onDelete: _d,
			onAddSection: fd,
			onMoveSection: pd,
			onDeleteSection: md,
			onSectionSize: hd,
			onUndo: (e) => e.redo ? ut() : lt(),
			onSelectSection: Qn,
			onSelectBlock: Jt,
			onBlockMenu: en,
			onReady: aa,
			onNavigate: Ca,
			onAddBlock: (e) => xd(e.sectionId, e.block),
			onAddBlocks: (e) => Sd(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: jd,
			onMoveBlockSection: gd,
			onMobileReset: cd,
			onMobileOrder: ld,
			onReviewDone: ud,
			onBlockFlag: dd,
			onCollectionEdit: hc,
			onCollectionAdd: dc,
			onSaveTemplate: nc,
			onStickyGroup: ic,
			onStickyDock: rc,
			onDeleteTemplate: oc,
			onApplyLayout: Be,
			onPluginBlocks: (e) => {
				M(Ed, e.blocks ?? [], !0);
			},
			onNavWidth: (e) => wa("edit:nav-width", () => {
				R(k).nav.style ??= {}, R(k).nav.style.width = e.width;
			})
		});
	}
	async function aa() {
		await ta, await zc, We?.sendPlugins(Ge(R(Bc))?.enabled ?? []), We?.sendViewport(R(xe)), We?.sendZoom(R(je)), lc(), tc(), Ue.hasDraft() && qe();
		let e = !R(w).pages.some((e) => e.id === R(T));
		(O.hasDraft() || e) && We?.sendPage(R(T), O.data), R(le) || We?.sendChrome(!1), R(xa) && We?.sendShowGrid(!0), R(oa) && We?.sendShowGuides(!0), S();
	}
	let oa = /* @__PURE__ */ j(localStorage.getItem("urd-guides") === "1"), ua = /* @__PURE__ */ j(!1), da = /* @__PURE__ */ j(sn(localStorage.getItem("urd-layout-picker") === "menu" ? "menu" : "strip"));
	function fa(e) {
		M(da, e === "menu" ? "menu" : "strip", !0), R(da) === "menu" ? localStorage.setItem("urd-layout-picker", "menu") : localStorage.removeItem("urd-layout-picker");
	}
	let pa = /* @__PURE__ */ j(null);
	Dn(() => {
		if (!R(ua)) return;
		let e = (e) => {
			R(pa)?.contains(e.target) || M(ua, !1);
		}, t = (e) => {
			e.key === "Escape" && M(ua, !1);
		}, n = () => {
			M(ua, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let ma = {
		view: 1079,
		device: 999,
		zoom: 919
	}, _a = /* @__PURE__ */ j(null), va = /* @__PURE__ */ j(null), ya = sn({
		view: !1,
		device: !1,
		zoom: !1
	});
	Dn(() => {
		let e = Object.entries(ma).map(([e, t]) => {
			let n = window.matchMedia(`(max-width: ${t}px)`), r = () => {
				ya[e] = n.matches;
			};
			return r(), n.addEventListener("change", r), () => n.removeEventListener("change", r);
		});
		return () => e.forEach((e) => e());
	}), Dn(() => {
		R(_a) && !ya[R(_a)] && M(_a, null);
	}), Dn(() => {
		if (!R(_a)) return;
		let e = (e) => {
			R(va)?.contains(e.target) || M(_a, null);
		}, t = (e) => {
			e.key === "Escape" && M(_a, null);
		}, n = () => {
			M(_a, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	function ba() {
		M(oa, !R(oa)), localStorage.setItem("urd-guides", R(oa) ? "1" : "0"), We?.sendShowGuides(R(oa));
	}
	let xa = /* @__PURE__ */ j(localStorage.getItem("urd-grid-overlay") === "1");
	function Sa() {
		M(xa, !R(xa)), localStorage.setItem("urd-grid-overlay", R(xa) ? "1" : "0"), We?.sendShowGrid(R(xa));
	}
	function Ca(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = R(k).pages.find((e) => e.path === t);
		n && n.id !== R(T) && ra(n.id);
	}
	function wa(e, t) {
		it(e), t(), Ue.save(), Xe(), qe();
	}
	let Ta = /* @__PURE__ */ j(""), Ea = /* @__PURE__ */ j(null), Da = Object.fromEntries(Pg.map((e) => [e.id, Mg(Fg(e.id, {
		pageId: "preview",
		title: ""
	}))])), Oa = /* @__PURE__ */ A(() => {
		let e = R(k)?.theme?.tokens?.color ?? {};
		return [
			"bg",
			"surface",
			"text",
			"accent"
		].filter((t) => typeof e[t] == "string" && zg(e[t])).map((t) => `--urd-color-${t}: ${e[t]};`).join(" ");
	}), ka = /* @__PURE__ */ j(null);
	Dn(() => {
		if (!R(ka)) return;
		let e = (e) => {
			e.target.closest?.(".page-menu-wrap") || M(ka, null);
		}, t = (e) => {
			e.key === "Escape" && M(ka, null);
		}, n = () => {
			M(ka, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let Aa = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions",
		"readme"
	];
	function ja(e, t = null) {
		return e ? Aa.includes(e) ? J("error.reservedName", { slug: e }) : R(k).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? J("error.pageExists") : null : J("error.pageNeedsName");
	}
	function Ma() {
		let e = R(Ta).trim(), t = no(e), n = ja(t);
		if (n) return E(n, "error"), !1;
		let r = R(Ea) && !R(Ea).startsWith("preset:") ? Zs[R(Ea)]?.data?.page : null, i = R(Ea)?.startsWith("preset:") ? Fg(R(Ea).slice(7), {
			pageId: t,
			title: e
		}) ?? na({
			id: t,
			title: e
		}) : r ? $h(_h(JSON.parse(JSON.stringify(r)), Ue.data), Ch, {
			id: t,
			title: e
		}) : na({
			id: t,
			title: e
		});
		wa("pages", () => {
			R(k).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), R(k).nav.items.push({
				label: e,
				page: t
			});
		}), ae(`urd-draft-${t}`, JSON.stringify(i)), Xe(), M(Ta, ""), M(Ea, null), ra(t);
	}
	async function Na(e) {
		M(ka, null), await ac("page", e.id === R(T) ? JSON.parse(JSON.stringify(O.data)) : await Ga(e));
	}
	function Fa(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		wa("pages", () => {
			e.title = n;
			for (let t of R(k).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === R(T) ? (O.data.meta.title = n, O.save(), Xe(), We?.sendPage(R(T), O.data)) : Ka(e, (e) => {
			e.meta.title = n;
		});
	}
	let Ia = /* @__PURE__ */ j(sn({
		description: "",
		ogTitle: "",
		ogDescription: "",
		ogImage: ""
	}));
	function La() {
		let e = O?.data?.meta ?? {};
		M(Ia, {
			description: e.description ?? "",
			ogTitle: e.og?.title ?? "",
			ogDescription: e.og?.description ?? "",
			ogImage: e.og?.image ?? ""
		}, !0);
	}
	function Ba(e, t) {
		let n = String(t ?? "").trim();
		if (e === "description") n ? O.data.meta.description = n : delete O.data.meta.description;
		else {
			let t = {
				ogTitle: "title",
				ogDescription: "description",
				ogImage: "image"
			}[e], r = { ...O.data.meta.og ?? {} };
			n ? r[t] = n : delete r[t], Object.keys(r).length ? O.data.meta.og = r : delete O.data.meta.og;
		}
		O.save(), Xe(), La();
		let r = R(k).pages.find((e) => e.id === R(T));
		R(Ha)[R(T)] = !r?.noindex && !O.data.meta.description;
	}
	function Va(e) {
		let t = R(k).pages.find((e) => e.id === R(T));
		t && (wa("edit:page-noindex", () => {
			e ? t.noindex = !0 : delete t.noindex;
		}), R(Ha)[R(T)] = !e && !O?.data?.meta?.description);
	}
	let Ha = /* @__PURE__ */ j(sn({}));
	async function Ua() {
		let e = {};
		for (let t of R(k).pages) {
			if (t.noindex) continue;
			if (t.id === R(T)) {
				e[t.id] = !O?.data?.meta?.description;
				continue;
			}
			let n = await Ga(t);
			e[t.id] = !n?.meta?.description;
		}
		M(Ha, e, !0);
	}
	Dn(() => {
		R(jt) === "pages" && R(T) && Ua();
	});
	async function Wa(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			Ba("ogImage", (await Er(t)).dataUrl);
		} catch (e) {
			E(Dr(e), "error");
		}
	}
	async function Ga(e) {
		let t = localStorage.getItem(`urd-draft-${e.id}`);
		if (t) try {
			return JSON.parse(t);
		} catch {}
		try {
			let t = await fetch(`/${e.file}`);
			if (t.ok) return _h(await t.json(), Ue.data);
		} catch {}
		return na(e);
	}
	async function Ka(e, t) {
		let n = await Ga(e);
		t(n), ae(`urd-draft-${e.id}`, JSON.stringify(n)), Xe();
	}
	function qa(e, t) {
		let n = no(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = ja(n, e.id);
		if (r) {
			E(r, "error");
			return;
		}
		wa("pages", () => {
			e.path = `/${n}`;
		});
	}
	function Ja(e) {
		e.path !== "/" && (wa("pages", () => {
			R(k).pages = R(k).pages.filter((t) => t.id !== e.id), R(k).nav.items = R(k).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of R(k).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			R(k).nav.items = R(k).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === R(T) && ra(R(k).pages[0].id), E(J("status.pageRemoved")));
	}
	function Xa(e) {
		wa("edit:nav-logo", () => {
			R(k).nav.logo = {
				type: "text",
				value: "",
				...R(k).nav.logo,
				...e
			};
		});
	}
	function Za(e) {
		wa("nav", () => {
			R(k).nav.logo ??= {
				type: "text",
				value: R(k).site.title
			};
			let t = R(k).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = R(k).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = R(k).site.title), delete t.image), t.type = e;
		});
	}
	async function io(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Er(t);
			wa("nav", () => {
				let t = R(k).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			E(J("status.imageReadErrorSvg"), "error");
		}
	}
	let ao = /* @__PURE__ */ j(null);
	async function oo(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		if (t.type === "image/svg+xml" || /\.svg$/i.test(t.name || "")) {
			try {
				let e = await Tr(t);
				M(ao, e.dataUrl, !0);
			} catch {
				E(J("status.imageReadErrorSvg"), "error");
			}
			return;
		}
		let n = new FileReader();
		n.onload = () => {
			M(ao, String(n.result), !0);
		}, n.onerror = () => E(J("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function so(e) {
		wa("edit:site-icon", () => {
			R(k).site.icon = e;
		}), M(ao, null);
	}
	function co() {
		wa("edit:site-icon", () => {
			delete R(k).site.icon;
		});
	}
	function lo(e) {
		wa("edit:site-title", () => {
			R(k).site.title = e;
		});
	}
	function uo(e) {
		wa("edit:site-desc", () => {
			R(k).site.description = e;
		});
	}
	function fo(e) {
		let t = String(e ?? "").trim();
		wa("edit:site-analytics", () => {
			t ? R(k).analytics = { token: t } : delete R(k).analytics;
		});
	}
	let po = /* @__PURE__ */ A(() => R(k)?.layout?.contentWidth ?? 1440), mo = /* @__PURE__ */ A(() => R(k)?.layout?.gutter ?? 6), ho = /* @__PURE__ */ A(() => sm(R(po))), go = /* @__PURE__ */ A(() => em.find((e) => e.gutter === R(mo))?.id ?? null), bo = /* @__PURE__ */ j(!1), xo = /* @__PURE__ */ A(() => R(po) === "full" ? $p : rm(R(po))), So = /* @__PURE__ */ A(() => nm.map((e) => ({
		screen: e,
		...om(R(po), R(mo), e)
	})));
	function Co(e, t) {
		wa(t, () => {
			let t = {
				...R(k).layout ?? {},
				contentWidth: R(po),
				gutter: R(mo),
				...e
			};
			for (let e of Object.keys(t)) t[e] === void 0 && delete t[e];
			R(k).layout = t;
		});
	}
	let wo = (e) => Co({ contentWidth: e === "full" ? "full" : rm(e) }, "edit:site-width"), To = (e) => Co({ gutter: im(e) }, "edit:site-gutter");
	function Eo() {
		let e = R(k).site.lang ?? "no";
		return e === "no" ? "nb" : e;
	}
	function Do() {
		let e = Eo(), t = Lt([...It, ...Bt()]);
		return [...t.some(([t]) => t === e) ? [] : [[e, e]], ...t];
	}
	function Oo(e) {
		wa("site", () => {
			R(k).site.lang = e;
		});
	}
	function ko(e) {
		let t = uy(e);
		wa("site", () => {
			t.length ? R(k).site.meetingHosts = t : delete R(k).site.meetingHosts;
		});
	}
	let Ao = /* @__PURE__ */ j(!1), jo = /* @__PURE__ */ j(null), Mo = /* @__PURE__ */ j(null);
	Dn(() => {
		let e = R(Mo);
		e && (M(Mo, null), br().then(() => document.querySelector(`[data-cal-name="${e}"]`)?.focus()));
	});
	let No = () => R(k)?.site?.calendars ?? [], Po = (e) => No().find((t) => t.id === e) ?? null;
	function Fo(e = {}) {
		let t = {
			id: Ch("cal"),
			url: "",
			...e
		};
		return wa("site", () => {
			(R(k).site.calendars ??= []).unshift(t);
		}), M(jo, t.id, !0), M(Mo, t.id, !0), M(Ao, !0), t.id;
	}
	function Io(e) {
		wa("site", () => {
			R(k).site.calendars[e]?.id === R(jo) && M(jo, null), R(k).site.calendars.splice(e, 1), R(k).site.calendars.length || delete R(k).site.calendars;
		});
	}
	function Lo(e, t) {
		wa("site", () => {
			let n = R(k).site.calendars, r = e + t;
			r < 0 || r >= n.length || ([n[e], n[r]] = [n[r], n[e]]);
		});
	}
	function Ro(e, t, n, r = !1) {
		let i = String(n ?? "").trim();
		wa(`edit:site-cal-${e}-${t}`, () => {
			let n = R(k).site.calendars[e];
			i || r ? n[t] = i : delete n[t];
		});
	}
	function zo(e, t, n) {
		wa("site", () => {
			let r = R(k).site.calendars[e];
			n ? delete r[t] : r[t] = !1;
		});
	}
	function Bo(e) {
		wa("site", () => {
			e && e !== "osm" ? R(k).site.mapService = e : delete R(k).site.mapService;
		});
	}
	let Vo = /* @__PURE__ */ j(!1);
	function Ho(e) {
		let t = e.trim();
		M(Vo, t !== "" && !ay(t), !0), !R(Vo) && wa("site", () => {
			t ? R(k).site.timeZone = t : delete R(k).site.timeZone;
		});
	}
	let Uo = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	Dn(() => {
		if (!R(k)?.site) return;
		let e = R(k).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 49.6V14.4l25.6 10.4V49.6' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
				return;
			}
			Uo.test(e) && (t.href = e);
		}
	});
	function Wo(e) {
		wa("nav", () => {
			R(k).nav.layout = e;
		});
	}
	let Go = (e) => e !== "theme" || !!R(k).theme?.alt?.tokens, Ko = /* @__PURE__ */ A(() => k_(R(k)?.nav?.style ?? {}).filter(Go));
	function Yo(e, t) {
		let n = k_(R(k).nav.style ?? {}), r = n.indexOf(e), i = r + t;
		for (; i >= 0 && i < n.length && !Go(n[i]);) i += t;
		r < 0 || i < 0 || i >= n.length || ([n[r], n[i]] = [n[i], n[r]], Zo("order", n));
	}
	function Zo(e, t) {
		wa(`edit:nav-tools-${e}`, () => {
			R(k).nav.style ??= {};
			let n = { ...R(k).nav.style.tools ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? R(k).nav.style.tools = n : delete R(k).nav.style.tools;
		});
	}
	function Qo(e, t) {
		wa(`edit:nav-style-${e}`, () => {
			R(k).nav.style ??= {}, t === void 0 ? delete R(k).nav.style[e] : R(k).nav.style[e] = t;
		});
	}
	let $o = /* @__PURE__ */ A(() => R(k)?.nav?.variant === "side-left" || R(k)?.nav?.variant === "side-right"), es = /* @__PURE__ */ A(() => [
		"floating",
		"floating-square",
		"floating-tab"
	].includes(R(k)?.nav?.variant)), ts = /* @__PURE__ */ A(() => Em(R(k)?.nav?.style)), ns = /* @__PURE__ */ A(() => wm(R(k)?.nav?.style, R(k)?.nav?.variant)), rs = /* @__PURE__ */ A(() => Tm(R(k)?.nav?.style));
	function is(e) {
		wa("nav", () => {
			R(k).nav.style ??= {}, e === "md" ? delete R(k).nav.style.size : R(k).nav.style.size = e, delete R(k).nav.style.padY, delete R(k).nav.style.textSize;
		});
	}
	function as(e, t, n) {
		let r = e.target.value;
		Qo(t, r === "" ? void 0 : Cm(r, n, void 0)), e.target.value = R(k).nav.style?.[t] ?? "";
	}
	function os(e, t) {
		wa(`edit:nav-mobile-${e}`, () => {
			R(k).nav.style ??= {};
			let n = { ...R(k).nav.style.mobile ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? R(k).nav.style.mobile = n : delete R(k).nav.style.mobile;
		});
	}
	let ss = (e) => {
		let t = R(k)?.nav?.style?.mobile?.[e];
		return t === void 0 ? "" : t ? "on" : "off";
	}, cs = (e, t) => os(e, t === "" ? void 0 : t === "on"), ls = (e) => os("border", e ? {
		...R(k).nav.style?.mobile?.border ?? {},
		side: e
	} : void 0);
	function us(e, t) {
		wa(`edit:nav-announce-${e}`, () => {
			let n = { ...R(k).nav.announcement ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? R(k).nav.announcement = n : delete R(k).nav.announcement;
		});
	}
	let ds = "<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"currentColor\" aria-hidden=\"true\">" + [
		6,
		12,
		18
	].flatMap((e) => [
		6,
		12,
		18
	].map((t) => `<circle cx="${t}" cy="${e}" r="1.6"/>`)).join("") + "</svg>", fs = /* @__PURE__ */ j(null);
	function ps() {
		let e = R(k).nav?.launcher;
		return [e?.image, ...(e?.links ?? []).map((e) => e.image)].filter(Boolean);
	}
	function hs(e, t) {
		wa("nav", () => {
			R(k).nav.launcher ??= { links: [] };
			let n = e === null ? R(k).nav.launcher : R(k).nav.launcher.links[e];
			t.image ? n.image = t.image : delete n.image, t.icon ? n.icon = t.icon : delete n.icon;
		});
	}
	function vs(e, t) {
		wa(`edit:nav-launcher-${e}`, () => {
			R(k).nav.launcher ??= { links: [] }, t === void 0 ? delete R(k).nav.launcher[e] : R(k).nav.launcher[e] = t;
		});
	}
	function ys() {
		wa("nav", () => {
			R(k).nav.launcher ??= { links: [] }, R(k).nav.launcher.links ??= [], R(k).nav.launcher.links.push({
				label: J("seed.link"),
				href: "",
				icon: "globe"
			});
		});
	}
	function bs(e) {
		wa("nav", () => {
			R(k).nav.launcher.links.splice(e, 1);
		});
	}
	function xs(e, t) {
		wa("nav", () => {
			let n = R(k).nav.launcher.links, r = e + t;
			r < 0 || r >= n.length || ([n[e], n[r]] = [n[r], n[e]]);
		});
	}
	function Ss(e, t, n) {
		wa(`edit:nav-launcher-${t}-${e}`, () => {
			R(k).nav.launcher.links[e][t] = n;
		});
	}
	async function Cs(e, t) {
		if (e) try {
			let n = await Er(e);
			wa("nav", () => {
				R(k).nav.launcher ??= { links: [] }, t === null ? R(k).nav.launcher.image = n.dataUrl : R(k).nav.launcher.links[t].image = n.dataUrl;
			});
		} catch {
			E(J("status.imageReadErrorSvg"), "error");
		}
	}
	function ws(e, t) {
		wa(`edit:nav-sheet-${e}`, () => {
			R(k).nav.style ??= {};
			let n = { ...R(k).nav.style.sheet ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? R(k).nav.style.sheet = n : delete R(k).nav.style.sheet;
		});
	}
	function Ts(e, t, n) {
		let r = e.target.value;
		Qo(t, r === "" ? void 0 : Cm(r, n, void 0)), e.target.value = R(t === "padY" ? ns : rs);
	}
	function Es(e, t, n) {
		let r = e.target.value;
		os(t, r === "" ? void 0 : Cm(r, n, void 0)), e.target.value = R(k).nav.style?.mobile?.[t] ?? "";
	}
	function Ds(e) {
		let t = Cm(e / 100, pm, .5);
		Qo("shrinkTo", t === .5 ? void 0 : t);
	}
	function Os(e) {
		let t = Cm(e, mm, 80);
		Qo("shrinkAt", t === 80 ? void 0 : t);
	}
	function ks(e) {
		let t = Cm(e, hm, 220);
		Qo("shrinkMs", t === 220 ? void 0 : t);
	}
	let As = {
		underline: [J("hoverColor.underline.label"), J("hoverColor.underline.title")],
		pill: [J("hoverColor.pill.label"), J("hoverColor.pill.title")],
		lift: [J("hoverColor.lift.label"), J("hoverColor.lift.title")]
	}, js = /* @__PURE__ */ A(() => As[R(k)?.nav?.style?.hover] ?? null), Ms = (e) => (e.version ?? 1) < Nv.version ? Nv.migrations[1](e.props ?? {}) : e.props ?? {}, Ns = /* @__PURE__ */ A(() => [
		["grid", J("opt.launcherView.grid")],
		["list", J("opt.launcherView.list")],
		["cover", J("opt.launcherView.cover")]
	]), Ps = /* @__PURE__ */ A(() => R($o) ? [
		["card", J("common.standard")],
		["pills", J("opt.sub.pills")],
		["lines", J("opt.sub.lines")]
	] : [
		["card", J("opt.sub.card")],
		["flat", J("opt.sub.flat")],
		["pills", J("opt.sub.pills")],
		["lines", J("opt.sub.lines")],
		["flyout", J("opt.sub.flyout")]
	]);
	function Is(e) {
		(R(k).nav.variant ?? "bar") !== e && wa("nav", () => {
			e === "bar" ? delete R(k).nav.variant : R(k).nav.variant = e, R(k).nav.style && delete R(k).nav.style.radius;
		});
	}
	function Ls(e) {
		wa("nav", () => {
			R(k).nav.style ??= {}, e ? R(k).nav.style.glow = !0 : delete R(k).nav.style.glow;
		});
	}
	function Rs(e) {
		wa("nav", () => {
			R(k).nav.style ??= {}, e ? delete R(k).nav.style.topGap : R(k).nav.style.topGap = !1;
		});
	}
	function zs(e) {
		wa("nav", () => {
			R(k).nav.style ??= {}, e === "standard" ? delete R(k).nav.style.hover : R(k).nav.style.hover = e;
		});
	}
	let Bs = null, Vs = {}, Hs = {}, Us = !1, Ws = /* @__PURE__ */ j(sn([])), Gs = /* @__PURE__ */ j(sn({})), Ks = /* @__PURE__ */ j(null), qs = /* @__PURE__ */ j(""), Js = /* @__PURE__ */ j("news"), Ys = [
		["news", J("collectionKind.news")],
		["notices", J("collectionKind.notices")],
		["publications", J("collectionKind.publications")],
		["products", J("collectionKind.products")],
		["custom", J("collectionKind.custom")]
	], Xs = null, Zs = {}, Qs = {}, $s = !1, Z = /* @__PURE__ */ j(sn([]));
	async function ec() {
		let e = {
			version: 1,
			maler: []
		};
		try {
			e = await (await fetch("/content/maler.json")).json();
		} catch {}
		Xs = ga("urd-draft-templates", () => e, ie, "urd-draft-maler"), M(Z, [...Xs.data.maler ?? []], !0);
		for (let e of R(Z)) {
			let t = null;
			try {
				t = await (await fetch(`/content/maler/${e}.json`)).json();
			} catch {}
			Qs[e] = t, Zs[e] = ga(`urd-draft-template-${e}`, () => t, ie, `urd-draft-mal-${e}`), (Zs[e].data?.schemaVersion ?? 1) > 1 && Zs[e].reset();
		}
		$s = !0, tc();
	}
	function tc() {
		let e = R(Z).map((e) => Zs[e]?.data ? {
			id: e,
			...JSON.parse(JSON.stringify(Zs[e].data))
		} : null).filter(Boolean).map(({ id: e, mal: t, section: n, blocks: r, page: i }) => ({
			id: e,
			name: t.name,
			kind: t.kind,
			section: n,
			blocks: r,
			page: i
		}));
		We?.sendTemplates(e);
	}
	function nc(e) {
		let t = Zh.includes(e.kind) ? e.kind : "section";
		return ac(t, e[t]);
	}
	function rc(e) {
		let { section: t, block: n } = Kt(e.sectionId, e.blockId);
		t && n?.sticky && Fs.some(([t]) => t === e.dock) && (it(`sticky-dock:${e.blockId}`), n.sticky = {
			...n.sticky,
			dock: e.dock
		}, O.save(), Xe(), We?.sendSection(R(T), t), qt());
	}
	function ic(e) {
		let t = e.blockIds ?? [], { section: n } = Kt(e.sectionId, t[0]);
		if (!n || !t.length) return;
		it(`sticky-group:${e.sectionId}`);
		let r = e.on ? Ch("stk") : null;
		for (let e of n.blocks) t.includes(e.id) && (e.sticky = r ? {
			offset: 16,
			until: null,
			...e.sticky,
			group: r
		} : null);
		He(n, "block-edited"), O.save(), Xe(), We?.sendSection(R(T), n), qt(), E(J(e.on ? "status.stickyGrouped" : "status.stickyUngrouped"));
	}
	async function ac(e, t) {
		if (!t || !Xs) return;
		let n = (await vt({
			title: J("canvas.templateNamePrompt"),
			placeholder: J("ph.templateName")
		}))?.trim();
		if (!n) return;
		let r = Qh(n);
		if (!r) {
			E(J("status.invalidName"), "error");
			return;
		}
		if (R(Z).includes(r)) {
			E(J("status.templateExists"), "error");
			return;
		}
		it("templates");
		let i = {
			schemaVersion: 1,
			mal: {
				name: n,
				kind: e
			},
			[e]: t
		};
		Zs[r] = ga(`urd-draft-template-${r}`, () => null, ie, `urd-draft-mal-${r}`), Zs[r].replace(i), Zs[r].save(), Xs.data.maler = [...R(Z), r], Xs.save(), M(Z, [...R(Z), r], !0), E(J("status.templateSaved", { name: n }), "ok"), Xe(), tc();
	}
	async function oc(e) {
		let t = Zs[e.id]?.data?.mal;
		t && await _t({ title: J("confirm.deleteTemplate", { name: t.name }) }) && (it("templates"), R(Ea) === e.id && M(Ea, null), localStorage.removeItem(`urd-draft-template-${e.id}`), localStorage.removeItem(`urd-draft-mal-${e.id}`), delete Zs[e.id], Xs.data.maler = R(Z).filter((t) => t !== e.id), Xs.save(), M(Z, R(Z).filter((t) => t !== e.id), !0), Xe(), tc());
	}
	async function sc() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/collections.json")).json();
		} catch {}
		Bs = ga("urd-draft-collections", () => e, ie, "urd-draft-samlinger"), M(Ws, [...Bs.data.samlinger ?? []], !0);
		for (let e of R(Ws)) {
			let t = null;
			try {
				t = await (await fetch(`/content/samlinger/${e}.json`)).json();
			} catch {}
			Hs[e] = t, Vs[e] = ga(`urd-draft-collection-${e}`, () => t, ie, `urd-draft-samling-${e}`), !t && !Vs[e].data && (Vs[e].replace({
				schemaVersion: 1,
				id: e,
				name: e,
				kind: "custom",
				entries: []
			}), Vs[e].save());
		}
		Us = !0, cc();
	}
	function cc(e = !0) {
		let t = {};
		for (let e of R(Ws)) Vs[e] && (t[e] = JSON.parse(JSON.stringify(Vs[e].data)));
		M(Gs, t, !0), e && lc();
	}
	function lc() {
		We?.sendCollections(Ge(R(Gs)) ?? {});
	}
	function uc(e, t, n, r = !0) {
		let i = Vs[e];
		i && (it(t), n(i.data), i.save(), Xe(), cc(r));
	}
	function dc(e) {
		Vs[e.collection] && xc(e.collection);
	}
	function fc(e) {
		return (new DOMParser().parseFromString(String(e ?? ""), "text/html").body.textContent ?? "").trim();
	}
	function hc(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r !== "title" || fc(i)) && uc(t, `edit:collection:${t}:${n}:${r}`, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image");
	}
	function _c(e, t, n) {
		let r = {
			schemaVersion: 1,
			id: e,
			name: t,
			kind: n,
			entries: []
		};
		Vs[e] = ga(`urd-draft-collection-${e}`, () => null, ie, `urd-draft-samling-${e}`), Vs[e].replace(r), Vs[e].save(), Bs.data.samlinger = [...R(Ws), e], Bs.save(), M(Ws, [...R(Ws), e], !0), M(Ks, e, !0), Xe(), cc();
	}
	function vc() {
		let e = R(qs).trim();
		if (!e) return;
		let t = no(e);
		if (!t || R(Ws).includes(t)) {
			E(J(t ? "status.collectionExists" : "status.invalidName"), "error");
			return;
		}
		it("collections"), _c(t, e, R(Js)), M(qs, "");
	}
	function yc() {
		let e = J("seed.productCatalogName"), t = no(e) || "collection", n = t;
		for (let e = 2; R(Ws).includes(n); e += 1) n = `${t}-${e}`;
		it("collections"), _c(n, e, "products"), tn(null, (e) => {
			e.props.collection = n;
		});
	}
	function bc(e) {
		it("collections"), localStorage.removeItem(`urd-draft-collection-${e}`), localStorage.removeItem(`urd-draft-samling-${e}`), delete Vs[e], Bs.data.samlinger = R(Ws).filter((t) => t !== e), Bs.save(), M(Ws, R(Ws).filter((t) => t !== e), !0), R(Ks) === e && M(Ks, null), Xe(), cc();
	}
	function xc(e) {
		uc(e, `collection:${e}:add-entry`, (e) => {
			e.kind === "products" ? e.entries.push({
				id: Ch("entry"),
				title: J("seed.newProduct"),
				text: ""
			}) : e.entries.unshift({
				id: Ch("entry"),
				title: J("seed.newEntry"),
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function Sc(e, t, n, r) {
		uc(e, `edit:collection:${e}:${t}:${n}`, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function Cc(e, t, n) {
		uc(e, `collection:${e}:move-entry`, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function wc(e, t) {
		uc(e, `collection:${e}:remove-entry`, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function Tc(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && Sc(e, t, "image", (await Er(r)).dataUrl);
	}
	function Ec(e, t, n) {
		let r = n.split(",").map((e) => e.trim()).filter(Boolean);
		Sc(e, t, "sizes", r.length ? r : "");
	}
	function jc(e, t) {
		uc(e, `collection:${e}:${t}:colors`, (e) => {
			let n = e.entries.find((e) => e.id === t);
			n && (n.colors = [...n.colors ?? [], { name: J("ph.colorName") }]);
		});
	}
	function Mc(e, t, n, r, i) {
		uc(e, `edit:collection:${e}:${t}:color:${n}:${r}`, (e) => {
			let a = e.entries.find((e) => e.id === t)?.colors?.[n];
			a && (r === "image" && !i ? delete a.image : i && (a[r] = i));
		});
	}
	async function Nc(e, t, n, r) {
		let i = r.target.files?.[0];
		r.target.value = "", i && Mc(e, t, n, "image", (await Er(i)).dataUrl);
	}
	function Pc(e, t, n) {
		uc(e, `collection:${e}:${t}:colors`, (e) => {
			let r = e.entries.find((e) => e.id === t);
			r?.colors && (r.colors = r.colors.filter((e, t) => t !== n), r.colors.length || delete r.colors);
		});
	}
	function Fc(e) {
		let t = Vs[e]?.data;
		if (!t) return;
		let n = URL.createObjectURL(new Blob([rg(t.entries)], { type: "text/csv" })), r = document.createElement("a");
		r.href = n, r.download = `${e}.csv`, r.click(), URL.revokeObjectURL(n);
	}
	async function Ic(e, t) {
		let n = t.target.files?.[0];
		if (t.target.value = "", !n) return;
		let r = og(await n.text());
		if (!r) {
			E(J("status.csvInvalid"), "error");
			return;
		}
		let i = /* @__PURE__ */ new Set();
		for (let e of r.entries) (!/^[a-z0-9][a-z0-9-]*$/.test(e.id) || i.has(e.id)) && (e.id = Ch("entry")), i.add(e.id);
		uc(e, `collection:${e}:import`, (e) => {
			e.entries = r.entries;
		}), E(J("status.csvImported", { count: String(r.entries.length) }), "ok");
	}
	let Lc = null, Rc, zc = new Promise((e) => {
		Rc = e;
	}), Bc = /* @__PURE__ */ j(null), Vc = sn({}), Hc = /* @__PURE__ */ j("0.0.0"), Uc = /* @__PURE__ */ j(""), Wc = /* @__PURE__ */ j(""), Gc = /* @__PURE__ */ j(sn([])), Kc = /* @__PURE__ */ j(sn([])), qc = /* @__PURE__ */ j("pending"), Jc = () => [.../* @__PURE__ */ new Set([...R(Bc)?.enabled ?? [], ...R(Bc)?.disabled ?? []])];
	function Yc() {
		M(Bc, JSON.parse(JSON.stringify(Lc.data)), !0);
	}
	let Xc = /* @__PURE__ */ j(null);
	async function Zc() {
		try {
			let e = (await fetch("/urd.json", { cache: "no-store" })).headers.get("content-security-policy");
			if (!e) {
				M(Xc, { unknown: !0 }, !0);
				return;
			}
			let t = (t) => new Set((e.split(";").map((e) => e.trim()).find((e) => e.startsWith(`${t} `)) ?? "").split(/\s+/).slice(1));
			M(Xc, {
				frameSrc: t("frame-src"),
				connectSrc: t("connect-src"),
				scriptSrc: t("script-src")
			}, !0);
		} catch {
			M(Xc, { unknown: !0 }, !0);
		}
	}
	function el(e) {
		let t = [
			...(e.scriptSrc ?? []).map((e) => ["script-src", e]),
			...(e.connectSrc ?? []).map((e) => ["connect-src", e]),
			...(e.frameSrc ?? []).map((e) => ["frame-src", e])
		];
		if (!R(Xc) || R(Xc).unknown) return [];
		let n = {
			"script-src": R(Xc).scriptSrc,
			"connect-src": R(Xc).connectSrc,
			"frame-src": R(Xc).frameSrc
		};
		return t.filter(([e, t]) => !n[e]?.has(t)).map(([e, t]) => `${e} ${t}`);
	}
	async function tl() {
		Zc();
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		M(Kc, e.enabled ?? [], !0), Lc = ga("urd-draft-plugins", () => e, ie), Yc();
		try {
			M(Hc, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of Jc()) sl(e);
		al(), Rc(), We?.sendPlugins(Ge(R(Bc))?.enabled ?? []);
	}
	async function al() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				ol();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), M(Gc, (t ?? []).filter((e) => !Jc().includes(e)), !0);
			for (let e of R(Gc)) sl(e);
			M(qc, "ok");
		} catch {
			ol();
		}
	}
	function ol() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				M(Gc, e.filter((e) => !Jc().includes(e)), !0);
				for (let e of R(Gc)) sl(e);
				M(qc, "ok");
				return;
			}
		} catch {}
		M(qc, "unavailable");
	}
	async function sl(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = Sh(t);
			Vc[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && bh(R(Hc), t.requiresEngine)
			};
		} catch {
			Vc[e] = {
				name: e,
				errors: [J("plugin.manifestNotFound", { id: e })],
				satisfied: !1
			};
		}
	}
	function cl(e, t) {
		it("plugins");
		let n = Lc.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), Lc.save(), Xe(), Yc(), ul();
	}
	function ul() {
		R(oe) && (R(oe).src = R(oe).src);
	}
	function dl(e) {
		it("plugins");
		let t = Lc.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), Lc.save(), Xe(), Yc(), ul();
	}
	async function fl() {
		M(Wc, "");
		let e = R(Uc).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			M(Wc, J("plugin.invalidId"), !0);
			return;
		}
		if (Jc().includes(e)) {
			M(Wc, J("plugin.alreadyListed"), !0);
			return;
		}
		if (await sl(e), Vc[e].errors.length) {
			M(Wc, J("plugin.invalidManifest", { errors: Vc[e].errors.join("; ") }), !0);
			return;
		}
		cl(e, !0), M(Uc, "");
	}
	function pl(e) {
		M(Gc, R(Gc).filter((t) => t !== e), !0), cl(e, !0);
	}
	function ml(e, t) {
		wa(e, () => {
			R(k).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(R(k).footer);
		});
	}
	function hl(e, t) {
		ml(`edit:footer-brand-${e}`, (n) => {
			n.brand ??= {}, t.trim() ? n.brand[e] = t : delete n.brand[e], !n.brand.title && !n.brand.tagline && !n.brand.logo && delete n.brand;
		});
	}
	function gl(e) {
		ml("footer", (t) => {
			t.brand ??= {}, e === "image" || e === "both" ? t.brand.mode = e : delete t.brand.mode;
		});
	}
	async function _l(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Er(t);
			ml("footer", (t) => {
				t.brand ??= {}, t.brand.logo = e.dataUrl, t.brand.mode || (t.brand.mode = "both");
			});
		} catch {
			E(J("status.imageReadErrorSvg"), "error");
		}
	}
	function vl() {
		ml("footer", (e) => {
			e.brand && (delete e.brand.logo, delete e.brand.mode, delete e.brand.logoHeight, !e.brand.title && !e.brand.tagline && delete e.brand);
		});
	}
	function yl(e) {
		ml("edit:footer-logo-height", (t) => {
			t.brand ??= {};
			let n = Number(e);
			Number.isFinite(n) && (t.brand.logoHeight = Math.min(160, Math.max(16, Math.round(n))));
		});
	}
	function bl(e) {
		ml("edit:footer-copyright", (t) => {
			e.trim() ? t.copyright = e : delete t.copyright;
		});
	}
	let xl = [
		{
			id: "minimal",
			label: J("footerTemplate.minimal"),
			thumb: {
				center: !0,
				social: 2,
				baselineLinks: 1
			}
		},
		{
			id: "centered",
			label: J("footerTemplate.centered"),
			thumb: {
				center: !0,
				row: !0,
				social: 3
			}
		},
		{
			id: "columns",
			label: J("footerTemplate.columns"),
			thumb: {
				tag: !0,
				cols: 3,
				social: 3,
				baselineLinks: 2
			}
		},
		{
			id: "sitemap",
			label: J("footerTemplate.sitemap"),
			thumb: {
				tag: !0,
				fat: !0,
				cols: 4,
				social: 4,
				baselineLinks: 3
			}
		},
		{
			id: "newsletter",
			label: J("footerTemplate.newsletter"),
			thumb: {
				tag: !0,
				cta: !0,
				cols: 2,
				social: 2,
				baselineLinks: 1
			}
		},
		{
			id: "bigcta",
			label: J("footerTemplate.bigcta"),
			thumb: {
				center: !0,
				bigcta: !0,
				baselineLinks: 2
			}
		},
		{
			id: "contact",
			label: J("footerTemplate.contact"),
			thumb: {
				tag: !0,
				cols: 3,
				social: 2,
				baselineLinks: 1
			}
		},
		{
			id: "mega",
			label: J("footerTemplate.mega"),
			thumb: {
				tag: !0,
				mega: !0,
				cols: 2,
				social: 4,
				baselineLinks: 2
			}
		},
		{
			id: "chapters",
			label: J("footerTemplate.chapters"),
			thumb: {
				chapters: !0,
				cols: 3,
				baselineLinks: 2
			}
		},
		{
			id: "split",
			label: J("footerTemplate.split"),
			thumb: {
				split: !0,
				cols: 2,
				baselineLinks: 1
			}
		}
	];
	function Sl(e) {
		let t = J("seed.orgName"), n = R(k).pages ?? [], r = (e) => n.slice(0, e).map((e) => ({
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
			baseline: [a(J("seed.footer.privacy"), "#")]
		} : e === "centered" ? {
			align: "center",
			brand: { title: t },
			linkRow: r(5),
			social: i([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: `${o} · ${J("seed.footer.madeWith")}`
		} : e === "columns" ? {
			align: "left",
			brand: {
				title: t,
				tagline: J("seed.footer.tagline1")
			},
			columns: [
				{
					title: J("seed.footer.colPages"),
					links: r(4)
				},
				{
					title: J("seed.footer.colCompany"),
					links: [
						a(J("seed.footer.about"), "#"),
						a(J("seed.join"), "#"),
						a(J("seed.footer.press"), "#")
					]
				},
				{
					title: J("seed.footer.colResources"),
					links: [
						a(J("seed.footer.bylaws"), "#"),
						a(J("seed.footer.privacy"), "#"),
						a(J("seed.footer.contact"), "#")
					]
				}
			],
			social: i([
				"facebook",
				"instagram",
				"linkedin"
			]),
			copyright: o,
			baseline: [a(J("seed.footer.privacy"), "#"), a(J("seed.footer.terms"), "#")]
		} : e === "sitemap" ? {
			align: "left",
			brand: {
				title: t,
				tagline: J("seed.footer.tagline2")
			},
			columns: [
				{
					title: J("seed.footer.colExplore"),
					links: [
						a(J("seed.footer.home"), "#"),
						a(J("seed.footer.events"), "#"),
						a(J("seed.footer.gallery"), "#"),
						a(J("seed.footer.blog"), "#")
					]
				},
				{
					title: J("seed.footer.colCompany"),
					links: [
						a(J("seed.footer.about"), "#"),
						a(J("seed.footer.history"), "#"),
						a(J("seed.footer.press"), "#"),
						a(J("seed.footer.contact"), "#")
					]
				},
				{
					title: J("seed.footer.colSupport"),
					links: [
						a(J("seed.join"), "#"),
						a(J("seed.footer.faq"), "#"),
						a(J("seed.footer.help"), "#")
					]
				},
				{
					title: J("seed.footer.colLegal"),
					links: [
						a(J("seed.footer.privacy"), "#"),
						a(J("seed.footer.terms"), "#"),
						a(J("seed.footer.bylaws"), "#")
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
				a(J("seed.footer.privacy"), "#"),
				a(J("seed.footer.terms"), "#"),
				a(J("seed.footer.cookies"), "#")
			]
		} : e === "newsletter" ? {
			align: "left",
			brand: {
				title: t,
				tagline: J("seed.footer.tagline3")
			},
			cta: {
				kind: "newsletter",
				heading: J("seed.footer.newsletterHeading"),
				label: J("seed.footer.newsletterButton"),
				recipient: J("seed.email"),
				success: J("seed.footer.newsletterSuccess")
			},
			columns: [{
				title: J("seed.footer.colPages"),
				links: r(4)
			}, {
				title: J("seed.footer.colMore"),
				links: [
					a(J("seed.footer.about"), "#"),
					a(J("seed.footer.contact"), "#"),
					a(J("seed.footer.privacy"), "#")
				]
			}],
			social: i(["facebook", "instagram"]),
			copyright: o,
			baseline: [a(J("seed.footer.privacy"), "#")]
		} : e === "bigcta" ? {
			align: "center",
			cta: {
				kind: "button",
				big: !0,
				heading: J("seed.footer.ctaHeading"),
				sub: J("seed.footer.ctaSub"),
				label: J("seed.join"),
				href: "#"
			},
			linkRow: r(4),
			social: i([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: o,
			baseline: [a(J("seed.footer.privacy"), "#"), a(J("seed.footer.terms"), "#")]
		} : e === "contact" ? {
			align: "left",
			brand: {
				title: t,
				tagline: J("seed.footer.tagline4")
			},
			columns: [
				{
					title: J("seed.footer.colVisit"),
					links: [
						a(J("seed.footer.address"), "#"),
						a(J("seed.email"), `mailto:${J("seed.email")}`),
						a(J("seed.phone"), `tel:${J("seed.phone").replace(/\s+/g, "")}`)
					]
				},
				{
					title: J("seed.footer.colHours"),
					links: [a(J("seed.footer.hours1"), "#"), a(J("seed.footer.hours2"), "#")]
				},
				{
					title: J("seed.footer.colPages"),
					links: r(4)
				}
			],
			social: i(["facebook", "instagram"]),
			copyright: o,
			baseline: [a(J("seed.footer.privacy"), "#")]
		} : e === "chapters" ? {
			align: "left",
			design: "chapters",
			brand: {
				title: t,
				tagline: J("seed.footer.tagline2")
			},
			columns: [
				{
					title: J("seed.footer.colExplore"),
					links: r(4)
				},
				{
					title: J("seed.footer.colCompany"),
					links: [
						a(J("seed.footer.about"), "#"),
						a(J("seed.footer.history"), "#"),
						a(J("seed.footer.contact"), "#")
					]
				},
				{
					title: J("seed.footer.colSupport"),
					links: [
						a(J("seed.join"), "#"),
						a(J("seed.footer.faq"), "#"),
						a(J("seed.footer.help"), "#")
					]
				}
			],
			copyright: o,
			baseline: [a(J("seed.footer.privacy"), "#"), a(J("seed.footer.terms"), "#")]
		} : e === "split" ? {
			align: "left",
			design: "split",
			brand: {
				title: t,
				tagline: J("seed.footer.tagline1")
			},
			cta: {
				kind: "button",
				heading: J("seed.footer.ctaHeading"),
				label: J("seed.join"),
				href: "#"
			},
			columns: [{
				title: J("seed.footer.colPages"),
				links: r(4)
			}, {
				title: J("seed.footer.colMore"),
				links: [
					a(J("seed.footer.about"), "#"),
					a(J("seed.footer.contact"), "#"),
					a(J("seed.footer.privacy"), "#")
				]
			}],
			social: i(["facebook", "instagram"]),
			copyright: o,
			baseline: [a(J("seed.footer.privacy"), "#")]
		} : {
			align: "left",
			brand: {
				title: t,
				tagline: J("seed.footer.tagline5")
			},
			columns: [{
				title: J("seed.footer.colExplore"),
				links: r(4)
			}, {
				title: J("seed.footer.colFollow"),
				links: [a(J("seed.footer.newsletter"), "#"), a(J("seed.email"), `mailto:${J("seed.email")}`)]
			}],
			social: i([
				"facebook",
				"instagram",
				"linkedin",
				"youtube"
			]),
			copyright: o,
			baseline: [a(J("seed.footer.privacy"), "#"), a(J("seed.footer.madeWith"), "#")],
			background: {
				version: 1,
				layers: [{
					type: "glow",
					version: o_.version ?? 1,
					props: {
						...o_.defaults(),
						color: "accent",
						x: .12,
						y: 0,
						radius: .6,
						opacity: .45
					}
				}, {
					type: "grain",
					version: c_.version ?? 1,
					props: {
						...c_.defaults(),
						opacity: .08
					}
				}]
			}
		};
	}
	function Cl(e) {
		ml("footer-template", (t) => {
			let n = Sl(e);
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
				"background",
				"design"
			]) n[e] === void 0 ? delete t[e] : t[e] = n[e];
		});
	}
	function wl(e) {
		ml("footer", (t) => {
			t[e] ??= [], t[e].push(R(k).pages[0] ? {
				label: J("seed.link"),
				page: R(k).pages[0].id
			} : {
				label: J("seed.link"),
				href: "https://"
			});
		});
	}
	function Tl(e, t) {
		ml("footer", (n) => {
			n[e].splice(t, 1), n[e].length || delete n[e];
		});
	}
	function El(e, t, n) {
		ml("footer", (r) => {
			let i = r[e], a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function Dl(e, t, n) {
		ml(`edit:footer-${e}-label-${t}`, (r) => {
			r[e][t].label = n;
		});
	}
	function Ol(e, t, n) {
		ml("footer", (r) => {
			let i = r[e][t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function kl(e, t, n) {
		ml(`edit:footer-${e}-href-${t}`, (r) => {
			r[e][t].href = n;
		});
	}
	function Nl(e) {
		ml("footer", (t) => {
			e === "center" ? t.columnsAlign = "center" : delete t.columnsAlign;
		});
	}
	function Pl(e) {
		ml("footer", (t) => {
			e ? t.cta ??= {
				kind: "button",
				label: J("seed.join")
			} : delete t.cta;
		});
	}
	function Fl(e, t) {
		ml(`edit:footer-cta-${e}`, (n) => {
			n.cta ??= {}, t === "" || t == null || t === !1 ? delete n.cta[e] : n.cta[e] = t;
		});
	}
	function Rl(e) {
		ml("footer", (t) => {
			t.cta ??= {}, e === "__href" ? (delete t.cta.page, t.cta.href = t.cta.href ?? "https://") : (t.cta.page = e, delete t.cta.href);
		});
	}
	function zl(e, t) {
		ml("footer", (n) => {
			let r = new Set(n.hideOn ?? []);
			t ? r.delete(e) : r.add(e), r.size ? n.hideOn = [...r] : delete n.hideOn;
		});
	}
	function Vl() {
		ml("footer", (e) => {
			e.columns ??= [], e.columns.push({
				title: J("seed.column"),
				links: [{
					label: J("seed.link"),
					page: R(k).pages[0].id
				}]
			});
		});
	}
	function Hl(e) {
		ml("footer", (t) => {
			t.columns.splice(e, 1), t.columns.length || delete t.columns;
		});
	}
	function Ul(e, t) {
		ml("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.columns.length || ([n.columns[e], n.columns[r]] = [n.columns[r], n.columns[e]]);
		});
	}
	function Wl(e, t) {
		ml(`edit:footer-col-title-${e}`, (n) => {
			n.columns[e].title = t;
		});
	}
	function Kl(e) {
		ml("footer", (t) => {
			t.columns[e].links ??= [], t.columns[e].links.push({
				label: J("seed.link"),
				page: R(k).pages[0].id
			});
		});
	}
	function ql(e, t) {
		ml("footer", (n) => {
			n.columns[e].links.splice(t, 1);
		});
	}
	function Jl(e, t, n) {
		ml("footer", (r) => {
			let i = r.columns[e].links, a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function Yl(e, t, n) {
		ml(`edit:footer-link-label-${e}-${t}`, (r) => {
			r.columns[e].links[t].label = n;
		});
	}
	function Xl(e, t, n) {
		ml("footer", (r) => {
			let i = r.columns[e].links[t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function Zl(e, t, n) {
		ml(`edit:footer-link-href-${e}-${t}`, (r) => {
			r.columns[e].links[t].href = n;
		});
	}
	function Ql() {
		ml("footer", (e) => {
			e.social ??= [], e.social.push({
				icon: "facebook",
				url: "https://"
			});
		});
	}
	function $l(e) {
		ml("footer", (t) => {
			t.social.splice(e, 1), t.social.length || delete t.social;
		});
	}
	function eu(e, t) {
		ml("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.social.length || ([n.social[e], n.social[r]] = [n.social[r], n.social[e]]);
		});
	}
	function tu(e, t) {
		ml("footer", (n) => {
			n.social[e].icon = t;
		});
	}
	function nu(e, t) {
		ml(`edit:footer-social-url-${e}`, (n) => {
			n.social[e].url = t;
		});
	}
	let ru = vo.filter(([e]) => e === "iconCat.social" || e === "iconCat.communication").flatMap(([, e]) => e.map((e) => [e, J(_o[e].labelKey)]));
	function iu(e, t) {
		wa(`edit:nav-label-${e}`, () => {
			R(k).nav.items[e].label = t;
		});
	}
	function au(e, t) {
		wa("nav", () => {
			let n = R(k).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function ou(e, t) {
		wa(`edit:nav-href-${e}`, () => {
			R(k).nav.items[e].href = t;
		});
	}
	function su(e, t) {
		let n = e + t, r = R(k).nav.items;
		n < 0 || n >= r.length || wa("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function cu(e) {
		wa("nav", () => {
			R(k).nav.items.splice(e, 1);
		});
	}
	let lu = /* @__PURE__ */ j(""), uu = /* @__PURE__ */ j(""), du = /* @__PURE__ */ j(null);
	function fu(e) {
		let [t, n] = e.split(".").map(Number), r = R(k).nav.items;
		return n === void 0 ? {
			list: r,
			index: t,
			parent: null
		} : {
			list: r[t].children,
			index: n,
			parent: r[t]
		};
	}
	function pu(e, t, n, r) {
		if (!R(uu) || R(uu) === t) return null;
		let i = e.getBoundingClientRect(), a = (r - i.top) / i.height, o = n - i.left, s = fu(R(uu)), c = fu(t), l = s.list[s.index], u;
		return u = c.parent ? o < 28 ? {
			key: t.split(".")[0],
			pos: "after"
		} : {
			key: t,
			pos: a < .5 ? "before" : "after"
		} : !l.children?.length && o > i.width * .25 ? {
			key: t,
			pos: "into"
		} : {
			key: t,
			pos: a < .5 ? "before" : "after"
		}, mu(u, l, s);
	}
	function mu(e, t, n) {
		let r = fu(e.key);
		if (r.parent) {
			if (r.parent === t) return null;
			t.children?.length && (e = {
				key: e.key.split(".")[0],
				pos: "after"
			}, r = fu(e.key));
		}
		let i = r.list[r.index];
		if (e.pos === "into") {
			let n = i.children ?? [];
			return n.length && n[n.length - 1] === t ? null : e;
		}
		let a = r.parent ? r.parent.children : R(k).nav.items, o = a.filter((e) => e !== t).indexOf(i) + +(e.pos === "after");
		return a === n.list && o === n.index ? null : e;
	}
	function hu() {
		if (!R(uu)) return {
			label: "",
			target: ""
		};
		let e = fu(R(uu)), t = e.list[e.index], n = t.page ? R(k).pages.find((e) => e.id === t.page) : null;
		return {
			label: t.label,
			target: n ? n.title : t.href ?? J("opt.noLink")
		};
	}
	function gu(e) {
		R(du) && e?.dataTransfer?.dropEffect !== "none" && yu(R(du).key), M(uu, ""), M(du, null);
	}
	Dn(() => {
		if (!R(uu)) return;
		let e = (e) => e.preventDefault();
		return window.addEventListener("dragover", e), window.addEventListener("drop", e), () => {
			window.removeEventListener("dragover", e), window.removeEventListener("drop", e);
		};
	});
	let _u = "application/x-urd-nav-row";
	function vu(e) {
		if (!R(uu)) return;
		let t = [...e.currentTarget.querySelectorAll(".nav-item:not(.ghost)")];
		if (!t.length) return;
		let n = t.find((t) => {
			let n = t.getBoundingClientRect();
			return e.clientY >= n.top && e.clientY <= n.bottom;
		}), r = null;
		if (n) r = pu(n, n.dataset.key, e.clientX, e.clientY);
		else {
			let n = fu(R(uu)), i = n.list[n.index], a = t.find((t) => {
				let n = t.getBoundingClientRect();
				return n.top + n.height / 2 > e.clientY;
			});
			if (a) r = a.dataset.key === R(uu) ? null : mu({
				key: a.dataset.key,
				pos: "before"
			}, i, n);
			else {
				let e = [...t].reverse().find((e) => !e.classList.contains("child"));
				r = e.dataset.key === R(uu) ? null : mu({
					key: e.dataset.key,
					pos: "after"
				}, i, n);
			}
		}
		if (!r) {
			M(du, null);
			return;
		}
		e.preventDefault(), (R(du)?.key !== r.key || R(du)?.pos !== r.pos) && M(du, r, !0);
	}
	function yu(e) {
		let t = R(uu), n = R(du);
		if (M(uu, ""), M(du, null), t && n && n.key === e && t !== e) {
			{
				let r = fu(t), i = fu(e), a = r.list[r.index];
				if (i.parent && (i.parent === a || a.children?.length) || n.pos === "into" && a.children?.length) return;
			}
			wa("nav", () => {
				let r = R(k).nav.items, i = fu(t), a = fu(e), o = i.list[i.index], s = a.list[a.index];
				if (o !== s) {
					if (i.list.splice(i.index, 1), i.parent && i.parent.children.length === 0 && (delete i.parent.children, !i.parent.page && !i.parent.href && (i.parent.page = R(k).pages[0].id)), n.pos === "into") s.children ??= [], s.children.push(o);
					else {
						let e = a.parent ? a.parent.children : r, t = e.indexOf(s) + +(n.pos === "after");
						e.splice(t, 0, o);
					}
					!o.page && o.href == null && !o.children?.length && (o.page = R(k).pages[0].id);
				}
			}), M(lu, "");
		}
	}
	let bu = "<svg width=\"10\" height=\"16\" viewBox=\"0 0 10 16\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"3\" cy=\"3\" r=\"1.3\"/><circle cx=\"7\" cy=\"3\" r=\"1.3\"/><circle cx=\"3\" cy=\"8\" r=\"1.3\"/><circle cx=\"7\" cy=\"8\" r=\"1.3\"/><circle cx=\"3\" cy=\"13\" r=\"1.3\"/><circle cx=\"7\" cy=\"13\" r=\"1.3\"/></svg>";
	function xu() {
		wa("nav", () => {
			R(k).nav.items.push({
				label: J("seed.link"),
				page: R(k).pages[0].id
			});
		});
	}
	function Su(e) {
		wa("nav", () => {
			let t = R(k).nav.items[e];
			t.children ??= [], t.children.push({
				label: J("seed.link"),
				page: R(k).pages[0].id
			});
		});
	}
	function Cu(e, t, n) {
		wa(`edit:nav-child-label-${e}-${t}`, () => {
			R(k).nav.items[e].children[t].label = n;
		});
	}
	function wu(e, t, n) {
		wa("nav", () => {
			let r = R(k).nav.items[e].children[t];
			n === "__href" ? (delete r.page, r.href = r.href ?? "https://") : (r.page = n, delete r.href);
		});
	}
	function Tu(e, t, n) {
		wa(`edit:nav-child-href-${e}-${t}`, () => {
			R(k).nav.items[e].children[t].href = n;
		});
	}
	function Eu(e, t, n) {
		let r = t + n, i = R(k).nav.items[e].children;
		r < 0 || r >= i.length || wa("nav", () => {
			[i[t], i[r]] = [i[r], i[t]];
		});
	}
	function Du(e, t) {
		wa("nav", () => {
			let n = R(k).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = R(k).pages[0].id));
		});
	}
	function Ou(e, t) {
		wa(`edit:theme-color-${e}`, () => {
			R(k).theme.tokens.color[e] = t, R(k).theme.alt?.auto && (R(k).theme.alt.tokens.color = Hu());
		});
	}
	function ku(e, t) {
		return e === "accent-text" ? C(Zu(t.accent ?? "#000000", t)) : t.bg;
	}
	let Au = /* @__PURE__ */ A(() => !R(k)?.theme?.tokens?.color?.["accent-text"] && !R(k)?.theme?.alt?.tokens?.color?.["accent-text"]), ju = /* @__PURE__ */ j(null), Mu = /* @__PURE__ */ j(!1), Nu = /* @__PURE__ */ j(!1), Pu = (e) => e.length > 0 && [...e].every((e) => e.open);
	function Fu() {
		let e = R(ju)?.querySelectorAll("details.group") ?? [];
		M(Mu, e.length > 0), M(Nu, Pu(e), !0);
	}
	Dn(() => {
		R(jt), br().then(Fu);
	});
	function Iu() {
		let e = !R(Nu);
		R(ju)?.querySelectorAll("details.group").forEach((t) => {
			t.open = e;
		}), Fu();
	}
	function Lu(e) {
		for (let t of e.querySelectorAll("details.group")) {
			let e = t.querySelector(":scope > summary");
			if (!e || e.querySelector(".fold-sub")) continue;
			let n = () => t.querySelectorAll(":scope > .group-items details.group");
			if (!n().length) continue;
			let r = document.createElement("button");
			r.type = "button", r.className = "fold-sub fold-toggle", r.innerHTML = X.foldToggle;
			let i = () => {
				let e = Pu(n());
				r.classList.toggle("collapse", e), r.title = J(e ? "ui.collapseSub" : "ui.expandSub"), r.setAttribute("aria-label", r.title);
			};
			r.addEventListener("click", (e) => {
				e.preventDefault(), e.stopPropagation();
				let a = !r.classList.contains("collapse");
				t.open = !0, n().forEach((e) => {
					e.open = a;
				}), i();
			}), t.addEventListener("toggle", i, !0), i(), e.appendChild(r);
		}
	}
	Dn(() => {
		let e = R(ju);
		if (!e) return;
		let t = new MutationObserver(() => {
			Lu(e), Fu();
		});
		return t.observe(e, {
			childList: !0,
			subtree: !0
		}), e.addEventListener("toggle", Fu, !0), Lu(e), () => {
			t.disconnect(), e.removeEventListener("toggle", Fu, !0);
		};
	});
	function Ru(e) {
		wa("edit:theme-color-accent-text", () => {
			e ? (delete R(k).theme.tokens.color["accent-text"], R(k).theme.alt?.tokens?.color && delete R(k).theme.alt.tokens.color["accent-text"]) : (R(k).theme.tokens.color["accent-text"] = ku("accent-text", R(ai)), R(k).theme.alt?.auto && (R(k).theme.alt.tokens.color = Hu()));
		});
	}
	function zu(e, t) {
		wa("theme", () => {
			R(k).theme.tokens.font[e] = t;
		});
	}
	function Bu(e, t) {
		wa("theme", () => {
			R(k).theme.tokens.radius[e] = t;
		});
	}
	function Vu(e) {
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
	function Hu() {
		return Object.fromEntries(Object.entries(R(k).theme.tokens.color).map(([e, t]) => [e, Vu(t)]));
	}
	function Wu(e, t) {
		wa(`edit:theme-alt-${e}`, () => {
			R(k).theme.alt.tokens.color[e] = t, R(k).theme.alt.auto = !1;
		});
	}
	function Gu(e) {
		wa("theme", () => {
			e === "light" ? delete R(k).theme.scheme : R(k).theme.scheme = e;
		});
	}
	function Ku(e) {
		wa("theme", () => {
			e ? R(k).theme.alt = {
				auto: !0,
				tokens: { color: Hu() }
			} : delete R(k).theme.alt;
		});
	}
	function qu(e) {
		wa("theme", () => {
			R(k).theme.alt ??= { tokens: { color: Hu() } }, R(k).theme.alt.auto = e, e && (R(k).theme.alt.tokens.color = Hu());
		});
	}
	function Ju(e) {
		let t = R(k).theme.tokens.font[e];
		return [...Hd.some(([, e]) => e === t) ? [] : [[t, J("opt.customFont")]], ...Hd.map(([e, t]) => [t, J(e)])];
	}
	let Yu = (e) => parseInt(e, 10) || 0;
	function Xu(e, t) {
		Bu(e, `${t}px`);
	}
	let Zu = (e, t) => e && t && t[e] ? t[e] : e, Qu = [
		"bg",
		"surface",
		"text",
		"accent",
		"accent-text"
	], $u = [
		{
			id: "well",
			name: J("themePreset.well.name"),
			note: J("themePreset.well.note"),
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
			id: "stone",
			name: J("themePreset.stone.name"),
			note: J("themePreset.stone.note"),
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
			id: "plum",
			name: J("themePreset.plum.name"),
			note: J("themePreset.plum.note"),
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
			name: J("themePreset.rose.name"),
			note: J("themePreset.rose.note"),
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
			id: "ocean",
			name: J("themePreset.ocean.name"),
			note: J("themePreset.ocean.note"),
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
			id: "night",
			name: J("themePreset.night.name"),
			note: J("themePreset.night.note"),
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
	function ed(e) {
		wa("theme", () => {
			let t = e.scheme === "dark", n = t ? e.dark : e.light, r = t ? e.light : e.dark;
			for (let e of Qu) R(k).theme.tokens.color[e] = n[e];
			t ? R(k).theme.scheme = "dark" : delete R(k).theme.scheme, R(k).theme.alt = { tokens: { color: { ...r } } };
		});
	}
	let td = /* @__PURE__ */ A(() => {
		if (!R(k)) return null;
		let e = R(k).theme.tokens.color, t = R(k).theme.alt?.tokens?.color ?? {}, n = R(k).theme.scheme === "dark";
		return $u.find((r) => {
			let i = n ? r.dark : r.light, a = n ? r.light : r.dark;
			return Qu.every((n) => e[n] === i[n] && t[n] === a[n]);
		})?.id ?? null;
	}), nd = 0;
	async function rd() {
		R(le) && (nd = R(ju)?.scrollTop ?? 0), M(le, !R(le)), We?.sendChrome(R(le)), R(le) || M(Yt, null), R(le) && (await br(), requestAnimationFrame(() => {
			R(ju) && (R(ju).scrollTop = nd);
		}));
	}
	function id(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (it(`edit:${e.blockId}`), n.props = e.props, O.save(), Xe(), R(Gt)?.blockId === e.blockId && qt(), e.rerender && We?.sendSection(R(T), t), M(te, ""), pn(t.id, n));
	}
	function ad(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		it(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop", i = n.frames.desktop?.w;
		n.frames[r] = e.frame, r === "desktop" && He(t, "desktop-changed-after-mobile"), O.save(), Xe(), R(Gt)?.blockId === e.blockId && qt(), r === "desktop" && e.frame?.w !== i ? pn(t.id, n) : r === "mobile" && _n(t.id, n);
	}
	function od(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (n?.frames?.desktop && n.frames.desktop.h !== e.h) {
			if (e.fit) {
				R(xe) === "desktop" && e.seq === dn.get(e.blockId) && sd(t, n, e.h);
				return;
			}
			O.amendBaseline((t) => {
				let n = t.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
				n?.frames?.desktop && (n.frames.desktop.h = e.h);
			}), O.hasDraft() && it(`edit:${e.blockId}`), n.frames.desktop.h = e.h, O.save(), Xe(), R(Gt)?.blockId === e.blockId && qt();
		}
	}
	function sd(e, t, n) {
		let r = Bl(e.blocks, t.id, n), i = {};
		t.frames.desktop = {
			...t.frames.desktop,
			h: n
		}, i[t.id] = t.frames.desktop;
		for (let [t, n] of r) {
			let r = e.blocks.find((e) => e.id === t);
			r?.frames?.desktop && (r.frames.desktop = {
				...r.frames.desktop,
				y: n
			}, i[t] = r.frames.desktop);
		}
		He(e, "block-edited"), O.save(), Xe(), R(Gt)?.blockId === t.id && qt(), We?.sendFrames(e.id, Ge(i));
	}
	function cd(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			if (it("mobile-reset"), e.blockId) {
				let n = t.blocks.find((t) => t.id === e.blockId);
				n && (n.frames.mobile = null);
			} else for (let e of t.blocks) e.frames.mobile = null;
			!Ve(t) && t.responsive?.mobile && (t.responsive.mobile.attention = null), O.save(), Xe(), Re(), We?.sendSection(R(T), t);
		}
	}
	function ld(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && typeof e.mobileOrder == "number" && (it("mobile-order"), n.mobileOrder = e.mobileOrder, O.save(), Xe(), We?.sendSection(R(T), t));
	}
	function ud(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (it("review-done"), t.responsive.mobile.attention = null, O.save(), Xe(), Re());
	}
	function dd(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (it("block-flag"), typeof e.decor == "boolean" && (n.decor = e.decor), typeof e.hideMobile == "boolean" && (n.hideMobile = e.hideMobile), O.save(), Xe(), typeof e.hideMobile == "boolean" && R(xe) === "mobile" && We?.sendSection(R(T), t), R(Gt)?.blockId === e.blockId && qt());
	}
	function fd(e) {
		it("add-section"), e.section.id || (e.section.id = Ch("sec")), O.data.sections.splice(e.index, 0, e.section), O.save(), Xe(), We?.sendPage(R(T), O.data), M(Rn, e.section.id, !0), Kn(e.section), M(jt, "properties");
	}
	function pd(e) {
		let t = O.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (it("move-section"), [t[n], t[r]] = [t[r], t[n]], O.save(), Xe(), We?.sendPage(R(T), O.data));
	}
	function md(e) {
		it("delete-section"), e.sectionId === R(Rn) && (M(Rn, null), M(zn, null)), R(Gt)?.sectionId === e.sectionId && M(Gt, null), O.data.sections = O.data.sections.filter((t) => t.id !== e.sectionId), O.save(), Xe(), We?.sendPage(R(T), O.data);
	}
	function hd(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			it("section-size"), t.size = {
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
			e.moves?.length && (He(t, "section-height"), R(Gt)?.sectionId === e.sectionId && qt()), e.sectionId === R(Rn) && M(Bn, e.minHeight, !0), O.save(), Xe();
		}
	}
	function gd(e) {
		let t = O.data.sections.find((t) => t.id === e.fromSectionId), n = O.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		t && n && r && (it(e.groupKey ? `edit:${e.groupKey}` : "move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), He(t, "block-moved"), He(n, "block-moved"), O.save(), Xe(), Re(), We?.sendSection(R(T), t), We?.sendSection(R(T), n), R(Gt)?.blockId === e.blockId && (M(Gt, {
			...R(Gt),
			sectionId: e.toSectionId
		}, !0), qt()));
	}
	function _d(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		if (!t) return;
		let n = e.blockIds ?? [e.blockId];
		it("delete-block"), t.blocks = t.blocks.filter((e) => !n.includes(e.id)), n.includes(R(Gt)?.blockId) && M(Gt, null), He(t, "block-deleted"), O.save(), Xe(), We?.sendSection(R(T), t);
	}
	let vd = {
		text: {
			type: "text",
			props: {
				html: J("seed.text"),
				align: "left"
			},
			w: 33,
			h: 28
		},
		"text-box": {
			type: "text",
			props: {
				html: J("seed.textBox"),
				align: "left",
				box: !0
			},
			w: 30,
			h: 150
		},
		button: {
			type: "button",
			props: {
				label: J("seed.newButton"),
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
		map: {
			type: "map",
			props: {
				location: "",
				zoom: 15
			},
			w: 60,
			h: 360
		},
		form: {
			type: "form",
			props: {
				recipient: "",
				subject: "",
				mode: "mailto",
				endpoint: "",
				submitLabel: J("form.sendDefault"),
				successText: J("form.thanksDefault"),
				fields: th()
			},
			w: 50,
			h: 380
		},
		calendar: {
			type: "calendar",
			props: {
				sources: [],
				view: "list",
				limit: 6,
				showCategories: !1,
				showSubscribe: !1,
				showSignup: !1
			},
			w: 60,
			h: 320
		},
		"calendar-cards": {
			type: "calendar",
			props: {
				sources: [],
				view: "cards",
				limit: 6,
				showCategories: !1,
				showSubscribe: !1,
				showSignup: !1
			},
			w: 88,
			h: 320
		},
		"calendar-month": {
			type: "calendar",
			props: {
				sources: [],
				view: "month",
				limit: 6,
				showCategories: !1,
				showSubscribe: !1,
				showSignup: !1
			},
			w: 88,
			h: 480
		},
		"calendar-next": {
			type: "calendar",
			props: {
				sources: [],
				view: "next",
				limit: 6,
				nextCount: 3,
				laterCount: 3,
				showCategories: !1,
				showSubscribe: !1,
				showSignup: !1
			},
			w: 40,
			h: 180
		},
		"calendar-agenda": {
			type: "calendar",
			props: {
				sources: [],
				view: "agenda",
				limit: 8,
				showCategories: !1,
				showSubscribe: !1,
				showSignup: !1
			},
			w: 60,
			h: 360
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
		collection: {
			type: "collection",
			props: {
				collection: null,
				view: "cards",
				limit: 6,
				newestFirst: !0
			},
			w: 88.89,
			h: 200
		},
		gallery: {
			type: "gallery",
			props: {
				images: [],
				view: "grid",
				columns: 3,
				gap: 12,
				radius: "md",
				lightbox: !0,
				interval: 5,
				width: "canvas"
			},
			w: 88.89,
			h: 320
		},
		faq: {
			type: "faq",
			props: {
				items: [
					{
						q: J("seed.faq.q1"),
						a: J("seed.faq.answer")
					},
					{
						q: J("seed.faq.q2"),
						a: J("seed.faq.answer")
					},
					{
						q: J("seed.faq.q3"),
						a: J("seed.faq.answer")
					}
				],
				multi: !1
			},
			w: 50,
			h: 220
		},
		timeline: {
			type: "timeline",
			props: {
				items: [
					{
						year: "2019",
						title: J("seed.timeline.t1"),
						text: J("seed.timeline.text")
					},
					{
						year: "2022",
						title: J("seed.timeline.t2"),
						text: J("seed.timeline.text")
					},
					{
						year: "2026",
						title: J("seed.timeline.t3"),
						text: J("seed.timeline.text")
					}
				],
				variant: "left",
				marker: "filled",
				accent: null
			},
			w: 42,
			h: 260
		},
		quote: {
			type: "quote",
			props: {
				text: J("seed.quoteBlock.text"),
				attribution: J("seed.quoteBlock.name"),
				role: J("seed.quoteBlock.role"),
				variant: "large",
				image: "",
				accent: null
			},
			w: 44,
			h: 180
		},
		stats: {
			type: "stats",
			props: {
				value: "4800",
				prefix: "",
				suffix: "+",
				label: J("seed.statsBlock.label"),
				countUp: !0
			},
			w: 20,
			h: 90
		},
		ribbon: {
			type: "ribbon",
			props: {
				items: [
					J("seed.ribbonBlock.a"),
					J("seed.ribbonBlock.b"),
					J("seed.ribbonBlock.c")
				],
				sep: "dot",
				speed: 60,
				direction: "left",
				pauseOnHover: !0,
				width: "canvas",
				variant: "band",
				size: "md",
				caps: !1,
				tilt: 0,
				fade: !0,
				gap: 40
			},
			w: 88.89,
			h: 70
		},
		table: {
			type: "table",
			props: {
				header: !0,
				striped: !1,
				lines: "rows",
				rows: [
					[
						J("seed.table.h1"),
						J("seed.table.h2"),
						J("seed.table.h3")
					],
					[
						J("seed.table.r1c1"),
						J("seed.table.r1c2"),
						""
					],
					[
						J("seed.table.r2c1"),
						J("seed.table.r2c2"),
						""
					]
				]
			},
			w: 50,
			h: 160
		},
		share: {
			type: "share",
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
		countdown: {
			type: "countdown",
			props: {
				target: (() => {
					let e = new Date(Date.now() + 2592e6), t = (e) => String(e).padStart(2, "0");
					return `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}T18:00`;
				})(),
				doneText: J("seed.countdown.done"),
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
		product: {
			type: "product",
			props: {
				collection: null,
				limit: 0,
				columns: 0,
				currency: "kr"
			},
			w: 88.89,
			h: 300
		},
		cart: {
			type: "cart",
			props: {
				variant: "button",
				href: "",
				currency: "kr"
			},
			w: 16,
			h: 48
		},
		checkout: {
			type: "checkout",
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
	function yd(e) {
		let t = vd[e];
		return t ? {
			id: Ch("blk"),
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
	function bd(e) {
		We ? We.sendPlaceBlock(e) : xd(Ci()?.id, e);
	}
	function xd(e, t) {
		let n = O.data.sections.find((t) => t.id === e) ?? O.data.sections[0];
		if (!n) return;
		it("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), He(n, "block-added"), O.save(), Xe(), We?.sendSection(R(T), n), pn(n.id, t);
	}
	function Sd(e, t, n, r) {
		let i = O.data.sections.find((t) => t.id === e);
		if (!i || !t?.length) return;
		it("add-blocks");
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
		}), He(i, "block-added"), O.save(), Xe(), We?.sendSection(R(T), i);
	}
	function Cd(e) {
		bd(yd(e));
	}
	let wd = {
		list: "calendar",
		cards: "calendar-cards",
		month: "calendar-month",
		next: "calendar-next",
		agenda: "calendar-agenda",
		week: "calendar-month",
		day: "calendar",
		year: "calendar-month"
	};
	function Td(e) {
		let t = pc(e), n = yd(wd[t.view] ?? "calendar");
		n && (n.props = {
			...n.props,
			...t.view ? { view: t.view } : {},
			...t.id === "plain" ? {} : { design: t.id },
			...t.view === "next" ? {
				nextCount: 3,
				laterCount: 3
			} : {}
		}, bd(n));
	}
	let Ed = /* @__PURE__ */ j(sn([]));
	function Dd(e, t = {}) {
		let n = Ge(e);
		bd({
			id: Ch("blk"),
			type: n.type,
			version: n.version ?? 1,
			decor: !1,
			props: {
				...n.defaults ?? {},
				...Ge(t)
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
	let Od = /* @__PURE__ */ j("");
	function kd() {
		let e = [
			{
				label: J("blocks.text"),
				act: "block",
				kind: "text"
			},
			{
				label: J("ui.textBox"),
				act: "block",
				kind: "text-box"
			},
			{
				label: J("blocks.button"),
				act: "block",
				kind: "button"
			},
			{
				label: J("blocks.image"),
				act: "image"
			},
			{
				label: J("blocks.video"),
				act: "block",
				kind: "video"
			},
			{
				label: J("blocks.icon"),
				act: "block",
				kind: "icon"
			},
			{
				label: J("blocks.map"),
				act: "block",
				kind: "map"
			},
			{
				label: J("blocks.form"),
				act: "block",
				kind: "form"
			},
			{
				label: `${J("blocks.calendar")}: ${J("calendar.viewList")}`,
				act: "block",
				kind: "calendar"
			},
			{
				label: `${J("blocks.calendar")}: ${J("calendar.viewCards")}`,
				act: "block",
				kind: "calendar-cards"
			},
			{
				label: `${J("blocks.calendar")}: ${J("calendar.viewMonth")}`,
				act: "block",
				kind: "calendar-month"
			},
			{
				label: `${J("blocks.calendar")}: ${J("calendar.viewNext")}`,
				act: "block",
				kind: "calendar-next"
			},
			{
				label: `${J("blocks.calendar")}: ${J("calendar.viewAgenda")}`,
				act: "block",
				kind: "calendar-agenda"
			},
			...gc().flatMap((e) => e.designs).filter((e) => e.id !== "plain").map((e) => ({
				label: `${J("blocks.calendar")}: ${J(e.labelKey)}`,
				act: "calendarDesign",
				design: e.id
			})),
			{
				label: J("blocks.collection"),
				act: "block",
				kind: "collection"
			},
			{
				label: J("blocks.faq"),
				act: "block",
				kind: "faq"
			},
			{
				label: J("blocks.timeline"),
				act: "block",
				kind: "timeline"
			},
			{
				label: J("blocks.quote"),
				act: "block",
				kind: "quote"
			},
			{
				label: J("blocks.stats"),
				act: "block",
				kind: "stats"
			},
			{
				label: J("blocks.ribbon"),
				act: "block",
				kind: "ribbon"
			},
			{
				label: J("blocks.table"),
				act: "block",
				kind: "table"
			},
			{
				label: J("blocks.share"),
				act: "block",
				kind: "share"
			},
			{
				label: J("blocks.countdown"),
				act: "block",
				kind: "countdown"
			},
			{
				label: J("blocks.audio"),
				act: "block",
				kind: "audio"
			},
			{
				label: J("blocks.product"),
				act: "block",
				kind: "product"
			},
			{
				label: J("blocks.cart"),
				act: "block",
				kind: "cart"
			},
			{
				label: J("blocks.checkout"),
				act: "block",
				kind: "checkout"
			},
			{
				label: J("ui.emptyGallery"),
				act: "block",
				kind: "gallery"
			},
			{
				label: J("ui.galleryWithImages"),
				act: "galleryImages"
			},
			{
				label: J("shape.line"),
				act: "block",
				kind: "shape-line"
			},
			{
				label: J("shape.arrow"),
				act: "block",
				kind: "shape-arrow"
			},
			{
				label: J("shape.circle"),
				act: "block",
				kind: "shape-circle"
			},
			{
				label: J("shape.rect"),
				act: "block",
				kind: "shape-rect"
			},
			{
				label: J("shape.triangle"),
				act: "block",
				kind: "shape-triangle"
			}
		];
		for (let t of R(Z)) {
			let n = Zs[t]?.data?.mal;
			n?.kind === "blocks" && e.push({
				label: n.name,
				act: "template",
				id: t
			});
		}
		for (let t of R(Ed)) if (t.variants?.length) for (let n of t.variants) e.push({
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
	function Ad(e) {
		e.act === "block" ? Cd(e.kind) : e.act === "calendarDesign" ? Td(e.design) : e.act === "plugin" ? Dd(e.entry, e.props ?? {}) : e.act === "template" && We?.sendInsertTemplate(e.id);
	}
	function jd(e) {
		let t = yd(e.kind);
		if (t) {
			if (e.at && typeof e.at.x == "number" && typeof e.at.y == "number") {
				let n = O.data.sections.find((t) => t.id === e.sectionId)?.grid ?? R(k).grid, r = iy({
					x: e.at.x,
					y: e.at.y,
					w: t.frames.desktop.w,
					h: t.frames.desktop.h,
					grid: n
				});
				t.frames.desktop.x = r.x, t.frames.desktop.y = r.y;
			} else t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40;
			xd(e.sectionId, t), We?.sendSelect(t.id), e.kind === "image" && E(J("status.imageBlockAdded")), e.kind === "gallery" && E(J("status.galleryBlockAdded"));
		}
	}
	async function Md(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		E(J("status.compressingImage"));
		let n;
		try {
			n = await Er(t);
		} catch (e) {
			E(Dr(e), "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (R(oe)?.clientWidth ?? 1280));
		bd({
			id: Ch("blk"),
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: no(t.name).replaceAll("-", " "),
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
		}), n.bytes > 4e5 ? E(J("status.imageLarge", { kb: Math.round(n.bytes / 1024) }), "error") : E("");
	}
	async function Nd(e) {
		let t = [], n = 0, r = 0;
		for (let i of e) try {
			let e = await Er(i);
			e.bytes > 4e5 && (r += 1), t.push({
				src: e.dataUrl,
				alt: no(i.name).replaceAll("-", " "),
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
	function Pd(e, t, n) {
		t ? E(J("status.imagesReadFailed", { n: t }), "error") : n ? E(J("status.imagesLarge", { n }), "error") : E(e ? "" : J("status.noImagesAdded"));
	}
	async function Fd(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		E(J("status.compressingImages"));
		let { images: n, failed: r, big: i } = await Nd(t);
		n.length && tn("gallery-add", (e) => {
			e.props.images.push(...n);
		}), Pd(n.length, r, i);
	}
	async function Id(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		E(J("status.compressingImages"));
		let { images: n, failed: r, big: i } = await Nd(t);
		if (!n.length) {
			Pd(0, r, i);
			return;
		}
		let a = yd("gallery");
		a.props.images = n, bd(a), Pd(n.length, r, i);
	}
	function Ld(e, t) {
		tn("gallery-move", (n) => {
			let r = e + t;
			r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
		});
	}
	function Rd(e) {
		tn("gallery-remove", (t) => {
			t.props.images.splice(e, 1);
		});
	}
	function zd(e, t, n) {
		tn(`edit:${R(Gt).blockId}:img${e}-${t}`, (r) => {
			r.props.images[e][t] = n;
		});
	}
	function Bd(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/") && !i?.startsWith("data:audio/") && !i?.startsWith("data:video/")) return;
		let a = i.split(",", 2)[1], o = `media/${no(n || "image")}-${ro(a)}.${to(i)}`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function Vd(e, t) {
		Bd(e, "image", e.title, t);
		for (let n of e.colors ?? []) Bd(n, "image", `${e.title}-${n.name}`, t);
	}
	function Wd(e, t) {
		for (let n of e?.layers ?? []) {
			if (n.type === "image" && Bd(n.props, "src", "background", t), n.type === "slideshow") for (let e of n.props.images ?? []) Bd(e, "src", "background", t);
			n.type === "video" && (Bd(n.props, "src", "video", t), Bd(n.props, "poster", "plakat", t));
		}
	}
	function Gd(e, t) {
		if (e.type === "image" && Bd(e.props, "src", e.props.alt, t), e.type === "icon" && Bd(e.props, "image", "ikon", t), e.type === "gallery") for (let n of e.props.images ?? []) Bd(n, "src", n.alt || "gallery", t);
		e.type === "audio" && Bd(e.props, "src", e.props.title || "lyd", t), e.type === "video" && (Bd(e.props, "src", e.props.title || "video", t), Bd(e.props, "poster", "poster", t));
	}
	function Kd(e, t) {
		Wd(e.background, t);
		for (let n of e.blocks) Gd(n, t);
	}
	function qd(e) {
		let t = [];
		e.meta?.og && Bd(e.meta.og, "image", "share", t);
		for (let n of e.sections) Kd(n, t);
		return t;
	}
	function Jd(e) {
		let t = [], n = e.nav?.logo;
		if (n?.type === "image" && Bd(n, "value", "logo", t), n?.type === "both" && Bd(n, "image", "logo", t), e.nav?.style && Bd(e.nav.style, "image", "menu", t), Wd(e.nav?.style?.background, t), Wd(e.footer?.background, t), e.footer?.brand && Bd(e.footer.brand, "logo", "footer-logo", t), e.nav?.launcher) {
			Bd(e.nav.launcher, "image", "snarvei", t);
			for (let n of e.nav.launcher.links ?? []) Bd(n, "image", "snarvei", t);
		}
		return Bd(e.site, "icon", "ikon", t), t;
	}
	let Yd = /* @__PURE__ */ j(!1), Xd = /* @__PURE__ */ j(null);
	function Zd() {
		M(Yd, !R(Yd));
	}
	function Qd() {
		M(Yd, !1);
		try {
			$d(), E(J("ui.discarded"), "info");
		} catch (e) {
			console.error("Urd: discard failed", e), E(String(e?.message ?? e), "error");
		}
	}
	Dn(() => {
		if (!R(Yd)) return;
		let e = (e) => {
			if (!R(Xd)?.contains(e.target)) {
				M(Yd, !1);
				return;
			}
			e.target instanceof Element && e.target.closest(".discard-confirm") && (e.preventDefault(), e.stopPropagation(), Qd());
		}, t = (e) => {
			e.key === "Escape" && M(Yd, !1);
		}, n = !1, r = (e) => {
			n = !!R(Xd)?.contains(e.target);
		}, i = () => {
			n = !1;
		}, a = () => {
			n || M(Yd, !1);
		};
		return window.addEventListener("pointerdown", r, !0), window.addEventListener("pointerup", i, !0), window.addEventListener("click", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", a), () => {
			window.removeEventListener("pointerdown", r, !0), window.removeEventListener("pointerup", i, !0), window.removeEventListener("click", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", a);
		};
	});
	function $d() {
		it("discard");
		for (let e of R(k).pages) e.id !== R(T) && !Je.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = O.reset();
		if (Ue.reset(), Lc && (Lc.reset(), Yc()), Bs) {
			Bs.reset(), M(Ws, [...Bs.data.samlinger ?? []], !0);
			for (let e of Object.keys(Vs)) R(Ws).includes(e) ? Vs[e].reset() : delete Vs[e];
			cc();
		}
		if (Xs) {
			Xs.reset(), M(Z, [...Xs.data.maler ?? []], !0);
			for (let e of Object.keys(Zs)) R(Z).includes(e) ? Zs[e].reset() : (localStorage.removeItem(`urd-draft-template-${e}`), localStorage.removeItem(`urd-draft-mal-${e}`), delete Zs[e]);
			tc();
		}
		Ke(), M(ce, {
			snap: !0,
			...R(k).grid
		}, !0), Xe(), M(te, ""), qe(), R(k).pages.some((e) => e.id === R(T)) ? We?.sendPage(R(T), e) : ra(R(k).pages[0].id);
	}
	async function ef() {
		if (Bi) {
			E(J("status.revertReloadBeforePublish"), "error");
			return;
		}
		if (R(Yi)) {
			E(J("update.publishBlocked"), "error");
			return;
		}
		E(J("status.publishing"));
		let e = [], t = [], n = [], r = [];
		for (let i of R(k).pages) {
			let a = `urd-draft-${i.id}`, o = Je.has(i.id) || !R(w).pages.some((e) => e.id === i.id), s = null;
			if (i.id === R(T) && (O.hasDraft() || o)) s = O.data;
			else if (i.id !== R(T)) {
				let e = localStorage.getItem(a);
				if (e) try {
					s = _h(JSON.parse(e), Ue.data);
				} catch {}
			}
			if (!s && o && (s = na(i)), !s) continue;
			let c = JSON.parse(JSON.stringify(s));
			e.push(...qd(c)), e.push({
				path: i.file,
				content: JSON.stringify(c, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (Ue.hasDraft()) {
			let r = JSON.parse(JSON.stringify(R(k)));
			e.push(...Jd(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), e.push({
				path: "content/theme.css",
				content: Bg(r.theme),
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(R(w).theme, R(k).theme) || t.push(J("publish.part.theme")), i(R(w).nav, R(k).nav) || t.push(J("publish.part.nav")), i(R(w).footer, R(k).footer) || t.push(J("publish.part.footer")), i(R(w).pages, R(k).pages) || t.push(J("publish.part.pages")), i(R(w).grid, R(k).grid) || t.push(J("publish.part.grid")), (R(w).site.icon ?? null) !== (R(k).site.icon ?? null) && t.push(J("publish.part.icon"));
			let { icon: a, ...o } = R(w).site, { icon: s, ...c } = R(k).site;
			i(o, c) || t.push(J("publish.part.siteInfo"));
		}
		let i = Object.entries(Vs).filter(([, e]) => e.hasDraft());
		if (i.length || Bs?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) Vd(t, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), ug.includes(i.kind) && e.push({
					path: `content/samlinger/${t}.xml`,
					content: dg({
						title: i.name ?? t,
						origin: location.origin,
						path: `/content/samlinger/${t}.xml`,
						items: i.entries.map((e) => ({
							id: e.id,
							title: fc(e.title),
							text: fc(e.text),
							date: e.date,
							href: e.href
						}))
					}),
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (Bs?.hasDraft()) {
				e.push({
					path: "content/collections.json",
					content: JSON.stringify(Bs.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-collections", "urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/collections.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!R(Ws).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push(J("publish.part.collections"));
		}
		let a = Object.entries(Zs).filter(([, e]) => e.hasDraft());
		if (a.length || Xs?.hasDraft()) {
			for (let [t, r] of a) {
				let i = JSON.parse(JSON.stringify(r.data));
				i.section && Kd(i.section, e);
				for (let t of i.blocks ?? []) Gd(t, e);
				for (let t of i.page?.sections ?? []) Kd(t, e);
				e.push({
					path: `content/maler/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-mal-${t}`);
			}
			if (Xs?.hasDraft()) {
				e.push({
					path: "content/maler.json",
					content: JSON.stringify(Xs.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-templates", "urd-draft-maler");
				let t = { maler: [] };
				try {
					t = await (await fetch("/content/maler.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.maler ?? []) {
					let t = `content/maler/${n}.json`;
					!R(Z).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push(J("publish.part.templates"));
		}
		Lc?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(Lc.data, null, 2) + "\n",
			encoding: "utf-8"
		}), n.push("urd-draft-plugins"), t.push(J("publish.part.plugins")));
		try {
			let t = await (await fetch("/index.html")).text();
			for (let n of R(k).pages) n.path !== "/" && e.push({
				path: `${n.path.slice(1)}/index.html`,
				content: t,
				encoding: "utf-8"
			});
		} catch {}
		e.push({
			path: "sitemap.xml",
			content: cg(R(k).pages, location.origin),
			encoding: "utf-8"
		}), e.push({
			path: "robots.txt",
			content: lg(location.origin),
			encoding: "utf-8"
		});
		let o = new Set(e.map((e) => e.path)), s = (t) => {
			o.has(t) || e.push({
				path: t,
				delete: !0
			});
		};
		for (let e of R(w).pages) {
			let t = R(k).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && s(`${e.path.slice(1)}/index.html`) : (s(e.file), e.path !== "/" && s(`${e.path.slice(1)}/index.html`));
		}
		let c = await Mi(e);
		if (!c.ok) {
			E(J("status.publishAborted"), "error");
			return;
		}
		let l = {
			message: J("publish.commitMessage", { titles: t.join(", ") || J("publish.theSite") }),
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
			let { sha: t } = await u.json().catch(() => ({}));
			t ? Ai = t : ji(), qd(O.data), Jd(R(k));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) Je.add(e);
			if (M(w, JSON.parse(JSON.stringify(R(k))), !0), Ue = ga("urd-draft-site", () => R(w), ie), Ke(), Lc) {
				let e = JSON.parse(JSON.stringify(Lc.data));
				Lc = ga("urd-draft-plugins", () => e, ie), Yc();
			}
			if (Bs) {
				for (let e of Object.values(Vs)) for (let t of e.data.entries) Vd(t, []);
				let e = JSON.parse(JSON.stringify(Bs.data));
				Bs = ga("urd-draft-collections", () => e, ie, "urd-draft-samlinger"), Hs = {};
				for (let e of R(Ws)) {
					if (!Vs[e]) continue;
					let t = JSON.parse(JSON.stringify(Vs[e].data));
					Hs[e] = t, Vs[e] = ga(`urd-draft-collection-${e}`, () => t, ie, `urd-draft-samling-${e}`);
				}
				cc();
			}
			if (Xs) {
				for (let e of Object.values(Zs)) {
					e.data?.section && Kd(e.data.section, []);
					for (let t of e.data?.blocks ?? []) Gd(t, []);
					for (let t of e.data?.page?.sections ?? []) Kd(t, []);
				}
				let e = JSON.parse(JSON.stringify(Xs.data));
				Xs = ga("urd-draft-templates", () => e, ie, "urd-draft-maler"), Qs = {};
				for (let e of R(Z)) {
					if (!Zs[e]) continue;
					let t = JSON.parse(JSON.stringify(Zs[e].data));
					Qs[e] = t, Zs[e] = ga(`urd-draft-template-${e}`, () => t, ie, `urd-draft-mal-${e}`);
				}
				tc();
			}
			M(ce, {
				snap: !0,
				...R(k).grid
			}, !0);
			let i = JSON.parse(JSON.stringify(O.data));
			O = ga(`urd-draft-${R(T)}`, () => i, ie), Je.has(R(T)) && ae(`urd-draft-${R(T)}`, JSON.stringify(i)), Xe(), E(J("status.published"), "info"), Ki(e);
		} else if (u?.status === 401) {
			let e = await u.json().catch(() => null);
			E(e?.code === "loginExpired" ? J("status.loginExpired") : J("status.loginRequired", { reason: ca(e) ?? J("status.unknownReason") }), "error"), await ki();
		} else u?.status === 403 ? E(ca(await u.json().catch(() => null)) ?? J("status.noPublishAccess"), "error") : u?.status === 409 ? E(J("status.publishRace"), "error") : E(u ? ca(await u.json().catch(() => null)) ?? J("status.publishFailed") : J("status.publishUnavailable"), "error");
	}
	ht();
	function tf() {
		Cn = null;
	}
	Qe("urd-editor", {
		get selectedBlock() {
			return R(Gt);
		},
		get siteDraft() {
			return R(k);
		},
		get viewMode() {
			return R(xe);
		},
		get sections() {
			return O?.data.sections ?? [];
		},
		get collectionIds() {
			return R(Ws);
		},
		get collectionsView() {
			return R(Gs);
		},
		get pluginBlocks() {
			return R(Ed);
		},
		get bridge() {
			return We;
		},
		blockLabel: (e) => Ln[e] ?? e,
		blockEntranceOptions: () => ui,
		hoverOptions: () => di,
		isEntrance: ci,
		themeSwatches: $r,
		siteCalendars: No,
		siteCalendarById: Po,
		addSiteCalendar: Fo,
		newSeed: Rr,
		setStatus: E,
		mutateBlock: tn,
		setBlockProp: nn,
		setBlockProps: rn,
		setBlockFrame: An,
		setBlockFit: xn,
		setBlockFitMin: Sn,
		setBlockSize: wn,
		endSizeGesture: tf,
		setBlockSizeBound: Tn,
		setBlockHeightMode: En,
		setBlockHeightAlign: On,
		canStretch: kn,
		setBlockHideMobile: In,
		setBlockDecor: Fn,
		setBlockAnimation: pi,
		setBlockHover: mi,
		setBlockAnimProp: hi,
		designWidth: jn,
		shapePx: Mn,
		setShapeSizePx: Nn,
		setBoxStyle: Pn,
		buttonTargets: an,
		setButtonTarget: on,
		openImageEditor: ln,
		compressOrTrim: Er,
		imageErrorText: Dr,
		setBlockVideoFile: Ar,
		setBlockVideoPoster: Mr,
		addGalleryImages: Fd,
		moveGalleryImage: Ld,
		removeGalleryImage: Rd,
		setGalleryImageField: zd,
		addCollectionEntry: xc,
		createCatalogForBlock: yc,
		openPanel: (e, t = {}) => {
			t.calendars && M(Ao, !0), M(jt, e, !0);
		},
		openCollection: (e) => {
			M(Ks, e, !0), M(jt, "collections");
		},
		openDesignPicker: () => {
			M(Zt, { mode: "set" }, !0);
		}
	});
	var nf = HS();
	jr("keydown", cn, mt), jr("pointerdown", cn, pt);
	var rf = P(nf), af = N(rf), of = (e) => {
		var t = Ky(), n = N(t);
		W(n, () => X.pencil);
		var r = I(n);
		D(t), L((e, n) => {
			q(t, "title", e), H(r, ` ${n ?? ""}`);
		}, [() => J("tip.backToEdit"), () => J("ui.edit")]), z("click", t, rd), V(e, t);
	};
	U(af, (e) => {
		R(le) || e(of);
	});
	var sf = I(af, 2);
	let cf;
	var lf = N(sf), uf = N(lf), df = (e) => {
		var t = rb(), n = P(t), r = F(n, !0), i = I(n, 2), a = N(i), o = (e) => {
			var t = Yy(), n = N(t);
			let r;
			var i = N(n);
			W(i, () => X[`device_${R(ye)}`]), W(I(i), () => X.caret), D(n);
			var a = I(n, 2), o = (e) => {
				var t = Jy();
				ni(t, 21, () => R(_e), (e) => e.id, (e, t) => {
					var n = qy();
					let r;
					var i = N(n);
					W(i, () => X[`device_${R(t).id}`]);
					var a = I(i);
					D(n), L((e, i) => {
						r = Ei(n, 1, "ghost", null, r, { active: R(ye) === R(t).id }), q(n, "title", e), H(a, ` ${i ?? ""}`);
					}, [() => ve(R(t)), () => J(`lbl.device.${R(t).id}`)]), z("click", n, () => {
						M(ye, R(t).id, !0), M(_a, null);
					}), V(e, n);
				}), D(t), V(e, t);
			};
			U(a, (e) => {
				R(_a) === "device" && e(o);
			}), D(t), L((e) => {
				r = Ei(n, 1, "ghost", null, r, { active: R(_a) === "device" }), q(n, "title", e);
			}, [() => J("lbl.group.device")]), z("click", n, () => M(_a, R(_a) === "device" ? null : "device", !0)), V(e, t);
		}, s = (e) => {
			var t = Zy(), n = P(t), r = F(n, !0), i = I(n, 2);
			ni(i, 21, () => R(_e), (e) => e.id, (e, t) => {
				var n = Xy();
				let r;
				W(n, () => X[`device_${R(t).id}`], !0), D(n), L((e) => {
					r = Ei(n, 1, "ghost", null, r, { active: R(ye) === R(t).id }), q(n, "title", e);
				}, [() => ve(R(t))]), z("click", n, () => M(ye, R(t).id, !0)), V(e, n);
			}), D(i), L((e) => H(r, e), [() => J("lbl.group.device")]), V(e, t);
		};
		U(a, (e) => {
			ya.device ? e(o) : e(s, -1);
		});
		var c = I(a, 2), l = (e) => {
			var t = $y(), n = N(t);
			let r;
			var i = N(n), a = F(i);
			W(I(i), () => X.caret), D(n);
			var o = I(n, 2), s = (e) => {
				var t = Qy(), n = N(t), r = N(n);
				W(r, () => X.minus, !0), D(r);
				var i = I(r, 2), a = F(i), o = I(i, 2);
				W(o, () => X.plus, !0), D(o), D(n);
				var s = I(n, 2);
				let c;
				var l = N(s);
				W(l, () => X.fit);
				var u = I(l);
				D(s), D(t), L((e, t, n, l, d, f) => {
					q(r, "title", e), q(i, "title", t), H(a, `${n ?? ""}%`), q(o, "title", l), c = Ei(s, 1, "ghost", null, c, { active: R(Te) === "fit" }), q(s, "title", d), H(u, ` ${f ?? ""}`);
				}, [
					() => J("tip.zoomOut"),
					() => J("tip.zoomCurrent"),
					() => Math.round(R(je) * 100),
					() => J("tip.zoomIn"),
					() => J("tip.zoomFit"),
					() => J("lbl.zoom.fit")
				]), z("click", r, () => Me(-1)), z("click", o, () => Me(1)), z("click", s, () => M(Te, "fit")), V(e, t);
			};
			U(o, (e) => {
				R(_a) === "zoom" && e(s);
			}), D(t), L((e, t) => {
				r = Ei(n, 1, "ghost", null, r, { active: R(_a) === "zoom" }), q(n, "title", e), H(a, `${t ?? ""}%`);
			}, [() => J("lbl.group.zoom"), () => Math.round(R(je) * 100)]), z("click", n, () => M(_a, R(_a) === "zoom" ? null : "zoom", !0)), V(e, t);
		}, u = (e) => {
			var t = eb(), n = P(t), r = F(n, !0), i = I(n, 2), a = N(i);
			W(a, () => X.minus, !0), D(a);
			var o = I(a, 2), s = F(o), c = I(o, 2);
			W(c, () => X.plus, !0), D(c);
			var l = I(c, 2);
			let u;
			W(l, () => X.fit, !0), D(l), D(i), L((e, t, n, i, d, f) => {
				H(r, e), q(a, "title", t), q(o, "title", n), H(s, `${i ?? ""}%`), q(c, "title", d), u = Ei(l, 1, "ghost", null, u, { active: R(Te) === "fit" }), q(l, "title", f);
			}, [
				() => J("lbl.group.zoom"),
				() => J("tip.zoomOut"),
				() => J("tip.zoomCurrent"),
				() => Math.round(R(je) * 100),
				() => J("tip.zoomIn"),
				() => J("tip.zoomFit")
			]), z("click", a, () => Me(-1)), z("click", c, () => Me(1)), z("click", l, () => M(Te, "fit")), V(e, t);
		};
		U(c, (e) => {
			ya.zoom ? e(l) : e(u, -1);
		});
		var d = I(c, 2), f = (e) => {
			var t = Yy(), n = N(t);
			let r;
			var i = N(n);
			W(i, () => X.gridToggle), W(I(i), () => X.caret), D(n);
			var a = I(n, 2), o = (e) => {
				var t = tb(), n = N(t);
				let r;
				var i = N(n);
				W(i, () => X.gridToggle);
				var a = I(i);
				D(n);
				var o = I(n, 2);
				let s;
				var c = N(o);
				W(c, () => X.guides);
				var l = I(c);
				D(o), D(t), L((e, t, i, c) => {
					r = Ei(n, 1, "ghost", null, r, { active: R(xa) }), q(n, "title", e), H(a, ` ${t ?? ""}`), s = Ei(o, 1, "ghost", null, s, { active: R(oa) }), q(o, "title", i), H(l, ` ${c ?? ""}`);
				}, [
					() => J("tip.gridToggle"),
					() => J("lbl.view.grid"),
					() => J("tip.guides"),
					() => J("lbl.view.guides")
				]), z("click", n, Sa), z("click", o, ba), V(e, t);
			};
			U(a, (e) => {
				R(_a) === "view" && e(o);
			}), D(t), L((e) => {
				r = Ei(n, 1, "ghost", null, r, { active: R(_a) === "view" || R(xa) || R(oa) }), q(n, "title", e);
			}, [() => J("lbl.group.view")]), z("click", n, () => M(_a, R(_a) === "view" ? null : "view", !0)), V(e, t);
		}, p = (e) => {
			var t = nb(), n = P(t), r = F(n, !0), i = I(n, 2), a = N(i);
			let o;
			W(a, () => X.gridToggle, !0), D(a);
			var s = I(a, 2);
			let c;
			W(s, () => X.guides, !0), D(s), D(i), L((e, t, n) => {
				H(r, e), o = Ei(a, 1, "ghost", null, o, { active: R(xa) }), q(a, "title", t), c = Ei(s, 1, "ghost", null, c, { active: R(oa) }), q(s, "title", n);
			}, [
				() => J("lbl.group.view"),
				() => J("tip.gridToggle"),
				() => J("tip.guides")
			]), z("click", a, Sa), z("click", s, ba), V(e, t);
		};
		U(d, (e) => {
			ya.view ? e(f) : e(p, -1);
		}), D(i), Ui(i, (e) => M(va, e), () => R(va)), L((e, t) => {
			q(n, "title", e), H(r, t);
		}, [() => J("tip.switchPage"), () => Ye()?.title ?? ""]), z("click", n, () => Ut("pages")), V(e, t);
	};
	U(uf, (e) => {
		R(w) && e(df);
	});
	var ff = I(uf, 2), pf = (e) => {
		var t = ib(), n = N(t);
		W(n, () => X.phone);
		var r = I(n, 2), i = F(r, !0), a = F(I(r, 2), !0);
		D(t), L((e, n) => {
			q(t, "title", e), H(i, n), H(a, R(Le));
		}, [() => J("tip.attention"), () => J(R(Le) === 1 ? "ui.attentionOne" : "ui.attentionMany", { n: R(Le) })]), z("click", t, ze), V(e, t);
	};
	U(ff, (e) => {
		R(Le) > 0 && e(pf);
	}), D(lf);
	var mf = I(lf, 2), hf = N(mf), gf = (e) => {
		var t = ob(), n = N(t), r = F(N(n), !0);
		Oe(2), D(n);
		var i = I(n, 2), a = N(i);
		let o;
		var s = N(a);
		W(s, () => X.restore);
		var c = F(I(s), !0);
		D(a);
		var l = I(a, 2), u = (e) => {
			var t = ab(), n = N(t);
			W(n, () => X.restore);
			var r = I(n);
			D(t), L((e, n) => {
				q(t, "title", e), H(r, ` ${n ?? ""}`);
			}, [() => J("tip.discardArmed"), () => J("ui.discardConfirm")]), z("click", t, Qd), V(e, t);
		};
		U(l, (e) => {
			R(Yd) && e(u);
		}), D(i), Ui(i, (e) => M(Xd, e), () => R(Xd)), D(t), L((e, t, i, s, l) => {
			q(n, "title", e), q(n, "aria-label", t), H(r, i), o = Ei(a, 1, "discard-dot", null, o, { armed: R(Yd) }), q(a, "title", s), H(c, l);
		}, [
			() => J("ui.unpublished"),
			() => J("ui.unpublished"),
			() => J("ui.unpublished"),
			() => R(Yd) ? J("tip.discardArmed") : J("tip.discard"),
			() => J("ui.discard")
		]), z("click", a, Zd), vi(2, t, () => ha, () => ({
			x: 24,
			duration: $t ? 0 : 150
		})), V(e, t);
	};
	U(hf, (e) => {
		R(ee) && e(gf);
	}), D(mf);
	var _f = I(mf, 2), vf = N(_f), yf = (e) => {
		var t = ub(), n = P(t), r = N(n), i = (e) => {
			var t = sb(), n = P(t);
			W(n, () => X.eye);
			var r = F(I(n, 2), !0);
			L((e) => H(r, e), [() => J("ui.cleanView")]), V(e, t);
		}, a = (e) => {
			var t = sb(), n = P(t);
			W(n, () => X.pencil);
			var r = F(I(n, 2), !0);
			L((e) => H(r, e), [() => J("ui.edit")]), V(e, t);
		};
		U(r, (e) => {
			R(le) ? e(i) : e(a, -1);
		}), D(n);
		var o = I(n, 2), s = (e) => {
			var t = cb(), n = N(t), r = (e) => {
				var t = Vr();
				W(P(t), () => X.warn), V(e, t);
			};
			U(n, (e) => {
				R(se).allowed || e(r);
			});
			var i = I(n, 1, !0);
			D(t), L((e) => {
				q(t, "title", e), H(i, R(se).login);
			}, [() => R(se).allowed ? J("tip.hasPublishAccess") : J("tip.noPublishAccess")]), V(e, t);
		}, c = (e) => {
			var t = lb(), n = F(t, !0);
			L((e) => H(n, e), [() => J("ui.loginGitHub")]), V(e, t);
		};
		U(o, (e) => {
			R(se)?.loggedIn ? e(s) : R(se) && e(c, 1);
		});
		var l = I(o, 2), u = N(l);
		W(u, () => X.external);
		var d = F(I(u, 2), !0);
		D(l);
		var f = I(l, 2), p = F(f, !0);
		L((e, t, r, i, a) => {
			q(n, "title", e), q(l, "href", t), q(l, "title", r), H(d, i), f.disabled = !R(ee), H(p, a);
		}, [
			() => R(le) ? J("tip.chromeHide") : J("tip.chromeShow"),
			() => Ye()?.path ?? "/",
			() => J("ui.viewSite"),
			() => J("ui.viewSite"),
			() => J("ui.publish")
		]), z("click", n, rd), z("click", f, ef), V(e, t);
	};
	U(vf, (e) => {
		R(w) && e(yf);
	}), D(_f), D(sf);
	var bf = I(sf, 2), xf = (e) => {
		var t = IS(), n = N(t);
		let r;
		var i = N(n);
		ni(i, 17, () => Mt, Qr, (e, t, n) => {
			var r = fb(), i = P(r), a = F(i, !0);
			ni(I(i, 2), 16, () => R(t), (e) => e, (e, t) => {
				var n = db();
				let r;
				var i = F(n, !0);
				L(() => {
					r = Ei(n, 1, "", null, r, { active: R(jt) === t }), H(i, Pt[t]);
				}), z("click", n, () => Ut(t)), V(e, n);
			}), L((e) => H(a, e), [() => J(Nt[n])]), V(e, r);
		});
		var s = I(i, 2), u = I(N(s), 2);
		let _;
		W(u, () => X.gear, !0), D(u);
		var v = I(u, 2), b = (e) => {
			var t = hb(), n = N(t), r = F(n, !0), i = I(n, 2), a = N(i);
			Y(I(a), {
				get value() {
					return R(x);
				},
				get options() {
					return y;
				},
				onchange: (e) => M(x, e, !0)
			}), D(i);
			var o = I(i, 2), s = N(o), c = I(s);
			{
				let e = /* @__PURE__ */ A(() => [["auto", J("lang.auto")], ...zt()]);
				Y(c, {
					get value() {
						return Vt;
					},
					get options() {
						return R(e);
					},
					onchange: Ht
				});
			}
			D(o);
			var l = I(o, 2), u = N(l), d = I(u);
			{
				let e = /* @__PURE__ */ A(() => [["strip", J("settings.layoutPickerStrip")], ["menu", J("settings.layoutPickerMenu")]]);
				Y(d, {
					get value() {
						return R(da);
					},
					get options() {
						return R(e);
					},
					onchange: fa
				});
			}
			D(l);
			var f = I(l, 2), p = N(f), m = I(p);
			{
				let e = /* @__PURE__ */ A(() => [["wide", J("settings.menuWide")], ["narrow", J("settings.menuNarrow")]]);
				Y(m, {
					get value() {
						return ms.widthPref;
					},
					get options() {
						return R(e);
					},
					get onchange() {
						return gs;
					}
				});
			}
			D(f);
			var h = I(f, 2), g = N(h), _ = I(g);
			{
				let e = /* @__PURE__ */ A(() => [["remember", J("settings.panelsRemember")], ["reset", J("settings.panelsReset")]]);
				Y(_, {
					get value() {
						return R(kt);
					},
					get options() {
						return R(e);
					},
					onchange: At
				});
			}
			D(h);
			var v = I(h, 2), b = F(v, !0), S = I(v, 2), C = N(S);
			let w;
			var T = F(C, !0), ee = I(C, 2);
			let te;
			var ne = F(ee, !0);
			D(S);
			var re = I(S, 2), E = (e) => {
				var t = pb(), n = N(t), r = F(n, !0), i = I(n, 2);
				G(i);
				var a = I(i, 2), o = F(a, !0), s = I(a, 2);
				G(s), D(t), L((e, t, n, a) => {
					H(r, e), q(i, "min", 640), q(i, "max", Kp), q(i, "title", t), K(i, R(pe).width), H(o, n), q(s, "max", qp), q(s, "title", a), K(s, R(pe).height || "");
				}, [
					() => J("lbl.screen.w"),
					() => J("tip.screen.width", {
						min: 640,
						max: Kp
					}),
					() => J("lbl.screen.h"),
					() => J("tip.screen.height", {
						min: 480,
						max: qp
					})
				]), z("change", i, (e) => {
					me({ width: Number(e.target.value) }), e.target.value = R(pe).width;
				}), z("change", s, (e) => {
					me({ height: Number(e.target.value) }), e.target.value = R(pe).height || "";
				}), V(e, t);
			};
			U(re, (e) => {
				R(pe).mode === "custom" && e(E);
			});
			var ie = I(re, 2), ae = (e) => {
				var t = mb(), n = P(t), r = F(n, !0), i = I(n, 2), a = N(i), o = I(a);
				G(o), D(i), L((e, t, s, c, l) => {
					q(n, "title", e), H(r, t), q(i, "title", s), H(a, `${c ?? ""} `), q(o, "placeholder", l), K(o, R(k).analytics?.token ?? "");
				}, [
					() => J("tip.analytics"),
					() => J("settings.analytics"),
					() => J("tip.analytics"),
					() => J("lbl.analyticsToken"),
					() => J("ph.analyticsToken")
				]), z("change", o, (e) => fo(e.target.value)), V(e, t);
			};
			U(ie, (e) => {
				R(k) && e(ae);
			}), D(t), L((e, t, n, c, d, m, _, y, x, re, E, ie, ae, oe, se, ce) => {
				H(r, e), q(i, "title", t), H(a, `${n ?? ""} `), q(o, "title", c), H(s, `${d ?? ""} `), q(l, "title", m), H(u, `${_ ?? ""} `), q(f, "title", y), H(p, `${x ?? ""} `), q(h, "title", re), H(g, `${E ?? ""} `), q(v, "title", ie), H(b, ae), q(S, "title", oe), w = Ei(C, 1, "", null, w, { on: R(pe).mode === "own" }), H(T, se), te = Ei(ee, 1, "", null, te, { on: R(pe).mode === "custom" }), H(ne, ce);
			}, [
				() => J("settings.title"),
				() => J("topbar.adminTheme.title"),
				() => J("settings.theme"),
				() => J("topbar.language.title"),
				() => J("settings.language"),
				() => J("tip.settings.layoutPicker"),
				() => J("settings.layoutPicker"),
				() => J("tip.settings.menuWidth"),
				() => J("settings.menuWidth"),
				() => J("tip.settings.panels"),
				() => J("settings.panels"),
				() => J("tip.screen.mode"),
				() => J("settings.screen"),
				() => J("tip.screen.mode"),
				() => J("lbl.screen.own"),
				() => J("lbl.screen.size")
			]), z("click", C, () => me({ mode: "own" })), z("click", ee, () => me({ mode: "custom" })), V(e, t);
		};
		U(v, (e) => {
			R(ua) && e(b);
		}), D(s), Ui(s, (e) => M(pa, e), () => R(pa)), D(n);
		var S = I(n, 2), w = (e) => {
			var t = FS();
			let n;
			var r = N(t), i = N(r), s = F(i, !0), u = I(i, 2), _ = (e) => {
				var t = gb();
				let n;
				W(t, () => X.foldToggle, !0), D(t), L((e, r) => {
					n = Ei(t, 1, "fold-all fold-toggle", null, n, { collapse: R(Nu) }), q(t, "title", e), q(t, "aria-label", r);
				}, [() => J(R(Nu) ? "ui.collapseAll" : "ui.expandAll"), () => J(R(Nu) ? "ui.collapseAll" : "ui.expandAll")]), z("click", t, Iu), V(e, t);
			};
			U(u, (e) => {
				R(Mu) && e(_);
			}), D(r);
			var v = I(r, 2), y = (e) => {
				var t = Db(), n = N(t);
				ni(n, 17, () => R(k).pages, (e) => e.id, (e, t) => {
					var n = Sb();
					let r;
					var i = N(n);
					G(i);
					var a = I(i, 2), o = (e) => {
						var t = _b();
						L((e) => q(t, "title", e), [() => J("tip.pages.homeLocked")]), V(e, t);
					}, s = (e) => {
						var n = vb();
						G(n), L((e, t) => {
							K(n, e), q(n, "title", t);
						}, [() => R(t).path.slice(1), () => J("tip.pages.slug")]), z("change", n, (e) => qa(R(t), e.target.value)), V(e, n);
					};
					U(a, (e) => {
						R(t).path === "/" ? e(o) : e(s, -1);
					});
					var c = I(a, 2), l = (e) => {
						var t = yb();
						W(t, () => X.warn, !0), D(t), L((e) => q(t, "title", e), [() => J("tip.pages.missingDescription")]), V(e, t);
					};
					U(c, (e) => {
						R(Ha)[R(t).id] && e(l);
					});
					var u = I(c, 2), d = N(u);
					W(d, () => X.right, !0), D(d);
					var f = I(d, 2), p = N(f);
					W(p, () => X.kebab, !0), D(p);
					var m = I(p, 2), h = (e) => {
						var n = xb(), r = N(n), i = N(r);
						W(i, () => X.bookmark);
						var a = I(i);
						D(r);
						var o = I(r, 2), s = (e) => {
							var n = bb(), r = N(n);
							W(r, () => X.cross);
							var i = I(r);
							D(n), L((e, t) => {
								q(n, "title", e), H(i, ` ${t ?? ""}`);
							}, [() => J("tip.pages.delete"), () => J("ui.deletePage")]), z("click", n, () => {
								M(ka, null), Ja(R(t));
							}), V(e, n);
						};
						U(o, (e) => {
							R(t).path !== "/" && e(s);
						}), D(n), L((e) => H(a, ` ${e ?? ""}`), [() => J("ui.savePageTemplate")]), z("click", r, () => Na(R(t))), V(e, n);
					};
					U(m, (e) => {
						R(ka) === R(t).id && e(h);
					}), D(f), D(u), D(n), L((e, a, o) => {
						r = Ei(n, 1, "page-row", null, r, { current: R(t).id === R(T) }), K(i, R(t).title), q(i, "title", e), q(d, "title", a), d.disabled = R(t).id === R(T), q(p, "title", o);
					}, [
						() => J("tip.pages.title"),
						() => J("tip.pages.open"),
						() => J("tip.pages.menu")
					]), z("change", i, (e) => Fa(R(t), e.target.value)), z("click", d, () => ra(R(t).id)), z("click", p, () => M(ka, R(ka) === R(t).id ? null : R(t).id, !0)), V(e, n);
				});
				var r = I(n, 2), i = N(r), a = F(i, !0), o = I(i, 2), s = N(o), c = N(s), l = I(c);
				ft(l), D(s);
				var u = I(s, 2), d = N(u), f = I(d);
				G(f), D(u);
				var p = I(u, 2), m = N(p), h = I(m);
				ft(h), D(p);
				var g = I(p, 2), _ = N(g), v = I(_), y = (e) => {
					var t = Cb();
					L((e) => {
						q(t, "src", R(Ia).ogImage), q(t, "alt", e);
					}, [() => J("lbl.ogImage")]), V(e, t);
				};
				U(v, (e) => {
					R(Ia).ogImage && e(y);
				}), D(g);
				var b = I(g, 2), x = N(b), S = N(x), C = I(S);
				D(x);
				var w = I(x, 2), ee = (e) => {
					var t = vy();
					W(t, () => X.cross, !0), D(t), L((e) => q(t, "title", e), [() => J("tip.seo.removeOgImage")]), z("click", t, () => Ba("ogImage", "")), V(e, t);
				};
				U(w, (e) => {
					R(Ia).ogImage && e(ee);
				}), D(b);
				var te = I(b, 2), ne = N(te);
				G(ne);
				var re = I(ne);
				D(te), D(o), D(r);
				var E = I(r, 4);
				G(E);
				var ie = I(E, 2), ae = F(ie, !0), oe = I(ie, 2), se = F(oe, !0), ce = I(oe, 2), le = N(ce);
				let ue;
				var de = N(le), fe = N(de);
				W(fe, () => Mg({ sections: [] }), !0), D(fe);
				var pe = F(I(fe, 2), !0);
				D(de), D(le), ni(I(le, 2), 17, () => Pg, (e) => e.id, (e, t) => {
					var n = wb();
					let r;
					var i = N(n), a = N(i);
					W(a, () => Da[R(t).id], !0), D(a);
					var o = F(I(a, 2), !0);
					D(i), D(n), L((e, a) => {
						r = Ei(n, 1, "page-template-card", null, r, { picked: R(Ea) === `preset:${R(t).id}` }), q(i, "title", e), H(o, a);
					}, [() => J("tip.pages.templatePick", { name: J(R(t).labelKey) }), () => J(R(t).labelKey)]), z("click", i, () => M(Ea, R(Ea) === `preset:${R(t).id}` ? null : `preset:${R(t).id}`, !0)), V(e, n);
				}), D(ce);
				var me = I(ce, 2), he = (e) => {
					var t = Eb(), n = P(t), r = F(n, !0), i = I(n, 2);
					ni(i, 20, () => R(Z).filter((e) => Zs[e]?.data?.mal?.kind === "page"), (e) => e, (e, t) => {
						var n = Tb();
						let r;
						var i = N(n), a = N(i);
						W(a, () => Mg(Zs[t].data.page), !0), D(a);
						var o = F(I(a, 2), !0);
						D(i);
						var s = I(i, 2);
						W(s, () => X.cross, !0), D(s), D(n), L((e, a) => {
							r = Ei(n, 1, "page-template-card", null, r, { picked: R(Ea) === t }), q(i, "title", e), H(o, Zs[t].data.mal.name), q(s, "title", a);
						}, [() => J("tip.pages.templatePick", { name: Zs[t].data.mal.name }), () => J("canvas.deleteTemplate")]), z("click", i, () => M(Ea, R(Ea) === t ? null : t, !0)), z("click", s, () => oc({ id: t })), V(e, n);
					}), D(i), L((e) => {
						H(r, e), Oi(i, R(Oa));
					}, [() => J("canvas.tabMyTemplates")]), V(e, t);
				}, ge = /* @__PURE__ */ A(() => R(Z).some((e) => Zs[e]?.data?.mal?.kind === "page"));
				U(me, (e) => {
					R(ge) && e(he);
				}), D(t), L((e, t, n, r, i, o, v, y, b, C, w, T, ee, oe, fe, me, he, ge, _e, ve, ye, be) => {
					H(a, e), q(s, "title", t), H(c, `${n ?? ""} `), K(l, R(Ia).description), q(u, "title", r), H(d, `${i ?? ""} `), K(f, R(Ia).ogTitle), q(f, "placeholder", o), q(p, "title", v), H(m, `${y ?? ""} `), K(h, R(Ia).ogDescription), q(h, "placeholder", R(Ia).description), q(g, "title", b), H(_, `${C ?? ""} `), q(x, "title", w), H(S, `${T ?? ""} `), q(te, "title", ee), Ni(ne, oe), H(re, ` ${fe ?? ""}`), q(E, "placeholder", me), q(ie, "title", he), ie.disabled = ge, H(ae, _e), H(se, ve), Oi(ce, R(Oa)), ue = Ei(le, 1, "page-template-card", null, ue, { picked: R(Ea) === null }), q(de, "title", ye), H(pe, be);
				}, [
					() => J("ui.seoGroup", { page: R(k).pages.find((e) => e.id === R(T))?.title ?? "" }),
					() => J("tip.seo.description"),
					() => J("lbl.seoDescription"),
					() => J("tip.seo.ogTitle"),
					() => J("lbl.ogTitle"),
					() => R(k).pages.find((e) => e.id === R(T))?.title ?? "",
					() => J("tip.seo.ogDescription"),
					() => J("lbl.ogDescription"),
					() => J("tip.seo.ogImage"),
					() => J("lbl.ogImage"),
					() => J("tip.seo.ogImage"),
					() => R(Ia).ogImage ? J("ui.changeImage") : J("ui.chooseImage"),
					() => J("tip.seo.hideFromSearch"),
					() => R(k).pages.find((e) => e.id === R(T))?.noindex === !0,
					() => J("lbl.hideFromSearch"),
					() => J("ph.newPageName"),
					() => J("hint.pages.autoMenu"),
					() => !R(Ta).trim(),
					() => J("ui.createPage"),
					() => J("canvas.tabPresets"),
					() => J("tip.pages.blankPick"),
					() => J("ui.blankPage")
				]), z("change", l, (e) => Ba("description", e.target.value)), z("change", f, (e) => Ba("ogTitle", e.target.value)), z("change", h, (e) => Ba("ogDescription", e.target.value)), z("change", C, Wa), z("change", ne, (e) => Va(e.target.checked)), z("keydown", E, (e) => e.key === "Enter" && Ma()), Li(E, () => R(Ta), (e) => M(Ta, e)), z("click", ie, Ma), z("click", de, () => M(Ea, null)), V(e, t);
			}, b = (e) => {
				var t = gx(), n = N(t), r = N(n), i = F(r, !0), o = I(r, 2), s = N(o);
				{
					let e = /* @__PURE__ */ A(() => J("common.type")), t = /* @__PURE__ */ A(() => R(k).nav.logo?.type ?? "text"), n = /* @__PURE__ */ A(() => [
						["text", J("blocks.text")],
						["image", J("blocks.image")],
						["both", J("opt.logo.both")]
					]);
					Uu(s, {
						get label() {
							return R(e);
						},
						get value() {
							return R(t);
						},
						get options() {
							return R(n);
						},
						onchange: (e) => Za(e)
					});
				}
				var u = I(s, 2), _ = (e) => {
					var t = Ob(), n = P(t);
					G(n);
					var r = I(n, 2), i = N(r);
					{
						let e = /* @__PURE__ */ A(() => J("tip.nav.logoFont")), t = /* @__PURE__ */ A(() => R(k).nav.logo?.font ?? ""), n = /* @__PURE__ */ A(() => [["", J("common.inherit")], ...Hd.map(([e, t]) => [t, J(e)])]);
						Y(i, {
							get title() {
								return R(e);
							},
							get value() {
								return R(t);
							},
							get options() {
								return R(n);
							},
							onchange: (e) => Xa({ font: e || void 0 })
						});
					}
					var a = I(i, 2);
					G(a);
					var o = I(a, 2);
					let s;
					var c = F(N(o), !0);
					D(o);
					var l = I(o, 2);
					let u;
					var d = F(N(l), !0);
					D(l), D(r), L((e, t, r, i, f, p, m) => {
						K(n, R(k).nav.logo?.value ?? ""), q(n, "placeholder", e), q(a, "title", t), K(a, R(k).nav.logo?.textSize ?? ""), s = Ei(o, 1, "tbtn", null, s, { active: R(k).nav.logo?.bold !== !1 }), q(o, "title", r), H(c, i), u = Ei(l, 1, "tbtn", null, u, { active: f }), q(l, "title", p), H(d, m);
					}, [
						() => J("ph.nav.logoName"),
						() => J("tip.nav.textSize"),
						() => J("format.bold"),
						() => J("format.boldLetter"),
						() => !!R(k).nav.logo?.italic,
						() => J("format.italic"),
						() => J("format.italicLetter")
					]), z("input", n, (e) => Xa({ value: e.target.value })), z("change", a, (e) => Xa({ textSize: e.target.value ? Number(e.target.value) : void 0 })), z("click", o, () => Xa({ bold: R(k).nav.logo?.bold === !1 })), z("click", l, () => Xa({ italic: !R(k).nav.logo?.italic })), V(e, t);
				};
				U(u, (e) => {
					(R(k).nav.logo?.type ?? "text") !== "image" && e(_);
				});
				var v = I(u, 2), y = (e) => {
					let t = /* @__PURE__ */ A(() => R(k).nav.logo?.type === "image" ? R(k).nav.logo?.value : R(k).nav.logo?.image);
					var n = jb(), r = P(n), i = N(r), a = N(i), o = (e) => {
						var n = kb();
						L(() => q(n, "src", R(t))), V(e, n);
					};
					U(a, (e) => {
						R(t) && e(o);
					}), D(i);
					var s = I(i, 2), c = N(s), l = N(c), u = I(l);
					D(c);
					var d = I(c, 2), f = (e) => {
						var n = Ab(), r = F(n, !0);
						L((e) => H(r, e), [() => R(t).split("/").pop()]), V(e, n);
					};
					U(d, (e) => {
						R(t) && e(f);
					}), D(s), D(r);
					var p = I(r, 2), m = N(p), h = N(m), g = F(h, !0), _ = I(h, 2);
					G(_), D(m);
					var v = I(m, 2), y = N(v), b = F(y, !0), x = I(y, 2);
					G(x), D(v);
					var S = I(v, 2), C = N(S), w = F(C, !0), T = I(C, 2);
					G(T), D(S), D(p), L((e, t, n, r, i, a, o, s, u) => {
						q(c, "title", e), H(l, `${t ?? ""} `), q(m, "title", n), H(g, r), K(_, R(k).nav.logo?.size ?? 32), q(v, "title", i), H(b, a), q(x, "min", vm.min), q(x, "max", vm.max), q(x, "placeholder", o), K(x, R(k).nav.logo?.mobileSize ?? ""), q(S, "title", s), H(w, u), K(T, R(k).nav.logo?.radius ?? 0);
					}, [
						() => J("tip.webpAuto"),
						() => R(t) ? J("ui.changeImage") : J("ui.chooseImage"),
						() => J("tip.nav.logoHeight"),
						() => J("lbl.height"),
						() => J("tip.nav.logoHeightMobile"),
						() => J("lbl.onMobile"),
						() => J("lbl.navSameAsDesktop"),
						() => J("tip.nav.logoRadius"),
						() => J("lbl.rounding")
					]), z("change", u, io), z("change", _, (e) => Xa({ size: Number(e.target.value) })), z("change", x, (e) => {
						let t = e.target.value;
						Xa({ mobileSize: t === "" ? void 0 : Cm(t, vm, void 0) }), e.target.value = R(k).nav.logo?.mobileSize ?? "";
					}), z("change", T, (e) => Xa({ radius: Number(e.target.value) })), V(e, n);
				};
				U(v, (e) => {
					(R(k).nav.logo?.type ?? "text") !== "text" && e(y);
				});
				var b = I(v, 2), x = (e) => {
					{
						let t = /* @__PURE__ */ A(() => J("lbl.order")), n = /* @__PURE__ */ A(() => R(k).nav.logo?.order ?? "image-first"), r = /* @__PURE__ */ A(() => [["image-first", J("opt.logo.imageFirst")], ["text-first", J("opt.logo.textFirst")]]);
						Uu(e, {
							get label() {
								return R(t);
							},
							get value() {
								return R(n);
							},
							get options() {
								return R(r);
							},
							onchange: (e) => Xa({ order: e })
						});
					}
				};
				U(b, (e) => {
					R(k).nav.logo?.type === "both" && e(x);
				}), D(o), D(n);
				var S = I(n, 2), C = N(S), w = F(C, !0), T = I(C, 2), ee = N(T), te = N(ee), ne = F(te, !0), re = I(te, 2), E = N(re), ie = N(E), ae = F(ie, !0), oe = I(ie, 2);
				ni(oe, 21, () => [
					["bar", J("opt.navVariant.bar")],
					["floating", J("opt.navVariant.floating")],
					["floating-square", J("opt.navVariant.floatingSquare")],
					["floating-tab", J("opt.navVariant.floatingTab")],
					["side-left", J("opt.navVariant.sideLeft")],
					["side-right", J("opt.navVariant.sideRight")]
				], ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ A(() => h(R(t), 2));
					let r = () => R(n)[0], i = () => R(n)[1];
					var a = Mb();
					let o;
					var s = N(a);
					W(s, () => c[r()]);
					var l = F(I(s), !0);
					D(a), L(() => {
						o = Ei(a, 1, "tile", null, o, { on: (R(k).nav.variant ?? "bar") === r() }), q(a, "aria-pressed", (R(k).nav.variant ?? "bar") === r()), H(l, i());
					}), z("click", a, () => Is(r())), V(e, a);
				}), D(oe), D(E);
				var se = I(E, 2), ce = (e) => {
					var t = Pb(), n = P(t);
					{
						let e = /* @__PURE__ */ A(() => J("lbl.navPillWidth")), t = /* @__PURE__ */ A(() => J("tip.nav.pillWidth")), r = /* @__PURE__ */ A(() => R(k).nav.style?.pillWidth === "content" ? "content" : "custom"), i = /* @__PURE__ */ A(() => [["content", J("opt.pillWidth.content")], ["custom", J("opt.pillWidth.custom")]]);
						Uu(n, {
							get label() {
								return R(e);
							},
							get title() {
								return R(t);
							},
							get value() {
								return R(r);
							},
							get options() {
								return R(i);
							},
							onchange: (e) => Qo("pillWidth", e === "content" ? "content" : void 0)
						});
					}
					var r = I(n, 2), i = (e) => {
						var t = Nb(), n = N(t), r = F(n, !0), i = I(n, 2);
						G(i), D(t), L((e, n) => {
							q(t, "title", e), H(r, n), q(i, "min", fm.min), q(i, "max", fm.max), q(i, "step", fm.step), K(i, typeof R(k).nav.style?.pillWidth == "number" ? R(k).nav.style.pillWidth : "");
						}, [() => J("tip.nav.pillWidthPx"), () => J("lbl.navPillWidthPx")]), z("change", i, (e) => as(e, "pillWidth", fm)), V(e, t);
					};
					U(r, (e) => {
						R(k).nav.style?.pillWidth !== "content" && e(i);
					});
					var a = I(r, 2), o = N(a), s = F(o, !0), c = I(o, 2);
					G(c), D(a), L((e, t) => {
						q(a, "title", e), H(s, t), q(c, "min", gm.min), q(c, "max", gm.max), q(c, "step", gm.step), q(c, "placeholder", R(k).nav.variant === "floating-square" ? "0" : ""), K(c, typeof R(k).nav.style?.radius == "number" ? R(k).nav.style.radius : "");
					}, [() => J("tip.nav.radius"), () => J("lbl.navRadius")]), z("change", c, (e) => as(e, "radius", gm)), V(e, t);
				};
				U(se, (e) => {
					R(es) && e(ce);
				});
				var le = I(se, 2), ue = (e) => {
					{
						let t = /* @__PURE__ */ A(() => J("lbl.navPlacement")), n = /* @__PURE__ */ A(() => R(k).nav.style?.sidePlacement ?? "top"), r = /* @__PURE__ */ A(() => [
							["top", J("opt.place.top")],
							["middle", J("opt.place.middle")],
							["bottom", J("opt.place.bottom")]
						]);
						Uu(e, {
							get label() {
								return R(t);
							},
							get value() {
								return R(n);
							},
							get options() {
								return R(r);
							},
							onchange: (e) => Qo("sidePlacement", e === "top" ? void 0 : e)
						});
					}
				}, de = (e) => {
					{
						let t = /* @__PURE__ */ A(() => J("lbl.navPlacement")), n = /* @__PURE__ */ A(() => J("opt.layout.leftAfterLogo")), r = /* @__PURE__ */ A(() => R(k).nav.layout ?? "right"), i = /* @__PURE__ */ A(() => [
							["left", J("common.left")],
							["center", J("common.center")],
							["right", J("common.right")]
						]);
						Uu(e, {
							get label() {
								return R(t);
							},
							get title() {
								return R(n);
							},
							get value() {
								return R(r);
							},
							get options() {
								return R(i);
							},
							onchange: (e) => Wo(e)
						});
					}
				};
				U(le, (e) => {
					R($o) ? e(ue) : e(de, -1);
				});
				var fe = I(le, 2), pe = (e) => {
					var t = Fb(), n = P(t), r = N(n);
					G(r);
					var i = I(r);
					D(n);
					var a = I(n, 2), o = N(a);
					G(o);
					var s = I(o);
					D(a), L((e, t, c, l) => {
						q(n, "title", e), Ni(r, R(k).nav.style?.glow === !0), H(i, ` ${t ?? ""}`), q(a, "title", c), Ni(o, R(k).nav.style?.topGap !== !1), H(s, ` ${l ?? ""}`);
					}, [
						() => J("tip.nav.glow"),
						() => J("lbl.navGlow"),
						() => J("tip.nav.topGap"),
						() => J("lbl.navTopGap")
					]), z("change", r, (e) => Ls(e.target.checked)), z("change", o, (e) => Rs(e.target.checked)), V(e, t);
				};
				U(fe, (e) => {
					R(es) && e(pe);
				});
				var me = I(fe, 2), he = (e) => {
					var t = Fb(), n = P(t), r = N(n);
					G(r);
					var i = I(r);
					D(n);
					var a = I(n, 2), o = N(a);
					G(o);
					var s = I(o);
					D(a), L((e, t, c, l) => {
						q(n, "title", e), Ni(r, R(k).nav.overlay === !0), H(i, ` ${t ?? ""}`), q(a, "title", c), Ni(o, R(k).nav.style?.inset !== !1), H(s, ` ${l ?? ""}`);
					}, [
						() => J("tip.nav.overlay"),
						() => J("lbl.navOverlay"),
						() => J("tip.nav.inset"),
						() => J("lbl.navInset")
					]), z("change", r, (e) => wa("nav", () => {
						e.target.checked ? R(k).nav.overlay = !0 : delete R(k).nav.overlay;
					})), z("change", o, (e) => Qo("inset", e.target.checked ? void 0 : !1)), V(e, t);
				};
				U(me, (e) => {
					!R(es) && !R($o) && e(he);
				});
				var ge = I(me, 2), _e = (e) => {
					var t = Ib(), n = P(t);
					{
						let e = /* @__PURE__ */ A(() => J("lbl.textAlign")), t = /* @__PURE__ */ A(() => J("tip.nav.sideAlign")), r = /* @__PURE__ */ A(() => R(k).nav.style?.sideAlign ?? "left"), i = /* @__PURE__ */ A(() => [
							["left", J("common.left")],
							["center", J("common.center")],
							["right", J("common.right")]
						]);
						Uu(n, {
							get label() {
								return R(e);
							},
							get title() {
								return R(t);
							},
							get value() {
								return R(r);
							},
							get options() {
								return R(i);
							},
							onchange: (e) => Qo("sideAlign", e === "left" ? void 0 : e)
						});
					}
					var r = I(n, 2), i = N(r), a = F(i, !0), o = I(i, 2);
					G(o), D(r), L((e, t) => {
						q(r, "title", e), H(a, t), q(o, "min", _m.min), q(o, "max", _m.max), K(o, R(k).nav.style?.width ?? 250);
					}, [() => J("tip.nav.colWidth"), () => J("lbl.navColWidth")]), z("change", o, (e) => {
						let t = Cm(e.target.value, _m, 250);
						Qo("width", t === 250 ? void 0 : t), e.target.value = R(k).nav.style?.width ?? 250;
					}), V(e, t);
				};
				U(ge, (e) => {
					R($o) && e(_e);
				}), D(re), D(ee);
				var ve = I(ee, 4), ye = N(ve), be = F(ye, !0), xe = I(ye, 2), Se = N(xe);
				ni(Se, 20, () => bm, (e) => e, (e, t) => {
					var n = db();
					let r;
					var i = F(n, !0);
					L((e) => {
						r = Ei(n, 1, "", null, r, { on: R(ts) === t }), H(i, e);
					}, [() => J(`opt.size.${t}`)]), z("click", n, () => is(t)), V(e, n);
				}), D(Se);
				var Ce = I(Se, 2), we = N(Ce), Te = F(we, !0), Ee = I(we, 2), De = N(Ee), ke = (e) => {
					var t = Lb(), n = N(t), r = F(n, !0), i = I(n, 2);
					G(i);
					var a = I(i, 2);
					G(a), D(t), L((e, n) => {
						q(t, "title", e), H(r, n), q(i, "min", cm.min), q(i, "max", cm.max), q(i, "step", cm.step), K(i, R(ns)), q(a, "min", cm.min), q(a, "max", cm.max), K(a, R(ns));
					}, [() => J("tip.nav.thickness"), () => J("lbl.navThickness")]), z("input", i, (e) => Qo("padY", e.target.valueAsNumber)), z("change", a, (e) => Ts(e, "padY", cm)), V(e, t);
				};
				U(De, (e) => {
					R($o) || e(ke);
				});
				var Ae = I(De, 2), je = N(Ae), Me = F(je, !0), Ne = I(je, 2);
				G(Ne);
				var Pe = I(Ne, 2);
				G(Pe), D(Ae);
				var Fe = I(Ae, 2), Ie = (e) => {
					var t = Rb(), n = N(t), r = N(n), i = F(r, !0), a = I(r, 2);
					G(a), D(n);
					var o = I(n, 2), s = N(o), c = F(s, !0), l = I(s, 2);
					G(l), D(o), D(t), L((e, t, r, s, u, d) => {
						q(n, "title", e), H(i, t), q(a, "min", um.min), q(a, "max", um.max), q(a, "placeholder", r), K(a, R(k).nav.style?.padX ?? ""), q(o, "title", s), H(c, u), q(l, "min", dm.min), q(l, "max", dm.max), q(l, "placeholder", d), K(l, R(k).nav.style?.gap ?? "");
					}, [
						() => J("tip.nav.padX"),
						() => J("lbl.navPadX"),
						() => J("common.auto"),
						() => J("tip.nav.gap"),
						() => J("lbl.navGap"),
						() => J("common.auto")
					]), z("change", a, (e) => as(e, "padX", um)), z("change", l, (e) => as(e, "gap", dm)), V(e, t);
				};
				U(Fe, (e) => {
					R($o) || e(Ie);
				}), D(Ee), D(Ce), D(xe), D(ve);
				var Le = I(ve, 4), Re = N(Le), ze = F(Re, !0), Be = I(Re, 2), Ve = N(Be), He = (e) => {
					var t = Bb(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2);
					ni(a, 21, () => [
						["", J("common.none")],
						["bottom", J("opt.navBorder.bottom")],
						["top", J("opt.navBorder.top")],
						["both", J("opt.navBorder.both")],
						["all", J("opt.navBorder.all")]
					], ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ A(() => h(R(t), 2));
						let r = () => R(n)[0], i = () => R(n)[1];
						var a = Mb();
						let o;
						var s = N(a);
						W(s, () => l[r()]);
						var c = F(I(s), !0);
						D(a), L(() => {
							o = Ei(a, 1, "tile", null, o, { on: (R(k).nav.style?.border?.side ?? "") === r() }), q(a, "aria-pressed", (R(k).nav.style?.border?.side ?? "") === r()), H(c, i());
						}), z("click", a, () => Qo("border", r() ? {
							...R(k).nav.style?.border ?? {},
							side: r()
						} : void 0)), V(e, a);
					}), D(a), D(n);
					var o = I(n, 2), s = (e) => {
						var t = zb(), n = N(t), r = F(n, !0), i = I(n, 2);
						G(i);
						var a = I(i, 2), o = F(a, !0), s = I(a, 2);
						{
							let e = /* @__PURE__ */ A(() => R(k).nav.style.border.color ?? "text"), t = /* @__PURE__ */ A($r), n = /* @__PURE__ */ A(() => J("tip.nav.borderColorPick"));
							Pa(s, {
								get value() {
									return R(e);
								},
								get tokens() {
									return R(t);
								},
								get label() {
									return R(n);
								},
								onchange: (e) => Qo("border", {
									...R(k).nav.style.border,
									color: e
								})
							});
						}
						D(t), L((e, t, s, c, l) => {
							q(n, "title", e), H(r, t), q(i, "title", s), K(i, R(k).nav.style.border.width ?? 1), q(a, "title", c), H(o, l);
						}, [
							() => J("tip.nav.borderWidth"),
							() => J("lbl.navBorderWidth"),
							() => J("tip.nav.borderWidth"),
							() => J("tip.nav.borderColorPick"),
							() => J("lbl.navBorderColor")
						]), z("change", i, (e) => {
							let t = Cm(e.target.value, {
								min: 1,
								max: 8
							}, 1), n = { ...R(k).nav.style.border };
							t === 1 ? delete n.width : n.width = t, Qo("border", n), e.target.value = R(k).nav.style.border.width ?? 1;
						}), V(e, t);
					};
					U(o, (e) => {
						R(k).nav.style?.border?.side && e(s);
					}), L((e, t, r) => {
						q(n, "title", e), H(i, t), q(a, "aria-label", r);
					}, [
						() => J("tip.nav.border"),
						() => J("lbl.navBorder"),
						() => J("lbl.navBorder")
					]), V(e, t);
				};
				U(Ve, (e) => {
					R($o) || e(He);
				});
				var O = I(Ve, 2), Ue = (e) => {
					{
						let t = /* @__PURE__ */ A(() => J("lbl.navShadow")), n = /* @__PURE__ */ A(() => J("tip.nav.shadow")), r = /* @__PURE__ */ A(() => R(k).nav.style?.shadow ?? ""), i = /* @__PURE__ */ A(() => [
							["", J("common.none")],
							["soft", J("opt.navShadow.soft")],
							["strong", J("opt.navShadow.strong")]
						]);
						Uu(e, {
							get label() {
								return R(t);
							},
							get title() {
								return R(n);
							},
							get value() {
								return R(r);
							},
							get options() {
								return R(i);
							},
							onchange: (e) => Qo("shadow", e || void 0)
						});
					}
				};
				U(O, (e) => {
					!R(es) && !R($o) && e(Ue);
				}), D(Be), D(Le);
				var Ge = I(Le, 4), Ke = N(Ge), qe = F(Ke, !0), Je = I(Ke, 2), Ye = N(Je), Xe = (e) => {
					var t = Wb(), n = N(t), r = F(n, !0), i = I(n, 2), a = N(i);
					G(a);
					var o = I(a);
					D(i);
					var s = I(i, 2), c = (e) => {
						var t = Ub(), n = P(t);
						{
							let e = /* @__PURE__ */ A(() => J("lbl.navScroll")), t = /* @__PURE__ */ A(() => J("tip.nav.scroll")), r = /* @__PURE__ */ A(() => R(k).nav.scroll ?? "none"), i = /* @__PURE__ */ A(() => [
								["none", J("opt.scroll.none")],
								["shrink", J("opt.scroll.shrink")],
								["hide", J("opt.scroll.hide")]
							]);
							Uu(n, {
								get label() {
									return R(e);
								},
								get title() {
									return R(t);
								},
								get value() {
									return R(r);
								},
								get options() {
									return R(i);
								},
								onchange: (e) => wa("nav", () => {
									e === "none" ? delete R(k).nav.scroll : R(k).nav.scroll = e;
								})
							});
						}
						var r = I(n, 2), i = (e) => {
							var t = Hb(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2);
							G(a);
							var o = F(I(a, 2));
							D(n);
							var s = I(n, 2), c = N(s), l = F(c, !0), u = I(c, 2);
							G(u);
							var d = F(I(u, 2));
							D(s);
							var f = I(s, 2), p = N(f), m = F(p, !0), h = I(p, 2);
							G(h);
							var g = F(I(h, 2));
							D(f);
							var _ = I(f, 2), v = (e) => {
								var t = Vb(), n = N(t);
								G(n);
								var r = I(n);
								D(t), L((e, i) => {
									q(t, "title", e), Ni(n, R(k).nav.style?.shrinkLogo === !0), H(r, ` ${i ?? ""}`);
								}, [() => J("tip.nav.shrinkLogo"), () => J("lbl.navShrinkLogo")]), z("change", n, (e) => Qo("shrinkLogo", e.target.checked ? !0 : void 0)), V(e, t);
							};
							U(_, (e) => {
								(R(k).nav.logo?.type ?? "text") !== "text" && e(v);
							}), L((e, t, r, c, p, _, v, y) => {
								q(n, "title", e), H(i, t), K(a, r), H(o, `${c ?? ""}%`), q(s, "title", p), H(l, _), K(u, R(k).nav.style?.shrinkAt ?? 80), H(d, `${R(k).nav.style?.shrinkAt ?? 80 ?? ""} px`), q(f, "title", v), H(m, y), K(h, R(k).nav.style?.shrinkMs ?? 220), H(g, `${R(k).nav.style?.shrinkMs ?? 220 ?? ""} ms`);
							}, [
								() => J("tip.nav.shrinkTo"),
								() => J("lbl.navShrinkTo"),
								() => Math.round((R(k).nav.style?.shrinkTo ?? .5) * 100),
								() => Math.round((R(k).nav.style?.shrinkTo ?? .5) * 100),
								() => J("tip.nav.shrinkAt"),
								() => J("lbl.navShrinkAt"),
								() => J("tip.nav.shrinkMs"),
								() => J("lbl.navShrinkMs")
							]), z("input", a, (e) => Ds(e.target.valueAsNumber)), z("input", u, (e) => Os(e.target.valueAsNumber)), z("input", h, (e) => ks(e.target.valueAsNumber)), V(e, t);
						};
						U(r, (e) => {
							R(k).nav.scroll === "shrink" && e(i);
						}), V(e, t);
					};
					U(s, (e) => {
						R(k).nav.sticky !== !1 && e(c);
					});
					var l = I(s, 2), u = N(l);
					G(u);
					var d = I(u);
					D(l), D(t), L((e, t, n, s, c) => {
						H(r, e), q(i, "title", t), Ni(a, R(k).nav.sticky !== !1), H(o, ` ${n ?? ""}`), q(l, "title", s), Ni(u, R(k).nav.style?.atTop === "clear"), H(d, ` ${c ?? ""}`);
					}, [
						() => J("group.navScrolling"),
						() => J("tip.nav.sticky"),
						() => J("lbl.navSticky"),
						() => J("tip.nav.atTop"),
						() => J("lbl.navAtTop")
					]), z("change", a, (e) => wa("nav", () => {
						R(k).nav.sticky = e.target.checked;
					})), z("change", u, (e) => Qo("atTop", e.target.checked ? "clear" : void 0)), V(e, t);
				};
				U(Ye, (e) => {
					R($o) || e(Xe);
				}), D(Je), D(Ge);
				var Ze = I(Ge, 4), Qe = N(Ze), $e = F(Qe, !0), et = I(Qe, 2), tt = N(et), nt = N(tt), rt = (e) => {
					var t = Gb(), n = N(t), r = F(n, !0), i = I(n, 2);
					G(i), D(t), L((e, n, a) => {
						q(t, "title", e), H(r, n), q(i, "min", cm.min), q(i, "max", cm.max), q(i, "placeholder", a), K(i, R(k).nav.style?.mobile?.padY ?? "");
					}, [
						() => J("tip.nav.thickness"),
						() => J("lbl.navThickness"),
						() => J("lbl.navSameAsDesktop")
					]), z("change", i, (e) => Es(e, "padY", cm)), V(e, t);
				};
				U(nt, (e) => {
					R($o) || e(rt);
				});
				var it = I(nt, 2), at = N(it), ot = F(at, !0), st = I(at, 2);
				G(st), D(it), D(tt);
				var ct = I(tt, 2), lt = N(ct), ut = N(lt), dt = F(ut, !0), ft = I(ut, 2);
				{
					let e = /* @__PURE__ */ A(() => R(k).nav.style?.mobile?.size ?? ""), t = /* @__PURE__ */ A(() => [["", J("lbl.navSameAsDesktop")], ...bm.map((e) => [e, J(`opt.size.${e}`)])]);
					Y(ft, {
						filled: !0,
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => os("size", e || void 0)
					});
				}
				D(lt);
				var pt = I(lt, 2), mt = N(pt), ht = F(mt, !0), gt = I(mt, 2);
				{
					let e = /* @__PURE__ */ A(() => R(k).nav.style?.mobile?.layout ?? ""), t = /* @__PURE__ */ A(() => [
						["", J("lbl.navSameAsDesktop")],
						["left", J("common.left")],
						["center", J("common.center")],
						["right", J("common.right")]
					]);
					Y(gt, {
						filled: !0,
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => os("layout", e || void 0)
					});
				}
				D(pt), D(ct);
				var _t = I(ct, 2), vt = N(_t), yt = N(vt), bt = F(yt, !0), xt = I(yt, 2);
				{
					let e = /* @__PURE__ */ A(() => R(k).nav.style?.mobile?.tools?.side ?? ""), t = /* @__PURE__ */ A(() => [
						["", J("lbl.navSameAsDesktop")],
						["start", J("common.left")],
						["end", J("common.right")]
					]);
					Y(xt, {
						filled: !0,
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => os("tools", e ? { side: e } : void 0)
					});
				}
				D(vt);
				var St = I(vt, 2), Ct = (e) => {
					var t = Kb(), n = N(t), r = F(n, !0), i = I(n, 2);
					{
						let e = /* @__PURE__ */ A(() => ss("overlay")), t = /* @__PURE__ */ A(() => [
							["", J("lbl.navSameAsDesktop")],
							["on", J("common.on")],
							["off", J("common.off")]
						]);
						Y(i, {
							filled: !0,
							get value() {
								return R(e);
							},
							get options() {
								return R(t);
							},
							onchange: (e) => cs("overlay", e)
						});
					}
					D(t), L((e, n) => {
						q(t, "title", e), H(r, n);
					}, [() => J("tip.nav.mobileOverlay"), () => J("lbl.navOverlay")]), V(e, t);
				};
				U(St, (e) => {
					!R(es) && !R($o) && e(Ct);
				}), D(_t);
				var wt = I(_t, 2), Tt = N(wt), Et = N(Tt), Dt = F(Et, !0), Ot = I(Et, 2);
				{
					let e = /* @__PURE__ */ A(() => R(k).nav.style?.mobile?.border?.side ?? ""), t = /* @__PURE__ */ A(() => [
						["", J("lbl.navSameAsDesktop")],
						["none", J("common.none")],
						["bottom", J("opt.navBorder.bottom")],
						["top", J("opt.navBorder.top")],
						["both", J("opt.navBorder.both")],
						["all", J("opt.navBorder.all")]
					]);
					Y(Ot, {
						filled: !0,
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => ls(e)
					});
				}
				D(Tt), D(wt);
				var kt = I(wt, 2), At = (e) => {
					var t = zb(), n = N(t), r = F(n, !0), i = I(n, 2);
					G(i);
					var a = I(i, 2), o = F(a, !0), s = I(a, 2);
					{
						let e = /* @__PURE__ */ A(() => R(k).nav.style.mobile.border.color ?? "text"), t = /* @__PURE__ */ A($r), n = /* @__PURE__ */ A(() => J("tip.nav.borderColorPick"));
						Pa(s, {
							get value() {
								return R(e);
							},
							get tokens() {
								return R(t);
							},
							get label() {
								return R(n);
							},
							onchange: (e) => os("border", {
								...R(k).nav.style.mobile.border,
								color: e
							})
						});
					}
					D(t), L((e, t, s, c, l) => {
						q(n, "title", e), H(r, t), q(i, "title", s), K(i, R(k).nav.style.mobile.border.width ?? 1), q(a, "title", c), H(o, l);
					}, [
						() => J("tip.nav.borderWidth"),
						() => J("lbl.navBorderWidth"),
						() => J("tip.nav.borderWidth"),
						() => J("tip.nav.borderColorPick"),
						() => J("lbl.navBorderColor")
					]), z("change", i, (e) => {
						let t = Cm(e.target.value, {
							min: 1,
							max: 8
						}, 1), n = { ...R(k).nav.style.mobile.border };
						t === 1 ? delete n.width : n.width = t, os("border", n), e.target.value = R(k).nav.style.mobile.border.width ?? 1;
					}), V(e, t);
				};
				U(kt, (e) => {
					R(k).nav.style?.mobile?.border?.side && R(k).nav.style.mobile.border.side !== "none" && e(At);
				});
				var jt = I(kt, 2), Mt = N(jt), Nt = N(Mt), Pt = F(Nt, !0), Ft = I(Nt, 2);
				{
					let e = /* @__PURE__ */ A(() => R(k).nav.style?.mobileMenu ?? "dropdown"), t = /* @__PURE__ */ A(() => [["dropdown", J("opt.mobileMenu.dropdown")], ["sheet", J("opt.mobileMenu.sheet")]]);
					Y(Ft, {
						filled: !0,
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => Qo("mobileMenu", e === "dropdown" ? void 0 : e)
					});
				}
				D(Mt);
				var It = I(Mt, 2), Lt = (e) => {
					var t = Kb(), n = N(t), r = F(n, !0), i = I(n, 2);
					{
						let e = /* @__PURE__ */ A(() => R(k).nav.style?.sheetMotion ?? "top"), t = /* @__PURE__ */ A(() => [
							"top",
							"bottom",
							"left",
							"right",
							"fade",
							"none"
						].map((e) => [e, J(`opt.sheetMotion.${e}`)]));
						Y(i, {
							filled: !0,
							get value() {
								return R(e);
							},
							get options() {
								return R(t);
							},
							onchange: (e) => Qo("sheetMotion", e === "top" ? void 0 : e)
						});
					}
					D(t), L((e, n) => {
						q(t, "title", e), H(r, n);
					}, [() => J("tip.nav.sheetMotion"), () => J("lbl.sheetMotion")]), V(e, t);
				};
				U(It, (e) => {
					R(k).nav.style?.mobileMenu === "sheet" && e(Lt);
				}), D(jt);
				var Rt = I(jt, 2), zt = (e) => {
					var t = qb(), n = P(t), r = N(n);
					G(r);
					var i = I(r);
					D(n);
					var a = I(n, 2), o = (e) => {
						var t = Vb(), n = N(t);
						G(n);
						var r = I(n);
						D(t), L((e, i) => {
							q(t, "title", e), Ni(n, R(k).nav.style?.sheetTheme === !0), H(r, ` ${i ?? ""}`);
						}, [() => J("tip.nav.sheetTheme"), () => J("lbl.sheetTheme")]), z("change", n, (e) => Qo("sheetTheme", e.target.checked ? !0 : void 0)), V(e, t);
					};
					U(a, (e) => {
						R(k).theme?.alt?.tokens && R(k).nav.style?.tools?.theme !== !1 && e(o);
					});
					var s = I(a, 2), c = (e) => {
						var t = Vb(), n = N(t);
						G(n);
						var r = I(n);
						D(t), L((e, i) => {
							q(t, "title", e), Ni(n, R(k).nav.style?.sheetCart === !0), H(r, ` ${i ?? ""}`);
						}, [() => J("tip.nav.sheetCart"), () => J("lbl.sheetCart")]), z("change", n, (e) => Qo("sheetCart", e.target.checked ? !0 : void 0)), V(e, t);
					};
					U(s, (e) => {
						R(k).nav.cart?.show && e(c);
					});
					var l = I(s, 2), u = (e) => {
						var t = Vb(), n = N(t);
						G(n);
						var r = I(n);
						D(t), L((e, i) => {
							q(t, "title", e), Ni(n, R(k).nav.style?.sheetAnnounce === !0), H(r, ` ${i ?? ""}`);
						}, [() => J("tip.nav.sheetAnnounce"), () => J("lbl.sheetAnnounce")]), z("change", n, (e) => Qo("sheetAnnounce", e.target.checked ? !0 : void 0)), V(e, t);
					};
					U(l, (e) => {
						R(k).nav.announcement?.show && e(u);
					});
					var d = I(l, 2), f = (e) => {
						var t = Vb(), n = N(t);
						G(n);
						var r = I(n);
						D(t), L((e, i) => {
							q(t, "title", e), Ni(n, R(k).nav.style?.sheetToolLabels === !0), H(r, ` ${i ?? ""}`);
						}, [() => J("tip.nav.sheetToolLabels"), () => J("lbl.sheetToolLabels")]), z("change", n, (e) => Qo("sheetToolLabels", e.target.checked ? !0 : void 0)), V(e, t);
					};
					U(d, (e) => {
						(R(k).nav.style?.sheetTheme || R(k).nav.style?.sheetCart) && e(f);
					});
					var p = I(d, 2), m = N(p), h = F(m, !0), g = I(m, 2);
					{
						let e = /* @__PURE__ */ A(() => R(k).nav.style?.sheet?.bg ?? "surface"), t = /* @__PURE__ */ A($r), n = /* @__PURE__ */ A(() => J("tip.nav.sheetBg"));
						Pa(g, {
							get value() {
								return R(e);
							},
							get tokens() {
								return R(t);
							},
							get label() {
								return R(n);
							},
							onchange: (e) => ws("bg", e)
						});
					}
					var _ = I(g, 2);
					G(_);
					var v = F(I(_, 2));
					D(p);
					var y = I(p, 2), b = N(y);
					G(b);
					var x = I(b);
					D(y);
					var S = I(y, 2), C = N(S), w = I(C);
					{
						let e = /* @__PURE__ */ A(() => R(k).nav.style?.sheet?.textColor ?? R(k).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ A($r), n = /* @__PURE__ */ A(() => J("tip.nav.sheetTextColorPick"));
						Pa(w, {
							get value() {
								return R(e);
							},
							get tokens() {
								return R(t);
							},
							get label() {
								return R(n);
							},
							onchange: (e) => ws("textColor", e)
						});
					}
					D(S), L((e, t, a, o, s, c, l, u, d, f) => {
						q(n, "title", e), Ni(r, R(k).nav.style?.sheetLogo === !0), H(i, ` ${t ?? ""}`), q(p, "title", a), H(h, o), q(_, "title", s), K(_, c), H(v, `${l ?? ""}%`), q(y, "title", u), Ni(b, R(k).nav.style?.sheet?.blur ?? R(k).nav.style?.blur !== !1), H(x, ` ${d ?? ""}`), H(C, `${f ?? ""} `);
					}, [
						() => J("tip.nav.sheetLogo"),
						() => J("lbl.sheetLogo"),
						() => J("tip.nav.sheetBg"),
						() => J("lbl.background"),
						() => J("tip.nav.sheetOpacity"),
						() => Math.round((R(k).nav.style?.sheet?.bgOpacity ?? .85) * 100),
						() => Math.round((R(k).nav.style?.sheet?.bgOpacity ?? .85) * 100),
						() => J("tip.nav.sheetBlur"),
						() => J("lbl.sheetBlur"),
						() => J("lbl.textColor")
					]), z("change", r, (e) => Qo("sheetLogo", e.target.checked ? !0 : void 0)), z("input", _, (e) => ws("bgOpacity", e.target.valueAsNumber / 100)), z("change", b, (e) => ws("blur", e.target.checked)), V(e, t);
				};
				U(Rt, (e) => {
					R(k).nav.style?.mobileMenu === "sheet" && e(zt);
				});
				var Bt = I(Rt, 2), Vt = (e) => {
					var t = Kb(), n = N(t), r = F(n, !0), i = I(n, 2);
					{
						let e = /* @__PURE__ */ A(() => R(k).nav.style?.mobileSubs ?? "collapsed"), t = /* @__PURE__ */ A(() => [["collapsed", J("opt.mobileSubs.collapsed")], ["expanded", J("opt.mobileSubs.expanded")]]);
						Y(i, {
							filled: !0,
							get value() {
								return R(e);
							},
							get options() {
								return R(t);
							},
							onchange: (e) => Qo("mobileSubs", e === "collapsed" ? void 0 : e)
						});
					}
					D(t), L((e, n) => {
						q(t, "title", e), H(r, n);
					}, [() => J("tip.nav.mobileSubs"), () => J("lbl.mobileSubs")]), V(e, t);
				}, Ht = /* @__PURE__ */ A(() => R(k).nav.items?.some((e) => e.children?.length));
				U(Bt, (e) => {
					R(Ht) && e(Vt);
				}), D(et), D(Ze);
				var Ut = I(Ze, 4), Wt = N(Ut), Gt = F(Wt, !0), Kt = I(Wt, 2), qt = N(Kt), Jt = N(qt), Yt = F(Jt, !0), Xt = I(Jt, 2);
				ni(Xt, 21, () => [
					["standard", J("opt.hover.standard")],
					["underline", J("opt.hover.underline")],
					["pill", J("opt.hover.pill")],
					["lift-plain", J("opt.hover.liftPlain")],
					["lift", J("opt.hover.lift")]
				], ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ A(() => h(R(t), 2));
					let r = () => R(n)[0], i = () => R(n)[1];
					var a = Jb();
					let o;
					var s = N(a), c = F(s, !0), l = F(I(s), !0);
					D(a), L((e) => {
						o = Ei(a, 1, "tile hover-tile", null, o, { on: (R(k).nav.style?.hover ?? "standard") === r() }), q(a, "aria-pressed", (R(k).nav.style?.hover ?? "standard") === r()), Ei(s, 1, `hover-sample hover-${r() ?? ""}`), H(c, e), H(l, i());
					}, [() => J("seed.home")]), z("click", a, () => zs(r())), V(e, a);
				}), D(Xt), D(qt);
				var Zt = I(qt, 2), Qt = (e) => {
					var t = Yb(), n = N(t), r = F(n, !0), i = I(n, 2);
					G(i);
					var a = F(I(i, 2));
					D(t), L((e, n, o) => {
						q(t, "title", e), H(r, n), K(i, R(k).nav.style?.hoverGlow ?? .6), H(a, `${o ?? ""}%`);
					}, [
						() => J("tip.nav.hoverGlow"),
						() => J("lbl.glowStrength"),
						() => Math.round((R(k).nav.style?.hoverGlow ?? .6) * 100)
					]), z("input", i, (e) => Qo("hoverGlow", Number(e.target.value))), V(e, t);
				};
				U(Zt, (e) => {
					R(k).nav.style?.hover === "lift" && e(Qt);
				});
				var j = I(Zt, 2), $t = N(j), en = (e) => {
					var t = Xb(), n = N(t);
					{
						let e = /* @__PURE__ */ A(() => R(k).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ A($r);
						Pa(n, {
							get value() {
								return R(e);
							},
							get tokens() {
								return R(t);
							},
							get label() {
								return R(js)[1];
							},
							onchange: (e) => Qo("hoverColor", e)
						});
					}
					var r = F(I(n, 2), !0);
					D(t), L(() => {
						q(t, "title", R(js)[1]), H(r, R(js)[0]);
					}), V(e, t);
				};
				U($t, (e) => {
					R(js) && e(en);
				});
				var tn = I($t, 2), nn = N(tn);
				{
					let e = /* @__PURE__ */ A(() => R(k).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ A($r), n = /* @__PURE__ */ A(() => J("tip.nav.hoverTextColorPick"));
					Pa(nn, {
						get value() {
							return R(e);
						},
						get tokens() {
							return R(t);
						},
						get label() {
							return R(n);
						},
						onchange: (e) => Qo("hoverTextColor", e)
					});
				}
				var rn = F(I(nn, 2), !0);
				D(tn);
				var an = I(tn, 2), on = N(an);
				{
					let e = /* @__PURE__ */ A(() => R(k).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ A($r), n = /* @__PURE__ */ A(() => J("tip.nav.textColorPick"));
					Pa(on, {
						get value() {
							return R(e);
						},
						get tokens() {
							return R(t);
						},
						get label() {
							return R(n);
						},
						onchange: (e) => Qo("textColor", e)
					});
				}
				var sn = F(I(on, 2), !0);
				D(an), D(j);
				var cn = I(j, 2), ln = N(cn);
				G(ln);
				var un = I(ln);
				D(cn), D(Kt), D(Ut);
				var dn = I(Ut, 4), fn = N(dn), pn = F(fn, !0), mn = I(fn, 2), hn = N(mn);
				a(hn, () => qr, () => R(k).nav?.style?.background?.layers ?? []), D(mn), D(dn), D(T), D(S);
				var gn = I(S, 2), _n = N(gn), vn = F(_n, !0), yn = I(_n, 2), bn = N(yn), xn = N(bn);
				G(xn);
				var Sn = I(xn);
				D(bn);
				var Cn = I(bn, 2), wn = (e) => {
					var t = $b(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2);
					G(a), D(n);
					var o = I(n, 2), s = N(o), c = I(s);
					{
						let e = /* @__PURE__ */ A(() => R(k).nav.announcement?.page ?? (R(k).nav.announcement?.href === void 0 ? "" : "custom")), t = /* @__PURE__ */ A(() => [
							["", J("common.none")],
							...R(k).pages.map((e) => [e.id, e.title]),
							["custom", J("opt.announceLink.custom")]
						]);
						Y(c, {
							get value() {
								return R(e);
							},
							get options() {
								return R(t);
							},
							onchange: (e) => wa("edit:nav-announce-link", () => {
								let t = { ...R(k).nav.announcement ?? {} };
								delete t.page, delete t.href, e === "custom" ? t.href = "" : e && (t.page = e), R(k).nav.announcement = t;
							})
						});
					}
					D(o);
					var l = I(o, 2), u = (e) => {
						var t = Zb(), n = N(t), r = F(n, !0), i = I(n, 2);
						G(i), D(t), L((e, n) => {
							q(t, "title", e), H(r, n), K(i, R(k).nav.announcement?.href ?? "");
						}, [() => J("tip.nav.announceHref"), () => J("lbl.announceHref")]), z("change", i, (e) => us("href", e.target.value.trim())), V(e, t);
					};
					U(l, (e) => {
						R(k).nav.announcement?.href !== void 0 && !R(k).nav.announcement?.page && e(u);
					});
					var d = I(l, 2), f = (e) => {
						var t = Vb(), n = N(t);
						G(n);
						var r = I(n);
						D(t), L((e, i) => {
							q(t, "title", e), Ni(n, R(k).nav.announcement?.sticky !== !1), H(r, ` ${i ?? ""}`);
						}, [() => J("tip.nav.announceSticky"), () => J("lbl.announceSticky")]), z("change", n, (e) => us("sticky", e.target.checked ? void 0 : !1)), V(e, t);
					};
					U(d, (e) => {
						R(k).nav.sticky !== !1 && !R(es) && !R($o) && !R(k).nav.overlay && e(f);
					});
					var p = I(d, 2), m = (e) => {
						var t = Vb(), n = N(t);
						G(n);
						var r = I(n);
						D(t), L((e, i) => {
							q(t, "title", e), Ni(n, R(k).nav.announcement?.followNav === !0), H(r, ` ${i ?? ""}`);
						}, [() => J("tip.nav.announceFollowNav"), () => J("lbl.announceFollowNav")]), z("change", n, (e) => us("followNav", e.target.checked ? !0 : void 0)), V(e, t);
					};
					U(p, (e) => {
						R(k).nav.scroll === "hide" && R(k).nav.sticky !== !1 && !R($o) && R(k).nav.announcement?.sticky !== !1 && e(m);
					});
					var h = I(p, 2), g = (e) => {
						{
							let t = /* @__PURE__ */ A(() => J("lbl.announcePlace")), n = /* @__PURE__ */ A(() => J("tip.nav.announcePlace")), r = /* @__PURE__ */ A(() => R(k).nav.announcement?.place ?? "nav"), i = /* @__PURE__ */ A(() => [
								["nav", J("opt.announcePlace.nav")],
								["page", J("opt.announcePlace.page")],
								["content", J("opt.announcePlace.content")]
							]);
							Uu(e, {
								get label() {
									return R(t);
								},
								get title() {
									return R(n);
								},
								get value() {
									return R(r);
								},
								get options() {
									return R(i);
								},
								onchange: (e) => us("place", e === "nav" ? void 0 : e)
							});
						}
					};
					U(h, (e) => {
						R($o) && e(g);
					});
					var _ = I(h, 2), v = N(_);
					G(v);
					var y = I(v);
					D(_);
					var b = I(_, 2), x = (e) => {
						var t = Qb(), n = F(t, !0);
						L((e, r) => {
							q(t, "title", e), H(n, r);
						}, [() => J("tip.nav.announceShowAgain"), () => J("lbl.announceShowAgain")]), z("click", t, () => We?.sendAnnounceReset()), V(e, t);
					};
					U(b, (e) => {
						R(k).nav.announcement?.dismiss !== !1 && e(x);
					});
					var S = I(b, 2), C = N(S), w = I(C);
					{
						let e = /* @__PURE__ */ A(() => R(k).nav.announcement?.color ?? "accent"), t = /* @__PURE__ */ A($r), n = /* @__PURE__ */ A(() => J("tip.nav.announceColor"));
						Pa(w, {
							get value() {
								return R(e);
							},
							get tokens() {
								return R(t);
							},
							get label() {
								return R(n);
							},
							onchange: (e) => us("color", e)
						});
					}
					D(S);
					var T = I(S, 2), ee = N(T), te = I(ee);
					{
						let e = /* @__PURE__ */ A(() => R(k).nav.announcement?.textColor ?? "accent-text"), t = /* @__PURE__ */ A($r), n = /* @__PURE__ */ A(() => J("tip.nav.announceTextColor"));
						Pa(te, {
							get value() {
								return R(e);
							},
							get tokens() {
								return R(t);
							},
							get label() {
								return R(n);
							},
							onchange: (e) => us("textColor", e)
						});
					}
					D(T), L((e, t, r, c, l, u, d, f, p, m) => {
						q(n, "title", e), H(i, t), K(a, R(k).nav.announcement?.text ?? ""), q(o, "title", r), H(s, `${c ?? ""} `), q(_, "title", l), Ni(v, R(k).nav.announcement?.dismiss !== !1), H(y, ` ${u ?? ""}`), q(S, "title", d), H(C, `${f ?? ""} `), q(T, "title", p), H(ee, `${m ?? ""} `);
					}, [
						() => J("tip.nav.announce"),
						() => J("lbl.text"),
						() => J("tip.nav.announceLink"),
						() => J("lbl.link"),
						() => J("tip.nav.announceDismiss"),
						() => J("lbl.announceDismiss"),
						() => J("tip.nav.announceColor"),
						() => J("lbl.background"),
						() => J("tip.nav.announceTextColor"),
						() => J("lbl.textColor")
					]), z("change", a, (e) => us("text", e.target.value.trim() || void 0)), z("change", v, (e) => us("dismiss", e.target.checked ? void 0 : !1)), V(e, t);
				};
				U(Cn, (e) => {
					R(k).nav.announcement?.show && e(wn);
				}), D(yn), D(gn);
				var Tn = I(gn, 2), En = N(Tn), Dn = F(En, !0), On = I(En, 2);
				{
					let e = (e, t = f, n = f) => {
						var r = ex(), i = N(r);
						W(i, () => X.up, !0), D(i);
						var a = I(i, 2);
						W(a, () => X.down, !0), D(a), D(r), L((e, t) => {
							q(i, "title", e), i.disabled = n() === 0, q(a, "title", t), a.disabled = n() === R(Ko).length - 1;
						}, [() => J("tip.moveUp"), () => J("tip.moveDown")]), z("click", i, (e) => {
							e.preventDefault(), e.stopPropagation(), Yo(t(), -1);
						}), z("click", a, (e) => {
							e.preventDefault(), e.stopPropagation(), Yo(t(), 1);
						}), V(e, r);
					};
					var kn = N(On), An = (e) => {
						var t = Ub(), n = P(t);
						{
							let e = /* @__PURE__ */ A(() => J("lbl.toolsSide")), t = /* @__PURE__ */ A(() => J("tip.nav.toolsSideColumn")), r = /* @__PURE__ */ A(() => R(k).nav.style?.tools?.side ?? "end"), i = /* @__PURE__ */ A(() => [["start", J("opt.toolsSide.top")], ["end", J("opt.toolsSide.bottom")]]);
							Uu(n, {
								get label() {
									return R(e);
								},
								get title() {
									return R(t);
								},
								get value() {
									return R(r);
								},
								get options() {
									return R(i);
								},
								onchange: (e) => Zo("side", e === "start" ? "start" : void 0)
							});
						}
						var r = I(n, 2);
						{
							let e = /* @__PURE__ */ A(() => J("lbl.toolsAlign")), t = /* @__PURE__ */ A(() => J("tip.nav.toolsAlign")), n = /* @__PURE__ */ A(() => R(k).nav.style?.tools?.align ?? "center"), i = /* @__PURE__ */ A(() => [
								["start", J("opt.toolsAlign.start")],
								["center", J("opt.toolsAlign.center")],
								["end", J("opt.toolsAlign.end")],
								["spread", J("opt.toolsAlign.spread")]
							]);
							Uu(r, {
								get label() {
									return R(e);
								},
								get title() {
									return R(t);
								},
								get value() {
									return R(n);
								},
								get options() {
									return R(i);
								},
								onchange: (e) => Zo("align", e === "center" ? void 0 : e)
							});
						}
						V(e, t);
					}, jn = (e) => {
						{
							let t = /* @__PURE__ */ A(() => J("lbl.toolsSide")), n = /* @__PURE__ */ A(() => J("tip.nav.toolsSide")), r = /* @__PURE__ */ A(() => R(k).nav.style?.tools?.side ?? "end"), i = /* @__PURE__ */ A(() => [["start", J("opt.toolsSide.start")], ["end", J("opt.toolsSide.end")]]);
							Uu(e, {
								get label() {
									return R(t);
								},
								get title() {
									return R(n);
								},
								get value() {
									return R(r);
								},
								get options() {
									return R(i);
								},
								onchange: (e) => Zo("side", e === "start" ? "start" : void 0)
							});
						}
					};
					U(kn, (e) => {
						R($o) ? e(An) : e(jn, -1);
					}), ni(I(kn, 2), 18, () => R(Ko), (e) => e, (t, n, r) => {
						var i = Vr(), a = P(i), o = (t) => {
							var i = Vr(), a = P(i), o = (t) => {
								var i = tx(), a = N(i), o = N(a), s = F(o, !0), c = I(o);
								e(c, () => n, () => R(r)), D(a);
								var l = I(a, 2), u = N(l);
								G(u);
								var d = I(u);
								D(l), D(i), L((e, t, n) => {
									H(s, e), q(l, "title", t), Ni(u, R(k).nav.style?.tools?.theme !== !1), H(d, ` ${n ?? ""}`);
								}, [
									() => J("lbl.themeToggle"),
									() => J("tip.nav.themeToggle"),
									() => J("lbl.showInMenu")
								]), z("change", u, (e) => Zo("theme", e.target.checked ? void 0 : !1)), V(t, i);
							};
							U(a, (e) => {
								R(k).theme?.alt?.tokens && e(o);
							}), V(t, i);
						}, s = (t) => {
							var i = nx(), a = N(i), o = N(a), s = F(o, !0), c = I(o);
							e(c, () => n, () => R(r)), D(a);
							var l = I(a, 2), u = N(l);
							G(u);
							var d = I(u);
							D(l);
							var f = I(l, 2), p = (e) => {
								var t = Kb(), n = N(t), r = F(n, !0), i = I(n, 2);
								{
									let e = /* @__PURE__ */ A(() => R(k).nav.cart?.href ?? ""), t = /* @__PURE__ */ A(() => [["", J("common.none")], ...R(k).pages.map((e) => [e.path, e.title])]);
									Y(i, {
										filled: !0,
										get value() {
											return R(e);
										},
										get options() {
											return R(t);
										},
										onchange: (e) => wa("nav", () => {
											e ? R(k).nav.cart.href = e : delete R(k).nav.cart.href;
										})
									});
								}
								D(t), L((e, n) => {
									q(t, "title", e), H(r, n);
								}, [() => J("tip.cart.checkout"), () => J("lbl.checkoutPage")]), V(e, t);
							};
							U(f, (e) => {
								R(k).nav.cart?.show && e(p);
							}), D(i), L((e, t, n) => {
								H(s, e), q(l, "title", t), Ni(u, R(k).nav.cart?.show === !0), H(d, ` ${n ?? ""}`);
							}, [
								() => J("lbl.cart"),
								() => J("tip.nav.cart"),
								() => J("lbl.showInMenu")
							]), z("change", u, (e) => wa("nav", () => {
								e.target.checked ? R(k).nav.cart = {
									...R(k).nav.cart ?? {},
									show: !0
								} : delete R(k).nav.cart;
							})), V(t, i);
						}, c = (t) => {
							var i = ux(), a = N(i), o = N(a), s = N(o, !0), c = I(s);
							e(c, () => n, () => R(r)), D(o), D(a);
							var l = I(a, 2), u = N(l), d = N(u);
							G(d);
							var f = I(d);
							D(u);
							var m = I(u, 2), g = (e) => {
								var t = lx(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2);
								ni(a, 21, () => R(Ns), ([e, t]) => e, (e, t) => {
									var n = /* @__PURE__ */ A(() => h(R(t), 2));
									let r = () => R(n)[0], i = () => R(n)[1];
									var a = Mb();
									let o;
									var s = N(a);
									W(s, () => p[r()]);
									var c = F(I(s), !0);
									D(a), L(() => {
										o = Ei(a, 1, "tile", null, o, { on: (R(k).nav.launcher?.view ?? "grid") === r() }), q(a, "aria-pressed", (R(k).nav.launcher?.view ?? "grid") === r()), H(c, i());
									}), z("click", a, () => vs("view", r() === "grid" ? void 0 : r())), V(e, a);
								}), D(a), D(n);
								var o = I(n, 2);
								{
									let e = /* @__PURE__ */ A(() => J("lbl.launcherMobileView")), t = /* @__PURE__ */ A(() => J("tip.nav.launcherMobileView")), n = /* @__PURE__ */ A(() => R(k).nav.launcher?.mobileView ?? ""), r = /* @__PURE__ */ A(() => [["", J("lbl.navSameAsDesktop")], ...R(Ns)]);
									Uu(o, {
										get label() {
											return R(e);
										},
										get title() {
											return R(t);
										},
										get value() {
											return R(n);
										},
										get options() {
											return R(r);
										},
										onchange: (e) => vs("mobileView", e || void 0)
									});
								}
								var s = I(o, 2), c = N(s), l = F(c, !0), u = I(c, 2);
								G(u);
								var d = F(I(u, 2), !0);
								D(s);
								var f = I(s, 2), m = N(f);
								G(m);
								var g = I(m);
								D(f);
								var _ = I(f, 2), v = (e) => {
									var t = rx(), n = N(t), r = F(n, !0), i = I(n, 2);
									G(i), D(t), L((e, n, a) => {
										q(t, "title", e), H(r, n), q(i, "placeholder", a), K(i, R(k).nav.launcher?.title ?? "");
									}, [
										() => J("tip.nav.launcherTitleText"),
										() => J("lbl.launcherTitle"),
										() => J("ph.launcherTitle")
									]), z("change", i, (e) => vs("title", e.target.value.trim() || void 0)), V(e, t);
								};
								U(_, (e) => {
									R(k).nav.launcher?.showTitle !== !1 && e(v);
								});
								var y = I(_, 2), b = N(y), x = F(b, !0), S = I(b, 2), C = N(S);
								{
									let e = /* @__PURE__ */ A(() => R(k).nav.launcher?.icon ?? ""), t = /* @__PURE__ */ A(() => R(k).nav.launcher?.image ?? ""), n = /* @__PURE__ */ A(ps), r = /* @__PURE__ */ A(() => J("opt.launcherDots")), i = /* @__PURE__ */ A(() => J("tip.nav.launcherIcon"));
									qo(C, {
										get icon() {
											return R(e);
										},
										get image() {
											return R(t);
										},
										get images() {
											return R(n);
										},
										klass: "lbtn-mark",
										get noneLabel() {
											return R(r);
										},
										get label() {
											return R(i);
										},
										onpick: (e) => hs(null, e),
										onfile: (e) => Cs(e, null),
										children: (e, t) => {
											var n = Vr(), r = P(n), i = (e) => {
												var t = kb();
												L(() => q(t, "src", R(k).nav.launcher.image)), V(e, t);
											}, a = (e) => {
												var t = Vr();
												W(P(t), () => yo(R(k).nav.launcher.icon) || ""), V(e, t);
											}, o = (e) => {
												var t = Vr();
												W(P(t), () => ds), V(e, t);
											};
											U(r, (e) => {
												R(k).nav.launcher?.image ? e(i) : R(k).nav.launcher?.icon ? e(a, 1) : e(o, -1);
											}), V(e, n);
										},
										$$slots: { default: !0 }
									});
								}
								var w = I(C, 2), T = N(w), ee = (e) => {
									var t = Br();
									L((e) => H(t, e), [() => J("mp.ownImage")]), V(e, t);
								}, te = (e) => {
									var t = Br();
									L((e) => H(t, e), [() => J(_o[R(k).nav.launcher.icon]?.labelKey ?? "common.none")]), V(e, t);
								}, ne = (e) => {
									var t = Br();
									L((e) => H(t, e), [() => J("opt.launcherDots")]), V(e, t);
								};
								U(T, (e) => {
									R(k).nav.launcher?.image ? e(ee) : R(k).nav.launcher?.icon ? e(te, 1) : e(ne, -1);
								}), D(w), D(S), D(y);
								var re = I(y, 2);
								ni(re, 17, () => R(k).nav.launcher?.links ?? [], Qr, (e, t, n) => {
									let r = /* @__PURE__ */ A(() => !D_(R(t).href ?? ""));
									var i = cx();
									let a;
									var o = N(i), s = N(o), c = N(s), l = (e) => {
										var n = kb();
										L(() => q(n, "src", R(t).image)), V(e, n);
									}, u = (e) => {
										var n = Vr();
										W(P(n), () => yo(R(t).icon) || ""), V(e, n);
									};
									U(c, (e) => {
										R(t).image ? e(l) : e(u, -1);
									}), D(s);
									var d = I(s, 2), f = F(d, !0), p = I(d, 2), m = (e) => {
										var t = ix();
										W(t, () => X.warn, !0), D(t), L((e) => q(t, "title", e), [() => J("tip.badTarget")]), V(e, t);
									};
									U(p, (e) => {
										R(r) && e(m);
									});
									var h = I(p, 2), g = N(h);
									g.disabled = n === 0, W(g, () => X.up, !0), D(g);
									var _ = I(g, 2);
									W(_, () => X.down, !0), D(_), D(h);
									var v = I(h, 2);
									W(v, () => X.caret, !0), D(v), D(o);
									var y = I(o, 2), b = (e) => {
										var i = sx(), a = N(i);
										{
											let e = /* @__PURE__ */ A(() => R(t).icon ?? ""), r = /* @__PURE__ */ A(() => R(t).image ?? ""), i = /* @__PURE__ */ A(ps), o = /* @__PURE__ */ A(() => J("mp.pickMark"));
											qo(a, {
												get icon() {
													return R(e);
												},
												get image() {
													return R(r);
												},
												get images() {
													return R(i);
												},
												klass: "lrow-tile",
												get label() {
													return R(o);
												},
												onpick: (e) => hs(n, e),
												onfile: (e) => Cs(e, n),
												children: (e, n) => {
													var r = ax(), i = P(r), a = N(i), o = (e) => {
														var n = kb();
														L(() => q(n, "src", R(t).image)), V(e, n);
													}, s = (e) => {
														var n = Vr();
														W(P(n), () => yo(R(t).icon) || ""), V(e, n);
													};
													U(a, (e) => {
														R(t).image ? e(o) : R(t).icon && e(s, 1);
													}), D(i);
													var c = F(I(i, 2), !0);
													L((e) => H(c, e), [() => R(t).label || J("seed.link")]), V(e, r);
												},
												$$slots: { default: !0 }
											});
										}
										var o = I(a, 2), s = N(o);
										G(s);
										var c = I(s, 2);
										G(c);
										let l;
										var u = I(c, 2), d = (e) => {
											var t = ox(), n = F(t, !0);
											L((e) => H(n, e), [() => J("ui.badTarget")]), V(e, t);
										};
										U(u, (e) => {
											R(r) && e(d);
										});
										var f = I(u, 2), p = N(f);
										{
											let e = /* @__PURE__ */ A(() => R(t).icon ?? ""), r = /* @__PURE__ */ A(() => R(t).image ?? ""), i = /* @__PURE__ */ A(ps), a = /* @__PURE__ */ A(() => J("mp.pickMark"));
											qo(p, {
												get icon() {
													return R(e);
												},
												get image() {
													return R(r);
												},
												get images() {
													return R(i);
												},
												klass: "linkish",
												get label() {
													return R(a);
												},
												onpick: (e) => hs(n, e),
												onfile: (e) => Cs(e, n),
												children: (e, t) => {
													Oe();
													var n = Br();
													L((e) => H(n, e), [() => J("mp.changeMark")]), V(e, n);
												},
												$$slots: { default: !0 }
											});
										}
										var m = I(p, 2), h = F(m, !0);
										D(f), D(o), D(i), L((e, n, i, a, o, u) => {
											K(s, R(t).label), q(s, "title", e), q(s, "placeholder", n), l = Ei(c, 1, "field-filled", null, l, { "bad-target": R(r) }), K(c, R(t).href ?? ""), q(c, "placeholder", i), q(c, "title", a), q(m, "title", o), H(h, u);
										}, [
											() => J("tip.nav.launcherLabel"),
											() => J("lbl.text"),
											() => J("ph.hrefAnchor"),
											() => R(r) ? J("tip.badTarget") : J("tip.hrefAnchor"),
											() => J("tip.removeLink"),
											() => J("ui.remove")
										]), z("change", s, (e) => Ss(n, "label", e.target.value)), z("change", c, (e) => Ss(n, "href", e.target.value)), z("click", m, () => bs(n)), V(e, i);
									};
									U(y, (e) => {
										R(fs) === n && e(b);
									}), D(i), L((e, t, r) => {
										a = Ei(i, 1, "lrow", null, a, { open: R(fs) === n }), H(f, e), q(g, "title", t), q(_, "title", r), _.disabled = n === R(k).nav.launcher.links.length - 1;
									}, [
										() => R(t).label || J("seed.link"),
										() => J("tip.moveUp"),
										() => J("tip.moveDown")
									]), z("click", o, () => M(fs, R(fs) === n ? null : n, !0)), z("keydown", o, (e) => {
										(e.key === "Enter" || e.key === " ") && (e.preventDefault(), M(fs, R(fs) === n ? null : n, !0));
									}), z("click", h, (e) => e.stopPropagation()), z("keydown", h, (e) => e.stopPropagation()), z("click", g, () => xs(n, -1)), z("click", _, () => xs(n, 1)), V(e, i);
								});
								var E = I(re, 2), ie = F(E, !0);
								L((e, t, n, r, o, c, p, h) => {
									H(i, e), q(a, "aria-label", t), q(s, "title", n), H(l, r), K(u, R(k).nav.launcher?.mobileMax ?? 6), H(d, R(k).nav.launcher?.mobileMax ?? 6), q(f, "title", o), Ni(m, R(k).nav.launcher?.showTitle !== !1), H(g, ` ${c ?? ""}`), H(x, p), H(ie, h);
								}, [
									() => J("lbl.design"),
									() => J("lbl.design"),
									() => J("tip.nav.launcherMobileMax"),
									() => J("lbl.launcherMobileMax"),
									() => J("tip.nav.launcherTitle"),
									() => J("lbl.launcherShowTitle"),
									() => J("lbl.launcherButton"),
									() => J("ui.addLauncherLink")
								]), z("input", u, (e) => vs("mobileMax", e.target.valueAsNumber === 6 ? void 0 : e.target.valueAsNumber)), z("change", m, (e) => vs("showTitle", e.target.checked ? void 0 : !1)), z("click", E, ys), V(e, t);
							};
							U(m, (e) => {
								R(k).nav.launcher?.show === !0 && e(g);
							}), D(l), D(i), L((e, t, n, r) => {
								q(a, "title", e), H(s, t), q(u, "title", n), Ni(d, R(k).nav.launcher?.show === !0), H(f, ` ${r ?? ""}`);
							}, [
								() => J("tip.nav.launcher"),
								() => J("group.launcher"),
								() => J("tip.nav.launcher"),
								() => J("lbl.showInMenu")
							]), z("change", d, (e) => vs("show", e.target.checked ? !0 : void 0)), V(t, i);
						};
						U(a, (e) => {
							n === "theme" ? e(o) : n === "cart" ? e(s, 1) : e(c, -1);
						}), V(t, i);
					}), D(On);
				}
				D(Tn);
				var Mn = I(Tn, 2), Nn = N(Mn), Pn = F(Nn, !0), Fn = I(Nn, 2), In = N(Fn), Ln = N(In), Rn = F(Ln, !0), zn = I(Ln, 2);
				let Bn;
				ni(zn, 21, () => R(Ps), ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ A(() => h(R(t), 2));
					let r = () => R(n)[0], i = () => R(n)[1];
					var a = Mb();
					let o;
					var s = N(a);
					W(s, () => d[r()]);
					var c = F(I(s), !0);
					D(a), L(() => {
						o = Ei(a, 1, "tile", null, o, { on: (R(k).nav.style?.subStyle ?? "card") === r() }), q(a, "aria-pressed", (R(k).nav.style?.subStyle ?? "card") === r()), H(c, i());
					}), z("click", a, () => Qo("subStyle", r() === "card" ? void 0 : r())), V(e, a);
				}), D(zn), D(In);
				var Vn = I(In, 2), Hn = (e) => {
					var t = Ub(), n = P(t), r = (e) => {
						var t = Ub(), n = P(t);
						{
							let e = /* @__PURE__ */ A(() => J("lbl.sideSubs")), t = /* @__PURE__ */ A(() => J("tip.nav.sideSubs")), r = /* @__PURE__ */ A(() => R(k).nav.style?.sideSubs ?? "collapsed"), i = /* @__PURE__ */ A(() => [["collapsed", J("opt.mobileSubs.collapsed")], ["expanded", J("opt.mobileSubs.expanded")]]);
							Uu(n, {
								get label() {
									return R(e);
								},
								get title() {
									return R(t);
								},
								get value() {
									return R(r);
								},
								get options() {
									return R(i);
								},
								onchange: (e) => Qo("sideSubs", e === "collapsed" ? void 0 : e)
							});
						}
						var r = I(n, 2), i = (e) => {
							var t = Vb(), n = N(t);
							G(n);
							var r = I(n);
							D(t), L((e, i) => {
								q(t, "title", e), Ni(n, R(k).nav.style?.sideSubArrow === !0), H(r, ` ${i ?? ""}`);
							}, [() => J("tip.nav.sideSubArrow"), () => J("lbl.sideSubArrow")]), z("change", n, (e) => Qo("sideSubArrow", e.target.checked ? !0 : void 0)), V(e, t);
						};
						U(r, (e) => {
							R(k).nav.style?.sideSubs === "expanded" && e(i);
						}), V(e, t);
					};
					U(n, (e) => {
						R($o) && e(r);
					});
					var i = I(n, 2), a = (e) => {
						{
							let t = /* @__PURE__ */ A(() => J("lbl.subOpen")), n = /* @__PURE__ */ A(() => J("tip.nav.subOpen")), r = /* @__PURE__ */ A(() => R(k).nav.style?.subOpen ?? "hover"), i = /* @__PURE__ */ A(() => [
								["hover", J("opt.subOpen.hover")],
								["stay", J("opt.subOpen.stay")],
								["click", J("opt.subOpen.click")]
							]);
							Uu(e, {
								get label() {
									return R(t);
								},
								get title() {
									return R(n);
								},
								get value() {
									return R(r);
								},
								get options() {
									return R(i);
								},
								onchange: (e) => Qo("subOpen", e === "hover" ? void 0 : e)
							});
						}
					};
					U(i, (e) => {
						(!R($o) || R(k).nav.style?.sideSubs !== "expanded") && e(a);
					}), V(e, t);
				}, Un = /* @__PURE__ */ A(() => R(k).nav.items?.some((e) => e.children?.length));
				U(Vn, (e) => {
					R(Un) && e(Hn);
				});
				var Wn = I(Vn, 2), Gn = (e) => {
					var t = Py(), n = N(t), r = I(n);
					{
						let e = /* @__PURE__ */ A(() => R(k).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ A($r), n = /* @__PURE__ */ A(() => J("tip.nav.subPillColorPick"));
						Pa(r, {
							get value() {
								return R(e);
							},
							get tokens() {
								return R(t);
							},
							get label() {
								return R(n);
							},
							onchange: (e) => Qo("subPillColor", e)
						});
					}
					D(t), L((e, r) => {
						q(t, "title", e), H(n, `${r ?? ""} `);
					}, [() => J("tip.nav.subPillColor"), () => J("lbl.subPillColor")]), V(e, t);
				};
				U(Wn, (e) => {
					R(k).nav.style?.subStyle === "pills" && e(Gn);
				});
				var Kn = I(Wn, 2), qn = N(Kn), Jn = I(qn);
				G(Jn), D(Kn), D(Fn), D(Mn);
				var Yn = I(Mn, 2), Xn = N(Yn), Zn = F(Xn, !0), Qn = I(Xn, 2);
				{
					let e = (e, t = f) => {
						let n = /* @__PURE__ */ A(hu);
						var r = dx();
						let i;
						var a = N(r);
						W(a, () => bu, !0), D(a);
						var o = I(a, 2), s = N(o), c = F(s, !0), l = F(I(s, 2), !0);
						D(o), D(r), L(() => {
							i = Ei(r, 1, "nav-item ghost", null, i, { child: t() }), H(c, R(n).label), H(l, R(n).target);
						}), V(e, r);
					};
					var $n = N(Qn);
					ni($n, 21, () => R(k).nav.items, Qr, (t, n, r) => {
						let i = /* @__PURE__ */ A(() => `${r}`);
						var a = hx(), o = P(a), s = (t) => {
							e(t, () => !1);
						};
						U(o, (e) => {
							R(du)?.key === R(i) && R(du).pos === "before" && e(s);
						});
						var c = I(o, 2);
						let l;
						var u = N(c);
						W(u, () => bu, !0), D(u);
						var d = I(u, 2), f = N(d);
						G(f);
						var p = I(f, 2), m = N(p);
						{
							let e = /* @__PURE__ */ A(() => R(n).page ?? (R(n).href == null ? "__none" : "__href")), t = /* @__PURE__ */ A(() => J("tip.linkTarget")), i = /* @__PURE__ */ A(() => [
								...R(k).pages.map((e) => [e.id, e.title]),
								["__href", J("opt.linkHref")],
								...R(n).children ? [["__none", J("opt.noLink")]] : []
							]);
							Y(m, {
								compact: !0,
								get value() {
									return R(e);
								},
								get title() {
									return R(t);
								},
								get options() {
									return R(i);
								},
								onchange: (e) => au(r, e)
							});
						}
						var h = I(m, 2), g = (e) => {
							var t = fx();
							G(t), L((e, r) => {
								K(t, R(n).href), q(t, "placeholder", e), q(t, "title", r);
							}, [() => J("ph.hrefAnchor"), () => J("tip.hrefAnchor")]), z("change", t, (e) => ou(r, e.target.value)), V(e, t);
						};
						U(h, (e) => {
							!R(n).page && R(n).href != null && e(g);
						}), D(p), D(d);
						var _ = I(d, 2), v = (e) => {
							var t = px();
							W(t, () => "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M6 9l6 6 6-6\"/></svg>", !0), D(t), L((e) => q(t, "title", e), [() => J("tip.nav.hasSubmenu")]), V(e, t);
						};
						U(_, (e) => {
							R(n).children?.length && e(v);
						});
						var y = I(_, 2), b = N(y);
						W(b, () => X.plus, !0), D(b);
						var x = I(b, 2);
						x.disabled = r === 0, W(x, () => X.up, !0), D(x);
						var S = I(x, 2);
						W(S, () => X.cross, !0), D(S);
						var C = I(S, 2);
						W(C, () => X.down, !0), D(C), D(y);
						var w = I(y, 2);
						W(w, () => X.kebab, !0), D(w), D(c);
						var T = I(c, 2);
						ni(T, 17, () => R(n).children ?? [], Qr, (t, i, a) => {
							let o = /* @__PURE__ */ A(() => `${r}.${a}`);
							var s = mx(), c = P(s), l = (t) => {
								e(t, () => !0);
							};
							U(c, (e) => {
								R(du)?.key === R(o) && R(du).pos === "before" && e(l);
							});
							var u = I(c, 2);
							let d;
							var f = N(u);
							W(f, () => bu, !0), D(f);
							var p = I(f, 2), m = N(p);
							G(m);
							var h = I(m, 2), g = N(h);
							{
								let e = /* @__PURE__ */ A(() => R(i).page ?? "__href"), t = /* @__PURE__ */ A(() => J("tip.linkTarget")), n = /* @__PURE__ */ A(() => [...R(k).pages.map((e) => [e.id, e.title]), ["__href", J("opt.linkHref")]]);
								Y(g, {
									compact: !0,
									get value() {
										return R(e);
									},
									get title() {
										return R(t);
									},
									get options() {
										return R(n);
									},
									onchange: (e) => wu(r, a, e)
								});
							}
							var _ = I(g, 2), v = (e) => {
								var t = fx();
								G(t), L((e, n) => {
									K(t, R(i).href ?? ""), q(t, "placeholder", e), q(t, "title", n);
								}, [() => J("ph.hrefAnchor"), () => J("tip.hrefAnchor")]), z("change", t, (e) => Tu(r, a, e.target.value)), V(e, t);
							};
							U(_, (e) => {
								R(i).page || e(v);
							}), D(h), D(p);
							var y = I(p, 2), b = N(y);
							b.disabled = a === 0, W(b, () => X.up, !0), D(b);
							var x = I(b, 2);
							W(x, () => X.cross, !0), D(x);
							var S = I(x, 2);
							W(S, () => X.down, !0), D(S), D(y);
							var C = I(y, 2);
							W(C, () => X.kebab, !0), D(C), D(u);
							var w = I(u, 2), T = (t) => {
								e(t, () => !0);
							};
							U(w, (e) => {
								R(du)?.key === R(o) && R(du).pos === "after" && e(T);
							}), L((e, t, r, s, c, l, p) => {
								d = Ei(u, 1, "nav-item child", null, d, {
									selected: R(lu) === R(o),
									dragging: R(uu) === R(o)
								}), q(u, "data-key", R(o)), q(f, "title", e), K(m, R(i).label), q(m, "title", t), q(b, "title", r), q(x, "title", s), q(S, "title", c), S.disabled = a === R(n).children.length - 1, q(C, "title", l), q(C, "aria-label", p);
							}, [
								() => J("tip.nav.dragItem"),
								() => J("tip.nav.childLabel"),
								() => J("tip.moveUp"),
								() => J("tip.nav.removeChild"),
								() => J("tip.moveDown"),
								() => J("tip.nav.itemActions"),
								() => J("tip.nav.itemActions")
							]), z("click", u, (e) => {
								e.stopPropagation(), M(lu, R(o));
							}), jr("dragstart", f, (e) => {
								e.stopPropagation(), M(uu, R(o)), e.dataTransfer?.setData(_u, R(o));
							}), jr("dragend", f, gu), z("input", m, (e) => Cu(r, a, e.target.value)), z("click", b, () => Eu(r, a, -1)), z("click", x, () => Du(r, a)), z("click", S, () => Eu(r, a, 1)), z("click", C, (e) => {
								e.stopPropagation(), M(lu, R(o));
							}), V(t, s);
						});
						var ee = I(T, 2), te = (t) => {
							e(t, () => !0);
						};
						U(ee, (e) => {
							R(du)?.key === R(i) && R(du).pos === "into" && e(te);
						});
						var ne = I(ee, 2), re = (t) => {
							e(t, () => !1);
						};
						U(ne, (e) => {
							R(du)?.key === R(i) && R(du).pos === "after" && e(re);
						}), L((e, t, a, o, s, d, p, m) => {
							l = Ei(c, 1, "nav-item", null, l, {
								selected: R(lu) === R(i),
								dragging: R(uu) === R(i),
								"drop-target": R(du)?.key === R(i) && R(du).pos === "into"
							}), q(c, "data-key", R(i)), q(u, "title", e), K(f, R(n).label), q(f, "title", t), q(b, "title", a), q(x, "title", o), q(S, "title", s), q(C, "title", d), C.disabled = r === R(k).nav.items.length - 1, q(w, "title", p), q(w, "aria-label", m);
						}, [
							() => J("tip.nav.dragItem"),
							() => J("tip.nav.itemLabel"),
							() => J("tip.nav.addChild"),
							() => J("tip.moveUp"),
							() => J("tip.nav.removeItem"),
							() => J("tip.moveDown"),
							() => J("tip.nav.itemActions"),
							() => J("tip.nav.itemActions")
						]), z("click", c, () => {
							M(lu, R(i));
						}), jr("dragstart", u, (e) => {
							M(uu, R(i)), e.dataTransfer?.setData(_u, R(i));
						}), jr("dragend", u, gu), z("input", f, (e) => iu(r, e.target.value)), z("click", b, () => Su(r)), z("click", x, () => su(r, -1)), z("click", S, () => cu(r)), z("click", C, () => su(r, 1)), z("click", w, () => {
							M(lu, R(i));
						}), V(t, a);
					}), D($n);
					var er = I($n, 2), tr = F(er, !0), nr = I(er, 2), rr = N(nr);
					G(rr);
					var ir = I(rr, 2), ar = F(ir, !0);
					D(nr), D(Qn), L((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, ee, te, ne, re, E, ie, ae, oe, se, ce, le, ue, de, fe, pe, me, he, ge, _e, ve, ye, be, xe, Se, Ce, we, Te, Ee, De, D, Oe, ke) => {
						H(tr, Ee), q(nr, "title", De), q(rr, "placeholder", D), ir.disabled = Oe, H(ar, ke);
					}, [
						() => J("hint.nav.logoHome"),
						() => J("group.logo"),
						() => J("group.appearance"),
						() => J("group.navLayout"),
						() => J("tip.nav.variant"),
						() => J("lbl.navVariant"),
						() => J("lbl.navVariant"),
						() => J("tip.nav.sizePreset"),
						() => J("lbl.size"),
						() => J("tip.nav.sizePreset"),
						() => J("lbl.adjust"),
						() => J("tip.nav.menuTextSize"),
						() => J("lbl.navTextSize"),
						() => J("group.navFrame"),
						() => J("group.navBehaviour"),
						() => J("tip.nav.mobileSame"),
						() => J("group.mobile"),
						() => J("tip.nav.menuTextSize"),
						() => J("lbl.navTextSize"),
						() => J("lbl.navSameAsDesktop"),
						() => J("tip.nav.mobileSize"),
						() => J("lbl.size"),
						() => J("tip.nav.mobileLayout"),
						() => J("lbl.navPlacement"),
						() => J("tip.nav.mobileTools"),
						() => J("lbl.toolsSide"),
						() => J("tip.nav.mobileBorder"),
						() => J("lbl.navBorder"),
						() => J("tip.nav.mobileMenu"),
						() => J("lbl.mobileMenu"),
						() => J("group.navColours"),
						() => J("lbl.navHover"),
						() => J("lbl.navHover"),
						() => J("tip.nav.hoverTextColor"),
						() => J("lbl.hoverTextColor"),
						() => J("tip.nav.textColorPick"),
						() => J("lbl.textColor"),
						() => J("tip.nav.blur"),
						() => J("lbl.navBlur"),
						() => J("lbl.background"),
						() => J("tip.nav.announce"),
						() => J("group.announcement"),
						() => J("tip.nav.announce"),
						() => J("lbl.announceShow"),
						() => J("tip.nav.tools"),
						() => J("group.tools"),
						() => J("group.submenu"),
						() => J("lbl.design"),
						() => J("lbl.design"),
						() => J("tip.nav.subColumns"),
						() => J("lbl.columns"),
						() => J("hint.nav.submenu"),
						() => J("group.menuItems"),
						() => J("ui.addMenuItem"),
						() => J("tip.nav.newPageAsItem"),
						() => J("ph.nav.newPageTitle"),
						() => !R(m).trim(),
						() => J("ui.newPageAsItem")
					]), jr("dragover", $n, vu), jr("drop", $n, (e) => {
						e.preventDefault(), yu(R(du)?.key ?? "");
					}), z("click", er, xu), z("keydown", rr, (e) => {
						e.key === "Enter" && g();
					}), Li(rr, () => R(m), (e) => M(m, e)), z("click", ir, g);
				}
				D(Yn), D(t), L((e, t, n, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, T, ee, te, re, ie, se, ce, le, ue, de, fe, pe, me, he, ge, _e, ve, xe, Ce, we, Ee, De, D, Oe, ke, je, Fe, Ie, Le, Re, Be, Ve, He, O, Ue, We) => {
					q(r, "title", e), H(i, t), H(w, n), H(ne, a), q(E, "title", o), H(ae, s), q(oe, "aria-label", c), q(ye, "title", l), H(be, u), q(Se, "title", d), H(Te, f), q(Ae, "title", p), H(Me, m), q(Ne, "min", lm.min), q(Ne, "max", lm.max), q(Ne, "step", lm.step), K(Ne, R(rs)), q(Pe, "min", lm.min), q(Pe, "max", lm.max), K(Pe, R(rs)), H(ze, h), H(qe, g), q(Qe, "title", _), H($e, v), q(it, "title", y), H(ot, b), q(st, "min", lm.min), q(st, "max", lm.max), q(st, "placeholder", x), K(st, R(k).nav.style?.mobile?.textSize ?? ""), q(lt, "title", S), H(dt, C), q(pt, "title", T), H(ht, ee), q(vt, "title", te), H(bt, re), q(Tt, "title", ie), H(Dt, se), q(Mt, "title", ce), H(Pt, le), H(Gt, ue), H(Yt, de), q(Xt, "aria-label", fe), q(tn, "title", pe), H(rn, me), q(an, "title", he), H(sn, ge), q(cn, "title", _e), Ni(ln, R(k).nav.style?.blur !== !1), H(un, ` ${ve ?? ""}`), H(pn, xe), q(_n, "title", Ce), H(vn, we), q(bn, "title", Ee), Ni(xn, R(k).nav.announcement?.show === !0), H(Sn, ` ${De ?? ""}`), q(En, "title", D), H(Dn, Oe), H(Pn, ke), H(Rn, je), Bn = Ei(zn, 1, "tile-grid", null, Bn, {
						"cols-5": !R($o),
						"cols-3": R($o)
					}), q(zn, "aria-label", Fe), q(Kn, "title", Ie), H(qn, `${Le ?? ""} `), K(Jn, R(k).nav.style?.subColumns ?? 1), q(Xn, "title", Re), H(Zn, Be);
				}, [
					() => J("hint.nav.logoHome"),
					() => J("group.logo"),
					() => J("group.appearance"),
					() => J("group.navLayout"),
					() => J("tip.nav.variant"),
					() => J("lbl.navVariant"),
					() => J("lbl.navVariant"),
					() => J("tip.nav.sizePreset"),
					() => J("lbl.size"),
					() => J("tip.nav.sizePreset"),
					() => J("lbl.adjust"),
					() => J("tip.nav.menuTextSize"),
					() => J("lbl.navTextSize"),
					() => J("group.navFrame"),
					() => J("group.navBehaviour"),
					() => J("tip.nav.mobileSame"),
					() => J("group.mobile"),
					() => J("tip.nav.menuTextSize"),
					() => J("lbl.navTextSize"),
					() => J("lbl.navSameAsDesktop"),
					() => J("tip.nav.mobileSize"),
					() => J("lbl.size"),
					() => J("tip.nav.mobileLayout"),
					() => J("lbl.navPlacement"),
					() => J("tip.nav.mobileTools"),
					() => J("lbl.toolsSide"),
					() => J("tip.nav.mobileBorder"),
					() => J("lbl.navBorder"),
					() => J("tip.nav.mobileMenu"),
					() => J("lbl.mobileMenu"),
					() => J("group.navColours"),
					() => J("lbl.navHover"),
					() => J("lbl.navHover"),
					() => J("tip.nav.hoverTextColor"),
					() => J("lbl.hoverTextColor"),
					() => J("tip.nav.textColorPick"),
					() => J("lbl.textColor"),
					() => J("tip.nav.blur"),
					() => J("lbl.navBlur"),
					() => J("lbl.background"),
					() => J("tip.nav.announce"),
					() => J("group.announcement"),
					() => J("tip.nav.announce"),
					() => J("lbl.announceShow"),
					() => J("tip.nav.tools"),
					() => J("group.tools"),
					() => J("group.submenu"),
					() => J("lbl.design"),
					() => J("lbl.design"),
					() => J("tip.nav.subColumns"),
					() => J("lbl.columns"),
					() => J("hint.nav.submenu"),
					() => J("group.menuItems"),
					() => J("ui.addMenuItem"),
					() => J("tip.nav.newPageAsItem"),
					() => J("ph.nav.newPageTitle"),
					() => !R(m).trim(),
					() => J("ui.newPageAsItem")
				]), z("input", Ne, (e) => Qo("textSize", e.target.valueAsNumber)), z("change", Pe, (e) => Ts(e, "textSize", lm)), z("change", st, (e) => Es(e, "textSize", lm)), z("change", ln, (e) => Qo("blur", e.target.checked)), z("change", xn, (e) => us("show", e.target.checked ? !0 : void 0)), z("change", Jn, (e) => Qo("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), V(e, t);
			}, x = (e) => {
				var t = Tx(), n = N(t), r = N(n), i = I(r);
				G(i), D(n);
				var a = I(n, 2), o = N(a), s = I(o);
				G(s), D(a);
				var c = I(a, 2), l = N(c), u = I(l);
				{
					let e = /* @__PURE__ */ A(Eo), t = /* @__PURE__ */ A(Do);
					Y(u, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => Oo(e)
					});
				}
				D(c);
				var d = I(c, 2), f = N(d), p = I(f);
				G(p);
				let m;
				D(d);
				var g = I(d, 2), _ = (e) => {
					var t = _x(), n = F(t, !0);
					L((e) => H(n, e), [() => J("settings.timeZoneBad")]), V(e, t);
				};
				U(g, (e) => {
					R(Vo) && e(_);
				});
				var v = I(g, 2), y = N(v), b = I(y);
				{
					let e = /* @__PURE__ */ A(() => cy(R(k))), t = /* @__PURE__ */ A(() => sy.map((e) => [
						e,
						J(`mapService.${e}`),
						J(`mapService.${e}.note`)
					]));
					Y(b, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => Bo(e)
					});
				}
				D(v);
				var x = I(v, 2), S = N(x), C = I(S);
				G(C), D(x);
				var w = I(x, 2), T = N(w), ee = F(T, !0), te = I(T, 2), ne = N(te), re = N(ne);
				W(re, () => X.plus);
				var E = I(re);
				D(ne);
				var ie = I(ne, 2), ae = (e) => {
					var t = bx();
					ni(t, 23, No, (e) => e.id, (e, t, n) => {
						let r = /* @__PURE__ */ A(() => R(jo) === R(t).id);
						var i = yx();
						let a;
						var o = N(i), s = N(o);
						let c;
						var l = I(s, 2), u = N(l), d = F(u, !0), f = F(I(u, 2), !0);
						D(l);
						var p = I(l, 2);
						W(p, () => X.down, !0), D(p), D(o);
						var m = I(o, 2), g = N(m), _ = N(g), v = N(_), y = F(v, !0), b = I(v, 2), x = N(b), S = I(x);
						G(S), D(b);
						var C = I(b, 2), w = N(C), T = I(w);
						G(T), D(C);
						var ee = I(C, 2), te = N(ee), ne = I(te);
						G(ne), D(ee);
						var re = I(ee, 2), E = F(re, !0), ie = I(re, 2), ae = N(ie), oe = N(ae);
						{
							let e = /* @__PURE__ */ A(() => R(t).color || "accent"), r = /* @__PURE__ */ A($r), i = /* @__PURE__ */ A(() => J("siteCal.colorMain"));
							Pa(oe, {
								get value() {
									return R(e);
								},
								get tokens() {
									return R(r);
								},
								get label() {
									return R(i);
								},
								onchange: (e) => Ro(R(n), "color", e ?? "")
							});
						}
						var se = F(I(oe, 2), !0);
						D(ae), ni(I(ae, 2), 16, () => [
							["colorText", "siteCal.colorText"],
							["colorBox", "siteCal.colorBox"],
							["colorChip", "siteCal.colorChip"]
						], ([e, t]) => e, (e, r) => {
							var i = /* @__PURE__ */ A(() => h(r, 2));
							let a = () => R(i)[0], o = () => R(i)[1];
							var s = vx(), c = N(s);
							{
								let e = /* @__PURE__ */ A(() => R(t)[a()] || ""), r = /* @__PURE__ */ A($r), i = /* @__PURE__ */ A(() => J(o()));
								Pa(c, {
									get value() {
										return R(e);
									},
									get tokens() {
										return R(r);
									},
									allowClear: !0,
									get label() {
										return R(i);
									},
									onchange: (e) => Ro(R(n), a(), e ?? "")
								});
							}
							var l = F(I(c, 2), !0);
							D(s), L((e, t) => {
								q(s, "title", e), H(l, t);
							}, [() => J(`tip.${o()}`), () => J(o())]), V(e, s);
						}), D(ie);
						var ce = I(ie, 2), le = F(ce, !0), ue = I(ce, 2), de = N(ue), fe = I(de);
						G(fe), D(ue);
						var pe = I(ue, 2), me = N(pe), he = I(me);
						G(he), D(pe);
						var ge = I(pe, 2), _e = N(ge);
						G(_e);
						var ve = I(_e);
						D(ge);
						var ye = I(ge, 2), be = N(ye);
						G(be);
						var xe = I(be);
						D(ye);
						var Se = I(ye, 2), Ce = N(Se), we = N(Ce);
						W(we, () => X.up, !0), D(we);
						var Te = I(we, 2);
						W(Te, () => X.down, !0), D(Te), D(Ce);
						var Ee = I(Ce, 2), De = F(Ee, !0);
						D(Se), D(_), D(g), D(m), D(i), L((e, l, u, p, h, g, _, v, b, C, re, ie, oe, ce, Se, Ce, D, Oe, ke, Ae, je, Me, Ne, Pe, Fe, Ie) => {
							a = Ei(i, 1, "site-cal-row", null, a, { open: R(r) }), q(o, "aria-expanded", R(r)), c = Oi(s, "", c, { background: e }), H(d, l), H(f, u), m.inert = !R(r), H(y, p), H(x, `${h ?? ""} `), K(S, R(t).name ?? ""), q(S, "placeholder", g), q(S, "title", _), q(S, "data-cal-name", R(t).id), H(w, `${v ?? ""} `), K(T, R(t).url), q(T, "placeholder", b), q(ee, "title", C), H(te, `${re ?? ""} `), K(ne, R(t).description ?? ""), H(E, ie), q(ae, "title", oe), H(se, ce), H(le, Se), q(ue, "title", Ce), H(de, `${D ?? ""} `), K(fe, R(t).link ?? ""), q(pe, "title", Oe), H(me, `${ke ?? ""} `), K(he, R(t).organizer ?? ""), q(ge, "title", Ae), Ni(_e, R(t).subscribable !== !1), H(ve, ` ${je ?? ""}`), q(ye, "title", Me), Ni(be, R(t).inFilter !== !1), H(xe, ` ${Ne ?? ""}`), we.disabled = R(n) === 0, Te.disabled = Pe, q(Ee, "title", Fe), H(De, Ie);
						}, [
							() => Ud(R(t).color),
							() => R(t).name || R(t).url || J("ui.addSiteCalendar"),
							() => R(t).url || J("calendar.sourceUrl"),
							() => J("group.siteCalBasics"),
							() => J("lbl.name"),
							() => J("calendar.sourceName"),
							() => J("tip.calendar.sourceName"),
							() => J("calendar.sourceUrl"),
							() => J("calendar.sourcesPh"),
							() => J("tip.siteCal.description"),
							() => J("siteCal.description"),
							() => J("group.siteCalColors"),
							() => J("tip.calendar.sourceColor"),
							() => J("siteCal.colorMain"),
							() => J("group.siteCalVisitors"),
							() => J("tip.siteCal.link"),
							() => J("siteCal.link"),
							() => J("tip.siteCal.organizer"),
							() => J("siteCal.organizer"),
							() => J("tip.siteCal.subscribable"),
							() => J("siteCal.subscribable"),
							() => J("tip.siteCal.inFilter"),
							() => J("siteCal.inFilter"),
							() => R(n) === No().length - 1,
							() => J("tip.site.removeCalendar"),
							() => J("siteCal.remove")
						]), z("click", o, () => M(jo, R(r) ? null : R(t).id, !0)), z("change", S, (e) => Ro(R(n), "name", e.target.value)), z("change", T, (e) => Ro(R(n), "url", e.target.value, !0)), z("change", ne, (e) => Ro(R(n), "description", e.target.value)), z("change", fe, (e) => Ro(R(n), "link", e.target.value)), z("change", he, (e) => Ro(R(n), "organizer", e.target.value)), z("change", _e, (e) => zo(R(n), "subscribable", e.target.checked)), z("change", be, (e) => zo(R(n), "inFilter", e.target.checked)), z("click", we, () => Lo(R(n), -1)), z("click", Te, () => Lo(R(n), 1)), z("click", Ee, () => Io(R(n))), V(e, i);
					}), D(t), V(e, t);
				}, oe = /* @__PURE__ */ A(() => No().length);
				U(ie, (e) => {
					R(oe) && e(ae);
				}), D(te), D(w);
				var se = I(w, 4), ce = F(se, !0), le = I(se, 2), ue = N(le);
				ni(ue, 17, () => R(So), (e) => e.screen, (e, t) => {
					var n = xx(), r = N(n), i = F(r, !0), a = I(r, 2);
					let o;
					var s = F(a), c = F(I(a, 2), !0);
					D(n), L(() => {
						H(i, R(t).screen), o = Ei(a, 1, "cw-bar", null, o, { fluid: !R(t).bound }), Oi(s, `width:${R(t).pct ?? ""}%`), H(c, R(t).bound ? `${R(t).margin}` : "-");
					}), V(e, n);
				});
				var de = I(ue, 2), fe = N(de), pe = F(fe, !0), me = F(I(fe, 2), !0);
				D(de);
				var he = I(de, 2), ge = (e) => {
					var t = Sx(), n = F(t, !0);
					L((e) => H(n, e), [() => J("lbl.bindsFrom", { n: R(De) })]), V(e, t);
				};
				U(he, (e) => {
					R(po) !== "full" && e(ge);
				}), D(le);
				var _e = I(le, 2);
				ni(_e, 21, () => tm, (e) => e.id, (e, t) => {
					var n = db();
					let r;
					var i = F(n, !0);
					L((e) => {
						r = Ei(n, 1, "", null, r, { on: R(ho) === R(t).id }), H(i, e);
					}, [() => J(`lbl.width.${R(t).id}`)]), z("click", n, () => wo(R(t).width)), V(e, n);
				}), D(_e);
				var ve = I(_e, 2), ye = (e) => {
					var t = Cx(), n = N(t), r = F(n, !0), i = I(n, 2);
					G(i);
					var a = F(I(i, 2));
					D(t), L((e, n) => {
						q(t, "title", e), H(r, n), q(i, "min", 960), q(i, "max", $p), q(i, "step", 20), K(i, R(xo)), H(a, `${R(xo) ?? ""} px`);
					}, [() => J("tip.site.contentWidthFree"), () => J("lbl.widthFree")]), z("input", i, (e) => wo(e.target.valueAsNumber)), V(e, t);
				};
				U(ve, (e) => {
					R(po) !== "full" && e(ye);
				});
				var be = I(ve, 2), xe = F(be, !0), Se = I(be, 2);
				ni(Se, 21, () => em, (e) => e.id, (e, t) => {
					var n = db();
					let r;
					var i = F(n, !0);
					L((e) => {
						r = Ei(n, 1, "", null, r, { on: R(go) === R(t).id }), H(i, e);
					}, [() => J(`lbl.gutter.${R(t).id}`)]), z("click", n, () => To(R(t).gutter)), V(e, n);
				}), D(Se);
				var Ce = I(Se, 2), we = N(Ce), Te = F(we, !0), Ee = I(we, 2), Oe = N(Ee), ke = N(Oe), Ae = F(ke, !0), je = I(ke, 2);
				G(je);
				var Me = F(I(je, 2));
				D(Oe), D(Ee), D(Ce);
				var Ne = I(Ce, 4), Pe = N(Ne), Fe = I(Pe), Ie = (e) => {
					var t = Cb();
					L((e) => {
						q(t, "src", R(k).site.icon), q(t, "alt", e);
					}, [() => J("lbl.siteIcon")]), V(e, t);
				};
				U(Fe, (e) => {
					R(k).site.icon && e(Ie);
				}), D(Ne);
				var Le = I(Ne, 2), Re = N(Le), ze = N(Re), Be = I(ze);
				D(Re);
				var Ve = I(Re, 2), He = (e) => {
					var t = wx(), n = P(t);
					W(n, () => X.pencil ?? "✎", !0), D(n);
					var r = I(n, 2);
					W(r, () => X.cross, !0), D(r), L((e, t) => {
						q(n, "title", e), q(r, "title", t);
					}, [() => J("tip.site.editIcon"), () => J("tip.site.removeIcon")]), z("click", n, () => M(ao, R(k).site.icon, !0)), z("click", r, co), V(e, t);
				};
				U(Ve, (e) => {
					R(k).site.icon && e(He);
				}), D(Le), D(t), L((e, t, u, h, g, _, b, w, te, ne, re, ie, ae, oe, le, ue, de, fe, he, ge, _e, ve, ye, Se, we, Ee, De, D, ke, Ne) => {
					q(n, "title", e), H(r, `${t ?? ""} `), K(i, R(k).site.title ?? ""), q(i, "placeholder", u), q(a, "title", h), H(o, `${g ?? ""} `), K(s, R(k).site.description ?? ""), q(s, "placeholder", _), q(c, "title", b), H(l, `${w ?? ""} `), q(d, "title", te), H(f, `${ne ?? ""} `), K(p, R(k).site.timeZone ?? ""), m = Ei(p, 1, "", null, m, { "place-error": R(Vo) }), q(v, "title", re), H(y, `${ie ?? ""} `), q(x, "title", ae), H(S, `${oe ?? ""} `), K(C, le), q(T, "title", ue), H(ee, de), H(E, ` ${fe ?? ""}`), q(se, "title", he), H(ce, ge), H(pe, _e), H(me, ve), q(be, "title", ye), H(xe, Se), Ce.open = R(go) === null || R(bo), H(Te, we), q(Oe, "title", Ee), H(Ae, De), q(je, "min", 0), q(je, "max", 12), q(je, "step", 1), K(je, R(mo)), H(Me, `${R(mo) ?? ""} vw`), H(Pe, `${D ?? ""} `), q(Re, "title", ke), H(ze, `${Ne ?? ""} `);
				}, [
					() => J("tip.site.name"),
					() => J("lbl.name"),
					() => J("ph.site.name"),
					() => J("tip.site.description"),
					() => J("lbl.description"),
					() => J("ph.site.description"),
					() => J("site.langTitle"),
					() => J("site.langLabel"),
					() => J("tip.settings.timeZone"),
					() => J("settings.timeZone"),
					() => J("tip.settings.mapService"),
					() => J("settings.mapService"),
					() => J("tip.settings.meetingHosts"),
					() => J("settings.meetingHosts"),
					() => (R(k).site.meetingHosts ?? []).join(", "),
					() => J("tip.site.calendars"),
					() => J("group.siteCalendars"),
					() => J("ui.addSiteCalendar"),
					() => J("tip.site.contentWidth"),
					() => J("lbl.contentWidth"),
					() => J("lbl.screenPx"),
					() => J("lbl.marginPx"),
					() => J("tip.site.gutter"),
					() => J("lbl.gutter"),
					() => J("group.advanced"),
					() => J("tip.site.gutterVw"),
					() => J("lbl.gutterVw"),
					() => J("lbl.siteIcon"),
					() => J("tip.site.icon"),
					() => R(k).site.icon ? J("ui.changeIcon") : J("ui.chooseIcon")
				]), z("input", i, (e) => lo(e.target.value)), z("input", s, (e) => uo(e.target.value)), z("change", p, (e) => Ho(e.target.value)), z("change", C, (e) => ko(e.target.value)), z("click", ne, () => Fo()), Wi("open", "toggle", w, (e) => M(Ao, e), () => R(Ao)), jr("toggle", Ce, (e) => M(bo, e.currentTarget.open, !0)), z("input", je, (e) => To(e.target.valueAsNumber)), z("change", Be, oo), V(e, t);
			}, S = (e) => {
				var t = Nx();
				{
					let e = (e, t = f, n = f) => {
						var r = Dx(), i = N(r), a = (e) => {
							var t = Ex(), r = F(t, !0);
							L(() => H(r, n())), V(e, t);
						};
						U(i, (e) => {
							n() && e(a);
						});
						var o = I(i, 2), s = N(o), c = F(s, !0), l = I(s, 2), u = F(l, !0), d = I(l, 2), p = N(d), m = F(p, !0), h = F(I(p), !0);
						D(d), D(o), D(r), L((e, t, n, r, i, a, s, l, d) => {
							Oi(o, `--tv-bg:${e ?? ""};--tv-surface:${t ?? ""};--tv-text:${n ?? ""};--tv-accent:${r ?? ""};--tv-accent-ink:${i ?? ""}`), H(c, a), H(u, s), H(m, l), H(h, d);
						}, [
							() => Zu(t().bg, t()),
							() => Zu(t().surface, t()),
							() => Zu(t().text, t()),
							() => Zu(t().accent, t()),
							() => Zu(t()["accent-text"] ?? C(Zu(t().accent ?? "#000000", t())), t()),
							() => J("preview.heading"),
							() => J("preview.cardBody"),
							() => J("preview.button"),
							() => J("preview.link")
						]), V(e, r);
					};
					var n = N(t), r = F(n, !0), i = I(n, 2);
					ni(i, 21, () => $u, (e) => e.id, (e, t) => {
						var n = Ox();
						let r;
						var i = N(n), a = N(i), o = I(a), s = I(o), c = I(s);
						D(i);
						var l = F(I(i, 2), !0);
						D(n), L(() => {
							r = Ei(n, 1, "theme-preset", null, r, { sel: R(td) === R(t).id }), q(n, "title", `${R(t).name} - ${R(t).note}`), Oi(a, `background:${R(t).light.bg ?? ""}`), Oi(o, `background:${R(t).light.surface ?? ""}`), Oi(s, `background:${R(t).light.accent ?? ""}`), Oi(c, `background:${R(t).light.text ?? ""}`), H(l, R(t).name);
						}), z("click", n, () => ed(R(t))), V(e, n);
					}), D(i);
					var a = I(i, 2), o = F(a, !0), s = I(a, 2), c = N(s);
					G(c);
					var l = I(c);
					D(s);
					var u = I(s, 2), d = (e) => {
						var t = kx(), n = N(t), r = F(n, !0), i = I(n, 2), a = N(i);
						let o;
						var s = F(a, !0), c = I(a, 2);
						let l;
						var u = F(c, !0);
						D(i), D(t), L((e, t, n, i) => {
							H(r, e), q(a, "title", t), o = Ei(a, 1, "", null, o, { on: R(ri) }), H(s, n), l = Ei(c, 1, "", null, l, { on: !R(ri) }), H(u, i);
						}, [
							() => J("lbl.darkColors"),
							() => J("hint.theme.autoDark"),
							() => J("opt.auto"),
							() => J("opt.custom")
						]), z("click", a, () => qu(!0)), z("click", c, () => qu(!1)), V(e, t);
					};
					U(u, (e) => {
						R(ti) && e(d);
					});
					var p = I(u, 2), m = N(p), g = (e) => {
						var t = Ax(), n = F(t, !0);
						L((e) => H(n, e), [() => J("lbl.light")]), V(e, t);
					};
					U(m, (e) => {
						R(ti) && e(g);
					});
					var _ = I(m, 2);
					let Ie;
					var v = F(_, !0);
					D(p);
					var y = I(p, 2);
					ni(y, 21, () => ei, ([e, t, n]) => e, (e, t) => {
						var n = /* @__PURE__ */ A(() => h(R(t), 3));
						let r = () => R(n)[0], i = () => R(n)[1], a = () => R(n)[2];
						var o = jx(), s = N(o);
						{
							let e = /* @__PURE__ */ A(() => R(k).theme.tokens.color[r()] ?? ku(r(), R(ai))), t = /* @__PURE__ */ A($r);
							Pa(s, {
								get value() {
									return R(e);
								},
								get tokens() {
									return R(t);
								},
								get label() {
									return i();
								},
								onchange: (e) => Ou(r(), e)
							});
						}
						var c = I(s, 2), l = F(c, !0), u = F(I(c, 2), !0);
						D(o), L((e) => {
							H(l, a()), H(u, e);
						}, [() => Zu(R(k).theme.tokens.color[r()] ?? ku(r(), R(ai)), R(ai))]), V(e, o);
					}), D(y);
					var b = I(y, 2), x = (e) => {
						var t = Mx(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2);
						let o;
						var s = F(a, !0);
						D(n);
						var c = I(n, 2);
						let l;
						ni(c, 21, () => ei, ([e, t, n]) => e, (e, t) => {
							var n = /* @__PURE__ */ A(() => h(R(t), 3));
							let r = () => R(n)[0], i = () => R(n)[1], a = () => R(n)[2];
							var o = jx(), s = N(o);
							{
								let e = /* @__PURE__ */ A(() => R(k).theme.alt.tokens.color[r()] ?? R(oi)[r()] ?? ku(r(), R(oi))), t = /* @__PURE__ */ A($r), n = /* @__PURE__ */ A(() => J("theme.darkColorLabel", { name: i() }));
								Pa(s, {
									get value() {
										return R(e);
									},
									get tokens() {
										return R(t);
									},
									get label() {
										return R(n);
									},
									onchange: (e) => Wu(r(), e)
								});
							}
							var c = I(s, 2), l = F(c, !0), u = F(I(c, 2), !0);
							D(o), L((e) => {
								H(l, a()), H(u, e);
							}, [() => Zu(R(k).theme.alt.tokens.color[r()] ?? R(oi)[r()] ?? ku(r(), R(oi)), R(oi))]), V(e, o);
						}), D(c), L((e, t, n) => {
							H(i, e), o = Ei(a, 1, "chip", null, o, { accent: R(ii) === "dark" }), q(a, "title", t), H(s, n), l = Ei(c, 1, "palcells", null, l, { autopal: R(ri) });
						}, [
							() => J("lbl.dark"),
							() => J("tip.theme.darkDefault"),
							() => J("common.standard")
						]), z("click", a, () => Gu("dark")), V(e, t);
					};
					U(b, (e) => {
						R(ti) && e(x);
					});
					var S = I(b, 2), w = N(S), T = F(w, !0), ee = I(w, 2);
					let Le;
					var te = F(ee, !0);
					D(S);
					var ne = I(S, 2), re = N(ne);
					{
						let t = /* @__PURE__ */ A(() => R(ti) ? J("lbl.light") : "");
						e(re, () => R(ai), () => R(t));
					}
					var E = I(re, 2), ie = (t) => {
						{
							let n = /* @__PURE__ */ A(() => J("lbl.dark"));
							e(t, () => R(oi), () => R(n));
						}
					};
					U(E, (e) => {
						R(ti) && e(ie);
					}), D(ne);
					var ae = I(ne, 2), oe = N(ae), se = F(oe, !0), ce = I(oe, 2), le = N(ce), ue = N(le), de = I(ue);
					{
						let e = /* @__PURE__ */ A(() => Ju("heading"));
						Y(de, {
							get value() {
								return R(k).theme.tokens.font.heading;
							},
							get options() {
								return R(e);
							},
							onchange: (e) => zu("heading", e)
						});
					}
					D(le);
					var fe = I(le, 2), pe = N(fe), me = I(pe);
					{
						let e = /* @__PURE__ */ A(() => Ju("body"));
						Y(me, {
							get value() {
								return R(k).theme.tokens.font.body;
							},
							get options() {
								return R(e);
							},
							onchange: (e) => zu("body", e)
						});
					}
					D(fe);
					var he = I(fe, 2), ge = N(he), _e = F(ge, !0), ve = I(ge, 2), ye = F(ve, !0);
					D(he), D(ce), D(ae);
					var be = I(ae, 2), xe = N(be), Se = F(xe, !0), Ce = I(xe, 2), we = N(Ce), Te = N(we), Ee = F(Te, !0), De = F(I(Te, 2), !0);
					D(we);
					var Oe = I(we, 2), ke = N(Oe, !0), Ae = F(I(ke), !0);
					D(Oe);
					var je = I(Oe, 2);
					G(je);
					var Me = I(je, 2), Ne = N(Me, !0), Pe = F(I(Ne), !0);
					D(Me);
					var Fe = I(Me, 2);
					G(Fe), D(Ce), D(be), D(t), L((e, t, n, i, a, u, d, f, p, m, h, g, y, b, x, C, w, ne, re, E, ie) => {
						H(r, e), H(o, t), q(s, "title", n), Ni(c, R(ti)), H(l, ` ${i ?? ""}`), Ie = Ei(_, 1, "chip", null, Ie, { accent: R(ii) === "light" }), q(_, "title", a), H(v, u), q(S, "title", d), H(T, f), Le = Ei(ee, 1, "chip palauto", null, Le, { accent: R(Au) }), H(te, p), H(se, m), H(ue, `${h ?? ""} `), H(pe, `${g ?? ""} `), Oi(ge, `font-family:${R(k).theme.tokens.font.heading ?? ""}`), H(_e, y), Oi(ve, `font-family:${R(k).theme.tokens.font.body ?? ""}`), H(ye, b), H(Se, x), Oi(we, `--r-sm:${R(k).theme.tokens.radius.sm ?? ""};--r-md:${R(k).theme.tokens.radius.md ?? ""}`), H(Ee, C), H(De, w), H(ke, ne), H(Ae, R(k).theme.tokens.radius.sm), K(je, re), H(Ne, E), H(Pe, R(k).theme.tokens.radius.md), K(Fe, ie);
					}, [
						() => J("lbl.themePresets"),
						() => J("lbl.colors"),
						() => J("tip.theme.dualMode"),
						() => J("lbl.dualMode"),
						() => J("tip.theme.defaultScheme"),
						() => J("common.standard"),
						() => J("tip.theme.accentTextAuto"),
						() => J("palette.accentText"),
						() => J("opt.auto"),
						() => J("group.typography"),
						() => J("lbl.headings"),
						() => J("lbl.bodyText"),
						() => J("preview.heading"),
						() => J("preview.bodySample"),
						() => J("group.shape"),
						() => J("preview.button"),
						() => J("preview.card"),
						() => J("lbl.smallCorners"),
						() => Yu(R(k).theme.tokens.radius.sm),
						() => J("lbl.largeCorners"),
						() => Yu(R(k).theme.tokens.radius.md)
					]), z("change", c, (e) => Ku(e.target.checked)), z("click", _, () => Gu("light")), z("click", ee, () => Ru(!R(Au))), z("input", je, (e) => Xu("sm", Number(e.target.value))), z("input", Fe, (e) => Xu("md", Number(e.target.value)));
				}
				V(e, t);
			}, w = (e) => {
				var t = zx();
				let n;
				var r = N(t);
				G(r);
				var i = I(r, 2), a = (e) => {
					var t = Vr();
					ni(P(t), 17, () => Gl(kd(), R(Od), (e) => e.label), (e) => e.label, (e, t) => {
						var n = Vr(), r = P(n), i = (e) => {
							var n = Px(), r = N(n), i = I(r);
							D(n), L((e) => {
								q(n, "title", e), H(r, `${R(t).label ?? ""} `);
							}, [() => J("tip.webpAuto")]), z("change", i, Md), V(e, n);
						}, a = (e) => {
							var n = Fx(), r = N(n), i = I(r);
							D(n), L((e) => {
								q(n, "title", e), H(r, `${R(t).label ?? ""} `);
							}, [() => J("tip.blocks.galleryImages")]), z("change", i, Id), V(e, n);
						}, o = (e) => {
							var n = Qb(), r = F(n, !0);
							L(() => H(r, R(t).label)), z("click", n, () => Ad(R(t))), V(e, n);
						};
						U(r, (e) => {
							R(t).act === "image" ? e(i) : R(t).act === "galleryImages" ? e(a, 1) : e(o, -1);
						}), V(e, n);
					}, (e) => {
						var t = Ix(), n = F(t, !0);
						L((e) => H(n, e), [() => J("canvas.searchEmpty")]), V(e, t);
					}), V(e, t);
				}, o = /* @__PURE__ */ A(() => R(Od).trim()), s = (e) => {
					var t = Rx(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2), o = N(a), s = F(o, !0), c = I(o, 2), l = F(c, !0);
					D(a), D(n);
					var u = I(n, 2), d = F(u, !0), f = I(u, 2), p = N(f), m = I(p);
					D(f);
					var h = I(f, 2), g = F(h, !0), _ = I(h, 2), v = F(_, !0), y = I(_, 2), b = F(y, !0), x = I(y, 2), S = F(x, !0), C = I(x, 2), w = F(C, !0), T = I(C, 2), ee = F(T, !0), te = I(T, 2), ne = F(te, !0), re = I(te, 2), E = F(re, !0), ie = I(re, 2), ae = F(ie, !0), oe = I(ie, 2), se = F(oe, !0), ce = I(oe, 2), le = F(ce, !0), ue = I(ce, 2), de = F(ue, !0), fe = I(ue, 2), pe = F(fe, !0), me = I(fe, 2), he = F(me, !0), ge = I(me, 2), _e = F(ge, !0), ve = I(ge, 2), ye = F(ve, !0), be = I(ve, 2), xe = F(be, !0), Se = I(be, 2), Ce = N(Se), we = F(Ce, !0), Te = I(Ce, 2), Ee = N(Te), De = F(Ee, !0), Oe = I(Ee, 2), ke = N(Oe), Ae = I(ke);
					D(Oe), D(Te), D(Se);
					var je = I(Se, 2), Me = N(je), Ne = F(Me, !0), Pe = I(Me, 2), Fe = N(Pe), Ie = F(Fe, !0), Le = I(Fe, 2), Re = F(Le, !0), ze = I(Le, 2), Be = F(ze, !0), Ve = I(ze, 2), He = F(Ve, !0), O = I(Ve, 2), Ue = F(O, !0);
					D(Pe);
					var k = I(Pe, 2), Ge = N(k), Ke = F(Ge, !0);
					D(k), D(je);
					var qe = I(je, 2), Je = N(qe), Ye = F(Je, !0), Xe = I(Je, 2), Ze = N(Xe), Qe = F(Ze, !0), $e = I(Ze, 2), et = F($e, !0), tt = I($e, 2), nt = F(tt, !0), rt = I(tt, 2), it = F(rt, !0), at = I(rt, 2), ot = F(at, !0);
					D(Xe), D(qe);
					var st = I(qe, 2), ct = (e) => {
						let t = /* @__PURE__ */ A(() => R(Z).filter((e) => Zs[e]?.data?.mal?.kind === "blocks"));
						var n = Lx(), r = N(n), i = F(r, !0), a = I(r, 2);
						ni(a, 20, () => R(t), (e) => e, (e, t) => {
							var n = Qb(), r = F(n, !0);
							L((e) => {
								q(n, "title", e), H(r, Zs[t].data.mal.name);
							}, [() => J("canvas.insertGroup")]), z("click", n, () => We?.sendInsertTemplate(t)), V(e, n);
						}), D(a), D(n), L((e) => H(i, e), [() => J("canvas.tabMyTemplates")]), V(e, n);
					}, lt = /* @__PURE__ */ A(() => R(Z).some((e) => Zs[e]?.data?.mal?.kind === "blocks"));
					U(st, (e) => {
						R(lt) && e(ct);
					});
					var ut = I(st, 2), dt = (e) => {
						var t = Lx(), n = N(t), r = F(n, !0), i = I(n, 2);
						ni(i, 21, () => R(Ed), (e) => e.type, (e, t) => {
							var n = Vr(), r = P(n), i = (e) => {
								var n = Lx(), r = N(n), i = F(r, !0), a = I(r, 2);
								ni(a, 21, () => R(t).variants, (e) => e.label, (e, n) => {
									var r = Qb(), i = F(r, !0);
									L((e) => {
										q(r, "title", e), H(i, R(n).label);
									}, [() => J("tip.blocks.fromPlugin", { plugin: R(t).plugin })]), z("click", r, () => Dd(R(t), R(n).props)), V(e, r);
								}), D(a), D(n), L(() => H(i, R(t).label)), V(e, n);
							}, a = (e) => {
								var n = Qb(), r = F(n, !0);
								L((e) => {
									q(n, "title", e), H(r, R(t).label);
								}, [() => J("tip.blocks.fromPlugin", { plugin: R(t).plugin })]), z("click", n, () => Dd(R(t))), V(e, n);
							};
							U(r, (e) => {
								R(t).variants?.length ? e(i) : e(a, -1);
							}), V(e, n);
						}), D(i), D(t), L((e) => H(r, e), [() => J("panel.plugins")]), V(e, t);
					};
					U(ut, (e) => {
						R(Ed).length && e(dt);
					}), L((e, t, n, r, a, o, u, m, Se, Ce, Te, D, Ae, je, Me, Pe, We, k, qe, Je, Xe, Ze, $e, tt, rt, at, st, ct, lt, ut, dt, ft, pt, mt, ht, gt, _t, vt, yt, bt, xt, St, Ct, A, wt, Tt, Et, Dt, Ot, kt, At, jt, Mt, Nt, Pt, Ft, It, Lt, Rt, zt, Bt, Vt, Ht, Ut, Wt) => {
						H(i, e), H(s, t), q(c, "title", n), H(l, r), H(d, a), q(f, "title", o), H(p, `${u ?? ""} `), q(h, "title", m), H(g, Se), q(_, "title", Ce), H(v, Te), q(y, "title", D), H(b, Ae), q(x, "title", je), H(S, Me), q(C, "title", Pe), H(w, We), q(T, "title", k), H(ee, qe), q(te, "title", Je), H(ne, Xe), q(re, "title", Ze), H(E, $e), q(ie, "title", tt), H(ae, rt), q(oe, "title", at), H(se, st), q(ce, "title", ct), H(le, lt), q(ue, "title", ut), H(de, dt), q(fe, "title", ft), H(pe, pt), q(me, "title", mt), H(he, ht), q(ge, "title", gt), H(_e, _t), q(ve, "title", vt), H(ye, yt), q(be, "title", bt), H(xe, xt), H(we, St), q(Ee, "title", Ct), H(De, A), q(Oe, "title", wt), H(ke, `${Tt ?? ""} `), H(Ne, Et), q(Fe, "title", Dt), H(Ie, Ot), q(Le, "title", kt), H(Re, At), q(ze, "title", jt), H(Be, Mt), q(Ve, "title", Nt), H(He, Pt), q(O, "title", Ft), H(Ue, It), q(Ge, "title", Lt), H(Ke, Rt), H(Ye, zt), H(Qe, Bt), H(et, Vt), H(nt, Ht), H(it, Ut), H(ot, Wt);
					}, [
						() => J("blocks.text"),
						() => J("blocks.text"),
						() => J("tip.blocks.textBox"),
						() => J("ui.textBox"),
						() => J("blocks.button"),
						() => J("tip.webpAuto"),
						() => J("blocks.image"),
						() => J("tip.blocks.video"),
						() => J("blocks.video"),
						() => J("tip.blocks.icon"),
						() => J("blocks.icon"),
						() => J("tip.blocks.map"),
						() => J("blocks.map"),
						() => J("tip.blocks.form"),
						() => J("blocks.form"),
						() => J("tip.blocks.collection"),
						() => J("blocks.collection"),
						() => J("tip.blocks.faq"),
						() => J("blocks.faq"),
						() => J("tip.blocks.timeline"),
						() => J("blocks.timeline"),
						() => J("tip.blocks.quote"),
						() => J("blocks.quote"),
						() => J("tip.blocks.stats"),
						() => J("blocks.stats"),
						() => J("tip.blocks.ribbon"),
						() => J("blocks.ribbon"),
						() => J("tip.blocks.table"),
						() => J("blocks.table"),
						() => J("tip.blocks.share"),
						() => J("blocks.share"),
						() => J("tip.blocks.countdown"),
						() => J("blocks.countdown"),
						() => J("tip.blocks.audio"),
						() => J("blocks.audio"),
						() => J("tip.blocks.product"),
						() => J("blocks.product"),
						() => J("tip.blocks.cart"),
						() => J("blocks.cart"),
						() => J("tip.blocks.checkout"),
						() => J("blocks.checkout"),
						() => J("blocks.gallery"),
						() => J("tip.blocks.gallery"),
						() => J("ui.emptyGallery"),
						() => J("tip.blocks.galleryImages"),
						() => J("ui.galleryWithImages"),
						() => J("blocks.calendar"),
						() => J("tip.blocks.calendar"),
						() => J("calendar.viewList"),
						() => J("tip.blocks.calendar"),
						() => J("calendar.viewCards"),
						() => J("tip.blocks.calendar"),
						() => J("calendar.viewMonth"),
						() => J("tip.blocks.calendar"),
						() => J("calendar.viewNext"),
						() => J("tip.blocks.calendar"),
						() => J("calendar.viewAgenda"),
						() => J("tip.calendar.picker.open"),
						() => J("calendar.picker.open"),
						() => J("group.shapes"),
						() => J("shape.line"),
						() => J("shape.arrow"),
						() => J("shape.circle"),
						() => J("shape.rect"),
						() => J("shape.triangle")
					]), z("click", o, () => Cd("text")), z("click", c, () => Cd("text-box")), z("click", u, () => Cd("button")), z("change", m, Md), z("click", h, () => Cd("video")), z("click", _, () => Cd("icon")), z("click", y, () => Cd("map")), z("click", x, () => Cd("form")), z("click", C, () => Cd("collection")), z("click", T, () => Cd("faq")), z("click", te, () => Cd("timeline")), z("click", re, () => Cd("quote")), z("click", ie, () => Cd("stats")), z("click", oe, () => Cd("ribbon")), z("click", ce, () => Cd("table")), z("click", ue, () => Cd("share")), z("click", fe, () => Cd("countdown")), z("click", me, () => Cd("audio")), z("click", ge, () => Cd("product")), z("click", ve, () => Cd("cart")), z("click", be, () => Cd("checkout")), z("click", Ee, () => Cd("gallery")), z("change", Ae, Id), z("click", Fe, () => Cd("calendar")), z("click", Le, () => Cd("calendar-cards")), z("click", ze, () => Cd("calendar-month")), z("click", Ve, () => Cd("calendar-next")), z("click", O, () => Cd("calendar-agenda")), z("click", Ge, () => M(Zt, { mode: "add" }, !0)), z("click", Ze, () => Cd("shape-line")), z("click", $e, () => Cd("shape-arrow")), z("click", tt, () => Cd("shape-circle")), z("click", rt, () => Cd("shape-rect")), z("click", at, () => Cd("shape-triangle")), V(e, t);
				};
				U(i, (e) => {
					R(o) ? e(a) : e(s, -1);
				}), D(t), L((e, i, a) => {
					n = Ei(t, 1, "panel-body", null, n, { locked: R(xe) === "mobile" }), q(t, "title", e), q(r, "placeholder", i), q(r, "title", a);
				}, [
					() => R(xe) === "mobile" ? J("tip.blocks.mobileLocked") : void 0,
					() => J("canvas.searchBlocks"),
					() => J("canvas.searchBlocks")
				]), Li(r, () => R(Od), (e) => M(Od, e)), V(e, t);
			}, ee = (e) => {
				var t = Bx(), n = N(t), r = N(n), i = F(I(r));
				D(n);
				var a = I(n, 2);
				G(a);
				var o = I(a, 2), s = N(o);
				G(s);
				var c = I(s);
				D(o), D(t), L((e, t) => {
					H(r, `${e ?? ""} `), H(i, `${R(ce).size ?? ""} px`), K(a, R(ce).size), Ni(s, R(ce).snap !== !1), H(c, ` ${t ?? ""}`);
				}, [() => J("lbl.gridSize"), () => J("lbl.gridSnap")]), z("input", a, (e) => Di("size", Number(e.target.value))), z("change", s, (e) => Di("snap", e.target.checked)), V(e, t);
			}, te = (e) => {
				var t = Jx(), n = N(t), r = (e) => {
					var t = Vx(), n = P(t), r = F(n, !0), i = I(n, 2);
					zp(i, {
						get: () => ms.propsQuery,
						set: (e) => ms.propsQuery = e
					}), Lp(I(i, 2), {
						wide: !1,
						get query() {
							return ms.propsQuery;
						}
					}), L((e) => H(r, e), [() => J("blocks.suffix", { label: Ln[R(Gt).type] ?? R(Gt).type })]), V(e, t);
				}, i = (e) => {
					var t = qx(), n = P(t), r = F(n, !0), i = I(n, 2), o = N(i), s = I(o);
					G(s), D(i);
					var c = I(i, 4), l = N(c);
					G(l);
					var u = I(l);
					D(c);
					var d = I(c, 2), f = (e) => {
						var t = Hx(), n = P(t), r = N(n), i = F(I(r));
						D(n);
						var a = I(n, 2);
						G(a), L((e) => {
							H(r, `${e ?? ""} `), H(i, `${R(zn).size ?? ""} px`), K(a, R(zn).size);
						}, [() => J("lbl.gridSize")]), z("input", a, (e) => Ti("size", Number(e.target.value))), V(e, t);
					};
					U(d, (e) => {
						R(zn) && e(f);
					});
					var p = I(d, 4), m = F(p, !0), g = I(p, 2);
					ni(g, 21, () => [["", "common.standard"], ...Object.entries(Ug)], ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ A(() => h(R(t), 2));
						let r = () => R(n)[0], i = () => R(n)[1], a = /* @__PURE__ */ A(() => Zn(r()));
						var o = Ux();
						let s;
						var c = N(o), l = N(c), u = I(l, 2), d = I(u, 2);
						D(c);
						var f = F(I(c, 2), !0);
						D(o), L((e, t) => {
							s = Ei(o, 1, "rs-card", null, s, { on: R(Wn) === r() }), q(o, "title", e), Oi(c, `background: ${R(a).bg ?? ""}`), Oi(l, `background: ${R(a).text ?? ""}`), Oi(u, `background: ${R(a).surface ?? ""}`), Oi(d, `background: ${R(a).accent ?? ""}`), H(f, t);
						}, [() => J("tip.props.sectionTheme"), () => J(i())]), z("click", o, () => Xn(r())), V(e, o);
					}), D(g);
					var _ = I(g, 2), v = N(_), y = I(v), b = N(y), x = F(b), S = I(b, 2);
					W(S, () => X.copy, !0), D(S), D(y), D(_);
					var C = I(_, 4), w = F(C, !0), T = I(C, 2);
					a(T, () => R(Kr), () => R(Vn));
					var ee = I(T, 4), te = F(ee, !0), ne = I(ee, 2);
					ni(ne, 16, () => [["top", "lbl.dividerTop"], ["bottom", "lbl.dividerBottom"]], ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ A(() => h(t, 2));
						let r = () => R(n)[0], i = () => R(n)[1], a = /* @__PURE__ */ A(() => R(Gn)[r()]);
						var o = hy(), s = P(o), c = N(s), l = I(c);
						{
							let e = /* @__PURE__ */ A(() => R(a)?.shape ?? ""), t = /* @__PURE__ */ A(() => [["", J("common.none")], ...b_.map((e) => [e, J(`opt.divider.${e}`)])]);
							Y(l, {
								get value() {
									return R(e);
								},
								get options() {
									return R(t);
								},
								onchange: (e) => _i(r(), "shape", e)
							});
						}
						D(s);
						var u = I(s, 2), d = (e) => {
							var t = Wx(), n = P(t), i = N(n), o = F(i, !0), s = I(i, 2);
							G(s);
							var c = F(I(s, 2));
							D(n);
							var l = I(n, 2), u = N(l), d = I(u);
							{
								let e = /* @__PURE__ */ A(() => R(a).color ?? "bg"), t = /* @__PURE__ */ A($r), n = /* @__PURE__ */ A(() => J("tip.divider.color"));
								Pa(d, {
									get value() {
										return R(e);
									},
									get tokens() {
										return R(t);
									},
									get label() {
										return R(n);
									},
									onchange: (e) => _i(r(), "color", e)
								});
							}
							D(l);
							var f = I(l, 2), p = N(f);
							G(p);
							var m = I(p);
							D(f);
							var h = I(f, 2), g = N(h);
							G(g);
							var _ = I(g);
							D(h), L((e, t, n, r, i, d, v) => {
								H(o, e), q(s, "min", x_.min), q(s, "max", x_.max), K(s, R(a).height ?? x_.dflt), H(c, `${R(a).height ?? x_.dflt ?? ""} px`), q(l, "title", t), H(u, `${n ?? ""} `), q(f, "title", r), Ni(p, R(a).flip === !0), H(m, ` ${i ?? ""}`), q(h, "title", d), Ni(g, R(a).invert === !0), H(_, ` ${v ?? ""}`);
							}, [
								() => J("lbl.height"),
								() => J("tip.divider.color"),
								() => J("lbl.color"),
								() => J("tip.divider.flip"),
								() => J("lbl.dividerFlip"),
								() => J("tip.divider.invert"),
								() => J("lbl.patternInvert")
							]), z("input", s, (e) => _i(r(), "height", e.target.valueAsNumber)), z("change", p, (e) => _i(r(), "flip", e.target.checked)), z("change", g, (e) => _i(r(), "invert", e.target.checked)), V(e, t);
						};
						U(u, (e) => {
							R(a)?.shape && e(d);
						}), L((e, t) => {
							q(s, "title", e), H(c, `${t ?? ""} `);
						}, [() => J("tip.props.dividers"), () => J(i())]), V(e, o);
					});
					var re = I(ne, 4), E = N(re), ie = I(E);
					{
						let e = /* @__PURE__ */ A(() => ci(R(Hn)) ? R(Hn).type : "");
						Y(ie, {
							get value() {
								return R(e);
							},
							get options() {
								return li;
							},
							onchange: (e) => gi(e || null)
						});
					}
					D(re);
					var ae = I(re, 2), oe = (e) => {
						var t = Kx(), n = P(t), r = N(n), i = I(r);
						G(i), D(n);
						var a = I(n, 2), o = N(a), s = I(o);
						G(s), D(a);
						var c = I(a, 2), l = (e) => {
							var t = Gx(), n = P(t), r = N(n), i = I(r);
							{
								let e = /* @__PURE__ */ A(() => R(Hn).props.effect ?? "slide-up"), t = /* @__PURE__ */ A(() => [
									["fade-in", J("anim.fadeIn")],
									["slide-up", J("anim.slideUp")],
									["zoom-in", J("anim.zoomIn")]
								]);
								Y(i, {
									get value() {
										return R(e);
									},
									get options() {
										return R(t);
									},
									onchange: (e) => xi("effect", e)
								});
							}
							D(n);
							var a = I(n, 2), o = N(a), s = I(o);
							G(s), D(a);
							var c = I(a, 2), l = N(c), u = I(l);
							{
								let e = /* @__PURE__ */ A(() => R(Hn).props.pattern ?? "sequence"), t = /* @__PURE__ */ A(() => [
									["sequence", J("opt.stagger.sequence")],
									["columns", J("opt.stagger.columns")],
									["rows", J("opt.stagger.rows")],
									["center", J("opt.stagger.center")]
								]);
								Y(u, {
									get value() {
										return R(e);
									},
									get options() {
										return R(t);
									},
									onchange: (e) => xi("pattern", e)
								});
							}
							D(c), L((e, t, i, u, d, f) => {
								q(n, "title", e), H(r, `${t ?? ""} `), q(a, "title", i), H(o, `${u ?? ""} `), K(s, R(Hn).props.step ?? 90), q(c, "title", d), H(l, `${f ?? ""} `);
							}, [
								() => J("tip.props.staggerEffect"),
								() => J("lbl.staggerEffect"),
								() => J("tip.props.staggerStep"),
								() => J("lbl.stepMs"),
								() => J("tip.props.staggerPattern"),
								() => J("lbl.pattern")
							]), z("change", s, (e) => bi("step", Number(e.target.value))), V(e, t);
						};
						U(c, (e) => {
							R(Hn).type === "stagger" && e(l);
						}), L((e, t) => {
							H(r, `${e ?? ""} `), K(i, R(Hn).props.duration), H(o, `${t ?? ""} `), K(s, R(Hn).props.delay ?? 0);
						}, [() => J("lbl.durationMs"), () => J("lbl.delayMs")]), z("change", i, (e) => bi("duration", Number(e.target.value))), z("change", s, (e) => bi("delay", Number(e.target.value))), V(e, t);
					}, se = /* @__PURE__ */ A(() => ci(R(Hn)));
					U(ae, (e) => {
						R(se) && e(oe);
					});
					var ce = I(ae, 2), le = N(ce), ue = I(le);
					{
						let e = /* @__PURE__ */ A(() => R(Un)?.type ?? (R(Hn) && !ci(R(Hn)) ? R(Hn).type : ""));
						Y(ue, {
							get value() {
								return R(e);
							},
							get options() {
								return di;
							},
							onchange: (e) => yi(e || null)
						});
					}
					D(ce), L((e, t, n, a, c, d, f, h, g, y, b, C, T, ne, ie, ae, oe) => {
						H(r, e), q(i, "title", t), H(o, `${n ?? ""} `), K(s, R(Bn)), q(s, "placeholder", a), Ni(l, R(zn) !== null), H(u, ` ${c ?? ""}`), q(p, "title", d), H(m, f), q(_, "title", h), H(v, `${g ?? ""} `), H(x, `#${R(Rn) ?? ""}`), q(S, "title", y), H(w, b), q(ee, "title", C), H(te, T), q(re, "title", ne), H(E, `${ie ?? ""} `), q(ce, "title", ae), H(le, `${oe ?? ""} `);
					}, [
						() => J("lbl.section"),
						() => J("hint.props.minHeight"),
						() => J("lbl.minHeight"),
						() => J("ph.minHeight"),
						() => J("lbl.sectionGrid"),
						() => J("tip.props.sectionTheme"),
						() => J("lbl.sectionTheme"),
						() => J("tip.props.anchor"),
						() => J("lbl.anchor"),
						() => J("tip.props.copyAnchor"),
						() => J("lbl.background"),
						() => J("tip.props.dividers"),
						() => J("lbl.sectionDividers"),
						() => J("tip.props.sectionAnim"),
						() => J("lbl.animIn"),
						() => J("tip.props.sectionHover"),
						() => J("lbl.onHover")
					]), z("change", s, (e) => Si(e.target.value)), z("change", l, (e) => wi(e.target.checked)), z("click", S, () => navigator.clipboard?.writeText(`#${R(Rn)}`)), V(e, t);
				}, o = (e) => {
					var t = Ix(), n = F(t, !0);
					L((e) => H(n, e), [() => J("hint.props.empty")]), V(e, t);
				};
				U(n, (e) => {
					R(Gt) ? e(r) : R(Rn) ? e(i, 1) : e(o, -1);
				}), D(t), V(e, t);
			}, ne = (e) => {
				var t = iS(), n = N(t), r = N(n);
				G(r);
				var i = I(r);
				D(n);
				var s = I(n, 2), c = (e) => {
					var t = Lx(), n = N(t), r = F(n, !0), i = I(n, 2);
					ni(i, 21, () => R(k).pages ?? [], (e) => e.id, (e, t) => {
						var n = Vb(), r = N(n);
						G(r);
						var i = I(r);
						D(n), L((e, a) => {
							q(n, "title", e), Ni(r, a), H(i, ` ${(R(t).title || R(t).id) ?? ""}`);
						}, [() => J("tip.footer.hideOnPage"), () => !(R(k).footer?.hideOn ?? []).includes(R(t).id)]), z("change", r, (e) => zl(R(t).id, e.target.checked)), V(e, n);
					}), D(i), D(t), L((e) => H(r, e), [() => J("group.showOnPages")]), V(e, t);
				};
				U(s, (e) => {
					R(k).footer?.show && e(c);
				});
				var l = I(s, 2), u = N(l), d = F(u, !0), f = I(u, 2), p = N(f);
				ni(p, 21, () => xl, (e) => e.id, (e, t) => {
					var n = Yx(), r = N(n);
					W(r, () => $v(R(t).thumb), !0), D(r);
					var i = F(I(r, 2), !0);
					D(n), L((e) => {
						q(n, "title", e), H(i, R(t).label);
					}, [() => J("tip.footer.template", { label: R(t).label })]), z("click", n, () => Cl(R(t).id)), V(e, n);
				}), D(p), D(f), D(l);
				var m = I(l, 2), h = N(m), g = F(h, !0), _ = I(h, 2), v = N(_), y = N(v), b = I(y);
				G(b), D(v);
				var x = I(v, 2), S = N(x), C = I(S);
				G(C), D(x);
				var w = I(x, 2), T = N(w), ee = I(T);
				{
					let e = /* @__PURE__ */ A(() => R(k).footer?.brand?.mode ?? "text"), t = /* @__PURE__ */ A(() => [
						["text", J("blocks.text")],
						["image", J("opt.brand.image")],
						["both", J("opt.brand.both")]
					]);
					Y(ee, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => gl(e)
					});
				}
				D(w);
				var te = I(w, 2), ne = (e) => {
					var t = Zx(), n = P(t), r = N(n), i = N(r), a = I(i);
					D(r);
					var o = I(r, 2), s = (e) => {
						var t = vy();
						W(t, () => X.cross, !0), D(t), L((e) => q(t, "title", e), [() => J("tip.footer.removeLogo")]), z("click", t, vl), V(e, t);
					};
					U(o, (e) => {
						R(k).footer?.brand?.logo && e(s);
					}), D(n);
					var c = I(n, 2), l = (e) => {
						var t = Xx(), n = P(t), r = N(n), i = F(I(r));
						D(n);
						var a = I(n, 2);
						G(a), L((e) => {
							H(r, `${e ?? ""} `), H(i, `${R(k).footer?.brand?.logoHeight ?? 40 ?? ""} px`), K(a, R(k).footer?.brand?.logoHeight ?? 40);
						}, [() => J("lbl.logoHeight")]), z("input", a, (e) => yl(e.target.value)), V(e, t);
					};
					U(c, (e) => {
						R(k).footer?.brand?.logo && e(l);
					}), L((e, t) => {
						q(r, "title", e), H(i, `${t ?? ""} `);
					}, [() => J("tip.webpAutoPublish"), () => R(k).footer?.brand?.logo ? J("ui.changeLogo") : J("ui.uploadLogo")]), z("change", a, _l), V(e, t);
				};
				U(te, (e) => {
					(R(k).footer?.brand?.mode ?? "text") !== "text" && e(ne);
				}), D(_), D(m);
				var re = I(m, 2), E = N(re), ie = F(E, !0), ae = I(E, 2), oe = N(ae);
				ni(oe, 17, () => R(k).footer?.columns ?? [], Qr, (e, t, n) => {
					var r = Qx(), i = P(r), a = N(i);
					G(a);
					var o = I(a, 2), s = N(o);
					W(s, () => X.plus, !0), D(s);
					var c = I(s, 2);
					c.disabled = n === 0, W(c, () => X.up, !0), D(c);
					var l = I(c, 2);
					W(l, () => X.down, !0), D(l);
					var u = I(l, 2);
					W(u, () => X.cross, !0), D(u), D(o), D(i), ni(I(i, 2), 17, () => R(t).links ?? [], Qr, (e, r, i) => {
						var a = Gy(), o = N(a);
						G(o);
						var s = I(o, 2), c = N(s);
						c.disabled = i === 0, W(c, () => X.up, !0), D(c);
						var l = I(c, 2);
						W(l, () => X.down, !0), D(l);
						var u = I(l, 2);
						W(u, () => X.cross, !0), D(u), D(s);
						var d = I(s, 2), f = N(d);
						{
							let e = /* @__PURE__ */ A(() => R(r).page ?? "__href"), t = /* @__PURE__ */ A(() => J("tip.linkTarget")), a = /* @__PURE__ */ A(() => [...R(k).pages.map((e) => [e.id, e.title]), ["__href", J("opt.linkHref")]]);
							Y(f, {
								get value() {
									return R(e);
								},
								get title() {
									return R(t);
								},
								get options() {
									return R(a);
								},
								onchange: (e) => Xl(n, i, e)
							});
						}
						D(d);
						var p = I(d, 2), m = (e) => {
							var t = Wy();
							G(t), L((e, n) => {
								K(t, R(r).href ?? ""), q(t, "placeholder", e), q(t, "title", n);
							}, [() => J("ph.hrefAnchor"), () => J("tip.hrefAnchor")]), z("change", t, (e) => Zl(n, i, e.target.value)), V(e, t);
						};
						U(p, (e) => {
							R(r).page || e(m);
						}), D(a), L((e, n) => {
							K(o, R(r).label), q(o, "title", e), l.disabled = i === R(t).links.length - 1, q(u, "title", n);
						}, [() => J("tip.linkLabel"), () => J("tip.removeLink")]), z("input", o, (e) => Yl(n, i, e.target.value)), z("click", c, () => Jl(n, i, -1)), z("click", l, () => Jl(n, i, 1)), z("click", u, () => ql(n, i)), V(e, a);
					}), L((e, r, i) => {
						K(a, R(t).title), q(a, "title", e), q(s, "title", r), l.disabled = n === R(k).footer.columns.length - 1, q(u, "title", i);
					}, [
						() => J("tip.footer.columnTitle"),
						() => J("tip.footer.addLink"),
						() => J("tip.footer.removeColumn")
					]), z("input", a, (e) => Wl(n, e.target.value)), z("click", s, () => Kl(n)), z("click", c, () => Ul(n, -1)), z("click", l, () => Ul(n, 1)), z("click", u, () => Hl(n)), V(e, r);
				});
				var se = I(oe, 2), ce = F(se, !0), le = I(se, 2), ue = N(le), de = I(ue);
				{
					let e = /* @__PURE__ */ A(() => R(k).footer?.columnsAlign ?? "left"), t = /* @__PURE__ */ A(() => [["left", J("common.left")], ["center", J("common.center")]]);
					Y(de, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => Nl(e)
					});
				}
				D(le), D(ae), D(re);
				var fe = I(re, 2), pe = N(fe), me = F(pe, !0), he = I(pe, 2), ge = N(he);
				ni(ge, 17, () => R(k).footer?.social ?? [], Qr, (e, t, n) => {
					var r = $x(), i = N(r), a = N(i);
					W(a, () => yo(R(t).icon) || "", !0), D(a);
					var o = I(a, 2);
					{
						let e = /* @__PURE__ */ A(() => J("blocks.icon"));
						Y(o, {
							get value() {
								return R(t).icon;
							},
							get title() {
								return R(e);
							},
							get options() {
								return ru;
							},
							onchange: (e) => tu(n, e)
						});
					}
					D(i);
					var s = I(i, 2), c = N(s);
					c.disabled = n === 0, W(c, () => X.up, !0), D(c);
					var l = I(c, 2);
					W(l, () => X.down, !0), D(l);
					var u = I(l, 2);
					W(u, () => X.cross, !0), D(u), D(s);
					var d = I(s, 2);
					G(d), D(r), L((e, r) => {
						l.disabled = n === R(k).footer.social.length - 1, q(u, "title", e), K(d, R(t).url), q(d, "placeholder", r);
					}, [() => J("tip.removeLink"), () => J("ph.hrefMailto")]), z("click", c, () => eu(n, -1)), z("click", l, () => eu(n, 1)), z("click", u, () => $l(n)), z("change", d, (e) => nu(n, e.target.value)), V(e, r);
				});
				var _e = I(ge, 2), ve = F(_e, !0);
				D(he), D(fe);
				var ye = I(fe, 2), be = N(ye), xe = F(be, !0), Se = I(be, 2), Ce = N(Se), we = N(Ce);
				G(we);
				var Te = I(we);
				D(Ce);
				var Ee = I(Ce, 2), De = (e) => {
					let t = /* @__PURE__ */ A(() => R(k).footer.cta);
					var n = nS(), r = P(n), i = N(r), a = I(i);
					{
						let e = /* @__PURE__ */ A(() => R(t).kind ?? "button"), n = /* @__PURE__ */ A(() => [["button", J("opt.cta.button")], ["newsletter", J("opt.cta.newsletter")]]);
						Y(a, {
							get value() {
								return R(e);
							},
							get options() {
								return R(n);
							},
							onchange: (e) => Fl("kind", e)
						});
					}
					D(r);
					var o = I(r, 2), s = N(o);
					G(s);
					var c = I(s);
					D(o);
					var l = I(o, 2), u = N(l), d = I(u);
					G(d), D(l);
					var f = I(l, 2), p = N(f), m = I(p);
					G(m), D(f);
					var h = I(f, 2), g = N(h), _ = I(g);
					G(_), D(h);
					var v = I(h, 2), y = (e) => {
						var n = hy(), r = P(n), i = N(r), a = I(i);
						{
							let e = /* @__PURE__ */ A(() => R(t).page ?? "__href"), n = /* @__PURE__ */ A(() => [...R(k).pages.map((e) => [e.id, e.title]), ["__href", J("opt.linkHrefMailto")]]);
							Y(a, {
								get value() {
									return R(e);
								},
								get options() {
									return R(n);
								},
								onchange: (e) => Rl(e)
							});
						}
						D(r);
						var o = I(r, 2), s = (e) => {
							var n = eS();
							G(n), L((e, r) => {
								K(n, R(t).href ?? ""), q(n, "placeholder", e), q(n, "title", r);
							}, [() => J("ph.hrefMailtoAnchor"), () => J("tip.hrefAnchor")]), z("change", n, (e) => Fl("href", e.target.value)), V(e, n);
						};
						U(o, (e) => {
							R(t).page || e(s);
						}), L((e, t) => {
							q(r, "title", e), H(i, `${t ?? ""} `);
						}, [() => J("tip.footer.ctaTarget"), () => J("lbl.buttonTarget")]), V(e, n);
					}, b = (e) => {
						var n = tS(), r = P(n), i = N(r), a = I(i);
						G(a), D(r);
						var o = I(r, 2), s = N(o), c = I(s);
						G(c), D(o);
						var l = I(o, 2), u = N(l), d = I(u);
						G(d), D(l), L((e, n, f, p, m, h, g, _, v) => {
							q(r, "title", e), H(i, `${n ?? ""} `), K(a, R(t).endpoint ?? ""), q(a, "placeholder", f), q(o, "title", p), H(s, `${m ?? ""} `), K(c, R(t).recipient ?? ""), q(c, "placeholder", h), q(l, "title", g), H(u, `${_ ?? ""} `), K(d, R(t).success ?? ""), q(d, "placeholder", v);
						}, [
							() => J("tip.footer.ctaEndpoint"),
							() => J("lbl.newsletterEndpoint"),
							() => J("ph.endpoint"),
							() => J("tip.footer.ctaRecipient"),
							() => J("lbl.recipientFallback"),
							() => J("ph.email"),
							() => J("tip.footer.ctaSuccess"),
							() => J("lbl.confirmation"),
							() => J("ph.footer.ctaSuccess")
						]), z("change", a, (e) => Fl("endpoint", e.target.value)), z("change", c, (e) => Fl("recipient", e.target.value)), z("input", d, (e) => Fl("success", e.target.value)), V(e, n);
					};
					U(v, (e) => {
						(R(t).kind ?? "button") === "button" ? e(y) : e(b, -1);
					}), L((e, n, a, v, y, b, x, S, C, w, T, ee) => {
						q(r, "title", e), H(i, `${n ?? ""} `), q(o, "title", a), Ni(s, R(t).big === !0), H(c, ` ${v ?? ""}`), q(l, "title", y), H(u, `${b ?? ""} `), K(d, R(t).heading ?? ""), q(d, "placeholder", x), q(f, "title", S), H(p, `${C ?? ""} `), K(m, R(t).sub ?? ""), q(h, "title", w), H(g, `${T ?? ""} `), K(_, R(t).label ?? ""), q(_, "placeholder", ee);
					}, [
						() => J("tip.footer.ctaKind"),
						() => J("common.type"),
						() => J("tip.footer.ctaBig"),
						() => J("lbl.bigCentered"),
						() => J("tip.footer.ctaHeading"),
						() => J("lbl.heading"),
						() => J("ph.footer.ctaHeading"),
						() => J("tip.footer.ctaSub"),
						() => J("lbl.subText"),
						() => J("tip.footer.ctaLabel"),
						() => J("lbl.buttonText"),
						() => J("ph.footer.ctaLabel")
					]), z("change", s, (e) => Fl("big", e.target.checked)), z("input", d, (e) => Fl("heading", e.target.value)), z("input", m, (e) => Fl("sub", e.target.value)), z("input", _, (e) => Fl("label", e.target.value)), V(e, n);
				};
				U(Ee, (e) => {
					R(k).footer?.cta && e(De);
				}), D(Se), D(ye);
				var ke = I(ye, 2), Ae = N(ke), je = F(Ae, !0), Me = I(Ae, 2), Ne = N(Me);
				o(Ne, () => "linkRow", () => R(k).footer?.linkRow ?? []);
				var Pe = I(Ne, 2), Fe = F(Pe, !0);
				D(Me), D(ke);
				var Ie = I(ke, 2), Le = N(Ie), Re = F(Le, !0), ze = I(Le, 2), Be = N(ze), Ve = (e) => {
					var t = rS(), n = P(t), r = N(n), i = I(r);
					{
						let e = /* @__PURE__ */ A(() => R(k).footer?.align ?? "left"), t = /* @__PURE__ */ A(() => [
							["left", J("common.left")],
							["center", J("common.center")],
							["right", J("common.right")]
						]);
						Y(i, {
							get value() {
								return R(e);
							},
							get options() {
								return R(t);
							},
							onchange: (e) => ml("footer", (t) => {
								t.align = e;
							})
						});
					}
					D(n), Oe(2), L((e, t) => {
						q(n, "title", e), H(r, `${t ?? ""} `);
					}, [() => J("tip.footer.align"), () => J("lbl.align")]), V(e, t);
				};
				U(Be, (e) => {
					R(k).footer?.cta?.big !== !0 && e(Ve);
				});
				var He = I(Be, 2), O = F(He, !0), Ue = I(He, 2);
				a(Ue, () => Jr, () => R(k).footer?.background?.layers ?? []), D(ze), D(Ie);
				var We = I(Ie, 2), Ge = N(We), Ke = F(Ge, !0), qe = I(Ge, 2), Je = N(qe), Ye = N(Je), Xe = I(Ye);
				G(Xe), D(Je);
				var Ze = I(Je, 2), Qe = F(Ze, !0), $e = I(Ze, 2);
				o($e, () => "baseline", () => R(k).footer?.baseline ?? []);
				var et = I($e, 2), tt = F(et, !0);
				D(qe), D(We), D(t), L((e, t, a, o, s, c, l, u, f, p, m, h, _, ee, te, ne, re, E, ae, oe, se, de, fe, pe, he, ge, _e, ye, be, Se, Ee, De) => {
					q(n, "title", e), Ni(r, t), H(i, ` ${a ?? ""}`), H(d, o), H(g, s), q(v, "title", c), H(y, `${l ?? ""} `), K(b, R(k).footer?.brand?.title ?? ""), q(b, "placeholder", u), q(x, "title", f), H(S, `${p ?? ""} `), K(C, R(k).footer?.brand?.tagline ?? ""), q(w, "title", m), H(T, `${h ?? ""} `), H(ie, _), H(ce, ee), q(le, "title", te), H(ue, `${ne ?? ""} `), H(me, re), H(ve, E), H(xe, ae), q(Ce, "title", oe), Ni(we, se), H(Te, ` ${de ?? ""}`), H(je, fe), H(Fe, pe), H(Re, he), H(O, ge), H(Ke, _e), q(Je, "title", ye), H(Ye, `${be ?? ""} `), K(Xe, R(k).footer?.copyright ?? ""), q(Xe, "placeholder", Se), H(Qe, Ee), H(tt, De);
				}, [
					() => J("tip.footer.show"),
					() => !!R(k).footer?.show,
					() => J("lbl.showFooter"),
					() => J("group.startpoint"),
					() => J("group.brand"),
					() => J("tip.footer.brandTitle"),
					() => J("lbl.title"),
					() => J("ph.footer.brandTitle"),
					() => J("tip.footer.tagline"),
					() => J("lbl.tagline"),
					() => J("tip.footer.brandMode"),
					() => J("lbl.brandMode"),
					() => J("group.columns"),
					() => J("ui.addColumn"),
					() => J("tip.footer.columnsAlign"),
					() => J("lbl.splitColumnAlign"),
					() => J("group.social"),
					() => J("ui.addSocial"),
					() => J("group.cta"),
					() => J("tip.footer.cta"),
					() => !!R(k).footer?.cta,
					() => J("lbl.showCta"),
					() => J("group.linkRow"),
					() => J("ui.addRowLink"),
					() => J("group.appearance"),
					() => J("lbl.background"),
					() => J("group.baseline"),
					() => J("tip.footer.copyright"),
					() => J("lbl.copyright"),
					() => J("ph.footer.copyright"),
					() => J("lbl.baselineLinks"),
					() => J("ui.addBaselineLink")
				]), z("change", r, (e) => ml("footer", (t) => {
					t.show = e.target.checked;
				})), z("input", b, (e) => hl("title", e.target.value)), z("input", C, (e) => hl("tagline", e.target.value)), z("click", se, Vl), z("click", _e, Ql), z("change", we, (e) => Pl(e.target.checked)), z("click", Pe, () => wl("linkRow")), z("input", Xe, (e) => bl(e.target.value)), z("click", et, () => wl("baseline")), V(e, t);
			}, re = (e) => {
				var t = pS(), n = N(t), r = (e) => {
					var t = Py(), n = N(t), r = I(n);
					{
						let e = /* @__PURE__ */ A(() => R(Ks) ?? ""), t = /* @__PURE__ */ A(() => [["", J("common.choose")], ...R(Ws).map((e) => [e, R(Gs)[e]?.name ?? e])]);
						Y(r, {
							get value() {
								return R(e);
							},
							get options() {
								return R(t);
							},
							onchange: (e) => M(Ks, e || null, !0)
						});
					}
					D(t), L((e) => H(n, `${e ?? ""} `), [() => J("blocks.collection")]), V(e, t);
				};
				U(n, (e) => {
					R(Ws).length && e(r);
				});
				var i = I(n, 2), a = (e) => {
					let t = /* @__PURE__ */ A(() => R(Gs)[R(Ks)]);
					var n = fS(), r = P(n), i = N(r), a = F(i, !0), o = I(i, 2), s = F(o, !0), c = I(o, 2), l = N(c), u = I(l);
					D(c);
					var d = I(c, 2);
					W(d, () => X.cross, !0), D(d), D(r);
					var f = I(r, 2);
					ni(f, 19, () => R(t).entries, (e) => e.id, (e, n, r) => {
						var i = dS(), a = N(i), o = F(a), s = I(a, 2), c = N(s), l = N(c);
						G(l);
						var u = I(l, 2), d = N(u);
						W(d, () => X.up, !0), D(d);
						var f = I(d, 2);
						W(f, () => X.down, !0), D(f);
						var p = I(f, 2);
						W(p, () => X.cross, !0), D(p), D(u), D(c);
						var m = I(c, 2), h = (e) => {
							var t = aS(), r = N(t), i = I(r);
							G(i), D(t), L((e) => {
								H(r, `${e ?? ""} `), K(i, R(n).date ?? "");
							}, [() => J("lbl.date")]), z("change", i, (e) => Sc(R(Ks), R(n).id, "date", e.target.value)), V(e, t);
						};
						U(m, (e) => {
							R(t).kind !== "products" && e(h);
						});
						var g = I(m, 2);
						ft(g);
						var _ = I(g, 2), v = (e) => {
							var t = oS(), r = N(t), i = I(r);
							G(i), D(t), L((e, t) => {
								H(r, `${e ?? ""} `), K(i, R(n).href ?? ""), q(i, "placeholder", t);
							}, [() => J("lbl.link"), () => J("ph.collections.href")]), z("change", i, (e) => Sc(R(Ks), R(n).id, "href", e.target.value)), V(e, t);
						};
						U(_, (e) => {
							R(t).kind !== "products" && e(v);
						});
						var y = I(_, 2), b = N(y), x = N(b), S = I(x);
						D(b);
						var C = I(b, 2), w = (e) => {
							var t = sS(), r = P(t), i = I(r, 2);
							W(i, () => X.cross, !0), D(i), L((e) => {
								q(r, "src", R(n).image), q(i, "title", e);
							}, [() => J("tip.removeImage")]), z("click", i, () => Sc(R(Ks), R(n).id, "image", "")), V(e, t);
						};
						U(C, (e) => {
							R(n).image && e(w);
						}), D(y);
						var T = I(y, 2), ee = (e) => {
							var t = uS(), r = P(t), i = N(r), a = I(i);
							G(a), D(r);
							var o = I(r, 2), s = N(o), c = I(s);
							G(c), D(o);
							var l = I(o, 2), u = N(l), d = I(u);
							G(d), D(l);
							var f = I(l, 2), p = N(f), m = I(p);
							G(m), D(f);
							var h = I(f, 2);
							ni(h, 17, () => R(n).colors ?? [], Qr, (e, t, r) => {
								var i = lS(), a = N(i);
								G(a);
								var o = I(a, 2), s = N(o), c = I(s);
								D(o);
								var l = I(o, 2), u = (e) => {
									var n = cS();
									L(() => q(n, "src", R(t).image)), V(e, n);
								};
								U(l, (e) => {
									R(t).image && e(u);
								});
								var d = I(l, 2);
								W(d, () => X.cross, !0), D(d), D(i), L((e, n) => {
									K(a, R(t).name), q(a, "placeholder", e), H(s, `${n ?? ""} `);
								}, [() => J("ph.colorName"), () => R(t).image ? J("ui.changeImage") : J("ui.addImage")]), z("change", a, (e) => Mc(R(Ks), R(n).id, r, "name", e.target.value)), z("change", c, (e) => Nc(R(Ks), R(n).id, r, e)), z("click", d, () => Pc(R(Ks), R(n).id, r)), V(e, i);
							});
							var g = I(h, 2), _ = F(g, !0);
							L((e, t, r, h, v, y, b, x, S, C, w) => {
								H(i, `${e ?? ""} `), K(a, R(n).price ?? ""), q(o, "title", t), H(s, `${r ?? ""} `), K(c, R(n).memberPrice ?? ""), q(l, "title", h), H(u, `${v ?? ""} `), K(d, R(n).badge ?? ""), q(f, "title", y), H(p, `${b ?? ""} `), K(m, x), q(m, "placeholder", S), q(g, "title", C), H(_, w);
							}, [
								() => J("lbl.price"),
								() => J("tip.entry.memberPrice"),
								() => J("lbl.memberPrice"),
								() => J("tip.entry.badge"),
								() => J("lbl.productBadge"),
								() => J("tip.entry.sizes"),
								() => J("lbl.sizes"),
								() => (R(n).sizes ?? []).join(", "),
								() => J("ph.sizes"),
								() => J("tip.entry.colors"),
								() => J("ui.addColor")
							]), z("change", a, (e) => Sc(R(Ks), R(n).id, "price", e.target.value === "" ? "" : Number(e.target.value))), z("change", c, (e) => Sc(R(Ks), R(n).id, "memberPrice", e.target.value === "" ? "" : Number(e.target.value))), z("change", d, (e) => Sc(R(Ks), R(n).id, "badge", e.target.value)), z("change", m, (e) => Ec(R(Ks), R(n).id, e.target.value)), z("click", g, () => jc(R(Ks), R(n).id)), V(e, t);
						};
						U(T, (e) => {
							R(t).kind === "products" && e(ee);
						}), D(s), D(i), L((e, i, a, s, c) => {
							H(o, `${e ?? ""}${R(t).kind === "products" ? R(n).price == null ? "" : ` · ${R(n).price}` : R(n).date ? ` · ${R(n).date}` : ""}`), K(l, R(n).title), q(l, "title", i), d.disabled = R(r) === 0, f.disabled = R(r) === R(t).entries.length - 1, q(p, "title", a), q(g, "placeholder", s), K(g, R(n).text ?? ""), H(x, `${c ?? ""} `);
						}, [
							() => fc(R(n).title),
							() => J("lbl.title"),
							() => J("tip.collections.deleteEntry"),
							() => J("ph.collections.text"),
							() => R(n).image ? J("ui.changeImage") : J("ui.addImage")
						]), z("change", l, (e) => Sc(R(Ks), R(n).id, "title", e.target.value || J("ui.untitled"))), z("click", d, () => Cc(R(Ks), R(r), -1)), z("click", f, () => Cc(R(Ks), R(r), 1)), z("click", p, () => wc(R(Ks), R(n).id)), z("change", g, (e) => Sc(R(Ks), R(n).id, "text", e.target.value)), z("change", S, (e) => Tc(R(Ks), R(n).id, e)), V(e, i);
					});
					var p = I(f, 2), m = (e) => {
						var t = Ix(), n = F(t, !0);
						L((e) => H(n, e), [() => J("hint.collections.empty")]), V(e, t);
					};
					U(p, (e) => {
						R(t).entries.length || e(m);
					}), Oe(2), L((e, t, n, r, i, u) => {
						H(a, e), q(o, "title", t), H(s, n), q(c, "title", r), H(l, `${i ?? ""} `), q(d, "title", u);
					}, [
						() => J("ui.addEntry"),
						() => J("tip.collections.exportCsv"),
						() => J("ui.exportCsv"),
						() => J("tip.collections.importCsv"),
						() => J("ui.importCsv"),
						() => J("tip.collections.deleteCollection")
					]), z("click", i, () => xc(R(Ks))), z("click", o, () => Fc(R(Ks))), z("change", u, (e) => Ic(R(Ks), e)), z("click", d, () => bc(R(Ks))), V(e, n);
				};
				U(i, (e) => {
					R(Ks) && R(Gs)[R(Ks)] && e(a);
				});
				var o = I(i, 2), s = N(o), c = I(s);
				G(c), D(o);
				var l = I(o, 2), u = N(l);
				Y(I(u), {
					get value() {
						return R(Js);
					},
					get options() {
						return Ys;
					},
					onchange: (e) => M(Js, e, !0)
				}), D(l);
				var d = I(l, 2), f = F(d, !0);
				D(t), L((e, t, n, r, i) => {
					H(s, `${e ?? ""} `), q(c, "placeholder", t), H(u, `${n ?? ""} `), d.disabled = r, H(f, i);
				}, [
					() => J("lbl.newCollectionName"),
					() => J("ph.collections.name"),
					() => J("common.type"),
					() => !R(qs).trim(),
					() => J("ui.createCollection")
				]), z("keydown", c, (e) => e.key === "Enter" && vc()), Li(c, () => R(qs), (e) => M(qs, e)), z("click", d, vc), V(e, t);
			}, E = (e) => {
				var t = bS(), n = N(t), r = (e) => {
					var t = Ix(), n = F(t, !0);
					L((e) => H(n, e), [() => J("hint.plugins.empty")]), V(e, t);
				}, i = /* @__PURE__ */ A(() => !Jc().length);
				U(n, (e) => {
					R(i) && e(r);
				});
				var a = I(n, 2);
				ni(a, 16, Jc, (e) => e, (e, t) => {
					let n = /* @__PURE__ */ A(() => Vc[t]), r = /* @__PURE__ */ A(() => (R(Bc)?.enabled ?? []).includes(t));
					var i = gS();
					let a;
					var o = N(i), s = N(o), c = F(s, !0), l = I(s, 2), u = (e) => {
						var t = mS(), r = F(t);
						L(() => H(r, `v${R(n).version ?? ""}`)), V(e, t);
					};
					U(l, (e) => {
						R(n)?.version && e(u);
					});
					var d = I(l, 2), f = N(d), p = N(f);
					G(p);
					var m = I(p);
					D(f);
					var h = I(f, 2);
					W(h, () => X.cross, !0), D(h), D(d), D(o);
					var g = I(o, 2), _ = (e) => {
						var t = hS(), r = F(t, !0);
						L((e) => H(r, e), [() => R(n).errors.join("; ")]), V(e, t);
					}, v = (e) => {
						var t = hS(), r = F(t, !0);
						L((e) => H(r, e), [() => J("plugin.engineMismatch", {
							required: R(n).requiresEngine,
							current: R(Hc)
						})]), V(e, t);
					}, y = (e) => {
						var t = hS(), r = F(t, !0);
						L((e) => H(r, e), [() => J("plugin.cspNeeded", { list: el(R(n).csp).join(", ") })]), V(e, t);
					}, b = /* @__PURE__ */ A(() => R(n)?.csp && el(R(n).csp).length);
					U(g, (e) => {
						R(n)?.errors?.length ? e(_) : R(n) && !R(n).satisfied ? e(v, 1) : R(b) && e(y, 2);
					});
					var x = I(g, 2), S = (e) => {
						var t = Ix(), r = F(t, !0);
						L((e) => H(r, e), [() => J("plugin.languages", { list: R(n).languages.map((e) => e.name).join(", ") })]), V(e, t);
					};
					U(x, (e) => {
						R(n)?.languages?.length && e(S);
					}), D(i), L((e, t, o, s, l) => {
						a = Ei(i, 1, "plugin-row", null, a, { "plugin-broken": R(n)?.errors?.length }), H(c, e), q(f, "title", t), Ni(p, R(r)), p.disabled = o, H(m, ` ${s ?? ""}`), q(h, "title", l);
					}, [
						() => R(n)?.names?.[la()] ?? R(n)?.name ?? t,
						() => R(r) ? J("tip.plugins.on") : J("tip.plugins.off"),
						() => !!R(n)?.errors?.length,
						() => R(r) ? J("ui.on") : J("ui.off"),
						() => J("tip.plugins.remove")
					]), z("change", p, (e) => cl(t, e.target.checked)), z("click", h, () => dl(t)), V(e, i);
				});
				var o = I(a, 2), s = (e) => {
					var t = vS(), n = I(P(t), 2), r = F(n, !0);
					ni(I(n, 2), 16, () => R(Gc), (e) => e, (e, t) => {
						var n = _S(), r = N(n), i = N(r), a = F(i, !0), o = I(i, 2), s = (e) => {
							var n = mS(), r = F(n);
							L(() => H(r, `v${Vc[t].version ?? ""}`)), V(e, n);
						};
						U(o, (e) => {
							Vc[t]?.version && e(s);
						});
						var c = I(o, 2), l = N(c);
						W(l, () => X.right, !0), D(l), D(c), D(r), D(n), L((e, t) => {
							H(a, e), q(l, "title", t);
						}, [() => Vc[t]?.names?.[la()] ?? Vc[t]?.name ?? t, () => J("tip.plugins.addFound")]), z("click", l, () => pl(t)), V(e, n);
					}), L((e) => H(r, e), [() => J("hint.plugins.found")]), V(e, t);
				};
				U(o, (e) => {
					R(Gc).length && e(s);
				});
				var c = I(o, 2), l = (e) => {
					var t = Vr(), n = P(t), r = (e) => {
						var t = Ix(), n = F(t, !0);
						L((e) => H(n, e), [() => J("hint.plugins.autoDiscover")]), V(e, t);
					};
					U(n, (e) => {
						R(Gc).length || e(r);
					}), V(e, t);
				}, u = (e) => {
					var t = yS(), n = I(P(t), 2);
					G(n);
					var r = I(n, 2), i = F(r, !0), a = I(r, 2), o = (e) => {
						var t = hS(), n = F(t, !0);
						L(() => H(n, R(Wc))), V(e, t);
					};
					U(a, (e) => {
						R(Wc) && e(o);
					}), L((e, t, a) => {
						q(n, "placeholder", e), r.disabled = t, H(i, a);
					}, [
						() => J("ph.plugins.folder"),
						() => !R(Uc).trim(),
						() => J("ui.addPlugin")
					]), z("keydown", n, (e) => e.key === "Enter" && fl()), Li(n, () => R(Uc), (e) => M(Uc, e)), z("click", r, fl), V(e, t);
				};
				U(c, (e) => {
					R(qc) === "ok" ? e(l) : e(u, -1);
				}), D(t), V(e, t);
			}, ie = (e) => {
				var t = Jx(), n = N(t), r = (e) => {
					var t = Ix(), n = F(t, !0);
					L((e) => H(n, e), [() => J("hint.history.loading")]), V(e, t);
				}, i = (e) => {
					var t = Ub(), n = P(t), r = (e) => {
						var t = Ix(), n = F(t, !0);
						L(() => H(n, R(Fi))), V(e, t);
					};
					U(n, (e) => {
						R(Fi) && e(r);
					});
					var i = I(n, 2), a = (e) => {
						var t = SS(), n = P(t), r = F(n, !0);
						ni(I(n, 2), 19, () => R(Pi), (e) => e.sha, (e, t, n) => {
							var r = xS();
							let i;
							var a = N(r), o = F(a, !0), s = F(I(a, 2));
							D(r), L((e) => {
								i = Ei(r, 1, "history-row", null, i, { head: R(n) === 0 }), q(a, "title", R(t).sha), H(o, R(t).message), H(s, `${R(t).author ?? ""}${e ?? ""}`);
							}, [() => R(t).date ? ` · ${zi.format(new Date(R(t).date))}` : ""]), V(e, r);
						}), L((e, t) => {
							n.disabled = R(Ii) || !R(se)?.allowed, q(n, "title", e), H(r, t);
						}, [() => R(se)?.allowed ? J("tip.history.revert") : J("tip.history.needsAccess"), () => J("ui.revertLast")]), z("click", n, Vi), V(e, t);
					};
					U(i, (e) => {
						R(Pi).length > 0 && e(a);
					}), V(e, t);
				};
				U(n, (e) => {
					R(Pi) === null ? e(r) : e(i, -1);
				}), D(t), V(e, t);
			}, ae = (e) => {
				var t = Jx(), n = N(t), r = (e) => {
					var t = Ix(), n = F(t, !0);
					L((e) => H(n, e), [() => J("update.checking")]), V(e, t);
				}, i = (e) => {
					var t = CS(), n = P(t), r = F(n, !0), i = I(n, 2), a = F(i, !0);
					L((e) => {
						H(r, R(Ji)), H(a, e);
					}, [() => J("update.retry")]), z("click", i, Zi), V(e, t);
				}, a = (e) => {
					var t = PS(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2), o = (e) => {
						var t = wS(), n = P(t);
						W(n, () => X.right, !0), D(n);
						var r = F(I(n, 2), !0);
						L(() => H(r, R(qi).target)), V(e, t);
					};
					U(a, (e) => {
						R(qi).upToDate || e(o);
					}), D(n);
					var s = I(n, 2), c = (e) => {
						var t = Ix(), n = F(t, !0);
						L((e) => H(n, e), [() => J("update.upToDate")]), V(e, t);
					}, l = (e) => {
						var t = NS(), n = P(t), r = F(n, !0), i = I(n, 2), a = (e) => {
							var t = TS(), n = N(t), r = F(n, !0), i = I(n, 2), a = F(N(i), !0);
							D(i), D(t), L((e) => {
								H(r, e), H(a, R(qi).notes);
							}, [() => J("update.aboutVersion", { target: R(qi).target })]), V(e, t);
						};
						U(i, (e) => {
							R(qi).notes && e(a);
						});
						var o = I(i, 2), s = (e) => {
							var t = ES(), n = N(t), r = N(n);
							W(r, () => X.warn, !0), D(r);
							var i = I(r);
							D(n);
							var a = I(n, 2), o = F(N(a), !0);
							D(a), D(t), L((e, t) => {
								q(n, "title", e), H(i, ` ${t ?? ""}`), H(o, R(qi).headers.upstream);
							}, [() => J("update.headersManual"), () => J("update.headersTitle")]), V(e, t);
						};
						U(o, (e) => {
							R(qi).headers?.upstream && e(s);
						});
						var c = I(o, 2);
						ni(c, 17, () => R(qi).changes.filter((e) => e.atom && e.conflict), (e) => e.path, (e, t) => {
							var n = OS(), r = N(n), i = F(r, !0), a = I(r, 2), o = N(a), s = (e) => {
								var t = DS(), n = F(t, !0);
								L((e) => H(n, e), [() => J("update.actionDelete")]), V(e, t);
							};
							U(o, (e) => {
								R(t).action === "delete" && e(s);
							});
							var c = I(o, 2);
							W(c, () => X.warn, !0), D(c), D(a), D(n), L((e) => {
								q(r, "title", R(t).path), H(i, R(t).path), q(c, "title", e);
							}, [() => J(`update.conflict.${R(t).conflict}`)]), V(e, n);
						});
						var l = I(c, 2), u = N(l), d = F(u), f = I(u, 2);
						ni(f, 21, () => R(qi).changes.filter((e) => e.atom && !e.conflict), (e) => e.path, (e, t) => {
							var n = kS(), r = N(n), i = F(r, !0), a = I(r, 2), o = (e) => {
								var t = DS(), n = F(t, !0);
								L((e) => H(n, e), [() => J("update.actionDelete")]), V(e, t);
							};
							U(a, (e) => {
								R(t).action === "delete" && e(o);
							}), D(n), L(() => {
								q(r, "title", R(t).path), H(i, R(t).path);
							}), V(e, n);
						}), D(f), D(l);
						var p = I(l, 2), m = (e) => {
							var t = MS(), n = P(t), r = N(n), i = F(r, !0), a = F(I(r, 2), !0);
							D(n), ni(I(n, 2), 17, () => R(qi).changes.filter((e) => !e.atom), (e) => e.path, (e, t) => {
								var n = jS(), r = N(n);
								let i;
								var a = F(r, !0), o = I(r, 2), s = N(o), c = (e) => {
									var t = DS(), n = F(t, !0);
									L((e) => H(n, e), [() => J("update.actionDelete")]), V(e, t);
								};
								U(s, (e) => {
									R(t).action === "delete" && e(c);
								});
								var l = I(s, 2), u = (e) => {
									var n = AS();
									W(n, () => X.warn, !0), D(n), L((e) => q(n, "title", e), [() => J(`update.conflict.${R(t).conflict}`)]), V(e, n);
								};
								U(l, (e) => {
									R(t).conflict && e(u);
								});
								var d = I(l, 2);
								G(d), D(o), D(n), L((e, n, o, s) => {
									i = Ei(r, 1, "update-path", null, i, { skipped: e }), q(r, "title", R(t).path), H(a, R(t).path), Ni(d, n), q(d, "title", o), q(d, "aria-label", s);
								}, [
									() => R(Xi).has(R(t).path),
									() => R(Xi).has(R(t).path),
									() => J("update.keepMine.title"),
									() => J("update.keepMine")
								]), z("change", d, () => Qi(R(t).path)), V(e, n);
							}), L((e, t) => {
								H(i, e), H(a, t);
							}, [() => J("update.optionalTitle"), () => J("update.keepMine")]), V(e, t);
						}, h = /* @__PURE__ */ A(() => R(qi).changes.some((e) => !e.atom));
						U(p, (e) => {
							R(h) && e(m);
						});
						var g = I(p, 2), _ = F(g, !0);
						L((e, t, n, i, a, o) => {
							H(r, e), q(u, "title", t), H(d, `${n ?? ""} · ${i ?? ""}`), g.disabled = R(Yi) || !R(se)?.allowed, q(g, "title", a), H(_, o);
						}, [
							() => J("update.summary", {
								writes: R(qi).changes.filter((e) => e.action === "write").length,
								deletes: R(qi).changes.filter((e) => e.action === "delete").length
							}),
							() => J("update.atomGroup.title"),
							() => J("update.atomTitle"),
							() => R(qi).changes.filter((e) => e.atom).length,
							() => R(se)?.allowed ? J("update.run.title") : J("tip.history.needsAccess"),
							() => J("update.run", { target: R(qi).target })
						]), z("click", g, $i), V(e, t);
					};
					U(s, (e) => {
						R(qi).upToDate ? e(c) : e(l, -1);
					}), L((e) => H(i, e), [() => J("update.current", { version: R(qi).current })]), V(e, t);
				};
				U(n, (e) => {
					R(Yi) && !R(qi) ? e(r) : R(Ji) ? e(i, 1) : R(qi) && e(a, 2);
				}), D(t), V(e, t);
			};
			U(v, (e) => {
				R(jt) === "pages" ? e(y) : R(jt) === "nav" ? e(b, 1) : R(jt) === "site" ? e(x, 2) : R(jt) === "theme" ? e(S, 3) : R(jt) === "blocks" ? e(w, 4) : R(jt) === "grid" ? e(ee, 5) : R(jt) === "properties" ? e(te, 6) : R(jt) === "footer" ? e(ne, 7) : R(jt) === "collections" ? e(re, 8) : R(jt) === "plugins" ? e(E, 9) : R(jt) === "history" ? e(ie, 10) : R(jt) === "update" && e(ae, 11);
			}), D(t), Ui(t, (e) => M(ju, e), () => R(ju)), L((e) => {
				n = Ei(t, 1, "panel", null, n, { hidden: !R(le) }), q(i, "title", e), H(s, Pt[R(jt)]);
			}, [() => Ft[R(jt)]?.map((e) => J(e)).join("\n")]), V(e, t);
		};
		U(S, (e) => {
			R(jt) && e(w);
		});
		var ee = I(S, 2);
		let te;
		var ne = N(ee), re = N(ne);
		Ui(re, (e) => M(oe, e), () => R(oe)), D(ne), D(ee), Ui(ee, (e) => M(Se, e), () => R(Se)), D(t), L((e, t) => {
			r = Ei(n, 1, "rail", null, r, { hidden: !R(le) }), _ = Ei(u, 1, "rail-gear", null, _, { active: R(ua) }), q(u, "title", e), te = Ei(ee, 1, "frame-wrap", null, te, {
				mobile: R(xe) === "mobile",
				pan: R(Ie),
				fold: R(Ae) > 0
			}), Oi(ne, `width:${R(Pe) ?? ""}px; height:${R(Fe) ?? ""}px`), q(re, "title", t), q(re, "src", `/?page=${R(T)}&preview=1`), Oi(re, `width:${R(ke) ?? ""}px; height:${R(Ne) ?? ""}px; transform:scale(${R(je) ?? ""}); transform-origin:top left`);
		}, [() => J("settings.title"), () => J("ui.previewTitle")]), z("click", u, () => M(ua, !R(ua))), jr("load", re, ia), kr(re), V(e, t);
	}, Sf = (e) => {
		var t = LS(), n = F(t, !0);
		L((e) => H(n, e), [() => J("ui.loading")]), V(e, t);
	};
	U(bf, (e) => {
		R(w) ? e(xf) : e(Sf, -1);
	});
	var Cf = I(bf, 2), wf = (e) => {
		Om(e, {
			get image() {
				return R(ao);
			},
			onapply: so,
			oncancel: () => M(ao, null)
		});
	};
	U(Cf, (e) => {
		R(ao) && e(wf);
	});
	var Tf = I(Cf, 2), Ef = (e) => {
		{
			let t = /* @__PURE__ */ A(() => R(Zt).mode === "set" ? pc(R(Gt)?.props.design).id : null), n = /* @__PURE__ */ A(() => R(k) ? Ge(R(k)) : null), r = /* @__PURE__ */ A(() => O?.data ? Ge(O.data) : null);
			eh(e, {
				get mode() {
					return R(Zt).mode;
				},
				get current() {
					return R(t);
				},
				get site() {
					return R(n);
				},
				get page() {
					return R(r);
				},
				onpick: (e) => {
					R(Zt).mode === "add" ? Td(e) : bn(e), M(Zt, null);
				},
				onclose: () => M(Zt, null)
			});
		}
	};
	U(Tf, (e) => {
		R(Zt) && e(Ef);
	});
	var Df = I(Tf, 2), Of = (e) => {
		var t = zS(), n = N(t), r = N(n), i = F(r, !0), a = I(r, 2);
		ni(a, 16, () => R(gt).lines, (e) => e, (e, t) => {
			var n = RS(), r = F(n, !0);
			L(() => H(r, t)), V(e, n);
		});
		var o = I(a, 2), s = (e) => {
			var t = eS();
			G(t), dt(t, !0), L(() => q(t, "placeholder", R(gt).placeholder)), z("keydown", t, (e) => e.key === "Enter" && R(gt).value.trim() && yt(!0)), Li(t, () => R(gt).value, (e) => R(gt).value = e), V(e, t);
		};
		U(o, (e) => {
			R(gt).prompt && e(s);
		});
		var c = I(o, 2), l = N(c), u = F(l, !0), d = I(l, 2), f = F(d, !0);
		D(c), D(n), D(t), L(() => {
			H(i, R(gt).title), H(u, R(gt).cancelLabel), H(f, R(gt).okLabel);
		}), z("pointerdown", t, (e) => bt = e.target === e.currentTarget), z("click", t, (e) => bt && e.target === e.currentTarget && yt(!1)), z("click", l, () => yt(!1)), z("click", d, () => yt(!0)), V(e, t);
	};
	U(Df, (e) => {
		R(gt) && e(Of);
	});
	var kf = I(Df, 2), Af = (e) => {
		var t = BS(), n = N(t), r = N(n), i = F(r, !0), a = I(r, 2), o = F(a, !0), s = I(a, 2), c = N(s), l = I(c);
		G(l), D(s);
		var u = I(s, 2), d = N(u), f = I(d);
		{
			let e = /* @__PURE__ */ A(() => J("setup.accentPick"));
			Pa(f, {
				get value() {
					return R(Ct);
				},
				get label() {
					return R(e);
				},
				onchange: (e) => M(Ct, e, !0)
			});
		}
		D(u);
		var p = I(u, 2), m = N(p), h = I(m);
		{
			let e = /* @__PURE__ */ A(() => J("setup.bgLabel"));
			Pa(h, {
				get value() {
					return R(wt);
				},
				get label() {
					return R(e);
				},
				onchange: (e) => M(wt, e, !0)
			});
		}
		D(p);
		var g = I(p, 2), _ = F(g, !0), v = I(g, 2), y = N(v), b = F(y, !0), x = I(y, 2), S = F(x, !0);
		D(v), D(n), D(t), L((e, t, n, r, a, s, u, f, p, h) => {
			H(i, e), H(o, t), H(c, `${n ?? ""} `), q(l, "placeholder", r), H(d, `${a ?? ""} `), H(m, `${s ?? ""} `), H(_, u), H(b, f), x.disabled = p, H(S, h);
		}, [
			() => J("setup.title"),
			() => J("setup.intro"),
			() => J("setup.nameLabel"),
			() => J("ph.setup.name"),
			() => J("setup.accentLabel"),
			() => J("setup.bgLabel"),
			() => J("setup.outro"),
			() => J("setup.skip"),
			() => !R(St).trim(),
			() => J("setup.start")
		]), z("keydown", l, (e) => e.key === "Enter" && Et()), Li(l, () => R(St), (e) => M(St, e)), z("click", y, Tt), z("click", x, Et), V(e, t);
	};
	U(kf, (e) => {
		R(xt) && e(Af);
	});
	var jf = I(kf, 2), Mf = (e) => {
		var t = VS();
		let n;
		var r = N(t), i = F(r, !0), a = I(r, 2);
		D(t), L((e) => {
			n = Ei(t, 1, "toast", null, n, {
				ok: R(ne) === "ok",
				error: R(ne) === "error"
			}), H(i, R(te)), q(a, "title", e);
		}, [() => J("ui.close")]), z("click", a, () => E("")), V(e, t);
	};
	U(jf, (e) => {
		R(te) && e(Mf);
	}), D(rf);
	var Nf = I(rf, 2), Pf = (e) => {
		Vp(e, {
			get pos() {
				return R(Yt);
			},
			onclose: () => M(Yt, null)
		});
	};
	U(Nf, (e) => {
		R(Yt) && R(Gt) && e(Pf);
	}), L(() => cf = Ei(sf, 1, "topbar", null, cf, { hidden: !R(le) })), V(e, nf), et();
}
//#endregion
//#region src/main.js
Mr([
	"change",
	"click",
	"input",
	"pointerdown",
	"keydown"
]), document.documentElement.lang = await fa();
var WS = qr(US, { target: document.getElementById("urd-admin") });
//#endregion
export { WS as default };
