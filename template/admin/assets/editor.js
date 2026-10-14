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
var g = 1 << 24, _ = 1024, v = 2048, y = 4096, b = 8192, x = 16384, S = 32768, C = 1 << 25, w = 65536, T = 1 << 19, E = 1 << 20, ee = 1 << 25, te = 1 << 21, ne = 1 << 22, re = 1 << 23, ie = Symbol("$state"), ae = Symbol("component"), oe = Symbol("legacy props"), se = Symbol(""), ce = Symbol("attributes"), le = Symbol("class"), ue = Symbol("style"), de = Symbol("text"), fe = Symbol("form reset"), pe = new class extends Error {
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
function D() {
	return Ee(/* @__PURE__ */ hn(Te));
}
function O(e) {
	if (Ce) {
		if (/* @__PURE__ */ hn(Te) !== null) throw xe(), he;
		Te = e;
	}
}
function De(e = 1) {
	if (Ce) {
		for (var t = e, n = Te; t--;) n = /* @__PURE__ */ hn(n);
		Te = n;
	}
}
function Oe(e = !0) {
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
function ke(e) {
	if (!e || e.nodeType !== 8) throw xe(), he;
	return e.data;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
function k(e) {
	return e === this.v;
}
function Ae(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function je(e) {
	return !Ae(e, this.v);
}
function Me(e) {
	throw Error("https://svelte.dev/e/lifecycle_outside_component");
}
//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
function Ne() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function Pe(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function Fe(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function Ie() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Le(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function Re() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function ze(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function Be() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Ve() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function He() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Ue() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
//#endregion
//#region node_modules/svelte/src/internal/shared/clone.js
var We = [];
function Ge(e, t = !1, n = !1) {
	return Ke(e, /* @__PURE__ */ new Map(), "", We, null, n);
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
	return e === null && Me(t), e.c ??= new Map(qe(e) || void 0);
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
		equals: k,
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
	r === null && Ne();
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
			l?.(), s.delete(n), t !== St && (c.activate(), t ? (a.f |= re, nn(a, t)) : (a.f & 8388608 && (a.f ^= re), nn(a, e)), c.deactivate());
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
	return t.equals = je, t;
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
		Re();
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
		equals: k,
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
	return t || (r.equals = je), r;
}
function M(e, t, n = !1) {
	return Zn !== null && (!Qn || Zn.f & 131072) && nt() && Zn.f & 4325394 && (nr === null || !nr.has(e)) && He(), nn(e, n ? sn(t) : t, Rt);
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
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && Be();
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
			Ve();
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
	return O(e), n;
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
	if (t === null) return Zn.f |= re, e;
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
	er === null && (Zn === null && Le(e), Ie()), Yn && Fe(e);
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
	return wn(4 | E, e);
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
	return wn(ne | T, e);
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
		e.f |= te;
		var u = e.fn, d = u();
		e.f |= S;
		var f = gr(e);
		if (nt() && or !== null && !Qn && f !== null && !(e.f & 6146)) for (var p = 0; p < or.length; p++) mr(or[p], e);
		if (i !== null && i !== e) {
			if (lr++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = lr;
			if (t !== null) for (let e of t) e.rv = lr;
			or !== null && (r === null ? r = or : r.push(...or));
		}
		return e.f & 8388608 && (e.f ^= re), d;
	} catch (t) {
		return gr(e), bn(t);
	} finally {
		e.f ^= te, ir = t, ar = n, or = r, Zn = i, nr = a, Xe(o), Qn = s, ur = c;
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
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = Te), D();
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
				D();
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
			t = !0, n && Ue(), this.#s !== null && Hn(this.#s, () => {
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
		this.#a &&= (zn(this.#a), null), this.#o &&= (zn(this.#o), null), this.#s &&= (zn(this.#s), null), Ce && (Ee(this.#t), De(), Ee(Oe()));
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
	Ce && (r = Te, D());
	var i = new Zr(e), a = n ? w : 0;
	function o(e, t) {
		if (Ce) {
			var n = ke(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Oe();
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
		r?.has(a) ? (a.f |= ee, Kn(a, document.createDocumentFragment())) : zn(t[i], n);
	}
}
var ti;
function ni(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = Ce ? Ee(/* @__PURE__ */ mn(u)) : u.appendChild(pn());
	}
	Ce && D();
	var d = null, f = /* @__PURE__ */ wt(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, ii(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= ee, oi(d, null, c)) : Wn(d) : Hn(d, () => {
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
			Ce && ke(c) === "[!" != (e === 0) && (c = Oe(), Ee(c), we(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = jt, v = _n(), y = 0; y < e; y += 1) {
				Ce && Te.nodeType === 8 && Te.data === "]" && (c = Te, t = !0, we(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && nn(S.v, b), S.i && nn(S.i, y), v && u.unskip_effect(S.e)) : (S = ai(l, h ? c : ti ??= pn(), b, x, y, o, n, i), h || (S.e.f |= ee), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = Fn(() => s(c)) : (d = Fn(() => s(ti ??= pn())), d.f |= ee)), e > r.size && Pe("", "", ""), Ce && e > 0 && Ee(Oe()), !h) {
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
			if (_.f ^= ee, _ === l) oi(_, null, n);
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
			var E = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.fix();
			}
			$r(e, w, E);
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
			Ce && D();
			return;
		}
		if (n && !Ce) {
			e.nodes = null, c.innerHTML = s, s !== "" && zr(/* @__PURE__ */ mn(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (Bn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (Ce) {
				for (var a = Te.data, l = D(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ hn(l);
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
	Ce && (r = Te, D());
	var i = new Zr(e);
	Nn(() => {
		var e = t() ?? null;
		if (Ce && ke(r) === "[" != (e !== null)) {
			var a = Oe();
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
					J(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					J(e, "checked", null), e.checked = r;
				}
			}
		};
		e[fe] = n, at(n), mt();
	}
}
function K(e, t) {
	var n = Ni(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === Mi) && (e.value = t ?? "");
}
function q(e, t) {
	var n = Ni(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function J(e, t, n, r) {
	var i = Ni(e);
	Ce && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === ji) || i[t] !== (i[t] = n) && (t === "loading" && (e[se] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Fi(e).has(t) ? e[t] = n : e.setAttribute(t, n));
}
function Ni(e) {
	return e[ce] ??= {
		[ki]: e.nodeName.includes("-"),
		[Ai]: e.namespaceURI === _e
	};
}
var Pi = /* @__PURE__ */ new Map();
function Fi(e) {
	var t = e.getAttribute("is") || e.nodeName, n = Pi.get(t);
	if (n) return n;
	Pi.set(t, n = /* @__PURE__ */ new Set());
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.add(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function Ii(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	gt(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = Li(e) ? Ri(a) : a, n(a), jt !== null && r.add(jt), await br(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (Ce && e.defaultValue !== e.value || Cr(t) == null && e.value) && (n(Li(e) ? Ri(e.value) : e.value), jt !== null && r.add(jt)), Mn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = jt;
			if (r.has(i)) return;
		}
		Li(e) && n === Ri(e.value) || (e.type !== "date" || n || e.value) && n !== e.value && (e.value = n ?? "");
	});
}
function Li(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function Ri(e) {
	return e === "" ? null : +e;
}
var zi = /* @__PURE__ */ new class e {
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
function Bi(e, t, n) {
	var r = zi.observe(e, () => n(e[t]));
	An(() => (Cr(() => n(e[t])), r));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function Vi(e, t) {
	return e === t || e?.[ie] === t;
}
function Hi(e = tt(), t, n, r) {
	var i = Ye.r, a = er;
	return An(() => {
		var o, s;
		return Mn(() => {
			o = s, s = r?.() || [], Cr(() => {
				Vi(n(...s), e) || (t(e, ...s), o && Vi(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && Vi(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/universal.js
function Ui(e, t, n, r, i) {
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
var Wi = !1;
function Gi(e) {
	var t = Wi;
	try {
		return Wi = !1, [e(), Wi];
	} finally {
		Wi = t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
function Ki(e, t, n, r) {
	var i = !0, o = !!(n & 8), s = !!(n & 16), c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ xt(r), R(u)) : (l && (l = !1, c = s ? Cr(r) : r), c);
	let f;
	if (o) {
		var p = ie in e || oe in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = Gi(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && ze(t), f(m)));
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
var qi = {
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
}, Ji = [
	"nb",
	"nn",
	"en-GB",
	"se",
	"tr"
], Yi = /^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/, Xi = {
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
function Zi(e) {
	let t = String(e ?? "").trim().toLowerCase();
	for (let [e, n] of Object.entries(Xi)) if (n.some((e) => t === e || t.startsWith(`${e}-`))) return e;
	return null;
}
function Qi(e) {
	return Ji.includes(String(e ?? ""));
}
function $i(e) {
	let t = [];
	if (!Array.isArray(e)) return ["languages must be a list"];
	for (let n of e) {
		if (!n || typeof n != "object" || Array.isArray(n)) {
			t.push("languages: every entry must be an object");
			continue;
		}
		let e = String(n.code ?? "");
		Yi.test(e) ? Qi(e) && t.push(`languages: '${e}' is built into Urd and cannot be overridden`) : t.push(`languages: '${e}' is not a valid language code`), (typeof n.name != "string" || !n.name.trim()) && t.push(`languages/${e}: name is missing (the language's own name)`);
		for (let r of ["site", "admin"]) n[r] !== void 0 && typeof n[r] != "boolean" && t.push(`languages/${e}: ${r} must be a boolean`);
		n.site !== !0 && n.admin !== !0 && t.push(`languages/${e}: must cover site, admin or both`);
	}
	return t;
}
function ea(e) {
	let t = Zi(e);
	if (t) return t;
	let n = String(e ?? "").trim();
	return Yi.test(n) ? n : "nb";
}
async function ta(e, t) {
	try {
		return await (await import(
			/* @vite-ignore */
			"/assets/urd/language-packs.js"
)).loadPackStrings(e, t);
	} catch {
		return null;
	}
}
var na = {
	lang: "nb",
	dict: { ...qi.strings },
	dates: null
}, ra = {
	lang: "nb",
	dict: {}
};
function ia(e, t) {
	if (!t) return e;
	let n = e;
	for (let [e, r] of Object.entries(t)) n = n.replaceAll(`{${e}}`, String(r));
	return n;
}
function Y(e, t) {
	return ia(ra.dict[e] ?? e, t);
}
function aa(e, t) {
	let n = "other";
	try {
		n = new Intl.PluralRules(na.lang).select(t);
	} catch {}
	let r = na.dict[`${e}.${n}`] !== void 0 || na.dict[`${e}.other`] === void 0 ? n : "other";
	return {
		form: r,
		key: `${e}.${r}`
	};
}
function oa(e, t, n) {
	let { key: r } = aa(e, t);
	return ia(na.dict[r] ?? r, {
		...n,
		n: t
	});
}
function sa(e) {
	let t = `api.${e?.code}`;
	return e?.code && ra.dict[t] !== void 0 ? ia(ra.dict[t], e) : e?.error ?? null;
}
function ca() {
	return ra.lang;
}
function la() {
	let e = null;
	try {
		e = localStorage.getItem("urd-admin-lang");
	} catch {}
	if (e) return ea(e);
	for (let e of navigator.languages ?? [navigator.language]) {
		let t = Zi(e);
		if (t) return t;
	}
	return "en-GB";
}
var ua;
new Promise((e) => {
	ua = e;
});
async function da(e = la()) {
	let t = async (e) => (await import(
		/* @vite-ignore */
		`/assets/urd/locales/admin/${e}.js`
)).default.strings;
	ra.lang = ea(e);
	let n = Qi(ra.lang);
	try {
		Object.assign(ra.dict, await t("nb")), n && ra.lang !== "nb" && Object.assign(ra.dict, await t(ra.lang));
	} catch {}
	if (!n) {
		let e = await ta(ra.lang, "admin");
		e ? Object.assign(ra.dict, e) : ra.lang = "nb";
	}
	return ua(ra.lang), ra.lang;
}
//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region node_modules/svelte/src/transition/index.js
function fa(e) {
	let t = e - 1;
	return t * t * t + 1;
}
function pa(e) {
	let t = typeof e == "string" && e.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
	return t ? [parseFloat(t[1]), t[2] || "px"] : [e, "px"];
}
function ma(e, { delay: t = 0, duration: n = 400, easing: r = fa, x: i = 0, y: a = 0, opacity: o = 0 } = {}) {
	let s = getComputedStyle(e), c = +s.opacity, l = s.transform === "none" ? "" : s.transform, u = c * (1 - o), [d, f] = pa(i), [p, m] = pa(a);
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
function ha(e, t, n, r) {
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
function ga(e = globalThis) {
	let t = e?.HTMLElement?.prototype, n = e?.CSS;
	return !!(t && "popover" in t && typeof t.showPopover == "function" && typeof n?.supports == "function" && n.supports("anchor-name: --urd") && n.supports("position-try-fallbacks: flip-block"));
}
var _a = 0;
function va(e = "urd-pop") {
	return _a += 1, `--${e}-${_a}`;
}
function ya(e, t) {
	let n = e?.closest?.(".panel-body, .block-menu-body");
	n && (t ? n.style.setProperty("anchor-name", "--urd-pane") : n.style.removeProperty("anchor-name"));
}
//#endregion
//#region src/lib/ColorPicker.svelte
var ba = /* @__PURE__ */ B("<button type=\"button\" class=\"cp-eye svelte-zxiloo\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), xa = /* @__PURE__ */ B("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), Sa = /* @__PURE__ */ B("<button type=\"button\"></button>"), Ca = /* @__PURE__ */ B("<span class=\"cp-label svelte-zxiloo\"> <!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), wa = /* @__PURE__ */ B("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\">×</button></span>"), Ta = /* @__PURE__ */ B("<span class=\"cp-tokens svelte-zxiloo\"></span>"), Ea = /* @__PURE__ */ B("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), Da = /* @__PURE__ */ B("<span class=\"cp-label svelte-zxiloo\"> </span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Oa = /* @__PURE__ */ B("<div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\"> <button type=\"button\" class=\"cp-add svelte-zxiloo\">+</button></span> <!> <!>", 1), ka = /* @__PURE__ */ B("<button type=\"button\" class=\"cp-clear svelte-zxiloo\">×</button>"), Aa = /* @__PURE__ */ B("<div class=\"cp-pop cp-anchored svelte-zxiloo\" popover=\"auto\"><!></div>"), ja = /* @__PURE__ */ B("<div class=\"cp-pop svelte-zxiloo\"><!></div>"), Ma = /* @__PURE__ */ B("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!> <!></span>");
function Na(e, t) {
	$e(t, !0);
	let n = (e) => {
		var t = Oa(), n = P(t), a = F(n), o = I(n, 2);
		G(o);
		var s = I(o, 2);
		G(s);
		var c = I(s, 2), l = N(c), u = I(l, 2);
		G(u);
		var d = I(u, 2), f = (e) => {
			var t = ba();
			L((e) => J(t, "title", e), [() => Y("cp.eyedropper")]), z("click", t, be), V(e, t);
		};
		U(d, (e) => {
			ye && e(f);
		}), O(c);
		var p = I(c, 2);
		ni(p, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = xa();
			G(r), L((e) => {
				J(r, "title", t), K(r, e);
			}, [() => _e(R(n))]), z("change", r, (e) => ve(R(n), e.target.value)), V(e, r);
		}), O(p);
		var v = I(p, 2), y = (e) => {
			var t = Ca(), n = P(t), a = N(n, !0), o = I(a), s = (e) => {
				var t = Br();
				L((e) => H(t, e), [() => Y("cp.linkedSuffix", { token: m() })]), V(e, t);
			}, c = /* @__PURE__ */ A(() => m());
			U(o, (e) => {
				R(c) && e(s);
			}), O(n);
			var l = I(n, 2);
			ni(l, 21, i, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ A(() => h(R(t), 2));
				let i = () => R(n)[0], a = () => R(n)[1];
				var o = Sa();
				let s;
				L((e) => {
					s = Ei(o, 1, "cp-token svelte-zxiloo", null, s, { active: r() === i() }), Oi(o, `background: ${a() ?? ""}`), J(o, "title", e);
				}, [() => Y("cp.tokenTitle", { name: i() })]), z("click", o, () => me(i(), a())), V(e, o);
			}), O(l), L((e) => H(a, e), [() => Y("cp.themeColors")]), V(e, t);
		};
		U(v, (e) => {
			i().length && e(y);
		});
		var b = I(v, 2), x = N(b), S = I(x);
		O(b);
		var te = I(b, 2), ne = (e) => {
			var t = Ta();
			ni(t, 20, () => R(_), (e) => e, (e, t) => {
				var n = wa(), r = N(n), i = I(r, 2);
				O(n), L((e) => {
					Oi(r, `background: ${t ?? ""}`), J(r, "title", t), J(i, "title", e);
				}, [() => Y("cp.removeSaved")]), z("click", r, () => xe(t)), z("click", i, () => Ce(t)), V(e, n);
			}), O(t), V(e, t);
		};
		U(te, (e) => {
			R(_).length && e(ne);
		});
		var re = I(te, 2), ie = (e) => {
			var t = Da(), n = P(t), r = F(n, !0), i = I(n, 2);
			ni(i, 20, () => R(g), (e) => e, (e, t) => {
				var n = Ea();
				L(() => {
					Oi(n, `background: ${t ?? ""}`), J(n, "title", t);
				}), z("click", n, () => xe(t)), V(e, n);
			}), O(i), L((e) => H(r, e), [() => Y("common.recent")]), V(e, t);
		};
		U(re, (e) => {
			R(g).length && e(ie);
		}), L((e, t, r, i, c) => {
			Oi(n, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${R(C) ?? ""}, 100%, 50%)`), Oi(a, `left: ${R(w) * 100}%; top: ${(1 - R(T)) * 100}%`), K(o, R(C)), K(s, e), J(s, "title", t), Oi(s, `background: linear-gradient(to right, transparent, ${r ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), Oi(l, `background: ${R(ee) ?? ""}`), K(u, R(ee)), H(x, `${i ?? ""} `), J(S, "title", c);
		}, [
			() => Math.round(R(E) * 100),
			() => Y("cp.alpha"),
			() => ae(),
			() => Y("cp.saved"),
			() => Y("cp.saveTitle")
		]), z("pointerdown", n, he), z("input", o, (e) => {
			M(C, Number(e.target.value), !0), se();
		}), z("input", s, (e) => {
			M(E, Number(e.target.value) / 100), se();
		}), z("change", u, ge), z("click", S, Se), V(e, t);
	}, r = Ki(t, "value", 3, "#000000"), i = Ki(t, "tokens", 19, () => []), a = Ki(t, "label", 19, () => Y("cp.pickColor")), o = Ki(t, "allowClear", 3, !1), s = "urd-recent-colors", c = "urd-saved-colors", l = ga(), u = va("urd-cp"), d = u.slice(2), f = /* @__PURE__ */ j(null), p = () => {
		let e = i().find(([e]) => e === r());
		return e ? e[1] : r();
	}, m = () => i().find(([e]) => e === r())?.[0] ?? null, g = /* @__PURE__ */ j(sn([])), _ = /* @__PURE__ */ j(sn([])), v = "", y = "", b = /* @__PURE__ */ j(null), x = /* @__PURE__ */ j(!1), S = /* @__PURE__ */ j(sn({
		top: 0,
		left: 0
	})), C = /* @__PURE__ */ j(0), w = /* @__PURE__ */ j(0), T = /* @__PURE__ */ j(1), E = /* @__PURE__ */ j(1), ee = /* @__PURE__ */ j("#000000");
	function te(e) {
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
	let ne = (e, t, n) => "#" + [
		e,
		t,
		n
	].map((e) => e.toString(16).padStart(2, "0")).join("");
	function re(e, t, n) {
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
		return ne(...ie(R(C), R(w), R(T)));
	}
	function oe() {
		let e = ae();
		return R(E) >= .995 ? e : e + Math.round(R(E) * 255).toString(16).padStart(2, "0");
	}
	function se() {
		M(ee, oe(), !0), y = R(ee), t.onchange?.(R(ee));
	}
	function ce(e) {
		let t = te(e);
		return t ? (((e) => {
			var t = h(e, 3);
			M(C, t[0], !0), M(w, t[1], !0), M(T, t[2], !0);
		})(re(t[0], t[1], t[2])), M(E, t[3], !0), M(ee, oe(), !0), !0) : !1;
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
		e.newState === "open" ? (le(), ya(R(b), !0), M(x, !0)) : R(x) && (ya(R(b), !1), M(x, !1), fe());
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
		ce(n), M(ee, n, !0), t.onchange?.(e);
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
		ce(e.target.value) ? se() : M(ee, ae(), !0);
	}
	function _e(e) {
		return (te(ae()) ?? [
			0,
			0,
			0
		])[e];
	}
	function ve(e, t) {
		let n = te(ae()) ?? [
			0,
			0,
			0
		];
		n[e] = Math.min(255, Math.max(0, Number(t) || 0)), ((e) => {
			var t = h(e, 3);
			M(C, t[0], !0), M(w, t[1], !0), M(T, t[2], !0);
		})(re(...n)), se();
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
	var we = Ma(), Te = N(we);
	let Ee;
	var D = I(Te, 2), De = (e) => {
		var n = ka();
		L((e, t) => {
			J(n, "title", e), J(n, "aria-label", t);
		}, [() => Y("cp.clearTitle"), () => Y("cp.clear")]), z("click", n, () => t.onchange?.("")), V(e, n);
	};
	U(D, (e) => {
		o() && r() && e(De);
	});
	var Oe = I(D, 2), ke = (e) => {
		var t = Aa(), r = N(t), i = (e) => {
			n(e);
		};
		U(r, (e) => {
			R(x) && e(i);
		}), O(t), Hi(t, (e) => M(f, e), () => R(f)), L(() => {
			J(t, "id", d), Oi(t, `position-anchor: ${u ?? ""}`);
		}), jr("toggle", t, ue), z("click", t, (e) => e.preventDefault()), V(e, t);
	}, k = (e) => {
		var t = ja(), r = N(t);
		n(r), O(t), L(() => Oi(t, `top: ${R(S).top ?? ""}px; left: ${R(S).left ?? ""}px`)), z("click", t, (e) => e.preventDefault()), V(e, t);
	};
	U(Oe, (e) => {
		l ? e(ke) : R(x) && e(k, 1);
	}), O(we), Hi(we, (e) => M(b, e), () => R(b)), L((e, t, n) => {
		Ee = Ei(Te, 1, "cp-swatch svelte-zxiloo", null, Ee, {
			linked: e,
			"cp-empty": o() && !r()
		}), Oi(Te, `background: ${t ?? ""}${l ? `; anchor-name: ${u}` : ""}`), J(Te, "title", n), J(Te, "popovertarget", l ? d : void 0), J(Te, "aria-label", a());
	}, [
		() => m(),
		() => r() ? p() : "transparent",
		() => m() ? Y("cp.linkedTitle", {
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
//#region src/lib/previewBridge.js
function Pa(e, t = {}) {
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
var Fa = 400;
function Ia({ prepare: e, onHeight: t, title: n }) {
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
			}, clearTimeout(a), a = setTimeout(l, Fa);
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
var La = [
	"forEach",
	"isDisjointFrom",
	"isSubsetOf",
	"isSupersetOf"
], Ra = [
	"difference",
	"intersection",
	"symmetricDifference",
	"union"
], za = !1, Ba = class e extends Set {
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ j(0);
	#n = /* @__PURE__ */ j(0);
	#r = ur || -1;
	constructor(e) {
		if (super(), e) {
			for (var t of e) super.add(t);
			this.#n.v = super.size;
		}
		za || this.#a();
	}
	#i(e) {
		return ur === this.#r ? /* @__PURE__ */ j(e) : Qt(e);
	}
	#a() {
		za = !0;
		var t = e.prototype, n = Set.prototype;
		for (let e of La) t[e] = function(...t) {
			return R(this.#t), n[e].apply(this, t);
		};
		for (let r of Ra) t[r] = function(...t) {
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
}, Va = "urd-quick-row", Ha = ["fit", "phone"], Ua = {
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
function Wa(e) {
	return [...Ua[e] ?? [], ...Ha];
}
var Ga = Object.freeze({
	pinned: [],
	removed: []
});
function Ka(e) {
	let t = (e) => Array.isArray(e) ? [...new Set(e.filter((e) => typeof e == "string" && e))] : [];
	return {
		pinned: t(e?.pinned),
		removed: t(e?.removed)
	};
}
function qa(e, t, n) {
	let r = Wa(e).filter((e) => !t.removed.includes(e));
	for (let e of t.pinned) r.includes(e) || r.push(e);
	return r.filter((e) => n.has(e));
}
function Ja(e, t, n) {
	return Wa(e).includes(n) ? !t.removed.includes(n) : t.pinned.includes(n);
}
function Ya(e, t, n) {
	let r = Wa(e).includes(n);
	return Ja(e, t, n) ? r ? {
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
function Xa(e) {
	return e.pinned.length > 0 || e.removed.length > 0;
}
function Za(e) {
	try {
		let t = JSON.parse(e.getItem("urd-quick-row") ?? "{}");
		return !t || typeof t != "object" || Array.isArray(t) ? {} : Object.fromEntries(Object.entries(t).map(([e, t]) => [e, Ka(t)]));
	} catch {
		return {};
	}
}
function Qa(e, t) {
	let n = Object.fromEntries(Object.entries(t).filter(([, e]) => Xa(e)));
	try {
		e.setItem(Va, JSON.stringify(n));
	} catch {}
}
//#endregion
//#region src/menu/state.svelte.js
var $a = "urd-admin-menu-width", eo = sn({
	widthPref: localStorage.getItem($a) === "narrow" ? "narrow" : "wide",
	wide: localStorage.getItem($a) !== "narrow",
	min: 8,
	room: Infinity,
	menuQuery: "",
	propsQuery: "",
	tab: "content"
});
function to() {
	return eo.wide && eo.room >= 740;
}
function no(e) {
	eo.widthPref = e === "narrow" ? "narrow" : "wide", eo.wide = eo.widthPref === "wide", eo.widthPref === "narrow" ? localStorage.setItem($a, "narrow") : localStorage.removeItem($a);
}
function ro(e) {
	eo.min = Math.round(e) + 8, eo.room = window.innerWidth - eo.min - 8;
}
var io = new Ba(), ao = sn({ choices: Za(localStorage) });
function oo(e) {
	return ao.choices[e] ?? Ga;
}
function so(e, t) {
	ao.choices = {
		...ao.choices,
		[e]: t
	}, Qa(localStorage, Ge(ao.choices));
}
function co(e, t) {
	so(e, Ya(e, oo(e), t));
}
//#endregion
//#region src/menu/options.js
var lo = () => [["on", Y("common.on")], ["off", Y("common.off")]], uo = () => [
	["canvas", Y("opt.ribbonWidth.content")],
	["page", Y("opt.ribbonWidth.page")],
	["content", Y("opt.ribbonWidth.own")]
], fo = (e) => e === "canvas" || e === "page" ? e : "content", po = () => [
	["roll", Y("opt.ribbonMotion.roll")],
	["sway", Y("opt.ribbonMotion.sway")],
	["step", Y("opt.ribbonMotion.step")],
	["none", Y("opt.ribbonMotion.none")]
], mo = () => [
	["text", Y("opt.ribbonStripe.text")],
	["marks", Y("opt.ribbonStripe.marks")],
	["plain", Y("opt.ribbonStripe.plain")]
], ho = () => [["none", Y("common.none")], ...mo()], go = () => [
	["dot", Y("opt.ribbonSep.dot")],
	["dash", Y("opt.ribbonSep.dash")],
	["slash", Y("opt.ribbonSep.slash")],
	["star", Y("opt.ribbonSep.star")],
	["none", Y("common.none")],
	["custom", Y("opt.ribbonSep.custom")]
], _o = (e) => e.color || (e.variant === "plain" ? "text" : "accent-text"), vo = (e) => `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">${e}</svg>`, yo = {
	dot: vo("<circle cx=\"12\" cy=\"12\" r=\"3\"/>"),
	dash: vo("<rect x=\"3\" y=\"10.6\" width=\"18\" height=\"2.8\" rx=\"1.4\"/>"),
	slash: vo("<path d=\"M15.5 3.5L8.5 20.5\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\" fill=\"none\"/>"),
	star: vo("<path d=\"M12 2.8l2.3 6.1 6.5.4-5 4.1 1.6 6.3-5.4-3.5-5.4 3.5 1.6-6.3-5-4.1 6.5-.4z\"/>"),
	none: vo("<path d=\"M5 12h14\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\" opacity=\"0.35\"/><path d=\"M6 6l12 12\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>"),
	custom: vo("<path d=\"M5 8h14M5 12h9M5 16h12\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>")
}, bo = () => [
	["line", Y("shape.line")],
	["arrow", Y("shape.arrow")],
	["circle", Y("shape.circle")],
	["rect", Y("shape.rect")],
	["triangle", Y("shape.triangle")]
], xo = () => [
	["accent", Y("color.accent")],
	["text", Y("color.text")],
	["surface", Y("color.surface")],
	["bg", Y("color.bg")]
], So = [
	["top-left", "opt.dock.topLeft"],
	["top-center", "opt.dock.topCenter"],
	["top-right", "opt.dock.topRight"],
	["middle-left", "opt.dock.middleLeft"],
	["middle-center", "opt.dock.middleCenter"],
	["middle-right", "opt.dock.middleRight"],
	["bottom-left", "opt.dock.bottomLeft"],
	["bottom-center", "opt.dock.bottomCenter"],
	["bottom-right", "opt.dock.bottomRight"]
], Co = /* @__PURE__ */ B("<span aria-hidden=\"true\"><svg viewBox=\"0 0 16 16\" width=\"1em\" height=\"1em\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"svelte-vtocc6\"><path d=\"M3.5 6l4.5 4.5L12.5 6\"></path></svg></span>"), wo = /* @__PURE__ */ B("<span class=\"dd-note svelte-vtocc6\"> </span>"), To = /* @__PURE__ */ B("<button type=\"button\"> <!></button>"), Eo = /* @__PURE__ */ B("<button type=\"button\"><span class=\"dd-value svelte-vtocc6\"> </span> <!></button> <div class=\"dd-pop dd-anchored svelte-vtocc6\" popover=\"auto\"><!></div>", 1), Do = /* @__PURE__ */ B("<div class=\"dd-pop svelte-vtocc6\"></div>"), Oo = /* @__PURE__ */ B("<button type=\"button\"><span class=\"dd-value svelte-vtocc6\"> </span> <!></button> <!>", 1), ko = /* @__PURE__ */ B("<span class=\"dd svelte-vtocc6\"><!></span>");
function Ao(e, t) {
	$e(t, !0);
	let n = (e) => {
		var t = Co();
		let n;
		L(() => n = Ei(t, 1, "dd-caret svelte-vtocc6", null, n, { "dd-caret-open": R(f) })), V(e, t);
	}, r = Ki(t, "value", 3, null), i = Ki(t, "options", 19, () => []), a = Ki(t, "title", 3, null), o = Ki(t, "disabled", 3, !1), s = Ki(t, "filled", 3, !1), c = Ki(t, "compact", 3, !1), l = ga(), u = va("urd-dd"), d = u.slice(2), f = /* @__PURE__ */ j(!1), p = /* @__PURE__ */ j(null), m = /* @__PURE__ */ j(null), g = /* @__PURE__ */ j(sn({
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
	var x = ko(), S = N(x), C = (e) => {
		var t = Eo(), l = P(t);
		let p;
		var g = N(l), v = F(g, !0), y = I(g, 2);
		n(y), O(l);
		var x = I(l, 2), S = N(x), C = (e) => {
			var t = Vr();
			ni(P(t), 17, i, ([e, t, n]) => `${e ?? ""}`, (e, t) => {
				var n = /* @__PURE__ */ A(() => h(R(t), 3));
				let i = () => R(n)[0], a = () => R(n)[1], o = () => R(n)[2];
				var s = To();
				let c;
				var l = N(s, !0), u = I(l), d = (e) => {
					var t = wo(), n = F(t, !0);
					L(() => H(n, o())), V(e, t);
				};
				U(u, (e) => {
					o() && e(d);
				}), O(s), L(() => {
					c = Ei(s, 1, "dd-opt svelte-vtocc6", null, c, { selected: `${i() ?? ""}` == `${r() ?? ""}` }), H(l, a());
				}), z("click", s, () => b(i())), V(e, s);
			}), V(e, t);
		};
		U(S, (e) => {
			R(f) && e(C);
		}), O(x), Hi(x, (e) => M(m, e), () => R(m)), L((e) => {
			p = Ei(l, 1, "dd-btn svelte-vtocc6", null, p, {
				"dd-filled": s(),
				"dd-compact": c()
			}), J(l, "title", a()), l.disabled = o(), J(l, "popovertarget", d), Oi(l, `anchor-name: ${u ?? ""}`), H(v, e), J(x, "id", d), Oi(x, `position-anchor: ${u ?? ""}`);
		}, [() => _()]), jr("toggle", x, (e) => {
			M(f, e.newState === "open");
		}), V(e, t);
	}, w = (e) => {
		var t = Oo(), l = P(t);
		let u;
		var d = N(l), p = F(d, !0), m = I(d, 2);
		n(m), O(l);
		var v = I(l, 2), x = (e) => {
			var t = Do();
			ni(t, 21, i, ([e, t, n]) => `${e ?? ""}`, (e, t) => {
				var n = /* @__PURE__ */ A(() => h(R(t), 3));
				let i = () => R(n)[0], a = () => R(n)[1], o = () => R(n)[2];
				var s = To();
				let c;
				var l = N(s, !0), u = I(l), d = (e) => {
					var t = wo(), n = F(t, !0);
					L(() => H(n, o())), V(e, t);
				};
				U(u, (e) => {
					o() && e(d);
				}), O(s), L(() => {
					c = Ei(s, 1, "dd-opt svelte-vtocc6", null, c, { selected: `${i() ?? ""}` == `${r() ?? ""}` }), H(l, a());
				}), z("click", s, () => b(i())), V(e, s);
			}), O(t), L(() => Oi(t, `top: ${R(g).top ?? ""}px; left: ${R(g).left ?? ""}px; min-width: ${R(g).width ?? ""}px`)), V(e, t);
		};
		U(v, (e) => {
			R(f) && e(x);
		}), L((e) => {
			u = Ei(l, 1, "dd-btn svelte-vtocc6", null, u, {
				"dd-filled": s(),
				"dd-compact": c()
			}), J(l, "title", a()), l.disabled = o(), H(p, e);
		}, [() => _()]), z("click", l, y), V(e, t);
	};
	U(S, (e) => {
		l ? e(C) : e(w, -1);
	}), O(x), Hi(x, (e) => M(p, e), () => R(p)), V(e, x), et();
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
}, jo = /* @__PURE__ */ B("<button type=\"button\"></button>");
function Mo(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock.type), i = /* @__PURE__ */ A(() => Ja(R(r), oo(R(r)), t.id));
	var a = jo();
	let o;
	W(a, () => R(i) ? X.pinOn : X.pin, !0), O(a), L((e, t) => {
		o = Ei(a, 1, "menu-pin", null, o, { on: R(i) }), J(a, "aria-pressed", R(i)), J(a, "title", e), J(a, "aria-label", t);
	}, [() => R(i) ? Y("menu.unpin") : Y("menu.pin"), () => R(i) ? Y("menu.unpin") : Y("menu.pin")]), z("click", a, () => co(R(r), t.id)), V(e, a), et();
}
Mr(["click"]);
//#endregion
//#region ../template/assets/engine/0.7.4/calendar-designs.js
var No = [
	"list",
	"cards",
	"month",
	"agenda",
	"next",
	"week",
	"day",
	"year"
], Po = [
	"title",
	"date",
	"time",
	"place",
	"description",
	"category",
	"number"
], Fo = [
	"noticeLabel",
	"noticeTitle",
	"noticeText",
	"emptyKicker",
	"emptyTitle",
	"series",
	"forWhom",
	"openAll"
], Io = {
	noticeTitle: "calendar.noticeTitleHint",
	noticeText: "calendar.noticeTextHint"
}, Lo = ["emptyKicker", "emptyTitle"], Ro = [
	"noticeLabel",
	"noticeTitle",
	"noticeText",
	"readWhole",
	"moreInfo"
], zo = /* @__PURE__ */ "all.signup.subscribe.subscribeMulti.addGoogle.swUpcoming.swWeek.swMonth.noMatch.earlier.showAll.zoneOf.zoneYours.weekN.range.moreN.dayNone.cancelled.allDay.until.timeAt.today.tomorrow.inDays.when.where.organizer.moreAbout.join.addEvent.addOne.addFile.addWhole.icalAddress.onMap.recurring".split("."), Bo = [
	"modern",
	"next",
	"ap"
];
function Vo() {
	return Bo.map((e) => ({
		family: e,
		labelKey: `calendar.family.${e}`,
		designs: Ho.filter((t) => t.family === e)
	})).filter((e) => e.designs.length);
}
var Z = (e, t = "colors") => ({
	key: e,
	labelKey: `calendar.slot.${e}`,
	section: t
}), Ho = [
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
			...zo
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
		texts: zo
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
			...zo
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
		texts: ["program", ...zo]
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
		texts: ["count", ...zo]
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
		texts: [...Lo, ...zo]
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
		texts: zo
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
		texts: ["wholeProgram", ...zo]
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
			...zo
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
		texts: zo
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
		texts: zo
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
		texts: [...Lo, ...zo]
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
			...zo
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
		texts: zo
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
		texts: ["todayBtn", ...zo]
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
		texts: ["unnamed", ...zo]
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
		texts: zo
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
		texts: [...Lo, ...zo]
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
			...zo
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
			...zo
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
			...zo
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
			...zo
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
			...zo
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
			...Ro,
			...zo
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
			...zo
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
		texts: ["now", ...zo]
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
			...zo
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
			...zo
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
			...zo
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
			...zo
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
			...Ro,
			...Lo,
			...zo
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
			...Lo,
			...zo
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
			...Ro,
			...Lo,
			...zo
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
		texts: ["todayBtn", ...zo]
	}
], Uo = (e, t, n, r) => ({
	key: e,
	kind: "choice",
	values: t,
	def: n,
	labelKey: `calendar.opt.${e}`,
	...r ? { when: r } : {}
}), Wo = (e, t) => ({
	key: e,
	kind: "switch",
	def: t,
	labelKey: `calendar.opt.${e}`
}), Go = (e) => ({
	key: e,
	kind: "hour",
	def: null,
	labelKey: `calendar.opt.${e}`
}), Ko = {
	sidepanel: [Uo("panelSide", [
		"right",
		"left",
		"under"
	], "right")],
	weekPlan: [
		Go("hourFrom"),
		Go("hourTo"),
		Wo("weekend", !1)
	],
	dayPlan: [
		Go("hourFrom"),
		Go("hourTo"),
		Wo("weekend", !1)
	],
	table: [
		Wo("colTime", !0),
		Wo("colPlace", !0),
		Wo("zebra", !0)
	],
	posters: [Uo("columns", [
		"auto",
		"2",
		"3",
		"4"
	], "auto")],
	photo: [Uo("columns", [
		"auto",
		"2",
		"3",
		"4"
	], "auto")],
	yearWheel: [Uo("firstMonth", [
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
	numbered: [Wo("pad", !0)],
	band: [Wo("roll", !0), Uo("pause", ["button", "touch"], "button", { roll: !0 })]
}, qo = [
	"weekStrip",
	"weekPlan",
	"layers"
], Jo = [
	"month",
	"sidepanel",
	"apMonth"
];
function Yo(e) {
	let t = ts(e?.design), n = e?.switcherViews ?? {};
	return {
		week: qo.includes(n.week) ? n.week : "weekStrip",
		month: Jo.includes(n.month) ? n.month : t.set === "apCream" || t.set === "apNavy" ? "apMonth" : "month"
	};
}
function Xo(e) {
	return e?.description === "card" || e?.description === "rows" ? e.description : e?.options?.description === !1 ? "card" : "rows";
}
function Zo(e) {
	let t = ts(e?.design);
	return t.excerpt === !0 || t.id === "plain" && ns(e) === "cards";
}
function Qo(e) {
	return Ko[ts(e).id] ?? [];
}
function $o(e) {
	let t = e?.options ?? {}, n = {};
	for (let r of Qo(e?.design)) {
		let e = t[r.key];
		r.kind === "choice" ? n[r.key] = r.values.includes(e) ? e : r.def : r.kind === "switch" ? n[r.key] = typeof e == "boolean" ? e : r.def : n[r.key] = Number.isInteger(e) && e >= 0 && e <= 24 ? e : null;
	}
	return n;
}
function es(e, t) {
	return !e.when || Object.entries(e.when).every(([e, n]) => t?.[e] === n);
}
function ts(e) {
	return Ho.find((t) => t.id === e) ?? Ho[0];
}
function ns(e) {
	return ts(e?.design).view || (No.includes(e?.view) ? e.view : "list");
}
var rs = [
	"list",
	"cards",
	"agenda",
	"next"
];
function is() {
	let e = [{
		view: null,
		designs: Ho.filter((e) => e.view === null)
	}];
	for (let t of No) {
		let n = Ho.filter((e) => e.view === t);
		n.length && e.push({
			view: t,
			designs: n
		});
	}
	return e;
}
var as = /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, os = /^[a-z][a-z0-9-]*$/;
function ss(e) {
	return typeof e == "string" ? as.test(e) ? e : os.test(e) ? `var(--urd-color-${e})` : null : null;
}
function cs(e, t) {
	let n = typeof t?.show == "boolean" ? t.show : e.stripe;
	return {
		show: n,
		color: n ? ss(t?.color) : null
	};
}
var ls = {
	min: 8,
	max: 120
}, us = /^(?:\s|&nbsp;|&#160;|<[^<>]*>)*$/i;
function ds(e) {
	return typeof e != "string" || us.test(e);
}
function fs(e, t) {
	return Object.keys(t ?? {}).some((n) => {
		let r = n.split(".")[0];
		return !e.texts.includes(r) || Io[r] ? !1 : t[n] === !1 ? Fo.includes(r) : !ds(t[n]);
	});
}
function ps(e) {
	let t = {};
	for (let n of Object.keys(Io)) ds(e?.[n]) || (t[n] = e[n]);
	return Object.keys(t).length ? t : void 0;
}
function ms(e) {
	return Number(e) === 2 ? 2 : 1;
}
//#endregion
//#region ../template/assets/engine/0.7.4/gallery-layout.js
var hs = [
	"floating",
	"fill",
	"band",
	"mosaic"
], gs = [
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
], _s = [
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
], vs = [
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
], ys = [
	"square",
	"circle",
	"triangle",
	"diamond",
	"hexagon",
	"octagon",
	"star",
	"heart"
], bs = {
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
}, xs = {
	floating: "drift",
	fill: "none",
	mosaic: "crossfade",
	band: "none"
}, Ss = {
	min: 1,
	max: 20,
	dflt: 8
}, Cs = {
	min: 60,
	max: 400
}, ws = {
	floating: 140,
	band: 156,
	mosaic: 140,
	fill: 0
}, Ts = {
	polaroid: "#ffffff",
	border: "#ffffff",
	thick: "#ffffff",
	double: "#ffffff",
	dark: "#161616",
	glow: "accent"
}, Es = 1.35, Ds = {
	min: 0,
	max: 1,
	dflt: .85
}, Os = {
	min: 0,
	max: 15,
	dflt: 5
}, ks = {
	min: 0,
	max: 48,
	dflt: 5
}, As = {
	min: .5,
	max: 90,
	dflt: 30
}, js = {
	min: .5,
	max: 90,
	dflt: 12
}, Ms = {
	min: 4,
	max: 20,
	dflt: 12
};
function Ns(e) {
	let t = String(e), n = 5381;
	for (let e = 0; e < t.length; e++) n = (n << 5) + n + t.charCodeAt(e) >>> 0;
	return n;
}
function Ps(e, t) {
	let n = Ns(`${e}:${t}`);
	return n ^= n >>> 15, n = Math.imul(n, 739982445) >>> 0, n ^= n >>> 12, n = Math.imul(n, 695872825) >>> 0, n ^= n >>> 15, (n >>> 0) / 4294967296;
}
function Fs(e) {
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
function Is(e) {
	return Array.from({ length: Math.max(1, Math.round(Number(e) || 0)) }, (e, t) => ({ src: Fs(t) }));
}
var Ls = (e) => Math.round(e * 100) / 100;
function Rs(e, { min: t, max: n, dflt: r }) {
	if (e == null || e === "") return r;
	let i = Number(e);
	return Number.isFinite(i) ? Math.min(n, Math.max(t, i)) : r;
}
function zs(e) {
	return hs.includes(e) ? e : "floating";
}
function Bs(e, t) {
	let n = zs(e);
	return bs[n].includes(t) ? t : xs[n];
}
function Vs(e) {
	return bs[zs(e)];
}
function Hs({ style: e = "floating", motion: t, reducedMotion: n = !1 } = {}) {
	return n ? !1 : zs(e) === "band" || Bs(e, t) !== "none";
}
function Us(e, t, n, r = !1) {
	let i = Math.round(Rs(e, zs(t) === "mosaic" ? Ms : Ss)), a = Number(n);
	return !r && Number.isFinite(a) && a > 0 ? Math.min(i, a) : i;
}
function Ws(e, t) {
	let n = ws[zs(t)] || ws.floating;
	return Math.round(Rs(e, {
		...Cs,
		dflt: n
	}));
}
function Gs(e) {
	return Js(e) in Ts;
}
function Ks(e, t) {
	let n = Ts[Js(e)] ?? "";
	return n && typeof t == "string" && t.trim() ? t.trim() : n;
}
function qs(e) {
	return gs.includes(e) ? e : "rect";
}
function Js(e) {
	return _s.includes(e) ? e : "shadow";
}
function Ys(e) {
	return vs.includes(e) ? e : "natural";
}
function Xs(e, t) {
	if (Js(t) === "polaroid") return .84;
	let n = qs(e);
	return ys.includes(n) ? 1 : n === "arch" ? .8 : Es;
}
function Zs(e) {
	return ["rect", "square"].includes(qs(e));
}
function Qs(e) {
	return Rs(e, js);
}
function $s(e) {
	return Rs(e, Ds);
}
function ec(e) {
	return Rs(e, Os);
}
function tc(e) {
	return Math.round(Rs(e, ks));
}
function nc(e) {
	return Rs(e, As);
}
function rc(e) {
	return ms(e);
}
function ic(e, t) {
	let n = Number(e);
	return Number.isFinite(n) && n > 0 ? Math.round(n) : Number(t) || 1;
}
function ac(e, { count: t, seed: n, size: r, spread: i, tilt: a, style: o = "floating", repeat: s = !1 } = {}) {
	let c = (Array.isArray(e) ? e : []).filter((e) => e && typeof e.src == "string" && e.src), l = Us(t, o, c.length, s), u = Ws(r, o), d = $s(i), f = ec(a), p = n == null || n === "" ? 1 : n, m = Math.ceil(Math.sqrt(l * 1.6)), h = Math.ceil(l / m), g = Array.from({ length: m * h }, (e, t) => t).map((e) => ({
		cell: e,
		at: Ps(p, `cell${e}`)
	})).sort((e, t) => e.at - t.at).map((e) => e.cell), _ = [];
	for (let e = 0; e < l; e++) {
		let t = g[e], n = (t % m + .5) / m + (Ps(p, `x${e}`) - .5) * (.9 / m), r = (Math.floor(t / m) + .5) / h + (Ps(p, `y${e}`) - .5) * (.9 / h);
		_.push({
			src: c.length ? c[e % c.length].src : "",
			index: c.length ? e % c.length : -1,
			x: Ls(50 + (n - .5) * 100 * d),
			y: Ls(50 + (r - .5) * 100 * d),
			w: Math.round(u * (.8 + Ps(p, `w${e}`) * .4)),
			rot: oc(p, e, f),
			phase: Ls(Ps(p, `p${e}`)),
			heading: Ls(Ps(p, `h${e}`))
		});
	}
	return _;
}
function oc(e, t, n) {
	return Ls((Ps(e == null || e === "" ? 1 : e, `r${t}`) - .5) * 2 * ec(n));
}
function sc(e, t) {
	let n = e == null || e === "" ? 1 : e, r = Ps(n, `m${t}`);
	return {
		cols: r < .3 ? 2 : 1,
		rows: r > .7 || r < .1 ? 2 : 1,
		phase: Ls(Ps(n, `mp${t}`))
	};
}
function cc(e, t, n, r = !1) {
	let i = Us(e, "mosaic", n, r);
	return Array.from({ length: i }, (e, n) => sc(t, n));
}
//#endregion
//#region ../template/assets/engine/0.7.4/gallery-model.js
var lc = [
	"grid",
	"carousel",
	"slides",
	"ribbon",
	"mosaic",
	"polaroid"
], uc = [
	"grid",
	"mosaic",
	"polaroid"
], dc = {
	min: 80,
	max: 400,
	dflt: 140
}, fc = {
	min: 0,
	max: 15,
	dflt: 4
};
function pc(e) {
	return lc.includes(e) ? e : "grid";
}
function mc(e, t, n) {
	return !Number.isFinite(n) || n < 1 ? 0 : (((Number.isFinite(e) ? e : 0) + t) % n + n) % n;
}
function hc({ count: e = 0, reducedMotion: t = !1 } = {}) {
	return e >= 2 && !t;
}
function gc(e, { min: t = 2, fallback: n = 5 } = {}) {
	let r = Number(e);
	return !Number.isFinite(r) || r <= 0 ? n : Math.max(t, r);
}
var _c = /* @__PURE__ */ new Set([
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
function vc(e) {
	return _c.has(e?.type) && e.height?.mode !== "own";
}
var yc = /* @__PURE__ */ new Set([
	"calendar",
	"collection",
	"product"
]), bc = /* @__PURE__ */ new Set([
	"countdown",
	"quote",
	"stats"
]), xc = /* @__PURE__ */ new Set([
	"image",
	"video",
	"shape",
	"icon"
]), Sc = /* @__PURE__ */ new Set([
	"image",
	"video",
	"shape",
	"icon",
	"map"
]), Cc = {
	min: .4,
	max: 2
}, wc = {
	min: 6,
	max: 200,
	minDefault: 12,
	maxDefault: 96
};
function Tc(e) {
	if (!e || Sc.has(e.type)) return 1;
	let t = Number(e.size);
	return !Number.isFinite(t) || t <= 0 ? 1 : Math.round(Math.min(Cc.max, Math.max(Cc.min, t)) * 100) / 100;
}
function Ec(e) {
	let t = (e, t) => {
		let n = Number(e);
		return Number.isFinite(n) && n > 0 ? Math.min(wc.max, Math.max(wc.min, Math.round(n))) : t;
	}, n = t(e?.sizeMin, wc.minDefault);
	return {
		min: n,
		max: Math.max(n, t(e?.sizeMax, wc.maxDefault))
	};
}
function Dc(e, t = {}) {
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
function Oc(e, t, n) {
	return kc(e, /* @__PURE__ */ new Map([[t, n]]));
}
function kc(e, t) {
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
	let { shifts: i } = Dc(n);
	for (let e of n) {
		let t = i.get(e.id) ?? 0;
		t && r.set(e.id, e.y + t);
	}
	return r;
}
//#endregion
//#region ../template/assets/engine/0.7.4/palette-search.js
function Ac(e) {
	return String(e ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}
function jc(e, t) {
	let n = Ac(t).trim(), r = Ac(e);
	return n ? r.startsWith(n) ? 0 : r.split(/[^a-z0-9]+/).some((e) => e.startsWith(n)) ? 1 : r.includes(n) ? 2 : -1 : 2;
}
function Mc(e, t) {
	let n = Ac(e);
	return Ac(t).split(/\s+/).filter(Boolean).every((e) => n.includes(e));
}
function Nc(e, t, n) {
	return e.map((e, r) => ({
		item: e,
		i: r,
		rank: jc(n(e), t)
	})).filter((e) => e.rank >= 0).sort((e, t) => e.rank - t.rank || e.i - t.i).map((e) => e.item);
}
//#endregion
//#region src/lib/menu-search.js
function Pc(e, t, n = "", r = /* @__PURE__ */ new Set()) {
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
			if (Pc(a.children, t, `${e} ${a.text}`, r), r.size > o) {
				r.add(a);
				for (let e of a.children ?? []) e.kind === "row" && !e.text.trim() && r.add(e);
			}
		} else t(`${e} ${a.text}`) && r.add(a);
		i && r.size > o && r.add(i);
	}
	return r;
}
var Fc = "button, select, textarea, svg, [popover], .dd, .gridmenu-value, .menu-group-value", Ic = ".row-tool, .cp-clear, [popover] *";
function Lc(e) {
	let t = [], n = (e) => {
		for (let r of e.childNodes) r.nodeType === 3 ? t.push(r.data) : r.nodeType === 1 && !r.matches(Fc) && n(r);
	};
	n(e);
	let r = e.getAttribute("title");
	r && t.push(r);
	for (let n of e.querySelectorAll("[title]")) n.matches(Ic) || t.push(n.getAttribute("title"));
	return t.join(" ").replace(/\s+/g, " ").trim();
}
function Rc(e, t = "") {
	let n = [];
	for (let r of e.children) if (!(t && r.matches(t))) {
		if (r.tagName === "DETAILS") {
			let e = r.querySelector(":scope > summary"), t = r.querySelector(":scope > .group-items") ?? r;
			n.push({
				kind: "group",
				el: r,
				text: e ? Lc(e) : "",
				children: Rc(t, "summary")
			});
		} else r.tagName === "HR" ? n.push({
			kind: "rule",
			el: r,
			text: ""
		}) : r.matches(".panel-strong, .mini-label") ? n.push({
			kind: "heading",
			el: r,
			text: Lc(r)
		}) : n.push({
			kind: "row",
			el: r,
			text: Lc(r)
		});
	}
	return n;
}
function zc(e, t) {
	for (let n of e.children) {
		let e = Rc(n, ".emenu-title, .emenu-none"), r = Pc(e, t), i = (e) => {
			for (let t of e) t.el.classList.toggle("menu-miss", !r.has(t)), t.kind === "group" && (r.has(t) && (t.el.open = !0), i(t.children));
		};
		i(e), n.classList.toggle("menu-empty", !e.some((e) => r.has(e)));
	}
}
function Bc(e, t) {
	return (n) => {
		let r = () => zc(n, (n) => t(n, e));
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
var Vc = /* @__PURE__ */ B("<i class=\"menu-group-dot\" aria-hidden=\"true\"></i>"), Hc = /* @__PURE__ */ B("<button type=\"button\" class=\"linkish menu-group-reset\"> </button>"), Uc = /* @__PURE__ */ B("<details class=\"group menu-group\"><summary><!><span class=\"menu-group-title\"> </span><span class=\"menu-group-value\"> </span></summary> <div class=\"group-items\"><!> <!></div></details>");
function Wc(e, t) {
	$e(t, !0);
	let n = Ki(t, "reset", 3, null);
	var r = Uc(), i = N(r), a = N(i), o = (e) => {
		V(e, Vc());
	};
	U(a, (e) => {
		n() && e(o);
	});
	var s = I(a), c = F(s, !0), l = F(I(s), !0);
	O(i);
	var u = I(i, 2), d = N(u);
	ci(d, () => t.children);
	var f = I(d, 2), p = (e) => {
		var t = Hc(), r = F(t, !0);
		L((e) => H(r, e), [() => Y("menu.reset")]), z("click", t, function(...e) {
			n()?.apply(this, e);
		}), V(e, t);
	};
	U(f, (e) => {
		n() && e(p);
	}), O(u), O(r), L((e) => {
		r.open = e, H(c, t.title), H(l, t.value);
	}, [() => io.has(t.id)]), jr("toggle", r, (e) => {
		e.currentTarget.closest(".emenu-search") || (e.currentTarget.open ? io.add(t.id) : io.delete(t.id));
	}), V(e, r), et();
}
Mr(["click"]);
//#endregion
//#region src/menu/Placement.svelte
var Gc = /* @__PURE__ */ B("<div class=\"frame-grid\"><label> <input type=\"number\"/></label> <label> <input type=\"number\"/></label></div>"), Kc = /* @__PURE__ */ B("<div class=\"ctl-row\"><span class=\"mini-label\"> </span> <input type=\"range\" step=\"5\"/> <span class=\"gridmenu-value\"> </span> <!></div> <!>", 1), qc = /* @__PURE__ */ B("<div class=\"ctl-row\"><span class=\"mini-label\"> </span> <input type=\"range\" min=\"1\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div>"), Jc = /* @__PURE__ */ B("<div class=\"pin-line\"><label> <!></label> <!></div> <!>", 1), Yc = /* @__PURE__ */ B("<label> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\"/></label> <label> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\"/></label>", 1), Xc = /* @__PURE__ */ B("<label> <!></label> <!> <label> <!></label>", 1), Zc = /* @__PURE__ */ B("<label> <input type=\"number\" min=\"0\" max=\"400\"/></label>"), Qc = /* @__PURE__ */ B("<label> <!></label>"), $c = /* @__PURE__ */ B("<label> <!></label> <!> <!>", 1), el = /* @__PURE__ */ B("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!>", 1), tl = /* @__PURE__ */ B("<div class=\"frame-grid\"><label> <input type=\"number\" step=\"0.5\"/></label> <label> <input type=\"number\" step=\"1\"/></label> <label> <input type=\"number\" step=\"0.5\" min=\"1\"/></label> <label> <input type=\"number\" step=\"1\" min=\"1\"/></label> <label> <input type=\"number\" step=\"1\"/></label> <label> <input type=\"number\" step=\"1\"/></label></div>"), nl = /* @__PURE__ */ B("<!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), rl = /* @__PURE__ */ B("<label> <!></label> <!>", 1), il = /* @__PURE__ */ B("<!> <!> <!> <div class=\"pin-line\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div> <!> <!> <!>", 1);
function al(e, t) {
	$e(t, !0);
	let n = (e) => {
		var t = Kc(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2);
		G(a);
		var o = I(a, 2), l = F(o);
		Mo(I(o, 2), { id: "size" }), O(n);
		var u = I(n, 2), d = (e) => {
			var t = Gc(), n = N(t), r = N(n, !0), i = I(r);
			G(i), O(n);
			var a = I(n, 2), o = N(a, !0), s = I(o);
			G(s), O(a), O(t), L((e, t, c, l, u, d) => {
				J(n, "title", e), H(r, t), J(i, "min", wc.min), J(i, "max", wc.max), K(i, c), J(a, "title", l), H(o, u), J(s, "min", wc.min), J(s, "max", wc.max), K(s, d);
			}, [
				() => Y("tip.scaleMin"),
				() => Y("lbl.scaleMin"),
				() => Ec(R(c)).min,
				() => Y("tip.scaleMax"),
				() => Y("lbl.scaleMax"),
				() => Ec(R(c)).max
			]), z("change", i, (e) => g("sizeMin", e.target.value)), z("change", s, (e) => g("sizeMax", e.target.value)), V(e, t);
		}, f = /* @__PURE__ */ A(() => Tc(R(c)) !== 1);
		U(u, (e) => {
			R(f) && e(d);
		}), L((e, t, r, o, s) => {
			J(n, "title", e), H(i, t), J(a, "min", Cc.min * 100), J(a, "max", Cc.max * 100), K(a, r), J(a, "aria-label", o), H(l, `${s ?? ""} %`);
		}, [
			() => Y("tip.scale"),
			() => Y("lbl.scale"),
			() => Math.round(Tc(R(c)) * 100),
			() => Y("lbl.scale"),
			() => Math.round(Tc(R(c)) * 100)
		]), z("input", a, (e) => h(e.target.valueAsNumber / 100)), z("change", a, function(...e) {
			s.endSizeGesture?.apply(this, e);
		}), V(e, t);
	}, r = (e) => {
		var t = Jc(), n = P(t), r = N(n), i = N(r), a = I(i);
		{
			let e = /* @__PURE__ */ A(() => R(c).fit ?? "wrap"), t = /* @__PURE__ */ A(() => xc.has(R(c).type) ? [["wrap", Y("opt.fit.fluid")], ["shrink", Y("opt.fit.floor")]] : [
				["wrap", Y("opt.fit.wrap")],
				...te() || R(c).fit === "shrink" ? [["shrink", Y("opt.fit.shrink")]] : [],
				["both", Y("opt.fit.both")]
			]);
			Ao(a, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => p(e)
			});
		}
		O(r), Mo(I(r, 2), { id: "fit" }), O(n);
		var o = I(n, 2), s = (e) => {
			var t = qc(), n = N(t), r = F(n, !0), i = I(n, 2);
			G(i);
			var a = F(I(i, 2));
			O(t), L((e, n, o, s) => {
				J(t, "title", e), H(r, n), K(i, o), H(a, `${s ?? ""} %`);
			}, [
				() => Y("tip.fitMin"),
				() => Y("lbl.fitMin"),
				() => Math.round((R(c).fitMin ?? .6) * 100),
				() => Math.round((R(c).fitMin ?? .6) * 100)
			]), z("input", i, (e) => m(e.target.valueAsNumber / 100)), V(e, t);
		};
		U(o, (e) => {
			R(c).fit && e(s);
		}), L((e, t) => {
			J(r, "title", e), H(i, `${t ?? ""} `);
		}, [() => Y("tip.fit"), () => Y("lbl.fit")]), V(e, t);
	}, i = (e) => {
		var t = Xc(), n = P(t), r = N(n), i = I(r);
		{
			let e = /* @__PURE__ */ A(() => T(R(c).animation) ? R(c).animation.type : ""), t = /* @__PURE__ */ A(E);
			Ao(i, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => S(e || null)
			});
		}
		O(n);
		var a = I(n, 2), o = (e) => {
			var t = Yc(), n = P(t), r = N(n), i = I(r);
			G(i), O(n);
			var a = I(n, 2), o = N(a), s = I(o);
			G(s), O(a), L((e, t) => {
				H(r, `${e ?? ""} `), K(i, R(c).animation.props.duration), H(o, `${t ?? ""} `), K(s, R(c).animation.props.delay);
			}, [() => Y("lbl.durationMs"), () => Y("lbl.delayMs")]), z("change", i, (e) => w("duration", Number(e.target.value))), z("change", s, (e) => w("delay", Number(e.target.value))), V(e, t);
		}, s = /* @__PURE__ */ A(() => T(R(c).animation));
		U(a, (e) => {
			R(s) && e(o);
		});
		var l = I(a, 2), u = N(l), d = I(u);
		{
			let e = /* @__PURE__ */ A(() => R(c).hover?.type ?? (R(c).animation && !T(R(c).animation) ? R(c).animation.type : "")), t = /* @__PURE__ */ A(ee);
			Ao(d, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => C(e || null)
			});
		}
		O(l), L((e, t, i, a) => {
			J(n, "title", e), H(r, `${t ?? ""} `), J(l, "title", i), H(u, `${a ?? ""} `);
		}, [
			() => Y("tip.props.blockAnim"),
			() => Y("lbl.animIn"),
			() => Y("tip.props.blockHover"),
			() => Y("lbl.onHover")
		]), V(e, t);
	}, a = (e) => {
		var t = Vr(), n = P(t), r = (e) => {
			var t = el(), n = P(t), r = N(n);
			G(r);
			var i = I(r);
			O(n);
			var a = I(n, 2), o = (e) => {
				var t = $c(), n = P(t), r = N(n), i = I(r);
				{
					let e = /* @__PURE__ */ A(() => R(c).sticky.mode ?? "scroll"), t = /* @__PURE__ */ A(() => [["scroll", Y("opt.sticky.modeScroll")], ["screen", Y("opt.sticky.modeScreen")]]);
					Ao(i, {
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
				O(n);
				var a = I(n, 2), o = (e) => {
					var t = Zc(), n = N(t), r = I(n);
					G(r), O(t), L((e, i) => {
						J(t, "title", e), H(n, `${i ?? ""} `), K(r, R(c).sticky.offset ?? 16);
					}, [() => R(c).sticky.mode === "screen" ? Y("tip.stickyEdge") : Y("tip.stickyOffset"), () => R(c).sticky.mode === "screen" ? Y("lbl.stickyEdge") : Y("lbl.stickyOffset")]), z("change", r, (e) => d(`edit:${R(c).blockId}`, (t) => {
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
					var t = Qc(), n = N(t), r = I(n);
					{
						let e = /* @__PURE__ */ A(() => R(c).sticky.dock ?? "bottom-right"), t = /* @__PURE__ */ A(() => So.map(([e, t]) => [e, Y(t)]));
						Ao(r, {
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
					O(t), L((e, r) => {
						J(t, "title", e), H(n, `${r ?? ""} `);
					}, [() => Y("tip.stickyDock"), () => Y("lbl.stickyDock")]), V(e, t);
				}, u = (e) => {
					var t = Qc(), n = N(t), r = I(n);
					{
						let e = /* @__PURE__ */ A(() => R(c).sticky.until ?? ""), t = /* @__PURE__ */ A(re);
						Ao(r, {
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
					O(t), L((e, r) => {
						J(t, "title", e), H(n, `${r ?? ""} `);
					}, [() => Y("tip.stickyUntil"), () => Y("lbl.stickyUntil")]), V(e, t);
				};
				U(s, (e) => {
					R(c).sticky.mode === "screen" ? e(l) : e(u, -1);
				}), L((e, t) => {
					J(n, "title", e), H(r, `${t ?? ""} `);
				}, [() => Y("tip.stickyMode"), () => Y("lbl.stickyMode")]), V(e, t);
			};
			U(a, (e) => {
				R(c).sticky && e(o);
			}), L((e, t, a) => {
				J(n, "title", e), q(r, t), H(i, ` ${a ?? ""}`);
			}, [
				() => Y("tip.sticky"),
				() => !!R(c).sticky,
				() => Y("lbl.sticky")
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
		var t = nl(), n = P(t), r = (e) => {
			var t = tl(), n = N(t), r = N(n, !0), i = I(r);
			G(i), O(n);
			var a = I(n, 2), o = N(a, !0), s = I(o);
			G(s), O(a);
			var l = I(a, 2), u = N(l, !0), d = I(u);
			G(d), O(l);
			var p = I(l, 2), m = N(p, !0), h = I(m);
			G(h), O(p);
			var g = I(p, 2), _ = N(g, !0), v = I(_);
			G(v), O(g);
			var y = I(g, 2), b = N(y, !0), x = I(b);
			G(x), O(y), O(t), L((e, t, n, a, l, f, p) => {
				H(r, e), K(i, R(c).frame.x), H(o, t), K(s, R(c).frame.y), H(u, n), K(d, R(c).frame.w), H(m, a), K(h, R(c).frame.h), J(g, "title", l), H(_, f), K(v, R(c).frame.z ?? 1), H(b, p), K(x, R(c).frame.rot ?? 0);
			}, [
				() => Y("frame.x"),
				() => Y("frame.y"),
				() => Y("frame.w"),
				() => Y("frame.h"),
				() => Y("tip.frameZ"),
				() => Y("frame.z"),
				() => Y("frame.rot")
			]), z("change", i, (e) => f("x", Number(e.target.value))), z("change", s, (e) => f("y", Number(e.target.value))), z("change", d, (e) => f("w", Number(e.target.value))), z("change", h, (e) => f("h", Number(e.target.value))), z("change", v, (e) => f("z", Number(e.target.value))), z("change", x, (e) => f("rot", Number(e.target.value))), V(e, t);
		};
		U(n, (e) => {
			R(l) === "desktop" && e(r);
		});
		var i = I(n, 2), a = N(i);
		G(a);
		var o = I(a);
		O(i), L((e, t) => {
			J(i, "title", e), q(a, R(c).decor), H(o, ` ${t ?? ""}`);
		}, [() => Y("tip.decor"), () => Y("lbl.decor")]), z("change", a, (e) => x(e.target.checked)), V(e, t);
	}, s = Ze("urd-editor"), c = /* @__PURE__ */ A(() => s.selectedBlock), l = /* @__PURE__ */ A(() => s.viewMode), u = /* @__PURE__ */ A(() => s.sections), { mutateBlock: d, setBlockFrame: f, setBlockFit: p, setBlockFitMin: m, setBlockSize: h, setBlockSizeBound: g, setBlockHeightMode: _, setBlockHeightAlign: v, canStretch: y, setBlockHideMobile: b, setBlockDecor: x, setBlockAnimation: S, setBlockHover: C, setBlockAnimProp: w, isEntrance: T, blockEntranceOptions: E, hoverOptions: ee, designWidth: te } = s;
	function ne() {
		let e = T(R(c).animation) ? R(c).animation.type : R(c).hover?.type, t = e ? [...E(), ...ee()].find(([t]) => t === e) : null;
		return t ? t[1] : Y("common.none");
	}
	function re() {
		let e = R(u).findIndex((e) => e.id === R(c)?.sectionId);
		return e < 0 ? [["", Y("opt.sticky.ownSection")]] : [["", Y("opt.sticky.ownSection")], ...R(u).slice(e + 1).map((t, n) => [t.id, Y("opt.sticky.atSection", { n: e + 2 + n })])];
	}
	var ie = il(), ae = P(ie), oe = (e) => {
		var t = rl(), n = P(t), r = N(n), i = I(r);
		{
			let e = /* @__PURE__ */ A(() => R(c).height?.mode === "own" ? "own" : "content"), t = /* @__PURE__ */ A(() => [["content", Y("opt.height.content")], ["own", Y("opt.height.own")]]);
			Ao(i, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => _(e)
			});
		}
		O(n);
		var a = I(n, 2), o = (e) => {
			let t = /* @__PURE__ */ A(() => [
				"middle",
				"bottom",
				"stretch"
			].includes(R(c).height.align) ? R(c).height.align : "top");
			var n = Qc(), r = N(n), i = I(r);
			{
				let e = /* @__PURE__ */ A(() => [
					["top", Y("opt.heightAlign.top")],
					["middle", Y("opt.heightAlign.middle")],
					["bottom", Y("opt.heightAlign.bottom")],
					...y() || R(t) === "stretch" ? [["stretch", Y("opt.heightAlign.stretch")]] : []
				]);
				Ao(i, {
					get value() {
						return R(t);
					},
					get options() {
						return R(e);
					},
					onchange: (e) => v(e)
				});
			}
			O(n), L((e, t) => {
				J(n, "title", e), H(r, `${t ?? ""} `);
			}, [() => Y("tip.heightAlign"), () => Y("lbl.heightAlign")]), V(e, n);
		};
		U(a, (e) => {
			R(c).height?.mode === "own" && e(o);
		}), L((e, t) => {
			J(n, "title", e), H(r, `${t ?? ""} `);
		}, [() => Y("tip.height"), () => Y("lbl.height")]), V(e, t);
	}, se = /* @__PURE__ */ A(() => _c.has(R(c).type));
	U(ae, (e) => {
		R(se) && e(oe);
	});
	var ce = I(ae, 2), le = (e) => {
		n(e);
	}, ue = /* @__PURE__ */ A(() => !Sc.has(R(c).type));
	U(ce, (e) => {
		R(ue) && e(le);
	});
	var de = I(ce, 2);
	r(de);
	var fe = I(de, 2), pe = N(fe), me = N(pe);
	G(me);
	var he = I(me);
	O(pe), Mo(I(pe, 2), { id: "phone" }), O(fe);
	var ge = I(fe, 2);
	a(ge);
	var _e = I(ge, 2);
	{
		let e = /* @__PURE__ */ A(() => Y("group.motion")), t = /* @__PURE__ */ A(ne);
		Wc(_e, {
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
		let e = /* @__PURE__ */ A(() => Y("group.placement")), t = /* @__PURE__ */ A(() => R(l) === "desktop" ? `${R(c).frame.w} % × ${R(c).frame.h}` : "");
		Wc(ve, {
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
		J(pe, "title", e), q(me, R(c).hideMobile), H(he, ` ${t ?? ""}`);
	}, [() => Y("tip.hideMobile"), () => Y("lbl.hideMobile")]), z("change", me, (e) => b(e.target.checked)), V(e, ie), et();
}
Mr(["input", "change"]);
//#endregion
//#region src/menu/BoxStyle.svelte
var ol = /* @__PURE__ */ B("<label> <!></label>"), sl = /* @__PURE__ */ B("<label> <!></label> <label> <span class=\"num-stepper\"><button type=\"button\">−</button> <input type=\"number\" min=\"1\" max=\"12\" step=\"1\"/> <button type=\"button\">+</button></span></label>", 1), cl = /* @__PURE__ */ B("<label> <!></label> <label> <!></label> <!> <label> <!></label> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1);
function ll(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), { setBoxStyle: i, themeSwatches: a } = n, o = /* @__PURE__ */ A(() => R(r).props.boxStyle ?? {});
	var s = cl(), c = P(s), l = N(c), u = I(l);
	{
		let e = /* @__PURE__ */ A(() => R(o).bg ?? ""), t = /* @__PURE__ */ A(a), n = /* @__PURE__ */ A(() => Y("tip.box.bg"));
		Na(u, {
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
	O(c);
	var d = I(c, 2), f = N(d), p = I(f);
	{
		let e = /* @__PURE__ */ A(() => R(o).shadow ?? ""), t = /* @__PURE__ */ A(() => [
			["", Y("common.none")],
			["soft", Y("opt.shadow.soft")],
			["strong", Y("opt.shadow.strong")]
		]);
		Ao(p, {
			get value() {
				return R(e);
			},
			get options() {
				return R(t);
			},
			onchange: (e) => i({ shadow: e || null })
		});
	}
	O(d);
	var m = I(d, 2), h = (e) => {
		var t = ol(), n = N(t), r = I(n);
		{
			let e = /* @__PURE__ */ A(() => R(o).shadowColor ?? ""), t = /* @__PURE__ */ A(a), n = /* @__PURE__ */ A(() => Y("tip.box.shadowColor"));
			Na(r, {
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
		O(t), L((e) => H(n, `${e ?? ""} `), [() => Y("lbl.shadowColor")]), V(e, t);
	};
	U(m, (e) => {
		R(o).shadow && e(h);
	});
	var g = I(m, 2), _ = N(g), v = I(_);
	{
		let e = /* @__PURE__ */ A(() => R(o).border === "none" ? "none" : R(o).border ? "custom" : ""), t = /* @__PURE__ */ A(() => [
			["", Y("opt.border.theme")],
			["none", Y("common.none")],
			["custom", Y("opt.border.custom")]
		]);
		Ao(v, {
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
	O(g);
	var y = I(g, 2), b = (e) => {
		let t = /* @__PURE__ */ A(() => typeof R(o).border == "object" ? R(o).border : {
			color: "text",
			width: 1
		});
		var n = sl(), r = P(n), s = N(r), c = I(s);
		{
			let e = /* @__PURE__ */ A(a), n = /* @__PURE__ */ A(() => Y("tip.box.borderColor"));
			Na(c, {
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
		O(r);
		var l = I(r, 2), u = N(l), d = I(u), f = N(d), p = I(f, 2);
		G(p);
		var m = I(p, 2);
		O(d), O(l), L((e, n, r, i, a, o) => {
			H(s, `${e ?? ""} `), H(u, `${n ?? ""} `), J(f, "title", r), J(f, "aria-label", i), K(p, R(t).width), J(m, "title", a), J(m, "aria-label", o);
		}, [
			() => Y("lbl.borderColor"),
			() => Y("lbl.thicknessPx"),
			() => Y("tip.thinner"),
			() => Y("tip.thinner"),
			() => Y("tip.thicker"),
			() => Y("tip.thicker")
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
	O(x), L((e, t, n, r, i, a) => {
		H(l, `${e ?? ""} `), H(f, `${t ?? ""} `), H(_, `${n ?? ""} `), J(x, "title", r), q(S, i), H(C, ` ${a ?? ""}`);
	}, [
		() => Y("lbl.blockColor"),
		() => Y("lbl.shadow"),
		() => Y("lbl.border"),
		() => Y("tip.box.glass"),
		() => !!R(o).glass,
		() => Y("lbl.glass")
	]), z("change", S, (e) => i({ glass: e.target.checked || null })), V(e, s), et();
}
Mr(["click", "change"]);
//#endregion
//#region src/menu/groups.js
function ul(e, t) {
	let n = (t) => Object.entries(t).filter(([t, n]) => e()[t] !== void 0 && JSON.stringify(e()[t]) !== JSON.stringify(n));
	return {
		groupReset: (e, r) => n(r).length ? () => t(e, { ...r }) : null,
		groupChanged: (e) => n(e).length
	};
}
//#endregion
//#region src/menu/families/Text.svelte
var dl = /* @__PURE__ */ B("<p class=\"panel-hint\"> </p>"), fl = /* @__PURE__ */ B("<div class=\"pin-line\"><label> <!></label> <!></div>"), pl = /* @__PURE__ */ B("<div class=\"pin-line\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div> <!>", 1), ml = /* @__PURE__ */ B("<!> <!>", 1);
function hl(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), { setBlockProp: i, setBlockProps: a } = n, { groupReset: o, groupChanged: s } = ul(() => R(r).props, a);
	var c = Vr(), l = P(c), u = (e) => {
		var t = dl(), n = F(t, !0);
		L((e) => H(n, e), [() => Y("hint.textInline")]), V(e, t);
	}, d = (e) => {
		let t = (e) => {
			var t = fl(), n = N(t), a = N(n), o = I(a);
			{
				let e = /* @__PURE__ */ A(() => R(r).props.align ?? "left"), t = /* @__PURE__ */ A(() => [
					["left", Y("common.left")],
					["center", Y("common.center")],
					["right", Y("common.right")]
				]);
				Ao(o, {
					get value() {
						return R(e);
					},
					get options() {
						return R(t);
					},
					onchange: (e) => i("align", e)
				});
			}
			O(n), Mo(I(n, 2), { id: "align" }), O(t), L((e) => H(a, `${e ?? ""} `), [() => Y("lbl.align")]), V(e, t);
		}, n = (e) => {
			var t = pl(), n = P(t), a = N(n), o = N(a);
			G(o);
			var s = I(o);
			O(a), Mo(I(a, 2), { id: "textBox" }), O(n);
			var c = I(n, 2), l = (e) => {
				ll(e, {});
			};
			U(c, (e) => {
				R(r).props.box && e(l);
			}), L((e, t) => {
				q(o, e), H(s, ` ${t ?? ""}`);
			}, [() => !!R(r).props.box, () => Y("lbl.textBoxToggle")]), z("change", o, (e) => i("box", e.target.checked)), V(e, t);
		};
		var a = ml(), s = P(a);
		{
			let e = /* @__PURE__ */ A(() => Y("lbl.align")), n = /* @__PURE__ */ A(() => ({
				left: Y("common.left"),
				center: Y("common.center"),
				right: Y("common.right")
			})[R(r).props.align ?? "left"]), i = /* @__PURE__ */ A(() => o("text-align", { align: "left" }));
			Wc(s, {
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
			let e = /* @__PURE__ */ A(() => Y("group.textBox")), t = /* @__PURE__ */ A(() => R(r).props.box ? Y("common.on") : Y("common.off")), i = /* @__PURE__ */ A(() => o("text-box", {
				box: !1,
				boxStyle: null
			}));
			Wc(c, {
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
var gl = /* @__PURE__ */ B("<input/>"), _l = /* @__PURE__ */ B("<label> <input/></label> <div class=\"pin-line\"><label> <!></label> <!></div> <!>", 1), vl = /* @__PURE__ */ B("<div class=\"pin-line\"><label> <!></label> <!></div>");
function yl(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), { setBlockProp: i, setBlockProps: a, buttonTargets: o, setButtonTarget: s } = n, { groupReset: c, groupChanged: l } = ul(() => R(r).props, a);
	var u = Vr(), d = P(u), f = (e) => {
		let t = (e) => {
			var t = _l(), n = P(t), a = N(n), c = I(a);
			G(c), O(n);
			var l = I(n, 2), u = N(l), d = N(u), f = I(d);
			{
				let e = /* @__PURE__ */ A(() => R(r).props.page ?? "__href"), t = /* @__PURE__ */ A(o);
				Ao(f, {
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
			O(u), Mo(I(u, 2), { id: "goesTo" }), O(l);
			var p = I(l, 2), m = (e) => {
				var t = gl();
				G(t), L((e) => {
					J(t, "placeholder", e), K(t, R(r).props.href === "#" ? "" : R(r).props.href ?? "");
				}, [() => Y("ph.url")]), z("change", t, (e) => i("href", e.target.value || null)), V(e, t);
			};
			U(p, (e) => {
				R(r).props.page || e(m);
			}), L((e, t) => {
				H(a, `${e ?? ""} `), K(c, R(r).props.label), H(d, `${t ?? ""} `);
			}, [() => Y("blocks.text"), () => Y("lbl.goesTo")]), z("change", c, (e) => i("label", e.target.value)), V(e, t);
		};
		{
			let n = /* @__PURE__ */ A(() => Y("group.textLink")), i = /* @__PURE__ */ A(() => o().find(([e]) => e === (R(r).props.page ?? "__href"))?.[1] ?? "");
			Wc(e, {
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
			var t = vl(), n = N(t), a = N(n), o = I(a);
			{
				let e = /* @__PURE__ */ A(() => [["primary", Y("opt.btn.primary")], ["secondary", Y("opt.btn.secondary")]]);
				Ao(o, {
					get value() {
						return R(r).props.style;
					},
					get options() {
						return R(e);
					},
					onchange: (e) => i("style", e)
				});
			}
			O(n), Mo(I(n, 2), { id: "btnStyle" }), O(t), L((e) => H(a, `${e ?? ""} `), [() => Y("lbl.style")]), V(e, t);
		};
		{
			let n = /* @__PURE__ */ A(() => Y("group.appearance")), i = /* @__PURE__ */ A(() => R(r).props.style === "secondary" ? Y("opt.btn.secondary") : Y("opt.btn.primary")), a = /* @__PURE__ */ A(() => c("btn-look", { style: "primary" }));
			Wc(e, {
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
//#region ../template/assets/engine/0.7.4/imageTools.js
var bl = 1600, xl = .82, Sl = .6, Cl = 15e6, wl = 4e6, Tl = 256e3;
function El(e) {
	if (!Ol(e, 0, "GIF8")) return !1;
	for (let t = 13; t < e.length - 11; t++) if (e[t] === 33 && e[t + 1] === 255 && e[t + 2] === 11 && (Ol(e, t + 3, "NETSCAPE2.0") || Ol(e, t + 3, "ANIMEXTS1.0"))) return !0;
	return !1;
}
var Dl = class extends Error {
	constructor(e) {
		super("The animated image is too large"), this.code = "animatedTooLarge", this.bytes = e;
	}
}, Ol = (e, t, n) => {
	if (t + n.length > e.length) return !1;
	for (let r = 0; r < n.length; r += 1) if (e[t + r] !== n.charCodeAt(r)) return !1;
	return !0;
};
function kl(e) {
	if (!Ol(e, 0, "GIF87a") && !Ol(e, 0, "GIF89a") || e.length < 13) return !1;
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
function Al(e) {
	return !Ol(e, 0, "RIFF") || !Ol(e, 8, "WEBP") ? !1 : Ol(e, 12, "VP8X") && e.length > 20 && !!(e[20] & 2);
}
function jl(e) {
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
		if (Ol(e, t + 4, "acTL")) return !0;
		if (Ol(e, t + 4, "IDAT") || Ol(e, t + 4, "IEND")) return !1;
		t += 12 + n;
	}
	return !1;
}
function Ml(e) {
	return e instanceof Uint8Array ? kl(e) ? "gif" : Al(e) ? "webp" : jl(e) ? "png" : null : null;
}
async function Nl(e) {
	if (!/^image\/(?:gif|webp|png|apng)$/i.test(e.type || "") && !/\.(?:gif|webp|a?png)$/i.test(e.name || "")) return null;
	if (e.size > 4e6) {
		let t = new Uint8Array(await e.slice(0, Tl).arrayBuffer());
		if (Ml(t) || El(t)) throw new Dl(e.size);
		return null;
	}
	let t = new Uint8Array(await e.arrayBuffer()), n = Ml(t);
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
async function Pl(e, t = bl, { still: n = !1 } = {}) {
	if (Il(e)) return Ll(await e.text());
	let r = n ? null : await Nl(e);
	if (r) return r;
	let i = await createImageBitmap(e), a = Math.min(1, t / Math.max(i.width, i.height)), o = Math.round(i.width * a), s = Math.round(i.height * a), c = document.createElement("canvas");
	c.width = o, c.height = s, c.getContext("2d").drawImage(i, 0, 0, o, s), i.close();
	let l = (e) => new Promise((t) => c.toBlob(t, "image/webp", e)), u = await l(xl);
	return u.size > 4e5 && (u = await l(Sl)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(u);
		}),
		bytes: u.size,
		width: o,
		height: s
	};
}
var Fl = "image/svg+xml";
function Il(e) {
	return e.type === Fl || /\.svg$/i.test(e.name || "");
}
function Ll(e) {
	let t = String(e ?? "");
	if (!/<svg[\s>]/i.test(t)) throw Error("Invalid SVG");
	if (/<\s*script[\s>]/i.test(t) || /<\s*foreignObject[\s>]/i.test(t) || /\son[a-z]+\s*=/i.test(t) || /javascript:/i.test(t)) throw Error("The SVG contains scripts or event handlers and cannot be used");
	let n = new Blob([t]).size, r = `data:${Fl};base64,${btoa(unescape(encodeURIComponent(t)))}`, i = t.match(/<svg\b[^>]*>/i)?.[0] ?? "", a = i.match(/viewBox\s*=\s*["']\s*([-\d.]+(?:[\s,]+[-\d.]+){3})\s*["']/i)?.[1]?.split(/[\s,]+/).map(Number);
	return {
		dataUrl: r,
		bytes: n,
		width: a?.length === 4 ? a[2] : Number.parseFloat(i.match(/\bwidth\s*=\s*["']?([\d.]+)/i)?.[1]) || 0,
		height: a?.length === 4 ? a[3] : Number.parseFloat(i.match(/\bheight\s*=\s*["']?([\d.]+)/i)?.[1]) || 0
	};
}
function Rl(e, t, n = .04) {
	let r = String(e ?? "");
	if (!t || !(t.width > 0) || !(t.height > 0)) return r;
	let i = r.match(/<svg\b[^>]*>/i)?.[0];
	if (!i) return r;
	let a = (e) => Math.round(e * 1e3) / 1e3, o = Math.max(t.width, t.height) * Math.max(0, n), s = a(t.x - o), c = a(t.y - o), l = a(t.width + 2 * o), u = a(t.height + 2 * o), d = i.replace(/\sviewBox\s*=\s*["'][^"']*["']/i, "").replace(/\swidth\s*=\s*["'][^"']*["']/i, "").replace(/\sheight\s*=\s*["'][^"']*["']/i, "").replace(/<svg\b/i, `<svg viewBox="${s} ${c} ${l} ${u}" width="${l}" height="${u}"`);
	return r.replace(i, d);
}
function zl(e) {
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
function Bl(e) {
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
function Vl(e, t = "image") {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || t;
}
function Hl(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region src/menu/families/Image.svelte
var Ul = /* @__PURE__ */ B("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <label> <input/></label>", 1), Wl = /* @__PURE__ */ B("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), Gl = /* @__PURE__ */ B("<label> <input/></label> <!>", 1), Kl = /* @__PURE__ */ B("<!> <!>", 1), ql = /* @__PURE__ */ B("<div class=\"pin-line\"><label> <!></label> <!></div> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.01\"/> <button type=\"button\" class=\"linkish\"> </button>", 1), Jl = /* @__PURE__ */ B("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.01\"/>", 1), Yl = /* @__PURE__ */ B("<div class=\"pin-line\"><label> <!></label> <!></div>"), Xl = /* @__PURE__ */ B("<!> <!> <!>", 1);
function Zl(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, setBlockProps: o, openImageEditor: s, compressOrTrim: c, imageErrorText: l, setStatus: u } = n, { groupReset: d, groupChanged: f } = ul(() => R(r).props, o);
	async function p(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await c(t);
			i(`edit:${R(r).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || Vl(t.name).replaceAll("-", " ");
			});
		} catch (e) {
			u(l(e), "error");
		}
	}
	var m = Vr(), h = P(m), g = (e) => {
		let t = (e) => {
			var t = Ul(), n = P(t), i = N(n), o = I(i);
			O(n);
			var s = I(n, 2), c = N(s), l = I(c);
			G(l), O(s), L((e, t, n) => {
				H(i, `${e ?? ""} `), H(c, `${t ?? ""} `), K(l, R(r).props.alt ?? ""), J(l, "placeholder", n);
			}, [
				() => Y("ui.changeImage"),
				() => Y("lbl.description"),
				() => Y("ph.altText")
			]), z("change", o, p), z("change", l, (e) => a("alt", e.target.value)), V(e, t);
		}, n = (e) => {
			var t = Gl(), n = P(t), i = N(n), o = I(i);
			G(o), O(n);
			var s = I(n, 2), c = (e) => {
				var t = Wl(), n = N(t);
				G(n);
				var i = I(n);
				O(t), L((e, r, a) => {
					J(t, "title", e), q(n, r), H(i, ` ${a ?? ""}`);
				}, [
					() => Y("tip.lightbox"),
					() => !!R(r).props.lightbox,
					() => Y("lbl.lightbox")
				]), z("change", n, (e) => a("lightbox", e.target.checked)), V(e, t);
			};
			U(s, (e) => {
				R(r).props.href || e(c);
			}), L((e, t) => {
				H(i, `${e ?? ""} `), K(o, R(r).props.href ?? ""), J(o, "placeholder", t);
			}, [() => Y("lbl.link"), () => Y("ph.optionalImageLink")]), z("change", o, (e) => a("href", e.target.value || null)), V(e, t);
		};
		var i = Kl(), o = P(i);
		{
			let e = /* @__PURE__ */ A(() => Y("blocks.image")), n = /* @__PURE__ */ A(() => R(r).props.alt || Y("menu.noAlt"));
			Wc(o, {
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
			let e = /* @__PURE__ */ A(() => Y("group.linkClick")), t = /* @__PURE__ */ A(() => R(r).props.href || (R(r).props.lightbox ? Y("menu.lightboxShort") : Y("common.none"))), i = /* @__PURE__ */ A(() => d("img-link", {
				href: null,
				lightbox: !1
			}));
			Wc(s, {
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
			var t = ql(), n = P(t), i = N(n), o = N(i), c = I(o);
			{
				let e = /* @__PURE__ */ A(() => R(r).props.fit ?? "cover"), t = /* @__PURE__ */ A(() => [["cover", Y("opt.fitFrame.cover")], ["contain", Y("opt.fitFrame.contain")]]);
				Ao(c, {
					get value() {
						return R(e);
					},
					get options() {
						return R(t);
					},
					onchange: (e) => a("fit", e)
				});
			}
			O(i), Mo(I(i, 2), { id: "imgFit" }), O(n);
			var l = I(n, 2), u = N(l), d = F(I(u));
			O(l);
			var f = I(l, 2);
			G(f);
			var p = I(f, 2), m = N(p), h = F(I(m));
			O(p);
			var g = I(p, 2);
			G(g);
			var _ = I(g, 2), v = N(_), y = F(I(v));
			O(_);
			var b = I(_, 2);
			G(b);
			var x = I(b, 2), S = F(x, !0);
			L((e, t, n, i, a, s, c, l, p) => {
				H(o, `${e ?? ""} `), H(u, `${t ?? ""} `), H(d, `${n ?? ""}%`), K(f, R(r).props.x ?? .5), H(m, `${i ?? ""} `), H(h, `${a ?? ""}%`), K(g, R(r).props.y ?? .5), J(_, "title", s), H(v, `${c ?? ""} `), H(y, `${l ?? ""}x`), K(b, R(r).props.zoom ?? 1), H(S, p);
			}, [
				() => Y("lbl.imageFit"),
				() => Y("lbl.focusX"),
				() => Math.round((R(r).props.x ?? .5) * 100),
				() => Y("lbl.focusY"),
				() => Math.round((R(r).props.y ?? .5) * 100),
				() => Y("tip.zoomCrop"),
				() => Y("lbl.zoom"),
				() => (R(r).props.zoom ?? 1).toFixed(2),
				() => Y("ui.openImageEditor")
			]), z("input", f, (e) => a("x", Number(e.target.value))), z("input", g, (e) => a("y", Number(e.target.value))), z("input", b, (e) => a("zoom", Number(e.target.value))), z("click", x, s), V(e, t);
		}, n = (e) => {
			var t = Jl(), n = P(t), i = N(n), o = F(I(i));
			O(n);
			var s = I(n, 2);
			G(s);
			var c = I(s, 2), l = N(c), u = F(I(l));
			O(c);
			var d = I(c, 2);
			G(d);
			var f = I(d, 2), p = N(f), m = F(I(p));
			O(f);
			var h = I(f, 2);
			G(h), L((e, t, n, a, c, f) => {
				H(i, `${e ?? ""} `), H(o, `${t ?? ""}%`), K(s, R(r).props.brightness ?? 1), H(l, `${n ?? ""} `), H(u, `${a ?? ""}%`), K(d, R(r).props.contrast ?? 1), H(p, `${c ?? ""} `), H(m, `${f ?? ""}%`), K(h, R(r).props.saturate ?? 1);
			}, [
				() => Y("lbl.brightness"),
				() => Math.round((R(r).props.brightness ?? 1) * 100),
				() => Y("lbl.contrast"),
				() => Math.round((R(r).props.contrast ?? 1) * 100),
				() => Y("lbl.saturate"),
				() => Math.round((R(r).props.saturate ?? 1) * 100)
			]), z("input", s, (e) => a("brightness", Number(e.target.value))), z("input", d, (e) => a("contrast", Number(e.target.value))), z("input", h, (e) => a("saturate", Number(e.target.value))), V(e, t);
		}, i = (e) => {
			var t = Yl(), n = N(t), i = N(n), o = I(i);
			{
				let e = /* @__PURE__ */ A(() => R(r).props.radius ?? ""), t = /* @__PURE__ */ A(() => [
					["", Y("common.none")],
					["sm", Y("opt.size.sm")],
					["md", Y("opt.radius.md")]
				]);
				Ao(o, {
					get value() {
						return R(e);
					},
					get options() {
						return R(t);
					},
					onchange: (e) => a("radius", e || null)
				});
			}
			O(n), Mo(I(n, 2), { id: "radius" }), O(t), L((e) => H(i, `${e ?? ""} `), [() => Y("lbl.radius")]), V(e, t);
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
		var l = Xl(), u = P(l);
		{
			let e = /* @__PURE__ */ A(() => Y("group.crop")), n = /* @__PURE__ */ A(() => R(o) ? Y("menu.changed", { n: R(o) }) : Y("menu.standard")), r = /* @__PURE__ */ A(() => d("img-crop", {
				fit: "cover",
				x: .5,
				y: .5,
				zoom: 1
			}));
			Wc(u, {
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
			let e = /* @__PURE__ */ A(() => Y("group.filters")), t = /* @__PURE__ */ A(() => R(c) ? Y("menu.changed", { n: R(c) }) : Y("menu.standard")), r = /* @__PURE__ */ A(() => d("img-filters", {
				brightness: 1,
				contrast: 1,
				saturate: 1
			}));
			Wc(p, {
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
			let e = /* @__PURE__ */ A(() => Y("group.corners")), t = /* @__PURE__ */ A(() => ({
				"": Y("common.none"),
				sm: Y("opt.size.sm"),
				md: Y("opt.radius.md")
			})[R(r).props.radius ?? ""]), n = /* @__PURE__ */ A(() => d("img-corners", { radius: "md" }));
			Wc(m, {
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
var Ql = /* @__PURE__ */ B("<button type=\"button\"> </button>"), $l = /* @__PURE__ */ B("<div><span class=\"choice-label svelte-1ehof1c\"> </span> <div class=\"choice-seg svelte-1ehof1c\" role=\"group\"></div></div>");
function eu(e, t) {
	$e(t, !0);
	let n = Ki(t, "title", 3, void 0), r = /* @__PURE__ */ A(() => t.options.length > 3 || t.options.reduce((e, [, t]) => e + `${t}`.length, 0) > 14), i = (e) => `${e ?? ""}`;
	var a = $l();
	let o;
	var s = N(a), c = F(s, !0), l = I(s, 2);
	ni(l, 21, () => t.options, ([e, t]) => i(e), (e, n) => {
		var r = /* @__PURE__ */ A(() => h(R(n), 2));
		let a = () => R(r)[0], o = () => R(r)[1];
		var s = Ql();
		let c;
		var l = F(s, !0);
		L((e, t) => {
			J(s, "aria-pressed", e), c = Ei(s, 1, "svelte-1ehof1c", null, c, { on: t }), H(l, o());
		}, [() => i(a()) === i(t.value), () => i(a()) === i(t.value)]), z("click", s, () => t.onchange(a())), V(e, s);
	}), O(l), O(a), L(() => {
		o = Ei(a, 1, "choice svelte-1ehof1c", null, o, { stacked: R(r) }), J(a, "title", n()), H(c, t.label), J(l, "aria-label", t.label);
	}), V(e, a), et();
}
Mr(["click"]);
//#endregion
//#region src/menu/families/Video.svelte
var tu = /* @__PURE__ */ B("<label> </label> <input/>", 1), nu = /* @__PURE__ */ B("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"video/mp4,video/webm\"/></label> <label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label>", 1), ru = /* @__PURE__ */ B("<div class=\"pin-line\"><!> <!></div> <!>", 1), iu = /* @__PURE__ */ B("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), au = /* @__PURE__ */ B("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!>", 1), ou = /* @__PURE__ */ B("<label> <input/></label>"), su = /* @__PURE__ */ B("<!> <!> <!>", 1);
function cu(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), { setBlockProp: i, setBlockProps: a, setBlockVideoFile: o, setBlockVideoPoster: s } = n, { groupReset: c, groupChanged: l } = ul(() => R(r).props, a);
	var u = Vr(), d = P(u), f = (e) => {
		let t = (e) => {
			var t = ru(), n = P(t), a = N(n);
			{
				let e = /* @__PURE__ */ A(() => Y("lbl.videoSource")), t = /* @__PURE__ */ A(() => [["embed", Y("opt.videoSource.embed")], ["file", Y("opt.videoSource.file")]]);
				eu(a, {
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
			Mo(I(a, 2), { id: "videoSource" }), O(n);
			var c = I(n, 2), l = (e) => {
				var t = tu(), n = P(t), a = F(n, !0), o = I(n, 2);
				G(o), L((e, t, i) => {
					J(n, "title", e), H(a, t), K(o, R(r).props.url ?? ""), J(o, "placeholder", i);
				}, [
					() => Y("hint.video"),
					() => Y("lbl.videoUrl"),
					() => Y("ph.videoUrl")
				]), z("change", o, (e) => i("url", e.target.value)), V(e, t);
			}, d = (e) => {
				var t = nu(), n = P(t), i = N(n), a = I(i);
				O(n);
				var c = I(n, 2), l = N(c), u = I(l);
				O(c), L((e, t, r, a) => {
					J(n, "title", e), H(i, `${t ?? ""} `), J(c, "title", r), H(l, `${a ?? ""} `);
				}, [
					() => Y("tip.video.file"),
					() => R(r).props.src ? Y("ui.changeVideo") : Y("ui.chooseVideo"),
					() => Y("tip.bg.poster"),
					() => R(r).props.poster ? Y("ui.changeImage") : Y("ui.choosePoster")
				]), z("change", a, o), z("change", u, s), V(e, t);
			};
			U(c, (e) => {
				R(u) === "embed" ? e(l) : e(d, -1);
			}), V(e, t);
		}, n = (e) => {
			var t = au(), n = P(t), o = N(n);
			G(o);
			var s = I(o);
			O(n);
			var c = I(n, 2), l = N(c);
			G(l);
			var u = I(l);
			O(c);
			var d = I(c, 2), f = (e) => {
				var t = iu(), n = N(t);
				G(n);
				var a = I(n);
				O(t), L((e, i) => {
					J(t, "title", e), q(n, R(r).props.autoplay === !0), H(a, ` ${i ?? ""}`);
				}, [() => Y("tip.video.autoplay"), () => Y("lbl.videoAutoplay")]), z("change", n, (e) => i("autoplay", e.target.checked)), V(e, t);
			};
			U(d, (e) => {
				R(r).props.muted === !0 && e(f);
			}), L((e, t) => {
				q(o, R(r).props.loop === !0), H(s, ` ${e ?? ""}`), q(l, R(r).props.muted === !0), H(u, ` ${t ?? ""}`);
			}, [() => Y("lbl.videoLoop"), () => Y("lbl.videoMuted")]), z("change", o, (e) => i("loop", e.target.checked)), z("change", l, (e) => a("muted", e.target.checked ? { muted: !0 } : {
				muted: !1,
				autoplay: !1
			})), V(e, t);
		}, l = (e) => {
			var t = ou(), n = N(t), a = I(n);
			G(a), O(t), L((e) => {
				H(n, `${e ?? ""} `), K(a, R(r).props.title ?? "");
			}, [() => Y("lbl.videoTitle")]), z("change", a, (e) => i("title", e.target.value)), V(e, t);
		}, u = /* @__PURE__ */ A(() => R(r).props.source === "file" ? "file" : "embed");
		var d = su(), f = P(d);
		{
			let e = /* @__PURE__ */ A(() => Y("lbl.videoSource")), n = /* @__PURE__ */ A(() => R(u) === "file" ? Y("opt.videoSource.file") : Y("opt.videoSource.embed"));
			Wc(f, {
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
				let r = /* @__PURE__ */ A(() => Y("group.playback")), i = /* @__PURE__ */ A(() => R(t) ? Y("menu.onCount", { n: R(t) }) : Y("common.off")), a = /* @__PURE__ */ A(() => c("video-play", {
					loop: !1,
					muted: !1,
					autoplay: !1
				}));
				Wc(e, {
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
			let e = /* @__PURE__ */ A(() => Y("group.accessibility")), t = /* @__PURE__ */ A(() => R(r).props.title || Y("menu.noTitle"));
			Wc(h, {
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
//#region ../template/assets/engine/0.7.4/glyphs.js
var lu = "urd-recent-glyphs", uu = "urd-recent-icons", du = [
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
function fu(e, t) {
	return [t, ...(Array.isArray(e) ? e : []).filter((e) => e !== t)].slice(0, 16);
}
var pu = (e) => {
	try {
		let t = JSON.parse(localStorage.getItem(e) ?? "[]");
		return Array.isArray(t) ? t : [];
	} catch {
		return [];
	}
}, mu = (e, t, n) => {
	let r = fu(t, n);
	try {
		localStorage.setItem(e, JSON.stringify(r));
	} catch {}
	return r;
};
function hu() {
	return pu(lu);
}
function gu(e) {
	return mu(lu, hu(), e);
}
function _u() {
	return pu(uu);
}
function vu(e) {
	return mu(uu, _u(), e);
}
//#endregion
//#region ../template/assets/engine/0.7.4/icons.js
var yu = "fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"", bu = "fill=\"currentColor\" stroke=\"none\"", xu = {
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
}, Su = [
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
function Cu(e) {
	let t = typeof e == "string" ? xu[e] : null;
	return t ? `<svg viewBox="0 0 24 24" width="100%" height="100%" ${t.fill ? bu : yu} aria-hidden="true" focusable="false">${t.body}</svg>` : null;
}
//#endregion
//#region src/lib/GlyphPicker.svelte
var wu = /* @__PURE__ */ B("<button type=\"button\"><span class=\"gp-svg svelte-15ln1c3\"></span></button>"), Tu = /* @__PURE__ */ B("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), Eu = /* @__PURE__ */ B("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"><!> <!></div>", 1), Du = /* @__PURE__ */ B("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), Ou = /* @__PURE__ */ B("<button type=\"button\"> </button>"), ku = /* @__PURE__ */ B("<div class=\"gp-group svelte-15ln1c3\"> </div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\"> </button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\"> </p>", 1), Au = /* @__PURE__ */ B("<!> <!> <!> <!>", 1), ju = /* @__PURE__ */ B("<img class=\"gp-own svelte-15ln1c3\"/>"), Mu = /* @__PURE__ */ B("<span class=\"gp-svg svelte-15ln1c3\"></span>"), Nu = /* @__PURE__ */ B("<div class=\"gp-pop gp-anchored svelte-15ln1c3\" popover=\"auto\"><!></div>"), Pu = /* @__PURE__ */ B("<div class=\"gp-pop svelte-15ln1c3\"><!></div>"), Fu = /* @__PURE__ */ B("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"><!></button> <!></span>");
function Iu(e, t) {
	$e(t, !0);
	let n = (e) => {
		var n = Au(), a = P(n), o = (e) => {
			var t = Eu(), n = P(t), r = F(n, !0), a = I(n, 2), o = N(a);
			ni(o, 16, () => R(d), (e) => e, (e, t) => {
				var n = wu();
				let r;
				var a = N(n);
				W(a, () => Cu(t), !0), O(a), O(n), L((e) => {
					r = Ei(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, r, { active: t === i() }), J(n, "title", e);
				}, [() => Y(xu[t].labelKey)]), z("click", n, () => C(t)), V(e, n);
			}), ni(I(o, 2), 16, () => R(u), (e) => e, (e, t) => {
				var n = Tu(), r = F(n, !0);
				L(() => H(r, t)), z("click", n, () => S(t)), V(e, n);
			}), O(a), L((e) => H(r, e), [() => Y("common.recent")]), V(e, t);
		};
		U(a, (e) => {
			(R(u).length || R(d).length) && e(o);
		});
		var s = I(a, 2), c = (e) => {
			var t = Vr();
			ni(P(t), 17, () => Su, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ A(() => h(R(t), 2));
				let r = () => R(n)[0], a = () => R(n)[1];
				var o = Du(), s = P(o), c = F(s, !0), l = I(s, 2);
				ni(l, 20, a, (e) => e, (e, t) => {
					var n = wu();
					let r;
					var a = N(n);
					W(a, () => Cu(t), !0), O(a), O(n), L((e) => {
						r = Ei(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, r, { active: t === i() }), J(n, "title", e);
					}, [() => Y(xu[t].labelKey)]), z("click", n, () => C(t)), V(e, n);
				}), O(l), L((e) => H(c, e), [() => Y(r())]), V(e, o);
			}), V(e, t);
		};
		U(s, (e) => {
			t.onicon && e(c);
		});
		var l = I(s, 2);
		ni(l, 17, () => du, ([e, t]) => e, (e, t) => {
			var n = /* @__PURE__ */ A(() => h(R(t), 2));
			let i = () => R(n)[0], a = () => R(n)[1];
			var o = Du(), s = P(o), c = F(s, !0), l = I(s, 2);
			ni(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var n = Ou();
				let i;
				var a = F(n, !0);
				L(() => {
					i = Ei(n, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === r() }), H(a, t);
				}), z("click", n, () => S(t)), V(e, n);
			}), O(l), L((e) => H(c, e), [() => Y(i())]), V(e, o);
		});
		var f = I(l, 2), p = (e) => {
			var t = ku(), n = P(t), r = F(n, !0), i = I(n, 2), a = F(i, !0), o = I(i, 2);
			Hi(o, (e) => M(m, e), () => R(m));
			var s = F(I(o, 2), !0);
			L((e, t, n) => {
				H(r, e), H(a, t), H(s, n);
			}, [
				() => Y("gp.ownIcon"),
				() => Y("gp.upload"),
				() => Y("gp.uploadHint")
			]), z("click", i, () => R(m).click()), z("change", o, w), V(e, t);
		};
		U(f, (e) => {
			t.onimage && e(p);
		}), V(e, n);
	}, r = Ki(t, "value", 3, "★"), i = Ki(t, "icon", 3, null), a = Ki(t, "image", 3, null), o = Ki(t, "label", 19, () => Y("gp.pickGlyph")), s = ga(), c = va("urd-gp"), l = c.slice(2), u = /* @__PURE__ */ j(sn([])), d = /* @__PURE__ */ j(sn([])), f = /* @__PURE__ */ j(null), p = /* @__PURE__ */ j(null), m = /* @__PURE__ */ j(null), g = /* @__PURE__ */ j(!1), _ = /* @__PURE__ */ j(sn({
		top: 0,
		left: 0
	}));
	function v() {
		M(u, hu(), !0), M(d, t.onicon ? _u().filter((e) => xu[e]) : [], !0);
	}
	function y(e) {
		M(g, e.newState === "open"), ya(R(f), R(g)), R(g) && v();
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
		gu(e), t.onpick?.(e), b();
	}
	function C(e) {
		vu(e), t.onicon?.(e), b();
	}
	async function w(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", n) {
			try {
				let e = await Pl(n, 256, { still: !0 });
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
	var T = Fu(), E = N(T), ee = N(E), te = (e) => {
		var t = ju();
		L((e) => {
			J(t, "src", a()), J(t, "alt", e);
		}, [() => Y("gp.ownIcon")]), V(e, t);
	}, ne = (e) => {
		var t = Mu();
		W(t, () => Cu(i()), !0), O(t), V(e, t);
	}, re = (e) => {
		var t = Br();
		L(() => H(t, r() || "★")), V(e, t);
	};
	U(ee, (e) => {
		a() ? e(te) : i() && xu[i()] ? e(ne, 1) : e(re, -1);
	}), O(E);
	var ie = I(E, 2), ae = (e) => {
		var t = Nu(), r = N(t), i = (e) => {
			n(e);
		};
		U(r, (e) => {
			R(g) && e(i);
		}), O(t), Hi(t, (e) => M(p, e), () => R(p)), L(() => {
			J(t, "id", l), Oi(t, `position-anchor: ${c ?? ""}`);
		}), jr("toggle", t, y), V(e, t);
	}, oe = (e) => {
		var t = Pu(), r = N(t);
		n(r), O(t), L(() => Oi(t, `top: ${R(_).top ?? ""}px; left: ${R(_).left ?? ""}px`)), V(e, t);
	};
	U(ie, (e) => {
		s ? e(ae) : R(g) && e(oe, 1);
	}), O(T), Hi(T, (e) => M(f, e), () => R(f)), L(() => {
		J(E, "title", o()), J(E, "aria-label", o()), J(E, "popovertarget", s ? l : void 0), Oi(E, s ? `anchor-name: ${c}` : void 0);
	}), z("click", E, function(...e) {
		(s ? void 0 : () => R(g) ? M(g, !1) : x())?.apply(this, e);
	}), V(e, T), et();
}
Mr(["click", "change"]);
//#endregion
//#region src/menu/families/Icon.svelte
var Lu = /* @__PURE__ */ B("<input class=\"token-input\" maxlength=\"4\"/>"), Ru = /* @__PURE__ */ B("<button class=\"ghost\"> </button>"), zu = /* @__PURE__ */ B("<span class=\"toolbar-row\"><img class=\"site-icon-preview\"/> <button class=\"ghost\"> </button></span>"), Bu = /* @__PURE__ */ B("<label> <span class=\"toolbar-row\"><!> <!></span></label> <!>", 1), Vu = /* @__PURE__ */ B("<div class=\"pin-line\"><label> <input type=\"number\" min=\"8\" max=\"400\"/></label> <!></div> <div class=\"pin-line\"><label> <!></label> <!></div>", 1);
function Hu(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, setBlockProps: o, themeSwatches: s } = n, { groupReset: c, groupChanged: l } = ul(() => R(r).props, o);
	var u = Vr(), d = P(u), f = (e) => {
		let t = (e) => {
			var t = Bu(), n = P(t), o = N(n), s = I(o), c = N(s);
			{
				let e = /* @__PURE__ */ A(() => R(r).props.glyph ?? "★"), t = /* @__PURE__ */ A(() => R(r).props.icon ?? null), n = /* @__PURE__ */ A(() => R(r).props.image ?? null);
				Iu(c, {
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
				var t = Lu();
				G(t), L((e) => {
					K(t, R(r).props.glyph ?? ""), J(t, "title", e);
				}, [() => Y("tip.icon.typeGlyph")]), z("change", t, (e) => a("glyph", e.target.value || "★")), V(e, t);
			}, d = (e) => {
				var t = Ru(), n = F(t, !0);
				L((e, r) => {
					J(t, "title", e), H(n, r);
				}, [() => Y("tip.icon.backToGlyph"), () => Y("ui.removeDrawnIcon")]), z("click", t, () => a("icon", null)), V(e, t);
			};
			U(l, (e) => {
				R(r).props.icon ? e(d, -1) : e(u);
			}), O(s), O(n);
			var f = I(n, 2), p = (e) => {
				var t = zu(), n = N(t), i = I(n, 2), o = F(i, !0);
				O(t), L((e, i, a) => {
					J(t, "title", e), J(n, "src", R(r).props.image), J(n, "alt", i), H(o, a);
				}, [
					() => Y("hint.icon.ownImage"),
					() => Y("gp.ownIcon"),
					() => Y("ui.removeOwnIcon")
				]), z("click", i, () => a("image", null)), V(e, t);
			};
			U(f, (e) => {
				R(r).props.image && e(p);
			}), L((e) => H(o, `${e ?? ""} `), [() => Y("blocks.icon")]), V(e, t);
		};
		{
			let n = /* @__PURE__ */ A(() => Y("blocks.icon")), i = /* @__PURE__ */ A(() => R(r).props.image ? Y("gp.ownIcon") : R(r).props.icon ? Y("menu.drawnIcon") : R(r).props.glyph ?? "★");
			Wc(e, {
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
			var t = Vu(), n = P(t), i = N(n), o = N(i), c = I(o);
			G(c), O(i), Mo(I(i, 2), { id: "iconSize" }), O(n);
			var l = I(n, 2), u = N(l), d = N(u), f = I(d);
			{
				let e = /* @__PURE__ */ A(() => R(r).props.color ?? "accent"), t = /* @__PURE__ */ A(s);
				Na(f, {
					get value() {
						return R(e);
					},
					get tokens() {
						return R(t);
					},
					onchange: (e) => a("color", e)
				});
			}
			O(u), Mo(I(u, 2), { id: "iconColor" }), O(l), L((e, t, n) => {
				H(o, `${e ?? ""} `), K(c, R(r).props.size ?? 48), J(u, "title", t), H(d, `${n ?? ""} `);
			}, [
				() => Y("lbl.sizePx"),
				() => Y("hint.icon.color"),
				() => Y("lbl.color")
			]), z("change", c, (e) => a("size", Number(e.target.value))), V(e, t);
		};
		{
			let n = /* @__PURE__ */ A(() => Y("group.appearance")), i = /* @__PURE__ */ A(() => `${R(r).props.size ?? 48} px`), a = /* @__PURE__ */ A(() => c("icon-look", {
				size: 48,
				color: "accent"
			}));
			Wc(e, {
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
var Uu = /* @__PURE__ */ B("<label> <input/></label>"), Wu = /* @__PURE__ */ B("<label> <!></label> <!>", 1), Gu = /* @__PURE__ */ B("<div class=\"pin-line\"><label> <!></label> <!></div> <div class=\"pin-line\"><label> <input type=\"number\" min=\"1\" max=\"40\"/></label> <!></div> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), Ku = /* @__PURE__ */ B("<label> <input type=\"number\" min=\"4\" step=\"1\"/></label>"), qu = /* @__PURE__ */ B("<label> <input type=\"number\" min=\"1\" step=\"0.5\"/></label>"), Ju = /* @__PURE__ */ B("<!> <!>", 1);
function Yu(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), { setBlockProp: i, setBlockProps: a, setBlockFrame: o, designWidth: s, shapePx: c, setShapeSizePx: l } = n, { groupReset: u, groupChanged: d } = ul(() => R(r).props, a);
	var f = Vr(), p = P(f), m = (e) => {
		let t = (e) => {
			var t = Wu(), n = P(t), a = N(n), o = I(a);
			{
				let e = /* @__PURE__ */ A(bo);
				Ao(o, {
					get value() {
						return R(r).props.kind;
					},
					get options() {
						return R(e);
					},
					onchange: (e) => i("kind", e)
				});
			}
			O(n);
			var s = I(n, 2), c = (e) => {
				var t = Uu(), n = N(t), a = I(n);
				G(a), O(t), L((e, i) => {
					J(t, "title", e), H(n, `${i ?? ""} `), K(a, R(r).props.label ?? "");
				}, [() => Y("tip.shape.label"), () => Y("lbl.shapeLabel")]), z("change", a, (e) => i("label", e.target.value.trim() || void 0)), V(e, t);
			};
			U(s, (e) => {
				R(r).props.kind === "line" && e(c);
			}), L((e) => H(a, `${e ?? ""} `), [() => Y("blocks.shape")]), V(e, t);
		};
		{
			let n = /* @__PURE__ */ A(() => Y("blocks.shape")), i = /* @__PURE__ */ A(() => bo().find(([e]) => e === R(r).props.kind)?.[1] ?? "");
			Wc(e, {
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
			var t = Gu(), n = P(t), a = N(n), o = N(a), s = I(o);
			{
				let e = /* @__PURE__ */ A(xo);
				Ao(s, {
					get value() {
						return R(r).props.color;
					},
					get options() {
						return R(e);
					},
					onchange: (e) => i("color", e)
				});
			}
			O(a), Mo(I(a, 2), { id: "shapeColor" }), O(n);
			var c = I(n, 2), l = N(c), u = N(l), d = I(u);
			G(d), O(l), Mo(I(l, 2), { id: "thickness" }), O(c);
			var f = I(c, 2), p = N(f);
			G(p);
			var m = I(p);
			O(f), L((e, t, n, i, a) => {
				H(o, `${e ?? ""} `), H(u, `${t ?? ""} `), K(d, R(r).props.thickness), J(f, "title", n), q(p, i), H(m, ` ${a ?? ""}`);
			}, [
				() => Y("lbl.color"),
				() => Y("lbl.thickness"),
				() => Y("tip.shape.fill"),
				() => !!R(r).props.fill,
				() => Y("lbl.filled")
			]), z("change", d, (e) => i("thickness", Number(e.target.value))), z("change", p, (e) => i("fill", e.target.checked ? R(r).props.color : null)), V(e, t);
		}, n = (e) => {
			var t = Vr(), n = P(t), i = (e) => {
				var t = Ku(), n = N(t), i = I(n);
				G(i), O(t), L((e, r, a, o) => {
					J(t, "title", e), H(n, `${r ?? ""} `), J(i, "max", a), K(i, o);
				}, [
					() => Y("tip.shapeSize"),
					() => Y("lbl.length"),
					() => c(100 - R(r).frame.x),
					() => c(R(r).frame.w)
				]), z("change", i, (e) => l(Number(e.target.value), !1)), V(e, t);
			}, a = /* @__PURE__ */ A(() => (R(r).props.kind === "line" || R(r).props.kind === "arrow") && s()), u = (e) => {
				var t = qu(), n = N(t), i = I(n);
				G(i), O(t), L((e, t) => {
					H(n, `${e ?? ""} `), J(i, "max", t), K(i, R(r).frame.w);
				}, [() => Y("lbl.length"), () => Math.max(1, Math.round(100 - R(r).frame.x))]), z("change", i, (e) => o("w", Math.max(1, Math.min(Number(e.target.value), 100 - R(r).frame.x)))), V(e, t);
			}, d = (e) => {
				var t = Ku(), n = N(t), i = I(n);
				G(i), O(t), L((e, r, a, o) => {
					J(t, "title", e), H(n, `${r ?? ""} `), J(i, "max", a), K(i, o);
				}, [
					() => Y("tip.shapeSize"),
					() => Y("lbl.sizePx"),
					() => c(100 - R(r).frame.x),
					() => c(R(r).frame.w)
				]), z("change", i, (e) => l(Number(e.target.value), !0)), V(e, t);
			};
			U(n, (e) => {
				R(a) ? e(i) : R(r).props.kind === "line" || R(r).props.kind === "arrow" ? e(u, 1) : e(d, -1);
			}), V(e, t);
		}, a = /* @__PURE__ */ A(() => R(r).props.kind === "line" || R(r).props.kind === "arrow");
		var d = Ju(), f = P(d);
		{
			let e = /* @__PURE__ */ A(() => Y("group.strokeFill")), n = /* @__PURE__ */ A(() => `${xo().find(([e]) => e === R(r).props.color)?.[1] ?? ""} · ${R(r).props.thickness ?? 2} px`), i = /* @__PURE__ */ A(() => u("shape-stroke", {
				color: "accent",
				thickness: 2,
				fill: null
			}));
			Wc(f, {
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
				let t = /* @__PURE__ */ A(() => Y("group.measures")), i = /* @__PURE__ */ A(() => s() ? `${c(R(r).frame.w)} px` : `${R(r).frame.w} %`);
				Wc(e, {
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
var Xu = /* @__PURE__ */ B("<div class=\"bg-layer\"><span class=\"toolbar-row\"><img class=\"site-icon-preview\" alt=\"\"/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span> <label> <input/></label> <label> <input/></label></div>"), Zu = /* @__PURE__ */ B("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\" multiple=\"\"/></label> <!>", 1), Qu = /* @__PURE__ */ B("<div class=\"pin-line\"><label> <input type=\"number\" min=\"1\" max=\"6\"/></label> <!></div> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\"/>", 1), $u = /* @__PURE__ */ B("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" step=\"10\"/> <span class=\"gridmenu-value\"> </span></div> <button type=\"button\" class=\"ghost action\"><!> </button>", 1), ed = /* @__PURE__ */ B("<button type=\"button\" class=\"ghost action\"><!> </button>"), td = /* @__PURE__ */ B("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div> <!> <label> <!></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), nd = /* @__PURE__ */ B("<label> <input type=\"number\" min=\"2\" max=\"60\"/></label>"), rd = /* @__PURE__ */ B("<div class=\"pin-line\"><label> <!></label> <!></div> <!> <!> <!> <!> <!>", 1), id = /* @__PURE__ */ B("<!> <!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"10\" max=\"300\" step=\"5\"/> <span class=\"gridmenu-value\"> </span></div> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"60\" max=\"800\" step=\"10\"/> <span class=\"gridmenu-value\"> </span></div> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\"/> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), ad = /* @__PURE__ */ B("<label> <!></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), od = /* @__PURE__ */ B("<!> <!> <!>", 1);
function sd(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), { setBlockProp: i, setBlockProps: a, setBlockFrame: o, addGalleryImages: s, moveGalleryImage: c, removeGalleryImage: l, setGalleryImageField: u, themeSwatches: d, newSeed: f } = n, { groupReset: p, groupChanged: m } = ul(() => R(r).props, a);
	var h = Vr(), g = P(h), _ = (e) => {
		let t = (e) => {
			var t = Zu(), n = P(t), i = N(n), a = I(i);
			O(n), ni(I(n, 2), 17, () => R(r).props.images ?? [], Qr, (e, t, n) => {
				var i = Xu(), a = N(i), o = N(a), s = I(o, 2), d = N(s);
				d.disabled = n === 0, W(d, () => X.up, !0), O(d);
				var f = I(d, 2);
				W(f, () => X.down, !0), O(f);
				var p = I(f, 2);
				W(p, () => X.cross, !0), O(p), O(s), O(a);
				var m = I(a, 2), h = N(m), g = I(h);
				G(g), O(m);
				var _ = I(m, 2), v = N(_), y = I(v);
				G(y), O(_), O(i), L((e, i, s, c, l, u) => {
					J(a, "title", e), J(o, "src", R(t).src), f.disabled = n === R(r).props.images.length - 1, J(p, "title", i), H(h, `${s ?? ""} `), K(g, R(t).alt ?? ""), J(g, "placeholder", c), H(v, `${l ?? ""} `), K(y, R(t).href ?? ""), J(y, "placeholder", u);
				}, [
					() => Y("hint.gallery"),
					() => Y("tip.removeImage"),
					() => Y("lbl.description"),
					() => Y("ph.altShort"),
					() => Y("lbl.link"),
					() => Y("ph.galleryHref")
				]), z("click", d, () => c(n, -1)), z("click", f, () => c(n, 1)), z("click", p, () => l(n)), z("change", g, (e) => u(n, "alt", e.target.value)), z("change", y, (e) => u(n, "href", e.target.value || null)), V(e, i);
			}), L((e, t) => {
				J(n, "title", e), H(i, `${t ?? ""} `);
			}, [() => Y("tip.gallery.addImages"), () => Y("ui.addImages")]), z("change", a, s), V(e, t);
		};
		{
			let n = /* @__PURE__ */ A(() => Y("group.images")), i = /* @__PURE__ */ A(() => Y("menu.imageCount", { n: R(r).props.images?.length ?? 0 }));
			Wc(e, {
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
			var t = rd(), n = P(t), a = N(n), o = N(a), c = I(o);
			{
				let e = /* @__PURE__ */ A(() => lc.map((e) => [e, Y(`opt.galleryView.${e}`)]));
				Ao(c, {
					get value() {
						return R(s);
					},
					get options() {
						return R(e);
					},
					onchange: (e) => i("view", e)
				});
			}
			O(a), Mo(I(a, 2), { id: "galleryView" }), O(n);
			var l = I(n, 2), u = (e) => {
				{
					let t = /* @__PURE__ */ A(() => Y("lbl.ribbonWidth")), n = /* @__PURE__ */ A(() => fo(R(r).props.width)), a = /* @__PURE__ */ A(uo);
					eu(e, {
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
				var t = Qu(), n = P(t), a = N(n), o = N(a), s = I(o);
				G(s), O(a), Mo(I(a, 2), { id: "columns" }), O(n);
				var c = I(n, 2), l = N(c), u = F(I(l));
				O(c);
				var d = I(c, 2);
				G(d), L((e, t) => {
					H(o, `${e ?? ""} `), K(s, R(r).props.columns ?? 3), H(l, `${t ?? ""} `), H(u, `${R(r).props.gap ?? 12 ?? ""} px`), K(d, R(r).props.gap ?? 12);
				}, [() => Y("lbl.columns"), () => Y("lbl.imageGap")]), z("change", s, (e) => i("columns", Number(e.target.value))), z("input", d, (e) => i("gap", Number(e.target.value))), V(e, t);
			}, h = /* @__PURE__ */ A(() => uc.includes(R(s)));
			U(p, (e) => {
				R(h) && e(m);
			});
			var g = I(p, 2), _ = (e) => {
				var t = $u(), n = P(t), a = N(n), o = F(a, !0), s = I(a, 2);
				G(s);
				var c = F(I(s, 2));
				O(n);
				var l = I(n, 2), u = N(l);
				W(u, () => X.shuffle);
				var d = I(u);
				O(l), L((e, t, i, a) => {
					J(n, "title", e), H(o, t), J(s, "min", dc.min), J(s, "max", dc.max), K(s, R(r).props.rowHeight ?? dc.dflt), H(c, `${R(r).props.rowHeight ?? dc.dflt ?? ""} px`), J(l, "title", i), H(d, ` ${a ?? ""}`);
				}, [
					() => Y("tip.gallery.rowHeight"),
					() => Y("lbl.galleryRowHeight"),
					() => Y("tip.gallery.shuffleMosaic"),
					() => Y("ui.shufflePhotos")
				]), z("input", s, (e) => i("rowHeight", e.target.valueAsNumber)), z("click", l, () => i("seed", f())), V(e, t);
			};
			U(g, (e) => {
				R(s) === "mosaic" && e(_);
			});
			var v = I(g, 2), y = (e) => {
				var t = td(), n = P(t), a = N(n), o = F(a, !0), s = I(a, 2);
				G(s);
				var c = F(I(s, 2));
				O(n);
				var l = I(n, 2), u = (e) => {
					var t = ed(), n = N(t);
					W(n, () => X.shuffle);
					var r = I(n);
					O(t), L((e, n) => {
						J(t, "title", e), H(r, ` ${n ?? ""}`);
					}, [() => Y("tip.gallery.shuffleTilt"), () => Y("ui.shufflePhotos")]), z("click", t, () => i("seed", f())), V(e, t);
				};
				U(l, (e) => {
					(R(r).props.tilt ?? fc.dflt) > 0 && e(u);
				});
				var p = I(l, 2), m = N(p), h = I(m);
				{
					let e = /* @__PURE__ */ A(() => R(r).props.frameColor || "#ffffff"), t = /* @__PURE__ */ A(d), n = /* @__PURE__ */ A(() => Y("tip.gallery.frameColor"));
					Na(h, {
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
				O(p);
				var g = I(p, 2), _ = N(g);
				G(_);
				var v = I(_);
				O(g), L((e, t, i, a, l, u) => {
					J(n, "title", e), H(o, t), J(s, "min", fc.min), J(s, "max", fc.max), K(s, R(r).props.tilt ?? fc.dflt), H(c, `${R(r).props.tilt ?? fc.dflt ?? ""}°`), J(p, "title", i), H(m, `${a ?? ""} `), J(g, "title", l), q(_, R(r).props.captions === !0), H(v, ` ${u ?? ""}`);
				}, [
					() => Y("tip.gallery.tilt"),
					() => Y("lbl.polaroidTilt"),
					() => Y("tip.gallery.frameColor"),
					() => Y("lbl.frameColor"),
					() => Y("tip.gallery.captions"),
					() => Y("lbl.galleryCaptions")
				]), z("input", s, (e) => i("tilt", e.target.valueAsNumber)), z("change", _, (e) => i("captions", e.target.checked)), V(e, t);
			};
			U(v, (e) => {
				R(s) === "polaroid" && e(y);
			});
			var b = I(v, 2), x = (e) => {
				var t = nd(), n = N(t), a = I(n);
				G(a), O(t), L((e) => {
					H(n, `${e ?? ""} `), K(a, R(r).props.interval ?? 5);
				}, [() => Y("lbl.secondsPerImage")]), z("change", a, (e) => i("interval", Number(e.target.value))), V(e, t);
			};
			U(b, (e) => {
				R(s) === "slides" && e(x);
			}), L((e) => H(o, `${e ?? ""} `), [() => Y("lbl.view")]), V(e, t);
		}, n = (e) => {
			var t = id(), n = P(t);
			{
				let e = /* @__PURE__ */ A(() => Y("lbl.ribbonRows")), t = /* @__PURE__ */ A(() => String(R(r).props.rows ?? 1)), a = /* @__PURE__ */ A(() => [["1", Y("opt.ribbonRows.one")], ["2", Y("opt.ribbonRows.two")]]);
				eu(n, {
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
				let e = /* @__PURE__ */ A(() => Y("lbl.ribbonDirection")), t = /* @__PURE__ */ A(() => R(r).props.direction ?? "left"), n = /* @__PURE__ */ A(() => [["left", Y("opt.ribbonDir.left")], ["right", Y("opt.ribbonDir.right")]]);
				eu(a, {
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
			O(s);
			var f = I(s, 2), p = N(f), m = F(p, !0), h = I(p, 2);
			G(h);
			var g = F(I(h, 2));
			O(f);
			var _ = I(f, 2), v = N(_), y = F(I(v));
			O(_);
			var b = I(_, 2);
			G(b);
			var x = I(b, 2), S = N(x);
			G(S);
			var C = I(S);
			O(x);
			var w = I(x, 2), T = N(w);
			G(T);
			var E = I(T);
			O(w), L((e, t, n, i, a, o, c, p, _) => {
				J(s, "title", e), H(l, t), K(u, R(r).props.speed ?? 60), H(d, R(r).props.speed ?? 60), J(f, "title", n), H(m, i), K(h, R(r).frame.h), H(g, `${R(r).frame.h ?? ""} px`), H(v, `${a ?? ""} `), H(y, `${R(r).props.gap ?? 12 ?? ""} px`), K(b, R(r).props.gap ?? 12), J(x, "title", o), q(S, R(r).props.pauseOnHover !== !1), H(C, ` ${c ?? ""}`), J(w, "title", p), q(T, R(r).props.fade !== !1), H(E, ` ${_ ?? ""}`);
			}, [
				() => Y("tip.ribbon.speed"),
				() => Y("lbl.ribbonSpeed"),
				() => Y("tip.ribbon.bandHeight"),
				() => Y("lbl.ribbonHeight"),
				() => Y("lbl.imageGap"),
				() => Y("tip.ribbon.pause"),
				() => Y("lbl.ribbonPause"),
				() => Y("tip.ribbon.fade"),
				() => Y("lbl.ribbonFade")
			]), z("input", u, (e) => i("speed", e.target.valueAsNumber)), z("input", h, (e) => o("h", e.target.valueAsNumber)), z("input", b, (e) => i("gap", Number(e.target.value))), z("change", S, (e) => i("pauseOnHover", e.target.checked)), z("change", T, (e) => i("fade", e.target.checked)), V(e, t);
		}, a = (e) => {
			var t = ad(), n = P(t), a = N(n), o = I(a);
			{
				let e = /* @__PURE__ */ A(() => R(r).props.radius ?? ""), t = /* @__PURE__ */ A(() => [
					["", Y("common.none")],
					["sm", Y("opt.size.sm")],
					["md", Y("opt.radius.md")]
				]);
				Ao(o, {
					get value() {
						return R(e);
					},
					get options() {
						return R(t);
					},
					onchange: (e) => i("radius", e || null)
				});
			}
			O(n);
			var s = I(n, 2), c = N(s);
			G(c);
			var l = I(c);
			O(s), L((e, t, n) => {
				H(a, `${e ?? ""} `), J(s, "title", t), q(c, R(r).props.lightbox !== !1), H(l, ` ${n ?? ""}`);
			}, [
				() => Y("lbl.radius"),
				() => Y("tip.lightbox"),
				() => Y("lbl.lightbox")
			]), z("change", c, (e) => i("lightbox", e.target.checked)), V(e, t);
		}, s = /* @__PURE__ */ A(() => pc(R(r).props.view));
		var c = od(), l = P(c);
		{
			let e = /* @__PURE__ */ A(() => Y("lbl.view")), n = /* @__PURE__ */ A(() => Y(`opt.galleryView.${R(s)}`)), r = /* @__PURE__ */ A(() => p("gallery-view", {
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
			Wc(l, {
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
				let t = /* @__PURE__ */ A(() => Y("lbl.ribbonMotion")), i = /* @__PURE__ */ A(() => `${R(r).props.speed ?? 60} px/s`), a = /* @__PURE__ */ A(() => p("gallery-roll", {
					rows: void 0,
					direction: void 0,
					speed: void 0,
					pauseOnHover: void 0,
					fade: void 0
				}));
				Wc(e, {
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
			let e = /* @__PURE__ */ A(() => Y("group.galleryImages")), t = /* @__PURE__ */ A(() => ({
				"": Y("common.none"),
				sm: Y("opt.size.sm"),
				md: Y("opt.radius.md")
			})[R(r).props.radius ?? ""]), n = /* @__PURE__ */ A(() => p("gallery-look", {
				radius: "md",
				lightbox: !0
			}));
			Wc(h, {
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
var cd = /* @__PURE__ */ B("<span class=\"nav-line\"><input/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span>"), ld = /* @__PURE__ */ B("<!> <button class=\"ghost action\"> </button>", 1), ud = /* @__PURE__ */ B("<button type=\"button\"></button>"), dd = /* @__PURE__ */ B("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <input class=\"field-filled\"/></label>"), fd = /* @__PURE__ */ B("<div class=\"ctl-field\"><span class=\"mini-label\"> </span> <div class=\"tile-grid cols-6\" role=\"group\"></div></div> <!>", 1), pd = /* @__PURE__ */ B("<!> <!>", 1), md = /* @__PURE__ */ B("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"0.5\" max=\"10\" step=\"0.5\"/> <span class=\"gridmenu-value\"> </span></div>"), hd = /* @__PURE__ */ B("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"10\" max=\"300\" step=\"5\"/> <span class=\"gridmenu-value\"> </span> <!></div>"), gd = /* @__PURE__ */ B("<button class=\"ghost action\"> </button> <!> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), _d = /* @__PURE__ */ B("<div class=\"pin-line\"><!> <!></div> <!>", 1), vd = /* @__PURE__ */ B("<label> <!></label>"), yd = /* @__PURE__ */ B("<!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"2\" max=\"40\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div>", 1), bd = /* @__PURE__ */ B("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <!> <label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <!> <!>", 1), xd = /* @__PURE__ */ B("<!> <!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"-10\" max=\"10\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div>", 1), Sd = /* @__PURE__ */ B("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"8\" max=\"120\" step=\"2\"/> <span class=\"gridmenu-value\"> </span></div>", 1), Cd = /* @__PURE__ */ B("<div class=\"swatch-cell\"><!> <span class=\"mini-label\"> </span></div>"), wd = /* @__PURE__ */ B("<div class=\"swatch-row\"><!> <div class=\"swatch-cell\"><!> <span class=\"mini-label\"> </span></div></div>"), Td = /* @__PURE__ */ B("<!> <!> <!> <!> <!>", 1);
function Ed(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, setBlockProps: o, themeSwatches: s } = n, { groupReset: c, groupChanged: l } = ul(() => R(r).props, o);
	function u(e, t) {
		i(`edit:${R(r).blockId}:ribbon${e}`, (n) => {
			n.props.items[e] = t;
		});
	}
	function d() {
		i("ribbon-item", (e) => {
			(e.props.items ??= []).push(Y("seed.ribbonBlock.new"));
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
			var t = ld(), n = P(t);
			ni(n, 17, () => R(r).props.items ?? [], Qr, (e, t, n) => {
				var i = cd(), a = N(i);
				G(a);
				var o = I(a, 2), s = N(o);
				s.disabled = n === 0, W(s, () => X.up, !0), O(s);
				var c = I(s, 2);
				W(c, () => X.down, !0), O(c);
				var l = I(c, 2);
				W(l, () => X.cross, !0), O(l), O(o), O(i), L((e, i, o, u) => {
					K(a, R(t)), J(a, "title", e), J(s, "title", i), J(c, "title", o), c.disabled = n === (R(r).props.items?.length ?? 0) - 1, J(l, "title", u);
				}, [
					() => Y("tip.ribbon.item"),
					() => Y("tip.moveUp"),
					() => Y("tip.moveDown"),
					() => Y("tip.ribbon.remove")
				]), z("change", a, (e) => u(n, e.target.value)), z("click", s, () => p(n, -1)), z("click", c, () => p(n, 1)), z("click", l, () => f(n)), V(e, i);
			});
			var i = I(n, 2), a = F(i, !0);
			L((e) => H(a, e), [() => Y("ui.addRibbonItem")]), z("click", i, d), V(e, t);
		}, n = (e) => {
			var t = fd(), n = P(t), i = N(n), o = F(i, !0), s = I(i, 2);
			ni(s, 21, go, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ A(() => h(R(t), 2));
				let i = () => R(n)[0], o = () => R(n)[1];
				var s = ud();
				let c;
				W(s, () => yo[i()], !0), O(s), L(() => {
					c = Ei(s, 1, "tile", null, c, { on: (R(r).props.sep ?? "dot") === i() }), J(s, "aria-pressed", (R(r).props.sep ?? "dot") === i()), J(s, "title", o());
				}), z("click", s, () => a("sep", i())), V(e, s);
			}), O(s), O(n);
			var c = I(n, 2), l = (e) => {
				var t = dd(), n = N(t), i = F(n, !0), o = I(n, 2);
				G(o), O(t), L((e, n) => {
					J(t, "title", e), H(i, n), K(o, R(r).props.sepText ?? "");
				}, [() => Y("tip.ribbon.sepText"), () => Y("lbl.ribbonSepText")]), z("change", o, (e) => a("sepText", e.target.value)), V(e, t);
			};
			U(c, (e) => {
				R(r).props.sep === "custom" && e(l);
			}), L((e, t) => {
				H(o, e), J(s, "aria-label", t);
			}, [() => Y("lbl.ribbonSep"), () => Y("lbl.ribbonSep")]), V(e, t);
		};
		var i = pd(), o = P(i);
		{
			let e = /* @__PURE__ */ A(() => Y("lbl.ribbonItems")), n = /* @__PURE__ */ A(() => Y("menu.wordCount", { n: R(r).props.items?.length ?? 0 }));
			Wc(o, {
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
			let e = /* @__PURE__ */ A(() => Y("lbl.ribbonSep")), t = /* @__PURE__ */ A(() => go().find(([e]) => e === (R(r).props.sep ?? "dot"))?.[1] ?? ""), i = /* @__PURE__ */ A(() => c("ribbon-sep", {
				sep: "dot",
				sepText: void 0
			}));
			Wc(s, {
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
			var t = _d(), i = P(t), o = N(i);
			{
				let e = /* @__PURE__ */ A(po);
				Ao(o, {
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
			Mo(I(o, 2), { id: "ribbonMotion" }), O(i);
			var s = I(i, 2), c = (e) => {
				var t = gd(), i = P(t), o = F(i, !0), s = I(i, 2);
				{
					let e = /* @__PURE__ */ A(() => Y("lbl.ribbonDirection")), t = /* @__PURE__ */ A(() => R(r).props.direction ?? "left"), n = /* @__PURE__ */ A(() => [["left", Y("opt.ribbonDir.left")], ["right", Y("opt.ribbonDir.right")]]);
					eu(s, {
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
					var t = md(), n = N(t), i = F(n, !0), o = I(n, 2);
					G(o);
					var s = F(I(o, 2));
					O(t), L((e, n) => {
						J(t, "title", e), H(i, n), K(o, R(r).props.dwell ?? 2.5), H(s, `${R(r).props.dwell ?? 2.5 ?? ""} s`);
					}, [() => Y("tip.ribbon.dwell"), () => Y("lbl.ribbonDwell")]), z("input", o, (e) => a("dwell", e.target.valueAsNumber)), V(e, t);
				}, u = (e) => {
					var t = hd(), n = N(t), i = F(n, !0), o = I(n, 2);
					G(o);
					var s = I(o, 2), c = F(s, !0);
					Mo(I(s, 2), { id: "speed" }), O(t), L((e, n) => {
						J(t, "title", e), H(i, n), K(o, R(r).props.speed ?? 60), H(c, R(r).props.speed ?? 60);
					}, [() => Y("tip.ribbon.speed"), () => Y("lbl.ribbonSpeed")]), z("input", o, (e) => a("speed", e.target.valueAsNumber)), V(e, t);
				};
				U(c, (e) => {
					R(f) === "step" ? e(l) : e(u, -1);
				});
				var d = I(c, 2), p = N(d);
				G(p);
				var m = I(p);
				O(d);
				var h = I(d, 2), g = N(h);
				G(g);
				var _ = I(g);
				O(h), L((e, t, n, a, s, c) => {
					J(i, "title", e), H(o, t), J(d, "title", n), q(p, R(r).props.pauseOnHover !== !1), H(m, ` ${a ?? ""}`), J(h, "title", s), q(g, R(r).props.fade !== !1), H(_, ` ${c ?? ""}`);
				}, [
					() => Y("tip.ribbon.play"),
					() => Y("ui.ribbonPlay"),
					() => Y("tip.ribbon.pause"),
					() => Y("lbl.ribbonPause"),
					() => Y("tip.ribbon.fade"),
					() => Y("lbl.ribbonFade")
				]), z("click", i, () => n.bridge?.sendDemoMotion()), z("change", p, (e) => a("pauseOnHover", e.target.checked)), z("change", g, (e) => a("fade", e.target.checked)), V(e, t);
			};
			U(s, (e) => {
				R(f) !== "none" && e(c);
			}), V(e, t);
		}, i = (e) => {
			var t = bd(), n = P(t), i = N(n), o = F(i, !0), c = I(i, 2);
			{
				let e = /* @__PURE__ */ A(() => R(r).props.above ?? "none"), t = /* @__PURE__ */ A(ho);
				Ao(c, {
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
			O(n);
			var l = I(n, 2), u = (e) => {
				var t = vd(), n = N(t), i = I(n);
				{
					let e = /* @__PURE__ */ A(() => R(r).props.aboveColor ?? _o(R(r).props)), t = /* @__PURE__ */ A(s), n = /* @__PURE__ */ A(() => Y("tip.ribbon.stripeColor"));
					Na(i, {
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
				O(t), L((e, r) => {
					J(t, "title", e), H(n, `${r ?? ""} `);
				}, [() => Y("tip.ribbon.stripeColor"), () => Y("lbl.colour")]), V(e, t);
			};
			U(l, (e) => {
				(R(r).props.above ?? "none") !== "none" && e(u);
			});
			var d = I(l, 2), f = N(d), p = F(f, !0), m = I(f, 2);
			{
				let e = /* @__PURE__ */ A(() => R(r).props.main ?? "text"), t = /* @__PURE__ */ A(mo);
				Ao(m, {
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
			O(d);
			var h = I(d, 2), g = N(h), _ = F(g, !0), v = I(g, 2);
			{
				let e = /* @__PURE__ */ A(() => R(r).props.below ?? "none"), t = /* @__PURE__ */ A(ho);
				Ao(v, {
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
			O(h);
			var y = I(h, 2), b = (e) => {
				var t = vd(), n = N(t), i = I(n);
				{
					let e = /* @__PURE__ */ A(() => R(r).props.belowColor ?? _o(R(r).props)), t = /* @__PURE__ */ A(s), n = /* @__PURE__ */ A(() => Y("tip.ribbon.stripeColor"));
					Na(i, {
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
				O(t), L((e, r) => {
					J(t, "title", e), H(n, `${r ?? ""} `);
				}, [() => Y("tip.ribbon.stripeColor"), () => Y("lbl.colour")]), V(e, t);
			};
			U(y, (e) => {
				(R(r).props.below ?? "none") !== "none" && e(b);
			});
			var x = I(y, 2), S = (e) => {
				var t = yd(), n = P(t);
				{
					let e = /* @__PURE__ */ A(() => Y("lbl.ribbonStripePlace")), t = /* @__PURE__ */ A(() => Y("tip.ribbon.stripePlace")), i = /* @__PURE__ */ A(() => R(r).props.stripePlace ?? "stack"), o = /* @__PURE__ */ A(() => [["stack", Y("opt.ribbonPlace.stack")], ["edge", Y("opt.ribbonPlace.edge")]]);
					eu(n, {
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
				O(i), L((e, t) => {
					J(i, "title", e), H(s, t), K(c, R(r).props.thickness ?? 8), H(l, `${R(r).props.thickness ?? 8 ?? ""} px`);
				}, [() => Y("tip.ribbon.thickness"), () => Y("lbl.ribbonThickness")]), z("input", c, (e) => a("thickness", e.target.valueAsNumber)), V(e, t);
			};
			U(x, (e) => {
				((R(r).props.above ?? "none") !== "none" || (R(r).props.below ?? "none") !== "none") && e(S);
			}), L((e, t, r, i, a, s) => {
				J(n, "title", e), H(o, t), J(d, "title", r), H(p, i), J(h, "title", a), H(_, s);
			}, [
				() => Y("tip.ribbon.above"),
				() => Y("lbl.ribbonAbove"),
				() => Y("tip.ribbon.main"),
				() => Y("lbl.ribbonMain"),
				() => Y("tip.ribbon.below"),
				() => Y("lbl.ribbonBelow")
			]), V(e, t);
		}, o = (e) => {
			var t = xd(), n = P(t);
			{
				let e = /* @__PURE__ */ A(() => Y("lbl.ribbonWidth")), t = /* @__PURE__ */ A(() => fo(R(r).props.width)), i = /* @__PURE__ */ A(uo);
				eu(n, {
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
				let e = /* @__PURE__ */ A(() => Y("lbl.ribbonVariant")), t = /* @__PURE__ */ A(() => R(r).props.variant ?? "band"), n = /* @__PURE__ */ A(() => [["band", Y("opt.ribbonVariant.band")], ["plain", Y("opt.ribbonVariant.plain")]]);
				eu(i, {
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
			O(o), L((e, t) => {
				J(o, "title", e), H(c, t), K(l, R(r).props.tilt ?? 0), H(u, `${R(r).props.tilt ?? 0 ?? ""}°`);
			}, [() => Y("tip.ribbon.tilt"), () => Y("lbl.ribbonTilt")]), z("input", l, (e) => a("tilt", e.target.valueAsNumber)), V(e, t);
		}, u = (e) => {
			var t = Sd(), n = P(t), i = N(n), o = F(i, !0), s = I(i, 2);
			{
				let e = /* @__PURE__ */ A(() => R(r).props.size ?? "md"), t = /* @__PURE__ */ A(() => [
					["sm", Y("opt.size.sm")],
					["md", Y("opt.size.md")],
					["lg", Y("opt.size.lg")],
					["xl", Y("opt.size.xl")]
				]);
				Ao(s, {
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
			O(n);
			var c = I(n, 2), l = N(c);
			G(l);
			var u = I(l);
			O(c);
			var d = I(c, 2), f = N(d);
			G(f);
			var p = I(f);
			O(d);
			var m = I(d, 2), h = N(m);
			G(h);
			var g = I(h);
			O(m);
			var _ = I(m, 2), v = N(_), y = F(v, !0), b = I(v, 2);
			G(b);
			var x = F(I(b, 2));
			O(_), L((e, t, n, i, a, s, v, S, C) => {
				H(o, e), J(c, "title", t), q(l, R(r).props.caps === !0), H(u, ` ${n ?? ""}`), J(d, "title", i), q(f, R(r).props.weight === "bold"), H(p, ` ${a ?? ""}`), J(m, "title", s), q(h, R(r).props.outline === !0), H(g, ` ${v ?? ""}`), J(_, "title", S), H(y, C), K(b, R(r).props.gap ?? 40), H(x, `${R(r).props.gap ?? 40 ?? ""} px`);
			}, [
				() => Y("lbl.size"),
				() => Y("tip.ribbon.caps"),
				() => Y("lbl.ribbonCaps"),
				() => Y("tip.ribbon.bold"),
				() => Y("lbl.ribbonBold"),
				() => Y("tip.ribbon.outline"),
				() => Y("lbl.ribbonOutline"),
				() => Y("tip.ribbon.gap"),
				() => Y("lbl.ribbonGap")
			]), z("change", l, (e) => a("caps", e.target.checked)), z("change", f, (e) => a("weight", e.target.checked ? "bold" : "normal")), z("change", h, (e) => a("outline", e.target.checked)), z("input", b, (e) => a("gap", e.target.valueAsNumber)), V(e, t);
		}, d = (e) => {
			var t = wd(), n = N(t), i = (e) => {
				var t = Cd(), n = N(t);
				{
					let e = /* @__PURE__ */ A(() => R(r).props.bg ?? "accent"), t = /* @__PURE__ */ A(s), i = /* @__PURE__ */ A(() => Y("tip.ribbon.bg"));
					Na(n, {
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
				O(t), L((e, n) => {
					J(t, "title", e), H(i, n);
				}, [() => Y("tip.ribbon.bg"), () => Y("lbl.background")]), V(e, t);
			};
			U(n, (e) => {
				(R(r).props.variant ?? "band") !== "plain" && e(i);
			});
			var o = I(n, 2), c = N(o);
			{
				let e = /* @__PURE__ */ A(() => R(r).props.color ?? ((R(r).props.variant ?? "band") === "plain" ? "text" : "accent-text")), t = /* @__PURE__ */ A(s), n = /* @__PURE__ */ A(() => Y("tip.ribbon.color"));
				Na(c, {
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
			O(o), O(t), L((e, t) => {
				J(o, "title", e), H(l, t);
			}, [() => Y("tip.ribbon.color"), () => Y("lbl.textColor")]), V(e, t);
		}, f = /* @__PURE__ */ A(() => R(r).props.motion ?? "roll"), p = /* @__PURE__ */ A(() => [R(r).props.above ?? "none", R(r).props.below ?? "none"].filter((e) => e !== "none").length), m = /* @__PURE__ */ A(() => l({
			bg: void 0,
			color: void 0
		}));
		var h = Td(), g = P(h);
		{
			let e = /* @__PURE__ */ A(() => Y("lbl.ribbonMotion")), n = /* @__PURE__ */ A(() => po().find(([e]) => e === R(f))?.[1] ?? ""), r = /* @__PURE__ */ A(() => c("ribbon-motion", {
				motion: "roll",
				direction: "left",
				speed: 60,
				dwell: 2.5,
				pauseOnHover: !0,
				fade: !0
			}));
			Wc(g, {
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
			let e = /* @__PURE__ */ A(() => Y("lbl.ribbonStripes")), t = /* @__PURE__ */ A(() => R(p) ? Y("menu.onCount", { n: R(p) }) : Y("common.off")), n = /* @__PURE__ */ A(() => c("ribbon-stripes", {
				above: "none",
				below: "none",
				main: "text",
				aboveColor: void 0,
				belowColor: void 0,
				stripePlace: "stack",
				thickness: 8
			}));
			Wc(_, {
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
			let e = /* @__PURE__ */ A(() => Y("lbl.ribbonShape")), t = /* @__PURE__ */ A(() => uo().find(([e]) => e === fo(R(r).props.width))?.[1] ?? ""), n = /* @__PURE__ */ A(() => c("ribbon-shape", {
				width: "canvas",
				variant: "band",
				tilt: 0
			}));
			Wc(v, {
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
			let e = /* @__PURE__ */ A(() => Y("lbl.ribbonText")), t = /* @__PURE__ */ A(() => ({
				sm: Y("opt.size.sm"),
				md: Y("opt.size.md"),
				lg: Y("opt.size.lg"),
				xl: Y("opt.size.xl")
			})[R(r).props.size ?? "md"]), n = /* @__PURE__ */ A(() => c("ribbon-text", {
				size: "md",
				caps: !1,
				weight: "normal",
				outline: !1,
				gap: 40
			}));
			Wc(y, {
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
			let e = /* @__PURE__ */ A(() => Y("group.navColours")), t = /* @__PURE__ */ A(() => R(m) ? Y("menu.changed", { n: R(m) }) : Y("menu.standard")), n = /* @__PURE__ */ A(() => c("ribbon-colours", {
				bg: void 0,
				color: void 0
			}));
			Wc(b, {
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
//#region src/lib/MarkPicker.svelte
var Dd = /* @__PURE__ */ B("<span class=\"mp-count svelte-1y5ipgc\"> </span>"), Od = /* @__PURE__ */ B("<div class=\"mp-tabs svelte-1y5ipgc\" role=\"group\"><button type=\"button\"> </button> <button type=\"button\"> <!></button></div>"), kd = /* @__PURE__ */ B("<button type=\"button\"><span class=\"mp-svg svelte-1y5ipgc\"></span></button>"), Ad = /* @__PURE__ */ B("<p class=\"mp-hint svelte-1y5ipgc\"> </p>"), jd = /* @__PURE__ */ B("<input class=\"mp-search svelte-1y5ipgc\" type=\"search\"/> <div class=\"mp-scroll svelte-1y5ipgc\"><div class=\"mp-grid svelte-1y5ipgc\"><button type=\"button\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" aria-hidden=\"true\" class=\"svelte-1y5ipgc\"><circle cx=\"12\" cy=\"12\" r=\"8.5\"></circle><path d=\"M6 18L18 6\"></path></svg></button> <!></div> <!></div>", 1), Md = /* @__PURE__ */ B("<button type=\"button\"><img alt=\"\" class=\"svelte-1y5ipgc\"/></button>"), Nd = /* @__PURE__ */ B("<div class=\"mp-scroll svelte-1y5ipgc\"><div class=\"mp-grid mp-grid-img svelte-1y5ipgc\"><button type=\"button\" class=\"mp-cell mp-upload svelte-1y5ipgc\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" aria-hidden=\"true\" class=\"svelte-1y5ipgc\"><path d=\"M12 5v14\"></path><path d=\"M5 12h14\"></path></svg> <span> </span></button> <!></div> <p class=\"mp-hint svelte-1y5ipgc\"> </p></div>"), Pd = /* @__PURE__ */ B("<!> <!>", 1), Fd = /* @__PURE__ */ B("<img class=\"mp-own svelte-1y5ipgc\" alt=\"\"/>"), Id = /* @__PURE__ */ B("<span class=\"mp-svg svelte-1y5ipgc\"></span>"), Ld = /* @__PURE__ */ B("<span class=\"mp-empty svelte-1y5ipgc\" aria-hidden=\"true\">+</span>"), Rd = /* @__PURE__ */ B("<div class=\"mp-pop mp-anchored svelte-1y5ipgc\" popover=\"auto\"><!></div>"), zd = /* @__PURE__ */ B("<div class=\"mp-pop svelte-1y5ipgc\"><!></div>"), Bd = /* @__PURE__ */ B("<span class=\"mp svelte-1y5ipgc\"><button type=\"button\"><!></button> <!> <input type=\"file\" accept=\"image/*\" hidden=\"\"/></span>");
function Vd(e, t) {
	$e(t, !0);
	let n = (e) => {
		var t = Pd(), n = P(t), a = (e) => {
			var t = Od(), n = N(t);
			let r;
			var i = F(n, !0), a = I(n, 2);
			let s;
			var c = N(a, !0), l = I(c), u = (e) => {
				var t = Dd(), n = F(t, !0);
				L(() => H(n, R(S).length)), V(e, t);
			};
			U(l, (e) => {
				R(S).length && e(u);
			}), O(a), O(t), L((e, l) => {
				J(t, "aria-label", o()), r = Ei(n, 1, "mp-tab svelte-1y5ipgc", null, r, { on: R(_) === "icons" }), J(n, "aria-pressed", R(_) === "icons"), H(i, e), s = Ei(a, 1, "mp-tab svelte-1y5ipgc", null, s, { on: R(_) === "images" }), J(a, "aria-pressed", R(_) === "images"), H(c, l);
			}, [() => Y("mp.icons"), () => Y("mp.images")]), z("click", n, () => M(_, "icons")), z("click", a, () => M(_, "images")), V(e, t);
		};
		U(n, (e) => {
			l() || e(a);
		});
		var c = I(n, 2), u = (e) => {
			var t = jd(), n = P(t);
			G(n);
			var a = I(n, 2), o = N(a), c = N(o);
			let l;
			ni(I(c, 2), 17, () => R(x), ({ id: e }) => e, (e, t) => {
				let n = () => R(t).id;
				var a = kd();
				let o;
				var s = N(a);
				W(s, () => Cu(n()), !0), O(s), O(a), L((e, t) => {
					o = Ei(a, 1, "mp-cell svelte-1y5ipgc", null, o, { active: n() === r() && !i() }), J(a, "title", e), J(a, "aria-label", t);
				}, [() => Y(xu[n()].labelKey), () => Y(xu[n()].labelKey)]), z("click", a, () => ee(n())), V(e, a);
			}), O(o);
			var u = I(o, 2), d = (e) => {
				var t = Ad(), n = F(t, !0);
				L((e) => H(n, e), [() => Y("mp.noHits")]), V(e, t);
			};
			U(u, (e) => {
				R(x).length || e(d);
			}), O(a), L((e, t) => {
				J(n, "placeholder", e), J(n, "aria-label", t), l = Ei(c, 1, "mp-cell mp-none svelte-1y5ipgc", null, l, { active: !r() && !i() }), J(c, "title", s()), J(c, "aria-label", s());
			}, [() => Y("mp.search"), () => Y("mp.search")]), Ii(n, () => R(v), (e) => M(v, e)), z("click", c, ne), V(e, t);
		}, d = (e) => {
			var t = Nd(), n = N(t), r = N(n), a = F(I(N(r), 2), !0);
			O(r), ni(I(r, 2), 16, () => R(S), (e) => e, (e, t) => {
				var n = Md();
				let r;
				var a = F(n);
				L(() => {
					r = Ei(n, 1, "mp-cell mp-img svelte-1y5ipgc", null, r, { active: t === i() }), J(a, "src", t);
				}), z("click", n, () => te(t)), V(e, n);
			}), O(n);
			var o = F(I(n, 2), !0);
			O(t), L((e, t) => {
				H(a, e), H(o, t);
			}, [() => Y("mp.upload"), () => Y("mp.imagesHint")]), z("click", r, ae), V(e, t);
		};
		U(c, (e) => {
			R(_) === "icons" ? e(u) : e(d, -1);
		}), V(e, t);
	}, r = Ki(t, "icon", 3, ""), i = Ki(t, "image", 3, ""), a = Ki(t, "images", 19, () => []), o = Ki(t, "label", 19, () => Y("mp.pickMark")), s = Ki(t, "noneLabel", 19, () => Y("common.none")), c = Ki(t, "klass", 3, ""), l = Ki(t, "iconsOnly", 3, !1), u = ga(), d = va("urd-mp"), f = d.slice(2), p = /* @__PURE__ */ j(null), m = /* @__PURE__ */ j(null), h = /* @__PURE__ */ j(null), g = /* @__PURE__ */ j(!1), _ = /* @__PURE__ */ j("icons"), v = /* @__PURE__ */ j(""), y = /* @__PURE__ */ j(sn({
		top: 0,
		left: 0
	})), b = Su.flatMap(([e, t]) => t.map((t) => ({
		id: t,
		cat: e
	}))), x = /* @__PURE__ */ A(() => {
		let e = R(v).trim().toLowerCase();
		return e ? b.filter(({ id: t }) => {
			let n = Y(xu[t].labelKey) || xu[t].label;
			return t.includes(e) || n.toLowerCase().includes(e);
		}) : b;
	}), S = /* @__PURE__ */ A(() => [...new Set(a().filter(Boolean))]);
	function C() {
		M(v, ""), M(re, !1), M(_, i() && !l() ? "images" : "icons", !0);
	}
	function w(e) {
		M(g, e.newState === "open"), ya(R(p), R(g)), R(g) && C();
	}
	function T() {
		u && R(m)?.hidePopover(), M(g, !1);
	}
	function E() {
		C();
		let e = R(p).getBoundingClientRect();
		M(y, {
			left: Math.max(8, Math.min(e.left, window.innerWidth - 286 - 8)),
			top: e.bottom + 332 + 8 > window.innerHeight ? Math.max(8, e.top - 332 - 8) : e.bottom + 6
		}, !0), M(g, !0);
	}
	function ee(e) {
		t.onpick?.({
			icon: e,
			image: ""
		});
	}
	function te(e) {
		t.onpick?.({ image: e });
	}
	function ne() {
		t.onpick?.({
			icon: "",
			image: ""
		});
	}
	let re = /* @__PURE__ */ j(!1);
	function ie(e) {
		M(re, !1);
		let n = e.target.files?.[0];
		e.target.value = "", n && t.onfile?.(n);
	}
	function ae() {
		M(re, !0), R(h).click();
	}
	Dn(() => {
		if (!R(g)) return;
		let e = () => {
			R(re) || T();
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
	var oe = Bd(), se = N(oe), ce = N(se), le = (e) => {
		var n = Vr();
		ci(P(n), () => t.children), V(e, n);
	}, ue = (e) => {
		var t = Fd();
		L(() => J(t, "src", i())), V(e, t);
	}, de = (e) => {
		var t = Id();
		W(t, () => Cu(r()), !0), O(t), V(e, t);
	}, fe = (e) => {
		V(e, Ld());
	};
	U(ce, (e) => {
		t.children ? e(le) : i() ? e(ue, 1) : r() && xu[r()] ? e(de, 2) : e(fe, -1);
	}), O(se);
	var pe = I(se, 2), me = (e) => {
		var t = Rd(), r = N(t), i = (e) => {
			n(e);
		};
		U(r, (e) => {
			R(g) && e(i);
		}), O(t), Hi(t, (e) => M(m, e), () => R(m)), L(() => {
			J(t, "id", f), Oi(t, `position-anchor: ${d ?? ""}`);
		}), jr("toggle", t, w), V(e, t);
	}, he = (e) => {
		var t = zd(), r = N(t);
		n(r), O(t), L(() => Oi(t, `top: ${R(y).top ?? ""}px; left: ${R(y).left ?? ""}px`)), V(e, t);
	};
	U(pe, (e) => {
		u ? e(me) : R(g) && e(he, 1);
	});
	var ge = I(pe, 2);
	Hi(ge, (e) => M(h, e), () => R(h)), O(oe), Hi(oe, (e) => M(p, e), () => R(p)), L(() => {
		Ei(se, 1, `mp-trigger ${c() ?? ""}`, "svelte-1y5ipgc"), J(se, "title", o()), J(se, "aria-label", o()), J(se, "popovertarget", u ? f : void 0), Oi(se, u ? `anchor-name: ${d}` : void 0);
	}), z("click", se, function(...e) {
		(u ? void 0 : () => R(g) ? M(g, !1) : E())?.apply(this, e);
	}), z("change", ge, ie), jr("cancel", ge, () => M(re, !1)), V(e, oe), et();
}
Mr(["click", "change"]);
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
		return e.key === "firstMonth" && t === "now" ? Y("calendar.opt.firstMonth.now") : e.key === "firstMonth" ? new Intl.DateTimeFormat(ca(), { month: "long" }).format(new Date(2024, Number(t), 1)) : Y(`${e.labelKey}.${t}`);
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
	function E(e, t) {
		i(`edit:${R(r).blockId}:source${e}`, (n) => {
			let r = [...n.props.sources ?? []];
			r[e] = S({
				...x(r[e]),
				...t
			}), n.props.sources = r;
		});
	}
	function ee() {
		a("sources", [...Ge(R(r).props.sources ?? []), ""]);
	}
	function te(e) {
		a("sources", Ge(R(r).props.sources ?? []).filter((t, n) => n !== e));
	}
	function ne() {
		let e = R(r).props, t = ts(e.design), n = (e, t) => () => o(e, t), i = ns(e), a = i === "agenda" ? 8 : 6, s = i === "next" ? 3 : void 0, l = e.switcher === !0 || e.switcherViews != null || e.toolsSize != null || e.description != null || e.showMore === !1 || (e.limit ?? 6) !== a || e.nextCount !== s || e.laterCount !== s || e.showCancelled === !1 || e.structuredData === !1 || e.clock != null || e.weekStart != null, u = [
			!t.ownFilter && e.showCategories === !0,
			e.showSubscribe !== !1,
			e.showSignup === !0,
			e.showSearch === !0,
			e.showEarlier === !0
		].filter(Boolean).length, f = u > 0 || e.showOpen === !1 || e.showAdd === !1 || !!e.programHref, p = !!e.emptyText || e.emptyIcon != null && e.emptyIcon !== "calendar", m = Qo(e.design).filter((t) => e.options?.[t.key] != null).length, h = t.slots.filter((t) => e.colors?.[t.key]).length, g = Object.keys(e.fieldStyle ?? {}).length;
		return {
			sources: String((e.sources ?? []).filter((e) => {
				let t = x(e);
				return t.ref ? !!c(t.ref) : t.url.trim();
			}).length),
			view: Y(d[ns(e)]),
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
			buttons: u ? Y("menu.onCount", { n: u }) : Y("common.off"),
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
			empty: e.emptyText || Y("menu.standard"),
			emptyReset: p ? n("cal-empty", {
				emptyText: void 0,
				emptyIcon: void 0
			}) : null,
			notice: e.notice?.show === !0 ? Y("common.on") : Y("common.off"),
			noticeReset: e.notice ? n("cal-notice", { notice: void 0 }) : null,
			opts: m ? Y("menu.changed", { n: m }) : Y("menu.standard"),
			optsReset: m ? n("cal-opts", { options: void 0 }) : null,
			colors: h ? Y("menu.changedOf", {
				n: h,
				m: t.slots.length
			}) : Y("menu.standard"),
			colorsReset: h ? n("cal-colors", { colors: void 0 }) : null,
			stripe: cs(t, e.stripe).show ? Y("common.on") : Y("common.off"),
			stripeReset: e.stripe ? n("cal-stripe", { stripe: void 0 }) : null,
			fields: g ? Y("menu.changed", { n: g }) : Y("menu.standard"),
			fieldsReset: g ? n("cal-fields", { fieldStyle: void 0 }) : null
		};
	}
	var re = Vr(), ie = P(re), ae = (e) => {
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
					W(f, () => X.cross, !0), O(f), O(a), O(i), L((e, n, r) => {
						s = Oi(o, "", s, { background: e }), u = Ei(l, 1, "tb-grow cal-ref-name", null, u, { muted: !R(t) }), H(d, n), J(f, "title", r);
					}, [
						() => Ud(R(t)?.color),
						() => R(t) ? R(t).name || R(t).url : Y("calendar.refMissing"),
						() => Y("ui.remove")
					]), z("click", f, () => te(n)), V(e, i);
				}, s = (e) => {
					var t = Kd(), i = N(t), a = N(i);
					G(a);
					var o = I(a, 2);
					W(o, () => X.cross, !0), O(o), O(i);
					var s = I(i, 2), c = N(s);
					G(c);
					var l = I(c, 2);
					{
						let e = /* @__PURE__ */ A(() => R(r).color || "accent"), t = /* @__PURE__ */ A(u), i = /* @__PURE__ */ A(() => Y("tip.calendar.sourceColor"));
						Na(l, {
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
							onchange: (e) => E(n, { color: e ?? "" })
						});
					}
					O(s);
					var d = I(s, 2), f = F(d, !0);
					O(t), L((e, t, n, i, s, l, u, p) => {
						K(a, R(r).url), J(a, "placeholder", e), J(a, "title", t), J(o, "title", n), K(c, R(r).name), J(c, "placeholder", i), J(c, "title", s), J(d, "title", l), d.disabled = u, H(f, p);
					}, [
						() => Y("calendar.sourcesPh"),
						() => Y("calendar.sourceUrl"),
						() => Y("ui.remove"),
						() => Y("calendar.sourceName"),
						() => Y("tip.calendar.sourceName"),
						() => Y("tip.calendar.saveToSite"),
						() => !R(r).url.trim(),
						() => Y("calendar.saveToSite")
					]), z("change", a, (e) => E(n, { url: e.target.value.trim() })), z("click", o, () => te(n)), z("change", c, (e) => E(n, { name: e.target.value.trim() })), z("click", d, () => T(n)), V(e, t);
				};
				U(a, (e) => {
					R(r).ref ? e(o) : e(s, -1);
				}), V(e, i);
			});
			var a = I(i, 2), o = N(a);
			W(o, () => X.plus);
			var l = I(o);
			O(a);
			var d = I(a, 2), f = F(d, !0), p = I(d, 2);
			ni(p, 17, s, (e) => e.id, (e, t) => {
				var n = qd(), r = N(n);
				G(r);
				var i = I(r);
				O(n), L((e) => {
					q(r, e), H(i, ` ${(R(t).name || R(t).url) ?? ""}`);
				}, [() => C().has(R(t).id)]), z("change", r, (e) => w(R(t).id, e.target.checked)), V(e, n);
			});
			var m = I(p, 2), h = (e) => {
				var t = Jd(), n = F(t, !0);
				L((e) => H(n, e), [() => Y("calendar.siteSourcesNone")]), V(e, t);
			}, g = /* @__PURE__ */ A(() => !s().length);
			U(m, (e) => {
				R(g) && e(h);
			});
			var _ = I(m, 2), v = F(_, !0);
			L((e, t, n, r) => {
				H(l, ` ${e ?? ""}`), J(d, "title", t), H(f, n), H(v, r);
			}, [
				() => Y("ui.addCalendar"),
				() => Y("tip.calendar.siteSources"),
				() => Y("calendar.siteSources"),
				() => Y("calendar.editSiteCalendars")
			]), z("click", a, ee), z("click", _, () => n.openPanel("site", { calendars: !0 })), V(e, t);
		}, i = (e) => {
			var t = tf(), n = P(t), i = (e) => {
				var t = Xd(), n = N(t), i = I(n);
				{
					let e = /* @__PURE__ */ A(() => R(r).props.view ?? "list"), t = /* @__PURE__ */ A(() => [
						["list", Y("calendar.viewList")],
						["cards", Y("calendar.viewCards")],
						["month", Y("calendar.viewMonth")],
						["agenda", Y("calendar.viewAgenda")],
						["next", Y("calendar.viewNext")]
					]);
					Ao(i, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => a("view", e)
					});
				}
				O(t), L((e) => H(n, `${e ?? ""} `), [() => Y("lbl.view")]), V(e, t);
			}, o = /* @__PURE__ */ A(() => !ts(R(r).props.design).view);
			U(n, (e) => {
				R(o) && e(i);
			});
			var s = I(n, 2), c = (e) => {
				var t = Qd(), n = P(t), i = N(n);
				G(i);
				var o = I(i);
				O(n);
				var s = I(n, 2), c = (e) => {
					let t = /* @__PURE__ */ A(() => Yo(R(r).props));
					var n = Zd(), i = P(n), o = N(i), s = F(o, !0), c = I(o, 2);
					{
						let e = /* @__PURE__ */ A(() => qo.map((e) => [e, Y(`calendar.design.${e}`)]));
						Ao(c, {
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
					O(i);
					var l = I(i, 2), u = N(l), d = F(u, !0), f = I(u, 2);
					{
						let e = /* @__PURE__ */ A(() => Jo.map((e) => [e, Y(e === "month" ? "calendar.viewMonth" : `calendar.design.${e}`)]));
						Ao(f, {
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
					O(l), L((e, t, n, r) => {
						J(i, "title", e), H(s, t), J(l, "title", n), H(d, r);
					}, [
						() => Y("tip.calendar.switchWeek"),
						() => Y("calendar.switchWeek"),
						() => Y("tip.calendar.switchMonth"),
						() => Y("calendar.switchMonth")
					]), V(e, n);
				};
				U(s, (e) => {
					R(r).props.switcher === !0 && e(c);
				});
				var l = I(s, 2);
				{
					let e = /* @__PURE__ */ A(() => Y("calendar.toolsSize")), t = /* @__PURE__ */ A(() => Y("tip.calendar.toolsSize")), n = /* @__PURE__ */ A(() => ["s", "l"].includes(R(r).props.toolsSize) ? R(r).props.toolsSize : "m"), i = /* @__PURE__ */ A(() => [
						["s", Y("calendar.toolsSize.s")],
						["m", Y("calendar.toolsSize.m")],
						["l", Y("calendar.toolsSize.l")]
					]);
					eu(l, {
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
					J(n, "title", e), q(i, R(r).props.switcher === !0), H(o, ` ${t ?? ""}`);
				}, [() => Y("tip.calendar.switcher"), () => Y("calendar.switcher")]), z("change", i, (e) => a("switcher", e.target.checked || void 0)), V(e, t);
			}, l = /* @__PURE__ */ A(() => rs.includes(ns(R(r).props)));
			U(s, (e) => {
				R(l) && e(c);
			});
			var u = I(s, 2), d = (e) => {
				var t = qd(), n = N(t);
				G(n);
				var i = I(n);
				O(t), L((e, a) => {
					J(t, "title", e), q(n, R(r).props.phoneDesign !== !1), H(i, ` ${a ?? ""}`);
				}, [() => Y("tip.calendar.phoneDesign"), () => Y("calendar.phoneDesign")]), z("change", n, (e) => a("phoneDesign", e.target.checked ? void 0 : !1)), V(e, t);
			}, f = /* @__PURE__ */ A(() => ts(R(r).props.design).phone === "switch");
			U(u, (e) => {
				R(f) && e(d);
			});
			var p = I(u, 2), m = (e) => {
				{
					let t = /* @__PURE__ */ A(() => Y("calendar.opt.description")), n = /* @__PURE__ */ A(() => Y("tip.calendar.opt.description")), i = /* @__PURE__ */ A(() => Xo(R(r).props)), o = /* @__PURE__ */ A(() => [["rows", Y("calendar.descriptionRows")], ["card", Y("calendar.descriptionCard")]]);
					eu(e, {
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
			}, h = /* @__PURE__ */ A(() => Zo(R(r).props));
			U(p, (e) => {
				R(h) && e(m);
			});
			var g = I(p, 2), _ = (e) => {
				var t = $d(), n = P(t), i = N(n), o = N(i), s = I(o);
				G(s), O(i), Mo(I(i, 2), { id: "limit" }), O(n);
				var c = I(n, 2), l = (e) => {
					var t = qd(), n = N(t);
					G(n);
					var i = I(n);
					O(t), L((e, a) => {
						J(t, "title", e), q(n, R(r).props.showMore !== !1), H(i, ` ${a ?? ""}`);
					}, [() => Y("tip.calendar.showMore"), () => Y("calendar.showMore")]), z("change", n, (e) => a("showMore", e.target.checked ? void 0 : !1)), V(e, t);
				}, u = /* @__PURE__ */ A(() => ns(R(r).props) === "list" && ts(R(r).props.design).module !== "more");
				U(c, (e) => {
					R(u) && e(l);
				}), L((e, t) => {
					J(i, "title", e), H(o, `${t ?? ""} `), K(s, R(r).props.limit ?? 6);
				}, [() => Y("tip.collection.limit"), () => Y("lbl.maxCount")]), z("change", s, (e) => a("limit", Math.max(1, Math.min(50, Number(e.target.value) || 6)))), V(e, t);
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
			O(y);
			var S = I(y, 2), C = N(S);
			G(C);
			var w = I(C);
			O(S);
			var T = I(S, 2);
			{
				let e = /* @__PURE__ */ A(() => Y("calendar.clock")), t = /* @__PURE__ */ A(() => Y("tip.calendar.clock")), n = /* @__PURE__ */ A(() => R(r).props.clock === "12" ? "12" : "24"), i = /* @__PURE__ */ A(() => [["24", Y("calendar.clock.24")], ["12", Y("calendar.clock.12")]]);
				eu(T, {
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
			var E = I(T, 2), ee = (e) => {
				{
					let t = /* @__PURE__ */ A(() => Y("calendar.weekStart")), n = /* @__PURE__ */ A(() => Y("tip.calendar.weekStart")), i = /* @__PURE__ */ A(() => ["mon", "sun"].includes(R(r).props.weekStart) ? R(r).props.weekStart : "auto"), o = /* @__PURE__ */ A(() => [
						["auto", Y("calendar.weekStart.auto")],
						["mon", Y("calendar.weekStart.mon")],
						["sun", Y("calendar.weekStart.sun")]
					]);
					eu(e, {
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
			}, te = /* @__PURE__ */ A(() => [
				"month",
				"week",
				"year",
				"agenda"
			].includes(ns(R(r).props)) || R(r).props.design === "bento" || R(r).props.switcher === !0);
			U(E, (e) => {
				R(te) && e(ee);
			});
			var ne = I(E, 2), re = (e) => {
				var t = ef(), n = P(t);
				{
					let e = /* @__PURE__ */ A(() => Y("calendar.nextCount")), t = /* @__PURE__ */ A(() => Y("tip.calendar.nextCount")), i = /* @__PURE__ */ A(() => String(Math.min(3, Math.max(1, Number(R(r).props.nextCount) || 1))));
					eu(n, {
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
				O(i), L((e, t) => {
					J(i, "title", e), H(s, t), K(c, R(r).props.laterCount ?? 0), H(l, R(r).props.laterCount ?? 0);
				}, [() => Y("tip.calendar.laterCount"), () => Y("calendar.laterCount")]), z("input", c, (e) => a("laterCount", e.target.valueAsNumber)), V(e, t);
			};
			U(ne, (e) => {
				R(r).props.view === "next" && e(re);
			}), L((e, t, n, i) => {
				J(y, "title", e), q(b, R(r).props.showCancelled !== !1), H(x, ` ${t ?? ""}`), J(S, "title", n), q(C, R(r).props.structuredData !== !1), H(w, ` ${i ?? ""}`);
			}, [
				() => Y("tip.calendar.showCancelled"),
				() => Y("calendar.showCancelled"),
				() => Y("tip.calendar.structuredData"),
				() => Y("calendar.structuredData")
			]), z("change", b, (e) => a("showCancelled", e.target.checked ? void 0 : !1)), z("change", C, (e) => a("structuredData", e.target.checked ? void 0 : !1)), V(e, t);
		}, o = (e) => {
			var t = rf(), n = P(t), i = (e) => {
				var t = qd(), n = N(t);
				G(n);
				var i = I(n);
				O(t), L((e, a) => {
					J(t, "title", e), q(n, R(r).props.showCategories === !0), H(i, ` ${a ?? ""}`);
				}, [() => Y("tip.calendar.showCategories"), () => Y("calendar.showCategories")]), z("change", n, (e) => a("showCategories", e.target.checked)), V(e, t);
			}, o = /* @__PURE__ */ A(() => !ts(R(r).props.design).ownFilter);
			U(n, (e) => {
				R(o) && e(i);
			});
			var s = I(n, 2), c = N(s);
			G(c);
			var l = I(c);
			O(s);
			var u = I(s, 2), d = (e) => {
				var t = qd(), n = N(t);
				G(n);
				var i = I(n);
				O(t), L((e, a) => {
					J(t, "title", e), q(n, R(r).props.showEarlier === !0), H(i, ` ${a ?? ""}`);
				}, [() => Y("tip.calendar.showEarlier"), () => Y("calendar.showEarlier")]), z("change", n, (e) => a("showEarlier", e.target.checked ? !0 : void 0)), V(e, t);
			}, f = /* @__PURE__ */ A(() => ![
				"month",
				"week",
				"day",
				"year"
			].includes(ns(R(r).props)));
			U(u, (e) => {
				R(f) && e(d);
			});
			var p = I(u, 2), m = N(p), h = N(m);
			G(h);
			var g = I(h);
			O(m), Mo(I(m, 2), { id: "subscribe" }), O(p);
			var _ = I(p, 2), v = N(_);
			G(v);
			var y = I(v);
			O(_);
			var b = I(_, 2), x = N(b);
			G(x);
			var S = I(x);
			O(b);
			var C = I(b, 2), w = (e) => {
				var t = qd(), n = N(t);
				G(n);
				var i = I(n);
				O(t), L((e, a) => {
					J(t, "title", e), q(n, R(r).props.showOpen !== !1), H(i, ` ${a ?? ""}`);
				}, [() => Y("tip.calendar.showOpen"), () => Y("calendar.showOpen")]), z("change", n, (e) => a("showOpen", e.target.checked ? void 0 : !1)), V(e, t);
			}, T = /* @__PURE__ */ A(() => ts(R(r).props.design).open);
			U(C, (e) => {
				R(T) && e(w);
			});
			var E = I(C, 2), ee = (e) => {
				var t = nf(), n = N(t), i = I(n);
				G(i), O(t), L((e, a) => {
					J(t, "title", e), H(n, `${a ?? ""} `), K(i, R(r).props.programHref ?? "");
				}, [() => Y("tip.calendar.programHref"), () => Y("calendar.programHref")]), z("change", i, (e) => a("programHref", e.target.value.trim() || void 0)), V(e, t);
			}, te = /* @__PURE__ */ A(() => ts(R(r).props.design).program);
			U(E, (e) => {
				R(te) && e(ee);
			}), L((e, t, n, i, a, o) => {
				J(s, "title", e), q(c, R(r).props.showSearch === !0), H(l, ` ${t ?? ""}`), q(h, R(r).props.showSubscribe !== !1), H(g, ` ${n ?? ""}`), q(v, R(r).props.showSignup === !0), H(y, ` ${i ?? ""}`), J(b, "title", a), q(x, R(r).props.showAdd !== !1), H(S, ` ${o ?? ""}`);
			}, [
				() => Y("tip.calendar.showSearch"),
				() => Y("calendar.showSearch"),
				() => Y("calendar.showSubscribe"),
				() => Y("calendar.showSignup"),
				() => Y("tip.calendar.showAdd"),
				() => Y("calendar.showAdd")
			]), z("change", c, (e) => a("showSearch", e.target.checked ? !0 : void 0)), z("change", h, (e) => a("showSubscribe", e.target.checked)), z("change", v, (e) => a("showSignup", e.target.checked)), z("change", x, (e) => a("showAdd", e.target.checked ? void 0 : !1)), V(e, t);
		}, l = (e) => {
			var t = af(), n = P(t), i = N(n), o = I(i);
			G(o), O(n);
			var s = I(n, 2), c = N(s), l = I(c);
			{
				let e = /* @__PURE__ */ A(() => R(r).props.emptyIcon === "none" ? "" : R(r).props.emptyIcon ?? "calendar"), t = /* @__PURE__ */ A(() => Y("tip.calendar.emptyIcon"));
				Vd(l, {
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
							W(P(t), () => Cu(R(r).props.emptyIcon ?? "calendar") || Cu("calendar")), V(e, t);
						};
						U(i, (e) => {
							R(r).props.emptyIcon !== "none" && e(a);
						}), V(e, n);
					},
					$$slots: { default: !0 }
				});
			}
			O(s), L((e, t, a, l, u) => {
				J(n, "title", e), H(i, `${t ?? ""} `), K(o, R(r).props.emptyText ?? ""), J(o, "placeholder", a), J(s, "title", l), H(c, `${u ?? ""} `);
			}, [
				() => Y("tip.calendar.emptyText"),
				() => Y("calendar.emptyText"),
				() => Y("calendar.emptyPh"),
				() => Y("tip.calendar.emptyIcon"),
				() => Y("calendar.emptyIcon")
			]), z("change", o, (e) => a("emptyText", e.target.value.trim() || void 0)), V(e, t);
		}, d = (e) => {
			var t = Vr(), n = P(t), i = (e) => {
				var t = cf(), n = P(t), i = N(n);
				G(i);
				var o = I(i);
				O(n);
				var s = I(n, 2), c = (e) => {
					var t = sf(), n = P(t), i = (e) => {
						{
							let t = /* @__PURE__ */ A(() => Y("calendar.noticeAs")), n = /* @__PURE__ */ A(() => Y("tip.calendar.noticeAs")), i = /* @__PURE__ */ A(() => R(r).props.notice?.as === "band" ? "band" : "note"), o = /* @__PURE__ */ A(() => [["note", Y("calendar.noticeAsNote")], ["band", Y("calendar.noticeAsBand")]]);
							eu(e, {
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
					}, o = /* @__PURE__ */ A(() => ts(R(r).props.design).noticeBand);
					U(n, (e) => {
						R(o) && e(i);
					});
					var s = I(n, 2), c = N(s), l = I(c);
					G(l), O(s);
					var u = I(s, 2), d = (e) => {
						var t = of(), n = N(t), r = I(n);
						ft(r), O(t), L((e, i, a) => {
							J(t, "title", e), H(n, `${i ?? ""} `), K(r, a);
						}, [
							() => Y("tip.calendar.noticeBody"),
							() => Y("calendar.noticeBody"),
							() => g("noticeText")
						]), z("change", r, (e) => _("noticeText", e.target.value)), V(e, t);
					}, f = /* @__PURE__ */ A(() => R(r).props.notice?.as !== "band" || !ts(R(r).props.design).noticeBand);
					U(u, (e) => {
						R(f) && e(d);
					});
					var p = I(u, 2), m = N(p), h = I(m);
					G(h), O(p), L((e, t, n, i, a, o) => {
						J(s, "title", e), H(c, `${t ?? ""} `), K(l, n), J(l, "placeholder", i), J(p, "title", a), H(m, `${o ?? ""} `), K(h, R(r).props.notice?.href ?? "");
					}, [
						() => Y("tip.calendar.noticeHeading"),
						() => Y("calendar.noticeHeading"),
						() => g("noticeTitle"),
						() => Y("calendar.noticeTitleHint"),
						() => Y("tip.calendar.noticeHref"),
						() => Y("calendar.noticeHref")
					]), z("change", l, (e) => _("noticeTitle", e.target.value)), z("change", h, (e) => a("notice", {
						...R(r).props.notice ?? {},
						href: e.target.value.trim() || void 0
					})), V(e, t);
				};
				U(s, (e) => {
					R(r).props.notice?.show === !0 && e(c);
				}), L((e, t) => {
					J(n, "title", e), q(i, R(r).props.notice?.show === !0), H(o, ` ${t ?? ""}`);
				}, [() => Y("tip.calendar.showNotice"), () => Y("calendar.showNotice")]), z("change", i, (e) => a("notice", {
					...R(r).props.notice ?? {},
					show: e.target.checked
				})), V(e, t);
			}, o = /* @__PURE__ */ A(() => ts(R(r).props.design).notice);
			U(n, (e) => {
				R(o) && e(i);
			}), V(e, t);
		}, f = /* @__PURE__ */ A(ne);
		var p = uf(), m = P(p);
		{
			let e = /* @__PURE__ */ A(() => Y("calendar.sources"));
			Wc(m, {
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
			let e = /* @__PURE__ */ A(() => Y("calendar.group.view"));
			Wc(h, {
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
			let e = /* @__PURE__ */ A(() => Y("calendar.group.buttons"));
			Wc(v, {
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
			let e = /* @__PURE__ */ A(() => Y("calendar.group.empty"));
			Wc(y, {
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
				let t = /* @__PURE__ */ A(() => Y("calendar.group.notice"));
				Wc(e, {
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
		}, re = /* @__PURE__ */ A(() => ts(R(r).props.design).notice);
		U(b, (e) => {
			R(re) && e(S);
		});
		var ie = I(b, 2), ae = (e) => {
			var t = lf(), n = F(t, !0);
			L((e, r) => {
				J(t, "title", e), H(n, r);
			}, [() => Y("tip.calendar.resetTexts"), () => Y("calendar.resetTexts")]), z("click", t, () => a("texts", ps(R(r).props.texts))), V(e, t);
		}, oe = /* @__PURE__ */ A(() => fs(ts(R(r).props.design), R(r).props.texts));
		U(ie, (e) => {
			R(oe) && e(ae);
		}), V(e, p);
	}, oe = (e) => {
		let t = (e) => {
			var t = Vr(), n = P(t), i = (e) => {
				let t = /* @__PURE__ */ A(() => $o(R(r).props));
				var n = Vr();
				ni(P(n), 17, () => Qo(R(r).props.design).filter((e) => es(e, R(t))), (e) => e.key, (e, n) => {
					var r = Vr(), i = P(r), a = (e) => {
						var r = qd(), i = N(r);
						G(i);
						var a = I(i);
						O(r), L((e) => {
							q(i, R(t)[R(n).key]), H(a, ` ${e ?? ""}`);
						}, [() => Y(R(n).labelKey)]), z("change", i, (e) => f(R(n), e.target.checked)), V(e, r);
					}, o = (e) => {
						var r = df(), i = N(r), a = I(i);
						G(a), O(r), L((e, o, s) => {
							J(r, "title", e), H(i, `${o ?? ""} `), K(a, R(t)[R(n).key] ?? ""), J(a, "placeholder", s);
						}, [
							() => Y("tip.calendar.opt.hours"),
							() => Y(R(n).labelKey),
							() => Y("calendar.opt.columns.auto")
						]), z("change", a, (e) => f(R(n), e.target.value === "" ? null : Math.max(0, Math.min(24, Math.round(Number(e.target.value)) || 0)))), V(e, r);
					}, s = (e) => {
						var r = ff(), i = N(r), a = F(i, !0), o = I(i, 2);
						{
							let e = /* @__PURE__ */ A(() => R(n).values.map((e) => [e, p(R(n), e)]));
							Ao(o, {
								get value() {
									return R(t)[R(n).key];
								},
								get options() {
									return R(e);
								},
								onchange: (e) => f(R(n), e)
							});
						}
						O(r), L((e) => H(a, e), [() => Y(R(n).labelKey)]), V(e, r);
					}, c = (e) => {
						{
							let r = /* @__PURE__ */ A(() => Y(R(n).labelKey)), i = /* @__PURE__ */ A(() => R(n).values.map((e) => [e, p(R(n), e)]));
							eu(e, {
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
			}, a = /* @__PURE__ */ A(() => Qo(R(r).props.design).length);
			U(n, (e) => {
				R(a) && e(i);
			}), V(e, t);
		}, i = (e) => {
			var t = Vr();
			ni(P(t), 19, () => m(R(s)), (e) => e.section, (e, t, n) => {
				var i = hf(), a = P(i), o = (e) => {
					var n = pf(), r = F(n, !0);
					L((e) => H(r, e), [() => Y(`calendar.section.${R(t).section}`)]), V(e, n);
				};
				U(a, (e) => {
					R(n) > 0 && e(o);
				});
				var s = I(a, 2);
				ni(s, 21, () => R(t).slots, (e) => e.key, (e, t) => {
					var n = mf(), i = N(n);
					{
						let e = /* @__PURE__ */ A(() => R(r).props.colors?.[R(t).key] ?? ""), n = /* @__PURE__ */ A(u), a = /* @__PURE__ */ A(() => Y(R(t).labelKey));
						Na(i, {
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
					O(n), L((e, t) => {
						J(n, "title", e), H(a, t);
					}, [() => Y("tip.calendar.slot"), () => Y(R(t).labelKey)]), V(e, n);
				}), O(s), V(e, i);
			}), V(e, t);
		}, a = (e) => {
			var t = cf(), n = P(t), i = N(n);
			G(i);
			var a = I(i);
			O(n);
			var o = I(n, 2), c = (e) => {
				var t = ff(), n = N(t), i = F(n, !0), a = I(n, 2);
				{
					let e = /* @__PURE__ */ A(() => R(r).props.stripe?.color ?? ""), t = /* @__PURE__ */ A(u), n = /* @__PURE__ */ A(() => Y("calendar.stripeColor"));
					Na(a, {
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
				O(t), L((e, n) => {
					J(t, "title", e), H(i, n);
				}, [() => Y("tip.calendar.stripeColor"), () => Y("calendar.stripeColor")]), V(e, t);
			}, l = /* @__PURE__ */ A(() => cs(R(s), R(r).props.stripe).show);
			U(o, (e) => {
				R(l) && e(c);
			}), L((e, t, r) => {
				J(n, "title", e), q(i, t), H(a, ` ${r ?? ""}`);
			}, [
				() => Y("tip.calendar.stripe"),
				() => cs(R(s), R(r).props.stripe).show,
				() => Y("calendar.stripe")
			]), z("change", i, (e) => y({ show: e.target.checked })), V(e, t);
		}, o = (e) => {
			var t = gf(), n = P(t);
			{
				let e = /* @__PURE__ */ A(() => Po.map((e) => [e, Y(`calendar.field.${e}`)]));
				Ao(n, {
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
				let e = /* @__PURE__ */ A(() => h().font ?? ""), t = /* @__PURE__ */ A(() => [["", Y("common.inherit")], ...Hd.map(([e, t]) => [t, Y(e)])]);
				Ao(a, {
					get value() {
						return R(e);
					},
					get options() {
						return R(t);
					},
					onchange: (e) => b({ font: e || void 0 })
				});
			}
			O(r);
			var o = I(r, 2), s = N(o), c = I(s);
			G(c), O(o);
			var l = I(o, 2);
			{
				let e = /* @__PURE__ */ A(() => Y("calendar.fieldWeight")), t = /* @__PURE__ */ A(() => h().bold === !0 ? "bold" : h().bold === !1 ? "normal" : ""), n = /* @__PURE__ */ A(() => [
					["", Y("common.inherit")],
					["bold", Y("format.bold")],
					["normal", Y("calendar.fieldNormal")]
				]);
				eu(l, {
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
			O(f);
			var g = I(f, 2);
			let _;
			var v = F(N(g), !0);
			O(g);
			var y = I(g, 2);
			{
				let e = /* @__PURE__ */ A(() => h().color ?? ""), t = /* @__PURE__ */ A(u), n = /* @__PURE__ */ A(() => Y("calendar.fieldColor"));
				Na(y, {
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
			O(d), L((e, t, n, r, a, l, u, d, h, y, b) => {
				H(i, `${e ?? ""} `), J(o, "title", t), H(s, `${n ?? ""} `), J(c, "min", ls.min), J(c, "max", ls.max), K(c, r), J(c, "placeholder", a), p = Ei(f, 1, "tbtn", null, p, { active: l }), J(f, "title", u), H(m, d), _ = Ei(g, 1, "tbtn", null, _, { active: h }), J(g, "title", y), H(v, b);
			}, [
				() => Y("calendar.fieldFont"),
				() => Y("tip.calendar.fieldSize"),
				() => Y("calendar.fieldSize"),
				() => h().size ?? "",
				() => Y("common.inherit"),
				() => h().italic === !0,
				() => Y("format.italic"),
				() => Y("format.italicLetter"),
				() => h().underline === !0,
				() => Y("calendar.fieldUnderline"),
				() => Y("format.underlineLetter")
			]), z("change", c, (e) => b({ size: e.target.value === "" ? void 0 : Math.max(ls.min, Math.min(ls.max, Number(e.target.value) || ls.min)) })), z("click", f, () => b({ italic: !h().italic || void 0 })), z("click", g, () => b({ underline: !h().underline || void 0 })), V(e, t);
		}, s = /* @__PURE__ */ A(() => ts(R(r).props.design)), c = /* @__PURE__ */ A(ne);
		var l = _f(), d = P(l), g = N(d), _ = N(g), x = F(_, !0), S = F(I(_), !0);
		O(g), Mo(I(g, 2), { id: "design" }), O(d);
		var C = I(d, 2);
		{
			let e = /* @__PURE__ */ A(() => Y("calendar.section.options"));
			Wc(C, {
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
			let e = /* @__PURE__ */ A(() => Y("calendar.colors"));
			Wc(w, {
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
			let e = /* @__PURE__ */ A(() => Y("calendar.stripe"));
			Wc(T, {
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
		var E = I(T, 2);
		{
			let e = /* @__PURE__ */ A(() => Y("calendar.fieldStyle"));
			Wc(E, {
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
			J(g, "title", e), H(x, t), H(S, n);
		}, [
			() => Y("tip.calendar.design"),
			() => Y("calendar.design"),
			() => Y(R(s).labelKey)
		]), z("click", g, function(...e) {
			n.openDesignPicker?.apply(this, e);
		}), V(e, l);
	};
	U(ie, (e) => {
		t.area === "content" ? e(ae) : t.area === "style" && e(oe, 1);
	}), V(e, re), et();
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
				label: Y("form.newField"),
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
			let e = /* @__PURE__ */ A(() => R(r).props.mode ?? "mailto"), t = /* @__PURE__ */ A(() => [["mailto", Y("form.modeMailto")], ["endpoint", Y("form.modeEndpoint")]]);
			Ao(c, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => a("mode", e)
			});
		}
		O(n);
		var m = I(n, 2), h = (e) => {
			var t = yf(), n = N(t), i = I(n);
			G(i), O(t), L((e, a, o) => {
				J(t, "title", e), H(n, `${a ?? ""} `), K(i, R(r).props.endpoint ?? ""), J(i, "placeholder", o);
			}, [
				() => Y("form.endpointNote"),
				() => Y("form.endpoint"),
				() => Y("form.endpointPh")
			]), z("change", i, (e) => a("endpoint", e.target.value.trim())), V(e, t);
		}, g = (e) => {
			var t = bf(), n = P(t), i = N(n), o = I(i);
			G(o), O(n);
			var s = I(n, 2), c = N(s), l = I(c);
			G(l), O(s), L((e, t, n, a) => {
				H(i, `${e ?? ""} `), K(o, R(r).props.recipient ?? ""), J(o, "placeholder", t), H(c, `${n ?? ""} `), K(l, R(r).props.subject ?? ""), J(l, "placeholder", a);
			}, [
				() => Y("form.recipient"),
				() => Y("form.recipientPh"),
				() => Y("form.subject"),
				() => Y("form.subjectPh")
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
				let e = /* @__PURE__ */ A(() => R(t).type ?? "text"), r = /* @__PURE__ */ A(() => o.map((e) => [e, Y(`form.type${e[0].toUpperCase()}${e.slice(1)}`)]));
				Ao(d, {
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
			W(h, () => X.up, !0), O(h);
			var g = I(h, 2);
			W(g, () => X.down, !0), O(g);
			var _ = I(g, 2);
			W(_, () => X.cross, !0), O(_), O(m), O(a);
			var v = I(a, 2), y = N(v);
			G(y);
			var b = I(y);
			O(v);
			var x = I(v, 2), S = (e) => {
				var r = xf();
				G(r), L((e, t) => {
					K(r, e), J(r, "placeholder", t);
				}, [() => (R(t).options ?? []).join(", "), () => Y("form.optionsPh")]), z("change", r, (e) => u(R(n), e.target.value)), V(e, r);
			}, C = /* @__PURE__ */ A(() => s.has(R(t).type));
			U(x, (e) => {
				R(C) && e(S);
			}), L((e, i, a) => {
				K(c, R(t).label), J(c, "placeholder", e), h.disabled = R(n) === 0, g.disabled = R(n) === (R(r).props.fields?.length ?? 0) - 1, J(_, "title", i), q(y, R(t).required === !0), H(b, ` ${a ?? ""}`);
			}, [
				() => Y("form.fieldNamePh"),
				() => Y("form.removeField"),
				() => Y("form.required")
			]), z("change", c, (e) => l(R(n), { label: e.target.value.trim() || Y("form.fieldFallback") })), z("click", h, () => p(R(n), -1)), z("click", g, () => p(R(n), 1)), z("click", _, () => f(R(n))), z("change", y, (e) => l(R(n), { required: e.target.checked })), V(e, i);
		});
		var b = I(y, 2), x = F(b, !0), S = I(b, 2), C = N(S), w = I(C);
		G(w), O(S);
		var T = I(S, 2), E = N(T), ee = I(E);
		G(ee), O(T), L((e, t, a, o, s, c, l, u) => {
			J(n, "title", e), H(i, `${t ?? ""} `), H(v, a), H(x, o), H(C, `${s ?? ""} `), K(w, R(r).props.submitLabel ?? ""), J(w, "placeholder", c), H(E, `${l ?? ""} `), K(ee, R(r).props.successText ?? ""), J(ee, "placeholder", u);
		}, [
			() => Y("form.modeTitle"),
			() => Y("form.mode"),
			() => Y("form.fields"),
			() => Y("form.addField"),
			() => Y("lbl.buttonText"),
			() => Y("form.sendDefault"),
			() => Y("form.receipt"),
			() => Y("form.thanksDefault")
		]), z("click", b, d), z("change", w, (e) => a("submitLabel", e.target.value.trim() || Y("form.sendDefault"))), z("change", ee, (e) => a("successText", e.target.value.trim() || Y("form.thanksDefault"))), V(e, t);
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
				q: Y("seed.faq.newQ"),
				a: Y("seed.faq.answer")
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
		O(n);
		var d = I(n, 2), f = F(d, !0), p = I(d, 2);
		ni(p, 17, () => R(r).props.items ?? [], Qr, (e, t, n) => {
			var i = Tf(), a = N(i);
			G(a);
			var o = I(a, 2), c = N(o);
			c.disabled = n === 0, W(c, () => X.up, !0), O(c);
			var d = I(c, 2);
			W(d, () => X.down, !0), O(d);
			var f = I(d, 2);
			W(f, () => X.cross, !0), O(f), O(o), O(i), L((e, i) => {
				K(a, R(t).q), J(a, "title", e), d.disabled = n === (R(r).props.items?.length ?? 0) - 1, J(f, "title", i);
			}, [() => Y("tip.faq.question"), () => Y("tip.faq.remove")]), z("change", a, (e) => s(n, { q: e.target.value })), z("click", c, () => u(n, -1)), z("click", d, () => u(n, 1)), z("click", f, () => l(n)), V(e, i);
		});
		var m = I(p, 2), h = F(m, !0);
		L((e, t, r, a, s) => {
			J(n, "title", e), q(i, t), H(o, ` ${r ?? ""}`), H(f, a), H(h, s);
		}, [
			() => Y("tip.faq.multi"),
			() => !!R(r).props.multi,
			() => Y("lbl.faqMulti"),
			() => Y("lbl.questions"),
			() => Y("ui.addQuestion")
		]), z("change", i, (e) => a("multi", e.target.checked)), z("click", m, c), V(e, t);
	}, m = (e) => {
		var t = Of(), n = P(t);
		{
			let e = /* @__PURE__ */ A(() => Y("lbl.variant")), t = /* @__PURE__ */ A(() => R(r).props.variant === "list" ? "list" : "cards"), i = /* @__PURE__ */ A(() => o.map((e) => [e, Y(`opt.faqVariant.${e}`)]));
			eu(n, {
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
			ll(I(n, 2), {}), L((e) => H(r, e), [() => Y("lbl.cardStyle")]), V(e, t);
		};
		U(i, (e) => {
			R(r).props.variant !== "list" && e(s);
		}), De(2), V(e, t);
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
				title: Y("seed.timeline.newTitle"),
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
			f.disabled = n === 0, W(f, () => X.up, !0), O(f);
			var p = I(f, 2);
			W(p, () => X.down, !0), O(p);
			var m = I(p, 2);
			W(m, () => X.cross, !0), O(m), O(d), O(a);
			var h = I(a, 2);
			G(h), L((e, i, a, s, l, u) => {
				K(o, R(t).year), J(o, "placeholder", e), J(o, "title", i), K(c, R(t).title), J(c, "title", a), p.disabled = n === (R(r).props.items?.length ?? 0) - 1, J(m, "title", s), K(h, R(t).text), J(h, "placeholder", l), J(h, "title", u);
			}, [
				() => Y("ph.tlYear"),
				() => Y("tip.timeline.year"),
				() => Y("tip.timeline.title"),
				() => Y("tip.timeline.remove"),
				() => Y("ph.tlText"),
				() => Y("tip.timeline.text")
			]), z("change", o, (e) => s(n, { year: e.target.value })), z("change", c, (e) => s(n, { title: e.target.value })), z("click", f, () => u(n, -1)), z("click", p, () => u(n, 1)), z("click", m, () => l(n)), z("change", h, (e) => s(n, { text: e.target.value })), V(e, i);
		});
		var o = I(a, 2), d = F(o, !0);
		L((e, t) => {
			H(i, e), H(d, t);
		}, [() => Y("lbl.timelineItems"), () => Y("ui.addTlItem")]), z("click", o, c), V(e, t);
	}, m = (e) => {
		var t = Mf(), n = P(t), i = N(n), s = I(i);
		{
			let e = /* @__PURE__ */ A(() => R(r).props.variant ?? "left"), t = /* @__PURE__ */ A(() => [["left", Y("opt.timeline.left")], ["alternating", Y("opt.timeline.alternating")]]);
			Ao(s, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => a("variant", e)
			});
		}
		O(n);
		var c = I(n, 2), l = N(c), u = I(l);
		{
			let e = /* @__PURE__ */ A(() => R(r).props.marker ?? "filled"), t = /* @__PURE__ */ A(() => [["filled", Y("opt.timeline.filled")], ["ring", Y("opt.timeline.ring")]]);
			Ao(u, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => a("marker", e)
			});
		}
		O(c);
		var d = I(c, 2), f = N(d), p = I(f);
		{
			let e = /* @__PURE__ */ A(() => R(r).props.accent ?? "accent"), t = /* @__PURE__ */ A(o);
			Na(p, {
				get value() {
					return R(e);
				},
				get tokens() {
					return R(t);
				},
				onchange: (e) => a("accent", e === "accent" ? null : e)
			});
		}
		O(d), De(2), L((e, t, n) => {
			H(i, `${e ?? ""} `), H(l, `${t ?? ""} `), H(f, `${n ?? ""} `);
		}, [
			() => Y("lbl.variant"),
			() => Y("lbl.timelineMarker"),
			() => Y("lbl.color")
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
		G(o), O(n);
		var s = I(n, 2), c = N(s), l = I(c);
		G(l), O(s);
		var u = I(s, 2), d = N(u), f = I(d);
		G(f), O(u), L((e, t, n) => {
			H(i, `${e ?? ""} `), K(o, R(r).props.text ?? ""), H(c, `${t ?? ""} `), K(l, R(r).props.attribution ?? ""), H(d, `${n ?? ""} `), K(f, R(r).props.role ?? "");
		}, [
			() => Y("lbl.quoteText"),
			() => Y("lbl.quoteName"),
			() => Y("lbl.quoteRole")
		]), z("change", o, (e) => a("text", e.target.value)), z("change", l, (e) => a("attribution", e.target.value)), z("change", f, (e) => a("role", e.target.value)), V(e, t);
	}, m = (e) => {
		var t = Rf(), n = P(t), i = N(n), o = I(i);
		{
			let e = /* @__PURE__ */ A(() => R(r).props.variant ?? "large"), t = /* @__PURE__ */ A(() => [["large", Y("opt.quote.large")], ["short", Y("opt.quote.short")]]);
			Ao(o, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => a("variant", e)
			});
		}
		O(n);
		var s = I(n, 2), c = (e) => {
			var t = If(), n = P(t), i = N(n), o = I(i);
			O(n);
			var s = I(n, 2), c = (e) => {
				var t = Ff(), n = F(t, !0);
				L((e) => H(n, e), [() => Y("ui.quotePortraitRemove")]), z("click", t, () => a("image", "")), V(e, t);
			};
			U(s, (e) => {
				R(r).props.image && e(c);
			}), L((e) => H(i, `${e ?? ""} `), [() => Y("ui.quotePortrait")]), z("change", o, u), V(e, t);
		}, d = (e) => {
			var t = Lf(), n = N(t);
			G(n);
			var i = I(n);
			O(t), L((e, a) => {
				J(t, "title", e), q(n, R(r).props.card === !0), H(i, ` ${a ?? ""}`);
			}, [() => Y("tip.quote.card"), () => Y("lbl.quoteCard")]), z("change", n, (e) => a("card", e.target.checked)), V(e, t);
		};
		U(s, (e) => {
			R(r).props.variant === "short" ? e(c) : e(d, -1);
		});
		var f = I(s, 2), p = N(f), m = I(p);
		{
			let e = /* @__PURE__ */ A(() => R(r).props.accent ?? "accent"), t = /* @__PURE__ */ A(l);
			Na(m, {
				get value() {
					return R(e);
				},
				get tokens() {
					return R(t);
				},
				onchange: (e) => a("accent", e === "accent" ? null : e)
			});
		}
		O(f), De(2), L((e, t) => {
			H(i, `${e ?? ""} `), H(p, `${t ?? ""} `);
		}, [() => Y("lbl.variant"), () => Y("lbl.color")]), V(e, t);
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
		G(o), O(n);
		var s = I(n, 2), c = N(s), l = I(c);
		G(l), O(s);
		var u = I(s, 2), d = N(u), f = I(d);
		G(f), O(u);
		var p = I(u, 2), m = N(p), h = I(m);
		G(h), O(p), L((e, t, n, i, s) => {
			H(a, `${e ?? ""} `), K(o, R(r).props.value ?? ""), J(o, "title", t), H(c, `${n ?? ""} `), K(l, R(r).props.prefix ?? ""), H(d, `${i ?? ""} `), K(f, R(r).props.suffix ?? ""), H(m, `${s ?? ""} `), K(h, R(r).props.label ?? "");
		}, [
			() => Y("lbl.statValue"),
			() => Y("tip.stat.value"),
			() => Y("lbl.statPrefix"),
			() => Y("lbl.statSuffix"),
			() => Y("lbl.statLabel")
		]), z("change", o, (e) => i("value", e.target.value)), z("change", l, (e) => i("prefix", e.target.value)), z("change", f, (e) => i("suffix", e.target.value)), z("change", h, (e) => i("label", e.target.value)), V(e, t);
	}, l = (e) => {
		var t = Vf(), n = P(t);
		{
			let e = /* @__PURE__ */ A(() => Y("lbl.variant")), t = /* @__PURE__ */ A(() => a.includes(R(r).props.variant) ? R(r).props.variant : "plain"), o = /* @__PURE__ */ A(() => a.map((e) => [e, Y(`opt.statVariant.${e}`)]));
			eu(n, {
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
		O(o), De(2), L((e, t) => {
			J(o, "title", e), q(s, R(r).props.countUp !== !1), H(c, ` ${t ?? ""}`);
		}, [() => Y("tip.stat.countUp"), () => Y("lbl.statCountUp")]), z("change", s, (e) => i("countUp", e.target.checked)), V(e, t);
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
		O(n);
		var u = I(n, 2), d = N(u), f = F(d, !0), p = I(d, 2), m = F(p, !0);
		O(u);
		var h = I(u, 2), g = N(h);
		G(g);
		var _ = I(g);
		O(h), L((e, t, n, i, a, o) => {
			H(s, e), H(l, t), H(f, n), H(m, i), J(h, "title", a), q(g, R(r).props.header !== !1), H(_, ` ${o ?? ""}`);
		}, [
			() => Y("ui.addRow"),
			() => Y("ui.removeRow"),
			() => Y("ui.addColumn"),
			() => Y("ui.removeColumn"),
			() => Y("tip.table.header"),
			() => Y("lbl.tableHeader")
		]), z("click", i, () => o(1, 0)), z("click", c, () => o(-1, 0)), z("click", d, () => o(0, 1)), z("click", p, () => o(0, -1)), z("change", g, (e) => a("header", e.target.checked)), V(e, t);
	}, u = (e) => {
		var t = Wf(), n = P(t), i = N(n), o = I(i);
		{
			let e = /* @__PURE__ */ A(() => R(r).props.lines ?? "rows"), t = /* @__PURE__ */ A(() => [
				["rows", Y("opt.table.rows")],
				["grid", Y("opt.table.grid")],
				["none", Y("common.none")]
			]);
			Ao(o, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => a("lines", e)
			});
		}
		O(n);
		var s = I(n, 2), c = N(s);
		G(c);
		var l = I(c);
		O(s), De(2), L((e, t, n) => {
			H(i, `${e ?? ""} `), q(c, t), H(l, ` ${n ?? ""}`);
		}, [
			() => Y("lbl.tableLines"),
			() => !!R(r).props.striped,
			() => Y("lbl.tableStriped")
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
			["email", Y("opt.share.email")],
			["copy", Y("opt.share.copy")]
		], ([e, t]) => e, (e, t) => {
			var n = /* @__PURE__ */ A(() => h(R(t), 2));
			let i = () => R(n)[0], a = () => R(n)[1];
			var o = Kf(), c = N(o);
			G(c);
			var l = I(c);
			O(o), L((e) => {
				q(c, e), H(l, ` ${a() ?? ""}`);
			}, [() => (R(r).props.services ?? []).includes(i())]), z("change", c, (e) => s(i(), e.target.checked)), V(e, o);
		}), V(e, t);
	}, d = (e) => {
		var t = qf(), n = P(t), i = N(n), s = I(i);
		{
			let e = /* @__PURE__ */ A(() => R(r).props.variant ?? "icons"), t = /* @__PURE__ */ A(() => [["icons", Y("opt.share.icons")], ["labels", Y("opt.share.labels")]]);
			Ao(s, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => a("variant", e)
			});
		}
		O(n);
		var c = I(n, 2), l = N(c), u = I(l);
		G(u), O(c);
		var d = I(c, 2), f = N(d), p = I(f);
		{
			let e = /* @__PURE__ */ A(() => R(r).props.color || "accent"), t = /* @__PURE__ */ A(o);
			Na(p, {
				get value() {
					return R(e);
				},
				get tokens() {
					return R(t);
				},
				onchange: (e) => a("color", e === "accent" ? "" : e)
			});
		}
		O(d), De(2), L((e, t, n) => {
			H(i, `${e ?? ""} `), H(l, `${t ?? ""} `), K(u, R(r).props.size ?? 38), H(f, `${n ?? ""} `);
		}, [
			() => Y("lbl.variant"),
			() => Y("lbl.size"),
			() => Y("lbl.color")
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
		G(o), O(n);
		var s = I(n, 2), c = N(s), l = I(c);
		G(l), O(s), L((e, t, n) => {
			H(a, `${e ?? ""} `), K(o, R(r).props.target ?? ""), J(s, "title", t), H(c, `${n ?? ""} `), K(l, R(r).props.doneText ?? "");
		}, [
			() => Y("lbl.countdownTarget"),
			() => Y("tip.countdown.done"),
			() => Y("lbl.countdownDone")
		]), z("change", o, (e) => i("target", e.target.value)), z("change", l, (e) => i("doneText", e.target.value)), V(e, t);
	}, c = (e) => {
		var t = Xf(), n = P(t), a = N(n), o = I(a);
		{
			let e = /* @__PURE__ */ A(() => R(r).props.variant ?? "boxes"), t = /* @__PURE__ */ A(() => [["boxes", Y("opt.countdown.boxes")], ["plain", Y("opt.countdown.plain")]]);
			Ao(o, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => i("variant", e)
			});
		}
		O(n);
		var s = I(n, 2), c = N(s);
		G(c);
		var l = I(c);
		O(s), De(2), L((e, t) => {
			H(a, `${e ?? ""} `), q(c, R(r).props.showSeconds !== !1), H(l, ` ${t ?? ""}`);
		}, [() => Y("lbl.variant"), () => Y("lbl.countdownSeconds")]), z("change", c, (e) => i("showSeconds", e.target.checked)), V(e, t);
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
			i("src", String(n.result ?? "")), t.size > 4e5 && a(Y("status.audioLarge", { kb: Math.round(t.size / 1024) }), "error");
		}, n.onerror = () => a(Y("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	var s = Vr(), c = P(s), l = (e) => {
		var t = $f(), n = P(t), a = N(n), s = I(a);
		O(n);
		var c = I(n, 2), l = (e) => {
			var t = Qf(), n = F(t, !0);
			L((e) => H(n, e), [() => Y("ui.removeAudio")]), z("click", t, () => i("src", "")), V(e, t);
		};
		U(c, (e) => {
			R(r).props.src && e(l);
		});
		var u = I(c, 2), d = N(u), f = I(d);
		G(f), O(u);
		var p = I(u, 2), m = N(p);
		G(m);
		var h = I(m);
		O(p), L((e, t, i, o, s) => {
			J(n, "title", e), H(a, `${t ?? ""} `), H(d, `${i ?? ""} `), K(f, R(r).props.title ?? ""), q(m, o), H(h, ` ${s ?? ""}`);
		}, [
			() => Y("tip.blocks.audioFile"),
			() => Y("ui.chooseAudio"),
			() => Y("lbl.audioTitle"),
			() => !!R(r).props.loop,
			() => Y("lbl.audioLoop")
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
			let e = /* @__PURE__ */ A(() => R(r).props.collection ?? ""), t = /* @__PURE__ */ A(() => [["", Y("common.choose")], ...R(i).map((e) => [e, R(a)[e]?.name ?? e])]);
			Ao(c, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => o("collection", e || null)
			});
		}
		O(n);
		var l = I(n, 2), u = N(l), d = I(u);
		G(d), O(l);
		var f = I(l, 2), p = N(f);
		G(p);
		var m = I(p);
		O(f), L((e, t, i, a, o) => {
			J(n, "title", e), H(s, `${t ?? ""} `), J(l, "title", i), H(u, `${a ?? ""} `), K(d, R(r).props.limit ?? 6), q(p, R(r).props.newestFirst !== !1), H(m, ` ${o ?? ""}`);
		}, [
			() => Y("tip.collection.source"),
			() => Y("blocks.collection"),
			() => Y("tip.collection.limit"),
			() => Y("lbl.maxCount"),
			() => Y("lbl.newestFirst")
		]), z("change", d, (e) => o("limit", Number(e.target.value))), z("change", p, (e) => o("newestFirst", e.target.checked)), V(e, t);
	}, u = (e) => {
		var t = np(), n = P(t), i = N(n), a = I(i);
		{
			let e = /* @__PURE__ */ A(() => R(r).props.view ?? "cards"), t = /* @__PURE__ */ A(() => [
				["cards", Y("opt.collectionView.cards")],
				["list", Y("opt.collectionView.list")],
				["archive", Y("opt.collectionView.archive")]
			]);
			Ao(a, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => o("view", e)
			});
		}
		O(n), De(2), L((e) => H(i, `${e ?? ""} `), [() => Y("lbl.view")]), V(e, t);
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
			let e = /* @__PURE__ */ A(() => R(r).props.collection ?? ""), t = /* @__PURE__ */ A(() => [["", Y("common.choose")], ...R(i).filter((e) => R(a)[e]?.kind === "products").map((e) => [e, R(a)[e]?.name ?? e])]);
			Ao(d, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => o("collection", e || null)
			});
		}
		O(l);
		var f = I(l, 2), p = (e) => {
			var t = ip(), i = N(t), a = F(i, !0), o = I(i, 2), c = F(o, !0);
			O(t), L((e, t, n, r) => {
				J(i, "title", e), H(a, t), J(o, "title", n), H(c, r);
			}, [
				() => Y("tip.product.addProduct"),
				() => Y("ui.addProduct"),
				() => Y("tip.product.editCatalog"),
				() => Y("ui.editCatalog")
			]), z("click", i, () => s(R(r).props.collection)), z("click", o, () => n.openCollection(R(r).props.collection)), V(e, t);
		}, m = (e) => {
			var t = ap(), n = F(t, !0);
			L((e, r) => {
				J(t, "title", e), H(n, r);
			}, [() => Y("tip.product.createCatalog"), () => Y("ui.createCatalog")]), z("click", t, c), V(e, t);
		}, h = /* @__PURE__ */ A(() => !R(i).some((e) => R(a)[e]?.kind === "products"));
		U(f, (e) => {
			R(r).props.collection && R(a)[R(r).props.collection]?.kind === "products" ? e(p) : R(h) && e(m, 1);
		});
		var g = I(f, 2), _ = N(g), v = I(_);
		G(v), O(g);
		var y = I(g, 2), b = N(y), x = I(b);
		G(x), O(y), L((e, t, n, i, a, o) => {
			J(l, "title", e), H(u, `${t ?? ""} `), J(g, "title", n), H(_, `${i ?? ""} `), K(v, R(r).props.limit ?? 0), J(y, "title", a), H(b, `${o ?? ""} `), K(x, R(r).props.currency ?? "kr");
		}, [
			() => Y("tip.product.source"),
			() => Y("blocks.collection"),
			() => Y("tip.collection.limit"),
			() => Y("lbl.maxCount"),
			() => Y("tip.product.currency"),
			() => Y("lbl.currency")
		]), z("change", v, (e) => o("limit", Number(e.target.value))), z("change", x, (e) => o("currency", e.target.value)), V(e, t);
	}, f = (e) => {
		var t = sp(), n = P(t), i = N(n), a = I(i);
		G(a), O(n), De(2), L((e, t) => {
			J(n, "title", e), H(i, `${t ?? ""} `), K(a, R(r).props.columns ?? 0);
		}, [() => Y("tip.product.columns"), () => Y("lbl.columns")]), z("change", a, (e) => o("columns", Number(e.target.value))), V(e, t);
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
			let e = /* @__PURE__ */ A(() => R(r).props.href ?? ""), t = /* @__PURE__ */ A(() => [["", Y("common.none")], ...R(i).pages.map((e) => [e.path, e.title])]);
			Ao(s, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => a("href", e)
			});
		}
		O(n);
		var c = I(n, 2), l = N(c), u = I(l);
		G(u), O(c), L((e, t, i, a) => {
			J(n, "title", e), H(o, `${t ?? ""} `), J(c, "title", i), H(l, `${a ?? ""} `), K(u, R(r).props.currency ?? "kr");
		}, [
			() => Y("tip.cart.checkout"),
			() => Y("lbl.checkoutPage"),
			() => Y("tip.product.currency"),
			() => Y("lbl.currency")
		]), z("change", u, (e) => a("currency", e.target.value)), V(e, t);
	}, l = (e) => {
		var t = up(), n = P(t), i = N(n), o = I(i);
		{
			let e = /* @__PURE__ */ A(() => R(r).props.variant ?? "button"), t = /* @__PURE__ */ A(() => [["button", Y("opt.cart.button")], ["icon", Y("opt.cart.icon")]]);
			Ao(o, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => a("variant", e)
			});
		}
		O(n), De(2), L((e) => H(i, `${e ?? ""} `), [() => Y("lbl.view")]), V(e, t);
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
		G(o), O(n);
		var s = I(n, 2), c = N(s), l = I(c);
		G(l), O(s);
		var u = I(s, 2), d = N(u), f = I(d);
		G(f), O(u);
		var p = I(u, 2), m = N(p);
		G(m);
		var h = I(m);
		O(p);
		var g = I(p, 2), _ = N(g), v = I(_);
		G(v), O(g), L((e, t, i, y, b, x, S, C, w, T) => {
			J(n, "title", e), H(a, `${t ?? ""} `), K(o, R(r).props.recipient ?? ""), J(s, "title", i), H(c, `${y ?? ""} `), K(l, R(r).props.endpoint ?? ""), J(u, "title", b), H(d, `${x ?? ""} `), K(f, R(r).props.vipps ?? ""), J(p, "title", S), q(m, R(r).props.vippsCheckout === !0), H(h, ` ${C ?? ""}`), J(g, "title", w), H(_, `${T ?? ""} `), K(v, R(r).props.currency ?? "kr");
		}, [
			() => Y("tip.checkout.recipient"),
			() => Y("lbl.recipientEmail"),
			() => Y("tip.checkout.endpoint"),
			() => Y("lbl.endpointUrl"),
			() => Y("tip.checkout.vipps"),
			() => Y("lbl.vippsNumber"),
			() => Y("tip.checkout.vippsCheckout"),
			() => Y("lbl.vippsCheckout"),
			() => Y("tip.product.currency"),
			() => Y("lbl.currency")
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
			text: Y("props.place.searching"),
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
				text: sa(s) ?? Y("props.place.notFound"),
				err: !0
			};
		} catch {
			hp[n] = {
				text: Y("props.place.failed"),
				err: !0
			};
		} finally {
			M(gp, !1);
		}
	}
	let l = { map: [{
		key: "location",
		type: "place",
		label: Y("lbl.mapLocation"),
		placeholder: Y("ph.mapLocation")
	}, {
		key: "zoom",
		type: "number",
		label: Y("lbl.mapZoom"),
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
					G(s), O(a);
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
						H(o, `${R(t).label ?? ""} `), J(s, "placeholder", R(t).placeholder), K(s, mp[R(n)] ?? R(r).props[R(t).key] ?? ""), l.disabled = R(gp), H(u, e);
					}, [() => Y("props.place.search")]), z("input", s, (e) => {
						mp[R(n)] = e.target.value;
					}), z("keydown", s, (e) => {
						e.key === "Enter" && c(R(t));
					}), z("click", l, () => c(R(t))), V(e, i);
				}, l = (e) => {
					var n = yp(), i = N(n), o = I(i);
					G(o), O(n), L(() => {
						H(i, `${R(t).label ?? ""} `), J(o, "min", R(t).min), J(o, "max", R(t).max), J(o, "step", R(t).step ?? 1), K(o, R(r).props[R(t).key]);
					}), z("change", o, (e) => a(R(t).key, s(R(t), Number(e.target.value)))), V(e, n);
				}, u = (e) => {
					var n = bp(), i = N(n);
					G(i);
					var o = I(i);
					O(n), L((e) => {
						q(i, e), H(o, ` ${R(t).label ?? ""}`);
					}, [() => !!R(r).props[R(t).key]]), z("change", i, (e) => a(R(t).key, e.target.checked)), V(e, n);
				}, d = (e) => {
					var n = xp(), i = N(n), o = I(i);
					{
						let e = /* @__PURE__ */ A(() => (R(t).options ?? []).map((e) => [e.value, e.label]));
						Ao(o, {
							get value() {
								return R(r).props[R(t).key];
							},
							get options() {
								return R(e);
							},
							onchange: (e) => a(R(t).key, e)
						});
					}
					O(n), L(() => H(i, `${R(t).label ?? ""} `)), V(e, n);
				}, f = (e) => {
					var n = Sp(), i = N(n), o = I(i);
					G(o), O(n), L(() => {
						H(i, `${R(t).label ?? ""} `), J(o, "placeholder", R(t).placeholder), K(o, R(r).props[R(t).key] ?? "");
					}), z("change", o, (e) => a(R(t).key, e.target.value)), V(e, n);
				};
				U(i, (e) => {
					R(t).type === "place" ? e(o) : R(t).type === "number" ? e(l, 1) : R(t).type === "toggle" ? e(u, 2) : R(t).type === "select" ? e(d, 3) : e(f, -1);
				}), V(e, n);
			}), V(e, n);
		}, f = (e) => {
			var t = Cp(), i = F(t, !0);
			L((e, n) => {
				J(t, "title", e), H(i, n);
			}, [() => Y("hint.pluginBlock"), () => Y("ui.settings")]), z("click", t, () => n.bridge?.sendOpenConfig(R(r).blockId)), V(e, t);
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
	al(e, {});
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
		text: hl,
		button: yl,
		image: Zl,
		video: cu,
		icon: Hu,
		shape: Yu,
		gallery: sd,
		ribbon: Ed,
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
	}, _ = /* @__PURE__ */ A(() => g[R(a).type] ?? wp), v = Ki(t, "query", 3, "");
	function y() {
		let e = oo(R(a).type), t = new Map(b().map((e) => [e.id, e]));
		return qa(R(a).type, e, new Set(t.keys())).map((e) => t.get(e));
	}
	function b() {
		let e = R(a), t = [];
		e.type === "calendar" && (t.push({
			id: "design",
			label: Y("calendar.design"),
			kind: "open",
			value: Y(ts(e.props.design).labelKey),
			run: i.openDesignPicker
		}), [
			"list",
			"cards",
			"agenda"
		].includes(ns(e.props)) && t.push({
			id: "limit",
			label: Y("lbl.maxCount"),
			kind: "number",
			min: 1,
			max: 50,
			value: e.props.limit ?? 6,
			set: (e) => o("limit", Math.max(1, Math.min(50, Number(e) || 6)))
		}), t.push({
			id: "subscribe",
			label: Y("quick.subscribe"),
			kind: "choice",
			value: e.props.showSubscribe === !1 ? "off" : "on",
			options: [["on", Y("common.on")], ["off", Y("common.off")]],
			set: (e) => o("showSubscribe", e === "on")
		}));
		let n = xc.has(e.type);
		t.push({
			id: "fit",
			label: Y("quick.fit"),
			kind: "choice",
			value: e.fit === "shrink" || e.fit === "both" ? e.fit : "wrap",
			options: n ? [["wrap", Y("quick.fit.fluid")], ["shrink", Y("quick.fit.floor")]] : [
				["wrap", Y("quick.fit.wrap")],
				...d() || e.fit === "shrink" ? [["shrink", Y("quick.fit.shrink")]] : [],
				["both", Y("quick.fit.both")]
			],
			set: (e) => s(e)
		}), t.push({
			id: "phone",
			label: Y("quick.phone"),
			kind: "choice",
			value: e.hideMobile ? "off" : "on",
			options: [["on", Y("quick.phone.show")], ["off", Y("quick.phone.hide")]],
			set: (e) => u(e === "off")
		});
		let r = e.props;
		if (e.type === "text") t.push({
			id: "align",
			label: Y("lbl.align"),
			kind: "choice",
			value: r.align ?? "left",
			options: [
				["left", Y("common.left")],
				["center", Y("common.center")],
				["right", Y("common.right")]
			],
			set: (e) => o("align", e)
		}), t.push({
			id: "textBox",
			label: Y("group.textBox"),
			kind: "choice",
			value: r.box ? "on" : "off",
			options: lo(),
			set: (e) => o("box", e === "on")
		});
		else if (e.type === "button") t.push({
			id: "goesTo",
			label: Y("lbl.goesTo"),
			kind: "select",
			value: r.page ?? "__href",
			options: f(),
			set: p
		}), t.push({
			id: "btnStyle",
			label: Y("lbl.style"),
			kind: "select",
			value: r.style ?? "primary",
			options: [["primary", Y("opt.btn.primary")], ["secondary", Y("opt.btn.secondary")]],
			set: (e) => o("style", e)
		});
		else if (e.type === "image") t.push({
			id: "imgFit",
			label: Y("lbl.imageFit"),
			kind: "select",
			value: r.fit ?? "cover",
			options: [["cover", Y("opt.fitFrame.cover")], ["contain", Y("opt.fitFrame.contain")]],
			set: (e) => o("fit", e)
		}), t.push({
			id: "radius",
			label: Y("group.corners"),
			kind: "choice",
			value: r.radius ?? "",
			options: [
				["", Y("common.none")],
				["sm", Y("opt.size.sm")],
				["md", Y("opt.radius.md")]
			],
			set: (e) => o("radius", e || null)
		});
		else if (e.type === "video") t.push({
			id: "videoSource",
			label: Y("lbl.videoSource"),
			kind: "choice",
			value: r.source === "file" ? "file" : "embed",
			options: [["embed", Y("opt.videoSource.embed")], ["file", Y("opt.videoSource.file")]],
			set: (e) => o("source", e)
		});
		else if (e.type === "icon") t.push({
			id: "iconSize",
			label: Y("lbl.sizePx"),
			kind: "number",
			min: 8,
			max: 400,
			value: r.size ?? 48,
			set: (e) => o("size", Math.max(8, Math.min(400, Number(e) || 48)))
		}), t.push({
			id: "iconColor",
			label: Y("lbl.color"),
			kind: "color",
			value: r.color ?? "accent",
			set: (e) => o("color", e)
		});
		else if (e.type === "gallery") {
			let e = pc(r.view);
			t.push({
				id: "galleryView",
				label: Y("lbl.view"),
				kind: "select",
				value: e,
				options: lc.map((e) => [e, Y(`opt.galleryView.${e}`)]),
				set: (e) => o("view", e)
			}), uc.includes(e) && t.push({
				id: "columns",
				label: Y("lbl.columns"),
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
				label: Y("lbl.ribbonMotion"),
				kind: "select",
				value: e,
				options: po(),
				set: (e) => o("motion", e)
			}), (e === "roll" || e === "sway") && t.push({
				id: "speed",
				label: Y("lbl.ribbonSpeed"),
				kind: "number",
				min: 10,
				max: 300,
				step: 5,
				value: r.speed ?? 60,
				set: (e) => o("speed", Math.max(10, Math.min(300, Number(e) || 60)))
			});
		} else e.type === "shape" && (t.push({
			id: "shapeColor",
			label: Y("lbl.color"),
			kind: "select",
			value: r.color ?? "accent",
			options: xo(),
			set: (e) => o("color", e)
		}), t.push({
			id: "thickness",
			label: Y("lbl.thickness"),
			kind: "number",
			min: 1,
			max: 40,
			value: r.thickness ?? 2,
			set: (e) => o("thickness", Math.max(1, Math.min(40, Number(e) || 2)))
		}));
		return Sc.has(e.type) || t.push({
			id: "size",
			label: Y("lbl.scale"),
			kind: "number",
			min: Cc.min * 100,
			max: Cc.max * 100,
			step: 5,
			value: Math.round(Tc(e) * 100),
			set: (e) => {
				l(), c(Math.min(Cc.max, Math.max(Cc.min, (Number(e) || 100) / 100))), l();
			}
		}), t;
	}
	var x = Ip(), S = P(x), C = (e) => {
		var t = Mp(), n = N(t);
		ni(n, 17, y, (e) => e.id, (e, t) => {
			var n = Ap(), r = N(n), i = N(r), a = F(i, !0);
			Mo(I(i), { get id() {
				return R(t).id;
			} }), O(r);
			var o = I(r, 2), s = (e) => {
				var n = Ep(), r = F(n, !0);
				L(() => H(r, R(t).value)), z("click", n, function(...e) {
					R(t).run?.apply(this, e);
				}), V(e, n);
			}, c = (e) => {
				var n = Dp();
				G(n), L(() => {
					J(n, "min", R(t).min), J(n, "max", R(t).max), J(n, "step", R(t).step ?? 1), K(n, R(t).value), J(n, "aria-label", R(t).label);
				}), z("change", n, (e) => R(t).set(e.target.value)), V(e, n);
			}, l = (e) => {
				Ao(e, {
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
					Na(e, {
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
						J(o, "aria-pressed", R(t).value === i()), s = Ei(o, 1, "", null, s, { on: R(t).value === i() }), H(c, a());
					}), z("click", o, () => R(t).set(i())), V(e, o);
				}), O(n), L(() => J(n, "aria-label", R(t).label)), V(e, n);
			};
			U(o, (e) => {
				R(t).kind === "open" ? e(s) : R(t).kind === "number" ? e(c, 1) : R(t).kind === "select" ? e(l, 2) : R(t).kind === "color" ? e(u, 3) : e(d, -1);
			}), O(n), L(() => H(a, R(t).label)), V(e, n);
		});
		var r = I(n, 2), i = (e) => {
			var t = jp(), n = F(t, !0);
			L((e) => H(n, e), [() => Y("menu.quickReset")]), z("click", t, () => so(R(a).type, Ga)), V(e, t);
		}, o = /* @__PURE__ */ A(() => Xa(oo(R(a).type)));
		U(r, (e) => {
			R(o) && e(i);
		}), O(t), V(e, t);
	}, w = /* @__PURE__ */ A(() => !v().trim());
	U(S, (e) => {
		R(w) && e(C);
	});
	var T = I(S, 2), E = (e) => {
		var i = Np();
		let a;
		var o = N(i), s = N(o), c = F(s, !0), l = I(s);
		n(l);
		var u = F(I(l), !0);
		O(o);
		var d = I(o, 2), f = N(d), p = F(f, !0), m = I(f);
		r(m);
		var h = F(I(m), !0);
		O(d);
		var g = I(d, 2), _ = N(g), y = F(_, !0), b = I(_);
		Tp(b);
		var x = F(I(b), !0);
		O(g), O(i), bi(i, () => Bc(v(), Mc)), L((e, n, r, o, s, l) => {
			a = Ei(i, 1, "emenu-cols emenu-search", null, a, { stacked: !t.wide }), H(c, e), H(u, n), H(p, r), H(h, o), H(y, s), H(x, l);
		}, [
			() => Y("props.tabContent"),
			() => Y("menu.noMatch"),
			() => Y("props.tabStyle"),
			() => Y("menu.noMatch"),
			() => Y("props.tabPlacement"),
			() => Y("menu.noMatch")
		]), V(e, i);
	}, ee = /* @__PURE__ */ A(() => v().trim()), te = (e) => {
		var t = Pp(), i = N(t), a = N(i), o = F(a, !0), s = I(a);
		n(s), O(i);
		var c = I(i, 2), l = N(c), u = F(l, !0), d = I(l);
		r(d), O(c);
		var f = I(c, 2), p = N(f), m = F(p, !0);
		Tp(I(p)), O(f), O(t), L((e, t, n) => {
			H(o, e), H(u, t), H(m, n);
		}, [
			() => Y("props.tabContent"),
			() => Y("props.tabStyle"),
			() => Y("props.tabPlacement")
		]), V(e, t);
	}, ne = (e) => {
		var t = Fp(), i = P(t), a = N(i), o = N(a);
		let s;
		var c = F(o, !0), l = I(o, 2);
		let u;
		var d = F(l, !0), f = I(l, 2);
		let p;
		var m = F(f, !0);
		O(a), O(i);
		var h = I(i, 2), g = (e) => {
			n(e);
		}, _ = (e) => {
			r(e);
		}, v = (e) => {
			Tp(e);
		};
		U(h, (e) => {
			eo.tab === "content" ? e(g) : eo.tab === "style" ? e(_, 1) : e(v, -1);
		}), L((e, t, n) => {
			s = Ei(o, 1, "", null, s, { on: eo.tab === "content" }), H(c, e), u = Ei(l, 1, "", null, u, { on: eo.tab === "style" }), H(d, t), p = Ei(f, 1, "", null, p, { on: eo.tab === "placement" }), H(m, n);
		}, [
			() => Y("props.tabContent"),
			() => Y("props.tabStyle"),
			() => Y("props.tabPlacement")
		]), z("click", o, () => eo.tab = "content"), z("click", l, () => eo.tab = "style"), z("click", f, () => eo.tab = "placement"), V(e, t);
	};
	U(T, (e) => {
		R(ee) ? e(E) : t.wide ? e(te, 1) : e(ne, -1);
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
		J(n, "placeholder", e), J(n, "aria-label", t), J(n, "title", r);
	}, [
		() => Y("menu.search"),
		() => Y("menu.search"),
		() => Y("tip.menu.search")
	]), z("keydown", n, (e) => {
		e.key === "Escape" && t.get() && (e.stopPropagation(), t.set(""));
	}), Ii(n, t.get, t.set), V(e, n), et();
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
		get: () => eo.menuQuery,
		set: (e) => eo.menuQuery = e
	});
	var u = I(l, 2);
	W(u, () => eo.wide ? "<svg viewBox=\"0 0 18 18\" width=\"14\" height=\"14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M2 4l4 5-4 5M16 4l-4 5 4 5\"/></svg>" : "<svg viewBox=\"0 0 18 18\" width=\"14\" height=\"14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M6 4L2 9l4 5M12 4l4 5-4 5\"/></svg>", !0), O(u);
	var d = I(u, 2);
	W(d, () => X.cross, !0), O(d), O(o);
	var f = I(o, 2), p = N(f);
	{
		let e = /* @__PURE__ */ A(to);
		Lp(p, {
			get wide() {
				return R(e);
			},
			get query() {
				return eo.menuQuery;
			}
		});
	}
	O(f), O(i), L((e, n, r, o, s) => {
		a = Ei(i, 1, "block-menu", null, a, { wide: e }), Oi(i, `--menu-left: ${t.pos.left ?? ""}px; --menu-top: ${t.pos.top ?? ""}px; --menu-min: ${eo.min ?? ""}px`), H(c, n), J(u, "title", r), J(u, "aria-label", o), J(d, "title", s);
	}, [
		() => to(),
		() => Y("blocks.suffix", { label: n.blockLabel(R(r).type) }),
		() => eo.wide ? Y("menu.toNarrow") : Y("menu.toWide"),
		() => eo.wide ? Y("menu.toNarrow") : Y("menu.toWide"),
		() => Y("tip.closeEsc")
	]), z("click", u, () => eo.wide = !eo.wide), z("click", d, function(...e) {
		t.onclose?.apply(this, e);
	}), V(e, i), et();
}
Mr(["click"]);
//#endregion
//#region ../template/assets/engine/0.7.4/blocks/form.js
var Hp = () => [
	{
		id: "navn",
		label: Y("form.fieldName"),
		type: "text",
		required: !0
	},
	{
		id: "epost",
		label: Y("form.fieldEmail"),
		type: "email",
		required: !0
	},
	{
		id: "melding",
		label: Y("form.fieldMessage"),
		type: "textarea",
		required: !0
	}
];
//#endregion
//#region ../template/assets/engine/0.7.4/sections/presets.js
function Up(e) {
	return typeof crypto < "u" && crypto.randomUUID ? `${e}-${crypto.randomUUID().slice(0, 8)}` : `${e}-${[...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4))].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
var Wp = () => ({ mobile: {
	mode: "auto",
	attention: null
} }), Q = (e, t, n, r, i = 1) => ({
	desktop: {
		x: e,
		y: t,
		w: n,
		h: r,
		z: i,
		rot: 0
	},
	mobile: null
}), Gp = (e, t, n = {}) => ({
	id: Up("blk"),
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
}), Kp = (e, t = {}) => ({
	id: Up("blk"),
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
}), qp = (e, t, n = {}) => ({
	id: Up("blk"),
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
}), Jp = (e, t, n = 40) => ({
	id: Up("blk"),
	type: "icon",
	version: 1,
	props: {
		glyph: t,
		color: "accent",
		size: n
	},
	animation: null,
	frames: e
}), Yp = (e, t = {}) => ({
	id: Up("blk"),
	type: "map",
	version: 2,
	props: {
		location: "",
		zoom: 15,
		...t
	},
	animation: null,
	frames: e
}), Xp = (e, t = {}) => ({
	id: Up("blk"),
	type: "form",
	version: 1,
	props: {
		recipient: "",
		subject: "",
		mode: "mailto",
		endpoint: "",
		submitLabel: Y("form.sendDefault"),
		successText: Y("form.thanksDefault"),
		fields: Hp(),
		...t
	},
	animation: null,
	frames: e
}), Zp = (e, t = {}) => ({
	id: Up("blk"),
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
}), Qp = () => ({
	type: "hover-lift",
	version: 1,
	props: {}
}), $p = (e, t, n = {}) => ({
	id: Up("blk"),
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
}), em = (e, t = {}) => ({
	id: Up("blk"),
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
}), tm = (e, t = {}) => ({
	id: Up("blk"),
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
}), nm = (e, t = {}) => ({
	id: Up("blk"),
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
}), rm = (e, t = {}) => ({
	id: Up("blk"),
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
}), im = (e, t) => ({
	id: Up("blk"),
	type: "faq",
	version: 1,
	props: {
		items: t,
		multi: !1
	},
	animation: null,
	frames: e
}), am = (e, t = {}) => ({
	id: Up("blk"),
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
}), om = (e, t) => ({
	id: Up("blk"),
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
}), sm = (e, t = {}) => ({
	id: Up("blk"),
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
}), cm = (...e) => ({
	version: 1,
	layers: e
}), lm = (e) => ({
	type: "color",
	version: 1,
	props: { value: e }
}), um = (e, t, n, r = .5) => ({
	type: "glow",
	version: 1,
	props: {
		x: e,
		y: t,
		color: "accent",
		radius: r,
		opacity: n
	}
}), dm = (e) => Math.max(0, ...e.blocks.map((e) => e.frames.desktop.y + e.frames.desktop.h)), fm = (e, t, n, r, i, a) => ({
	x: n + e % t * r,
	y: i + Math.floor(e / t) * a
}), pm = (e, t, n, r, i, a, o, s, c = 0) => {
	let l = (t) => e.blocks.some((e) => {
		let n = e.frames.desktop;
		return n.x < t.x + t.w - .01 && t.x < n.x + n.w - .01 && n.y < t.y + t.h - .01 && t.y < n.y + n.h - .01;
	});
	for (let e = 0; e < 60; e++) {
		let u = fm(e, t, n, r, i, a);
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
		y: dm(e) + 16,
		n: 0
	};
}, mm = (e, t, n) => e + t * .1 + n * .01, hm = (e, t, n, r, i = null) => ({
	id: Up("sec"),
	version: 1,
	preset: e,
	size: { minHeight: t },
	grid: i,
	background: n,
	blocks: r,
	responsive: Wp()
});
function gm(e) {
	e.sections.define("blank", {
		label: "Empty section",
		labelKey: "preset.blank.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "A blank canvas to build on freely",
		hintKey: "preset.blank.hint",
		create: () => hm("blank", "40vh", cm(lm("bg")), [])
	}), e.sections.define("hero", {
		label: "Hero",
		labelKey: "preset.hero.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Large opening with gradient and glow, left-aligned",
		hintKey: "preset.hero.hint",
		create: () => hm("hero", "70vh", {
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
				um(.7, .2, .35),
				{
					type: "grain",
					version: 1,
					props: { opacity: .06 }
				}
			]
		}, [
			Gp(Q(8.33, 40, 50, 38), Y("seed.hero.title")),
			Gp(Q(8.33, 84, 41.67, 26), Y("seed.hero.intro")),
			qp(Q(8.33, 118, 20, 32), Y("seed.readMore"))
		])
	}), e.sections.define("hero-centered", {
		label: "Hero, centred",
		labelKey: "preset.hero-centered.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Centred opening with two buttons",
		hintKey: "preset.hero-centered.hint",
		create: () => hm("hero-centered", "60vh", cm(lm("bg")), [
			Gp(Q(15, 64, 70, 44), Y("seed.heroCenter.title"), { align: "center" }),
			Gp(Q(25, 116, 50, 26), Y("seed.heroCenter.intro"), { align: "center" }),
			qp(Q(31.5, 160, 17, 40), Y("seed.join")),
			qp(Q(51.5, 160, 17, 40), Y("seed.readMore"), { style: "secondary" })
		])
	}), e.sections.define("hero-image", {
		label: "Hero over a photo",
		labelKey: "preset.hero-image.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Opening over a photo that creeps slowly, with a veil under the text",
		hintKey: "preset.hero-image.hint",
		create: () => {
			let e = hm("hero-image", "70vh", {
				version: 1,
				layers: [
					lm("bg"),
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
				Gp(Q(8.33, 40, 50, 38), Y("seed.hero.title")),
				Gp(Q(8.33, 84, 41.67, 26), Y("seed.hero.intro")),
				qp(Q(8.33, 118, 20, 32), Y("seed.readMore"))
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
			let e = hm("hero-photos", "70vh", {
				version: 1,
				layers: [
					lm("bg"),
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
				Gp(Q(15, 64, 70, 44), Y("seed.heroCenter.title"), { align: "center" }),
				Gp(Q(25, 116, 50, 26), Y("seed.heroCenter.intro"), { align: "center" }),
				qp(Q(41.5, 160, 17, 40), Y("seed.readMore"))
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
		create: () => hm("images", "360px", cm(lm("bg")), [
			Gp(Q(4, 24, 50, 32), Y("seed.images.title")),
			Kp(Q(4, 72, 28, 220)),
			Kp(Q(36, 72, 28, 220)),
			Kp(Q(68, 72, 28, 220))
		]),
		itemLabel: "image",
		itemLabelKey: "item.image",
		item: (e) => {
			let { x: t, y: n } = pm(e, 3, 4, 32, 72, 244, 28, 220);
			return {
				blocks: [Kp(Q(t, n, 28, 220))],
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
		create: () => hm("gallery", "440px", cm(lm("bg")), [Gp(Q(4, 24, 50, 32), Y("seed.gallery.title")), rm(Q(4, 72, 92, 320))])
	}), e.sections.define("find-us", {
		label: "Find us",
		labelKey: "preset.find-us.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Map with your address (privacy-friendly OpenStreetMap)",
		hintKey: "preset.find-us.hint",
		create: () => hm("find-us", "480px", cm(lm("bg")), [Gp(Q(6, 40, 60, 70), Y("seed.findUs.title")), Yp(Q(6, 120, 88, 360, 2))])
	}), e.sections.define("whats-on", {
		label: "What is on",
		labelKey: "preset.whats-on.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Event list from a subscribable calendar (iCal/Google)",
		hintKey: "preset.whats-on.hint",
		create: () => hm("whats-on", "520px", cm(lm("bg")), [Gp(Q(6, 40, 60, 70), Y("seed.whatsOn.title")), Zp(Q(6, 130, 88, 320, 2), { limit: 5 })])
	});
	let t = (t, n, r) => e.sections.define(t, {
		label: `What is on: ${t.slice(9)}`,
		labelKey: `preset.${t}.label`,
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Events from a subscribable calendar (iCal/Google)",
		hintKey: `preset.${t}.hint`,
		create: () => hm(t, n, cm(lm("bg")), [Gp(Q(6, 40, 60, 70), Y("seed.whatsOn.title")), r()])
	});
	t("whats-on-cards", "560px", () => Zp(Q(6, 130, 88, 360, 2), {
		view: "cards",
		limit: 6
	})), t("whats-on-month", "720px", () => Zp(Q(6, 130, 88, 520, 2), { view: "month" })), t("whats-on-week", "560px", () => Zp(Q(6, 130, 88, 360, 2), {
		view: "week",
		design: "weekStrip"
	})), t("whats-on-next", "460px", () => Zp(Q(6, 130, 48, 260, 2), {
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
		create: () => hm("contact-form", "520px", cm(lm("bg")), [Gp(Q(6, 40, 60, 120), Y("seed.contactForm.intro")), Xp(Q(6, 180, 60, 380, 2))])
	}), e.sections.define("contact", {
		label: "Contact",
		labelKey: "preset.contact.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Contact details in a card with an email button",
		hintKey: "preset.contact.hint",
		create: () => hm("contact", "320px", cm(lm("surface"), um(.2, .8, .2)), [
			Gp(Q(10, 32, 40, 36), Y("seed.contact.title")),
			Gp(Q(10, 84, 36, 130), Y("seed.contact.info"), { box: !0 }),
			qp(Q(60, 100, 22, 40), Y("seed.contact.button"), { href: `mailto:${Y("seed.email")}` })
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
				let i = Jp(Q(e + 10.5, 88, 4, 52), n), a = Gp(Q(e, 152, 25, 200), Y("seed.features.card", { title: r }), {
					align: "center",
					box: !0
				});
				return a.animation = Qp(), i.mobileOrder = mm(88, t, 0), a.mobileOrder = mm(88, t, 1), [i, a];
			};
			return hm("feature-cards", "420px", cm(lm("bg")), [
				Gp(Q(6, 28, 60, 38), Y("seed.features.title")),
				...e(6, 0, "✦", Y("seed.features.card1")),
				...e(37.5, 1, "★", Y("seed.features.card2")),
				...e(69, 2, "✓", Y("seed.features.card3"))
			]);
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = pm(e, 3, 6, 31.5, 152, 296, 25, 264, -64), i = Jp(Q(t + 10.5, n - 64, 4, 52), "✦"), a = Gp(Q(t, n, 25, 200), Y("seed.features.card", { title: Y("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return a.animation = Qp(), i.mobileOrder = mm(88, r, 0), a.mobileOrder = mm(88, r, 1), {
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
				let r = Gp(Q(e, 88, 25, 200), Y("seed.features.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.animation = Qp(), r.mobileOrder = mm(88, t, 0), r;
			};
			return hm("feature-cards-simple", "360px", cm(lm("bg")), [
				Gp(Q(6, 28, 60, 38), Y("seed.features.title")),
				e(6, 0, Y("seed.features.card1")),
				e(37.5, 1, Y("seed.features.card2")),
				e(69, 2, Y("seed.features.card3"))
			]);
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = pm(e, 3, 6, 31.5, 88, 232, 25, 200), i = Gp(Q(t, n, 25, 200), Y("seed.features.card", { title: Y("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.animation = Qp(), i.mobileOrder = mm(88, r, 0), {
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
				let n = Kp(Q(e, 88, 25, 160)), r = Gp(Q(e, 256, 25, 160), Y("seed.news.card"));
				return n.mobileOrder = mm(88, t, 0), r.mobileOrder = mm(88, t, 1), [n, r];
			};
			return hm("news", "460px", cm(lm("bg")), [
				Gp(Q(6, 28, 50, 38), Y("seed.news.title")),
				qp(Q(78, 30, 16, 36), Y("seed.news.seeAll"), { style: "secondary" }),
				...e(6, 0),
				...e(37.5, 1),
				...e(69, 2)
			]);
		},
		itemLabel: "story",
		itemLabelKey: "item.story",
		item: (e) => {
			let { x: t, y: n, n: r } = pm(e, 3, 6, 31.5, 88, 344, 25, 328), i = Kp(Q(t, n, 25, 160)), a = Gp(Q(t, n + 168, 25, 160), Y("seed.news.card"));
			return i.mobileOrder = mm(88, r, 0), a.mobileOrder = mm(88, r, 1), {
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
		create: () => hm("news-collection", "300px", cm(lm("bg")), [Gp(Q(6, 28, 50, 38), Y("seed.news.title")), $p(Q(6, 88, 88, 180), "cards")])
	}), e.sections.define("noticeboard", {
		label: "Noticeboard",
		labelKey: "preset.noticeboard.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Dated list from a collection (notices/announcements)",
		hintKey: "preset.noticeboard.hint",
		create: () => hm("noticeboard", "300px", cm(lm("surface")), [Gp(Q(6, 28, 50, 38), Y("seed.noticeboard.title")), $p(Q(6, 88, 88, 180), "list", { limit: 8 })])
	}), e.sections.define("publication-archive", {
		label: "Publication archive",
		labelKey: "preset.publication-archive.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Year-grouped archive from a collection (issues, minutes, reports)",
		hintKey: "preset.publication-archive.hint",
		create: () => hm("publication-archive", "300px", cm(lm("bg")), [Gp(Q(6, 28, 60, 38), Y("seed.archive.title")), $p(Q(6, 88, 88, 180), "archive", { limit: 0 })])
	}), e.sections.define("events", {
		label: "Events",
		labelKey: "preset.events.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Three rows with date badge and sign-up button",
		hintKey: "preset.events.hint",
		create: () => {
			let e = (e, t, n, r) => [
				Gp(Q(6, e, 8, 88), Y("seed.events.dateBadge", {
					day: t,
					month: n
				}), {
					align: "center",
					box: !0
				}),
				Gp(Q(16, e, 58, 88), Y("seed.events.row", { title: r })),
				qp(Q(78, e + 24, 16, 40), Y("seed.events.signup"), { style: "secondary" })
			];
			return hm("events", "440px", cm(lm("surface")), [
				Gp(Q(6, 28, 50, 38), Y("seed.events.title")),
				...e(88, "11", Y("seed.events.monthAug"), Y("seed.events.row1")),
				...e(196, "25", Y("seed.events.monthAug"), Y("seed.events.row2")),
				...e(304, "8", Y("seed.events.monthSep"), Y("seed.events.row3"))
			]);
		},
		itemLabel: "row",
		itemLabelKey: "item.row",
		item: (e) => {
			let t = dm(e) + 16;
			return {
				blocks: [
					Gp(Q(6, t, 8, 88), Y("seed.events.newBadge"), {
						align: "center",
						box: !0
					}),
					Gp(Q(16, t, 58, 88), Y("seed.events.row", { title: Y("seed.events.newTitle") })),
					qp(Q(78, t + 24, 16, 40), Y("seed.events.signup"), { style: "secondary" })
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
				let r = Kp(Q(e, 80, 22, 180), { alt: Y("seed.team.alt") }), i = Gp(Q(e, 268, 22, 84), Y("seed.team.member", { role: n }), { align: "center" });
				return r.mobileOrder = mm(80, t, 0), i.mobileOrder = mm(80, t, 1), [r, i];
			};
			return hm("team", "420px", cm(lm("surface")), [
				Gp(Q(6, 24, 50, 32), Y("seed.team.title")),
				...e(7.5, 0, Y("seed.team.role1")),
				...e(39, 1, Y("seed.team.role2")),
				...e(70.5, 2, Y("seed.team.role3"))
			]);
		},
		itemLabel: "person",
		itemLabelKey: "item.person",
		item: (e) => {
			let { x: t, y: n, n: r } = pm(e, 3, 7.5, 31.5, 80, 288, 22, 272), i = Kp(Q(t, n, 22, 180), { alt: Y("seed.team.alt") }), a = Gp(Q(t, n + 188, 22, 84), Y("seed.team.member", { role: Y("seed.team.roleNew") }), { align: "center" });
			return i.mobileOrder = mm(80, r, 0), a.mobileOrder = mm(80, r, 1), {
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
		create: () => hm("faq", "520px", cm(lm("bg")), [
			Gp(Q(25, 24, 50, 36), Y("seed.faq.title"), { align: "center" }),
			im(Q(20, 80, 60, 320), [
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
			Gp(Q(20, 416, 60, 32), Y("seed.faq.more"), { align: "center" })
		])
	}), e.sections.define("timeline", {
		label: "Timeline",
		labelKey: "preset.timeline.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Your story as events along a line",
		hintKey: "preset.timeline.hint",
		create: () => hm("timeline", "480px", cm(lm("bg")), [Gp(Q(25, 24, 50, 36), Y("seed.timeline.title"), { align: "center" }), om(Q(25, 88, 50, 330), [
			{
				year: "2019",
				title: Y("seed.timeline.t1"),
				text: Y("seed.timeline.text")
			},
			{
				year: "2022",
				title: Y("seed.timeline.t2"),
				text: Y("seed.timeline.text")
			},
			{
				year: "2026",
				title: Y("seed.timeline.t3"),
				text: Y("seed.timeline.text")
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
				let r = Gp(Q(e, 88, 25, 72), `<h3>${t + 1}</h3>`, {
					align: "center",
					size: 44
				}), i = Gp(Q(e, 168, 25, 160), Y("seed.steps.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.mobileOrder = mm(88, t, 0), i.mobileOrder = mm(88, t, 1), [r, i];
			};
			return hm("steps", "400px", cm(lm("bg")), [
				Gp(Q(6, 28, 60, 38), Y("seed.steps.title")),
				...e(6, 0, Y("seed.steps.s1")),
				...e(37.5, 1, Y("seed.steps.s2")),
				...e(69, 2, Y("seed.steps.s3"))
			]);
		},
		itemLabel: "step",
		itemLabelKey: "item.step",
		item: (e) => {
			let { x: t, y: n, n: r } = pm(e, 3, 6, 31.5, 88, 272, 25, 240), i = Gp(Q(t, n, 25, 72), `<h3>${r + 1}</h3>`, {
				align: "center",
				size: 44
			}), a = Gp(Q(t, n + 80, 25, 160), Y("seed.steps.card", { title: Y("seed.steps.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.mobileOrder = mm(88, r, 0), a.mobileOrder = mm(88, r, 1), {
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
				Kp(Q(6, 40, 55, 300)),
				Gp(Q(6, 348, 55, 108), Y("seed.feature.main")),
				qp(Q(6, 464, 14, 38), Y("seed.readMore"), { style: "secondary" }),
				Kp(Q(66, 40, 28, 120)),
				Gp(Q(66, 164, 28, 60), Y("seed.feature.small1")),
				Kp(Q(66, 244, 28, 120)),
				Gp(Q(66, 368, 28, 60), Y("seed.feature.small2"))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = mm(40, t < 3 ? 0 : 1, t);
			}), hm("lead-story", "540px", cm(lm("bg")), e);
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
					Kp(Q(e, 88, 25, 200)),
					Gp(Q(e, 296, 25, 76), Y("seed.products.card", {
						name: n,
						price: r
					}), { align: "center" }),
					qp(Q(e + 5, 380, 15, 40), Y("seed.products.buy"))
				];
				return i.forEach((e, n) => {
					e.mobileOrder = mm(88, t, n);
				}), i;
			};
			return hm("products", "470px", cm(lm("bg")), [
				Gp(Q(6, 28, 50, 38), Y("seed.products.title")),
				...e(6, 0, Y("seed.products.name"), Y("seed.products.price1")),
				...e(37.5, 1, Y("seed.products.name"), Y("seed.products.price2")),
				...e(69, 2, Y("seed.products.name"), Y("seed.products.price3"))
			]);
		},
		itemLabel: "product",
		itemLabelKey: "item.product",
		item: (e) => {
			let { x: t, y: n, n: r } = pm(e, 3, 6, 31.5, 88, 348, 25, 332), i = [
				Kp(Q(t, n, 25, 200)),
				Gp(Q(t, n + 208, 25, 76), Y("seed.products.card", {
					name: Y("seed.products.name"),
					price: Y("seed.products.price1")
				}), { align: "center" }),
				qp(Q(t + 5, n + 292, 15, 40), Y("seed.products.buy"))
			];
			return i.forEach((e, t) => {
				e.mobileOrder = mm(88, r, t);
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
		create: () => hm("shop", "544px", cm(lm("bg")), [
			Gp(Q(6, 28, 50, 38), Y("seed.shop.title")),
			tm(Q(78, 88, 16, 48)),
			em(Q(6, 176, 88, 320))
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
				Gp(Q(6, 48, 52, 96), Y("seed.shopHero.title")),
				Gp(Q(6, 152, 40, 48), Y("seed.shopHero.sub")),
				qp(Q(6, 216, 17, 42), Y("seed.shopHero.cta")),
				Kp(Q(62, 40, 32, 300))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = mm(48, t < 3 ? 0 : 1, t);
			}), hm("shop-hero", "400px", {
				version: 1,
				layers: [
					lm("bg"),
					um(.8, .25, .28, .6),
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
				let r = Kp(Q(e, 88, 21, 170)), i = Gp(Q(e, 266, 21, 34), Y("seed.shopCategories.tile", { name: n }), { align: "center" });
				return r.mobileOrder = mm(88, t, 0), i.mobileOrder = mm(88, t, 1), [r, i];
			}, t = hm("shop-categories", "360px", cm(lm("bg")), [
				Gp(Q(6, 28, 60, 38), Y("seed.shopCategories.title")),
				...e(6, 0, Y("seed.shopCategories.cat1")),
				...e(29.5, 1, Y("seed.shopCategories.cat2")),
				...e(53, 2, Y("seed.shopCategories.cat3")),
				...e(76.5, 3, Y("seed.shopCategories.cat4"))
			]);
			return t.theme = "soft", t;
		},
		itemLabel: "category",
		itemLabelKey: "item.category",
		item: (e) => {
			let { x: t, y: n, n: r } = pm(e, 4, 6, 23.5, 88, 220, 21, 212), i = Kp(Q(t, n, 21, 170)), a = Gp(Q(t, n + 178, 21, 34), Y("seed.shopCategories.tile", { name: Y("seed.shopCategories.newCat") }), { align: "center" });
			return i.mobileOrder = mm(88, r, 0), a.mobileOrder = mm(88, r, 1), {
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
				let i = Jp(Q(e + 10.5, 88, 4, 52), r, 44), a = Gp(Q(e, 148, 25, 96), Y(n), { align: "center" });
				return i.mobileOrder = mm(88, t, 0), a.mobileOrder = mm(88, t, 1), [i, a];
			}, t = hm("shop-trust", "300px", cm(lm("bg")), [
				Gp(Q(6, 28, 60, 38), Y("seed.shopTrust.title")),
				...e(6, 0, "seed.shopTrust.t1", "✓"),
				...e(37.5, 1, "seed.shopTrust.t2", "↻"),
				...e(69, 2, "seed.shopTrust.t3", "✉")
			]);
			return t.theme = "muted", t;
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = pm(e, 3, 6, 31.5, 148, 216, 25, 156, -60), i = Jp(Q(t + 10.5, n - 60, 4, 52), "✓", 44), a = Gp(Q(t, n, 25, 96), Y("seed.shopTrust.newItem"), { align: "center" });
			return i.mobileOrder = mm(88, r, 0), a.mobileOrder = mm(88, r, 1), {
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
				Gp(Q(6, 56, 52, 100), Y("seed.shopShowcase.title")),
				Gp(Q(6, 164, 42, 56), Y("seed.shopShowcase.text")),
				qp(Q(6, 236, 18, 42), Y("seed.shopShowcase.cta")),
				Kp(Q(62, 48, 32, 240))
			];
			e.forEach((e, t) => {
				e.mobileOrder = mm(56, t < 3 ? 0 : 1, t);
			});
			let t = hm("shop-showcase", "340px", cm(lm("bg")), e);
			return t.theme = "deep", t;
		}
	}), e.sections.define("checkout", {
		label: "Checkout",
		labelKey: "preset.checkout.label",
		group: "Shop",
		groupKey: "presetGroup.shop",
		hint: "Order form that sends the basket as an email or to an endpoint",
		hintKey: "preset.checkout.hint",
		create: () => hm("checkout", "560px", cm(lm("bg")), [Gp(Q(6, 28, 50, 38), Y("seed.checkout.title")), nm(Q(25, 96, 50, 430))])
	}), e.sections.define("cta", {
		label: "CTA banner",
		labelKey: "preset.cta.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Full width with one clear action",
		hintKey: "preset.cta.hint",
		create: () => hm("cta", "280px", cm(lm("surface"), um(.5, .5, .3, .7)), [
			Gp(Q(20, 56, 60, 40), Y("seed.cta.title"), { align: "center" }),
			Gp(Q(25, 104, 50, 26), Y("seed.cta.sub"), { align: "center" }),
			qp(Q(42, 148, 16, 42), Y("seed.join"))
		])
	}), e.sections.define("quote", {
		label: "Quote",
		labelKey: "preset.quote.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Large quote with attribution",
		hintKey: "preset.quote.hint",
		create: () => hm("quote", "300px", cm(lm("bg")), [am(Q(20, 56, 60, 190), {
			text: Y("seed.quoteBlock.text"),
			attribution: Y("seed.quoteBlock.name"),
			role: Y("seed.quoteBlock.role")
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
				let a = sm(Q(e, 76, 25, 120), {
					value: n,
					suffix: r,
					label: i
				});
				return a.mobileOrder = mm(76, t, 0), a;
			};
			return hm("stats", "260px", cm(lm("surface")), [
				e(6, 0, "120", "+", Y("seed.stats.l1")),
				e(37.5, 1, "25", "", Y("seed.stats.l2")),
				e(69, 2, "1981", "", Y("seed.stats.l3"))
			]);
		},
		itemLabel: "number",
		itemLabelKey: "item.number",
		item: (e) => {
			let { x: t, y: n, n: r } = pm(e, 3, 6, 31.5, 76, 140, 25, 120), i = sm(Q(t, n, 25, 120), {
				value: "42",
				label: Y("seed.stats.newLabel")
			});
			return i.mobileOrder = mm(76, r, 0), {
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
			let e = (e) => Kp(Q(e, 108, 18.5, 100), {
				alt: Y("seed.sponsors.alt"),
				fit: "contain",
				radius: null,
				saturate: 0
			});
			return hm("sponsors", "280px", cm(lm("bg")), [
				Gp(Q(6, 28, 60, 36), Y("seed.sponsors.title")),
				e(5.5),
				e(29),
				e(52.5),
				e(76)
			]);
		},
		itemLabel: "logo",
		itemLabelKey: "item.logo",
		item: (e) => {
			let { x: t, y: n } = pm(e, 4, 5.5, 23.5, 108, 124, 18.5, 100);
			return {
				blocks: [Kp(Q(t, n, 18.5, 100), {
					alt: Y("seed.sponsors.alt"),
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
		create: () => hm("membership", "500px", cm(lm("surface")), [
			Gp(Q(6, 28, 50, 38), Y("seed.membership.title")),
			Gp(Q(14, 88, 32, 250), Y("seed.membership.tier1"), {
				align: "center",
				box: !0
			}),
			Gp(Q(54, 88, 32, 250), Y("seed.membership.tier2"), {
				align: "center",
				box: !0
			}),
			qp(Q(42, 358, 16, 42), Y("seed.join")),
			Gp(Q(25, 414, 50, 30), Y("seed.membership.vipps"), { align: "center" })
		])
	});
}
//#endregion
//#region src/panels/BlocksPanel.svelte
var _m = /* @__PURE__ */ B("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label>"), vm = /* @__PURE__ */ B("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\" multiple=\"\"/></label>"), ym = /* @__PURE__ */ B("<button class=\"ghost\"> </button>"), bm = /* @__PURE__ */ B("<p class=\"panel-hint\"> </p>"), xm = /* @__PURE__ */ B("<details class=\"group\"><summary> </summary> <div class=\"group-items\"></div></details>"), Sm = /* @__PURE__ */ B("<details class=\"group\"><summary> </summary> <div class=\"group-items\"><button class=\"ghost\"> </button> <button class=\"ghost\"> </button></div></details> <button class=\"ghost\"> </button> <label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><button class=\"ghost\"> </button> <label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\" multiple=\"\"/></label></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button></div> <div class=\"group-items\"><button class=\"ghost\"> </button></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button></div></details> <!> <!>", 1), Cm = /* @__PURE__ */ B("<div><input type=\"text\"/> <!></div>");
function wm(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.bridge), i = /* @__PURE__ */ A(() => n.iframeEl), a = /* @__PURE__ */ A(() => n.pluginBlocks), o = /* @__PURE__ */ A(() => n.templateIds), s = /* @__PURE__ */ A(() => n.templateStores), c = /* @__PURE__ */ A(() => n.viewMode), { addCalendarDesign: l, buildBlock: u, compressMany: d, compressOrTrim: f, imageErrorText: p, reportUpload: m, requestPlacement: h, setStatus: g } = n;
	function _(e) {
		h(u(e));
	}
	function v(e, t = {}) {
		let n = Ge(e);
		h({
			id: Up("blk"),
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
	let y = /* @__PURE__ */ j("");
	function b() {
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
				label: Y("blocks.map"),
				act: "block",
				kind: "map"
			},
			{
				label: Y("blocks.form"),
				act: "block",
				kind: "form"
			},
			{
				label: `${Y("blocks.calendar")}: ${Y("calendar.viewList")}`,
				act: "block",
				kind: "calendar"
			},
			{
				label: `${Y("blocks.calendar")}: ${Y("calendar.viewCards")}`,
				act: "block",
				kind: "calendar-cards"
			},
			{
				label: `${Y("blocks.calendar")}: ${Y("calendar.viewMonth")}`,
				act: "block",
				kind: "calendar-month"
			},
			{
				label: `${Y("blocks.calendar")}: ${Y("calendar.viewNext")}`,
				act: "block",
				kind: "calendar-next"
			},
			{
				label: `${Y("blocks.calendar")}: ${Y("calendar.viewAgenda")}`,
				act: "block",
				kind: "calendar-agenda"
			},
			...is().flatMap((e) => e.designs).filter((e) => e.id !== "plain").map((e) => ({
				label: `${Y("blocks.calendar")}: ${Y(e.labelKey)}`,
				act: "calendarDesign",
				design: e.id
			})),
			{
				label: Y("blocks.collection"),
				act: "block",
				kind: "collection"
			},
			{
				label: Y("blocks.faq"),
				act: "block",
				kind: "faq"
			},
			{
				label: Y("blocks.timeline"),
				act: "block",
				kind: "timeline"
			},
			{
				label: Y("blocks.quote"),
				act: "block",
				kind: "quote"
			},
			{
				label: Y("blocks.stats"),
				act: "block",
				kind: "stats"
			},
			{
				label: Y("blocks.ribbon"),
				act: "block",
				kind: "ribbon"
			},
			{
				label: Y("blocks.table"),
				act: "block",
				kind: "table"
			},
			{
				label: Y("blocks.share"),
				act: "block",
				kind: "share"
			},
			{
				label: Y("blocks.countdown"),
				act: "block",
				kind: "countdown"
			},
			{
				label: Y("blocks.audio"),
				act: "block",
				kind: "audio"
			},
			{
				label: Y("blocks.product"),
				act: "block",
				kind: "product"
			},
			{
				label: Y("blocks.cart"),
				act: "block",
				kind: "cart"
			},
			{
				label: Y("blocks.checkout"),
				act: "block",
				kind: "checkout"
			},
			{
				label: Y("ui.emptyGallery"),
				act: "block",
				kind: "gallery"
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
		for (let t of R(o)) {
			let n = R(s)[t]?.data?.mal;
			n?.kind === "blocks" && e.push({
				label: n.name,
				act: "template",
				id: t
			});
		}
		for (let t of R(a)) if (t.variants?.length) for (let n of t.variants) e.push({
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
	function x(e) {
		e.act === "block" ? _(e.kind) : e.act === "calendarDesign" ? l(e.design) : e.act === "plugin" ? v(e.entry, e.props ?? {}) : e.act === "template" && R(r)?.sendInsertTemplate(e.id);
	}
	async function S(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		g(Y("status.compressingImage"));
		let n;
		try {
			n = await f(t);
		} catch (e) {
			g(p(e), "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (R(i)?.clientWidth ?? 1280));
		h({
			id: Up("blk"),
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: Vl(t.name).replaceAll("-", " "),
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
		}), n.bytes > 4e5 ? g(Y("status.imageLarge", { kb: Math.round(n.bytes / 1024) }), "error") : g("");
	}
	async function C(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		g(Y("status.compressingImages"));
		let { images: n, failed: r, big: i } = await d(t);
		if (!n.length) {
			m(0, r, i);
			return;
		}
		let a = u("gallery");
		a.props.images = n, h(a), m(n.length, r, i);
	}
	var w = Cm();
	let T;
	var E = N(w);
	G(E);
	var ee = I(E, 2), te = (e) => {
		var t = Vr();
		ni(P(t), 17, () => Nc(b(), R(y), (e) => e.label), (e) => e.label, (e, t) => {
			var n = Vr(), r = P(n), i = (e) => {
				var n = _m(), r = N(n), i = I(r);
				O(n), L((e) => {
					J(n, "title", e), H(r, `${R(t).label ?? ""} `);
				}, [() => Y("tip.webpAuto")]), z("change", i, S), V(e, n);
			}, a = (e) => {
				var n = vm(), r = N(n), i = I(r);
				O(n), L((e) => {
					J(n, "title", e), H(r, `${R(t).label ?? ""} `);
				}, [() => Y("tip.blocks.galleryImages")]), z("change", i, C), V(e, n);
			}, o = (e) => {
				var n = ym(), r = F(n, !0);
				L(() => H(r, R(t).label)), z("click", n, () => x(R(t))), V(e, n);
			};
			U(r, (e) => {
				R(t).act === "image" ? e(i) : R(t).act === "galleryImages" ? e(a, 1) : e(o, -1);
			}), V(e, n);
		}, (e) => {
			var t = bm(), n = F(t, !0);
			L((e) => H(n, e), [() => Y("canvas.searchEmpty")]), V(e, t);
		}), V(e, t);
	}, ne = /* @__PURE__ */ A(() => R(y).trim()), re = (e) => {
		var t = Sm(), i = P(t), c = N(i), l = F(c, !0), u = I(c, 2), d = N(u), f = F(d, !0), p = I(d, 2), m = F(p, !0);
		O(u), O(i);
		var h = I(i, 2), g = F(h, !0), y = I(h, 2), b = N(y), x = I(b);
		O(y);
		var w = I(y, 2), T = F(w, !0), E = I(w, 2), ee = F(E, !0), te = I(E, 2), ne = F(te, !0), re = I(te, 2), ie = F(re, !0), ae = I(re, 2), oe = F(ae, !0), se = I(ae, 2), ce = F(se, !0), le = I(se, 2), ue = F(le, !0), de = I(le, 2), fe = F(de, !0), pe = I(de, 2), me = F(pe, !0), he = I(pe, 2), ge = F(he, !0), _e = I(he, 2), ve = F(_e, !0), ye = I(_e, 2), be = F(ye, !0), xe = I(ye, 2), Se = F(xe, !0), Ce = I(xe, 2), we = F(Ce, !0), Te = I(Ce, 2), Ee = F(Te, !0), D = I(Te, 2), De = F(D, !0), Oe = I(D, 2), ke = F(Oe, !0), k = I(Oe, 2), Ae = N(k), je = F(Ae, !0), Me = I(Ae, 2), Ne = N(Me), Pe = F(Ne, !0), Fe = I(Ne, 2), Ie = N(Fe), Le = I(Ie);
		O(Fe), O(Me), O(k);
		var Re = I(k, 2), ze = N(Re), Be = F(ze, !0), Ve = I(ze, 2), He = N(Ve), Ue = F(He, !0), We = I(He, 2), Ge = F(We, !0), Ke = I(We, 2), qe = F(Ke, !0), Je = I(Ke, 2), Ye = F(Je, !0), Xe = I(Je, 2), Ze = F(Xe, !0);
		O(Ve);
		var Qe = I(Ve, 2), $e = N(Qe), et = F($e, !0);
		O(Qe), O(Re);
		var tt = I(Re, 2), nt = N(tt), rt = F(nt, !0), it = I(nt, 2), at = N(it), ot = F(at, !0), st = I(at, 2), ct = F(st, !0), lt = I(st, 2), ut = F(lt, !0), dt = I(lt, 2), ft = F(dt, !0), pt = I(dt, 2), mt = F(pt, !0);
		O(it), O(tt);
		var ht = I(tt, 2), gt = (e) => {
			let t = /* @__PURE__ */ A(() => R(o).filter((e) => R(s)[e]?.data?.mal?.kind === "blocks"));
			var n = xm(), i = N(n), a = F(i, !0), c = I(i, 2);
			ni(c, 20, () => R(t), (e) => e, (e, t) => {
				var n = ym(), i = F(n, !0);
				L((e) => {
					J(n, "title", e), H(i, R(s)[t].data.mal.name);
				}, [() => Y("canvas.insertGroup")]), z("click", n, () => R(r)?.sendInsertTemplate(t)), V(e, n);
			}), O(c), O(n), L((e) => H(a, e), [() => Y("canvas.tabMyTemplates")]), V(e, n);
		}, _t = /* @__PURE__ */ A(() => R(o).some((e) => R(s)[e]?.data?.mal?.kind === "blocks"));
		U(ht, (e) => {
			R(_t) && e(gt);
		});
		var vt = I(ht, 2), yt = (e) => {
			var t = xm(), n = N(t), r = F(n, !0), i = I(n, 2);
			ni(i, 21, () => R(a), (e) => e.type, (e, t) => {
				var n = Vr(), r = P(n), i = (e) => {
					var n = xm(), r = N(n), i = F(r, !0), a = I(r, 2);
					ni(a, 21, () => R(t).variants, (e) => e.label, (e, n) => {
						var r = ym(), i = F(r, !0);
						L((e) => {
							J(r, "title", e), H(i, R(n).label);
						}, [() => Y("tip.blocks.fromPlugin", { plugin: R(t).plugin })]), z("click", r, () => v(R(t), R(n).props)), V(e, r);
					}), O(a), O(n), L(() => H(i, R(t).label)), V(e, n);
				}, a = (e) => {
					var n = ym(), r = F(n, !0);
					L((e) => {
						J(n, "title", e), H(r, R(t).label);
					}, [() => Y("tip.blocks.fromPlugin", { plugin: R(t).plugin })]), z("click", n, () => v(R(t))), V(e, n);
				};
				U(r, (e) => {
					R(t).variants?.length ? e(i) : e(a, -1);
				}), V(e, n);
			}), O(i), O(t), L((e) => H(r, e), [() => Y("panel.plugins")]), V(e, t);
		};
		U(vt, (e) => {
			R(a).length && e(yt);
		}), L((e, t, n, r, i, a, o, s, c, u, d, h, _, v, x, S, C, O, k, Ae, Me, Le, Re, ze, Ve, Qe, tt, nt, it, at, st, lt, dt, pt, ht, gt, _t, vt, yt, bt, xt, St, Ct, A, wt, Tt, Et, Dt, Ot, kt, At, jt, Mt, Nt, Pt, Ft, It, Lt, Rt, zt, Bt, Vt, Ht, Ut, Wt) => {
			H(l, e), H(f, t), J(p, "title", n), H(m, r), H(g, i), J(y, "title", a), H(b, `${o ?? ""} `), J(w, "title", s), H(T, c), J(E, "title", u), H(ee, d), J(te, "title", h), H(ne, _), J(re, "title", v), H(ie, x), J(ae, "title", S), H(oe, C), J(se, "title", O), H(ce, k), J(le, "title", Ae), H(ue, Me), J(de, "title", Le), H(fe, Re), J(pe, "title", ze), H(me, Ve), J(he, "title", Qe), H(ge, tt), J(_e, "title", nt), H(ve, it), J(ye, "title", at), H(be, st), J(xe, "title", lt), H(Se, dt), J(Ce, "title", pt), H(we, ht), J(Te, "title", gt), H(Ee, _t), J(D, "title", vt), H(De, yt), J(Oe, "title", bt), H(ke, xt), H(je, St), J(Ne, "title", Ct), H(Pe, A), J(Fe, "title", wt), H(Ie, `${Tt ?? ""} `), H(Be, Et), J(He, "title", Dt), H(Ue, Ot), J(We, "title", kt), H(Ge, At), J(Ke, "title", jt), H(qe, Mt), J(Je, "title", Nt), H(Ye, Pt), J(Xe, "title", Ft), H(Ze, It), J($e, "title", Lt), H(et, Rt), H(rt, zt), H(ot, Bt), H(ct, Vt), H(ut, Ht), H(ft, Ut), H(mt, Wt);
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
			() => Y("tip.blocks.map"),
			() => Y("blocks.map"),
			() => Y("tip.blocks.form"),
			() => Y("blocks.form"),
			() => Y("tip.blocks.collection"),
			() => Y("blocks.collection"),
			() => Y("tip.blocks.faq"),
			() => Y("blocks.faq"),
			() => Y("tip.blocks.timeline"),
			() => Y("blocks.timeline"),
			() => Y("tip.blocks.quote"),
			() => Y("blocks.quote"),
			() => Y("tip.blocks.stats"),
			() => Y("blocks.stats"),
			() => Y("tip.blocks.ribbon"),
			() => Y("blocks.ribbon"),
			() => Y("tip.blocks.table"),
			() => Y("blocks.table"),
			() => Y("tip.blocks.share"),
			() => Y("blocks.share"),
			() => Y("tip.blocks.countdown"),
			() => Y("blocks.countdown"),
			() => Y("tip.blocks.audio"),
			() => Y("blocks.audio"),
			() => Y("tip.blocks.product"),
			() => Y("blocks.product"),
			() => Y("tip.blocks.cart"),
			() => Y("blocks.cart"),
			() => Y("tip.blocks.checkout"),
			() => Y("blocks.checkout"),
			() => Y("blocks.gallery"),
			() => Y("tip.blocks.gallery"),
			() => Y("ui.emptyGallery"),
			() => Y("tip.blocks.galleryImages"),
			() => Y("ui.galleryWithImages"),
			() => Y("blocks.calendar"),
			() => Y("tip.blocks.calendar"),
			() => Y("calendar.viewList"),
			() => Y("tip.blocks.calendar"),
			() => Y("calendar.viewCards"),
			() => Y("tip.blocks.calendar"),
			() => Y("calendar.viewMonth"),
			() => Y("tip.blocks.calendar"),
			() => Y("calendar.viewNext"),
			() => Y("tip.blocks.calendar"),
			() => Y("calendar.viewAgenda"),
			() => Y("tip.calendar.picker.open"),
			() => Y("calendar.picker.open"),
			() => Y("group.shapes"),
			() => Y("shape.line"),
			() => Y("shape.arrow"),
			() => Y("shape.circle"),
			() => Y("shape.rect"),
			() => Y("shape.triangle")
		]), z("click", d, () => _("text")), z("click", p, () => _("text-box")), z("click", h, () => _("button")), z("change", x, S), z("click", w, () => _("video")), z("click", E, () => _("icon")), z("click", te, () => _("map")), z("click", re, () => _("form")), z("click", ae, () => _("collection")), z("click", se, () => _("faq")), z("click", le, () => _("timeline")), z("click", de, () => _("quote")), z("click", pe, () => _("stats")), z("click", he, () => _("ribbon")), z("click", _e, () => _("table")), z("click", ye, () => _("share")), z("click", xe, () => _("countdown")), z("click", Ce, () => _("audio")), z("click", Te, () => _("product")), z("click", D, () => _("cart")), z("click", Oe, () => _("checkout")), z("click", Ne, () => _("gallery")), z("change", Le, C), z("click", He, () => _("calendar")), z("click", We, () => _("calendar-cards")), z("click", Ke, () => _("calendar-month")), z("click", Je, () => _("calendar-next")), z("click", Xe, () => _("calendar-agenda")), z("click", $e, () => n.designPicker = { mode: "add" }), z("click", at, () => _("shape-line")), z("click", st, () => _("shape-arrow")), z("click", lt, () => _("shape-circle")), z("click", dt, () => _("shape-rect")), z("click", pt, () => _("shape-triangle")), V(e, t);
	};
	U(ee, (e) => {
		R(ne) ? e(te) : e(re, -1);
	}), O(w), L((e, t, n) => {
		T = Ei(w, 1, "panel-body", null, T, { locked: R(c) === "mobile" }), J(w, "title", e), J(E, "placeholder", t), J(E, "title", n);
	}, [
		() => R(c) === "mobile" ? Y("tip.blocks.mobileLocked") : void 0,
		() => Y("canvas.searchBlocks"),
		() => Y("canvas.searchBlocks")
	]), Ii(E, () => R(y), (e) => M(y, e)), V(e, w), et();
}
Mr(["change", "click"]);
//#endregion
//#region ../template/assets/engine/0.7.4/divider-model.js
var Tm = [
	"wave",
	"tilt",
	"curve",
	"triangle",
	"zigzag"
], Em = {
	min: 16,
	max: 240,
	dflt: 64
};
//#endregion
//#region ../template/assets/engine/0.7.4/theme.js
function Dm(e, t, n) {
	return t === "light" || t === "dark" ? t : n ? "dark" : "light";
}
function Om(e, t) {
	let n = e.tokens || {}, r = e.scheme === "dark" ? "dark" : "light";
	if (!e.alt?.tokens || t === r) return n;
	let i = {};
	for (let t of /* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(e.alt.tokens)])) i[t] = {
		...n[t],
		...e.alt.tokens[t]
	};
	return i;
}
var km = /^[a-zA-Z0-9#%.,()'"\s+\-*/]+$/;
function Am(e) {
	return typeof e == "string" && km.test(e) && !/url\(|\/\*|\*\/|expression/i.test(e);
}
function jm(e) {
	let t = e.tokens || {}, n = Om(e, "light"), r = Om(e, "dark"), i = e.scheme === "dark" ? "dark" : "light", a = [], o = [], s = [], c = /* @__PURE__ */ new Set([
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
			Am(c) && (a.push(`  --urd-${e}-${l}: ${c};`), i && a.push(`  --urd-base-${l}: ${c};`)), u !== d && (i && Am(u) && Am(d) ? o.push({
				name: l,
				lv: u,
				dv: d
			}) : !i && Am(u) && Am(d) && s.push({
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
	].some((e) => Am(e.color?.["accent-text"])) && Am(t.color?.accent);
	u && Am(t.color?.bg) && (a.push(`  --urd-color-accent-text: ${t.color.bg};`), a.push(`  --urd-base-accent-text: ${t.color.bg};`));
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
function Mm(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
var Nm = {
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
}, Pm = {
	surface: "sectionTheme.surface",
	accent: "sectionTheme.accent",
	inverse: "sectionTheme.inverse",
	soft: "sectionTheme.soft",
	muted: "sectionTheme.muted",
	deep: "sectionTheme.deep",
	highlighted: "sectionTheme.highlighted"
};
[...new Set(Object.values(Nm).flatMap(Object.keys))];
function Fm(e) {
	return Nm[e] ?? {};
}
function Im(e) {
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
function Lm(e, t) {
	let n = Im(e), r = Im(t);
	return n == null || r == null ? null : (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/pattern.js
var Rm = [
	"dots",
	"grid",
	"diagonal",
	"checks",
	"waves",
	"zigzag",
	"plus",
	"triangles"
], zm = {
	min: 8,
	max: 160,
	dflt: 28
}, Bm = .12, Vm = {
	dots: "<circle cx=\"12\" cy=\"12\" r=\"3\"/>",
	grid: "<rect width=\"24\" height=\"1.6\"/><rect width=\"1.6\" height=\"24\"/>",
	diagonal: "<path d=\"M-6 6L6 -6M0 24L24 0M18 30L30 18\" fill=\"none\" stroke=\"#000\" stroke-width=\"4\"/>",
	checks: "<rect width=\"12\" height=\"12\"/><rect x=\"12\" y=\"12\" width=\"12\" height=\"12\"/>",
	waves: "<path d=\"M0 12Q6 4 12 12T24 12\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\"/>",
	zigzag: "<path d=\"M0 16L6 8L12 16L18 8L24 16\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\"/>",
	plus: "<path d=\"M12 7V17M7 12H17\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\" stroke-linecap=\"round\"/>",
	triangles: "<path d=\"M0 24L12 4L24 24Z\"/>"
};
function Hm(e) {
	return Rm.includes(e) ? e : "dots";
}
function Um(e) {
	let t = Number(e);
	return !Number.isFinite(t) || t <= 0 ? zm.dflt : Math.min(zm.max, Math.max(zm.min, Math.round(t)));
}
function Wm(e) {
	let t = Number(e);
	return Number.isFinite(t) ? (Math.round(t) % 360 + 360) % 360 : 0;
}
function Gm(e) {
	let t = Number(e);
	return e == null || e === "" || !Number.isFinite(t) ? Bm : Math.min(1, Math.max(0, t));
}
function Km(e = {}) {
	let t = Um(e.size), n = Wm(e.rotation), r = Vm[Hm(e.pattern)], i = `<pattern id="p" width="${t}" height="${t}" patternUnits="userSpaceOnUse"${n ? ` patternTransform="rotate(${n})"` : ""}><g transform="scale(${t / 24})">${r}</g></pattern>`, a = "<rect width=\"100%\" height=\"100%\" fill=\"url(#p)\"/>";
	return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><defs>${i}</defs>${e.invert === !0 ? `<mask id="m"><rect width="100%" height="100%" fill="#fff"/>${a}</mask><rect width="100%" height="100%" mask="url(#m)"/>` : a}</svg>`;
}
var qm = () => typeof CSS < "u" && typeof CSS.supports == "function" && (CSS.supports("mask-image", "none") || CSS.supports("-webkit-mask-image", "none")), Jm = {
	version: 1,
	label: "Pattern",
	labelKey: "bgLayer.pattern",
	defaults: () => ({
		pattern: "dots",
		color: "text",
		size: zm.dflt,
		opacity: Bm,
		rotation: 0,
		invert: !1
	}),
	migrations: {},
	render(e, t) {
		if (!qm()) return;
		let n = `url("data:image/svg+xml,${encodeURIComponent(Km(t))}")`;
		e.style.backgroundColor = Mm(t.color ?? "text"), e.style.opacity = String(Gm(t.opacity));
		for (let t of ["webkitMask", "mask"]) e.style[`${t}Image`] = n, e.style[`${t}Size`] = "100% 100%", e.style[`${t}Repeat`] = "no-repeat";
	}
}, Ym = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/api\/photo\?[^\s"'<>\\]{1,2048}|\/(?!\/)[\w%./-]*)$/;
function Xm(e) {
	return typeof e == "string" && Ym.test(e);
}
var Zm = /^(?:https?:\/\/|mailto:|tel:)[^\s]+$/i;
function Qm(e) {
	return typeof e == "string" && Zm.test(e.trim());
}
var $m = /^(?:\/(?![/\\])[^\s\\]*|#[^\s]*)$/;
function eh(e) {
	return Qm(e) || typeof e == "string" && $m.test(e.trim());
}
var th = [
	"launcher",
	"cart",
	"theme"
];
function nh(e = {}) {
	let t = Array.isArray(e.tools?.order) ? e.tools.order : [], n = [];
	for (let e of t) th.includes(e) && !n.includes(e) && n.push(e);
	for (let e of th) n.includes(e) || n.push(e);
	return n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/image.js
var rh = .4, ih = [
	"none",
	"kenburns",
	"drift"
], ah = {
	min: 6,
	max: 60,
	dflt: 20
};
function oh(e) {
	return ih.includes(e) ? e : "none";
}
function sh(e) {
	let { min: t, max: n, dflt: r } = ah, i = Number(e);
	return !Number.isFinite(i) || i <= 0 ? r : Math.min(n, Math.max(t, i));
}
function ch(e, t) {
	return `${(e ?? .5) * 100}% ${(t ?? .5) * 100}%`;
}
function lh(e, t) {
	return e === "contain" ? "contain" : e === "cover" ? "cover" : `${Math.max(0, t ?? 1) * 100}%`;
}
function uh(e) {
	let t = "-9999px";
	return e === "up" ? `inset(${t} 0 0 0)` : e === "down" ? `inset(0 0 ${t} 0)` : e === "both" ? `inset(${t} 0 ${t} 0)` : "inset(0)";
}
function dh(e, t, n, r = .18) {
	let i = Math.max(0, Math.min(1, n)) * rh * t;
	return Math.round(Math.min(i, r * e));
}
function fh(e, t, n, r, i) {
	let a = e + t / 2, o = (n / 2 - a) * Math.max(0, Math.min(1, r)) * rh, s = i ?? dh(t, n, r);
	return Math.max(-s, Math.min(s, o)) || 0;
}
var ph = /* @__PURE__ */ new Set(), mh = !1, hh = 0;
function gh() {
	hh = 0;
	for (let e of [...ph]) e() || ph.delete(e);
}
function _h() {
	hh ||= requestAnimationFrame(gh);
}
function vh(e) {
	ph.add(e), e(), !(mh || typeof window > "u") && (mh = !0, window.addEventListener("scroll", _h, { passive: !0 }), window.addEventListener("resize", _h, { passive: !0 }));
}
function yh(e, t, n, r) {
	let i = r === "cover" || r === "tile" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement, o = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
	e.style.willChange = "transform";
	let s = (t) => {
		e.style.top = `-${t}px`, e.style.bottom = `-${t}px`;
	}, c = () => {
		if (!e.isConnected) return !1;
		if (o || document.body.classList.contains("urd-mobile")) return s(n), e.style.transform = "", !0;
		let r = (a ?? e).getBoundingClientRect(), c = window.innerHeight || document.documentElement.clientHeight, l = dh(r.height, c, t, i ? .18 : .6);
		s(i ? Math.max(n, l) : n);
		let u = fh(r.top, r.height, c, t, l);
		return e.style.transform = `translateY(${u.toFixed(1)}px)`, !0;
	};
	vh(c), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(c));
}
function bh() {
	return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("animation-timeline", "view()");
}
var xh = /* @__PURE__ */ new Set(), Sh = !1, Ch = 0;
function wh() {
	Ch = 0;
	for (let e of [...xh]) e() || xh.delete(e);
}
function Th() {
	!Ch && typeof requestAnimationFrame == "function" && (Ch = requestAnimationFrame(wh));
}
function Eh(e) {
	xh.add(e), e(), !(Sh || typeof window > "u") && (Sh = !0, window.addEventListener("resize", Th, { passive: !0 }));
}
function Dh(e, t, n, r) {
	let i = r === "cover" || r === "tile" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement;
	e.style.willChange = "transform", e.classList.add("urd-parallax-css");
	let o = () => {
		if (!e.isConnected) return !1;
		let r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || document.body.classList.contains("urd-mobile"), o = (a ?? e).getBoundingClientRect(), s = window.innerHeight || document.documentElement.clientHeight, c = dh(o.height, s, t, i ? .18 : .6), l = i && !r ? Math.max(n, c) : n;
		return e.style.setProperty("--urd-px-shift", `${c}px`), e.style.top = `-${l}px`, e.style.bottom = `-${l}px`, !0;
	};
	Eh(o), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(o));
}
var Oh = {
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
		motionSpeed: ah.dflt
	}),
	migrations: {
		1: (e) => ({
			...e,
			fit: e.fit === "vanlig" ? "plain" : e.fit === "flislegg" ? "tile" : e.fit === "egen" ? "custom" : e.fit
		}),
		2: (e) => ({
			motion: "none",
			motionSpeed: ah.dflt,
			...e
		})
	},
	render(e, t) {
		let n = !Xm(t.src);
		n && e.classList.add("urd-bg-demo");
		let r = n ? Fs(0) : t.src;
		e.style.opacity = String(t.opacity ?? 1), e.style.clipPath = uh(t.bleed), e.style.zIndex = t.bleed === "down" || t.bleed === "both" ? "1" : "";
		let i = document.createElement("div");
		i.className = "urd-bg-image", i.style.position = "absolute", i.style.left = "0", i.style.right = "0", i.style.top = "0", i.style.bottom = "0";
		let a = oh(t.motion), o = a === "none" ? i : document.createElement("div");
		o !== i && (o.className = `urd-bg-motion urd-bg-motion-${a}`, o.style.position = "absolute", o.style.left = "0", o.style.right = "0", o.style.top = "0", o.style.bottom = "0", o.style.animationDuration = `${sh(t.motionSpeed)}s`, i.appendChild(o));
		let s = t.fit === "tile" || t.fit === "repeat";
		o.style.backgroundImage = `url("${r}")`, o.style.backgroundSize = lh(t.fit, t.size), o.style.backgroundRepeat = s ? "repeat" : "no-repeat", o.style.backgroundPosition = ch(t.x, t.y);
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
		e.appendChild(i), t.parallax > 0 && kh(i, t.parallax, o === i ? c : 0, t.fit ?? "cover");
	}
};
function kh(e, t, n, r) {
	bh() ? Dh(e, t, n, r) : yh(e, t, n, r);
}
//#endregion
//#region ../template/assets/engine/0.7.4/photo-source.js
var Ah = [
	"drive",
	"gphotos",
	"nextcloud",
	"json"
], jh = {
	min: 1,
	max: 60,
	dflt: 24
}, Mh = [
	"name",
	"newest",
	"random"
], Nh = [
	480,
	800,
	1200,
	1600,
	2e3
], Ph = /^[A-Za-z0-9_-]{10,128}$/, Fh = /^(?!\d+(?:\.\d+)*$)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/;
function Ih(e) {
	let t = Number(e);
	return !Number.isFinite(t) || t <= 0 ? jh.dflt : Math.min(jh.max, Math.max(jh.min, Math.round(t)));
}
function Lh(e) {
	let t = typeof e == "string" ? e.trim() : "";
	if (!t) return null;
	if (Ph.test(t) && !t.includes(".")) return {
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
		return Ph.test(t) ? {
			provider: "drive",
			id: t
		} : null;
	}
	if (r === "photos.google.com") {
		let e = /^\/share\/([A-Za-z0-9_-]{10,256})\/?$/.exec(n.pathname), t = n.searchParams.get("key") ?? "";
		return e ? {
			provider: "gphotos",
			id: e[1],
			...Ph.test(t) ? { host: t } : {}
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
	return i && Fh.test(r) ? {
		provider: "nextcloud",
		id: i[1],
		host: r
	} : /\.json$/i.test(n.pathname) && Fh.test(r) ? {
		provider: "json",
		url: n.href
	} : null;
}
function Rh(e) {
	return Mh.includes(e) ? e : "name";
}
var zh = (e) => Rh(e) === "newest" ? "newest" : "name";
function Bh(e, t) {
	if (!e || !Ah.includes(e.provider)) return null;
	let n = new URLSearchParams({
		p: e.provider,
		sort: zh(t),
		max: "200"
	});
	return e.id && n.set("id", e.id), e.host && n.set("host", e.host), e.url && n.set("url", e.url), `/api/photos?${n.toString()}`;
}
function Vh(e, t = 200) {
	return (Array.isArray(e?.photos) ? e.photos : []).filter((e) => typeof e?.src == "string" && e.src.startsWith("/api/photo?")).slice(0, Math.max(1, Math.min(200, Number(t) || 200))).map((e) => ({
		src: e.src,
		name: typeof e.name == "string" ? e.name : ""
	}));
}
function Hh(e) {
	let t = e >>> 0;
	return () => {
		t = t + 1831565813 >>> 0;
		let e = t;
		return e = Math.imul(e ^ e >>> 15, e | 1), e ^= e + Math.imul(e ^ e >>> 7, e | 61), ((e ^ e >>> 14) >>> 0) / 4294967296;
	};
}
function Uh(e, t) {
	let n = [...e], r = Hh(Number(t) || 0);
	for (let e = n.length - 1; e > 0; e--) {
		let t = Math.floor(r() * (e + 1));
		[n[e], n[t]] = [n[t], n[e]];
	}
	return n;
}
function Wh(e, t, n) {
	return Rh(t) === "random" ? Uh(e, n) : [...e];
}
var Gh = 0;
function Kh() {
	return Gh ||= typeof crypto < "u" && crypto.getRandomValues ? crypto.getRandomValues(/* @__PURE__ */ new Uint32Array(1))[0] || 1 : Date.now() >>> 0 || 1, Gh;
}
function qh(e, t = 1) {
	let n = (Number(e) || 0) * Math.min(3, Math.max(1, Number(t) || 1));
	return Nh.find((e) => e >= n) ?? Nh[Nh.length - 1];
}
function Jh(e, t) {
	if (typeof e != "string" || !e.startsWith("/api/photo?")) return e;
	let n = new URLSearchParams(e.slice(11));
	return n.set("w", String(t)), `/api/photo?${n.toString()}`;
}
var Yh = 6e5, Xh = 3e4, Zh = /* @__PURE__ */ new Map(), Qh = /* @__PURE__ */ new Map();
function $h(e) {
	return e?.source === "folder" && typeof e.folder == "string" ? e.folder.trim() : "";
}
function eg(e, t) {
	let n = Bh(Lh(e), t);
	return n ? tg(Zh.get(n)) : null;
}
function tg(e) {
	if (!e) return null;
	let t = e.value.photos.length ? Yh : Xh;
	return Date.now() - e.at < t ? e.value : null;
}
function ng(e, t, { force: n = !1 } = {}) {
	let r = Bh(Lh(e), t);
	if (!r) return Promise.resolve({
		photos: [],
		error: "badAddress",
		code: "photoFolderUnknown"
	});
	if (!n) {
		let e = tg(Zh.get(r));
		if (e) return Promise.resolve(e);
		if (Qh.has(r)) return Qh.get(r);
	}
	let i = (async () => {
		let e;
		try {
			let t = await fetch(r), n = await t.json().catch(() => null);
			e = t.ok ? {
				photos: Vh(n),
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
		return Zh.set(r, {
			at: Date.now(),
			value: e
		}), Qh.delete(r), e;
	})();
	return Qh.set(r, i), i;
}
function rg(e) {
	let t = $h(e), n = t ? eg(t, e.order) : null;
	return n?.photos.length ? Wh(n.photos, e.order, Kh()).slice(0, Ih(e.folderMax)) : e.images ?? [];
}
function ig(e, t, n) {
	let r = $h(t);
	r && !eg(r, t.order) && ng(r, t.order).then((r) => {
		e.isConnected && r.photos.length && (e.textContent = "", e.removeAttribute("style"), e.className = "urd-bg-layer", n(e, t));
	}), n(e, t);
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/slideshow.js
var ag = {
	source: "upload",
	folder: "",
	order: "random",
	folderMax: jh.dflt,
	style: "floating",
	motion: "drift",
	motionSpeed: As.dflt,
	interval: js.dflt,
	fade: 1.5,
	count: Ss.dflt,
	seed: 0,
	size: null,
	spread: Ds.dflt,
	tilt: Os.dflt,
	radius: ks.dflt,
	rows: 2,
	direction: "left",
	underNav: !0,
	underAnnounce: !1,
	repeat: !1,
	shape: "rect",
	look: "shadow",
	tone: "natural",
	frameColor: ""
}, og = {
	version: 2,
	label: "Image gallery",
	labelKey: "bgLayer.slideshow",
	defaults: () => ({
		images: [],
		fit: "cover",
		opacity: .85,
		blur: 0,
		...ag
	}),
	migrations: { 1: (e) => ({
		...ag,
		style: "fill",
		motion: "none",
		interval: 6,
		opacity: 1,
		...e
	}) },
	render(e, t) {
		ig(e, t, cg);
	}
}, sg = (e, t) => {
	let n = document.createElement(e);
	return n.className = t, n;
};
function cg(e, t) {
	let n = zs(t.style), r = rg(t).filter((e) => Xm(e?.src)), i = qs(t.shape), a = Js(t.look);
	e.classList.add("urd-bg-slideshow", `urd-gallery-${n}`, `urd-gallery-tone-${Ys(t.tone)}`), n !== "fill" && e.classList.add(`urd-gallery-shape-${i}`, `urd-gallery-look-${a}`), e.style.setProperty("--urd-frame-radius", `${tc(t.radius)}px`), r.length || e.classList.add("urd-bg-demo"), e.style.opacity = String(t.opacity ?? .85);
	let o = Ks(a, t.frameColor);
	o && e.style.setProperty("--urd-frame-color", Mm(o));
	let s = t.underNav === !1 ? ["var(--urd-announce-h, 0px)", "var(--urd-nav-own-h, 0px)"] : t.underAnnounce === !0 ? [] : ["var(--urd-announce-h, 0px)"], c = s.length ? `calc(${s.join(" + ")})` : "", l = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, u = Bs(n, t.motion), d = {
		el: e,
		props: t,
		style: n,
		images: r,
		motion: u,
		shape: i,
		look: a,
		aspect: Xs(i, a),
		moves: Hs({
			style: n,
			motion: u,
			reducedMotion: l
		}),
		reduced: l,
		seed: ic(t.seed, Kh()),
		time: nc(t.motionSpeed),
		dwell: Qs(t.interval),
		dpr: window.devicePixelRatio || 1
	};
	yg[n](d), c && (e.style.top = n === "fill" && t.blur > 0 ? `calc(${c} - ${t.blur * 2}px)` : c);
}
function lg(e, t, n, r, i) {
	let a = t[n];
	e.style.backgroundImage = `url("${a ? Jh(a.src, r) : Fs(i)}")`, e.style.backgroundPosition = a ? ch(a.x, a.y) : "";
}
function ug({ el: e, props: t, images: n, motion: r, reduced: i, dpr: a, dwell: o }) {
	let s = !n.length, c = s ? Is(3) : n, l = qh(window.innerWidth, a);
	t.blur > 0 && (e.style.filter = `blur(${t.blur}px)`, e.style.inset = `-${t.blur * 2}px`);
	let u = Math.max(0, Number(t.fade) || 0);
	e.style.setProperty("--urd-bgg-fade", `${u}s`);
	let d = oh(r === "drift" ? "drift" : r === "kenburns" ? "kenburns" : "none"), f = (e) => {
		let n = sg("div", e ? "urd-bg-slide on" : "urd-bg-slide");
		return d !== "none" && (n.classList.add("urd-bg-motion", `urd-bg-motion-${d}`), n.style.animationDuration = `${sh(t.motionSpeed)}s`), n;
	}, p = (e, n) => {
		e.style.backgroundImage = `url("${s ? n.src : Jh(n.src, l)}")`, e.style.backgroundSize = s ? "240px auto" : lh(t.fit), e.style.backgroundRepeat = s ? "repeat" : "no-repeat", e.style.backgroundPosition = s ? "" : ch(n.x, n.y);
	}, m = new Image();
	if (m.src = s ? c[0].src : Jh(c[0].src, l), !m.complete) {
		e.style.visibility = "hidden";
		let t = () => {
			e.style.visibility = "";
		};
		m.addEventListener("load", t, { once: !0 }), m.addEventListener("error", t, { once: !0 });
	}
	let h = f(!0);
	if (p(h, c[0]), e.appendChild(h), !hc({
		count: c.length,
		reducedMotion: i
	})) return;
	let g = f(!1);
	e.appendChild(g);
	let _ = 0, v = h, y = Math.max(gc(o, { fallback: js.dflt }), u + .5) * 1e3, b = setInterval(() => {
		if (!h.isConnected) {
			clearInterval(b);
			return;
		}
		if (document.hidden) return;
		let e = mc(_, 1, c.length), t = new Image();
		t.src = s ? c[e].src : Jh(c[e].src, l);
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
function dg(e, t, n, r, i) {
	let a = sg("div", "urd-gallery-skin"), o = sg("div", "urd-gallery-face");
	return lg(o, t, n, r, i), a.appendChild(o), e.appendChild(a), {
		skin: a,
		face: o
	};
}
function fg(e, t) {
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
function pg({ frame: e, skin: t, face: n }, r, i, a) {
	let { motion: o, moves: s, time: c } = a;
	if (!s) return;
	let l = `-${(r.phase * c).toFixed(2)}s`;
	if (o === "drift" || o === "rise") {
		e.classList.add("urd-gallery-travel");
		let t = fg(r, o);
		e.style.setProperty("--tx0", t.tx0), e.style.setProperty("--ty0", t.ty0), e.style.setProperty("--tx1", t.tx1), e.style.setProperty("--ty1", t.ty1), e.style.animationDuration = `${c}s`, e.style.animationDelay = l;
	} else if (o === "kenburns") e.classList.add("urd-gallery-kenburns"), e.style.animationDuration = `${c}s`, e.style.animationDelay = l;
	else if (o === "bounce") {
		e.style.left = "0", e.style.top = "0", e.style.translate = "0 0", e.classList.add("urd-gallery-bounce-x"), t.classList.add("urd-gallery-bounce-y");
		let n = c * (.8 + r.heading * .4), i = c * (.5 + r.phase * .35);
		e.style.animationDuration = `${n.toFixed(2)}s`, e.style.animationDelay = `-${(r.phase * n).toFixed(2)}s`, t.style.animationDuration = `${i.toFixed(2)}s`, t.style.animationDelay = `-${(r.heading * i).toFixed(2)}s`;
	}
}
function mg(e, t, n) {
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
			a >= 0 && (lg(t.face, r, a, t.width, i), c[i] = a, l[a] = ++u), n && (f += 1, hg(t, n(i, f, e.filter((e) => e !== t))));
		});
	});
}
function hg(e, t) {
	let n = t.w / 2 * 1.15, r = t.w / e.aspect / 2 * 1.15;
	e.frame.style.left = `clamp(${n.toFixed(1)}px, ${t.x}%, calc(100% - ${n.toFixed(1)}px))`, e.frame.style.top = `clamp(${r.toFixed(1)}px, ${t.y}%, calc(100% - ${r.toFixed(1)}px))`, e.frame.style.width = `${t.w}px`, e.frame.style.rotate = `${t.rot}deg`, e.x = t.x, e.y = t.y;
}
function gg(e) {
	let { el: t, props: n, style: r, images: i, seed: a, aspect: o, dpr: s } = e, c = {
		count: n.count,
		seed: a,
		size: n.size,
		spread: n.spread,
		tilt: n.tilt,
		style: r,
		repeat: n.repeat === !0
	};
	mg(ac(i, c).map((n, r) => {
		let a = sg("div", "urd-gallery-box urd-gallery-frame" + (n.index < 0 ? " urd-gallery-frame-empty" : ""));
		a.style.aspectRatio = String(o);
		let c = qh(n.w, s), { skin: l, face: u } = dg(a, i, n.index, c, r);
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
		return hg(d, n), pg(d, n, r, e), d;
	}), e, (e, t, n) => {
		let r = null, o = -1;
		for (let s = 0; s < 6; s += 1) {
			let l = ac(i, {
				...c,
				seed: `${a}:${t * 6 + s}`
			})[e], u = Math.min(999, ...n.map((e) => Math.hypot(e.x - l.x, e.y - l.y)));
			u > o && (o = u, r = l);
		}
		return r;
	});
}
function _g(e) {
	let { el: t, props: n, images: r, moves: i, time: a, aspect: o, dpr: s } = e, c = rc(n.rows), l = Ws(n.size, "band");
	t.style.setProperty("--urd-band-h", `${l}px`);
	let u = r.length || 8, d = qh(l * o, s);
	for (let e = 0; e < c; e += 1) {
		let s = sg("div", "urd-gallery-band-row");
		i || s.classList.add("urd-ribbon-still");
		let c = sg("div", "urd-ribbon-track");
		n.direction === "right" != (e === 1) && c.classList.add("urd-ribbon-right"), c.style.setProperty("--urd-ribbon-ms", `${a * 1e3}ms`), e === 1 && (c.style.animationDelay = `-${(a / 3).toFixed(1)}s`);
		let l = (e) => {
			for (let t = 0; t < u; t += 1) {
				let n = sg("div", "urd-gallery-box urd-gallery-band-tile" + (r.length ? "" : " urd-gallery-frame-empty"));
				n.style.aspectRatio = String(o), dg(n, r, r.length ? t : -1, d, t), e.appendChild(n);
			}
		}, f = sg("div", "urd-ribbon-run");
		l(f);
		let p = sg("div", "urd-ribbon-run");
		p.setAttribute("aria-hidden", "true"), l(p), c.append(f, p), s.appendChild(c), t.appendChild(s);
	}
}
function vg(e) {
	let { el: t, props: n, images: r, seed: i, dpr: a, motion: o, moves: s, time: c } = e, l = cc(n.count, i, r.length, n.repeat === !0);
	t.style.setProperty("--urd-mosaic-row", `${Ws(n.size, "mosaic")}px`);
	let u = qh(Ws(n.size, "mosaic") * 2.2, a);
	mg(l.map((e, n) => {
		let i = sg("div", "urd-gallery-box urd-gallery-tile" + (r.length ? "" : " urd-gallery-frame-empty"));
		i.style.gridColumn = `span ${e.cols}`, i.style.gridRow = `span ${e.rows}`;
		let a = r.length ? n % r.length : -1, { face: l } = dg(i, r, a, u, n);
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
var yg = {
	fill: ug,
	floating: gg,
	band: _g,
	mosaic: vg
}, bg = /* @__PURE__ */ B("<span class=\"toolbar-row\"><img class=\"site-icon-preview\" alt=\"\"/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/>", 1), xg = /* @__PURE__ */ B("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\" multiple=\"\"/></label> <!>", 1), Sg = /* @__PURE__ */ B("<p> </p>"), Cg = /* @__PURE__ */ B("<label> <input type=\"text\" placeholder=\"https://drive.google.com/drive/folders/...\"/></label> <label> <!></label> <label> <input type=\"number\" min=\"1\" max=\"60\"/></label> <button type=\"button\" class=\"ghost action\"><!> </button> <!>", 1), wg = /* @__PURE__ */ B("<label> <!></label> <!>", 1), Tg = /* @__PURE__ */ B("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"6\" max=\"60\" step=\"1\"/>", 1), Eg = /* @__PURE__ */ B("<label> <!></label> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\"/>", 1), Dg = /* @__PURE__ */ B("<button class=\"ghost row-tool\"></button>"), Og = /* @__PURE__ */ B("<span><span class=\"grad-grip\"><svg viewBox=\"0 0 16 16\" width=\"14\" height=\"14\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"13\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"13\" r=\"1.4\"></circle></svg></span> <!> <input type=\"range\" class=\"tb-grow\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value\"> </span> <!></span>"), kg = /* @__PURE__ */ B("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/>", 1), Ag = /* @__PURE__ */ B("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\"/>", 1), jg = /* @__PURE__ */ B("<label> <!></label> <!> <button class=\"ghost action\"> </button> <!> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\"/> <label> <!></label>", 1), Mg = /* @__PURE__ */ B("<label> <!></label> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\"/>", 1), Ng = /* @__PURE__ */ B("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/>", 1), Pg = /* @__PURE__ */ B("<label> <!></label> <label> <!></label> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" step=\"2\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"180\" step=\"5\"/> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), Fg = /* @__PURE__ */ B("<div class=\"sizefill\"><button type=\"button\" class=\"ghost\"> </button> <button type=\"button\" class=\"ghost\"> </button></div> <label> </label> <div class=\"focalpad\"><span class=\"focaldot\"></span></div> <label class=\"sub\"> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\"/> <label class=\"sub\"> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\"/>", 1), Ig = /* @__PURE__ */ B("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\"/> <label> <!></label>", 1), Lg = /* @__PURE__ */ B("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <label> <!></label> <label> </label> <div class=\"sizestep\"><button type=\"button\">−</button> <input type=\"number\" min=\"10\" max=\"400\"/> <span class=\"sizeunit\">%</span> <button type=\"button\">+</button></div> <!> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\"/> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!>", 1), Rg = /* @__PURE__ */ B("<label> <!></label> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.5\" max=\"90\" step=\"0.5\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\"/>", 1), zg = /* @__PURE__ */ B("<label> <!></label> <label> <!></label>", 1), Bg = /* @__PURE__ */ B("<button type=\"button\" class=\"ghost action\"><!> </button>"), Vg = /* @__PURE__ */ B("<label> <input type=\"number\" max=\"20\"/></label> <label> <!></label> <label> <!></label> <!>", 1), Hg = /* @__PURE__ */ B("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"15\" step=\"1\"/>", 1), Ug = /* @__PURE__ */ B("<label> <!></label>"), Wg = /* @__PURE__ */ B("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"48\" step=\"1\"/>", 1), Gg = /* @__PURE__ */ B("<!> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"60\" max=\"400\" step=\"2\"/> <!> <label> <!></label> <label> <!></label> <!> <!>", 1), Kg = /* @__PURE__ */ B("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.5\" max=\"90\" step=\"0.5\"/>", 1), qg = /* @__PURE__ */ B("<label><input type=\"checkbox\"/> </label>"), Jg = /* @__PURE__ */ B("<!> <!> <label> <!></label> <!> <label> <!></label> <!> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\"/>", 1), Yg = /* @__PURE__ */ B("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\"/>", 1), Xg = /* @__PURE__ */ B("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"video/mp4,video/webm\"/></label> <label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <label> <!></label> <label class=\"sub\"> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label class=\"sub\"> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\"/> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!>", 1), Zg = /* @__PURE__ */ B("<div class=\"bg-layer\"><span class=\"nav-line\"><!> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span> <!></div>"), Qg = /* @__PURE__ */ B("<!> <label> <!></label> <button class=\"ghost action\"> </button>", 1);
function $g(e, t) {
	$e(t, !0);
	let n = (e, t = f, n = f, r = f) => {
		var i = Vr(), a = P(i), o = (e) => {
			var i = xg(), a = P(i), o = N(a), s = I(o);
			O(a), ni(I(a, 2), 17, () => r().props.images ?? [], Qr, (e, i, a) => {
				var o = bg(), s = P(o), c = N(s), l = I(c, 2), u = N(l);
				u.disabled = a === 0, W(u, () => X.up, !0), O(u);
				var d = I(u, 2);
				W(d, () => X.down, !0), O(d);
				var f = I(d, 2);
				W(f, () => X.cross, !0), O(f), O(l), O(s);
				var p = I(s, 2), m = N(p), h = F(I(m));
				O(p);
				var g = I(p, 2);
				G(g);
				var _ = I(g, 2), v = N(_), y = F(I(v));
				O(_);
				var b = I(_, 2);
				G(b), L((e, t, n, o, s) => {
					J(c, "src", R(i).src), d.disabled = a === r().props.images.length - 1, J(f, "title", e), H(m, `${t ?? ""} `), H(h, `${n ?? ""}%`), K(g, R(i).x ?? .5), H(v, `${o ?? ""} `), H(y, `${s ?? ""}%`), K(b, R(i).y ?? .5);
				}, [
					() => Y("tip.removeImage"),
					() => Y("lbl.focusX"),
					() => Math.round((R(i).x ?? .5) * 100),
					() => Y("lbl.focusY"),
					() => Math.round((R(i).y ?? .5) * 100)
				]), z("click", u, () => we(t(), n(), a, -1)), z("click", d, () => we(t(), n(), a, 1)), z("click", f, () => Te(t(), n(), a)), z("input", g, (e) => Ee(t(), n(), a, "x", Number(e.target.value))), z("input", b, (e) => Ee(t(), n(), a, "y", Number(e.target.value))), V(e, o);
			}), L((e, t) => {
				J(a, "title", e), H(o, `${t ?? ""} `);
			}, [() => Y("tip.bg.addImages"), () => Y("ui.addImages")]), z("change", s, (e) => Ce(t(), n(), e)), V(e, i);
		};
		U(a, (e) => {
			(r().props.source ?? "upload") !== "folder" && e(o);
		}), V(e, i);
	}, r = (e, t = f, n = f, r = f) => {
		let i = /* @__PURE__ */ A(() => D(r()));
		var a = wg(), o = P(a), s = N(o), c = I(s);
		{
			let e = /* @__PURE__ */ A(() => R(i).source ?? "upload"), r = /* @__PURE__ */ A(() => [["upload", Y("opt.photoSource.upload")], ["folder", Y("opt.photoSource.folder")]]);
			Ao(c, {
				get value() {
					return R(e);
				},
				get options() {
					return R(r);
				},
				onchange: (e) => E(t(), n(), "source", e)
			});
		}
		O(o);
		var l = I(o, 2), u = (e) => {
			let a = /* @__PURE__ */ A(() => Lh(R(i).folder ?? "")), o = /* @__PURE__ */ A(() => !R(a) || R(a).provider === "drive" || R(a).provider === "nextcloud");
			var s = Cg(), c = P(s), l = N(c), u = I(l);
			G(u);
			let d;
			O(c);
			var f = I(c, 2), p = N(f), m = I(p);
			{
				let e = /* @__PURE__ */ A(() => R(o) || R(i).order === "random" ? R(i).order ?? "name" : "name"), r = /* @__PURE__ */ A(() => R(o) ? [
					["name", Y("opt.folderOrder.name")],
					["newest", Y("opt.folderOrder.newest")],
					["random", Y("opt.folderOrder.random")]
				] : [["name", Y("opt.folderOrder.listed")], ["random", Y("opt.folderOrder.random")]]);
				Ao(m, {
					get value() {
						return R(e);
					},
					get options() {
						return R(r);
					},
					onchange: (e) => E(t(), n(), "order", e)
				});
			}
			O(f);
			var h = I(f, 2), g = N(h), _ = I(g);
			G(_), O(h);
			var v = I(h, 2), y = N(v);
			W(y, () => X.eye);
			var b = I(y);
			O(v);
			var x = I(v, 2), S = (e) => {
				var r = Sg();
				let i;
				var a = F(r, !0);
				L((e, t) => {
					i = Ei(r, 1, "folder-status", null, i, { err: e }), H(a, t);
				}, [() => be[xe(t(), n())].err, () => be[xe(t(), n())].text]), V(e, r);
			}, C = /* @__PURE__ */ A(() => be[xe(t(), n())]);
			U(x, (e) => {
				R(C) && e(S);
			}), L((e, t, n, r, o, s, m, y) => {
				J(c, "title", e), H(l, `${t ?? ""} `), K(u, R(i).folder ?? ""), d = Ei(u, 1, "", null, d, { "bad-target": n }), J(f, "title", r), H(p, `${o ?? ""} `), J(h, "title", s), H(g, `${m ?? ""} `), K(_, R(i).folderMax ?? 24), v.disabled = !R(a), H(b, ` ${y ?? ""}`);
			}, [
				() => Y("tip.bg.photoFolder"),
				() => Y("lbl.photoFolder"),
				() => (R(i).folder ?? "").trim() && !R(a),
				() => Y("tip.bg.folderOrder"),
				() => Y("lbl.folderOrder"),
				() => Y("tip.bg.folderMax"),
				() => Y("lbl.folderMax"),
				() => Y("ui.checkFolder")
			]), z("change", u, (e) => E(t(), n(), "folder", e.target.value.trim())), z("change", _, (e) => E(t(), n(), "folderMax", Number(e.target.value))), z("click", v, () => Se(t(), n(), r())), V(e, s);
		};
		U(l, (e) => {
			(R(i).source ?? "upload") === "folder" && e(u);
		}), L((e, t) => {
			J(o, "title", e), H(s, `${t ?? ""} `);
		}, [() => Y("tip.bg.photoSource"), () => Y("lbl.photoSource")]), V(e, a);
	}, i = (e, t = f, n = f, r = f) => {
		var i = wg(), a = P(i), o = N(a), s = I(o);
		{
			let e = /* @__PURE__ */ A(() => r().props.motion ?? "none"), i = /* @__PURE__ */ A(() => [
				["none", Y("common.none")],
				["kenburns", Y("opt.bgMotion.kenburns")],
				["drift", Y("opt.bgMotion.drift")]
			]);
			Ao(s, {
				get value() {
					return R(e);
				},
				get options() {
					return R(i);
				},
				onchange: (e) => E(t(), n(), "motion", e)
			});
		}
		O(a);
		var c = I(a, 2), l = (e) => {
			var i = Tg(), a = P(i), o = N(a), s = F(I(o));
			O(a);
			var c = I(a, 2);
			G(c), L((e) => {
				H(o, `${e ?? ""} `), H(s, `${r().props.motionSpeed ?? 20 ?? ""} s`), K(c, r().props.motionSpeed ?? 20);
			}, [() => Y("lbl.motionSpeed")]), z("input", c, (e) => E(t(), n(), "motionSpeed", Number(e.target.value))), V(e, i);
		};
		U(c, (e) => {
			(r().props.motion ?? "none") !== "none" && e(l);
		}), L((e, t) => {
			J(a, "title", e), H(o, `${t ?? ""} `);
		}, [() => Y("tip.bg.imageMotion"), () => Y("lbl.motion")]), V(e, i);
	}, a = Ze("urd-editor"), o = /* @__PURE__ */ A(() => a.secBox), s = /* @__PURE__ */ A(() => a.sectionBg), c = /* @__PURE__ */ A(() => a.siteDraft), { BG_DEFS: l, BG_TYPES: u, compressMany: d, compressOrTrim: p, imageErrorText: m, newSeed: h, readVideoFile: g, reportUpload: _, setStatus: v, themeSwatches: y } = a, b = sn({});
	Dn(() => {
		for (let e of R(s)) {
			let t = e?.props?.src;
			if (e?.type === "image" && t && !b[t]) {
				let e = new Image();
				e.onload = () => {
					b[t] = {
						w: e.naturalWidth,
						h: e.naturalHeight
					};
				}, e.src = t;
			}
		}
	});
	let x = /* @__PURE__ */ j("color");
	function S(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background ??= {
				version: 1,
				layers: []
			}, e.background.layers.push({
				type: t,
				version: l[t].version ?? 1,
				props: l[t].defaults()
			});
		});
	}
	function C(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers.splice(t, 1), e.background.layers.length || delete e.background;
		});
	}
	function w(e, t, n) {
		let r = t + n;
		e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers;
			r < 0 || r >= n.length || ([n[t], n[r]] = [n[r], n[t]]);
		});
	}
	function T(e, t, n) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${Object.keys(n).join("+")}`, (e) => {
			Object.assign(e.background.layers[t].props, n);
		});
	}
	function E(e, t, n, r) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e.background.layers[t].props[n] = r;
		});
	}
	function ee(e, t, n, r = "xy") {
		e.preventDefault();
		let i = e.currentTarget;
		i.setPointerCapture?.(e.pointerId);
		let a = (e) => {
			let a = i.getBoundingClientRect();
			if (r.includes("x")) {
				let r = Math.min(1, Math.max(0, (e.clientX - a.left) / a.width));
				E(t, n, "x", Math.round(r * 100) / 100);
			}
			if (r.includes("y")) {
				let r = Math.min(1, Math.max(0, (e.clientY - a.top) / a.height));
				E(t, n, "y", Math.round(r * 100) / 100);
			}
		};
		a(e);
		let o = () => {
			i.removeEventListener("pointermove", a), i.removeEventListener("pointerup", o), i.removeEventListener("pointercancel", o);
		};
		i.addEventListener("pointermove", a), i.addEventListener("pointerup", o), i.addEventListener("pointercancel", o);
	}
	let te = (e) => Math.min(4, Math.max(.1, e));
	function ne(e, t, n, r) {
		E(e, t, "size", te(Math.round((n + r) * 100) / 100));
	}
	function re(e, t, n) {
		let r = Number(n);
		Number.isFinite(r) && E(e, t, "size", te(r / 100));
	}
	function ie(e, t, n, r) {
		let i = b[n.props.src];
		if (!i?.w || !i?.h || !R(o)?.w || !R(o)?.h) return;
		let a = R(o).h * i.w / (R(o).w * i.h), s = r === "cover" ? Math.max(1, a) : Math.min(1, a);
		(n.props.fit === "tile" || n.props.fit === "repeat") && E(e, t, "fit", "plain"), E(e, t, "size", te(Math.round(s * 100) / 100));
	}
	function ae(e) {
		return e.props;
	}
	function oe(e, t, n, r) {
		e.mutate(n, (e) => {
			r(e.background.layers[t].props);
		});
	}
	function se(e, t, n, r) {
		oe(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e[n] = r;
		});
	}
	let ce = {
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
	function le(e, t, n) {
		oe(e, t, e.keyPrefix, (e) => {
			e.kind = n, ce[n].some(([t]) => t === (e.animation ?? "none")) || (e.animation = "none");
		});
	}
	function ue(e, t, n, r) {
		oe(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-stop${n}`, (e) => {
			e.stops[n] = {
				...e.stops[n],
				...r
			};
		});
	}
	function de(e, t) {
		oe(e, t, e.keyPrefix, (e) => {
			let t = Math.round(e.stops.reduce((e, t) => e + (Number(t.share) || 0), 0) / e.stops.length) || 50;
			e.stops.push({
				color: e.stops[e.stops.length - 1]?.color ?? "#ffffff",
				share: t
			});
		});
	}
	function fe(e, t, n) {
		oe(e, t, e.keyPrefix, (e) => {
			e.stops.length > 2 && e.stops.splice(n, 1);
		});
	}
	function pe(e, t, n, r) {
		oe(e, t, e.keyPrefix, (e) => {
			let [t] = e.stops.splice(n, 1);
			e.stops.splice(r, 0, t);
		});
	}
	let me = /* @__PURE__ */ j(null);
	function he(e, t, n, r) {
		if (t.button !== 0) return;
		t.preventDefault();
		let i = t.currentTarget.closest(".bg-layer"), a = t.currentTarget.closest(".grad-stop");
		M(me, {
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
			M(me, {
				...R(me),
				insert: n
			}, !0);
		}, u = () => {
			window.removeEventListener("pointermove", l), window.removeEventListener("pointerup", u), c.remove();
			let t = R(me);
			if (M(me, null), !t) return;
			let n = t.insert > t.from ? t.insert - 1 : t.insert;
			n !== t.from && pe(e, t.layer, t.from, n);
		};
		window.addEventListener("pointermove", l), window.addEventListener("pointerup", u);
	}
	function ge(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].type !== n && (e.background.layers[t] = {
				type: n,
				version: l[n].version ?? 1,
				props: l[n].defaults()
			});
		});
	}
	async function _e(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			E(e, t, "src", (await p(r)).dataUrl);
		} catch (e) {
			v(m(e), "error");
		}
	}
	function ve(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && g(r, "status.videoFormat", (n) => E(e, t, "src", n));
	}
	async function ye(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			E(e, t, "poster", (await p(r)).dataUrl);
		} catch (e) {
			v(m(e), "error");
		}
	}
	let be = sn({}), xe = (e, t) => `${e.keyPrefix}-${e.keyId}-${t}`;
	async function Se(e, t, n) {
		let r = xe(e, t);
		be[r] = {
			text: Y("status.folderChecking"),
			err: !1
		};
		let i = await ng(n.props.folder, n.props.order, { force: !0 });
		be[r] = i.photos.length ? {
			text: oa("status.folderFound", i.photos.length, { count: i.photos.length }),
			err: !1
		} : {
			text: sa(i) ?? Y("status.folderNone"),
			err: !0
		};
	}
	async function Ce(e, t, n) {
		let r = [...n.target.files ?? []];
		if (n.target.value = "", !r.length) return;
		v(Y("status.compressingImages"));
		let { images: i, failed: a, big: o } = await d(r);
		i.length && e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers[t].props;
			n.images ??= [], n.images.push(...i.map(({ src: e }) => ({
				src: e,
				x: .5,
				y: .5
			})));
		}), _(i.length, a, o);
	}
	function we(e, t, n, r) {
		e.mutate(e.keyPrefix, (e) => {
			let i = e.background.layers[t].props.images, a = n + r;
			a < 0 || a >= i.length || ([i[n], i[a]] = [i[a], i[n]]);
		});
	}
	function Te(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].props.images.splice(n, 1);
		});
	}
	function Ee(e, t, n, r, i) {
		e.mutate(`edit:${e.keyPrefix}g-${e.keyId}-${t}-${n}-${r}`, (e) => {
			e.background.layers[t].props.images[n][r] = i;
		});
	}
	let D = (e) => (e.version ?? 1) < og.version ? og.migrations[1](e.props ?? {}) : e.props ?? {};
	var De = Qg(), Oe = P(De);
	ni(Oe, 17, () => t.layers, Qr, (e, a, o) => {
		var s = Zg(), l = N(s), d = N(l);
		{
			let e = /* @__PURE__ */ A(() => Y("tip.bg.changeType")), n = /* @__PURE__ */ A(() => u.map(([e, t]) => [e, t.labelKey ? Y(t.labelKey) : t.label]));
			Ao(d, {
				get value() {
					return R(a).type;
				},
				get title() {
					return R(e);
				},
				get options() {
					return R(n);
				},
				onchange: (e) => ge(t.bg, o, e)
			});
		}
		var f = I(d, 2), p = N(f);
		p.disabled = o === 0, W(p, () => X.up, !0), O(p);
		var m = I(p, 2);
		W(m, () => X.down, !0), O(m);
		var g = I(m, 2);
		W(g, () => X.cross, !0), O(g), O(f), O(l);
		var _ = I(l, 2), v = (e) => {
			var n = Eg(), r = P(n), i = N(r), s = I(i);
			{
				let e = /* @__PURE__ */ A(y), n = /* @__PURE__ */ A(() => Y("tip.bg.layerColor"));
				Na(s, {
					get value() {
						return R(a).props.value;
					},
					get tokens() {
						return R(e);
					},
					get label() {
						return R(n);
					},
					onchange: (e) => E(t.bg, o, "value", e)
				});
			}
			O(r);
			var c = I(r, 2), l = N(c), u = F(I(l));
			O(c);
			var d = I(c, 2);
			G(d), L((e, t, n) => {
				H(i, `${e ?? ""} `), H(l, `${t ?? ""} `), H(u, `${n ?? ""}%`), K(d, R(a).props.opacity ?? 1);
			}, [
				() => Y("lbl.color"),
				() => Y("lbl.strength"),
				() => Math.round((R(a).props.opacity ?? 1) * 100)
			]), z("input", d, (e) => E(t.bg, o, "opacity", Number(e.target.value))), V(e, n);
		}, b = (e) => {
			let n = /* @__PURE__ */ A(() => ae(R(a))), r = /* @__PURE__ */ A(() => R(n).stops.reduce((e, t) => e + Math.max(0, Number(t.share) || 0), 0));
			var i = jg(), s = P(i), c = N(s), l = I(c);
			{
				let e = /* @__PURE__ */ A(() => R(n).kind ?? "linear"), r = /* @__PURE__ */ A(() => [["linear", Y("opt.grad.linear")], ["radial", Y("opt.grad.radial")]]);
				Ao(l, {
					get value() {
						return R(e);
					},
					get options() {
						return R(r);
					},
					onchange: (e) => le(t.bg, o, e)
				});
			}
			O(s);
			var u = I(s, 2);
			ni(u, 17, () => R(n).stops, Qr, (e, i, a) => {
				var s = Og();
				let c;
				var l = N(s), u = I(l, 2);
				{
					let e = /* @__PURE__ */ A(y), n = /* @__PURE__ */ A(() => Y("tip.bg.stopColor"));
					Na(u, {
						get value() {
							return R(i).color;
						},
						get tokens() {
							return R(e);
						},
						get label() {
							return R(n);
						},
						onchange: (e) => ue(t.bg, o, a, { color: e })
					});
				}
				var d = I(u, 2);
				G(d);
				var f = I(d, 2), p = F(f), m = I(f, 2), h = (e) => {
					var n = Dg();
					W(n, () => X.cross, !0), O(n), L((e) => J(n, "title", e), [() => Y("tip.bg.removeStop")]), z("click", n, () => fe(t.bg, o, a)), V(e, n);
				};
				U(m, (e) => {
					R(n).stops.length > 2 && e(h);
				}), O(s), L((e, t, r) => {
					c = Ei(s, 1, "nav-line grad-stop", null, c, {
						dragging: R(me)?.layer === o && R(me).from === a,
						"drop-above": R(me)?.layer === o && R(me).insert === a,
						"drop-below": R(me)?.layer === o && R(me).insert === R(n).stops.length && a === R(n).stops.length - 1
					}), J(l, "title", e), K(d, R(i).share ?? 50), J(d, "title", t), H(p, `${r ?? ""}%`);
				}, [
					() => Y("tip.bg.dragStop"),
					() => Y("tip.bg.stopShare"),
					() => R(r) > 0 ? Math.round(Math.max(0, Number(R(i).share) || 0) / R(r) * 100) : Math.round(100 / R(n).stops.length)
				]), z("pointerdown", l, (e) => he(t.bg, e, o, a)), z("input", d, (e) => ue(t.bg, o, a, { share: Number(e.target.value) })), V(e, s);
			});
			var d = I(u, 2), f = F(d, !0), p = I(d, 2), m = (e) => {
				var r = kg(), i = P(r), a = N(i), s = F(I(a));
				O(i);
				var c = I(i, 2);
				G(c);
				var l = I(c, 2), u = N(l), d = F(I(u));
				O(l);
				var f = I(l, 2);
				G(f), L((e, t, r, i) => {
					H(a, `${e ?? ""} `), H(s, `${t ?? ""}%`), K(c, R(n).x ?? .5), H(u, `${r ?? ""} `), H(d, `${i ?? ""}%`), K(f, R(n).y ?? .5);
				}, [
					() => Y("lbl.centerX"),
					() => Math.round((R(n).x ?? .5) * 100),
					() => Y("lbl.centerY"),
					() => Math.round((R(n).y ?? .5) * 100)
				]), z("input", c, (e) => se(t.bg, o, "x", Number(e.target.value))), z("input", f, (e) => se(t.bg, o, "y", Number(e.target.value))), V(e, r);
			}, h = (e) => {
				var r = Ag(), i = P(r), a = N(i), s = F(I(a));
				O(i);
				var c = I(i, 2);
				G(c), L((e) => {
					H(a, `${e ?? ""} `), H(s, `${R(n).angle ?? ""}°`), K(c, R(n).angle);
				}, [() => Y("lbl.angle")]), z("input", c, (e) => se(t.bg, o, "angle", Number(e.target.value))), V(e, r);
			};
			U(p, (e) => {
				(R(n).kind ?? "linear") === "radial" ? e(m) : e(h, -1);
			});
			var g = I(p, 2), _ = N(g), v = F(I(_));
			O(g);
			var b = I(g, 2);
			G(b);
			var x = I(b, 2), S = N(x), C = I(S);
			{
				let e = /* @__PURE__ */ A(() => R(n).animation ?? "none");
				Ao(C, {
					get value() {
						return R(e);
					},
					get options() {
						return ce[(R(n).kind ?? "linear") === "radial" ? "radial" : "linear"];
					},
					onchange: (e) => se(t.bg, o, "animation", e)
				});
			}
			O(x), L((e, t, r, i, a, o, s) => {
				H(c, `${e ?? ""} `), J(d, "title", t), H(f, r), H(_, `${i ?? ""} `), H(v, `${a ?? ""}%`), K(b, R(n).opacity ?? 1), J(x, "title", o), H(S, `${s ?? ""} `);
			}, [
				() => Y("blocks.shape"),
				() => Y("tip.bg.addStop"),
				() => Y("ui.addStop"),
				() => Y("lbl.strength"),
				() => Math.round((R(n).opacity ?? 1) * 100),
				() => Y("tip.bg.motion"),
				() => Y("lbl.motion")
			]), z("click", d, () => de(t.bg, o)), z("input", b, (e) => se(t.bg, o, "opacity", Number(e.target.value))), V(e, i);
		}, x = (e) => {
			var n = Mg(), r = P(n), i = N(r), s = I(i);
			{
				let e = /* @__PURE__ */ A(y), n = /* @__PURE__ */ A(() => Y("tip.bg.glowColor"));
				Na(s, {
					get value() {
						return R(a).props.color;
					},
					get tokens() {
						return R(e);
					},
					get label() {
						return R(n);
					},
					onchange: (e) => E(t.bg, o, "color", e)
				});
			}
			O(r);
			var c = I(r, 2), l = N(c), u = F(I(l));
			O(c);
			var d = I(c, 2);
			G(d);
			var f = I(d, 2), p = N(f), m = F(I(p));
			O(f);
			var h = I(f, 2);
			G(h);
			var g = I(h, 2), _ = N(g), v = F(I(_));
			O(g);
			var b = I(g, 2);
			G(b);
			var x = I(b, 2), S = N(x), C = F(I(S));
			O(x);
			var w = I(x, 2);
			G(w), L((e, t, n, r, o, s, c, f, g) => {
				H(i, `${e ?? ""} `), H(l, `${t ?? ""} `), H(u, `${n ?? ""}%`), K(d, R(a).props.x), H(p, `${r ?? ""} `), H(m, `${o ?? ""}%`), K(h, R(a).props.y), H(_, `${s ?? ""} `), H(v, `${c ?? ""}%`), K(b, R(a).props.radius), H(S, `${f ?? ""} `), H(C, `${g ?? ""}%`), K(w, R(a).props.opacity);
			}, [
				() => Y("lbl.color"),
				() => Y("lbl.posX"),
				() => Math.round(R(a).props.x * 100),
				() => Y("lbl.posY"),
				() => Math.round(R(a).props.y * 100),
				() => Y("lbl.size"),
				() => Math.round(R(a).props.radius * 100),
				() => Y("lbl.strength"),
				() => Math.round(R(a).props.opacity * 100)
			]), z("input", d, (e) => E(t.bg, o, "x", Number(e.target.value))), z("input", h, (e) => E(t.bg, o, "y", Number(e.target.value))), z("input", b, (e) => E(t.bg, o, "radius", Number(e.target.value))), z("input", w, (e) => E(t.bg, o, "opacity", Number(e.target.value))), V(e, n);
		}, S = (e) => {
			var n = Ng(), r = P(n), i = N(r), s = F(I(i));
			O(r);
			var c = I(r, 2);
			G(c), L((e, t) => {
				H(i, `${e ?? ""} `), H(s, `${t ?? ""}%`), K(c, R(a).props.opacity);
			}, [() => Y("lbl.strength"), () => Math.round(R(a).props.opacity * 100)]), z("input", c, (e) => E(t.bg, o, "opacity", Number(e.target.value))), V(e, n);
		}, te = (e) => {
			var n = Pg(), r = P(n), i = N(r), s = I(i);
			{
				let e = /* @__PURE__ */ A(() => Hm(R(a).props.pattern)), n = /* @__PURE__ */ A(() => Rm.map((e) => [e, Y(`opt.bgPattern.${e}`)]));
				Ao(s, {
					get value() {
						return R(e);
					},
					get options() {
						return R(n);
					},
					onchange: (e) => E(t.bg, o, "pattern", e)
				});
			}
			O(r);
			var c = I(r, 2), l = N(c), u = I(l);
			{
				let e = /* @__PURE__ */ A(() => R(a).props.color ?? "text"), n = /* @__PURE__ */ A(y), r = /* @__PURE__ */ A(() => Y("lbl.color"));
				Na(u, {
					get value() {
						return R(e);
					},
					get tokens() {
						return R(n);
					},
					get label() {
						return R(r);
					},
					onchange: (e) => E(t.bg, o, "color", e)
				});
			}
			O(c);
			var d = I(c, 2), f = N(d), p = F(I(f));
			O(d);
			var m = I(d, 2);
			G(m);
			var h = I(m, 2), g = N(h), _ = F(I(g));
			O(h);
			var v = I(h, 2);
			G(v);
			var b = I(v, 2), x = N(b), S = F(I(x));
			O(b);
			var C = I(b, 2);
			G(C);
			var w = I(C, 2), T = N(w);
			G(T);
			var ee = I(T);
			O(w), L((e, t, n, r, o, s, c, u) => {
				H(i, `${e ?? ""} `), H(l, `${t ?? ""} `), H(f, `${n ?? ""} `), H(p, `${R(a).props.size ?? zm.dflt ?? ""} px`), J(m, "min", zm.min), J(m, "max", zm.max), K(m, R(a).props.size ?? zm.dflt), H(g, `${r ?? ""} `), H(_, `${o ?? ""}%`), K(v, R(a).props.opacity ?? .12), H(x, `${s ?? ""} `), H(S, `${R(a).props.rotation ?? 0 ?? ""}°`), K(C, R(a).props.rotation ?? 0), J(w, "title", c), q(T, R(a).props.invert === !0), H(ee, ` ${u ?? ""}`);
			}, [
				() => Y("lbl.bgPattern"),
				() => Y("lbl.color"),
				() => Y("lbl.size"),
				() => Y("lbl.strength"),
				() => Math.round((R(a).props.opacity ?? .12) * 100),
				() => Y("lbl.patternRotation"),
				() => Y("tip.bg.patternInvert"),
				() => Y("lbl.patternInvert")
			]), z("input", m, (e) => E(t.bg, o, "size", Number(e.target.value))), z("input", v, (e) => E(t.bg, o, "opacity", Number(e.target.value))), z("input", C, (e) => E(t.bg, o, "rotation", Number(e.target.value))), z("change", T, (e) => E(t.bg, o, "invert", e.target.checked)), V(e, n);
		}, oe = (e) => {
			let n = /* @__PURE__ */ A(() => R(a).props.fit === "tile" || R(a).props.fit === "repeat");
			var r = Lg(), s = P(r), c = N(s), l = I(c);
			O(s);
			var u = I(s, 2), d = N(u), f = I(d);
			{
				let e = /* @__PURE__ */ A(() => R(n) ? "tile" : "plain"), r = /* @__PURE__ */ A(() => [["plain", Y("opt.img.plain")], ["tile", Y("opt.img.tile")]]);
				Ao(f, {
					get value() {
						return R(e);
					},
					get options() {
						return R(r);
					},
					onchange: (e) => E(t.bg, o, "fit", e)
				});
			}
			O(u);
			var p = I(u, 2), m = F(p, !0), h = I(p, 2), g = N(h), _ = I(g, 2);
			G(_);
			var v = I(_, 4);
			O(h);
			var y = I(h, 2), b = (e) => {
				var n = Fg(), r = P(n), i = N(r), s = F(i, !0), c = I(i, 2), l = F(c, !0);
				O(r);
				var u = I(r, 2), d = F(u, !0), f = I(u, 2), p = I(f, 2), m = N(p), h = F(I(m));
				O(p);
				var g = I(p, 2);
				G(g);
				var _ = I(g, 2), v = N(_), y = F(I(v));
				O(_);
				var b = I(_, 2);
				G(b), L((e, t, n, r, o, p, _, x, S, C, w, T) => {
					J(i, "title", e), H(s, t), J(c, "title", n), H(l, r), J(u, "title", o), H(d, p), Oi(f, `--fx:${_ ?? ""}%; --fy:${x ?? ""}%`), H(m, `${S ?? ""} `), H(h, `${C ?? ""}%`), K(g, R(a).props.x ?? .5), H(v, `${w ?? ""} `), H(y, `${T ?? ""}%`), K(b, R(a).props.y ?? .5);
				}, [
					() => Y("tip.bg.cover"),
					() => Y("ui.cover"),
					() => Y("opt.fitFrame.contain"),
					() => Y("opt.fit.contain"),
					() => Y("tip.bg.position"),
					() => Y("lbl.position"),
					() => Math.max(0, Math.min(1, R(a).props.x ?? .5)) * 100,
					() => Math.max(0, Math.min(1, R(a).props.y ?? .5)) * 100,
					() => Y("lbl.horizontal"),
					() => Math.round((R(a).props.x ?? .5) * 100),
					() => Y("lbl.vertical"),
					() => Math.round((R(a).props.y ?? .5) * 100)
				]), z("click", i, () => ie(t.bg, o, R(a), "cover")), z("click", c, () => ie(t.bg, o, R(a), "contain")), z("pointerdown", f, (e) => ee(e, t.bg, o, "xy")), z("input", g, (e) => E(t.bg, o, "x", Number(e.target.value))), z("input", b, (e) => E(t.bg, o, "y", Number(e.target.value))), V(e, n);
			};
			U(y, (e) => {
				R(n) || e(b);
			});
			var x = I(y, 2), S = N(x), C = F(I(S));
			O(x);
			var w = I(x, 2);
			G(w);
			var T = I(w, 2), te = N(T), ae = F(I(te));
			O(T);
			var oe = I(T, 2);
			G(oe);
			var se = I(oe, 2);
			i(se, () => t.bg, () => o, () => R(a));
			var ce = I(se, 2), le = N(ce);
			G(le);
			var ue = I(le);
			O(ce);
			var de = I(ce, 2), fe = (e) => {
				var n = Ig(), r = P(n), i = N(r), s = F(I(i));
				O(r);
				var c = I(r, 2);
				G(c);
				var l = I(c, 2), u = N(l), d = I(u);
				{
					let e = /* @__PURE__ */ A(() => R(a).props.bleed ?? "none"), n = /* @__PURE__ */ A(() => [
						["none", Y("common.none")],
						["up", Y("opt.bleed.up")],
						["down", Y("opt.bleed.down")],
						["both", Y("opt.brand.both")]
					]);
					Ao(d, {
						get value() {
							return R(e);
						},
						get options() {
							return R(n);
						},
						onchange: (e) => E(t.bg, o, "bleed", e)
					});
				}
				O(l), L((e, t, n, r) => {
					H(i, `${e ?? ""} `), H(s, `${t ?? ""}%`), K(c, R(a).props.parallax ?? .3), J(l, "title", n), H(u, `${r ?? ""} `);
				}, [
					() => Y("lbl.parallaxStrength"),
					() => Math.round((R(a).props.parallax ?? 0) * 100),
					() => Y("tip.bg.bleed"),
					() => Y("lbl.bleed")
				]), z("input", c, (e) => E(t.bg, o, "parallax", Number(e.target.value))), V(e, n);
			};
			U(de, (e) => {
				(R(a).props.parallax ?? 0) > 0 && e(fe);
			}), L((e, t, n, r, i, o, l, f, h, y, b, x, T, E) => {
				J(s, "title", e), H(c, `${t ?? ""} `), J(u, "title", n), H(d, `${r ?? ""} `), J(p, "title", i), H(m, o), J(g, "title", l), K(_, f), J(v, "title", h), H(S, `${y ?? ""} `), H(C, `${R(a).props.blur ?? 0 ?? ""} px`), K(w, R(a).props.blur ?? 0), H(te, `${b ?? ""} `), H(ae, `${x ?? ""}%`), K(oe, R(a).props.opacity ?? 1), J(ce, "title", T), q(le, (R(a).props.parallax ?? 0) > 0), H(ue, ` ${E ?? ""}`);
			}, [
				() => Y("tip.webpAuto"),
				() => R(a).props.src ? Y("ui.changeImage") : Y("ui.chooseImage"),
				() => Y("tip.bg.fit"),
				() => Y("lbl.imageFit"),
				() => Y("tip.bg.size"),
				() => Y("lbl.size"),
				() => Y("tip.smaller"),
				() => Math.round((R(a).props.size ?? 1) * 100),
				() => Y("tip.larger"),
				() => Y("lbl.blur"),
				() => Y("lbl.strength"),
				() => Math.round((R(a).props.opacity ?? 1) * 100),
				() => Y("tip.bg.parallax"),
				() => Y("lbl.parallax")
			]), z("change", l, (e) => _e(t.bg, o, e)), z("click", g, () => ne(t.bg, o, R(a).props.size ?? 1, -.05)), z("change", _, (e) => re(t.bg, o, e.target.value)), z("click", v, () => ne(t.bg, o, R(a).props.size ?? 1, .05)), z("input", w, (e) => E(t.bg, o, "blur", Number(e.target.value))), z("input", oe, (e) => E(t.bg, o, "opacity", Number(e.target.value))), z("change", le, (e) => E(t.bg, o, "parallax", e.target.checked ? .3 : 0)), V(e, r);
		}, pe = (e) => {
			let i = /* @__PURE__ */ A(() => D(R(a))), s = /* @__PURE__ */ A(() => R(i).style ?? "floating"), l = /* @__PURE__ */ A(() => Bs(R(s), R(i).motion)), u = /* @__PURE__ */ A(() => (R(i).seed ?? 0) > 0);
			var d = Jg(), f = P(d);
			r(f, () => t.bg, () => o, () => R(a));
			var p = I(f, 2);
			n(p, () => t.bg, () => o, () => R(a));
			var m = I(p, 2), g = N(m), _ = I(g);
			{
				let e = /* @__PURE__ */ A(() => hs.map((e) => [e, Y(`opt.galleryStyle.${e}`)]));
				Ao(_, {
					get value() {
						return R(s);
					},
					get options() {
						return R(e);
					},
					onchange: (e) => E(t.bg, o, "style", e)
				});
			}
			O(m);
			var v = I(m, 2), b = (e) => {
				var n = Rg(), r = P(n), a = N(r), s = I(a);
				{
					let e = /* @__PURE__ */ A(() => R(i).fit ?? "cover"), n = /* @__PURE__ */ A(() => [["cover", Y("opt.fit.cover")], ["contain", Y("opt.fit.contain")]]);
					Ao(s, {
						get value() {
							return R(e);
						},
						get options() {
							return R(n);
						},
						onchange: (e) => E(t.bg, o, "fit", e)
					});
				}
				O(r);
				var c = I(r, 2), l = N(c), u = F(I(l));
				O(c);
				var d = I(c, 2);
				G(d);
				var f = I(d, 2), p = N(f), m = F(I(p));
				O(f);
				var h = I(f, 2);
				G(h);
				var g = I(h, 2), _ = N(g), v = F(I(_));
				O(g);
				var y = I(g, 2);
				G(y), L((e, t, n, r, o) => {
					H(a, `${e ?? ""} `), H(l, `${t ?? ""} `), H(u, `${R(i).interval ?? 12 ?? ""} s`), K(d, R(i).interval ?? 12), H(p, `${n ?? ""} `), H(m, `${r ?? ""} s`), K(h, R(i).fade ?? 1.5), H(_, `${o ?? ""} `), H(v, `${R(i).blur ?? 0 ?? ""} px`), K(y, R(i).blur ?? 0);
				}, [
					() => Y("lbl.imageFit"),
					() => Y("lbl.secondsPerImage"),
					() => Y("lbl.transition"),
					() => (R(i).fade ?? 1.5).toFixed(1),
					() => Y("lbl.blur")
				]), z("input", d, (e) => E(t.bg, o, "interval", Number(e.target.value))), z("input", h, (e) => E(t.bg, o, "fade", Number(e.target.value))), z("input", y, (e) => E(t.bg, o, "blur", Number(e.target.value))), V(e, n);
			}, x = (e) => {
				var n = Gg(), r = P(n), a = (e) => {
					var n = zg(), r = P(n), a = N(r), s = I(a);
					{
						let e = /* @__PURE__ */ A(() => String(R(i).rows ?? 2));
						Ao(s, {
							get value() {
								return R(e);
							},
							options: [["1", "1"], ["2", "2"]],
							onchange: (e) => E(t.bg, o, "rows", Number(e))
						});
					}
					O(r);
					var c = I(r, 2), l = N(c), u = I(l);
					{
						let e = /* @__PURE__ */ A(() => R(i).direction ?? "left"), n = /* @__PURE__ */ A(() => [["left", Y("opt.ribbonDir.left")], ["right", Y("opt.ribbonDir.right")]]);
						Ao(u, {
							get value() {
								return R(e);
							},
							get options() {
								return R(n);
							},
							onchange: (e) => E(t.bg, o, "direction", e)
						});
					}
					O(c), L((e, t) => {
						H(a, `${e ?? ""} `), H(l, `${t ?? ""} `);
					}, [() => Y("lbl.galleryRows"), () => Y("lbl.photoDirection")]), V(e, n);
				}, c = (e) => {
					var n = Vg(), r = P(n), a = N(r), c = I(a);
					G(c), O(r);
					var l = I(r, 2), d = N(l), f = I(d);
					{
						let e = /* @__PURE__ */ A(() => R(i).repeat === !0 ? "repeat" : "once"), n = /* @__PURE__ */ A(() => [["once", Y("opt.galleryRepeat.once")], ["repeat", Y("opt.galleryRepeat.repeat")]]);
						Ao(f, {
							get value() {
								return R(e);
							},
							get options() {
								return R(n);
							},
							onchange: (e) => E(t.bg, o, "repeat", e === "repeat")
						});
					}
					O(l);
					var p = I(l, 2), m = N(p), g = I(m);
					{
						let e = /* @__PURE__ */ A(() => R(u) ? "fixed" : "random"), n = /* @__PURE__ */ A(() => [["random", Y("opt.galleryPlace.random")], ["fixed", Y("opt.galleryPlace.fixed")]]);
						Ao(g, {
							get value() {
								return R(e);
							},
							get options() {
								return R(n);
							},
							onchange: (e) => E(t.bg, o, "seed", e === "fixed" ? h() : 0)
						});
					}
					O(p);
					var _ = I(p, 2), v = (e) => {
						var n = Bg(), r = N(n);
						W(r, () => X.shuffle);
						var i = I(r);
						O(n), L((e, t) => {
							J(n, "title", e), H(i, ` ${t ?? ""}`);
						}, [() => Y("tip.bg.photoSeed"), () => Y("ui.shufflePhotos")]), z("click", n, () => E(t.bg, o, "seed", h())), V(e, n);
					};
					U(_, (e) => {
						R(u) && e(v);
					}), L((e, t, n, o, u, f) => {
						J(r, "title", e), H(a, `${t ?? ""} `), J(c, "min", R(s) === "mosaic" ? 4 : 1), K(c, R(i).count ?? (R(s) === "mosaic" ? 12 : 8)), J(l, "title", n), H(d, `${o ?? ""} `), J(p, "title", u), H(m, `${f ?? ""} `);
					}, [
						() => Y("tip.bg.photoCount"),
						() => Y("lbl.photoCount"),
						() => Y("tip.bg.galleryRepeat"),
						() => Y("lbl.galleryRepeat"),
						() => Y("tip.bg.galleryPlace"),
						() => Y("lbl.galleryPlace")
					]), z("change", c, (e) => E(t.bg, o, "count", Number(e.target.value))), V(e, n);
				};
				U(r, (e) => {
					R(s) === "band" ? e(a) : e(c, -1);
				});
				var l = I(r, 2), d = N(l), f = F(I(d));
				O(l);
				var p = I(l, 2);
				G(p);
				var m = I(p, 2), g = (e) => {
					var n = Hg(), r = P(n), a = N(r), s = F(I(a));
					O(r);
					var c = I(r, 2);
					G(c);
					var l = I(c, 2), u = N(l), d = F(I(u));
					O(l);
					var f = I(l, 2);
					G(f), L((e, t, n, o) => {
						J(r, "title", e), H(a, `${t ?? ""} `), H(s, `${n ?? ""}%`), K(c, R(i).spread ?? .85), H(u, `${o ?? ""} `), H(d, `${R(i).tilt ?? 5 ?? ""}°`), K(f, R(i).tilt ?? 5);
					}, [
						() => Y("tip.bg.photoSpread"),
						() => Y("lbl.photoSpread"),
						() => Math.round((R(i).spread ?? .85) * 100),
						() => Y("lbl.photoTilt")
					]), z("input", c, (e) => E(t.bg, o, "spread", Number(e.target.value))), z("input", f, (e) => E(t.bg, o, "tilt", Number(e.target.value))), V(e, n);
				};
				U(m, (e) => {
					R(s) === "floating" && e(g);
				});
				var _ = I(m, 2), v = N(_), b = I(v);
				{
					let e = /* @__PURE__ */ A(() => R(i).shape ?? "rect"), n = /* @__PURE__ */ A(() => gs.map((e) => [e, Y(`opt.galleryShape.${e}`)]));
					Ao(b, {
						get value() {
							return R(e);
						},
						get options() {
							return R(n);
						},
						onchange: (e) => E(t.bg, o, "shape", e)
					});
				}
				O(_);
				var x = I(_, 2), S = N(x), C = I(S);
				{
					let e = /* @__PURE__ */ A(() => R(i).look ?? "shadow"), n = /* @__PURE__ */ A(() => _s.map((e) => [e, Y(`opt.galleryLook.${e}`)]));
					Ao(C, {
						get value() {
							return R(e);
						},
						get options() {
							return R(n);
						},
						onchange: (e) => E(t.bg, o, "look", e)
					});
				}
				O(x);
				var w = I(x, 2), T = (e) => {
					var n = Ug(), r = N(n), a = I(r);
					{
						let e = /* @__PURE__ */ A(() => Ks(R(i).look, R(i).frameColor)), n = /* @__PURE__ */ A(y), r = /* @__PURE__ */ A(() => Y("tip.bg.frameColor"));
						Na(a, {
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
							onchange: (e) => E(t.bg, o, "frameColor", e ?? "")
						});
					}
					O(n), L((e) => H(r, `${e ?? ""} `), [() => Y("lbl.frameColor")]), V(e, n);
				}, ee = /* @__PURE__ */ A(() => Gs(R(i).look));
				U(w, (e) => {
					R(ee) && e(T);
				});
				var te = I(w, 2), ne = (e) => {
					var n = Wg(), r = P(n), a = N(r), s = F(I(a));
					O(r);
					var c = I(r, 2);
					G(c), L((e) => {
						H(a, `${e ?? ""} `), H(s, `${R(i).radius ?? 5 ?? ""} px`), K(c, R(i).radius ?? 5);
					}, [() => Y("lbl.rounding")]), z("input", c, (e) => E(t.bg, o, "radius", Number(e.target.value))), V(e, n);
				}, re = /* @__PURE__ */ A(() => Zs(R(i).shape) && (R(i).look ?? "shadow") !== "polaroid");
				U(te, (e) => {
					R(re) && e(ne);
				}), L((e, t, n, r, i, a, o) => {
					H(d, `${e ?? ""} `), H(f, `${t ?? ""} px`), K(p, n), J(_, "title", r), H(v, `${i ?? ""} `), J(x, "title", a), H(S, `${o ?? ""} `);
				}, [
					() => Y("lbl.size"),
					() => Ws(R(i).size, R(s)),
					() => Ws(R(i).size, R(s)),
					() => Y("tip.bg.galleryShape"),
					() => Y("lbl.galleryShape"),
					() => Y("tip.bg.galleryLook"),
					() => Y("lbl.galleryLook")
				]), z("input", p, (e) => E(t.bg, o, "size", Number(e.target.value))), V(e, n);
			};
			U(v, (e) => {
				R(s) === "fill" ? e(b) : e(x, -1);
			});
			var S = I(v, 2), C = N(S), w = I(C);
			{
				let e = /* @__PURE__ */ A(() => R(i).tone ?? "natural"), n = /* @__PURE__ */ A(() => vs.map((e) => [e, Y(`opt.galleryTone.${e}`)]));
				Ao(w, {
					get value() {
						return R(e);
					},
					get options() {
						return R(n);
					},
					onchange: (e) => E(t.bg, o, "tone", e)
				});
			}
			O(S);
			var ee = I(S, 2), te = (e) => {
				var n = Ug(), r = N(n), i = I(r);
				{
					let e = /* @__PURE__ */ A(() => Vs(R(s)).map((e) => [e, Y(e === "none" ? "common.none" : `opt.galleryMotion.${e}`)]));
					Ao(i, {
						get value() {
							return R(l);
						},
						get options() {
							return R(e);
						},
						onchange: (e) => E(t.bg, o, "motion", e)
					});
				}
				O(n), L((e, t) => {
					J(n, "title", e), H(r, `${t ?? ""} `);
				}, [() => Y("tip.bg.photoMotion"), () => Y("lbl.motion")]), V(e, n);
			}, ne = /* @__PURE__ */ A(() => Vs(R(s)).length > 1);
			U(ee, (e) => {
				R(ne) && e(te);
			});
			var re = I(ee, 2), ie = (e) => {
				var n = Kg(), r = P(n), a = N(r), s = F(I(a));
				O(r);
				var c = I(r, 2);
				G(c), L((e) => {
					H(a, `${e ?? ""} `), H(s, `${R(i).interval ?? 12 ?? ""} s`), K(c, R(i).interval ?? 12);
				}, [() => Y("lbl.secondsPerImage")]), z("input", c, (e) => E(t.bg, o, "interval", Number(e.target.value))), V(e, n);
			}, ae = (e) => {
				var n = Kg(), r = P(n), a = N(r), s = F(I(a));
				O(r);
				var c = I(r, 2);
				G(c), L((e) => {
					H(a, `${e ?? ""} `), H(s, `${R(i).motionSpeed ?? 30 ?? ""} s`), K(c, R(i).motionSpeed ?? 30);
				}, [() => Y("lbl.motionSpeed")]), z("input", c, (e) => E(t.bg, o, "motionSpeed", Number(e.target.value))), V(e, n);
			};
			U(re, (e) => {
				R(l) === "crossfade" && R(s) !== "fill" ? e(ie) : (R(l) !== "none" || R(s) === "band") && e(ae, 1);
			});
			var oe = I(re, 2), se = N(oe);
			G(se);
			var ce = I(se);
			O(oe);
			var le = I(oe, 2), ue = (e) => {
				var n = qg();
				let r;
				var a = N(n);
				G(a);
				var s = I(a);
				O(n), L((e, t) => {
					r = Ei(n, 1, "gridmenu-snap", null, r, { muted: R(i).underNav === !1 }), J(n, "title", e), q(a, R(i).underAnnounce === !0), a.disabled = R(i).underNav === !1, H(s, ` ${t ?? ""}`);
				}, [() => Y("tip.bg.underAnnounce"), () => Y("lbl.underAnnounce")]), z("change", a, (e) => e.target.checked ? T(t.bg, o, {
					underAnnounce: !0,
					underNav: !0
				}) : E(t.bg, o, "underAnnounce", !1)), V(e, n);
			};
			U(le, (e) => {
				R(c).nav?.announcement?.text && e(ue);
			});
			var de = I(le, 2), fe = N(de), pe = F(I(fe));
			O(de);
			var me = I(de, 2);
			G(me), L((e, t, n, r, a, o, s, c) => {
				J(m, "title", e), H(g, `${t ?? ""} `), J(S, "title", n), H(C, `${r ?? ""} `), J(oe, "title", a), q(se, R(i).underNav !== !1), H(ce, ` ${o ?? ""}`), H(fe, `${s ?? ""} `), H(pe, `${c ?? ""}%`), K(me, R(i).opacity ?? .85);
			}, [
				() => Y("tip.bg.galleryStyle"),
				() => Y("lbl.galleryStyle"),
				() => Y("tip.bg.galleryTone"),
				() => Y("lbl.galleryTone"),
				() => Y("tip.bg.underNav"),
				() => Y("lbl.underNav"),
				() => Y("lbl.strength"),
				() => Math.round((R(i).opacity ?? .85) * 100)
			]), z("change", se, (e) => e.target.checked ? E(t.bg, o, "underNav", !0) : T(t.bg, o, {
				underNav: !1,
				underAnnounce: !1
			})), z("input", me, (e) => E(t.bg, o, "opacity", Number(e.target.value))), V(e, d);
		}, be = (e) => {
			var n = Xg(), r = P(n), i = N(r), s = I(i);
			O(r);
			var c = I(r, 2), l = N(c), u = I(l);
			O(c);
			var d = I(c, 2), f = N(d), p = I(f);
			{
				let e = /* @__PURE__ */ A(() => R(a).props.fit ?? "cover"), n = /* @__PURE__ */ A(() => [["cover", Y("opt.fit.cover")], ["contain", Y("opt.fit.contain")]]);
				Ao(p, {
					get value() {
						return R(e);
					},
					get options() {
						return R(n);
					},
					onchange: (e) => E(t.bg, o, "fit", e)
				});
			}
			O(d);
			var m = I(d, 2), h = N(m), g = F(I(h));
			O(m);
			var _ = I(m, 2);
			G(_);
			var v = I(_, 2), y = N(v), b = F(I(y));
			O(v);
			var x = I(v, 2);
			G(x);
			var S = I(x, 2), C = N(S), w = F(I(C));
			O(S);
			var T = I(S, 2);
			G(T);
			var ee = I(T, 2), te = N(ee);
			G(te);
			var ne = I(te);
			O(ee);
			var re = I(ee, 2), ie = (e) => {
				var n = Yg(), r = P(n), i = N(r), s = F(I(i));
				O(r);
				var c = I(r, 2);
				G(c), L((e, t) => {
					H(i, `${e ?? ""} `), H(s, `${t ?? ""}%`), K(c, R(a).props.parallax ?? .3);
				}, [() => Y("lbl.parallaxStrength"), () => Math.round((R(a).props.parallax ?? 0) * 100)]), z("input", c, (e) => E(t.bg, o, "parallax", Number(e.target.value))), V(e, n);
			};
			U(re, (e) => {
				(R(a).props.parallax ?? 0) > 0 && e(ie);
			}), L((e, t, n, o, s, u, p, m, v, S, E, re, ie, ae) => {
				J(r, "title", e), H(i, `${t ?? ""} `), J(c, "title", n), H(l, `${o ?? ""} `), J(d, "title", s), H(f, `${u ?? ""} `), H(h, `${p ?? ""} `), H(g, `${m ?? ""}%`), K(_, R(a).props.x ?? .5), H(y, `${v ?? ""} `), H(b, `${S ?? ""}%`), K(x, R(a).props.y ?? .5), H(C, `${E ?? ""} `), H(w, `${re ?? ""}%`), K(T, R(a).props.opacity ?? 1), J(ee, "title", ie), q(te, (R(a).props.parallax ?? 0) > 0), H(ne, ` ${ae ?? ""}`);
			}, [
				() => Y("tip.bg.videoFile"),
				() => R(a).props.src ? Y("ui.changeVideo") : Y("ui.chooseVideo"),
				() => Y("tip.bg.poster"),
				() => R(a).props.poster ? Y("ui.changeImage") : Y("ui.choosePoster"),
				() => Y("tip.bg.fit"),
				() => Y("lbl.imageFit"),
				() => Y("lbl.horizontal"),
				() => Math.round((R(a).props.x ?? .5) * 100),
				() => Y("lbl.vertical"),
				() => Math.round((R(a).props.y ?? .5) * 100),
				() => Y("lbl.strength"),
				() => Math.round((R(a).props.opacity ?? 1) * 100),
				() => Y("tip.bg.parallax"),
				() => Y("lbl.parallax")
			]), z("change", s, (e) => ve(t.bg, o, e)), z("change", u, (e) => ye(t.bg, o, e)), z("input", _, (e) => E(t.bg, o, "x", Number(e.target.value))), z("input", x, (e) => E(t.bg, o, "y", Number(e.target.value))), z("input", T, (e) => E(t.bg, o, "opacity", Number(e.target.value))), z("change", te, (e) => E(t.bg, o, "parallax", e.target.checked ? .3 : 0)), V(e, n);
		};
		U(_, (e) => {
			R(a).type === "color" ? e(v) : R(a).type === "gradient" ? e(b, 1) : R(a).type === "glow" ? e(x, 2) : R(a).type === "grain" ? e(S, 3) : R(a).type === "pattern" ? e(te, 4) : R(a).type === "image" ? e(oe, 5) : R(a).type === "slideshow" ? e(pe, 6) : R(a).type === "video" && e(be, 7);
		}), O(s), L((e, n, r) => {
			J(p, "title", e), J(m, "title", n), m.disabled = o === t.layers.length - 1, J(g, "title", r);
		}, [
			() => Y("hint.bg.order"),
			() => Y("hint.bg.order"),
			() => Y("tip.bg.removeLayer")
		]), z("click", p, () => w(t.bg, o, -1)), z("click", m, () => w(t.bg, o, 1)), z("click", g, () => C(t.bg, o)), V(e, s);
	});
	var ke = I(Oe, 2), k = N(ke), Ae = I(k);
	{
		let e = /* @__PURE__ */ A(() => u.map(([e, t]) => [e, t.labelKey ? Y(t.labelKey) : t.label]));
		Ao(Ae, {
			get value() {
				return R(x);
			},
			get options() {
				return R(e);
			},
			onchange: (e) => M(x, e, !0)
		});
	}
	O(ke);
	var je = I(ke, 2), Me = F(je, !0);
	L((e, t) => {
		H(k, `${e ?? ""} `), H(Me, t);
	}, [() => Y("lbl.newLayer"), () => Y("ui.addLayer")]), z("click", je, () => S(t.bg, R(x))), V(e, De), et();
}
Mr([
	"change",
	"click",
	"input",
	"pointerdown"
]);
//#endregion
//#region src/panels/PropertiesPanel.svelte
var e_ = /* @__PURE__ */ B("<p class=\"panel-strong\"> </p> <!> <!>", 1), t_ = /* @__PURE__ */ B("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\"/>", 1), n_ = /* @__PURE__ */ B("<button><span class=\"rs-sample\"><i class=\"rs-line\"></i> <i class=\"rs-chip\"></i> <i class=\"rs-dot\"></i></span> <span class=\"rs-name\"> </span></button>"), r_ = /* @__PURE__ */ B("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" step=\"4\"/> <span class=\"gridmenu-value\"> </span></div> <label> <!></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), i_ = /* @__PURE__ */ B("<label> <!></label> <!>", 1), a_ = /* @__PURE__ */ B("<label> <!></label> <label> <input type=\"number\" min=\"0\" max=\"1000\" step=\"10\"/></label> <label> <!></label>", 1), o_ = /* @__PURE__ */ B("<label> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\"/></label> <label> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\"/></label> <!>", 1), s_ = /* @__PURE__ */ B("<p class=\"panel-strong\"> </p> <label> <input class=\"token-input\"/></label> <hr class=\"gridmenu-divider\"/> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <hr class=\"gridmenu-divider\"/> <p class=\"panel-strong\"> </p> <div class=\"rs-grid\"></div> <label> <span class=\"row-tools\"><span class=\"gridmenu-value\"> </span> <button class=\"ghost row-tool\"></button></span></label> <hr class=\"gridmenu-divider\"/> <p class=\"panel-strong\"> </p> <!> <hr class=\"gridmenu-divider\"/> <p class=\"panel-strong\"> </p> <!> <hr class=\"gridmenu-divider\"/> <label> <!></label> <!> <label> <!></label>", 1), c_ = /* @__PURE__ */ B("<p class=\"panel-hint\"> </p>"), l_ = /* @__PURE__ */ B("<div class=\"panel-body\"><!></div>");
function u_(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.activeSectionId), i = /* @__PURE__ */ A(() => n.bridge), a = /* @__PURE__ */ A(() => n.previewPalette), o = /* @__PURE__ */ A(() => n.sectionAnim), s = /* @__PURE__ */ A(() => n.sectionBg), c = /* @__PURE__ */ A(() => n.sectionBgCtx), l = /* @__PURE__ */ A(() => n.sectionDivider), u = /* @__PURE__ */ A(() => n.sectionGrid), d = /* @__PURE__ */ A(() => n.sectionHover), f = /* @__PURE__ */ A(() => n.sectionMinHeight), p = /* @__PURE__ */ A(() => n.sectionTheme), m = /* @__PURE__ */ A(() => n.selectedBlock), { BLOCK_LABELS: g, ENTRANCE_OPTIONS: _, HOVER_OPTIONS: v, animObj: y, isEntrance: b, mutateSection: x, normalizeAnim: S, readableOn: C, setSectionGrid: w, setSectionHeight: T, themeHex: E, themeSwatches: ee, toggleSectionGrid: te } = n;
	function ne(e) {
		x("section-theme", (t) => {
			e ? t.theme = e : delete t.theme;
		});
	}
	function re(e) {
		let t = R(a), n = (e) => e.replaceAll("var(--urd-base-bg)", t.bg).replaceAll("var(--urd-base-surface)", t.surface).replaceAll("var(--urd-base-text)", t.text).replaceAll("var(--urd-base-accent)", t.accent).replaceAll("var(--urd-base-accent-text)", t["accent-text"] ?? C(E(t.accent ?? "#000000", t))), r = Fm(e);
		return {
			bg: r["--urd-color-bg"] ? n(r["--urd-color-bg"]) : t.bg,
			surface: r["--urd-color-surface"] ? n(r["--urd-color-surface"]) : t.surface,
			text: r["--urd-color-text"] ? n(r["--urd-color-text"]) : t.text,
			accent: r["--urd-color-accent"] ? n(r["--urd-color-accent"]) : t.accent
		};
	}
	function ie(e) {
		x("section-anim", (t) => {
			S(t), t.animation = e ? y(e) : null;
		}), R(i)?.sendDemoAnim(R(r));
	}
	function ae(e, t, n) {
		x(`section-divider-${e}-${t}`, (r) => {
			let i = { ...r.divider ?? {} };
			if (t === "shape" && !n) delete i[e];
			else {
				let r = { ...i[e] ?? { shape: "wave" } };
				n === void 0 || n === !1 || n === "" ? delete r[t] : r[t] = n, i[e] = r;
			}
			Object.keys(i).length ? r.divider = i : delete r.divider;
		});
	}
	function oe(e) {
		x("section-hover", (t) => {
			S(t), t.hover = e ? y(e) : null;
		});
	}
	function se(e, t) {
		Number.isFinite(t) && (x("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), R(i)?.sendDemoAnim(R(r)));
	}
	function ce(e, t) {
		x("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), R(i)?.sendDemoAnim(R(r));
	}
	var le = l_(), ue = N(le), de = (e) => {
		var t = e_(), n = P(t), r = F(n, !0), i = I(n, 2);
		zp(i, {
			get: () => eo.propsQuery,
			set: (e) => eo.propsQuery = e
		}), Lp(I(i, 2), {
			wide: !1,
			get query() {
				return eo.propsQuery;
			}
		}), L((e) => H(r, e), [() => Y("blocks.suffix", { label: g[R(m).type] ?? R(m).type })]), V(e, t);
	}, fe = (e) => {
		var t = s_(), n = P(t), i = F(n, !0), a = I(n, 2), m = N(a), g = I(m);
		G(g), O(a);
		var y = I(a, 4), x = N(y);
		G(x);
		var S = I(x);
		O(y);
		var C = I(y, 2), E = (e) => {
			var t = t_(), n = P(t), r = N(n), i = F(I(r));
			O(n);
			var a = I(n, 2);
			G(a), L((e) => {
				H(r, `${e ?? ""} `), H(i, `${R(u).size ?? ""} px`), K(a, R(u).size);
			}, [() => Y("lbl.gridSize")]), z("input", a, (e) => w("size", Number(e.target.value))), V(e, t);
		};
		U(C, (e) => {
			R(u) && e(E);
		});
		var le = I(C, 4), ue = F(le, !0), de = I(le, 2);
		ni(de, 21, () => [["", "common.standard"], ...Object.entries(Pm)], ([e, t]) => e, (e, t) => {
			var n = /* @__PURE__ */ A(() => h(R(t), 2));
			let r = () => R(n)[0], i = () => R(n)[1], a = /* @__PURE__ */ A(() => re(r()));
			var o = n_();
			let s;
			var c = N(o), l = N(c), u = I(l, 2), d = I(u, 2);
			O(c);
			var f = F(I(c, 2), !0);
			O(o), L((e, t) => {
				s = Ei(o, 1, "rs-card", null, s, { on: R(p) === r() }), J(o, "title", e), Oi(c, `background: ${R(a).bg ?? ""}`), Oi(l, `background: ${R(a).text ?? ""}`), Oi(u, `background: ${R(a).surface ?? ""}`), Oi(d, `background: ${R(a).accent ?? ""}`), H(f, t);
			}, [() => Y("tip.props.sectionTheme"), () => Y(i())]), z("click", o, () => ne(r())), V(e, o);
		}), O(de);
		var fe = I(de, 2), pe = N(fe), me = I(pe), he = N(me), ge = F(he), _e = I(he, 2);
		W(_e, () => X.copy, !0), O(_e), O(me), O(fe);
		var ve = I(fe, 4), ye = F(ve, !0), be = I(ve, 2);
		$g(be, {
			get bg() {
				return R(c);
			},
			get layers() {
				return R(s);
			}
		});
		var xe = I(be, 4), Se = F(xe, !0), Ce = I(xe, 2);
		ni(Ce, 16, () => [["top", "lbl.dividerTop"], ["bottom", "lbl.dividerBottom"]], ([e, t]) => e, (e, t) => {
			var n = /* @__PURE__ */ A(() => h(t, 2));
			let r = () => R(n)[0], i = () => R(n)[1], a = /* @__PURE__ */ A(() => R(l)[r()]);
			var o = i_(), s = P(o), c = N(s), u = I(c);
			{
				let e = /* @__PURE__ */ A(() => R(a)?.shape ?? ""), t = /* @__PURE__ */ A(() => [["", Y("common.none")], ...Tm.map((e) => [e, Y(`opt.divider.${e}`)])]);
				Ao(u, {
					get value() {
						return R(e);
					},
					get options() {
						return R(t);
					},
					onchange: (e) => ae(r(), "shape", e)
				});
			}
			O(s);
			var d = I(s, 2), f = (e) => {
				var t = r_(), n = P(t), i = N(n), o = F(i, !0), s = I(i, 2);
				G(s);
				var c = F(I(s, 2));
				O(n);
				var l = I(n, 2), u = N(l), d = I(u);
				{
					let e = /* @__PURE__ */ A(() => R(a).color ?? "bg"), t = /* @__PURE__ */ A(ee), n = /* @__PURE__ */ A(() => Y("tip.divider.color"));
					Na(d, {
						get value() {
							return R(e);
						},
						get tokens() {
							return R(t);
						},
						get label() {
							return R(n);
						},
						onchange: (e) => ae(r(), "color", e)
					});
				}
				O(l);
				var f = I(l, 2), p = N(f);
				G(p);
				var m = I(p);
				O(f);
				var h = I(f, 2), g = N(h);
				G(g);
				var _ = I(g);
				O(h), L((e, t, n, r, i, d, v) => {
					H(o, e), J(s, "min", Em.min), J(s, "max", Em.max), K(s, R(a).height ?? Em.dflt), H(c, `${R(a).height ?? Em.dflt ?? ""} px`), J(l, "title", t), H(u, `${n ?? ""} `), J(f, "title", r), q(p, R(a).flip === !0), H(m, ` ${i ?? ""}`), J(h, "title", d), q(g, R(a).invert === !0), H(_, ` ${v ?? ""}`);
				}, [
					() => Y("lbl.height"),
					() => Y("tip.divider.color"),
					() => Y("lbl.color"),
					() => Y("tip.divider.flip"),
					() => Y("lbl.dividerFlip"),
					() => Y("tip.divider.invert"),
					() => Y("lbl.patternInvert")
				]), z("input", s, (e) => ae(r(), "height", e.target.valueAsNumber)), z("change", p, (e) => ae(r(), "flip", e.target.checked)), z("change", g, (e) => ae(r(), "invert", e.target.checked)), V(e, t);
			};
			U(d, (e) => {
				R(a)?.shape && e(f);
			}), L((e, t) => {
				J(s, "title", e), H(c, `${t ?? ""} `);
			}, [() => Y("tip.props.dividers"), () => Y(i())]), V(e, o);
		});
		var we = I(Ce, 4), Te = N(we), Ee = I(Te);
		{
			let e = /* @__PURE__ */ A(() => b(R(o)) ? R(o).type : "");
			Ao(Ee, {
				get value() {
					return R(e);
				},
				get options() {
					return _;
				},
				onchange: (e) => ie(e || null)
			});
		}
		O(we);
		var D = I(we, 2), De = (e) => {
			var t = o_(), n = P(t), r = N(n), i = I(r);
			G(i), O(n);
			var a = I(n, 2), s = N(a), c = I(s);
			G(c), O(a);
			var l = I(a, 2), u = (e) => {
				var t = a_(), n = P(t), r = N(n), i = I(r);
				{
					let e = /* @__PURE__ */ A(() => R(o).props.effect ?? "slide-up"), t = /* @__PURE__ */ A(() => [
						["fade-in", Y("anim.fadeIn")],
						["slide-up", Y("anim.slideUp")],
						["zoom-in", Y("anim.zoomIn")]
					]);
					Ao(i, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => ce("effect", e)
					});
				}
				O(n);
				var a = I(n, 2), s = N(a), c = I(s);
				G(c), O(a);
				var l = I(a, 2), u = N(l), d = I(u);
				{
					let e = /* @__PURE__ */ A(() => R(o).props.pattern ?? "sequence"), t = /* @__PURE__ */ A(() => [
						["sequence", Y("opt.stagger.sequence")],
						["columns", Y("opt.stagger.columns")],
						["rows", Y("opt.stagger.rows")],
						["center", Y("opt.stagger.center")]
					]);
					Ao(d, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => ce("pattern", e)
					});
				}
				O(l), L((e, t, i, d, f, p) => {
					J(n, "title", e), H(r, `${t ?? ""} `), J(a, "title", i), H(s, `${d ?? ""} `), K(c, R(o).props.step ?? 90), J(l, "title", f), H(u, `${p ?? ""} `);
				}, [
					() => Y("tip.props.staggerEffect"),
					() => Y("lbl.staggerEffect"),
					() => Y("tip.props.staggerStep"),
					() => Y("lbl.stepMs"),
					() => Y("tip.props.staggerPattern"),
					() => Y("lbl.pattern")
				]), z("change", c, (e) => se("step", Number(e.target.value))), V(e, t);
			};
			U(l, (e) => {
				R(o).type === "stagger" && e(u);
			}), L((e, t) => {
				H(r, `${e ?? ""} `), K(i, R(o).props.duration), H(s, `${t ?? ""} `), K(c, R(o).props.delay ?? 0);
			}, [() => Y("lbl.durationMs"), () => Y("lbl.delayMs")]), z("change", i, (e) => se("duration", Number(e.target.value))), z("change", c, (e) => se("delay", Number(e.target.value))), V(e, t);
		}, Oe = /* @__PURE__ */ A(() => b(R(o)));
		U(D, (e) => {
			R(Oe) && e(De);
		});
		var ke = I(D, 2), k = N(ke), Ae = I(k);
		{
			let e = /* @__PURE__ */ A(() => R(d)?.type ?? (R(o) && !b(R(o)) ? R(o).type : ""));
			Ao(Ae, {
				get value() {
					return R(e);
				},
				get options() {
					return v;
				},
				onchange: (e) => oe(e || null)
			});
		}
		O(ke), L((e, t, n, o, s, c, l, d, p, h, _, v, y, b, C, w, T) => {
			H(i, e), J(a, "title", t), H(m, `${n ?? ""} `), K(g, R(f)), J(g, "placeholder", o), q(x, R(u) !== null), H(S, ` ${s ?? ""}`), J(le, "title", c), H(ue, l), J(fe, "title", d), H(pe, `${p ?? ""} `), H(ge, `#${R(r) ?? ""}`), J(_e, "title", h), H(ye, _), J(xe, "title", v), H(Se, y), J(we, "title", b), H(Te, `${C ?? ""} `), J(ke, "title", w), H(k, `${T ?? ""} `);
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
			() => Y("tip.props.dividers"),
			() => Y("lbl.sectionDividers"),
			() => Y("tip.props.sectionAnim"),
			() => Y("lbl.animIn"),
			() => Y("tip.props.sectionHover"),
			() => Y("lbl.onHover")
		]), z("change", g, (e) => T(e.target.value)), z("change", x, (e) => te(e.target.checked)), z("click", _e, () => navigator.clipboard?.writeText(`#${R(r)}`)), V(e, t);
	}, pe = (e) => {
		var t = c_(), n = F(t, !0);
		L((e) => H(n, e), [() => Y("hint.props.empty")]), V(e, t);
	};
	U(ue, (e) => {
		R(m) ? e(de) : R(r) ? e(fe, 1) : e(pe, -1);
	}), O(le), V(e, le), et();
}
Mr([
	"change",
	"input",
	"click"
]);
//#endregion
//#region ../template/assets/engine/0.7.4/collections-csv.js
var d_ = [
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
function f_(e) {
	let t = String(e ?? "");
	return /[",\n\r]/.test(t) ? `"${t.replaceAll("\"", "\"\"")}"` : t;
}
function p_(e, t) {
	return t === "sizes" ? (e.sizes ?? []).join("|") : t === "colors" ? (e.colors ?? []).map((e) => e.name).join("|") : e[t] ?? "";
}
function m_(e) {
	let t = [d_.join(",")];
	for (let n of e ?? []) t.push(d_.map((e) => f_(p_(n, e))).join(","));
	return t.join("\n") + "\n";
}
function h_(e) {
	let t = [], n = [], r = "", i = !1, a = String(e ?? "");
	for (let e = 0; e < a.length; e += 1) {
		let o = a[e];
		i ? o === "\"" && a[e + 1] === "\"" ? (r += "\"", e += 1) : o === "\"" ? i = !1 : r += o : o === "\"" ? i = !0 : o === "," ? (n.push(r), r = "") : o === "\n" || o === "\r" ? (o === "\r" && a[e + 1] === "\n" && (e += 1), n.push(r), t.push(n), n = [], r = "") : r += o;
	}
	return (r !== "" || n.length) && (n.push(r), t.push(n)), t.filter((e) => e.some((e) => e.trim() !== ""));
}
var g_ = (e) => String(e ?? "").split("|").map((e) => e.trim()).filter(Boolean);
function __(e) {
	let t = h_(e);
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
		let s = g_(t.sizes);
		s.length && (o.sizes = s);
		let c = g_(t.colors);
		c.length && (o.colors = c.map((e) => ({ name: e }))), r.push(o);
	}
	return {
		entries: r,
		skipped: i
	};
}
//#endregion
//#region src/panels/CollectionsPanel.svelte
var v_ = /* @__PURE__ */ B("<label> <!></label>"), y_ = /* @__PURE__ */ B("<label> <input type=\"date\"/></label>"), b_ = /* @__PURE__ */ B("<label> <input/></label>"), x_ = /* @__PURE__ */ B("<img class=\"site-icon-preview\" alt=\"\"/> <button class=\"ghost row-tool\"></button>", 1), S_ = /* @__PURE__ */ B("<img class=\"site-icon-preview\" alt=\"\"/>"), C_ = /* @__PURE__ */ B("<span class=\"toolbar-row\"><input/> <label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <!> <button class=\"ghost row-tool\"></button></span>"), w_ = /* @__PURE__ */ B("<label> <input type=\"number\" min=\"0\" step=\"0.01\"/></label> <label> <input type=\"number\" min=\"0\" step=\"0.01\"/></label> <label> <input/></label> <label> <input/></label> <!> <button class=\"ghost action\"> </button>", 1), T_ = /* @__PURE__ */ B("<details class=\"group collection-entry\"><summary> </summary> <div class=\"group-items\"><span class=\"toolbar-row\"><input/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span> <!> <textarea rows=\"3\"></textarea> <!> <span class=\"toolbar-row\"><label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <!></span> <!></div></details>"), E_ = /* @__PURE__ */ B("<p class=\"panel-hint\"> </p>"), D_ = /* @__PURE__ */ B("<span class=\"toolbar-row\"><button class=\"ghost action\"> </button> <button class=\"ghost action\"> </button> <label class=\"ghost filepick\"> <input type=\"file\" accept=\".csv,text/csv\"/></label> <button class=\"ghost row-tool\"></button></span> <!> <!> <hr class=\"gridmenu-divider\"/>", 1), O_ = /* @__PURE__ */ B("<div class=\"panel-body\"><!> <!> <label> <input/></label> <label> <!></label> <button class=\"ghost action\"> </button></div>");
function k_(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.collectionIds), i = /* @__PURE__ */ A(() => n.collectionStores), a = /* @__PURE__ */ A(() => n.collectionsView), { addCollection: o, addCollectionEntry: s, compressOrTrim: c, mutateCollection: l, plainTitle: u, removeCollection: d, setStatus: f } = n, p = [
		["news", Y("collectionKind.news")],
		["notices", Y("collectionKind.notices")],
		["publications", Y("collectionKind.publications")],
		["products", Y("collectionKind.products")],
		["custom", Y("collectionKind.custom")]
	];
	function m(e, t, n, r) {
		l(e, `edit:collection:${e}:${t}:${n}`, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function h(e, t, n) {
		l(e, `collection:${e}:move-entry`, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function g(e, t) {
		l(e, `collection:${e}:remove-entry`, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function _(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && m(e, t, "image", (await c(r)).dataUrl);
	}
	function v(e, t, n) {
		let r = n.split(",").map((e) => e.trim()).filter(Boolean);
		m(e, t, "sizes", r.length ? r : "");
	}
	function y(e, t) {
		l(e, `collection:${e}:${t}:colors`, (e) => {
			let n = e.entries.find((e) => e.id === t);
			n && (n.colors = [...n.colors ?? [], { name: Y("ph.colorName") }]);
		});
	}
	function b(e, t, n, r, i) {
		l(e, `edit:collection:${e}:${t}:color:${n}:${r}`, (e) => {
			let a = e.entries.find((e) => e.id === t)?.colors?.[n];
			a && (r === "image" && !i ? delete a.image : i && (a[r] = i));
		});
	}
	async function x(e, t, n, r) {
		let i = r.target.files?.[0];
		r.target.value = "", i && b(e, t, n, "image", (await c(i)).dataUrl);
	}
	function S(e, t, n) {
		l(e, `collection:${e}:${t}:colors`, (e) => {
			let r = e.entries.find((e) => e.id === t);
			r?.colors && (r.colors = r.colors.filter((e, t) => t !== n), r.colors.length || delete r.colors);
		});
	}
	function C(e) {
		let t = R(i)[e]?.data;
		if (!t) return;
		let n = URL.createObjectURL(new Blob([m_(t.entries)], { type: "text/csv" })), r = document.createElement("a");
		r.href = n, r.download = `${e}.csv`, r.click(), URL.revokeObjectURL(n);
	}
	async function w(e, t) {
		let n = t.target.files?.[0];
		if (t.target.value = "", !n) return;
		let r = __(await n.text());
		if (!r) {
			f(Y("status.csvInvalid"), "error");
			return;
		}
		let i = /* @__PURE__ */ new Set();
		for (let e of r.entries) (!/^[a-z0-9][a-z0-9-]*$/.test(e.id) || i.has(e.id)) && (e.id = Up("entry")), i.add(e.id);
		l(e, `collection:${e}:import`, (e) => {
			e.entries = r.entries;
		}), f(Y("status.csvImported", { count: String(r.entries.length) }), "ok");
	}
	var T = O_(), E = N(T), ee = (e) => {
		var t = v_(), i = N(t), o = I(i);
		{
			let e = /* @__PURE__ */ A(() => n.activeCollection ?? ""), t = /* @__PURE__ */ A(() => [["", Y("common.choose")], ...R(r).map((e) => [e, R(a)[e]?.name ?? e])]);
			Ao(o, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => n.activeCollection = e || null
			});
		}
		O(t), L((e) => H(i, `${e ?? ""} `), [() => Y("blocks.collection")]), V(e, t);
	};
	U(E, (e) => {
		R(r).length && e(ee);
	});
	var te = I(E, 2), ne = (e) => {
		let t = /* @__PURE__ */ A(() => R(a)[n.activeCollection]);
		var r = D_(), i = P(r), o = N(i), c = F(o, !0), l = I(o, 2), f = F(l, !0), p = I(l, 2), T = N(p), E = I(T);
		O(p);
		var ee = I(p, 2);
		W(ee, () => X.cross, !0), O(ee), O(i);
		var te = I(i, 2);
		ni(te, 19, () => R(t).entries, (e) => e.id, (e, r, i) => {
			var a = T_(), o = N(a), s = F(o), c = I(o, 2), l = N(c), d = N(l);
			G(d);
			var f = I(d, 2), p = N(f);
			W(p, () => X.up, !0), O(p);
			var C = I(p, 2);
			W(C, () => X.down, !0), O(C);
			var w = I(C, 2);
			W(w, () => X.cross, !0), O(w), O(f), O(l);
			var T = I(l, 2), E = (e) => {
				var t = y_(), i = N(t), a = I(i);
				G(a), O(t), L((e) => {
					H(i, `${e ?? ""} `), K(a, R(r).date ?? "");
				}, [() => Y("lbl.date")]), z("change", a, (e) => m(n.activeCollection, R(r).id, "date", e.target.value)), V(e, t);
			};
			U(T, (e) => {
				R(t).kind !== "products" && e(E);
			});
			var ee = I(T, 2);
			ft(ee);
			var te = I(ee, 2), ne = (e) => {
				var t = b_(), i = N(t), a = I(i);
				G(a), O(t), L((e, t) => {
					H(i, `${e ?? ""} `), K(a, R(r).href ?? ""), J(a, "placeholder", t);
				}, [() => Y("lbl.link"), () => Y("ph.collections.href")]), z("change", a, (e) => m(n.activeCollection, R(r).id, "href", e.target.value)), V(e, t);
			};
			U(te, (e) => {
				R(t).kind !== "products" && e(ne);
			});
			var re = I(te, 2), ie = N(re), ae = N(ie), oe = I(ae);
			O(ie);
			var se = I(ie, 2), ce = (e) => {
				var t = x_(), i = P(t), a = I(i, 2);
				W(a, () => X.cross, !0), O(a), L((e) => {
					J(i, "src", R(r).image), J(a, "title", e);
				}, [() => Y("tip.removeImage")]), z("click", a, () => m(n.activeCollection, R(r).id, "image", "")), V(e, t);
			};
			U(se, (e) => {
				R(r).image && e(ce);
			}), O(re);
			var le = I(re, 2), ue = (e) => {
				var t = w_(), i = P(t), a = N(i), o = I(a);
				G(o), O(i);
				var s = I(i, 2), c = N(s), l = I(c);
				G(l), O(s);
				var u = I(s, 2), d = N(u), f = I(d);
				G(f), O(u);
				var p = I(u, 2), h = N(p), g = I(h);
				G(g), O(p);
				var _ = I(p, 2);
				ni(_, 17, () => R(r).colors ?? [], Qr, (e, t, i) => {
					var a = C_(), o = N(a);
					G(o);
					var s = I(o, 2), c = N(s), l = I(c);
					O(s);
					var u = I(s, 2), d = (e) => {
						var n = S_();
						L(() => J(n, "src", R(t).image)), V(e, n);
					};
					U(u, (e) => {
						R(t).image && e(d);
					});
					var f = I(u, 2);
					W(f, () => X.cross, !0), O(f), O(a), L((e, n) => {
						K(o, R(t).name), J(o, "placeholder", e), H(c, `${n ?? ""} `);
					}, [() => Y("ph.colorName"), () => R(t).image ? Y("ui.changeImage") : Y("ui.addImage")]), z("change", o, (e) => b(n.activeCollection, R(r).id, i, "name", e.target.value)), z("change", l, (e) => x(n.activeCollection, R(r).id, i, e)), z("click", f, () => S(n.activeCollection, R(r).id, i)), V(e, a);
				});
				var C = I(_, 2), w = F(C, !0);
				L((e, t, n, i, m, _, v, y, b, x, S) => {
					H(a, `${e ?? ""} `), K(o, R(r).price ?? ""), J(s, "title", t), H(c, `${n ?? ""} `), K(l, R(r).memberPrice ?? ""), J(u, "title", i), H(d, `${m ?? ""} `), K(f, R(r).badge ?? ""), J(p, "title", _), H(h, `${v ?? ""} `), K(g, y), J(g, "placeholder", b), J(C, "title", x), H(w, S);
				}, [
					() => Y("lbl.price"),
					() => Y("tip.entry.memberPrice"),
					() => Y("lbl.memberPrice"),
					() => Y("tip.entry.badge"),
					() => Y("lbl.productBadge"),
					() => Y("tip.entry.sizes"),
					() => Y("lbl.sizes"),
					() => (R(r).sizes ?? []).join(", "),
					() => Y("ph.sizes"),
					() => Y("tip.entry.colors"),
					() => Y("ui.addColor")
				]), z("change", o, (e) => m(n.activeCollection, R(r).id, "price", e.target.value === "" ? "" : Number(e.target.value))), z("change", l, (e) => m(n.activeCollection, R(r).id, "memberPrice", e.target.value === "" ? "" : Number(e.target.value))), z("change", f, (e) => m(n.activeCollection, R(r).id, "badge", e.target.value)), z("change", g, (e) => v(n.activeCollection, R(r).id, e.target.value)), z("click", C, () => y(n.activeCollection, R(r).id)), V(e, t);
			};
			U(le, (e) => {
				R(t).kind === "products" && e(ue);
			}), O(c), O(a), L((e, n, a, o, c) => {
				H(s, `${e ?? ""}${R(t).kind === "products" ? R(r).price == null ? "" : ` · ${R(r).price}` : R(r).date ? ` · ${R(r).date}` : ""}`), K(d, R(r).title), J(d, "title", n), p.disabled = R(i) === 0, C.disabled = R(i) === R(t).entries.length - 1, J(w, "title", a), J(ee, "placeholder", o), K(ee, R(r).text ?? ""), H(ae, `${c ?? ""} `);
			}, [
				() => u(R(r).title),
				() => Y("lbl.title"),
				() => Y("tip.collections.deleteEntry"),
				() => Y("ph.collections.text"),
				() => R(r).image ? Y("ui.changeImage") : Y("ui.addImage")
			]), z("change", d, (e) => m(n.activeCollection, R(r).id, "title", e.target.value || Y("ui.untitled"))), z("click", p, () => h(n.activeCollection, R(i), -1)), z("click", C, () => h(n.activeCollection, R(i), 1)), z("click", w, () => g(n.activeCollection, R(r).id)), z("change", ee, (e) => m(n.activeCollection, R(r).id, "text", e.target.value)), z("change", oe, (e) => _(n.activeCollection, R(r).id, e)), V(e, a);
		});
		var ne = I(te, 2), re = (e) => {
			var t = E_(), n = F(t, !0);
			L((e) => H(n, e), [() => Y("hint.collections.empty")]), V(e, t);
		};
		U(ne, (e) => {
			R(t).entries.length || e(re);
		}), De(2), L((e, t, n, r, i, a) => {
			H(c, e), J(l, "title", t), H(f, n), J(p, "title", r), H(T, `${i ?? ""} `), J(ee, "title", a);
		}, [
			() => Y("ui.addEntry"),
			() => Y("tip.collections.exportCsv"),
			() => Y("ui.exportCsv"),
			() => Y("tip.collections.importCsv"),
			() => Y("ui.importCsv"),
			() => Y("tip.collections.deleteCollection")
		]), z("click", o, () => s(n.activeCollection)), z("click", l, () => C(n.activeCollection)), z("change", E, (e) => w(n.activeCollection, e)), z("click", ee, () => d(n.activeCollection)), V(e, r);
	};
	U(te, (e) => {
		n.activeCollection && R(a)[n.activeCollection] && e(ne);
	});
	var re = I(te, 2), ie = N(re), ae = I(ie);
	G(ae), O(re);
	var oe = I(re, 2), se = N(oe);
	Ao(I(se), {
		get value() {
			return n.newCollectionKind;
		},
		get options() {
			return p;
		},
		onchange: (e) => n.newCollectionKind = e
	}), O(oe);
	var ce = I(oe, 2), le = F(ce, !0);
	O(T), L((e, t, n, r, i) => {
		H(ie, `${e ?? ""} `), J(ae, "placeholder", t), H(se, `${n ?? ""} `), ce.disabled = r, H(le, i);
	}, [
		() => Y("lbl.newCollectionName"),
		() => Y("ph.collections.name"),
		() => Y("common.type"),
		() => !n.newCollectionName.trim(),
		() => Y("ui.createCollection")
	]), z("keydown", ae, (e) => e.key === "Enter" && o()), Ii(ae, () => n.newCollectionName, (e) => n.newCollectionName = e), z("click", ce, o), V(e, T), et();
}
Mr([
	"click",
	"change",
	"keydown"
]);
//#endregion
//#region src/panels/PluginsPanel.svelte
var A_ = /* @__PURE__ */ B("<p class=\"panel-hint\"> </p>"), j_ = /* @__PURE__ */ B("<span class=\"plugin-meta\"> </span>"), M_ = /* @__PURE__ */ B("<p class=\"panel-hint plugin-warn\"> </p>"), N_ = /* @__PURE__ */ B("<div><span class=\"plugin-head\"><span class=\"plugin-name\"> </span> <!> <span class=\"row-tools\"><label class=\"gridmenu-snap plugin-toggle\"><input type=\"checkbox\"/> </label> <button class=\"ghost row-tool\"></button></span></span> <!> <!></div>"), P_ = /* @__PURE__ */ B("<div class=\"plugin-row\"><span class=\"plugin-head\"><span class=\"plugin-name\"> </span> <!> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button></span></span></div>"), F_ = /* @__PURE__ */ B("<hr class=\"gridmenu-divider\"/> <p class=\"panel-strong\"> </p> <!>", 1), I_ = /* @__PURE__ */ B("<hr class=\"gridmenu-divider\"/> <input/> <button class=\"ghost action\"> </button> <!>", 1), L_ = /* @__PURE__ */ B("<div class=\"panel-body\"><!> <!> <!> <!></div>");
function R_(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.liveCsp), i = /* @__PURE__ */ A(() => n.pluginDiscovery), a = /* @__PURE__ */ A(() => n.pluginEngine), o = /* @__PURE__ */ A(() => n.pluginInfo), s = /* @__PURE__ */ A(() => n.pluginsView), { knownPlugins: c, loadPluginInfo: l, removePlugin: u, setPluginEnabled: d } = n, f = /* @__PURE__ */ j(""), p = /* @__PURE__ */ j("");
	function m(e) {
		let t = [
			...(e.scriptSrc ?? []).map((e) => ["script-src", e]),
			...(e.connectSrc ?? []).map((e) => ["connect-src", e]),
			...(e.frameSrc ?? []).map((e) => ["frame-src", e])
		];
		if (!R(r) || R(r).unknown) return [];
		let n = {
			"script-src": R(r).scriptSrc,
			"connect-src": R(r).connectSrc,
			"frame-src": R(r).frameSrc
		};
		return t.filter(([e, t]) => !n[e]?.has(t)).map(([e, t]) => `${e} ${t}`);
	}
	async function h() {
		M(p, "");
		let e = R(f).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			M(p, Y("plugin.invalidId"), !0);
			return;
		}
		if (c().includes(e)) {
			M(p, Y("plugin.alreadyListed"), !0);
			return;
		}
		if (await l(e), R(o)[e].errors.length) {
			M(p, Y("plugin.invalidManifest", { errors: R(o)[e].errors.join("; ") }), !0);
			return;
		}
		d(e, !0), M(f, "");
	}
	function g(e) {
		n.pluginsFound = n.pluginsFound.filter((t) => t !== e), d(e, !0);
	}
	var _ = L_(), v = N(_), y = (e) => {
		var t = A_(), n = F(t, !0);
		L((e) => H(n, e), [() => Y("hint.plugins.empty")]), V(e, t);
	}, b = /* @__PURE__ */ A(() => !c().length);
	U(v, (e) => {
		R(b) && e(y);
	});
	var x = I(v, 2);
	ni(x, 16, c, (e) => e, (e, t) => {
		let n = /* @__PURE__ */ A(() => R(o)[t]), r = /* @__PURE__ */ A(() => (R(s)?.enabled ?? []).includes(t));
		var i = N_();
		let c;
		var l = N(i), f = N(l), p = F(f, !0), h = I(f, 2), g = (e) => {
			var t = j_(), r = F(t);
			L(() => H(r, `v${R(n).version ?? ""}`)), V(e, t);
		};
		U(h, (e) => {
			R(n)?.version && e(g);
		});
		var _ = I(h, 2), v = N(_), y = N(v);
		G(y);
		var b = I(y);
		O(v);
		var x = I(v, 2);
		W(x, () => X.cross, !0), O(x), O(_), O(l);
		var S = I(l, 2), C = (e) => {
			var t = M_(), r = F(t, !0);
			L((e) => H(r, e), [() => R(n).errors.join("; ")]), V(e, t);
		}, w = (e) => {
			var t = M_(), r = F(t, !0);
			L((e) => H(r, e), [() => Y("plugin.engineMismatch", {
				required: R(n).requiresEngine,
				current: R(a)
			})]), V(e, t);
		}, T = (e) => {
			var t = M_(), r = F(t, !0);
			L((e) => H(r, e), [() => Y("plugin.cspNeeded", { list: m(R(n).csp).join(", ") })]), V(e, t);
		}, E = /* @__PURE__ */ A(() => R(n)?.csp && m(R(n).csp).length);
		U(S, (e) => {
			R(n)?.errors?.length ? e(C) : R(n) && !R(n).satisfied ? e(w, 1) : R(E) && e(T, 2);
		});
		var ee = I(S, 2), te = (e) => {
			var t = A_(), r = F(t, !0);
			L((e) => H(r, e), [() => Y("plugin.languages", { list: R(n).languages.map((e) => e.name).join(", ") })]), V(e, t);
		};
		U(ee, (e) => {
			R(n)?.languages?.length && e(te);
		}), O(i), L((e, t, a, o, s) => {
			c = Ei(i, 1, "plugin-row", null, c, { "plugin-broken": R(n)?.errors?.length }), H(p, e), J(v, "title", t), q(y, R(r)), y.disabled = a, H(b, ` ${o ?? ""}`), J(x, "title", s);
		}, [
			() => R(n)?.names?.[ca()] ?? R(n)?.name ?? t,
			() => R(r) ? Y("tip.plugins.on") : Y("tip.plugins.off"),
			() => !!R(n)?.errors?.length,
			() => R(r) ? Y("ui.on") : Y("ui.off"),
			() => Y("tip.plugins.remove")
		]), z("change", y, (e) => d(t, e.target.checked)), z("click", x, () => u(t)), V(e, i);
	});
	var S = I(x, 2), C = (e) => {
		var t = F_(), r = I(P(t), 2), i = F(r, !0);
		ni(I(r, 2), 16, () => n.pluginsFound, (e) => e, (e, t) => {
			var n = P_(), r = N(n), i = N(r), a = F(i, !0), s = I(i, 2), c = (e) => {
				var n = j_(), r = F(n);
				L(() => H(r, `v${R(o)[t].version ?? ""}`)), V(e, n);
			};
			U(s, (e) => {
				R(o)[t]?.version && e(c);
			});
			var l = I(s, 2), u = N(l);
			W(u, () => X.right, !0), O(u), O(l), O(r), O(n), L((e, t) => {
				H(a, e), J(u, "title", t);
			}, [() => R(o)[t]?.names?.[ca()] ?? R(o)[t]?.name ?? t, () => Y("tip.plugins.addFound")]), z("click", u, () => g(t)), V(e, n);
		}), L((e) => H(i, e), [() => Y("hint.plugins.found")]), V(e, t);
	};
	U(S, (e) => {
		n.pluginsFound.length && e(C);
	});
	var w = I(S, 2), T = (e) => {
		var t = Vr(), r = P(t), i = (e) => {
			var t = A_(), n = F(t, !0);
			L((e) => H(n, e), [() => Y("hint.plugins.autoDiscover")]), V(e, t);
		};
		U(r, (e) => {
			n.pluginsFound.length || e(i);
		}), V(e, t);
	}, E = (e) => {
		var t = I_(), n = I(P(t), 2);
		G(n);
		var r = I(n, 2), i = F(r, !0), a = I(r, 2), o = (e) => {
			var t = M_(), n = F(t, !0);
			L(() => H(n, R(p))), V(e, t);
		};
		U(a, (e) => {
			R(p) && e(o);
		}), L((e, t, a) => {
			J(n, "placeholder", e), r.disabled = t, H(i, a);
		}, [
			() => Y("ph.plugins.folder"),
			() => !R(f).trim(),
			() => Y("ui.addPlugin")
		]), z("keydown", n, (e) => e.key === "Enter" && h()), Ii(n, () => R(f), (e) => M(f, e)), z("click", r, h), V(e, t);
	};
	U(w, (e) => {
		R(i) === "ok" ? e(T) : e(E, -1);
	}), O(_), V(e, _), et();
}
Mr([
	"change",
	"click",
	"keydown"
]);
//#endregion
//#region src/panels/HistoryPanel.svelte
var z_ = /* @__PURE__ */ B("<p class=\"panel-hint\"> </p>"), B_ = /* @__PURE__ */ B("<div><span class=\"history-msg\"> </span> <span class=\"history-meta\"> </span></div>"), V_ = /* @__PURE__ */ B("<button class=\"ghost\"> </button> <!>", 1), H_ = /* @__PURE__ */ B("<!> <!>", 1), U_ = /* @__PURE__ */ B("<div class=\"panel-body\"><!></div>");
function W_(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.auth), i = /* @__PURE__ */ A(() => n.historyError), a = /* @__PURE__ */ A(() => n.historyList), o = /* @__PURE__ */ A(() => n.siteDraft), { askConfirm: s, loadHistory: c, refreshBaseSha: l, setStatus: u } = n, d = /* @__PURE__ */ j(!1), f = (() => {
		let e = {
			dateStyle: "short",
			timeStyle: "short"
		};
		try {
			return new Intl.DateTimeFormat(ca(), e);
		} catch {
			return new Intl.DateTimeFormat(void 0, e);
		}
	})();
	async function p() {
		let e = R(a)?.[0];
		if (e && !R(d) && await s({
			title: Y("confirm.revert.title"),
			lines: [`«${e.message}»`, Y("confirm.revert.body")],
			okLabel: Y("confirm.revert.ok"),
			cancelLabel: Y("confirm.cancel")
		})) {
			M(d, !0), u(Y("status.reverting"));
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? n.baseSha = e : l(), n.revertedSinceLoad = !0, u(Y("status.revertDone"), "ok"), m();
				} else t.status === 409 ? u(Y("status.revertConflict"), "error") : u(sa(await t.json().catch(() => null)) ?? Y("status.revertFailed"), "error");
			} catch {
				u(Y("status.publishLayerUnreachable"), "error");
			}
			M(d, !1), c();
		}
	}
	async function m() {
		let e = ["/content/site.json", ...R(o).pages.map((e) => `/${e.file}`)], t = async () => {
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
				u(Y("status.revertDeployed"), "ok");
				for (let e of Object.keys(localStorage).filter((e) => e.startsWith("urd-draft-"))) localStorage.removeItem(e);
				await new Promise((e) => setTimeout(e, 800)), location.reload();
				return;
			}
		}
		u(Y("status.revertDeployTimeout"), "error");
	}
	var h = U_(), g = N(h), _ = (e) => {
		var t = z_(), n = F(t, !0);
		L((e) => H(n, e), [() => Y("hint.history.loading")]), V(e, t);
	}, v = (e) => {
		var t = H_(), n = P(t), o = (e) => {
			var t = z_(), n = F(t, !0);
			L(() => H(n, R(i))), V(e, t);
		};
		U(n, (e) => {
			R(i) && e(o);
		});
		var s = I(n, 2), c = (e) => {
			var t = V_(), n = P(t), i = F(n, !0);
			ni(I(n, 2), 19, () => R(a), (e) => e.sha, (e, t, n) => {
				var r = B_();
				let i;
				var a = N(r), o = F(a, !0), s = F(I(a, 2));
				O(r), L((e) => {
					i = Ei(r, 1, "history-row", null, i, { head: R(n) === 0 }), J(a, "title", R(t).sha), H(o, R(t).message), H(s, `${R(t).author ?? ""}${e ?? ""}`);
				}, [() => R(t).date ? ` · ${f.format(new Date(R(t).date))}` : ""]), V(e, r);
			}), L((e, t) => {
				n.disabled = R(d) || !R(r)?.allowed, J(n, "title", e), H(i, t);
			}, [() => R(r)?.allowed ? Y("tip.history.revert") : Y("tip.history.needsAccess"), () => Y("ui.revertLast")]), z("click", n, p), V(e, t);
		};
		U(s, (e) => {
			R(a).length > 0 && e(c);
		}), V(e, t);
	};
	U(g, (e) => {
		R(a) === null ? e(_) : e(v, -1);
	}), O(h), V(e, h), et();
}
Mr(["click"]);
//#endregion
//#region src/panels/UpdatePanel.svelte
var G_ = /* @__PURE__ */ B("<p class=\"panel-hint\"> </p>"), K_ = /* @__PURE__ */ B("<p class=\"panel-hint\"> </p> <button class=\"ghost\"> </button>", 1), q_ = /* @__PURE__ */ B("<span class=\"update-arrow\"></span> <span class=\"badge\"> </span>", 1), J_ = /* @__PURE__ */ B("<details class=\"group\"><summary> </summary> <div class=\"group-items\"><p class=\"update-notes\"> </p></div></details>"), Y_ = /* @__PURE__ */ B("<details class=\"group\"><summary><span class=\"update-warn\"></span> </summary> <div class=\"group-items\"><pre class=\"update-headers\"> </pre></div></details>"), X_ = /* @__PURE__ */ B("<span class=\"chip\"> </span>"), Z_ = /* @__PURE__ */ B("<div class=\"update-row\"><span class=\"update-path\"> </span> <span class=\"update-flags\"><!> <span class=\"update-warn\"></span></span></div>"), Q_ = /* @__PURE__ */ B("<div class=\"update-row\"><span class=\"update-path\"> </span> <!></div>"), $_ = /* @__PURE__ */ B("<span class=\"update-warn\"></span>"), ev = /* @__PURE__ */ B("<div class=\"update-row\"><span> </span> <span class=\"update-flags\"><!> <!> <input type=\"checkbox\"/></span></div>"), tv = /* @__PURE__ */ B("<div class=\"ctl-row update-opt-head\"><p class=\"panel-strong\"> </p> <span class=\"mini-label\"> </span></div> <!>", 1), nv = /* @__PURE__ */ B("<p class=\"update-summary\"> </p> <!> <!> <!> <details class=\"group\"><summary> </summary> <div class=\"group-items\"></div></details> <!> <button class=\"primary update-run\"> </button>", 1), rv = /* @__PURE__ */ B("<div class=\"update-versions\"><span class=\"update-from\"> </span> <!></div> <!>", 1), iv = /* @__PURE__ */ B("<div class=\"panel-body\"><!></div>");
function av(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.auth), i = /* @__PURE__ */ A(() => n.updateError), a = /* @__PURE__ */ A(() => n.updateInfo), { askConfirm: o, loadUpdateCheck: s, setStatus: c } = n;
	function l(e) {
		let t = new Set(n.updateSkip);
		t.has(e) ? t.delete(e) : t.add(e), n.updateSkip = t;
	}
	async function u() {
		if (!R(a) || R(a).upToDate || n.updateBusy) return;
		let e = [...updateSkip], t = R(a).changes.filter((e) => !n.updateSkip.has(e.path)), r = t.filter((e) => e.atom && e.conflict);
		if (await o({
			title: Y("confirm.update.title"),
			lines: [Y("confirm.update.body", {
				target: R(a).target,
				writes: t.filter((e) => e.action === "write").length,
				deletes: t.filter((e) => e.action === "delete").length
			}), ...r.length > 0 ? [Y("confirm.update.warnEdited", { paths: r.map((e) => e.path).join(", ") })] : []],
			okLabel: Y("confirm.update.ok"),
			cancelLabel: Y("confirm.cancel")
		})) {
			n.updateBusy = !0, c(Y("update.running", { target: R(a).target }));
			try {
				let t = await fetch("/api/github/update", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						to: R(a).target,
						expect: R(a).head,
						skip: e
					})
				}), n = await t.json().catch(() => null);
				t.ok ? (c(Y("update.committed", { target: R(a).target }), "ok"), await d(R(a).target.replace(/^v/, ""))) : t.status === 409 ? (c(sa(n) ?? Y("update.checkFailed"), "error"), await s()) : c(sa(n) ?? Y("update.failed"), "error");
			} catch {
				c(Y("status.publishLayerUnreachable"), "error");
			}
			n.updateBusy = !1;
		}
	}
	async function d(e) {
		for (let t = 0; t < 18; t++) {
			await new Promise((e) => setTimeout(e, 1e4));
			try {
				if ((await (await fetch("/urd.json", { cache: "no-store" })).json())?.engine === e) {
					c(Y("update.deployed"), "ok"), await new Promise((e) => setTimeout(e, 800)), location.reload();
					return;
				}
			} catch {}
		}
		c(Y("update.deployTimeout"), "error");
	}
	var f = iv(), p = N(f), m = (e) => {
		var t = G_(), n = F(t, !0);
		L((e) => H(n, e), [() => Y("update.checking")]), V(e, t);
	}, h = (e) => {
		var t = K_(), n = P(t), r = F(n, !0), a = I(n, 2), o = F(a, !0);
		L((e) => {
			H(r, R(i)), H(o, e);
		}, [() => Y("update.retry")]), z("click", a, s), V(e, t);
	}, g = (e) => {
		var t = rv(), i = P(t), o = N(i), s = F(o, !0), c = I(o, 2), d = (e) => {
			var t = q_(), n = P(t);
			W(n, () => X.right, !0), O(n);
			var r = F(I(n, 2), !0);
			L(() => H(r, R(a).target)), V(e, t);
		};
		U(c, (e) => {
			R(a).upToDate || e(d);
		}), O(i);
		var f = I(i, 2), p = (e) => {
			var t = G_(), n = F(t, !0);
			L((e) => H(n, e), [() => Y("update.upToDate")]), V(e, t);
		}, m = (e) => {
			var t = nv(), i = P(t), o = F(i, !0), s = I(i, 2), c = (e) => {
				var t = J_(), n = N(t), r = F(n, !0), i = I(n, 2), o = F(N(i), !0);
				O(i), O(t), L((e) => {
					H(r, e), H(o, R(a).notes);
				}, [() => Y("update.aboutVersion", { target: R(a).target })]), V(e, t);
			};
			U(s, (e) => {
				R(a).notes && e(c);
			});
			var d = I(s, 2), f = (e) => {
				var t = Y_(), n = N(t), r = N(n);
				W(r, () => X.warn, !0), O(r);
				var i = I(r);
				O(n);
				var o = I(n, 2), s = F(N(o), !0);
				O(o), O(t), L((e, t) => {
					J(n, "title", e), H(i, ` ${t ?? ""}`), H(s, R(a).headers.upstream);
				}, [() => Y("update.headersManual"), () => Y("update.headersTitle")]), V(e, t);
			};
			U(d, (e) => {
				R(a).headers?.upstream && e(f);
			});
			var p = I(d, 2);
			ni(p, 17, () => R(a).changes.filter((e) => e.atom && e.conflict), (e) => e.path, (e, t) => {
				var n = Z_(), r = N(n), i = F(r, !0), a = I(r, 2), o = N(a), s = (e) => {
					var t = X_(), n = F(t, !0);
					L((e) => H(n, e), [() => Y("update.actionDelete")]), V(e, t);
				};
				U(o, (e) => {
					R(t).action === "delete" && e(s);
				});
				var c = I(o, 2);
				W(c, () => X.warn, !0), O(c), O(a), O(n), L((e) => {
					J(r, "title", R(t).path), H(i, R(t).path), J(c, "title", e);
				}, [() => Y(`update.conflict.${R(t).conflict}`)]), V(e, n);
			});
			var m = I(p, 2), h = N(m), g = F(h), _ = I(h, 2);
			ni(_, 21, () => R(a).changes.filter((e) => e.atom && !e.conflict), (e) => e.path, (e, t) => {
				var n = Q_(), r = N(n), i = F(r, !0), a = I(r, 2), o = (e) => {
					var t = X_(), n = F(t, !0);
					L((e) => H(n, e), [() => Y("update.actionDelete")]), V(e, t);
				};
				U(a, (e) => {
					R(t).action === "delete" && e(o);
				}), O(n), L(() => {
					J(r, "title", R(t).path), H(i, R(t).path);
				}), V(e, n);
			}), O(_), O(m);
			var v = I(m, 2), y = (e) => {
				var t = tv(), r = P(t), i = N(r), o = F(i, !0), s = F(I(i, 2), !0);
				O(r), ni(I(r, 2), 17, () => R(a).changes.filter((e) => !e.atom), (e) => e.path, (e, t) => {
					var r = ev(), i = N(r);
					let a;
					var o = F(i, !0), s = I(i, 2), c = N(s), u = (e) => {
						var t = X_(), n = F(t, !0);
						L((e) => H(n, e), [() => Y("update.actionDelete")]), V(e, t);
					};
					U(c, (e) => {
						R(t).action === "delete" && e(u);
					});
					var d = I(c, 2), f = (e) => {
						var n = $_();
						W(n, () => X.warn, !0), O(n), L((e) => J(n, "title", e), [() => Y(`update.conflict.${R(t).conflict}`)]), V(e, n);
					};
					U(d, (e) => {
						R(t).conflict && e(f);
					});
					var p = I(d, 2);
					G(p), O(s), O(r), L((e, n, r, s) => {
						a = Ei(i, 1, "update-path", null, a, { skipped: e }), J(i, "title", R(t).path), H(o, R(t).path), q(p, n), J(p, "title", r), J(p, "aria-label", s);
					}, [
						() => n.updateSkip.has(R(t).path),
						() => n.updateSkip.has(R(t).path),
						() => Y("update.keepMine.title"),
						() => Y("update.keepMine")
					]), z("change", p, () => l(R(t).path)), V(e, r);
				}), L((e, t) => {
					H(o, e), H(s, t);
				}, [() => Y("update.optionalTitle"), () => Y("update.keepMine")]), V(e, t);
			}, b = /* @__PURE__ */ A(() => R(a).changes.some((e) => !e.atom));
			U(v, (e) => {
				R(b) && e(y);
			});
			var x = I(v, 2), S = F(x, !0);
			L((e, t, i, a, s, c) => {
				H(o, e), J(h, "title", t), H(g, `${i ?? ""} · ${a ?? ""}`), x.disabled = n.updateBusy || !R(r)?.allowed, J(x, "title", s), H(S, c);
			}, [
				() => Y("update.summary", {
					writes: R(a).changes.filter((e) => e.action === "write").length,
					deletes: R(a).changes.filter((e) => e.action === "delete").length
				}),
				() => Y("update.atomGroup.title"),
				() => Y("update.atomTitle"),
				() => R(a).changes.filter((e) => e.atom).length,
				() => R(r)?.allowed ? Y("update.run.title") : Y("tip.history.needsAccess"),
				() => Y("update.run", { target: R(a).target })
			]), z("click", x, u), V(e, t);
		};
		U(f, (e) => {
			R(a).upToDate ? e(p) : e(m, -1);
		}), L((e) => H(s, e), [() => Y("update.current", { version: R(a).current })]), V(e, t);
	};
	U(p, (e) => {
		n.updateBusy && !R(a) ? e(m) : R(i) ? e(h, 1) : R(a) && e(g, 2);
	}), O(f), V(e, f), et();
}
Mr(["click", "change"]);
//#endregion
//#region ../template/assets/engine/0.7.4/preset-thumb.js
var ov = /^#[0-9a-fA-F]{3,8}$/, sv = /^[a-z][a-z0-9-]*$/, cv = "#171c26", lv = "#232a38", uv = "#98a1b3", dv = "#7c5cff", fv = (e, t) => `var(--urd-color-${e}, ${t})`;
function pv(e, t) {
	return typeof e == "string" ? ov.test(e) ? e : sv.test(e) ? fv(e, t) : t : t;
}
function mv(e, t = 800) {
	let n = Number.parseFloat(e);
	return !Number.isFinite(n) || n <= 0 ? 400 : typeof e == "string" && e.trim().endsWith("vh") ? n / 100 * t : n;
}
var hv = (e) => Math.round(e * 10) / 10, gv = (e, t, n) => Math.min(n, Math.max(t, e)), _v = (e, t, n, r, i, a = "") => `<rect x="${hv(e)}" y="${hv(t)}" width="${hv(Math.max(n, 1))}" height="${hv(Math.max(r, 1))}" fill="${i}"${a}/>`;
function vv(e) {
	if (e?.theme) return e.theme === "inverse" || e.theme === "deep" ? fv("text", uv) : e.theme === "accent" ? fv("accent", dv) : fv("surface", lv);
	for (let t of e?.background?.layers ?? []) {
		if (t.type === "color") return pv(t.props?.value, cv);
		if (t.type === "gradient") return pv(Array.isArray(t.props?.stops) ? t.props.stops[0] : null, cv);
	}
	return fv("bg", cv);
}
function yv(e, t, n, r, i) {
	let a = /<h[1-3]/.test(String(i?.html ?? "")), o = i?.align === "center", s = fv("text", uv), c = [];
	i?.box && c.push(_v(e, t, n, r, fv("surface", lv), " rx=\"1.5\""));
	let l = i?.box ? Math.min(2, n * .06) : 0, u = e + l, d = n - l * 2, f = [
		.72,
		.9,
		.5
	], p = [
		a ? 4 : 2.2,
		2.2,
		2.2
	], m = gv(r / (p[0] + p[1] + p[2] + 4.8 + 2), 0, 1), h = t + l + Math.min(1, r * .08);
	for (let e = 0; e < 3; e++) {
		let n = Math.min(Math.max(e === 0 ? a ? 1.4 : 1 : .8, p[e] * m), Math.max(r, 1));
		if (e > 0 && h + n > t + r - l) break;
		let i = d * f[e], g = o ? u + (d - i) / 2 : u;
		c.push(_v(g, h, i, n, s, ` opacity="${e === 0 ? .8 : .4}" rx="${hv(Math.min(1, n / 2))}"`)), h += n + Math.max(.8, 2.4 * m);
	}
	return c.join("");
}
function bv(e, t, n, r, i = !1) {
	let a = fv("text", uv), o = [];
	i ? (o.push(_v(e, t, n, r, fv("surface", lv), " rx=\"1.5\" opacity=\"0.35\"")), o.push(`<rect x="${hv(e + .4)}" y="${hv(t + .4)}" width="${hv(Math.max(n - .8, 1))}" height="${hv(Math.max(r - .8, 1))}" fill="none" stroke="${a}" stroke-width="0.6" stroke-dasharray="2 2" opacity="0.35" rx="1.5"/>`)) : o.push(_v(e, t, n, r, fv("surface", lv), " rx=\"1.5\""));
	let s = i ? .15 : .4, c = (t) => hv(e + n * t), l = (e) => hv(t + r * e);
	return o.push(`<polygon points="${c(.08)},${l(.9)} ${c(.42)},${l(.38)} ${c(.62)},${l(.68)} ${c(.75)},${l(.5)} ${c(.92)},${l(.9)}" fill="${a}" opacity="${s}"/>`), o.push(`<circle cx="${c(.28)}" cy="${l(.26)}" r="${hv(Math.max(1, Math.min(n, r) * .1))}" fill="${a}" opacity="${hv(s + .1)}"/>`), o.join("");
}
function xv(e, t, n, r, i) {
	let a = !(Array.isArray(i?.images) && i.images.length), o = Math.max(1, n * .03), s = (n - o * 2) / 3, c = [];
	for (let n = 0; n < 3; n++) c.push(bv(e + n * (s + o), t, s, r, a));
	return c.join("");
}
function Sv(e, t, n, r) {
	let i = Math.max(1, n * .03), a = (n - i * 2) / 3, o = [];
	for (let n = 0; n < 3; n++) {
		let s = e + n * (a + i);
		o.push(_v(s, t, a, r * .55, fv("surface", lv), " rx=\"1.5\"")), o.push(_v(s, t + r * .62, a * .8, 2, fv("text", uv), " opacity=\"0.5\" rx=\"1\""));
	}
	return o.join("");
}
function Cv(e, t, n, r, i) {
	let a = pv(i?.color, dv), o = i?.kind;
	return o === "circle" ? `<ellipse cx="${hv(e + n / 2)}" cy="${hv(t + r / 2)}" rx="${hv(Math.max(n / 2, 1))}" ry="${hv(Math.max(r / 2, 1))}" fill="${a}" opacity="0.8"/>` : o === "triangle" ? `<polygon points="${hv(e)},${hv(t + r)} ${hv(e + n / 2)},${hv(t)} ${hv(e + n)},${hv(t + r)}" fill="${a}" opacity="0.8"/>` : o === "line" || o === "arrow" ? _v(e, t + r / 2 - .75, n, 1.5, a, " opacity=\"0.85\" rx=\"0.75\"") : _v(e, t, n, r, a, " opacity=\"0.8\" rx=\"1\"");
}
function wv(e, t, n, r, i, a) {
	if (e === "text") return yv(t, n, r, i, a);
	if (e === "image") return bv(t, n, r, i, !a?.src);
	if (e === "gallery") return xv(t, n, r, i, a);
	if (e === "collection") return Sv(t, n, r, i);
	if (e === "faq") {
		let e = gv(Math.floor(i / 5), 2, 3), a = Math.max(.6, i * .04), o = (i - a * (e - 1)) / e, s = [];
		for (let i = 0; i < e; i += 1) {
			let e = n + i * (o + a);
			s.push(_v(t, e, r, o, fv("surface", lv), " rx=\"1\"")), s.push(_v(t + r * .06, e + o / 2 - .7, r * .55, 1.4, fv("text", uv), " opacity=\"0.5\" rx=\"0.7\"")), s.push(`<circle cx="${hv(t + r * .92)}" cy="${hv(e + o / 2)}" r="0.9" fill="${fv("text", uv)}" opacity="0.4"/>`);
		}
		return s.join("");
	}
	if (e === "shape") return Cv(t, n, r, i, a);
	if (e === "button") return _v(t, n, r, i, fv("accent", dv), ` rx="${hv(Math.min(i / 2, 4))}"`);
	if (e === "icon") {
		let e = Math.max(1.2, Math.min(r, i) / 2);
		return `<circle cx="${hv(t + r / 2)}" cy="${hv(n + i / 2)}" r="${hv(e)}" fill="${fv("accent", dv)}" opacity="0.85"/>`;
	}
	if (e === "video") {
		let e = [_v(t, n, r, i, fv("surface", lv), " rx=\"1.5\"")], a = t + r / 2, o = n + i / 2, s = Math.max(1.5, Math.min(r, i) * .22);
		return e.push(`<polygon points="${hv(a - s / 2)},${hv(o - s)} ${hv(a - s / 2)},${hv(o + s)} ${hv(a + s)},${hv(o)}" fill="${fv("text", uv)}" opacity="0.6"/>`), e.join("");
	}
	if (e === "timeline") {
		let e = [_v(t + 1, n, 1.4, i, fv("accent", dv), " opacity=\"0.7\" rx=\"0.7\"")];
		for (let a = 0; a < 3; a += 1) {
			let o = n + i * (.18 + a * .32);
			e.push(`<circle cx="${hv(t + 1.7)}" cy="${hv(o)}" r="1.6" fill="${fv("accent", dv)}"/>`), e.push(_v(t + 5, o - 1, r * .5, 2, fv("text", uv), " opacity=\"0.5\" rx=\"1\""));
		}
		return e.join("");
	}
	if (e === "quote") return [
		`<text x="${hv(t + r / 2)}" y="${hv(n + i * .34)}" text-anchor="middle" font-size="${hv(Math.min(r, i) * .5)}" font-family="Georgia, serif" fill="${fv("accent", dv)}">“</text>`,
		_v(t + r * .15, n + i * .48, r * .7, 2, fv("text", uv), " opacity=\"0.6\" rx=\"1\""),
		_v(t + r * .25, n + i * .62, r * .5, 2, fv("text", uv), " opacity=\"0.6\" rx=\"1\""),
		_v(t + r * .35, n + i * .82, r * .3, 1.6, fv("text", uv), " opacity=\"0.35\" rx=\"0.8\"")
	].join("");
	if (e === "ribbon") return [
		_v(t, n + i * .3, r, i * .4, fv("accent", dv), " opacity=\"0.85\" rx=\"1\""),
		_v(t + r * .08, n + i * .46, r * .18, 1.8, fv("bg", cv), " opacity=\"0.9\" rx=\"0.9\""),
		_v(t + r * .34, n + i * .46, r * .24, 1.8, fv("bg", cv), " opacity=\"0.9\" rx=\"0.9\""),
		_v(t + r * .66, n + i * .46, r * .2, 1.8, fv("bg", cv), " opacity=\"0.9\" rx=\"0.9\"")
	].join("");
	if (e === "stats") return [_v(t + r * .28, n + i * .15, r * .44, i * .42, fv("accent", dv), " opacity=\"0.85\" rx=\"1\""), _v(t + r * .32, n + i * .72, r * .36, 1.6, fv("text", uv), " opacity=\"0.4\" rx=\"0.8\"")].join("");
	if (e === "table") {
		let e = Math.max(1.6, i * .22), a = [_v(t, n, r, e, fv("accent", dv), " opacity=\"0.5\" rx=\"0.8\"")], o = gv(Math.floor((i - e) / 3.2), 1, 3);
		for (let s = 0; s < o; s += 1) a.push(_v(t, n + e + 1 + s * ((i - e - 1) / o), r, 1, fv("text", uv), " opacity=\"0.3\""));
		return a.push(_v(t + r * .33, n, .6, i, fv("text", uv), " opacity=\"0.2\"")), a.push(_v(t + r * .66, n, .6, i, fv("text", uv), " opacity=\"0.2\"")), a.join("");
	}
	if (e === "share") {
		let e = Math.max(1.2, Math.min(i / 2, r / 9)), a = [];
		for (let r = 0; r < 4; r += 1) a.push(`<circle cx="${hv(t + e + r * (e * 2 + 1.5))}" cy="${hv(n + i / 2)}" r="${hv(e)}" fill="${fv("accent", dv)}" opacity="0.8"/>`);
		return a.join("");
	}
	if (e === "countdown") {
		let e = Math.max(.8, r * .03), a = (r - e * 3) / 4, o = [];
		for (let r = 0; r < 4; r += 1) {
			let s = t + r * (a + e);
			o.push(_v(s, n, a, i, fv("surface", lv), " rx=\"1\"")), o.push(_v(s + a * .25, n + i * .2, a * .5, i * .35, fv("accent", dv), " opacity=\"0.85\" rx=\"0.8\""));
		}
		return o.join("");
	}
	if (e === "audio") {
		let e = [_v(t, n, r, i, fv("surface", lv), " rx=\"1.5\"")], a = n + i / 2, o = Math.max(1.2, i * .28);
		return e.push(`<polygon points="${hv(t + r * .06)},${hv(a - o)} ${hv(t + r * .06)},${hv(a + o)} ${hv(t + r * .06 + o * 1.4)},${hv(a)}" fill="${fv("accent", dv)}" opacity="0.85"/>`), e.push(_v(t + r * .2, a - .6, r * .7, 1.2, fv("text", uv), " opacity=\"0.35\" rx=\"0.6\"")), e.join("");
	}
	if (e === "product") {
		let e = Math.max(.8, r * .03), a = (r - e * 2) / 3, o = [];
		for (let r = 0; r < 3; r += 1) {
			let s = t + r * (a + e);
			o.push(_v(s, n, a, i, fv("surface", lv), " rx=\"1\"")), o.push(_v(s + a * .08, n + i * .06, a * .84, i * .42, fv("text", uv), " opacity=\"0.15\" rx=\"0.8\"")), o.push(_v(s + a * .08, n + i * .56, a * .6, 1.4, fv("text", uv), " opacity=\"0.5\" rx=\"0.7\"")), o.push(_v(s + a * .08, n + i * .72, a * .35, 1.4, fv("accent", dv), " opacity=\"0.85\" rx=\"0.7\"")), o.push(_v(s + a * .08, n + i * .84, a * .84, i * .1, fv("accent", dv), " opacity=\"0.6\" rx=\"1\""));
		}
		return o.join("");
	}
	if (e === "cart") {
		let e = Math.max(1.5, Math.min(r, i) / 2.4), a = t + r / 2, o = n + i / 2;
		return [
			`<circle cx="${hv(a)}" cy="${hv(o)}" r="${hv(e)}" fill="${fv("surface", lv)}"/>`,
			_v(a - e * .5, o - e * .25, e, e * .55, fv("text", uv), " opacity=\"0.5\" rx=\"0.4\""),
			`<circle cx="${hv(a + e * .75)}" cy="${hv(o - e * .75)}" r="${hv(Math.max(.9, e * .35))}" fill="${fv("accent", dv)}"/>`
		].join("");
	}
	return e === "checkout" ? [
		_v(t, n, r * .7, 1.2, fv("text", uv), " opacity=\"0.5\" rx=\"0.6\""),
		_v(t, n + i * .12, r * .5, 1.2, fv("text", uv), " opacity=\"0.35\" rx=\"0.6\""),
		_v(t, n + i * .3, r, i * .14, fv("surface", lv), " rx=\"1\""),
		_v(t, n + i * .5, r, i * .14, fv("surface", lv), " rx=\"1\""),
		_v(t, n + i * .78, r * .45, i * .16, fv("accent", dv), " opacity=\"0.85\" rx=\"1.2\"")
	].join("") : _v(t, n, r, i, fv("surface", lv), " rx=\"1.5\"");
}
function Tv(e, t, n) {
	let r = Array.isArray(e?.blocks) ? e.blocks : [], i = r.map((e) => (e.frames?.desktop?.y ?? 0) + (e.frames?.desktop?.h ?? 0)), a = n / Math.max(mv(e?.size?.minHeight), i.length ? Math.max(...i) + 16 : 0), o = [_v(0, 0, t, n, vv(e))];
	for (let r of e?.background?.layers ?? []) {
		if (r.type !== "glow") continue;
		let e = r.props ?? {};
		o.push(`<circle cx="${hv(gv(e.x ?? .5, 0, 1) * t)}" cy="${hv(gv(e.y ?? .3, 0, 1) * n)}" r="${hv(t * gv(e.radius ?? .5, .1, 1) * .5)}" fill="${pv(e.color, dv)}" opacity="${hv(gv(e.opacity ?? .3, 0, .5))}"/>`);
	}
	for (let r of e?.background?.layers ?? []) {
		if (r.type !== "slideshow") continue;
		let e = r.props ?? {}, i = e.style ?? "floating", a = fv("surface", lv);
		if (i === "floating") {
			let r = e.look === "polaroid", s = t * (r ? .17 : .13), c = s / (r ? .84 : 1.35);
			for (let r of ac(e.images, {
				...e,
				seed: e.seed || 1,
				style: i
			})) {
				let e = r.x / 100 * t - s / 2, i = r.y / 100 * n - c / 2, l = ` rx="1" opacity="0.75" transform="rotate(${hv(r.rot)} ${hv(e + s / 2)} ${hv(i + c / 2)})"`;
				o.push(_v(e, i, s, c, a, l));
			}
		} else if (i === "band") {
			let r = Number(e.rows) === 1 ? 1 : 2, i = n * (r === 1 ? .4 : .3), s = i * 1.33;
			for (let e = 0; e < r; e += 1) {
				let c = r === 1 ? (n - i) / 2 : n * .1 + e * (i + n * .1);
				for (let n = -s * (e * .5); n < t; n += s + 3) o.push(_v(n, c, s, i, a, " rx=\"1\" opacity=\"0.75\""));
			}
		} else if (i === "mosaic") {
			let r = (t - 10) / 4, i = n / 3.4, s = 0, c = 0;
			for (let t of cc(e.count, e.seed || 1)) {
				s + t.cols > 4 && (s = 0, c += 1);
				let e = 2 + c * (i + 2);
				if (e > n) break;
				o.push(_v(2 + s * (r + 2), e, r * t.cols + 2 * (t.cols - 1), i * t.rows + 2 * (t.rows - 1), a, " rx=\"1\" opacity=\"0.75\"")), s += t.cols, s >= 4 && (s = 0, c += 1);
			}
		}
	}
	let s = t * .06, c = t - s * 2;
	for (let e of r) {
		let r = e.frames?.desktop;
		if (!r) continue;
		let i = gv(s + (r.x ?? 0) * (c / 100), 0, t - 2), l = gv((r.y ?? 0) * a, 0, n - 2), u = gv((r.w ?? 10) * (c / 100), 2, t - i), d = gv((r.h ?? 20) * a, 2, n - l);
		o.push(wv(e.type, i, l, u, d, e.props));
	}
	return o.join("");
}
function Ev(e, { w: t = 96, h: n = 116, max: r = 6 } = {}) {
	let i = (Array.isArray(e?.sections) ? e.sections : []).slice(0, r);
	if (!i.length) return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${_v(0, 0, t, n, fv("bg", cv))}</svg>`;
	let a = i.map((e) => gv(mv(e?.size?.minHeight), 160, 900)), o = a.reduce((e, t) => e + t, 0), s = n - 1 * (i.length - 1), c = [], l = 0;
	for (let e = 0; e < i.length; e += 1) {
		let n = Math.max(6, a[e] / o * s);
		c.push(`<g transform="translate(0 ${hv(l)})">${Tv(i[e], t, n)}</g>`), l += n + 1;
	}
	return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${c.join("")}</svg>`;
}
var Dv = 24, Ov = {
	"oppsett-byttet": "layout-changed",
	"blokk-endret": "block-edited",
	"desktop-endret-etter-mobil": "desktop-changed-after-mobile",
	seksjonshøyde: "section-height",
	"blokk-flyttet": "block-moved",
	"blokk-slettet": "block-deleted",
	"blokk-lagt-til": "block-added"
};
function kv(e, t) {
	if (!e || !("y" in e || "h" in e)) return e ?? null;
	if (t && e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h) return null;
	let n = {
		x: e.x,
		w: e.w
	};
	return Number.isFinite(e.y) && (n.row = Math.max(1, Math.round((e.y - Dv) / 8) + 1), n.rows = Number.isFinite(e.h) ? Math.max(1, Math.ceil(e.h / 8)) : 1), Number.isFinite(e.z) && e.z !== 1 && (n.z = e.z), e.rot && (n.rot = e.rot), n;
}
var Av = {
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
}, jv = { bildegalleri: "slideshow" }, Mv = {
	flate: "surface",
	aksent: "accent",
	invers: "inverse",
	dus: "soft",
	dempet: "muted",
	dyp: "deep",
	uthevet: "highlighted"
}, Nv = {
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
function Pv(e) {
	let t = Array.isArray(e) ? e : e.blocks ?? [];
	for (let e of t) Av[e.type] && (e.type = Av[e.type]);
	if (!Array.isArray(e)) {
		for (let t of e.background?.layers ?? []) jv[t.type] && (t.type = jv[t.type]);
		Mv[e.theme] && (e.theme = Mv[e.theme]), Nv[e.preset] && (e.preset = Nv[e.preset]);
	}
	return e;
}
var Fv = 26;
function Iv(e) {
	for (let t of e?.blocks ?? []) {
		if (t.type !== "calendar" || !t.props || !("scale" in t.props)) continue;
		let e = Tc({
			type: "calendar",
			size: t.props.scale
		});
		delete t.props.scale, e !== 1 && (t.size = e);
	}
}
function Lv(e) {
	for (let t of e?.blocks ?? []) {
		if (t.type !== "map" && t.type !== "kart" || !Number.isFinite(t.props?.height)) continue;
		let n = t.frames?.desktop;
		if (n && Number.isFinite(n.h)) {
			let r = Math.max(n.h, Math.round(t.props.height + Fv)), i = Oc(e.blocks, t.id, r);
			n.h = r;
			for (let t of e.blocks) {
				let e = i.get(t.id);
				Number.isFinite(e) && t.frames?.desktop && (t.frames.desktop.y = e);
			}
		}
		delete t.props.height;
	}
}
function Rv(e, t = !1) {
	for (let n of e?.blocks ?? []) {
		if (n.type !== "gallery" || !n.props) continue;
		let r = n.frames?.desktop;
		if ((t || "bandHeight" in n.props) && n.props.view === "ribbon" && r && Number.isFinite(r.h)) {
			let t = Math.min(400, Math.max(80, Number(n.props.bandHeight) || 160)), i = Number(n.props.rows) === 2 ? 2 : 1, a = Number(n.props.gap) || 0, o = Math.round((i * t + (i - 1) * a) * Tc(n)), s = Oc(e.blocks, n.id, o);
			r.h = o;
			for (let t of e.blocks) {
				let e = s.get(t.id);
				Number.isFinite(e) && t.frames?.desktop && (t.frames.desktop.y = e);
			}
		}
		delete n.props.bandHeight;
	}
}
var zv = {
	1: (e) => {
		for (let t of e.sections ?? []) {
			let e = t.responsive?.mobile;
			for (let e of t.blocks ?? []) e.decor && (e.hideMobile = !0), e.frames?.mobile && (e.frames.mobile = kv(e.frames.mobile, e.frames.desktop));
			e?.mode === "manual" && (e.mode = "auto");
			let n = e?.attention?.reason;
			n && Ov[n] && (e.attention.reason = Ov[n]);
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) Pv(t);
		return e;
	},
	3: (e) => {
		for (let t of e.sections ?? []) Pv(t);
		return e;
	},
	4: (e) => {
		for (let t of e.sections ?? []) Lv(t);
		return e;
	},
	5: (e) => {
		for (let t of e.sections ?? []) Iv(t);
		return e;
	},
	6: (e) => {
		for (let t of e.sections ?? []) Rv(t, !0);
		return e;
	}
}, Bv = {
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
function Vv(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 4;) {
		let r = Bv[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function Hv(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 7;) {
		let i = zv[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/page-presets.js
var Uv = /* @__PURE__ */ new Map();
gm({ sections: { define: (e, t) => Uv.set(e, t) } });
var Wv = [
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
function Gv(e, { pageId: t, title: n }) {
	let r = Wv.find((t) => t.id === e);
	return r ? {
		schemaVersion: 7,
		meta: {
			id: t,
			title: n
		},
		sections: r.sections.map((e) => Uv.get(e).create())
	} : null;
}
//#endregion
//#region src/panels/PagesPanel.svelte
var Kv = /* @__PURE__ */ B("<span class=\"page-path\">/</span>"), qv = /* @__PURE__ */ B("<input class=\"page-slug\"/>"), Jv = /* @__PURE__ */ B("<span class=\"seo-warn\"></span>"), Yv = /* @__PURE__ */ B("<button class=\"ghost danger\"><!> </button>"), Xv = /* @__PURE__ */ B("<div class=\"page-menu\"><button class=\"ghost\"><!> </button> <!></div>"), Zv = /* @__PURE__ */ B("<div><input class=\"page-title\"/> <!> <!> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <span class=\"page-menu-wrap\"><button class=\"ghost row-tool\"></button> <!></span></span></div>"), Qv = /* @__PURE__ */ B("<img class=\"site-icon-preview\"/>"), $v = /* @__PURE__ */ B("<button class=\"ghost row-tool\"></button>"), ey = /* @__PURE__ */ B("<div><button class=\"page-template-pick\"><span class=\"page-template-thumb\"></span> <span class=\"page-template-name\"> </span></button></div>"), ty = /* @__PURE__ */ B("<div><button class=\"page-template-pick\"><span class=\"page-template-thumb\"></span> <span class=\"page-template-name\"> </span></button> <button class=\"page-template-del\"></button></div>"), ny = /* @__PURE__ */ B("<span class=\"mini-label\"> </span> <div class=\"page-template-grid\"></div>", 1), ry = /* @__PURE__ */ B("<div class=\"panel-body\"><!> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><label> <textarea rows=\"2\"></textarea></label> <label> <input/></label> <label> <textarea rows=\"2\"></textarea></label> <label> <!></label> <span class=\"toolbar-row\"><label class=\"ghost filepick tb-grow\"> <input type=\"file\" accept=\"image/*\"/></label> <!></span> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label></div></details> <hr class=\"gridmenu-divider\"/> <input/> <button class=\"ghost action\"> </button> <span class=\"mini-label\"> </span> <div class=\"page-template-grid\"><div><button class=\"page-template-pick\"><span class=\"page-template-thumb\"></span> <span class=\"page-template-name\"> </span></button></div> <!></div> <!></div>");
function iy(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.missingSeo), i = /* @__PURE__ */ A(() => n.pageId), a = /* @__PURE__ */ A(() => n.seoDraft), o = /* @__PURE__ */ A(() => n.siteDraft), s = /* @__PURE__ */ A(() => n.templateIds), { addPage: c, deletePage: l, handleDeleteTemplate: u, renamePage: d, savePageAsTemplate: f, selectPage: p, setPageNoindex: m, setPageSeo: h, setPageSlug: g, templateStores: _, uploadOgImage: v } = n, y = Object.fromEntries(Wv.map((e) => [e.id, Ev(Gv(e.id, {
		pageId: "preview",
		title: ""
	}))])), b = /* @__PURE__ */ A(() => {
		let e = R(o)?.theme?.tokens?.color ?? {};
		return [
			"bg",
			"surface",
			"text",
			"accent"
		].filter((t) => typeof e[t] == "string" && Am(e[t])).map((t) => `--urd-color-${t}: ${e[t]};`).join(" ");
	});
	var x = ry(), S = N(x);
	ni(S, 17, () => R(o).pages, (e) => e.id, (e, t) => {
		var a = Zv();
		let o;
		var s = N(a);
		G(s);
		var c = I(s, 2), u = (e) => {
			var t = Kv();
			L((e) => J(t, "title", e), [() => Y("tip.pages.homeLocked")]), V(e, t);
		}, m = (e) => {
			var n = qv();
			G(n), L((e, t) => {
				K(n, e), J(n, "title", t);
			}, [() => R(t).path.slice(1), () => Y("tip.pages.slug")]), z("change", n, (e) => g(R(t), e.target.value)), V(e, n);
		};
		U(c, (e) => {
			R(t).path === "/" ? e(u) : e(m, -1);
		});
		var h = I(c, 2), _ = (e) => {
			var t = Jv();
			W(t, () => X.warn, !0), O(t), L((e) => J(t, "title", e), [() => Y("tip.pages.missingDescription")]), V(e, t);
		};
		U(h, (e) => {
			R(r)[R(t).id] && e(_);
		});
		var v = I(h, 2), y = N(v);
		W(y, () => X.right, !0), O(y);
		var b = I(y, 2), x = N(b);
		W(x, () => X.kebab, !0), O(x);
		var S = I(x, 2), C = (e) => {
			var r = Xv(), i = N(r), a = N(i);
			W(a, () => X.bookmark);
			var o = I(a);
			O(i);
			var s = I(i, 2), c = (e) => {
				var r = Yv(), i = N(r);
				W(i, () => X.cross);
				var a = I(i);
				O(r), L((e, t) => {
					J(r, "title", e), H(a, ` ${t ?? ""}`);
				}, [() => Y("tip.pages.delete"), () => Y("ui.deletePage")]), z("click", r, () => {
					n.pageMenuFor = null, l(R(t));
				}), V(e, r);
			};
			U(s, (e) => {
				R(t).path !== "/" && e(c);
			}), O(r), L((e) => H(o, ` ${e ?? ""}`), [() => Y("ui.savePageTemplate")]), z("click", i, () => f(R(t))), V(e, r);
		};
		U(S, (e) => {
			n.pageMenuFor === R(t).id && e(C);
		}), O(b), O(v), O(a), L((e, n, r) => {
			o = Ei(a, 1, "page-row", null, o, { current: R(t).id === R(i) }), K(s, R(t).title), J(s, "title", e), J(y, "title", n), y.disabled = R(t).id === R(i), J(x, "title", r);
		}, [
			() => Y("tip.pages.title"),
			() => Y("tip.pages.open"),
			() => Y("tip.pages.menu")
		]), z("change", s, (e) => d(R(t), e.target.value)), z("click", y, () => p(R(t).id)), z("click", x, () => n.pageMenuFor = n.pageMenuFor === R(t).id ? null : R(t).id), V(e, a);
	});
	var C = I(S, 2), w = N(C), T = F(w, !0), E = I(w, 2), ee = N(E), te = N(ee), ne = I(te);
	ft(ne), O(ee);
	var re = I(ee, 2), ie = N(re), ae = I(ie);
	G(ae), O(re);
	var oe = I(re, 2), se = N(oe), ce = I(se);
	ft(ce), O(oe);
	var le = I(oe, 2), ue = N(le), de = I(ue), fe = (e) => {
		var t = Qv();
		L((e) => {
			J(t, "src", R(a).ogImage), J(t, "alt", e);
		}, [() => Y("lbl.ogImage")]), V(e, t);
	};
	U(de, (e) => {
		R(a).ogImage && e(fe);
	}), O(le);
	var pe = I(le, 2), me = N(pe), he = N(me), ge = I(he);
	O(me);
	var _e = I(me, 2), ve = (e) => {
		var t = $v();
		W(t, () => X.cross, !0), O(t), L((e) => J(t, "title", e), [() => Y("tip.seo.removeOgImage")]), z("click", t, () => h("ogImage", "")), V(e, t);
	};
	U(_e, (e) => {
		R(a).ogImage && e(ve);
	}), O(pe);
	var ye = I(pe, 2), be = N(ye);
	G(be);
	var xe = I(be);
	O(ye), O(E), O(C);
	var Se = I(C, 4);
	G(Se);
	var Ce = I(Se, 2), we = F(Ce, !0), Te = I(Ce, 2), Ee = F(Te, !0), D = I(Te, 2), De = N(D);
	let Oe;
	var ke = N(De), k = N(ke);
	W(k, () => Ev({ sections: [] }), !0), O(k);
	var Ae = F(I(k, 2), !0);
	O(ke), O(De), ni(I(De, 2), 17, () => Wv, (e) => e.id, (e, t) => {
		var r = ey();
		let i;
		var a = N(r), o = N(a);
		W(o, () => y[R(t).id], !0), O(o);
		var s = F(I(o, 2), !0);
		O(a), O(r), L((e, o) => {
			i = Ei(r, 1, "page-template-card", null, i, { picked: n.newPageTemplate === `preset:${R(t).id}` }), J(a, "title", e), H(s, o);
		}, [() => Y("tip.pages.templatePick", { name: Y(R(t).labelKey) }), () => Y(R(t).labelKey)]), z("click", a, () => n.newPageTemplate = n.newPageTemplate === `preset:${R(t).id}` ? null : `preset:${R(t).id}`), V(e, r);
	}), O(D);
	var je = I(D, 2), Me = (e) => {
		var t = ny(), r = P(t), i = F(r, !0), a = I(r, 2);
		ni(a, 20, () => R(s).filter((e) => _[e]?.data?.mal?.kind === "page"), (e) => e, (e, t) => {
			var r = ty();
			let i;
			var a = N(r), o = N(a);
			W(o, () => Ev(_[t].data.page), !0), O(o);
			var s = F(I(o, 2), !0);
			O(a);
			var c = I(a, 2);
			W(c, () => X.cross, !0), O(c), O(r), L((e, o) => {
				i = Ei(r, 1, "page-template-card", null, i, { picked: n.newPageTemplate === t }), J(a, "title", e), H(s, _[t].data.mal.name), J(c, "title", o);
			}, [() => Y("tip.pages.templatePick", { name: _[t].data.mal.name }), () => Y("canvas.deleteTemplate")]), z("click", a, () => n.newPageTemplate = n.newPageTemplate === t ? null : t), z("click", c, () => u({ id: t })), V(e, r);
		}), O(a), L((e) => {
			H(i, e), Oi(a, R(b));
		}, [() => Y("canvas.tabMyTemplates")]), V(e, t);
	}, Ne = /* @__PURE__ */ A(() => R(s).some((e) => _[e]?.data?.mal?.kind === "page"));
	U(je, (e) => {
		R(Ne) && e(Me);
	}), O(x), L((e, t, r, i, o, s, c, l, u, d, f, p, m, h, g, _, v, y, x, S, C, w) => {
		H(T, e), J(ee, "title", t), H(te, `${r ?? ""} `), K(ne, R(a).description), J(re, "title", i), H(ie, `${o ?? ""} `), K(ae, R(a).ogTitle), J(ae, "placeholder", s), J(oe, "title", c), H(se, `${l ?? ""} `), K(ce, R(a).ogDescription), J(ce, "placeholder", R(a).description), J(le, "title", u), H(ue, `${d ?? ""} `), J(me, "title", f), H(he, `${p ?? ""} `), J(ye, "title", m), q(be, h), H(xe, ` ${g ?? ""}`), J(Se, "placeholder", _), J(Ce, "title", v), Ce.disabled = y, H(we, x), H(Ee, S), Oi(D, R(b)), Oe = Ei(De, 1, "page-template-card", null, Oe, { picked: n.newPageTemplate === null }), J(ke, "title", C), H(Ae, w);
	}, [
		() => Y("ui.seoGroup", { page: R(o).pages.find((e) => e.id === R(i))?.title ?? "" }),
		() => Y("tip.seo.description"),
		() => Y("lbl.seoDescription"),
		() => Y("tip.seo.ogTitle"),
		() => Y("lbl.ogTitle"),
		() => R(o).pages.find((e) => e.id === R(i))?.title ?? "",
		() => Y("tip.seo.ogDescription"),
		() => Y("lbl.ogDescription"),
		() => Y("tip.seo.ogImage"),
		() => Y("lbl.ogImage"),
		() => Y("tip.seo.ogImage"),
		() => R(a).ogImage ? Y("ui.changeImage") : Y("ui.chooseImage"),
		() => Y("tip.seo.hideFromSearch"),
		() => R(o).pages.find((e) => e.id === R(i))?.noindex === !0,
		() => Y("lbl.hideFromSearch"),
		() => Y("ph.newPageName"),
		() => Y("hint.pages.autoMenu"),
		() => !n.newPageTitle.trim(),
		() => Y("ui.createPage"),
		() => Y("canvas.tabPresets"),
		() => Y("tip.pages.blankPick"),
		() => Y("ui.blankPage")
	]), z("change", ne, (e) => h("description", e.target.value)), z("change", ae, (e) => h("ogTitle", e.target.value)), z("change", ce, (e) => h("ogDescription", e.target.value)), z("change", ge, v), z("change", be, (e) => m(e.target.checked)), z("keydown", Se, (e) => e.key === "Enter" && c()), Ii(Se, () => n.newPageTitle, (e) => n.newPageTitle = e), z("click", Ce, c), z("click", ke, () => n.newPageTemplate = null), V(e, x), et();
}
Mr([
	"change",
	"click",
	"keydown"
]);
//#endregion
//#region src/lib/nav-size.js
var ay = {
	min: 0,
	max: 64,
	step: 1
}, oy = {
	min: 12,
	max: 28,
	step: 1
}, sy = {
	min: 0,
	max: 80,
	step: 1
}, cy = {
	min: 0,
	max: 64,
	step: 1
}, ly = {
	min: 480,
	max: 1920,
	step: 20
}, uy = {
	min: .3,
	max: .8,
	step: .05
}, dy = {
	min: 0,
	max: 400,
	step: 10
}, fy = {
	min: 0,
	max: 1200,
	step: 20
}, py = {
	min: 0,
	max: 64,
	step: 1
}, my = {
	min: 180,
	max: 400,
	step: 1
}, hy = {
	min: 12,
	max: 128,
	step: 1
}, gy = {
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
}, _y = [
	"sm",
	"md",
	"lg",
	"xl"
], vy = .67;
function yy(e) {
	return e === "floating" || e === "floating-square" || e === "floating-tab";
}
function by(e, { min: t, max: n, step: r = 1 }, i) {
	let a = Number(e);
	if (e == null || e === "" || !Number.isFinite(a)) return i;
	let o = Math.round(a / r) * r, s = Math.min(n, Math.max(t, o));
	return r < 1 ? Math.round(s * 100) / 100 : s;
}
function xy(e, t) {
	if (e?.padY != null && e.padY !== "") return by(e.padY, ay, gy.md.padY);
	let n = gy[e?.size] ?? gy.md;
	return Math.round(n.padY * (yy(t) ? vy : 1));
}
function Sy(e) {
	if (e?.textSize != null && e.textSize !== "") return by(e.textSize, oy, gy.md.textSize);
	let t = gy[e?.size] ?? gy.md;
	return Math.round(t.textSize);
}
function Cy(e) {
	return e?.padY != null && e.padY !== "" || e?.textSize != null && e.textSize !== "" ? null : _y.includes(e?.size) ? e.size : "md";
}
//#endregion
//#region src/panels/NavPanel.svelte
var wy = /* @__PURE__ */ B("<input/> <span class=\"toolbar-row\"><!> <input type=\"number\" class=\"tb-num\" min=\"8\" max=\"96\" placeholder=\"px\"/> <button><b> </b></button> <button><i> </i></button></span>", 1), Ty = /* @__PURE__ */ B("<img alt=\"\"/>"), Ey = /* @__PURE__ */ B("<span class=\"logo-file\"> </span>"), Dy = /* @__PURE__ */ B("<div class=\"logo-pick\"><span class=\"logo-thumb\"><!></span> <span class=\"logo-pick-col\"><label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <!></span></div> <div class=\"ctl-triple\"><div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\" min=\"12\" max=\"128\"/></div> <div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\"/></div> <div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\" min=\"0\" max=\"64\"/></div></div>", 1), Oy = /* @__PURE__ */ B("<button type=\"button\"><!><span> </span></button>"), ky = /* @__PURE__ */ B("<span class=\"toolbar-row\"><span class=\"mini-label tb-grow\"> </span> <input type=\"number\" class=\"tb-num\" placeholder=\"1100\"/></span>"), Ay = /* @__PURE__ */ B("<!> <!> <span class=\"toolbar-row\"><span class=\"mini-label tb-grow\"> </span> <input type=\"number\" class=\"tb-num\"/></span>", 1), jy = /* @__PURE__ */ B("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), My = /* @__PURE__ */ B("<!> <span class=\"toolbar-row\"><span class=\"mini-label tb-grow\"> </span> <input type=\"number\" class=\"tb-num\"/></span>", 1), Ny = /* @__PURE__ */ B("<button> </button>"), Py = /* @__PURE__ */ B("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\"/> <input type=\"number\" class=\"tb-num\"/></div>"), Fy = /* @__PURE__ */ B("<div class=\"ctl-pair\"><div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\"/></div> <div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\"/></div></div>"), Iy = /* @__PURE__ */ B("<span class=\"toolbar-row ctl-end\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\" min=\"1\" max=\"8\"/> <span class=\"mini-label\"> </span> <!></span>"), Ly = /* @__PURE__ */ B("<div class=\"ctl-field\"><span class=\"mini-label\"> </span> <div class=\"tile-grid cols-5\" role=\"group\"></div></div> <!>", 1), Ry = /* @__PURE__ */ B("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), zy = /* @__PURE__ */ B("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"30\" max=\"80\" step=\"5\"/> <span class=\"gridmenu-value\"> </span></div> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"0\" max=\"400\" step=\"10\"/> <span class=\"gridmenu-value\"> </span></div> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"0\" max=\"1200\" step=\"20\"/> <span class=\"gridmenu-value\"> </span></div> <!>", 1), By = /* @__PURE__ */ B("<!> <!>", 1), Vy = /* @__PURE__ */ B("<div class=\"mini-card\"><span class=\"mini-label\"> </span> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label></div>"), Hy = /* @__PURE__ */ B("<div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\"/></div>"), Uy = /* @__PURE__ */ B("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label>"), Wy = /* @__PURE__ */ B("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <!> <!> <!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <!> <input type=\"range\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label> <!></label>", 1), Gy = /* @__PURE__ */ B("<button type=\"button\"><span> </span><span> </span></button>"), Ky = /* @__PURE__ */ B("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\"/> <span class=\"gridmenu-value\"> </span></div>"), qy = /* @__PURE__ */ B("<div class=\"swatch-cell\"><!> <span class=\"mini-label\"> </span></div>"), Jy = /* @__PURE__ */ B("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <input type=\"text\" class=\"field-filled\" placeholder=\"https://\"/></label>"), Yy = /* @__PURE__ */ B("<button class=\"ghost\"> </button>"), Xy = /* @__PURE__ */ B("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <input type=\"text\" class=\"field-filled\"/></label> <label> <!></label> <!> <!> <!> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <label> <!></label> <label> <!></label>", 1), Zy = /* @__PURE__ */ B("<span class=\"tool-move\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span>"), Qy = /* @__PURE__ */ B("<div class=\"mini-card\"><span class=\"tool-head\"><span class=\"mini-label\"> </span><!></span> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label></div>"), $y = /* @__PURE__ */ B("<div class=\"mini-card\"><span class=\"tool-head\"><span class=\"mini-label\"> </span><!></span> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div>"), eb = /* @__PURE__ */ B("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <input type=\"text\" class=\"field-filled\"/></label>"), tb = /* @__PURE__ */ B("<span class=\"lrow-warn\"></span>"), nb = /* @__PURE__ */ B("<span class=\"lrow-tile-mark\"><!></span> <span class=\"lrow-tile-name\"> </span>", 1), rb = /* @__PURE__ */ B("<span class=\"bad-target-note\"> </span>"), ib = /* @__PURE__ */ B("<div class=\"lrow-body\"><!> <div class=\"lrow-fields\"><input class=\"field-filled\"/> <input/> <!> <span class=\"lrow-actions\"><!> <button class=\"linkish danger\"> </button></span></div></div>"), ab = /* @__PURE__ */ B("<div><div class=\"lrow-head\" role=\"button\" tabindex=\"0\"><span class=\"lrow-mark\" aria-hidden=\"true\"><!></span> <span class=\"lrow-name\"> </span> <!> <span class=\"row-tools\" role=\"none\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span> <span class=\"lrow-chev\" aria-hidden=\"true\"></span></div> <!></div>"), ob = /* @__PURE__ */ B("<div class=\"ctl-field\"><span class=\"mini-label\"> </span> <div class=\"tile-grid cols-3\" role=\"group\"></div></div> <!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"1\" max=\"24\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <div class=\"mini-card\"><span class=\"mini-label\"> </span> <span class=\"lbtn-pick\"><!> <span class=\"lbtn-name\"><!></span></span></div> <!> <button class=\"ghost action\"> </button>", 1), sb = /* @__PURE__ */ B("<details class=\"group sub-fold\"><summary><span class=\"tool-head\"> <!></span></summary> <div class=\"group-items\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div></details>"), cb = /* @__PURE__ */ B("<label> <!></label>"), lb = /* @__PURE__ */ B("<div aria-hidden=\"true\"><span class=\"nav-grip\"></span> <div class=\"nav-item-main\"><span class=\"nav-item-name ghost-name\"> </span> <span class=\"ghost-target\"> </span></div></div>"), ub = /* @__PURE__ */ B("<input class=\"nav-item-href\"/>"), db = /* @__PURE__ */ B("<span class=\"nav-item-sub\"></span>"), fb = /* @__PURE__ */ B("<!> <div><span class=\"nav-grip\" draggable=\"true\"></span> <div class=\"nav-item-main\"><input class=\"nav-item-name\"/> <div class=\"nav-item-target\"><!> <!></div></div> <span class=\"nav-actions\"><button class=\"ghost nav-act\"></button> <button class=\"ghost nav-act\"></button> <button class=\"ghost nav-act\"></button></span> <button class=\"ghost row-tool nav-more\"></button></div> <!>", 1), pb = /* @__PURE__ */ B("<!> <div><span class=\"nav-grip\" draggable=\"true\"></span> <div class=\"nav-item-main\"><input class=\"nav-item-name\"/> <div class=\"nav-item-target\"><!> <!></div></div> <!> <span class=\"nav-actions\"><button class=\"ghost nav-act\"></button> <button class=\"ghost nav-act\"></button> <button class=\"ghost nav-act\"></button> <button class=\"ghost nav-act\"></button></span> <button class=\"ghost row-tool nav-more\"></button></div> <!> <!> <!>", 1), mb = /* @__PURE__ */ B("<div class=\"panel-body\"><details class=\"group\"><summary> </summary> <div class=\"group-items\"><!> <!> <!> <!></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><div class=\"ctl-field\"><span class=\"mini-label\"> </span> <div class=\"tile-grid cols-3\" role=\"group\"></div></div> <!> <!> <!> <!> <!></div></details> <hr class=\"gridmenu-divider\"/> <details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><div class=\"seg cw-seg\"></div> <details class=\"sub-inset\"><summary> </summary> <div class=\"sub-inset-body\"><!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\"/> <input type=\"number\" class=\"tb-num\"/></div> <!></div></details></div></details> <hr class=\"gridmenu-divider\"/> <details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><!> <!></div></details> <hr class=\"gridmenu-divider\"/> <details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><!></div></details> <hr class=\"gridmenu-divider\"/> <details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><div class=\"ctl-pair\"><!> <div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\"/></div></div> <div class=\"ctl-pair\"><label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label></div> <div class=\"ctl-pair\"><label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <!></div> <div class=\"ctl-pair\"><label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label></div> <!> <div class=\"ctl-pair\"><label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <!></div> <!> <!></div></details> <hr class=\"gridmenu-divider\"/> <details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><div class=\"ctl-field\"><span class=\"mini-label\"> </span> <div class=\"tile-grid cols-5\" role=\"group\"></div></div> <!> <div class=\"swatch-row\"><!> <div class=\"swatch-cell\"><!> <span class=\"mini-label\"> </span></div> <div class=\"swatch-cell\"><!> <span class=\"mini-label\"> </span></div></div> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label></div></details> <hr class=\"gridmenu-divider\"/> <details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><!></div></details></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><!>  <!></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><div class=\"ctl-field\"><span class=\"mini-label\"> </span> <div role=\"group\"></div></div> <!> <!> <label> <input type=\"number\" min=\"1\" max=\"4\"/></label></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><div class=\"nav-list\" role=\"list\"></div> <button class=\"ghost action\"> </button> <span class=\"toolbar-row\"><input class=\"tb-grow\"/> <button class=\"ghost action\"> </button></span></div></details></div>");
function hb(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.siteDraft), { addPage: i, bridge: a, compressOrTrim: o, navBgCtx: s, setStatus: c, siteMutate: l, themeSwatches: u } = n, d = (e) => `<svg width="40" height="26" viewBox="0 0 40 26" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${e}</svg>`, p = {
		bar: d("<rect x=\"1\" y=\"1\" width=\"38\" height=\"7\" rx=\"1\"/><rect x=\"1\" y=\"11\" width=\"38\" height=\"14\" rx=\"1\" stroke-opacity=\"0.35\"/>"),
		floating: d("<rect x=\"5\" y=\"2\" width=\"30\" height=\"7\" rx=\"3.5\"/><rect x=\"1\" y=\"11\" width=\"38\" height=\"14\" rx=\"1\" stroke-opacity=\"0.35\"/>"),
		"floating-square": d("<rect x=\"5\" y=\"2\" width=\"30\" height=\"7\"/><rect x=\"1\" y=\"11\" width=\"38\" height=\"14\" rx=\"1\" stroke-opacity=\"0.35\"/>"),
		"floating-tab": d("<path d=\"M5 1h30v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z\"/><rect x=\"1\" y=\"11\" width=\"38\" height=\"14\" rx=\"1\" stroke-opacity=\"0.35\"/>"),
		"side-left": d("<rect x=\"1\" y=\"1\" width=\"9\" height=\"24\" rx=\"1\"/><rect x=\"13\" y=\"1\" width=\"26\" height=\"24\" rx=\"1\" stroke-opacity=\"0.35\"/>"),
		"side-right": d("<rect x=\"30\" y=\"1\" width=\"9\" height=\"24\" rx=\"1\"/><rect x=\"1\" y=\"1\" width=\"26\" height=\"24\" rx=\"1\" stroke-opacity=\"0.35\"/>")
	}, m = {
		"": d("<rect x=\"1\" y=\"4\" width=\"38\" height=\"18\" rx=\"1\" stroke-opacity=\"0.35\"/>"),
		bottom: d("<rect x=\"1\" y=\"4\" width=\"38\" height=\"18\" rx=\"1\" stroke-opacity=\"0.35\"/><path d=\"M1 22h38\" stroke-width=\"2.5\"/>"),
		top: d("<rect x=\"1\" y=\"4\" width=\"38\" height=\"18\" rx=\"1\" stroke-opacity=\"0.35\"/><path d=\"M1 4h38\" stroke-width=\"2.5\"/>"),
		both: d("<rect x=\"1\" y=\"4\" width=\"38\" height=\"18\" rx=\"1\" stroke-opacity=\"0.35\"/><path d=\"M1 4h38M1 22h38\" stroke-width=\"2.5\"/>"),
		all: d("<rect x=\"1\" y=\"4\" width=\"38\" height=\"18\" rx=\"1\" stroke-width=\"2.5\"/>")
	}, g = (e) => `<svg width="48" height="34" viewBox="0 0 48 34" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${e}</svg>`, _ = {
		card: g("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><rect x=\"10\" y=\"6\" width=\"28\" height=\"24\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.18\"/><path d=\"M15 13h18M15 19h14M15 25h16\" stroke-opacity=\"0.8\"/>"),
		flat: g("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><rect x=\"1\" y=\"6\" width=\"46\" height=\"24\" fill=\"currentColor\" fill-opacity=\"0.12\" stroke=\"none\"/><path d=\"M15 13h18M15 19h14M15 25h16\" stroke-opacity=\"0.8\"/>"),
		pills: g("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><rect x=\"10\" y=\"7\" width=\"28\" height=\"6\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.35\" stroke=\"none\"/><rect x=\"10\" y=\"16\" width=\"28\" height=\"6\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.2\" stroke=\"none\"/><rect x=\"10\" y=\"25\" width=\"28\" height=\"6\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.2\" stroke=\"none\"/>"),
		lines: g("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><path d=\"M12 12h24M12 21h24M12 30h24\" stroke-opacity=\"0.8\"/>"),
		flyout: g("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><rect x=\"1\" y=\"6\" width=\"46\" height=\"24\" fill=\"currentColor\" fill-opacity=\"0.12\" stroke=\"none\"/><path d=\"M6 13h10M6 19h8M22 13h10M22 19h8M38 13h6M38 19h4\" stroke-opacity=\"0.8\"/>")
	}, v = {
		grid: g("<rect x=\"1\" y=\"1\" width=\"46\" height=\"32\" rx=\"3\" stroke-opacity=\"0.35\"/><rect x=\"6\" y=\"6\" width=\"10\" height=\"10\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><rect x=\"19\" y=\"6\" width=\"10\" height=\"10\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><rect x=\"32\" y=\"6\" width=\"10\" height=\"10\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><path d=\"M7 20h8M20 20h8M33 20h8\" stroke-opacity=\"0.7\"/><path d=\"M6 26h10M19 26h10M32 26h10\" stroke-opacity=\"0.35\"/>"),
		list: g("<rect x=\"1\" y=\"1\" width=\"46\" height=\"32\" rx=\"3\" stroke-opacity=\"0.35\"/><rect x=\"6\" y=\"6\" width=\"7\" height=\"7\" rx=\"2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><rect x=\"6\" y=\"17\" width=\"7\" height=\"7\" rx=\"2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><path d=\"M17 9.5h24M17 20.5h18\" stroke-opacity=\"0.7\"/>"),
		cover: g("<rect x=\"1\" y=\"1\" width=\"46\" height=\"32\" rx=\"3\" stroke-opacity=\"0.35\"/><rect x=\"6\" y=\"6\" width=\"16\" height=\"12\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><rect x=\"26\" y=\"6\" width=\"16\" height=\"12\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><path d=\"M6 14h16M26 14h16\" stroke-opacity=\"0.55\" stroke-width=\"3\"/><path d=\"M6 23h12M26 23h12\" stroke-opacity=\"0.35\"/>")
	}, y = /* @__PURE__ */ j("");
	function b() {
		R(y).trim() && (n.newPageTitle = R(y), n.newPageTemplate = null, i() !== !1 && M(y, ""));
	}
	function x(e) {
		l("edit:nav-logo", () => {
			R(r).nav.logo = {
				type: "text",
				value: "",
				...R(r).nav.logo,
				...e
			};
		});
	}
	function S(e) {
		l("nav", () => {
			R(r).nav.logo ??= {
				type: "text",
				value: R(r).site.title
			};
			let t = R(r).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = R(r).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = R(r).site.title), delete t.image), t.type = e;
		});
	}
	async function C(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await o(t);
			l("nav", () => {
				let t = R(r).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			c(Y("status.imageReadErrorSvg"), "error");
		}
	}
	function w(e) {
		l("nav", () => {
			R(r).nav.layout = e;
		});
	}
	let T = (e) => e !== "theme" || !!R(r).theme?.alt?.tokens, E = /* @__PURE__ */ A(() => nh(R(r)?.nav?.style ?? {}).filter(T));
	function ee(e, t) {
		let n = nh(R(r).nav.style ?? {}), i = n.indexOf(e), a = i + t;
		for (; a >= 0 && a < n.length && !T(n[a]);) a += t;
		i < 0 || a < 0 || a >= n.length || ([n[i], n[a]] = [n[a], n[i]], te("order", n));
	}
	function te(e, t) {
		l(`edit:nav-tools-${e}`, () => {
			R(r).nav.style ??= {};
			let n = { ...R(r).nav.style.tools ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? R(r).nav.style.tools = n : delete R(r).nav.style.tools;
		});
	}
	function ne(e, t) {
		l(`edit:nav-style-${e}`, () => {
			R(r).nav.style ??= {}, t === void 0 ? delete R(r).nav.style[e] : R(r).nav.style[e] = t;
		});
	}
	let re = /* @__PURE__ */ A(() => R(r)?.nav?.variant === "side-left" || R(r)?.nav?.variant === "side-right"), ie = /* @__PURE__ */ A(() => [
		"floating",
		"floating-square",
		"floating-tab"
	].includes(R(r)?.nav?.variant)), ae = /* @__PURE__ */ A(() => Cy(R(r)?.nav?.style)), oe = /* @__PURE__ */ A(() => xy(R(r)?.nav?.style, R(r)?.nav?.variant)), se = /* @__PURE__ */ A(() => Sy(R(r)?.nav?.style));
	function ce(e) {
		l("nav", () => {
			R(r).nav.style ??= {}, e === "md" ? delete R(r).nav.style.size : R(r).nav.style.size = e, delete R(r).nav.style.padY, delete R(r).nav.style.textSize;
		});
	}
	function le(e, t, n) {
		let i = e.target.value;
		ne(t, i === "" ? void 0 : by(i, n, void 0)), e.target.value = R(r).nav.style?.[t] ?? "";
	}
	function ue(e, t) {
		l(`edit:nav-mobile-${e}`, () => {
			R(r).nav.style ??= {};
			let n = { ...R(r).nav.style.mobile ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? R(r).nav.style.mobile = n : delete R(r).nav.style.mobile;
		});
	}
	let de = (e) => {
		let t = R(r)?.nav?.style?.mobile?.[e];
		return t === void 0 ? "" : t ? "on" : "off";
	}, fe = (e, t) => ue(e, t === "" ? void 0 : t === "on"), pe = (e) => ue("border", e ? {
		...R(r).nav.style?.mobile?.border ?? {},
		side: e
	} : void 0);
	function me(e, t) {
		l(`edit:nav-announce-${e}`, () => {
			let n = { ...R(r).nav.announcement ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? R(r).nav.announcement = n : delete R(r).nav.announcement;
		});
	}
	let he = "<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"currentColor\" aria-hidden=\"true\">" + [
		6,
		12,
		18
	].flatMap((e) => [
		6,
		12,
		18
	].map((t) => `<circle cx="${t}" cy="${e}" r="1.6"/>`)).join("") + "</svg>", ge = /* @__PURE__ */ j(null);
	function _e() {
		let e = R(r).nav?.launcher;
		return [e?.image, ...(e?.links ?? []).map((e) => e.image)].filter(Boolean);
	}
	function ve(e, t) {
		l("nav", () => {
			R(r).nav.launcher ??= { links: [] };
			let n = e === null ? R(r).nav.launcher : R(r).nav.launcher.links[e];
			t.image ? n.image = t.image : delete n.image, t.icon ? n.icon = t.icon : delete n.icon;
		});
	}
	function ye(e, t) {
		l(`edit:nav-launcher-${e}`, () => {
			R(r).nav.launcher ??= { links: [] }, t === void 0 ? delete R(r).nav.launcher[e] : R(r).nav.launcher[e] = t;
		});
	}
	function be() {
		l("nav", () => {
			R(r).nav.launcher ??= { links: [] }, R(r).nav.launcher.links ??= [], R(r).nav.launcher.links.push({
				label: Y("seed.link"),
				href: "",
				icon: "globe"
			});
		});
	}
	function xe(e) {
		l("nav", () => {
			R(r).nav.launcher.links.splice(e, 1);
		});
	}
	function Se(e, t) {
		l("nav", () => {
			let n = R(r).nav.launcher.links, i = e + t;
			i < 0 || i >= n.length || ([n[e], n[i]] = [n[i], n[e]]);
		});
	}
	function Ce(e, t, n) {
		l(`edit:nav-launcher-${t}-${e}`, () => {
			R(r).nav.launcher.links[e][t] = n;
		});
	}
	async function we(e, t) {
		if (e) try {
			let n = await o(e);
			l("nav", () => {
				R(r).nav.launcher ??= { links: [] }, t === null ? R(r).nav.launcher.image = n.dataUrl : R(r).nav.launcher.links[t].image = n.dataUrl;
			});
		} catch {
			c(Y("status.imageReadErrorSvg"), "error");
		}
	}
	function Te(e, t) {
		l(`edit:nav-sheet-${e}`, () => {
			R(r).nav.style ??= {};
			let n = { ...R(r).nav.style.sheet ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? R(r).nav.style.sheet = n : delete R(r).nav.style.sheet;
		});
	}
	function Ee(e, t, n) {
		let r = e.target.value;
		ne(t, r === "" ? void 0 : by(r, n, void 0)), e.target.value = R(t === "padY" ? oe : se);
	}
	function D(e, t, n) {
		let i = e.target.value;
		ue(t, i === "" ? void 0 : by(i, n, void 0)), e.target.value = R(r).nav.style?.mobile?.[t] ?? "";
	}
	function Oe(e) {
		let t = by(e / 100, uy, .5);
		ne("shrinkTo", t === .5 ? void 0 : t);
	}
	function ke(e) {
		let t = by(e, dy, 80);
		ne("shrinkAt", t === 80 ? void 0 : t);
	}
	function k(e) {
		let t = by(e, fy, 220);
		ne("shrinkMs", t === 220 ? void 0 : t);
	}
	let Ae = {
		underline: [Y("hoverColor.underline.label"), Y("hoverColor.underline.title")],
		pill: [Y("hoverColor.pill.label"), Y("hoverColor.pill.title")],
		lift: [Y("hoverColor.lift.label"), Y("hoverColor.lift.title")]
	}, je = /* @__PURE__ */ A(() => Ae[R(r)?.nav?.style?.hover] ?? null), Me = /* @__PURE__ */ A(() => [
		["grid", Y("opt.launcherView.grid")],
		["list", Y("opt.launcherView.list")],
		["cover", Y("opt.launcherView.cover")]
	]), Ne = /* @__PURE__ */ A(() => R(re) ? [
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
	function Pe(e) {
		(R(r).nav.variant ?? "bar") !== e && l("nav", () => {
			e === "bar" ? delete R(r).nav.variant : R(r).nav.variant = e, R(r).nav.style && delete R(r).nav.style.radius;
		});
	}
	function Fe(e) {
		l("nav", () => {
			R(r).nav.style ??= {}, e ? R(r).nav.style.glow = !0 : delete R(r).nav.style.glow;
		});
	}
	function Ie(e) {
		l("nav", () => {
			R(r).nav.style ??= {}, e ? delete R(r).nav.style.topGap : R(r).nav.style.topGap = !1;
		});
	}
	function Le(e) {
		l("nav", () => {
			R(r).nav.style ??= {}, e === "standard" ? delete R(r).nav.style.hover : R(r).nav.style.hover = e;
		});
	}
	function Re(e, t) {
		l(`edit:nav-label-${e}`, () => {
			R(r).nav.items[e].label = t;
		});
	}
	function ze(e, t) {
		l("nav", () => {
			let n = R(r).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function Be(e, t) {
		l(`edit:nav-href-${e}`, () => {
			R(r).nav.items[e].href = t;
		});
	}
	function Ve(e, t) {
		let n = e + t, i = R(r).nav.items;
		n < 0 || n >= i.length || l("nav", () => {
			[i[e], i[n]] = [i[n], i[e]];
		});
	}
	function He(e) {
		l("nav", () => {
			R(r).nav.items.splice(e, 1);
		});
	}
	let Ue = /* @__PURE__ */ j(""), We = /* @__PURE__ */ j(""), Ge = /* @__PURE__ */ j(null);
	function Ke(e) {
		let [t, n] = e.split(".").map(Number), i = R(r).nav.items;
		return n === void 0 ? {
			list: i,
			index: t,
			parent: null
		} : {
			list: i[t].children,
			index: n,
			parent: i[t]
		};
	}
	function qe(e, t, n, r) {
		if (!R(We) || R(We) === t) return null;
		let i = e.getBoundingClientRect(), a = (r - i.top) / i.height, o = n - i.left, s = Ke(R(We)), c = Ke(t), l = s.list[s.index], u;
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
		}, Je(u, l, s);
	}
	function Je(e, t, n) {
		let i = Ke(e.key);
		if (i.parent) {
			if (i.parent === t) return null;
			t.children?.length && (e = {
				key: e.key.split(".")[0],
				pos: "after"
			}, i = Ke(e.key));
		}
		let a = i.list[i.index];
		if (e.pos === "into") {
			let n = a.children ?? [];
			return n.length && n[n.length - 1] === t ? null : e;
		}
		let o = i.parent ? i.parent.children : R(r).nav.items, s = o.filter((e) => e !== t).indexOf(a) + +(e.pos === "after");
		return o === n.list && s === n.index ? null : e;
	}
	function Ye() {
		if (!R(We)) return {
			label: "",
			target: ""
		};
		let e = Ke(R(We)), t = e.list[e.index], n = t.page ? R(r).pages.find((e) => e.id === t.page) : null;
		return {
			label: t.label,
			target: n ? n.title : t.href ?? Y("opt.noLink")
		};
	}
	function Xe(e) {
		R(Ge) && e?.dataTransfer?.dropEffect !== "none" && nt(R(Ge).key), M(We, ""), M(Ge, null);
	}
	Dn(() => {
		if (!R(We)) return;
		let e = (e) => e.preventDefault();
		return window.addEventListener("dragover", e), window.addEventListener("drop", e), () => {
			window.removeEventListener("dragover", e), window.removeEventListener("drop", e);
		};
	});
	let Qe = "application/x-urd-nav-row";
	function tt(e) {
		if (!R(We)) return;
		let t = [...e.currentTarget.querySelectorAll(".nav-item:not(.ghost)")];
		if (!t.length) return;
		let n = t.find((t) => {
			let n = t.getBoundingClientRect();
			return e.clientY >= n.top && e.clientY <= n.bottom;
		}), r = null;
		if (n) r = qe(n, n.dataset.key, e.clientX, e.clientY);
		else {
			let n = Ke(R(We)), i = n.list[n.index], a = t.find((t) => {
				let n = t.getBoundingClientRect();
				return n.top + n.height / 2 > e.clientY;
			});
			if (a) r = a.dataset.key === R(We) ? null : Je({
				key: a.dataset.key,
				pos: "before"
			}, i, n);
			else {
				let e = [...t].reverse().find((e) => !e.classList.contains("child"));
				r = e.dataset.key === R(We) ? null : Je({
					key: e.dataset.key,
					pos: "after"
				}, i, n);
			}
		}
		if (!r) {
			M(Ge, null);
			return;
		}
		e.preventDefault(), (R(Ge)?.key !== r.key || R(Ge)?.pos !== r.pos) && M(Ge, r, !0);
	}
	function nt(e) {
		let t = R(We), n = R(Ge);
		if (M(We, ""), M(Ge, null), t && n && n.key === e && t !== e) {
			{
				let r = Ke(t), i = Ke(e), a = r.list[r.index];
				if (i.parent && (i.parent === a || a.children?.length) || n.pos === "into" && a.children?.length) return;
			}
			l("nav", () => {
				let i = R(r).nav.items, a = Ke(t), o = Ke(e), s = a.list[a.index], c = o.list[o.index];
				if (s !== c) {
					if (a.list.splice(a.index, 1), a.parent && a.parent.children.length === 0 && (delete a.parent.children, !a.parent.page && !a.parent.href && (a.parent.page = R(r).pages[0].id)), n.pos === "into") c.children ??= [], c.children.push(s);
					else {
						let e = o.parent ? o.parent.children : i, t = e.indexOf(c) + +(n.pos === "after");
						e.splice(t, 0, s);
					}
					!s.page && s.href == null && !s.children?.length && (s.page = R(r).pages[0].id);
				}
			}), M(Ue, "");
		}
	}
	let rt = "<svg width=\"10\" height=\"16\" viewBox=\"0 0 10 16\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"3\" cy=\"3\" r=\"1.3\"/><circle cx=\"7\" cy=\"3\" r=\"1.3\"/><circle cx=\"3\" cy=\"8\" r=\"1.3\"/><circle cx=\"7\" cy=\"8\" r=\"1.3\"/><circle cx=\"3\" cy=\"13\" r=\"1.3\"/><circle cx=\"7\" cy=\"13\" r=\"1.3\"/></svg>";
	function it() {
		l("nav", () => {
			R(r).nav.items.push({
				label: Y("seed.link"),
				page: R(r).pages[0].id
			});
		});
	}
	function at(e) {
		l("nav", () => {
			let t = R(r).nav.items[e];
			t.children ??= [], t.children.push({
				label: Y("seed.link"),
				page: R(r).pages[0].id
			});
		});
	}
	function ot(e, t, n) {
		l(`edit:nav-child-label-${e}-${t}`, () => {
			R(r).nav.items[e].children[t].label = n;
		});
	}
	function st(e, t, n) {
		l("nav", () => {
			let i = R(r).nav.items[e].children[t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function ct(e, t, n) {
		l(`edit:nav-child-href-${e}-${t}`, () => {
			R(r).nav.items[e].children[t].href = n;
		});
	}
	function lt(e, t, n) {
		let i = t + n, a = R(r).nav.items[e].children;
		i < 0 || i >= a.length || l("nav", () => {
			[a[t], a[i]] = [a[i], a[t]];
		});
	}
	function ut(e, t) {
		l("nav", () => {
			let n = R(r).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = R(r).pages[0].id));
		});
	}
	var dt = mb(), ft = N(dt), pt = N(ft), mt = F(pt, !0), ht = I(pt, 2), gt = N(ht);
	{
		let e = /* @__PURE__ */ A(() => Y("common.type")), t = /* @__PURE__ */ A(() => R(r).nav.logo?.type ?? "text"), n = /* @__PURE__ */ A(() => [
			["text", Y("blocks.text")],
			["image", Y("blocks.image")],
			["both", Y("opt.logo.both")]
		]);
		eu(gt, {
			get label() {
				return R(e);
			},
			get value() {
				return R(t);
			},
			get options() {
				return R(n);
			},
			onchange: (e) => S(e)
		});
	}
	var _t = I(gt, 2), vt = (e) => {
		var t = wy(), n = P(t);
		G(n);
		var i = I(n, 2), a = N(i);
		{
			let e = /* @__PURE__ */ A(() => Y("tip.nav.logoFont")), t = /* @__PURE__ */ A(() => R(r).nav.logo?.font ?? ""), n = /* @__PURE__ */ A(() => [["", Y("common.inherit")], ...Hd.map(([e, t]) => [t, Y(e)])]);
			Ao(a, {
				get title() {
					return R(e);
				},
				get value() {
					return R(t);
				},
				get options() {
					return R(n);
				},
				onchange: (e) => x({ font: e || void 0 })
			});
		}
		var o = I(a, 2);
		G(o);
		var s = I(o, 2);
		let c;
		var l = F(N(s), !0);
		O(s);
		var u = I(s, 2);
		let d;
		var f = F(N(u), !0);
		O(u), O(i), L((e, t, i, a, p, m, h) => {
			K(n, R(r).nav.logo?.value ?? ""), J(n, "placeholder", e), J(o, "title", t), K(o, R(r).nav.logo?.textSize ?? ""), c = Ei(s, 1, "tbtn", null, c, { active: R(r).nav.logo?.bold !== !1 }), J(s, "title", i), H(l, a), d = Ei(u, 1, "tbtn", null, d, { active: p }), J(u, "title", m), H(f, h);
		}, [
			() => Y("ph.nav.logoName"),
			() => Y("tip.nav.textSize"),
			() => Y("format.bold"),
			() => Y("format.boldLetter"),
			() => !!R(r).nav.logo?.italic,
			() => Y("format.italic"),
			() => Y("format.italicLetter")
		]), z("input", n, (e) => x({ value: e.target.value })), z("change", o, (e) => x({ textSize: e.target.value ? Number(e.target.value) : void 0 })), z("click", s, () => x({ bold: R(r).nav.logo?.bold === !1 })), z("click", u, () => x({ italic: !R(r).nav.logo?.italic })), V(e, t);
	};
	U(_t, (e) => {
		(R(r).nav.logo?.type ?? "text") !== "image" && e(vt);
	});
	var yt = I(_t, 2), bt = (e) => {
		let t = /* @__PURE__ */ A(() => R(r).nav.logo?.type === "image" ? R(r).nav.logo?.value : R(r).nav.logo?.image);
		var n = Dy(), i = P(n), a = N(i), o = N(a), s = (e) => {
			var n = Ty();
			L(() => J(n, "src", R(t))), V(e, n);
		};
		U(o, (e) => {
			R(t) && e(s);
		}), O(a);
		var c = I(a, 2), l = N(c), u = N(l), d = I(u);
		O(l);
		var f = I(l, 2), p = (e) => {
			var n = Ey(), r = F(n, !0);
			L((e) => H(r, e), [() => R(t).split("/").pop()]), V(e, n);
		};
		U(f, (e) => {
			R(t) && e(p);
		}), O(c), O(i);
		var m = I(i, 2), h = N(m), g = N(h), _ = F(g, !0), v = I(g, 2);
		G(v), O(h);
		var y = I(h, 2), b = N(y), S = F(b, !0), w = I(b, 2);
		G(w), O(y);
		var T = I(y, 2), E = N(T), ee = F(E, !0), te = I(E, 2);
		G(te), O(T), O(m), L((e, t, n, i, a, o, s, c, d) => {
			J(l, "title", e), H(u, `${t ?? ""} `), J(h, "title", n), H(_, i), K(v, R(r).nav.logo?.size ?? 32), J(y, "title", a), H(S, o), J(w, "min", hy.min), J(w, "max", hy.max), J(w, "placeholder", s), K(w, R(r).nav.logo?.mobileSize ?? ""), J(T, "title", c), H(ee, d), K(te, R(r).nav.logo?.radius ?? 0);
		}, [
			() => Y("tip.webpAuto"),
			() => R(t) ? Y("ui.changeImage") : Y("ui.chooseImage"),
			() => Y("tip.nav.logoHeight"),
			() => Y("lbl.height"),
			() => Y("tip.nav.logoHeightMobile"),
			() => Y("lbl.onMobile"),
			() => Y("lbl.navSameAsDesktop"),
			() => Y("tip.nav.logoRadius"),
			() => Y("lbl.rounding")
		]), z("change", d, C), z("change", v, (e) => x({ size: Number(e.target.value) })), z("change", w, (e) => {
			let t = e.target.value;
			x({ mobileSize: t === "" ? void 0 : by(t, hy, void 0) }), e.target.value = R(r).nav.logo?.mobileSize ?? "";
		}), z("change", te, (e) => x({ radius: Number(e.target.value) })), V(e, n);
	};
	U(yt, (e) => {
		(R(r).nav.logo?.type ?? "text") !== "text" && e(bt);
	});
	var xt = I(yt, 2), St = (e) => {
		{
			let t = /* @__PURE__ */ A(() => Y("lbl.order")), n = /* @__PURE__ */ A(() => R(r).nav.logo?.order ?? "image-first"), i = /* @__PURE__ */ A(() => [["image-first", Y("opt.logo.imageFirst")], ["text-first", Y("opt.logo.textFirst")]]);
			eu(e, {
				get label() {
					return R(t);
				},
				get value() {
					return R(n);
				},
				get options() {
					return R(i);
				},
				onchange: (e) => x({ order: e })
			});
		}
	};
	U(xt, (e) => {
		R(r).nav.logo?.type === "both" && e(St);
	}), O(ht), O(ft);
	var Ct = I(ft, 2), wt = N(Ct), Tt = F(wt, !0), Et = I(wt, 2), Dt = N(Et), Ot = N(Dt), kt = F(Ot, !0), At = I(Ot, 2), jt = N(At), Mt = N(jt), Nt = F(Mt, !0), Pt = I(Mt, 2);
	ni(Pt, 21, () => [
		["bar", Y("opt.navVariant.bar")],
		["floating", Y("opt.navVariant.floating")],
		["floating-square", Y("opt.navVariant.floatingSquare")],
		["floating-tab", Y("opt.navVariant.floatingTab")],
		["side-left", Y("opt.navVariant.sideLeft")],
		["side-right", Y("opt.navVariant.sideRight")]
	], ([e, t]) => e, (e, t) => {
		var n = /* @__PURE__ */ A(() => h(R(t), 2));
		let i = () => R(n)[0], a = () => R(n)[1];
		var o = Oy();
		let s;
		var c = N(o);
		W(c, () => p[i()]);
		var l = F(I(c), !0);
		O(o), L(() => {
			s = Ei(o, 1, "tile", null, s, { on: (R(r).nav.variant ?? "bar") === i() }), J(o, "aria-pressed", (R(r).nav.variant ?? "bar") === i()), H(l, a());
		}), z("click", o, () => Pe(i())), V(e, o);
	}), O(Pt), O(jt);
	var Ft = I(jt, 2), It = (e) => {
		var t = Ay(), n = P(t);
		{
			let e = /* @__PURE__ */ A(() => Y("lbl.navPillWidth")), t = /* @__PURE__ */ A(() => Y("tip.nav.pillWidth")), i = /* @__PURE__ */ A(() => R(r).nav.style?.pillWidth === "content" ? "content" : "custom"), a = /* @__PURE__ */ A(() => [["content", Y("opt.pillWidth.content")], ["custom", Y("opt.pillWidth.custom")]]);
			eu(n, {
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
					return R(a);
				},
				onchange: (e) => ne("pillWidth", e === "content" ? "content" : void 0)
			});
		}
		var i = I(n, 2), a = (e) => {
			var t = ky(), n = N(t), i = F(n, !0), a = I(n, 2);
			G(a), O(t), L((e, n) => {
				J(t, "title", e), H(i, n), J(a, "min", ly.min), J(a, "max", ly.max), J(a, "step", ly.step), K(a, typeof R(r).nav.style?.pillWidth == "number" ? R(r).nav.style.pillWidth : "");
			}, [() => Y("tip.nav.pillWidthPx"), () => Y("lbl.navPillWidthPx")]), z("change", a, (e) => le(e, "pillWidth", ly)), V(e, t);
		};
		U(i, (e) => {
			R(r).nav.style?.pillWidth !== "content" && e(a);
		});
		var o = I(i, 2), s = N(o), c = F(s, !0), l = I(s, 2);
		G(l), O(o), L((e, t) => {
			J(o, "title", e), H(c, t), J(l, "min", py.min), J(l, "max", py.max), J(l, "step", py.step), J(l, "placeholder", R(r).nav.variant === "floating-square" ? "0" : ""), K(l, typeof R(r).nav.style?.radius == "number" ? R(r).nav.style.radius : "");
		}, [() => Y("tip.nav.radius"), () => Y("lbl.navRadius")]), z("change", l, (e) => le(e, "radius", py)), V(e, t);
	};
	U(Ft, (e) => {
		R(ie) && e(It);
	});
	var Lt = I(Ft, 2), Rt = (e) => {
		{
			let t = /* @__PURE__ */ A(() => Y("lbl.navPlacement")), n = /* @__PURE__ */ A(() => R(r).nav.style?.sidePlacement ?? "top"), i = /* @__PURE__ */ A(() => [
				["top", Y("opt.place.top")],
				["middle", Y("opt.place.middle")],
				["bottom", Y("opt.place.bottom")]
			]);
			eu(e, {
				get label() {
					return R(t);
				},
				get value() {
					return R(n);
				},
				get options() {
					return R(i);
				},
				onchange: (e) => ne("sidePlacement", e === "top" ? void 0 : e)
			});
		}
	}, zt = (e) => {
		{
			let t = /* @__PURE__ */ A(() => Y("lbl.navPlacement")), n = /* @__PURE__ */ A(() => Y("opt.layout.leftAfterLogo")), i = /* @__PURE__ */ A(() => R(r).nav.layout ?? "right"), a = /* @__PURE__ */ A(() => [
				["left", Y("common.left")],
				["center", Y("common.center")],
				["right", Y("common.right")]
			]);
			eu(e, {
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
					return R(a);
				},
				onchange: (e) => w(e)
			});
		}
	};
	U(Lt, (e) => {
		R(re) ? e(Rt) : e(zt, -1);
	});
	var Bt = I(Lt, 2), Vt = (e) => {
		var t = jy(), n = P(t), i = N(n);
		G(i);
		var a = I(i);
		O(n);
		var o = I(n, 2), s = N(o);
		G(s);
		var c = I(s);
		O(o), L((e, t, l, u) => {
			J(n, "title", e), q(i, R(r).nav.style?.glow === !0), H(a, ` ${t ?? ""}`), J(o, "title", l), q(s, R(r).nav.style?.topGap !== !1), H(c, ` ${u ?? ""}`);
		}, [
			() => Y("tip.nav.glow"),
			() => Y("lbl.navGlow"),
			() => Y("tip.nav.topGap"),
			() => Y("lbl.navTopGap")
		]), z("change", i, (e) => Fe(e.target.checked)), z("change", s, (e) => Ie(e.target.checked)), V(e, t);
	};
	U(Bt, (e) => {
		R(ie) && e(Vt);
	});
	var Ht = I(Bt, 2), Ut = (e) => {
		var t = jy(), n = P(t), i = N(n);
		G(i);
		var a = I(i);
		O(n);
		var o = I(n, 2), s = N(o);
		G(s);
		var c = I(s);
		O(o), L((e, t, l, u) => {
			J(n, "title", e), q(i, R(r).nav.overlay === !0), H(a, ` ${t ?? ""}`), J(o, "title", l), q(s, R(r).nav.style?.inset !== !1), H(c, ` ${u ?? ""}`);
		}, [
			() => Y("tip.nav.overlay"),
			() => Y("lbl.navOverlay"),
			() => Y("tip.nav.inset"),
			() => Y("lbl.navInset")
		]), z("change", i, (e) => l("nav", () => {
			e.target.checked ? R(r).nav.overlay = !0 : delete R(r).nav.overlay;
		})), z("change", s, (e) => ne("inset", e.target.checked ? void 0 : !1)), V(e, t);
	};
	U(Ht, (e) => {
		!R(ie) && !R(re) && e(Ut);
	});
	var Wt = I(Ht, 2), Gt = (e) => {
		var t = My(), n = P(t);
		{
			let e = /* @__PURE__ */ A(() => Y("lbl.textAlign")), t = /* @__PURE__ */ A(() => Y("tip.nav.sideAlign")), i = /* @__PURE__ */ A(() => R(r).nav.style?.sideAlign ?? "left"), a = /* @__PURE__ */ A(() => [
				["left", Y("common.left")],
				["center", Y("common.center")],
				["right", Y("common.right")]
			]);
			eu(n, {
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
					return R(a);
				},
				onchange: (e) => ne("sideAlign", e === "left" ? void 0 : e)
			});
		}
		var i = I(n, 2), a = N(i), o = F(a, !0), s = I(a, 2);
		G(s), O(i), L((e, t) => {
			J(i, "title", e), H(o, t), J(s, "min", my.min), J(s, "max", my.max), K(s, R(r).nav.style?.width ?? 250);
		}, [() => Y("tip.nav.colWidth"), () => Y("lbl.navColWidth")]), z("change", s, (e) => {
			let t = by(e.target.value, my, 250);
			ne("width", t === 250 ? void 0 : t), e.target.value = R(r).nav.style?.width ?? 250;
		}), V(e, t);
	};
	U(Wt, (e) => {
		R(re) && e(Gt);
	}), O(At), O(Dt);
	var Kt = I(Dt, 4), qt = N(Kt), Jt = F(qt, !0), Yt = I(qt, 2), Xt = N(Yt);
	ni(Xt, 20, () => _y, (e) => e, (e, t) => {
		var n = Ny();
		let r;
		var i = F(n, !0);
		L((e) => {
			r = Ei(n, 1, "", null, r, { on: R(ae) === t }), H(i, e);
		}, [() => Y(`opt.size.${t}`)]), z("click", n, () => ce(t)), V(e, n);
	}), O(Xt);
	var Zt = I(Xt, 2), Qt = N(Zt), $t = F(Qt, !0), en = I(Qt, 2), tn = N(en), nn = (e) => {
		var t = Py(), n = N(t), r = F(n, !0), i = I(n, 2);
		G(i);
		var a = I(i, 2);
		G(a), O(t), L((e, n) => {
			J(t, "title", e), H(r, n), J(i, "min", ay.min), J(i, "max", ay.max), J(i, "step", ay.step), K(i, R(oe)), J(a, "min", ay.min), J(a, "max", ay.max), K(a, R(oe));
		}, [() => Y("tip.nav.thickness"), () => Y("lbl.navThickness")]), z("input", i, (e) => ne("padY", e.target.valueAsNumber)), z("change", a, (e) => Ee(e, "padY", ay)), V(e, t);
	};
	U(tn, (e) => {
		R(re) || e(nn);
	});
	var rn = I(tn, 2), an = N(rn), on = F(an, !0), sn = I(an, 2);
	G(sn);
	var cn = I(sn, 2);
	G(cn), O(rn);
	var ln = I(rn, 2), un = (e) => {
		var t = Fy(), n = N(t), i = N(n), a = F(i, !0), o = I(i, 2);
		G(o), O(n);
		var s = I(n, 2), c = N(s), l = F(c, !0), u = I(c, 2);
		G(u), O(s), O(t), L((e, t, i, c, d, f) => {
			J(n, "title", e), H(a, t), J(o, "min", sy.min), J(o, "max", sy.max), J(o, "placeholder", i), K(o, R(r).nav.style?.padX ?? ""), J(s, "title", c), H(l, d), J(u, "min", cy.min), J(u, "max", cy.max), J(u, "placeholder", f), K(u, R(r).nav.style?.gap ?? "");
		}, [
			() => Y("tip.nav.padX"),
			() => Y("lbl.navPadX"),
			() => Y("common.auto"),
			() => Y("tip.nav.gap"),
			() => Y("lbl.navGap"),
			() => Y("common.auto")
		]), z("change", o, (e) => le(e, "padX", sy)), z("change", u, (e) => le(e, "gap", cy)), V(e, t);
	};
	U(ln, (e) => {
		R(re) || e(un);
	}), O(en), O(Zt), O(Yt), O(Kt);
	var dn = I(Kt, 4), fn = N(dn), pn = F(fn, !0), mn = I(fn, 2), hn = N(mn), gn = (e) => {
		var t = Ly(), n = P(t), i = N(n), a = F(i, !0), o = I(i, 2);
		ni(o, 21, () => [
			["", Y("common.none")],
			["bottom", Y("opt.navBorder.bottom")],
			["top", Y("opt.navBorder.top")],
			["both", Y("opt.navBorder.both")],
			["all", Y("opt.navBorder.all")]
		], ([e, t]) => e, (e, t) => {
			var n = /* @__PURE__ */ A(() => h(R(t), 2));
			let i = () => R(n)[0], a = () => R(n)[1];
			var o = Oy();
			let s;
			var c = N(o);
			W(c, () => m[i()]);
			var l = F(I(c), !0);
			O(o), L(() => {
				s = Ei(o, 1, "tile", null, s, { on: (R(r).nav.style?.border?.side ?? "") === i() }), J(o, "aria-pressed", (R(r).nav.style?.border?.side ?? "") === i()), H(l, a());
			}), z("click", o, () => ne("border", i() ? {
				...R(r).nav.style?.border ?? {},
				side: i()
			} : void 0)), V(e, o);
		}), O(o), O(n);
		var s = I(n, 2), c = (e) => {
			var t = Iy(), n = N(t), i = F(n, !0), a = I(n, 2);
			G(a);
			var o = I(a, 2), s = F(o, !0), c = I(o, 2);
			{
				let e = /* @__PURE__ */ A(() => R(r).nav.style.border.color ?? "text"), t = /* @__PURE__ */ A(u), n = /* @__PURE__ */ A(() => Y("tip.nav.borderColorPick"));
				Na(c, {
					get value() {
						return R(e);
					},
					get tokens() {
						return R(t);
					},
					get label() {
						return R(n);
					},
					onchange: (e) => ne("border", {
						...R(r).nav.style.border,
						color: e
					})
				});
			}
			O(t), L((e, t, c, l, u) => {
				J(n, "title", e), H(i, t), J(a, "title", c), K(a, R(r).nav.style.border.width ?? 1), J(o, "title", l), H(s, u);
			}, [
				() => Y("tip.nav.borderWidth"),
				() => Y("lbl.navBorderWidth"),
				() => Y("tip.nav.borderWidth"),
				() => Y("tip.nav.borderColorPick"),
				() => Y("lbl.navBorderColor")
			]), z("change", a, (e) => {
				let t = by(e.target.value, {
					min: 1,
					max: 8
				}, 1), n = { ...R(r).nav.style.border };
				t === 1 ? delete n.width : n.width = t, ne("border", n), e.target.value = R(r).nav.style.border.width ?? 1;
			}), V(e, t);
		};
		U(s, (e) => {
			R(r).nav.style?.border?.side && e(c);
		}), L((e, t, r) => {
			J(n, "title", e), H(a, t), J(o, "aria-label", r);
		}, [
			() => Y("tip.nav.border"),
			() => Y("lbl.navBorder"),
			() => Y("lbl.navBorder")
		]), V(e, t);
	};
	U(hn, (e) => {
		R(re) || e(gn);
	});
	var _n = I(hn, 2), vn = (e) => {
		{
			let t = /* @__PURE__ */ A(() => Y("lbl.navShadow")), n = /* @__PURE__ */ A(() => Y("tip.nav.shadow")), i = /* @__PURE__ */ A(() => R(r).nav.style?.shadow ?? ""), a = /* @__PURE__ */ A(() => [
				["", Y("common.none")],
				["soft", Y("opt.navShadow.soft")],
				["strong", Y("opt.navShadow.strong")]
			]);
			eu(e, {
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
					return R(a);
				},
				onchange: (e) => ne("shadow", e || void 0)
			});
		}
	};
	U(_n, (e) => {
		!R(ie) && !R(re) && e(vn);
	}), O(mn), O(dn);
	var yn = I(dn, 4), bn = N(yn), xn = F(bn, !0), Sn = I(bn, 2), Cn = N(Sn), wn = (e) => {
		var t = Vy(), n = N(t), i = F(n, !0), a = I(n, 2), o = N(a);
		G(o);
		var s = I(o);
		O(a);
		var c = I(a, 2), u = (e) => {
			var t = By(), n = P(t);
			{
				let e = /* @__PURE__ */ A(() => Y("lbl.navScroll")), t = /* @__PURE__ */ A(() => Y("tip.nav.scroll")), i = /* @__PURE__ */ A(() => R(r).nav.scroll ?? "none"), a = /* @__PURE__ */ A(() => [
					["none", Y("opt.scroll.none")],
					["shrink", Y("opt.scroll.shrink")],
					["hide", Y("opt.scroll.hide")]
				]);
				eu(n, {
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
						return R(a);
					},
					onchange: (e) => l("nav", () => {
						e === "none" ? delete R(r).nav.scroll : R(r).nav.scroll = e;
					})
				});
			}
			var i = I(n, 2), a = (e) => {
				var t = zy(), n = P(t), i = N(n), a = F(i, !0), o = I(i, 2);
				G(o);
				var s = F(I(o, 2));
				O(n);
				var c = I(n, 2), l = N(c), u = F(l, !0), d = I(l, 2);
				G(d);
				var f = F(I(d, 2));
				O(c);
				var p = I(c, 2), m = N(p), h = F(m, !0), g = I(m, 2);
				G(g);
				var _ = F(I(g, 2));
				O(p);
				var v = I(p, 2), y = (e) => {
					var t = Ry(), n = N(t);
					G(n);
					var i = I(n);
					O(t), L((e, a) => {
						J(t, "title", e), q(n, R(r).nav.style?.shrinkLogo === !0), H(i, ` ${a ?? ""}`);
					}, [() => Y("tip.nav.shrinkLogo"), () => Y("lbl.navShrinkLogo")]), z("change", n, (e) => ne("shrinkLogo", e.target.checked ? !0 : void 0)), V(e, t);
				};
				U(v, (e) => {
					(R(r).nav.logo?.type ?? "text") !== "text" && e(y);
				}), L((e, t, i, l, m, v, y, b) => {
					J(n, "title", e), H(a, t), K(o, i), H(s, `${l ?? ""}%`), J(c, "title", m), H(u, v), K(d, R(r).nav.style?.shrinkAt ?? 80), H(f, `${R(r).nav.style?.shrinkAt ?? 80 ?? ""} px`), J(p, "title", y), H(h, b), K(g, R(r).nav.style?.shrinkMs ?? 220), H(_, `${R(r).nav.style?.shrinkMs ?? 220 ?? ""} ms`);
				}, [
					() => Y("tip.nav.shrinkTo"),
					() => Y("lbl.navShrinkTo"),
					() => Math.round((R(r).nav.style?.shrinkTo ?? .5) * 100),
					() => Math.round((R(r).nav.style?.shrinkTo ?? .5) * 100),
					() => Y("tip.nav.shrinkAt"),
					() => Y("lbl.navShrinkAt"),
					() => Y("tip.nav.shrinkMs"),
					() => Y("lbl.navShrinkMs")
				]), z("input", o, (e) => Oe(e.target.valueAsNumber)), z("input", d, (e) => ke(e.target.valueAsNumber)), z("input", g, (e) => k(e.target.valueAsNumber)), V(e, t);
			};
			U(i, (e) => {
				R(r).nav.scroll === "shrink" && e(a);
			}), V(e, t);
		};
		U(c, (e) => {
			R(r).nav.sticky !== !1 && e(u);
		});
		var d = I(c, 2), f = N(d);
		G(f);
		var p = I(f);
		O(d), O(t), L((e, t, n, c, l) => {
			H(i, e), J(a, "title", t), q(o, R(r).nav.sticky !== !1), H(s, ` ${n ?? ""}`), J(d, "title", c), q(f, R(r).nav.style?.atTop === "clear"), H(p, ` ${l ?? ""}`);
		}, [
			() => Y("group.navScrolling"),
			() => Y("tip.nav.sticky"),
			() => Y("lbl.navSticky"),
			() => Y("tip.nav.atTop"),
			() => Y("lbl.navAtTop")
		]), z("change", o, (e) => l("nav", () => {
			R(r).nav.sticky = e.target.checked;
		})), z("change", f, (e) => ne("atTop", e.target.checked ? "clear" : void 0)), V(e, t);
	};
	U(Cn, (e) => {
		R(re) || e(wn);
	}), O(Sn), O(yn);
	var Tn = I(yn, 4), En = N(Tn), On = F(En, !0), kn = I(En, 2), An = N(kn), jn = N(An), Mn = (e) => {
		var t = Hy(), n = N(t), i = F(n, !0), a = I(n, 2);
		G(a), O(t), L((e, n, o) => {
			J(t, "title", e), H(i, n), J(a, "min", ay.min), J(a, "max", ay.max), J(a, "placeholder", o), K(a, R(r).nav.style?.mobile?.padY ?? "");
		}, [
			() => Y("tip.nav.thickness"),
			() => Y("lbl.navThickness"),
			() => Y("lbl.navSameAsDesktop")
		]), z("change", a, (e) => D(e, "padY", ay)), V(e, t);
	};
	U(jn, (e) => {
		R(re) || e(Mn);
	});
	var Nn = I(jn, 2), Pn = N(Nn), Fn = F(Pn, !0), In = I(Pn, 2);
	G(In), O(Nn), O(An);
	var Ln = I(An, 2), Rn = N(Ln), zn = N(Rn), Bn = F(zn, !0), Vn = I(zn, 2);
	{
		let e = /* @__PURE__ */ A(() => R(r).nav.style?.mobile?.size ?? ""), t = /* @__PURE__ */ A(() => [["", Y("lbl.navSameAsDesktop")], ..._y.map((e) => [e, Y(`opt.size.${e}`)])]);
		Ao(Vn, {
			filled: !0,
			get value() {
				return R(e);
			},
			get options() {
				return R(t);
			},
			onchange: (e) => ue("size", e || void 0)
		});
	}
	O(Rn);
	var Hn = I(Rn, 2), Un = N(Hn), Wn = F(Un, !0), Gn = I(Un, 2);
	{
		let e = /* @__PURE__ */ A(() => R(r).nav.style?.mobile?.layout ?? ""), t = /* @__PURE__ */ A(() => [
			["", Y("lbl.navSameAsDesktop")],
			["left", Y("common.left")],
			["center", Y("common.center")],
			["right", Y("common.right")]
		]);
		Ao(Gn, {
			filled: !0,
			get value() {
				return R(e);
			},
			get options() {
				return R(t);
			},
			onchange: (e) => ue("layout", e || void 0)
		});
	}
	O(Hn), O(Ln);
	var Kn = I(Ln, 2), qn = N(Kn), Jn = N(qn), Yn = F(Jn, !0), Xn = I(Jn, 2);
	{
		let e = /* @__PURE__ */ A(() => R(r).nav.style?.mobile?.tools?.side ?? ""), t = /* @__PURE__ */ A(() => [
			["", Y("lbl.navSameAsDesktop")],
			["start", Y("common.left")],
			["end", Y("common.right")]
		]);
		Ao(Xn, {
			filled: !0,
			get value() {
				return R(e);
			},
			get options() {
				return R(t);
			},
			onchange: (e) => ue("tools", e ? { side: e } : void 0)
		});
	}
	O(qn);
	var Zn = I(qn, 2), Qn = (e) => {
		var t = Uy(), n = N(t), r = F(n, !0), i = I(n, 2);
		{
			let e = /* @__PURE__ */ A(() => de("overlay")), t = /* @__PURE__ */ A(() => [
				["", Y("lbl.navSameAsDesktop")],
				["on", Y("common.on")],
				["off", Y("common.off")]
			]);
			Ao(i, {
				filled: !0,
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => fe("overlay", e)
			});
		}
		O(t), L((e, n) => {
			J(t, "title", e), H(r, n);
		}, [() => Y("tip.nav.mobileOverlay"), () => Y("lbl.navOverlay")]), V(e, t);
	};
	U(Zn, (e) => {
		!R(ie) && !R(re) && e(Qn);
	}), O(Kn);
	var $n = I(Kn, 2), er = N($n), tr = N(er), nr = F(tr, !0), rr = I(tr, 2);
	{
		let e = /* @__PURE__ */ A(() => R(r).nav.style?.mobile?.border?.side ?? ""), t = /* @__PURE__ */ A(() => [
			["", Y("lbl.navSameAsDesktop")],
			["none", Y("common.none")],
			["bottom", Y("opt.navBorder.bottom")],
			["top", Y("opt.navBorder.top")],
			["both", Y("opt.navBorder.both")],
			["all", Y("opt.navBorder.all")]
		]);
		Ao(rr, {
			filled: !0,
			get value() {
				return R(e);
			},
			get options() {
				return R(t);
			},
			onchange: (e) => pe(e)
		});
	}
	O(er), O($n);
	var ir = I($n, 2), ar = (e) => {
		var t = Iy(), n = N(t), i = F(n, !0), a = I(n, 2);
		G(a);
		var o = I(a, 2), s = F(o, !0), c = I(o, 2);
		{
			let e = /* @__PURE__ */ A(() => R(r).nav.style.mobile.border.color ?? "text"), t = /* @__PURE__ */ A(u), n = /* @__PURE__ */ A(() => Y("tip.nav.borderColorPick"));
			Na(c, {
				get value() {
					return R(e);
				},
				get tokens() {
					return R(t);
				},
				get label() {
					return R(n);
				},
				onchange: (e) => ue("border", {
					...R(r).nav.style.mobile.border,
					color: e
				})
			});
		}
		O(t), L((e, t, c, l, u) => {
			J(n, "title", e), H(i, t), J(a, "title", c), K(a, R(r).nav.style.mobile.border.width ?? 1), J(o, "title", l), H(s, u);
		}, [
			() => Y("tip.nav.borderWidth"),
			() => Y("lbl.navBorderWidth"),
			() => Y("tip.nav.borderWidth"),
			() => Y("tip.nav.borderColorPick"),
			() => Y("lbl.navBorderColor")
		]), z("change", a, (e) => {
			let t = by(e.target.value, {
				min: 1,
				max: 8
			}, 1), n = { ...R(r).nav.style.mobile.border };
			t === 1 ? delete n.width : n.width = t, ue("border", n), e.target.value = R(r).nav.style.mobile.border.width ?? 1;
		}), V(e, t);
	};
	U(ir, (e) => {
		R(r).nav.style?.mobile?.border?.side && R(r).nav.style.mobile.border.side !== "none" && e(ar);
	});
	var or = I(ir, 2), sr = N(or), cr = N(sr), lr = F(cr, !0), ur = I(cr, 2);
	{
		let e = /* @__PURE__ */ A(() => R(r).nav.style?.mobileMenu ?? "dropdown"), t = /* @__PURE__ */ A(() => [["dropdown", Y("opt.mobileMenu.dropdown")], ["sheet", Y("opt.mobileMenu.sheet")]]);
		Ao(ur, {
			filled: !0,
			get value() {
				return R(e);
			},
			get options() {
				return R(t);
			},
			onchange: (e) => ne("mobileMenu", e === "dropdown" ? void 0 : e)
		});
	}
	O(sr);
	var dr = I(sr, 2), fr = (e) => {
		var t = Uy(), n = N(t), i = F(n, !0), a = I(n, 2);
		{
			let e = /* @__PURE__ */ A(() => R(r).nav.style?.sheetMotion ?? "top"), t = /* @__PURE__ */ A(() => [
				"top",
				"bottom",
				"left",
				"right",
				"fade",
				"none"
			].map((e) => [e, Y(`opt.sheetMotion.${e}`)]));
			Ao(a, {
				filled: !0,
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => ne("sheetMotion", e === "top" ? void 0 : e)
			});
		}
		O(t), L((e, n) => {
			J(t, "title", e), H(i, n);
		}, [() => Y("tip.nav.sheetMotion"), () => Y("lbl.sheetMotion")]), V(e, t);
	};
	U(dr, (e) => {
		R(r).nav.style?.mobileMenu === "sheet" && e(fr);
	}), O(or);
	var pr = I(or, 2), mr = (e) => {
		var t = Wy(), n = P(t), i = N(n);
		G(i);
		var a = I(i);
		O(n);
		var o = I(n, 2), s = (e) => {
			var t = Ry(), n = N(t);
			G(n);
			var i = I(n);
			O(t), L((e, a) => {
				J(t, "title", e), q(n, R(r).nav.style?.sheetTheme === !0), H(i, ` ${a ?? ""}`);
			}, [() => Y("tip.nav.sheetTheme"), () => Y("lbl.sheetTheme")]), z("change", n, (e) => ne("sheetTheme", e.target.checked ? !0 : void 0)), V(e, t);
		};
		U(o, (e) => {
			R(r).theme?.alt?.tokens && R(r).nav.style?.tools?.theme !== !1 && e(s);
		});
		var c = I(o, 2), l = (e) => {
			var t = Ry(), n = N(t);
			G(n);
			var i = I(n);
			O(t), L((e, a) => {
				J(t, "title", e), q(n, R(r).nav.style?.sheetCart === !0), H(i, ` ${a ?? ""}`);
			}, [() => Y("tip.nav.sheetCart"), () => Y("lbl.sheetCart")]), z("change", n, (e) => ne("sheetCart", e.target.checked ? !0 : void 0)), V(e, t);
		};
		U(c, (e) => {
			R(r).nav.cart?.show && e(l);
		});
		var d = I(c, 2), f = (e) => {
			var t = Ry(), n = N(t);
			G(n);
			var i = I(n);
			O(t), L((e, a) => {
				J(t, "title", e), q(n, R(r).nav.style?.sheetAnnounce === !0), H(i, ` ${a ?? ""}`);
			}, [() => Y("tip.nav.sheetAnnounce"), () => Y("lbl.sheetAnnounce")]), z("change", n, (e) => ne("sheetAnnounce", e.target.checked ? !0 : void 0)), V(e, t);
		};
		U(d, (e) => {
			R(r).nav.announcement?.show && e(f);
		});
		var p = I(d, 2), m = (e) => {
			var t = Ry(), n = N(t);
			G(n);
			var i = I(n);
			O(t), L((e, a) => {
				J(t, "title", e), q(n, R(r).nav.style?.sheetToolLabels === !0), H(i, ` ${a ?? ""}`);
			}, [() => Y("tip.nav.sheetToolLabels"), () => Y("lbl.sheetToolLabels")]), z("change", n, (e) => ne("sheetToolLabels", e.target.checked ? !0 : void 0)), V(e, t);
		};
		U(p, (e) => {
			(R(r).nav.style?.sheetTheme || R(r).nav.style?.sheetCart) && e(m);
		});
		var h = I(p, 2), g = N(h), _ = F(g, !0), v = I(g, 2);
		{
			let e = /* @__PURE__ */ A(() => R(r).nav.style?.sheet?.bg ?? "surface"), t = /* @__PURE__ */ A(u), n = /* @__PURE__ */ A(() => Y("tip.nav.sheetBg"));
			Na(v, {
				get value() {
					return R(e);
				},
				get tokens() {
					return R(t);
				},
				get label() {
					return R(n);
				},
				onchange: (e) => Te("bg", e)
			});
		}
		var y = I(v, 2);
		G(y);
		var b = F(I(y, 2));
		O(h);
		var x = I(h, 2), S = N(x);
		G(S);
		var C = I(S);
		O(x);
		var w = I(x, 2), T = N(w), E = I(T);
		{
			let e = /* @__PURE__ */ A(() => R(r).nav.style?.sheet?.textColor ?? R(r).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ A(u), n = /* @__PURE__ */ A(() => Y("tip.nav.sheetTextColorPick"));
			Na(E, {
				get value() {
					return R(e);
				},
				get tokens() {
					return R(t);
				},
				get label() {
					return R(n);
				},
				onchange: (e) => Te("textColor", e)
			});
		}
		O(w), L((e, t, o, s, c, l, u, d, f, p) => {
			J(n, "title", e), q(i, R(r).nav.style?.sheetLogo === !0), H(a, ` ${t ?? ""}`), J(h, "title", o), H(_, s), J(y, "title", c), K(y, l), H(b, `${u ?? ""}%`), J(x, "title", d), q(S, R(r).nav.style?.sheet?.blur ?? R(r).nav.style?.blur !== !1), H(C, ` ${f ?? ""}`), H(T, `${p ?? ""} `);
		}, [
			() => Y("tip.nav.sheetLogo"),
			() => Y("lbl.sheetLogo"),
			() => Y("tip.nav.sheetBg"),
			() => Y("lbl.background"),
			() => Y("tip.nav.sheetOpacity"),
			() => Math.round((R(r).nav.style?.sheet?.bgOpacity ?? .85) * 100),
			() => Math.round((R(r).nav.style?.sheet?.bgOpacity ?? .85) * 100),
			() => Y("tip.nav.sheetBlur"),
			() => Y("lbl.sheetBlur"),
			() => Y("lbl.textColor")
		]), z("change", i, (e) => ne("sheetLogo", e.target.checked ? !0 : void 0)), z("input", y, (e) => Te("bgOpacity", e.target.valueAsNumber / 100)), z("change", S, (e) => Te("blur", e.target.checked)), V(e, t);
	};
	U(pr, (e) => {
		R(r).nav.style?.mobileMenu === "sheet" && e(mr);
	});
	var hr = I(pr, 2), gr = (e) => {
		var t = Uy(), n = N(t), i = F(n, !0), a = I(n, 2);
		{
			let e = /* @__PURE__ */ A(() => R(r).nav.style?.mobileSubs ?? "collapsed"), t = /* @__PURE__ */ A(() => [["collapsed", Y("opt.mobileSubs.collapsed")], ["expanded", Y("opt.mobileSubs.expanded")]]);
			Ao(a, {
				filled: !0,
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => ne("mobileSubs", e === "collapsed" ? void 0 : e)
			});
		}
		O(t), L((e, n) => {
			J(t, "title", e), H(i, n);
		}, [() => Y("tip.nav.mobileSubs"), () => Y("lbl.mobileSubs")]), V(e, t);
	}, _r = /* @__PURE__ */ A(() => R(r).nav.items?.some((e) => e.children?.length));
	U(hr, (e) => {
		R(_r) && e(gr);
	}), O(kn), O(Tn);
	var vr = I(Tn, 4), yr = N(vr), br = F(yr, !0), xr = I(yr, 2), Sr = N(xr), Cr = N(Sr), wr = F(Cr, !0), Tr = I(Cr, 2);
	ni(Tr, 21, () => [
		["standard", Y("opt.hover.standard")],
		["underline", Y("opt.hover.underline")],
		["pill", Y("opt.hover.pill")],
		["lift-plain", Y("opt.hover.liftPlain")],
		["lift", Y("opt.hover.lift")]
	], ([e, t]) => e, (e, t) => {
		var n = /* @__PURE__ */ A(() => h(R(t), 2));
		let i = () => R(n)[0], a = () => R(n)[1];
		var o = Gy();
		let s;
		var c = N(o), l = F(c, !0), u = F(I(c), !0);
		O(o), L((e) => {
			s = Ei(o, 1, "tile hover-tile", null, s, { on: (R(r).nav.style?.hover ?? "standard") === i() }), J(o, "aria-pressed", (R(r).nav.style?.hover ?? "standard") === i()), Ei(c, 1, `hover-sample hover-${i() ?? ""}`), H(l, e), H(u, a());
		}, [() => Y("seed.home")]), z("click", o, () => Le(i())), V(e, o);
	}), O(Tr), O(Sr);
	var Er = I(Sr, 2), Dr = (e) => {
		var t = Ky(), n = N(t), i = F(n, !0), a = I(n, 2);
		G(a);
		var o = F(I(a, 2));
		O(t), L((e, n, s) => {
			J(t, "title", e), H(i, n), K(a, R(r).nav.style?.hoverGlow ?? .6), H(o, `${s ?? ""}%`);
		}, [
			() => Y("tip.nav.hoverGlow"),
			() => Y("lbl.glowStrength"),
			() => Math.round((R(r).nav.style?.hoverGlow ?? .6) * 100)
		]), z("input", a, (e) => ne("hoverGlow", Number(e.target.value))), V(e, t);
	};
	U(Er, (e) => {
		R(r).nav.style?.hover === "lift" && e(Dr);
	});
	var Or = I(Er, 2), kr = N(Or), Ar = (e) => {
		var t = qy(), n = N(t);
		{
			let e = /* @__PURE__ */ A(() => R(r).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ A(u);
			Na(n, {
				get value() {
					return R(e);
				},
				get tokens() {
					return R(t);
				},
				get label() {
					return R(je)[1];
				},
				onchange: (e) => ne("hoverColor", e)
			});
		}
		var i = F(I(n, 2), !0);
		O(t), L(() => {
			J(t, "title", R(je)[1]), H(i, R(je)[0]);
		}), V(e, t);
	};
	U(kr, (e) => {
		R(je) && e(Ar);
	});
	var Mr = I(kr, 2), Nr = N(Mr);
	{
		let e = /* @__PURE__ */ A(() => R(r).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ A(u), n = /* @__PURE__ */ A(() => Y("tip.nav.hoverTextColorPick"));
		Na(Nr, {
			get value() {
				return R(e);
			},
			get tokens() {
				return R(t);
			},
			get label() {
				return R(n);
			},
			onchange: (e) => ne("hoverTextColor", e)
		});
	}
	var Pr = F(I(Nr, 2), !0);
	O(Mr);
	var Fr = I(Mr, 2), Ir = N(Fr);
	{
		let e = /* @__PURE__ */ A(() => R(r).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ A(u), n = /* @__PURE__ */ A(() => Y("tip.nav.textColorPick"));
		Na(Ir, {
			get value() {
				return R(e);
			},
			get tokens() {
				return R(t);
			},
			get label() {
				return R(n);
			},
			onchange: (e) => ne("textColor", e)
		});
	}
	var Lr = F(I(Ir, 2), !0);
	O(Fr), O(Or);
	var Rr = I(Or, 2), zr = N(Rr);
	G(zr);
	var B = I(zr);
	O(Rr), O(xr), O(vr);
	var Hr = I(vr, 4), Ur = N(Hr), Wr = F(Ur, !0), Gr = I(Ur, 2), Kr = N(Gr);
	{
		let e = /* @__PURE__ */ A(() => R(r).nav?.style?.background?.layers ?? []);
		$g(Kr, {
			get bg() {
				return s;
			},
			get layers() {
				return R(e);
			}
		});
	}
	O(Gr), O(Hr), O(Et), O(Ct);
	var qr = I(Ct, 2), Jr = N(qr), Yr = F(Jr, !0), Xr = I(Jr, 2), Zr = N(Xr), $r = N(Zr);
	G($r);
	var ei = I($r);
	O(Zr);
	var ti = I(Zr, 2), ri = (e) => {
		var t = Xy(), n = P(t), i = N(n), o = F(i, !0), s = I(i, 2);
		G(s), O(n);
		var c = I(n, 2), d = N(c), f = I(d);
		{
			let e = /* @__PURE__ */ A(() => R(r).nav.announcement?.page ?? (R(r).nav.announcement?.href === void 0 ? "" : "custom")), t = /* @__PURE__ */ A(() => [
				["", Y("common.none")],
				...R(r).pages.map((e) => [e.id, e.title]),
				["custom", Y("opt.announceLink.custom")]
			]);
			Ao(f, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => l("edit:nav-announce-link", () => {
					let t = { ...R(r).nav.announcement ?? {} };
					delete t.page, delete t.href, e === "custom" ? t.href = "" : e && (t.page = e), R(r).nav.announcement = t;
				})
			});
		}
		O(c);
		var p = I(c, 2), m = (e) => {
			var t = Jy(), n = N(t), i = F(n, !0), a = I(n, 2);
			G(a), O(t), L((e, n) => {
				J(t, "title", e), H(i, n), K(a, R(r).nav.announcement?.href ?? "");
			}, [() => Y("tip.nav.announceHref"), () => Y("lbl.announceHref")]), z("change", a, (e) => me("href", e.target.value.trim())), V(e, t);
		};
		U(p, (e) => {
			R(r).nav.announcement?.href !== void 0 && !R(r).nav.announcement?.page && e(m);
		});
		var h = I(p, 2), g = (e) => {
			var t = Ry(), n = N(t);
			G(n);
			var i = I(n);
			O(t), L((e, a) => {
				J(t, "title", e), q(n, R(r).nav.announcement?.sticky !== !1), H(i, ` ${a ?? ""}`);
			}, [() => Y("tip.nav.announceSticky"), () => Y("lbl.announceSticky")]), z("change", n, (e) => me("sticky", e.target.checked ? void 0 : !1)), V(e, t);
		};
		U(h, (e) => {
			R(r).nav.sticky !== !1 && !R(ie) && !R(re) && !R(r).nav.overlay && e(g);
		});
		var _ = I(h, 2), v = (e) => {
			var t = Ry(), n = N(t);
			G(n);
			var i = I(n);
			O(t), L((e, a) => {
				J(t, "title", e), q(n, R(r).nav.announcement?.followNav === !0), H(i, ` ${a ?? ""}`);
			}, [() => Y("tip.nav.announceFollowNav"), () => Y("lbl.announceFollowNav")]), z("change", n, (e) => me("followNav", e.target.checked ? !0 : void 0)), V(e, t);
		};
		U(_, (e) => {
			R(r).nav.scroll === "hide" && R(r).nav.sticky !== !1 && !R(re) && R(r).nav.announcement?.sticky !== !1 && e(v);
		});
		var y = I(_, 2), b = (e) => {
			{
				let t = /* @__PURE__ */ A(() => Y("lbl.announcePlace")), n = /* @__PURE__ */ A(() => Y("tip.nav.announcePlace")), i = /* @__PURE__ */ A(() => R(r).nav.announcement?.place ?? "nav"), a = /* @__PURE__ */ A(() => [
					["nav", Y("opt.announcePlace.nav")],
					["page", Y("opt.announcePlace.page")],
					["content", Y("opt.announcePlace.content")]
				]);
				eu(e, {
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
						return R(a);
					},
					onchange: (e) => me("place", e === "nav" ? void 0 : e)
				});
			}
		};
		U(y, (e) => {
			R(re) && e(b);
		});
		var x = I(y, 2), S = N(x);
		G(S);
		var C = I(S);
		O(x);
		var w = I(x, 2), T = (e) => {
			var t = Yy(), n = F(t, !0);
			L((e, r) => {
				J(t, "title", e), H(n, r);
			}, [() => Y("tip.nav.announceShowAgain"), () => Y("lbl.announceShowAgain")]), z("click", t, () => a?.sendAnnounceReset()), V(e, t);
		};
		U(w, (e) => {
			R(r).nav.announcement?.dismiss !== !1 && e(T);
		});
		var E = I(w, 2), ee = N(E), te = I(ee);
		{
			let e = /* @__PURE__ */ A(() => R(r).nav.announcement?.color ?? "accent"), t = /* @__PURE__ */ A(u), n = /* @__PURE__ */ A(() => Y("tip.nav.announceColor"));
			Na(te, {
				get value() {
					return R(e);
				},
				get tokens() {
					return R(t);
				},
				get label() {
					return R(n);
				},
				onchange: (e) => me("color", e)
			});
		}
		O(E);
		var ne = I(E, 2), ae = N(ne), oe = I(ae);
		{
			let e = /* @__PURE__ */ A(() => R(r).nav.announcement?.textColor ?? "accent-text"), t = /* @__PURE__ */ A(u), n = /* @__PURE__ */ A(() => Y("tip.nav.announceTextColor"));
			Na(oe, {
				get value() {
					return R(e);
				},
				get tokens() {
					return R(t);
				},
				get label() {
					return R(n);
				},
				onchange: (e) => me("textColor", e)
			});
		}
		O(ne), L((e, t, i, a, l, u, f, p, m, h) => {
			J(n, "title", e), H(o, t), K(s, R(r).nav.announcement?.text ?? ""), J(c, "title", i), H(d, `${a ?? ""} `), J(x, "title", l), q(S, R(r).nav.announcement?.dismiss !== !1), H(C, ` ${u ?? ""}`), J(E, "title", f), H(ee, `${p ?? ""} `), J(ne, "title", m), H(ae, `${h ?? ""} `);
		}, [
			() => Y("tip.nav.announce"),
			() => Y("lbl.text"),
			() => Y("tip.nav.announceLink"),
			() => Y("lbl.link"),
			() => Y("tip.nav.announceDismiss"),
			() => Y("lbl.announceDismiss"),
			() => Y("tip.nav.announceColor"),
			() => Y("lbl.background"),
			() => Y("tip.nav.announceTextColor"),
			() => Y("lbl.textColor")
		]), z("change", s, (e) => me("text", e.target.value.trim() || void 0)), z("change", S, (e) => me("dismiss", e.target.checked ? void 0 : !1)), V(e, t);
	};
	U(ti, (e) => {
		R(r).nav.announcement?.show && e(ri);
	}), O(Xr), O(qr);
	var ii = I(qr, 2), ai = N(ii), oi = F(ai, !0), si = I(ai, 2);
	{
		let e = (e, t = f, n = f) => {
			var r = Zy(), i = N(r);
			W(i, () => X.up, !0), O(i);
			var a = I(i, 2);
			W(a, () => X.down, !0), O(a), O(r), L((e, t) => {
				J(i, "title", e), i.disabled = n() === 0, J(a, "title", t), a.disabled = n() === R(E).length - 1;
			}, [() => Y("tip.moveUp"), () => Y("tip.moveDown")]), z("click", i, (e) => {
				e.preventDefault(), e.stopPropagation(), ee(t(), -1);
			}), z("click", a, (e) => {
				e.preventDefault(), e.stopPropagation(), ee(t(), 1);
			}), V(e, r);
		};
		var ci = N(si), li = (e) => {
			var t = By(), n = P(t);
			{
				let e = /* @__PURE__ */ A(() => Y("lbl.toolsSide")), t = /* @__PURE__ */ A(() => Y("tip.nav.toolsSideColumn")), i = /* @__PURE__ */ A(() => R(r).nav.style?.tools?.side ?? "end"), a = /* @__PURE__ */ A(() => [["start", Y("opt.toolsSide.top")], ["end", Y("opt.toolsSide.bottom")]]);
				eu(n, {
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
						return R(a);
					},
					onchange: (e) => te("side", e === "start" ? "start" : void 0)
				});
			}
			var i = I(n, 2);
			{
				let e = /* @__PURE__ */ A(() => Y("lbl.toolsAlign")), t = /* @__PURE__ */ A(() => Y("tip.nav.toolsAlign")), n = /* @__PURE__ */ A(() => R(r).nav.style?.tools?.align ?? "center"), a = /* @__PURE__ */ A(() => [
					["start", Y("opt.toolsAlign.start")],
					["center", Y("opt.toolsAlign.center")],
					["end", Y("opt.toolsAlign.end")],
					["spread", Y("opt.toolsAlign.spread")]
				]);
				eu(i, {
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
						return R(a);
					},
					onchange: (e) => te("align", e === "center" ? void 0 : e)
				});
			}
			V(e, t);
		}, ui = (e) => {
			{
				let t = /* @__PURE__ */ A(() => Y("lbl.toolsSide")), n = /* @__PURE__ */ A(() => Y("tip.nav.toolsSide")), i = /* @__PURE__ */ A(() => R(r).nav.style?.tools?.side ?? "end"), a = /* @__PURE__ */ A(() => [["start", Y("opt.toolsSide.start")], ["end", Y("opt.toolsSide.end")]]);
				eu(e, {
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
						return R(a);
					},
					onchange: (e) => te("side", e === "start" ? "start" : void 0)
				});
			}
		};
		U(ci, (e) => {
			R(re) ? e(li) : e(ui, -1);
		}), ni(I(ci, 2), 18, () => R(E), (e) => e, (t, n, i) => {
			var a = Vr(), o = P(a), s = (t) => {
				var a = Vr(), o = P(a), s = (t) => {
					var a = Qy(), o = N(a), s = N(o), c = F(s, !0), l = I(s);
					e(l, () => n, () => R(i)), O(o);
					var u = I(o, 2), d = N(u);
					G(d);
					var f = I(d);
					O(u), O(a), L((e, t, n) => {
						H(c, e), J(u, "title", t), q(d, R(r).nav.style?.tools?.theme !== !1), H(f, ` ${n ?? ""}`);
					}, [
						() => Y("lbl.themeToggle"),
						() => Y("tip.nav.themeToggle"),
						() => Y("lbl.showInMenu")
					]), z("change", d, (e) => te("theme", e.target.checked ? void 0 : !1)), V(t, a);
				};
				U(o, (e) => {
					R(r).theme?.alt?.tokens && e(s);
				}), V(t, a);
			}, c = (t) => {
				var a = $y(), o = N(a), s = N(o), c = F(s, !0), u = I(s);
				e(u, () => n, () => R(i)), O(o);
				var d = I(o, 2), f = N(d);
				G(f);
				var p = I(f);
				O(d);
				var m = I(d, 2), h = (e) => {
					var t = Uy(), n = N(t), i = F(n, !0), a = I(n, 2);
					{
						let e = /* @__PURE__ */ A(() => R(r).nav.cart?.href ?? ""), t = /* @__PURE__ */ A(() => [["", Y("common.none")], ...R(r).pages.map((e) => [e.path, e.title])]);
						Ao(a, {
							filled: !0,
							get value() {
								return R(e);
							},
							get options() {
								return R(t);
							},
							onchange: (e) => l("nav", () => {
								e ? R(r).nav.cart.href = e : delete R(r).nav.cart.href;
							})
						});
					}
					O(t), L((e, n) => {
						J(t, "title", e), H(i, n);
					}, [() => Y("tip.cart.checkout"), () => Y("lbl.checkoutPage")]), V(e, t);
				};
				U(m, (e) => {
					R(r).nav.cart?.show && e(h);
				}), O(a), L((e, t, n) => {
					H(c, e), J(d, "title", t), q(f, R(r).nav.cart?.show === !0), H(p, ` ${n ?? ""}`);
				}, [
					() => Y("lbl.cart"),
					() => Y("tip.nav.cart"),
					() => Y("lbl.showInMenu")
				]), z("change", f, (e) => l("nav", () => {
					e.target.checked ? R(r).nav.cart = {
						...R(r).nav.cart ?? {},
						show: !0
					} : delete R(r).nav.cart;
				})), V(t, a);
			}, u = (t) => {
				var a = sb(), o = N(a), s = N(o), c = N(s, !0), l = I(c);
				e(l, () => n, () => R(i)), O(s), O(o);
				var u = I(o, 2), d = N(u), f = N(d);
				G(f);
				var p = I(f);
				O(d);
				var m = I(d, 2), g = (e) => {
					var t = ob(), n = P(t), i = N(n), a = F(i, !0), o = I(i, 2);
					ni(o, 21, () => R(Me), ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ A(() => h(R(t), 2));
						let i = () => R(n)[0], a = () => R(n)[1];
						var o = Oy();
						let s;
						var c = N(o);
						W(c, () => v[i()]);
						var l = F(I(c), !0);
						O(o), L(() => {
							s = Ei(o, 1, "tile", null, s, { on: (R(r).nav.launcher?.view ?? "grid") === i() }), J(o, "aria-pressed", (R(r).nav.launcher?.view ?? "grid") === i()), H(l, a());
						}), z("click", o, () => ye("view", i() === "grid" ? void 0 : i())), V(e, o);
					}), O(o), O(n);
					var s = I(n, 2);
					{
						let e = /* @__PURE__ */ A(() => Y("lbl.launcherMobileView")), t = /* @__PURE__ */ A(() => Y("tip.nav.launcherMobileView")), n = /* @__PURE__ */ A(() => R(r).nav.launcher?.mobileView ?? ""), i = /* @__PURE__ */ A(() => [["", Y("lbl.navSameAsDesktop")], ...R(Me)]);
						eu(s, {
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
							onchange: (e) => ye("mobileView", e || void 0)
						});
					}
					var c = I(s, 2), l = N(c), u = F(l, !0), d = I(l, 2);
					G(d);
					var f = F(I(d, 2), !0);
					O(c);
					var p = I(c, 2), m = N(p);
					G(m);
					var g = I(m);
					O(p);
					var _ = I(p, 2), y = (e) => {
						var t = eb(), n = N(t), i = F(n, !0), a = I(n, 2);
						G(a), O(t), L((e, n, o) => {
							J(t, "title", e), H(i, n), J(a, "placeholder", o), K(a, R(r).nav.launcher?.title ?? "");
						}, [
							() => Y("tip.nav.launcherTitleText"),
							() => Y("lbl.launcherTitle"),
							() => Y("ph.launcherTitle")
						]), z("change", a, (e) => ye("title", e.target.value.trim() || void 0)), V(e, t);
					};
					U(_, (e) => {
						R(r).nav.launcher?.showTitle !== !1 && e(y);
					});
					var b = I(_, 2), x = N(b), S = F(x, !0), C = I(x, 2), w = N(C);
					{
						let e = /* @__PURE__ */ A(() => R(r).nav.launcher?.icon ?? ""), t = /* @__PURE__ */ A(() => R(r).nav.launcher?.image ?? ""), n = /* @__PURE__ */ A(_e), i = /* @__PURE__ */ A(() => Y("opt.launcherDots")), a = /* @__PURE__ */ A(() => Y("tip.nav.launcherIcon"));
						Vd(w, {
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
								return R(i);
							},
							get label() {
								return R(a);
							},
							onpick: (e) => ve(null, e),
							onfile: (e) => we(e, null),
							children: (e, t) => {
								var n = Vr(), i = P(n), a = (e) => {
									var t = Ty();
									L(() => J(t, "src", R(r).nav.launcher.image)), V(e, t);
								}, o = (e) => {
									var t = Vr();
									W(P(t), () => Cu(R(r).nav.launcher.icon) || ""), V(e, t);
								}, s = (e) => {
									var t = Vr();
									W(P(t), () => he), V(e, t);
								};
								U(i, (e) => {
									R(r).nav.launcher?.image ? e(a) : R(r).nav.launcher?.icon ? e(o, 1) : e(s, -1);
								}), V(e, n);
							},
							$$slots: { default: !0 }
						});
					}
					var T = I(w, 2), E = N(T), ee = (e) => {
						var t = Br();
						L((e) => H(t, e), [() => Y("mp.ownImage")]), V(e, t);
					}, te = (e) => {
						var t = Br();
						L((e) => H(t, e), [() => Y(xu[R(r).nav.launcher.icon]?.labelKey ?? "common.none")]), V(e, t);
					}, ne = (e) => {
						var t = Br();
						L((e) => H(t, e), [() => Y("opt.launcherDots")]), V(e, t);
					};
					U(E, (e) => {
						R(r).nav.launcher?.image ? e(ee) : R(r).nav.launcher?.icon ? e(te, 1) : e(ne, -1);
					}), O(T), O(C), O(b);
					var re = I(b, 2);
					ni(re, 17, () => R(r).nav.launcher?.links ?? [], Qr, (e, t, n) => {
						let i = /* @__PURE__ */ A(() => !eh(R(t).href ?? ""));
						var a = ab();
						let o;
						var s = N(a), c = N(s), l = N(c), u = (e) => {
							var n = Ty();
							L(() => J(n, "src", R(t).image)), V(e, n);
						}, d = (e) => {
							var n = Vr();
							W(P(n), () => Cu(R(t).icon) || ""), V(e, n);
						};
						U(l, (e) => {
							R(t).image ? e(u) : e(d, -1);
						}), O(c);
						var f = I(c, 2), p = F(f, !0), m = I(f, 2), h = (e) => {
							var t = tb();
							W(t, () => X.warn, !0), O(t), L((e) => J(t, "title", e), [() => Y("tip.badTarget")]), V(e, t);
						};
						U(m, (e) => {
							R(i) && e(h);
						});
						var g = I(m, 2), _ = N(g);
						_.disabled = n === 0, W(_, () => X.up, !0), O(_);
						var v = I(_, 2);
						W(v, () => X.down, !0), O(v), O(g);
						var y = I(g, 2);
						W(y, () => X.caret, !0), O(y), O(s);
						var b = I(s, 2), x = (e) => {
							var r = ib(), a = N(r);
							{
								let e = /* @__PURE__ */ A(() => R(t).icon ?? ""), r = /* @__PURE__ */ A(() => R(t).image ?? ""), i = /* @__PURE__ */ A(_e), o = /* @__PURE__ */ A(() => Y("mp.pickMark"));
								Vd(a, {
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
									onpick: (e) => ve(n, e),
									onfile: (e) => we(e, n),
									children: (e, n) => {
										var r = nb(), i = P(r), a = N(i), o = (e) => {
											var n = Ty();
											L(() => J(n, "src", R(t).image)), V(e, n);
										}, s = (e) => {
											var n = Vr();
											W(P(n), () => Cu(R(t).icon) || ""), V(e, n);
										};
										U(a, (e) => {
											R(t).image ? e(o) : R(t).icon && e(s, 1);
										}), O(i);
										var c = F(I(i, 2), !0);
										L((e) => H(c, e), [() => R(t).label || Y("seed.link")]), V(e, r);
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
								var t = rb(), n = F(t, !0);
								L((e) => H(n, e), [() => Y("ui.badTarget")]), V(e, t);
							};
							U(u, (e) => {
								R(i) && e(d);
							});
							var f = I(u, 2), p = N(f);
							{
								let e = /* @__PURE__ */ A(() => R(t).icon ?? ""), r = /* @__PURE__ */ A(() => R(t).image ?? ""), i = /* @__PURE__ */ A(_e), a = /* @__PURE__ */ A(() => Y("mp.pickMark"));
								Vd(p, {
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
									onpick: (e) => ve(n, e),
									onfile: (e) => we(e, n),
									children: (e, t) => {
										De();
										var n = Br();
										L((e) => H(n, e), [() => Y("mp.changeMark")]), V(e, n);
									},
									$$slots: { default: !0 }
								});
							}
							var m = I(p, 2), h = F(m, !0);
							O(f), O(o), O(r), L((e, n, r, a, o, u) => {
								K(s, R(t).label), J(s, "title", e), J(s, "placeholder", n), l = Ei(c, 1, "field-filled", null, l, { "bad-target": R(i) }), K(c, R(t).href ?? ""), J(c, "placeholder", r), J(c, "title", a), J(m, "title", o), H(h, u);
							}, [
								() => Y("tip.nav.launcherLabel"),
								() => Y("lbl.text"),
								() => Y("ph.hrefAnchor"),
								() => R(i) ? Y("tip.badTarget") : Y("tip.hrefAnchor"),
								() => Y("tip.removeLink"),
								() => Y("ui.remove")
							]), z("change", s, (e) => Ce(n, "label", e.target.value)), z("change", c, (e) => Ce(n, "href", e.target.value)), z("click", m, () => xe(n)), V(e, r);
						};
						U(b, (e) => {
							R(ge) === n && e(x);
						}), O(a), L((e, t, i) => {
							o = Ei(a, 1, "lrow", null, o, { open: R(ge) === n }), H(p, e), J(_, "title", t), J(v, "title", i), v.disabled = n === R(r).nav.launcher.links.length - 1;
						}, [
							() => R(t).label || Y("seed.link"),
							() => Y("tip.moveUp"),
							() => Y("tip.moveDown")
						]), z("click", s, () => M(ge, R(ge) === n ? null : n, !0)), z("keydown", s, (e) => {
							(e.key === "Enter" || e.key === " ") && (e.preventDefault(), M(ge, R(ge) === n ? null : n, !0));
						}), z("click", g, (e) => e.stopPropagation()), z("keydown", g, (e) => e.stopPropagation()), z("click", _, () => Se(n, -1)), z("click", v, () => Se(n, 1)), V(e, a);
					});
					var ie = I(re, 2), ae = F(ie, !0);
					L((e, t, n, i, s, l, h, _) => {
						H(a, e), J(o, "aria-label", t), J(c, "title", n), H(u, i), K(d, R(r).nav.launcher?.mobileMax ?? 6), H(f, R(r).nav.launcher?.mobileMax ?? 6), J(p, "title", s), q(m, R(r).nav.launcher?.showTitle !== !1), H(g, ` ${l ?? ""}`), H(S, h), H(ae, _);
					}, [
						() => Y("lbl.design"),
						() => Y("lbl.design"),
						() => Y("tip.nav.launcherMobileMax"),
						() => Y("lbl.launcherMobileMax"),
						() => Y("tip.nav.launcherTitle"),
						() => Y("lbl.launcherShowTitle"),
						() => Y("lbl.launcherButton"),
						() => Y("ui.addLauncherLink")
					]), z("input", d, (e) => ye("mobileMax", e.target.valueAsNumber === 6 ? void 0 : e.target.valueAsNumber)), z("change", m, (e) => ye("showTitle", e.target.checked ? void 0 : !1)), z("click", ie, be), V(e, t);
				};
				U(m, (e) => {
					R(r).nav.launcher?.show === !0 && e(g);
				}), O(u), O(a), L((e, t, n, i) => {
					J(o, "title", e), H(c, t), J(d, "title", n), q(f, R(r).nav.launcher?.show === !0), H(p, ` ${i ?? ""}`);
				}, [
					() => Y("tip.nav.launcher"),
					() => Y("group.launcher"),
					() => Y("tip.nav.launcher"),
					() => Y("lbl.showInMenu")
				]), z("change", f, (e) => ye("show", e.target.checked ? !0 : void 0)), V(t, a);
			};
			U(o, (e) => {
				n === "theme" ? e(s) : n === "cart" ? e(c, 1) : e(u, -1);
			}), V(t, a);
		}), O(si);
	}
	O(ii);
	var di = I(ii, 2), fi = N(di), pi = F(fi, !0), mi = I(fi, 2), hi = N(mi), gi = N(hi), _i = F(gi, !0), vi = I(gi, 2);
	let yi;
	ni(vi, 21, () => R(Ne), ([e, t]) => e, (e, t) => {
		var n = /* @__PURE__ */ A(() => h(R(t), 2));
		let i = () => R(n)[0], a = () => R(n)[1];
		var o = Oy();
		let s;
		var c = N(o);
		W(c, () => _[i()]);
		var l = F(I(c), !0);
		O(o), L(() => {
			s = Ei(o, 1, "tile", null, s, { on: (R(r).nav.style?.subStyle ?? "card") === i() }), J(o, "aria-pressed", (R(r).nav.style?.subStyle ?? "card") === i()), H(l, a());
		}), z("click", o, () => ne("subStyle", i() === "card" ? void 0 : i())), V(e, o);
	}), O(vi), O(hi);
	var bi = I(hi, 2), xi = (e) => {
		var t = By(), n = P(t), i = (e) => {
			var t = By(), n = P(t);
			{
				let e = /* @__PURE__ */ A(() => Y("lbl.sideSubs")), t = /* @__PURE__ */ A(() => Y("tip.nav.sideSubs")), i = /* @__PURE__ */ A(() => R(r).nav.style?.sideSubs ?? "collapsed"), a = /* @__PURE__ */ A(() => [["collapsed", Y("opt.mobileSubs.collapsed")], ["expanded", Y("opt.mobileSubs.expanded")]]);
				eu(n, {
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
						return R(a);
					},
					onchange: (e) => ne("sideSubs", e === "collapsed" ? void 0 : e)
				});
			}
			var i = I(n, 2), a = (e) => {
				var t = Ry(), n = N(t);
				G(n);
				var i = I(n);
				O(t), L((e, a) => {
					J(t, "title", e), q(n, R(r).nav.style?.sideSubArrow === !0), H(i, ` ${a ?? ""}`);
				}, [() => Y("tip.nav.sideSubArrow"), () => Y("lbl.sideSubArrow")]), z("change", n, (e) => ne("sideSubArrow", e.target.checked ? !0 : void 0)), V(e, t);
			};
			U(i, (e) => {
				R(r).nav.style?.sideSubs === "expanded" && e(a);
			}), V(e, t);
		};
		U(n, (e) => {
			R(re) && e(i);
		});
		var a = I(n, 2), o = (e) => {
			{
				let t = /* @__PURE__ */ A(() => Y("lbl.subOpen")), n = /* @__PURE__ */ A(() => Y("tip.nav.subOpen")), i = /* @__PURE__ */ A(() => R(r).nav.style?.subOpen ?? "hover"), a = /* @__PURE__ */ A(() => [
					["hover", Y("opt.subOpen.hover")],
					["stay", Y("opt.subOpen.stay")],
					["click", Y("opt.subOpen.click")]
				]);
				eu(e, {
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
						return R(a);
					},
					onchange: (e) => ne("subOpen", e === "hover" ? void 0 : e)
				});
			}
		};
		U(a, (e) => {
			(!R(re) || R(r).nav.style?.sideSubs !== "expanded") && e(o);
		}), V(e, t);
	}, Si = /* @__PURE__ */ A(() => R(r).nav.items?.some((e) => e.children?.length));
	U(bi, (e) => {
		R(Si) && e(xi);
	});
	var Ci = I(bi, 2), wi = (e) => {
		var t = cb(), n = N(t), i = I(n);
		{
			let e = /* @__PURE__ */ A(() => R(r).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ A(u), n = /* @__PURE__ */ A(() => Y("tip.nav.subPillColorPick"));
			Na(i, {
				get value() {
					return R(e);
				},
				get tokens() {
					return R(t);
				},
				get label() {
					return R(n);
				},
				onchange: (e) => ne("subPillColor", e)
			});
		}
		O(t), L((e, r) => {
			J(t, "title", e), H(n, `${r ?? ""} `);
		}, [() => Y("tip.nav.subPillColor"), () => Y("lbl.subPillColor")]), V(e, t);
	};
	U(Ci, (e) => {
		R(r).nav.style?.subStyle === "pills" && e(wi);
	});
	var Ti = I(Ci, 2), Di = N(Ti), Oi = I(Di);
	G(Oi), O(Ti), O(mi), O(di);
	var ki = I(di, 2), Ai = N(ki), ji = F(Ai, !0), Mi = I(Ai, 2);
	{
		let e = (e, t = f) => {
			let n = /* @__PURE__ */ A(Ye);
			var r = lb();
			let i;
			var a = N(r);
			W(a, () => rt, !0), O(a);
			var o = I(a, 2), s = N(o), c = F(s, !0), l = F(I(s, 2), !0);
			O(o), O(r), L(() => {
				i = Ei(r, 1, "nav-item ghost", null, i, { child: t() }), H(c, R(n).label), H(l, R(n).target);
			}), V(e, r);
		};
		var Ni = N(Mi);
		ni(Ni, 21, () => R(r).nav.items, Qr, (t, n, i) => {
			let a = /* @__PURE__ */ A(() => `${i}`);
			var o = pb(), s = P(o), c = (t) => {
				e(t, () => !1);
			};
			U(s, (e) => {
				R(Ge)?.key === R(a) && R(Ge).pos === "before" && e(c);
			});
			var l = I(s, 2);
			let u;
			var d = N(l);
			W(d, () => rt, !0), O(d);
			var f = I(d, 2), p = N(f);
			G(p);
			var m = I(p, 2), h = N(m);
			{
				let e = /* @__PURE__ */ A(() => R(n).page ?? (R(n).href == null ? "__none" : "__href")), t = /* @__PURE__ */ A(() => Y("tip.linkTarget")), a = /* @__PURE__ */ A(() => [
					...R(r).pages.map((e) => [e.id, e.title]),
					["__href", Y("opt.linkHref")],
					...R(n).children ? [["__none", Y("opt.noLink")]] : []
				]);
				Ao(h, {
					compact: !0,
					get value() {
						return R(e);
					},
					get title() {
						return R(t);
					},
					get options() {
						return R(a);
					},
					onchange: (e) => ze(i, e)
				});
			}
			var g = I(h, 2), _ = (e) => {
				var t = ub();
				G(t), L((e, r) => {
					K(t, R(n).href), J(t, "placeholder", e), J(t, "title", r);
				}, [() => Y("ph.hrefAnchor"), () => Y("tip.hrefAnchor")]), z("change", t, (e) => Be(i, e.target.value)), V(e, t);
			};
			U(g, (e) => {
				!R(n).page && R(n).href != null && e(_);
			}), O(m), O(f);
			var v = I(f, 2), y = (e) => {
				var t = db();
				W(t, () => "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M6 9l6 6 6-6\"/></svg>", !0), O(t), L((e) => J(t, "title", e), [() => Y("tip.nav.hasSubmenu")]), V(e, t);
			};
			U(v, (e) => {
				R(n).children?.length && e(y);
			});
			var b = I(v, 2), x = N(b);
			W(x, () => X.plus, !0), O(x);
			var S = I(x, 2);
			S.disabled = i === 0, W(S, () => X.up, !0), O(S);
			var C = I(S, 2);
			W(C, () => X.cross, !0), O(C);
			var w = I(C, 2);
			W(w, () => X.down, !0), O(w), O(b);
			var T = I(b, 2);
			W(T, () => X.kebab, !0), O(T), O(l);
			var E = I(l, 2);
			ni(E, 17, () => R(n).children ?? [], Qr, (t, a, o) => {
				let s = /* @__PURE__ */ A(() => `${i}.${o}`);
				var c = fb(), l = P(c), u = (t) => {
					e(t, () => !0);
				};
				U(l, (e) => {
					R(Ge)?.key === R(s) && R(Ge).pos === "before" && e(u);
				});
				var d = I(l, 2);
				let f;
				var p = N(d);
				W(p, () => rt, !0), O(p);
				var m = I(p, 2), h = N(m);
				G(h);
				var g = I(h, 2), _ = N(g);
				{
					let e = /* @__PURE__ */ A(() => R(a).page ?? "__href"), t = /* @__PURE__ */ A(() => Y("tip.linkTarget")), n = /* @__PURE__ */ A(() => [...R(r).pages.map((e) => [e.id, e.title]), ["__href", Y("opt.linkHref")]]);
					Ao(_, {
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
						onchange: (e) => st(i, o, e)
					});
				}
				var v = I(_, 2), y = (e) => {
					var t = ub();
					G(t), L((e, n) => {
						K(t, R(a).href ?? ""), J(t, "placeholder", e), J(t, "title", n);
					}, [() => Y("ph.hrefAnchor"), () => Y("tip.hrefAnchor")]), z("change", t, (e) => ct(i, o, e.target.value)), V(e, t);
				};
				U(v, (e) => {
					R(a).page || e(y);
				}), O(g), O(m);
				var b = I(m, 2), x = N(b);
				x.disabled = o === 0, W(x, () => X.up, !0), O(x);
				var S = I(x, 2);
				W(S, () => X.cross, !0), O(S);
				var C = I(S, 2);
				W(C, () => X.down, !0), O(C), O(b);
				var w = I(b, 2);
				W(w, () => X.kebab, !0), O(w), O(d);
				var T = I(d, 2), E = (t) => {
					e(t, () => !0);
				};
				U(T, (e) => {
					R(Ge)?.key === R(s) && R(Ge).pos === "after" && e(E);
				}), L((e, t, r, i, c, l, u) => {
					f = Ei(d, 1, "nav-item child", null, f, {
						selected: R(Ue) === R(s),
						dragging: R(We) === R(s)
					}), J(d, "data-key", R(s)), J(p, "title", e), K(h, R(a).label), J(h, "title", t), J(x, "title", r), J(S, "title", i), J(C, "title", c), C.disabled = o === R(n).children.length - 1, J(w, "title", l), J(w, "aria-label", u);
				}, [
					() => Y("tip.nav.dragItem"),
					() => Y("tip.nav.childLabel"),
					() => Y("tip.moveUp"),
					() => Y("tip.nav.removeChild"),
					() => Y("tip.moveDown"),
					() => Y("tip.nav.itemActions"),
					() => Y("tip.nav.itemActions")
				]), z("click", d, (e) => {
					e.stopPropagation(), M(Ue, R(s));
				}), jr("dragstart", p, (e) => {
					e.stopPropagation(), M(We, R(s)), e.dataTransfer?.setData(Qe, R(s));
				}), jr("dragend", p, Xe), z("input", h, (e) => ot(i, o, e.target.value)), z("click", x, () => lt(i, o, -1)), z("click", S, () => ut(i, o)), z("click", C, () => lt(i, o, 1)), z("click", w, (e) => {
					e.stopPropagation(), M(Ue, R(s));
				}), V(t, c);
			});
			var ee = I(E, 2), te = (t) => {
				e(t, () => !0);
			};
			U(ee, (e) => {
				R(Ge)?.key === R(a) && R(Ge).pos === "into" && e(te);
			});
			var ne = I(ee, 2), re = (t) => {
				e(t, () => !1);
			};
			U(ne, (e) => {
				R(Ge)?.key === R(a) && R(Ge).pos === "after" && e(re);
			}), L((e, t, o, s, c, f, m, h) => {
				u = Ei(l, 1, "nav-item", null, u, {
					selected: R(Ue) === R(a),
					dragging: R(We) === R(a),
					"drop-target": R(Ge)?.key === R(a) && R(Ge).pos === "into"
				}), J(l, "data-key", R(a)), J(d, "title", e), K(p, R(n).label), J(p, "title", t), J(x, "title", o), J(S, "title", s), J(C, "title", c), J(w, "title", f), w.disabled = i === R(r).nav.items.length - 1, J(T, "title", m), J(T, "aria-label", h);
			}, [
				() => Y("tip.nav.dragItem"),
				() => Y("tip.nav.itemLabel"),
				() => Y("tip.nav.addChild"),
				() => Y("tip.moveUp"),
				() => Y("tip.nav.removeItem"),
				() => Y("tip.moveDown"),
				() => Y("tip.nav.itemActions"),
				() => Y("tip.nav.itemActions")
			]), z("click", l, () => {
				M(Ue, R(a));
			}), jr("dragstart", d, (e) => {
				M(We, R(a)), e.dataTransfer?.setData(Qe, R(a));
			}), jr("dragend", d, Xe), z("input", p, (e) => Re(i, e.target.value)), z("click", x, () => at(i)), z("click", S, () => Ve(i, -1)), z("click", C, () => He(i)), z("click", w, () => Ve(i, 1)), z("click", T, () => {
				M(Ue, R(a));
			}), V(t, o);
		}), O(Ni);
		var Pi = I(Ni, 2), Fi = F(Pi, !0), Li = I(Pi, 2), Ri = N(Li);
		G(Ri);
		var zi = I(Ri, 2), Bi = F(zi, !0);
		O(Li), O(Mi), L((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E, ee, te, ne, re, ie, ae, oe, se, ce, le, ue, de, fe, pe, me, he, ge, _e, ve, ye, be, xe, Se, Ce, we, Te, Ee, D, O, De, Oe) => {
			H(Fi, Ee), J(Li, "title", D), J(Ri, "placeholder", O), zi.disabled = De, H(Bi, Oe);
		}, [
			() => Y("hint.nav.logoHome"),
			() => Y("group.logo"),
			() => Y("group.appearance"),
			() => Y("group.navLayout"),
			() => Y("tip.nav.variant"),
			() => Y("lbl.navVariant"),
			() => Y("lbl.navVariant"),
			() => Y("tip.nav.sizePreset"),
			() => Y("lbl.size"),
			() => Y("tip.nav.sizePreset"),
			() => Y("lbl.adjust"),
			() => Y("tip.nav.menuTextSize"),
			() => Y("lbl.navTextSize"),
			() => Y("group.navFrame"),
			() => Y("group.navBehaviour"),
			() => Y("tip.nav.mobileSame"),
			() => Y("group.mobile"),
			() => Y("tip.nav.menuTextSize"),
			() => Y("lbl.navTextSize"),
			() => Y("lbl.navSameAsDesktop"),
			() => Y("tip.nav.mobileSize"),
			() => Y("lbl.size"),
			() => Y("tip.nav.mobileLayout"),
			() => Y("lbl.navPlacement"),
			() => Y("tip.nav.mobileTools"),
			() => Y("lbl.toolsSide"),
			() => Y("tip.nav.mobileBorder"),
			() => Y("lbl.navBorder"),
			() => Y("tip.nav.mobileMenu"),
			() => Y("lbl.mobileMenu"),
			() => Y("group.navColours"),
			() => Y("lbl.navHover"),
			() => Y("lbl.navHover"),
			() => Y("tip.nav.hoverTextColor"),
			() => Y("lbl.hoverTextColor"),
			() => Y("tip.nav.textColorPick"),
			() => Y("lbl.textColor"),
			() => Y("tip.nav.blur"),
			() => Y("lbl.navBlur"),
			() => Y("lbl.background"),
			() => Y("tip.nav.announce"),
			() => Y("group.announcement"),
			() => Y("tip.nav.announce"),
			() => Y("lbl.announceShow"),
			() => Y("tip.nav.tools"),
			() => Y("group.tools"),
			() => Y("group.submenu"),
			() => Y("lbl.design"),
			() => Y("lbl.design"),
			() => Y("tip.nav.subColumns"),
			() => Y("lbl.columns"),
			() => Y("hint.nav.submenu"),
			() => Y("group.menuItems"),
			() => Y("ui.addMenuItem"),
			() => Y("tip.nav.newPageAsItem"),
			() => Y("ph.nav.newPageTitle"),
			() => !R(y).trim(),
			() => Y("ui.newPageAsItem")
		]), jr("dragover", Ni, tt), jr("drop", Ni, (e) => {
			e.preventDefault(), nt(R(Ge)?.key ?? "");
		}), z("click", Pi, it), z("keydown", Ri, (e) => {
			e.key === "Enter" && b();
		}), Ii(Ri, () => R(y), (e) => M(y, e)), z("click", zi, b);
	}
	O(ki), O(dt), L((e, t, n, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E, ee, te, ne, ie, ae, oe, ce, le, ue, de, fe, pe, me, he, ge, _e, ve, ye, be, xe, Se, Ce, we, Te, Ee, D, O, De, Oe, ke, k, Ae) => {
		J(pt, "title", e), H(mt, t), H(Tt, n), H(kt, i), J(jt, "title", a), H(Nt, o), J(Pt, "aria-label", s), J(qt, "title", c), H(Jt, l), J(Xt, "title", u), H($t, d), J(rn, "title", f), H(on, p), J(sn, "min", oy.min), J(sn, "max", oy.max), J(sn, "step", oy.step), K(sn, R(se)), J(cn, "min", oy.min), J(cn, "max", oy.max), K(cn, R(se)), H(pn, m), H(xn, h), J(En, "title", g), H(On, _), J(Nn, "title", v), H(Fn, y), J(In, "min", oy.min), J(In, "max", oy.max), J(In, "placeholder", b), K(In, R(r).nav.style?.mobile?.textSize ?? ""), J(Rn, "title", x), H(Bn, S), J(Hn, "title", C), H(Wn, w), J(qn, "title", T), H(Yn, E), J(er, "title", ee), H(nr, te), J(sr, "title", ne), H(lr, ie), H(br, ae), H(wr, oe), J(Tr, "aria-label", ce), J(Mr, "title", le), H(Pr, ue), J(Fr, "title", de), H(Lr, fe), J(Rr, "title", pe), q(zr, R(r).nav.style?.blur !== !1), H(B, ` ${me ?? ""}`), H(Wr, he), J(Jr, "title", ge), H(Yr, _e), J(Zr, "title", ve), q($r, R(r).nav.announcement?.show === !0), H(ei, ` ${ye ?? ""}`), J(ai, "title", be), H(oi, xe), H(pi, Se), H(_i, Ce), yi = Ei(vi, 1, "tile-grid", null, yi, {
			"cols-5": !R(re),
			"cols-3": R(re)
		}), J(vi, "aria-label", we), J(Ti, "title", Te), H(Di, `${Ee ?? ""} `), K(Oi, R(r).nav.style?.subColumns ?? 1), J(Ai, "title", D), H(ji, O);
	}, [
		() => Y("hint.nav.logoHome"),
		() => Y("group.logo"),
		() => Y("group.appearance"),
		() => Y("group.navLayout"),
		() => Y("tip.nav.variant"),
		() => Y("lbl.navVariant"),
		() => Y("lbl.navVariant"),
		() => Y("tip.nav.sizePreset"),
		() => Y("lbl.size"),
		() => Y("tip.nav.sizePreset"),
		() => Y("lbl.adjust"),
		() => Y("tip.nav.menuTextSize"),
		() => Y("lbl.navTextSize"),
		() => Y("group.navFrame"),
		() => Y("group.navBehaviour"),
		() => Y("tip.nav.mobileSame"),
		() => Y("group.mobile"),
		() => Y("tip.nav.menuTextSize"),
		() => Y("lbl.navTextSize"),
		() => Y("lbl.navSameAsDesktop"),
		() => Y("tip.nav.mobileSize"),
		() => Y("lbl.size"),
		() => Y("tip.nav.mobileLayout"),
		() => Y("lbl.navPlacement"),
		() => Y("tip.nav.mobileTools"),
		() => Y("lbl.toolsSide"),
		() => Y("tip.nav.mobileBorder"),
		() => Y("lbl.navBorder"),
		() => Y("tip.nav.mobileMenu"),
		() => Y("lbl.mobileMenu"),
		() => Y("group.navColours"),
		() => Y("lbl.navHover"),
		() => Y("lbl.navHover"),
		() => Y("tip.nav.hoverTextColor"),
		() => Y("lbl.hoverTextColor"),
		() => Y("tip.nav.textColorPick"),
		() => Y("lbl.textColor"),
		() => Y("tip.nav.blur"),
		() => Y("lbl.navBlur"),
		() => Y("lbl.background"),
		() => Y("tip.nav.announce"),
		() => Y("group.announcement"),
		() => Y("tip.nav.announce"),
		() => Y("lbl.announceShow"),
		() => Y("tip.nav.tools"),
		() => Y("group.tools"),
		() => Y("group.submenu"),
		() => Y("lbl.design"),
		() => Y("lbl.design"),
		() => Y("tip.nav.subColumns"),
		() => Y("lbl.columns"),
		() => Y("hint.nav.submenu"),
		() => Y("group.menuItems"),
		() => Y("ui.addMenuItem"),
		() => Y("tip.nav.newPageAsItem"),
		() => Y("ph.nav.newPageTitle"),
		() => !R(y).trim(),
		() => Y("ui.newPageAsItem")
	]), z("input", sn, (e) => ne("textSize", e.target.valueAsNumber)), z("change", cn, (e) => Ee(e, "textSize", oy)), z("change", In, (e) => D(e, "textSize", oy)), z("change", zr, (e) => ne("blur", e.target.checked)), z("change", $r, (e) => me("show", e.target.checked ? !0 : void 0)), z("change", Oi, (e) => ne("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), V(e, dt), et();
}
Mr([
	"input",
	"change",
	"click",
	"keydown"
]);
var gb = 1920, _b = [
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
], vb = [
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
], yb = [
	1920,
	1536,
	1366
];
function bb(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 1440;
	let n = Math.round(t / 20) * 20;
	return Math.min(gb, Math.max(960, n));
}
function xb(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 6;
	let n = Math.round(t / 1) * 1;
	return Math.min(12, Math.max(0, n));
}
function Sb(e, t) {
	if (e === "full") return 0;
	let n = Math.min(49, Math.max(0, Number(t) || 0));
	return Math.ceil(Number(e) / (1 - 2 * n / 100));
}
function Cb(e, t, n) {
	let r = Math.max(0, Number(t) || 0) / 100 * n, i = Math.max(0, n - 2 * r), a = e !== "full" && Number(e) < i, o = a ? Number(e) : i;
	return {
		width: o,
		margin: Math.round((n - o) / 2),
		pct: n > 0 ? o / n * 100 : 0,
		bound: a
	};
}
function wb(e) {
	return vb.find((t) => t.width === e)?.id ?? null;
}
//#endregion
//#region ../template/assets/engine/0.7.4/calendar-format.js
function Tb(e) {
	if (typeof e != "string" || !e.trim()) return !1;
	try {
		return new Intl.DateTimeFormat("en", { timeZone: e.trim() }), !0;
	} catch {
		return !1;
	}
}
//#endregion
//#region ../template/assets/engine/0.7.4/map-links.js
var Eb = {
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
}, Db = Object.keys(Eb);
function Ob(e) {
	let t = e?.site?.mapService;
	return Object.hasOwn(Eb, t) ? t : "osm";
}
//#endregion
//#region ../template/assets/engine/0.7.4/meeting-links.js
var kb = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/;
function Ab(e) {
	let t = Array.isArray(e) ? e : String(e ?? "").split(/[\s,;]+/), n = [];
	for (let e of t) {
		let t = String(e ?? "").trim().toLowerCase();
		if (!t) continue;
		let r = "";
		try {
			r = new URL(/^[a-z][a-z0-9+.-]*:\/\//.test(t) ? t : `https://${t}`).hostname;
		} catch {}
		kb.test(r) && !n.includes(r) && n.push(r);
	}
	return n;
}
//#endregion
//#region src/panels/SitePanel.svelte
var jb = /* @__PURE__ */ B("<p class=\"panel-hint place-error\"> </p>"), Mb = /* @__PURE__ */ B("<span class=\"site-cal-color\"><!> <span> </span></span>"), Nb = /* @__PURE__ */ B("<div><button type=\"button\" class=\"site-cal-head\"><span class=\"site-cal-dot\" aria-hidden=\"true\"></span> <span class=\"site-cal-text\"><span class=\"site-cal-name\"> </span> <span class=\"site-cal-addr\"> </span></span> <span class=\"site-cal-chev\" aria-hidden=\"true\"></span></button> <div class=\"site-cal-body\"><div class=\"site-cal-clip\"><div class=\"site-cal-fields\"><span class=\"mini-label site-cal-section\"> </span> <label class=\"site-cal-field\"> <input/></label> <label class=\"site-cal-field\"> <input spellcheck=\"false\"/></label> <label class=\"site-cal-field\"> <input/></label> <span class=\"mini-label site-cal-section\"> </span> <div class=\"site-cal-colors\"><span class=\"site-cal-color\"><!> <span> </span></span> <!></div> <span class=\"mini-label site-cal-section\"> </span> <label class=\"site-cal-field\"> <input placeholder=\"https://\" spellcheck=\"false\"/></label> <label class=\"site-cal-field\"> <input/></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <div class=\"site-cal-foot\"><span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span> <button type=\"button\" class=\"site-cal-remove\"> </button></div></div></div></div></div>"), Pb = /* @__PURE__ */ B("<div class=\"site-cal-list\"></div>"), Fb = /* @__PURE__ */ B("<div class=\"cw-row\"><span class=\"mini-label cw-screen\"> </span> <span><span class=\"cw-fill\"></span></span> <span class=\"gridmenu-value cw-margin\"> </span></div>"), Ib = /* @__PURE__ */ B("<div class=\"mini-label cw-binds\"> </div>"), Lb = /* @__PURE__ */ B("<button> </button>"), Rb = /* @__PURE__ */ B("<div class=\"ctl-row\"><span class=\"mini-label\"> </span> <input type=\"range\"/> <span class=\"gridmenu-value\"> </span></div>"), zb = /* @__PURE__ */ B("<img class=\"site-icon-preview\"/>"), Bb = /* @__PURE__ */ B("<button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button>", 1), Vb = /* @__PURE__ */ B("<div class=\"panel-body\"><label> <input/></label> <label> <input/></label> <label> <!></label> <label> <input placeholder=\"Europe/Oslo\" spellcheck=\"false\"/></label> <!> <label> <!></label> <label> <input placeholder=\"meet.example.org\" spellcheck=\"false\"/></label> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><button type=\"button\" class=\"site-cal-add\"><!> </button> <!></div></details> <hr class=\"gridmenu-divider\"/> <p class=\"panel-strong\"> </p> <div class=\"sample cw-sample\"><!> <div class=\"cw-legend\"><span class=\"mini-label\"> </span> <span class=\"mini-label\"> </span></div> <!></div> <div class=\"seg cw-seg\"></div> <!> <p class=\"mini-label\"> </p> <div class=\"seg cw-seg\"></div> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><div class=\"ctl-row\"><span class=\"mini-label\"> </span> <input type=\"range\"/> <span class=\"gridmenu-value\"> </span></div></div></details> <hr class=\"gridmenu-divider\"/> <label> <!></label> <span class=\"toolbar-row\"><label class=\"ghost filepick tb-grow\"> <input type=\"file\" accept=\"image/*\"/></label> <!></span></div>");
function Hb(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.bindsFrom), i = /* @__PURE__ */ A(() => n.layoutGutter), a = /* @__PURE__ */ A(() => n.layoutWidth), o = /* @__PURE__ */ A(() => n.siteDraft), { addSiteCalendar: s, setStatus: c, siteCalendars: l, siteLangOptions: u, siteLangValue: d, siteMutate: f, svgAutoTrim: p, themeSwatches: m } = n;
	async function g(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		if (t.type === "image/svg+xml" || /\.svg$/i.test(t.name || "")) {
			try {
				let e = await p(t);
				n.iconEditorImage = e.dataUrl;
			} catch {
				c(Y("status.imageReadErrorSvg"), "error");
			}
			return;
		}
		let r = new FileReader();
		r.onload = () => {
			n.iconEditorImage = String(r.result);
		}, r.onerror = () => c(Y("status.imageReadError"), "error"), r.readAsDataURL(t);
	}
	function _() {
		f("edit:site-icon", () => {
			delete R(o).site.icon;
		});
	}
	function v(e) {
		f("edit:site-title", () => {
			R(o).site.title = e;
		});
	}
	function y(e) {
		f("edit:site-desc", () => {
			R(o).site.description = e;
		});
	}
	let b = /* @__PURE__ */ A(() => wb(R(a))), x = /* @__PURE__ */ A(() => _b.find((e) => e.gutter === R(i))?.id ?? null), S = /* @__PURE__ */ j(!1), C = /* @__PURE__ */ A(() => R(a) === "full" ? gb : bb(R(a))), w = /* @__PURE__ */ A(() => yb.map((e) => ({
		screen: e,
		...Cb(R(a), R(i), e)
	})));
	function T(e, t) {
		f(t, () => {
			let t = {
				...R(o).layout ?? {},
				contentWidth: R(a),
				gutter: R(i),
				...e
			};
			for (let e of Object.keys(t)) t[e] === void 0 && delete t[e];
			R(o).layout = t;
		});
	}
	let E = (e) => T({ contentWidth: e === "full" ? "full" : bb(e) }, "edit:site-width"), ee = (e) => T({ gutter: xb(e) }, "edit:site-gutter");
	function te(e) {
		f("site", () => {
			R(o).site.lang = e;
		});
	}
	function ne(e) {
		let t = Ab(e);
		f("site", () => {
			t.length ? R(o).site.meetingHosts = t : delete R(o).site.meetingHosts;
		});
	}
	function re(e) {
		f("site", () => {
			R(o).site.calendars[e]?.id === n.openSiteCalendar && (n.openSiteCalendar = null), R(o).site.calendars.splice(e, 1), R(o).site.calendars.length || delete R(o).site.calendars;
		});
	}
	function ie(e, t) {
		f("site", () => {
			let n = R(o).site.calendars, r = e + t;
			r < 0 || r >= n.length || ([n[e], n[r]] = [n[r], n[e]]);
		});
	}
	function ae(e, t, n, r = !1) {
		let i = String(n ?? "").trim();
		f(`edit:site-cal-${e}-${t}`, () => {
			let n = R(o).site.calendars[e];
			i || r ? n[t] = i : delete n[t];
		});
	}
	function oe(e, t, n) {
		f("site", () => {
			let r = R(o).site.calendars[e];
			n ? delete r[t] : r[t] = !1;
		});
	}
	function se(e) {
		f("site", () => {
			e && e !== "osm" ? R(o).site.mapService = e : delete R(o).site.mapService;
		});
	}
	function ce(e) {
		let t = e.trim();
		n.siteZoneBad = t !== "" && !Tb(t), !n.siteZoneBad && f("site", () => {
			t ? R(o).site.timeZone = t : delete R(o).site.timeZone;
		});
	}
	var le = Vb(), ue = N(le), de = N(ue), fe = I(de);
	G(fe), O(ue);
	var pe = I(ue, 2), me = N(pe), he = I(me);
	G(he), O(pe);
	var ge = I(pe, 2), _e = N(ge), ve = I(_e);
	{
		let e = /* @__PURE__ */ A(d), t = /* @__PURE__ */ A(u);
		Ao(ve, {
			get value() {
				return R(e);
			},
			get options() {
				return R(t);
			},
			onchange: (e) => te(e)
		});
	}
	O(ge);
	var ye = I(ge, 2), be = N(ye), xe = I(be);
	G(xe);
	let Se;
	O(ye);
	var Ce = I(ye, 2), we = (e) => {
		var t = jb(), n = F(t, !0);
		L((e) => H(n, e), [() => Y("settings.timeZoneBad")]), V(e, t);
	};
	U(Ce, (e) => {
		n.siteZoneBad && e(we);
	});
	var Te = I(Ce, 2), Ee = N(Te), D = I(Ee);
	{
		let e = /* @__PURE__ */ A(() => Ob(R(o))), t = /* @__PURE__ */ A(() => Db.map((e) => [
			e,
			Y(`mapService.${e}`),
			Y(`mapService.${e}.note`)
		]));
		Ao(D, {
			get value() {
				return R(e);
			},
			get options() {
				return R(t);
			},
			onchange: (e) => se(e)
		});
	}
	O(Te);
	var De = I(Te, 2), Oe = N(De), ke = I(Oe);
	G(ke), O(De);
	var k = I(De, 2), Ae = N(k), je = F(Ae, !0), Me = I(Ae, 2), Ne = N(Me), Pe = N(Ne);
	W(Pe, () => X.plus);
	var Fe = I(Pe);
	O(Ne);
	var Ie = I(Ne, 2), Le = (e) => {
		var t = Pb();
		ni(t, 23, l, (e) => e.id, (e, t, r) => {
			let i = /* @__PURE__ */ A(() => n.openSiteCalendar === R(t).id);
			var a = Nb();
			let o;
			var s = N(a), c = N(s);
			let u;
			var d = I(c, 2), f = N(d), p = F(f, !0), g = F(I(f, 2), !0);
			O(d);
			var _ = I(d, 2);
			W(_, () => X.down, !0), O(_), O(s);
			var v = I(s, 2), y = N(v), b = N(y), x = N(b), S = F(x, !0), C = I(x, 2), w = N(C), T = I(w);
			G(T), O(C);
			var E = I(C, 2), ee = N(E), te = I(ee);
			G(te), O(E);
			var ne = I(E, 2), se = N(ne), ce = I(se);
			G(ce), O(ne);
			var le = I(ne, 2), ue = F(le, !0), de = I(le, 2), fe = N(de), pe = N(fe);
			{
				let e = /* @__PURE__ */ A(() => R(t).color || "accent"), n = /* @__PURE__ */ A(m), i = /* @__PURE__ */ A(() => Y("siteCal.colorMain"));
				Na(pe, {
					get value() {
						return R(e);
					},
					get tokens() {
						return R(n);
					},
					get label() {
						return R(i);
					},
					onchange: (e) => ae(R(r), "color", e ?? "")
				});
			}
			var me = F(I(pe, 2), !0);
			O(fe), ni(I(fe, 2), 16, () => [
				["colorText", "siteCal.colorText"],
				["colorBox", "siteCal.colorBox"],
				["colorChip", "siteCal.colorChip"]
			], ([e, t]) => e, (e, n) => {
				var i = /* @__PURE__ */ A(() => h(n, 2));
				let a = () => R(i)[0], o = () => R(i)[1];
				var s = Mb(), c = N(s);
				{
					let e = /* @__PURE__ */ A(() => R(t)[a()] || ""), n = /* @__PURE__ */ A(m), i = /* @__PURE__ */ A(() => Y(o()));
					Na(c, {
						get value() {
							return R(e);
						},
						get tokens() {
							return R(n);
						},
						allowClear: !0,
						get label() {
							return R(i);
						},
						onchange: (e) => ae(R(r), a(), e ?? "")
					});
				}
				var l = F(I(c, 2), !0);
				O(s), L((e, t) => {
					J(s, "title", e), H(l, t);
				}, [() => Y(`tip.${o()}`), () => Y(o())]), V(e, s);
			}), O(de);
			var he = I(de, 2), ge = F(he, !0), _e = I(he, 2), ve = N(_e), ye = I(ve);
			G(ye), O(_e);
			var be = I(_e, 2), xe = N(be), Se = I(xe);
			G(Se), O(be);
			var Ce = I(be, 2), we = N(Ce);
			G(we);
			var Te = I(we);
			O(Ce);
			var Ee = I(Ce, 2), D = N(Ee);
			G(D);
			var De = I(D);
			O(Ee);
			var Oe = I(Ee, 2), ke = N(Oe), k = N(ke);
			W(k, () => X.up, !0), O(k);
			var Ae = I(k, 2);
			W(Ae, () => X.down, !0), O(Ae), O(ke);
			var je = I(ke, 2), Me = F(je, !0);
			O(Oe), O(b), O(y), O(v), O(a), L((e, n, l, d, f, m, h, _, y, b, x, C, E, re, ie, ae, oe, le, de, pe, he, O, Oe, ke, Ne, Pe) => {
				o = Ei(a, 1, "site-cal-row", null, o, { open: R(i) }), J(s, "aria-expanded", R(i)), u = Oi(c, "", u, { background: e }), H(p, n), H(g, l), v.inert = !R(i), H(S, d), H(w, `${f ?? ""} `), K(T, R(t).name ?? ""), J(T, "placeholder", m), J(T, "title", h), J(T, "data-cal-name", R(t).id), H(ee, `${_ ?? ""} `), K(te, R(t).url), J(te, "placeholder", y), J(ne, "title", b), H(se, `${x ?? ""} `), K(ce, R(t).description ?? ""), H(ue, C), J(fe, "title", E), H(me, re), H(ge, ie), J(_e, "title", ae), H(ve, `${oe ?? ""} `), K(ye, R(t).link ?? ""), J(be, "title", le), H(xe, `${de ?? ""} `), K(Se, R(t).organizer ?? ""), J(Ce, "title", pe), q(we, R(t).subscribable !== !1), H(Te, ` ${he ?? ""}`), J(Ee, "title", O), q(D, R(t).inFilter !== !1), H(De, ` ${Oe ?? ""}`), k.disabled = R(r) === 0, Ae.disabled = ke, J(je, "title", Ne), H(Me, Pe);
			}, [
				() => Ud(R(t).color),
				() => R(t).name || R(t).url || Y("ui.addSiteCalendar"),
				() => R(t).url || Y("calendar.sourceUrl"),
				() => Y("group.siteCalBasics"),
				() => Y("lbl.name"),
				() => Y("calendar.sourceName"),
				() => Y("tip.calendar.sourceName"),
				() => Y("calendar.sourceUrl"),
				() => Y("calendar.sourcesPh"),
				() => Y("tip.siteCal.description"),
				() => Y("siteCal.description"),
				() => Y("group.siteCalColors"),
				() => Y("tip.calendar.sourceColor"),
				() => Y("siteCal.colorMain"),
				() => Y("group.siteCalVisitors"),
				() => Y("tip.siteCal.link"),
				() => Y("siteCal.link"),
				() => Y("tip.siteCal.organizer"),
				() => Y("siteCal.organizer"),
				() => Y("tip.siteCal.subscribable"),
				() => Y("siteCal.subscribable"),
				() => Y("tip.siteCal.inFilter"),
				() => Y("siteCal.inFilter"),
				() => R(r) === l().length - 1,
				() => Y("tip.site.removeCalendar"),
				() => Y("siteCal.remove")
			]), z("click", s, () => n.openSiteCalendar = R(i) ? null : R(t).id), z("change", T, (e) => ae(R(r), "name", e.target.value)), z("change", te, (e) => ae(R(r), "url", e.target.value, !0)), z("change", ce, (e) => ae(R(r), "description", e.target.value)), z("change", ye, (e) => ae(R(r), "link", e.target.value)), z("change", Se, (e) => ae(R(r), "organizer", e.target.value)), z("change", we, (e) => oe(R(r), "subscribable", e.target.checked)), z("change", D, (e) => oe(R(r), "inFilter", e.target.checked)), z("click", k, () => ie(R(r), -1)), z("click", Ae, () => ie(R(r), 1)), z("click", je, () => re(R(r))), V(e, a);
		}), O(t), V(e, t);
	}, Re = /* @__PURE__ */ A(() => l().length);
	U(Ie, (e) => {
		R(Re) && e(Le);
	}), O(Me), O(k);
	var ze = I(k, 4), Be = F(ze, !0), Ve = I(ze, 2), He = N(Ve);
	ni(He, 17, () => R(w), (e) => e.screen, (e, t) => {
		var n = Fb(), r = N(n), i = F(r, !0), a = I(r, 2);
		let o;
		var s = F(a), c = F(I(a, 2), !0);
		O(n), L(() => {
			H(i, R(t).screen), o = Ei(a, 1, "cw-bar", null, o, { fluid: !R(t).bound }), Oi(s, `width:${R(t).pct ?? ""}%`), H(c, R(t).bound ? `${R(t).margin}` : "-");
		}), V(e, n);
	});
	var Ue = I(He, 2), We = N(Ue), Ge = F(We, !0), Ke = F(I(We, 2), !0);
	O(Ue);
	var qe = I(Ue, 2), Je = (e) => {
		var t = Ib(), n = F(t, !0);
		L((e) => H(n, e), [() => Y("lbl.bindsFrom", { n: R(r) })]), V(e, t);
	};
	U(qe, (e) => {
		R(a) !== "full" && e(Je);
	}), O(Ve);
	var Ye = I(Ve, 2);
	ni(Ye, 21, () => vb, (e) => e.id, (e, t) => {
		var n = Lb();
		let r;
		var i = F(n, !0);
		L((e) => {
			r = Ei(n, 1, "", null, r, { on: R(b) === R(t).id }), H(i, e);
		}, [() => Y(`lbl.width.${R(t).id}`)]), z("click", n, () => E(R(t).width)), V(e, n);
	}), O(Ye);
	var Xe = I(Ye, 2), Qe = (e) => {
		var t = Rb(), n = N(t), r = F(n, !0), i = I(n, 2);
		G(i);
		var a = F(I(i, 2));
		O(t), L((e, n) => {
			J(t, "title", e), H(r, n), J(i, "min", 960), J(i, "max", gb), J(i, "step", 20), K(i, R(C)), H(a, `${R(C) ?? ""} px`);
		}, [() => Y("tip.site.contentWidthFree"), () => Y("lbl.widthFree")]), z("input", i, (e) => E(e.target.valueAsNumber)), V(e, t);
	};
	U(Xe, (e) => {
		R(a) !== "full" && e(Qe);
	});
	var tt = I(Xe, 2), nt = F(tt, !0), rt = I(tt, 2);
	ni(rt, 21, () => _b, (e) => e.id, (e, t) => {
		var n = Lb();
		let r;
		var i = F(n, !0);
		L((e) => {
			r = Ei(n, 1, "", null, r, { on: R(x) === R(t).id }), H(i, e);
		}, [() => Y(`lbl.gutter.${R(t).id}`)]), z("click", n, () => ee(R(t).gutter)), V(e, n);
	}), O(rt);
	var it = I(rt, 2), at = N(it), ot = F(at, !0), st = I(at, 2), ct = N(st), lt = N(ct), ut = F(lt, !0), dt = I(lt, 2);
	G(dt);
	var ft = F(I(dt, 2));
	O(ct), O(st), O(it);
	var pt = I(it, 4), mt = N(pt), ht = I(mt), gt = (e) => {
		var t = zb();
		L((e) => {
			J(t, "src", R(o).site.icon), J(t, "alt", e);
		}, [() => Y("lbl.siteIcon")]), V(e, t);
	};
	U(ht, (e) => {
		R(o).site.icon && e(gt);
	}), O(pt);
	var _t = I(pt, 2), vt = N(_t), yt = N(vt), bt = I(yt);
	O(vt);
	var xt = I(vt, 2), St = (e) => {
		var t = Bb(), r = P(t);
		W(r, () => X.pencil ?? "✎", !0), O(r);
		var i = I(r, 2);
		W(i, () => X.cross, !0), O(i), L((e, t) => {
			J(r, "title", e), J(i, "title", t);
		}, [() => Y("tip.site.editIcon"), () => Y("tip.site.removeIcon")]), z("click", r, () => n.iconEditorImage = R(o).site.icon), z("click", i, _), V(e, t);
	};
	U(xt, (e) => {
		R(o).site.icon && e(St);
	}), O(_t), O(le), L((e, t, r, a, s, c, l, u, d, f, p, m, h, g, _, v, y, b, C, w, T, E, ee, te, ne, re, ie, ae, oe, se) => {
		J(ue, "title", e), H(de, `${t ?? ""} `), K(fe, R(o).site.title ?? ""), J(fe, "placeholder", r), J(pe, "title", a), H(me, `${s ?? ""} `), K(he, R(o).site.description ?? ""), J(he, "placeholder", c), J(ge, "title", l), H(_e, `${u ?? ""} `), J(ye, "title", d), H(be, `${f ?? ""} `), K(xe, R(o).site.timeZone ?? ""), Se = Ei(xe, 1, "", null, Se, { "place-error": n.siteZoneBad }), J(Te, "title", p), H(Ee, `${m ?? ""} `), J(De, "title", h), H(Oe, `${g ?? ""} `), K(ke, _), J(Ae, "title", v), H(je, y), H(Fe, ` ${b ?? ""}`), J(ze, "title", C), H(Be, w), H(Ge, T), H(Ke, E), J(tt, "title", ee), H(nt, te), it.open = R(x) === null || R(S), H(ot, ne), J(ct, "title", re), H(ut, ie), J(dt, "min", 0), J(dt, "max", 12), J(dt, "step", 1), K(dt, R(i)), H(ft, `${R(i) ?? ""} vw`), H(mt, `${ae ?? ""} `), J(vt, "title", oe), H(yt, `${se ?? ""} `);
	}, [
		() => Y("tip.site.name"),
		() => Y("lbl.name"),
		() => Y("ph.site.name"),
		() => Y("tip.site.description"),
		() => Y("lbl.description"),
		() => Y("ph.site.description"),
		() => Y("site.langTitle"),
		() => Y("site.langLabel"),
		() => Y("tip.settings.timeZone"),
		() => Y("settings.timeZone"),
		() => Y("tip.settings.mapService"),
		() => Y("settings.mapService"),
		() => Y("tip.settings.meetingHosts"),
		() => Y("settings.meetingHosts"),
		() => (R(o).site.meetingHosts ?? []).join(", "),
		() => Y("tip.site.calendars"),
		() => Y("group.siteCalendars"),
		() => Y("ui.addSiteCalendar"),
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
		() => R(o).site.icon ? Y("ui.changeIcon") : Y("ui.chooseIcon")
	]), z("input", fe, (e) => v(e.target.value)), z("input", he, (e) => y(e.target.value)), z("change", xe, (e) => ce(e.target.value)), z("change", ke, (e) => ne(e.target.value)), z("click", Ne, () => s()), Ui("open", "toggle", k, (e) => n.siteCalendarsOpen = e, () => n.siteCalendarsOpen), jr("toggle", it, (e) => M(S, e.currentTarget.open, !0)), z("input", dt, (e) => ee(e.target.valueAsNumber)), z("change", bt, g), V(e, le), et();
}
Mr([
	"input",
	"change",
	"click"
]);
//#endregion
//#region src/panels/ThemePanel.svelte
var Ub = /* @__PURE__ */ B("<div class=\"mini-label tpv-cap\"> </div>"), Wb = /* @__PURE__ */ B("<div class=\"theme-pvw\"><!> <div class=\"tpv-demo\"><div class=\"tpv-h\"> </div> <div class=\"tpv-card\"> </div> <div class=\"tpv-row\"><span class=\"tpv-btn\"> </span><span class=\"tpv-lnk\"> </span></div></div></div>"), Gb = /* @__PURE__ */ B("<button type=\"button\"><span class=\"tp-band\"><i></i><i></i><i></i><i></i></span> <small> </small></button>"), Kb = /* @__PURE__ */ B("<div class=\"ctl-row autorow\"><span class=\"autolbl\"> </span> <span class=\"seg\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div>"), qb = /* @__PURE__ */ B("<span class=\"mini-label\"> </span>"), Jb = /* @__PURE__ */ B("<div class=\"palcol\"><!> <span class=\"palcap\"> </span> <b class=\"palhex\"> </b></div>"), Yb = /* @__PURE__ */ B("<div class=\"ctl-row palhead\"><span class=\"mini-label\"> </span> <button type=\"button\"> </button></div> <div></div>", 1), Xb = /* @__PURE__ */ B("<div class=\"panel-body\"><p class=\"panel-strong\"> </p> <div class=\"theme-presets\"></div> <p class=\"panel-strong\"> </p> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <div class=\"ctl-row palhead\"><!> <button type=\"button\"> </button></div> <div class=\"palcells\"></div> <!> <div class=\"ctl-row palauto-row\"><span class=\"mini-label ctl-name\"> </span> <button type=\"button\"> </button></div> <div class=\"theme-previews\"><!> <!></div> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><label> <!></label> <label> <!></label> <div class=\"sample typo-sample\"><div class=\"ts-h\"> </div> <div class=\"ts-b\"> </div></div></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><div class=\"sample form-prev\"><span class=\"fp-btn\"> </span> <span class=\"fp-card\"> </span></div> <label class=\"ctl-row\"> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"24\" step=\"1\"/> <label class=\"ctl-row\"> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"40\" step=\"1\"/></div></details></div>");
function Zb(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.activeThemePreset), i = /* @__PURE__ */ A(() => n.siteDraft), { THEME_PRESETS: a, applyThemePreset: o, readableOn: s, siteMutate: c, suggestAltColors: l, themeHex: u, themeSwatches: d } = n, p = [
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
	], m = /* @__PURE__ */ A(() => !!R(i)?.theme.alt), g = /* @__PURE__ */ A(() => R(i)?.theme.alt?.auto === !0), _ = /* @__PURE__ */ A(() => R(i)?.theme.scheme === "dark" ? "dark" : "light"), v = /* @__PURE__ */ A(() => R(i)?.theme.tokens.color ?? {}), y = /* @__PURE__ */ A(() => ({
		...R(i)?.theme.tokens.color ?? {},
		...R(i)?.theme.alt?.tokens?.color ?? {}
	}));
	function b(e, t) {
		c(`edit:theme-color-${e}`, () => {
			R(i).theme.tokens.color[e] = t, R(i).theme.alt?.auto && (R(i).theme.alt.tokens.color = l());
		});
	}
	function x(e, t) {
		return e === "accent-text" ? s(u(t.accent ?? "#000000", t)) : t.bg;
	}
	let S = /* @__PURE__ */ A(() => !R(i)?.theme?.tokens?.color?.["accent-text"] && !R(i)?.theme?.alt?.tokens?.color?.["accent-text"]);
	function C(e) {
		c("edit:theme-color-accent-text", () => {
			e ? (delete R(i).theme.tokens.color["accent-text"], R(i).theme.alt?.tokens?.color && delete R(i).theme.alt.tokens.color["accent-text"]) : (R(i).theme.tokens.color["accent-text"] = x("accent-text", R(v)), R(i).theme.alt?.auto && (R(i).theme.alt.tokens.color = l()));
		});
	}
	function w(e, t) {
		c("theme", () => {
			R(i).theme.tokens.font[e] = t;
		});
	}
	function T(e, t) {
		c("theme", () => {
			R(i).theme.tokens.radius[e] = t;
		});
	}
	function E(e, t) {
		c(`edit:theme-alt-${e}`, () => {
			R(i).theme.alt.tokens.color[e] = t, R(i).theme.alt.auto = !1;
		});
	}
	function ee(e) {
		c("theme", () => {
			e === "light" ? delete R(i).theme.scheme : R(i).theme.scheme = e;
		});
	}
	function te(e) {
		c("theme", () => {
			e ? R(i).theme.alt = {
				auto: !0,
				tokens: { color: l() }
			} : delete R(i).theme.alt;
		});
	}
	function ne(e) {
		c("theme", () => {
			R(i).theme.alt ??= { tokens: { color: l() } }, R(i).theme.alt.auto = e, e && (R(i).theme.alt.tokens.color = l());
		});
	}
	function re(e) {
		let t = R(i).theme.tokens.font[e];
		return [...Hd.some(([, e]) => e === t) ? [] : [[t, Y("opt.customFont")]], ...Hd.map(([e, t]) => [t, Y(e)])];
	}
	let ie = (e) => parseInt(e, 10) || 0;
	function ae(e, t) {
		T(e, `${t}px`);
	}
	var oe = Xb();
	{
		let e = (e, t = f, n = f) => {
			var r = Wb(), i = N(r), a = (e) => {
				var t = Ub(), r = F(t, !0);
				L(() => H(r, n())), V(e, t);
			};
			U(i, (e) => {
				n() && e(a);
			});
			var o = I(i, 2), c = N(o), l = F(c, !0), d = I(c, 2), p = F(d, !0), m = I(d, 2), h = N(m), g = F(h, !0), _ = F(I(h), !0);
			O(m), O(o), O(r), L((e, t, n, r, i, a, s, c, u) => {
				Oi(o, `--tv-bg:${e ?? ""};--tv-surface:${t ?? ""};--tv-text:${n ?? ""};--tv-accent:${r ?? ""};--tv-accent-ink:${i ?? ""}`), H(l, a), H(p, s), H(g, c), H(_, u);
			}, [
				() => u(t().bg, t()),
				() => u(t().surface, t()),
				() => u(t().text, t()),
				() => u(t().accent, t()),
				() => u(t()["accent-text"] ?? s(u(t().accent ?? "#000000", t())), t()),
				() => Y("preview.heading"),
				() => Y("preview.cardBody"),
				() => Y("preview.button"),
				() => Y("preview.link")
			]), V(e, r);
		};
		var se = N(oe), ce = F(se, !0), le = I(se, 2);
		ni(le, 21, () => a, (e) => e.id, (e, t) => {
			var n = Gb();
			let i;
			var a = N(n), s = N(a), c = I(s), l = I(c), u = I(l);
			O(a);
			var d = F(I(a, 2), !0);
			O(n), L(() => {
				i = Ei(n, 1, "theme-preset", null, i, { sel: R(r) === R(t).id }), J(n, "title", `${R(t).name} - ${R(t).note}`), Oi(s, `background:${R(t).light.bg ?? ""}`), Oi(c, `background:${R(t).light.surface ?? ""}`), Oi(l, `background:${R(t).light.accent ?? ""}`), Oi(u, `background:${R(t).light.text ?? ""}`), H(d, R(t).name);
			}), z("click", n, () => o(R(t))), V(e, n);
		}), O(le);
		var ue = I(le, 2), de = F(ue, !0), fe = I(ue, 2), pe = N(fe);
		G(pe);
		var me = I(pe);
		O(fe);
		var he = I(fe, 2), ge = (e) => {
			var t = Kb(), n = N(t), r = F(n, !0), i = I(n, 2), a = N(i);
			let o;
			var s = F(a, !0), c = I(a, 2);
			let l;
			var u = F(c, !0);
			O(i), O(t), L((e, t, n, i) => {
				H(r, e), J(a, "title", t), o = Ei(a, 1, "", null, o, { on: R(g) }), H(s, n), l = Ei(c, 1, "", null, l, { on: !R(g) }), H(u, i);
			}, [
				() => Y("lbl.darkColors"),
				() => Y("hint.theme.autoDark"),
				() => Y("opt.auto"),
				() => Y("opt.custom")
			]), z("click", a, () => ne(!0)), z("click", c, () => ne(!1)), V(e, t);
		};
		U(he, (e) => {
			R(m) && e(ge);
		});
		var _e = I(he, 2), ve = N(_e), ye = (e) => {
			var t = qb(), n = F(t, !0);
			L((e) => H(n, e), [() => Y("lbl.light")]), V(e, t);
		};
		U(ve, (e) => {
			R(m) && e(ye);
		});
		var be = I(ve, 2);
		let t;
		var xe = F(be, !0);
		O(_e);
		var Se = I(_e, 2);
		ni(Se, 21, () => p, ([e, t, n]) => e, (e, t) => {
			var n = /* @__PURE__ */ A(() => h(R(t), 3));
			let r = () => R(n)[0], a = () => R(n)[1], o = () => R(n)[2];
			var s = Jb(), c = N(s);
			{
				let e = /* @__PURE__ */ A(() => R(i).theme.tokens.color[r()] ?? x(r(), R(v))), t = /* @__PURE__ */ A(d);
				Na(c, {
					get value() {
						return R(e);
					},
					get tokens() {
						return R(t);
					},
					get label() {
						return a();
					},
					onchange: (e) => b(r(), e)
				});
			}
			var l = I(c, 2), f = F(l, !0), p = F(I(l, 2), !0);
			O(s), L((e) => {
				H(f, o()), H(p, e);
			}, [() => u(R(i).theme.tokens.color[r()] ?? x(r(), R(v)), R(v))]), V(e, s);
		}), O(Se);
		var Ce = I(Se, 2), we = (e) => {
			var t = Yb(), n = P(t), r = N(n), a = F(r, !0), o = I(r, 2);
			let s;
			var c = F(o, !0);
			O(n);
			var l = I(n, 2);
			let f;
			ni(l, 21, () => p, ([e, t, n]) => e, (e, t) => {
				var n = /* @__PURE__ */ A(() => h(R(t), 3));
				let r = () => R(n)[0], a = () => R(n)[1], o = () => R(n)[2];
				var s = Jb(), c = N(s);
				{
					let e = /* @__PURE__ */ A(() => R(i).theme.alt.tokens.color[r()] ?? R(y)[r()] ?? x(r(), R(y))), t = /* @__PURE__ */ A(d), n = /* @__PURE__ */ A(() => Y("theme.darkColorLabel", { name: a() }));
					Na(c, {
						get value() {
							return R(e);
						},
						get tokens() {
							return R(t);
						},
						get label() {
							return R(n);
						},
						onchange: (e) => E(r(), e)
					});
				}
				var l = I(c, 2), f = F(l, !0), p = F(I(l, 2), !0);
				O(s), L((e) => {
					H(f, o()), H(p, e);
				}, [() => u(R(i).theme.alt.tokens.color[r()] ?? R(y)[r()] ?? x(r(), R(y)), R(y))]), V(e, s);
			}), O(l), L((e, t, n) => {
				H(a, e), s = Ei(o, 1, "chip", null, s, { accent: R(_) === "dark" }), J(o, "title", t), H(c, n), f = Ei(l, 1, "palcells", null, f, { autopal: R(g) });
			}, [
				() => Y("lbl.dark"),
				() => Y("tip.theme.darkDefault"),
				() => Y("common.standard")
			]), z("click", o, () => ee("dark")), V(e, t);
		};
		U(Ce, (e) => {
			R(m) && e(we);
		});
		var Te = I(Ce, 2), Ee = N(Te), D = F(Ee, !0), De = I(Ee, 2);
		let n;
		var Oe = F(De, !0);
		O(Te);
		var ke = I(Te, 2), k = N(ke);
		{
			let t = /* @__PURE__ */ A(() => R(m) ? Y("lbl.light") : "");
			e(k, () => R(v), () => R(t));
		}
		var Ae = I(k, 2), je = (t) => {
			{
				let n = /* @__PURE__ */ A(() => Y("lbl.dark"));
				e(t, () => R(y), () => R(n));
			}
		};
		U(Ae, (e) => {
			R(m) && e(je);
		}), O(ke);
		var Me = I(ke, 2), Ne = N(Me), Pe = F(Ne, !0), Fe = I(Ne, 2), Ie = N(Fe), Le = N(Ie), Re = I(Le);
		{
			let e = /* @__PURE__ */ A(() => re("heading"));
			Ao(Re, {
				get value() {
					return R(i).theme.tokens.font.heading;
				},
				get options() {
					return R(e);
				},
				onchange: (e) => w("heading", e)
			});
		}
		O(Ie);
		var ze = I(Ie, 2), Be = N(ze), Ve = I(Be);
		{
			let e = /* @__PURE__ */ A(() => re("body"));
			Ao(Ve, {
				get value() {
					return R(i).theme.tokens.font.body;
				},
				get options() {
					return R(e);
				},
				onchange: (e) => w("body", e)
			});
		}
		O(ze);
		var He = I(ze, 2), Ue = N(He), We = F(Ue, !0), Ge = I(Ue, 2), Ke = F(Ge, !0);
		O(He), O(Fe), O(Me);
		var qe = I(Me, 2), Je = N(qe), Ye = F(Je, !0), Xe = I(Je, 2), Qe = N(Xe), tt = N(Qe), nt = F(tt, !0), rt = F(I(tt, 2), !0);
		O(Qe);
		var it = I(Qe, 2), at = N(it, !0), ot = F(I(at), !0);
		O(it);
		var st = I(it, 2);
		G(st);
		var ct = I(st, 2), lt = N(ct, !0), ut = F(I(lt), !0);
		O(ct);
		var dt = I(ct, 2);
		G(dt), O(Xe), O(qe), O(oe), L((e, r, a, o, s, c, l, u, d, f, p, h, g, v, y, b, x, C, w, T, E) => {
			H(ce, e), H(de, r), J(fe, "title", a), q(pe, R(m)), H(me, ` ${o ?? ""}`), t = Ei(be, 1, "chip", null, t, { accent: R(_) === "light" }), J(be, "title", s), H(xe, c), J(Te, "title", l), H(D, u), n = Ei(De, 1, "chip palauto", null, n, { accent: R(S) }), H(Oe, d), H(Pe, f), H(Le, `${p ?? ""} `), H(Be, `${h ?? ""} `), Oi(Ue, `font-family:${R(i).theme.tokens.font.heading ?? ""}`), H(We, g), Oi(Ge, `font-family:${R(i).theme.tokens.font.body ?? ""}`), H(Ke, v), H(Ye, y), Oi(Qe, `--r-sm:${R(i).theme.tokens.radius.sm ?? ""};--r-md:${R(i).theme.tokens.radius.md ?? ""}`), H(nt, b), H(rt, x), H(at, C), H(ot, R(i).theme.tokens.radius.sm), K(st, w), H(lt, T), H(ut, R(i).theme.tokens.radius.md), K(dt, E);
		}, [
			() => Y("lbl.themePresets"),
			() => Y("lbl.colors"),
			() => Y("tip.theme.dualMode"),
			() => Y("lbl.dualMode"),
			() => Y("tip.theme.defaultScheme"),
			() => Y("common.standard"),
			() => Y("tip.theme.accentTextAuto"),
			() => Y("palette.accentText"),
			() => Y("opt.auto"),
			() => Y("group.typography"),
			() => Y("lbl.headings"),
			() => Y("lbl.bodyText"),
			() => Y("preview.heading"),
			() => Y("preview.bodySample"),
			() => Y("group.shape"),
			() => Y("preview.button"),
			() => Y("preview.card"),
			() => Y("lbl.smallCorners"),
			() => ie(R(i).theme.tokens.radius.sm),
			() => Y("lbl.largeCorners"),
			() => ie(R(i).theme.tokens.radius.md)
		]), z("change", pe, (e) => te(e.target.checked)), z("click", be, () => ee("light")), z("click", De, () => C(!R(S))), z("input", st, (e) => ae("sm", Number(e.target.value))), z("input", dt, (e) => ae("md", Number(e.target.value)));
	}
	V(e, oe), et();
}
Mr([
	"click",
	"change",
	"input"
]);
//#endregion
//#region src/panels/GridPanel.svelte
var Qb = /* @__PURE__ */ B("<div class=\"panel-body\"><label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\"/> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label></div>");
function $b(e, t) {
	$e(t, !0);
	let n = Ze("urd-editor"), r = /* @__PURE__ */ A(() => n.grid), { setGrid: i } = n;
	var a = Qb(), o = N(a), s = N(o), c = F(I(s));
	O(o);
	var l = I(o, 2);
	G(l);
	var u = I(l, 2), d = N(u);
	G(d);
	var f = I(d);
	O(u), O(a), L((e, t) => {
		H(s, `${e ?? ""} `), H(c, `${R(r).size ?? ""} px`), K(l, R(r).size), q(d, R(r).snap !== !1), H(f, ` ${t ?? ""}`);
	}, [() => Y("lbl.gridSize"), () => Y("lbl.gridSnap")]), z("input", l, (e) => i("size", Number(e.target.value))), z("change", d, (e) => i("snap", e.target.checked)), V(e, a), et();
}
Mr(["input", "change"]);
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/glow.js
var ex = {
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
		let n = Mm(t.color), r = t.x ?? .5, i = t.y ?? .3, a = t.radius ?? .5;
		e.style.background = `radial-gradient(circle at ${r * 100}% ${i * 100}%, ${n} 0%, transparent ${a * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, tx = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", nx = {
	version: 1,
	label: "Grain",
	labelKey: "bgLayer.grain",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = tx, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
};
//#endregion
//#region ../template/assets/engine/0.7.4/footer-thumb.js
function rx(e = {}) {
	let t = "#2fd6b6", n = "#5c6b64", r = e.mega ? "#16221d" : "#0e1512", i = e.cols ?? 0, a = e.social ?? 0, o = `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${r}"/>`;
	if (e.mega && (o += `<circle cx="20" cy="6" r="34" fill="${t}" opacity="0.18"/>`), e.bigcta) return o += `<rect x="45" y="18" width="70" height="8" rx="3" fill="${n}" opacity="0.85"/>`, o += `<rect x="56" y="32" width="48" height="4" rx="2" fill="${n}" opacity="0.5"/>`, o += `<rect x="62" y="43" width="36" height="10" rx="3" fill="${t}"/>`, o += ix(n, e.baselineLinks), o + "</svg>";
	if (e.chapters) {
		o += `<rect x="12" y="10" width="20" height="6" rx="2" fill="${t}"/>`, o += `<rect x="12" y="20" width="46" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		let r = i || 3, a = (136 - (r - 1) * 8) / r;
		for (let e = 0; e < r; e++) {
			let r = 12 + e * (a + 8);
			o += `<line x1="${r}" y1="30" x2="${r + a}" y2="30" stroke="${n}" stroke-width="0.8" opacity="0.7"/>`, o += `<rect x="${r}" y="34" width="9" height="6" rx="1.5" fill="${t}"/>`;
			for (let e = 0; e < 3; e++) o += `<rect x="${r}" y="${44 + e * 6}" width="${a * .7}" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		}
		return o += ix(n, e.baselineLinks), o + "</svg>";
	}
	if (e.split) {
		o += `<rect x="8" y="8" width="70" height="52" rx="4" fill="${t}" opacity="0.16"/>`, o += `<rect x="16" y="16" width="20" height="6" rx="2" fill="${t}"/>`, o += `<rect x="16" y="26" width="46" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`, o += `<rect x="16" y="36" width="26" height="9" rx="3" fill="${t}"/>`;
		let r = i || 2;
		for (let e = 0; e < r; e++) {
			let r = 90 + e * 32;
			o += `<rect x="${r}" y="14" width="16" height="3" rx="1.5" fill="${t}" opacity="0.8"/>`;
			for (let e = 0; e < 4; e++) o += `<rect x="${r}" y="${22 + e * 7}" width="22" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		}
		return o += ix(n, e.baselineLinks), o + "</svg>";
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
	return o += ix(n, e.baselineLinks), o + "</svg>";
}
function ix(e, t = 0) {
	let n = `<line x1="8" y1="66" x2="152" y2="66" stroke="${e}" stroke-width="0.6" opacity="0.5"/>`;
	return n += `<rect x="8" y="70" width="40" height="3" rx="1.5" fill="${e}" opacity="0.6"/>`, t && (n += `<g fill="${e}" opacity="0.6">` + Array.from({ length: t }, (e, t) => `<rect x="${120 - t * 16}" y="70" width="12" height="3" rx="1.5"/>`).join("") + "</g>"), n;
}
//#endregion
//#region src/panels/FooterPanel.svelte
var ax = /* @__PURE__ */ B("<input class=\"nav-target\"/>"), ox = /* @__PURE__ */ B("<div class=\"nav-row nav-sub-row\"><input/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span> <span class=\"nav-target\"><!></span> <!></div>"), sx = /* @__PURE__ */ B("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), cx = /* @__PURE__ */ B("<details class=\"group\"><summary> </summary> <div class=\"group-items\"></div></details>"), lx = /* @__PURE__ */ B("<button class=\"footer-tp\"><span class=\"footer-tp-thumb\"></span> <span class=\"footer-tp-name\"> </span></button>"), ux = /* @__PURE__ */ B("<button class=\"ghost row-tool\"></button>"), dx = /* @__PURE__ */ B("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"16\" max=\"160\" step=\"2\"/>", 1), fx = /* @__PURE__ */ B("<span class=\"toolbar-row\"><label class=\"ghost filepick tb-grow\"> <input type=\"file\" accept=\"image/*\"/></label> <!></span> <!>", 1), px = /* @__PURE__ */ B("<div class=\"nav-row\"><input/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></div> <!>", 1), mx = /* @__PURE__ */ B("<div class=\"nav-row\"><span class=\"nav-line\"><span class=\"footer-soc-preview\" aria-hidden=\"true\"></span> <!></span> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span> <input class=\"nav-target\"/></div>"), hx = /* @__PURE__ */ B("<input/>"), gx = /* @__PURE__ */ B("<label> <!></label> <!>", 1), _x = /* @__PURE__ */ B("<label> <input/></label> <label> <input/></label> <label> <input/></label>", 1), vx = /* @__PURE__ */ B("<label> <!></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label> <input/></label> <label> <input/></label> <label> <input/></label> <!>", 1), yx = /* @__PURE__ */ B("<label> <!></label> <hr class=\"gridmenu-divider\"/>", 1), bx = /* @__PURE__ */ B("<div class=\"panel-body\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><div class=\"footer-tpick\"></div></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><label> <input/></label> <label> <input/></label> <label> <!></label> <!></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><!> <button class=\"ghost action\"> </button> <label> <!></label></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><!> <button class=\"ghost action\"> </button></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><!> <button class=\"ghost action\"> </button></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><!> <p class=\"panel-strong\"> </p> <!></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><label> <input/></label> <p class=\"panel-strong\"> </p> <!> <button class=\"ghost action\"> </button></div></details></div>");
function xx(e, t) {
	$e(t, !0);
	let n = (e, t = f, n = f) => {
		var r = Vr();
		ni(P(r), 17, n, Qr, (e, r, a) => {
			var o = ox(), s = N(o);
			G(s);
			var c = I(s, 2), l = N(c);
			l.disabled = a === 0, W(l, () => X.up, !0), O(l);
			var u = I(l, 2);
			W(u, () => X.down, !0), O(u);
			var d = I(u, 2);
			W(d, () => X.cross, !0), O(d), O(c);
			var f = I(c, 2), p = N(f);
			{
				let e = /* @__PURE__ */ A(() => R(r).page ?? "__href"), n = /* @__PURE__ */ A(() => Y("tip.linkTarget")), o = /* @__PURE__ */ A(() => [...R(i).pages.map((e) => [e.id, e.title]), ["__href", Y("opt.linkHref")]]);
				Ao(p, {
					get value() {
						return R(e);
					},
					get title() {
						return R(n);
					},
					get options() {
						return R(o);
					},
					onchange: (e) => C(t(), a, e)
				});
			}
			O(f);
			var m = I(f, 2), h = (e) => {
				var n = ax();
				G(n), L((e, t) => {
					K(n, R(r).href ?? ""), J(n, "placeholder", e), J(n, "title", t);
				}, [() => Y("ph.hrefAnchor"), () => Y("tip.hrefAnchor")]), z("change", n, (e) => w(t(), a, e.target.value)), V(e, n);
			};
			U(m, (e) => {
				R(r).page || e(h);
			}), O(o), L((e, t) => {
				K(s, R(r).label), J(s, "title", e), u.disabled = a === n().length - 1, J(d, "title", t);
			}, [() => Y("tip.linkLabel"), () => Y("tip.removeLink")]), z("input", s, (e) => S(t(), a, e.target.value)), z("click", l, () => x(t(), a, -1)), z("click", u, () => x(t(), a, 1)), z("click", d, () => b(t(), a)), V(e, o);
		}), V(e, r);
	}, r = Ze("urd-editor"), i = /* @__PURE__ */ A(() => r.siteDraft), { compressOrTrim: a, footerBgCtx: o, footerMutate: s, setStatus: c } = r;
	function l(e, t) {
		s(`edit:footer-brand-${e}`, (n) => {
			n.brand ??= {}, t.trim() ? n.brand[e] = t : delete n.brand[e], !n.brand.title && !n.brand.tagline && !n.brand.logo && delete n.brand;
		});
	}
	function u(e) {
		s("footer", (t) => {
			t.brand ??= {}, e === "image" || e === "both" ? t.brand.mode = e : delete t.brand.mode;
		});
	}
	async function d(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await a(t);
			s("footer", (t) => {
				t.brand ??= {}, t.brand.logo = e.dataUrl, t.brand.mode || (t.brand.mode = "both");
			});
		} catch {
			c(Y("status.imageReadErrorSvg"), "error");
		}
	}
	function p() {
		s("footer", (e) => {
			e.brand && (delete e.brand.logo, delete e.brand.mode, delete e.brand.logoHeight, !e.brand.title && !e.brand.tagline && delete e.brand);
		});
	}
	function m(e) {
		s("edit:footer-logo-height", (t) => {
			t.brand ??= {};
			let n = Number(e);
			Number.isFinite(n) && (t.brand.logoHeight = Math.min(160, Math.max(16, Math.round(n))));
		});
	}
	function h(e) {
		s("edit:footer-copyright", (t) => {
			e.trim() ? t.copyright = e : delete t.copyright;
		});
	}
	let g = [
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
			id: "centered",
			label: Y("footerTemplate.centered"),
			thumb: {
				center: !0,
				row: !0,
				social: 3
			}
		},
		{
			id: "columns",
			label: Y("footerTemplate.columns"),
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
			id: "newsletter",
			label: Y("footerTemplate.newsletter"),
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
			label: Y("footerTemplate.bigcta"),
			thumb: {
				center: !0,
				bigcta: !0,
				baselineLinks: 2
			}
		},
		{
			id: "contact",
			label: Y("footerTemplate.contact"),
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
		},
		{
			id: "chapters",
			label: Y("footerTemplate.chapters"),
			thumb: {
				chapters: !0,
				cols: 3,
				baselineLinks: 2
			}
		},
		{
			id: "split",
			label: Y("footerTemplate.split"),
			thumb: {
				split: !0,
				cols: 2,
				baselineLinks: 1
			}
		}
	];
	function _(e) {
		let t = Y("seed.orgName"), n = R(i).pages ?? [], r = (e) => n.slice(0, e).map((e) => ({
			label: e.title || e.id,
			page: e.id
		})), a = (e) => e.map((e) => ({
			icon: e,
			url: `https://${e}.com`
		})), o = (e, t) => ({
			label: e,
			href: t
		}), s = `© ${t}`;
		return e === "minimal" ? {
			align: "center",
			brand: { title: t },
			social: a(["facebook", "instagram"]),
			copyright: s,
			baseline: [o(Y("seed.footer.privacy"), "#")]
		} : e === "centered" ? {
			align: "center",
			brand: { title: t },
			linkRow: r(5),
			social: a([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: `${s} · ${Y("seed.footer.madeWith")}`
		} : e === "columns" ? {
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
						o(Y("seed.footer.about"), "#"),
						o(Y("seed.join"), "#"),
						o(Y("seed.footer.press"), "#")
					]
				},
				{
					title: Y("seed.footer.colResources"),
					links: [
						o(Y("seed.footer.bylaws"), "#"),
						o(Y("seed.footer.privacy"), "#"),
						o(Y("seed.footer.contact"), "#")
					]
				}
			],
			social: a([
				"facebook",
				"instagram",
				"linkedin"
			]),
			copyright: s,
			baseline: [o(Y("seed.footer.privacy"), "#"), o(Y("seed.footer.terms"), "#")]
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
						o(Y("seed.footer.home"), "#"),
						o(Y("seed.footer.events"), "#"),
						o(Y("seed.footer.gallery"), "#"),
						o(Y("seed.footer.blog"), "#")
					]
				},
				{
					title: Y("seed.footer.colCompany"),
					links: [
						o(Y("seed.footer.about"), "#"),
						o(Y("seed.footer.history"), "#"),
						o(Y("seed.footer.press"), "#"),
						o(Y("seed.footer.contact"), "#")
					]
				},
				{
					title: Y("seed.footer.colSupport"),
					links: [
						o(Y("seed.join"), "#"),
						o(Y("seed.footer.faq"), "#"),
						o(Y("seed.footer.help"), "#")
					]
				},
				{
					title: Y("seed.footer.colLegal"),
					links: [
						o(Y("seed.footer.privacy"), "#"),
						o(Y("seed.footer.terms"), "#"),
						o(Y("seed.footer.bylaws"), "#")
					]
				}
			],
			social: a([
				"facebook",
				"instagram",
				"linkedin",
				"youtube"
			]),
			copyright: s,
			baseline: [
				o(Y("seed.footer.privacy"), "#"),
				o(Y("seed.footer.terms"), "#"),
				o(Y("seed.footer.cookies"), "#")
			]
		} : e === "newsletter" ? {
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
					o(Y("seed.footer.about"), "#"),
					o(Y("seed.footer.contact"), "#"),
					o(Y("seed.footer.privacy"), "#")
				]
			}],
			social: a(["facebook", "instagram"]),
			copyright: s,
			baseline: [o(Y("seed.footer.privacy"), "#")]
		} : e === "bigcta" ? {
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
			social: a([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: s,
			baseline: [o(Y("seed.footer.privacy"), "#"), o(Y("seed.footer.terms"), "#")]
		} : e === "contact" ? {
			align: "left",
			brand: {
				title: t,
				tagline: Y("seed.footer.tagline4")
			},
			columns: [
				{
					title: Y("seed.footer.colVisit"),
					links: [
						o(Y("seed.footer.address"), "#"),
						o(Y("seed.email"), `mailto:${Y("seed.email")}`),
						o(Y("seed.phone"), `tel:${Y("seed.phone").replace(/\s+/g, "")}`)
					]
				},
				{
					title: Y("seed.footer.colHours"),
					links: [o(Y("seed.footer.hours1"), "#"), o(Y("seed.footer.hours2"), "#")]
				},
				{
					title: Y("seed.footer.colPages"),
					links: r(4)
				}
			],
			social: a(["facebook", "instagram"]),
			copyright: s,
			baseline: [o(Y("seed.footer.privacy"), "#")]
		} : e === "chapters" ? {
			align: "left",
			design: "chapters",
			brand: {
				title: t,
				tagline: Y("seed.footer.tagline2")
			},
			columns: [
				{
					title: Y("seed.footer.colExplore"),
					links: r(4)
				},
				{
					title: Y("seed.footer.colCompany"),
					links: [
						o(Y("seed.footer.about"), "#"),
						o(Y("seed.footer.history"), "#"),
						o(Y("seed.footer.contact"), "#")
					]
				},
				{
					title: Y("seed.footer.colSupport"),
					links: [
						o(Y("seed.join"), "#"),
						o(Y("seed.footer.faq"), "#"),
						o(Y("seed.footer.help"), "#")
					]
				}
			],
			copyright: s,
			baseline: [o(Y("seed.footer.privacy"), "#"), o(Y("seed.footer.terms"), "#")]
		} : e === "split" ? {
			align: "left",
			design: "split",
			brand: {
				title: t,
				tagline: Y("seed.footer.tagline1")
			},
			cta: {
				kind: "button",
				heading: Y("seed.footer.ctaHeading"),
				label: Y("seed.join"),
				href: "#"
			},
			columns: [{
				title: Y("seed.footer.colPages"),
				links: r(4)
			}, {
				title: Y("seed.footer.colMore"),
				links: [
					o(Y("seed.footer.about"), "#"),
					o(Y("seed.footer.contact"), "#"),
					o(Y("seed.footer.privacy"), "#")
				]
			}],
			social: a(["facebook", "instagram"]),
			copyright: s,
			baseline: [o(Y("seed.footer.privacy"), "#")]
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
				links: [o(Y("seed.footer.newsletter"), "#"), o(Y("seed.email"), `mailto:${Y("seed.email")}`)]
			}],
			social: a([
				"facebook",
				"instagram",
				"linkedin",
				"youtube"
			]),
			copyright: s,
			baseline: [o(Y("seed.footer.privacy"), "#"), o(Y("seed.footer.madeWith"), "#")],
			background: {
				version: 1,
				layers: [{
					type: "glow",
					version: ex.version ?? 1,
					props: {
						...ex.defaults(),
						color: "accent",
						x: .12,
						y: 0,
						radius: .6,
						opacity: .45
					}
				}, {
					type: "grain",
					version: nx.version ?? 1,
					props: {
						...nx.defaults(),
						opacity: .08
					}
				}]
			}
		};
	}
	function v(e) {
		s("footer-template", (t) => {
			let n = _(e);
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
	function y(e) {
		s("footer", (t) => {
			t[e] ??= [], t[e].push(R(i).pages[0] ? {
				label: Y("seed.link"),
				page: R(i).pages[0].id
			} : {
				label: Y("seed.link"),
				href: "https://"
			});
		});
	}
	function b(e, t) {
		s("footer", (n) => {
			n[e].splice(t, 1), n[e].length || delete n[e];
		});
	}
	function x(e, t, n) {
		s("footer", (r) => {
			let i = r[e], a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function S(e, t, n) {
		s(`edit:footer-${e}-label-${t}`, (r) => {
			r[e][t].label = n;
		});
	}
	function C(e, t, n) {
		s("footer", (r) => {
			let i = r[e][t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function w(e, t, n) {
		s(`edit:footer-${e}-href-${t}`, (r) => {
			r[e][t].href = n;
		});
	}
	function T(e) {
		s("footer", (t) => {
			e === "center" ? t.columnsAlign = "center" : delete t.columnsAlign;
		});
	}
	function E(e) {
		s("footer", (t) => {
			e ? t.cta ??= {
				kind: "button",
				label: Y("seed.join")
			} : delete t.cta;
		});
	}
	function ee(e, t) {
		s(`edit:footer-cta-${e}`, (n) => {
			n.cta ??= {}, t === "" || t == null || t === !1 ? delete n.cta[e] : n.cta[e] = t;
		});
	}
	function te(e) {
		s("footer", (t) => {
			t.cta ??= {}, e === "__href" ? (delete t.cta.page, t.cta.href = t.cta.href ?? "https://") : (t.cta.page = e, delete t.cta.href);
		});
	}
	function ne(e, t) {
		s("footer", (n) => {
			let r = new Set(n.hideOn ?? []);
			t ? r.delete(e) : r.add(e), r.size ? n.hideOn = [...r] : delete n.hideOn;
		});
	}
	function re() {
		s("footer", (e) => {
			e.columns ??= [], e.columns.push({
				title: Y("seed.column"),
				links: [{
					label: Y("seed.link"),
					page: R(i).pages[0].id
				}]
			});
		});
	}
	function ie(e) {
		s("footer", (t) => {
			t.columns.splice(e, 1), t.columns.length || delete t.columns;
		});
	}
	function ae(e, t) {
		s("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.columns.length || ([n.columns[e], n.columns[r]] = [n.columns[r], n.columns[e]]);
		});
	}
	function oe(e, t) {
		s(`edit:footer-col-title-${e}`, (n) => {
			n.columns[e].title = t;
		});
	}
	function se(e) {
		s("footer", (t) => {
			t.columns[e].links ??= [], t.columns[e].links.push({
				label: Y("seed.link"),
				page: R(i).pages[0].id
			});
		});
	}
	function ce(e, t) {
		s("footer", (n) => {
			n.columns[e].links.splice(t, 1);
		});
	}
	function le(e, t, n) {
		s("footer", (r) => {
			let i = r.columns[e].links, a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function ue(e, t, n) {
		s(`edit:footer-link-label-${e}-${t}`, (r) => {
			r.columns[e].links[t].label = n;
		});
	}
	function de(e, t, n) {
		s("footer", (r) => {
			let i = r.columns[e].links[t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function fe(e, t, n) {
		s(`edit:footer-link-href-${e}-${t}`, (r) => {
			r.columns[e].links[t].href = n;
		});
	}
	function pe() {
		s("footer", (e) => {
			e.social ??= [], e.social.push({
				icon: "facebook",
				url: "https://"
			});
		});
	}
	function me(e) {
		s("footer", (t) => {
			t.social.splice(e, 1), t.social.length || delete t.social;
		});
	}
	function he(e, t) {
		s("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.social.length || ([n.social[e], n.social[r]] = [n.social[r], n.social[e]]);
		});
	}
	function ge(e, t) {
		s("footer", (n) => {
			n.social[e].icon = t;
		});
	}
	function _e(e, t) {
		s(`edit:footer-social-url-${e}`, (n) => {
			n.social[e].url = t;
		});
	}
	let ve = Su.filter(([e]) => e === "iconCat.social" || e === "iconCat.communication").flatMap(([, e]) => e.map((e) => [e, Y(xu[e].labelKey)]));
	var ye = bx(), be = N(ye), xe = N(be);
	G(xe);
	var Se = I(xe);
	O(be);
	var Ce = I(be, 2), we = (e) => {
		var t = cx(), n = N(t), r = F(n, !0), a = I(n, 2);
		ni(a, 21, () => R(i).pages ?? [], (e) => e.id, (e, t) => {
			var n = sx(), r = N(n);
			G(r);
			var a = I(r);
			O(n), L((e, i) => {
				J(n, "title", e), q(r, i), H(a, ` ${(R(t).title || R(t).id) ?? ""}`);
			}, [() => Y("tip.footer.hideOnPage"), () => !(R(i).footer?.hideOn ?? []).includes(R(t).id)]), z("change", r, (e) => ne(R(t).id, e.target.checked)), V(e, n);
		}), O(a), O(t), L((e) => H(r, e), [() => Y("group.showOnPages")]), V(e, t);
	};
	U(Ce, (e) => {
		R(i).footer?.show && e(we);
	});
	var Te = I(Ce, 2), Ee = N(Te), D = F(Ee, !0), Oe = I(Ee, 2), ke = N(Oe);
	ni(ke, 21, () => g, (e) => e.id, (e, t) => {
		var n = lx(), r = N(n);
		W(r, () => rx(R(t).thumb), !0), O(r);
		var i = F(I(r, 2), !0);
		O(n), L((e) => {
			J(n, "title", e), H(i, R(t).label);
		}, [() => Y("tip.footer.template", { label: R(t).label })]), z("click", n, () => v(R(t).id)), V(e, n);
	}), O(ke), O(Oe), O(Te);
	var k = I(Te, 2), Ae = N(k), je = F(Ae, !0), Me = I(Ae, 2), Ne = N(Me), Pe = N(Ne), Fe = I(Pe);
	G(Fe), O(Ne);
	var Ie = I(Ne, 2), Le = N(Ie), Re = I(Le);
	G(Re), O(Ie);
	var ze = I(Ie, 2), Be = N(ze), Ve = I(Be);
	{
		let e = /* @__PURE__ */ A(() => R(i).footer?.brand?.mode ?? "text"), t = /* @__PURE__ */ A(() => [
			["text", Y("blocks.text")],
			["image", Y("opt.brand.image")],
			["both", Y("opt.brand.both")]
		]);
		Ao(Ve, {
			get value() {
				return R(e);
			},
			get options() {
				return R(t);
			},
			onchange: (e) => u(e)
		});
	}
	O(ze);
	var He = I(ze, 2), Ue = (e) => {
		var t = fx(), n = P(t), r = N(n), a = N(r), o = I(a);
		O(r);
		var s = I(r, 2), c = (e) => {
			var t = ux();
			W(t, () => X.cross, !0), O(t), L((e) => J(t, "title", e), [() => Y("tip.footer.removeLogo")]), z("click", t, p), V(e, t);
		};
		U(s, (e) => {
			R(i).footer?.brand?.logo && e(c);
		}), O(n);
		var l = I(n, 2), u = (e) => {
			var t = dx(), n = P(t), r = N(n), a = F(I(r));
			O(n);
			var o = I(n, 2);
			G(o), L((e) => {
				H(r, `${e ?? ""} `), H(a, `${R(i).footer?.brand?.logoHeight ?? 40 ?? ""} px`), K(o, R(i).footer?.brand?.logoHeight ?? 40);
			}, [() => Y("lbl.logoHeight")]), z("input", o, (e) => m(e.target.value)), V(e, t);
		};
		U(l, (e) => {
			R(i).footer?.brand?.logo && e(u);
		}), L((e, t) => {
			J(r, "title", e), H(a, `${t ?? ""} `);
		}, [() => Y("tip.webpAutoPublish"), () => R(i).footer?.brand?.logo ? Y("ui.changeLogo") : Y("ui.uploadLogo")]), z("change", o, d), V(e, t);
	};
	U(He, (e) => {
		(R(i).footer?.brand?.mode ?? "text") !== "text" && e(Ue);
	}), O(Me), O(k);
	var We = I(k, 2), Ge = N(We), Ke = F(Ge, !0), qe = I(Ge, 2), Je = N(qe);
	ni(Je, 17, () => R(i).footer?.columns ?? [], Qr, (e, t, n) => {
		var r = px(), a = P(r), o = N(a);
		G(o);
		var s = I(o, 2), c = N(s);
		W(c, () => X.plus, !0), O(c);
		var l = I(c, 2);
		l.disabled = n === 0, W(l, () => X.up, !0), O(l);
		var u = I(l, 2);
		W(u, () => X.down, !0), O(u);
		var d = I(u, 2);
		W(d, () => X.cross, !0), O(d), O(s), O(a), ni(I(a, 2), 17, () => R(t).links ?? [], Qr, (e, r, a) => {
			var o = ox(), s = N(o);
			G(s);
			var c = I(s, 2), l = N(c);
			l.disabled = a === 0, W(l, () => X.up, !0), O(l);
			var u = I(l, 2);
			W(u, () => X.down, !0), O(u);
			var d = I(u, 2);
			W(d, () => X.cross, !0), O(d), O(c);
			var f = I(c, 2), p = N(f);
			{
				let e = /* @__PURE__ */ A(() => R(r).page ?? "__href"), t = /* @__PURE__ */ A(() => Y("tip.linkTarget")), o = /* @__PURE__ */ A(() => [...R(i).pages.map((e) => [e.id, e.title]), ["__href", Y("opt.linkHref")]]);
				Ao(p, {
					get value() {
						return R(e);
					},
					get title() {
						return R(t);
					},
					get options() {
						return R(o);
					},
					onchange: (e) => de(n, a, e)
				});
			}
			O(f);
			var m = I(f, 2), h = (e) => {
				var t = ax();
				G(t), L((e, n) => {
					K(t, R(r).href ?? ""), J(t, "placeholder", e), J(t, "title", n);
				}, [() => Y("ph.hrefAnchor"), () => Y("tip.hrefAnchor")]), z("change", t, (e) => fe(n, a, e.target.value)), V(e, t);
			};
			U(m, (e) => {
				R(r).page || e(h);
			}), O(o), L((e, n) => {
				K(s, R(r).label), J(s, "title", e), u.disabled = a === R(t).links.length - 1, J(d, "title", n);
			}, [() => Y("tip.linkLabel"), () => Y("tip.removeLink")]), z("input", s, (e) => ue(n, a, e.target.value)), z("click", l, () => le(n, a, -1)), z("click", u, () => le(n, a, 1)), z("click", d, () => ce(n, a)), V(e, o);
		}), L((e, r, a) => {
			K(o, R(t).title), J(o, "title", e), J(c, "title", r), u.disabled = n === R(i).footer.columns.length - 1, J(d, "title", a);
		}, [
			() => Y("tip.footer.columnTitle"),
			() => Y("tip.footer.addLink"),
			() => Y("tip.footer.removeColumn")
		]), z("input", o, (e) => oe(n, e.target.value)), z("click", c, () => se(n)), z("click", l, () => ae(n, -1)), z("click", u, () => ae(n, 1)), z("click", d, () => ie(n)), V(e, r);
	});
	var Ye = I(Je, 2), Xe = F(Ye, !0), Qe = I(Ye, 2), tt = N(Qe), nt = I(tt);
	{
		let e = /* @__PURE__ */ A(() => R(i).footer?.columnsAlign ?? "left"), t = /* @__PURE__ */ A(() => [["left", Y("common.left")], ["center", Y("common.center")]]);
		Ao(nt, {
			get value() {
				return R(e);
			},
			get options() {
				return R(t);
			},
			onchange: (e) => T(e)
		});
	}
	O(Qe), O(qe), O(We);
	var rt = I(We, 2), it = N(rt), at = F(it, !0), ot = I(it, 2), st = N(ot);
	ni(st, 17, () => R(i).footer?.social ?? [], Qr, (e, t, n) => {
		var r = mx(), a = N(r), o = N(a);
		W(o, () => Cu(R(t).icon) || "", !0), O(o);
		var s = I(o, 2);
		{
			let e = /* @__PURE__ */ A(() => Y("blocks.icon"));
			Ao(s, {
				get value() {
					return R(t).icon;
				},
				get title() {
					return R(e);
				},
				get options() {
					return ve;
				},
				onchange: (e) => ge(n, e)
			});
		}
		O(a);
		var c = I(a, 2), l = N(c);
		l.disabled = n === 0, W(l, () => X.up, !0), O(l);
		var u = I(l, 2);
		W(u, () => X.down, !0), O(u);
		var d = I(u, 2);
		W(d, () => X.cross, !0), O(d), O(c);
		var f = I(c, 2);
		G(f), O(r), L((e, r) => {
			u.disabled = n === R(i).footer.social.length - 1, J(d, "title", e), K(f, R(t).url), J(f, "placeholder", r);
		}, [() => Y("tip.removeLink"), () => Y("ph.hrefMailto")]), z("click", l, () => he(n, -1)), z("click", u, () => he(n, 1)), z("click", d, () => me(n)), z("change", f, (e) => _e(n, e.target.value)), V(e, r);
	});
	var ct = I(st, 2), lt = F(ct, !0);
	O(ot), O(rt);
	var ut = I(rt, 2), dt = N(ut), ft = F(dt, !0), pt = I(dt, 2), mt = N(pt), ht = N(mt);
	G(ht);
	var gt = I(ht);
	O(mt);
	var _t = I(mt, 2), vt = (e) => {
		let t = /* @__PURE__ */ A(() => R(i).footer.cta);
		var n = vx(), r = P(n), a = N(r), o = I(a);
		{
			let e = /* @__PURE__ */ A(() => R(t).kind ?? "button"), n = /* @__PURE__ */ A(() => [["button", Y("opt.cta.button")], ["newsletter", Y("opt.cta.newsletter")]]);
			Ao(o, {
				get value() {
					return R(e);
				},
				get options() {
					return R(n);
				},
				onchange: (e) => ee("kind", e)
			});
		}
		O(r);
		var s = I(r, 2), c = N(s);
		G(c);
		var l = I(c);
		O(s);
		var u = I(s, 2), d = N(u), f = I(d);
		G(f), O(u);
		var p = I(u, 2), m = N(p), h = I(m);
		G(h), O(p);
		var g = I(p, 2), _ = N(g), v = I(_);
		G(v), O(g);
		var y = I(g, 2), b = (e) => {
			var n = gx(), r = P(n), a = N(r), o = I(a);
			{
				let e = /* @__PURE__ */ A(() => R(t).page ?? "__href"), n = /* @__PURE__ */ A(() => [...R(i).pages.map((e) => [e.id, e.title]), ["__href", Y("opt.linkHrefMailto")]]);
				Ao(o, {
					get value() {
						return R(e);
					},
					get options() {
						return R(n);
					},
					onchange: (e) => te(e)
				});
			}
			O(r);
			var s = I(r, 2), c = (e) => {
				var n = hx();
				G(n), L((e, r) => {
					K(n, R(t).href ?? ""), J(n, "placeholder", e), J(n, "title", r);
				}, [() => Y("ph.hrefMailtoAnchor"), () => Y("tip.hrefAnchor")]), z("change", n, (e) => ee("href", e.target.value)), V(e, n);
			};
			U(s, (e) => {
				R(t).page || e(c);
			}), L((e, t) => {
				J(r, "title", e), H(a, `${t ?? ""} `);
			}, [() => Y("tip.footer.ctaTarget"), () => Y("lbl.buttonTarget")]), V(e, n);
		}, x = (e) => {
			var n = _x(), r = P(n), i = N(r), a = I(i);
			G(a), O(r);
			var o = I(r, 2), s = N(o), c = I(s);
			G(c), O(o);
			var l = I(o, 2), u = N(l), d = I(u);
			G(d), O(l), L((e, n, f, p, m, h, g, _, v) => {
				J(r, "title", e), H(i, `${n ?? ""} `), K(a, R(t).endpoint ?? ""), J(a, "placeholder", f), J(o, "title", p), H(s, `${m ?? ""} `), K(c, R(t).recipient ?? ""), J(c, "placeholder", h), J(l, "title", g), H(u, `${_ ?? ""} `), K(d, R(t).success ?? ""), J(d, "placeholder", v);
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
			]), z("change", a, (e) => ee("endpoint", e.target.value)), z("change", c, (e) => ee("recipient", e.target.value)), z("input", d, (e) => ee("success", e.target.value)), V(e, n);
		};
		U(y, (e) => {
			(R(t).kind ?? "button") === "button" ? e(b) : e(x, -1);
		}), L((e, n, i, o, y, b, x, S, C, w, T, E) => {
			J(r, "title", e), H(a, `${n ?? ""} `), J(s, "title", i), q(c, R(t).big === !0), H(l, ` ${o ?? ""}`), J(u, "title", y), H(d, `${b ?? ""} `), K(f, R(t).heading ?? ""), J(f, "placeholder", x), J(p, "title", S), H(m, `${C ?? ""} `), K(h, R(t).sub ?? ""), J(g, "title", w), H(_, `${T ?? ""} `), K(v, R(t).label ?? ""), J(v, "placeholder", E);
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
		]), z("change", c, (e) => ee("big", e.target.checked)), z("input", f, (e) => ee("heading", e.target.value)), z("input", h, (e) => ee("sub", e.target.value)), z("input", v, (e) => ee("label", e.target.value)), V(e, n);
	};
	U(_t, (e) => {
		R(i).footer?.cta && e(vt);
	}), O(pt), O(ut);
	var yt = I(ut, 2), bt = N(yt), xt = F(bt, !0), St = I(bt, 2), Ct = N(St);
	n(Ct, () => "linkRow", () => R(i).footer?.linkRow ?? []);
	var wt = I(Ct, 2), Tt = F(wt, !0);
	O(St), O(yt);
	var Et = I(yt, 2), Dt = N(Et), Ot = F(Dt, !0), kt = I(Dt, 2), At = N(kt), jt = (e) => {
		var t = yx(), n = P(t), r = N(n), a = I(r);
		{
			let e = /* @__PURE__ */ A(() => R(i).footer?.align ?? "left"), t = /* @__PURE__ */ A(() => [
				["left", Y("common.left")],
				["center", Y("common.center")],
				["right", Y("common.right")]
			]);
			Ao(a, {
				get value() {
					return R(e);
				},
				get options() {
					return R(t);
				},
				onchange: (e) => s("footer", (t) => {
					t.align = e;
				})
			});
		}
		O(n), De(2), L((e, t) => {
			J(n, "title", e), H(r, `${t ?? ""} `);
		}, [() => Y("tip.footer.align"), () => Y("lbl.align")]), V(e, t);
	};
	U(At, (e) => {
		R(i).footer?.cta?.big !== !0 && e(jt);
	});
	var Mt = I(At, 2), Nt = F(Mt, !0), Pt = I(Mt, 2);
	{
		let e = /* @__PURE__ */ A(() => R(i).footer?.background?.layers ?? []);
		$g(Pt, {
			get bg() {
				return o;
			},
			get layers() {
				return R(e);
			}
		});
	}
	O(kt), O(Et);
	var Ft = I(Et, 2), It = N(Ft), Lt = F(It, !0), Rt = I(It, 2), zt = N(Rt), Bt = N(zt), Vt = I(Bt);
	G(Vt), O(zt);
	var Ht = I(zt, 2), Ut = F(Ht, !0), Wt = I(Ht, 2);
	n(Wt, () => "baseline", () => R(i).footer?.baseline ?? []);
	var Gt = I(Wt, 2), Kt = F(Gt, !0);
	O(Rt), O(Ft), O(ye), L((e, t, n, r, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E, ee, te, ne, re, ie, ae) => {
		J(be, "title", e), q(xe, t), H(Se, ` ${n ?? ""}`), H(D, r), H(je, a), J(Ne, "title", o), H(Pe, `${s ?? ""} `), K(Fe, R(i).footer?.brand?.title ?? ""), J(Fe, "placeholder", c), J(Ie, "title", l), H(Le, `${u ?? ""} `), K(Re, R(i).footer?.brand?.tagline ?? ""), J(ze, "title", d), H(Be, `${f ?? ""} `), H(Ke, p), H(Xe, m), J(Qe, "title", h), H(tt, `${g ?? ""} `), H(at, _), H(lt, v), H(ft, y), J(mt, "title", b), q(ht, x), H(gt, ` ${S ?? ""}`), H(xt, C), H(Tt, w), H(Ot, T), H(Nt, E), H(Lt, ee), J(zt, "title", te), H(Bt, `${ne ?? ""} `), K(Vt, R(i).footer?.copyright ?? ""), J(Vt, "placeholder", re), H(Ut, ie), H(Kt, ae);
	}, [
		() => Y("tip.footer.show"),
		() => !!R(i).footer?.show,
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
		() => !!R(i).footer?.cta,
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
	]), z("change", xe, (e) => s("footer", (t) => {
		t.show = e.target.checked;
	})), z("input", Fe, (e) => l("title", e.target.value)), z("input", Re, (e) => l("tagline", e.target.value)), z("click", Ye, re), z("click", ct, pe), z("change", ht, (e) => E(e.target.checked)), z("click", wt, () => y("linkRow")), z("input", Vt, (e) => h(e.target.value)), z("click", Gt, () => y("baseline")), V(e, ye), et();
}
Mr([
	"input",
	"click",
	"change"
]);
//#endregion
//#region src/lib/preview-scale.js
function Sx(e, t) {
	return !(e > 0) || !(t > 0) ? 1 : e / t;
}
function Cx(e, t, n, r = 0, i = 0) {
	if (n === "full") return 1;
	let a = i > 0 ? Sx(r, i) : Infinity;
	return Math.max(.1, Math.min(1, Sx(e, t), a));
}
//#endregion
//#region src/lib/deploy-wait.js
function wx(e, { max: t = 8 } = {}) {
	let n = (e ?? []).filter((e) => e && typeof e.path == "string" && typeof e.content == "string" && e.encoding === "utf-8" && !e.delete && (e.path.startsWith("content/") || e.path === "plugins/plugins.json"));
	return n.sort((e, t) => (e.path === "content/site.json" ? -1 : 0) - (t.path === "content/site.json" ? -1 : 0)), n.slice(0, t).map(({ path: e, content: t }) => ({
		path: e,
		content: t
	}));
}
async function Tx(e, { fetchFn: t = fetch, delayMs: n = 1e4, attempts: r = 18, sleep: i = (e) => new Promise((t) => setTimeout(t, e)) } = {}) {
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
var Ex = 3840, Dx = 2400, Ox = (e, t, n) => Math.min(n, Math.max(t, e));
function kx({ innerWidth: e = 0, screenWidth: t = 0 } = {}) {
	let n = e > 0 ? e : t;
	return Math.max(1, Math.round(n > 0 ? n : 1));
}
function Ax(e) {
	return !e || typeof e.innerWidth != "number" ? null : kx({
		innerWidth: e.innerWidth,
		screenWidth: e.screen?.width ?? 0
	});
}
function jx(e, t) {
	let n = e && typeof e == "object" && !Array.isArray(e) ? e : {}, r = n.mode === "custom" ? "custom" : "own", i = Number(n.width), a = Ox(Number.isFinite(i) && i > 0 ? i : t, 640, Ex), o = Number(n.height), s = Number.isFinite(o) && o > 0 ? Ox(o, 480, Dx) : 0;
	return {
		mode: r,
		width: Math.round(a),
		height: Math.round(s)
	};
}
function Mx(e, t) {
	return e?.mode === "custom" ? {
		width: e.width,
		height: e.height || 0
	} : {
		width: t,
		height: 0
	};
}
//#endregion
//#region src/lib/IconEditor.svelte
var Nx = /* @__PURE__ */ B("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\"> </h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\"></canvas> <p class=\"ie-hint svelte-e7sog7\"> </p></div> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"ghost svelte-e7sog7\"> </button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"primary svelte-e7sog7\"> </button></span></div></div>");
function Px(e, t) {
	$e(t, !0);
	let n = Ki(t, "image", 3, ""), r = /* @__PURE__ */ j(null), i = /* @__PURE__ */ j(null), a = /* @__PURE__ */ j(1), o = /* @__PURE__ */ j(.5), s = /* @__PURE__ */ j(.5), c = /* @__PURE__ */ j(1), l = /* @__PURE__ */ j(1), u = /* @__PURE__ */ j(1);
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
	var h = Nx(), g = N(h), _ = N(g), v = F(_, !0), y = I(_, 2), b = N(y);
	J(b, "width", 220), J(b, "height", 220), Hi(b, (e) => M(r, e), () => R(r));
	var x = F(I(b, 2), !0);
	O(y);
	var S = I(y, 2), C = N(S), w = F(I(C));
	O(S);
	var T = I(S, 2);
	G(T);
	var E = I(T, 2), ee = N(E), te = F(I(ee));
	O(E);
	var ne = I(E, 2);
	G(ne);
	var re = I(ne, 2), ie = N(re), ae = F(I(ie));
	O(re);
	var oe = I(re, 2);
	G(oe);
	var se = I(oe, 2), ce = N(se), le = F(I(ce));
	O(se);
	var ue = I(se, 2);
	G(ue);
	var de = I(ue, 2), fe = N(de), pe = F(fe, !0), me = I(fe, 2), he = F(me, !0);
	O(de);
	var ge = I(de, 2), _e = N(ge), ve = F(_e, !0), ye = I(_e, 2), be = F(ye, !0);
	O(ge), O(g), O(h), L((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) => {
		H(v, e), J(b, "title", t), H(x, n), H(C, `${r ?? ""} `), H(w, `${i ?? ""}x`), H(ee, `${a ?? ""} `), H(te, `${o ?? ""}%`), H(ie, `${s ?? ""} `), H(ae, `${c ?? ""}%`), H(ce, `${l ?? ""} `), H(le, `${u ?? ""}%`), H(pe, d), H(he, f), H(ve, p), H(be, m);
	}, [
		() => Y("ie.title"),
		() => Y("ie.dragTip"),
		() => Y("ie.hint"),
		() => Y("lbl.zoom"),
		() => R(a).toFixed(2),
		() => Y("lbl.brightness"),
		() => Math.round(R(c) * 100),
		() => Y("lbl.contrast"),
		() => Math.round(R(l) * 100),
		() => Y("lbl.saturate"),
		() => Math.round(R(u) * 100),
		() => Y("ie.grayscale"),
		() => Y("common.reset"),
		() => Y("confirm.cancel"),
		() => Y("common.apply")
	]), z("pointerdown", b, f), Ii(T, () => R(a), (e) => M(a, e)), Ii(ne, () => R(c), (e) => M(c, e)), Ii(oe, () => R(l), (e) => M(l, e)), Ii(ue, () => R(u), (e) => M(u, e)), z("click", fe, () => M(u, 0)), z("click", me, p), z("click", _e, () => t.oncancel?.()), z("click", ye, m), V(e, h), et();
}
Mr(["pointerdown", "click"]);
//#endregion
//#region ../template/assets/engine/0.7.4/calendar-thumb.js
var Fx = "#0e1512", Ix = "#2fd6b6", Lx = "#5c6b64", Rx = "#22302a", zx = "#e8efe9", Bx = "#16221d", Vx = "#1c2340", Hx = "#f3ecd8", Ux = "#d0a74a", Wx = (e) => e < 1 ? ` opacity="${e}"` : "", $ = (e, t, n, r, i, a = 1, o = 2) => `<rect x="${e}" y="${t}" width="${n}" height="${r}" rx="${o}" fill="${i}"${Wx(a)}/>`, Gx = (e, t, n, r, i = 1) => `<circle cx="${e}" cy="${t}" r="${n}" fill="${r}"${Wx(i)}/>`, Kx = (e, t, n, r, i, a = 1, o = 1) => `<line x1="${e}" y1="${t}" x2="${n}" y2="${r}" stroke="${i}" stroke-width="${a}"${Wx(o)}/>`, qx = (e, t, n, r) => Array.from({ length: e }, (e, i) => r(t + i * n, i)).join(""), Jx = (e, t = Fx) => `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${t}"/>${e}</svg>`;
function Yx(e, t, n, r, i, a = Lx) {
	let o = "", s = n / 7, c = r / 4;
	for (let n = 0; n < 28; n++) {
		let r = e + n % 7 * s + s / 2, l = t + Math.floor(n / 7) * c + c / 2;
		o += Gx(r, l, 1.6, i.includes(n) ? Ix : a, i.includes(n) ? 1 : .55);
	}
	return o;
}
var Xx = {
	plain: () => qx(3, 12, 20, (e) => $(14, e, 14, 14, Rx, 1, 3) + $(34, e + 2, 70, 4, Lx, .9) + $(34, e + 9, 46, 3, Lx, .5)),
	timeline: () => Kx(50, 10, 50, 70, Lx, 1.2, .7) + qx(3, 16, 22, (e, t) => $(18, e - 3, 24, 5, Lx, .9) + Gx(50, e, 3.4, t ? Lx : Ix) + $(60, e - 3, 62, 4, Lx, .9) + $(60, e + 4, 40, 3, Lx, .5)),
	table: () => $(12, 10, 136, 10, Ix, 1, 3) + qx(4, 26, 12, (e, t) => (t % 2 ? $(12, e - 3, 136, 12, Rx, .8, 0) : "") + $(16, e, 20, 3, Lx, .9) + $(44, e, 14, 3, Lx, .5) + $(66, e, 44, 3, Lx, .9) + $(118, e, 24, 3, Lx, .5)),
	booklet: () => $(12, 8, 136, 64, zx, 1, 2) + $(20, 14, 40, 7, Bx) + Kx(20, 26, 140, 26, Bx, 1.4) + [20, 84].map((e) => qx(3, 32, 12, (t) => $(e, t, 8, 8, Ix, 1, 1) + $(e + 12, t, 36, 3, Bx, .85) + $(e + 12, t + 5, 26, 2.5, Bx, .4))).join(""),
	numbered: () => qx(3, 12, 20, (e) => Kx(14, e - 3, 146, e - 3, Lx, .8, .6) + $(14, e, 14, 12, Ix, 1, 2) + $(36, e + 1, 64, 4, Lx, .9) + $(36, e + 8, 44, 3, Lx, .5) + $(120, e + 3, 24, 4, Ix, .7)),
	apList: () => qx(3, 10, 21, (e) => $(12, e, 136, 17, Vx, 1, 2) + $(18, e + 4, 10, 9, Ux, 1, 1) + Kx(34, e + 3, 34, e + 14, Ux, .8, .5) + $(40, e + 4, 26, 3, Ux, .8) + $(40, e + 10, 56, 3.5, Hx, .9)),
	glass: () => Gx(30, 14, 34, "#ff8a65", .55) + Gx(132, 70, 36, "#7fd1c4", .55) + Gx(100, 10, 20, "#ffd36b", .4) + qx(3, 12, 20, (e) => $(14, e, 132, 15, "#ffffff", .32, 6) + $(20, e + 4, 9, 7, zx, .9, 1) + $(36, e + 4, 50, 3, zx, .9) + $(36, e + 9, 34, 2.5, zx, .5)),
	posters: () => $(12, 10, 62, 60, Ix, 1, 4) + $(20, 30, 18, 20, Bx, .9, 2) + $(20, 56, 40, 4, Bx, .8) + $(80, 10, 32, 28, zx, 1, 4) + $(86, 16, 10, 10, Bx, .8, 1) + $(116, 10, 32, 28, "#bfe9df", 1, 4) + $(122, 16, 10, 10, Bx, .8, 1) + $(80, 42, 32, 28, Rx, 1, 4) + $(86, 48, 10, 10, Ix, 1, 1) + $(116, 42, 32, 28, Rx, .5, 4),
	tickets: () => qx(3, 10, 21, (e) => $(12, e, 136, 17, Rx, 1, 4) + $(12, e, 30, 17, Ix, 1, 4) + $(20, e + 4, 12, 9, Bx, .85, 1) + Kx(42, e + 1, 42, e + 16, Fx, 1.6) + $(50, e + 4, 50, 3.5, Lx, .95) + $(50, e + 10, 34, 2.5, Lx, .55) + $(120, e + 5, 22, 7, Ix, .85)),
	carousel: () => [
		12,
		50,
		88,
		126
	].map((e, t) => $(e, 14, 34, 54, t ? Rx : Ix, 1, 4) + $(e + 6, 22, 12, 14, t ? Ix : Bx, .9, 1) + $(e + 6, 50, 22, 3, t ? Lx : Bx, .9) + $(e + 6, 56, 14, 2.5, t ? Lx : Bx, .5)).join(""),
	photo: () => [
		12,
		60,
		108
	].map((e) => $(e, 12, 40, 56, Rx, 1, 4) + $(e, 12, 40, 26, Ix, .45, 4) + $(e + 4, 16, 12, 6, zx, .95, 1) + $(e + 5, 44, 28, 3.5, Lx, .95) + $(e + 5, 51, 20, 2.5, Lx, .5) + $(e + 5, 58, 14, 5, Ix, .9)).join(""),
	apGrid: () => [
		12,
		60,
		108
	].map((e) => $(e, 12, 40, 56, Hx, 1, 2) + $(e, 12, 40, 16, Vx, 1, 2) + Kx(e, 28, e + 40, 28, Ux, 1.4) + $(e + 4, 16, 8, 8, Ux, 1, 1) + $(e + 22, 18, 14, 4, Ux, .9) + $(e + 5, 36, 28, 4, Vx, .9) + $(e + 5, 44, 18, 2.5, Vx, .55) + $(e + 5, 52, 24, 2.5, Vx, .4)).join(""),
	bento: () => $(12, 10, 66, 40, zx, 1, 6) + $(18, 14, 16, 5, Ix, 1, 2) + $(18, 28, 14, 14, Bx, .9, 1) + $(36, 38, 34, 4, Bx, .8) + $(82, 10, 31, 18, Rx, 1, 5) + $(117, 10, 31, 18, Rx, 1, 5) + $(82, 32, 66, 18, Rx, 1, 5) + Yx(86, 34, 58, 14, [
		9,
		12,
		19
	]) + $(12, 54, 31, 18, zx, 1, 5) + $(47, 54, 31, 18, Ix, .4, 5) + $(82, 54, 66, 18, Rx, 1, 5) + $(88, 60, 30, 4, Lx, .9),
	weekStrip: () => $(60, 8, 40, 5, Lx, .9) + Array.from({ length: 7 }, (e, t) => $(12 + t * 19.6, 20, 17, 50, t === 3 ? Ix : Rx, t === 3 ? .25 : 1, 3) + $(15 + t * 19.6, 24, 6, 5, Lx, .9, 1) + ([
		1,
		3,
		5
	].includes(t) ? $(14 + t * 19.6, 36, 13, 7, Ix, 1, 2) : "")).join(""),
	weekPlan: () => $(12, 8, 136, 64, Rx, .6, 3) + qx(4, 22, 12, (e) => Kx(12, e, 148, e, Lx, .6, .6)) + Array.from({ length: 7 }, (e, t) => Kx(30 + t * 17, 14, 30 + t * 17, 72, Lx, .6, .6)).join("") + $(82, 14, 16, 58, Ix, .14, 0) + $(49, 36, 13, 10, Ix, .9, 2) + $(83, 48, 13, 14, Ix, .9, 2) + $(117, 24, 13, 9, zx, .7, 2),
	layers: () => $(12, 8, 136, 64, Rx, .6, 3) + $(70, 12, 22, 6, Ix, .9, 3) + $(96, 12, 22, 6, zx, .7, 3) + $(122, 12, 22, 6, Lx, .6, 3) + qx(3, 26, 15, (e, t) => Kx(12, e - 2, 148, e - 2, Lx, .6, .6) + $(16, e + 3, 16, 3, Lx, .9) + $([
		44,
		62,
		100
	][t], e + 1, [
		46,
		22,
		40
	][t], 8, [
		Ix,
		zx,
		"#7fd1c4"
	][t], .9, 3)),
	sidepanel: () => $(12, 8, 136, 64, Rx, .6, 3) + Yx(18, 18, 76, 48, [
		5,
		10,
		17,
		24
	]) + $(100, 8, 48, 64, Rx, 1, 3) + $(106, 14, 26, 5, zx, .9) + qx(2, 26, 16, (e) => $(106, e, 36, 12, Fx, 1, 2) + Kx(106, e, 106, e + 12, Ix, 2) + $(111, e + 3, 24, 3, Lx, .9)),
	apMonth: () => $(12, 8, 136, 64, Hx, 1, 2) + Kx(12, 8, 148, 8, Ux, 2.4) + $(58, 13, 44, 5, Vx, .9) + qx(4, 26, 12, (e) => Kx(12, e, 148, e, Ux, .6, .5)) + Array.from({ length: 6 }, (e, t) => Kx(31.4 + t * 19.4, 26, 31.4 + t * 19.4, 72, Ux, .6, .5)).join("") + $(54, 40, 14, 5, Ux, .6, 0) + Kx(54, 40, 54, 45, Ux, 2) + $(112, 52, 14, 5, Ux, .6, 0) + Kx(112, 52, 112, 57, Ux, 2) + Gx(98, 32, 3.4, Ux),
	dayPlan: () => $(34, 6, 92, 68, Rx, .6, 5) + $(42, 12, 40, 5, zx, .9) + Array.from({ length: 7 }, (e, t) => $(42 + t * 11, 22, 8, 9, t === 2 ? Ix : Rx, 1, 2)).join("") + qx(4, 38, 9, (e) => Kx(34, e, 126, e, Lx, .6, .6)) + $(56, 39, 62, 7, zx, .5, 2) + $(56, 57, 62, 7, Ix, .5, 2) + Kx(48, 51, 126, 51, Ix, 1.4) + Gx(48, 51, 2.2, Ix),
	yearWheel: () => `<circle cx="46" cy="40" r="24" fill="none" stroke="${Rx}" stroke-width="9"/><circle cx="46" cy="40" r="24" fill="none" stroke="${Lx}" stroke-width="9" stroke-dasharray="100 151" transform="rotate(-90 46 40)"${Wx(.8)}/><circle cx="46" cy="40" r="24" fill="none" stroke="${Ix}" stroke-width="9" stroke-dasharray="13 151" stroke-dashoffset="-100" transform="rotate(-90 46 40)"/>` + Gx(24, 32, 2, zx) + Gx(26, 50, 2, zx) + Gx(60, 60, 2, zx, .5) + $(38, 37, 16, 6, zx, .9) + $(88, 20, 20, 4, Ix) + qx(3, 30, 13, (e) => $(88, e, 56, 9, Rx, 1, 2) + $(92, e + 3, 34, 3, Lx, .9)),
	heatmap: () => $(12, 8, 136, 64, Rx, .6, 3) + Array.from({ length: 3 }, (e, t) => Array.from({ length: 28 }, (e, n) => $(18 + t * 44 + n % 7 * 5.4, 16 + Math.floor(n / 7) * 5.4, 4.2, 4.2, [
		3,
		11,
		16,
		24
	].includes((n + t * 5) % 28) ? Ix : Lx, [
		3,
		11,
		16,
		24
	].includes((n + t * 5) % 28) ? 1 : (n * 7 + t) % 5 == 0 ? .6 : .28, 1)).join("")).join("") + $(18, 46, 124, 9, Fx, .8, 2) + $(22, 49, 30, 3, zx, .8),
	billboard: () => $(34, 6, 92, 68, Bx, 1, 6) + Gx(42, 14, 2, Ix) + $(48, 12, 24, 4, Ix, .9) + $(42, 22, 60, 7, zx, .95) + [
		42,
		70,
		98
	].map((e) => $(e, 36, 22, 16, Rx, 1, 3) + $(e + 6, 40, 10, 7, zx, .9, 1)).join("") + $(42, 58, 78, 9, Ix, 1, 3),
	stacked: () => $(54, 10, 70, 44, Rx, .7, 5) + $(46, 16, 70, 44, Rx, 1, 5) + $(38, 22, 70, 44, zx, 1, 5) + $(44, 28, 22, 6, Ix, 1, 3) + $(44, 40, 44, 5, Bx, .9) + $(44, 49, 30, 3, Bx, .5) + $(44, 56, 20, 6, Ix, 1, 2),
	noticeboard: () => $(34, 6, 92, 68, "#8a5a3c", 1, 5) + $(42, 14, 64, 28, "#fff7cc", 1, 0) + Gx(74, 14, 3, "#d33a2c") + $(48, 22, 40, 5, Bx, .9) + $(48, 31, 28, 3, Bx, .5) + $(48, 46, 58, 20, "#d9ecff", 1, 0) + Gx(54, 46, 2.6, "#2f6fd6") + $(54, 53, 36, 4, Bx, .85) + $(54, 60, 44, 2.5, Bx, .45),
	split: () => $(16, 10, 128, 60, Rx, 1, 6) + $(16, 10, 44, 42, Ix, 1, 6) + $(24, 22, 20, 22, Bx, .9, 2) + $(68, 16, 20, 5, Lx, .7, 2) + $(68, 26, 58, 6, zx, .95) + $(68, 36, 40, 3, Lx, .7) + Kx(16, 52, 144, 52, Lx, .6, .6) + $(24, 58, 60, 3, Lx, .8) + $(24, 64, 44, 2.5, Lx, .5),
	band: () => $(8, 30, 144, 20, Ix, 1, 0) + $(8, 30, 40, 20, Bx, 1, 0) + Gx(16, 40, 2, Ix) + $(22, 38, 20, 4, zx, .9) + $(56, 38, 34, 4, Bx, .85) + Gx(96, 40, 1.8, Bx) + $(102, 38, 34, 4, Bx, .85) + Gx(142, 40, 1.8, Bx),
	oneLine: () => qx(3, 12, 20, (e, t) => $(12, e, 136, 15, Rx, t ? .7 : 1, 4) + Kx(12, e + 1, 12, e + 14, t ? Lx : Ix, 3) + Gx(22, e + 7.5, 2.4, t ? Lx : Ix) + $(30, e + 5.5, 20, 4, t ? Lx : Ix, .9) + $(56, e + 5.5, 54, 4, Lx, .9) + (t ? "" : $(124, e + 4, 18, 7, Ix, 1, 2))),
	ring: () => $(30, 6, 100, 68, Rx, 1, 8) + `<circle cx="58" cy="34" r="15" fill="none" stroke="${Lx}" stroke-width="5"${Wx(.5)}/><circle cx="58" cy="34" r="15" fill="none" stroke="${Ix}" stroke-width="5" stroke-linecap="round" stroke-dasharray="70 94" transform="rotate(-90 58 34)"/>` + $(53, 31, 10, 6, zx, .9, 1) + $(82, 24, 38, 6, zx, .95) + $(82, 35, 28, 3, Lx, .8) + Kx(38, 56, 122, 56, Lx, .6, .6) + $(38, 61, 50, 3, Lx, .7) + $(38, 67, 40, 3, Lx, .5),
	darkGlass: () => $(34, 6, 92, 68, "#121216", 1, 7) + Gx(112, 16, 22, Ix, .45) + Gx(46, 68, 20, "#3fb8a4", .35) + Gx(42, 14, 2, Ix) + $(48, 12, 22, 4, Ix, .9) + $(42, 22, 56, 6, zx, .95) + $(42, 34, 76, 3, Lx, .6, 1.5) + $(42, 34, 60, 3, Ix, 1, 1.5) + $(42, 42, 36, 9, zx, 1, 3) + $(82, 42, 36, 9, zx, .18, 3) + $(42, 56, 76, 14, zx, .1, 3) + $(47, 61, 40, 3, zx, .7),
	nextBento: () => $(40, 8, 80, 26, Ix, 1, 6) + $(46, 13, 22, 4, Bx, .8) + $(46, 23, 44, 5, Bx, .9) + $(40, 38, 38, 16, Rx, 1, 5) + $(82, 38, 38, 16, Rx, 1, 5) + $(40, 58, 38, 16, zx, 1, 5) + $(82, 58, 38, 16, Ix, .4, 5) + $(46, 42, 8, 7, zx, .9, 1) + $(88, 42, 8, 7, zx, .9, 1) + $(46, 62, 8, 7, Bx, .9, 1),
	apNow: () => $(40, 6, 80, 68, Hx, 1, 5) + $(40, 6, 80, 12, Vx, 1, 5) + Gx(47, 12, 1.8, Ux) + $(52, 10, 22, 4, Ux, .9) + $(46, 24, 14, 14, Vx, 1, 2) + $(50, 28, 6, 6, Ux, 1, 1) + $(66, 25, 44, 5, Vx, .9) + $(66, 34, 32, 3, Vx, .5) + $(40, 46, 80, 28, "#eae1c7", 1, 0) + Kx(48, 54, 48, 66, Ux, 1) + Gx(48, 54, 1.8, Ux) + Gx(48, 66, 1.8, Ux) + $(54, 52, 40, 3.5, Vx, .8) + $(54, 64, 34, 3.5, Vx, .8),
	apNavy: () => $(40, 6, 80, 68, Vx, 1, 5) + Gx(47, 13, 1.8, Ux) + $(52, 11, 22, 4, Ux, .9) + $(46, 20, 68, 22, Hx, 1, 3) + $(51, 25, 8, 10, Ux, 1, 1) + $(64, 25, 40, 5, Vx, .9) + $(64, 34, 26, 3, Vx, .5) + `<rect x="46" y="46" width="68" height="14" rx="3" fill="#262e4f" stroke="${Ux}" stroke-width="0.8"/>` + $(51, 50, 7, 6, Ux, 1, 1) + $(64, 51, 36, 4, Hx, .85) + $(46, 66, 50, 3, Hx, .6),
	apSeries: () => $(12, 8, 136, 64, "#f5efdd", 1, 2) + Kx(20, 17, 34, 17, Ux, 1) + $(38, 15, 26, 3.5, Ux, .9) + $(20, 24, 58, 8, "#7a1a1a") + $(20, 38, 64, 3, Vx, .6) + $(20, 44, 52, 3, Vx, .6) + [
		20,
		46,
		72
	].map((e) => $(e, 54, 12, 2.5, Ux, .9) + $(e, 60, 20, 3.5, Vx, .8)).join("") + Kx(100, 14, 100, 66, Ux, .8, .6) + $(108, 18, 30, 8, "#7a1a1a", .85) + $(108, 32, 32, 2.5, Vx, .5) + $(108, 38, 26, 2.5, Vx, .5),
	mobileAgenda: () => $(50, 4, 60, 72, "#121216", 1, 8) + $(56, 10, 22, 4, zx, .9) + Array.from({ length: 7 }, (e, t) => $(56 + t * 7.1, 18, 5.6, 9, t === 2 ? Ix : Rx, 1, 2)).join("") + qx(3, 32, 14, (e) => $(56, e, 48, 11, "#1c1c22", 1, 3) + Kx(67, e + 2, 67, e + 9, Ix, 1.4) + $(58, e + 4, 6, 3, Lx, .8) + $(70, e + 3, 26, 3, zx, .85))
};
Object.keys(Xx);
function Zx(e) {
	let t = Xx[e] ?? Xx.plain, n = ["booklet"].includes(e);
	return Jx(t(), n ? "#1a2620" : Fx);
}
//#endregion
//#region src/lib/DesignPicker.svelte
var Qx = /* @__PURE__ */ B("<button type=\"button\"> </button>"), $x = /* @__PURE__ */ B("<img alt=\"\" loading=\"lazy\" decoding=\"async\" class=\"svelte-wurosr\"/>"), eS = /* @__PURE__ */ B("<span class=\"dp-mark svelte-wurosr\"> </span>"), tS = /* @__PURE__ */ B("<button type=\"button\"><span class=\"dp-pic svelte-wurosr\"><!></span> <span class=\"dp-name svelte-wurosr\"> </span> <!></button>"), nS = /* @__PURE__ */ B("<section class=\"dp-family svelte-wurosr\"><h3 class=\"svelte-wurosr\"> </h3> <div class=\"dp-grid svelte-wurosr\"></div></section>"), rS = /* @__PURE__ */ B("<p class=\"dp-none svelte-wurosr\"> </p>"), iS = /* @__PURE__ */ B("<span class=\"dp-side-view svelte-wurosr\"> </span>"), aS = /* @__PURE__ */ B("<dialog class=\"dp-overlay svelte-wurosr\"><div class=\"dp-card svelte-wurosr\"><div class=\"dp-head svelte-wurosr\"><h2 class=\"svelte-wurosr\"> </h2> <input class=\"dp-search svelte-wurosr\" type=\"search\"/> <span class=\"dp-count svelte-wurosr\"> </span> <button type=\"button\" class=\"dp-close svelte-wurosr\"><svg viewBox=\"0 0 16 16\" width=\"16\" height=\"16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" aria-hidden=\"true\"><path d=\"M3 3l10 10M13 3L3 13\"></path></svg></button></div> <div class=\"dp-views svelte-wurosr\" role=\"group\"><button type=\"button\"> </button> <!></div> <div class=\"dp-body svelte-wurosr\"><div class=\"dp-list svelte-wurosr\"><!> <!></div> <aside class=\"dp-side svelte-wurosr\"><div class=\"dp-side-head svelte-wurosr\"><strong> </strong> <!></div> <div class=\"dp-preview svelte-wurosr\"><div class=\"dp-stage svelte-wurosr\"><iframe src=\"/?preview=1\" class=\"svelte-wurosr\"></iframe></div></div> <button type=\"button\" class=\"dp-use svelte-wurosr\"> </button></aside></div></div></dialog>");
function oS(e, t) {
	$e(t, !0);
	let n = Ki(t, "current", 3, null), r = Ki(t, "mode", 3, "set"), i = Ki(t, "site", 3, null), a = Ki(t, "page", 3, null), o = {
		list: "calendar.viewList",
		cards: "calendar.viewCards",
		month: "calendar.viewMonth",
		agenda: "calendar.viewAgenda",
		next: "calendar.viewNext",
		week: "calendar.viewWeek",
		day: "calendar.viewDay",
		year: "calendar.viewYear"
	}, s = 1040, c = /* @__PURE__ */ j(""), l = /* @__PURE__ */ j(""), u = /* @__PURE__ */ j(sn(n() ?? "plain")), d = /* @__PURE__ */ j(sn(/* @__PURE__ */ new Set())), f = /* @__PURE__ */ j(null), p = /* @__PURE__ */ j(0), m = /* @__PURE__ */ j(!1), h = /* @__PURE__ */ j(600), g = /* @__PURE__ */ j(null), _ = /* @__PURE__ */ j(null), v = (e) => !R(l) || e.view === null || e.view === R(l), y = (e) => v(e) && (!R(c).trim() || Y(e.labelKey).toLowerCase().includes(R(c).trim().toLowerCase())), b = /* @__PURE__ */ A(() => Vo().map((e) => ({
		...e,
		designs: e.designs.filter(y)
	})).filter((e) => e.designs.length)), x = /* @__PURE__ */ A(() => R(b).reduce((e, t) => e + t.designs.length, 0)), S = /* @__PURE__ */ A(() => ts(R(u))), C = /* @__PURE__ */ A(() => R(p) ? Math.min(1, R(p) / s) : .4);
	Dn(() => {
		R(_) && !R(_).open && R(_).showModal(), R(g)?.focus();
	});
	function w(e) {
		let t = ts(e), n = {
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
	function E() {
		let e = R(f)?.contentDocument, t = e?.querySelector(".urd-block[data-block-id=\"design-picker-cal\"]");
		if (!t) return;
		let n = t.getBoundingClientRect().bottom + (e.defaultView?.scrollY ?? 0), r = Math.max(160, Math.ceil(n + 24));
		r !== R(h) && M(h, r, !0);
	}
	let ee = null, te = null;
	function ne() {
		ee?.disconnect(), ee = null;
		let e = R(f)?.contentWindow;
		if (!e?.ResizeObserver) return;
		let t = 0, n = () => {
			let r = e.document.querySelector(".urd-block[data-block-id=\"design-picker-cal\"]");
			r && r !== te ? (te = r, ee = new e.ResizeObserver(E), ee.observe(r), E()) : t++ < 300 && e.requestAnimationFrame(n);
		};
		n();
	}
	function re() {
		T({
			type: "urd-preview-full",
			pageId: "design-picker",
			page: w(R(u))
		}), ne();
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
		R(u), R(m) && re();
	}), Dn(() => () => ee?.disconnect());
	function ae() {
		t.onclose?.();
	}
	function oe(e) {
		M(d, /* @__PURE__ */ new Set([...R(d), e]), !0);
	}
	var se = aS();
	jr("message", cn, ie);
	var ce = N(se), le = N(ce), ue = N(le), de = F(ue, !0), fe = I(ue, 2);
	G(fe), Hi(fe, (e) => M(g, e), () => R(g));
	var pe = I(fe, 2), me = F(pe, !0), he = I(pe, 2);
	O(le);
	var ge = I(le, 2), _e = N(ge);
	let ve;
	var ye = F(_e, !0);
	ni(I(_e, 2), 16, () => No, (e) => e, (e, t) => {
		var n = Qx();
		let r;
		var i = F(n, !0);
		L((e) => {
			J(n, "aria-pressed", R(l) === t), r = Ei(n, 1, "svelte-wurosr", null, r, { on: R(l) === t }), H(i, e);
		}, [() => Y(o[t])]), z("click", n, () => M(l, t, !0)), V(e, n);
	}), O(ge);
	var be = I(ge, 2), xe = N(be), Se = N(xe);
	ni(Se, 17, () => R(b), (e) => e.family, (e, r) => {
		var i = nS(), a = N(i), o = F(a, !0), s = I(a, 2);
		ni(s, 21, () => R(r).designs, (e) => e.id, (e, r) => {
			var i = tS();
			let a;
			var o = N(i), s = N(o), c = (e) => {
				var t = Vr();
				W(P(t), () => Zx(R(r).id)), V(e, t);
			}, l = /* @__PURE__ */ A(() => R(d).has(R(r).id)), f = (e) => {
				var t = $x();
				L(() => J(t, "src", `/admin/designs/${R(r).id}.webp`)), jr("error", t, () => oe(R(r).id)), kr(t), V(e, t);
			};
			U(s, (e) => {
				R(l) ? e(c) : e(f, -1);
			}), O(o);
			var p = I(o, 2), m = F(p, !0), h = I(p, 2), g = (e) => {
				var t = eS(), n = F(t, !0);
				L((e) => H(n, e), [() => Y("calendar.picker.current")]), V(e, t);
			};
			U(h, (e) => {
				n() !== null && R(r).id === n() && e(g);
			}), O(i), L((e, t) => {
				a = Ei(i, 1, "dp-tile svelte-wurosr", null, a, {
					on: R(r).id === R(u),
					current: n() !== null && R(r).id === n()
				}), J(i, "aria-pressed", R(r).id === R(u)), J(i, "title", e), H(m, t);
			}, [() => Y(R(r).labelKey), () => Y(R(r).labelKey)]), z("click", i, () => M(u, R(r).id, !0)), z("dblclick", i, () => t.onpick?.(R(r).id)), V(e, i);
		}), O(s), O(i), L((e) => H(o, e), [() => Y(R(r).labelKey)]), V(e, i);
	});
	var Ce = I(Se, 2), we = (e) => {
		var t = rS(), n = F(t, !0);
		L((e) => H(n, e), [() => Y("calendar.picker.none")]), V(e, t);
	};
	U(Ce, (e) => {
		R(b).length || e(we);
	}), O(xe);
	var Te = I(xe, 2), Ee = N(Te), D = N(Ee), De = F(D, !0), Oe = I(D, 2), ke = (e) => {
		var t = iS(), n = F(t, !0);
		L((e) => H(n, e), [() => Y(o[R(S).view])]), V(e, t);
	};
	U(Oe, (e) => {
		R(S).view && e(ke);
	}), O(Ee);
	var k = I(Ee, 2), Ae = N(k), je = N(Ae);
	Hi(je, (e) => M(f, e), () => R(f)), O(Ae), O(k);
	var Me = I(k, 2), Ne = F(Me, !0);
	O(Te), O(be), O(ce), O(se), Hi(se, (e) => M(_, e), () => R(_)), L((e, t, n, r, i, a, o, c, u, d, f) => {
		J(se, "aria-label", e), H(de, t), J(fe, "placeholder", n), J(fe, "aria-label", r), H(me, i), J(he, "aria-label", a), J(he, "title", o), J(_e, "aria-pressed", R(l) === ""), ve = Ei(_e, 1, "svelte-wurosr", null, ve, { on: R(l) === "" }), H(ye, c), H(De, u), Oi(Ae, `width:${s * R(C)}px; height:${R(h) * R(C)}px`), J(je, "title", d), Oi(je, `width:1040px; height:${R(h) ?? ""}px; transform:scale(${R(C) ?? ""}); transform-origin:top left`), H(Ne, f);
	}, [
		() => Y("calendar.picker.title"),
		() => Y("calendar.picker.title"),
		() => Y("calendar.picker.search"),
		() => Y("calendar.picker.search"),
		() => Y("calendar.picker.count", { n: R(x) }),
		() => Y("ui.close"),
		() => Y("ui.close"),
		() => Y("calendar.picker.all"),
		() => Y(R(S).labelKey),
		() => Y("calendar.picker.preview", { name: Y(R(S).labelKey) }),
		() => r() === "add" ? Y("calendar.picker.add") : Y("calendar.picker.use")
	]), jr("close", se, ae), Ii(fe, () => R(c), (e) => M(c, e)), z("click", he, () => t.onclose?.()), z("click", _e, () => M(l, "")), Bi(k, "clientWidth", (e) => M(p, e)), z("click", Me, () => t.onpick?.(R(u))), V(e, se), et();
}
Mr(["click", "dblclick"]);
//#endregion
//#region ../template/assets/engine/0.7.4/plugins.js
function sS(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var cS = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function lS(e, t) {
	let n = sS(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = sS(t[2]), a = cS(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var uS = /^[a-z0-9][a-z0-9-]*$/;
function dS(e) {
	let t = [];
	if (!e || typeof e != "object") return ["the manifest is not an object"];
	uS.test(e.id ?? "") || t.push("id is missing or invalid"), (typeof e.name != "string" || !e.name) && t.push("name is missing"), sS(e.version ?? "") || t.push("version is not semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine is missing");
	let n = Array.isArray(e.languages) && e.languages.length > 0;
	return (e.entry !== void 0 || !n) && (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry is missing or is not a .js file"), (e.provides !== void 0 || !n) && (!e.provides || typeof e.provides != "object") && t.push("provides is missing"), e.languages !== void 0 && t.push(...$i(e.languages)), e.locales !== void 0 && typeof e.locales != "boolean" && t.push("locales must be a boolean"), e.names !== void 0 && (typeof e.names != "object" || e.names === null || Array.isArray(e.names) || Object.values(e.names).some((e) => typeof e != "string" || !e)) && t.push("names must be an object mapping language code to name"), t;
}
Promise.resolve();
//#endregion
//#region ../template/assets/engine/0.7.4/templates-model.js
var fS = [
	"section",
	"blocks",
	"page"
];
function pS(e) {
	return Vl(String(e ?? ""), "");
}
function mS(e, t, { id: n, title: r }) {
	let i = structuredClone(e);
	i.meta = {
		...i.meta,
		id: n,
		title: r
	};
	for (let e of i.sections ?? []) {
		e.id = t("sec");
		for (let n of e.blocks ?? []) n.id = t("blk");
		Lv(e), Iv(e), Rv(e);
	}
	return i;
}
//#endregion
//#region ../template/assets/engine/0.7.4/feeds.js
function hS(e) {
	return String(e ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&apos;");
}
function gS(e, t) {
	let n = String(t ?? "").replace(/\/+$/, "");
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${(e ?? []).filter((e) => !e.noindex).map((e) => `  <url><loc>${hS(n + (e.path === "/" ? "/" : e.path))}</loc></url>`).join("\n")}\n</urlset>\n`;
}
function _S(e) {
	return `User-agent: *\nDisallow: /admin/\n\nSitemap: ${String(e ?? "").replace(/\/+$/, "")}/sitemap.xml\n`;
}
var vS = [
	"news",
	"notices",
	"publications"
];
function yS(e) {
	let t = String(e.origin ?? "").replace(/\/+$/, ""), n = (e.items ?? []).map((n) => {
		let r = n.href ? new URL(n.href, t + "/").href : t + "/", i = n.date ? new Date(n.date) : null, a = i && !Number.isNaN(i.getTime()) ? `\n      <pubDate>${i.toUTCString()}</pubDate>` : "", o = n.text ? `\n      <description>${hS(n.text)}</description>` : "";
		return `    <item>\n      <title>${hS(n.title)}</title>\n      <link>${hS(r)}</link>\n      <guid isPermaLink="false">${hS(`${e.path}#${n.id ?? n.title}`)}</guid>${o}${a}\n    </item>`;
	}).join("\n");
	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${hS(e.title)}</title>\n    <link>${hS(t + "/")}</link>\n    <description>${hS(e.description ?? e.title)}</description>\n${n}${n ? "\n" : ""}  </channel>\n</rss>\n`;
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/color.js
var bS = {
	version: 1,
	label: "Colour",
	labelKey: "bgLayer.color",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = Mm(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, xS = {
	linear: [
		"pan",
		"pan-loop",
		"rotate"
	],
	radial: ["pulse", "orbit"]
};
function SS(e) {
	let t = Array.isArray(e) && e.length ? e : [{ color: "#0b0e14" }, { color: "#1a1030" }], n = t.map((e) => Math.max(0, Number(e?.share) || 0)), r = n.reduce((e, t) => e + t, 0), i = r <= 0, a = i ? t.length : r, o = 0;
	return t.map((e, t) => {
		let r = i ? 1 : n[t], s = (o + r / 2) / a * 100;
		return o += r, {
			color: e?.color ?? "#0b0e14",
			at: Math.round(s * 100) / 100
		};
	});
}
function CS(e) {
	let t = (e) => Math.round(e * 100) / 100, n = e[0]?.at ?? 0;
	return [...e.map((e) => ({
		color: e.color,
		at: t(e.at - n)
	})), {
		color: e[0]?.color ?? "#0b0e14",
		at: 100
	}];
}
function wS(e, t, n, r = .5) {
	let i = n % 360 * Math.PI / 180, a = (e) => Math.round(e * 100) / 100 || 0, o = (Math.abs(e * Math.sin(i)) + Math.abs(t * Math.cos(i))) / (1 - Math.min(Math.max(r, 0), .9));
	return {
		period: a(o),
		dx: a(Math.sin(i) * o),
		dy: a(-Math.cos(i) * o)
	};
}
function TS(e, t, n) {
	return `repeating-linear-gradient(${t}deg, ${e.map((e) => `${Mm(e.color)} ${Math.round(e.at / 100 * n * 100) / 100}px`).join(", ")})`;
}
function ES(e) {
	let t = e.kind === "radial" ? "radial" : "linear", n = (xS[t] ?? []).includes(e.animation) ? e.animation : null, r = SS(e.stops), i = r.map((e) => `${Mm(e.color)} ${e.at}%`).join(", "), a = {}, o;
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
					stops: CS(r),
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
var DS = /* @__PURE__ */ new Set(), OS = !1;
function kS(e) {
	DS.add(e), !(OS || typeof window > "u") && (OS = !0, window.addEventListener("resize", () => {
		for (let e of [...DS]) e() || DS.delete(e);
	}));
}
var AS = !1;
function jS() {
	if (!AS) {
		AS = !0;
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
var MS = {
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
		let n = ES(t);
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
					let e = wS(r, i, n.loop.angle, n.loop.maxShare);
					t.style.inset = `${-Math.ceil(e.period)}px`, t.style.background = TS(n.loop.stops, n.loop.angle, e.period), t.style.setProperty("--urd-loop-dx", `${e.dx}px`), t.style.setProperty("--urd-loop-dy", `${e.dy}px`);
				}
				return !0;
			};
			requestAnimationFrame(r), kS(r);
			return;
		}
		if (n.runner) {
			e.classList.add("urd-bg-loop-host");
			let t = document.createElement("div");
			t.className = n.runner.className, t.style.background = n.runner.background, n.runner.left != null && (t.style.left = n.runner.left), n.runner.top != null && (t.style.top = n.runner.top), e.appendChild(t);
			return;
		}
		e.style.background = n.background, n.className && (e.classList.add(n.className), n.className === "urd-bg-rotate" && jS());
	}
}, NS = /^(?:data:video\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/media\/[\w%./-]+\.(?:mp4|webm))$/i;
function PS(e) {
	return typeof e == "string" && NS.test(e);
}
var FS = null;
function IS(e) {
	FS ??= new IntersectionObserver((e) => {
		for (let t of e) {
			if (!t.target.isConnected) {
				FS.unobserve(t.target);
				continue;
			}
			t.isIntersecting ? t.target.play().catch(() => {}) : t.target.pause();
		}
	}, { threshold: 0 }), FS.observe(e);
}
var LS = (e, t, n, r) => {
	e.style.position = "absolute", e.style.inset = "0", e.style.width = "100%", e.style.height = "100%", e.style.objectFit = t === "contain" ? "contain" : "cover", e.style.objectPosition = ch(n, r);
}, RS = {
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
		if (!PS(t.src)) return;
		if (e.style.opacity = String(t.opacity ?? 1), window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
			if (!Xm(t.poster)) return;
			let n = document.createElement("img");
			n.className = "urd-bg-video-poster", n.alt = "", n.setAttribute("aria-hidden", "true"), n.src = t.poster, LS(n, t.fit, t.x, t.y), e.appendChild(n);
			return;
		}
		let n = document.createElement("video");
		n.className = "urd-bg-video", n.muted = !0, n.setAttribute("muted", ""), n.loop = !0, n.playsInline = !0, n.setAttribute("playsinline", ""), n.preload = "metadata", n.disablePictureInPicture = !0, n.setAttribute("aria-hidden", "true"), Xm(t.poster) && (n.poster = t.poster), n.src = t.src, LS(n, t.fit, t.x, t.y), e.appendChild(n), IS(n), t.parallax > 0 && kh(n, t.parallax, 0, t.fit === "contain" ? "contain" : "cover");
	}
}, zS = () => ({
	duration: 600,
	delay: 0
}), BS = 90, VS = {
	"fade-in": {
		version: 1,
		label: "Fade in",
		labelKey: "anim.fadeIn",
		entrance: !0,
		defaults: zS,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Slide up",
		labelKey: "anim.slideUp",
		entrance: !0,
		defaults: zS,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom in",
		labelKey: "anim.zoomIn",
		entrance: !0,
		defaults: zS,
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
			step: BS,
			effect: "slide-up",
			pattern: "sequence"
		}),
		migrations: {}
	}
};
//#endregion
//#region ../template/assets/engine/0.7.4/place.js
function HS(e) {
	let t = (e) => Math.round(e * 100) / 100, n = Math.max(0, t(100 - e.w)), r = Math.min(n, Math.max(0, t(e.x - e.w / 2))), i = Math.max(0, e.y - e.h / 2), a = e.snap === !1 || e.grid?.snap === !1, o = e.grid?.size || 8;
	return i = a ? Math.round(i) : Math.round(i / o) * o, {
		x: r,
		y: Math.max(0, i)
	};
}
//#endregion
//#region src/App.svelte
var US = /* @__PURE__ */ B("<button class=\"chrome-restore\"><!> </button>"), WS = /* @__PURE__ */ B("<button><!> </button>"), GS = /* @__PURE__ */ B("<div class=\"tool-pop\"></div>"), KS = /* @__PURE__ */ B("<span class=\"toolmenu\"><button><!><!></button> <!></span>"), qS = /* @__PURE__ */ B("<button></button>"), JS = /* @__PURE__ */ B("<span class=\"tool-cap\"> </span> <span class=\"viewswitch toolgrp\"></span>", 1), YS = /* @__PURE__ */ B("<div class=\"tool-pop\"><div class=\"tool-pop-row\"><button class=\"ghost\"></button> <span class=\"zoom-readout\"> </span> <button class=\"ghost\"></button></div> <button><!> </button></div>"), XS = /* @__PURE__ */ B("<span class=\"toolmenu\"><button><span class=\"zoom-cap\"> </span><!></button> <!></span>"), ZS = /* @__PURE__ */ B("<span class=\"tool-cap\"> </span> <span class=\"zoomswitch toolgrp\"><button class=\"ghost\"></button> <span class=\"zoom-readout\"> </span> <button class=\"ghost\"></button> <button></button></span>", 1), QS = /* @__PURE__ */ B("<div class=\"tool-pop\"><button><!> </button> <button><!> </button></div>"), $S = /* @__PURE__ */ B("<span class=\"tool-cap\"> </span> <span class=\"toolgrp\"><button></button> <button></button></span>", 1), eC = /* @__PURE__ */ B("<button class=\"ghost page-btn\"> </button> <span class=\"toolset\"><!> <!> <!></span>", 1), tC = /* @__PURE__ */ B("<button class=\"badge attention\"><!> <span class=\"btn-label\"> </span> <span class=\"badge-mini\"> </span></button>"), nC = /* @__PURE__ */ B("<button class=\"discard-confirm\"><!> </button>"), rC = /* @__PURE__ */ B("<span class=\"draft-cluster\"><span class=\"chip draft-chip\"><span class=\"chip-full\" aria-hidden=\"true\"> </span> <span class=\"chip-mini\" aria-hidden=\"true\">!</span></span>  <span class=\"discard-wrap\"><button><!><span class=\"discard-label\"> </span></button> <!></span></span>"), iC = /* @__PURE__ */ B("<!> <span class=\"btn-label\"> </span>", 1), aC = /* @__PURE__ */ B("<span class=\"who\"><!> </span>"), oC = /* @__PURE__ */ B("<a class=\"ghost\" href=\"/api/github/login\"> </a>"), sC = /* @__PURE__ */ B("<button class=\"ghost\"><!></button> <!> <a class=\"ghost\" target=\"_blank\" rel=\"noopener\"><!> <span class=\"btn-label\"> </span></a> <button class=\"primary\"> </button>", 1), cC = /* @__PURE__ */ B("<button> </button>"), lC = /* @__PURE__ */ B("<span class=\"rail-group\"> </span> <!>", 1), uC = /* @__PURE__ */ B("<div class=\"ctl-row\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\" step=\"10\"/> <span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\" min=\"0\" step=\"10\" placeholder=\"0\"/></div>"), dC = /* @__PURE__ */ B("<p class=\"mini-label\"> </p> <label> <input type=\"text\" spellcheck=\"false\"/></label>", 1), fC = /* @__PURE__ */ B("<div class=\"settings-pop\"><p class=\"panel-strong\"> </p> <label> <!></label> <label> <!></label> <label> <!></label> <label> <!></label> <label> <!></label> <p class=\"mini-label\"> </p> <div class=\"seg\"><button type=\"button\"> </button> <button type=\"button\"> </button></div> <!> <!></div>"), pC = /* @__PURE__ */ B("<button type=\"button\"></button>"), mC = /* @__PURE__ */ B("<aside><div class=\"panel-head\"><h2> </h2> <!></div> <!></aside>"), hC = /* @__PURE__ */ B("<div class=\"workspace\"><nav><!> <span class=\"rail-settings\"><span class=\"rail-brand\" title=\"Urd\"><svg class=\"brand-mark\" viewBox=\"10.3 8.3 19.4 25.4\" aria-hidden=\"true\"><path d=\"M12 32V10l16 6.5V32\" fill=\"none\" stroke=\"var(--urd-brand)\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg> <span class=\"brand-word\">Urd</span></span> <button></button> <!></span></nav> <!> <div><div class=\"stage\"><iframe></iframe></div></div></div>"), gC = /* @__PURE__ */ B("<p class=\"loading\"> </p>"), _C = /* @__PURE__ */ B("<p class=\"panel-hint confirm-line\"> </p>"), vC = /* @__PURE__ */ B("<input/>"), yC = /* @__PURE__ */ B("<div class=\"setup-overlay\"><div class=\"setup-card\"><h2> </h2> <!> <!> <span class=\"setup-actions\"><button class=\"ghost\"> </button> <button class=\"primary\"> </button></span></div></div>"), bC = /* @__PURE__ */ B("<div class=\"setup-overlay\"><div class=\"setup-card\"><h2> </h2> <p class=\"panel-hint\"> </p> <label> <input/></label> <label> <!></label> <label> <!></label> <p class=\"panel-hint\"> </p> <span class=\"setup-actions\"><button class=\"ghost\"> </button> <button class=\"primary\"> </button></span></div></div>"), xC = /* @__PURE__ */ B("<div><span> </span> <button class=\"toast-x\">×</button></div>"), SC = /* @__PURE__ */ B("<div class=\"editor\"><!> <header><span class=\"topbar-group\"><!> <!></span> <span class=\"topbar-group topbar-draft\"><!></span> <span class=\"topbar-group topbar-right\"><!></span></header> <!> <!> <!> <!> <!> <!></div> <!>", 1);
function CC(e, t) {
	$e(t, !0);
	let n = [
		["color", bS],
		["gradient", MS],
		["glow", ex],
		["image", Oh],
		["slideshow", og],
		["video", RS],
		["pattern", Jm],
		["grain", nx]
	], r = Object.fromEntries(n), i = [
		["purple", Y("adminTheme.purple")],
		["well", Y("adminTheme.well")],
		["gold", Y("adminTheme.gold")],
		["grey", Y("adminTheme.grey")],
		["aurora", Y("adminTheme.aurora")],
		["dusk", Y("adminTheme.dusk")],
		["ember", Y("adminTheme.ember")]
	], a = {
		lilla: "purple",
		bronn: "well",
		gull: "gold",
		graa: "grey",
		nordlys: "aurora",
		skumring: "dusk",
		glo: "ember"
	}, o = /* @__PURE__ */ j(sn((() => {
		let e = localStorage.getItem("urd-admin-theme");
		return a[e] ?? e ?? "grey";
	})()));
	Dn(() => {
		document.documentElement.dataset.adminTheme = R(o), localStorage.setItem("urd-admin-theme", R(o)), s();
	});
	function s() {
		let e = getComputedStyle(document.documentElement), t = e.getPropertyValue("--urd-color-accent").trim();
		ke?.sendAdminTheme({
			bg: e.getPropertyValue("--urd-color-bg").trim(),
			surface: e.getPropertyValue("--urd-color-surface").trim(),
			accent: t,
			text: e.getPropertyValue("--urd-color-text").trim(),
			"accent-text": c(t)
		});
	}
	function c(e) {
		return Im(e) == null || (Lm(e, "#ffffff") ?? 0) >= (Lm(e, "#0b0e14") ?? 0) ? "#ffffff" : "#0b0e14";
	}
	let l = /* @__PURE__ */ j(null), u = /* @__PURE__ */ j(null), d = /* @__PURE__ */ j(!1), f = /* @__PURE__ */ j(""), p = /* @__PURE__ */ j("info"), m = 0;
	function h(e, t = "info") {
		M(f, e, !0), M(p, t, !0);
		let n = ++m;
		t === "ok" && setTimeout(() => {
			m === n && (M(f, ""), M(p, "info"));
		}, 8e3);
	}
	function g() {
		h(Y("status.storageFull"), "error");
	}
	function _(e, t) {
		try {
			localStorage.setItem(e, t);
		} catch {
			g();
		}
	}
	let v = /* @__PURE__ */ j(null), y = /* @__PURE__ */ j(null), b = /* @__PURE__ */ j(sn({
		size: 16,
		snap: !0
	})), x = /* @__PURE__ */ j(!0), S = /* @__PURE__ */ j(sn(Ax(typeof window < "u" ? window : null) ?? 1920)), C = "urd-admin-screen";
	function w() {
		let e = null;
		try {
			e = JSON.parse(localStorage.getItem(C) ?? "null");
		} catch {
			e = null;
		}
		return jx(e, R(S));
	}
	let T = /* @__PURE__ */ j(sn(w()));
	function E(e) {
		M(T, jx({
			...Ge(R(T)),
			...e
		}, R(S)), !0);
		try {
			localStorage.setItem(C, JSON.stringify(R(T)));
		} catch {}
	}
	let ee = /* @__PURE__ */ A(() => Mx(R(T), R(S))), te = [
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
	], ne = /* @__PURE__ */ A(() => [{
		id: "desktop",
		width: R(ee).width,
		height: R(ee).height || null,
		viewport: "desktop"
	}, ...te]);
	function re(e) {
		let t = Cb(R(yi), R(bi), e.width).width;
		return Y(e.id === "desktop" ? R(T).mode === "own" ? "tip.view.desktop" : e.height ? "tip.view.desktopSizeH" : "tip.view.desktopSize" : `tip.view.${e.id}`, {
			w: e.width,
			h: e.height ?? 0,
			c: t
		});
	}
	let ie = /* @__PURE__ */ j("desktop"), ae = /* @__PURE__ */ A(() => R(ne).find((e) => e.id === R(ie)) ?? R(ne)[0]), oe = /* @__PURE__ */ A(() => R(ae).viewport === "mobile" || R(ae).width <= (R(k)?.breakpoints?.mobile ?? 640) ? "mobile" : "desktop"), se = /* @__PURE__ */ j(null), ce = /* @__PURE__ */ j(0), le = /* @__PURE__ */ j(0), ue = /* @__PURE__ */ j("fit"), de = /* @__PURE__ */ j(1), fe = /* @__PURE__ */ A(() => Sb(R(yi), R(bi))), pe = /* @__PURE__ */ A(() => R(ae).width), me = /* @__PURE__ */ A(() => R(ae).height ?? 0), he = /* @__PURE__ */ A(() => R(ue) === "manual" ? R(de) : Cx(R(ce), R(pe), "fit", R(le), R(me)));
	function ge(e) {
		let t = Math.min(400, Math.max(10, (Math.round(Math.round(R(he) * 100) / 10) + e) * 10));
		M(de, t / 100), M(ue, "manual");
	}
	let _e = /* @__PURE__ */ A(() => R(me) > 0 ? R(me) : R(he) > 0 ? R(le) / R(he) : R(le)), ve = /* @__PURE__ */ A(() => R(pe) * R(he)), ye = /* @__PURE__ */ A(() => R(me) > 0 ? R(me) * R(he) : R(le)), be = /* @__PURE__ */ A(() => R(ve) > R(ce) + 1 || R(ye) > R(le) + 1);
	Dn(() => {
		let e = () => ke?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), Dn(() => {
		let e = R(oe);
		ke?.sendViewport(e);
	}), Dn(() => {
		let e = R(he);
		ke?.sendZoom(e);
	}), Dn(() => {
		let e = () => {
			M(S, Ax(window) ?? R(S), !0);
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}), Dn(() => {
		let e = R(se);
		if (!e || typeof ResizeObserver > "u") return;
		let t = () => {
			M(ce, e.clientWidth, !0), M(le, e.clientHeight, !0);
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	});
	let xe = /* @__PURE__ */ j(0);
	function Se() {
		M(xe, D?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function Ce() {
		let e = D?.data.sections.find((e) => e.responsive?.mobile?.attention?.needed);
		M(ie, "mobile"), e && setTimeout(() => ke?.sendScrollSection(e.id), 0);
	}
	function we(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			ze("layout");
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
			}, Ee(t, "layout-changed"), e.sectionId === R(xn) && M(Cn, e.minHeight, !0), R(kt)?.sectionId === e.sectionId && jt(), D.save(), Pe(), ke?.sendSection(R(u), t);
		}
	}
	function Te(e) {
		return e?.blocks?.some((e) => e.frames?.mobile) ?? !1;
	}
	function Ee(e, t) {
		e && Te(e) && (e.responsive?.mobile?.attention?.needed || (e.responsive = {
			...e.responsive ?? {},
			mobile: {
				...e.responsive?.mobile ?? { mode: "auto" },
				attention: {
					needed: !0,
					reason: t,
					since: (/* @__PURE__ */ new Date()).toISOString()
				}
			}
		}, Se(), ke?.sendAttention(e.id, !0)));
	}
	let D = null, Oe = null, ke = null, k = /* @__PURE__ */ j(null);
	function Ae() {
		M(k, Oe.data, !0), Oe.replace(R(k));
	}
	function je() {
		ke?.sendSite(Ge(R(k)));
	}
	let Me = /* @__PURE__ */ new Set(), Ne = () => R(k).pages.find((e) => e.id === R(u));
	function Pe() {
		let e = R(k)?.pages?.some((e) => !Me.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = q?.hasDraft() || Object.values(Ni).some((e) => e.hasDraft()), n = Ui?.hasDraft() || Object.values(Wi).some((e) => e.hasDraft());
		M(d, e || D?.hasDraft() && !Me.has(R(u)) || Oe?.hasDraft() || ga?.hasDraft() || t || n || !1, !0);
	}
	let Fe = [], Ie = [], Le = null;
	function Re() {
		return JSON.stringify({
			pageId: R(u),
			page: D.data,
			site: Oe.data,
			collectionsIndex: Fi ? q.data : null,
			collections: Fi ? Object.fromEntries(Object.entries(Ni).map(([e, t]) => [e, t.data])) : {},
			templatesIndex: Ki ? Ui.data : null,
			templates: Ki ? Object.fromEntries(Object.entries(Wi).map(([e, t]) => [e, t.data])) : {},
			plugins: ga?.data ?? null
		});
	}
	function ze(e) {
		(e !== Le || !e.startsWith("edit:") && !e.startsWith("grid:")) && (Fe.push(Re()), Fe.length > 50 && Fe.shift(), Ie.length = 0, Le = e);
	}
	function Be(e) {
		let { pageId: t, page: n, site: r, collectionsIndex: i, collections: a, templatesIndex: o, templates: s, plugins: c } = JSON.parse(e);
		if (Oe.replace(r), Ae(), Oe.save(), M(b, {
			snap: !0,
			...R(k).grid
		}, !0), je(), Ve(i, a ?? {}), He(o, s ?? {}), Ue(c), t && t !== R(u) && R(k).pages.some((e) => e.id === t)) {
			_(`urd-draft-${t}`, JSON.stringify(n)), Ar(t, { keepHistory: !0 }), Pe();
			return;
		}
		D.replace(n), D.save(), Pe(), Se(), jt(), An(D.data.sections.find((e) => e.id === R(xn))), R(k).pages.some((e) => e.id === R(u)) ? ke?.sendPage(R(u), D.data) : Ar(R(k).pages[0].id, { keepHistory: !0 });
	}
	function Ve(e, t) {
		if (q && e && JSON.stringify({
			index: q.data,
			collections: Object.fromEntries(Object.entries(Ni).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			collections: t
		})) {
			q.replace(e), q.save();
			for (let e of Object.keys(Ni)) e in t || (localStorage.removeItem(`urd-draft-collection-${e}`), localStorage.removeItem(`urd-draft-samling-${e}`), delete Ni[e]);
			for (let [e, n] of Object.entries(t)) {
				if (!Ni[e]) {
					let t = Pi[e] ?? null;
					Ni[e] = ha(`urd-draft-collection-${e}`, () => t, g, `urd-draft-samling-${e}`);
				}
				Ni[e].replace(n), Ni[e].save();
			}
			M(Li, [...e.samlinger ?? []], !0), R(zi) && !R(Li).includes(R(zi)) && M(zi, null), na();
		}
	}
	function He(e, t) {
		if (Ui && e && JSON.stringify({
			index: Ui.data,
			templates: Object.fromEntries(Object.entries(Wi).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			templates: t
		})) {
			Ui.replace(e), Ui.save();
			for (let e of Object.keys(Wi)) e in t || (localStorage.removeItem(`urd-draft-template-${e}`), localStorage.removeItem(`urd-draft-mal-${e}`), delete Wi[e]);
			for (let [e, n] of Object.entries(t)) Wi[e] || (Wi[e] = ha(`urd-draft-template-${e}`, () => Gi[e] ?? null, g, `urd-draft-mal-${e}`)), Wi[e].replace(n), Wi[e].save();
			M(qi, [...e.maler ?? []], !0), Pe(), Yi();
		}
	}
	function Ue(e) {
		ga && e && JSON.stringify(ga.data) !== JSON.stringify(e) && (ga.replace(e), ga.save(), Ea(), La());
	}
	function We() {
		Fe.length && (en(), Ie.push(Re()), Be(Fe.pop()), Le = null, h(Y("status.undone")));
	}
	function Ke() {
		Ie.length && (en(), Fe.push(Re()), Be(Ie.pop()), Le = null, h(Y("status.redone")));
	}
	function qe(e) {
		R(Nt) && (e.target instanceof Element && e.target.closest(".block-menu") || M(Nt, null));
	}
	function Je(e) {
		if (e.key === "Escape" && R(Nt)) {
			M(Nt, null);
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
			].includes(t.type)) || !R(kt) || R(oe) === "mobile") return;
			e.preventDefault(), ke?.sendDuplicate();
			return;
		}
		if (t !== "z" && t !== "y") return;
		let n = e.target;
		n instanceof HTMLElement && (n.isContentEditable || n.tagName === "TEXTAREA" || n.tagName === "INPUT" && ![
			"number",
			"checkbox",
			"range",
			"color"
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? Ke() : We());
	}
	async function Ye() {
		M(l, Vv(await (await fetch("/content/site.json")).json()), !0), Oe = ha("urd-draft-site", () => R(l), g), (Oe.data.schemaVersion ?? 1) > 4 && (console.warn(`Urd: the site draft has schemaVersion ${Oe.data.schemaVersion} (the engine has 4) and is discarded`), Oe.replace(Ge(R(l)))), Oe.replace(Vv(Oe.data)), Oe.save(), Ae(), M(b, {
			snap: !0,
			...R(k).grid
		}, !0), await Ar(new URLSearchParams(location.search).get("page") ?? R(k).pages[0].id), await ka(), await ta(), await Ji(), await dr(), R(y) && pr(), Ot(), R(k).site.setup === !0 && !localStorage.getItem("urd-setup-done") && (M(at, R(k).site.title, !0), M(ot, R(k).theme.tokens.color.accent, !0), M(st, R(k).theme.tokens.color.bg, !0), M(it, !0));
	}
	let Xe = /* @__PURE__ */ j(null);
	function Ze({ title: e, lines: t = [], okLabel: n = Y("confirm.ok"), cancelLabel: r = Y("confirm.cancel") }) {
		return new Promise((i) => {
			M(Xe, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function tt({ title: e, lines: t = [], value: n = "", placeholder: r = "", okLabel: i = Y("confirm.ok"), cancelLabel: a = Y("confirm.cancel") }) {
		return new Promise((o) => {
			M(Xe, {
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
	function nt(e) {
		R(Xe)?.resolve(R(Xe).prompt ? e ? R(Xe).value : null : e), M(Xe, null);
	}
	let rt = !1;
	Dn(() => {
		if (!R(Xe)) return;
		let e = (e) => {
			e.key === "Escape" && (e.stopPropagation(), nt(!1));
		};
		return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
	});
	let it = /* @__PURE__ */ j(!1), at = /* @__PURE__ */ j(""), ot = /* @__PURE__ */ j("#7c5cff"), st = /* @__PURE__ */ j("#0b0e14");
	function ct() {
		localStorage.setItem("urd-setup-done", "1"), M(it, !1);
	}
	function lt() {
		let e = R(at).trim();
		e && (qr("setup", () => {
			R(k).site.title = e, R(k).nav.logo = {
				type: "text",
				value: e
			}, R(k).theme.tokens.color.accent = R(ot), R(k).theme.tokens.color.bg = R(st), delete R(k).site.setup;
		}), ct(), h(Y("status.setupDone"), "ok"));
	}
	let ut = "urd-admin-panels", ft = "urd-admin-panel-open", pt = /* @__PURE__ */ j(sn(localStorage.getItem(ut) === "reset" ? "reset" : "remember"));
	function mt(e) {
		M(pt, e === "reset" ? "reset" : "remember", !0), R(pt) === "reset" ? localStorage.setItem(ut, "reset") : localStorage.removeItem(ut);
	}
	let ht = /* @__PURE__ */ j(sn(R(pt) === "reset" ? null : localStorage.getItem(ft))), gt = [
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
	], _t = [
		"rail.thisPage",
		"rail.site",
		"rail.system"
	], vt = Object.fromEntries(gt.flat().map((e) => [e, Y(`panel.${e}`)]));
	R(ht) && !vt[R(ht)] && M(ht, null), Dn(() => {
		if (R(pt) === "reset") {
			localStorage.removeItem(ft);
			return;
		}
		R(ht) ? localStorage.setItem(ft, R(ht)) : localStorage.removeItem(ft);
	});
	let yt = {
		pages: ["hint.pages.drafts"],
		blocks: ["hint.blocks.intro"],
		grid: ["hint.grid.intro", "hint.grid.section"],
		collections: ["hint.collections.intro"],
		plugins: ["hint.plugins.intro"],
		history: ["hint.history.intro"]
	}, bt = [
		["se", "Davvisámegiella"],
		["en-GB", "English (UK)"],
		["nb", "Norsk bokmål"],
		["nn", "Norsk nynorsk"],
		["tr", "Türkçe"]
	], xt = (e) => [...e].sort((e, t) => e[1].localeCompare(t[1]));
	function St(e, t) {
		let n = [];
		for (let r of e) for (let e of ba[r]?.languages ?? []) e?.[t] === !0 && typeof e.code == "string" && typeof e.name == "string" && e.name && (bt.some(([t]) => t === e.code) || n.some(([t]) => t === e.code) || n.push([e.code, e.name]));
		return n;
	}
	function Ct() {
		let e = xt([...bt, ...St(R(Ca), "admin")]);
		return Tt === "auto" || e.some(([e]) => e === Tt) ? e : [[Tt, Tt], ...e];
	}
	let wt = () => St(R(ya)?.enabled ?? [], "site"), Tt = localStorage.getItem("urd-admin-lang") ?? "auto";
	function Et(e) {
		e !== Tt && (e === "auto" ? localStorage.removeItem("urd-admin-lang") : localStorage.setItem("urd-admin-lang", e), location.reload());
	}
	function Dt(e) {
		M(ht, R(ht) === e ? null : e, !0), Ot();
	}
	function Ot() {
		R(ht) === "history" && _r(), R(ht) === "update" && !R(wr) && Er();
	}
	let kt = /* @__PURE__ */ j(null);
	function At(e, t) {
		let n = D?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function jt() {
		if (!R(kt)) return;
		let { block: e } = At(R(kt).sectionId, R(kt).blockId);
		if (!e) {
			M(kt, null);
			return;
		}
		M(kt, {
			sectionId: R(kt).sectionId,
			blockId: R(kt).blockId,
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
	function Mt(e) {
		if (M(Nt, null), !e.blockId) {
			M(kt, null);
			return;
		}
		M(kt, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), e.sectionId && M(xn, e.sectionId, !0), jt();
	}
	let Nt = /* @__PURE__ */ j(null);
	function Pt() {
		ro(R(se)?.getBoundingClientRect().left ?? 0);
	}
	Dn(() => {
		if (R(Nt)) return Pt(), window.addEventListener("resize", Pt), () => window.removeEventListener("resize", Pt);
	});
	let Ft = /* @__PURE__ */ j(null);
	Dn(() => {
		R(Ft)?.mode === "set" && R(kt)?.type !== "calendar" && M(Ft, null);
	});
	let It = null;
	Dn(() => {
		let e = R(kt)?.blockId ?? null;
		e !== It && (It = e, eo.menuQuery = "", eo.propsQuery = "");
	}), Dn(() => {
		R(Nt) || (eo.menuQuery = "");
	});
	let Lt = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	function Rt(e) {
		if (Mt(e), !R(kt)) return;
		Pt();
		let t = Math.min(eo.wide && eo.room >= 740 ? 740 : 400, window.innerWidth - 16), n = R(v)?.getBoundingClientRect();
		if (!n) return;
		let r = n.left + R(he) * e.rect.right + 12;
		r + t > window.innerWidth - 8 && (r = Math.max(8, n.left + R(he) * e.rect.left - t - 12));
		let i = window.innerHeight - Math.min(window.innerHeight * .7, 560) - 8, a = Math.min(Math.max(8, n.top + R(he) * e.rect.top), Math.max(8, i));
		M(Nt, {
			left: r,
			top: a
		}, !0);
	}
	function zt(e, t) {
		let { section: n, block: r } = At(R(kt)?.sectionId, R(kt)?.blockId);
		r && (e && ze(e), t(r, n), Ee(n, "block-edited"), D.save(), Pe(), ke?.sendSection(R(u), n), jt(), Jt(n.id, r));
	}
	function Bt(e, t) {
		zt(`edit:${R(kt).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function Vt(e, t) {
		zt(`edit:${R(kt).blockId}:${e}`, (e) => {
			Object.assign(e.props, t);
		});
	}
	function Ht() {
		return [...R(k).pages.map((e) => [e.id, e.title]), ["__href", Y("opt.externalLink")]];
	}
	function Ut(e) {
		let t = e === "__href" ? null : e;
		zt(`edit:${R(kt).blockId}`, (e) => {
			e.props.page = t, t && (e.props.href = null);
		});
	}
	function Wt() {
		ke?.sendOpenImageEditor(R(kt).blockId), M(Nt, null);
	}
	let Gt = /* @__PURE__ */ new Map(), Kt = /* @__PURE__ */ new Map(), qt = 0;
	function Jt(e, t) {
		if (Qt(e, t), R(oe) !== "desktop" || !vc(t)) return;
		clearTimeout(Gt.get(t.id));
		let n = ++qt;
		Kt.set(t.id, n), Gt.set(t.id, setTimeout(() => ke?.sendFitBlock(e, t.id, n), 60));
	}
	let Yt = /* @__PURE__ */ new Map(), Xt = null, Zt = "";
	function Qt(e, t) {
		if (!yc.has(t.type) || !vc(t)) return;
		Xt ??= Ia({
			title: () => Y("canvas.phoneMeasure"),
			prepare: (e, t) => {
				let n = Ge(R(ya))?.enabled ?? [], r = JSON.stringify(n);
				(t || r !== Zt) && e({
					type: "urd-plugins",
					enabled: n
				}), Zt = r, e({
					type: "urd-site",
					site: Ge(R(k))
				}), e({
					type: "urd-collections",
					collections: Ge(R(Ri)) ?? {}
				});
			},
			onHeight: $t
		});
		let n = ++qt;
		Yt.set(t.id, n), Xt.request(R(u), Ge(D.data), e, t.id, n);
	}
	function $t(e, t, n, r) {
		if (e !== R(u) || r !== Yt.get(t)) return;
		let i = D.data.sections.flatMap((e) => e.blocks).find((e) => e.id === t), a = Math.round(n);
		i && a > 0 && i.mobileHeight !== a && (i.mobileHeight = a, D.save(), Pe());
	}
	function en() {
		for (let e of Gt.values()) clearTimeout(e);
		Gt.clear(), Kt.clear(), Yt.clear(), Xt?.cancel();
	}
	function tn(e) {
		let t = ts(e), n = t.view === "next" ? {
			nextCount: R(kt).props.nextCount ?? 3,
			laterCount: R(kt).props.laterCount ?? 3
		} : {}, r = t.id === "plain" && ![
			"list",
			"cards",
			"month",
			"agenda",
			"next"
		].includes(ns(R(kt).props)) ? { view: "list" } : {};
		Vt("design", {
			design: t.id === "plain" ? void 0 : t.id,
			...t.view ? { view: t.view } : {},
			...r,
			...n
		});
	}
	function nn(e) {
		zt(`edit:${R(kt).blockId}:fit`, (t) => {
			e === "shrink" || e === "both" ? (t.fit = e, t.fitMin ??= .6) : (delete t.fit, delete t.fitMin);
		});
	}
	function rn(e) {
		zt(`edit:${R(kt).blockId}:fitMin`, (t) => {
			t.fitMin = e;
		});
	}
	let an = null;
	function on(e) {
		zt(`edit:${R(kt).blockId}:size`, (t, n) => {
			an?.blockId !== t.id && (an = {
				blockId: t.id,
				size: Tc(t),
				frame: { ...t.frames.desktop },
				ys: new Map(n.blocks.filter((e) => e.frames?.desktop).map((e) => [e.id, e.frames.desktop.y]))
			}), e === 1 ? (delete t.size, delete t.sizeMin, delete t.sizeMax) : t.size = e;
			let r = an;
			for (let e of n.blocks) e.id !== t.id && e.frames?.desktop && r.ys.has(e.id) && (e.frames.desktop = {
				...e.frames.desktop,
				y: r.ys.get(e.id)
			});
			t.frames.desktop = { ...r.frame };
			let i = Tc(t) / r.size;
			if (i === 1) return;
			let a = {
				...r.frame,
				w: Math.min(Math.round(r.frame.w * i * 100) / 100, Math.round((100 - r.frame.x) * 100) / 100)
			};
			if (!vc(t)) {
				a.h = Math.max(1, Math.round(r.frame.h * i));
				for (let [e, r] of Oc(n.blocks, t.id, a.h)) {
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
	function ln(e, t) {
		let n = e === "sizeMin" ? wc.minDefault : wc.maxDefault;
		zt(`edit:${R(kt).blockId}:${e}`, (r) => {
			let i = Math.round(Number(t));
			Number.isFinite(i) && i > 0 && i !== n ? r[e] = Math.min(wc.max, Math.max(wc.min, i)) : delete r[e];
		});
	}
	function un(e) {
		zt(`edit:${R(kt).blockId}:height`, (t) => {
			e === "own" ? t.height = { mode: "own" } : delete t.height;
		});
	}
	function dn(e) {
		zt(`edit:${R(kt).blockId}:heightAlign`, (t) => {
			t.height = { mode: "own" }, e !== "top" && (t.height.align = e);
		});
	}
	function fn() {
		let e = R(kt);
		if (bc.has(e.type)) return !0;
		if (e.type !== "calendar") return !1;
		let t = ts(e.props.design);
		return !t.module && ["list", "cards"].includes(t.view);
	}
	function pn(e, t) {
		Number.isFinite(t) && zt(`edit:frame-${R(kt).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function mn() {
		let e = D.data.sections.find((e) => e.id === R(kt)?.sectionId)?.size?.maxWidth, t = typeof R(yi) == "number" ? R(yi) : 0;
		return e === "full" ? 0 : e ? /^\d+(\.\d+)?px$/.test(e) ? Math.min(parseFloat(e), t || Infinity) : 0 : t;
	}
	function hn(e) {
		return Math.round(e / 100 * mn());
	}
	function gn(e, t) {
		let n = mn();
		if (!Number.isFinite(e) || e < 4 || !(n > 0)) return;
		let { x: r, w: i, h: a } = R(kt).frame, o = Math.max(.5, Math.min(Math.round(e / n * 200) / 2, Math.round((100 - r) * 2) / 2)), s = t ? Math.max(1, Math.round(o / i * a)) : a;
		Number.isFinite(o) && Number.isFinite(s) && zt(`edit:frame-${R(kt).blockId}:size`, (e) => {
			e.frames.desktop = {
				...e.frames.desktop,
				w: o,
				h: s
			};
		});
	}
	function _n(e) {
		zt(`edit:${R(kt).blockId}:boxStyle`, (t) => {
			let n = {
				...t.props.boxStyle ?? {},
				...e
			};
			for (let e of Object.keys(n)) n[e] ?? delete n[e];
			Object.keys(n).length ? t.props.boxStyle = n : delete t.props.boxStyle;
		});
	}
	function vn(e) {
		zt("decor", (t) => {
			t.decor = e;
		});
	}
	function yn(e) {
		let { section: t, block: n } = At(R(kt)?.sectionId, R(kt)?.blockId);
		n && (ze("hide-mobile"), n.hideMobile = e, D.save(), Pe(), ke?.sendSection(R(u), t), jt());
	}
	let bn = {
		text: Y("blocks.text"),
		button: Y("blocks.button"),
		image: Y("blocks.image"),
		shape: Y("blocks.shape"),
		video: Y("blocks.video"),
		icon: Y("blocks.icon"),
		gallery: Y("blocks.gallery"),
		faq: Y("blocks.faq"),
		collection: Y("blocks.collection"),
		timeline: Y("blocks.timeline"),
		quote: Y("blocks.quote"),
		stats: Y("blocks.stats"),
		ribbon: Y("blocks.ribbon"),
		table: Y("blocks.table"),
		share: Y("blocks.share"),
		countdown: Y("blocks.countdown"),
		audio: Y("blocks.audio"),
		product: Y("blocks.product"),
		cart: Y("blocks.cart"),
		checkout: Y("blocks.checkout"),
		map: Y("blocks.map"),
		form: Y("blocks.form"),
		calendar: Y("blocks.calendar")
	}, xn = /* @__PURE__ */ j(null), Sn = /* @__PURE__ */ j(null), Cn = /* @__PURE__ */ j(""), wn = /* @__PURE__ */ j(sn([])), Tn = /* @__PURE__ */ j(null), En = /* @__PURE__ */ j(null), On = /* @__PURE__ */ j(""), kn = /* @__PURE__ */ j(sn({}));
	function An(e) {
		M(Sn, e?.grid ? { ...e.grid } : null, !0), M(Cn, e?.size?.minHeight ?? "", !0), M(wn, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), M(Tn, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0), M(En, e?.hover ? JSON.parse(JSON.stringify(e.hover)) : null, !0), M(On, e?.theme ?? "", !0), M(kn, e?.divider ? JSON.parse(JSON.stringify(e.divider)) : {}, !0);
	}
	let jn = /* @__PURE__ */ j(null);
	function Mn() {
		try {
			let e = ((R(v)?.contentDocument)?.querySelector(`.urd-section[data-section-id="${R(xn)}"]`))?.getBoundingClientRect();
			M(jn, e && e.width ? {
				w: e.width,
				h: e.height
			} : null, !0);
		} catch {
			M(jn, null);
		}
	}
	Dn(() => {
		R(xn), R(wn), requestAnimationFrame(() => requestAnimationFrame(Mn));
	}), Dn(() => {
		let e = R(v);
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(() => Mn());
		return t.observe(e), () => t.disconnect();
	});
	function Nn(e) {
		M(xn, e.sectionId, !0), An(D?.data.sections.find((t) => t.id === e.sectionId));
	}
	function Pn(e, t) {
		let n = D.data.sections.find((e) => e.id === R(xn));
		n && (ze(e), t(n), D.save(), Pe(), ke?.sendSection(R(u), n), An(n));
	}
	async function Fn(e, t) {
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
	async function In(e) {
		let t = await e.text(), n = Ll(t), r = zl(t);
		if (!r) return n;
		let i = await Fn(n.dataUrl, r);
		if (!i) return n;
		let a = Rl(t, i);
		if (a === t) return n;
		try {
			return Ll(a);
		} catch {
			return n;
		}
	}
	async function Ln(e) {
		if (e.type === "image/svg+xml" || /\.svg$/i.test(e.name || "")) return In(e);
		let t = await Pl(e);
		return t.animated && t.bytes > 1e6 && h(Y("status.animatedLarge", { mb: (t.bytes / 1e6).toFixed(1) }), "error"), t;
	}
	function Rn(e) {
		return e?.code === "animatedTooLarge" ? Y("status.animatedTooLarge", {
			mb: (e.bytes / 1e6).toFixed(1),
			max: Math.round(wl / 1e6)
		}) : Y("status.imageReadError");
	}
	function zn(e, t, n) {
		if (!["video/mp4", "video/webm"].includes(e.type)) {
			h(Y(t), "error");
			return;
		}
		if (e.size > 15e6) {
			h(Y("status.videoTooLarge", {
				mb: (e.size / 1e6).toFixed(1),
				max: Math.round(Cl / 1e6)
			}), "error");
			return;
		}
		let r = new FileReader();
		r.onload = () => {
			n(String(r.result ?? "")), e.size > 4e6 && h(Y("status.videoLarge", { mb: (e.size / 1e6).toFixed(1) }), "error");
		}, r.onerror = () => h(Y("status.imageReadError"), "error"), r.readAsDataURL(e);
	}
	function Bn(e) {
		let t = e.target.files?.[0];
		e.target.value = "", t && zn(t, "status.videoFileFormat", (e) => Bt("src", e));
	}
	async function Vn(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			Bt("poster", (await Ln(t)).dataUrl);
		} catch (e) {
			h(Rn(e), "error");
		}
	}
	let Hn = () => 1 + crypto.getRandomValues(/* @__PURE__ */ new Uint32Array(1))[0] % 1e6;
	function Un(e, t) {
		qr(e, () => {
			R(k).nav.style ??= {}, t(R(k).nav.style);
		});
	}
	let Wn = /* @__PURE__ */ A(() => ({
		mutate: Pn,
		keyPrefix: "bg",
		keyId: R(xn)
	})), Gn = {
		mutate: Un,
		keyPrefix: "navbg",
		keyId: "nav"
	}, Kn = {
		mutate: za,
		keyPrefix: "footerbg",
		keyId: "footer"
	}, qn = () => {
		let e = null;
		try {
			e = localStorage.getItem("urd-theme-mode");
		} catch {}
		return Dm(R(k)?.theme?.scheme, e, window.matchMedia("(prefers-color-scheme: dark)").matches);
	}, Jn = /* @__PURE__ */ j("light");
	Dn(() => {
		M(Jn, qn(), !0);
		let e = window.matchMedia("(prefers-color-scheme: dark)"), t = (e) => {
			e instanceof StorageEvent && e.key && e.key !== "urd-theme-mode" || M(Jn, qn(), !0);
		};
		return e.addEventListener("change", t), window.addEventListener("storage", t), () => {
			e.removeEventListener("change", t), window.removeEventListener("storage", t);
		};
	});
	let Yn = /* @__PURE__ */ A(() => R(k)?.theme ? Om(R(k).theme, R(Jn)).color ?? {} : {}), Xn = () => Object.entries(R(Yn));
	function Zn(e) {
		return {
			type: e,
			version: VS[e].version,
			props: VS[e].defaults()
		};
	}
	let Qn = (e) => !!(e && VS[e.type]?.entrance), $n = [["", Y("common.none")], ...Object.entries(VS).filter(([, e]) => e.entrance).map(([e, t]) => [e, t.labelKey ? Y(t.labelKey) : t.label])], er = $n.filter(([e]) => !VS[e]?.group), tr = [["", Y("common.none")], ...Object.entries(VS).filter(([, e]) => !e.entrance).map(([e, t]) => [e, t.labelKey ? Y(t.labelKey) : t.label])];
	function nr(e) {
		e.animation && !Qn(e.animation) && (e.hover ??= e.animation, e.animation = null);
	}
	function rr(e) {
		zt(`edit:anim-${R(kt).blockId}`, (t) => {
			nr(t), t.animation = e ? Zn(e) : null;
		}), R(kt) && ke?.sendDemoAnim(R(kt).sectionId, R(kt).blockId);
	}
	function ir(e) {
		zt(`edit:hover-${R(kt).blockId}`, (t) => {
			nr(t), t.hover = e ? Zn(e) : null;
		});
	}
	function ar(e, t) {
		Number.isFinite(t) && (zt(`edit:anim-${R(kt).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), R(kt) && ke?.sendDemoAnim(R(kt).sectionId, R(kt).blockId));
	}
	function or(e) {
		let t = D.data.sections.find((e) => e.id === R(xn));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		ze("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, M(Cn, r, !0), D.save(), Pe(), ke?.sendSection(R(u), t);
	}
	function sr() {
		return D.data.sections.find((e) => e.id === R(xn)) ?? D.data.sections[0];
	}
	function cr(e) {
		let t = D.data.sections.find((e) => e.id === R(xn));
		t && (ze("grid:section"), t.grid = e ? { ...Oe.data.grid } : null, M(Sn, t.grid ? { ...t.grid } : null, !0), D.save(), Pe(), ke?.sendSection(R(u), t), R(Wr) && ke?.sendShowGrid(!0));
	}
	function lr(e, t) {
		let n = D.data.sections.find((e) => e.id === R(xn));
		n?.grid && (ze("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, M(Sn, { ...n.grid }, !0), D.save(), Pe(), ke?.sendSection(R(u), n), R(Wr) && ke?.sendShowGrid(!0));
	}
	function ur(e, t) {
		ze("grid:site"), M(b, {
			...R(b),
			[e]: t
		}, !0), Oe.data.grid = {
			...Oe.data.grid,
			[e]: t
		}, Oe.save(), Pe(), je(), R(Wr) && ke?.sendShowGrid(!0);
	}
	async function dr() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? M(y, await e.json(), !0) : e.status !== 503 && M(y, null);
		} catch {
			M(y, null);
		}
	}
	let fr = null;
	async function pr() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (fr = (await e.json()).head ?? null);
		} catch {}
	}
	async function mr(e) {
		if (!fr) return await pr(), {
			ok: await Ze({
				title: Y("confirm.conflictUnknown.title"),
				lines: [Y("confirm.conflictUnknown.body"), Y("confirm.conflictUnknown.warning")],
				okLabel: Y("confirm.publishAnyway"),
				cancelLabel: Y("confirm.cancel")
			}),
			head: fr
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${fr}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === fr) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? [Y("confirm.conflict.truncated")] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await Ze({
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
	let hr = /* @__PURE__ */ j(null), gr = /* @__PURE__ */ j("");
	async function _r() {
		M(gr, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? M(hr, (await e.json()).commits, !0) : e.status === 401 ? (M(hr, [], !0), M(gr, Y("status.historyLoginRequired"), !0)) : (M(hr, [], !0), M(gr, sa(await e.json().catch(() => null)) ?? Y("status.historyFetchFailed"), !0));
		} catch {
			M(hr, [], !0), M(gr, Y("status.historyUnavailable"), !0);
		}
	}
	let vr = !1, yr = 0;
	async function xr(e) {
		let t = ++yr, n = m, r = await Tx(wx(e));
		t === yr && n === m && (r ? h(Y("status.publishLive"), "ok") : h(Y("status.publishDeployTimeout"), "error"));
	}
	let Sr = /* @__PURE__ */ j(null), Cr = /* @__PURE__ */ j(null), wr = /* @__PURE__ */ j(!1), Tr = /* @__PURE__ */ j(sn(/* @__PURE__ */ new Set()));
	async function Er() {
		M(wr, !0), M(Cr, null), M(Sr, null);
		try {
			let e = await fetch("/api/github/update"), t = await e.json().catch(() => null);
			e.ok ? (M(Sr, t, !0), M(Tr, /* @__PURE__ */ new Set(), !0)) : M(Cr, sa(t) ?? Y("update.checkFailed"), !0);
		} catch {
			M(Cr, Y("status.publishLayerUnreachable"), !0);
		}
		M(wr, !1);
	}
	let Dr = null;
	function Or(e) {
		return {
			schemaVersion: 7,
			meta: {
				id: e.id,
				title: e.title
			},
			sections: [{
				id: Up("sec"),
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
	async function Ar(e, { keepHistory: t = !1 } = {}) {
		M(u, e, !0), Dr = (async () => {
			let n = Ne(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = Hv(await e.json(), Oe.data));
			} catch {}
			r ? Me.delete(e) : r = Or(n), D = ha(`urd-draft-${e}`, () => r, g), (D.data.schemaVersion ?? 1) > 7 && (console.warn(`Urd: the draft for '${e}' has schemaVersion ${D.data.schemaVersion} (the engine has 7) and is discarded`), D.replace(structuredClone(r))), D.replace(Hv(D.data, Oe.data)), D.save(), t || (Le = null), M(xn, null), M(Sn, null), Pe(), ai(), Se(), M(f, "");
		})(), await Dr;
	}
	function Mr() {
		ke?.destroy(), R(v)?.contentDocument?.addEventListener("pointerdown", () => {
			R(Nt) && M(Nt, null);
		}, !0), ke = Pa(R(v), {
			onEdit: ao,
			onMove: oo,
			onGrow: so,
			onDelete: yo,
			onAddSection: mo,
			onMoveSection: ho,
			onDeleteSection: go,
			onSectionSize: _o,
			onUndo: (e) => e.redo ? Ke() : We(),
			onSelectSection: Nn,
			onSelectBlock: Mt,
			onBlockMenu: Rt,
			onReady: Nr,
			onNavigate: Kr,
			onAddBlock: (e) => wo(e.sectionId, e.block),
			onAddBlocks: (e) => To(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: ko,
			onMoveBlockSection: vo,
			onMobileReset: lo,
			onMobileOrder: uo,
			onReviewDone: fo,
			onBlockFlag: po,
			onCollectionEdit: ca,
			onCollectionAdd: aa,
			onSaveTemplate: Xi,
			onStickyGroup: Qi,
			onStickyDock: Zi,
			onDeleteTemplate: ea,
			onApplyLayout: we,
			onPluginBlocks: (e) => {
				M(Oo, e.blocks ?? [], !0);
			},
			onNavWidth: (e) => qr("edit:nav-width", () => {
				R(k).nav.style ??= {}, R(k).nav.style.width = e.width;
			})
		});
	}
	async function Nr() {
		await Dr, await va, ke?.sendPlugins(Ge(R(ya))?.enabled ?? []), ke?.sendViewport(R(oe)), ke?.sendZoom(R(he)), ra(), Yi(), Oe.hasDraft() && je();
		let e = !R(l).pages.some((e) => e.id === R(u));
		(D.hasDraft() || e) && ke?.sendPage(R(u), D.data), R(x) || ke?.sendChrome(!1), R(Wr) && ke?.sendShowGrid(!0), R(Pr) && ke?.sendShowGuides(!0), s();
	}
	let Pr = /* @__PURE__ */ j(localStorage.getItem("urd-guides") === "1"), Fr = /* @__PURE__ */ j(!1), Ir = /* @__PURE__ */ j(sn(localStorage.getItem("urd-layout-picker") === "menu" ? "menu" : "strip"));
	function Lr(e) {
		M(Ir, e === "menu" ? "menu" : "strip", !0), R(Ir) === "menu" ? localStorage.setItem("urd-layout-picker", "menu") : localStorage.removeItem("urd-layout-picker");
	}
	let Rr = /* @__PURE__ */ j(null);
	Dn(() => {
		if (!R(Fr)) return;
		let e = (e) => {
			R(Rr)?.contains(e.target) || M(Fr, !1);
		}, t = (e) => {
			e.key === "Escape" && M(Fr, !1);
		}, n = () => {
			M(Fr, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let zr = {
		view: 1079,
		device: 999,
		zoom: 919
	}, B = /* @__PURE__ */ j(null), Br = /* @__PURE__ */ j(null), Hr = sn({
		view: !1,
		device: !1,
		zoom: !1
	});
	Dn(() => {
		let e = Object.entries(zr).map(([e, t]) => {
			let n = window.matchMedia(`(max-width: ${t}px)`), r = () => {
				Hr[e] = n.matches;
			};
			return r(), n.addEventListener("change", r), () => n.removeEventListener("change", r);
		});
		return () => e.forEach((e) => e());
	}), Dn(() => {
		R(B) && !Hr[R(B)] && M(B, null);
	}), Dn(() => {
		if (!R(B)) return;
		let e = (e) => {
			R(Br)?.contains(e.target) || M(B, null);
		}, t = (e) => {
			e.key === "Escape" && M(B, null);
		}, n = () => {
			M(B, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	function Ur() {
		M(Pr, !R(Pr)), localStorage.setItem("urd-guides", R(Pr) ? "1" : "0"), ke?.sendShowGuides(R(Pr));
	}
	let Wr = /* @__PURE__ */ j(localStorage.getItem("urd-grid-overlay") === "1");
	function Gr() {
		M(Wr, !R(Wr)), localStorage.setItem("urd-grid-overlay", R(Wr) ? "1" : "0"), ke?.sendShowGrid(R(Wr));
	}
	function Kr(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = R(k).pages.find((e) => e.path === t);
		n && n.id !== R(u) && Ar(n.id);
	}
	function qr(e, t) {
		ze(e), t(), Oe.save(), Pe(), je();
	}
	let Jr = /* @__PURE__ */ j(""), Yr = /* @__PURE__ */ j(null), Xr = /* @__PURE__ */ j(null);
	Dn(() => {
		if (!R(Xr)) return;
		let e = (e) => {
			e.target.closest?.(".page-menu-wrap") || M(Xr, null);
		}, t = (e) => {
			e.key === "Escape" && M(Xr, null);
		}, n = () => {
			M(Xr, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let Zr = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions",
		"readme"
	];
	function $r(e, t = null) {
		return e ? Zr.includes(e) ? Y("error.reservedName", { slug: e }) : R(k).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? Y("error.pageExists") : null : Y("error.pageNeedsName");
	}
	function ei() {
		let e = R(Jr).trim(), t = Vl(e), n = $r(t);
		if (n) return h(n, "error"), !1;
		let r = R(Yr) && !R(Yr).startsWith("preset:") ? Wi[R(Yr)]?.data?.page : null, i = R(Yr)?.startsWith("preset:") ? Gv(R(Yr).slice(7), {
			pageId: t,
			title: e
		}) ?? Or({
			id: t,
			title: e
		}) : r ? mS(Hv(JSON.parse(JSON.stringify(r)), Oe.data), Up, {
			id: t,
			title: e
		}) : Or({
			id: t,
			title: e
		});
		qr("pages", () => {
			R(k).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), R(k).nav.items.push({
				label: e,
				page: t
			});
		}), _(`urd-draft-${t}`, JSON.stringify(i)), Pe(), M(Jr, ""), M(Yr, null), Ar(t);
	}
	async function ti(e) {
		M(Xr, null), await $i("page", e.id === R(u) ? JSON.parse(JSON.stringify(D.data)) : await di(e));
	}
	function ri(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		qr("pages", () => {
			e.title = n;
			for (let t of R(k).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === R(u) ? (D.data.meta.title = n, D.save(), Pe(), ke?.sendPage(R(u), D.data)) : fi(e, (e) => {
			e.meta.title = n;
		});
	}
	let ii = /* @__PURE__ */ j(sn({
		description: "",
		ogTitle: "",
		ogDescription: "",
		ogImage: ""
	}));
	function ai() {
		let e = D?.data?.meta ?? {};
		M(ii, {
			description: e.description ?? "",
			ogTitle: e.og?.title ?? "",
			ogDescription: e.og?.description ?? "",
			ogImage: e.og?.image ?? ""
		}, !0);
	}
	function oi(e, t) {
		let n = String(t ?? "").trim();
		if (e === "description") n ? D.data.meta.description = n : delete D.data.meta.description;
		else {
			let t = {
				ogTitle: "title",
				ogDescription: "description",
				ogImage: "image"
			}[e], r = { ...D.data.meta.og ?? {} };
			n ? r[t] = n : delete r[t], Object.keys(r).length ? D.data.meta.og = r : delete D.data.meta.og;
		}
		D.save(), Pe(), ai();
		let r = R(k).pages.find((e) => e.id === R(u));
		R(ci)[R(u)] = !r?.noindex && !D.data.meta.description;
	}
	function si(e) {
		let t = R(k).pages.find((e) => e.id === R(u));
		t && (qr("edit:page-noindex", () => {
			e ? t.noindex = !0 : delete t.noindex;
		}), R(ci)[R(u)] = !e && !D?.data?.meta?.description);
	}
	let ci = /* @__PURE__ */ j(sn({}));
	async function li() {
		let e = {};
		for (let t of R(k).pages) {
			if (t.noindex) continue;
			if (t.id === R(u)) {
				e[t.id] = !D?.data?.meta?.description;
				continue;
			}
			let n = await di(t);
			e[t.id] = !n?.meta?.description;
		}
		M(ci, e, !0);
	}
	Dn(() => {
		R(ht) === "pages" && R(u) && li();
	});
	async function ui(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			oi("ogImage", (await Ln(t)).dataUrl);
		} catch (e) {
			h(Rn(e), "error");
		}
	}
	async function di(e) {
		let t = localStorage.getItem(`urd-draft-${e.id}`);
		if (t) try {
			return JSON.parse(t);
		} catch {}
		try {
			let t = await fetch(`/${e.file}`);
			if (t.ok) return Hv(await t.json(), Oe.data);
		} catch {}
		return Or(e);
	}
	async function fi(e, t) {
		let n = await di(e);
		t(n), _(`urd-draft-${e.id}`, JSON.stringify(n)), Pe();
	}
	function pi(e, t) {
		let n = Vl(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = $r(n, e.id);
		if (r) {
			h(r, "error");
			return;
		}
		qr("pages", () => {
			e.path = `/${n}`;
		});
	}
	function mi(e) {
		e.path !== "/" && (qr("pages", () => {
			R(k).pages = R(k).pages.filter((t) => t.id !== e.id), R(k).nav.items = R(k).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of R(k).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			R(k).nav.items = R(k).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === R(u) && Ar(R(k).pages[0].id), h(Y("status.pageRemoved")));
	}
	let hi = /* @__PURE__ */ j(null);
	function gi(e) {
		qr("edit:site-icon", () => {
			R(k).site.icon = e;
		}), M(hi, null);
	}
	function _i(e) {
		let t = String(e ?? "").trim();
		qr("edit:site-analytics", () => {
			t ? R(k).analytics = { token: t } : delete R(k).analytics;
		});
	}
	let yi = /* @__PURE__ */ A(() => R(k)?.layout?.contentWidth ?? 1440), bi = /* @__PURE__ */ A(() => R(k)?.layout?.gutter ?? 6);
	function xi() {
		let e = R(k).site.lang ?? "no";
		return e === "no" ? "nb" : e;
	}
	function Si() {
		let e = xi(), t = xt([...bt, ...wt()]);
		return [...t.some(([t]) => t === e) ? [] : [[e, e]], ...t];
	}
	let Ci = /* @__PURE__ */ j(!1), wi = /* @__PURE__ */ j(null), Ti = /* @__PURE__ */ j(null);
	Dn(() => {
		let e = R(Ti);
		e && (M(Ti, null), br().then(() => document.querySelector(`[data-cal-name="${e}"]`)?.focus()));
	});
	let Di = () => R(k)?.site?.calendars ?? [], ki = (e) => Di().find((t) => t.id === e) ?? null;
	function Ai(e = {}) {
		let t = {
			id: Up("cal"),
			url: "",
			...e
		};
		return qr("site", () => {
			(R(k).site.calendars ??= []).unshift(t);
		}), M(wi, t.id, !0), M(Ti, t.id, !0), M(Ci, !0), t.id;
	}
	let ji = /* @__PURE__ */ j(!1), Mi = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	Dn(() => {
		if (!R(k)?.site) return;
		let e = R(k).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 49.6V14.4l25.6 10.4V49.6' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
				return;
			}
			Mi.test(e) && (t.href = e);
		}
	});
	let q = null, Ni = {}, Pi = {}, Fi = !1, Li = /* @__PURE__ */ j(sn([])), Ri = /* @__PURE__ */ j(sn({})), zi = /* @__PURE__ */ j(null), Bi = /* @__PURE__ */ j(""), Vi = /* @__PURE__ */ j("news"), Ui = null, Wi = {}, Gi = {}, Ki = !1, qi = /* @__PURE__ */ j(sn([]));
	async function Ji() {
		let e = {
			version: 1,
			maler: []
		};
		try {
			e = await (await fetch("/content/maler.json")).json();
		} catch {}
		Ui = ha("urd-draft-templates", () => e, g, "urd-draft-maler"), M(qi, [...Ui.data.maler ?? []], !0);
		for (let e of R(qi)) {
			let t = null;
			try {
				t = await (await fetch(`/content/maler/${e}.json`)).json();
			} catch {}
			Gi[e] = t, Wi[e] = ha(`urd-draft-template-${e}`, () => t, g, `urd-draft-mal-${e}`), (Wi[e].data?.schemaVersion ?? 1) > 1 && Wi[e].reset();
		}
		Ki = !0, Yi();
	}
	function Yi() {
		let e = R(qi).map((e) => Wi[e]?.data ? {
			id: e,
			...JSON.parse(JSON.stringify(Wi[e].data))
		} : null).filter(Boolean).map(({ id: e, mal: t, section: n, blocks: r, page: i }) => ({
			id: e,
			name: t.name,
			kind: t.kind,
			section: n,
			blocks: r,
			page: i
		}));
		ke?.sendTemplates(e);
	}
	function Xi(e) {
		let t = fS.includes(e.kind) ? e.kind : "section";
		return $i(t, e[t]);
	}
	function Zi(e) {
		let { section: t, block: n } = At(e.sectionId, e.blockId);
		t && n?.sticky && So.some(([t]) => t === e.dock) && (ze(`sticky-dock:${e.blockId}`), n.sticky = {
			...n.sticky,
			dock: e.dock
		}, D.save(), Pe(), ke?.sendSection(R(u), t), jt());
	}
	function Qi(e) {
		let t = e.blockIds ?? [], { section: n } = At(e.sectionId, t[0]);
		if (!n || !t.length) return;
		ze(`sticky-group:${e.sectionId}`);
		let r = e.on ? Up("stk") : null;
		for (let e of n.blocks) t.includes(e.id) && (e.sticky = r ? {
			offset: 16,
			until: null,
			...e.sticky,
			group: r
		} : null);
		Ee(n, "block-edited"), D.save(), Pe(), ke?.sendSection(R(u), n), jt(), h(Y(e.on ? "status.stickyGrouped" : "status.stickyUngrouped"));
	}
	async function $i(e, t) {
		if (!t || !Ui) return;
		let n = (await tt({
			title: Y("canvas.templateNamePrompt"),
			placeholder: Y("ph.templateName")
		}))?.trim();
		if (!n) return;
		let r = pS(n);
		if (!r) {
			h(Y("status.invalidName"), "error");
			return;
		}
		if (R(qi).includes(r)) {
			h(Y("status.templateExists"), "error");
			return;
		}
		ze("templates");
		let i = {
			schemaVersion: 1,
			mal: {
				name: n,
				kind: e
			},
			[e]: t
		};
		Wi[r] = ha(`urd-draft-template-${r}`, () => null, g, `urd-draft-mal-${r}`), Wi[r].replace(i), Wi[r].save(), Ui.data.maler = [...R(qi), r], Ui.save(), M(qi, [...R(qi), r], !0), h(Y("status.templateSaved", { name: n }), "ok"), Pe(), Yi();
	}
	async function ea(e) {
		let t = Wi[e.id]?.data?.mal;
		t && await Ze({ title: Y("confirm.deleteTemplate", { name: t.name }) }) && (ze("templates"), R(Yr) === e.id && M(Yr, null), localStorage.removeItem(`urd-draft-template-${e.id}`), localStorage.removeItem(`urd-draft-mal-${e.id}`), delete Wi[e.id], Ui.data.maler = R(qi).filter((t) => t !== e.id), Ui.save(), M(qi, R(qi).filter((t) => t !== e.id), !0), Pe(), Yi());
	}
	async function ta() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/collections.json")).json();
		} catch {}
		q = ha("urd-draft-collections", () => e, g, "urd-draft-samlinger"), M(Li, [...q.data.samlinger ?? []], !0);
		for (let e of R(Li)) {
			let t = null;
			try {
				t = await (await fetch(`/content/samlinger/${e}.json`)).json();
			} catch {}
			Pi[e] = t, Ni[e] = ha(`urd-draft-collection-${e}`, () => t, g, `urd-draft-samling-${e}`), !t && !Ni[e].data && (Ni[e].replace({
				schemaVersion: 1,
				id: e,
				name: e,
				kind: "custom",
				entries: []
			}), Ni[e].save());
		}
		Fi = !0, na();
	}
	function na(e = !0) {
		let t = {};
		for (let e of R(Li)) Ni[e] && (t[e] = JSON.parse(JSON.stringify(Ni[e].data)));
		M(Ri, t, !0), e && ra();
	}
	function ra() {
		ke?.sendCollections(Ge(R(Ri)) ?? {});
	}
	function ia(e, t, n, r = !0) {
		let i = Ni[e];
		i && (ze(t), n(i.data), i.save(), Pe(), na(r));
	}
	function aa(e) {
		Ni[e.collection] && pa(e.collection);
	}
	function oa(e) {
		return (new DOMParser().parseFromString(String(e ?? ""), "text/html").body.textContent ?? "").trim();
	}
	function ca(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r !== "title" || oa(i)) && ia(t, `edit:collection:${t}:${n}:${r}`, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image");
	}
	function la(e, t, n) {
		let r = {
			schemaVersion: 1,
			id: e,
			name: t,
			kind: n,
			entries: []
		};
		Ni[e] = ha(`urd-draft-collection-${e}`, () => null, g, `urd-draft-samling-${e}`), Ni[e].replace(r), Ni[e].save(), q.data.samlinger = [...R(Li), e], q.save(), M(Li, [...R(Li), e], !0), M(zi, e, !0), Pe(), na();
	}
	function ua() {
		let e = R(Bi).trim();
		if (!e) return;
		let t = Vl(e);
		if (!t || R(Li).includes(t)) {
			h(Y(t ? "status.collectionExists" : "status.invalidName"), "error");
			return;
		}
		ze("collections"), la(t, e, R(Vi)), M(Bi, "");
	}
	function da() {
		let e = Y("seed.productCatalogName"), t = Vl(e) || "collection", n = t;
		for (let e = 2; R(Li).includes(n); e += 1) n = `${t}-${e}`;
		ze("collections"), la(n, e, "products"), zt(null, (e) => {
			e.props.collection = n;
		});
	}
	function fa(e) {
		ze("collections"), localStorage.removeItem(`urd-draft-collection-${e}`), localStorage.removeItem(`urd-draft-samling-${e}`), delete Ni[e], q.data.samlinger = R(Li).filter((t) => t !== e), q.save(), M(Li, R(Li).filter((t) => t !== e), !0), R(zi) === e && M(zi, null), Pe(), na();
	}
	function pa(e) {
		ia(e, `collection:${e}:add-entry`, (e) => {
			e.kind === "products" ? e.entries.push({
				id: Up("entry"),
				title: Y("seed.newProduct"),
				text: ""
			}) : e.entries.unshift({
				id: Up("entry"),
				title: Y("seed.newEntry"),
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	let ga = null, _a, va = new Promise((e) => {
		_a = e;
	}), ya = /* @__PURE__ */ j(null), ba = sn({}), xa = /* @__PURE__ */ j("0.0.0"), Sa = /* @__PURE__ */ j(sn([])), Ca = /* @__PURE__ */ j(sn([])), wa = /* @__PURE__ */ j("pending"), Ta = () => [.../* @__PURE__ */ new Set([...R(ya)?.enabled ?? [], ...R(ya)?.disabled ?? []])];
	function Ea() {
		M(ya, JSON.parse(JSON.stringify(ga.data)), !0);
	}
	let Da = /* @__PURE__ */ j(null);
	async function Oa() {
		try {
			let e = (await fetch("/urd.json", { cache: "no-store" })).headers.get("content-security-policy");
			if (!e) {
				M(Da, { unknown: !0 }, !0);
				return;
			}
			let t = (t) => new Set((e.split(";").map((e) => e.trim()).find((e) => e.startsWith(`${t} `)) ?? "").split(/\s+/).slice(1));
			M(Da, {
				frameSrc: t("frame-src"),
				connectSrc: t("connect-src"),
				scriptSrc: t("script-src")
			}, !0);
		} catch {
			M(Da, { unknown: !0 }, !0);
		}
	}
	async function ka() {
		Oa();
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		M(Ca, e.enabled ?? [], !0), ga = ha("urd-draft-plugins", () => e, g), Ea();
		try {
			M(xa, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of Ta()) Ma(e);
		Aa(), _a(), ke?.sendPlugins(Ge(R(ya))?.enabled ?? []);
	}
	async function Aa() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				ja();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), M(Sa, (t ?? []).filter((e) => !Ta().includes(e)), !0);
			for (let e of R(Sa)) Ma(e);
			M(wa, "ok");
		} catch {
			ja();
		}
	}
	function ja() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				M(Sa, e.filter((e) => !Ta().includes(e)), !0);
				for (let e of R(Sa)) Ma(e);
				M(wa, "ok");
				return;
			}
		} catch {}
		M(wa, "unavailable");
	}
	async function Ma(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = dS(t);
			ba[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && lS(R(xa), t.requiresEngine)
			};
		} catch {
			ba[e] = {
				name: e,
				errors: [Y("plugin.manifestNotFound", { id: e })],
				satisfied: !1
			};
		}
	}
	function Fa(e, t) {
		ze("plugins");
		let n = ga.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), ga.save(), Pe(), Ea(), La();
	}
	function La() {
		R(v) && (R(v).src = R(v).src);
	}
	function Ra(e) {
		ze("plugins");
		let t = ga.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), ga.save(), Pe(), Ea(), La();
	}
	function za(e, t) {
		qr(e, () => {
			R(k).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(R(k).footer);
		});
	}
	let Ba = /* @__PURE__ */ j(null), Va = /* @__PURE__ */ j(!1), Ha = /* @__PURE__ */ j(!1), Ua = (e) => e.length > 0 && [...e].every((e) => e.open);
	function Wa() {
		let e = R(Ba)?.querySelectorAll("details.group") ?? [];
		M(Va, e.length > 0), M(Ha, Ua(e), !0);
	}
	Dn(() => {
		R(ht), br().then(Wa);
	});
	function Ga() {
		let e = !R(Ha);
		R(Ba)?.querySelectorAll("details.group").forEach((t) => {
			t.open = e;
		}), Wa();
	}
	function Ka(e) {
		for (let t of e.querySelectorAll("details.group")) {
			let e = t.querySelector(":scope > summary");
			if (!e || e.querySelector(".fold-sub")) continue;
			let n = () => t.querySelectorAll(":scope > .group-items details.group");
			if (!n().length) continue;
			let r = document.createElement("button");
			r.type = "button", r.className = "fold-sub fold-toggle", r.innerHTML = X.foldToggle;
			let i = () => {
				let e = Ua(n());
				r.classList.toggle("collapse", e), r.title = Y(e ? "ui.collapseSub" : "ui.expandSub"), r.setAttribute("aria-label", r.title);
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
		let e = R(Ba);
		if (!e) return;
		let t = new MutationObserver(() => {
			Ka(e), Wa();
		});
		return t.observe(e, {
			childList: !0,
			subtree: !0
		}), e.addEventListener("toggle", Wa, !0), Ka(e), () => {
			t.disconnect(), e.removeEventListener("toggle", Wa, !0);
		};
	});
	function qa(e) {
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
	function Ja() {
		return Object.fromEntries(Object.entries(R(k).theme.tokens.color).map(([e, t]) => [e, qa(t)]));
	}
	let Ya = (e, t) => e && t && t[e] ? t[e] : e, Xa = [
		"bg",
		"surface",
		"text",
		"accent",
		"accent-text"
	], Za = [
		{
			id: "well",
			name: Y("themePreset.well.name"),
			note: Y("themePreset.well.note"),
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
			name: Y("themePreset.stone.name"),
			note: Y("themePreset.stone.note"),
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
			name: Y("themePreset.plum.name"),
			note: Y("themePreset.plum.note"),
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
			id: "ocean",
			name: Y("themePreset.ocean.name"),
			note: Y("themePreset.ocean.note"),
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
			name: Y("themePreset.night.name"),
			note: Y("themePreset.night.note"),
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
	function Qa(e) {
		qr("theme", () => {
			let t = e.scheme === "dark", n = t ? e.dark : e.light, r = t ? e.light : e.dark;
			for (let e of Xa) R(k).theme.tokens.color[e] = n[e];
			t ? R(k).theme.scheme = "dark" : delete R(k).theme.scheme, R(k).theme.alt = { tokens: { color: { ...r } } };
		});
	}
	let $a = /* @__PURE__ */ A(() => {
		if (!R(k)) return null;
		let e = R(k).theme.tokens.color, t = R(k).theme.alt?.tokens?.color ?? {}, n = R(k).theme.scheme === "dark";
		return Za.find((r) => {
			let i = n ? r.dark : r.light, a = n ? r.light : r.dark;
			return Xa.every((n) => e[n] === i[n] && t[n] === a[n]);
		})?.id ?? null;
	}), to = 0;
	async function io() {
		R(x) && (to = R(Ba)?.scrollTop ?? 0), M(x, !R(x)), ke?.sendChrome(R(x)), R(x) || M(Nt, null), R(x) && (await br(), requestAnimationFrame(() => {
			R(Ba) && (R(Ba).scrollTop = to);
		}));
	}
	function ao(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (ze(`edit:${e.blockId}`), n.props = e.props, D.save(), Pe(), R(kt)?.blockId === e.blockId && jt(), e.rerender && ke?.sendSection(R(u), t), M(f, ""), Jt(t.id, n));
	}
	function oo(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		ze(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop", i = n.frames.desktop?.w;
		n.frames[r] = e.frame, r === "desktop" && Ee(t, "desktop-changed-after-mobile"), D.save(), Pe(), R(kt)?.blockId === e.blockId && jt(), r === "desktop" && e.frame?.w !== i ? Jt(t.id, n) : r === "mobile" && Qt(t.id, n);
	}
	function so(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (n?.frames?.desktop && n.frames.desktop.h !== e.h) {
			if (e.fit) {
				R(oe) === "desktop" && e.seq === Kt.get(e.blockId) && co(t, n, e.h);
				return;
			}
			D.amendBaseline((t) => {
				let n = t.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
				n?.frames?.desktop && (n.frames.desktop.h = e.h);
			}), D.hasDraft() && ze(`edit:${e.blockId}`), n.frames.desktop.h = e.h, D.save(), Pe(), R(kt)?.blockId === e.blockId && jt();
		}
	}
	function co(e, t, n) {
		let r = Oc(e.blocks, t.id, n), i = {};
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
		Ee(e, "block-edited"), D.save(), Pe(), R(kt)?.blockId === t.id && jt(), ke?.sendFrames(e.id, Ge(i));
	}
	function lo(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			if (ze("mobile-reset"), e.blockId) {
				let n = t.blocks.find((t) => t.id === e.blockId);
				n && (n.frames.mobile = null);
			} else for (let e of t.blocks) e.frames.mobile = null;
			!Te(t) && t.responsive?.mobile && (t.responsive.mobile.attention = null), D.save(), Pe(), Se(), ke?.sendSection(R(u), t);
		}
	}
	function uo(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && typeof e.mobileOrder == "number" && (ze("mobile-order"), n.mobileOrder = e.mobileOrder, D.save(), Pe(), ke?.sendSection(R(u), t));
	}
	function fo(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (ze("review-done"), t.responsive.mobile.attention = null, D.save(), Pe(), Se());
	}
	function po(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (ze("block-flag"), typeof e.decor == "boolean" && (n.decor = e.decor), typeof e.hideMobile == "boolean" && (n.hideMobile = e.hideMobile), D.save(), Pe(), typeof e.hideMobile == "boolean" && R(oe) === "mobile" && ke?.sendSection(R(u), t), R(kt)?.blockId === e.blockId && jt());
	}
	function mo(e) {
		ze("add-section"), e.section.id || (e.section.id = Up("sec")), D.data.sections.splice(e.index, 0, e.section), D.save(), Pe(), ke?.sendPage(R(u), D.data), M(xn, e.section.id, !0), An(e.section), M(ht, "properties");
	}
	function ho(e) {
		let t = D.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (ze("move-section"), [t[n], t[r]] = [t[r], t[n]], D.save(), Pe(), ke?.sendPage(R(u), D.data));
	}
	function go(e) {
		ze("delete-section"), e.sectionId === R(xn) && (M(xn, null), M(Sn, null)), R(kt)?.sectionId === e.sectionId && M(kt, null), D.data.sections = D.data.sections.filter((t) => t.id !== e.sectionId), D.save(), Pe(), ke?.sendPage(R(u), D.data);
	}
	function _o(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			ze("section-size"), t.size = {
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
			e.moves?.length && (Ee(t, "section-height"), R(kt)?.sectionId === e.sectionId && jt()), e.sectionId === R(xn) && M(Cn, e.minHeight, !0), D.save(), Pe();
		}
	}
	function vo(e) {
		let t = D.data.sections.find((t) => t.id === e.fromSectionId), n = D.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		t && n && r && (ze(e.groupKey ? `edit:${e.groupKey}` : "move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), Ee(t, "block-moved"), Ee(n, "block-moved"), D.save(), Pe(), Se(), ke?.sendSection(R(u), t), ke?.sendSection(R(u), n), R(kt)?.blockId === e.blockId && (M(kt, {
			...R(kt),
			sectionId: e.toSectionId
		}, !0), jt()));
	}
	function yo(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		if (!t) return;
		let n = e.blockIds ?? [e.blockId];
		ze("delete-block"), t.blocks = t.blocks.filter((e) => !n.includes(e.id)), n.includes(R(kt)?.blockId) && M(kt, null), Ee(t, "block-deleted"), D.save(), Pe(), ke?.sendSection(R(u), t);
	}
	let bo = {
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
				submitLabel: Y("form.sendDefault"),
				successText: Y("form.thanksDefault"),
				fields: Hp()
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
		timeline: {
			type: "timeline",
			props: {
				items: [
					{
						year: "2019",
						title: Y("seed.timeline.t1"),
						text: Y("seed.timeline.text")
					},
					{
						year: "2022",
						title: Y("seed.timeline.t2"),
						text: Y("seed.timeline.text")
					},
					{
						year: "2026",
						title: Y("seed.timeline.t3"),
						text: Y("seed.timeline.text")
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
				text: Y("seed.quoteBlock.text"),
				attribution: Y("seed.quoteBlock.name"),
				role: Y("seed.quoteBlock.role"),
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
				label: Y("seed.statsBlock.label"),
				countUp: !0
			},
			w: 20,
			h: 90
		},
		ribbon: {
			type: "ribbon",
			props: {
				items: [
					Y("seed.ribbonBlock.a"),
					Y("seed.ribbonBlock.b"),
					Y("seed.ribbonBlock.c")
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
						Y("seed.table.h1"),
						Y("seed.table.h2"),
						Y("seed.table.h3")
					],
					[
						Y("seed.table.r1c1"),
						Y("seed.table.r1c2"),
						""
					],
					[
						Y("seed.table.r2c1"),
						Y("seed.table.r2c2"),
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
				doneText: Y("seed.countdown.done"),
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
	function xo(e) {
		let t = bo[e];
		return t ? {
			id: Up("blk"),
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
	function Co(e) {
		ke ? ke.sendPlaceBlock(e) : wo(sr()?.id, e);
	}
	function wo(e, t) {
		let n = D.data.sections.find((t) => t.id === e) ?? D.data.sections[0];
		if (!n) return;
		ze("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), Ee(n, "block-added"), D.save(), Pe(), ke?.sendSection(R(u), n), Jt(n.id, t);
	}
	function To(e, t, n, r) {
		let i = D.data.sections.find((t) => t.id === e);
		if (!i || !t?.length) return;
		ze("add-blocks");
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
		}), Ee(i, "block-added"), D.save(), Pe(), ke?.sendSection(R(u), i);
	}
	let Eo = {
		list: "calendar",
		cards: "calendar-cards",
		month: "calendar-month",
		next: "calendar-next",
		agenda: "calendar-agenda",
		week: "calendar-month",
		day: "calendar",
		year: "calendar-month"
	};
	function Do(e) {
		let t = ts(e), n = xo(Eo[t.view] ?? "calendar");
		n && (n.props = {
			...n.props,
			...t.view ? { view: t.view } : {},
			...t.id === "plain" ? {} : { design: t.id },
			...t.view === "next" ? {
				nextCount: 3,
				laterCount: 3
			} : {}
		}, Co(n));
	}
	let Oo = /* @__PURE__ */ j(sn([]));
	function ko(e) {
		let t = xo(e.kind);
		if (t) {
			if (e.at && typeof e.at.x == "number" && typeof e.at.y == "number") {
				let n = D.data.sections.find((t) => t.id === e.sectionId)?.grid ?? R(k).grid, r = HS({
					x: e.at.x,
					y: e.at.y,
					w: t.frames.desktop.w,
					h: t.frames.desktop.h,
					grid: n
				});
				t.frames.desktop.x = r.x, t.frames.desktop.y = r.y;
			} else t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40;
			wo(e.sectionId, t), ke?.sendSelect(t.id), e.kind === "image" && h(Y("status.imageBlockAdded")), e.kind === "gallery" && h(Y("status.galleryBlockAdded"));
		}
	}
	async function jo(e) {
		let t = [], n = 0, r = 0;
		for (let i of e) try {
			let e = await Ln(i);
			e.bytes > 4e5 && (r += 1), t.push({
				src: e.dataUrl,
				alt: Vl(i.name).replaceAll("-", " "),
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
	function Mo(e, t, n) {
		t ? h(Y("status.imagesReadFailed", { n: t }), "error") : n ? h(Y("status.imagesLarge", { n }), "error") : h(e ? "" : Y("status.noImagesAdded"));
	}
	async function No(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		h(Y("status.compressingImages"));
		let { images: n, failed: r, big: i } = await jo(t);
		n.length && zt("gallery-add", (e) => {
			e.props.images.push(...n);
		}), Mo(n.length, r, i);
	}
	function Po(e, t) {
		zt("gallery-move", (n) => {
			let r = e + t;
			r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
		});
	}
	function Fo(e) {
		zt("gallery-remove", (t) => {
			t.props.images.splice(e, 1);
		});
	}
	function Io(e, t, n) {
		zt(`edit:${R(kt).blockId}:img${e}-${t}`, (r) => {
			r.props.images[e][t] = n;
		});
	}
	function Lo(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/") && !i?.startsWith("data:audio/") && !i?.startsWith("data:video/")) return;
		let a = i.split(",", 2)[1], o = `media/${Vl(n || "image")}-${Hl(a)}.${Bl(i)}`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function Ro(e, t) {
		Lo(e, "image", e.title, t);
		for (let n of e.colors ?? []) Lo(n, "image", `${e.title}-${n.name}`, t);
	}
	function zo(e, t) {
		for (let n of e?.layers ?? []) {
			if (n.type === "image" && Lo(n.props, "src", "background", t), n.type === "slideshow") for (let e of n.props.images ?? []) Lo(e, "src", "background", t);
			n.type === "video" && (Lo(n.props, "src", "video", t), Lo(n.props, "poster", "plakat", t));
		}
	}
	function Bo(e, t) {
		if (e.type === "image" && Lo(e.props, "src", e.props.alt, t), e.type === "icon" && Lo(e.props, "image", "ikon", t), e.type === "gallery") for (let n of e.props.images ?? []) Lo(n, "src", n.alt || "gallery", t);
		e.type === "audio" && Lo(e.props, "src", e.props.title || "lyd", t), e.type === "video" && (Lo(e.props, "src", e.props.title || "video", t), Lo(e.props, "poster", "poster", t));
	}
	function Vo(e, t) {
		zo(e.background, t);
		for (let n of e.blocks) Bo(n, t);
	}
	function Z(e) {
		let t = [];
		e.meta?.og && Lo(e.meta.og, "image", "share", t);
		for (let n of e.sections) Vo(n, t);
		return t;
	}
	function Ho(e) {
		let t = [], n = e.nav?.logo;
		if (n?.type === "image" && Lo(n, "value", "logo", t), n?.type === "both" && Lo(n, "image", "logo", t), e.nav?.style && Lo(e.nav.style, "image", "menu", t), zo(e.nav?.style?.background, t), zo(e.footer?.background, t), e.footer?.brand && Lo(e.footer.brand, "logo", "footer-logo", t), e.nav?.launcher) {
			Lo(e.nav.launcher, "image", "snarvei", t);
			for (let n of e.nav.launcher.links ?? []) Lo(n, "image", "snarvei", t);
		}
		return Lo(e.site, "icon", "ikon", t), t;
	}
	let Uo = /* @__PURE__ */ j(!1), Wo = /* @__PURE__ */ j(null);
	function Go() {
		M(Uo, !R(Uo));
	}
	function Ko() {
		M(Uo, !1);
		try {
			qo(), h(Y("ui.discarded"), "info");
		} catch (e) {
			console.error("Urd: discard failed", e), h(String(e?.message ?? e), "error");
		}
	}
	Dn(() => {
		if (!R(Uo)) return;
		let e = (e) => {
			if (!R(Wo)?.contains(e.target)) {
				M(Uo, !1);
				return;
			}
			e.target instanceof Element && e.target.closest(".discard-confirm") && (e.preventDefault(), e.stopPropagation(), Ko());
		}, t = (e) => {
			e.key === "Escape" && M(Uo, !1);
		}, n = !1, r = (e) => {
			n = !!R(Wo)?.contains(e.target);
		}, i = () => {
			n = !1;
		}, a = () => {
			n || M(Uo, !1);
		};
		return window.addEventListener("pointerdown", r, !0), window.addEventListener("pointerup", i, !0), window.addEventListener("click", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", a), () => {
			window.removeEventListener("pointerdown", r, !0), window.removeEventListener("pointerup", i, !0), window.removeEventListener("click", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", a);
		};
	});
	function qo() {
		ze("discard");
		for (let e of R(k).pages) e.id !== R(u) && !Me.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = D.reset();
		if (Oe.reset(), ga && (ga.reset(), Ea()), q) {
			q.reset(), M(Li, [...q.data.samlinger ?? []], !0);
			for (let e of Object.keys(Ni)) R(Li).includes(e) ? Ni[e].reset() : delete Ni[e];
			na();
		}
		if (Ui) {
			Ui.reset(), M(qi, [...Ui.data.maler ?? []], !0);
			for (let e of Object.keys(Wi)) R(qi).includes(e) ? Wi[e].reset() : (localStorage.removeItem(`urd-draft-template-${e}`), localStorage.removeItem(`urd-draft-mal-${e}`), delete Wi[e]);
			Yi();
		}
		Ae(), M(b, {
			snap: !0,
			...R(k).grid
		}, !0), Pe(), M(f, ""), je(), R(k).pages.some((e) => e.id === R(u)) ? ke?.sendPage(R(u), e) : Ar(R(k).pages[0].id);
	}
	async function Jo() {
		if (vr) {
			h(Y("status.revertReloadBeforePublish"), "error");
			return;
		}
		if (R(wr)) {
			h(Y("update.publishBlocked"), "error");
			return;
		}
		h(Y("status.publishing"));
		let e = [], t = [], n = [], r = [];
		for (let i of R(k).pages) {
			let a = `urd-draft-${i.id}`, o = Me.has(i.id) || !R(l).pages.some((e) => e.id === i.id), s = null;
			if (i.id === R(u) && (D.hasDraft() || o)) s = D.data;
			else if (i.id !== R(u)) {
				let e = localStorage.getItem(a);
				if (e) try {
					s = Hv(JSON.parse(e), Oe.data);
				} catch {}
			}
			if (!s && o && (s = Or(i)), !s) continue;
			let c = JSON.parse(JSON.stringify(s));
			e.push(...Z(c)), e.push({
				path: i.file,
				content: JSON.stringify(c, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (Oe.hasDraft()) {
			let r = JSON.parse(JSON.stringify(R(k)));
			e.push(...Ho(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), e.push({
				path: "content/theme.css",
				content: jm(r.theme),
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(R(l).theme, R(k).theme) || t.push(Y("publish.part.theme")), i(R(l).nav, R(k).nav) || t.push(Y("publish.part.nav")), i(R(l).footer, R(k).footer) || t.push(Y("publish.part.footer")), i(R(l).pages, R(k).pages) || t.push(Y("publish.part.pages")), i(R(l).grid, R(k).grid) || t.push(Y("publish.part.grid")), (R(l).site.icon ?? null) !== (R(k).site.icon ?? null) && t.push(Y("publish.part.icon"));
			let { icon: a, ...o } = R(l).site, { icon: s, ...c } = R(k).site;
			i(o, c) || t.push(Y("publish.part.siteInfo"));
		}
		let i = Object.entries(Ni).filter(([, e]) => e.hasDraft());
		if (i.length || q?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) Ro(t, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), vS.includes(i.kind) && e.push({
					path: `content/samlinger/${t}.xml`,
					content: yS({
						title: i.name ?? t,
						origin: location.origin,
						path: `/content/samlinger/${t}.xml`,
						items: i.entries.map((e) => ({
							id: e.id,
							title: oa(e.title),
							text: oa(e.text),
							date: e.date,
							href: e.href
						}))
					}),
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (q?.hasDraft()) {
				e.push({
					path: "content/collections.json",
					content: JSON.stringify(q.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-collections", "urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/collections.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!R(Li).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push(Y("publish.part.collections"));
		}
		let a = Object.entries(Wi).filter(([, e]) => e.hasDraft());
		if (a.length || Ui?.hasDraft()) {
			for (let [t, r] of a) {
				let i = JSON.parse(JSON.stringify(r.data));
				i.section && Vo(i.section, e);
				for (let t of i.blocks ?? []) Bo(t, e);
				for (let t of i.page?.sections ?? []) Vo(t, e);
				e.push({
					path: `content/maler/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-mal-${t}`);
			}
			if (Ui?.hasDraft()) {
				e.push({
					path: "content/maler.json",
					content: JSON.stringify(Ui.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-templates", "urd-draft-maler");
				let t = { maler: [] };
				try {
					t = await (await fetch("/content/maler.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.maler ?? []) {
					let t = `content/maler/${n}.json`;
					!R(qi).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push(Y("publish.part.templates"));
		}
		ga?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(ga.data, null, 2) + "\n",
			encoding: "utf-8"
		}), n.push("urd-draft-plugins"), t.push(Y("publish.part.plugins")));
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
			content: gS(R(k).pages, location.origin),
			encoding: "utf-8"
		}), e.push({
			path: "robots.txt",
			content: _S(location.origin),
			encoding: "utf-8"
		});
		let o = new Set(e.map((e) => e.path)), s = (t) => {
			o.has(t) || e.push({
				path: t,
				delete: !0
			});
		};
		for (let e of R(l).pages) {
			let t = R(k).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && s(`${e.path.slice(1)}/index.html`) : (s(e.file), e.path !== "/" && s(`${e.path.slice(1)}/index.html`));
		}
		let c = await mr(e);
		if (!c.ok) {
			h(Y("status.publishAborted"), "error");
			return;
		}
		let d = {
			message: Y("publish.commitMessage", { titles: t.join(", ") || Y("publish.theSite") }),
			files: e,
			...c.head ? { expect: c.head } : {}
		}, f = null;
		try {
			f = await fetch("/api/github/commit", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(d)
			});
		} catch {}
		if (f?.ok) {
			let { sha: t } = await f.json().catch(() => ({}));
			t ? fr = t : pr(), Z(D.data), Ho(R(k));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) Me.add(e);
			if (M(l, JSON.parse(JSON.stringify(R(k))), !0), Oe = ha("urd-draft-site", () => R(l), g), Ae(), ga) {
				let e = JSON.parse(JSON.stringify(ga.data));
				ga = ha("urd-draft-plugins", () => e, g), Ea();
			}
			if (q) {
				for (let e of Object.values(Ni)) for (let t of e.data.entries) Ro(t, []);
				let e = JSON.parse(JSON.stringify(q.data));
				q = ha("urd-draft-collections", () => e, g, "urd-draft-samlinger"), Pi = {};
				for (let e of R(Li)) {
					if (!Ni[e]) continue;
					let t = JSON.parse(JSON.stringify(Ni[e].data));
					Pi[e] = t, Ni[e] = ha(`urd-draft-collection-${e}`, () => t, g, `urd-draft-samling-${e}`);
				}
				na();
			}
			if (Ui) {
				for (let e of Object.values(Wi)) {
					e.data?.section && Vo(e.data.section, []);
					for (let t of e.data?.blocks ?? []) Bo(t, []);
					for (let t of e.data?.page?.sections ?? []) Vo(t, []);
				}
				let e = JSON.parse(JSON.stringify(Ui.data));
				Ui = ha("urd-draft-templates", () => e, g, "urd-draft-maler"), Gi = {};
				for (let e of R(qi)) {
					if (!Wi[e]) continue;
					let t = JSON.parse(JSON.stringify(Wi[e].data));
					Gi[e] = t, Wi[e] = ha(`urd-draft-template-${e}`, () => t, g, `urd-draft-mal-${e}`);
				}
				Yi();
			}
			M(b, {
				snap: !0,
				...R(k).grid
			}, !0);
			let i = JSON.parse(JSON.stringify(D.data));
			D = ha(`urd-draft-${R(u)}`, () => i, g), Me.has(R(u)) && _(`urd-draft-${R(u)}`, JSON.stringify(i)), Pe(), h(Y("status.published"), "info"), xr(e);
		} else if (f?.status === 401) {
			let e = await f.json().catch(() => null);
			h(e?.code === "loginExpired" ? Y("status.loginExpired") : Y("status.loginRequired", { reason: sa(e) ?? Y("status.unknownReason") }), "error"), await dr();
		} else f?.status === 403 ? h(sa(await f.json().catch(() => null)) ?? Y("status.noPublishAccess"), "error") : f?.status === 409 ? h(Y("status.publishRace"), "error") : h(f ? sa(await f.json().catch(() => null)) ?? Y("status.publishFailed") : Y("status.publishUnavailable"), "error");
	}
	Ye();
	function Yo() {
		an = null;
	}
	Qe("urd-editor", {
		get selectedBlock() {
			return R(kt);
		},
		get siteDraft() {
			return R(k);
		},
		get viewMode() {
			return R(oe);
		},
		get sections() {
			return D?.data.sections ?? [];
		},
		get collectionIds() {
			return R(Li);
		},
		get collectionsView() {
			return R(Ri);
		},
		get pluginBlocks() {
			return R(Oo);
		},
		get bridge() {
			return ke;
		},
		blockLabel: (e) => bn[e] ?? e,
		blockEntranceOptions: () => er,
		hoverOptions: () => tr,
		isEntrance: Qn,
		themeSwatches: Xn,
		siteCalendars: Di,
		siteCalendarById: ki,
		addSiteCalendar: Ai,
		newSeed: Hn,
		setStatus: h,
		mutateBlock: zt,
		setBlockProp: Bt,
		setBlockProps: Vt,
		setBlockFrame: pn,
		setBlockFit: nn,
		setBlockFitMin: rn,
		setBlockSize: on,
		endSizeGesture: Yo,
		setBlockSizeBound: ln,
		setBlockHeightMode: un,
		setBlockHeightAlign: dn,
		canStretch: fn,
		setBlockHideMobile: yn,
		setBlockDecor: vn,
		setBlockAnimation: rr,
		setBlockHover: ir,
		setBlockAnimProp: ar,
		designWidth: mn,
		shapePx: hn,
		setShapeSizePx: gn,
		setBoxStyle: _n,
		buttonTargets: Ht,
		setButtonTarget: Ut,
		openImageEditor: Wt,
		compressOrTrim: Ln,
		imageErrorText: Rn,
		setBlockVideoFile: Bn,
		setBlockVideoPoster: Vn,
		addGalleryImages: No,
		moveGalleryImage: Po,
		removeGalleryImage: Fo,
		setGalleryImageField: Io,
		addCollectionEntry: pa,
		createCatalogForBlock: da,
		openPanel: (e, t = {}) => {
			t.calendars && M(Ci, !0), M(ht, e, !0);
		},
		openCollection: (e) => {
			M(zi, e, !0), M(ht, "collections");
		},
		openDesignPicker: () => {
			M(Ft, { mode: "set" }, !0);
		},
		get activePanel() {
			return R(ht);
		},
		get missingSeo() {
			return R(ci);
		},
		get pageId() {
			return R(u);
		},
		get seoDraft() {
			return R(ii);
		},
		get templateIds() {
			return R(qi);
		},
		get newPageTemplate() {
			return R(Yr);
		},
		set newPageTemplate(e) {
			M(Yr, e, !0);
		},
		get newPageTitle() {
			return R(Jr);
		},
		set newPageTitle(e) {
			M(Jr, e, !0);
		},
		get pageMenuFor() {
			return R(Xr);
		},
		set pageMenuFor(e) {
			M(Xr, e, !0);
		},
		addPage: ei,
		deletePage: mi,
		handleDeleteTemplate: ea,
		renamePage: ri,
		savePageAsTemplate: ti,
		selectPage: Ar,
		setPageNoindex: si,
		setPageSeo: oi,
		setPageSlug: pi,
		templateStores: Wi,
		uploadOgImage: ui,
		get grid() {
			return R(b);
		},
		navBgCtx: Gn,
		siteMutate: qr,
		get bindsFrom() {
			return R(fe);
		},
		get layoutGutter() {
			return R(bi);
		},
		get layoutWidth() {
			return R(yi);
		},
		get site() {
			return R(l);
		},
		get iconEditorImage() {
			return R(hi);
		},
		set iconEditorImage(e) {
			M(hi, e, !0);
		},
		get openSiteCalendar() {
			return R(wi);
		},
		set openSiteCalendar(e) {
			M(wi, e, !0);
		},
		get siteCalendarsOpen() {
			return R(Ci);
		},
		set siteCalendarsOpen(e) {
			M(Ci, e, !0);
		},
		get siteZoneBad() {
			return R(ji);
		},
		set siteZoneBad(e) {
			M(ji, e, !0);
		},
		siteLangOptions: Si,
		siteLangValue: xi,
		svgAutoTrim: In,
		get activeThemePreset() {
			return R($a);
		},
		THEME_PRESETS: Za,
		applyThemePreset: Qa,
		readableOn: c,
		suggestAltColors: Ja,
		themeHex: Ya,
		setGrid: ur,
		footerBgCtx: Kn,
		footerMutate: za,
		get iframeEl() {
			return R(v);
		},
		get designPicker() {
			return R(Ft);
		},
		set designPicker(e) {
			M(Ft, e, !0);
		},
		addCalendarDesign: Do,
		buildBlock: xo,
		compressMany: jo,
		reportUpload: Mo,
		requestPlacement: Co,
		get activeSectionId() {
			return R(xn);
		},
		get previewPalette() {
			return R(Yn);
		},
		get sectionAnim() {
			return R(Tn);
		},
		get sectionBg() {
			return R(wn);
		},
		get sectionBgCtx() {
			return R(Wn);
		},
		get sectionDivider() {
			return R(kn);
		},
		get sectionGrid() {
			return R(Sn);
		},
		get sectionHover() {
			return R(En);
		},
		get sectionMinHeight() {
			return R(Cn);
		},
		get sectionTheme() {
			return R(On);
		},
		BLOCK_LABELS: bn,
		ENTRANCE_OPTIONS: $n,
		HOVER_OPTIONS: tr,
		animObj: Zn,
		mutateSection: Pn,
		normalizeAnim: nr,
		setSectionGrid: lr,
		setSectionHeight: or,
		toggleSectionGrid: cr,
		get collectionStores() {
			return Ni;
		},
		get activeCollection() {
			return R(zi);
		},
		set activeCollection(e) {
			M(zi, e, !0);
		},
		get newCollectionKind() {
			return R(Vi);
		},
		set newCollectionKind(e) {
			M(Vi, e, !0);
		},
		get newCollectionName() {
			return R(Bi);
		},
		set newCollectionName(e) {
			M(Bi, e, !0);
		},
		addCollection: ua,
		mutateCollection: ia,
		plainTitle: oa,
		removeCollection: fa,
		get liveCsp() {
			return R(Da);
		},
		get pluginDiscovery() {
			return R(wa);
		},
		get pluginEngine() {
			return R(xa);
		},
		get pluginInfo() {
			return ba;
		},
		get pluginsView() {
			return R(ya);
		},
		get pluginsFound() {
			return R(Sa);
		},
		set pluginsFound(e) {
			M(Sa, e, !0);
		},
		knownPlugins: Ta,
		loadPluginInfo: Ma,
		removePlugin: Ra,
		setPluginEnabled: Fa,
		get auth() {
			return R(y);
		},
		get historyError() {
			return R(gr);
		},
		get historyList() {
			return R(hr);
		},
		get baseSha() {
			return fr;
		},
		set baseSha(e) {
			fr = e;
		},
		get revertedSinceLoad() {
			return vr;
		},
		set revertedSinceLoad(e) {
			vr = e;
		},
		askConfirm: Ze,
		loadHistory: _r,
		refreshBaseSha: pr,
		get updateError() {
			return R(Cr);
		},
		get updateInfo() {
			return R(Sr);
		},
		get updateBusy() {
			return R(wr);
		},
		set updateBusy(e) {
			M(wr, e, !0);
		},
		get updateSkip() {
			return R(Tr);
		},
		set updateSkip(e) {
			M(Tr, e, !0);
		},
		loadUpdateCheck: Er,
		get secBox() {
			return R(jn);
		},
		BG_DEFS: r,
		BG_TYPES: n,
		readVideoFile: zn
	});
	var Xo = SC();
	jr("keydown", cn, Je), jr("pointerdown", cn, qe);
	var Zo = P(Xo), Qo = N(Zo), $o = (e) => {
		var t = US(), n = N(t);
		W(n, () => X.pencil);
		var r = I(n);
		O(t), L((e, n) => {
			J(t, "title", e), H(r, ` ${n ?? ""}`);
		}, [() => Y("tip.backToEdit"), () => Y("ui.edit")]), z("click", t, io), V(e, t);
	};
	U(Qo, (e) => {
		R(x) || e($o);
	});
	var es = I(Qo, 2);
	let rs;
	var is = N(es), as = N(is), os = (e) => {
		var t = eC(), n = P(t), r = F(n, !0), i = I(n, 2), a = N(i), o = (e) => {
			var t = KS(), n = N(t);
			let r;
			var i = N(n);
			W(i, () => X[`device_${R(ie)}`]), W(I(i), () => X.caret), O(n);
			var a = I(n, 2), o = (e) => {
				var t = GS();
				ni(t, 21, () => R(ne), (e) => e.id, (e, t) => {
					var n = WS();
					let r;
					var i = N(n);
					W(i, () => X[`device_${R(t).id}`]);
					var a = I(i);
					O(n), L((e, i) => {
						r = Ei(n, 1, "ghost", null, r, { active: R(ie) === R(t).id }), J(n, "title", e), H(a, ` ${i ?? ""}`);
					}, [() => re(R(t)), () => Y(`lbl.device.${R(t).id}`)]), z("click", n, () => {
						M(ie, R(t).id, !0), M(B, null);
					}), V(e, n);
				}), O(t), V(e, t);
			};
			U(a, (e) => {
				R(B) === "device" && e(o);
			}), O(t), L((e) => {
				r = Ei(n, 1, "ghost", null, r, { active: R(B) === "device" }), J(n, "title", e);
			}, [() => Y("lbl.group.device")]), z("click", n, () => M(B, R(B) === "device" ? null : "device", !0)), V(e, t);
		}, s = (e) => {
			var t = JS(), n = P(t), r = F(n, !0), i = I(n, 2);
			ni(i, 21, () => R(ne), (e) => e.id, (e, t) => {
				var n = qS();
				let r;
				W(n, () => X[`device_${R(t).id}`], !0), O(n), L((e) => {
					r = Ei(n, 1, "ghost", null, r, { active: R(ie) === R(t).id }), J(n, "title", e);
				}, [() => re(R(t))]), z("click", n, () => M(ie, R(t).id, !0)), V(e, n);
			}), O(i), L((e) => H(r, e), [() => Y("lbl.group.device")]), V(e, t);
		};
		U(a, (e) => {
			Hr.device ? e(o) : e(s, -1);
		});
		var c = I(a, 2), l = (e) => {
			var t = XS(), n = N(t);
			let r;
			var i = N(n), a = F(i);
			W(I(i), () => X.caret), O(n);
			var o = I(n, 2), s = (e) => {
				var t = YS(), n = N(t), r = N(n);
				W(r, () => X.minus, !0), O(r);
				var i = I(r, 2), a = F(i), o = I(i, 2);
				W(o, () => X.plus, !0), O(o), O(n);
				var s = I(n, 2);
				let c;
				var l = N(s);
				W(l, () => X.fit);
				var u = I(l);
				O(s), O(t), L((e, t, n, l, d, f) => {
					J(r, "title", e), J(i, "title", t), H(a, `${n ?? ""}%`), J(o, "title", l), c = Ei(s, 1, "ghost", null, c, { active: R(ue) === "fit" }), J(s, "title", d), H(u, ` ${f ?? ""}`);
				}, [
					() => Y("tip.zoomOut"),
					() => Y("tip.zoomCurrent"),
					() => Math.round(R(he) * 100),
					() => Y("tip.zoomIn"),
					() => Y("tip.zoomFit"),
					() => Y("lbl.zoom.fit")
				]), z("click", r, () => ge(-1)), z("click", o, () => ge(1)), z("click", s, () => M(ue, "fit")), V(e, t);
			};
			U(o, (e) => {
				R(B) === "zoom" && e(s);
			}), O(t), L((e, t) => {
				r = Ei(n, 1, "ghost", null, r, { active: R(B) === "zoom" }), J(n, "title", e), H(a, `${t ?? ""}%`);
			}, [() => Y("lbl.group.zoom"), () => Math.round(R(he) * 100)]), z("click", n, () => M(B, R(B) === "zoom" ? null : "zoom", !0)), V(e, t);
		}, u = (e) => {
			var t = ZS(), n = P(t), r = F(n, !0), i = I(n, 2), a = N(i);
			W(a, () => X.minus, !0), O(a);
			var o = I(a, 2), s = F(o), c = I(o, 2);
			W(c, () => X.plus, !0), O(c);
			var l = I(c, 2);
			let u;
			W(l, () => X.fit, !0), O(l), O(i), L((e, t, n, i, d, f) => {
				H(r, e), J(a, "title", t), J(o, "title", n), H(s, `${i ?? ""}%`), J(c, "title", d), u = Ei(l, 1, "ghost", null, u, { active: R(ue) === "fit" }), J(l, "title", f);
			}, [
				() => Y("lbl.group.zoom"),
				() => Y("tip.zoomOut"),
				() => Y("tip.zoomCurrent"),
				() => Math.round(R(he) * 100),
				() => Y("tip.zoomIn"),
				() => Y("tip.zoomFit")
			]), z("click", a, () => ge(-1)), z("click", c, () => ge(1)), z("click", l, () => M(ue, "fit")), V(e, t);
		};
		U(c, (e) => {
			Hr.zoom ? e(l) : e(u, -1);
		});
		var d = I(c, 2), f = (e) => {
			var t = KS(), n = N(t);
			let r;
			var i = N(n);
			W(i, () => X.gridToggle), W(I(i), () => X.caret), O(n);
			var a = I(n, 2), o = (e) => {
				var t = QS(), n = N(t);
				let r;
				var i = N(n);
				W(i, () => X.gridToggle);
				var a = I(i);
				O(n);
				var o = I(n, 2);
				let s;
				var c = N(o);
				W(c, () => X.guides);
				var l = I(c);
				O(o), O(t), L((e, t, i, c) => {
					r = Ei(n, 1, "ghost", null, r, { active: R(Wr) }), J(n, "title", e), H(a, ` ${t ?? ""}`), s = Ei(o, 1, "ghost", null, s, { active: R(Pr) }), J(o, "title", i), H(l, ` ${c ?? ""}`);
				}, [
					() => Y("tip.gridToggle"),
					() => Y("lbl.view.grid"),
					() => Y("tip.guides"),
					() => Y("lbl.view.guides")
				]), z("click", n, Gr), z("click", o, Ur), V(e, t);
			};
			U(a, (e) => {
				R(B) === "view" && e(o);
			}), O(t), L((e) => {
				r = Ei(n, 1, "ghost", null, r, { active: R(B) === "view" || R(Wr) || R(Pr) }), J(n, "title", e);
			}, [() => Y("lbl.group.view")]), z("click", n, () => M(B, R(B) === "view" ? null : "view", !0)), V(e, t);
		}, p = (e) => {
			var t = $S(), n = P(t), r = F(n, !0), i = I(n, 2), a = N(i);
			let o;
			W(a, () => X.gridToggle, !0), O(a);
			var s = I(a, 2);
			let c;
			W(s, () => X.guides, !0), O(s), O(i), L((e, t, n) => {
				H(r, e), o = Ei(a, 1, "ghost", null, o, { active: R(Wr) }), J(a, "title", t), c = Ei(s, 1, "ghost", null, c, { active: R(Pr) }), J(s, "title", n);
			}, [
				() => Y("lbl.group.view"),
				() => Y("tip.gridToggle"),
				() => Y("tip.guides")
			]), z("click", a, Gr), z("click", s, Ur), V(e, t);
		};
		U(d, (e) => {
			Hr.view ? e(f) : e(p, -1);
		}), O(i), Hi(i, (e) => M(Br, e), () => R(Br)), L((e, t) => {
			J(n, "title", e), H(r, t);
		}, [() => Y("tip.switchPage"), () => Ne()?.title ?? ""]), z("click", n, () => Dt("pages")), V(e, t);
	};
	U(as, (e) => {
		R(l) && e(os);
	});
	var ss = I(as, 2), cs = (e) => {
		var t = tC(), n = N(t);
		W(n, () => X.phone);
		var r = I(n, 2), i = F(r, !0), a = F(I(r, 2), !0);
		O(t), L((e, n) => {
			J(t, "title", e), H(i, n), H(a, R(xe));
		}, [() => Y("tip.attention"), () => Y(R(xe) === 1 ? "ui.attentionOne" : "ui.attentionMany", { n: R(xe) })]), z("click", t, Ce), V(e, t);
	};
	U(ss, (e) => {
		R(xe) > 0 && e(cs);
	}), O(is);
	var ls = I(is, 2), us = N(ls), ds = (e) => {
		var t = rC(), n = N(t), r = F(N(n), !0);
		De(2), O(n);
		var i = I(n, 2), a = N(i);
		let o;
		var s = N(a);
		W(s, () => X.restore);
		var c = F(I(s), !0);
		O(a);
		var l = I(a, 2), u = (e) => {
			var t = nC(), n = N(t);
			W(n, () => X.restore);
			var r = I(n);
			O(t), L((e, n) => {
				J(t, "title", e), H(r, ` ${n ?? ""}`);
			}, [() => Y("tip.discardArmed"), () => Y("ui.discardConfirm")]), z("click", t, Ko), V(e, t);
		};
		U(l, (e) => {
			R(Uo) && e(u);
		}), O(i), Hi(i, (e) => M(Wo, e), () => R(Wo)), O(t), L((e, t, i, s, l) => {
			J(n, "title", e), J(n, "aria-label", t), H(r, i), o = Ei(a, 1, "discard-dot", null, o, { armed: R(Uo) }), J(a, "title", s), H(c, l);
		}, [
			() => Y("ui.unpublished"),
			() => Y("ui.unpublished"),
			() => Y("ui.unpublished"),
			() => R(Uo) ? Y("tip.discardArmed") : Y("tip.discard"),
			() => Y("ui.discard")
		]), z("click", a, Go), vi(2, t, () => ma, () => ({
			x: 24,
			duration: Lt ? 0 : 150
		})), V(e, t);
	};
	U(us, (e) => {
		R(d) && e(ds);
	}), O(ls);
	var fs = I(ls, 2), ps = N(fs), ms = (e) => {
		var t = sC(), n = P(t), r = N(n), i = (e) => {
			var t = iC(), n = P(t);
			W(n, () => X.eye);
			var r = F(I(n, 2), !0);
			L((e) => H(r, e), [() => Y("ui.cleanView")]), V(e, t);
		}, a = (e) => {
			var t = iC(), n = P(t);
			W(n, () => X.pencil);
			var r = F(I(n, 2), !0);
			L((e) => H(r, e), [() => Y("ui.edit")]), V(e, t);
		};
		U(r, (e) => {
			R(x) ? e(i) : e(a, -1);
		}), O(n);
		var o = I(n, 2), s = (e) => {
			var t = aC(), n = N(t), r = (e) => {
				var t = Vr();
				W(P(t), () => X.warn), V(e, t);
			};
			U(n, (e) => {
				R(y).allowed || e(r);
			});
			var i = I(n, 1, !0);
			O(t), L((e) => {
				J(t, "title", e), H(i, R(y).login);
			}, [() => R(y).allowed ? Y("tip.hasPublishAccess") : Y("tip.noPublishAccess")]), V(e, t);
		}, c = (e) => {
			var t = oC(), n = F(t, !0);
			L((e) => H(n, e), [() => Y("ui.loginGitHub")]), V(e, t);
		};
		U(o, (e) => {
			R(y)?.loggedIn ? e(s) : R(y) && e(c, 1);
		});
		var l = I(o, 2), u = N(l);
		W(u, () => X.external);
		var f = F(I(u, 2), !0);
		O(l);
		var p = I(l, 2), m = F(p, !0);
		L((e, t, r, i, a) => {
			J(n, "title", e), J(l, "href", t), J(l, "title", r), H(f, i), p.disabled = !R(d), H(m, a);
		}, [
			() => R(x) ? Y("tip.chromeHide") : Y("tip.chromeShow"),
			() => Ne()?.path ?? "/",
			() => Y("ui.viewSite"),
			() => Y("ui.viewSite"),
			() => Y("ui.publish")
		]), z("click", n, io), z("click", p, Jo), V(e, t);
	};
	U(ps, (e) => {
		R(l) && e(ms);
	}), O(fs), O(es);
	var hs = I(es, 2), gs = (e) => {
		var t = hC(), n = N(t);
		let r;
		var a = N(n);
		ni(a, 17, () => gt, Qr, (e, t, n) => {
			var r = lC(), i = P(r), a = F(i, !0);
			ni(I(i, 2), 16, () => R(t), (e) => e, (e, t) => {
				var n = cC();
				let r;
				var i = F(n, !0);
				L(() => {
					r = Ei(n, 1, "", null, r, { active: R(ht) === t }), H(i, vt[t]);
				}), z("click", n, () => Dt(t)), V(e, n);
			}), L((e) => H(a, e), [() => Y(_t[n])]), V(e, r);
		});
		var s = I(a, 2), c = I(N(s), 2);
		let l;
		W(c, () => X.gear, !0), O(c);
		var d = I(c, 2), f = (e) => {
			var t = fC(), n = N(t), r = F(n, !0), a = I(n, 2), s = N(a);
			Ao(I(s), {
				get value() {
					return R(o);
				},
				get options() {
					return i;
				},
				onchange: (e) => M(o, e, !0)
			}), O(a);
			var c = I(a, 2), l = N(c), u = I(l);
			{
				let e = /* @__PURE__ */ A(() => [["auto", Y("lang.auto")], ...Ct()]);
				Ao(u, {
					get value() {
						return Tt;
					},
					get options() {
						return R(e);
					},
					onchange: Et
				});
			}
			O(c);
			var d = I(c, 2), f = N(d), p = I(f);
			{
				let e = /* @__PURE__ */ A(() => [["strip", Y("settings.layoutPickerStrip")], ["menu", Y("settings.layoutPickerMenu")]]);
				Ao(p, {
					get value() {
						return R(Ir);
					},
					get options() {
						return R(e);
					},
					onchange: Lr
				});
			}
			O(d);
			var m = I(d, 2), h = N(m), g = I(h);
			{
				let e = /* @__PURE__ */ A(() => [["wide", Y("settings.menuWide")], ["narrow", Y("settings.menuNarrow")]]);
				Ao(g, {
					get value() {
						return eo.widthPref;
					},
					get options() {
						return R(e);
					},
					get onchange() {
						return no;
					}
				});
			}
			O(m);
			var _ = I(m, 2), v = N(_), y = I(v);
			{
				let e = /* @__PURE__ */ A(() => [["remember", Y("settings.panelsRemember")], ["reset", Y("settings.panelsReset")]]);
				Ao(y, {
					get value() {
						return R(pt);
					},
					get options() {
						return R(e);
					},
					onchange: mt
				});
			}
			O(_);
			var b = I(_, 2), x = F(b, !0), S = I(b, 2), C = N(S);
			let w;
			var ee = F(C, !0), te = I(C, 2);
			let ne;
			var re = F(te, !0);
			O(S);
			var ie = I(S, 2), ae = (e) => {
				var t = uC(), n = N(t), r = F(n, !0), i = I(n, 2);
				G(i);
				var a = I(i, 2), o = F(a, !0), s = I(a, 2);
				G(s), O(t), L((e, t, n, a) => {
					H(r, e), J(i, "min", 640), J(i, "max", Ex), J(i, "title", t), K(i, R(T).width), H(o, n), J(s, "max", Dx), J(s, "title", a), K(s, R(T).height || "");
				}, [
					() => Y("lbl.screen.w"),
					() => Y("tip.screen.width", {
						min: 640,
						max: Ex
					}),
					() => Y("lbl.screen.h"),
					() => Y("tip.screen.height", {
						min: 480,
						max: Dx
					})
				]), z("change", i, (e) => {
					E({ width: Number(e.target.value) }), e.target.value = R(T).width;
				}), z("change", s, (e) => {
					E({ height: Number(e.target.value) }), e.target.value = R(T).height || "";
				}), V(e, t);
			};
			U(ie, (e) => {
				R(T).mode === "custom" && e(ae);
			});
			var oe = I(ie, 2), se = (e) => {
				var t = dC(), n = P(t), r = F(n, !0), i = I(n, 2), a = N(i), o = I(a);
				G(o), O(i), L((e, t, s, c, l) => {
					J(n, "title", e), H(r, t), J(i, "title", s), H(a, `${c ?? ""} `), J(o, "placeholder", l), K(o, R(k).analytics?.token ?? "");
				}, [
					() => Y("tip.analytics"),
					() => Y("settings.analytics"),
					() => Y("tip.analytics"),
					() => Y("lbl.analyticsToken"),
					() => Y("ph.analyticsToken")
				]), z("change", o, (e) => _i(e.target.value)), V(e, t);
			};
			U(oe, (e) => {
				R(k) && e(se);
			}), O(t), L((e, t, n, i, o, u, p, g, y, E, ie, ae, oe, se, ce, le) => {
				H(r, e), J(a, "title", t), H(s, `${n ?? ""} `), J(c, "title", i), H(l, `${o ?? ""} `), J(d, "title", u), H(f, `${p ?? ""} `), J(m, "title", g), H(h, `${y ?? ""} `), J(_, "title", E), H(v, `${ie ?? ""} `), J(b, "title", ae), H(x, oe), J(S, "title", se), w = Ei(C, 1, "", null, w, { on: R(T).mode === "own" }), H(ee, ce), ne = Ei(te, 1, "", null, ne, { on: R(T).mode === "custom" }), H(re, le);
			}, [
				() => Y("settings.title"),
				() => Y("topbar.adminTheme.title"),
				() => Y("settings.theme"),
				() => Y("topbar.language.title"),
				() => Y("settings.language"),
				() => Y("tip.settings.layoutPicker"),
				() => Y("settings.layoutPicker"),
				() => Y("tip.settings.menuWidth"),
				() => Y("settings.menuWidth"),
				() => Y("tip.settings.panels"),
				() => Y("settings.panels"),
				() => Y("tip.screen.mode"),
				() => Y("settings.screen"),
				() => Y("tip.screen.mode"),
				() => Y("lbl.screen.own"),
				() => Y("lbl.screen.size")
			]), z("click", C, () => E({ mode: "own" })), z("click", te, () => E({ mode: "custom" })), V(e, t);
		};
		U(d, (e) => {
			R(Fr) && e(f);
		}), O(s), Hi(s, (e) => M(Rr, e), () => R(Rr)), O(n);
		var p = I(n, 2), m = (e) => {
			var t = mC();
			let n;
			var r = N(t), i = N(r), a = F(i, !0), o = I(i, 2), s = (e) => {
				var t = pC();
				let n;
				W(t, () => X.foldToggle, !0), O(t), L((e, r) => {
					n = Ei(t, 1, "fold-all fold-toggle", null, n, { collapse: R(Ha) }), J(t, "title", e), J(t, "aria-label", r);
				}, [() => Y(R(Ha) ? "ui.collapseAll" : "ui.expandAll"), () => Y(R(Ha) ? "ui.collapseAll" : "ui.expandAll")]), z("click", t, Ga), V(e, t);
			};
			U(o, (e) => {
				R(Va) && e(s);
			}), O(r);
			var c = I(r, 2), l = (e) => {
				iy(e, {});
			}, u = (e) => {
				hb(e, {});
			}, d = (e) => {
				Hb(e, {});
			}, f = (e) => {
				Zb(e, {});
			}, p = (e) => {
				wm(e, {});
			}, m = (e) => {
				$b(e, {});
			}, h = (e) => {
				u_(e, {});
			}, g = (e) => {
				xx(e, {});
			}, _ = (e) => {
				k_(e, {});
			}, v = (e) => {
				R_(e, {});
			}, y = (e) => {
				W_(e, {});
			}, b = (e) => {
				av(e, {});
			};
			U(c, (e) => {
				R(ht) === "pages" ? e(l) : R(ht) === "nav" ? e(u, 1) : R(ht) === "site" ? e(d, 2) : R(ht) === "theme" ? e(f, 3) : R(ht) === "blocks" ? e(p, 4) : R(ht) === "grid" ? e(m, 5) : R(ht) === "properties" ? e(h, 6) : R(ht) === "footer" ? e(g, 7) : R(ht) === "collections" ? e(_, 8) : R(ht) === "plugins" ? e(v, 9) : R(ht) === "history" ? e(y, 10) : R(ht) === "update" && e(b, 11);
			}), O(t), Hi(t, (e) => M(Ba, e), () => R(Ba)), L((e) => {
				n = Ei(t, 1, "panel", null, n, { hidden: !R(x) }), J(i, "title", e), H(a, vt[R(ht)]);
			}, [() => yt[R(ht)]?.map((e) => Y(e)).join("\n")]), V(e, t);
		};
		U(p, (e) => {
			R(ht) && e(m);
		});
		var h = I(p, 2);
		let g;
		var _ = N(h), y = N(_);
		Hi(y, (e) => M(v, e), () => R(v)), O(_), O(h), Hi(h, (e) => M(se, e), () => R(se)), O(t), L((e, t) => {
			r = Ei(n, 1, "rail", null, r, { hidden: !R(x) }), l = Ei(c, 1, "rail-gear", null, l, { active: R(Fr) }), J(c, "title", e), g = Ei(h, 1, "frame-wrap", null, g, {
				mobile: R(oe) === "mobile",
				pan: R(be),
				fold: R(me) > 0
			}), Oi(_, `width:${R(ve) ?? ""}px; height:${R(ye) ?? ""}px`), J(y, "title", t), J(y, "src", `/?page=${R(u)}&preview=1`), Oi(y, `width:${R(pe) ?? ""}px; height:${R(_e) ?? ""}px; transform:scale(${R(he) ?? ""}); transform-origin:top left`);
		}, [() => Y("settings.title"), () => Y("ui.previewTitle")]), z("click", c, () => M(Fr, !R(Fr))), jr("load", y, Mr), kr(y), V(e, t);
	}, _s = (e) => {
		var t = gC(), n = F(t, !0);
		L((e) => H(n, e), [() => Y("ui.loading")]), V(e, t);
	};
	U(hs, (e) => {
		R(l) ? e(gs) : e(_s, -1);
	});
	var vs = I(hs, 2), ys = (e) => {
		Px(e, {
			get image() {
				return R(hi);
			},
			onapply: gi,
			oncancel: () => M(hi, null)
		});
	};
	U(vs, (e) => {
		R(hi) && e(ys);
	});
	var bs = I(vs, 2), xs = (e) => {
		{
			let t = /* @__PURE__ */ A(() => R(Ft).mode === "set" ? ts(R(kt)?.props.design).id : null), n = /* @__PURE__ */ A(() => R(k) ? Ge(R(k)) : null), r = /* @__PURE__ */ A(() => D?.data ? Ge(D.data) : null);
			oS(e, {
				get mode() {
					return R(Ft).mode;
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
					R(Ft).mode === "add" ? Do(e) : tn(e), M(Ft, null);
				},
				onclose: () => M(Ft, null)
			});
		}
	};
	U(bs, (e) => {
		R(Ft) && e(xs);
	});
	var Ss = I(bs, 2), Cs = (e) => {
		var t = yC(), n = N(t), r = N(n), i = F(r, !0), a = I(r, 2);
		ni(a, 16, () => R(Xe).lines, (e) => e, (e, t) => {
			var n = _C(), r = F(n, !0);
			L(() => H(r, t)), V(e, n);
		});
		var o = I(a, 2), s = (e) => {
			var t = vC();
			G(t), dt(t, !0), L(() => J(t, "placeholder", R(Xe).placeholder)), z("keydown", t, (e) => e.key === "Enter" && R(Xe).value.trim() && nt(!0)), Ii(t, () => R(Xe).value, (e) => R(Xe).value = e), V(e, t);
		};
		U(o, (e) => {
			R(Xe).prompt && e(s);
		});
		var c = I(o, 2), l = N(c), u = F(l, !0), d = I(l, 2), f = F(d, !0);
		O(c), O(n), O(t), L(() => {
			H(i, R(Xe).title), H(u, R(Xe).cancelLabel), H(f, R(Xe).okLabel);
		}), z("pointerdown", t, (e) => rt = e.target === e.currentTarget), z("click", t, (e) => rt && e.target === e.currentTarget && nt(!1)), z("click", l, () => nt(!1)), z("click", d, () => nt(!0)), V(e, t);
	};
	U(Ss, (e) => {
		R(Xe) && e(Cs);
	});
	var ws = I(Ss, 2), Ts = (e) => {
		var t = bC(), n = N(t), r = N(n), i = F(r, !0), a = I(r, 2), o = F(a, !0), s = I(a, 2), c = N(s), l = I(c);
		G(l), O(s);
		var u = I(s, 2), d = N(u), f = I(d);
		{
			let e = /* @__PURE__ */ A(() => Y("setup.accentPick"));
			Na(f, {
				get value() {
					return R(ot);
				},
				get label() {
					return R(e);
				},
				onchange: (e) => M(ot, e, !0)
			});
		}
		O(u);
		var p = I(u, 2), m = N(p), h = I(m);
		{
			let e = /* @__PURE__ */ A(() => Y("setup.bgLabel"));
			Na(h, {
				get value() {
					return R(st);
				},
				get label() {
					return R(e);
				},
				onchange: (e) => M(st, e, !0)
			});
		}
		O(p);
		var g = I(p, 2), _ = F(g, !0), v = I(g, 2), y = N(v), b = F(y, !0), x = I(y, 2), S = F(x, !0);
		O(v), O(n), O(t), L((e, t, n, r, a, s, u, f, p, h) => {
			H(i, e), H(o, t), H(c, `${n ?? ""} `), J(l, "placeholder", r), H(d, `${a ?? ""} `), H(m, `${s ?? ""} `), H(_, u), H(b, f), x.disabled = p, H(S, h);
		}, [
			() => Y("setup.title"),
			() => Y("setup.intro"),
			() => Y("setup.nameLabel"),
			() => Y("ph.setup.name"),
			() => Y("setup.accentLabel"),
			() => Y("setup.bgLabel"),
			() => Y("setup.outro"),
			() => Y("setup.skip"),
			() => !R(at).trim(),
			() => Y("setup.start")
		]), z("keydown", l, (e) => e.key === "Enter" && lt()), Ii(l, () => R(at), (e) => M(at, e)), z("click", y, ct), z("click", x, lt), V(e, t);
	};
	U(ws, (e) => {
		R(it) && e(Ts);
	});
	var Es = I(ws, 2), Ds = (e) => {
		var t = xC();
		let n;
		var r = N(t), i = F(r, !0), a = I(r, 2);
		O(t), L((e) => {
			n = Ei(t, 1, "toast", null, n, {
				ok: R(p) === "ok",
				error: R(p) === "error"
			}), H(i, R(f)), J(a, "title", e);
		}, [() => Y("ui.close")]), z("click", a, () => h("")), V(e, t);
	};
	U(Es, (e) => {
		R(f) && e(Ds);
	}), O(Zo);
	var Os = I(Zo, 2), ks = (e) => {
		Vp(e, {
			get pos() {
				return R(Nt);
			},
			onclose: () => M(Nt, null)
		});
	};
	U(Os, (e) => {
		R(Nt) && R(kt) && e(ks);
	}), L(() => rs = Ei(es, 1, "topbar", null, rs, { hidden: !R(x) })), V(e, Xo), et();
}
//#endregion
//#region src/main.js
Mr([
	"click",
	"change",
	"pointerdown",
	"keydown"
]), document.documentElement.lang = await da();
var wC = qr(CC, { target: document.getElementById("urd-admin") });
//#endregion
export { wC as default };
