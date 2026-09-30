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
var g = 1024, _ = 2048, v = 4096, y = 8192, b = 16384, x = 32768, S = 1 << 25, C = 65536, w = 1 << 19, ee = 1 << 20, te = 1 << 25, ne = 65536, re = 1 << 21, ie = 1 << 22, T = 1 << 23, ae = Symbol("$state"), oe = Symbol("component"), se = Symbol("legacy props"), ce = Symbol(""), E = Symbol("attributes"), le = Symbol("class"), ue = Symbol("style"), de = Symbol("text"), fe = Symbol("form reset"), pe = new class extends Error {
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
	return Ee(/* @__PURE__ */ ln(Te));
}
function D(e) {
	if (Ce) {
		if (/* @__PURE__ */ ln(Te) !== null) throw xe(), he;
		Te = e;
	}
}
function Oe(e = 1) {
	if (Ce) {
		for (var t = e, n = Te; t--;) n = /* @__PURE__ */ ln(n);
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
		var i = /* @__PURE__ */ ln(n);
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
function He() {
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
var Ge = [];
function Ke(e, t = !1, n = !1) {
	return qe(e, /* @__PURE__ */ new Map(), "", Ge, null, n);
}
function qe(t, n, r, i, a = null, o = !1) {
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
				d in t && (u[d] = qe(f, n, r, i, null, o));
			}
			return u;
		}
		if (l(t) === s) {
			u = {}, n.set(t, u), a !== null && n.set(a, u);
			for (var p of Object.keys(t)) u[p] = qe(t[p], n, r, i, null, o);
			return u;
		}
		if (t instanceof Date) return t.getTime(), structuredClone(t);
		if (typeof t.toJSON == "function" && !o) return qe(t.toJSON(), n, r, i, t);
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
var Je = null;
function O(e) {
	Je = e;
}
function Ye(e, t = !1, n) {
	Je = {
		p: Je,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: qn,
		l: null
	};
}
function Xe(e) {
	var t = Je, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) Sn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, Je = t.p, Ze(e);
}
function Ze(e = {}) {
	return i(e, oe, { value: !0 }), e;
}
function Qe() {
	return !0;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var k = [];
function $e() {
	var e = k;
	k = [], p(e);
}
function et(e) {
	if (k.length === 0 && !Nt) {
		var t = k;
		queueMicrotask(() => {
			t === k && $e();
		});
	}
	k.push(e);
}
function tt() {
	for (; k.length > 0;) $e();
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
		e.autofocus = !0, et(() => {
			document.activeElement === t && e.focus();
		});
	}
}
function ut(e) {
	Ce && /* @__PURE__ */ cn(e) !== null && un(e);
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
	var t = Wn, n = qn;
	Kn(null), Jn(null);
	try {
		return e();
	} finally {
		Kn(t), Jn(n);
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
	let i = Qe() ? yt : St;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = qn, c = gt(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				hn(e, s);
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
		Promise.all(n.map((e) => /* @__PURE__ */ xt(e))).then(u).catch((e) => hn(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), _t();
	}) : f();
}
function gt() {
	var e = qn, t = Wn, n = Je, r = kt;
	return function(i = !0) {
		Jn(e), Kn(t), O(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function _t(e = !0) {
	Jn(null), Kn(null), O(null), e && kt?.deactivate();
}
function vt() {
	var e = qn, t = e.b, n = kt, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function yt(e) {
	var t = 2 | _;
	return qn !== null && (qn.f |= w), {
		ctx: Je,
		deps: null,
		effects: null,
		equals: je,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: ge,
		wv: 0,
		parent: qn,
		ac: null
	};
}
var bt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function xt(e, t, n) {
	let r = qn;
	r === null && Pe();
	var i = void 0, a = Yt(ge), o = !Wn, s = /* @__PURE__ */ new Set();
	return Tn(() => {
		var t = qn, n = m();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== pe && n.reject(e);
			}).finally(_t);
		} catch (e) {
			n.reject(e), _t();
		}
		var c = kt;
		if (o) {
			if (t.f & 32768) var l = vt();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(bt);
			else for (let e of s.values()) e.reject(bt);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== bt && (c.activate(), t ? (a.f |= T, Zt(a, t)) : (a.f & 8388608 && (a.f ^= T), Zt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), bn(() => {
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
	return Xn(t), t;
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
		for (var n = 0; n < t.length; n += 1) Mn(t[n]);
	}
}
function wt(e) {
	var t, n = qn, r = e.parent;
	if (!Hn && r !== null && e.v !== ge && r.f & 24576) return be(), e.v;
	Jn(r);
	try {
		e.f &= ~ne, Ct(e), t = cr(e);
	} finally {
		Jn(n);
	}
	return t;
}
function Tt(e) {
	var t = wt(e);
	if (!e.equals(t) && (e.wv = ar(), (!kt?.is_fork || e.deps === null) && (kt === null ? e.v = t : (kt.capture(e, t, !0), At?.capture(e, t, !0)), e.deps === null))) {
		rt(e, g);
		return;
	}
	Hn || (jt === null ? it(e) : (yn() || kt?.is_fork) && jt.set(e, t));
}
function Et(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && pt(() => {
		t.ac.abort(pe), t.ac = null;
	}), t.fn !== null && (t.teardown = f), dr(t, 0), An(t));
}
function Dt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && fr(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var Ot = null, kt = null, At = null, jt = null, Mt = null, Nt = !1, Pt = !1, Ft = null, It = null, Lt = 0, Rt = 1, zt = class e {
	id = Rt++;
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
		this.#e = !0, Lt++ > 1e3 && (this.#x(), Vt());
		for (let e of this.#u) this.#d.delete(e), rt(e, _), this.schedule(e);
		for (let e of this.#d) rt(e, v), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = Ft = [], r = [], i = It = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw Kt(e), this.#h() || this.discard(), t;
		}
		if (kt = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (Ft = null, It = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) Gt(e, t);
			i.length > 0 && kt.#g();
			return;
		}
		let o = this.#v();
		if (o) {
			this.#b(r), this.#b(n), o.#y(this);
			return;
		}
		this.#u.clear(), this.#d.clear();
		for (let e of this.#r) e(this);
		this.#r.clear(), At = this, Ut(r), Ut(n), At = null, this.#s?.resolve();
		var s = kt;
		if (this.#a === 0 && (this.#c.length === 0 || s !== null) && this.#x(), this.#c.length > 0) {
			if (s !== null) {
				let e = s;
				e.#c.push(...this.#c.filter((t) => !e.#c.includes(t)));
			} else s = this;
		}
		s !== null && (j.clear(), s.#g());
	}
	#_(e, t, n) {
		e.f ^= g;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
				a ? r.f ^= g : i & 4 ? t.push(r) : or(r) && (i & 16 && this.#d.add(r), fr(r));
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
		this.oncommit(() => e.discard()), e.#x(), kt = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) ot(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== ge && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), jt?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		kt = this;
	}
	deactivate() {
		kt = null, jt = null;
	}
	flush() {
		try {
			Pt = !0, kt = this, this.#g();
		} finally {
			Lt = 0, Mt = null, Ft = null, It = null, Pt = !1, kt = null, jt = null, j.clear();
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
		if (kt === null) {
			let t = kt = new e();
			!Pt && !Nt && et(() => {
				t.#e || t.flush();
			});
		}
		return kt;
	}
	apply() {
		jt = null;
	}
	schedule(e) {
		if (Mt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if (Ft !== null && t === qn && (Wn === null || !(Wn.f & 2))) return;
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
function Bt(e) {
	var t = Nt;
	Nt = !0;
	try {
		var n;
		for (e && (kt !== null && !kt.is_fork && kt.flush(), n = e());;) {
			if (tt(), kt === null) return n;
			kt.flush();
		}
	} finally {
		Nt = t;
	}
}
function Vt() {
	try {
		ze();
	} catch (e) {
		hn(e, Mt);
	}
}
var Ht = null;
function Ut(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && or(r) && (Ht = /* @__PURE__ */ new Set(), fr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Pn(r), Ht?.size > 0)) {
				j.clear();
				for (let e of Ht) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Ht.has(n) && (Ht.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || fr(n);
					}
				}
				Ht.clear();
			}
		}
		Ht = null;
	}
}
function Wt(e) {
	kt.schedule(e);
}
function Gt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), rt(e, g);
		for (var n = e.first; n !== null;) Gt(n, t), n = n.next;
	}
}
function Kt(e) {
	rt(e, g);
	for (var t = e.first; t !== null;) Kt(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var qt = /* @__PURE__ */ new Set(), j = /* @__PURE__ */ new Map(), Jt = !1;
function Yt(e, t) {
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
function M(e, t) {
	let n = Yt(e, t);
	return Xn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Xt(e, t = !1, n = !0) {
	let r = Yt(e);
	return t || (r.equals = Ne), r;
}
function N(e, t, n = !1) {
	return Wn !== null && (!Gn || Wn.f & 131072) && Qe() && Wn.f & 4325394 && (Yn === null || !Yn.has(e)) && Ue(), Zt(e, n ? tn(t) : t, It);
}
function Zt(e, t, n = null) {
	if (!e.equals(t)) {
		Hn ? j.set(e, t) : j.has(e) || j.set(e, e.v);
		var r = zt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && wt(t), jt === null && it(t);
		}
		e.wv = ar(), en(e, _, n), Qe() && qn !== null && qn.f & 1024 && !(qn.f & 96) && ($n === null ? er([e]) : $n.push(e)), !r.is_fork && qt.size > 0 && !Jt && Qt();
	}
	return t;
}
function Qt() {
	Jt = !1;
	for (let e of qt) {
		e.f & 1024 && rt(e, v);
		let t;
		try {
			t = or(e);
		} catch {
			t = !0;
		}
		t && fr(e);
	}
	qt.clear();
}
function $t(e) {
	N(e, e.v + 1);
}
function en(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Qe(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === qn)) {
			var l = (c & _) === 0;
			if (l && rt(s, t), c & 131072) qt.add(s);
			else if (c & 2) {
				var u = s;
				jt?.delete(u), c & 65536 || (c & 512 && (qn === null || !(qn.f & 2097152)) && (s.f |= ne), en(u, v, n));
			} else if (l) {
				var d = s;
				c & 16 && Ht !== null && Ht.add(d), n === null ? Wt(d) : n.push(d);
			}
		}
	}
}
function tn(t) {
	if (typeof t != "object" || !t || ae in t || oe in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ M(0), u = null, d = rr, f = (e) => {
		if (rr === d) return e();
		var t = Wn, n = rr;
		Kn(null), ir(d);
		var r = e();
		return Kn(t), ir(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ M(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && Ve();
			var i = r.get(t);
			return i === void 0 ? f(() => {
				var e = /* @__PURE__ */ M(n.value, u);
				return r.set(t, e), e;
			}) : N(i, n.value, !0), !0;
		},
		deleteProperty(e, t) {
			var n = r.get(t);
			if (n === void 0) {
				if (t in e) {
					let e = f(() => /* @__PURE__ */ M(ge, u));
					r.set(t, e), $t(o);
				}
			} else N(n, ge), $t(o);
			return !0;
		},
		get(e, n, i) {
			if (n === ae) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ M(tn(s ? e[n] : ge), u)), r.set(n, o)), o !== void 0) {
				var c = B(o);
				return c === ge ? void 0 : c;
			}
			return Reflect.get(e, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			var n = Reflect.getOwnPropertyDescriptor(e, t);
			if (n && "value" in n) {
				var i = r.get(t);
				i && (n.value = B(i));
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
			if (t === ae) return !0;
			var n = r.get(t), i = n !== void 0 && n.v !== ge || Reflect.has(e, t);
			return (n !== void 0 || qn !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ M(i ? tn(e[t]) : ge, u)), r.set(t, n)), B(n) === ge) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ M(ge, u)), r.set(d + "", p)) : N(p, ge);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ M(void 0, u)), N(c, tn(n)), r.set(t, c));
			else {
				l = c.v !== ge;
				var m = f(() => tn(n));
				N(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && N(g, _ + 1);
				}
				$t(o);
			}
			return !0;
		},
		ownKeys(e) {
			B(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== ge;
			});
			for (var [n, i] of r) i.v !== ge && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			He();
		}
	});
}
var nn, rn, an, P;
function on() {
	if (nn === void 0) {
		nn = window, rn = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		an = a(t, "firstChild").get, P = a(t, "nextSibling").get, u(e) && (e[le] = void 0, e[E] = null, e[ue] = void 0, e.__e = void 0), u(n) && (n[de] = void 0);
	}
}
function sn(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function cn(e) {
	return an.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function ln(e) {
	return P.call(e);
}
function F(e, t) {
	if (!Ce) return /* @__PURE__ */ cn(e);
	var n = /* @__PURE__ */ cn(Te);
	if (n === null) n = Te.appendChild(sn());
	else if (t && n.nodeType !== 3) {
		var r = sn();
		return n?.before(r), Ee(r), r;
	}
	return t && pn(n), Ee(n), n;
}
function I(e, t = !1) {
	if (!Ce) {
		var n = /* @__PURE__ */ cn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ ln(n) : n;
	}
	if (t) {
		if (Te?.nodeType !== 3) {
			var r = sn();
			return Te?.before(r), Ee(r), r;
		}
		pn(Te);
	}
	return Te;
}
function L(e, t = !1) {
	if (!Ce) return /* @__PURE__ */ cn(e);
	var n = F(e, t);
	return D(e), n;
}
function R(e, t = 1, n = !1) {
	let r = Ce ? Te : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ ln(r);
	if (!Ce) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = sn();
			return r === null ? i?.after(a) : r.before(a), Ee(a), a;
		}
		pn(r);
	}
	return Ee(r), r;
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
function mn(e) {
	var t = qn;
	if (t === null) return Wn.f |= T, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	hn(e, t);
}
function hn(e, t) {
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
function gn(e) {
	qn === null && (Wn === null && Re(e), Le()), Hn && Ie(e);
}
function _n(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function vn(e, t) {
	var n = qn;
	n !== null && n.f & 8192 && (e |= y);
	var r = {
		ctx: Je,
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
	kt?.register_created_effect(r);
	var i = r;
	if (e & 4) Ft === null ? zt.ensure().schedule(r) : Ft.push(r);
	else if (t !== null) {
		try {
			fr(r);
		} catch (e) {
			throw Mn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= C));
	}
	if (i !== null && (i.parent = n, n !== null && _n(i, n), Wn !== null && Wn.f & 2 && !(e & 64))) {
		var a = Wn;
		(a.effects ??= []).push(i);
	}
	return r;
}
function yn() {
	return Wn !== null && !Gn;
}
function bn(e) {
	let t = vn(8, null);
	return rt(t, g), t.teardown = e, t;
}
function xn(e) {
	gn("$effect");
	var t = qn.f;
	if (!Wn && t & 32 && Je !== null && !Je.i) {
		var n = Je;
		(n.e ??= []).push(e);
	} else return Sn(e);
}
function Sn(e) {
	return vn(4 | ee, e);
}
function Cn(e) {
	zt.ensure();
	let t = vn(64 | w, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Fn(t, () => {
			Mn(t), n(void 0);
		}) : (Mn(t), n(void 0));
	});
}
function wn(e) {
	return vn(4, e);
}
function Tn(e) {
	return vn(ie | w, e);
}
function En(e, t = 0) {
	return vn(8 | t, e);
}
function z(e, t = [], n = [], r = []) {
	ht(r, t, n, (t) => {
		vn(8, () => {
			e(...t.map(B));
		});
	});
}
function Dn(e, t = 0) {
	return vn(16 | t, e);
}
function On(e) {
	return vn(32 | w, e);
}
function kn(e) {
	var t = e.teardown;
	if (t !== null) {
		let n = Hn, r = Wn;
		Un(!0), Kn(null);
		try {
			t.call(null);
		} catch (t) {
			hn(t, e.parent);
		} finally {
			Un(n), Kn(r);
		}
	}
}
function An(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && pt(() => {
			e.abort(pe);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : Mn(n, t), n = r;
	}
}
function jn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || Mn(t), t = n;
	}
}
function Mn(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Nn(e.nodes.start, e.nodes.end), n = !0), e.f |= S, An(e, t && !n), dr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	kn(e), e.f ^= S, e.f |= b;
	var i = e.parent;
	i !== null && i.first !== null && Pn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Nn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ ln(e);
		e.remove(), e = n;
	}
}
function Pn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Fn(e, t, n = !0) {
	var r = [];
	e.f |= 256, In(e, r, !0);
	var i = () => {
		n && Mn(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function In(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= y;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				In(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Ln(e) {
	e.f &= -257, Rn(e, !0);
}
function Rn(e, t) {
	if (!(e.f & 256) && e.f & 8192) {
		e.f ^= y, e.f & 1024 || (rt(e, _), zt.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			Rn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function zn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ ln(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var Bn = null, Vn = !1, Hn = !1;
function Un(e) {
	Hn = e;
}
var Wn = null, Gn = !1;
function Kn(e) {
	Wn = e;
}
var qn = null;
function Jn(e) {
	qn = e;
}
var Yn = null;
function Xn(e) {
	Wn !== null && (Yn ??= /* @__PURE__ */ new Set()).add(e);
}
var Zn = null, Qn = 0, $n = null;
function er(e) {
	$n = e;
}
var tr = 1, nr = 0, rr = nr;
function ir(e) {
	rr = e;
}
function ar() {
	return ++tr;
}
function or(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~ne), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (or(a) && Tt(a), a.wv > e.wv) return !0;
		}
		t & 512 && jt === null && rt(e, g);
	}
	return !1;
}
function sr(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Yn !== null && Yn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? sr(a, t, !1) : t === a && (n ? rt(a, _) : a.f & 1024 && rt(a, v), Wt(a));
	}
}
function cr(e) {
	var t = Zn, n = Qn, r = $n, i = Wn, a = Yn, o = Je, s = Gn, c = rr, l = e.f;
	Zn = null, Qn = 0, $n = null, Wn = l & 96 ? null : e, Yn = null, O(e.ctx), Gn = !1, rr = ++nr, e.ac !== null && (pt(() => {
		e.ac.abort(pe);
	}), e.ac = null);
	try {
		e.f |= re;
		var u = e.fn, d = u();
		e.f |= x;
		var f = lr(e);
		if (Qe() && $n !== null && !Gn && f !== null && !(e.f & 6146)) for (var p = 0; p < $n.length; p++) sr($n[p], e);
		if (i !== null && i !== e) {
			if (nr++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = nr;
			if (t !== null) for (let e of t) e.rv = nr;
			$n !== null && (r === null ? r = $n : r.push(...$n));
		}
		return e.f & 8388608 && (e.f ^= T), d;
	} catch (t) {
		return lr(e), mn(t);
	} finally {
		e.f ^= re, Zn = t, Qn = n, $n = r, Wn = i, Yn = a, O(o), Gn = s, rr = c;
	}
}
function lr(e) {
	var t = e.deps, n = kt?.is_fork;
	if (Zn !== null) {
		var r;
		if (n || dr(e, Qn), t !== null && Qn > 0) for (t.length = Qn + Zn.length, r = 0; r < Zn.length; r++) t[Qn + r] = Zn[r];
		else e.deps = t = Zn;
		if (yn() && e.f & 512) for (r = Qn; r < t.length; r++) (t[r].reactions ??= []).push(e);
	} else !n && t !== null && Qn < t.length && (dr(e, Qn), t.length = Qn);
	return t;
}
function ur(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && (Zn === null || !n.call(Zn, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512, s.f &= ~ne), s.v !== ge && it(s), s.ac !== null && pt(() => {
			s.ac.abort(pe), s.ac = null, rt(s, _);
		}), Et(s), dr(s, 0);
	}
}
function dr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) ur(e, n[r]);
}
function fr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		rt(e, g);
		var n = qn, r = Vn;
		qn = e, Vn = !(t & 96);
		try {
			t & 16777232 ? jn(e) : An(e), kn(e);
			var i = cr(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = tr;
		} finally {
			Vn = r, qn = n;
		}
	}
}
async function pr() {
	await Promise.resolve(), Bt();
}
function B(e) {
	var t = !!(e.f & 2);
	if (Bn?.add(e), Wn !== null && !Gn && !(qn !== null && qn.f & 16384) && (Yn === null || !Yn.has(e))) {
		var r = Wn.deps;
		if (Wn.f & 2097152) e.rv < nr && (e.rv = nr, Zn === null && r !== null && r[Qn] === e ? Qn++ : Zn === null ? Zn = [e] : Zn.push(e));
		else {
			Wn.deps ??= [], n.call(Wn.deps, e) || Wn.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [Wn] : n.call(i, Wn) || i.push(Wn);
		}
	}
	if (Hn && j.has(e)) return j.get(e);
	if (t) {
		var a = e;
		if (Hn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || hr(a)) && (o = wt(a)), j.set(a, o), o;
		}
		var s = !(a.f & 512) && !Gn && Wn !== null && (Vn || !!(Wn.f & 512)), c = (a.f & x) === 0;
		or(a) && (s && (a.f |= 512), Tt(a)), s && !c && (Dt(a), mr(a));
	}
	if (jt?.has(e)) return jt.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function mr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Dt(t), mr(t));
}
function hr(e) {
	if (e.v === ge) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (j.has(t) || t.f & 2 && hr(t)) return !0;
	return !1;
}
function gr(e) {
	var t = Gn;
	try {
		return Gn = !0, e();
	} finally {
		Gn = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var _r = ["touchstart", "touchmove"];
function vr(e) {
	return _r.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var yr = Symbol("events"), br = /* @__PURE__ */ new Set(), xr = /* @__PURE__ */ new Set();
function Sr(e) {
	if (!Ce) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function Cr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Or.call(t, e), !e.cancelBubble) return pt(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? et(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function wr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = Cr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && bn(() => {
		t.removeEventListener(e, o, a);
	});
}
function V(e, t, n) {
	(t[yr] ??= {})[e] = n;
}
function Tr(e) {
	for (var t = 0; t < e.length; t++) br.add(e[t]);
	for (var n of xr) n(e);
}
var Er = null, Dr = !1;
function Or(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	Er = e, Dr || (Dr = !0, setTimeout(() => {
		Dr = !1, Er = null;
	}));
	var s = 0, c = Er === e && e[yr];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[yr] = t;
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
		var d = Wn, f = qn;
		Kn(null), Jn(null);
		try {
			for (var p, m = []; o !== null && o !== t;) {
				try {
					var h = o[yr]?.[r];
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
			e[yr] = t, delete e.currentTarget, Kn(d), Jn(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var kr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Ar(e) {
	return kr?.createHTML(e) ?? e;
}
function jr(e) {
	var t = fn("template");
	return t.innerHTML = Ar(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function Mr(e, t) {
	var n = qn;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function H(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (Ce) return Mr(Te, null), Te;
		i === void 0 && (i = jr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ cn(i)));
		var t = r || rn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ cn(t), s = t.lastChild;
			Mr(o, s);
		} else Mr(t, t);
		return t;
	};
}
function Nr(e = "") {
	if (!Ce) {
		var t = sn(e + "");
		return Mr(t, t), t;
	}
	var n = Te;
	return n.nodeType === 3 ? pn(n) : (n.before(n = sn()), Ee(n)), Mr(n, n), n;
}
function Pr() {
	if (Ce) return Mr(Te, null), Te;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = sn();
	return e.append(t, n), Mr(t, n), e;
}
function U(e, t) {
	if (Ce) {
		var n = qn;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = Te), De();
		return;
	}
	e !== null && e.before(t);
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function Fr(e) {
	let t = 0, n = Yt(0), r;
	return () => {
		yn() && (B(n), En(() => (t === 0 && (r = gr(() => e(() => $t(n)))), t += 1, () => {
			et(() => {
				--t, t === 0 && (r?.(), r = void 0, $t(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Ir = C | w;
function Lr(e, t, n, r) {
	new Rr(e, t, n, r);
}
var Rr = class {
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
	#h = Fr(() => (this.#m = Yt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = qn;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = qn.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = Dn(() => {
			if (Ce) {
				let e = this.#t;
				De();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#y() : this.#g();
			} else this.#b();
		}, Ir), Ce && (this.#e = Te);
	}
	#g() {
		try {
			this.#a = On(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#v(e);
		et(r), t && (this.#s = On(() => {
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
			t = !0, n && We(), this.#s !== null && Fn(this.#s, () => {
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
					hn(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#y() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = On(() => e(this.#e)), et(() => {
			var e = this.#c = document.createDocumentFragment(), t = sn(), n = !1;
			if (e.append(t), this.#a = this.#S(() => {
				try {
					return On(() => this.#r(t));
				} catch (e) {
					try {
						this.error(e), n = !0;
					} catch (e) {
						hn(e, this.#i.parent);
					}
					return null;
				}
			}), this.#a === null) {
				this.#c = null, n && this.#x(kt);
				return;
			}
			this.#u === 0 && (this.#e.before(e), this.#c = null, Fn(this.#o, () => {
				this.#o = null;
			}), this.#x(kt));
		}));
	}
	#b() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = On(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				zn(this.#a, e);
				let t = this.#n.pending;
				this.#o = On(() => t(this.#e));
			} else this.#x(kt);
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
		var t = qn, n = Wn, r = Je;
		Jn(this.#i), Kn(this.#i), O(this.#i.ctx);
		try {
			return zt.ensure(), e();
		} finally {
			Jn(t), Kn(n), O(r);
		}
	}
	#C(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#C(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#x(t), this.#o && Fn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#C(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, et(() => {
			this.#d = !1, this.#m && Zt(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), B(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		kt?.is_fork ? (this.#a && kt.skip_effect(this.#a), this.#o && kt.skip_effect(this.#o), this.#s && kt.skip_effect(this.#s), kt.oncommit(() => {
			this.#w(e);
		})) : this.#w(e);
	}
	#w(e) {
		this.#a &&= (Mn(this.#a), null), this.#o &&= (Mn(this.#o), null), this.#s &&= (Mn(this.#s), null), Ce && (Ee(this.#t), Oe(), Ee(ke()));
		let t = this.#n.failed, n = (e) => {
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && (this.#s = this.#S(() => {
				try {
					return On(() => {
						var r = qn;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return hn(e, this.#i.parent), null;
				}
			}));
		};
		et(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				hn(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => hn(e, this.#i && this.#i.parent)) : n(t);
		});
	}
}, zr = !0;
function W(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[de] ??= e.nodeValue) && (e[de] = n, e.nodeValue = `${n}`);
}
function Br(e, t) {
	return Hr(e, t);
}
var Vr = /* @__PURE__ */ new Map();
function Hr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	on();
	var l = void 0, u = Cn(() => {
		var u = n ?? t.appendChild(sn());
		Lr(u, { pending: () => {} }, (t) => {
			Ye({});
			var n = Je;
			if (o && (n.c = o), a && (i.$$events = a), Ce && Mr(t, null), zr = s, l = e(t, i) || Ze(), zr = !0, Ce && (qn.nodes.end = Te, Te === null || Te.nodeType !== 8 || Te.data !== "]")) throw xe(), he;
			Xe();
		}, c);
		var d = /* @__PURE__ */ new Set(), f = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!d.has(r)) {
					d.add(r);
					var i = vr(r);
					for (let e of [t, document]) {
						var a = Vr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Vr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Or, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return f(r(br)), xr.add(f), () => {
			for (var e of d) for (let n of [t, document]) {
				var r = Vr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Or), r.delete(e), r.size === 0 && Vr.delete(n)) : r.set(e, i);
			}
			xr.delete(f), u !== n && u.parentNode?.removeChild(u);
		};
	});
	return Ur.set(l, u), l;
}
var Ur = /* @__PURE__ */ new WeakMap(), Wr = class {
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
			if (n) Ln(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (Ln(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (Mn(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						zn(r, t), t.append(sn()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else Mn(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Fn(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (Mn(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = kt, r = dn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = sn();
				i.append(a), this.#n.set(e, {
					effect: On(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, On(() => t(this.anchor)));
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
function G(e, t, n = !1) {
	var r;
	Ce && (r = Te, De());
	var i = new Wr(e), a = n ? C : 0;
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
	Dn(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
function Gr(e, t) {
	return t;
}
function Kr(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		Fn(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					qr(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null && e.pending.size === 0;
		if (l) {
			var u = n, d = u.parentNode;
			un(d), d.append(u), e.items.clear();
		}
		qr(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function qr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= te, zn(a, document.createDocumentFragment())) : Mn(t[i], n);
	}
}
var Jr;
function Yr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = Ce ? Ee(/* @__PURE__ */ cn(u)) : u.appendChild(sn());
	}
	Ce && De();
	var d = null, f = /* @__PURE__ */ St(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Zr(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= te, $r(d, null, c)) : Ln(d) : Fn(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: Dn(() => {
			p = B(f);
			var e = p.length;
			let t = !1;
			Ce && Ae(c) === "[!" != (e === 0) && (c = ke(), Ee(c), we(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = kt, v = dn(), y = 0; y < e; y += 1) {
				Ce && Te.nodeType === 8 && Te.data === "]" && (c = Te, t = !0, we(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Zt(S.v, b), S.i && Zt(S.i, y), v && u.unskip_effect(S.e)) : (S = Qr(l, h ? c : Jr ??= sn(), b, x, y, o, n, i), h || (S.e.f |= te), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = On(() => s(c)) : (d = On(() => s(Jr ??= sn())), d.f |= te)), e > r.size && Fe("", "", ""), Ce && e > 0 && Ee(ke()), !h) {
				if (m.set(u, r), v) {
					for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
					u.oncommit(g), u.ondiscard(_);
				} else g(u);
			}
			t && we(!0), B(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, Ce && (c = Te);
}
function Xr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Zr(e, t, n, i, a) {
	var o = !!(i & 8), s = t.length, c = e.items, l = Xr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (Ln(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) {
			if (_.f ^= te, _ === l) $r(_, null, n);
			else {
				var y = d ? d.next : l;
				_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), ei(e, d, _), ei(e, _, y), $r(_, y, n), d = _, p = [], m = [], l = Xr(d.next);
				continue;
			}
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) $r(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					ei(e, S.prev, C.next), ei(e, d, S), ei(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), $r(_, l, n), ei(e, _.prev, _.next), ei(e, _, d === null ? e.effect.first : d.next), ei(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = Xr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = Xr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (qr(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var w = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || w.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && w.push(l), l = Xr(l.next);
		var ee = w.length;
		if (ee > 0) {
			var ne = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < ee; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < ee; v += 1) w[v].nodes?.a?.fix();
			}
			Kr(e, w, ne);
		}
	}
	o && et(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Qr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Yt(n) : /* @__PURE__ */ Xt(n, !1, !1) : null, l = o & 2 ? Yt(i) : null;
	return {
		v: c,
		i: l,
		e: On(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function $r(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ ln(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function ei(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function K(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		Ce && (o = Ee(/* @__PURE__ */ cn(c)));
	}
	z(() => {
		var e = qn;
		if (s === (s = t() ?? "")) {
			Ce && De();
			return;
		}
		if (n && !Ce) {
			e.nodes = null, c.innerHTML = s, s !== "" && Mr(/* @__PURE__ */ cn(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (Nn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (Ce) {
				for (var a = Te.data, l = De(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ ln(l);
				if (l === null) throw xe(), he;
				Mr(Te, u), o = Ee(l);
				return;
			}
			var d = fn(r ? "svg" : i ? "math" : "template", r ? ve : i ? ye : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (Mr(/* @__PURE__ */ cn(f), f.lastChild), r || i) for (; /* @__PURE__ */ cn(f);) o.before(/* @__PURE__ */ cn(f));
			else o.before(f);
		}
	});
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/snippet.js
function ti(e, t, ...n) {
	var r = new Wr(e);
	Dn(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, C);
}
//#endregion
//#region node_modules/svelte/src/internal/client/timing.js
var ni = () => performance.now(), ri = {
	tick: (e) => requestAnimationFrame(e),
	now: () => ni(),
	tasks: /* @__PURE__ */ new Set()
};
//#endregion
//#region node_modules/svelte/src/internal/client/loop.js
function ii() {
	let e = ri.now();
	ri.tasks.forEach((t) => {
		t.c(e) || (ri.tasks.delete(t), t.f());
	}), ri.tasks.size !== 0 && ri.tick(ii);
}
function ai(e) {
	let t;
	return ri.tasks.size === 0 && ri.tick(ii), {
		promise: new Promise((n) => {
			ri.tasks.add(t = {
				c: e,
				f: n
			});
		}),
		abort() {
			ri.tasks.delete(t);
		}
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/transitions.js
function oi(e, t) {
	pt(() => {
		e.dispatchEvent(new CustomEvent(t));
	});
}
function si(e) {
	if (e === "float") return "cssFloat";
	if (e === "offset") return "cssOffset";
	if (e.startsWith("--")) return e;
	let t = e.split("-");
	return t.length === 1 ? t[0] : t[0] + t.slice(1).map((e) => e[0].toUpperCase() + e.slice(1)).join("");
}
function ci(e) {
	let t = {}, n = e.split(";");
	for (let e of n) {
		let [n, r] = e.split(":");
		if (!n || r === void 0) break;
		let i = si(n.trim());
		t[i] = r.trim();
	}
	return t;
}
var li = (e) => e;
function ui(e, t, n, r) {
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
			a || f?.abort(), f = di(t, m(), p, 1, () => {
				oi(t, "introstart");
			}, () => {
				oi(t, "introend"), f?.abort(), f = l = void 0, t.style.overflow = d;
			});
		},
		out(e) {
			if (!a) {
				e?.(), l = void 0;
				return;
			}
			t.inert = !0, p = di(t, m(), f, 0, () => {
				oi(t, "outrostart");
			}, () => {
				oi(t, "outroend"), e?.();
			});
		},
		stop: () => {
			f?.abort(), p?.abort();
		}
	}, g = qn;
	if ((g.nodes.t ??= []).push(h), i && zr) {
		var _ = s;
		if (!_) {
			for (var v = g.parent; v && v.f & 65536;) for (; (v = v.parent) && !(v.f & 16););
			_ = !v || !!(v.f & 32768);
		}
		_ && wn(() => {
			gr(() => h.in());
		});
	}
}
function di(e, t, n, r, i, a) {
	var o = r === 1, s = !1;
	if (d(t)) {
		var c;
		return et(() => {
			s || (c = di(e, t({ direction: o ? "in" : "out" }), n, r, i, a));
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
	let { delay: l = 0, css: u, tick: p, easing: m = li } = t;
	var h, g = () => 1 - r;
	return et(() => {
		if (!s) {
			var c = [];
			if (o && n === void 0 && (p && p(0, 1), u)) {
				var d = ci(u(0, 1));
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
						var v = o + s * m(_ / f), y = ci(u(v, 1 - v));
						l.push(y), d ||= y.overflow === "hidden";
					}
					d && (e.style.overflow = "hidden"), g = () => {
						var e = h.currentTime;
						return o + s * m(e / c);
					}, p && ai(() => {
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
var fi = [..." 	\n\r\f\xA0\v﻿"];
function pi(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || fi.includes(r[o - 1])) && (s === r.length || fi.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function mi(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function hi(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function gi(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\/\*.*?\*\//g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(hi)), i && c.push(...Object.keys(i).map(hi));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = hi(e.substring(l, u).trim());
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
		return r && (n += mi(r)), i && (n += mi(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function q(e, t, n, r, i, a) {
	var o = e[le];
	if (Ce || o !== n || o === void 0) {
		var s = pi(n, r, a);
		(!Ce || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[le] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/style.js
function _i(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function vi(e, t, n, r) {
	var i = e[ue];
	if (Ce || i !== t) {
		var a = gi(t, r);
		(!Ce || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[ue] = t;
	} else r && (Array.isArray(r) ? (_i(e, n?.[0], r[0]), _i(e, n?.[1], r[1], "important")) : _i(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var yi = Symbol("is custom element"), bi = Symbol("is html"), xi = me ? "link" : "LINK", Si = me ? "progress" : "PROGRESS";
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
	var n = wi(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === Si) && (e.value = t ?? "");
}
function Ci(e, t) {
	var n = wi(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function X(e, t, n, r) {
	var i = wi(e);
	Ce && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === xi) || i[t] !== (i[t] = n) && (t === "loading" && (e[ce] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Ei(e).has(t) ? e[t] = n : e.setAttribute(t, n));
}
function wi(e) {
	return e[E] ??= {
		[yi]: e.nodeName.includes("-"),
		[bi]: e.namespaceURI === _e
	};
}
var Ti = /* @__PURE__ */ new Map();
function Ei(e) {
	var t = e.getAttribute("is") || e.nodeName, n = Ti.get(t);
	if (n) return n;
	Ti.set(t, n = /* @__PURE__ */ new Set());
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.add(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function Di(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	mt(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = Oi(e) ? ki(a) : a, n(a), kt !== null && r.add(kt), await pr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (Ce && e.defaultValue !== e.value || gr(t) == null && e.value) && (n(Oi(e) ? ki(e.value) : e.value), kt !== null && r.add(kt)), En(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = kt;
			if (r.has(i)) return;
		}
		Oi(e) && n === ki(e.value) || e.type === "date" && !n && !e.value || n !== e.value && (e.value = n ?? "");
	});
}
function Oi(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function ki(e) {
	return e === "" ? null : +e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function Ai(e, t) {
	return e === t || e?.[ae] === t;
}
function ji(e = Ze(), t, n, r) {
	var i = Je.r, a = qn;
	return wn(() => {
		var o, s;
		return En(() => {
			o = s, s = r?.() || [], gr(() => {
				Ai(n(...s), e) || (t(e, ...s), o && Ai(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && Ai(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
function Mi(e, t, n, r) {
	var i = !0, o = !!(n & 8), s = !!(n & 16), c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ yt(r), B(u)) : (l && (l = !1, c = s ? gr(r) : r), c);
	let f;
	if (o) {
		var p = ae in e || se in e;
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
	o && B(y);
	var b = qn;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? B(y) : i && o ? tn(e) : e;
			return N(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Hn && v || b.f & 16384 ? y.v : B(y);
	});
}
var Ni = {
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
}, Pi = [
	"nb",
	"nn",
	"en-GB",
	"se",
	"tr"
], Fi = /^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/, Ii = {
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
function Li(e) {
	let t = String(e ?? "").trim().toLowerCase();
	for (let [e, n] of Object.entries(Ii)) if (n.some((e) => t === e || t.startsWith(`${e}-`))) return e;
	return null;
}
function Ri(e) {
	return Pi.includes(String(e ?? ""));
}
function zi(e) {
	let t = [];
	if (!Array.isArray(e)) return ["languages must be a list"];
	for (let n of e) {
		if (!n || typeof n != "object" || Array.isArray(n)) {
			t.push("languages: every entry must be an object");
			continue;
		}
		let e = String(n.code ?? "");
		Fi.test(e) ? Ri(e) && t.push(`languages: '${e}' is built into Urd and cannot be overridden`) : t.push(`languages: '${e}' is not a valid language code`), (typeof n.name != "string" || !n.name.trim()) && t.push(`languages/${e}: name is missing (the language's own name)`);
		for (let r of ["site", "admin"]) n[r] !== void 0 && typeof n[r] != "boolean" && t.push(`languages/${e}: ${r} must be a boolean`);
		n.site !== !0 && n.admin !== !0 && t.push(`languages/${e}: must cover site, admin or both`);
	}
	return t;
}
function Bi(e) {
	let t = Li(e);
	if (t) return t;
	let n = String(e ?? "").trim();
	return Fi.test(n) ? n : "nb";
}
async function Vi(e, t) {
	try {
		return await (await import(
			/* @vite-ignore */
			"/assets/urd/language-packs.js"
)).loadPackStrings(e, t);
	} catch {
		return null;
	}
}
({ ...Ni.strings });
var Hi = {
	lang: "nb",
	dict: {}
};
function Ui(e, t) {
	if (!t) return e;
	let n = e;
	for (let [e, r] of Object.entries(t)) n = n.replaceAll(`{${e}}`, String(r));
	return n;
}
function Z(e, t) {
	return Ui(Hi.dict[e] ?? e, t);
}
function Wi(e) {
	let t = `api.${e?.code}`;
	return e?.code && Hi.dict[t] !== void 0 ? Ui(Hi.dict[t], e) : e?.error ?? null;
}
function Gi() {
	return Hi.lang;
}
function Ki() {
	let e = null;
	try {
		e = localStorage.getItem("urd-admin-lang");
	} catch {}
	if (e) return Bi(e);
	for (let e of navigator.languages ?? [navigator.language]) {
		let t = Li(e);
		if (t) return t;
	}
	return "en-GB";
}
var qi;
new Promise((e) => {
	qi = e;
});
async function Ji(e = Ki()) {
	let t = async (e) => (await import(
		/* @vite-ignore */
		`/assets/urd/locales/admin/${e}.js`
)).default.strings;
	Hi.lang = Bi(e);
	let n = Ri(Hi.lang);
	try {
		Object.assign(Hi.dict, await t("nb")), n && Hi.lang !== "nb" && Object.assign(Hi.dict, await t(Hi.lang));
	} catch {}
	if (!n) {
		let e = await Vi(Hi.lang, "admin");
		e ? Object.assign(Hi.dict, e) : Hi.lang = "nb";
	}
	return qi(Hi.lang), Hi.lang;
}
//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region node_modules/svelte/src/transition/index.js
function Yi(e) {
	let t = e - 1;
	return t * t * t + 1;
}
function Xi(e) {
	let t = typeof e == "string" && e.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
	return t ? [parseFloat(t[1]), t[2] || "px"] : [e, "px"];
}
function Zi(e, { delay: t = 0, duration: n = 400, easing: r = Yi, x: i = 0, y: a = 0, opacity: o = 0 } = {}) {
	let s = getComputedStyle(e), c = +s.opacity, l = s.transform === "none" ? "" : s.transform, u = c * (1 - o), [d, f] = Xi(i), [p, m] = Xi(a);
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
function Qi(e, t, n, r) {
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
function $i(e = globalThis) {
	let t = e?.HTMLElement?.prototype, n = e?.CSS;
	return !!(t && "popover" in t && typeof t.showPopover == "function" && typeof n?.supports == "function" && n.supports("anchor-name: --urd") && n.supports("position-try-fallbacks: flip-block"));
}
var ea = 0;
function ta(e = "urd-pop") {
	return ea += 1, `--${e}-${ea}`;
}
function na(e, t) {
	let n = e?.closest?.(".panel-body, .block-menu-body");
	n && (t ? n.style.setProperty("anchor-name", "--urd-pane") : n.style.removeProperty("anchor-name"));
}
//#endregion
//#region src/lib/ColorPicker.svelte
var ra = /* @__PURE__ */ H("<button type=\"button\" class=\"cp-eye svelte-zxiloo\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), ia = /* @__PURE__ */ H("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), aa = /* @__PURE__ */ H("<button type=\"button\"></button>"), oa = /* @__PURE__ */ H("<span class=\"cp-label svelte-zxiloo\"> <!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), sa = /* @__PURE__ */ H("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\">×</button></span>"), ca = /* @__PURE__ */ H("<span class=\"cp-tokens svelte-zxiloo\"></span>"), la = /* @__PURE__ */ H("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), ua = /* @__PURE__ */ H("<span class=\"cp-label svelte-zxiloo\"> </span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), da = /* @__PURE__ */ H("<div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\"> <button type=\"button\" class=\"cp-add svelte-zxiloo\">+</button></span> <!> <!>", 1), fa = /* @__PURE__ */ H("<button type=\"button\" class=\"cp-clear svelte-zxiloo\">×</button>"), pa = /* @__PURE__ */ H("<div class=\"cp-pop cp-anchored svelte-zxiloo\" popover=\"auto\"><!></div>"), ma = /* @__PURE__ */ H("<div class=\"cp-pop svelte-zxiloo\"><!></div>"), ha = /* @__PURE__ */ H("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!> <!></span>");
function ga(e, t) {
	Ye(t, !0);
	let n = (e) => {
		var t = da(), n = I(t), a = L(n), o = R(n, 2);
		J(o);
		var s = R(o, 2);
		J(s);
		var c = R(s, 2), l = F(c), u = R(l, 2);
		J(u);
		var d = R(u, 2), f = (e) => {
			var t = ra();
			z((e) => X(t, "title", e), [() => Z("cp.eyedropper")]), V("click", t, be), U(e, t);
		};
		G(d, (e) => {
			ye && e(f);
		}), D(c);
		var p = R(c, 2);
		Yr(p, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = ia();
			J(r), z((e) => {
				X(r, "title", t), Y(r, e);
			}, [() => _e(B(n))]), V("change", r, (e) => ve(B(n), e.target.value)), U(e, r);
		}), D(p);
		var v = R(p, 2), y = (e) => {
			var t = oa(), n = I(t), a = F(n, !0), o = R(a), s = (e) => {
				var t = Nr();
				z((e) => W(t, e), [() => Z("cp.linkedSuffix", { token: m() })]), U(e, t);
			}, c = /* @__PURE__ */ A(() => m());
			G(o, (e) => {
				B(c) && e(s);
			}), D(n);
			var l = R(n, 2);
			Yr(l, 21, i, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ A(() => h(B(t), 2));
				let i = () => B(n)[0], a = () => B(n)[1];
				var o = aa();
				let s;
				z((e) => {
					s = q(o, 1, "cp-token svelte-zxiloo", null, s, { active: r() === i() }), vi(o, `background: ${a() ?? ""}`), X(o, "title", e);
				}, [() => Z("cp.tokenTitle", { name: i() })]), V("click", o, () => me(i(), a())), U(e, o);
			}), D(l), z((e) => W(a, e), [() => Z("cp.themeColors")]), U(e, t);
		};
		G(v, (e) => {
			i().length && e(y);
		});
		var b = R(v, 2), x = F(b), S = R(x);
		D(b);
		var re = R(b, 2), ie = (e) => {
			var t = ca();
			Yr(t, 20, () => B(_), (e) => e, (e, t) => {
				var n = sa(), r = F(n), i = R(r, 2);
				D(n), z((e) => {
					vi(r, `background: ${t ?? ""}`), X(r, "title", t), X(i, "title", e);
				}, [() => Z("cp.removeSaved")]), V("click", r, () => xe(t)), V("click", i, () => Ce(t)), U(e, n);
			}), D(t), U(e, t);
		};
		G(re, (e) => {
			B(_).length && e(ie);
		});
		var T = R(re, 2), ae = (e) => {
			var t = ua(), n = I(t), r = L(n, !0), i = R(n, 2);
			Yr(i, 20, () => B(g), (e) => e, (e, t) => {
				var n = la();
				z(() => {
					vi(n, `background: ${t ?? ""}`), X(n, "title", t);
				}), V("click", n, () => xe(t)), U(e, n);
			}), D(i), z((e) => W(r, e), [() => Z("common.recent")]), U(e, t);
		};
		G(T, (e) => {
			B(g).length && e(ae);
		}), z((e, t, r, i, c) => {
			vi(n, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${B(C) ?? ""}, 100%, 50%)`), vi(a, `left: ${B(w) * 100}%; top: ${(1 - B(ee)) * 100}%`), Y(o, B(C)), Y(s, e), X(s, "title", t), vi(s, `background: linear-gradient(to right, transparent, ${r ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), vi(l, `background: ${B(ne) ?? ""}`), Y(u, B(ne)), W(x, `${i ?? ""} `), X(S, "title", c);
		}, [
			() => Math.round(B(te) * 100),
			() => Z("cp.alpha"),
			() => oe(),
			() => Z("cp.saved"),
			() => Z("cp.saveTitle")
		]), V("pointerdown", n, he), V("input", o, (e) => {
			N(C, Number(e.target.value), !0), ce();
		}), V("input", s, (e) => {
			N(te, Number(e.target.value) / 100), ce();
		}), V("change", u, ge), V("click", S, Se), U(e, t);
	}, r = Mi(t, "value", 3, "#000000"), i = Mi(t, "tokens", 19, () => []), a = Mi(t, "label", 19, () => Z("cp.pickColor")), o = Mi(t, "allowClear", 3, !1), s = "urd-recent-colors", c = "urd-saved-colors", l = $i(), u = ta("urd-cp"), d = u.slice(2), f = /* @__PURE__ */ M(null), p = () => {
		let e = i().find(([e]) => e === r());
		return e ? e[1] : r();
	}, m = () => i().find(([e]) => e === r())?.[0] ?? null, g = /* @__PURE__ */ M(tn([])), _ = /* @__PURE__ */ M(tn([])), v = "", y = "", b = /* @__PURE__ */ M(null), x = /* @__PURE__ */ M(!1), S = /* @__PURE__ */ M(tn({
		top: 0,
		left: 0
	})), C = /* @__PURE__ */ M(0), w = /* @__PURE__ */ M(0), ee = /* @__PURE__ */ M(1), te = /* @__PURE__ */ M(1), ne = /* @__PURE__ */ M("#000000");
	function re(e) {
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
	let ie = (e, t, n) => "#" + [
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
	function ae(e, t, n) {
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
	function oe() {
		return ie(...ae(B(C), B(w), B(ee)));
	}
	function se() {
		let e = oe();
		return B(te) >= .995 ? e : e + Math.round(B(te) * 255).toString(16).padStart(2, "0");
	}
	function ce() {
		N(ne, se(), !0), y = B(ne), t.onchange?.(B(ne));
	}
	function E(e) {
		let t = re(e);
		return t ? (((e) => {
			var t = h(e, 3);
			N(C, t[0], !0), N(w, t[1], !0), N(ee, t[2], !0);
		})(T(t[0], t[1], t[2])), N(te, t[3], !0), N(ne, se(), !0), !0) : !1;
	}
	function le() {
		E(p()) || E("#000000"), v = r(), y = "";
		try {
			let e = JSON.parse(localStorage.getItem(s) ?? "[]");
			N(g, Array.isArray(e) ? e : [], !0);
		} catch {
			N(g, [], !0);
		}
		try {
			let e = JSON.parse(localStorage.getItem(c) ?? "[]");
			N(_, Array.isArray(e) ? e : [], !0);
		} catch {
			N(_, [], !0);
		}
	}
	function ue(e) {
		e.newState === "open" ? (le(), na(B(b), !0), N(x, !0)) : B(x) && (na(B(b), !1), N(x, !1), fe());
	}
	function de() {
		le();
		let e = B(b).getBoundingClientRect(), t = B(b).closest(".panel-body")?.getBoundingClientRect(), n = t ? t.right : window.innerWidth, r = Math.max(8, Math.min(e.right - 236, n - 236 - 8)), i = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		N(S, {
			top: i,
			left: r
		}, !0), N(x, !0);
	}
	function fe() {
		if (y && y !== v) {
			let e = [y, ...B(g).filter((e) => e !== y)].slice(0, 8);
			localStorage.setItem(s, JSON.stringify(e));
		}
	}
	function pe() {
		if (l) {
			B(f)?.hidePopover();
			return;
		}
		N(x, !1), fe();
	}
	function me(e, n) {
		E(n), N(ne, n, !0), t.onchange?.(e);
	}
	function he(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			N(w, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), N(ee, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), ce();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function ge(e) {
		E(e.target.value) ? ce() : N(ne, oe(), !0);
	}
	function _e(e) {
		return (re(oe()) ?? [
			0,
			0,
			0
		])[e];
	}
	function ve(e, t) {
		let n = re(oe()) ?? [
			0,
			0,
			0
		];
		n[e] = Math.min(255, Math.max(0, Number(t) || 0)), ((e) => {
			var t = h(e, 3);
			N(C, t[0], !0), N(w, t[1], !0), N(ee, t[2], !0);
		})(T(...n)), ce();
	}
	let ye = typeof window < "u" && "EyeDropper" in window;
	async function be() {
		try {
			E((await new window.EyeDropper().open()).sRGBHex) && ce();
		} catch {}
	}
	function xe(e) {
		E(e) && ce();
	}
	function Se() {
		let e = se();
		B(_).includes(e) || (N(_, [e, ...B(_)].slice(0, 12), !0), localStorage.setItem(c, JSON.stringify(Ke(B(_)))));
	}
	function Ce(e) {
		N(_, B(_).filter((t) => t !== e), !0), localStorage.setItem(c, JSON.stringify(Ke(B(_))));
	}
	xn(() => {
		if (!B(x)) return;
		let e = () => pe();
		if (window.addEventListener("blur", e), l) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			B(b) && !B(b).contains(e.target) && pe();
		}, n = (e) => {
			e.key === "Escape" && pe();
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), () => {
			document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), window.removeEventListener("blur", e);
		};
	});
	var we = ha(), Te = F(we);
	let Ee;
	var De = R(Te, 2), Oe = (e) => {
		var n = fa();
		z((e, t) => {
			X(n, "title", e), X(n, "aria-label", t);
		}, [() => Z("cp.clearTitle"), () => Z("cp.clear")]), V("click", n, () => t.onchange?.("")), U(e, n);
	};
	G(De, (e) => {
		o() && r() && e(Oe);
	});
	var ke = R(De, 2), Ae = (e) => {
		var t = pa(), r = F(t), i = (e) => {
			n(e);
		};
		G(r, (e) => {
			B(x) && e(i);
		}), D(t), ji(t, (e) => N(f, e), () => B(f)), z(() => {
			X(t, "id", d), vi(t, `position-anchor: ${u ?? ""}`);
		}), wr("toggle", t, ue), V("click", t, (e) => e.preventDefault()), U(e, t);
	}, je = (e) => {
		var t = ma(), r = F(t);
		n(r), D(t), z(() => vi(t, `top: ${B(S).top ?? ""}px; left: ${B(S).left ?? ""}px`)), V("click", t, (e) => e.preventDefault()), U(e, t);
	};
	G(ke, (e) => {
		l ? e(Ae) : B(x) && e(je, 1);
	}), D(we), ji(we, (e) => N(b, e), () => B(b)), z((e, t, n) => {
		Ee = q(Te, 1, "cp-swatch svelte-zxiloo", null, Ee, {
			linked: e,
			"cp-empty": o() && !r()
		}), vi(Te, `background: ${t ?? ""}${l ? `; anchor-name: ${u}` : ""}`), X(Te, "title", n), X(Te, "popovertarget", l ? d : void 0), X(Te, "aria-label", a());
	}, [
		() => m(),
		() => r() ? p() : "transparent",
		() => m() ? Z("cp.linkedTitle", {
			label: a(),
			token: m()
		}) : a()
	]), V("click", Te, function(...e) {
		(l ? void 0 : () => B(x) ? pe() : de())?.apply(this, e);
	}), U(e, we), Xe();
}
Tr([
	"pointerdown",
	"input",
	"change",
	"click"
]);
//#endregion
//#region ../template/assets/engine/0.7.4/imageTools.js
var _a = 1600, va = .82, ya = .6, ba = 15e6;
async function xa(e, t = _a) {
	if (Ca(e)) return wa(await e.text());
	let n = await createImageBitmap(e), r = Math.min(1, t / Math.max(n.width, n.height)), i = Math.round(n.width * r), a = Math.round(n.height * r), o = document.createElement("canvas");
	o.width = i, o.height = a, o.getContext("2d").drawImage(n, 0, 0, i, a), n.close();
	let s = (e) => new Promise((t) => o.toBlob(t, "image/webp", e)), c = await s(va);
	return c.size > 4e5 && (c = await s(ya)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(c);
		}),
		bytes: c.size,
		width: i,
		height: a
	};
}
var Sa = "image/svg+xml";
function Ca(e) {
	return e.type === Sa || /\.svg$/i.test(e.name || "");
}
function wa(e) {
	let t = String(e ?? "");
	if (!/<svg[\s>]/i.test(t)) throw Error("Invalid SVG");
	if (/<\s*script[\s>]/i.test(t) || /<\s*foreignObject[\s>]/i.test(t) || /\son[a-z]+\s*=/i.test(t) || /javascript:/i.test(t)) throw Error("The SVG contains scripts or event handlers and cannot be used");
	let n = new Blob([t]).size, r = `data:${Sa};base64,${btoa(unescape(encodeURIComponent(t)))}`, i = t.match(/<svg\b[^>]*>/i)?.[0] ?? "", a = i.match(/viewBox\s*=\s*["']\s*([-\d.]+(?:[\s,]+[-\d.]+){3})\s*["']/i)?.[1]?.split(/[\s,]+/).map(Number);
	return {
		dataUrl: r,
		bytes: n,
		width: a?.length === 4 ? a[2] : Number.parseFloat(i.match(/\bwidth\s*=\s*["']?([\d.]+)/i)?.[1]) || 0,
		height: a?.length === 4 ? a[3] : Number.parseFloat(i.match(/\bheight\s*=\s*["']?([\d.]+)/i)?.[1]) || 0
	};
}
function Ta(e, t, n = .04) {
	let r = String(e ?? "");
	if (!t || !(t.width > 0) || !(t.height > 0)) return r;
	let i = r.match(/<svg\b[^>]*>/i)?.[0];
	if (!i) return r;
	let a = (e) => Math.round(e * 1e3) / 1e3, o = Math.max(t.width, t.height) * Math.max(0, n), s = a(t.x - o), c = a(t.y - o), l = a(t.width + 2 * o), u = a(t.height + 2 * o), d = i.replace(/\sviewBox\s*=\s*["'][^"']*["']/i, "").replace(/\swidth\s*=\s*["'][^"']*["']/i, "").replace(/\sheight\s*=\s*["'][^"']*["']/i, "").replace(/<svg\b/i, `<svg viewBox="${s} ${c} ${l} ${u}" width="${l}" height="${u}"`);
	return r.replace(i, d);
}
function Ea(e) {
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
function Da(e) {
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
function Oa(e, t = "image") {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || t;
}
function ka(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region ../template/assets/engine/0.7.4/glyphs.js
var Aa = "urd-recent-glyphs", ja = "urd-recent-icons", Ma = [
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
function Na(e, t) {
	return [t, ...(Array.isArray(e) ? e : []).filter((e) => e !== t)].slice(0, 16);
}
var Pa = (e) => {
	try {
		let t = JSON.parse(localStorage.getItem(e) ?? "[]");
		return Array.isArray(t) ? t : [];
	} catch {
		return [];
	}
}, Fa = (e, t, n) => {
	let r = Na(t, n);
	try {
		localStorage.setItem(e, JSON.stringify(r));
	} catch {}
	return r;
};
function Ia() {
	return Pa(Aa);
}
function La(e) {
	return Fa(Aa, Ia(), e);
}
function Ra() {
	return Pa(ja);
}
function za(e) {
	return Fa(ja, Ra(), e);
}
//#endregion
//#region ../template/assets/engine/0.7.4/icons.js
var Ba = "fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"", Va = "fill=\"currentColor\" stroke=\"none\"", Ha = {
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
}, Ua = [
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
function Wa(e) {
	let t = typeof e == "string" ? Ha[e] : null;
	return t ? `<svg viewBox="0 0 24 24" width="100%" height="100%" ${t.fill ? Va : Ba} aria-hidden="true" focusable="false">${t.body}</svg>` : null;
}
//#endregion
//#region src/lib/GlyphPicker.svelte
var Ga = /* @__PURE__ */ H("<button type=\"button\"><span class=\"gp-svg svelte-15ln1c3\"></span></button>"), Ka = /* @__PURE__ */ H("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), qa = /* @__PURE__ */ H("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"><!> <!></div>", 1), Ja = /* @__PURE__ */ H("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), Ya = /* @__PURE__ */ H("<button type=\"button\"> </button>"), Xa = /* @__PURE__ */ H("<div class=\"gp-group svelte-15ln1c3\"> </div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\"> </button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\"> </p>", 1), Za = /* @__PURE__ */ H("<!> <!> <!> <!>", 1), Qa = /* @__PURE__ */ H("<img class=\"gp-own svelte-15ln1c3\"/>"), $a = /* @__PURE__ */ H("<span class=\"gp-svg svelte-15ln1c3\"></span>"), eo = /* @__PURE__ */ H("<div class=\"gp-pop gp-anchored svelte-15ln1c3\" popover=\"auto\"><!></div>"), to = /* @__PURE__ */ H("<div class=\"gp-pop svelte-15ln1c3\"><!></div>"), no = /* @__PURE__ */ H("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"><!></button> <!></span>");
function ro(e, t) {
	Ye(t, !0);
	let n = (e) => {
		var n = Za(), a = I(n), o = (e) => {
			var t = qa(), n = I(t), r = L(n, !0), a = R(n, 2), o = F(a);
			Yr(o, 16, () => B(d), (e) => e, (e, t) => {
				var n = Ga();
				let r;
				var a = F(n);
				K(a, () => Wa(t), !0), D(a), D(n), z((e) => {
					r = q(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, r, { active: t === i() }), X(n, "title", e);
				}, [() => Z(Ha[t].labelKey)]), V("click", n, () => C(t)), U(e, n);
			}), Yr(R(o, 2), 16, () => B(u), (e) => e, (e, t) => {
				var n = Ka(), r = L(n, !0);
				z(() => W(r, t)), V("click", n, () => S(t)), U(e, n);
			}), D(a), z((e) => W(r, e), [() => Z("common.recent")]), U(e, t);
		};
		G(a, (e) => {
			(B(u).length || B(d).length) && e(o);
		});
		var s = R(a, 2), c = (e) => {
			var t = Pr();
			Yr(I(t), 17, () => Ua, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ A(() => h(B(t), 2));
				let r = () => B(n)[0], a = () => B(n)[1];
				var o = Ja(), s = I(o), c = L(s, !0), l = R(s, 2);
				Yr(l, 20, a, (e) => e, (e, t) => {
					var n = Ga();
					let r;
					var a = F(n);
					K(a, () => Wa(t), !0), D(a), D(n), z((e) => {
						r = q(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, r, { active: t === i() }), X(n, "title", e);
					}, [() => Z(Ha[t].labelKey)]), V("click", n, () => C(t)), U(e, n);
				}), D(l), z((e) => W(c, e), [() => Z(r())]), U(e, o);
			}), U(e, t);
		};
		G(s, (e) => {
			t.onicon && e(c);
		});
		var l = R(s, 2);
		Yr(l, 17, () => Ma, ([e, t]) => e, (e, t) => {
			var n = /* @__PURE__ */ A(() => h(B(t), 2));
			let i = () => B(n)[0], a = () => B(n)[1];
			var o = Ja(), s = I(o), c = L(s, !0), l = R(s, 2);
			Yr(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var n = Ya();
				let i;
				var a = L(n, !0);
				z(() => {
					i = q(n, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === r() }), W(a, t);
				}), V("click", n, () => S(t)), U(e, n);
			}), D(l), z((e) => W(c, e), [() => Z(i())]), U(e, o);
		});
		var f = R(l, 2), p = (e) => {
			var t = Xa(), n = I(t), r = L(n, !0), i = R(n, 2), a = L(i, !0), o = R(i, 2);
			ji(o, (e) => N(m, e), () => B(m));
			var s = L(R(o, 2), !0);
			z((e, t, n) => {
				W(r, e), W(a, t), W(s, n);
			}, [
				() => Z("gp.ownIcon"),
				() => Z("gp.upload"),
				() => Z("gp.uploadHint")
			]), V("click", i, () => B(m).click()), V("change", o, w), U(e, t);
		};
		G(f, (e) => {
			t.onimage && e(p);
		}), U(e, n);
	}, r = Mi(t, "value", 3, "★"), i = Mi(t, "icon", 3, null), a = Mi(t, "image", 3, null), o = Mi(t, "label", 19, () => Z("gp.pickGlyph")), s = $i(), c = ta("urd-gp"), l = c.slice(2), u = /* @__PURE__ */ M(tn([])), d = /* @__PURE__ */ M(tn([])), f = /* @__PURE__ */ M(null), p = /* @__PURE__ */ M(null), m = /* @__PURE__ */ M(null), g = /* @__PURE__ */ M(!1), _ = /* @__PURE__ */ M(tn({
		top: 0,
		left: 0
	}));
	function v() {
		N(u, Ia(), !0), N(d, t.onicon ? Ra().filter((e) => Ha[e]) : [], !0);
	}
	function y(e) {
		N(g, e.newState === "open"), na(B(f), B(g)), B(g) && v();
	}
	function b() {
		s && B(p)?.hidePopover(), N(g, !1);
	}
	function x() {
		v();
		let e = B(f).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		N(_, {
			top: n,
			left: t
		}, !0), N(g, !0);
	}
	function S(e) {
		La(e), t.onpick?.(e), b();
	}
	function C(e) {
		za(e), t.onicon?.(e), b();
	}
	async function w(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", !n) return;
		let r = await xa(n, 256);
		t.onimage?.(r.dataUrl), b();
	}
	xn(() => {
		if (!B(g)) return;
		let e = () => b();
		if (window.addEventListener("blur", e), s) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			B(f) && !B(f).contains(e.target) && N(g, !1);
		}, n = (e) => {
			e.key === "Escape" && N(g, !1);
		}, r = (e) => {
			B(f) && e.target instanceof Node && !B(f).contains(e.target) && N(g, !1);
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var ee = no(), te = F(ee), ne = F(te), re = (e) => {
		var t = Qa();
		z((e) => {
			X(t, "src", a()), X(t, "alt", e);
		}, [() => Z("gp.ownIcon")]), U(e, t);
	}, ie = (e) => {
		var t = $a();
		K(t, () => Wa(i()), !0), D(t), U(e, t);
	}, T = (e) => {
		var t = Nr();
		z(() => W(t, r() || "★")), U(e, t);
	};
	G(ne, (e) => {
		a() ? e(re) : i() && Ha[i()] ? e(ie, 1) : e(T, -1);
	}), D(te);
	var ae = R(te, 2), oe = (e) => {
		var t = eo(), r = F(t), i = (e) => {
			n(e);
		};
		G(r, (e) => {
			B(g) && e(i);
		}), D(t), ji(t, (e) => N(p, e), () => B(p)), z(() => {
			X(t, "id", l), vi(t, `position-anchor: ${c ?? ""}`);
		}), wr("toggle", t, y), U(e, t);
	}, se = (e) => {
		var t = to(), r = F(t);
		n(r), D(t), z(() => vi(t, `top: ${B(_).top ?? ""}px; left: ${B(_).left ?? ""}px`)), U(e, t);
	};
	G(ae, (e) => {
		s ? e(oe) : B(g) && e(se, 1);
	}), D(ee), ji(ee, (e) => N(f, e), () => B(f)), z(() => {
		X(te, "title", o()), X(te, "aria-label", o()), X(te, "popovertarget", s ? l : void 0), vi(te, s ? `anchor-name: ${c}` : void 0);
	}), V("click", te, function(...e) {
		(s ? void 0 : () => B(g) ? N(g, !1) : x())?.apply(this, e);
	}), U(e, ee), Xe();
}
Tr(["click", "change"]);
//#endregion
//#region src/lib/MarkPicker.svelte
var io = /* @__PURE__ */ H("<span class=\"mp-count svelte-1y5ipgc\"> </span>"), ao = /* @__PURE__ */ H("<button type=\"button\"><span class=\"mp-svg svelte-1y5ipgc\"></span></button>"), oo = /* @__PURE__ */ H("<p class=\"mp-hint svelte-1y5ipgc\"> </p>"), so = /* @__PURE__ */ H("<input class=\"mp-search svelte-1y5ipgc\" type=\"search\"/> <div class=\"mp-scroll svelte-1y5ipgc\"><div class=\"mp-grid svelte-1y5ipgc\"><button type=\"button\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" aria-hidden=\"true\" class=\"svelte-1y5ipgc\"><circle cx=\"12\" cy=\"12\" r=\"8.5\"></circle><path d=\"M6 18L18 6\"></path></svg></button> <!></div> <!></div>", 1), co = /* @__PURE__ */ H("<button type=\"button\"><img alt=\"\" class=\"svelte-1y5ipgc\"/></button>"), lo = /* @__PURE__ */ H("<div class=\"mp-scroll svelte-1y5ipgc\"><div class=\"mp-grid mp-grid-img svelte-1y5ipgc\"><button type=\"button\" class=\"mp-cell mp-upload svelte-1y5ipgc\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" aria-hidden=\"true\" class=\"svelte-1y5ipgc\"><path d=\"M12 5v14\"></path><path d=\"M5 12h14\"></path></svg> <span> </span></button> <!></div> <p class=\"mp-hint svelte-1y5ipgc\"> </p></div> <input type=\"file\" accept=\"image/*\" hidden=\"\"/>", 1), uo = /* @__PURE__ */ H("<div class=\"mp-tabs svelte-1y5ipgc\" role=\"group\"><button type=\"button\"> </button> <button type=\"button\"> <!></button></div> <!>", 1), fo = /* @__PURE__ */ H("<img class=\"mp-own svelte-1y5ipgc\" alt=\"\"/>"), po = /* @__PURE__ */ H("<span class=\"mp-svg svelte-1y5ipgc\"></span>"), mo = /* @__PURE__ */ H("<span class=\"mp-empty svelte-1y5ipgc\" aria-hidden=\"true\">+</span>"), ho = /* @__PURE__ */ H("<div class=\"mp-pop mp-anchored svelte-1y5ipgc\" popover=\"auto\"><!></div>"), go = /* @__PURE__ */ H("<div class=\"mp-pop svelte-1y5ipgc\"><!></div>"), _o = /* @__PURE__ */ H("<span class=\"mp svelte-1y5ipgc\"><button type=\"button\"><!></button> <!></span>");
function vo(e, t) {
	Ye(t, !0);
	let n = (e) => {
		var t = uo(), n = I(t), a = F(n);
		let c;
		var l = L(a, !0), u = R(a, 2);
		let d;
		var f = F(u, !0), p = R(f), h = (e) => {
			var t = io(), n = L(t, !0);
			z(() => W(n, B(x).length)), U(e, t);
		};
		G(p, (e) => {
			B(x).length && e(h);
		}), D(u), D(n);
		var v = R(n, 2), y = (e) => {
			var t = so(), n = I(t);
			J(n);
			var a = R(n, 2), o = F(a), c = F(o);
			let l;
			Yr(R(c, 2), 17, () => B(b), ({ id: e }) => e, (e, t) => {
				let n = () => B(t).id;
				var a = ao();
				let o;
				var s = F(a);
				K(s, () => Wa(n()), !0), D(s), D(a), z((e, t) => {
					o = q(a, 1, "mp-cell svelte-1y5ipgc", null, o, { active: n() === r() && !i() }), X(a, "title", e), X(a, "aria-label", t);
				}, [() => Z(Ha[n()].labelKey), () => Z(Ha[n()].labelKey)]), V("click", a, () => te(n())), U(e, a);
			}), D(o);
			var u = R(o, 2), d = (e) => {
				var t = oo(), n = L(t, !0);
				z((e) => W(n, e), [() => Z("mp.noHits")]), U(e, t);
			};
			G(u, (e) => {
				B(b).length || e(d);
			}), D(a), z((e, t) => {
				X(n, "placeholder", e), X(n, "aria-label", t), l = q(c, 1, "mp-cell mp-none svelte-1y5ipgc", null, l, { active: !r() && !i() }), X(c, "title", s()), X(c, "aria-label", s());
			}, [() => Z("mp.search"), () => Z("mp.search")]), Di(n, () => B(_), (e) => N(_, e)), V("click", c, re), U(e, t);
		}, S = (e) => {
			var t = lo(), n = I(t), r = F(n), a = F(r), o = L(R(F(a), 2), !0);
			D(a), Yr(R(a, 2), 16, () => B(x), (e) => e, (e, t) => {
				var n = co();
				let r;
				var a = L(n);
				z(() => {
					r = q(n, 1, "mp-cell mp-img svelte-1y5ipgc", null, r, { active: t === i() }), X(a, "src", t);
				}), V("click", n, () => ne(t)), U(e, n);
			}), D(r);
			var s = L(R(r, 2), !0);
			D(n);
			var c = R(n, 2);
			ji(c, (e) => N(m, e), () => B(m)), z((e, t) => {
				W(o, e), W(s, t);
			}, [() => Z("mp.upload"), () => Z("mp.imagesHint")]), V("click", a, () => B(m).click()), V("change", c, ie), U(e, t);
		};
		G(v, (e) => {
			B(g) === "icons" ? e(y) : e(S, -1);
		}), z((e, t) => {
			X(n, "aria-label", o()), c = q(a, 1, "mp-tab svelte-1y5ipgc", null, c, { on: B(g) === "icons" }), X(a, "aria-pressed", B(g) === "icons"), W(l, e), d = q(u, 1, "mp-tab svelte-1y5ipgc", null, d, { on: B(g) === "images" }), X(u, "aria-pressed", B(g) === "images"), W(f, t);
		}, [() => Z("mp.icons"), () => Z("mp.images")]), V("click", a, () => N(g, "icons")), V("click", u, () => N(g, "images")), U(e, t);
	}, r = Mi(t, "icon", 3, ""), i = Mi(t, "image", 3, ""), a = Mi(t, "images", 19, () => []), o = Mi(t, "label", 19, () => Z("mp.pickMark")), s = Mi(t, "noneLabel", 19, () => Z("common.none")), c = Mi(t, "klass", 3, ""), l = $i(), u = ta("urd-mp"), d = u.slice(2), f = /* @__PURE__ */ M(null), p = /* @__PURE__ */ M(null), m = /* @__PURE__ */ M(null), h = /* @__PURE__ */ M(!1), g = /* @__PURE__ */ M("icons"), _ = /* @__PURE__ */ M(""), v = /* @__PURE__ */ M(tn({
		top: 0,
		left: 0
	})), y = Ua.flatMap(([e, t]) => t.map((t) => ({
		id: t,
		cat: e
	}))), b = /* @__PURE__ */ A(() => {
		let e = B(_).trim().toLowerCase();
		return e ? y.filter(({ id: t }) => {
			let n = Z(Ha[t].labelKey) || Ha[t].label;
			return t.includes(e) || n.toLowerCase().includes(e);
		}) : y;
	}), x = /* @__PURE__ */ A(() => [...new Set(a().filter(Boolean))]);
	function S() {
		N(_, ""), N(g, i() ? "images" : "icons", !0);
	}
	function C(e) {
		N(h, e.newState === "open"), na(B(f), B(h)), B(h) && S();
	}
	function w() {
		l && B(p)?.hidePopover(), N(h, !1);
	}
	function ee() {
		S();
		let e = B(f).getBoundingClientRect();
		N(v, {
			left: Math.max(8, Math.min(e.left, window.innerWidth - 286 - 8)),
			top: e.bottom + 332 + 8 > window.innerHeight ? Math.max(8, e.top - 332 - 8) : e.bottom + 6
		}, !0), N(h, !0);
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
	function ie(e) {
		let n = e.target.files?.[0];
		e.target.value = "", n && t.onfile?.(n);
	}
	xn(() => {
		if (!B(h)) return;
		let e = () => w();
		if (window.addEventListener("blur", e), l) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			B(f) && !B(f).contains(e.target) && N(h, !1);
		}, n = (e) => {
			e.key === "Escape" && N(h, !1);
		}, r = (e) => {
			B(f) && e.target instanceof Node && !B(f).contains(e.target) && N(h, !1);
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var T = _o(), ae = F(T), oe = F(ae), se = (e) => {
		var n = Pr();
		ti(I(n), () => t.children), U(e, n);
	}, ce = (e) => {
		var t = fo();
		z(() => X(t, "src", i())), U(e, t);
	}, E = (e) => {
		var t = po();
		K(t, () => Wa(r()), !0), D(t), U(e, t);
	}, le = (e) => {
		U(e, mo());
	};
	G(oe, (e) => {
		t.children ? e(se) : i() ? e(ce, 1) : r() && Ha[r()] ? e(E, 2) : e(le, -1);
	}), D(ae);
	var ue = R(ae, 2), de = (e) => {
		var t = ho(), r = F(t), i = (e) => {
			n(e);
		};
		G(r, (e) => {
			B(h) && e(i);
		}), D(t), ji(t, (e) => N(p, e), () => B(p)), z(() => {
			X(t, "id", d), vi(t, `position-anchor: ${u ?? ""}`);
		}), wr("toggle", t, C), U(e, t);
	}, fe = (e) => {
		var t = go(), r = F(t);
		n(r), D(t), z(() => vi(t, `top: ${B(v).top ?? ""}px; left: ${B(v).left ?? ""}px`)), U(e, t);
	};
	G(ue, (e) => {
		l ? e(de) : B(h) && e(fe, 1);
	}), D(T), ji(T, (e) => N(f, e), () => B(f)), z(() => {
		q(ae, 1, `mp-trigger ${c() ?? ""}`, "svelte-1y5ipgc"), X(ae, "title", o()), X(ae, "aria-label", o()), X(ae, "popovertarget", l ? d : void 0), vi(ae, l ? `anchor-name: ${u}` : void 0);
	}), V("click", ae, function(...e) {
		(l ? void 0 : () => B(h) ? N(h, !1) : ee())?.apply(this, e);
	}), U(e, T), Xe();
}
Tr(["click", "change"]);
//#endregion
//#region src/lib/previewBridge.js
function yo(e, t = {}) {
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
		sendDemoMotion() {
			r({ type: "urd-demo-motion" });
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
function bo(e, t) {
	return !(e > 0) || !(t > 0) ? 1 : e / t;
}
function xo(e, t, n, r = 0, i = 0) {
	if (n === "full") return 1;
	let a = i > 0 ? bo(r, i) : Infinity;
	return Math.max(.1, Math.min(1, bo(e, t), a));
}
//#endregion
//#region src/lib/deploy-wait.js
function So(e, { max: t = 8 } = {}) {
	let n = (e ?? []).filter((e) => e && typeof e.path == "string" && typeof e.content == "string" && e.encoding === "utf-8" && !e.delete && (e.path.startsWith("content/") || e.path === "plugins/plugins.json"));
	return n.sort((e, t) => (e.path === "content/site.json" ? -1 : 0) - (t.path === "content/site.json" ? -1 : 0)), n.slice(0, t).map(({ path: e, content: t }) => ({
		path: e,
		content: t
	}));
}
async function Co(e, { fetchFn: t = fetch, delayMs: n = 1e4, attempts: r = 18, sleep: i = (e) => new Promise((t) => setTimeout(t, e)) } = {}) {
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
var wo = 3840, To = 2400, Eo = (e, t, n) => Math.min(n, Math.max(t, e));
function Do({ innerWidth: e = 0, screenWidth: t = 0 } = {}) {
	let n = e > 0 ? e : t;
	return Math.max(1, Math.round(n > 0 ? n : 1));
}
function Oo(e) {
	return !e || typeof e.innerWidth != "number" ? null : Do({
		innerWidth: e.innerWidth,
		screenWidth: e.screen?.width ?? 0
	});
}
function ko(e, t) {
	let n = e && typeof e == "object" && !Array.isArray(e) ? e : {}, r = n.mode === "custom" ? "custom" : "own", i = Number(n.width), a = Eo(Number.isFinite(i) && i > 0 ? i : t, 640, wo), o = Number(n.height), s = Number.isFinite(o) && o > 0 ? Eo(o, 480, To) : 0;
	return {
		mode: r,
		width: Math.round(a),
		height: Math.round(s)
	};
}
function Ao(e, t) {
	return e?.mode === "custom" ? {
		width: e.width,
		height: e.height || 0
	} : {
		width: t,
		height: 0
	};
}
var jo = 1920, Mo = [
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
], No = [
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
], Po = [
	1920,
	1536,
	1366
];
function Fo(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 1440;
	let n = Math.round(t / 20) * 20;
	return Math.min(jo, Math.max(960, n));
}
function Io(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 6;
	let n = Math.round(t / 1) * 1;
	return Math.min(12, Math.max(0, n));
}
function Lo(e, t) {
	if (e === "full") return 0;
	let n = Math.min(49, Math.max(0, Number(t) || 0));
	return Math.ceil(Number(e) / (1 - 2 * n / 100));
}
function Ro(e, t, n) {
	let r = Math.max(0, Number(t) || 0) / 100 * n, i = Math.max(0, n - 2 * r), a = e !== "full" && Number(e) < i, o = a ? Number(e) : i;
	return {
		width: o,
		margin: Math.round((n - o) / 2),
		pct: n > 0 ? o / n * 100 : 0,
		bound: a
	};
}
function zo(e) {
	return No.find((t) => t.width === e)?.id ?? null;
}
//#endregion
//#region src/lib/nav-size.js
var Bo = {
	min: 0,
	max: 64,
	step: 1
}, Vo = {
	min: 12,
	max: 28,
	step: 1
}, Ho = {
	min: 0,
	max: 80,
	step: 1
}, Uo = {
	min: 0,
	max: 64,
	step: 1
}, Wo = {
	min: 480,
	max: 1920,
	step: 20
}, Go = {
	min: .3,
	max: .8,
	step: .05
}, Ko = {
	min: 0,
	max: 400,
	step: 10
}, qo = {
	min: 0,
	max: 1200,
	step: 20
}, Jo = {
	min: 0,
	max: 64,
	step: 1
}, Yo = {
	min: 180,
	max: 400,
	step: 1
}, Xo = {
	min: 12,
	max: 128,
	step: 1
}, Zo = {
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
}, Qo = [
	"sm",
	"md",
	"lg",
	"xl"
], $o = .67;
function es(e) {
	return e === "floating" || e === "floating-square" || e === "floating-tab";
}
function ts(e, { min: t, max: n, step: r = 1 }, i) {
	let a = Number(e);
	if (e == null || e === "" || !Number.isFinite(a)) return i;
	let o = Math.round(a / r) * r, s = Math.min(n, Math.max(t, o));
	return r < 1 ? Math.round(s * 100) / 100 : s;
}
function ns(e, t) {
	if (e?.padY != null && e.padY !== "") return ts(e.padY, Bo, Zo.md.padY);
	let n = Zo[e?.size] ?? Zo.md;
	return Math.round(n.padY * (es(t) ? $o : 1));
}
function rs(e) {
	if (e?.textSize != null && e.textSize !== "") return ts(e.textSize, Vo, Zo.md.textSize);
	let t = Zo[e?.size] ?? Zo.md;
	return Math.round(t.textSize);
}
function is(e) {
	return e?.padY != null && e.padY !== "" || e?.textSize != null && e.textSize !== "" ? null : Qo.includes(e?.size) ? e.size : "md";
}
//#endregion
//#region src/lib/Dropdown.svelte
var as = /* @__PURE__ */ H("<span aria-hidden=\"true\"><svg viewBox=\"0 0 16 16\" width=\"1em\" height=\"1em\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"svelte-vtocc6\"><path d=\"M3.5 6l4.5 4.5L12.5 6\"></path></svg></span>"), os = /* @__PURE__ */ H("<button type=\"button\"> </button>"), ss = /* @__PURE__ */ H("<button type=\"button\"><span class=\"dd-value svelte-vtocc6\"> </span> <!></button> <div class=\"dd-pop dd-anchored svelte-vtocc6\" popover=\"auto\"><!></div>", 1), cs = /* @__PURE__ */ H("<div class=\"dd-pop svelte-vtocc6\"></div>"), ls = /* @__PURE__ */ H("<button type=\"button\"><span class=\"dd-value svelte-vtocc6\"> </span> <!></button> <!>", 1), us = /* @__PURE__ */ H("<span class=\"dd svelte-vtocc6\"><!></span>");
function Q(e, t) {
	Ye(t, !0);
	let n = (e) => {
		var t = as();
		let n;
		z(() => n = q(t, 1, "dd-caret svelte-vtocc6", null, n, { "dd-caret-open": B(f) })), U(e, t);
	}, r = Mi(t, "value", 3, null), i = Mi(t, "options", 19, () => []), a = Mi(t, "title", 3, null), o = Mi(t, "disabled", 3, !1), s = Mi(t, "filled", 3, !1), c = Mi(t, "compact", 3, !1), l = $i(), u = ta("urd-dd"), d = u.slice(2), f = /* @__PURE__ */ M(!1), p = /* @__PURE__ */ M(null), m = /* @__PURE__ */ M(null), g = /* @__PURE__ */ M(tn({
		top: 0,
		left: 0,
		width: 160
	})), _ = () => i().find(([e]) => `${e ?? ""}` == `${r() ?? ""}`)?.[1] ?? "";
	function v() {
		let e = B(p).getBoundingClientRect(), t = Math.min(320, i().length * 32 + 12), n = Math.max(e.width, 160), r = e.bottom + t + 8 <= window.innerHeight;
		N(g, {
			top: r ? e.bottom + 4 : Math.max(8, e.top - t - 4),
			left: Math.max(8, Math.min(e.left, window.innerWidth - n - 8)),
			width: n
		}, !0);
	}
	function y() {
		if (!o()) {
			if (B(f)) {
				N(f, !1);
				return;
			}
			v(), N(f, !0);
		}
	}
	function b(e) {
		l && B(m)?.hidePopover(), N(f, !1), t.onchange?.(e);
	}
	xn(() => {
		if (!B(f)) return;
		let e = () => {
			l ? B(m)?.hidePopover() : N(f, !1);
		};
		if (window.addEventListener("blur", e), l) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			B(p) && !B(p).contains(e.target) && N(f, !1);
		}, n = (e) => {
			e.key === "Escape" && N(f, !1);
		}, r = (e) => {
			B(p) && e.target instanceof Node && !B(p).contains(e.target) && v();
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var x = us(), S = F(x), C = (e) => {
		var t = ss(), l = I(t);
		let p;
		var g = F(l), v = L(g, !0), y = R(g, 2);
		n(y), D(l);
		var x = R(l, 2), S = F(x), C = (e) => {
			var t = Pr();
			Yr(I(t), 17, i, ([e, t]) => `${e ?? ""}`, (e, t) => {
				var n = /* @__PURE__ */ A(() => h(B(t), 2));
				let i = () => B(n)[0], a = () => B(n)[1];
				var o = os();
				let s;
				var c = L(o, !0);
				z(() => {
					s = q(o, 1, "dd-opt svelte-vtocc6", null, s, { selected: `${i() ?? ""}` == `${r() ?? ""}` }), W(c, a());
				}), V("click", o, () => b(i())), U(e, o);
			}), U(e, t);
		};
		G(S, (e) => {
			B(f) && e(C);
		}), D(x), ji(x, (e) => N(m, e), () => B(m)), z((e) => {
			p = q(l, 1, "dd-btn svelte-vtocc6", null, p, {
				"dd-filled": s(),
				"dd-compact": c()
			}), X(l, "title", a()), l.disabled = o(), X(l, "popovertarget", d), vi(l, `anchor-name: ${u ?? ""}`), W(v, e), X(x, "id", d), vi(x, `position-anchor: ${u ?? ""}`);
		}, [() => _()]), wr("toggle", x, (e) => {
			N(f, e.newState === "open");
		}), U(e, t);
	}, w = (e) => {
		var t = ls(), l = I(t);
		let u;
		var d = F(l), p = L(d, !0), m = R(d, 2);
		n(m), D(l);
		var v = R(l, 2), x = (e) => {
			var t = cs();
			Yr(t, 21, i, ([e, t]) => `${e ?? ""}`, (e, t) => {
				var n = /* @__PURE__ */ A(() => h(B(t), 2));
				let i = () => B(n)[0], a = () => B(n)[1];
				var o = os();
				let s;
				var c = L(o, !0);
				z(() => {
					s = q(o, 1, "dd-opt svelte-vtocc6", null, s, { selected: `${i() ?? ""}` == `${r() ?? ""}` }), W(c, a());
				}), V("click", o, () => b(i())), U(e, o);
			}), D(t), z(() => vi(t, `top: ${B(g).top ?? ""}px; left: ${B(g).left ?? ""}px; min-width: ${B(g).width ?? ""}px`)), U(e, t);
		};
		G(v, (e) => {
			B(f) && e(x);
		}), z((e) => {
			u = q(l, 1, "dd-btn svelte-vtocc6", null, u, {
				"dd-filled": s(),
				"dd-compact": c()
			}), X(l, "title", a()), l.disabled = o(), W(p, e);
		}, [() => _()]), V("click", l, y), U(e, t);
	};
	G(S, (e) => {
		l ? e(C) : e(w, -1);
	}), D(x), ji(x, (e) => N(p, e), () => B(p)), U(e, x), Xe();
}
Tr(["click"]);
//#endregion
//#region src/lib/Choice.svelte
var ds = /* @__PURE__ */ H("<button type=\"button\"> </button>"), fs = /* @__PURE__ */ H("<div><span class=\"choice-label svelte-1ehof1c\"> </span> <div class=\"choice-seg svelte-1ehof1c\" role=\"group\"></div></div>");
function ps(e, t) {
	Ye(t, !0);
	let n = Mi(t, "title", 3, void 0), r = /* @__PURE__ */ A(() => t.options.length > 3 || t.options.reduce((e, [, t]) => e + `${t}`.length, 0) > 20), i = (e) => `${e ?? ""}`;
	var a = fs();
	let o;
	var s = F(a), c = L(s, !0), l = R(s, 2);
	Yr(l, 21, () => t.options, ([e, t]) => i(e), (e, n) => {
		var r = /* @__PURE__ */ A(() => h(B(n), 2));
		let a = () => B(r)[0], o = () => B(r)[1];
		var s = ds();
		let c;
		var l = L(s, !0);
		z((e, t) => {
			X(s, "aria-pressed", e), c = q(s, 1, "svelte-1ehof1c", null, c, { on: t }), W(l, o());
		}, [() => i(a()) === i(t.value), () => i(a()) === i(t.value)]), V("click", s, () => t.onchange(a())), U(e, s);
	}), D(l), D(a), z(() => {
		o = q(a, 1, "choice svelte-1ehof1c", null, o, { stacked: B(r) }), X(a, "title", n()), W(c, t.label), X(l, "aria-label", t.label);
	}), U(e, a), Xe();
}
Tr(["click"]);
//#endregion
//#region src/lib/IconEditor.svelte
var ms = /* @__PURE__ */ H("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\"> </h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\"></canvas> <p class=\"ie-hint svelte-e7sog7\"> </p></div> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"ghost svelte-e7sog7\"> </button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"primary svelte-e7sog7\"> </button></span></div></div>");
function hs(e, t) {
	Ye(t, !0);
	let n = Mi(t, "image", 3, ""), r = /* @__PURE__ */ M(null), i = /* @__PURE__ */ M(null), a = /* @__PURE__ */ M(1), o = /* @__PURE__ */ M(.5), s = /* @__PURE__ */ M(.5), c = /* @__PURE__ */ M(1), l = /* @__PURE__ */ M(1), u = /* @__PURE__ */ M(1);
	xn(() => {
		if (!n()) return;
		let e = new Image();
		e.onload = () => {
			N(i, e, !0);
		}, e.src = n();
	});
	function d(e, t) {
		if (e.clearRect(0, 0, t, t), !B(i)) return;
		e.filter = `brightness(${B(c)}) contrast(${B(l)}) saturate(${B(u)})`;
		let n = Math.max(t / B(i).width, t / B(i).height) * B(a), r = B(i).width * n, d = B(i).height * n, f = t / 2 - B(o) * r, p = t / 2 - B(s) * d;
		f = Math.min(0, Math.max(t - r, f)), p = Math.min(0, Math.max(t - d, p)), e.drawImage(B(i), f, p, r, d), e.filter = "none";
	}
	xn(() => {
		B(i), B(a), B(o), B(s), B(c), B(l), B(u), B(r) && d(B(r).getContext("2d"), 220);
	});
	function f(e) {
		if (!B(i)) return;
		e.preventDefault();
		let t = e.clientX, n = e.clientY, r = Math.max(220 / B(i).width, 220 / B(i).height) * B(a), c = B(i).width * r, l = B(i).height * r, u = (e) => {
			N(o, Math.min(1, Math.max(0, B(o) - (e.clientX - t) / c)), !0), N(s, Math.min(1, Math.max(0, B(s) - (e.clientY - n) / l)), !0), t = e.clientX, n = e.clientY;
		}, d = () => {
			window.removeEventListener("pointermove", u), window.removeEventListener("pointerup", d);
		};
		window.addEventListener("pointermove", u), window.addEventListener("pointerup", d);
	}
	function p() {
		N(a, 1), N(o, .5), N(s, .5), N(c, 1), N(l, 1), N(u, 1);
	}
	function m() {
		let e = document.createElement("canvas");
		e.width = 128, e.height = 128, d(e.getContext("2d"), 128), t.onapply?.(e.toDataURL("image/webp", .92));
	}
	var h = ms(), g = F(h), _ = F(g), v = L(_, !0), y = R(_, 2), b = F(y);
	X(b, "width", 220), X(b, "height", 220), ji(b, (e) => N(r, e), () => B(r));
	var x = L(R(b, 2), !0);
	D(y);
	var S = R(y, 2), C = F(S), w = L(R(C));
	D(S);
	var ee = R(S, 2);
	J(ee);
	var te = R(ee, 2), ne = F(te), re = L(R(ne));
	D(te);
	var ie = R(te, 2);
	J(ie);
	var T = R(ie, 2), ae = F(T), oe = L(R(ae));
	D(T);
	var se = R(T, 2);
	J(se);
	var ce = R(se, 2), E = F(ce), le = L(R(E));
	D(ce);
	var ue = R(ce, 2);
	J(ue);
	var de = R(ue, 2), fe = F(de), pe = L(fe, !0), me = R(fe, 2), he = L(me, !0);
	D(de);
	var ge = R(de, 2), _e = F(ge), ve = L(_e, !0), ye = R(_e, 2), be = L(ye, !0);
	D(ge), D(g), D(h), z((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) => {
		W(v, e), X(b, "title", t), W(x, n), W(C, `${r ?? ""} `), W(w, `${i ?? ""}x`), W(ne, `${a ?? ""} `), W(re, `${o ?? ""}%`), W(ae, `${s ?? ""} `), W(oe, `${c ?? ""}%`), W(E, `${l ?? ""} `), W(le, `${u ?? ""}%`), W(pe, d), W(he, f), W(ve, p), W(be, m);
	}, [
		() => Z("ie.title"),
		() => Z("ie.dragTip"),
		() => Z("ie.hint"),
		() => Z("lbl.zoom"),
		() => B(a).toFixed(2),
		() => Z("lbl.brightness"),
		() => Math.round(B(c) * 100),
		() => Z("lbl.contrast"),
		() => Math.round(B(l) * 100),
		() => Z("lbl.saturate"),
		() => Math.round(B(u) * 100),
		() => Z("ie.grayscale"),
		() => Z("common.reset"),
		() => Z("confirm.cancel"),
		() => Z("common.apply")
	]), V("pointerdown", b, f), Di(ee, () => B(a), (e) => N(a, e)), Di(ie, () => B(c), (e) => N(c, e)), Di(se, () => B(l), (e) => N(l, e)), Di(ue, () => B(u), (e) => N(u, e)), V("click", fe, () => N(u, 0)), V("click", me, p), V("click", _e, () => t.oncancel?.()), V("click", ye, m), U(e, h), Xe();
}
Tr(["pointerdown", "click"]);
//#endregion
//#region ../template/assets/engine/0.7.4/blocks/form.js
var gs = () => [
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
], _s = 24, vs = {
	"oppsett-byttet": "layout-changed",
	"blokk-endret": "block-edited",
	"desktop-endret-etter-mobil": "desktop-changed-after-mobile",
	seksjonshøyde: "section-height",
	"blokk-flyttet": "block-moved",
	"blokk-slettet": "block-deleted",
	"blokk-lagt-til": "block-added"
};
function ys(e, t) {
	if (!e || !("y" in e || "h" in e)) return e ?? null;
	if (t && e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h) return null;
	let n = {
		x: e.x,
		w: e.w
	};
	return Number.isFinite(e.y) && (n.row = Math.max(1, Math.round((e.y - _s) / 8) + 1), n.rows = Number.isFinite(e.h) ? Math.max(1, Math.ceil(e.h / 8)) : 1), Number.isFinite(e.z) && e.z !== 1 && (n.z = e.z), e.rot && (n.rot = e.rot), n;
}
var bs = {
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
}, xs = { bildegalleri: "slideshow" }, Ss = {
	flate: "surface",
	aksent: "accent",
	invers: "inverse",
	dus: "soft",
	dempet: "muted",
	dyp: "deep",
	uthevet: "highlighted"
}, Cs = {
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
function ws(e) {
	let t = Array.isArray(e) ? e : e.blocks ?? [];
	for (let e of t) bs[e.type] && (e.type = bs[e.type]);
	if (!Array.isArray(e)) {
		for (let t of e.background?.layers ?? []) xs[t.type] && (t.type = xs[t.type]);
		Ss[e.theme] && (e.theme = Ss[e.theme]), Cs[e.preset] && (e.preset = Cs[e.preset]);
	}
	return e;
}
var Ts = {
	1: (e) => {
		for (let t of e.sections ?? []) {
			let e = t.responsive?.mobile;
			for (let e of t.blocks ?? []) e.decor && (e.hideMobile = !0), e.frames?.mobile && (e.frames.mobile = ys(e.frames.mobile, e.frames.desktop));
			e?.mode === "manual" && (e.mode = "auto");
			let n = e?.attention?.reason;
			n && vs[n] && (e.attention.reason = vs[n]);
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) ws(t);
		return e;
	},
	3: (e) => {
		for (let t of e.sections ?? []) ws(t);
		return e;
	}
}, Es = {
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
function Ds(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 4;) {
		let r = Es[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function Os(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 4;) {
		let i = Ts[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/plugins.js
function ks(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var As = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function js(e, t) {
	let n = ks(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = ks(t[2]), a = As(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var Ms = /^[a-z0-9][a-z0-9-]*$/;
function Ns(e) {
	let t = [];
	if (!e || typeof e != "object") return ["the manifest is not an object"];
	Ms.test(e.id ?? "") || t.push("id is missing or invalid"), (typeof e.name != "string" || !e.name) && t.push("name is missing"), ks(e.version ?? "") || t.push("version is not semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine is missing");
	let n = Array.isArray(e.languages) && e.languages.length > 0;
	return (e.entry !== void 0 || !n) && (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry is missing or is not a .js file"), (e.provides !== void 0 || !n) && (!e.provides || typeof e.provides != "object") && t.push("provides is missing"), e.languages !== void 0 && t.push(...zi(e.languages)), e.locales !== void 0 && typeof e.locales != "boolean" && t.push("locales must be a boolean"), e.names !== void 0 && (typeof e.names != "object" || e.names === null || Array.isArray(e.names) || Object.values(e.names).some((e) => typeof e != "string" || !e)) && t.push("names must be an object mapping language code to name"), t;
}
Promise.resolve();
//#endregion
//#region ../template/assets/engine/0.7.4/sections/presets.js
function Ps(e) {
	return typeof crypto < "u" && crypto.randomUUID ? `${e}-${crypto.randomUUID().slice(0, 8)}` : `${e}-${[...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4))].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
var Fs = () => ({ mobile: {
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
}), Is = (e, t, n = {}) => ({
	id: Ps("blk"),
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
}), Ls = (e, t = {}) => ({
	id: Ps("blk"),
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
}), Rs = (e, t, n = {}) => ({
	id: Ps("blk"),
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
}), zs = (e, t, n = 40) => ({
	id: Ps("blk"),
	type: "icon",
	version: 1,
	props: {
		glyph: t,
		color: "accent",
		size: n
	},
	animation: null,
	frames: e
}), Bs = (e, t = {}) => ({
	id: Ps("blk"),
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
}), Vs = (e, t = {}) => ({
	id: Ps("blk"),
	type: "form",
	version: 1,
	props: {
		recipient: "",
		subject: "",
		mode: "mailto",
		endpoint: "",
		submitLabel: Z("form.sendDefault"),
		successText: Z("form.thanksDefault"),
		fields: gs(),
		...t
	},
	animation: null,
	frames: e
}), Hs = (e, t = {}) => ({
	id: Ps("blk"),
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
}), Us = () => ({
	type: "hover-lift",
	version: 1,
	props: {}
}), Ws = (e, t, n = {}) => ({
	id: Ps("blk"),
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
}), Gs = (e, t = {}) => ({
	id: Ps("blk"),
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
}), Ks = (e, t = {}) => ({
	id: Ps("blk"),
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
}), qs = (e, t = {}) => ({
	id: Ps("blk"),
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
}), Js = (e, t = {}) => ({
	id: Ps("blk"),
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
}), Ys = (e, t) => ({
	id: Ps("blk"),
	type: "faq",
	version: 1,
	props: {
		items: t,
		multi: !1
	},
	animation: null,
	frames: e
}), Xs = (e, t = {}) => ({
	id: Ps("blk"),
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
}), Zs = (e, t) => ({
	id: Ps("blk"),
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
}), Qs = (e, t = {}) => ({
	id: Ps("blk"),
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
}), $s = (...e) => ({
	version: 1,
	layers: e
}), ec = (e) => ({
	type: "color",
	version: 1,
	props: { value: e }
}), tc = (e, t, n, r = .5) => ({
	type: "glow",
	version: 1,
	props: {
		x: e,
		y: t,
		color: "accent",
		radius: r,
		opacity: n
	}
}), nc = (e) => Math.max(0, ...e.blocks.map((e) => e.frames.desktop.y + e.frames.desktop.h)), rc = (e, t, n, r, i, a) => ({
	x: n + e % t * r,
	y: i + Math.floor(e / t) * a
}), ic = (e, t, n, r, i, a, o, s, c = 0) => {
	let l = (t) => e.blocks.some((e) => {
		let n = e.frames.desktop;
		return n.x < t.x + t.w - .01 && t.x < n.x + n.w - .01 && n.y < t.y + t.h - .01 && t.y < n.y + n.h - .01;
	});
	for (let e = 0; e < 60; e++) {
		let u = rc(e, t, n, r, i, a);
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
		y: nc(e) + 16,
		n: 0
	};
}, ac = (e, t, n) => e + t * .1 + n * .01, oc = (e, t, n, r, i = null) => ({
	id: Ps("sec"),
	version: 1,
	preset: e,
	size: { minHeight: t },
	grid: i,
	background: n,
	blocks: r,
	responsive: Fs()
});
function sc(e) {
	e.sections.define("blank", {
		label: "Empty section",
		labelKey: "preset.blank.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "A blank canvas to build on freely",
		hintKey: "preset.blank.hint",
		create: () => oc("blank", "40vh", $s(ec("bg")), [])
	}), e.sections.define("hero", {
		label: "Hero",
		labelKey: "preset.hero.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Large opening with gradient and glow, left-aligned",
		hintKey: "preset.hero.hint",
		create: () => oc("hero", "70vh", {
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
				tc(.7, .2, .35),
				{
					type: "grain",
					version: 1,
					props: { opacity: .06 }
				}
			]
		}, [
			Is($(8.33, 40, 50, 38), Z("seed.hero.title")),
			Is($(8.33, 84, 41.67, 26), Z("seed.hero.intro")),
			Rs($(8.33, 118, 20, 32), Z("seed.readMore"))
		])
	}), e.sections.define("hero-centered", {
		label: "Hero, centred",
		labelKey: "preset.hero-centered.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Centred opening with two buttons",
		hintKey: "preset.hero-centered.hint",
		create: () => oc("hero-centered", "60vh", $s(ec("bg")), [
			Is($(15, 64, 70, 44), Z("seed.heroCenter.title"), { align: "center" }),
			Is($(25, 116, 50, 26), Z("seed.heroCenter.intro"), { align: "center" }),
			Rs($(31.5, 160, 17, 40), Z("seed.join")),
			Rs($(51.5, 160, 17, 40), Z("seed.readMore"), { style: "secondary" })
		])
	}), e.sections.define("images", {
		label: "Images",
		labelKey: "preset.images.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Title and three image frames",
		hintKey: "preset.images.hint",
		create: () => oc("images", "360px", $s(ec("bg")), [
			Is($(4, 24, 50, 32), Z("seed.images.title")),
			Ls($(4, 72, 28, 220)),
			Ls($(36, 72, 28, 220)),
			Ls($(68, 72, 28, 220))
		]),
		itemLabel: "image",
		itemLabelKey: "item.image",
		item: (e) => {
			let { x: t, y: n } = ic(e, 3, 4, 32, 72, 244, 28, 220);
			return {
				blocks: [Ls($(t, n, 28, 220))],
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
		create: () => oc("gallery", "440px", $s(ec("bg")), [Is($(4, 24, 50, 32), Z("seed.gallery.title")), Js($(4, 72, 92, 320))])
	}), e.sections.define("find-us", {
		label: "Find us",
		labelKey: "preset.find-us.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Map with your address (privacy-friendly OpenStreetMap)",
		hintKey: "preset.find-us.hint",
		create: () => oc("find-us", "480px", $s(ec("bg")), [Is($(6, 40, 60, 70), Z("seed.findUs.title")), Bs($(6, 120, 88, 360, 2))])
	}), e.sections.define("whats-on", {
		label: "What is on",
		labelKey: "preset.whats-on.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Event list from a subscribable calendar (iCal/Google)",
		hintKey: "preset.whats-on.hint",
		create: () => oc("whats-on", "520px", $s(ec("bg")), [Is($(6, 40, 60, 70), Z("seed.whatsOn.title")), Hs($(6, 130, 88, 320, 2), { limit: 5 })])
	}), e.sections.define("contact-form", {
		label: "Contact form",
		labelKey: "preset.contact-form.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Contact form that sends via email (or your own endpoint)",
		hintKey: "preset.contact-form.hint",
		create: () => oc("contact-form", "520px", $s(ec("bg")), [Is($(6, 40, 60, 120), Z("seed.contactForm.intro")), Vs($(6, 180, 60, 380, 2))])
	}), e.sections.define("contact", {
		label: "Contact",
		labelKey: "preset.contact.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Contact details in a card with an email button",
		hintKey: "preset.contact.hint",
		create: () => oc("contact", "320px", $s(ec("surface"), tc(.2, .8, .2)), [
			Is($(10, 32, 40, 36), Z("seed.contact.title")),
			Is($(10, 84, 36, 130), Z("seed.contact.info"), { box: !0 }),
			Rs($(60, 100, 22, 40), Z("seed.contact.button"), { href: `mailto:${Z("seed.email")}` })
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
				let i = zs($(e + 10.5, 88, 4, 52), n), a = Is($(e, 152, 25, 200), Z("seed.features.card", { title: r }), {
					align: "center",
					box: !0
				});
				return a.animation = Us(), i.mobileOrder = ac(88, t, 0), a.mobileOrder = ac(88, t, 1), [i, a];
			};
			return oc("feature-cards", "420px", $s(ec("bg")), [
				Is($(6, 28, 60, 38), Z("seed.features.title")),
				...e(6, 0, "✦", Z("seed.features.card1")),
				...e(37.5, 1, "★", Z("seed.features.card2")),
				...e(69, 2, "✓", Z("seed.features.card3"))
			]);
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = ic(e, 3, 6, 31.5, 152, 296, 25, 264, -64), i = zs($(t + 10.5, n - 64, 4, 52), "✦"), a = Is($(t, n, 25, 200), Z("seed.features.card", { title: Z("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return a.animation = Us(), i.mobileOrder = ac(88, r, 0), a.mobileOrder = ac(88, r, 1), {
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
				let r = Is($(e, 88, 25, 200), Z("seed.features.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.animation = Us(), r.mobileOrder = ac(88, t, 0), r;
			};
			return oc("feature-cards-simple", "360px", $s(ec("bg")), [
				Is($(6, 28, 60, 38), Z("seed.features.title")),
				e(6, 0, Z("seed.features.card1")),
				e(37.5, 1, Z("seed.features.card2")),
				e(69, 2, Z("seed.features.card3"))
			]);
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = ic(e, 3, 6, 31.5, 88, 232, 25, 200), i = Is($(t, n, 25, 200), Z("seed.features.card", { title: Z("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.animation = Us(), i.mobileOrder = ac(88, r, 0), {
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
				let n = Ls($(e, 88, 25, 160)), r = Is($(e, 256, 25, 160), Z("seed.news.card"));
				return n.mobileOrder = ac(88, t, 0), r.mobileOrder = ac(88, t, 1), [n, r];
			};
			return oc("news", "460px", $s(ec("bg")), [
				Is($(6, 28, 50, 38), Z("seed.news.title")),
				Rs($(78, 30, 16, 36), Z("seed.news.seeAll"), { style: "secondary" }),
				...e(6, 0),
				...e(37.5, 1),
				...e(69, 2)
			]);
		},
		itemLabel: "story",
		itemLabelKey: "item.story",
		item: (e) => {
			let { x: t, y: n, n: r } = ic(e, 3, 6, 31.5, 88, 344, 25, 328), i = Ls($(t, n, 25, 160)), a = Is($(t, n + 168, 25, 160), Z("seed.news.card"));
			return i.mobileOrder = ac(88, r, 0), a.mobileOrder = ac(88, r, 1), {
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
		create: () => oc("news-collection", "300px", $s(ec("bg")), [Is($(6, 28, 50, 38), Z("seed.news.title")), Ws($(6, 88, 88, 180), "cards")])
	}), e.sections.define("noticeboard", {
		label: "Noticeboard",
		labelKey: "preset.noticeboard.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Dated list from a collection (notices/announcements)",
		hintKey: "preset.noticeboard.hint",
		create: () => oc("noticeboard", "300px", $s(ec("surface")), [Is($(6, 28, 50, 38), Z("seed.noticeboard.title")), Ws($(6, 88, 88, 180), "list", { limit: 8 })])
	}), e.sections.define("publication-archive", {
		label: "Publication archive",
		labelKey: "preset.publication-archive.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Year-grouped archive from a collection (issues, minutes, reports)",
		hintKey: "preset.publication-archive.hint",
		create: () => oc("publication-archive", "300px", $s(ec("bg")), [Is($(6, 28, 60, 38), Z("seed.archive.title")), Ws($(6, 88, 88, 180), "archive", { limit: 0 })])
	}), e.sections.define("events", {
		label: "Events",
		labelKey: "preset.events.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Three rows with date badge and sign-up button",
		hintKey: "preset.events.hint",
		create: () => {
			let e = (e, t, n, r) => [
				Is($(6, e, 8, 88), Z("seed.events.dateBadge", {
					day: t,
					month: n
				}), {
					align: "center",
					box: !0
				}),
				Is($(16, e, 58, 88), Z("seed.events.row", { title: r })),
				Rs($(78, e + 24, 16, 40), Z("seed.events.signup"), { style: "secondary" })
			];
			return oc("events", "440px", $s(ec("surface")), [
				Is($(6, 28, 50, 38), Z("seed.events.title")),
				...e(88, "11", Z("seed.events.monthAug"), Z("seed.events.row1")),
				...e(196, "25", Z("seed.events.monthAug"), Z("seed.events.row2")),
				...e(304, "8", Z("seed.events.monthSep"), Z("seed.events.row3"))
			]);
		},
		itemLabel: "row",
		itemLabelKey: "item.row",
		item: (e) => {
			let t = nc(e) + 16;
			return {
				blocks: [
					Is($(6, t, 8, 88), Z("seed.events.newBadge"), {
						align: "center",
						box: !0
					}),
					Is($(16, t, 58, 88), Z("seed.events.row", { title: Z("seed.events.newTitle") })),
					Rs($(78, t + 24, 16, 40), Z("seed.events.signup"), { style: "secondary" })
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
				let r = Ls($(e, 80, 22, 180), { alt: Z("seed.team.alt") }), i = Is($(e, 268, 22, 84), Z("seed.team.member", { role: n }), { align: "center" });
				return r.mobileOrder = ac(80, t, 0), i.mobileOrder = ac(80, t, 1), [r, i];
			};
			return oc("team", "420px", $s(ec("surface")), [
				Is($(6, 24, 50, 32), Z("seed.team.title")),
				...e(7.5, 0, Z("seed.team.role1")),
				...e(39, 1, Z("seed.team.role2")),
				...e(70.5, 2, Z("seed.team.role3"))
			]);
		},
		itemLabel: "person",
		itemLabelKey: "item.person",
		item: (e) => {
			let { x: t, y: n, n: r } = ic(e, 3, 7.5, 31.5, 80, 288, 22, 272), i = Ls($(t, n, 22, 180), { alt: Z("seed.team.alt") }), a = Is($(t, n + 188, 22, 84), Z("seed.team.member", { role: Z("seed.team.roleNew") }), { align: "center" });
			return i.mobileOrder = ac(80, r, 0), a.mobileOrder = ac(80, r, 1), {
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
		create: () => oc("faq", "520px", $s(ec("bg")), [
			Is($(25, 24, 50, 36), Z("seed.faq.title"), { align: "center" }),
			Ys($(20, 80, 60, 320), [
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
			Is($(20, 416, 60, 32), Z("seed.faq.more"), { align: "center" })
		])
	}), e.sections.define("timeline", {
		label: "Timeline",
		labelKey: "preset.timeline.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Your story as events along a line",
		hintKey: "preset.timeline.hint",
		create: () => oc("timeline", "480px", $s(ec("bg")), [Is($(25, 24, 50, 36), Z("seed.timeline.title"), { align: "center" }), Zs($(25, 88, 50, 330), [
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
				let r = Is($(e, 88, 25, 72), `<h3>${t + 1}</h3>`, {
					align: "center",
					size: 44
				}), i = Is($(e, 168, 25, 160), Z("seed.steps.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.mobileOrder = ac(88, t, 0), i.mobileOrder = ac(88, t, 1), [r, i];
			};
			return oc("steps", "400px", $s(ec("bg")), [
				Is($(6, 28, 60, 38), Z("seed.steps.title")),
				...e(6, 0, Z("seed.steps.s1")),
				...e(37.5, 1, Z("seed.steps.s2")),
				...e(69, 2, Z("seed.steps.s3"))
			]);
		},
		itemLabel: "step",
		itemLabelKey: "item.step",
		item: (e) => {
			let { x: t, y: n, n: r } = ic(e, 3, 6, 31.5, 88, 272, 25, 240), i = Is($(t, n, 25, 72), `<h3>${r + 1}</h3>`, {
				align: "center",
				size: 44
			}), a = Is($(t, n + 80, 25, 160), Z("seed.steps.card", { title: Z("seed.steps.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.mobileOrder = ac(88, r, 0), a.mobileOrder = ac(88, r, 1), {
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
				Ls($(6, 40, 55, 300)),
				Is($(6, 348, 55, 108), Z("seed.feature.main")),
				Rs($(6, 464, 14, 38), Z("seed.readMore"), { style: "secondary" }),
				Ls($(66, 40, 28, 120)),
				Is($(66, 164, 28, 60), Z("seed.feature.small1")),
				Ls($(66, 244, 28, 120)),
				Is($(66, 368, 28, 60), Z("seed.feature.small2"))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = ac(40, t < 3 ? 0 : 1, t);
			}), oc("lead-story", "540px", $s(ec("bg")), e);
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
					Ls($(e, 88, 25, 200)),
					Is($(e, 296, 25, 76), Z("seed.products.card", {
						name: n,
						price: r
					}), { align: "center" }),
					Rs($(e + 5, 380, 15, 40), Z("seed.products.buy"))
				];
				return i.forEach((e, n) => {
					e.mobileOrder = ac(88, t, n);
				}), i;
			};
			return oc("products", "470px", $s(ec("bg")), [
				Is($(6, 28, 50, 38), Z("seed.products.title")),
				...e(6, 0, Z("seed.products.name"), Z("seed.products.price1")),
				...e(37.5, 1, Z("seed.products.name"), Z("seed.products.price2")),
				...e(69, 2, Z("seed.products.name"), Z("seed.products.price3"))
			]);
		},
		itemLabel: "product",
		itemLabelKey: "item.product",
		item: (e) => {
			let { x: t, y: n, n: r } = ic(e, 3, 6, 31.5, 88, 348, 25, 332), i = [
				Ls($(t, n, 25, 200)),
				Is($(t, n + 208, 25, 76), Z("seed.products.card", {
					name: Z("seed.products.name"),
					price: Z("seed.products.price1")
				}), { align: "center" }),
				Rs($(t + 5, n + 292, 15, 40), Z("seed.products.buy"))
			];
			return i.forEach((e, t) => {
				e.mobileOrder = ac(88, r, t);
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
		create: () => oc("shop", "544px", $s(ec("bg")), [
			Is($(6, 28, 50, 38), Z("seed.shop.title")),
			Ks($(78, 88, 16, 48)),
			Gs($(6, 176, 88, 320))
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
				Is($(6, 48, 52, 96), Z("seed.shopHero.title")),
				Is($(6, 152, 40, 48), Z("seed.shopHero.sub")),
				Rs($(6, 216, 17, 42), Z("seed.shopHero.cta")),
				Ls($(62, 40, 32, 300))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = ac(48, t < 3 ? 0 : 1, t);
			}), oc("shop-hero", "400px", {
				version: 1,
				layers: [
					ec("bg"),
					tc(.8, .25, .28, .6),
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
				let r = Ls($(e, 88, 21, 170)), i = Is($(e, 266, 21, 34), Z("seed.shopCategories.tile", { name: n }), { align: "center" });
				return r.mobileOrder = ac(88, t, 0), i.mobileOrder = ac(88, t, 1), [r, i];
			}, t = oc("shop-categories", "360px", $s(ec("bg")), [
				Is($(6, 28, 60, 38), Z("seed.shopCategories.title")),
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
			let { x: t, y: n, n: r } = ic(e, 4, 6, 23.5, 88, 220, 21, 212), i = Ls($(t, n, 21, 170)), a = Is($(t, n + 178, 21, 34), Z("seed.shopCategories.tile", { name: Z("seed.shopCategories.newCat") }), { align: "center" });
			return i.mobileOrder = ac(88, r, 0), a.mobileOrder = ac(88, r, 1), {
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
				let i = zs($(e + 10.5, 88, 4, 52), r, 44), a = Is($(e, 148, 25, 96), Z(n), { align: "center" });
				return i.mobileOrder = ac(88, t, 0), a.mobileOrder = ac(88, t, 1), [i, a];
			}, t = oc("shop-trust", "300px", $s(ec("bg")), [
				Is($(6, 28, 60, 38), Z("seed.shopTrust.title")),
				...e(6, 0, "seed.shopTrust.t1", "✓"),
				...e(37.5, 1, "seed.shopTrust.t2", "↻"),
				...e(69, 2, "seed.shopTrust.t3", "✉")
			]);
			return t.theme = "muted", t;
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = ic(e, 3, 6, 31.5, 148, 216, 25, 156, -60), i = zs($(t + 10.5, n - 60, 4, 52), "✓", 44), a = Is($(t, n, 25, 96), Z("seed.shopTrust.newItem"), { align: "center" });
			return i.mobileOrder = ac(88, r, 0), a.mobileOrder = ac(88, r, 1), {
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
				Is($(6, 56, 52, 100), Z("seed.shopShowcase.title")),
				Is($(6, 164, 42, 56), Z("seed.shopShowcase.text")),
				Rs($(6, 236, 18, 42), Z("seed.shopShowcase.cta")),
				Ls($(62, 48, 32, 240))
			];
			e.forEach((e, t) => {
				e.mobileOrder = ac(56, t < 3 ? 0 : 1, t);
			});
			let t = oc("shop-showcase", "340px", $s(ec("bg")), e);
			return t.theme = "deep", t;
		}
	}), e.sections.define("checkout", {
		label: "Checkout",
		labelKey: "preset.checkout.label",
		group: "Shop",
		groupKey: "presetGroup.shop",
		hint: "Order form that sends the basket as an email or to an endpoint",
		hintKey: "preset.checkout.hint",
		create: () => oc("checkout", "560px", $s(ec("bg")), [Is($(6, 28, 50, 38), Z("seed.checkout.title")), qs($(25, 96, 50, 430))])
	}), e.sections.define("cta", {
		label: "CTA banner",
		labelKey: "preset.cta.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Full width with one clear action",
		hintKey: "preset.cta.hint",
		create: () => oc("cta", "280px", $s(ec("surface"), tc(.5, .5, .3, .7)), [
			Is($(20, 56, 60, 40), Z("seed.cta.title"), { align: "center" }),
			Is($(25, 104, 50, 26), Z("seed.cta.sub"), { align: "center" }),
			Rs($(42, 148, 16, 42), Z("seed.join"))
		])
	}), e.sections.define("quote", {
		label: "Quote",
		labelKey: "preset.quote.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Large quote with attribution",
		hintKey: "preset.quote.hint",
		create: () => oc("quote", "300px", $s(ec("bg")), [Xs($(20, 56, 60, 190), {
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
				let a = Qs($(e, 76, 25, 120), {
					value: n,
					suffix: r,
					label: i
				});
				return a.mobileOrder = ac(76, t, 0), a;
			};
			return oc("stats", "260px", $s(ec("surface")), [
				e(6, 0, "120", "+", Z("seed.stats.l1")),
				e(37.5, 1, "25", "", Z("seed.stats.l2")),
				e(69, 2, "1981", "", Z("seed.stats.l3"))
			]);
		},
		itemLabel: "number",
		itemLabelKey: "item.number",
		item: (e) => {
			let { x: t, y: n, n: r } = ic(e, 3, 6, 31.5, 76, 140, 25, 120), i = Qs($(t, n, 25, 120), {
				value: "42",
				label: Z("seed.stats.newLabel")
			});
			return i.mobileOrder = ac(76, r, 0), {
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
			let e = (e) => Ls($(e, 108, 18.5, 100), {
				alt: Z("seed.sponsors.alt"),
				fit: "contain",
				radius: null,
				saturate: 0
			});
			return oc("sponsors", "280px", $s(ec("bg")), [
				Is($(6, 28, 60, 36), Z("seed.sponsors.title")),
				e(5.5),
				e(29),
				e(52.5),
				e(76)
			]);
		},
		itemLabel: "logo",
		itemLabelKey: "item.logo",
		item: (e) => {
			let { x: t, y: n } = ic(e, 4, 5.5, 23.5, 108, 124, 18.5, 100);
			return {
				blocks: [Ls($(t, n, 18.5, 100), {
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
		create: () => oc("membership", "500px", $s(ec("surface")), [
			Is($(6, 28, 50, 38), Z("seed.membership.title")),
			Is($(14, 88, 32, 250), Z("seed.membership.tier1"), {
				align: "center",
				box: !0
			}),
			Is($(54, 88, 32, 250), Z("seed.membership.tier2"), {
				align: "center",
				box: !0
			}),
			Rs($(42, 358, 16, 42), Z("seed.join")),
			Is($(25, 414, 50, 30), Z("seed.membership.vipps"), { align: "center" })
		])
	});
}
//#endregion
//#region ../template/assets/engine/0.7.4/templates-model.js
var cc = [
	"section",
	"blocks",
	"page"
];
function lc(e) {
	return Oa(String(e ?? ""), "");
}
function uc(e, t, { id: n, title: r }) {
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
var dc = [
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
function fc(e) {
	let t = String(e ?? "");
	return /[",\n\r]/.test(t) ? `"${t.replaceAll("\"", "\"\"")}"` : t;
}
function pc(e, t) {
	return t === "sizes" ? (e.sizes ?? []).join("|") : t === "colors" ? (e.colors ?? []).map((e) => e.name).join("|") : e[t] ?? "";
}
function mc(e) {
	let t = [dc.join(",")];
	for (let n of e ?? []) t.push(dc.map((e) => fc(pc(n, e))).join(","));
	return t.join("\n") + "\n";
}
function hc(e) {
	let t = [], n = [], r = "", i = !1, a = String(e ?? "");
	for (let e = 0; e < a.length; e += 1) {
		let o = a[e];
		i ? o === "\"" && a[e + 1] === "\"" ? (r += "\"", e += 1) : o === "\"" ? i = !1 : r += o : o === "\"" ? i = !0 : o === "," ? (n.push(r), r = "") : o === "\n" || o === "\r" ? (o === "\r" && a[e + 1] === "\n" && (e += 1), n.push(r), t.push(n), n = [], r = "") : r += o;
	}
	return (r !== "" || n.length) && (n.push(r), t.push(n)), t.filter((e) => e.some((e) => e.trim() !== ""));
}
var gc = (e) => String(e ?? "").split("|").map((e) => e.trim()).filter(Boolean);
function _c(e) {
	let t = hc(e);
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
		let s = gc(t.sizes);
		s.length && (o.sizes = s);
		let c = gc(t.colors);
		c.length && (o.colors = c.map((e) => ({ name: e }))), r.push(o);
	}
	return {
		entries: r,
		skipped: i
	};
}
//#endregion
//#region ../template/assets/engine/0.7.4/feeds.js
function vc(e) {
	return String(e ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&apos;");
}
function yc(e, t) {
	let n = String(t ?? "").replace(/\/+$/, "");
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${(e ?? []).filter((e) => !e.noindex).map((e) => `  <url><loc>${vc(n + (e.path === "/" ? "/" : e.path))}</loc></url>`).join("\n")}\n</urlset>\n`;
}
function bc(e) {
	return `User-agent: *\nDisallow: /admin/\n\nSitemap: ${String(e ?? "").replace(/\/+$/, "")}/sitemap.xml\n`;
}
var xc = [
	"news",
	"notices",
	"publications"
];
function Sc(e) {
	let t = String(e.origin ?? "").replace(/\/+$/, ""), n = (e.items ?? []).map((n) => {
		let r = n.href ? new URL(n.href, t + "/").href : t + "/", i = n.date ? new Date(n.date) : null, a = i && !Number.isNaN(i.getTime()) ? `\n      <pubDate>${i.toUTCString()}</pubDate>` : "", o = n.text ? `\n      <description>${vc(n.text)}</description>` : "";
		return `    <item>\n      <title>${vc(n.title)}</title>\n      <link>${vc(r)}</link>\n      <guid isPermaLink="false">${vc(`${e.path}#${n.id ?? n.title}`)}</guid>${o}${a}\n    </item>`;
	}).join("\n");
	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${vc(e.title)}</title>\n    <link>${vc(t + "/")}</link>\n    <description>${vc(e.description ?? e.title)}</description>\n${n}${n ? "\n" : ""}  </channel>\n</rss>\n`;
}
//#endregion
//#region ../template/assets/engine/0.7.4/preset-thumb.js
var Cc = /^#[0-9a-fA-F]{3,8}$/, wc = /^[a-z][a-z0-9-]*$/, Tc = "#171c26", Ec = "#232a38", Dc = "#98a1b3", Oc = "#7c5cff", kc = (e, t) => `var(--urd-color-${e}, ${t})`;
function Ac(e, t) {
	return typeof e == "string" ? Cc.test(e) ? e : wc.test(e) ? kc(e, t) : t : t;
}
function jc(e, t = 800) {
	let n = Number.parseFloat(e);
	return !Number.isFinite(n) || n <= 0 ? 400 : typeof e == "string" && e.trim().endsWith("vh") ? n / 100 * t : n;
}
var Mc = (e) => Math.round(e * 10) / 10, Nc = (e, t, n) => Math.min(n, Math.max(t, e)), Pc = (e, t, n, r, i, a = "") => `<rect x="${Mc(e)}" y="${Mc(t)}" width="${Mc(Math.max(n, 1))}" height="${Mc(Math.max(r, 1))}" fill="${i}"${a}/>`;
function Fc(e) {
	if (e?.theme) return e.theme === "inverse" || e.theme === "deep" ? kc("text", Dc) : e.theme === "accent" ? kc("accent", Oc) : kc("surface", Ec);
	for (let t of e?.background?.layers ?? []) {
		if (t.type === "color") return Ac(t.props?.value, Tc);
		if (t.type === "gradient") return Ac(Array.isArray(t.props?.stops) ? t.props.stops[0] : null, Tc);
	}
	return kc("bg", Tc);
}
function Ic(e, t, n, r, i) {
	let a = /<h[1-3]/.test(String(i?.html ?? "")), o = i?.align === "center", s = kc("text", Dc), c = [];
	i?.box && c.push(Pc(e, t, n, r, kc("surface", Ec), " rx=\"1.5\""));
	let l = i?.box ? Math.min(2, n * .06) : 0, u = e + l, d = n - l * 2, f = [
		.72,
		.9,
		.5
	], p = [
		a ? 4 : 2.2,
		2.2,
		2.2
	], m = Nc(r / (p[0] + p[1] + p[2] + 4.8 + 2), 0, 1), h = t + l + Math.min(1, r * .08);
	for (let e = 0; e < 3; e++) {
		let n = Math.min(Math.max(e === 0 ? a ? 1.4 : 1 : .8, p[e] * m), Math.max(r, 1));
		if (e > 0 && h + n > t + r - l) break;
		let i = d * f[e], g = o ? u + (d - i) / 2 : u;
		c.push(Pc(g, h, i, n, s, ` opacity="${e === 0 ? .8 : .4}" rx="${Mc(Math.min(1, n / 2))}"`)), h += n + Math.max(.8, 2.4 * m);
	}
	return c.join("");
}
function Lc(e, t, n, r, i = !1) {
	let a = kc("text", Dc), o = [];
	i ? (o.push(Pc(e, t, n, r, kc("surface", Ec), " rx=\"1.5\" opacity=\"0.35\"")), o.push(`<rect x="${Mc(e + .4)}" y="${Mc(t + .4)}" width="${Mc(Math.max(n - .8, 1))}" height="${Mc(Math.max(r - .8, 1))}" fill="none" stroke="${a}" stroke-width="0.6" stroke-dasharray="2 2" opacity="0.35" rx="1.5"/>`)) : o.push(Pc(e, t, n, r, kc("surface", Ec), " rx=\"1.5\""));
	let s = i ? .15 : .4, c = (t) => Mc(e + n * t), l = (e) => Mc(t + r * e);
	return o.push(`<polygon points="${c(.08)},${l(.9)} ${c(.42)},${l(.38)} ${c(.62)},${l(.68)} ${c(.75)},${l(.5)} ${c(.92)},${l(.9)}" fill="${a}" opacity="${s}"/>`), o.push(`<circle cx="${c(.28)}" cy="${l(.26)}" r="${Mc(Math.max(1, Math.min(n, r) * .1))}" fill="${a}" opacity="${Mc(s + .1)}"/>`), o.join("");
}
function Rc(e, t, n, r, i) {
	let a = !(Array.isArray(i?.images) && i.images.length), o = Math.max(1, n * .03), s = (n - o * 2) / 3, c = [];
	for (let n = 0; n < 3; n++) c.push(Lc(e + n * (s + o), t, s, r, a));
	return c.join("");
}
function zc(e, t, n, r) {
	let i = Math.max(1, n * .03), a = (n - i * 2) / 3, o = [];
	for (let n = 0; n < 3; n++) {
		let s = e + n * (a + i);
		o.push(Pc(s, t, a, r * .55, kc("surface", Ec), " rx=\"1.5\"")), o.push(Pc(s, t + r * .62, a * .8, 2, kc("text", Dc), " opacity=\"0.5\" rx=\"1\""));
	}
	return o.join("");
}
function Bc(e, t, n, r, i) {
	let a = Ac(i?.color, Oc), o = i?.kind;
	return o === "circle" ? `<ellipse cx="${Mc(e + n / 2)}" cy="${Mc(t + r / 2)}" rx="${Mc(Math.max(n / 2, 1))}" ry="${Mc(Math.max(r / 2, 1))}" fill="${a}" opacity="0.8"/>` : o === "triangle" ? `<polygon points="${Mc(e)},${Mc(t + r)} ${Mc(e + n / 2)},${Mc(t)} ${Mc(e + n)},${Mc(t + r)}" fill="${a}" opacity="0.8"/>` : o === "line" || o === "arrow" ? Pc(e, t + r / 2 - .75, n, 1.5, a, " opacity=\"0.85\" rx=\"0.75\"") : Pc(e, t, n, r, a, " opacity=\"0.8\" rx=\"1\"");
}
function Vc(e, t, n, r, i, a) {
	if (e === "text") return Ic(t, n, r, i, a);
	if (e === "image") return Lc(t, n, r, i, !a?.src);
	if (e === "gallery") return Rc(t, n, r, i, a);
	if (e === "collection") return zc(t, n, r, i);
	if (e === "faq") {
		let e = Nc(Math.floor(i / 5), 2, 3), a = Math.max(.6, i * .04), o = (i - a * (e - 1)) / e, s = [];
		for (let i = 0; i < e; i += 1) {
			let e = n + i * (o + a);
			s.push(Pc(t, e, r, o, kc("surface", Ec), " rx=\"1\"")), s.push(Pc(t + r * .06, e + o / 2 - .7, r * .55, 1.4, kc("text", Dc), " opacity=\"0.5\" rx=\"0.7\"")), s.push(`<circle cx="${Mc(t + r * .92)}" cy="${Mc(e + o / 2)}" r="0.9" fill="${kc("text", Dc)}" opacity="0.4"/>`);
		}
		return s.join("");
	}
	if (e === "shape") return Bc(t, n, r, i, a);
	if (e === "button") return Pc(t, n, r, i, kc("accent", Oc), ` rx="${Mc(Math.min(i / 2, 4))}"`);
	if (e === "icon") {
		let e = Math.max(1.2, Math.min(r, i) / 2);
		return `<circle cx="${Mc(t + r / 2)}" cy="${Mc(n + i / 2)}" r="${Mc(e)}" fill="${kc("accent", Oc)}" opacity="0.85"/>`;
	}
	if (e === "video") {
		let e = [Pc(t, n, r, i, kc("surface", Ec), " rx=\"1.5\"")], a = t + r / 2, o = n + i / 2, s = Math.max(1.5, Math.min(r, i) * .22);
		return e.push(`<polygon points="${Mc(a - s / 2)},${Mc(o - s)} ${Mc(a - s / 2)},${Mc(o + s)} ${Mc(a + s)},${Mc(o)}" fill="${kc("text", Dc)}" opacity="0.6"/>`), e.join("");
	}
	if (e === "timeline") {
		let e = [Pc(t + 1, n, 1.4, i, kc("accent", Oc), " opacity=\"0.7\" rx=\"0.7\"")];
		for (let a = 0; a < 3; a += 1) {
			let o = n + i * (.18 + a * .32);
			e.push(`<circle cx="${Mc(t + 1.7)}" cy="${Mc(o)}" r="1.6" fill="${kc("accent", Oc)}"/>`), e.push(Pc(t + 5, o - 1, r * .5, 2, kc("text", Dc), " opacity=\"0.5\" rx=\"1\""));
		}
		return e.join("");
	}
	if (e === "quote") return [
		`<text x="${Mc(t + r / 2)}" y="${Mc(n + i * .34)}" text-anchor="middle" font-size="${Mc(Math.min(r, i) * .5)}" font-family="Georgia, serif" fill="${kc("accent", Oc)}">“</text>`,
		Pc(t + r * .15, n + i * .48, r * .7, 2, kc("text", Dc), " opacity=\"0.6\" rx=\"1\""),
		Pc(t + r * .25, n + i * .62, r * .5, 2, kc("text", Dc), " opacity=\"0.6\" rx=\"1\""),
		Pc(t + r * .35, n + i * .82, r * .3, 1.6, kc("text", Dc), " opacity=\"0.35\" rx=\"0.8\"")
	].join("");
	if (e === "ribbon") return [
		Pc(t, n + i * .3, r, i * .4, kc("accent", Oc), " opacity=\"0.85\" rx=\"1\""),
		Pc(t + r * .08, n + i * .46, r * .18, 1.8, kc("bg", Tc), " opacity=\"0.9\" rx=\"0.9\""),
		Pc(t + r * .34, n + i * .46, r * .24, 1.8, kc("bg", Tc), " opacity=\"0.9\" rx=\"0.9\""),
		Pc(t + r * .66, n + i * .46, r * .2, 1.8, kc("bg", Tc), " opacity=\"0.9\" rx=\"0.9\"")
	].join("");
	if (e === "stats") return [Pc(t + r * .28, n + i * .15, r * .44, i * .42, kc("accent", Oc), " opacity=\"0.85\" rx=\"1\""), Pc(t + r * .32, n + i * .72, r * .36, 1.6, kc("text", Dc), " opacity=\"0.4\" rx=\"0.8\"")].join("");
	if (e === "table") {
		let e = Math.max(1.6, i * .22), a = [Pc(t, n, r, e, kc("accent", Oc), " opacity=\"0.5\" rx=\"0.8\"")], o = Nc(Math.floor((i - e) / 3.2), 1, 3);
		for (let s = 0; s < o; s += 1) a.push(Pc(t, n + e + 1 + s * ((i - e - 1) / o), r, 1, kc("text", Dc), " opacity=\"0.3\""));
		return a.push(Pc(t + r * .33, n, .6, i, kc("text", Dc), " opacity=\"0.2\"")), a.push(Pc(t + r * .66, n, .6, i, kc("text", Dc), " opacity=\"0.2\"")), a.join("");
	}
	if (e === "share") {
		let e = Math.max(1.2, Math.min(i / 2, r / 9)), a = [];
		for (let r = 0; r < 4; r += 1) a.push(`<circle cx="${Mc(t + e + r * (e * 2 + 1.5))}" cy="${Mc(n + i / 2)}" r="${Mc(e)}" fill="${kc("accent", Oc)}" opacity="0.8"/>`);
		return a.join("");
	}
	if (e === "countdown") {
		let e = Math.max(.8, r * .03), a = (r - e * 3) / 4, o = [];
		for (let r = 0; r < 4; r += 1) {
			let s = t + r * (a + e);
			o.push(Pc(s, n, a, i, kc("surface", Ec), " rx=\"1\"")), o.push(Pc(s + a * .25, n + i * .2, a * .5, i * .35, kc("accent", Oc), " opacity=\"0.85\" rx=\"0.8\""));
		}
		return o.join("");
	}
	if (e === "audio") {
		let e = [Pc(t, n, r, i, kc("surface", Ec), " rx=\"1.5\"")], a = n + i / 2, o = Math.max(1.2, i * .28);
		return e.push(`<polygon points="${Mc(t + r * .06)},${Mc(a - o)} ${Mc(t + r * .06)},${Mc(a + o)} ${Mc(t + r * .06 + o * 1.4)},${Mc(a)}" fill="${kc("accent", Oc)}" opacity="0.85"/>`), e.push(Pc(t + r * .2, a - .6, r * .7, 1.2, kc("text", Dc), " opacity=\"0.35\" rx=\"0.6\"")), e.join("");
	}
	if (e === "product") {
		let e = Math.max(.8, r * .03), a = (r - e * 2) / 3, o = [];
		for (let r = 0; r < 3; r += 1) {
			let s = t + r * (a + e);
			o.push(Pc(s, n, a, i, kc("surface", Ec), " rx=\"1\"")), o.push(Pc(s + a * .08, n + i * .06, a * .84, i * .42, kc("text", Dc), " opacity=\"0.15\" rx=\"0.8\"")), o.push(Pc(s + a * .08, n + i * .56, a * .6, 1.4, kc("text", Dc), " opacity=\"0.5\" rx=\"0.7\"")), o.push(Pc(s + a * .08, n + i * .72, a * .35, 1.4, kc("accent", Oc), " opacity=\"0.85\" rx=\"0.7\"")), o.push(Pc(s + a * .08, n + i * .84, a * .84, i * .1, kc("accent", Oc), " opacity=\"0.6\" rx=\"1\""));
		}
		return o.join("");
	}
	if (e === "cart") {
		let e = Math.max(1.5, Math.min(r, i) / 2.4), a = t + r / 2, o = n + i / 2;
		return [
			`<circle cx="${Mc(a)}" cy="${Mc(o)}" r="${Mc(e)}" fill="${kc("surface", Ec)}"/>`,
			Pc(a - e * .5, o - e * .25, e, e * .55, kc("text", Dc), " opacity=\"0.5\" rx=\"0.4\""),
			`<circle cx="${Mc(a + e * .75)}" cy="${Mc(o - e * .75)}" r="${Mc(Math.max(.9, e * .35))}" fill="${kc("accent", Oc)}"/>`
		].join("");
	}
	return e === "checkout" ? [
		Pc(t, n, r * .7, 1.2, kc("text", Dc), " opacity=\"0.5\" rx=\"0.6\""),
		Pc(t, n + i * .12, r * .5, 1.2, kc("text", Dc), " opacity=\"0.35\" rx=\"0.6\""),
		Pc(t, n + i * .3, r, i * .14, kc("surface", Ec), " rx=\"1\""),
		Pc(t, n + i * .5, r, i * .14, kc("surface", Ec), " rx=\"1\""),
		Pc(t, n + i * .78, r * .45, i * .16, kc("accent", Oc), " opacity=\"0.85\" rx=\"1.2\"")
	].join("") : Pc(t, n, r, i, kc("surface", Ec), " rx=\"1.5\"");
}
function Hc(e, t, n) {
	let r = Array.isArray(e?.blocks) ? e.blocks : [], i = r.map((e) => (e.frames?.desktop?.y ?? 0) + (e.frames?.desktop?.h ?? 0)), a = n / Math.max(jc(e?.size?.minHeight), i.length ? Math.max(...i) + 16 : 0), o = [Pc(0, 0, t, n, Fc(e))];
	for (let r of e?.background?.layers ?? []) {
		if (r.type !== "glow") continue;
		let e = r.props ?? {};
		o.push(`<circle cx="${Mc(Nc(e.x ?? .5, 0, 1) * t)}" cy="${Mc(Nc(e.y ?? .3, 0, 1) * n)}" r="${Mc(t * Nc(e.radius ?? .5, .1, 1) * .5)}" fill="${Ac(e.color, Oc)}" opacity="${Mc(Nc(e.opacity ?? .3, 0, .5))}"/>`);
	}
	let s = t * .06, c = t - s * 2;
	for (let e of r) {
		let r = e.frames?.desktop;
		if (!r) continue;
		let i = Nc(s + (r.x ?? 0) * (c / 100), 0, t - 2), l = Nc((r.y ?? 0) * a, 0, n - 2), u = Nc((r.w ?? 10) * (c / 100), 2, t - i), d = Nc((r.h ?? 20) * a, 2, n - l);
		o.push(Vc(e.type, i, l, u, d, e.props));
	}
	return o.join("");
}
function Uc(e, { w: t = 96, h: n = 116, max: r = 6 } = {}) {
	let i = (Array.isArray(e?.sections) ? e.sections : []).slice(0, r);
	if (!i.length) return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${Pc(0, 0, t, n, kc("bg", Tc))}</svg>`;
	let a = i.map((e) => Nc(jc(e?.size?.minHeight), 160, 900)), o = a.reduce((e, t) => e + t, 0), s = n - 1 * (i.length - 1), c = [], l = 0;
	for (let e = 0; e < i.length; e += 1) {
		let n = Math.max(6, a[e] / o * s);
		c.push(`<g transform="translate(0 ${Mc(l)})">${Hc(i[e], t, n)}</g>`), l += n + 1;
	}
	return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${c.join("")}</svg>`;
}
//#endregion
//#region ../template/assets/engine/0.7.4/page-presets.js
var Wc = /* @__PURE__ */ new Map();
sc({ sections: { define: (e, t) => Wc.set(e, t) } });
var Gc = [
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
function Kc(e, { pageId: t, title: n }) {
	let r = Gc.find((t) => t.id === e);
	return r ? {
		schemaVersion: 4,
		meta: {
			id: t,
			title: n
		},
		sections: r.sections.map((e) => Wc.get(e).create())
	} : null;
}
//#endregion
//#region ../template/assets/engine/0.7.4/palette-search.js
function qc(e) {
	return String(e ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}
function Jc(e, t) {
	let n = qc(t).trim(), r = qc(e);
	return n ? r.startsWith(n) ? 0 : r.split(/[^a-z0-9]+/).some((e) => e.startsWith(n)) ? 1 : r.includes(n) ? 2 : -1 : 2;
}
function Yc(e, t, n) {
	return e.map((e, r) => ({
		item: e,
		i: r,
		rank: Jc(n(e), t)
	})).filter((e) => e.rank >= 0).sort((e, t) => e.rank - t.rank || e.i - t.i).map((e) => e.item);
}
//#endregion
//#region ../template/assets/engine/0.7.4/theme.js
function Xc(e, t, n) {
	return t === "light" || t === "dark" ? t : n ? "dark" : "light";
}
function Zc(e, t) {
	let n = e.tokens || {}, r = e.scheme === "dark" ? "dark" : "light";
	if (!e.alt?.tokens || t === r) return n;
	let i = {};
	for (let t of /* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(e.alt.tokens)])) i[t] = {
		...n[t],
		...e.alt.tokens[t]
	};
	return i;
}
var Qc = /^[a-zA-Z0-9#%.,()'"\s+\-*/]+$/;
function $c(e) {
	return typeof e == "string" && Qc.test(e) && !/url\(|\/\*|\*\/|expression/i.test(e);
}
function el(e) {
	let t = e.tokens || {}, n = Zc(e, "light"), r = Zc(e, "dark"), i = e.scheme === "dark" ? "dark" : "light", a = [], o = [], s = [], c = /* @__PURE__ */ new Set([
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
			$c(c) && (a.push(`  --urd-${e}-${l}: ${c};`), i && a.push(`  --urd-base-${l}: ${c};`)), u !== d && (i && $c(u) && $c(d) ? o.push({
				name: l,
				lv: u,
				dv: d
			}) : !i && $c(u) && $c(d) && s.push({
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
	].some((e) => $c(e.color?.["accent-text"])) && $c(t.color?.accent);
	u && $c(t.color?.bg) && (a.push(`  --urd-color-accent-text: ${t.color.bg};`), a.push(`  --urd-base-accent-text: ${t.color.bg};`));
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
function tl(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
var nl = {
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
}, rl = {
	surface: "sectionTheme.surface",
	accent: "sectionTheme.accent",
	inverse: "sectionTheme.inverse",
	soft: "sectionTheme.soft",
	muted: "sectionTheme.muted",
	deep: "sectionTheme.deep",
	highlighted: "sectionTheme.highlighted"
};
[...new Set(Object.values(nl).flatMap(Object.keys))];
function il(e) {
	return nl[e] ?? {};
}
function al(e) {
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
function ol(e, t) {
	let n = al(e), r = al(t);
	return n == null || r == null ? null : (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/color.js
var sl = {
	version: 1,
	label: "Colour",
	labelKey: "bgLayer.color",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = tl(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, cl = {
	linear: [
		"pan",
		"pan-loop",
		"rotate"
	],
	radial: ["pulse", "orbit"]
};
function ll(e) {
	let t = Array.isArray(e) && e.length ? e : [{ color: "#0b0e14" }, { color: "#1a1030" }], n = t.map((e) => Math.max(0, Number(e?.share) || 0)), r = n.reduce((e, t) => e + t, 0), i = r <= 0, a = i ? t.length : r, o = 0;
	return t.map((e, t) => {
		let r = i ? 1 : n[t], s = (o + r / 2) / a * 100;
		return o += r, {
			color: e?.color ?? "#0b0e14",
			at: Math.round(s * 100) / 100
		};
	});
}
function ul(e) {
	let t = (e) => Math.round(e * 100) / 100, n = e[0]?.at ?? 0;
	return [...e.map((e) => ({
		color: e.color,
		at: t(e.at - n)
	})), {
		color: e[0]?.color ?? "#0b0e14",
		at: 100
	}];
}
function dl(e, t, n, r = .5) {
	let i = n % 360 * Math.PI / 180, a = (e) => Math.round(e * 100) / 100 || 0, o = (Math.abs(e * Math.sin(i)) + Math.abs(t * Math.cos(i))) / (1 - Math.min(Math.max(r, 0), .9));
	return {
		period: a(o),
		dx: a(Math.sin(i) * o),
		dy: a(-Math.cos(i) * o)
	};
}
function fl(e, t, n) {
	return `repeating-linear-gradient(${t}deg, ${e.map((e) => `${tl(e.color)} ${Math.round(e.at / 100 * n * 100) / 100}px`).join(", ")})`;
}
function pl(e) {
	let t = e.kind === "radial" ? "radial" : "linear", n = (cl[t] ?? []).includes(e.animation) ? e.animation : null, r = ll(e.stops), i = r.map((e) => `${tl(e.color)} ${e.at}%`).join(", "), a = {}, o;
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
					stops: ul(r),
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
var ml = /* @__PURE__ */ new Set(), hl = !1;
function gl(e) {
	ml.add(e), !(hl || typeof window > "u") && (hl = !0, window.addEventListener("resize", () => {
		for (let e of [...ml]) e() || ml.delete(e);
	}));
}
var _l = !1;
function vl() {
	if (!_l) {
		_l = !0;
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
var yl = {
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
		let n = pl(t);
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
					let e = dl(r, i, n.loop.angle, n.loop.maxShare);
					t.style.inset = `${-Math.ceil(e.period)}px`, t.style.background = fl(n.loop.stops, n.loop.angle, e.period), t.style.setProperty("--urd-loop-dx", `${e.dx}px`), t.style.setProperty("--urd-loop-dy", `${e.dy}px`);
				}
				return !0;
			};
			requestAnimationFrame(r), gl(r);
			return;
		}
		if (n.runner) {
			e.classList.add("urd-bg-loop-host");
			let t = document.createElement("div");
			t.className = n.runner.className, t.style.background = n.runner.background, n.runner.left != null && (t.style.left = n.runner.left), n.runner.top != null && (t.style.top = n.runner.top), e.appendChild(t);
			return;
		}
		e.style.background = n.background, n.className && (e.classList.add(n.className), n.className === "urd-bg-rotate" && vl());
	}
}, bl = {
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
		let n = tl(t.color), r = t.x ?? .5, i = t.y ?? .3, a = t.radius ?? .5;
		e.style.background = `radial-gradient(circle at ${r * 100}% ${i * 100}%, ${n} 0%, transparent ${a * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, xl = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", Sl = {
	version: 1,
	label: "Grain",
	labelKey: "bgLayer.grain",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = xl, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
}, Cl = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
function wl(e) {
	return typeof e == "string" && Cl.test(e);
}
var Tl = /^(?:https?:\/\/|mailto:|tel:)[^\s]+$/i;
function El(e) {
	return typeof e == "string" && Tl.test(e.trim());
}
var Dl = /^(?:\/(?![/\\])[^\s\\]*|#[^\s]*)$/;
function Ol(e) {
	return El(e) || typeof e == "string" && Dl.test(e.trim());
}
var kl = [
	"launcher",
	"cart",
	"theme"
];
function Al(e = {}) {
	let t = Array.isArray(e.tools?.order) ? e.tools.order : [], n = [];
	for (let e of t) kl.includes(e) && !n.includes(e) && n.push(e);
	for (let e of kl) n.includes(e) || n.push(e);
	return n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/image.js
var jl = .4;
function Ml(e, t) {
	return `${(e ?? .5) * 100}% ${(t ?? .5) * 100}%`;
}
function Nl(e, t) {
	return e === "contain" ? "contain" : e === "cover" ? "cover" : `${Math.max(0, t ?? 1) * 100}%`;
}
function Pl(e) {
	let t = "-9999px";
	return e === "up" ? `inset(${t} 0 0 0)` : e === "down" ? `inset(0 0 ${t} 0)` : e === "both" ? `inset(${t} 0 ${t} 0)` : "inset(0)";
}
function Fl(e, t, n, r = .18) {
	let i = Math.max(0, Math.min(1, n)) * jl * t;
	return Math.round(Math.min(i, r * e));
}
function Il(e, t, n, r, i) {
	let a = e + t / 2, o = (n / 2 - a) * Math.max(0, Math.min(1, r)) * jl, s = i ?? Fl(t, n, r);
	return Math.max(-s, Math.min(s, o)) || 0;
}
var Ll = /* @__PURE__ */ new Set(), Rl = !1, zl = 0;
function Bl() {
	zl = 0;
	for (let e of [...Ll]) e() || Ll.delete(e);
}
function Vl() {
	zl ||= requestAnimationFrame(Bl);
}
function Hl(e) {
	Ll.add(e), e(), !(Rl || typeof window > "u") && (Rl = !0, window.addEventListener("scroll", Vl, { passive: !0 }), window.addEventListener("resize", Vl, { passive: !0 }));
}
function Ul(e, t, n, r) {
	let i = r === "cover" || r === "tile" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement, o = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
	e.style.willChange = "transform";
	let s = (t) => {
		e.style.top = `-${t}px`, e.style.bottom = `-${t}px`;
	}, c = () => {
		if (!e.isConnected) return !1;
		if (o || document.body.classList.contains("urd-mobile")) return s(n), e.style.transform = "", !0;
		let r = (a ?? e).getBoundingClientRect(), c = window.innerHeight || document.documentElement.clientHeight, l = Fl(r.height, c, t, i ? .18 : .6);
		s(i ? Math.max(n, l) : n);
		let u = Il(r.top, r.height, c, t, l);
		return e.style.transform = `translateY(${u.toFixed(1)}px)`, !0;
	};
	Hl(c), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(c));
}
function Wl() {
	return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("animation-timeline", "view()");
}
var Gl = /* @__PURE__ */ new Set(), Kl = !1, ql = 0;
function Jl() {
	ql = 0;
	for (let e of [...Gl]) e() || Gl.delete(e);
}
function Yl() {
	!ql && typeof requestAnimationFrame == "function" && (ql = requestAnimationFrame(Jl));
}
function Xl(e) {
	Gl.add(e), e(), !(Kl || typeof window > "u") && (Kl = !0, window.addEventListener("resize", Yl, { passive: !0 }));
}
function Zl(e, t, n, r) {
	let i = r === "cover" || r === "tile" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement;
	e.style.willChange = "transform", e.classList.add("urd-parallax-css");
	let o = () => {
		if (!e.isConnected) return !1;
		let r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || document.body.classList.contains("urd-mobile"), o = (a ?? e).getBoundingClientRect(), s = window.innerHeight || document.documentElement.clientHeight, c = Fl(o.height, s, t, i ? .18 : .6), l = i && !r ? Math.max(n, c) : n;
		return e.style.setProperty("--urd-px-shift", `${c}px`), e.style.top = `-${l}px`, e.style.bottom = `-${l}px`, !0;
	};
	Xl(o), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(o));
}
var Ql = {
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
		if (!wl(t.src)) return;
		e.style.opacity = String(t.opacity ?? 1), e.style.clipPath = Pl(t.bleed), e.style.zIndex = t.bleed === "down" || t.bleed === "both" ? "1" : "";
		let n = document.createElement("div");
		n.className = "urd-bg-image", n.style.position = "absolute", n.style.left = "0", n.style.right = "0", n.style.top = "0", n.style.bottom = "0";
		let r = t.fit === "tile" || t.fit === "repeat";
		n.style.backgroundImage = `url("${t.src}")`, n.style.backgroundSize = Nl(t.fit, t.size), n.style.backgroundRepeat = r ? "repeat" : "no-repeat", n.style.backgroundPosition = Ml(t.x, t.y);
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
		e.appendChild(n), t.parallax > 0 && $l(n, t.parallax, i, t.fit ?? "cover");
	}
};
function $l(e, t, n, r) {
	Wl() ? Zl(e, t, n, r) : Ul(e, t, n, r);
}
//#endregion
//#region ../template/assets/engine/0.7.4/gallery-model.js
function eu(e, t, n) {
	return !Number.isFinite(n) || n < 1 ? 0 : (((Number.isFinite(e) ? e : 0) + t) % n + n) % n;
}
function tu({ count: e = 0, reducedMotion: t = !1 } = {}) {
	return e >= 2 && !t;
}
function nu(e, { min: t = 2, fallback: n = 5 } = {}) {
	let r = Number(e);
	return !Number.isFinite(r) || r <= 0 ? n : Math.max(t, r);
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/slideshow.js
var ru = {
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
		let n = (t.images ?? []).filter((e) => wl(e?.src));
		if (!n.length) return;
		e.classList.add("urd-bg-slideshow"), e.style.opacity = String(t.opacity ?? 1), t.blur > 0 && (e.style.filter = `blur(${t.blur}px)`, e.style.inset = `-${t.blur * 2}px`);
		let r = Math.max(0, Number(t.fade) || 0);
		e.style.setProperty("--urd-bgg-fade", `${r}s`);
		let i = (e, n) => {
			e.style.backgroundImage = `url("${n.src}")`, e.style.backgroundSize = Nl(t.fit), e.style.backgroundRepeat = "no-repeat", e.style.backgroundPosition = Ml(n.x, n.y);
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
		if (!tu({
			count: n.length,
			reducedMotion: s
		})) return;
		let c = document.createElement("div");
		c.className = "urd-bg-slide", e.appendChild(c);
		let l = 0, u = o, d = Math.max(nu(t.interval, { fallback: 6 }), r + .5) * 1e3, f = setInterval(() => {
			if (!e.isConnected) {
				clearInterval(f);
				return;
			}
			if (document.hidden) return;
			let t = eu(l, 1, n.length), r = new Image();
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
}, iu = /^(?:data:video\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/media\/[\w%./-]+\.(?:mp4|webm))$/i;
function au(e) {
	return typeof e == "string" && iu.test(e);
}
var ou = null;
function su(e) {
	ou ??= new IntersectionObserver((e) => {
		for (let t of e) {
			if (!t.target.isConnected) {
				ou.unobserve(t.target);
				continue;
			}
			t.isIntersecting ? t.target.play().catch(() => {}) : t.target.pause();
		}
	}, { threshold: 0 }), ou.observe(e);
}
var cu = (e, t, n, r) => {
	e.style.position = "absolute", e.style.inset = "0", e.style.width = "100%", e.style.height = "100%", e.style.objectFit = t === "contain" ? "contain" : "cover", e.style.objectPosition = Ml(n, r);
}, lu = {
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
		if (!au(t.src)) return;
		if (e.style.opacity = String(t.opacity ?? 1), window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
			if (!wl(t.poster)) return;
			let n = document.createElement("img");
			n.className = "urd-bg-video-poster", n.alt = "", n.setAttribute("aria-hidden", "true"), n.src = t.poster, cu(n, t.fit, t.x, t.y), e.appendChild(n);
			return;
		}
		let n = document.createElement("video");
		n.className = "urd-bg-video", n.muted = !0, n.setAttribute("muted", ""), n.loop = !0, n.playsInline = !0, n.setAttribute("playsinline", ""), n.preload = "metadata", n.disablePictureInPicture = !0, n.setAttribute("aria-hidden", "true"), wl(t.poster) && (n.poster = t.poster), n.src = t.src, cu(n, t.fit, t.x, t.y), e.appendChild(n), su(n), t.parallax > 0 && $l(n, t.parallax, 0, t.fit === "contain" ? "contain" : "cover");
	}
};
//#endregion
//#region ../template/assets/engine/0.7.4/footer-thumb.js
function uu(e = {}) {
	let t = "#2fd6b6", n = "#5c6b64", r = e.mega ? "#16221d" : "#0e1512", i = e.cols ?? 0, a = e.social ?? 0, o = `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${r}"/>`;
	if (e.mega && (o += `<circle cx="20" cy="6" r="34" fill="${t}" opacity="0.18"/>`), e.bigcta) return o += `<rect x="45" y="18" width="70" height="8" rx="3" fill="${n}" opacity="0.85"/>`, o += `<rect x="56" y="32" width="48" height="4" rx="2" fill="${n}" opacity="0.5"/>`, o += `<rect x="62" y="43" width="36" height="10" rx="3" fill="${t}"/>`, o += du(n, e.baselineLinks), o + "</svg>";
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
	return o += du(n, e.baselineLinks), o + "</svg>";
}
function du(e, t = 0) {
	let n = `<line x1="8" y1="66" x2="152" y2="66" stroke="${e}" stroke-width="0.6" opacity="0.5"/>`;
	return n += `<rect x="8" y="70" width="40" height="3" rx="1.5" fill="${e}" opacity="0.6"/>`, t && (n += `<g fill="${e}" opacity="0.6">` + Array.from({ length: t }, (e, t) => `<rect x="${120 - t * 16}" y="70" width="12" height="3" rx="1.5"/>`).join("") + "</g>"), n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/animations/core.js
var fu = () => ({
	duration: 600,
	delay: 0
}), pu = 90, mu = {
	"fade-in": {
		version: 1,
		label: "Fade in",
		labelKey: "anim.fadeIn",
		entrance: !0,
		defaults: fu,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Slide up",
		labelKey: "anim.slideUp",
		entrance: !0,
		defaults: fu,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom in",
		labelKey: "anim.zoomIn",
		entrance: !0,
		defaults: fu,
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
			step: pu,
			effect: "slide-up",
			pattern: "sequence"
		}),
		migrations: {}
	}
}, hu = [
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
function gu(e) {
	let t = (e) => Math.round(e * 100) / 100, n = Math.max(0, t(100 - e.w)), r = Math.min(n, Math.max(0, t(e.x - e.w / 2))), i = Math.max(0, e.y - e.h / 2), a = e.snap === !1 || e.grid?.snap === !1, o = e.grid?.size || 8;
	return i = a ? Math.round(i) : Math.round(i / o) * o, {
		x: r,
		y: Math.max(0, i)
	};
}
//#endregion
//#region src/App.svelte
var _u = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), vu = /* @__PURE__ */ H("<button class=\"ghost row-tool svelte-1n46o8q\"></button>"), yu = /* @__PURE__ */ H("<span><span class=\"grad-grip svelte-1n46o8q\"><svg viewBox=\"0 0 16 16\" width=\"14\" height=\"14\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"13\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"13\" r=\"1.4\"></circle></svg></span> <!> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span> <!></span>"), bu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), xu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/>", 1), Su = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Cu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), wu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Tu = /* @__PURE__ */ H("<div class=\"sizefill svelte-1n46o8q\"><button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button> <button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button></div> <label class=\"svelte-1n46o8q\"> </label> <div class=\"focalpad svelte-1n46o8q\"><span class=\"focaldot svelte-1n46o8q\"></span></div> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Eu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Du = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> </label> <div class=\"sizestep svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"10\" max=\"400\" class=\"svelte-1n46o8q\"/> <span class=\"sizeunit svelte-1n46o8q\">%</span> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></div> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Ou = /* @__PURE__ */ H("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), ku = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"120\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\"> </p>", 1), Au = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), ju = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"video/mp4,video/webm\" class=\"svelte-1n46o8q\"/></label> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Mu = /* @__PURE__ */ H("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!></div>"), Nu = /* @__PURE__ */ H("<!> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), Pu = /* @__PURE__ */ H("<input class=\"nav-target svelte-1n46o8q\"/>"), Fu = /* @__PURE__ */ H("<div class=\"nav-row nav-sub-row\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target\"><!></span> <!></div>"), Iu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label>"), Lu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"num-stepper svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"1\" max=\"12\" step=\"1\" class=\"svelte-1n46o8q\"/> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></span></label>", 1), Ru = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), zu = /* @__PURE__ */ H("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), Bu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>"), Vu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Hu = /* @__PURE__ */ H("<input class=\"svelte-1n46o8q\"/>"), Uu = /* @__PURE__ */ H("<span class=\"nav-line svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Wu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Gu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"50\" class=\"svelte-1n46o8q\"/></label>"), Ku = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <textarea rows=\"3\" spellcheck=\"false\" class=\"svelte-1n46o8q\"></textarea></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), qu = /* @__PURE__ */ H("<span class=\"nav-line svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span>"), Ju = /* @__PURE__ */ H("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), Yu = /* @__PURE__ */ H("<span class=\"nav-line svelte-1n46o8q\"><input class=\"tl-year svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <input class=\"svelte-1n46o8q\"/>", 1), Xu = /* @__PURE__ */ H("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), Zu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Qu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), $u = /* @__PURE__ */ H("<button type=\"button\"></button>"), ed = /* @__PURE__ */ H("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input class=\"field-filled svelte-1n46o8q\"/></label>"), td = /* @__PURE__ */ H("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-6 svelte-1n46o8q\" role=\"group\"></div></div> <!>", 1), nd = /* @__PURE__ */ H("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></span> <span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), rd = /* @__PURE__ */ H("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>"), id = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"datetime-local\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), ad = /* @__PURE__ */ H("<button class=\"ghost svelte-1n46o8q\"> </button>"), od = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"audio/*\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), sd = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), cd = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), ld = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> </label> <input class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), ud = /* @__PURE__ */ H("<input class=\"token-input svelte-1n46o8q\" maxlength=\"4\"/>"), dd = /* @__PURE__ */ H("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\"> </button></span>"), fd = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"toolbar-row svelte-1n46o8q\"><!> <!></span></label> <!>", 1), pd = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), md = /* @__PURE__ */ H("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost action svelte-1n46o8q\"> </button></span>"), hd = /* @__PURE__ */ H("<button class=\"ghost action svelte-1n46o8q\"> </button>"), gd = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), _d = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), vd = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"email\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"url\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), yd = /* @__PURE__ */ H("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label></div>"), bd = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!>", 1), xd = /* @__PURE__ */ H("<p> </p>"), Sd = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), Cd = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" class=\"svelte-1n46o8q\"/></label>"), wd = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label>"), Td = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Ed = /* @__PURE__ */ H("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Dd = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Od = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!>", 1), kd = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Ad = /* @__PURE__ */ H("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), jd = /* @__PURE__ */ H("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0.5\" max=\"10\" step=\"0.5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), Md = /* @__PURE__ */ H("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"10\" max=\"300\" step=\"5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), Nd = /* @__PURE__ */ H("<button class=\"ghost action svelte-1n46o8q\"> </button> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Pd = /* @__PURE__ */ H("<!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"2\" max=\"40\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>", 1), Fd = /* @__PURE__ */ H("<div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div>"), Id = /* @__PURE__ */ H("<div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!> <!></div> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <!> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <!> <!></div> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!> <!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"-10\" max=\"10\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div></div> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"8\" max=\"120\" step=\"2\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div></div> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"swatch-row svelte-1n46o8q\"><!> <div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div></div></div> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Ld = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Rd = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"24\" max=\"64\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), zd = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Bd = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Vd = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Hd = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Ud = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Wd = /* @__PURE__ */ H("<!> <!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"10\" max=\"300\" step=\"5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"80\" max=\"400\" step=\"10\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Gd = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"60\" class=\"svelte-1n46o8q\"/></label>"), Kd = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), qd = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label>"), Jd = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Yd = /* @__PURE__ */ H("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" min=\"1\" max=\"100\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), Xd = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label>", 1), Zd = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"400\" class=\"svelte-1n46o8q\"/></label>"), Qd = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!>", 1), $d = /* @__PURE__ */ H("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), ef = /* @__PURE__ */ H("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), tf = /* @__PURE__ */ H("<!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details>", 1), nf = /* @__PURE__ */ H("<div class=\"props-tabs svelte-1n46o8q\"><span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div> <!>", 1), rf = /* @__PURE__ */ H("<button class=\"chrome-restore svelte-1n46o8q\"><!> </button>"), af = /* @__PURE__ */ H("<button><!> </button>"), of = /* @__PURE__ */ H("<div class=\"tool-pop svelte-1n46o8q\"></div>"), sf = /* @__PURE__ */ H("<span class=\"toolmenu svelte-1n46o8q\"><button><!><!></button> <!></span>"), cf = /* @__PURE__ */ H("<button></button>"), lf = /* @__PURE__ */ H("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"viewswitch toolgrp svelte-1n46o8q\"></span>", 1), uf = /* @__PURE__ */ H("<div class=\"tool-pop svelte-1n46o8q\"><div class=\"tool-pop-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button></div> <button><!> </button></div>"), df = /* @__PURE__ */ H("<span class=\"toolmenu svelte-1n46o8q\"><button><span class=\"zoom-cap svelte-1n46o8q\"> </span><!></button> <!></span>"), ff = /* @__PURE__ */ H("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"zoomswitch toolgrp svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button> <button></button></span>", 1), pf = /* @__PURE__ */ H("<div class=\"tool-pop svelte-1n46o8q\"><button><!> </button> <button><!> </button></div>"), mf = /* @__PURE__ */ H("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"toolgrp svelte-1n46o8q\"><button></button> <button></button></span>", 1), hf = /* @__PURE__ */ H("<button class=\"ghost page-btn svelte-1n46o8q\"> </button> <span class=\"toolset svelte-1n46o8q\"><!> <!> <!></span>", 1), gf = /* @__PURE__ */ H("<button class=\"badge attention svelte-1n46o8q\"><!> <span class=\"btn-label svelte-1n46o8q\"> </span> <span class=\"badge-mini svelte-1n46o8q\"> </span></button>"), _f = /* @__PURE__ */ H("<button class=\"discard-confirm svelte-1n46o8q\"><!> </button>"), vf = /* @__PURE__ */ H("<span class=\"draft-cluster svelte-1n46o8q\"><span class=\"chip draft-chip svelte-1n46o8q\"><span class=\"chip-full svelte-1n46o8q\" aria-hidden=\"true\"> </span> <span class=\"chip-mini svelte-1n46o8q\" aria-hidden=\"true\">!</span></span>  <span class=\"discard-wrap svelte-1n46o8q\"><button><!><span class=\"discard-label svelte-1n46o8q\"> </span></button> <!></span></span>"), yf = /* @__PURE__ */ H("<!> <span class=\"btn-label svelte-1n46o8q\"> </span>", 1), bf = /* @__PURE__ */ H("<span class=\"who svelte-1n46o8q\"><!> </span>"), xf = /* @__PURE__ */ H("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\"> </a>"), Sf = /* @__PURE__ */ H("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\"><!> <span class=\"btn-label svelte-1n46o8q\"> </span></a> <button class=\"primary svelte-1n46o8q\"> </button>", 1), Cf = /* @__PURE__ */ H("<button> </button>"), wf = /* @__PURE__ */ H("<span class=\"rail-group svelte-1n46o8q\"> </span> <!>", 1), Tf = /* @__PURE__ */ H("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" step=\"10\"/> <span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" step=\"10\" placeholder=\"0\"/></div>"), Ef = /* @__PURE__ */ H("<p class=\"mini-label svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input type=\"text\" spellcheck=\"false\" class=\"svelte-1n46o8q\"/></label>", 1), Df = /* @__PURE__ */ H("<div class=\"settings-pop svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <p class=\"mini-label svelte-1n46o8q\"> </p> <div class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></div> <!> <!></div>"), Of = /* @__PURE__ */ H("<span class=\"page-path svelte-1n46o8q\">/</span>"), kf = /* @__PURE__ */ H("<input class=\"page-slug svelte-1n46o8q\"/>"), Af = /* @__PURE__ */ H("<span class=\"seo-warn svelte-1n46o8q\"></span>"), jf = /* @__PURE__ */ H("<button class=\"ghost danger svelte-1n46o8q\"><!> </button>"), Mf = /* @__PURE__ */ H("<div class=\"page-menu svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"><!> </button> <!></div>"), Nf = /* @__PURE__ */ H("<div><input class=\"page-title svelte-1n46o8q\"/> <!> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <span class=\"page-menu-wrap svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <!></span></span></div>"), Pf = /* @__PURE__ */ H("<img class=\"site-icon-preview svelte-1n46o8q\"/>"), Ff = /* @__PURE__ */ H("<div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button></div>"), If = /* @__PURE__ */ H("<div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button> <button class=\"page-template-del svelte-1n46o8q\"></button></div>"), Lf = /* @__PURE__ */ H("<span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-template-grid svelte-1n46o8q\"></div>", 1), Rf = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <textarea rows=\"2\" class=\"svelte-1n46o8q\"></textarea></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <textarea rows=\"2\" class=\"svelte-1n46o8q\"></textarea></label> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-template-grid svelte-1n46o8q\"><div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button></div> <!></div> <!></div>"), zf = /* @__PURE__ */ H("<input class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\"/> <button><b> </b></button> <button><i> </i></button></span>", 1), Bf = /* @__PURE__ */ H("<img alt=\"\" class=\"svelte-1n46o8q\"/>"), Vf = /* @__PURE__ */ H("<span class=\"logo-file svelte-1n46o8q\"> </span>"), Hf = /* @__PURE__ */ H("<div class=\"logo-pick svelte-1n46o8q\"><span class=\"logo-thumb svelte-1n46o8q\"><!></span> <span class=\"logo-pick-col svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div> <div class=\"ctl-triple svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\"/></div> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\"/></div></div>", 1), Uf = /* @__PURE__ */ H("<button type=\"button\"><!><span class=\"svelte-1n46o8q\"> </span></button>"), Wf = /* @__PURE__ */ H("<span class=\"toolbar-row svelte-1n46o8q\"><span class=\"mini-label tb-grow svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" placeholder=\"1100\"/></span>"), Gf = /* @__PURE__ */ H("<!> <!> <span class=\"toolbar-row svelte-1n46o8q\"><span class=\"mini-label tb-grow svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></span>", 1), Kf = /* @__PURE__ */ H("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), qf = /* @__PURE__ */ H("<!> <span class=\"toolbar-row svelte-1n46o8q\"><span class=\"mini-label tb-grow svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></span>", 1), Jf = /* @__PURE__ */ H("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div>"), Yf = /* @__PURE__ */ H("<div class=\"ctl-pair svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div></div>"), Xf = /* @__PURE__ */ H("<span class=\"toolbar-row ctl-end svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"1\" max=\"8\"/> <span class=\"mini-label svelte-1n46o8q\"> </span> <!></span>"), Zf = /* @__PURE__ */ H("<div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-5 svelte-1n46o8q\" role=\"group\"></div></div> <!>", 1), Qf = /* @__PURE__ */ H("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"30\" max=\"80\" step=\"5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0\" max=\"400\" step=\"10\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0\" max=\"1200\" step=\"20\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <!>", 1), $f = /* @__PURE__ */ H("<!> <!>", 1), ep = /* @__PURE__ */ H("<div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), tp = /* @__PURE__ */ H("<div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div>"), np = /* @__PURE__ */ H("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label>"), rp = /* @__PURE__ */ H("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <!> <!> <!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <!> <input type=\"range\" min=\"0\" max=\"100\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), ip = /* @__PURE__ */ H("<button type=\"button\"><span> </span><span class=\"svelte-1n46o8q\"> </span></button>"), ap = /* @__PURE__ */ H("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), op = /* @__PURE__ */ H("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"text\" class=\"field-filled svelte-1n46o8q\" placeholder=\"https://\"/></label>"), sp = /* @__PURE__ */ H("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"text\" class=\"field-filled svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), cp = /* @__PURE__ */ H("<span class=\"tool-move svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span>"), lp = /* @__PURE__ */ H("<div class=\"mini-card svelte-1n46o8q\"><span class=\"tool-head svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span><!></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), up = /* @__PURE__ */ H("<div class=\"mini-card svelte-1n46o8q\"><span class=\"tool-head svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span><!></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div>"), dp = /* @__PURE__ */ H("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"text\" class=\"field-filled svelte-1n46o8q\"/></label>"), fp = /* @__PURE__ */ H("<img alt=\"\"/>"), pp = /* @__PURE__ */ H("<span class=\"lrow-warn svelte-1n46o8q\"></span>"), mp = /* @__PURE__ */ H("<span class=\"lrow-tile-mark svelte-1n46o8q\"><!></span> <span class=\"lrow-tile-name svelte-1n46o8q\"> </span>", 1), hp = /* @__PURE__ */ H("<span class=\"bad-target-note svelte-1n46o8q\"> </span>"), gp = /* @__PURE__ */ H("<div class=\"lrow-body svelte-1n46o8q\"><!> <div class=\"lrow-fields svelte-1n46o8q\"><input class=\"field-filled svelte-1n46o8q\"/> <input/> <!> <span class=\"lrow-actions svelte-1n46o8q\"><!> <button class=\"linkish danger svelte-1n46o8q\"> </button></span></div></div>"), _p = /* @__PURE__ */ H("<div><div class=\"lrow-head svelte-1n46o8q\" role=\"button\" tabindex=\"0\"><span class=\"lrow-mark svelte-1n46o8q\" aria-hidden=\"true\"><!></span> <span class=\"lrow-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\" role=\"none\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"lrow-chev svelte-1n46o8q\" aria-hidden=\"true\"></span></div> <!></div>"), vp = /* @__PURE__ */ H("<details class=\"group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"><span class=\"tool-head svelte-1n46o8q\"> <!></span></summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-3 svelte-1n46o8q\" role=\"group\"></div></div> <!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"1\" max=\"24\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <span class=\"lbtn-pick svelte-1n46o8q\"><!> <span class=\"lbtn-name svelte-1n46o8q\"><!></span></span></div> <!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details>"), yp = /* @__PURE__ */ H("<div aria-hidden=\"true\"><span class=\"nav-grip svelte-1n46o8q\"></span> <div class=\"nav-item-main svelte-1n46o8q\"><span class=\"nav-item-name ghost-name svelte-1n46o8q\"> </span> <span class=\"ghost-target svelte-1n46o8q\"> </span></div></div>"), bp = /* @__PURE__ */ H("<input class=\"nav-item-href svelte-1n46o8q\"/>"), xp = /* @__PURE__ */ H("<span class=\"nav-item-sub svelte-1n46o8q\"></span>"), Sp = /* @__PURE__ */ H("<!> <div><span class=\"nav-grip svelte-1n46o8q\" draggable=\"true\"></span> <div class=\"nav-item-main svelte-1n46o8q\"><input class=\"nav-item-name svelte-1n46o8q\"/> <div class=\"nav-item-target svelte-1n46o8q\"><!> <!></div></div> <span class=\"nav-actions svelte-1n46o8q\"><button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button></span> <button class=\"ghost row-tool nav-more svelte-1n46o8q\"></button></div> <!>", 1), Cp = /* @__PURE__ */ H("<!> <div><span class=\"nav-grip svelte-1n46o8q\" draggable=\"true\"></span> <div class=\"nav-item-main svelte-1n46o8q\"><input class=\"nav-item-name svelte-1n46o8q\"/> <div class=\"nav-item-target svelte-1n46o8q\"><!> <!></div></div> <!> <span class=\"nav-actions svelte-1n46o8q\"><button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button></span> <button class=\"ghost row-tool nav-more svelte-1n46o8q\"></button></div> <!> <!> <!>", 1), wp = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <!> <!> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-3 svelte-1n46o8q\" role=\"group\"></div></div> <!> <!> <!> <!> <!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"seg cw-seg svelte-1n46o8q\"></div> <details class=\"sub-inset svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"sub-inset-body svelte-1n46o8q\"><!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div> <!></div></details></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-pair svelte-1n46o8q\"><!> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div></div> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label></div> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label></div> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label></div> <!> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <!></div> <!> <!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-5 svelte-1n46o8q\" role=\"group\"></div></div> <!> <div class=\"swatch-row svelte-1n46o8q\"><!> <div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div></div> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!></div></details></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!>  <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div role=\"group\"></div></div> <!> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"4\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"nav-list svelte-1n46o8q\" role=\"list\"></div> <button class=\"ghost action svelte-1n46o8q\"> </button> <span class=\"toolbar-row svelte-1n46o8q\"><input class=\"tb-grow svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button></span></div></details></div>"), Tp = /* @__PURE__ */ H("<div class=\"cw-row svelte-1n46o8q\"><span class=\"mini-label cw-screen svelte-1n46o8q\"> </span> <span><span class=\"cw-fill svelte-1n46o8q\"></span></span> <span class=\"gridmenu-value cw-margin svelte-1n46o8q\"> </span></div>"), Ep = /* @__PURE__ */ H("<div class=\"mini-label cw-binds svelte-1n46o8q\"> </div>"), Dp = /* @__PURE__ */ H("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), Op = /* @__PURE__ */ H("<button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), kp = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"sample cw-sample svelte-1n46o8q\"><!> <div class=\"cw-legend svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!></div> <div class=\"seg cw-seg svelte-1n46o8q\"></div> <!> <p class=\"mini-label svelte-1n46o8q\"> </p> <div class=\"seg cw-seg svelte-1n46o8q\"></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div>"), Ap = /* @__PURE__ */ H("<div class=\"mini-label tpv-cap svelte-1n46o8q\"> </div>"), jp = /* @__PURE__ */ H("<div class=\"theme-pvw svelte-1n46o8q\"><!> <div class=\"tpv-demo svelte-1n46o8q\"><div class=\"tpv-h svelte-1n46o8q\"> </div> <div class=\"tpv-card svelte-1n46o8q\"> </div> <div class=\"tpv-row svelte-1n46o8q\"><span class=\"tpv-btn svelte-1n46o8q\"> </span><span class=\"tpv-lnk svelte-1n46o8q\"> </span></div></div></div>"), Mp = /* @__PURE__ */ H("<button type=\"button\"><span class=\"tp-band svelte-1n46o8q\"><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i></span> <small class=\"svelte-1n46o8q\"> </small></button>"), Np = /* @__PURE__ */ H("<div class=\"ctl-row autorow svelte-1n46o8q\"><span class=\"autolbl svelte-1n46o8q\"> </span> <span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div>"), Pp = /* @__PURE__ */ H("<span class=\"mini-label svelte-1n46o8q\"> </span>"), Fp = /* @__PURE__ */ H("<div class=\"palcol svelte-1n46o8q\"><!> <span class=\"palcap svelte-1n46o8q\"> </span> <b class=\"palhex svelte-1n46o8q\"> </b></div>"), Ip = /* @__PURE__ */ H("<div class=\"ctl-row palhead svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <button type=\"button\"> </button></div> <div></div>", 1), Lp = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"theme-presets svelte-1n46o8q\"></div> <p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <div class=\"ctl-row palhead svelte-1n46o8q\"><!> <button type=\"button\"> </button></div> <div class=\"palcells svelte-1n46o8q\"></div> <!> <div class=\"ctl-row palauto-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <button type=\"button\"> </button></div> <div class=\"theme-previews svelte-1n46o8q\"><!> <!></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <div class=\"sample typo-sample svelte-1n46o8q\"><div class=\"ts-h svelte-1n46o8q\"> </div> <div class=\"ts-b svelte-1n46o8q\"> </div></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"sample form-prev svelte-1n46o8q\"><span class=\"fp-btn svelte-1n46o8q\"> </span> <span class=\"fp-card svelte-1n46o8q\"> </span></div> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"24\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"40\" step=\"1\" class=\"svelte-1n46o8q\"/></div></details></div>"), Rp = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label>"), zp = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label>"), Bp = /* @__PURE__ */ H("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), Vp = /* @__PURE__ */ H("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <!> <!>", 1), Hp = /* @__PURE__ */ H("<div><input type=\"text\" class=\"svelte-1n46o8q\"/> <!></div>"), Up = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), Wp = /* @__PURE__ */ H("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), Gp = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Kp = /* @__PURE__ */ H("<button><span class=\"rs-sample svelte-1n46o8q\"><i class=\"rs-line svelte-1n46o8q\"></i> <i class=\"rs-chip svelte-1n46o8q\"></i> <i class=\"rs-dot svelte-1n46o8q\"></i></span> <span class=\"rs-name svelte-1n46o8q\"> </span></button>"), qp = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"1000\" step=\"10\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Jp = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Yp = /* @__PURE__ */ H("<p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"token-input svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"rs-grid svelte-1n46o8q\"></div> <label class=\"svelte-1n46o8q\"> <span class=\"row-tools svelte-1n46o8q\"><span class=\"gridmenu-value svelte-1n46o8q\"> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Xp = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), Zp = /* @__PURE__ */ H("<button class=\"footer-tp svelte-1n46o8q\"><span class=\"footer-tp-thumb svelte-1n46o8q\"></span> <span class=\"footer-tp-name svelte-1n46o8q\"> </span></button>"), Qp = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"16\" max=\"160\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), $p = /* @__PURE__ */ H("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!>", 1), em = /* @__PURE__ */ H("<div class=\"nav-row\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></div> <!>", 1), tm = /* @__PURE__ */ H("<div class=\"nav-row\"><span class=\"nav-line svelte-1n46o8q\"><span class=\"footer-soc-preview svelte-1n46o8q\" aria-hidden=\"true\"></span> <!></span> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <input class=\"nav-target svelte-1n46o8q\"/></div>"), nm = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), rm = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), im = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"footer-tpick svelte-1n46o8q\"></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"svelte-1n46o8q\"> <!></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details></div>"), am = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"date\" class=\"svelte-1n46o8q\"/></label>"), om = /* @__PURE__ */ H("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), sm = /* @__PURE__ */ H("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/>"), cm = /* @__PURE__ */ H("<span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span>"), lm = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" step=\"0.01\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" step=\"0.01\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), um = /* @__PURE__ */ H("<details class=\"group collection-entry svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <textarea rows=\"3\" class=\"svelte-1n46o8q\"></textarea> <!> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!></div></details>"), dm = /* @__PURE__ */ H("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\".csv,text/csv\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), fm = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button></div>"), pm = /* @__PURE__ */ H("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), mm = /* @__PURE__ */ H("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), hm = /* @__PURE__ */ H("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <!></div>"), gm = /* @__PURE__ */ H("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span></div>"), _m = /* @__PURE__ */ H("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), vm = /* @__PURE__ */ H("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <!>", 1), ym = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <!> <!></div>"), bm = /* @__PURE__ */ H("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), xm = /* @__PURE__ */ H("<button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), Sm = /* @__PURE__ */ H("<p class=\"panel-hint svelte-1n46o8q\"> </p> <button class=\"ghost svelte-1n46o8q\"> </button>", 1), Cm = /* @__PURE__ */ H("<span class=\"update-arrow svelte-1n46o8q\"></span> <span class=\"badge svelte-1n46o8q\"> </span>", 1), wm = /* @__PURE__ */ H("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><p class=\"update-notes svelte-1n46o8q\"> </p></div></details>"), Tm = /* @__PURE__ */ H("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"><span class=\"update-warn svelte-1n46o8q\"></span> </summary> <div class=\"group-items svelte-1n46o8q\"><pre class=\"update-headers svelte-1n46o8q\"> </pre></div></details>"), Em = /* @__PURE__ */ H("<span class=\"chip svelte-1n46o8q\"> </span>"), Dm = /* @__PURE__ */ H("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <span class=\"update-warn svelte-1n46o8q\"></span></span></div>"), Om = /* @__PURE__ */ H("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <!></div>"), km = /* @__PURE__ */ H("<span class=\"update-warn svelte-1n46o8q\"></span>"), Am = /* @__PURE__ */ H("<div class=\"update-row svelte-1n46o8q\"><span> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <!> <input type=\"checkbox\" class=\"svelte-1n46o8q\"/></span></div>"), jm = /* @__PURE__ */ H("<div class=\"ctl-row update-opt-head svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!>", 1), Mm = /* @__PURE__ */ H("<p class=\"update-summary svelte-1n46o8q\"> </p> <!> <!> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details> <!> <button class=\"primary update-run svelte-1n46o8q\"> </button>", 1), Nm = /* @__PURE__ */ H("<div class=\"update-versions svelte-1n46o8q\"><span class=\"update-from svelte-1n46o8q\"> </span> <!></div> <!>", 1), Pm = /* @__PURE__ */ H("<aside><div class=\"panel-head svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></div> <!></aside>"), Fm = /* @__PURE__ */ H("<div class=\"workspace svelte-1n46o8q\"><nav><!> <span class=\"rail-settings svelte-1n46o8q\"><span class=\"rail-brand svelte-1n46o8q\" title=\"Urd\"><svg class=\"brand-mark svelte-1n46o8q\" viewBox=\"10.3 8.3 19.4 25.4\" aria-hidden=\"true\"><path d=\"M12 32V10l16 6.5V32\" fill=\"none\" stroke=\"var(--urd-brand)\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg> <span class=\"brand-word svelte-1n46o8q\">Urd</span></span> <button></button> <!></span></nav> <!> <div><div class=\"stage svelte-1n46o8q\"><iframe class=\"svelte-1n46o8q\"></iframe></div></div></div>"), Im = /* @__PURE__ */ H("<p class=\"loading svelte-1n46o8q\"> </p>"), Lm = /* @__PURE__ */ H("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), Rm = /* @__PURE__ */ H("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), zm = /* @__PURE__ */ H("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <p class=\"panel-hint svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <p class=\"panel-hint svelte-1n46o8q\"> </p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), Bm = /* @__PURE__ */ H("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\">×</button></div>"), Vm = /* @__PURE__ */ H("<div class=\"block-menu svelte-1n46o8q\"><header class=\"block-menu-head svelte-1n46o8q\"><span> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></header> <div class=\"panel-body block-menu-body svelte-1n46o8q\"><!></div></div>"), Hm = /* @__PURE__ */ H("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><!> <!></span> <span class=\"topbar-group topbar-draft svelte-1n46o8q\"><!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!> <!></div>   <!>", 1);
function Um(e, t) {
	Ye(t, !0);
	let n = (e, t = f, n = f) => {
		var r = Nu(), i = I(r);
		Yr(i, 17, n, Gr, (e, r, i) => {
			var a = Mu(), o = F(a), s = F(o);
			{
				let e = /* @__PURE__ */ A(() => Z("tip.bg.changeType")), n = /* @__PURE__ */ A(() => x.map(([e, t]) => [e, t.labelKey ? Z(t.labelKey) : t.label]));
				Q(s, {
					get value() {
						return B(r).type;
					},
					get title() {
						return B(e);
					},
					get options() {
						return B(n);
					},
					onchange: (e) => Ir(t(), i, e)
				});
			}
			var c = R(s, 2), l = F(c);
			l.disabled = i === 0, K(l, () => C.up, !0), D(l);
			var u = R(l, 2);
			K(u, () => C.down, !0), D(u);
			var d = R(u, 2);
			K(d, () => C.cross, !0), D(d), D(c), D(o);
			var f = R(o, 2), p = (e) => {
				var n = _u(), a = I(n), o = F(a), s = R(o);
				{
					let e = /* @__PURE__ */ A(ni), n = /* @__PURE__ */ A(() => Z("tip.bg.layerColor"));
					ga(s, {
						get value() {
							return B(r).props.value;
						},
						get tokens() {
							return B(e);
						},
						get label() {
							return B(n);
						},
						onchange: (e) => gr(t(), i, "value", e)
					});
				}
				D(a);
				var c = R(a, 2), l = F(c), u = L(R(l));
				D(c);
				var d = R(c, 2);
				J(d), z((e, t, n) => {
					W(o, `${e ?? ""} `), W(l, `${t ?? ""} `), W(u, `${n ?? ""}%`), Y(d, B(r).props.opacity ?? 1);
				}, [
					() => Z("lbl.color"),
					() => Z("lbl.strength"),
					() => Math.round((B(r).props.opacity ?? 1) * 100)
				]), V("input", d, (e) => gr(t(), i, "opacity", Number(e.target.value))), U(e, n);
			}, m = (e) => {
				let n = /* @__PURE__ */ A(() => Cr(B(r))), a = /* @__PURE__ */ A(() => B(n).stops.reduce((e, t) => e + Math.max(0, Number(t.share) || 0), 0));
				var o = Su(), s = I(o), c = F(s), l = R(c);
				{
					let e = /* @__PURE__ */ A(() => B(n).kind ?? "linear"), r = /* @__PURE__ */ A(() => [["linear", Z("opt.grad.linear")], ["radial", Z("opt.grad.radial")]]);
					Q(l, {
						get value() {
							return B(e);
						},
						get options() {
							return B(r);
						},
						onchange: (e) => Or(t(), i, e)
					});
				}
				D(s);
				var u = R(s, 2);
				Yr(u, 17, () => B(n).stops, Gr, (e, r, o) => {
					var s = yu();
					let c;
					var l = F(s), u = R(l, 2);
					{
						let e = /* @__PURE__ */ A(ni), n = /* @__PURE__ */ A(() => Z("tip.bg.stopColor"));
						ga(u, {
							get value() {
								return B(r).color;
							},
							get tokens() {
								return B(e);
							},
							get label() {
								return B(n);
							},
							onchange: (e) => kr(t(), i, o, { color: e })
						});
					}
					var d = R(u, 2);
					J(d);
					var f = R(d, 2), p = L(f), m = R(f, 2), h = (e) => {
						var n = vu();
						K(n, () => C.cross, !0), D(n), z((e) => X(n, "title", e), [() => Z("tip.bg.removeStop")]), V("click", n, () => jr(t(), i, o)), U(e, n);
					};
					G(m, (e) => {
						B(n).stops.length > 2 && e(h);
					}), D(s), z((e, t, a) => {
						c = q(s, 1, "nav-line grad-stop svelte-1n46o8q", null, c, {
							dragging: B(H)?.layer === i && B(H).from === o,
							"drop-above": B(H)?.layer === i && B(H).insert === o,
							"drop-below": B(H)?.layer === i && B(H).insert === B(n).stops.length && o === B(n).stops.length - 1
						}), X(l, "title", e), Y(d, B(r).share ?? 50), X(d, "title", t), W(p, `${a ?? ""}%`);
					}, [
						() => Z("tip.bg.dragStop"),
						() => Z("tip.bg.stopShare"),
						() => B(a) > 0 ? Math.round(Math.max(0, Number(B(r).share) || 0) / B(a) * 100) : Math.round(100 / B(n).stops.length)
					]), V("pointerdown", l, (e) => Fr(t(), e, i, o)), V("input", d, (e) => kr(t(), i, o, { share: Number(e.target.value) })), U(e, s);
				});
				var d = R(u, 2), f = L(d, !0), p = R(d, 2), m = (e) => {
					var r = bu(), a = I(r), o = F(a), s = L(R(o));
					D(a);
					var c = R(a, 2);
					J(c);
					var l = R(c, 2), u = F(l), d = L(R(u));
					D(l);
					var f = R(l, 2);
					J(f), z((e, t, r, i) => {
						W(o, `${e ?? ""} `), W(s, `${t ?? ""}%`), Y(c, B(n).x ?? .5), W(u, `${r ?? ""} `), W(d, `${i ?? ""}%`), Y(f, B(n).y ?? .5);
					}, [
						() => Z("lbl.centerX"),
						() => Math.round((B(n).x ?? .5) * 100),
						() => Z("lbl.centerY"),
						() => Math.round((B(n).y ?? .5) * 100)
					]), V("input", c, (e) => Er(t(), i, "x", Number(e.target.value))), V("input", f, (e) => Er(t(), i, "y", Number(e.target.value))), U(e, r);
				}, h = (e) => {
					var r = xu(), a = I(r), o = F(a), s = L(R(o));
					D(a);
					var c = R(a, 2);
					J(c), z((e) => {
						W(o, `${e ?? ""} `), W(s, `${B(n).angle ?? ""}°`), Y(c, B(n).angle);
					}, [() => Z("lbl.angle")]), V("input", c, (e) => Er(t(), i, "angle", Number(e.target.value))), U(e, r);
				};
				G(p, (e) => {
					(B(n).kind ?? "linear") === "radial" ? e(m) : e(h, -1);
				});
				var g = R(p, 2), _ = F(g), v = L(R(_));
				D(g);
				var y = R(g, 2);
				J(y);
				var b = R(y, 2), x = F(b), S = R(x);
				{
					let e = /* @__PURE__ */ A(() => B(n).animation ?? "none");
					Q(S, {
						get value() {
							return B(e);
						},
						get options() {
							return Dr[(B(n).kind ?? "linear") === "radial" ? "radial" : "linear"];
						},
						onchange: (e) => Er(t(), i, "animation", e)
					});
				}
				D(b), z((e, t, r, i, a, o, s) => {
					W(c, `${e ?? ""} `), X(d, "title", t), W(f, r), W(_, `${i ?? ""} `), W(v, `${a ?? ""}%`), Y(y, B(n).opacity ?? 1), X(b, "title", o), W(x, `${s ?? ""} `);
				}, [
					() => Z("blocks.shape"),
					() => Z("tip.bg.addStop"),
					() => Z("ui.addStop"),
					() => Z("lbl.strength"),
					() => Math.round((B(n).opacity ?? 1) * 100),
					() => Z("tip.bg.motion"),
					() => Z("lbl.motion")
				]), V("click", d, () => Ar(t(), i)), V("input", y, (e) => Er(t(), i, "opacity", Number(e.target.value))), U(e, o);
			}, h = (e) => {
				var n = Cu(), a = I(n), o = F(a), s = R(o);
				{
					let e = /* @__PURE__ */ A(ni), n = /* @__PURE__ */ A(() => Z("tip.bg.glowColor"));
					ga(s, {
						get value() {
							return B(r).props.color;
						},
						get tokens() {
							return B(e);
						},
						get label() {
							return B(n);
						},
						onchange: (e) => gr(t(), i, "color", e)
					});
				}
				D(a);
				var c = R(a, 2), l = F(c), u = L(R(l));
				D(c);
				var d = R(c, 2);
				J(d);
				var f = R(d, 2), p = F(f), m = L(R(p));
				D(f);
				var h = R(f, 2);
				J(h);
				var g = R(h, 2), _ = F(g), v = L(R(_));
				D(g);
				var y = R(g, 2);
				J(y);
				var b = R(y, 2), x = F(b), S = L(R(x));
				D(b);
				var C = R(b, 2);
				J(C), z((e, t, n, i, a, s, c, f, g) => {
					W(o, `${e ?? ""} `), W(l, `${t ?? ""} `), W(u, `${n ?? ""}%`), Y(d, B(r).props.x), W(p, `${i ?? ""} `), W(m, `${a ?? ""}%`), Y(h, B(r).props.y), W(_, `${s ?? ""} `), W(v, `${c ?? ""}%`), Y(y, B(r).props.radius), W(x, `${f ?? ""} `), W(S, `${g ?? ""}%`), Y(C, B(r).props.opacity);
				}, [
					() => Z("lbl.color"),
					() => Z("lbl.posX"),
					() => Math.round(B(r).props.x * 100),
					() => Z("lbl.posY"),
					() => Math.round(B(r).props.y * 100),
					() => Z("lbl.size"),
					() => Math.round(B(r).props.radius * 100),
					() => Z("lbl.strength"),
					() => Math.round(B(r).props.opacity * 100)
				]), V("input", d, (e) => gr(t(), i, "x", Number(e.target.value))), V("input", h, (e) => gr(t(), i, "y", Number(e.target.value))), V("input", y, (e) => gr(t(), i, "radius", Number(e.target.value))), V("input", C, (e) => gr(t(), i, "opacity", Number(e.target.value))), U(e, n);
			}, g = (e) => {
				var n = wu(), a = I(n), o = F(a), s = L(R(o));
				D(a);
				var c = R(a, 2);
				J(c), z((e, t) => {
					W(o, `${e ?? ""} `), W(s, `${t ?? ""}%`), Y(c, B(r).props.opacity);
				}, [() => Z("lbl.strength"), () => Math.round(B(r).props.opacity * 100)]), V("input", c, (e) => gr(t(), i, "opacity", Number(e.target.value))), U(e, n);
			}, _ = (e) => {
				let n = /* @__PURE__ */ A(() => B(r).props.fit === "tile" || B(r).props.fit === "repeat");
				var a = Du(), o = I(a), s = F(o), c = R(s);
				D(o);
				var l = R(o, 2), u = F(l), d = R(u);
				{
					let e = /* @__PURE__ */ A(() => B(n) ? "tile" : "plain"), r = /* @__PURE__ */ A(() => [["plain", Z("opt.img.plain")], ["tile", Z("opt.img.tile")]]);
					Q(d, {
						get value() {
							return B(e);
						},
						get options() {
							return B(r);
						},
						onchange: (e) => gr(t(), i, "fit", e)
					});
				}
				D(l);
				var f = R(l, 2), p = L(f, !0), m = R(f, 2), h = F(m), g = R(h, 2);
				J(g);
				var _ = R(g, 4);
				D(m);
				var v = R(m, 2), y = (e) => {
					var n = Tu(), a = I(n), o = F(a), s = L(o, !0), c = R(o, 2), l = L(c, !0);
					D(a);
					var u = R(a, 2), d = L(u, !0), f = R(u, 2), p = R(f, 2), m = F(p), h = L(R(m));
					D(p);
					var g = R(p, 2);
					J(g);
					var _ = R(g, 2), v = F(_), y = L(R(v));
					D(_);
					var b = R(_, 2);
					J(b), z((e, t, n, i, a, p, _, x, S, C, w, ee) => {
						X(o, "title", e), W(s, t), X(c, "title", n), W(l, i), X(u, "title", a), W(d, p), vi(f, `--fx:${_ ?? ""}%; --fy:${x ?? ""}%`), W(m, `${S ?? ""} `), W(h, `${C ?? ""}%`), Y(g, B(r).props.x ?? .5), W(v, `${w ?? ""} `), W(y, `${ee ?? ""}%`), Y(b, B(r).props.y ?? .5);
					}, [
						() => Z("tip.bg.cover"),
						() => Z("ui.cover"),
						() => Z("opt.fitFrame.contain"),
						() => Z("opt.fit.contain"),
						() => Z("tip.bg.position"),
						() => Z("lbl.position"),
						() => Math.max(0, Math.min(1, B(r).props.x ?? .5)) * 100,
						() => Math.max(0, Math.min(1, B(r).props.y ?? .5)) * 100,
						() => Z("lbl.horizontal"),
						() => Math.round((B(r).props.x ?? .5) * 100),
						() => Z("lbl.vertical"),
						() => Math.round((B(r).props.y ?? .5) * 100)
					]), V("click", o, () => xr(t(), i, B(r), "cover")), V("click", c, () => xr(t(), i, B(r), "contain")), V("pointerdown", f, (e) => _r(e, t(), i, "xy")), V("input", g, (e) => gr(t(), i, "x", Number(e.target.value))), V("input", b, (e) => gr(t(), i, "y", Number(e.target.value))), U(e, n);
				};
				G(v, (e) => {
					B(n) || e(y);
				});
				var b = R(v, 2), x = F(b), S = L(R(x));
				D(b);
				var C = R(b, 2);
				J(C);
				var w = R(C, 2), ee = F(w), te = L(R(ee));
				D(w);
				var ne = R(w, 2);
				J(ne);
				var re = R(ne, 2), ie = F(re);
				J(ie);
				var T = R(ie);
				D(re);
				var ae = R(re, 2), oe = (e) => {
					var n = Eu(), a = I(n), o = F(a), s = L(R(o));
					D(a);
					var c = R(a, 2);
					J(c);
					var l = R(c, 2), u = F(l), d = R(u);
					{
						let e = /* @__PURE__ */ A(() => B(r).props.bleed ?? "none"), n = /* @__PURE__ */ A(() => [
							["none", Z("common.none")],
							["up", Z("opt.bleed.up")],
							["down", Z("opt.bleed.down")],
							["both", Z("opt.brand.both")]
						]);
						Q(d, {
							get value() {
								return B(e);
							},
							get options() {
								return B(n);
							},
							onchange: (e) => gr(t(), i, "bleed", e)
						});
					}
					D(l), z((e, t, n, i) => {
						W(o, `${e ?? ""} `), W(s, `${t ?? ""}%`), Y(c, B(r).props.parallax ?? .3), X(l, "title", n), W(u, `${i ?? ""} `);
					}, [
						() => Z("lbl.parallaxStrength"),
						() => Math.round((B(r).props.parallax ?? 0) * 100),
						() => Z("tip.bg.bleed"),
						() => Z("lbl.bleed")
					]), V("input", c, (e) => gr(t(), i, "parallax", Number(e.target.value))), U(e, n);
				};
				G(ae, (e) => {
					(B(r).props.parallax ?? 0) > 0 && e(oe);
				}), z((e, t, n, i, a, c, d, m, v, y, b, w, ae, oe) => {
					X(o, "title", e), W(s, `${t ?? ""} `), X(l, "title", n), W(u, `${i ?? ""} `), X(f, "title", a), W(p, c), X(h, "title", d), Y(g, m), X(_, "title", v), W(x, `${y ?? ""} `), W(S, `${B(r).props.blur ?? 0 ?? ""} px`), Y(C, B(r).props.blur ?? 0), W(ee, `${b ?? ""} `), W(te, `${w ?? ""}%`), Y(ne, B(r).props.opacity ?? 1), X(re, "title", ae), Ci(ie, (B(r).props.parallax ?? 0) > 0), W(T, ` ${oe ?? ""}`);
				}, [
					() => Z("tip.webpAuto"),
					() => B(r).props.src ? Z("ui.changeImage") : Z("ui.chooseImage"),
					() => Z("tip.bg.fit"),
					() => Z("lbl.fit"),
					() => Z("tip.bg.size"),
					() => Z("lbl.size"),
					() => Z("tip.smaller"),
					() => Math.round((B(r).props.size ?? 1) * 100),
					() => Z("tip.larger"),
					() => Z("lbl.blur"),
					() => Z("lbl.strength"),
					() => Math.round((B(r).props.opacity ?? 1) * 100),
					() => Z("tip.bg.parallax"),
					() => Z("lbl.parallax")
				]), V("change", c, (e) => Br(t(), i, e)), V("click", h, () => yr(t(), i, B(r).props.size ?? 1, -.05)), V("change", g, (e) => br(t(), i, e.target.value)), V("click", _, () => yr(t(), i, B(r).props.size ?? 1, .05)), V("input", C, (e) => gr(t(), i, "blur", Number(e.target.value))), V("input", ne, (e) => gr(t(), i, "opacity", Number(e.target.value))), V("change", ie, (e) => gr(t(), i, "parallax", e.target.checked ? .3 : 0)), U(e, a);
			}, v = (e) => {
				var n = ku(), a = I(n), o = F(a), s = R(o);
				D(a);
				var c = R(a, 2);
				Yr(c, 17, () => B(r).props.images ?? [], Gr, (e, n, a) => {
					var o = Ou(), s = I(o), c = F(s), l = R(c, 2), u = F(l);
					u.disabled = a === 0, K(u, () => C.up, !0), D(u);
					var d = R(u, 2);
					K(d, () => C.down, !0), D(d);
					var f = R(d, 2);
					K(f, () => C.cross, !0), D(f), D(l), D(s);
					var p = R(s, 2), m = F(p), h = L(R(m));
					D(p);
					var g = R(p, 2);
					J(g);
					var _ = R(g, 2), v = F(_), y = L(R(v));
					D(_);
					var b = R(_, 2);
					J(b), z((e, t, i, o, s) => {
						X(c, "src", B(n).src), d.disabled = a === B(r).props.images.length - 1, X(f, "title", e), W(m, `${t ?? ""} `), W(h, `${i ?? ""}%`), Y(g, B(n).x ?? .5), W(v, `${o ?? ""} `), W(y, `${s ?? ""}%`), Y(b, B(n).y ?? .5);
					}, [
						() => Z("tip.removeImage"),
						() => Z("lbl.focusX"),
						() => Math.round((B(n).x ?? .5) * 100),
						() => Z("lbl.focusY"),
						() => Math.round((B(n).y ?? .5) * 100)
					]), V("click", u, () => Wr(t(), i, a, -1)), V("click", d, () => Wr(t(), i, a, 1)), V("click", f, () => Kr(t(), i, a)), V("input", g, (e) => qr(t(), i, a, "x", Number(e.target.value))), V("input", b, (e) => qr(t(), i, a, "y", Number(e.target.value))), U(e, o);
				});
				var l = R(c, 2), u = F(l), d = R(u);
				{
					let e = /* @__PURE__ */ A(() => B(r).props.fit ?? "cover"), n = /* @__PURE__ */ A(() => [["cover", Z("opt.fit.cover")], ["contain", Z("opt.fit.contain")]]);
					Q(d, {
						get value() {
							return B(e);
						},
						get options() {
							return B(n);
						},
						onchange: (e) => gr(t(), i, "fit", e)
					});
				}
				D(l);
				var f = R(l, 2), p = F(f), m = R(p);
				J(m), D(f);
				var h = R(f, 2), g = F(h), _ = L(R(g));
				D(h);
				var v = R(h, 2);
				J(v);
				var y = R(v, 2), b = F(y), x = L(R(b));
				D(y);
				var S = R(y, 2);
				J(S);
				var w = R(S, 2), ee = F(w), te = L(R(ee));
				D(w);
				var ne = R(w, 2);
				J(ne);
				var re = L(R(ne, 2), !0);
				z((e, t, n, i, s, c, l, d, h, y, C) => {
					X(a, "title", e), W(o, `${t ?? ""} `), W(u, `${n ?? ""} `), X(f, "title", i), W(p, `${s ?? ""} `), Y(m, B(r).props.interval ?? 6), W(g, `${c ?? ""} `), W(_, `${l ?? ""} s`), Y(v, B(r).props.fade ?? 1.5), W(b, `${d ?? ""} `), W(x, `${B(r).props.blur ?? 0 ?? ""} px`), Y(S, B(r).props.blur ?? 0), W(ee, `${h ?? ""} `), W(te, `${y ?? ""}%`), Y(ne, B(r).props.opacity ?? 1), W(re, C);
				}, [
					() => Z("tip.bg.addImages"),
					() => Z("ui.addImages"),
					() => Z("lbl.fit"),
					() => Z("hint.bg.gallery"),
					() => Z("lbl.secondsPerImage"),
					() => Z("lbl.transition"),
					() => (B(r).props.fade ?? 1.5).toFixed(1),
					() => Z("lbl.blur"),
					() => Z("lbl.strength"),
					() => Math.round((B(r).props.opacity ?? 1) * 100),
					() => Z("hint.bg.gallery")
				]), V("change", s, (e) => Ur(t(), i, e)), V("change", m, (e) => gr(t(), i, "interval", Number(e.target.value))), V("input", v, (e) => gr(t(), i, "fade", Number(e.target.value))), V("input", S, (e) => gr(t(), i, "blur", Number(e.target.value))), V("input", ne, (e) => gr(t(), i, "opacity", Number(e.target.value))), U(e, n);
			}, y = (e) => {
				var n = ju(), a = I(n), o = F(a), s = R(o);
				D(a);
				var c = R(a, 2), l = F(c), u = R(l);
				D(c);
				var d = R(c, 2), f = F(d), p = R(f);
				{
					let e = /* @__PURE__ */ A(() => B(r).props.fit ?? "cover"), n = /* @__PURE__ */ A(() => [["cover", Z("opt.fit.cover")], ["contain", Z("opt.fit.contain")]]);
					Q(p, {
						get value() {
							return B(e);
						},
						get options() {
							return B(n);
						},
						onchange: (e) => gr(t(), i, "fit", e)
					});
				}
				D(d);
				var m = R(d, 2), h = F(m), g = L(R(h));
				D(m);
				var _ = R(m, 2);
				J(_);
				var v = R(_, 2), y = F(v), b = L(R(y));
				D(v);
				var x = R(v, 2);
				J(x);
				var S = R(x, 2), C = F(S), w = L(R(C));
				D(S);
				var ee = R(S, 2);
				J(ee);
				var te = R(ee, 2), ne = F(te);
				J(ne);
				var re = R(ne);
				D(te);
				var ie = R(te, 2), T = (e) => {
					var n = Au(), a = I(n), o = F(a), s = L(R(o));
					D(a);
					var c = R(a, 2);
					J(c), z((e, t) => {
						W(o, `${e ?? ""} `), W(s, `${t ?? ""}%`), Y(c, B(r).props.parallax ?? .3);
					}, [() => Z("lbl.parallaxStrength"), () => Math.round((B(r).props.parallax ?? 0) * 100)]), V("input", c, (e) => gr(t(), i, "parallax", Number(e.target.value))), U(e, n);
				};
				G(ie, (e) => {
					(B(r).props.parallax ?? 0) > 0 && e(T);
				}), z((e, t, n, i, s, u, p, m, v, S, ie, T, ae, oe) => {
					X(a, "title", e), W(o, `${t ?? ""} `), X(c, "title", n), W(l, `${i ?? ""} `), X(d, "title", s), W(f, `${u ?? ""} `), W(h, `${p ?? ""} `), W(g, `${m ?? ""}%`), Y(_, B(r).props.x ?? .5), W(y, `${v ?? ""} `), W(b, `${S ?? ""}%`), Y(x, B(r).props.y ?? .5), W(C, `${ie ?? ""} `), W(w, `${T ?? ""}%`), Y(ee, B(r).props.opacity ?? 1), X(te, "title", ae), Ci(ne, (B(r).props.parallax ?? 0) > 0), W(re, ` ${oe ?? ""}`);
				}, [
					() => Z("tip.bg.videoFile"),
					() => B(r).props.src ? Z("ui.changeVideo") : Z("ui.chooseVideo"),
					() => Z("tip.bg.poster"),
					() => B(r).props.poster ? Z("ui.changeImage") : Z("ui.choosePoster"),
					() => Z("tip.bg.fit"),
					() => Z("lbl.fit"),
					() => Z("lbl.horizontal"),
					() => Math.round((B(r).props.x ?? .5) * 100),
					() => Z("lbl.vertical"),
					() => Math.round((B(r).props.y ?? .5) * 100),
					() => Z("lbl.strength"),
					() => Math.round((B(r).props.opacity ?? 1) * 100),
					() => Z("tip.bg.parallax"),
					() => Z("lbl.parallax")
				]), V("change", s, (e) => Vr(t(), i, e)), V("change", u, (e) => Hr(t(), i, e)), V("input", _, (e) => gr(t(), i, "x", Number(e.target.value))), V("input", x, (e) => gr(t(), i, "y", Number(e.target.value))), V("input", ee, (e) => gr(t(), i, "opacity", Number(e.target.value))), V("change", ne, (e) => gr(t(), i, "parallax", e.target.checked ? .3 : 0)), U(e, n);
			};
			G(f, (e) => {
				B(r).type === "color" ? e(p) : B(r).type === "gradient" ? e(m, 1) : B(r).type === "glow" ? e(h, 2) : B(r).type === "grain" ? e(g, 3) : B(r).type === "image" ? e(_, 4) : B(r).type === "slideshow" ? e(v, 5) : B(r).type === "video" && e(y, 6);
			}), D(a), z((e, t, r) => {
				X(l, "title", e), X(u, "title", t), u.disabled = i === n().length - 1, X(d, "title", r);
			}, [
				() => Z("hint.bg.order"),
				() => Z("hint.bg.order"),
				() => Z("tip.bg.removeLayer")
			]), V("click", l, () => hr(t(), i, -1)), V("click", u, () => hr(t(), i, 1)), V("click", d, () => mr(t(), i)), U(e, a);
		});
		var a = R(i, 2), o = F(a), s = R(o);
		{
			let e = /* @__PURE__ */ A(() => x.map(([e, t]) => [e, t.labelKey ? Z(t.labelKey) : t.label]));
			Q(s, {
				get value() {
					return B(dr);
				},
				get options() {
					return B(e);
				},
				onchange: (e) => N(dr, e, !0)
			});
		}
		D(a);
		var c = R(a, 2), l = L(c, !0);
		z((e, t) => {
			W(o, `${e ?? ""} `), W(l, t);
		}, [() => Z("lbl.newLayer"), () => Z("ui.addLayer")]), V("click", c, () => fr(t(), B(dr))), U(e, r);
	}, r = (e, t = f, n = f) => {
		var r = Pr();
		Yr(I(r), 17, n, Gr, (e, r, i) => {
			var a = Fu(), o = F(a);
			J(o);
			var s = R(o, 2), c = F(s);
			c.disabled = i === 0, K(c, () => C.up, !0), D(c);
			var l = R(c, 2);
			K(l, () => C.down, !0), D(l);
			var u = R(l, 2);
			K(u, () => C.cross, !0), D(u), D(s);
			var d = R(s, 2), f = F(d);
			{
				let e = /* @__PURE__ */ A(() => B(r).page ?? "__href"), n = /* @__PURE__ */ A(() => Z("tip.linkTarget")), a = /* @__PURE__ */ A(() => [...B(k).pages.map((e) => [e.id, e.title]), ["__href", Z("opt.linkHref")]]);
				Q(f, {
					get value() {
						return B(e);
					},
					get title() {
						return B(n);
					},
					get options() {
						return B(a);
					},
					onchange: (e) => su(t(), i, e)
				});
			}
			D(d);
			var p = R(d, 2), m = (e) => {
				var n = Pu();
				J(n), z((e, t) => {
					Y(n, B(r).href ?? ""), X(n, "placeholder", e), X(n, "title", t);
				}, [() => Z("ph.hrefAnchor"), () => Z("tip.hrefAnchor")]), V("change", n, (e) => cu(t(), i, e.target.value)), U(e, n);
			};
			G(p, (e) => {
				B(r).page || e(m);
			}), D(a), z((e, t) => {
				Y(o, B(r).label), X(o, "title", e), l.disabled = i === n().length - 1, X(u, "title", t);
			}, [() => Z("tip.linkLabel"), () => Z("tip.removeLink")]), V("input", o, (e) => ou(t(), i, e.target.value)), V("click", c, () => au(t(), i, -1)), V("click", l, () => au(t(), i, 1)), V("click", u, () => iu(t(), i)), U(e, a);
		}), U(e, r);
	}, i = (e) => {
		let t = /* @__PURE__ */ A(() => B(j).props.boxStyle ?? {});
		var n = Ru(), r = I(n), i = F(r), a = R(i);
		{
			let e = /* @__PURE__ */ A(() => B(t).bg ?? ""), n = /* @__PURE__ */ A(ni), r = /* @__PURE__ */ A(() => Z("tip.box.bg"));
			ga(a, {
				get value() {
					return B(e);
				},
				get tokens() {
					return B(n);
				},
				allowClear: !0,
				get label() {
					return B(r);
				},
				onchange: (e) => _n({ bg: e || null })
			});
		}
		D(r);
		var o = R(r, 2), s = F(o), c = R(s);
		{
			let e = /* @__PURE__ */ A(() => B(t).shadow ?? ""), n = /* @__PURE__ */ A(() => [
				["", Z("common.none")],
				["soft", Z("opt.shadow.soft")],
				["strong", Z("opt.shadow.strong")]
			]);
			Q(c, {
				get value() {
					return B(e);
				},
				get options() {
					return B(n);
				},
				onchange: (e) => _n({ shadow: e || null })
			});
		}
		D(o);
		var l = R(o, 2), u = (e) => {
			var n = Iu(), r = F(n), i = R(r);
			{
				let e = /* @__PURE__ */ A(() => B(t).shadowColor ?? ""), n = /* @__PURE__ */ A(ni), r = /* @__PURE__ */ A(() => Z("tip.box.shadowColor"));
				ga(i, {
					get value() {
						return B(e);
					},
					get tokens() {
						return B(n);
					},
					allowClear: !0,
					get label() {
						return B(r);
					},
					onchange: (e) => _n({ shadowColor: e || null })
				});
			}
			D(n), z((e) => W(r, `${e ?? ""} `), [() => Z("lbl.shadowColor")]), U(e, n);
		};
		G(l, (e) => {
			B(t).shadow && e(u);
		});
		var d = R(l, 2), f = F(d), p = R(f);
		{
			let e = /* @__PURE__ */ A(() => B(t).border === "none" ? "none" : B(t).border ? "custom" : ""), n = /* @__PURE__ */ A(() => [
				["", Z("opt.border.theme")],
				["none", Z("common.none")],
				["custom", Z("opt.border.custom")]
			]);
			Q(p, {
				get value() {
					return B(e);
				},
				get options() {
					return B(n);
				},
				onchange: (e) => _n({ border: e === "custom" ? {
					color: "accent",
					width: 1
				} : e || null })
			});
		}
		D(d);
		var m = R(d, 2), h = (e) => {
			let n = /* @__PURE__ */ A(() => typeof B(t).border == "object" ? B(t).border : {
				color: "text",
				width: 1
			});
			var r = Lu(), i = I(r), a = F(i), o = R(a);
			{
				let e = /* @__PURE__ */ A(ni), t = /* @__PURE__ */ A(() => Z("tip.box.borderColor"));
				ga(o, {
					get value() {
						return B(n).color;
					},
					get tokens() {
						return B(e);
					},
					get label() {
						return B(t);
					},
					onchange: (e) => _n({ border: {
						...B(n),
						color: e
					} })
				});
			}
			D(i);
			var s = R(i, 2), c = F(s), l = R(c), u = F(l), d = R(u, 2);
			J(d);
			var f = R(d, 2);
			D(l), D(s), z((e, t, r, i, o, s) => {
				W(a, `${e ?? ""} `), W(c, `${t ?? ""} `), X(u, "title", r), X(u, "aria-label", i), Y(d, B(n).width), X(f, "title", o), X(f, "aria-label", s);
			}, [
				() => Z("lbl.borderColor"),
				() => Z("lbl.thicknessPx"),
				() => Z("tip.thinner"),
				() => Z("tip.thinner"),
				() => Z("tip.thicker"),
				() => Z("tip.thicker")
			]), V("click", u, () => _n({ border: {
				...B(n),
				width: Math.max(1, B(n).width - 1)
			} })), V("change", d, (e) => _n({ border: {
				...B(n),
				width: Math.min(12, Math.max(1, Number(e.target.value) || 1))
			} })), V("click", f, () => _n({ border: {
				...B(n),
				width: Math.min(12, B(n).width + 1)
			} })), U(e, r);
		};
		G(m, (e) => {
			B(t).border !== "none" && e(h);
		});
		var g = R(m, 2), _ = F(g);
		J(_);
		var v = R(_);
		D(g), z((e, t, n, r, a, o) => {
			W(i, `${e ?? ""} `), W(s, `${t ?? ""} `), W(f, `${n ?? ""} `), X(g, "title", r), Ci(_, a), W(v, ` ${o ?? ""}`);
		}, [
			() => Z("lbl.blockColor"),
			() => Z("lbl.shadow"),
			() => Z("lbl.border"),
			() => Z("tip.box.glass"),
			() => !!B(t).glass,
			() => Z("lbl.glass")
		]), V("change", _, (e) => _n({ glass: e.target.checked || null })), U(e, n);
	}, a = (e) => {
		var t = nf(), n = I(t), r = F(n), a = F(r);
		let o;
		var s = L(a, !0), c = R(a, 2);
		let l;
		var u = L(c, !0);
		D(r), D(n);
		var d = R(n, 2), f = (e) => {
			var t = Pr(), n = I(t), r = (e) => {
				var t = zu(), n = L(t, !0);
				z((e) => W(n, e), [() => Z("hint.textInline")]), U(e, t);
			}, i = (e) => {
				var t = Wu(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.mode ?? "mailto"), t = /* @__PURE__ */ A(() => [["mailto", Z("form.modeMailto")], ["endpoint", Z("form.modeEndpoint")]]);
					Q(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => P("mode", e)
					});
				}
				D(n);
				var a = R(n, 2), o = (e) => {
					var t = Bu(), n = F(t), r = R(n);
					J(r), D(t), z((e, i, a) => {
						X(t, "title", e), W(n, `${i ?? ""} `), Y(r, B(j).props.endpoint ?? ""), X(r, "placeholder", a);
					}, [
						() => Z("form.endpointNote"),
						() => Z("form.endpoint"),
						() => Z("form.endpointPh")
					]), V("change", r, (e) => P("endpoint", e.target.value.trim())), U(e, t);
				}, s = (e) => {
					var t = Vu(), n = I(t), r = F(n), i = R(r);
					J(i), D(n);
					var a = R(n, 2), o = F(a), s = R(o);
					J(s), D(a), z((e, t, n, a) => {
						W(r, `${e ?? ""} `), Y(i, B(j).props.recipient ?? ""), X(i, "placeholder", t), W(o, `${n ?? ""} `), Y(s, B(j).props.subject ?? ""), X(s, "placeholder", a);
					}, [
						() => Z("form.recipient"),
						() => Z("form.recipientPh"),
						() => Z("form.subject"),
						() => Z("form.subjectPh")
					]), V("change", i, (e) => P("recipient", e.target.value.trim())), V("change", s, (e) => P("subject", e.target.value.trim())), U(e, t);
				};
				G(a, (e) => {
					(B(j).props.mode ?? "mailto") === "endpoint" ? e(o) : e(s, -1);
				});
				var c = R(a, 2), l = L(c, !0), u = R(c, 2);
				Yr(u, 19, () => B(j).props.fields ?? [], (e, t) => e.id ?? t, (e, t, n) => {
					var r = Uu(), i = I(r), a = F(i);
					J(a);
					var o = R(a, 2);
					{
						let e = /* @__PURE__ */ A(() => B(t).type ?? "text"), r = /* @__PURE__ */ A(() => vn.map((e) => [e, Z(`form.type${e[0].toUpperCase()}${e.slice(1)}`)]));
						Q(o, {
							get value() {
								return B(e);
							},
							get options() {
								return B(r);
							},
							onchange: (e) => Sn(B(n), { type: e })
						});
					}
					var s = R(o, 2), c = F(s);
					K(c, () => C.up, !0), D(c);
					var l = R(c, 2);
					K(l, () => C.down, !0), D(l);
					var u = R(l, 2);
					K(u, () => C.cross, !0), D(u), D(s), D(i);
					var d = R(i, 2), f = F(d);
					J(f);
					var p = R(f);
					D(d);
					var m = R(d, 2), h = (e) => {
						var r = Hu();
						J(r), z((e, t) => {
							Y(r, e), X(r, "placeholder", t);
						}, [() => (B(t).options ?? []).join(", "), () => Z("form.optionsPh")]), V("change", r, (e) => Cn(B(n), e.target.value)), U(e, r);
					}, g = /* @__PURE__ */ A(() => yn.has(B(t).type));
					G(m, (e) => {
						B(g) && e(h);
					}), z((e, r, i) => {
						Y(a, B(t).label), X(a, "placeholder", e), c.disabled = B(n) === 0, l.disabled = B(n) === (B(j).props.fields?.length ?? 0) - 1, X(u, "title", r), Ci(f, B(t).required === !0), W(p, ` ${i ?? ""}`);
					}, [
						() => Z("form.fieldNamePh"),
						() => Z("form.removeField"),
						() => Z("form.required")
					]), V("change", a, (e) => Sn(B(n), { label: e.target.value.trim() || Z("form.fieldFallback") })), V("click", c, () => En(B(n), -1)), V("click", l, () => En(B(n), 1)), V("click", u, () => Tn(B(n))), V("change", f, (e) => Sn(B(n), { required: e.target.checked })), U(e, r);
				});
				var d = R(u, 2), f = L(d, !0), p = R(d, 2), m = F(p), h = R(m);
				J(h), D(p);
				var g = R(p, 2), _ = F(g), v = R(_);
				J(v), D(g), z((e, t, i, a, o, s, c, u) => {
					X(n, "title", e), W(r, `${t ?? ""} `), W(l, i), W(f, a), W(m, `${o ?? ""} `), Y(h, B(j).props.submitLabel ?? ""), X(h, "placeholder", s), W(_, `${c ?? ""} `), Y(v, B(j).props.successText ?? ""), X(v, "placeholder", u);
				}, [
					() => Z("form.modeTitle"),
					() => Z("form.mode"),
					() => Z("form.fields"),
					() => Z("form.addField"),
					() => Z("lbl.buttonText"),
					() => Z("form.sendDefault"),
					() => Z("form.receipt"),
					() => Z("form.thanksDefault")
				]), V("click", d, wn), V("change", h, (e) => P("submitLabel", e.target.value.trim() || Z("form.sendDefault"))), V("change", v, (e) => P("successText", e.target.value.trim() || Z("form.thanksDefault"))), U(e, t);
			}, a = (e) => {
				var t = Ku(), n = I(t), r = F(n), i = R(r);
				ut(i), D(n);
				var a = R(n, 2), o = F(a), s = R(o);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.view ?? "list"), t = /* @__PURE__ */ A(() => [
						["list", Z("calendar.viewList")],
						["cards", Z("calendar.viewCards")],
						["month", Z("calendar.viewMonth")],
						["next", Z("calendar.viewNext")]
					]);
					Q(s, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => P("view", e)
					});
				}
				D(a);
				var c = R(a, 2), l = (e) => {
					var t = Gu(), n = F(t), r = R(n);
					J(r), D(t), z((e, i) => {
						X(t, "title", e), W(n, `${i ?? ""} `), Y(r, B(j).props.limit ?? 6);
					}, [() => Z("tip.collection.limit"), () => Z("lbl.maxCount")]), V("change", r, (e) => P("limit", Math.max(1, Math.min(50, Number(e.target.value) || 6)))), U(e, t);
				};
				G(c, (e) => {
					((B(j).props.view ?? "list") === "list" || B(j).props.view === "cards") && e(l);
				});
				var u = R(c, 2), d = F(u);
				J(d);
				var f = R(d);
				D(u);
				var p = R(u, 2), m = F(p);
				J(m);
				var h = R(m);
				D(p), z((e, t, n, a, s, c) => {
					W(r, `${e ?? ""} `), X(i, "placeholder", t), Y(i, n), W(o, `${a ?? ""} `), Ci(d, B(j).props.showCategories !== !1), W(f, ` ${s ?? ""}`), Ci(m, B(j).props.showSubscribe !== !1), W(h, ` ${c ?? ""}`);
				}, [
					() => Z("calendar.sources"),
					() => Z("calendar.sourcesPh"),
					() => (B(j).props.sources ?? []).join("\n"),
					() => Z("lbl.view"),
					() => Z("calendar.showCategories"),
					() => Z("calendar.showSubscribe")
				]), V("change", i, (e) => Dn(e.target.value)), V("change", d, (e) => P("showCategories", e.target.checked)), V("change", m, (e) => P("showSubscribe", e.target.checked)), U(e, t);
			}, o = (e) => {
				var t = Ju(), n = I(t), r = F(n);
				J(r);
				var i = R(r);
				D(n);
				var a = R(n, 2), o = L(a, !0), s = R(a, 2);
				Yr(s, 17, () => B(j).props.items ?? [], Gr, (e, t, n) => {
					var r = qu(), i = F(r);
					J(i);
					var a = R(i, 2), o = F(a);
					o.disabled = n === 0, K(o, () => C.up, !0), D(o);
					var s = R(o, 2);
					K(s, () => C.down, !0), D(s);
					var c = R(s, 2);
					K(c, () => C.cross, !0), D(c), D(a), D(r), z((e, r) => {
						Y(i, B(t).q), X(i, "title", e), s.disabled = n === (B(j).props.items?.length ?? 0) - 1, X(c, "title", r);
					}, [() => Z("tip.faq.question"), () => Z("tip.faq.remove")]), V("change", i, (e) => On(n, { q: e.target.value })), V("click", o, () => jn(n, -1)), V("click", s, () => jn(n, 1)), V("click", c, () => An(n)), U(e, r);
				});
				var c = R(s, 2), l = L(c, !0);
				z((e, t, a, s, c) => {
					X(n, "title", e), Ci(r, t), W(i, ` ${a ?? ""}`), W(o, s), W(l, c);
				}, [
					() => Z("tip.faq.multi"),
					() => !!B(j).props.multi,
					() => Z("lbl.faqMulti"),
					() => Z("lbl.questions"),
					() => Z("ui.addQuestion")
				]), V("change", r, (e) => P("multi", e.target.checked)), V("click", c, kn), U(e, t);
			}, s = (e) => {
				var t = Xu(), n = I(t), r = L(n, !0), i = R(n, 2);
				Yr(i, 17, () => B(j).props.items ?? [], Gr, (e, t, n) => {
					var r = Yu(), i = I(r), a = F(i);
					J(a);
					var o = R(a, 2);
					J(o);
					var s = R(o, 2), c = F(s);
					c.disabled = n === 0, K(c, () => C.up, !0), D(c);
					var l = R(c, 2);
					K(l, () => C.down, !0), D(l);
					var u = R(l, 2);
					K(u, () => C.cross, !0), D(u), D(s), D(i);
					var d = R(i, 2);
					J(d), z((e, r, i, s, c, f) => {
						Y(a, B(t).year), X(a, "placeholder", e), X(a, "title", r), Y(o, B(t).title), X(o, "title", i), l.disabled = n === (B(j).props.items?.length ?? 0) - 1, X(u, "title", s), Y(d, B(t).text), X(d, "placeholder", c), X(d, "title", f);
					}, [
						() => Z("ph.tlYear"),
						() => Z("tip.timeline.year"),
						() => Z("tip.timeline.title"),
						() => Z("tip.timeline.remove"),
						() => Z("ph.tlText"),
						() => Z("tip.timeline.text")
					]), V("change", a, (e) => In(n, { year: e.target.value })), V("change", o, (e) => In(n, { title: e.target.value })), V("click", c, () => zn(n, -1)), V("click", l, () => zn(n, 1)), V("click", u, () => Rn(n)), V("change", d, (e) => In(n, { text: e.target.value })), U(e, r);
				});
				var a = R(i, 2), o = L(a, !0);
				z((e, t) => {
					W(r, e), W(o, t);
				}, [() => Z("lbl.timelineItems"), () => Z("ui.addTlItem")]), V("click", a, Ln), U(e, t);
			}, c = (e) => {
				var t = Zu(), n = I(t), r = F(n), i = R(r);
				J(i), D(n);
				var a = R(n, 2), o = F(a), s = R(o);
				J(s), D(a);
				var c = R(a, 2), l = F(c), u = R(l);
				J(u), D(c), z((e, t, n) => {
					W(r, `${e ?? ""} `), Y(i, B(j).props.text ?? ""), W(o, `${t ?? ""} `), Y(s, B(j).props.attribution ?? ""), W(l, `${n ?? ""} `), Y(u, B(j).props.role ?? "");
				}, [
					() => Z("lbl.quoteText"),
					() => Z("lbl.quoteName"),
					() => Z("lbl.quoteRole")
				]), V("change", i, (e) => P("text", e.target.value)), V("change", s, (e) => P("attribution", e.target.value)), V("change", u, (e) => P("role", e.target.value)), U(e, t);
			}, l = (e) => {
				var t = Qu(), n = I(t), r = F(n), i = R(r);
				J(i), D(n);
				var a = R(n, 2), o = F(a), s = R(o);
				J(s), D(a);
				var c = R(a, 2), l = F(c), u = R(l);
				J(u), D(c);
				var d = R(c, 2), f = F(d), p = R(f);
				J(p), D(d), z((e, t, n, a, c) => {
					W(r, `${e ?? ""} `), Y(i, B(j).props.value ?? ""), X(i, "title", t), W(o, `${n ?? ""} `), Y(s, B(j).props.prefix ?? ""), W(l, `${a ?? ""} `), Y(u, B(j).props.suffix ?? ""), W(f, `${c ?? ""} `), Y(p, B(j).props.label ?? "");
				}, [
					() => Z("lbl.statValue"),
					() => Z("tip.stat.value"),
					() => Z("lbl.statPrefix"),
					() => Z("lbl.statSuffix"),
					() => Z("lbl.statLabel")
				]), V("change", i, (e) => P("value", e.target.value)), V("change", s, (e) => P("prefix", e.target.value)), V("change", u, (e) => P("suffix", e.target.value)), V("change", p, (e) => P("label", e.target.value)), U(e, t);
			}, u = (e) => {
				var t = td(), n = I(t), r = L(n, !0), i = R(n, 2);
				Yr(i, 17, () => B(j).props.items ?? [], Gr, (e, t, n) => {
					var r = qu(), i = F(r);
					J(i);
					var a = R(i, 2), o = F(a);
					o.disabled = n === 0, K(o, () => C.up, !0), D(o);
					var s = R(o, 2);
					K(s, () => C.down, !0), D(s);
					var c = R(s, 2);
					K(c, () => C.cross, !0), D(c), D(a), D(r), z((e, r, a, l) => {
						Y(i, B(t)), X(i, "title", e), X(o, "title", r), X(s, "title", a), s.disabled = n === (B(j).props.items?.length ?? 0) - 1, X(c, "title", l);
					}, [
						() => Z("tip.ribbon.item"),
						() => Z("tip.moveUp"),
						() => Z("tip.moveDown"),
						() => Z("tip.ribbon.remove")
					]), V("change", i, (e) => Mn(n, e.target.value)), V("click", o, () => Fn(n, -1)), V("click", s, () => Fn(n, 1)), V("click", c, () => Pn(n)), U(e, r);
				});
				var a = R(i, 2), o = L(a, !0), s = R(a, 2), c = F(s), l = L(c, !0), u = R(c, 2);
				Yr(u, 21, () => B(v), ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ A(() => h(B(t), 2));
					let r = () => B(n)[0], i = () => B(n)[1];
					var a = $u();
					let o;
					K(a, () => m[r()], !0), D(a), z(() => {
						o = q(a, 1, "tile svelte-1n46o8q", null, o, { on: (B(j).props.sep ?? "dot") === r() }), X(a, "aria-pressed", (B(j).props.sep ?? "dot") === r()), X(a, "title", i());
					}), V("click", a, () => P("sep", r())), U(e, a);
				}), D(u), D(s);
				var d = R(s, 2), f = (e) => {
					var t = ed(), n = F(t), r = L(n, !0), i = R(n, 2);
					J(i), D(t), z((e, n) => {
						X(t, "title", e), W(r, n), Y(i, B(j).props.sepText ?? "");
					}, [() => Z("tip.ribbon.sepText"), () => Z("lbl.ribbonSepText")]), V("change", i, (e) => P("sepText", e.target.value)), U(e, t);
				};
				G(d, (e) => {
					B(j).props.sep === "custom" && e(f);
				}), z((e, t, n, i) => {
					W(r, e), W(o, t), W(l, n), X(u, "aria-label", i);
				}, [
					() => Z("lbl.ribbonItems"),
					() => Z("ui.addRibbonItem"),
					() => Z("lbl.ribbonSep"),
					() => Z("lbl.ribbonSep")
				]), V("click", a, Nn), U(e, t);
			}, d = (e) => {
				var t = nd(), n = I(t), r = F(n), i = L(r, !0), a = R(r, 2), o = L(a, !0);
				D(n);
				var s = R(n, 2), c = F(s), l = L(c, !0), u = R(c, 2), d = L(u, !0);
				D(s);
				var f = R(s, 2), p = F(f);
				J(p);
				var m = R(p);
				D(f), z((e, t, n, r, a, s) => {
					W(i, e), W(o, t), W(l, n), W(d, r), X(f, "title", a), Ci(p, B(j).props.header !== !1), W(m, ` ${s ?? ""}`);
				}, [
					() => Z("ui.addRow"),
					() => Z("ui.removeRow"),
					() => Z("ui.addColumn"),
					() => Z("ui.removeColumn"),
					() => Z("tip.table.header"),
					() => Z("lbl.tableHeader")
				]), V("click", r, () => Vn(1, 0)), V("click", a, () => Vn(-1, 0)), V("click", c, () => Vn(0, 1)), V("click", u, () => Vn(0, -1)), V("change", p, (e) => P("header", e.target.checked)), U(e, t);
			}, f = (e) => {
				var t = Pr();
				Yr(I(t), 17, () => [
					["facebook", "Facebook"],
					["x", "X"],
					["linkedin", "LinkedIn"],
					["whatsapp", "WhatsApp"],
					["email", Z("opt.share.email")],
					["copy", Z("opt.share.copy")]
				], ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ A(() => h(B(t), 2));
					let r = () => B(n)[0], i = () => B(n)[1];
					var a = rd(), o = F(a);
					J(o);
					var s = R(o);
					D(a), z((e) => {
						Ci(o, e), W(s, ` ${i() ?? ""}`);
					}, [() => (B(j).props.services ?? []).includes(r())]), V("change", o, (e) => Hn(r(), e.target.checked)), U(e, a);
				}), U(e, t);
			}, p = (e) => {
				var t = id(), n = I(t), r = F(n), i = R(r);
				J(i), D(n);
				var a = R(n, 2), o = F(a), s = R(o);
				J(s), D(a), z((e, t, n) => {
					W(r, `${e ?? ""} `), Y(i, B(j).props.target ?? ""), X(a, "title", t), W(o, `${n ?? ""} `), Y(s, B(j).props.doneText ?? "");
				}, [
					() => Z("lbl.countdownTarget"),
					() => Z("tip.countdown.done"),
					() => Z("lbl.countdownDone")
				]), V("change", i, (e) => P("target", e.target.value)), V("change", s, (e) => P("doneText", e.target.value)), U(e, t);
			}, g = (e) => {
				var t = od(), n = I(t), r = F(n), i = R(r);
				D(n);
				var a = R(n, 2), o = (e) => {
					var t = ad(), n = L(t, !0);
					z((e) => W(n, e), [() => Z("ui.removeAudio")]), V("click", t, () => P("src", "")), U(e, t);
				};
				G(a, (e) => {
					B(j).props.src && e(o);
				});
				var s = R(a, 2), c = F(s), l = R(c);
				J(l), D(s);
				var u = R(s, 2), d = F(u);
				J(d);
				var f = R(d);
				D(u), z((e, t, i, a, o) => {
					X(n, "title", e), W(r, `${t ?? ""} `), W(c, `${i ?? ""} `), Y(l, B(j).props.title ?? ""), Ci(d, a), W(f, ` ${o ?? ""}`);
				}, [
					() => Z("tip.blocks.audioFile"),
					() => Z("ui.chooseAudio"),
					() => Z("lbl.audioTitle"),
					() => !!B(j).props.loop,
					() => Z("lbl.audioLoop")
				]), V("change", i, Un), V("change", l, (e) => P("title", e.target.value)), V("change", d, (e) => P("loop", e.target.checked)), U(e, t);
			}, _ = (e) => {
				var t = sd(), n = I(t), r = F(n), i = R(r);
				J(i), D(n);
				var a = R(n, 2), o = F(a), s = R(o);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.page ?? "__href"), t = /* @__PURE__ */ A(() => [...B(k).pages.map((e) => [e.id, e.title]), ["__href", Z("opt.externalLink")]]);
					Q(s, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => {
							let t = e === "__href" ? null : e;
							an(`edit:${B(j).blockId}`, (e) => {
								e.props.page = t, t && (e.props.href = null);
							});
						}
					});
				}
				D(a);
				var c = R(a, 2), l = (e) => {
					var t = Hu();
					J(t), z((e) => {
						X(t, "placeholder", e), Y(t, B(j).props.href === "#" ? "" : B(j).props.href ?? "");
					}, [() => Z("ph.url")]), V("change", t, (e) => P("href", e.target.value || null)), U(e, t);
				};
				G(c, (e) => {
					B(j).props.page || e(l);
				}), z((e, t) => {
					W(r, `${e ?? ""} `), Y(i, B(j).props.label), W(o, `${t ?? ""} `);
				}, [() => Z("blocks.text"), () => Z("lbl.goesTo")]), V("change", i, (e) => P("label", e.target.value)), U(e, t);
			}, y = (e) => {
				var t = cd(), n = I(t), r = F(n), i = R(r);
				D(n);
				var a = R(n, 2), o = F(a), s = R(o);
				J(s), D(a);
				var c = R(a, 2), l = F(c), u = R(l);
				J(u), D(c);
				var d = R(c, 2), f = (e) => {
					var t = rd(), n = F(t);
					J(n);
					var r = R(n);
					D(t), z((e, i, a) => {
						X(t, "title", e), Ci(n, i), W(r, ` ${a ?? ""}`);
					}, [
						() => Z("tip.lightbox"),
						() => !!B(j).props.lightbox,
						() => Z("lbl.lightbox")
					]), V("change", n, (e) => P("lightbox", e.target.checked)), U(e, t);
				};
				G(d, (e) => {
					B(j).props.href || e(f);
				}), z((e, t, n, i, a) => {
					W(r, `${e ?? ""} `), W(o, `${t ?? ""} `), Y(s, B(j).props.alt ?? ""), X(s, "placeholder", n), W(l, `${i ?? ""} `), Y(u, B(j).props.href ?? ""), X(u, "placeholder", a);
				}, [
					() => Z("ui.changeImage"),
					() => Z("lbl.description"),
					() => Z("ph.altText"),
					() => Z("lbl.link"),
					() => Z("ph.optionalImageLink")
				]), V("change", i, Gn), V("change", s, (e) => P("alt", e.target.value)), V("change", u, (e) => P("href", e.target.value || null)), U(e, t);
			}, b = (e) => {
				var t = ld(), n = I(t), r = L(n, !0), i = R(n, 2);
				J(i);
				var a = R(i, 2), o = F(a), s = R(o);
				J(s), D(a), z((e, t, a, c) => {
					X(n, "title", e), W(r, t), Y(i, B(j).props.url ?? ""), X(i, "placeholder", a), W(o, `${c ?? ""} `), Y(s, B(j).props.title ?? "");
				}, [
					() => Z("hint.video"),
					() => Z("lbl.videoUrl"),
					() => Z("ph.videoUrl"),
					() => Z("lbl.videoTitle")
				]), V("change", i, (e) => P("url", e.target.value)), V("change", s, (e) => P("title", e.target.value)), U(e, t);
			}, x = (e) => {
				var t = fd(), n = I(t), r = F(n), i = R(r), a = F(i);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.glyph ?? "★"), t = /* @__PURE__ */ A(() => B(j).props.icon ?? null), n = /* @__PURE__ */ A(() => B(j).props.image ?? null);
					ro(a, {
						get value() {
							return B(e);
						},
						get icon() {
							return B(t);
						},
						get image() {
							return B(n);
						},
						onpick: (e) => an(`edit:${B(j).blockId}`, (t) => {
							t.props.glyph = e, t.props.icon = null, t.props.image = null;
						}),
						onicon: (e) => an(`edit:${B(j).blockId}`, (t) => {
							t.props.icon = e, t.props.image = null;
						}),
						onimage: (e) => P("image", e)
					});
				}
				var o = R(a, 2), s = (e) => {
					var t = ud();
					J(t), z((e) => {
						Y(t, B(j).props.glyph ?? ""), X(t, "title", e);
					}, [() => Z("tip.icon.typeGlyph")]), V("change", t, (e) => P("glyph", e.target.value || "★")), U(e, t);
				}, c = (e) => {
					var t = ad(), n = L(t, !0);
					z((e, r) => {
						X(t, "title", e), W(n, r);
					}, [() => Z("tip.icon.backToGlyph"), () => Z("ui.removeDrawnIcon")]), V("click", t, () => P("icon", null)), U(e, t);
				};
				G(o, (e) => {
					B(j).props.icon ? e(c, -1) : e(s);
				}), D(i), D(n);
				var l = R(n, 2), u = (e) => {
					var t = dd(), n = F(t), r = R(n, 2), i = L(r, !0);
					D(t), z((e, r, a) => {
						X(t, "title", e), X(n, "src", B(j).props.image), X(n, "alt", r), W(i, a);
					}, [
						() => Z("hint.icon.ownImage"),
						() => Z("gp.ownIcon"),
						() => Z("ui.removeOwnIcon")
					]), V("click", r, () => P("image", null)), U(e, t);
				};
				G(l, (e) => {
					B(j).props.image && e(u);
				}), z((e) => W(r, `${e ?? ""} `), [() => Z("blocks.icon")]), U(e, t);
			}, S = (e) => {
				var t = pd(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.collection ?? ""), t = /* @__PURE__ */ A(() => [["", Z("common.choose")], ...B(oc).map((e) => [e, B(sc)[e]?.name ?? e])]);
					Q(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => P("collection", e || null)
					});
				}
				D(n);
				var a = R(n, 2), o = F(a), s = R(o);
				J(s), D(a);
				var c = R(a, 2), l = F(c);
				J(l);
				var u = R(l);
				D(c), z((e, t, i, c, d) => {
					X(n, "title", e), W(r, `${t ?? ""} `), X(a, "title", i), W(o, `${c ?? ""} `), Y(s, B(j).props.limit ?? 6), Ci(l, B(j).props.newestFirst !== !1), W(u, ` ${d ?? ""}`);
				}, [
					() => Z("tip.collection.source"),
					() => Z("blocks.collection"),
					() => Z("tip.collection.limit"),
					() => Z("lbl.maxCount"),
					() => Z("lbl.newestFirst")
				]), V("change", s, (e) => P("limit", Number(e.target.value))), V("change", l, (e) => P("newestFirst", e.target.checked)), U(e, t);
			}, w = (e) => {
				var t = gd(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.collection ?? ""), t = /* @__PURE__ */ A(() => [["", Z("common.choose")], ...B(oc).filter((e) => B(sc)[e]?.kind === "products").map((e) => [e, B(sc)[e]?.name ?? e])]);
					Q(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => P("collection", e || null)
					});
				}
				D(n);
				var a = R(n, 2), o = (e) => {
					var t = md(), n = F(t), r = L(n, !0), i = R(n, 2), a = L(i, !0);
					D(t), z((e, t, o, s) => {
						X(n, "title", e), W(r, t), X(i, "title", o), W(a, s);
					}, [
						() => Z("tip.product.addProduct"),
						() => Z("ui.addProduct"),
						() => Z("tip.product.editCatalog"),
						() => Z("ui.editCatalog")
					]), V("click", n, () => qc(B(j).props.collection)), V("click", i, () => {
						N(dc, B(j).props.collection, !0), N(Ft, "collections");
					}), U(e, t);
				}, s = (e) => {
					var t = hd(), n = L(t, !0);
					z((e, r) => {
						X(t, "title", e), W(n, r);
					}, [() => Z("tip.product.createCatalog"), () => Z("ui.createCatalog")]), V("click", t, Hc), U(e, t);
				}, c = /* @__PURE__ */ A(() => !B(oc).some((e) => B(sc)[e]?.kind === "products"));
				G(a, (e) => {
					B(j).props.collection && B(sc)[B(j).props.collection]?.kind === "products" ? e(o) : B(c) && e(s, 1);
				});
				var l = R(a, 2), u = F(l), d = R(u);
				J(d), D(l);
				var f = R(l, 2), p = F(f), m = R(p);
				J(m), D(f), z((e, t, i, a, o, s) => {
					X(n, "title", e), W(r, `${t ?? ""} `), X(l, "title", i), W(u, `${a ?? ""} `), Y(d, B(j).props.limit ?? 0), X(f, "title", o), W(p, `${s ?? ""} `), Y(m, B(j).props.currency ?? "kr");
				}, [
					() => Z("tip.product.source"),
					() => Z("blocks.collection"),
					() => Z("tip.collection.limit"),
					() => Z("lbl.maxCount"),
					() => Z("tip.product.currency"),
					() => Z("lbl.currency")
				]), V("change", d, (e) => P("limit", Number(e.target.value))), V("change", m, (e) => P("currency", e.target.value)), U(e, t);
			}, ee = (e) => {
				var t = _d(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.href ?? ""), t = /* @__PURE__ */ A(() => [["", Z("common.none")], ...B(k).pages.map((e) => [e.path, e.title])]);
					Q(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => P("href", e)
					});
				}
				D(n);
				var a = R(n, 2), o = F(a), s = R(o);
				J(s), D(a), z((e, t, i, c) => {
					X(n, "title", e), W(r, `${t ?? ""} `), X(a, "title", i), W(o, `${c ?? ""} `), Y(s, B(j).props.currency ?? "kr");
				}, [
					() => Z("tip.cart.checkout"),
					() => Z("lbl.checkoutPage"),
					() => Z("tip.product.currency"),
					() => Z("lbl.currency")
				]), V("change", s, (e) => P("currency", e.target.value)), U(e, t);
			}, te = (e) => {
				var t = vd(), n = I(t), r = F(n), i = R(r);
				J(i), D(n);
				var a = R(n, 2), o = F(a), s = R(o);
				J(s), D(a);
				var c = R(a, 2), l = F(c), u = R(l);
				J(u), D(c);
				var d = R(c, 2), f = F(d);
				J(f);
				var p = R(f);
				D(d);
				var m = R(d, 2), h = F(m), g = R(h);
				J(g), D(m), z((e, t, _, v, y, b, x, S, C, w) => {
					X(n, "title", e), W(r, `${t ?? ""} `), Y(i, B(j).props.recipient ?? ""), X(a, "title", _), W(o, `${v ?? ""} `), Y(s, B(j).props.endpoint ?? ""), X(c, "title", y), W(l, `${b ?? ""} `), Y(u, B(j).props.vipps ?? ""), X(d, "title", x), Ci(f, B(j).props.vippsCheckout === !0), W(p, ` ${S ?? ""}`), X(m, "title", C), W(h, `${w ?? ""} `), Y(g, B(j).props.currency ?? "kr");
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
				]), V("change", i, (e) => P("recipient", e.target.value.trim())), V("change", s, (e) => P("endpoint", e.target.value.trim())), V("change", u, (e) => P("vipps", e.target.value.trim())), V("change", f, (e) => P("vippsCheckout", e.target.checked)), V("change", g, (e) => P("currency", e.target.value)), U(e, t);
			}, ne = (e) => {
				var t = bd(), n = I(t), r = F(n), i = R(r);
				D(n), Yr(R(n, 2), 17, () => B(j).props.images ?? [], Gr, (e, t, n) => {
					var r = yd(), i = F(r), a = F(i), o = R(a, 2), s = F(o);
					s.disabled = n === 0, K(s, () => C.up, !0), D(s);
					var c = R(s, 2);
					K(c, () => C.down, !0), D(c);
					var l = R(c, 2);
					K(l, () => C.cross, !0), D(l), D(o), D(i);
					var u = R(i, 2), d = F(u), f = R(d);
					J(f), D(u);
					var p = R(u, 2), m = F(p), h = R(m);
					J(h), D(p), D(r), z((e, r, o, s, u, p) => {
						X(i, "title", e), X(a, "src", B(t).src), c.disabled = n === B(j).props.images.length - 1, X(l, "title", r), W(d, `${o ?? ""} `), Y(f, B(t).alt ?? ""), X(f, "placeholder", s), W(m, `${u ?? ""} `), Y(h, B(t).href ?? ""), X(h, "placeholder", p);
					}, [
						() => Z("hint.gallery"),
						() => Z("tip.removeImage"),
						() => Z("lbl.description"),
						() => Z("ph.altShort"),
						() => Z("lbl.link"),
						() => Z("ph.galleryHref")
					]), V("click", s, () => Ig(n, -1)), V("click", c, () => Ig(n, 1)), V("click", l, () => Lg(n)), V("change", f, (e) => Rg(n, "alt", e.target.value)), V("change", h, (e) => Rg(n, "href", e.target.value || null)), U(e, r);
				}), z((e, t) => {
					X(n, "title", e), W(r, `${t ?? ""} `);
				}, [() => Z("tip.gallery.addImages"), () => Z("ui.addImages")]), V("change", i, Pg), U(e, t);
			}, re = (e) => {
				var t = Iu(), n = F(t);
				Q(R(n), {
					get value() {
						return B(j).props.kind;
					},
					get options() {
						return Jn;
					},
					onchange: (e) => P("kind", e)
				}), D(t), z((e) => W(n, `${e ?? ""} `), [() => Z("blocks.shape")]), U(e, t);
			}, ie = (e) => {
				let t = /* @__PURE__ */ A(() => Tg[B(j).type] ?? B(wg).find((e) => e.type === B(j).type)?.fields ?? []);
				var n = Pr(), r = I(n), i = (e) => {
					var n = Pr();
					Yr(I(n), 17, () => B(t), (e) => e.key, (e, t) => {
						var n = Pr(), r = I(n), i = (e) => {
							let n = /* @__PURE__ */ A(() => `${B(j).blockId}:${B(t).key}`);
							var r = Sd(), i = I(r), a = F(i), o = R(a);
							J(o), D(i);
							var s = R(i, 2), c = L(s, !0), l = R(s, 2), u = (e) => {
								var t = xd();
								let r;
								var i = L(t, !0);
								z(() => {
									r = q(t, 1, "panel-hint svelte-1n46o8q", null, r, { "place-error": dn[B(n)].err }), W(i, dn[B(n)].text);
								}), U(e, t);
							};
							G(l, (e) => {
								dn[B(n)] && e(u);
							}), z((e) => {
								W(a, `${B(t).label ?? ""} `), X(o, "placeholder", B(t).placeholder), Y(o, un[B(n)] ?? B(j).props[B(t).key] ?? ""), s.disabled = B(fn), W(c, e);
							}, [() => Z("props.place.search")]), V("input", o, (e) => {
								un[B(n)] = e.target.value;
							}), V("keydown", o, (e) => {
								e.key === "Enter" && hn(B(t));
							}), V("click", s, () => hn(B(t))), U(e, r);
						}, a = (e) => {
							var n = Cd(), r = F(n), i = R(r);
							J(i), D(n), z(() => {
								W(r, `${B(t).label ?? ""} `), X(i, "min", B(t).min), X(i, "max", B(t).max), X(i, "step", B(t).step ?? 1), Y(i, B(j).props[B(t).key]);
							}), V("change", i, (e) => P(B(t).key, mn(B(t), Number(e.target.value)))), U(e, n);
						}, o = (e) => {
							var n = rd(), r = F(n);
							J(r);
							var i = R(r);
							D(n), z((e) => {
								Ci(r, e), W(i, ` ${B(t).label ?? ""}`);
							}, [() => !!B(j).props[B(t).key]]), V("change", r, (e) => P(B(t).key, e.target.checked)), U(e, n);
						}, s = (e) => {
							var n = Iu(), r = F(n), i = R(r);
							{
								let e = /* @__PURE__ */ A(() => (B(t).options ?? []).map((e) => [e.value, e.label]));
								Q(i, {
									get value() {
										return B(j).props[B(t).key];
									},
									get options() {
										return B(e);
									},
									onchange: (e) => P(B(t).key, e)
								});
							}
							D(n), z(() => W(r, `${B(t).label ?? ""} `)), U(e, n);
						}, c = (e) => {
							var n = wd(), r = F(n), i = R(r);
							J(i), D(n), z(() => {
								W(r, `${B(t).label ?? ""} `), X(i, "placeholder", B(t).placeholder), Y(i, B(j).props[B(t).key] ?? "");
							}), V("change", i, (e) => P(B(t).key, e.target.value)), U(e, n);
						};
						G(r, (e) => {
							B(t).type === "place" ? e(i) : B(t).type === "number" ? e(a, 1) : B(t).type === "toggle" ? e(o, 2) : B(t).type === "select" ? e(s, 3) : e(c, -1);
						}), U(e, n);
					}), U(e, n);
				}, a = (e) => {
					var t = ad(), n = L(t, !0);
					z((e, r) => {
						X(t, "title", e), W(n, r);
					}, [() => Z("hint.pluginBlock"), () => Z("ui.settings")]), V("click", t, () => Qe?.sendOpenConfig(B(j).blockId)), U(e, t);
				};
				G(r, (e) => {
					B(t).length ? e(i) : e(a, -1);
				}), U(e, n);
			};
			G(n, (e) => {
				B(j).type === "text" ? e(r) : B(j).type === "form" ? e(i, 1) : B(j).type === "calendar" ? e(a, 2) : B(j).type === "faq" ? e(o, 3) : B(j).type === "timeline" ? e(s, 4) : B(j).type === "quote" ? e(c, 5) : B(j).type === "stats" ? e(l, 6) : B(j).type === "ribbon" ? e(u, 7) : B(j).type === "table" ? e(d, 8) : B(j).type === "share" ? e(f, 9) : B(j).type === "countdown" ? e(p, 10) : B(j).type === "audio" ? e(g, 11) : B(j).type === "button" ? e(_, 12) : B(j).type === "image" ? e(y, 13) : B(j).type === "video" ? e(b, 14) : B(j).type === "icon" ? e(x, 15) : B(j).type === "collection" ? e(S, 16) : B(j).type === "product" ? e(w, 17) : B(j).type === "cart" ? e(ee, 18) : B(j).type === "checkout" ? e(te, 19) : B(j).type === "gallery" ? e(ne, 20) : B(j).type === "shape" ? e(re, 21) : e(ie, -1);
			}), U(e, t);
		}, p = (e) => {
			var t = tf(), n = I(t), r = (e) => {
				var t = Td(), n = I(t), r = F(n), a = R(r);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.align ?? "left"), t = /* @__PURE__ */ A(() => [
						["left", Z("common.left")],
						["center", Z("common.center")],
						["right", Z("common.right")]
					]);
					Q(a, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => P("align", e)
					});
				}
				D(n);
				var o = R(n, 2), s = F(o);
				J(s);
				var c = R(s);
				D(o);
				var l = R(o, 2), u = (e) => {
					i(e);
				};
				G(l, (e) => {
					B(j).props.box && e(u);
				}), Oe(2), z((e, t, n) => {
					W(r, `${e ?? ""} `), Ci(s, t), W(c, ` ${n ?? ""}`);
				}, [
					() => Z("lbl.align"),
					() => !!B(j).props.box,
					() => Z("lbl.textBoxToggle")
				]), V("change", s, (e) => P("box", e.target.checked)), U(e, t);
			}, a = (e) => {
				var t = Ed(), n = I(t), r = L(n, !0), a = R(n, 2);
				i(a), Oe(2), z((e) => W(r, e), [() => Z("lbl.cardStyle")]), U(e, t);
			}, o = (e) => {
				var t = Dd(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.variant ?? "left"), t = /* @__PURE__ */ A(() => [["left", Z("opt.timeline.left")], ["alternating", Z("opt.timeline.alternating")]]);
					Q(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => P("variant", e)
					});
				}
				D(n);
				var a = R(n, 2), o = F(a), s = R(o);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.marker ?? "filled"), t = /* @__PURE__ */ A(() => [["filled", Z("opt.timeline.filled")], ["ring", Z("opt.timeline.ring")]]);
					Q(s, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => P("marker", e)
					});
				}
				D(a);
				var c = R(a, 2), l = F(c), u = R(l);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.accent ?? "accent"), t = /* @__PURE__ */ A(ni);
					ga(u, {
						get value() {
							return B(e);
						},
						get tokens() {
							return B(t);
						},
						onchange: (e) => P("accent", e === "accent" ? null : e)
					});
				}
				D(c), Oe(2), z((e, t, n) => {
					W(r, `${e ?? ""} `), W(o, `${t ?? ""} `), W(l, `${n ?? ""} `);
				}, [
					() => Z("lbl.variant"),
					() => Z("lbl.timelineMarker"),
					() => Z("lbl.color")
				]), U(e, t);
			}, s = (e) => {
				var t = kd(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.variant ?? "large"), t = /* @__PURE__ */ A(() => [["large", Z("opt.quote.large")], ["short", Z("opt.quote.short")]]);
					Q(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => P("variant", e)
					});
				}
				D(n);
				var a = R(n, 2), o = (e) => {
					var t = Od(), n = I(t), r = F(n), i = R(r);
					D(n);
					var a = R(n, 2), o = (e) => {
						var t = ad(), n = L(t, !0);
						z((e) => W(n, e), [() => Z("ui.quotePortraitRemove")]), V("click", t, () => P("image", "")), U(e, t);
					};
					G(a, (e) => {
						B(j).props.image && e(o);
					}), z((e) => W(r, `${e ?? ""} `), [() => Z("ui.quotePortrait")]), V("change", i, Kn), U(e, t);
				};
				G(a, (e) => {
					B(j).props.variant === "short" && e(o);
				});
				var s = R(a, 2), c = F(s), l = R(c);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.accent ?? "accent"), t = /* @__PURE__ */ A(ni);
					ga(l, {
						get value() {
							return B(e);
						},
						get tokens() {
							return B(t);
						},
						onchange: (e) => P("accent", e === "accent" ? null : e)
					});
				}
				D(s), Oe(2), z((e, t) => {
					W(r, `${e ?? ""} `), W(c, `${t ?? ""} `);
				}, [() => Z("lbl.variant"), () => Z("lbl.color")]), U(e, t);
			}, c = (e) => {
				var t = Ad(), n = I(t), r = F(n);
				J(r);
				var i = R(r);
				D(n), Oe(2), z((e, t) => {
					X(n, "title", e), Ci(r, B(j).props.countUp !== !1), W(i, ` ${t ?? ""}`);
				}, [() => Z("tip.stat.countUp"), () => Z("lbl.statCountUp")]), V("change", r, (e) => P("countUp", e.target.checked)), U(e, t);
			}, l = (e) => {
				let t = /* @__PURE__ */ A(() => B(j).props.motion ?? "roll");
				var n = Id(), r = I(n), i = F(r), a = L(i, !0), o = R(i, 2);
				{
					let e = /* @__PURE__ */ A(() => [
						["roll", Z("opt.ribbonMotion.roll")],
						["sway", Z("opt.ribbonMotion.sway")],
						["step", Z("opt.ribbonMotion.step")],
						["none", Z("opt.ribbonMotion.none")]
					]);
					Q(o, {
						filled: !0,
						get value() {
							return B(t);
						},
						get options() {
							return B(e);
						},
						onchange: (e) => P("motion", e)
					});
				}
				var s = R(o, 2), c = (e) => {
					var n = Nd(), r = I(n), i = L(r, !0), a = R(r, 2);
					{
						let e = /* @__PURE__ */ A(() => Z("lbl.ribbonDirection")), t = /* @__PURE__ */ A(() => B(j).props.direction ?? "left"), n = /* @__PURE__ */ A(() => [["left", Z("opt.ribbonDir.left")], ["right", Z("opt.ribbonDir.right")]]);
						ps(a, {
							get label() {
								return B(e);
							},
							get value() {
								return B(t);
							},
							get options() {
								return B(n);
							},
							onchange: (e) => P("direction", e)
						});
					}
					var o = R(a, 2), s = (e) => {
						var t = jd(), n = F(t), r = L(n, !0), i = R(n, 2);
						J(i);
						var a = L(R(i, 2));
						D(t), z((e, n) => {
							X(t, "title", e), W(r, n), Y(i, B(j).props.dwell ?? 2.5), W(a, `${B(j).props.dwell ?? 2.5 ?? ""} s`);
						}, [() => Z("tip.ribbon.dwell"), () => Z("lbl.ribbonDwell")]), V("input", i, (e) => P("dwell", e.target.valueAsNumber)), U(e, t);
					}, c = (e) => {
						var t = Md(), n = F(t), r = L(n, !0), i = R(n, 2);
						J(i);
						var a = L(R(i, 2), !0);
						D(t), z((e, n) => {
							X(t, "title", e), W(r, n), Y(i, B(j).props.speed ?? 60), W(a, B(j).props.speed ?? 60);
						}, [() => Z("tip.ribbon.speed"), () => Z("lbl.ribbonSpeed")]), V("input", i, (e) => P("speed", e.target.valueAsNumber)), U(e, t);
					};
					G(o, (e) => {
						B(t) === "step" ? e(s) : e(c, -1);
					});
					var l = R(o, 2), u = F(l);
					J(u);
					var d = R(u);
					D(l);
					var f = R(l, 2), p = F(f);
					J(p);
					var m = R(p);
					D(f), z((e, t, n, a, o, s) => {
						X(r, "title", e), W(i, t), X(l, "title", n), Ci(u, B(j).props.pauseOnHover !== !1), W(d, ` ${a ?? ""}`), X(f, "title", o), Ci(p, B(j).props.fade !== !1), W(m, ` ${s ?? ""}`);
					}, [
						() => Z("tip.ribbon.play"),
						() => Z("ui.ribbonPlay"),
						() => Z("tip.ribbon.pause"),
						() => Z("lbl.ribbonPause"),
						() => Z("tip.ribbon.fade"),
						() => Z("lbl.ribbonFade")
					]), V("click", r, () => Qe?.sendDemoMotion()), V("change", u, (e) => P("pauseOnHover", e.target.checked)), V("change", p, (e) => P("fade", e.target.checked)), U(e, n);
				};
				G(s, (e) => {
					B(t) !== "none" && e(c);
				}), D(r);
				var l = R(r, 2), u = F(l), d = L(u, !0), f = R(u, 2), p = F(f), m = L(p, !0), h = R(p, 2);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.above ?? "none");
					Q(h, {
						filled: !0,
						get value() {
							return B(e);
						},
						get options() {
							return B(_);
						},
						onchange: (e) => P("above", e)
					});
				}
				D(f);
				var v = R(f, 2), y = (e) => {
					var t = Iu(), n = F(t), r = R(n);
					{
						let e = /* @__PURE__ */ A(() => B(j).props.aboveColor ?? "accent-text"), t = /* @__PURE__ */ A(ni), n = /* @__PURE__ */ A(() => Z("tip.ribbon.stripeColor"));
						ga(r, {
							get value() {
								return B(e);
							},
							get tokens() {
								return B(t);
							},
							get label() {
								return B(n);
							},
							onchange: (e) => P("aboveColor", e)
						});
					}
					D(t), z((e, r) => {
						X(t, "title", e), W(n, `${r ?? ""} `);
					}, [() => Z("tip.ribbon.stripeColor"), () => Z("lbl.colour")]), U(e, t);
				};
				G(v, (e) => {
					(B(j).props.above ?? "none") !== "none" && e(y);
				});
				var b = R(v, 2), x = F(b), S = L(x, !0), C = R(x, 2);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.main ?? "text");
					Q(C, {
						filled: !0,
						get value() {
							return B(e);
						},
						get options() {
							return B(g);
						},
						onchange: (e) => P("main", e)
					});
				}
				D(b);
				var w = R(b, 2), ee = F(w), te = L(ee, !0), ne = R(ee, 2);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.below ?? "none");
					Q(ne, {
						filled: !0,
						get value() {
							return B(e);
						},
						get options() {
							return B(_);
						},
						onchange: (e) => P("below", e)
					});
				}
				D(w);
				var re = R(w, 2), ie = (e) => {
					var t = Iu(), n = F(t), r = R(n);
					{
						let e = /* @__PURE__ */ A(() => B(j).props.belowColor ?? "accent-text"), t = /* @__PURE__ */ A(ni), n = /* @__PURE__ */ A(() => Z("tip.ribbon.stripeColor"));
						ga(r, {
							get value() {
								return B(e);
							},
							get tokens() {
								return B(t);
							},
							get label() {
								return B(n);
							},
							onchange: (e) => P("belowColor", e)
						});
					}
					D(t), z((e, r) => {
						X(t, "title", e), W(n, `${r ?? ""} `);
					}, [() => Z("tip.ribbon.stripeColor"), () => Z("lbl.colour")]), U(e, t);
				};
				G(re, (e) => {
					(B(j).props.below ?? "none") !== "none" && e(ie);
				});
				var T = R(re, 2), ae = (e) => {
					var t = Pd(), n = I(t);
					{
						let e = /* @__PURE__ */ A(() => Z("lbl.ribbonStripePlace")), t = /* @__PURE__ */ A(() => Z("tip.ribbon.stripePlace")), r = /* @__PURE__ */ A(() => B(j).props.stripePlace ?? "stack"), i = /* @__PURE__ */ A(() => [["stack", Z("opt.ribbonPlace.stack")], ["edge", Z("opt.ribbonPlace.edge")]]);
						ps(n, {
							get label() {
								return B(e);
							},
							get title() {
								return B(t);
							},
							get value() {
								return B(r);
							},
							get options() {
								return B(i);
							},
							onchange: (e) => P("stripePlace", e)
						});
					}
					var r = R(n, 2), i = F(r), a = L(i, !0), o = R(i, 2);
					J(o);
					var s = L(R(o, 2));
					D(r), z((e, t) => {
						X(r, "title", e), W(a, t), Y(o, B(j).props.thickness ?? 8), W(s, `${B(j).props.thickness ?? 8 ?? ""} px`);
					}, [() => Z("tip.ribbon.thickness"), () => Z("lbl.ribbonThickness")]), V("input", o, (e) => P("thickness", e.target.valueAsNumber)), U(e, t);
				};
				G(T, (e) => {
					((B(j).props.above ?? "none") !== "none" || (B(j).props.below ?? "none") !== "none") && e(ae);
				}), D(l);
				var oe = R(l, 2), se = F(oe), ce = L(se, !0), E = R(se, 2);
				{
					let e = /* @__PURE__ */ A(() => Z("lbl.ribbonWidth")), t = /* @__PURE__ */ A(() => B(j).props.width ?? "content"), n = /* @__PURE__ */ A(() => [["content", Z("opt.ribbonWidth.content")], ["page", Z("opt.ribbonWidth.page")]]);
					ps(E, {
						get label() {
							return B(e);
						},
						get value() {
							return B(t);
						},
						get options() {
							return B(n);
						},
						onchange: (e) => P("width", e)
					});
				}
				var le = R(E, 2);
				{
					let e = /* @__PURE__ */ A(() => Z("lbl.ribbonVariant")), t = /* @__PURE__ */ A(() => B(j).props.variant ?? "band"), n = /* @__PURE__ */ A(() => [["band", Z("opt.ribbonVariant.band")], ["plain", Z("opt.ribbonVariant.plain")]]);
					ps(le, {
						get label() {
							return B(e);
						},
						get value() {
							return B(t);
						},
						get options() {
							return B(n);
						},
						onchange: (e) => P("variant", e)
					});
				}
				var ue = R(le, 2), de = F(ue), fe = L(de, !0), pe = R(de, 2);
				J(pe);
				var me = L(R(pe, 2));
				D(ue), D(oe);
				var he = R(oe, 2), ge = F(he), _e = L(ge, !0), ve = R(ge, 2), ye = F(ve), be = L(ye, !0), xe = R(ye, 2);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.size ?? "md"), t = /* @__PURE__ */ A(() => [
						["sm", Z("opt.size.sm")],
						["md", Z("opt.size.md")],
						["lg", Z("opt.size.lg")],
						["xl", Z("opt.size.xl")]
					]);
					Q(xe, {
						filled: !0,
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => P("size", e)
					});
				}
				D(ve);
				var Se = R(ve, 2), Ce = F(Se);
				J(Ce);
				var we = R(Ce);
				D(Se);
				var Te = R(Se, 2), Ee = F(Te);
				J(Ee);
				var De = R(Ee);
				D(Te);
				var ke = R(Te, 2), Ae = F(ke);
				J(Ae);
				var je = R(Ae);
				D(ke);
				var Me = R(ke, 2), Ne = F(Me), Pe = L(Ne, !0), Fe = R(Ne, 2);
				J(Fe);
				var Ie = L(R(Fe, 2));
				D(Me), D(he);
				var Le = R(he, 2), Re = F(Le), ze = L(Re, !0), Be = R(Re, 2), Ve = F(Be), He = (e) => {
					var t = Fd(), n = F(t);
					{
						let e = /* @__PURE__ */ A(() => B(j).props.bg ?? "accent"), t = /* @__PURE__ */ A(ni), r = /* @__PURE__ */ A(() => Z("tip.ribbon.bg"));
						ga(n, {
							get value() {
								return B(e);
							},
							get tokens() {
								return B(t);
							},
							get label() {
								return B(r);
							},
							onchange: (e) => P("bg", e)
						});
					}
					var r = L(R(n, 2), !0);
					D(t), z((e, n) => {
						X(t, "title", e), W(r, n);
					}, [() => Z("tip.ribbon.bg"), () => Z("lbl.background")]), U(e, t);
				};
				G(Ve, (e) => {
					(B(j).props.variant ?? "band") !== "plain" && e(He);
				});
				var Ue = R(Ve, 2), We = F(Ue);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.color ?? ((B(j).props.variant ?? "band") === "plain" ? "text" : "accent-text")), t = /* @__PURE__ */ A(ni), n = /* @__PURE__ */ A(() => Z("tip.ribbon.color"));
					ga(We, {
						get value() {
							return B(e);
						},
						get tokens() {
							return B(t);
						},
						get label() {
							return B(n);
						},
						onchange: (e) => P("color", e)
					});
				}
				var Ge = L(R(We, 2), !0);
				D(Ue), D(Be), D(Le), Oe(2), z((e, t, n, r, i, o, s, c, l, u, p, h, g, _, v, y, x, C, ee, ne, re, ie, T, ae) => {
					W(a, e), W(d, t), X(f, "title", n), W(m, r), X(b, "title", i), W(S, o), X(w, "title", s), W(te, c), W(ce, l), X(ue, "title", u), W(fe, p), Y(pe, B(j).props.tilt ?? 0), W(me, `${B(j).props.tilt ?? 0 ?? ""}°`), W(_e, h), W(be, g), X(Se, "title", _), Ci(Ce, B(j).props.caps === !0), W(we, ` ${v ?? ""}`), X(Te, "title", y), Ci(Ee, B(j).props.weight === "bold"), W(De, ` ${x ?? ""}`), X(ke, "title", C), Ci(Ae, B(j).props.outline === !0), W(je, ` ${ee ?? ""}`), X(Me, "title", ne), W(Pe, re), Y(Fe, B(j).props.gap ?? 40), W(Ie, `${B(j).props.gap ?? 40 ?? ""} px`), W(ze, ie), X(Ue, "title", T), W(Ge, ae);
				}, [
					() => Z("lbl.ribbonMotion"),
					() => Z("lbl.ribbonStripes"),
					() => Z("tip.ribbon.above"),
					() => Z("lbl.ribbonAbove"),
					() => Z("tip.ribbon.main"),
					() => Z("lbl.ribbonMain"),
					() => Z("tip.ribbon.below"),
					() => Z("lbl.ribbonBelow"),
					() => Z("lbl.ribbonShape"),
					() => Z("tip.ribbon.tilt"),
					() => Z("lbl.ribbonTilt"),
					() => Z("lbl.ribbonText"),
					() => Z("lbl.size"),
					() => Z("tip.ribbon.caps"),
					() => Z("lbl.ribbonCaps"),
					() => Z("tip.ribbon.bold"),
					() => Z("lbl.ribbonBold"),
					() => Z("tip.ribbon.outline"),
					() => Z("lbl.ribbonOutline"),
					() => Z("tip.ribbon.gap"),
					() => Z("lbl.ribbonGap"),
					() => Z("group.navColours"),
					() => Z("tip.ribbon.color"),
					() => Z("lbl.textColor")
				]), V("input", pe, (e) => P("tilt", e.target.valueAsNumber)), V("change", Ce, (e) => P("caps", e.target.checked)), V("change", Ee, (e) => P("weight", e.target.checked ? "bold" : "normal")), V("change", Ae, (e) => P("outline", e.target.checked)), V("input", Fe, (e) => P("gap", e.target.valueAsNumber)), U(e, n);
			}, u = (e) => {
				var t = Ld(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.lines ?? "rows"), t = /* @__PURE__ */ A(() => [
						["rows", Z("opt.table.rows")],
						["grid", Z("opt.table.grid")],
						["none", Z("common.none")]
					]);
					Q(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => P("lines", e)
					});
				}
				D(n);
				var a = R(n, 2), o = F(a);
				J(o);
				var s = R(o);
				D(a), Oe(2), z((e, t, n) => {
					W(r, `${e ?? ""} `), Ci(o, t), W(s, ` ${n ?? ""}`);
				}, [
					() => Z("lbl.tableLines"),
					() => !!B(j).props.striped,
					() => Z("lbl.tableStriped")
				]), V("change", o, (e) => P("striped", e.target.checked)), U(e, t);
			}, d = (e) => {
				var t = Rd(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.variant ?? "icons"), t = /* @__PURE__ */ A(() => [["icons", Z("opt.share.icons")], ["labels", Z("opt.share.labels")]]);
					Q(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => P("variant", e)
					});
				}
				D(n);
				var a = R(n, 2), o = F(a), s = R(o);
				J(s), D(a);
				var c = R(a, 2), l = F(c), u = R(l);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.color || "accent"), t = /* @__PURE__ */ A(ni);
					ga(u, {
						get value() {
							return B(e);
						},
						get tokens() {
							return B(t);
						},
						onchange: (e) => P("color", e === "accent" ? "" : e)
					});
				}
				D(c), Oe(2), z((e, t, n) => {
					W(r, `${e ?? ""} `), W(o, `${t ?? ""} `), Y(s, B(j).props.size ?? 38), W(l, `${n ?? ""} `);
				}, [
					() => Z("lbl.variant"),
					() => Z("lbl.size"),
					() => Z("lbl.color")
				]), V("change", s, (e) => P("size", Number(e.target.value) || 38)), U(e, t);
			}, f = (e) => {
				var t = Ld(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.variant ?? "boxes"), t = /* @__PURE__ */ A(() => [["boxes", Z("opt.countdown.boxes")], ["plain", Z("opt.countdown.plain")]]);
					Q(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => P("variant", e)
					});
				}
				D(n);
				var a = R(n, 2), o = F(a);
				J(o);
				var s = R(o);
				D(a), Oe(2), z((e, t) => {
					W(r, `${e ?? ""} `), Ci(o, B(j).props.showSeconds !== !1), W(s, ` ${t ?? ""}`);
				}, [() => Z("lbl.variant"), () => Z("lbl.countdownSeconds")]), V("change", o, (e) => P("showSeconds", e.target.checked)), U(e, t);
			}, p = (e) => {
				var t = zd(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ A(() => [["primary", Z("opt.btn.primary")], ["secondary", Z("opt.btn.secondary")]]);
					Q(i, {
						get value() {
							return B(j).props.style;
						},
						get options() {
							return B(e);
						},
						onchange: (e) => P("style", e)
					});
				}
				D(n), Oe(2), z((e) => W(r, `${e ?? ""} `), [() => Z("lbl.style")]), U(e, t);
			}, m = (e) => {
				var t = Bd(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.fit ?? "cover"), t = /* @__PURE__ */ A(() => [["cover", Z("opt.fitFrame.cover")], ["contain", Z("opt.fitFrame.contain")]]);
					Q(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => P("fit", e)
					});
				}
				D(n);
				var a = R(n, 2), o = F(a), s = R(o);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.radius ?? ""), t = /* @__PURE__ */ A(() => [
						["", Z("common.none")],
						["sm", Z("opt.size.sm")],
						["md", Z("opt.radius.md")]
					]);
					Q(s, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => P("radius", e || null)
					});
				}
				D(a);
				var c = R(a, 2), l = F(c), u = L(R(l));
				D(c);
				var d = R(c, 2);
				J(d);
				var f = R(d, 2), p = F(f), m = L(R(p));
				D(f);
				var h = R(f, 2);
				J(h);
				var g = R(h, 2), _ = F(g), v = L(R(_));
				D(g);
				var y = R(g, 2);
				J(y);
				var b = R(y, 2), x = F(b), S = L(R(x));
				D(b);
				var C = R(b, 2);
				J(C);
				var w = R(C, 2), ee = F(w), te = L(R(ee));
				D(w);
				var ne = R(w, 2);
				J(ne);
				var re = R(ne, 2), ie = F(re), T = L(R(ie));
				D(re);
				var ae = R(re, 2);
				J(ae);
				var oe = R(ae, 2), se = L(oe, !0);
				Oe(2), z((e, t, n, i, a, s, c, f, b, w, re, ce, E, le, ue, de, fe) => {
					W(r, `${e ?? ""} `), W(o, `${t ?? ""} `), W(l, `${n ?? ""} `), W(u, `${i ?? ""}%`), Y(d, B(j).props.x ?? .5), W(p, `${a ?? ""} `), W(m, `${s ?? ""}%`), Y(h, B(j).props.y ?? .5), X(g, "title", c), W(_, `${f ?? ""} `), W(v, `${b ?? ""}x`), Y(y, B(j).props.zoom ?? 1), W(x, `${w ?? ""} `), W(S, `${re ?? ""}%`), Y(C, B(j).props.brightness ?? 1), W(ee, `${ce ?? ""} `), W(te, `${E ?? ""}%`), Y(ne, B(j).props.contrast ?? 1), W(ie, `${le ?? ""} `), W(T, `${ue ?? ""}%`), Y(ae, B(j).props.saturate ?? 1), X(oe, "title", de), W(se, fe);
				}, [
					() => Z("lbl.fit"),
					() => Z("lbl.radius"),
					() => Z("lbl.focusX"),
					() => Math.round((B(j).props.x ?? .5) * 100),
					() => Z("lbl.focusY"),
					() => Math.round((B(j).props.y ?? .5) * 100),
					() => Z("tip.zoomCrop"),
					() => Z("lbl.zoom"),
					() => (B(j).props.zoom ?? 1).toFixed(2),
					() => Z("lbl.brightness"),
					() => Math.round((B(j).props.brightness ?? 1) * 100),
					() => Z("lbl.contrast"),
					() => Math.round((B(j).props.contrast ?? 1) * 100),
					() => Z("lbl.saturate"),
					() => Math.round((B(j).props.saturate ?? 1) * 100),
					() => Z("tip.resetAdjust"),
					() => Z("ui.resetAdjust")
				]), V("input", d, (e) => P("x", Number(e.target.value))), V("input", h, (e) => P("y", Number(e.target.value))), V("input", y, (e) => P("zoom", Number(e.target.value))), V("input", C, (e) => P("brightness", Number(e.target.value))), V("input", ne, (e) => P("contrast", Number(e.target.value))), V("input", ae, (e) => P("saturate", Number(e.target.value))), V("click", oe, () => an(`edit:${B(j).blockId}`, (e) => {
					e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
				})), U(e, t);
			}, h = (e) => {
				var t = Vd(), n = I(t), r = F(n), i = R(r);
				J(i), D(n);
				var a = R(n, 2), o = F(a), s = R(o);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.color ?? "accent"), t = /* @__PURE__ */ A(ni);
					ga(s, {
						get value() {
							return B(e);
						},
						get tokens() {
							return B(t);
						},
						onchange: (e) => P("color", e)
					});
				}
				D(a), Oe(2), z((e, t, n) => {
					W(r, `${e ?? ""} `), Y(i, B(j).props.size ?? 48), X(a, "title", t), W(o, `${n ?? ""} `);
				}, [
					() => Z("lbl.sizePx"),
					() => Z("hint.icon.color"),
					() => Z("lbl.color")
				]), V("change", i, (e) => P("size", Number(e.target.value))), U(e, t);
			}, v = (e) => {
				var t = zd(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.view ?? "cards"), t = /* @__PURE__ */ A(() => [
						["cards", Z("opt.collectionView.cards")],
						["list", Z("opt.collectionView.list")],
						["archive", Z("opt.collectionView.archive")]
					]);
					Q(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => P("view", e)
					});
				}
				D(n), Oe(2), z((e) => W(r, `${e ?? ""} `), [() => Z("lbl.view")]), U(e, t);
			}, y = (e) => {
				var t = Hd(), n = I(t), r = F(n), i = R(r);
				J(i), D(n), Oe(2), z((e, t) => {
					X(n, "title", e), W(r, `${t ?? ""} `), Y(i, B(j).props.columns ?? 0);
				}, [() => Z("tip.product.columns"), () => Z("lbl.columns")]), V("change", i, (e) => P("columns", Number(e.target.value))), U(e, t);
			}, b = (e) => {
				var t = zd(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.variant ?? "button"), t = /* @__PURE__ */ A(() => [["button", Z("opt.cart.button")], ["icon", Z("opt.cart.icon")]]);
					Q(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => P("variant", e)
					});
				}
				D(n), Oe(2), z((e) => W(r, `${e ?? ""} `), [() => Z("lbl.view")]), U(e, t);
			}, x = (e) => {
				var t = Kd(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.view ?? "grid"), t = /* @__PURE__ */ A(() => [
						["grid", Z("opt.galleryView.grid")],
						["carousel", Z("opt.galleryView.carousel")],
						["slides", Z("opt.galleryView.slides")],
						["ribbon", Z("opt.galleryView.ribbon")]
					]);
					Q(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => P("view", e)
					});
				}
				D(n);
				var a = R(n, 2), o = (e) => {
					var t = Ud(), n = I(t), r = F(n), i = R(r);
					J(i), D(n);
					var a = R(n, 2), o = F(a), s = L(R(o));
					D(a);
					var c = R(a, 2);
					J(c), z((e, t) => {
						W(r, `${e ?? ""} `), Y(i, B(j).props.columns ?? 3), W(o, `${t ?? ""} `), W(s, `${B(j).props.gap ?? 12 ?? ""} px`), Y(c, B(j).props.gap ?? 12);
					}, [() => Z("lbl.columns"), () => Z("lbl.imageGap")]), V("change", i, (e) => P("columns", Number(e.target.value))), V("input", c, (e) => P("gap", Number(e.target.value))), U(e, t);
				};
				G(a, (e) => {
					(B(j).props.view ?? "grid") === "grid" && e(o);
				});
				var s = R(a, 2), c = (e) => {
					var t = Wd(), n = I(t);
					{
						let e = /* @__PURE__ */ A(() => Z("lbl.ribbonRows")), t = /* @__PURE__ */ A(() => String(B(j).props.rows ?? 1)), r = /* @__PURE__ */ A(() => [["1", Z("opt.ribbonRows.one")], ["2", Z("opt.ribbonRows.two")]]);
						ps(n, {
							get label() {
								return B(e);
							},
							get value() {
								return B(t);
							},
							get options() {
								return B(r);
							},
							onchange: (e) => P("rows", Number(e))
						});
					}
					var r = R(n, 2);
					{
						let e = /* @__PURE__ */ A(() => Z("lbl.ribbonDirection")), t = /* @__PURE__ */ A(() => B(j).props.direction ?? "left"), n = /* @__PURE__ */ A(() => [["left", Z("opt.ribbonDir.left")], ["right", Z("opt.ribbonDir.right")]]);
						ps(r, {
							get label() {
								return B(e);
							},
							get value() {
								return B(t);
							},
							get options() {
								return B(n);
							},
							onchange: (e) => P("direction", e)
						});
					}
					var i = R(r, 2), a = F(i), o = L(a, !0), s = R(a, 2);
					J(s);
					var c = L(R(s, 2), !0);
					D(i);
					var l = R(i, 2), u = F(l), d = L(u, !0), f = R(u, 2);
					J(f);
					var p = L(R(f, 2));
					D(l);
					var m = R(l, 2), h = F(m), g = L(R(h));
					D(m);
					var _ = R(m, 2);
					J(_);
					var v = R(_, 2), y = F(v);
					J(y);
					var b = R(y);
					D(v);
					var x = R(v, 2), S = F(x);
					J(S);
					var C = R(S);
					D(x), z((e, t, n, r, a, u, m, w, ee) => {
						X(i, "title", e), W(o, t), Y(s, B(j).props.speed ?? 60), W(c, B(j).props.speed ?? 60), X(l, "title", n), W(d, r), Y(f, B(j).props.bandHeight ?? 160), W(p, `${B(j).props.bandHeight ?? 160 ?? ""} px`), W(h, `${a ?? ""} `), W(g, `${B(j).props.gap ?? 12 ?? ""} px`), Y(_, B(j).props.gap ?? 12), X(v, "title", u), Ci(y, B(j).props.pauseOnHover !== !1), W(b, ` ${m ?? ""}`), X(x, "title", w), Ci(S, B(j).props.fade !== !1), W(C, ` ${ee ?? ""}`);
					}, [
						() => Z("tip.ribbon.speed"),
						() => Z("lbl.ribbonSpeed"),
						() => Z("tip.ribbon.bandHeight"),
						() => Z("lbl.ribbonHeight"),
						() => Z("lbl.imageGap"),
						() => Z("tip.ribbon.pause"),
						() => Z("lbl.ribbonPause"),
						() => Z("tip.ribbon.fade"),
						() => Z("lbl.ribbonFade")
					]), V("input", s, (e) => P("speed", e.target.valueAsNumber)), V("input", f, (e) => P("bandHeight", e.target.valueAsNumber)), V("input", _, (e) => P("gap", Number(e.target.value))), V("change", y, (e) => P("pauseOnHover", e.target.checked)), V("change", S, (e) => P("fade", e.target.checked)), U(e, t);
				};
				G(s, (e) => {
					B(j).props.view === "ribbon" && e(c);
				});
				var l = R(s, 2), u = (e) => {
					var t = Gd(), n = F(t), r = R(n);
					J(r), D(t), z((e) => {
						W(n, `${e ?? ""} `), Y(r, B(j).props.interval ?? 5);
					}, [() => Z("lbl.secondsPerImage")]), V("change", r, (e) => P("interval", Number(e.target.value))), U(e, t);
				};
				G(l, (e) => {
					B(j).props.view === "slides" && e(u);
				});
				var d = R(l, 2), f = F(d), p = R(f);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.radius ?? ""), t = /* @__PURE__ */ A(() => [
						["", Z("common.none")],
						["sm", Z("opt.size.sm")],
						["md", Z("opt.radius.md")]
					]);
					Q(p, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => P("radius", e || null)
					});
				}
				D(d);
				var m = R(d, 2), h = F(m);
				J(h);
				var g = R(h);
				D(m), Oe(2), z((e, t, n, i) => {
					W(r, `${e ?? ""} `), W(f, `${t ?? ""} `), X(m, "title", n), Ci(h, B(j).props.lightbox !== !1), W(g, ` ${i ?? ""}`);
				}, [
					() => Z("lbl.view"),
					() => Z("lbl.radius"),
					() => Z("tip.lightbox"),
					() => Z("lbl.lightbox")
				]), V("change", h, (e) => P("lightbox", e.target.checked)), U(e, t);
			}, S = (e) => {
				var t = Jd(), n = I(t), r = F(n);
				Q(R(r), {
					get value() {
						return B(j).props.color;
					},
					get options() {
						return Yn;
					},
					onchange: (e) => P("color", e)
				}), D(n);
				var i = R(n, 2), a = F(i), o = R(a);
				J(o), D(i);
				var s = R(i, 2), c = (e) => {
					var t = qd(), n = F(t), r = R(n);
					J(r), D(t), z((e, t) => {
						W(n, `${e ?? ""} `), X(r, "max", t), Y(r, B(j).frame.w);
					}, [() => Z("lbl.length"), () => Math.max(1, Math.round(100 - B(j).frame.x))]), V("change", r, (e) => gn("w", Math.max(1, Math.min(Number(e.target.value), 100 - B(j).frame.x)))), U(e, t);
				};
				G(s, (e) => {
					(B(j).props.kind === "line" || B(j).props.kind === "arrow") && e(c);
				});
				var l = R(s, 2), u = F(l);
				J(u);
				var d = R(u);
				D(l), Oe(2), z((e, t, n, i, s) => {
					W(r, `${e ?? ""} `), W(a, `${t ?? ""} `), Y(o, B(j).props.thickness), X(l, "title", n), Ci(u, i), W(d, ` ${s ?? ""}`);
				}, [
					() => Z("lbl.color"),
					() => Z("lbl.thickness"),
					() => Z("tip.shape.fill"),
					() => !!B(j).props.fill,
					() => Z("lbl.filled")
				]), V("change", o, (e) => P("thickness", Number(e.target.value))), V("change", u, (e) => P("fill", e.target.checked ? B(j).props.color : null)), U(e, t);
			};
			G(n, (e) => {
				B(j).type === "text" ? e(r) : B(j).type === "faq" ? e(a, 1) : B(j).type === "timeline" ? e(o, 2) : B(j).type === "quote" ? e(s, 3) : B(j).type === "stats" ? e(c, 4) : B(j).type === "ribbon" ? e(l, 5) : B(j).type === "table" ? e(u, 6) : B(j).type === "share" ? e(d, 7) : B(j).type === "countdown" ? e(f, 8) : B(j).type === "button" ? e(p, 9) : B(j).type === "image" ? e(m, 10) : B(j).type === "icon" ? e(h, 11) : B(j).type === "collection" ? e(v, 12) : B(j).type === "product" ? e(y, 13) : B(j).type === "cart" ? e(b, 14) : B(j).type === "gallery" ? e(x, 15) : B(j).type === "shape" && e(S, 16);
			});
			var C = R(n, 2), w = F(C), ee = R(w);
			{
				let e = /* @__PURE__ */ A(() => B(j).fit === "shrink" ? "shrink" : "wrap"), t = /* @__PURE__ */ A(() => sn.has(B(j).type) ? [["wrap", Z("opt.fit.fluid")], ["shrink", Z("opt.fit.floor")]] : [["wrap", Z("opt.fit.wrap")], ["shrink", Z("opt.fit.shrink")]]);
				Q(ee, {
					get value() {
						return B(e);
					},
					get options() {
						return B(t);
					},
					onchange: (e) => cn(e)
				});
			}
			D(C);
			var te = R(C, 2), ne = (e) => {
				var t = Yd(), n = F(t), r = L(n, !0), i = R(n, 2);
				J(i);
				var a = L(R(i, 2));
				D(t), z((e, n, o, s) => {
					X(t, "title", e), W(r, n), Y(i, o), W(a, `${s ?? ""} %`);
				}, [
					() => Z("tip.fitMin"),
					() => Z("lbl.fitMin"),
					() => Math.round((B(j).fitMin ?? .6) * 100),
					() => Math.round((B(j).fitMin ?? .6) * 100)
				]), V("input", i, (e) => ln(e.target.valueAsNumber / 100)), U(e, t);
			};
			G(te, (e) => {
				B(j).fit === "shrink" && e(ne);
			});
			var re = R(te, 4), ie = F(re), T = R(ie);
			{
				let e = /* @__PURE__ */ A(() => di(B(j).animation) ? B(j).animation.type : "");
				Q(T, {
					get value() {
						return B(e);
					},
					get options() {
						return pi;
					},
					onchange: (e) => gi(e || null)
				});
			}
			D(re);
			var ae = R(re, 2), oe = (e) => {
				var t = Xd(), n = I(t), r = F(n), i = R(r);
				J(i), D(n);
				var a = R(n, 2), o = F(a), s = R(o);
				J(s), D(a), z((e, t) => {
					W(r, `${e ?? ""} `), Y(i, B(j).animation.props.duration), W(o, `${t ?? ""} `), Y(s, B(j).animation.props.delay);
				}, [() => Z("lbl.durationMs"), () => Z("lbl.delayMs")]), V("change", i, (e) => yi("duration", Number(e.target.value))), V("change", s, (e) => yi("delay", Number(e.target.value))), U(e, t);
			}, se = /* @__PURE__ */ A(() => di(B(j).animation));
			G(ae, (e) => {
				B(se) && e(oe);
			});
			var ce = R(ae, 2), E = F(ce), le = R(E);
			{
				let e = /* @__PURE__ */ A(() => B(j).hover?.type ?? (B(j).animation && !di(B(j).animation) ? B(j).animation.type : ""));
				Q(le, {
					get value() {
						return B(e);
					},
					get options() {
						return mi;
					},
					onchange: (e) => _i(e || null)
				});
			}
			D(ce);
			var ue = R(ce, 2), de = (e) => {
				var t = $d(), n = R(I(t), 2), r = F(n);
				J(r);
				var i = R(r);
				D(n);
				var a = R(n, 2), o = (e) => {
					var t = Qd(), n = I(t), r = F(n), i = R(r);
					{
						let e = /* @__PURE__ */ A(() => B(j).sticky.mode ?? "scroll"), t = /* @__PURE__ */ A(() => [["scroll", Z("opt.sticky.modeScroll")], ["screen", Z("opt.sticky.modeScreen")]]);
						Q(i, {
							get value() {
								return B(e);
							},
							get options() {
								return B(t);
							},
							onchange: (e) => an(`edit:${B(j).blockId}`, (t) => {
								t.sticky = {
									...t.sticky,
									mode: e
								};
							})
						});
					}
					D(n);
					var a = R(n, 2), o = (e) => {
						var t = Zd(), n = F(t), r = R(n);
						J(r), D(t), z((e, i) => {
							X(t, "title", e), W(n, `${i ?? ""} `), Y(r, B(j).sticky.offset ?? 16);
						}, [() => B(j).sticky.mode === "screen" ? Z("tip.stickyEdge") : Z("tip.stickyOffset"), () => B(j).sticky.mode === "screen" ? Z("lbl.stickyEdge") : Z("lbl.stickyOffset")]), V("change", r, (e) => an(`edit:${B(j).blockId}`, (t) => {
							t.sticky = {
								...t.sticky,
								offset: Math.max(0, Number(e.target.value) || 0)
							};
						})), U(e, t);
					};
					G(a, (e) => {
						(B(j).sticky.mode !== "screen" || (B(j).sticky.dock ?? "bottom-right") !== "middle-center") && e(o);
					});
					var s = R(a, 2), c = (e) => {
						var t = Iu(), n = F(t), r = R(n);
						{
							let e = /* @__PURE__ */ A(() => B(j).sticky.dock ?? "bottom-right"), t = /* @__PURE__ */ A(() => $t.map(([e, t]) => [e, Z(t)]));
							Q(r, {
								get value() {
									return B(e);
								},
								get options() {
									return B(t);
								},
								onchange: (e) => an(`edit:${B(j).blockId}`, (t) => {
									t.sticky = {
										...t.sticky,
										dock: e
									};
								})
							});
						}
						D(t), z((e, r) => {
							X(t, "title", e), W(n, `${r ?? ""} `);
						}, [() => Z("tip.stickyDock"), () => Z("lbl.stickyDock")]), U(e, t);
					}, l = (e) => {
						var t = Iu(), n = F(t), r = R(n);
						{
							let e = /* @__PURE__ */ A(() => B(j).sticky.until ?? ""), t = /* @__PURE__ */ A(en);
							Q(r, {
								get value() {
									return B(e);
								},
								get options() {
									return B(t);
								},
								onchange: (e) => an(`edit:${B(j).blockId}`, (t) => {
									t.sticky = {
										...t.sticky,
										until: e || null
									};
								})
							});
						}
						D(t), z((e, r) => {
							X(t, "title", e), W(n, `${r ?? ""} `);
						}, [() => Z("tip.stickyUntil"), () => Z("lbl.stickyUntil")]), U(e, t);
					};
					G(s, (e) => {
						B(j).sticky.mode === "screen" ? e(c) : e(l, -1);
					}), z((e, t) => {
						X(n, "title", e), W(r, `${t ?? ""} `);
					}, [() => Z("tip.stickyMode"), () => Z("lbl.stickyMode")]), U(e, t);
				};
				G(a, (e) => {
					B(j).sticky && e(o);
				}), z((e, t, a) => {
					X(n, "title", e), Ci(r, t), W(i, ` ${a ?? ""}`);
				}, [
					() => Z("tip.sticky"),
					() => !!B(j).sticky,
					() => Z("lbl.sticky")
				]), V("change", r, (e) => an(`edit:${B(j).blockId}`, (t) => {
					t.sticky = e.target.checked ? {
						offset: 16,
						until: null
					} : null;
				})), U(e, t);
			};
			G(ue, (e) => {
				B(Ee) === "desktop" && e(de);
			});
			var fe = R(ue, 4), pe = F(fe), me = L(pe, !0), he = R(pe, 2), ge = F(he), _e = (e) => {
				var t = ef(), n = F(t), r = F(n, !0), i = R(r);
				J(i), D(n);
				var a = R(n, 2), o = F(a, !0), s = R(o);
				J(s), D(a);
				var c = R(a, 2), l = F(c, !0), u = R(l);
				J(u), D(c);
				var d = R(c, 2), f = F(d, !0), p = R(f);
				J(p), D(d);
				var m = R(d, 2), h = F(m, !0), g = R(h);
				J(g), D(m);
				var _ = R(m, 2), v = F(_, !0), y = R(v);
				J(y), D(_), D(t), z((e, t, n, a, c, d, _) => {
					W(r, e), Y(i, B(j).frame.x), W(o, t), Y(s, B(j).frame.y), W(l, n), Y(u, B(j).frame.w), W(f, a), Y(p, B(j).frame.h), X(m, "title", c), W(h, d), Y(g, B(j).frame.z ?? 1), W(v, _), Y(y, B(j).frame.rot ?? 0);
				}, [
					() => Z("frame.x"),
					() => Z("frame.y"),
					() => Z("frame.w"),
					() => Z("frame.h"),
					() => Z("tip.frameZ"),
					() => Z("frame.z"),
					() => Z("frame.rot")
				]), V("change", i, (e) => gn("x", Number(e.target.value))), V("change", s, (e) => gn("y", Number(e.target.value))), V("change", u, (e) => gn("w", Number(e.target.value))), V("change", p, (e) => gn("h", Number(e.target.value))), V("change", g, (e) => gn("z", Number(e.target.value))), V("change", y, (e) => gn("rot", Number(e.target.value))), U(e, t);
			};
			G(ge, (e) => {
				B(Ee) === "desktop" && e(_e);
			});
			var ve = R(ge, 2), ye = F(ve);
			J(ye);
			var be = R(ye);
			D(ve);
			var xe = R(ve, 2), Se = F(xe);
			J(Se);
			var Ce = R(Se);
			D(xe), D(he), D(fe), z((e, t, n, r, i, a, o, s, c, l, u, d) => {
				X(C, "title", e), W(w, `${t ?? ""} `), X(re, "title", n), W(ie, `${r ?? ""} `), X(ce, "title", i), W(E, `${a ?? ""} `), X(pe, "title", o), W(me, s), X(ve, "title", c), Ci(ye, B(j).hideMobile), W(be, ` ${l ?? ""}`), X(xe, "title", u), Ci(Se, B(j).decor), W(Ce, ` ${d ?? ""}`);
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
			]), V("change", ye, (e) => Wn(e.target.checked)), V("change", Se, (e) => Bn(e.target.checked)), U(e, t);
		};
		G(d, (e) => {
			B(pn) === "content" ? e(f) : e(p, -1);
		}), z((e, t) => {
			o = q(a, 1, "svelte-1n46o8q", null, o, { on: B(pn) === "content" }), W(s, e), l = q(c, 1, "svelte-1n46o8q", null, l, { on: B(pn) === "style" }), W(u, t);
		}, [() => Z("props.tabContent"), () => Z("props.tabStyle")]), V("click", a, () => N(pn, "content")), V("click", c, () => N(pn, "style")), U(e, t);
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
	}, d = {
		grid: l("<rect x=\"1\" y=\"1\" width=\"46\" height=\"32\" rx=\"3\" stroke-opacity=\"0.35\"/><rect x=\"6\" y=\"6\" width=\"10\" height=\"10\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><rect x=\"19\" y=\"6\" width=\"10\" height=\"10\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><rect x=\"32\" y=\"6\" width=\"10\" height=\"10\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><path d=\"M7 20h8M20 20h8M33 20h8\" stroke-opacity=\"0.7\"/><path d=\"M6 26h10M19 26h10M32 26h10\" stroke-opacity=\"0.35\"/>"),
		list: l("<rect x=\"1\" y=\"1\" width=\"46\" height=\"32\" rx=\"3\" stroke-opacity=\"0.35\"/><rect x=\"6\" y=\"6\" width=\"7\" height=\"7\" rx=\"2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><rect x=\"6\" y=\"17\" width=\"7\" height=\"7\" rx=\"2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><path d=\"M17 9.5h24M17 20.5h18\" stroke-opacity=\"0.7\"/>"),
		cover: l("<rect x=\"1\" y=\"1\" width=\"46\" height=\"32\" rx=\"3\" stroke-opacity=\"0.35\"/><rect x=\"6\" y=\"6\" width=\"16\" height=\"12\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><rect x=\"26\" y=\"6\" width=\"16\" height=\"12\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><path d=\"M6 14h16M26 14h16\" stroke-opacity=\"0.55\" stroke-width=\"3\"/><path d=\"M6 23h12M26 23h12\" stroke-opacity=\"0.35\"/>")
	}, p = (e) => `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">${e}</svg>`, m = {
		dot: p("<circle cx=\"12\" cy=\"12\" r=\"3\"/>"),
		dash: p("<rect x=\"3\" y=\"10.6\" width=\"18\" height=\"2.8\" rx=\"1.4\"/>"),
		slash: p("<path d=\"M15.5 3.5L8.5 20.5\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\" fill=\"none\"/>"),
		star: p("<path d=\"M12 2.8l2.3 6.1 6.5.4-5 4.1 1.6 6.3-5.4-3.5-5.4 3.5 1.6-6.3-5-4.1 6.5-.4z\"/>"),
		none: p("<path d=\"M5 12h14\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\" opacity=\"0.35\"/><path d=\"M6 6l12 12\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>"),
		custom: p("<path d=\"M5 8h14M5 12h9M5 16h12\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>")
	}, g = /* @__PURE__ */ A(() => [
		["text", Z("opt.ribbonStripe.text")],
		["marks", Z("opt.ribbonStripe.marks")],
		["plain", Z("opt.ribbonStripe.plain")]
	]), _ = /* @__PURE__ */ A(() => [["none", Z("common.none")], ...B(g)]), v = /* @__PURE__ */ A(() => [
		["dot", Z("opt.ribbonSep.dot")],
		["dash", Z("opt.ribbonSep.dash")],
		["slash", Z("opt.ribbonSep.slash")],
		["star", Z("opt.ribbonSep.star")],
		["none", Z("common.none")],
		["custom", Z("opt.ribbonSep.custom")]
	]), y = /* @__PURE__ */ M("");
	function b() {
		B(y).trim() && (N(Ma, B(y), !0), N(Na, null), za(), N(y, ""));
	}
	let x = [
		["color", sl],
		["gradient", yl],
		["glow", bl],
		["image", Ql],
		["slideshow", ru],
		["video", lu],
		["grain", Sl]
	], S = Object.fromEntries(x), C = {
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
	}, w = [
		["purple", Z("adminTheme.purple")],
		["well", Z("adminTheme.well")],
		["gold", Z("adminTheme.gold")],
		["grey", Z("adminTheme.grey")],
		["aurora", Z("adminTheme.aurora")],
		["dusk", Z("adminTheme.dusk")],
		["ember", Z("adminTheme.ember")]
	], ee = {
		lilla: "purple",
		bronn: "well",
		gull: "gold",
		graa: "grey",
		nordlys: "aurora",
		skumring: "dusk",
		glo: "ember"
	}, te = /* @__PURE__ */ M(tn((() => {
		let e = localStorage.getItem("urd-admin-theme");
		return ee[e] ?? e ?? "grey";
	})()));
	xn(() => {
		document.documentElement.dataset.adminTheme = B(te), localStorage.setItem("urd-admin-theme", B(te)), ne();
	});
	function ne() {
		let e = getComputedStyle(document.documentElement), t = e.getPropertyValue("--urd-color-accent").trim();
		Qe?.sendAdminTheme({
			bg: e.getPropertyValue("--urd-color-bg").trim(),
			surface: e.getPropertyValue("--urd-color-surface").trim(),
			accent: t,
			text: e.getPropertyValue("--urd-color-text").trim(),
			"accent-text": re(t)
		});
	}
	function re(e) {
		return al(e) == null || (ol(e, "#ffffff") ?? 0) >= (ol(e, "#0b0e14") ?? 0) ? "#ffffff" : "#0b0e14";
	}
	let ie = /* @__PURE__ */ M(null), T = /* @__PURE__ */ M(null), ae = /* @__PURE__ */ M(!1), oe = /* @__PURE__ */ M(""), se = /* @__PURE__ */ M("info"), ce = 0;
	function E(e, t = "info") {
		N(oe, e, !0), N(se, t, !0);
		let n = ++ce;
		t === "ok" && setTimeout(() => {
			ce === n && (N(oe, ""), N(se, "info"));
		}, 8e3);
	}
	function le() {
		E(Z("status.storageFull"), "error");
	}
	function ue(e, t) {
		try {
			localStorage.setItem(e, t);
		} catch {
			le();
		}
	}
	let de = /* @__PURE__ */ M(null), fe = /* @__PURE__ */ M(null), pe = /* @__PURE__ */ M(tn({
		size: 16,
		snap: !0
	})), me = /* @__PURE__ */ M(!0), he = /* @__PURE__ */ M(tn(Oo(typeof window < "u" ? window : null) ?? 1920)), ge = "urd-admin-screen";
	function _e() {
		let e = null;
		try {
			e = JSON.parse(localStorage.getItem(ge) ?? "null");
		} catch {
			e = null;
		}
		return ko(e, B(he));
	}
	let ve = /* @__PURE__ */ M(tn(_e()));
	function ye(e) {
		N(ve, ko({
			...Ke(B(ve)),
			...e
		}, B(he)), !0);
		try {
			localStorage.setItem(ge, JSON.stringify(B(ve)));
		} catch {}
	}
	let be = /* @__PURE__ */ A(() => Ao(B(ve), B(he))), xe = [
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
	], Se = /* @__PURE__ */ A(() => [{
		id: "desktop",
		width: B(be).width,
		height: B(be).height || null,
		viewport: "desktop"
	}, ...xe]);
	function Ce(e) {
		let t = Ro(B(mo), B(ho), e.width).width;
		return Z(e.id === "desktop" ? B(ve).mode === "own" ? "tip.view.desktop" : e.height ? "tip.view.desktopSizeH" : "tip.view.desktopSize" : `tip.view.${e.id}`, {
			w: e.width,
			h: e.height ?? 0,
			c: t
		});
	}
	let we = /* @__PURE__ */ M("desktop"), Te = /* @__PURE__ */ A(() => B(Se).find((e) => e.id === B(we)) ?? B(Se)[0]), Ee = /* @__PURE__ */ A(() => B(Te).viewport === "mobile" || B(Te).width <= (B(k)?.breakpoints?.mobile ?? 640) ? "mobile" : "desktop"), De = /* @__PURE__ */ M(null), ke = /* @__PURE__ */ M(0), Ae = /* @__PURE__ */ M(0), je = /* @__PURE__ */ M("fit"), Me = /* @__PURE__ */ M(1), Ne = /* @__PURE__ */ A(() => Lo(B(mo), B(ho))), Pe = /* @__PURE__ */ A(() => B(Te).width), Fe = /* @__PURE__ */ A(() => B(Te).height ?? 0), Ie = /* @__PURE__ */ A(() => B(je) === "manual" ? B(Me) : xo(B(ke), B(Pe), "fit", B(Ae), B(Fe)));
	function Le(e) {
		let t = Math.min(400, Math.max(10, (Math.round(Math.round(B(Ie) * 100) / 10) + e) * 10));
		N(Me, t / 100), N(je, "manual");
	}
	let Re = /* @__PURE__ */ A(() => B(Fe) > 0 ? B(Fe) : B(Ie) > 0 ? B(Ae) / B(Ie) : B(Ae)), ze = /* @__PURE__ */ A(() => B(Pe) * B(Ie)), Be = /* @__PURE__ */ A(() => B(Fe) > 0 ? B(Fe) * B(Ie) : B(Ae)), Ve = /* @__PURE__ */ A(() => B(ze) > B(ke) + 1 || B(Be) > B(Ae) + 1);
	xn(() => {
		let e = () => Qe?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), xn(() => {
		let e = B(Ee);
		Qe?.sendViewport(e);
	}), xn(() => {
		let e = B(Ie);
		Qe?.sendZoom(e);
	}), xn(() => {
		let e = () => {
			N(he, Oo(window) ?? B(he), !0);
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}), xn(() => {
		let e = B(De);
		if (!e || typeof ResizeObserver > "u") return;
		let t = () => {
			N(ke, e.clientWidth, !0), N(Ae, e.clientHeight, !0);
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	});
	let He = /* @__PURE__ */ M(0);
	function Ue() {
		N(He, O?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function We() {
		let e = O?.data.sections.find((e) => e.responsive?.mobile?.attention?.needed);
		N(we, "mobile"), e && setTimeout(() => Qe?.sendScrollSection(e.id), 0);
	}
	function Ge(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			ct("layout");
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
			}, Je(t, "layout-changed"), e.sectionId === B(Xn) && N(Qn, e.minHeight, !0), B(j)?.sectionId === e.sectionId && Yt(), O.save(), rt(), Qe?.sendSection(B(T), t);
		}
	}
	function qe(e) {
		return e?.blocks?.some((e) => e.frames?.mobile) ?? !1;
	}
	function Je(e, t) {
		!e || !qe(e) || e.responsive?.mobile?.attention?.needed || (e.responsive = {
			...e.responsive ?? {},
			mobile: {
				...e.responsive?.mobile ?? { mode: "auto" },
				attention: {
					needed: !0,
					reason: t,
					since: (/* @__PURE__ */ new Date()).toISOString()
				}
			}
		}, Ue(), Qe?.sendAttention(e.id, !0));
	}
	let O = null, Ze = null, Qe = null, k = /* @__PURE__ */ M(null);
	function $e() {
		N(k, Ze.data, !0), Ze.replace(B(k));
	}
	function et() {
		Qe?.sendSite(Ke(B(k)));
	}
	let tt = /* @__PURE__ */ new Set(), nt = () => B(k).pages.find((e) => e.id === B(T));
	function rt() {
		let e = B(k)?.pages?.some((e) => !tt.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = nc?.hasDraft() || Object.values(rc).some((e) => e.hasDraft()), n = gc?.hasDraft() || Object.values(vc).some((e) => e.hasDraft());
		N(ae, e || O?.hasDraft() && !tt.has(B(T)) || Ze?.hasDraft() || hl?.hasDraft() || t || n || !1, !0);
	}
	let it = [], at = [], ot = null;
	function st() {
		return JSON.stringify({
			pageId: B(T),
			page: O.data,
			site: Ze.data,
			collectionsIndex: ac ? nc.data : null,
			collections: ac ? Object.fromEntries(Object.entries(rc).map(([e, t]) => [e, t.data])) : {},
			templatesIndex: wc ? gc.data : null,
			templates: wc ? Object.fromEntries(Object.entries(vc).map(([e, t]) => [e, t.data])) : {},
			plugins: hl?.data ?? null
		});
	}
	function ct(e) {
		e === ot && (e.startsWith("edit:") || e.startsWith("grid:")) || (it.push(st()), it.length > 50 && it.shift(), at.length = 0, ot = e);
	}
	function dt(e) {
		let { pageId: t, page: n, site: r, collectionsIndex: i, collections: a, templatesIndex: o, templates: s, plugins: c } = JSON.parse(e);
		if (Ze.replace(r), $e(), Ze.save(), N(pe, {
			snap: !0,
			...B(k).grid
		}, !0), et(), ft(i, a ?? {}), pt(o, s ?? {}), mt(c), t && t !== B(T) && B(k).pages.some((e) => e.id === t)) {
			ue(`urd-draft-${t}`, JSON.stringify(n)), oa(t, { keepHistory: !0 }), rt();
			return;
		}
		O.replace(n), O.save(), rt(), Ue(), Yt(), rr(O.data.sections.find((e) => e.id === B(Xn))), B(k).pages.some((e) => e.id === B(T)) ? Qe?.sendPage(B(T), O.data) : oa(B(k).pages[0].id, { keepHistory: !0 });
	}
	function ft(e, t) {
		if (!(!nc || !e) && JSON.stringify({
			index: nc.data,
			collections: Object.fromEntries(Object.entries(rc).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			collections: t
		})) {
			nc.replace(e), nc.save();
			for (let e of Object.keys(rc)) e in t || (localStorage.removeItem(`urd-draft-collection-${e}`), localStorage.removeItem(`urd-draft-samling-${e}`), delete rc[e]);
			for (let [e, n] of Object.entries(t)) {
				if (!rc[e]) {
					let t = ic[e] ?? null;
					rc[e] = Qi(`urd-draft-collection-${e}`, () => t, le, `urd-draft-samling-${e}`);
				}
				rc[e].replace(n), rc[e].save();
			}
			N(oc, [...e.samlinger ?? []], !0), B(dc) && !B(oc).includes(B(dc)) && N(dc, null), Pc();
		}
	}
	function pt(e, t) {
		if (!(!gc || !e) && JSON.stringify({
			index: gc.data,
			templates: Object.fromEntries(Object.entries(vc).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			templates: t
		})) {
			gc.replace(e), gc.save();
			for (let e of Object.keys(vc)) e in t || (localStorage.removeItem(`urd-draft-template-${e}`), localStorage.removeItem(`urd-draft-mal-${e}`), delete vc[e]);
			for (let [e, n] of Object.entries(t)) vc[e] || (vc[e] = Qi(`urd-draft-template-${e}`, () => Cc[e] ?? null, le, `urd-draft-mal-${e}`)), vc[e].replace(n), vc[e].save();
			N(Tc, [...e.maler ?? []], !0), rt(), Dc();
		}
	}
	function mt(e) {
		!hl || !e || JSON.stringify(hl.data) !== JSON.stringify(e) && (hl.replace(e), hl.save(), Ml(), Vl());
	}
	function ht() {
		it.length && (at.push(st()), dt(it.pop()), ot = null, E(Z("status.undone")));
	}
	function gt() {
		at.length && (it.push(st()), dt(at.pop()), ot = null, E(Z("status.redone")));
	}
	function _t(e) {
		B(Zt) && (e.target instanceof Element && e.target.closest(".block-menu") || N(Zt, null));
	}
	function vt(e) {
		if (e.key === "Escape" && B(Zt)) {
			N(Zt, null);
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
			].includes(t.type)) || !B(j) || B(Ee) === "mobile") return;
			e.preventDefault(), Qe?.sendDuplicate();
			return;
		}
		if (t !== "z" && t !== "y") return;
		let n = e.target;
		n instanceof HTMLElement && (n.isContentEditable || n.tagName === "TEXTAREA" || n.tagName === "INPUT" && ![
			"number",
			"checkbox",
			"range",
			"color"
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? gt() : ht());
	}
	async function yt() {
		N(ie, Ds(await (await fetch("/content/site.json")).json()), !0), Ze = Qi("urd-draft-site", () => B(ie), le), (Ze.data.schemaVersion ?? 1) > 4 && (console.warn(`Urd: the site draft has schemaVersion ${Ze.data.schemaVersion} (the engine has 4) and is discarded`), Ze.replace(Ke(B(ie)))), Ze.replace(Ds(Ze.data)), Ze.save(), $e(), N(pe, {
			snap: !0,
			...B(k).grid
		}, !0), await oa(new URLSearchParams(location.search).get("page") ?? B(k).pages[0].id), await Il(), await Nc(), await Ec(), await Mi(), B(fe) && Pi(), B(k).site.setup === !0 && !localStorage.getItem("urd-setup-done") && (N(Et, B(k).site.title, !0), N(Dt, B(k).theme.tokens.color.accent, !0), N(Ot, B(k).theme.tokens.color.bg, !0), N(Tt, !0));
	}
	let bt = /* @__PURE__ */ M(null);
	function xt({ title: e, lines: t = [], okLabel: n = Z("confirm.ok"), cancelLabel: r = Z("confirm.cancel") }) {
		return new Promise((i) => {
			N(bt, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function St({ title: e, lines: t = [], value: n = "", placeholder: r = "", okLabel: i = Z("confirm.ok"), cancelLabel: a = Z("confirm.cancel") }) {
		return new Promise((o) => {
			N(bt, {
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
	function Ct(e) {
		B(bt)?.resolve(B(bt).prompt ? e ? B(bt).value : null : e), N(bt, null);
	}
	let wt = !1;
	xn(() => {
		if (!B(bt)) return;
		let e = (e) => {
			e.key === "Escape" && (e.stopPropagation(), Ct(!1));
		};
		return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
	});
	let Tt = /* @__PURE__ */ M(!1), Et = /* @__PURE__ */ M(""), Dt = /* @__PURE__ */ M("#7c5cff"), Ot = /* @__PURE__ */ M("#0b0e14");
	function kt() {
		localStorage.setItem("urd-setup-done", "1"), N(Tt, !1);
	}
	function At() {
		let e = B(Et).trim();
		e && (ja("setup", () => {
			B(k).site.title = e, B(k).nav.logo = {
				type: "text",
				value: e
			}, B(k).theme.tokens.color.accent = B(Dt), B(k).theme.tokens.color.bg = B(Ot), delete B(k).site.setup;
		}), kt(), E(Z("status.setupDone"), "ok"));
	}
	let jt = "urd-admin-panels", Mt = "urd-admin-panel-open", Nt = /* @__PURE__ */ M(tn(localStorage.getItem(jt) === "reset" ? "reset" : "remember"));
	function Pt(e) {
		N(Nt, e === "reset" ? "reset" : "remember", !0), B(Nt) === "reset" ? localStorage.setItem(jt, "reset") : localStorage.removeItem(jt);
	}
	let Ft = /* @__PURE__ */ M(tn(B(Nt) === "reset" ? null : localStorage.getItem(Mt))), It = [
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
	], Lt = [
		"rail.thisPage",
		"rail.site",
		"rail.system"
	], Rt = Object.fromEntries(It.flat().map((e) => [e, Z(`panel.${e}`)]));
	B(Ft) && !Rt[B(Ft)] && N(Ft, null), xn(() => {
		if (B(Nt) === "reset") {
			localStorage.removeItem(Mt);
			return;
		}
		B(Ft) ? localStorage.setItem(Mt, B(Ft)) : localStorage.removeItem(Mt);
	});
	let zt = {
		pages: ["hint.pages.drafts"],
		blocks: ["hint.blocks.intro"],
		grid: ["hint.grid.intro", "hint.grid.section"],
		collections: ["hint.collections.intro"],
		plugins: ["hint.plugins.intro"],
		history: ["hint.history.intro"]
	}, Bt = [
		["se", "Davvisámegiella"],
		["en-GB", "English (UK)"],
		["nb", "Norsk bokmål"],
		["nn", "Norsk nynorsk"],
		["tr", "Türkçe"]
	], Vt = (e) => [...e].sort((e, t) => e[1].localeCompare(t[1]));
	function Ht(e, t) {
		let n = [];
		for (let r of e) for (let e of xl[r]?.languages ?? []) e?.[t] === !0 && (typeof e.code != "string" || typeof e.name != "string" || !e.name || Bt.some(([t]) => t === e.code) || n.some(([t]) => t === e.code) || n.push([e.code, e.name]));
		return n;
	}
	function Ut() {
		let e = Vt([...Bt, ...Ht(B(Dl), "admin")]);
		return Gt === "auto" || e.some(([e]) => e === Gt) ? e : [[Gt, Gt], ...e];
	}
	let Wt = () => Ht(B(vl)?.enabled ?? [], "site"), Gt = localStorage.getItem("urd-admin-lang") ?? "auto";
	function Kt(e) {
		e !== Gt && (e === "auto" ? localStorage.removeItem("urd-admin-lang") : localStorage.setItem("urd-admin-lang", e), location.reload());
	}
	function qt(e) {
		N(Ft, B(Ft) === e ? null : e, !0), B(Ft) === "history" && zi(), B(Ft) === "update" && !B(Xi) && ea();
	}
	let j = /* @__PURE__ */ M(null);
	function Jt(e, t) {
		let n = O?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function Yt() {
		if (!B(j)) return;
		let { block: e } = Jt(B(j).sectionId, B(j).blockId);
		if (!e) {
			N(j, null);
			return;
		}
		N(j, {
			sectionId: B(j).sectionId,
			blockId: B(j).blockId,
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
	function Xt(e) {
		if (N(Zt, null), !e.blockId) {
			N(j, null);
			return;
		}
		N(j, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), e.sectionId && N(Xn, e.sectionId, !0), Yt();
	}
	let Zt = /* @__PURE__ */ M(null), Qt = window.matchMedia("(prefers-reduced-motion: reduce)").matches, $t = [
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
	function en() {
		let e = O?.data.sections ?? [], t = e.findIndex((e) => e.id === B(j)?.sectionId);
		return t < 0 ? [["", Z("opt.sticky.ownSection")]] : [["", Z("opt.sticky.ownSection")], ...e.slice(t + 1).map((e, n) => [e.id, Z("opt.sticky.atSection", { n: t + 2 + n })])];
	}
	function rn(e) {
		if (Xt(e), !B(j)) return;
		let t = B(de)?.getBoundingClientRect();
		if (!t) return;
		let n = t.left + B(Ie) * e.rect.right + 12;
		n + 300 > window.innerWidth - 8 && (n = Math.max(8, t.left + B(Ie) * e.rect.left - 300 - 12));
		let r = window.innerHeight - Math.min(window.innerHeight * .7, 560) - 8, i = Math.min(Math.max(8, t.top + B(Ie) * e.rect.top), Math.max(8, r));
		N(Zt, {
			left: n,
			top: i
		}, !0);
	}
	function an(e, t) {
		let { section: n, block: r } = Jt(B(j)?.sectionId, B(j)?.blockId);
		r && (e && ct(e), t(r, n), Je(n, "block-edited"), O.save(), rt(), Qe?.sendSection(B(T), n), Yt());
	}
	function P(e, t) {
		an(`edit:${B(j).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function on(e, t) {
		an(`edit:${B(j).blockId}:${e}`, (e) => {
			Object.assign(e.props, t);
		});
	}
	let sn = /* @__PURE__ */ new Set([
		"image",
		"video",
		"shape",
		"icon"
	]);
	function cn(e) {
		an(`edit:${B(j).blockId}:fit`, (t) => {
			e === "shrink" ? (t.fit = "shrink", t.fitMin ??= .6) : (delete t.fit, delete t.fitMin);
		});
	}
	function ln(e) {
		an(`edit:${B(j).blockId}:fitMin`, (t) => {
			t.fitMin = e;
		});
	}
	let un = tn({}), dn = tn({}), fn = /* @__PURE__ */ M(!1), pn = /* @__PURE__ */ M("content"), mn = (e, t) => (Number.isFinite(t) || (t = e.min ?? 0), e.min != null && (t = Math.max(e.min, t)), e.max != null && (t = Math.min(e.max, t)), t);
	async function hn(e) {
		let t = B(j).blockId, n = `${t}:${e.key}`, r = (un[n] ?? B(j).props[e.key] ?? "").trim();
		dn[n] = null;
		let i = r.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
		if (!r || i || /^https?:\/\//i.test(r)) {
			on(e.key, {
				[e.key]: r,
				lat: i ? Number(i[1]) : null,
				lon: i ? Number(i[2]) : null
			});
			return;
		}
		N(fn, !0), dn[n] = {
			text: Z("props.place.searching"),
			err: !1
		};
		try {
			let i = await fetch(`/api/geocode?q=${encodeURIComponent(r)}`), a = await i.json().catch(() => null);
			if (B(j)?.blockId !== t) return;
			i.ok && Number.isFinite(a?.lat) ? (on(e.key, {
				[e.key]: r,
				lat: a.lat,
				lon: a.lon
			}), dn[n] = null) : dn[n] = {
				text: Wi(a) ?? Z("props.place.notFound"),
				err: !0
			};
		} catch {
			dn[n] = {
				text: Z("props.place.failed"),
				err: !0
			};
		} finally {
			N(fn, !1);
		}
	}
	function gn(e, t) {
		Number.isFinite(t) && an(`edit:frame-${B(j).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function _n(e) {
		an(`edit:${B(j).blockId}:boxStyle`, (t) => {
			let n = {
				...t.props.boxStyle ?? {},
				...e
			};
			for (let e of Object.keys(n)) n[e] ?? delete n[e];
			Object.keys(n).length ? t.props.boxStyle = n : delete t.props.boxStyle;
		});
	}
	let vn = [
		"text",
		"email",
		"tel",
		"textarea",
		"select",
		"checkbox",
		"radio",
		"date"
	], yn = /* @__PURE__ */ new Set(["select", "radio"]), bn = () => "f" + [...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(3))].map((e) => e.toString(16).padStart(2, "0")).join("");
	function Sn(e, t) {
		an(`edit:${B(j).blockId}:field${e}`, (n) => {
			let r = {
				...n.props.fields[e],
				...t
			};
			yn.has(r.type) ? r.options ??= [] : delete r.options, n.props.fields[e] = r;
		});
	}
	function Cn(e, t) {
		Sn(e, { options: String(t).split(",").map((e) => e.trim()).filter(Boolean) });
	}
	function wn() {
		an("form-field", (e) => {
			(e.props.fields ??= []).push({
				id: bn(),
				label: Z("form.newField"),
				type: "text",
				required: !1
			});
		});
	}
	function Tn(e) {
		an("form-field", (t) => {
			t.props.fields.splice(e, 1);
		});
	}
	function En(e, t) {
		let n = e + t;
		an("form-field", (t) => {
			n < 0 || n >= t.props.fields.length || ([t.props.fields[e], t.props.fields[n]] = [t.props.fields[n], t.props.fields[e]]);
		});
	}
	function Dn(e) {
		P("sources", String(e).split("\n").map((e) => e.trim()).filter(Boolean));
	}
	function On(e, t) {
		an(`edit:${B(j).blockId}:faq${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function kn() {
		an("faq-item", (e) => {
			(e.props.items ??= []).push({
				q: Z("seed.faq.newQ"),
				a: Z("seed.faq.answer")
			});
		});
	}
	function An(e) {
		an("faq-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function jn(e, t) {
		let n = e + t;
		an("faq-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function Mn(e, t) {
		an(`edit:${B(j).blockId}:ribbon${e}`, (n) => {
			n.props.items[e] = t;
		});
	}
	function Nn() {
		an("ribbon-item", (e) => {
			(e.props.items ??= []).push(Z("seed.ribbonBlock.new"));
		});
	}
	function Pn(e) {
		an("ribbon-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function Fn(e, t) {
		let n = e + t;
		an("ribbon-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function In(e, t) {
		an(`edit:${B(j).blockId}:tl${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function Ln() {
		an("tl-item", (e) => {
			(e.props.items ??= []).push({
				year: "",
				title: Z("seed.timeline.newTitle"),
				text: ""
			});
		});
	}
	function Rn(e) {
		an("tl-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function zn(e, t) {
		let n = e + t;
		an("tl-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function Bn(e) {
		an("decor", (t) => {
			t.decor = e;
		});
	}
	function Vn(e, t) {
		an(`edit:${B(j).blockId}:table-form`, (n) => {
			let r = (Array.isArray(n.props.rows) && n.props.rows.length ? n.props.rows : [[""]]).map((e) => Array.isArray(e) ? e.map((e) => String(e ?? "")) : [""]), i = Math.max(1, ...r.map((e) => e.length));
			r = r.map((e) => [...e, ...Array(i - e.length).fill("")]), e > 0 ? r.push(Array(i).fill("")) : e < 0 && r.length > 1 && r.pop(), t > 0 ? r = r.map((e) => [...e, ""]) : t < 0 && i > 1 && (r = r.map((e) => e.slice(0, i - 1))), n.props.rows = r;
		});
	}
	function Hn(e, t) {
		an(`edit:${B(j).blockId}:share`, (n) => {
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
	function Un(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		let n = new FileReader();
		n.onload = () => {
			P("src", String(n.result ?? "")), t.size > 4e5 && E(Z("status.audioLarge", { kb: Math.round(t.size / 1024) }), "error");
		}, n.onerror = () => E(Z("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function Wn(e) {
		let { section: t, block: n } = Jt(B(j)?.sectionId, B(j)?.blockId);
		n && (ct("hide-mobile"), n.hideMobile = e, O.save(), rt(), Qe?.sendSection(B(T), t), Yt());
	}
	async function Gn(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await zr(t);
			an(`edit:${B(j).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || Oa(t.name).replaceAll("-", " ");
			});
		} catch {
			E(Z("status.imageReadError"), "error");
		}
	}
	async function Kn(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await zr(t);
			an(`edit:${B(j).blockId}`, (t) => {
				t.props.image = e.dataUrl;
			});
		} catch {
			E(Z("status.imageReadError"), "error");
		}
	}
	let qn = {
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
		ribbon: Z("blocks.ribbon"),
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
	}, Jn = [
		["line", Z("shape.line")],
		["arrow", Z("shape.arrow")],
		["circle", Z("shape.circle")],
		["rect", Z("shape.rect")],
		["triangle", Z("shape.triangle")]
	], Yn = [
		["accent", Z("color.accent")],
		["text", Z("color.text")],
		["surface", Z("color.surface")],
		["bg", Z("color.bg")]
	], Xn = /* @__PURE__ */ M(null), Zn = /* @__PURE__ */ M(null), Qn = /* @__PURE__ */ M(""), $n = /* @__PURE__ */ M(tn([])), er = /* @__PURE__ */ M(null), tr = /* @__PURE__ */ M(null), nr = /* @__PURE__ */ M("");
	function rr(e) {
		N(Zn, e?.grid ? { ...e.grid } : null, !0), N(Qn, e?.size?.minHeight ?? "", !0), N($n, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), N(er, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0), N(tr, e?.hover ? JSON.parse(JSON.stringify(e.hover)) : null, !0), N(nr, e?.theme ?? "", !0);
	}
	let ir = /* @__PURE__ */ M(null), ar = tn({});
	function or() {
		try {
			let e = ((B(de)?.contentDocument)?.querySelector(`.urd-section[data-section-id="${B(Xn)}"]`))?.getBoundingClientRect();
			N(ir, e && e.width ? {
				w: e.width,
				h: e.height
			} : null, !0);
		} catch {
			N(ir, null);
		}
	}
	xn(() => {
		B(Xn), B($n), requestAnimationFrame(() => requestAnimationFrame(or));
	}), xn(() => {
		let e = B(de);
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(() => or());
		return t.observe(e), () => t.disconnect();
	}), xn(() => {
		for (let e of B($n)) {
			let t = e?.props?.src;
			if (e?.type === "image" && t && !ar[t]) {
				let e = new Image();
				e.onload = () => {
					ar[t] = {
						w: e.naturalWidth,
						h: e.naturalHeight
					};
				}, e.src = t;
			}
		}
	});
	function sr(e) {
		ur("section-theme", (t) => {
			e ? t.theme = e : delete t.theme;
		});
	}
	function cr(e) {
		let t = B(ti), n = (e) => e.replaceAll("var(--urd-base-bg)", t.bg).replaceAll("var(--urd-base-surface)", t.surface).replaceAll("var(--urd-base-text)", t.text).replaceAll("var(--urd-base-accent)", t.accent).replaceAll("var(--urd-base-accent-text)", t["accent-text"] ?? re(Qh(t.accent ?? "#000000", t))), r = il(e);
		return {
			bg: r["--urd-color-bg"] ? n(r["--urd-color-bg"]) : t.bg,
			surface: r["--urd-color-surface"] ? n(r["--urd-color-surface"]) : t.surface,
			text: r["--urd-color-text"] ? n(r["--urd-color-text"]) : t.text,
			accent: r["--urd-color-accent"] ? n(r["--urd-color-accent"]) : t.accent
		};
	}
	function lr(e) {
		N(Xn, e.sectionId, !0), rr(O?.data.sections.find((t) => t.id === e.sectionId));
	}
	function ur(e, t) {
		let n = O.data.sections.find((e) => e.id === B(Xn));
		n && (ct(e), t(n), O.save(), rt(), Qe?.sendSection(B(T), n), rr(n));
	}
	let dr = /* @__PURE__ */ M("color");
	function fr(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background ??= {
				version: 1,
				layers: []
			}, e.background.layers.push({
				type: t,
				version: S[t].version ?? 1,
				props: S[t].defaults()
			});
		});
	}
	function mr(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers.splice(t, 1), e.background.layers.length || delete e.background;
		});
	}
	function hr(e, t, n) {
		let r = t + n;
		e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers;
			r < 0 || r >= n.length || ([n[t], n[r]] = [n[r], n[t]]);
		});
	}
	function gr(e, t, n, r) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e.background.layers[t].props[n] = r;
		});
	}
	function _r(e, t, n, r = "xy") {
		e.preventDefault();
		let i = e.currentTarget;
		i.setPointerCapture?.(e.pointerId);
		let a = (e) => {
			let a = i.getBoundingClientRect();
			if (r.includes("x")) {
				let r = Math.min(1, Math.max(0, (e.clientX - a.left) / a.width));
				gr(t, n, "x", Math.round(r * 100) / 100);
			}
			if (r.includes("y")) {
				let r = Math.min(1, Math.max(0, (e.clientY - a.top) / a.height));
				gr(t, n, "y", Math.round(r * 100) / 100);
			}
		};
		a(e);
		let o = () => {
			i.removeEventListener("pointermove", a), i.removeEventListener("pointerup", o), i.removeEventListener("pointercancel", o);
		};
		i.addEventListener("pointermove", a), i.addEventListener("pointerup", o), i.addEventListener("pointercancel", o);
	}
	let vr = (e) => Math.min(4, Math.max(.1, e));
	function yr(e, t, n, r) {
		gr(e, t, "size", vr(Math.round((n + r) * 100) / 100));
	}
	function br(e, t, n) {
		let r = Number(n);
		Number.isFinite(r) && gr(e, t, "size", vr(r / 100));
	}
	function xr(e, t, n, r) {
		let i = ar[n.props.src];
		if (!i?.w || !i?.h || !B(ir)?.w || !B(ir)?.h) return;
		let a = B(ir).h * i.w / (B(ir).w * i.h), o = r === "cover" ? Math.max(1, a) : Math.min(1, a);
		(n.props.fit === "tile" || n.props.fit === "repeat") && gr(e, t, "fit", "plain"), gr(e, t, "size", vr(Math.round(o * 100) / 100));
	}
	function Cr(e) {
		return e.props;
	}
	function Tr(e, t, n, r) {
		e.mutate(n, (e) => {
			r(e.background.layers[t].props);
		});
	}
	function Er(e, t, n, r) {
		Tr(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e[n] = r;
		});
	}
	let Dr = {
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
	function Or(e, t, n) {
		Tr(e, t, e.keyPrefix, (e) => {
			e.kind = n, Dr[n].some(([t]) => t === (e.animation ?? "none")) || (e.animation = "none");
		});
	}
	function kr(e, t, n, r) {
		Tr(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-stop${n}`, (e) => {
			e.stops[n] = {
				...e.stops[n],
				...r
			};
		});
	}
	function Ar(e, t) {
		Tr(e, t, e.keyPrefix, (e) => {
			let t = Math.round(e.stops.reduce((e, t) => e + (Number(t.share) || 0), 0) / e.stops.length) || 50;
			e.stops.push({
				color: e.stops[e.stops.length - 1]?.color ?? "#ffffff",
				share: t
			});
		});
	}
	function jr(e, t, n) {
		Tr(e, t, e.keyPrefix, (e) => {
			e.stops.length > 2 && e.stops.splice(n, 1);
		});
	}
	function Mr(e, t, n, r) {
		Tr(e, t, e.keyPrefix, (e) => {
			let [t] = e.stops.splice(n, 1);
			e.stops.splice(r, 0, t);
		});
	}
	let H = /* @__PURE__ */ M(null);
	function Fr(e, t, n, r) {
		if (t.button !== 0) return;
		t.preventDefault();
		let i = t.currentTarget.closest(".bg-layer"), a = t.currentTarget.closest(".grad-stop");
		N(H, {
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
			N(H, {
				...B(H),
				insert: n
			}, !0);
		}, u = () => {
			window.removeEventListener("pointermove", l), window.removeEventListener("pointerup", u), c.remove();
			let t = B(H);
			if (N(H, null), !t) return;
			let n = t.insert > t.from ? t.insert - 1 : t.insert;
			n !== t.from && Mr(e, t.layer, t.from, n);
		};
		window.addEventListener("pointermove", l), window.addEventListener("pointerup", u);
	}
	function Ir(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].type !== n && (e.background.layers[t] = {
				type: n,
				version: S[n].version ?? 1,
				props: S[n].defaults()
			});
		});
	}
	async function Lr(e, t) {
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
	async function Rr(e) {
		let t = await e.text(), n = wa(t), r = Ea(t);
		if (!r) return n;
		let i = await Lr(n.dataUrl, r);
		if (!i) return n;
		let a = Ta(t, i);
		if (a === t) return n;
		try {
			return wa(a);
		} catch {
			return n;
		}
	}
	async function zr(e) {
		return e.type === "image/svg+xml" || /\.svg$/i.test(e.name || "") ? Rr(e) : xa(e);
	}
	async function Br(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			gr(e, t, "src", (await zr(r)).dataUrl);
		} catch {
			E(Z("status.imageReadError"), "error");
		}
	}
	function Vr(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", !r) return;
		if (!["video/mp4", "video/webm"].includes(r.type)) {
			E(Z("status.videoFormat"), "error");
			return;
		}
		if (r.size > 15e6) {
			E(Z("status.videoTooLarge", {
				mb: (r.size / 1e6).toFixed(1),
				max: Math.round(ba / 1e6)
			}), "error");
			return;
		}
		let i = new FileReader();
		i.onload = () => {
			gr(e, t, "src", String(i.result ?? "")), r.size > 4e6 && E(Z("status.videoLarge", { mb: (r.size / 1e6).toFixed(1) }), "error");
		}, i.onerror = () => E(Z("status.imageReadError"), "error"), i.readAsDataURL(r);
	}
	async function Hr(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			gr(e, t, "poster", (await zr(r)).dataUrl);
		} catch {
			E(Z("status.imageReadError"), "error");
		}
	}
	async function Ur(e, t, n) {
		let r = [...n.target.files ?? []];
		if (n.target.value = "", !r.length) return;
		E(Z("status.compressingImages"));
		let { images: i, failed: a, big: o } = await Mg(r);
		i.length && e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers[t].props;
			n.images ??= [], n.images.push(...i.map(({ src: e }) => ({
				src: e,
				x: .5,
				y: .5
			})));
		}), Ng(i.length, a, o);
	}
	function Wr(e, t, n, r) {
		e.mutate(e.keyPrefix, (e) => {
			let i = e.background.layers[t].props.images, a = n + r;
			a < 0 || a >= i.length || ([i[n], i[a]] = [i[a], i[n]]);
		});
	}
	function Kr(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].props.images.splice(n, 1);
		});
	}
	function qr(e, t, n, r, i) {
		e.mutate(`edit:${e.keyPrefix}g-${e.keyId}-${t}-${n}-${r}`, (e) => {
			e.background.layers[t].props.images[n][r] = i;
		});
	}
	function Jr(e, t) {
		ja(e, () => {
			B(k).nav.style ??= {}, t(B(k).nav.style);
		});
	}
	let Xr = /* @__PURE__ */ A(() => ({
		mutate: ur,
		keyPrefix: "bg",
		keyId: B(Xn)
	})), Zr = {
		mutate: Jr,
		keyPrefix: "navbg",
		keyId: "nav"
	}, Qr = {
		mutate: Gl,
		keyPrefix: "footerbg",
		keyId: "footer"
	}, $r = () => {
		let e = null;
		try {
			e = localStorage.getItem("urd-theme-mode");
		} catch {}
		return Xc(B(k)?.theme?.scheme, e, window.matchMedia("(prefers-color-scheme: dark)").matches);
	}, ei = /* @__PURE__ */ M("light");
	xn(() => {
		N(ei, $r(), !0);
		let e = window.matchMedia("(prefers-color-scheme: dark)"), t = (e) => {
			e instanceof StorageEvent && e.key && e.key !== "urd-theme-mode" || N(ei, $r(), !0);
		};
		return e.addEventListener("change", t), window.addEventListener("storage", t), () => {
			e.removeEventListener("change", t), window.removeEventListener("storage", t);
		};
	});
	let ti = /* @__PURE__ */ A(() => B(k)?.theme ? Zc(B(k).theme, B(ei)).color ?? {} : {}), ni = () => Object.entries(B(ti)), ri = [
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
	], ii = /* @__PURE__ */ A(() => !!B(k)?.theme.alt), ai = /* @__PURE__ */ A(() => B(k)?.theme.alt?.auto === !0), oi = /* @__PURE__ */ A(() => B(k)?.theme.scheme === "dark" ? "dark" : "light"), si = /* @__PURE__ */ A(() => B(k)?.theme.tokens.color ?? {}), ci = /* @__PURE__ */ A(() => ({
		...B(k)?.theme.tokens.color ?? {},
		...B(k)?.theme.alt?.tokens?.color ?? {}
	}));
	function li(e) {
		return {
			type: e,
			version: mu[e].version,
			props: mu[e].defaults()
		};
	}
	let di = (e) => !!(e && mu[e.type]?.entrance), fi = [["", Z("common.none")], ...Object.entries(mu).filter(([, e]) => e.entrance).map(([e, t]) => [e, t.labelKey ? Z(t.labelKey) : t.label])], pi = fi.filter(([e]) => !mu[e]?.group), mi = [["", Z("common.none")], ...Object.entries(mu).filter(([, e]) => !e.entrance).map(([e, t]) => [e, t.labelKey ? Z(t.labelKey) : t.label])];
	function hi(e) {
		e.animation && !di(e.animation) && (e.hover ??= e.animation, e.animation = null);
	}
	function gi(e) {
		an(`edit:anim-${B(j).blockId}`, (t) => {
			hi(t), t.animation = e ? li(e) : null;
		}), B(j) && Qe?.sendDemoAnim(B(j).sectionId, B(j).blockId);
	}
	function _i(e) {
		an(`edit:hover-${B(j).blockId}`, (t) => {
			hi(t), t.hover = e ? li(e) : null;
		});
	}
	function yi(e, t) {
		Number.isFinite(t) && (an(`edit:anim-${B(j).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), B(j) && Qe?.sendDemoAnim(B(j).sectionId, B(j).blockId));
	}
	function bi(e) {
		ur("section-anim", (t) => {
			hi(t), t.animation = e ? li(e) : null;
		}), Qe?.sendDemoAnim(B(Xn));
	}
	function xi(e) {
		ur("section-hover", (t) => {
			hi(t), t.hover = e ? li(e) : null;
		});
	}
	function Si(e, t) {
		Number.isFinite(t) && (ur("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), Qe?.sendDemoAnim(B(Xn)));
	}
	function wi(e, t) {
		ur("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), Qe?.sendDemoAnim(B(Xn));
	}
	function Ti(e) {
		let t = O.data.sections.find((e) => e.id === B(Xn));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		ct("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, N(Qn, r, !0), O.save(), rt(), Qe?.sendSection(B(T), t);
	}
	function Ei() {
		return O.data.sections.find((e) => e.id === B(Xn)) ?? O.data.sections[0];
	}
	function Oi(e) {
		let t = O.data.sections.find((e) => e.id === B(Xn));
		t && (ct("grid:section"), t.grid = e ? { ...Ze.data.grid } : null, N(Zn, t.grid ? { ...t.grid } : null, !0), O.save(), rt(), Qe?.sendSection(B(T), t), B(Sa) && Qe?.sendShowGrid(!0));
	}
	function ki(e, t) {
		let n = O.data.sections.find((e) => e.id === B(Xn));
		n?.grid && (ct("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, N(Zn, { ...n.grid }, !0), O.save(), rt(), Qe?.sendSection(B(T), n), B(Sa) && Qe?.sendShowGrid(!0));
	}
	function Ai(e, t) {
		ct("grid:site"), N(pe, {
			...B(pe),
			[e]: t
		}, !0), Ze.data.grid = {
			...Ze.data.grid,
			[e]: t
		}, Ze.save(), rt(), et(), B(Sa) && Qe?.sendShowGrid(!0);
	}
	async function Mi() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? N(fe, await e.json(), !0) : e.status !== 503 && N(fe, null);
		} catch {
			N(fe, null);
		}
	}
	let Ni = null;
	async function Pi() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (Ni = (await e.json()).head ?? null);
		} catch {}
	}
	async function Fi(e) {
		if (!Ni) return await Pi(), {
			ok: await xt({
				title: Z("confirm.conflictUnknown.title"),
				lines: [Z("confirm.conflictUnknown.body"), Z("confirm.conflictUnknown.warning")],
				okLabel: Z("confirm.publishAnyway"),
				cancelLabel: Z("confirm.cancel")
			}),
			head: Ni
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${Ni}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === Ni) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? [Z("confirm.conflict.truncated")] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await xt({
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
	let Ii = /* @__PURE__ */ M(null), Li = /* @__PURE__ */ M(""), Ri = /* @__PURE__ */ M(!1);
	async function zi() {
		N(Li, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? N(Ii, (await e.json()).commits, !0) : e.status === 401 ? (N(Ii, [], !0), N(Li, Z("status.historyLoginRequired"), !0)) : (N(Ii, [], !0), N(Li, Wi(await e.json().catch(() => null)) ?? Z("status.historyFetchFailed"), !0));
		} catch {
			N(Ii, [], !0), N(Li, Z("status.historyUnavailable"), !0);
		}
	}
	let Bi = (() => {
		let e = {
			dateStyle: "short",
			timeStyle: "short"
		};
		try {
			return new Intl.DateTimeFormat(Gi(), e);
		} catch {
			return new Intl.DateTimeFormat(void 0, e);
		}
	})(), Vi = !1;
	async function Hi() {
		let e = B(Ii)?.[0];
		if (!(!e || B(Ri)) && await xt({
			title: Z("confirm.revert.title"),
			lines: [`«${e.message}»`, Z("confirm.revert.body")],
			okLabel: Z("confirm.revert.ok"),
			cancelLabel: Z("confirm.cancel")
		})) {
			N(Ri, !0), E(Z("status.reverting"));
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? Ni = e : Pi(), Vi = !0, E(Z("status.revertDone"), "ok"), Ui();
				} else t.status === 409 ? E(Z("status.revertConflict"), "error") : E(Wi(await t.json().catch(() => null)) ?? Z("status.revertFailed"), "error");
			} catch {
				E(Z("status.publishLayerUnreachable"), "error");
			}
			N(Ri, !1), zi();
		}
	}
	async function Ui() {
		let e = ["/content/site.json", ...B(k).pages.map((e) => `/${e.file}`)], t = async () => {
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
	let Ki = 0;
	async function qi(e) {
		let t = ++Ki, n = ce, r = await Co(So(e));
		t === Ki && n === ce && (r ? E(Z("status.publishLive"), "ok") : E(Z("status.publishDeployTimeout"), "error"));
	}
	let Ji = /* @__PURE__ */ M(null), Yi = /* @__PURE__ */ M(null), Xi = /* @__PURE__ */ M(!1), $i = /* @__PURE__ */ M(tn(/* @__PURE__ */ new Set()));
	async function ea() {
		N(Xi, !0), N(Yi, null), N(Ji, null);
		try {
			let e = await fetch("/api/github/update"), t = await e.json().catch(() => null);
			e.ok ? (N(Ji, t, !0), N($i, /* @__PURE__ */ new Set(), !0)) : N(Yi, Wi(t) ?? Z("update.checkFailed"), !0);
		} catch {
			N(Yi, Z("status.publishLayerUnreachable"), !0);
		}
		N(Xi, !1);
	}
	function ta(e) {
		let t = new Set(B($i));
		t.has(e) ? t.delete(e) : t.add(e), N($i, t, !0);
	}
	async function na() {
		if (!B(Ji) || B(Ji).upToDate || B(Xi)) return;
		let e = [...B($i)], t = B(Ji).changes.filter((e) => !B($i).has(e.path)), n = t.filter((e) => e.atom && e.conflict);
		if (await xt({
			title: Z("confirm.update.title"),
			lines: [Z("confirm.update.body", {
				target: B(Ji).target,
				writes: t.filter((e) => e.action === "write").length,
				deletes: t.filter((e) => e.action === "delete").length
			}), ...n.length > 0 ? [Z("confirm.update.warnEdited", { paths: n.map((e) => e.path).join(", ") })] : []],
			okLabel: Z("confirm.update.ok"),
			cancelLabel: Z("confirm.cancel")
		})) {
			N(Xi, !0), E(Z("update.running", { target: B(Ji).target }));
			try {
				let t = await fetch("/api/github/update", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						to: B(Ji).target,
						expect: B(Ji).head,
						skip: e
					})
				}), n = await t.json().catch(() => null);
				t.ok ? (E(Z("update.committed", { target: B(Ji).target }), "ok"), await ra(B(Ji).target.replace(/^v/, ""))) : t.status === 409 ? (E(Wi(n) ?? Z("update.checkFailed"), "error"), await ea()) : E(Wi(n) ?? Z("update.failed"), "error");
			} catch {
				E(Z("status.publishLayerUnreachable"), "error");
			}
			N(Xi, !1);
		}
	}
	async function ra(e) {
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
	let ia = null;
	function aa(e) {
		return {
			schemaVersion: 4,
			meta: {
				id: e.id,
				title: e.title
			},
			sections: [{
				id: Ps("sec"),
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
	async function oa(e, { keepHistory: t = !1 } = {}) {
		N(T, e, !0), ia = (async () => {
			let n = nt(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = Os(await e.json(), Ze.data));
			} catch {}
			r ? tt.delete(e) : r = aa(n), O = Qi(`urd-draft-${e}`, () => r, le), (O.data.schemaVersion ?? 1) > 4 && (console.warn(`Urd: the draft for '${e}' has schemaVersion ${O.data.schemaVersion} (the engine has 4) and is discarded`), O.replace(structuredClone(r))), O.replace(Os(O.data, Ze.data)), O.save(), t || (ot = null), N(Xn, null), N(Zn, null), rt(), Ka(), Ue(), N(oe, "");
		})(), await ia;
	}
	function sa() {
		Qe?.destroy(), B(de)?.contentDocument?.addEventListener("pointerdown", () => {
			B(Zt) && N(Zt, null);
		}, !0), Qe = yo(B(de), {
			onEdit: ag,
			onMove: og,
			onGrow: sg,
			onDelete: _g,
			onAddSection: fg,
			onMoveSection: pg,
			onDeleteSection: mg,
			onSectionSize: hg,
			onUndo: (e) => e.redo ? gt() : ht(),
			onSelectSection: lr,
			onSelectBlock: Xt,
			onBlockMenu: rn,
			onReady: ca,
			onNavigate: Aa,
			onAddBlock: (e) => xg(e.sectionId, e.block),
			onAddBlocks: (e) => Sg(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: Ag,
			onMoveBlockSection: gg,
			onMobileReset: cg,
			onMobileOrder: lg,
			onReviewDone: ug,
			onBlockFlag: dg,
			onCollectionEdit: zc,
			onCollectionAdd: Lc,
			onSaveTemplate: Oc,
			onStickyGroup: Ac,
			onStickyDock: kc,
			onDeleteTemplate: Mc,
			onApplyLayout: Ge,
			onPluginBlocks: (e) => {
				N(wg, e.blocks ?? [], !0);
			},
			onNavWidth: (e) => ja("edit:nav-width", () => {
				B(k).nav.style ??= {}, B(k).nav.style.width = e.width;
			})
		});
	}
	async function ca() {
		await ia, await _l, Qe?.sendPlugins(Ke(B(vl))?.enabled ?? []), Qe?.sendViewport(B(Ee)), Qe?.sendZoom(B(Ie)), Fc(), Dc(), Ze.hasDraft() && et();
		let e = !B(ie).pages.some((e) => e.id === B(T));
		(O.hasDraft() || e) && Qe?.sendPage(B(T), O.data), B(me) || Qe?.sendChrome(!1), B(Sa) && Qe?.sendShowGrid(!0), B(la) && Qe?.sendShowGuides(!0), ne();
	}
	let la = /* @__PURE__ */ M(localStorage.getItem("urd-guides") === "1"), ua = /* @__PURE__ */ M(!1), da = /* @__PURE__ */ M(tn(localStorage.getItem("urd-layout-picker") === "menu" ? "menu" : "strip"));
	function fa(e) {
		N(da, e === "menu" ? "menu" : "strip", !0), B(da) === "menu" ? localStorage.setItem("urd-layout-picker", "menu") : localStorage.removeItem("urd-layout-picker");
	}
	let pa = /* @__PURE__ */ M(null);
	xn(() => {
		if (!B(ua)) return;
		let e = (e) => {
			B(pa)?.contains(e.target) || N(ua, !1);
		}, t = (e) => {
			e.key === "Escape" && N(ua, !1);
		}, n = () => {
			N(ua, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let ma = {
		view: 1079,
		device: 999,
		zoom: 919
	}, ha = /* @__PURE__ */ M(null), _a = /* @__PURE__ */ M(null), va = tn({
		view: !1,
		device: !1,
		zoom: !1
	});
	xn(() => {
		let e = Object.entries(ma).map(([e, t]) => {
			let n = window.matchMedia(`(max-width: ${t}px)`), r = () => {
				va[e] = n.matches;
			};
			return r(), n.addEventListener("change", r), () => n.removeEventListener("change", r);
		});
		return () => e.forEach((e) => e());
	}), xn(() => {
		B(ha) && !va[B(ha)] && N(ha, null);
	}), xn(() => {
		if (!B(ha)) return;
		let e = (e) => {
			B(_a)?.contains(e.target) || N(ha, null);
		}, t = (e) => {
			e.key === "Escape" && N(ha, null);
		}, n = () => {
			N(ha, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	function ya() {
		N(la, !B(la)), localStorage.setItem("urd-guides", B(la) ? "1" : "0"), Qe?.sendShowGuides(B(la));
	}
	let Sa = /* @__PURE__ */ M(localStorage.getItem("urd-grid-overlay") === "1");
	function Ca() {
		N(Sa, !B(Sa)), localStorage.setItem("urd-grid-overlay", B(Sa) ? "1" : "0"), Qe?.sendShowGrid(B(Sa));
	}
	function Aa(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = B(k).pages.find((e) => e.path === t);
		n && n.id !== B(T) && oa(n.id);
	}
	function ja(e, t) {
		ct(e), t(), Ze.save(), rt(), et();
	}
	let Ma = /* @__PURE__ */ M(""), Na = /* @__PURE__ */ M(null), Pa = Object.fromEntries(Gc.map((e) => [e.id, Uc(Kc(e.id, {
		pageId: "preview",
		title: ""
	}))])), Fa = /* @__PURE__ */ A(() => {
		let e = B(k)?.theme?.tokens?.color ?? {};
		return [
			"bg",
			"surface",
			"text",
			"accent"
		].filter((t) => typeof e[t] == "string" && $c(e[t])).map((t) => `--urd-color-${t}: ${e[t]};`).join(" ");
	}), Ia = /* @__PURE__ */ M(null);
	xn(() => {
		if (!B(Ia)) return;
		let e = (e) => {
			e.target.closest?.(".page-menu-wrap") || N(Ia, null);
		}, t = (e) => {
			e.key === "Escape" && N(Ia, null);
		}, n = () => {
			N(Ia, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let La = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions",
		"readme"
	];
	function Ra(e, t = null) {
		return e ? La.includes(e) ? Z("error.reservedName", { slug: e }) : B(k).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? Z("error.pageExists") : null : Z("error.pageNeedsName");
	}
	function za() {
		let e = B(Ma).trim(), t = Oa(e), n = Ra(t);
		if (n) {
			E(n, "error");
			return;
		}
		let r = B(Na) && !B(Na).startsWith("preset:") ? vc[B(Na)]?.data?.page : null, i = B(Na)?.startsWith("preset:") ? Kc(B(Na).slice(7), {
			pageId: t,
			title: e
		}) ?? aa({
			id: t,
			title: e
		}) : r ? uc(Os(JSON.parse(JSON.stringify(r)), Ze.data), Ps, {
			id: t,
			title: e
		}) : aa({
			id: t,
			title: e
		});
		ja("pages", () => {
			B(k).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), B(k).nav.items.push({
				label: e,
				page: t
			});
		}), ue(`urd-draft-${t}`, JSON.stringify(i)), rt(), N(Ma, ""), N(Na, null), oa(t);
	}
	async function Ba(e) {
		N(Ia, null), await jc("page", e.id === B(T) ? JSON.parse(JSON.stringify(O.data)) : await Qa(e));
	}
	function Va(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		ja("pages", () => {
			e.title = n;
			for (let t of B(k).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === B(T) ? (O.data.meta.title = n, O.save(), rt(), Qe?.sendPage(B(T), O.data)) : $a(e, (e) => {
			e.meta.title = n;
		});
	}
	let Ga = /* @__PURE__ */ M(tn({
		description: "",
		ogTitle: "",
		ogDescription: "",
		ogImage: ""
	}));
	function Ka() {
		let e = O?.data?.meta ?? {};
		N(Ga, {
			description: e.description ?? "",
			ogTitle: e.og?.title ?? "",
			ogDescription: e.og?.description ?? "",
			ogImage: e.og?.image ?? ""
		}, !0);
	}
	function qa(e, t) {
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
		O.save(), rt(), Ka();
		let r = B(k).pages.find((e) => e.id === B(T));
		B(Ya)[B(T)] = !r?.noindex && !O.data.meta.description;
	}
	function Ja(e) {
		let t = B(k).pages.find((e) => e.id === B(T));
		t && (ja("edit:page-noindex", () => {
			e ? t.noindex = !0 : delete t.noindex;
		}), B(Ya)[B(T)] = !e && !O?.data?.meta?.description);
	}
	let Ya = /* @__PURE__ */ M(tn({}));
	async function Xa() {
		let e = {};
		for (let t of B(k).pages) {
			if (t.noindex) continue;
			if (t.id === B(T)) {
				e[t.id] = !O?.data?.meta?.description;
				continue;
			}
			let n = await Qa(t);
			e[t.id] = !n?.meta?.description;
		}
		N(Ya, e, !0);
	}
	xn(() => {
		B(Ft) === "pages" && B(T) && Xa();
	});
	async function Za(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			qa("ogImage", (await zr(t)).dataUrl);
		} catch {
			E(Z("status.imageReadError"), "error");
		}
	}
	async function Qa(e) {
		let t = localStorage.getItem(`urd-draft-${e.id}`);
		if (t) try {
			return JSON.parse(t);
		} catch {}
		try {
			let t = await fetch(`/${e.file}`);
			if (t.ok) return Os(await t.json(), Ze.data);
		} catch {}
		return aa(e);
	}
	async function $a(e, t) {
		let n = await Qa(e);
		t(n), ue(`urd-draft-${e.id}`, JSON.stringify(n)), rt();
	}
	function eo(e, t) {
		let n = Oa(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = Ra(n, e.id);
		if (r) {
			E(r, "error");
			return;
		}
		ja("pages", () => {
			e.path = `/${n}`;
		});
	}
	function to(e) {
		e.path !== "/" && (ja("pages", () => {
			B(k).pages = B(k).pages.filter((t) => t.id !== e.id), B(k).nav.items = B(k).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of B(k).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			B(k).nav.items = B(k).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === B(T) && oa(B(k).pages[0].id), E(Z("status.pageRemoved")));
	}
	function no(e) {
		ja("edit:nav-logo", () => {
			B(k).nav.logo = {
				type: "text",
				value: "",
				...B(k).nav.logo,
				...e
			};
		});
	}
	function io(e) {
		ja("nav", () => {
			B(k).nav.logo ??= {
				type: "text",
				value: B(k).site.title
			};
			let t = B(k).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = B(k).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = B(k).site.title), delete t.image), t.type = e;
		});
	}
	async function ao(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await zr(t);
			ja("nav", () => {
				let t = B(k).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			E(Z("status.imageReadErrorSvg"), "error");
		}
	}
	let oo = /* @__PURE__ */ M(null);
	async function so(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		if (t.type === "image/svg+xml" || /\.svg$/i.test(t.name || "")) {
			try {
				let e = await Rr(t);
				N(oo, e.dataUrl, !0);
			} catch {
				E(Z("status.imageReadErrorSvg"), "error");
			}
			return;
		}
		let n = new FileReader();
		n.onload = () => {
			N(oo, String(n.result), !0);
		}, n.onerror = () => E(Z("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function co(e) {
		ja("edit:site-icon", () => {
			B(k).site.icon = e;
		}), N(oo, null);
	}
	function lo() {
		ja("edit:site-icon", () => {
			delete B(k).site.icon;
		});
	}
	function uo(e) {
		ja("edit:site-title", () => {
			B(k).site.title = e;
		});
	}
	function fo(e) {
		ja("edit:site-desc", () => {
			B(k).site.description = e;
		});
	}
	function po(e) {
		let t = String(e ?? "").trim();
		ja("edit:site-analytics", () => {
			t ? B(k).analytics = { token: t } : delete B(k).analytics;
		});
	}
	let mo = /* @__PURE__ */ A(() => B(k)?.layout?.contentWidth ?? 1440), ho = /* @__PURE__ */ A(() => B(k)?.layout?.gutter ?? 6), go = /* @__PURE__ */ A(() => zo(B(mo))), _o = /* @__PURE__ */ A(() => Mo.find((e) => e.gutter === B(ho))?.id ?? null), bo = /* @__PURE__ */ M(!1), Eo = /* @__PURE__ */ A(() => B(mo) === "full" ? jo : Fo(B(mo))), Do = /* @__PURE__ */ A(() => Po.map((e) => ({
		screen: e,
		...Ro(B(mo), B(ho), e)
	})));
	function Zo(e, t) {
		ja(t, () => {
			let t = {
				...B(k).layout ?? {},
				contentWidth: B(mo),
				gutter: B(ho),
				...e
			};
			for (let e of Object.keys(t)) t[e] === void 0 && delete t[e];
			B(k).layout = t;
		});
	}
	let $o = (e) => Zo({ contentWidth: e === "full" ? "full" : Fo(e) }, "edit:site-width"), es = (e) => Zo({ gutter: Io(e) }, "edit:site-gutter");
	function as() {
		let e = B(k).site.lang ?? "no";
		return e === "no" ? "nb" : e;
	}
	function os() {
		let e = as(), t = Vt([...Bt, ...Wt()]);
		return [...t.some(([t]) => t === e) ? [] : [[e, e]], ...t];
	}
	function ss(e) {
		ja("site", () => {
			B(k).site.lang = e;
		});
	}
	let cs = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	xn(() => {
		if (!B(k)?.site) return;
		let e = B(k).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 49.6V14.4l25.6 10.4V49.6' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
				return;
			}
			cs.test(e) && (t.href = e);
		}
	});
	function ls(e) {
		ja("nav", () => {
			B(k).nav.layout = e;
		});
	}
	function us(e, t) {
		let n = Al(B(k).nav.style ?? {}), r = n.indexOf(e), i = r + t;
		r < 0 || i < 0 || i >= n.length || ([n[r], n[i]] = [n[i], n[r]], ds("order", n));
	}
	function ds(e, t) {
		ja(`edit:nav-tools-${e}`, () => {
			B(k).nav.style ??= {};
			let n = { ...B(k).nav.style.tools ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? B(k).nav.style.tools = n : delete B(k).nav.style.tools;
		});
	}
	function fs(e, t) {
		ja(`edit:nav-style-${e}`, () => {
			B(k).nav.style ??= {}, t === void 0 ? delete B(k).nav.style[e] : B(k).nav.style[e] = t;
		});
	}
	let ms = /* @__PURE__ */ A(() => B(k)?.nav?.variant === "side-left" || B(k)?.nav?.variant === "side-right"), _s = /* @__PURE__ */ A(() => [
		"floating",
		"floating-square",
		"floating-tab"
	].includes(B(k)?.nav?.variant)), vs = /* @__PURE__ */ A(() => is(B(k)?.nav?.style)), ys = /* @__PURE__ */ A(() => ns(B(k)?.nav?.style, B(k)?.nav?.variant)), bs = /* @__PURE__ */ A(() => rs(B(k)?.nav?.style));
	function xs(e) {
		ja("nav", () => {
			B(k).nav.style ??= {}, e === "md" ? delete B(k).nav.style.size : B(k).nav.style.size = e, delete B(k).nav.style.padY, delete B(k).nav.style.textSize;
		});
	}
	function Ss(e, t, n) {
		let r = e.target.value;
		fs(t, r === "" ? void 0 : ts(r, n, void 0)), e.target.value = B(k).nav.style?.[t] ?? "";
	}
	function Cs(e, t) {
		ja(`edit:nav-mobile-${e}`, () => {
			B(k).nav.style ??= {};
			let n = { ...B(k).nav.style.mobile ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? B(k).nav.style.mobile = n : delete B(k).nav.style.mobile;
		});
	}
	let ws = (e) => {
		let t = B(k)?.nav?.style?.mobile?.[e];
		return t === void 0 ? "" : t ? "on" : "off";
	}, Ts = (e, t) => Cs(e, t === "" ? void 0 : t === "on"), Es = (e) => Cs("border", e ? {
		...B(k).nav.style?.mobile?.border ?? {},
		side: e
	} : void 0);
	function ks(e, t) {
		ja(`edit:nav-announce-${e}`, () => {
			let n = { ...B(k).nav.announcement ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? B(k).nav.announcement = n : delete B(k).nav.announcement;
		});
	}
	let As = "<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"currentColor\" aria-hidden=\"true\">" + [
		6,
		12,
		18
	].flatMap((e) => [
		6,
		12,
		18
	].map((t) => `<circle cx="${t}" cy="${e}" r="1.6"/>`)).join("") + "</svg>", Ms = /* @__PURE__ */ M(null);
	function Fs() {
		let e = B(k).nav?.launcher;
		return [e?.image, ...(e?.links ?? []).map((e) => e.image)].filter(Boolean);
	}
	function $(e, t) {
		ja("nav", () => {
			let n = e === null ? B(k).nav.launcher : B(k).nav.launcher.links[e];
			t.image ? n.image = t.image : delete n.image, t.icon ? n.icon = t.icon : delete n.icon;
		});
	}
	function Is(e, t) {
		ja(`edit:nav-launcher-${e}`, () => {
			B(k).nav.launcher ??= {
				show: !0,
				links: []
			}, t === void 0 ? delete B(k).nav.launcher[e] : B(k).nav.launcher[e] = t;
		});
	}
	function Ls() {
		ja("nav", () => {
			B(k).nav.launcher ??= {
				show: !0,
				links: []
			}, B(k).nav.launcher.links ??= [], B(k).nav.launcher.links.push({
				label: Z("seed.link"),
				href: "",
				icon: "globe"
			});
		});
	}
	function Rs(e) {
		ja("nav", () => {
			B(k).nav.launcher.links.splice(e, 1), B(k).nav.launcher.links.length || delete B(k).nav.launcher;
		});
	}
	function zs(e, t) {
		ja("nav", () => {
			let n = B(k).nav.launcher.links, r = e + t;
			r < 0 || r >= n.length || ([n[e], n[r]] = [n[r], n[e]]);
		});
	}
	function Bs(e, t, n) {
		ja(`edit:nav-launcher-${t}-${e}`, () => {
			B(k).nav.launcher.links[e][t] = n;
		});
	}
	async function Vs(e, t) {
		if (e) try {
			let n = await zr(e);
			ja("nav", () => {
				t === null ? B(k).nav.launcher.image = n.dataUrl : B(k).nav.launcher.links[t].image = n.dataUrl;
			});
		} catch {
			E(Z("status.imageReadErrorSvg"), "error");
		}
	}
	function Hs(e, t) {
		ja(`edit:nav-sheet-${e}`, () => {
			B(k).nav.style ??= {};
			let n = { ...B(k).nav.style.sheet ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? B(k).nav.style.sheet = n : delete B(k).nav.style.sheet;
		});
	}
	function Us(e, t, n) {
		let r = e.target.value;
		fs(t, r === "" ? void 0 : ts(r, n, void 0)), e.target.value = B(t === "padY" ? ys : bs);
	}
	function Ws(e, t, n) {
		let r = e.target.value;
		Cs(t, r === "" ? void 0 : ts(r, n, void 0)), e.target.value = B(k).nav.style?.mobile?.[t] ?? "";
	}
	function Gs(e) {
		let t = ts(e / 100, Go, .5);
		fs("shrinkTo", t === .5 ? void 0 : t);
	}
	function Ks(e) {
		let t = ts(e, Ko, 80);
		fs("shrinkAt", t === 80 ? void 0 : t);
	}
	function qs(e) {
		let t = ts(e, qo, 220);
		fs("shrinkMs", t === 220 ? void 0 : t);
	}
	let Js = {
		underline: [Z("hoverColor.underline.label"), Z("hoverColor.underline.title")],
		pill: [Z("hoverColor.pill.label"), Z("hoverColor.pill.title")],
		lift: [Z("hoverColor.lift.label"), Z("hoverColor.lift.title")]
	}, Ys = /* @__PURE__ */ A(() => Js[B(k)?.nav?.style?.hover] ?? null), Xs = /* @__PURE__ */ A(() => [
		["grid", Z("opt.launcherView.grid")],
		["list", Z("opt.launcherView.list")],
		["cover", Z("opt.launcherView.cover")]
	]), Zs = /* @__PURE__ */ A(() => B(ms) ? [
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
	function Qs(e) {
		ja("nav", () => {
			e === "bar" ? delete B(k).nav.variant : B(k).nav.variant = e, B(k).nav.style && delete B(k).nav.style.radius;
		});
	}
	function $s(e) {
		ja("nav", () => {
			B(k).nav.style ??= {}, e ? B(k).nav.style.glow = !0 : delete B(k).nav.style.glow;
		});
	}
	function ec(e) {
		ja("nav", () => {
			B(k).nav.style ??= {}, e ? delete B(k).nav.style.topGap : B(k).nav.style.topGap = !1;
		});
	}
	function tc(e) {
		ja("nav", () => {
			B(k).nav.style ??= {}, e === "standard" ? delete B(k).nav.style.hover : B(k).nav.style.hover = e;
		});
	}
	let nc = null, rc = {}, ic = {}, ac = !1, oc = /* @__PURE__ */ M(tn([])), sc = /* @__PURE__ */ M(tn({})), dc = /* @__PURE__ */ M(null), fc = /* @__PURE__ */ M(""), pc = /* @__PURE__ */ M("news"), hc = [
		["news", Z("collectionKind.news")],
		["notices", Z("collectionKind.notices")],
		["publications", Z("collectionKind.publications")],
		["products", Z("collectionKind.products")],
		["custom", Z("collectionKind.custom")]
	], gc = null, vc = {}, Cc = {}, wc = !1, Tc = /* @__PURE__ */ M(tn([]));
	async function Ec() {
		let e = {
			version: 1,
			maler: []
		};
		try {
			e = await (await fetch("/content/maler.json")).json();
		} catch {}
		gc = Qi("urd-draft-templates", () => e, le, "urd-draft-maler"), N(Tc, [...gc.data.maler ?? []], !0);
		for (let e of B(Tc)) {
			let t = null;
			try {
				t = await (await fetch(`/content/maler/${e}.json`)).json();
			} catch {}
			Cc[e] = t, vc[e] = Qi(`urd-draft-template-${e}`, () => t, le, `urd-draft-mal-${e}`), (vc[e].data?.schemaVersion ?? 1) > 1 && vc[e].reset();
		}
		wc = !0, Dc();
	}
	function Dc() {
		let e = B(Tc).map((e) => vc[e]?.data ? {
			id: e,
			...JSON.parse(JSON.stringify(vc[e].data))
		} : null).filter(Boolean).map(({ id: e, mal: t, section: n, blocks: r, page: i }) => ({
			id: e,
			name: t.name,
			kind: t.kind,
			section: n,
			blocks: r,
			page: i
		}));
		Qe?.sendTemplates(e);
	}
	function Oc(e) {
		let t = cc.includes(e.kind) ? e.kind : "section";
		return jc(t, e[t]);
	}
	function kc(e) {
		let { section: t, block: n } = Jt(e.sectionId, e.blockId);
		!t || !n?.sticky || $t.some(([t]) => t === e.dock) && (ct(`sticky-dock:${e.blockId}`), n.sticky = {
			...n.sticky,
			dock: e.dock
		}, O.save(), rt(), Qe?.sendSection(B(T), t), Yt());
	}
	function Ac(e) {
		let t = e.blockIds ?? [], { section: n } = Jt(e.sectionId, t[0]);
		if (!n || !t.length) return;
		ct(`sticky-group:${e.sectionId}`);
		let r = e.on ? Ps("stk") : null;
		for (let e of n.blocks) t.includes(e.id) && (e.sticky = r ? {
			offset: 16,
			until: null,
			...e.sticky,
			group: r
		} : null);
		Je(n, "block-edited"), O.save(), rt(), Qe?.sendSection(B(T), n), Yt(), E(Z(e.on ? "status.stickyGrouped" : "status.stickyUngrouped"));
	}
	async function jc(e, t) {
		if (!t || !gc) return;
		let n = (await St({
			title: Z("canvas.templateNamePrompt"),
			placeholder: Z("ph.templateName")
		}))?.trim();
		if (!n) return;
		let r = lc(n);
		if (!r) {
			E(Z("status.invalidName"), "error");
			return;
		}
		if (B(Tc).includes(r)) {
			E(Z("status.templateExists"), "error");
			return;
		}
		ct("templates");
		let i = {
			schemaVersion: 1,
			mal: {
				name: n,
				kind: e
			},
			[e]: t
		};
		vc[r] = Qi(`urd-draft-template-${r}`, () => null, le, `urd-draft-mal-${r}`), vc[r].replace(i), vc[r].save(), gc.data.maler = [...B(Tc), r], gc.save(), N(Tc, [...B(Tc), r], !0), E(Z("status.templateSaved", { name: n }), "ok"), rt(), Dc();
	}
	async function Mc(e) {
		let t = vc[e.id]?.data?.mal;
		t && await xt({ title: Z("confirm.deleteTemplate", { name: t.name }) }) && (ct("templates"), B(Na) === e.id && N(Na, null), localStorage.removeItem(`urd-draft-template-${e.id}`), localStorage.removeItem(`urd-draft-mal-${e.id}`), delete vc[e.id], gc.data.maler = B(Tc).filter((t) => t !== e.id), gc.save(), N(Tc, B(Tc).filter((t) => t !== e.id), !0), rt(), Dc());
	}
	async function Nc() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/collections.json")).json();
		} catch {}
		nc = Qi("urd-draft-collections", () => e, le, "urd-draft-samlinger"), N(oc, [...nc.data.samlinger ?? []], !0);
		for (let e of B(oc)) {
			let t = null;
			try {
				t = await (await fetch(`/content/samlinger/${e}.json`)).json();
			} catch {}
			ic[e] = t, rc[e] = Qi(`urd-draft-collection-${e}`, () => t, le, `urd-draft-samling-${e}`), !t && !rc[e].data && (rc[e].replace({
				schemaVersion: 1,
				id: e,
				name: e,
				kind: "custom",
				entries: []
			}), rc[e].save());
		}
		ac = !0, Pc();
	}
	function Pc(e = !0) {
		let t = {};
		for (let e of B(oc)) rc[e] && (t[e] = JSON.parse(JSON.stringify(rc[e].data)));
		N(sc, t, !0), e && Fc();
	}
	function Fc() {
		Qe?.sendCollections(Ke(B(sc)) ?? {});
	}
	function Ic(e, t, n, r = !0) {
		let i = rc[e];
		i && (ct(t), n(i.data), i.save(), rt(), Pc(r));
	}
	function Lc(e) {
		rc[e.collection] && qc(e.collection);
	}
	function Rc(e) {
		return (new DOMParser().parseFromString(String(e ?? ""), "text/html").body.textContent ?? "").trim();
	}
	function zc(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r === "title" && !Rc(i) || Ic(t, `edit:collection:${t}:${n}:${r}`, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image"));
	}
	function Bc(e, t, n) {
		let r = {
			schemaVersion: 1,
			id: e,
			name: t,
			kind: n,
			entries: []
		};
		rc[e] = Qi(`urd-draft-collection-${e}`, () => null, le, `urd-draft-samling-${e}`), rc[e].replace(r), rc[e].save(), nc.data.samlinger = [...B(oc), e], nc.save(), N(oc, [...B(oc), e], !0), N(dc, e, !0), rt(), Pc();
	}
	function Vc() {
		let e = B(fc).trim();
		if (!e) return;
		let t = Oa(e);
		if (!t || B(oc).includes(t)) {
			E(Z(t ? "status.collectionExists" : "status.invalidName"), "error");
			return;
		}
		ct("collections"), Bc(t, e, B(pc)), N(fc, "");
	}
	function Hc() {
		let e = Z("seed.productCatalogName"), t = Oa(e) || "collection", n = t;
		for (let e = 2; B(oc).includes(n); e += 1) n = `${t}-${e}`;
		ct("collections"), Bc(n, e, "products"), an(null, (e) => {
			e.props.collection = n;
		});
	}
	function Wc(e) {
		ct("collections"), localStorage.removeItem(`urd-draft-collection-${e}`), localStorage.removeItem(`urd-draft-samling-${e}`), delete rc[e], nc.data.samlinger = B(oc).filter((t) => t !== e), nc.save(), N(oc, B(oc).filter((t) => t !== e), !0), B(dc) === e && N(dc, null), rt(), Pc();
	}
	function qc(e) {
		Ic(e, `collection:${e}:add-entry`, (e) => {
			e.kind === "products" ? e.entries.push({
				id: Ps("entry"),
				title: Z("seed.newProduct"),
				text: ""
			}) : e.entries.unshift({
				id: Ps("entry"),
				title: Z("seed.newEntry"),
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function Jc(e, t, n, r) {
		Ic(e, `edit:collection:${e}:${t}:${n}`, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function Qc(e, t, n) {
		Ic(e, `collection:${e}:move-entry`, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function tl(e, t) {
		Ic(e, `collection:${e}:remove-entry`, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function nl(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && Jc(e, t, "image", (await zr(r)).dataUrl);
	}
	function cl(e, t, n) {
		let r = n.split(",").map((e) => e.trim()).filter(Boolean);
		Jc(e, t, "sizes", r.length ? r : "");
	}
	function ll(e, t) {
		Ic(e, `collection:${e}:${t}:colors`, (e) => {
			let n = e.entries.find((e) => e.id === t);
			n && (n.colors = [...n.colors ?? [], { name: Z("ph.colorName") }]);
		});
	}
	function ul(e, t, n, r, i) {
		Ic(e, `edit:collection:${e}:${t}:color:${n}:${r}`, (e) => {
			let a = e.entries.find((e) => e.id === t)?.colors?.[n];
			a && (r === "image" && !i ? delete a.image : i && (a[r] = i));
		});
	}
	async function dl(e, t, n, r) {
		let i = r.target.files?.[0];
		r.target.value = "", i && ul(e, t, n, "image", (await zr(i)).dataUrl);
	}
	function fl(e, t, n) {
		Ic(e, `collection:${e}:${t}:colors`, (e) => {
			let r = e.entries.find((e) => e.id === t);
			r?.colors && (r.colors = r.colors.filter((e, t) => t !== n), r.colors.length || delete r.colors);
		});
	}
	function pl(e) {
		let t = rc[e]?.data;
		if (!t) return;
		let n = URL.createObjectURL(new Blob([mc(t.entries)], { type: "text/csv" })), r = document.createElement("a");
		r.href = n, r.download = `${e}.csv`, r.click(), URL.revokeObjectURL(n);
	}
	async function ml(e, t) {
		let n = t.target.files?.[0];
		if (t.target.value = "", !n) return;
		let r = _c(await n.text());
		if (!r) {
			E(Z("status.csvInvalid"), "error");
			return;
		}
		let i = /* @__PURE__ */ new Set();
		for (let e of r.entries) (!/^[a-z0-9][a-z0-9-]*$/.test(e.id) || i.has(e.id)) && (e.id = Ps("entry")), i.add(e.id);
		Ic(e, `collection:${e}:import`, (e) => {
			e.entries = r.entries;
		}), E(Z("status.csvImported", { count: String(r.entries.length) }), "ok");
	}
	let hl = null, gl, _l = new Promise((e) => {
		gl = e;
	}), vl = /* @__PURE__ */ M(null), xl = tn({}), Cl = /* @__PURE__ */ M("0.0.0"), wl = /* @__PURE__ */ M(""), Tl = /* @__PURE__ */ M(""), El = /* @__PURE__ */ M(tn([])), Dl = /* @__PURE__ */ M(tn([])), kl = /* @__PURE__ */ M("pending"), jl = () => [.../* @__PURE__ */ new Set([...B(vl)?.enabled ?? [], ...B(vl)?.disabled ?? []])];
	function Ml() {
		N(vl, JSON.parse(JSON.stringify(hl.data)), !0);
	}
	let Nl = /* @__PURE__ */ M(null);
	async function Pl() {
		try {
			let e = (await fetch("/urd.json", { cache: "no-store" })).headers.get("content-security-policy");
			if (!e) {
				N(Nl, { unknown: !0 }, !0);
				return;
			}
			let t = (t) => new Set((e.split(";").map((e) => e.trim()).find((e) => e.startsWith(`${t} `)) ?? "").split(/\s+/).slice(1));
			N(Nl, {
				frameSrc: t("frame-src"),
				connectSrc: t("connect-src"),
				scriptSrc: t("script-src")
			}, !0);
		} catch {
			N(Nl, { unknown: !0 }, !0);
		}
	}
	function Fl(e) {
		let t = [
			...(e.scriptSrc ?? []).map((e) => ["script-src", e]),
			...(e.connectSrc ?? []).map((e) => ["connect-src", e]),
			...(e.frameSrc ?? []).map((e) => ["frame-src", e])
		];
		if (!B(Nl) || B(Nl).unknown) return [];
		let n = {
			"script-src": B(Nl).scriptSrc,
			"connect-src": B(Nl).connectSrc,
			"frame-src": B(Nl).frameSrc
		};
		return t.filter(([e, t]) => !n[e]?.has(t)).map(([e, t]) => `${e} ${t}`);
	}
	async function Il() {
		Pl();
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		N(Dl, e.enabled ?? [], !0), hl = Qi("urd-draft-plugins", () => e, le), Ml();
		try {
			N(Cl, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of jl()) zl(e);
		Ll(), gl(), Qe?.sendPlugins(Ke(B(vl))?.enabled ?? []);
	}
	async function Ll() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				Rl();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), N(El, (t ?? []).filter((e) => !jl().includes(e)), !0);
			for (let e of B(El)) zl(e);
			N(kl, "ok");
		} catch {
			Rl();
		}
	}
	function Rl() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				N(El, e.filter((e) => !jl().includes(e)), !0);
				for (let e of B(El)) zl(e);
				N(kl, "ok");
				return;
			}
		} catch {}
		N(kl, "unavailable");
	}
	async function zl(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = Ns(t);
			xl[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && js(B(Cl), t.requiresEngine)
			};
		} catch {
			xl[e] = {
				name: e,
				errors: [Z("plugin.manifestNotFound", { id: e })],
				satisfied: !1
			};
		}
	}
	function Bl(e, t) {
		ct("plugins");
		let n = hl.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), hl.save(), rt(), Ml(), Vl();
	}
	function Vl() {
		B(de) && (B(de).src = B(de).src);
	}
	function Hl(e) {
		ct("plugins");
		let t = hl.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), hl.save(), rt(), Ml(), Vl();
	}
	async function Ul() {
		N(Tl, "");
		let e = B(wl).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			N(Tl, Z("plugin.invalidId"), !0);
			return;
		}
		if (jl().includes(e)) {
			N(Tl, Z("plugin.alreadyListed"), !0);
			return;
		}
		if (await zl(e), xl[e].errors.length) {
			N(Tl, Z("plugin.invalidManifest", { errors: xl[e].errors.join("; ") }), !0);
			return;
		}
		Bl(e, !0), N(wl, "");
	}
	function Wl(e) {
		N(El, B(El).filter((t) => t !== e), !0), Bl(e, !0);
	}
	function Gl(e, t) {
		ja(e, () => {
			B(k).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(B(k).footer);
		});
	}
	function Kl(e, t) {
		Gl(`edit:footer-brand-${e}`, (n) => {
			n.brand ??= {}, t.trim() ? n.brand[e] = t : delete n.brand[e], !n.brand.title && !n.brand.tagline && !n.brand.logo && delete n.brand;
		});
	}
	function ql(e) {
		Gl("footer", (t) => {
			t.brand ??= {}, e === "image" || e === "both" ? t.brand.mode = e : delete t.brand.mode;
		});
	}
	async function Jl(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await zr(t);
			Gl("footer", (t) => {
				t.brand ??= {}, t.brand.logo = e.dataUrl, t.brand.mode || (t.brand.mode = "both");
			});
		} catch {
			E(Z("status.imageReadErrorSvg"), "error");
		}
	}
	function Yl() {
		Gl("footer", (e) => {
			e.brand && (delete e.brand.logo, delete e.brand.mode, delete e.brand.logoHeight, !e.brand.title && !e.brand.tagline && delete e.brand);
		});
	}
	function Xl(e) {
		Gl("edit:footer-logo-height", (t) => {
			t.brand ??= {};
			let n = Number(e);
			Number.isFinite(n) && (t.brand.logoHeight = Math.min(160, Math.max(16, Math.round(n))));
		});
	}
	function Zl(e) {
		Gl("edit:footer-copyright", (t) => {
			e.trim() ? t.copyright = e : delete t.copyright;
		});
	}
	let $l = [
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
	function eu(e) {
		let t = Z("seed.orgName"), n = B(k).pages ?? [], r = (e) => n.slice(0, e).map((e) => ({
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
					version: bl.version ?? 1,
					props: {
						...bl.defaults(),
						color: "accent",
						x: .12,
						y: 0,
						radius: .6,
						opacity: .45
					}
				}, {
					type: "grain",
					version: Sl.version ?? 1,
					props: {
						...Sl.defaults(),
						opacity: .08
					}
				}]
			}
		};
	}
	function tu(e) {
		Gl("footer-template", (t) => {
			let n = eu(e);
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
	function nu(e) {
		Gl("footer", (t) => {
			t[e] ??= [], t[e].push(B(k).pages[0] ? {
				label: Z("seed.link"),
				page: B(k).pages[0].id
			} : {
				label: Z("seed.link"),
				href: "https://"
			});
		});
	}
	function iu(e, t) {
		Gl("footer", (n) => {
			n[e].splice(t, 1), n[e].length || delete n[e];
		});
	}
	function au(e, t, n) {
		Gl("footer", (r) => {
			let i = r[e], a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function ou(e, t, n) {
		Gl(`edit:footer-${e}-label-${t}`, (r) => {
			r[e][t].label = n;
		});
	}
	function su(e, t, n) {
		Gl("footer", (r) => {
			let i = r[e][t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function cu(e, t, n) {
		Gl(`edit:footer-${e}-href-${t}`, (r) => {
			r[e][t].href = n;
		});
	}
	function du(e) {
		Gl("footer", (t) => {
			e === "center" ? t.columnsAlign = "center" : delete t.columnsAlign;
		});
	}
	function fu(e) {
		Gl("footer", (t) => {
			e ? t.cta ??= {
				kind: "button",
				label: Z("seed.join")
			} : delete t.cta;
		});
	}
	function pu(e, t) {
		Gl(`edit:footer-cta-${e}`, (n) => {
			n.cta ??= {}, t === "" || t == null || t === !1 ? delete n.cta[e] : n.cta[e] = t;
		});
	}
	function Um(e) {
		Gl("footer", (t) => {
			t.cta ??= {}, e === "__href" ? (delete t.cta.page, t.cta.href = t.cta.href ?? "https://") : (t.cta.page = e, delete t.cta.href);
		});
	}
	function Wm(e, t) {
		Gl("footer", (n) => {
			let r = new Set(n.hideOn ?? []);
			t ? r.delete(e) : r.add(e), r.size ? n.hideOn = [...r] : delete n.hideOn;
		});
	}
	function Gm() {
		Gl("footer", (e) => {
			e.columns ??= [], e.columns.push({
				title: Z("seed.column"),
				links: [{
					label: Z("seed.link"),
					page: B(k).pages[0].id
				}]
			});
		});
	}
	function Km(e) {
		Gl("footer", (t) => {
			t.columns.splice(e, 1), t.columns.length || delete t.columns;
		});
	}
	function qm(e, t) {
		Gl("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.columns.length || ([n.columns[e], n.columns[r]] = [n.columns[r], n.columns[e]]);
		});
	}
	function Jm(e, t) {
		Gl(`edit:footer-col-title-${e}`, (n) => {
			n.columns[e].title = t;
		});
	}
	function Ym(e) {
		Gl("footer", (t) => {
			t.columns[e].links ??= [], t.columns[e].links.push({
				label: Z("seed.link"),
				page: B(k).pages[0].id
			});
		});
	}
	function Xm(e, t) {
		Gl("footer", (n) => {
			n.columns[e].links.splice(t, 1);
		});
	}
	function Zm(e, t, n) {
		Gl("footer", (r) => {
			let i = r.columns[e].links, a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function Qm(e, t, n) {
		Gl(`edit:footer-link-label-${e}-${t}`, (r) => {
			r.columns[e].links[t].label = n;
		});
	}
	function $m(e, t, n) {
		Gl("footer", (r) => {
			let i = r.columns[e].links[t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function eh(e, t, n) {
		Gl(`edit:footer-link-href-${e}-${t}`, (r) => {
			r.columns[e].links[t].href = n;
		});
	}
	function th() {
		Gl("footer", (e) => {
			e.social ??= [], e.social.push({
				icon: "facebook",
				url: "https://"
			});
		});
	}
	function nh(e) {
		Gl("footer", (t) => {
			t.social.splice(e, 1), t.social.length || delete t.social;
		});
	}
	function rh(e, t) {
		Gl("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.social.length || ([n.social[e], n.social[r]] = [n.social[r], n.social[e]]);
		});
	}
	function ih(e, t) {
		Gl("footer", (n) => {
			n.social[e].icon = t;
		});
	}
	function ah(e, t) {
		Gl(`edit:footer-social-url-${e}`, (n) => {
			n.social[e].url = t;
		});
	}
	let oh = Ua.filter(([e]) => e === "iconCat.social" || e === "iconCat.communication").flatMap(([, e]) => e.map((e) => [e, Z(Ha[e].labelKey)]));
	function sh(e, t) {
		ja(`edit:nav-label-${e}`, () => {
			B(k).nav.items[e].label = t;
		});
	}
	function ch(e, t) {
		ja("nav", () => {
			let n = B(k).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function lh(e, t) {
		ja(`edit:nav-href-${e}`, () => {
			B(k).nav.items[e].href = t;
		});
	}
	function uh(e, t) {
		let n = e + t, r = B(k).nav.items;
		n < 0 || n >= r.length || ja("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function dh(e) {
		ja("nav", () => {
			B(k).nav.items.splice(e, 1);
		});
	}
	let fh = /* @__PURE__ */ M(""), ph = /* @__PURE__ */ M(""), mh = /* @__PURE__ */ M(null);
	function hh(e) {
		let [t, n] = e.split(".").map(Number), r = B(k).nav.items;
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
	function gh(e, t, n, r) {
		if (!B(ph) || B(ph) === t) return null;
		let i = e.getBoundingClientRect(), a = (r - i.top) / i.height, o = n - i.left, s = hh(B(ph)), c = hh(t), l = s.list[s.index], u;
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
		}, _h(u, l, s);
	}
	function _h(e, t, n) {
		let r = hh(e.key);
		if (r.parent) {
			if (r.parent === t) return null;
			t.children?.length && (e = {
				key: e.key.split(".")[0],
				pos: "after"
			}, r = hh(e.key));
		}
		let i = r.list[r.index];
		if (e.pos === "into") {
			let n = i.children ?? [];
			return n.length && n[n.length - 1] === t ? null : e;
		}
		let a = r.parent ? r.parent.children : B(k).nav.items, o = a.filter((e) => e !== t).indexOf(i) + +(e.pos === "after");
		return a === n.list && o === n.index ? null : e;
	}
	function vh() {
		if (!B(ph)) return {
			label: "",
			target: ""
		};
		let e = hh(B(ph)), t = e.list[e.index], n = t.page ? B(k).pages.find((e) => e.id === t.page) : null;
		return {
			label: t.label,
			target: n ? n.title : t.href ?? Z("opt.noLink")
		};
	}
	function yh() {
		B(mh) && xh(B(mh).key), N(ph, ""), N(mh, null);
	}
	function bh(e) {
		if (!B(ph)) return;
		let t = [...e.currentTarget.querySelectorAll(".nav-item:not(.ghost)")];
		if (!t.length) return;
		let n = t.find((t) => {
			let n = t.getBoundingClientRect();
			return e.clientY >= n.top && e.clientY <= n.bottom;
		}), r = null;
		if (n) r = gh(n, n.dataset.key, e.clientX, e.clientY);
		else {
			let n = hh(B(ph)), i = n.list[n.index], a = t.find((t) => {
				let n = t.getBoundingClientRect();
				return n.top + n.height / 2 > e.clientY;
			});
			if (a) r = a.dataset.key === B(ph) ? null : _h({
				key: a.dataset.key,
				pos: "before"
			}, i, n);
			else {
				let e = [...t].reverse().find((e) => !e.classList.contains("child"));
				r = e.dataset.key === B(ph) ? null : _h({
					key: e.dataset.key,
					pos: "after"
				}, i, n);
			}
		}
		if (!r) {
			N(mh, null);
			return;
		}
		e.preventDefault(), (B(mh)?.key !== r.key || B(mh)?.pos !== r.pos) && N(mh, r, !0);
	}
	function xh(e) {
		let t = B(ph), n = B(mh);
		if (N(ph, ""), N(mh, null), !(!t || !n || n.key !== e || t === e)) {
			{
				let r = hh(t), i = hh(e), a = r.list[r.index];
				if (i.parent && (i.parent === a || a.children?.length) || n.pos === "into" && a.children?.length) return;
			}
			ja("nav", () => {
				let r = B(k).nav.items, i = hh(t), a = hh(e), o = i.list[i.index], s = a.list[a.index];
				if (o !== s) {
					if (i.list.splice(i.index, 1), i.parent && i.parent.children.length === 0 && delete i.parent.children, n.pos === "into") s.children ??= [], s.children.push(o);
					else {
						let e = a.parent ? a.parent.children : r, t = e.indexOf(s) + +(n.pos === "after");
						e.splice(t, 0, o);
					}
					!o.page && o.href == null && !o.children?.length && (o.page = B(k).pages[0].id);
				}
			}), N(fh, "");
		}
	}
	let Sh = "<svg width=\"10\" height=\"16\" viewBox=\"0 0 10 16\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"3\" cy=\"3\" r=\"1.3\"/><circle cx=\"7\" cy=\"3\" r=\"1.3\"/><circle cx=\"3\" cy=\"8\" r=\"1.3\"/><circle cx=\"7\" cy=\"8\" r=\"1.3\"/><circle cx=\"3\" cy=\"13\" r=\"1.3\"/><circle cx=\"7\" cy=\"13\" r=\"1.3\"/></svg>";
	function Ch() {
		ja("nav", () => {
			B(k).nav.items.push({
				label: Z("seed.link"),
				page: B(k).pages[0].id
			});
		});
	}
	function wh(e) {
		ja("nav", () => {
			let t = B(k).nav.items[e];
			t.children ??= [], t.children.push({
				label: Z("seed.link"),
				page: B(k).pages[0].id
			});
		});
	}
	function Th(e, t, n) {
		ja(`edit:nav-child-label-${e}-${t}`, () => {
			B(k).nav.items[e].children[t].label = n;
		});
	}
	function Eh(e, t, n) {
		ja("nav", () => {
			let r = B(k).nav.items[e].children[t];
			n === "__href" ? (delete r.page, r.href = r.href ?? "https://") : (r.page = n, delete r.href);
		});
	}
	function Dh(e, t, n) {
		ja(`edit:nav-child-href-${e}-${t}`, () => {
			B(k).nav.items[e].children[t].href = n;
		});
	}
	function Oh(e, t, n) {
		let r = t + n, i = B(k).nav.items[e].children;
		r < 0 || r >= i.length || ja("nav", () => {
			[i[t], i[r]] = [i[r], i[t]];
		});
	}
	function kh(e, t) {
		ja("nav", () => {
			let n = B(k).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = B(k).pages[0].id));
		});
	}
	function Ah(e, t) {
		ja(`edit:theme-color-${e}`, () => {
			B(k).theme.tokens.color[e] = t, B(k).theme.alt?.auto && (B(k).theme.alt.tokens.color = Wh());
		});
	}
	function jh(e, t) {
		return e === "accent-text" ? re(Qh(t.accent ?? "#000000", t)) : t.bg;
	}
	let Mh = /* @__PURE__ */ A(() => !B(k)?.theme?.tokens?.color?.["accent-text"] && !B(k)?.theme?.alt?.tokens?.color?.["accent-text"]), Nh = /* @__PURE__ */ M(null), Ph = /* @__PURE__ */ M(!1), Fh = /* @__PURE__ */ M(!1), Ih = (e) => e.length > 0 && [...e].every((e) => e.open);
	function Lh() {
		let e = B(Nh)?.querySelectorAll("details.group") ?? [];
		N(Ph, e.length > 0), N(Fh, Ih(e), !0);
	}
	xn(() => {
		B(Ft), pr().then(Lh);
	});
	function Rh() {
		let e = !B(Fh);
		B(Nh)?.querySelectorAll("details.group").forEach((t) => {
			t.open = e;
		}), Lh();
	}
	function zh(e) {
		for (let t of e.querySelectorAll("details.group")) {
			let e = t.querySelector(":scope > summary");
			if (!e || e.querySelector(".fold-sub")) continue;
			let n = () => t.querySelectorAll(":scope > .group-items details.group");
			if (!n().length) continue;
			let r = document.createElement("button");
			r.type = "button", r.className = "fold-sub fold-toggle", r.innerHTML = C.foldToggle;
			let i = () => {
				let e = Ih(n());
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
	xn(() => {
		let e = B(Nh);
		if (!e) return;
		let t = new MutationObserver(() => {
			zh(e), Lh();
		});
		return t.observe(e, {
			childList: !0,
			subtree: !0
		}), e.addEventListener("toggle", Lh, !0), zh(e), () => {
			t.disconnect(), e.removeEventListener("toggle", Lh, !0);
		};
	});
	function Bh(e) {
		ja("edit:theme-color-accent-text", () => {
			e ? (delete B(k).theme.tokens.color["accent-text"], B(k).theme.alt?.tokens?.color && delete B(k).theme.alt.tokens.color["accent-text"]) : (B(k).theme.tokens.color["accent-text"] = jh("accent-text", B(si)), B(k).theme.alt?.auto && (B(k).theme.alt.tokens.color = Wh()));
		});
	}
	function Vh(e, t) {
		ja("theme", () => {
			B(k).theme.tokens.font[e] = t;
		});
	}
	function Hh(e, t) {
		ja("theme", () => {
			B(k).theme.tokens.radius[e] = t;
		});
	}
	function Uh(e) {
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
	function Wh() {
		return Object.fromEntries(Object.entries(B(k).theme.tokens.color).map(([e, t]) => [e, Uh(t)]));
	}
	function Gh(e, t) {
		ja(`edit:theme-alt-${e}`, () => {
			B(k).theme.alt.tokens.color[e] = t, B(k).theme.alt.auto = !1;
		});
	}
	function Kh(e) {
		ja("theme", () => {
			e === "light" ? delete B(k).theme.scheme : B(k).theme.scheme = e;
		});
	}
	function qh(e) {
		ja("theme", () => {
			e ? B(k).theme.alt = {
				auto: !0,
				tokens: { color: Wh() }
			} : delete B(k).theme.alt;
		});
	}
	function Jh(e) {
		ja("theme", () => {
			B(k).theme.alt ??= { tokens: { color: Wh() } }, B(k).theme.alt.auto = e, e && (B(k).theme.alt.tokens.color = Wh());
		});
	}
	function Yh(e) {
		let t = B(k).theme.tokens.font[e];
		return [...hu.some(([, e]) => e === t) ? [] : [[t, Z("opt.customFont")]], ...hu.map(([e, t]) => [t, Z(e)])];
	}
	let Xh = (e) => parseInt(e, 10) || 0;
	function Zh(e, t) {
		Hh(e, `${t}px`);
	}
	let Qh = (e, t) => e && t && t[e] ? t[e] : e, $h = [
		"bg",
		"surface",
		"text",
		"accent",
		"accent-text"
	], eg = [
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
	function tg(e) {
		ja("theme", () => {
			let t = e.scheme === "dark", n = t ? e.dark : e.light, r = t ? e.light : e.dark;
			for (let e of $h) B(k).theme.tokens.color[e] = n[e];
			t ? B(k).theme.scheme = "dark" : delete B(k).theme.scheme, B(k).theme.alt = { tokens: { color: { ...r } } };
		});
	}
	let ng = /* @__PURE__ */ A(() => {
		if (!B(k)) return null;
		let e = B(k).theme.tokens.color, t = B(k).theme.alt?.tokens?.color ?? {}, n = B(k).theme.scheme === "dark";
		return eg.find((r) => {
			let i = n ? r.dark : r.light, a = n ? r.light : r.dark;
			return $h.every((n) => e[n] === i[n] && t[n] === a[n]);
		})?.id ?? null;
	}), rg = 0;
	async function ig() {
		B(me) && (rg = B(Nh)?.scrollTop ?? 0), N(me, !B(me)), Qe?.sendChrome(B(me)), B(me) && (await pr(), requestAnimationFrame(() => {
			B(Nh) && (B(Nh).scrollTop = rg);
		}));
	}
	function ag(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (ct(`edit:${e.blockId}`), n.props = e.props, O.save(), rt(), B(j)?.blockId === e.blockId && Yt(), e.rerender && Qe?.sendSection(B(T), t), N(oe, ""));
	}
	function og(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		ct(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && Je(t, "desktop-changed-after-mobile"), O.save(), rt(), B(j)?.blockId === e.blockId && Yt();
	}
	function sg(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		!t?.frames?.desktop || t.frames.desktop.h === e.h || (O.amendBaseline((t) => {
			let n = t.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
			n?.frames?.desktop && (n.frames.desktop.h = e.h);
		}), O.hasDraft() && ct(`edit:${e.blockId}`), t.frames.desktop.h = e.h, O.save(), rt(), B(j)?.blockId === e.blockId && Yt());
	}
	function cg(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			if (ct("mobile-reset"), e.blockId) {
				let n = t.blocks.find((t) => t.id === e.blockId);
				n && (n.frames.mobile = null);
			} else for (let e of t.blocks) e.frames.mobile = null;
			!qe(t) && t.responsive?.mobile && (t.responsive.mobile.attention = null), O.save(), rt(), Ue(), Qe?.sendSection(B(T), t);
		}
	}
	function lg(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		!n || typeof e.mobileOrder != "number" || (ct("mobile-order"), n.mobileOrder = e.mobileOrder, O.save(), rt(), Qe?.sendSection(B(T), t));
	}
	function ug(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (ct("review-done"), t.responsive.mobile.attention = null, O.save(), rt(), Ue());
	}
	function dg(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (ct("block-flag"), typeof e.decor == "boolean" && (n.decor = e.decor), typeof e.hideMobile == "boolean" && (n.hideMobile = e.hideMobile), O.save(), rt(), typeof e.hideMobile == "boolean" && B(Ee) === "mobile" && Qe?.sendSection(B(T), t), B(j)?.blockId === e.blockId && Yt());
	}
	function fg(e) {
		ct("add-section"), e.section.id || (e.section.id = Ps("sec")), O.data.sections.splice(e.index, 0, e.section), O.save(), rt(), Qe?.sendPage(B(T), O.data), N(Xn, e.section.id, !0), rr(e.section), N(Ft, "properties");
	}
	function pg(e) {
		let t = O.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (ct("move-section"), [t[n], t[r]] = [t[r], t[n]], O.save(), rt(), Qe?.sendPage(B(T), O.data));
	}
	function mg(e) {
		ct("delete-section"), e.sectionId === B(Xn) && (N(Xn, null), N(Zn, null)), B(j)?.sectionId === e.sectionId && N(j, null), O.data.sections = O.data.sections.filter((t) => t.id !== e.sectionId), O.save(), rt(), Qe?.sendPage(B(T), O.data);
	}
	function hg(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			ct("section-size"), t.size = {
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
			e.moves?.length && (Je(t, "section-height"), B(j)?.sectionId === e.sectionId && Yt()), e.sectionId === B(Xn) && N(Qn, e.minHeight, !0), O.save(), rt();
		}
	}
	function gg(e) {
		let t = O.data.sections.find((t) => t.id === e.fromSectionId), n = O.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		!t || !n || !r || (ct("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), Je(t, "block-moved"), Je(n, "block-moved"), O.save(), rt(), Ue(), Qe?.sendSection(B(T), t), Qe?.sendSection(B(T), n), B(j)?.blockId === e.blockId && (N(j, {
			...B(j),
			sectionId: e.toSectionId
		}, !0), Yt()));
	}
	function _g(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		if (!t) return;
		let n = e.blockIds ?? [e.blockId];
		ct("delete-block"), t.blocks = t.blocks.filter((e) => !n.includes(e.id)), n.includes(B(j)?.blockId) && N(j, null), Je(t, "block-deleted"), O.save(), rt(), Qe?.sendSection(B(T), t);
	}
	let vg = {
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
				fields: gs()
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
		ribbon: {
			type: "ribbon",
			props: {
				items: [
					Z("seed.ribbonBlock.a"),
					Z("seed.ribbonBlock.b"),
					Z("seed.ribbonBlock.c")
				],
				sep: "dot",
				speed: 60,
				direction: "left",
				pauseOnHover: !0,
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
	function yg(e) {
		let t = vg[e];
		return t ? {
			id: Ps("blk"),
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
	function bg(e) {
		Qe ? Qe.sendPlaceBlock(e) : xg(Ei()?.id, e);
	}
	function xg(e, t) {
		let n = O.data.sections.find((t) => t.id === e) ?? O.data.sections[0];
		if (!n) return;
		ct("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), Je(n, "block-added"), O.save(), rt(), Qe?.sendSection(B(T), n);
	}
	function Sg(e, t, n, r) {
		let i = O.data.sections.find((t) => t.id === e);
		if (!i || !t?.length) return;
		ct("add-blocks");
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
		}), Je(i, "block-added"), O.save(), rt(), Qe?.sendSection(B(T), i);
	}
	function Cg(e) {
		bg(yg(e));
	}
	let wg = /* @__PURE__ */ M(tn([])), Tg = { map: [
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
	function Eg(e, t = {}) {
		let n = Ke(e);
		bg({
			id: Ps("blk"),
			type: n.type,
			version: n.version ?? 1,
			decor: !1,
			props: {
				...n.defaults ?? {},
				...Ke(t)
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
	let Dg = /* @__PURE__ */ M("");
	function Og() {
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
				label: Z("blocks.ribbon"),
				act: "block",
				kind: "ribbon"
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
		for (let t of B(Tc)) {
			let n = vc[t]?.data?.mal;
			n?.kind === "blocks" && e.push({
				label: n.name,
				act: "template",
				id: t
			});
		}
		for (let t of B(wg)) if (t.variants?.length) for (let n of t.variants) e.push({
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
	function kg(e) {
		e.act === "block" ? Cg(e.kind) : e.act === "plugin" ? Eg(e.entry, e.props ?? {}) : e.act === "template" && Qe?.sendInsertTemplate(e.id);
	}
	function Ag(e) {
		let t = yg(e.kind);
		if (t) {
			if (e.at && typeof e.at.x == "number" && typeof e.at.y == "number") {
				let n = O.data.sections.find((t) => t.id === e.sectionId)?.grid ?? B(k).grid, r = gu({
					x: e.at.x,
					y: e.at.y,
					w: t.frames.desktop.w,
					h: t.frames.desktop.h,
					grid: n
				});
				t.frames.desktop.x = r.x, t.frames.desktop.y = r.y;
			} else t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40;
			xg(e.sectionId, t), Qe?.sendSelect(t.id), e.kind === "image" && E(Z("status.imageBlockAdded")), e.kind === "gallery" && E(Z("status.galleryBlockAdded"));
		}
	}
	async function jg(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		E(Z("status.compressingImage"));
		let n;
		try {
			n = await zr(t);
		} catch {
			E(Z("status.imageReadError"), "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (B(de)?.clientWidth ?? 1280));
		bg({
			id: Ps("blk"),
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: Oa(t.name).replaceAll("-", " "),
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
	async function Mg(e) {
		let t = [], n = 0, r = 0;
		for (let i of e) try {
			let e = await zr(i);
			e.bytes > 4e5 && (r += 1), t.push({
				src: e.dataUrl,
				alt: Oa(i.name).replaceAll("-", " "),
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
	function Ng(e, t, n) {
		t ? E(Z("status.imagesReadFailed", { n: t }), "error") : n ? E(Z("status.imagesLarge", { n }), "error") : E(e ? "" : Z("status.noImagesAdded"));
	}
	async function Pg(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		E(Z("status.compressingImages"));
		let { images: n, failed: r, big: i } = await Mg(t);
		n.length && an("gallery-add", (e) => {
			e.props.images.push(...n);
		}), Ng(n.length, r, i);
	}
	async function Fg(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		E(Z("status.compressingImages"));
		let { images: n, failed: r, big: i } = await Mg(t);
		if (!n.length) {
			Ng(0, r, i);
			return;
		}
		let a = yg("gallery");
		a.props.images = n, bg(a), Ng(n.length, r, i);
	}
	function Ig(e, t) {
		an("gallery-move", (n) => {
			let r = e + t;
			r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
		});
	}
	function Lg(e) {
		an("gallery-remove", (t) => {
			t.props.images.splice(e, 1);
		});
	}
	function Rg(e, t, n) {
		an(`edit:${B(j).blockId}:img${e}-${t}`, (r) => {
			r.props.images[e][t] = n;
		});
	}
	function zg(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/") && !i?.startsWith("data:audio/") && !i?.startsWith("data:video/")) return;
		let a = i.split(",", 2)[1], o = `media/${Oa(n || "image")}-${ka(a)}.${Da(i)}`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function Bg(e, t) {
		zg(e, "image", e.title, t);
		for (let n of e.colors ?? []) zg(n, "image", `${e.title}-${n.name}`, t);
	}
	function Vg(e, t) {
		for (let n of e?.layers ?? []) {
			if (n.type === "image" && zg(n.props, "src", "background", t), n.type === "slideshow") for (let e of n.props.images ?? []) zg(e, "src", "background", t);
			n.type === "video" && (zg(n.props, "src", "video", t), zg(n.props, "poster", "plakat", t));
		}
	}
	function Hg(e, t) {
		if (e.type === "image" && zg(e.props, "src", e.props.alt, t), e.type === "icon" && zg(e.props, "image", "ikon", t), e.type === "gallery") for (let n of e.props.images ?? []) zg(n, "src", n.alt || "gallery", t);
		e.type === "audio" && zg(e.props, "src", e.props.title || "lyd", t);
	}
	function Ug(e, t) {
		Vg(e.background, t);
		for (let n of e.blocks) Hg(n, t);
	}
	function Wg(e) {
		let t = [];
		e.meta?.og && zg(e.meta.og, "image", "share", t);
		for (let n of e.sections) Ug(n, t);
		return t;
	}
	function Gg(e) {
		let t = [], n = e.nav?.logo;
		if (n?.type === "image" && zg(n, "value", "logo", t), n?.type === "both" && zg(n, "image", "logo", t), e.nav?.style && zg(e.nav.style, "image", "menu", t), Vg(e.nav?.style?.background, t), Vg(e.footer?.background, t), e.footer?.brand && zg(e.footer.brand, "logo", "footer-logo", t), e.nav?.launcher) {
			zg(e.nav.launcher, "image", "snarvei", t);
			for (let n of e.nav.launcher.links ?? []) zg(n, "image", "snarvei", t);
		}
		return zg(e.site, "icon", "ikon", t), t;
	}
	let Kg = /* @__PURE__ */ M(!1), qg = /* @__PURE__ */ M(null);
	function Jg() {
		N(Kg, !B(Kg));
	}
	function Yg() {
		N(Kg, !1);
		try {
			Xg(), E(Z("ui.discarded"), "info");
		} catch (e) {
			console.error("Urd: discard failed", e), E(String(e?.message ?? e), "error");
		}
	}
	xn(() => {
		if (!B(Kg)) return;
		let e = (e) => {
			if (!B(qg)?.contains(e.target)) {
				N(Kg, !1);
				return;
			}
			e.target instanceof Element && e.target.closest(".discard-confirm") && (e.preventDefault(), e.stopPropagation(), Yg());
		}, t = (e) => {
			e.key === "Escape" && N(Kg, !1);
		}, n = !1, r = (e) => {
			n = !!B(qg)?.contains(e.target);
		}, i = () => {
			n = !1;
		}, a = () => {
			n || N(Kg, !1);
		};
		return window.addEventListener("pointerdown", r, !0), window.addEventListener("pointerup", i, !0), window.addEventListener("click", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", a), () => {
			window.removeEventListener("pointerdown", r, !0), window.removeEventListener("pointerup", i, !0), window.removeEventListener("click", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", a);
		};
	});
	function Xg() {
		ct("discard");
		for (let e of B(k).pages) e.id !== B(T) && !tt.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = O.reset();
		if (Ze.reset(), hl && (hl.reset(), Ml()), nc) {
			nc.reset(), N(oc, [...nc.data.samlinger ?? []], !0);
			for (let e of Object.keys(rc)) B(oc).includes(e) ? rc[e].reset() : delete rc[e];
			Pc();
		}
		if (gc) {
			gc.reset(), N(Tc, [...gc.data.maler ?? []], !0);
			for (let e of Object.keys(vc)) B(Tc).includes(e) ? vc[e].reset() : (localStorage.removeItem(`urd-draft-template-${e}`), localStorage.removeItem(`urd-draft-mal-${e}`), delete vc[e]);
			Dc();
		}
		$e(), N(pe, {
			snap: !0,
			...B(k).grid
		}, !0), rt(), N(oe, ""), et(), B(k).pages.some((e) => e.id === B(T)) ? Qe?.sendPage(B(T), e) : oa(B(k).pages[0].id);
	}
	async function Zg() {
		if (Vi) {
			E(Z("status.revertReloadBeforePublish"), "error");
			return;
		}
		if (B(Xi)) {
			E(Z("update.publishBlocked"), "error");
			return;
		}
		E(Z("status.publishing"));
		let e = [], t = [], n = [], r = [];
		for (let i of B(k).pages) {
			let a = `urd-draft-${i.id}`, o = tt.has(i.id) || !B(ie).pages.some((e) => e.id === i.id), s = null;
			if (i.id === B(T) && (O.hasDraft() || o)) s = O.data;
			else if (i.id !== B(T)) {
				let e = localStorage.getItem(a);
				if (e) try {
					s = Os(JSON.parse(e), Ze.data);
				} catch {}
			}
			if (!s && o && (s = aa(i)), !s) continue;
			let c = JSON.parse(JSON.stringify(s));
			e.push(...Wg(c)), e.push({
				path: i.file,
				content: JSON.stringify(c, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (Ze.hasDraft()) {
			let r = JSON.parse(JSON.stringify(B(k)));
			e.push(...Gg(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), e.push({
				path: "content/theme.css",
				content: el(r.theme),
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(B(ie).theme, B(k).theme) || t.push(Z("publish.part.theme")), i(B(ie).nav, B(k).nav) || t.push(Z("publish.part.nav")), i(B(ie).footer, B(k).footer) || t.push(Z("publish.part.footer")), i(B(ie).pages, B(k).pages) || t.push(Z("publish.part.pages")), i(B(ie).grid, B(k).grid) || t.push(Z("publish.part.grid")), (B(ie).site.icon ?? null) !== (B(k).site.icon ?? null) && t.push(Z("publish.part.icon"));
			let { icon: a, ...o } = B(ie).site, { icon: s, ...c } = B(k).site;
			i(o, c) || t.push(Z("publish.part.siteInfo"));
		}
		let i = Object.entries(rc).filter(([, e]) => e.hasDraft());
		if (i.length || nc?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) Bg(t, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), xc.includes(i.kind) && e.push({
					path: `content/samlinger/${t}.xml`,
					content: Sc({
						title: i.name ?? t,
						origin: location.origin,
						path: `/content/samlinger/${t}.xml`,
						items: i.entries.map((e) => ({
							id: e.id,
							title: Rc(e.title),
							text: Rc(e.text),
							date: e.date,
							href: e.href
						}))
					}),
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (nc?.hasDraft()) {
				e.push({
					path: "content/collections.json",
					content: JSON.stringify(nc.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-collections", "urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/collections.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!B(oc).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push(Z("publish.part.collections"));
		}
		let a = Object.entries(vc).filter(([, e]) => e.hasDraft());
		if (a.length || gc?.hasDraft()) {
			for (let [t, r] of a) {
				let i = JSON.parse(JSON.stringify(r.data));
				i.section && Ug(i.section, e);
				for (let t of i.blocks ?? []) Hg(t, e);
				for (let t of i.page?.sections ?? []) Ug(t, e);
				e.push({
					path: `content/maler/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-mal-${t}`);
			}
			if (gc?.hasDraft()) {
				e.push({
					path: "content/maler.json",
					content: JSON.stringify(gc.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-templates", "urd-draft-maler");
				let t = { maler: [] };
				try {
					t = await (await fetch("/content/maler.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.maler ?? []) {
					let t = `content/maler/${n}.json`;
					!B(Tc).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push(Z("publish.part.templates"));
		}
		hl?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(hl.data, null, 2) + "\n",
			encoding: "utf-8"
		}), n.push("urd-draft-plugins"), t.push(Z("publish.part.plugins")));
		try {
			let t = await (await fetch("/index.html")).text();
			for (let n of B(k).pages) n.path !== "/" && e.push({
				path: `${n.path.slice(1)}/index.html`,
				content: t,
				encoding: "utf-8"
			});
		} catch {}
		e.push({
			path: "sitemap.xml",
			content: yc(B(k).pages, location.origin),
			encoding: "utf-8"
		}), e.push({
			path: "robots.txt",
			content: bc(location.origin),
			encoding: "utf-8"
		});
		let o = new Set(e.map((e) => e.path)), s = (t) => {
			o.has(t) || e.push({
				path: t,
				delete: !0
			});
		};
		for (let e of B(ie).pages) {
			let t = B(k).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && s(`${e.path.slice(1)}/index.html`) : (s(e.file), e.path !== "/" && s(`${e.path.slice(1)}/index.html`));
		}
		let c = await Fi(e);
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
			t ? Ni = t : Pi(), Wg(O.data), Gg(B(k));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) tt.add(e);
			if (N(ie, JSON.parse(JSON.stringify(B(k))), !0), Ze = Qi("urd-draft-site", () => B(ie), le), $e(), hl) {
				let e = JSON.parse(JSON.stringify(hl.data));
				hl = Qi("urd-draft-plugins", () => e, le), Ml();
			}
			if (nc) {
				for (let e of Object.values(rc)) for (let t of e.data.entries) Bg(t, []);
				let e = JSON.parse(JSON.stringify(nc.data));
				nc = Qi("urd-draft-collections", () => e, le, "urd-draft-samlinger"), ic = {};
				for (let e of B(oc)) {
					if (!rc[e]) continue;
					let t = JSON.parse(JSON.stringify(rc[e].data));
					ic[e] = t, rc[e] = Qi(`urd-draft-collection-${e}`, () => t, le, `urd-draft-samling-${e}`);
				}
				Pc();
			}
			if (gc) {
				for (let e of Object.values(vc)) {
					e.data?.section && Ug(e.data.section, []);
					for (let t of e.data?.blocks ?? []) Hg(t, []);
					for (let t of e.data?.page?.sections ?? []) Ug(t, []);
				}
				let e = JSON.parse(JSON.stringify(gc.data));
				gc = Qi("urd-draft-templates", () => e, le, "urd-draft-maler"), Cc = {};
				for (let e of B(Tc)) {
					if (!vc[e]) continue;
					let t = JSON.parse(JSON.stringify(vc[e].data));
					Cc[e] = t, vc[e] = Qi(`urd-draft-template-${e}`, () => t, le, `urd-draft-mal-${e}`);
				}
				Dc();
			}
			N(pe, {
				snap: !0,
				...B(k).grid
			}, !0);
			let i = JSON.parse(JSON.stringify(O.data));
			O = Qi(`urd-draft-${B(T)}`, () => i, le), tt.has(B(T)) && ue(`urd-draft-${B(T)}`, JSON.stringify(i)), rt(), E(Z("status.published"), "info"), qi(e);
		} else if (u?.status === 401) {
			let e = await u.json().catch(() => null);
			E(e?.code === "loginExpired" ? Z("status.loginExpired") : Z("status.loginRequired", { reason: Wi(e) ?? Z("status.unknownReason") }), "error"), await Mi();
		} else u?.status === 403 ? E(Wi(await u.json().catch(() => null)) ?? Z("status.noPublishAccess"), "error") : u?.status === 409 ? E(Z("status.publishRace"), "error") : E(u ? Wi(await u.json().catch(() => null)) ?? Z("status.publishFailed") : Z("status.publishUnavailable"), "error");
	}
	yt();
	var Qg = Hm();
	wr("keydown", nn, vt), wr("pointerdown", nn, _t);
	var $g = I(Qg), e_ = F($g), t_ = (e) => {
		var t = rf(), n = F(t);
		K(n, () => C.pencil);
		var r = R(n);
		D(t), z((e, n) => {
			X(t, "title", e), W(r, ` ${n ?? ""}`);
		}, [() => Z("tip.backToEdit"), () => Z("ui.edit")]), V("click", t, ig), U(e, t);
	};
	G(e_, (e) => {
		B(me) || e(t_);
	});
	var n_ = R(e_, 2);
	let r_;
	var i_ = F(n_), a_ = F(i_), o_ = (e) => {
		var t = hf(), n = I(t), r = L(n, !0), i = R(n, 2), a = F(i), o = (e) => {
			var t = sf(), n = F(t);
			let r;
			var i = F(n);
			K(i, () => C[`device_${B(we)}`]), K(R(i), () => C.caret), D(n);
			var a = R(n, 2), o = (e) => {
				var t = of();
				Yr(t, 21, () => B(Se), (e) => e.id, (e, t) => {
					var n = af();
					let r;
					var i = F(n);
					K(i, () => C[`device_${B(t).id}`]);
					var a = R(i);
					D(n), z((e, i) => {
						r = q(n, 1, "ghost svelte-1n46o8q", null, r, { active: B(we) === B(t).id }), X(n, "title", e), W(a, ` ${i ?? ""}`);
					}, [() => Ce(B(t)), () => Z(`lbl.device.${B(t).id}`)]), V("click", n, () => {
						N(we, B(t).id, !0), N(ha, null);
					}), U(e, n);
				}), D(t), U(e, t);
			};
			G(a, (e) => {
				B(ha) === "device" && e(o);
			}), D(t), z((e) => {
				r = q(n, 1, "ghost svelte-1n46o8q", null, r, { active: B(ha) === "device" }), X(n, "title", e);
			}, [() => Z("lbl.group.device")]), V("click", n, () => N(ha, B(ha) === "device" ? null : "device", !0)), U(e, t);
		}, s = (e) => {
			var t = lf(), n = I(t), r = L(n, !0), i = R(n, 2);
			Yr(i, 21, () => B(Se), (e) => e.id, (e, t) => {
				var n = cf();
				let r;
				K(n, () => C[`device_${B(t).id}`], !0), D(n), z((e) => {
					r = q(n, 1, "ghost svelte-1n46o8q", null, r, { active: B(we) === B(t).id }), X(n, "title", e);
				}, [() => Ce(B(t))]), V("click", n, () => N(we, B(t).id, !0)), U(e, n);
			}), D(i), z((e) => W(r, e), [() => Z("lbl.group.device")]), U(e, t);
		};
		G(a, (e) => {
			va.device ? e(o) : e(s, -1);
		});
		var c = R(a, 2), l = (e) => {
			var t = df(), n = F(t);
			let r;
			var i = F(n), a = L(i);
			K(R(i), () => C.caret), D(n);
			var o = R(n, 2), s = (e) => {
				var t = uf(), n = F(t), r = F(n);
				K(r, () => C.minus, !0), D(r);
				var i = R(r, 2), a = L(i), o = R(i, 2);
				K(o, () => C.plus, !0), D(o), D(n);
				var s = R(n, 2);
				let c;
				var l = F(s);
				K(l, () => C.fit);
				var u = R(l);
				D(s), D(t), z((e, t, n, l, d, f) => {
					X(r, "title", e), X(i, "title", t), W(a, `${n ?? ""}%`), X(o, "title", l), c = q(s, 1, "ghost svelte-1n46o8q", null, c, { active: B(je) === "fit" }), X(s, "title", d), W(u, ` ${f ?? ""}`);
				}, [
					() => Z("tip.zoomOut"),
					() => Z("tip.zoomCurrent"),
					() => Math.round(B(Ie) * 100),
					() => Z("tip.zoomIn"),
					() => Z("tip.zoomFit"),
					() => Z("lbl.zoom.fit")
				]), V("click", r, () => Le(-1)), V("click", o, () => Le(1)), V("click", s, () => N(je, "fit")), U(e, t);
			};
			G(o, (e) => {
				B(ha) === "zoom" && e(s);
			}), D(t), z((e, t) => {
				r = q(n, 1, "ghost svelte-1n46o8q", null, r, { active: B(ha) === "zoom" }), X(n, "title", e), W(a, `${t ?? ""}%`);
			}, [() => Z("lbl.group.zoom"), () => Math.round(B(Ie) * 100)]), V("click", n, () => N(ha, B(ha) === "zoom" ? null : "zoom", !0)), U(e, t);
		}, u = (e) => {
			var t = ff(), n = I(t), r = L(n, !0), i = R(n, 2), a = F(i);
			K(a, () => C.minus, !0), D(a);
			var o = R(a, 2), s = L(o), c = R(o, 2);
			K(c, () => C.plus, !0), D(c);
			var l = R(c, 2);
			let u;
			K(l, () => C.fit, !0), D(l), D(i), z((e, t, n, i, d, f) => {
				W(r, e), X(a, "title", t), X(o, "title", n), W(s, `${i ?? ""}%`), X(c, "title", d), u = q(l, 1, "ghost svelte-1n46o8q", null, u, { active: B(je) === "fit" }), X(l, "title", f);
			}, [
				() => Z("lbl.group.zoom"),
				() => Z("tip.zoomOut"),
				() => Z("tip.zoomCurrent"),
				() => Math.round(B(Ie) * 100),
				() => Z("tip.zoomIn"),
				() => Z("tip.zoomFit")
			]), V("click", a, () => Le(-1)), V("click", c, () => Le(1)), V("click", l, () => N(je, "fit")), U(e, t);
		};
		G(c, (e) => {
			va.zoom ? e(l) : e(u, -1);
		});
		var d = R(c, 2), f = (e) => {
			var t = sf(), n = F(t);
			let r;
			var i = F(n);
			K(i, () => C.gridToggle), K(R(i), () => C.caret), D(n);
			var a = R(n, 2), o = (e) => {
				var t = pf(), n = F(t);
				let r;
				var i = F(n);
				K(i, () => C.gridToggle);
				var a = R(i);
				D(n);
				var o = R(n, 2);
				let s;
				var c = F(o);
				K(c, () => C.guides);
				var l = R(c);
				D(o), D(t), z((e, t, i, c) => {
					r = q(n, 1, "ghost svelte-1n46o8q", null, r, { active: B(Sa) }), X(n, "title", e), W(a, ` ${t ?? ""}`), s = q(o, 1, "ghost svelte-1n46o8q", null, s, { active: B(la) }), X(o, "title", i), W(l, ` ${c ?? ""}`);
				}, [
					() => Z("tip.gridToggle"),
					() => Z("lbl.view.grid"),
					() => Z("tip.guides"),
					() => Z("lbl.view.guides")
				]), V("click", n, Ca), V("click", o, ya), U(e, t);
			};
			G(a, (e) => {
				B(ha) === "view" && e(o);
			}), D(t), z((e) => {
				r = q(n, 1, "ghost svelte-1n46o8q", null, r, { active: B(ha) === "view" || B(Sa) || B(la) }), X(n, "title", e);
			}, [() => Z("lbl.group.view")]), V("click", n, () => N(ha, B(ha) === "view" ? null : "view", !0)), U(e, t);
		}, p = (e) => {
			var t = mf(), n = I(t), r = L(n, !0), i = R(n, 2), a = F(i);
			let o;
			K(a, () => C.gridToggle, !0), D(a);
			var s = R(a, 2);
			let c;
			K(s, () => C.guides, !0), D(s), D(i), z((e, t, n) => {
				W(r, e), o = q(a, 1, "ghost svelte-1n46o8q", null, o, { active: B(Sa) }), X(a, "title", t), c = q(s, 1, "ghost svelte-1n46o8q", null, c, { active: B(la) }), X(s, "title", n);
			}, [
				() => Z("lbl.group.view"),
				() => Z("tip.gridToggle"),
				() => Z("tip.guides")
			]), V("click", a, Ca), V("click", s, ya), U(e, t);
		};
		G(d, (e) => {
			va.view ? e(f) : e(p, -1);
		}), D(i), ji(i, (e) => N(_a, e), () => B(_a)), z((e, t) => {
			X(n, "title", e), W(r, t);
		}, [() => Z("tip.switchPage"), () => nt()?.title ?? ""]), V("click", n, () => qt("pages")), U(e, t);
	};
	G(a_, (e) => {
		B(ie) && e(o_);
	});
	var s_ = R(a_, 2), c_ = (e) => {
		var t = gf(), n = F(t);
		K(n, () => C.phone);
		var r = R(n, 2), i = L(r, !0), a = L(R(r, 2), !0);
		D(t), z((e, n) => {
			X(t, "title", e), W(i, n), W(a, B(He));
		}, [() => Z("tip.attention"), () => Z(B(He) === 1 ? "ui.attentionOne" : "ui.attentionMany", { n: B(He) })]), V("click", t, We), U(e, t);
	};
	G(s_, (e) => {
		B(He) > 0 && e(c_);
	}), D(i_);
	var l_ = R(i_, 2), u_ = F(l_), d_ = (e) => {
		var t = vf(), n = F(t), r = L(F(n), !0);
		Oe(2), D(n);
		var i = R(n, 2), a = F(i);
		let o;
		var s = F(a);
		K(s, () => C.restore);
		var c = L(R(s), !0);
		D(a);
		var l = R(a, 2), u = (e) => {
			var t = _f(), n = F(t);
			K(n, () => C.restore);
			var r = R(n);
			D(t), z((e, n) => {
				X(t, "title", e), W(r, ` ${n ?? ""}`);
			}, [() => Z("tip.discardArmed"), () => Z("ui.discardConfirm")]), V("click", t, Yg), U(e, t);
		};
		G(l, (e) => {
			B(Kg) && e(u);
		}), D(i), ji(i, (e) => N(qg, e), () => B(qg)), D(t), z((e, t, i, s, l) => {
			X(n, "title", e), X(n, "aria-label", t), W(r, i), o = q(a, 1, "discard-dot svelte-1n46o8q", null, o, { armed: B(Kg) }), X(a, "title", s), W(c, l);
		}, [
			() => Z("ui.unpublished"),
			() => Z("ui.unpublished"),
			() => Z("ui.unpublished"),
			() => B(Kg) ? Z("tip.discardArmed") : Z("tip.discard"),
			() => Z("ui.discard")
		]), V("click", a, Jg), ui(2, t, () => Zi, () => ({
			x: 24,
			duration: Qt ? 0 : 150
		})), U(e, t);
	};
	G(u_, (e) => {
		B(ae) && e(d_);
	}), D(l_);
	var f_ = R(l_, 2), p_ = F(f_), m_ = (e) => {
		var t = Sf(), n = I(t), r = F(n), i = (e) => {
			var t = yf(), n = I(t);
			K(n, () => C.eye);
			var r = L(R(n, 2), !0);
			z((e) => W(r, e), [() => Z("ui.cleanView")]), U(e, t);
		}, a = (e) => {
			var t = yf(), n = I(t);
			K(n, () => C.pencil);
			var r = L(R(n, 2), !0);
			z((e) => W(r, e), [() => Z("ui.edit")]), U(e, t);
		};
		G(r, (e) => {
			B(me) ? e(i) : e(a, -1);
		}), D(n);
		var o = R(n, 2), s = (e) => {
			var t = bf(), n = F(t), r = (e) => {
				var t = Pr();
				K(I(t), () => C.warn), U(e, t);
			};
			G(n, (e) => {
				B(fe).allowed || e(r);
			});
			var i = R(n, 1, !0);
			D(t), z((e) => {
				X(t, "title", e), W(i, B(fe).login);
			}, [() => B(fe).allowed ? Z("tip.hasPublishAccess") : Z("tip.noPublishAccess")]), U(e, t);
		}, c = (e) => {
			var t = xf(), n = L(t, !0);
			z((e) => W(n, e), [() => Z("ui.loginGitHub")]), U(e, t);
		};
		G(o, (e) => {
			B(fe)?.loggedIn ? e(s) : B(fe) && e(c, 1);
		});
		var l = R(o, 2), u = F(l);
		K(u, () => C.external);
		var d = L(R(u, 2), !0);
		D(l);
		var f = R(l, 2), p = L(f, !0);
		z((e, t, r, i, a) => {
			X(n, "title", e), X(l, "href", t), X(l, "title", r), W(d, i), f.disabled = !B(ae), W(p, a);
		}, [
			() => B(me) ? Z("tip.chromeHide") : Z("tip.chromeShow"),
			() => nt()?.path ?? "/",
			() => Z("ui.viewSite"),
			() => Z("ui.viewSite"),
			() => Z("ui.publish")
		]), V("click", n, ig), V("click", f, Zg), U(e, t);
	};
	G(p_, (e) => {
		B(ie) && e(m_);
	}), D(f_), D(n_);
	var h_ = R(n_, 2), g_ = (e) => {
		var t = Fm(), i = F(t);
		let o;
		var l = F(i);
		Yr(l, 17, () => It, Gr, (e, t, n) => {
			var r = wf(), i = I(r), a = L(i, !0);
			Yr(R(i, 2), 16, () => B(t), (e) => e, (e, t) => {
				var n = Cf();
				let r;
				var i = L(n, !0);
				z(() => {
					r = q(n, 1, "svelte-1n46o8q", null, r, { active: B(Ft) === t }), W(i, Rt[t]);
				}), V("click", n, () => qt(t)), U(e, n);
			}), z((e) => W(a, e), [() => Z(Lt[n])]), U(e, r);
		});
		var p = R(l, 2), m = R(F(p), 2);
		let g;
		K(m, () => C.gear, !0), D(m);
		var _ = R(m, 2), v = (e) => {
			var t = Df(), n = F(t), r = L(n, !0), i = R(n, 2), a = F(i);
			Q(R(a), {
				get value() {
					return B(te);
				},
				get options() {
					return w;
				},
				onchange: (e) => N(te, e, !0)
			}), D(i);
			var o = R(i, 2), s = F(o), c = R(s);
			{
				let e = /* @__PURE__ */ A(() => [["auto", Z("lang.auto")], ...Ut()]);
				Q(c, {
					get value() {
						return Gt;
					},
					get options() {
						return B(e);
					},
					onchange: Kt
				});
			}
			D(o);
			var l = R(o, 2), u = F(l), d = R(u);
			{
				let e = /* @__PURE__ */ A(() => [["strip", Z("settings.layoutPickerStrip")], ["menu", Z("settings.layoutPickerMenu")]]);
				Q(d, {
					get value() {
						return B(da);
					},
					get options() {
						return B(e);
					},
					onchange: fa
				});
			}
			D(l);
			var f = R(l, 2), p = F(f), m = R(p);
			{
				let e = /* @__PURE__ */ A(() => [["remember", Z("settings.panelsRemember")], ["reset", Z("settings.panelsReset")]]);
				Q(m, {
					get value() {
						return B(Nt);
					},
					get options() {
						return B(e);
					},
					onchange: Pt
				});
			}
			D(f);
			var h = R(f, 2), g = L(h, !0), _ = R(h, 2), v = F(_);
			let y;
			var b = L(v, !0), x = R(v, 2);
			let S;
			var C = L(x, !0);
			D(_);
			var ee = R(_, 2), ne = (e) => {
				var t = Tf(), n = F(t), r = L(n, !0), i = R(n, 2);
				J(i);
				var a = R(i, 2), o = L(a, !0), s = R(a, 2);
				J(s), D(t), z((e, t, n, a) => {
					W(r, e), X(i, "min", 640), X(i, "max", wo), X(i, "title", t), Y(i, B(ve).width), W(o, n), X(s, "max", To), X(s, "title", a), Y(s, B(ve).height || "");
				}, [
					() => Z("lbl.screen.w"),
					() => Z("tip.screen.width", {
						min: 640,
						max: wo
					}),
					() => Z("lbl.screen.h"),
					() => Z("tip.screen.height", {
						min: 480,
						max: To
					})
				]), V("change", i, (e) => {
					ye({ width: Number(e.target.value) }), e.target.value = B(ve).width;
				}), V("change", s, (e) => {
					ye({ height: Number(e.target.value) }), e.target.value = B(ve).height || "";
				}), U(e, t);
			};
			G(ee, (e) => {
				B(ve).mode === "custom" && e(ne);
			});
			var re = R(ee, 2), ie = (e) => {
				var t = Ef(), n = I(t), r = L(n, !0), i = R(n, 2), a = F(i), o = R(a);
				J(o), D(i), z((e, t, s, c, l) => {
					X(n, "title", e), W(r, t), X(i, "title", s), W(a, `${c ?? ""} `), X(o, "placeholder", l), Y(o, B(k).analytics?.token ?? "");
				}, [
					() => Z("tip.analytics"),
					() => Z("settings.analytics"),
					() => Z("tip.analytics"),
					() => Z("lbl.analyticsToken"),
					() => Z("ph.analyticsToken")
				]), V("change", o, (e) => po(e.target.value)), U(e, t);
			};
			G(re, (e) => {
				B(k) && e(ie);
			}), D(t), z((e, t, n, c, d, m, w, ee, te, ne, re, ie, T, ae) => {
				W(r, e), X(i, "title", t), W(a, `${n ?? ""} `), X(o, "title", c), W(s, `${d ?? ""} `), X(l, "title", m), W(u, `${w ?? ""} `), X(f, "title", ee), W(p, `${te ?? ""} `), X(h, "title", ne), W(g, re), X(_, "title", ie), y = q(v, 1, "svelte-1n46o8q", null, y, { on: B(ve).mode === "own" }), W(b, T), S = q(x, 1, "svelte-1n46o8q", null, S, { on: B(ve).mode === "custom" }), W(C, ae);
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
			]), V("click", v, () => ye({ mode: "own" })), V("click", x, () => ye({ mode: "custom" })), U(e, t);
		};
		G(_, (e) => {
			B(ua) && e(v);
		}), D(p), ji(p, (e) => N(pa, e), () => B(pa)), D(i);
		var x = R(i, 2), S = (e) => {
			var t = Pm();
			let i;
			var o = F(t), l = F(o), p = L(l, !0), m = R(l, 2), g = (e) => {
				var t = $u();
				let n;
				K(t, () => C.foldToggle, !0), D(t), z((e, r) => {
					n = q(t, 1, "fold-all fold-toggle svelte-1n46o8q", null, n, { collapse: B(Fh) }), X(t, "title", e), X(t, "aria-label", r);
				}, [() => Z(B(Fh) ? "ui.collapseAll" : "ui.expandAll"), () => Z(B(Fh) ? "ui.collapseAll" : "ui.expandAll")]), V("click", t, Rh), U(e, t);
			};
			G(m, (e) => {
				B(Ph) && e(g);
			}), D(o);
			var _ = R(o, 2), v = (e) => {
				var t = Rf(), n = F(t);
				Yr(n, 17, () => B(k).pages, (e) => e.id, (e, t) => {
					var n = Nf();
					let r;
					var i = F(n);
					J(i);
					var a = R(i, 2), o = (e) => {
						var t = Of();
						z((e) => X(t, "title", e), [() => Z("tip.pages.homeLocked")]), U(e, t);
					}, s = (e) => {
						var n = kf();
						J(n), z((e, t) => {
							Y(n, e), X(n, "title", t);
						}, [() => B(t).path.slice(1), () => Z("tip.pages.slug")]), V("change", n, (e) => eo(B(t), e.target.value)), U(e, n);
					};
					G(a, (e) => {
						B(t).path === "/" ? e(o) : e(s, -1);
					});
					var c = R(a, 2), l = (e) => {
						var t = Af();
						K(t, () => C.warn, !0), D(t), z((e) => X(t, "title", e), [() => Z("tip.pages.missingDescription")]), U(e, t);
					};
					G(c, (e) => {
						B(Ya)[B(t).id] && e(l);
					});
					var u = R(c, 2), d = F(u);
					K(d, () => C.right, !0), D(d);
					var f = R(d, 2), p = F(f);
					K(p, () => C.kebab, !0), D(p);
					var m = R(p, 2), h = (e) => {
						var n = Mf(), r = F(n), i = F(r);
						K(i, () => C.bookmark);
						var a = R(i);
						D(r);
						var o = R(r, 2), s = (e) => {
							var n = jf(), r = F(n);
							K(r, () => C.cross);
							var i = R(r);
							D(n), z((e, t) => {
								X(n, "title", e), W(i, ` ${t ?? ""}`);
							}, [() => Z("tip.pages.delete"), () => Z("ui.deletePage")]), V("click", n, () => {
								N(Ia, null), to(B(t));
							}), U(e, n);
						};
						G(o, (e) => {
							B(t).path !== "/" && e(s);
						}), D(n), z((e) => W(a, ` ${e ?? ""}`), [() => Z("ui.savePageTemplate")]), V("click", r, () => Ba(B(t))), U(e, n);
					};
					G(m, (e) => {
						B(Ia) === B(t).id && e(h);
					}), D(f), D(u), D(n), z((e, a, o) => {
						r = q(n, 1, "page-row svelte-1n46o8q", null, r, { current: B(t).id === B(T) }), Y(i, B(t).title), X(i, "title", e), X(d, "title", a), d.disabled = B(t).id === B(T), X(p, "title", o);
					}, [
						() => Z("tip.pages.title"),
						() => Z("tip.pages.open"),
						() => Z("tip.pages.menu")
					]), V("change", i, (e) => Va(B(t), e.target.value)), V("click", d, () => oa(B(t).id)), V("click", p, () => N(Ia, B(Ia) === B(t).id ? null : B(t).id, !0)), U(e, n);
				});
				var r = R(n, 2), i = F(r), a = L(i, !0), o = R(i, 2), s = F(o), c = F(s), l = R(c);
				ut(l), D(s);
				var u = R(s, 2), d = F(u), f = R(d);
				J(f), D(u);
				var p = R(u, 2), m = F(p), h = R(m);
				ut(h), D(p);
				var g = R(p, 2), _ = F(g), v = R(_), y = (e) => {
					var t = Pf();
					z((e) => {
						X(t, "src", B(Ga).ogImage), X(t, "alt", e);
					}, [() => Z("lbl.ogImage")]), U(e, t);
				};
				G(v, (e) => {
					B(Ga).ogImage && e(y);
				}), D(g);
				var b = R(g, 2), x = F(b), S = F(x), w = R(S);
				D(x);
				var ee = R(x, 2), te = (e) => {
					var t = vu();
					K(t, () => C.cross, !0), D(t), z((e) => X(t, "title", e), [() => Z("tip.seo.removeOgImage")]), V("click", t, () => qa("ogImage", "")), U(e, t);
				};
				G(ee, (e) => {
					B(Ga).ogImage && e(te);
				}), D(b);
				var ne = R(b, 2), re = F(ne);
				J(re);
				var ie = R(re);
				D(ne), D(o), D(r);
				var ae = R(r, 4);
				J(ae);
				var oe = R(ae, 2), se = L(oe, !0), ce = R(oe, 2), E = L(ce, !0), le = R(ce, 2), ue = F(le);
				let de;
				var fe = F(ue), pe = F(fe);
				K(pe, () => Uc({ sections: [] }), !0), D(pe);
				var me = L(R(pe, 2), !0);
				D(fe), D(ue), Yr(R(ue, 2), 17, () => Gc, (e) => e.id, (e, t) => {
					var n = Ff();
					let r;
					var i = F(n), a = F(i);
					K(a, () => Pa[B(t).id], !0), D(a);
					var o = L(R(a, 2), !0);
					D(i), D(n), z((e, a) => {
						r = q(n, 1, "page-template-card svelte-1n46o8q", null, r, { picked: B(Na) === `preset:${B(t).id}` }), X(i, "title", e), W(o, a);
					}, [() => Z("tip.pages.templatePick", { name: Z(B(t).labelKey) }), () => Z(B(t).labelKey)]), V("click", i, () => N(Na, B(Na) === `preset:${B(t).id}` ? null : `preset:${B(t).id}`, !0)), U(e, n);
				}), D(le);
				var he = R(le, 2), ge = (e) => {
					var t = Lf(), n = I(t), r = L(n, !0), i = R(n, 2);
					Yr(i, 20, () => B(Tc).filter((e) => vc[e]?.data?.mal?.kind === "page"), (e) => e, (e, t) => {
						var n = If();
						let r;
						var i = F(n), a = F(i);
						K(a, () => Uc(vc[t].data.page), !0), D(a);
						var o = L(R(a, 2), !0);
						D(i);
						var s = R(i, 2);
						K(s, () => C.cross, !0), D(s), D(n), z((e, a) => {
							r = q(n, 1, "page-template-card svelte-1n46o8q", null, r, { picked: B(Na) === t }), X(i, "title", e), W(o, vc[t].data.mal.name), X(s, "title", a);
						}, [() => Z("tip.pages.templatePick", { name: vc[t].data.mal.name }), () => Z("canvas.deleteTemplate")]), V("click", i, () => N(Na, B(Na) === t ? null : t, !0)), V("click", s, () => Mc({ id: t })), U(e, n);
					}), D(i), z((e) => {
						W(r, e), vi(i, B(Fa));
					}, [() => Z("canvas.tabMyTemplates")]), U(e, t);
				}, _e = /* @__PURE__ */ A(() => B(Tc).some((e) => vc[e]?.data?.mal?.kind === "page"));
				G(he, (e) => {
					B(_e) && e(ge);
				}), D(t), z((e, t, n, r, i, o, v, y, b, C, w, ee, te, T, ce, pe, he, ge, _e, ve, ye, be) => {
					W(a, e), X(s, "title", t), W(c, `${n ?? ""} `), Y(l, B(Ga).description), X(u, "title", r), W(d, `${i ?? ""} `), Y(f, B(Ga).ogTitle), X(f, "placeholder", o), X(p, "title", v), W(m, `${y ?? ""} `), Y(h, B(Ga).ogDescription), X(h, "placeholder", B(Ga).description), X(g, "title", b), W(_, `${C ?? ""} `), X(x, "title", w), W(S, `${ee ?? ""} `), X(ne, "title", te), Ci(re, T), W(ie, ` ${ce ?? ""}`), X(ae, "placeholder", pe), X(oe, "title", he), oe.disabled = ge, W(se, _e), W(E, ve), vi(le, B(Fa)), de = q(ue, 1, "page-template-card svelte-1n46o8q", null, de, { picked: B(Na) === null }), X(fe, "title", ye), W(me, be);
				}, [
					() => Z("ui.seoGroup", { page: B(k).pages.find((e) => e.id === B(T))?.title ?? "" }),
					() => Z("tip.seo.description"),
					() => Z("lbl.seoDescription"),
					() => Z("tip.seo.ogTitle"),
					() => Z("lbl.ogTitle"),
					() => B(k).pages.find((e) => e.id === B(T))?.title ?? "",
					() => Z("tip.seo.ogDescription"),
					() => Z("lbl.ogDescription"),
					() => Z("tip.seo.ogImage"),
					() => Z("lbl.ogImage"),
					() => Z("tip.seo.ogImage"),
					() => B(Ga).ogImage ? Z("ui.changeImage") : Z("ui.chooseImage"),
					() => Z("tip.seo.hideFromSearch"),
					() => B(k).pages.find((e) => e.id === B(T))?.noindex === !0,
					() => Z("lbl.hideFromSearch"),
					() => Z("ph.newPageName"),
					() => Z("hint.pages.autoMenu"),
					() => !B(Ma).trim(),
					() => Z("ui.createPage"),
					() => Z("canvas.tabPresets"),
					() => Z("tip.pages.blankPick"),
					() => Z("ui.blankPage")
				]), V("change", l, (e) => qa("description", e.target.value)), V("change", f, (e) => qa("ogTitle", e.target.value)), V("change", h, (e) => qa("ogDescription", e.target.value)), V("change", w, Za), V("change", re, (e) => Ja(e.target.checked)), V("keydown", ae, (e) => e.key === "Enter" && za()), Di(ae, () => B(Ma), (e) => N(Ma, e)), V("click", oe, za), V("click", fe, () => N(Na, null)), U(e, t);
			}, x = (e) => {
				var t = wp(), r = F(t), i = F(r), a = L(i, !0), o = R(i, 2), l = F(o);
				{
					let e = /* @__PURE__ */ A(() => Z("common.type")), t = /* @__PURE__ */ A(() => B(k).nav.logo?.type ?? "text"), n = /* @__PURE__ */ A(() => [
						["text", Z("blocks.text")],
						["image", Z("blocks.image")],
						["both", Z("opt.logo.both")]
					]);
					ps(l, {
						get label() {
							return B(e);
						},
						get value() {
							return B(t);
						},
						get options() {
							return B(n);
						},
						onchange: (e) => io(e)
					});
				}
				var p = R(l, 2), m = (e) => {
					var t = zf(), n = I(t);
					J(n);
					var r = R(n, 2), i = F(r);
					{
						let e = /* @__PURE__ */ A(() => Z("tip.nav.logoFont")), t = /* @__PURE__ */ A(() => B(k).nav.logo?.font ?? ""), n = /* @__PURE__ */ A(() => [["", Z("common.inherit")], ...hu.map(([e, t]) => [t, Z(e)])]);
						Q(i, {
							get title() {
								return B(e);
							},
							get value() {
								return B(t);
							},
							get options() {
								return B(n);
							},
							onchange: (e) => no({ font: e || void 0 })
						});
					}
					var a = R(i, 2);
					J(a);
					var o = R(a, 2);
					let s;
					var c = L(F(o), !0);
					D(o);
					var l = R(o, 2);
					let u;
					var d = L(F(l), !0);
					D(l), D(r), z((e, t, r, i, f, p, m) => {
						Y(n, B(k).nav.logo?.value ?? ""), X(n, "placeholder", e), X(a, "title", t), Y(a, B(k).nav.logo?.textSize ?? ""), s = q(o, 1, "tbtn svelte-1n46o8q", null, s, { active: B(k).nav.logo?.bold !== !1 }), X(o, "title", r), W(c, i), u = q(l, 1, "tbtn svelte-1n46o8q", null, u, { active: f }), X(l, "title", p), W(d, m);
					}, [
						() => Z("ph.nav.logoName"),
						() => Z("tip.nav.textSize"),
						() => Z("format.bold"),
						() => Z("format.boldLetter"),
						() => !!B(k).nav.logo?.italic,
						() => Z("format.italic"),
						() => Z("format.italicLetter")
					]), V("input", n, (e) => no({ value: e.target.value })), V("change", a, (e) => no({ textSize: e.target.value ? Number(e.target.value) : void 0 })), V("click", o, () => no({ bold: B(k).nav.logo?.bold === !1 })), V("click", l, () => no({ italic: !B(k).nav.logo?.italic })), U(e, t);
				};
				G(p, (e) => {
					(B(k).nav.logo?.type ?? "text") !== "image" && e(m);
				});
				var g = R(p, 2), _ = (e) => {
					let t = /* @__PURE__ */ A(() => B(k).nav.logo?.type === "image" ? B(k).nav.logo?.value : B(k).nav.logo?.image);
					var n = Hf(), r = I(n), i = F(r), a = F(i), o = (e) => {
						var n = Bf();
						z(() => X(n, "src", B(t))), U(e, n);
					};
					G(a, (e) => {
						B(t) && e(o);
					}), D(i);
					var s = R(i, 2), c = F(s), l = F(c), u = R(l);
					D(c);
					var d = R(c, 2), f = (e) => {
						var n = Vf(), r = L(n, !0);
						z((e) => W(r, e), [() => B(t).split("/").pop()]), U(e, n);
					};
					G(d, (e) => {
						B(t) && e(f);
					}), D(s), D(r);
					var p = R(r, 2), m = F(p), h = F(m), g = L(h, !0), _ = R(h, 2);
					J(_), D(m);
					var v = R(m, 2), y = F(v), b = L(y, !0), x = R(y, 2);
					J(x), D(v);
					var S = R(v, 2), C = F(S), w = L(C, !0), ee = R(C, 2);
					J(ee), D(S), D(p), z((e, t, n, r, i, a, o, s, u) => {
						X(c, "title", e), W(l, `${t ?? ""} `), X(m, "title", n), W(g, r), Y(_, B(k).nav.logo?.size ?? 32), X(v, "title", i), W(b, a), X(x, "min", Xo.min), X(x, "max", Xo.max), X(x, "placeholder", o), Y(x, B(k).nav.logo?.mobileSize ?? ""), X(S, "title", s), W(w, u), Y(ee, B(k).nav.logo?.radius ?? 0);
					}, [
						() => Z("tip.webpAuto"),
						() => B(t) ? Z("ui.changeImage") : Z("ui.chooseImage"),
						() => Z("tip.nav.logoHeight"),
						() => Z("lbl.height"),
						() => Z("tip.nav.logoHeightMobile"),
						() => Z("lbl.onMobile"),
						() => Z("lbl.navSameAsDesktop"),
						() => Z("tip.nav.logoRadius"),
						() => Z("lbl.rounding")
					]), V("change", u, ao), V("change", _, (e) => no({ size: Number(e.target.value) })), V("change", x, (e) => {
						let t = e.target.value;
						no({ mobileSize: t === "" ? void 0 : ts(t, Xo, void 0) }), e.target.value = B(k).nav.logo?.mobileSize ?? "";
					}), V("change", ee, (e) => no({ radius: Number(e.target.value) })), U(e, n);
				};
				G(g, (e) => {
					(B(k).nav.logo?.type ?? "text") !== "text" && e(_);
				});
				var v = R(g, 2), x = (e) => {
					{
						let t = /* @__PURE__ */ A(() => Z("lbl.order")), n = /* @__PURE__ */ A(() => B(k).nav.logo?.order ?? "image-first"), r = /* @__PURE__ */ A(() => [["image-first", Z("opt.logo.imageFirst")], ["text-first", Z("opt.logo.textFirst")]]);
						ps(e, {
							get label() {
								return B(t);
							},
							get value() {
								return B(n);
							},
							get options() {
								return B(r);
							},
							onchange: (e) => no({ order: e })
						});
					}
				};
				G(v, (e) => {
					B(k).nav.logo?.type === "both" && e(x);
				}), D(o), D(r);
				var S = R(r, 2), w = F(S), ee = L(w, !0), te = R(w, 2), ne = F(te), re = F(ne), ie = L(re, !0), T = R(re, 2), ae = F(T), oe = F(ae), se = L(oe, !0), ce = R(oe, 2);
				Yr(ce, 21, () => [
					["bar", Z("opt.navVariant.bar")],
					["floating", Z("opt.navVariant.floating")],
					["floating-square", Z("opt.navVariant.floatingSquare")],
					["floating-tab", Z("opt.navVariant.floatingTab")],
					["side-left", Z("opt.navVariant.sideLeft")],
					["side-right", Z("opt.navVariant.sideRight")]
				], ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ A(() => h(B(t), 2));
					let r = () => B(n)[0], i = () => B(n)[1];
					var a = Uf();
					let o;
					var c = F(a);
					K(c, () => s[r()]);
					var l = L(R(c), !0);
					D(a), z(() => {
						o = q(a, 1, "tile svelte-1n46o8q", null, o, { on: (B(k).nav.variant ?? "bar") === r() }), X(a, "aria-pressed", (B(k).nav.variant ?? "bar") === r()), W(l, i());
					}), V("click", a, () => Qs(r())), U(e, a);
				}), D(ce), D(ae);
				var E = R(ae, 2), le = (e) => {
					var t = Gf(), n = I(t);
					{
						let e = /* @__PURE__ */ A(() => Z("lbl.navPillWidth")), t = /* @__PURE__ */ A(() => Z("tip.nav.pillWidth")), r = /* @__PURE__ */ A(() => B(k).nav.style?.pillWidth === "content" ? "content" : "custom"), i = /* @__PURE__ */ A(() => [["content", Z("opt.pillWidth.content")], ["custom", Z("opt.pillWidth.custom")]]);
						ps(n, {
							get label() {
								return B(e);
							},
							get title() {
								return B(t);
							},
							get value() {
								return B(r);
							},
							get options() {
								return B(i);
							},
							onchange: (e) => fs("pillWidth", e === "content" ? "content" : void 0)
						});
					}
					var r = R(n, 2), i = (e) => {
						var t = Wf(), n = F(t), r = L(n, !0), i = R(n, 2);
						J(i), D(t), z((e, n) => {
							X(t, "title", e), W(r, n), X(i, "min", Wo.min), X(i, "max", Wo.max), X(i, "step", Wo.step), Y(i, typeof B(k).nav.style?.pillWidth == "number" ? B(k).nav.style.pillWidth : "");
						}, [() => Z("tip.nav.pillWidthPx"), () => Z("lbl.navPillWidthPx")]), V("change", i, (e) => Ss(e, "pillWidth", Wo)), U(e, t);
					};
					G(r, (e) => {
						B(k).nav.style?.pillWidth !== "content" && e(i);
					});
					var a = R(r, 2), o = F(a), s = L(o, !0), c = R(o, 2);
					J(c), D(a), z((e, t) => {
						X(a, "title", e), W(s, t), X(c, "min", Jo.min), X(c, "max", Jo.max), X(c, "step", Jo.step), X(c, "placeholder", B(k).nav.variant === "floating-square" ? "0" : B(k).nav.variant === "floating-tab" ? "12" : "999"), Y(c, typeof B(k).nav.style?.radius == "number" ? B(k).nav.style.radius : "");
					}, [() => Z("tip.nav.radius"), () => Z("lbl.navRadius")]), V("change", c, (e) => Ss(e, "radius", Jo)), U(e, t);
				};
				G(E, (e) => {
					B(_s) && e(le);
				});
				var ue = R(E, 2), de = (e) => {
					{
						let t = /* @__PURE__ */ A(() => Z("lbl.navPlacement")), n = /* @__PURE__ */ A(() => B(k).nav.style?.sidePlacement ?? "top"), r = /* @__PURE__ */ A(() => [
							["top", Z("opt.place.top")],
							["middle", Z("opt.place.middle")],
							["bottom", Z("opt.place.bottom")]
						]);
						ps(e, {
							get label() {
								return B(t);
							},
							get value() {
								return B(n);
							},
							get options() {
								return B(r);
							},
							onchange: (e) => fs("sidePlacement", e === "top" ? void 0 : e)
						});
					}
				}, fe = (e) => {
					{
						let t = /* @__PURE__ */ A(() => Z("lbl.navPlacement")), n = /* @__PURE__ */ A(() => Z("opt.layout.leftAfterLogo")), r = /* @__PURE__ */ A(() => B(k).nav.layout ?? "right"), i = /* @__PURE__ */ A(() => [
							["left", Z("common.left")],
							["center", Z("common.center")],
							["right", Z("common.right")]
						]);
						ps(e, {
							get label() {
								return B(t);
							},
							get title() {
								return B(n);
							},
							get value() {
								return B(r);
							},
							get options() {
								return B(i);
							},
							onchange: (e) => ls(e)
						});
					}
				};
				G(ue, (e) => {
					B(ms) ? e(de) : e(fe, -1);
				});
				var pe = R(ue, 2), me = (e) => {
					var t = Kf(), n = I(t), r = F(n);
					J(r);
					var i = R(r);
					D(n);
					var a = R(n, 2), o = F(a);
					J(o);
					var s = R(o);
					D(a), z((e, t, c, l) => {
						X(n, "title", e), Ci(r, B(k).nav.style?.glow === !0), W(i, ` ${t ?? ""}`), X(a, "title", c), Ci(o, B(k).nav.style?.topGap !== !1), W(s, ` ${l ?? ""}`);
					}, [
						() => Z("tip.nav.glow"),
						() => Z("lbl.navGlow"),
						() => Z("tip.nav.topGap"),
						() => Z("lbl.navTopGap")
					]), V("change", r, (e) => $s(e.target.checked)), V("change", o, (e) => ec(e.target.checked)), U(e, t);
				};
				G(pe, (e) => {
					B(_s) && e(me);
				});
				var he = R(pe, 2), ge = (e) => {
					var t = Kf(), n = I(t), r = F(n);
					J(r);
					var i = R(r);
					D(n);
					var a = R(n, 2), o = F(a);
					J(o);
					var s = R(o);
					D(a), z((e, t, c, l) => {
						X(n, "title", e), Ci(r, B(k).nav.overlay === !0), W(i, ` ${t ?? ""}`), X(a, "title", c), Ci(o, B(k).nav.style?.inset !== !1), W(s, ` ${l ?? ""}`);
					}, [
						() => Z("tip.nav.overlay"),
						() => Z("lbl.navOverlay"),
						() => Z("tip.nav.inset"),
						() => Z("lbl.navInset")
					]), V("change", r, (e) => ja("nav", () => {
						e.target.checked ? B(k).nav.overlay = !0 : delete B(k).nav.overlay;
					})), V("change", o, (e) => fs("inset", e.target.checked ? void 0 : !1)), U(e, t);
				};
				G(he, (e) => {
					!B(_s) && !B(ms) && e(ge);
				});
				var _e = R(he, 2), ve = (e) => {
					var t = qf(), n = I(t);
					{
						let e = /* @__PURE__ */ A(() => Z("lbl.textAlign")), t = /* @__PURE__ */ A(() => Z("tip.nav.sideAlign")), r = /* @__PURE__ */ A(() => B(k).nav.style?.sideAlign ?? "left"), i = /* @__PURE__ */ A(() => [
							["left", Z("common.left")],
							["center", Z("common.center")],
							["right", Z("common.right")]
						]);
						ps(n, {
							get label() {
								return B(e);
							},
							get title() {
								return B(t);
							},
							get value() {
								return B(r);
							},
							get options() {
								return B(i);
							},
							onchange: (e) => fs("sideAlign", e === "left" ? void 0 : e)
						});
					}
					var r = R(n, 2), i = F(r), a = L(i, !0), o = R(i, 2);
					J(o), D(r), z((e, t) => {
						X(r, "title", e), W(a, t), X(o, "min", Yo.min), X(o, "max", Yo.max), Y(o, B(k).nav.style?.width ?? 250);
					}, [() => Z("tip.nav.colWidth"), () => Z("lbl.navColWidth")]), V("change", o, (e) => {
						let t = ts(e.target.value, Yo, 250);
						fs("width", t === 250 ? void 0 : t), e.target.value = B(k).nav.style?.width ?? 250;
					}), U(e, t);
				};
				G(_e, (e) => {
					B(ms) && e(ve);
				}), D(T), D(ne);
				var ye = R(ne, 4), be = F(ye), xe = L(be, !0), Se = R(be, 2), Ce = F(Se);
				Yr(Ce, 20, () => Qo, (e) => e, (e, t) => {
					var n = Cf();
					let r;
					var i = L(n, !0);
					z((e) => {
						r = q(n, 1, "svelte-1n46o8q", null, r, { on: B(vs) === t }), W(i, e);
					}, [() => Z(`opt.size.${t}`)]), V("click", n, () => xs(t)), U(e, n);
				}), D(Ce);
				var we = R(Ce, 2), Te = F(we), Ee = L(Te, !0), De = R(Te, 2), ke = F(De), Ae = (e) => {
					var t = Jf(), n = F(t), r = L(n, !0), i = R(n, 2);
					J(i);
					var a = R(i, 2);
					J(a), D(t), z((e, n) => {
						X(t, "title", e), W(r, n), X(i, "min", Bo.min), X(i, "max", Bo.max), X(i, "step", Bo.step), Y(i, B(ys)), X(a, "min", Bo.min), X(a, "max", Bo.max), Y(a, B(ys));
					}, [() => Z("tip.nav.thickness"), () => Z("lbl.navThickness")]), V("input", i, (e) => fs("padY", e.target.valueAsNumber)), V("change", a, (e) => Us(e, "padY", Bo)), U(e, t);
				};
				G(ke, (e) => {
					B(ms) || e(Ae);
				});
				var je = R(ke, 2), Me = F(je), Ne = L(Me, !0), Pe = R(Me, 2);
				J(Pe);
				var Fe = R(Pe, 2);
				J(Fe), D(je);
				var Ie = R(je, 2), Le = (e) => {
					var t = Yf(), n = F(t), r = F(n), i = L(r, !0), a = R(r, 2);
					J(a), D(n);
					var o = R(n, 2), s = F(o), c = L(s, !0), l = R(s, 2);
					J(l), D(o), D(t), z((e, t, r, s, u, d) => {
						X(n, "title", e), W(i, t), X(a, "min", Ho.min), X(a, "max", Ho.max), X(a, "placeholder", r), Y(a, B(k).nav.style?.padX ?? ""), X(o, "title", s), W(c, u), X(l, "min", Uo.min), X(l, "max", Uo.max), X(l, "placeholder", d), Y(l, B(k).nav.style?.gap ?? "");
					}, [
						() => Z("tip.nav.padX"),
						() => Z("lbl.navPadX"),
						() => Z("common.auto"),
						() => Z("tip.nav.gap"),
						() => Z("lbl.navGap"),
						() => Z("common.auto")
					]), V("change", a, (e) => Ss(e, "padX", Ho)), V("change", l, (e) => Ss(e, "gap", Uo)), U(e, t);
				};
				G(Ie, (e) => {
					B(ms) || e(Le);
				}), D(De), D(we), D(Se), D(ye);
				var Re = R(ye, 4), ze = F(Re), Be = L(ze, !0), Ve = R(ze, 2), He = F(Ve), Ue = (e) => {
					var t = Zf(), n = I(t), r = F(n), i = L(r, !0), a = R(r, 2);
					Yr(a, 21, () => [
						["", Z("common.none")],
						["bottom", Z("opt.navBorder.bottom")],
						["top", Z("opt.navBorder.top")],
						["both", Z("opt.navBorder.both")],
						["all", Z("opt.navBorder.all")]
					], ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ A(() => h(B(t), 2));
						let r = () => B(n)[0], i = () => B(n)[1];
						var a = Uf();
						let o;
						var s = F(a);
						K(s, () => c[r()]);
						var l = L(R(s), !0);
						D(a), z(() => {
							o = q(a, 1, "tile svelte-1n46o8q", null, o, { on: (B(k).nav.style?.border?.side ?? "") === r() }), X(a, "aria-pressed", (B(k).nav.style?.border?.side ?? "") === r()), W(l, i());
						}), V("click", a, () => fs("border", r() ? {
							...B(k).nav.style?.border ?? {},
							side: r()
						} : void 0)), U(e, a);
					}), D(a), D(n);
					var o = R(n, 2), s = (e) => {
						var t = Xf(), n = F(t), r = L(n, !0), i = R(n, 2);
						J(i);
						var a = R(i, 2), o = L(a, !0), s = R(a, 2);
						{
							let e = /* @__PURE__ */ A(() => B(k).nav.style.border.color ?? "text"), t = /* @__PURE__ */ A(ni), n = /* @__PURE__ */ A(() => Z("tip.nav.borderColorPick"));
							ga(s, {
								get value() {
									return B(e);
								},
								get tokens() {
									return B(t);
								},
								get label() {
									return B(n);
								},
								onchange: (e) => fs("border", {
									...B(k).nav.style.border,
									color: e
								})
							});
						}
						D(t), z((e, t, s, c, l) => {
							X(n, "title", e), W(r, t), X(i, "title", s), Y(i, B(k).nav.style.border.width ?? 1), X(a, "title", c), W(o, l);
						}, [
							() => Z("tip.nav.borderWidth"),
							() => Z("lbl.navBorderWidth"),
							() => Z("tip.nav.borderWidth"),
							() => Z("tip.nav.borderColorPick"),
							() => Z("lbl.navBorderColor")
						]), V("change", i, (e) => {
							let t = ts(e.target.value, {
								min: 1,
								max: 8
							}, 1), n = { ...B(k).nav.style.border };
							t === 1 ? delete n.width : n.width = t, fs("border", n), e.target.value = B(k).nav.style.border.width ?? 1;
						}), U(e, t);
					};
					G(o, (e) => {
						B(k).nav.style?.border?.side && e(s);
					}), z((e, t, r) => {
						X(n, "title", e), W(i, t), X(a, "aria-label", r);
					}, [
						() => Z("tip.nav.border"),
						() => Z("lbl.navBorder"),
						() => Z("lbl.navBorder")
					]), U(e, t);
				};
				G(He, (e) => {
					B(ms) || e(Ue);
				});
				var We = R(He, 2), Ge = (e) => {
					{
						let t = /* @__PURE__ */ A(() => Z("lbl.navShadow")), n = /* @__PURE__ */ A(() => Z("tip.nav.shadow")), r = /* @__PURE__ */ A(() => B(k).nav.style?.shadow ?? ""), i = /* @__PURE__ */ A(() => [
							["", Z("common.none")],
							["soft", Z("opt.navShadow.soft")],
							["strong", Z("opt.navShadow.strong")]
						]);
						ps(e, {
							get label() {
								return B(t);
							},
							get title() {
								return B(n);
							},
							get value() {
								return B(r);
							},
							get options() {
								return B(i);
							},
							onchange: (e) => fs("shadow", e || void 0)
						});
					}
				};
				G(We, (e) => {
					!B(_s) && !B(ms) && e(Ge);
				}), D(Ve), D(Re);
				var Ke = R(Re, 4), qe = F(Ke), Je = L(qe, !0), O = R(qe, 2), Ye = F(O), Xe = (e) => {
					var t = ep(), n = F(t), r = L(n, !0), i = R(n, 2), a = F(i);
					J(a);
					var o = R(a);
					D(i);
					var s = R(i, 2), c = (e) => {
						var t = $f(), n = I(t);
						{
							let e = /* @__PURE__ */ A(() => Z("lbl.navScroll")), t = /* @__PURE__ */ A(() => Z("tip.nav.scroll")), r = /* @__PURE__ */ A(() => B(k).nav.scroll ?? "none"), i = /* @__PURE__ */ A(() => [
								["none", Z("opt.scroll.none")],
								["shrink", Z("opt.scroll.shrink")],
								["hide", Z("opt.scroll.hide")]
							]);
							ps(n, {
								get label() {
									return B(e);
								},
								get title() {
									return B(t);
								},
								get value() {
									return B(r);
								},
								get options() {
									return B(i);
								},
								onchange: (e) => ja("nav", () => {
									e === "none" ? delete B(k).nav.scroll : B(k).nav.scroll = e;
								})
							});
						}
						var r = R(n, 2), i = (e) => {
							var t = Qf(), n = I(t), r = F(n), i = L(r, !0), a = R(r, 2);
							J(a);
							var o = L(R(a, 2));
							D(n);
							var s = R(n, 2), c = F(s), l = L(c, !0), u = R(c, 2);
							J(u);
							var d = L(R(u, 2));
							D(s);
							var f = R(s, 2), p = F(f), m = L(p, !0), h = R(p, 2);
							J(h);
							var g = L(R(h, 2));
							D(f);
							var _ = R(f, 2), v = (e) => {
								var t = rd(), n = F(t);
								J(n);
								var r = R(n);
								D(t), z((e, i) => {
									X(t, "title", e), Ci(n, B(k).nav.style?.shrinkLogo === !0), W(r, ` ${i ?? ""}`);
								}, [() => Z("tip.nav.shrinkLogo"), () => Z("lbl.navShrinkLogo")]), V("change", n, (e) => fs("shrinkLogo", e.target.checked ? !0 : void 0)), U(e, t);
							};
							G(_, (e) => {
								(B(k).nav.logo?.type ?? "text") !== "text" && e(v);
							}), z((e, t, r, c, p, _, v, y) => {
								X(n, "title", e), W(i, t), Y(a, r), W(o, `${c ?? ""}%`), X(s, "title", p), W(l, _), Y(u, B(k).nav.style?.shrinkAt ?? 80), W(d, `${B(k).nav.style?.shrinkAt ?? 80 ?? ""} px`), X(f, "title", v), W(m, y), Y(h, B(k).nav.style?.shrinkMs ?? 220), W(g, `${B(k).nav.style?.shrinkMs ?? 220 ?? ""} ms`);
							}, [
								() => Z("tip.nav.shrinkTo"),
								() => Z("lbl.navShrinkTo"),
								() => Math.round((B(k).nav.style?.shrinkTo ?? .5) * 100),
								() => Math.round((B(k).nav.style?.shrinkTo ?? .5) * 100),
								() => Z("tip.nav.shrinkAt"),
								() => Z("lbl.navShrinkAt"),
								() => Z("tip.nav.shrinkMs"),
								() => Z("lbl.navShrinkMs")
							]), V("input", a, (e) => Gs(e.target.valueAsNumber)), V("input", u, (e) => Ks(e.target.valueAsNumber)), V("input", h, (e) => qs(e.target.valueAsNumber)), U(e, t);
						};
						G(r, (e) => {
							B(k).nav.scroll === "shrink" && e(i);
						}), U(e, t);
					};
					G(s, (e) => {
						B(k).nav.sticky !== !1 && e(c);
					});
					var l = R(s, 2), u = F(l);
					J(u);
					var d = R(u);
					D(l), D(t), z((e, t, n, s, c) => {
						W(r, e), X(i, "title", t), Ci(a, B(k).nav.sticky !== !1), W(o, ` ${n ?? ""}`), X(l, "title", s), Ci(u, B(k).nav.style?.atTop === "clear"), W(d, ` ${c ?? ""}`);
					}, [
						() => Z("group.navScrolling"),
						() => Z("tip.nav.sticky"),
						() => Z("lbl.navSticky"),
						() => Z("tip.nav.atTop"),
						() => Z("lbl.navAtTop")
					]), V("change", a, (e) => ja("nav", () => {
						B(k).nav.sticky = e.target.checked;
					})), V("change", u, (e) => fs("atTop", e.target.checked ? "clear" : void 0)), U(e, t);
				};
				G(Ye, (e) => {
					B(ms) || e(Xe);
				}), D(O), D(Ke);
				var Ze = R(Ke, 4), $e = F(Ze), et = L($e, !0), tt = R($e, 2), nt = F(tt), rt = F(nt), it = (e) => {
					var t = tp(), n = F(t), r = L(n, !0), i = R(n, 2);
					J(i), D(t), z((e, n, a) => {
						X(t, "title", e), W(r, n), X(i, "min", Bo.min), X(i, "max", Bo.max), X(i, "placeholder", a), Y(i, B(k).nav.style?.mobile?.padY ?? "");
					}, [
						() => Z("tip.nav.thickness"),
						() => Z("lbl.navThickness"),
						() => Z("lbl.navSameAsDesktop")
					]), V("change", i, (e) => Ws(e, "padY", Bo)), U(e, t);
				};
				G(rt, (e) => {
					B(ms) || e(it);
				});
				var at = R(rt, 2), ot = F(at), st = L(ot, !0), ct = R(ot, 2);
				J(ct), D(at), D(nt);
				var lt = R(nt, 2), ut = F(lt), dt = F(ut), ft = L(dt, !0), pt = R(dt, 2);
				{
					let e = /* @__PURE__ */ A(() => B(k).nav.style?.mobile?.size ?? ""), t = /* @__PURE__ */ A(() => [["", Z("lbl.navSameAsDesktop")], ...Qo.map((e) => [e, Z(`opt.size.${e}`)])]);
					Q(pt, {
						filled: !0,
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => Cs("size", e || void 0)
					});
				}
				D(ut);
				var mt = R(ut, 2), ht = F(mt), gt = L(ht, !0), _t = R(ht, 2);
				{
					let e = /* @__PURE__ */ A(() => B(k).nav.style?.mobile?.layout ?? ""), t = /* @__PURE__ */ A(() => [
						["", Z("lbl.navSameAsDesktop")],
						["left", Z("common.left")],
						["center", Z("common.center")],
						["right", Z("common.right")]
					]);
					Q(_t, {
						filled: !0,
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => Cs("layout", e || void 0)
					});
				}
				D(mt), D(lt);
				var vt = R(lt, 2), yt = F(vt), bt = F(yt), xt = L(bt, !0), St = R(bt, 2);
				{
					let e = /* @__PURE__ */ A(() => B(k).nav.style?.mobile?.tools?.side ?? ""), t = /* @__PURE__ */ A(() => [
						["", Z("lbl.navSameAsDesktop")],
						["start", Z("common.left")],
						["end", Z("common.right")]
					]);
					Q(St, {
						filled: !0,
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => Cs("tools", e ? { side: e } : void 0)
					});
				}
				D(yt);
				var Ct = R(yt, 2), wt = F(Ct), Tt = L(wt, !0), Et = R(wt, 2);
				{
					let e = /* @__PURE__ */ A(() => ws("inset")), t = /* @__PURE__ */ A(() => [
						["", Z("lbl.navSameAsDesktop")],
						["on", Z("common.on")],
						["off", Z("common.off")]
					]);
					Q(Et, {
						filled: !0,
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => Ts("inset", e)
					});
				}
				D(Ct), D(vt);
				var Dt = R(vt, 2), Ot = F(Dt), kt = F(Ot), At = L(kt, !0), jt = R(kt, 2);
				{
					let e = /* @__PURE__ */ A(() => ws("overlay")), t = /* @__PURE__ */ A(() => [
						["", Z("lbl.navSameAsDesktop")],
						["on", Z("common.on")],
						["off", Z("common.off")]
					]);
					Q(jt, {
						filled: !0,
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => Ts("overlay", e)
					});
				}
				D(Ot);
				var Mt = R(Ot, 2), Nt = F(Mt), Pt = L(Nt, !0), Ft = R(Nt, 2);
				{
					let e = /* @__PURE__ */ A(() => B(k).nav.style?.mobile?.border?.side ?? ""), t = /* @__PURE__ */ A(() => [
						["", Z("lbl.navSameAsDesktop")],
						["none", Z("common.none")],
						["bottom", Z("opt.navBorder.bottom")],
						["top", Z("opt.navBorder.top")],
						["both", Z("opt.navBorder.both")],
						["all", Z("opt.navBorder.all")]
					]);
					Q(Ft, {
						filled: !0,
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => Es(e)
					});
				}
				D(Mt), D(Dt);
				var It = R(Dt, 2), Lt = (e) => {
					var t = Xf(), n = F(t), r = L(n, !0), i = R(n, 2);
					J(i);
					var a = R(i, 2), o = L(a, !0), s = R(a, 2);
					{
						let e = /* @__PURE__ */ A(() => B(k).nav.style.mobile.border.color ?? "text"), t = /* @__PURE__ */ A(ni), n = /* @__PURE__ */ A(() => Z("tip.nav.borderColorPick"));
						ga(s, {
							get value() {
								return B(e);
							},
							get tokens() {
								return B(t);
							},
							get label() {
								return B(n);
							},
							onchange: (e) => Cs("border", {
								...B(k).nav.style.mobile.border,
								color: e
							})
						});
					}
					D(t), z((e, t, s, c, l) => {
						X(n, "title", e), W(r, t), X(i, "title", s), Y(i, B(k).nav.style.mobile.border.width ?? 1), X(a, "title", c), W(o, l);
					}, [
						() => Z("tip.nav.borderWidth"),
						() => Z("lbl.navBorderWidth"),
						() => Z("tip.nav.borderWidth"),
						() => Z("tip.nav.borderColorPick"),
						() => Z("lbl.navBorderColor")
					]), V("change", i, (e) => {
						let t = ts(e.target.value, {
							min: 1,
							max: 8
						}, 1), n = { ...B(k).nav.style.mobile.border };
						t === 1 ? delete n.width : n.width = t, Cs("border", n), e.target.value = B(k).nav.style.mobile.border.width ?? 1;
					}), U(e, t);
				};
				G(It, (e) => {
					B(k).nav.style?.mobile?.border?.side && B(k).nav.style.mobile.border.side !== "none" && e(Lt);
				});
				var Rt = R(It, 2), zt = F(Rt), Bt = F(zt), Vt = L(Bt, !0), Ht = R(Bt, 2);
				{
					let e = /* @__PURE__ */ A(() => B(k).nav.style?.mobileMenu ?? "dropdown"), t = /* @__PURE__ */ A(() => [["dropdown", Z("opt.mobileMenu.dropdown")], ["sheet", Z("opt.mobileMenu.sheet")]]);
					Q(Ht, {
						filled: !0,
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => fs("mobileMenu", e === "dropdown" ? void 0 : e)
					});
				}
				D(zt);
				var Ut = R(zt, 2), Wt = (e) => {
					var t = np(), n = F(t), r = L(n, !0), i = R(n, 2);
					{
						let e = /* @__PURE__ */ A(() => B(k).nav.style?.sheetMotion ?? "top"), t = /* @__PURE__ */ A(() => [
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
								return B(e);
							},
							get options() {
								return B(t);
							},
							onchange: (e) => fs("sheetMotion", e === "top" ? void 0 : e)
						});
					}
					D(t), z((e, n) => {
						X(t, "title", e), W(r, n);
					}, [() => Z("tip.nav.sheetMotion"), () => Z("lbl.sheetMotion")]), U(e, t);
				};
				G(Ut, (e) => {
					B(k).nav.style?.mobileMenu === "sheet" && e(Wt);
				}), D(Rt);
				var Gt = R(Rt, 2), Kt = (e) => {
					var t = rp(), n = I(t), r = F(n);
					J(r);
					var i = R(r);
					D(n);
					var a = R(n, 2), o = (e) => {
						var t = rd(), n = F(t);
						J(n);
						var r = R(n);
						D(t), z((e, i) => {
							X(t, "title", e), Ci(n, B(k).nav.style?.sheetTheme === !0), W(r, ` ${i ?? ""}`);
						}, [() => Z("tip.nav.sheetTheme"), () => Z("lbl.sheetTheme")]), V("change", n, (e) => fs("sheetTheme", e.target.checked ? !0 : void 0)), U(e, t);
					};
					G(a, (e) => {
						B(k).theme?.alt?.tokens && e(o);
					});
					var s = R(a, 2), c = (e) => {
						var t = rd(), n = F(t);
						J(n);
						var r = R(n);
						D(t), z((e, i) => {
							X(t, "title", e), Ci(n, B(k).nav.style?.sheetCart === !0), W(r, ` ${i ?? ""}`);
						}, [() => Z("tip.nav.sheetCart"), () => Z("lbl.sheetCart")]), V("change", n, (e) => fs("sheetCart", e.target.checked ? !0 : void 0)), U(e, t);
					};
					G(s, (e) => {
						B(k).nav.cart?.show && e(c);
					});
					var l = R(s, 2), u = (e) => {
						var t = rd(), n = F(t);
						J(n);
						var r = R(n);
						D(t), z((e, i) => {
							X(t, "title", e), Ci(n, B(k).nav.style?.sheetAnnounce === !0), W(r, ` ${i ?? ""}`);
						}, [() => Z("tip.nav.sheetAnnounce"), () => Z("lbl.sheetAnnounce")]), V("change", n, (e) => fs("sheetAnnounce", e.target.checked ? !0 : void 0)), U(e, t);
					};
					G(l, (e) => {
						B(k).nav.announcement?.show && e(u);
					});
					var d = R(l, 2), f = (e) => {
						var t = rd(), n = F(t);
						J(n);
						var r = R(n);
						D(t), z((e, i) => {
							X(t, "title", e), Ci(n, B(k).nav.style?.sheetToolLabels === !0), W(r, ` ${i ?? ""}`);
						}, [() => Z("tip.nav.sheetToolLabels"), () => Z("lbl.sheetToolLabels")]), V("change", n, (e) => fs("sheetToolLabels", e.target.checked ? !0 : void 0)), U(e, t);
					};
					G(d, (e) => {
						(B(k).nav.style?.sheetTheme || B(k).nav.style?.sheetCart) && e(f);
					});
					var p = R(d, 2), m = F(p), h = L(m, !0), g = R(m, 2);
					{
						let e = /* @__PURE__ */ A(() => B(k).nav.style?.sheet?.bg ?? "surface"), t = /* @__PURE__ */ A(ni), n = /* @__PURE__ */ A(() => Z("tip.nav.sheetBg"));
						ga(g, {
							get value() {
								return B(e);
							},
							get tokens() {
								return B(t);
							},
							get label() {
								return B(n);
							},
							onchange: (e) => Hs("bg", e)
						});
					}
					var _ = R(g, 2);
					J(_);
					var v = L(R(_, 2));
					D(p);
					var y = R(p, 2), b = F(y);
					J(b);
					var x = R(b);
					D(y);
					var S = R(y, 2), C = F(S), w = R(C);
					{
						let e = /* @__PURE__ */ A(() => B(k).nav.style?.sheet?.textColor ?? B(k).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ A(ni), n = /* @__PURE__ */ A(() => Z("tip.nav.sheetTextColorPick"));
						ga(w, {
							get value() {
								return B(e);
							},
							get tokens() {
								return B(t);
							},
							get label() {
								return B(n);
							},
							onchange: (e) => Hs("textColor", e)
						});
					}
					D(S), z((e, t, a, o, s, c, l, u, d, f) => {
						X(n, "title", e), Ci(r, B(k).nav.style?.sheetLogo === !0), W(i, ` ${t ?? ""}`), X(p, "title", a), W(h, o), X(_, "title", s), Y(_, c), W(v, `${l ?? ""}%`), X(y, "title", u), Ci(b, B(k).nav.style?.sheet?.blur ?? B(k).nav.style?.blur !== !1), W(x, ` ${d ?? ""}`), W(C, `${f ?? ""} `);
					}, [
						() => Z("tip.nav.sheetLogo"),
						() => Z("lbl.sheetLogo"),
						() => Z("tip.nav.sheetBg"),
						() => Z("lbl.background"),
						() => Z("tip.nav.sheetOpacity"),
						() => Math.round((B(k).nav.style?.sheet?.bgOpacity ?? .85) * 100),
						() => Math.round((B(k).nav.style?.sheet?.bgOpacity ?? .85) * 100),
						() => Z("tip.nav.sheetBlur"),
						() => Z("lbl.sheetBlur"),
						() => Z("lbl.textColor")
					]), V("change", r, (e) => fs("sheetLogo", e.target.checked ? !0 : void 0)), V("input", _, (e) => Hs("bgOpacity", e.target.valueAsNumber / 100)), V("change", b, (e) => Hs("blur", e.target.checked)), U(e, t);
				};
				G(Gt, (e) => {
					B(k).nav.style?.mobileMenu === "sheet" && e(Kt);
				});
				var qt = R(Gt, 2), j = (e) => {
					var t = np(), n = F(t), r = L(n, !0), i = R(n, 2);
					{
						let e = /* @__PURE__ */ A(() => B(k).nav.style?.mobileSubs ?? "collapsed"), t = /* @__PURE__ */ A(() => [["collapsed", Z("opt.mobileSubs.collapsed")], ["expanded", Z("opt.mobileSubs.expanded")]]);
						Q(i, {
							filled: !0,
							get value() {
								return B(e);
							},
							get options() {
								return B(t);
							},
							onchange: (e) => fs("mobileSubs", e === "collapsed" ? void 0 : e)
						});
					}
					D(t), z((e, n) => {
						X(t, "title", e), W(r, n);
					}, [() => Z("tip.nav.mobileSubs"), () => Z("lbl.mobileSubs")]), U(e, t);
				}, Jt = /* @__PURE__ */ A(() => B(k).nav.items?.some((e) => e.children?.length));
				G(qt, (e) => {
					B(Jt) && e(j);
				}), D(tt), D(Ze);
				var Yt = R(Ze, 4), M = F(Yt), Xt = L(M, !0), Zt = R(M, 2), Qt = F(Zt), $t = F(Qt), en = L($t, !0), tn = R($t, 2);
				Yr(tn, 21, () => [
					["standard", Z("opt.hover.standard")],
					["underline", Z("opt.hover.underline")],
					["pill", Z("opt.hover.pill")],
					["lift-plain", Z("opt.hover.liftPlain")],
					["lift", Z("opt.hover.lift")]
				], ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ A(() => h(B(t), 2));
					let r = () => B(n)[0], i = () => B(n)[1];
					var a = ip();
					let o;
					var s = F(a), c = L(s, !0), l = L(R(s), !0);
					D(a), z((e) => {
						o = q(a, 1, "tile hover-tile svelte-1n46o8q", null, o, { on: (B(k).nav.style?.hover ?? "standard") === r() }), X(a, "aria-pressed", (B(k).nav.style?.hover ?? "standard") === r()), q(s, 1, `hover-sample hover-${r() ?? ""}`, "svelte-1n46o8q"), W(c, e), W(l, i());
					}, [() => Z("seed.home")]), V("click", a, () => tc(r())), U(e, a);
				}), D(tn), D(Qt);
				var nn = R(Qt, 2), rn = (e) => {
					var t = ap(), n = F(t), r = L(n, !0), i = R(n, 2);
					J(i);
					var a = L(R(i, 2));
					D(t), z((e, n, o) => {
						X(t, "title", e), W(r, n), Y(i, B(k).nav.style?.hoverGlow ?? .6), W(a, `${o ?? ""}%`);
					}, [
						() => Z("tip.nav.hoverGlow"),
						() => Z("lbl.glowStrength"),
						() => Math.round((B(k).nav.style?.hoverGlow ?? .6) * 100)
					]), V("input", i, (e) => fs("hoverGlow", Number(e.target.value))), U(e, t);
				};
				G(nn, (e) => {
					B(k).nav.style?.hover === "lift" && e(rn);
				});
				var an = R(nn, 2), P = F(an), on = (e) => {
					var t = Fd(), n = F(t);
					{
						let e = /* @__PURE__ */ A(() => B(k).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ A(ni);
						ga(n, {
							get value() {
								return B(e);
							},
							get tokens() {
								return B(t);
							},
							get label() {
								return B(Ys)[1];
							},
							onchange: (e) => fs("hoverColor", e)
						});
					}
					var r = L(R(n, 2), !0);
					D(t), z(() => {
						X(t, "title", B(Ys)[1]), W(r, B(Ys)[0]);
					}), U(e, t);
				};
				G(P, (e) => {
					B(Ys) && e(on);
				});
				var sn = R(P, 2), cn = F(sn);
				{
					let e = /* @__PURE__ */ A(() => B(k).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ A(ni), n = /* @__PURE__ */ A(() => Z("tip.nav.hoverTextColorPick"));
					ga(cn, {
						get value() {
							return B(e);
						},
						get tokens() {
							return B(t);
						},
						get label() {
							return B(n);
						},
						onchange: (e) => fs("hoverTextColor", e)
					});
				}
				var ln = L(R(cn, 2), !0);
				D(sn);
				var un = R(sn, 2), dn = F(un);
				{
					let e = /* @__PURE__ */ A(() => B(k).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ A(ni), n = /* @__PURE__ */ A(() => Z("tip.nav.textColorPick"));
					ga(dn, {
						get value() {
							return B(e);
						},
						get tokens() {
							return B(t);
						},
						get label() {
							return B(n);
						},
						onchange: (e) => fs("textColor", e)
					});
				}
				var fn = L(R(dn, 2), !0);
				D(un), D(an);
				var pn = R(an, 2), mn = F(pn);
				J(mn);
				var hn = R(mn);
				D(pn), D(Zt), D(Yt);
				var gn = R(Yt, 4), _n = F(gn), vn = L(_n, !0), yn = R(_n, 2), bn = F(yn);
				n(bn, () => Zr, () => B(k).nav?.style?.background?.layers ?? []), D(yn), D(gn), D(te), D(S);
				var xn = R(S, 2), Sn = F(xn), Cn = L(Sn, !0), wn = R(Sn, 2), Tn = F(wn), En = F(Tn);
				J(En);
				var Dn = R(En);
				D(Tn);
				var On = R(Tn, 2), kn = (e) => {
					var t = sp(), n = I(t), r = F(n), i = L(r, !0), a = R(r, 2);
					J(a), D(n);
					var o = R(n, 2), s = F(o), c = R(s);
					{
						let e = /* @__PURE__ */ A(() => B(k).nav.announcement?.page ?? (B(k).nav.announcement?.href === void 0 ? "" : "custom")), t = /* @__PURE__ */ A(() => [
							["", Z("common.none")],
							...B(k).pages.map((e) => [e.id, e.title]),
							["custom", Z("opt.announceLink.custom")]
						]);
						Q(c, {
							get value() {
								return B(e);
							},
							get options() {
								return B(t);
							},
							onchange: (e) => ja("edit:nav-announce-link", () => {
								let t = { ...B(k).nav.announcement ?? {} };
								delete t.page, delete t.href, e === "custom" ? t.href = "" : e && (t.page = e), B(k).nav.announcement = t;
							})
						});
					}
					D(o);
					var l = R(o, 2), u = (e) => {
						var t = op(), n = F(t), r = L(n, !0), i = R(n, 2);
						J(i), D(t), z((e, n) => {
							X(t, "title", e), W(r, n), Y(i, B(k).nav.announcement?.href ?? "");
						}, [() => Z("tip.nav.announceHref"), () => Z("lbl.announceHref")]), V("change", i, (e) => ks("href", e.target.value.trim())), U(e, t);
					};
					G(l, (e) => {
						B(k).nav.announcement?.href !== void 0 && !B(k).nav.announcement?.page && e(u);
					});
					var d = R(l, 2), f = (e) => {
						var t = rd(), n = F(t);
						J(n);
						var r = R(n);
						D(t), z((e, i) => {
							X(t, "title", e), Ci(n, B(k).nav.announcement?.sticky !== !1), W(r, ` ${i ?? ""}`);
						}, [() => Z("tip.nav.announceSticky"), () => Z("lbl.announceSticky")]), V("change", n, (e) => ks("sticky", e.target.checked ? void 0 : !1)), U(e, t);
					};
					G(d, (e) => {
						B(k).nav.sticky !== !1 && !B(_s) && !B(ms) && !B(k).nav.overlay && e(f);
					});
					var p = R(d, 2), m = (e) => {
						var t = rd(), n = F(t);
						J(n);
						var r = R(n);
						D(t), z((e, i) => {
							X(t, "title", e), Ci(n, B(k).nav.announcement?.followNav === !0), W(r, ` ${i ?? ""}`);
						}, [() => Z("tip.nav.announceFollowNav"), () => Z("lbl.announceFollowNav")]), V("change", n, (e) => ks("followNav", e.target.checked ? !0 : void 0)), U(e, t);
					};
					G(p, (e) => {
						B(k).nav.scroll === "hide" && B(k).nav.sticky !== !1 && !B(ms) && B(k).nav.announcement?.sticky !== !1 && e(m);
					});
					var h = R(p, 2), g = (e) => {
						{
							let t = /* @__PURE__ */ A(() => Z("lbl.announcePlace")), n = /* @__PURE__ */ A(() => Z("tip.nav.announcePlace")), r = /* @__PURE__ */ A(() => B(k).nav.announcement?.place ?? "nav"), i = /* @__PURE__ */ A(() => [
								["nav", Z("opt.announcePlace.nav")],
								["page", Z("opt.announcePlace.page")],
								["content", Z("opt.announcePlace.content")]
							]);
							ps(e, {
								get label() {
									return B(t);
								},
								get title() {
									return B(n);
								},
								get value() {
									return B(r);
								},
								get options() {
									return B(i);
								},
								onchange: (e) => ks("place", e === "nav" ? void 0 : e)
							});
						}
					};
					G(h, (e) => {
						B(ms) && e(g);
					});
					var _ = R(h, 2), v = F(_);
					J(v);
					var y = R(v);
					D(_);
					var b = R(_, 2), x = (e) => {
						var t = ad(), n = L(t, !0);
						z((e, r) => {
							X(t, "title", e), W(n, r);
						}, [() => Z("tip.nav.announceShowAgain"), () => Z("lbl.announceShowAgain")]), V("click", t, () => Qe?.sendAnnounceReset()), U(e, t);
					};
					G(b, (e) => {
						B(k).nav.announcement?.dismiss !== !1 && e(x);
					});
					var S = R(b, 2), C = F(S), w = R(C);
					{
						let e = /* @__PURE__ */ A(() => B(k).nav.announcement?.color ?? "accent"), t = /* @__PURE__ */ A(ni), n = /* @__PURE__ */ A(() => Z("tip.nav.announceColor"));
						ga(w, {
							get value() {
								return B(e);
							},
							get tokens() {
								return B(t);
							},
							get label() {
								return B(n);
							},
							onchange: (e) => ks("color", e)
						});
					}
					D(S);
					var ee = R(S, 2), te = F(ee), ne = R(te);
					{
						let e = /* @__PURE__ */ A(() => B(k).nav.announcement?.textColor ?? "accent-text"), t = /* @__PURE__ */ A(ni), n = /* @__PURE__ */ A(() => Z("tip.nav.announceTextColor"));
						ga(ne, {
							get value() {
								return B(e);
							},
							get tokens() {
								return B(t);
							},
							get label() {
								return B(n);
							},
							onchange: (e) => ks("textColor", e)
						});
					}
					D(ee), z((e, t, r, c, l, u, d, f, p, m) => {
						X(n, "title", e), W(i, t), Y(a, B(k).nav.announcement?.text ?? ""), X(o, "title", r), W(s, `${c ?? ""} `), X(_, "title", l), Ci(v, B(k).nav.announcement?.dismiss !== !1), W(y, ` ${u ?? ""}`), X(S, "title", d), W(C, `${f ?? ""} `), X(ee, "title", p), W(te, `${m ?? ""} `);
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
					]), V("change", a, (e) => ks("text", e.target.value.trim() || void 0)), V("change", v, (e) => ks("dismiss", e.target.checked ? void 0 : !1)), U(e, t);
				};
				G(On, (e) => {
					B(k).nav.announcement?.show && e(kn);
				}), D(wn), D(xn);
				var An = R(xn, 2), jn = F(An), Mn = L(jn, !0), Nn = R(jn, 2);
				{
					let e = (e, t = f, n = f) => {
						var r = cp(), i = F(r);
						K(i, () => C.up, !0), D(i);
						var a = R(i, 2);
						K(a, () => C.down, !0), D(a), D(r), z((e, t) => {
							X(i, "title", e), i.disabled = n() === 0, X(a, "title", t), a.disabled = n() === 2;
						}, [() => Z("tip.moveUp"), () => Z("tip.moveDown")]), V("click", i, (e) => {
							e.preventDefault(), e.stopPropagation(), us(t(), -1);
						}), V("click", a, (e) => {
							e.preventDefault(), e.stopPropagation(), us(t(), 1);
						}), U(e, r);
					};
					var Pn = F(Nn), Fn = (e) => {
						var t = $f(), n = I(t);
						{
							let e = /* @__PURE__ */ A(() => Z("lbl.toolsSide")), t = /* @__PURE__ */ A(() => Z("tip.nav.toolsSideColumn")), r = /* @__PURE__ */ A(() => B(k).nav.style?.tools?.side ?? "end"), i = /* @__PURE__ */ A(() => [["start", Z("opt.toolsSide.top")], ["end", Z("opt.toolsSide.bottom")]]);
							ps(n, {
								get label() {
									return B(e);
								},
								get title() {
									return B(t);
								},
								get value() {
									return B(r);
								},
								get options() {
									return B(i);
								},
								onchange: (e) => ds("side", e === "start" ? "start" : void 0)
							});
						}
						var r = R(n, 2);
						{
							let e = /* @__PURE__ */ A(() => Z("lbl.toolsAlign")), t = /* @__PURE__ */ A(() => Z("tip.nav.toolsAlign")), n = /* @__PURE__ */ A(() => B(k).nav.style?.tools?.align ?? "center"), i = /* @__PURE__ */ A(() => [
								["start", Z("opt.toolsAlign.start")],
								["center", Z("opt.toolsAlign.center")],
								["end", Z("opt.toolsAlign.end")],
								["spread", Z("opt.toolsAlign.spread")]
							]);
							ps(r, {
								get label() {
									return B(e);
								},
								get title() {
									return B(t);
								},
								get value() {
									return B(n);
								},
								get options() {
									return B(i);
								},
								onchange: (e) => ds("align", e === "center" ? void 0 : e)
							});
						}
						U(e, t);
					}, In = (e) => {
						{
							let t = /* @__PURE__ */ A(() => Z("lbl.toolsSide")), n = /* @__PURE__ */ A(() => Z("tip.nav.toolsSide")), r = /* @__PURE__ */ A(() => B(k).nav.style?.tools?.side ?? "end"), i = /* @__PURE__ */ A(() => [["start", Z("opt.toolsSide.start")], ["end", Z("opt.toolsSide.end")]]);
							ps(e, {
								get label() {
									return B(t);
								},
								get title() {
									return B(n);
								},
								get value() {
									return B(r);
								},
								get options() {
									return B(i);
								},
								onchange: (e) => ds("side", e === "start" ? "start" : void 0)
							});
						}
					};
					G(Pn, (e) => {
						B(ms) ? e(Fn) : e(In, -1);
					}), Yr(R(Pn, 2), 18, () => Al(B(k).nav.style ?? {}), (e) => e, (t, n, r) => {
						var i = Pr(), a = I(i), o = (t) => {
							var i = Pr(), a = I(i), o = (t) => {
								var i = lp(), a = F(i), o = F(a), s = L(o, !0), c = R(o);
								e(c, () => n, () => B(r)), D(a);
								var l = R(a, 2), u = F(l);
								J(u);
								var d = R(u);
								D(l), D(i), z((e, t, n) => {
									W(s, e), X(l, "title", t), Ci(u, B(k).nav.style?.tools?.theme !== !1), W(d, ` ${n ?? ""}`);
								}, [
									() => Z("lbl.themeToggle"),
									() => Z("tip.nav.themeToggle"),
									() => Z("lbl.showInMenu")
								]), V("change", u, (e) => ds("theme", e.target.checked ? void 0 : !1)), U(t, i);
							};
							G(a, (e) => {
								B(k).theme?.alt?.tokens && e(o);
							}), U(t, i);
						}, s = (t) => {
							var i = up(), a = F(i), o = F(a), s = L(o, !0), c = R(o);
							e(c, () => n, () => B(r)), D(a);
							var l = R(a, 2), u = F(l);
							J(u);
							var d = R(u);
							D(l);
							var f = R(l, 2), p = (e) => {
								var t = np(), n = F(t), r = L(n, !0), i = R(n, 2);
								{
									let e = /* @__PURE__ */ A(() => B(k).nav.cart?.href ?? ""), t = /* @__PURE__ */ A(() => [["", Z("common.none")], ...B(k).pages.map((e) => [e.path, e.title])]);
									Q(i, {
										filled: !0,
										get value() {
											return B(e);
										},
										get options() {
											return B(t);
										},
										onchange: (e) => ja("nav", () => {
											e ? B(k).nav.cart.href = e : delete B(k).nav.cart.href;
										})
									});
								}
								D(t), z((e, n) => {
									X(t, "title", e), W(r, n);
								}, [() => Z("tip.cart.checkout"), () => Z("lbl.checkoutPage")]), U(e, t);
							};
							G(f, (e) => {
								B(k).nav.cart?.show && e(p);
							}), D(i), z((e, t, n) => {
								W(s, e), X(l, "title", t), Ci(u, B(k).nav.cart?.show === !0), W(d, ` ${n ?? ""}`);
							}, [
								() => Z("lbl.cart"),
								() => Z("tip.nav.cart"),
								() => Z("lbl.showInMenu")
							]), V("change", u, (e) => ja("nav", () => {
								e.target.checked ? B(k).nav.cart = {
									...B(k).nav.cart ?? {},
									show: !0
								} : delete B(k).nav.cart;
							})), U(t, i);
						}, c = (t) => {
							var i = vp(), a = F(i), o = F(a), s = F(o, !0), c = R(s);
							e(c, () => n, () => B(r)), D(o), D(a);
							var l = R(a, 2), u = F(l), f = F(u);
							J(f);
							var p = R(f);
							D(u);
							var m = R(u, 2), g = F(m), _ = L(g, !0), v = R(g, 2);
							Yr(v, 21, () => B(Xs), ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ A(() => h(B(t), 2));
								let r = () => B(n)[0], i = () => B(n)[1];
								var a = Uf();
								let o;
								var s = F(a);
								K(s, () => d[r()]);
								var c = L(R(s), !0);
								D(a), z(() => {
									o = q(a, 1, "tile svelte-1n46o8q", null, o, { on: (B(k).nav.launcher?.view ?? "grid") === r() }), X(a, "aria-pressed", (B(k).nav.launcher?.view ?? "grid") === r()), W(c, i());
								}), V("click", a, () => Is("view", r() === "grid" ? void 0 : r())), U(e, a);
							}), D(v), D(m);
							var y = R(m, 2);
							{
								let e = /* @__PURE__ */ A(() => Z("lbl.launcherMobileView")), t = /* @__PURE__ */ A(() => Z("tip.nav.launcherMobileView")), n = /* @__PURE__ */ A(() => B(k).nav.launcher?.mobileView ?? ""), r = /* @__PURE__ */ A(() => [["", Z("lbl.navSameAsDesktop")], ...B(Xs)]);
								ps(y, {
									get label() {
										return B(e);
									},
									get title() {
										return B(t);
									},
									get value() {
										return B(n);
									},
									get options() {
										return B(r);
									},
									onchange: (e) => Is("mobileView", e || void 0)
								});
							}
							var b = R(y, 2), x = F(b), S = L(x, !0), w = R(x, 2);
							J(w);
							var ee = L(R(w, 2), !0);
							D(b);
							var te = R(b, 2), ne = F(te);
							J(ne);
							var re = R(ne);
							D(te);
							var ie = R(te, 2), T = (e) => {
								var t = dp(), n = F(t), r = L(n, !0), i = R(n, 2);
								J(i), D(t), z((e, n, a) => {
									X(t, "title", e), W(r, n), X(i, "placeholder", a), Y(i, B(k).nav.launcher?.title ?? "");
								}, [
									() => Z("tip.nav.launcherTitleText"),
									() => Z("lbl.launcherTitle"),
									() => Z("ph.launcherTitle")
								]), V("change", i, (e) => Is("title", e.target.value.trim() || void 0)), U(e, t);
							};
							G(ie, (e) => {
								B(k).nav.launcher?.showTitle !== !1 && e(T);
							});
							var ae = R(ie, 2), oe = F(ae), se = L(oe, !0), ce = R(oe, 2), E = F(ce);
							{
								let e = /* @__PURE__ */ A(() => B(k).nav.launcher?.icon ?? ""), t = /* @__PURE__ */ A(() => B(k).nav.launcher?.image ?? ""), n = /* @__PURE__ */ A(Fs), r = /* @__PURE__ */ A(() => Z("opt.launcherDots")), i = /* @__PURE__ */ A(() => Z("tip.nav.launcherIcon"));
								vo(E, {
									get icon() {
										return B(e);
									},
									get image() {
										return B(t);
									},
									get images() {
										return B(n);
									},
									klass: "lbtn-mark",
									get noneLabel() {
										return B(r);
									},
									get label() {
										return B(i);
									},
									onpick: (e) => $(null, e),
									onfile: (e) => Vs(e, null),
									children: (e, t) => {
										var n = Pr(), r = I(n), i = (e) => {
											var t = fp();
											z(() => X(t, "src", B(k).nav.launcher.image)), U(e, t);
										}, a = (e) => {
											var t = Pr();
											K(I(t), () => Wa(B(k).nav.launcher.icon) || ""), U(e, t);
										}, o = (e) => {
											var t = Pr();
											K(I(t), () => As), U(e, t);
										};
										G(r, (e) => {
											B(k).nav.launcher?.image ? e(i) : B(k).nav.launcher?.icon ? e(a, 1) : e(o, -1);
										}), U(e, n);
									},
									$$slots: { default: !0 }
								});
							}
							var le = R(E, 2), ue = F(le), de = (e) => {
								var t = Nr();
								z((e) => W(t, e), [() => Z("mp.ownImage")]), U(e, t);
							}, fe = (e) => {
								var t = Nr();
								z((e) => W(t, e), [() => Z(Ha[B(k).nav.launcher.icon]?.labelKey ?? "common.none")]), U(e, t);
							}, pe = (e) => {
								var t = Nr();
								z((e) => W(t, e), [() => Z("opt.launcherDots")]), U(e, t);
							};
							G(ue, (e) => {
								B(k).nav.launcher?.image ? e(de) : B(k).nav.launcher?.icon ? e(fe, 1) : e(pe, -1);
							}), D(le), D(ce), D(ae);
							var me = R(ae, 2);
							Yr(me, 17, () => B(k).nav.launcher?.links ?? [], Gr, (e, t, n) => {
								let r = /* @__PURE__ */ A(() => B(t).href && !Ol(B(t).href));
								var i = _p();
								let a;
								var o = F(i), s = F(o), c = F(s), l = (e) => {
									var n = Bf();
									z(() => X(n, "src", B(t).image)), U(e, n);
								}, u = (e) => {
									var n = Pr();
									K(I(n), () => Wa(B(t).icon) || ""), U(e, n);
								};
								G(c, (e) => {
									B(t).image ? e(l) : e(u, -1);
								}), D(s);
								var d = R(s, 2), f = L(d, !0), p = R(d, 2), m = (e) => {
									var t = pp();
									K(t, () => C.warn, !0), D(t), z((e) => X(t, "title", e), [() => Z("tip.badTarget")]), U(e, t);
								};
								G(p, (e) => {
									B(r) && e(m);
								});
								var h = R(p, 2), g = F(h);
								g.disabled = n === 0, K(g, () => C.up, !0), D(g);
								var _ = R(g, 2);
								K(_, () => C.down, !0), D(_), D(h);
								var v = R(h, 2);
								K(v, () => C.caret, !0), D(v), D(o);
								var y = R(o, 2), b = (e) => {
									var i = gp(), a = F(i);
									{
										let e = /* @__PURE__ */ A(() => B(t).icon ?? ""), r = /* @__PURE__ */ A(() => B(t).image ?? ""), i = /* @__PURE__ */ A(Fs), o = /* @__PURE__ */ A(() => Z("mp.pickMark"));
										vo(a, {
											get icon() {
												return B(e);
											},
											get image() {
												return B(r);
											},
											get images() {
												return B(i);
											},
											klass: "lrow-tile",
											get label() {
												return B(o);
											},
											onpick: (e) => $(n, e),
											onfile: (e) => Vs(e, n),
											children: (e, n) => {
												var r = mp(), i = I(r), a = F(i), o = (e) => {
													var n = Bf();
													z(() => X(n, "src", B(t).image)), U(e, n);
												}, s = (e) => {
													var n = Pr();
													K(I(n), () => Wa(B(t).icon) || ""), U(e, n);
												};
												G(a, (e) => {
													B(t).image ? e(o) : B(t).icon && e(s, 1);
												}), D(i);
												var c = L(R(i, 2), !0);
												z((e) => W(c, e), [() => B(t).label || Z("seed.link")]), U(e, r);
											},
											$$slots: { default: !0 }
										});
									}
									var o = R(a, 2), s = F(o);
									J(s);
									var c = R(s, 2);
									J(c);
									let l;
									var u = R(c, 2), d = (e) => {
										var t = hp(), n = L(t, !0);
										z((e) => W(n, e), [() => Z("ui.badTarget")]), U(e, t);
									};
									G(u, (e) => {
										B(r) && e(d);
									});
									var f = R(u, 2), p = F(f);
									{
										let e = /* @__PURE__ */ A(() => B(t).icon ?? ""), r = /* @__PURE__ */ A(() => B(t).image ?? ""), i = /* @__PURE__ */ A(Fs), a = /* @__PURE__ */ A(() => Z("mp.pickMark"));
										vo(p, {
											get icon() {
												return B(e);
											},
											get image() {
												return B(r);
											},
											get images() {
												return B(i);
											},
											klass: "linkish",
											get label() {
												return B(a);
											},
											onpick: (e) => $(n, e),
											onfile: (e) => Vs(e, n),
											children: (e, t) => {
												Oe();
												var n = Nr();
												z((e) => W(n, e), [() => Z("mp.changeMark")]), U(e, n);
											},
											$$slots: { default: !0 }
										});
									}
									var m = R(p, 2), h = L(m, !0);
									D(f), D(o), D(i), z((e, n, i, a, o, u) => {
										Y(s, B(t).label), X(s, "title", e), X(s, "placeholder", n), l = q(c, 1, "field-filled svelte-1n46o8q", null, l, { "bad-target": B(r) }), Y(c, B(t).href ?? ""), X(c, "placeholder", i), X(c, "title", a), X(m, "title", o), W(h, u);
									}, [
										() => Z("tip.nav.launcherLabel"),
										() => Z("lbl.text"),
										() => Z("ph.hrefAnchor"),
										() => B(r) ? Z("tip.badTarget") : Z("tip.hrefAnchor"),
										() => Z("tip.removeLink"),
										() => Z("ui.remove")
									]), V("change", s, (e) => Bs(n, "label", e.target.value)), V("change", c, (e) => Bs(n, "href", e.target.value)), V("click", m, () => Rs(n)), U(e, i);
								};
								G(y, (e) => {
									B(Ms) === n && e(b);
								}), D(i), z((e, t, r) => {
									a = q(i, 1, "lrow svelte-1n46o8q", null, a, { open: B(Ms) === n }), W(f, e), X(g, "title", t), X(_, "title", r), _.disabled = n === B(k).nav.launcher.links.length - 1;
								}, [
									() => B(t).label || Z("seed.link"),
									() => Z("tip.moveUp"),
									() => Z("tip.moveDown")
								]), V("click", o, () => N(Ms, B(Ms) === n ? null : n, !0)), V("keydown", o, (e) => {
									(e.key === "Enter" || e.key === " ") && (e.preventDefault(), N(Ms, B(Ms) === n ? null : n, !0));
								}), V("click", h, (e) => e.stopPropagation()), V("keydown", h, (e) => e.stopPropagation()), V("click", g, () => zs(n, -1)), V("click", _, () => zs(n, 1)), U(e, i);
							});
							var he = R(me, 2), ge = L(he, !0);
							D(l), D(i), z((e, t, n, r, i, o, c, l, d, m, h, g) => {
								X(a, "title", e), W(s, t), X(u, "title", n), Ci(f, B(k).nav.launcher?.show === !0), W(p, ` ${r ?? ""}`), W(_, i), X(v, "aria-label", o), X(b, "title", c), W(S, l), Y(w, B(k).nav.launcher?.mobileMax ?? 6), W(ee, B(k).nav.launcher?.mobileMax ?? 6), X(te, "title", d), Ci(ne, B(k).nav.launcher?.showTitle !== !1), W(re, ` ${m ?? ""}`), W(se, h), W(ge, g);
							}, [
								() => Z("tip.nav.launcher"),
								() => Z("group.launcher"),
								() => Z("tip.nav.launcher"),
								() => Z("lbl.showInMenu"),
								() => Z("lbl.design"),
								() => Z("lbl.design"),
								() => Z("tip.nav.launcherMobileMax"),
								() => Z("lbl.launcherMobileMax"),
								() => Z("tip.nav.launcherTitle"),
								() => Z("lbl.launcherShowTitle"),
								() => Z("lbl.launcherButton"),
								() => Z("ui.addLauncherLink")
							]), V("change", f, (e) => Is("show", e.target.checked ? !0 : void 0)), V("input", w, (e) => Is("mobileMax", e.target.valueAsNumber === 6 ? void 0 : e.target.valueAsNumber)), V("change", ne, (e) => Is("showTitle", e.target.checked ? void 0 : !1)), V("click", he, Ls), U(t, i);
						};
						G(a, (e) => {
							n === "theme" ? e(o) : n === "cart" ? e(s, 1) : e(c, -1);
						}), U(t, i);
					}), D(Nn);
				}
				D(An);
				var Ln = R(An, 2), Rn = F(Ln), zn = L(Rn, !0), Bn = R(Rn, 2), Vn = F(Bn), Hn = F(Vn), Un = L(Hn, !0), Wn = R(Hn, 2);
				let Gn;
				Yr(Wn, 21, () => B(Zs), ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ A(() => h(B(t), 2));
					let r = () => B(n)[0], i = () => B(n)[1];
					var a = Uf();
					let o;
					var s = F(a);
					K(s, () => u[r()]);
					var c = L(R(s), !0);
					D(a), z(() => {
						o = q(a, 1, "tile svelte-1n46o8q", null, o, { on: (B(k).nav.style?.subStyle ?? "card") === r() }), X(a, "aria-pressed", (B(k).nav.style?.subStyle ?? "card") === r()), W(c, i());
					}), V("click", a, () => fs("subStyle", r() === "card" ? void 0 : r())), U(e, a);
				}), D(Wn), D(Vn);
				var Kn = R(Vn, 2), qn = (e) => {
					var t = $f(), n = I(t), r = (e) => {
						var t = $f(), n = I(t);
						{
							let e = /* @__PURE__ */ A(() => Z("lbl.sideSubs")), t = /* @__PURE__ */ A(() => Z("tip.nav.sideSubs")), r = /* @__PURE__ */ A(() => B(k).nav.style?.sideSubs ?? "collapsed"), i = /* @__PURE__ */ A(() => [["collapsed", Z("opt.mobileSubs.collapsed")], ["expanded", Z("opt.mobileSubs.expanded")]]);
							ps(n, {
								get label() {
									return B(e);
								},
								get title() {
									return B(t);
								},
								get value() {
									return B(r);
								},
								get options() {
									return B(i);
								},
								onchange: (e) => fs("sideSubs", e === "collapsed" ? void 0 : e)
							});
						}
						var r = R(n, 2), i = (e) => {
							var t = rd(), n = F(t);
							J(n);
							var r = R(n);
							D(t), z((e, i) => {
								X(t, "title", e), Ci(n, B(k).nav.style?.sideSubArrow === !0), W(r, ` ${i ?? ""}`);
							}, [() => Z("tip.nav.sideSubArrow"), () => Z("lbl.sideSubArrow")]), V("change", n, (e) => fs("sideSubArrow", e.target.checked ? !0 : void 0)), U(e, t);
						};
						G(r, (e) => {
							B(k).nav.style?.sideSubs === "expanded" && e(i);
						}), U(e, t);
					};
					G(n, (e) => {
						B(ms) && e(r);
					});
					var i = R(n, 2), a = (e) => {
						{
							let t = /* @__PURE__ */ A(() => Z("lbl.subOpen")), n = /* @__PURE__ */ A(() => Z("tip.nav.subOpen")), r = /* @__PURE__ */ A(() => B(k).nav.style?.subOpen ?? "hover"), i = /* @__PURE__ */ A(() => [
								["hover", Z("opt.subOpen.hover")],
								["stay", Z("opt.subOpen.stay")],
								["click", Z("opt.subOpen.click")]
							]);
							ps(e, {
								get label() {
									return B(t);
								},
								get title() {
									return B(n);
								},
								get value() {
									return B(r);
								},
								get options() {
									return B(i);
								},
								onchange: (e) => fs("subOpen", e === "hover" ? void 0 : e)
							});
						}
					};
					G(i, (e) => {
						(!B(ms) || B(k).nav.style?.sideSubs !== "expanded") && e(a);
					}), U(e, t);
				}, Jn = /* @__PURE__ */ A(() => B(k).nav.items?.some((e) => e.children?.length));
				G(Kn, (e) => {
					B(Jn) && e(qn);
				});
				var Yn = R(Kn, 2), Xn = (e) => {
					var t = Iu(), n = F(t), r = R(n);
					{
						let e = /* @__PURE__ */ A(() => B(k).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ A(ni), n = /* @__PURE__ */ A(() => Z("tip.nav.subPillColorPick"));
						ga(r, {
							get value() {
								return B(e);
							},
							get tokens() {
								return B(t);
							},
							get label() {
								return B(n);
							},
							onchange: (e) => fs("subPillColor", e)
						});
					}
					D(t), z((e, r) => {
						X(t, "title", e), W(n, `${r ?? ""} `);
					}, [() => Z("tip.nav.subPillColor"), () => Z("lbl.subPillColor")]), U(e, t);
				};
				G(Yn, (e) => {
					B(k).nav.style?.subStyle === "pills" && e(Xn);
				});
				var Zn = R(Yn, 2), Qn = F(Zn), $n = R(Qn);
				J($n), D(Zn), D(Bn), D(Ln);
				var er = R(Ln, 2), tr = F(er), nr = L(tr, !0), rr = R(tr, 2);
				{
					let e = (e, t = f) => {
						let n = /* @__PURE__ */ A(vh);
						var r = yp();
						let i;
						var a = F(r);
						K(a, () => Sh, !0), D(a);
						var o = R(a, 2), s = F(o), c = L(s, !0), l = L(R(s, 2), !0);
						D(o), D(r), z(() => {
							i = q(r, 1, "nav-item ghost svelte-1n46o8q", null, i, { child: t() }), W(c, B(n).label), W(l, B(n).target);
						}), U(e, r);
					};
					var ir = F(rr);
					Yr(ir, 21, () => B(k).nav.items, Gr, (t, n, r) => {
						let i = /* @__PURE__ */ A(() => `${r}`);
						var a = Cp(), o = I(a), s = (t) => {
							e(t, () => !1);
						};
						G(o, (e) => {
							B(mh)?.key === B(i) && B(mh).pos === "before" && e(s);
						});
						var c = R(o, 2);
						let l;
						var u = F(c);
						K(u, () => Sh, !0), D(u);
						var d = R(u, 2), f = F(d);
						J(f);
						var p = R(f, 2), m = F(p);
						{
							let e = /* @__PURE__ */ A(() => B(n).page ?? (B(n).href == null ? "__none" : "__href")), t = /* @__PURE__ */ A(() => Z("tip.linkTarget")), i = /* @__PURE__ */ A(() => [
								...B(k).pages.map((e) => [e.id, e.title]),
								["__href", Z("opt.linkHref")],
								...B(n).children ? [["__none", Z("opt.noLink")]] : []
							]);
							Q(m, {
								compact: !0,
								get value() {
									return B(e);
								},
								get title() {
									return B(t);
								},
								get options() {
									return B(i);
								},
								onchange: (e) => ch(r, e)
							});
						}
						var h = R(m, 2), g = (e) => {
							var t = bp();
							J(t), z((e, r) => {
								Y(t, B(n).href), X(t, "placeholder", e), X(t, "title", r);
							}, [() => Z("ph.hrefAnchor"), () => Z("tip.hrefAnchor")]), V("change", t, (e) => lh(r, e.target.value)), U(e, t);
						};
						G(h, (e) => {
							!B(n).page && B(n).href != null && e(g);
						}), D(p), D(d);
						var _ = R(d, 2), v = (e) => {
							var t = xp();
							K(t, () => "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M6 9l6 6 6-6\"/></svg>", !0), D(t), z((e) => X(t, "title", e), [() => Z("tip.nav.hasSubmenu")]), U(e, t);
						};
						G(_, (e) => {
							B(n).children?.length && e(v);
						});
						var y = R(_, 2), b = F(y);
						K(b, () => C.plus, !0), D(b);
						var x = R(b, 2);
						x.disabled = r === 0, K(x, () => C.up, !0), D(x);
						var S = R(x, 2);
						K(S, () => C.cross, !0), D(S);
						var w = R(S, 2);
						K(w, () => C.down, !0), D(w), D(y);
						var ee = R(y, 2);
						K(ee, () => C.kebab, !0), D(ee), D(c);
						var te = R(c, 2);
						Yr(te, 17, () => B(n).children ?? [], Gr, (t, i, a) => {
							let o = /* @__PURE__ */ A(() => `${r}.${a}`);
							var s = Sp(), c = I(s), l = (t) => {
								e(t, () => !0);
							};
							G(c, (e) => {
								B(mh)?.key === B(o) && B(mh).pos === "before" && e(l);
							});
							var u = R(c, 2);
							let d;
							var f = F(u);
							K(f, () => Sh, !0), D(f);
							var p = R(f, 2), m = F(p);
							J(m);
							var h = R(m, 2), g = F(h);
							{
								let e = /* @__PURE__ */ A(() => B(i).page ?? "__href"), t = /* @__PURE__ */ A(() => Z("tip.linkTarget")), n = /* @__PURE__ */ A(() => [...B(k).pages.map((e) => [e.id, e.title]), ["__href", Z("opt.linkHref")]]);
								Q(g, {
									compact: !0,
									get value() {
										return B(e);
									},
									get title() {
										return B(t);
									},
									get options() {
										return B(n);
									},
									onchange: (e) => Eh(r, a, e)
								});
							}
							var _ = R(g, 2), v = (e) => {
								var t = bp();
								J(t), z((e, n) => {
									Y(t, B(i).href ?? ""), X(t, "placeholder", e), X(t, "title", n);
								}, [() => Z("ph.hrefAnchor"), () => Z("tip.hrefAnchor")]), V("change", t, (e) => Dh(r, a, e.target.value)), U(e, t);
							};
							G(_, (e) => {
								B(i).page || e(v);
							}), D(h), D(p);
							var y = R(p, 2), b = F(y);
							b.disabled = a === 0, K(b, () => C.up, !0), D(b);
							var x = R(b, 2);
							K(x, () => C.cross, !0), D(x);
							var S = R(x, 2);
							K(S, () => C.down, !0), D(S), D(y);
							var w = R(y, 2);
							K(w, () => C.kebab, !0), D(w), D(u);
							var ee = R(u, 2), te = (t) => {
								e(t, () => !0);
							};
							G(ee, (e) => {
								B(mh)?.key === B(o) && B(mh).pos === "after" && e(te);
							}), z((e, t, r, s, c, l, p) => {
								d = q(u, 1, "nav-item child svelte-1n46o8q", null, d, {
									selected: B(fh) === B(o),
									dragging: B(ph) === B(o)
								}), X(u, "data-key", B(o)), X(f, "title", e), Y(m, B(i).label), X(m, "title", t), X(b, "title", r), X(x, "title", s), X(S, "title", c), S.disabled = a === B(n).children.length - 1, X(w, "title", l), X(w, "aria-label", p);
							}, [
								() => Z("tip.nav.dragItem"),
								() => Z("tip.nav.childLabel"),
								() => Z("tip.moveUp"),
								() => Z("tip.nav.removeChild"),
								() => Z("tip.moveDown"),
								() => Z("tip.nav.itemActions"),
								() => Z("tip.nav.itemActions")
							]), V("click", u, (e) => {
								e.stopPropagation(), N(fh, B(o));
							}), wr("dragstart", f, (e) => {
								e.stopPropagation(), N(ph, B(o)), e.dataTransfer?.setData("text/plain", B(o));
							}), wr("dragend", f, yh), V("input", m, (e) => Th(r, a, e.target.value)), V("click", b, () => Oh(r, a, -1)), V("click", x, () => kh(r, a)), V("click", S, () => Oh(r, a, 1)), V("click", w, (e) => {
								e.stopPropagation(), N(fh, B(o));
							}), U(t, s);
						});
						var ne = R(te, 2), re = (t) => {
							e(t, () => !0);
						};
						G(ne, (e) => {
							B(mh)?.key === B(i) && B(mh).pos === "into" && e(re);
						});
						var ie = R(ne, 2), T = (t) => {
							e(t, () => !1);
						};
						G(ie, (e) => {
							B(mh)?.key === B(i) && B(mh).pos === "after" && e(T);
						}), z((e, t, a, o, s, d, p, m) => {
							l = q(c, 1, "nav-item svelte-1n46o8q", null, l, {
								selected: B(fh) === B(i),
								dragging: B(ph) === B(i),
								"drop-target": B(mh)?.key === B(i) && B(mh).pos === "into"
							}), X(c, "data-key", B(i)), X(u, "title", e), Y(f, B(n).label), X(f, "title", t), X(b, "title", a), X(x, "title", o), X(S, "title", s), X(w, "title", d), w.disabled = r === B(k).nav.items.length - 1, X(ee, "title", p), X(ee, "aria-label", m);
						}, [
							() => Z("tip.nav.dragItem"),
							() => Z("tip.nav.itemLabel"),
							() => Z("tip.nav.addChild"),
							() => Z("tip.moveUp"),
							() => Z("tip.nav.removeItem"),
							() => Z("tip.moveDown"),
							() => Z("tip.nav.itemActions"),
							() => Z("tip.nav.itemActions")
						]), V("click", c, () => {
							N(fh, B(i));
						}), wr("dragstart", u, (e) => {
							N(ph, B(i)), e.dataTransfer?.setData("text/plain", B(i));
						}), wr("dragend", u, yh), V("input", f, (e) => sh(r, e.target.value)), V("click", b, () => wh(r)), V("click", x, () => uh(r, -1)), V("click", S, () => dh(r)), V("click", w, () => uh(r, 1)), V("click", ee, () => {
							N(fh, B(i));
						}), U(t, a);
					}), D(ir);
					var ar = R(ir, 2), or = L(ar, !0), sr = R(ar, 2), cr = F(sr);
					J(cr);
					var lr = R(cr, 2), ur = L(lr, !0);
					D(sr), D(rr), z((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, ee, te, ne, re, ie, T, ae, oe, se, ce, E, le, ue, de, fe, pe, me, he, ge, _e, ve, ye, be, xe, Se, Ce, we, Te, Ee, De, D, Oe, ke, Ae, je, Me, Ne) => {
						W(or, ke), X(sr, "title", Ae), X(cr, "placeholder", je), lr.disabled = Me, W(ur, Ne);
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
						() => Z("tip.nav.mobileSame"),
						() => Z("group.mobile"),
						() => Z("tip.nav.menuTextSize"),
						() => Z("lbl.navTextSize"),
						() => Z("lbl.navSameAsDesktop"),
						() => Z("tip.nav.mobileSize"),
						() => Z("lbl.size"),
						() => Z("tip.nav.mobileLayout"),
						() => Z("lbl.navPlacement"),
						() => Z("tip.nav.mobileTools"),
						() => Z("lbl.toolsSide"),
						() => Z("tip.nav.mobileInset"),
						() => Z("lbl.navInset"),
						() => Z("tip.nav.mobileOverlay"),
						() => Z("lbl.navOverlay"),
						() => Z("tip.nav.mobileBorder"),
						() => Z("lbl.navBorder"),
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
						() => Z("tip.nav.tools"),
						() => Z("group.tools"),
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
						() => !B(y).trim(),
						() => Z("ui.newPageAsItem")
					]), wr("dragover", ir, bh), wr("drop", ir, (e) => {
						e.preventDefault(), xh(B(mh)?.key ?? "");
					}), V("click", ar, Ch), V("keydown", cr, (e) => {
						e.key === "Enter" && b();
					}), Di(cr, () => B(y), (e) => N(y, e)), V("click", lr, b);
				}
				D(er), D(t), z((e, t, n, r, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, te, ne, re, T, oe, E, le, ue, de, fe, pe, me, he, ge, _e, ve, ye, Se, we, Te, De, D, Oe, ke, Ae, Me, Ie, Le, Re, ze, Ve, He, Ue, We, Ge, Ke, qe, O, Ye) => {
					X(i, "title", e), W(a, t), W(ee, n), W(ie, r), X(ae, "title", o), W(se, s), X(ce, "aria-label", c), X(be, "title", l), W(xe, u), X(Ce, "title", d), W(Ee, f), X(je, "title", p), W(Ne, m), X(Pe, "min", Vo.min), X(Pe, "max", Vo.max), X(Pe, "step", Vo.step), Y(Pe, B(bs)), X(Fe, "min", Vo.min), X(Fe, "max", Vo.max), Y(Fe, B(bs)), W(Be, h), W(Je, g), X($e, "title", _), W(et, v), X(at, "title", y), W(st, b), X(ct, "min", Vo.min), X(ct, "max", Vo.max), X(ct, "placeholder", x), Y(ct, B(k).nav.style?.mobile?.textSize ?? ""), X(ut, "title", S), W(ft, C), X(mt, "title", w), W(gt, te), X(yt, "title", ne), W(xt, re), X(Ct, "title", T), W(Tt, oe), X(Ot, "title", E), W(At, le), X(Mt, "title", ue), W(Pt, de), X(zt, "title", fe), W(Vt, pe), W(Xt, me), W(en, he), X(tn, "aria-label", ge), X(sn, "title", _e), W(ln, ve), X(un, "title", ye), W(fn, Se), X(pn, "title", we), Ci(mn, B(k).nav.style?.blur !== !1), W(hn, ` ${Te ?? ""}`), W(vn, De), X(Sn, "title", D), W(Cn, Oe), X(Tn, "title", ke), Ci(En, B(k).nav.announcement?.show === !0), W(Dn, ` ${Ae ?? ""}`), X(jn, "title", Me), W(Mn, Ie), W(zn, Le), W(Un, Re), Gn = q(Wn, 1, "tile-grid svelte-1n46o8q", null, Gn, {
						"cols-5": !B(ms),
						"cols-3": B(ms)
					}), X(Wn, "aria-label", ze), X(Zn, "title", Ve), W(Qn, `${He ?? ""} `), Y($n, B(k).nav.style?.subColumns ?? 1), X(tr, "title", Ue), W(nr, We);
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
					() => Z("tip.nav.mobileSame"),
					() => Z("group.mobile"),
					() => Z("tip.nav.menuTextSize"),
					() => Z("lbl.navTextSize"),
					() => Z("lbl.navSameAsDesktop"),
					() => Z("tip.nav.mobileSize"),
					() => Z("lbl.size"),
					() => Z("tip.nav.mobileLayout"),
					() => Z("lbl.navPlacement"),
					() => Z("tip.nav.mobileTools"),
					() => Z("lbl.toolsSide"),
					() => Z("tip.nav.mobileInset"),
					() => Z("lbl.navInset"),
					() => Z("tip.nav.mobileOverlay"),
					() => Z("lbl.navOverlay"),
					() => Z("tip.nav.mobileBorder"),
					() => Z("lbl.navBorder"),
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
					() => Z("tip.nav.tools"),
					() => Z("group.tools"),
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
					() => !B(y).trim(),
					() => Z("ui.newPageAsItem")
				]), V("input", Pe, (e) => fs("textSize", e.target.valueAsNumber)), V("change", Fe, (e) => Us(e, "textSize", Vo)), V("change", ct, (e) => Ws(e, "textSize", Vo)), V("change", mn, (e) => fs("blur", e.target.checked)), V("change", En, (e) => ks("show", e.target.checked ? !0 : void 0)), V("change", $n, (e) => fs("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), U(e, t);
			}, S = (e) => {
				var t = kp(), n = F(t), r = F(n), i = R(r);
				J(i), D(n);
				var a = R(n, 2), o = F(a), s = R(o);
				J(s), D(a);
				var c = R(a, 2), l = F(c), u = R(l);
				{
					let e = /* @__PURE__ */ A(as), t = /* @__PURE__ */ A(os);
					Q(u, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => ss(e)
					});
				}
				D(c);
				var d = R(c, 4), f = L(d, !0), p = R(d, 2), m = F(p);
				Yr(m, 17, () => B(Do), (e) => e.screen, (e, t) => {
					var n = Tp(), r = F(n), i = L(r, !0), a = R(r, 2);
					let o;
					var s = L(a), c = L(R(a, 2), !0);
					D(n), z(() => {
						W(i, B(t).screen), o = q(a, 1, "cw-bar svelte-1n46o8q", null, o, { fluid: !B(t).bound }), vi(s, `width:${B(t).pct ?? ""}%`), W(c, B(t).bound ? `${B(t).margin}` : "-");
					}), U(e, n);
				});
				var h = R(m, 2), g = F(h), _ = L(g, !0), v = L(R(g, 2), !0);
				D(h);
				var y = R(h, 2), b = (e) => {
					var t = Ep(), n = L(t, !0);
					z((e) => W(n, e), [() => Z("lbl.bindsFrom", { n: B(Ne) })]), U(e, t);
				};
				G(y, (e) => {
					B(mo) !== "full" && e(b);
				}), D(p);
				var x = R(p, 2);
				Yr(x, 21, () => No, (e) => e.id, (e, t) => {
					var n = Cf();
					let r;
					var i = L(n, !0);
					z((e) => {
						r = q(n, 1, "svelte-1n46o8q", null, r, { on: B(go) === B(t).id }), W(i, e);
					}, [() => Z(`lbl.width.${B(t).id}`)]), V("click", n, () => $o(B(t).width)), U(e, n);
				}), D(x);
				var S = R(x, 2), w = (e) => {
					var t = Dp(), n = F(t), r = L(n, !0), i = R(n, 2);
					J(i);
					var a = L(R(i, 2));
					D(t), z((e, n) => {
						X(t, "title", e), W(r, n), X(i, "min", 960), X(i, "max", jo), X(i, "step", 20), Y(i, B(Eo)), W(a, `${B(Eo) ?? ""} px`);
					}, [() => Z("tip.site.contentWidthFree"), () => Z("lbl.widthFree")]), V("input", i, (e) => $o(e.target.valueAsNumber)), U(e, t);
				};
				G(S, (e) => {
					B(mo) !== "full" && e(w);
				});
				var ee = R(S, 2), te = L(ee, !0), ne = R(ee, 2);
				Yr(ne, 21, () => Mo, (e) => e.id, (e, t) => {
					var n = Cf();
					let r;
					var i = L(n, !0);
					z((e) => {
						r = q(n, 1, "svelte-1n46o8q", null, r, { on: B(_o) === B(t).id }), W(i, e);
					}, [() => Z(`lbl.gutter.${B(t).id}`)]), V("click", n, () => es(B(t).gutter)), U(e, n);
				}), D(ne);
				var re = R(ne, 2), ie = F(re), T = L(ie, !0), ae = R(ie, 2), oe = F(ae), se = F(oe), ce = L(se, !0), E = R(se, 2);
				J(E);
				var le = L(R(E, 2));
				D(oe), D(ae), D(re);
				var ue = R(re, 4), de = F(ue), fe = R(de), pe = (e) => {
					var t = Pf();
					z((e) => {
						X(t, "src", B(k).site.icon), X(t, "alt", e);
					}, [() => Z("lbl.siteIcon")]), U(e, t);
				};
				G(fe, (e) => {
					B(k).site.icon && e(pe);
				}), D(ue);
				var me = R(ue, 2), he = F(me), ge = F(he), _e = R(ge);
				D(he);
				var ve = R(he, 2), ye = (e) => {
					var t = Op(), n = I(t);
					K(n, () => C.pencil ?? "✎", !0), D(n);
					var r = R(n, 2);
					K(r, () => C.cross, !0), D(r), z((e, t) => {
						X(n, "title", e), X(r, "title", t);
					}, [() => Z("tip.site.editIcon"), () => Z("tip.site.removeIcon")]), V("click", n, () => N(oo, B(k).site.icon, !0)), V("click", r, lo), U(e, t);
				};
				G(ve, (e) => {
					B(k).site.icon && e(ye);
				}), D(me), D(t), z((e, t, u, p, m, h, g, y, b, x, S, C, w, ne, ie, ae, se, ue, fe, pe) => {
					X(n, "title", e), W(r, `${t ?? ""} `), Y(i, B(k).site.title ?? ""), X(i, "placeholder", u), X(a, "title", p), W(o, `${m ?? ""} `), Y(s, B(k).site.description ?? ""), X(s, "placeholder", h), X(c, "title", g), W(l, `${y ?? ""} `), X(d, "title", b), W(f, x), W(_, S), W(v, C), X(ee, "title", w), W(te, ne), re.open = B(_o) === null || B(bo), W(T, ie), X(oe, "title", ae), W(ce, se), X(E, "min", 0), X(E, "max", 12), X(E, "step", 1), Y(E, B(ho)), W(le, `${B(ho) ?? ""} vw`), W(de, `${ue ?? ""} `), X(he, "title", fe), W(ge, `${pe ?? ""} `);
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
					() => B(k).site.icon ? Z("ui.changeIcon") : Z("ui.chooseIcon")
				]), V("input", i, (e) => uo(e.target.value)), V("input", s, (e) => fo(e.target.value)), wr("toggle", re, (e) => N(bo, e.currentTarget.open, !0)), V("input", E, (e) => es(e.target.valueAsNumber)), V("change", _e, so), U(e, t);
			}, w = (e) => {
				var t = Lp();
				{
					let e = (e, t = f, n = f) => {
						var r = jp(), i = F(r), a = (e) => {
							var t = Ap(), r = L(t, !0);
							z(() => W(r, n())), U(e, t);
						};
						G(i, (e) => {
							n() && e(a);
						});
						var o = R(i, 2), s = F(o), c = L(s, !0), l = R(s, 2), u = L(l, !0), d = R(l, 2), p = F(d), m = L(p, !0), h = L(R(p), !0);
						D(d), D(o), D(r), z((e, t, n, r, i, a, s, l, d) => {
							vi(o, `--tv-bg:${e ?? ""};--tv-surface:${t ?? ""};--tv-text:${n ?? ""};--tv-accent:${r ?? ""};--tv-accent-ink:${i ?? ""}`), W(c, a), W(u, s), W(m, l), W(h, d);
						}, [
							() => Qh(t().bg, t()),
							() => Qh(t().surface, t()),
							() => Qh(t().text, t()),
							() => Qh(t().accent, t()),
							() => Qh(t()["accent-text"] ?? re(Qh(t().accent ?? "#000000", t())), t()),
							() => Z("preview.heading"),
							() => Z("preview.cardBody"),
							() => Z("preview.button"),
							() => Z("preview.link")
						]), U(e, r);
					};
					var n = F(t), r = L(n, !0), i = R(n, 2);
					Yr(i, 21, () => eg, (e) => e.id, (e, t) => {
						var n = Mp();
						let r;
						var i = F(n), a = F(i), o = R(a), s = R(o), c = R(s);
						D(i);
						var l = L(R(i, 2), !0);
						D(n), z(() => {
							r = q(n, 1, "theme-preset svelte-1n46o8q", null, r, { sel: B(ng) === B(t).id }), X(n, "title", `${B(t).name} - ${B(t).note}`), vi(a, `background:${B(t).light.bg ?? ""}`), vi(o, `background:${B(t).light.surface ?? ""}`), vi(s, `background:${B(t).light.accent ?? ""}`), vi(c, `background:${B(t).light.text ?? ""}`), W(l, B(t).name);
						}), V("click", n, () => tg(B(t))), U(e, n);
					}), D(i);
					var a = R(i, 2), o = L(a, !0), s = R(a, 2), c = F(s);
					J(c);
					var l = R(c);
					D(s);
					var u = R(s, 2), d = (e) => {
						var t = Np(), n = F(t), r = L(n, !0), i = R(n, 2), a = F(i);
						let o;
						var s = L(a, !0), c = R(a, 2);
						let l;
						var u = L(c, !0);
						D(i), D(t), z((e, t, n, i) => {
							W(r, e), X(a, "title", t), o = q(a, 1, "svelte-1n46o8q", null, o, { on: B(ai) }), W(s, n), l = q(c, 1, "svelte-1n46o8q", null, l, { on: !B(ai) }), W(u, i);
						}, [
							() => Z("lbl.darkColors"),
							() => Z("hint.theme.autoDark"),
							() => Z("opt.auto"),
							() => Z("opt.custom")
						]), V("click", a, () => Jh(!0)), V("click", c, () => Jh(!1)), U(e, t);
					};
					G(u, (e) => {
						B(ii) && e(d);
					});
					var p = R(u, 2), m = F(p), g = (e) => {
						var t = Pp(), n = L(t, !0);
						z((e) => W(n, e), [() => Z("lbl.light")]), U(e, t);
					};
					G(m, (e) => {
						B(ii) && e(g);
					});
					var _ = R(m, 2);
					let Ie;
					var v = L(_, !0);
					D(p);
					var y = R(p, 2);
					Yr(y, 21, () => ri, ([e, t, n]) => e, (e, t) => {
						var n = /* @__PURE__ */ A(() => h(B(t), 3));
						let r = () => B(n)[0], i = () => B(n)[1], a = () => B(n)[2];
						var o = Fp(), s = F(o);
						{
							let e = /* @__PURE__ */ A(() => B(k).theme.tokens.color[r()] ?? jh(r(), B(si))), t = /* @__PURE__ */ A(ni);
							ga(s, {
								get value() {
									return B(e);
								},
								get tokens() {
									return B(t);
								},
								get label() {
									return i();
								},
								onchange: (e) => Ah(r(), e)
							});
						}
						var c = R(s, 2), l = L(c, !0), u = L(R(c, 2), !0);
						D(o), z((e) => {
							W(l, a()), W(u, e);
						}, [() => Qh(B(k).theme.tokens.color[r()] ?? jh(r(), B(si)), B(si))]), U(e, o);
					}), D(y);
					var b = R(y, 2), x = (e) => {
						var t = Ip(), n = I(t), r = F(n), i = L(r, !0), a = R(r, 2);
						let o;
						var s = L(a, !0);
						D(n);
						var c = R(n, 2);
						let l;
						Yr(c, 21, () => ri, ([e, t, n]) => e, (e, t) => {
							var n = /* @__PURE__ */ A(() => h(B(t), 3));
							let r = () => B(n)[0], i = () => B(n)[1], a = () => B(n)[2];
							var o = Fp(), s = F(o);
							{
								let e = /* @__PURE__ */ A(() => B(k).theme.alt.tokens.color[r()] ?? B(ci)[r()] ?? jh(r(), B(ci))), t = /* @__PURE__ */ A(ni), n = /* @__PURE__ */ A(() => Z("theme.darkColorLabel", { name: i() }));
								ga(s, {
									get value() {
										return B(e);
									},
									get tokens() {
										return B(t);
									},
									get label() {
										return B(n);
									},
									onchange: (e) => Gh(r(), e)
								});
							}
							var c = R(s, 2), l = L(c, !0), u = L(R(c, 2), !0);
							D(o), z((e) => {
								W(l, a()), W(u, e);
							}, [() => Qh(B(k).theme.alt.tokens.color[r()] ?? B(ci)[r()] ?? jh(r(), B(ci)), B(ci))]), U(e, o);
						}), D(c), z((e, t, n) => {
							W(i, e), o = q(a, 1, "chip svelte-1n46o8q", null, o, { accent: B(oi) === "dark" }), X(a, "title", t), W(s, n), l = q(c, 1, "palcells svelte-1n46o8q", null, l, { autopal: B(ai) });
						}, [
							() => Z("lbl.dark"),
							() => Z("tip.theme.darkDefault"),
							() => Z("common.standard")
						]), V("click", a, () => Kh("dark")), U(e, t);
					};
					G(b, (e) => {
						B(ii) && e(x);
					});
					var S = R(b, 2), C = F(S), w = L(C, !0), ee = R(C, 2);
					let Le;
					var te = L(ee, !0);
					D(S);
					var ne = R(S, 2), ie = F(ne);
					{
						let t = /* @__PURE__ */ A(() => B(ii) ? Z("lbl.light") : "");
						e(ie, () => B(si), () => B(t));
					}
					var T = R(ie, 2), ae = (t) => {
						{
							let n = /* @__PURE__ */ A(() => Z("lbl.dark"));
							e(t, () => B(ci), () => B(n));
						}
					};
					G(T, (e) => {
						B(ii) && e(ae);
					}), D(ne);
					var oe = R(ne, 2), se = F(oe), ce = L(se, !0), E = R(se, 2), le = F(E), ue = F(le), de = R(ue);
					{
						let e = /* @__PURE__ */ A(() => Yh("heading"));
						Q(de, {
							get value() {
								return B(k).theme.tokens.font.heading;
							},
							get options() {
								return B(e);
							},
							onchange: (e) => Vh("heading", e)
						});
					}
					D(le);
					var fe = R(le, 2), pe = F(fe), me = R(pe);
					{
						let e = /* @__PURE__ */ A(() => Yh("body"));
						Q(me, {
							get value() {
								return B(k).theme.tokens.font.body;
							},
							get options() {
								return B(e);
							},
							onchange: (e) => Vh("body", e)
						});
					}
					D(fe);
					var he = R(fe, 2), ge = F(he), _e = L(ge, !0), ve = R(ge, 2), ye = L(ve, !0);
					D(he), D(E), D(oe);
					var be = R(oe, 2), xe = F(be), Se = L(xe, !0), Ce = R(xe, 2), we = F(Ce), Te = F(we), Ee = L(Te, !0), De = L(R(Te, 2), !0);
					D(we);
					var Oe = R(we, 2), ke = F(Oe, !0), Ae = L(R(ke), !0);
					D(Oe);
					var je = R(Oe, 2);
					J(je);
					var Me = R(je, 2), Ne = F(Me, !0), Pe = L(R(Ne), !0);
					D(Me);
					var Fe = R(Me, 2);
					J(Fe), D(Ce), D(be), D(t), z((e, t, n, i, a, u, d, f, p, m, h, g, y, b, x, C, ne, re, ie, T, ae) => {
						W(r, e), W(o, t), X(s, "title", n), Ci(c, B(ii)), W(l, ` ${i ?? ""}`), Ie = q(_, 1, "chip svelte-1n46o8q", null, Ie, { accent: B(oi) === "light" }), X(_, "title", a), W(v, u), X(S, "title", d), W(w, f), Le = q(ee, 1, "chip palauto svelte-1n46o8q", null, Le, { accent: B(Mh) }), W(te, p), W(ce, m), W(ue, `${h ?? ""} `), W(pe, `${g ?? ""} `), vi(ge, `font-family:${B(k).theme.tokens.font.heading ?? ""}`), W(_e, y), vi(ve, `font-family:${B(k).theme.tokens.font.body ?? ""}`), W(ye, b), W(Se, x), vi(we, `--r-sm:${B(k).theme.tokens.radius.sm ?? ""};--r-md:${B(k).theme.tokens.radius.md ?? ""}`), W(Ee, C), W(De, ne), W(ke, re), W(Ae, B(k).theme.tokens.radius.sm), Y(je, ie), W(Ne, T), W(Pe, B(k).theme.tokens.radius.md), Y(Fe, ae);
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
						() => Xh(B(k).theme.tokens.radius.sm),
						() => Z("lbl.largeCorners"),
						() => Xh(B(k).theme.tokens.radius.md)
					]), V("change", c, (e) => qh(e.target.checked)), V("click", _, () => Kh("light")), V("click", ee, () => Bh(!B(Mh))), V("input", je, (e) => Zh("sm", Number(e.target.value))), V("input", Fe, (e) => Zh("md", Number(e.target.value)));
				}
				U(e, t);
			}, ee = (e) => {
				var t = Hp();
				let n;
				var r = F(t);
				J(r);
				var i = R(r, 2), a = (e) => {
					var t = Pr();
					Yr(I(t), 17, () => Yc(Og(), B(Dg), (e) => e.label), (e) => e.label, (e, t) => {
						var n = Pr(), r = I(n), i = (e) => {
							var n = Rp(), r = F(n), i = R(r);
							D(n), z((e) => {
								X(n, "title", e), W(r, `${B(t).label ?? ""} `);
							}, [() => Z("tip.webpAuto")]), V("change", i, jg), U(e, n);
						}, a = (e) => {
							var n = zp(), r = F(n), i = R(r);
							D(n), z((e) => {
								X(n, "title", e), W(r, `${B(t).label ?? ""} `);
							}, [() => Z("tip.blocks.galleryImages")]), V("change", i, Fg), U(e, n);
						}, o = (e) => {
							var n = ad(), r = L(n, !0);
							z(() => W(r, B(t).label)), V("click", n, () => kg(B(t))), U(e, n);
						};
						G(r, (e) => {
							B(t).act === "image" ? e(i) : B(t).act === "galleryImages" ? e(a, 1) : e(o, -1);
						}), U(e, n);
					}, (e) => {
						var t = zu(), n = L(t, !0);
						z((e) => W(n, e), [() => Z("canvas.searchEmpty")]), U(e, t);
					}), U(e, t);
				}, o = /* @__PURE__ */ A(() => B(Dg).trim()), s = (e) => {
					var t = Vp(), n = I(t), r = F(n), i = L(r, !0), a = R(r, 2), o = F(a), s = L(o, !0), c = R(o, 2), l = L(c, !0);
					D(a), D(n);
					var u = R(n, 2), d = L(u, !0), f = R(u, 2), p = F(f), m = R(p);
					D(f);
					var h = R(f, 2), g = L(h, !0), _ = R(h, 2), v = L(_, !0), y = R(_, 2), b = L(y, !0), x = R(y, 2), S = L(x, !0), C = R(x, 2), w = L(C, !0), ee = R(C, 2), te = L(ee, !0), ne = R(ee, 2), re = L(ne, !0), ie = R(ne, 2), T = L(ie, !0), ae = R(ie, 2), oe = L(ae, !0), se = R(ae, 2), ce = L(se, !0), E = R(se, 2), le = L(E, !0), ue = R(E, 2), de = L(ue, !0), fe = R(ue, 2), pe = L(fe, !0), me = R(fe, 2), he = L(me, !0), ge = R(me, 2), _e = L(ge, !0), ve = R(ge, 2), ye = L(ve, !0), be = R(ve, 2), xe = L(be, !0), Se = R(be, 2), Ce = F(Se), we = L(Ce, !0), Te = R(Ce, 2), Ee = F(Te), De = L(Ee, !0), Oe = R(Ee, 2), ke = F(Oe), Ae = R(ke);
					D(Oe), D(Te), D(Se);
					var je = R(Se, 2), Me = F(je), Ne = L(Me, !0), Pe = R(Me, 2), Fe = F(Pe), Ie = L(Fe, !0), Le = R(Fe, 2), Re = L(Le, !0), ze = R(Le, 2), Be = L(ze, !0), Ve = R(ze, 2), He = L(Ve, !0);
					D(Pe), D(je);
					var Ue = R(je, 2), We = F(Ue), Ge = L(We, !0), Ke = R(We, 2), qe = F(Ke), Je = L(qe, !0), O = R(qe, 2), Ye = L(O, !0), Xe = R(O, 2), Ze = L(Xe, !0), k = R(Xe, 2), $e = L(k, !0), et = R(k, 2), tt = L(et, !0);
					D(Ke), D(Ue);
					var nt = R(Ue, 2), rt = (e) => {
						let t = /* @__PURE__ */ A(() => B(Tc).filter((e) => vc[e]?.data?.mal?.kind === "blocks"));
						var n = Bp(), r = F(n), i = L(r, !0), a = R(r, 2);
						Yr(a, 20, () => B(t), (e) => e, (e, t) => {
							var n = ad(), r = L(n, !0);
							z((e) => {
								X(n, "title", e), W(r, vc[t].data.mal.name);
							}, [() => Z("canvas.insertGroup")]), V("click", n, () => Qe?.sendInsertTemplate(t)), U(e, n);
						}), D(a), D(n), z((e) => W(i, e), [() => Z("canvas.tabMyTemplates")]), U(e, n);
					}, it = /* @__PURE__ */ A(() => B(Tc).some((e) => vc[e]?.data?.mal?.kind === "blocks"));
					G(nt, (e) => {
						B(it) && e(rt);
					});
					var at = R(nt, 2), ot = (e) => {
						var t = Bp(), n = F(t), r = L(n, !0), i = R(n, 2);
						Yr(i, 21, () => B(wg), (e) => e.type, (e, t) => {
							var n = Pr(), r = I(n), i = (e) => {
								var n = Bp(), r = F(n), i = L(r, !0), a = R(r, 2);
								Yr(a, 21, () => B(t).variants, (e) => e.label, (e, n) => {
									var r = ad(), i = L(r, !0);
									z((e) => {
										X(r, "title", e), W(i, B(n).label);
									}, [() => Z("tip.blocks.fromPlugin", { plugin: B(t).plugin })]), V("click", r, () => Eg(B(t), B(n).props)), U(e, r);
								}), D(a), D(n), z(() => W(i, B(t).label)), U(e, n);
							}, a = (e) => {
								var n = ad(), r = L(n, !0);
								z((e) => {
									X(n, "title", e), W(r, B(t).label);
								}, [() => Z("tip.blocks.fromPlugin", { plugin: B(t).plugin })]), V("click", n, () => Eg(B(t))), U(e, n);
							};
							G(r, (e) => {
								B(t).variants?.length ? e(i) : e(a, -1);
							}), U(e, n);
						}), D(i), D(t), z((e) => W(r, e), [() => Z("panel.plugins")]), U(e, t);
					};
					G(at, (e) => {
						B(wg).length && e(ot);
					}), z((e, t, n, r, a, o, u, m, Se, Ce, Te, D, Ae, je, Me, Pe, Ue, We, Ke, qe, O, Xe, Qe, k, et, nt, rt, it, at, ot, st, ct, lt, ut, dt, ft, pt, mt, ht, gt, _t, vt, yt, bt, xt, A, St, Ct, wt, Tt, Et, Dt, Ot, kt, At, jt, Mt, Nt, Pt, Ft, It) => {
						W(i, e), W(s, t), X(c, "title", n), W(l, r), W(d, a), X(f, "title", o), W(p, `${u ?? ""} `), X(h, "title", m), W(g, Se), X(_, "title", Ce), W(v, Te), X(y, "title", D), W(b, Ae), X(x, "title", je), W(S, Me), X(C, "title", Pe), W(w, Ue), X(ee, "title", We), W(te, Ke), X(ne, "title", qe), W(re, O), X(ie, "title", Xe), W(T, Qe), X(ae, "title", k), W(oe, et), X(se, "title", nt), W(ce, rt), X(E, "title", it), W(le, at), X(ue, "title", ot), W(de, st), X(fe, "title", ct), W(pe, lt), X(me, "title", ut), W(he, dt), X(ge, "title", ft), W(_e, pt), X(ve, "title", mt), W(ye, ht), X(be, "title", gt), W(xe, _t), W(we, vt), X(Ee, "title", yt), W(De, bt), X(Oe, "title", xt), W(ke, `${A ?? ""} `), W(Ne, St), X(Fe, "title", Ct), W(Ie, wt), X(Le, "title", Tt), W(Re, Et), X(ze, "title", Dt), W(Be, Ot), X(Ve, "title", kt), W(He, At), W(Ge, jt), W(Je, Mt), W(Ye, Nt), W(Ze, Pt), W($e, Ft), W(tt, It);
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
						() => Z("tip.blocks.ribbon"),
						() => Z("blocks.ribbon"),
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
					]), V("click", o, () => Cg("text")), V("click", c, () => Cg("text-box")), V("click", u, () => Cg("button")), V("change", m, jg), V("click", h, () => Cg("video")), V("click", _, () => Cg("icon")), V("click", y, () => Cg("map")), V("click", x, () => Cg("form")), V("click", C, () => Cg("collection")), V("click", ee, () => Cg("faq")), V("click", ne, () => Cg("timeline")), V("click", ie, () => Cg("quote")), V("click", ae, () => Cg("stats")), V("click", se, () => Cg("ribbon")), V("click", E, () => Cg("table")), V("click", ue, () => Cg("share")), V("click", fe, () => Cg("countdown")), V("click", me, () => Cg("audio")), V("click", ge, () => Cg("product")), V("click", ve, () => Cg("cart")), V("click", be, () => Cg("checkout")), V("click", Ee, () => Cg("gallery")), V("change", Ae, Fg), V("click", Fe, () => Cg("calendar")), V("click", Le, () => Cg("calendar-cards")), V("click", ze, () => Cg("calendar-month")), V("click", Ve, () => Cg("calendar-next")), V("click", qe, () => Cg("shape-line")), V("click", O, () => Cg("shape-arrow")), V("click", Xe, () => Cg("shape-circle")), V("click", k, () => Cg("shape-rect")), V("click", et, () => Cg("shape-triangle")), U(e, t);
				};
				G(i, (e) => {
					B(o) ? e(a) : e(s, -1);
				}), D(t), z((e, i, a) => {
					n = q(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: B(Ee) === "mobile" }), X(t, "title", e), X(r, "placeholder", i), X(r, "title", a);
				}, [
					() => B(Ee) === "mobile" ? Z("tip.blocks.mobileLocked") : void 0,
					() => Z("canvas.searchBlocks"),
					() => Z("canvas.searchBlocks")
				]), Di(r, () => B(Dg), (e) => N(Dg, e)), U(e, t);
			}, te = (e) => {
				var t = Up(), n = F(t), r = F(n), i = L(R(r));
				D(n);
				var a = R(n, 2);
				J(a);
				var o = R(a, 2), s = F(o);
				J(s);
				var c = R(s);
				D(o), D(t), z((e, t) => {
					W(r, `${e ?? ""} `), W(i, `${B(pe).size ?? ""} px`), Y(a, B(pe).size), Ci(s, B(pe).snap !== !1), W(c, ` ${t ?? ""}`);
				}, [() => Z("lbl.gridSize"), () => Z("lbl.gridSnap")]), V("input", a, (e) => Ai("size", Number(e.target.value))), V("change", s, (e) => Ai("snap", e.target.checked)), U(e, t);
			}, ne = (e) => {
				var t = Xp(), r = F(t), i = (e) => {
					var t = Wp(), n = I(t), r = L(n, !0), i = R(n, 2);
					a(i), z((e) => W(r, e), [() => Z("blocks.suffix", { label: qn[B(j).type] ?? B(j).type })]), U(e, t);
				}, o = (e) => {
					var t = Yp(), r = I(t), i = L(r, !0), a = R(r, 2), o = F(a), s = R(o);
					J(s), D(a);
					var c = R(a, 4), l = F(c);
					J(l);
					var u = R(l);
					D(c);
					var d = R(c, 2), f = (e) => {
						var t = Gp(), n = I(t), r = F(n), i = L(R(r));
						D(n);
						var a = R(n, 2);
						J(a), z((e) => {
							W(r, `${e ?? ""} `), W(i, `${B(Zn).size ?? ""} px`), Y(a, B(Zn).size);
						}, [() => Z("lbl.gridSize")]), V("input", a, (e) => ki("size", Number(e.target.value))), U(e, t);
					};
					G(d, (e) => {
						B(Zn) && e(f);
					});
					var p = R(d, 4), m = L(p, !0), g = R(p, 2);
					Yr(g, 21, () => [["", "common.standard"], ...Object.entries(rl)], ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ A(() => h(B(t), 2));
						let r = () => B(n)[0], i = () => B(n)[1], a = /* @__PURE__ */ A(() => cr(r()));
						var o = Kp();
						let s;
						var c = F(o), l = F(c), u = R(l, 2), d = R(u, 2);
						D(c);
						var f = L(R(c, 2), !0);
						D(o), z((e, t) => {
							s = q(o, 1, "rs-card svelte-1n46o8q", null, s, { on: B(nr) === r() }), X(o, "title", e), vi(c, `background: ${B(a).bg ?? ""}`), vi(l, `background: ${B(a).text ?? ""}`), vi(u, `background: ${B(a).surface ?? ""}`), vi(d, `background: ${B(a).accent ?? ""}`), W(f, t);
						}, [() => Z("tip.props.sectionTheme"), () => Z(i())]), V("click", o, () => sr(r())), U(e, o);
					}), D(g);
					var _ = R(g, 2), v = F(_), y = R(v), b = F(y), x = L(b), S = R(b, 2);
					K(S, () => C.copy, !0), D(S), D(y), D(_);
					var w = R(_, 4), ee = L(w, !0), te = R(w, 2);
					n(te, () => B(Xr), () => B($n));
					var ne = R(te, 4), re = F(ne), ie = R(re);
					{
						let e = /* @__PURE__ */ A(() => di(B(er)) ? B(er).type : "");
						Q(ie, {
							get value() {
								return B(e);
							},
							get options() {
								return fi;
							},
							onchange: (e) => bi(e || null)
						});
					}
					D(ne);
					var T = R(ne, 2), ae = (e) => {
						var t = Jp(), n = I(t), r = F(n), i = R(r);
						J(i), D(n);
						var a = R(n, 2), o = F(a), s = R(o);
						J(s), D(a);
						var c = R(a, 2), l = (e) => {
							var t = qp(), n = I(t), r = F(n), i = R(r);
							{
								let e = /* @__PURE__ */ A(() => B(er).props.effect ?? "slide-up"), t = /* @__PURE__ */ A(() => [
									["fade-in", Z("anim.fadeIn")],
									["slide-up", Z("anim.slideUp")],
									["zoom-in", Z("anim.zoomIn")]
								]);
								Q(i, {
									get value() {
										return B(e);
									},
									get options() {
										return B(t);
									},
									onchange: (e) => wi("effect", e)
								});
							}
							D(n);
							var a = R(n, 2), o = F(a), s = R(o);
							J(s), D(a);
							var c = R(a, 2), l = F(c), u = R(l);
							{
								let e = /* @__PURE__ */ A(() => B(er).props.pattern ?? "sequence"), t = /* @__PURE__ */ A(() => [
									["sequence", Z("opt.stagger.sequence")],
									["columns", Z("opt.stagger.columns")],
									["rows", Z("opt.stagger.rows")],
									["center", Z("opt.stagger.center")]
								]);
								Q(u, {
									get value() {
										return B(e);
									},
									get options() {
										return B(t);
									},
									onchange: (e) => wi("pattern", e)
								});
							}
							D(c), z((e, t, i, u, d, f) => {
								X(n, "title", e), W(r, `${t ?? ""} `), X(a, "title", i), W(o, `${u ?? ""} `), Y(s, B(er).props.step ?? 90), X(c, "title", d), W(l, `${f ?? ""} `);
							}, [
								() => Z("tip.props.staggerEffect"),
								() => Z("lbl.staggerEffect"),
								() => Z("tip.props.staggerStep"),
								() => Z("lbl.stepMs"),
								() => Z("tip.props.staggerPattern"),
								() => Z("lbl.pattern")
							]), V("change", s, (e) => Si("step", Number(e.target.value))), U(e, t);
						};
						G(c, (e) => {
							B(er).type === "stagger" && e(l);
						}), z((e, t) => {
							W(r, `${e ?? ""} `), Y(i, B(er).props.duration), W(o, `${t ?? ""} `), Y(s, B(er).props.delay ?? 0);
						}, [() => Z("lbl.durationMs"), () => Z("lbl.delayMs")]), V("change", i, (e) => Si("duration", Number(e.target.value))), V("change", s, (e) => Si("delay", Number(e.target.value))), U(e, t);
					}, oe = /* @__PURE__ */ A(() => di(B(er)));
					G(T, (e) => {
						B(oe) && e(ae);
					});
					var se = R(T, 2), ce = F(se), E = R(ce);
					{
						let e = /* @__PURE__ */ A(() => B(tr)?.type ?? (B(er) && !di(B(er)) ? B(er).type : ""));
						Q(E, {
							get value() {
								return B(e);
							},
							get options() {
								return mi;
							},
							onchange: (e) => xi(e || null)
						});
					}
					D(se), z((e, t, n, r, c, d, f, h, g, y, b, C, w, te, ie) => {
						W(i, e), X(a, "title", t), W(o, `${n ?? ""} `), Y(s, B(Qn)), X(s, "placeholder", r), Ci(l, B(Zn) !== null), W(u, ` ${c ?? ""}`), X(p, "title", d), W(m, f), X(_, "title", h), W(v, `${g ?? ""} `), W(x, `#${B(Xn) ?? ""}`), X(S, "title", y), W(ee, b), X(ne, "title", C), W(re, `${w ?? ""} `), X(se, "title", te), W(ce, `${ie ?? ""} `);
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
					]), V("change", s, (e) => Ti(e.target.value)), V("change", l, (e) => Oi(e.target.checked)), V("click", S, () => navigator.clipboard?.writeText(`#${B(Xn)}`)), U(e, t);
				}, s = (e) => {
					var t = zu(), n = L(t, !0);
					z((e) => W(n, e), [() => Z("hint.props.empty")]), U(e, t);
				};
				G(r, (e) => {
					B(j) ? e(i) : B(Xn) ? e(o, 1) : e(s, -1);
				}), D(t), U(e, t);
			}, ie = (e) => {
				var t = im(), i = F(t), a = F(i);
				J(a);
				var o = R(a);
				D(i);
				var s = R(i, 2), c = (e) => {
					var t = Bp(), n = F(t), r = L(n, !0), i = R(n, 2);
					Yr(i, 21, () => B(k).pages ?? [], (e) => e.id, (e, t) => {
						var n = rd(), r = F(n);
						J(r);
						var i = R(r);
						D(n), z((e, a) => {
							X(n, "title", e), Ci(r, a), W(i, ` ${(B(t).title || B(t).id) ?? ""}`);
						}, [() => Z("tip.footer.hideOnPage"), () => !(B(k).footer?.hideOn ?? []).includes(B(t).id)]), V("change", r, (e) => Wm(B(t).id, e.target.checked)), U(e, n);
					}), D(i), D(t), z((e) => W(r, e), [() => Z("group.showOnPages")]), U(e, t);
				};
				G(s, (e) => {
					B(k).footer?.show && e(c);
				});
				var l = R(s, 2), u = F(l), d = L(u, !0), f = R(u, 2), p = F(f);
				Yr(p, 21, () => $l, (e) => e.id, (e, t) => {
					var n = Zp(), r = F(n);
					K(r, () => uu(B(t).thumb), !0), D(r);
					var i = L(R(r, 2), !0);
					D(n), z((e) => {
						X(n, "title", e), W(i, B(t).label);
					}, [() => Z("tip.footer.template", { label: B(t).label })]), V("click", n, () => tu(B(t).id)), U(e, n);
				}), D(p), D(f), D(l);
				var m = R(l, 2), h = F(m), g = L(h, !0), _ = R(h, 2), v = F(_), y = F(v), b = R(y);
				J(b), D(v);
				var x = R(v, 2), S = F(x), w = R(S);
				J(w), D(x);
				var ee = R(x, 2), te = F(ee), ne = R(te);
				{
					let e = /* @__PURE__ */ A(() => B(k).footer?.brand?.mode ?? "text"), t = /* @__PURE__ */ A(() => [
						["text", Z("blocks.text")],
						["image", Z("opt.brand.image")],
						["both", Z("opt.brand.both")]
					]);
					Q(ne, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => ql(e)
					});
				}
				D(ee);
				var re = R(ee, 2), ie = (e) => {
					var t = $p(), n = I(t), r = F(n), i = F(r), a = R(i);
					D(r);
					var o = R(r, 2), s = (e) => {
						var t = vu();
						K(t, () => C.cross, !0), D(t), z((e) => X(t, "title", e), [() => Z("tip.footer.removeLogo")]), V("click", t, Yl), U(e, t);
					};
					G(o, (e) => {
						B(k).footer?.brand?.logo && e(s);
					}), D(n);
					var c = R(n, 2), l = (e) => {
						var t = Qp(), n = I(t), r = F(n), i = L(R(r));
						D(n);
						var a = R(n, 2);
						J(a), z((e) => {
							W(r, `${e ?? ""} `), W(i, `${B(k).footer?.brand?.logoHeight ?? 40 ?? ""} px`), Y(a, B(k).footer?.brand?.logoHeight ?? 40);
						}, [() => Z("lbl.logoHeight")]), V("input", a, (e) => Xl(e.target.value)), U(e, t);
					};
					G(c, (e) => {
						B(k).footer?.brand?.logo && e(l);
					}), z((e, t) => {
						X(r, "title", e), W(i, `${t ?? ""} `);
					}, [() => Z("tip.webpAutoPublish"), () => B(k).footer?.brand?.logo ? Z("ui.changeLogo") : Z("ui.uploadLogo")]), V("change", a, Jl), U(e, t);
				};
				G(re, (e) => {
					(B(k).footer?.brand?.mode ?? "text") !== "text" && e(ie);
				}), D(_), D(m);
				var T = R(m, 2), ae = F(T), oe = L(ae, !0), se = R(ae, 2), ce = F(se);
				Yr(ce, 17, () => B(k).footer?.columns ?? [], Gr, (e, t, n) => {
					var r = em(), i = I(r), a = F(i);
					J(a);
					var o = R(a, 2), s = F(o);
					K(s, () => C.plus, !0), D(s);
					var c = R(s, 2);
					c.disabled = n === 0, K(c, () => C.up, !0), D(c);
					var l = R(c, 2);
					K(l, () => C.down, !0), D(l);
					var u = R(l, 2);
					K(u, () => C.cross, !0), D(u), D(o), D(i), Yr(R(i, 2), 17, () => B(t).links ?? [], Gr, (e, r, i) => {
						var a = Fu(), o = F(a);
						J(o);
						var s = R(o, 2), c = F(s);
						c.disabled = i === 0, K(c, () => C.up, !0), D(c);
						var l = R(c, 2);
						K(l, () => C.down, !0), D(l);
						var u = R(l, 2);
						K(u, () => C.cross, !0), D(u), D(s);
						var d = R(s, 2), f = F(d);
						{
							let e = /* @__PURE__ */ A(() => B(r).page ?? "__href"), t = /* @__PURE__ */ A(() => Z("tip.linkTarget")), a = /* @__PURE__ */ A(() => [...B(k).pages.map((e) => [e.id, e.title]), ["__href", Z("opt.linkHref")]]);
							Q(f, {
								get value() {
									return B(e);
								},
								get title() {
									return B(t);
								},
								get options() {
									return B(a);
								},
								onchange: (e) => $m(n, i, e)
							});
						}
						D(d);
						var p = R(d, 2), m = (e) => {
							var t = Pu();
							J(t), z((e, n) => {
								Y(t, B(r).href ?? ""), X(t, "placeholder", e), X(t, "title", n);
							}, [() => Z("ph.hrefAnchor"), () => Z("tip.hrefAnchor")]), V("change", t, (e) => eh(n, i, e.target.value)), U(e, t);
						};
						G(p, (e) => {
							B(r).page || e(m);
						}), D(a), z((e, n) => {
							Y(o, B(r).label), X(o, "title", e), l.disabled = i === B(t).links.length - 1, X(u, "title", n);
						}, [() => Z("tip.linkLabel"), () => Z("tip.removeLink")]), V("input", o, (e) => Qm(n, i, e.target.value)), V("click", c, () => Zm(n, i, -1)), V("click", l, () => Zm(n, i, 1)), V("click", u, () => Xm(n, i)), U(e, a);
					}), z((e, r, i) => {
						Y(a, B(t).title), X(a, "title", e), X(s, "title", r), l.disabled = n === B(k).footer.columns.length - 1, X(u, "title", i);
					}, [
						() => Z("tip.footer.columnTitle"),
						() => Z("tip.footer.addLink"),
						() => Z("tip.footer.removeColumn")
					]), V("input", a, (e) => Jm(n, e.target.value)), V("click", s, () => Ym(n)), V("click", c, () => qm(n, -1)), V("click", l, () => qm(n, 1)), V("click", u, () => Km(n)), U(e, r);
				});
				var E = R(ce, 2), le = L(E, !0), ue = R(E, 2), de = F(ue), fe = R(de);
				{
					let e = /* @__PURE__ */ A(() => B(k).footer?.columnsAlign ?? "left"), t = /* @__PURE__ */ A(() => [["left", Z("common.left")], ["center", Z("common.center")]]);
					Q(fe, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => du(e)
					});
				}
				D(ue), D(se), D(T);
				var pe = R(T, 2), me = F(pe), he = L(me, !0), ge = R(me, 2), _e = F(ge);
				Yr(_e, 17, () => B(k).footer?.social ?? [], Gr, (e, t, n) => {
					var r = tm(), i = F(r), a = F(i);
					K(a, () => Wa(B(t).icon) || "", !0), D(a);
					var o = R(a, 2);
					{
						let e = /* @__PURE__ */ A(() => Z("blocks.icon"));
						Q(o, {
							get value() {
								return B(t).icon;
							},
							get title() {
								return B(e);
							},
							get options() {
								return oh;
							},
							onchange: (e) => ih(n, e)
						});
					}
					D(i);
					var s = R(i, 2), c = F(s);
					c.disabled = n === 0, K(c, () => C.up, !0), D(c);
					var l = R(c, 2);
					K(l, () => C.down, !0), D(l);
					var u = R(l, 2);
					K(u, () => C.cross, !0), D(u), D(s);
					var d = R(s, 2);
					J(d), D(r), z((e, r) => {
						l.disabled = n === B(k).footer.social.length - 1, X(u, "title", e), Y(d, B(t).url), X(d, "placeholder", r);
					}, [() => Z("tip.removeLink"), () => Z("ph.hrefMailto")]), V("click", c, () => rh(n, -1)), V("click", l, () => rh(n, 1)), V("click", u, () => nh(n)), V("change", d, (e) => ah(n, e.target.value)), U(e, r);
				});
				var ve = R(_e, 2), ye = L(ve, !0);
				D(ge), D(pe);
				var be = R(pe, 2), xe = F(be), Se = L(xe, !0), Ce = R(xe, 2), we = F(Ce), Te = F(we);
				J(Te);
				var Ee = R(Te);
				D(we);
				var De = R(we, 2), ke = (e) => {
					let t = /* @__PURE__ */ A(() => B(k).footer.cta);
					var n = rm(), r = I(n), i = F(r), a = R(i);
					{
						let e = /* @__PURE__ */ A(() => B(t).kind ?? "button"), n = /* @__PURE__ */ A(() => [["button", Z("opt.cta.button")], ["newsletter", Z("opt.cta.newsletter")]]);
						Q(a, {
							get value() {
								return B(e);
							},
							get options() {
								return B(n);
							},
							onchange: (e) => pu("kind", e)
						});
					}
					D(r);
					var o = R(r, 2), s = F(o);
					J(s);
					var c = R(s);
					D(o);
					var l = R(o, 2), u = F(l), d = R(u);
					J(d), D(l);
					var f = R(l, 2), p = F(f), m = R(p);
					J(m), D(f);
					var h = R(f, 2), g = F(h), _ = R(g);
					J(_), D(h);
					var v = R(h, 2), y = (e) => {
						var n = nm(), r = I(n), i = F(r), a = R(i);
						{
							let e = /* @__PURE__ */ A(() => B(t).page ?? "__href"), n = /* @__PURE__ */ A(() => [...B(k).pages.map((e) => [e.id, e.title]), ["__href", Z("opt.linkHrefMailto")]]);
							Q(a, {
								get value() {
									return B(e);
								},
								get options() {
									return B(n);
								},
								onchange: (e) => Um(e)
							});
						}
						D(r);
						var o = R(r, 2), s = (e) => {
							var n = Hu();
							J(n), z((e, r) => {
								Y(n, B(t).href ?? ""), X(n, "placeholder", e), X(n, "title", r);
							}, [() => Z("ph.hrefMailtoAnchor"), () => Z("tip.hrefAnchor")]), V("change", n, (e) => pu("href", e.target.value)), U(e, n);
						};
						G(o, (e) => {
							B(t).page || e(s);
						}), z((e, t) => {
							X(r, "title", e), W(i, `${t ?? ""} `);
						}, [() => Z("tip.footer.ctaTarget"), () => Z("lbl.buttonTarget")]), U(e, n);
					}, b = (e) => {
						var n = Zu(), r = I(n), i = F(r), a = R(i);
						J(a), D(r);
						var o = R(r, 2), s = F(o), c = R(s);
						J(c), D(o);
						var l = R(o, 2), u = F(l), d = R(u);
						J(d), D(l), z((e, n, f, p, m, h, g, _, v) => {
							X(r, "title", e), W(i, `${n ?? ""} `), Y(a, B(t).endpoint ?? ""), X(a, "placeholder", f), X(o, "title", p), W(s, `${m ?? ""} `), Y(c, B(t).recipient ?? ""), X(c, "placeholder", h), X(l, "title", g), W(u, `${_ ?? ""} `), Y(d, B(t).success ?? ""), X(d, "placeholder", v);
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
						]), V("change", a, (e) => pu("endpoint", e.target.value)), V("change", c, (e) => pu("recipient", e.target.value)), V("input", d, (e) => pu("success", e.target.value)), U(e, n);
					};
					G(v, (e) => {
						(B(t).kind ?? "button") === "button" ? e(y) : e(b, -1);
					}), z((e, n, a, v, y, b, x, S, C, w, ee, te) => {
						X(r, "title", e), W(i, `${n ?? ""} `), X(o, "title", a), Ci(s, B(t).big === !0), W(c, ` ${v ?? ""}`), X(l, "title", y), W(u, `${b ?? ""} `), Y(d, B(t).heading ?? ""), X(d, "placeholder", x), X(f, "title", S), W(p, `${C ?? ""} `), Y(m, B(t).sub ?? ""), X(h, "title", w), W(g, `${ee ?? ""} `), Y(_, B(t).label ?? ""), X(_, "placeholder", te);
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
					]), V("change", s, (e) => pu("big", e.target.checked)), V("input", d, (e) => pu("heading", e.target.value)), V("input", m, (e) => pu("sub", e.target.value)), V("input", _, (e) => pu("label", e.target.value)), U(e, n);
				};
				G(De, (e) => {
					B(k).footer?.cta && e(ke);
				}), D(Ce), D(be);
				var Ae = R(be, 2), je = F(Ae), Me = L(je, !0), Ne = R(je, 2), Pe = F(Ne);
				r(Pe, () => "linkRow", () => B(k).footer?.linkRow ?? []);
				var Fe = R(Pe, 2), Ie = L(Fe, !0);
				D(Ne), D(Ae);
				var Le = R(Ae, 2), Re = F(Le), ze = L(Re, !0), Be = R(Re, 2), Ve = F(Be), He = (e) => {
					var t = zd(), n = I(t), r = F(n), i = R(r);
					{
						let e = /* @__PURE__ */ A(() => B(k).footer?.align ?? "left"), t = /* @__PURE__ */ A(() => [
							["left", Z("common.left")],
							["center", Z("common.center")],
							["right", Z("common.right")]
						]);
						Q(i, {
							get value() {
								return B(e);
							},
							get options() {
								return B(t);
							},
							onchange: (e) => Gl("footer", (t) => {
								t.align = e;
							})
						});
					}
					D(n), Oe(2), z((e, t) => {
						X(n, "title", e), W(r, `${t ?? ""} `);
					}, [() => Z("tip.footer.align"), () => Z("lbl.align")]), U(e, t);
				};
				G(Ve, (e) => {
					B(k).footer?.cta?.big !== !0 && e(He);
				});
				var Ue = R(Ve, 2), We = L(Ue, !0), Ge = R(Ue, 2);
				n(Ge, () => Qr, () => B(k).footer?.background?.layers ?? []), D(Be), D(Le);
				var Ke = R(Le, 2), qe = F(Ke), Je = L(qe, !0), O = R(qe, 2), Ye = F(O), Xe = F(Ye), Ze = R(Xe);
				J(Ze), D(Ye);
				var Qe = R(Ye, 2), $e = L(Qe, !0), et = R(Qe, 2);
				r(et, () => "baseline", () => B(k).footer?.baseline ?? []);
				var tt = R(et, 2), nt = L(tt, !0);
				D(O), D(Ke), D(t), z((e, t, n, r, s, c, l, u, f, p, m, h, _, C, ne, re, ie, T, ae, se, ce, E, fe, pe, me, ge, _e, ve, be, xe, Ce, De) => {
					X(i, "title", e), Ci(a, t), W(o, ` ${n ?? ""}`), W(d, r), W(g, s), X(v, "title", c), W(y, `${l ?? ""} `), Y(b, B(k).footer?.brand?.title ?? ""), X(b, "placeholder", u), X(x, "title", f), W(S, `${p ?? ""} `), Y(w, B(k).footer?.brand?.tagline ?? ""), X(ee, "title", m), W(te, `${h ?? ""} `), W(oe, _), W(le, C), X(ue, "title", ne), W(de, `${re ?? ""} `), W(he, ie), W(ye, T), W(Se, ae), X(we, "title", se), Ci(Te, ce), W(Ee, ` ${E ?? ""}`), W(Me, fe), W(Ie, pe), W(ze, me), W(We, ge), W(Je, _e), X(Ye, "title", ve), W(Xe, `${be ?? ""} `), Y(Ze, B(k).footer?.copyright ?? ""), X(Ze, "placeholder", xe), W($e, Ce), W(nt, De);
				}, [
					() => Z("tip.footer.show"),
					() => !!B(k).footer?.show,
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
					() => !!B(k).footer?.cta,
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
				]), V("change", a, (e) => Gl("footer", (t) => {
					t.show = e.target.checked;
				})), V("input", b, (e) => Kl("title", e.target.value)), V("input", w, (e) => Kl("tagline", e.target.value)), V("click", E, Gm), V("click", ve, th), V("change", Te, (e) => fu(e.target.checked)), V("click", Fe, () => nu("linkRow")), V("input", Ze, (e) => Zl(e.target.value)), V("click", tt, () => nu("baseline")), U(e, t);
			}, ae = (e) => {
				var t = fm(), n = F(t), r = (e) => {
					var t = Iu(), n = F(t), r = R(n);
					{
						let e = /* @__PURE__ */ A(() => B(dc) ?? ""), t = /* @__PURE__ */ A(() => [["", Z("common.choose")], ...B(oc).map((e) => [e, B(sc)[e]?.name ?? e])]);
						Q(r, {
							get value() {
								return B(e);
							},
							get options() {
								return B(t);
							},
							onchange: (e) => N(dc, e || null, !0)
						});
					}
					D(t), z((e) => W(n, `${e ?? ""} `), [() => Z("blocks.collection")]), U(e, t);
				};
				G(n, (e) => {
					B(oc).length && e(r);
				});
				var i = R(n, 2), a = (e) => {
					let t = /* @__PURE__ */ A(() => B(sc)[B(dc)]);
					var n = dm(), r = I(n), i = F(r), a = L(i, !0), o = R(i, 2), s = L(o, !0), c = R(o, 2), l = F(c), u = R(l);
					D(c);
					var d = R(c, 2);
					K(d, () => C.cross, !0), D(d), D(r);
					var f = R(r, 2);
					Yr(f, 19, () => B(t).entries, (e) => e.id, (e, n, r) => {
						var i = um(), a = F(i), o = L(a), s = R(a, 2), c = F(s), l = F(c);
						J(l);
						var u = R(l, 2), d = F(u);
						K(d, () => C.up, !0), D(d);
						var f = R(d, 2);
						K(f, () => C.down, !0), D(f);
						var p = R(f, 2);
						K(p, () => C.cross, !0), D(p), D(u), D(c);
						var m = R(c, 2), h = (e) => {
							var t = am(), r = F(t), i = R(r);
							J(i), D(t), z((e) => {
								W(r, `${e ?? ""} `), Y(i, B(n).date ?? "");
							}, [() => Z("lbl.date")]), V("change", i, (e) => Jc(B(dc), B(n).id, "date", e.target.value)), U(e, t);
						};
						G(m, (e) => {
							B(t).kind !== "products" && e(h);
						});
						var g = R(m, 2);
						ut(g);
						var _ = R(g, 2), v = (e) => {
							var t = Bu(), r = F(t), i = R(r);
							J(i), D(t), z((e, t) => {
								W(r, `${e ?? ""} `), Y(i, B(n).href ?? ""), X(i, "placeholder", t);
							}, [() => Z("lbl.link"), () => Z("ph.collections.href")]), V("change", i, (e) => Jc(B(dc), B(n).id, "href", e.target.value)), U(e, t);
						};
						G(_, (e) => {
							B(t).kind !== "products" && e(v);
						});
						var y = R(_, 2), b = F(y), x = F(b), S = R(x);
						D(b);
						var w = R(b, 2), ee = (e) => {
							var t = om(), r = I(t), i = R(r, 2);
							K(i, () => C.cross, !0), D(i), z((e) => {
								X(r, "src", B(n).image), X(i, "title", e);
							}, [() => Z("tip.removeImage")]), V("click", i, () => Jc(B(dc), B(n).id, "image", "")), U(e, t);
						};
						G(w, (e) => {
							B(n).image && e(ee);
						}), D(y);
						var te = R(y, 2), ne = (e) => {
							var t = lm(), r = I(t), i = F(r), a = R(i);
							J(a), D(r);
							var o = R(r, 2), s = F(o), c = R(s);
							J(c), D(o);
							var l = R(o, 2), u = F(l), d = R(u);
							J(d), D(l);
							var f = R(l, 2), p = F(f), m = R(p);
							J(m), D(f);
							var h = R(f, 2);
							Yr(h, 17, () => B(n).colors ?? [], Gr, (e, t, r) => {
								var i = cm(), a = F(i);
								J(a);
								var o = R(a, 2), s = F(o), c = R(s);
								D(o);
								var l = R(o, 2), u = (e) => {
									var n = sm();
									z(() => X(n, "src", B(t).image)), U(e, n);
								};
								G(l, (e) => {
									B(t).image && e(u);
								});
								var d = R(l, 2);
								K(d, () => C.cross, !0), D(d), D(i), z((e, n) => {
									Y(a, B(t).name), X(a, "placeholder", e), W(s, `${n ?? ""} `);
								}, [() => Z("ph.colorName"), () => B(t).image ? Z("ui.changeImage") : Z("ui.addImage")]), V("change", a, (e) => ul(B(dc), B(n).id, r, "name", e.target.value)), V("change", c, (e) => dl(B(dc), B(n).id, r, e)), V("click", d, () => fl(B(dc), B(n).id, r)), U(e, i);
							});
							var g = R(h, 2), _ = L(g, !0);
							z((e, t, r, h, v, y, b, x, S, C, w) => {
								W(i, `${e ?? ""} `), Y(a, B(n).price ?? ""), X(o, "title", t), W(s, `${r ?? ""} `), Y(c, B(n).memberPrice ?? ""), X(l, "title", h), W(u, `${v ?? ""} `), Y(d, B(n).badge ?? ""), X(f, "title", y), W(p, `${b ?? ""} `), Y(m, x), X(m, "placeholder", S), X(g, "title", C), W(_, w);
							}, [
								() => Z("lbl.price"),
								() => Z("tip.entry.memberPrice"),
								() => Z("lbl.memberPrice"),
								() => Z("tip.entry.badge"),
								() => Z("lbl.productBadge"),
								() => Z("tip.entry.sizes"),
								() => Z("lbl.sizes"),
								() => (B(n).sizes ?? []).join(", "),
								() => Z("ph.sizes"),
								() => Z("tip.entry.colors"),
								() => Z("ui.addColor")
							]), V("change", a, (e) => Jc(B(dc), B(n).id, "price", e.target.value === "" ? "" : Number(e.target.value))), V("change", c, (e) => Jc(B(dc), B(n).id, "memberPrice", e.target.value === "" ? "" : Number(e.target.value))), V("change", d, (e) => Jc(B(dc), B(n).id, "badge", e.target.value)), V("change", m, (e) => cl(B(dc), B(n).id, e.target.value)), V("click", g, () => ll(B(dc), B(n).id)), U(e, t);
						};
						G(te, (e) => {
							B(t).kind === "products" && e(ne);
						}), D(s), D(i), z((e, i, a, s, c) => {
							W(o, `${e ?? ""}${B(t).kind === "products" ? B(n).price == null ? "" : ` · ${B(n).price}` : B(n).date ? ` · ${B(n).date}` : ""}`), Y(l, B(n).title), X(l, "title", i), d.disabled = B(r) === 0, f.disabled = B(r) === B(t).entries.length - 1, X(p, "title", a), X(g, "placeholder", s), Y(g, B(n).text ?? ""), W(x, `${c ?? ""} `);
						}, [
							() => Rc(B(n).title),
							() => Z("lbl.title"),
							() => Z("tip.collections.deleteEntry"),
							() => Z("ph.collections.text"),
							() => B(n).image ? Z("ui.changeImage") : Z("ui.addImage")
						]), V("change", l, (e) => Jc(B(dc), B(n).id, "title", e.target.value || Z("ui.untitled"))), V("click", d, () => Qc(B(dc), B(r), -1)), V("click", f, () => Qc(B(dc), B(r), 1)), V("click", p, () => tl(B(dc), B(n).id)), V("change", g, (e) => Jc(B(dc), B(n).id, "text", e.target.value)), V("change", S, (e) => nl(B(dc), B(n).id, e)), U(e, i);
					});
					var p = R(f, 2), m = (e) => {
						var t = zu(), n = L(t, !0);
						z((e) => W(n, e), [() => Z("hint.collections.empty")]), U(e, t);
					};
					G(p, (e) => {
						B(t).entries.length || e(m);
					}), Oe(2), z((e, t, n, r, i, u) => {
						W(a, e), X(o, "title", t), W(s, n), X(c, "title", r), W(l, `${i ?? ""} `), X(d, "title", u);
					}, [
						() => Z("ui.addEntry"),
						() => Z("tip.collections.exportCsv"),
						() => Z("ui.exportCsv"),
						() => Z("tip.collections.importCsv"),
						() => Z("ui.importCsv"),
						() => Z("tip.collections.deleteCollection")
					]), V("click", i, () => qc(B(dc))), V("click", o, () => pl(B(dc))), V("change", u, (e) => ml(B(dc), e)), V("click", d, () => Wc(B(dc))), U(e, n);
				};
				G(i, (e) => {
					B(dc) && B(sc)[B(dc)] && e(a);
				});
				var o = R(i, 2), s = F(o), c = R(s);
				J(c), D(o);
				var l = R(o, 2), u = F(l);
				Q(R(u), {
					get value() {
						return B(pc);
					},
					get options() {
						return hc;
					},
					onchange: (e) => N(pc, e, !0)
				}), D(l);
				var d = R(l, 2), f = L(d, !0);
				D(t), z((e, t, n, r, i) => {
					W(s, `${e ?? ""} `), X(c, "placeholder", t), W(u, `${n ?? ""} `), d.disabled = r, W(f, i);
				}, [
					() => Z("lbl.newCollectionName"),
					() => Z("ph.collections.name"),
					() => Z("common.type"),
					() => !B(fc).trim(),
					() => Z("ui.createCollection")
				]), V("keydown", c, (e) => e.key === "Enter" && Vc()), Di(c, () => B(fc), (e) => N(fc, e)), V("click", d, Vc), U(e, t);
			}, oe = (e) => {
				var t = ym(), n = F(t), r = (e) => {
					var t = zu(), n = L(t, !0);
					z((e) => W(n, e), [() => Z("hint.plugins.empty")]), U(e, t);
				}, i = /* @__PURE__ */ A(() => !jl().length);
				G(n, (e) => {
					B(i) && e(r);
				});
				var a = R(n, 2);
				Yr(a, 16, jl, (e) => e, (e, t) => {
					let n = /* @__PURE__ */ A(() => xl[t]), r = /* @__PURE__ */ A(() => (B(vl)?.enabled ?? []).includes(t));
					var i = hm();
					let a;
					var o = F(i), s = F(o), c = L(s, !0), l = R(s, 2), u = (e) => {
						var t = pm(), r = L(t);
						z(() => W(r, `v${B(n).version ?? ""}`)), U(e, t);
					};
					G(l, (e) => {
						B(n)?.version && e(u);
					});
					var d = R(l, 2), f = F(d), p = F(f);
					J(p);
					var m = R(p);
					D(f);
					var h = R(f, 2);
					K(h, () => C.cross, !0), D(h), D(d), D(o);
					var g = R(o, 2), _ = (e) => {
						var t = mm(), r = L(t, !0);
						z((e) => W(r, e), [() => B(n).errors.join("; ")]), U(e, t);
					}, v = (e) => {
						var t = mm(), r = L(t, !0);
						z((e) => W(r, e), [() => Z("plugin.engineMismatch", {
							required: B(n).requiresEngine,
							current: B(Cl)
						})]), U(e, t);
					}, y = (e) => {
						var t = mm(), r = L(t, !0);
						z((e) => W(r, e), [() => Z("plugin.cspNeeded", { list: Fl(B(n).csp).join(", ") })]), U(e, t);
					}, b = /* @__PURE__ */ A(() => B(n)?.csp && Fl(B(n).csp).length);
					G(g, (e) => {
						B(n)?.errors?.length ? e(_) : B(n) && !B(n).satisfied ? e(v, 1) : B(b) && e(y, 2);
					});
					var x = R(g, 2), S = (e) => {
						var t = zu(), r = L(t, !0);
						z((e) => W(r, e), [() => Z("plugin.languages", { list: B(n).languages.map((e) => e.name).join(", ") })]), U(e, t);
					};
					G(x, (e) => {
						B(n)?.languages?.length && e(S);
					}), D(i), z((e, t, o, s, l) => {
						a = q(i, 1, "plugin-row svelte-1n46o8q", null, a, { "plugin-broken": B(n)?.errors?.length }), W(c, e), X(f, "title", t), Ci(p, B(r)), p.disabled = o, W(m, ` ${s ?? ""}`), X(h, "title", l);
					}, [
						() => B(n)?.names?.[Gi()] ?? B(n)?.name ?? t,
						() => B(r) ? Z("tip.plugins.on") : Z("tip.plugins.off"),
						() => !!B(n)?.errors?.length,
						() => B(r) ? Z("ui.on") : Z("ui.off"),
						() => Z("tip.plugins.remove")
					]), V("change", p, (e) => Bl(t, e.target.checked)), V("click", h, () => Hl(t)), U(e, i);
				});
				var o = R(a, 2), s = (e) => {
					var t = _m(), n = R(I(t), 2), r = L(n, !0);
					Yr(R(n, 2), 16, () => B(El), (e) => e, (e, t) => {
						var n = gm(), r = F(n), i = F(r), a = L(i, !0), o = R(i, 2), s = (e) => {
							var n = pm(), r = L(n);
							z(() => W(r, `v${xl[t].version ?? ""}`)), U(e, n);
						};
						G(o, (e) => {
							xl[t]?.version && e(s);
						});
						var c = R(o, 2), l = F(c);
						K(l, () => C.right, !0), D(l), D(c), D(r), D(n), z((e, t) => {
							W(a, e), X(l, "title", t);
						}, [() => xl[t]?.names?.[Gi()] ?? xl[t]?.name ?? t, () => Z("tip.plugins.addFound")]), V("click", l, () => Wl(t)), U(e, n);
					}), z((e) => W(r, e), [() => Z("hint.plugins.found")]), U(e, t);
				};
				G(o, (e) => {
					B(El).length && e(s);
				});
				var c = R(o, 2), l = (e) => {
					var t = Pr(), n = I(t), r = (e) => {
						var t = zu(), n = L(t, !0);
						z((e) => W(n, e), [() => Z("hint.plugins.autoDiscover")]), U(e, t);
					};
					G(n, (e) => {
						B(El).length || e(r);
					}), U(e, t);
				}, u = (e) => {
					var t = vm(), n = R(I(t), 2);
					J(n);
					var r = R(n, 2), i = L(r, !0), a = R(r, 2), o = (e) => {
						var t = mm(), n = L(t, !0);
						z(() => W(n, B(Tl))), U(e, t);
					};
					G(a, (e) => {
						B(Tl) && e(o);
					}), z((e, t, a) => {
						X(n, "placeholder", e), r.disabled = t, W(i, a);
					}, [
						() => Z("ph.plugins.folder"),
						() => !B(wl).trim(),
						() => Z("ui.addPlugin")
					]), V("keydown", n, (e) => e.key === "Enter" && Ul()), Di(n, () => B(wl), (e) => N(wl, e)), V("click", r, Ul), U(e, t);
				};
				G(c, (e) => {
					B(kl) === "ok" ? e(l) : e(u, -1);
				}), D(t), U(e, t);
			}, se = (e) => {
				var t = Xp(), n = F(t), r = (e) => {
					var t = zu(), n = L(t, !0);
					z((e) => W(n, e), [() => Z("hint.history.loading")]), U(e, t);
				}, i = (e) => {
					var t = $f(), n = I(t), r = (e) => {
						var t = zu(), n = L(t, !0);
						z(() => W(n, B(Li))), U(e, t);
					};
					G(n, (e) => {
						B(Li) && e(r);
					});
					var i = R(n, 2), a = (e) => {
						var t = xm(), n = I(t), r = L(n, !0);
						Yr(R(n, 2), 19, () => B(Ii), (e) => e.sha, (e, t, n) => {
							var r = bm();
							let i;
							var a = F(r), o = L(a, !0), s = L(R(a, 2));
							D(r), z((e) => {
								i = q(r, 1, "history-row svelte-1n46o8q", null, i, { head: B(n) === 0 }), X(a, "title", B(t).sha), W(o, B(t).message), W(s, `${B(t).author ?? ""}${e ?? ""}`);
							}, [() => B(t).date ? ` · ${Bi.format(new Date(B(t).date))}` : ""]), U(e, r);
						}), z((e, t) => {
							n.disabled = B(Ri) || !B(fe)?.allowed, X(n, "title", e), W(r, t);
						}, [() => B(fe)?.allowed ? Z("tip.history.revert") : Z("tip.history.needsAccess"), () => Z("ui.revertLast")]), V("click", n, Hi), U(e, t);
					};
					G(i, (e) => {
						B(Ii).length > 0 && e(a);
					}), U(e, t);
				};
				G(n, (e) => {
					B(Ii) === null ? e(r) : e(i, -1);
				}), D(t), U(e, t);
			}, ce = (e) => {
				var t = Xp(), n = F(t), r = (e) => {
					var t = zu(), n = L(t, !0);
					z((e) => W(n, e), [() => Z("update.checking")]), U(e, t);
				}, i = (e) => {
					var t = Sm(), n = I(t), r = L(n, !0), i = R(n, 2), a = L(i, !0);
					z((e) => {
						W(r, B(Yi)), W(a, e);
					}, [() => Z("update.retry")]), V("click", i, ea), U(e, t);
				}, a = (e) => {
					var t = Nm(), n = I(t), r = F(n), i = L(r, !0), a = R(r, 2), o = (e) => {
						var t = Cm(), n = I(t);
						K(n, () => C.right, !0), D(n);
						var r = L(R(n, 2), !0);
						z(() => W(r, B(Ji).target)), U(e, t);
					};
					G(a, (e) => {
						B(Ji).upToDate || e(o);
					}), D(n);
					var s = R(n, 2), c = (e) => {
						var t = zu(), n = L(t, !0);
						z((e) => W(n, e), [() => Z("update.upToDate")]), U(e, t);
					}, l = (e) => {
						var t = Mm(), n = I(t), r = L(n, !0), i = R(n, 2), a = (e) => {
							var t = wm(), n = F(t), r = L(n, !0), i = R(n, 2), a = L(F(i), !0);
							D(i), D(t), z((e) => {
								W(r, e), W(a, B(Ji).notes);
							}, [() => Z("update.aboutVersion", { target: B(Ji).target })]), U(e, t);
						};
						G(i, (e) => {
							B(Ji).notes && e(a);
						});
						var o = R(i, 2), s = (e) => {
							var t = Tm(), n = F(t), r = F(n);
							K(r, () => C.warn, !0), D(r);
							var i = R(r);
							D(n);
							var a = R(n, 2), o = L(F(a), !0);
							D(a), D(t), z((e, t) => {
								X(n, "title", e), W(i, ` ${t ?? ""}`), W(o, B(Ji).headers.upstream);
							}, [() => Z("update.headersManual"), () => Z("update.headersTitle")]), U(e, t);
						};
						G(o, (e) => {
							B(Ji).headers?.upstream && e(s);
						});
						var c = R(o, 2);
						Yr(c, 17, () => B(Ji).changes.filter((e) => e.atom && e.conflict), (e) => e.path, (e, t) => {
							var n = Dm(), r = F(n), i = L(r, !0), a = R(r, 2), o = F(a), s = (e) => {
								var t = Em(), n = L(t, !0);
								z((e) => W(n, e), [() => Z("update.actionDelete")]), U(e, t);
							};
							G(o, (e) => {
								B(t).action === "delete" && e(s);
							});
							var c = R(o, 2);
							K(c, () => C.warn, !0), D(c), D(a), D(n), z((e) => {
								X(r, "title", B(t).path), W(i, B(t).path), X(c, "title", e);
							}, [() => Z(`update.conflict.${B(t).conflict}`)]), U(e, n);
						});
						var l = R(c, 2), u = F(l), d = L(u), f = R(u, 2);
						Yr(f, 21, () => B(Ji).changes.filter((e) => e.atom && !e.conflict), (e) => e.path, (e, t) => {
							var n = Om(), r = F(n), i = L(r, !0), a = R(r, 2), o = (e) => {
								var t = Em(), n = L(t, !0);
								z((e) => W(n, e), [() => Z("update.actionDelete")]), U(e, t);
							};
							G(a, (e) => {
								B(t).action === "delete" && e(o);
							}), D(n), z(() => {
								X(r, "title", B(t).path), W(i, B(t).path);
							}), U(e, n);
						}), D(f), D(l);
						var p = R(l, 2), m = (e) => {
							var t = jm(), n = I(t), r = F(n), i = L(r, !0), a = L(R(r, 2), !0);
							D(n), Yr(R(n, 2), 17, () => B(Ji).changes.filter((e) => !e.atom), (e) => e.path, (e, t) => {
								var n = Am(), r = F(n);
								let i;
								var a = L(r, !0), o = R(r, 2), s = F(o), c = (e) => {
									var t = Em(), n = L(t, !0);
									z((e) => W(n, e), [() => Z("update.actionDelete")]), U(e, t);
								};
								G(s, (e) => {
									B(t).action === "delete" && e(c);
								});
								var l = R(s, 2), u = (e) => {
									var n = km();
									K(n, () => C.warn, !0), D(n), z((e) => X(n, "title", e), [() => Z(`update.conflict.${B(t).conflict}`)]), U(e, n);
								};
								G(l, (e) => {
									B(t).conflict && e(u);
								});
								var d = R(l, 2);
								J(d), D(o), D(n), z((e, n, o, s) => {
									i = q(r, 1, "update-path svelte-1n46o8q", null, i, { skipped: e }), X(r, "title", B(t).path), W(a, B(t).path), Ci(d, n), X(d, "title", o), X(d, "aria-label", s);
								}, [
									() => B($i).has(B(t).path),
									() => B($i).has(B(t).path),
									() => Z("update.keepMine.title"),
									() => Z("update.keepMine")
								]), V("change", d, () => ta(B(t).path)), U(e, n);
							}), z((e, t) => {
								W(i, e), W(a, t);
							}, [() => Z("update.optionalTitle"), () => Z("update.keepMine")]), U(e, t);
						}, h = /* @__PURE__ */ A(() => B(Ji).changes.some((e) => !e.atom));
						G(p, (e) => {
							B(h) && e(m);
						});
						var g = R(p, 2), _ = L(g, !0);
						z((e, t, n, i, a, o) => {
							W(r, e), X(u, "title", t), W(d, `${n ?? ""} · ${i ?? ""}`), g.disabled = B(Xi) || !B(fe)?.allowed, X(g, "title", a), W(_, o);
						}, [
							() => Z("update.summary", {
								writes: B(Ji).changes.filter((e) => e.action === "write").length,
								deletes: B(Ji).changes.filter((e) => e.action === "delete").length
							}),
							() => Z("update.atomGroup.title"),
							() => Z("update.atomTitle"),
							() => B(Ji).changes.filter((e) => e.atom).length,
							() => B(fe)?.allowed ? Z("update.run.title") : Z("tip.history.needsAccess"),
							() => Z("update.run", { target: B(Ji).target })
						]), V("click", g, na), U(e, t);
					};
					G(s, (e) => {
						B(Ji).upToDate ? e(c) : e(l, -1);
					}), z((e) => W(i, e), [() => Z("update.current", { version: B(Ji).current })]), U(e, t);
				};
				G(n, (e) => {
					B(Xi) && !B(Ji) ? e(r) : B(Yi) ? e(i, 1) : B(Ji) && e(a, 2);
				}), D(t), U(e, t);
			};
			G(_, (e) => {
				B(Ft) === "pages" ? e(v) : B(Ft) === "nav" ? e(x, 1) : B(Ft) === "site" ? e(S, 2) : B(Ft) === "theme" ? e(w, 3) : B(Ft) === "blocks" ? e(ee, 4) : B(Ft) === "grid" ? e(te, 5) : B(Ft) === "properties" ? e(ne, 6) : B(Ft) === "footer" ? e(ie, 7) : B(Ft) === "collections" ? e(ae, 8) : B(Ft) === "plugins" ? e(oe, 9) : B(Ft) === "history" ? e(se, 10) : B(Ft) === "update" && e(ce, 11);
			}), D(t), ji(t, (e) => N(Nh, e), () => B(Nh)), z((e) => {
				i = q(t, 1, "panel svelte-1n46o8q", null, i, { hidden: !B(me) }), X(l, "title", e), W(p, Rt[B(Ft)]);
			}, [() => zt[B(Ft)]?.map((e) => Z(e)).join("\n")]), U(e, t);
		};
		G(x, (e) => {
			B(Ft) && e(S);
		});
		var ee = R(x, 2);
		let ne;
		var ie = F(ee), ae = F(ie);
		ji(ae, (e) => N(de, e), () => B(de)), D(ie), D(ee), ji(ee, (e) => N(De, e), () => B(De)), D(t), z((e, t) => {
			o = q(i, 1, "rail svelte-1n46o8q", null, o, { hidden: !B(me) }), g = q(m, 1, "rail-gear svelte-1n46o8q", null, g, { active: B(ua) }), X(m, "title", e), ne = q(ee, 1, "frame-wrap svelte-1n46o8q", null, ne, {
				mobile: B(Ee) === "mobile",
				pan: B(Ve),
				fold: B(Fe) > 0
			}), vi(ie, `width:${B(ze) ?? ""}px; height:${B(Be) ?? ""}px`), X(ae, "title", t), X(ae, "src", `/?page=${B(T)}&preview=1`), vi(ae, `width:${B(Pe) ?? ""}px; height:${B(Re) ?? ""}px; transform:scale(${B(Ie) ?? ""}); transform-origin:top left`);
		}, [() => Z("settings.title"), () => Z("ui.previewTitle")]), V("click", m, () => N(ua, !B(ua))), wr("load", ae, sa), Sr(ae), U(e, t);
	}, __ = (e) => {
		var t = Im(), n = L(t, !0);
		z((e) => W(n, e), [() => Z("ui.loading")]), U(e, t);
	};
	G(h_, (e) => {
		B(ie) ? e(g_) : e(__, -1);
	});
	var v_ = R(h_, 2), y_ = (e) => {
		hs(e, {
			get image() {
				return B(oo);
			},
			onapply: co,
			oncancel: () => N(oo, null)
		});
	};
	G(v_, (e) => {
		B(oo) && e(y_);
	});
	var b_ = R(v_, 2), x_ = (e) => {
		var t = Rm(), n = F(t), r = F(n), i = L(r, !0), a = R(r, 2);
		Yr(a, 16, () => B(bt).lines, (e) => e, (e, t) => {
			var n = Lm(), r = L(n, !0);
			z(() => W(r, t)), U(e, n);
		});
		var o = R(a, 2), s = (e) => {
			var t = Hu();
			J(t), lt(t, !0), z(() => X(t, "placeholder", B(bt).placeholder)), V("keydown", t, (e) => e.key === "Enter" && B(bt).value.trim() && Ct(!0)), Di(t, () => B(bt).value, (e) => B(bt).value = e), U(e, t);
		};
		G(o, (e) => {
			B(bt).prompt && e(s);
		});
		var c = R(o, 2), l = F(c), u = L(l, !0), d = R(l, 2), f = L(d, !0);
		D(c), D(n), D(t), z(() => {
			W(i, B(bt).title), W(u, B(bt).cancelLabel), W(f, B(bt).okLabel);
		}), V("pointerdown", t, (e) => wt = e.target === e.currentTarget), V("click", t, (e) => wt && e.target === e.currentTarget && Ct(!1)), V("click", l, () => Ct(!1)), V("click", d, () => Ct(!0)), U(e, t);
	};
	G(b_, (e) => {
		B(bt) && e(x_);
	});
	var S_ = R(b_, 2), C_ = (e) => {
		var t = zm(), n = F(t), r = F(n), i = L(r, !0), a = R(r, 2), o = L(a, !0), s = R(a, 2), c = F(s), l = R(c);
		J(l), D(s);
		var u = R(s, 2), d = F(u), f = R(d);
		{
			let e = /* @__PURE__ */ A(() => Z("setup.accentPick"));
			ga(f, {
				get value() {
					return B(Dt);
				},
				get label() {
					return B(e);
				},
				onchange: (e) => N(Dt, e, !0)
			});
		}
		D(u);
		var p = R(u, 2), m = F(p), h = R(m);
		{
			let e = /* @__PURE__ */ A(() => Z("setup.bgLabel"));
			ga(h, {
				get value() {
					return B(Ot);
				},
				get label() {
					return B(e);
				},
				onchange: (e) => N(Ot, e, !0)
			});
		}
		D(p);
		var g = R(p, 2), _ = L(g, !0), v = R(g, 2), y = F(v), b = L(y, !0), x = R(y, 2), S = L(x, !0);
		D(v), D(n), D(t), z((e, t, n, r, a, s, u, f, p, h) => {
			W(i, e), W(o, t), W(c, `${n ?? ""} `), X(l, "placeholder", r), W(d, `${a ?? ""} `), W(m, `${s ?? ""} `), W(_, u), W(b, f), x.disabled = p, W(S, h);
		}, [
			() => Z("setup.title"),
			() => Z("setup.intro"),
			() => Z("setup.nameLabel"),
			() => Z("ph.setup.name"),
			() => Z("setup.accentLabel"),
			() => Z("setup.bgLabel"),
			() => Z("setup.outro"),
			() => Z("setup.skip"),
			() => !B(Et).trim(),
			() => Z("setup.start")
		]), V("keydown", l, (e) => e.key === "Enter" && At()), Di(l, () => B(Et), (e) => N(Et, e)), V("click", y, kt), V("click", x, At), U(e, t);
	};
	G(S_, (e) => {
		B(Tt) && e(C_);
	});
	var w_ = R(S_, 2), T_ = (e) => {
		var t = Bm();
		let n;
		var r = F(t), i = L(r, !0), a = R(r, 2);
		D(t), z((e) => {
			n = q(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: B(se) === "ok",
				error: B(se) === "error"
			}), W(i, B(oe)), X(a, "title", e);
		}, [() => Z("ui.close")]), V("click", a, () => E("")), U(e, t);
	};
	G(w_, (e) => {
		B(oe) && e(T_);
	}), D($g);
	var E_ = R($g, 2), D_ = (e) => {
		var t = Vm(), n = F(t), r = F(n), i = L(r, !0), o = R(r, 2);
		K(o, () => C.cross, !0), D(o), D(n);
		var s = R(n, 2), c = F(s);
		a(c), D(s), D(t), z((e, n) => {
			vi(t, `left: ${B(Zt).left ?? ""}px; top: ${B(Zt).top ?? ""}px`), W(i, e), X(o, "title", n);
		}, [() => Z("blocks.suffix", { label: qn[B(j).type] ?? B(j).type }), () => Z("tip.closeEsc")]), V("click", o, () => N(Zt, null)), U(e, t);
	};
	G(E_, (e) => {
		B(Zt) && B(j) && e(D_);
	}), z(() => r_ = q(n_, 1, "topbar svelte-1n46o8q", null, r_, { hidden: !B(me) })), U(e, Qg), Xe();
}
//#endregion
//#region src/main.js
Tr([
	"click",
	"input",
	"pointerdown",
	"change",
	"keydown"
]), document.documentElement.lang = await Ji();
var Wm = Br(Um, { target: document.getElementById("urd-admin") });
//#endregion
export { Wm as default };
