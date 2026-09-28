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
var g = 1024, _ = 2048, v = 4096, y = 8192, b = 16384, x = 32768, S = 1 << 25, C = 65536, w = 1 << 19, T = 1 << 20, ee = 1 << 25, te = 65536, ne = 1 << 21, E = 1 << 22, re = 1 << 23, ie = Symbol("$state"), ae = Symbol("component"), oe = Symbol("legacy props"), se = Symbol(""), ce = Symbol("attributes"), le = Symbol("class"), ue = Symbol("style"), de = Symbol("text"), fe = Symbol("form reset"), pe = new class extends Error {
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
	return Ee(/* @__PURE__ */ cn(Te));
}
function D(e) {
	if (Ce) {
		if (/* @__PURE__ */ cn(Te) !== null) throw xe(), he;
		Te = e;
	}
}
function Oe(e = 1) {
	if (Ce) {
		for (var t = e, n = Te; t--;) n = /* @__PURE__ */ cn(n);
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
		var i = /* @__PURE__ */ cn(n);
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
//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
function Pe() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function Fe(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function Ie(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function Le() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Re(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function ze() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Be(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function Ve() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function O() {
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
var k = [];
function We(e, t = !1, n = !1) {
	return Ge(e, /* @__PURE__ */ new Map(), "", k, null, n);
}
function Ge(t, n, r, i, a = null, o = !1) {
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
				d in t && (u[d] = Ge(f, n, r, i, null, o));
			}
			return u;
		}
		if (l(t) === s) {
			u = {}, n.set(t, u), a !== null && n.set(a, u);
			for (var p of Object.keys(t)) u[p] = Ge(t[p], n, r, i, null, o);
			return u;
		}
		if (t instanceof Date) return t.getTime(), structuredClone(t);
		if (typeof t.toJSON == "function" && !o) return Ge(t.toJSON(), n, r, i, t);
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
var Ke = null;
function qe(e) {
	Ke = e;
}
function Je(e, t = !1, n) {
	Ke = {
		p: Ke,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: Kn,
		l: null
	};
}
function Ye(e) {
	var t = Ke, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) xn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, Ke = t.p, Xe(e);
}
function Xe(e = {}) {
	return i(e, ae, { value: !0 }), e;
}
function Ze() {
	return !0;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var Qe = [];
function $e() {
	var e = Qe;
	Qe = [], p(e);
}
function et(e) {
	if (Qe.length === 0 && !Mt) {
		var t = Qe;
		queueMicrotask(() => {
			t === Qe && $e();
		});
	}
	Qe.push(e);
}
function tt() {
	for (; Qe.length > 0;) $e();
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
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= te, at(t.deps));
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
		e.autofocus = !0, et(() => {
			document.activeElement === t && e.focus();
		});
	}
}
function ut(e) {
	Ce && /* @__PURE__ */ sn(e) !== null && ln(e);
}
var dt = !1;
function ft() {
	dt || (dt = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[fe]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function pt(e) {
	var t = Un, n = Kn;
	Gn(null), qn(null);
	try {
		return e();
	} finally {
		Gn(t), qn(n);
	}
}
function mt(e, t, n, r = n) {
	e.addEventListener(t, () => pt(n));
	let i = e[fe];
	e[fe] = i ? () => {
		i(), r(!0);
	} : () => r(!0), ft();
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function ht(e, t, n, r) {
	let i = Ze() ? yt : St;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = Kn, c = gt(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				mn(e, s);
			}
			_t();
		}
	}
	var d = vt();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ xt(e))).then(u).catch((e) => mn(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), _t();
	}) : f();
}
function gt() {
	var e = Kn, t = Un, n = Ke, r = j;
	return function(i = !0) {
		qn(e), Gn(t), qe(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function _t(e = !0) {
	qn(null), Gn(null), qe(null), e && j?.deactivate();
}
function vt() {
	var e = Kn, t = e.b, n = j, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function yt(e) {
	var t = 2 | _;
	return Kn !== null && (Kn.f |= w), {
		ctx: Ke,
		deps: null,
		effects: null,
		equals: je,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: ge,
		wv: 0,
		parent: Kn,
		ac: null
	};
}
var bt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function xt(e, t, n) {
	let r = Kn;
	r === null && Pe();
	var i = void 0, a = Jt(ge), o = !Un, s = /* @__PURE__ */ new Set();
	return wn(() => {
		var t = Kn, n = m();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== pe && n.reject(e);
			}).finally(_t);
		} catch (e) {
			n.reject(e), _t();
		}
		var c = j;
		if (o) {
			if (t.f & 32768) var l = vt();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(bt);
			else for (let e of s.values()) e.reject(bt);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== bt && (c.activate(), t ? (a.f |= re, F(a, t)) : (a.f & 8388608 && (a.f ^= re), F(a, e)), c.deactivate());
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
function A(e) {
	let t = /* @__PURE__ */ yt(e);
	return Yn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function St(e) {
	let t = /* @__PURE__ */ yt(e);
	return t.equals = Ne, t;
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
	if (!Vn && r !== null && e.v !== ge && r.f & 24576) return be(), e.v;
	qn(r);
	try {
		e.f &= ~te, Ct(e), t = sr(e);
	} finally {
		qn(n);
	}
	return t;
}
function Tt(e) {
	var t = wt(e);
	if (!e.equals(t) && (e.wv = ir(), (!j?.is_fork || e.deps === null) && (j === null ? e.v = t : (j.capture(e, t, !0), kt?.capture(e, t, !0)), e.deps === null))) {
		rt(e, g);
		return;
	}
	Vn || (At === null ? it(e) : (vn() || j?.is_fork) && At.set(e, t));
}
function Et(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && pt(() => {
		t.ac.abort(pe), t.ac = null;
	}), t.fn !== null && (t.teardown = f), ur(t, 0), kn(t));
}
function Dt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && dr(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var Ot = null, j = null, kt = null, At = null, jt = null, Mt = !1, Nt = !1, Pt = null, Ft = null, It = 0, Lt = 1, Rt = class e {
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
		Ot === null ? Ot = this : (Ot.#n = this, this.#t = Ot), Ot = this;
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
		this.#e = !0, It++ > 1e3 && (this.#x(), Bt());
		for (let e of this.#u) this.#d.delete(e), rt(e, _), this.schedule(e);
		for (let e of this.#d) rt(e, v), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = Pt = [], r = [], i = Ft = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw Wt(e), this.#h() || this.discard(), t;
		}
		if (j = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (Pt = null, Ft = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) Ut(e, t);
			i.length > 0 && j.#g();
			return;
		}
		let o = this.#v();
		if (o) {
			this.#b(r), this.#b(n), o.#y(this);
			return;
		}
		this.#u.clear(), this.#d.clear();
		for (let e of this.#r) e(this);
		this.#r.clear(), kt = this, Vt(r), Vt(n), kt = null, this.#s?.resolve();
		var s = j;
		if (this.#a === 0 && (this.#c.length === 0 || s !== null) && this.#x(), this.#c.length > 0) {
			if (s !== null) {
				let e = s;
				e.#c.push(...this.#c.filter((t) => !e.#c.includes(t)));
			} else s = this;
		}
		s !== null && (Kt.clear(), s.#g());
	}
	#_(e, t, n) {
		e.f ^= g;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
				a ? r.f ^= g : i & 4 ? t.push(r) : ar(r) && (i & 16 && this.#d.add(r), dr(r));
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
		this.oncommit(() => e.discard()), e.#x(), j = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) ot(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== ge && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), At?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		j = this;
	}
	deactivate() {
		j = null, At = null;
	}
	flush() {
		try {
			Nt = !0, j = this, this.#g();
		} finally {
			It = 0, jt = null, Pt = null, Ft = null, Nt = !1, j = null, At = null, Kt.clear();
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
		this.#m || (this.#m = !0, et(() => {
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
		if (j === null) {
			let t = j = new e();
			!Nt && !Mt && et(() => {
				t.#e || t.flush();
			});
		}
		return j;
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
				t.f ^= g;
			}
		}
		this.#c.push(t);
	}
	#x() {
		if (this.linked) {
			var e = this.#t, t = this.#n;
			e === null || (e.#n = t), t === null ? Ot = e : t.#t = e, this.linked = !1;
		}
	}
};
function zt(e) {
	var t = Mt;
	Mt = !0;
	try {
		var n;
		for (e && (j !== null && !j.is_fork && j.flush(), n = e());;) {
			if (tt(), j === null) return n;
			j.flush();
		}
	} finally {
		Mt = t;
	}
}
function Bt() {
	try {
		ze();
	} catch (e) {
		mn(e, jt);
	}
}
var M = null;
function Vt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && ar(r) && (M = /* @__PURE__ */ new Set(), dr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Nn(r), M?.size > 0)) {
				Kt.clear();
				for (let e of M) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) M.has(n) && (M.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || dr(n);
					}
				}
				M.clear();
			}
		}
		M = null;
	}
}
function Ht(e) {
	j.schedule(e);
}
function Ut(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), rt(e, g);
		for (var n = e.first; n !== null;) Ut(n, t), n = n.next;
	}
}
function Wt(e) {
	rt(e, g);
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
		equals: je,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function N(e, t) {
	let n = Jt(e, t);
	return Yn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Yt(e, t = !1, n = !0) {
	let r = Jt(e);
	return t || (r.equals = Ne), r;
}
function P(e, t, n = !1) {
	return Un !== null && (!Wn || Un.f & 131072) && Ze() && Un.f & 4325394 && (Jn === null || !Jn.has(e)) && He(), F(e, n ? $t(t) : t, Ft);
}
function F(e, t, n = null) {
	if (!e.equals(t)) {
		Vn ? Kt.set(e, t) : Kt.has(e) || Kt.set(e, e.v);
		var r = Rt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && wt(t), At === null && it(t);
		}
		e.wv = ir(), Qt(e, _, n), Ze() && Kn !== null && Kn.f & 1024 && !(Kn.f & 96) && (Qn === null ? $n([e]) : Qn.push(e)), !r.is_fork && Gt.size > 0 && !qt && Xt();
	}
	return t;
}
function Xt() {
	qt = !1;
	for (let e of Gt) {
		e.f & 1024 && rt(e, v);
		let t;
		try {
			t = ar(e);
		} catch {
			t = !0;
		}
		t && dr(e);
	}
	Gt.clear();
}
function Zt(e) {
	P(e, e.v + 1);
}
function Qt(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Ze(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === Kn)) {
			var l = (c & _) === 0;
			if (l && rt(s, t), c & 131072) Gt.add(s);
			else if (c & 2) {
				var u = s;
				At?.delete(u), c & 65536 || (c & 512 && (Kn === null || !(Kn.f & 2097152)) && (s.f |= te), Qt(u, v, n));
			} else if (l) {
				var d = s;
				c & 16 && M !== null && M.add(d), n === null ? Ht(d) : n.push(d);
			}
		}
	}
}
function $t(t) {
	if (typeof t != "object" || !t || ie in t || ae in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ N(0), u = null, d = nr, f = (e) => {
		if (nr === d) return e();
		var t = Un, n = nr;
		Gn(null), rr(d);
		var r = e();
		return Gn(t), rr(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ N(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && Ve();
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
					let e = f(() => /* @__PURE__ */ N(ge, u));
					r.set(t, e), Zt(o);
				}
			} else P(n, ge), Zt(o);
			return !0;
		},
		get(e, n, i) {
			if (n === ie) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ N($t(s ? e[n] : ge), u)), r.set(n, o)), o !== void 0) {
				var c = V(o);
				return c === ge ? void 0 : c;
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
				if (a !== void 0 && o !== ge) return {
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
			var n = r.get(t), i = n !== void 0 && n.v !== ge || Reflect.has(e, t);
			return (n !== void 0 || Kn !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ N(i ? $t(e[t]) : ge, u)), r.set(t, n)), V(n) === ge) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ N(ge, u)), r.set(d + "", p)) : P(p, ge);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ N(void 0, u)), P(c, $t(n)), r.set(t, c));
			else {
				l = c.v !== ge;
				var m = f(() => $t(n));
				P(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && P(g, _ + 1);
				}
				Zt(o);
			}
			return !0;
		},
		ownKeys(e) {
			V(o);
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
var en, tn, nn, rn;
function an() {
	if (en === void 0) {
		en = window, tn = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		nn = a(t, "firstChild").get, rn = a(t, "nextSibling").get, u(e) && (e[le] = void 0, e[ce] = null, e[ue] = void 0, e.__e = void 0), u(n) && (n[de] = void 0);
	}
}
function on(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function sn(e) {
	return nn.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function cn(e) {
	return rn.call(e);
}
function I(e, t) {
	if (!Ce) return /* @__PURE__ */ sn(e);
	var n = /* @__PURE__ */ sn(Te);
	if (n === null) n = Te.appendChild(on());
	else if (t && n.nodeType !== 3) {
		var r = on();
		return n?.before(r), Ee(r), r;
	}
	return t && fn(n), Ee(n), n;
}
function L(e, t = !1) {
	if (!Ce) {
		var n = /* @__PURE__ */ sn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ cn(n) : n;
	}
	if (t) {
		if (Te?.nodeType !== 3) {
			var r = on();
			return Te?.before(r), Ee(r), r;
		}
		fn(Te);
	}
	return Te;
}
function R(e, t = !1) {
	if (!Ce) return /* @__PURE__ */ sn(e);
	var n = I(e, t);
	return D(e), n;
}
function z(e, t = 1, n = !1) {
	let r = Ce ? Te : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ cn(r);
	if (!Ce) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = on();
			return r === null ? i?.after(a) : r.before(a), Ee(a), a;
		}
		fn(r);
	}
	return Ee(r), r;
}
function ln(e) {
	e.textContent = "";
}
function un() {
	return !1;
}
function dn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function fn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
function pn(e) {
	var t = Kn;
	if (t === null) return Un.f |= re, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	mn(e, t);
}
function mn(e, t) {
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
function hn(e) {
	Kn === null && (Un === null && Re(e), Le()), Vn && Ie(e);
}
function gn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function _n(e, t) {
	var n = Kn;
	n !== null && n.f & 8192 && (e |= y);
	var r = {
		ctx: Ke,
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
	j?.register_created_effect(r);
	var i = r;
	if (e & 4) Pt === null ? Rt.ensure().schedule(r) : Pt.push(r);
	else if (t !== null) {
		try {
			dr(r);
		} catch (e) {
			throw jn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= C));
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
	return rt(t, g), t.teardown = e, t;
}
function bn(e) {
	hn("$effect");
	var t = Kn.f;
	if (!Un && t & 32 && Ke !== null && !Ke.i) {
		var n = Ke;
		(n.e ??= []).push(e);
	} else return xn(e);
}
function xn(e) {
	return _n(4 | T, e);
}
function Sn(e) {
	Rt.ensure();
	let t = _n(64 | w, e);
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
	return _n(E | w, e);
}
function Tn(e, t = 0) {
	return _n(8 | t, e);
}
function B(e, t = [], n = [], r = []) {
	ht(r, t, n, (t) => {
		_n(8, () => {
			e(...t.map(V));
		});
	});
}
function En(e, t = 0) {
	return _n(16 | t, e);
}
function Dn(e) {
	return _n(32 | w, e);
}
function On(e) {
	var t = e.teardown;
	if (t !== null) {
		let n = Vn, r = Un;
		Hn(!0), Gn(null);
		try {
			t.call(null);
		} catch (t) {
			mn(t, e.parent);
		} finally {
			Hn(n), Gn(r);
		}
	}
}
function kn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && pt(() => {
			e.abort(pe);
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
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Mn(e.nodes.start, e.nodes.end), n = !0), e.f |= S, kn(e, t && !n), ur(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	On(e), e.f ^= S, e.f |= b;
	var i = e.parent;
	i !== null && i.first !== null && Nn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Mn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ cn(e);
		e.remove(), e = n;
	}
}
function Nn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Pn(e, t, n = !0) {
	var r = [];
	e.f |= 256, Fn(e, r, !0);
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
		e.f ^= y;
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
	e.f &= -257, Ln(e, !0);
}
function Ln(e, t) {
	if (!(e.f & 256) && e.f & 8192) {
		e.f ^= y, e.f & 1024 || (rt(e, _), Rt.ensure().schedule(e));
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
		var i = n === r ? null : /* @__PURE__ */ cn(n);
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
	if (t & 2 && (e.f &= ~te), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (ar(a) && Tt(a), a.wv > e.wv) return !0;
		}
		t & 512 && At === null && rt(e, g);
	}
	return !1;
}
function or(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Jn !== null && Jn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? or(a, t, !1) : t === a && (n ? rt(a, _) : a.f & 1024 && rt(a, v), Ht(a));
	}
}
function sr(e) {
	var t = Xn, n = Zn, r = Qn, i = Un, a = Jn, o = Ke, s = Wn, c = nr, l = e.f;
	Xn = null, Zn = 0, Qn = null, Un = l & 96 ? null : e, Jn = null, qe(e.ctx), Wn = !1, nr = ++tr, e.ac !== null && (pt(() => {
		e.ac.abort(pe);
	}), e.ac = null);
	try {
		e.f |= ne;
		var u = e.fn, d = u();
		e.f |= x;
		var f = cr(e);
		if (Ze() && Qn !== null && !Wn && f !== null && !(e.f & 6146)) for (var p = 0; p < Qn.length; p++) or(Qn[p], e);
		if (i !== null && i !== e) {
			if (tr++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = tr;
			if (t !== null) for (let e of t) e.rv = tr;
			Qn !== null && (r === null ? r = Qn : r.push(...Qn));
		}
		return e.f & 8388608 && (e.f ^= re), d;
	} catch (t) {
		return cr(e), pn(t);
	} finally {
		e.f ^= ne, Xn = t, Zn = n, Qn = r, Un = i, Jn = a, qe(o), Wn = s, nr = c;
	}
}
function cr(e) {
	var t = e.deps, n = j?.is_fork;
	if (Xn !== null) {
		var r;
		if (n || ur(e, Zn), t !== null && Zn > 0) for (t.length = Zn + Xn.length, r = 0; r < Xn.length; r++) t[Zn + r] = Xn[r];
		else e.deps = t = Xn;
		if (vn() && e.f & 512) for (r = Zn; r < t.length; r++) (t[r].reactions ??= []).push(e);
	} else !n && t !== null && Zn < t.length && (ur(e, Zn), t.length = Zn);
	return t;
}
function lr(e, r) {
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
		s.f & 512 && (s.f ^= 512, s.f &= ~te), s.v !== ge && it(s), s.ac !== null && pt(() => {
			s.ac.abort(pe), s.ac = null, rt(s, _);
		}), Et(s), ur(s, 0);
	}
}
function ur(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) lr(e, n[r]);
}
function dr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		rt(e, g);
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
async function fr() {
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
	if (Vn && Kt.has(e)) return Kt.get(e);
	if (t) {
		var a = e;
		if (Vn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || mr(a)) && (o = wt(a)), Kt.set(a, o), o;
		}
		var s = !(a.f & 512) && !Wn && Un !== null && (Bn || !!(Un.f & 512)), c = (a.f & x) === 0;
		ar(a) && (s && (a.f |= 512), Tt(a)), s && !c && (Dt(a), pr(a));
	}
	if (At?.has(e)) return At.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function pr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Dt(t), pr(t));
}
function mr(e) {
	if (e.v === ge) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Kt.has(t) || t.f & 2 && mr(t)) return !0;
	return !1;
}
function hr(e) {
	var t = Wn;
	try {
		return Wn = !0, e();
	} finally {
		Wn = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var gr = ["touchstart", "touchmove"];
function _r(e) {
	return gr.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var vr = Symbol("events"), yr = /* @__PURE__ */ new Set(), br = /* @__PURE__ */ new Set();
function xr(e) {
	if (!Ce) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function Sr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Dr.call(t, e), !e.cancelBubble) return pt(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? et(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function Cr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = Sr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && yn(() => {
		t.removeEventListener(e, o, a);
	});
}
function H(e, t, n) {
	(t[vr] ??= {})[e] = n;
}
function wr(e) {
	for (var t = 0; t < e.length; t++) yr.add(e[t]);
	for (var n of br) n(e);
}
var Tr = null, Er = !1;
function Dr(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	Tr = e, Er || (Er = !0, setTimeout(() => {
		Er = !1, Tr = null;
	}));
	var s = 0, c = Tr === e && e[vr];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[vr] = t;
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
					var h = o[vr]?.[r];
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
			e[vr] = t, delete e.currentTarget, Gn(d), qn(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var Or = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function kr(e) {
	return Or?.createHTML(e) ?? e;
}
function Ar(e) {
	var t = dn("template");
	return t.innerHTML = kr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function jr(e, t) {
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
		if (Ce) return jr(Te, null), Te;
		i === void 0 && (i = Ar(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ sn(i)));
		var t = r || tn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ sn(t), s = t.lastChild;
			jr(o, s);
		} else jr(t, t);
		return t;
	};
}
function Mr(e = "") {
	if (!Ce) {
		var t = on(e + "");
		return jr(t, t), t;
	}
	var n = Te;
	return n.nodeType === 3 ? fn(n) : (n.before(n = on()), Ee(n)), jr(n, n), n;
}
function Nr() {
	if (Ce) return jr(Te, null), Te;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = on();
	return e.append(t, n), jr(t, n), e;
}
function W(e, t) {
	if (Ce) {
		var n = Kn;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = Te), De();
		return;
	}
	e !== null && e.before(t);
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function Pr(e) {
	let t = 0, n = Jt(0), r;
	return () => {
		vn() && (V(n), Tn(() => (t === 0 && (r = hr(() => e(() => Zt(n)))), t += 1, () => {
			et(() => {
				--t, t === 0 && (r?.(), r = void 0, Zt(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Fr = C | w;
function Ir(e, t, n, r) {
	new Lr(e, t, n, r);
}
var Lr = class {
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
	#h = Pr(() => (this.#m = Jt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = Kn;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = Kn.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = En(() => {
			if (Ce) {
				let e = this.#t;
				De();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#y() : this.#g();
			} else this.#b();
		}, Fr), Ce && (this.#e = Te);
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
		et(r), t && (this.#s = Dn(() => {
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
			t = !0, n && Ue(), this.#s !== null && Pn(this.#s, () => {
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
					mn(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#y() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = Dn(() => e(this.#e)), et(() => {
			var e = this.#c = document.createDocumentFragment(), t = on(), n = !1;
			if (e.append(t), this.#a = this.#S(() => {
				try {
					return Dn(() => this.#r(t));
				} catch (e) {
					try {
						this.error(e), n = !0;
					} catch (e) {
						mn(e, this.#i.parent);
					}
					return null;
				}
			}), this.#a === null) {
				this.#c = null, n && this.#x(j);
				return;
			}
			this.#u === 0 && (this.#e.before(e), this.#c = null, Pn(this.#o, () => {
				this.#o = null;
			}), this.#x(j));
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
			} else this.#x(j);
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
		var t = Kn, n = Un, r = Ke;
		qn(this.#i), Gn(this.#i), qe(this.#i.ctx);
		try {
			return Rt.ensure(), e();
		} finally {
			qn(t), Gn(n), qe(r);
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
		this.#C(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, et(() => {
			this.#d = !1, this.#m && F(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), V(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		j?.is_fork ? (this.#a && j.skip_effect(this.#a), this.#o && j.skip_effect(this.#o), this.#s && j.skip_effect(this.#s), j.oncommit(() => {
			this.#w(e);
		})) : this.#w(e);
	}
	#w(e) {
		this.#a &&= (jn(this.#a), null), this.#o &&= (jn(this.#o), null), this.#s &&= (jn(this.#s), null), Ce && (Ee(this.#t), Oe(), Ee(ke()));
		let t = this.#n.failed, n = (e) => {
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && (this.#s = this.#S(() => {
				try {
					return Dn(() => {
						var r = Kn;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return mn(e, this.#i.parent), null;
				}
			}));
		};
		et(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				mn(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => mn(e, this.#i && this.#i.parent)) : n(t);
		});
	}
}, Rr = !0;
function G(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[de] ??= e.nodeValue) && (e[de] = n, e.nodeValue = `${n}`);
}
function zr(e, t) {
	return Vr(e, t);
}
var Br = /* @__PURE__ */ new Map();
function Vr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	an();
	var l = void 0, u = Sn(() => {
		var u = n ?? t.appendChild(on());
		Ir(u, { pending: () => {} }, (t) => {
			Je({});
			var n = Ke;
			if (o && (n.c = o), a && (i.$$events = a), Ce && jr(t, null), Rr = s, l = e(t, i) || Xe(), Rr = !0, Ce && (Kn.nodes.end = Te, Te === null || Te.nodeType !== 8 || Te.data !== "]")) throw xe(), he;
			Ye();
		}, c);
		var d = /* @__PURE__ */ new Set(), f = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!d.has(r)) {
					d.add(r);
					var i = _r(r);
					for (let e of [t, document]) {
						var a = Br.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Br.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Dr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return f(r(yr)), br.add(f), () => {
			for (var e of d) for (let n of [t, document]) {
				var r = Br.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Dr), r.delete(e), r.size === 0 && Br.delete(n)) : r.set(e, i);
			}
			br.delete(f), u !== n && u.parentNode?.removeChild(u);
		};
	});
	return Hr.set(l, u), l;
}
var Hr = /* @__PURE__ */ new WeakMap(), Ur = class {
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
						Rn(r, t), t.append(on()), this.#n.set(e, {
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
		var n = j, r = un();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = on();
				i.append(a), this.#n.set(e, {
					effect: Dn(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, Dn(() => t(this.anchor)));
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
function K(e, t, n = !1) {
	var r;
	Ce && (r = Te, De());
	var i = new Ur(e), a = n ? C : 0;
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
	En(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
function Wr(e, t) {
	return t;
}
function Gr(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		Pn(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					Kr(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null && e.pending.size === 0;
		if (l) {
			var u = n, d = u.parentNode;
			ln(d), d.append(u), e.items.clear();
		}
		Kr(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function Kr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= ee, Rn(a, document.createDocumentFragment())) : jn(t[i], n);
	}
}
var qr;
function Jr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = Ce ? Ee(/* @__PURE__ */ sn(u)) : u.appendChild(on());
	}
	Ce && De();
	var d = null, f = /* @__PURE__ */ St(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Xr(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= ee, Qr(d, null, c)) : In(d) : Pn(d, () => {
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
			Ce && Ae(c) === "[!" != (e === 0) && (c = ke(), Ee(c), we(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = j, v = un(), y = 0; y < e; y += 1) {
				Ce && Te.nodeType === 8 && Te.data === "]" && (c = Te, t = !0, we(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && F(S.v, b), S.i && F(S.i, y), v && u.unskip_effect(S.e)) : (S = Zr(l, h ? c : qr ??= on(), b, x, y, o, n, i), h || (S.e.f |= ee), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = Dn(() => s(c)) : (d = Dn(() => s(qr ??= on())), d.f |= ee)), e > r.size && Fe("", "", ""), Ce && e > 0 && Ee(ke()), !h) {
				if (m.set(u, r), v) {
					for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
					u.oncommit(g), u.ondiscard(_);
				} else g(u);
			}
			t && we(!0), V(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, Ce && (c = Te);
}
function Yr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Xr(e, t, n, i, a) {
	var o = !!(i & 8), s = t.length, c = e.items, l = Yr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (In(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) {
			if (_.f ^= ee, _ === l) Qr(_, null, n);
			else {
				var y = d ? d.next : l;
				_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), $r(e, d, _), $r(e, _, y), Qr(_, y, n), d = _, p = [], m = [], l = Yr(d.next);
				continue;
			}
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Qr(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					$r(e, S.prev, C.next), $r(e, d, S), $r(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), Qr(_, l, n), $r(e, _.prev, _.next), $r(e, _, d === null ? e.effect.first : d.next), $r(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = Yr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = Yr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Kr(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var w = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || w.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && w.push(l), l = Yr(l.next);
		var T = w.length;
		if (T > 0) {
			var te = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.fix();
			}
			Gr(e, w, te);
		}
	}
	o && et(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Zr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Jt(n) : /* @__PURE__ */ Yt(n, !1, !1) : null, l = o & 2 ? Jt(i) : null;
	return {
		v: c,
		i: l,
		e: Dn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Qr(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ cn(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function $r(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function q(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		Ce && (o = Ee(/* @__PURE__ */ sn(c)));
	}
	B(() => {
		var e = Kn;
		if (s === (s = t() ?? "")) {
			Ce && De();
			return;
		}
		if (n && !Ce) {
			e.nodes = null, c.innerHTML = s, s !== "" && jr(/* @__PURE__ */ sn(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (Mn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (Ce) {
				for (var a = Te.data, l = De(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ cn(l);
				if (l === null) throw xe(), he;
				jr(Te, u), o = Ee(l);
				return;
			}
			var d = dn(r ? "svg" : i ? "math" : "template", r ? ve : i ? ye : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (jr(/* @__PURE__ */ sn(f), f.lastChild), r || i) for (; /* @__PURE__ */ sn(f);) o.before(/* @__PURE__ */ sn(f));
			else o.before(f);
		}
	});
}
//#endregion
//#region node_modules/svelte/src/internal/client/timing.js
var ei = () => performance.now(), ti = {
	tick: (e) => requestAnimationFrame(e),
	now: () => ei(),
	tasks: /* @__PURE__ */ new Set()
};
//#endregion
//#region node_modules/svelte/src/internal/client/loop.js
function ni() {
	let e = ti.now();
	ti.tasks.forEach((t) => {
		t.c(e) || (ti.tasks.delete(t), t.f());
	}), ti.tasks.size !== 0 && ti.tick(ni);
}
function ri(e) {
	let t;
	return ti.tasks.size === 0 && ti.tick(ni), {
		promise: new Promise((n) => {
			ti.tasks.add(t = {
				c: e,
				f: n
			});
		}),
		abort() {
			ti.tasks.delete(t);
		}
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/transitions.js
function ii(e, t) {
	pt(() => {
		e.dispatchEvent(new CustomEvent(t));
	});
}
function ai(e) {
	if (e === "float") return "cssFloat";
	if (e === "offset") return "cssOffset";
	if (e.startsWith("--")) return e;
	let t = e.split("-");
	return t.length === 1 ? t[0] : t[0] + t.slice(1).map((e) => e[0].toUpperCase() + e.slice(1)).join("");
}
function oi(e) {
	let t = {}, n = e.split(";");
	for (let e of n) {
		let [n, r] = e.split(":");
		if (!n || r === void 0) break;
		let i = ai(n.trim());
		t[i] = r.trim();
	}
	return t;
}
var si = (e) => e;
function ci(e, t, n, r) {
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
			a || f?.abort(), f = li(t, m(), p, 1, () => {
				ii(t, "introstart");
			}, () => {
				ii(t, "introend"), f?.abort(), f = l = void 0, t.style.overflow = d;
			});
		},
		out(e) {
			if (!a) {
				e?.(), l = void 0;
				return;
			}
			t.inert = !0, p = li(t, m(), f, 0, () => {
				ii(t, "outrostart");
			}, () => {
				ii(t, "outroend"), e?.();
			});
		},
		stop: () => {
			f?.abort(), p?.abort();
		}
	}, g = Kn;
	if ((g.nodes.t ??= []).push(h), i && Rr) {
		var _ = s;
		if (!_) {
			for (var v = g.parent; v && v.f & 65536;) for (; (v = v.parent) && !(v.f & 16););
			_ = !v || !!(v.f & 32768);
		}
		_ && Cn(() => {
			hr(() => h.in());
		});
	}
}
function li(e, t, n, r, i, a) {
	var o = r === 1, s = !1;
	if (d(t)) {
		var c;
		return et(() => {
			s || (c = li(e, t({ direction: o ? "in" : "out" }), n, r, i, a));
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
	let { delay: l = 0, css: u, tick: p, easing: m = si } = t;
	var h, g = () => 1 - r;
	return et(() => {
		if (!s) {
			var c = [];
			if (o && n === void 0 && (p && p(0, 1), u)) {
				var d = oi(u(0, 1));
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
						var v = o + s * m(_ / f), y = oi(u(v, 1 - v));
						l.push(y), d ||= y.overflow === "hidden";
					}
					d && (e.style.overflow = "hidden"), g = () => {
						var e = h.currentTime;
						return o + s * m(e / c);
					}, p && ri(() => {
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
//#region node_modules/svelte/src/internal/shared/attributes.js
var ui = [..." 	\n\r\f\xA0\v﻿"];
function di(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || ui.includes(r[o - 1])) && (s === r.length || ui.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function fi(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function pi(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function mi(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\/\*.*?\*\//g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(pi)), i && c.push(...Object.keys(i).map(pi));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = pi(e.substring(l, u).trim());
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
		return r && (n += fi(r)), i && (n += fi(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function hi(e, t, n, r, i, a) {
	var o = e[le];
	if (Ce || o !== n || o === void 0) {
		var s = di(n, r, a);
		(!Ce || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[le] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/style.js
function gi(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function _i(e, t, n, r) {
	var i = e[ue];
	if (Ce || i !== t) {
		var a = mi(t, r);
		(!Ce || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[ue] = t;
	} else r && (Array.isArray(r) ? (gi(e, n?.[0], r[0]), gi(e, n?.[1], r[1], "important")) : gi(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var vi = Symbol("is custom element"), yi = Symbol("is html"), bi = me ? "link" : "LINK", xi = me ? "progress" : "PROGRESS";
function J(e) {
	if (Ce) {
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
		e[fe] = n, et(n), ft();
	}
}
function Y(e, t) {
	var n = Ci(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === xi) && (e.value = t ?? "");
}
function Si(e, t) {
	var n = Ci(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function X(e, t, n, r) {
	var i = Ci(e);
	Ce && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === bi) || i[t] !== (i[t] = n) && (t === "loading" && (e[se] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Ti(e).has(t) ? e[t] = n : e.setAttribute(t, n));
}
function Ci(e) {
	return e[ce] ??= {
		[vi]: e.nodeName.includes("-"),
		[yi]: e.namespaceURI === _e
	};
}
var wi = /* @__PURE__ */ new Map();
function Ti(e) {
	var t = e.getAttribute("is") || e.nodeName, n = wi.get(t);
	if (n) return n;
	wi.set(t, n = /* @__PURE__ */ new Set());
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.add(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function Ei(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	mt(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = Di(e) ? Oi(a) : a, n(a), j !== null && r.add(j), await fr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (Ce && e.defaultValue !== e.value || hr(t) == null && e.value) && (n(Di(e) ? Oi(e.value) : e.value), j !== null && r.add(j)), Tn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = j;
			if (r.has(i)) return;
		}
		Di(e) && n === Oi(e.value) || e.type === "date" && !n && !e.value || n !== e.value && (e.value = n ?? "");
	});
}
function Di(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function Oi(e) {
	return e === "" ? null : +e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function ki(e, t) {
	return e === t || e?.[ie] === t;
}
function Ai(e = Xe(), t, n, r) {
	var i = Ke.r, a = Kn;
	return Cn(() => {
		var o, s;
		return Tn(() => {
			o = s, s = r?.() || [], hr(() => {
				ki(n(...s), e) || (t(e, ...s), o && ki(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && ki(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
function ji(e, t, n, r) {
	var i = !0, o = !!(n & 8), s = !!(n & 16), c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ yt(r), V(u)) : (l && (l = !1, c = s ? hr(r) : r), c);
	let f;
	if (o) {
		var p = ie in e || oe in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = ct(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && Be(t), f(m)));
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
			let n = t ? V(y) : i && o ? $t(e) : e;
			return P(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Vn && v || b.f & 16384 ? y.v : V(y);
	});
}
var Mi = {
	lang: "nb",
	strings: {
		"nav.toFront": "Til forsiden",
		"nav.toLightTheme": "Bytt til lyst tema",
		"nav.toDarkTheme": "Bytt til mørkt tema",
		"nav.menu": "Meny",
		"nav.closeMenu": "Lukk menyen",
		"nav.dismissAnnouncement": "Lukk kunngjøringen",
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
}, Ni = [
	"nb",
	"nn",
	"en-GB",
	"se",
	"tr"
], Pi = /^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/, Fi = {
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
function Ii(e) {
	let t = String(e ?? "").trim().toLowerCase();
	for (let [e, n] of Object.entries(Fi)) if (n.some((e) => t === e || t.startsWith(`${e}-`))) return e;
	return null;
}
function Li(e) {
	return Ni.includes(String(e ?? ""));
}
function Ri(e) {
	let t = [];
	if (!Array.isArray(e)) return ["languages must be a list"];
	for (let n of e) {
		if (!n || typeof n != "object" || Array.isArray(n)) {
			t.push("languages: every entry must be an object");
			continue;
		}
		let e = String(n.code ?? "");
		Pi.test(e) ? Li(e) && t.push(`languages: '${e}' is built into Urd and cannot be overridden`) : t.push(`languages: '${e}' is not a valid language code`), (typeof n.name != "string" || !n.name.trim()) && t.push(`languages/${e}: name is missing (the language's own name)`);
		for (let r of ["site", "admin"]) n[r] !== void 0 && typeof n[r] != "boolean" && t.push(`languages/${e}: ${r} must be a boolean`);
		n.site !== !0 && n.admin !== !0 && t.push(`languages/${e}: must cover site, admin or both`);
	}
	return t;
}
function zi(e) {
	let t = Ii(e);
	if (t) return t;
	let n = String(e ?? "").trim();
	return Pi.test(n) ? n : "nb";
}
async function Bi(e, t) {
	try {
		return await (await import(
			/* @vite-ignore */
			"/assets/urd/language-packs.js"
)).loadPackStrings(e, t);
	} catch {
		return null;
	}
}
({ ...Mi.strings });
var Vi = {
	lang: "nb",
	dict: {}
};
function Hi(e, t) {
	if (!t) return e;
	let n = e;
	for (let [e, r] of Object.entries(t)) n = n.replaceAll(`{${e}}`, String(r));
	return n;
}
function Z(e, t) {
	return Hi(Vi.dict[e] ?? e, t);
}
function Ui(e) {
	let t = `api.${e?.code}`;
	return e?.code && Vi.dict[t] !== void 0 ? Hi(Vi.dict[t], e) : e?.error ?? null;
}
function Wi() {
	return Vi.lang;
}
function Gi() {
	let e = null;
	try {
		e = localStorage.getItem("urd-admin-lang");
	} catch {}
	if (e) return zi(e);
	for (let e of navigator.languages ?? [navigator.language]) {
		let t = Ii(e);
		if (t) return t;
	}
	return "en-GB";
}
var Ki;
new Promise((e) => {
	Ki = e;
});
async function qi(e = Gi()) {
	let t = async (e) => (await import(
		/* @vite-ignore */
		`/assets/urd/locales/admin/${e}.js`
)).default.strings;
	Vi.lang = zi(e);
	let n = Li(Vi.lang);
	try {
		Object.assign(Vi.dict, await t("nb")), n && Vi.lang !== "nb" && Object.assign(Vi.dict, await t(Vi.lang));
	} catch {}
	if (!n) {
		let e = await Bi(Vi.lang, "admin");
		e ? Object.assign(Vi.dict, e) : Vi.lang = "nb";
	}
	return Ki(Vi.lang), Vi.lang;
}
//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region node_modules/svelte/src/transition/index.js
function Ji(e) {
	let t = e - 1;
	return t * t * t + 1;
}
function Yi(e) {
	let t = typeof e == "string" && e.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
	return t ? [parseFloat(t[1]), t[2] || "px"] : [e, "px"];
}
function Xi(e, { delay: t = 0, duration: n = 400, easing: r = Ji, x: i = 0, y: a = 0, opacity: o = 0 } = {}) {
	let s = getComputedStyle(e), c = +s.opacity, l = s.transform === "none" ? "" : s.transform, u = c * (1 - o), [d, f] = Yi(i), [p, m] = Yi(a);
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
function Zi(e, t, n, r) {
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
function Qi(e = globalThis) {
	let t = e?.HTMLElement?.prototype, n = e?.CSS;
	return !!(t && "popover" in t && typeof t.showPopover == "function" && typeof n?.supports == "function" && n.supports("anchor-name: --urd") && n.supports("position-try-fallbacks: flip-block"));
}
var $i = 0;
function ea(e = "urd-pop") {
	return $i += 1, `--${e}-${$i}`;
}
function ta(e, t) {
	let n = e?.closest?.(".panel-body, .block-menu-body");
	n && (t ? n.style.setProperty("anchor-name", "--urd-pane") : n.style.removeProperty("anchor-name"));
}
//#endregion
//#region src/lib/ColorPicker.svelte
var na = /* @__PURE__ */ U("<button type=\"button\" class=\"cp-eye svelte-zxiloo\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), ra = /* @__PURE__ */ U("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), ia = /* @__PURE__ */ U("<button type=\"button\"></button>"), aa = /* @__PURE__ */ U("<span class=\"cp-label svelte-zxiloo\"> <!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), oa = /* @__PURE__ */ U("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\">×</button></span>"), sa = /* @__PURE__ */ U("<span class=\"cp-tokens svelte-zxiloo\"></span>"), ca = /* @__PURE__ */ U("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), la = /* @__PURE__ */ U("<span class=\"cp-label svelte-zxiloo\"> </span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), ua = /* @__PURE__ */ U("<div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\"> <button type=\"button\" class=\"cp-add svelte-zxiloo\">+</button></span> <!> <!>", 1), da = /* @__PURE__ */ U("<button type=\"button\" class=\"cp-clear svelte-zxiloo\">×</button>"), fa = /* @__PURE__ */ U("<div class=\"cp-pop cp-anchored svelte-zxiloo\" popover=\"auto\"><!></div>"), pa = /* @__PURE__ */ U("<div class=\"cp-pop svelte-zxiloo\"><!></div>"), ma = /* @__PURE__ */ U("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!> <!></span>");
function ha(e, t) {
	Je(t, !0);
	let n = (e) => {
		var t = ua(), n = L(t), a = R(n), o = z(n, 2);
		J(o);
		var s = z(o, 2);
		J(s);
		var c = z(s, 2), l = I(c), u = z(l, 2);
		J(u);
		var d = z(u, 2), f = (e) => {
			var t = na();
			B((e) => X(t, "title", e), [() => Z("cp.eyedropper")]), H("click", t, be), W(e, t);
		};
		K(d, (e) => {
			ye && e(f);
		}), D(c);
		var p = z(c, 2);
		Jr(p, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = ra();
			J(r), B((e) => {
				X(r, "title", t), Y(r, e);
			}, [() => _e(V(n))]), H("change", r, (e) => ve(V(n), e.target.value)), W(e, r);
		}), D(p);
		var v = z(p, 2), y = (e) => {
			var t = aa(), n = L(t), a = I(n, !0), o = z(a), s = (e) => {
				var t = Mr();
				B((e) => G(t, e), [() => Z("cp.linkedSuffix", { token: m() })]), W(e, t);
			}, c = /* @__PURE__ */ A(() => m());
			K(o, (e) => {
				V(c) && e(s);
			}), D(n);
			var l = z(n, 2);
			Jr(l, 21, i, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ A(() => h(V(t), 2));
				let i = () => V(n)[0], a = () => V(n)[1];
				var o = ia();
				let s;
				B((e) => {
					s = hi(o, 1, "cp-token svelte-zxiloo", null, s, { active: r() === i() }), _i(o, `background: ${a() ?? ""}`), X(o, "title", e);
				}, [() => Z("cp.tokenTitle", { name: i() })]), H("click", o, () => me(i(), a())), W(e, o);
			}), D(l), B((e) => G(a, e), [() => Z("cp.themeColors")]), W(e, t);
		};
		K(v, (e) => {
			i().length && e(y);
		});
		var b = z(v, 2), x = I(b), S = z(x);
		D(b);
		var ne = z(b, 2), E = (e) => {
			var t = sa();
			Jr(t, 20, () => V(_), (e) => e, (e, t) => {
				var n = oa(), r = I(n), i = z(r, 2);
				D(n), B((e) => {
					_i(r, `background: ${t ?? ""}`), X(r, "title", t), X(i, "title", e);
				}, [() => Z("cp.removeSaved")]), H("click", r, () => xe(t)), H("click", i, () => Ce(t)), W(e, n);
			}), D(t), W(e, t);
		};
		K(ne, (e) => {
			V(_).length && e(E);
		});
		var re = z(ne, 2), ie = (e) => {
			var t = la(), n = L(t), r = R(n, !0), i = z(n, 2);
			Jr(i, 20, () => V(g), (e) => e, (e, t) => {
				var n = ca();
				B(() => {
					_i(n, `background: ${t ?? ""}`), X(n, "title", t);
				}), H("click", n, () => xe(t)), W(e, n);
			}), D(i), B((e) => G(r, e), [() => Z("common.recent")]), W(e, t);
		};
		K(re, (e) => {
			V(g).length && e(ie);
		}), B((e, t, r, i, c) => {
			_i(n, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${V(C) ?? ""}, 100%, 50%)`), _i(a, `left: ${V(w) * 100}%; top: ${(1 - V(T)) * 100}%`), Y(o, V(C)), Y(s, e), X(s, "title", t), _i(s, `background: linear-gradient(to right, transparent, ${r ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), _i(l, `background: ${V(te) ?? ""}`), Y(u, V(te)), G(x, `${i ?? ""} `), X(S, "title", c);
		}, [
			() => Math.round(V(ee) * 100),
			() => Z("cp.alpha"),
			() => ae(),
			() => Z("cp.saved"),
			() => Z("cp.saveTitle")
		]), H("pointerdown", n, he), H("input", o, (e) => {
			P(C, Number(e.target.value), !0), se();
		}), H("input", s, (e) => {
			P(ee, Number(e.target.value) / 100), se();
		}), H("change", u, ge), H("click", S, Se), W(e, t);
	}, r = ji(t, "value", 3, "#000000"), i = ji(t, "tokens", 19, () => []), a = ji(t, "label", 19, () => Z("cp.pickColor")), o = ji(t, "allowClear", 3, !1), s = "urd-recent-colors", c = "urd-saved-colors", l = Qi(), u = ea("urd-cp"), d = u.slice(2), f = /* @__PURE__ */ N(null), p = () => {
		let e = i().find(([e]) => e === r());
		return e ? e[1] : r();
	}, m = () => i().find(([e]) => e === r())?.[0] ?? null, g = /* @__PURE__ */ N($t([])), _ = /* @__PURE__ */ N($t([])), v = "", y = "", b = /* @__PURE__ */ N(null), x = /* @__PURE__ */ N(!1), S = /* @__PURE__ */ N($t({
		top: 0,
		left: 0
	})), C = /* @__PURE__ */ N(0), w = /* @__PURE__ */ N(0), T = /* @__PURE__ */ N(1), ee = /* @__PURE__ */ N(1), te = /* @__PURE__ */ N("#000000");
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
	let E = (e, t, n) => "#" + [
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
		return E(...ie(V(C), V(w), V(T)));
	}
	function oe() {
		let e = ae();
		return V(ee) >= .995 ? e : e + Math.round(V(ee) * 255).toString(16).padStart(2, "0");
	}
	function se() {
		P(te, oe(), !0), y = V(te), t.onchange?.(V(te));
	}
	function ce(e) {
		let t = ne(e);
		return t ? (((e) => {
			var t = h(e, 3);
			P(C, t[0], !0), P(w, t[1], !0), P(T, t[2], !0);
		})(re(t[0], t[1], t[2])), P(ee, t[3], !0), P(te, oe(), !0), !0) : !1;
	}
	function le() {
		ce(p()) || ce("#000000"), v = r(), y = "";
		try {
			let e = JSON.parse(localStorage.getItem(s) ?? "[]");
			P(g, Array.isArray(e) ? e : [], !0);
		} catch {
			P(g, [], !0);
		}
		try {
			let e = JSON.parse(localStorage.getItem(c) ?? "[]");
			P(_, Array.isArray(e) ? e : [], !0);
		} catch {
			P(_, [], !0);
		}
	}
	function ue(e) {
		e.newState === "open" ? (le(), ta(V(b), !0), P(x, !0)) : V(x) && (ta(V(b), !1), P(x, !1), fe());
	}
	function de() {
		le();
		let e = V(b).getBoundingClientRect(), t = V(b).closest(".panel-body")?.getBoundingClientRect(), n = t ? t.right : window.innerWidth, r = Math.max(8, Math.min(e.right - 236, n - 236 - 8)), i = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		P(S, {
			top: i,
			left: r
		}, !0), P(x, !0);
	}
	function fe() {
		if (y && y !== v) {
			let e = [y, ...V(g).filter((e) => e !== y)].slice(0, 8);
			localStorage.setItem(s, JSON.stringify(e));
		}
	}
	function pe() {
		if (l) {
			V(f)?.hidePopover();
			return;
		}
		P(x, !1), fe();
	}
	function me(e, n) {
		ce(n), P(te, n, !0), t.onchange?.(e);
	}
	function he(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			P(w, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), P(T, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), se();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function ge(e) {
		ce(e.target.value) ? se() : P(te, ae(), !0);
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
			P(C, t[0], !0), P(w, t[1], !0), P(T, t[2], !0);
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
		V(_).includes(e) || (P(_, [e, ...V(_)].slice(0, 12), !0), localStorage.setItem(c, JSON.stringify(We(V(_)))));
	}
	function Ce(e) {
		P(_, V(_).filter((t) => t !== e), !0), localStorage.setItem(c, JSON.stringify(We(V(_))));
	}
	bn(() => {
		if (!V(x)) return;
		let e = () => pe();
		if (window.addEventListener("blur", e), l) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			V(b) && !V(b).contains(e.target) && pe();
		}, n = (e) => {
			e.key === "Escape" && pe();
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), () => {
			document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), window.removeEventListener("blur", e);
		};
	});
	var we = ma(), Te = I(we);
	let Ee;
	var De = z(Te, 2), Oe = (e) => {
		var n = da();
		B((e, t) => {
			X(n, "title", e), X(n, "aria-label", t);
		}, [() => Z("cp.clearTitle"), () => Z("cp.clear")]), H("click", n, () => t.onchange?.("")), W(e, n);
	};
	K(De, (e) => {
		o() && r() && e(Oe);
	});
	var ke = z(De, 2), Ae = (e) => {
		var t = fa(), r = I(t), i = (e) => {
			n(e);
		};
		K(r, (e) => {
			V(x) && e(i);
		}), D(t), Ai(t, (e) => P(f, e), () => V(f)), B(() => {
			X(t, "id", d), _i(t, `position-anchor: ${u ?? ""}`);
		}), Cr("toggle", t, ue), H("click", t, (e) => e.preventDefault()), W(e, t);
	}, je = (e) => {
		var t = pa(), r = I(t);
		n(r), D(t), B(() => _i(t, `top: ${V(S).top ?? ""}px; left: ${V(S).left ?? ""}px`)), H("click", t, (e) => e.preventDefault()), W(e, t);
	};
	K(ke, (e) => {
		l ? e(Ae) : V(x) && e(je, 1);
	}), D(we), Ai(we, (e) => P(b, e), () => V(b)), B((e, t, n) => {
		Ee = hi(Te, 1, "cp-swatch svelte-zxiloo", null, Ee, {
			linked: e,
			"cp-empty": o() && !r()
		}), _i(Te, `background: ${t ?? ""}${l ? `; anchor-name: ${u}` : ""}`), X(Te, "title", n), X(Te, "popovertarget", l ? d : void 0), X(Te, "aria-label", a());
	}, [
		() => m(),
		() => r() ? p() : "transparent",
		() => m() ? Z("cp.linkedTitle", {
			label: a(),
			token: m()
		}) : a()
	]), H("click", Te, function(...e) {
		(l ? void 0 : () => V(x) ? pe() : de())?.apply(this, e);
	}), W(e, we), Ye();
}
wr([
	"pointerdown",
	"input",
	"change",
	"click"
]);
//#endregion
//#region ../template/assets/engine/0.7.4/imageTools.js
var ga = 1600, _a = .82, va = .6, ya = 15e6;
async function ba(e, t = ga) {
	if (Sa(e)) return Ca(await e.text());
	let n = await createImageBitmap(e), r = Math.min(1, t / Math.max(n.width, n.height)), i = Math.round(n.width * r), a = Math.round(n.height * r), o = document.createElement("canvas");
	o.width = i, o.height = a, o.getContext("2d").drawImage(n, 0, 0, i, a), n.close();
	let s = (e) => new Promise((t) => o.toBlob(t, "image/webp", e)), c = await s(_a);
	return c.size > 4e5 && (c = await s(va)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(c);
		}),
		bytes: c.size,
		width: i,
		height: a
	};
}
var xa = "image/svg+xml";
function Sa(e) {
	return e.type === xa || /\.svg$/i.test(e.name || "");
}
function Ca(e) {
	let t = String(e ?? "");
	if (!/<svg[\s>]/i.test(t)) throw Error("Invalid SVG");
	if (/<\s*script[\s>]/i.test(t) || /<\s*foreignObject[\s>]/i.test(t) || /\son[a-z]+\s*=/i.test(t) || /javascript:/i.test(t)) throw Error("The SVG contains scripts or event handlers and cannot be used");
	let n = new Blob([t]).size, r = `data:${xa};base64,${btoa(unescape(encodeURIComponent(t)))}`, i = t.match(/<svg\b[^>]*>/i)?.[0] ?? "", a = i.match(/viewBox\s*=\s*["']\s*([-\d.]+(?:[\s,]+[-\d.]+){3})\s*["']/i)?.[1]?.split(/[\s,]+/).map(Number);
	return {
		dataUrl: r,
		bytes: n,
		width: a?.length === 4 ? a[2] : Number.parseFloat(i.match(/\bwidth\s*=\s*["']?([\d.]+)/i)?.[1]) || 0,
		height: a?.length === 4 ? a[3] : Number.parseFloat(i.match(/\bheight\s*=\s*["']?([\d.]+)/i)?.[1]) || 0
	};
}
function wa(e, t, n = .04) {
	let r = String(e ?? "");
	if (!t || !(t.width > 0) || !(t.height > 0)) return r;
	let i = r.match(/<svg\b[^>]*>/i)?.[0];
	if (!i) return r;
	let a = (e) => Math.round(e * 1e3) / 1e3, o = Math.max(t.width, t.height) * Math.max(0, n), s = a(t.x - o), c = a(t.y - o), l = a(t.width + 2 * o), u = a(t.height + 2 * o), d = i.replace(/\sviewBox\s*=\s*["'][^"']*["']/i, "").replace(/\swidth\s*=\s*["'][^"']*["']/i, "").replace(/\sheight\s*=\s*["'][^"']*["']/i, "").replace(/<svg\b/i, `<svg viewBox="${s} ${c} ${l} ${u}" width="${l}" height="${u}"`);
	return r.replace(i, d);
}
function Ta(e) {
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
function Ea(e) {
	let t = e || "";
	if (/^data:image\/svg\+xml[;,]/.test(t)) return "svg";
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
function Da(e, t = "image") {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || t;
}
function Oa(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region ../template/assets/engine/0.7.4/glyphs.js
var ka = "urd-recent-glyphs", Aa = "urd-recent-icons", ja = [
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
function Ma(e, t) {
	return [t, ...(Array.isArray(e) ? e : []).filter((e) => e !== t)].slice(0, 16);
}
var Na = (e) => {
	try {
		let t = JSON.parse(localStorage.getItem(e) ?? "[]");
		return Array.isArray(t) ? t : [];
	} catch {
		return [];
	}
}, Pa = (e, t, n) => {
	let r = Ma(t, n);
	try {
		localStorage.setItem(e, JSON.stringify(r));
	} catch {}
	return r;
};
function Fa() {
	return Na(ka);
}
function Ia(e) {
	return Pa(ka, Fa(), e);
}
function La() {
	return Na(Aa);
}
function Ra(e) {
	return Pa(Aa, La(), e);
}
//#endregion
//#region ../template/assets/engine/0.7.4/icons.js
var za = "fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"", Ba = "fill=\"currentColor\" stroke=\"none\"", Va = {
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
}, Ha = [
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
function Ua(e) {
	let t = typeof e == "string" ? Va[e] : null;
	return t ? `<svg viewBox="0 0 24 24" width="100%" height="100%" ${t.fill ? Ba : za} aria-hidden="true" focusable="false">${t.body}</svg>` : null;
}
//#endregion
//#region src/lib/GlyphPicker.svelte
var Wa = /* @__PURE__ */ U("<button type=\"button\"><span class=\"gp-svg svelte-15ln1c3\"></span></button>"), Ga = /* @__PURE__ */ U("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), Ka = /* @__PURE__ */ U("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"><!> <!></div>", 1), qa = /* @__PURE__ */ U("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), Ja = /* @__PURE__ */ U("<button type=\"button\"> </button>"), Ya = /* @__PURE__ */ U("<div class=\"gp-group svelte-15ln1c3\"> </div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\"> </button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\"> </p>", 1), Xa = /* @__PURE__ */ U("<!> <!> <!> <!>", 1), Za = /* @__PURE__ */ U("<img class=\"gp-own svelte-15ln1c3\"/>"), Qa = /* @__PURE__ */ U("<span class=\"gp-svg svelte-15ln1c3\"></span>"), $a = /* @__PURE__ */ U("<div class=\"gp-pop gp-anchored svelte-15ln1c3\" popover=\"auto\"><!></div>"), eo = /* @__PURE__ */ U("<div class=\"gp-pop svelte-15ln1c3\"><!></div>"), to = /* @__PURE__ */ U("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"><!></button> <!></span>");
function no(e, t) {
	Je(t, !0);
	let n = (e) => {
		var n = Xa(), a = L(n), o = (e) => {
			var t = Ka(), n = L(t), r = R(n, !0), a = z(n, 2), o = I(a);
			Jr(o, 16, () => V(d), (e) => e, (e, t) => {
				var n = Wa();
				let r;
				var a = I(n);
				q(a, () => Ua(t), !0), D(a), D(n), B((e) => {
					r = hi(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, r, { active: t === i() }), X(n, "title", e);
				}, [() => Z(Va[t].labelKey)]), H("click", n, () => C(t)), W(e, n);
			}), Jr(z(o, 2), 16, () => V(u), (e) => e, (e, t) => {
				var n = Ga(), r = R(n, !0);
				B(() => G(r, t)), H("click", n, () => S(t)), W(e, n);
			}), D(a), B((e) => G(r, e), [() => Z("common.recent")]), W(e, t);
		};
		K(a, (e) => {
			(V(u).length || V(d).length) && e(o);
		});
		var s = z(a, 2), c = (e) => {
			var t = Nr();
			Jr(L(t), 17, () => Ha, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ A(() => h(V(t), 2));
				let r = () => V(n)[0], a = () => V(n)[1];
				var o = qa(), s = L(o), c = R(s, !0), l = z(s, 2);
				Jr(l, 20, a, (e) => e, (e, t) => {
					var n = Wa();
					let r;
					var a = I(n);
					q(a, () => Ua(t), !0), D(a), D(n), B((e) => {
						r = hi(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, r, { active: t === i() }), X(n, "title", e);
					}, [() => Z(Va[t].labelKey)]), H("click", n, () => C(t)), W(e, n);
				}), D(l), B((e) => G(c, e), [() => Z(r())]), W(e, o);
			}), W(e, t);
		};
		K(s, (e) => {
			t.onicon && e(c);
		});
		var l = z(s, 2);
		Jr(l, 17, () => ja, ([e, t]) => e, (e, t) => {
			var n = /* @__PURE__ */ A(() => h(V(t), 2));
			let i = () => V(n)[0], a = () => V(n)[1];
			var o = qa(), s = L(o), c = R(s, !0), l = z(s, 2);
			Jr(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var n = Ja();
				let i;
				var a = R(n, !0);
				B(() => {
					i = hi(n, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === r() }), G(a, t);
				}), H("click", n, () => S(t)), W(e, n);
			}), D(l), B((e) => G(c, e), [() => Z(i())]), W(e, o);
		});
		var f = z(l, 2), p = (e) => {
			var t = Ya(), n = L(t), r = R(n, !0), i = z(n, 2), a = R(i, !0), o = z(i, 2);
			Ai(o, (e) => P(m, e), () => V(m));
			var s = R(z(o, 2), !0);
			B((e, t, n) => {
				G(r, e), G(a, t), G(s, n);
			}, [
				() => Z("gp.ownIcon"),
				() => Z("gp.upload"),
				() => Z("gp.uploadHint")
			]), H("click", i, () => V(m).click()), H("change", o, w), W(e, t);
		};
		K(f, (e) => {
			t.onimage && e(p);
		}), W(e, n);
	}, r = ji(t, "value", 3, "★"), i = ji(t, "icon", 3, null), a = ji(t, "image", 3, null), o = ji(t, "label", 19, () => Z("gp.pickGlyph")), s = Qi(), c = ea("urd-gp"), l = c.slice(2), u = /* @__PURE__ */ N($t([])), d = /* @__PURE__ */ N($t([])), f = /* @__PURE__ */ N(null), p = /* @__PURE__ */ N(null), m = /* @__PURE__ */ N(null), g = /* @__PURE__ */ N(!1), _ = /* @__PURE__ */ N($t({
		top: 0,
		left: 0
	}));
	function v() {
		P(u, Fa(), !0), P(d, t.onicon ? La().filter((e) => Va[e]) : [], !0);
	}
	function y(e) {
		P(g, e.newState === "open"), ta(V(f), V(g)), V(g) && v();
	}
	function b() {
		s && V(p)?.hidePopover(), P(g, !1);
	}
	function x() {
		v();
		let e = V(f).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		P(_, {
			top: n,
			left: t
		}, !0), P(g, !0);
	}
	function S(e) {
		Ia(e), t.onpick?.(e), b();
	}
	function C(e) {
		Ra(e), t.onicon?.(e), b();
	}
	async function w(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", !n) return;
		let r = await ba(n, 256);
		t.onimage?.(r.dataUrl), b();
	}
	bn(() => {
		if (!V(g)) return;
		let e = () => b();
		if (window.addEventListener("blur", e), s) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			V(f) && !V(f).contains(e.target) && P(g, !1);
		}, n = (e) => {
			e.key === "Escape" && P(g, !1);
		}, r = (e) => {
			V(f) && e.target instanceof Node && !V(f).contains(e.target) && P(g, !1);
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var T = to(), ee = I(T), te = I(ee), ne = (e) => {
		var t = Za();
		B((e) => {
			X(t, "src", a()), X(t, "alt", e);
		}, [() => Z("gp.ownIcon")]), W(e, t);
	}, E = (e) => {
		var t = Qa();
		q(t, () => Ua(i()), !0), D(t), W(e, t);
	}, re = (e) => {
		var t = Mr();
		B(() => G(t, r() || "★")), W(e, t);
	};
	K(te, (e) => {
		a() ? e(ne) : i() && Va[i()] ? e(E, 1) : e(re, -1);
	}), D(ee);
	var ie = z(ee, 2), ae = (e) => {
		var t = $a(), r = I(t), i = (e) => {
			n(e);
		};
		K(r, (e) => {
			V(g) && e(i);
		}), D(t), Ai(t, (e) => P(p, e), () => V(p)), B(() => {
			X(t, "id", l), _i(t, `position-anchor: ${c ?? ""}`);
		}), Cr("toggle", t, y), W(e, t);
	}, oe = (e) => {
		var t = eo(), r = I(t);
		n(r), D(t), B(() => _i(t, `top: ${V(_).top ?? ""}px; left: ${V(_).left ?? ""}px`)), W(e, t);
	};
	K(ie, (e) => {
		s ? e(ae) : V(g) && e(oe, 1);
	}), D(T), Ai(T, (e) => P(f, e), () => V(f)), B(() => {
		X(ee, "title", o()), X(ee, "aria-label", o()), X(ee, "popovertarget", s ? l : void 0), _i(ee, s ? `anchor-name: ${c}` : void 0);
	}), H("click", ee, function(...e) {
		(s ? void 0 : () => V(g) ? P(g, !1) : x())?.apply(this, e);
	}), W(e, T), Ye();
}
wr(["click", "change"]);
//#endregion
//#region src/lib/previewBridge.js
function ro(e, t = {}) {
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
function io(e, t) {
	return !(e > 0) || !(t > 0) ? 1 : e / t;
}
function ao(e, t, n, r = 0, i = 0) {
	if (n === "full") return 1;
	let a = i > 0 ? io(r, i) : Infinity;
	return Math.max(.1, Math.min(1, io(e, t), a));
}
//#endregion
//#region src/lib/deploy-wait.js
function oo(e, { max: t = 8 } = {}) {
	let n = (e ?? []).filter((e) => e && typeof e.path == "string" && typeof e.content == "string" && e.encoding === "utf-8" && !e.delete && (e.path.startsWith("content/") || e.path === "plugins/plugins.json"));
	return n.sort((e, t) => (e.path === "content/site.json" ? -1 : 0) - (t.path === "content/site.json" ? -1 : 0)), n.slice(0, t).map(({ path: e, content: t }) => ({
		path: e,
		content: t
	}));
}
async function so(e, { fetchFn: t = fetch, delayMs: n = 1e4, attempts: r = 18, sleep: i = (e) => new Promise((t) => setTimeout(t, e)) } = {}) {
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
var co = 3840, lo = 2400, uo = (e, t, n) => Math.min(n, Math.max(t, e));
function fo({ innerWidth: e = 0, screenWidth: t = 0 } = {}) {
	let n = e > 0 ? e : t;
	return Math.max(1, Math.round(n > 0 ? n : 1));
}
function po(e) {
	return !e || typeof e.innerWidth != "number" ? null : fo({
		innerWidth: e.innerWidth,
		screenWidth: e.screen?.width ?? 0
	});
}
function mo(e, t) {
	let n = e && typeof e == "object" && !Array.isArray(e) ? e : {}, r = n.mode === "custom" ? "custom" : "own", i = Number(n.width), a = uo(Number.isFinite(i) && i > 0 ? i : t, 640, co), o = Number(n.height), s = Number.isFinite(o) && o > 0 ? uo(o, 480, lo) : 0;
	return {
		mode: r,
		width: Math.round(a),
		height: Math.round(s)
	};
}
function ho(e, t) {
	return e?.mode === "custom" ? {
		width: e.width,
		height: e.height || 0
	} : {
		width: t,
		height: 0
	};
}
var go = 1920, _o = [
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
], vo = [
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
], yo = [
	1920,
	1536,
	1366
];
function bo(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 1440;
	let n = Math.round(t / 20) * 20;
	return Math.min(go, Math.max(960, n));
}
function xo(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 6;
	let n = Math.round(t / 1) * 1;
	return Math.min(12, Math.max(0, n));
}
function So(e, t) {
	if (e === "full") return 0;
	let n = Math.min(49, Math.max(0, Number(t) || 0));
	return Math.ceil(Number(e) / (1 - 2 * n / 100));
}
function Co(e, t, n) {
	let r = Math.max(0, Number(t) || 0) / 100 * n, i = Math.max(0, n - 2 * r), a = e !== "full" && Number(e) < i, o = a ? Number(e) : i;
	return {
		width: o,
		margin: Math.round((n - o) / 2),
		pct: n > 0 ? o / n * 100 : 0,
		bound: a
	};
}
function wo(e) {
	return vo.find((t) => t.width === e)?.id ?? null;
}
//#endregion
//#region src/lib/nav-size.js
var To = {
	min: 0,
	max: 64,
	step: 1
}, Eo = {
	min: 12,
	max: 28,
	step: 1
}, Do = {
	min: 0,
	max: 80,
	step: 1
}, Oo = {
	min: 0,
	max: 64,
	step: 1
}, ko = {
	min: 480,
	max: 1920,
	step: 20
}, Ao = {
	min: .3,
	max: .8,
	step: .05
}, jo = {
	min: 0,
	max: 400,
	step: 10
}, Mo = {
	min: 0,
	max: 1200,
	step: 20
}, No = {
	min: 0,
	max: 64,
	step: 1
}, Po = {
	min: 180,
	max: 400,
	step: 1
}, Fo = {
	min: 12,
	max: 128,
	step: 1
}, Io = {
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
}, Lo = [
	"sm",
	"md",
	"lg",
	"xl"
], Ro = .67;
function zo(e) {
	return e === "floating" || e === "floating-square" || e === "floating-tab";
}
function Bo(e, { min: t, max: n, step: r = 1 }, i) {
	let a = Number(e);
	if (e == null || e === "" || !Number.isFinite(a)) return i;
	let o = Math.round(a / r) * r, s = Math.min(n, Math.max(t, o));
	return r < 1 ? Math.round(s * 100) / 100 : s;
}
function Vo(e, t) {
	if (e?.padY != null && e.padY !== "") return Bo(e.padY, To, Io.md.padY);
	let n = Io[e?.size] ?? Io.md;
	return Math.round(n.padY * (zo(t) ? Ro : 1));
}
function Ho(e) {
	if (e?.textSize != null && e.textSize !== "") return Bo(e.textSize, Eo, Io.md.textSize);
	let t = Io[e?.size] ?? Io.md;
	return Math.round(t.textSize);
}
function Uo(e) {
	return e?.padY != null && e.padY !== "" || e?.textSize != null && e.textSize !== "" ? null : Lo.includes(e?.size) ? e.size : "md";
}
//#endregion
//#region src/lib/Dropdown.svelte
var Wo = /* @__PURE__ */ U("<button type=\"button\"> </button>"), Go = /* @__PURE__ */ U("<button type=\"button\"><span class=\"dd-value svelte-vtocc6\"> </span> <span class=\"dd-caret svelte-vtocc6\"> </span></button> <div class=\"dd-pop dd-anchored svelte-vtocc6\" popover=\"auto\"><!></div>", 1), Ko = /* @__PURE__ */ U("<div class=\"dd-pop svelte-vtocc6\"></div>"), qo = /* @__PURE__ */ U("<button type=\"button\"><span class=\"dd-value svelte-vtocc6\"> </span> <span class=\"dd-caret svelte-vtocc6\"> </span></button> <!>", 1), Jo = /* @__PURE__ */ U("<span class=\"dd svelte-vtocc6\"><!></span>");
function Q(e, t) {
	Je(t, !0);
	let n = ji(t, "value", 3, null), r = ji(t, "options", 19, () => []), i = ji(t, "title", 3, null), a = ji(t, "disabled", 3, !1), o = ji(t, "filled", 3, !1), s = ji(t, "compact", 3, !1), c = Qi(), l = ea("urd-dd"), u = l.slice(2), d = /* @__PURE__ */ N(!1), f = /* @__PURE__ */ N(null), p = /* @__PURE__ */ N(null), m = /* @__PURE__ */ N($t({
		top: 0,
		left: 0,
		width: 160
	})), g = () => r().find(([e]) => `${e ?? ""}` == `${n() ?? ""}`)?.[1] ?? "";
	function _() {
		let e = V(f).getBoundingClientRect(), t = Math.min(320, r().length * 32 + 12), n = Math.max(e.width, 160), i = e.bottom + t + 8 <= window.innerHeight;
		P(m, {
			top: i ? e.bottom + 4 : Math.max(8, e.top - t - 4),
			left: Math.max(8, Math.min(e.left, window.innerWidth - n - 8)),
			width: n
		}, !0);
	}
	function v() {
		if (!a()) {
			if (V(d)) {
				P(d, !1);
				return;
			}
			_(), P(d, !0);
		}
	}
	function y(e) {
		c && V(p)?.hidePopover(), P(d, !1), t.onchange?.(e);
	}
	bn(() => {
		if (!V(d)) return;
		let e = () => {
			c ? V(p)?.hidePopover() : P(d, !1);
		};
		if (window.addEventListener("blur", e), c) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			V(f) && !V(f).contains(e.target) && P(d, !1);
		}, n = (e) => {
			e.key === "Escape" && P(d, !1);
		}, r = (e) => {
			V(f) && e.target instanceof Node && !V(f).contains(e.target) && _();
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var b = Jo(), x = I(b), S = (e) => {
		var t = Go(), c = L(t);
		let f;
		var m = I(c), _ = R(m, !0), v = R(z(m, 2), !0);
		D(c);
		var b = z(c, 2), x = I(b), S = (e) => {
			var t = Nr();
			Jr(L(t), 17, r, ([e, t]) => `${e ?? ""}`, (e, t) => {
				var r = /* @__PURE__ */ A(() => h(V(t), 2));
				let i = () => V(r)[0], a = () => V(r)[1];
				var o = Wo();
				let s;
				var c = R(o, !0);
				B(() => {
					s = hi(o, 1, "dd-opt svelte-vtocc6", null, s, { selected: `${i() ?? ""}` == `${n() ?? ""}` }), G(c, a());
				}), H("click", o, () => y(i())), W(e, o);
			}), W(e, t);
		};
		K(x, (e) => {
			V(d) && e(S);
		}), D(b), Ai(b, (e) => P(p, e), () => V(p)), B((e) => {
			f = hi(c, 1, "dd-btn svelte-vtocc6", null, f, {
				"dd-filled": o(),
				"dd-compact": s()
			}), X(c, "title", i()), c.disabled = a(), X(c, "popovertarget", u), _i(c, `anchor-name: ${l ?? ""}`), G(_, e), G(v, V(d) ? "▴" : "▾"), X(b, "id", u), _i(b, `position-anchor: ${l ?? ""}`);
		}, [() => g()]), Cr("toggle", b, (e) => {
			P(d, e.newState === "open");
		}), W(e, t);
	}, C = (e) => {
		var t = qo(), c = L(t);
		let l;
		var u = I(c), f = R(u, !0), p = R(z(u, 2), !0);
		D(c);
		var _ = z(c, 2), b = (e) => {
			var t = Ko();
			Jr(t, 21, r, ([e, t]) => `${e ?? ""}`, (e, t) => {
				var r = /* @__PURE__ */ A(() => h(V(t), 2));
				let i = () => V(r)[0], a = () => V(r)[1];
				var o = Wo();
				let s;
				var c = R(o, !0);
				B(() => {
					s = hi(o, 1, "dd-opt svelte-vtocc6", null, s, { selected: `${i() ?? ""}` == `${n() ?? ""}` }), G(c, a());
				}), H("click", o, () => y(i())), W(e, o);
			}), D(t), B(() => _i(t, `top: ${V(m).top ?? ""}px; left: ${V(m).left ?? ""}px; min-width: ${V(m).width ?? ""}px`)), W(e, t);
		};
		K(_, (e) => {
			V(d) && e(b);
		}), B((e) => {
			l = hi(c, 1, "dd-btn svelte-vtocc6", null, l, {
				"dd-filled": o(),
				"dd-compact": s()
			}), X(c, "title", i()), c.disabled = a(), G(f, e), G(p, V(d) ? "▴" : "▾");
		}, [() => g()]), H("click", c, v), W(e, t);
	};
	K(x, (e) => {
		c ? e(S) : e(C, -1);
	}), D(b), Ai(b, (e) => P(f, e), () => V(f)), W(e, b), Ye();
}
wr(["click"]);
//#endregion
//#region src/lib/Choice.svelte
var Yo = /* @__PURE__ */ U("<button type=\"button\"> </button>"), Xo = /* @__PURE__ */ U("<div><span class=\"choice-label svelte-1ehof1c\"> </span> <div class=\"choice-seg svelte-1ehof1c\" role=\"group\"></div></div>");
function Zo(e, t) {
	Je(t, !0);
	let n = ji(t, "title", 3, void 0), r = /* @__PURE__ */ A(() => t.options.length > 3 || t.options.reduce((e, [, t]) => e + `${t}`.length, 0) > 20), i = (e) => `${e ?? ""}`;
	var a = Xo();
	let o;
	var s = I(a), c = R(s, !0), l = z(s, 2);
	Jr(l, 21, () => t.options, ([e, t]) => i(e), (e, n) => {
		var r = /* @__PURE__ */ A(() => h(V(n), 2));
		let a = () => V(r)[0], o = () => V(r)[1];
		var s = Yo();
		let c;
		var l = R(s, !0);
		B((e, t) => {
			X(s, "aria-pressed", e), c = hi(s, 1, "svelte-1ehof1c", null, c, { on: t }), G(l, o());
		}, [() => i(a()) === i(t.value), () => i(a()) === i(t.value)]), H("click", s, () => t.onchange(a())), W(e, s);
	}), D(l), D(a), B(() => {
		o = hi(a, 1, "choice svelte-1ehof1c", null, o, { stacked: V(r) }), X(a, "title", n()), G(c, t.label), X(l, "aria-label", t.label);
	}), W(e, a), Ye();
}
wr(["click"]);
//#endregion
//#region src/lib/IconEditor.svelte
var Qo = /* @__PURE__ */ U("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\"> </h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\"></canvas> <p class=\"ie-hint svelte-e7sog7\"> </p></div> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"ghost svelte-e7sog7\"> </button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"primary svelte-e7sog7\"> </button></span></div></div>");
function $o(e, t) {
	Je(t, !0);
	let n = ji(t, "image", 3, ""), r = /* @__PURE__ */ N(null), i = /* @__PURE__ */ N(null), a = /* @__PURE__ */ N(1), o = /* @__PURE__ */ N(.5), s = /* @__PURE__ */ N(.5), c = /* @__PURE__ */ N(1), l = /* @__PURE__ */ N(1), u = /* @__PURE__ */ N(1);
	bn(() => {
		if (!n()) return;
		let e = new Image();
		e.onload = () => {
			P(i, e, !0);
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
			P(o, Math.min(1, Math.max(0, V(o) - (e.clientX - t) / c)), !0), P(s, Math.min(1, Math.max(0, V(s) - (e.clientY - n) / l)), !0), t = e.clientX, n = e.clientY;
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
	var h = Qo(), g = I(h), _ = I(g), v = R(_, !0), y = z(_, 2), b = I(y);
	X(b, "width", 220), X(b, "height", 220), Ai(b, (e) => P(r, e), () => V(r));
	var x = R(z(b, 2), !0);
	D(y);
	var S = z(y, 2), C = I(S), w = R(z(C));
	D(S);
	var T = z(S, 2);
	J(T);
	var ee = z(T, 2), te = I(ee), ne = R(z(te));
	D(ee);
	var E = z(ee, 2);
	J(E);
	var re = z(E, 2), ie = I(re), ae = R(z(ie));
	D(re);
	var oe = z(re, 2);
	J(oe);
	var se = z(oe, 2), ce = I(se), le = R(z(ce));
	D(se);
	var ue = z(se, 2);
	J(ue);
	var de = z(ue, 2), fe = I(de), pe = R(fe, !0), me = z(fe, 2), he = R(me, !0);
	D(de);
	var ge = z(de, 2), _e = I(ge), ve = R(_e, !0), ye = z(_e, 2), be = R(ye, !0);
	D(ge), D(g), D(h), B((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) => {
		G(v, e), X(b, "title", t), G(x, n), G(C, `${r ?? ""} `), G(w, `${i ?? ""}x`), G(te, `${a ?? ""} `), G(ne, `${o ?? ""}%`), G(ie, `${s ?? ""} `), G(ae, `${c ?? ""}%`), G(ce, `${l ?? ""} `), G(le, `${u ?? ""}%`), G(pe, d), G(he, f), G(ve, p), G(be, m);
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
	]), H("pointerdown", b, f), Ei(T, () => V(a), (e) => P(a, e)), Ei(E, () => V(c), (e) => P(c, e)), Ei(oe, () => V(l), (e) => P(l, e)), Ei(ue, () => V(u), (e) => P(u, e)), H("click", fe, () => P(u, 0)), H("click", me, p), H("click", _e, () => t.oncancel?.()), H("click", ye, m), W(e, h), Ye();
}
wr(["pointerdown", "click"]);
//#endregion
//#region ../template/assets/engine/0.7.4/blocks/form.js
var es = () => [
	{
		id: "navn",
		label: Z("form.fieldName"),
		type: "text",
		required: !0
	},
	{
		id: "epost",
		label: Z("form.fieldEmail"),
		type: "email",
		required: !0
	},
	{
		id: "melding",
		label: Z("form.fieldMessage"),
		type: "textarea",
		required: !0
	}
], ts = 24, ns = {
	"oppsett-byttet": "layout-changed",
	"blokk-endret": "block-edited",
	"desktop-endret-etter-mobil": "desktop-changed-after-mobile",
	seksjonshøyde: "section-height",
	"blokk-flyttet": "block-moved",
	"blokk-slettet": "block-deleted",
	"blokk-lagt-til": "block-added"
};
function rs(e, t) {
	if (!e || !("y" in e || "h" in e)) return e ?? null;
	if (t && e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h) return null;
	let n = {
		x: e.x,
		w: e.w
	};
	return Number.isFinite(e.y) && (n.row = Math.max(1, Math.round((e.y - ts) / 8) + 1), n.rows = Number.isFinite(e.h) ? Math.max(1, Math.ceil(e.h / 8)) : 1), Number.isFinite(e.z) && e.z !== 1 && (n.z = e.z), e.rot && (n.rot = e.rot), n;
}
var is = {
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
}, as = { bildegalleri: "slideshow" }, os = {
	flate: "surface",
	aksent: "accent",
	invers: "inverse",
	dus: "soft",
	dempet: "muted",
	dyp: "deep",
	uthevet: "highlighted"
}, ss = {
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
function cs(e) {
	let t = Array.isArray(e) ? e : e.blocks ?? [];
	for (let e of t) is[e.type] && (e.type = is[e.type]);
	if (!Array.isArray(e)) {
		for (let t of e.background?.layers ?? []) as[t.type] && (t.type = as[t.type]);
		os[e.theme] && (e.theme = os[e.theme]), ss[e.preset] && (e.preset = ss[e.preset]);
	}
	return e;
}
var ls = {
	1: (e) => {
		for (let t of e.sections ?? []) {
			let e = t.responsive?.mobile;
			for (let e of t.blocks ?? []) e.decor && (e.hideMobile = !0), e.frames?.mobile && (e.frames.mobile = rs(e.frames.mobile, e.frames.desktop));
			e?.mode === "manual" && (e.mode = "auto");
			let n = e?.attention?.reason;
			n && ns[n] && (e.attention.reason = ns[n]);
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) cs(t);
		return e;
	},
	3: (e) => {
		for (let t of e.sections ?? []) cs(t);
		return e;
	}
}, us = {
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
function ds(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 4;) {
		let r = us[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function fs(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 4;) {
		let i = ls[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/plugins.js
function ps(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var ms = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function hs(e, t) {
	let n = ps(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = ps(t[2]), a = ms(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var gs = /^[a-z0-9][a-z0-9-]*$/;
function _s(e) {
	let t = [];
	if (!e || typeof e != "object") return ["the manifest is not an object"];
	gs.test(e.id ?? "") || t.push("id is missing or invalid"), (typeof e.name != "string" || !e.name) && t.push("name is missing"), ps(e.version ?? "") || t.push("version is not semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine is missing");
	let n = Array.isArray(e.languages) && e.languages.length > 0;
	return (e.entry !== void 0 || !n) && (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry is missing or is not a .js file"), (e.provides !== void 0 || !n) && (!e.provides || typeof e.provides != "object") && t.push("provides is missing"), e.languages !== void 0 && t.push(...Ri(e.languages)), e.locales !== void 0 && typeof e.locales != "boolean" && t.push("locales must be a boolean"), e.names !== void 0 && (typeof e.names != "object" || e.names === null || Array.isArray(e.names) || Object.values(e.names).some((e) => typeof e != "string" || !e)) && t.push("names must be an object mapping language code to name"), t;
}
Promise.resolve();
//#endregion
//#region ../template/assets/engine/0.7.4/sections/presets.js
function vs(e) {
	return typeof crypto < "u" && crypto.randomUUID ? `${e}-${crypto.randomUUID().slice(0, 8)}` : `${e}-${[...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4))].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
var ys = () => ({ mobile: {
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
}), bs = (e, t, n = {}) => ({
	id: vs("blk"),
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
}), xs = (e, t = {}) => ({
	id: vs("blk"),
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
}), Ss = (e, t, n = {}) => ({
	id: vs("blk"),
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
}), Cs = (e, t, n = 40) => ({
	id: vs("blk"),
	type: "icon",
	version: 1,
	props: {
		glyph: t,
		color: "accent",
		size: n
	},
	animation: null,
	frames: e
}), ws = (e, t = {}) => ({
	id: vs("blk"),
	type: "map",
	version: 1,
	props: {
		location: "",
		zoom: 15,
		height: 320,
		...t
	},
	animation: null,
	frames: e
}), Ts = (e, t = {}) => ({
	id: vs("blk"),
	type: "form",
	version: 1,
	props: {
		recipient: "",
		subject: "",
		mode: "mailto",
		endpoint: "",
		submitLabel: Z("form.sendDefault"),
		successText: Z("form.thanksDefault"),
		fields: es(),
		...t
	},
	animation: null,
	frames: e
}), Es = (e, t = {}) => ({
	id: vs("blk"),
	type: "calendar",
	version: 1,
	props: {
		sources: [],
		view: "list",
		limit: 6,
		showCategories: !0,
		showSubscribe: !0,
		...t
	},
	animation: null,
	frames: e
}), Ds = () => ({
	type: "hover-lift",
	version: 1,
	props: {}
}), Os = (e, t, n = {}) => ({
	id: vs("blk"),
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
}), ks = (e, t = {}) => ({
	id: vs("blk"),
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
}), As = (e, t = {}) => ({
	id: vs("blk"),
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
}), js = (e, t = {}) => ({
	id: vs("blk"),
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
}), Ms = (e, t = {}) => ({
	id: vs("blk"),
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
}), Ns = (e, t) => ({
	id: vs("blk"),
	type: "faq",
	version: 1,
	props: {
		items: t,
		multi: !1
	},
	animation: null,
	frames: e
}), Ps = (e, t = {}) => ({
	id: vs("blk"),
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
}), Fs = (e, t) => ({
	id: vs("blk"),
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
}), Is = (e, t = {}) => ({
	id: vs("blk"),
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
}), Ls = (...e) => ({
	version: 1,
	layers: e
}), Rs = (e) => ({
	type: "color",
	version: 1,
	props: { value: e }
}), zs = (e, t, n, r = .5) => ({
	type: "glow",
	version: 1,
	props: {
		x: e,
		y: t,
		color: "accent",
		radius: r,
		opacity: n
	}
}), Bs = (e) => Math.max(0, ...e.blocks.map((e) => e.frames.desktop.y + e.frames.desktop.h)), Vs = (e, t, n, r, i, a) => ({
	x: n + e % t * r,
	y: i + Math.floor(e / t) * a
}), Hs = (e, t, n, r, i, a, o, s, c = 0) => {
	let l = (t) => e.blocks.some((e) => {
		let n = e.frames.desktop;
		return n.x < t.x + t.w - .01 && t.x < n.x + n.w - .01 && n.y < t.y + t.h - .01 && t.y < n.y + n.h - .01;
	});
	for (let e = 0; e < 60; e++) {
		let u = Vs(e, t, n, r, i, a);
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
		y: Bs(e) + 16,
		n: 0
	};
}, Us = (e, t, n) => e + t * .1 + n * .01, Ws = (e, t, n, r, i = null) => ({
	id: vs("sec"),
	version: 1,
	preset: e,
	size: { minHeight: t },
	grid: i,
	background: n,
	blocks: r,
	responsive: ys()
});
function Gs(e) {
	e.sections.define("blank", {
		label: "Empty section",
		labelKey: "preset.blank.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "A blank canvas to build on freely",
		hintKey: "preset.blank.hint",
		create: () => Ws("blank", "40vh", Ls(Rs("bg")), [])
	}), e.sections.define("hero", {
		label: "Hero",
		labelKey: "preset.hero.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Large opening with gradient and glow, left-aligned",
		hintKey: "preset.hero.hint",
		create: () => Ws("hero", "70vh", {
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
				zs(.7, .2, .35),
				{
					type: "grain",
					version: 1,
					props: { opacity: .06 }
				}
			]
		}, [
			bs($(8.33, 40, 50, 38), Z("seed.hero.title")),
			bs($(8.33, 84, 41.67, 26), Z("seed.hero.intro")),
			Ss($(8.33, 118, 20, 32), Z("seed.readMore"))
		])
	}), e.sections.define("hero-centered", {
		label: "Hero, centred",
		labelKey: "preset.hero-centered.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Centred opening with two buttons",
		hintKey: "preset.hero-centered.hint",
		create: () => Ws("hero-centered", "60vh", Ls(Rs("bg")), [
			bs($(15, 64, 70, 44), Z("seed.heroCenter.title"), { align: "center" }),
			bs($(25, 116, 50, 26), Z("seed.heroCenter.intro"), { align: "center" }),
			Ss($(31.5, 160, 17, 40), Z("seed.join")),
			Ss($(51.5, 160, 17, 40), Z("seed.readMore"), { style: "secondary" })
		])
	}), e.sections.define("images", {
		label: "Images",
		labelKey: "preset.images.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Title and three image frames",
		hintKey: "preset.images.hint",
		create: () => Ws("images", "360px", Ls(Rs("bg")), [
			bs($(4, 24, 50, 32), Z("seed.images.title")),
			xs($(4, 72, 28, 220)),
			xs($(36, 72, 28, 220)),
			xs($(68, 72, 28, 220))
		]),
		itemLabel: "image",
		itemLabelKey: "item.image",
		item: (e) => {
			let { x: t, y: n } = Hs(e, 3, 4, 32, 72, 244, 28, 220);
			return {
				blocks: [xs($(t, n, 28, 220))],
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
		create: () => Ws("gallery", "440px", Ls(Rs("bg")), [bs($(4, 24, 50, 32), Z("seed.gallery.title")), Ms($(4, 72, 92, 320))])
	}), e.sections.define("find-us", {
		label: "Find us",
		labelKey: "preset.find-us.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Map with your address (privacy-friendly OpenStreetMap)",
		hintKey: "preset.find-us.hint",
		create: () => Ws("find-us", "480px", Ls(Rs("bg")), [bs($(6, 40, 60, 70), Z("seed.findUs.title")), ws($(6, 120, 88, 360, 2))])
	}), e.sections.define("whats-on", {
		label: "What is on",
		labelKey: "preset.whats-on.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Event list from a subscribable calendar (iCal/Google)",
		hintKey: "preset.whats-on.hint",
		create: () => Ws("whats-on", "520px", Ls(Rs("bg")), [bs($(6, 40, 60, 70), Z("seed.whatsOn.title")), Es($(6, 130, 88, 320, 2), { limit: 5 })])
	}), e.sections.define("contact-form", {
		label: "Contact form",
		labelKey: "preset.contact-form.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Contact form that sends via email (or your own endpoint)",
		hintKey: "preset.contact-form.hint",
		create: () => Ws("contact-form", "520px", Ls(Rs("bg")), [bs($(6, 40, 60, 120), Z("seed.contactForm.intro")), Ts($(6, 180, 60, 380, 2))])
	}), e.sections.define("contact", {
		label: "Contact",
		labelKey: "preset.contact.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Contact details in a card with an email button",
		hintKey: "preset.contact.hint",
		create: () => Ws("contact", "320px", Ls(Rs("surface"), zs(.2, .8, .2)), [
			bs($(10, 32, 40, 36), Z("seed.contact.title")),
			bs($(10, 84, 36, 130), Z("seed.contact.info"), { box: !0 }),
			Ss($(60, 100, 22, 40), Z("seed.contact.button"), { href: `mailto:${Z("seed.email")}` })
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
				let i = Cs($(e + 10.5, 88, 4, 52), n), a = bs($(e, 152, 25, 200), Z("seed.features.card", { title: r }), {
					align: "center",
					box: !0
				});
				return a.animation = Ds(), i.mobileOrder = Us(88, t, 0), a.mobileOrder = Us(88, t, 1), [i, a];
			};
			return Ws("feature-cards", "420px", Ls(Rs("bg")), [
				bs($(6, 28, 60, 38), Z("seed.features.title")),
				...e(6, 0, "✦", Z("seed.features.card1")),
				...e(37.5, 1, "★", Z("seed.features.card2")),
				...e(69, 2, "✓", Z("seed.features.card3"))
			]);
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = Hs(e, 3, 6, 31.5, 152, 296, 25, 264, -64), i = Cs($(t + 10.5, n - 64, 4, 52), "✦"), a = bs($(t, n, 25, 200), Z("seed.features.card", { title: Z("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return a.animation = Ds(), i.mobileOrder = Us(88, r, 0), a.mobileOrder = Us(88, r, 1), {
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
				let r = bs($(e, 88, 25, 200), Z("seed.features.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.animation = Ds(), r.mobileOrder = Us(88, t, 0), r;
			};
			return Ws("feature-cards-simple", "360px", Ls(Rs("bg")), [
				bs($(6, 28, 60, 38), Z("seed.features.title")),
				e(6, 0, Z("seed.features.card1")),
				e(37.5, 1, Z("seed.features.card2")),
				e(69, 2, Z("seed.features.card3"))
			]);
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = Hs(e, 3, 6, 31.5, 88, 232, 25, 200), i = bs($(t, n, 25, 200), Z("seed.features.card", { title: Z("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.animation = Ds(), i.mobileOrder = Us(88, r, 0), {
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
				let n = xs($(e, 88, 25, 160)), r = bs($(e, 256, 25, 160), Z("seed.news.card"));
				return n.mobileOrder = Us(88, t, 0), r.mobileOrder = Us(88, t, 1), [n, r];
			};
			return Ws("news", "460px", Ls(Rs("bg")), [
				bs($(6, 28, 50, 38), Z("seed.news.title")),
				Ss($(78, 30, 16, 36), Z("seed.news.seeAll"), { style: "secondary" }),
				...e(6, 0),
				...e(37.5, 1),
				...e(69, 2)
			]);
		},
		itemLabel: "story",
		itemLabelKey: "item.story",
		item: (e) => {
			let { x: t, y: n, n: r } = Hs(e, 3, 6, 31.5, 88, 344, 25, 328), i = xs($(t, n, 25, 160)), a = bs($(t, n + 168, 25, 160), Z("seed.news.card"));
			return i.mobileOrder = Us(88, r, 0), a.mobileOrder = Us(88, r, 1), {
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
		create: () => Ws("news-collection", "300px", Ls(Rs("bg")), [bs($(6, 28, 50, 38), Z("seed.news.title")), Os($(6, 88, 88, 180), "cards")])
	}), e.sections.define("noticeboard", {
		label: "Noticeboard",
		labelKey: "preset.noticeboard.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Dated list from a collection (notices/announcements)",
		hintKey: "preset.noticeboard.hint",
		create: () => Ws("noticeboard", "300px", Ls(Rs("surface")), [bs($(6, 28, 50, 38), Z("seed.noticeboard.title")), Os($(6, 88, 88, 180), "list", { limit: 8 })])
	}), e.sections.define("publication-archive", {
		label: "Publication archive",
		labelKey: "preset.publication-archive.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Year-grouped archive from a collection (issues, minutes, reports)",
		hintKey: "preset.publication-archive.hint",
		create: () => Ws("publication-archive", "300px", Ls(Rs("bg")), [bs($(6, 28, 60, 38), Z("seed.archive.title")), Os($(6, 88, 88, 180), "archive", { limit: 0 })])
	}), e.sections.define("events", {
		label: "Events",
		labelKey: "preset.events.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Three rows with date badge and sign-up button",
		hintKey: "preset.events.hint",
		create: () => {
			let e = (e, t, n, r) => [
				bs($(6, e, 8, 88), Z("seed.events.dateBadge", {
					day: t,
					month: n
				}), {
					align: "center",
					box: !0
				}),
				bs($(16, e, 58, 88), Z("seed.events.row", { title: r })),
				Ss($(78, e + 24, 16, 40), Z("seed.events.signup"), { style: "secondary" })
			];
			return Ws("events", "440px", Ls(Rs("surface")), [
				bs($(6, 28, 50, 38), Z("seed.events.title")),
				...e(88, "11", Z("seed.events.monthAug"), Z("seed.events.row1")),
				...e(196, "25", Z("seed.events.monthAug"), Z("seed.events.row2")),
				...e(304, "8", Z("seed.events.monthSep"), Z("seed.events.row3"))
			]);
		},
		itemLabel: "row",
		itemLabelKey: "item.row",
		item: (e) => {
			let t = Bs(e) + 16;
			return {
				blocks: [
					bs($(6, t, 8, 88), Z("seed.events.newBadge"), {
						align: "center",
						box: !0
					}),
					bs($(16, t, 58, 88), Z("seed.events.row", { title: Z("seed.events.newTitle") })),
					Ss($(78, t + 24, 16, 40), Z("seed.events.signup"), { style: "secondary" })
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
				let r = xs($(e, 80, 22, 180), { alt: Z("seed.team.alt") }), i = bs($(e, 268, 22, 84), Z("seed.team.member", { role: n }), { align: "center" });
				return r.mobileOrder = Us(80, t, 0), i.mobileOrder = Us(80, t, 1), [r, i];
			};
			return Ws("team", "420px", Ls(Rs("surface")), [
				bs($(6, 24, 50, 32), Z("seed.team.title")),
				...e(7.5, 0, Z("seed.team.role1")),
				...e(39, 1, Z("seed.team.role2")),
				...e(70.5, 2, Z("seed.team.role3"))
			]);
		},
		itemLabel: "person",
		itemLabelKey: "item.person",
		item: (e) => {
			let { x: t, y: n, n: r } = Hs(e, 3, 7.5, 31.5, 80, 288, 22, 272), i = xs($(t, n, 22, 180), { alt: Z("seed.team.alt") }), a = bs($(t, n + 188, 22, 84), Z("seed.team.member", { role: Z("seed.team.roleNew") }), { align: "center" });
			return i.mobileOrder = Us(80, r, 0), a.mobileOrder = Us(80, r, 1), {
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
		create: () => Ws("faq", "520px", Ls(Rs("bg")), [
			bs($(25, 24, 50, 36), Z("seed.faq.title"), { align: "center" }),
			Ns($(20, 80, 60, 320), [
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
			bs($(20, 416, 60, 32), Z("seed.faq.more"), { align: "center" })
		])
	}), e.sections.define("timeline", {
		label: "Timeline",
		labelKey: "preset.timeline.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Your story as events along a line",
		hintKey: "preset.timeline.hint",
		create: () => Ws("timeline", "480px", Ls(Rs("bg")), [bs($(25, 24, 50, 36), Z("seed.timeline.title"), { align: "center" }), Fs($(25, 88, 50, 330), [
			{
				year: "2019",
				title: Z("seed.timeline.t1"),
				text: Z("seed.timeline.text")
			},
			{
				year: "2022",
				title: Z("seed.timeline.t2"),
				text: Z("seed.timeline.text")
			},
			{
				year: "2026",
				title: Z("seed.timeline.t3"),
				text: Z("seed.timeline.text")
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
				let r = bs($(e, 88, 25, 72), `<h3>${t + 1}</h3>`, {
					align: "center",
					size: 44
				}), i = bs($(e, 168, 25, 160), Z("seed.steps.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.mobileOrder = Us(88, t, 0), i.mobileOrder = Us(88, t, 1), [r, i];
			};
			return Ws("steps", "400px", Ls(Rs("bg")), [
				bs($(6, 28, 60, 38), Z("seed.steps.title")),
				...e(6, 0, Z("seed.steps.s1")),
				...e(37.5, 1, Z("seed.steps.s2")),
				...e(69, 2, Z("seed.steps.s3"))
			]);
		},
		itemLabel: "step",
		itemLabelKey: "item.step",
		item: (e) => {
			let { x: t, y: n, n: r } = Hs(e, 3, 6, 31.5, 88, 272, 25, 240), i = bs($(t, n, 25, 72), `<h3>${r + 1}</h3>`, {
				align: "center",
				size: 44
			}), a = bs($(t, n + 80, 25, 160), Z("seed.steps.card", { title: Z("seed.steps.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.mobileOrder = Us(88, r, 0), a.mobileOrder = Us(88, r, 1), {
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
				xs($(6, 40, 55, 300)),
				bs($(6, 348, 55, 108), Z("seed.feature.main")),
				Ss($(6, 464, 14, 38), Z("seed.readMore"), { style: "secondary" }),
				xs($(66, 40, 28, 120)),
				bs($(66, 164, 28, 60), Z("seed.feature.small1")),
				xs($(66, 244, 28, 120)),
				bs($(66, 368, 28, 60), Z("seed.feature.small2"))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = Us(40, t < 3 ? 0 : 1, t);
			}), Ws("lead-story", "540px", Ls(Rs("bg")), e);
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
					xs($(e, 88, 25, 200)),
					bs($(e, 296, 25, 76), Z("seed.products.card", {
						name: n,
						price: r
					}), { align: "center" }),
					Ss($(e + 5, 380, 15, 40), Z("seed.products.buy"))
				];
				return i.forEach((e, n) => {
					e.mobileOrder = Us(88, t, n);
				}), i;
			};
			return Ws("products", "470px", Ls(Rs("bg")), [
				bs($(6, 28, 50, 38), Z("seed.products.title")),
				...e(6, 0, Z("seed.products.name"), Z("seed.products.price1")),
				...e(37.5, 1, Z("seed.products.name"), Z("seed.products.price2")),
				...e(69, 2, Z("seed.products.name"), Z("seed.products.price3"))
			]);
		},
		itemLabel: "product",
		itemLabelKey: "item.product",
		item: (e) => {
			let { x: t, y: n, n: r } = Hs(e, 3, 6, 31.5, 88, 348, 25, 332), i = [
				xs($(t, n, 25, 200)),
				bs($(t, n + 208, 25, 76), Z("seed.products.card", {
					name: Z("seed.products.name"),
					price: Z("seed.products.price1")
				}), { align: "center" }),
				Ss($(t + 5, n + 292, 15, 40), Z("seed.products.buy"))
			];
			return i.forEach((e, t) => {
				e.mobileOrder = Us(88, r, t);
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
		create: () => Ws("shop", "544px", Ls(Rs("bg")), [
			bs($(6, 28, 50, 38), Z("seed.shop.title")),
			As($(78, 88, 16, 48)),
			ks($(6, 176, 88, 320))
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
				bs($(6, 48, 52, 96), Z("seed.shopHero.title")),
				bs($(6, 152, 40, 48), Z("seed.shopHero.sub")),
				Ss($(6, 216, 17, 42), Z("seed.shopHero.cta")),
				xs($(62, 40, 32, 300))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = Us(48, t < 3 ? 0 : 1, t);
			}), Ws("shop-hero", "400px", {
				version: 1,
				layers: [
					Rs("bg"),
					zs(.8, .25, .28, .6),
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
				let r = xs($(e, 88, 21, 170)), i = bs($(e, 266, 21, 34), Z("seed.shopCategories.tile", { name: n }), { align: "center" });
				return r.mobileOrder = Us(88, t, 0), i.mobileOrder = Us(88, t, 1), [r, i];
			}, t = Ws("shop-categories", "360px", Ls(Rs("bg")), [
				bs($(6, 28, 60, 38), Z("seed.shopCategories.title")),
				...e(6, 0, Z("seed.shopCategories.cat1")),
				...e(29.5, 1, Z("seed.shopCategories.cat2")),
				...e(53, 2, Z("seed.shopCategories.cat3")),
				...e(76.5, 3, Z("seed.shopCategories.cat4"))
			]);
			return t.theme = "soft", t;
		},
		itemLabel: "category",
		itemLabelKey: "item.category",
		item: (e) => {
			let { x: t, y: n, n: r } = Hs(e, 4, 6, 23.5, 88, 220, 21, 212), i = xs($(t, n, 21, 170)), a = bs($(t, n + 178, 21, 34), Z("seed.shopCategories.tile", { name: Z("seed.shopCategories.newCat") }), { align: "center" });
			return i.mobileOrder = Us(88, r, 0), a.mobileOrder = Us(88, r, 1), {
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
				let i = Cs($(e + 10.5, 88, 4, 52), r, 44), a = bs($(e, 148, 25, 96), Z(n), { align: "center" });
				return i.mobileOrder = Us(88, t, 0), a.mobileOrder = Us(88, t, 1), [i, a];
			}, t = Ws("shop-trust", "300px", Ls(Rs("bg")), [
				bs($(6, 28, 60, 38), Z("seed.shopTrust.title")),
				...e(6, 0, "seed.shopTrust.t1", "✓"),
				...e(37.5, 1, "seed.shopTrust.t2", "↻"),
				...e(69, 2, "seed.shopTrust.t3", "✉")
			]);
			return t.theme = "muted", t;
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = Hs(e, 3, 6, 31.5, 148, 216, 25, 156, -60), i = Cs($(t + 10.5, n - 60, 4, 52), "✓", 44), a = bs($(t, n, 25, 96), Z("seed.shopTrust.newItem"), { align: "center" });
			return i.mobileOrder = Us(88, r, 0), a.mobileOrder = Us(88, r, 1), {
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
				bs($(6, 56, 52, 100), Z("seed.shopShowcase.title")),
				bs($(6, 164, 42, 56), Z("seed.shopShowcase.text")),
				Ss($(6, 236, 18, 42), Z("seed.shopShowcase.cta")),
				xs($(62, 48, 32, 240))
			];
			e.forEach((e, t) => {
				e.mobileOrder = Us(56, t < 3 ? 0 : 1, t);
			});
			let t = Ws("shop-showcase", "340px", Ls(Rs("bg")), e);
			return t.theme = "deep", t;
		}
	}), e.sections.define("checkout", {
		label: "Checkout",
		labelKey: "preset.checkout.label",
		group: "Shop",
		groupKey: "presetGroup.shop",
		hint: "Order form that sends the basket as an email or to an endpoint",
		hintKey: "preset.checkout.hint",
		create: () => Ws("checkout", "560px", Ls(Rs("bg")), [bs($(6, 28, 50, 38), Z("seed.checkout.title")), js($(25, 96, 50, 430))])
	}), e.sections.define("cta", {
		label: "CTA banner",
		labelKey: "preset.cta.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Full width with one clear action",
		hintKey: "preset.cta.hint",
		create: () => Ws("cta", "280px", Ls(Rs("surface"), zs(.5, .5, .3, .7)), [
			bs($(20, 56, 60, 40), Z("seed.cta.title"), { align: "center" }),
			bs($(25, 104, 50, 26), Z("seed.cta.sub"), { align: "center" }),
			Ss($(42, 148, 16, 42), Z("seed.join"))
		])
	}), e.sections.define("quote", {
		label: "Quote",
		labelKey: "preset.quote.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Large quote with attribution",
		hintKey: "preset.quote.hint",
		create: () => Ws("quote", "300px", Ls(Rs("bg")), [Ps($(20, 56, 60, 190), {
			text: Z("seed.quoteBlock.text"),
			attribution: Z("seed.quoteBlock.name"),
			role: Z("seed.quoteBlock.role")
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
				let a = Is($(e, 76, 25, 120), {
					value: n,
					suffix: r,
					label: i
				});
				return a.mobileOrder = Us(76, t, 0), a;
			};
			return Ws("stats", "260px", Ls(Rs("surface")), [
				e(6, 0, "120", "+", Z("seed.stats.l1")),
				e(37.5, 1, "25", "", Z("seed.stats.l2")),
				e(69, 2, "1981", "", Z("seed.stats.l3"))
			]);
		},
		itemLabel: "number",
		itemLabelKey: "item.number",
		item: (e) => {
			let { x: t, y: n, n: r } = Hs(e, 3, 6, 31.5, 76, 140, 25, 120), i = Is($(t, n, 25, 120), {
				value: "42",
				label: Z("seed.stats.newLabel")
			});
			return i.mobileOrder = Us(76, r, 0), {
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
			let e = (e) => xs($(e, 108, 18.5, 100), {
				alt: Z("seed.sponsors.alt"),
				fit: "contain",
				radius: null,
				saturate: 0
			});
			return Ws("sponsors", "280px", Ls(Rs("bg")), [
				bs($(6, 28, 60, 36), Z("seed.sponsors.title")),
				e(5.5),
				e(29),
				e(52.5),
				e(76)
			]);
		},
		itemLabel: "logo",
		itemLabelKey: "item.logo",
		item: (e) => {
			let { x: t, y: n } = Hs(e, 4, 5.5, 23.5, 108, 124, 18.5, 100);
			return {
				blocks: [xs($(t, n, 18.5, 100), {
					alt: Z("seed.sponsors.alt"),
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
		create: () => Ws("membership", "500px", Ls(Rs("surface")), [
			bs($(6, 28, 50, 38), Z("seed.membership.title")),
			bs($(14, 88, 32, 250), Z("seed.membership.tier1"), {
				align: "center",
				box: !0
			}),
			bs($(54, 88, 32, 250), Z("seed.membership.tier2"), {
				align: "center",
				box: !0
			}),
			Ss($(42, 358, 16, 42), Z("seed.join")),
			bs($(25, 414, 50, 30), Z("seed.membership.vipps"), { align: "center" })
		])
	});
}
//#endregion
//#region ../template/assets/engine/0.7.4/templates-model.js
var Ks = [
	"section",
	"blocks",
	"page"
];
function qs(e) {
	return Da(String(e ?? ""), "");
}
function Js(e, t, { id: n, title: r }) {
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
//#region ../template/assets/engine/0.7.4/collections-csv.js
var Ys = [
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
function Xs(e) {
	let t = String(e ?? "");
	return /[",\n\r]/.test(t) ? `"${t.replaceAll("\"", "\"\"")}"` : t;
}
function Zs(e, t) {
	return t === "sizes" ? (e.sizes ?? []).join("|") : t === "colors" ? (e.colors ?? []).map((e) => e.name).join("|") : e[t] ?? "";
}
function Qs(e) {
	let t = [Ys.join(",")];
	for (let n of e ?? []) t.push(Ys.map((e) => Xs(Zs(n, e))).join(","));
	return t.join("\n") + "\n";
}
function $s(e) {
	let t = [], n = [], r = "", i = !1, a = String(e ?? "");
	for (let e = 0; e < a.length; e += 1) {
		let o = a[e];
		i ? o === "\"" && a[e + 1] === "\"" ? (r += "\"", e += 1) : o === "\"" ? i = !1 : r += o : o === "\"" ? i = !0 : o === "," ? (n.push(r), r = "") : o === "\n" || o === "\r" ? (o === "\r" && a[e + 1] === "\n" && (e += 1), n.push(r), t.push(n), n = [], r = "") : r += o;
	}
	return (r !== "" || n.length) && (n.push(r), t.push(n)), t.filter((e) => e.some((e) => e.trim() !== ""));
}
var ec = (e) => String(e ?? "").split("|").map((e) => e.trim()).filter(Boolean);
function tc(e) {
	let t = $s(e);
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
		let s = ec(t.sizes);
		s.length && (o.sizes = s);
		let c = ec(t.colors);
		c.length && (o.colors = c.map((e) => ({ name: e }))), r.push(o);
	}
	return {
		entries: r,
		skipped: i
	};
}
//#endregion
//#region ../template/assets/engine/0.7.4/feeds.js
function nc(e) {
	return String(e ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&apos;");
}
function rc(e, t) {
	let n = String(t ?? "").replace(/\/+$/, "");
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${(e ?? []).filter((e) => !e.noindex).map((e) => `  <url><loc>${nc(n + (e.path === "/" ? "/" : e.path))}</loc></url>`).join("\n")}\n</urlset>\n`;
}
function ic(e) {
	return `User-agent: *\nDisallow: /admin/\n\nSitemap: ${String(e ?? "").replace(/\/+$/, "")}/sitemap.xml\n`;
}
var ac = [
	"news",
	"notices",
	"publications"
];
function oc(e) {
	let t = String(e.origin ?? "").replace(/\/+$/, ""), n = (e.items ?? []).map((n) => {
		let r = n.href ? new URL(n.href, t + "/").href : t + "/", i = n.date ? new Date(n.date) : null, a = i && !Number.isNaN(i.getTime()) ? `\n      <pubDate>${i.toUTCString()}</pubDate>` : "", o = n.text ? `\n      <description>${nc(n.text)}</description>` : "";
		return `    <item>\n      <title>${nc(n.title)}</title>\n      <link>${nc(r)}</link>\n      <guid isPermaLink="false">${nc(`${e.path}#${n.id ?? n.title}`)}</guid>${o}${a}\n    </item>`;
	}).join("\n");
	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${nc(e.title)}</title>\n    <link>${nc(t + "/")}</link>\n    <description>${nc(e.description ?? e.title)}</description>\n${n}${n ? "\n" : ""}  </channel>\n</rss>\n`;
}
//#endregion
//#region ../template/assets/engine/0.7.4/preset-thumb.js
var sc = /^#[0-9a-fA-F]{3,8}$/, cc = /^[a-z][a-z0-9-]*$/, lc = "#171c26", uc = "#232a38", dc = "#98a1b3", fc = "#7c5cff", pc = (e, t) => `var(--urd-color-${e}, ${t})`;
function mc(e, t) {
	return typeof e == "string" ? sc.test(e) ? e : cc.test(e) ? pc(e, t) : t : t;
}
function hc(e, t = 800) {
	let n = Number.parseFloat(e);
	return !Number.isFinite(n) || n <= 0 ? 400 : typeof e == "string" && e.trim().endsWith("vh") ? n / 100 * t : n;
}
var gc = (e) => Math.round(e * 10) / 10, _c = (e, t, n) => Math.min(n, Math.max(t, e)), vc = (e, t, n, r, i, a = "") => `<rect x="${gc(e)}" y="${gc(t)}" width="${gc(Math.max(n, 1))}" height="${gc(Math.max(r, 1))}" fill="${i}"${a}/>`;
function yc(e) {
	if (e?.theme) return e.theme === "inverse" || e.theme === "deep" ? pc("text", dc) : e.theme === "accent" ? pc("accent", fc) : pc("surface", uc);
	for (let t of e?.background?.layers ?? []) {
		if (t.type === "color") return mc(t.props?.value, lc);
		if (t.type === "gradient") return mc(Array.isArray(t.props?.stops) ? t.props.stops[0] : null, lc);
	}
	return pc("bg", lc);
}
function bc(e, t, n, r, i) {
	let a = /<h[1-3]/.test(String(i?.html ?? "")), o = i?.align === "center", s = pc("text", dc), c = [];
	i?.box && c.push(vc(e, t, n, r, pc("surface", uc), " rx=\"1.5\""));
	let l = i?.box ? Math.min(2, n * .06) : 0, u = e + l, d = n - l * 2, f = [
		.72,
		.9,
		.5
	], p = [
		a ? 4 : 2.2,
		2.2,
		2.2
	], m = _c(r / (p[0] + p[1] + p[2] + 4.8 + 2), 0, 1), h = t + l + Math.min(1, r * .08);
	for (let e = 0; e < 3; e++) {
		let n = Math.min(Math.max(e === 0 ? a ? 1.4 : 1 : .8, p[e] * m), Math.max(r, 1));
		if (e > 0 && h + n > t + r - l) break;
		let i = d * f[e], g = o ? u + (d - i) / 2 : u;
		c.push(vc(g, h, i, n, s, ` opacity="${e === 0 ? .8 : .4}" rx="${gc(Math.min(1, n / 2))}"`)), h += n + Math.max(.8, 2.4 * m);
	}
	return c.join("");
}
function xc(e, t, n, r, i = !1) {
	let a = pc("text", dc), o = [];
	i ? (o.push(vc(e, t, n, r, pc("surface", uc), " rx=\"1.5\" opacity=\"0.35\"")), o.push(`<rect x="${gc(e + .4)}" y="${gc(t + .4)}" width="${gc(Math.max(n - .8, 1))}" height="${gc(Math.max(r - .8, 1))}" fill="none" stroke="${a}" stroke-width="0.6" stroke-dasharray="2 2" opacity="0.35" rx="1.5"/>`)) : o.push(vc(e, t, n, r, pc("surface", uc), " rx=\"1.5\""));
	let s = i ? .15 : .4, c = (t) => gc(e + n * t), l = (e) => gc(t + r * e);
	return o.push(`<polygon points="${c(.08)},${l(.9)} ${c(.42)},${l(.38)} ${c(.62)},${l(.68)} ${c(.75)},${l(.5)} ${c(.92)},${l(.9)}" fill="${a}" opacity="${s}"/>`), o.push(`<circle cx="${c(.28)}" cy="${l(.26)}" r="${gc(Math.max(1, Math.min(n, r) * .1))}" fill="${a}" opacity="${gc(s + .1)}"/>`), o.join("");
}
function Sc(e, t, n, r, i) {
	let a = !(Array.isArray(i?.images) && i.images.length), o = Math.max(1, n * .03), s = (n - o * 2) / 3, c = [];
	for (let n = 0; n < 3; n++) c.push(xc(e + n * (s + o), t, s, r, a));
	return c.join("");
}
function Cc(e, t, n, r) {
	let i = Math.max(1, n * .03), a = (n - i * 2) / 3, o = [];
	for (let n = 0; n < 3; n++) {
		let s = e + n * (a + i);
		o.push(vc(s, t, a, r * .55, pc("surface", uc), " rx=\"1.5\"")), o.push(vc(s, t + r * .62, a * .8, 2, pc("text", dc), " opacity=\"0.5\" rx=\"1\""));
	}
	return o.join("");
}
function wc(e, t, n, r, i) {
	let a = mc(i?.color, fc), o = i?.kind;
	return o === "circle" ? `<ellipse cx="${gc(e + n / 2)}" cy="${gc(t + r / 2)}" rx="${gc(Math.max(n / 2, 1))}" ry="${gc(Math.max(r / 2, 1))}" fill="${a}" opacity="0.8"/>` : o === "triangle" ? `<polygon points="${gc(e)},${gc(t + r)} ${gc(e + n / 2)},${gc(t)} ${gc(e + n)},${gc(t + r)}" fill="${a}" opacity="0.8"/>` : o === "line" || o === "arrow" ? vc(e, t + r / 2 - .75, n, 1.5, a, " opacity=\"0.85\" rx=\"0.75\"") : vc(e, t, n, r, a, " opacity=\"0.8\" rx=\"1\"");
}
function Tc(e, t, n, r, i, a) {
	if (e === "text") return bc(t, n, r, i, a);
	if (e === "image") return xc(t, n, r, i, !a?.src);
	if (e === "gallery") return Sc(t, n, r, i, a);
	if (e === "collection") return Cc(t, n, r, i);
	if (e === "faq") {
		let e = _c(Math.floor(i / 5), 2, 3), a = Math.max(.6, i * .04), o = (i - a * (e - 1)) / e, s = [];
		for (let i = 0; i < e; i += 1) {
			let e = n + i * (o + a);
			s.push(vc(t, e, r, o, pc("surface", uc), " rx=\"1\"")), s.push(vc(t + r * .06, e + o / 2 - .7, r * .55, 1.4, pc("text", dc), " opacity=\"0.5\" rx=\"0.7\"")), s.push(`<circle cx="${gc(t + r * .92)}" cy="${gc(e + o / 2)}" r="0.9" fill="${pc("text", dc)}" opacity="0.4"/>`);
		}
		return s.join("");
	}
	if (e === "shape") return wc(t, n, r, i, a);
	if (e === "button") return vc(t, n, r, i, pc("accent", fc), ` rx="${gc(Math.min(i / 2, 4))}"`);
	if (e === "icon") {
		let e = Math.max(1.2, Math.min(r, i) / 2);
		return `<circle cx="${gc(t + r / 2)}" cy="${gc(n + i / 2)}" r="${gc(e)}" fill="${pc("accent", fc)}" opacity="0.85"/>`;
	}
	if (e === "video") {
		let e = [vc(t, n, r, i, pc("surface", uc), " rx=\"1.5\"")], a = t + r / 2, o = n + i / 2, s = Math.max(1.5, Math.min(r, i) * .22);
		return e.push(`<polygon points="${gc(a - s / 2)},${gc(o - s)} ${gc(a - s / 2)},${gc(o + s)} ${gc(a + s)},${gc(o)}" fill="${pc("text", dc)}" opacity="0.6"/>`), e.join("");
	}
	if (e === "timeline") {
		let e = [vc(t + 1, n, 1.4, i, pc("accent", fc), " opacity=\"0.7\" rx=\"0.7\"")];
		for (let a = 0; a < 3; a += 1) {
			let o = n + i * (.18 + a * .32);
			e.push(`<circle cx="${gc(t + 1.7)}" cy="${gc(o)}" r="1.6" fill="${pc("accent", fc)}"/>`), e.push(vc(t + 5, o - 1, r * .5, 2, pc("text", dc), " opacity=\"0.5\" rx=\"1\""));
		}
		return e.join("");
	}
	if (e === "quote") return [
		`<text x="${gc(t + r / 2)}" y="${gc(n + i * .34)}" text-anchor="middle" font-size="${gc(Math.min(r, i) * .5)}" font-family="Georgia, serif" fill="${pc("accent", fc)}">“</text>`,
		vc(t + r * .15, n + i * .48, r * .7, 2, pc("text", dc), " opacity=\"0.6\" rx=\"1\""),
		vc(t + r * .25, n + i * .62, r * .5, 2, pc("text", dc), " opacity=\"0.6\" rx=\"1\""),
		vc(t + r * .35, n + i * .82, r * .3, 1.6, pc("text", dc), " opacity=\"0.35\" rx=\"0.8\"")
	].join("");
	if (e === "stats") return [vc(t + r * .28, n + i * .15, r * .44, i * .42, pc("accent", fc), " opacity=\"0.85\" rx=\"1\""), vc(t + r * .32, n + i * .72, r * .36, 1.6, pc("text", dc), " opacity=\"0.4\" rx=\"0.8\"")].join("");
	if (e === "table") {
		let e = Math.max(1.6, i * .22), a = [vc(t, n, r, e, pc("accent", fc), " opacity=\"0.5\" rx=\"0.8\"")], o = _c(Math.floor((i - e) / 3.2), 1, 3);
		for (let s = 0; s < o; s += 1) a.push(vc(t, n + e + 1 + s * ((i - e - 1) / o), r, 1, pc("text", dc), " opacity=\"0.3\""));
		return a.push(vc(t + r * .33, n, .6, i, pc("text", dc), " opacity=\"0.2\"")), a.push(vc(t + r * .66, n, .6, i, pc("text", dc), " opacity=\"0.2\"")), a.join("");
	}
	if (e === "share") {
		let e = Math.max(1.2, Math.min(i / 2, r / 9)), a = [];
		for (let r = 0; r < 4; r += 1) a.push(`<circle cx="${gc(t + e + r * (e * 2 + 1.5))}" cy="${gc(n + i / 2)}" r="${gc(e)}" fill="${pc("accent", fc)}" opacity="0.8"/>`);
		return a.join("");
	}
	if (e === "countdown") {
		let e = Math.max(.8, r * .03), a = (r - e * 3) / 4, o = [];
		for (let r = 0; r < 4; r += 1) {
			let s = t + r * (a + e);
			o.push(vc(s, n, a, i, pc("surface", uc), " rx=\"1\"")), o.push(vc(s + a * .25, n + i * .2, a * .5, i * .35, pc("accent", fc), " opacity=\"0.85\" rx=\"0.8\""));
		}
		return o.join("");
	}
	if (e === "audio") {
		let e = [vc(t, n, r, i, pc("surface", uc), " rx=\"1.5\"")], a = n + i / 2, o = Math.max(1.2, i * .28);
		return e.push(`<polygon points="${gc(t + r * .06)},${gc(a - o)} ${gc(t + r * .06)},${gc(a + o)} ${gc(t + r * .06 + o * 1.4)},${gc(a)}" fill="${pc("accent", fc)}" opacity="0.85"/>`), e.push(vc(t + r * .2, a - .6, r * .7, 1.2, pc("text", dc), " opacity=\"0.35\" rx=\"0.6\"")), e.join("");
	}
	if (e === "product") {
		let e = Math.max(.8, r * .03), a = (r - e * 2) / 3, o = [];
		for (let r = 0; r < 3; r += 1) {
			let s = t + r * (a + e);
			o.push(vc(s, n, a, i, pc("surface", uc), " rx=\"1\"")), o.push(vc(s + a * .08, n + i * .06, a * .84, i * .42, pc("text", dc), " opacity=\"0.15\" rx=\"0.8\"")), o.push(vc(s + a * .08, n + i * .56, a * .6, 1.4, pc("text", dc), " opacity=\"0.5\" rx=\"0.7\"")), o.push(vc(s + a * .08, n + i * .72, a * .35, 1.4, pc("accent", fc), " opacity=\"0.85\" rx=\"0.7\"")), o.push(vc(s + a * .08, n + i * .84, a * .84, i * .1, pc("accent", fc), " opacity=\"0.6\" rx=\"1\""));
		}
		return o.join("");
	}
	if (e === "cart") {
		let e = Math.max(1.5, Math.min(r, i) / 2.4), a = t + r / 2, o = n + i / 2;
		return [
			`<circle cx="${gc(a)}" cy="${gc(o)}" r="${gc(e)}" fill="${pc("surface", uc)}"/>`,
			vc(a - e * .5, o - e * .25, e, e * .55, pc("text", dc), " opacity=\"0.5\" rx=\"0.4\""),
			`<circle cx="${gc(a + e * .75)}" cy="${gc(o - e * .75)}" r="${gc(Math.max(.9, e * .35))}" fill="${pc("accent", fc)}"/>`
		].join("");
	}
	return e === "checkout" ? [
		vc(t, n, r * .7, 1.2, pc("text", dc), " opacity=\"0.5\" rx=\"0.6\""),
		vc(t, n + i * .12, r * .5, 1.2, pc("text", dc), " opacity=\"0.35\" rx=\"0.6\""),
		vc(t, n + i * .3, r, i * .14, pc("surface", uc), " rx=\"1\""),
		vc(t, n + i * .5, r, i * .14, pc("surface", uc), " rx=\"1\""),
		vc(t, n + i * .78, r * .45, i * .16, pc("accent", fc), " opacity=\"0.85\" rx=\"1.2\"")
	].join("") : vc(t, n, r, i, pc("surface", uc), " rx=\"1.5\"");
}
function Ec(e, t, n) {
	let r = Array.isArray(e?.blocks) ? e.blocks : [], i = r.map((e) => (e.frames?.desktop?.y ?? 0) + (e.frames?.desktop?.h ?? 0)), a = n / Math.max(hc(e?.size?.minHeight), i.length ? Math.max(...i) + 16 : 0), o = [vc(0, 0, t, n, yc(e))];
	for (let r of e?.background?.layers ?? []) {
		if (r.type !== "glow") continue;
		let e = r.props ?? {};
		o.push(`<circle cx="${gc(_c(e.x ?? .5, 0, 1) * t)}" cy="${gc(_c(e.y ?? .3, 0, 1) * n)}" r="${gc(t * _c(e.radius ?? .5, .1, 1) * .5)}" fill="${mc(e.color, fc)}" opacity="${gc(_c(e.opacity ?? .3, 0, .5))}"/>`);
	}
	let s = t * .06, c = t - s * 2;
	for (let e of r) {
		let r = e.frames?.desktop;
		if (!r) continue;
		let i = _c(s + (r.x ?? 0) * (c / 100), 0, t - 2), l = _c((r.y ?? 0) * a, 0, n - 2), u = _c((r.w ?? 10) * (c / 100), 2, t - i), d = _c((r.h ?? 20) * a, 2, n - l);
		o.push(Tc(e.type, i, l, u, d, e.props));
	}
	return o.join("");
}
function Dc(e, { w: t = 96, h: n = 116, max: r = 6 } = {}) {
	let i = (Array.isArray(e?.sections) ? e.sections : []).slice(0, r);
	if (!i.length) return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${vc(0, 0, t, n, pc("bg", lc))}</svg>`;
	let a = i.map((e) => _c(hc(e?.size?.minHeight), 160, 900)), o = a.reduce((e, t) => e + t, 0), s = n - 1 * (i.length - 1), c = [], l = 0;
	for (let e = 0; e < i.length; e += 1) {
		let n = Math.max(6, a[e] / o * s);
		c.push(`<g transform="translate(0 ${gc(l)})">${Ec(i[e], t, n)}</g>`), l += n + 1;
	}
	return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${c.join("")}</svg>`;
}
//#endregion
//#region ../template/assets/engine/0.7.4/page-presets.js
var Oc = /* @__PURE__ */ new Map();
Gs({ sections: { define: (e, t) => Oc.set(e, t) } });
var kc = [
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
function Ac(e, { pageId: t, title: n }) {
	let r = kc.find((t) => t.id === e);
	return r ? {
		schemaVersion: 4,
		meta: {
			id: t,
			title: n
		},
		sections: r.sections.map((e) => Oc.get(e).create())
	} : null;
}
//#endregion
//#region ../template/assets/engine/0.7.4/palette-search.js
function jc(e) {
	return String(e ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}
function Mc(e, t) {
	let n = jc(t).trim(), r = jc(e);
	return n ? r.startsWith(n) ? 0 : r.split(/[^a-z0-9]+/).some((e) => e.startsWith(n)) ? 1 : r.includes(n) ? 2 : -1 : 2;
}
function Nc(e, t, n) {
	return e.map((e, r) => ({
		item: e,
		i: r,
		rank: Mc(n(e), t)
	})).filter((e) => e.rank >= 0).sort((e, t) => e.rank - t.rank || e.i - t.i).map((e) => e.item);
}
//#endregion
//#region ../template/assets/engine/0.7.4/theme.js
function Pc(e, t, n) {
	return t === "light" || t === "dark" ? t : n ? "dark" : "light";
}
function Fc(e, t) {
	let n = e.tokens || {}, r = e.scheme === "dark" ? "dark" : "light";
	if (!e.alt?.tokens || t === r) return n;
	let i = {};
	for (let t of /* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(e.alt.tokens)])) i[t] = {
		...n[t],
		...e.alt.tokens[t]
	};
	return i;
}
var Ic = /^[a-zA-Z0-9#%.,()'"\s+\-*/]+$/;
function Lc(e) {
	return typeof e == "string" && Ic.test(e) && !/url\(|\/\*|\*\/|expression/i.test(e);
}
function Rc(e) {
	let t = e.tokens || {}, n = Fc(e, "light"), r = Fc(e, "dark"), i = e.scheme === "dark" ? "dark" : "light", a = [], o = [], s = [], c = /* @__PURE__ */ new Set([
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
			Lc(c) && (a.push(`  --urd-${e}-${l}: ${c};`), i && a.push(`  --urd-base-${l}: ${c};`)), u !== d && (i && Lc(u) && Lc(d) ? o.push({
				name: l,
				lv: u,
				dv: d
			}) : !i && Lc(u) && Lc(d) && s.push({
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
	].some((e) => Lc(e.color?.["accent-text"])) && Lc(t.color?.accent);
	u && Lc(t.color?.bg) && (a.push(`  --urd-color-accent-text: ${t.color.bg};`), a.push(`  --urd-base-accent-text: ${t.color.bg};`));
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
function zc(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
var Bc = {
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
}, Vc = {
	surface: "sectionTheme.surface",
	accent: "sectionTheme.accent",
	inverse: "sectionTheme.inverse",
	soft: "sectionTheme.soft",
	muted: "sectionTheme.muted",
	deep: "sectionTheme.deep",
	highlighted: "sectionTheme.highlighted"
};
[...new Set(Object.values(Bc).flatMap(Object.keys))];
function Hc(e) {
	return Bc[e] ?? {};
}
function Uc(e) {
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
function Wc(e, t) {
	let n = Uc(e), r = Uc(t);
	return n == null || r == null ? null : (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/color.js
var Gc = {
	version: 1,
	label: "Colour",
	labelKey: "bgLayer.color",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = zc(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, Kc = {
	linear: [
		"pan",
		"pan-loop",
		"rotate"
	],
	radial: ["pulse", "orbit"]
};
function qc(e) {
	let t = Array.isArray(e) && e.length ? e : [{ color: "#0b0e14" }, { color: "#1a1030" }], n = t.map((e) => Math.max(0, Number(e?.share) || 0)), r = n.reduce((e, t) => e + t, 0), i = r <= 0, a = i ? t.length : r, o = 0;
	return t.map((e, t) => {
		let r = i ? 1 : n[t], s = (o + r / 2) / a * 100;
		return o += r, {
			color: e?.color ?? "#0b0e14",
			at: Math.round(s * 100) / 100
		};
	});
}
function Jc(e) {
	let t = (e) => Math.round(e * 100) / 100, n = e[0]?.at ?? 0;
	return [...e.map((e) => ({
		color: e.color,
		at: t(e.at - n)
	})), {
		color: e[0]?.color ?? "#0b0e14",
		at: 100
	}];
}
function Yc(e, t, n, r = .5) {
	let i = n % 360 * Math.PI / 180, a = (e) => Math.round(e * 100) / 100 || 0, o = (Math.abs(e * Math.sin(i)) + Math.abs(t * Math.cos(i))) / (1 - Math.min(Math.max(r, 0), .9));
	return {
		period: a(o),
		dx: a(Math.sin(i) * o),
		dy: a(-Math.cos(i) * o)
	};
}
function Xc(e, t, n) {
	return `repeating-linear-gradient(${t}deg, ${e.map((e) => `${zc(e.color)} ${Math.round(e.at / 100 * n * 100) / 100}px`).join(", ")})`;
}
function Zc(e) {
	let t = e.kind === "radial" ? "radial" : "linear", n = (Kc[t] ?? []).includes(e.animation) ? e.animation : null, r = qc(e.stops), i = r.map((e) => `${zc(e.color)} ${e.at}%`).join(", "), a = {}, o;
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
					stops: Jc(r),
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
var Qc = /* @__PURE__ */ new Set(), $c = !1;
function el(e) {
	Qc.add(e), !($c || typeof window > "u") && ($c = !0, window.addEventListener("resize", () => {
		for (let e of [...Qc]) e() || Qc.delete(e);
	}));
}
var tl = !1;
function nl() {
	if (!tl) {
		tl = !0;
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
var rl = {
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
		let n = Zc(t);
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
					let e = Yc(r, i, n.loop.angle, n.loop.maxShare);
					t.style.inset = `${-Math.ceil(e.period)}px`, t.style.background = Xc(n.loop.stops, n.loop.angle, e.period), t.style.setProperty("--urd-loop-dx", `${e.dx}px`), t.style.setProperty("--urd-loop-dy", `${e.dy}px`);
				}
				return !0;
			};
			requestAnimationFrame(r), el(r);
			return;
		}
		if (n.runner) {
			e.classList.add("urd-bg-loop-host");
			let t = document.createElement("div");
			t.className = n.runner.className, t.style.background = n.runner.background, n.runner.left != null && (t.style.left = n.runner.left), n.runner.top != null && (t.style.top = n.runner.top), e.appendChild(t);
			return;
		}
		e.style.background = n.background, n.className && (e.classList.add(n.className), n.className === "urd-bg-rotate" && nl());
	}
}, il = {
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
		let n = zc(t.color), r = t.x ?? .5, i = t.y ?? .3, a = t.radius ?? .5;
		e.style.background = `radial-gradient(circle at ${r * 100}% ${i * 100}%, ${n} 0%, transparent ${a * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, al = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", ol = {
	version: 1,
	label: "Grain",
	labelKey: "bgLayer.grain",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = al, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
}, sl = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
function cl(e) {
	return typeof e == "string" && sl.test(e);
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/image.js
var ll = .4;
function ul(e, t) {
	return `${(e ?? .5) * 100}% ${(t ?? .5) * 100}%`;
}
function dl(e, t) {
	return e === "contain" ? "contain" : e === "cover" ? "cover" : `${Math.max(0, t ?? 1) * 100}%`;
}
function fl(e) {
	let t = "-9999px";
	return e === "up" ? `inset(${t} 0 0 0)` : e === "down" ? `inset(0 0 ${t} 0)` : e === "both" ? `inset(${t} 0 ${t} 0)` : "inset(0)";
}
function pl(e, t, n, r = .18) {
	let i = Math.max(0, Math.min(1, n)) * ll * t;
	return Math.round(Math.min(i, r * e));
}
function ml(e, t, n, r, i) {
	let a = e + t / 2, o = (n / 2 - a) * Math.max(0, Math.min(1, r)) * ll, s = i ?? pl(t, n, r);
	return Math.max(-s, Math.min(s, o)) || 0;
}
var hl = /* @__PURE__ */ new Set(), gl = !1, _l = 0;
function vl() {
	_l = 0;
	for (let e of [...hl]) e() || hl.delete(e);
}
function yl() {
	_l ||= requestAnimationFrame(vl);
}
function bl(e) {
	hl.add(e), e(), !(gl || typeof window > "u") && (gl = !0, window.addEventListener("scroll", yl, { passive: !0 }), window.addEventListener("resize", yl, { passive: !0 }));
}
function xl(e, t, n, r) {
	let i = r === "cover" || r === "tile" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement, o = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
	e.style.willChange = "transform";
	let s = (t) => {
		e.style.top = `-${t}px`, e.style.bottom = `-${t}px`;
	}, c = () => {
		if (!e.isConnected) return !1;
		if (o || document.body.classList.contains("urd-mobile")) return s(n), e.style.transform = "", !0;
		let r = (a ?? e).getBoundingClientRect(), c = window.innerHeight || document.documentElement.clientHeight, l = pl(r.height, c, t, i ? .18 : .6);
		s(i ? Math.max(n, l) : n);
		let u = ml(r.top, r.height, c, t, l);
		return e.style.transform = `translateY(${u.toFixed(1)}px)`, !0;
	};
	bl(c), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(c));
}
function Sl() {
	return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("animation-timeline", "view()");
}
var Cl = /* @__PURE__ */ new Set(), wl = !1, Tl = 0;
function El() {
	Tl = 0;
	for (let e of [...Cl]) e() || Cl.delete(e);
}
function Dl() {
	!Tl && typeof requestAnimationFrame == "function" && (Tl = requestAnimationFrame(El));
}
function Ol(e) {
	Cl.add(e), e(), !(wl || typeof window > "u") && (wl = !0, window.addEventListener("resize", Dl, { passive: !0 }));
}
function kl(e, t, n, r) {
	let i = r === "cover" || r === "tile" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement;
	e.style.willChange = "transform", e.classList.add("urd-parallax-css");
	let o = () => {
		if (!e.isConnected) return !1;
		let r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || document.body.classList.contains("urd-mobile"), o = (a ?? e).getBoundingClientRect(), s = window.innerHeight || document.documentElement.clientHeight, c = pl(o.height, s, t, i ? .18 : .6), l = i && !r ? Math.max(n, c) : n;
		return e.style.setProperty("--urd-px-shift", `${c}px`), e.style.top = `-${l}px`, e.style.bottom = `-${l}px`, !0;
	};
	Ol(o), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(o));
}
var Al = {
	version: 2,
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
		bleed: "none"
	}),
	migrations: { 1: (e) => ({
		...e,
		fit: e.fit === "vanlig" ? "plain" : e.fit === "flislegg" ? "tile" : e.fit === "egen" ? "custom" : e.fit
	}) },
	render(e, t) {
		if (!cl(t.src)) return;
		e.style.opacity = String(t.opacity ?? 1), e.style.clipPath = fl(t.bleed), e.style.zIndex = t.bleed === "down" || t.bleed === "both" ? "1" : "";
		let n = document.createElement("div");
		n.className = "urd-bg-image", n.style.position = "absolute", n.style.left = "0", n.style.right = "0", n.style.top = "0", n.style.bottom = "0";
		let r = t.fit === "tile" || t.fit === "repeat";
		n.style.backgroundImage = `url("${t.src}")`, n.style.backgroundSize = dl(t.fit, t.size), n.style.backgroundRepeat = r ? "repeat" : "no-repeat", n.style.backgroundPosition = ul(t.x, t.y);
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
		e.appendChild(n), t.parallax > 0 && jl(n, t.parallax, i, t.fit ?? "cover");
	}
};
function jl(e, t, n, r) {
	Sl() ? kl(e, t, n, r) : xl(e, t, n, r);
}
//#endregion
//#region ../template/assets/engine/0.7.4/gallery-model.js
function Ml(e, t, n) {
	return !Number.isFinite(n) || n < 1 ? 0 : (((Number.isFinite(e) ? e : 0) + t) % n + n) % n;
}
function Nl({ count: e = 0, reducedMotion: t = !1 } = {}) {
	return e >= 2 && !t;
}
function Pl(e, { min: t = 2, fallback: n = 5 } = {}) {
	let r = Number(e);
	return !Number.isFinite(r) || r <= 0 ? n : Math.max(t, r);
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/slideshow.js
var Fl = {
	version: 1,
	label: "Image gallery",
	labelKey: "bgLayer.slideshow",
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
		let n = (t.images ?? []).filter((e) => cl(e?.src));
		if (!n.length) return;
		e.classList.add("urd-bg-slideshow"), e.style.opacity = String(t.opacity ?? 1), t.blur > 0 && (e.style.filter = `blur(${t.blur}px)`, e.style.inset = `-${t.blur * 2}px`);
		let r = Math.max(0, Number(t.fade) || 0);
		e.style.setProperty("--urd-bgg-fade", `${r}s`);
		let i = (e, n) => {
			e.style.backgroundImage = `url("${n.src}")`, e.style.backgroundSize = dl(t.fit), e.style.backgroundRepeat = "no-repeat", e.style.backgroundPosition = ul(n.x, n.y);
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
		if (!Nl({
			count: n.length,
			reducedMotion: s
		})) return;
		let c = document.createElement("div");
		c.className = "urd-bg-slide", e.appendChild(c);
		let l = 0, u = o, d = Math.max(Pl(t.interval, { fallback: 6 }), r + .5) * 1e3, f = setInterval(() => {
			if (!e.isConnected) {
				clearInterval(f);
				return;
			}
			if (document.hidden) return;
			let t = Ml(l, 1, n.length), r = new Image();
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
}, Il = /^(?:data:video\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/media\/[\w%./-]+\.(?:mp4|webm))$/i;
function Ll(e) {
	return typeof e == "string" && Il.test(e);
}
var Rl = null;
function zl(e) {
	Rl ??= new IntersectionObserver((e) => {
		for (let t of e) {
			if (!t.target.isConnected) {
				Rl.unobserve(t.target);
				continue;
			}
			t.isIntersecting ? t.target.play().catch(() => {}) : t.target.pause();
		}
	}, { threshold: 0 }), Rl.observe(e);
}
var Bl = (e, t, n, r) => {
	e.style.position = "absolute", e.style.inset = "0", e.style.width = "100%", e.style.height = "100%", e.style.objectFit = t === "contain" ? "contain" : "cover", e.style.objectPosition = ul(n, r);
}, Vl = {
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
		if (!Ll(t.src)) return;
		if (e.style.opacity = String(t.opacity ?? 1), window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
			if (!cl(t.poster)) return;
			let n = document.createElement("img");
			n.className = "urd-bg-video-poster", n.alt = "", n.setAttribute("aria-hidden", "true"), n.src = t.poster, Bl(n, t.fit, t.x, t.y), e.appendChild(n);
			return;
		}
		let n = document.createElement("video");
		n.className = "urd-bg-video", n.muted = !0, n.setAttribute("muted", ""), n.loop = !0, n.playsInline = !0, n.setAttribute("playsinline", ""), n.preload = "metadata", n.disablePictureInPicture = !0, n.setAttribute("aria-hidden", "true"), cl(t.poster) && (n.poster = t.poster), n.src = t.src, Bl(n, t.fit, t.x, t.y), e.appendChild(n), zl(n), t.parallax > 0 && jl(n, t.parallax, 0, t.fit === "contain" ? "contain" : "cover");
	}
};
//#endregion
//#region ../template/assets/engine/0.7.4/footer-thumb.js
function Hl(e = {}) {
	let t = "#2fd6b6", n = "#5c6b64", r = e.mega ? "#16221d" : "#0e1512", i = e.cols ?? 0, a = e.social ?? 0, o = `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${r}"/>`;
	if (e.mega && (o += `<circle cx="20" cy="6" r="34" fill="${t}" opacity="0.18"/>`), e.bigcta) return o += `<rect x="45" y="18" width="70" height="8" rx="3" fill="${n}" opacity="0.85"/>`, o += `<rect x="56" y="32" width="48" height="4" rx="2" fill="${n}" opacity="0.5"/>`, o += `<rect x="62" y="43" width="36" height="10" rx="3" fill="${t}"/>`, o += Ul(n, e.baselineLinks), o + "</svg>";
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
	return o += Ul(n, e.baselineLinks), o + "</svg>";
}
function Ul(e, t = 0) {
	let n = `<line x1="8" y1="66" x2="152" y2="66" stroke="${e}" stroke-width="0.6" opacity="0.5"/>`;
	return n += `<rect x="8" y="70" width="40" height="3" rx="1.5" fill="${e}" opacity="0.6"/>`, t && (n += `<g fill="${e}" opacity="0.6">` + Array.from({ length: t }, (e, t) => `<rect x="${120 - t * 16}" y="70" width="12" height="3" rx="1.5"/>`).join("") + "</g>"), n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/animations/core.js
var Wl = () => ({
	duration: 600,
	delay: 0
}), Gl = 90, Kl = {
	"fade-in": {
		version: 1,
		label: "Fade in",
		labelKey: "anim.fadeIn",
		entrance: !0,
		defaults: Wl,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Slide up",
		labelKey: "anim.slideUp",
		entrance: !0,
		defaults: Wl,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom in",
		labelKey: "anim.zoomIn",
		entrance: !0,
		defaults: Wl,
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
			step: Gl,
			effect: "slide-up",
			pattern: "sequence"
		}),
		migrations: {}
	}
}, ql = [
	["font.system", "system-ui, sans-serif"],
	["font.arial", "Arial, Helvetica, sans-serif"],
	["font.verdana", "Verdana, Geneva, sans-serif"],
	["font.trebuchet", "'Trebuchet MS', sans-serif"],
	["font.georgia", "Georgia, 'Times New Roman', serif"],
	["font.palatino", "'Palatino Linotype', Palatino, serif"],
	["font.courier", "'Courier New', monospace"]
];
//#endregion
//#region ../template/assets/engine/0.7.4/place.js
function Jl(e) {
	let t = (e) => Math.round(e * 100) / 100, n = Math.max(0, t(100 - e.w)), r = Math.min(n, Math.max(0, t(e.x - e.w / 2))), i = Math.max(0, e.y - e.h / 2), a = e.snap === !1 || e.grid?.snap === !1, o = e.grid?.size || 8;
	return i = a ? Math.round(i) : Math.round(i / o) * o, {
		x: r,
		y: Math.max(0, i)
	};
}
//#endregion
//#region src/App.svelte
var Yl = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Xl = /* @__PURE__ */ U("<button class=\"ghost row-tool svelte-1n46o8q\"></button>"), Zl = /* @__PURE__ */ U("<span><span class=\"grad-grip svelte-1n46o8q\"><svg viewBox=\"0 0 16 16\" width=\"14\" height=\"14\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"13\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"13\" r=\"1.4\"></circle></svg></span> <!> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span> <!></span>"), Ql = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), $l = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/>", 1), eu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), tu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), nu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), ru = /* @__PURE__ */ U("<div class=\"sizefill svelte-1n46o8q\"><button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button> <button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button></div> <label class=\"svelte-1n46o8q\"> </label> <div class=\"focalpad svelte-1n46o8q\"><span class=\"focaldot svelte-1n46o8q\"></span></div> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), iu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), au = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> </label> <div class=\"sizestep svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"10\" max=\"400\" class=\"svelte-1n46o8q\"/> <span class=\"sizeunit svelte-1n46o8q\">%</span> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></div> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), ou = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), su = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"120\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\"> </p>", 1), cu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), lu = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"video/mp4,video/webm\" class=\"svelte-1n46o8q\"/></label> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), uu = /* @__PURE__ */ U("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!></div>"), du = /* @__PURE__ */ U("<!> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), fu = /* @__PURE__ */ U("<input class=\"nav-target svelte-1n46o8q\"/>"), pu = /* @__PURE__ */ U("<div class=\"nav-row nav-sub-row\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target\"><!></span> <!></div>"), mu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label>"), hu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"num-stepper svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"1\" max=\"12\" step=\"1\" class=\"svelte-1n46o8q\"/> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></span></label>", 1), gu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), _u = /* @__PURE__ */ U("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), vu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>"), yu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), bu = /* @__PURE__ */ U("<input class=\"svelte-1n46o8q\"/>"), xu = /* @__PURE__ */ U("<span class=\"nav-line svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Su = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Cu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"50\" class=\"svelte-1n46o8q\"/></label>"), wu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <textarea rows=\"3\" spellcheck=\"false\" class=\"svelte-1n46o8q\"></textarea></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Tu = /* @__PURE__ */ U("<span class=\"nav-line svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span>"), Eu = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), Du = /* @__PURE__ */ U("<span class=\"nav-line svelte-1n46o8q\"><input class=\"tl-year svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <input class=\"svelte-1n46o8q\"/>", 1), Ou = /* @__PURE__ */ U("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), ku = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Au = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), ju = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></span> <span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Mu = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>"), Nu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"datetime-local\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Pu = /* @__PURE__ */ U("<button class=\"ghost svelte-1n46o8q\"> </button>"), Fu = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"audio/*\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Iu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), Lu = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), Ru = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> </label> <input class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), zu = /* @__PURE__ */ U("<input class=\"token-input svelte-1n46o8q\" maxlength=\"4\"/>"), Bu = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\"> </button></span>"), Vu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"toolbar-row svelte-1n46o8q\"><!> <!></span></label> <!>", 1), Hu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Uu = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost action svelte-1n46o8q\"> </button></span>"), Wu = /* @__PURE__ */ U("<button class=\"ghost action svelte-1n46o8q\"> </button>"), Gu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Ku = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), qu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"email\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"url\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Ju = /* @__PURE__ */ U("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label></div>"), Yu = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Xu = /* @__PURE__ */ U("<p> </p>"), Zu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), Qu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" class=\"svelte-1n46o8q\"/></label>"), $u = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label>"), ed = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), td = /* @__PURE__ */ U("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), nd = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), rd = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!>", 1), id = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), ad = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), od = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), sd = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"24\" max=\"64\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), cd = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), ld = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), ud = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), dd = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), fd = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), pd = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"60\" class=\"svelte-1n46o8q\"/></label>"), md = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), hd = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label>"), gd = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), _d = /* @__PURE__ */ U("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" min=\"1\" max=\"100\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), vd = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label>", 1), yd = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"400\" class=\"svelte-1n46o8q\"/></label>"), bd = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!>", 1), xd = /* @__PURE__ */ U("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Sd = /* @__PURE__ */ U("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), Cd = /* @__PURE__ */ U("<!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details>", 1), wd = /* @__PURE__ */ U("<div class=\"props-tabs svelte-1n46o8q\"><span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div> <!>", 1), Td = /* @__PURE__ */ U("<button class=\"chrome-restore svelte-1n46o8q\"><!> </button>"), Ed = /* @__PURE__ */ U("<button><!> </button>"), Dd = /* @__PURE__ */ U("<div class=\"tool-pop svelte-1n46o8q\"></div>"), Od = /* @__PURE__ */ U("<span class=\"toolmenu svelte-1n46o8q\"><button><!><!></button> <!></span>"), kd = /* @__PURE__ */ U("<button></button>"), Ad = /* @__PURE__ */ U("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"viewswitch toolgrp svelte-1n46o8q\"></span>", 1), jd = /* @__PURE__ */ U("<div class=\"tool-pop svelte-1n46o8q\"><div class=\"tool-pop-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button></div> <button><!> </button></div>"), Md = /* @__PURE__ */ U("<span class=\"toolmenu svelte-1n46o8q\"><button><span class=\"zoom-cap svelte-1n46o8q\"> </span><!></button> <!></span>"), Nd = /* @__PURE__ */ U("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"zoomswitch toolgrp svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button> <button></button></span>", 1), Pd = /* @__PURE__ */ U("<div class=\"tool-pop svelte-1n46o8q\"><button><!> </button> <button><!> </button></div>"), Fd = /* @__PURE__ */ U("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"toolgrp svelte-1n46o8q\"><button></button> <button></button></span>", 1), Id = /* @__PURE__ */ U("<button class=\"ghost page-btn svelte-1n46o8q\"> </button> <span class=\"toolset svelte-1n46o8q\"><!> <!> <!></span>", 1), Ld = /* @__PURE__ */ U("<button class=\"badge attention svelte-1n46o8q\"><!> <span class=\"btn-label svelte-1n46o8q\"> </span> <span class=\"badge-mini svelte-1n46o8q\"> </span></button>"), Rd = /* @__PURE__ */ U("<button class=\"discard-confirm svelte-1n46o8q\"><!> </button>"), zd = /* @__PURE__ */ U("<span class=\"draft-cluster svelte-1n46o8q\"><span class=\"chip draft-chip svelte-1n46o8q\"><span class=\"chip-full svelte-1n46o8q\" aria-hidden=\"true\"> </span> <span class=\"chip-mini svelte-1n46o8q\" aria-hidden=\"true\">!</span></span>  <span class=\"discard-wrap svelte-1n46o8q\"><button><!><span class=\"discard-label svelte-1n46o8q\"> </span></button> <!></span></span>"), Bd = /* @__PURE__ */ U("<!> <span class=\"btn-label svelte-1n46o8q\"> </span>", 1), Vd = /* @__PURE__ */ U("<span class=\"who svelte-1n46o8q\"><!> </span>"), Hd = /* @__PURE__ */ U("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\"> </a>"), Ud = /* @__PURE__ */ U("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\"><!> <span class=\"btn-label svelte-1n46o8q\"> </span></a> <button class=\"primary svelte-1n46o8q\"> </button>", 1), Wd = /* @__PURE__ */ U("<button> </button>"), Gd = /* @__PURE__ */ U("<span class=\"rail-group svelte-1n46o8q\"> </span> <!>", 1), Kd = /* @__PURE__ */ U("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" step=\"10\"/> <span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" step=\"10\" placeholder=\"0\"/></div>"), qd = /* @__PURE__ */ U("<p class=\"mini-label svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input type=\"text\" spellcheck=\"false\" class=\"svelte-1n46o8q\"/></label>", 1), Jd = /* @__PURE__ */ U("<div class=\"settings-pop svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <p class=\"mini-label svelte-1n46o8q\"> </p> <div class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></div> <!> <!></div>"), Yd = /* @__PURE__ */ U("<button type=\"button\"></button>"), Xd = /* @__PURE__ */ U("<span class=\"page-path svelte-1n46o8q\">/</span>"), Zd = /* @__PURE__ */ U("<input class=\"page-slug svelte-1n46o8q\"/>"), Qd = /* @__PURE__ */ U("<span class=\"seo-warn svelte-1n46o8q\"></span>"), $d = /* @__PURE__ */ U("<button class=\"ghost danger svelte-1n46o8q\"><!> </button>"), ef = /* @__PURE__ */ U("<div class=\"page-menu svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"><!> </button> <!></div>"), tf = /* @__PURE__ */ U("<div><input class=\"page-title svelte-1n46o8q\"/> <!> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <span class=\"page-menu-wrap svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <!></span></span></div>"), nf = /* @__PURE__ */ U("<img class=\"site-icon-preview svelte-1n46o8q\"/>"), rf = /* @__PURE__ */ U("<div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button></div>"), af = /* @__PURE__ */ U("<div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button> <button class=\"page-template-del svelte-1n46o8q\"></button></div>"), of = /* @__PURE__ */ U("<span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-template-grid svelte-1n46o8q\"></div>", 1), sf = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <textarea rows=\"2\" class=\"svelte-1n46o8q\"></textarea></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <textarea rows=\"2\" class=\"svelte-1n46o8q\"></textarea></label> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-template-grid svelte-1n46o8q\"><div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button></div> <!></div> <!></div>"), cf = /* @__PURE__ */ U("<input class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\"/> <button><b> </b></button> <button><i> </i></button></span>", 1), lf = /* @__PURE__ */ U("<img alt=\"\" class=\"svelte-1n46o8q\"/>"), uf = /* @__PURE__ */ U("<span class=\"logo-file svelte-1n46o8q\"> </span>"), df = /* @__PURE__ */ U("<div class=\"logo-pick svelte-1n46o8q\"><span class=\"logo-thumb svelte-1n46o8q\"><!></span> <span class=\"logo-pick-col svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div> <div class=\"ctl-triple svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\"/></div> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\"/></div></div>", 1), ff = /* @__PURE__ */ U("<button type=\"button\"><!><span class=\"svelte-1n46o8q\"> </span></button>"), pf = /* @__PURE__ */ U("<!> <!>", 1), mf = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><span class=\"mini-label tb-grow svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" placeholder=\"1100\"/></span>"), hf = /* @__PURE__ */ U("<!> <!> <span class=\"toolbar-row svelte-1n46o8q\"><span class=\"mini-label tb-grow svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></span>", 1), gf = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), _f = /* @__PURE__ */ U("<!> <span class=\"toolbar-row svelte-1n46o8q\"><span class=\"mini-label tb-grow svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></span>", 1), vf = /* @__PURE__ */ U("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div>"), yf = /* @__PURE__ */ U("<div class=\"ctl-pair svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div></div>"), bf = /* @__PURE__ */ U("<span class=\"toolbar-row ctl-end svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"1\" max=\"8\"/> <span class=\"mini-label svelte-1n46o8q\"> </span> <!></span>"), xf = /* @__PURE__ */ U("<div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-5 svelte-1n46o8q\" role=\"group\"></div></div> <!>", 1), Sf = /* @__PURE__ */ U("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"30\" max=\"80\" step=\"5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0\" max=\"400\" step=\"10\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0\" max=\"1200\" step=\"20\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <!>", 1), Cf = /* @__PURE__ */ U("<div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), wf = /* @__PURE__ */ U("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label>"), Tf = /* @__PURE__ */ U("<div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div>"), Ef = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <!> <!> <!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <!> <input type=\"range\" min=\"0\" max=\"100\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Df = /* @__PURE__ */ U("<button type=\"button\"><span> </span><span class=\"svelte-1n46o8q\"> </span></button>"), Of = /* @__PURE__ */ U("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), kf = /* @__PURE__ */ U("<div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div>"), Af = /* @__PURE__ */ U("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"text\" class=\"field-filled svelte-1n46o8q\" placeholder=\"https://\"/></label>"), jf = /* @__PURE__ */ U("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"text\" class=\"field-filled svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Mf = /* @__PURE__ */ U("<div aria-hidden=\"true\"><span class=\"nav-grip svelte-1n46o8q\"></span> <div class=\"nav-item-main svelte-1n46o8q\"><span class=\"nav-item-name ghost-name svelte-1n46o8q\"> </span> <span class=\"ghost-target svelte-1n46o8q\"> </span></div></div>"), Nf = /* @__PURE__ */ U("<input class=\"nav-item-href svelte-1n46o8q\"/>"), Pf = /* @__PURE__ */ U("<span class=\"nav-item-sub svelte-1n46o8q\"></span>"), Ff = /* @__PURE__ */ U("<!> <div><span class=\"nav-grip svelte-1n46o8q\" draggable=\"true\"></span> <div class=\"nav-item-main svelte-1n46o8q\"><input class=\"nav-item-name svelte-1n46o8q\"/> <div class=\"nav-item-target svelte-1n46o8q\"><!> <!></div></div> <span class=\"nav-actions svelte-1n46o8q\"><button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button></span> <button class=\"ghost row-tool nav-more svelte-1n46o8q\"></button></div> <!>", 1), If = /* @__PURE__ */ U("<!> <div><span class=\"nav-grip svelte-1n46o8q\" draggable=\"true\"></span> <div class=\"nav-item-main svelte-1n46o8q\"><input class=\"nav-item-name svelte-1n46o8q\"/> <div class=\"nav-item-target svelte-1n46o8q\"><!> <!></div></div> <!> <span class=\"nav-actions svelte-1n46o8q\"><button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button></span> <button class=\"ghost row-tool nav-more svelte-1n46o8q\"></button></div> <!> <!> <!>", 1), Lf = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <!> <!> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-3 svelte-1n46o8q\" role=\"group\"></div></div> <!> <!> <!> <!> <!> <!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"seg cw-seg svelte-1n46o8q\"></div> <details class=\"sub-inset svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"sub-inset-body svelte-1n46o8q\"><!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div> <!></div></details></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-pair svelte-1n46o8q\"><!> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div></div> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <!></div> <!> <!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-5 svelte-1n46o8q\" role=\"group\"></div></div> <!> <div class=\"swatch-row svelte-1n46o8q\"><!> <div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div></div> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!></div></details></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div role=\"group\"></div></div> <!> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"4\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"nav-list svelte-1n46o8q\" role=\"list\"></div> <button class=\"ghost action svelte-1n46o8q\"> </button> <span class=\"toolbar-row svelte-1n46o8q\"><input class=\"tb-grow svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button></span></div></details></div>"), Rf = /* @__PURE__ */ U("<div class=\"cw-row svelte-1n46o8q\"><span class=\"mini-label cw-screen svelte-1n46o8q\"> </span> <span><span class=\"cw-fill svelte-1n46o8q\"></span></span> <span class=\"gridmenu-value cw-margin svelte-1n46o8q\"> </span></div>"), zf = /* @__PURE__ */ U("<div class=\"mini-label cw-binds svelte-1n46o8q\"> </div>"), Bf = /* @__PURE__ */ U("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), Vf = /* @__PURE__ */ U("<button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), Hf = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"sample cw-sample svelte-1n46o8q\"><!> <div class=\"cw-legend svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!></div> <div class=\"seg cw-seg svelte-1n46o8q\"></div> <!> <p class=\"mini-label svelte-1n46o8q\"> </p> <div class=\"seg cw-seg svelte-1n46o8q\"></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div>"), Uf = /* @__PURE__ */ U("<div class=\"mini-label tpv-cap svelte-1n46o8q\"> </div>"), Wf = /* @__PURE__ */ U("<div class=\"theme-pvw svelte-1n46o8q\"><!> <div class=\"tpv-demo svelte-1n46o8q\"><div class=\"tpv-h svelte-1n46o8q\"> </div> <div class=\"tpv-card svelte-1n46o8q\"> </div> <div class=\"tpv-row svelte-1n46o8q\"><span class=\"tpv-btn svelte-1n46o8q\"> </span><span class=\"tpv-lnk svelte-1n46o8q\"> </span></div></div></div>"), Gf = /* @__PURE__ */ U("<button type=\"button\"><span class=\"tp-band svelte-1n46o8q\"><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i></span> <small class=\"svelte-1n46o8q\"> </small></button>"), Kf = /* @__PURE__ */ U("<div class=\"ctl-row autorow svelte-1n46o8q\"><span class=\"autolbl svelte-1n46o8q\"> </span> <span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div>"), qf = /* @__PURE__ */ U("<span class=\"mini-label svelte-1n46o8q\"> </span>"), Jf = /* @__PURE__ */ U("<div class=\"palcol svelte-1n46o8q\"><!> <span class=\"palcap svelte-1n46o8q\"> </span> <b class=\"palhex svelte-1n46o8q\"> </b></div>"), Yf = /* @__PURE__ */ U("<div class=\"ctl-row palhead svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <button type=\"button\"> </button></div> <div></div>", 1), Xf = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"theme-presets svelte-1n46o8q\"></div> <p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <div class=\"ctl-row palhead svelte-1n46o8q\"><!> <button type=\"button\"> </button></div> <div class=\"palcells svelte-1n46o8q\"></div> <!> <div class=\"ctl-row palauto-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <button type=\"button\"> </button></div> <div class=\"theme-previews svelte-1n46o8q\"><!> <!></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <div class=\"sample typo-sample svelte-1n46o8q\"><div class=\"ts-h svelte-1n46o8q\"> </div> <div class=\"ts-b svelte-1n46o8q\"> </div></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"sample form-prev svelte-1n46o8q\"><span class=\"fp-btn svelte-1n46o8q\"> </span> <span class=\"fp-card svelte-1n46o8q\"> </span></div> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"24\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"40\" step=\"1\" class=\"svelte-1n46o8q\"/></div></details></div>"), Zf = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label>"), Qf = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label>"), $f = /* @__PURE__ */ U("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), ep = /* @__PURE__ */ U("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <!> <!>", 1), tp = /* @__PURE__ */ U("<div><input type=\"text\" class=\"svelte-1n46o8q\"/> <!></div>"), np = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), rp = /* @__PURE__ */ U("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), ip = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), ap = /* @__PURE__ */ U("<button><span class=\"rs-sample svelte-1n46o8q\"><i class=\"rs-line svelte-1n46o8q\"></i> <i class=\"rs-chip svelte-1n46o8q\"></i> <i class=\"rs-dot svelte-1n46o8q\"></i></span> <span class=\"rs-name svelte-1n46o8q\"> </span></button>"), op = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"1000\" step=\"10\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), sp = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <!>", 1), cp = /* @__PURE__ */ U("<p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"token-input svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"rs-grid svelte-1n46o8q\"></div> <label class=\"svelte-1n46o8q\"> <span class=\"row-tools svelte-1n46o8q\"><span class=\"gridmenu-value svelte-1n46o8q\"> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label>", 1), lp = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), up = /* @__PURE__ */ U("<button class=\"footer-tp svelte-1n46o8q\"><span class=\"footer-tp-thumb svelte-1n46o8q\"></span> <span class=\"footer-tp-name svelte-1n46o8q\"> </span></button>"), dp = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"16\" max=\"160\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), fp = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!>", 1), pp = /* @__PURE__ */ U("<div class=\"nav-row\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></div> <!>", 1), mp = /* @__PURE__ */ U("<div class=\"nav-row\"><span class=\"nav-line svelte-1n46o8q\"><span class=\"footer-soc-preview svelte-1n46o8q\" aria-hidden=\"true\"></span> <!></span> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <input class=\"nav-target svelte-1n46o8q\"/></div>"), hp = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), gp = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), _p = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"footer-tpick svelte-1n46o8q\"></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"svelte-1n46o8q\"> <!></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details></div>"), vp = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"date\" class=\"svelte-1n46o8q\"/></label>"), yp = /* @__PURE__ */ U("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), bp = /* @__PURE__ */ U("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/>"), xp = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span>"), Sp = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" step=\"0.01\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" step=\"0.01\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), Cp = /* @__PURE__ */ U("<details class=\"group collection-entry svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <textarea rows=\"3\" class=\"svelte-1n46o8q\"></textarea> <!> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!></div></details>"), wp = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\".csv,text/csv\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Tp = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button></div>"), Ep = /* @__PURE__ */ U("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), Dp = /* @__PURE__ */ U("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), Op = /* @__PURE__ */ U("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <!></div>"), kp = /* @__PURE__ */ U("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span></div>"), Ap = /* @__PURE__ */ U("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), jp = /* @__PURE__ */ U("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <!>", 1), Mp = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <!> <!></div>"), Np = /* @__PURE__ */ U("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), Pp = /* @__PURE__ */ U("<button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), Fp = /* @__PURE__ */ U("<p class=\"panel-hint svelte-1n46o8q\"> </p> <button class=\"ghost svelte-1n46o8q\"> </button>", 1), Ip = /* @__PURE__ */ U("<span class=\"update-arrow svelte-1n46o8q\"></span> <span class=\"badge svelte-1n46o8q\"> </span>", 1), Lp = /* @__PURE__ */ U("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><p class=\"update-notes svelte-1n46o8q\"> </p></div></details>"), Rp = /* @__PURE__ */ U("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"><span class=\"update-warn svelte-1n46o8q\"></span> </summary> <div class=\"group-items svelte-1n46o8q\"><pre class=\"update-headers svelte-1n46o8q\"> </pre></div></details>"), zp = /* @__PURE__ */ U("<span class=\"chip svelte-1n46o8q\"> </span>"), Bp = /* @__PURE__ */ U("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <span class=\"update-warn svelte-1n46o8q\"></span></span></div>"), Vp = /* @__PURE__ */ U("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <!></div>"), Hp = /* @__PURE__ */ U("<span class=\"update-warn svelte-1n46o8q\"></span>"), Up = /* @__PURE__ */ U("<div class=\"update-row svelte-1n46o8q\"><span> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <!> <input type=\"checkbox\" class=\"svelte-1n46o8q\"/></span></div>"), Wp = /* @__PURE__ */ U("<div class=\"ctl-row update-opt-head svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!>", 1), Gp = /* @__PURE__ */ U("<p class=\"update-summary svelte-1n46o8q\"> </p> <!> <!> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details> <!> <button class=\"primary update-run svelte-1n46o8q\"> </button>", 1), Kp = /* @__PURE__ */ U("<div class=\"update-versions svelte-1n46o8q\"><span class=\"update-from svelte-1n46o8q\"> </span> <!></div> <!>", 1), qp = /* @__PURE__ */ U("<aside><div class=\"panel-head svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></div> <!></aside>"), Jp = /* @__PURE__ */ U("<div class=\"workspace svelte-1n46o8q\"><nav><!> <span class=\"rail-settings svelte-1n46o8q\"><span class=\"rail-brand svelte-1n46o8q\" title=\"Urd\"><svg class=\"brand-mark svelte-1n46o8q\" viewBox=\"10.3 8.3 19.4 25.4\" aria-hidden=\"true\"><path d=\"M12 32V10l16 6.5V32\" fill=\"none\" stroke=\"var(--urd-brand)\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg> <span class=\"brand-word svelte-1n46o8q\">Urd</span></span> <button></button> <!></span></nav> <!> <div><div class=\"stage svelte-1n46o8q\"><iframe class=\"svelte-1n46o8q\"></iframe></div></div></div>"), Yp = /* @__PURE__ */ U("<p class=\"loading svelte-1n46o8q\"> </p>"), Xp = /* @__PURE__ */ U("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), Zp = /* @__PURE__ */ U("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), Qp = /* @__PURE__ */ U("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <p class=\"panel-hint svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <p class=\"panel-hint svelte-1n46o8q\"> </p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), $p = /* @__PURE__ */ U("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\">×</button></div>"), em = /* @__PURE__ */ U("<div class=\"block-menu svelte-1n46o8q\"><header class=\"block-menu-head svelte-1n46o8q\"><span> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></header> <div class=\"panel-body block-menu-body svelte-1n46o8q\"><!></div></div>"), tm = /* @__PURE__ */ U("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><!> <!></span> <span class=\"topbar-group topbar-draft svelte-1n46o8q\"><!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!> <!></div>   <!>", 1);
function nm(e, t) {
	Je(t, !0);
	let n = (e, t = f, n = f) => {
		var r = du(), i = L(r);
		Jr(i, 17, n, Wr, (e, r, i) => {
			var a = uu(), o = I(a), s = I(o);
			{
				let e = /* @__PURE__ */ A(() => Z("tip.bg.changeType")), n = /* @__PURE__ */ A(() => m.map(([e, t]) => [e, t.labelKey ? Z(t.labelKey) : t.label]));
				Q(s, {
					get value() {
						return V(r).type;
					},
					get title() {
						return V(e);
					},
					get options() {
						return V(n);
					},
					onchange: (e) => wr(t(), i, e)
				});
			}
			var c = z(s, 2), l = I(c);
			l.disabled = i === 0, q(l, () => _.up, !0), D(l);
			var u = z(l, 2);
			q(u, () => _.down, !0), D(u);
			var d = z(u, 2);
			q(d, () => _.cross, !0), D(d), D(c), D(o);
			var f = z(o, 2), p = (e) => {
				var n = Yl(), a = L(n), o = I(a), s = z(o);
				{
					let e = /* @__PURE__ */ A(Hr), n = /* @__PURE__ */ A(() => Z("tip.bg.layerColor"));
					ha(s, {
						get value() {
							return V(r).props.value;
						},
						get tokens() {
							return V(e);
						},
						get label() {
							return V(n);
						},
						onchange: (e) => ir(t(), i, "value", e)
					});
				}
				D(a);
				var c = z(a, 2), l = I(c), u = R(z(l));
				D(c);
				var d = z(c, 2);
				J(d), B((e, t, n) => {
					G(o, `${e ?? ""} `), G(l, `${t ?? ""} `), G(u, `${n ?? ""}%`), Y(d, V(r).props.opacity ?? 1);
				}, [
					() => Z("lbl.color"),
					() => Z("lbl.strength"),
					() => Math.round((V(r).props.opacity ?? 1) * 100)
				]), H("input", d, (e) => ir(t(), i, "opacity", Number(e.target.value))), W(e, n);
			}, h = (e) => {
				let n = /* @__PURE__ */ A(() => ur(V(r))), a = /* @__PURE__ */ A(() => V(n).stops.reduce((e, t) => e + Math.max(0, Number(t.share) || 0), 0));
				var o = eu(), s = L(o), c = I(s), l = z(c);
				{
					let e = /* @__PURE__ */ A(() => V(n).kind ?? "linear"), r = /* @__PURE__ */ A(() => [["linear", Z("opt.grad.linear")], ["radial", Z("opt.grad.radial")]]);
					Q(l, {
						get value() {
							return V(e);
						},
						get options() {
							return V(r);
						},
						onchange: (e) => hr(t(), i, e)
					});
				}
				D(s);
				var u = z(s, 2);
				Jr(u, 17, () => V(n).stops, Wr, (e, r, o) => {
					var s = Zl();
					let c;
					var l = I(s), u = z(l, 2);
					{
						let e = /* @__PURE__ */ A(Hr), n = /* @__PURE__ */ A(() => Z("tip.bg.stopColor"));
						ha(u, {
							get value() {
								return V(r).color;
							},
							get tokens() {
								return V(e);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => gr(t(), i, o, { color: e })
						});
					}
					var d = z(u, 2);
					J(d);
					var f = z(d, 2), p = R(f), m = z(f, 2), h = (e) => {
						var n = Xl();
						q(n, () => _.cross, !0), D(n), B((e) => X(n, "title", e), [() => Z("tip.bg.removeStop")]), H("click", n, () => vr(t(), i, o)), W(e, n);
					};
					K(m, (e) => {
						V(n).stops.length > 2 && e(h);
					}), D(s), B((e, t, a) => {
						c = hi(s, 1, "nav-line grad-stop svelte-1n46o8q", null, c, {
							dragging: V(br)?.layer === i && V(br).from === o,
							"drop-above": V(br)?.layer === i && V(br).insert === o,
							"drop-below": V(br)?.layer === i && V(br).insert === V(n).stops.length && o === V(n).stops.length - 1
						}), X(l, "title", e), Y(d, V(r).share ?? 50), X(d, "title", t), G(p, `${a ?? ""}%`);
					}, [
						() => Z("tip.bg.dragStop"),
						() => Z("tip.bg.stopShare"),
						() => V(a) > 0 ? Math.round(Math.max(0, Number(V(r).share) || 0) / V(a) * 100) : Math.round(100 / V(n).stops.length)
					]), H("pointerdown", l, (e) => Sr(t(), e, i, o)), H("input", d, (e) => gr(t(), i, o, { share: Number(e.target.value) })), W(e, s);
				});
				var d = z(u, 2), f = R(d, !0), p = z(d, 2), m = (e) => {
					var r = Ql(), a = L(r), o = I(a), s = R(z(o));
					D(a);
					var c = z(a, 2);
					J(c);
					var l = z(c, 2), u = I(l), d = R(z(u));
					D(l);
					var f = z(l, 2);
					J(f), B((e, t, r, i) => {
						G(o, `${e ?? ""} `), G(s, `${t ?? ""}%`), Y(c, V(n).x ?? .5), G(u, `${r ?? ""} `), G(d, `${i ?? ""}%`), Y(f, V(n).y ?? .5);
					}, [
						() => Z("lbl.centerX"),
						() => Math.round((V(n).x ?? .5) * 100),
						() => Z("lbl.centerY"),
						() => Math.round((V(n).y ?? .5) * 100)
					]), H("input", c, (e) => pr(t(), i, "x", Number(e.target.value))), H("input", f, (e) => pr(t(), i, "y", Number(e.target.value))), W(e, r);
				}, h = (e) => {
					var r = $l(), a = L(r), o = I(a), s = R(z(o));
					D(a);
					var c = z(a, 2);
					J(c), B((e) => {
						G(o, `${e ?? ""} `), G(s, `${V(n).angle ?? ""}°`), Y(c, V(n).angle);
					}, [() => Z("lbl.angle")]), H("input", c, (e) => pr(t(), i, "angle", Number(e.target.value))), W(e, r);
				};
				K(p, (e) => {
					(V(n).kind ?? "linear") === "radial" ? e(m) : e(h, -1);
				});
				var g = z(p, 2), v = I(g), y = R(z(v));
				D(g);
				var b = z(g, 2);
				J(b);
				var x = z(b, 2), S = I(x), C = z(S);
				{
					let e = /* @__PURE__ */ A(() => V(n).animation ?? "none");
					Q(C, {
						get value() {
							return V(e);
						},
						get options() {
							return mr[(V(n).kind ?? "linear") === "radial" ? "radial" : "linear"];
						},
						onchange: (e) => pr(t(), i, "animation", e)
					});
				}
				D(x), B((e, t, r, i, a, o, s) => {
					G(c, `${e ?? ""} `), X(d, "title", t), G(f, r), G(v, `${i ?? ""} `), G(y, `${a ?? ""}%`), Y(b, V(n).opacity ?? 1), X(x, "title", o), G(S, `${s ?? ""} `);
				}, [
					() => Z("blocks.shape"),
					() => Z("tip.bg.addStop"),
					() => Z("ui.addStop"),
					() => Z("lbl.strength"),
					() => Math.round((V(n).opacity ?? 1) * 100),
					() => Z("tip.bg.motion"),
					() => Z("lbl.motion")
				]), H("click", d, () => _r(t(), i)), H("input", b, (e) => pr(t(), i, "opacity", Number(e.target.value))), W(e, o);
			}, g = (e) => {
				var n = tu(), a = L(n), o = I(a), s = z(o);
				{
					let e = /* @__PURE__ */ A(Hr), n = /* @__PURE__ */ A(() => Z("tip.bg.glowColor"));
					ha(s, {
						get value() {
							return V(r).props.color;
						},
						get tokens() {
							return V(e);
						},
						get label() {
							return V(n);
						},
						onchange: (e) => ir(t(), i, "color", e)
					});
				}
				D(a);
				var c = z(a, 2), l = I(c), u = R(z(l));
				D(c);
				var d = z(c, 2);
				J(d);
				var f = z(d, 2), p = I(f), m = R(z(p));
				D(f);
				var h = z(f, 2);
				J(h);
				var g = z(h, 2), _ = I(g), v = R(z(_));
				D(g);
				var y = z(g, 2);
				J(y);
				var b = z(y, 2), x = I(b), S = R(z(x));
				D(b);
				var C = z(b, 2);
				J(C), B((e, t, n, i, a, s, c, f, g) => {
					G(o, `${e ?? ""} `), G(l, `${t ?? ""} `), G(u, `${n ?? ""}%`), Y(d, V(r).props.x), G(p, `${i ?? ""} `), G(m, `${a ?? ""}%`), Y(h, V(r).props.y), G(_, `${s ?? ""} `), G(v, `${c ?? ""}%`), Y(y, V(r).props.radius), G(x, `${f ?? ""} `), G(S, `${g ?? ""}%`), Y(C, V(r).props.opacity);
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
				]), H("input", d, (e) => ir(t(), i, "x", Number(e.target.value))), H("input", h, (e) => ir(t(), i, "y", Number(e.target.value))), H("input", y, (e) => ir(t(), i, "radius", Number(e.target.value))), H("input", C, (e) => ir(t(), i, "opacity", Number(e.target.value))), W(e, n);
			}, v = (e) => {
				var n = nu(), a = L(n), o = I(a), s = R(z(o));
				D(a);
				var c = z(a, 2);
				J(c), B((e, t) => {
					G(o, `${e ?? ""} `), G(s, `${t ?? ""}%`), Y(c, V(r).props.opacity);
				}, [() => Z("lbl.strength"), () => Math.round(V(r).props.opacity * 100)]), H("input", c, (e) => ir(t(), i, "opacity", Number(e.target.value))), W(e, n);
			}, y = (e) => {
				let n = /* @__PURE__ */ A(() => V(r).props.fit === "tile" || V(r).props.fit === "repeat");
				var a = au(), o = L(a), s = I(o), c = z(s);
				D(o);
				var l = z(o, 2), u = I(l), d = z(u);
				{
					let e = /* @__PURE__ */ A(() => V(n) ? "tile" : "plain"), r = /* @__PURE__ */ A(() => [["plain", Z("opt.img.plain")], ["tile", Z("opt.img.tile")]]);
					Q(d, {
						get value() {
							return V(e);
						},
						get options() {
							return V(r);
						},
						onchange: (e) => ir(t(), i, "fit", e)
					});
				}
				D(l);
				var f = z(l, 2), p = R(f, !0), m = z(f, 2), h = I(m), g = z(h, 2);
				J(g);
				var _ = z(g, 4);
				D(m);
				var v = z(m, 2), y = (e) => {
					var n = ru(), a = L(n), o = I(a), s = R(o, !0), c = z(o, 2), l = R(c, !0);
					D(a);
					var u = z(a, 2), d = R(u, !0), f = z(u, 2), p = z(f, 2), m = I(p), h = R(z(m));
					D(p);
					var g = z(p, 2);
					J(g);
					var _ = z(g, 2), v = I(_), y = R(z(v));
					D(_);
					var b = z(_, 2);
					J(b), B((e, t, n, i, a, p, _, x, S, C, w, T) => {
						X(o, "title", e), G(s, t), X(c, "title", n), G(l, i), X(u, "title", a), G(d, p), _i(f, `--fx:${_ ?? ""}%; --fy:${x ?? ""}%`), G(m, `${S ?? ""} `), G(h, `${C ?? ""}%`), Y(g, V(r).props.x ?? .5), G(v, `${w ?? ""} `), G(y, `${T ?? ""}%`), Y(b, V(r).props.y ?? .5);
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
					]), H("click", o, () => lr(t(), i, V(r), "cover")), H("click", c, () => lr(t(), i, V(r), "contain")), H("pointerdown", f, (e) => ar(e, t(), i, "xy")), H("input", g, (e) => ir(t(), i, "x", Number(e.target.value))), H("input", b, (e) => ir(t(), i, "y", Number(e.target.value))), W(e, n);
				};
				K(v, (e) => {
					V(n) || e(y);
				});
				var b = z(v, 2), x = I(b), S = R(z(x));
				D(b);
				var C = z(b, 2);
				J(C);
				var w = z(C, 2), T = I(w), ee = R(z(T));
				D(w);
				var te = z(w, 2);
				J(te);
				var ne = z(te, 2), E = I(ne);
				J(E);
				var re = z(E);
				D(ne);
				var ie = z(ne, 2), ae = (e) => {
					var n = iu(), a = L(n), o = I(a), s = R(z(o));
					D(a);
					var c = z(a, 2);
					J(c);
					var l = z(c, 2), u = I(l), d = z(u);
					{
						let e = /* @__PURE__ */ A(() => V(r).props.bleed ?? "none"), n = /* @__PURE__ */ A(() => [
							["none", Z("common.none")],
							["up", Z("opt.bleed.up")],
							["down", Z("opt.bleed.down")],
							["both", Z("opt.brand.both")]
						]);
						Q(d, {
							get value() {
								return V(e);
							},
							get options() {
								return V(n);
							},
							onchange: (e) => ir(t(), i, "bleed", e)
						});
					}
					D(l), B((e, t, n, i) => {
						G(o, `${e ?? ""} `), G(s, `${t ?? ""}%`), Y(c, V(r).props.parallax ?? .3), X(l, "title", n), G(u, `${i ?? ""} `);
					}, [
						() => Z("lbl.parallaxStrength"),
						() => Math.round((V(r).props.parallax ?? 0) * 100),
						() => Z("tip.bg.bleed"),
						() => Z("lbl.bleed")
					]), H("input", c, (e) => ir(t(), i, "parallax", Number(e.target.value))), W(e, n);
				};
				K(ie, (e) => {
					(V(r).props.parallax ?? 0) > 0 && e(ae);
				}), B((e, t, n, i, a, c, d, m, v, y, b, w, ie, ae) => {
					X(o, "title", e), G(s, `${t ?? ""} `), X(l, "title", n), G(u, `${i ?? ""} `), X(f, "title", a), G(p, c), X(h, "title", d), Y(g, m), X(_, "title", v), G(x, `${y ?? ""} `), G(S, `${V(r).props.blur ?? 0 ?? ""} px`), Y(C, V(r).props.blur ?? 0), G(T, `${b ?? ""} `), G(ee, `${w ?? ""}%`), Y(te, V(r).props.opacity ?? 1), X(ne, "title", ie), Si(E, (V(r).props.parallax ?? 0) > 0), G(re, ` ${ae ?? ""}`);
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
				]), H("change", c, (e) => Or(t(), i, e)), H("click", h, () => sr(t(), i, V(r).props.size ?? 1, -.05)), H("change", g, (e) => cr(t(), i, e.target.value)), H("click", _, () => sr(t(), i, V(r).props.size ?? 1, .05)), H("input", C, (e) => ir(t(), i, "blur", Number(e.target.value))), H("input", te, (e) => ir(t(), i, "opacity", Number(e.target.value))), H("change", E, (e) => ir(t(), i, "parallax", e.target.checked ? .3 : 0)), W(e, a);
			}, b = (e) => {
				var n = su(), a = L(n), o = I(a), s = z(o);
				D(a);
				var c = z(a, 2);
				Jr(c, 17, () => V(r).props.images ?? [], Wr, (e, n, a) => {
					var o = ou(), s = L(o), c = I(s), l = z(c, 2), u = I(l);
					u.disabled = a === 0, q(u, () => _.up, !0), D(u);
					var d = z(u, 2);
					q(d, () => _.down, !0), D(d);
					var f = z(d, 2);
					q(f, () => _.cross, !0), D(f), D(l), D(s);
					var p = z(s, 2), m = I(p), h = R(z(m));
					D(p);
					var g = z(p, 2);
					J(g);
					var v = z(g, 2), y = I(v), b = R(z(y));
					D(v);
					var x = z(v, 2);
					J(x), B((e, t, i, o, s) => {
						X(c, "src", V(n).src), d.disabled = a === V(r).props.images.length - 1, X(f, "title", e), G(m, `${t ?? ""} `), G(h, `${i ?? ""}%`), Y(g, V(n).x ?? .5), G(y, `${o ?? ""} `), G(b, `${s ?? ""}%`), Y(x, V(n).y ?? .5);
					}, [
						() => Z("tip.removeImage"),
						() => Z("lbl.focusX"),
						() => Math.round((V(n).x ?? .5) * 100),
						() => Z("lbl.focusY"),
						() => Math.round((V(n).y ?? .5) * 100)
					]), H("click", u, () => U(t(), i, a, -1)), H("click", d, () => U(t(), i, a, 1)), H("click", f, () => Mr(t(), i, a)), H("input", g, (e) => Pr(t(), i, a, "x", Number(e.target.value))), H("input", x, (e) => Pr(t(), i, a, "y", Number(e.target.value))), W(e, o);
				});
				var l = z(c, 2), u = I(l), d = z(u);
				{
					let e = /* @__PURE__ */ A(() => V(r).props.fit ?? "cover"), n = /* @__PURE__ */ A(() => [["cover", Z("opt.fit.cover")], ["contain", Z("opt.fit.contain")]]);
					Q(d, {
						get value() {
							return V(e);
						},
						get options() {
							return V(n);
						},
						onchange: (e) => ir(t(), i, "fit", e)
					});
				}
				D(l);
				var f = z(l, 2), p = I(f), m = z(p);
				J(m), D(f);
				var h = z(f, 2), g = I(h), v = R(z(g));
				D(h);
				var y = z(h, 2);
				J(y);
				var b = z(y, 2), x = I(b), S = R(z(x));
				D(b);
				var C = z(b, 2);
				J(C);
				var w = z(C, 2), T = I(w), ee = R(z(T));
				D(w);
				var te = z(w, 2);
				J(te);
				var ne = R(z(te, 2), !0);
				B((e, t, n, i, s, c, l, d, h, _, b) => {
					X(a, "title", e), G(o, `${t ?? ""} `), G(u, `${n ?? ""} `), X(f, "title", i), G(p, `${s ?? ""} `), Y(m, V(r).props.interval ?? 6), G(g, `${c ?? ""} `), G(v, `${l ?? ""} s`), Y(y, V(r).props.fade ?? 1.5), G(x, `${d ?? ""} `), G(S, `${V(r).props.blur ?? 0 ?? ""} px`), Y(C, V(r).props.blur ?? 0), G(T, `${h ?? ""} `), G(ee, `${_ ?? ""}%`), Y(te, V(r).props.opacity ?? 1), G(ne, b);
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
				]), H("change", s, (e) => jr(t(), i, e)), H("change", m, (e) => ir(t(), i, "interval", Number(e.target.value))), H("input", y, (e) => ir(t(), i, "fade", Number(e.target.value))), H("input", C, (e) => ir(t(), i, "blur", Number(e.target.value))), H("input", te, (e) => ir(t(), i, "opacity", Number(e.target.value))), W(e, n);
			}, x = (e) => {
				var n = lu(), a = L(n), o = I(a), s = z(o);
				D(a);
				var c = z(a, 2), l = I(c), u = z(l);
				D(c);
				var d = z(c, 2), f = I(d), p = z(f);
				{
					let e = /* @__PURE__ */ A(() => V(r).props.fit ?? "cover"), n = /* @__PURE__ */ A(() => [["cover", Z("opt.fit.cover")], ["contain", Z("opt.fit.contain")]]);
					Q(p, {
						get value() {
							return V(e);
						},
						get options() {
							return V(n);
						},
						onchange: (e) => ir(t(), i, "fit", e)
					});
				}
				D(d);
				var m = z(d, 2), h = I(m), g = R(z(h));
				D(m);
				var _ = z(m, 2);
				J(_);
				var v = z(_, 2), y = I(v), b = R(z(y));
				D(v);
				var x = z(v, 2);
				J(x);
				var S = z(x, 2), C = I(S), w = R(z(C));
				D(S);
				var T = z(S, 2);
				J(T);
				var ee = z(T, 2), te = I(ee);
				J(te);
				var ne = z(te);
				D(ee);
				var E = z(ee, 2), re = (e) => {
					var n = cu(), a = L(n), o = I(a), s = R(z(o));
					D(a);
					var c = z(a, 2);
					J(c), B((e, t) => {
						G(o, `${e ?? ""} `), G(s, `${t ?? ""}%`), Y(c, V(r).props.parallax ?? .3);
					}, [() => Z("lbl.parallaxStrength"), () => Math.round((V(r).props.parallax ?? 0) * 100)]), H("input", c, (e) => ir(t(), i, "parallax", Number(e.target.value))), W(e, n);
				};
				K(E, (e) => {
					(V(r).props.parallax ?? 0) > 0 && e(re);
				}), B((e, t, n, i, s, u, p, m, v, S, E, re, ie, ae) => {
					X(a, "title", e), G(o, `${t ?? ""} `), X(c, "title", n), G(l, `${i ?? ""} `), X(d, "title", s), G(f, `${u ?? ""} `), G(h, `${p ?? ""} `), G(g, `${m ?? ""}%`), Y(_, V(r).props.x ?? .5), G(y, `${v ?? ""} `), G(b, `${S ?? ""}%`), Y(x, V(r).props.y ?? .5), G(C, `${E ?? ""} `), G(w, `${re ?? ""}%`), Y(T, V(r).props.opacity ?? 1), X(ee, "title", ie), Si(te, (V(r).props.parallax ?? 0) > 0), G(ne, ` ${ae ?? ""}`);
				}, [
					() => Z("tip.bg.videoFile"),
					() => V(r).props.src ? Z("ui.changeVideo") : Z("ui.chooseVideo"),
					() => Z("tip.bg.poster"),
					() => V(r).props.poster ? Z("ui.changeImage") : Z("ui.choosePoster"),
					() => Z("tip.bg.fit"),
					() => Z("lbl.fit"),
					() => Z("lbl.horizontal"),
					() => Math.round((V(r).props.x ?? .5) * 100),
					() => Z("lbl.vertical"),
					() => Math.round((V(r).props.y ?? .5) * 100),
					() => Z("lbl.strength"),
					() => Math.round((V(r).props.opacity ?? 1) * 100),
					() => Z("tip.bg.parallax"),
					() => Z("lbl.parallax")
				]), H("change", s, (e) => kr(t(), i, e)), H("change", u, (e) => Ar(t(), i, e)), H("input", _, (e) => ir(t(), i, "x", Number(e.target.value))), H("input", x, (e) => ir(t(), i, "y", Number(e.target.value))), H("input", T, (e) => ir(t(), i, "opacity", Number(e.target.value))), H("change", te, (e) => ir(t(), i, "parallax", e.target.checked ? .3 : 0)), W(e, n);
			};
			K(f, (e) => {
				V(r).type === "color" ? e(p) : V(r).type === "gradient" ? e(h, 1) : V(r).type === "glow" ? e(g, 2) : V(r).type === "grain" ? e(v, 3) : V(r).type === "image" ? e(y, 4) : V(r).type === "slideshow" ? e(b, 5) : V(r).type === "video" && e(x, 6);
			}), D(a), B((e, t, r) => {
				X(l, "title", e), X(u, "title", t), u.disabled = i === n().length - 1, X(d, "title", r);
			}, [
				() => Z("hint.bg.order"),
				() => Z("hint.bg.order"),
				() => Z("tip.bg.removeLayer")
			]), H("click", l, () => rr(t(), i, -1)), H("click", u, () => rr(t(), i, 1)), H("click", d, () => nr(t(), i)), W(e, a);
		});
		var a = z(i, 2), o = I(a), s = z(o);
		{
			let e = /* @__PURE__ */ A(() => m.map(([e, t]) => [e, t.labelKey ? Z(t.labelKey) : t.label]));
			Q(s, {
				get value() {
					return V(er);
				},
				get options() {
					return V(e);
				},
				onchange: (e) => P(er, e, !0)
			});
		}
		D(a);
		var c = z(a, 2), l = R(c, !0);
		B((e, t) => {
			G(o, `${e ?? ""} `), G(l, t);
		}, [() => Z("lbl.newLayer"), () => Z("ui.addLayer")]), H("click", c, () => tr(t(), V(er))), W(e, r);
	}, r = (e, t = f, n = f) => {
		var r = Nr();
		Jr(L(r), 17, n, Wr, (e, r, i) => {
			var a = pu(), o = I(a);
			J(o);
			var s = z(o, 2), c = I(s);
			c.disabled = i === 0, q(c, () => _.up, !0), D(c);
			var l = z(c, 2);
			q(l, () => _.down, !0), D(l);
			var u = z(l, 2);
			q(u, () => _.cross, !0), D(u), D(s);
			var d = z(s, 2), f = I(d);
			{
				let e = /* @__PURE__ */ A(() => V(r).page ?? "__href"), n = /* @__PURE__ */ A(() => Z("tip.linkTarget")), a = /* @__PURE__ */ A(() => [...V(k).pages.map((e) => [e.id, e.title]), ["__href", Z("opt.linkHref")]]);
				Q(f, {
					get value() {
						return V(e);
					},
					get title() {
						return V(n);
					},
					get options() {
						return V(a);
					},
					onchange: (e) => jl(t(), i, e)
				});
			}
			D(d);
			var p = z(d, 2), m = (e) => {
				var n = fu();
				J(n), B((e, t) => {
					Y(n, V(r).href ?? ""), X(n, "placeholder", e), X(n, "title", t);
				}, [() => Z("ph.hrefAnchor"), () => Z("tip.hrefAnchor")]), H("change", n, (e) => Ml(t(), i, e.target.value)), W(e, n);
			};
			K(p, (e) => {
				V(r).page || e(m);
			}), D(a), B((e, t) => {
				Y(o, V(r).label), X(o, "title", e), l.disabled = i === n().length - 1, X(u, "title", t);
			}, [() => Z("tip.linkLabel"), () => Z("tip.removeLink")]), H("input", o, (e) => kl(t(), i, e.target.value)), H("click", c, () => Ol(t(), i, -1)), H("click", l, () => Ol(t(), i, 1)), H("click", u, () => Dl(t(), i)), W(e, a);
		}), W(e, r);
	}, i = (e) => {
		let t = /* @__PURE__ */ A(() => V(M).props.boxStyle ?? {});
		var n = gu(), r = L(n), i = I(r), a = z(i);
		{
			let e = /* @__PURE__ */ A(() => V(t).bg ?? ""), n = /* @__PURE__ */ A(Hr), r = /* @__PURE__ */ A(() => Z("tip.box.bg"));
			ha(a, {
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
				onchange: (e) => un({ bg: e || null })
			});
		}
		D(r);
		var o = z(r, 2), s = I(o), c = z(s);
		{
			let e = /* @__PURE__ */ A(() => V(t).shadow ?? ""), n = /* @__PURE__ */ A(() => [
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
				onchange: (e) => un({ shadow: e || null })
			});
		}
		D(o);
		var l = z(o, 2), u = (e) => {
			var n = mu(), r = I(n), i = z(r);
			{
				let e = /* @__PURE__ */ A(() => V(t).shadowColor ?? ""), n = /* @__PURE__ */ A(Hr), r = /* @__PURE__ */ A(() => Z("tip.box.shadowColor"));
				ha(i, {
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
					onchange: (e) => un({ shadowColor: e || null })
				});
			}
			D(n), B((e) => G(r, `${e ?? ""} `), [() => Z("lbl.shadowColor")]), W(e, n);
		};
		K(l, (e) => {
			V(t).shadow && e(u);
		});
		var d = z(l, 2), f = I(d), p = z(f);
		{
			let e = /* @__PURE__ */ A(() => V(t).border === "none" ? "none" : V(t).border ? "custom" : ""), n = /* @__PURE__ */ A(() => [
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
				onchange: (e) => un({ border: e === "custom" ? {
					color: "accent",
					width: 1
				} : e || null })
			});
		}
		D(d);
		var m = z(d, 2), h = (e) => {
			let n = /* @__PURE__ */ A(() => typeof V(t).border == "object" ? V(t).border : {
				color: "text",
				width: 1
			});
			var r = hu(), i = L(r), a = I(i), o = z(a);
			{
				let e = /* @__PURE__ */ A(Hr), t = /* @__PURE__ */ A(() => Z("tip.box.borderColor"));
				ha(o, {
					get value() {
						return V(n).color;
					},
					get tokens() {
						return V(e);
					},
					get label() {
						return V(t);
					},
					onchange: (e) => un({ border: {
						...V(n),
						color: e
					} })
				});
			}
			D(i);
			var s = z(i, 2), c = I(s), l = z(c), u = I(l), d = z(u, 2);
			J(d);
			var f = z(d, 2);
			D(l), D(s), B((e, t, r, i, o, s) => {
				G(a, `${e ?? ""} `), G(c, `${t ?? ""} `), X(u, "title", r), X(u, "aria-label", i), Y(d, V(n).width), X(f, "title", o), X(f, "aria-label", s);
			}, [
				() => Z("lbl.borderColor"),
				() => Z("lbl.thicknessPx"),
				() => Z("tip.thinner"),
				() => Z("tip.thinner"),
				() => Z("tip.thicker"),
				() => Z("tip.thicker")
			]), H("click", u, () => un({ border: {
				...V(n),
				width: Math.max(1, V(n).width - 1)
			} })), H("change", d, (e) => un({ border: {
				...V(n),
				width: Math.min(12, Math.max(1, Number(e.target.value) || 1))
			} })), H("click", f, () => un({ border: {
				...V(n),
				width: Math.min(12, V(n).width + 1)
			} })), W(e, r);
		};
		K(m, (e) => {
			V(t).border !== "none" && e(h);
		});
		var g = z(m, 2), _ = I(g);
		J(_);
		var v = z(_);
		D(g), B((e, t, n, r, a, o) => {
			G(i, `${e ?? ""} `), G(s, `${t ?? ""} `), G(f, `${n ?? ""} `), X(g, "title", r), Si(_, a), G(v, ` ${o ?? ""}`);
		}, [
			() => Z("lbl.blockColor"),
			() => Z("lbl.shadow"),
			() => Z("lbl.border"),
			() => Z("tip.box.glass"),
			() => !!V(t).glass,
			() => Z("lbl.glass")
		]), H("change", _, (e) => un({ glass: e.target.checked || null })), W(e, n);
	}, a = (e) => {
		var t = wd(), n = L(t), r = I(n), a = I(r);
		let o;
		var s = R(a, !0), c = z(a, 2);
		let l;
		var u = R(c, !0);
		D(r), D(n);
		var d = z(n, 2), f = (e) => {
			var t = Nr(), n = L(t), r = (e) => {
				var t = _u(), n = R(t, !0);
				B((e) => G(n, e), [() => Z("hint.textInline")]), W(e, t);
			}, i = (e) => {
				var t = Su(), n = L(t), r = I(n), i = z(r);
				{
					let e = /* @__PURE__ */ A(() => V(M).props.mode ?? "mailto"), t = /* @__PURE__ */ A(() => [["mailto", Z("form.modeMailto")], ["endpoint", Z("form.modeEndpoint")]]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => F("mode", e)
					});
				}
				D(n);
				var a = z(n, 2), o = (e) => {
					var t = vu(), n = I(t), r = z(n);
					J(r), D(t), B((e, i, a) => {
						X(t, "title", e), G(n, `${i ?? ""} `), Y(r, V(M).props.endpoint ?? ""), X(r, "placeholder", a);
					}, [
						() => Z("form.endpointNote"),
						() => Z("form.endpoint"),
						() => Z("form.endpointPh")
					]), H("change", r, (e) => F("endpoint", e.target.value.trim())), W(e, t);
				}, s = (e) => {
					var t = yu(), n = L(t), r = I(n), i = z(r);
					J(i), D(n);
					var a = z(n, 2), o = I(a), s = z(o);
					J(s), D(a), B((e, t, n, a) => {
						G(r, `${e ?? ""} `), Y(i, V(M).props.recipient ?? ""), X(i, "placeholder", t), G(o, `${n ?? ""} `), Y(s, V(M).props.subject ?? ""), X(s, "placeholder", a);
					}, [
						() => Z("form.recipient"),
						() => Z("form.recipientPh"),
						() => Z("form.subject"),
						() => Z("form.subjectPh")
					]), H("change", i, (e) => F("recipient", e.target.value.trim())), H("change", s, (e) => F("subject", e.target.value.trim())), W(e, t);
				};
				K(a, (e) => {
					(V(M).props.mode ?? "mailto") === "endpoint" ? e(o) : e(s, -1);
				});
				var c = z(a, 2), l = R(c, !0), u = z(c, 2);
				Jr(u, 19, () => V(M).props.fields ?? [], (e, t) => e.id ?? t, (e, t, n) => {
					var r = xu(), i = L(r), a = I(i);
					J(a);
					var o = z(a, 2);
					{
						let e = /* @__PURE__ */ A(() => V(t).type ?? "text"), r = /* @__PURE__ */ A(() => dn.map((e) => [e, Z(`form.type${e[0].toUpperCase()}${e.slice(1)}`)]));
						Q(o, {
							get value() {
								return V(e);
							},
							get options() {
								return V(r);
							},
							onchange: (e) => mn(V(n), { type: e })
						});
					}
					var s = z(o, 2), c = I(s);
					q(c, () => _.up, !0), D(c);
					var l = z(c, 2);
					q(l, () => _.down, !0), D(l);
					var u = z(l, 2);
					q(u, () => _.cross, !0), D(u), D(s), D(i);
					var d = z(i, 2), f = I(d);
					J(f);
					var p = z(f);
					D(d);
					var m = z(d, 2), h = (e) => {
						var r = bu();
						J(r), B((e, t) => {
							Y(r, e), X(r, "placeholder", t);
						}, [() => (V(t).options ?? []).join(", "), () => Z("form.optionsPh")]), H("change", r, (e) => hn(V(n), e.target.value)), W(e, r);
					}, g = /* @__PURE__ */ A(() => fn.has(V(t).type));
					K(m, (e) => {
						V(g) && e(h);
					}), B((e, r, i) => {
						Y(a, V(t).label), X(a, "placeholder", e), c.disabled = V(n) === 0, l.disabled = V(n) === (V(M).props.fields?.length ?? 0) - 1, X(u, "title", r), Si(f, V(t).required === !0), G(p, ` ${i ?? ""}`);
					}, [
						() => Z("form.fieldNamePh"),
						() => Z("form.removeField"),
						() => Z("form.required")
					]), H("change", a, (e) => mn(V(n), { label: e.target.value.trim() || Z("form.fieldFallback") })), H("click", c, () => vn(V(n), -1)), H("click", l, () => vn(V(n), 1)), H("click", u, () => _n(V(n))), H("change", f, (e) => mn(V(n), { required: e.target.checked })), W(e, r);
				});
				var d = z(u, 2), f = R(d, !0), p = z(d, 2), m = I(p), h = z(m);
				J(h), D(p);
				var g = z(p, 2), v = I(g), y = z(v);
				J(y), D(g), B((e, t, i, a, o, s, c, u) => {
					X(n, "title", e), G(r, `${t ?? ""} `), G(l, i), G(f, a), G(m, `${o ?? ""} `), Y(h, V(M).props.submitLabel ?? ""), X(h, "placeholder", s), G(v, `${c ?? ""} `), Y(y, V(M).props.successText ?? ""), X(y, "placeholder", u);
				}, [
					() => Z("form.modeTitle"),
					() => Z("form.mode"),
					() => Z("form.fields"),
					() => Z("form.addField"),
					() => Z("lbl.buttonText"),
					() => Z("form.sendDefault"),
					() => Z("form.receipt"),
					() => Z("form.thanksDefault")
				]), H("click", d, gn), H("change", h, (e) => F("submitLabel", e.target.value.trim() || Z("form.sendDefault"))), H("change", y, (e) => F("successText", e.target.value.trim() || Z("form.thanksDefault"))), W(e, t);
			}, a = (e) => {
				var t = wu(), n = L(t), r = I(n), i = z(r);
				ut(i), D(n);
				var a = z(n, 2), o = I(a), s = z(o);
				{
					let e = /* @__PURE__ */ A(() => V(M).props.view ?? "list"), t = /* @__PURE__ */ A(() => [
						["list", Z("calendar.viewList")],
						["cards", Z("calendar.viewCards")],
						["month", Z("calendar.viewMonth")],
						["next", Z("calendar.viewNext")]
					]);
					Q(s, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => F("view", e)
					});
				}
				D(a);
				var c = z(a, 2), l = (e) => {
					var t = Cu(), n = I(t), r = z(n);
					J(r), D(t), B((e, i) => {
						X(t, "title", e), G(n, `${i ?? ""} `), Y(r, V(M).props.limit ?? 6);
					}, [() => Z("tip.collection.limit"), () => Z("lbl.maxCount")]), H("change", r, (e) => F("limit", Math.max(1, Math.min(50, Number(e.target.value) || 6)))), W(e, t);
				};
				K(c, (e) => {
					((V(M).props.view ?? "list") === "list" || V(M).props.view === "cards") && e(l);
				});
				var u = z(c, 2), d = I(u);
				J(d);
				var f = z(d);
				D(u);
				var p = z(u, 2), m = I(p);
				J(m);
				var h = z(m);
				D(p), B((e, t, n, a, s, c) => {
					G(r, `${e ?? ""} `), X(i, "placeholder", t), Y(i, n), G(o, `${a ?? ""} `), Si(d, V(M).props.showCategories !== !1), G(f, ` ${s ?? ""}`), Si(m, V(M).props.showSubscribe !== !1), G(h, ` ${c ?? ""}`);
				}, [
					() => Z("calendar.sources"),
					() => Z("calendar.sourcesPh"),
					() => (V(M).props.sources ?? []).join("\n"),
					() => Z("lbl.view"),
					() => Z("calendar.showCategories"),
					() => Z("calendar.showSubscribe")
				]), H("change", i, (e) => yn(e.target.value)), H("change", d, (e) => F("showCategories", e.target.checked)), H("change", m, (e) => F("showSubscribe", e.target.checked)), W(e, t);
			}, o = (e) => {
				var t = Eu(), n = L(t), r = I(n);
				J(r);
				var i = z(r);
				D(n);
				var a = z(n, 2), o = R(a, !0), s = z(a, 2);
				Jr(s, 17, () => V(M).props.items ?? [], Wr, (e, t, n) => {
					var r = Tu(), i = I(r);
					J(i);
					var a = z(i, 2), o = I(a);
					o.disabled = n === 0, q(o, () => _.up, !0), D(o);
					var s = z(o, 2);
					q(s, () => _.down, !0), D(s);
					var c = z(s, 2);
					q(c, () => _.cross, !0), D(c), D(a), D(r), B((e, r) => {
						Y(i, V(t).q), X(i, "title", e), s.disabled = n === (V(M).props.items?.length ?? 0) - 1, X(c, "title", r);
					}, [() => Z("tip.faq.question"), () => Z("tip.faq.remove")]), H("change", i, (e) => xn(n, { q: e.target.value })), H("click", o, () => wn(n, -1)), H("click", s, () => wn(n, 1)), H("click", c, () => Cn(n)), W(e, r);
				});
				var c = z(s, 2), l = R(c, !0);
				B((e, t, a, s, c) => {
					X(n, "title", e), Si(r, t), G(i, ` ${a ?? ""}`), G(o, s), G(l, c);
				}, [
					() => Z("tip.faq.multi"),
					() => !!V(M).props.multi,
					() => Z("lbl.faqMulti"),
					() => Z("lbl.questions"),
					() => Z("ui.addQuestion")
				]), H("change", r, (e) => F("multi", e.target.checked)), H("click", c, Sn), W(e, t);
			}, s = (e) => {
				var t = Ou(), n = L(t), r = R(n, !0), i = z(n, 2);
				Jr(i, 17, () => V(M).props.items ?? [], Wr, (e, t, n) => {
					var r = Du(), i = L(r), a = I(i);
					J(a);
					var o = z(a, 2);
					J(o);
					var s = z(o, 2), c = I(s);
					c.disabled = n === 0, q(c, () => _.up, !0), D(c);
					var l = z(c, 2);
					q(l, () => _.down, !0), D(l);
					var u = z(l, 2);
					q(u, () => _.cross, !0), D(u), D(s), D(i);
					var d = z(i, 2);
					J(d), B((e, r, i, s, c, f) => {
						Y(a, V(t).year), X(a, "placeholder", e), X(a, "title", r), Y(o, V(t).title), X(o, "title", i), l.disabled = n === (V(M).props.items?.length ?? 0) - 1, X(u, "title", s), Y(d, V(t).text), X(d, "placeholder", c), X(d, "title", f);
					}, [
						() => Z("ph.tlYear"),
						() => Z("tip.timeline.year"),
						() => Z("tip.timeline.title"),
						() => Z("tip.timeline.remove"),
						() => Z("ph.tlText"),
						() => Z("tip.timeline.text")
					]), H("change", a, (e) => Tn(n, { year: e.target.value })), H("change", o, (e) => Tn(n, { title: e.target.value })), H("click", c, () => On(n, -1)), H("click", l, () => On(n, 1)), H("click", u, () => Dn(n)), H("change", d, (e) => Tn(n, { text: e.target.value })), W(e, r);
				});
				var a = z(i, 2), o = R(a, !0);
				B((e, t) => {
					G(r, e), G(o, t);
				}, [() => Z("lbl.timelineItems"), () => Z("ui.addTlItem")]), H("click", a, En), W(e, t);
			}, c = (e) => {
				var t = ku(), n = L(t), r = I(n), i = z(r);
				J(i), D(n);
				var a = z(n, 2), o = I(a), s = z(o);
				J(s), D(a);
				var c = z(a, 2), l = I(c), u = z(l);
				J(u), D(c), B((e, t, n) => {
					G(r, `${e ?? ""} `), Y(i, V(M).props.text ?? ""), G(o, `${t ?? ""} `), Y(s, V(M).props.attribution ?? ""), G(l, `${n ?? ""} `), Y(u, V(M).props.role ?? "");
				}, [
					() => Z("lbl.quoteText"),
					() => Z("lbl.quoteName"),
					() => Z("lbl.quoteRole")
				]), H("change", i, (e) => F("text", e.target.value)), H("change", s, (e) => F("attribution", e.target.value)), H("change", u, (e) => F("role", e.target.value)), W(e, t);
			}, l = (e) => {
				var t = Au(), n = L(t), r = I(n), i = z(r);
				J(i), D(n);
				var a = z(n, 2), o = I(a), s = z(o);
				J(s), D(a);
				var c = z(a, 2), l = I(c), u = z(l);
				J(u), D(c);
				var d = z(c, 2), f = I(d), p = z(f);
				J(p), D(d), B((e, t, n, a, c) => {
					G(r, `${e ?? ""} `), Y(i, V(M).props.value ?? ""), X(i, "title", t), G(o, `${n ?? ""} `), Y(s, V(M).props.prefix ?? ""), G(l, `${a ?? ""} `), Y(u, V(M).props.suffix ?? ""), G(f, `${c ?? ""} `), Y(p, V(M).props.label ?? "");
				}, [
					() => Z("lbl.statValue"),
					() => Z("tip.stat.value"),
					() => Z("lbl.statPrefix"),
					() => Z("lbl.statSuffix"),
					() => Z("lbl.statLabel")
				]), H("change", i, (e) => F("value", e.target.value)), H("change", s, (e) => F("prefix", e.target.value)), H("change", u, (e) => F("suffix", e.target.value)), H("change", p, (e) => F("label", e.target.value)), W(e, t);
			}, u = (e) => {
				var t = ju(), n = L(t), r = I(n), i = R(r, !0), a = z(r, 2), o = R(a, !0);
				D(n);
				var s = z(n, 2), c = I(s), l = R(c, !0), u = z(c, 2), d = R(u, !0);
				D(s);
				var f = z(s, 2), p = I(f);
				J(p);
				var m = z(p);
				D(f), B((e, t, n, r, a, s) => {
					G(i, e), G(o, t), G(l, n), G(d, r), X(f, "title", a), Si(p, V(M).props.header !== !1), G(m, ` ${s ?? ""}`);
				}, [
					() => Z("ui.addRow"),
					() => Z("ui.removeRow"),
					() => Z("ui.addColumn"),
					() => Z("ui.removeColumn"),
					() => Z("tip.table.header"),
					() => Z("lbl.tableHeader")
				]), H("click", r, () => An(1, 0)), H("click", a, () => An(-1, 0)), H("click", c, () => An(0, 1)), H("click", u, () => An(0, -1)), H("change", p, (e) => F("header", e.target.checked)), W(e, t);
			}, d = (e) => {
				var t = Nr();
				Jr(L(t), 17, () => [
					["facebook", "Facebook"],
					["x", "X"],
					["linkedin", "LinkedIn"],
					["whatsapp", "WhatsApp"],
					["email", Z("opt.share.email")],
					["copy", Z("opt.share.copy")]
				], ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ A(() => h(V(t), 2));
					let r = () => V(n)[0], i = () => V(n)[1];
					var a = Mu(), o = I(a);
					J(o);
					var s = z(o);
					D(a), B((e) => {
						Si(o, e), G(s, ` ${i() ?? ""}`);
					}, [() => (V(M).props.services ?? []).includes(r())]), H("change", o, (e) => jn(r(), e.target.checked)), W(e, a);
				}), W(e, t);
			}, f = (e) => {
				var t = Nu(), n = L(t), r = I(n), i = z(r);
				J(i), D(n);
				var a = z(n, 2), o = I(a), s = z(o);
				J(s), D(a), B((e, t, n) => {
					G(r, `${e ?? ""} `), Y(i, V(M).props.target ?? ""), X(a, "title", t), G(o, `${n ?? ""} `), Y(s, V(M).props.doneText ?? "");
				}, [
					() => Z("lbl.countdownTarget"),
					() => Z("tip.countdown.done"),
					() => Z("lbl.countdownDone")
				]), H("change", i, (e) => F("target", e.target.value)), H("change", s, (e) => F("doneText", e.target.value)), W(e, t);
			}, p = (e) => {
				var t = Fu(), n = L(t), r = I(n), i = z(r);
				D(n);
				var a = z(n, 2), o = (e) => {
					var t = Pu(), n = R(t, !0);
					B((e) => G(n, e), [() => Z("ui.removeAudio")]), H("click", t, () => F("src", "")), W(e, t);
				};
				K(a, (e) => {
					V(M).props.src && e(o);
				});
				var s = z(a, 2), c = I(s), l = z(c);
				J(l), D(s);
				var u = z(s, 2), d = I(u);
				J(d);
				var f = z(d);
				D(u), B((e, t, i, a, o) => {
					X(n, "title", e), G(r, `${t ?? ""} `), G(c, `${i ?? ""} `), Y(l, V(M).props.title ?? ""), Si(d, a), G(f, ` ${o ?? ""}`);
				}, [
					() => Z("tip.blocks.audioFile"),
					() => Z("ui.chooseAudio"),
					() => Z("lbl.audioTitle"),
					() => !!V(M).props.loop,
					() => Z("lbl.audioLoop")
				]), H("change", i, Mn), H("change", l, (e) => F("title", e.target.value)), H("change", d, (e) => F("loop", e.target.checked)), W(e, t);
			}, m = (e) => {
				var t = Iu(), n = L(t), r = I(n), i = z(r);
				J(i), D(n);
				var a = z(n, 2), o = I(a), s = z(o);
				{
					let e = /* @__PURE__ */ A(() => V(M).props.page ?? "__href"), t = /* @__PURE__ */ A(() => [...V(k).pages.map((e) => [e.id, e.title]), ["__href", Z("opt.externalLink")]]);
					Q(s, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => {
							let t = e === "__href" ? null : e;
							Yt(`edit:${V(M).blockId}`, (e) => {
								e.props.page = t, t && (e.props.href = null);
							});
						}
					});
				}
				D(a);
				var c = z(a, 2), l = (e) => {
					var t = bu();
					J(t), B((e) => {
						X(t, "placeholder", e), Y(t, V(M).props.href === "#" ? "" : V(M).props.href ?? "");
					}, [() => Z("ph.url")]), H("change", t, (e) => F("href", e.target.value || null)), W(e, t);
				};
				K(c, (e) => {
					V(M).props.page || e(l);
				}), B((e, t) => {
					G(r, `${e ?? ""} `), Y(i, V(M).props.label), G(o, `${t ?? ""} `);
				}, [() => Z("blocks.text"), () => Z("lbl.goesTo")]), H("change", i, (e) => F("label", e.target.value)), W(e, t);
			}, g = (e) => {
				var t = Lu(), n = L(t), r = I(n), i = z(r);
				D(n);
				var a = z(n, 2), o = I(a), s = z(o);
				J(s), D(a);
				var c = z(a, 2), l = I(c), u = z(l);
				J(u), D(c);
				var d = z(c, 2), f = (e) => {
					var t = Mu(), n = I(t);
					J(n);
					var r = z(n);
					D(t), B((e, i, a) => {
						X(t, "title", e), Si(n, i), G(r, ` ${a ?? ""}`);
					}, [
						() => Z("tip.lightbox"),
						() => !!V(M).props.lightbox,
						() => Z("lbl.lightbox")
					]), H("change", n, (e) => F("lightbox", e.target.checked)), W(e, t);
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
				]), H("change", i, Pn), H("change", s, (e) => F("alt", e.target.value)), H("change", u, (e) => F("href", e.target.value || null)), W(e, t);
			}, v = (e) => {
				var t = Ru(), n = L(t), r = R(n, !0), i = z(n, 2);
				J(i);
				var a = z(i, 2), o = I(a), s = z(o);
				J(s), D(a), B((e, t, a, c) => {
					X(n, "title", e), G(r, t), Y(i, V(M).props.url ?? ""), X(i, "placeholder", a), G(o, `${c ?? ""} `), Y(s, V(M).props.title ?? "");
				}, [
					() => Z("hint.video"),
					() => Z("lbl.videoUrl"),
					() => Z("ph.videoUrl"),
					() => Z("lbl.videoTitle")
				]), H("change", i, (e) => F("url", e.target.value)), H("change", s, (e) => F("title", e.target.value)), W(e, t);
			}, y = (e) => {
				var t = Vu(), n = L(t), r = I(n), i = z(r), a = I(i);
				{
					let e = /* @__PURE__ */ A(() => V(M).props.glyph ?? "★"), t = /* @__PURE__ */ A(() => V(M).props.icon ?? null), n = /* @__PURE__ */ A(() => V(M).props.image ?? null);
					no(a, {
						get value() {
							return V(e);
						},
						get icon() {
							return V(t);
						},
						get image() {
							return V(n);
						},
						onpick: (e) => Yt(`edit:${V(M).blockId}`, (t) => {
							t.props.glyph = e, t.props.icon = null, t.props.image = null;
						}),
						onicon: (e) => Yt(`edit:${V(M).blockId}`, (t) => {
							t.props.icon = e, t.props.image = null;
						}),
						onimage: (e) => F("image", e)
					});
				}
				var o = z(a, 2), s = (e) => {
					var t = zu();
					J(t), B((e) => {
						Y(t, V(M).props.glyph ?? ""), X(t, "title", e);
					}, [() => Z("tip.icon.typeGlyph")]), H("change", t, (e) => F("glyph", e.target.value || "★")), W(e, t);
				}, c = (e) => {
					var t = Pu(), n = R(t, !0);
					B((e, r) => {
						X(t, "title", e), G(n, r);
					}, [() => Z("tip.icon.backToGlyph"), () => Z("ui.removeDrawnIcon")]), H("click", t, () => F("icon", null)), W(e, t);
				};
				K(o, (e) => {
					V(M).props.icon ? e(c, -1) : e(s);
				}), D(i), D(n);
				var l = z(n, 2), u = (e) => {
					var t = Bu(), n = I(t), r = z(n, 2), i = R(r, !0);
					D(t), B((e, r, a) => {
						X(t, "title", e), X(n, "src", V(M).props.image), X(n, "alt", r), G(i, a);
					}, [
						() => Z("hint.icon.ownImage"),
						() => Z("gp.ownIcon"),
						() => Z("ui.removeOwnIcon")
					]), H("click", r, () => F("image", null)), W(e, t);
				};
				K(l, (e) => {
					V(M).props.image && e(u);
				}), B((e) => G(r, `${e ?? ""} `), [() => Z("blocks.icon")]), W(e, t);
			}, b = (e) => {
				var t = Hu(), n = L(t), r = I(n), i = z(r);
				{
					let e = /* @__PURE__ */ A(() => V(M).props.collection ?? ""), t = /* @__PURE__ */ A(() => [["", Z("common.choose")], ...V(Ns).map((e) => [e, V(Ps)[e]?.name ?? e])]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => F("collection", e || null)
					});
				}
				D(n);
				var a = z(n, 2), o = I(a), s = z(o);
				J(s), D(a);
				var c = z(a, 2), l = I(c);
				J(l);
				var u = z(l);
				D(c), B((e, t, i, c, d) => {
					X(n, "title", e), G(r, `${t ?? ""} `), X(a, "title", i), G(o, `${c ?? ""} `), Y(s, V(M).props.limit ?? 6), Si(l, V(M).props.newestFirst !== !1), G(u, ` ${d ?? ""}`);
				}, [
					() => Z("tip.collection.source"),
					() => Z("blocks.collection"),
					() => Z("tip.collection.limit"),
					() => Z("lbl.maxCount"),
					() => Z("lbl.newestFirst")
				]), H("change", s, (e) => F("limit", Number(e.target.value))), H("change", l, (e) => F("newestFirst", e.target.checked)), W(e, t);
			}, x = (e) => {
				var t = Gu(), n = L(t), r = I(n), i = z(r);
				{
					let e = /* @__PURE__ */ A(() => V(M).props.collection ?? ""), t = /* @__PURE__ */ A(() => [["", Z("common.choose")], ...V(Ns).filter((e) => V(Ps)[e]?.kind === "products").map((e) => [e, V(Ps)[e]?.name ?? e])]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => F("collection", e || null)
					});
				}
				D(n);
				var a = z(n, 2), o = (e) => {
					var t = Uu(), n = I(t), r = R(n, !0), i = z(n, 2), a = R(i, !0);
					D(t), B((e, t, o, s) => {
						X(n, "title", e), G(r, t), X(i, "title", o), G(a, s);
					}, [
						() => Z("tip.product.addProduct"),
						() => Z("ui.addProduct"),
						() => Z("tip.product.editCatalog"),
						() => Z("ui.editCatalog")
					]), H("click", n, () => _c(V(M).props.collection)), H("click", i, () => {
						P(Fs, V(M).props.collection, !0), P(j, "collections");
					}), W(e, t);
				}, s = (e) => {
					var t = Wu(), n = R(t, !0);
					B((e, r) => {
						X(t, "title", e), G(n, r);
					}, [() => Z("tip.product.createCatalog"), () => Z("ui.createCatalog")]), H("click", t, hc), W(e, t);
				}, c = /* @__PURE__ */ A(() => !V(Ns).some((e) => V(Ps)[e]?.kind === "products"));
				K(a, (e) => {
					V(M).props.collection && V(Ps)[V(M).props.collection]?.kind === "products" ? e(o) : V(c) && e(s, 1);
				});
				var l = z(a, 2), u = I(l), d = z(u);
				J(d), D(l);
				var f = z(l, 2), p = I(f), m = z(p);
				J(m), D(f), B((e, t, i, a, o, s) => {
					X(n, "title", e), G(r, `${t ?? ""} `), X(l, "title", i), G(u, `${a ?? ""} `), Y(d, V(M).props.limit ?? 0), X(f, "title", o), G(p, `${s ?? ""} `), Y(m, V(M).props.currency ?? "kr");
				}, [
					() => Z("tip.product.source"),
					() => Z("blocks.collection"),
					() => Z("tip.collection.limit"),
					() => Z("lbl.maxCount"),
					() => Z("tip.product.currency"),
					() => Z("lbl.currency")
				]), H("change", d, (e) => F("limit", Number(e.target.value))), H("change", m, (e) => F("currency", e.target.value)), W(e, t);
			}, S = (e) => {
				var t = Ku(), n = L(t), r = I(n), i = z(r);
				{
					let e = /* @__PURE__ */ A(() => V(M).props.href ?? ""), t = /* @__PURE__ */ A(() => [["", Z("common.none")], ...V(k).pages.map((e) => [e.path, e.title])]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => F("href", e)
					});
				}
				D(n);
				var a = z(n, 2), o = I(a), s = z(o);
				J(s), D(a), B((e, t, i, c) => {
					X(n, "title", e), G(r, `${t ?? ""} `), X(a, "title", i), G(o, `${c ?? ""} `), Y(s, V(M).props.currency ?? "kr");
				}, [
					() => Z("tip.cart.checkout"),
					() => Z("lbl.checkoutPage"),
					() => Z("tip.product.currency"),
					() => Z("lbl.currency")
				]), H("change", s, (e) => F("currency", e.target.value)), W(e, t);
			}, C = (e) => {
				var t = qu(), n = L(t), r = I(n), i = z(r);
				J(i), D(n);
				var a = z(n, 2), o = I(a), s = z(o);
				J(s), D(a);
				var c = z(a, 2), l = I(c), u = z(l);
				J(u), D(c);
				var d = z(c, 2), f = I(d);
				J(f);
				var p = z(f);
				D(d);
				var m = z(d, 2), h = I(m), g = z(h);
				J(g), D(m), B((e, t, _, v, y, b, x, S, C, w) => {
					X(n, "title", e), G(r, `${t ?? ""} `), Y(i, V(M).props.recipient ?? ""), X(a, "title", _), G(o, `${v ?? ""} `), Y(s, V(M).props.endpoint ?? ""), X(c, "title", y), G(l, `${b ?? ""} `), Y(u, V(M).props.vipps ?? ""), X(d, "title", x), Si(f, V(M).props.vippsCheckout === !0), G(p, ` ${S ?? ""}`), X(m, "title", C), G(h, `${w ?? ""} `), Y(g, V(M).props.currency ?? "kr");
				}, [
					() => Z("tip.checkout.recipient"),
					() => Z("lbl.recipientEmail"),
					() => Z("tip.checkout.endpoint"),
					() => Z("lbl.endpointUrl"),
					() => Z("tip.checkout.vipps"),
					() => Z("lbl.vippsNumber"),
					() => Z("tip.checkout.vippsCheckout"),
					() => Z("lbl.vippsCheckout"),
					() => Z("tip.product.currency"),
					() => Z("lbl.currency")
				]), H("change", i, (e) => F("recipient", e.target.value.trim())), H("change", s, (e) => F("endpoint", e.target.value.trim())), H("change", u, (e) => F("vipps", e.target.value.trim())), H("change", f, (e) => F("vippsCheckout", e.target.checked)), H("change", g, (e) => F("currency", e.target.value)), W(e, t);
			}, w = (e) => {
				var t = Yu(), n = L(t), r = I(n), i = z(r);
				D(n), Jr(z(n, 2), 17, () => V(M).props.images ?? [], Wr, (e, t, n) => {
					var r = Ju(), i = I(r), a = I(i), o = z(a, 2), s = I(o);
					s.disabled = n === 0, q(s, () => _.up, !0), D(s);
					var c = z(s, 2);
					q(c, () => _.down, !0), D(c);
					var l = z(c, 2);
					q(l, () => _.cross, !0), D(l), D(o), D(i);
					var u = z(i, 2), d = I(u), f = z(d);
					J(f), D(u);
					var p = z(u, 2), m = I(p), h = z(m);
					J(h), D(p), D(r), B((e, r, o, s, u, p) => {
						X(i, "title", e), X(a, "src", V(t).src), c.disabled = n === V(M).props.images.length - 1, X(l, "title", r), G(d, `${o ?? ""} `), Y(f, V(t).alt ?? ""), X(f, "placeholder", s), G(m, `${u ?? ""} `), Y(h, V(t).href ?? ""), X(h, "placeholder", p);
					}, [
						() => Z("hint.gallery"),
						() => Z("tip.removeImage"),
						() => Z("lbl.description"),
						() => Z("ph.altShort"),
						() => Z("lbl.link"),
						() => Z("ph.galleryHref")
					]), H("click", s, () => Hh(n, -1)), H("click", c, () => Hh(n, 1)), H("click", l, () => Uh(n)), H("change", f, (e) => Wh(n, "alt", e.target.value)), H("change", h, (e) => Wh(n, "href", e.target.value || null)), W(e, r);
				}), B((e, t) => {
					X(n, "title", e), G(r, `${t ?? ""} `);
				}, [() => Z("tip.gallery.addImages"), () => Z("ui.addImages")]), H("change", i, Bh), W(e, t);
			}, T = (e) => {
				var t = mu(), n = I(t);
				Q(z(n), {
					get value() {
						return V(M).props.kind;
					},
					get options() {
						return Ln;
					},
					onchange: (e) => F("kind", e)
				}), D(t), B((e) => G(n, `${e ?? ""} `), [() => Z("blocks.shape")]), W(e, t);
			}, ee = (e) => {
				let t = /* @__PURE__ */ A(() => jh[V(M).type] ?? V(Ah).find((e) => e.type === V(M).type)?.fields ?? []);
				var n = Nr(), r = L(n), i = (e) => {
					var n = Nr();
					Jr(L(n), 17, () => V(t), (e) => e.key, (e, t) => {
						var n = Nr(), r = L(n), i = (e) => {
							let n = /* @__PURE__ */ A(() => `${V(M).blockId}:${V(t).key}`);
							var r = Zu(), i = L(r), a = I(i), o = z(a);
							J(o), D(i);
							var s = z(i, 2), c = R(s, !0), l = z(s, 2), u = (e) => {
								var t = Xu();
								let r;
								var i = R(t, !0);
								B(() => {
									r = hi(t, 1, "panel-hint svelte-1n46o8q", null, r, { "place-error": rn[V(n)].err }), G(i, rn[V(n)].text);
								}), W(e, t);
							};
							K(l, (e) => {
								rn[V(n)] && e(u);
							}), B((e) => {
								G(a, `${V(t).label ?? ""} `), X(o, "placeholder", V(t).placeholder), Y(o, nn[V(n)] ?? V(M).props[V(t).key] ?? ""), s.disabled = V(an), G(c, e);
							}, [() => Z("props.place.search")]), H("input", o, (e) => {
								nn[V(n)] = e.target.value;
							}), H("keydown", o, (e) => {
								e.key === "Enter" && cn(V(t));
							}), H("click", s, () => cn(V(t))), W(e, r);
						}, a = (e) => {
							var n = Qu(), r = I(n), i = z(r);
							J(i), D(n), B(() => {
								G(r, `${V(t).label ?? ""} `), X(i, "min", V(t).min), X(i, "max", V(t).max), X(i, "step", V(t).step ?? 1), Y(i, V(M).props[V(t).key]);
							}), H("change", i, (e) => F(V(t).key, sn(V(t), Number(e.target.value)))), W(e, n);
						}, o = (e) => {
							var n = Mu(), r = I(n);
							J(r);
							var i = z(r);
							D(n), B((e) => {
								Si(r, e), G(i, ` ${V(t).label ?? ""}`);
							}, [() => !!V(M).props[V(t).key]]), H("change", r, (e) => F(V(t).key, e.target.checked)), W(e, n);
						}, s = (e) => {
							var n = mu(), r = I(n), i = z(r);
							{
								let e = /* @__PURE__ */ A(() => (V(t).options ?? []).map((e) => [e.value, e.label]));
								Q(i, {
									get value() {
										return V(M).props[V(t).key];
									},
									get options() {
										return V(e);
									},
									onchange: (e) => F(V(t).key, e)
								});
							}
							D(n), B(() => G(r, `${V(t).label ?? ""} `)), W(e, n);
						}, c = (e) => {
							var n = $u(), r = I(n), i = z(r);
							J(i), D(n), B(() => {
								G(r, `${V(t).label ?? ""} `), X(i, "placeholder", V(t).placeholder), Y(i, V(M).props[V(t).key] ?? "");
							}), H("change", i, (e) => F(V(t).key, e.target.value)), W(e, n);
						};
						K(r, (e) => {
							V(t).type === "place" ? e(i) : V(t).type === "number" ? e(a, 1) : V(t).type === "toggle" ? e(o, 2) : V(t).type === "select" ? e(s, 3) : e(c, -1);
						}), W(e, n);
					}), W(e, n);
				}, a = (e) => {
					var t = Pu(), n = R(t, !0);
					B((e, r) => {
						X(t, "title", e), G(n, r);
					}, [() => Z("hint.pluginBlock"), () => Z("ui.settings")]), H("click", t, () => Ue?.sendOpenConfig(V(M).blockId)), W(e, t);
				};
				K(r, (e) => {
					V(t).length ? e(i) : e(a, -1);
				}), W(e, n);
			};
			K(n, (e) => {
				V(M).type === "text" ? e(r) : V(M).type === "form" ? e(i, 1) : V(M).type === "calendar" ? e(a, 2) : V(M).type === "faq" ? e(o, 3) : V(M).type === "timeline" ? e(s, 4) : V(M).type === "quote" ? e(c, 5) : V(M).type === "stats" ? e(l, 6) : V(M).type === "table" ? e(u, 7) : V(M).type === "share" ? e(d, 8) : V(M).type === "countdown" ? e(f, 9) : V(M).type === "audio" ? e(p, 10) : V(M).type === "button" ? e(m, 11) : V(M).type === "image" ? e(g, 12) : V(M).type === "video" ? e(v, 13) : V(M).type === "icon" ? e(y, 14) : V(M).type === "collection" ? e(b, 15) : V(M).type === "product" ? e(x, 16) : V(M).type === "cart" ? e(S, 17) : V(M).type === "checkout" ? e(C, 18) : V(M).type === "gallery" ? e(w, 19) : V(M).type === "shape" ? e(T, 20) : e(ee, -1);
			}), W(e, t);
		}, p = (e) => {
			var t = Cd(), n = L(t), r = (e) => {
				var t = ed(), n = L(t), r = I(n), a = z(r);
				{
					let e = /* @__PURE__ */ A(() => V(M).props.align ?? "left"), t = /* @__PURE__ */ A(() => [
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
						onchange: (e) => F("align", e)
					});
				}
				D(n);
				var o = z(n, 2), s = I(o);
				J(s);
				var c = z(s);
				D(o);
				var l = z(o, 2), u = (e) => {
					i(e);
				};
				K(l, (e) => {
					V(M).props.box && e(u);
				}), Oe(2), B((e, t, n) => {
					G(r, `${e ?? ""} `), Si(s, t), G(c, ` ${n ?? ""}`);
				}, [
					() => Z("lbl.align"),
					() => !!V(M).props.box,
					() => Z("lbl.textBoxToggle")
				]), H("change", s, (e) => F("box", e.target.checked)), W(e, t);
			}, a = (e) => {
				var t = td(), n = L(t), r = R(n, !0), a = z(n, 2);
				i(a), Oe(2), B((e) => G(r, e), [() => Z("lbl.cardStyle")]), W(e, t);
			}, o = (e) => {
				var t = nd(), n = L(t), r = I(n), i = z(r);
				{
					let e = /* @__PURE__ */ A(() => V(M).props.variant ?? "left"), t = /* @__PURE__ */ A(() => [["left", Z("opt.timeline.left")], ["alternating", Z("opt.timeline.alternating")]]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => F("variant", e)
					});
				}
				D(n);
				var a = z(n, 2), o = I(a), s = z(o);
				{
					let e = /* @__PURE__ */ A(() => V(M).props.marker ?? "filled"), t = /* @__PURE__ */ A(() => [["filled", Z("opt.timeline.filled")], ["ring", Z("opt.timeline.ring")]]);
					Q(s, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => F("marker", e)
					});
				}
				D(a);
				var c = z(a, 2), l = I(c), u = z(l);
				{
					let e = /* @__PURE__ */ A(() => V(M).props.accent ?? "accent"), t = /* @__PURE__ */ A(Hr);
					ha(u, {
						get value() {
							return V(e);
						},
						get tokens() {
							return V(t);
						},
						onchange: (e) => F("accent", e === "accent" ? null : e)
					});
				}
				D(c), Oe(2), B((e, t, n) => {
					G(r, `${e ?? ""} `), G(o, `${t ?? ""} `), G(l, `${n ?? ""} `);
				}, [
					() => Z("lbl.variant"),
					() => Z("lbl.timelineMarker"),
					() => Z("lbl.color")
				]), W(e, t);
			}, s = (e) => {
				var t = id(), n = L(t), r = I(n), i = z(r);
				{
					let e = /* @__PURE__ */ A(() => V(M).props.variant ?? "large"), t = /* @__PURE__ */ A(() => [["large", Z("opt.quote.large")], ["short", Z("opt.quote.short")]]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => F("variant", e)
					});
				}
				D(n);
				var a = z(n, 2), o = (e) => {
					var t = rd(), n = L(t), r = I(n), i = z(r);
					D(n);
					var a = z(n, 2), o = (e) => {
						var t = Pu(), n = R(t, !0);
						B((e) => G(n, e), [() => Z("ui.quotePortraitRemove")]), H("click", t, () => F("image", "")), W(e, t);
					};
					K(a, (e) => {
						V(M).props.image && e(o);
					}), B((e) => G(r, `${e ?? ""} `), [() => Z("ui.quotePortrait")]), H("change", i, Fn), W(e, t);
				};
				K(a, (e) => {
					V(M).props.variant === "short" && e(o);
				});
				var s = z(a, 2), c = I(s), l = z(c);
				{
					let e = /* @__PURE__ */ A(() => V(M).props.accent ?? "accent"), t = /* @__PURE__ */ A(Hr);
					ha(l, {
						get value() {
							return V(e);
						},
						get tokens() {
							return V(t);
						},
						onchange: (e) => F("accent", e === "accent" ? null : e)
					});
				}
				D(s), Oe(2), B((e, t) => {
					G(r, `${e ?? ""} `), G(c, `${t ?? ""} `);
				}, [() => Z("lbl.variant"), () => Z("lbl.color")]), W(e, t);
			}, c = (e) => {
				var t = ad(), n = L(t), r = I(n);
				J(r);
				var i = z(r);
				D(n), Oe(2), B((e, t) => {
					X(n, "title", e), Si(r, V(M).props.countUp !== !1), G(i, ` ${t ?? ""}`);
				}, [() => Z("tip.stat.countUp"), () => Z("lbl.statCountUp")]), H("change", r, (e) => F("countUp", e.target.checked)), W(e, t);
			}, l = (e) => {
				var t = od(), n = L(t), r = I(n), i = z(r);
				{
					let e = /* @__PURE__ */ A(() => V(M).props.lines ?? "rows"), t = /* @__PURE__ */ A(() => [
						["rows", Z("opt.table.rows")],
						["grid", Z("opt.table.grid")],
						["none", Z("common.none")]
					]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => F("lines", e)
					});
				}
				D(n);
				var a = z(n, 2), o = I(a);
				J(o);
				var s = z(o);
				D(a), Oe(2), B((e, t, n) => {
					G(r, `${e ?? ""} `), Si(o, t), G(s, ` ${n ?? ""}`);
				}, [
					() => Z("lbl.tableLines"),
					() => !!V(M).props.striped,
					() => Z("lbl.tableStriped")
				]), H("change", o, (e) => F("striped", e.target.checked)), W(e, t);
			}, u = (e) => {
				var t = sd(), n = L(t), r = I(n), i = z(r);
				{
					let e = /* @__PURE__ */ A(() => V(M).props.variant ?? "icons"), t = /* @__PURE__ */ A(() => [["icons", Z("opt.share.icons")], ["labels", Z("opt.share.labels")]]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => F("variant", e)
					});
				}
				D(n);
				var a = z(n, 2), o = I(a), s = z(o);
				J(s), D(a);
				var c = z(a, 2), l = I(c), u = z(l);
				{
					let e = /* @__PURE__ */ A(() => V(M).props.color || "accent"), t = /* @__PURE__ */ A(Hr);
					ha(u, {
						get value() {
							return V(e);
						},
						get tokens() {
							return V(t);
						},
						onchange: (e) => F("color", e === "accent" ? "" : e)
					});
				}
				D(c), Oe(2), B((e, t, n) => {
					G(r, `${e ?? ""} `), G(o, `${t ?? ""} `), Y(s, V(M).props.size ?? 38), G(l, `${n ?? ""} `);
				}, [
					() => Z("lbl.variant"),
					() => Z("lbl.size"),
					() => Z("lbl.color")
				]), H("change", s, (e) => F("size", Number(e.target.value) || 38)), W(e, t);
			}, d = (e) => {
				var t = od(), n = L(t), r = I(n), i = z(r);
				{
					let e = /* @__PURE__ */ A(() => V(M).props.variant ?? "boxes"), t = /* @__PURE__ */ A(() => [["boxes", Z("opt.countdown.boxes")], ["plain", Z("opt.countdown.plain")]]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => F("variant", e)
					});
				}
				D(n);
				var a = z(n, 2), o = I(a);
				J(o);
				var s = z(o);
				D(a), Oe(2), B((e, t) => {
					G(r, `${e ?? ""} `), Si(o, V(M).props.showSeconds !== !1), G(s, ` ${t ?? ""}`);
				}, [() => Z("lbl.variant"), () => Z("lbl.countdownSeconds")]), H("change", o, (e) => F("showSeconds", e.target.checked)), W(e, t);
			}, f = (e) => {
				var t = cd(), n = L(t), r = I(n), i = z(r);
				{
					let e = /* @__PURE__ */ A(() => [["primary", Z("opt.btn.primary")], ["secondary", Z("opt.btn.secondary")]]);
					Q(i, {
						get value() {
							return V(M).props.style;
						},
						get options() {
							return V(e);
						},
						onchange: (e) => F("style", e)
					});
				}
				D(n), Oe(2), B((e) => G(r, `${e ?? ""} `), [() => Z("lbl.style")]), W(e, t);
			}, p = (e) => {
				var t = ld(), n = L(t), r = I(n), i = z(r);
				{
					let e = /* @__PURE__ */ A(() => V(M).props.fit ?? "cover"), t = /* @__PURE__ */ A(() => [["cover", Z("opt.fitFrame.cover")], ["contain", Z("opt.fitFrame.contain")]]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => F("fit", e)
					});
				}
				D(n);
				var a = z(n, 2), o = I(a), s = z(o);
				{
					let e = /* @__PURE__ */ A(() => V(M).props.radius ?? ""), t = /* @__PURE__ */ A(() => [
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
						onchange: (e) => F("radius", e || null)
					});
				}
				D(a);
				var c = z(a, 2), l = I(c), u = R(z(l));
				D(c);
				var d = z(c, 2);
				J(d);
				var f = z(d, 2), p = I(f), m = R(z(p));
				D(f);
				var h = z(f, 2);
				J(h);
				var g = z(h, 2), _ = I(g), v = R(z(_));
				D(g);
				var y = z(g, 2);
				J(y);
				var b = z(y, 2), x = I(b), S = R(z(x));
				D(b);
				var C = z(b, 2);
				J(C);
				var w = z(C, 2), T = I(w), ee = R(z(T));
				D(w);
				var te = z(w, 2);
				J(te);
				var ne = z(te, 2), E = I(ne), re = R(z(E));
				D(ne);
				var ie = z(ne, 2);
				J(ie);
				var ae = z(ie, 2), oe = R(ae, !0);
				Oe(2), B((e, t, n, i, a, s, c, f, b, w, ne, se, ce, le, ue, de, fe) => {
					G(r, `${e ?? ""} `), G(o, `${t ?? ""} `), G(l, `${n ?? ""} `), G(u, `${i ?? ""}%`), Y(d, V(M).props.x ?? .5), G(p, `${a ?? ""} `), G(m, `${s ?? ""}%`), Y(h, V(M).props.y ?? .5), X(g, "title", c), G(_, `${f ?? ""} `), G(v, `${b ?? ""}x`), Y(y, V(M).props.zoom ?? 1), G(x, `${w ?? ""} `), G(S, `${ne ?? ""}%`), Y(C, V(M).props.brightness ?? 1), G(T, `${se ?? ""} `), G(ee, `${ce ?? ""}%`), Y(te, V(M).props.contrast ?? 1), G(E, `${le ?? ""} `), G(re, `${ue ?? ""}%`), Y(ie, V(M).props.saturate ?? 1), X(ae, "title", de), G(oe, fe);
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
				]), H("input", d, (e) => F("x", Number(e.target.value))), H("input", h, (e) => F("y", Number(e.target.value))), H("input", y, (e) => F("zoom", Number(e.target.value))), H("input", C, (e) => F("brightness", Number(e.target.value))), H("input", te, (e) => F("contrast", Number(e.target.value))), H("input", ie, (e) => F("saturate", Number(e.target.value))), H("click", ae, () => Yt(`edit:${V(M).blockId}`, (e) => {
					e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
				})), W(e, t);
			}, m = (e) => {
				var t = ud(), n = L(t), r = I(n), i = z(r);
				J(i), D(n);
				var a = z(n, 2), o = I(a), s = z(o);
				{
					let e = /* @__PURE__ */ A(() => V(M).props.color ?? "accent"), t = /* @__PURE__ */ A(Hr);
					ha(s, {
						get value() {
							return V(e);
						},
						get tokens() {
							return V(t);
						},
						onchange: (e) => F("color", e)
					});
				}
				D(a), Oe(2), B((e, t, n) => {
					G(r, `${e ?? ""} `), Y(i, V(M).props.size ?? 48), X(a, "title", t), G(o, `${n ?? ""} `);
				}, [
					() => Z("lbl.sizePx"),
					() => Z("hint.icon.color"),
					() => Z("lbl.color")
				]), H("change", i, (e) => F("size", Number(e.target.value))), W(e, t);
			}, h = (e) => {
				var t = cd(), n = L(t), r = I(n), i = z(r);
				{
					let e = /* @__PURE__ */ A(() => V(M).props.view ?? "cards"), t = /* @__PURE__ */ A(() => [
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
						onchange: (e) => F("view", e)
					});
				}
				D(n), Oe(2), B((e) => G(r, `${e ?? ""} `), [() => Z("lbl.view")]), W(e, t);
			}, g = (e) => {
				var t = dd(), n = L(t), r = I(n), i = z(r);
				J(i), D(n), Oe(2), B((e, t) => {
					X(n, "title", e), G(r, `${t ?? ""} `), Y(i, V(M).props.columns ?? 0);
				}, [() => Z("tip.product.columns"), () => Z("lbl.columns")]), H("change", i, (e) => F("columns", Number(e.target.value))), W(e, t);
			}, _ = (e) => {
				var t = cd(), n = L(t), r = I(n), i = z(r);
				{
					let e = /* @__PURE__ */ A(() => V(M).props.variant ?? "button"), t = /* @__PURE__ */ A(() => [["button", Z("opt.cart.button")], ["icon", Z("opt.cart.icon")]]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => F("variant", e)
					});
				}
				D(n), Oe(2), B((e) => G(r, `${e ?? ""} `), [() => Z("lbl.view")]), W(e, t);
			}, v = (e) => {
				var t = md(), n = L(t), r = I(n), i = z(r);
				{
					let e = /* @__PURE__ */ A(() => V(M).props.view ?? "grid"), t = /* @__PURE__ */ A(() => [
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
						onchange: (e) => F("view", e)
					});
				}
				D(n);
				var a = z(n, 2), o = (e) => {
					var t = fd(), n = L(t), r = I(n), i = z(r);
					J(i), D(n);
					var a = z(n, 2), o = I(a), s = R(z(o));
					D(a);
					var c = z(a, 2);
					J(c), B((e, t) => {
						G(r, `${e ?? ""} `), Y(i, V(M).props.columns ?? 3), G(o, `${t ?? ""} `), G(s, `${V(M).props.gap ?? 12 ?? ""} px`), Y(c, V(M).props.gap ?? 12);
					}, [() => Z("lbl.columns"), () => Z("lbl.imageGap")]), H("change", i, (e) => F("columns", Number(e.target.value))), H("input", c, (e) => F("gap", Number(e.target.value))), W(e, t);
				};
				K(a, (e) => {
					(V(M).props.view ?? "grid") === "grid" && e(o);
				});
				var s = z(a, 2), c = (e) => {
					var t = pd(), n = I(t), r = z(n);
					J(r), D(t), B((e) => {
						G(n, `${e ?? ""} `), Y(r, V(M).props.interval ?? 5);
					}, [() => Z("lbl.secondsPerImage")]), H("change", r, (e) => F("interval", Number(e.target.value))), W(e, t);
				};
				K(s, (e) => {
					V(M).props.view === "slides" && e(c);
				});
				var l = z(s, 2), u = I(l), d = z(u);
				{
					let e = /* @__PURE__ */ A(() => V(M).props.radius ?? ""), t = /* @__PURE__ */ A(() => [
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
						onchange: (e) => F("radius", e || null)
					});
				}
				D(l);
				var f = z(l, 2), p = I(f);
				J(p);
				var m = z(p);
				D(f), Oe(2), B((e, t, n, i) => {
					G(r, `${e ?? ""} `), G(u, `${t ?? ""} `), X(f, "title", n), Si(p, V(M).props.lightbox !== !1), G(m, ` ${i ?? ""}`);
				}, [
					() => Z("lbl.view"),
					() => Z("lbl.radius"),
					() => Z("tip.lightbox"),
					() => Z("lbl.lightbox")
				]), H("change", p, (e) => F("lightbox", e.target.checked)), W(e, t);
			}, y = (e) => {
				var t = gd(), n = L(t), r = I(n);
				Q(z(r), {
					get value() {
						return V(M).props.color;
					},
					get options() {
						return Rn;
					},
					onchange: (e) => F("color", e)
				}), D(n);
				var i = z(n, 2), a = I(i), o = z(a);
				J(o), D(i);
				var s = z(i, 2), c = (e) => {
					var t = hd(), n = I(t), r = z(n);
					J(r), D(t), B((e, t) => {
						G(n, `${e ?? ""} `), X(r, "max", t), Y(r, V(M).frame.w);
					}, [() => Z("lbl.length"), () => Math.max(1, Math.round(100 - V(M).frame.x))]), H("change", r, (e) => ln("w", Math.max(1, Math.min(Number(e.target.value), 100 - V(M).frame.x)))), W(e, t);
				};
				K(s, (e) => {
					(V(M).props.kind === "line" || V(M).props.kind === "arrow") && e(c);
				});
				var l = z(s, 2), u = I(l);
				J(u);
				var d = z(u);
				D(l), Oe(2), B((e, t, n, i, s) => {
					G(r, `${e ?? ""} `), G(a, `${t ?? ""} `), Y(o, V(M).props.thickness), X(l, "title", n), Si(u, i), G(d, ` ${s ?? ""}`);
				}, [
					() => Z("lbl.color"),
					() => Z("lbl.thickness"),
					() => Z("tip.shape.fill"),
					() => !!V(M).props.fill,
					() => Z("lbl.filled")
				]), H("change", o, (e) => F("thickness", Number(e.target.value))), H("change", u, (e) => F("fill", e.target.checked ? V(M).props.color : null)), W(e, t);
			};
			K(n, (e) => {
				V(M).type === "text" ? e(r) : V(M).type === "faq" ? e(a, 1) : V(M).type === "timeline" ? e(o, 2) : V(M).type === "quote" ? e(s, 3) : V(M).type === "stats" ? e(c, 4) : V(M).type === "table" ? e(l, 5) : V(M).type === "share" ? e(u, 6) : V(M).type === "countdown" ? e(d, 7) : V(M).type === "button" ? e(f, 8) : V(M).type === "image" ? e(p, 9) : V(M).type === "icon" ? e(m, 10) : V(M).type === "collection" ? e(h, 11) : V(M).type === "product" ? e(g, 12) : V(M).type === "cart" ? e(_, 13) : V(M).type === "gallery" ? e(v, 14) : V(M).type === "shape" && e(y, 15);
			});
			var b = z(n, 2), x = I(b), S = z(x);
			{
				let e = /* @__PURE__ */ A(() => V(M).fit === "shrink" ? "shrink" : "wrap"), t = /* @__PURE__ */ A(() => Zt.has(V(M).type) ? [["wrap", Z("opt.fit.fluid")], ["shrink", Z("opt.fit.floor")]] : [["wrap", Z("opt.fit.wrap")], ["shrink", Z("opt.fit.shrink")]]);
				Q(S, {
					get value() {
						return V(e);
					},
					get options() {
						return V(t);
					},
					onchange: (e) => Qt(e)
				});
			}
			D(b);
			var C = z(b, 2), w = (e) => {
				var t = _d(), n = I(t), r = R(n, !0), i = z(n, 2);
				J(i);
				var a = R(z(i, 2));
				D(t), B((e, n, o, s) => {
					X(t, "title", e), G(r, n), Y(i, o), G(a, `${s ?? ""} %`);
				}, [
					() => Z("tip.fitMin"),
					() => Z("lbl.fitMin"),
					() => Math.round((V(M).fitMin ?? .6) * 100),
					() => Math.round((V(M).fitMin ?? .6) * 100)
				]), H("input", i, (e) => tn(e.target.valueAsNumber / 100)), W(e, t);
			};
			K(C, (e) => {
				V(M).fit === "shrink" && e(w);
			});
			var T = z(C, 4), ee = I(T), te = z(ee);
			{
				let e = /* @__PURE__ */ A(() => Qr(V(M).animation) ? V(M).animation.type : "");
				Q(te, {
					get value() {
						return V(e);
					},
					get options() {
						return ei;
					},
					onchange: (e) => ri(e || null)
				});
			}
			D(T);
			var ne = z(T, 2), E = (e) => {
				var t = vd(), n = L(t), r = I(n), i = z(r);
				J(i), D(n);
				var a = z(n, 2), o = I(a), s = z(o);
				J(s), D(a), B((e, t) => {
					G(r, `${e ?? ""} `), Y(i, V(M).animation.props.duration), G(o, `${t ?? ""} `), Y(s, V(M).animation.props.delay);
				}, [() => Z("lbl.durationMs"), () => Z("lbl.delayMs")]), H("change", i, (e) => ai("duration", Number(e.target.value))), H("change", s, (e) => ai("delay", Number(e.target.value))), W(e, t);
			}, re = /* @__PURE__ */ A(() => Qr(V(M).animation));
			K(ne, (e) => {
				V(re) && e(E);
			});
			var ie = z(ne, 2), ae = I(ie), oe = z(ae);
			{
				let e = /* @__PURE__ */ A(() => V(M).hover?.type ?? (V(M).animation && !Qr(V(M).animation) ? V(M).animation.type : ""));
				Q(oe, {
					get value() {
						return V(e);
					},
					get options() {
						return ti;
					},
					onchange: (e) => ii(e || null)
				});
			}
			D(ie);
			var se = z(ie, 2), ce = (e) => {
				var t = xd(), n = z(L(t), 2), r = I(n);
				J(r);
				var i = z(r);
				D(n);
				var a = z(n, 2), o = (e) => {
					var t = bd(), n = L(t), r = I(n), i = z(r);
					{
						let e = /* @__PURE__ */ A(() => V(M).sticky.mode ?? "scroll"), t = /* @__PURE__ */ A(() => [["scroll", Z("opt.sticky.modeScroll")], ["screen", Z("opt.sticky.modeScreen")]]);
						Q(i, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => Yt(`edit:${V(M).blockId}`, (t) => {
								t.sticky = {
									...t.sticky,
									mode: e
								};
							})
						});
					}
					D(n);
					var a = z(n, 2), o = (e) => {
						var t = yd(), n = I(t), r = z(n);
						J(r), D(t), B((e, i) => {
							X(t, "title", e), G(n, `${i ?? ""} `), Y(r, V(M).sticky.offset ?? 16);
						}, [() => V(M).sticky.mode === "screen" ? Z("tip.stickyEdge") : Z("tip.stickyOffset"), () => V(M).sticky.mode === "screen" ? Z("lbl.stickyEdge") : Z("lbl.stickyOffset")]), H("change", r, (e) => Yt(`edit:${V(M).blockId}`, (t) => {
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
						var t = mu(), n = I(t), r = z(n);
						{
							let e = /* @__PURE__ */ A(() => V(M).sticky.dock ?? "bottom-right"), t = /* @__PURE__ */ A(() => Kt.map(([e, t]) => [e, Z(t)]));
							Q(r, {
								get value() {
									return V(e);
								},
								get options() {
									return V(t);
								},
								onchange: (e) => Yt(`edit:${V(M).blockId}`, (t) => {
									t.sticky = {
										...t.sticky,
										dock: e
									};
								})
							});
						}
						D(t), B((e, r) => {
							X(t, "title", e), G(n, `${r ?? ""} `);
						}, [() => Z("tip.stickyDock"), () => Z("lbl.stickyDock")]), W(e, t);
					}, l = (e) => {
						var t = mu(), n = I(t), r = z(n);
						{
							let e = /* @__PURE__ */ A(() => V(M).sticky.until ?? ""), t = /* @__PURE__ */ A(qt);
							Q(r, {
								get value() {
									return V(e);
								},
								get options() {
									return V(t);
								},
								onchange: (e) => Yt(`edit:${V(M).blockId}`, (t) => {
									t.sticky = {
										...t.sticky,
										until: e || null
									};
								})
							});
						}
						D(t), B((e, r) => {
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
					X(n, "title", e), Si(r, t), G(i, ` ${a ?? ""}`);
				}, [
					() => Z("tip.sticky"),
					() => !!V(M).sticky,
					() => Z("lbl.sticky")
				]), H("change", r, (e) => Yt(`edit:${V(M).blockId}`, (t) => {
					t.sticky = e.target.checked ? {
						offset: 16,
						until: null
					} : null;
				})), W(e, t);
			};
			K(se, (e) => {
				V(be) === "desktop" && e(ce);
			});
			var le = z(se, 4), ue = I(le), de = R(ue, !0), fe = z(ue, 2), pe = I(fe), me = (e) => {
				var t = Sd(), n = I(t), r = I(n, !0), i = z(r);
				J(i), D(n);
				var a = z(n, 2), o = I(a, !0), s = z(o);
				J(s), D(a);
				var c = z(a, 2), l = I(c, !0), u = z(l);
				J(u), D(c);
				var d = z(c, 2), f = I(d, !0), p = z(f);
				J(p), D(d);
				var m = z(d, 2), h = I(m, !0), g = z(h);
				J(g), D(m);
				var _ = z(m, 2), v = I(_, !0), y = z(v);
				J(y), D(_), D(t), B((e, t, n, a, c, d, _) => {
					G(r, e), Y(i, V(M).frame.x), G(o, t), Y(s, V(M).frame.y), G(l, n), Y(u, V(M).frame.w), G(f, a), Y(p, V(M).frame.h), X(m, "title", c), G(h, d), Y(g, V(M).frame.z ?? 1), G(v, _), Y(y, V(M).frame.rot ?? 0);
				}, [
					() => Z("frame.x"),
					() => Z("frame.y"),
					() => Z("frame.w"),
					() => Z("frame.h"),
					() => Z("tip.frameZ"),
					() => Z("frame.z"),
					() => Z("frame.rot")
				]), H("change", i, (e) => ln("x", Number(e.target.value))), H("change", s, (e) => ln("y", Number(e.target.value))), H("change", u, (e) => ln("w", Number(e.target.value))), H("change", p, (e) => ln("h", Number(e.target.value))), H("change", g, (e) => ln("z", Number(e.target.value))), H("change", y, (e) => ln("rot", Number(e.target.value))), W(e, t);
			};
			K(pe, (e) => {
				V(be) === "desktop" && e(me);
			});
			var he = z(pe, 2), ge = I(he);
			J(ge);
			var _e = z(ge);
			D(he);
			var ve = z(he, 2), ye = I(ve);
			J(ye);
			var xe = z(ye);
			D(ve), D(fe), D(le), B((e, t, n, r, i, a, o, s, c, l, u, d) => {
				X(b, "title", e), G(x, `${t ?? ""} `), X(T, "title", n), G(ee, `${r ?? ""} `), X(ie, "title", i), G(ae, `${a ?? ""} `), X(ue, "title", o), G(de, s), X(he, "title", c), Si(ge, V(M).hideMobile), G(_e, ` ${l ?? ""}`), X(ve, "title", u), Si(ye, V(M).decor), G(xe, ` ${d ?? ""}`);
			}, [
				() => Z("tip.fit"),
				() => Z("lbl.fit"),
				() => Z("tip.props.blockAnim"),
				() => Z("lbl.animIn"),
				() => Z("tip.props.blockHover"),
				() => Z("lbl.onHover"),
				() => Z("hint.placement"),
				() => Z("group.placement"),
				() => Z("tip.hideMobile"),
				() => Z("lbl.hideMobile"),
				() => Z("tip.decor"),
				() => Z("lbl.decor")
			]), H("change", ge, (e) => Nn(e.target.checked)), H("change", ye, (e) => kn(e.target.checked)), W(e, t);
		};
		K(d, (e) => {
			V(on) === "content" ? e(f) : e(p, -1);
		}), B((e, t) => {
			o = hi(a, 1, "svelte-1n46o8q", null, o, { on: V(on) === "content" }), G(s, e), l = hi(c, 1, "svelte-1n46o8q", null, l, { on: V(on) === "style" }), G(u, t);
		}, [() => Z("props.tabContent"), () => Z("props.tabStyle")]), H("click", a, () => P(on, "content")), H("click", c, () => P(on, "style")), W(e, t);
	}, o = (e) => `<svg width="40" height="26" viewBox="0 0 40 26" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${e}</svg>`, s = {
		bar: o("<rect x=\"1\" y=\"1\" width=\"38\" height=\"7\" rx=\"1\"/><rect x=\"1\" y=\"11\" width=\"38\" height=\"14\" rx=\"1\" stroke-opacity=\"0.35\"/>"),
		floating: o("<rect x=\"5\" y=\"2\" width=\"30\" height=\"7\" rx=\"3.5\"/><rect x=\"1\" y=\"11\" width=\"38\" height=\"14\" rx=\"1\" stroke-opacity=\"0.35\"/>"),
		"floating-square": o("<rect x=\"5\" y=\"2\" width=\"30\" height=\"7\"/><rect x=\"1\" y=\"11\" width=\"38\" height=\"14\" rx=\"1\" stroke-opacity=\"0.35\"/>"),
		"floating-tab": o("<path d=\"M5 1h30v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z\"/><rect x=\"1\" y=\"11\" width=\"38\" height=\"14\" rx=\"1\" stroke-opacity=\"0.35\"/>"),
		"side-left": o("<rect x=\"1\" y=\"1\" width=\"9\" height=\"24\" rx=\"1\"/><rect x=\"13\" y=\"1\" width=\"26\" height=\"24\" rx=\"1\" stroke-opacity=\"0.35\"/>"),
		"side-right": o("<rect x=\"30\" y=\"1\" width=\"9\" height=\"24\" rx=\"1\"/><rect x=\"1\" y=\"1\" width=\"26\" height=\"24\" rx=\"1\" stroke-opacity=\"0.35\"/>")
	}, c = {
		"": o("<rect x=\"1\" y=\"4\" width=\"38\" height=\"18\" rx=\"1\" stroke-opacity=\"0.35\"/>"),
		bottom: o("<rect x=\"1\" y=\"4\" width=\"38\" height=\"18\" rx=\"1\" stroke-opacity=\"0.35\"/><path d=\"M1 22h38\" stroke-width=\"2.5\"/>"),
		top: o("<rect x=\"1\" y=\"4\" width=\"38\" height=\"18\" rx=\"1\" stroke-opacity=\"0.35\"/><path d=\"M1 4h38\" stroke-width=\"2.5\"/>"),
		both: o("<rect x=\"1\" y=\"4\" width=\"38\" height=\"18\" rx=\"1\" stroke-opacity=\"0.35\"/><path d=\"M1 4h38M1 22h38\" stroke-width=\"2.5\"/>"),
		all: o("<rect x=\"1\" y=\"4\" width=\"38\" height=\"18\" rx=\"1\" stroke-width=\"2.5\"/>")
	}, l = (e) => `<svg width="48" height="34" viewBox="0 0 48 34" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${e}</svg>`, u = {
		card: l("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><rect x=\"10\" y=\"6\" width=\"28\" height=\"24\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.18\"/><path d=\"M15 13h18M15 19h14M15 25h16\" stroke-opacity=\"0.8\"/>"),
		flat: l("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><rect x=\"1\" y=\"6\" width=\"46\" height=\"24\" fill=\"currentColor\" fill-opacity=\"0.12\" stroke=\"none\"/><path d=\"M15 13h18M15 19h14M15 25h16\" stroke-opacity=\"0.8\"/>"),
		pills: l("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><rect x=\"10\" y=\"7\" width=\"28\" height=\"6\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.35\" stroke=\"none\"/><rect x=\"10\" y=\"16\" width=\"28\" height=\"6\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.2\" stroke=\"none\"/><rect x=\"10\" y=\"25\" width=\"28\" height=\"6\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.2\" stroke=\"none\"/>"),
		lines: l("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><path d=\"M12 12h24M12 21h24M12 30h24\" stroke-opacity=\"0.8\"/>"),
		flyout: l("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><rect x=\"1\" y=\"6\" width=\"46\" height=\"24\" fill=\"currentColor\" fill-opacity=\"0.12\" stroke=\"none\"/><path d=\"M6 13h10M6 19h8M22 13h10M22 19h8M38 13h6M38 19h4\" stroke-opacity=\"0.8\"/>")
	}, d = /* @__PURE__ */ N("");
	function p() {
		V(d).trim() && (P(fa, V(d), !0), P(pa, null), Sa(), P(d, ""));
	}
	let m = [
		["color", Gc],
		["gradient", rl],
		["glow", il],
		["image", Al],
		["slideshow", Fl],
		["video", Vl],
		["grain", ol]
	], g = Object.fromEntries(m), _ = {
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
		foldToggle: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path class=\"ft-top\" d=\"M7 9l5-5 5 5\"/><path class=\"ft-bot\" d=\"M7 15l5 5 5-5\"/></svg>",
		caret: "<svg width=\"9\" height=\"9\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6 9l6 6 6-6\"/></svg>",
		external: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14 4h6v6\"/><path d=\"M20 4l-8 8\"/><path d=\"M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5\"/></svg>",
		device_desktop: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2\" y=\"3\" width=\"20\" height=\"13\" rx=\"2\"/><path d=\"M8 21h8M12 16v5\"/></svg>",
		device_laptop: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"4\" y=\"4\" width=\"16\" height=\"11\" rx=\"1.5\"/><path d=\"M2 19h20\"/></svg>",
		device_tablet: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"5\" y=\"2\" width=\"14\" height=\"20\" rx=\"2\"/><path d=\"M11 18.5h2\"/></svg>",
		device_mobile: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"7\" y=\"2\" width=\"10\" height=\"20\" rx=\"2\"/><path d=\"M11 18.5h2\"/></svg>"
	}, v = [
		["purple", Z("adminTheme.purple")],
		["well", Z("adminTheme.well")],
		["gold", Z("adminTheme.gold")],
		["grey", Z("adminTheme.grey")],
		["aurora", Z("adminTheme.aurora")],
		["dusk", Z("adminTheme.dusk")],
		["ember", Z("adminTheme.ember")]
	], y = {
		lilla: "purple",
		bronn: "well",
		gull: "gold",
		graa: "grey",
		nordlys: "aurora",
		skumring: "dusk",
		glo: "ember"
	}, b = /* @__PURE__ */ N($t((() => {
		let e = localStorage.getItem("urd-admin-theme");
		return y[e] ?? e ?? "grey";
	})()));
	bn(() => {
		document.documentElement.dataset.adminTheme = V(b), localStorage.setItem("urd-admin-theme", V(b)), x();
	});
	function x() {
		let e = getComputedStyle(document.documentElement), t = e.getPropertyValue("--urd-color-accent").trim();
		Ue?.sendAdminTheme({
			bg: e.getPropertyValue("--urd-color-bg").trim(),
			surface: e.getPropertyValue("--urd-color-surface").trim(),
			accent: t,
			text: e.getPropertyValue("--urd-color-text").trim(),
			"accent-text": S(t)
		});
	}
	function S(e) {
		return Uc(e) == null || (Wc(e, "#ffffff") ?? 0) >= (Wc(e, "#0b0e14") ?? 0) ? "#ffffff" : "#0b0e14";
	}
	let C = /* @__PURE__ */ N(null), w = /* @__PURE__ */ N(null), T = /* @__PURE__ */ N(!1), ee = /* @__PURE__ */ N(""), te = /* @__PURE__ */ N("info"), ne = 0;
	function E(e, t = "info") {
		P(ee, e, !0), P(te, t, !0);
		let n = ++ne;
		t === "ok" && setTimeout(() => {
			ne === n && (P(ee, ""), P(te, "info"));
		}, 8e3);
	}
	function re() {
		E(Z("status.storageFull"), "error");
	}
	function ie(e, t) {
		try {
			localStorage.setItem(e, t);
		} catch {
			re();
		}
	}
	let ae = /* @__PURE__ */ N(null), oe = /* @__PURE__ */ N(null), se = /* @__PURE__ */ N($t({
		size: 16,
		snap: !0
	})), ce = /* @__PURE__ */ N(!0), le = /* @__PURE__ */ N($t(po(typeof window < "u" ? window : null) ?? 1920)), ue = "urd-admin-screen";
	function de() {
		let e = null;
		try {
			e = JSON.parse(localStorage.getItem(ue) ?? "null");
		} catch {
			e = null;
		}
		return mo(e, V(le));
	}
	let fe = /* @__PURE__ */ N($t(de()));
	function pe(e) {
		P(fe, mo({
			...We(V(fe)),
			...e
		}, V(le)), !0);
		try {
			localStorage.setItem(ue, JSON.stringify(V(fe)));
		} catch {}
	}
	let me = /* @__PURE__ */ A(() => ho(V(fe), V(le))), he = [
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
	], ge = /* @__PURE__ */ A(() => [{
		id: "desktop",
		width: V(me).width,
		height: V(me).height || null,
		viewport: "desktop"
	}, ...he]);
	function _e(e) {
		let t = Co(V(to), V(io), e.width).width;
		return Z(e.id === "desktop" ? V(fe).mode === "own" ? "tip.view.desktop" : e.height ? "tip.view.desktopSizeH" : "tip.view.desktopSize" : `tip.view.${e.id}`, {
			w: e.width,
			h: e.height ?? 0,
			c: t
		});
	}
	let ve = /* @__PURE__ */ N("desktop"), ye = /* @__PURE__ */ A(() => V(ge).find((e) => e.id === V(ve)) ?? V(ge)[0]), be = /* @__PURE__ */ A(() => V(ye).viewport === "mobile" || V(ye).width <= (V(k)?.breakpoints?.mobile ?? 640) ? "mobile" : "desktop"), xe = /* @__PURE__ */ N(null), Se = /* @__PURE__ */ N(0), Ce = /* @__PURE__ */ N(0), we = /* @__PURE__ */ N("fit"), Te = /* @__PURE__ */ N(1), Ee = /* @__PURE__ */ A(() => So(V(to), V(io))), De = /* @__PURE__ */ A(() => V(ye).width), ke = /* @__PURE__ */ A(() => V(ye).height ?? 0), Ae = /* @__PURE__ */ A(() => V(we) === "manual" ? V(Te) : ao(V(Se), V(De), "fit", V(Ce), V(ke)));
	function je(e) {
		let t = Math.min(400, Math.max(10, (Math.round(Math.round(V(Ae) * 100) / 10) + e) * 10));
		P(Te, t / 100), P(we, "manual");
	}
	let Me = /* @__PURE__ */ A(() => V(ke) > 0 ? V(ke) : V(Ae) > 0 ? V(Ce) / V(Ae) : V(Ce)), Ne = /* @__PURE__ */ A(() => V(De) * V(Ae)), Pe = /* @__PURE__ */ A(() => V(ke) > 0 ? V(ke) * V(Ae) : V(Ce)), Fe = /* @__PURE__ */ A(() => V(Ne) > V(Se) + 1 || V(Pe) > V(Ce) + 1);
	bn(() => {
		let e = () => Ue?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), bn(() => {
		let e = V(be);
		Ue?.sendViewport(e);
	}), bn(() => {
		let e = V(Ae);
		Ue?.sendZoom(e);
	}), bn(() => {
		let e = () => {
			P(le, po(window) ?? V(le), !0);
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}), bn(() => {
		let e = V(xe);
		if (!e || typeof ResizeObserver > "u") return;
		let t = () => {
			P(Se, e.clientWidth, !0), P(Ce, e.clientHeight, !0);
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	});
	let Ie = /* @__PURE__ */ N(0);
	function Le() {
		P(Ie, O?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function Re() {
		let e = O?.data.sections.find((e) => e.responsive?.mobile?.attention?.needed);
		P(ve, "mobile"), e && setTimeout(() => Ue?.sendScrollSection(e.id), 0);
	}
	function ze(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			nt("layout");
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
			}, Ve(t, "layout-changed"), e.sectionId === V(zn) && P(Vn, e.minHeight, !0), V(M)?.sectionId === e.sectionId && Ht(), O.save(), Ze(), Ue?.sendSection(V(w), t);
		}
	}
	function Be(e) {
		return e?.blocks?.some((e) => e.frames?.mobile) ?? !1;
	}
	function Ve(e, t) {
		!e || !Be(e) || e.responsive?.mobile?.attention?.needed || (e.responsive = {
			...e.responsive ?? {},
			mobile: {
				...e.responsive?.mobile ?? { mode: "auto" },
				attention: {
					needed: !0,
					reason: t,
					since: (/* @__PURE__ */ new Date()).toISOString()
				}
			}
		}, Le(), Ue?.sendAttention(e.id, !0));
	}
	let O = null, He = null, Ue = null, k = /* @__PURE__ */ N(null);
	function Ge() {
		P(k, He.data, !0), He.replace(V(k));
	}
	function Ke() {
		Ue?.sendSite(We(V(k)));
	}
	let qe = /* @__PURE__ */ new Set(), Xe = () => V(k).pages.find((e) => e.id === V(w));
	function Ze() {
		let e = V(k)?.pages?.some((e) => !qe.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = ks?.hasDraft() || Object.values(As).some((e) => e.hasDraft()), n = zs?.hasDraft() || Object.values(Bs).some((e) => e.hasDraft());
		P(T, e || O?.hasDraft() && !qe.has(V(w)) || He?.hasDraft() || Mc?.hasDraft() || t || n || !1, !0);
	}
	let Qe = [], $e = [], et = null;
	function tt() {
		return JSON.stringify({
			pageId: V(w),
			page: O.data,
			site: He.data,
			collectionsIndex: Ms ? ks.data : null,
			collections: Ms ? Object.fromEntries(Object.entries(As).map(([e, t]) => [e, t.data])) : {},
			templatesIndex: Hs ? zs.data : null,
			templates: Hs ? Object.fromEntries(Object.entries(Bs).map(([e, t]) => [e, t.data])) : {},
			plugins: Mc?.data ?? null
		});
	}
	function nt(e) {
		e === et && (e.startsWith("edit:") || e.startsWith("grid:")) || (Qe.push(tt()), Qe.length > 50 && Qe.shift(), $e.length = 0, et = e);
	}
	function rt(e) {
		let { pageId: t, page: n, site: r, collectionsIndex: i, collections: a, templatesIndex: o, templates: s, plugins: c } = JSON.parse(e);
		if (He.replace(r), Ge(), He.save(), P(se, {
			snap: !0,
			...V(k).grid
		}, !0), Ke(), it(i, a ?? {}), at(o, s ?? {}), ot(c), t && t !== V(w) && V(k).pages.some((e) => e.id === t)) {
			ie(`urd-draft-${t}`, JSON.stringify(n)), qi(t, { keepHistory: !0 }), Ze();
			return;
		}
		O.replace(n), O.save(), Ze(), Le(), Ht(), Kn(O.data.sections.find((e) => e.id === V(zn))), V(k).pages.some((e) => e.id === V(w)) ? Ue?.sendPage(V(w), O.data) : qi(V(k).pages[0].id, { keepHistory: !0 });
	}
	function it(e, t) {
		if (!(!ks || !e) && JSON.stringify({
			index: ks.data,
			collections: Object.fromEntries(Object.entries(As).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			collections: t
		})) {
			ks.replace(e), ks.save();
			for (let e of Object.keys(As)) e in t || (localStorage.removeItem(`urd-draft-collection-${e}`), localStorage.removeItem(`urd-draft-samling-${e}`), delete As[e]);
			for (let [e, n] of Object.entries(t)) {
				if (!As[e]) {
					let t = js[e] ?? null;
					As[e] = Zi(`urd-draft-collection-${e}`, () => t, re, `urd-draft-samling-${e}`);
				}
				As[e].replace(n), As[e].save();
			}
			P(Ns, [...e.samlinger ?? []], !0), V(Fs) && !V(Ns).includes(V(Fs)) && P(Fs, null), sc();
		}
	}
	function at(e, t) {
		if (!(!zs || !e) && JSON.stringify({
			index: zs.data,
			templates: Object.fromEntries(Object.entries(Bs).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			templates: t
		})) {
			zs.replace(e), zs.save();
			for (let e of Object.keys(Bs)) e in t || (localStorage.removeItem(`urd-draft-template-${e}`), localStorage.removeItem(`urd-draft-mal-${e}`), delete Bs[e]);
			for (let [e, n] of Object.entries(t)) Bs[e] || (Bs[e] = Zi(`urd-draft-template-${e}`, () => Vs[e] ?? null, re, `urd-draft-mal-${e}`)), Bs[e].replace(n), Bs[e].save();
			P(Us, [...e.maler ?? []], !0), Ze(), Gs();
		}
	}
	function ot(e) {
		!Mc || !e || JSON.stringify(Mc.data) !== JSON.stringify(e) && (Mc.replace(e), Mc.save(), el(), fl());
	}
	function st() {
		Qe.length && ($e.push(tt()), rt(Qe.pop()), et = null, E(Z("status.undone")));
	}
	function ct() {
		$e.length && (Qe.push(tt()), rt($e.pop()), et = null, E(Z("status.redone")));
	}
	function dt(e) {
		V(Wt) && (e.target instanceof Element && e.target.closest(".block-menu") || P(Wt, null));
	}
	function ft(e) {
		if (e.key === "Escape" && V(Wt)) {
			P(Wt, null);
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
			].includes(t.type)) || !V(M) || V(be) === "mobile") return;
			e.preventDefault(), Ue?.sendDuplicate();
			return;
		}
		if (t !== "z" && t !== "y") return;
		let n = e.target;
		n instanceof HTMLElement && (n.isContentEditable || n.tagName === "TEXTAREA" || n.tagName === "INPUT" && ![
			"number",
			"checkbox",
			"range",
			"color"
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? ct() : st());
	}
	async function pt() {
		P(C, ds(await (await fetch("/content/site.json")).json()), !0), He = Zi("urd-draft-site", () => V(C), re), (He.data.schemaVersion ?? 1) > 4 && (console.warn(`Urd: the site draft has schemaVersion ${He.data.schemaVersion} (the engine has 4) and is discarded`), He.replace(We(V(C)))), He.replace(ds(He.data)), He.save(), Ge(), P(se, {
			snap: !0,
			...V(k).grid
		}, !0), await qi(new URLSearchParams(location.search).get("page") ?? V(k).pages[0].id), await sl(), await nc(), await Ws(), await vi(), V(oe) && bi(), V(k).site.setup === !0 && !localStorage.getItem("urd-setup-done") && (P(bt, V(k).site.title, !0), P(xt, V(k).theme.tokens.color.accent, !0), P(St, V(k).theme.tokens.color.bg, !0), P(yt, !0));
	}
	let mt = /* @__PURE__ */ N(null);
	function ht({ title: e, lines: t = [], okLabel: n = Z("confirm.ok"), cancelLabel: r = Z("confirm.cancel") }) {
		return new Promise((i) => {
			P(mt, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function gt({ title: e, lines: t = [], value: n = "", placeholder: r = "", okLabel: i = Z("confirm.ok"), cancelLabel: a = Z("confirm.cancel") }) {
		return new Promise((o) => {
			P(mt, {
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
	function _t(e) {
		V(mt)?.resolve(V(mt).prompt ? e ? V(mt).value : null : e), P(mt, null);
	}
	let vt = !1;
	bn(() => {
		if (!V(mt)) return;
		let e = (e) => {
			e.key === "Escape" && (e.stopPropagation(), _t(!1));
		};
		return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
	});
	let yt = /* @__PURE__ */ N(!1), bt = /* @__PURE__ */ N(""), xt = /* @__PURE__ */ N("#7c5cff"), St = /* @__PURE__ */ N("#0b0e14");
	function Ct() {
		localStorage.setItem("urd-setup-done", "1"), P(yt, !1);
	}
	function wt() {
		let e = V(bt).trim();
		e && (da("setup", () => {
			V(k).site.title = e, V(k).nav.logo = {
				type: "text",
				value: e
			}, V(k).theme.tokens.color.accent = V(xt), V(k).theme.tokens.color.bg = V(St), delete V(k).site.setup;
		}), Ct(), E(Z("status.setupDone"), "ok"));
	}
	let Tt = "urd-admin-panels", Et = "urd-admin-panel-open", Dt = /* @__PURE__ */ N($t(localStorage.getItem(Tt) === "reset" ? "reset" : "remember"));
	function Ot(e) {
		P(Dt, e === "reset" ? "reset" : "remember", !0), V(Dt) === "reset" ? localStorage.setItem(Tt, "reset") : localStorage.removeItem(Tt);
	}
	let j = /* @__PURE__ */ N($t(V(Dt) === "reset" ? null : localStorage.getItem(Et))), kt = [
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
	], At = [
		"rail.thisPage",
		"rail.site",
		"rail.system"
	], jt = Object.fromEntries(kt.flat().map((e) => [e, Z(`panel.${e}`)]));
	V(j) && !jt[V(j)] && P(j, null), bn(() => {
		if (V(Dt) === "reset") {
			localStorage.removeItem(Et);
			return;
		}
		V(j) ? localStorage.setItem(Et, V(j)) : localStorage.removeItem(Et);
	});
	let Mt = {
		pages: ["hint.pages.drafts"],
		blocks: ["hint.blocks.intro"],
		grid: ["hint.grid.intro", "hint.grid.section"],
		collections: ["hint.collections.intro"],
		plugins: ["hint.plugins.intro"],
		history: ["hint.history.intro"]
	}, Nt = [
		["se", "Davvisámegiella"],
		["en-GB", "English (UK)"],
		["nb", "Norsk bokmål"],
		["nn", "Norsk nynorsk"],
		["tr", "Türkçe"]
	], Pt = (e) => [...e].sort((e, t) => e[1].localeCompare(t[1]));
	function Ft(e, t) {
		let n = [];
		for (let r of e) for (let e of Kc[r]?.languages ?? []) e?.[t] === !0 && (typeof e.code != "string" || typeof e.name != "string" || !e.name || Nt.some(([t]) => t === e.code) || n.some(([t]) => t === e.code) || n.push([e.code, e.name]));
		return n;
	}
	function It() {
		let e = Pt([...Nt, ...Ft(V(Zc), "admin")]);
		return Rt === "auto" || e.some(([e]) => e === Rt) ? e : [[Rt, Rt], ...e];
	}
	let Lt = () => Ft(V(Bc)?.enabled ?? [], "site"), Rt = localStorage.getItem("urd-admin-lang") ?? "auto";
	function zt(e) {
		e !== Rt && (e === "auto" ? localStorage.removeItem("urd-admin-lang") : localStorage.setItem("urd-admin-lang", e), location.reload());
	}
	function Bt(e) {
		P(j, V(j) === e ? null : e, !0), V(j) === "history" && Di(), V(j) === "update" && !V(Li) && zi();
	}
	let M = /* @__PURE__ */ N(null);
	function Vt(e, t) {
		let n = O?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function Ht() {
		if (!V(M)) return;
		let { block: e } = Vt(V(M).sectionId, V(M).blockId);
		if (!e) {
			P(M, null);
			return;
		}
		P(M, {
			sectionId: V(M).sectionId,
			blockId: V(M).blockId,
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
	function Ut(e) {
		if (P(Wt, null), !e.blockId) {
			P(M, null);
			return;
		}
		P(M, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), e.sectionId && P(zn, e.sectionId, !0), Ht();
	}
	let Wt = /* @__PURE__ */ N(null), Gt = window.matchMedia("(prefers-reduced-motion: reduce)").matches, Kt = [
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
	function qt() {
		let e = O?.data.sections ?? [], t = e.findIndex((e) => e.id === V(M)?.sectionId);
		return t < 0 ? [["", Z("opt.sticky.ownSection")]] : [["", Z("opt.sticky.ownSection")], ...e.slice(t + 1).map((e, n) => [e.id, Z("opt.sticky.atSection", { n: t + 2 + n })])];
	}
	function Jt(e) {
		if (Ut(e), !V(M)) return;
		let t = V(ae)?.getBoundingClientRect();
		if (!t) return;
		let n = t.left + V(Ae) * e.rect.right + 12;
		n + 300 > window.innerWidth - 8 && (n = Math.max(8, t.left + V(Ae) * e.rect.left - 300 - 12));
		let r = window.innerHeight - Math.min(window.innerHeight * .7, 560) - 8, i = Math.min(Math.max(8, t.top + V(Ae) * e.rect.top), Math.max(8, r));
		P(Wt, {
			left: n,
			top: i
		}, !0);
	}
	function Yt(e, t) {
		let { section: n, block: r } = Vt(V(M)?.sectionId, V(M)?.blockId);
		r && (e && nt(e), t(r, n), Ve(n, "block-edited"), O.save(), Ze(), Ue?.sendSection(V(w), n), Ht());
	}
	function F(e, t) {
		Yt(`edit:${V(M).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function Xt(e, t) {
		Yt(`edit:${V(M).blockId}:${e}`, (e) => {
			Object.assign(e.props, t);
		});
	}
	let Zt = /* @__PURE__ */ new Set([
		"image",
		"video",
		"shape",
		"icon"
	]);
	function Qt(e) {
		Yt(`edit:${V(M).blockId}:fit`, (t) => {
			e === "shrink" ? (t.fit = "shrink", t.fitMin ??= .6) : (delete t.fit, delete t.fitMin);
		});
	}
	function tn(e) {
		Yt(`edit:${V(M).blockId}:fitMin`, (t) => {
			t.fitMin = e;
		});
	}
	let nn = $t({}), rn = $t({}), an = /* @__PURE__ */ N(!1), on = /* @__PURE__ */ N("content"), sn = (e, t) => (Number.isFinite(t) || (t = e.min ?? 0), e.min != null && (t = Math.max(e.min, t)), e.max != null && (t = Math.min(e.max, t)), t);
	async function cn(e) {
		let t = V(M).blockId, n = `${t}:${e.key}`, r = (nn[n] ?? V(M).props[e.key] ?? "").trim();
		rn[n] = null;
		let i = r.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
		if (!r || i || /^https?:\/\//i.test(r)) {
			Xt(e.key, {
				[e.key]: r,
				lat: i ? Number(i[1]) : null,
				lon: i ? Number(i[2]) : null
			});
			return;
		}
		P(an, !0), rn[n] = {
			text: Z("props.place.searching"),
			err: !1
		};
		try {
			let i = await fetch(`/api/geocode?q=${encodeURIComponent(r)}`), a = await i.json().catch(() => null);
			if (V(M)?.blockId !== t) return;
			i.ok && Number.isFinite(a?.lat) ? (Xt(e.key, {
				[e.key]: r,
				lat: a.lat,
				lon: a.lon
			}), rn[n] = null) : rn[n] = {
				text: Ui(a) ?? Z("props.place.notFound"),
				err: !0
			};
		} catch {
			rn[n] = {
				text: Z("props.place.failed"),
				err: !0
			};
		} finally {
			P(an, !1);
		}
	}
	function ln(e, t) {
		Number.isFinite(t) && Yt(`edit:frame-${V(M).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function un(e) {
		Yt(`edit:${V(M).blockId}:boxStyle`, (t) => {
			let n = {
				...t.props.boxStyle ?? {},
				...e
			};
			for (let e of Object.keys(n)) n[e] ?? delete n[e];
			Object.keys(n).length ? t.props.boxStyle = n : delete t.props.boxStyle;
		});
	}
	let dn = [
		"text",
		"email",
		"tel",
		"textarea",
		"select",
		"checkbox",
		"radio",
		"date"
	], fn = /* @__PURE__ */ new Set(["select", "radio"]), pn = () => "f" + [...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(3))].map((e) => e.toString(16).padStart(2, "0")).join("");
	function mn(e, t) {
		Yt(`edit:${V(M).blockId}:field${e}`, (n) => {
			let r = {
				...n.props.fields[e],
				...t
			};
			fn.has(r.type) ? r.options ??= [] : delete r.options, n.props.fields[e] = r;
		});
	}
	function hn(e, t) {
		mn(e, { options: String(t).split(",").map((e) => e.trim()).filter(Boolean) });
	}
	function gn() {
		Yt("form-field", (e) => {
			(e.props.fields ??= []).push({
				id: pn(),
				label: Z("form.newField"),
				type: "text",
				required: !1
			});
		});
	}
	function _n(e) {
		Yt("form-field", (t) => {
			t.props.fields.splice(e, 1);
		});
	}
	function vn(e, t) {
		let n = e + t;
		Yt("form-field", (t) => {
			n < 0 || n >= t.props.fields.length || ([t.props.fields[e], t.props.fields[n]] = [t.props.fields[n], t.props.fields[e]]);
		});
	}
	function yn(e) {
		F("sources", String(e).split("\n").map((e) => e.trim()).filter(Boolean));
	}
	function xn(e, t) {
		Yt(`edit:${V(M).blockId}:faq${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function Sn() {
		Yt("faq-item", (e) => {
			(e.props.items ??= []).push({
				q: Z("seed.faq.newQ"),
				a: Z("seed.faq.answer")
			});
		});
	}
	function Cn(e) {
		Yt("faq-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function wn(e, t) {
		let n = e + t;
		Yt("faq-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function Tn(e, t) {
		Yt(`edit:${V(M).blockId}:tl${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function En() {
		Yt("tl-item", (e) => {
			(e.props.items ??= []).push({
				year: "",
				title: Z("seed.timeline.newTitle"),
				text: ""
			});
		});
	}
	function Dn(e) {
		Yt("tl-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function On(e, t) {
		let n = e + t;
		Yt("tl-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function kn(e) {
		Yt("decor", (t) => {
			t.decor = e;
		});
	}
	function An(e, t) {
		Yt(`edit:${V(M).blockId}:table-form`, (n) => {
			let r = (Array.isArray(n.props.rows) && n.props.rows.length ? n.props.rows : [[""]]).map((e) => Array.isArray(e) ? e.map((e) => String(e ?? "")) : [""]), i = Math.max(1, ...r.map((e) => e.length));
			r = r.map((e) => [...e, ...Array(i - e.length).fill("")]), e > 0 ? r.push(Array(i).fill("")) : e < 0 && r.length > 1 && r.pop(), t > 0 ? r = r.map((e) => [...e, ""]) : t < 0 && i > 1 && (r = r.map((e) => e.slice(0, i - 1))), n.props.rows = r;
		});
	}
	function jn(e, t) {
		Yt(`edit:${V(M).blockId}:share`, (n) => {
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
	function Mn(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		let n = new FileReader();
		n.onload = () => {
			F("src", String(n.result ?? "")), t.size > 4e5 && E(Z("status.audioLarge", { kb: Math.round(t.size / 1024) }), "error");
		}, n.onerror = () => E(Z("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function Nn(e) {
		let { section: t, block: n } = Vt(V(M)?.sectionId, V(M)?.blockId);
		n && (nt("hide-mobile"), n.hideMobile = e, O.save(), Ze(), Ue?.sendSection(V(w), t), Ht());
	}
	async function Pn(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Dr(t);
			Yt(`edit:${V(M).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || Da(t.name).replaceAll("-", " ");
			});
		} catch {
			E(Z("status.imageReadError"), "error");
		}
	}
	async function Fn(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Dr(t);
			Yt(`edit:${V(M).blockId}`, (t) => {
				t.props.image = e.dataUrl;
			});
		} catch {
			E(Z("status.imageReadError"), "error");
		}
	}
	let In = {
		text: Z("blocks.text"),
		button: Z("blocks.button"),
		image: Z("blocks.image"),
		shape: Z("blocks.shape"),
		video: Z("blocks.video"),
		icon: Z("blocks.icon"),
		gallery: Z("blocks.gallery"),
		faq: Z("blocks.faq"),
		collection: Z("blocks.collection"),
		timeline: Z("blocks.timeline"),
		quote: Z("blocks.quote"),
		stats: Z("blocks.stats"),
		table: Z("blocks.table"),
		share: Z("blocks.share"),
		countdown: Z("blocks.countdown"),
		audio: Z("blocks.audio"),
		product: Z("blocks.product"),
		cart: Z("blocks.cart"),
		checkout: Z("blocks.checkout"),
		map: Z("blocks.map"),
		form: Z("blocks.form"),
		calendar: Z("blocks.calendar")
	}, Ln = [
		["line", Z("shape.line")],
		["arrow", Z("shape.arrow")],
		["circle", Z("shape.circle")],
		["rect", Z("shape.rect")],
		["triangle", Z("shape.triangle")]
	], Rn = [
		["accent", Z("color.accent")],
		["text", Z("color.text")],
		["surface", Z("color.surface")],
		["bg", Z("color.bg")]
	], zn = /* @__PURE__ */ N(null), Bn = /* @__PURE__ */ N(null), Vn = /* @__PURE__ */ N(""), Hn = /* @__PURE__ */ N($t([])), Un = /* @__PURE__ */ N(null), Wn = /* @__PURE__ */ N(null), Gn = /* @__PURE__ */ N("");
	function Kn(e) {
		P(Bn, e?.grid ? { ...e.grid } : null, !0), P(Vn, e?.size?.minHeight ?? "", !0), P(Hn, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), P(Un, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0), P(Wn, e?.hover ? JSON.parse(JSON.stringify(e.hover)) : null, !0), P(Gn, e?.theme ?? "", !0);
	}
	let qn = /* @__PURE__ */ N(null), Jn = $t({});
	function Yn() {
		try {
			let e = ((V(ae)?.contentDocument)?.querySelector(`.urd-section[data-section-id="${V(zn)}"]`))?.getBoundingClientRect();
			P(qn, e && e.width ? {
				w: e.width,
				h: e.height
			} : null, !0);
		} catch {
			P(qn, null);
		}
	}
	bn(() => {
		V(zn), V(Hn), requestAnimationFrame(() => requestAnimationFrame(Yn));
	}), bn(() => {
		let e = V(ae);
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(() => Yn());
		return t.observe(e), () => t.disconnect();
	}), bn(() => {
		for (let e of V(Hn)) {
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
		let t = V(Vr), n = (e) => e.replaceAll("var(--urd-base-bg)", t.bg).replaceAll("var(--urd-base-surface)", t.surface).replaceAll("var(--urd-base-text)", t.text).replaceAll("var(--urd-base-accent)", t.accent).replaceAll("var(--urd-base-accent-text)", t["accent-text"] ?? S(ih(t.accent ?? "#000000", t))), r = Hc(e);
		return {
			bg: r["--urd-color-bg"] ? n(r["--urd-color-bg"]) : t.bg,
			surface: r["--urd-color-surface"] ? n(r["--urd-color-surface"]) : t.surface,
			text: r["--urd-color-text"] ? n(r["--urd-color-text"]) : t.text,
			accent: r["--urd-color-accent"] ? n(r["--urd-color-accent"]) : t.accent
		};
	}
	function Qn(e) {
		P(zn, e.sectionId, !0), Kn(O?.data.sections.find((t) => t.id === e.sectionId));
	}
	function $n(e, t) {
		let n = O.data.sections.find((e) => e.id === V(zn));
		n && (nt(e), t(n), O.save(), Ze(), Ue?.sendSection(V(w), n), Kn(n));
	}
	let er = /* @__PURE__ */ N("color");
	function tr(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background ??= {
				version: 1,
				layers: []
			}, e.background.layers.push({
				type: t,
				version: g[t].version ?? 1,
				props: g[t].defaults()
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
	function ir(e, t, n, r) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e.background.layers[t].props[n] = r;
		});
	}
	function ar(e, t, n, r = "xy") {
		e.preventDefault();
		let i = e.currentTarget;
		i.setPointerCapture?.(e.pointerId);
		let a = (e) => {
			let a = i.getBoundingClientRect();
			if (r.includes("x")) {
				let r = Math.min(1, Math.max(0, (e.clientX - a.left) / a.width));
				ir(t, n, "x", Math.round(r * 100) / 100);
			}
			if (r.includes("y")) {
				let r = Math.min(1, Math.max(0, (e.clientY - a.top) / a.height));
				ir(t, n, "y", Math.round(r * 100) / 100);
			}
		};
		a(e);
		let o = () => {
			i.removeEventListener("pointermove", a), i.removeEventListener("pointerup", o), i.removeEventListener("pointercancel", o);
		};
		i.addEventListener("pointermove", a), i.addEventListener("pointerup", o), i.addEventListener("pointercancel", o);
	}
	let or = (e) => Math.min(4, Math.max(.1, e));
	function sr(e, t, n, r) {
		ir(e, t, "size", or(Math.round((n + r) * 100) / 100));
	}
	function cr(e, t, n) {
		let r = Number(n);
		Number.isFinite(r) && ir(e, t, "size", or(r / 100));
	}
	function lr(e, t, n, r) {
		let i = Jn[n.props.src];
		if (!i?.w || !i?.h || !V(qn)?.w || !V(qn)?.h) return;
		let a = V(qn).h * i.w / (V(qn).w * i.h), o = r === "cover" ? Math.max(1, a) : Math.min(1, a);
		(n.props.fit === "tile" || n.props.fit === "repeat") && ir(e, t, "fit", "plain"), ir(e, t, "size", or(Math.round(o * 100) / 100));
	}
	function ur(e) {
		return e.props;
	}
	function dr(e, t, n, r) {
		e.mutate(n, (e) => {
			r(e.background.layers[t].props);
		});
	}
	function pr(e, t, n, r) {
		dr(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e[n] = r;
		});
	}
	let mr = {
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
	function hr(e, t, n) {
		dr(e, t, e.keyPrefix, (e) => {
			e.kind = n, mr[n].some(([t]) => t === (e.animation ?? "none")) || (e.animation = "none");
		});
	}
	function gr(e, t, n, r) {
		dr(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-stop${n}`, (e) => {
			e.stops[n] = {
				...e.stops[n],
				...r
			};
		});
	}
	function _r(e, t) {
		dr(e, t, e.keyPrefix, (e) => {
			let t = Math.round(e.stops.reduce((e, t) => e + (Number(t.share) || 0), 0) / e.stops.length) || 50;
			e.stops.push({
				color: e.stops[e.stops.length - 1]?.color ?? "#ffffff",
				share: t
			});
		});
	}
	function vr(e, t, n) {
		dr(e, t, e.keyPrefix, (e) => {
			e.stops.length > 2 && e.stops.splice(n, 1);
		});
	}
	function yr(e, t, n, r) {
		dr(e, t, e.keyPrefix, (e) => {
			let [t] = e.stops.splice(n, 1);
			e.stops.splice(r, 0, t);
		});
	}
	let br = /* @__PURE__ */ N(null);
	function Sr(e, t, n, r) {
		if (t.button !== 0) return;
		t.preventDefault();
		let i = t.currentTarget.closest(".bg-layer"), a = t.currentTarget.closest(".grad-stop");
		P(br, {
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
			P(br, {
				...V(br),
				insert: n
			}, !0);
		}, u = () => {
			window.removeEventListener("pointermove", l), window.removeEventListener("pointerup", u), c.remove();
			let t = V(br);
			if (P(br, null), !t) return;
			let n = t.insert > t.from ? t.insert - 1 : t.insert;
			n !== t.from && yr(e, t.layer, t.from, n);
		};
		window.addEventListener("pointermove", l), window.addEventListener("pointerup", u);
	}
	function wr(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].type !== n && (e.background.layers[t] = {
				type: n,
				version: g[n].version ?? 1,
				props: g[n].defaults()
			});
		});
	}
	async function Tr(e, t) {
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
	async function Er(e) {
		let t = await e.text(), n = Ca(t), r = Ta(t);
		if (!r) return n;
		let i = await Tr(n.dataUrl, r);
		if (!i) return n;
		let a = wa(t, i);
		if (a === t) return n;
		try {
			return Ca(a);
		} catch {
			return n;
		}
	}
	async function Dr(e) {
		return e.type === "image/svg+xml" || /\.svg$/i.test(e.name || "") ? Er(e) : ba(e);
	}
	async function Or(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			ir(e, t, "src", (await Dr(r)).dataUrl);
		} catch {
			E(Z("status.imageReadError"), "error");
		}
	}
	function kr(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", !r) return;
		if (!["video/mp4", "video/webm"].includes(r.type)) {
			E(Z("status.videoFormat"), "error");
			return;
		}
		if (r.size > 15e6) {
			E(Z("status.videoTooLarge", {
				mb: (r.size / 1e6).toFixed(1),
				max: Math.round(ya / 1e6)
			}), "error");
			return;
		}
		let i = new FileReader();
		i.onload = () => {
			ir(e, t, "src", String(i.result ?? "")), r.size > 4e6 && E(Z("status.videoLarge", { mb: (r.size / 1e6).toFixed(1) }), "error");
		}, i.onerror = () => E(Z("status.imageReadError"), "error"), i.readAsDataURL(r);
	}
	async function Ar(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			ir(e, t, "poster", (await Dr(r)).dataUrl);
		} catch {
			E(Z("status.imageReadError"), "error");
		}
	}
	async function jr(e, t, n) {
		let r = [...n.target.files ?? []];
		if (n.target.value = "", !r.length) return;
		E(Z("status.compressingImages"));
		let { images: i, failed: a, big: o } = await Rh(r);
		i.length && e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers[t].props;
			n.images ??= [], n.images.push(...i.map(({ src: e }) => ({
				src: e,
				x: .5,
				y: .5
			})));
		}), zh(i.length, a, o);
	}
	function U(e, t, n, r) {
		e.mutate(e.keyPrefix, (e) => {
			let i = e.background.layers[t].props.images, a = n + r;
			a < 0 || a >= i.length || ([i[n], i[a]] = [i[a], i[n]]);
		});
	}
	function Mr(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].props.images.splice(n, 1);
		});
	}
	function Pr(e, t, n, r, i) {
		e.mutate(`edit:${e.keyPrefix}g-${e.keyId}-${t}-${n}-${r}`, (e) => {
			e.background.layers[t].props.images[n][r] = i;
		});
	}
	function Fr(e, t) {
		da(e, () => {
			V(k).nav.style ??= {}, t(V(k).nav.style);
		});
	}
	let Ir = /* @__PURE__ */ A(() => ({
		mutate: $n,
		keyPrefix: "bg",
		keyId: V(zn)
	})), Lr = {
		mutate: Fr,
		keyPrefix: "navbg",
		keyId: "nav"
	}, Rr = {
		mutate: gl,
		keyPrefix: "footerbg",
		keyId: "footer"
	}, zr = () => {
		let e = null;
		try {
			e = localStorage.getItem("urd-theme-mode");
		} catch {}
		return Pc(V(k)?.theme?.scheme, e, window.matchMedia("(prefers-color-scheme: dark)").matches);
	}, Br = /* @__PURE__ */ N("light");
	bn(() => {
		P(Br, zr(), !0);
		let e = window.matchMedia("(prefers-color-scheme: dark)"), t = (e) => {
			e instanceof StorageEvent && e.key && e.key !== "urd-theme-mode" || P(Br, zr(), !0);
		};
		return e.addEventListener("change", t), window.addEventListener("storage", t), () => {
			e.removeEventListener("change", t), window.removeEventListener("storage", t);
		};
	});
	let Vr = /* @__PURE__ */ A(() => V(k)?.theme ? Fc(V(k).theme, V(Br)).color ?? {} : {}), Hr = () => Object.entries(V(Vr)), Ur = [
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
	], Gr = /* @__PURE__ */ A(() => !!V(k)?.theme.alt), Kr = /* @__PURE__ */ A(() => V(k)?.theme.alt?.auto === !0), qr = /* @__PURE__ */ A(() => V(k)?.theme.scheme === "dark" ? "dark" : "light"), Yr = /* @__PURE__ */ A(() => V(k)?.theme.tokens.color ?? {}), Xr = /* @__PURE__ */ A(() => ({
		...V(k)?.theme.tokens.color ?? {},
		...V(k)?.theme.alt?.tokens?.color ?? {}
	}));
	function Zr(e) {
		return {
			type: e,
			version: Kl[e].version,
			props: Kl[e].defaults()
		};
	}
	let Qr = (e) => !!(e && Kl[e.type]?.entrance), $r = [["", Z("common.none")], ...Object.entries(Kl).filter(([, e]) => e.entrance).map(([e, t]) => [e, t.labelKey ? Z(t.labelKey) : t.label])], ei = $r.filter(([e]) => !Kl[e]?.group), ti = [["", Z("common.none")], ...Object.entries(Kl).filter(([, e]) => !e.entrance).map(([e, t]) => [e, t.labelKey ? Z(t.labelKey) : t.label])];
	function ni(e) {
		e.animation && !Qr(e.animation) && (e.hover ??= e.animation, e.animation = null);
	}
	function ri(e) {
		Yt(`edit:anim-${V(M).blockId}`, (t) => {
			ni(t), t.animation = e ? Zr(e) : null;
		}), V(M) && Ue?.sendDemoAnim(V(M).sectionId, V(M).blockId);
	}
	function ii(e) {
		Yt(`edit:hover-${V(M).blockId}`, (t) => {
			ni(t), t.hover = e ? Zr(e) : null;
		});
	}
	function ai(e, t) {
		Number.isFinite(t) && (Yt(`edit:anim-${V(M).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), V(M) && Ue?.sendDemoAnim(V(M).sectionId, V(M).blockId));
	}
	function oi(e) {
		$n("section-anim", (t) => {
			ni(t), t.animation = e ? Zr(e) : null;
		}), Ue?.sendDemoAnim(V(zn));
	}
	function si(e) {
		$n("section-hover", (t) => {
			ni(t), t.hover = e ? Zr(e) : null;
		});
	}
	function li(e, t) {
		Number.isFinite(t) && ($n("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), Ue?.sendDemoAnim(V(zn)));
	}
	function ui(e, t) {
		$n("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), Ue?.sendDemoAnim(V(zn));
	}
	function di(e) {
		let t = O.data.sections.find((e) => e.id === V(zn));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		nt("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, P(Vn, r, !0), O.save(), Ze(), Ue?.sendSection(V(w), t);
	}
	function fi() {
		return O.data.sections.find((e) => e.id === V(zn)) ?? O.data.sections[0];
	}
	function pi(e) {
		let t = O.data.sections.find((e) => e.id === V(zn));
		t && (nt("grid:section"), t.grid = e ? { ...He.data.grid } : null, P(Bn, t.grid ? { ...t.grid } : null, !0), O.save(), Ze(), Ue?.sendSection(V(w), t), V(ca) && Ue?.sendShowGrid(!0));
	}
	function mi(e, t) {
		let n = O.data.sections.find((e) => e.id === V(zn));
		n?.grid && (nt("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, P(Bn, { ...n.grid }, !0), O.save(), Ze(), Ue?.sendSection(V(w), n), V(ca) && Ue?.sendShowGrid(!0));
	}
	function gi(e, t) {
		nt("grid:site"), P(se, {
			...V(se),
			[e]: t
		}, !0), He.data.grid = {
			...He.data.grid,
			[e]: t
		}, He.save(), Ze(), Ke(), V(ca) && Ue?.sendShowGrid(!0);
	}
	async function vi() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? P(oe, await e.json(), !0) : e.status !== 503 && P(oe, null);
		} catch {
			P(oe, null);
		}
	}
	let yi = null;
	async function bi() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (yi = (await e.json()).head ?? null);
		} catch {}
	}
	async function xi(e) {
		if (!yi) return await bi(), {
			ok: await ht({
				title: Z("confirm.conflictUnknown.title"),
				lines: [Z("confirm.conflictUnknown.body"), Z("confirm.conflictUnknown.warning")],
				okLabel: Z("confirm.publishAnyway"),
				cancelLabel: Z("confirm.cancel")
			}),
			head: yi
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${yi}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === yi) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? [Z("confirm.conflict.truncated")] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await ht({
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
	let Ci = /* @__PURE__ */ N(null), wi = /* @__PURE__ */ N(""), Ti = /* @__PURE__ */ N(!1);
	async function Di() {
		P(wi, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? P(Ci, (await e.json()).commits, !0) : e.status === 401 ? (P(Ci, [], !0), P(wi, Z("status.historyLoginRequired"), !0)) : (P(Ci, [], !0), P(wi, Ui(await e.json().catch(() => null)) ?? Z("status.historyFetchFailed"), !0));
		} catch {
			P(Ci, [], !0), P(wi, Z("status.historyUnavailable"), !0);
		}
	}
	let Oi = (() => {
		let e = {
			dateStyle: "short",
			timeStyle: "short"
		};
		try {
			return new Intl.DateTimeFormat(Wi(), e);
		} catch {
			return new Intl.DateTimeFormat(void 0, e);
		}
	})(), ki = !1;
	async function ji() {
		let e = V(Ci)?.[0];
		if (!(!e || V(Ti)) && await ht({
			title: Z("confirm.revert.title"),
			lines: [`«${e.message}»`, Z("confirm.revert.body")],
			okLabel: Z("confirm.revert.ok"),
			cancelLabel: Z("confirm.cancel")
		})) {
			P(Ti, !0), E(Z("status.reverting"));
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? yi = e : bi(), ki = !0, E(Z("status.revertDone"), "ok"), Mi();
				} else t.status === 409 ? E(Z("status.revertConflict"), "error") : E(Ui(await t.json().catch(() => null)) ?? Z("status.revertFailed"), "error");
			} catch {
				E(Z("status.publishLayerUnreachable"), "error");
			}
			P(Ti, !1), Di();
		}
	}
	async function Mi() {
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
				E(Z("status.revertDeployed"), "ok");
				for (let e of Object.keys(localStorage).filter((e) => e.startsWith("urd-draft-"))) localStorage.removeItem(e);
				await new Promise((e) => setTimeout(e, 800)), location.reload();
				return;
			}
		}
		E(Z("status.revertDeployTimeout"), "error");
	}
	let Ni = 0;
	async function Pi(e) {
		let t = ++Ni, n = ne, r = await so(oo(e));
		t === Ni && n === ne && (r ? E(Z("status.publishLive"), "ok") : E(Z("status.publishDeployTimeout"), "error"));
	}
	let Fi = /* @__PURE__ */ N(null), Ii = /* @__PURE__ */ N(null), Li = /* @__PURE__ */ N(!1), Ri = /* @__PURE__ */ N($t(/* @__PURE__ */ new Set()));
	async function zi() {
		P(Li, !0), P(Ii, null), P(Fi, null);
		try {
			let e = await fetch("/api/github/update"), t = await e.json().catch(() => null);
			e.ok ? (P(Fi, t, !0), P(Ri, /* @__PURE__ */ new Set(), !0)) : P(Ii, Ui(t) ?? Z("update.checkFailed"), !0);
		} catch {
			P(Ii, Z("status.publishLayerUnreachable"), !0);
		}
		P(Li, !1);
	}
	function Bi(e) {
		let t = new Set(V(Ri));
		t.has(e) ? t.delete(e) : t.add(e), P(Ri, t, !0);
	}
	async function Vi() {
		if (!V(Fi) || V(Fi).upToDate || V(Li)) return;
		let e = [...V(Ri)], t = V(Fi).changes.filter((e) => !V(Ri).has(e.path)), n = t.filter((e) => e.atom && e.conflict);
		if (await ht({
			title: Z("confirm.update.title"),
			lines: [Z("confirm.update.body", {
				target: V(Fi).target,
				writes: t.filter((e) => e.action === "write").length,
				deletes: t.filter((e) => e.action === "delete").length
			}), ...n.length > 0 ? [Z("confirm.update.warnEdited", { paths: n.map((e) => e.path).join(", ") })] : []],
			okLabel: Z("confirm.update.ok"),
			cancelLabel: Z("confirm.cancel")
		})) {
			P(Li, !0), E(Z("update.running", { target: V(Fi).target }));
			try {
				let t = await fetch("/api/github/update", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						to: V(Fi).target,
						expect: V(Fi).head,
						skip: e
					})
				}), n = await t.json().catch(() => null);
				t.ok ? (E(Z("update.committed", { target: V(Fi).target }), "ok"), await Hi(V(Fi).target.replace(/^v/, ""))) : t.status === 409 ? (E(Ui(n) ?? Z("update.checkFailed"), "error"), await zi()) : E(Ui(n) ?? Z("update.failed"), "error");
			} catch {
				E(Z("status.publishLayerUnreachable"), "error");
			}
			P(Li, !1);
		}
	}
	async function Hi(e) {
		for (let t = 0; t < 18; t++) {
			await new Promise((e) => setTimeout(e, 1e4));
			try {
				if ((await (await fetch("/urd.json", { cache: "no-store" })).json())?.engine === e) {
					E(Z("update.deployed"), "ok"), await new Promise((e) => setTimeout(e, 800)), location.reload();
					return;
				}
			} catch {}
		}
		E(Z("update.deployTimeout"), "error");
	}
	let Gi = null;
	function Ki(e) {
		return {
			schemaVersion: 4,
			meta: {
				id: e.id,
				title: e.title
			},
			sections: [{
				id: vs("sec"),
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
	async function qi(e, { keepHistory: t = !1 } = {}) {
		P(w, e, !0), Gi = (async () => {
			let n = Xe(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = fs(await e.json(), He.data));
			} catch {}
			r ? qe.delete(e) : r = Ki(n), O = Zi(`urd-draft-${e}`, () => r, re), (O.data.schemaVersion ?? 1) > 4 && (console.warn(`Urd: the draft for '${e}' has schemaVersion ${O.data.schemaVersion} (the engine has 4) and is discarded`), O.replace(structuredClone(r))), O.replace(fs(O.data, He.data)), O.save(), t || (et = null), P(zn, null), P(Bn, null), Ze(), Ma(), Le(), P(ee, "");
		})(), await Gi;
	}
	function Ji() {
		Ue?.destroy(), V(ae)?.contentDocument?.addEventListener("pointerdown", () => {
			V(Wt) && P(Wt, null);
		}, !0), Ue = ro(V(ae), {
			onEdit: dh,
			onMove: fh,
			onGrow: ph,
			onDelete: Ch,
			onAddSection: vh,
			onMoveSection: yh,
			onDeleteSection: bh,
			onSectionSize: xh,
			onUndo: (e) => e.redo ? ct() : st(),
			onSelectSection: Qn,
			onSelectBlock: Ut,
			onBlockMenu: Jt,
			onReady: Yi,
			onNavigate: ua,
			onAddBlock: (e) => Dh(e.sectionId, e.block),
			onAddBlocks: (e) => Oh(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: Ih,
			onMoveBlockSection: Sh,
			onMobileReset: mh,
			onMobileOrder: hh,
			onReviewDone: gh,
			onBlockFlag: _h,
			onCollectionEdit: fc,
			onCollectionAdd: uc,
			onSaveTemplate: Ys,
			onStickyGroup: Zs,
			onStickyDock: Xs,
			onDeleteTemplate: ec,
			onApplyLayout: ze,
			onPluginBlocks: (e) => {
				P(Ah, e.blocks ?? [], !0);
			},
			onNavWidth: (e) => da("edit:nav-width", () => {
				V(k).nav.style ??= {}, V(k).nav.style.width = e.width;
			})
		});
	}
	async function Yi() {
		await Gi, await zc, Ue?.sendPlugins(We(V(Bc))?.enabled ?? []), Ue?.sendViewport(V(be)), Ue?.sendZoom(V(Ae)), cc(), Gs(), He.hasDraft() && Ke();
		let e = !V(C).pages.some((e) => e.id === V(w));
		(O.hasDraft() || e) && Ue?.sendPage(V(w), O.data), V(ce) || Ue?.sendChrome(!1), V(ca) && Ue?.sendShowGrid(!0), V(Qi) && Ue?.sendShowGuides(!0), x();
	}
	let Qi = /* @__PURE__ */ N(localStorage.getItem("urd-guides") === "1"), $i = /* @__PURE__ */ N(!1), ea = /* @__PURE__ */ N($t(localStorage.getItem("urd-layout-picker") === "menu" ? "menu" : "strip"));
	function ta(e) {
		P(ea, e === "menu" ? "menu" : "strip", !0), V(ea) === "menu" ? localStorage.setItem("urd-layout-picker", "menu") : localStorage.removeItem("urd-layout-picker");
	}
	let na = /* @__PURE__ */ N(null);
	bn(() => {
		if (!V($i)) return;
		let e = (e) => {
			V(na)?.contains(e.target) || P($i, !1);
		}, t = (e) => {
			e.key === "Escape" && P($i, !1);
		}, n = () => {
			P($i, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let ra = {
		view: 1079,
		device: 999,
		zoom: 919
	}, ia = /* @__PURE__ */ N(null), aa = /* @__PURE__ */ N(null), oa = $t({
		view: !1,
		device: !1,
		zoom: !1
	});
	bn(() => {
		let e = Object.entries(ra).map(([e, t]) => {
			let n = window.matchMedia(`(max-width: ${t}px)`), r = () => {
				oa[e] = n.matches;
			};
			return r(), n.addEventListener("change", r), () => n.removeEventListener("change", r);
		});
		return () => e.forEach((e) => e());
	}), bn(() => {
		V(ia) && !oa[V(ia)] && P(ia, null);
	}), bn(() => {
		if (!V(ia)) return;
		let e = (e) => {
			V(aa)?.contains(e.target) || P(ia, null);
		}, t = (e) => {
			e.key === "Escape" && P(ia, null);
		}, n = () => {
			P(ia, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	function sa() {
		P(Qi, !V(Qi)), localStorage.setItem("urd-guides", V(Qi) ? "1" : "0"), Ue?.sendShowGuides(V(Qi));
	}
	let ca = /* @__PURE__ */ N(localStorage.getItem("urd-grid-overlay") === "1");
	function la() {
		P(ca, !V(ca)), localStorage.setItem("urd-grid-overlay", V(ca) ? "1" : "0"), Ue?.sendShowGrid(V(ca));
	}
	function ua(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = V(k).pages.find((e) => e.path === t);
		n && n.id !== V(w) && qi(n.id);
	}
	function da(e, t) {
		nt(e), t(), He.save(), Ze(), Ke();
	}
	let fa = /* @__PURE__ */ N(""), pa = /* @__PURE__ */ N(null), ma = Object.fromEntries(kc.map((e) => [e.id, Dc(Ac(e.id, {
		pageId: "preview",
		title: ""
	}))])), ga = /* @__PURE__ */ A(() => {
		let e = V(k)?.theme?.tokens?.color ?? {};
		return [
			"bg",
			"surface",
			"text",
			"accent"
		].filter((t) => typeof e[t] == "string" && Lc(e[t])).map((t) => `--urd-color-${t}: ${e[t]};`).join(" ");
	}), _a = /* @__PURE__ */ N(null);
	bn(() => {
		if (!V(_a)) return;
		let e = (e) => {
			e.target.closest?.(".page-menu-wrap") || P(_a, null);
		}, t = (e) => {
			e.key === "Escape" && P(_a, null);
		}, n = () => {
			P(_a, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let va = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions",
		"readme"
	];
	function xa(e, t = null) {
		return e ? va.includes(e) ? Z("error.reservedName", { slug: e }) : V(k).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? Z("error.pageExists") : null : Z("error.pageNeedsName");
	}
	function Sa() {
		let e = V(fa).trim(), t = Da(e), n = xa(t);
		if (n) {
			E(n, "error");
			return;
		}
		let r = V(pa) && !V(pa).startsWith("preset:") ? Bs[V(pa)]?.data?.page : null, i = V(pa)?.startsWith("preset:") ? Ac(V(pa).slice(7), {
			pageId: t,
			title: e
		}) ?? Ki({
			id: t,
			title: e
		}) : r ? Js(fs(JSON.parse(JSON.stringify(r)), He.data), vs, {
			id: t,
			title: e
		}) : Ki({
			id: t,
			title: e
		});
		da("pages", () => {
			V(k).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), V(k).nav.items.push({
				label: e,
				page: t
			});
		}), ie(`urd-draft-${t}`, JSON.stringify(i)), Ze(), P(fa, ""), P(pa, null), qi(t);
	}
	async function ka(e) {
		P(_a, null), await $s("page", e.id === V(w) ? JSON.parse(JSON.stringify(O.data)) : await Ra(e));
	}
	function Aa(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		da("pages", () => {
			e.title = n;
			for (let t of V(k).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === V(w) ? (O.data.meta.title = n, O.save(), Ze(), Ue?.sendPage(V(w), O.data)) : za(e, (e) => {
			e.meta.title = n;
		});
	}
	let ja = /* @__PURE__ */ N($t({
		description: "",
		ogTitle: "",
		ogDescription: "",
		ogImage: ""
	}));
	function Ma() {
		let e = O?.data?.meta ?? {};
		P(ja, {
			description: e.description ?? "",
			ogTitle: e.og?.title ?? "",
			ogDescription: e.og?.description ?? "",
			ogImage: e.og?.image ?? ""
		}, !0);
	}
	function Na(e, t) {
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
		O.save(), Ze(), Ma();
		let r = V(k).pages.find((e) => e.id === V(w));
		V(Fa)[V(w)] = !r?.noindex && !O.data.meta.description;
	}
	function Pa(e) {
		let t = V(k).pages.find((e) => e.id === V(w));
		t && (da("edit:page-noindex", () => {
			e ? t.noindex = !0 : delete t.noindex;
		}), V(Fa)[V(w)] = !e && !O?.data?.meta?.description);
	}
	let Fa = /* @__PURE__ */ N($t({}));
	async function Ia() {
		let e = {};
		for (let t of V(k).pages) {
			if (t.noindex) continue;
			if (t.id === V(w)) {
				e[t.id] = !O?.data?.meta?.description;
				continue;
			}
			let n = await Ra(t);
			e[t.id] = !n?.meta?.description;
		}
		P(Fa, e, !0);
	}
	bn(() => {
		V(j) === "pages" && V(w) && Ia();
	});
	async function La(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			Na("ogImage", (await Dr(t)).dataUrl);
		} catch {
			E(Z("status.imageReadError"), "error");
		}
	}
	async function Ra(e) {
		let t = localStorage.getItem(`urd-draft-${e.id}`);
		if (t) try {
			return JSON.parse(t);
		} catch {}
		try {
			let t = await fetch(`/${e.file}`);
			if (t.ok) return fs(await t.json(), He.data);
		} catch {}
		return Ki(e);
	}
	async function za(e, t) {
		let n = await Ra(e);
		t(n), ie(`urd-draft-${e.id}`, JSON.stringify(n)), Ze();
	}
	function Ba(e, t) {
		let n = Da(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = xa(n, e.id);
		if (r) {
			E(r, "error");
			return;
		}
		da("pages", () => {
			e.path = `/${n}`;
		});
	}
	function Wa(e) {
		e.path !== "/" && (da("pages", () => {
			V(k).pages = V(k).pages.filter((t) => t.id !== e.id), V(k).nav.items = V(k).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of V(k).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			V(k).nav.items = V(k).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === V(w) && qi(V(k).pages[0].id), E(Z("status.pageRemoved")));
	}
	function Ga(e) {
		da("edit:nav-logo", () => {
			V(k).nav.logo = {
				type: "text",
				value: "",
				...V(k).nav.logo,
				...e
			};
		});
	}
	function Ka(e) {
		da("nav", () => {
			V(k).nav.logo ??= {
				type: "text",
				value: V(k).site.title
			};
			let t = V(k).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = V(k).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = V(k).site.title), delete t.image), t.type = e;
		});
	}
	async function qa(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Dr(t);
			da("nav", () => {
				let t = V(k).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			E(Z("status.imageReadErrorSvg"), "error");
		}
	}
	let Ja = /* @__PURE__ */ N(null);
	async function Ya(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		if (t.type === "image/svg+xml" || /\.svg$/i.test(t.name || "")) {
			try {
				let e = await Er(t);
				P(Ja, e.dataUrl, !0);
			} catch {
				E(Z("status.imageReadErrorSvg"), "error");
			}
			return;
		}
		let n = new FileReader();
		n.onload = () => {
			P(Ja, String(n.result), !0);
		}, n.onerror = () => E(Z("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function Xa(e) {
		da("edit:site-icon", () => {
			V(k).site.icon = e;
		}), P(Ja, null);
	}
	function Za() {
		da("edit:site-icon", () => {
			delete V(k).site.icon;
		});
	}
	function Qa(e) {
		da("edit:site-title", () => {
			V(k).site.title = e;
		});
	}
	function $a(e) {
		da("edit:site-desc", () => {
			V(k).site.description = e;
		});
	}
	function eo(e) {
		let t = String(e ?? "").trim();
		da("edit:site-analytics", () => {
			t ? V(k).analytics = { token: t } : delete V(k).analytics;
		});
	}
	let to = /* @__PURE__ */ A(() => V(k)?.layout?.contentWidth ?? 1440), io = /* @__PURE__ */ A(() => V(k)?.layout?.gutter ?? 6), uo = /* @__PURE__ */ A(() => wo(V(to))), fo = /* @__PURE__ */ A(() => _o.find((e) => e.gutter === V(io))?.id ?? null), Io = /* @__PURE__ */ N(!1), Ro = /* @__PURE__ */ A(() => V(to) === "full" ? go : bo(V(to))), zo = /* @__PURE__ */ A(() => yo.map((e) => ({
		screen: e,
		...Co(V(to), V(io), e)
	})));
	function Wo(e, t) {
		da(t, () => {
			let t = {
				...V(k).layout ?? {},
				contentWidth: V(to),
				gutter: V(io),
				...e
			};
			for (let e of Object.keys(t)) t[e] === void 0 && delete t[e];
			V(k).layout = t;
		});
	}
	let Go = (e) => Wo({ contentWidth: e === "full" ? "full" : bo(e) }, "edit:site-width"), Ko = (e) => Wo({ gutter: xo(e) }, "edit:site-gutter");
	function qo() {
		let e = V(k).site.lang ?? "no";
		return e === "no" ? "nb" : e;
	}
	function Jo() {
		let e = qo(), t = Pt([...Nt, ...Lt()]);
		return [...t.some(([t]) => t === e) ? [] : [[e, e]], ...t];
	}
	function Yo(e) {
		da("site", () => {
			V(k).site.lang = e;
		});
	}
	let Xo = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	bn(() => {
		if (!V(k)?.site) return;
		let e = V(k).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 49.6V14.4l25.6 10.4V49.6' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
				return;
			}
			Xo.test(e) && (t.href = e);
		}
	});
	function Qo(e) {
		da("nav", () => {
			V(k).nav.layout = e;
		});
	}
	function ts(e, t) {
		da(`edit:nav-tools-${e}`, () => {
			V(k).nav.style ??= {};
			let n = { ...V(k).nav.style.tools ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? V(k).nav.style.tools = n : delete V(k).nav.style.tools;
		});
	}
	function ns(e, t) {
		da(`edit:nav-style-${e}`, () => {
			V(k).nav.style ??= {}, t === void 0 ? delete V(k).nav.style[e] : V(k).nav.style[e] = t;
		});
	}
	let rs = /* @__PURE__ */ A(() => V(k)?.nav?.variant === "side-left" || V(k)?.nav?.variant === "side-right"), is = /* @__PURE__ */ A(() => [
		"floating",
		"floating-square",
		"floating-tab"
	].includes(V(k)?.nav?.variant)), as = /* @__PURE__ */ A(() => Uo(V(k)?.nav?.style)), os = /* @__PURE__ */ A(() => Vo(V(k)?.nav?.style, V(k)?.nav?.variant)), ss = /* @__PURE__ */ A(() => Ho(V(k)?.nav?.style));
	function cs(e) {
		da("nav", () => {
			V(k).nav.style ??= {}, e === "md" ? delete V(k).nav.style.size : V(k).nav.style.size = e, delete V(k).nav.style.padY, delete V(k).nav.style.textSize;
		});
	}
	function ls(e, t, n) {
		let r = e.target.value;
		ns(t, r === "" ? void 0 : Bo(r, n, void 0)), e.target.value = V(k).nav.style?.[t] ?? "";
	}
	function us(e, t) {
		da(`edit:nav-mobile-${e}`, () => {
			V(k).nav.style ??= {};
			let n = { ...V(k).nav.style.mobile ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? V(k).nav.style.mobile = n : delete V(k).nav.style.mobile;
		});
	}
	function ps(e, t) {
		da(`edit:nav-announce-${e}`, () => {
			let n = { ...V(k).nav.announcement ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? V(k).nav.announcement = n : delete V(k).nav.announcement;
		});
	}
	function ms(e, t) {
		da(`edit:nav-sheet-${e}`, () => {
			V(k).nav.style ??= {};
			let n = { ...V(k).nav.style.sheet ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? V(k).nav.style.sheet = n : delete V(k).nav.style.sheet;
		});
	}
	function gs(e, t, n) {
		let r = e.target.value;
		ns(t, r === "" ? void 0 : Bo(r, n, void 0)), e.target.value = V(t === "padY" ? os : ss);
	}
	function ys(e, t, n) {
		let r = e.target.value;
		us(t, r === "" ? void 0 : Bo(r, n, void 0)), e.target.value = V(k).nav.style?.mobile?.[t] ?? "";
	}
	function $(e) {
		let t = Bo(e / 100, Ao, .5);
		ns("shrinkTo", t === .5 ? void 0 : t);
	}
	function bs(e) {
		let t = Bo(e, jo, 80);
		ns("shrinkAt", t === 80 ? void 0 : t);
	}
	function xs(e) {
		let t = Bo(e, Mo, 220);
		ns("shrinkMs", t === 220 ? void 0 : t);
	}
	let Ss = {
		underline: [Z("hoverColor.underline.label"), Z("hoverColor.underline.title")],
		pill: [Z("hoverColor.pill.label"), Z("hoverColor.pill.title")],
		lift: [Z("hoverColor.lift.label"), Z("hoverColor.lift.title")]
	}, Cs = /* @__PURE__ */ A(() => Ss[V(k)?.nav?.style?.hover] ?? null), ws = /* @__PURE__ */ A(() => V(rs) ? [
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
	function Ts(e) {
		da("nav", () => {
			e === "bar" ? delete V(k).nav.variant : V(k).nav.variant = e, V(k).nav.style && delete V(k).nav.style.radius;
		});
	}
	function Es(e) {
		da("nav", () => {
			V(k).nav.style ??= {}, e ? V(k).nav.style.glow = !0 : delete V(k).nav.style.glow;
		});
	}
	function Ds(e) {
		da("nav", () => {
			V(k).nav.style ??= {}, e ? delete V(k).nav.style.topGap : V(k).nav.style.topGap = !1;
		});
	}
	function Os(e) {
		da("nav", () => {
			V(k).nav.style ??= {}, e === "standard" ? delete V(k).nav.style.hover : V(k).nav.style.hover = e;
		});
	}
	let ks = null, As = {}, js = {}, Ms = !1, Ns = /* @__PURE__ */ N($t([])), Ps = /* @__PURE__ */ N($t({})), Fs = /* @__PURE__ */ N(null), Is = /* @__PURE__ */ N(""), Ls = /* @__PURE__ */ N("news"), Rs = [
		["news", Z("collectionKind.news")],
		["notices", Z("collectionKind.notices")],
		["publications", Z("collectionKind.publications")],
		["products", Z("collectionKind.products")],
		["custom", Z("collectionKind.custom")]
	], zs = null, Bs = {}, Vs = {}, Hs = !1, Us = /* @__PURE__ */ N($t([]));
	async function Ws() {
		let e = {
			version: 1,
			maler: []
		};
		try {
			e = await (await fetch("/content/maler.json")).json();
		} catch {}
		zs = Zi("urd-draft-templates", () => e, re, "urd-draft-maler"), P(Us, [...zs.data.maler ?? []], !0);
		for (let e of V(Us)) {
			let t = null;
			try {
				t = await (await fetch(`/content/maler/${e}.json`)).json();
			} catch {}
			Vs[e] = t, Bs[e] = Zi(`urd-draft-template-${e}`, () => t, re, `urd-draft-mal-${e}`), (Bs[e].data?.schemaVersion ?? 1) > 1 && Bs[e].reset();
		}
		Hs = !0, Gs();
	}
	function Gs() {
		let e = V(Us).map((e) => Bs[e]?.data ? {
			id: e,
			...JSON.parse(JSON.stringify(Bs[e].data))
		} : null).filter(Boolean).map(({ id: e, mal: t, section: n, blocks: r, page: i }) => ({
			id: e,
			name: t.name,
			kind: t.kind,
			section: n,
			blocks: r,
			page: i
		}));
		Ue?.sendTemplates(e);
	}
	function Ys(e) {
		let t = Ks.includes(e.kind) ? e.kind : "section";
		return $s(t, e[t]);
	}
	function Xs(e) {
		let { section: t, block: n } = Vt(e.sectionId, e.blockId);
		!t || !n?.sticky || Kt.some(([t]) => t === e.dock) && (nt(`sticky-dock:${e.blockId}`), n.sticky = {
			...n.sticky,
			dock: e.dock
		}, O.save(), Ze(), Ue?.sendSection(V(w), t), Ht());
	}
	function Zs(e) {
		let t = e.blockIds ?? [], { section: n } = Vt(e.sectionId, t[0]);
		if (!n || !t.length) return;
		nt(`sticky-group:${e.sectionId}`);
		let r = e.on ? vs("stk") : null;
		for (let e of n.blocks) t.includes(e.id) && (e.sticky = r ? {
			offset: 16,
			until: null,
			...e.sticky,
			group: r
		} : null);
		Ve(n, "block-edited"), O.save(), Ze(), Ue?.sendSection(V(w), n), Ht(), E(Z(e.on ? "status.stickyGrouped" : "status.stickyUngrouped"));
	}
	async function $s(e, t) {
		if (!t || !zs) return;
		let n = (await gt({
			title: Z("canvas.templateNamePrompt"),
			placeholder: Z("ph.templateName")
		}))?.trim();
		if (!n) return;
		let r = qs(n);
		if (!r) {
			E(Z("status.invalidName"), "error");
			return;
		}
		if (V(Us).includes(r)) {
			E(Z("status.templateExists"), "error");
			return;
		}
		nt("templates");
		let i = {
			schemaVersion: 1,
			mal: {
				name: n,
				kind: e
			},
			[e]: t
		};
		Bs[r] = Zi(`urd-draft-template-${r}`, () => null, re, `urd-draft-mal-${r}`), Bs[r].replace(i), Bs[r].save(), zs.data.maler = [...V(Us), r], zs.save(), P(Us, [...V(Us), r], !0), E(Z("status.templateSaved", { name: n }), "ok"), Ze(), Gs();
	}
	async function ec(e) {
		let t = Bs[e.id]?.data?.mal;
		t && await ht({ title: Z("confirm.deleteTemplate", { name: t.name }) }) && (nt("templates"), V(pa) === e.id && P(pa, null), localStorage.removeItem(`urd-draft-template-${e.id}`), localStorage.removeItem(`urd-draft-mal-${e.id}`), delete Bs[e.id], zs.data.maler = V(Us).filter((t) => t !== e.id), zs.save(), P(Us, V(Us).filter((t) => t !== e.id), !0), Ze(), Gs());
	}
	async function nc() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/collections.json")).json();
		} catch {}
		ks = Zi("urd-draft-collections", () => e, re, "urd-draft-samlinger"), P(Ns, [...ks.data.samlinger ?? []], !0);
		for (let e of V(Ns)) {
			let t = null;
			try {
				t = await (await fetch(`/content/samlinger/${e}.json`)).json();
			} catch {}
			js[e] = t, As[e] = Zi(`urd-draft-collection-${e}`, () => t, re, `urd-draft-samling-${e}`), !t && !As[e].data && (As[e].replace({
				schemaVersion: 1,
				id: e,
				name: e,
				kind: "custom",
				entries: []
			}), As[e].save());
		}
		Ms = !0, sc();
	}
	function sc(e = !0) {
		let t = {};
		for (let e of V(Ns)) As[e] && (t[e] = JSON.parse(JSON.stringify(As[e].data)));
		P(Ps, t, !0), e && cc();
	}
	function cc() {
		Ue?.sendCollections(We(V(Ps)) ?? {});
	}
	function lc(e, t, n, r = !0) {
		let i = As[e];
		i && (nt(t), n(i.data), i.save(), Ze(), sc(r));
	}
	function uc(e) {
		As[e.collection] && _c(e.collection);
	}
	function dc(e) {
		return (new DOMParser().parseFromString(String(e ?? ""), "text/html").body.textContent ?? "").trim();
	}
	function fc(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r === "title" && !dc(i) || lc(t, `edit:collection:${t}:${n}:${r}`, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image"));
	}
	function pc(e, t, n) {
		let r = {
			schemaVersion: 1,
			id: e,
			name: t,
			kind: n,
			entries: []
		};
		As[e] = Zi(`urd-draft-collection-${e}`, () => null, re, `urd-draft-samling-${e}`), As[e].replace(r), As[e].save(), ks.data.samlinger = [...V(Ns), e], ks.save(), P(Ns, [...V(Ns), e], !0), P(Fs, e, !0), Ze(), sc();
	}
	function mc() {
		let e = V(Is).trim();
		if (!e) return;
		let t = Da(e);
		if (!t || V(Ns).includes(t)) {
			E(Z(t ? "status.collectionExists" : "status.invalidName"), "error");
			return;
		}
		nt("collections"), pc(t, e, V(Ls)), P(Is, "");
	}
	function hc() {
		let e = Z("seed.productCatalogName"), t = Da(e) || "collection", n = t;
		for (let e = 2; V(Ns).includes(n); e += 1) n = `${t}-${e}`;
		nt("collections"), pc(n, e, "products"), Yt(null, (e) => {
			e.props.collection = n;
		});
	}
	function gc(e) {
		nt("collections"), localStorage.removeItem(`urd-draft-collection-${e}`), localStorage.removeItem(`urd-draft-samling-${e}`), delete As[e], ks.data.samlinger = V(Ns).filter((t) => t !== e), ks.save(), P(Ns, V(Ns).filter((t) => t !== e), !0), V(Fs) === e && P(Fs, null), Ze(), sc();
	}
	function _c(e) {
		lc(e, `collection:${e}:add-entry`, (e) => {
			e.kind === "products" ? e.entries.push({
				id: vs("entry"),
				title: Z("seed.newProduct"),
				text: ""
			}) : e.entries.unshift({
				id: vs("entry"),
				title: Z("seed.newEntry"),
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function vc(e, t, n, r) {
		lc(e, `edit:collection:${e}:${t}:${n}`, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function yc(e, t, n) {
		lc(e, `collection:${e}:move-entry`, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function bc(e, t) {
		lc(e, `collection:${e}:remove-entry`, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function xc(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && vc(e, t, "image", (await Dr(r)).dataUrl);
	}
	function Sc(e, t, n) {
		let r = n.split(",").map((e) => e.trim()).filter(Boolean);
		vc(e, t, "sizes", r.length ? r : "");
	}
	function Cc(e, t) {
		lc(e, `collection:${e}:${t}:colors`, (e) => {
			let n = e.entries.find((e) => e.id === t);
			n && (n.colors = [...n.colors ?? [], { name: Z("ph.colorName") }]);
		});
	}
	function wc(e, t, n, r, i) {
		lc(e, `edit:collection:${e}:${t}:color:${n}:${r}`, (e) => {
			let a = e.entries.find((e) => e.id === t)?.colors?.[n];
			a && (r === "image" && !i ? delete a.image : i && (a[r] = i));
		});
	}
	async function Tc(e, t, n, r) {
		let i = r.target.files?.[0];
		r.target.value = "", i && wc(e, t, n, "image", (await Dr(i)).dataUrl);
	}
	function Ec(e, t, n) {
		lc(e, `collection:${e}:${t}:colors`, (e) => {
			let r = e.entries.find((e) => e.id === t);
			r?.colors && (r.colors = r.colors.filter((e, t) => t !== n), r.colors.length || delete r.colors);
		});
	}
	function Oc(e) {
		let t = As[e]?.data;
		if (!t) return;
		let n = URL.createObjectURL(new Blob([Qs(t.entries)], { type: "text/csv" })), r = document.createElement("a");
		r.href = n, r.download = `${e}.csv`, r.click(), URL.revokeObjectURL(n);
	}
	async function jc(e, t) {
		let n = t.target.files?.[0];
		if (t.target.value = "", !n) return;
		let r = tc(await n.text());
		if (!r) {
			E(Z("status.csvInvalid"), "error");
			return;
		}
		let i = /* @__PURE__ */ new Set();
		for (let e of r.entries) (!/^[a-z0-9][a-z0-9-]*$/.test(e.id) || i.has(e.id)) && (e.id = vs("entry")), i.add(e.id);
		lc(e, `collection:${e}:import`, (e) => {
			e.entries = r.entries;
		}), E(Z("status.csvImported", { count: String(r.entries.length) }), "ok");
	}
	let Mc = null, Ic, zc = new Promise((e) => {
		Ic = e;
	}), Bc = /* @__PURE__ */ N(null), Kc = $t({}), qc = /* @__PURE__ */ N("0.0.0"), Jc = /* @__PURE__ */ N(""), Yc = /* @__PURE__ */ N(""), Xc = /* @__PURE__ */ N($t([])), Zc = /* @__PURE__ */ N($t([])), Qc = /* @__PURE__ */ N("pending"), $c = () => [.../* @__PURE__ */ new Set([...V(Bc)?.enabled ?? [], ...V(Bc)?.disabled ?? []])];
	function el() {
		P(Bc, JSON.parse(JSON.stringify(Mc.data)), !0);
	}
	let tl = /* @__PURE__ */ N(null);
	async function nl() {
		try {
			let e = (await fetch("/urd.json", { cache: "no-store" })).headers.get("content-security-policy");
			if (!e) {
				P(tl, { unknown: !0 }, !0);
				return;
			}
			let t = (t) => new Set((e.split(";").map((e) => e.trim()).find((e) => e.startsWith(`${t} `)) ?? "").split(/\s+/).slice(1));
			P(tl, {
				frameSrc: t("frame-src"),
				connectSrc: t("connect-src"),
				scriptSrc: t("script-src")
			}, !0);
		} catch {
			P(tl, { unknown: !0 }, !0);
		}
	}
	function al(e) {
		let t = [
			...(e.scriptSrc ?? []).map((e) => ["script-src", e]),
			...(e.connectSrc ?? []).map((e) => ["connect-src", e]),
			...(e.frameSrc ?? []).map((e) => ["frame-src", e])
		];
		if (!V(tl) || V(tl).unknown) return [];
		let n = {
			"script-src": V(tl).scriptSrc,
			"connect-src": V(tl).connectSrc,
			"frame-src": V(tl).frameSrc
		};
		return t.filter(([e, t]) => !n[e]?.has(t)).map(([e, t]) => `${e} ${t}`);
	}
	async function sl() {
		nl();
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		P(Zc, e.enabled ?? [], !0), Mc = Zi("urd-draft-plugins", () => e, re), el();
		try {
			P(qc, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of $c()) ul(e);
		cl(), Ic(), Ue?.sendPlugins(We(V(Bc))?.enabled ?? []);
	}
	async function cl() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				ll();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), P(Xc, (t ?? []).filter((e) => !$c().includes(e)), !0);
			for (let e of V(Xc)) ul(e);
			P(Qc, "ok");
		} catch {
			ll();
		}
	}
	function ll() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				P(Xc, e.filter((e) => !$c().includes(e)), !0);
				for (let e of V(Xc)) ul(e);
				P(Qc, "ok");
				return;
			}
		} catch {}
		P(Qc, "unavailable");
	}
	async function ul(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = _s(t);
			Kc[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && hs(V(qc), t.requiresEngine)
			};
		} catch {
			Kc[e] = {
				name: e,
				errors: [Z("plugin.manifestNotFound", { id: e })],
				satisfied: !1
			};
		}
	}
	function dl(e, t) {
		nt("plugins");
		let n = Mc.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), Mc.save(), Ze(), el(), fl();
	}
	function fl() {
		V(ae) && (V(ae).src = V(ae).src);
	}
	function pl(e) {
		nt("plugins");
		let t = Mc.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), Mc.save(), Ze(), el(), fl();
	}
	async function ml() {
		P(Yc, "");
		let e = V(Jc).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			P(Yc, Z("plugin.invalidId"), !0);
			return;
		}
		if ($c().includes(e)) {
			P(Yc, Z("plugin.alreadyListed"), !0);
			return;
		}
		if (await ul(e), Kc[e].errors.length) {
			P(Yc, Z("plugin.invalidManifest", { errors: Kc[e].errors.join("; ") }), !0);
			return;
		}
		dl(e, !0), P(Jc, "");
	}
	function hl(e) {
		P(Xc, V(Xc).filter((t) => t !== e), !0), dl(e, !0);
	}
	function gl(e, t) {
		da(e, () => {
			V(k).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(V(k).footer);
		});
	}
	function _l(e, t) {
		gl(`edit:footer-brand-${e}`, (n) => {
			n.brand ??= {}, t.trim() ? n.brand[e] = t : delete n.brand[e], !n.brand.title && !n.brand.tagline && !n.brand.logo && delete n.brand;
		});
	}
	function vl(e) {
		gl("footer", (t) => {
			t.brand ??= {}, e === "image" || e === "both" ? t.brand.mode = e : delete t.brand.mode;
		});
	}
	async function yl(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Dr(t);
			gl("footer", (t) => {
				t.brand ??= {}, t.brand.logo = e.dataUrl, t.brand.mode || (t.brand.mode = "both");
			});
		} catch {
			E(Z("status.imageReadErrorSvg"), "error");
		}
	}
	function bl() {
		gl("footer", (e) => {
			e.brand && (delete e.brand.logo, delete e.brand.mode, delete e.brand.logoHeight, !e.brand.title && !e.brand.tagline && delete e.brand);
		});
	}
	function xl(e) {
		gl("edit:footer-logo-height", (t) => {
			t.brand ??= {};
			let n = Number(e);
			Number.isFinite(n) && (t.brand.logoHeight = Math.min(160, Math.max(16, Math.round(n))));
		});
	}
	function Sl(e) {
		gl("edit:footer-copyright", (t) => {
			e.trim() ? t.copyright = e : delete t.copyright;
		});
	}
	let Cl = [
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
			id: "centered",
			label: Z("footerTemplate.centered"),
			thumb: {
				center: !0,
				row: !0,
				social: 3
			}
		},
		{
			id: "columns",
			label: Z("footerTemplate.columns"),
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
			id: "newsletter",
			label: Z("footerTemplate.newsletter"),
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
			label: Z("footerTemplate.bigcta"),
			thumb: {
				center: !0,
				bigcta: !0,
				baselineLinks: 2
			}
		},
		{
			id: "contact",
			label: Z("footerTemplate.contact"),
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
	function wl(e) {
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
		} : e === "centered" ? {
			align: "center",
			brand: { title: t },
			linkRow: r(5),
			social: i([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: `${o} · ${Z("seed.footer.madeWith")}`
		} : e === "columns" ? {
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
		} : e === "newsletter" ? {
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
		} : e === "bigcta" ? {
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
		} : e === "contact" ? {
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
						a(Z("seed.email"), `mailto:${Z("seed.email")}`),
						a(Z("seed.phone"), `tel:${Z("seed.phone").replace(/\s+/g, "")}`)
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
				links: [a(Z("seed.footer.newsletter"), "#"), a(Z("seed.email"), `mailto:${Z("seed.email")}`)]
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
					version: il.version ?? 1,
					props: {
						...il.defaults(),
						color: "accent",
						x: .12,
						y: 0,
						radius: .6,
						opacity: .45
					}
				}, {
					type: "grain",
					version: ol.version ?? 1,
					props: {
						...ol.defaults(),
						opacity: .08
					}
				}]
			}
		};
	}
	function Tl(e) {
		gl("footer-template", (t) => {
			let n = wl(e);
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
	function El(e) {
		gl("footer", (t) => {
			t[e] ??= [], t[e].push(V(k).pages[0] ? {
				label: Z("seed.link"),
				page: V(k).pages[0].id
			} : {
				label: Z("seed.link"),
				href: "https://"
			});
		});
	}
	function Dl(e, t) {
		gl("footer", (n) => {
			n[e].splice(t, 1), n[e].length || delete n[e];
		});
	}
	function Ol(e, t, n) {
		gl("footer", (r) => {
			let i = r[e], a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function kl(e, t, n) {
		gl(`edit:footer-${e}-label-${t}`, (r) => {
			r[e][t].label = n;
		});
	}
	function jl(e, t, n) {
		gl("footer", (r) => {
			let i = r[e][t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function Ml(e, t, n) {
		gl(`edit:footer-${e}-href-${t}`, (r) => {
			r[e][t].href = n;
		});
	}
	function Nl(e) {
		gl("footer", (t) => {
			e === "center" ? t.columnsAlign = "center" : delete t.columnsAlign;
		});
	}
	function Pl(e) {
		gl("footer", (t) => {
			e ? t.cta ??= {
				kind: "button",
				label: Z("seed.join")
			} : delete t.cta;
		});
	}
	function Il(e, t) {
		gl(`edit:footer-cta-${e}`, (n) => {
			n.cta ??= {}, t === "" || t == null || t === !1 ? delete n.cta[e] : n.cta[e] = t;
		});
	}
	function Ll(e) {
		gl("footer", (t) => {
			t.cta ??= {}, e === "__href" ? (delete t.cta.page, t.cta.href = t.cta.href ?? "https://") : (t.cta.page = e, delete t.cta.href);
		});
	}
	function Rl(e, t) {
		gl("footer", (n) => {
			let r = new Set(n.hideOn ?? []);
			t ? r.delete(e) : r.add(e), r.size ? n.hideOn = [...r] : delete n.hideOn;
		});
	}
	function zl() {
		gl("footer", (e) => {
			e.columns ??= [], e.columns.push({
				title: Z("seed.column"),
				links: [{
					label: Z("seed.link"),
					page: V(k).pages[0].id
				}]
			});
		});
	}
	function Bl(e) {
		gl("footer", (t) => {
			t.columns.splice(e, 1), t.columns.length || delete t.columns;
		});
	}
	function Ul(e, t) {
		gl("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.columns.length || ([n.columns[e], n.columns[r]] = [n.columns[r], n.columns[e]]);
		});
	}
	function Wl(e, t) {
		gl(`edit:footer-col-title-${e}`, (n) => {
			n.columns[e].title = t;
		});
	}
	function Gl(e) {
		gl("footer", (t) => {
			t.columns[e].links ??= [], t.columns[e].links.push({
				label: Z("seed.link"),
				page: V(k).pages[0].id
			});
		});
	}
	function nm(e, t) {
		gl("footer", (n) => {
			n.columns[e].links.splice(t, 1);
		});
	}
	function rm(e, t, n) {
		gl("footer", (r) => {
			let i = r.columns[e].links, a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function im(e, t, n) {
		gl(`edit:footer-link-label-${e}-${t}`, (r) => {
			r.columns[e].links[t].label = n;
		});
	}
	function am(e, t, n) {
		gl("footer", (r) => {
			let i = r.columns[e].links[t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function om(e, t, n) {
		gl(`edit:footer-link-href-${e}-${t}`, (r) => {
			r.columns[e].links[t].href = n;
		});
	}
	function sm() {
		gl("footer", (e) => {
			e.social ??= [], e.social.push({
				icon: "facebook",
				url: "https://"
			});
		});
	}
	function cm(e) {
		gl("footer", (t) => {
			t.social.splice(e, 1), t.social.length || delete t.social;
		});
	}
	function lm(e, t) {
		gl("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.social.length || ([n.social[e], n.social[r]] = [n.social[r], n.social[e]]);
		});
	}
	function um(e, t) {
		gl("footer", (n) => {
			n.social[e].icon = t;
		});
	}
	function dm(e, t) {
		gl(`edit:footer-social-url-${e}`, (n) => {
			n.social[e].url = t;
		});
	}
	let fm = Ha.filter(([e]) => e === "iconCat.social" || e === "iconCat.communication").flatMap(([, e]) => e.map((e) => [e, Z(Va[e].labelKey)]));
	function pm(e, t) {
		da(`edit:nav-label-${e}`, () => {
			V(k).nav.items[e].label = t;
		});
	}
	function mm(e, t) {
		da("nav", () => {
			let n = V(k).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function hm(e, t) {
		da(`edit:nav-href-${e}`, () => {
			V(k).nav.items[e].href = t;
		});
	}
	function gm(e, t) {
		let n = e + t, r = V(k).nav.items;
		n < 0 || n >= r.length || da("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function _m(e) {
		da("nav", () => {
			V(k).nav.items.splice(e, 1);
		});
	}
	let vm = /* @__PURE__ */ N(""), ym = /* @__PURE__ */ N(""), bm = /* @__PURE__ */ N(null);
	function xm(e) {
		let [t, n] = e.split(".").map(Number), r = V(k).nav.items;
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
	function Sm(e, t, n, r) {
		if (!V(ym) || V(ym) === t) return null;
		let i = e.getBoundingClientRect(), a = (r - i.top) / i.height, o = n - i.left, s = xm(V(ym)), c = xm(t), l = s.list[s.index], u;
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
		}, Cm(u, l, s);
	}
	function Cm(e, t, n) {
		let r = xm(e.key);
		if (r.parent) {
			if (r.parent === t) return null;
			t.children?.length && (e = {
				key: e.key.split(".")[0],
				pos: "after"
			}, r = xm(e.key));
		}
		let i = r.list[r.index];
		if (e.pos === "into") {
			let n = i.children ?? [];
			return n.length && n[n.length - 1] === t ? null : e;
		}
		let a = r.parent ? r.parent.children : V(k).nav.items, o = a.filter((e) => e !== t).indexOf(i) + +(e.pos === "after");
		return a === n.list && o === n.index ? null : e;
	}
	function wm() {
		if (!V(ym)) return {
			label: "",
			target: ""
		};
		let e = xm(V(ym)), t = e.list[e.index], n = t.page ? V(k).pages.find((e) => e.id === t.page) : null;
		return {
			label: t.label,
			target: n ? n.title : t.href ?? Z("opt.noLink")
		};
	}
	function Tm() {
		V(bm) && Dm(V(bm).key), P(ym, ""), P(bm, null);
	}
	function Em(e) {
		if (!V(ym)) return;
		let t = [...e.currentTarget.querySelectorAll(".nav-item:not(.ghost)")];
		if (!t.length) return;
		let n = t.find((t) => {
			let n = t.getBoundingClientRect();
			return e.clientY >= n.top && e.clientY <= n.bottom;
		}), r = null;
		if (n) r = Sm(n, n.dataset.key, e.clientX, e.clientY);
		else {
			let n = xm(V(ym)), i = n.list[n.index], a = t.find((t) => {
				let n = t.getBoundingClientRect();
				return n.top + n.height / 2 > e.clientY;
			});
			if (a) r = a.dataset.key === V(ym) ? null : Cm({
				key: a.dataset.key,
				pos: "before"
			}, i, n);
			else {
				let e = [...t].reverse().find((e) => !e.classList.contains("child"));
				r = e.dataset.key === V(ym) ? null : Cm({
					key: e.dataset.key,
					pos: "after"
				}, i, n);
			}
		}
		if (!r) {
			P(bm, null);
			return;
		}
		e.preventDefault(), (V(bm)?.key !== r.key || V(bm)?.pos !== r.pos) && P(bm, r, !0);
	}
	function Dm(e) {
		let t = V(ym), n = V(bm);
		if (P(ym, ""), P(bm, null), !(!t || !n || n.key !== e || t === e)) {
			{
				let r = xm(t), i = xm(e), a = r.list[r.index];
				if (i.parent && (i.parent === a || a.children?.length) || n.pos === "into" && a.children?.length) return;
			}
			da("nav", () => {
				let r = V(k).nav.items, i = xm(t), a = xm(e), o = i.list[i.index], s = a.list[a.index];
				if (o !== s) {
					if (i.list.splice(i.index, 1), i.parent && i.parent.children.length === 0 && delete i.parent.children, n.pos === "into") s.children ??= [], s.children.push(o);
					else {
						let e = a.parent ? a.parent.children : r, t = e.indexOf(s) + +(n.pos === "after");
						e.splice(t, 0, o);
					}
					!o.page && o.href == null && !o.children?.length && (o.page = V(k).pages[0].id);
				}
			}), P(vm, "");
		}
	}
	let Om = "<svg width=\"10\" height=\"16\" viewBox=\"0 0 10 16\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"3\" cy=\"3\" r=\"1.3\"/><circle cx=\"7\" cy=\"3\" r=\"1.3\"/><circle cx=\"3\" cy=\"8\" r=\"1.3\"/><circle cx=\"7\" cy=\"8\" r=\"1.3\"/><circle cx=\"3\" cy=\"13\" r=\"1.3\"/><circle cx=\"7\" cy=\"13\" r=\"1.3\"/></svg>";
	function km() {
		da("nav", () => {
			V(k).nav.items.push({
				label: Z("seed.link"),
				page: V(k).pages[0].id
			});
		});
	}
	function Am(e) {
		da("nav", () => {
			let t = V(k).nav.items[e];
			t.children ??= [], t.children.push({
				label: Z("seed.link"),
				page: V(k).pages[0].id
			});
		});
	}
	function jm(e, t, n) {
		da(`edit:nav-child-label-${e}-${t}`, () => {
			V(k).nav.items[e].children[t].label = n;
		});
	}
	function Mm(e, t, n) {
		da("nav", () => {
			let r = V(k).nav.items[e].children[t];
			n === "__href" ? (delete r.page, r.href = r.href ?? "https://") : (r.page = n, delete r.href);
		});
	}
	function Nm(e, t, n) {
		da(`edit:nav-child-href-${e}-${t}`, () => {
			V(k).nav.items[e].children[t].href = n;
		});
	}
	function Pm(e, t, n) {
		let r = t + n, i = V(k).nav.items[e].children;
		r < 0 || r >= i.length || da("nav", () => {
			[i[t], i[r]] = [i[r], i[t]];
		});
	}
	function Fm(e, t) {
		da("nav", () => {
			let n = V(k).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = V(k).pages[0].id));
		});
	}
	function Im(e, t) {
		da(`edit:theme-color-${e}`, () => {
			V(k).theme.tokens.color[e] = t, V(k).theme.alt?.auto && (V(k).theme.alt.tokens.color = Xm());
		});
	}
	function Lm(e, t) {
		return e === "accent-text" ? S(ih(t.accent ?? "#000000", t)) : t.bg;
	}
	let Rm = /* @__PURE__ */ A(() => !V(k)?.theme?.tokens?.color?.["accent-text"] && !V(k)?.theme?.alt?.tokens?.color?.["accent-text"]), zm = /* @__PURE__ */ N(null), Bm = /* @__PURE__ */ N(!1), Vm = /* @__PURE__ */ N(!1), Hm = (e) => e.length > 0 && [...e].every((e) => e.open);
	function Um() {
		let e = V(zm)?.querySelectorAll("details.group") ?? [];
		P(Bm, e.length > 0), P(Vm, Hm(e), !0);
	}
	bn(() => {
		V(j), fr().then(Um);
	});
	function Wm() {
		let e = !V(Vm);
		V(zm)?.querySelectorAll("details.group").forEach((t) => {
			t.open = e;
		}), Um();
	}
	function Gm(e) {
		for (let t of e.querySelectorAll("details.group")) {
			let e = t.querySelector(":scope > summary");
			if (!e || e.querySelector(".fold-sub")) continue;
			let n = () => t.querySelectorAll(":scope > .group-items details.group");
			if (!n().length) continue;
			let r = document.createElement("button");
			r.type = "button", r.className = "fold-sub fold-toggle", r.innerHTML = _.foldToggle;
			let i = () => {
				let e = Hm(n());
				r.classList.toggle("collapse", e), r.title = Z(e ? "ui.collapseSub" : "ui.expandSub"), r.setAttribute("aria-label", r.title);
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
	bn(() => {
		let e = V(zm);
		if (!e) return;
		let t = new MutationObserver(() => {
			Gm(e), Um();
		});
		return t.observe(e, {
			childList: !0,
			subtree: !0
		}), e.addEventListener("toggle", Um, !0), Gm(e), () => {
			t.disconnect(), e.removeEventListener("toggle", Um, !0);
		};
	});
	function Km(e) {
		da("edit:theme-color-accent-text", () => {
			e ? (delete V(k).theme.tokens.color["accent-text"], V(k).theme.alt?.tokens?.color && delete V(k).theme.alt.tokens.color["accent-text"]) : (V(k).theme.tokens.color["accent-text"] = Lm("accent-text", V(Yr)), V(k).theme.alt?.auto && (V(k).theme.alt.tokens.color = Xm()));
		});
	}
	function qm(e, t) {
		da("theme", () => {
			V(k).theme.tokens.font[e] = t;
		});
	}
	function Jm(e, t) {
		da("theme", () => {
			V(k).theme.tokens.radius[e] = t;
		});
	}
	function Ym(e) {
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
	function Xm() {
		return Object.fromEntries(Object.entries(V(k).theme.tokens.color).map(([e, t]) => [e, Ym(t)]));
	}
	function Zm(e, t) {
		da(`edit:theme-alt-${e}`, () => {
			V(k).theme.alt.tokens.color[e] = t, V(k).theme.alt.auto = !1;
		});
	}
	function Qm(e) {
		da("theme", () => {
			e === "light" ? delete V(k).theme.scheme : V(k).theme.scheme = e;
		});
	}
	function $m(e) {
		da("theme", () => {
			e ? V(k).theme.alt = {
				auto: !0,
				tokens: { color: Xm() }
			} : delete V(k).theme.alt;
		});
	}
	function eh(e) {
		da("theme", () => {
			V(k).theme.alt ??= { tokens: { color: Xm() } }, V(k).theme.alt.auto = e, e && (V(k).theme.alt.tokens.color = Xm());
		});
	}
	function th(e) {
		let t = V(k).theme.tokens.font[e];
		return [...ql.some(([, e]) => e === t) ? [] : [[t, Z("opt.customFont")]], ...ql.map(([e, t]) => [t, Z(e)])];
	}
	let nh = (e) => parseInt(e, 10) || 0;
	function rh(e, t) {
		Jm(e, `${t}px`);
	}
	let ih = (e, t) => e && t && t[e] ? t[e] : e, ah = [
		"bg",
		"surface",
		"text",
		"accent",
		"accent-text"
	], oh = [
		{
			id: "well",
			name: Z("themePreset.well.name"),
			note: Z("themePreset.well.note"),
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
			name: Z("themePreset.stone.name"),
			note: Z("themePreset.stone.note"),
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
			name: Z("themePreset.plum.name"),
			note: Z("themePreset.plum.note"),
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
			id: "ocean",
			name: Z("themePreset.ocean.name"),
			note: Z("themePreset.ocean.note"),
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
			name: Z("themePreset.night.name"),
			note: Z("themePreset.night.note"),
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
	function sh(e) {
		da("theme", () => {
			let t = e.scheme === "dark", n = t ? e.dark : e.light, r = t ? e.light : e.dark;
			for (let e of ah) V(k).theme.tokens.color[e] = n[e];
			t ? V(k).theme.scheme = "dark" : delete V(k).theme.scheme, V(k).theme.alt = { tokens: { color: { ...r } } };
		});
	}
	let ch = /* @__PURE__ */ A(() => {
		if (!V(k)) return null;
		let e = V(k).theme.tokens.color, t = V(k).theme.alt?.tokens?.color ?? {}, n = V(k).theme.scheme === "dark";
		return oh.find((r) => {
			let i = n ? r.dark : r.light, a = n ? r.light : r.dark;
			return ah.every((n) => e[n] === i[n] && t[n] === a[n]);
		})?.id ?? null;
	}), lh = 0;
	async function uh() {
		V(ce) && (lh = V(zm)?.scrollTop ?? 0), P(ce, !V(ce)), Ue?.sendChrome(V(ce)), V(ce) && (await fr(), requestAnimationFrame(() => {
			V(zm) && (V(zm).scrollTop = lh);
		}));
	}
	function dh(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (nt(`edit:${e.blockId}`), n.props = e.props, O.save(), Ze(), V(M)?.blockId === e.blockId && Ht(), e.rerender && Ue?.sendSection(V(w), t), P(ee, ""));
	}
	function fh(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		nt(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && Ve(t, "desktop-changed-after-mobile"), O.save(), Ze(), V(M)?.blockId === e.blockId && Ht();
	}
	function ph(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		!t?.frames?.desktop || t.frames.desktop.h === e.h || (O.amendBaseline((t) => {
			let n = t.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
			n?.frames?.desktop && (n.frames.desktop.h = e.h);
		}), O.hasDraft() && nt(`edit:${e.blockId}`), t.frames.desktop.h = e.h, O.save(), Ze(), V(M)?.blockId === e.blockId && Ht());
	}
	function mh(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			if (nt("mobile-reset"), e.blockId) {
				let n = t.blocks.find((t) => t.id === e.blockId);
				n && (n.frames.mobile = null);
			} else for (let e of t.blocks) e.frames.mobile = null;
			!Be(t) && t.responsive?.mobile && (t.responsive.mobile.attention = null), O.save(), Ze(), Le(), Ue?.sendSection(V(w), t);
		}
	}
	function hh(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		!n || typeof e.mobileOrder != "number" || (nt("mobile-order"), n.mobileOrder = e.mobileOrder, O.save(), Ze(), Ue?.sendSection(V(w), t));
	}
	function gh(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (nt("review-done"), t.responsive.mobile.attention = null, O.save(), Ze(), Le());
	}
	function _h(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (nt("block-flag"), typeof e.decor == "boolean" && (n.decor = e.decor), typeof e.hideMobile == "boolean" && (n.hideMobile = e.hideMobile), O.save(), Ze(), typeof e.hideMobile == "boolean" && V(be) === "mobile" && Ue?.sendSection(V(w), t), V(M)?.blockId === e.blockId && Ht());
	}
	function vh(e) {
		nt("add-section"), e.section.id || (e.section.id = vs("sec")), O.data.sections.splice(e.index, 0, e.section), O.save(), Ze(), Ue?.sendPage(V(w), O.data), P(zn, e.section.id, !0), Kn(e.section), P(j, "properties");
	}
	function yh(e) {
		let t = O.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (nt("move-section"), [t[n], t[r]] = [t[r], t[n]], O.save(), Ze(), Ue?.sendPage(V(w), O.data));
	}
	function bh(e) {
		nt("delete-section"), e.sectionId === V(zn) && (P(zn, null), P(Bn, null)), V(M)?.sectionId === e.sectionId && P(M, null), O.data.sections = O.data.sections.filter((t) => t.id !== e.sectionId), O.save(), Ze(), Ue?.sendPage(V(w), O.data);
	}
	function xh(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			nt("section-size"), t.size = {
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
			e.moves?.length && (Ve(t, "section-height"), V(M)?.sectionId === e.sectionId && Ht()), e.sectionId === V(zn) && P(Vn, e.minHeight, !0), O.save(), Ze();
		}
	}
	function Sh(e) {
		let t = O.data.sections.find((t) => t.id === e.fromSectionId), n = O.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		!t || !n || !r || (nt("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), Ve(t, "block-moved"), Ve(n, "block-moved"), O.save(), Ze(), Le(), Ue?.sendSection(V(w), t), Ue?.sendSection(V(w), n), V(M)?.blockId === e.blockId && (P(M, {
			...V(M),
			sectionId: e.toSectionId
		}, !0), Ht()));
	}
	function Ch(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		if (!t) return;
		let n = e.blockIds ?? [e.blockId];
		nt("delete-block"), t.blocks = t.blocks.filter((e) => !n.includes(e.id)), n.includes(V(M)?.blockId) && P(M, null), Ve(t, "block-deleted"), O.save(), Ze(), Ue?.sendSection(V(w), t);
	}
	let wh = {
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
				zoom: 15,
				height: 320
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
				submitLabel: Z("form.sendDefault"),
				successText: Z("form.thanksDefault"),
				fields: es()
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
				showCategories: !0,
				showSubscribe: !0
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
				showCategories: !0,
				showSubscribe: !0
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
				showCategories: !0,
				showSubscribe: !0
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
				showCategories: !0,
				showSubscribe: !0
			},
			w: 40,
			h: 180
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
				interval: 5
			},
			w: 88.89,
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
		timeline: {
			type: "timeline",
			props: {
				items: [
					{
						year: "2019",
						title: Z("seed.timeline.t1"),
						text: Z("seed.timeline.text")
					},
					{
						year: "2022",
						title: Z("seed.timeline.t2"),
						text: Z("seed.timeline.text")
					},
					{
						year: "2026",
						title: Z("seed.timeline.t3"),
						text: Z("seed.timeline.text")
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
				text: Z("seed.quoteBlock.text"),
				attribution: Z("seed.quoteBlock.name"),
				role: Z("seed.quoteBlock.role"),
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
				label: Z("seed.statsBlock.label"),
				countUp: !0
			},
			w: 20,
			h: 90
		},
		table: {
			type: "table",
			props: {
				header: !0,
				striped: !1,
				lines: "rows",
				rows: [
					[
						Z("seed.table.h1"),
						Z("seed.table.h2"),
						Z("seed.table.h3")
					],
					[
						Z("seed.table.r1c1"),
						Z("seed.table.r1c2"),
						""
					],
					[
						Z("seed.table.r2c1"),
						Z("seed.table.r2c2"),
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
				doneText: Z("seed.countdown.done"),
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
	function Th(e) {
		let t = wh[e];
		return t ? {
			id: vs("blk"),
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
	function Eh(e) {
		Ue ? Ue.sendPlaceBlock(e) : Dh(fi()?.id, e);
	}
	function Dh(e, t) {
		let n = O.data.sections.find((t) => t.id === e) ?? O.data.sections[0];
		if (!n) return;
		nt("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), Ve(n, "block-added"), O.save(), Ze(), Ue?.sendSection(V(w), n);
	}
	function Oh(e, t, n, r) {
		let i = O.data.sections.find((t) => t.id === e);
		if (!i || !t?.length) return;
		nt("add-blocks");
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
		}), Ve(i, "block-added"), O.save(), Ze(), Ue?.sendSection(V(w), i);
	}
	function kh(e) {
		Eh(Th(e));
	}
	let Ah = /* @__PURE__ */ N($t([])), jh = { map: [
		{
			key: "location",
			type: "place",
			label: Z("lbl.mapLocation"),
			placeholder: Z("ph.mapLocation")
		},
		{
			key: "zoom",
			type: "number",
			label: Z("lbl.mapZoom"),
			min: 1,
			max: 19
		},
		{
			key: "height",
			type: "number",
			label: Z("lbl.mapHeight"),
			min: 120,
			max: 900,
			step: 10
		}
	] };
	function Mh(e, t = {}) {
		let n = We(e);
		Eh({
			id: vs("blk"),
			type: n.type,
			version: n.version ?? 1,
			decor: !1,
			props: {
				...n.defaults ?? {},
				...We(t)
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
	let Nh = /* @__PURE__ */ N("");
	function Ph() {
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
				label: Z("blocks.map"),
				act: "block",
				kind: "map"
			},
			{
				label: Z("blocks.form"),
				act: "block",
				kind: "form"
			},
			{
				label: `${Z("blocks.calendar")}: ${Z("calendar.viewList")}`,
				act: "block",
				kind: "calendar"
			},
			{
				label: `${Z("blocks.calendar")}: ${Z("calendar.viewCards")}`,
				act: "block",
				kind: "calendar-cards"
			},
			{
				label: `${Z("blocks.calendar")}: ${Z("calendar.viewMonth")}`,
				act: "block",
				kind: "calendar-month"
			},
			{
				label: `${Z("blocks.calendar")}: ${Z("calendar.viewNext")}`,
				act: "block",
				kind: "calendar-next"
			},
			{
				label: Z("blocks.collection"),
				act: "block",
				kind: "collection"
			},
			{
				label: Z("blocks.faq"),
				act: "block",
				kind: "faq"
			},
			{
				label: Z("blocks.timeline"),
				act: "block",
				kind: "timeline"
			},
			{
				label: Z("blocks.quote"),
				act: "block",
				kind: "quote"
			},
			{
				label: Z("blocks.stats"),
				act: "block",
				kind: "stats"
			},
			{
				label: Z("blocks.table"),
				act: "block",
				kind: "table"
			},
			{
				label: Z("blocks.share"),
				act: "block",
				kind: "share"
			},
			{
				label: Z("blocks.countdown"),
				act: "block",
				kind: "countdown"
			},
			{
				label: Z("blocks.audio"),
				act: "block",
				kind: "audio"
			},
			{
				label: Z("blocks.product"),
				act: "block",
				kind: "product"
			},
			{
				label: Z("blocks.cart"),
				act: "block",
				kind: "cart"
			},
			{
				label: Z("blocks.checkout"),
				act: "block",
				kind: "checkout"
			},
			{
				label: Z("ui.emptyGallery"),
				act: "block",
				kind: "gallery"
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
		for (let t of V(Us)) {
			let n = Bs[t]?.data?.mal;
			n?.kind === "blocks" && e.push({
				label: n.name,
				act: "template",
				id: t
			});
		}
		for (let t of V(Ah)) if (t.variants?.length) for (let n of t.variants) e.push({
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
	function Fh(e) {
		e.act === "block" ? kh(e.kind) : e.act === "plugin" ? Mh(e.entry, e.props ?? {}) : e.act === "template" && Ue?.sendInsertTemplate(e.id);
	}
	function Ih(e) {
		let t = Th(e.kind);
		if (t) {
			if (e.at && typeof e.at.x == "number" && typeof e.at.y == "number") {
				let n = O.data.sections.find((t) => t.id === e.sectionId)?.grid ?? V(k).grid, r = Jl({
					x: e.at.x,
					y: e.at.y,
					w: t.frames.desktop.w,
					h: t.frames.desktop.h,
					grid: n
				});
				t.frames.desktop.x = r.x, t.frames.desktop.y = r.y;
			} else t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40;
			Dh(e.sectionId, t), Ue?.sendSelect(t.id), e.kind === "image" && E(Z("status.imageBlockAdded")), e.kind === "gallery" && E(Z("status.galleryBlockAdded"));
		}
	}
	async function Lh(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		E(Z("status.compressingImage"));
		let n;
		try {
			n = await Dr(t);
		} catch {
			E(Z("status.imageReadError"), "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (V(ae)?.clientWidth ?? 1280));
		Eh({
			id: vs("blk"),
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: Da(t.name).replaceAll("-", " "),
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
		}), n.bytes > 4e5 ? E(Z("status.imageLarge", { kb: Math.round(n.bytes / 1024) }), "error") : E("");
	}
	async function Rh(e) {
		let t = [], n = 0, r = 0;
		for (let i of e) try {
			let e = await Dr(i);
			e.bytes > 4e5 && (r += 1), t.push({
				src: e.dataUrl,
				alt: Da(i.name).replaceAll("-", " "),
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
	function zh(e, t, n) {
		t ? E(Z("status.imagesReadFailed", { n: t }), "error") : n ? E(Z("status.imagesLarge", { n }), "error") : E(e ? "" : Z("status.noImagesAdded"));
	}
	async function Bh(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		E(Z("status.compressingImages"));
		let { images: n, failed: r, big: i } = await Rh(t);
		n.length && Yt("gallery-add", (e) => {
			e.props.images.push(...n);
		}), zh(n.length, r, i);
	}
	async function Vh(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		E(Z("status.compressingImages"));
		let { images: n, failed: r, big: i } = await Rh(t);
		if (!n.length) {
			zh(0, r, i);
			return;
		}
		let a = Th("gallery");
		a.props.images = n, Eh(a), zh(n.length, r, i);
	}
	function Hh(e, t) {
		Yt("gallery-move", (n) => {
			let r = e + t;
			r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
		});
	}
	function Uh(e) {
		Yt("gallery-remove", (t) => {
			t.props.images.splice(e, 1);
		});
	}
	function Wh(e, t, n) {
		Yt(`edit:${V(M).blockId}:img${e}-${t}`, (r) => {
			r.props.images[e][t] = n;
		});
	}
	function Gh(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/") && !i?.startsWith("data:audio/") && !i?.startsWith("data:video/")) return;
		let a = i.split(",", 2)[1], o = `media/${Da(n || "image")}-${Oa(a)}.${Ea(i)}`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function Kh(e, t) {
		Gh(e, "image", e.title, t);
		for (let n of e.colors ?? []) Gh(n, "image", `${e.title}-${n.name}`, t);
	}
	function qh(e, t) {
		for (let n of e?.layers ?? []) {
			if (n.type === "image" && Gh(n.props, "src", "background", t), n.type === "slideshow") for (let e of n.props.images ?? []) Gh(e, "src", "background", t);
			n.type === "video" && (Gh(n.props, "src", "video", t), Gh(n.props, "poster", "plakat", t));
		}
	}
	function Jh(e, t) {
		if (e.type === "image" && Gh(e.props, "src", e.props.alt, t), e.type === "icon" && Gh(e.props, "image", "ikon", t), e.type === "gallery") for (let n of e.props.images ?? []) Gh(n, "src", n.alt || "gallery", t);
		e.type === "audio" && Gh(e.props, "src", e.props.title || "lyd", t);
	}
	function Yh(e, t) {
		qh(e.background, t);
		for (let n of e.blocks) Jh(n, t);
	}
	function Xh(e) {
		let t = [];
		e.meta?.og && Gh(e.meta.og, "image", "share", t);
		for (let n of e.sections) Yh(n, t);
		return t;
	}
	function Zh(e) {
		let t = [], n = e.nav?.logo;
		return n?.type === "image" && Gh(n, "value", "logo", t), n?.type === "both" && Gh(n, "image", "logo", t), e.nav?.style && Gh(e.nav.style, "image", "menu", t), qh(e.nav?.style?.background, t), qh(e.footer?.background, t), e.footer?.brand && Gh(e.footer.brand, "logo", "footer-logo", t), Gh(e.site, "icon", "ikon", t), t;
	}
	let Qh = /* @__PURE__ */ N(!1), $h = /* @__PURE__ */ N(null);
	function eg() {
		P(Qh, !V(Qh));
	}
	function tg() {
		P(Qh, !1);
		try {
			ng(), E(Z("ui.discarded"), "info");
		} catch (e) {
			console.error("Urd: discard failed", e), E(String(e?.message ?? e), "error");
		}
	}
	bn(() => {
		if (!V(Qh)) return;
		let e = (e) => {
			if (!V($h)?.contains(e.target)) {
				P(Qh, !1);
				return;
			}
			e.target instanceof Element && e.target.closest(".discard-confirm") && (e.preventDefault(), e.stopPropagation(), tg());
		}, t = (e) => {
			e.key === "Escape" && P(Qh, !1);
		}, n = !1, r = (e) => {
			n = !!V($h)?.contains(e.target);
		}, i = () => {
			n = !1;
		}, a = () => {
			n || P(Qh, !1);
		};
		return window.addEventListener("pointerdown", r, !0), window.addEventListener("pointerup", i, !0), window.addEventListener("click", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", a), () => {
			window.removeEventListener("pointerdown", r, !0), window.removeEventListener("pointerup", i, !0), window.removeEventListener("click", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", a);
		};
	});
	function ng() {
		nt("discard");
		for (let e of V(k).pages) e.id !== V(w) && !qe.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = O.reset();
		if (He.reset(), Mc && (Mc.reset(), el()), ks) {
			ks.reset(), P(Ns, [...ks.data.samlinger ?? []], !0);
			for (let e of Object.keys(As)) V(Ns).includes(e) ? As[e].reset() : delete As[e];
			sc();
		}
		if (zs) {
			zs.reset(), P(Us, [...zs.data.maler ?? []], !0);
			for (let e of Object.keys(Bs)) V(Us).includes(e) ? Bs[e].reset() : (localStorage.removeItem(`urd-draft-template-${e}`), localStorage.removeItem(`urd-draft-mal-${e}`), delete Bs[e]);
			Gs();
		}
		Ge(), P(se, {
			snap: !0,
			...V(k).grid
		}, !0), Ze(), P(ee, ""), Ke(), V(k).pages.some((e) => e.id === V(w)) ? Ue?.sendPage(V(w), e) : qi(V(k).pages[0].id);
	}
	async function rg() {
		if (ki) {
			E(Z("status.revertReloadBeforePublish"), "error");
			return;
		}
		if (V(Li)) {
			E(Z("update.publishBlocked"), "error");
			return;
		}
		E(Z("status.publishing"));
		let e = [], t = [], n = [], r = [];
		for (let i of V(k).pages) {
			let a = `urd-draft-${i.id}`, o = qe.has(i.id) || !V(C).pages.some((e) => e.id === i.id), s = null;
			if (i.id === V(w) && (O.hasDraft() || o)) s = O.data;
			else if (i.id !== V(w)) {
				let e = localStorage.getItem(a);
				if (e) try {
					s = fs(JSON.parse(e), He.data);
				} catch {}
			}
			if (!s && o && (s = Ki(i)), !s) continue;
			let c = JSON.parse(JSON.stringify(s));
			e.push(...Xh(c)), e.push({
				path: i.file,
				content: JSON.stringify(c, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (He.hasDraft()) {
			let r = JSON.parse(JSON.stringify(V(k)));
			e.push(...Zh(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), e.push({
				path: "content/theme.css",
				content: Rc(r.theme),
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(V(C).theme, V(k).theme) || t.push(Z("publish.part.theme")), i(V(C).nav, V(k).nav) || t.push(Z("publish.part.nav")), i(V(C).footer, V(k).footer) || t.push(Z("publish.part.footer")), i(V(C).pages, V(k).pages) || t.push(Z("publish.part.pages")), i(V(C).grid, V(k).grid) || t.push(Z("publish.part.grid")), (V(C).site.icon ?? null) !== (V(k).site.icon ?? null) && t.push(Z("publish.part.icon"));
			let { icon: a, ...o } = V(C).site, { icon: s, ...c } = V(k).site;
			i(o, c) || t.push(Z("publish.part.siteInfo"));
		}
		let i = Object.entries(As).filter(([, e]) => e.hasDraft());
		if (i.length || ks?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) Kh(t, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), ac.includes(i.kind) && e.push({
					path: `content/samlinger/${t}.xml`,
					content: oc({
						title: i.name ?? t,
						origin: location.origin,
						path: `/content/samlinger/${t}.xml`,
						items: i.entries.map((e) => ({
							id: e.id,
							title: dc(e.title),
							text: dc(e.text),
							date: e.date,
							href: e.href
						}))
					}),
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (ks?.hasDraft()) {
				e.push({
					path: "content/collections.json",
					content: JSON.stringify(ks.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-collections", "urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/collections.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!V(Ns).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push(Z("publish.part.collections"));
		}
		let a = Object.entries(Bs).filter(([, e]) => e.hasDraft());
		if (a.length || zs?.hasDraft()) {
			for (let [t, r] of a) {
				let i = JSON.parse(JSON.stringify(r.data));
				i.section && Yh(i.section, e);
				for (let t of i.blocks ?? []) Jh(t, e);
				for (let t of i.page?.sections ?? []) Yh(t, e);
				e.push({
					path: `content/maler/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-mal-${t}`);
			}
			if (zs?.hasDraft()) {
				e.push({
					path: "content/maler.json",
					content: JSON.stringify(zs.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-templates", "urd-draft-maler");
				let t = { maler: [] };
				try {
					t = await (await fetch("/content/maler.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.maler ?? []) {
					let t = `content/maler/${n}.json`;
					!V(Us).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push(Z("publish.part.templates"));
		}
		Mc?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(Mc.data, null, 2) + "\n",
			encoding: "utf-8"
		}), n.push("urd-draft-plugins"), t.push(Z("publish.part.plugins")));
		try {
			let t = await (await fetch("/index.html")).text();
			for (let n of V(k).pages) n.path !== "/" && e.push({
				path: `${n.path.slice(1)}/index.html`,
				content: t,
				encoding: "utf-8"
			});
		} catch {}
		e.push({
			path: "sitemap.xml",
			content: rc(V(k).pages, location.origin),
			encoding: "utf-8"
		}), e.push({
			path: "robots.txt",
			content: ic(location.origin),
			encoding: "utf-8"
		});
		let o = new Set(e.map((e) => e.path)), s = (t) => {
			o.has(t) || e.push({
				path: t,
				delete: !0
			});
		};
		for (let e of V(C).pages) {
			let t = V(k).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && s(`${e.path.slice(1)}/index.html`) : (s(e.file), e.path !== "/" && s(`${e.path.slice(1)}/index.html`));
		}
		let c = await xi(e);
		if (!c.ok) {
			E(Z("status.publishAborted"), "error");
			return;
		}
		let l = {
			message: Z("publish.commitMessage", { titles: t.join(", ") || Z("publish.theSite") }),
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
			t ? yi = t : bi(), Xh(O.data), Zh(V(k));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) qe.add(e);
			if (P(C, JSON.parse(JSON.stringify(V(k))), !0), He = Zi("urd-draft-site", () => V(C), re), Ge(), Mc) {
				let e = JSON.parse(JSON.stringify(Mc.data));
				Mc = Zi("urd-draft-plugins", () => e, re), el();
			}
			if (ks) {
				for (let e of Object.values(As)) for (let t of e.data.entries) Kh(t, []);
				let e = JSON.parse(JSON.stringify(ks.data));
				ks = Zi("urd-draft-collections", () => e, re, "urd-draft-samlinger"), js = {};
				for (let e of V(Ns)) {
					if (!As[e]) continue;
					let t = JSON.parse(JSON.stringify(As[e].data));
					js[e] = t, As[e] = Zi(`urd-draft-collection-${e}`, () => t, re, `urd-draft-samling-${e}`);
				}
				sc();
			}
			if (zs) {
				for (let e of Object.values(Bs)) {
					e.data?.section && Yh(e.data.section, []);
					for (let t of e.data?.blocks ?? []) Jh(t, []);
					for (let t of e.data?.page?.sections ?? []) Yh(t, []);
				}
				let e = JSON.parse(JSON.stringify(zs.data));
				zs = Zi("urd-draft-templates", () => e, re, "urd-draft-maler"), Vs = {};
				for (let e of V(Us)) {
					if (!Bs[e]) continue;
					let t = JSON.parse(JSON.stringify(Bs[e].data));
					Vs[e] = t, Bs[e] = Zi(`urd-draft-template-${e}`, () => t, re, `urd-draft-mal-${e}`);
				}
				Gs();
			}
			P(se, {
				snap: !0,
				...V(k).grid
			}, !0);
			let i = JSON.parse(JSON.stringify(O.data));
			O = Zi(`urd-draft-${V(w)}`, () => i, re), qe.has(V(w)) && ie(`urd-draft-${V(w)}`, JSON.stringify(i)), Ze(), E(Z("status.published"), "info"), Pi(e);
		} else if (u?.status === 401) {
			let e = await u.json().catch(() => null);
			E(e?.code === "loginExpired" ? Z("status.loginExpired") : Z("status.loginRequired", { reason: Ui(e) ?? Z("status.unknownReason") }), "error"), await vi();
		} else u?.status === 403 ? E(Ui(await u.json().catch(() => null)) ?? Z("status.noPublishAccess"), "error") : u?.status === 409 ? E(Z("status.publishRace"), "error") : E(u ? Ui(await u.json().catch(() => null)) ?? Z("status.publishFailed") : Z("status.publishUnavailable"), "error");
	}
	pt();
	var ig = tm();
	Cr("keydown", en, ft), Cr("pointerdown", en, dt);
	var ag = L(ig), og = I(ag), sg = (e) => {
		var t = Td(), n = I(t);
		q(n, () => _.pencil);
		var r = z(n);
		D(t), B((e, n) => {
			X(t, "title", e), G(r, ` ${n ?? ""}`);
		}, [() => Z("tip.backToEdit"), () => Z("ui.edit")]), H("click", t, uh), W(e, t);
	};
	K(og, (e) => {
		V(ce) || e(sg);
	});
	var cg = z(og, 2);
	let lg;
	var ug = I(cg), dg = I(ug), fg = (e) => {
		var t = Id(), n = L(t), r = R(n, !0), i = z(n, 2), a = I(i), o = (e) => {
			var t = Od(), n = I(t);
			let r;
			var i = I(n);
			q(i, () => _[`device_${V(ve)}`]), q(z(i), () => _.caret), D(n);
			var a = z(n, 2), o = (e) => {
				var t = Dd();
				Jr(t, 21, () => V(ge), (e) => e.id, (e, t) => {
					var n = Ed();
					let r;
					var i = I(n);
					q(i, () => _[`device_${V(t).id}`]);
					var a = z(i);
					D(n), B((e, i) => {
						r = hi(n, 1, "ghost svelte-1n46o8q", null, r, { active: V(ve) === V(t).id }), X(n, "title", e), G(a, ` ${i ?? ""}`);
					}, [() => _e(V(t)), () => Z(`lbl.device.${V(t).id}`)]), H("click", n, () => {
						P(ve, V(t).id, !0), P(ia, null);
					}), W(e, n);
				}), D(t), W(e, t);
			};
			K(a, (e) => {
				V(ia) === "device" && e(o);
			}), D(t), B((e) => {
				r = hi(n, 1, "ghost svelte-1n46o8q", null, r, { active: V(ia) === "device" }), X(n, "title", e);
			}, [() => Z("lbl.group.device")]), H("click", n, () => P(ia, V(ia) === "device" ? null : "device", !0)), W(e, t);
		}, s = (e) => {
			var t = Ad(), n = L(t), r = R(n, !0), i = z(n, 2);
			Jr(i, 21, () => V(ge), (e) => e.id, (e, t) => {
				var n = kd();
				let r;
				q(n, () => _[`device_${V(t).id}`], !0), D(n), B((e) => {
					r = hi(n, 1, "ghost svelte-1n46o8q", null, r, { active: V(ve) === V(t).id }), X(n, "title", e);
				}, [() => _e(V(t))]), H("click", n, () => P(ve, V(t).id, !0)), W(e, n);
			}), D(i), B((e) => G(r, e), [() => Z("lbl.group.device")]), W(e, t);
		};
		K(a, (e) => {
			oa.device ? e(o) : e(s, -1);
		});
		var c = z(a, 2), l = (e) => {
			var t = Md(), n = I(t);
			let r;
			var i = I(n), a = R(i);
			q(z(i), () => _.caret), D(n);
			var o = z(n, 2), s = (e) => {
				var t = jd(), n = I(t), r = I(n);
				q(r, () => _.minus, !0), D(r);
				var i = z(r, 2), a = R(i), o = z(i, 2);
				q(o, () => _.plus, !0), D(o), D(n);
				var s = z(n, 2);
				let c;
				var l = I(s);
				q(l, () => _.fit);
				var u = z(l);
				D(s), D(t), B((e, t, n, l, d, f) => {
					X(r, "title", e), X(i, "title", t), G(a, `${n ?? ""}%`), X(o, "title", l), c = hi(s, 1, "ghost svelte-1n46o8q", null, c, { active: V(we) === "fit" }), X(s, "title", d), G(u, ` ${f ?? ""}`);
				}, [
					() => Z("tip.zoomOut"),
					() => Z("tip.zoomCurrent"),
					() => Math.round(V(Ae) * 100),
					() => Z("tip.zoomIn"),
					() => Z("tip.zoomFit"),
					() => Z("lbl.zoom.fit")
				]), H("click", r, () => je(-1)), H("click", o, () => je(1)), H("click", s, () => P(we, "fit")), W(e, t);
			};
			K(o, (e) => {
				V(ia) === "zoom" && e(s);
			}), D(t), B((e, t) => {
				r = hi(n, 1, "ghost svelte-1n46o8q", null, r, { active: V(ia) === "zoom" }), X(n, "title", e), G(a, `${t ?? ""}%`);
			}, [() => Z("lbl.group.zoom"), () => Math.round(V(Ae) * 100)]), H("click", n, () => P(ia, V(ia) === "zoom" ? null : "zoom", !0)), W(e, t);
		}, u = (e) => {
			var t = Nd(), n = L(t), r = R(n, !0), i = z(n, 2), a = I(i);
			q(a, () => _.minus, !0), D(a);
			var o = z(a, 2), s = R(o), c = z(o, 2);
			q(c, () => _.plus, !0), D(c);
			var l = z(c, 2);
			let u;
			q(l, () => _.fit, !0), D(l), D(i), B((e, t, n, i, d, f) => {
				G(r, e), X(a, "title", t), X(o, "title", n), G(s, `${i ?? ""}%`), X(c, "title", d), u = hi(l, 1, "ghost svelte-1n46o8q", null, u, { active: V(we) === "fit" }), X(l, "title", f);
			}, [
				() => Z("lbl.group.zoom"),
				() => Z("tip.zoomOut"),
				() => Z("tip.zoomCurrent"),
				() => Math.round(V(Ae) * 100),
				() => Z("tip.zoomIn"),
				() => Z("tip.zoomFit")
			]), H("click", a, () => je(-1)), H("click", c, () => je(1)), H("click", l, () => P(we, "fit")), W(e, t);
		};
		K(c, (e) => {
			oa.zoom ? e(l) : e(u, -1);
		});
		var d = z(c, 2), f = (e) => {
			var t = Od(), n = I(t);
			let r;
			var i = I(n);
			q(i, () => _.gridToggle), q(z(i), () => _.caret), D(n);
			var a = z(n, 2), o = (e) => {
				var t = Pd(), n = I(t);
				let r;
				var i = I(n);
				q(i, () => _.gridToggle);
				var a = z(i);
				D(n);
				var o = z(n, 2);
				let s;
				var c = I(o);
				q(c, () => _.guides);
				var l = z(c);
				D(o), D(t), B((e, t, i, c) => {
					r = hi(n, 1, "ghost svelte-1n46o8q", null, r, { active: V(ca) }), X(n, "title", e), G(a, ` ${t ?? ""}`), s = hi(o, 1, "ghost svelte-1n46o8q", null, s, { active: V(Qi) }), X(o, "title", i), G(l, ` ${c ?? ""}`);
				}, [
					() => Z("tip.gridToggle"),
					() => Z("lbl.view.grid"),
					() => Z("tip.guides"),
					() => Z("lbl.view.guides")
				]), H("click", n, la), H("click", o, sa), W(e, t);
			};
			K(a, (e) => {
				V(ia) === "view" && e(o);
			}), D(t), B((e) => {
				r = hi(n, 1, "ghost svelte-1n46o8q", null, r, { active: V(ia) === "view" || V(ca) || V(Qi) }), X(n, "title", e);
			}, [() => Z("lbl.group.view")]), H("click", n, () => P(ia, V(ia) === "view" ? null : "view", !0)), W(e, t);
		}, p = (e) => {
			var t = Fd(), n = L(t), r = R(n, !0), i = z(n, 2), a = I(i);
			let o;
			q(a, () => _.gridToggle, !0), D(a);
			var s = z(a, 2);
			let c;
			q(s, () => _.guides, !0), D(s), D(i), B((e, t, n) => {
				G(r, e), o = hi(a, 1, "ghost svelte-1n46o8q", null, o, { active: V(ca) }), X(a, "title", t), c = hi(s, 1, "ghost svelte-1n46o8q", null, c, { active: V(Qi) }), X(s, "title", n);
			}, [
				() => Z("lbl.group.view"),
				() => Z("tip.gridToggle"),
				() => Z("tip.guides")
			]), H("click", a, la), H("click", s, sa), W(e, t);
		};
		K(d, (e) => {
			oa.view ? e(f) : e(p, -1);
		}), D(i), Ai(i, (e) => P(aa, e), () => V(aa)), B((e, t) => {
			X(n, "title", e), G(r, t);
		}, [() => Z("tip.switchPage"), () => Xe()?.title ?? ""]), H("click", n, () => Bt("pages")), W(e, t);
	};
	K(dg, (e) => {
		V(C) && e(fg);
	});
	var pg = z(dg, 2), mg = (e) => {
		var t = Ld(), n = I(t);
		q(n, () => _.phone);
		var r = z(n, 2), i = R(r, !0), a = R(z(r, 2), !0);
		D(t), B((e, n) => {
			X(t, "title", e), G(i, n), G(a, V(Ie));
		}, [() => Z("tip.attention"), () => Z(V(Ie) === 1 ? "ui.attentionOne" : "ui.attentionMany", { n: V(Ie) })]), H("click", t, Re), W(e, t);
	};
	K(pg, (e) => {
		V(Ie) > 0 && e(mg);
	}), D(ug);
	var hg = z(ug, 2), gg = I(hg), _g = (e) => {
		var t = zd(), n = I(t), r = R(I(n), !0);
		Oe(2), D(n);
		var i = z(n, 2), a = I(i);
		let o;
		var s = I(a);
		q(s, () => _.restore);
		var c = R(z(s), !0);
		D(a);
		var l = z(a, 2), u = (e) => {
			var t = Rd(), n = I(t);
			q(n, () => _.restore);
			var r = z(n);
			D(t), B((e, n) => {
				X(t, "title", e), G(r, ` ${n ?? ""}`);
			}, [() => Z("tip.discardArmed"), () => Z("ui.discardConfirm")]), H("click", t, tg), W(e, t);
		};
		K(l, (e) => {
			V(Qh) && e(u);
		}), D(i), Ai(i, (e) => P($h, e), () => V($h)), D(t), B((e, t, i, s, l) => {
			X(n, "title", e), X(n, "aria-label", t), G(r, i), o = hi(a, 1, "discard-dot svelte-1n46o8q", null, o, { armed: V(Qh) }), X(a, "title", s), G(c, l);
		}, [
			() => Z("ui.unpublished"),
			() => Z("ui.unpublished"),
			() => Z("ui.unpublished"),
			() => V(Qh) ? Z("tip.discardArmed") : Z("tip.discard"),
			() => Z("ui.discard")
		]), H("click", a, eg), ci(2, t, () => Xi, () => ({
			x: 24,
			duration: Gt ? 0 : 150
		})), W(e, t);
	};
	K(gg, (e) => {
		V(T) && e(_g);
	}), D(hg);
	var vg = z(hg, 2), yg = I(vg), bg = (e) => {
		var t = Ud(), n = L(t), r = I(n), i = (e) => {
			var t = Bd(), n = L(t);
			q(n, () => _.eye);
			var r = R(z(n, 2), !0);
			B((e) => G(r, e), [() => Z("ui.cleanView")]), W(e, t);
		}, a = (e) => {
			var t = Bd(), n = L(t);
			q(n, () => _.pencil);
			var r = R(z(n, 2), !0);
			B((e) => G(r, e), [() => Z("ui.edit")]), W(e, t);
		};
		K(r, (e) => {
			V(ce) ? e(i) : e(a, -1);
		}), D(n);
		var o = z(n, 2), s = (e) => {
			var t = Vd(), n = I(t), r = (e) => {
				var t = Nr();
				q(L(t), () => _.warn), W(e, t);
			};
			K(n, (e) => {
				V(oe).allowed || e(r);
			});
			var i = z(n, 1, !0);
			D(t), B((e) => {
				X(t, "title", e), G(i, V(oe).login);
			}, [() => V(oe).allowed ? Z("tip.hasPublishAccess") : Z("tip.noPublishAccess")]), W(e, t);
		}, c = (e) => {
			var t = Hd(), n = R(t, !0);
			B((e) => G(n, e), [() => Z("ui.loginGitHub")]), W(e, t);
		};
		K(o, (e) => {
			V(oe)?.loggedIn ? e(s) : V(oe) && e(c, 1);
		});
		var l = z(o, 2), u = I(l);
		q(u, () => _.external);
		var d = R(z(u, 2), !0);
		D(l);
		var f = z(l, 2), p = R(f, !0);
		B((e, t, r, i, a) => {
			X(n, "title", e), X(l, "href", t), X(l, "title", r), G(d, i), f.disabled = !V(T), G(p, a);
		}, [
			() => V(ce) ? Z("tip.chromeHide") : Z("tip.chromeShow"),
			() => Xe()?.path ?? "/",
			() => Z("ui.viewSite"),
			() => Z("ui.viewSite"),
			() => Z("ui.publish")
		]), H("click", n, uh), H("click", f, rg), W(e, t);
	};
	K(yg, (e) => {
		V(C) && e(bg);
	}), D(vg), D(cg);
	var xg = z(cg, 2), Sg = (e) => {
		var t = Jp(), i = I(t);
		let o;
		var l = I(i);
		Jr(l, 17, () => kt, Wr, (e, t, n) => {
			var r = Gd(), i = L(r), a = R(i, !0);
			Jr(z(i, 2), 16, () => V(t), (e) => e, (e, t) => {
				var n = Wd();
				let r;
				var i = R(n, !0);
				B(() => {
					r = hi(n, 1, "svelte-1n46o8q", null, r, { active: V(j) === t }), G(i, jt[t]);
				}), H("click", n, () => Bt(t)), W(e, n);
			}), B((e) => G(a, e), [() => Z(At[n])]), W(e, r);
		});
		var m = z(l, 2), g = z(I(m), 2);
		let y;
		q(g, () => _.gear, !0), D(g);
		var x = z(g, 2), C = (e) => {
			var t = Jd(), n = I(t), r = R(n, !0), i = z(n, 2), a = I(i);
			Q(z(a), {
				get value() {
					return V(b);
				},
				get options() {
					return v;
				},
				onchange: (e) => P(b, e, !0)
			}), D(i);
			var o = z(i, 2), s = I(o), c = z(s);
			{
				let e = /* @__PURE__ */ A(() => [["auto", Z("lang.auto")], ...It()]);
				Q(c, {
					get value() {
						return Rt;
					},
					get options() {
						return V(e);
					},
					onchange: zt
				});
			}
			D(o);
			var l = z(o, 2), u = I(l), d = z(u);
			{
				let e = /* @__PURE__ */ A(() => [["strip", Z("settings.layoutPickerStrip")], ["menu", Z("settings.layoutPickerMenu")]]);
				Q(d, {
					get value() {
						return V(ea);
					},
					get options() {
						return V(e);
					},
					onchange: ta
				});
			}
			D(l);
			var f = z(l, 2), p = I(f), m = z(p);
			{
				let e = /* @__PURE__ */ A(() => [["remember", Z("settings.panelsRemember")], ["reset", Z("settings.panelsReset")]]);
				Q(m, {
					get value() {
						return V(Dt);
					},
					get options() {
						return V(e);
					},
					onchange: Ot
				});
			}
			D(f);
			var h = z(f, 2), g = R(h, !0), _ = z(h, 2), y = I(_);
			let x;
			var S = R(y, !0), C = z(y, 2);
			let w;
			var T = R(C, !0);
			D(_);
			var ee = z(_, 2), te = (e) => {
				var t = Kd(), n = I(t), r = R(n, !0), i = z(n, 2);
				J(i);
				var a = z(i, 2), o = R(a, !0), s = z(a, 2);
				J(s), D(t), B((e, t, n, a) => {
					G(r, e), X(i, "min", 640), X(i, "max", co), X(i, "title", t), Y(i, V(fe).width), G(o, n), X(s, "max", lo), X(s, "title", a), Y(s, V(fe).height || "");
				}, [
					() => Z("lbl.screen.w"),
					() => Z("tip.screen.width", {
						min: 640,
						max: co
					}),
					() => Z("lbl.screen.h"),
					() => Z("tip.screen.height", {
						min: 480,
						max: lo
					})
				]), H("change", i, (e) => {
					pe({ width: Number(e.target.value) }), e.target.value = V(fe).width;
				}), H("change", s, (e) => {
					pe({ height: Number(e.target.value) }), e.target.value = V(fe).height || "";
				}), W(e, t);
			};
			K(ee, (e) => {
				V(fe).mode === "custom" && e(te);
			});
			var ne = z(ee, 2), E = (e) => {
				var t = qd(), n = L(t), r = R(n, !0), i = z(n, 2), a = I(i), o = z(a);
				J(o), D(i), B((e, t, s, c, l) => {
					X(n, "title", e), G(r, t), X(i, "title", s), G(a, `${c ?? ""} `), X(o, "placeholder", l), Y(o, V(k).analytics?.token ?? "");
				}, [
					() => Z("tip.analytics"),
					() => Z("settings.analytics"),
					() => Z("tip.analytics"),
					() => Z("lbl.analyticsToken"),
					() => Z("ph.analyticsToken")
				]), H("change", o, (e) => eo(e.target.value)), W(e, t);
			};
			K(ne, (e) => {
				V(k) && e(E);
			}), D(t), B((e, t, n, c, d, m, v, b, ee, te, ne, E, re, ie) => {
				G(r, e), X(i, "title", t), G(a, `${n ?? ""} `), X(o, "title", c), G(s, `${d ?? ""} `), X(l, "title", m), G(u, `${v ?? ""} `), X(f, "title", b), G(p, `${ee ?? ""} `), X(h, "title", te), G(g, ne), X(_, "title", E), x = hi(y, 1, "svelte-1n46o8q", null, x, { on: V(fe).mode === "own" }), G(S, re), w = hi(C, 1, "svelte-1n46o8q", null, w, { on: V(fe).mode === "custom" }), G(T, ie);
			}, [
				() => Z("settings.title"),
				() => Z("topbar.adminTheme.title"),
				() => Z("settings.theme"),
				() => Z("topbar.language.title"),
				() => Z("settings.language"),
				() => Z("tip.settings.layoutPicker"),
				() => Z("settings.layoutPicker"),
				() => Z("tip.settings.panels"),
				() => Z("settings.panels"),
				() => Z("tip.screen.mode"),
				() => Z("settings.screen"),
				() => Z("tip.screen.mode"),
				() => Z("lbl.screen.own"),
				() => Z("lbl.screen.size")
			]), H("click", y, () => pe({ mode: "own" })), H("click", C, () => pe({ mode: "custom" })), W(e, t);
		};
		K(x, (e) => {
			V($i) && e(C);
		}), D(m), Ai(m, (e) => P(na, e), () => V(na)), D(i);
		var T = z(i, 2), ee = (e) => {
			var t = qp();
			let i;
			var o = I(t), l = I(o), m = R(l, !0), g = z(l, 2), v = (e) => {
				var t = Yd();
				let n;
				q(t, () => _.foldToggle, !0), D(t), B((e, r) => {
					n = hi(t, 1, "fold-all fold-toggle svelte-1n46o8q", null, n, { collapse: V(Vm) }), X(t, "title", e), X(t, "aria-label", r);
				}, [() => Z(V(Vm) ? "ui.collapseAll" : "ui.expandAll"), () => Z(V(Vm) ? "ui.collapseAll" : "ui.expandAll")]), H("click", t, Wm), W(e, t);
			};
			K(g, (e) => {
				V(Bm) && e(v);
			}), D(o);
			var y = z(o, 2), b = (e) => {
				var t = sf(), n = I(t);
				Jr(n, 17, () => V(k).pages, (e) => e.id, (e, t) => {
					var n = tf();
					let r;
					var i = I(n);
					J(i);
					var a = z(i, 2), o = (e) => {
						var t = Xd();
						B((e) => X(t, "title", e), [() => Z("tip.pages.homeLocked")]), W(e, t);
					}, s = (e) => {
						var n = Zd();
						J(n), B((e, t) => {
							Y(n, e), X(n, "title", t);
						}, [() => V(t).path.slice(1), () => Z("tip.pages.slug")]), H("change", n, (e) => Ba(V(t), e.target.value)), W(e, n);
					};
					K(a, (e) => {
						V(t).path === "/" ? e(o) : e(s, -1);
					});
					var c = z(a, 2), l = (e) => {
						var t = Qd();
						q(t, () => _.warn, !0), D(t), B((e) => X(t, "title", e), [() => Z("tip.pages.missingDescription")]), W(e, t);
					};
					K(c, (e) => {
						V(Fa)[V(t).id] && e(l);
					});
					var u = z(c, 2), d = I(u);
					q(d, () => _.right, !0), D(d);
					var f = z(d, 2), p = I(f);
					q(p, () => _.kebab, !0), D(p);
					var m = z(p, 2), h = (e) => {
						var n = ef(), r = I(n), i = I(r);
						q(i, () => _.bookmark);
						var a = z(i);
						D(r);
						var o = z(r, 2), s = (e) => {
							var n = $d(), r = I(n);
							q(r, () => _.cross);
							var i = z(r);
							D(n), B((e, t) => {
								X(n, "title", e), G(i, ` ${t ?? ""}`);
							}, [() => Z("tip.pages.delete"), () => Z("ui.deletePage")]), H("click", n, () => {
								P(_a, null), Wa(V(t));
							}), W(e, n);
						};
						K(o, (e) => {
							V(t).path !== "/" && e(s);
						}), D(n), B((e) => G(a, ` ${e ?? ""}`), [() => Z("ui.savePageTemplate")]), H("click", r, () => ka(V(t))), W(e, n);
					};
					K(m, (e) => {
						V(_a) === V(t).id && e(h);
					}), D(f), D(u), D(n), B((e, a, o) => {
						r = hi(n, 1, "page-row svelte-1n46o8q", null, r, { current: V(t).id === V(w) }), Y(i, V(t).title), X(i, "title", e), X(d, "title", a), d.disabled = V(t).id === V(w), X(p, "title", o);
					}, [
						() => Z("tip.pages.title"),
						() => Z("tip.pages.open"),
						() => Z("tip.pages.menu")
					]), H("change", i, (e) => Aa(V(t), e.target.value)), H("click", d, () => qi(V(t).id)), H("click", p, () => P(_a, V(_a) === V(t).id ? null : V(t).id, !0)), W(e, n);
				});
				var r = z(n, 2), i = I(r), a = R(i, !0), o = z(i, 2), s = I(o), c = I(s), l = z(c);
				ut(l), D(s);
				var u = z(s, 2), d = I(u), f = z(d);
				J(f), D(u);
				var p = z(u, 2), m = I(p), h = z(m);
				ut(h), D(p);
				var g = z(p, 2), v = I(g), y = z(v), b = (e) => {
					var t = nf();
					B((e) => {
						X(t, "src", V(ja).ogImage), X(t, "alt", e);
					}, [() => Z("lbl.ogImage")]), W(e, t);
				};
				K(y, (e) => {
					V(ja).ogImage && e(b);
				}), D(g);
				var x = z(g, 2), S = I(x), C = I(S), T = z(C);
				D(S);
				var ee = z(S, 2), te = (e) => {
					var t = Xl();
					q(t, () => _.cross, !0), D(t), B((e) => X(t, "title", e), [() => Z("tip.seo.removeOgImage")]), H("click", t, () => Na("ogImage", "")), W(e, t);
				};
				K(ee, (e) => {
					V(ja).ogImage && e(te);
				}), D(x);
				var ne = z(x, 2), E = I(ne);
				J(E);
				var re = z(E);
				D(ne), D(o), D(r);
				var ie = z(r, 4);
				J(ie);
				var ae = z(ie, 2), oe = R(ae, !0), se = z(ae, 2), ce = R(se, !0), le = z(se, 2), ue = I(le);
				let de;
				var fe = I(ue), pe = I(fe);
				q(pe, () => Dc({ sections: [] }), !0), D(pe);
				var me = R(z(pe, 2), !0);
				D(fe), D(ue), Jr(z(ue, 2), 17, () => kc, (e) => e.id, (e, t) => {
					var n = rf();
					let r;
					var i = I(n), a = I(i);
					q(a, () => ma[V(t).id], !0), D(a);
					var o = R(z(a, 2), !0);
					D(i), D(n), B((e, a) => {
						r = hi(n, 1, "page-template-card svelte-1n46o8q", null, r, { picked: V(pa) === `preset:${V(t).id}` }), X(i, "title", e), G(o, a);
					}, [() => Z("tip.pages.templatePick", { name: Z(V(t).labelKey) }), () => Z(V(t).labelKey)]), H("click", i, () => P(pa, V(pa) === `preset:${V(t).id}` ? null : `preset:${V(t).id}`, !0)), W(e, n);
				}), D(le);
				var he = z(le, 2), ge = (e) => {
					var t = of(), n = L(t), r = R(n, !0), i = z(n, 2);
					Jr(i, 20, () => V(Us).filter((e) => Bs[e]?.data?.mal?.kind === "page"), (e) => e, (e, t) => {
						var n = af();
						let r;
						var i = I(n), a = I(i);
						q(a, () => Dc(Bs[t].data.page), !0), D(a);
						var o = R(z(a, 2), !0);
						D(i);
						var s = z(i, 2);
						q(s, () => _.cross, !0), D(s), D(n), B((e, a) => {
							r = hi(n, 1, "page-template-card svelte-1n46o8q", null, r, { picked: V(pa) === t }), X(i, "title", e), G(o, Bs[t].data.mal.name), X(s, "title", a);
						}, [() => Z("tip.pages.templatePick", { name: Bs[t].data.mal.name }), () => Z("canvas.deleteTemplate")]), H("click", i, () => P(pa, V(pa) === t ? null : t, !0)), H("click", s, () => ec({ id: t })), W(e, n);
					}), D(i), B((e) => {
						G(r, e), _i(i, V(ga));
					}, [() => Z("canvas.tabMyTemplates")]), W(e, t);
				}, _e = /* @__PURE__ */ A(() => V(Us).some((e) => Bs[e]?.data?.mal?.kind === "page"));
				K(he, (e) => {
					V(_e) && e(ge);
				}), D(t), B((e, t, n, r, i, o, _, y, b, x, w, T, ee, te, se, pe, he, ge, _e, ve, ye, be) => {
					G(a, e), X(s, "title", t), G(c, `${n ?? ""} `), Y(l, V(ja).description), X(u, "title", r), G(d, `${i ?? ""} `), Y(f, V(ja).ogTitle), X(f, "placeholder", o), X(p, "title", _), G(m, `${y ?? ""} `), Y(h, V(ja).ogDescription), X(h, "placeholder", V(ja).description), X(g, "title", b), G(v, `${x ?? ""} `), X(S, "title", w), G(C, `${T ?? ""} `), X(ne, "title", ee), Si(E, te), G(re, ` ${se ?? ""}`), X(ie, "placeholder", pe), X(ae, "title", he), ae.disabled = ge, G(oe, _e), G(ce, ve), _i(le, V(ga)), de = hi(ue, 1, "page-template-card svelte-1n46o8q", null, de, { picked: V(pa) === null }), X(fe, "title", ye), G(me, be);
				}, [
					() => Z("ui.seoGroup", { page: V(k).pages.find((e) => e.id === V(w))?.title ?? "" }),
					() => Z("tip.seo.description"),
					() => Z("lbl.seoDescription"),
					() => Z("tip.seo.ogTitle"),
					() => Z("lbl.ogTitle"),
					() => V(k).pages.find((e) => e.id === V(w))?.title ?? "",
					() => Z("tip.seo.ogDescription"),
					() => Z("lbl.ogDescription"),
					() => Z("tip.seo.ogImage"),
					() => Z("lbl.ogImage"),
					() => Z("tip.seo.ogImage"),
					() => V(ja).ogImage ? Z("ui.changeImage") : Z("ui.chooseImage"),
					() => Z("tip.seo.hideFromSearch"),
					() => V(k).pages.find((e) => e.id === V(w))?.noindex === !0,
					() => Z("lbl.hideFromSearch"),
					() => Z("ph.newPageName"),
					() => Z("hint.pages.autoMenu"),
					() => !V(fa).trim(),
					() => Z("ui.createPage"),
					() => Z("canvas.tabPresets"),
					() => Z("tip.pages.blankPick"),
					() => Z("ui.blankPage")
				]), H("change", l, (e) => Na("description", e.target.value)), H("change", f, (e) => Na("ogTitle", e.target.value)), H("change", h, (e) => Na("ogDescription", e.target.value)), H("change", T, La), H("change", E, (e) => Pa(e.target.checked)), H("keydown", ie, (e) => e.key === "Enter" && Sa()), Ei(ie, () => V(fa), (e) => P(fa, e)), H("click", ae, Sa), H("click", fe, () => P(pa, null)), W(e, t);
			}, x = (e) => {
				var t = Lf(), r = I(t), i = I(r), a = R(i, !0), o = z(i, 2), l = I(o);
				{
					let e = /* @__PURE__ */ A(() => Z("common.type")), t = /* @__PURE__ */ A(() => V(k).nav.logo?.type ?? "text"), n = /* @__PURE__ */ A(() => [
						["text", Z("blocks.text")],
						["image", Z("blocks.image")],
						["both", Z("opt.logo.both")]
					]);
					Zo(l, {
						get label() {
							return V(e);
						},
						get value() {
							return V(t);
						},
						get options() {
							return V(n);
						},
						onchange: (e) => Ka(e)
					});
				}
				var m = z(l, 2), g = (e) => {
					var t = cf(), n = L(t);
					J(n);
					var r = z(n, 2), i = I(r);
					{
						let e = /* @__PURE__ */ A(() => Z("tip.nav.logoFont")), t = /* @__PURE__ */ A(() => V(k).nav.logo?.font ?? ""), n = /* @__PURE__ */ A(() => [["", Z("common.inherit")], ...ql.map(([e, t]) => [t, Z(e)])]);
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
							onchange: (e) => Ga({ font: e || void 0 })
						});
					}
					var a = z(i, 2);
					J(a);
					var o = z(a, 2);
					let s;
					var c = R(I(o), !0);
					D(o);
					var l = z(o, 2);
					let u;
					var d = R(I(l), !0);
					D(l), D(r), B((e, t, r, i, f, p, m) => {
						Y(n, V(k).nav.logo?.value ?? ""), X(n, "placeholder", e), X(a, "title", t), Y(a, V(k).nav.logo?.textSize ?? ""), s = hi(o, 1, "tbtn svelte-1n46o8q", null, s, { active: V(k).nav.logo?.bold !== !1 }), X(o, "title", r), G(c, i), u = hi(l, 1, "tbtn svelte-1n46o8q", null, u, { active: f }), X(l, "title", p), G(d, m);
					}, [
						() => Z("ph.nav.logoName"),
						() => Z("tip.nav.textSize"),
						() => Z("format.bold"),
						() => Z("format.boldLetter"),
						() => !!V(k).nav.logo?.italic,
						() => Z("format.italic"),
						() => Z("format.italicLetter")
					]), H("input", n, (e) => Ga({ value: e.target.value })), H("change", a, (e) => Ga({ textSize: e.target.value ? Number(e.target.value) : void 0 })), H("click", o, () => Ga({ bold: V(k).nav.logo?.bold === !1 })), H("click", l, () => Ga({ italic: !V(k).nav.logo?.italic })), W(e, t);
				};
				K(m, (e) => {
					(V(k).nav.logo?.type ?? "text") !== "image" && e(g);
				});
				var v = z(m, 2), y = (e) => {
					let t = /* @__PURE__ */ A(() => V(k).nav.logo?.type === "image" ? V(k).nav.logo?.value : V(k).nav.logo?.image);
					var n = df(), r = L(n), i = I(r), a = I(i), o = (e) => {
						var n = lf();
						B(() => X(n, "src", V(t))), W(e, n);
					};
					K(a, (e) => {
						V(t) && e(o);
					}), D(i);
					var s = z(i, 2), c = I(s), l = I(c), u = z(l);
					D(c);
					var d = z(c, 2), f = (e) => {
						var n = uf(), r = R(n, !0);
						B((e) => G(r, e), [() => V(t).split("/").pop()]), W(e, n);
					};
					K(d, (e) => {
						V(t) && e(f);
					}), D(s), D(r);
					var p = z(r, 2), m = I(p), h = I(m), g = R(h, !0), _ = z(h, 2);
					J(_), D(m);
					var v = z(m, 2), y = I(v), b = R(y, !0), x = z(y, 2);
					J(x), D(v);
					var S = z(v, 2), C = I(S), w = R(C, !0), T = z(C, 2);
					J(T), D(S), D(p), B((e, t, n, r, i, a, o, s, u) => {
						X(c, "title", e), G(l, `${t ?? ""} `), X(m, "title", n), G(g, r), Y(_, V(k).nav.logo?.size ?? 32), X(v, "title", i), G(b, a), X(x, "min", Fo.min), X(x, "max", Fo.max), X(x, "placeholder", o), Y(x, V(k).nav.logo?.mobileSize ?? ""), X(S, "title", s), G(w, u), Y(T, V(k).nav.logo?.radius ?? 0);
					}, [
						() => Z("tip.webpAuto"),
						() => V(t) ? Z("ui.changeImage") : Z("ui.chooseImage"),
						() => Z("tip.nav.logoHeight"),
						() => Z("lbl.height"),
						() => Z("tip.nav.logoHeightMobile"),
						() => Z("lbl.onMobile"),
						() => Z("lbl.navSameAsDesktop"),
						() => Z("tip.nav.logoRadius"),
						() => Z("lbl.rounding")
					]), H("change", u, qa), H("change", _, (e) => Ga({ size: Number(e.target.value) })), H("change", x, (e) => {
						let t = e.target.value;
						Ga({ mobileSize: t === "" ? void 0 : Bo(t, Fo, void 0) }), e.target.value = V(k).nav.logo?.mobileSize ?? "";
					}), H("change", T, (e) => Ga({ radius: Number(e.target.value) })), W(e, n);
				};
				K(v, (e) => {
					(V(k).nav.logo?.type ?? "text") !== "text" && e(y);
				});
				var b = z(v, 2), x = (e) => {
					{
						let t = /* @__PURE__ */ A(() => Z("lbl.order")), n = /* @__PURE__ */ A(() => V(k).nav.logo?.order ?? "image-first"), r = /* @__PURE__ */ A(() => [["image-first", Z("opt.logo.imageFirst")], ["text-first", Z("opt.logo.textFirst")]]);
						Zo(e, {
							get label() {
								return V(t);
							},
							get value() {
								return V(n);
							},
							get options() {
								return V(r);
							},
							onchange: (e) => Ga({ order: e })
						});
					}
				};
				K(b, (e) => {
					V(k).nav.logo?.type === "both" && e(x);
				}), D(o), D(r);
				var S = z(r, 2), C = I(S), w = R(C, !0), T = z(C, 2), ee = I(T), te = I(ee), ne = R(te, !0), E = z(te, 2), re = I(E), ie = I(re), ae = R(ie, !0), oe = z(ie, 2);
				Jr(oe, 21, () => [
					["bar", Z("opt.navVariant.bar")],
					["floating", Z("opt.navVariant.floating")],
					["floating-square", Z("opt.navVariant.floatingSquare")],
					["floating-tab", Z("opt.navVariant.floatingTab")],
					["side-left", Z("opt.navVariant.sideLeft")],
					["side-right", Z("opt.navVariant.sideRight")]
				], ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ A(() => h(V(t), 2));
					let r = () => V(n)[0], i = () => V(n)[1];
					var a = ff();
					let o;
					var c = I(a);
					q(c, () => s[r()]);
					var l = R(z(c), !0);
					D(a), B(() => {
						o = hi(a, 1, "tile svelte-1n46o8q", null, o, { on: (V(k).nav.variant ?? "bar") === r() }), X(a, "aria-pressed", (V(k).nav.variant ?? "bar") === r()), G(l, i());
					}), H("click", a, () => Ts(r())), W(e, a);
				}), D(oe), D(re);
				var se = z(re, 2), ce = (e) => {
					var t = pf(), n = L(t);
					{
						let e = /* @__PURE__ */ A(() => Z("lbl.toolsSide")), t = /* @__PURE__ */ A(() => Z("tip.nav.toolsSideColumn")), r = /* @__PURE__ */ A(() => V(k).nav.style?.tools?.side ?? "end"), i = /* @__PURE__ */ A(() => [["start", Z("opt.toolsSide.top")], ["end", Z("opt.toolsSide.bottom")]]);
						Zo(n, {
							get label() {
								return V(e);
							},
							get title() {
								return V(t);
							},
							get value() {
								return V(r);
							},
							get options() {
								return V(i);
							},
							onchange: (e) => ts("side", e === "start" ? "start" : void 0)
						});
					}
					var r = z(n, 2);
					{
						let e = /* @__PURE__ */ A(() => Z("lbl.toolsAlign")), t = /* @__PURE__ */ A(() => Z("tip.nav.toolsAlign")), n = /* @__PURE__ */ A(() => V(k).nav.style?.tools?.align ?? "center"), i = /* @__PURE__ */ A(() => [
							["start", Z("opt.toolsAlign.start")],
							["center", Z("opt.toolsAlign.center")],
							["end", Z("opt.toolsAlign.end")],
							["spread", Z("opt.toolsAlign.spread")]
						]);
						Zo(r, {
							get label() {
								return V(e);
							},
							get title() {
								return V(t);
							},
							get value() {
								return V(n);
							},
							get options() {
								return V(i);
							},
							onchange: (e) => ts("align", e === "center" ? void 0 : e)
						});
					}
					W(e, t);
				}, le = (e) => {
					{
						let t = /* @__PURE__ */ A(() => Z("lbl.toolsSide")), n = /* @__PURE__ */ A(() => Z("tip.nav.toolsSide")), r = /* @__PURE__ */ A(() => V(k).nav.style?.tools?.side ?? "end"), i = /* @__PURE__ */ A(() => [["start", Z("opt.toolsSide.start")], ["end", Z("opt.toolsSide.end")]]);
						Zo(e, {
							get label() {
								return V(t);
							},
							get title() {
								return V(n);
							},
							get value() {
								return V(r);
							},
							get options() {
								return V(i);
							},
							onchange: (e) => ts("side", e === "start" ? "start" : void 0)
						});
					}
				};
				K(se, (e) => {
					V(rs) ? e(ce) : e(le, -1);
				});
				var ue = z(se, 2), de = (e) => {
					var t = hf(), n = L(t);
					{
						let e = /* @__PURE__ */ A(() => Z("lbl.navPillWidth")), t = /* @__PURE__ */ A(() => Z("tip.nav.pillWidth")), r = /* @__PURE__ */ A(() => V(k).nav.style?.pillWidth === "content" ? "content" : "custom"), i = /* @__PURE__ */ A(() => [["content", Z("opt.pillWidth.content")], ["custom", Z("opt.pillWidth.custom")]]);
						Zo(n, {
							get label() {
								return V(e);
							},
							get title() {
								return V(t);
							},
							get value() {
								return V(r);
							},
							get options() {
								return V(i);
							},
							onchange: (e) => ns("pillWidth", e === "content" ? "content" : void 0)
						});
					}
					var r = z(n, 2), i = (e) => {
						var t = mf(), n = I(t), r = R(n, !0), i = z(n, 2);
						J(i), D(t), B((e, n) => {
							X(t, "title", e), G(r, n), X(i, "min", ko.min), X(i, "max", ko.max), X(i, "step", ko.step), Y(i, typeof V(k).nav.style?.pillWidth == "number" ? V(k).nav.style.pillWidth : "");
						}, [() => Z("tip.nav.pillWidthPx"), () => Z("lbl.navPillWidthPx")]), H("change", i, (e) => ls(e, "pillWidth", ko)), W(e, t);
					};
					K(r, (e) => {
						V(k).nav.style?.pillWidth !== "content" && e(i);
					});
					var a = z(r, 2), o = I(a), s = R(o, !0), c = z(o, 2);
					J(c), D(a), B((e, t) => {
						X(a, "title", e), G(s, t), X(c, "min", No.min), X(c, "max", No.max), X(c, "step", No.step), X(c, "placeholder", V(k).nav.variant === "floating-square" ? "0" : V(k).nav.variant === "floating-tab" ? "12" : "999"), Y(c, typeof V(k).nav.style?.radius == "number" ? V(k).nav.style.radius : "");
					}, [() => Z("tip.nav.radius"), () => Z("lbl.navRadius")]), H("change", c, (e) => ls(e, "radius", No)), W(e, t);
				};
				K(ue, (e) => {
					V(is) && e(de);
				});
				var fe = z(ue, 2), pe = (e) => {
					{
						let t = /* @__PURE__ */ A(() => Z("lbl.navPlacement")), n = /* @__PURE__ */ A(() => V(k).nav.style?.sidePlacement ?? "top"), r = /* @__PURE__ */ A(() => [
							["top", Z("opt.place.top")],
							["middle", Z("opt.place.middle")],
							["bottom", Z("opt.place.bottom")]
						]);
						Zo(e, {
							get label() {
								return V(t);
							},
							get value() {
								return V(n);
							},
							get options() {
								return V(r);
							},
							onchange: (e) => ns("sidePlacement", e === "top" ? void 0 : e)
						});
					}
				}, me = (e) => {
					{
						let t = /* @__PURE__ */ A(() => Z("lbl.navPlacement")), n = /* @__PURE__ */ A(() => Z("opt.layout.leftAfterLogo")), r = /* @__PURE__ */ A(() => V(k).nav.layout ?? "right"), i = /* @__PURE__ */ A(() => [
							["left", Z("common.left")],
							["center", Z("common.center")],
							["right", Z("common.right")]
						]);
						Zo(e, {
							get label() {
								return V(t);
							},
							get title() {
								return V(n);
							},
							get value() {
								return V(r);
							},
							get options() {
								return V(i);
							},
							onchange: (e) => Qo(e)
						});
					}
				};
				K(fe, (e) => {
					V(rs) ? e(pe) : e(me, -1);
				});
				var he = z(fe, 2), ge = (e) => {
					var t = gf(), n = L(t), r = I(n);
					J(r);
					var i = z(r);
					D(n);
					var a = z(n, 2), o = I(a);
					J(o);
					var s = z(o);
					D(a), B((e, t, c, l) => {
						X(n, "title", e), Si(r, V(k).nav.style?.glow === !0), G(i, ` ${t ?? ""}`), X(a, "title", c), Si(o, V(k).nav.style?.topGap !== !1), G(s, ` ${l ?? ""}`);
					}, [
						() => Z("tip.nav.glow"),
						() => Z("lbl.navGlow"),
						() => Z("tip.nav.topGap"),
						() => Z("lbl.navTopGap")
					]), H("change", r, (e) => Es(e.target.checked)), H("change", o, (e) => Ds(e.target.checked)), W(e, t);
				};
				K(he, (e) => {
					V(is) && e(ge);
				});
				var _e = z(he, 2), ve = (e) => {
					var t = gf(), n = L(t), r = I(n);
					J(r);
					var i = z(r);
					D(n);
					var a = z(n, 2), o = I(a);
					J(o);
					var s = z(o);
					D(a), B((e, t, c, l) => {
						X(n, "title", e), Si(r, V(k).nav.overlay === !0), G(i, ` ${t ?? ""}`), X(a, "title", c), Si(o, V(k).nav.style?.inset !== !1), G(s, ` ${l ?? ""}`);
					}, [
						() => Z("tip.nav.overlay"),
						() => Z("lbl.navOverlay"),
						() => Z("tip.nav.inset"),
						() => Z("lbl.navInset")
					]), H("change", r, (e) => da("nav", () => {
						e.target.checked ? V(k).nav.overlay = !0 : delete V(k).nav.overlay;
					})), H("change", o, (e) => ns("inset", e.target.checked ? void 0 : !1)), W(e, t);
				};
				K(_e, (e) => {
					!V(is) && !V(rs) && e(ve);
				});
				var ye = z(_e, 2), be = (e) => {
					var t = _f(), n = L(t);
					{
						let e = /* @__PURE__ */ A(() => Z("lbl.textAlign")), t = /* @__PURE__ */ A(() => Z("tip.nav.sideAlign")), r = /* @__PURE__ */ A(() => V(k).nav.style?.sideAlign ?? "left"), i = /* @__PURE__ */ A(() => [
							["left", Z("common.left")],
							["center", Z("common.center")],
							["right", Z("common.right")]
						]);
						Zo(n, {
							get label() {
								return V(e);
							},
							get title() {
								return V(t);
							},
							get value() {
								return V(r);
							},
							get options() {
								return V(i);
							},
							onchange: (e) => ns("sideAlign", e === "left" ? void 0 : e)
						});
					}
					var r = z(n, 2), i = I(r), a = R(i, !0), o = z(i, 2);
					J(o), D(r), B((e, t) => {
						X(r, "title", e), G(a, t), X(o, "min", Po.min), X(o, "max", Po.max), Y(o, V(k).nav.style?.width ?? 250);
					}, [() => Z("tip.nav.colWidth"), () => Z("lbl.navColWidth")]), H("change", o, (e) => {
						let t = Bo(e.target.value, Po, 250);
						ns("width", t === 250 ? void 0 : t), e.target.value = V(k).nav.style?.width ?? 250;
					}), W(e, t);
				};
				K(ye, (e) => {
					V(rs) && e(be);
				}), D(E), D(ee);
				var xe = z(ee, 4), Se = I(xe), Ce = R(Se, !0), we = z(Se, 2), Te = I(we);
				Jr(Te, 20, () => Lo, (e) => e, (e, t) => {
					var n = Wd();
					let r;
					var i = R(n, !0);
					B((e) => {
						r = hi(n, 1, "svelte-1n46o8q", null, r, { on: V(as) === t }), G(i, e);
					}, [() => Z(`opt.size.${t}`)]), H("click", n, () => cs(t)), W(e, n);
				}), D(Te);
				var Ee = z(Te, 2), De = I(Ee), Oe = R(De, !0), ke = z(De, 2), Ae = I(ke), je = (e) => {
					var t = vf(), n = I(t), r = R(n, !0), i = z(n, 2);
					J(i);
					var a = z(i, 2);
					J(a), D(t), B((e, n) => {
						X(t, "title", e), G(r, n), X(i, "min", To.min), X(i, "max", To.max), X(i, "step", To.step), Y(i, V(os)), X(a, "min", To.min), X(a, "max", To.max), Y(a, V(os));
					}, [() => Z("tip.nav.thickness"), () => Z("lbl.navThickness")]), H("input", i, (e) => ns("padY", e.target.valueAsNumber)), H("change", a, (e) => gs(e, "padY", To)), W(e, t);
				};
				K(Ae, (e) => {
					V(rs) || e(je);
				});
				var Me = z(Ae, 2), Ne = I(Me), Pe = R(Ne, !0), Fe = z(Ne, 2);
				J(Fe);
				var Ie = z(Fe, 2);
				J(Ie), D(Me);
				var Le = z(Me, 2), Re = (e) => {
					var t = yf(), n = I(t), r = I(n), i = R(r, !0), a = z(r, 2);
					J(a), D(n);
					var o = z(n, 2), s = I(o), c = R(s, !0), l = z(s, 2);
					J(l), D(o), D(t), B((e, t, r, s, u, d) => {
						X(n, "title", e), G(i, t), X(a, "min", Do.min), X(a, "max", Do.max), X(a, "placeholder", r), Y(a, V(k).nav.style?.padX ?? ""), X(o, "title", s), G(c, u), X(l, "min", Oo.min), X(l, "max", Oo.max), X(l, "placeholder", d), Y(l, V(k).nav.style?.gap ?? "");
					}, [
						() => Z("tip.nav.padX"),
						() => Z("lbl.navPadX"),
						() => Z("common.auto"),
						() => Z("tip.nav.gap"),
						() => Z("lbl.navGap"),
						() => Z("common.auto")
					]), H("change", a, (e) => ls(e, "padX", Do)), H("change", l, (e) => ls(e, "gap", Oo)), W(e, t);
				};
				K(Le, (e) => {
					V(rs) || e(Re);
				}), D(ke), D(Ee), D(we), D(xe);
				var ze = z(xe, 4), Be = I(ze), Ve = R(Be, !0), O = z(Be, 2), He = I(O), We = (e) => {
					var t = xf(), n = L(t), r = I(n), i = R(r, !0), a = z(r, 2);
					Jr(a, 21, () => [
						["", Z("common.none")],
						["bottom", Z("opt.navBorder.bottom")],
						["top", Z("opt.navBorder.top")],
						["both", Z("opt.navBorder.both")],
						["all", Z("opt.navBorder.all")]
					], ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ A(() => h(V(t), 2));
						let r = () => V(n)[0], i = () => V(n)[1];
						var a = ff();
						let o;
						var s = I(a);
						q(s, () => c[r()]);
						var l = R(z(s), !0);
						D(a), B(() => {
							o = hi(a, 1, "tile svelte-1n46o8q", null, o, { on: (V(k).nav.style?.border?.side ?? "") === r() }), X(a, "aria-pressed", (V(k).nav.style?.border?.side ?? "") === r()), G(l, i());
						}), H("click", a, () => ns("border", r() ? {
							...V(k).nav.style?.border ?? {},
							side: r()
						} : void 0)), W(e, a);
					}), D(a), D(n);
					var o = z(n, 2), s = (e) => {
						var t = bf(), n = I(t), r = R(n, !0), i = z(n, 2);
						J(i);
						var a = z(i, 2), o = R(a, !0), s = z(a, 2);
						{
							let e = /* @__PURE__ */ A(() => V(k).nav.style.border.color ?? "text"), t = /* @__PURE__ */ A(Hr), n = /* @__PURE__ */ A(() => Z("tip.nav.borderColorPick"));
							ha(s, {
								get value() {
									return V(e);
								},
								get tokens() {
									return V(t);
								},
								get label() {
									return V(n);
								},
								onchange: (e) => ns("border", {
									...V(k).nav.style.border,
									color: e
								})
							});
						}
						D(t), B((e, t, s, c, l) => {
							X(n, "title", e), G(r, t), X(i, "title", s), Y(i, V(k).nav.style.border.width ?? 1), X(a, "title", c), G(o, l);
						}, [
							() => Z("tip.nav.borderWidth"),
							() => Z("lbl.navBorderWidth"),
							() => Z("tip.nav.borderWidth"),
							() => Z("tip.nav.borderColorPick"),
							() => Z("lbl.navBorderColor")
						]), H("change", i, (e) => {
							let t = Bo(e.target.value, {
								min: 1,
								max: 8
							}, 1), n = { ...V(k).nav.style.border };
							t === 1 ? delete n.width : n.width = t, ns("border", n), e.target.value = V(k).nav.style.border.width ?? 1;
						}), W(e, t);
					};
					K(o, (e) => {
						V(k).nav.style?.border?.side && e(s);
					}), B((e, t, r) => {
						X(n, "title", e), G(i, t), X(a, "aria-label", r);
					}, [
						() => Z("tip.nav.border"),
						() => Z("lbl.navBorder"),
						() => Z("lbl.navBorder")
					]), W(e, t);
				};
				K(He, (e) => {
					V(rs) || e(We);
				});
				var Ge = z(He, 2), Ke = (e) => {
					{
						let t = /* @__PURE__ */ A(() => Z("lbl.navShadow")), n = /* @__PURE__ */ A(() => Z("tip.nav.shadow")), r = /* @__PURE__ */ A(() => V(k).nav.style?.shadow ?? ""), i = /* @__PURE__ */ A(() => [
							["", Z("common.none")],
							["soft", Z("opt.navShadow.soft")],
							["strong", Z("opt.navShadow.strong")]
						]);
						Zo(e, {
							get label() {
								return V(t);
							},
							get title() {
								return V(n);
							},
							get value() {
								return V(r);
							},
							get options() {
								return V(i);
							},
							onchange: (e) => ns("shadow", e || void 0)
						});
					}
				};
				K(Ge, (e) => {
					!V(is) && !V(rs) && e(Ke);
				}), D(O), D(ze);
				var qe = z(ze, 4), Je = I(qe), Ye = R(Je, !0), Xe = z(Je, 2), Ze = I(Xe), Qe = (e) => {
					var t = Cf(), n = I(t), r = R(n, !0), i = z(n, 2), a = I(i);
					J(a);
					var o = z(a);
					D(i);
					var s = z(i, 2), c = (e) => {
						var t = pf(), n = L(t);
						{
							let e = /* @__PURE__ */ A(() => Z("lbl.navScroll")), t = /* @__PURE__ */ A(() => Z("tip.nav.scroll")), r = /* @__PURE__ */ A(() => V(k).nav.scroll ?? "none"), i = /* @__PURE__ */ A(() => [
								["none", Z("opt.scroll.none")],
								["shrink", Z("opt.scroll.shrink")],
								["hide", Z("opt.scroll.hide")]
							]);
							Zo(n, {
								get label() {
									return V(e);
								},
								get title() {
									return V(t);
								},
								get value() {
									return V(r);
								},
								get options() {
									return V(i);
								},
								onchange: (e) => da("nav", () => {
									e === "none" ? delete V(k).nav.scroll : V(k).nav.scroll = e;
								})
							});
						}
						var r = z(n, 2), i = (e) => {
							var t = Sf(), n = L(t), r = I(n), i = R(r, !0), a = z(r, 2);
							J(a);
							var o = R(z(a, 2));
							D(n);
							var s = z(n, 2), c = I(s), l = R(c, !0), u = z(c, 2);
							J(u);
							var d = R(z(u, 2));
							D(s);
							var f = z(s, 2), p = I(f), m = R(p, !0), h = z(p, 2);
							J(h);
							var g = R(z(h, 2));
							D(f);
							var _ = z(f, 2), v = (e) => {
								var t = Mu(), n = I(t);
								J(n);
								var r = z(n);
								D(t), B((e, i) => {
									X(t, "title", e), Si(n, V(k).nav.style?.shrinkLogo === !0), G(r, ` ${i ?? ""}`);
								}, [() => Z("tip.nav.shrinkLogo"), () => Z("lbl.navShrinkLogo")]), H("change", n, (e) => ns("shrinkLogo", e.target.checked ? !0 : void 0)), W(e, t);
							};
							K(_, (e) => {
								(V(k).nav.logo?.type ?? "text") !== "text" && e(v);
							}), B((e, t, r, c, p, _, v, y) => {
								X(n, "title", e), G(i, t), Y(a, r), G(o, `${c ?? ""}%`), X(s, "title", p), G(l, _), Y(u, V(k).nav.style?.shrinkAt ?? 80), G(d, `${V(k).nav.style?.shrinkAt ?? 80 ?? ""} px`), X(f, "title", v), G(m, y), Y(h, V(k).nav.style?.shrinkMs ?? 220), G(g, `${V(k).nav.style?.shrinkMs ?? 220 ?? ""} ms`);
							}, [
								() => Z("tip.nav.shrinkTo"),
								() => Z("lbl.navShrinkTo"),
								() => Math.round((V(k).nav.style?.shrinkTo ?? .5) * 100),
								() => Math.round((V(k).nav.style?.shrinkTo ?? .5) * 100),
								() => Z("tip.nav.shrinkAt"),
								() => Z("lbl.navShrinkAt"),
								() => Z("tip.nav.shrinkMs"),
								() => Z("lbl.navShrinkMs")
							]), H("input", a, (e) => $(e.target.valueAsNumber)), H("input", u, (e) => bs(e.target.valueAsNumber)), H("input", h, (e) => xs(e.target.valueAsNumber)), W(e, t);
						};
						K(r, (e) => {
							V(k).nav.scroll === "shrink" && e(i);
						}), W(e, t);
					};
					K(s, (e) => {
						V(k).nav.sticky !== !1 && e(c);
					});
					var l = z(s, 2), u = I(l);
					J(u);
					var d = z(u);
					D(l), D(t), B((e, t, n, s, c) => {
						G(r, e), X(i, "title", t), Si(a, V(k).nav.sticky !== !1), G(o, ` ${n ?? ""}`), X(l, "title", s), Si(u, V(k).nav.style?.atTop === "clear"), G(d, ` ${c ?? ""}`);
					}, [
						() => Z("group.navScrolling"),
						() => Z("tip.nav.sticky"),
						() => Z("lbl.navSticky"),
						() => Z("tip.nav.atTop"),
						() => Z("lbl.navAtTop")
					]), H("change", a, (e) => da("nav", () => {
						V(k).nav.sticky = e.target.checked;
					})), H("change", u, (e) => ns("atTop", e.target.checked ? "clear" : void 0)), W(e, t);
				};
				K(Ze, (e) => {
					V(rs) || e(Qe);
				});
				var $e = z(Ze, 2), et = I($e), tt = R(et, !0), nt = z(et, 2), rt = I(nt);
				J(rt);
				var it = z(rt);
				D(nt);
				var at = z(nt, 2), ot = (e) => {
					var t = wf(), n = I(t), r = R(n, !0), i = z(n, 2);
					{
						let e = /* @__PURE__ */ A(() => V(k).nav.cart?.href ?? ""), t = /* @__PURE__ */ A(() => [["", Z("common.none")], ...V(k).pages.map((e) => [e.path, e.title])]);
						Q(i, {
							filled: !0,
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => da("nav", () => {
								e ? V(k).nav.cart.href = e : delete V(k).nav.cart.href;
							})
						});
					}
					D(t), B((e, n) => {
						X(t, "title", e), G(r, n);
					}, [() => Z("tip.cart.checkout"), () => Z("lbl.checkoutPage")]), W(e, t);
				};
				K(at, (e) => {
					V(k).nav.cart?.show && e(ot);
				}), D($e), D(Xe), D(qe);
				var st = z(qe, 4), ct = I(st), lt = R(ct, !0), ut = z(ct, 2), dt = I(ut), ft = I(dt), pt = (e) => {
					var t = Tf(), n = I(t), r = R(n, !0), i = z(n, 2);
					J(i), D(t), B((e, n, a) => {
						X(t, "title", e), G(r, n), X(i, "min", To.min), X(i, "max", To.max), X(i, "placeholder", a), Y(i, V(k).nav.style?.mobile?.padY ?? "");
					}, [
						() => Z("tip.nav.thickness"),
						() => Z("lbl.navThickness"),
						() => Z("lbl.navSameAsDesktop")
					]), H("change", i, (e) => ys(e, "padY", To)), W(e, t);
				};
				K(ft, (e) => {
					V(rs) || e(pt);
				});
				var mt = z(ft, 2), ht = I(mt), gt = R(ht, !0), _t = z(ht, 2);
				J(_t), D(mt), D(dt);
				var vt = z(dt, 2), yt = I(vt), bt = I(yt), xt = R(bt, !0), St = z(bt, 2);
				{
					let e = /* @__PURE__ */ A(() => V(k).nav.style?.mobileMenu ?? "dropdown"), t = /* @__PURE__ */ A(() => [["dropdown", Z("opt.mobileMenu.dropdown")], ["sheet", Z("opt.mobileMenu.sheet")]]);
					Q(St, {
						filled: !0,
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => ns("mobileMenu", e === "dropdown" ? void 0 : e)
					});
				}
				D(yt);
				var Ct = z(yt, 2), wt = (e) => {
					var t = wf(), n = I(t), r = R(n, !0), i = z(n, 2);
					{
						let e = /* @__PURE__ */ A(() => V(k).nav.style?.sheetMotion ?? "top"), t = /* @__PURE__ */ A(() => [
							"top",
							"bottom",
							"left",
							"right",
							"fade",
							"none"
						].map((e) => [e, Z(`opt.sheetMotion.${e}`)]));
						Q(i, {
							filled: !0,
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => ns("sheetMotion", e === "top" ? void 0 : e)
						});
					}
					D(t), B((e, n) => {
						X(t, "title", e), G(r, n);
					}, [() => Z("tip.nav.sheetMotion"), () => Z("lbl.sheetMotion")]), W(e, t);
				};
				K(Ct, (e) => {
					V(k).nav.style?.mobileMenu === "sheet" && e(wt);
				}), D(vt);
				var Tt = z(vt, 2), Et = (e) => {
					var t = Ef(), n = L(t), r = I(n);
					J(r);
					var i = z(r);
					D(n);
					var a = z(n, 2), o = (e) => {
						var t = Mu(), n = I(t);
						J(n);
						var r = z(n);
						D(t), B((e, i) => {
							X(t, "title", e), Si(n, V(k).nav.style?.sheetTheme === !0), G(r, ` ${i ?? ""}`);
						}, [() => Z("tip.nav.sheetTheme"), () => Z("lbl.sheetTheme")]), H("change", n, (e) => ns("sheetTheme", e.target.checked ? !0 : void 0)), W(e, t);
					};
					K(a, (e) => {
						V(k).theme?.alt?.tokens && e(o);
					});
					var s = z(a, 2), c = (e) => {
						var t = Mu(), n = I(t);
						J(n);
						var r = z(n);
						D(t), B((e, i) => {
							X(t, "title", e), Si(n, V(k).nav.style?.sheetCart === !0), G(r, ` ${i ?? ""}`);
						}, [() => Z("tip.nav.sheetCart"), () => Z("lbl.sheetCart")]), H("change", n, (e) => ns("sheetCart", e.target.checked ? !0 : void 0)), W(e, t);
					};
					K(s, (e) => {
						V(k).nav.cart?.show && e(c);
					});
					var l = z(s, 2), u = (e) => {
						var t = Mu(), n = I(t);
						J(n);
						var r = z(n);
						D(t), B((e, i) => {
							X(t, "title", e), Si(n, V(k).nav.style?.sheetAnnounce === !0), G(r, ` ${i ?? ""}`);
						}, [() => Z("tip.nav.sheetAnnounce"), () => Z("lbl.sheetAnnounce")]), H("change", n, (e) => ns("sheetAnnounce", e.target.checked ? !0 : void 0)), W(e, t);
					};
					K(l, (e) => {
						V(k).nav.announcement?.show && e(u);
					});
					var d = z(l, 2), f = (e) => {
						var t = Mu(), n = I(t);
						J(n);
						var r = z(n);
						D(t), B((e, i) => {
							X(t, "title", e), Si(n, V(k).nav.style?.sheetToolLabels === !0), G(r, ` ${i ?? ""}`);
						}, [() => Z("tip.nav.sheetToolLabels"), () => Z("lbl.sheetToolLabels")]), H("change", n, (e) => ns("sheetToolLabels", e.target.checked ? !0 : void 0)), W(e, t);
					};
					K(d, (e) => {
						(V(k).nav.style?.sheetTheme || V(k).nav.style?.sheetCart) && e(f);
					});
					var p = z(d, 2), m = I(p), h = R(m, !0), g = z(m, 2);
					{
						let e = /* @__PURE__ */ A(() => V(k).nav.style?.sheet?.bg ?? "surface"), t = /* @__PURE__ */ A(Hr), n = /* @__PURE__ */ A(() => Z("tip.nav.sheetBg"));
						ha(g, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => ms("bg", e)
						});
					}
					var _ = z(g, 2);
					J(_);
					var v = R(z(_, 2));
					D(p);
					var y = z(p, 2), b = I(y);
					J(b);
					var x = z(b);
					D(y);
					var S = z(y, 2), C = I(S), w = z(C);
					{
						let e = /* @__PURE__ */ A(() => V(k).nav.style?.sheet?.textColor ?? V(k).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ A(Hr), n = /* @__PURE__ */ A(() => Z("tip.nav.sheetTextColorPick"));
						ha(w, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => ms("textColor", e)
						});
					}
					D(S), B((e, t, a, o, s, c, l, u, d, f) => {
						X(n, "title", e), Si(r, V(k).nav.style?.sheetLogo === !0), G(i, ` ${t ?? ""}`), X(p, "title", a), G(h, o), X(_, "title", s), Y(_, c), G(v, `${l ?? ""}%`), X(y, "title", u), Si(b, V(k).nav.style?.sheet?.blur ?? V(k).nav.style?.blur !== !1), G(x, ` ${d ?? ""}`), G(C, `${f ?? ""} `);
					}, [
						() => Z("tip.nav.sheetLogo"),
						() => Z("lbl.sheetLogo"),
						() => Z("tip.nav.sheetBg"),
						() => Z("lbl.background"),
						() => Z("tip.nav.sheetOpacity"),
						() => Math.round((V(k).nav.style?.sheet?.bgOpacity ?? .85) * 100),
						() => Math.round((V(k).nav.style?.sheet?.bgOpacity ?? .85) * 100),
						() => Z("tip.nav.sheetBlur"),
						() => Z("lbl.sheetBlur"),
						() => Z("lbl.textColor")
					]), H("change", r, (e) => ns("sheetLogo", e.target.checked ? !0 : void 0)), H("input", _, (e) => ms("bgOpacity", e.target.valueAsNumber / 100)), H("change", b, (e) => ms("blur", e.target.checked)), W(e, t);
				};
				K(Tt, (e) => {
					V(k).nav.style?.mobileMenu === "sheet" && e(Et);
				});
				var Dt = z(Tt, 2), Ot = (e) => {
					var t = wf(), n = I(t), r = R(n, !0), i = z(n, 2);
					{
						let e = /* @__PURE__ */ A(() => V(k).nav.style?.mobileSubs ?? "collapsed"), t = /* @__PURE__ */ A(() => [["collapsed", Z("opt.mobileSubs.collapsed")], ["expanded", Z("opt.mobileSubs.expanded")]]);
						Q(i, {
							filled: !0,
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => ns("mobileSubs", e === "collapsed" ? void 0 : e)
						});
					}
					D(t), B((e, n) => {
						X(t, "title", e), G(r, n);
					}, [() => Z("tip.nav.mobileSubs"), () => Z("lbl.mobileSubs")]), W(e, t);
				}, j = /* @__PURE__ */ A(() => V(k).nav.items?.some((e) => e.children?.length));
				K(Dt, (e) => {
					V(j) && e(Ot);
				}), D(ut), D(st);
				var kt = z(st, 4), At = I(kt), jt = R(At, !0), Mt = z(At, 2), Nt = I(Mt), Pt = I(Nt), Ft = R(Pt, !0), It = z(Pt, 2);
				Jr(It, 21, () => [
					["standard", Z("opt.hover.standard")],
					["underline", Z("opt.hover.underline")],
					["pill", Z("opt.hover.pill")],
					["lift-plain", Z("opt.hover.liftPlain")],
					["lift", Z("opt.hover.lift")]
				], ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ A(() => h(V(t), 2));
					let r = () => V(n)[0], i = () => V(n)[1];
					var a = Df();
					let o;
					var s = I(a), c = R(s, !0), l = R(z(s), !0);
					D(a), B((e) => {
						o = hi(a, 1, "tile hover-tile svelte-1n46o8q", null, o, { on: (V(k).nav.style?.hover ?? "standard") === r() }), X(a, "aria-pressed", (V(k).nav.style?.hover ?? "standard") === r()), hi(s, 1, `hover-sample hover-${r() ?? ""}`, "svelte-1n46o8q"), G(c, e), G(l, i());
					}, [() => Z("seed.home")]), H("click", a, () => Os(r())), W(e, a);
				}), D(It), D(Nt);
				var Lt = z(Nt, 2), Rt = (e) => {
					var t = Of(), n = I(t), r = R(n, !0), i = z(n, 2);
					J(i);
					var a = R(z(i, 2));
					D(t), B((e, n, o) => {
						X(t, "title", e), G(r, n), Y(i, V(k).nav.style?.hoverGlow ?? .6), G(a, `${o ?? ""}%`);
					}, [
						() => Z("tip.nav.hoverGlow"),
						() => Z("lbl.glowStrength"),
						() => Math.round((V(k).nav.style?.hoverGlow ?? .6) * 100)
					]), H("input", i, (e) => ns("hoverGlow", Number(e.target.value))), W(e, t);
				};
				K(Lt, (e) => {
					V(k).nav.style?.hover === "lift" && e(Rt);
				});
				var zt = z(Lt, 2), Bt = I(zt), M = (e) => {
					var t = kf(), n = I(t);
					{
						let e = /* @__PURE__ */ A(() => V(k).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ A(Hr);
						ha(n, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							get label() {
								return V(Cs)[1];
							},
							onchange: (e) => ns("hoverColor", e)
						});
					}
					var r = R(z(n, 2), !0);
					D(t), B(() => {
						X(t, "title", V(Cs)[1]), G(r, V(Cs)[0]);
					}), W(e, t);
				};
				K(Bt, (e) => {
					V(Cs) && e(M);
				});
				var Vt = z(Bt, 2), Ht = I(Vt);
				{
					let e = /* @__PURE__ */ A(() => V(k).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ A(Hr), n = /* @__PURE__ */ A(() => Z("tip.nav.hoverTextColorPick"));
					ha(Ht, {
						get value() {
							return V(e);
						},
						get tokens() {
							return V(t);
						},
						get label() {
							return V(n);
						},
						onchange: (e) => ns("hoverTextColor", e)
					});
				}
				var Ut = R(z(Ht, 2), !0);
				D(Vt);
				var Wt = z(Vt, 2), Gt = I(Wt);
				{
					let e = /* @__PURE__ */ A(() => V(k).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ A(Hr), n = /* @__PURE__ */ A(() => Z("tip.nav.textColorPick"));
					ha(Gt, {
						get value() {
							return V(e);
						},
						get tokens() {
							return V(t);
						},
						get label() {
							return V(n);
						},
						onchange: (e) => ns("textColor", e)
					});
				}
				var Kt = R(z(Gt, 2), !0);
				D(Wt), D(zt);
				var qt = z(zt, 2), Jt = I(qt);
				J(Jt);
				var N = z(Jt);
				D(qt), D(Mt), D(kt);
				var Yt = z(kt, 4), F = I(Yt), Xt = R(F, !0), Zt = z(F, 2), Qt = I(Zt);
				n(Qt, () => Lr, () => V(k).nav?.style?.background?.layers ?? []), D(Zt), D(Yt), D(T), D(S);
				var $t = z(S, 2), en = I($t), tn = R(en, !0), nn = z(en, 2), rn = I(nn), an = I(rn);
				J(an);
				var on = z(an);
				D(rn);
				var sn = z(rn, 2), cn = (e) => {
					var t = jf(), n = L(t), r = I(n), i = R(r, !0), a = z(r, 2);
					J(a), D(n);
					var o = z(n, 2), s = I(o), c = z(s);
					{
						let e = /* @__PURE__ */ A(() => V(k).nav.announcement?.page ?? (V(k).nav.announcement?.href === void 0 ? "" : "custom")), t = /* @__PURE__ */ A(() => [
							["", Z("common.none")],
							...V(k).pages.map((e) => [e.id, e.title]),
							["custom", Z("opt.announceLink.custom")]
						]);
						Q(c, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => da("edit:nav-announce-link", () => {
								let t = { ...V(k).nav.announcement ?? {} };
								delete t.page, delete t.href, e === "custom" ? t.href = "" : e && (t.page = e), V(k).nav.announcement = t;
							})
						});
					}
					D(o);
					var l = z(o, 2), u = (e) => {
						var t = Af(), n = I(t), r = R(n, !0), i = z(n, 2);
						J(i), D(t), B((e, n) => {
							X(t, "title", e), G(r, n), Y(i, V(k).nav.announcement?.href ?? "");
						}, [() => Z("tip.nav.announceHref"), () => Z("lbl.announceHref")]), H("change", i, (e) => ps("href", e.target.value.trim())), W(e, t);
					};
					K(l, (e) => {
						V(k).nav.announcement?.href !== void 0 && !V(k).nav.announcement?.page && e(u);
					});
					var d = z(l, 2), f = (e) => {
						var t = Mu(), n = I(t);
						J(n);
						var r = z(n);
						D(t), B((e, i) => {
							X(t, "title", e), Si(n, V(k).nav.announcement?.sticky !== !1), G(r, ` ${i ?? ""}`);
						}, [() => Z("tip.nav.announceSticky"), () => Z("lbl.announceSticky")]), H("change", n, (e) => ps("sticky", e.target.checked ? void 0 : !1)), W(e, t);
					};
					K(d, (e) => {
						V(k).nav.sticky !== !1 && !V(is) && !V(rs) && !V(k).nav.overlay && e(f);
					});
					var p = z(d, 2), m = (e) => {
						var t = Mu(), n = I(t);
						J(n);
						var r = z(n);
						D(t), B((e, i) => {
							X(t, "title", e), Si(n, V(k).nav.announcement?.followNav === !0), G(r, ` ${i ?? ""}`);
						}, [() => Z("tip.nav.announceFollowNav"), () => Z("lbl.announceFollowNav")]), H("change", n, (e) => ps("followNav", e.target.checked ? !0 : void 0)), W(e, t);
					};
					K(p, (e) => {
						V(k).nav.scroll === "hide" && V(k).nav.sticky !== !1 && !V(rs) && V(k).nav.announcement?.sticky !== !1 && e(m);
					});
					var h = z(p, 2), g = (e) => {
						{
							let t = /* @__PURE__ */ A(() => Z("lbl.announcePlace")), n = /* @__PURE__ */ A(() => Z("tip.nav.announcePlace")), r = /* @__PURE__ */ A(() => V(k).nav.announcement?.place ?? "nav"), i = /* @__PURE__ */ A(() => [
								["nav", Z("opt.announcePlace.nav")],
								["page", Z("opt.announcePlace.page")],
								["content", Z("opt.announcePlace.content")]
							]);
							Zo(e, {
								get label() {
									return V(t);
								},
								get title() {
									return V(n);
								},
								get value() {
									return V(r);
								},
								get options() {
									return V(i);
								},
								onchange: (e) => ps("place", e === "nav" ? void 0 : e)
							});
						}
					};
					K(h, (e) => {
						V(rs) && e(g);
					});
					var _ = z(h, 2), v = I(_);
					J(v);
					var y = z(v);
					D(_);
					var b = z(_, 2), x = (e) => {
						var t = Pu(), n = R(t, !0);
						B((e, r) => {
							X(t, "title", e), G(n, r);
						}, [() => Z("tip.nav.announceShowAgain"), () => Z("lbl.announceShowAgain")]), H("click", t, () => Ue?.sendAnnounceReset()), W(e, t);
					};
					K(b, (e) => {
						V(k).nav.announcement?.dismiss !== !1 && e(x);
					});
					var S = z(b, 2), C = I(S), w = z(C);
					{
						let e = /* @__PURE__ */ A(() => V(k).nav.announcement?.color ?? "accent"), t = /* @__PURE__ */ A(Hr), n = /* @__PURE__ */ A(() => Z("tip.nav.announceColor"));
						ha(w, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => ps("color", e)
						});
					}
					D(S);
					var T = z(S, 2), ee = I(T), te = z(ee);
					{
						let e = /* @__PURE__ */ A(() => V(k).nav.announcement?.textColor ?? "accent-text"), t = /* @__PURE__ */ A(Hr), n = /* @__PURE__ */ A(() => Z("tip.nav.announceTextColor"));
						ha(te, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => ps("textColor", e)
						});
					}
					D(T), B((e, t, r, c, l, u, d, f, p, m) => {
						X(n, "title", e), G(i, t), Y(a, V(k).nav.announcement?.text ?? ""), X(o, "title", r), G(s, `${c ?? ""} `), X(_, "title", l), Si(v, V(k).nav.announcement?.dismiss !== !1), G(y, ` ${u ?? ""}`), X(S, "title", d), G(C, `${f ?? ""} `), X(T, "title", p), G(ee, `${m ?? ""} `);
					}, [
						() => Z("tip.nav.announce"),
						() => Z("lbl.text"),
						() => Z("tip.nav.announceLink"),
						() => Z("lbl.link"),
						() => Z("tip.nav.announceDismiss"),
						() => Z("lbl.announceDismiss"),
						() => Z("tip.nav.announceColor"),
						() => Z("lbl.background"),
						() => Z("tip.nav.announceTextColor"),
						() => Z("lbl.textColor")
					]), H("change", a, (e) => ps("text", e.target.value.trim() || void 0)), H("change", v, (e) => ps("dismiss", e.target.checked ? void 0 : !1)), W(e, t);
				};
				K(sn, (e) => {
					V(k).nav.announcement?.show && e(cn);
				}), D(nn), D($t);
				var ln = z($t, 2), un = I(ln), dn = R(un, !0), fn = z(un, 2), pn = I(fn), mn = I(pn), hn = R(mn, !0), gn = z(mn, 2);
				let _n;
				Jr(gn, 21, () => V(ws), ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ A(() => h(V(t), 2));
					let r = () => V(n)[0], i = () => V(n)[1];
					var a = ff();
					let o;
					var s = I(a);
					q(s, () => u[r()]);
					var c = R(z(s), !0);
					D(a), B(() => {
						o = hi(a, 1, "tile svelte-1n46o8q", null, o, { on: (V(k).nav.style?.subStyle ?? "card") === r() }), X(a, "aria-pressed", (V(k).nav.style?.subStyle ?? "card") === r()), G(c, i());
					}), H("click", a, () => ns("subStyle", r() === "card" ? void 0 : r())), W(e, a);
				}), D(gn), D(pn);
				var vn = z(pn, 2), yn = (e) => {
					var t = pf(), n = L(t), r = (e) => {
						var t = pf(), n = L(t);
						{
							let e = /* @__PURE__ */ A(() => Z("lbl.sideSubs")), t = /* @__PURE__ */ A(() => Z("tip.nav.sideSubs")), r = /* @__PURE__ */ A(() => V(k).nav.style?.sideSubs ?? "collapsed"), i = /* @__PURE__ */ A(() => [["collapsed", Z("opt.mobileSubs.collapsed")], ["expanded", Z("opt.mobileSubs.expanded")]]);
							Zo(n, {
								get label() {
									return V(e);
								},
								get title() {
									return V(t);
								},
								get value() {
									return V(r);
								},
								get options() {
									return V(i);
								},
								onchange: (e) => ns("sideSubs", e === "collapsed" ? void 0 : e)
							});
						}
						var r = z(n, 2), i = (e) => {
							var t = Mu(), n = I(t);
							J(n);
							var r = z(n);
							D(t), B((e, i) => {
								X(t, "title", e), Si(n, V(k).nav.style?.sideSubArrow === !0), G(r, ` ${i ?? ""}`);
							}, [() => Z("tip.nav.sideSubArrow"), () => Z("lbl.sideSubArrow")]), H("change", n, (e) => ns("sideSubArrow", e.target.checked ? !0 : void 0)), W(e, t);
						};
						K(r, (e) => {
							V(k).nav.style?.sideSubs === "expanded" && e(i);
						}), W(e, t);
					};
					K(n, (e) => {
						V(rs) && e(r);
					});
					var i = z(n, 2), a = (e) => {
						{
							let t = /* @__PURE__ */ A(() => Z("lbl.subOpen")), n = /* @__PURE__ */ A(() => Z("tip.nav.subOpen")), r = /* @__PURE__ */ A(() => V(k).nav.style?.subOpen ?? "hover"), i = /* @__PURE__ */ A(() => [
								["hover", Z("opt.subOpen.hover")],
								["stay", Z("opt.subOpen.stay")],
								["click", Z("opt.subOpen.click")]
							]);
							Zo(e, {
								get label() {
									return V(t);
								},
								get title() {
									return V(n);
								},
								get value() {
									return V(r);
								},
								get options() {
									return V(i);
								},
								onchange: (e) => ns("subOpen", e === "hover" ? void 0 : e)
							});
						}
					};
					K(i, (e) => {
						(!V(rs) || V(k).nav.style?.sideSubs !== "expanded") && e(a);
					}), W(e, t);
				}, bn = /* @__PURE__ */ A(() => V(k).nav.items?.some((e) => e.children?.length));
				K(vn, (e) => {
					V(bn) && e(yn);
				});
				var xn = z(vn, 2), Sn = (e) => {
					var t = mu(), n = I(t), r = z(n);
					{
						let e = /* @__PURE__ */ A(() => V(k).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ A(Hr), n = /* @__PURE__ */ A(() => Z("tip.nav.subPillColorPick"));
						ha(r, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => ns("subPillColor", e)
						});
					}
					D(t), B((e, r) => {
						X(t, "title", e), G(n, `${r ?? ""} `);
					}, [() => Z("tip.nav.subPillColor"), () => Z("lbl.subPillColor")]), W(e, t);
				};
				K(xn, (e) => {
					V(k).nav.style?.subStyle === "pills" && e(Sn);
				});
				var Cn = z(xn, 2), wn = I(Cn), Tn = z(wn);
				J(Tn), D(Cn), D(fn), D(ln);
				var En = z(ln, 2), Dn = I(En), On = R(Dn, !0), kn = z(Dn, 2);
				{
					let e = (e, t = f) => {
						let n = /* @__PURE__ */ A(wm);
						var r = Mf();
						let i;
						var a = I(r);
						q(a, () => Om, !0), D(a);
						var o = z(a, 2), s = I(o), c = R(s, !0), l = R(z(s, 2), !0);
						D(o), D(r), B(() => {
							i = hi(r, 1, "nav-item ghost svelte-1n46o8q", null, i, { child: t() }), G(c, V(n).label), G(l, V(n).target);
						}), W(e, r);
					};
					var An = I(kn);
					Jr(An, 21, () => V(k).nav.items, Wr, (t, n, r) => {
						let i = /* @__PURE__ */ A(() => `${r}`);
						var a = If(), o = L(a), s = (t) => {
							e(t, () => !1);
						};
						K(o, (e) => {
							V(bm)?.key === V(i) && V(bm).pos === "before" && e(s);
						});
						var c = z(o, 2);
						let l;
						var u = I(c);
						q(u, () => Om, !0), D(u);
						var d = z(u, 2), f = I(d);
						J(f);
						var p = z(f, 2), m = I(p);
						{
							let e = /* @__PURE__ */ A(() => V(n).page ?? (V(n).href == null ? "__none" : "__href")), t = /* @__PURE__ */ A(() => Z("tip.linkTarget")), i = /* @__PURE__ */ A(() => [
								...V(k).pages.map((e) => [e.id, e.title]),
								["__href", Z("opt.linkHref")],
								...V(n).children ? [["__none", Z("opt.noLink")]] : []
							]);
							Q(m, {
								compact: !0,
								get value() {
									return V(e);
								},
								get title() {
									return V(t);
								},
								get options() {
									return V(i);
								},
								onchange: (e) => mm(r, e)
							});
						}
						var h = z(m, 2), g = (e) => {
							var t = Nf();
							J(t), B((e, r) => {
								Y(t, V(n).href), X(t, "placeholder", e), X(t, "title", r);
							}, [() => Z("ph.hrefAnchor"), () => Z("tip.hrefAnchor")]), H("change", t, (e) => hm(r, e.target.value)), W(e, t);
						};
						K(h, (e) => {
							!V(n).page && V(n).href != null && e(g);
						}), D(p), D(d);
						var v = z(d, 2), y = (e) => {
							var t = Pf();
							q(t, () => "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M6 9l6 6 6-6\"/></svg>", !0), D(t), B((e) => X(t, "title", e), [() => Z("tip.nav.hasSubmenu")]), W(e, t);
						};
						K(v, (e) => {
							V(n).children?.length && e(y);
						});
						var b = z(v, 2), x = I(b);
						q(x, () => _.plus, !0), D(x);
						var S = z(x, 2);
						S.disabled = r === 0, q(S, () => _.up, !0), D(S);
						var C = z(S, 2);
						q(C, () => _.cross, !0), D(C);
						var w = z(C, 2);
						q(w, () => _.down, !0), D(w), D(b);
						var T = z(b, 2);
						q(T, () => _.kebab, !0), D(T), D(c);
						var ee = z(c, 2);
						Jr(ee, 17, () => V(n).children ?? [], Wr, (t, i, a) => {
							let o = /* @__PURE__ */ A(() => `${r}.${a}`);
							var s = Ff(), c = L(s), l = (t) => {
								e(t, () => !0);
							};
							K(c, (e) => {
								V(bm)?.key === V(o) && V(bm).pos === "before" && e(l);
							});
							var u = z(c, 2);
							let d;
							var f = I(u);
							q(f, () => Om, !0), D(f);
							var p = z(f, 2), m = I(p);
							J(m);
							var h = z(m, 2), g = I(h);
							{
								let e = /* @__PURE__ */ A(() => V(i).page ?? "__href"), t = /* @__PURE__ */ A(() => Z("tip.linkTarget")), n = /* @__PURE__ */ A(() => [...V(k).pages.map((e) => [e.id, e.title]), ["__href", Z("opt.linkHref")]]);
								Q(g, {
									compact: !0,
									get value() {
										return V(e);
									},
									get title() {
										return V(t);
									},
									get options() {
										return V(n);
									},
									onchange: (e) => Mm(r, a, e)
								});
							}
							var v = z(g, 2), y = (e) => {
								var t = Nf();
								J(t), B((e, n) => {
									Y(t, V(i).href ?? ""), X(t, "placeholder", e), X(t, "title", n);
								}, [() => Z("ph.hrefAnchor"), () => Z("tip.hrefAnchor")]), H("change", t, (e) => Nm(r, a, e.target.value)), W(e, t);
							};
							K(v, (e) => {
								V(i).page || e(y);
							}), D(h), D(p);
							var b = z(p, 2), x = I(b);
							x.disabled = a === 0, q(x, () => _.up, !0), D(x);
							var S = z(x, 2);
							q(S, () => _.cross, !0), D(S);
							var C = z(S, 2);
							q(C, () => _.down, !0), D(C), D(b);
							var w = z(b, 2);
							q(w, () => _.kebab, !0), D(w), D(u);
							var T = z(u, 2), ee = (t) => {
								e(t, () => !0);
							};
							K(T, (e) => {
								V(bm)?.key === V(o) && V(bm).pos === "after" && e(ee);
							}), B((e, t, r, s, c, l, p) => {
								d = hi(u, 1, "nav-item child svelte-1n46o8q", null, d, {
									selected: V(vm) === V(o),
									dragging: V(ym) === V(o)
								}), X(u, "data-key", V(o)), X(f, "title", e), Y(m, V(i).label), X(m, "title", t), X(x, "title", r), X(S, "title", s), X(C, "title", c), C.disabled = a === V(n).children.length - 1, X(w, "title", l), X(w, "aria-label", p);
							}, [
								() => Z("tip.nav.dragItem"),
								() => Z("tip.nav.childLabel"),
								() => Z("tip.moveUp"),
								() => Z("tip.nav.removeChild"),
								() => Z("tip.moveDown"),
								() => Z("tip.nav.itemActions"),
								() => Z("tip.nav.itemActions")
							]), H("click", u, (e) => {
								e.stopPropagation(), P(vm, V(o));
							}), Cr("dragstart", f, (e) => {
								e.stopPropagation(), P(ym, V(o)), e.dataTransfer?.setData("text/plain", V(o));
							}), Cr("dragend", f, Tm), H("input", m, (e) => jm(r, a, e.target.value)), H("click", x, () => Pm(r, a, -1)), H("click", S, () => Fm(r, a)), H("click", C, () => Pm(r, a, 1)), H("click", w, (e) => {
								e.stopPropagation(), P(vm, V(o));
							}), W(t, s);
						});
						var te = z(ee, 2), ne = (t) => {
							e(t, () => !0);
						};
						K(te, (e) => {
							V(bm)?.key === V(i) && V(bm).pos === "into" && e(ne);
						});
						var E = z(te, 2), re = (t) => {
							e(t, () => !1);
						};
						K(E, (e) => {
							V(bm)?.key === V(i) && V(bm).pos === "after" && e(re);
						}), B((e, t, a, o, s, d, p, m) => {
							l = hi(c, 1, "nav-item svelte-1n46o8q", null, l, {
								selected: V(vm) === V(i),
								dragging: V(ym) === V(i),
								"drop-target": V(bm)?.key === V(i) && V(bm).pos === "into"
							}), X(c, "data-key", V(i)), X(u, "title", e), Y(f, V(n).label), X(f, "title", t), X(x, "title", a), X(S, "title", o), X(C, "title", s), X(w, "title", d), w.disabled = r === V(k).nav.items.length - 1, X(T, "title", p), X(T, "aria-label", m);
						}, [
							() => Z("tip.nav.dragItem"),
							() => Z("tip.nav.itemLabel"),
							() => Z("tip.nav.addChild"),
							() => Z("tip.moveUp"),
							() => Z("tip.nav.removeItem"),
							() => Z("tip.moveDown"),
							() => Z("tip.nav.itemActions"),
							() => Z("tip.nav.itemActions")
						]), H("click", c, () => {
							P(vm, V(i));
						}), Cr("dragstart", u, (e) => {
							P(ym, V(i)), e.dataTransfer?.setData("text/plain", V(i));
						}), Cr("dragend", u, Tm), H("input", f, (e) => pm(r, e.target.value)), H("click", x, () => Am(r)), H("click", S, () => gm(r, -1)), H("click", C, () => _m(r)), H("click", w, () => gm(r, 1)), H("click", T, () => {
							P(vm, V(i));
						}), W(t, a);
					}), D(An);
					var jn = z(An, 2), Mn = R(jn, !0), Nn = z(jn, 2), Pn = I(Nn);
					J(Pn);
					var Fn = z(Pn, 2), In = R(Fn, !0);
					D(Nn), D(kn), B((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, ee, te, ne, E, re, ie, ae, oe, se, ce, le, ue, de, fe, pe, me, he, ge, _e, ve, ye, be, xe, Se, Ce) => {
						G(Mn, ye), X(Nn, "title", be), X(Pn, "placeholder", xe), Fn.disabled = Se, G(In, Ce);
					}, [
						() => Z("hint.nav.logoHome"),
						() => Z("group.logo"),
						() => Z("group.appearance"),
						() => Z("group.navLayout"),
						() => Z("tip.nav.variant"),
						() => Z("lbl.navVariant"),
						() => Z("lbl.navVariant"),
						() => Z("tip.nav.sizePreset"),
						() => Z("lbl.size"),
						() => Z("tip.nav.sizePreset"),
						() => Z("lbl.adjust"),
						() => Z("tip.nav.menuTextSize"),
						() => Z("lbl.navTextSize"),
						() => Z("group.navFrame"),
						() => Z("group.navBehaviour"),
						() => Z("lbl.cart"),
						() => Z("tip.nav.cart"),
						() => Z("lbl.showInMenu"),
						() => Z("tip.nav.mobileSame"),
						() => Z("group.mobile"),
						() => Z("tip.nav.menuTextSize"),
						() => Z("lbl.navTextSize"),
						() => Z("lbl.navSameAsDesktop"),
						() => Z("tip.nav.mobileMenu"),
						() => Z("lbl.mobileMenu"),
						() => Z("group.navColours"),
						() => Z("lbl.navHover"),
						() => Z("lbl.navHover"),
						() => Z("tip.nav.hoverTextColor"),
						() => Z("lbl.hoverTextColor"),
						() => Z("tip.nav.textColorPick"),
						() => Z("lbl.textColor"),
						() => Z("tip.nav.blur"),
						() => Z("lbl.navBlur"),
						() => Z("lbl.background"),
						() => Z("tip.nav.announce"),
						() => Z("group.announcement"),
						() => Z("tip.nav.announce"),
						() => Z("lbl.announceShow"),
						() => Z("group.submenu"),
						() => Z("lbl.design"),
						() => Z("lbl.design"),
						() => Z("tip.nav.subColumns"),
						() => Z("lbl.columns"),
						() => Z("hint.nav.submenu"),
						() => Z("group.menuItems"),
						() => Z("ui.addMenuItem"),
						() => Z("tip.nav.newPageAsItem"),
						() => Z("ph.nav.newPageTitle"),
						() => !V(d).trim(),
						() => Z("ui.newPageAsItem")
					]), Cr("dragover", An, Em), Cr("drop", An, (e) => {
						e.preventDefault(), Dm(V(bm)?.key ?? "");
					}), H("click", jn, km), H("keydown", Pn, (e) => {
						e.key === "Enter" && p();
					}), Ei(Pn, () => V(d), (e) => P(d, e)), H("click", Fn, p);
				}
				D(En), D(t), B((e, t, n, r, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, T, ee, te, E, ie, se, ce, le, ue, de, fe, pe, me, he, ge, _e, ve, ye, be, xe, we, Ee, De, D, ke, Ae, je, Ne, Le) => {
					X(i, "title", e), G(a, t), G(w, n), G(ne, r), X(re, "title", o), G(ae, s), X(oe, "aria-label", c), X(Se, "title", l), G(Ce, u), X(Te, "title", d), G(Oe, f), X(Me, "title", p), G(Pe, m), X(Fe, "min", Eo.min), X(Fe, "max", Eo.max), X(Fe, "step", Eo.step), Y(Fe, V(ss)), X(Ie, "min", Eo.min), X(Ie, "max", Eo.max), Y(Ie, V(ss)), G(Ve, h), G(Ye, g), G(tt, _), X(nt, "title", v), Si(rt, V(k).nav.cart?.show === !0), G(it, ` ${y ?? ""}`), X(ct, "title", b), G(lt, x), X(mt, "title", S), G(gt, C), X(_t, "min", Eo.min), X(_t, "max", Eo.max), X(_t, "placeholder", T), Y(_t, V(k).nav.style?.mobile?.textSize ?? ""), X(yt, "title", ee), G(xt, te), G(jt, E), G(Ft, ie), X(It, "aria-label", se), X(Vt, "title", ce), G(Ut, le), X(Wt, "title", ue), G(Kt, de), X(qt, "title", fe), Si(Jt, V(k).nav.style?.blur !== !1), G(N, ` ${pe ?? ""}`), G(Xt, me), X(en, "title", he), G(tn, ge), X(rn, "title", _e), Si(an, V(k).nav.announcement?.show === !0), G(on, ` ${ve ?? ""}`), G(dn, ye), G(hn, be), _n = hi(gn, 1, "tile-grid svelte-1n46o8q", null, _n, {
						"cols-5": !V(rs),
						"cols-3": V(rs)
					}), X(gn, "aria-label", xe), X(Cn, "title", we), G(wn, `${Ee ?? ""} `), Y(Tn, V(k).nav.style?.subColumns ?? 1), X(Dn, "title", De), G(On, D);
				}, [
					() => Z("hint.nav.logoHome"),
					() => Z("group.logo"),
					() => Z("group.appearance"),
					() => Z("group.navLayout"),
					() => Z("tip.nav.variant"),
					() => Z("lbl.navVariant"),
					() => Z("lbl.navVariant"),
					() => Z("tip.nav.sizePreset"),
					() => Z("lbl.size"),
					() => Z("tip.nav.sizePreset"),
					() => Z("lbl.adjust"),
					() => Z("tip.nav.menuTextSize"),
					() => Z("lbl.navTextSize"),
					() => Z("group.navFrame"),
					() => Z("group.navBehaviour"),
					() => Z("lbl.cart"),
					() => Z("tip.nav.cart"),
					() => Z("lbl.showInMenu"),
					() => Z("tip.nav.mobileSame"),
					() => Z("group.mobile"),
					() => Z("tip.nav.menuTextSize"),
					() => Z("lbl.navTextSize"),
					() => Z("lbl.navSameAsDesktop"),
					() => Z("tip.nav.mobileMenu"),
					() => Z("lbl.mobileMenu"),
					() => Z("group.navColours"),
					() => Z("lbl.navHover"),
					() => Z("lbl.navHover"),
					() => Z("tip.nav.hoverTextColor"),
					() => Z("lbl.hoverTextColor"),
					() => Z("tip.nav.textColorPick"),
					() => Z("lbl.textColor"),
					() => Z("tip.nav.blur"),
					() => Z("lbl.navBlur"),
					() => Z("lbl.background"),
					() => Z("tip.nav.announce"),
					() => Z("group.announcement"),
					() => Z("tip.nav.announce"),
					() => Z("lbl.announceShow"),
					() => Z("group.submenu"),
					() => Z("lbl.design"),
					() => Z("lbl.design"),
					() => Z("tip.nav.subColumns"),
					() => Z("lbl.columns"),
					() => Z("hint.nav.submenu"),
					() => Z("group.menuItems"),
					() => Z("ui.addMenuItem"),
					() => Z("tip.nav.newPageAsItem"),
					() => Z("ph.nav.newPageTitle"),
					() => !V(d).trim(),
					() => Z("ui.newPageAsItem")
				]), H("input", Fe, (e) => ns("textSize", e.target.valueAsNumber)), H("change", Ie, (e) => gs(e, "textSize", Eo)), H("change", rt, (e) => da("nav", () => {
					e.target.checked ? V(k).nav.cart = {
						...V(k).nav.cart ?? {},
						show: !0
					} : delete V(k).nav.cart;
				})), H("change", _t, (e) => ys(e, "textSize", Eo)), H("change", Jt, (e) => ns("blur", e.target.checked)), H("change", an, (e) => ps("show", e.target.checked ? !0 : void 0)), H("change", Tn, (e) => ns("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), W(e, t);
			}, C = (e) => {
				var t = Hf(), n = I(t), r = I(n), i = z(r);
				J(i), D(n);
				var a = z(n, 2), o = I(a), s = z(o);
				J(s), D(a);
				var c = z(a, 2), l = I(c), u = z(l);
				{
					let e = /* @__PURE__ */ A(qo), t = /* @__PURE__ */ A(Jo);
					Q(u, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => Yo(e)
					});
				}
				D(c);
				var d = z(c, 4), f = R(d, !0), p = z(d, 2), m = I(p);
				Jr(m, 17, () => V(zo), (e) => e.screen, (e, t) => {
					var n = Rf(), r = I(n), i = R(r, !0), a = z(r, 2);
					let o;
					var s = R(a), c = R(z(a, 2), !0);
					D(n), B(() => {
						G(i, V(t).screen), o = hi(a, 1, "cw-bar svelte-1n46o8q", null, o, { fluid: !V(t).bound }), _i(s, `width:${V(t).pct ?? ""}%`), G(c, V(t).bound ? `${V(t).margin}` : "-");
					}), W(e, n);
				});
				var h = z(m, 2), g = I(h), v = R(g, !0), y = R(z(g, 2), !0);
				D(h);
				var b = z(h, 2), x = (e) => {
					var t = zf(), n = R(t, !0);
					B((e) => G(n, e), [() => Z("lbl.bindsFrom", { n: V(Ee) })]), W(e, t);
				};
				K(b, (e) => {
					V(to) !== "full" && e(x);
				}), D(p);
				var S = z(p, 2);
				Jr(S, 21, () => vo, (e) => e.id, (e, t) => {
					var n = Wd();
					let r;
					var i = R(n, !0);
					B((e) => {
						r = hi(n, 1, "svelte-1n46o8q", null, r, { on: V(uo) === V(t).id }), G(i, e);
					}, [() => Z(`lbl.width.${V(t).id}`)]), H("click", n, () => Go(V(t).width)), W(e, n);
				}), D(S);
				var C = z(S, 2), w = (e) => {
					var t = Bf(), n = I(t), r = R(n, !0), i = z(n, 2);
					J(i);
					var a = R(z(i, 2));
					D(t), B((e, n) => {
						X(t, "title", e), G(r, n), X(i, "min", 960), X(i, "max", go), X(i, "step", 20), Y(i, V(Ro)), G(a, `${V(Ro) ?? ""} px`);
					}, [() => Z("tip.site.contentWidthFree"), () => Z("lbl.widthFree")]), H("input", i, (e) => Go(e.target.valueAsNumber)), W(e, t);
				};
				K(C, (e) => {
					V(to) !== "full" && e(w);
				});
				var T = z(C, 2), ee = R(T, !0), te = z(T, 2);
				Jr(te, 21, () => _o, (e) => e.id, (e, t) => {
					var n = Wd();
					let r;
					var i = R(n, !0);
					B((e) => {
						r = hi(n, 1, "svelte-1n46o8q", null, r, { on: V(fo) === V(t).id }), G(i, e);
					}, [() => Z(`lbl.gutter.${V(t).id}`)]), H("click", n, () => Ko(V(t).gutter)), W(e, n);
				}), D(te);
				var ne = z(te, 2), E = I(ne), re = R(E, !0), ie = z(E, 2), ae = I(ie), oe = I(ae), se = R(oe, !0), ce = z(oe, 2);
				J(ce);
				var le = R(z(ce, 2));
				D(ae), D(ie), D(ne);
				var ue = z(ne, 4), de = I(ue), fe = z(de), pe = (e) => {
					var t = nf();
					B((e) => {
						X(t, "src", V(k).site.icon), X(t, "alt", e);
					}, [() => Z("lbl.siteIcon")]), W(e, t);
				};
				K(fe, (e) => {
					V(k).site.icon && e(pe);
				}), D(ue);
				var me = z(ue, 2), he = I(me), ge = I(he), _e = z(ge);
				D(he);
				var ve = z(he, 2), ye = (e) => {
					var t = Vf(), n = L(t);
					q(n, () => _.pencil ?? "✎", !0), D(n);
					var r = z(n, 2);
					q(r, () => _.cross, !0), D(r), B((e, t) => {
						X(n, "title", e), X(r, "title", t);
					}, [() => Z("tip.site.editIcon"), () => Z("tip.site.removeIcon")]), H("click", n, () => P(Ja, V(k).site.icon, !0)), H("click", r, Za), W(e, t);
				};
				K(ve, (e) => {
					V(k).site.icon && e(ye);
				}), D(me), D(t), B((e, t, u, p, m, h, g, _, b, x, S, C, w, te, E, ie, oe, ue, fe, pe) => {
					X(n, "title", e), G(r, `${t ?? ""} `), Y(i, V(k).site.title ?? ""), X(i, "placeholder", u), X(a, "title", p), G(o, `${m ?? ""} `), Y(s, V(k).site.description ?? ""), X(s, "placeholder", h), X(c, "title", g), G(l, `${_ ?? ""} `), X(d, "title", b), G(f, x), G(v, S), G(y, C), X(T, "title", w), G(ee, te), ne.open = V(fo) === null || V(Io), G(re, E), X(ae, "title", ie), G(se, oe), X(ce, "min", 0), X(ce, "max", 12), X(ce, "step", 1), Y(ce, V(io)), G(le, `${V(io) ?? ""} vw`), G(de, `${ue ?? ""} `), X(he, "title", fe), G(ge, `${pe ?? ""} `);
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
				]), H("input", i, (e) => Qa(e.target.value)), H("input", s, (e) => $a(e.target.value)), Cr("toggle", ne, (e) => P(Io, e.currentTarget.open, !0)), H("input", ce, (e) => Ko(e.target.valueAsNumber)), H("change", _e, Ya), W(e, t);
			}, T = (e) => {
				var t = Xf();
				{
					let e = (e, t = f, n = f) => {
						var r = Wf(), i = I(r), a = (e) => {
							var t = Uf(), r = R(t, !0);
							B(() => G(r, n())), W(e, t);
						};
						K(i, (e) => {
							n() && e(a);
						});
						var o = z(i, 2), s = I(o), c = R(s, !0), l = z(s, 2), u = R(l, !0), d = z(l, 2), p = I(d), m = R(p, !0), h = R(z(p), !0);
						D(d), D(o), D(r), B((e, t, n, r, i, a, s, l, d) => {
							_i(o, `--tv-bg:${e ?? ""};--tv-surface:${t ?? ""};--tv-text:${n ?? ""};--tv-accent:${r ?? ""};--tv-accent-ink:${i ?? ""}`), G(c, a), G(u, s), G(m, l), G(h, d);
						}, [
							() => ih(t().bg, t()),
							() => ih(t().surface, t()),
							() => ih(t().text, t()),
							() => ih(t().accent, t()),
							() => ih(t()["accent-text"] ?? S(ih(t().accent ?? "#000000", t())), t()),
							() => Z("preview.heading"),
							() => Z("preview.cardBody"),
							() => Z("preview.button"),
							() => Z("preview.link")
						]), W(e, r);
					};
					var n = I(t), r = R(n, !0), i = z(n, 2);
					Jr(i, 21, () => oh, (e) => e.id, (e, t) => {
						var n = Gf();
						let r;
						var i = I(n), a = I(i), o = z(a), s = z(o), c = z(s);
						D(i);
						var l = R(z(i, 2), !0);
						D(n), B(() => {
							r = hi(n, 1, "theme-preset svelte-1n46o8q", null, r, { sel: V(ch) === V(t).id }), X(n, "title", `${V(t).name} - ${V(t).note}`), _i(a, `background:${V(t).light.bg ?? ""}`), _i(o, `background:${V(t).light.surface ?? ""}`), _i(s, `background:${V(t).light.accent ?? ""}`), _i(c, `background:${V(t).light.text ?? ""}`), G(l, V(t).name);
						}), H("click", n, () => sh(V(t))), W(e, n);
					}), D(i);
					var a = z(i, 2), o = R(a, !0), s = z(a, 2), c = I(s);
					J(c);
					var l = z(c);
					D(s);
					var u = z(s, 2), d = (e) => {
						var t = Kf(), n = I(t), r = R(n, !0), i = z(n, 2), a = I(i);
						let o;
						var s = R(a, !0), c = z(a, 2);
						let l;
						var u = R(c, !0);
						D(i), D(t), B((e, t, n, i) => {
							G(r, e), X(a, "title", t), o = hi(a, 1, "svelte-1n46o8q", null, o, { on: V(Kr) }), G(s, n), l = hi(c, 1, "svelte-1n46o8q", null, l, { on: !V(Kr) }), G(u, i);
						}, [
							() => Z("lbl.darkColors"),
							() => Z("hint.theme.autoDark"),
							() => Z("opt.auto"),
							() => Z("opt.custom")
						]), H("click", a, () => eh(!0)), H("click", c, () => eh(!1)), W(e, t);
					};
					K(u, (e) => {
						V(Gr) && e(d);
					});
					var p = z(u, 2), m = I(p), g = (e) => {
						var t = qf(), n = R(t, !0);
						B((e) => G(n, e), [() => Z("lbl.light")]), W(e, t);
					};
					K(m, (e) => {
						V(Gr) && e(g);
					});
					var _ = z(m, 2);
					let Ie;
					var v = R(_, !0);
					D(p);
					var y = z(p, 2);
					Jr(y, 21, () => Ur, ([e, t, n]) => e, (e, t) => {
						var n = /* @__PURE__ */ A(() => h(V(t), 3));
						let r = () => V(n)[0], i = () => V(n)[1], a = () => V(n)[2];
						var o = Jf(), s = I(o);
						{
							let e = /* @__PURE__ */ A(() => V(k).theme.tokens.color[r()] ?? Lm(r(), V(Yr))), t = /* @__PURE__ */ A(Hr);
							ha(s, {
								get value() {
									return V(e);
								},
								get tokens() {
									return V(t);
								},
								get label() {
									return i();
								},
								onchange: (e) => Im(r(), e)
							});
						}
						var c = z(s, 2), l = R(c, !0), u = R(z(c, 2), !0);
						D(o), B((e) => {
							G(l, a()), G(u, e);
						}, [() => ih(V(k).theme.tokens.color[r()] ?? Lm(r(), V(Yr)), V(Yr))]), W(e, o);
					}), D(y);
					var b = z(y, 2), x = (e) => {
						var t = Yf(), n = L(t), r = I(n), i = R(r, !0), a = z(r, 2);
						let o;
						var s = R(a, !0);
						D(n);
						var c = z(n, 2);
						let l;
						Jr(c, 21, () => Ur, ([e, t, n]) => e, (e, t) => {
							var n = /* @__PURE__ */ A(() => h(V(t), 3));
							let r = () => V(n)[0], i = () => V(n)[1], a = () => V(n)[2];
							var o = Jf(), s = I(o);
							{
								let e = /* @__PURE__ */ A(() => V(k).theme.alt.tokens.color[r()] ?? V(Xr)[r()] ?? Lm(r(), V(Xr))), t = /* @__PURE__ */ A(Hr), n = /* @__PURE__ */ A(() => Z("theme.darkColorLabel", { name: i() }));
								ha(s, {
									get value() {
										return V(e);
									},
									get tokens() {
										return V(t);
									},
									get label() {
										return V(n);
									},
									onchange: (e) => Zm(r(), e)
								});
							}
							var c = z(s, 2), l = R(c, !0), u = R(z(c, 2), !0);
							D(o), B((e) => {
								G(l, a()), G(u, e);
							}, [() => ih(V(k).theme.alt.tokens.color[r()] ?? V(Xr)[r()] ?? Lm(r(), V(Xr)), V(Xr))]), W(e, o);
						}), D(c), B((e, t, n) => {
							G(i, e), o = hi(a, 1, "chip svelte-1n46o8q", null, o, { accent: V(qr) === "dark" }), X(a, "title", t), G(s, n), l = hi(c, 1, "palcells svelte-1n46o8q", null, l, { autopal: V(Kr) });
						}, [
							() => Z("lbl.dark"),
							() => Z("tip.theme.darkDefault"),
							() => Z("common.standard")
						]), H("click", a, () => Qm("dark")), W(e, t);
					};
					K(b, (e) => {
						V(Gr) && e(x);
					});
					var C = z(b, 2), w = I(C), T = R(w, !0), ee = z(w, 2);
					let Le;
					var te = R(ee, !0);
					D(C);
					var ne = z(C, 2), E = I(ne);
					{
						let t = /* @__PURE__ */ A(() => V(Gr) ? Z("lbl.light") : "");
						e(E, () => V(Yr), () => V(t));
					}
					var re = z(E, 2), ie = (t) => {
						{
							let n = /* @__PURE__ */ A(() => Z("lbl.dark"));
							e(t, () => V(Xr), () => V(n));
						}
					};
					K(re, (e) => {
						V(Gr) && e(ie);
					}), D(ne);
					var ae = z(ne, 2), oe = I(ae), se = R(oe, !0), ce = z(oe, 2), le = I(ce), ue = I(le), de = z(ue);
					{
						let e = /* @__PURE__ */ A(() => th("heading"));
						Q(de, {
							get value() {
								return V(k).theme.tokens.font.heading;
							},
							get options() {
								return V(e);
							},
							onchange: (e) => qm("heading", e)
						});
					}
					D(le);
					var fe = z(le, 2), pe = I(fe), me = z(pe);
					{
						let e = /* @__PURE__ */ A(() => th("body"));
						Q(me, {
							get value() {
								return V(k).theme.tokens.font.body;
							},
							get options() {
								return V(e);
							},
							onchange: (e) => qm("body", e)
						});
					}
					D(fe);
					var he = z(fe, 2), ge = I(he), _e = R(ge, !0), ve = z(ge, 2), ye = R(ve, !0);
					D(he), D(ce), D(ae);
					var be = z(ae, 2), xe = I(be), Se = R(xe, !0), Ce = z(xe, 2), we = I(Ce), Te = I(we), Ee = R(Te, !0), De = R(z(Te, 2), !0);
					D(we);
					var Oe = z(we, 2), ke = I(Oe, !0), Ae = R(z(ke), !0);
					D(Oe);
					var je = z(Oe, 2);
					J(je);
					var Me = z(je, 2), Ne = I(Me, !0), Pe = R(z(Ne), !0);
					D(Me);
					var Fe = z(Me, 2);
					J(Fe), D(Ce), D(be), D(t), B((e, t, n, i, a, u, d, f, p, m, h, g, y, b, x, S, w, ne, E, re, ie) => {
						G(r, e), G(o, t), X(s, "title", n), Si(c, V(Gr)), G(l, ` ${i ?? ""}`), Ie = hi(_, 1, "chip svelte-1n46o8q", null, Ie, { accent: V(qr) === "light" }), X(_, "title", a), G(v, u), X(C, "title", d), G(T, f), Le = hi(ee, 1, "chip palauto svelte-1n46o8q", null, Le, { accent: V(Rm) }), G(te, p), G(se, m), G(ue, `${h ?? ""} `), G(pe, `${g ?? ""} `), _i(ge, `font-family:${V(k).theme.tokens.font.heading ?? ""}`), G(_e, y), _i(ve, `font-family:${V(k).theme.tokens.font.body ?? ""}`), G(ye, b), G(Se, x), _i(we, `--r-sm:${V(k).theme.tokens.radius.sm ?? ""};--r-md:${V(k).theme.tokens.radius.md ?? ""}`), G(Ee, S), G(De, w), G(ke, ne), G(Ae, V(k).theme.tokens.radius.sm), Y(je, E), G(Ne, re), G(Pe, V(k).theme.tokens.radius.md), Y(Fe, ie);
					}, [
						() => Z("lbl.themePresets"),
						() => Z("lbl.colors"),
						() => Z("tip.theme.dualMode"),
						() => Z("lbl.dualMode"),
						() => Z("tip.theme.defaultScheme"),
						() => Z("common.standard"),
						() => Z("tip.theme.accentTextAuto"),
						() => Z("palette.accentText"),
						() => Z("opt.auto"),
						() => Z("group.typography"),
						() => Z("lbl.headings"),
						() => Z("lbl.bodyText"),
						() => Z("preview.heading"),
						() => Z("preview.bodySample"),
						() => Z("group.shape"),
						() => Z("preview.button"),
						() => Z("preview.card"),
						() => Z("lbl.smallCorners"),
						() => nh(V(k).theme.tokens.radius.sm),
						() => Z("lbl.largeCorners"),
						() => nh(V(k).theme.tokens.radius.md)
					]), H("change", c, (e) => $m(e.target.checked)), H("click", _, () => Qm("light")), H("click", ee, () => Km(!V(Rm))), H("input", je, (e) => rh("sm", Number(e.target.value))), H("input", Fe, (e) => rh("md", Number(e.target.value)));
				}
				W(e, t);
			}, ee = (e) => {
				var t = tp();
				let n;
				var r = I(t);
				J(r);
				var i = z(r, 2), a = (e) => {
					var t = Nr();
					Jr(L(t), 17, () => Nc(Ph(), V(Nh), (e) => e.label), (e) => e.label, (e, t) => {
						var n = Nr(), r = L(n), i = (e) => {
							var n = Zf(), r = I(n), i = z(r);
							D(n), B((e) => {
								X(n, "title", e), G(r, `${V(t).label ?? ""} `);
							}, [() => Z("tip.webpAuto")]), H("change", i, Lh), W(e, n);
						}, a = (e) => {
							var n = Qf(), r = I(n), i = z(r);
							D(n), B((e) => {
								X(n, "title", e), G(r, `${V(t).label ?? ""} `);
							}, [() => Z("tip.blocks.galleryImages")]), H("change", i, Vh), W(e, n);
						}, o = (e) => {
							var n = Pu(), r = R(n, !0);
							B(() => G(r, V(t).label)), H("click", n, () => Fh(V(t))), W(e, n);
						};
						K(r, (e) => {
							V(t).act === "image" ? e(i) : V(t).act === "galleryImages" ? e(a, 1) : e(o, -1);
						}), W(e, n);
					}, (e) => {
						var t = _u(), n = R(t, !0);
						B((e) => G(n, e), [() => Z("canvas.searchEmpty")]), W(e, t);
					}), W(e, t);
				}, o = /* @__PURE__ */ A(() => V(Nh).trim()), s = (e) => {
					var t = ep(), n = L(t), r = I(n), i = R(r, !0), a = z(r, 2), o = I(a), s = R(o, !0), c = z(o, 2), l = R(c, !0);
					D(a), D(n);
					var u = z(n, 2), d = R(u, !0), f = z(u, 2), p = I(f), m = z(p);
					D(f);
					var h = z(f, 2), g = R(h, !0), _ = z(h, 2), v = R(_, !0), y = z(_, 2), b = R(y, !0), x = z(y, 2), S = R(x, !0), C = z(x, 2), w = R(C, !0), T = z(C, 2), ee = R(T, !0), te = z(T, 2), ne = R(te, !0), E = z(te, 2), re = R(E, !0), ie = z(E, 2), ae = R(ie, !0), oe = z(ie, 2), se = R(oe, !0), ce = z(oe, 2), le = R(ce, !0), ue = z(ce, 2), de = R(ue, !0), fe = z(ue, 2), pe = R(fe, !0), me = z(fe, 2), he = R(me, !0), ge = z(me, 2), _e = R(ge, !0), ve = z(ge, 2), ye = R(ve, !0), be = z(ve, 2), xe = I(be), Se = R(xe, !0), Ce = z(xe, 2), we = I(Ce), Te = R(we, !0), Ee = z(we, 2), De = I(Ee), Oe = z(De);
					D(Ee), D(Ce), D(be);
					var ke = z(be, 2), Ae = I(ke), je = R(Ae, !0), Me = z(Ae, 2), Ne = I(Me), Pe = R(Ne, !0), Fe = z(Ne, 2), Ie = R(Fe, !0), Le = z(Fe, 2), Re = R(Le, !0), ze = z(Le, 2), Be = R(ze, !0);
					D(Me), D(ke);
					var Ve = z(ke, 2), O = I(Ve), He = R(O, !0), k = z(O, 2), We = I(k), Ge = R(We, !0), Ke = z(We, 2), qe = R(Ke, !0), Je = z(Ke, 2), Ye = R(Je, !0), Xe = z(Je, 2), Ze = R(Xe, !0), Qe = z(Xe, 2), $e = R(Qe, !0);
					D(k), D(Ve);
					var et = z(Ve, 2), tt = (e) => {
						let t = /* @__PURE__ */ A(() => V(Us).filter((e) => Bs[e]?.data?.mal?.kind === "blocks"));
						var n = $f(), r = I(n), i = R(r, !0), a = z(r, 2);
						Jr(a, 20, () => V(t), (e) => e, (e, t) => {
							var n = Pu(), r = R(n, !0);
							B((e) => {
								X(n, "title", e), G(r, Bs[t].data.mal.name);
							}, [() => Z("canvas.insertGroup")]), H("click", n, () => Ue?.sendInsertTemplate(t)), W(e, n);
						}), D(a), D(n), B((e) => G(i, e), [() => Z("canvas.tabMyTemplates")]), W(e, n);
					}, nt = /* @__PURE__ */ A(() => V(Us).some((e) => Bs[e]?.data?.mal?.kind === "blocks"));
					K(et, (e) => {
						V(nt) && e(tt);
					});
					var rt = z(et, 2), it = (e) => {
						var t = $f(), n = I(t), r = R(n, !0), i = z(n, 2);
						Jr(i, 21, () => V(Ah), (e) => e.type, (e, t) => {
							var n = Nr(), r = L(n), i = (e) => {
								var n = $f(), r = I(n), i = R(r, !0), a = z(r, 2);
								Jr(a, 21, () => V(t).variants, (e) => e.label, (e, n) => {
									var r = Pu(), i = R(r, !0);
									B((e) => {
										X(r, "title", e), G(i, V(n).label);
									}, [() => Z("tip.blocks.fromPlugin", { plugin: V(t).plugin })]), H("click", r, () => Mh(V(t), V(n).props)), W(e, r);
								}), D(a), D(n), B(() => G(i, V(t).label)), W(e, n);
							}, a = (e) => {
								var n = Pu(), r = R(n, !0);
								B((e) => {
									X(n, "title", e), G(r, V(t).label);
								}, [() => Z("tip.blocks.fromPlugin", { plugin: V(t).plugin })]), H("click", n, () => Mh(V(t))), W(e, n);
							};
							K(r, (e) => {
								V(t).variants?.length ? e(i) : e(a, -1);
							}), W(e, n);
						}), D(i), D(t), B((e) => G(r, e), [() => Z("panel.plugins")]), W(e, t);
					};
					K(rt, (e) => {
						V(Ah).length && e(it);
					}), B((e, t, n, r, a, o, u, m, be, xe, Ce, D, Oe, ke, Ae, Me, Ve, O, Ue, k, We, Ke, Je, Xe, Qe, et, tt, nt, rt, it, at, ot, st, ct, lt, ut, dt, ft, pt, mt, ht, gt, _t, vt, yt, bt, xt, A, St, Ct, wt, Tt, Et, Dt, Ot, j, kt, At, jt) => {
						G(i, e), G(s, t), X(c, "title", n), G(l, r), G(d, a), X(f, "title", o), G(p, `${u ?? ""} `), X(h, "title", m), G(g, be), X(_, "title", xe), G(v, Ce), X(y, "title", D), G(b, Oe), X(x, "title", ke), G(S, Ae), X(C, "title", Me), G(w, Ve), X(T, "title", O), G(ee, Ue), X(te, "title", k), G(ne, We), X(E, "title", Ke), G(re, Je), X(ie, "title", Xe), G(ae, Qe), X(oe, "title", et), G(se, tt), X(ce, "title", nt), G(le, rt), X(ue, "title", it), G(de, at), X(fe, "title", ot), G(pe, st), X(me, "title", ct), G(he, lt), X(ge, "title", ut), G(_e, dt), X(ve, "title", ft), G(ye, pt), G(Se, mt), X(we, "title", ht), G(Te, gt), X(Ee, "title", _t), G(De, `${vt ?? ""} `), G(je, yt), X(Ne, "title", bt), G(Pe, xt), X(Fe, "title", A), G(Ie, St), X(Le, "title", Ct), G(Re, wt), X(ze, "title", Tt), G(Be, Et), G(He, Dt), G(Ge, Ot), G(qe, j), G(Ye, kt), G(Ze, At), G($e, jt);
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
						() => Z("tip.blocks.map"),
						() => Z("blocks.map"),
						() => Z("tip.blocks.form"),
						() => Z("blocks.form"),
						() => Z("tip.blocks.collection"),
						() => Z("blocks.collection"),
						() => Z("tip.blocks.faq"),
						() => Z("blocks.faq"),
						() => Z("tip.blocks.timeline"),
						() => Z("blocks.timeline"),
						() => Z("tip.blocks.quote"),
						() => Z("blocks.quote"),
						() => Z("tip.blocks.stats"),
						() => Z("blocks.stats"),
						() => Z("tip.blocks.table"),
						() => Z("blocks.table"),
						() => Z("tip.blocks.share"),
						() => Z("blocks.share"),
						() => Z("tip.blocks.countdown"),
						() => Z("blocks.countdown"),
						() => Z("tip.blocks.audio"),
						() => Z("blocks.audio"),
						() => Z("tip.blocks.product"),
						() => Z("blocks.product"),
						() => Z("tip.blocks.cart"),
						() => Z("blocks.cart"),
						() => Z("tip.blocks.checkout"),
						() => Z("blocks.checkout"),
						() => Z("blocks.gallery"),
						() => Z("tip.blocks.gallery"),
						() => Z("ui.emptyGallery"),
						() => Z("tip.blocks.galleryImages"),
						() => Z("ui.galleryWithImages"),
						() => Z("blocks.calendar"),
						() => Z("tip.blocks.calendar"),
						() => Z("calendar.viewList"),
						() => Z("tip.blocks.calendar"),
						() => Z("calendar.viewCards"),
						() => Z("tip.blocks.calendar"),
						() => Z("calendar.viewMonth"),
						() => Z("tip.blocks.calendar"),
						() => Z("calendar.viewNext"),
						() => Z("group.shapes"),
						() => Z("shape.line"),
						() => Z("shape.arrow"),
						() => Z("shape.circle"),
						() => Z("shape.rect"),
						() => Z("shape.triangle")
					]), H("click", o, () => kh("text")), H("click", c, () => kh("text-box")), H("click", u, () => kh("button")), H("change", m, Lh), H("click", h, () => kh("video")), H("click", _, () => kh("icon")), H("click", y, () => kh("map")), H("click", x, () => kh("form")), H("click", C, () => kh("collection")), H("click", T, () => kh("faq")), H("click", te, () => kh("timeline")), H("click", E, () => kh("quote")), H("click", ie, () => kh("stats")), H("click", oe, () => kh("table")), H("click", ce, () => kh("share")), H("click", ue, () => kh("countdown")), H("click", fe, () => kh("audio")), H("click", me, () => kh("product")), H("click", ge, () => kh("cart")), H("click", ve, () => kh("checkout")), H("click", we, () => kh("gallery")), H("change", Oe, Vh), H("click", Ne, () => kh("calendar")), H("click", Fe, () => kh("calendar-cards")), H("click", Le, () => kh("calendar-month")), H("click", ze, () => kh("calendar-next")), H("click", We, () => kh("shape-line")), H("click", Ke, () => kh("shape-arrow")), H("click", Je, () => kh("shape-circle")), H("click", Xe, () => kh("shape-rect")), H("click", Qe, () => kh("shape-triangle")), W(e, t);
				};
				K(i, (e) => {
					V(o) ? e(a) : e(s, -1);
				}), D(t), B((e, i, a) => {
					n = hi(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: V(be) === "mobile" }), X(t, "title", e), X(r, "placeholder", i), X(r, "title", a);
				}, [
					() => V(be) === "mobile" ? Z("tip.blocks.mobileLocked") : void 0,
					() => Z("canvas.searchBlocks"),
					() => Z("canvas.searchBlocks")
				]), Ei(r, () => V(Nh), (e) => P(Nh, e)), W(e, t);
			}, te = (e) => {
				var t = np(), n = I(t), r = I(n), i = R(z(r));
				D(n);
				var a = z(n, 2);
				J(a);
				var o = z(a, 2), s = I(o);
				J(s);
				var c = z(s);
				D(o), D(t), B((e, t) => {
					G(r, `${e ?? ""} `), G(i, `${V(se).size ?? ""} px`), Y(a, V(se).size), Si(s, V(se).snap !== !1), G(c, ` ${t ?? ""}`);
				}, [() => Z("lbl.gridSize"), () => Z("lbl.gridSnap")]), H("input", a, (e) => gi("size", Number(e.target.value))), H("change", s, (e) => gi("snap", e.target.checked)), W(e, t);
			}, ne = (e) => {
				var t = lp(), r = I(t), i = (e) => {
					var t = rp(), n = L(t), r = R(n, !0), i = z(n, 2);
					a(i), B((e) => G(r, e), [() => Z("blocks.suffix", { label: In[V(M).type] ?? V(M).type })]), W(e, t);
				}, o = (e) => {
					var t = cp(), r = L(t), i = R(r, !0), a = z(r, 2), o = I(a), s = z(o);
					J(s), D(a);
					var c = z(a, 4), l = I(c);
					J(l);
					var u = z(l);
					D(c);
					var d = z(c, 2), f = (e) => {
						var t = ip(), n = L(t), r = I(n), i = R(z(r));
						D(n);
						var a = z(n, 2);
						J(a), B((e) => {
							G(r, `${e ?? ""} `), G(i, `${V(Bn).size ?? ""} px`), Y(a, V(Bn).size);
						}, [() => Z("lbl.gridSize")]), H("input", a, (e) => mi("size", Number(e.target.value))), W(e, t);
					};
					K(d, (e) => {
						V(Bn) && e(f);
					});
					var p = z(d, 4), m = R(p, !0), g = z(p, 2);
					Jr(g, 21, () => [["", "common.standard"], ...Object.entries(Vc)], ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ A(() => h(V(t), 2));
						let r = () => V(n)[0], i = () => V(n)[1], a = /* @__PURE__ */ A(() => Zn(r()));
						var o = ap();
						let s;
						var c = I(o), l = I(c), u = z(l, 2), d = z(u, 2);
						D(c);
						var f = R(z(c, 2), !0);
						D(o), B((e, t) => {
							s = hi(o, 1, "rs-card svelte-1n46o8q", null, s, { on: V(Gn) === r() }), X(o, "title", e), _i(c, `background: ${V(a).bg ?? ""}`), _i(l, `background: ${V(a).text ?? ""}`), _i(u, `background: ${V(a).surface ?? ""}`), _i(d, `background: ${V(a).accent ?? ""}`), G(f, t);
						}, [() => Z("tip.props.sectionTheme"), () => Z(i())]), H("click", o, () => Xn(r())), W(e, o);
					}), D(g);
					var v = z(g, 2), y = I(v), b = z(y), x = I(b), S = R(x), C = z(x, 2);
					q(C, () => _.copy, !0), D(C), D(b), D(v);
					var w = z(v, 4), T = R(w, !0), ee = z(w, 2);
					n(ee, () => V(Ir), () => V(Hn));
					var te = z(ee, 4), ne = I(te), E = z(ne);
					{
						let e = /* @__PURE__ */ A(() => Qr(V(Un)) ? V(Un).type : "");
						Q(E, {
							get value() {
								return V(e);
							},
							get options() {
								return $r;
							},
							onchange: (e) => oi(e || null)
						});
					}
					D(te);
					var re = z(te, 2), ie = (e) => {
						var t = sp(), n = L(t), r = I(n), i = z(r);
						J(i), D(n);
						var a = z(n, 2), o = I(a), s = z(o);
						J(s), D(a);
						var c = z(a, 2), l = (e) => {
							var t = op(), n = L(t), r = I(n), i = z(r);
							{
								let e = /* @__PURE__ */ A(() => V(Un).props.effect ?? "slide-up"), t = /* @__PURE__ */ A(() => [
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
									onchange: (e) => ui("effect", e)
								});
							}
							D(n);
							var a = z(n, 2), o = I(a), s = z(o);
							J(s), D(a);
							var c = z(a, 2), l = I(c), u = z(l);
							{
								let e = /* @__PURE__ */ A(() => V(Un).props.pattern ?? "sequence"), t = /* @__PURE__ */ A(() => [
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
									onchange: (e) => ui("pattern", e)
								});
							}
							D(c), B((e, t, i, u, d, f) => {
								X(n, "title", e), G(r, `${t ?? ""} `), X(a, "title", i), G(o, `${u ?? ""} `), Y(s, V(Un).props.step ?? 90), X(c, "title", d), G(l, `${f ?? ""} `);
							}, [
								() => Z("tip.props.staggerEffect"),
								() => Z("lbl.staggerEffect"),
								() => Z("tip.props.staggerStep"),
								() => Z("lbl.stepMs"),
								() => Z("tip.props.staggerPattern"),
								() => Z("lbl.pattern")
							]), H("change", s, (e) => li("step", Number(e.target.value))), W(e, t);
						};
						K(c, (e) => {
							V(Un).type === "stagger" && e(l);
						}), B((e, t) => {
							G(r, `${e ?? ""} `), Y(i, V(Un).props.duration), G(o, `${t ?? ""} `), Y(s, V(Un).props.delay ?? 0);
						}, [() => Z("lbl.durationMs"), () => Z("lbl.delayMs")]), H("change", i, (e) => li("duration", Number(e.target.value))), H("change", s, (e) => li("delay", Number(e.target.value))), W(e, t);
					}, ae = /* @__PURE__ */ A(() => Qr(V(Un)));
					K(re, (e) => {
						V(ae) && e(ie);
					});
					var oe = z(re, 2), se = I(oe), ce = z(se);
					{
						let e = /* @__PURE__ */ A(() => V(Wn)?.type ?? (V(Un) && !Qr(V(Un)) ? V(Un).type : ""));
						Q(ce, {
							get value() {
								return V(e);
							},
							get options() {
								return ti;
							},
							onchange: (e) => si(e || null)
						});
					}
					D(oe), B((e, t, n, r, c, d, f, h, g, _, b, x, w, ee, E) => {
						G(i, e), X(a, "title", t), G(o, `${n ?? ""} `), Y(s, V(Vn)), X(s, "placeholder", r), Si(l, V(Bn) !== null), G(u, ` ${c ?? ""}`), X(p, "title", d), G(m, f), X(v, "title", h), G(y, `${g ?? ""} `), G(S, `#${V(zn) ?? ""}`), X(C, "title", _), G(T, b), X(te, "title", x), G(ne, `${w ?? ""} `), X(oe, "title", ee), G(se, `${E ?? ""} `);
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
					]), H("change", s, (e) => di(e.target.value)), H("change", l, (e) => pi(e.target.checked)), H("click", C, () => navigator.clipboard?.writeText(`#${V(zn)}`)), W(e, t);
				}, s = (e) => {
					var t = _u(), n = R(t, !0);
					B((e) => G(n, e), [() => Z("hint.props.empty")]), W(e, t);
				};
				K(r, (e) => {
					V(M) ? e(i) : V(zn) ? e(o, 1) : e(s, -1);
				}), D(t), W(e, t);
			}, E = (e) => {
				var t = _p(), i = I(t), a = I(i);
				J(a);
				var o = z(a);
				D(i);
				var s = z(i, 2), c = (e) => {
					var t = $f(), n = I(t), r = R(n, !0), i = z(n, 2);
					Jr(i, 21, () => V(k).pages ?? [], (e) => e.id, (e, t) => {
						var n = Mu(), r = I(n);
						J(r);
						var i = z(r);
						D(n), B((e, a) => {
							X(n, "title", e), Si(r, a), G(i, ` ${(V(t).title || V(t).id) ?? ""}`);
						}, [() => Z("tip.footer.hideOnPage"), () => !(V(k).footer?.hideOn ?? []).includes(V(t).id)]), H("change", r, (e) => Rl(V(t).id, e.target.checked)), W(e, n);
					}), D(i), D(t), B((e) => G(r, e), [() => Z("group.showOnPages")]), W(e, t);
				};
				K(s, (e) => {
					V(k).footer?.show && e(c);
				});
				var l = z(s, 2), u = I(l), d = R(u, !0), f = z(u, 2), p = I(f);
				Jr(p, 21, () => Cl, (e) => e.id, (e, t) => {
					var n = up(), r = I(n);
					q(r, () => Hl(V(t).thumb), !0), D(r);
					var i = R(z(r, 2), !0);
					D(n), B((e) => {
						X(n, "title", e), G(i, V(t).label);
					}, [() => Z("tip.footer.template", { label: V(t).label })]), H("click", n, () => Tl(V(t).id)), W(e, n);
				}), D(p), D(f), D(l);
				var m = z(l, 2), h = I(m), g = R(h, !0), v = z(h, 2), y = I(v), b = I(y), x = z(b);
				J(x), D(y);
				var S = z(y, 2), C = I(S), w = z(C);
				J(w), D(S);
				var T = z(S, 2), ee = I(T), te = z(ee);
				{
					let e = /* @__PURE__ */ A(() => V(k).footer?.brand?.mode ?? "text"), t = /* @__PURE__ */ A(() => [
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
						onchange: (e) => vl(e)
					});
				}
				D(T);
				var ne = z(T, 2), E = (e) => {
					var t = fp(), n = L(t), r = I(n), i = I(r), a = z(i);
					D(r);
					var o = z(r, 2), s = (e) => {
						var t = Xl();
						q(t, () => _.cross, !0), D(t), B((e) => X(t, "title", e), [() => Z("tip.footer.removeLogo")]), H("click", t, bl), W(e, t);
					};
					K(o, (e) => {
						V(k).footer?.brand?.logo && e(s);
					}), D(n);
					var c = z(n, 2), l = (e) => {
						var t = dp(), n = L(t), r = I(n), i = R(z(r));
						D(n);
						var a = z(n, 2);
						J(a), B((e) => {
							G(r, `${e ?? ""} `), G(i, `${V(k).footer?.brand?.logoHeight ?? 40 ?? ""} px`), Y(a, V(k).footer?.brand?.logoHeight ?? 40);
						}, [() => Z("lbl.logoHeight")]), H("input", a, (e) => xl(e.target.value)), W(e, t);
					};
					K(c, (e) => {
						V(k).footer?.brand?.logo && e(l);
					}), B((e, t) => {
						X(r, "title", e), G(i, `${t ?? ""} `);
					}, [() => Z("tip.webpAutoPublish"), () => V(k).footer?.brand?.logo ? Z("ui.changeLogo") : Z("ui.uploadLogo")]), H("change", a, yl), W(e, t);
				};
				K(ne, (e) => {
					(V(k).footer?.brand?.mode ?? "text") !== "text" && e(E);
				}), D(v), D(m);
				var re = z(m, 2), ie = I(re), ae = R(ie, !0), oe = z(ie, 2), se = I(oe);
				Jr(se, 17, () => V(k).footer?.columns ?? [], Wr, (e, t, n) => {
					var r = pp(), i = L(r), a = I(i);
					J(a);
					var o = z(a, 2), s = I(o);
					q(s, () => _.plus, !0), D(s);
					var c = z(s, 2);
					c.disabled = n === 0, q(c, () => _.up, !0), D(c);
					var l = z(c, 2);
					q(l, () => _.down, !0), D(l);
					var u = z(l, 2);
					q(u, () => _.cross, !0), D(u), D(o), D(i), Jr(z(i, 2), 17, () => V(t).links ?? [], Wr, (e, r, i) => {
						var a = pu(), o = I(a);
						J(o);
						var s = z(o, 2), c = I(s);
						c.disabled = i === 0, q(c, () => _.up, !0), D(c);
						var l = z(c, 2);
						q(l, () => _.down, !0), D(l);
						var u = z(l, 2);
						q(u, () => _.cross, !0), D(u), D(s);
						var d = z(s, 2), f = I(d);
						{
							let e = /* @__PURE__ */ A(() => V(r).page ?? "__href"), t = /* @__PURE__ */ A(() => Z("tip.linkTarget")), a = /* @__PURE__ */ A(() => [...V(k).pages.map((e) => [e.id, e.title]), ["__href", Z("opt.linkHref")]]);
							Q(f, {
								get value() {
									return V(e);
								},
								get title() {
									return V(t);
								},
								get options() {
									return V(a);
								},
								onchange: (e) => am(n, i, e)
							});
						}
						D(d);
						var p = z(d, 2), m = (e) => {
							var t = fu();
							J(t), B((e, n) => {
								Y(t, V(r).href ?? ""), X(t, "placeholder", e), X(t, "title", n);
							}, [() => Z("ph.hrefAnchor"), () => Z("tip.hrefAnchor")]), H("change", t, (e) => om(n, i, e.target.value)), W(e, t);
						};
						K(p, (e) => {
							V(r).page || e(m);
						}), D(a), B((e, n) => {
							Y(o, V(r).label), X(o, "title", e), l.disabled = i === V(t).links.length - 1, X(u, "title", n);
						}, [() => Z("tip.linkLabel"), () => Z("tip.removeLink")]), H("input", o, (e) => im(n, i, e.target.value)), H("click", c, () => rm(n, i, -1)), H("click", l, () => rm(n, i, 1)), H("click", u, () => nm(n, i)), W(e, a);
					}), B((e, r, i) => {
						Y(a, V(t).title), X(a, "title", e), X(s, "title", r), l.disabled = n === V(k).footer.columns.length - 1, X(u, "title", i);
					}, [
						() => Z("tip.footer.columnTitle"),
						() => Z("tip.footer.addLink"),
						() => Z("tip.footer.removeColumn")
					]), H("input", a, (e) => Wl(n, e.target.value)), H("click", s, () => Gl(n)), H("click", c, () => Ul(n, -1)), H("click", l, () => Ul(n, 1)), H("click", u, () => Bl(n)), W(e, r);
				});
				var ce = z(se, 2), le = R(ce, !0), ue = z(ce, 2), de = I(ue), fe = z(de);
				{
					let e = /* @__PURE__ */ A(() => V(k).footer?.columnsAlign ?? "left"), t = /* @__PURE__ */ A(() => [["left", Z("common.left")], ["center", Z("common.center")]]);
					Q(fe, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => Nl(e)
					});
				}
				D(ue), D(oe), D(re);
				var pe = z(re, 2), me = I(pe), he = R(me, !0), ge = z(me, 2), _e = I(ge);
				Jr(_e, 17, () => V(k).footer?.social ?? [], Wr, (e, t, n) => {
					var r = mp(), i = I(r), a = I(i);
					q(a, () => Ua(V(t).icon) || "", !0), D(a);
					var o = z(a, 2);
					{
						let e = /* @__PURE__ */ A(() => Z("blocks.icon"));
						Q(o, {
							get value() {
								return V(t).icon;
							},
							get title() {
								return V(e);
							},
							get options() {
								return fm;
							},
							onchange: (e) => um(n, e)
						});
					}
					D(i);
					var s = z(i, 2), c = I(s);
					c.disabled = n === 0, q(c, () => _.up, !0), D(c);
					var l = z(c, 2);
					q(l, () => _.down, !0), D(l);
					var u = z(l, 2);
					q(u, () => _.cross, !0), D(u), D(s);
					var d = z(s, 2);
					J(d), D(r), B((e, r) => {
						l.disabled = n === V(k).footer.social.length - 1, X(u, "title", e), Y(d, V(t).url), X(d, "placeholder", r);
					}, [() => Z("tip.removeLink"), () => Z("ph.hrefMailto")]), H("click", c, () => lm(n, -1)), H("click", l, () => lm(n, 1)), H("click", u, () => cm(n)), H("change", d, (e) => dm(n, e.target.value)), W(e, r);
				});
				var ve = z(_e, 2), ye = R(ve, !0);
				D(ge), D(pe);
				var be = z(pe, 2), xe = I(be), Se = R(xe, !0), Ce = z(xe, 2), we = I(Ce), Te = I(we);
				J(Te);
				var Ee = z(Te);
				D(we);
				var De = z(we, 2), ke = (e) => {
					let t = /* @__PURE__ */ A(() => V(k).footer.cta);
					var n = gp(), r = L(n), i = I(r), a = z(i);
					{
						let e = /* @__PURE__ */ A(() => V(t).kind ?? "button"), n = /* @__PURE__ */ A(() => [["button", Z("opt.cta.button")], ["newsletter", Z("opt.cta.newsletter")]]);
						Q(a, {
							get value() {
								return V(e);
							},
							get options() {
								return V(n);
							},
							onchange: (e) => Il("kind", e)
						});
					}
					D(r);
					var o = z(r, 2), s = I(o);
					J(s);
					var c = z(s);
					D(o);
					var l = z(o, 2), u = I(l), d = z(u);
					J(d), D(l);
					var f = z(l, 2), p = I(f), m = z(p);
					J(m), D(f);
					var h = z(f, 2), g = I(h), _ = z(g);
					J(_), D(h);
					var v = z(h, 2), y = (e) => {
						var n = hp(), r = L(n), i = I(r), a = z(i);
						{
							let e = /* @__PURE__ */ A(() => V(t).page ?? "__href"), n = /* @__PURE__ */ A(() => [...V(k).pages.map((e) => [e.id, e.title]), ["__href", Z("opt.linkHrefMailto")]]);
							Q(a, {
								get value() {
									return V(e);
								},
								get options() {
									return V(n);
								},
								onchange: (e) => Ll(e)
							});
						}
						D(r);
						var o = z(r, 2), s = (e) => {
							var n = bu();
							J(n), B((e, r) => {
								Y(n, V(t).href ?? ""), X(n, "placeholder", e), X(n, "title", r);
							}, [() => Z("ph.hrefMailtoAnchor"), () => Z("tip.hrefAnchor")]), H("change", n, (e) => Il("href", e.target.value)), W(e, n);
						};
						K(o, (e) => {
							V(t).page || e(s);
						}), B((e, t) => {
							X(r, "title", e), G(i, `${t ?? ""} `);
						}, [() => Z("tip.footer.ctaTarget"), () => Z("lbl.buttonTarget")]), W(e, n);
					}, b = (e) => {
						var n = ku(), r = L(n), i = I(r), a = z(i);
						J(a), D(r);
						var o = z(r, 2), s = I(o), c = z(s);
						J(c), D(o);
						var l = z(o, 2), u = I(l), d = z(u);
						J(d), D(l), B((e, n, f, p, m, h, g, _, v) => {
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
						]), H("change", a, (e) => Il("endpoint", e.target.value)), H("change", c, (e) => Il("recipient", e.target.value)), H("input", d, (e) => Il("success", e.target.value)), W(e, n);
					};
					K(v, (e) => {
						(V(t).kind ?? "button") === "button" ? e(y) : e(b, -1);
					}), B((e, n, a, v, y, b, x, S, C, w, T, ee) => {
						X(r, "title", e), G(i, `${n ?? ""} `), X(o, "title", a), Si(s, V(t).big === !0), G(c, ` ${v ?? ""}`), X(l, "title", y), G(u, `${b ?? ""} `), Y(d, V(t).heading ?? ""), X(d, "placeholder", x), X(f, "title", S), G(p, `${C ?? ""} `), Y(m, V(t).sub ?? ""), X(h, "title", w), G(g, `${T ?? ""} `), Y(_, V(t).label ?? ""), X(_, "placeholder", ee);
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
					]), H("change", s, (e) => Il("big", e.target.checked)), H("input", d, (e) => Il("heading", e.target.value)), H("input", m, (e) => Il("sub", e.target.value)), H("input", _, (e) => Il("label", e.target.value)), W(e, n);
				};
				K(De, (e) => {
					V(k).footer?.cta && e(ke);
				}), D(Ce), D(be);
				var Ae = z(be, 2), je = I(Ae), Me = R(je, !0), Ne = z(je, 2), Pe = I(Ne);
				r(Pe, () => "linkRow", () => V(k).footer?.linkRow ?? []);
				var Fe = z(Pe, 2), Ie = R(Fe, !0);
				D(Ne), D(Ae);
				var Le = z(Ae, 2), Re = I(Le), ze = R(Re, !0), Be = z(Re, 2), Ve = I(Be), O = (e) => {
					var t = cd(), n = L(t), r = I(n), i = z(r);
					{
						let e = /* @__PURE__ */ A(() => V(k).footer?.align ?? "left"), t = /* @__PURE__ */ A(() => [
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
							onchange: (e) => gl("footer", (t) => {
								t.align = e;
							})
						});
					}
					D(n), Oe(2), B((e, t) => {
						X(n, "title", e), G(r, `${t ?? ""} `);
					}, [() => Z("tip.footer.align"), () => Z("lbl.align")]), W(e, t);
				};
				K(Ve, (e) => {
					V(k).footer?.cta?.big !== !0 && e(O);
				});
				var He = z(Ve, 2), Ue = R(He, !0), We = z(He, 2);
				n(We, () => Rr, () => V(k).footer?.background?.layers ?? []), D(Be), D(Le);
				var Ge = z(Le, 2), Ke = I(Ge), qe = R(Ke, !0), Je = z(Ke, 2), Ye = I(Je), Xe = I(Ye), Ze = z(Xe);
				J(Ze), D(Ye);
				var Qe = z(Ye, 2), $e = R(Qe, !0), et = z(Qe, 2);
				r(et, () => "baseline", () => V(k).footer?.baseline ?? []);
				var tt = z(et, 2), nt = R(tt, !0);
				D(Je), D(Ge), D(t), B((e, t, n, r, s, c, l, u, f, p, m, h, _, v, te, ne, E, re, ie, oe, se, ce, fe, pe, me, ge, _e, ve, be, xe, Ce, De) => {
					X(i, "title", e), Si(a, t), G(o, ` ${n ?? ""}`), G(d, r), G(g, s), X(y, "title", c), G(b, `${l ?? ""} `), Y(x, V(k).footer?.brand?.title ?? ""), X(x, "placeholder", u), X(S, "title", f), G(C, `${p ?? ""} `), Y(w, V(k).footer?.brand?.tagline ?? ""), X(T, "title", m), G(ee, `${h ?? ""} `), G(ae, _), G(le, v), X(ue, "title", te), G(de, `${ne ?? ""} `), G(he, E), G(ye, re), G(Se, ie), X(we, "title", oe), Si(Te, se), G(Ee, ` ${ce ?? ""}`), G(Me, fe), G(Ie, pe), G(ze, me), G(Ue, ge), G(qe, _e), X(Ye, "title", ve), G(Xe, `${be ?? ""} `), Y(Ze, V(k).footer?.copyright ?? ""), X(Ze, "placeholder", xe), G($e, Ce), G(nt, De);
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
				]), H("change", a, (e) => gl("footer", (t) => {
					t.show = e.target.checked;
				})), H("input", x, (e) => _l("title", e.target.value)), H("input", w, (e) => _l("tagline", e.target.value)), H("click", ce, zl), H("click", ve, sm), H("change", Te, (e) => Pl(e.target.checked)), H("click", Fe, () => El("linkRow")), H("input", Ze, (e) => Sl(e.target.value)), H("click", tt, () => El("baseline")), W(e, t);
			}, re = (e) => {
				var t = Tp(), n = I(t), r = (e) => {
					var t = mu(), n = I(t), r = z(n);
					{
						let e = /* @__PURE__ */ A(() => V(Fs) ?? ""), t = /* @__PURE__ */ A(() => [["", Z("common.choose")], ...V(Ns).map((e) => [e, V(Ps)[e]?.name ?? e])]);
						Q(r, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => P(Fs, e || null, !0)
						});
					}
					D(t), B((e) => G(n, `${e ?? ""} `), [() => Z("blocks.collection")]), W(e, t);
				};
				K(n, (e) => {
					V(Ns).length && e(r);
				});
				var i = z(n, 2), a = (e) => {
					let t = /* @__PURE__ */ A(() => V(Ps)[V(Fs)]);
					var n = wp(), r = L(n), i = I(r), a = R(i, !0), o = z(i, 2), s = R(o, !0), c = z(o, 2), l = I(c), u = z(l);
					D(c);
					var d = z(c, 2);
					q(d, () => _.cross, !0), D(d), D(r);
					var f = z(r, 2);
					Jr(f, 19, () => V(t).entries, (e) => e.id, (e, n, r) => {
						var i = Cp(), a = I(i), o = R(a), s = z(a, 2), c = I(s), l = I(c);
						J(l);
						var u = z(l, 2), d = I(u);
						q(d, () => _.up, !0), D(d);
						var f = z(d, 2);
						q(f, () => _.down, !0), D(f);
						var p = z(f, 2);
						q(p, () => _.cross, !0), D(p), D(u), D(c);
						var m = z(c, 2), h = (e) => {
							var t = vp(), r = I(t), i = z(r);
							J(i), D(t), B((e) => {
								G(r, `${e ?? ""} `), Y(i, V(n).date ?? "");
							}, [() => Z("lbl.date")]), H("change", i, (e) => vc(V(Fs), V(n).id, "date", e.target.value)), W(e, t);
						};
						K(m, (e) => {
							V(t).kind !== "products" && e(h);
						});
						var g = z(m, 2);
						ut(g);
						var v = z(g, 2), y = (e) => {
							var t = vu(), r = I(t), i = z(r);
							J(i), D(t), B((e, t) => {
								G(r, `${e ?? ""} `), Y(i, V(n).href ?? ""), X(i, "placeholder", t);
							}, [() => Z("lbl.link"), () => Z("ph.collections.href")]), H("change", i, (e) => vc(V(Fs), V(n).id, "href", e.target.value)), W(e, t);
						};
						K(v, (e) => {
							V(t).kind !== "products" && e(y);
						});
						var b = z(v, 2), x = I(b), S = I(x), C = z(S);
						D(x);
						var w = z(x, 2), T = (e) => {
							var t = yp(), r = L(t), i = z(r, 2);
							q(i, () => _.cross, !0), D(i), B((e) => {
								X(r, "src", V(n).image), X(i, "title", e);
							}, [() => Z("tip.removeImage")]), H("click", i, () => vc(V(Fs), V(n).id, "image", "")), W(e, t);
						};
						K(w, (e) => {
							V(n).image && e(T);
						}), D(b);
						var ee = z(b, 2), te = (e) => {
							var t = Sp(), r = L(t), i = I(r), a = z(i);
							J(a), D(r);
							var o = z(r, 2), s = I(o), c = z(s);
							J(c), D(o);
							var l = z(o, 2), u = I(l), d = z(u);
							J(d), D(l);
							var f = z(l, 2), p = I(f), m = z(p);
							J(m), D(f);
							var h = z(f, 2);
							Jr(h, 17, () => V(n).colors ?? [], Wr, (e, t, r) => {
								var i = xp(), a = I(i);
								J(a);
								var o = z(a, 2), s = I(o), c = z(s);
								D(o);
								var l = z(o, 2), u = (e) => {
									var n = bp();
									B(() => X(n, "src", V(t).image)), W(e, n);
								};
								K(l, (e) => {
									V(t).image && e(u);
								});
								var d = z(l, 2);
								q(d, () => _.cross, !0), D(d), D(i), B((e, n) => {
									Y(a, V(t).name), X(a, "placeholder", e), G(s, `${n ?? ""} `);
								}, [() => Z("ph.colorName"), () => V(t).image ? Z("ui.changeImage") : Z("ui.addImage")]), H("change", a, (e) => wc(V(Fs), V(n).id, r, "name", e.target.value)), H("change", c, (e) => Tc(V(Fs), V(n).id, r, e)), H("click", d, () => Ec(V(Fs), V(n).id, r)), W(e, i);
							});
							var g = z(h, 2), v = R(g, !0);
							B((e, t, r, h, _, y, b, x, S, C, w) => {
								G(i, `${e ?? ""} `), Y(a, V(n).price ?? ""), X(o, "title", t), G(s, `${r ?? ""} `), Y(c, V(n).memberPrice ?? ""), X(l, "title", h), G(u, `${_ ?? ""} `), Y(d, V(n).badge ?? ""), X(f, "title", y), G(p, `${b ?? ""} `), Y(m, x), X(m, "placeholder", S), X(g, "title", C), G(v, w);
							}, [
								() => Z("lbl.price"),
								() => Z("tip.entry.memberPrice"),
								() => Z("lbl.memberPrice"),
								() => Z("tip.entry.badge"),
								() => Z("lbl.productBadge"),
								() => Z("tip.entry.sizes"),
								() => Z("lbl.sizes"),
								() => (V(n).sizes ?? []).join(", "),
								() => Z("ph.sizes"),
								() => Z("tip.entry.colors"),
								() => Z("ui.addColor")
							]), H("change", a, (e) => vc(V(Fs), V(n).id, "price", e.target.value === "" ? "" : Number(e.target.value))), H("change", c, (e) => vc(V(Fs), V(n).id, "memberPrice", e.target.value === "" ? "" : Number(e.target.value))), H("change", d, (e) => vc(V(Fs), V(n).id, "badge", e.target.value)), H("change", m, (e) => Sc(V(Fs), V(n).id, e.target.value)), H("click", g, () => Cc(V(Fs), V(n).id)), W(e, t);
						};
						K(ee, (e) => {
							V(t).kind === "products" && e(te);
						}), D(s), D(i), B((e, i, a, s, c) => {
							G(o, `${e ?? ""}${V(t).kind === "products" ? V(n).price == null ? "" : ` · ${V(n).price}` : V(n).date ? ` · ${V(n).date}` : ""}`), Y(l, V(n).title), X(l, "title", i), d.disabled = V(r) === 0, f.disabled = V(r) === V(t).entries.length - 1, X(p, "title", a), X(g, "placeholder", s), Y(g, V(n).text ?? ""), G(S, `${c ?? ""} `);
						}, [
							() => dc(V(n).title),
							() => Z("lbl.title"),
							() => Z("tip.collections.deleteEntry"),
							() => Z("ph.collections.text"),
							() => V(n).image ? Z("ui.changeImage") : Z("ui.addImage")
						]), H("change", l, (e) => vc(V(Fs), V(n).id, "title", e.target.value || Z("ui.untitled"))), H("click", d, () => yc(V(Fs), V(r), -1)), H("click", f, () => yc(V(Fs), V(r), 1)), H("click", p, () => bc(V(Fs), V(n).id)), H("change", g, (e) => vc(V(Fs), V(n).id, "text", e.target.value)), H("change", C, (e) => xc(V(Fs), V(n).id, e)), W(e, i);
					});
					var p = z(f, 2), m = (e) => {
						var t = _u(), n = R(t, !0);
						B((e) => G(n, e), [() => Z("hint.collections.empty")]), W(e, t);
					};
					K(p, (e) => {
						V(t).entries.length || e(m);
					}), Oe(2), B((e, t, n, r, i, u) => {
						G(a, e), X(o, "title", t), G(s, n), X(c, "title", r), G(l, `${i ?? ""} `), X(d, "title", u);
					}, [
						() => Z("ui.addEntry"),
						() => Z("tip.collections.exportCsv"),
						() => Z("ui.exportCsv"),
						() => Z("tip.collections.importCsv"),
						() => Z("ui.importCsv"),
						() => Z("tip.collections.deleteCollection")
					]), H("click", i, () => _c(V(Fs))), H("click", o, () => Oc(V(Fs))), H("change", u, (e) => jc(V(Fs), e)), H("click", d, () => gc(V(Fs))), W(e, n);
				};
				K(i, (e) => {
					V(Fs) && V(Ps)[V(Fs)] && e(a);
				});
				var o = z(i, 2), s = I(o), c = z(s);
				J(c), D(o);
				var l = z(o, 2), u = I(l);
				Q(z(u), {
					get value() {
						return V(Ls);
					},
					get options() {
						return Rs;
					},
					onchange: (e) => P(Ls, e, !0)
				}), D(l);
				var d = z(l, 2), f = R(d, !0);
				D(t), B((e, t, n, r, i) => {
					G(s, `${e ?? ""} `), X(c, "placeholder", t), G(u, `${n ?? ""} `), d.disabled = r, G(f, i);
				}, [
					() => Z("lbl.newCollectionName"),
					() => Z("ph.collections.name"),
					() => Z("common.type"),
					() => !V(Is).trim(),
					() => Z("ui.createCollection")
				]), H("keydown", c, (e) => e.key === "Enter" && mc()), Ei(c, () => V(Is), (e) => P(Is, e)), H("click", d, mc), W(e, t);
			}, ie = (e) => {
				var t = Mp(), n = I(t), r = (e) => {
					var t = _u(), n = R(t, !0);
					B((e) => G(n, e), [() => Z("hint.plugins.empty")]), W(e, t);
				}, i = /* @__PURE__ */ A(() => !$c().length);
				K(n, (e) => {
					V(i) && e(r);
				});
				var a = z(n, 2);
				Jr(a, 16, $c, (e) => e, (e, t) => {
					let n = /* @__PURE__ */ A(() => Kc[t]), r = /* @__PURE__ */ A(() => (V(Bc)?.enabled ?? []).includes(t));
					var i = Op();
					let a;
					var o = I(i), s = I(o), c = R(s, !0), l = z(s, 2), u = (e) => {
						var t = Ep(), r = R(t);
						B(() => G(r, `v${V(n).version ?? ""}`)), W(e, t);
					};
					K(l, (e) => {
						V(n)?.version && e(u);
					});
					var d = z(l, 2), f = I(d), p = I(f);
					J(p);
					var m = z(p);
					D(f);
					var h = z(f, 2);
					q(h, () => _.cross, !0), D(h), D(d), D(o);
					var g = z(o, 2), v = (e) => {
						var t = Dp(), r = R(t, !0);
						B((e) => G(r, e), [() => V(n).errors.join("; ")]), W(e, t);
					}, y = (e) => {
						var t = Dp(), r = R(t, !0);
						B((e) => G(r, e), [() => Z("plugin.engineMismatch", {
							required: V(n).requiresEngine,
							current: V(qc)
						})]), W(e, t);
					}, b = (e) => {
						var t = Dp(), r = R(t, !0);
						B((e) => G(r, e), [() => Z("plugin.cspNeeded", { list: al(V(n).csp).join(", ") })]), W(e, t);
					}, x = /* @__PURE__ */ A(() => V(n)?.csp && al(V(n).csp).length);
					K(g, (e) => {
						V(n)?.errors?.length ? e(v) : V(n) && !V(n).satisfied ? e(y, 1) : V(x) && e(b, 2);
					});
					var S = z(g, 2), C = (e) => {
						var t = _u(), r = R(t, !0);
						B((e) => G(r, e), [() => Z("plugin.languages", { list: V(n).languages.map((e) => e.name).join(", ") })]), W(e, t);
					};
					K(S, (e) => {
						V(n)?.languages?.length && e(C);
					}), D(i), B((e, t, o, s, l) => {
						a = hi(i, 1, "plugin-row svelte-1n46o8q", null, a, { "plugin-broken": V(n)?.errors?.length }), G(c, e), X(f, "title", t), Si(p, V(r)), p.disabled = o, G(m, ` ${s ?? ""}`), X(h, "title", l);
					}, [
						() => V(n)?.names?.[Wi()] ?? V(n)?.name ?? t,
						() => V(r) ? Z("tip.plugins.on") : Z("tip.plugins.off"),
						() => !!V(n)?.errors?.length,
						() => V(r) ? Z("ui.on") : Z("ui.off"),
						() => Z("tip.plugins.remove")
					]), H("change", p, (e) => dl(t, e.target.checked)), H("click", h, () => pl(t)), W(e, i);
				});
				var o = z(a, 2), s = (e) => {
					var t = Ap(), n = z(L(t), 2), r = R(n, !0);
					Jr(z(n, 2), 16, () => V(Xc), (e) => e, (e, t) => {
						var n = kp(), r = I(n), i = I(r), a = R(i, !0), o = z(i, 2), s = (e) => {
							var n = Ep(), r = R(n);
							B(() => G(r, `v${Kc[t].version ?? ""}`)), W(e, n);
						};
						K(o, (e) => {
							Kc[t]?.version && e(s);
						});
						var c = z(o, 2), l = I(c);
						q(l, () => _.right, !0), D(l), D(c), D(r), D(n), B((e, t) => {
							G(a, e), X(l, "title", t);
						}, [() => Kc[t]?.names?.[Wi()] ?? Kc[t]?.name ?? t, () => Z("tip.plugins.addFound")]), H("click", l, () => hl(t)), W(e, n);
					}), B((e) => G(r, e), [() => Z("hint.plugins.found")]), W(e, t);
				};
				K(o, (e) => {
					V(Xc).length && e(s);
				});
				var c = z(o, 2), l = (e) => {
					var t = Nr(), n = L(t), r = (e) => {
						var t = _u(), n = R(t, !0);
						B((e) => G(n, e), [() => Z("hint.plugins.autoDiscover")]), W(e, t);
					};
					K(n, (e) => {
						V(Xc).length || e(r);
					}), W(e, t);
				}, u = (e) => {
					var t = jp(), n = z(L(t), 2);
					J(n);
					var r = z(n, 2), i = R(r, !0), a = z(r, 2), o = (e) => {
						var t = Dp(), n = R(t, !0);
						B(() => G(n, V(Yc))), W(e, t);
					};
					K(a, (e) => {
						V(Yc) && e(o);
					}), B((e, t, a) => {
						X(n, "placeholder", e), r.disabled = t, G(i, a);
					}, [
						() => Z("ph.plugins.folder"),
						() => !V(Jc).trim(),
						() => Z("ui.addPlugin")
					]), H("keydown", n, (e) => e.key === "Enter" && ml()), Ei(n, () => V(Jc), (e) => P(Jc, e)), H("click", r, ml), W(e, t);
				};
				K(c, (e) => {
					V(Qc) === "ok" ? e(l) : e(u, -1);
				}), D(t), W(e, t);
			}, ae = (e) => {
				var t = lp(), n = I(t), r = (e) => {
					var t = _u(), n = R(t, !0);
					B((e) => G(n, e), [() => Z("hint.history.loading")]), W(e, t);
				}, i = (e) => {
					var t = pf(), n = L(t), r = (e) => {
						var t = _u(), n = R(t, !0);
						B(() => G(n, V(wi))), W(e, t);
					};
					K(n, (e) => {
						V(wi) && e(r);
					});
					var i = z(n, 2), a = (e) => {
						var t = Pp(), n = L(t), r = R(n, !0);
						Jr(z(n, 2), 19, () => V(Ci), (e) => e.sha, (e, t, n) => {
							var r = Np();
							let i;
							var a = I(r), o = R(a, !0), s = R(z(a, 2));
							D(r), B((e) => {
								i = hi(r, 1, "history-row svelte-1n46o8q", null, i, { head: V(n) === 0 }), X(a, "title", V(t).sha), G(o, V(t).message), G(s, `${V(t).author ?? ""}${e ?? ""}`);
							}, [() => V(t).date ? ` · ${Oi.format(new Date(V(t).date))}` : ""]), W(e, r);
						}), B((e, t) => {
							n.disabled = V(Ti) || !V(oe)?.allowed, X(n, "title", e), G(r, t);
						}, [() => V(oe)?.allowed ? Z("tip.history.revert") : Z("tip.history.needsAccess"), () => Z("ui.revertLast")]), H("click", n, ji), W(e, t);
					};
					K(i, (e) => {
						V(Ci).length > 0 && e(a);
					}), W(e, t);
				};
				K(n, (e) => {
					V(Ci) === null ? e(r) : e(i, -1);
				}), D(t), W(e, t);
			}, le = (e) => {
				var t = lp(), n = I(t), r = (e) => {
					var t = _u(), n = R(t, !0);
					B((e) => G(n, e), [() => Z("update.checking")]), W(e, t);
				}, i = (e) => {
					var t = Fp(), n = L(t), r = R(n, !0), i = z(n, 2), a = R(i, !0);
					B((e) => {
						G(r, V(Ii)), G(a, e);
					}, [() => Z("update.retry")]), H("click", i, zi), W(e, t);
				}, a = (e) => {
					var t = Kp(), n = L(t), r = I(n), i = R(r, !0), a = z(r, 2), o = (e) => {
						var t = Ip(), n = L(t);
						q(n, () => _.right, !0), D(n);
						var r = R(z(n, 2), !0);
						B(() => G(r, V(Fi).target)), W(e, t);
					};
					K(a, (e) => {
						V(Fi).upToDate || e(o);
					}), D(n);
					var s = z(n, 2), c = (e) => {
						var t = _u(), n = R(t, !0);
						B((e) => G(n, e), [() => Z("update.upToDate")]), W(e, t);
					}, l = (e) => {
						var t = Gp(), n = L(t), r = R(n, !0), i = z(n, 2), a = (e) => {
							var t = Lp(), n = I(t), r = R(n, !0), i = z(n, 2), a = R(I(i), !0);
							D(i), D(t), B((e) => {
								G(r, e), G(a, V(Fi).notes);
							}, [() => Z("update.aboutVersion", { target: V(Fi).target })]), W(e, t);
						};
						K(i, (e) => {
							V(Fi).notes && e(a);
						});
						var o = z(i, 2), s = (e) => {
							var t = Rp(), n = I(t), r = I(n);
							q(r, () => _.warn, !0), D(r);
							var i = z(r);
							D(n);
							var a = z(n, 2), o = R(I(a), !0);
							D(a), D(t), B((e, t) => {
								X(n, "title", e), G(i, ` ${t ?? ""}`), G(o, V(Fi).headers.upstream);
							}, [() => Z("update.headersManual"), () => Z("update.headersTitle")]), W(e, t);
						};
						K(o, (e) => {
							V(Fi).headers?.upstream && e(s);
						});
						var c = z(o, 2);
						Jr(c, 17, () => V(Fi).changes.filter((e) => e.atom && e.conflict), (e) => e.path, (e, t) => {
							var n = Bp(), r = I(n), i = R(r, !0), a = z(r, 2), o = I(a), s = (e) => {
								var t = zp(), n = R(t, !0);
								B((e) => G(n, e), [() => Z("update.actionDelete")]), W(e, t);
							};
							K(o, (e) => {
								V(t).action === "delete" && e(s);
							});
							var c = z(o, 2);
							q(c, () => _.warn, !0), D(c), D(a), D(n), B((e) => {
								X(r, "title", V(t).path), G(i, V(t).path), X(c, "title", e);
							}, [() => Z(`update.conflict.${V(t).conflict}`)]), W(e, n);
						});
						var l = z(c, 2), u = I(l), d = R(u), f = z(u, 2);
						Jr(f, 21, () => V(Fi).changes.filter((e) => e.atom && !e.conflict), (e) => e.path, (e, t) => {
							var n = Vp(), r = I(n), i = R(r, !0), a = z(r, 2), o = (e) => {
								var t = zp(), n = R(t, !0);
								B((e) => G(n, e), [() => Z("update.actionDelete")]), W(e, t);
							};
							K(a, (e) => {
								V(t).action === "delete" && e(o);
							}), D(n), B(() => {
								X(r, "title", V(t).path), G(i, V(t).path);
							}), W(e, n);
						}), D(f), D(l);
						var p = z(l, 2), m = (e) => {
							var t = Wp(), n = L(t), r = I(n), i = R(r, !0), a = R(z(r, 2), !0);
							D(n), Jr(z(n, 2), 17, () => V(Fi).changes.filter((e) => !e.atom), (e) => e.path, (e, t) => {
								var n = Up(), r = I(n);
								let i;
								var a = R(r, !0), o = z(r, 2), s = I(o), c = (e) => {
									var t = zp(), n = R(t, !0);
									B((e) => G(n, e), [() => Z("update.actionDelete")]), W(e, t);
								};
								K(s, (e) => {
									V(t).action === "delete" && e(c);
								});
								var l = z(s, 2), u = (e) => {
									var n = Hp();
									q(n, () => _.warn, !0), D(n), B((e) => X(n, "title", e), [() => Z(`update.conflict.${V(t).conflict}`)]), W(e, n);
								};
								K(l, (e) => {
									V(t).conflict && e(u);
								});
								var d = z(l, 2);
								J(d), D(o), D(n), B((e, n, o, s) => {
									i = hi(r, 1, "update-path svelte-1n46o8q", null, i, { skipped: e }), X(r, "title", V(t).path), G(a, V(t).path), Si(d, n), X(d, "title", o), X(d, "aria-label", s);
								}, [
									() => V(Ri).has(V(t).path),
									() => V(Ri).has(V(t).path),
									() => Z("update.keepMine.title"),
									() => Z("update.keepMine")
								]), H("change", d, () => Bi(V(t).path)), W(e, n);
							}), B((e, t) => {
								G(i, e), G(a, t);
							}, [() => Z("update.optionalTitle"), () => Z("update.keepMine")]), W(e, t);
						}, h = /* @__PURE__ */ A(() => V(Fi).changes.some((e) => !e.atom));
						K(p, (e) => {
							V(h) && e(m);
						});
						var g = z(p, 2), v = R(g, !0);
						B((e, t, n, i, a, o) => {
							G(r, e), X(u, "title", t), G(d, `${n ?? ""} · ${i ?? ""}`), g.disabled = V(Li) || !V(oe)?.allowed, X(g, "title", a), G(v, o);
						}, [
							() => Z("update.summary", {
								writes: V(Fi).changes.filter((e) => e.action === "write").length,
								deletes: V(Fi).changes.filter((e) => e.action === "delete").length
							}),
							() => Z("update.atomGroup.title"),
							() => Z("update.atomTitle"),
							() => V(Fi).changes.filter((e) => e.atom).length,
							() => V(oe)?.allowed ? Z("update.run.title") : Z("tip.history.needsAccess"),
							() => Z("update.run", { target: V(Fi).target })
						]), H("click", g, Vi), W(e, t);
					};
					K(s, (e) => {
						V(Fi).upToDate ? e(c) : e(l, -1);
					}), B((e) => G(i, e), [() => Z("update.current", { version: V(Fi).current })]), W(e, t);
				};
				K(n, (e) => {
					V(Li) && !V(Fi) ? e(r) : V(Ii) ? e(i, 1) : V(Fi) && e(a, 2);
				}), D(t), W(e, t);
			};
			K(y, (e) => {
				V(j) === "pages" ? e(b) : V(j) === "nav" ? e(x, 1) : V(j) === "site" ? e(C, 2) : V(j) === "theme" ? e(T, 3) : V(j) === "blocks" ? e(ee, 4) : V(j) === "grid" ? e(te, 5) : V(j) === "properties" ? e(ne, 6) : V(j) === "footer" ? e(E, 7) : V(j) === "collections" ? e(re, 8) : V(j) === "plugins" ? e(ie, 9) : V(j) === "history" ? e(ae, 10) : V(j) === "update" && e(le, 11);
			}), D(t), Ai(t, (e) => P(zm, e), () => V(zm)), B((e) => {
				i = hi(t, 1, "panel svelte-1n46o8q", null, i, { hidden: !V(ce) }), X(l, "title", e), G(m, jt[V(j)]);
			}, [() => Mt[V(j)]?.map((e) => Z(e)).join("\n")]), W(e, t);
		};
		K(T, (e) => {
			V(j) && e(ee);
		});
		var te = z(T, 2);
		let ne;
		var E = I(te), re = I(E);
		Ai(re, (e) => P(ae, e), () => V(ae)), D(E), D(te), Ai(te, (e) => P(xe, e), () => V(xe)), D(t), B((e, t) => {
			o = hi(i, 1, "rail svelte-1n46o8q", null, o, { hidden: !V(ce) }), y = hi(g, 1, "rail-gear svelte-1n46o8q", null, y, { active: V($i) }), X(g, "title", e), ne = hi(te, 1, "frame-wrap svelte-1n46o8q", null, ne, {
				mobile: V(be) === "mobile",
				pan: V(Fe),
				fold: V(ke) > 0
			}), _i(E, `width:${V(Ne) ?? ""}px; height:${V(Pe) ?? ""}px`), X(re, "title", t), X(re, "src", `/?page=${V(w)}&preview=1`), _i(re, `width:${V(De) ?? ""}px; height:${V(Me) ?? ""}px; transform:scale(${V(Ae) ?? ""}); transform-origin:top left`);
		}, [() => Z("settings.title"), () => Z("ui.previewTitle")]), H("click", g, () => P($i, !V($i))), Cr("load", re, Ji), xr(re), W(e, t);
	}, Cg = (e) => {
		var t = Yp(), n = R(t, !0);
		B((e) => G(n, e), [() => Z("ui.loading")]), W(e, t);
	};
	K(xg, (e) => {
		V(C) ? e(Sg) : e(Cg, -1);
	});
	var wg = z(xg, 2), Tg = (e) => {
		$o(e, {
			get image() {
				return V(Ja);
			},
			onapply: Xa,
			oncancel: () => P(Ja, null)
		});
	};
	K(wg, (e) => {
		V(Ja) && e(Tg);
	});
	var Eg = z(wg, 2), Dg = (e) => {
		var t = Zp(), n = I(t), r = I(n), i = R(r, !0), a = z(r, 2);
		Jr(a, 16, () => V(mt).lines, (e) => e, (e, t) => {
			var n = Xp(), r = R(n, !0);
			B(() => G(r, t)), W(e, n);
		});
		var o = z(a, 2), s = (e) => {
			var t = bu();
			J(t), lt(t, !0), B(() => X(t, "placeholder", V(mt).placeholder)), H("keydown", t, (e) => e.key === "Enter" && V(mt).value.trim() && _t(!0)), Ei(t, () => V(mt).value, (e) => V(mt).value = e), W(e, t);
		};
		K(o, (e) => {
			V(mt).prompt && e(s);
		});
		var c = z(o, 2), l = I(c), u = R(l, !0), d = z(l, 2), f = R(d, !0);
		D(c), D(n), D(t), B(() => {
			G(i, V(mt).title), G(u, V(mt).cancelLabel), G(f, V(mt).okLabel);
		}), H("pointerdown", t, (e) => vt = e.target === e.currentTarget), H("click", t, (e) => vt && e.target === e.currentTarget && _t(!1)), H("click", l, () => _t(!1)), H("click", d, () => _t(!0)), W(e, t);
	};
	K(Eg, (e) => {
		V(mt) && e(Dg);
	});
	var Og = z(Eg, 2), kg = (e) => {
		var t = Qp(), n = I(t), r = I(n), i = R(r, !0), a = z(r, 2), o = R(a, !0), s = z(a, 2), c = I(s), l = z(c);
		J(l), D(s);
		var u = z(s, 2), d = I(u), f = z(d);
		{
			let e = /* @__PURE__ */ A(() => Z("setup.accentPick"));
			ha(f, {
				get value() {
					return V(xt);
				},
				get label() {
					return V(e);
				},
				onchange: (e) => P(xt, e, !0)
			});
		}
		D(u);
		var p = z(u, 2), m = I(p), h = z(m);
		{
			let e = /* @__PURE__ */ A(() => Z("setup.bgLabel"));
			ha(h, {
				get value() {
					return V(St);
				},
				get label() {
					return V(e);
				},
				onchange: (e) => P(St, e, !0)
			});
		}
		D(p);
		var g = z(p, 2), _ = R(g, !0), v = z(g, 2), y = I(v), b = R(y, !0), x = z(y, 2), S = R(x, !0);
		D(v), D(n), D(t), B((e, t, n, r, a, s, u, f, p, h) => {
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
			() => !V(bt).trim(),
			() => Z("setup.start")
		]), H("keydown", l, (e) => e.key === "Enter" && wt()), Ei(l, () => V(bt), (e) => P(bt, e)), H("click", y, Ct), H("click", x, wt), W(e, t);
	};
	K(Og, (e) => {
		V(yt) && e(kg);
	});
	var Ag = z(Og, 2), jg = (e) => {
		var t = $p();
		let n;
		var r = I(t), i = R(r, !0), a = z(r, 2);
		D(t), B((e) => {
			n = hi(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: V(te) === "ok",
				error: V(te) === "error"
			}), G(i, V(ee)), X(a, "title", e);
		}, [() => Z("ui.close")]), H("click", a, () => E("")), W(e, t);
	};
	K(Ag, (e) => {
		V(ee) && e(jg);
	}), D(ag);
	var Mg = z(ag, 2), Ng = (e) => {
		var t = em(), n = I(t), r = I(n), i = R(r, !0), o = z(r, 2);
		q(o, () => _.cross, !0), D(o), D(n);
		var s = z(n, 2), c = I(s);
		a(c), D(s), D(t), B((e, n) => {
			_i(t, `left: ${V(Wt).left ?? ""}px; top: ${V(Wt).top ?? ""}px`), G(i, e), X(o, "title", n);
		}, [() => Z("blocks.suffix", { label: In[V(M).type] ?? V(M).type }), () => Z("tip.closeEsc")]), H("click", o, () => P(Wt, null)), W(e, t);
	};
	K(Mg, (e) => {
		V(Wt) && V(M) && e(Ng);
	}), B(() => lg = hi(cg, 1, "topbar svelte-1n46o8q", null, lg, { hidden: !V(ce) })), W(e, ig), Ye();
}
//#endregion
//#region src/main.js
wr([
	"click",
	"input",
	"pointerdown",
	"change",
	"keydown"
]), document.documentElement.lang = await qi();
var rm = zr(nm, { target: document.getElementById("urd-admin") });
//#endregion
export { rm as default };
