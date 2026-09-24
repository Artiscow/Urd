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
var g = 1024, _ = 2048, v = 4096, y = 8192, b = 16384, x = 32768, S = 1 << 25, C = 65536, ee = 1 << 19, w = 1 << 20, te = 1 << 25, T = 65536, ne = 1 << 21, re = 1 << 22, ie = 1 << 23, ae = Symbol("$state"), oe = Symbol("component"), se = Symbol("legacy props"), ce = Symbol(""), le = Symbol("attributes"), ue = Symbol("class"), de = Symbol("style"), fe = Symbol("text"), pe = Symbol("form reset"), me = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), he = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml"), ge = {}, _e = Symbol("uninitialized"), ve = "http://www.w3.org/1999/xhtml", ye = "http://www.w3.org/2000/svg", be = "http://www.w3.org/1998/Math/MathML";
function xe() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function Se(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Ce() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
var we = !1;
function Te(e) {
	we = e;
}
var Ee;
function De(e) {
	if (e === null) throw Se(), ge;
	return Ee = e;
}
function Oe() {
	return De(/* @__PURE__ */ ln(Ee));
}
function E(e) {
	if (we) {
		if (/* @__PURE__ */ ln(Ee) !== null) throw Se(), ge;
		Ee = e;
	}
}
function ke(e = 1) {
	if (we) {
		for (var t = e, n = Ee; t--;) n = /* @__PURE__ */ ln(n);
		Ee = n;
	}
}
function Ae(e = !0) {
	for (var t = 0, n = Ee;;) {
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
function je(e) {
	if (!e || e.nodeType !== 8) throw Se(), ge;
	return e.data;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
function Me(e) {
	return e === this.v;
}
function Ne(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Pe(e) {
	return !Ne(e, this.v);
}
//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
function Fe() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function D(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function Ie(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function O() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function k(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function Le() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Re(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function ze() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Be() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function Ve() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function He() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
//#endregion
//#region node_modules/svelte/src/internal/shared/clone.js
var Ue = [];
function We(e, t = !1, n = !1) {
	return Ge(e, /* @__PURE__ */ new Map(), "", Ue, null, n);
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
		r: qn,
		l: null
	};
}
function Ye(e) {
	var t = Ke, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) Sn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, Ke = t.p, Xe(e);
}
function Xe(e = {}) {
	return i(e, oe, { value: !0 }), e;
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
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= T, at(t.deps));
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
	we && /* @__PURE__ */ cn(e) !== null && un(e);
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
	let i = e[pe];
	e[pe] = i ? () => {
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
	var e = qn, t = Wn, n = Ke, r = kt;
	return function(i = !0) {
		Jn(e), Kn(t), qe(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function _t(e = !0) {
	Jn(null), Kn(null), qe(null), e && kt?.deactivate();
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
	return qn !== null && (qn.f |= ee), {
		ctx: Ke,
		deps: null,
		effects: null,
		equals: Me,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: _e,
		wv: 0,
		parent: qn,
		ac: null
	};
}
var bt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function xt(e, t, n) {
	let r = qn;
	r === null && Fe();
	var i = void 0, a = Jt(_e), o = !Wn, s = /* @__PURE__ */ new Set();
	return Tn(() => {
		var t = qn, n = m();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== me && n.reject(e);
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
			l?.(), s.delete(n), t !== bt && (c.activate(), t ? (a.f |= ie, Xt(a, t)) : (a.f & 8388608 && (a.f ^= ie), Xt(a, e)), c.deactivate());
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
	return t.equals = Pe, t;
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
	if (!Hn && r !== null && e.v !== _e && r.f & 24576) return xe(), e.v;
	Jn(r);
	try {
		e.f &= ~T, Ct(e), t = cr(e);
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
	Hn || (j === null ? it(e) : (yn() || kt?.is_fork) && j.set(e, t));
}
function Et(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && pt(() => {
		t.ac.abort(me), t.ac = null;
	}), t.fn !== null && (t.teardown = f), dr(t, 0), An(t));
}
function Dt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && fr(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var Ot = null, kt = null, At = null, j = null, jt = null, Mt = !1, Nt = !1, Pt = null, Ft = null, It = 0, Lt = 1, Rt = class e {
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
		this.#e = !0, It++ > 1e3 && (this.#x(), M());
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
		if (kt = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (Pt = null, Ft = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) Ut(e, t);
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
		this.#r.clear(), At = this, Vt(r), Vt(n), At = null, this.#s?.resolve();
		var s = kt;
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
		e.v !== _e && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), j?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		kt = this;
	}
	deactivate() {
		kt = null, j = null;
	}
	flush() {
		try {
			Nt = !0, kt = this, this.#g();
		} finally {
			It = 0, jt = null, Pt = null, Ft = null, Nt = !1, kt = null, j = null, Kt.clear();
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
			!Nt && !Mt && et(() => {
				t.#e || t.flush();
			});
		}
		return kt;
	}
	apply() {
		j = null;
	}
	schedule(e) {
		if (jt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if (Pt !== null && t === qn && (Wn === null || !(Wn.f & 2))) return;
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
		for (e && (kt !== null && !kt.is_fork && kt.flush(), n = e());;) {
			if (tt(), kt === null) return n;
			kt.flush();
		}
	} finally {
		Mt = t;
	}
}
function M() {
	try {
		Le();
	} catch (e) {
		hn(e, jt);
	}
}
var Bt = null;
function Vt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && or(r) && (Bt = /* @__PURE__ */ new Set(), fr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Pn(r), Bt?.size > 0)) {
				Kt.clear();
				for (let e of Bt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Bt.has(n) && (Bt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || fr(n);
					}
				}
				Bt.clear();
			}
		}
		Bt = null;
	}
}
function Ht(e) {
	kt.schedule(e);
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
		equals: Me,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function N(e, t) {
	let n = Jt(e, t);
	return Xn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Yt(e, t = !1, n = !0) {
	let r = Jt(e);
	return t || (r.equals = Pe), r;
}
function P(e, t, n = !1) {
	return Wn !== null && (!Gn || Wn.f & 131072) && Ze() && Wn.f & 4325394 && (Yn === null || !Yn.has(e)) && Ve(), Xt(e, n ? en(t) : t, Ft);
}
function Xt(e, t, n = null) {
	if (!e.equals(t)) {
		Hn ? Kt.set(e, t) : Kt.has(e) || Kt.set(e, e.v);
		var r = Rt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && wt(t), j === null && it(t);
		}
		e.wv = ar(), $t(e, _, n), Ze() && qn !== null && qn.f & 1024 && !(qn.f & 96) && ($n === null ? er([e]) : $n.push(e)), !r.is_fork && Gt.size > 0 && !qt && Zt();
	}
	return t;
}
function Zt() {
	qt = !1;
	for (let e of Gt) {
		e.f & 1024 && rt(e, v);
		let t;
		try {
			t = or(e);
		} catch {
			t = !0;
		}
		t && fr(e);
	}
	Gt.clear();
}
function Qt(e) {
	P(e, e.v + 1);
}
function $t(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Ze(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === qn)) {
			var l = (c & _) === 0;
			if (l && rt(s, t), c & 131072) Gt.add(s);
			else if (c & 2) {
				var u = s;
				j?.delete(u), c & 65536 || (c & 512 && (qn === null || !(qn.f & 2097152)) && (s.f |= T), $t(u, v, n));
			} else if (l) {
				var d = s;
				c & 16 && Bt !== null && Bt.add(d), n === null ? Ht(d) : n.push(d);
			}
		}
	}
}
function en(t) {
	if (typeof t != "object" || !t || ae in t || oe in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ N(0), u = null, d = rr, f = (e) => {
		if (rr === d) return e();
		var t = Wn, n = rr;
		Kn(null), ir(d);
		var r = e();
		return Kn(t), ir(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ N(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && ze();
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
					let e = f(() => /* @__PURE__ */ N(_e, u));
					r.set(t, e), Qt(o);
				}
			} else P(n, _e), Qt(o);
			return !0;
		},
		get(e, n, i) {
			if (n === ae) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ N(en(s ? e[n] : _e), u)), r.set(n, o)), o !== void 0) {
				var c = B(o);
				return c === _e ? void 0 : c;
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
				if (a !== void 0 && o !== _e) return {
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
			var n = r.get(t), i = n !== void 0 && n.v !== _e || Reflect.has(e, t);
			return (n !== void 0 || qn !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ N(i ? en(e[t]) : _e, u)), r.set(t, n)), B(n) === _e) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ N(_e, u)), r.set(d + "", p)) : P(p, _e);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ N(void 0, u)), P(c, en(n)), r.set(t, c));
			else {
				l = c.v !== _e;
				var m = f(() => en(n));
				P(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && P(g, _ + 1);
				}
				Qt(o);
			}
			return !0;
		},
		ownKeys(e) {
			B(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== _e;
			});
			for (var [n, i] of r) i.v !== _e && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			Be();
		}
	});
}
var tn, nn, rn, an;
function on() {
	if (tn === void 0) {
		tn = window, nn = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		rn = a(t, "firstChild").get, an = a(t, "nextSibling").get, u(e) && (e[ue] = void 0, e[le] = null, e[de] = void 0, e.__e = void 0), u(n) && (n[fe] = void 0);
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
function F(e, t) {
	if (!we) return /* @__PURE__ */ cn(e);
	var n = /* @__PURE__ */ cn(Ee);
	if (n === null) n = Ee.appendChild(sn());
	else if (t && n.nodeType !== 3) {
		var r = sn();
		return n?.before(r), De(r), r;
	}
	return t && pn(n), De(n), n;
}
function I(e, t = !1) {
	if (!we) {
		var n = /* @__PURE__ */ cn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ ln(n) : n;
	}
	if (t) {
		if (Ee?.nodeType !== 3) {
			var r = sn();
			return Ee?.before(r), De(r), r;
		}
		pn(Ee);
	}
	return Ee;
}
function L(e, t = !1) {
	if (!we) return /* @__PURE__ */ cn(e);
	var n = F(e, t);
	return E(e), n;
}
function R(e, t = 1, n = !1) {
	let r = we ? Ee : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ ln(r);
	if (!we) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = sn();
			return r === null ? i?.after(a) : r.before(a), De(a), a;
		}
		pn(r);
	}
	return De(r), r;
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
	if (t === null) return Wn.f |= ie, e;
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
	qn === null && (Wn === null && k(e), O()), Hn && Ie(e);
}
function _n(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function vn(e, t) {
	var n = qn;
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
	kt?.register_created_effect(r);
	var i = r;
	if (e & 4) Pt === null ? Rt.ensure().schedule(r) : Pt.push(r);
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
	if (!Wn && t & 32 && Ke !== null && !Ke.i) {
		var n = Ke;
		(n.e ??= []).push(e);
	} else return Sn(e);
}
function Sn(e) {
	return vn(4 | w, e);
}
function Cn(e) {
	Rt.ensure();
	let t = vn(64 | ee, e);
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
	return vn(re | ee, e);
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
	return vn(32 | ee, e);
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
			e.abort(me);
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
		e.f ^= y, e.f & 1024 || (rt(e, _), Rt.ensure().schedule(e));
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
	if (t & 2 && (e.f &= ~T), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (or(a) && Tt(a), a.wv > e.wv) return !0;
		}
		t & 512 && j === null && rt(e, g);
	}
	return !1;
}
function sr(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Yn !== null && Yn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? sr(a, t, !1) : t === a && (n ? rt(a, _) : a.f & 1024 && rt(a, v), Ht(a));
	}
}
function cr(e) {
	var t = Zn, n = Qn, r = $n, i = Wn, a = Yn, o = Ke, s = Gn, c = rr, l = e.f;
	Zn = null, Qn = 0, $n = null, Wn = l & 96 ? null : e, Yn = null, qe(e.ctx), Gn = !1, rr = ++nr, e.ac !== null && (pt(() => {
		e.ac.abort(me);
	}), e.ac = null);
	try {
		e.f |= ne;
		var u = e.fn, d = u();
		e.f |= x;
		var f = lr(e);
		if (Ze() && $n !== null && !Gn && f !== null && !(e.f & 6146)) for (var p = 0; p < $n.length; p++) sr($n[p], e);
		if (i !== null && i !== e) {
			if (nr++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = nr;
			if (t !== null) for (let e of t) e.rv = nr;
			$n !== null && (r === null ? r = $n : r.push(...$n));
		}
		return e.f & 8388608 && (e.f ^= ie), d;
	} catch (t) {
		return lr(e), mn(t);
	} finally {
		e.f ^= ne, Zn = t, Qn = n, $n = r, Wn = i, Yn = a, qe(o), Gn = s, rr = c;
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
		s.f & 512 && (s.f ^= 512, s.f &= ~T), s.v !== _e && it(s), s.ac !== null && pt(() => {
			s.ac.abort(me), s.ac = null, rt(s, _);
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
	await Promise.resolve(), zt();
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
	if (Hn && Kt.has(e)) return Kt.get(e);
	if (t) {
		var a = e;
		if (Hn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || hr(a)) && (o = wt(a)), Kt.set(a, o), o;
		}
		var s = !(a.f & 512) && !Gn && Wn !== null && (Vn || !!(Wn.f & 512)), c = (a.f & x) === 0;
		or(a) && (s && (a.f |= 512), Tt(a)), s && !c && (Dt(a), mr(a));
	}
	if (j?.has(e)) return j.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function mr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Dt(t), mr(t));
}
function hr(e) {
	if (e.v === _e) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Kt.has(t) || t.f & 2 && hr(t)) return !0;
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
	if (!we) return;
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
		if (we) return Mr(Ee, null), Ee;
		i === void 0 && (i = jr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ cn(i)));
		var t = r || nn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ cn(t), s = t.lastChild;
			Mr(o, s);
		} else Mr(t, t);
		return t;
	};
}
function Nr(e = "") {
	if (!we) {
		var t = sn(e + "");
		return Mr(t, t), t;
	}
	var n = Ee;
	return n.nodeType === 3 ? pn(n) : (n.before(n = sn()), De(n)), Mr(n, n), n;
}
function Pr() {
	if (we) return Mr(Ee, null), Ee;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = sn();
	return e.append(t, n), Mr(t, n), e;
}
function U(e, t) {
	if (we) {
		var n = qn;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = Ee), Oe();
		return;
	}
	e !== null && e.before(t);
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function Fr(e) {
	let t = 0, n = Jt(0), r;
	return () => {
		yn() && (B(n), En(() => (t === 0 && (r = gr(() => e(() => Qt(n)))), t += 1, () => {
			et(() => {
				--t, t === 0 && (r?.(), r = void 0, Qt(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Ir = C | ee;
function Lr(e, t, n, r) {
	new Rr(e, t, n, r);
}
var Rr = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = we ? Ee : null;
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
	#h = Fr(() => (this.#m = Jt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = qn;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = qn.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = Dn(() => {
			if (we) {
				let e = this.#t;
				Oe();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#y() : this.#g();
			} else this.#b();
		}, Ir), we && (this.#e = Ee);
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
				Ce();
				return;
			}
			t = !0, n && He(), this.#s !== null && Fn(this.#s, () => {
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
		var t = qn, n = Wn, r = Ke;
		Jn(this.#i), Kn(this.#i), qe(this.#i.ctx);
		try {
			return Rt.ensure(), e();
		} finally {
			Jn(t), Kn(n), qe(r);
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
			this.#d = !1, this.#m && Xt(this.#m, this.#l);
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
		this.#a &&= (Mn(this.#a), null), this.#o &&= (Mn(this.#o), null), this.#s &&= (Mn(this.#s), null), we && (De(this.#t), ke(), De(Ae()));
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
	n !== (e[fe] ??= e.nodeValue) && (e[fe] = n, e.nodeValue = `${n}`);
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
			Je({});
			var n = Ke;
			if (o && (n.c = o), a && (i.$$events = a), we && Mr(t, null), zr = s, l = e(t, i) || Xe(), zr = !0, we && (qn.nodes.end = Ee, Ee === null || Ee.nodeType !== 8 || Ee.data !== "]")) throw Se(), ge;
			Ye();
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
		} else we && (this.anchor = Ee), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function G(e, t, n = !1) {
	var r;
	we && (r = Ee, Oe());
	var i = new Wr(e), a = n ? C : 0;
	function o(e, t) {
		if (we) {
			var n = je(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Ae();
				De(a), i.anchor = a, Te(!1), i.ensure(e, t), Te(!0);
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
		c = we ? De(/* @__PURE__ */ cn(u)) : u.appendChild(sn());
	}
	we && Oe();
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
			we && je(c) === "[!" != (e === 0) && (c = Ae(), De(c), Te(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = kt, v = dn(), y = 0; y < e; y += 1) {
				we && Ee.nodeType === 8 && Ee.data === "]" && (c = Ee, t = !0, Te(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Xt(S.v, b), S.i && Xt(S.i, y), v && u.unskip_effect(S.e)) : (S = Qr(l, h ? c : Jr ??= sn(), b, x, y, o, n, i), h || (S.e.f |= te), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = On(() => s(c)) : (d = On(() => s(Jr ??= sn())), d.f |= te)), e > r.size && D("", "", ""), we && e > 0 && De(Ae()), !h) {
				if (m.set(u, r), v) {
					for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
					u.oncommit(g), u.ondiscard(_);
				} else g(u);
			}
			t && Te(!0), B(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, we && (c = Ee);
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
		var ee = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || ee.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && ee.push(l), l = Xr(l.next);
		var w = ee.length;
		if (w > 0) {
			var T = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < w; v += 1) ee[v].nodes?.a?.measure();
				for (v = 0; v < w; v += 1) ee[v].nodes?.a?.fix();
			}
			Kr(e, ee, T);
		}
	}
	o && et(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Qr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Jt(n) : /* @__PURE__ */ Yt(n, !1, !1) : null, l = o & 2 ? Jt(i) : null;
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
		we && (o = De(/* @__PURE__ */ cn(c)));
	}
	z(() => {
		var e = qn;
		if (s === (s = t() ?? "")) {
			we && Oe();
			return;
		}
		if (n && !we) {
			e.nodes = null, c.innerHTML = s, s !== "" && Mr(/* @__PURE__ */ cn(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (Nn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (we) {
				for (var a = Ee.data, l = Oe(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ ln(l);
				if (l === null) throw Se(), ge;
				Mr(Ee, u), o = De(l);
				return;
			}
			var d = fn(r ? "svg" : i ? "math" : "template", r ? ye : i ? be : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (Mr(/* @__PURE__ */ cn(f), f.lastChild), r || i) for (; /* @__PURE__ */ cn(f);) o.before(/* @__PURE__ */ cn(f));
			else o.before(f);
		}
	});
}
//#endregion
//#region node_modules/svelte/src/internal/client/timing.js
var ti = () => performance.now(), ni = {
	tick: (e) => requestAnimationFrame(e),
	now: () => ti(),
	tasks: /* @__PURE__ */ new Set()
};
//#endregion
//#region node_modules/svelte/src/internal/client/loop.js
function ri() {
	let e = ni.now();
	ni.tasks.forEach((t) => {
		t.c(e) || (ni.tasks.delete(t), t.f());
	}), ni.tasks.size !== 0 && ni.tick(ri);
}
function ii(e) {
	let t;
	return ni.tasks.size === 0 && ni.tick(ri), {
		promise: new Promise((n) => {
			ni.tasks.add(t = {
				c: e,
				f: n
			});
		}),
		abort() {
			ni.tasks.delete(t);
		}
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/transitions.js
function ai(e, t) {
	pt(() => {
		e.dispatchEvent(new CustomEvent(t));
	});
}
function oi(e) {
	if (e === "float") return "cssFloat";
	if (e === "offset") return "cssOffset";
	if (e.startsWith("--")) return e;
	let t = e.split("-");
	return t.length === 1 ? t[0] : t[0] + t.slice(1).map((e) => e[0].toUpperCase() + e.slice(1)).join("");
}
function si(e) {
	let t = {}, n = e.split(";");
	for (let e of n) {
		let [n, r] = e.split(":");
		if (!n || r === void 0) break;
		let i = oi(n.trim());
		t[i] = r.trim();
	}
	return t;
}
var ci = (e) => e;
function li(e, t, n, r) {
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
			a || f?.abort(), f = ui(t, m(), p, 1, () => {
				ai(t, "introstart");
			}, () => {
				ai(t, "introend"), f?.abort(), f = l = void 0, t.style.overflow = d;
			});
		},
		out(e) {
			if (!a) {
				e?.(), l = void 0;
				return;
			}
			t.inert = !0, p = ui(t, m(), f, 0, () => {
				ai(t, "outrostart");
			}, () => {
				ai(t, "outroend"), e?.();
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
function ui(e, t, n, r, i, a) {
	var o = r === 1, s = !1;
	if (d(t)) {
		var c;
		return et(() => {
			s || (c = ui(e, t({ direction: o ? "in" : "out" }), n, r, i, a));
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
	let { delay: l = 0, css: u, tick: p, easing: m = ci } = t;
	var h, g = () => 1 - r;
	return et(() => {
		if (!s) {
			var c = [];
			if (o && n === void 0 && (p && p(0, 1), u)) {
				var d = si(u(0, 1));
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
						var v = o + s * m(_ / f), y = si(u(v, 1 - v));
						l.push(y), d ||= y.overflow === "hidden";
					}
					d && (e.style.overflow = "hidden"), g = () => {
						var e = h.currentTime;
						return o + s * m(e / c);
					}, p && ii(() => {
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
var di = [..." 	\n\r\f\xA0\v﻿"];
function fi(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || di.includes(r[o - 1])) && (s === r.length || di.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function pi(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function mi(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function hi(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\/\*.*?\*\//g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(mi)), i && c.push(...Object.keys(i).map(mi));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = mi(e.substring(l, u).trim());
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
		return r && (n += pi(r)), i && (n += pi(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function gi(e, t, n, r, i, a) {
	var o = e[ue];
	if (we || o !== n || o === void 0) {
		var s = fi(n, r, a);
		(!we || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[ue] = n;
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
	var i = e[de];
	if (we || i !== t) {
		var a = hi(t, r);
		(!we || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[de] = t;
	} else r && (Array.isArray(r) ? (_i(e, n?.[0], r[0]), _i(e, n?.[1], r[1], "important")) : _i(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var yi = Symbol("is custom element"), bi = Symbol("is html"), xi = he ? "link" : "LINK", Si = he ? "progress" : "PROGRESS";
function q(e) {
	if (we) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					Y(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					Y(e, "checked", null), e.checked = r;
				}
			}
		};
		e[pe] = n, et(n), ft();
	}
}
function J(e, t) {
	var n = wi(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === Si) && (e.value = t ?? "");
}
function Ci(e, t) {
	var n = wi(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function Y(e, t, n, r) {
	var i = wi(e);
	we && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === xi) || i[t] !== (i[t] = n) && (t === "loading" && (e[ce] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Ei(e).has(t) ? e[t] = n : e.setAttribute(t, n));
}
function wi(e) {
	return e[le] ??= {
		[yi]: e.nodeName.includes("-"),
		[bi]: e.namespaceURI === ve
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
	}), (we && e.defaultValue !== e.value || gr(t) == null && e.value) && (n(Oi(e) ? ki(e.value) : e.value), kt !== null && r.add(kt)), En(() => {
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
function ji(e = Xe(), t, n, r) {
	var i = Ke.r, a = qn;
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
	o ? [m, h] = ct(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && Re(t), f(m)));
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
			let n = t ? B(y) : i && o ? en(e) : e;
			return P(y, n), v = !0, c !== void 0 && (c = n), e;
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
function X(e, t) {
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
//#region ../template/assets/engine/0.7.3/anchored.js
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
	Je(t, !0);
	let n = (e) => {
		var t = da(), n = I(t), a = L(n), o = R(n, 2);
		q(o);
		var s = R(o, 2);
		q(s);
		var c = R(s, 2), l = F(c), u = R(l, 2);
		q(u);
		var d = R(u, 2), f = (e) => {
			var t = ra();
			z((e) => Y(t, "title", e), [() => X("cp.eyedropper")]), V("click", t, xe), U(e, t);
		};
		G(d, (e) => {
			be && e(f);
		}), E(c);
		var p = R(c, 2);
		Yr(p, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = ia();
			q(r), z((e) => {
				Y(r, "title", t), J(r, e);
			}, [() => ve(B(n))]), V("change", r, (e) => ye(B(n), e.target.value)), U(e, r);
		}), E(p);
		var v = R(p, 2), y = (e) => {
			var t = oa(), n = I(t), a = F(n, !0), o = R(a), s = (e) => {
				var t = Nr();
				z((e) => W(t, e), [() => X("cp.linkedSuffix", { token: m() })]), U(e, t);
			}, c = /* @__PURE__ */ A(() => m());
			G(o, (e) => {
				B(c) && e(s);
			}), E(n);
			var l = R(n, 2);
			Yr(l, 21, i, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ A(() => h(B(t), 2));
				let i = () => B(n)[0], a = () => B(n)[1];
				var o = aa();
				let s;
				z((e) => {
					s = gi(o, 1, "cp-token svelte-zxiloo", null, s, { active: r() === i() }), vi(o, `background: ${a() ?? ""}`), Y(o, "title", e);
				}, [() => X("cp.tokenTitle", { name: i() })]), V("click", o, () => he(i(), a())), U(e, o);
			}), E(l), z((e) => W(a, e), [() => X("cp.themeColors")]), U(e, t);
		};
		G(v, (e) => {
			i().length && e(y);
		});
		var b = R(v, 2), x = F(b), S = R(x);
		E(b);
		var ne = R(b, 2), re = (e) => {
			var t = ca();
			Yr(t, 20, () => B(_), (e) => e, (e, t) => {
				var n = sa(), r = F(n), i = R(r, 2);
				E(n), z((e) => {
					vi(r, `background: ${t ?? ""}`), Y(r, "title", t), Y(i, "title", e);
				}, [() => X("cp.removeSaved")]), V("click", r, () => Se(t)), V("click", i, () => we(t)), U(e, n);
			}), E(t), U(e, t);
		};
		G(ne, (e) => {
			B(_).length && e(re);
		});
		var ie = R(ne, 2), ae = (e) => {
			var t = ua(), n = I(t), r = L(n, !0), i = R(n, 2);
			Yr(i, 20, () => B(g), (e) => e, (e, t) => {
				var n = la();
				z(() => {
					vi(n, `background: ${t ?? ""}`), Y(n, "title", t);
				}), V("click", n, () => Se(t)), U(e, n);
			}), E(i), z((e) => W(r, e), [() => X("common.recent")]), U(e, t);
		};
		G(ie, (e) => {
			B(g).length && e(ae);
		}), z((e, t, r, i, c) => {
			vi(n, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${B(C) ?? ""}, 100%, 50%)`), vi(a, `left: ${B(ee) * 100}%; top: ${(1 - B(w)) * 100}%`), J(o, B(C)), J(s, e), Y(s, "title", t), vi(s, `background: linear-gradient(to right, transparent, ${r ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), vi(l, `background: ${B(T) ?? ""}`), J(u, B(T)), W(x, `${i ?? ""} `), Y(S, "title", c);
		}, [
			() => Math.round(B(te) * 100),
			() => X("cp.alpha"),
			() => oe(),
			() => X("cp.saved"),
			() => X("cp.saveTitle")
		]), V("pointerdown", n, ge), V("input", o, (e) => {
			P(C, Number(e.target.value), !0), ce();
		}), V("input", s, (e) => {
			P(te, Number(e.target.value) / 100), ce();
		}), V("change", u, _e), V("click", S, Ce), U(e, t);
	}, r = Mi(t, "value", 3, "#000000"), i = Mi(t, "tokens", 19, () => []), a = Mi(t, "label", 19, () => X("cp.pickColor")), o = Mi(t, "allowClear", 3, !1), s = "urd-recent-colors", c = "urd-saved-colors", l = $i(), u = ta("urd-cp"), d = u.slice(2), f = /* @__PURE__ */ N(null), p = () => {
		let e = i().find(([e]) => e === r());
		return e ? e[1] : r();
	}, m = () => i().find(([e]) => e === r())?.[0] ?? null, g = /* @__PURE__ */ N(en([])), _ = /* @__PURE__ */ N(en([])), v = "", y = "", b = /* @__PURE__ */ N(null), x = /* @__PURE__ */ N(!1), S = /* @__PURE__ */ N(en({
		top: 0,
		left: 0
	})), C = /* @__PURE__ */ N(0), ee = /* @__PURE__ */ N(0), w = /* @__PURE__ */ N(1), te = /* @__PURE__ */ N(1), T = /* @__PURE__ */ N("#000000");
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
	function ie(e, t, n) {
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
		return re(...ae(B(C), B(ee), B(w)));
	}
	function se() {
		let e = oe();
		return B(te) >= .995 ? e : e + Math.round(B(te) * 255).toString(16).padStart(2, "0");
	}
	function ce() {
		P(T, se(), !0), y = B(T), t.onchange?.(B(T));
	}
	function le(e) {
		let t = ne(e);
		return t ? (((e) => {
			var t = h(e, 3);
			P(C, t[0], !0), P(ee, t[1], !0), P(w, t[2], !0);
		})(ie(t[0], t[1], t[2])), P(te, t[3], !0), P(T, se(), !0), !0) : !1;
	}
	function ue() {
		le(p()) || le("#000000"), v = r(), y = "";
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
	function de(e) {
		e.newState === "open" ? (ue(), na(B(b), !0), P(x, !0)) : B(x) && (na(B(b), !1), P(x, !1), pe());
	}
	function fe() {
		ue();
		let e = B(b).getBoundingClientRect(), t = B(b).closest(".panel-body")?.getBoundingClientRect(), n = t ? t.right : window.innerWidth, r = Math.max(8, Math.min(e.right - 236, n - 236 - 8)), i = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		P(S, {
			top: i,
			left: r
		}, !0), P(x, !0);
	}
	function pe() {
		if (y && y !== v) {
			let e = [y, ...B(g).filter((e) => e !== y)].slice(0, 8);
			localStorage.setItem(s, JSON.stringify(e));
		}
	}
	function me() {
		if (l) {
			B(f)?.hidePopover();
			return;
		}
		P(x, !1), pe();
	}
	function he(e, n) {
		le(n), P(T, n, !0), t.onchange?.(e);
	}
	function ge(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			P(ee, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), P(w, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), ce();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function _e(e) {
		le(e.target.value) ? ce() : P(T, oe(), !0);
	}
	function ve(e) {
		return (ne(oe()) ?? [
			0,
			0,
			0
		])[e];
	}
	function ye(e, t) {
		let n = ne(oe()) ?? [
			0,
			0,
			0
		];
		n[e] = Math.min(255, Math.max(0, Number(t) || 0)), ((e) => {
			var t = h(e, 3);
			P(C, t[0], !0), P(ee, t[1], !0), P(w, t[2], !0);
		})(ie(...n)), ce();
	}
	let be = typeof window < "u" && "EyeDropper" in window;
	async function xe() {
		try {
			le((await new window.EyeDropper().open()).sRGBHex) && ce();
		} catch {}
	}
	function Se(e) {
		le(e) && ce();
	}
	function Ce() {
		let e = se();
		B(_).includes(e) || (P(_, [e, ...B(_)].slice(0, 12), !0), localStorage.setItem(c, JSON.stringify(We(B(_)))));
	}
	function we(e) {
		P(_, B(_).filter((t) => t !== e), !0), localStorage.setItem(c, JSON.stringify(We(B(_))));
	}
	xn(() => {
		if (!B(x)) return;
		let e = () => me();
		if (window.addEventListener("blur", e), l) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			B(b) && !B(b).contains(e.target) && me();
		}, n = (e) => {
			e.key === "Escape" && me();
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), () => {
			document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), window.removeEventListener("blur", e);
		};
	});
	var Te = ha(), Ee = F(Te);
	let De;
	var Oe = R(Ee, 2), ke = (e) => {
		var n = fa();
		z((e, t) => {
			Y(n, "title", e), Y(n, "aria-label", t);
		}, [() => X("cp.clearTitle"), () => X("cp.clear")]), V("click", n, () => t.onchange?.("")), U(e, n);
	};
	G(Oe, (e) => {
		o() && r() && e(ke);
	});
	var Ae = R(Oe, 2), je = (e) => {
		var t = pa(), r = F(t), i = (e) => {
			n(e);
		};
		G(r, (e) => {
			B(x) && e(i);
		}), E(t), ji(t, (e) => P(f, e), () => B(f)), z(() => {
			Y(t, "id", d), vi(t, `position-anchor: ${u ?? ""}`);
		}), wr("toggle", t, de), V("click", t, (e) => e.preventDefault()), U(e, t);
	}, Me = (e) => {
		var t = ma(), r = F(t);
		n(r), E(t), z(() => vi(t, `top: ${B(S).top ?? ""}px; left: ${B(S).left ?? ""}px`)), V("click", t, (e) => e.preventDefault()), U(e, t);
	};
	G(Ae, (e) => {
		l ? e(je) : B(x) && e(Me, 1);
	}), E(Te), ji(Te, (e) => P(b, e), () => B(b)), z((e, t, n) => {
		De = gi(Ee, 1, "cp-swatch svelte-zxiloo", null, De, {
			linked: e,
			"cp-empty": o() && !r()
		}), vi(Ee, `background: ${t ?? ""}${l ? `; anchor-name: ${u}` : ""}`), Y(Ee, "title", n), Y(Ee, "popovertarget", l ? d : void 0), Y(Ee, "aria-label", a());
	}, [
		() => m(),
		() => r() ? p() : "transparent",
		() => m() ? X("cp.linkedTitle", {
			label: a(),
			token: m()
		}) : a()
	]), V("click", Ee, function(...e) {
		(l ? void 0 : () => B(x) ? me() : fe())?.apply(this, e);
	}), U(e, Te), Ye();
}
Tr([
	"pointerdown",
	"input",
	"change",
	"click"
]);
//#endregion
//#region ../template/assets/engine/0.7.3/imageTools.js
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
//#region ../template/assets/engine/0.7.3/glyphs.js
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
//#region ../template/assets/engine/0.7.3/icons.js
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
	Je(t, !0);
	let n = (e) => {
		var n = Za(), a = I(n), o = (e) => {
			var t = qa(), n = I(t), r = L(n, !0), a = R(n, 2), o = F(a);
			Yr(o, 16, () => B(d), (e) => e, (e, t) => {
				var n = Ga();
				let r;
				var a = F(n);
				K(a, () => Wa(t), !0), E(a), E(n), z((e) => {
					r = gi(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, r, { active: t === i() }), Y(n, "title", e);
				}, [() => X(Ha[t].labelKey)]), V("click", n, () => C(t)), U(e, n);
			}), Yr(R(o, 2), 16, () => B(u), (e) => e, (e, t) => {
				var n = Ka(), r = L(n, !0);
				z(() => W(r, t)), V("click", n, () => S(t)), U(e, n);
			}), E(a), z((e) => W(r, e), [() => X("common.recent")]), U(e, t);
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
					K(a, () => Wa(t), !0), E(a), E(n), z((e) => {
						r = gi(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, r, { active: t === i() }), Y(n, "title", e);
					}, [() => X(Ha[t].labelKey)]), V("click", n, () => C(t)), U(e, n);
				}), E(l), z((e) => W(c, e), [() => X(r())]), U(e, o);
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
					i = gi(n, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === r() }), W(a, t);
				}), V("click", n, () => S(t)), U(e, n);
			}), E(l), z((e) => W(c, e), [() => X(i())]), U(e, o);
		});
		var f = R(l, 2), p = (e) => {
			var t = Xa(), n = I(t), r = L(n, !0), i = R(n, 2), a = L(i, !0), o = R(i, 2);
			ji(o, (e) => P(m, e), () => B(m));
			var s = L(R(o, 2), !0);
			z((e, t, n) => {
				W(r, e), W(a, t), W(s, n);
			}, [
				() => X("gp.ownIcon"),
				() => X("gp.upload"),
				() => X("gp.uploadHint")
			]), V("click", i, () => B(m).click()), V("change", o, ee), U(e, t);
		};
		G(f, (e) => {
			t.onimage && e(p);
		}), U(e, n);
	}, r = Mi(t, "value", 3, "★"), i = Mi(t, "icon", 3, null), a = Mi(t, "image", 3, null), o = Mi(t, "label", 19, () => X("gp.pickGlyph")), s = $i(), c = ta("urd-gp"), l = c.slice(2), u = /* @__PURE__ */ N(en([])), d = /* @__PURE__ */ N(en([])), f = /* @__PURE__ */ N(null), p = /* @__PURE__ */ N(null), m = /* @__PURE__ */ N(null), g = /* @__PURE__ */ N(!1), _ = /* @__PURE__ */ N(en({
		top: 0,
		left: 0
	}));
	function v() {
		P(u, Ia(), !0), P(d, t.onicon ? Ra().filter((e) => Ha[e]) : [], !0);
	}
	function y(e) {
		P(g, e.newState === "open"), na(B(f), B(g)), B(g) && v();
	}
	function b() {
		s && B(p)?.hidePopover(), P(g, !1);
	}
	function x() {
		v();
		let e = B(f).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		P(_, {
			top: n,
			left: t
		}, !0), P(g, !0);
	}
	function S(e) {
		La(e), t.onpick?.(e), b();
	}
	function C(e) {
		za(e), t.onicon?.(e), b();
	}
	async function ee(e) {
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
			B(f) && !B(f).contains(e.target) && P(g, !1);
		}, n = (e) => {
			e.key === "Escape" && P(g, !1);
		}, r = (e) => {
			B(f) && e.target instanceof Node && !B(f).contains(e.target) && P(g, !1);
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var w = no(), te = F(w), T = F(te), ne = (e) => {
		var t = Qa();
		z((e) => {
			Y(t, "src", a()), Y(t, "alt", e);
		}, [() => X("gp.ownIcon")]), U(e, t);
	}, re = (e) => {
		var t = $a();
		K(t, () => Wa(i()), !0), E(t), U(e, t);
	}, ie = (e) => {
		var t = Nr();
		z(() => W(t, r() || "★")), U(e, t);
	};
	G(T, (e) => {
		a() ? e(ne) : i() && Ha[i()] ? e(re, 1) : e(ie, -1);
	}), E(te);
	var ae = R(te, 2), oe = (e) => {
		var t = eo(), r = F(t), i = (e) => {
			n(e);
		};
		G(r, (e) => {
			B(g) && e(i);
		}), E(t), ji(t, (e) => P(p, e), () => B(p)), z(() => {
			Y(t, "id", l), vi(t, `position-anchor: ${c ?? ""}`);
		}), wr("toggle", t, y), U(e, t);
	}, se = (e) => {
		var t = to(), r = F(t);
		n(r), E(t), z(() => vi(t, `top: ${B(_).top ?? ""}px; left: ${B(_).left ?? ""}px`)), U(e, t);
	};
	G(ae, (e) => {
		s ? e(oe) : B(g) && e(se, 1);
	}), E(w), ji(w, (e) => P(f, e), () => B(f)), z(() => {
		Y(te, "title", o()), Y(te, "aria-label", o()), Y(te, "popovertarget", s ? l : void 0), vi(te, s ? `anchor-name: ${c}` : void 0);
	}), V("click", te, function(...e) {
		(s ? void 0 : () => B(g) ? P(g, !1) : x())?.apply(this, e);
	}), U(e, w), Ye();
}
Tr(["click", "change"]);
//#endregion
//#region src/lib/previewBridge.js
function io(e, t = {}) {
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
function ao(e, t) {
	return !(e > 0) || !(t > 0) ? 1 : e / t;
}
function oo(e, t, n, r = 0, i = 0) {
	if (n === "full") return 1;
	let a = i > 0 ? ao(r, i) : Infinity;
	return Math.max(.1, Math.min(1, ao(e, t), a));
}
//#endregion
//#region src/lib/deploy-wait.js
function so(e, { max: t = 8 } = {}) {
	let n = (e ?? []).filter((e) => e && typeof e.path == "string" && typeof e.content == "string" && e.encoding === "utf-8" && !e.delete && (e.path.startsWith("content/") || e.path === "plugins/plugins.json"));
	return n.sort((e, t) => (e.path === "content/site.json" ? -1 : 0) - (t.path === "content/site.json" ? -1 : 0)), n.slice(0, t).map(({ path: e, content: t }) => ({
		path: e,
		content: t
	}));
}
async function co(e, { fetchFn: t = fetch, delayMs: n = 1e4, attempts: r = 18, sleep: i = (e) => new Promise((t) => setTimeout(t, e)) } = {}) {
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
var lo = 3840, uo = 2400, fo = (e, t, n) => Math.min(n, Math.max(t, e));
function po({ innerWidth: e = 0, screenWidth: t = 0 } = {}) {
	let n = e > 0 ? e : t;
	return Math.max(1, Math.round(n > 0 ? n : 1));
}
function mo(e) {
	return !e || typeof e.innerWidth != "number" ? null : po({
		innerWidth: e.innerWidth,
		screenWidth: e.screen?.width ?? 0
	});
}
function ho(e, t) {
	let n = e && typeof e == "object" && !Array.isArray(e) ? e : {}, r = n.mode === "custom" ? "custom" : "own", i = Number(n.width), a = fo(Number.isFinite(i) && i > 0 ? i : t, 640, lo), o = Number(n.height), s = Number.isFinite(o) && o > 0 ? fo(o, 480, uo) : 0;
	return {
		mode: r,
		width: Math.round(a),
		height: Math.round(s)
	};
}
function go(e, t) {
	return e?.mode === "custom" ? {
		width: e.width,
		height: e.height || 0
	} : {
		width: t,
		height: 0
	};
}
var _o = 1920, vo = [
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
], yo = [
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
], bo = [
	1920,
	1536,
	1366
];
function xo(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 1440;
	let n = Math.round(t / 20) * 20;
	return Math.min(_o, Math.max(960, n));
}
function So(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 6;
	let n = Math.round(t / 1) * 1;
	return Math.min(12, Math.max(0, n));
}
function Co(e, t) {
	if (e === "full") return 0;
	let n = Math.min(49, Math.max(0, Number(t) || 0));
	return Math.ceil(Number(e) / (1 - 2 * n / 100));
}
function wo(e, t, n) {
	let r = Math.max(0, Number(t) || 0) / 100 * n, i = Math.max(0, n - 2 * r), a = e !== "full" && Number(e) < i, o = a ? Number(e) : i;
	return {
		width: o,
		margin: Math.round((n - o) / 2),
		pct: n > 0 ? o / n * 100 : 0,
		bound: a
	};
}
function To(e) {
	return yo.find((t) => t.width === e)?.id ?? null;
}
//#endregion
//#region src/lib/nav-size.js
var Eo = {
	min: 0,
	max: 64,
	step: 1
}, Do = {
	min: 12,
	max: 28,
	step: 1
}, Oo = {
	min: 0,
	max: 80,
	step: 1
}, ko = {
	min: 0,
	max: 64,
	step: 1
}, Ao = {
	min: 480,
	max: 1920,
	step: 20
}, jo = {
	min: .3,
	max: .8,
	step: .05
}, Mo = {
	min: 0,
	max: 64,
	step: 1
}, No = {
	min: 180,
	max: 400,
	step: 1
}, Po = {
	min: 12,
	max: 128,
	step: 1
}, Fo = {
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
}, Io = [
	"sm",
	"md",
	"lg",
	"xl"
], Lo = .67;
function Ro(e) {
	return e === "floating" || e === "floating-square" || e === "floating-tab";
}
function zo(e, { min: t, max: n, step: r = 1 }, i) {
	let a = Number(e);
	if (e == null || e === "" || !Number.isFinite(a)) return i;
	let o = Math.round(a / r) * r, s = Math.min(n, Math.max(t, o));
	return r < 1 ? Math.round(s * 100) / 100 : s;
}
function Bo(e, t) {
	if (e?.padY != null && e.padY !== "") return zo(e.padY, Eo, Fo.md.padY);
	let n = Fo[e?.size] ?? Fo.md;
	return Math.round(n.padY * (Ro(t) ? Lo : 1));
}
function Vo(e) {
	if (e?.textSize != null && e.textSize !== "") return zo(e.textSize, Do, Fo.md.textSize);
	let t = Fo[e?.size] ?? Fo.md;
	return Math.round(t.textSize);
}
function Ho(e) {
	return e?.padY != null && e.padY !== "" || e?.textSize != null && e.textSize !== "" ? null : Io.includes(e?.size) ? e.size : "md";
}
//#endregion
//#region src/lib/Dropdown.svelte
var Uo = /* @__PURE__ */ H("<button type=\"button\"> </button>"), Wo = /* @__PURE__ */ H("<button type=\"button\" class=\"dd-btn svelte-vtocc6\"><span class=\"dd-value svelte-vtocc6\"> </span> <span class=\"dd-caret svelte-vtocc6\"> </span></button> <div class=\"dd-pop dd-anchored svelte-vtocc6\" popover=\"auto\"><!></div>", 1), Go = /* @__PURE__ */ H("<div class=\"dd-pop svelte-vtocc6\"></div>"), Ko = /* @__PURE__ */ H("<button type=\"button\" class=\"dd-btn svelte-vtocc6\"><span class=\"dd-value svelte-vtocc6\"> </span> <span class=\"dd-caret svelte-vtocc6\"> </span></button> <!>", 1), qo = /* @__PURE__ */ H("<span class=\"dd svelte-vtocc6\"><!></span>");
function Z(e, t) {
	Je(t, !0);
	let n = Mi(t, "value", 3, null), r = Mi(t, "options", 19, () => []), i = Mi(t, "title", 3, null), a = Mi(t, "disabled", 3, !1), o = $i(), s = ta("urd-dd"), c = s.slice(2), l = /* @__PURE__ */ N(!1), u = /* @__PURE__ */ N(null), d = /* @__PURE__ */ N(null), f = /* @__PURE__ */ N(en({
		top: 0,
		left: 0,
		width: 160
	})), p = () => r().find(([e]) => `${e ?? ""}` == `${n() ?? ""}`)?.[1] ?? "";
	function m() {
		let e = B(u).getBoundingClientRect(), t = Math.min(320, r().length * 32 + 12), n = Math.max(e.width, 160), i = e.bottom + t + 8 <= window.innerHeight;
		P(f, {
			top: i ? e.bottom + 4 : Math.max(8, e.top - t - 4),
			left: Math.max(8, Math.min(e.left, window.innerWidth - n - 8)),
			width: n
		}, !0);
	}
	function g() {
		if (!a()) {
			if (B(l)) {
				P(l, !1);
				return;
			}
			m(), P(l, !0);
		}
	}
	function _(e) {
		o && B(d)?.hidePopover(), P(l, !1), t.onchange?.(e);
	}
	xn(() => {
		if (!B(l)) return;
		let e = () => {
			o ? B(d)?.hidePopover() : P(l, !1);
		};
		if (window.addEventListener("blur", e), o) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			B(u) && !B(u).contains(e.target) && P(l, !1);
		}, n = (e) => {
			e.key === "Escape" && P(l, !1);
		}, r = (e) => {
			B(u) && e.target instanceof Node && !B(u).contains(e.target) && m();
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var v = qo(), y = F(v), b = (e) => {
		var t = Wo(), o = I(t), u = F(o), f = L(u, !0), m = L(R(u, 2), !0);
		E(o);
		var g = R(o, 2), v = F(g), y = (e) => {
			var t = Pr();
			Yr(I(t), 17, r, ([e, t]) => `${e ?? ""}`, (e, t) => {
				var r = /* @__PURE__ */ A(() => h(B(t), 2));
				let i = () => B(r)[0], a = () => B(r)[1];
				var o = Uo();
				let s;
				var c = L(o, !0);
				z(() => {
					s = gi(o, 1, "dd-opt svelte-vtocc6", null, s, { selected: `${i() ?? ""}` == `${n() ?? ""}` }), W(c, a());
				}), V("click", o, () => _(i())), U(e, o);
			}), U(e, t);
		};
		G(v, (e) => {
			B(l) && e(y);
		}), E(g), ji(g, (e) => P(d, e), () => B(d)), z((e) => {
			Y(o, "title", i()), o.disabled = a(), Y(o, "popovertarget", c), vi(o, `anchor-name: ${s ?? ""}`), W(f, e), W(m, B(l) ? "▴" : "▾"), Y(g, "id", c), vi(g, `position-anchor: ${s ?? ""}`);
		}, [() => p()]), wr("toggle", g, (e) => {
			P(l, e.newState === "open");
		}), U(e, t);
	}, x = (e) => {
		var t = Ko(), o = I(t), s = F(o), c = L(s, !0), u = L(R(s, 2), !0);
		E(o);
		var d = R(o, 2), m = (e) => {
			var t = Go();
			Yr(t, 21, r, ([e, t]) => `${e ?? ""}`, (e, t) => {
				var r = /* @__PURE__ */ A(() => h(B(t), 2));
				let i = () => B(r)[0], a = () => B(r)[1];
				var o = Uo();
				let s;
				var c = L(o, !0);
				z(() => {
					s = gi(o, 1, "dd-opt svelte-vtocc6", null, s, { selected: `${i() ?? ""}` == `${n() ?? ""}` }), W(c, a());
				}), V("click", o, () => _(i())), U(e, o);
			}), E(t), z(() => vi(t, `top: ${B(f).top ?? ""}px; left: ${B(f).left ?? ""}px; min-width: ${B(f).width ?? ""}px`)), U(e, t);
		};
		G(d, (e) => {
			B(l) && e(m);
		}), z((e) => {
			Y(o, "title", i()), o.disabled = a(), W(c, e), W(u, B(l) ? "▴" : "▾");
		}, [() => p()]), V("click", o, g), U(e, t);
	};
	G(y, (e) => {
		o ? e(b) : e(x, -1);
	}), E(v), ji(v, (e) => P(u, e), () => B(u)), U(e, v), Ye();
}
Tr(["click"]);
//#endregion
//#region src/lib/IconEditor.svelte
var Jo = /* @__PURE__ */ H("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\"> </h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\"></canvas> <p class=\"ie-hint svelte-e7sog7\"> </p></div> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"ghost svelte-e7sog7\"> </button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"primary svelte-e7sog7\"> </button></span></div></div>");
function Yo(e, t) {
	Je(t, !0);
	let n = Mi(t, "image", 3, ""), r = /* @__PURE__ */ N(null), i = /* @__PURE__ */ N(null), a = /* @__PURE__ */ N(1), o = /* @__PURE__ */ N(.5), s = /* @__PURE__ */ N(.5), c = /* @__PURE__ */ N(1), l = /* @__PURE__ */ N(1), u = /* @__PURE__ */ N(1);
	xn(() => {
		if (!n()) return;
		let e = new Image();
		e.onload = () => {
			P(i, e, !0);
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
			P(o, Math.min(1, Math.max(0, B(o) - (e.clientX - t) / c)), !0), P(s, Math.min(1, Math.max(0, B(s) - (e.clientY - n) / l)), !0), t = e.clientX, n = e.clientY;
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
	var h = Jo(), g = F(h), _ = F(g), v = L(_, !0), y = R(_, 2), b = F(y);
	Y(b, "width", 220), Y(b, "height", 220), ji(b, (e) => P(r, e), () => B(r));
	var x = L(R(b, 2), !0);
	E(y);
	var S = R(y, 2), C = F(S), ee = L(R(C));
	E(S);
	var w = R(S, 2);
	q(w);
	var te = R(w, 2), T = F(te), ne = L(R(T));
	E(te);
	var re = R(te, 2);
	q(re);
	var ie = R(re, 2), ae = F(ie), oe = L(R(ae));
	E(ie);
	var se = R(ie, 2);
	q(se);
	var ce = R(se, 2), le = F(ce), ue = L(R(le));
	E(ce);
	var de = R(ce, 2);
	q(de);
	var fe = R(de, 2), pe = F(fe), me = L(pe, !0), he = R(pe, 2), ge = L(he, !0);
	E(fe);
	var _e = R(fe, 2), ve = F(_e), ye = L(ve, !0), be = R(ve, 2), xe = L(be, !0);
	E(_e), E(g), E(h), z((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) => {
		W(v, e), Y(b, "title", t), W(x, n), W(C, `${r ?? ""} `), W(ee, `${i ?? ""}x`), W(T, `${a ?? ""} `), W(ne, `${o ?? ""}%`), W(ae, `${s ?? ""} `), W(oe, `${c ?? ""}%`), W(le, `${l ?? ""} `), W(ue, `${u ?? ""}%`), W(me, d), W(ge, f), W(ye, p), W(xe, m);
	}, [
		() => X("ie.title"),
		() => X("ie.dragTip"),
		() => X("ie.hint"),
		() => X("lbl.zoom"),
		() => B(a).toFixed(2),
		() => X("lbl.brightness"),
		() => Math.round(B(c) * 100),
		() => X("lbl.contrast"),
		() => Math.round(B(l) * 100),
		() => X("lbl.saturate"),
		() => Math.round(B(u) * 100),
		() => X("ie.grayscale"),
		() => X("common.reset"),
		() => X("confirm.cancel"),
		() => X("common.apply")
	]), V("pointerdown", b, f), Di(w, () => B(a), (e) => P(a, e)), Di(re, () => B(c), (e) => P(c, e)), Di(se, () => B(l), (e) => P(l, e)), Di(de, () => B(u), (e) => P(u, e)), V("click", pe, () => P(u, 0)), V("click", he, p), V("click", ve, () => t.oncancel?.()), V("click", be, m), U(e, h), Ye();
}
Tr(["pointerdown", "click"]);
//#endregion
//#region ../template/assets/engine/0.7.3/blocks/form.js
var Xo = () => [
	{
		id: "navn",
		label: X("form.fieldName"),
		type: "text",
		required: !0
	},
	{
		id: "epost",
		label: X("form.fieldEmail"),
		type: "email",
		required: !0
	},
	{
		id: "melding",
		label: X("form.fieldMessage"),
		type: "textarea",
		required: !0
	}
], Zo = 24, Qo = {
	"oppsett-byttet": "layout-changed",
	"blokk-endret": "block-edited",
	"desktop-endret-etter-mobil": "desktop-changed-after-mobile",
	seksjonshøyde: "section-height",
	"blokk-flyttet": "block-moved",
	"blokk-slettet": "block-deleted",
	"blokk-lagt-til": "block-added"
};
function $o(e, t) {
	if (!e || !("y" in e || "h" in e)) return e ?? null;
	if (t && e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h) return null;
	let n = {
		x: e.x,
		w: e.w
	};
	return Number.isFinite(e.y) && (n.row = Math.max(1, Math.round((e.y - Zo) / 8) + 1), n.rows = Number.isFinite(e.h) ? Math.max(1, Math.ceil(e.h / 8)) : 1), Number.isFinite(e.z) && e.z !== 1 && (n.z = e.z), e.rot && (n.rot = e.rot), n;
}
var es = {
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
}, ts = { bildegalleri: "slideshow" }, ns = {
	flate: "surface",
	aksent: "accent",
	invers: "inverse",
	dus: "soft",
	dempet: "muted",
	dyp: "deep",
	uthevet: "highlighted"
}, rs = {
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
function is(e) {
	let t = Array.isArray(e) ? e : e.blocks ?? [];
	for (let e of t) es[e.type] && (e.type = es[e.type]);
	if (!Array.isArray(e)) {
		for (let t of e.background?.layers ?? []) ts[t.type] && (t.type = ts[t.type]);
		ns[e.theme] && (e.theme = ns[e.theme]), rs[e.preset] && (e.preset = rs[e.preset]);
	}
	return e;
}
var as = {
	1: (e) => {
		for (let t of e.sections ?? []) {
			let e = t.responsive?.mobile;
			for (let e of t.blocks ?? []) e.decor && (e.hideMobile = !0), e.frames?.mobile && (e.frames.mobile = $o(e.frames.mobile, e.frames.desktop));
			e?.mode === "manual" && (e.mode = "auto");
			let n = e?.attention?.reason;
			n && Qo[n] && (e.attention.reason = Qo[n]);
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) is(t);
		return e;
	},
	3: (e) => {
		for (let t of e.sections ?? []) is(t);
		return e;
	}
}, os = {
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
function ss(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 3;) {
		let r = os[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function cs(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 4;) {
		let i = as[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/0.7.3/plugins.js
function ls(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var us = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function ds(e, t) {
	let n = ls(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = ls(t[2]), a = us(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var fs = /^[a-z0-9][a-z0-9-]*$/;
function ps(e) {
	let t = [];
	if (!e || typeof e != "object") return ["the manifest is not an object"];
	fs.test(e.id ?? "") || t.push("id is missing or invalid"), (typeof e.name != "string" || !e.name) && t.push("name is missing"), ls(e.version ?? "") || t.push("version is not semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine is missing");
	let n = Array.isArray(e.languages) && e.languages.length > 0;
	return (e.entry !== void 0 || !n) && (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry is missing or is not a .js file"), (e.provides !== void 0 || !n) && (!e.provides || typeof e.provides != "object") && t.push("provides is missing"), e.languages !== void 0 && t.push(...zi(e.languages)), e.locales !== void 0 && typeof e.locales != "boolean" && t.push("locales must be a boolean"), e.names !== void 0 && (typeof e.names != "object" || e.names === null || Array.isArray(e.names) || Object.values(e.names).some((e) => typeof e != "string" || !e)) && t.push("names must be an object mapping language code to name"), t;
}
Promise.resolve();
//#endregion
//#region ../template/assets/engine/0.7.3/sections/presets.js
function ms(e) {
	return typeof crypto < "u" && crypto.randomUUID ? `${e}-${crypto.randomUUID().slice(0, 8)}` : `${e}-${[...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4))].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
var hs = () => ({ mobile: {
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
}), $ = (e, t, n = {}) => ({
	id: ms("blk"),
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
}), gs = (e, t = {}) => ({
	id: ms("blk"),
	type: "image",
	version: 1,
	props: {
		src: "",
		alt: X("seed.imageAlt"),
		fit: "cover",
		radius: "md",
		href: null,
		...t
	},
	animation: null,
	frames: e
}), _s = (e, t, n = {}) => ({
	id: ms("blk"),
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
}), vs = (e, t, n = 40) => ({
	id: ms("blk"),
	type: "icon",
	version: 1,
	props: {
		glyph: t,
		color: "accent",
		size: n
	},
	animation: null,
	frames: e
}), ys = (e, t = {}) => ({
	id: ms("blk"),
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
}), bs = (e, t = {}) => ({
	id: ms("blk"),
	type: "form",
	version: 1,
	props: {
		recipient: "",
		subject: "",
		mode: "mailto",
		endpoint: "",
		submitLabel: X("form.sendDefault"),
		successText: X("form.thanksDefault"),
		fields: Xo(),
		...t
	},
	animation: null,
	frames: e
}), xs = (e, t = {}) => ({
	id: ms("blk"),
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
}), Ss = () => ({
	type: "hover-lift",
	version: 1,
	props: {}
}), Cs = (e, t, n = {}) => ({
	id: ms("blk"),
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
}), ws = (e, t = {}) => ({
	id: ms("blk"),
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
}), Ts = (e, t = {}) => ({
	id: ms("blk"),
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
}), Es = (e, t = {}) => ({
	id: ms("blk"),
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
}), Ds = (e, t = {}) => ({
	id: ms("blk"),
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
}), Os = (e, t) => ({
	id: ms("blk"),
	type: "faq",
	version: 1,
	props: {
		items: t,
		multi: !1
	},
	animation: null,
	frames: e
}), ks = (e, t = {}) => ({
	id: ms("blk"),
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
}), As = (e, t) => ({
	id: ms("blk"),
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
}), js = (e, t = {}) => ({
	id: ms("blk"),
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
}), Ms = (...e) => ({
	version: 1,
	layers: e
}), Ns = (e) => ({
	type: "color",
	version: 1,
	props: { value: e }
}), Ps = (e, t, n, r = .5) => ({
	type: "glow",
	version: 1,
	props: {
		x: e,
		y: t,
		color: "accent",
		radius: r,
		opacity: n
	}
}), Fs = (e) => Math.max(0, ...e.blocks.map((e) => e.frames.desktop.y + e.frames.desktop.h)), Is = (e, t, n, r, i, a) => ({
	x: n + e % t * r,
	y: i + Math.floor(e / t) * a
}), Ls = (e, t, n, r, i, a, o, s, c = 0) => {
	let l = (t) => e.blocks.some((e) => {
		let n = e.frames.desktop;
		return n.x < t.x + t.w - .01 && t.x < n.x + n.w - .01 && n.y < t.y + t.h - .01 && t.y < n.y + n.h - .01;
	});
	for (let e = 0; e < 60; e++) {
		let u = Is(e, t, n, r, i, a);
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
		y: Fs(e) + 16,
		n: 0
	};
}, Rs = (e, t, n) => e + t * .1 + n * .01, zs = (e, t, n, r, i = null) => ({
	id: ms("sec"),
	version: 1,
	preset: e,
	size: { minHeight: t },
	grid: i,
	background: n,
	blocks: r,
	responsive: hs()
});
function Bs(e) {
	e.sections.define("blank", {
		label: "Empty section",
		labelKey: "preset.blank.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "A blank canvas to build on freely",
		hintKey: "preset.blank.hint",
		create: () => zs("blank", "40vh", Ms(Ns("bg")), [])
	}), e.sections.define("hero", {
		label: "Hero",
		labelKey: "preset.hero.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Large opening with gradient and glow, left-aligned",
		hintKey: "preset.hero.hint",
		create: () => zs("hero", "70vh", {
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
				Ps(.7, .2, .35),
				{
					type: "grain",
					version: 1,
					props: { opacity: .06 }
				}
			]
		}, [
			$(Q(8.33, 40, 50, 38), X("seed.hero.title")),
			$(Q(8.33, 84, 41.67, 26), X("seed.hero.intro")),
			_s(Q(8.33, 118, 20, 32), X("seed.readMore"))
		])
	}), e.sections.define("hero-centered", {
		label: "Hero, centred",
		labelKey: "preset.hero-centered.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Centred opening with two buttons",
		hintKey: "preset.hero-centered.hint",
		create: () => zs("hero-centered", "60vh", Ms(Ns("bg")), [
			$(Q(15, 64, 70, 44), X("seed.heroCenter.title"), { align: "center" }),
			$(Q(25, 116, 50, 26), X("seed.heroCenter.intro"), { align: "center" }),
			_s(Q(31.5, 160, 17, 40), X("seed.join")),
			_s(Q(51.5, 160, 17, 40), X("seed.readMore"), { style: "secondary" })
		])
	}), e.sections.define("images", {
		label: "Images",
		labelKey: "preset.images.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Title and three image frames",
		hintKey: "preset.images.hint",
		create: () => zs("images", "360px", Ms(Ns("bg")), [
			$(Q(4, 24, 50, 32), X("seed.images.title")),
			gs(Q(4, 72, 28, 220)),
			gs(Q(36, 72, 28, 220)),
			gs(Q(68, 72, 28, 220))
		]),
		itemLabel: "image",
		itemLabelKey: "item.image",
		item: (e) => {
			let { x: t, y: n } = Ls(e, 3, 4, 32, 72, 244, 28, 220);
			return {
				blocks: [gs(Q(t, n, 28, 220))],
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
		create: () => zs("gallery", "440px", Ms(Ns("bg")), [$(Q(4, 24, 50, 32), X("seed.gallery.title")), Ds(Q(4, 72, 92, 320))])
	}), e.sections.define("find-us", {
		label: "Find us",
		labelKey: "preset.find-us.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Map with your address (privacy-friendly OpenStreetMap)",
		hintKey: "preset.find-us.hint",
		create: () => zs("find-us", "480px", Ms(Ns("bg")), [$(Q(6, 40, 60, 70), X("seed.findUs.title")), ys(Q(6, 120, 88, 360, 2))])
	}), e.sections.define("whats-on", {
		label: "What is on",
		labelKey: "preset.whats-on.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Event list from a subscribable calendar (iCal/Google)",
		hintKey: "preset.whats-on.hint",
		create: () => zs("whats-on", "520px", Ms(Ns("bg")), [$(Q(6, 40, 60, 70), X("seed.whatsOn.title")), xs(Q(6, 130, 88, 320, 2), { limit: 5 })])
	}), e.sections.define("contact-form", {
		label: "Contact form",
		labelKey: "preset.contact-form.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Contact form that sends via email (or your own endpoint)",
		hintKey: "preset.contact-form.hint",
		create: () => zs("contact-form", "520px", Ms(Ns("bg")), [$(Q(6, 40, 60, 120), X("seed.contactForm.intro")), bs(Q(6, 180, 60, 380, 2))])
	}), e.sections.define("contact", {
		label: "Contact",
		labelKey: "preset.contact.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Contact details in a card with an email button",
		hintKey: "preset.contact.hint",
		create: () => zs("contact", "320px", Ms(Ns("surface"), Ps(.2, .8, .2)), [
			$(Q(10, 32, 40, 36), X("seed.contact.title")),
			$(Q(10, 84, 36, 130), X("seed.contact.info"), { box: !0 }),
			_s(Q(60, 100, 22, 40), X("seed.contact.button"), { href: `mailto:${X("seed.email")}` })
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
				let i = vs(Q(e + 10.5, 88, 4, 52), n), a = $(Q(e, 152, 25, 200), X("seed.features.card", { title: r }), {
					align: "center",
					box: !0
				});
				return a.animation = Ss(), i.mobileOrder = Rs(88, t, 0), a.mobileOrder = Rs(88, t, 1), [i, a];
			};
			return zs("feature-cards", "420px", Ms(Ns("bg")), [
				$(Q(6, 28, 60, 38), X("seed.features.title")),
				...e(6, 0, "✦", X("seed.features.card1")),
				...e(37.5, 1, "★", X("seed.features.card2")),
				...e(69, 2, "✓", X("seed.features.card3"))
			]);
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = Ls(e, 3, 6, 31.5, 152, 296, 25, 264, -64), i = vs(Q(t + 10.5, n - 64, 4, 52), "✦"), a = $(Q(t, n, 25, 200), X("seed.features.card", { title: X("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return a.animation = Ss(), i.mobileOrder = Rs(88, r, 0), a.mobileOrder = Rs(88, r, 1), {
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
				let r = $(Q(e, 88, 25, 200), X("seed.features.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.animation = Ss(), r.mobileOrder = Rs(88, t, 0), r;
			};
			return zs("feature-cards-simple", "360px", Ms(Ns("bg")), [
				$(Q(6, 28, 60, 38), X("seed.features.title")),
				e(6, 0, X("seed.features.card1")),
				e(37.5, 1, X("seed.features.card2")),
				e(69, 2, X("seed.features.card3"))
			]);
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = Ls(e, 3, 6, 31.5, 88, 232, 25, 200), i = $(Q(t, n, 25, 200), X("seed.features.card", { title: X("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.animation = Ss(), i.mobileOrder = Rs(88, r, 0), {
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
				let n = gs(Q(e, 88, 25, 160)), r = $(Q(e, 256, 25, 160), X("seed.news.card"));
				return n.mobileOrder = Rs(88, t, 0), r.mobileOrder = Rs(88, t, 1), [n, r];
			};
			return zs("news", "460px", Ms(Ns("bg")), [
				$(Q(6, 28, 50, 38), X("seed.news.title")),
				_s(Q(78, 30, 16, 36), X("seed.news.seeAll"), { style: "secondary" }),
				...e(6, 0),
				...e(37.5, 1),
				...e(69, 2)
			]);
		},
		itemLabel: "story",
		itemLabelKey: "item.story",
		item: (e) => {
			let { x: t, y: n, n: r } = Ls(e, 3, 6, 31.5, 88, 344, 25, 328), i = gs(Q(t, n, 25, 160)), a = $(Q(t, n + 168, 25, 160), X("seed.news.card"));
			return i.mobileOrder = Rs(88, r, 0), a.mobileOrder = Rs(88, r, 1), {
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
		create: () => zs("news-collection", "300px", Ms(Ns("bg")), [$(Q(6, 28, 50, 38), X("seed.news.title")), Cs(Q(6, 88, 88, 180), "cards")])
	}), e.sections.define("noticeboard", {
		label: "Noticeboard",
		labelKey: "preset.noticeboard.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Dated list from a collection (notices/announcements)",
		hintKey: "preset.noticeboard.hint",
		create: () => zs("noticeboard", "300px", Ms(Ns("surface")), [$(Q(6, 28, 50, 38), X("seed.noticeboard.title")), Cs(Q(6, 88, 88, 180), "list", { limit: 8 })])
	}), e.sections.define("publication-archive", {
		label: "Publication archive",
		labelKey: "preset.publication-archive.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Year-grouped archive from a collection (issues, minutes, reports)",
		hintKey: "preset.publication-archive.hint",
		create: () => zs("publication-archive", "300px", Ms(Ns("bg")), [$(Q(6, 28, 60, 38), X("seed.archive.title")), Cs(Q(6, 88, 88, 180), "archive", { limit: 0 })])
	}), e.sections.define("events", {
		label: "Events",
		labelKey: "preset.events.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Three rows with date badge and sign-up button",
		hintKey: "preset.events.hint",
		create: () => {
			let e = (e, t, n, r) => [
				$(Q(6, e, 8, 88), X("seed.events.dateBadge", {
					day: t,
					month: n
				}), {
					align: "center",
					box: !0
				}),
				$(Q(16, e, 58, 88), X("seed.events.row", { title: r })),
				_s(Q(78, e + 24, 16, 40), X("seed.events.signup"), { style: "secondary" })
			];
			return zs("events", "440px", Ms(Ns("surface")), [
				$(Q(6, 28, 50, 38), X("seed.events.title")),
				...e(88, "11", X("seed.events.monthAug"), X("seed.events.row1")),
				...e(196, "25", X("seed.events.monthAug"), X("seed.events.row2")),
				...e(304, "8", X("seed.events.monthSep"), X("seed.events.row3"))
			]);
		},
		itemLabel: "row",
		itemLabelKey: "item.row",
		item: (e) => {
			let t = Fs(e) + 16;
			return {
				blocks: [
					$(Q(6, t, 8, 88), X("seed.events.newBadge"), {
						align: "center",
						box: !0
					}),
					$(Q(16, t, 58, 88), X("seed.events.row", { title: X("seed.events.newTitle") })),
					_s(Q(78, t + 24, 16, 40), X("seed.events.signup"), { style: "secondary" })
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
				let r = gs(Q(e, 80, 22, 180), { alt: X("seed.team.alt") }), i = $(Q(e, 268, 22, 84), X("seed.team.member", { role: n }), { align: "center" });
				return r.mobileOrder = Rs(80, t, 0), i.mobileOrder = Rs(80, t, 1), [r, i];
			};
			return zs("team", "420px", Ms(Ns("surface")), [
				$(Q(6, 24, 50, 32), X("seed.team.title")),
				...e(7.5, 0, X("seed.team.role1")),
				...e(39, 1, X("seed.team.role2")),
				...e(70.5, 2, X("seed.team.role3"))
			]);
		},
		itemLabel: "person",
		itemLabelKey: "item.person",
		item: (e) => {
			let { x: t, y: n, n: r } = Ls(e, 3, 7.5, 31.5, 80, 288, 22, 272), i = gs(Q(t, n, 22, 180), { alt: X("seed.team.alt") }), a = $(Q(t, n + 188, 22, 84), X("seed.team.member", { role: X("seed.team.roleNew") }), { align: "center" });
			return i.mobileOrder = Rs(80, r, 0), a.mobileOrder = Rs(80, r, 1), {
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
		create: () => zs("faq", "520px", Ms(Ns("bg")), [
			$(Q(25, 24, 50, 36), X("seed.faq.title"), { align: "center" }),
			Os(Q(20, 80, 60, 320), [
				{
					q: X("seed.faq.q1"),
					a: X("seed.faq.answer")
				},
				{
					q: X("seed.faq.q2"),
					a: X("seed.faq.answer")
				},
				{
					q: X("seed.faq.q3"),
					a: X("seed.faq.answer")
				}
			]),
			$(Q(20, 416, 60, 32), X("seed.faq.more"), { align: "center" })
		])
	}), e.sections.define("timeline", {
		label: "Timeline",
		labelKey: "preset.timeline.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Your story as events along a line",
		hintKey: "preset.timeline.hint",
		create: () => zs("timeline", "480px", Ms(Ns("bg")), [$(Q(25, 24, 50, 36), X("seed.timeline.title"), { align: "center" }), As(Q(25, 88, 50, 330), [
			{
				year: "2019",
				title: X("seed.timeline.t1"),
				text: X("seed.timeline.text")
			},
			{
				year: "2022",
				title: X("seed.timeline.t2"),
				text: X("seed.timeline.text")
			},
			{
				year: "2026",
				title: X("seed.timeline.t3"),
				text: X("seed.timeline.text")
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
				let r = $(Q(e, 88, 25, 72), `<h3>${t + 1}</h3>`, {
					align: "center",
					size: 44
				}), i = $(Q(e, 168, 25, 160), X("seed.steps.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.mobileOrder = Rs(88, t, 0), i.mobileOrder = Rs(88, t, 1), [r, i];
			};
			return zs("steps", "400px", Ms(Ns("bg")), [
				$(Q(6, 28, 60, 38), X("seed.steps.title")),
				...e(6, 0, X("seed.steps.s1")),
				...e(37.5, 1, X("seed.steps.s2")),
				...e(69, 2, X("seed.steps.s3"))
			]);
		},
		itemLabel: "step",
		itemLabelKey: "item.step",
		item: (e) => {
			let { x: t, y: n, n: r } = Ls(e, 3, 6, 31.5, 88, 272, 25, 240), i = $(Q(t, n, 25, 72), `<h3>${r + 1}</h3>`, {
				align: "center",
				size: 44
			}), a = $(Q(t, n + 80, 25, 160), X("seed.steps.card", { title: X("seed.steps.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.mobileOrder = Rs(88, r, 0), a.mobileOrder = Rs(88, r, 1), {
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
				gs(Q(6, 40, 55, 300)),
				$(Q(6, 348, 55, 108), X("seed.feature.main")),
				_s(Q(6, 464, 14, 38), X("seed.readMore"), { style: "secondary" }),
				gs(Q(66, 40, 28, 120)),
				$(Q(66, 164, 28, 60), X("seed.feature.small1")),
				gs(Q(66, 244, 28, 120)),
				$(Q(66, 368, 28, 60), X("seed.feature.small2"))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = Rs(40, t < 3 ? 0 : 1, t);
			}), zs("lead-story", "540px", Ms(Ns("bg")), e);
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
					gs(Q(e, 88, 25, 200)),
					$(Q(e, 296, 25, 76), X("seed.products.card", {
						name: n,
						price: r
					}), { align: "center" }),
					_s(Q(e + 5, 380, 15, 40), X("seed.products.buy"))
				];
				return i.forEach((e, n) => {
					e.mobileOrder = Rs(88, t, n);
				}), i;
			};
			return zs("products", "470px", Ms(Ns("bg")), [
				$(Q(6, 28, 50, 38), X("seed.products.title")),
				...e(6, 0, X("seed.products.name"), X("seed.products.price1")),
				...e(37.5, 1, X("seed.products.name"), X("seed.products.price2")),
				...e(69, 2, X("seed.products.name"), X("seed.products.price3"))
			]);
		},
		itemLabel: "product",
		itemLabelKey: "item.product",
		item: (e) => {
			let { x: t, y: n, n: r } = Ls(e, 3, 6, 31.5, 88, 348, 25, 332), i = [
				gs(Q(t, n, 25, 200)),
				$(Q(t, n + 208, 25, 76), X("seed.products.card", {
					name: X("seed.products.name"),
					price: X("seed.products.price1")
				}), { align: "center" }),
				_s(Q(t + 5, n + 292, 15, 40), X("seed.products.buy"))
			];
			return i.forEach((e, t) => {
				e.mobileOrder = Rs(88, r, t);
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
		create: () => zs("shop", "544px", Ms(Ns("bg")), [
			$(Q(6, 28, 50, 38), X("seed.shop.title")),
			Ts(Q(78, 88, 16, 48)),
			ws(Q(6, 176, 88, 320))
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
				$(Q(6, 48, 52, 96), X("seed.shopHero.title")),
				$(Q(6, 152, 40, 48), X("seed.shopHero.sub")),
				_s(Q(6, 216, 17, 42), X("seed.shopHero.cta")),
				gs(Q(62, 40, 32, 300))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = Rs(48, t < 3 ? 0 : 1, t);
			}), zs("shop-hero", "400px", {
				version: 1,
				layers: [
					Ns("bg"),
					Ps(.8, .25, .28, .6),
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
				let r = gs(Q(e, 88, 21, 170)), i = $(Q(e, 266, 21, 34), X("seed.shopCategories.tile", { name: n }), { align: "center" });
				return r.mobileOrder = Rs(88, t, 0), i.mobileOrder = Rs(88, t, 1), [r, i];
			}, t = zs("shop-categories", "360px", Ms(Ns("bg")), [
				$(Q(6, 28, 60, 38), X("seed.shopCategories.title")),
				...e(6, 0, X("seed.shopCategories.cat1")),
				...e(29.5, 1, X("seed.shopCategories.cat2")),
				...e(53, 2, X("seed.shopCategories.cat3")),
				...e(76.5, 3, X("seed.shopCategories.cat4"))
			]);
			return t.theme = "soft", t;
		},
		itemLabel: "category",
		itemLabelKey: "item.category",
		item: (e) => {
			let { x: t, y: n, n: r } = Ls(e, 4, 6, 23.5, 88, 220, 21, 212), i = gs(Q(t, n, 21, 170)), a = $(Q(t, n + 178, 21, 34), X("seed.shopCategories.tile", { name: X("seed.shopCategories.newCat") }), { align: "center" });
			return i.mobileOrder = Rs(88, r, 0), a.mobileOrder = Rs(88, r, 1), {
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
				let i = vs(Q(e + 10.5, 88, 4, 52), r, 44), a = $(Q(e, 148, 25, 96), X(n), { align: "center" });
				return i.mobileOrder = Rs(88, t, 0), a.mobileOrder = Rs(88, t, 1), [i, a];
			}, t = zs("shop-trust", "300px", Ms(Ns("bg")), [
				$(Q(6, 28, 60, 38), X("seed.shopTrust.title")),
				...e(6, 0, "seed.shopTrust.t1", "✓"),
				...e(37.5, 1, "seed.shopTrust.t2", "↻"),
				...e(69, 2, "seed.shopTrust.t3", "✉")
			]);
			return t.theme = "muted", t;
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = Ls(e, 3, 6, 31.5, 148, 216, 25, 156, -60), i = vs(Q(t + 10.5, n - 60, 4, 52), "✓", 44), a = $(Q(t, n, 25, 96), X("seed.shopTrust.newItem"), { align: "center" });
			return i.mobileOrder = Rs(88, r, 0), a.mobileOrder = Rs(88, r, 1), {
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
				$(Q(6, 56, 52, 100), X("seed.shopShowcase.title")),
				$(Q(6, 164, 42, 56), X("seed.shopShowcase.text")),
				_s(Q(6, 236, 18, 42), X("seed.shopShowcase.cta")),
				gs(Q(62, 48, 32, 240))
			];
			e.forEach((e, t) => {
				e.mobileOrder = Rs(56, t < 3 ? 0 : 1, t);
			});
			let t = zs("shop-showcase", "340px", Ms(Ns("bg")), e);
			return t.theme = "deep", t;
		}
	}), e.sections.define("checkout", {
		label: "Checkout",
		labelKey: "preset.checkout.label",
		group: "Shop",
		groupKey: "presetGroup.shop",
		hint: "Order form that sends the basket as an email or to an endpoint",
		hintKey: "preset.checkout.hint",
		create: () => zs("checkout", "560px", Ms(Ns("bg")), [$(Q(6, 28, 50, 38), X("seed.checkout.title")), Es(Q(25, 96, 50, 430))])
	}), e.sections.define("cta", {
		label: "CTA banner",
		labelKey: "preset.cta.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Full width with one clear action",
		hintKey: "preset.cta.hint",
		create: () => zs("cta", "280px", Ms(Ns("surface"), Ps(.5, .5, .3, .7)), [
			$(Q(20, 56, 60, 40), X("seed.cta.title"), { align: "center" }),
			$(Q(25, 104, 50, 26), X("seed.cta.sub"), { align: "center" }),
			_s(Q(42, 148, 16, 42), X("seed.join"))
		])
	}), e.sections.define("quote", {
		label: "Quote",
		labelKey: "preset.quote.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Large quote with attribution",
		hintKey: "preset.quote.hint",
		create: () => zs("quote", "300px", Ms(Ns("bg")), [ks(Q(20, 56, 60, 190), {
			text: X("seed.quoteBlock.text"),
			attribution: X("seed.quoteBlock.name"),
			role: X("seed.quoteBlock.role")
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
				let a = js(Q(e, 76, 25, 120), {
					value: n,
					suffix: r,
					label: i
				});
				return a.mobileOrder = Rs(76, t, 0), a;
			};
			return zs("stats", "260px", Ms(Ns("surface")), [
				e(6, 0, "120", "+", X("seed.stats.l1")),
				e(37.5, 1, "25", "", X("seed.stats.l2")),
				e(69, 2, "1981", "", X("seed.stats.l3"))
			]);
		},
		itemLabel: "number",
		itemLabelKey: "item.number",
		item: (e) => {
			let { x: t, y: n, n: r } = Ls(e, 3, 6, 31.5, 76, 140, 25, 120), i = js(Q(t, n, 25, 120), {
				value: "42",
				label: X("seed.stats.newLabel")
			});
			return i.mobileOrder = Rs(76, r, 0), {
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
			let e = (e) => gs(Q(e, 108, 18.5, 100), {
				alt: X("seed.sponsors.alt"),
				fit: "contain",
				radius: null,
				saturate: 0
			});
			return zs("sponsors", "280px", Ms(Ns("bg")), [
				$(Q(6, 28, 60, 36), X("seed.sponsors.title")),
				e(5.5),
				e(29),
				e(52.5),
				e(76)
			]);
		},
		itemLabel: "logo",
		itemLabelKey: "item.logo",
		item: (e) => {
			let { x: t, y: n } = Ls(e, 4, 5.5, 23.5, 108, 124, 18.5, 100);
			return {
				blocks: [gs(Q(t, n, 18.5, 100), {
					alt: X("seed.sponsors.alt"),
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
		create: () => zs("membership", "500px", Ms(Ns("surface")), [
			$(Q(6, 28, 50, 38), X("seed.membership.title")),
			$(Q(14, 88, 32, 250), X("seed.membership.tier1"), {
				align: "center",
				box: !0
			}),
			$(Q(54, 88, 32, 250), X("seed.membership.tier2"), {
				align: "center",
				box: !0
			}),
			_s(Q(42, 358, 16, 42), X("seed.join")),
			$(Q(25, 414, 50, 30), X("seed.membership.vipps"), { align: "center" })
		])
	});
}
//#endregion
//#region ../template/assets/engine/0.7.3/templates-model.js
var Vs = [
	"section",
	"blocks",
	"page"
];
function Hs(e) {
	return Oa(String(e ?? ""), "");
}
function Us(e, t, { id: n, title: r }) {
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
//#region ../template/assets/engine/0.7.3/collections-csv.js
var Ws = [
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
function Gs(e) {
	let t = String(e ?? "");
	return /[",\n\r]/.test(t) ? `"${t.replaceAll("\"", "\"\"")}"` : t;
}
function Ks(e, t) {
	return t === "sizes" ? (e.sizes ?? []).join("|") : t === "colors" ? (e.colors ?? []).map((e) => e.name).join("|") : e[t] ?? "";
}
function qs(e) {
	let t = [Ws.join(",")];
	for (let n of e ?? []) t.push(Ws.map((e) => Gs(Ks(n, e))).join(","));
	return t.join("\n") + "\n";
}
function Js(e) {
	let t = [], n = [], r = "", i = !1, a = String(e ?? "");
	for (let e = 0; e < a.length; e += 1) {
		let o = a[e];
		i ? o === "\"" && a[e + 1] === "\"" ? (r += "\"", e += 1) : o === "\"" ? i = !1 : r += o : o === "\"" ? i = !0 : o === "," ? (n.push(r), r = "") : o === "\n" || o === "\r" ? (o === "\r" && a[e + 1] === "\n" && (e += 1), n.push(r), t.push(n), n = [], r = "") : r += o;
	}
	return (r !== "" || n.length) && (n.push(r), t.push(n)), t.filter((e) => e.some((e) => e.trim() !== ""));
}
var Ys = (e) => String(e ?? "").split("|").map((e) => e.trim()).filter(Boolean);
function Xs(e) {
	let t = Js(e);
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
		let s = Ys(t.sizes);
		s.length && (o.sizes = s);
		let c = Ys(t.colors);
		c.length && (o.colors = c.map((e) => ({ name: e }))), r.push(o);
	}
	return {
		entries: r,
		skipped: i
	};
}
//#endregion
//#region ../template/assets/engine/0.7.3/feeds.js
function Zs(e) {
	return String(e ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&apos;");
}
function Qs(e, t) {
	let n = String(t ?? "").replace(/\/+$/, "");
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${(e ?? []).filter((e) => !e.noindex).map((e) => `  <url><loc>${Zs(n + (e.path === "/" ? "/" : e.path))}</loc></url>`).join("\n")}\n</urlset>\n`;
}
function $s(e) {
	return `User-agent: *\nDisallow: /admin/\n\nSitemap: ${String(e ?? "").replace(/\/+$/, "")}/sitemap.xml\n`;
}
var ec = [
	"news",
	"notices",
	"publications"
];
function tc(e) {
	let t = String(e.origin ?? "").replace(/\/+$/, ""), n = (e.items ?? []).map((n) => {
		let r = n.href ? new URL(n.href, t + "/").href : t + "/", i = n.date ? new Date(n.date) : null, a = i && !Number.isNaN(i.getTime()) ? `\n      <pubDate>${i.toUTCString()}</pubDate>` : "", o = n.text ? `\n      <description>${Zs(n.text)}</description>` : "";
		return `    <item>\n      <title>${Zs(n.title)}</title>\n      <link>${Zs(r)}</link>\n      <guid isPermaLink="false">${Zs(`${e.path}#${n.id ?? n.title}`)}</guid>${o}${a}\n    </item>`;
	}).join("\n");
	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${Zs(e.title)}</title>\n    <link>${Zs(t + "/")}</link>\n    <description>${Zs(e.description ?? e.title)}</description>\n${n}${n ? "\n" : ""}  </channel>\n</rss>\n`;
}
//#endregion
//#region ../template/assets/engine/0.7.3/preset-thumb.js
var nc = /^#[0-9a-fA-F]{3,8}$/, rc = /^[a-z][a-z0-9-]*$/, ic = "#171c26", ac = "#232a38", oc = "#98a1b3", sc = "#7c5cff", cc = (e, t) => `var(--urd-color-${e}, ${t})`;
function lc(e, t) {
	return typeof e == "string" ? nc.test(e) ? e : rc.test(e) ? cc(e, t) : t : t;
}
function uc(e, t = 800) {
	let n = Number.parseFloat(e);
	return !Number.isFinite(n) || n <= 0 ? 400 : typeof e == "string" && e.trim().endsWith("vh") ? n / 100 * t : n;
}
var dc = (e) => Math.round(e * 10) / 10, fc = (e, t, n) => Math.min(n, Math.max(t, e)), pc = (e, t, n, r, i, a = "") => `<rect x="${dc(e)}" y="${dc(t)}" width="${dc(Math.max(n, 1))}" height="${dc(Math.max(r, 1))}" fill="${i}"${a}/>`;
function mc(e) {
	if (e?.theme) return e.theme === "inverse" || e.theme === "deep" ? cc("text", oc) : e.theme === "accent" ? cc("accent", sc) : cc("surface", ac);
	for (let t of e?.background?.layers ?? []) {
		if (t.type === "color") return lc(t.props?.value, ic);
		if (t.type === "gradient") return lc(Array.isArray(t.props?.stops) ? t.props.stops[0] : null, ic);
	}
	return cc("bg", ic);
}
function hc(e, t, n, r, i) {
	let a = /<h[1-3]/.test(String(i?.html ?? "")), o = i?.align === "center", s = cc("text", oc), c = [];
	i?.box && c.push(pc(e, t, n, r, cc("surface", ac), " rx=\"1.5\""));
	let l = i?.box ? Math.min(2, n * .06) : 0, u = e + l, d = n - l * 2, f = [
		.72,
		.9,
		.5
	], p = [
		a ? 4 : 2.2,
		2.2,
		2.2
	], m = fc(r / (p[0] + p[1] + p[2] + 4.8 + 2), 0, 1), h = t + l + Math.min(1, r * .08);
	for (let e = 0; e < 3; e++) {
		let n = Math.min(Math.max(e === 0 ? a ? 1.4 : 1 : .8, p[e] * m), Math.max(r, 1));
		if (e > 0 && h + n > t + r - l) break;
		let i = d * f[e], g = o ? u + (d - i) / 2 : u;
		c.push(pc(g, h, i, n, s, ` opacity="${e === 0 ? .8 : .4}" rx="${dc(Math.min(1, n / 2))}"`)), h += n + Math.max(.8, 2.4 * m);
	}
	return c.join("");
}
function gc(e, t, n, r, i = !1) {
	let a = cc("text", oc), o = [];
	i ? (o.push(pc(e, t, n, r, cc("surface", ac), " rx=\"1.5\" opacity=\"0.35\"")), o.push(`<rect x="${dc(e + .4)}" y="${dc(t + .4)}" width="${dc(Math.max(n - .8, 1))}" height="${dc(Math.max(r - .8, 1))}" fill="none" stroke="${a}" stroke-width="0.6" stroke-dasharray="2 2" opacity="0.35" rx="1.5"/>`)) : o.push(pc(e, t, n, r, cc("surface", ac), " rx=\"1.5\""));
	let s = i ? .15 : .4, c = (t) => dc(e + n * t), l = (e) => dc(t + r * e);
	return o.push(`<polygon points="${c(.08)},${l(.9)} ${c(.42)},${l(.38)} ${c(.62)},${l(.68)} ${c(.75)},${l(.5)} ${c(.92)},${l(.9)}" fill="${a}" opacity="${s}"/>`), o.push(`<circle cx="${c(.28)}" cy="${l(.26)}" r="${dc(Math.max(1, Math.min(n, r) * .1))}" fill="${a}" opacity="${dc(s + .1)}"/>`), o.join("");
}
function _c(e, t, n, r, i) {
	let a = !(Array.isArray(i?.images) && i.images.length), o = Math.max(1, n * .03), s = (n - o * 2) / 3, c = [];
	for (let n = 0; n < 3; n++) c.push(gc(e + n * (s + o), t, s, r, a));
	return c.join("");
}
function vc(e, t, n, r) {
	let i = Math.max(1, n * .03), a = (n - i * 2) / 3, o = [];
	for (let n = 0; n < 3; n++) {
		let s = e + n * (a + i);
		o.push(pc(s, t, a, r * .55, cc("surface", ac), " rx=\"1.5\"")), o.push(pc(s, t + r * .62, a * .8, 2, cc("text", oc), " opacity=\"0.5\" rx=\"1\""));
	}
	return o.join("");
}
function yc(e, t, n, r, i) {
	let a = lc(i?.color, sc), o = i?.kind;
	return o === "circle" ? `<ellipse cx="${dc(e + n / 2)}" cy="${dc(t + r / 2)}" rx="${dc(Math.max(n / 2, 1))}" ry="${dc(Math.max(r / 2, 1))}" fill="${a}" opacity="0.8"/>` : o === "triangle" ? `<polygon points="${dc(e)},${dc(t + r)} ${dc(e + n / 2)},${dc(t)} ${dc(e + n)},${dc(t + r)}" fill="${a}" opacity="0.8"/>` : o === "line" || o === "arrow" ? pc(e, t + r / 2 - .75, n, 1.5, a, " opacity=\"0.85\" rx=\"0.75\"") : pc(e, t, n, r, a, " opacity=\"0.8\" rx=\"1\"");
}
function bc(e, t, n, r, i, a) {
	if (e === "text") return hc(t, n, r, i, a);
	if (e === "image") return gc(t, n, r, i, !a?.src);
	if (e === "gallery") return _c(t, n, r, i, a);
	if (e === "collection") return vc(t, n, r, i);
	if (e === "faq") {
		let e = fc(Math.floor(i / 5), 2, 3), a = Math.max(.6, i * .04), o = (i - a * (e - 1)) / e, s = [];
		for (let i = 0; i < e; i += 1) {
			let e = n + i * (o + a);
			s.push(pc(t, e, r, o, cc("surface", ac), " rx=\"1\"")), s.push(pc(t + r * .06, e + o / 2 - .7, r * .55, 1.4, cc("text", oc), " opacity=\"0.5\" rx=\"0.7\"")), s.push(`<circle cx="${dc(t + r * .92)}" cy="${dc(e + o / 2)}" r="0.9" fill="${cc("text", oc)}" opacity="0.4"/>`);
		}
		return s.join("");
	}
	if (e === "shape") return yc(t, n, r, i, a);
	if (e === "button") return pc(t, n, r, i, cc("accent", sc), ` rx="${dc(Math.min(i / 2, 4))}"`);
	if (e === "icon") {
		let e = Math.max(1.2, Math.min(r, i) / 2);
		return `<circle cx="${dc(t + r / 2)}" cy="${dc(n + i / 2)}" r="${dc(e)}" fill="${cc("accent", sc)}" opacity="0.85"/>`;
	}
	if (e === "video") {
		let e = [pc(t, n, r, i, cc("surface", ac), " rx=\"1.5\"")], a = t + r / 2, o = n + i / 2, s = Math.max(1.5, Math.min(r, i) * .22);
		return e.push(`<polygon points="${dc(a - s / 2)},${dc(o - s)} ${dc(a - s / 2)},${dc(o + s)} ${dc(a + s)},${dc(o)}" fill="${cc("text", oc)}" opacity="0.6"/>`), e.join("");
	}
	if (e === "timeline") {
		let e = [pc(t + 1, n, 1.4, i, cc("accent", sc), " opacity=\"0.7\" rx=\"0.7\"")];
		for (let a = 0; a < 3; a += 1) {
			let o = n + i * (.18 + a * .32);
			e.push(`<circle cx="${dc(t + 1.7)}" cy="${dc(o)}" r="1.6" fill="${cc("accent", sc)}"/>`), e.push(pc(t + 5, o - 1, r * .5, 2, cc("text", oc), " opacity=\"0.5\" rx=\"1\""));
		}
		return e.join("");
	}
	if (e === "quote") return [
		`<text x="${dc(t + r / 2)}" y="${dc(n + i * .34)}" text-anchor="middle" font-size="${dc(Math.min(r, i) * .5)}" font-family="Georgia, serif" fill="${cc("accent", sc)}">“</text>`,
		pc(t + r * .15, n + i * .48, r * .7, 2, cc("text", oc), " opacity=\"0.6\" rx=\"1\""),
		pc(t + r * .25, n + i * .62, r * .5, 2, cc("text", oc), " opacity=\"0.6\" rx=\"1\""),
		pc(t + r * .35, n + i * .82, r * .3, 1.6, cc("text", oc), " opacity=\"0.35\" rx=\"0.8\"")
	].join("");
	if (e === "stats") return [pc(t + r * .28, n + i * .15, r * .44, i * .42, cc("accent", sc), " opacity=\"0.85\" rx=\"1\""), pc(t + r * .32, n + i * .72, r * .36, 1.6, cc("text", oc), " opacity=\"0.4\" rx=\"0.8\"")].join("");
	if (e === "table") {
		let e = Math.max(1.6, i * .22), a = [pc(t, n, r, e, cc("accent", sc), " opacity=\"0.5\" rx=\"0.8\"")], o = fc(Math.floor((i - e) / 3.2), 1, 3);
		for (let s = 0; s < o; s += 1) a.push(pc(t, n + e + 1 + s * ((i - e - 1) / o), r, 1, cc("text", oc), " opacity=\"0.3\""));
		return a.push(pc(t + r * .33, n, .6, i, cc("text", oc), " opacity=\"0.2\"")), a.push(pc(t + r * .66, n, .6, i, cc("text", oc), " opacity=\"0.2\"")), a.join("");
	}
	if (e === "share") {
		let e = Math.max(1.2, Math.min(i / 2, r / 9)), a = [];
		for (let r = 0; r < 4; r += 1) a.push(`<circle cx="${dc(t + e + r * (e * 2 + 1.5))}" cy="${dc(n + i / 2)}" r="${dc(e)}" fill="${cc("accent", sc)}" opacity="0.8"/>`);
		return a.join("");
	}
	if (e === "countdown") {
		let e = Math.max(.8, r * .03), a = (r - e * 3) / 4, o = [];
		for (let r = 0; r < 4; r += 1) {
			let s = t + r * (a + e);
			o.push(pc(s, n, a, i, cc("surface", ac), " rx=\"1\"")), o.push(pc(s + a * .25, n + i * .2, a * .5, i * .35, cc("accent", sc), " opacity=\"0.85\" rx=\"0.8\""));
		}
		return o.join("");
	}
	if (e === "audio") {
		let e = [pc(t, n, r, i, cc("surface", ac), " rx=\"1.5\"")], a = n + i / 2, o = Math.max(1.2, i * .28);
		return e.push(`<polygon points="${dc(t + r * .06)},${dc(a - o)} ${dc(t + r * .06)},${dc(a + o)} ${dc(t + r * .06 + o * 1.4)},${dc(a)}" fill="${cc("accent", sc)}" opacity="0.85"/>`), e.push(pc(t + r * .2, a - .6, r * .7, 1.2, cc("text", oc), " opacity=\"0.35\" rx=\"0.6\"")), e.join("");
	}
	if (e === "product") {
		let e = Math.max(.8, r * .03), a = (r - e * 2) / 3, o = [];
		for (let r = 0; r < 3; r += 1) {
			let s = t + r * (a + e);
			o.push(pc(s, n, a, i, cc("surface", ac), " rx=\"1\"")), o.push(pc(s + a * .08, n + i * .06, a * .84, i * .42, cc("text", oc), " opacity=\"0.15\" rx=\"0.8\"")), o.push(pc(s + a * .08, n + i * .56, a * .6, 1.4, cc("text", oc), " opacity=\"0.5\" rx=\"0.7\"")), o.push(pc(s + a * .08, n + i * .72, a * .35, 1.4, cc("accent", sc), " opacity=\"0.85\" rx=\"0.7\"")), o.push(pc(s + a * .08, n + i * .84, a * .84, i * .1, cc("accent", sc), " opacity=\"0.6\" rx=\"1\""));
		}
		return o.join("");
	}
	if (e === "cart") {
		let e = Math.max(1.5, Math.min(r, i) / 2.4), a = t + r / 2, o = n + i / 2;
		return [
			`<circle cx="${dc(a)}" cy="${dc(o)}" r="${dc(e)}" fill="${cc("surface", ac)}"/>`,
			pc(a - e * .5, o - e * .25, e, e * .55, cc("text", oc), " opacity=\"0.5\" rx=\"0.4\""),
			`<circle cx="${dc(a + e * .75)}" cy="${dc(o - e * .75)}" r="${dc(Math.max(.9, e * .35))}" fill="${cc("accent", sc)}"/>`
		].join("");
	}
	return e === "checkout" ? [
		pc(t, n, r * .7, 1.2, cc("text", oc), " opacity=\"0.5\" rx=\"0.6\""),
		pc(t, n + i * .12, r * .5, 1.2, cc("text", oc), " opacity=\"0.35\" rx=\"0.6\""),
		pc(t, n + i * .3, r, i * .14, cc("surface", ac), " rx=\"1\""),
		pc(t, n + i * .5, r, i * .14, cc("surface", ac), " rx=\"1\""),
		pc(t, n + i * .78, r * .45, i * .16, cc("accent", sc), " opacity=\"0.85\" rx=\"1.2\"")
	].join("") : pc(t, n, r, i, cc("surface", ac), " rx=\"1.5\"");
}
function xc(e, t, n) {
	let r = Array.isArray(e?.blocks) ? e.blocks : [], i = r.map((e) => (e.frames?.desktop?.y ?? 0) + (e.frames?.desktop?.h ?? 0)), a = n / Math.max(uc(e?.size?.minHeight), i.length ? Math.max(...i) + 16 : 0), o = [pc(0, 0, t, n, mc(e))];
	for (let r of e?.background?.layers ?? []) {
		if (r.type !== "glow") continue;
		let e = r.props ?? {};
		o.push(`<circle cx="${dc(fc(e.x ?? .5, 0, 1) * t)}" cy="${dc(fc(e.y ?? .3, 0, 1) * n)}" r="${dc(t * fc(e.radius ?? .5, .1, 1) * .5)}" fill="${lc(e.color, sc)}" opacity="${dc(fc(e.opacity ?? .3, 0, .5))}"/>`);
	}
	let s = t * .06, c = t - s * 2;
	for (let e of r) {
		let r = e.frames?.desktop;
		if (!r) continue;
		let i = fc(s + (r.x ?? 0) * (c / 100), 0, t - 2), l = fc((r.y ?? 0) * a, 0, n - 2), u = fc((r.w ?? 10) * (c / 100), 2, t - i), d = fc((r.h ?? 20) * a, 2, n - l);
		o.push(bc(e.type, i, l, u, d, e.props));
	}
	return o.join("");
}
function Sc(e, { w: t = 96, h: n = 116, max: r = 6 } = {}) {
	let i = (Array.isArray(e?.sections) ? e.sections : []).slice(0, r);
	if (!i.length) return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${pc(0, 0, t, n, cc("bg", ic))}</svg>`;
	let a = i.map((e) => fc(uc(e?.size?.minHeight), 160, 900)), o = a.reduce((e, t) => e + t, 0), s = n - 1 * (i.length - 1), c = [], l = 0;
	for (let e = 0; e < i.length; e += 1) {
		let n = Math.max(6, a[e] / o * s);
		c.push(`<g transform="translate(0 ${dc(l)})">${xc(i[e], t, n)}</g>`), l += n + 1;
	}
	return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${c.join("")}</svg>`;
}
//#endregion
//#region ../template/assets/engine/0.7.3/page-presets.js
var Cc = /* @__PURE__ */ new Map();
Bs({ sections: { define: (e, t) => Cc.set(e, t) } });
var wc = [
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
function Tc(e, { pageId: t, title: n }) {
	let r = wc.find((t) => t.id === e);
	return r ? {
		schemaVersion: 4,
		meta: {
			id: t,
			title: n
		},
		sections: r.sections.map((e) => Cc.get(e).create())
	} : null;
}
//#endregion
//#region ../template/assets/engine/0.7.3/palette-search.js
function Ec(e) {
	return String(e ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}
function Dc(e, t) {
	let n = Ec(t).trim(), r = Ec(e);
	return n ? r.startsWith(n) ? 0 : r.split(/[^a-z0-9]+/).some((e) => e.startsWith(n)) ? 1 : r.includes(n) ? 2 : -1 : 2;
}
function Oc(e, t, n) {
	return e.map((e, r) => ({
		item: e,
		i: r,
		rank: Dc(n(e), t)
	})).filter((e) => e.rank >= 0).sort((e, t) => e.rank - t.rank || e.i - t.i).map((e) => e.item);
}
//#endregion
//#region ../template/assets/engine/0.7.3/theme.js
function kc(e, t, n) {
	return t === "light" || t === "dark" ? t : n ? "dark" : "light";
}
function Ac(e, t) {
	let n = e.tokens || {}, r = e.scheme === "dark" ? "dark" : "light";
	if (!e.alt?.tokens || t === r) return n;
	let i = {};
	for (let t of /* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(e.alt.tokens)])) i[t] = {
		...n[t],
		...e.alt.tokens[t]
	};
	return i;
}
var jc = /^[a-zA-Z0-9#%.,()'"\s+\-*/]+$/;
function Mc(e) {
	return typeof e == "string" && jc.test(e) && !/url\(|\/\*|\*\/|expression/i.test(e);
}
function Nc(e) {
	let t = e.tokens || {}, n = Ac(e, "light"), r = Ac(e, "dark"), i = e.scheme === "dark" ? "dark" : "light", a = [], o = [], s = [], c = /* @__PURE__ */ new Set([
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
			Mc(c) && (a.push(`  --urd-${e}-${l}: ${c};`), i && a.push(`  --urd-base-${l}: ${c};`)), u !== d && (i && Mc(u) && Mc(d) ? o.push({
				name: l,
				lv: u,
				dv: d
			}) : !i && Mc(u) && Mc(d) && s.push({
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
	].some((e) => Mc(e.color?.["accent-text"])) && Mc(t.color?.accent);
	u && Mc(t.color?.bg) && (a.push(`  --urd-color-accent-text: ${t.color.bg};`), a.push(`  --urd-base-accent-text: ${t.color.bg};`));
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
function Pc(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
var Fc = {
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
}, Ic = {
	surface: "sectionTheme.surface",
	accent: "sectionTheme.accent",
	inverse: "sectionTheme.inverse",
	soft: "sectionTheme.soft",
	muted: "sectionTheme.muted",
	deep: "sectionTheme.deep",
	highlighted: "sectionTheme.highlighted"
};
[...new Set(Object.values(Fc).flatMap(Object.keys))];
function Lc(e) {
	return Fc[e] ?? {};
}
function Rc(e) {
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
function zc(e, t) {
	let n = Rc(e), r = Rc(t);
	return n == null || r == null ? null : (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
//#endregion
//#region ../template/assets/engine/0.7.3/backgrounds/color.js
var Bc = {
	version: 1,
	label: "Colour",
	labelKey: "bgLayer.color",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = Pc(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, Vc = {
	linear: [
		"pan",
		"pan-loop",
		"rotate"
	],
	radial: ["pulse", "orbit"]
};
function Hc(e) {
	let t = Array.isArray(e) && e.length ? e : [{ color: "#0b0e14" }, { color: "#1a1030" }], n = t.map((e) => Math.max(0, Number(e?.share) || 0)), r = n.reduce((e, t) => e + t, 0), i = r <= 0, a = i ? t.length : r, o = 0;
	return t.map((e, t) => {
		let r = i ? 1 : n[t], s = (o + r / 2) / a * 100;
		return o += r, {
			color: e?.color ?? "#0b0e14",
			at: Math.round(s * 100) / 100
		};
	});
}
function Uc(e) {
	let t = (e) => Math.round(e * 100) / 100, n = e[0]?.at ?? 0;
	return [...e.map((e) => ({
		color: e.color,
		at: t(e.at - n)
	})), {
		color: e[0]?.color ?? "#0b0e14",
		at: 100
	}];
}
function Wc(e, t, n, r = .5) {
	let i = n % 360 * Math.PI / 180, a = (e) => Math.round(e * 100) / 100 || 0, o = (Math.abs(e * Math.sin(i)) + Math.abs(t * Math.cos(i))) / (1 - Math.min(Math.max(r, 0), .9));
	return {
		period: a(o),
		dx: a(Math.sin(i) * o),
		dy: a(-Math.cos(i) * o)
	};
}
function Gc(e, t, n) {
	return `repeating-linear-gradient(${t}deg, ${e.map((e) => `${Pc(e.color)} ${Math.round(e.at / 100 * n * 100) / 100}px`).join(", ")})`;
}
function Kc(e) {
	let t = e.kind === "radial" ? "radial" : "linear", n = (Vc[t] ?? []).includes(e.animation) ? e.animation : null, r = Hc(e.stops), i = r.map((e) => `${Pc(e.color)} ${e.at}%`).join(", "), a = {}, o;
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
					stops: Uc(r),
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
var qc = /* @__PURE__ */ new Set(), Jc = !1;
function Yc(e) {
	qc.add(e), !(Jc || typeof window > "u") && (Jc = !0, window.addEventListener("resize", () => {
		for (let e of [...qc]) e() || qc.delete(e);
	}));
}
var Xc = !1;
function Zc() {
	if (!Xc) {
		Xc = !0;
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
var Qc = {
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
		let n = Kc(t);
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
					let e = Wc(r, i, n.loop.angle, n.loop.maxShare);
					t.style.inset = `${-Math.ceil(e.period)}px`, t.style.background = Gc(n.loop.stops, n.loop.angle, e.period), t.style.setProperty("--urd-loop-dx", `${e.dx}px`), t.style.setProperty("--urd-loop-dy", `${e.dy}px`);
				}
				return !0;
			};
			requestAnimationFrame(r), Yc(r);
			return;
		}
		if (n.runner) {
			e.classList.add("urd-bg-loop-host");
			let t = document.createElement("div");
			t.className = n.runner.className, t.style.background = n.runner.background, n.runner.left != null && (t.style.left = n.runner.left), n.runner.top != null && (t.style.top = n.runner.top), e.appendChild(t);
			return;
		}
		e.style.background = n.background, n.className && (e.classList.add(n.className), n.className === "urd-bg-rotate" && Zc());
	}
}, $c = {
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
		let n = Pc(t.color), r = t.x ?? .5, i = t.y ?? .3, a = t.radius ?? .5;
		e.style.background = `radial-gradient(circle at ${r * 100}% ${i * 100}%, ${n} 0%, transparent ${a * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, el = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", tl = {
	version: 1,
	label: "Grain",
	labelKey: "bgLayer.grain",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = el, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
}, nl = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
function rl(e) {
	return typeof e == "string" && nl.test(e);
}
//#endregion
//#region ../template/assets/engine/0.7.3/backgrounds/image.js
var il = .4;
function al(e, t) {
	return `${(e ?? .5) * 100}% ${(t ?? .5) * 100}%`;
}
function ol(e, t) {
	return e === "contain" ? "contain" : e === "cover" ? "cover" : `${Math.max(0, t ?? 1) * 100}%`;
}
function sl(e) {
	let t = "-9999px";
	return e === "up" ? `inset(${t} 0 0 0)` : e === "down" ? `inset(0 0 ${t} 0)` : e === "both" ? `inset(${t} 0 ${t} 0)` : "inset(0)";
}
function cl(e, t, n, r = .18) {
	let i = Math.max(0, Math.min(1, n)) * il * t;
	return Math.round(Math.min(i, r * e));
}
function ll(e, t, n, r, i) {
	let a = e + t / 2, o = (n / 2 - a) * Math.max(0, Math.min(1, r)) * il, s = i ?? cl(t, n, r);
	return Math.max(-s, Math.min(s, o)) || 0;
}
var ul = /* @__PURE__ */ new Set(), dl = !1, fl = 0;
function pl() {
	fl = 0;
	for (let e of [...ul]) e() || ul.delete(e);
}
function ml() {
	fl ||= requestAnimationFrame(pl);
}
function hl(e) {
	ul.add(e), e(), !(dl || typeof window > "u") && (dl = !0, window.addEventListener("scroll", ml, { passive: !0 }), window.addEventListener("resize", ml, { passive: !0 }));
}
function gl(e, t, n, r) {
	let i = r === "cover" || r === "tile" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement, o = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
	e.style.willChange = "transform";
	let s = (t) => {
		e.style.top = `-${t}px`, e.style.bottom = `-${t}px`;
	}, c = () => {
		if (!e.isConnected) return !1;
		if (o || document.body.classList.contains("urd-mobile")) return s(n), e.style.transform = "", !0;
		let r = (a ?? e).getBoundingClientRect(), c = window.innerHeight || document.documentElement.clientHeight, l = cl(r.height, c, t, i ? .18 : .6);
		s(i ? Math.max(n, l) : n);
		let u = ll(r.top, r.height, c, t, l);
		return e.style.transform = `translateY(${u.toFixed(1)}px)`, !0;
	};
	hl(c), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(c));
}
function _l() {
	return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("animation-timeline", "view()");
}
var vl = /* @__PURE__ */ new Set(), yl = !1, bl = 0;
function xl() {
	bl = 0;
	for (let e of [...vl]) e() || vl.delete(e);
}
function Sl() {
	!bl && typeof requestAnimationFrame == "function" && (bl = requestAnimationFrame(xl));
}
function Cl(e) {
	vl.add(e), e(), !(yl || typeof window > "u") && (yl = !0, window.addEventListener("resize", Sl, { passive: !0 }));
}
function wl(e, t, n, r) {
	let i = r === "cover" || r === "tile" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement;
	e.style.willChange = "transform", e.classList.add("urd-parallax-css");
	let o = () => {
		if (!e.isConnected) return !1;
		let r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || document.body.classList.contains("urd-mobile"), o = (a ?? e).getBoundingClientRect(), s = window.innerHeight || document.documentElement.clientHeight, c = cl(o.height, s, t, i ? .18 : .6), l = i && !r ? Math.max(n, c) : n;
		return e.style.setProperty("--urd-px-shift", `${c}px`), e.style.top = `-${l}px`, e.style.bottom = `-${l}px`, !0;
	};
	Cl(o), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(o));
}
var Tl = {
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
		if (!rl(t.src)) return;
		e.style.opacity = String(t.opacity ?? 1), e.style.clipPath = sl(t.bleed), e.style.zIndex = t.bleed === "down" || t.bleed === "both" ? "1" : "";
		let n = document.createElement("div");
		n.className = "urd-bg-image", n.style.position = "absolute", n.style.left = "0", n.style.right = "0", n.style.top = "0", n.style.bottom = "0";
		let r = t.fit === "tile" || t.fit === "repeat";
		n.style.backgroundImage = `url("${t.src}")`, n.style.backgroundSize = ol(t.fit, t.size), n.style.backgroundRepeat = r ? "repeat" : "no-repeat", n.style.backgroundPosition = al(t.x, t.y);
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
		e.appendChild(n), t.parallax > 0 && El(n, t.parallax, i, t.fit ?? "cover");
	}
};
function El(e, t, n, r) {
	_l() ? wl(e, t, n, r) : gl(e, t, n, r);
}
//#endregion
//#region ../template/assets/engine/0.7.3/gallery-model.js
function Dl(e, t, n) {
	return !Number.isFinite(n) || n < 1 ? 0 : (((Number.isFinite(e) ? e : 0) + t) % n + n) % n;
}
function Ol({ count: e = 0, reducedMotion: t = !1 } = {}) {
	return e >= 2 && !t;
}
function kl(e, { min: t = 2, fallback: n = 5 } = {}) {
	let r = Number(e);
	return !Number.isFinite(r) || r <= 0 ? n : Math.max(t, r);
}
//#endregion
//#region ../template/assets/engine/0.7.3/backgrounds/slideshow.js
var Al = {
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
		let n = (t.images ?? []).filter((e) => rl(e?.src));
		if (!n.length) return;
		e.classList.add("urd-bg-slideshow"), e.style.opacity = String(t.opacity ?? 1), t.blur > 0 && (e.style.filter = `blur(${t.blur}px)`, e.style.inset = `-${t.blur * 2}px`);
		let r = Math.max(0, Number(t.fade) || 0);
		e.style.setProperty("--urd-bgg-fade", `${r}s`);
		let i = (e, n) => {
			e.style.backgroundImage = `url("${n.src}")`, e.style.backgroundSize = ol(t.fit), e.style.backgroundRepeat = "no-repeat", e.style.backgroundPosition = al(n.x, n.y);
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
		if (!Ol({
			count: n.length,
			reducedMotion: s
		})) return;
		let c = document.createElement("div");
		c.className = "urd-bg-slide", e.appendChild(c);
		let l = 0, u = o, d = Math.max(kl(t.interval, { fallback: 6 }), r + .5) * 1e3, f = setInterval(() => {
			if (!e.isConnected) {
				clearInterval(f);
				return;
			}
			if (document.hidden) return;
			let t = Dl(l, 1, n.length), r = new Image();
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
}, jl = /^(?:data:video\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/media\/[\w%./-]+\.(?:mp4|webm))$/i;
function Ml(e) {
	return typeof e == "string" && jl.test(e);
}
var Nl = null;
function Pl(e) {
	Nl ??= new IntersectionObserver((e) => {
		for (let t of e) {
			if (!t.target.isConnected) {
				Nl.unobserve(t.target);
				continue;
			}
			t.isIntersecting ? t.target.play().catch(() => {}) : t.target.pause();
		}
	}, { threshold: 0 }), Nl.observe(e);
}
var Fl = (e, t, n, r) => {
	e.style.position = "absolute", e.style.inset = "0", e.style.width = "100%", e.style.height = "100%", e.style.objectFit = t === "contain" ? "contain" : "cover", e.style.objectPosition = al(n, r);
}, Il = {
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
		if (!Ml(t.src)) return;
		if (e.style.opacity = String(t.opacity ?? 1), window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
			if (!rl(t.poster)) return;
			let n = document.createElement("img");
			n.className = "urd-bg-video-poster", n.alt = "", n.setAttribute("aria-hidden", "true"), n.src = t.poster, Fl(n, t.fit, t.x, t.y), e.appendChild(n);
			return;
		}
		let n = document.createElement("video");
		n.className = "urd-bg-video", n.muted = !0, n.setAttribute("muted", ""), n.loop = !0, n.playsInline = !0, n.setAttribute("playsinline", ""), n.preload = "metadata", n.disablePictureInPicture = !0, n.setAttribute("aria-hidden", "true"), rl(t.poster) && (n.poster = t.poster), n.src = t.src, Fl(n, t.fit, t.x, t.y), e.appendChild(n), Pl(n), t.parallax > 0 && El(n, t.parallax, 0, t.fit === "contain" ? "contain" : "cover");
	}
};
//#endregion
//#region ../template/assets/engine/0.7.3/footer-thumb.js
function Ll(e = {}) {
	let t = "#2fd6b6", n = "#5c6b64", r = e.mega ? "#16221d" : "#0e1512", i = e.cols ?? 0, a = e.social ?? 0, o = `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${r}"/>`;
	if (e.mega && (o += `<circle cx="20" cy="6" r="34" fill="${t}" opacity="0.18"/>`), e.bigcta) return o += `<rect x="45" y="18" width="70" height="8" rx="3" fill="${n}" opacity="0.85"/>`, o += `<rect x="56" y="32" width="48" height="4" rx="2" fill="${n}" opacity="0.5"/>`, o += `<rect x="62" y="43" width="36" height="10" rx="3" fill="${t}"/>`, o += Rl(n, e.baselineLinks), o + "</svg>";
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
	return o += Rl(n, e.baselineLinks), o + "</svg>";
}
function Rl(e, t = 0) {
	let n = `<line x1="8" y1="66" x2="152" y2="66" stroke="${e}" stroke-width="0.6" opacity="0.5"/>`;
	return n += `<rect x="8" y="70" width="40" height="3" rx="1.5" fill="${e}" opacity="0.6"/>`, t && (n += `<g fill="${e}" opacity="0.6">` + Array.from({ length: t }, (e, t) => `<rect x="${120 - t * 16}" y="70" width="12" height="3" rx="1.5"/>`).join("") + "</g>"), n;
}
//#endregion
//#region ../template/assets/engine/0.7.3/animations/core.js
var zl = () => ({
	duration: 600,
	delay: 0
}), Bl = 90, Vl = {
	"fade-in": {
		version: 1,
		label: "Fade in",
		labelKey: "anim.fadeIn",
		entrance: !0,
		defaults: zl,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Slide up",
		labelKey: "anim.slideUp",
		entrance: !0,
		defaults: zl,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom in",
		labelKey: "anim.zoomIn",
		entrance: !0,
		defaults: zl,
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
			step: Bl,
			effect: "slide-up",
			pattern: "sequence"
		}),
		migrations: {}
	}
}, Hl = [
	["font.system", "system-ui, sans-serif"],
	["font.arial", "Arial, Helvetica, sans-serif"],
	["font.verdana", "Verdana, Geneva, sans-serif"],
	["font.trebuchet", "'Trebuchet MS', sans-serif"],
	["font.georgia", "Georgia, 'Times New Roman', serif"],
	["font.palatino", "'Palatino Linotype', Palatino, serif"],
	["font.courier", "'Courier New', monospace"]
];
//#endregion
//#region ../template/assets/engine/0.7.3/place.js
function Ul(e) {
	let t = (e) => Math.round(e * 100) / 100, n = Math.max(0, t(100 - e.w)), r = Math.min(n, Math.max(0, t(e.x - e.w / 2))), i = Math.max(0, e.y - e.h / 2), a = e.snap === !1 || e.grid?.snap === !1, o = e.grid?.size || 8;
	return i = a ? Math.round(i) : Math.round(i / o) * o, {
		x: r,
		y: Math.max(0, i)
	};
}
//#endregion
//#region src/App.svelte
var Wl = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Gl = /* @__PURE__ */ H("<button class=\"ghost row-tool svelte-1n46o8q\"></button>"), Kl = /* @__PURE__ */ H("<span><span class=\"grad-grip svelte-1n46o8q\"><svg viewBox=\"0 0 16 16\" width=\"14\" height=\"14\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"13\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"13\" r=\"1.4\"></circle></svg></span> <!> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span> <!></span>"), ql = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Jl = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/>", 1), Yl = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Xl = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Zl = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.01\" max=\"0.3\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Ql = /* @__PURE__ */ H("<div class=\"sizefill svelte-1n46o8q\"><button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button> <button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button></div> <label class=\"svelte-1n46o8q\"> </label> <div class=\"focalpad svelte-1n46o8q\"><span class=\"focaldot svelte-1n46o8q\"></span></div> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), $l = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), eu = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> </label> <div class=\"sizestep svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"10\" max=\"400\" class=\"svelte-1n46o8q\"/> <span class=\"sizeunit svelte-1n46o8q\">%</span> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></div> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), tu = /* @__PURE__ */ H("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), nu = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"120\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\"> </p>", 1), ru = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), iu = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"video/mp4,video/webm\" class=\"svelte-1n46o8q\"/></label> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), au = /* @__PURE__ */ H("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!></div>"), ou = /* @__PURE__ */ H("<!> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), su = /* @__PURE__ */ H("<input class=\"nav-target svelte-1n46o8q\"/>"), cu = /* @__PURE__ */ H("<div class=\"nav-row nav-sub-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div>"), lu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label>"), uu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"num-stepper svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"1\" max=\"12\" step=\"1\" class=\"svelte-1n46o8q\"/> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></span></label>", 1), du = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), fu = /* @__PURE__ */ H("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), pu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>"), mu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), hu = /* @__PURE__ */ H("<input class=\"svelte-1n46o8q\"/>"), gu = /* @__PURE__ */ H("<span class=\"nav-line svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), _u = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), vu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"50\" class=\"svelte-1n46o8q\"/></label>"), yu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <textarea rows=\"3\" spellcheck=\"false\" class=\"svelte-1n46o8q\"></textarea></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), bu = /* @__PURE__ */ H("<span class=\"nav-line svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span>"), xu = /* @__PURE__ */ H("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), Su = /* @__PURE__ */ H("<span class=\"nav-line svelte-1n46o8q\"><input class=\"tl-year svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <input class=\"svelte-1n46o8q\"/>", 1), Cu = /* @__PURE__ */ H("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), wu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Tu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Eu = /* @__PURE__ */ H("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></span> <span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Du = /* @__PURE__ */ H("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>"), Ou = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"datetime-local\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), ku = /* @__PURE__ */ H("<button class=\"ghost svelte-1n46o8q\"> </button>"), Au = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"audio/*\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), ju = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), Mu = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), Nu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> </label> <input class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Pu = /* @__PURE__ */ H("<input class=\"token-input svelte-1n46o8q\" maxlength=\"4\"/>"), Fu = /* @__PURE__ */ H("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\"> </button></span>"), Iu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"toolbar-row svelte-1n46o8q\"><!> <!></span></label> <!>", 1), Lu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Ru = /* @__PURE__ */ H("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost action svelte-1n46o8q\"> </button></span>"), zu = /* @__PURE__ */ H("<button class=\"ghost action svelte-1n46o8q\"> </button>"), Bu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Vu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Hu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"email\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"url\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Uu = /* @__PURE__ */ H("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label></div>"), Wu = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Gu = /* @__PURE__ */ H("<p> </p>"), Ku = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), qu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" class=\"svelte-1n46o8q\"/></label>"), Ju = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label>"), Yu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Xu = /* @__PURE__ */ H("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Zu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Qu = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!>", 1), $u = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), ed = /* @__PURE__ */ H("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), td = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), nd = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"24\" max=\"64\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), rd = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), id = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), ad = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), od = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), sd = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), cd = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"60\" class=\"svelte-1n46o8q\"/></label>"), ld = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), ud = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), dd = /* @__PURE__ */ H("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" min=\"1\" max=\"100\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), fd = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label>", 1), pd = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"400\" class=\"svelte-1n46o8q\"/></label>"), md = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!>", 1), hd = /* @__PURE__ */ H("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), gd = /* @__PURE__ */ H("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), _d = /* @__PURE__ */ H("<!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details>", 1), vd = /* @__PURE__ */ H("<div class=\"props-tabs svelte-1n46o8q\"><span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div> <!>", 1), yd = /* @__PURE__ */ H("<button class=\"chrome-restore svelte-1n46o8q\"><!> </button>"), bd = /* @__PURE__ */ H("<button><!> </button>"), xd = /* @__PURE__ */ H("<div class=\"tool-pop svelte-1n46o8q\"></div>"), Sd = /* @__PURE__ */ H("<span class=\"toolmenu svelte-1n46o8q\"><button><!><!></button> <!></span>"), Cd = /* @__PURE__ */ H("<button></button>"), wd = /* @__PURE__ */ H("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"viewswitch toolgrp svelte-1n46o8q\"></span>", 1), Td = /* @__PURE__ */ H("<div class=\"tool-pop svelte-1n46o8q\"><div class=\"tool-pop-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button></div> <button><!> </button></div>"), Ed = /* @__PURE__ */ H("<span class=\"toolmenu svelte-1n46o8q\"><button><span class=\"zoom-cap svelte-1n46o8q\"> </span><!></button> <!></span>"), Dd = /* @__PURE__ */ H("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"zoomswitch toolgrp svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button> <button></button></span>", 1), Od = /* @__PURE__ */ H("<div class=\"tool-pop svelte-1n46o8q\"><button><!> </button> <button><!> </button></div>"), kd = /* @__PURE__ */ H("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"toolgrp svelte-1n46o8q\"><button></button> <button></button></span>", 1), Ad = /* @__PURE__ */ H("<button class=\"ghost page-btn svelte-1n46o8q\"> </button> <span class=\"toolset svelte-1n46o8q\"><!> <!> <!></span>", 1), jd = /* @__PURE__ */ H("<button class=\"badge attention svelte-1n46o8q\"><!> <span class=\"btn-label svelte-1n46o8q\"> </span> <span class=\"badge-mini svelte-1n46o8q\"> </span></button>"), Md = /* @__PURE__ */ H("<button class=\"discard-confirm svelte-1n46o8q\"><!> </button>"), Nd = /* @__PURE__ */ H("<span class=\"draft-cluster svelte-1n46o8q\"><span class=\"chip draft-chip svelte-1n46o8q\"><span class=\"chip-full svelte-1n46o8q\" aria-hidden=\"true\"> </span> <span class=\"chip-mini svelte-1n46o8q\" aria-hidden=\"true\">!</span></span>  <span class=\"discard-wrap svelte-1n46o8q\"><button><!><span class=\"discard-label svelte-1n46o8q\"> </span></button> <!></span></span>"), Pd = /* @__PURE__ */ H("<!> <span class=\"btn-label svelte-1n46o8q\"> </span>", 1), Fd = /* @__PURE__ */ H("<span class=\"who svelte-1n46o8q\"><!> </span>"), Id = /* @__PURE__ */ H("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\"> </a>"), Ld = /* @__PURE__ */ H("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\"><!> <span class=\"btn-label svelte-1n46o8q\"> </span></a> <button class=\"primary svelte-1n46o8q\"> </button>", 1), Rd = /* @__PURE__ */ H("<button> </button>"), zd = /* @__PURE__ */ H("<span class=\"rail-group svelte-1n46o8q\"> </span> <!>", 1), Bd = /* @__PURE__ */ H("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" step=\"10\"/> <span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" step=\"10\" placeholder=\"0\"/></div>"), Vd = /* @__PURE__ */ H("<p class=\"mini-label svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input type=\"text\" spellcheck=\"false\" class=\"svelte-1n46o8q\"/></label>", 1), Hd = /* @__PURE__ */ H("<div class=\"settings-pop svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <p class=\"mini-label svelte-1n46o8q\"> </p> <div class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></div> <!> <!></div>"), Ud = /* @__PURE__ */ H("<button type=\"button\"></button>"), Wd = /* @__PURE__ */ H("<span class=\"page-path svelte-1n46o8q\">/</span>"), Gd = /* @__PURE__ */ H("<input class=\"page-slug svelte-1n46o8q\"/>"), Kd = /* @__PURE__ */ H("<span class=\"seo-warn svelte-1n46o8q\"></span>"), qd = /* @__PURE__ */ H("<button class=\"ghost danger svelte-1n46o8q\"><!> </button>"), Jd = /* @__PURE__ */ H("<div class=\"page-menu svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"><!> </button> <!></div>"), Yd = /* @__PURE__ */ H("<div><input class=\"page-title svelte-1n46o8q\"/> <!> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <span class=\"page-menu-wrap svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <!></span></span></div>"), Xd = /* @__PURE__ */ H("<img class=\"site-icon-preview svelte-1n46o8q\"/>"), Zd = /* @__PURE__ */ H("<div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button></div>"), Qd = /* @__PURE__ */ H("<div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button> <button class=\"page-template-del svelte-1n46o8q\"></button></div>"), $d = /* @__PURE__ */ H("<span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-template-grid svelte-1n46o8q\"></div>", 1), ef = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <textarea rows=\"2\" class=\"svelte-1n46o8q\"></textarea></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <textarea rows=\"2\" class=\"svelte-1n46o8q\"></textarea></label> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-template-grid svelte-1n46o8q\"><div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button></div> <!></div> <!></div>"), tf = /* @__PURE__ */ H("<input class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\"/> <button><b> </b></button> <button><i> </i></button></span>", 1), nf = /* @__PURE__ */ H("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\"/></span> <span class=\"toolbar-row svelte-1n46o8q\"><span class=\"mini-label tb-grow svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" placeholder=\"px\"/></span>", 1), rf = /* @__PURE__ */ H("<span class=\"toolbar-row svelte-1n46o8q\"><span class=\"mini-label tb-grow svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" placeholder=\"1100\"/></span>"), af = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <!> <span class=\"toolbar-row svelte-1n46o8q\"><span class=\"mini-label tb-grow svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></span>", 1), of = /* @__PURE__ */ H("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), sf = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><span class=\"mini-label tb-grow svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></span>", 1), cf = /* @__PURE__ */ H("<div class=\"seg nav-view-seg svelte-1n46o8q\"><button> </button> <button> </button></div> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div>", 1), lf = /* @__PURE__ */ H("<div class=\"ctl-pair svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div></div>"), uf = /* @__PURE__ */ H("<span class=\"toolbar-row ctl-end svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"1\" max=\"8\"/> <span class=\"mini-label svelte-1n46o8q\"> </span> <!></span>"), df = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), ff = /* @__PURE__ */ H("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"30\" max=\"80\" step=\"5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <!>", 1), pf = /* @__PURE__ */ H("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), mf = /* @__PURE__ */ H("<div class=\"nav-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div> <!>", 1), hf = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"seg cw-seg svelte-1n46o8q\"></div> <!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div> <!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!></div></details></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"4\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details></div>"), gf = /* @__PURE__ */ H("<div class=\"cw-row svelte-1n46o8q\"><span class=\"mini-label cw-screen svelte-1n46o8q\"> </span> <span><span class=\"cw-fill svelte-1n46o8q\"></span></span> <span class=\"gridmenu-value cw-margin svelte-1n46o8q\"> </span></div>"), _f = /* @__PURE__ */ H("<div class=\"mini-label cw-binds svelte-1n46o8q\"> </div>"), vf = /* @__PURE__ */ H("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), yf = /* @__PURE__ */ H("<button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), bf = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"sample cw-sample svelte-1n46o8q\"><!> <div class=\"cw-legend svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!></div> <div class=\"seg cw-seg svelte-1n46o8q\"></div> <!> <p class=\"mini-label svelte-1n46o8q\"> </p> <div class=\"seg cw-seg svelte-1n46o8q\"></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div>"), xf = /* @__PURE__ */ H("<div class=\"mini-label tpv-cap svelte-1n46o8q\"> </div>"), Sf = /* @__PURE__ */ H("<div class=\"theme-pvw svelte-1n46o8q\"><!> <div class=\"tpv-demo svelte-1n46o8q\"><div class=\"tpv-h svelte-1n46o8q\"> </div> <div class=\"tpv-card svelte-1n46o8q\"> </div> <div class=\"tpv-row svelte-1n46o8q\"><span class=\"tpv-btn svelte-1n46o8q\"> </span><span class=\"tpv-lnk svelte-1n46o8q\"> </span></div></div></div>"), Cf = /* @__PURE__ */ H("<button type=\"button\"><span class=\"tp-band svelte-1n46o8q\"><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i></span> <small class=\"svelte-1n46o8q\"> </small></button>"), wf = /* @__PURE__ */ H("<div class=\"ctl-row autorow svelte-1n46o8q\"><span class=\"autolbl svelte-1n46o8q\"> </span> <span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div>"), Tf = /* @__PURE__ */ H("<span class=\"mini-label svelte-1n46o8q\"> </span>"), Ef = /* @__PURE__ */ H("<div class=\"palcol svelte-1n46o8q\"><!> <span class=\"palcap svelte-1n46o8q\"> </span> <b class=\"palhex svelte-1n46o8q\"> </b></div>"), Df = /* @__PURE__ */ H("<div class=\"ctl-row palhead svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <button type=\"button\"> </button></div> <div></div>", 1), Of = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"theme-presets svelte-1n46o8q\"></div> <p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <div class=\"ctl-row palhead svelte-1n46o8q\"><!> <button type=\"button\"> </button></div> <div class=\"palcells svelte-1n46o8q\"></div> <!> <div class=\"ctl-row palauto-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <button type=\"button\"> </button></div> <div class=\"theme-previews svelte-1n46o8q\"><!> <!></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <div class=\"sample typo-sample svelte-1n46o8q\"><div class=\"ts-h svelte-1n46o8q\"> </div> <div class=\"ts-b svelte-1n46o8q\"> </div></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"sample form-prev svelte-1n46o8q\"><span class=\"fp-btn svelte-1n46o8q\"> </span> <span class=\"fp-card svelte-1n46o8q\"> </span></div> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"24\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"40\" step=\"1\" class=\"svelte-1n46o8q\"/></div></details></div>"), kf = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label>"), Af = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label>"), jf = /* @__PURE__ */ H("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), Mf = /* @__PURE__ */ H("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <!> <!>", 1), Nf = /* @__PURE__ */ H("<div><input type=\"text\" class=\"svelte-1n46o8q\"/> <!></div>"), Pf = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), Ff = /* @__PURE__ */ H("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), If = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Lf = /* @__PURE__ */ H("<button><span class=\"rs-sample svelte-1n46o8q\"><i class=\"rs-line svelte-1n46o8q\"></i> <i class=\"rs-chip svelte-1n46o8q\"></i> <i class=\"rs-dot svelte-1n46o8q\"></i></span> <span class=\"rs-name svelte-1n46o8q\"> </span></button>"), Rf = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"1000\" step=\"10\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), zf = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Bf = /* @__PURE__ */ H("<p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"token-input svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"rs-grid svelte-1n46o8q\"></div> <label class=\"svelte-1n46o8q\"> <span class=\"row-tools svelte-1n46o8q\"><span class=\"gridmenu-value svelte-1n46o8q\"> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Vf = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), Hf = /* @__PURE__ */ H("<button class=\"footer-tp svelte-1n46o8q\"><span class=\"footer-tp-thumb svelte-1n46o8q\"></span> <span class=\"footer-tp-name svelte-1n46o8q\"> </span></button>"), Uf = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"16\" max=\"160\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Wf = /* @__PURE__ */ H("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!>", 1), Gf = /* @__PURE__ */ H("<div class=\"nav-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></div> <!>", 1), Kf = /* @__PURE__ */ H("<div class=\"nav-row svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><span class=\"footer-soc-preview svelte-1n46o8q\" aria-hidden=\"true\"></span> <!></span> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <input class=\"nav-target svelte-1n46o8q\"/></div>"), qf = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), Jf = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"footer-tpick svelte-1n46o8q\"></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"svelte-1n46o8q\"> <!></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details></div>"), Yf = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"date\" class=\"svelte-1n46o8q\"/></label>"), Xf = /* @__PURE__ */ H("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), Zf = /* @__PURE__ */ H("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/>"), Qf = /* @__PURE__ */ H("<span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span>"), $f = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" step=\"0.01\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" step=\"0.01\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), ep = /* @__PURE__ */ H("<details class=\"group collection-entry svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <textarea rows=\"3\" class=\"svelte-1n46o8q\"></textarea> <!> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!></div></details>"), tp = /* @__PURE__ */ H("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\".csv,text/csv\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), np = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button></div>"), rp = /* @__PURE__ */ H("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), ip = /* @__PURE__ */ H("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), ap = /* @__PURE__ */ H("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <!></div>"), op = /* @__PURE__ */ H("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span></div>"), sp = /* @__PURE__ */ H("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), cp = /* @__PURE__ */ H("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <!>", 1), lp = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <!> <!></div>"), up = /* @__PURE__ */ H("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), dp = /* @__PURE__ */ H("<button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), fp = /* @__PURE__ */ H("<!> <!>", 1), pp = /* @__PURE__ */ H("<p class=\"panel-hint svelte-1n46o8q\"> </p> <button class=\"ghost svelte-1n46o8q\"> </button>", 1), mp = /* @__PURE__ */ H("<span class=\"update-arrow svelte-1n46o8q\"></span> <span class=\"badge svelte-1n46o8q\"> </span>", 1), hp = /* @__PURE__ */ H("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><p class=\"update-notes svelte-1n46o8q\"> </p></div></details>"), gp = /* @__PURE__ */ H("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"><span class=\"update-warn svelte-1n46o8q\"></span> </summary> <div class=\"group-items svelte-1n46o8q\"><pre class=\"update-headers svelte-1n46o8q\"> </pre></div></details>"), _p = /* @__PURE__ */ H("<span class=\"chip svelte-1n46o8q\"> </span>"), vp = /* @__PURE__ */ H("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <span class=\"update-warn svelte-1n46o8q\"></span></span></div>"), yp = /* @__PURE__ */ H("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <!></div>"), bp = /* @__PURE__ */ H("<span class=\"update-warn svelte-1n46o8q\"></span>"), xp = /* @__PURE__ */ H("<div class=\"update-row svelte-1n46o8q\"><span> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <!> <input type=\"checkbox\" class=\"svelte-1n46o8q\"/></span></div>"), Sp = /* @__PURE__ */ H("<div class=\"ctl-row update-opt-head svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!>", 1), Cp = /* @__PURE__ */ H("<p class=\"update-summary svelte-1n46o8q\"> </p> <!> <!> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details> <!> <button class=\"primary update-run svelte-1n46o8q\"> </button>", 1), wp = /* @__PURE__ */ H("<div class=\"update-versions svelte-1n46o8q\"><span class=\"update-from svelte-1n46o8q\"> </span> <!></div> <!>", 1), Tp = /* @__PURE__ */ H("<aside class=\"panel svelte-1n46o8q\"><div class=\"panel-head svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></div> <!></aside>"), Ep = /* @__PURE__ */ H("<nav class=\"rail svelte-1n46o8q\"><!> <span class=\"rail-settings svelte-1n46o8q\"><span class=\"rail-brand svelte-1n46o8q\" title=\"Urd\"><svg class=\"brand-mark svelte-1n46o8q\" viewBox=\"10.3 8.3 19.4 25.4\" aria-hidden=\"true\"><path d=\"M12 32V10l16 6.5V32\" fill=\"none\" stroke=\"var(--urd-brand)\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg> <span class=\"brand-word svelte-1n46o8q\">Urd</span></span> <button></button> <!></span></nav> <!>", 1), Dp = /* @__PURE__ */ H("<div class=\"workspace svelte-1n46o8q\"><!> <div><div class=\"stage svelte-1n46o8q\"><iframe class=\"svelte-1n46o8q\"></iframe></div></div></div>"), Op = /* @__PURE__ */ H("<p class=\"loading svelte-1n46o8q\"> </p>"), kp = /* @__PURE__ */ H("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), Ap = /* @__PURE__ */ H("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), jp = /* @__PURE__ */ H("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <p class=\"panel-hint svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <p class=\"panel-hint svelte-1n46o8q\"> </p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), Mp = /* @__PURE__ */ H("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\">×</button></div>"), Np = /* @__PURE__ */ H("<div class=\"block-menu svelte-1n46o8q\"><header class=\"block-menu-head svelte-1n46o8q\"><span> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></header> <div class=\"panel-body block-menu-body svelte-1n46o8q\"><!></div></div>"), Pp = /* @__PURE__ */ H("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><!> <!></span> <span class=\"topbar-group topbar-draft svelte-1n46o8q\"><!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!> <!></div>   <!>", 1);
function Fp(e, t) {
	Je(t, !0);
	let n = (e, t = f, n = f) => {
		var r = ou(), i = I(r);
		Yr(i, 17, n, Gr, (e, r, i) => {
			var a = au(), s = F(a), l = F(s);
			{
				let e = /* @__PURE__ */ A(() => X("tip.bg.changeType")), n = /* @__PURE__ */ A(() => o.map(([e, t]) => [e, t.labelKey ? X(t.labelKey) : t.label]));
				Z(l, {
					get value() {
						return B(r).type;
					},
					get title() {
						return B(e);
					},
					get options() {
						return B(n);
					},
					onchange: (e) => dr(t(), i, e)
				});
			}
			var u = R(l, 2), d = F(u);
			d.disabled = i === 0, K(d, () => c.up, !0), E(d);
			var f = R(d, 2);
			K(f, () => c.down, !0), E(f);
			var p = R(f, 2);
			K(p, () => c.cross, !0), E(p), E(u), E(s);
			var m = R(s, 2), h = (e) => {
				var n = Wl(), a = I(n), o = F(a), s = R(o);
				{
					let e = /* @__PURE__ */ A(Mr), n = /* @__PURE__ */ A(() => X("tip.bg.layerColor"));
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
						onchange: (e) => Jn(t(), i, "value", e)
					});
				}
				E(a);
				var c = R(a, 2), l = F(c), u = L(R(l));
				E(c);
				var d = R(c, 2);
				q(d), z((e, t, n) => {
					W(o, `${e ?? ""} `), W(l, `${t ?? ""} `), W(u, `${n ?? ""}%`), J(d, B(r).props.opacity ?? 1);
				}, [
					() => X("lbl.color"),
					() => X("lbl.strength"),
					() => Math.round((B(r).props.opacity ?? 1) * 100)
				]), V("input", d, (e) => Jn(t(), i, "opacity", Number(e.target.value))), U(e, n);
			}, g = (e) => {
				let n = /* @__PURE__ */ A(() => er(B(r))), a = /* @__PURE__ */ A(() => B(n).stops.reduce((e, t) => e + Math.max(0, Number(t.share) || 0), 0));
				var o = Yl(), s = I(o), l = F(s), u = R(l);
				{
					let e = /* @__PURE__ */ A(() => B(n).kind ?? "linear"), r = /* @__PURE__ */ A(() => [["linear", X("opt.grad.linear")], ["radial", X("opt.grad.radial")]]);
					Z(u, {
						get value() {
							return B(e);
						},
						get options() {
							return B(r);
						},
						onchange: (e) => ir(t(), i, e)
					});
				}
				E(s);
				var d = R(s, 2);
				Yr(d, 17, () => B(n).stops, Gr, (e, r, o) => {
					var s = Kl();
					let l;
					var u = F(s), d = R(u, 2);
					{
						let e = /* @__PURE__ */ A(Mr), n = /* @__PURE__ */ A(() => X("tip.bg.stopColor"));
						ga(d, {
							get value() {
								return B(r).color;
							},
							get tokens() {
								return B(e);
							},
							get label() {
								return B(n);
							},
							onchange: (e) => ar(t(), i, o, { color: e })
						});
					}
					var f = R(d, 2);
					q(f);
					var p = R(f, 2), m = L(p), h = R(p, 2), g = (e) => {
						var n = Gl();
						K(n, () => c.cross, !0), E(n), z((e) => Y(n, "title", e), [() => X("tip.bg.removeStop")]), V("click", n, () => sr(t(), i, o)), U(e, n);
					};
					G(h, (e) => {
						B(n).stops.length > 2 && e(g);
					}), E(s), z((e, t, a) => {
						l = gi(s, 1, "nav-line grad-stop svelte-1n46o8q", null, l, {
							dragging: B(lr)?.layer === i && B(lr).from === o,
							"drop-above": B(lr)?.layer === i && B(lr).insert === o,
							"drop-below": B(lr)?.layer === i && B(lr).insert === B(n).stops.length && o === B(n).stops.length - 1
						}), Y(u, "title", e), J(f, B(r).share ?? 50), Y(f, "title", t), W(m, `${a ?? ""}%`);
					}, [
						() => X("tip.bg.dragStop"),
						() => X("tip.bg.stopShare"),
						() => B(a) > 0 ? Math.round(Math.max(0, Number(B(r).share) || 0) / B(a) * 100) : Math.round(100 / B(n).stops.length)
					]), V("pointerdown", u, (e) => ur(t(), e, i, o)), V("input", f, (e) => ar(t(), i, o, { share: Number(e.target.value) })), U(e, s);
				});
				var f = R(d, 2), p = L(f, !0), m = R(f, 2), h = (e) => {
					var r = ql(), a = I(r), o = F(a), s = L(R(o));
					E(a);
					var c = R(a, 2);
					q(c);
					var l = R(c, 2), u = F(l), d = L(R(u));
					E(l);
					var f = R(l, 2);
					q(f), z((e, t, r, i) => {
						W(o, `${e ?? ""} `), W(s, `${t ?? ""}%`), J(c, B(n).x ?? .5), W(u, `${r ?? ""} `), W(d, `${i ?? ""}%`), J(f, B(n).y ?? .5);
					}, [
						() => X("lbl.centerX"),
						() => Math.round((B(n).x ?? .5) * 100),
						() => X("lbl.centerY"),
						() => Math.round((B(n).y ?? .5) * 100)
					]), V("input", c, (e) => nr(t(), i, "x", Number(e.target.value))), V("input", f, (e) => nr(t(), i, "y", Number(e.target.value))), U(e, r);
				}, g = (e) => {
					var r = Jl(), a = I(r), o = F(a), s = L(R(o));
					E(a);
					var c = R(a, 2);
					q(c), z((e) => {
						W(o, `${e ?? ""} `), W(s, `${B(n).angle ?? ""}°`), J(c, B(n).angle);
					}, [() => X("lbl.angle")]), V("input", c, (e) => nr(t(), i, "angle", Number(e.target.value))), U(e, r);
				};
				G(m, (e) => {
					(B(n).kind ?? "linear") === "radial" ? e(h) : e(g, -1);
				});
				var _ = R(m, 2), v = F(_), y = L(R(v));
				E(_);
				var b = R(_, 2);
				q(b);
				var x = R(b, 2), S = F(x), C = R(S);
				{
					let e = /* @__PURE__ */ A(() => B(n).animation ?? "none");
					Z(C, {
						get value() {
							return B(e);
						},
						get options() {
							return rr[(B(n).kind ?? "linear") === "radial" ? "radial" : "linear"];
						},
						onchange: (e) => nr(t(), i, "animation", e)
					});
				}
				E(x), z((e, t, r, i, a, o, s) => {
					W(l, `${e ?? ""} `), Y(f, "title", t), W(p, r), W(v, `${i ?? ""} `), W(y, `${a ?? ""}%`), J(b, B(n).opacity ?? 1), Y(x, "title", o), W(S, `${s ?? ""} `);
				}, [
					() => X("blocks.shape"),
					() => X("tip.bg.addStop"),
					() => X("ui.addStop"),
					() => X("lbl.strength"),
					() => Math.round((B(n).opacity ?? 1) * 100),
					() => X("tip.bg.motion"),
					() => X("lbl.motion")
				]), V("click", f, () => or(t(), i)), V("input", b, (e) => nr(t(), i, "opacity", Number(e.target.value))), U(e, o);
			}, _ = (e) => {
				var n = Xl(), a = I(n), o = F(a), s = R(o);
				{
					let e = /* @__PURE__ */ A(Mr), n = /* @__PURE__ */ A(() => X("tip.bg.glowColor"));
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
						onchange: (e) => Jn(t(), i, "color", e)
					});
				}
				E(a);
				var c = R(a, 2), l = F(c), u = L(R(l));
				E(c);
				var d = R(c, 2);
				q(d);
				var f = R(d, 2), p = F(f), m = L(R(p));
				E(f);
				var h = R(f, 2);
				q(h);
				var g = R(h, 2), _ = F(g), v = L(R(_));
				E(g);
				var y = R(g, 2);
				q(y);
				var b = R(y, 2), x = F(b), S = L(R(x));
				E(b);
				var C = R(b, 2);
				q(C), z((e, t, n, i, a, s, c, f, g) => {
					W(o, `${e ?? ""} `), W(l, `${t ?? ""} `), W(u, `${n ?? ""}%`), J(d, B(r).props.x), W(p, `${i ?? ""} `), W(m, `${a ?? ""}%`), J(h, B(r).props.y), W(_, `${s ?? ""} `), W(v, `${c ?? ""}%`), J(y, B(r).props.radius), W(x, `${f ?? ""} `), W(S, `${g ?? ""}%`), J(C, B(r).props.opacity);
				}, [
					() => X("lbl.color"),
					() => X("lbl.posX"),
					() => Math.round(B(r).props.x * 100),
					() => X("lbl.posY"),
					() => Math.round(B(r).props.y * 100),
					() => X("lbl.size"),
					() => Math.round(B(r).props.radius * 100),
					() => X("lbl.strength"),
					() => Math.round(B(r).props.opacity * 100)
				]), V("input", d, (e) => Jn(t(), i, "x", Number(e.target.value))), V("input", h, (e) => Jn(t(), i, "y", Number(e.target.value))), V("input", y, (e) => Jn(t(), i, "radius", Number(e.target.value))), V("input", C, (e) => Jn(t(), i, "opacity", Number(e.target.value))), U(e, n);
			}, v = (e) => {
				var n = Zl(), a = I(n), o = F(a), s = L(R(o));
				E(a);
				var c = R(a, 2);
				q(c), z((e, t) => {
					W(o, `${e ?? ""} `), W(s, `${t ?? ""}%`), J(c, B(r).props.opacity);
				}, [() => X("lbl.strength"), () => Math.round(B(r).props.opacity * 100)]), V("input", c, (e) => Jn(t(), i, "opacity", Number(e.target.value))), U(e, n);
			}, y = (e) => {
				let n = /* @__PURE__ */ A(() => B(r).props.fit === "tile" || B(r).props.fit === "repeat");
				var a = eu(), o = I(a), s = F(o), c = R(s);
				E(o);
				var l = R(o, 2), u = F(l), d = R(u);
				{
					let e = /* @__PURE__ */ A(() => B(n) ? "tile" : "plain"), r = /* @__PURE__ */ A(() => [["plain", X("opt.img.plain")], ["tile", X("opt.img.tile")]]);
					Z(d, {
						get value() {
							return B(e);
						},
						get options() {
							return B(r);
						},
						onchange: (e) => Jn(t(), i, "fit", e)
					});
				}
				E(l);
				var f = R(l, 2), p = L(f, !0), m = R(f, 2), h = F(m), g = R(h, 2);
				q(g);
				var _ = R(g, 4);
				E(m);
				var v = R(m, 2), y = (e) => {
					var n = Ql(), a = I(n), o = F(a), s = L(o, !0), c = R(o, 2), l = L(c, !0);
					E(a);
					var u = R(a, 2), d = L(u, !0), f = R(u, 2), p = R(f, 2), m = F(p), h = L(R(m));
					E(p);
					var g = R(p, 2);
					q(g);
					var _ = R(g, 2), v = F(_), y = L(R(v));
					E(_);
					var b = R(_, 2);
					q(b), z((e, t, n, i, a, p, _, x, S, C, ee, w) => {
						Y(o, "title", e), W(s, t), Y(c, "title", n), W(l, i), Y(u, "title", a), W(d, p), vi(f, `--fx:${_ ?? ""}%; --fy:${x ?? ""}%`), W(m, `${S ?? ""} `), W(h, `${C ?? ""}%`), J(g, B(r).props.x ?? .5), W(v, `${ee ?? ""} `), W(y, `${w ?? ""}%`), J(b, B(r).props.y ?? .5);
					}, [
						() => X("tip.bg.cover"),
						() => X("ui.cover"),
						() => X("opt.fitFrame.contain"),
						() => X("opt.fit.contain"),
						() => X("tip.bg.position"),
						() => X("lbl.position"),
						() => Math.max(0, Math.min(1, B(r).props.x ?? .5)) * 100,
						() => Math.max(0, Math.min(1, B(r).props.y ?? .5)) * 100,
						() => X("lbl.horizontal"),
						() => Math.round((B(r).props.x ?? .5) * 100),
						() => X("lbl.vertical"),
						() => Math.round((B(r).props.y ?? .5) * 100)
					]), V("click", o, () => $n(t(), i, B(r), "cover")), V("click", c, () => $n(t(), i, B(r), "contain")), V("pointerdown", f, (e) => Yn(e, t(), i, "xy")), V("input", g, (e) => Jn(t(), i, "x", Number(e.target.value))), V("input", b, (e) => Jn(t(), i, "y", Number(e.target.value))), U(e, n);
				};
				G(v, (e) => {
					B(n) || e(y);
				});
				var b = R(v, 2), x = F(b), S = L(R(x));
				E(b);
				var C = R(b, 2);
				q(C);
				var ee = R(C, 2), w = F(ee), te = L(R(w));
				E(ee);
				var T = R(ee, 2);
				q(T);
				var ne = R(T, 2), re = F(ne);
				q(re);
				var ie = R(re);
				E(ne);
				var ae = R(ne, 2), oe = (e) => {
					var n = $l(), a = I(n), o = F(a), s = L(R(o));
					E(a);
					var c = R(a, 2);
					q(c);
					var l = R(c, 2), u = F(l), d = R(u);
					{
						let e = /* @__PURE__ */ A(() => B(r).props.bleed ?? "none"), n = /* @__PURE__ */ A(() => [
							["none", X("common.none")],
							["up", X("opt.bleed.up")],
							["down", X("opt.bleed.down")],
							["both", X("opt.brand.both")]
						]);
						Z(d, {
							get value() {
								return B(e);
							},
							get options() {
								return B(n);
							},
							onchange: (e) => Jn(t(), i, "bleed", e)
						});
					}
					E(l), z((e, t, n, i) => {
						W(o, `${e ?? ""} `), W(s, `${t ?? ""}%`), J(c, B(r).props.parallax ?? .3), Y(l, "title", n), W(u, `${i ?? ""} `);
					}, [
						() => X("lbl.parallaxStrength"),
						() => Math.round((B(r).props.parallax ?? 0) * 100),
						() => X("tip.bg.bleed"),
						() => X("lbl.bleed")
					]), V("input", c, (e) => Jn(t(), i, "parallax", Number(e.target.value))), U(e, n);
				};
				G(ae, (e) => {
					(B(r).props.parallax ?? 0) > 0 && e(oe);
				}), z((e, t, n, i, a, c, d, m, v, y, b, ee, ae, oe) => {
					Y(o, "title", e), W(s, `${t ?? ""} `), Y(l, "title", n), W(u, `${i ?? ""} `), Y(f, "title", a), W(p, c), Y(h, "title", d), J(g, m), Y(_, "title", v), W(x, `${y ?? ""} `), W(S, `${B(r).props.blur ?? 0 ?? ""} px`), J(C, B(r).props.blur ?? 0), W(w, `${b ?? ""} `), W(te, `${ee ?? ""}%`), J(T, B(r).props.opacity ?? 1), Y(ne, "title", ae), Ci(re, (B(r).props.parallax ?? 0) > 0), W(ie, ` ${oe ?? ""}`);
				}, [
					() => X("tip.webpAuto"),
					() => B(r).props.src ? X("ui.changeImage") : X("ui.chooseImage"),
					() => X("tip.bg.fit"),
					() => X("lbl.fit"),
					() => X("tip.bg.size"),
					() => X("lbl.size"),
					() => X("tip.smaller"),
					() => Math.round((B(r).props.size ?? 1) * 100),
					() => X("tip.larger"),
					() => X("lbl.blur"),
					() => X("lbl.strength"),
					() => Math.round((B(r).props.opacity ?? 1) * 100),
					() => X("tip.bg.parallax"),
					() => X("lbl.parallax")
				]), V("change", c, (e) => gr(t(), i, e)), V("click", h, () => Zn(t(), i, B(r).props.size ?? 1, -.05)), V("change", g, (e) => Qn(t(), i, e.target.value)), V("click", _, () => Zn(t(), i, B(r).props.size ?? 1, .05)), V("input", C, (e) => Jn(t(), i, "blur", Number(e.target.value))), V("input", T, (e) => Jn(t(), i, "opacity", Number(e.target.value))), V("change", re, (e) => Jn(t(), i, "parallax", e.target.checked ? .3 : 0)), U(e, a);
			}, b = (e) => {
				var n = nu(), a = I(n), o = F(a), s = R(o);
				E(a);
				var l = R(a, 2);
				Yr(l, 17, () => B(r).props.images ?? [], Gr, (e, n, a) => {
					var o = tu(), s = I(o), l = F(s), u = R(l, 2), d = F(u);
					d.disabled = a === 0, K(d, () => c.up, !0), E(d);
					var f = R(d, 2);
					K(f, () => c.down, !0), E(f);
					var p = R(f, 2);
					K(p, () => c.cross, !0), E(p), E(u), E(s);
					var m = R(s, 2), h = F(m), g = L(R(h));
					E(m);
					var _ = R(m, 2);
					q(_);
					var v = R(_, 2), y = F(v), b = L(R(y));
					E(v);
					var x = R(v, 2);
					q(x), z((e, t, i, o, s) => {
						Y(l, "src", B(n).src), f.disabled = a === B(r).props.images.length - 1, Y(p, "title", e), W(h, `${t ?? ""} `), W(g, `${i ?? ""}%`), J(_, B(n).x ?? .5), W(y, `${o ?? ""} `), W(b, `${s ?? ""}%`), J(x, B(n).y ?? .5);
					}, [
						() => X("tip.removeImage"),
						() => X("lbl.focusX"),
						() => Math.round((B(n).x ?? .5) * 100),
						() => X("lbl.focusY"),
						() => Math.round((B(n).y ?? .5) * 100)
					]), V("click", d, () => br(t(), i, a, -1)), V("click", f, () => br(t(), i, a, 1)), V("click", p, () => xr(t(), i, a)), V("input", _, (e) => Cr(t(), i, a, "x", Number(e.target.value))), V("input", x, (e) => Cr(t(), i, a, "y", Number(e.target.value))), U(e, o);
				});
				var u = R(l, 2), d = F(u), f = R(d);
				{
					let e = /* @__PURE__ */ A(() => B(r).props.fit ?? "cover"), n = /* @__PURE__ */ A(() => [["cover", X("opt.fit.cover")], ["contain", X("opt.fit.contain")]]);
					Z(f, {
						get value() {
							return B(e);
						},
						get options() {
							return B(n);
						},
						onchange: (e) => Jn(t(), i, "fit", e)
					});
				}
				E(u);
				var p = R(u, 2), m = F(p), h = R(m);
				q(h), E(p);
				var g = R(p, 2), _ = F(g), v = L(R(_));
				E(g);
				var y = R(g, 2);
				q(y);
				var b = R(y, 2), x = F(b), S = L(R(x));
				E(b);
				var C = R(b, 2);
				q(C);
				var ee = R(C, 2), w = F(ee), te = L(R(w));
				E(ee);
				var T = R(ee, 2);
				q(T);
				var ne = L(R(T, 2), !0);
				z((e, t, n, i, s, c, l, u, f, g, b) => {
					Y(a, "title", e), W(o, `${t ?? ""} `), W(d, `${n ?? ""} `), Y(p, "title", i), W(m, `${s ?? ""} `), J(h, B(r).props.interval ?? 6), W(_, `${c ?? ""} `), W(v, `${l ?? ""} s`), J(y, B(r).props.fade ?? 1.5), W(x, `${u ?? ""} `), W(S, `${B(r).props.blur ?? 0 ?? ""} px`), J(C, B(r).props.blur ?? 0), W(w, `${f ?? ""} `), W(te, `${g ?? ""}%`), J(T, B(r).props.opacity ?? 1), W(ne, b);
				}, [
					() => X("tip.bg.addImages"),
					() => X("ui.addImages"),
					() => X("lbl.fit"),
					() => X("hint.bg.gallery"),
					() => X("lbl.secondsPerImage"),
					() => X("lbl.transition"),
					() => (B(r).props.fade ?? 1.5).toFixed(1),
					() => X("lbl.blur"),
					() => X("lbl.strength"),
					() => Math.round((B(r).props.opacity ?? 1) * 100),
					() => X("hint.bg.gallery")
				]), V("change", s, (e) => yr(t(), i, e)), V("change", h, (e) => Jn(t(), i, "interval", Number(e.target.value))), V("input", y, (e) => Jn(t(), i, "fade", Number(e.target.value))), V("input", C, (e) => Jn(t(), i, "blur", Number(e.target.value))), V("input", T, (e) => Jn(t(), i, "opacity", Number(e.target.value))), U(e, n);
			}, x = (e) => {
				var n = iu(), a = I(n), o = F(a), s = R(o);
				E(a);
				var c = R(a, 2), l = F(c), u = R(l);
				E(c);
				var d = R(c, 2), f = F(d), p = R(f);
				{
					let e = /* @__PURE__ */ A(() => B(r).props.fit ?? "cover"), n = /* @__PURE__ */ A(() => [["cover", X("opt.fit.cover")], ["contain", X("opt.fit.contain")]]);
					Z(p, {
						get value() {
							return B(e);
						},
						get options() {
							return B(n);
						},
						onchange: (e) => Jn(t(), i, "fit", e)
					});
				}
				E(d);
				var m = R(d, 2), h = F(m), g = L(R(h));
				E(m);
				var _ = R(m, 2);
				q(_);
				var v = R(_, 2), y = F(v), b = L(R(y));
				E(v);
				var x = R(v, 2);
				q(x);
				var S = R(x, 2), C = F(S), ee = L(R(C));
				E(S);
				var w = R(S, 2);
				q(w);
				var te = R(w, 2), T = F(te);
				q(T);
				var ne = R(T);
				E(te);
				var re = R(te, 2), ie = (e) => {
					var n = ru(), a = I(n), o = F(a), s = L(R(o));
					E(a);
					var c = R(a, 2);
					q(c), z((e, t) => {
						W(o, `${e ?? ""} `), W(s, `${t ?? ""}%`), J(c, B(r).props.parallax ?? .3);
					}, [() => X("lbl.parallaxStrength"), () => Math.round((B(r).props.parallax ?? 0) * 100)]), V("input", c, (e) => Jn(t(), i, "parallax", Number(e.target.value))), U(e, n);
				};
				G(re, (e) => {
					(B(r).props.parallax ?? 0) > 0 && e(ie);
				}), z((e, t, n, i, s, u, p, m, v, S, re, ie, ae, oe) => {
					Y(a, "title", e), W(o, `${t ?? ""} `), Y(c, "title", n), W(l, `${i ?? ""} `), Y(d, "title", s), W(f, `${u ?? ""} `), W(h, `${p ?? ""} `), W(g, `${m ?? ""}%`), J(_, B(r).props.x ?? .5), W(y, `${v ?? ""} `), W(b, `${S ?? ""}%`), J(x, B(r).props.y ?? .5), W(C, `${re ?? ""} `), W(ee, `${ie ?? ""}%`), J(w, B(r).props.opacity ?? 1), Y(te, "title", ae), Ci(T, (B(r).props.parallax ?? 0) > 0), W(ne, ` ${oe ?? ""}`);
				}, [
					() => X("tip.bg.videoFile"),
					() => B(r).props.src ? X("ui.changeVideo") : X("ui.chooseVideo"),
					() => X("tip.bg.poster"),
					() => B(r).props.poster ? X("ui.changeImage") : X("ui.choosePoster"),
					() => X("tip.bg.fit"),
					() => X("lbl.fit"),
					() => X("lbl.horizontal"),
					() => Math.round((B(r).props.x ?? .5) * 100),
					() => X("lbl.vertical"),
					() => Math.round((B(r).props.y ?? .5) * 100),
					() => X("lbl.strength"),
					() => Math.round((B(r).props.opacity ?? 1) * 100),
					() => X("tip.bg.parallax"),
					() => X("lbl.parallax")
				]), V("change", s, (e) => _r(t(), i, e)), V("change", u, (e) => vr(t(), i, e)), V("input", _, (e) => Jn(t(), i, "x", Number(e.target.value))), V("input", x, (e) => Jn(t(), i, "y", Number(e.target.value))), V("input", w, (e) => Jn(t(), i, "opacity", Number(e.target.value))), V("change", T, (e) => Jn(t(), i, "parallax", e.target.checked ? .3 : 0)), U(e, n);
			};
			G(m, (e) => {
				B(r).type === "color" ? e(h) : B(r).type === "gradient" ? e(g, 1) : B(r).type === "glow" ? e(_, 2) : B(r).type === "grain" ? e(v, 3) : B(r).type === "image" ? e(y, 4) : B(r).type === "slideshow" ? e(b, 5) : B(r).type === "video" && e(x, 6);
			}), E(a), z((e, t, r) => {
				Y(d, "title", e), Y(f, "title", t), f.disabled = i === n().length - 1, Y(p, "title", r);
			}, [
				() => X("hint.bg.order"),
				() => X("hint.bg.order"),
				() => X("tip.bg.removeLayer")
			]), V("click", d, () => qn(t(), i, -1)), V("click", f, () => qn(t(), i, 1)), V("click", p, () => Kn(t(), i)), U(e, a);
		});
		var a = R(i, 2), s = F(a), l = R(s);
		{
			let e = /* @__PURE__ */ A(() => o.map(([e, t]) => [e, t.labelKey ? X(t.labelKey) : t.label]));
			Z(l, {
				get value() {
					return B(Wn);
				},
				get options() {
					return B(e);
				},
				onchange: (e) => P(Wn, e, !0)
			});
		}
		E(a);
		var u = R(a, 2), d = L(u, !0);
		z((e, t) => {
			W(s, `${e ?? ""} `), W(d, t);
		}, [() => X("lbl.newLayer"), () => X("ui.addLayer")]), V("click", u, () => Gn(t(), B(Wn))), U(e, r);
	}, r = (e, t = f, n = f) => {
		var r = Pr();
		Yr(I(r), 17, n, Gr, (e, r, i) => {
			var a = cu(), o = F(a);
			q(o);
			var s = R(o, 2), l = F(s);
			l.disabled = i === 0, K(l, () => c.up, !0), E(l);
			var u = R(l, 2);
			K(u, () => c.down, !0), E(u);
			var d = R(u, 2);
			K(d, () => c.cross, !0), E(d), E(s);
			var f = R(s, 2), p = F(f);
			{
				let e = /* @__PURE__ */ A(() => B(r).page ?? "__href"), n = /* @__PURE__ */ A(() => X("tip.linkTarget")), a = /* @__PURE__ */ A(() => [...B(k).pages.map((e) => [e.id, e.title]), ["__href", X("opt.linkHref")]]);
				Z(p, {
					get value() {
						return B(e);
					},
					get title() {
						return B(n);
					},
					get options() {
						return B(a);
					},
					onchange: (e) => ml(t(), i, e)
				});
			}
			E(f);
			var m = R(f, 2), h = (e) => {
				var n = su();
				q(n), z((e, t) => {
					J(n, B(r).href ?? ""), Y(n, "placeholder", e), Y(n, "title", t);
				}, [() => X("ph.hrefAnchor"), () => X("tip.hrefAnchor")]), V("change", n, (e) => hl(t(), i, e.target.value)), U(e, n);
			};
			G(m, (e) => {
				B(r).page || e(h);
			}), E(a), z((e, t) => {
				J(o, B(r).label), Y(o, "title", e), u.disabled = i === n().length - 1, Y(d, "title", t);
			}, [() => X("tip.linkLabel"), () => X("tip.removeLink")]), V("input", o, (e) => pl(t(), i, e.target.value)), V("click", l, () => fl(t(), i, -1)), V("click", u, () => fl(t(), i, 1)), V("click", d, () => dl(t(), i)), U(e, a);
		}), U(e, r);
	}, i = (e) => {
		let t = /* @__PURE__ */ A(() => B(j).props.boxStyle ?? {});
		var n = du(), r = I(n), i = F(r), a = R(i);
		{
			let e = /* @__PURE__ */ A(() => B(t).bg ?? ""), n = /* @__PURE__ */ A(Mr), r = /* @__PURE__ */ A(() => X("tip.box.bg"));
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
				onchange: (e) => Zt({ bg: e || null })
			});
		}
		E(r);
		var o = R(r, 2), s = F(o), c = R(s);
		{
			let e = /* @__PURE__ */ A(() => B(t).shadow ?? ""), n = /* @__PURE__ */ A(() => [
				["", X("common.none")],
				["soft", X("opt.shadow.soft")],
				["strong", X("opt.shadow.strong")]
			]);
			Z(c, {
				get value() {
					return B(e);
				},
				get options() {
					return B(n);
				},
				onchange: (e) => Zt({ shadow: e || null })
			});
		}
		E(o);
		var l = R(o, 2), u = (e) => {
			var n = lu(), r = F(n), i = R(r);
			{
				let e = /* @__PURE__ */ A(() => B(t).shadowColor ?? ""), n = /* @__PURE__ */ A(Mr), r = /* @__PURE__ */ A(() => X("tip.box.shadowColor"));
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
					onchange: (e) => Zt({ shadowColor: e || null })
				});
			}
			E(n), z((e) => W(r, `${e ?? ""} `), [() => X("lbl.shadowColor")]), U(e, n);
		};
		G(l, (e) => {
			B(t).shadow && e(u);
		});
		var d = R(l, 2), f = F(d), p = R(f);
		{
			let e = /* @__PURE__ */ A(() => B(t).border === "none" ? "none" : B(t).border ? "custom" : ""), n = /* @__PURE__ */ A(() => [
				["", X("opt.border.theme")],
				["none", X("common.none")],
				["custom", X("opt.border.custom")]
			]);
			Z(p, {
				get value() {
					return B(e);
				},
				get options() {
					return B(n);
				},
				onchange: (e) => Zt({ border: e === "custom" ? {
					color: "accent",
					width: 1
				} : e || null })
			});
		}
		E(d);
		var m = R(d, 2), h = (e) => {
			let n = /* @__PURE__ */ A(() => typeof B(t).border == "object" ? B(t).border : {
				color: "text",
				width: 1
			});
			var r = uu(), i = I(r), a = F(i), o = R(a);
			{
				let e = /* @__PURE__ */ A(Mr), t = /* @__PURE__ */ A(() => X("tip.box.borderColor"));
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
					onchange: (e) => Zt({ border: {
						...B(n),
						color: e
					} })
				});
			}
			E(i);
			var s = R(i, 2), c = F(s), l = R(c), u = F(l), d = R(u, 2);
			q(d);
			var f = R(d, 2);
			E(l), E(s), z((e, t, r, i, o, s) => {
				W(a, `${e ?? ""} `), W(c, `${t ?? ""} `), Y(u, "title", r), Y(u, "aria-label", i), J(d, B(n).width), Y(f, "title", o), Y(f, "aria-label", s);
			}, [
				() => X("lbl.borderColor"),
				() => X("lbl.thicknessPx"),
				() => X("tip.thinner"),
				() => X("tip.thinner"),
				() => X("tip.thicker"),
				() => X("tip.thicker")
			]), V("click", u, () => Zt({ border: {
				...B(n),
				width: Math.max(1, B(n).width - 1)
			} })), V("change", d, (e) => Zt({ border: {
				...B(n),
				width: Math.min(12, Math.max(1, Number(e.target.value) || 1))
			} })), V("click", f, () => Zt({ border: {
				...B(n),
				width: Math.min(12, B(n).width + 1)
			} })), U(e, r);
		};
		G(m, (e) => {
			B(t).border !== "none" && e(h);
		});
		var g = R(m, 2), _ = F(g);
		q(_);
		var v = R(_);
		E(g), z((e, t, n, r, a, o) => {
			W(i, `${e ?? ""} `), W(s, `${t ?? ""} `), W(f, `${n ?? ""} `), Y(g, "title", r), Ci(_, a), W(v, ` ${o ?? ""}`);
		}, [
			() => X("lbl.blockColor"),
			() => X("lbl.shadow"),
			() => X("lbl.border"),
			() => X("tip.box.glass"),
			() => !!B(t).glass,
			() => X("lbl.glass")
		]), V("change", _, (e) => Zt({ glass: e.target.checked || null })), U(e, n);
	}, a = (e) => {
		var t = vd(), n = I(t), r = F(n), a = F(r);
		let o;
		var s = L(a, !0), l = R(a, 2);
		let u;
		var d = L(l, !0);
		E(r), E(n);
		var f = R(n, 2), p = (e) => {
			var t = Pr(), n = I(t), r = (e) => {
				var t = fu(), n = L(t, !0);
				z((e) => W(n, e), [() => X("hint.textInline")]), U(e, t);
			}, i = (e) => {
				var t = _u(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.mode ?? "mailto"), t = /* @__PURE__ */ A(() => [["mailto", X("form.modeMailto")], ["endpoint", X("form.modeEndpoint")]]);
					Z(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => M("mode", e)
					});
				}
				E(n);
				var a = R(n, 2), o = (e) => {
					var t = pu(), n = F(t), r = R(n);
					q(r), E(t), z((e, i, a) => {
						Y(t, "title", e), W(n, `${i ?? ""} `), J(r, B(j).props.endpoint ?? ""), Y(r, "placeholder", a);
					}, [
						() => X("form.endpointNote"),
						() => X("form.endpoint"),
						() => X("form.endpointPh")
					]), V("change", r, (e) => M("endpoint", e.target.value.trim())), U(e, t);
				}, s = (e) => {
					var t = mu(), n = I(t), r = F(n), i = R(r);
					q(i), E(n);
					var a = R(n, 2), o = F(a), s = R(o);
					q(s), E(a), z((e, t, n, a) => {
						W(r, `${e ?? ""} `), J(i, B(j).props.recipient ?? ""), Y(i, "placeholder", t), W(o, `${n ?? ""} `), J(s, B(j).props.subject ?? ""), Y(s, "placeholder", a);
					}, [
						() => X("form.recipient"),
						() => X("form.recipientPh"),
						() => X("form.subject"),
						() => X("form.subjectPh")
					]), V("change", i, (e) => M("recipient", e.target.value.trim())), V("change", s, (e) => M("subject", e.target.value.trim())), U(e, t);
				};
				G(a, (e) => {
					(B(j).props.mode ?? "mailto") === "endpoint" ? e(o) : e(s, -1);
				});
				var l = R(a, 2), u = L(l, !0), d = R(l, 2);
				Yr(d, 19, () => B(j).props.fields ?? [], (e, t) => e.id ?? t, (e, t, n) => {
					var r = gu(), i = I(r), a = F(i);
					q(a);
					var o = R(a, 2);
					{
						let e = /* @__PURE__ */ A(() => B(t).type ?? "text"), r = /* @__PURE__ */ A(() => Qt.map((e) => [e, X(`form.type${e[0].toUpperCase()}${e.slice(1)}`)]));
						Z(o, {
							get value() {
								return B(e);
							},
							get options() {
								return B(r);
							},
							onchange: (e) => rn(B(n), { type: e })
						});
					}
					var s = R(o, 2), l = F(s);
					K(l, () => c.up, !0), E(l);
					var u = R(l, 2);
					K(u, () => c.down, !0), E(u);
					var d = R(u, 2);
					K(d, () => c.cross, !0), E(d), E(s), E(i);
					var f = R(i, 2), p = F(f);
					q(p);
					var m = R(p);
					E(f);
					var h = R(f, 2), g = (e) => {
						var r = hu();
						q(r), z((e, t) => {
							J(r, e), Y(r, "placeholder", t);
						}, [() => (B(t).options ?? []).join(", "), () => X("form.optionsPh")]), V("change", r, (e) => an(B(n), e.target.value)), U(e, r);
					}, _ = /* @__PURE__ */ A(() => $t.has(B(t).type));
					G(h, (e) => {
						B(_) && e(g);
					}), z((e, r, i) => {
						J(a, B(t).label), Y(a, "placeholder", e), l.disabled = B(n) === 0, u.disabled = B(n) === (B(j).props.fields?.length ?? 0) - 1, Y(d, "title", r), Ci(p, B(t).required === !0), W(m, ` ${i ?? ""}`);
					}, [
						() => X("form.fieldNamePh"),
						() => X("form.removeField"),
						() => X("form.required")
					]), V("change", a, (e) => rn(B(n), { label: e.target.value.trim() || X("form.fieldFallback") })), V("click", l, () => cn(B(n), -1)), V("click", u, () => cn(B(n), 1)), V("click", d, () => sn(B(n))), V("change", p, (e) => rn(B(n), { required: e.target.checked })), U(e, r);
				});
				var f = R(d, 2), p = L(f, !0), m = R(f, 2), h = F(m), g = R(h);
				q(g), E(m);
				var _ = R(m, 2), v = F(_), y = R(v);
				q(y), E(_), z((e, t, i, a, o, s, c, l) => {
					Y(n, "title", e), W(r, `${t ?? ""} `), W(u, i), W(p, a), W(h, `${o ?? ""} `), J(g, B(j).props.submitLabel ?? ""), Y(g, "placeholder", s), W(v, `${c ?? ""} `), J(y, B(j).props.successText ?? ""), Y(y, "placeholder", l);
				}, [
					() => X("form.modeTitle"),
					() => X("form.mode"),
					() => X("form.fields"),
					() => X("form.addField"),
					() => X("lbl.buttonText"),
					() => X("form.sendDefault"),
					() => X("form.receipt"),
					() => X("form.thanksDefault")
				]), V("click", f, on), V("change", g, (e) => M("submitLabel", e.target.value.trim() || X("form.sendDefault"))), V("change", y, (e) => M("successText", e.target.value.trim() || X("form.thanksDefault"))), U(e, t);
			}, a = (e) => {
				var t = yu(), n = I(t), r = F(n), i = R(r);
				ut(i), E(n);
				var a = R(n, 2), o = F(a), s = R(o);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.view ?? "list"), t = /* @__PURE__ */ A(() => [
						["list", X("calendar.viewList")],
						["cards", X("calendar.viewCards")],
						["month", X("calendar.viewMonth")],
						["next", X("calendar.viewNext")]
					]);
					Z(s, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => M("view", e)
					});
				}
				E(a);
				var c = R(a, 2), l = (e) => {
					var t = vu(), n = F(t), r = R(n);
					q(r), E(t), z((e, i) => {
						Y(t, "title", e), W(n, `${i ?? ""} `), J(r, B(j).props.limit ?? 6);
					}, [() => X("tip.collection.limit"), () => X("lbl.maxCount")]), V("change", r, (e) => M("limit", Math.max(1, Math.min(50, Number(e.target.value) || 6)))), U(e, t);
				};
				G(c, (e) => {
					((B(j).props.view ?? "list") === "list" || B(j).props.view === "cards") && e(l);
				});
				var u = R(c, 2), d = F(u);
				q(d);
				var f = R(d);
				E(u);
				var p = R(u, 2), m = F(p);
				q(m);
				var h = R(m);
				E(p), z((e, t, n, a, s, c) => {
					W(r, `${e ?? ""} `), Y(i, "placeholder", t), J(i, n), W(o, `${a ?? ""} `), Ci(d, B(j).props.showCategories !== !1), W(f, ` ${s ?? ""}`), Ci(m, B(j).props.showSubscribe !== !1), W(h, ` ${c ?? ""}`);
				}, [
					() => X("calendar.sources"),
					() => X("calendar.sourcesPh"),
					() => (B(j).props.sources ?? []).join("\n"),
					() => X("lbl.view"),
					() => X("calendar.showCategories"),
					() => X("calendar.showSubscribe")
				]), V("change", i, (e) => ln(e.target.value)), V("change", d, (e) => M("showCategories", e.target.checked)), V("change", m, (e) => M("showSubscribe", e.target.checked)), U(e, t);
			}, o = (e) => {
				var t = xu(), n = I(t), r = F(n);
				q(r);
				var i = R(r);
				E(n);
				var a = R(n, 2), o = L(a, !0), s = R(a, 2);
				Yr(s, 17, () => B(j).props.items ?? [], Gr, (e, t, n) => {
					var r = bu(), i = F(r);
					q(i);
					var a = R(i, 2), o = F(a);
					o.disabled = n === 0, K(o, () => c.up, !0), E(o);
					var s = R(o, 2);
					K(s, () => c.down, !0), E(s);
					var l = R(s, 2);
					K(l, () => c.cross, !0), E(l), E(a), E(r), z((e, r) => {
						J(i, B(t).q), Y(i, "title", e), s.disabled = n === (B(j).props.items?.length ?? 0) - 1, Y(l, "title", r);
					}, [() => X("tip.faq.question"), () => X("tip.faq.remove")]), V("change", i, (e) => un(n, { q: e.target.value })), V("click", o, () => pn(n, -1)), V("click", s, () => pn(n, 1)), V("click", l, () => fn(n)), U(e, r);
				});
				var l = R(s, 2), u = L(l, !0);
				z((e, t, a, s, c) => {
					Y(n, "title", e), Ci(r, t), W(i, ` ${a ?? ""}`), W(o, s), W(u, c);
				}, [
					() => X("tip.faq.multi"),
					() => !!B(j).props.multi,
					() => X("lbl.faqMulti"),
					() => X("lbl.questions"),
					() => X("ui.addQuestion")
				]), V("change", r, (e) => M("multi", e.target.checked)), V("click", l, dn), U(e, t);
			}, s = (e) => {
				var t = Cu(), n = I(t), r = L(n, !0), i = R(n, 2);
				Yr(i, 17, () => B(j).props.items ?? [], Gr, (e, t, n) => {
					var r = Su(), i = I(r), a = F(i);
					q(a);
					var o = R(a, 2);
					q(o);
					var s = R(o, 2), l = F(s);
					l.disabled = n === 0, K(l, () => c.up, !0), E(l);
					var u = R(l, 2);
					K(u, () => c.down, !0), E(u);
					var d = R(u, 2);
					K(d, () => c.cross, !0), E(d), E(s), E(i);
					var f = R(i, 2);
					q(f), z((e, r, i, s, c, l) => {
						J(a, B(t).year), Y(a, "placeholder", e), Y(a, "title", r), J(o, B(t).title), Y(o, "title", i), u.disabled = n === (B(j).props.items?.length ?? 0) - 1, Y(d, "title", s), J(f, B(t).text), Y(f, "placeholder", c), Y(f, "title", l);
					}, [
						() => X("ph.tlYear"),
						() => X("tip.timeline.year"),
						() => X("tip.timeline.title"),
						() => X("tip.timeline.remove"),
						() => X("ph.tlText"),
						() => X("tip.timeline.text")
					]), V("change", a, (e) => mn(n, { year: e.target.value })), V("change", o, (e) => mn(n, { title: e.target.value })), V("click", l, () => _n(n, -1)), V("click", u, () => _n(n, 1)), V("click", d, () => gn(n)), V("change", f, (e) => mn(n, { text: e.target.value })), U(e, r);
				});
				var a = R(i, 2), o = L(a, !0);
				z((e, t) => {
					W(r, e), W(o, t);
				}, [() => X("lbl.timelineItems"), () => X("ui.addTlItem")]), V("click", a, hn), U(e, t);
			}, l = (e) => {
				var t = wu(), n = I(t), r = F(n), i = R(r);
				q(i), E(n);
				var a = R(n, 2), o = F(a), s = R(o);
				q(s), E(a);
				var c = R(a, 2), l = F(c), u = R(l);
				q(u), E(c), z((e, t, n) => {
					W(r, `${e ?? ""} `), J(i, B(j).props.text ?? ""), W(o, `${t ?? ""} `), J(s, B(j).props.attribution ?? ""), W(l, `${n ?? ""} `), J(u, B(j).props.role ?? "");
				}, [
					() => X("lbl.quoteText"),
					() => X("lbl.quoteName"),
					() => X("lbl.quoteRole")
				]), V("change", i, (e) => M("text", e.target.value)), V("change", s, (e) => M("attribution", e.target.value)), V("change", u, (e) => M("role", e.target.value)), U(e, t);
			}, u = (e) => {
				var t = Tu(), n = I(t), r = F(n), i = R(r);
				q(i), E(n);
				var a = R(n, 2), o = F(a), s = R(o);
				q(s), E(a);
				var c = R(a, 2), l = F(c), u = R(l);
				q(u), E(c);
				var d = R(c, 2), f = F(d), p = R(f);
				q(p), E(d), z((e, t, n, a, c) => {
					W(r, `${e ?? ""} `), J(i, B(j).props.value ?? ""), Y(i, "title", t), W(o, `${n ?? ""} `), J(s, B(j).props.prefix ?? ""), W(l, `${a ?? ""} `), J(u, B(j).props.suffix ?? ""), W(f, `${c ?? ""} `), J(p, B(j).props.label ?? "");
				}, [
					() => X("lbl.statValue"),
					() => X("tip.stat.value"),
					() => X("lbl.statPrefix"),
					() => X("lbl.statSuffix"),
					() => X("lbl.statLabel")
				]), V("change", i, (e) => M("value", e.target.value)), V("change", s, (e) => M("prefix", e.target.value)), V("change", u, (e) => M("suffix", e.target.value)), V("change", p, (e) => M("label", e.target.value)), U(e, t);
			}, d = (e) => {
				var t = Eu(), n = I(t), r = F(n), i = L(r, !0), a = R(r, 2), o = L(a, !0);
				E(n);
				var s = R(n, 2), c = F(s), l = L(c, !0), u = R(c, 2), d = L(u, !0);
				E(s);
				var f = R(s, 2), p = F(f);
				q(p);
				var m = R(p);
				E(f), z((e, t, n, r, a, s) => {
					W(i, e), W(o, t), W(l, n), W(d, r), Y(f, "title", a), Ci(p, B(j).props.header !== !1), W(m, ` ${s ?? ""}`);
				}, [
					() => X("ui.addRow"),
					() => X("ui.removeRow"),
					() => X("ui.addColumn"),
					() => X("ui.removeColumn"),
					() => X("tip.table.header"),
					() => X("lbl.tableHeader")
				]), V("click", r, () => yn(1, 0)), V("click", a, () => yn(-1, 0)), V("click", c, () => yn(0, 1)), V("click", u, () => yn(0, -1)), V("change", p, (e) => M("header", e.target.checked)), U(e, t);
			}, f = (e) => {
				var t = Pr();
				Yr(I(t), 17, () => [
					["facebook", "Facebook"],
					["x", "X"],
					["linkedin", "LinkedIn"],
					["whatsapp", "WhatsApp"],
					["email", X("opt.share.email")],
					["copy", X("opt.share.copy")]
				], ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ A(() => h(B(t), 2));
					let r = () => B(n)[0], i = () => B(n)[1];
					var a = Du(), o = F(a);
					q(o);
					var s = R(o);
					E(a), z((e) => {
						Ci(o, e), W(s, ` ${i() ?? ""}`);
					}, [() => (B(j).props.services ?? []).includes(r())]), V("change", o, (e) => bn(r(), e.target.checked)), U(e, a);
				}), U(e, t);
			}, p = (e) => {
				var t = Ou(), n = I(t), r = F(n), i = R(r);
				q(i), E(n);
				var a = R(n, 2), o = F(a), s = R(o);
				q(s), E(a), z((e, t, n) => {
					W(r, `${e ?? ""} `), J(i, B(j).props.target ?? ""), Y(a, "title", t), W(o, `${n ?? ""} `), J(s, B(j).props.doneText ?? "");
				}, [
					() => X("lbl.countdownTarget"),
					() => X("tip.countdown.done"),
					() => X("lbl.countdownDone")
				]), V("change", i, (e) => M("target", e.target.value)), V("change", s, (e) => M("doneText", e.target.value)), U(e, t);
			}, m = (e) => {
				var t = Au(), n = I(t), r = F(n), i = R(r);
				E(n);
				var a = R(n, 2), o = (e) => {
					var t = ku(), n = L(t, !0);
					z((e) => W(n, e), [() => X("ui.removeAudio")]), V("click", t, () => M("src", "")), U(e, t);
				};
				G(a, (e) => {
					B(j).props.src && e(o);
				});
				var s = R(a, 2), c = F(s), l = R(c);
				q(l), E(s);
				var u = R(s, 2), d = F(u);
				q(d);
				var f = R(d);
				E(u), z((e, t, i, a, o) => {
					Y(n, "title", e), W(r, `${t ?? ""} `), W(c, `${i ?? ""} `), J(l, B(j).props.title ?? ""), Ci(d, a), W(f, ` ${o ?? ""}`);
				}, [
					() => X("tip.blocks.audioFile"),
					() => X("ui.chooseAudio"),
					() => X("lbl.audioTitle"),
					() => !!B(j).props.loop,
					() => X("lbl.audioLoop")
				]), V("change", i, Sn), V("change", l, (e) => M("title", e.target.value)), V("change", d, (e) => M("loop", e.target.checked)), U(e, t);
			}, g = (e) => {
				var t = ju(), n = I(t), r = F(n), i = R(r);
				q(i), E(n);
				var a = R(n, 2), o = F(a), s = R(o);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.page ?? "__href"), t = /* @__PURE__ */ A(() => [...B(k).pages.map((e) => [e.id, e.title]), ["__href", X("opt.externalLink")]]);
					Z(s, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => {
							let t = e === "__href" ? null : e;
							zt(`edit:${B(j).blockId}`, (e) => {
								e.props.page = t, t && (e.props.href = null);
							});
						}
					});
				}
				E(a);
				var c = R(a, 2), l = (e) => {
					var t = hu();
					q(t), z((e) => {
						Y(t, "placeholder", e), J(t, B(j).props.href === "#" ? "" : B(j).props.href ?? "");
					}, [() => X("ph.url")]), V("change", t, (e) => M("href", e.target.value || null)), U(e, t);
				};
				G(c, (e) => {
					B(j).props.page || e(l);
				}), z((e, t) => {
					W(r, `${e ?? ""} `), J(i, B(j).props.label), W(o, `${t ?? ""} `);
				}, [() => X("blocks.text"), () => X("lbl.goesTo")]), V("change", i, (e) => M("label", e.target.value)), U(e, t);
			}, _ = (e) => {
				var t = Mu(), n = I(t), r = F(n), i = R(r);
				E(n);
				var a = R(n, 2), o = F(a), s = R(o);
				q(s), E(a);
				var c = R(a, 2), l = F(c), u = R(l);
				q(u), E(c);
				var d = R(c, 2), f = (e) => {
					var t = Du(), n = F(t);
					q(n);
					var r = R(n);
					E(t), z((e, i, a) => {
						Y(t, "title", e), Ci(n, i), W(r, ` ${a ?? ""}`);
					}, [
						() => X("tip.lightbox"),
						() => !!B(j).props.lightbox,
						() => X("lbl.lightbox")
					]), V("change", n, (e) => M("lightbox", e.target.checked)), U(e, t);
				};
				G(d, (e) => {
					B(j).props.href || e(f);
				}), z((e, t, n, i, a) => {
					W(r, `${e ?? ""} `), W(o, `${t ?? ""} `), J(s, B(j).props.alt ?? ""), Y(s, "placeholder", n), W(l, `${i ?? ""} `), J(u, B(j).props.href ?? ""), Y(u, "placeholder", a);
				}, [
					() => X("ui.changeImage"),
					() => X("lbl.description"),
					() => X("ph.altText"),
					() => X("lbl.link"),
					() => X("ph.optionalImageLink")
				]), V("change", i, wn), V("change", s, (e) => M("alt", e.target.value)), V("change", u, (e) => M("href", e.target.value || null)), U(e, t);
			}, v = (e) => {
				var t = Nu(), n = I(t), r = L(n, !0), i = R(n, 2);
				q(i);
				var a = R(i, 2), o = F(a), s = R(o);
				q(s), E(a), z((e, t, a, c) => {
					Y(n, "title", e), W(r, t), J(i, B(j).props.url ?? ""), Y(i, "placeholder", a), W(o, `${c ?? ""} `), J(s, B(j).props.title ?? "");
				}, [
					() => X("hint.video"),
					() => X("lbl.videoUrl"),
					() => X("ph.videoUrl"),
					() => X("lbl.videoTitle")
				]), V("change", i, (e) => M("url", e.target.value)), V("change", s, (e) => M("title", e.target.value)), U(e, t);
			}, y = (e) => {
				var t = Iu(), n = I(t), r = F(n), i = R(r), a = F(i);
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
						onpick: (e) => zt(`edit:${B(j).blockId}`, (t) => {
							t.props.glyph = e, t.props.icon = null, t.props.image = null;
						}),
						onicon: (e) => zt(`edit:${B(j).blockId}`, (t) => {
							t.props.icon = e, t.props.image = null;
						}),
						onimage: (e) => M("image", e)
					});
				}
				var o = R(a, 2), s = (e) => {
					var t = Pu();
					q(t), z((e) => {
						J(t, B(j).props.glyph ?? ""), Y(t, "title", e);
					}, [() => X("tip.icon.typeGlyph")]), V("change", t, (e) => M("glyph", e.target.value || "★")), U(e, t);
				}, c = (e) => {
					var t = ku(), n = L(t, !0);
					z((e, r) => {
						Y(t, "title", e), W(n, r);
					}, [() => X("tip.icon.backToGlyph"), () => X("ui.removeDrawnIcon")]), V("click", t, () => M("icon", null)), U(e, t);
				};
				G(o, (e) => {
					B(j).props.icon ? e(c, -1) : e(s);
				}), E(i), E(n);
				var l = R(n, 2), u = (e) => {
					var t = Fu(), n = F(t), r = R(n, 2), i = L(r, !0);
					E(t), z((e, r, a) => {
						Y(t, "title", e), Y(n, "src", B(j).props.image), Y(n, "alt", r), W(i, a);
					}, [
						() => X("hint.icon.ownImage"),
						() => X("gp.ownIcon"),
						() => X("ui.removeOwnIcon")
					]), V("click", r, () => M("image", null)), U(e, t);
				};
				G(l, (e) => {
					B(j).props.image && e(u);
				}), z((e) => W(r, `${e ?? ""} `), [() => X("blocks.icon")]), U(e, t);
			}, b = (e) => {
				var t = Lu(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.collection ?? ""), t = /* @__PURE__ */ A(() => [["", X("common.choose")], ...B(_s).map((e) => [e, B(vs)[e]?.name ?? e])]);
					Z(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => M("collection", e || null)
					});
				}
				E(n);
				var a = R(n, 2), o = F(a), s = R(o);
				q(s), E(a);
				var c = R(a, 2), l = F(c);
				q(l);
				var u = R(l);
				E(c), z((e, t, i, c, d) => {
					Y(n, "title", e), W(r, `${t ?? ""} `), Y(a, "title", i), W(o, `${c ?? ""} `), J(s, B(j).props.limit ?? 6), Ci(l, B(j).props.newestFirst !== !1), W(u, ` ${d ?? ""}`);
				}, [
					() => X("tip.collection.source"),
					() => X("blocks.collection"),
					() => X("tip.collection.limit"),
					() => X("lbl.maxCount"),
					() => X("lbl.newestFirst")
				]), V("change", s, (e) => M("limit", Number(e.target.value))), V("change", l, (e) => M("newestFirst", e.target.checked)), U(e, t);
			}, x = (e) => {
				var t = Bu(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.collection ?? ""), t = /* @__PURE__ */ A(() => [["", X("common.choose")], ...B(_s).filter((e) => B(vs)[e]?.kind === "products").map((e) => [e, B(vs)[e]?.name ?? e])]);
					Z(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => M("collection", e || null)
					});
				}
				E(n);
				var a = R(n, 2), o = (e) => {
					var t = Ru(), n = F(t), r = L(n, !0), i = R(n, 2), a = L(i, !0);
					E(t), z((e, t, o, s) => {
						Y(n, "title", e), W(r, t), Y(i, "title", o), W(a, s);
					}, [
						() => X("tip.product.addProduct"),
						() => X("ui.addProduct"),
						() => X("tip.product.editCatalog"),
						() => X("ui.editCatalog")
					]), V("click", n, () => Zs(B(j).props.collection)), V("click", i, () => {
						P(ys, B(j).props.collection, !0), P(vt, "collections");
					}), U(e, t);
				}, s = (e) => {
					var t = zu(), n = L(t, !0);
					z((e, r) => {
						Y(t, "title", e), W(n, r);
					}, [() => X("tip.product.createCatalog"), () => X("ui.createCatalog")]), V("click", t, Js), U(e, t);
				}, c = /* @__PURE__ */ A(() => !B(_s).some((e) => B(vs)[e]?.kind === "products"));
				G(a, (e) => {
					B(j).props.collection && B(vs)[B(j).props.collection]?.kind === "products" ? e(o) : B(c) && e(s, 1);
				});
				var l = R(a, 2), u = F(l), d = R(u);
				q(d), E(l);
				var f = R(l, 2), p = F(f), m = R(p);
				q(m), E(f), z((e, t, i, a, o, s) => {
					Y(n, "title", e), W(r, `${t ?? ""} `), Y(l, "title", i), W(u, `${a ?? ""} `), J(d, B(j).props.limit ?? 0), Y(f, "title", o), W(p, `${s ?? ""} `), J(m, B(j).props.currency ?? "kr");
				}, [
					() => X("tip.product.source"),
					() => X("blocks.collection"),
					() => X("tip.collection.limit"),
					() => X("lbl.maxCount"),
					() => X("tip.product.currency"),
					() => X("lbl.currency")
				]), V("change", d, (e) => M("limit", Number(e.target.value))), V("change", m, (e) => M("currency", e.target.value)), U(e, t);
			}, S = (e) => {
				var t = Vu(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.href ?? ""), t = /* @__PURE__ */ A(() => [["", X("common.none")], ...B(k).pages.map((e) => [e.path, e.title])]);
					Z(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => M("href", e)
					});
				}
				E(n);
				var a = R(n, 2), o = F(a), s = R(o);
				q(s), E(a), z((e, t, i, c) => {
					Y(n, "title", e), W(r, `${t ?? ""} `), Y(a, "title", i), W(o, `${c ?? ""} `), J(s, B(j).props.currency ?? "kr");
				}, [
					() => X("tip.cart.checkout"),
					() => X("lbl.checkoutPage"),
					() => X("tip.product.currency"),
					() => X("lbl.currency")
				]), V("change", s, (e) => M("currency", e.target.value)), U(e, t);
			}, C = (e) => {
				var t = Hu(), n = I(t), r = F(n), i = R(r);
				q(i), E(n);
				var a = R(n, 2), o = F(a), s = R(o);
				q(s), E(a);
				var c = R(a, 2), l = F(c), u = R(l);
				q(u), E(c);
				var d = R(c, 2), f = F(d);
				q(f);
				var p = R(f);
				E(d);
				var m = R(d, 2), h = F(m), g = R(h);
				q(g), E(m), z((e, t, _, v, y, b, x, S, C, ee) => {
					Y(n, "title", e), W(r, `${t ?? ""} `), J(i, B(j).props.recipient ?? ""), Y(a, "title", _), W(o, `${v ?? ""} `), J(s, B(j).props.endpoint ?? ""), Y(c, "title", y), W(l, `${b ?? ""} `), J(u, B(j).props.vipps ?? ""), Y(d, "title", x), Ci(f, B(j).props.vippsCheckout === !0), W(p, ` ${S ?? ""}`), Y(m, "title", C), W(h, `${ee ?? ""} `), J(g, B(j).props.currency ?? "kr");
				}, [
					() => X("tip.checkout.recipient"),
					() => X("lbl.recipientEmail"),
					() => X("tip.checkout.endpoint"),
					() => X("lbl.endpointUrl"),
					() => X("tip.checkout.vipps"),
					() => X("lbl.vippsNumber"),
					() => X("tip.checkout.vippsCheckout"),
					() => X("lbl.vippsCheckout"),
					() => X("tip.product.currency"),
					() => X("lbl.currency")
				]), V("change", i, (e) => M("recipient", e.target.value.trim())), V("change", s, (e) => M("endpoint", e.target.value.trim())), V("change", u, (e) => M("vipps", e.target.value.trim())), V("change", f, (e) => M("vippsCheckout", e.target.checked)), V("change", g, (e) => M("currency", e.target.value)), U(e, t);
			}, ee = (e) => {
				var t = Wu(), n = I(t), r = F(n), i = R(r);
				E(n), Yr(R(n, 2), 17, () => B(j).props.images ?? [], Gr, (e, t, n) => {
					var r = Uu(), i = F(r), a = F(i), o = R(a, 2), s = F(o);
					s.disabled = n === 0, K(s, () => c.up, !0), E(s);
					var l = R(s, 2);
					K(l, () => c.down, !0), E(l);
					var u = R(l, 2);
					K(u, () => c.cross, !0), E(u), E(o), E(i);
					var d = R(i, 2), f = F(d), p = R(f);
					q(p), E(d);
					var m = R(d, 2), h = F(m), g = R(h);
					q(g), E(m), E(r), z((e, r, o, s, c, d) => {
						Y(i, "title", e), Y(a, "src", B(t).src), l.disabled = n === B(j).props.images.length - 1, Y(u, "title", r), W(f, `${o ?? ""} `), J(p, B(t).alt ?? ""), Y(p, "placeholder", s), W(h, `${c ?? ""} `), J(g, B(t).href ?? ""), Y(g, "placeholder", d);
					}, [
						() => X("hint.gallery"),
						() => X("tip.removeImage"),
						() => X("lbl.description"),
						() => X("ph.altShort"),
						() => X("lbl.link"),
						() => X("ph.galleryHref")
					]), V("click", s, () => Qm(n, -1)), V("click", l, () => Qm(n, 1)), V("click", u, () => $m(n)), V("change", p, (e) => eh(n, "alt", e.target.value)), V("change", g, (e) => eh(n, "href", e.target.value || null)), U(e, r);
				}), z((e, t) => {
					Y(n, "title", e), W(r, `${t ?? ""} `);
				}, [() => X("tip.gallery.addImages"), () => X("ui.addImages")]), V("change", i, Xm), U(e, t);
			}, w = (e) => {
				var t = lu(), n = F(t);
				Z(R(n), {
					get value() {
						return B(j).props.kind;
					},
					get options() {
						return Dn;
					},
					onchange: (e) => M("kind", e)
				}), E(t), z((e) => W(n, `${e ?? ""} `), [() => X("blocks.shape")]), U(e, t);
			}, te = (e) => {
				let t = /* @__PURE__ */ A(() => Vm[B(j).type] ?? B(Bm).find((e) => e.type === B(j).type)?.fields ?? []);
				var n = Pr(), r = I(n), i = (e) => {
					var n = Pr();
					Yr(I(n), 17, () => B(t), (e) => e.key, (e, t) => {
						var n = Pr(), r = I(n), i = (e) => {
							let n = /* @__PURE__ */ A(() => `${B(j).blockId}:${B(t).key}`);
							var r = Ku(), i = I(r), a = F(i), o = R(a);
							q(o), E(i);
							var s = R(i, 2), c = L(s, !0), l = R(s, 2), u = (e) => {
								var t = Gu();
								let r;
								var i = L(t, !0);
								z(() => {
									r = gi(t, 1, "panel-hint svelte-1n46o8q", null, r, { "place-error": Gt[B(n)].err }), W(i, Gt[B(n)].text);
								}), U(e, t);
							};
							G(l, (e) => {
								Gt[B(n)] && e(u);
							}), z((e) => {
								W(a, `${B(t).label ?? ""} `), Y(o, "placeholder", B(t).placeholder), J(o, Wt[B(n)] ?? B(j).props[B(t).key] ?? ""), s.disabled = B(Kt), W(c, e);
							}, [() => X("props.place.search")]), V("input", o, (e) => {
								Wt[B(n)] = e.target.value;
							}), V("keydown", o, (e) => {
								e.key === "Enter" && Yt(B(t));
							}), V("click", s, () => Yt(B(t))), U(e, r);
						}, a = (e) => {
							var n = qu(), r = F(n), i = R(r);
							q(i), E(n), z(() => {
								W(r, `${B(t).label ?? ""} `), Y(i, "min", B(t).min), Y(i, "max", B(t).max), Y(i, "step", B(t).step ?? 1), J(i, B(j).props[B(t).key]);
							}), V("change", i, (e) => M(B(t).key, Jt(B(t), Number(e.target.value)))), U(e, n);
						}, o = (e) => {
							var n = Du(), r = F(n);
							q(r);
							var i = R(r);
							E(n), z((e) => {
								Ci(r, e), W(i, ` ${B(t).label ?? ""}`);
							}, [() => !!B(j).props[B(t).key]]), V("change", r, (e) => M(B(t).key, e.target.checked)), U(e, n);
						}, s = (e) => {
							var n = lu(), r = F(n), i = R(r);
							{
								let e = /* @__PURE__ */ A(() => (B(t).options ?? []).map((e) => [e.value, e.label]));
								Z(i, {
									get value() {
										return B(j).props[B(t).key];
									},
									get options() {
										return B(e);
									},
									onchange: (e) => M(B(t).key, e)
								});
							}
							E(n), z(() => W(r, `${B(t).label ?? ""} `)), U(e, n);
						}, c = (e) => {
							var n = Ju(), r = F(n), i = R(r);
							q(i), E(n), z(() => {
								W(r, `${B(t).label ?? ""} `), Y(i, "placeholder", B(t).placeholder), J(i, B(j).props[B(t).key] ?? "");
							}), V("change", i, (e) => M(B(t).key, e.target.value)), U(e, n);
						};
						G(r, (e) => {
							B(t).type === "place" ? e(i) : B(t).type === "number" ? e(a, 1) : B(t).type === "toggle" ? e(o, 2) : B(t).type === "select" ? e(s, 3) : e(c, -1);
						}), U(e, n);
					}), U(e, n);
				}, a = (e) => {
					var t = ku(), n = L(t, !0);
					z((e, r) => {
						Y(t, "title", e), W(n, r);
					}, [() => X("hint.pluginBlock"), () => X("ui.settings")]), V("click", t, () => O?.sendOpenConfig(B(j).blockId)), U(e, t);
				};
				G(r, (e) => {
					B(t).length ? e(i) : e(a, -1);
				}), U(e, n);
			};
			G(n, (e) => {
				B(j).type === "text" ? e(r) : B(j).type === "form" ? e(i, 1) : B(j).type === "calendar" ? e(a, 2) : B(j).type === "faq" ? e(o, 3) : B(j).type === "timeline" ? e(s, 4) : B(j).type === "quote" ? e(l, 5) : B(j).type === "stats" ? e(u, 6) : B(j).type === "table" ? e(d, 7) : B(j).type === "share" ? e(f, 8) : B(j).type === "countdown" ? e(p, 9) : B(j).type === "audio" ? e(m, 10) : B(j).type === "button" ? e(g, 11) : B(j).type === "image" ? e(_, 12) : B(j).type === "video" ? e(v, 13) : B(j).type === "icon" ? e(y, 14) : B(j).type === "collection" ? e(b, 15) : B(j).type === "product" ? e(x, 16) : B(j).type === "cart" ? e(S, 17) : B(j).type === "checkout" ? e(C, 18) : B(j).type === "gallery" ? e(ee, 19) : B(j).type === "shape" ? e(w, 20) : e(te, -1);
			}), U(e, t);
		}, m = (e) => {
			var t = _d(), n = I(t), r = (e) => {
				var t = Yu(), n = I(t), r = F(n), a = R(r);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.align ?? "left"), t = /* @__PURE__ */ A(() => [
						["left", X("common.left")],
						["center", X("common.center")],
						["right", X("common.right")]
					]);
					Z(a, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => M("align", e)
					});
				}
				E(n);
				var o = R(n, 2), s = F(o);
				q(s);
				var c = R(s);
				E(o);
				var l = R(o, 2), u = (e) => {
					i(e);
				};
				G(l, (e) => {
					B(j).props.box && e(u);
				}), ke(2), z((e, t, n) => {
					W(r, `${e ?? ""} `), Ci(s, t), W(c, ` ${n ?? ""}`);
				}, [
					() => X("lbl.align"),
					() => !!B(j).props.box,
					() => X("lbl.textBoxToggle")
				]), V("change", s, (e) => M("box", e.target.checked)), U(e, t);
			}, a = (e) => {
				var t = Xu(), n = I(t), r = L(n, !0), a = R(n, 2);
				i(a), ke(2), z((e) => W(r, e), [() => X("lbl.cardStyle")]), U(e, t);
			}, o = (e) => {
				var t = Zu(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.variant ?? "left"), t = /* @__PURE__ */ A(() => [["left", X("opt.timeline.left")], ["alternating", X("opt.timeline.alternating")]]);
					Z(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => M("variant", e)
					});
				}
				E(n);
				var a = R(n, 2), o = F(a), s = R(o);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.marker ?? "filled"), t = /* @__PURE__ */ A(() => [["filled", X("opt.timeline.filled")], ["ring", X("opt.timeline.ring")]]);
					Z(s, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => M("marker", e)
					});
				}
				E(a);
				var c = R(a, 2), l = F(c), u = R(l);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.accent ?? "accent"), t = /* @__PURE__ */ A(Mr);
					ga(u, {
						get value() {
							return B(e);
						},
						get tokens() {
							return B(t);
						},
						onchange: (e) => M("accent", e === "accent" ? null : e)
					});
				}
				E(c), ke(2), z((e, t, n) => {
					W(r, `${e ?? ""} `), W(o, `${t ?? ""} `), W(l, `${n ?? ""} `);
				}, [
					() => X("lbl.variant"),
					() => X("lbl.timelineMarker"),
					() => X("lbl.color")
				]), U(e, t);
			}, s = (e) => {
				var t = $u(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.variant ?? "large"), t = /* @__PURE__ */ A(() => [["large", X("opt.quote.large")], ["short", X("opt.quote.short")]]);
					Z(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => M("variant", e)
					});
				}
				E(n);
				var a = R(n, 2), o = (e) => {
					var t = Qu(), n = I(t), r = F(n), i = R(r);
					E(n);
					var a = R(n, 2), o = (e) => {
						var t = ku(), n = L(t, !0);
						z((e) => W(n, e), [() => X("ui.quotePortraitRemove")]), V("click", t, () => M("image", "")), U(e, t);
					};
					G(a, (e) => {
						B(j).props.image && e(o);
					}), z((e) => W(r, `${e ?? ""} `), [() => X("ui.quotePortrait")]), V("change", i, Tn), U(e, t);
				};
				G(a, (e) => {
					B(j).props.variant === "short" && e(o);
				});
				var s = R(a, 2), c = F(s), l = R(c);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.accent ?? "accent"), t = /* @__PURE__ */ A(Mr);
					ga(l, {
						get value() {
							return B(e);
						},
						get tokens() {
							return B(t);
						},
						onchange: (e) => M("accent", e === "accent" ? null : e)
					});
				}
				E(s), ke(2), z((e, t) => {
					W(r, `${e ?? ""} `), W(c, `${t ?? ""} `);
				}, [() => X("lbl.variant"), () => X("lbl.color")]), U(e, t);
			}, c = (e) => {
				var t = ed(), n = I(t), r = F(n);
				q(r);
				var i = R(r);
				E(n), ke(2), z((e, t) => {
					Y(n, "title", e), Ci(r, B(j).props.countUp !== !1), W(i, ` ${t ?? ""}`);
				}, [() => X("tip.stat.countUp"), () => X("lbl.statCountUp")]), V("change", r, (e) => M("countUp", e.target.checked)), U(e, t);
			}, l = (e) => {
				var t = td(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.lines ?? "rows"), t = /* @__PURE__ */ A(() => [
						["rows", X("opt.table.rows")],
						["grid", X("opt.table.grid")],
						["none", X("common.none")]
					]);
					Z(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => M("lines", e)
					});
				}
				E(n);
				var a = R(n, 2), o = F(a);
				q(o);
				var s = R(o);
				E(a), ke(2), z((e, t, n) => {
					W(r, `${e ?? ""} `), Ci(o, t), W(s, ` ${n ?? ""}`);
				}, [
					() => X("lbl.tableLines"),
					() => !!B(j).props.striped,
					() => X("lbl.tableStriped")
				]), V("change", o, (e) => M("striped", e.target.checked)), U(e, t);
			}, u = (e) => {
				var t = nd(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.variant ?? "icons"), t = /* @__PURE__ */ A(() => [["icons", X("opt.share.icons")], ["labels", X("opt.share.labels")]]);
					Z(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => M("variant", e)
					});
				}
				E(n);
				var a = R(n, 2), o = F(a), s = R(o);
				q(s), E(a);
				var c = R(a, 2), l = F(c), u = R(l);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.color || "accent"), t = /* @__PURE__ */ A(Mr);
					ga(u, {
						get value() {
							return B(e);
						},
						get tokens() {
							return B(t);
						},
						onchange: (e) => M("color", e === "accent" ? "" : e)
					});
				}
				E(c), ke(2), z((e, t, n) => {
					W(r, `${e ?? ""} `), W(o, `${t ?? ""} `), J(s, B(j).props.size ?? 38), W(l, `${n ?? ""} `);
				}, [
					() => X("lbl.variant"),
					() => X("lbl.size"),
					() => X("lbl.color")
				]), V("change", s, (e) => M("size", Number(e.target.value) || 38)), U(e, t);
			}, d = (e) => {
				var t = td(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.variant ?? "boxes"), t = /* @__PURE__ */ A(() => [["boxes", X("opt.countdown.boxes")], ["plain", X("opt.countdown.plain")]]);
					Z(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => M("variant", e)
					});
				}
				E(n);
				var a = R(n, 2), o = F(a);
				q(o);
				var s = R(o);
				E(a), ke(2), z((e, t) => {
					W(r, `${e ?? ""} `), Ci(o, B(j).props.showSeconds !== !1), W(s, ` ${t ?? ""}`);
				}, [() => X("lbl.variant"), () => X("lbl.countdownSeconds")]), V("change", o, (e) => M("showSeconds", e.target.checked)), U(e, t);
			}, f = (e) => {
				var t = rd(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ A(() => [["primary", X("opt.btn.primary")], ["secondary", X("opt.btn.secondary")]]);
					Z(i, {
						get value() {
							return B(j).props.style;
						},
						get options() {
							return B(e);
						},
						onchange: (e) => M("style", e)
					});
				}
				E(n), ke(2), z((e) => W(r, `${e ?? ""} `), [() => X("lbl.style")]), U(e, t);
			}, p = (e) => {
				var t = id(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.fit ?? "cover"), t = /* @__PURE__ */ A(() => [["cover", X("opt.fitFrame.cover")], ["contain", X("opt.fitFrame.contain")]]);
					Z(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => M("fit", e)
					});
				}
				E(n);
				var a = R(n, 2), o = F(a), s = R(o);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.radius ?? ""), t = /* @__PURE__ */ A(() => [
						["", X("common.none")],
						["sm", X("opt.size.sm")],
						["md", X("opt.radius.md")]
					]);
					Z(s, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => M("radius", e || null)
					});
				}
				E(a);
				var c = R(a, 2), l = F(c), u = L(R(l));
				E(c);
				var d = R(c, 2);
				q(d);
				var f = R(d, 2), p = F(f), m = L(R(p));
				E(f);
				var h = R(f, 2);
				q(h);
				var g = R(h, 2), _ = F(g), v = L(R(_));
				E(g);
				var y = R(g, 2);
				q(y);
				var b = R(y, 2), x = F(b), S = L(R(x));
				E(b);
				var C = R(b, 2);
				q(C);
				var ee = R(C, 2), w = F(ee), te = L(R(w));
				E(ee);
				var T = R(ee, 2);
				q(T);
				var ne = R(T, 2), re = F(ne), ie = L(R(re));
				E(ne);
				var ae = R(ne, 2);
				q(ae);
				var oe = R(ae, 2), se = L(oe, !0);
				ke(2), z((e, t, n, i, a, s, c, f, b, ee, ne, ce, le, ue, de, fe, pe) => {
					W(r, `${e ?? ""} `), W(o, `${t ?? ""} `), W(l, `${n ?? ""} `), W(u, `${i ?? ""}%`), J(d, B(j).props.x ?? .5), W(p, `${a ?? ""} `), W(m, `${s ?? ""}%`), J(h, B(j).props.y ?? .5), Y(g, "title", c), W(_, `${f ?? ""} `), W(v, `${b ?? ""}x`), J(y, B(j).props.zoom ?? 1), W(x, `${ee ?? ""} `), W(S, `${ne ?? ""}%`), J(C, B(j).props.brightness ?? 1), W(w, `${ce ?? ""} `), W(te, `${le ?? ""}%`), J(T, B(j).props.contrast ?? 1), W(re, `${ue ?? ""} `), W(ie, `${de ?? ""}%`), J(ae, B(j).props.saturate ?? 1), Y(oe, "title", fe), W(se, pe);
				}, [
					() => X("lbl.fit"),
					() => X("lbl.radius"),
					() => X("lbl.focusX"),
					() => Math.round((B(j).props.x ?? .5) * 100),
					() => X("lbl.focusY"),
					() => Math.round((B(j).props.y ?? .5) * 100),
					() => X("tip.zoomCrop"),
					() => X("lbl.zoom"),
					() => (B(j).props.zoom ?? 1).toFixed(2),
					() => X("lbl.brightness"),
					() => Math.round((B(j).props.brightness ?? 1) * 100),
					() => X("lbl.contrast"),
					() => Math.round((B(j).props.contrast ?? 1) * 100),
					() => X("lbl.saturate"),
					() => Math.round((B(j).props.saturate ?? 1) * 100),
					() => X("tip.resetAdjust"),
					() => X("ui.resetAdjust")
				]), V("input", d, (e) => M("x", Number(e.target.value))), V("input", h, (e) => M("y", Number(e.target.value))), V("input", y, (e) => M("zoom", Number(e.target.value))), V("input", C, (e) => M("brightness", Number(e.target.value))), V("input", T, (e) => M("contrast", Number(e.target.value))), V("input", ae, (e) => M("saturate", Number(e.target.value))), V("click", oe, () => zt(`edit:${B(j).blockId}`, (e) => {
					e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
				})), U(e, t);
			}, m = (e) => {
				var t = ad(), n = I(t), r = F(n), i = R(r);
				q(i), E(n);
				var a = R(n, 2), o = F(a), s = R(o);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.color ?? "accent"), t = /* @__PURE__ */ A(Mr);
					ga(s, {
						get value() {
							return B(e);
						},
						get tokens() {
							return B(t);
						},
						onchange: (e) => M("color", e)
					});
				}
				E(a), ke(2), z((e, t, n) => {
					W(r, `${e ?? ""} `), J(i, B(j).props.size ?? 48), Y(a, "title", t), W(o, `${n ?? ""} `);
				}, [
					() => X("lbl.sizePx"),
					() => X("hint.icon.color"),
					() => X("lbl.color")
				]), V("change", i, (e) => M("size", Number(e.target.value))), U(e, t);
			}, h = (e) => {
				var t = rd(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.view ?? "cards"), t = /* @__PURE__ */ A(() => [
						["cards", X("opt.collectionView.cards")],
						["list", X("opt.collectionView.list")],
						["archive", X("opt.collectionView.archive")]
					]);
					Z(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => M("view", e)
					});
				}
				E(n), ke(2), z((e) => W(r, `${e ?? ""} `), [() => X("lbl.view")]), U(e, t);
			}, g = (e) => {
				var t = od(), n = I(t), r = F(n), i = R(r);
				q(i), E(n), ke(2), z((e, t) => {
					Y(n, "title", e), W(r, `${t ?? ""} `), J(i, B(j).props.columns ?? 0);
				}, [() => X("tip.product.columns"), () => X("lbl.columns")]), V("change", i, (e) => M("columns", Number(e.target.value))), U(e, t);
			}, _ = (e) => {
				var t = rd(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.variant ?? "button"), t = /* @__PURE__ */ A(() => [["button", X("opt.cart.button")], ["icon", X("opt.cart.icon")]]);
					Z(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => M("variant", e)
					});
				}
				E(n), ke(2), z((e) => W(r, `${e ?? ""} `), [() => X("lbl.view")]), U(e, t);
			}, v = (e) => {
				var t = ld(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.view ?? "grid"), t = /* @__PURE__ */ A(() => [
						["grid", X("opt.galleryView.grid")],
						["carousel", X("opt.galleryView.carousel")],
						["slides", X("opt.galleryView.slides")]
					]);
					Z(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => M("view", e)
					});
				}
				E(n);
				var a = R(n, 2), o = (e) => {
					var t = sd(), n = I(t), r = F(n), i = R(r);
					q(i), E(n);
					var a = R(n, 2), o = F(a), s = L(R(o));
					E(a);
					var c = R(a, 2);
					q(c), z((e, t) => {
						W(r, `${e ?? ""} `), J(i, B(j).props.columns ?? 3), W(o, `${t ?? ""} `), W(s, `${B(j).props.gap ?? 12 ?? ""} px`), J(c, B(j).props.gap ?? 12);
					}, [() => X("lbl.columns"), () => X("lbl.imageGap")]), V("change", i, (e) => M("columns", Number(e.target.value))), V("input", c, (e) => M("gap", Number(e.target.value))), U(e, t);
				};
				G(a, (e) => {
					(B(j).props.view ?? "grid") === "grid" && e(o);
				});
				var s = R(a, 2), c = (e) => {
					var t = cd(), n = F(t), r = R(n);
					q(r), E(t), z((e) => {
						W(n, `${e ?? ""} `), J(r, B(j).props.interval ?? 5);
					}, [() => X("lbl.secondsPerImage")]), V("change", r, (e) => M("interval", Number(e.target.value))), U(e, t);
				};
				G(s, (e) => {
					B(j).props.view === "slides" && e(c);
				});
				var l = R(s, 2), u = F(l), d = R(u);
				{
					let e = /* @__PURE__ */ A(() => B(j).props.radius ?? ""), t = /* @__PURE__ */ A(() => [
						["", X("common.none")],
						["sm", X("opt.size.sm")],
						["md", X("opt.radius.md")]
					]);
					Z(d, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => M("radius", e || null)
					});
				}
				E(l);
				var f = R(l, 2), p = F(f);
				q(p);
				var m = R(p);
				E(f), ke(2), z((e, t, n, i) => {
					W(r, `${e ?? ""} `), W(u, `${t ?? ""} `), Y(f, "title", n), Ci(p, B(j).props.lightbox !== !1), W(m, ` ${i ?? ""}`);
				}, [
					() => X("lbl.view"),
					() => X("lbl.radius"),
					() => X("tip.lightbox"),
					() => X("lbl.lightbox")
				]), V("change", p, (e) => M("lightbox", e.target.checked)), U(e, t);
			}, y = (e) => {
				var t = ud(), n = I(t), r = F(n);
				Z(R(r), {
					get value() {
						return B(j).props.color;
					},
					get options() {
						return On;
					},
					onchange: (e) => M("color", e)
				}), E(n);
				var i = R(n, 2), a = F(i), o = R(a);
				q(o), E(i);
				var s = R(i, 2), c = F(s);
				q(c);
				var l = R(c);
				E(s), ke(2), z((e, t, n, i, u) => {
					W(r, `${e ?? ""} `), W(a, `${t ?? ""} `), J(o, B(j).props.thickness), Y(s, "title", n), Ci(c, i), W(l, ` ${u ?? ""}`);
				}, [
					() => X("lbl.color"),
					() => X("lbl.thickness"),
					() => X("tip.shape.fill"),
					() => !!B(j).props.fill,
					() => X("lbl.filled")
				]), V("change", o, (e) => M("thickness", Number(e.target.value))), V("change", c, (e) => M("fill", e.target.checked ? B(j).props.color : null)), U(e, t);
			};
			G(n, (e) => {
				B(j).type === "text" ? e(r) : B(j).type === "faq" ? e(a, 1) : B(j).type === "timeline" ? e(o, 2) : B(j).type === "quote" ? e(s, 3) : B(j).type === "stats" ? e(c, 4) : B(j).type === "table" ? e(l, 5) : B(j).type === "share" ? e(u, 6) : B(j).type === "countdown" ? e(d, 7) : B(j).type === "button" ? e(f, 8) : B(j).type === "image" ? e(p, 9) : B(j).type === "icon" ? e(m, 10) : B(j).type === "collection" ? e(h, 11) : B(j).type === "product" ? e(g, 12) : B(j).type === "cart" ? e(_, 13) : B(j).type === "gallery" ? e(v, 14) : B(j).type === "shape" && e(y, 15);
			});
			var b = R(n, 2), x = F(b), S = R(x);
			{
				let e = /* @__PURE__ */ A(() => B(j).fit === "shrink" ? "shrink" : "wrap"), t = /* @__PURE__ */ A(() => Vt.has(B(j).type) ? [["wrap", X("opt.fit.fluid")], ["shrink", X("opt.fit.floor")]] : [["wrap", X("opt.fit.wrap")], ["shrink", X("opt.fit.shrink")]]);
				Z(S, {
					get value() {
						return B(e);
					},
					get options() {
						return B(t);
					},
					onchange: (e) => Ht(e)
				});
			}
			E(b);
			var C = R(b, 2), ee = (e) => {
				var t = dd(), n = F(t), r = L(n, !0), i = R(n, 2);
				q(i);
				var a = L(R(i, 2));
				E(t), z((e, n, o, s) => {
					Y(t, "title", e), W(r, n), J(i, o), W(a, `${s ?? ""} %`);
				}, [
					() => X("tip.fitMin"),
					() => X("lbl.fitMin"),
					() => Math.round((B(j).fitMin ?? .6) * 100),
					() => Math.round((B(j).fitMin ?? .6) * 100)
				]), V("input", i, (e) => Ut(e.target.valueAsNumber / 100)), U(e, t);
			};
			G(C, (e) => {
				B(j).fit === "shrink" && e(ee);
			});
			var w = R(C, 4), te = F(w), T = R(te);
			{
				let e = /* @__PURE__ */ A(() => Br(B(j).animation) ? B(j).animation.type : "");
				Z(T, {
					get value() {
						return B(e);
					},
					get options() {
						return Hr;
					},
					onchange: (e) => Kr(e || null)
				});
			}
			E(w);
			var ne = R(w, 2), re = (e) => {
				var t = fd(), n = I(t), r = F(n), i = R(r);
				q(i), E(n);
				var a = R(n, 2), o = F(a), s = R(o);
				q(s), E(a), z((e, t) => {
					W(r, `${e ?? ""} `), J(i, B(j).animation.props.duration), W(o, `${t ?? ""} `), J(s, B(j).animation.props.delay);
				}, [() => X("lbl.durationMs"), () => X("lbl.delayMs")]), V("change", i, (e) => Jr("duration", Number(e.target.value))), V("change", s, (e) => Jr("delay", Number(e.target.value))), U(e, t);
			}, ie = /* @__PURE__ */ A(() => Br(B(j).animation));
			G(ne, (e) => {
				B(ie) && e(re);
			});
			var ae = R(ne, 2), oe = F(ae), se = R(oe);
			{
				let e = /* @__PURE__ */ A(() => B(j).hover?.type ?? (B(j).animation && !Br(B(j).animation) ? B(j).animation.type : ""));
				Z(se, {
					get value() {
						return B(e);
					},
					get options() {
						return Ur;
					},
					onchange: (e) => qr(e || null)
				});
			}
			E(ae);
			var ce = R(ae, 2), le = (e) => {
				var t = hd(), n = R(I(t), 2), r = F(n);
				q(r);
				var i = R(r);
				E(n);
				var a = R(n, 2), o = (e) => {
					var t = md(), n = I(t), r = F(n), i = R(r);
					{
						let e = /* @__PURE__ */ A(() => B(j).sticky.mode ?? "scroll"), t = /* @__PURE__ */ A(() => [["scroll", X("opt.sticky.modeScroll")], ["screen", X("opt.sticky.modeScreen")]]);
						Z(i, {
							get value() {
								return B(e);
							},
							get options() {
								return B(t);
							},
							onchange: (e) => zt(`edit:${B(j).blockId}`, (t) => {
								t.sticky = {
									...t.sticky,
									mode: e
								};
							})
						});
					}
					E(n);
					var a = R(n, 2), o = (e) => {
						var t = pd(), n = F(t), r = R(n);
						q(r), E(t), z((e, i) => {
							Y(t, "title", e), W(n, `${i ?? ""} `), J(r, B(j).sticky.offset ?? 16);
						}, [() => B(j).sticky.mode === "screen" ? X("tip.stickyEdge") : X("tip.stickyOffset"), () => B(j).sticky.mode === "screen" ? X("lbl.stickyEdge") : X("lbl.stickyOffset")]), V("change", r, (e) => zt(`edit:${B(j).blockId}`, (t) => {
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
						var t = lu(), n = F(t), r = R(n);
						{
							let e = /* @__PURE__ */ A(() => B(j).sticky.dock ?? "bottom-right"), t = /* @__PURE__ */ A(() => It.map(([e, t]) => [e, X(t)]));
							Z(r, {
								get value() {
									return B(e);
								},
								get options() {
									return B(t);
								},
								onchange: (e) => zt(`edit:${B(j).blockId}`, (t) => {
									t.sticky = {
										...t.sticky,
										dock: e
									};
								})
							});
						}
						E(t), z((e, r) => {
							Y(t, "title", e), W(n, `${r ?? ""} `);
						}, [() => X("tip.stickyDock"), () => X("lbl.stickyDock")]), U(e, t);
					}, l = (e) => {
						var t = lu(), n = F(t), r = R(n);
						{
							let e = /* @__PURE__ */ A(() => B(j).sticky.until ?? ""), t = /* @__PURE__ */ A(Lt);
							Z(r, {
								get value() {
									return B(e);
								},
								get options() {
									return B(t);
								},
								onchange: (e) => zt(`edit:${B(j).blockId}`, (t) => {
									t.sticky = {
										...t.sticky,
										until: e || null
									};
								})
							});
						}
						E(t), z((e, r) => {
							Y(t, "title", e), W(n, `${r ?? ""} `);
						}, [() => X("tip.stickyUntil"), () => X("lbl.stickyUntil")]), U(e, t);
					};
					G(s, (e) => {
						B(j).sticky.mode === "screen" ? e(c) : e(l, -1);
					}), z((e, t) => {
						Y(n, "title", e), W(r, `${t ?? ""} `);
					}, [() => X("tip.stickyMode"), () => X("lbl.stickyMode")]), U(e, t);
				};
				G(a, (e) => {
					B(j).sticky && e(o);
				}), z((e, t, a) => {
					Y(n, "title", e), Ci(r, t), W(i, ` ${a ?? ""}`);
				}, [
					() => X("tip.sticky"),
					() => !!B(j).sticky,
					() => X("lbl.sticky")
				]), V("change", r, (e) => zt(`edit:${B(j).blockId}`, (t) => {
					t.sticky = e.target.checked ? {
						offset: 16,
						until: null
					} : null;
				})), U(e, t);
			};
			G(ce, (e) => {
				B(me) === "desktop" && e(le);
			});
			var ue = R(ce, 4), de = F(ue), fe = L(de, !0), pe = R(de, 2), he = F(pe), ge = (e) => {
				var t = gd(), n = F(t), r = F(n, !0), i = R(r);
				q(i), E(n);
				var a = R(n, 2), o = F(a, !0), s = R(o);
				q(s), E(a);
				var c = R(a, 2), l = F(c, !0), u = R(l);
				q(u), E(c);
				var d = R(c, 2), f = F(d, !0), p = R(f);
				q(p), E(d);
				var m = R(d, 2), h = F(m, !0), g = R(h);
				q(g), E(m);
				var _ = R(m, 2), v = F(_, !0), y = R(v);
				q(y), E(_), E(t), z((e, t, n, a, c, d, _) => {
					W(r, e), J(i, B(j).frame.x), W(o, t), J(s, B(j).frame.y), W(l, n), J(u, B(j).frame.w), W(f, a), J(p, B(j).frame.h), Y(m, "title", c), W(h, d), J(g, B(j).frame.z ?? 1), W(v, _), J(y, B(j).frame.rot ?? 0);
				}, [
					() => X("frame.x"),
					() => X("frame.y"),
					() => X("frame.w"),
					() => X("frame.h"),
					() => X("tip.frameZ"),
					() => X("frame.z"),
					() => X("frame.rot")
				]), V("change", i, (e) => Xt("x", Number(e.target.value))), V("change", s, (e) => Xt("y", Number(e.target.value))), V("change", u, (e) => Xt("w", Number(e.target.value))), V("change", p, (e) => Xt("h", Number(e.target.value))), V("change", g, (e) => Xt("z", Number(e.target.value))), V("change", y, (e) => Xt("rot", Number(e.target.value))), U(e, t);
			};
			G(he, (e) => {
				B(me) === "desktop" && e(ge);
			});
			var _e = R(he, 2), ve = F(_e);
			q(ve);
			var ye = R(ve);
			E(_e);
			var be = R(_e, 2), xe = F(be);
			q(xe);
			var Se = R(xe);
			E(be), E(pe), E(ue), z((e, t, n, r, i, a, o, s, c, l, u, d) => {
				Y(b, "title", e), W(x, `${t ?? ""} `), Y(w, "title", n), W(te, `${r ?? ""} `), Y(ae, "title", i), W(oe, `${a ?? ""} `), Y(de, "title", o), W(fe, s), Y(_e, "title", c), Ci(ve, B(j).hideMobile), W(ye, ` ${l ?? ""}`), Y(be, "title", u), Ci(xe, B(j).decor), W(Se, ` ${d ?? ""}`);
			}, [
				() => X("tip.fit"),
				() => X("lbl.fit"),
				() => X("tip.props.blockAnim"),
				() => X("lbl.animIn"),
				() => X("tip.props.blockHover"),
				() => X("lbl.onHover"),
				() => X("hint.placement"),
				() => X("group.placement"),
				() => X("tip.hideMobile"),
				() => X("lbl.hideMobile"),
				() => X("tip.decor"),
				() => X("lbl.decor")
			]), V("change", ve, (e) => Cn(e.target.checked)), V("change", xe, (e) => vn(e.target.checked)), U(e, t);
		};
		G(f, (e) => {
			B(qt) === "content" ? e(p) : e(m, -1);
		}), z((e, t) => {
			o = gi(a, 1, "svelte-1n46o8q", null, o, { on: B(qt) === "content" }), W(s, e), u = gi(l, 1, "svelte-1n46o8q", null, u, { on: B(qt) === "style" }), W(d, t);
		}, [() => X("props.tabContent"), () => X("props.tabStyle")]), V("click", a, () => P(qt, "content")), V("click", l, () => P(qt, "style")), U(e, t);
	}, o = [
		["color", Bc],
		["gradient", Qc],
		["glow", $c],
		["image", Tl],
		["slideshow", Al],
		["video", Il],
		["grain", tl]
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
		foldToggle: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path class=\"ft-top\" d=\"M7 9l5-5 5 5\"/><path class=\"ft-bot\" d=\"M7 15l5 5 5-5\"/></svg>",
		caret: "<svg width=\"9\" height=\"9\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6 9l6 6 6-6\"/></svg>",
		external: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14 4h6v6\"/><path d=\"M20 4l-8 8\"/><path d=\"M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5\"/></svg>",
		device_desktop: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2\" y=\"3\" width=\"20\" height=\"13\" rx=\"2\"/><path d=\"M8 21h8M12 16v5\"/></svg>",
		device_laptop: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"4\" y=\"4\" width=\"16\" height=\"11\" rx=\"1.5\"/><path d=\"M2 19h20\"/></svg>",
		device_tablet: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"5\" y=\"2\" width=\"14\" height=\"20\" rx=\"2\"/><path d=\"M11 18.5h2\"/></svg>",
		device_mobile: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"7\" y=\"2\" width=\"10\" height=\"20\" rx=\"2\"/><path d=\"M11 18.5h2\"/></svg>"
	}, l = [
		["purple", X("adminTheme.purple")],
		["well", X("adminTheme.well")],
		["gold", X("adminTheme.gold")],
		["grey", X("adminTheme.grey")],
		["aurora", X("adminTheme.aurora")],
		["dusk", X("adminTheme.dusk")],
		["ember", X("adminTheme.ember")]
	], u = {
		lilla: "purple",
		bronn: "well",
		gull: "gold",
		graa: "grey",
		nordlys: "aurora",
		skumring: "dusk",
		glo: "ember"
	}, d = /* @__PURE__ */ N(en((() => {
		let e = localStorage.getItem("urd-admin-theme");
		return u[e] ?? e ?? "grey";
	})()));
	xn(() => {
		document.documentElement.dataset.adminTheme = B(d), localStorage.setItem("urd-admin-theme", B(d)), p();
	});
	function p() {
		let e = getComputedStyle(document.documentElement), t = e.getPropertyValue("--urd-color-accent").trim();
		O?.sendAdminTheme({
			bg: e.getPropertyValue("--urd-color-bg").trim(),
			surface: e.getPropertyValue("--urd-color-surface").trim(),
			accent: t,
			text: e.getPropertyValue("--urd-color-text").trim(),
			"accent-text": m(t)
		});
	}
	function m(e) {
		return Rc(e) == null || (zc(e, "#ffffff") ?? 0) >= (zc(e, "#0b0e14") ?? 0) ? "#ffffff" : "#0b0e14";
	}
	let g = /* @__PURE__ */ N(null), _ = /* @__PURE__ */ N(null), v = /* @__PURE__ */ N(!1), y = /* @__PURE__ */ N(""), b = /* @__PURE__ */ N("info"), x = 0;
	function S(e, t = "info") {
		P(y, e, !0), P(b, t, !0);
		let n = ++x;
		t === "ok" && setTimeout(() => {
			x === n && (P(y, ""), P(b, "info"));
		}, 8e3);
	}
	function C() {
		S(X("status.storageFull"), "error");
	}
	function ee(e, t) {
		try {
			localStorage.setItem(e, t);
		} catch {
			C();
		}
	}
	let w = /* @__PURE__ */ N(null), te = /* @__PURE__ */ N(null), T = /* @__PURE__ */ N(en({
		size: 16,
		snap: !0
	})), ne = /* @__PURE__ */ N(!0), re = /* @__PURE__ */ N(en(mo(typeof window < "u" ? window : null) ?? 1920)), ie = "urd-admin-screen";
	function ae() {
		let e = null;
		try {
			e = JSON.parse(localStorage.getItem(ie) ?? "null");
		} catch {
			e = null;
		}
		return ho(e, B(re));
	}
	let oe = /* @__PURE__ */ N(en(ae()));
	function se(e) {
		P(oe, ho({
			...We(B(oe)),
			...e
		}, B(re)), !0);
		try {
			localStorage.setItem(ie, JSON.stringify(B(oe)));
		} catch {}
	}
	let ce = /* @__PURE__ */ A(() => go(B(oe), B(re))), le = [
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
	], ue = /* @__PURE__ */ A(() => [{
		id: "desktop",
		width: B(ce).width,
		height: B(ce).height || null,
		viewport: "desktop"
	}, ...le]);
	function de(e) {
		let t = wo(B(Ga), B(Ka), e.width).width;
		return X(e.id === "desktop" ? B(oe).mode === "own" ? "tip.view.desktop" : e.height ? "tip.view.desktopSizeH" : "tip.view.desktopSize" : `tip.view.${e.id}`, {
			w: e.width,
			h: e.height ?? 0,
			c: t
		});
	}
	let fe = /* @__PURE__ */ N("desktop"), pe = /* @__PURE__ */ A(() => B(ue).find((e) => e.id === B(fe)) ?? B(ue)[0]), me = /* @__PURE__ */ A(() => B(pe).viewport === "mobile" || B(pe).width <= (B(k)?.breakpoints?.mobile ?? 640) ? "mobile" : "desktop"), he = /* @__PURE__ */ N(null), ge = /* @__PURE__ */ N(0), _e = /* @__PURE__ */ N(0), ve = /* @__PURE__ */ N("fit"), ye = /* @__PURE__ */ N(1), be = /* @__PURE__ */ A(() => Co(B(Ga), B(Ka))), xe = /* @__PURE__ */ A(() => B(pe).width), Se = /* @__PURE__ */ A(() => B(pe).height ?? 0), Ce = /* @__PURE__ */ A(() => B(ve) === "manual" ? B(ye) : oo(B(ge), B(xe), "fit", B(_e), B(Se)));
	function we(e) {
		let t = Math.min(400, Math.max(10, (Math.round(Math.round(B(Ce) * 100) / 10) + e) * 10));
		P(ye, t / 100), P(ve, "manual");
	}
	let Te = /* @__PURE__ */ A(() => B(Se) > 0 ? B(Se) : B(Ce) > 0 ? B(_e) / B(Ce) : B(_e)), Ee = /* @__PURE__ */ A(() => B(xe) * B(Ce)), De = /* @__PURE__ */ A(() => B(Se) > 0 ? B(Se) * B(Ce) : B(_e)), Oe = /* @__PURE__ */ A(() => B(Ee) > B(ge) + 1 || B(De) > B(_e) + 1);
	xn(() => {
		let e = () => O?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), xn(() => {
		let e = B(me);
		O?.sendViewport(e);
	}), xn(() => {
		let e = B(Ce);
		O?.sendZoom(e);
	}), xn(() => {
		let e = () => {
			P(re, mo(window) ?? B(re), !0);
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}), xn(() => {
		let e = B(he);
		if (!e || typeof ResizeObserver > "u") return;
		let t = () => {
			P(ge, e.clientWidth, !0), P(_e, e.clientHeight, !0);
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	});
	let Ae = /* @__PURE__ */ N(0);
	function je() {
		P(Ae, D?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function Me() {
		let e = D?.data.sections.find((e) => e.responsive?.mobile?.attention?.needed);
		P(fe, "mobile"), e && setTimeout(() => O?.sendScrollSection(e.id), 0);
	}
	function Ne(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			qe("layout");
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
			}, Fe(t, "layout-changed"), e.sectionId === B(kn) && P(jn, e.minHeight, !0), B(j)?.sectionId === e.sectionId && Mt(), D.save(), Ve(), O?.sendSection(B(_), t);
		}
	}
	function Pe(e) {
		return e?.blocks?.some((e) => e.frames?.mobile) ?? !1;
	}
	function Fe(e, t) {
		!e || !Pe(e) || e.responsive?.mobile?.attention?.needed || (e.responsive = {
			...e.responsive ?? {},
			mobile: {
				...e.responsive?.mobile ?? { mode: "auto" },
				attention: {
					needed: !0,
					reason: t,
					since: (/* @__PURE__ */ new Date()).toISOString()
				}
			}
		}, je(), O?.sendAttention(e.id, !0));
	}
	let D = null, Ie = null, O = null, k = /* @__PURE__ */ N(null);
	function Le() {
		P(k, Ie.data, !0), Ie.replace(B(k));
	}
	function Re() {
		O?.sendSite(We(B(k)));
	}
	let ze = /* @__PURE__ */ new Set(), Be = () => B(k).pages.find((e) => e.id === B(_));
	function Ve() {
		let e = B(k)?.pages?.some((e) => !ze.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = hs?.hasDraft() || Object.values(Q).some((e) => e.hasDraft()), n = Cs?.hasDraft() || Object.values(ws).some((e) => e.hasDraft());
		P(v, e || D?.hasDraft() && !ze.has(B(_)) || Ie?.hasDraft() || pc?.hasDraft() || t || n || !1, !0);
	}
	let He = [], Ue = [], Ge = null;
	function Ke() {
		return JSON.stringify({
			pageId: B(_),
			page: D.data,
			site: Ie.data,
			collectionsIndex: gs ? hs.data : null,
			collections: gs ? Object.fromEntries(Object.entries(Q).map(([e, t]) => [e, t.data])) : {},
			templatesIndex: Es ? Cs.data : null,
			templates: Es ? Object.fromEntries(Object.entries(ws).map(([e, t]) => [e, t.data])) : {},
			plugins: pc?.data ?? null
		});
	}
	function qe(e) {
		e === Ge && (e.startsWith("edit:") || e.startsWith("grid:")) || (He.push(Ke()), He.length > 50 && He.shift(), Ue.length = 0, Ge = e);
	}
	function Xe(e) {
		let { pageId: t, page: n, site: r, collectionsIndex: i, collections: a, templatesIndex: o, templates: s, plugins: c } = JSON.parse(e);
		if (Ie.replace(r), Le(), Ie.save(), P(T, {
			snap: !0,
			...B(k).grid
		}, !0), Re(), Ze(i, a ?? {}), Qe(o, s ?? {}), $e(c), t && t !== B(_) && B(k).pages.some((e) => e.id === t)) {
			ee(`urd-draft-${t}`, JSON.stringify(n)), Fi(t, { keepHistory: !0 }), Ve();
			return;
		}
		D.replace(n), D.save(), Ve(), je(), Mt(), In(D.data.sections.find((e) => e.id === B(kn))), B(k).pages.some((e) => e.id === B(_)) ? O?.sendPage(B(_), D.data) : Fi(B(k).pages[0].id, { keepHistory: !0 });
	}
	function Ze(e, t) {
		if (!(!hs || !e) && JSON.stringify({
			index: hs.data,
			collections: Object.fromEntries(Object.entries(Q).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			collections: t
		})) {
			hs.replace(e), hs.save();
			for (let e of Object.keys(Q)) e in t || (localStorage.removeItem(`urd-draft-collection-${e}`), localStorage.removeItem(`urd-draft-samling-${e}`), delete Q[e]);
			for (let [e, n] of Object.entries(t)) {
				if (!Q[e]) {
					let t = $[e] ?? null;
					Q[e] = Qi(`urd-draft-collection-${e}`, () => t, C, `urd-draft-samling-${e}`);
				}
				Q[e].replace(n), Q[e].save();
			}
			P(_s, [...e.samlinger ?? []], !0), B(ys) && !B(_s).includes(B(ys)) && P(ys, null), Is();
		}
	}
	function Qe(e, t) {
		if (!(!Cs || !e) && JSON.stringify({
			index: Cs.data,
			templates: Object.fromEntries(Object.entries(ws).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			templates: t
		})) {
			Cs.replace(e), Cs.save();
			for (let e of Object.keys(ws)) e in t || (localStorage.removeItem(`urd-draft-template-${e}`), localStorage.removeItem(`urd-draft-mal-${e}`), delete ws[e]);
			for (let [e, n] of Object.entries(t)) ws[e] || (ws[e] = Qi(`urd-draft-template-${e}`, () => Ts[e] ?? null, C, `urd-draft-mal-${e}`)), ws[e].replace(n), ws[e].save();
			P(Ds, [...e.maler ?? []], !0), Ve(), ks();
		}
	}
	function $e(e) {
		!pc || !e || JSON.stringify(pc.data) !== JSON.stringify(e) && (pc.replace(e), pc.save(), jc(), qc());
	}
	function et() {
		He.length && (Ue.push(Ke()), Xe(He.pop()), Ge = null, S(X("status.undone")));
	}
	function tt() {
		Ue.length && (He.push(Ke()), Xe(Ue.pop()), Ge = null, S(X("status.redone")));
	}
	function nt(e) {
		B(Pt) && (e.target instanceof Element && e.target.closest(".block-menu") || P(Pt, null));
	}
	function rt(e) {
		if (e.key === "Escape" && B(Pt)) {
			P(Pt, null);
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
			].includes(t.type)) || !B(j) || B(me) === "mobile") return;
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
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? tt() : et());
	}
	async function it() {
		P(g, ss(await (await fetch("/content/site.json")).json()), !0), Ie = Qi("urd-draft-site", () => B(g), C), (Ie.data.schemaVersion ?? 1) > 3 && (console.warn(`Urd: the site draft has schemaVersion ${Ie.data.schemaVersion} (the engine has 3) and is discarded`), Ie.replace(We(B(g)))), Ie.replace(ss(Ie.data)), Ie.save(), Le(), P(T, {
			snap: !0,
			...B(k).grid
		}, !0), await Fi(new URLSearchParams(location.search).get("page") ?? B(k).pages[0].id), await Hc(), await Fs(), await Os(), await ai(), B(te) && si(), B(k).site.setup === !0 && !localStorage.getItem("urd-setup-done") && (P(pt, B(k).site.title, !0), P(mt, B(k).theme.tokens.color.accent, !0), P(ht, B(k).theme.tokens.color.bg, !0), P(ft, !0));
	}
	let at = /* @__PURE__ */ N(null);
	function ot({ title: e, lines: t = [], okLabel: n = X("confirm.ok"), cancelLabel: r = X("confirm.cancel") }) {
		return new Promise((i) => {
			P(at, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function st({ title: e, lines: t = [], value: n = "", placeholder: r = "", okLabel: i = X("confirm.ok"), cancelLabel: a = X("confirm.cancel") }) {
		return new Promise((o) => {
			P(at, {
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
	function ct(e) {
		B(at)?.resolve(B(at).prompt ? e ? B(at).value : null : e), P(at, null);
	}
	let dt = !1;
	xn(() => {
		if (!B(at)) return;
		let e = (e) => {
			e.key === "Escape" && (e.stopPropagation(), ct(!1));
		};
		return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
	});
	let ft = /* @__PURE__ */ N(!1), pt = /* @__PURE__ */ N(""), mt = /* @__PURE__ */ N("#7c5cff"), ht = /* @__PURE__ */ N("#0b0e14");
	function gt() {
		localStorage.setItem("urd-setup-done", "1"), P(ft, !1);
	}
	function _t() {
		let e = B(pt).trim();
		e && (ta("setup", () => {
			B(k).site.title = e, B(k).nav.logo = {
				type: "text",
				value: e
			}, B(k).theme.tokens.color.accent = B(mt), B(k).theme.tokens.color.bg = B(ht), delete B(k).site.setup;
		}), gt(), S(X("status.setupDone"), "ok"));
	}
	let vt = /* @__PURE__ */ N(null), yt = [
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
	], bt = [
		"rail.thisPage",
		"rail.site",
		"rail.system"
	], xt = Object.fromEntries(yt.flat().map((e) => [e, X(`panel.${e}`)])), St = {
		pages: ["hint.pages.drafts"],
		blocks: ["hint.blocks.intro"],
		grid: ["hint.grid.intro", "hint.grid.section"],
		collections: ["hint.collections.intro"],
		plugins: ["hint.plugins.intro"],
		history: ["hint.history.intro"]
	}, Ct = [
		["se", "Davvisámegiella"],
		["en-GB", "English (UK)"],
		["nb", "Norsk bokmål"],
		["nn", "Norsk nynorsk"],
		["tr", "Türkçe"]
	], wt = (e) => [...e].sort((e, t) => e[1].localeCompare(t[1]));
	function Tt(e, t) {
		let n = [];
		for (let r of e) for (let e of _c[r]?.languages ?? []) e?.[t] === !0 && (typeof e.code != "string" || typeof e.name != "string" || !e.name || Ct.some(([t]) => t === e.code) || n.some(([t]) => t === e.code) || n.push([e.code, e.name]));
		return n;
	}
	function Et() {
		let e = wt([...Ct, ...Tt(B(Cc), "admin")]);
		return Ot === "auto" || e.some(([e]) => e === Ot) ? e : [[Ot, Ot], ...e];
	}
	let Dt = () => Tt(B(gc)?.enabled ?? [], "site"), Ot = localStorage.getItem("urd-admin-lang") ?? "auto";
	function kt(e) {
		e !== Ot && (e === "auto" ? localStorage.removeItem("urd-admin-lang") : localStorage.setItem("urd-admin-lang", e), location.reload());
	}
	function At(e) {
		P(vt, B(vt) === e ? null : e, !0), B(vt) === "history" && pi(), B(vt) === "update" && !B(Ti) && Oi();
	}
	let j = /* @__PURE__ */ N(null);
	function jt(e, t) {
		let n = D?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function Mt() {
		if (!B(j)) return;
		let { block: e } = jt(B(j).sectionId, B(j).blockId);
		if (!e) {
			P(j, null);
			return;
		}
		P(j, {
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
	function Nt(e) {
		if (P(Pt, null), !e.blockId) {
			P(j, null);
			return;
		}
		P(j, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), e.sectionId && P(kn, e.sectionId, !0), Mt();
	}
	let Pt = /* @__PURE__ */ N(null), Ft = window.matchMedia("(prefers-reduced-motion: reduce)").matches, It = [
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
	function Lt() {
		let e = D?.data.sections ?? [], t = e.findIndex((e) => e.id === B(j)?.sectionId);
		return [["", X("opt.sticky.ownSection")], ...e.slice(t + 1).map((e, n) => [e.id, X("opt.sticky.atSection", { n: t + 2 + n })])];
	}
	function Rt(e) {
		if (Nt(e), !B(j)) return;
		let t = B(w)?.getBoundingClientRect();
		if (!t) return;
		let n = t.left + B(Ce) * e.rect.right + 12;
		n + 300 > window.innerWidth - 8 && (n = Math.max(8, t.left + B(Ce) * e.rect.left - 300 - 12));
		let r = window.innerHeight - Math.min(window.innerHeight * .7, 560) - 8, i = Math.min(Math.max(8, t.top + B(Ce) * e.rect.top), Math.max(8, r));
		P(Pt, {
			left: n,
			top: i
		}, !0);
	}
	function zt(e, t) {
		let { section: n, block: r } = jt(B(j)?.sectionId, B(j)?.blockId);
		r && (e && qe(e), t(r, n), Fe(n, "block-edited"), D.save(), Ve(), O?.sendSection(B(_), n), Mt());
	}
	function M(e, t) {
		zt(`edit:${B(j).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function Bt(e, t) {
		zt(`edit:${B(j).blockId}:${e}`, (e) => {
			Object.assign(e.props, t);
		});
	}
	let Vt = /* @__PURE__ */ new Set([
		"image",
		"video",
		"shape",
		"icon"
	]);
	function Ht(e) {
		zt(`edit:${B(j).blockId}:fit`, (t) => {
			e === "shrink" ? (t.fit = "shrink", t.fitMin ??= .6) : (delete t.fit, delete t.fitMin);
		});
	}
	function Ut(e) {
		zt(`edit:${B(j).blockId}:fitMin`, (t) => {
			t.fitMin = e;
		});
	}
	let Wt = en({}), Gt = en({}), Kt = /* @__PURE__ */ N(!1), qt = /* @__PURE__ */ N("content"), Jt = (e, t) => (Number.isFinite(t) || (t = e.min ?? 0), e.min != null && (t = Math.max(e.min, t)), e.max != null && (t = Math.min(e.max, t)), t);
	async function Yt(e) {
		let t = B(j).blockId, n = `${t}:${e.key}`, r = (Wt[n] ?? B(j).props[e.key] ?? "").trim();
		Gt[n] = null;
		let i = r.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
		if (!r || i || /^https?:\/\//i.test(r)) {
			Bt(e.key, {
				[e.key]: r,
				lat: i ? Number(i[1]) : null,
				lon: i ? Number(i[2]) : null
			});
			return;
		}
		P(Kt, !0), Gt[n] = {
			text: X("props.place.searching"),
			err: !1
		};
		try {
			let i = await fetch(`/api/geocode?q=${encodeURIComponent(r)}`), a = await i.json().catch(() => null);
			if (B(j)?.blockId !== t) return;
			i.ok && Number.isFinite(a?.lat) ? (Bt(e.key, {
				[e.key]: r,
				lat: a.lat,
				lon: a.lon
			}), Gt[n] = null) : Gt[n] = {
				text: Wi(a) ?? X("props.place.notFound"),
				err: !0
			};
		} catch {
			Gt[n] = {
				text: X("props.place.failed"),
				err: !0
			};
		} finally {
			P(Kt, !1);
		}
	}
	function Xt(e, t) {
		Number.isFinite(t) && zt(`edit:frame-${B(j).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function Zt(e) {
		zt(`edit:${B(j).blockId}:boxStyle`, (t) => {
			let n = {
				...t.props.boxStyle ?? {},
				...e
			};
			for (let e of Object.keys(n)) n[e] ?? delete n[e];
			Object.keys(n).length ? t.props.boxStyle = n : delete t.props.boxStyle;
		});
	}
	let Qt = [
		"text",
		"email",
		"tel",
		"textarea",
		"select",
		"checkbox",
		"radio",
		"date"
	], $t = /* @__PURE__ */ new Set(["select", "radio"]), nn = () => "f" + [...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(3))].map((e) => e.toString(16).padStart(2, "0")).join("");
	function rn(e, t) {
		zt(`edit:${B(j).blockId}:field${e}`, (n) => {
			let r = {
				...n.props.fields[e],
				...t
			};
			$t.has(r.type) ? r.options ??= [] : delete r.options, n.props.fields[e] = r;
		});
	}
	function an(e, t) {
		rn(e, { options: String(t).split(",").map((e) => e.trim()).filter(Boolean) });
	}
	function on() {
		zt("form-field", (e) => {
			(e.props.fields ??= []).push({
				id: nn(),
				label: X("form.newField"),
				type: "text",
				required: !1
			});
		});
	}
	function sn(e) {
		zt("form-field", (t) => {
			t.props.fields.splice(e, 1);
		});
	}
	function cn(e, t) {
		let n = e + t;
		zt("form-field", (t) => {
			n < 0 || n >= t.props.fields.length || ([t.props.fields[e], t.props.fields[n]] = [t.props.fields[n], t.props.fields[e]]);
		});
	}
	function ln(e) {
		M("sources", String(e).split("\n").map((e) => e.trim()).filter(Boolean));
	}
	function un(e, t) {
		zt(`edit:${B(j).blockId}:faq${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function dn() {
		zt("faq-item", (e) => {
			(e.props.items ??= []).push({
				q: X("seed.faq.newQ"),
				a: X("seed.faq.answer")
			});
		});
	}
	function fn(e) {
		zt("faq-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function pn(e, t) {
		let n = e + t;
		zt("faq-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function mn(e, t) {
		zt(`edit:${B(j).blockId}:tl${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function hn() {
		zt("tl-item", (e) => {
			(e.props.items ??= []).push({
				year: "",
				title: X("seed.timeline.newTitle"),
				text: ""
			});
		});
	}
	function gn(e) {
		zt("tl-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function _n(e, t) {
		let n = e + t;
		zt("tl-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function vn(e) {
		zt("decor", (t) => {
			t.decor = e;
		});
	}
	function yn(e, t) {
		zt(`edit:${B(j).blockId}:table-form`, (n) => {
			let r = (Array.isArray(n.props.rows) && n.props.rows.length ? n.props.rows : [[""]]).map((e) => Array.isArray(e) ? e.map((e) => String(e ?? "")) : [""]), i = Math.max(1, ...r.map((e) => e.length));
			r = r.map((e) => [...e, ...Array(i - e.length).fill("")]), e > 0 ? r.push(Array(i).fill("")) : e < 0 && r.length > 1 && r.pop(), t > 0 ? r = r.map((e) => [...e, ""]) : t < 0 && i > 1 && (r = r.map((e) => e.slice(0, i - 1))), n.props.rows = r;
		});
	}
	function bn(e, t) {
		zt(`edit:${B(j).blockId}:share`, (n) => {
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
	function Sn(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		let n = new FileReader();
		n.onload = () => {
			M("src", String(n.result ?? "")), t.size > 4e5 && S(X("status.audioLarge", { kb: Math.round(t.size / 1024) }), "error");
		}, n.onerror = () => S(X("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function Cn(e) {
		let { section: t, block: n } = jt(B(j)?.sectionId, B(j)?.blockId);
		n && (qe("hide-mobile"), n.hideMobile = e, D.save(), Ve(), O?.sendSection(B(_), t), Mt());
	}
	async function wn(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await hr(t);
			zt(`edit:${B(j).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || Oa(t.name).replaceAll("-", " ");
			});
		} catch {
			S(X("status.imageReadError"), "error");
		}
	}
	async function Tn(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await hr(t);
			zt(`edit:${B(j).blockId}`, (t) => {
				t.props.image = e.dataUrl;
			});
		} catch {
			S(X("status.imageReadError"), "error");
		}
	}
	let En = {
		text: X("blocks.text"),
		button: X("blocks.button"),
		image: X("blocks.image"),
		shape: X("blocks.shape"),
		video: X("blocks.video"),
		icon: X("blocks.icon"),
		gallery: X("blocks.gallery"),
		faq: X("blocks.faq"),
		collection: X("blocks.collection"),
		timeline: X("blocks.timeline"),
		quote: X("blocks.quote"),
		stats: X("blocks.stats"),
		table: X("blocks.table"),
		share: X("blocks.share"),
		countdown: X("blocks.countdown"),
		audio: X("blocks.audio"),
		product: X("blocks.product"),
		cart: X("blocks.cart"),
		checkout: X("blocks.checkout"),
		map: X("blocks.map"),
		form: X("blocks.form"),
		calendar: X("blocks.calendar")
	}, Dn = [
		["line", X("shape.line")],
		["arrow", X("shape.arrow")],
		["circle", X("shape.circle")],
		["rect", X("shape.rect")],
		["triangle", X("shape.triangle")]
	], On = [
		["accent", X("color.accent")],
		["text", X("color.text")],
		["surface", X("color.surface")],
		["bg", X("color.bg")]
	], kn = /* @__PURE__ */ N(null), An = /* @__PURE__ */ N(null), jn = /* @__PURE__ */ N(""), Mn = /* @__PURE__ */ N(en([])), Nn = /* @__PURE__ */ N(null), Pn = /* @__PURE__ */ N(null), Fn = /* @__PURE__ */ N("");
	function In(e) {
		P(An, e?.grid ? { ...e.grid } : null, !0), P(jn, e?.size?.minHeight ?? "", !0), P(Mn, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), P(Nn, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0), P(Pn, e?.hover ? JSON.parse(JSON.stringify(e.hover)) : null, !0), P(Fn, e?.theme ?? "", !0);
	}
	let Ln = /* @__PURE__ */ N(null), Rn = en({});
	function zn() {
		try {
			let e = ((B(w)?.contentDocument)?.querySelector(`.urd-section[data-section-id="${B(kn)}"]`))?.getBoundingClientRect();
			P(Ln, e && e.width ? {
				w: e.width,
				h: e.height
			} : null, !0);
		} catch {
			P(Ln, null);
		}
	}
	xn(() => {
		B(kn), B(Mn), requestAnimationFrame(() => requestAnimationFrame(zn));
	}), xn(() => {
		let e = B(w);
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(() => zn());
		return t.observe(e), () => t.disconnect();
	}), xn(() => {
		for (let e of B(Mn)) {
			let t = e?.props?.src;
			if (e?.type === "image" && t && !Rn[t]) {
				let e = new Image();
				e.onload = () => {
					Rn[t] = {
						w: e.naturalWidth,
						h: e.naturalHeight
					};
				}, e.src = t;
			}
		}
	});
	function Bn(e) {
		Un("section-theme", (t) => {
			e ? t.theme = e : delete t.theme;
		});
	}
	function Vn(e) {
		let t = B(jr), n = (e) => e.replaceAll("var(--urd-base-bg)", t.bg).replaceAll("var(--urd-base-surface)", t.surface).replaceAll("var(--urd-base-text)", t.text).replaceAll("var(--urd-base-accent)", t.accent).replaceAll("var(--urd-base-accent-text)", t["accent-text"] ?? m(hm(t.accent ?? "#000000", t))), r = Lc(e);
		return {
			bg: r["--urd-color-bg"] ? n(r["--urd-color-bg"]) : t.bg,
			surface: r["--urd-color-surface"] ? n(r["--urd-color-surface"]) : t.surface,
			text: r["--urd-color-text"] ? n(r["--urd-color-text"]) : t.text,
			accent: r["--urd-color-accent"] ? n(r["--urd-color-accent"]) : t.accent
		};
	}
	function Hn(e) {
		P(kn, e.sectionId, !0), In(D?.data.sections.find((t) => t.id === e.sectionId));
	}
	function Un(e, t) {
		let n = D.data.sections.find((e) => e.id === B(kn));
		n && (qe(e), t(n), D.save(), Ve(), O?.sendSection(B(_), n), In(n));
	}
	let Wn = /* @__PURE__ */ N("color");
	function Gn(e, t) {
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
	function Kn(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers.splice(t, 1), e.background.layers.length || delete e.background;
		});
	}
	function qn(e, t, n) {
		let r = t + n;
		e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers;
			r < 0 || r >= n.length || ([n[t], n[r]] = [n[r], n[t]]);
		});
	}
	function Jn(e, t, n, r) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e.background.layers[t].props[n] = r;
		});
	}
	function Yn(e, t, n, r = "xy") {
		e.preventDefault();
		let i = e.currentTarget;
		i.setPointerCapture?.(e.pointerId);
		let a = (e) => {
			let a = i.getBoundingClientRect();
			if (r.includes("x")) {
				let r = Math.min(1, Math.max(0, (e.clientX - a.left) / a.width));
				Jn(t, n, "x", Math.round(r * 100) / 100);
			}
			if (r.includes("y")) {
				let r = Math.min(1, Math.max(0, (e.clientY - a.top) / a.height));
				Jn(t, n, "y", Math.round(r * 100) / 100);
			}
		};
		a(e);
		let o = () => {
			i.removeEventListener("pointermove", a), i.removeEventListener("pointerup", o), i.removeEventListener("pointercancel", o);
		};
		i.addEventListener("pointermove", a), i.addEventListener("pointerup", o), i.addEventListener("pointercancel", o);
	}
	let Xn = (e) => Math.min(4, Math.max(.1, e));
	function Zn(e, t, n, r) {
		Jn(e, t, "size", Xn(Math.round((n + r) * 100) / 100));
	}
	function Qn(e, t, n) {
		let r = Number(n);
		Number.isFinite(r) && Jn(e, t, "size", Xn(r / 100));
	}
	function $n(e, t, n, r) {
		let i = Rn[n.props.src];
		if (!i?.w || !i?.h || !B(Ln)?.w || !B(Ln)?.h) return;
		let a = B(Ln).h * i.w / (B(Ln).w * i.h), o = r === "cover" ? Math.max(1, a) : Math.min(1, a);
		(n.props.fit === "tile" || n.props.fit === "repeat") && Jn(e, t, "fit", "plain"), Jn(e, t, "size", Xn(Math.round(o * 100) / 100));
	}
	function er(e) {
		return e.props;
	}
	function tr(e, t, n, r) {
		e.mutate(n, (e) => {
			r(e.background.layers[t].props);
		});
	}
	function nr(e, t, n, r) {
		tr(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e[n] = r;
		});
	}
	let rr = {
		linear: [
			["none", X("common.none")],
			["pan", X("opt.gradAnim.pan")],
			["pan-loop", X("opt.gradAnim.panLoop")],
			["rotate", X("opt.gradAnim.rotate")]
		],
		radial: [
			["none", X("common.none")],
			["pulse", X("opt.gradAnim.pulse")],
			["orbit", X("opt.gradAnim.orbit")]
		]
	};
	function ir(e, t, n) {
		tr(e, t, e.keyPrefix, (e) => {
			e.kind = n, rr[n].some(([t]) => t === (e.animation ?? "none")) || (e.animation = "none");
		});
	}
	function ar(e, t, n, r) {
		tr(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-stop${n}`, (e) => {
			e.stops[n] = {
				...e.stops[n],
				...r
			};
		});
	}
	function or(e, t) {
		tr(e, t, e.keyPrefix, (e) => {
			let t = Math.round(e.stops.reduce((e, t) => e + (Number(t.share) || 0), 0) / e.stops.length) || 50;
			e.stops.push({
				color: e.stops[e.stops.length - 1]?.color ?? "#ffffff",
				share: t
			});
		});
	}
	function sr(e, t, n) {
		tr(e, t, e.keyPrefix, (e) => {
			e.stops.length > 2 && e.stops.splice(n, 1);
		});
	}
	function cr(e, t, n, r) {
		tr(e, t, e.keyPrefix, (e) => {
			let [t] = e.stops.splice(n, 1);
			e.stops.splice(r, 0, t);
		});
	}
	let lr = /* @__PURE__ */ N(null);
	function ur(e, t, n, r) {
		if (t.button !== 0) return;
		t.preventDefault();
		let i = t.currentTarget.closest(".bg-layer"), a = t.currentTarget.closest(".grad-stop");
		P(lr, {
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
			P(lr, {
				...B(lr),
				insert: n
			}, !0);
		}, u = () => {
			window.removeEventListener("pointermove", l), window.removeEventListener("pointerup", u), c.remove();
			let t = B(lr);
			if (P(lr, null), !t) return;
			let n = t.insert > t.from ? t.insert - 1 : t.insert;
			n !== t.from && cr(e, t.layer, t.from, n);
		};
		window.addEventListener("pointermove", l), window.addEventListener("pointerup", u);
	}
	function dr(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].type !== n && (e.background.layers[t] = {
				type: n,
				version: s[n].version ?? 1,
				props: s[n].defaults()
			});
		});
	}
	async function fr(e, t) {
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
	async function mr(e) {
		let t = await e.text(), n = wa(t), r = Ea(t);
		if (!r) return n;
		let i = await fr(n.dataUrl, r);
		if (!i) return n;
		let a = Ta(t, i);
		if (a === t) return n;
		try {
			return wa(a);
		} catch {
			return n;
		}
	}
	async function hr(e) {
		return e.type === "image/svg+xml" || /\.svg$/i.test(e.name || "") ? mr(e) : xa(e);
	}
	async function gr(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			Jn(e, t, "src", (await hr(r)).dataUrl);
		} catch {
			S(X("status.imageReadError"), "error");
		}
	}
	function _r(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", !r) return;
		if (!["video/mp4", "video/webm"].includes(r.type)) {
			S(X("status.videoFormat"), "error");
			return;
		}
		if (r.size > 15e6) {
			S(X("status.videoTooLarge", {
				mb: (r.size / 1e6).toFixed(1),
				max: Math.round(ba / 1e6)
			}), "error");
			return;
		}
		let i = new FileReader();
		i.onload = () => {
			Jn(e, t, "src", String(i.result ?? "")), r.size > 4e6 && S(X("status.videoLarge", { mb: (r.size / 1e6).toFixed(1) }), "error");
		}, i.onerror = () => S(X("status.imageReadError"), "error"), i.readAsDataURL(r);
	}
	async function vr(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			Jn(e, t, "poster", (await hr(r)).dataUrl);
		} catch {
			S(X("status.imageReadError"), "error");
		}
	}
	async function yr(e, t, n) {
		let r = [...n.target.files ?? []];
		if (n.target.value = "", !r.length) return;
		S(X("status.compressingImages"));
		let { images: i, failed: a, big: o } = await Jm(r);
		i.length && e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers[t].props;
			n.images ??= [], n.images.push(...i.map(({ src: e }) => ({
				src: e,
				x: .5,
				y: .5
			})));
		}), Ym(i.length, a, o);
	}
	function br(e, t, n, r) {
		e.mutate(e.keyPrefix, (e) => {
			let i = e.background.layers[t].props.images, a = n + r;
			a < 0 || a >= i.length || ([i[n], i[a]] = [i[a], i[n]]);
		});
	}
	function xr(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].props.images.splice(n, 1);
		});
	}
	function Cr(e, t, n, r, i) {
		e.mutate(`edit:${e.keyPrefix}g-${e.keyId}-${t}-${n}-${r}`, (e) => {
			e.background.layers[t].props.images[n][r] = i;
		});
	}
	function Tr(e, t) {
		ta(e, () => {
			B(k).nav.style ??= {}, t(B(k).nav.style);
		});
	}
	let Er = /* @__PURE__ */ A(() => ({
		mutate: Un,
		keyPrefix: "bg",
		keyId: B(kn)
	})), Dr = {
		mutate: Tr,
		keyPrefix: "navbg",
		keyId: "nav"
	}, Or = {
		mutate: Zc,
		keyPrefix: "footerbg",
		keyId: "footer"
	}, kr = () => {
		let e = null;
		try {
			e = localStorage.getItem("urd-theme-mode");
		} catch {}
		return kc(B(k)?.theme?.scheme, e, window.matchMedia("(prefers-color-scheme: dark)").matches);
	}, Ar = /* @__PURE__ */ N("light");
	xn(() => {
		P(Ar, kr(), !0);
		let e = window.matchMedia("(prefers-color-scheme: dark)"), t = (e) => {
			e instanceof StorageEvent && e.key && e.key !== "urd-theme-mode" || P(Ar, kr(), !0);
		};
		return e.addEventListener("change", t), window.addEventListener("storage", t), () => {
			e.removeEventListener("change", t), window.removeEventListener("storage", t);
		};
	});
	let jr = /* @__PURE__ */ A(() => B(k)?.theme ? Ac(B(k).theme, B(Ar)).color ?? {} : {}), Mr = () => Object.entries(B(jr)), H = [
		[
			"bg",
			X("palette.bg"),
			X("palette.bgShort")
		],
		[
			"surface",
			X("palette.surface"),
			X("palette.surfaceShort")
		],
		[
			"text",
			X("palette.text"),
			X("palette.textShort")
		],
		[
			"accent",
			X("palette.accent"),
			X("palette.accentShort")
		],
		[
			"accent-text",
			X("palette.accentText"),
			X("palette.accentTextShort")
		]
	], Nr = /* @__PURE__ */ A(() => !!B(k)?.theme.alt), Fr = /* @__PURE__ */ A(() => B(k)?.theme.alt?.auto === !0), Ir = /* @__PURE__ */ A(() => B(k)?.theme.scheme === "dark" ? "dark" : "light"), Lr = /* @__PURE__ */ A(() => B(k)?.theme.tokens.color ?? {}), Rr = /* @__PURE__ */ A(() => ({
		...B(k)?.theme.tokens.color ?? {},
		...B(k)?.theme.alt?.tokens?.color ?? {}
	}));
	function zr(e) {
		return {
			type: e,
			version: Vl[e].version,
			props: Vl[e].defaults()
		};
	}
	let Br = (e) => !!(e && Vl[e.type]?.entrance), Vr = [["", X("common.none")], ...Object.entries(Vl).filter(([, e]) => e.entrance).map(([e, t]) => [e, t.labelKey ? X(t.labelKey) : t.label])], Hr = Vr.filter(([e]) => !Vl[e]?.group), Ur = [["", X("common.none")], ...Object.entries(Vl).filter(([, e]) => !e.entrance).map(([e, t]) => [e, t.labelKey ? X(t.labelKey) : t.label])];
	function Wr(e) {
		e.animation && !Br(e.animation) && (e.hover ??= e.animation, e.animation = null);
	}
	function Kr(e) {
		zt(`edit:anim-${B(j).blockId}`, (t) => {
			Wr(t), t.animation = e ? zr(e) : null;
		}), B(j) && O?.sendDemoAnim(B(j).sectionId, B(j).blockId);
	}
	function qr(e) {
		zt(`edit:hover-${B(j).blockId}`, (t) => {
			Wr(t), t.hover = e ? zr(e) : null;
		});
	}
	function Jr(e, t) {
		Number.isFinite(t) && (zt(`edit:anim-${B(j).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), B(j) && O?.sendDemoAnim(B(j).sectionId, B(j).blockId));
	}
	function Xr(e) {
		Un("section-anim", (t) => {
			Wr(t), t.animation = e ? zr(e) : null;
		}), O?.sendDemoAnim(B(kn));
	}
	function Zr(e) {
		Un("section-hover", (t) => {
			Wr(t), t.hover = e ? zr(e) : null;
		});
	}
	function Qr(e, t) {
		Number.isFinite(t) && (Un("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), O?.sendDemoAnim(B(kn)));
	}
	function $r(e, t) {
		Un("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), O?.sendDemoAnim(B(kn));
	}
	function ei(e) {
		let t = D.data.sections.find((e) => e.id === B(kn));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		qe("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, P(jn, r, !0), D.save(), Ve(), O?.sendSection(B(_), t);
	}
	function ti() {
		return D.data.sections.find((e) => e.id === B(kn)) ?? D.data.sections[0];
	}
	function ni(e) {
		let t = D.data.sections.find((e) => e.id === B(kn));
		t && (qe("grid:section"), t.grid = e ? { ...Ie.data.grid } : null, P(An, t.grid ? { ...t.grid } : null, !0), D.save(), Ve(), O?.sendSection(B(_), t), B(Xi) && O?.sendShowGrid(!0));
	}
	function ri(e, t) {
		let n = D.data.sections.find((e) => e.id === B(kn));
		n?.grid && (qe("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, P(An, { ...n.grid }, !0), D.save(), Ve(), O?.sendSection(B(_), n), B(Xi) && O?.sendShowGrid(!0));
	}
	function ii(e, t) {
		qe("grid:site"), P(T, {
			...B(T),
			[e]: t
		}, !0), Ie.data.grid = {
			...Ie.data.grid,
			[e]: t
		}, Ie.save(), Ve(), Re(), B(Xi) && O?.sendShowGrid(!0);
	}
	async function ai() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? P(te, await e.json(), !0) : e.status !== 503 && P(te, null);
		} catch {
			P(te, null);
		}
	}
	let oi = null;
	async function si() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (oi = (await e.json()).head ?? null);
		} catch {}
	}
	async function ci(e) {
		if (!oi) return await si(), {
			ok: await ot({
				title: X("confirm.conflictUnknown.title"),
				lines: [X("confirm.conflictUnknown.body"), X("confirm.conflictUnknown.warning")],
				okLabel: X("confirm.publishAnyway"),
				cancelLabel: X("confirm.cancel")
			}),
			head: oi
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${oi}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === oi) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? [X("confirm.conflict.truncated")] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await ot({
				title: X("confirm.conflict.title"),
				lines: [
					X("confirm.conflict.intro"),
					...i.map((e) => `• ${e}`),
					X("confirm.conflict.warning")
				],
				okLabel: X("confirm.publishAnyway"),
				cancelLabel: X("confirm.cancel")
			}),
			head: n
		};
	}
	let ui = /* @__PURE__ */ N(null), di = /* @__PURE__ */ N(""), fi = /* @__PURE__ */ N(!1);
	async function pi() {
		P(di, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? P(ui, (await e.json()).commits, !0) : e.status === 401 ? (P(ui, [], !0), P(di, X("status.historyLoginRequired"), !0)) : (P(ui, [], !0), P(di, Wi(await e.json().catch(() => null)) ?? X("status.historyFetchFailed"), !0));
		} catch {
			P(ui, [], !0), P(di, X("status.historyUnavailable"), !0);
		}
	}
	let mi = (() => {
		let e = {
			dateStyle: "short",
			timeStyle: "short"
		};
		try {
			return new Intl.DateTimeFormat(Gi(), e);
		} catch {
			return new Intl.DateTimeFormat(void 0, e);
		}
	})(), hi = !1;
	async function _i() {
		let e = B(ui)?.[0];
		if (!(!e || B(fi)) && await ot({
			title: X("confirm.revert.title"),
			lines: [`«${e.message}»`, X("confirm.revert.body")],
			okLabel: X("confirm.revert.ok"),
			cancelLabel: X("confirm.cancel")
		})) {
			P(fi, !0), S(X("status.reverting"));
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? oi = e : si(), hi = !0, S(X("status.revertDone"), "ok"), yi();
				} else t.status === 409 ? S(X("status.revertConflict"), "error") : S(Wi(await t.json().catch(() => null)) ?? X("status.revertFailed"), "error");
			} catch {
				S(X("status.publishLayerUnreachable"), "error");
			}
			P(fi, !1), pi();
		}
	}
	async function yi() {
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
				S(X("status.revertDeployed"), "ok");
				for (let e of Object.keys(localStorage).filter((e) => e.startsWith("urd-draft-"))) localStorage.removeItem(e);
				await new Promise((e) => setTimeout(e, 800)), location.reload();
				return;
			}
		}
		S(X("status.revertDeployTimeout"), "error");
	}
	let bi = 0;
	async function xi(e) {
		let t = ++bi, n = x, r = await co(so(e));
		t === bi && n === x && (r ? S(X("status.publishLive"), "ok") : S(X("status.publishDeployTimeout"), "error"));
	}
	let Si = /* @__PURE__ */ N(null), wi = /* @__PURE__ */ N(null), Ti = /* @__PURE__ */ N(!1), Ei = /* @__PURE__ */ N(en(/* @__PURE__ */ new Set()));
	async function Oi() {
		P(Ti, !0), P(wi, null), P(Si, null);
		try {
			let e = await fetch("/api/github/update"), t = await e.json().catch(() => null);
			e.ok ? (P(Si, t, !0), P(Ei, /* @__PURE__ */ new Set(), !0)) : P(wi, Wi(t) ?? X("update.checkFailed"), !0);
		} catch {
			P(wi, X("status.publishLayerUnreachable"), !0);
		}
		P(Ti, !1);
	}
	function ki(e) {
		let t = new Set(B(Ei));
		t.has(e) ? t.delete(e) : t.add(e), P(Ei, t, !0);
	}
	async function Ai() {
		if (!B(Si) || B(Si).upToDate || B(Ti)) return;
		let e = [...B(Ei)], t = B(Si).changes.filter((e) => !B(Ei).has(e.path)), n = t.filter((e) => e.atom && e.conflict);
		if (await ot({
			title: X("confirm.update.title"),
			lines: [X("confirm.update.body", {
				target: B(Si).target,
				writes: t.filter((e) => e.action === "write").length,
				deletes: t.filter((e) => e.action === "delete").length
			}), ...n.length > 0 ? [X("confirm.update.warnEdited", { paths: n.map((e) => e.path).join(", ") })] : []],
			okLabel: X("confirm.update.ok"),
			cancelLabel: X("confirm.cancel")
		})) {
			P(Ti, !0), S(X("update.running", { target: B(Si).target }));
			try {
				let t = await fetch("/api/github/update", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						to: B(Si).target,
						expect: B(Si).head,
						skip: e
					})
				}), n = await t.json().catch(() => null);
				t.ok ? (S(X("update.committed", { target: B(Si).target }), "ok"), await Mi(B(Si).target.replace(/^v/, ""))) : t.status === 409 ? (S(Wi(n) ?? X("update.checkFailed"), "error"), await Oi()) : S(Wi(n) ?? X("update.failed"), "error");
			} catch {
				S(X("status.publishLayerUnreachable"), "error");
			}
			P(Ti, !1);
		}
	}
	async function Mi(e) {
		for (let t = 0; t < 18; t++) {
			await new Promise((e) => setTimeout(e, 1e4));
			try {
				if ((await (await fetch("/urd.json", { cache: "no-store" })).json())?.engine === e) {
					S(X("update.deployed"), "ok"), await new Promise((e) => setTimeout(e, 800)), location.reload();
					return;
				}
			} catch {}
		}
		S(X("update.deployTimeout"), "error");
	}
	let Ni = null;
	function Pi(e) {
		return {
			schemaVersion: 4,
			meta: {
				id: e.id,
				title: e.title
			},
			sections: [{
				id: ms("sec"),
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
	async function Fi(e, { keepHistory: t = !1 } = {}) {
		P(_, e, !0), Ni = (async () => {
			let n = Be(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = cs(await e.json(), Ie.data));
			} catch {}
			r ? ze.delete(e) : r = Pi(n), D = Qi(`urd-draft-${e}`, () => r, C), (D.data.schemaVersion ?? 1) > 4 && (console.warn(`Urd: the draft for '${e}' has schemaVersion ${D.data.schemaVersion} (the engine has 4) and is discarded`), D.replace(structuredClone(r))), D.replace(cs(D.data, Ie.data)), D.save(), t || (Ge = null), P(kn, null), P(An, null), Ve(), pa(), je(), P(y, "");
		})(), await Ni;
	}
	function Ii() {
		O?.destroy(), B(w)?.contentDocument?.addEventListener("pointerdown", () => {
			B(Pt) && P(Pt, null);
		}, !0), O = io(B(w), {
			onEdit: xm,
			onMove: Sm,
			onGrow: Cm,
			onDelete: Nm,
			onAddSection: Om,
			onMoveSection: km,
			onDeleteSection: Am,
			onSectionSize: jm,
			onUndo: (e) => e.redo ? tt() : et(),
			onSelectSection: Hn,
			onSelectBlock: Nt,
			onBlockMenu: Rt,
			onReady: Li,
			onNavigate: ea,
			onAddBlock: (e) => Lm(e.sectionId, e.block),
			onAddBlocks: (e) => Rm(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: Km,
			onMoveBlockSection: Mm,
			onMobileReset: wm,
			onMobileOrder: Tm,
			onReviewDone: Em,
			onBlockFlag: Dm,
			onCollectionEdit: Ws,
			onCollectionAdd: zs,
			onSaveTemplate: As,
			onStickyGroup: Ms,
			onStickyDock: js,
			onDeleteTemplate: Ps,
			onApplyLayout: Ne,
			onPluginBlocks: (e) => {
				P(Bm, e.blocks ?? [], !0);
			},
			onNavWidth: (e) => ta("edit:nav-width", () => {
				B(k).nav.style ??= {}, B(k).nav.style.width = e.width;
			})
		});
	}
	async function Li() {
		await Ni, await hc, O?.sendPlugins(We(B(gc))?.enabled ?? []), O?.sendViewport(B(me)), O?.sendZoom(B(Ce)), Ls(), ks(), Ie.hasDraft() && Re();
		let e = !B(g).pages.some((e) => e.id === B(_));
		(D.hasDraft() || e) && O?.sendPage(B(_), D.data), B(ne) || O?.sendChrome(!1), B(Xi) && O?.sendShowGrid(!0), B(Ri) && O?.sendShowGuides(!0), p();
	}
	let Ri = /* @__PURE__ */ N(localStorage.getItem("urd-guides") === "1"), zi = /* @__PURE__ */ N(!1), Bi = /* @__PURE__ */ N(en(localStorage.getItem("urd-layout-picker") === "menu" ? "menu" : "strip"));
	function Vi(e) {
		P(Bi, e === "menu" ? "menu" : "strip", !0), B(Bi) === "menu" ? localStorage.setItem("urd-layout-picker", "menu") : localStorage.removeItem("urd-layout-picker");
	}
	let Hi = /* @__PURE__ */ N(null);
	xn(() => {
		if (!B(zi)) return;
		let e = (e) => {
			B(Hi)?.contains(e.target) || P(zi, !1);
		}, t = (e) => {
			e.key === "Escape" && P(zi, !1);
		}, n = () => {
			P(zi, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let Ui = {
		view: 1079,
		device: 999,
		zoom: 919
	}, Ki = /* @__PURE__ */ N(null), qi = /* @__PURE__ */ N(null), Ji = en({
		view: !1,
		device: !1,
		zoom: !1
	});
	xn(() => {
		let e = Object.entries(Ui).map(([e, t]) => {
			let n = window.matchMedia(`(max-width: ${t}px)`), r = () => {
				Ji[e] = n.matches;
			};
			return r(), n.addEventListener("change", r), () => n.removeEventListener("change", r);
		});
		return () => e.forEach((e) => e());
	}), xn(() => {
		B(Ki) && !Ji[B(Ki)] && P(Ki, null);
	}), xn(() => {
		if (!B(Ki)) return;
		let e = (e) => {
			B(qi)?.contains(e.target) || P(Ki, null);
		}, t = (e) => {
			e.key === "Escape" && P(Ki, null);
		}, n = () => {
			P(Ki, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	function Yi() {
		P(Ri, !B(Ri)), localStorage.setItem("urd-guides", B(Ri) ? "1" : "0"), O?.sendShowGuides(B(Ri));
	}
	let Xi = /* @__PURE__ */ N(localStorage.getItem("urd-grid-overlay") === "1");
	function $i() {
		P(Xi, !B(Xi)), localStorage.setItem("urd-grid-overlay", B(Xi) ? "1" : "0"), O?.sendShowGrid(B(Xi));
	}
	function ea(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = B(k).pages.find((e) => e.path === t);
		n && n.id !== B(_) && Fi(n.id);
	}
	function ta(e, t) {
		qe(e), t(), Ie.save(), Ve(), Re();
	}
	let na = /* @__PURE__ */ N(""), ra = /* @__PURE__ */ N(null), ia = Object.fromEntries(wc.map((e) => [e.id, Sc(Tc(e.id, {
		pageId: "preview",
		title: ""
	}))])), aa = /* @__PURE__ */ A(() => {
		let e = B(k)?.theme?.tokens?.color ?? {};
		return [
			"bg",
			"surface",
			"text",
			"accent"
		].filter((t) => typeof e[t] == "string" && Mc(e[t])).map((t) => `--urd-color-${t}: ${e[t]};`).join(" ");
	}), oa = /* @__PURE__ */ N(null);
	xn(() => {
		if (!B(oa)) return;
		let e = (e) => {
			e.target.closest?.(".page-menu-wrap") || P(oa, null);
		}, t = (e) => {
			e.key === "Escape" && P(oa, null);
		}, n = () => {
			P(oa, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let sa = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions",
		"readme"
	];
	function ca(e, t = null) {
		return e ? sa.includes(e) ? X("error.reservedName", { slug: e }) : B(k).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? X("error.pageExists") : null : X("error.pageNeedsName");
	}
	function la() {
		let e = B(na).trim(), t = Oa(e), n = ca(t);
		if (n) {
			S(n, "error");
			return;
		}
		let r = B(ra) && !B(ra).startsWith("preset:") ? ws[B(ra)]?.data?.page : null, i = B(ra)?.startsWith("preset:") ? Tc(B(ra).slice(7), {
			pageId: t,
			title: e
		}) ?? Pi({
			id: t,
			title: e
		}) : r ? Us(cs(JSON.parse(JSON.stringify(r)), Ie.data), ms, {
			id: t,
			title: e
		}) : Pi({
			id: t,
			title: e
		});
		ta("pages", () => {
			B(k).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), B(k).nav.items.push({
				label: e,
				page: t
			});
		}), ee(`urd-draft-${t}`, JSON.stringify(i)), Ve(), P(na, ""), P(ra, null), Fi(t);
	}
	async function ua(e) {
		P(oa, null), await Ns("page", e.id === B(_) ? JSON.parse(JSON.stringify(D.data)) : await Sa(e));
	}
	function da(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		ta("pages", () => {
			e.title = n;
			for (let t of B(k).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === B(_) ? (D.data.meta.title = n, D.save(), Ve(), O?.sendPage(B(_), D.data)) : Ca(e, (e) => {
			e.meta.title = n;
		});
	}
	let fa = /* @__PURE__ */ N(en({
		description: "",
		ogTitle: "",
		ogDescription: "",
		ogImage: ""
	}));
	function pa() {
		let e = D?.data?.meta ?? {};
		P(fa, {
			description: e.description ?? "",
			ogTitle: e.og?.title ?? "",
			ogDescription: e.og?.description ?? "",
			ogImage: e.og?.image ?? ""
		}, !0);
	}
	function ma(e, t) {
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
		D.save(), Ve(), pa();
		let r = B(k).pages.find((e) => e.id === B(_));
		B(_a)[B(_)] = !r?.noindex && !D.data.meta.description;
	}
	function ha(e) {
		let t = B(k).pages.find((e) => e.id === B(_));
		t && (ta("edit:page-noindex", () => {
			e ? t.noindex = !0 : delete t.noindex;
		}), B(_a)[B(_)] = !e && !D?.data?.meta?.description);
	}
	let _a = /* @__PURE__ */ N(en({}));
	async function va() {
		let e = {};
		for (let t of B(k).pages) {
			if (t.noindex) continue;
			if (t.id === B(_)) {
				e[t.id] = !D?.data?.meta?.description;
				continue;
			}
			let n = await Sa(t);
			e[t.id] = !n?.meta?.description;
		}
		P(_a, e, !0);
	}
	xn(() => {
		B(vt) === "pages" && B(_) && va();
	});
	async function ya(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			ma("ogImage", (await hr(t)).dataUrl);
		} catch {
			S(X("status.imageReadError"), "error");
		}
	}
	async function Sa(e) {
		let t = localStorage.getItem(`urd-draft-${e.id}`);
		if (t) try {
			return JSON.parse(t);
		} catch {}
		try {
			let t = await fetch(`/${e.file}`);
			if (t.ok) return cs(await t.json(), Ie.data);
		} catch {}
		return Pi(e);
	}
	async function Ca(e, t) {
		let n = await Sa(e);
		t(n), ee(`urd-draft-${e.id}`, JSON.stringify(n)), Ve();
	}
	function Aa(e, t) {
		let n = Oa(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = ca(n, e.id);
		if (r) {
			S(r, "error");
			return;
		}
		ta("pages", () => {
			e.path = `/${n}`;
		});
	}
	function ja(e) {
		e.path !== "/" && (ta("pages", () => {
			B(k).pages = B(k).pages.filter((t) => t.id !== e.id), B(k).nav.items = B(k).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of B(k).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			B(k).nav.items = B(k).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === B(_) && Fi(B(k).pages[0].id), S(X("status.pageRemoved")));
	}
	function Ma(e) {
		ta("edit:nav-logo", () => {
			B(k).nav.logo = {
				type: "text",
				value: "",
				...B(k).nav.logo,
				...e
			};
		});
	}
	function Na(e) {
		ta("nav", () => {
			B(k).nav.logo ??= {
				type: "text",
				value: B(k).site.title
			};
			let t = B(k).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = B(k).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = B(k).site.title), delete t.image), t.type = e;
		});
	}
	async function Pa(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await hr(t);
			ta("nav", () => {
				let t = B(k).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			S(X("status.imageReadErrorSvg"), "error");
		}
	}
	let Fa = /* @__PURE__ */ N(null);
	async function Ia(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		if (t.type === "image/svg+xml" || /\.svg$/i.test(t.name || "")) {
			try {
				let e = await mr(t);
				P(Fa, e.dataUrl, !0);
			} catch {
				S(X("status.imageReadErrorSvg"), "error");
			}
			return;
		}
		let n = new FileReader();
		n.onload = () => {
			P(Fa, String(n.result), !0);
		}, n.onerror = () => S(X("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function La(e) {
		ta("edit:site-icon", () => {
			B(k).site.icon = e;
		}), P(Fa, null);
	}
	function Ra() {
		ta("edit:site-icon", () => {
			delete B(k).site.icon;
		});
	}
	function za(e) {
		ta("edit:site-title", () => {
			B(k).site.title = e;
		});
	}
	function Ba(e) {
		ta("edit:site-desc", () => {
			B(k).site.description = e;
		});
	}
	function Va(e) {
		let t = String(e ?? "").trim();
		ta("edit:site-analytics", () => {
			t ? B(k).analytics = { token: t } : delete B(k).analytics;
		});
	}
	let Ga = /* @__PURE__ */ A(() => B(k)?.layout?.contentWidth ?? 1440), Ka = /* @__PURE__ */ A(() => B(k)?.layout?.gutter ?? 6), qa = /* @__PURE__ */ A(() => To(B(Ga))), Ja = /* @__PURE__ */ A(() => vo.find((e) => e.gutter === B(Ka))?.id ?? null), Ya = /* @__PURE__ */ N(!1), Xa = /* @__PURE__ */ A(() => B(Ga) === "full" ? _o : xo(B(Ga))), Za = /* @__PURE__ */ A(() => bo.map((e) => ({
		screen: e,
		...wo(B(Ga), B(Ka), e)
	})));
	function Qa(e, t) {
		ta(t, () => {
			let t = {
				...B(k).layout ?? {},
				contentWidth: B(Ga),
				gutter: B(Ka),
				...e
			};
			for (let e of Object.keys(t)) t[e] === void 0 && delete t[e];
			B(k).layout = t;
		});
	}
	let $a = (e) => Qa({ contentWidth: e === "full" ? "full" : xo(e) }, "edit:site-width"), eo = (e) => Qa({ gutter: So(e) }, "edit:site-gutter");
	function to() {
		let e = B(k).site.lang ?? "no";
		return e === "no" ? "nb" : e;
	}
	function no() {
		let e = to(), t = wt([...Ct, ...Dt()]);
		return [...t.some(([t]) => t === e) ? [] : [[e, e]], ...t];
	}
	function ao(e) {
		ta("site", () => {
			B(k).site.lang = e;
		});
	}
	let fo = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	xn(() => {
		if (!B(k)?.site) return;
		let e = B(k).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 49.6V14.4l25.6 10.4V49.6' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
				return;
			}
			fo.test(e) && (t.href = e);
		}
	});
	function po(e) {
		ta("nav", () => {
			B(k).nav.layout = e;
		});
	}
	function Fo(e, t) {
		ta(`edit:nav-style-${e}`, () => {
			B(k).nav.style ??= {}, t === void 0 ? delete B(k).nav.style[e] : B(k).nav.style[e] = t;
		});
	}
	let Lo = /* @__PURE__ */ A(() => B(k)?.nav?.variant === "side-left" || B(k)?.nav?.variant === "side-right"), Ro = /* @__PURE__ */ A(() => [
		"floating",
		"floating-square",
		"floating-tab"
	].includes(B(k)?.nav?.variant)), Uo = /* @__PURE__ */ A(() => Ho(B(k)?.nav?.style)), Wo = /* @__PURE__ */ A(() => Bo(B(k)?.nav?.style, B(k)?.nav?.variant)), Go = /* @__PURE__ */ A(() => Vo(B(k)?.nav?.style));
	function Ko(e) {
		ta("nav", () => {
			B(k).nav.style ??= {}, e === "md" ? delete B(k).nav.style.size : B(k).nav.style.size = e, delete B(k).nav.style.padY, delete B(k).nav.style.textSize;
		});
	}
	function qo(e, t, n) {
		let r = e.target.value;
		Fo(t, r === "" ? void 0 : zo(r, n, void 0)), e.target.value = B(k).nav.style?.[t] ?? "";
	}
	function Jo(e, t) {
		ta(`edit:nav-mobile-${e}`, () => {
			B(k).nav.style ??= {};
			let n = { ...B(k).nav.style.mobile ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? B(k).nav.style.mobile = n : delete B(k).nav.style.mobile;
		});
	}
	let Zo = /* @__PURE__ */ N("desktop"), Qo = /* @__PURE__ */ A(() => B(Lo) ? "desktop" : B(Zo)), $o = /* @__PURE__ */ A(() => B(k)?.nav?.style?.mobile?.padY ?? B(Wo)), es = /* @__PURE__ */ A(() => B(k)?.nav?.style?.mobile?.textSize ?? B(Go));
	function ts(e, t) {
		B(Qo) === "mobile" ? Jo(e, t) : Fo(e, t);
	}
	function ns(e, t, n) {
		let r = e.target.value, i = r === "" ? void 0 : zo(r, n, void 0);
		B(Qo) === "mobile" ? (Jo(t, i), e.target.value = B(k).nav.style?.mobile?.[t] ?? "") : (Fo(t, i), e.target.value = B(t === "padY" ? Wo : Go));
	}
	function rs(e) {
		let t = zo(e / 100, jo, .5);
		Fo("shrinkTo", t === .5 ? void 0 : t);
	}
	let is = {
		underline: [X("hoverColor.underline.label"), X("hoverColor.underline.title")],
		pill: [X("hoverColor.pill.label"), X("hoverColor.pill.title")],
		lift: [X("hoverColor.lift.label"), X("hoverColor.lift.title")]
	}, as = /* @__PURE__ */ A(() => is[B(k)?.nav?.style?.hover] ?? null);
	function os(e) {
		ta("nav", () => {
			e === "bar" ? delete B(k).nav.variant : B(k).nav.variant = e;
		});
	}
	function ls(e) {
		ta("nav", () => {
			B(k).nav.style ??= {}, e ? B(k).nav.style.glow = !0 : delete B(k).nav.style.glow;
		});
	}
	function us(e) {
		ta("nav", () => {
			B(k).nav.style ??= {}, e ? delete B(k).nav.style.topGap : B(k).nav.style.topGap = !1;
		});
	}
	function fs(e) {
		ta("nav", () => {
			B(k).nav.style ??= {}, e === "standard" ? delete B(k).nav.style.hover : B(k).nav.style.hover = e;
		});
	}
	let hs = null, Q = {}, $ = {}, gs = !1, _s = /* @__PURE__ */ N(en([])), vs = /* @__PURE__ */ N(en({})), ys = /* @__PURE__ */ N(null), bs = /* @__PURE__ */ N(""), xs = /* @__PURE__ */ N("news"), Ss = [
		["news", X("collectionKind.news")],
		["notices", X("collectionKind.notices")],
		["publications", X("collectionKind.publications")],
		["products", X("collectionKind.products")],
		["custom", X("collectionKind.custom")]
	], Cs = null, ws = {}, Ts = {}, Es = !1, Ds = /* @__PURE__ */ N(en([]));
	async function Os() {
		let e = {
			version: 1,
			maler: []
		};
		try {
			e = await (await fetch("/content/maler.json")).json();
		} catch {}
		Cs = Qi("urd-draft-templates", () => e, C, "urd-draft-maler"), P(Ds, [...Cs.data.maler ?? []], !0);
		for (let e of B(Ds)) {
			let t = null;
			try {
				t = await (await fetch(`/content/maler/${e}.json`)).json();
			} catch {}
			Ts[e] = t, ws[e] = Qi(`urd-draft-template-${e}`, () => t, C, `urd-draft-mal-${e}`), (ws[e].data?.schemaVersion ?? 1) > 1 && ws[e].reset();
		}
		Es = !0, ks();
	}
	function ks() {
		let e = B(Ds).map((e) => ws[e]?.data ? {
			id: e,
			...JSON.parse(JSON.stringify(ws[e].data))
		} : null).filter(Boolean).map(({ id: e, mal: t, section: n, blocks: r, page: i }) => ({
			id: e,
			name: t.name,
			kind: t.kind,
			section: n,
			blocks: r,
			page: i
		}));
		O?.sendTemplates(e);
	}
	function As(e) {
		let t = Vs.includes(e.kind) ? e.kind : "section";
		return Ns(t, e[t]);
	}
	function js(e) {
		let { section: t, block: n } = jt(e.sectionId, e.blockId);
		!t || !n?.sticky || It.some(([t]) => t === e.dock) && (qe(`sticky-dock:${e.blockId}`), n.sticky = {
			...n.sticky,
			dock: e.dock
		}, D.save(), Ve(), O?.sendSection(B(_), t), Mt());
	}
	function Ms(e) {
		let t = e.blockIds ?? [], { section: n } = jt(e.sectionId, t[0]);
		if (!n || !t.length) return;
		qe(`sticky-group:${e.sectionId}`);
		let r = e.on ? ms("stk") : null;
		for (let e of n.blocks) t.includes(e.id) && (e.sticky = r ? {
			offset: 16,
			until: null,
			...e.sticky,
			group: r
		} : null);
		Fe(n, "block-edited"), D.save(), Ve(), O?.sendSection(B(_), n), Mt(), S(X(e.on ? "status.stickyGrouped" : "status.stickyUngrouped"));
	}
	async function Ns(e, t) {
		if (!t || !Cs) return;
		let n = (await st({
			title: X("canvas.templateNamePrompt"),
			placeholder: X("ph.templateName")
		}))?.trim();
		if (!n) return;
		let r = Hs(n);
		if (!r) {
			S(X("status.invalidName"), "error");
			return;
		}
		if (B(Ds).includes(r)) {
			S(X("status.templateExists"), "error");
			return;
		}
		qe("templates");
		let i = {
			schemaVersion: 1,
			mal: {
				name: n,
				kind: e
			},
			[e]: t
		};
		ws[r] = Qi(`urd-draft-template-${r}`, () => null, C, `urd-draft-mal-${r}`), ws[r].replace(i), ws[r].save(), Cs.data.maler = [...B(Ds), r], Cs.save(), P(Ds, [...B(Ds), r], !0), S(X("status.templateSaved", { name: n }), "ok"), Ve(), ks();
	}
	async function Ps(e) {
		let t = ws[e.id]?.data?.mal;
		t && await ot({ title: X("confirm.deleteTemplate", { name: t.name }) }) && (qe("templates"), B(ra) === e.id && P(ra, null), localStorage.removeItem(`urd-draft-template-${e.id}`), localStorage.removeItem(`urd-draft-mal-${e.id}`), delete ws[e.id], Cs.data.maler = B(Ds).filter((t) => t !== e.id), Cs.save(), P(Ds, B(Ds).filter((t) => t !== e.id), !0), Ve(), ks());
	}
	async function Fs() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/collections.json")).json();
		} catch {}
		hs = Qi("urd-draft-collections", () => e, C, "urd-draft-samlinger"), P(_s, [...hs.data.samlinger ?? []], !0);
		for (let e of B(_s)) {
			let t = null;
			try {
				t = await (await fetch(`/content/samlinger/${e}.json`)).json();
			} catch {}
			$[e] = t, Q[e] = Qi(`urd-draft-collection-${e}`, () => t, C, `urd-draft-samling-${e}`), !t && !Q[e].data && (Q[e].replace({
				schemaVersion: 1,
				id: e,
				name: e,
				kind: "custom",
				entries: []
			}), Q[e].save());
		}
		gs = !0, Is();
	}
	function Is(e = !0) {
		let t = {};
		for (let e of B(_s)) Q[e] && (t[e] = JSON.parse(JSON.stringify(Q[e].data)));
		P(vs, t, !0), e && Ls();
	}
	function Ls() {
		O?.sendCollections(We(B(vs)) ?? {});
	}
	function Rs(e, t, n, r = !0) {
		let i = Q[e];
		i && (qe(t), n(i.data), i.save(), Ve(), Is(r));
	}
	function zs(e) {
		Q[e.collection] && Zs(e.collection);
	}
	function Bs(e) {
		return (new DOMParser().parseFromString(String(e ?? ""), "text/html").body.textContent ?? "").trim();
	}
	function Ws(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r === "title" && !Bs(i) || Rs(t, `edit:collection:${t}:${n}:${r}`, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image"));
	}
	function Gs(e, t, n) {
		let r = {
			schemaVersion: 1,
			id: e,
			name: t,
			kind: n,
			entries: []
		};
		Q[e] = Qi(`urd-draft-collection-${e}`, () => null, C, `urd-draft-samling-${e}`), Q[e].replace(r), Q[e].save(), hs.data.samlinger = [...B(_s), e], hs.save(), P(_s, [...B(_s), e], !0), P(ys, e, !0), Ve(), Is();
	}
	function Ks() {
		let e = B(bs).trim();
		if (!e) return;
		let t = Oa(e);
		if (!t || B(_s).includes(t)) {
			S(X(t ? "status.collectionExists" : "status.invalidName"), "error");
			return;
		}
		qe("collections"), Gs(t, e, B(xs)), P(bs, "");
	}
	function Js() {
		let e = X("seed.productCatalogName"), t = Oa(e) || "collection", n = t;
		for (let e = 2; B(_s).includes(n); e += 1) n = `${t}-${e}`;
		qe("collections"), Gs(n, e, "products"), zt(null, (e) => {
			e.props.collection = n;
		});
	}
	function Ys(e) {
		qe("collections"), localStorage.removeItem(`urd-draft-collection-${e}`), localStorage.removeItem(`urd-draft-samling-${e}`), delete Q[e], hs.data.samlinger = B(_s).filter((t) => t !== e), hs.save(), P(_s, B(_s).filter((t) => t !== e), !0), B(ys) === e && P(ys, null), Ve(), Is();
	}
	function Zs(e) {
		Rs(e, `collection:${e}:add-entry`, (e) => {
			e.kind === "products" ? e.entries.push({
				id: ms("entry"),
				title: X("seed.newProduct"),
				text: ""
			}) : e.entries.unshift({
				id: ms("entry"),
				title: X("seed.newEntry"),
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function nc(e, t, n, r) {
		Rs(e, `edit:collection:${e}:${t}:${n}`, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function rc(e, t, n) {
		Rs(e, `collection:${e}:move-entry`, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function ic(e, t) {
		Rs(e, `collection:${e}:remove-entry`, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function ac(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && nc(e, t, "image", (await hr(r)).dataUrl);
	}
	function oc(e, t, n) {
		let r = n.split(",").map((e) => e.trim()).filter(Boolean);
		nc(e, t, "sizes", r.length ? r : "");
	}
	function sc(e, t) {
		Rs(e, `collection:${e}:${t}:colors`, (e) => {
			let n = e.entries.find((e) => e.id === t);
			n && (n.colors = [...n.colors ?? [], { name: X("ph.colorName") }]);
		});
	}
	function cc(e, t, n, r, i) {
		Rs(e, `edit:collection:${e}:${t}:color:${n}:${r}`, (e) => {
			let a = e.entries.find((e) => e.id === t)?.colors?.[n];
			a && (r === "image" && !i ? delete a.image : i && (a[r] = i));
		});
	}
	async function lc(e, t, n, r) {
		let i = r.target.files?.[0];
		r.target.value = "", i && cc(e, t, n, "image", (await hr(i)).dataUrl);
	}
	function uc(e, t, n) {
		Rs(e, `collection:${e}:${t}:colors`, (e) => {
			let r = e.entries.find((e) => e.id === t);
			r?.colors && (r.colors = r.colors.filter((e, t) => t !== n), r.colors.length || delete r.colors);
		});
	}
	function dc(e) {
		let t = Q[e]?.data;
		if (!t) return;
		let n = URL.createObjectURL(new Blob([qs(t.entries)], { type: "text/csv" })), r = document.createElement("a");
		r.href = n, r.download = `${e}.csv`, r.click(), URL.revokeObjectURL(n);
	}
	async function fc(e, t) {
		let n = t.target.files?.[0];
		if (t.target.value = "", !n) return;
		let r = Xs(await n.text());
		if (!r) {
			S(X("status.csvInvalid"), "error");
			return;
		}
		let i = /* @__PURE__ */ new Set();
		for (let e of r.entries) (!/^[a-z0-9][a-z0-9-]*$/.test(e.id) || i.has(e.id)) && (e.id = ms("entry")), i.add(e.id);
		Rs(e, `collection:${e}:import`, (e) => {
			e.entries = r.entries;
		}), S(X("status.csvImported", { count: String(r.entries.length) }), "ok");
	}
	let pc = null, mc, hc = new Promise((e) => {
		mc = e;
	}), gc = /* @__PURE__ */ N(null), _c = en({}), vc = /* @__PURE__ */ N("0.0.0"), yc = /* @__PURE__ */ N(""), bc = /* @__PURE__ */ N(""), xc = /* @__PURE__ */ N(en([])), Cc = /* @__PURE__ */ N(en([])), Ec = /* @__PURE__ */ N("pending"), Dc = () => [.../* @__PURE__ */ new Set([...B(gc)?.enabled ?? [], ...B(gc)?.disabled ?? []])];
	function jc() {
		P(gc, JSON.parse(JSON.stringify(pc.data)), !0);
	}
	let Pc = /* @__PURE__ */ N(null);
	async function Fc() {
		try {
			let e = (await fetch("/urd.json", { cache: "no-store" })).headers.get("content-security-policy");
			if (!e) {
				P(Pc, { unknown: !0 }, !0);
				return;
			}
			let t = (t) => new Set((e.split(";").map((e) => e.trim()).find((e) => e.startsWith(`${t} `)) ?? "").split(/\s+/).slice(1));
			P(Pc, {
				frameSrc: t("frame-src"),
				connectSrc: t("connect-src"),
				scriptSrc: t("script-src")
			}, !0);
		} catch {
			P(Pc, { unknown: !0 }, !0);
		}
	}
	function Vc(e) {
		let t = [
			...(e.scriptSrc ?? []).map((e) => ["script-src", e]),
			...(e.connectSrc ?? []).map((e) => ["connect-src", e]),
			...(e.frameSrc ?? []).map((e) => ["frame-src", e])
		];
		if (!B(Pc) || B(Pc).unknown) return [];
		let n = {
			"script-src": B(Pc).scriptSrc,
			"connect-src": B(Pc).connectSrc,
			"frame-src": B(Pc).frameSrc
		};
		return t.filter(([e, t]) => !n[e]?.has(t)).map(([e, t]) => `${e} ${t}`);
	}
	async function Hc() {
		Fc();
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		P(Cc, e.enabled ?? [], !0), pc = Qi("urd-draft-plugins", () => e, C), jc();
		try {
			P(vc, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of Dc()) Gc(e);
		Uc(), mc(), O?.sendPlugins(We(B(gc))?.enabled ?? []);
	}
	async function Uc() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				Wc();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), P(xc, (t ?? []).filter((e) => !Dc().includes(e)), !0);
			for (let e of B(xc)) Gc(e);
			P(Ec, "ok");
		} catch {
			Wc();
		}
	}
	function Wc() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				P(xc, e.filter((e) => !Dc().includes(e)), !0);
				for (let e of B(xc)) Gc(e);
				P(Ec, "ok");
				return;
			}
		} catch {}
		P(Ec, "unavailable");
	}
	async function Gc(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = ps(t);
			_c[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && ds(B(vc), t.requiresEngine)
			};
		} catch {
			_c[e] = {
				name: e,
				errors: [X("plugin.manifestNotFound", { id: e })],
				satisfied: !1
			};
		}
	}
	function Kc(e, t) {
		qe("plugins");
		let n = pc.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), pc.save(), Ve(), jc(), qc();
	}
	function qc() {
		B(w) && (B(w).src = B(w).src);
	}
	function Jc(e) {
		qe("plugins");
		let t = pc.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), pc.save(), Ve(), jc(), qc();
	}
	async function Yc() {
		P(bc, "");
		let e = B(yc).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			P(bc, X("plugin.invalidId"), !0);
			return;
		}
		if (Dc().includes(e)) {
			P(bc, X("plugin.alreadyListed"), !0);
			return;
		}
		if (await Gc(e), _c[e].errors.length) {
			P(bc, X("plugin.invalidManifest", { errors: _c[e].errors.join("; ") }), !0);
			return;
		}
		Kc(e, !0), P(yc, "");
	}
	function Xc(e) {
		P(xc, B(xc).filter((t) => t !== e), !0), Kc(e, !0);
	}
	function Zc(e, t) {
		ta(e, () => {
			B(k).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(B(k).footer);
		});
	}
	function el(e, t) {
		Zc(`edit:footer-brand-${e}`, (n) => {
			n.brand ??= {}, t.trim() ? n.brand[e] = t : delete n.brand[e], !n.brand.title && !n.brand.tagline && !n.brand.logo && delete n.brand;
		});
	}
	function nl(e) {
		Zc("footer", (t) => {
			t.brand ??= {}, e === "image" || e === "both" ? t.brand.mode = e : delete t.brand.mode;
		});
	}
	async function rl(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await hr(t);
			Zc("footer", (t) => {
				t.brand ??= {}, t.brand.logo = e.dataUrl, t.brand.mode || (t.brand.mode = "both");
			});
		} catch {
			S(X("status.imageReadErrorSvg"), "error");
		}
	}
	function il() {
		Zc("footer", (e) => {
			e.brand && (delete e.brand.logo, delete e.brand.mode, delete e.brand.logoHeight, !e.brand.title && !e.brand.tagline && delete e.brand);
		});
	}
	function al(e) {
		Zc("edit:footer-logo-height", (t) => {
			t.brand ??= {};
			let n = Number(e);
			Number.isFinite(n) && (t.brand.logoHeight = Math.min(160, Math.max(16, Math.round(n))));
		});
	}
	function ol(e) {
		Zc("edit:footer-copyright", (t) => {
			e.trim() ? t.copyright = e : delete t.copyright;
		});
	}
	let sl = [
		{
			id: "minimal",
			label: X("footerTemplate.minimal"),
			thumb: {
				center: !0,
				social: 2,
				baselineLinks: 1
			}
		},
		{
			id: "centered",
			label: X("footerTemplate.centered"),
			thumb: {
				center: !0,
				row: !0,
				social: 3
			}
		},
		{
			id: "columns",
			label: X("footerTemplate.columns"),
			thumb: {
				tag: !0,
				cols: 3,
				social: 3,
				baselineLinks: 2
			}
		},
		{
			id: "sitemap",
			label: X("footerTemplate.sitemap"),
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
			label: X("footerTemplate.newsletter"),
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
			label: X("footerTemplate.bigcta"),
			thumb: {
				center: !0,
				bigcta: !0,
				baselineLinks: 2
			}
		},
		{
			id: "contact",
			label: X("footerTemplate.contact"),
			thumb: {
				tag: !0,
				cols: 3,
				social: 2,
				baselineLinks: 1
			}
		},
		{
			id: "mega",
			label: X("footerTemplate.mega"),
			thumb: {
				tag: !0,
				mega: !0,
				cols: 2,
				social: 4,
				baselineLinks: 2
			}
		}
	];
	function cl(e) {
		let t = X("seed.orgName"), n = B(k).pages ?? [], r = (e) => n.slice(0, e).map((e) => ({
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
			baseline: [a(X("seed.footer.privacy"), "#")]
		} : e === "centered" ? {
			align: "center",
			brand: { title: t },
			linkRow: r(5),
			social: i([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: `${o} · ${X("seed.footer.madeWith")}`
		} : e === "columns" ? {
			align: "left",
			brand: {
				title: t,
				tagline: X("seed.footer.tagline1")
			},
			columns: [
				{
					title: X("seed.footer.colPages"),
					links: r(4)
				},
				{
					title: X("seed.footer.colCompany"),
					links: [
						a(X("seed.footer.about"), "#"),
						a(X("seed.join"), "#"),
						a(X("seed.footer.press"), "#")
					]
				},
				{
					title: X("seed.footer.colResources"),
					links: [
						a(X("seed.footer.bylaws"), "#"),
						a(X("seed.footer.privacy"), "#"),
						a(X("seed.footer.contact"), "#")
					]
				}
			],
			social: i([
				"facebook",
				"instagram",
				"linkedin"
			]),
			copyright: o,
			baseline: [a(X("seed.footer.privacy"), "#"), a(X("seed.footer.terms"), "#")]
		} : e === "sitemap" ? {
			align: "left",
			brand: {
				title: t,
				tagline: X("seed.footer.tagline2")
			},
			columns: [
				{
					title: X("seed.footer.colExplore"),
					links: [
						a(X("seed.footer.home"), "#"),
						a(X("seed.footer.events"), "#"),
						a(X("seed.footer.gallery"), "#"),
						a(X("seed.footer.blog"), "#")
					]
				},
				{
					title: X("seed.footer.colCompany"),
					links: [
						a(X("seed.footer.about"), "#"),
						a(X("seed.footer.history"), "#"),
						a(X("seed.footer.press"), "#"),
						a(X("seed.footer.contact"), "#")
					]
				},
				{
					title: X("seed.footer.colSupport"),
					links: [
						a(X("seed.join"), "#"),
						a(X("seed.footer.faq"), "#"),
						a(X("seed.footer.help"), "#")
					]
				},
				{
					title: X("seed.footer.colLegal"),
					links: [
						a(X("seed.footer.privacy"), "#"),
						a(X("seed.footer.terms"), "#"),
						a(X("seed.footer.bylaws"), "#")
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
				a(X("seed.footer.privacy"), "#"),
				a(X("seed.footer.terms"), "#"),
				a(X("seed.footer.cookies"), "#")
			]
		} : e === "newsletter" ? {
			align: "left",
			brand: {
				title: t,
				tagline: X("seed.footer.tagline3")
			},
			cta: {
				kind: "newsletter",
				heading: X("seed.footer.newsletterHeading"),
				label: X("seed.footer.newsletterButton"),
				recipient: X("seed.email"),
				success: X("seed.footer.newsletterSuccess")
			},
			columns: [{
				title: X("seed.footer.colPages"),
				links: r(4)
			}, {
				title: X("seed.footer.colMore"),
				links: [
					a(X("seed.footer.about"), "#"),
					a(X("seed.footer.contact"), "#"),
					a(X("seed.footer.privacy"), "#")
				]
			}],
			social: i(["facebook", "instagram"]),
			copyright: o,
			baseline: [a(X("seed.footer.privacy"), "#")]
		} : e === "bigcta" ? {
			align: "center",
			cta: {
				kind: "button",
				big: !0,
				heading: X("seed.footer.ctaHeading"),
				sub: X("seed.footer.ctaSub"),
				label: X("seed.join"),
				href: "#"
			},
			linkRow: r(4),
			social: i([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: o,
			baseline: [a(X("seed.footer.privacy"), "#"), a(X("seed.footer.terms"), "#")]
		} : e === "contact" ? {
			align: "left",
			brand: {
				title: t,
				tagline: X("seed.footer.tagline4")
			},
			columns: [
				{
					title: X("seed.footer.colVisit"),
					links: [
						a(X("seed.footer.address"), "#"),
						a(X("seed.email"), `mailto:${X("seed.email")}`),
						a(X("seed.phone"), `tel:${X("seed.phone").replace(/\s+/g, "")}`)
					]
				},
				{
					title: X("seed.footer.colHours"),
					links: [a(X("seed.footer.hours1"), "#"), a(X("seed.footer.hours2"), "#")]
				},
				{
					title: X("seed.footer.colPages"),
					links: r(4)
				}
			],
			social: i(["facebook", "instagram"]),
			copyright: o,
			baseline: [a(X("seed.footer.privacy"), "#")]
		} : {
			align: "left",
			brand: {
				title: t,
				tagline: X("seed.footer.tagline5")
			},
			columns: [{
				title: X("seed.footer.colExplore"),
				links: r(4)
			}, {
				title: X("seed.footer.colFollow"),
				links: [a(X("seed.footer.newsletter"), "#"), a(X("seed.email"), `mailto:${X("seed.email")}`)]
			}],
			social: i([
				"facebook",
				"instagram",
				"linkedin",
				"youtube"
			]),
			copyright: o,
			baseline: [a(X("seed.footer.privacy"), "#"), a(X("seed.footer.madeWith"), "#")],
			background: {
				version: 1,
				layers: [{
					type: "glow",
					version: $c.version ?? 1,
					props: {
						...$c.defaults(),
						color: "accent",
						x: .12,
						y: 0,
						radius: .6,
						opacity: .45
					}
				}, {
					type: "grain",
					version: tl.version ?? 1,
					props: {
						...tl.defaults(),
						opacity: .08
					}
				}]
			}
		};
	}
	function ll(e) {
		Zc("footer-template", (t) => {
			let n = cl(e);
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
	function ul(e) {
		Zc("footer", (t) => {
			t[e] ??= [], t[e].push(B(k).pages[0] ? {
				label: X("seed.link"),
				page: B(k).pages[0].id
			} : {
				label: X("seed.link"),
				href: "https://"
			});
		});
	}
	function dl(e, t) {
		Zc("footer", (n) => {
			n[e].splice(t, 1), n[e].length || delete n[e];
		});
	}
	function fl(e, t, n) {
		Zc("footer", (r) => {
			let i = r[e], a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function pl(e, t, n) {
		Zc(`edit:footer-${e}-label-${t}`, (r) => {
			r[e][t].label = n;
		});
	}
	function ml(e, t, n) {
		Zc("footer", (r) => {
			let i = r[e][t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function hl(e, t, n) {
		Zc(`edit:footer-${e}-href-${t}`, (r) => {
			r[e][t].href = n;
		});
	}
	function gl(e) {
		Zc("footer", (t) => {
			e === "center" ? t.columnsAlign = "center" : delete t.columnsAlign;
		});
	}
	function _l(e) {
		Zc("footer", (t) => {
			e ? t.cta ??= {
				kind: "button",
				label: X("seed.join")
			} : delete t.cta;
		});
	}
	function vl(e, t) {
		Zc(`edit:footer-cta-${e}`, (n) => {
			n.cta ??= {}, t === "" || t == null || t === !1 ? delete n.cta[e] : n.cta[e] = t;
		});
	}
	function yl(e) {
		Zc("footer", (t) => {
			t.cta ??= {}, e === "__href" ? (delete t.cta.page, t.cta.href = t.cta.href ?? "https://") : (t.cta.page = e, delete t.cta.href);
		});
	}
	function bl(e, t) {
		Zc("footer", (n) => {
			let r = new Set(n.hideOn ?? []);
			t ? r.delete(e) : r.add(e), r.size ? n.hideOn = [...r] : delete n.hideOn;
		});
	}
	function xl() {
		Zc("footer", (e) => {
			e.columns ??= [], e.columns.push({
				title: X("seed.column"),
				links: [{
					label: X("seed.link"),
					page: B(k).pages[0].id
				}]
			});
		});
	}
	function Sl(e) {
		Zc("footer", (t) => {
			t.columns.splice(e, 1), t.columns.length || delete t.columns;
		});
	}
	function Cl(e, t) {
		Zc("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.columns.length || ([n.columns[e], n.columns[r]] = [n.columns[r], n.columns[e]]);
		});
	}
	function wl(e, t) {
		Zc(`edit:footer-col-title-${e}`, (n) => {
			n.columns[e].title = t;
		});
	}
	function El(e) {
		Zc("footer", (t) => {
			t.columns[e].links ??= [], t.columns[e].links.push({
				label: X("seed.link"),
				page: B(k).pages[0].id
			});
		});
	}
	function Dl(e, t) {
		Zc("footer", (n) => {
			n.columns[e].links.splice(t, 1);
		});
	}
	function Ol(e, t, n) {
		Zc("footer", (r) => {
			let i = r.columns[e].links, a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function kl(e, t, n) {
		Zc(`edit:footer-link-label-${e}-${t}`, (r) => {
			r.columns[e].links[t].label = n;
		});
	}
	function jl(e, t, n) {
		Zc("footer", (r) => {
			let i = r.columns[e].links[t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function Ml(e, t, n) {
		Zc(`edit:footer-link-href-${e}-${t}`, (r) => {
			r.columns[e].links[t].href = n;
		});
	}
	function Nl() {
		Zc("footer", (e) => {
			e.social ??= [], e.social.push({
				icon: "facebook",
				url: "https://"
			});
		});
	}
	function Pl(e) {
		Zc("footer", (t) => {
			t.social.splice(e, 1), t.social.length || delete t.social;
		});
	}
	function Fl(e, t) {
		Zc("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.social.length || ([n.social[e], n.social[r]] = [n.social[r], n.social[e]]);
		});
	}
	function Rl(e, t) {
		Zc("footer", (n) => {
			n.social[e].icon = t;
		});
	}
	function zl(e, t) {
		Zc(`edit:footer-social-url-${e}`, (n) => {
			n.social[e].url = t;
		});
	}
	let Bl = Ua.filter(([e]) => e === "iconCat.social" || e === "iconCat.communication").flatMap(([, e]) => e.map((e) => [e, X(Ha[e].labelKey)]));
	function Fp(e, t) {
		ta(`edit:nav-label-${e}`, () => {
			B(k).nav.items[e].label = t;
		});
	}
	function Ip(e, t) {
		ta("nav", () => {
			let n = B(k).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function Lp(e, t) {
		ta(`edit:nav-href-${e}`, () => {
			B(k).nav.items[e].href = t;
		});
	}
	function Rp(e, t) {
		let n = e + t, r = B(k).nav.items;
		n < 0 || n >= r.length || ta("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function zp(e) {
		ta("nav", () => {
			B(k).nav.items.splice(e, 1);
		});
	}
	function Bp() {
		ta("nav", () => {
			B(k).nav.items.push({
				label: X("seed.link"),
				page: B(k).pages[0].id
			});
		});
	}
	function Vp(e) {
		ta("nav", () => {
			let t = B(k).nav.items[e];
			t.children ??= [], t.children.push({
				label: X("seed.link"),
				page: B(k).pages[0].id
			});
		});
	}
	function Hp(e, t, n) {
		ta(`edit:nav-child-label-${e}-${t}`, () => {
			B(k).nav.items[e].children[t].label = n;
		});
	}
	function Up(e, t, n) {
		ta("nav", () => {
			let r = B(k).nav.items[e].children[t];
			n === "__href" ? (delete r.page, r.href = r.href ?? "https://") : (r.page = n, delete r.href);
		});
	}
	function Wp(e, t, n) {
		ta(`edit:nav-child-href-${e}-${t}`, () => {
			B(k).nav.items[e].children[t].href = n;
		});
	}
	function Gp(e, t, n) {
		let r = t + n, i = B(k).nav.items[e].children;
		r < 0 || r >= i.length || ta("nav", () => {
			[i[t], i[r]] = [i[r], i[t]];
		});
	}
	function Kp(e, t) {
		ta("nav", () => {
			let n = B(k).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = B(k).pages[0].id));
		});
	}
	function qp(e, t) {
		ta(`edit:theme-color-${e}`, () => {
			B(k).theme.tokens.color[e] = t, B(k).theme.alt?.auto && (B(k).theme.alt.tokens.color = sm());
		});
	}
	function Jp(e, t) {
		return e === "accent-text" ? m(hm(t.accent ?? "#000000", t)) : t.bg;
	}
	let Yp = /* @__PURE__ */ A(() => !B(k)?.theme?.tokens?.color?.["accent-text"] && !B(k)?.theme?.alt?.tokens?.color?.["accent-text"]), Xp = /* @__PURE__ */ N(null), Zp = /* @__PURE__ */ N(!1), Qp = /* @__PURE__ */ N(!1), $p = (e) => e.length > 0 && [...e].every((e) => e.open);
	function em() {
		let e = B(Xp)?.querySelectorAll("details.group") ?? [];
		P(Zp, e.length > 0), P(Qp, $p(e), !0);
	}
	xn(() => {
		B(vt), pr().then(em);
	});
	function tm() {
		let e = !B(Qp);
		B(Xp)?.querySelectorAll("details.group").forEach((t) => {
			t.open = e;
		}), em();
	}
	function nm(e) {
		for (let t of e.querySelectorAll("details.group")) {
			let e = t.querySelector(":scope > summary");
			if (!e || e.querySelector(".fold-sub")) continue;
			let n = () => t.querySelectorAll(":scope > .group-items details.group");
			if (!n().length) continue;
			let r = document.createElement("button");
			r.type = "button", r.className = "fold-sub fold-toggle", r.innerHTML = c.foldToggle;
			let i = () => {
				let e = $p(n());
				r.classList.toggle("collapse", e), r.title = X(e ? "ui.collapseSub" : "ui.expandSub"), r.setAttribute("aria-label", r.title);
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
		let e = B(Xp);
		if (!e) return;
		let t = new MutationObserver(() => {
			nm(e), em();
		});
		return t.observe(e, {
			childList: !0,
			subtree: !0
		}), e.addEventListener("toggle", em, !0), nm(e), () => {
			t.disconnect(), e.removeEventListener("toggle", em, !0);
		};
	});
	function rm(e) {
		ta("edit:theme-color-accent-text", () => {
			e ? (delete B(k).theme.tokens.color["accent-text"], B(k).theme.alt?.tokens?.color && delete B(k).theme.alt.tokens.color["accent-text"]) : (B(k).theme.tokens.color["accent-text"] = Jp("accent-text", B(Lr)), B(k).theme.alt?.auto && (B(k).theme.alt.tokens.color = sm()));
		});
	}
	function im(e, t) {
		ta("theme", () => {
			B(k).theme.tokens.font[e] = t;
		});
	}
	function am(e, t) {
		ta("theme", () => {
			B(k).theme.tokens.radius[e] = t;
		});
	}
	function om(e) {
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
	function sm() {
		return Object.fromEntries(Object.entries(B(k).theme.tokens.color).map(([e, t]) => [e, om(t)]));
	}
	function cm(e, t) {
		ta(`edit:theme-alt-${e}`, () => {
			B(k).theme.alt.tokens.color[e] = t, B(k).theme.alt.auto = !1;
		});
	}
	function lm(e) {
		ta("theme", () => {
			e === "light" ? delete B(k).theme.scheme : B(k).theme.scheme = e;
		});
	}
	function um(e) {
		ta("theme", () => {
			e ? B(k).theme.alt = {
				auto: !0,
				tokens: { color: sm() }
			} : delete B(k).theme.alt;
		});
	}
	function dm(e) {
		ta("theme", () => {
			B(k).theme.alt ??= { tokens: { color: sm() } }, B(k).theme.alt.auto = e, e && (B(k).theme.alt.tokens.color = sm());
		});
	}
	function fm(e) {
		let t = B(k).theme.tokens.font[e];
		return [...Hl.some(([, e]) => e === t) ? [] : [[t, X("opt.customFont")]], ...Hl.map(([e, t]) => [t, X(e)])];
	}
	let pm = (e) => parseInt(e, 10) || 0;
	function mm(e, t) {
		am(e, `${t}px`);
	}
	let hm = (e, t) => e && t && t[e] ? t[e] : e, gm = [
		"bg",
		"surface",
		"text",
		"accent",
		"accent-text"
	], _m = [
		{
			id: "well",
			name: X("themePreset.well.name"),
			note: X("themePreset.well.note"),
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
			name: X("themePreset.stone.name"),
			note: X("themePreset.stone.note"),
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
			name: X("themePreset.plum.name"),
			note: X("themePreset.plum.note"),
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
			name: X("themePreset.rose.name"),
			note: X("themePreset.rose.note"),
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
			name: X("themePreset.ocean.name"),
			note: X("themePreset.ocean.note"),
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
			name: X("themePreset.night.name"),
			note: X("themePreset.night.note"),
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
	function vm(e) {
		ta("theme", () => {
			let t = e.scheme === "dark", n = t ? e.dark : e.light, r = t ? e.light : e.dark;
			for (let e of gm) B(k).theme.tokens.color[e] = n[e];
			t ? B(k).theme.scheme = "dark" : delete B(k).theme.scheme, B(k).theme.alt = { tokens: { color: { ...r } } };
		});
	}
	let ym = /* @__PURE__ */ A(() => {
		if (!B(k)) return null;
		let e = B(k).theme.tokens.color, t = B(k).theme.alt?.tokens?.color ?? {}, n = B(k).theme.scheme === "dark";
		return _m.find((r) => {
			let i = n ? r.dark : r.light, a = n ? r.light : r.dark;
			return gm.every((n) => e[n] === i[n] && t[n] === a[n]);
		})?.id ?? null;
	});
	function bm() {
		P(ne, !B(ne)), O?.sendChrome(B(ne));
	}
	function xm(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (qe(`edit:${e.blockId}`), n.props = e.props, D.save(), Ve(), B(j)?.blockId === e.blockId && Mt(), e.rerender && O?.sendSection(B(_), t), P(y, ""));
	}
	function Sm(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		qe(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && Fe(t, "desktop-changed-after-mobile"), D.save(), Ve(), B(j)?.blockId === e.blockId && Mt();
	}
	function Cm(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		!t?.frames?.desktop || t.frames.desktop.h === e.h || (D.amendBaseline((t) => {
			let n = t.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
			n?.frames?.desktop && (n.frames.desktop.h = e.h);
		}), D.hasDraft() && qe(`edit:${e.blockId}`), t.frames.desktop.h = e.h, D.save(), Ve(), B(j)?.blockId === e.blockId && Mt());
	}
	function wm(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			if (qe("mobile-reset"), e.blockId) {
				let n = t.blocks.find((t) => t.id === e.blockId);
				n && (n.frames.mobile = null);
			} else for (let e of t.blocks) e.frames.mobile = null;
			!Pe(t) && t.responsive?.mobile && (t.responsive.mobile.attention = null), D.save(), Ve(), je(), O?.sendSection(B(_), t);
		}
	}
	function Tm(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		!n || typeof e.mobileOrder != "number" || (qe("mobile-order"), n.mobileOrder = e.mobileOrder, D.save(), Ve(), O?.sendSection(B(_), t));
	}
	function Em(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (qe("review-done"), t.responsive.mobile.attention = null, D.save(), Ve(), je());
	}
	function Dm(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (qe("block-flag"), typeof e.decor == "boolean" && (n.decor = e.decor), typeof e.hideMobile == "boolean" && (n.hideMobile = e.hideMobile), D.save(), Ve(), typeof e.hideMobile == "boolean" && B(me) === "mobile" && O?.sendSection(B(_), t), B(j)?.blockId === e.blockId && Mt());
	}
	function Om(e) {
		qe("add-section"), e.section.id || (e.section.id = ms("sec")), D.data.sections.splice(e.index, 0, e.section), D.save(), Ve(), O?.sendPage(B(_), D.data), P(kn, e.section.id, !0), In(e.section), P(vt, "properties");
	}
	function km(e) {
		let t = D.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (qe("move-section"), [t[n], t[r]] = [t[r], t[n]], D.save(), Ve(), O?.sendPage(B(_), D.data));
	}
	function Am(e) {
		qe("delete-section"), e.sectionId === B(kn) && (P(kn, null), P(An, null)), B(j)?.sectionId === e.sectionId && P(j, null), D.data.sections = D.data.sections.filter((t) => t.id !== e.sectionId), D.save(), Ve(), O?.sendPage(B(_), D.data);
	}
	function jm(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			qe("section-size"), t.size = {
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
			e.moves?.length && (Fe(t, "section-height"), B(j)?.sectionId === e.sectionId && Mt()), e.sectionId === B(kn) && P(jn, e.minHeight, !0), D.save(), Ve();
		}
	}
	function Mm(e) {
		let t = D.data.sections.find((t) => t.id === e.fromSectionId), n = D.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		!t || !n || !r || (qe("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), Fe(t, "block-moved"), Fe(n, "block-moved"), D.save(), Ve(), je(), O?.sendPage(B(_), D.data), B(j)?.blockId === e.blockId && (P(j, {
			...B(j),
			sectionId: e.toSectionId
		}, !0), Mt()));
	}
	function Nm(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		if (!t) return;
		let n = e.blockIds ?? [e.blockId];
		qe("delete-block"), t.blocks = t.blocks.filter((e) => !n.includes(e.id)), n.includes(B(j)?.blockId) && P(j, null), Fe(t, "block-deleted"), D.save(), Ve(), O?.sendSection(B(_), t);
	}
	let Pm = {
		text: {
			type: "text",
			props: {
				html: X("seed.text"),
				align: "left"
			},
			w: 33,
			h: 28
		},
		"text-box": {
			type: "text",
			props: {
				html: X("seed.textBox"),
				align: "left",
				box: !0
			},
			w: 30,
			h: 150
		},
		button: {
			type: "button",
			props: {
				label: X("seed.newButton"),
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
				submitLabel: X("form.sendDefault"),
				successText: X("form.thanksDefault"),
				fields: Xo()
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
			w: 90,
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
			w: 90,
			h: 320
		},
		faq: {
			type: "faq",
			props: {
				items: [
					{
						q: X("seed.faq.q1"),
						a: X("seed.faq.answer")
					},
					{
						q: X("seed.faq.q2"),
						a: X("seed.faq.answer")
					},
					{
						q: X("seed.faq.q3"),
						a: X("seed.faq.answer")
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
						title: X("seed.timeline.t1"),
						text: X("seed.timeline.text")
					},
					{
						year: "2022",
						title: X("seed.timeline.t2"),
						text: X("seed.timeline.text")
					},
					{
						year: "2026",
						title: X("seed.timeline.t3"),
						text: X("seed.timeline.text")
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
				text: X("seed.quoteBlock.text"),
				attribution: X("seed.quoteBlock.name"),
				role: X("seed.quoteBlock.role"),
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
				label: X("seed.statsBlock.label"),
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
						X("seed.table.h1"),
						X("seed.table.h2"),
						X("seed.table.h3")
					],
					[
						X("seed.table.r1c1"),
						X("seed.table.r1c2"),
						""
					],
					[
						X("seed.table.r2c1"),
						X("seed.table.r2c2"),
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
				doneText: X("seed.countdown.done"),
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
			w: 90,
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
	function Fm(e) {
		let t = Pm[e];
		return t ? {
			id: ms("blk"),
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
	function Im(e) {
		O ? O.sendPlaceBlock(e) : Lm(ti()?.id, e);
	}
	function Lm(e, t) {
		let n = D.data.sections.find((t) => t.id === e) ?? D.data.sections[0];
		if (!n) return;
		qe("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), Fe(n, "block-added"), D.save(), Ve(), O?.sendSection(B(_), n);
	}
	function Rm(e, t, n, r) {
		let i = D.data.sections.find((t) => t.id === e);
		if (!i || !t?.length) return;
		qe("add-blocks");
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
		}), Fe(i, "block-added"), D.save(), Ve(), O?.sendSection(B(_), i);
	}
	function zm(e) {
		Im(Fm(e));
	}
	let Bm = /* @__PURE__ */ N(en([])), Vm = { map: [
		{
			key: "location",
			type: "place",
			label: X("lbl.mapLocation"),
			placeholder: X("ph.mapLocation")
		},
		{
			key: "zoom",
			type: "number",
			label: X("lbl.mapZoom"),
			min: 1,
			max: 19
		},
		{
			key: "height",
			type: "number",
			label: X("lbl.mapHeight"),
			min: 120,
			max: 900,
			step: 10
		}
	] };
	function Hm(e, t = {}) {
		let n = We(e);
		Im({
			id: ms("blk"),
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
	let Um = /* @__PURE__ */ N("");
	function Wm() {
		let e = [
			{
				label: X("blocks.text"),
				act: "block",
				kind: "text"
			},
			{
				label: X("ui.textBox"),
				act: "block",
				kind: "text-box"
			},
			{
				label: X("blocks.button"),
				act: "block",
				kind: "button"
			},
			{
				label: X("blocks.image"),
				act: "image"
			},
			{
				label: X("blocks.video"),
				act: "block",
				kind: "video"
			},
			{
				label: X("blocks.icon"),
				act: "block",
				kind: "icon"
			},
			{
				label: X("blocks.map"),
				act: "block",
				kind: "map"
			},
			{
				label: X("blocks.form"),
				act: "block",
				kind: "form"
			},
			{
				label: `${X("blocks.calendar")}: ${X("calendar.viewList")}`,
				act: "block",
				kind: "calendar"
			},
			{
				label: `${X("blocks.calendar")}: ${X("calendar.viewCards")}`,
				act: "block",
				kind: "calendar-cards"
			},
			{
				label: `${X("blocks.calendar")}: ${X("calendar.viewMonth")}`,
				act: "block",
				kind: "calendar-month"
			},
			{
				label: `${X("blocks.calendar")}: ${X("calendar.viewNext")}`,
				act: "block",
				kind: "calendar-next"
			},
			{
				label: X("blocks.collection"),
				act: "block",
				kind: "collection"
			},
			{
				label: X("blocks.faq"),
				act: "block",
				kind: "faq"
			},
			{
				label: X("blocks.timeline"),
				act: "block",
				kind: "timeline"
			},
			{
				label: X("blocks.quote"),
				act: "block",
				kind: "quote"
			},
			{
				label: X("blocks.stats"),
				act: "block",
				kind: "stats"
			},
			{
				label: X("blocks.table"),
				act: "block",
				kind: "table"
			},
			{
				label: X("blocks.share"),
				act: "block",
				kind: "share"
			},
			{
				label: X("blocks.countdown"),
				act: "block",
				kind: "countdown"
			},
			{
				label: X("blocks.audio"),
				act: "block",
				kind: "audio"
			},
			{
				label: X("blocks.product"),
				act: "block",
				kind: "product"
			},
			{
				label: X("blocks.cart"),
				act: "block",
				kind: "cart"
			},
			{
				label: X("blocks.checkout"),
				act: "block",
				kind: "checkout"
			},
			{
				label: X("ui.emptyGallery"),
				act: "block",
				kind: "gallery"
			},
			{
				label: X("ui.galleryWithImages"),
				act: "galleryImages"
			},
			{
				label: X("shape.line"),
				act: "block",
				kind: "shape-line"
			},
			{
				label: X("shape.arrow"),
				act: "block",
				kind: "shape-arrow"
			},
			{
				label: X("shape.circle"),
				act: "block",
				kind: "shape-circle"
			},
			{
				label: X("shape.rect"),
				act: "block",
				kind: "shape-rect"
			},
			{
				label: X("shape.triangle"),
				act: "block",
				kind: "shape-triangle"
			}
		];
		for (let t of B(Ds)) {
			let n = ws[t]?.data?.mal;
			n?.kind === "blocks" && e.push({
				label: n.name,
				act: "template",
				id: t
			});
		}
		for (let t of B(Bm)) if (t.variants?.length) for (let n of t.variants) e.push({
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
	function Gm(e) {
		e.act === "block" ? zm(e.kind) : e.act === "plugin" ? Hm(e.entry, e.props ?? {}) : e.act === "template" && O?.sendInsertTemplate(e.id);
	}
	function Km(e) {
		let t = Fm(e.kind);
		if (t) {
			if (e.at && typeof e.at.x == "number" && typeof e.at.y == "number") {
				let n = D.data.sections.find((t) => t.id === e.sectionId)?.grid ?? B(k).grid, r = Ul({
					x: e.at.x,
					y: e.at.y,
					w: t.frames.desktop.w,
					h: t.frames.desktop.h,
					grid: n
				});
				t.frames.desktop.x = r.x, t.frames.desktop.y = r.y;
			} else t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40;
			Lm(e.sectionId, t), O?.sendSelect(t.id), e.kind === "image" && S(X("status.imageBlockAdded")), e.kind === "gallery" && S(X("status.galleryBlockAdded"));
		}
	}
	async function qm(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		S(X("status.compressingImage"));
		let n;
		try {
			n = await hr(t);
		} catch {
			S(X("status.imageReadError"), "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (B(w)?.clientWidth ?? 1280));
		Im({
			id: ms("blk"),
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
		}), n.bytes > 4e5 ? S(X("status.imageLarge", { kb: Math.round(n.bytes / 1024) }), "error") : S("");
	}
	async function Jm(e) {
		let t = [], n = 0, r = 0;
		for (let i of e) try {
			let e = await hr(i);
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
	function Ym(e, t, n) {
		t ? S(X("status.imagesReadFailed", { n: t }), "error") : n ? S(X("status.imagesLarge", { n }), "error") : S(e ? "" : X("status.noImagesAdded"));
	}
	async function Xm(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		S(X("status.compressingImages"));
		let { images: n, failed: r, big: i } = await Jm(t);
		n.length && zt("gallery-add", (e) => {
			e.props.images.push(...n);
		}), Ym(n.length, r, i);
	}
	async function Zm(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		S(X("status.compressingImages"));
		let { images: n, failed: r, big: i } = await Jm(t);
		if (!n.length) {
			Ym(0, r, i);
			return;
		}
		let a = Fm("gallery");
		a.props.images = n, Im(a), Ym(n.length, r, i);
	}
	function Qm(e, t) {
		zt("gallery-move", (n) => {
			let r = e + t;
			r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
		});
	}
	function $m(e) {
		zt("gallery-remove", (t) => {
			t.props.images.splice(e, 1);
		});
	}
	function eh(e, t, n) {
		zt(`edit:${B(j).blockId}:img${e}-${t}`, (r) => {
			r.props.images[e][t] = n;
		});
	}
	function th(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/") && !i?.startsWith("data:audio/") && !i?.startsWith("data:video/")) return;
		let a = i.split(",", 2)[1], o = `media/${Oa(n || "image")}-${ka(a)}.${Da(i)}`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function nh(e, t) {
		th(e, "image", e.title, t);
		for (let n of e.colors ?? []) th(n, "image", `${e.title}-${n.name}`, t);
	}
	function rh(e, t) {
		for (let n of e?.layers ?? []) {
			if (n.type === "image" && th(n.props, "src", "background", t), n.type === "slideshow") for (let e of n.props.images ?? []) th(e, "src", "background", t);
			n.type === "video" && (th(n.props, "src", "video", t), th(n.props, "poster", "plakat", t));
		}
	}
	function ih(e, t) {
		if (e.type === "image" && th(e.props, "src", e.props.alt, t), e.type === "icon" && th(e.props, "image", "ikon", t), e.type === "gallery") for (let n of e.props.images ?? []) th(n, "src", n.alt || "gallery", t);
		e.type === "audio" && th(e.props, "src", e.props.title || "lyd", t);
	}
	function ah(e, t) {
		rh(e.background, t);
		for (let n of e.blocks) ih(n, t);
	}
	function oh(e) {
		let t = [];
		e.meta?.og && th(e.meta.og, "image", "share", t);
		for (let n of e.sections) ah(n, t);
		return t;
	}
	function sh(e) {
		let t = [], n = e.nav?.logo;
		return n?.type === "image" && th(n, "value", "logo", t), n?.type === "both" && th(n, "image", "logo", t), e.nav?.style && th(e.nav.style, "image", "menu", t), rh(e.nav?.style?.background, t), rh(e.footer?.background, t), e.footer?.brand && th(e.footer.brand, "logo", "footer-logo", t), th(e.site, "icon", "ikon", t), t;
	}
	let ch = /* @__PURE__ */ N(!1), lh = /* @__PURE__ */ N(null);
	function uh() {
		P(ch, !B(ch));
	}
	function dh() {
		P(ch, !1), fh();
	}
	xn(() => {
		if (!B(ch)) return;
		let e = (e) => {
			B(lh)?.contains(e.target) || P(ch, !1);
		}, t = (e) => {
			e.key === "Escape" && P(ch, !1);
		}, n = () => P(ch, !1);
		return window.addEventListener("click", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			window.removeEventListener("click", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	function fh() {
		qe("discard");
		for (let e of B(k).pages) e.id !== B(_) && !ze.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = D.reset();
		if (Ie.reset(), pc && (pc.reset(), jc()), hs) {
			hs.reset(), P(_s, [...hs.data.samlinger ?? []], !0);
			for (let e of Object.keys(Q)) B(_s).includes(e) ? Q[e].reset() : delete Q[e];
			Is();
		}
		if (Cs) {
			Cs.reset(), P(Ds, [...Cs.data.maler ?? []], !0);
			for (let e of Object.keys(ws)) B(Ds).includes(e) ? ws[e].reset() : (localStorage.removeItem(`urd-draft-template-${e}`), localStorage.removeItem(`urd-draft-mal-${e}`), delete ws[e]);
			ks();
		}
		Le(), P(T, {
			snap: !0,
			...B(k).grid
		}, !0), Ve(), P(y, ""), Re(), B(k).pages.some((e) => e.id === B(_)) ? O?.sendPage(B(_), e) : Fi(B(k).pages[0].id);
	}
	async function ph() {
		if (hi) {
			S(X("status.revertReloadBeforePublish"), "error");
			return;
		}
		if (B(Ti)) {
			S(X("update.publishBlocked"), "error");
			return;
		}
		S(X("status.publishing"));
		let e = [], t = [], n = [], r = [];
		for (let i of B(k).pages) {
			let a = `urd-draft-${i.id}`, o = ze.has(i.id) || !B(g).pages.some((e) => e.id === i.id), s = null;
			if (i.id === B(_) && (D.hasDraft() || o)) s = D.data;
			else if (i.id !== B(_)) {
				let e = localStorage.getItem(a);
				if (e) try {
					s = cs(JSON.parse(e), Ie.data);
				} catch {}
			}
			if (!s && o && (s = Pi(i)), !s) continue;
			let c = JSON.parse(JSON.stringify(s));
			e.push(...oh(c)), e.push({
				path: i.file,
				content: JSON.stringify(c, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (Ie.hasDraft()) {
			let r = JSON.parse(JSON.stringify(B(k)));
			e.push(...sh(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), e.push({
				path: "content/theme.css",
				content: Nc(r.theme),
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(B(g).theme, B(k).theme) || t.push(X("publish.part.theme")), i(B(g).nav, B(k).nav) || t.push(X("publish.part.nav")), i(B(g).footer, B(k).footer) || t.push(X("publish.part.footer")), i(B(g).pages, B(k).pages) || t.push(X("publish.part.pages")), i(B(g).grid, B(k).grid) || t.push(X("publish.part.grid")), (B(g).site.icon ?? null) !== (B(k).site.icon ?? null) && t.push(X("publish.part.icon"));
			let { icon: a, ...o } = B(g).site, { icon: s, ...c } = B(k).site;
			i(o, c) || t.push(X("publish.part.siteInfo"));
		}
		let i = Object.entries(Q).filter(([, e]) => e.hasDraft());
		if (i.length || hs?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) nh(t, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), ec.includes(i.kind) && e.push({
					path: `content/samlinger/${t}.xml`,
					content: tc({
						title: i.name ?? t,
						origin: location.origin,
						path: `/content/samlinger/${t}.xml`,
						items: i.entries.map((e) => ({
							id: e.id,
							title: Bs(e.title),
							text: Bs(e.text),
							date: e.date,
							href: e.href
						}))
					}),
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (hs?.hasDraft()) {
				e.push({
					path: "content/collections.json",
					content: JSON.stringify(hs.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-collections", "urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/collections.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!B(_s).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push(X("publish.part.collections"));
		}
		let a = Object.entries(ws).filter(([, e]) => e.hasDraft());
		if (a.length || Cs?.hasDraft()) {
			for (let [t, r] of a) {
				let i = JSON.parse(JSON.stringify(r.data));
				i.section && ah(i.section, e);
				for (let t of i.blocks ?? []) ih(t, e);
				for (let t of i.page?.sections ?? []) ah(t, e);
				e.push({
					path: `content/maler/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-mal-${t}`);
			}
			if (Cs?.hasDraft()) {
				e.push({
					path: "content/maler.json",
					content: JSON.stringify(Cs.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-templates", "urd-draft-maler");
				let t = { maler: [] };
				try {
					t = await (await fetch("/content/maler.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.maler ?? []) {
					let t = `content/maler/${n}.json`;
					!B(Ds).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push(X("publish.part.templates"));
		}
		pc?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(pc.data, null, 2) + "\n",
			encoding: "utf-8"
		}), n.push("urd-draft-plugins"), t.push(X("publish.part.plugins")));
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
			content: Qs(B(k).pages, location.origin),
			encoding: "utf-8"
		}), e.push({
			path: "robots.txt",
			content: $s(location.origin),
			encoding: "utf-8"
		});
		let o = new Set(e.map((e) => e.path)), s = (t) => {
			o.has(t) || e.push({
				path: t,
				delete: !0
			});
		};
		for (let e of B(g).pages) {
			let t = B(k).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && s(`${e.path.slice(1)}/index.html`) : (s(e.file), e.path !== "/" && s(`${e.path.slice(1)}/index.html`));
		}
		let c = await ci(e);
		if (!c.ok) {
			S(X("status.publishAborted"), "error");
			return;
		}
		let l = {
			message: X("publish.commitMessage", { titles: t.join(", ") || X("publish.theSite") }),
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
			t ? oi = t : si(), oh(D.data), sh(B(k));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) ze.add(e);
			if (P(g, JSON.parse(JSON.stringify(B(k))), !0), Ie = Qi("urd-draft-site", () => B(g), C), Le(), pc) {
				let e = JSON.parse(JSON.stringify(pc.data));
				pc = Qi("urd-draft-plugins", () => e, C), jc();
			}
			if (hs) {
				for (let e of Object.values(Q)) for (let t of e.data.entries) nh(t, []);
				let e = JSON.parse(JSON.stringify(hs.data));
				hs = Qi("urd-draft-collections", () => e, C, "urd-draft-samlinger"), $ = {};
				for (let e of B(_s)) {
					if (!Q[e]) continue;
					let t = JSON.parse(JSON.stringify(Q[e].data));
					$[e] = t, Q[e] = Qi(`urd-draft-collection-${e}`, () => t, C, `urd-draft-samling-${e}`);
				}
				Is();
			}
			if (Cs) {
				for (let e of Object.values(ws)) {
					e.data?.section && ah(e.data.section, []);
					for (let t of e.data?.blocks ?? []) ih(t, []);
					for (let t of e.data?.page?.sections ?? []) ah(t, []);
				}
				let e = JSON.parse(JSON.stringify(Cs.data));
				Cs = Qi("urd-draft-templates", () => e, C, "urd-draft-maler"), Ts = {};
				for (let e of B(Ds)) {
					if (!ws[e]) continue;
					let t = JSON.parse(JSON.stringify(ws[e].data));
					Ts[e] = t, ws[e] = Qi(`urd-draft-template-${e}`, () => t, C, `urd-draft-mal-${e}`);
				}
				ks();
			}
			P(T, {
				snap: !0,
				...B(k).grid
			}, !0);
			let i = JSON.parse(JSON.stringify(D.data));
			D = Qi(`urd-draft-${B(_)}`, () => i, C), ze.has(B(_)) && ee(`urd-draft-${B(_)}`, JSON.stringify(i)), Ve(), S(X("status.published"), "info"), xi(e);
		} else if (u?.status === 401) {
			let e = await u.json().catch(() => null);
			S(e?.code === "loginExpired" ? X("status.loginExpired") : X("status.loginRequired", { reason: Wi(e) ?? X("status.unknownReason") }), "error"), await ai();
		} else u?.status === 403 ? S(Wi(await u.json().catch(() => null)) ?? X("status.noPublishAccess"), "error") : u?.status === 409 ? S(X("status.publishRace"), "error") : S(u ? Wi(await u.json().catch(() => null)) ?? X("status.publishFailed") : X("status.publishUnavailable"), "error");
	}
	it();
	var mh = Pp();
	wr("keydown", tn, rt), wr("pointerdown", tn, nt);
	var hh = I(mh), gh = F(hh), _h = (e) => {
		var t = yd(), n = F(t);
		K(n, () => c.pencil);
		var r = R(n);
		E(t), z((e, n) => {
			Y(t, "title", e), W(r, ` ${n ?? ""}`);
		}, [() => X("tip.backToEdit"), () => X("ui.edit")]), V("click", t, bm), U(e, t);
	};
	G(gh, (e) => {
		B(ne) || e(_h);
	});
	var vh = R(gh, 2);
	let yh;
	var bh = F(vh), xh = F(bh), Sh = (e) => {
		var t = Ad(), n = I(t), r = L(n, !0), i = R(n, 2), a = F(i), o = (e) => {
			var t = Sd(), n = F(t);
			let r;
			var i = F(n);
			K(i, () => c[`device_${B(fe)}`]), K(R(i), () => c.caret), E(n);
			var a = R(n, 2), o = (e) => {
				var t = xd();
				Yr(t, 21, () => B(ue), (e) => e.id, (e, t) => {
					var n = bd();
					let r;
					var i = F(n);
					K(i, () => c[`device_${B(t).id}`]);
					var a = R(i);
					E(n), z((e, i) => {
						r = gi(n, 1, "ghost svelte-1n46o8q", null, r, { active: B(fe) === B(t).id }), Y(n, "title", e), W(a, ` ${i ?? ""}`);
					}, [() => de(B(t)), () => X(`lbl.device.${B(t).id}`)]), V("click", n, () => {
						P(fe, B(t).id, !0), P(Ki, null);
					}), U(e, n);
				}), E(t), U(e, t);
			};
			G(a, (e) => {
				B(Ki) === "device" && e(o);
			}), E(t), z((e) => {
				r = gi(n, 1, "ghost svelte-1n46o8q", null, r, { active: B(Ki) === "device" }), Y(n, "title", e);
			}, [() => X("lbl.group.device")]), V("click", n, () => P(Ki, B(Ki) === "device" ? null : "device", !0)), U(e, t);
		}, s = (e) => {
			var t = wd(), n = I(t), r = L(n, !0), i = R(n, 2);
			Yr(i, 21, () => B(ue), (e) => e.id, (e, t) => {
				var n = Cd();
				let r;
				K(n, () => c[`device_${B(t).id}`], !0), E(n), z((e) => {
					r = gi(n, 1, "ghost svelte-1n46o8q", null, r, { active: B(fe) === B(t).id }), Y(n, "title", e);
				}, [() => de(B(t))]), V("click", n, () => P(fe, B(t).id, !0)), U(e, n);
			}), E(i), z((e) => W(r, e), [() => X("lbl.group.device")]), U(e, t);
		};
		G(a, (e) => {
			Ji.device ? e(o) : e(s, -1);
		});
		var l = R(a, 2), u = (e) => {
			var t = Ed(), n = F(t);
			let r;
			var i = F(n), a = L(i);
			K(R(i), () => c.caret), E(n);
			var o = R(n, 2), s = (e) => {
				var t = Td(), n = F(t), r = F(n);
				K(r, () => c.minus, !0), E(r);
				var i = R(r, 2), a = L(i), o = R(i, 2);
				K(o, () => c.plus, !0), E(o), E(n);
				var s = R(n, 2);
				let l;
				var u = F(s);
				K(u, () => c.fit);
				var d = R(u);
				E(s), E(t), z((e, t, n, c, u, f) => {
					Y(r, "title", e), Y(i, "title", t), W(a, `${n ?? ""}%`), Y(o, "title", c), l = gi(s, 1, "ghost svelte-1n46o8q", null, l, { active: B(ve) === "fit" }), Y(s, "title", u), W(d, ` ${f ?? ""}`);
				}, [
					() => X("tip.zoomOut"),
					() => X("tip.zoomCurrent"),
					() => Math.round(B(Ce) * 100),
					() => X("tip.zoomIn"),
					() => X("tip.zoomFit"),
					() => X("lbl.zoom.fit")
				]), V("click", r, () => we(-1)), V("click", o, () => we(1)), V("click", s, () => P(ve, "fit")), U(e, t);
			};
			G(o, (e) => {
				B(Ki) === "zoom" && e(s);
			}), E(t), z((e, t) => {
				r = gi(n, 1, "ghost svelte-1n46o8q", null, r, { active: B(Ki) === "zoom" }), Y(n, "title", e), W(a, `${t ?? ""}%`);
			}, [() => X("lbl.group.zoom"), () => Math.round(B(Ce) * 100)]), V("click", n, () => P(Ki, B(Ki) === "zoom" ? null : "zoom", !0)), U(e, t);
		}, d = (e) => {
			var t = Dd(), n = I(t), r = L(n, !0), i = R(n, 2), a = F(i);
			K(a, () => c.minus, !0), E(a);
			var o = R(a, 2), s = L(o), l = R(o, 2);
			K(l, () => c.plus, !0), E(l);
			var u = R(l, 2);
			let d;
			K(u, () => c.fit, !0), E(u), E(i), z((e, t, n, i, c, f) => {
				W(r, e), Y(a, "title", t), Y(o, "title", n), W(s, `${i ?? ""}%`), Y(l, "title", c), d = gi(u, 1, "ghost svelte-1n46o8q", null, d, { active: B(ve) === "fit" }), Y(u, "title", f);
			}, [
				() => X("lbl.group.zoom"),
				() => X("tip.zoomOut"),
				() => X("tip.zoomCurrent"),
				() => Math.round(B(Ce) * 100),
				() => X("tip.zoomIn"),
				() => X("tip.zoomFit")
			]), V("click", a, () => we(-1)), V("click", l, () => we(1)), V("click", u, () => P(ve, "fit")), U(e, t);
		};
		G(l, (e) => {
			Ji.zoom ? e(u) : e(d, -1);
		});
		var f = R(l, 2), p = (e) => {
			var t = Sd(), n = F(t);
			let r;
			var i = F(n);
			K(i, () => c.gridToggle), K(R(i), () => c.caret), E(n);
			var a = R(n, 2), o = (e) => {
				var t = Od(), n = F(t);
				let r;
				var i = F(n);
				K(i, () => c.gridToggle);
				var a = R(i);
				E(n);
				var o = R(n, 2);
				let s;
				var l = F(o);
				K(l, () => c.guides);
				var u = R(l);
				E(o), E(t), z((e, t, i, c) => {
					r = gi(n, 1, "ghost svelte-1n46o8q", null, r, { active: B(Xi) }), Y(n, "title", e), W(a, ` ${t ?? ""}`), s = gi(o, 1, "ghost svelte-1n46o8q", null, s, { active: B(Ri) }), Y(o, "title", i), W(u, ` ${c ?? ""}`);
				}, [
					() => X("tip.gridToggle"),
					() => X("lbl.view.grid"),
					() => X("tip.guides"),
					() => X("lbl.view.guides")
				]), V("click", n, $i), V("click", o, Yi), U(e, t);
			};
			G(a, (e) => {
				B(Ki) === "view" && e(o);
			}), E(t), z((e) => {
				r = gi(n, 1, "ghost svelte-1n46o8q", null, r, { active: B(Ki) === "view" || B(Xi) || B(Ri) }), Y(n, "title", e);
			}, [() => X("lbl.group.view")]), V("click", n, () => P(Ki, B(Ki) === "view" ? null : "view", !0)), U(e, t);
		}, m = (e) => {
			var t = kd(), n = I(t), r = L(n, !0), i = R(n, 2), a = F(i);
			let o;
			K(a, () => c.gridToggle, !0), E(a);
			var s = R(a, 2);
			let l;
			K(s, () => c.guides, !0), E(s), E(i), z((e, t, n) => {
				W(r, e), o = gi(a, 1, "ghost svelte-1n46o8q", null, o, { active: B(Xi) }), Y(a, "title", t), l = gi(s, 1, "ghost svelte-1n46o8q", null, l, { active: B(Ri) }), Y(s, "title", n);
			}, [
				() => X("lbl.group.view"),
				() => X("tip.gridToggle"),
				() => X("tip.guides")
			]), V("click", a, $i), V("click", s, Yi), U(e, t);
		};
		G(f, (e) => {
			Ji.view ? e(p) : e(m, -1);
		}), E(i), ji(i, (e) => P(qi, e), () => B(qi)), z((e, t) => {
			Y(n, "title", e), W(r, t);
		}, [() => X("tip.switchPage"), () => Be()?.title ?? ""]), V("click", n, () => At("pages")), U(e, t);
	};
	G(xh, (e) => {
		B(g) && e(Sh);
	});
	var Ch = R(xh, 2), wh = (e) => {
		var t = jd(), n = F(t);
		K(n, () => c.phone);
		var r = R(n, 2), i = L(r, !0), a = L(R(r, 2), !0);
		E(t), z((e, n) => {
			Y(t, "title", e), W(i, n), W(a, B(Ae));
		}, [() => X("tip.attention"), () => X(B(Ae) === 1 ? "ui.attentionOne" : "ui.attentionMany", { n: B(Ae) })]), V("click", t, Me), U(e, t);
	};
	G(Ch, (e) => {
		B(Ae) > 0 && e(wh);
	}), E(bh);
	var Th = R(bh, 2), Eh = F(Th), Dh = (e) => {
		var t = Nd(), n = F(t), r = L(F(n), !0);
		ke(2), E(n);
		var i = R(n, 2), a = F(i);
		let o;
		var s = F(a);
		K(s, () => c.restore);
		var l = L(R(s), !0);
		E(a);
		var u = R(a, 2), d = (e) => {
			var t = Md(), n = F(t);
			K(n, () => c.restore);
			var r = R(n);
			E(t), z((e, n) => {
				Y(t, "title", e), W(r, ` ${n ?? ""}`);
			}, [() => X("tip.discardArmed"), () => X("ui.discardConfirm")]), V("click", t, dh), U(e, t);
		};
		G(u, (e) => {
			B(ch) && e(d);
		}), E(i), ji(i, (e) => P(lh, e), () => B(lh)), E(t), z((e, t, i, s, c) => {
			Y(n, "title", e), Y(n, "aria-label", t), W(r, i), o = gi(a, 1, "discard-dot svelte-1n46o8q", null, o, { armed: B(ch) }), Y(a, "title", s), W(l, c);
		}, [
			() => X("ui.unpublished"),
			() => X("ui.unpublished"),
			() => X("ui.unpublished"),
			() => B(ch) ? X("tip.discardArmed") : X("tip.discard"),
			() => X("ui.discard")
		]), V("click", a, uh), li(2, t, () => Zi, () => ({
			x: 24,
			duration: Ft ? 0 : 150
		})), U(e, t);
	};
	G(Eh, (e) => {
		B(v) && e(Dh);
	}), E(Th);
	var Oh = R(Th, 2), kh = F(Oh), Ah = (e) => {
		var t = Ld(), n = I(t), r = F(n), i = (e) => {
			var t = Pd(), n = I(t);
			K(n, () => c.eye);
			var r = L(R(n, 2), !0);
			z((e) => W(r, e), [() => X("ui.cleanView")]), U(e, t);
		}, a = (e) => {
			var t = Pd(), n = I(t);
			K(n, () => c.pencil);
			var r = L(R(n, 2), !0);
			z((e) => W(r, e), [() => X("ui.edit")]), U(e, t);
		};
		G(r, (e) => {
			B(ne) ? e(i) : e(a, -1);
		}), E(n);
		var o = R(n, 2), s = (e) => {
			var t = Fd(), n = F(t), r = (e) => {
				var t = Pr();
				K(I(t), () => c.warn), U(e, t);
			};
			G(n, (e) => {
				B(te).allowed || e(r);
			});
			var i = R(n, 1, !0);
			E(t), z((e) => {
				Y(t, "title", e), W(i, B(te).login);
			}, [() => B(te).allowed ? X("tip.hasPublishAccess") : X("tip.noPublishAccess")]), U(e, t);
		}, l = (e) => {
			var t = Id(), n = L(t, !0);
			z((e) => W(n, e), [() => X("ui.loginGitHub")]), U(e, t);
		};
		G(o, (e) => {
			B(te)?.loggedIn ? e(s) : B(te) && e(l, 1);
		});
		var u = R(o, 2), d = F(u);
		K(d, () => c.external);
		var f = L(R(d, 2), !0);
		E(u);
		var p = R(u, 2), m = L(p, !0);
		z((e, t, r, i, a) => {
			Y(n, "title", e), Y(u, "href", t), Y(u, "title", r), W(f, i), p.disabled = !B(v), W(m, a);
		}, [
			() => B(ne) ? X("tip.chromeHide") : X("tip.chromeShow"),
			() => Be()?.path ?? "/",
			() => X("ui.viewSite"),
			() => X("ui.viewSite"),
			() => X("ui.publish")
		]), V("click", n, bm), V("click", p, ph), U(e, t);
	};
	G(kh, (e) => {
		B(g) && e(Ah);
	}), E(Oh), E(vh);
	var jh = R(vh, 2), Mh = (e) => {
		var t = Dp(), i = F(t), o = (e) => {
			var t = Ep(), i = I(t), o = F(i);
			Yr(o, 17, () => yt, Gr, (e, t, n) => {
				var r = zd(), i = I(r), a = L(i, !0);
				Yr(R(i, 2), 16, () => B(t), (e) => e, (e, t) => {
					var n = Rd();
					let r;
					var i = L(n, !0);
					z(() => {
						r = gi(n, 1, "svelte-1n46o8q", null, r, { active: B(vt) === t }), W(i, xt[t]);
					}), V("click", n, () => At(t)), U(e, n);
				}), z((e) => W(a, e), [() => X(bt[n])]), U(e, r);
			});
			var s = R(o, 2), u = R(F(s), 2);
			let p;
			K(u, () => c.gear, !0), E(u);
			var g = R(u, 2), v = (e) => {
				var t = Hd(), n = F(t), r = L(n, !0), i = R(n, 2), a = F(i);
				Z(R(a), {
					get value() {
						return B(d);
					},
					get options() {
						return l;
					},
					onchange: (e) => P(d, e, !0)
				}), E(i);
				var o = R(i, 2), s = F(o), c = R(s);
				{
					let e = /* @__PURE__ */ A(() => [["auto", X("lang.auto")], ...Et()]);
					Z(c, {
						get value() {
							return Ot;
						},
						get options() {
							return B(e);
						},
						onchange: kt
					});
				}
				E(o);
				var u = R(o, 2), f = F(u), p = R(f);
				{
					let e = /* @__PURE__ */ A(() => [["strip", X("settings.layoutPickerStrip")], ["menu", X("settings.layoutPickerMenu")]]);
					Z(p, {
						get value() {
							return B(Bi);
						},
						get options() {
							return B(e);
						},
						onchange: Vi
					});
				}
				E(u);
				var m = R(u, 2), h = L(m, !0), g = R(m, 2), _ = F(g);
				let v;
				var y = L(_, !0), b = R(_, 2);
				let x;
				var S = L(b, !0);
				E(g);
				var C = R(g, 2), ee = (e) => {
					var t = Bd(), n = F(t), r = L(n, !0), i = R(n, 2);
					q(i);
					var a = R(i, 2), o = L(a, !0), s = R(a, 2);
					q(s), E(t), z((e, t, n, a) => {
						W(r, e), Y(i, "min", 640), Y(i, "max", lo), Y(i, "title", t), J(i, B(oe).width), W(o, n), Y(s, "max", uo), Y(s, "title", a), J(s, B(oe).height || "");
					}, [
						() => X("lbl.screen.w"),
						() => X("tip.screen.width", {
							min: 640,
							max: lo
						}),
						() => X("lbl.screen.h"),
						() => X("tip.screen.height", {
							min: 480,
							max: uo
						})
					]), V("change", i, (e) => {
						se({ width: Number(e.target.value) }), e.target.value = B(oe).width;
					}), V("change", s, (e) => {
						se({ height: Number(e.target.value) }), e.target.value = B(oe).height || "";
					}), U(e, t);
				};
				G(C, (e) => {
					B(oe).mode === "custom" && e(ee);
				});
				var w = R(C, 2), te = (e) => {
					var t = Vd(), n = I(t), r = L(n, !0), i = R(n, 2), a = F(i), o = R(a);
					q(o), E(i), z((e, t, s, c, l) => {
						Y(n, "title", e), W(r, t), Y(i, "title", s), W(a, `${c ?? ""} `), Y(o, "placeholder", l), J(o, B(k).analytics?.token ?? "");
					}, [
						() => X("tip.analytics"),
						() => X("settings.analytics"),
						() => X("tip.analytics"),
						() => X("lbl.analyticsToken"),
						() => X("ph.analyticsToken")
					]), V("change", o, (e) => Va(e.target.value)), U(e, t);
				};
				G(w, (e) => {
					B(k) && e(te);
				}), E(t), z((e, t, n, c, l, d, p, C, ee, w, te, T) => {
					W(r, e), Y(i, "title", t), W(a, `${n ?? ""} `), Y(o, "title", c), W(s, `${l ?? ""} `), Y(u, "title", d), W(f, `${p ?? ""} `), Y(m, "title", C), W(h, ee), Y(g, "title", w), v = gi(_, 1, "svelte-1n46o8q", null, v, { on: B(oe).mode === "own" }), W(y, te), x = gi(b, 1, "svelte-1n46o8q", null, x, { on: B(oe).mode === "custom" }), W(S, T);
				}, [
					() => X("settings.title"),
					() => X("topbar.adminTheme.title"),
					() => X("settings.theme"),
					() => X("topbar.language.title"),
					() => X("settings.language"),
					() => X("tip.settings.layoutPicker"),
					() => X("settings.layoutPicker"),
					() => X("tip.screen.mode"),
					() => X("settings.screen"),
					() => X("tip.screen.mode"),
					() => X("lbl.screen.own"),
					() => X("lbl.screen.size")
				]), V("click", _, () => se({ mode: "own" })), V("click", b, () => se({ mode: "custom" })), U(e, t);
			};
			G(g, (e) => {
				B(zi) && e(v);
			}), E(s), ji(s, (e) => P(Hi, e), () => B(Hi)), E(i);
			var y = R(i, 2), b = (e) => {
				var t = Tp(), i = F(t), o = F(i), s = L(o, !0), l = R(o, 2), u = (e) => {
					var t = Ud();
					let n;
					K(t, () => c.foldToggle, !0), E(t), z((e, r) => {
						n = gi(t, 1, "fold-all fold-toggle svelte-1n46o8q", null, n, { collapse: B(Qp) }), Y(t, "title", e), Y(t, "aria-label", r);
					}, [() => X(B(Qp) ? "ui.collapseAll" : "ui.expandAll"), () => X(B(Qp) ? "ui.collapseAll" : "ui.expandAll")]), V("click", t, tm), U(e, t);
				};
				G(l, (e) => {
					B(Zp) && e(u);
				}), E(i);
				var d = R(i, 2), p = (e) => {
					var t = ef(), n = F(t);
					Yr(n, 17, () => B(k).pages, (e) => e.id, (e, t) => {
						var n = Yd();
						let r;
						var i = F(n);
						q(i);
						var a = R(i, 2), o = (e) => {
							var t = Wd();
							z((e) => Y(t, "title", e), [() => X("tip.pages.homeLocked")]), U(e, t);
						}, s = (e) => {
							var n = Gd();
							q(n), z((e, t) => {
								J(n, e), Y(n, "title", t);
							}, [() => B(t).path.slice(1), () => X("tip.pages.slug")]), V("change", n, (e) => Aa(B(t), e.target.value)), U(e, n);
						};
						G(a, (e) => {
							B(t).path === "/" ? e(o) : e(s, -1);
						});
						var l = R(a, 2), u = (e) => {
							var t = Kd();
							K(t, () => c.warn, !0), E(t), z((e) => Y(t, "title", e), [() => X("tip.pages.missingDescription")]), U(e, t);
						};
						G(l, (e) => {
							B(_a)[B(t).id] && e(u);
						});
						var d = R(l, 2), f = F(d);
						K(f, () => c.right, !0), E(f);
						var p = R(f, 2), m = F(p);
						K(m, () => c.kebab, !0), E(m);
						var h = R(m, 2), g = (e) => {
							var n = Jd(), r = F(n), i = F(r);
							K(i, () => c.bookmark);
							var a = R(i);
							E(r);
							var o = R(r, 2), s = (e) => {
								var n = qd(), r = F(n);
								K(r, () => c.cross);
								var i = R(r);
								E(n), z((e, t) => {
									Y(n, "title", e), W(i, ` ${t ?? ""}`);
								}, [() => X("tip.pages.delete"), () => X("ui.deletePage")]), V("click", n, () => {
									P(oa, null), ja(B(t));
								}), U(e, n);
							};
							G(o, (e) => {
								B(t).path !== "/" && e(s);
							}), E(n), z((e) => W(a, ` ${e ?? ""}`), [() => X("ui.savePageTemplate")]), V("click", r, () => ua(B(t))), U(e, n);
						};
						G(h, (e) => {
							B(oa) === B(t).id && e(g);
						}), E(p), E(d), E(n), z((e, a, o) => {
							r = gi(n, 1, "page-row svelte-1n46o8q", null, r, { current: B(t).id === B(_) }), J(i, B(t).title), Y(i, "title", e), Y(f, "title", a), f.disabled = B(t).id === B(_), Y(m, "title", o);
						}, [
							() => X("tip.pages.title"),
							() => X("tip.pages.open"),
							() => X("tip.pages.menu")
						]), V("change", i, (e) => da(B(t), e.target.value)), V("click", f, () => Fi(B(t).id)), V("click", m, () => P(oa, B(oa) === B(t).id ? null : B(t).id, !0)), U(e, n);
					});
					var r = R(n, 2), i = F(r), a = L(i, !0), o = R(i, 2), s = F(o), l = F(s), u = R(l);
					ut(u), E(s);
					var d = R(s, 2), f = F(d), p = R(f);
					q(p), E(d);
					var m = R(d, 2), h = F(m), g = R(h);
					ut(g), E(m);
					var v = R(m, 2), y = F(v), b = R(y), x = (e) => {
						var t = Xd();
						z((e) => {
							Y(t, "src", B(fa).ogImage), Y(t, "alt", e);
						}, [() => X("lbl.ogImage")]), U(e, t);
					};
					G(b, (e) => {
						B(fa).ogImage && e(x);
					}), E(v);
					var S = R(v, 2), C = F(S), ee = F(C), w = R(ee);
					E(C);
					var te = R(C, 2), T = (e) => {
						var t = Gl();
						K(t, () => c.cross, !0), E(t), z((e) => Y(t, "title", e), [() => X("tip.seo.removeOgImage")]), V("click", t, () => ma("ogImage", "")), U(e, t);
					};
					G(te, (e) => {
						B(fa).ogImage && e(T);
					}), E(S);
					var ne = R(S, 2), re = F(ne);
					q(re);
					var ie = R(re);
					E(ne), E(o), E(r);
					var ae = R(r, 4);
					q(ae);
					var oe = R(ae, 2), se = L(oe, !0), ce = R(oe, 2), le = L(ce, !0), ue = R(ce, 2), de = F(ue);
					let fe;
					var pe = F(de), me = F(pe);
					K(me, () => Sc({ sections: [] }), !0), E(me);
					var he = L(R(me, 2), !0);
					E(pe), E(de), Yr(R(de, 2), 17, () => wc, (e) => e.id, (e, t) => {
						var n = Zd();
						let r;
						var i = F(n), a = F(i);
						K(a, () => ia[B(t).id], !0), E(a);
						var o = L(R(a, 2), !0);
						E(i), E(n), z((e, a) => {
							r = gi(n, 1, "page-template-card svelte-1n46o8q", null, r, { picked: B(ra) === `preset:${B(t).id}` }), Y(i, "title", e), W(o, a);
						}, [() => X("tip.pages.templatePick", { name: X(B(t).labelKey) }), () => X(B(t).labelKey)]), V("click", i, () => P(ra, B(ra) === `preset:${B(t).id}` ? null : `preset:${B(t).id}`, !0)), U(e, n);
					}), E(ue);
					var ge = R(ue, 2), _e = (e) => {
						var t = $d(), n = I(t), r = L(n, !0), i = R(n, 2);
						Yr(i, 20, () => B(Ds).filter((e) => ws[e]?.data?.mal?.kind === "page"), (e) => e, (e, t) => {
							var n = Qd();
							let r;
							var i = F(n), a = F(i);
							K(a, () => Sc(ws[t].data.page), !0), E(a);
							var o = L(R(a, 2), !0);
							E(i);
							var s = R(i, 2);
							K(s, () => c.cross, !0), E(s), E(n), z((e, a) => {
								r = gi(n, 1, "page-template-card svelte-1n46o8q", null, r, { picked: B(ra) === t }), Y(i, "title", e), W(o, ws[t].data.mal.name), Y(s, "title", a);
							}, [() => X("tip.pages.templatePick", { name: ws[t].data.mal.name }), () => X("canvas.deleteTemplate")]), V("click", i, () => P(ra, B(ra) === t ? null : t, !0)), V("click", s, () => Ps({ id: t })), U(e, n);
						}), E(i), z((e) => {
							W(r, e), vi(i, B(aa));
						}, [() => X("canvas.tabMyTemplates")]), U(e, t);
					}, ve = /* @__PURE__ */ A(() => B(Ds).some((e) => ws[e]?.data?.mal?.kind === "page"));
					G(ge, (e) => {
						B(ve) && e(_e);
					}), E(t), z((e, t, n, r, i, o, c, _, b, x, S, w, te, T, ce, me, ge, _e, ve, ye, be, xe) => {
						W(a, e), Y(s, "title", t), W(l, `${n ?? ""} `), J(u, B(fa).description), Y(d, "title", r), W(f, `${i ?? ""} `), J(p, B(fa).ogTitle), Y(p, "placeholder", o), Y(m, "title", c), W(h, `${_ ?? ""} `), J(g, B(fa).ogDescription), Y(g, "placeholder", B(fa).description), Y(v, "title", b), W(y, `${x ?? ""} `), Y(C, "title", S), W(ee, `${w ?? ""} `), Y(ne, "title", te), Ci(re, T), W(ie, ` ${ce ?? ""}`), Y(ae, "placeholder", me), Y(oe, "title", ge), oe.disabled = _e, W(se, ve), W(le, ye), vi(ue, B(aa)), fe = gi(de, 1, "page-template-card svelte-1n46o8q", null, fe, { picked: B(ra) === null }), Y(pe, "title", be), W(he, xe);
					}, [
						() => X("ui.seoGroup", { page: B(k).pages.find((e) => e.id === B(_))?.title ?? "" }),
						() => X("tip.seo.description"),
						() => X("lbl.seoDescription"),
						() => X("tip.seo.ogTitle"),
						() => X("lbl.ogTitle"),
						() => B(k).pages.find((e) => e.id === B(_))?.title ?? "",
						() => X("tip.seo.ogDescription"),
						() => X("lbl.ogDescription"),
						() => X("tip.seo.ogImage"),
						() => X("lbl.ogImage"),
						() => X("tip.seo.ogImage"),
						() => B(fa).ogImage ? X("ui.changeImage") : X("ui.chooseImage"),
						() => X("tip.seo.hideFromSearch"),
						() => B(k).pages.find((e) => e.id === B(_))?.noindex === !0,
						() => X("lbl.hideFromSearch"),
						() => X("ph.newPageName"),
						() => X("hint.pages.autoMenu"),
						() => !B(na).trim(),
						() => X("ui.createPage"),
						() => X("canvas.tabPresets"),
						() => X("tip.pages.blankPick"),
						() => X("ui.blankPage")
					]), V("change", u, (e) => ma("description", e.target.value)), V("change", p, (e) => ma("ogTitle", e.target.value)), V("change", g, (e) => ma("ogDescription", e.target.value)), V("change", w, ya), V("change", re, (e) => ha(e.target.checked)), V("keydown", ae, (e) => e.key === "Enter" && la()), Di(ae, () => B(na), (e) => P(na, e)), V("click", oe, la), V("click", pe, () => P(ra, null)), U(e, t);
				}, g = (e) => {
					var t = hf(), r = F(t), i = F(r), a = L(i, !0), o = R(i, 2), s = F(o), l = F(s), u = R(l);
					{
						let e = /* @__PURE__ */ A(() => B(k).nav.logo?.type ?? "text"), t = /* @__PURE__ */ A(() => [
							["text", X("blocks.text")],
							["image", X("blocks.image")],
							["both", X("opt.logo.both")]
						]);
						Z(u, {
							get value() {
								return B(e);
							},
							get options() {
								return B(t);
							},
							onchange: (e) => Na(e)
						});
					}
					E(s);
					var d = R(s, 2), f = (e) => {
						var t = tf(), n = I(t);
						q(n);
						var r = R(n, 2), i = F(r);
						{
							let e = /* @__PURE__ */ A(() => X("tip.nav.logoFont")), t = /* @__PURE__ */ A(() => B(k).nav.logo?.font ?? ""), n = /* @__PURE__ */ A(() => [["", X("common.inherit")], ...Hl.map(([e, t]) => [t, X(e)])]);
							Z(i, {
								get title() {
									return B(e);
								},
								get value() {
									return B(t);
								},
								get options() {
									return B(n);
								},
								onchange: (e) => Ma({ font: e || void 0 })
							});
						}
						var a = R(i, 2);
						q(a);
						var o = R(a, 2);
						let s;
						var c = L(F(o), !0);
						E(o);
						var l = R(o, 2);
						let u;
						var d = L(F(l), !0);
						E(l), E(r), z((e, t, r, i, f, p, m) => {
							J(n, B(k).nav.logo?.value ?? ""), Y(n, "placeholder", e), Y(a, "title", t), J(a, B(k).nav.logo?.textSize ?? ""), s = gi(o, 1, "tbtn svelte-1n46o8q", null, s, { active: B(k).nav.logo?.bold !== !1 }), Y(o, "title", r), W(c, i), u = gi(l, 1, "tbtn svelte-1n46o8q", null, u, { active: f }), Y(l, "title", p), W(d, m);
						}, [
							() => X("ph.nav.logoName"),
							() => X("tip.nav.textSize"),
							() => X("format.bold"),
							() => X("format.boldLetter"),
							() => !!B(k).nav.logo?.italic,
							() => X("format.italic"),
							() => X("format.italicLetter")
						]), V("input", n, (e) => Ma({ value: e.target.value })), V("change", a, (e) => Ma({ textSize: e.target.value ? Number(e.target.value) : void 0 })), V("click", o, () => Ma({ bold: B(k).nav.logo?.bold === !1 })), V("click", l, () => Ma({ italic: !B(k).nav.logo?.italic })), U(e, t);
					};
					G(d, (e) => {
						(B(k).nav.logo?.type ?? "text") !== "image" && e(f);
					});
					var p = R(d, 2), m = (e) => {
						var t = nf(), n = I(t), r = F(n), i = F(r), a = R(i);
						E(r);
						var o = R(r, 2);
						q(o);
						var s = R(o, 2);
						q(s), E(n);
						var c = R(n, 2), l = F(c), u = L(l, !0), d = R(l, 2);
						q(d), E(c), z((e, t, n, a, l, f) => {
							Y(r, "title", e), W(i, `${t ?? ""} `), Y(o, "title", n), J(o, B(k).nav.logo?.size ?? 32), Y(s, "title", a), J(s, B(k).nav.logo?.radius ?? 0), Y(c, "title", l), W(u, f), Y(d, "min", Po.min), Y(d, "max", Po.max), J(d, B(k).nav.logo?.mobileSize ?? "");
						}, [
							() => X("tip.webpAuto"),
							() => (B(k).nav.logo?.type === "image" ? B(k).nav.logo?.value : B(k).nav.logo?.image) ? X("ui.changeImage") : X("ui.chooseImage"),
							() => X("tip.nav.logoHeight"),
							() => X("tip.nav.logoRadius"),
							() => X("tip.nav.logoHeightMobile"),
							() => X("lbl.navLogoHeightMobile")
						]), V("change", a, Pa), V("change", o, (e) => Ma({ size: Number(e.target.value) })), V("change", s, (e) => Ma({ radius: Number(e.target.value) })), V("change", d, (e) => {
							let t = e.target.value;
							Ma({ mobileSize: t === "" ? void 0 : zo(t, Po, void 0) }), e.target.value = B(k).nav.logo?.mobileSize ?? "";
						}), U(e, t);
					};
					G(p, (e) => {
						(B(k).nav.logo?.type ?? "text") !== "text" && e(m);
					});
					var h = R(p, 2), g = (e) => {
						var t = lu(), n = F(t), r = R(n);
						{
							let e = /* @__PURE__ */ A(() => B(k).nav.logo?.order ?? "image-first"), t = /* @__PURE__ */ A(() => [["image-first", X("opt.logo.imageFirst")], ["text-first", X("opt.logo.textFirst")]]);
							Z(r, {
								get value() {
									return B(e);
								},
								get options() {
									return B(t);
								},
								onchange: (e) => Ma({ order: e })
							});
						}
						E(t), z((e) => W(n, `${e ?? ""} `), [() => X("lbl.order")]), U(e, t);
					};
					G(h, (e) => {
						B(k).nav.logo?.type === "both" && e(g);
					}), E(o), E(r);
					var _ = R(r, 2), v = F(_), y = L(v, !0), b = R(v, 2), x = F(b), S = F(x), C = L(S, !0), ee = R(S, 2), w = F(ee), te = F(w), T = R(te);
					{
						let e = /* @__PURE__ */ A(() => B(k).nav.variant ?? "bar"), t = /* @__PURE__ */ A(() => [
							["bar", X("opt.navVariant.bar")],
							["floating", X("opt.navVariant.floating")],
							["floating-square", X("opt.navVariant.floatingSquare")],
							["floating-tab", X("opt.navVariant.floatingTab")],
							["side-left", X("opt.navVariant.sideLeft")],
							["side-right", X("opt.navVariant.sideRight")]
						]);
						Z(T, {
							get value() {
								return B(e);
							},
							get options() {
								return B(t);
							},
							onchange: (e) => os(e)
						});
					}
					E(w);
					var ne = R(w, 2), re = (e) => {
						var t = af(), n = I(t), r = F(n), i = R(r);
						{
							let e = /* @__PURE__ */ A(() => B(k).nav.style?.pillWidth === "content" ? "content" : "custom"), t = /* @__PURE__ */ A(() => [["content", X("opt.pillWidth.content")], ["custom", X("opt.pillWidth.custom")]]);
							Z(i, {
								get value() {
									return B(e);
								},
								get options() {
									return B(t);
								},
								onchange: (e) => Fo("pillWidth", e === "content" ? "content" : void 0)
							});
						}
						E(n);
						var a = R(n, 2), o = (e) => {
							var t = rf(), n = F(t), r = L(n, !0), i = R(n, 2);
							q(i), E(t), z((e, n) => {
								Y(t, "title", e), W(r, n), Y(i, "min", Ao.min), Y(i, "max", Ao.max), Y(i, "step", Ao.step), J(i, typeof B(k).nav.style?.pillWidth == "number" ? B(k).nav.style.pillWidth : "");
							}, [() => X("tip.nav.pillWidthPx"), () => X("lbl.navPillWidthPx")]), V("change", i, (e) => qo(e, "pillWidth", Ao)), U(e, t);
						};
						G(a, (e) => {
							B(k).nav.style?.pillWidth !== "content" && e(o);
						});
						var s = R(a, 2), c = F(s), l = L(c, !0), u = R(c, 2);
						q(u), E(s), z((e, t, i, a) => {
							Y(n, "title", e), W(r, `${t ?? ""} `), Y(s, "title", i), W(l, a), Y(u, "min", Mo.min), Y(u, "max", Mo.max), Y(u, "step", Mo.step), Y(u, "placeholder", B(k).nav.variant === "floating-square" ? "0" : B(k).nav.variant === "floating-tab" ? "12" : "999"), J(u, typeof B(k).nav.style?.radius == "number" ? B(k).nav.style.radius : "");
						}, [
							() => X("tip.nav.pillWidth"),
							() => X("lbl.navPillWidth"),
							() => X("tip.nav.radius"),
							() => X("lbl.navRadius")
						]), V("change", u, (e) => qo(e, "radius", Mo)), U(e, t);
					};
					G(ne, (e) => {
						B(Ro) && e(re);
					});
					var ie = R(ne, 2), ae = F(ie), oe = R(ae), se = (e) => {
						{
							let t = /* @__PURE__ */ A(() => B(k).nav.style?.sidePlacement ?? "top"), n = /* @__PURE__ */ A(() => [
								["top", X("opt.place.top")],
								["middle", X("opt.place.middle")],
								["bottom", X("opt.place.bottom")]
							]);
							Z(e, {
								get value() {
									return B(t);
								},
								get options() {
									return B(n);
								},
								onchange: (e) => Fo("sidePlacement", e === "top" ? void 0 : e)
							});
						}
					}, ce = (e) => {
						{
							let t = /* @__PURE__ */ A(() => B(k).nav.layout ?? "right"), n = /* @__PURE__ */ A(() => [
								["right", X("common.right")],
								["center", X("common.center")],
								["left", X("opt.layout.leftAfterLogo")]
							]);
							Z(e, {
								get value() {
									return B(t);
								},
								get options() {
									return B(n);
								},
								onchange: (e) => po(e)
							});
						}
					};
					G(oe, (e) => {
						B(Lo) ? e(se) : e(ce, -1);
					}), E(ie);
					var le = R(ie, 2), ue = (e) => {
						var t = of(), n = I(t), r = F(n);
						q(r);
						var i = R(r);
						E(n);
						var a = R(n, 2), o = F(a);
						q(o);
						var s = R(o);
						E(a), z((e, t, c, l) => {
							Y(n, "title", e), Ci(r, B(k).nav.style?.glow === !0), W(i, ` ${t ?? ""}`), Y(a, "title", c), Ci(o, B(k).nav.style?.topGap !== !1), W(s, ` ${l ?? ""}`);
						}, [
							() => X("tip.nav.glow"),
							() => X("lbl.navGlow"),
							() => X("tip.nav.topGap"),
							() => X("lbl.navTopGap")
						]), V("change", r, (e) => ls(e.target.checked)), V("change", o, (e) => us(e.target.checked)), U(e, t);
					};
					G(le, (e) => {
						B(Ro) && e(ue);
					});
					var de = R(le, 2), fe = (e) => {
						var t = of(), n = I(t), r = F(n);
						q(r);
						var i = R(r);
						E(n);
						var a = R(n, 2), o = F(a);
						q(o);
						var s = R(o);
						E(a), z((e, t, c, l) => {
							Y(n, "title", e), Ci(r, B(k).nav.overlay === !0), W(i, ` ${t ?? ""}`), Y(a, "title", c), Ci(o, B(k).nav.style?.inset === !0), W(s, ` ${l ?? ""}`);
						}, [
							() => X("tip.nav.overlay"),
							() => X("lbl.navOverlay"),
							() => X("tip.nav.inset"),
							() => X("lbl.navInset")
						]), V("change", r, (e) => ta("nav", () => {
							e.target.checked ? B(k).nav.overlay = !0 : delete B(k).nav.overlay;
						})), V("change", o, (e) => Fo("inset", e.target.checked ? !0 : void 0)), U(e, t);
					};
					G(de, (e) => {
						!B(Ro) && !B(Lo) && e(fe);
					});
					var pe = R(de, 2), me = (e) => {
						var t = sf(), n = I(t), r = F(n), i = R(r);
						{
							let e = /* @__PURE__ */ A(() => B(k).nav.style?.sideAlign ?? "left"), t = /* @__PURE__ */ A(() => [
								["left", X("common.left")],
								["center", X("common.center")],
								["right", X("common.right")]
							]);
							Z(i, {
								get value() {
									return B(e);
								},
								get options() {
									return B(t);
								},
								onchange: (e) => Fo("sideAlign", e === "left" ? void 0 : e)
							});
						}
						E(n);
						var a = R(n, 2), o = F(a), s = L(o, !0), c = R(o, 2);
						q(c), E(a), z((e, t, i, o) => {
							Y(n, "title", e), W(r, `${t ?? ""} `), Y(a, "title", i), W(s, o), Y(c, "min", No.min), Y(c, "max", No.max), J(c, B(k).nav.style?.width ?? 250);
						}, [
							() => X("tip.nav.sideAlign"),
							() => X("lbl.textAlign"),
							() => X("tip.nav.colWidth"),
							() => X("lbl.navColWidth")
						]), V("change", c, (e) => {
							let t = zo(e.target.value, No, 250);
							Fo("width", t === 250 ? void 0 : t), e.target.value = B(k).nav.style?.width ?? 250;
						}), U(e, t);
					};
					G(pe, (e) => {
						B(Lo) && e(me);
					}), E(ee), E(x);
					var he = R(x, 4), ge = F(he), _e = L(ge, !0), ve = R(ge, 2), ye = F(ve);
					Yr(ye, 20, () => Io, (e) => e, (e, t) => {
						var n = Rd();
						let r;
						var i = L(n, !0);
						z((e) => {
							r = gi(n, 1, "svelte-1n46o8q", null, r, { on: B(Uo) === t }), W(i, e);
						}, [() => X(`opt.size.${t}`)]), V("click", n, () => Ko(t)), U(e, n);
					}), E(ye);
					var be = R(ye, 2), xe = (e) => {
						var t = cf(), n = I(t), r = F(n);
						let i;
						var a = L(r, !0), o = R(r, 2);
						let s;
						var c = L(o, !0);
						E(n);
						var l = R(n, 2), u = F(l), d = L(u, !0), f = R(u, 2);
						q(f);
						var p = R(f, 2);
						q(p), E(l), z((e, t, u, m, h, g) => {
							Y(n, "title", e), i = gi(r, 1, "svelte-1n46o8q", null, i, { on: B(Qo) === "desktop" }), W(a, t), s = gi(o, 1, "svelte-1n46o8q", null, s, { on: B(Qo) === "mobile" }), W(c, u), Y(l, "title", m), W(d, h), Y(f, "min", Eo.min), Y(f, "max", Eo.max), Y(f, "step", Eo.step), J(f, B(Qo) === "mobile" ? B($o) : B(Wo)), Y(p, "min", Eo.min), Y(p, "max", Eo.max), Y(p, "placeholder", g), J(p, B(Qo) === "mobile" ? B(k).nav.style?.mobile?.padY ?? "" : B(Wo));
						}, [
							() => X("tip.nav.mobileSame"),
							() => X("lbl.device.desktop"),
							() => X("lbl.device.mobile"),
							() => X("tip.nav.thickness"),
							() => X("lbl.navThickness"),
							() => B(Qo) === "mobile" ? X("lbl.navSameAsDesktop") : ""
						]), V("click", r, () => {
							P(Zo, "desktop");
						}), V("click", o, () => {
							P(Zo, "mobile");
						}), V("input", f, (e) => ts("padY", e.target.valueAsNumber)), V("change", p, (e) => ns(e, "padY", Eo)), U(e, t);
					};
					G(be, (e) => {
						B(Lo) || e(xe);
					});
					var Se = R(be, 2), Ce = F(Se), we = L(Ce, !0), Te = R(Ce, 2);
					q(Te);
					var Ee = R(Te, 2);
					q(Ee), E(Se);
					var De = R(Se, 2), Oe = (e) => {
						var t = lf(), n = F(t), r = F(n), i = L(r, !0), a = R(r, 2);
						q(a), E(n);
						var o = R(n, 2), s = F(o), c = L(s, !0), l = R(s, 2);
						q(l), E(o), E(t), z((e, t, r, s, u, d) => {
							Y(n, "title", e), W(i, t), Y(a, "min", Oo.min), Y(a, "max", Oo.max), Y(a, "placeholder", r), J(a, B(k).nav.style?.padX ?? ""), Y(o, "title", s), W(c, u), Y(l, "min", ko.min), Y(l, "max", ko.max), Y(l, "placeholder", d), J(l, B(k).nav.style?.gap ?? "");
						}, [
							() => X("tip.nav.padX"),
							() => X("lbl.navPadX"),
							() => X("common.auto"),
							() => X("tip.nav.gap"),
							() => X("lbl.navGap"),
							() => X("common.auto")
						]), V("change", a, (e) => qo(e, "padX", Oo)), V("change", l, (e) => qo(e, "gap", ko)), U(e, t);
					};
					G(De, (e) => {
						!B(Lo) && B(Qo) === "desktop" && e(Oe);
					}), E(ve), E(he);
					var ke = R(he, 4), Ae = F(ke), je = L(Ae, !0), Me = R(Ae, 2), Ne = F(Me), Pe = (e) => {
						var t = df(), n = I(t), r = F(n), i = R(r);
						{
							let e = /* @__PURE__ */ A(() => B(k).nav.style?.border?.side ?? ""), t = /* @__PURE__ */ A(() => [
								["", X("common.none")],
								["bottom", X("opt.navBorder.bottom")],
								["top", X("opt.navBorder.top")],
								["both", X("opt.navBorder.both")],
								["all", X("opt.navBorder.all")]
							]);
							Z(i, {
								get value() {
									return B(e);
								},
								get options() {
									return B(t);
								},
								onchange: (e) => Fo("border", e ? {
									...B(k).nav.style?.border ?? {},
									side: e
								} : void 0)
							});
						}
						E(n);
						var a = R(n, 2), o = (e) => {
							var t = uf(), n = F(t), r = L(n, !0), i = R(n, 2);
							q(i);
							var a = R(i, 2), o = L(a, !0), s = R(a, 2);
							{
								let e = /* @__PURE__ */ A(() => B(k).nav.style.border.color ?? "text"), t = /* @__PURE__ */ A(Mr), n = /* @__PURE__ */ A(() => X("tip.nav.borderColorPick"));
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
									onchange: (e) => Fo("border", {
										...B(k).nav.style.border,
										color: e
									})
								});
							}
							E(t), z((e, t, s, c, l) => {
								Y(n, "title", e), W(r, t), Y(i, "title", s), J(i, B(k).nav.style.border.width ?? 1), Y(a, "title", c), W(o, l);
							}, [
								() => X("tip.nav.borderWidth"),
								() => X("lbl.navBorderWidth"),
								() => X("tip.nav.borderWidth"),
								() => X("tip.nav.borderColorPick"),
								() => X("lbl.navBorderColor")
							]), V("change", i, (e) => {
								let t = zo(e.target.value, {
									min: 1,
									max: 8
								}, 1), n = { ...B(k).nav.style.border };
								t === 1 ? delete n.width : n.width = t, Fo("border", n), e.target.value = B(k).nav.style.border.width ?? 1;
							}), U(e, t);
						};
						G(a, (e) => {
							B(k).nav.style?.border?.side && e(o);
						}), z((e, t) => {
							Y(n, "title", e), W(r, `${t ?? ""} `);
						}, [() => X("tip.nav.border"), () => X("lbl.navBorder")]), U(e, t);
					};
					G(Ne, (e) => {
						B(Lo) || e(Pe);
					});
					var Fe = R(Ne, 2), D = (e) => {
						var t = lu(), n = F(t), r = R(n);
						{
							let e = /* @__PURE__ */ A(() => B(k).nav.style?.shadow ?? ""), t = /* @__PURE__ */ A(() => [
								["", X("common.none")],
								["soft", X("opt.navShadow.soft")],
								["strong", X("opt.navShadow.strong")]
							]);
							Z(r, {
								get value() {
									return B(e);
								},
								get options() {
									return B(t);
								},
								onchange: (e) => Fo("shadow", e || void 0)
							});
						}
						E(t), z((e, r) => {
							Y(t, "title", e), W(n, `${r ?? ""} `);
						}, [() => X("tip.nav.shadow"), () => X("lbl.navShadow")]), U(e, t);
					};
					G(Fe, (e) => {
						!B(Ro) && !B(Lo) && e(D);
					});
					var Ie = R(Fe, 2), O = F(Ie);
					q(O);
					var Le = R(O);
					E(Ie), E(Me), E(ke);
					var Re = R(ke, 4), ze = F(Re), Be = L(ze, !0), Ve = R(ze, 2), He = F(Ve), Ue = (e) => {
						var t = pf(), n = I(t), r = F(n);
						q(r);
						var i = R(r);
						E(n);
						var a = R(n, 2), o = (e) => {
							var t = df(), n = I(t), r = F(n), i = R(r);
							{
								let e = /* @__PURE__ */ A(() => B(k).nav.scroll ?? "none"), t = /* @__PURE__ */ A(() => [
									["none", X("opt.scroll.none")],
									["shrink", X("opt.scroll.shrink")],
									["hide", X("opt.scroll.hide")]
								]);
								Z(i, {
									get value() {
										return B(e);
									},
									get options() {
										return B(t);
									},
									onchange: (e) => ta("nav", () => {
										e === "none" ? delete B(k).nav.scroll : B(k).nav.scroll = e;
									})
								});
							}
							E(n);
							var a = R(n, 2), o = (e) => {
								var t = ff(), n = I(t), r = F(n), i = L(r, !0), a = R(r, 2);
								q(a);
								var o = L(R(a, 2));
								E(n);
								var s = R(n, 2), c = (e) => {
									var t = Du(), n = F(t);
									q(n);
									var r = R(n);
									E(t), z((e, i) => {
										Y(t, "title", e), Ci(n, B(k).nav.style?.shrinkLogo === !0), W(r, ` ${i ?? ""}`);
									}, [() => X("tip.nav.shrinkLogo"), () => X("lbl.navShrinkLogo")]), V("change", n, (e) => Fo("shrinkLogo", e.target.checked ? !0 : void 0)), U(e, t);
								};
								G(s, (e) => {
									(B(k).nav.logo?.type ?? "text") !== "text" && e(c);
								}), z((e, t, r, s) => {
									Y(n, "title", e), W(i, t), J(a, r), W(o, `${s ?? ""}%`);
								}, [
									() => X("tip.nav.shrinkTo"),
									() => X("lbl.navShrinkTo"),
									() => Math.round((B(k).nav.style?.shrinkTo ?? .5) * 100),
									() => Math.round((B(k).nav.style?.shrinkTo ?? .5) * 100)
								]), V("input", a, (e) => rs(e.target.valueAsNumber)), U(e, t);
							};
							G(a, (e) => {
								B(k).nav.scroll === "shrink" && e(o);
							}), z((e, t) => {
								Y(n, "title", e), W(r, `${t ?? ""} `);
							}, [() => X("tip.nav.scroll"), () => X("lbl.navScroll")]), U(e, t);
						};
						G(a, (e) => {
							B(k).nav.sticky !== !1 && e(o);
						});
						var s = R(a, 2), c = F(s);
						q(c);
						var l = R(c);
						E(s), z((e, t, a, o) => {
							Y(n, "title", e), Ci(r, B(k).nav.sticky !== !1), W(i, ` ${t ?? ""}`), Y(s, "title", a), Ci(c, B(k).nav.style?.atTop === "clear"), W(l, ` ${o ?? ""}`);
						}, [
							() => X("tip.nav.sticky"),
							() => X("lbl.navSticky"),
							() => X("tip.nav.atTop"),
							() => X("lbl.navAtTop")
						]), V("change", r, (e) => ta("nav", () => {
							B(k).nav.sticky = e.target.checked;
						})), V("change", c, (e) => Fo("atTop", e.target.checked ? "clear" : void 0)), U(e, t);
					};
					G(He, (e) => {
						B(Lo) || e(Ue);
					});
					var We = R(He, 2), Ge = F(We);
					q(Ge);
					var Ke = R(Ge);
					E(We);
					var qe = R(We, 2), Je = (e) => {
						var t = lu(), n = F(t), r = R(n);
						{
							let e = /* @__PURE__ */ A(() => B(k).nav.cart?.href ?? ""), t = /* @__PURE__ */ A(() => [["", X("common.none")], ...B(k).pages.map((e) => [e.path, e.title])]);
							Z(r, {
								get value() {
									return B(e);
								},
								get options() {
									return B(t);
								},
								onchange: (e) => ta("nav", () => {
									e ? B(k).nav.cart.href = e : delete B(k).nav.cart.href;
								})
							});
						}
						E(t), z((e, r) => {
							Y(t, "title", e), W(n, `${r ?? ""} `);
						}, [() => X("tip.cart.checkout"), () => X("lbl.checkoutPage")]), U(e, t);
					};
					G(qe, (e) => {
						B(k).nav.cart?.show && e(Je);
					}), E(Ve), E(Re);
					var Ye = R(Re, 4), Xe = F(Ye), Ze = L(Xe, !0), Qe = R(Xe, 2), $e = F(Qe), et = F($e), tt = R(et);
					{
						let e = /* @__PURE__ */ A(() => B(k).nav.style?.hover ?? "standard"), t = /* @__PURE__ */ A(() => [
							["standard", X("opt.hover.standard")],
							["underline", X("opt.hover.underline")],
							["pill", X("opt.hover.pill")],
							["lift-plain", X("opt.hover.liftPlain")],
							["lift", X("opt.hover.lift")]
						]);
						Z(tt, {
							get value() {
								return B(e);
							},
							get options() {
								return B(t);
							},
							onchange: (e) => fs(e)
						});
					}
					E($e);
					var nt = R($e, 2), rt = (e) => {
						var t = ru(), n = I(t), r = F(n), i = L(R(r));
						E(n);
						var a = R(n, 2);
						q(a), z((e, t, o) => {
							Y(n, "title", e), W(r, `${t ?? ""} `), W(i, `${o ?? ""}%`), J(a, B(k).nav.style?.hoverGlow ?? .6);
						}, [
							() => X("tip.nav.hoverGlow"),
							() => X("lbl.glowStrength"),
							() => Math.round((B(k).nav.style?.hoverGlow ?? .6) * 100)
						]), V("input", a, (e) => Fo("hoverGlow", Number(e.target.value))), U(e, t);
					};
					G(nt, (e) => {
						B(k).nav.style?.hover === "lift" && e(rt);
					});
					var it = R(nt, 2), at = (e) => {
						var t = lu(), n = F(t), r = R(n);
						{
							let e = /* @__PURE__ */ A(() => B(k).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ A(Mr);
							ga(r, {
								get value() {
									return B(e);
								},
								get tokens() {
									return B(t);
								},
								get label() {
									return B(as)[1];
								},
								onchange: (e) => Fo("hoverColor", e)
							});
						}
						E(t), z(() => {
							Y(t, "title", B(as)[1]), W(n, `${B(as)[0] ?? ""} `);
						}), U(e, t);
					};
					G(it, (e) => {
						B(as) && e(at);
					});
					var ot = R(it, 2), st = F(ot), ct = R(st);
					{
						let e = /* @__PURE__ */ A(() => B(k).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ A(Mr), n = /* @__PURE__ */ A(() => X("tip.nav.hoverTextColorPick"));
						ga(ct, {
							get value() {
								return B(e);
							},
							get tokens() {
								return B(t);
							},
							get label() {
								return B(n);
							},
							onchange: (e) => Fo("hoverTextColor", e)
						});
					}
					E(ot);
					var lt = R(ot, 2), ut = F(lt), dt = R(ut);
					{
						let e = /* @__PURE__ */ A(() => B(k).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ A(Mr), n = /* @__PURE__ */ A(() => X("tip.nav.textColorPick"));
						ga(dt, {
							get value() {
								return B(e);
							},
							get tokens() {
								return B(t);
							},
							get label() {
								return B(n);
							},
							onchange: (e) => Fo("textColor", e)
						});
					}
					E(lt), E(Qe), E(Ye);
					var ft = R(Ye, 4), pt = F(ft), mt = L(pt, !0), ht = R(pt, 2), gt = F(ht);
					n(gt, () => Dr, () => B(k).nav?.style?.background?.layers ?? []), E(ht), E(ft), E(b), E(_);
					var _t = R(_, 2), vt = F(_t), yt = L(vt, !0), bt = R(vt, 2), xt = F(bt), St = F(xt), Ct = R(St);
					{
						let e = /* @__PURE__ */ A(() => B(k).nav.style?.subStyle ?? "card"), t = /* @__PURE__ */ A(() => B(Lo) ? [
							["card", X("common.standard")],
							["pills", X("opt.sub.pills")],
							["lines", X("opt.sub.lines")]
						] : [
							["card", X("opt.sub.card")],
							["flat", X("opt.sub.flat")],
							["pills", X("opt.sub.pills")],
							["lines", X("opt.sub.lines")],
							["flyout", X("opt.sub.flyout")]
						]);
						Z(Ct, {
							get value() {
								return B(e);
							},
							get options() {
								return B(t);
							},
							onchange: (e) => Fo("subStyle", e === "card" ? void 0 : e)
						});
					}
					E(xt);
					var wt = R(xt, 2), Tt = (e) => {
						var t = lu(), n = F(t), r = R(n);
						{
							let e = /* @__PURE__ */ A(() => B(k).nav.style?.subOpen ?? "hover"), t = /* @__PURE__ */ A(() => [
								["hover", X("opt.subOpen.hover")],
								["stay", X("opt.subOpen.stay")],
								["click", X("opt.subOpen.click")]
							]);
							Z(r, {
								get value() {
									return B(e);
								},
								get options() {
									return B(t);
								},
								onchange: (e) => Fo("subOpen", e === "hover" ? void 0 : e)
							});
						}
						E(t), z((e, r) => {
							Y(t, "title", e), W(n, `${r ?? ""} `);
						}, [() => X("tip.nav.subOpen"), () => X("lbl.subOpen")]), U(e, t);
					}, Et = /* @__PURE__ */ A(() => B(k).nav.items?.some((e) => e.children?.length));
					G(wt, (e) => {
						B(Et) && e(Tt);
					});
					var Dt = R(wt, 2), Ot = (e) => {
						var t = lu(), n = F(t), r = R(n);
						{
							let e = /* @__PURE__ */ A(() => B(k).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ A(Mr), n = /* @__PURE__ */ A(() => X("tip.nav.subPillColorPick"));
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
								onchange: (e) => Fo("subPillColor", e)
							});
						}
						E(t), z((e, r) => {
							Y(t, "title", e), W(n, `${r ?? ""} `);
						}, [() => X("tip.nav.subPillColor"), () => X("lbl.subPillColor")]), U(e, t);
					};
					G(Dt, (e) => {
						B(k).nav.style?.subStyle === "pills" && e(Ot);
					});
					var kt = R(Dt, 2), At = F(kt), j = R(At);
					q(j), E(kt), E(bt), E(_t);
					var jt = R(_t, 2), Mt = F(jt), Nt = L(Mt, !0), Pt = R(Mt, 2), Ft = F(Pt);
					Yr(Ft, 17, () => B(k).nav.items, Gr, (e, t, n) => {
						var r = mf(), i = I(r), a = F(i);
						q(a);
						var o = R(a, 2), s = F(o);
						K(s, () => c.plus, !0), E(s);
						var l = R(s, 2);
						l.disabled = n === 0, K(l, () => c.up, !0), E(l);
						var u = R(l, 2);
						K(u, () => c.down, !0), E(u);
						var d = R(u, 2);
						K(d, () => c.cross, !0), E(d), E(o);
						var f = R(o, 2), p = F(f);
						{
							let e = /* @__PURE__ */ A(() => B(t).page ?? (B(t).href == null ? "__none" : "__href")), r = /* @__PURE__ */ A(() => X("tip.linkTarget")), i = /* @__PURE__ */ A(() => [
								...B(k).pages.map((e) => [e.id, e.title]),
								["__href", X("opt.linkHref")],
								...B(t).children ? [["__none", X("opt.noLink")]] : []
							]);
							Z(p, {
								get value() {
									return B(e);
								},
								get title() {
									return B(r);
								},
								get options() {
									return B(i);
								},
								onchange: (e) => Ip(n, e)
							});
						}
						E(f);
						var m = R(f, 2), h = (e) => {
							var r = su();
							q(r), z((e, n) => {
								J(r, B(t).href), Y(r, "placeholder", e), Y(r, "title", n);
							}, [() => X("ph.hrefAnchor"), () => X("tip.hrefAnchor")]), V("change", r, (e) => Lp(n, e.target.value)), U(e, r);
						};
						G(m, (e) => {
							!B(t).page && B(t).href != null && e(h);
						}), E(i), Yr(R(i, 2), 17, () => B(t).children ?? [], Gr, (e, r, i) => {
							var a = cu(), o = F(a);
							q(o);
							var s = R(o, 2), l = F(s);
							l.disabled = i === 0, K(l, () => c.up, !0), E(l);
							var u = R(l, 2);
							K(u, () => c.down, !0), E(u);
							var d = R(u, 2);
							K(d, () => c.cross, !0), E(d), E(s);
							var f = R(s, 2), p = F(f);
							{
								let e = /* @__PURE__ */ A(() => B(r).page ?? "__href"), t = /* @__PURE__ */ A(() => X("tip.linkTarget")), a = /* @__PURE__ */ A(() => [...B(k).pages.map((e) => [e.id, e.title]), ["__href", X("opt.linkHref")]]);
								Z(p, {
									get value() {
										return B(e);
									},
									get title() {
										return B(t);
									},
									get options() {
										return B(a);
									},
									onchange: (e) => Up(n, i, e)
								});
							}
							E(f);
							var m = R(f, 2), h = (e) => {
								var t = su();
								q(t), z((e, n) => {
									J(t, B(r).href ?? ""), Y(t, "placeholder", e), Y(t, "title", n);
								}, [() => X("ph.hrefAnchor"), () => X("tip.hrefAnchor")]), V("change", t, (e) => Wp(n, i, e.target.value)), U(e, t);
							};
							G(m, (e) => {
								B(r).page || e(h);
							}), E(a), z((e, n) => {
								J(o, B(r).label), Y(o, "title", e), u.disabled = i === B(t).children.length - 1, Y(d, "title", n);
							}, [() => X("tip.nav.childLabel"), () => X("tip.nav.removeChild")]), V("input", o, (e) => Hp(n, i, e.target.value)), V("click", l, () => Gp(n, i, -1)), V("click", u, () => Gp(n, i, 1)), V("click", d, () => Kp(n, i)), U(e, a);
						}), z((e, r, i) => {
							J(a, B(t).label), Y(a, "title", e), Y(s, "title", r), u.disabled = n === B(k).nav.items.length - 1, Y(d, "title", i);
						}, [
							() => X("tip.nav.itemLabel"),
							() => X("tip.nav.addChild"),
							() => X("tip.nav.removeItem")
						]), V("input", a, (e) => Fp(n, e.target.value)), V("click", s, () => Vp(n)), V("click", l, () => Rp(n, -1)), V("click", u, () => Rp(n, 1)), V("click", d, () => zp(n)), U(e, r);
					});
					var It = R(Ft, 2), Lt = L(It, !0);
					E(Pt), E(jt), E(t), z((e, t, n, r, o, s, c, u, d, f, p, m, h, g, _, v, b, x, S, ee, T, ne, re, ie, oe, se, ce, le, ue, de, fe, pe, me) => {
						Y(i, "title", e), W(a, t), W(l, `${n ?? ""} `), W(y, r), W(C, o), Y(w, "title", s), W(te, `${c ?? ""} `), W(ae, `${u ?? ""} `), Y(ge, "title", d), W(_e, f), Y(ye, "title", p), Y(Se, "title", m), W(we, h), Y(Te, "min", Do.min), Y(Te, "max", Do.max), Y(Te, "step", Do.step), J(Te, B(Qo) === "mobile" ? B(es) : B(Go)), Y(Ee, "min", Do.min), Y(Ee, "max", Do.max), Y(Ee, "placeholder", g), J(Ee, B(Qo) === "mobile" ? B(k).nav.style?.mobile?.textSize ?? "" : B(Go)), W(je, _), Y(Ie, "title", v), Ci(O, B(k).nav.style?.blur !== !1), W(Le, ` ${b ?? ""}`), W(Be, x), Y(We, "title", S), Ci(Ge, B(k).nav.cart?.show === !0), W(Ke, ` ${ee ?? ""}`), W(Ze, T), W(et, `${ne ?? ""} `), Y(ot, "title", re), W(st, `${ie ?? ""} `), W(ut, `${oe ?? ""} `), W(mt, se), W(yt, ce), W(St, `${le ?? ""} `), Y(kt, "title", ue), W(At, `${de ?? ""} `), J(j, B(k).nav.style?.subColumns ?? 1), Y(Mt, "title", fe), W(Nt, pe), W(Lt, me);
					}, [
						() => X("hint.nav.logoHome"),
						() => X("group.logo"),
						() => X("common.type"),
						() => X("group.appearance"),
						() => X("group.navLayout"),
						() => X("tip.nav.variant"),
						() => X("lbl.navVariant"),
						() => X("lbl.navPlacement"),
						() => X("tip.nav.sizePreset"),
						() => X("lbl.size"),
						() => X("tip.nav.sizePreset"),
						() => X("tip.nav.menuTextSize"),
						() => X("lbl.navTextSize"),
						() => B(Qo) === "mobile" ? X("lbl.navSameAsDesktop") : "",
						() => X("group.navFrame"),
						() => X("tip.nav.blur"),
						() => X("lbl.navBlur"),
						() => X("group.navBehaviour"),
						() => X("tip.nav.cart"),
						() => X("lbl.navCart"),
						() => X("group.navColours"),
						() => X("lbl.navHover"),
						() => X("tip.nav.hoverTextColor"),
						() => X("lbl.hoverTextColor"),
						() => X("lbl.textColor"),
						() => X("lbl.background"),
						() => X("group.submenu"),
						() => X("lbl.design"),
						() => X("tip.nav.subColumns"),
						() => X("lbl.columns"),
						() => X("hint.nav.submenu"),
						() => X("group.menuItems"),
						() => X("ui.addMenuItem")
					]), V("input", Te, (e) => ts("textSize", e.target.valueAsNumber)), V("change", Ee, (e) => ns(e, "textSize", Do)), V("change", O, (e) => Fo("blur", e.target.checked)), V("change", Ge, (e) => ta("nav", () => {
						e.target.checked ? B(k).nav.cart = {
							...B(k).nav.cart ?? {},
							show: !0
						} : delete B(k).nav.cart;
					})), V("change", j, (e) => Fo("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), V("click", It, Bp), U(e, t);
				}, v = (e) => {
					var t = bf(), n = F(t), r = F(n), i = R(r);
					q(i), E(n);
					var a = R(n, 2), o = F(a), s = R(o);
					q(s), E(a);
					var l = R(a, 2), u = F(l), d = R(u);
					{
						let e = /* @__PURE__ */ A(to), t = /* @__PURE__ */ A(no);
						Z(d, {
							get value() {
								return B(e);
							},
							get options() {
								return B(t);
							},
							onchange: (e) => ao(e)
						});
					}
					E(l);
					var f = R(l, 4), p = L(f, !0), m = R(f, 2), h = F(m);
					Yr(h, 17, () => B(Za), (e) => e.screen, (e, t) => {
						var n = gf(), r = F(n), i = L(r, !0), a = R(r, 2);
						let o;
						var s = L(a), c = L(R(a, 2), !0);
						E(n), z(() => {
							W(i, B(t).screen), o = gi(a, 1, "cw-bar svelte-1n46o8q", null, o, { fluid: !B(t).bound }), vi(s, `width:${B(t).pct ?? ""}%`), W(c, B(t).bound ? `${B(t).margin}` : "-");
						}), U(e, n);
					});
					var g = R(h, 2), _ = F(g), v = L(_, !0), y = L(R(_, 2), !0);
					E(g);
					var b = R(g, 2), x = (e) => {
						var t = _f(), n = L(t, !0);
						z((e) => W(n, e), [() => X("lbl.bindsFrom", { n: B(be) })]), U(e, t);
					};
					G(b, (e) => {
						B(Ga) !== "full" && e(x);
					}), E(m);
					var S = R(m, 2);
					Yr(S, 21, () => yo, (e) => e.id, (e, t) => {
						var n = Rd();
						let r;
						var i = L(n, !0);
						z((e) => {
							r = gi(n, 1, "svelte-1n46o8q", null, r, { on: B(qa) === B(t).id }), W(i, e);
						}, [() => X(`lbl.width.${B(t).id}`)]), V("click", n, () => $a(B(t).width)), U(e, n);
					}), E(S);
					var C = R(S, 2), ee = (e) => {
						var t = vf(), n = F(t), r = L(n, !0), i = R(n, 2);
						q(i);
						var a = L(R(i, 2));
						E(t), z((e, n) => {
							Y(t, "title", e), W(r, n), Y(i, "min", 960), Y(i, "max", _o), Y(i, "step", 20), J(i, B(Xa)), W(a, `${B(Xa) ?? ""} px`);
						}, [() => X("tip.site.contentWidthFree"), () => X("lbl.widthFree")]), V("input", i, (e) => $a(e.target.valueAsNumber)), U(e, t);
					};
					G(C, (e) => {
						B(Ga) !== "full" && e(ee);
					});
					var w = R(C, 2), te = L(w, !0), T = R(w, 2);
					Yr(T, 21, () => vo, (e) => e.id, (e, t) => {
						var n = Rd();
						let r;
						var i = L(n, !0);
						z((e) => {
							r = gi(n, 1, "svelte-1n46o8q", null, r, { on: B(Ja) === B(t).id }), W(i, e);
						}, [() => X(`lbl.gutter.${B(t).id}`)]), V("click", n, () => eo(B(t).gutter)), U(e, n);
					}), E(T);
					var ne = R(T, 2), re = F(ne), ie = L(re, !0), ae = R(re, 2), oe = F(ae), se = F(oe), ce = L(se, !0), le = R(se, 2);
					q(le);
					var ue = L(R(le, 2));
					E(oe), E(ae), E(ne);
					var de = R(ne, 4), fe = F(de), pe = R(fe), me = (e) => {
						var t = Xd();
						z((e) => {
							Y(t, "src", B(k).site.icon), Y(t, "alt", e);
						}, [() => X("lbl.siteIcon")]), U(e, t);
					};
					G(pe, (e) => {
						B(k).site.icon && e(me);
					}), E(de);
					var he = R(de, 2), ge = F(he), _e = F(ge), ve = R(_e);
					E(ge);
					var ye = R(ge, 2), xe = (e) => {
						var t = yf(), n = I(t);
						K(n, () => c.pencil ?? "✎", !0), E(n);
						var r = R(n, 2);
						K(r, () => c.cross, !0), E(r), z((e, t) => {
							Y(n, "title", e), Y(r, "title", t);
						}, [() => X("tip.site.editIcon"), () => X("tip.site.removeIcon")]), V("click", n, () => P(Fa, B(k).site.icon, !0)), V("click", r, Ra), U(e, t);
					};
					G(ye, (e) => {
						B(k).site.icon && e(xe);
					}), E(he), E(t), z((e, t, c, d, m, h, g, _, b, x, S, C, ee, T, re, ae, se, de, pe, me) => {
						Y(n, "title", e), W(r, `${t ?? ""} `), J(i, B(k).site.title ?? ""), Y(i, "placeholder", c), Y(a, "title", d), W(o, `${m ?? ""} `), J(s, B(k).site.description ?? ""), Y(s, "placeholder", h), Y(l, "title", g), W(u, `${_ ?? ""} `), Y(f, "title", b), W(p, x), W(v, S), W(y, C), Y(w, "title", ee), W(te, T), ne.open = B(Ja) === null || B(Ya), W(ie, re), Y(oe, "title", ae), W(ce, se), Y(le, "min", 0), Y(le, "max", 12), Y(le, "step", 1), J(le, B(Ka)), W(ue, `${B(Ka) ?? ""} vw`), W(fe, `${de ?? ""} `), Y(ge, "title", pe), W(_e, `${me ?? ""} `);
					}, [
						() => X("tip.site.name"),
						() => X("lbl.name"),
						() => X("ph.site.name"),
						() => X("tip.site.description"),
						() => X("lbl.description"),
						() => X("ph.site.description"),
						() => X("site.langTitle"),
						() => X("site.langLabel"),
						() => X("tip.site.contentWidth"),
						() => X("lbl.contentWidth"),
						() => X("lbl.screenPx"),
						() => X("lbl.marginPx"),
						() => X("tip.site.gutter"),
						() => X("lbl.gutter"),
						() => X("group.advanced"),
						() => X("tip.site.gutterVw"),
						() => X("lbl.gutterVw"),
						() => X("lbl.siteIcon"),
						() => X("tip.site.icon"),
						() => B(k).site.icon ? X("ui.changeIcon") : X("ui.chooseIcon")
					]), V("input", i, (e) => za(e.target.value)), V("input", s, (e) => Ba(e.target.value)), wr("toggle", ne, (e) => P(Ya, e.currentTarget.open, !0)), V("input", le, (e) => eo(e.target.valueAsNumber)), V("change", ve, Ia), U(e, t);
				}, y = (e) => {
					var t = Of();
					{
						let e = (e, t = f, n = f) => {
							var r = Sf(), i = F(r), a = (e) => {
								var t = xf(), r = L(t, !0);
								z(() => W(r, n())), U(e, t);
							};
							G(i, (e) => {
								n() && e(a);
							});
							var o = R(i, 2), s = F(o), c = L(s, !0), l = R(s, 2), u = L(l, !0), d = R(l, 2), p = F(d), h = L(p, !0), g = L(R(p), !0);
							E(d), E(o), E(r), z((e, t, n, r, i, a, s, l, d) => {
								vi(o, `--tv-bg:${e ?? ""};--tv-surface:${t ?? ""};--tv-text:${n ?? ""};--tv-accent:${r ?? ""};--tv-accent-ink:${i ?? ""}`), W(c, a), W(u, s), W(h, l), W(g, d);
							}, [
								() => hm(t().bg, t()),
								() => hm(t().surface, t()),
								() => hm(t().text, t()),
								() => hm(t().accent, t()),
								() => hm(t()["accent-text"] ?? m(hm(t().accent ?? "#000000", t())), t()),
								() => X("preview.heading"),
								() => X("preview.cardBody"),
								() => X("preview.button"),
								() => X("preview.link")
							]), U(e, r);
						};
						var n = F(t), r = L(n, !0), i = R(n, 2);
						Yr(i, 21, () => _m, (e) => e.id, (e, t) => {
							var n = Cf();
							let r;
							var i = F(n), a = F(i), o = R(a), s = R(o), c = R(s);
							E(i);
							var l = L(R(i, 2), !0);
							E(n), z(() => {
								r = gi(n, 1, "theme-preset svelte-1n46o8q", null, r, { sel: B(ym) === B(t).id }), Y(n, "title", `${B(t).name} - ${B(t).note}`), vi(a, `background:${B(t).light.bg ?? ""}`), vi(o, `background:${B(t).light.surface ?? ""}`), vi(s, `background:${B(t).light.accent ?? ""}`), vi(c, `background:${B(t).light.text ?? ""}`), W(l, B(t).name);
							}), V("click", n, () => vm(B(t))), U(e, n);
						}), E(i);
						var a = R(i, 2), o = L(a, !0), s = R(a, 2), c = F(s);
						q(c);
						var l = R(c);
						E(s);
						var u = R(s, 2), d = (e) => {
							var t = wf(), n = F(t), r = L(n, !0), i = R(n, 2), a = F(i);
							let o;
							var s = L(a, !0), c = R(a, 2);
							let l;
							var u = L(c, !0);
							E(i), E(t), z((e, t, n, i) => {
								W(r, e), Y(a, "title", t), o = gi(a, 1, "svelte-1n46o8q", null, o, { on: B(Fr) }), W(s, n), l = gi(c, 1, "svelte-1n46o8q", null, l, { on: !B(Fr) }), W(u, i);
							}, [
								() => X("lbl.darkColors"),
								() => X("hint.theme.autoDark"),
								() => X("opt.auto"),
								() => X("opt.custom")
							]), V("click", a, () => dm(!0)), V("click", c, () => dm(!1)), U(e, t);
						};
						G(u, (e) => {
							B(Nr) && e(d);
						});
						var p = R(u, 2), g = F(p), _ = (e) => {
							var t = Tf(), n = L(t, !0);
							z((e) => W(n, e), [() => X("lbl.light")]), U(e, t);
						};
						G(g, (e) => {
							B(Nr) && e(_);
						});
						var v = R(g, 2);
						let Ie;
						var y = L(v, !0);
						E(p);
						var b = R(p, 2);
						Yr(b, 21, () => H, ([e, t, n]) => e, (e, t) => {
							var n = /* @__PURE__ */ A(() => h(B(t), 3));
							let r = () => B(n)[0], i = () => B(n)[1], a = () => B(n)[2];
							var o = Ef(), s = F(o);
							{
								let e = /* @__PURE__ */ A(() => B(k).theme.tokens.color[r()] ?? Jp(r(), B(Lr))), t = /* @__PURE__ */ A(Mr);
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
									onchange: (e) => qp(r(), e)
								});
							}
							var c = R(s, 2), l = L(c, !0), u = L(R(c, 2), !0);
							E(o), z((e) => {
								W(l, a()), W(u, e);
							}, [() => hm(B(k).theme.tokens.color[r()] ?? Jp(r(), B(Lr)), B(Lr))]), U(e, o);
						}), E(b);
						var x = R(b, 2), S = (e) => {
							var t = Df(), n = I(t), r = F(n), i = L(r, !0), a = R(r, 2);
							let o;
							var s = L(a, !0);
							E(n);
							var c = R(n, 2);
							let l;
							Yr(c, 21, () => H, ([e, t, n]) => e, (e, t) => {
								var n = /* @__PURE__ */ A(() => h(B(t), 3));
								let r = () => B(n)[0], i = () => B(n)[1], a = () => B(n)[2];
								var o = Ef(), s = F(o);
								{
									let e = /* @__PURE__ */ A(() => B(k).theme.alt.tokens.color[r()] ?? B(Rr)[r()] ?? Jp(r(), B(Rr))), t = /* @__PURE__ */ A(Mr), n = /* @__PURE__ */ A(() => X("theme.darkColorLabel", { name: i() }));
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
										onchange: (e) => cm(r(), e)
									});
								}
								var c = R(s, 2), l = L(c, !0), u = L(R(c, 2), !0);
								E(o), z((e) => {
									W(l, a()), W(u, e);
								}, [() => hm(B(k).theme.alt.tokens.color[r()] ?? B(Rr)[r()] ?? Jp(r(), B(Rr)), B(Rr))]), U(e, o);
							}), E(c), z((e, t, n) => {
								W(i, e), o = gi(a, 1, "chip svelte-1n46o8q", null, o, { accent: B(Ir) === "dark" }), Y(a, "title", t), W(s, n), l = gi(c, 1, "palcells svelte-1n46o8q", null, l, { autopal: B(Fr) });
							}, [
								() => X("lbl.dark"),
								() => X("tip.theme.darkDefault"),
								() => X("common.standard")
							]), V("click", a, () => lm("dark")), U(e, t);
						};
						G(x, (e) => {
							B(Nr) && e(S);
						});
						var C = R(x, 2), ee = F(C), w = L(ee, !0), te = R(ee, 2);
						let O;
						var T = L(te, !0);
						E(C);
						var ne = R(C, 2), re = F(ne);
						{
							let t = /* @__PURE__ */ A(() => B(Nr) ? X("lbl.light") : "");
							e(re, () => B(Lr), () => B(t));
						}
						var ie = R(re, 2), ae = (t) => {
							{
								let n = /* @__PURE__ */ A(() => X("lbl.dark"));
								e(t, () => B(Rr), () => B(n));
							}
						};
						G(ie, (e) => {
							B(Nr) && e(ae);
						}), E(ne);
						var oe = R(ne, 2), se = F(oe), ce = L(se, !0), le = R(se, 2), ue = F(le), de = F(ue), fe = R(de);
						{
							let e = /* @__PURE__ */ A(() => fm("heading"));
							Z(fe, {
								get value() {
									return B(k).theme.tokens.font.heading;
								},
								get options() {
									return B(e);
								},
								onchange: (e) => im("heading", e)
							});
						}
						E(ue);
						var pe = R(ue, 2), me = F(pe), he = R(me);
						{
							let e = /* @__PURE__ */ A(() => fm("body"));
							Z(he, {
								get value() {
									return B(k).theme.tokens.font.body;
								},
								get options() {
									return B(e);
								},
								onchange: (e) => im("body", e)
							});
						}
						E(pe);
						var ge = R(pe, 2), _e = F(ge), ve = L(_e, !0), ye = R(_e, 2), be = L(ye, !0);
						E(ge), E(le), E(oe);
						var xe = R(oe, 2), Se = F(xe), Ce = L(Se, !0), we = R(Se, 2), Te = F(we), Ee = F(Te), De = L(Ee, !0), Oe = L(R(Ee, 2), !0);
						E(Te);
						var ke = R(Te, 2), Ae = F(ke, !0), je = L(R(Ae), !0);
						E(ke);
						var Me = R(ke, 2);
						q(Me);
						var Ne = R(Me, 2), Pe = F(Ne, !0), Fe = L(R(Pe), !0);
						E(Ne);
						var D = R(Ne, 2);
						q(D), E(we), E(xe), E(t), z((e, t, n, i, a, u, d, f, p, m, h, g, _, b, x, S, ee, ne, re, ie, ae) => {
							W(r, e), W(o, t), Y(s, "title", n), Ci(c, B(Nr)), W(l, ` ${i ?? ""}`), Ie = gi(v, 1, "chip svelte-1n46o8q", null, Ie, { accent: B(Ir) === "light" }), Y(v, "title", a), W(y, u), Y(C, "title", d), W(w, f), O = gi(te, 1, "chip palauto svelte-1n46o8q", null, O, { accent: B(Yp) }), W(T, p), W(ce, m), W(de, `${h ?? ""} `), W(me, `${g ?? ""} `), vi(_e, `font-family:${B(k).theme.tokens.font.heading ?? ""}`), W(ve, _), vi(ye, `font-family:${B(k).theme.tokens.font.body ?? ""}`), W(be, b), W(Ce, x), vi(Te, `--r-sm:${B(k).theme.tokens.radius.sm ?? ""};--r-md:${B(k).theme.tokens.radius.md ?? ""}`), W(De, S), W(Oe, ee), W(Ae, ne), W(je, B(k).theme.tokens.radius.sm), J(Me, re), W(Pe, ie), W(Fe, B(k).theme.tokens.radius.md), J(D, ae);
						}, [
							() => X("lbl.themePresets"),
							() => X("lbl.colors"),
							() => X("tip.theme.dualMode"),
							() => X("lbl.dualMode"),
							() => X("tip.theme.defaultScheme"),
							() => X("common.standard"),
							() => X("tip.theme.accentTextAuto"),
							() => X("palette.accentText"),
							() => X("opt.auto"),
							() => X("group.typography"),
							() => X("lbl.headings"),
							() => X("lbl.bodyText"),
							() => X("preview.heading"),
							() => X("preview.bodySample"),
							() => X("group.shape"),
							() => X("preview.button"),
							() => X("preview.card"),
							() => X("lbl.smallCorners"),
							() => pm(B(k).theme.tokens.radius.sm),
							() => X("lbl.largeCorners"),
							() => pm(B(k).theme.tokens.radius.md)
						]), V("change", c, (e) => um(e.target.checked)), V("click", v, () => lm("light")), V("click", te, () => rm(!B(Yp))), V("input", Me, (e) => mm("sm", Number(e.target.value))), V("input", D, (e) => mm("md", Number(e.target.value)));
					}
					U(e, t);
				}, b = (e) => {
					var t = Nf();
					let n;
					var r = F(t);
					q(r);
					var i = R(r, 2), a = (e) => {
						var t = Pr();
						Yr(I(t), 17, () => Oc(Wm(), B(Um), (e) => e.label), (e) => e.label, (e, t) => {
							var n = Pr(), r = I(n), i = (e) => {
								var n = kf(), r = F(n), i = R(r);
								E(n), z((e) => {
									Y(n, "title", e), W(r, `${B(t).label ?? ""} `);
								}, [() => X("tip.webpAuto")]), V("change", i, qm), U(e, n);
							}, a = (e) => {
								var n = Af(), r = F(n), i = R(r);
								E(n), z((e) => {
									Y(n, "title", e), W(r, `${B(t).label ?? ""} `);
								}, [() => X("tip.blocks.galleryImages")]), V("change", i, Zm), U(e, n);
							}, o = (e) => {
								var n = ku(), r = L(n, !0);
								z(() => W(r, B(t).label)), V("click", n, () => Gm(B(t))), U(e, n);
							};
							G(r, (e) => {
								B(t).act === "image" ? e(i) : B(t).act === "galleryImages" ? e(a, 1) : e(o, -1);
							}), U(e, n);
						}, (e) => {
							var t = fu(), n = L(t, !0);
							z((e) => W(n, e), [() => X("canvas.searchEmpty")]), U(e, t);
						}), U(e, t);
					}, o = /* @__PURE__ */ A(() => B(Um).trim()), s = (e) => {
						var t = Mf(), n = I(t), r = F(n), i = L(r, !0), a = R(r, 2), o = F(a), s = L(o, !0), c = R(o, 2), l = L(c, !0);
						E(a), E(n);
						var u = R(n, 2), d = L(u, !0), f = R(u, 2), p = F(f), m = R(p);
						E(f);
						var h = R(f, 2), g = L(h, !0), _ = R(h, 2), v = L(_, !0), y = R(_, 2), b = L(y, !0), x = R(y, 2), S = L(x, !0), C = R(x, 2), ee = L(C, !0), w = R(C, 2), te = L(w, !0), T = R(w, 2), ne = L(T, !0), re = R(T, 2), ie = L(re, !0), ae = R(re, 2), oe = L(ae, !0), se = R(ae, 2), ce = L(se, !0), le = R(se, 2), ue = L(le, !0), de = R(le, 2), fe = L(de, !0), pe = R(de, 2), me = L(pe, !0), he = R(pe, 2), ge = L(he, !0), _e = R(he, 2), ve = L(_e, !0), ye = R(_e, 2), be = L(ye, !0), xe = R(ye, 2), Se = F(xe), Ce = L(Se, !0), we = R(Se, 2), Te = F(we), Ee = L(Te, !0), De = R(Te, 2), Oe = F(De), ke = R(Oe);
						E(De), E(we), E(xe);
						var Ae = R(xe, 2), je = F(Ae), Me = L(je, !0), Ne = R(je, 2), Pe = F(Ne), Fe = L(Pe, !0), D = R(Pe, 2), Ie = L(D, !0), k = R(D, 2), Le = L(k, !0), Re = R(k, 2), ze = L(Re, !0);
						E(Ne), E(Ae);
						var Be = R(Ae, 2), Ve = F(Be), He = L(Ve, !0), Ue = R(Ve, 2), We = F(Ue), Ge = L(We, !0), Ke = R(We, 2), qe = L(Ke, !0), Je = R(Ke, 2), Ye = L(Je, !0), Xe = R(Je, 2), Ze = L(Xe, !0), Qe = R(Xe, 2), $e = L(Qe, !0);
						E(Ue), E(Be);
						var et = R(Be, 2), tt = (e) => {
							let t = /* @__PURE__ */ A(() => B(Ds).filter((e) => ws[e]?.data?.mal?.kind === "blocks"));
							var n = jf(), r = F(n), i = L(r, !0), a = R(r, 2);
							Yr(a, 20, () => B(t), (e) => e, (e, t) => {
								var n = ku(), r = L(n, !0);
								z((e) => {
									Y(n, "title", e), W(r, ws[t].data.mal.name);
								}, [() => X("canvas.insertGroup")]), V("click", n, () => O?.sendInsertTemplate(t)), U(e, n);
							}), E(a), E(n), z((e) => W(i, e), [() => X("canvas.tabMyTemplates")]), U(e, n);
						}, nt = /* @__PURE__ */ A(() => B(Ds).some((e) => ws[e]?.data?.mal?.kind === "blocks"));
						G(et, (e) => {
							B(nt) && e(tt);
						});
						var rt = R(et, 2), it = (e) => {
							var t = jf(), n = F(t), r = L(n, !0), i = R(n, 2);
							Yr(i, 21, () => B(Bm), (e) => e.type, (e, t) => {
								var n = Pr(), r = I(n), i = (e) => {
									var n = jf(), r = F(n), i = L(r, !0), a = R(r, 2);
									Yr(a, 21, () => B(t).variants, (e) => e.label, (e, n) => {
										var r = ku(), i = L(r, !0);
										z((e) => {
											Y(r, "title", e), W(i, B(n).label);
										}, [() => X("tip.blocks.fromPlugin", { plugin: B(t).plugin })]), V("click", r, () => Hm(B(t), B(n).props)), U(e, r);
									}), E(a), E(n), z(() => W(i, B(t).label)), U(e, n);
								}, a = (e) => {
									var n = ku(), r = L(n, !0);
									z((e) => {
										Y(n, "title", e), W(r, B(t).label);
									}, [() => X("tip.blocks.fromPlugin", { plugin: B(t).plugin })]), V("click", n, () => Hm(B(t))), U(e, n);
								};
								G(r, (e) => {
									B(t).variants?.length ? e(i) : e(a, -1);
								}), U(e, n);
							}), E(i), E(t), z((e) => W(r, e), [() => X("panel.plugins")]), U(e, t);
						};
						G(rt, (e) => {
							B(Bm).length && e(it);
						}), z((e, t, n, r, a, o, u, m, xe, Se, we, E, ke, Ae, je, Ne, O, Be, Ve, Ue, We, Ke, Je, Xe, Qe, et, tt, nt, rt, it, at, ot, st, ct, lt, ut, dt, ft, pt, mt, ht, gt, _t, vt, yt, bt, xt, A, St, Ct, wt, Tt, Et, Dt, Ot, kt, At, j, jt) => {
							W(i, e), W(s, t), Y(c, "title", n), W(l, r), W(d, a), Y(f, "title", o), W(p, `${u ?? ""} `), Y(h, "title", m), W(g, xe), Y(_, "title", Se), W(v, we), Y(y, "title", E), W(b, ke), Y(x, "title", Ae), W(S, je), Y(C, "title", Ne), W(ee, O), Y(w, "title", Be), W(te, Ve), Y(T, "title", Ue), W(ne, We), Y(re, "title", Ke), W(ie, Je), Y(ae, "title", Xe), W(oe, Qe), Y(se, "title", et), W(ce, tt), Y(le, "title", nt), W(ue, rt), Y(de, "title", it), W(fe, at), Y(pe, "title", ot), W(me, st), Y(he, "title", ct), W(ge, lt), Y(_e, "title", ut), W(ve, dt), Y(ye, "title", ft), W(be, pt), W(Ce, mt), Y(Te, "title", ht), W(Ee, gt), Y(De, "title", _t), W(Oe, `${vt ?? ""} `), W(Me, yt), Y(Pe, "title", bt), W(Fe, xt), Y(D, "title", A), W(Ie, St), Y(k, "title", Ct), W(Le, wt), Y(Re, "title", Tt), W(ze, Et), W(He, Dt), W(Ge, Ot), W(qe, kt), W(Ye, At), W(Ze, j), W($e, jt);
						}, [
							() => X("blocks.text"),
							() => X("blocks.text"),
							() => X("tip.blocks.textBox"),
							() => X("ui.textBox"),
							() => X("blocks.button"),
							() => X("tip.webpAuto"),
							() => X("blocks.image"),
							() => X("tip.blocks.video"),
							() => X("blocks.video"),
							() => X("tip.blocks.icon"),
							() => X("blocks.icon"),
							() => X("tip.blocks.map"),
							() => X("blocks.map"),
							() => X("tip.blocks.form"),
							() => X("blocks.form"),
							() => X("tip.blocks.collection"),
							() => X("blocks.collection"),
							() => X("tip.blocks.faq"),
							() => X("blocks.faq"),
							() => X("tip.blocks.timeline"),
							() => X("blocks.timeline"),
							() => X("tip.blocks.quote"),
							() => X("blocks.quote"),
							() => X("tip.blocks.stats"),
							() => X("blocks.stats"),
							() => X("tip.blocks.table"),
							() => X("blocks.table"),
							() => X("tip.blocks.share"),
							() => X("blocks.share"),
							() => X("tip.blocks.countdown"),
							() => X("blocks.countdown"),
							() => X("tip.blocks.audio"),
							() => X("blocks.audio"),
							() => X("tip.blocks.product"),
							() => X("blocks.product"),
							() => X("tip.blocks.cart"),
							() => X("blocks.cart"),
							() => X("tip.blocks.checkout"),
							() => X("blocks.checkout"),
							() => X("blocks.gallery"),
							() => X("tip.blocks.gallery"),
							() => X("ui.emptyGallery"),
							() => X("tip.blocks.galleryImages"),
							() => X("ui.galleryWithImages"),
							() => X("blocks.calendar"),
							() => X("tip.blocks.calendar"),
							() => X("calendar.viewList"),
							() => X("tip.blocks.calendar"),
							() => X("calendar.viewCards"),
							() => X("tip.blocks.calendar"),
							() => X("calendar.viewMonth"),
							() => X("tip.blocks.calendar"),
							() => X("calendar.viewNext"),
							() => X("group.shapes"),
							() => X("shape.line"),
							() => X("shape.arrow"),
							() => X("shape.circle"),
							() => X("shape.rect"),
							() => X("shape.triangle")
						]), V("click", o, () => zm("text")), V("click", c, () => zm("text-box")), V("click", u, () => zm("button")), V("change", m, qm), V("click", h, () => zm("video")), V("click", _, () => zm("icon")), V("click", y, () => zm("map")), V("click", x, () => zm("form")), V("click", C, () => zm("collection")), V("click", w, () => zm("faq")), V("click", T, () => zm("timeline")), V("click", re, () => zm("quote")), V("click", ae, () => zm("stats")), V("click", se, () => zm("table")), V("click", le, () => zm("share")), V("click", de, () => zm("countdown")), V("click", pe, () => zm("audio")), V("click", he, () => zm("product")), V("click", _e, () => zm("cart")), V("click", ye, () => zm("checkout")), V("click", Te, () => zm("gallery")), V("change", ke, Zm), V("click", Pe, () => zm("calendar")), V("click", D, () => zm("calendar-cards")), V("click", k, () => zm("calendar-month")), V("click", Re, () => zm("calendar-next")), V("click", We, () => zm("shape-line")), V("click", Ke, () => zm("shape-arrow")), V("click", Je, () => zm("shape-circle")), V("click", Xe, () => zm("shape-rect")), V("click", Qe, () => zm("shape-triangle")), U(e, t);
					};
					G(i, (e) => {
						B(o) ? e(a) : e(s, -1);
					}), E(t), z((e, i, a) => {
						n = gi(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: B(me) === "mobile" }), Y(t, "title", e), Y(r, "placeholder", i), Y(r, "title", a);
					}, [
						() => B(me) === "mobile" ? X("tip.blocks.mobileLocked") : void 0,
						() => X("canvas.searchBlocks"),
						() => X("canvas.searchBlocks")
					]), Di(r, () => B(Um), (e) => P(Um, e)), U(e, t);
				}, x = (e) => {
					var t = Pf(), n = F(t), r = F(n), i = L(R(r));
					E(n);
					var a = R(n, 2);
					q(a);
					var o = R(a, 2), s = F(o);
					q(s);
					var c = R(s);
					E(o), E(t), z((e, t) => {
						W(r, `${e ?? ""} `), W(i, `${B(T).size ?? ""} px`), J(a, B(T).size), Ci(s, B(T).snap !== !1), W(c, ` ${t ?? ""}`);
					}, [() => X("lbl.gridSize"), () => X("lbl.gridSnap")]), V("input", a, (e) => ii("size", Number(e.target.value))), V("change", s, (e) => ii("snap", e.target.checked)), U(e, t);
				}, S = (e) => {
					var t = Vf(), r = F(t), i = (e) => {
						var t = Ff(), n = I(t), r = L(n, !0), i = R(n, 2);
						a(i), z((e) => W(r, e), [() => X("blocks.suffix", { label: En[B(j).type] ?? B(j).type })]), U(e, t);
					}, o = (e) => {
						var t = Bf(), r = I(t), i = L(r, !0), a = R(r, 2), o = F(a), s = R(o);
						q(s), E(a);
						var l = R(a, 4), u = F(l);
						q(u);
						var d = R(u);
						E(l);
						var f = R(l, 2), p = (e) => {
							var t = If(), n = I(t), r = F(n), i = L(R(r));
							E(n);
							var a = R(n, 2);
							q(a), z((e) => {
								W(r, `${e ?? ""} `), W(i, `${B(An).size ?? ""} px`), J(a, B(An).size);
							}, [() => X("lbl.gridSize")]), V("input", a, (e) => ri("size", Number(e.target.value))), U(e, t);
						};
						G(f, (e) => {
							B(An) && e(p);
						});
						var m = R(f, 4), g = L(m, !0), _ = R(m, 2);
						Yr(_, 21, () => [["", "common.standard"], ...Object.entries(Ic)], ([e, t]) => e, (e, t) => {
							var n = /* @__PURE__ */ A(() => h(B(t), 2));
							let r = () => B(n)[0], i = () => B(n)[1], a = /* @__PURE__ */ A(() => Vn(r()));
							var o = Lf();
							let s;
							var c = F(o), l = F(c), u = R(l, 2), d = R(u, 2);
							E(c);
							var f = L(R(c, 2), !0);
							E(o), z((e, t) => {
								s = gi(o, 1, "rs-card svelte-1n46o8q", null, s, { on: B(Fn) === r() }), Y(o, "title", e), vi(c, `background: ${B(a).bg ?? ""}`), vi(l, `background: ${B(a).text ?? ""}`), vi(u, `background: ${B(a).surface ?? ""}`), vi(d, `background: ${B(a).accent ?? ""}`), W(f, t);
							}, [() => X("tip.props.sectionTheme"), () => X(i())]), V("click", o, () => Bn(r())), U(e, o);
						}), E(_);
						var v = R(_, 2), y = F(v), b = R(y), x = F(b), S = L(x), C = R(x, 2);
						K(C, () => c.copy, !0), E(C), E(b), E(v);
						var ee = R(v, 4), w = L(ee, !0), te = R(ee, 2);
						n(te, () => B(Er), () => B(Mn));
						var T = R(te, 4), ne = F(T), re = R(ne);
						{
							let e = /* @__PURE__ */ A(() => Br(B(Nn)) ? B(Nn).type : "");
							Z(re, {
								get value() {
									return B(e);
								},
								get options() {
									return Vr;
								},
								onchange: (e) => Xr(e || null)
							});
						}
						E(T);
						var ie = R(T, 2), ae = (e) => {
							var t = zf(), n = I(t), r = F(n), i = R(r);
							q(i), E(n);
							var a = R(n, 2), o = F(a), s = R(o);
							q(s), E(a);
							var c = R(a, 2), l = (e) => {
								var t = Rf(), n = I(t), r = F(n), i = R(r);
								{
									let e = /* @__PURE__ */ A(() => B(Nn).props.effect ?? "slide-up"), t = /* @__PURE__ */ A(() => [
										["fade-in", X("anim.fadeIn")],
										["slide-up", X("anim.slideUp")],
										["zoom-in", X("anim.zoomIn")]
									]);
									Z(i, {
										get value() {
											return B(e);
										},
										get options() {
											return B(t);
										},
										onchange: (e) => $r("effect", e)
									});
								}
								E(n);
								var a = R(n, 2), o = F(a), s = R(o);
								q(s), E(a);
								var c = R(a, 2), l = F(c), u = R(l);
								{
									let e = /* @__PURE__ */ A(() => B(Nn).props.pattern ?? "sequence"), t = /* @__PURE__ */ A(() => [
										["sequence", X("opt.stagger.sequence")],
										["columns", X("opt.stagger.columns")],
										["rows", X("opt.stagger.rows")],
										["center", X("opt.stagger.center")]
									]);
									Z(u, {
										get value() {
											return B(e);
										},
										get options() {
											return B(t);
										},
										onchange: (e) => $r("pattern", e)
									});
								}
								E(c), z((e, t, i, u, d, f) => {
									Y(n, "title", e), W(r, `${t ?? ""} `), Y(a, "title", i), W(o, `${u ?? ""} `), J(s, B(Nn).props.step ?? 90), Y(c, "title", d), W(l, `${f ?? ""} `);
								}, [
									() => X("tip.props.staggerEffect"),
									() => X("lbl.staggerEffect"),
									() => X("tip.props.staggerStep"),
									() => X("lbl.stepMs"),
									() => X("tip.props.staggerPattern"),
									() => X("lbl.pattern")
								]), V("change", s, (e) => Qr("step", Number(e.target.value))), U(e, t);
							};
							G(c, (e) => {
								B(Nn).type === "stagger" && e(l);
							}), z((e, t) => {
								W(r, `${e ?? ""} `), J(i, B(Nn).props.duration), W(o, `${t ?? ""} `), J(s, B(Nn).props.delay ?? 0);
							}, [() => X("lbl.durationMs"), () => X("lbl.delayMs")]), V("change", i, (e) => Qr("duration", Number(e.target.value))), V("change", s, (e) => Qr("delay", Number(e.target.value))), U(e, t);
						}, oe = /* @__PURE__ */ A(() => Br(B(Nn)));
						G(ie, (e) => {
							B(oe) && e(ae);
						});
						var se = R(ie, 2), ce = F(se), le = R(ce);
						{
							let e = /* @__PURE__ */ A(() => B(Pn)?.type ?? (B(Nn) && !Br(B(Nn)) ? B(Nn).type : ""));
							Z(le, {
								get value() {
									return B(e);
								},
								get options() {
									return Ur;
								},
								onchange: (e) => Zr(e || null)
							});
						}
						E(se), z((e, t, n, r, c, l, f, p, h, _, b, x, ee, te, re) => {
							W(i, e), Y(a, "title", t), W(o, `${n ?? ""} `), J(s, B(jn)), Y(s, "placeholder", r), Ci(u, B(An) !== null), W(d, ` ${c ?? ""}`), Y(m, "title", l), W(g, f), Y(v, "title", p), W(y, `${h ?? ""} `), W(S, `#${B(kn) ?? ""}`), Y(C, "title", _), W(w, b), Y(T, "title", x), W(ne, `${ee ?? ""} `), Y(se, "title", te), W(ce, `${re ?? ""} `);
						}, [
							() => X("lbl.section"),
							() => X("hint.props.minHeight"),
							() => X("lbl.minHeight"),
							() => X("ph.minHeight"),
							() => X("lbl.sectionGrid"),
							() => X("tip.props.sectionTheme"),
							() => X("lbl.sectionTheme"),
							() => X("tip.props.anchor"),
							() => X("lbl.anchor"),
							() => X("tip.props.copyAnchor"),
							() => X("lbl.background"),
							() => X("tip.props.sectionAnim"),
							() => X("lbl.animIn"),
							() => X("tip.props.sectionHover"),
							() => X("lbl.onHover")
						]), V("change", s, (e) => ei(e.target.value)), V("change", u, (e) => ni(e.target.checked)), V("click", C, () => navigator.clipboard?.writeText(`#${B(kn)}`)), U(e, t);
					}, s = (e) => {
						var t = fu(), n = L(t, !0);
						z((e) => W(n, e), [() => X("hint.props.empty")]), U(e, t);
					};
					G(r, (e) => {
						B(j) ? e(i) : B(kn) ? e(o, 1) : e(s, -1);
					}), E(t), U(e, t);
				}, C = (e) => {
					var t = Jf(), i = F(t), a = F(i);
					q(a);
					var o = R(a);
					E(i);
					var s = R(i, 2), l = (e) => {
						var t = jf(), n = F(t), r = L(n, !0), i = R(n, 2);
						Yr(i, 21, () => B(k).pages ?? [], (e) => e.id, (e, t) => {
							var n = Du(), r = F(n);
							q(r);
							var i = R(r);
							E(n), z((e, a) => {
								Y(n, "title", e), Ci(r, a), W(i, ` ${(B(t).title || B(t).id) ?? ""}`);
							}, [() => X("tip.footer.hideOnPage"), () => !(B(k).footer?.hideOn ?? []).includes(B(t).id)]), V("change", r, (e) => bl(B(t).id, e.target.checked)), U(e, n);
						}), E(i), E(t), z((e) => W(r, e), [() => X("group.showOnPages")]), U(e, t);
					};
					G(s, (e) => {
						B(k).footer?.show && e(l);
					});
					var u = R(s, 2), d = F(u), f = L(d, !0), p = R(d, 2), m = F(p);
					Yr(m, 21, () => sl, (e) => e.id, (e, t) => {
						var n = Hf(), r = F(n);
						K(r, () => Ll(B(t).thumb), !0), E(r);
						var i = L(R(r, 2), !0);
						E(n), z((e) => {
							Y(n, "title", e), W(i, B(t).label);
						}, [() => X("tip.footer.template", { label: B(t).label })]), V("click", n, () => ll(B(t).id)), U(e, n);
					}), E(m), E(p), E(u);
					var h = R(u, 2), g = F(h), _ = L(g, !0), v = R(g, 2), y = F(v), b = F(y), x = R(b);
					q(x), E(y);
					var S = R(y, 2), C = F(S), ee = R(C);
					q(ee), E(S);
					var w = R(S, 2), te = F(w), T = R(te);
					{
						let e = /* @__PURE__ */ A(() => B(k).footer?.brand?.mode ?? "text"), t = /* @__PURE__ */ A(() => [
							["text", X("blocks.text")],
							["image", X("opt.brand.image")],
							["both", X("opt.brand.both")]
						]);
						Z(T, {
							get value() {
								return B(e);
							},
							get options() {
								return B(t);
							},
							onchange: (e) => nl(e)
						});
					}
					E(w);
					var ne = R(w, 2), re = (e) => {
						var t = Wf(), n = I(t), r = F(n), i = F(r), a = R(i);
						E(r);
						var o = R(r, 2), s = (e) => {
							var t = Gl();
							K(t, () => c.cross, !0), E(t), z((e) => Y(t, "title", e), [() => X("tip.footer.removeLogo")]), V("click", t, il), U(e, t);
						};
						G(o, (e) => {
							B(k).footer?.brand?.logo && e(s);
						}), E(n);
						var l = R(n, 2), u = (e) => {
							var t = Uf(), n = I(t), r = F(n), i = L(R(r));
							E(n);
							var a = R(n, 2);
							q(a), z((e) => {
								W(r, `${e ?? ""} `), W(i, `${B(k).footer?.brand?.logoHeight ?? 40 ?? ""} px`), J(a, B(k).footer?.brand?.logoHeight ?? 40);
							}, [() => X("lbl.logoHeight")]), V("input", a, (e) => al(e.target.value)), U(e, t);
						};
						G(l, (e) => {
							B(k).footer?.brand?.logo && e(u);
						}), z((e, t) => {
							Y(r, "title", e), W(i, `${t ?? ""} `);
						}, [() => X("tip.webpAutoPublish"), () => B(k).footer?.brand?.logo ? X("ui.changeLogo") : X("ui.uploadLogo")]), V("change", a, rl), U(e, t);
					};
					G(ne, (e) => {
						(B(k).footer?.brand?.mode ?? "text") !== "text" && e(re);
					}), E(v), E(h);
					var ie = R(h, 2), ae = F(ie), oe = L(ae, !0), se = R(ae, 2), ce = F(se);
					Yr(ce, 17, () => B(k).footer?.columns ?? [], Gr, (e, t, n) => {
						var r = Gf(), i = I(r), a = F(i);
						q(a);
						var o = R(a, 2), s = F(o);
						K(s, () => c.plus, !0), E(s);
						var l = R(s, 2);
						l.disabled = n === 0, K(l, () => c.up, !0), E(l);
						var u = R(l, 2);
						K(u, () => c.down, !0), E(u);
						var d = R(u, 2);
						K(d, () => c.cross, !0), E(d), E(o), E(i), Yr(R(i, 2), 17, () => B(t).links ?? [], Gr, (e, r, i) => {
							var a = cu(), o = F(a);
							q(o);
							var s = R(o, 2), l = F(s);
							l.disabled = i === 0, K(l, () => c.up, !0), E(l);
							var u = R(l, 2);
							K(u, () => c.down, !0), E(u);
							var d = R(u, 2);
							K(d, () => c.cross, !0), E(d), E(s);
							var f = R(s, 2), p = F(f);
							{
								let e = /* @__PURE__ */ A(() => B(r).page ?? "__href"), t = /* @__PURE__ */ A(() => X("tip.linkTarget")), a = /* @__PURE__ */ A(() => [...B(k).pages.map((e) => [e.id, e.title]), ["__href", X("opt.linkHref")]]);
								Z(p, {
									get value() {
										return B(e);
									},
									get title() {
										return B(t);
									},
									get options() {
										return B(a);
									},
									onchange: (e) => jl(n, i, e)
								});
							}
							E(f);
							var m = R(f, 2), h = (e) => {
								var t = su();
								q(t), z((e, n) => {
									J(t, B(r).href ?? ""), Y(t, "placeholder", e), Y(t, "title", n);
								}, [() => X("ph.hrefAnchor"), () => X("tip.hrefAnchor")]), V("change", t, (e) => Ml(n, i, e.target.value)), U(e, t);
							};
							G(m, (e) => {
								B(r).page || e(h);
							}), E(a), z((e, n) => {
								J(o, B(r).label), Y(o, "title", e), u.disabled = i === B(t).links.length - 1, Y(d, "title", n);
							}, [() => X("tip.linkLabel"), () => X("tip.removeLink")]), V("input", o, (e) => kl(n, i, e.target.value)), V("click", l, () => Ol(n, i, -1)), V("click", u, () => Ol(n, i, 1)), V("click", d, () => Dl(n, i)), U(e, a);
						}), z((e, r, i) => {
							J(a, B(t).title), Y(a, "title", e), Y(s, "title", r), u.disabled = n === B(k).footer.columns.length - 1, Y(d, "title", i);
						}, [
							() => X("tip.footer.columnTitle"),
							() => X("tip.footer.addLink"),
							() => X("tip.footer.removeColumn")
						]), V("input", a, (e) => wl(n, e.target.value)), V("click", s, () => El(n)), V("click", l, () => Cl(n, -1)), V("click", u, () => Cl(n, 1)), V("click", d, () => Sl(n)), U(e, r);
					});
					var le = R(ce, 2), ue = L(le, !0), de = R(le, 2), fe = F(de), pe = R(fe);
					{
						let e = /* @__PURE__ */ A(() => B(k).footer?.columnsAlign ?? "left"), t = /* @__PURE__ */ A(() => [["left", X("common.left")], ["center", X("common.center")]]);
						Z(pe, {
							get value() {
								return B(e);
							},
							get options() {
								return B(t);
							},
							onchange: (e) => gl(e)
						});
					}
					E(de), E(se), E(ie);
					var me = R(ie, 2), he = F(me), ge = L(he, !0), _e = R(he, 2), ve = F(_e);
					Yr(ve, 17, () => B(k).footer?.social ?? [], Gr, (e, t, n) => {
						var r = Kf(), i = F(r), a = F(i);
						K(a, () => Wa(B(t).icon) || "", !0), E(a);
						var o = R(a, 2);
						{
							let e = /* @__PURE__ */ A(() => X("blocks.icon"));
							Z(o, {
								get value() {
									return B(t).icon;
								},
								get title() {
									return B(e);
								},
								get options() {
									return Bl;
								},
								onchange: (e) => Rl(n, e)
							});
						}
						E(i);
						var s = R(i, 2), l = F(s);
						l.disabled = n === 0, K(l, () => c.up, !0), E(l);
						var u = R(l, 2);
						K(u, () => c.down, !0), E(u);
						var d = R(u, 2);
						K(d, () => c.cross, !0), E(d), E(s);
						var f = R(s, 2);
						q(f), E(r), z((e, r) => {
							u.disabled = n === B(k).footer.social.length - 1, Y(d, "title", e), J(f, B(t).url), Y(f, "placeholder", r);
						}, [() => X("tip.removeLink"), () => X("ph.hrefMailto")]), V("click", l, () => Fl(n, -1)), V("click", u, () => Fl(n, 1)), V("click", d, () => Pl(n)), V("change", f, (e) => zl(n, e.target.value)), U(e, r);
					});
					var ye = R(ve, 2), be = L(ye, !0);
					E(_e), E(me);
					var xe = R(me, 2), Se = F(xe), Ce = L(Se, !0), we = R(Se, 2), Te = F(we), Ee = F(Te);
					q(Ee);
					var De = R(Ee);
					E(Te);
					var Oe = R(Te, 2), Ae = (e) => {
						let t = /* @__PURE__ */ A(() => B(k).footer.cta);
						var n = qf(), r = I(n), i = F(r), a = R(i);
						{
							let e = /* @__PURE__ */ A(() => B(t).kind ?? "button"), n = /* @__PURE__ */ A(() => [["button", X("opt.cta.button")], ["newsletter", X("opt.cta.newsletter")]]);
							Z(a, {
								get value() {
									return B(e);
								},
								get options() {
									return B(n);
								},
								onchange: (e) => vl("kind", e)
							});
						}
						E(r);
						var o = R(r, 2), s = F(o);
						q(s);
						var c = R(s);
						E(o);
						var l = R(o, 2), u = F(l), d = R(u);
						q(d), E(l);
						var f = R(l, 2), p = F(f), m = R(p);
						q(m), E(f);
						var h = R(f, 2), g = F(h), _ = R(g);
						q(_), E(h);
						var v = R(h, 2), y = (e) => {
							var n = df(), r = I(n), i = F(r), a = R(i);
							{
								let e = /* @__PURE__ */ A(() => B(t).page ?? "__href"), n = /* @__PURE__ */ A(() => [...B(k).pages.map((e) => [e.id, e.title]), ["__href", X("opt.linkHrefMailto")]]);
								Z(a, {
									get value() {
										return B(e);
									},
									get options() {
										return B(n);
									},
									onchange: (e) => yl(e)
								});
							}
							E(r);
							var o = R(r, 2), s = (e) => {
								var n = hu();
								q(n), z((e, r) => {
									J(n, B(t).href ?? ""), Y(n, "placeholder", e), Y(n, "title", r);
								}, [() => X("ph.hrefMailtoAnchor"), () => X("tip.hrefAnchor")]), V("change", n, (e) => vl("href", e.target.value)), U(e, n);
							};
							G(o, (e) => {
								B(t).page || e(s);
							}), z((e, t) => {
								Y(r, "title", e), W(i, `${t ?? ""} `);
							}, [() => X("tip.footer.ctaTarget"), () => X("lbl.buttonTarget")]), U(e, n);
						}, b = (e) => {
							var n = wu(), r = I(n), i = F(r), a = R(i);
							q(a), E(r);
							var o = R(r, 2), s = F(o), c = R(s);
							q(c), E(o);
							var l = R(o, 2), u = F(l), d = R(u);
							q(d), E(l), z((e, n, f, p, m, h, g, _, v) => {
								Y(r, "title", e), W(i, `${n ?? ""} `), J(a, B(t).endpoint ?? ""), Y(a, "placeholder", f), Y(o, "title", p), W(s, `${m ?? ""} `), J(c, B(t).recipient ?? ""), Y(c, "placeholder", h), Y(l, "title", g), W(u, `${_ ?? ""} `), J(d, B(t).success ?? ""), Y(d, "placeholder", v);
							}, [
								() => X("tip.footer.ctaEndpoint"),
								() => X("lbl.newsletterEndpoint"),
								() => X("ph.endpoint"),
								() => X("tip.footer.ctaRecipient"),
								() => X("lbl.recipientFallback"),
								() => X("ph.email"),
								() => X("tip.footer.ctaSuccess"),
								() => X("lbl.confirmation"),
								() => X("ph.footer.ctaSuccess")
							]), V("change", a, (e) => vl("endpoint", e.target.value)), V("change", c, (e) => vl("recipient", e.target.value)), V("input", d, (e) => vl("success", e.target.value)), U(e, n);
						};
						G(v, (e) => {
							(B(t).kind ?? "button") === "button" ? e(y) : e(b, -1);
						}), z((e, n, a, v, y, b, x, S, C, ee, w, te) => {
							Y(r, "title", e), W(i, `${n ?? ""} `), Y(o, "title", a), Ci(s, B(t).big === !0), W(c, ` ${v ?? ""}`), Y(l, "title", y), W(u, `${b ?? ""} `), J(d, B(t).heading ?? ""), Y(d, "placeholder", x), Y(f, "title", S), W(p, `${C ?? ""} `), J(m, B(t).sub ?? ""), Y(h, "title", ee), W(g, `${w ?? ""} `), J(_, B(t).label ?? ""), Y(_, "placeholder", te);
						}, [
							() => X("tip.footer.ctaKind"),
							() => X("common.type"),
							() => X("tip.footer.ctaBig"),
							() => X("lbl.bigCentered"),
							() => X("tip.footer.ctaHeading"),
							() => X("lbl.heading"),
							() => X("ph.footer.ctaHeading"),
							() => X("tip.footer.ctaSub"),
							() => X("lbl.subText"),
							() => X("tip.footer.ctaLabel"),
							() => X("lbl.buttonText"),
							() => X("ph.footer.ctaLabel")
						]), V("change", s, (e) => vl("big", e.target.checked)), V("input", d, (e) => vl("heading", e.target.value)), V("input", m, (e) => vl("sub", e.target.value)), V("input", _, (e) => vl("label", e.target.value)), U(e, n);
					};
					G(Oe, (e) => {
						B(k).footer?.cta && e(Ae);
					}), E(we), E(xe);
					var je = R(xe, 2), Me = F(je), Ne = L(Me, !0), Pe = R(Me, 2), Fe = F(Pe);
					r(Fe, () => "linkRow", () => B(k).footer?.linkRow ?? []);
					var D = R(Fe, 2), Ie = L(D, !0);
					E(Pe), E(je);
					var O = R(je, 2), Le = F(O), Re = L(Le, !0), ze = R(Le, 2), Be = F(ze), Ve = (e) => {
						var t = rd(), n = I(t), r = F(n), i = R(r);
						{
							let e = /* @__PURE__ */ A(() => B(k).footer?.align ?? "left"), t = /* @__PURE__ */ A(() => [
								["left", X("common.left")],
								["center", X("common.center")],
								["right", X("common.right")]
							]);
							Z(i, {
								get value() {
									return B(e);
								},
								get options() {
									return B(t);
								},
								onchange: (e) => Zc("footer", (t) => {
									t.align = e;
								})
							});
						}
						E(n), ke(2), z((e, t) => {
							Y(n, "title", e), W(r, `${t ?? ""} `);
						}, [() => X("tip.footer.align"), () => X("lbl.align")]), U(e, t);
					};
					G(Be, (e) => {
						B(k).footer?.cta?.big !== !0 && e(Ve);
					});
					var He = R(Be, 2), Ue = L(He, !0), We = R(He, 2);
					n(We, () => Or, () => B(k).footer?.background?.layers ?? []), E(ze), E(O);
					var Ge = R(O, 2), Ke = F(Ge), qe = L(Ke, !0), Je = R(Ke, 2), Ye = F(Je), Xe = F(Ye), Ze = R(Xe);
					q(Ze), E(Ye);
					var Qe = R(Ye, 2), $e = L(Qe, !0), et = R(Qe, 2);
					r(et, () => "baseline", () => B(k).footer?.baseline ?? []);
					var tt = R(et, 2), nt = L(tt, !0);
					E(Je), E(Ge), E(t), z((e, t, n, r, s, c, l, u, d, p, m, h, g, v, T, ne, re, ie, ae, se, ce, le, pe, me, he, _e, ve, ye, xe, Se, we, Oe) => {
						Y(i, "title", e), Ci(a, t), W(o, ` ${n ?? ""}`), W(f, r), W(_, s), Y(y, "title", c), W(b, `${l ?? ""} `), J(x, B(k).footer?.brand?.title ?? ""), Y(x, "placeholder", u), Y(S, "title", d), W(C, `${p ?? ""} `), J(ee, B(k).footer?.brand?.tagline ?? ""), Y(w, "title", m), W(te, `${h ?? ""} `), W(oe, g), W(ue, v), Y(de, "title", T), W(fe, `${ne ?? ""} `), W(ge, re), W(be, ie), W(Ce, ae), Y(Te, "title", se), Ci(Ee, ce), W(De, ` ${le ?? ""}`), W(Ne, pe), W(Ie, me), W(Re, he), W(Ue, _e), W(qe, ve), Y(Ye, "title", ye), W(Xe, `${xe ?? ""} `), J(Ze, B(k).footer?.copyright ?? ""), Y(Ze, "placeholder", Se), W($e, we), W(nt, Oe);
					}, [
						() => X("tip.footer.show"),
						() => !!B(k).footer?.show,
						() => X("lbl.showFooter"),
						() => X("group.startpoint"),
						() => X("group.brand"),
						() => X("tip.footer.brandTitle"),
						() => X("lbl.title"),
						() => X("ph.footer.brandTitle"),
						() => X("tip.footer.tagline"),
						() => X("lbl.tagline"),
						() => X("tip.footer.brandMode"),
						() => X("lbl.brandMode"),
						() => X("group.columns"),
						() => X("ui.addColumn"),
						() => X("tip.footer.columnsAlign"),
						() => X("lbl.splitColumnAlign"),
						() => X("group.social"),
						() => X("ui.addSocial"),
						() => X("group.cta"),
						() => X("tip.footer.cta"),
						() => !!B(k).footer?.cta,
						() => X("lbl.showCta"),
						() => X("group.linkRow"),
						() => X("ui.addRowLink"),
						() => X("group.appearance"),
						() => X("lbl.background"),
						() => X("group.baseline"),
						() => X("tip.footer.copyright"),
						() => X("lbl.copyright"),
						() => X("ph.footer.copyright"),
						() => X("lbl.baselineLinks"),
						() => X("ui.addBaselineLink")
					]), V("change", a, (e) => Zc("footer", (t) => {
						t.show = e.target.checked;
					})), V("input", x, (e) => el("title", e.target.value)), V("input", ee, (e) => el("tagline", e.target.value)), V("click", le, xl), V("click", ye, Nl), V("change", Ee, (e) => _l(e.target.checked)), V("click", D, () => ul("linkRow")), V("input", Ze, (e) => ol(e.target.value)), V("click", tt, () => ul("baseline")), U(e, t);
				}, ee = (e) => {
					var t = np(), n = F(t), r = (e) => {
						var t = lu(), n = F(t), r = R(n);
						{
							let e = /* @__PURE__ */ A(() => B(ys) ?? ""), t = /* @__PURE__ */ A(() => [["", X("common.choose")], ...B(_s).map((e) => [e, B(vs)[e]?.name ?? e])]);
							Z(r, {
								get value() {
									return B(e);
								},
								get options() {
									return B(t);
								},
								onchange: (e) => P(ys, e || null, !0)
							});
						}
						E(t), z((e) => W(n, `${e ?? ""} `), [() => X("blocks.collection")]), U(e, t);
					};
					G(n, (e) => {
						B(_s).length && e(r);
					});
					var i = R(n, 2), a = (e) => {
						let t = /* @__PURE__ */ A(() => B(vs)[B(ys)]);
						var n = tp(), r = I(n), i = F(r), a = L(i, !0), o = R(i, 2), s = L(o, !0), l = R(o, 2), u = F(l), d = R(u);
						E(l);
						var f = R(l, 2);
						K(f, () => c.cross, !0), E(f), E(r);
						var p = R(r, 2);
						Yr(p, 19, () => B(t).entries, (e) => e.id, (e, n, r) => {
							var i = ep(), a = F(i), o = L(a), s = R(a, 2), l = F(s), u = F(l);
							q(u);
							var d = R(u, 2), f = F(d);
							K(f, () => c.up, !0), E(f);
							var p = R(f, 2);
							K(p, () => c.down, !0), E(p);
							var m = R(p, 2);
							K(m, () => c.cross, !0), E(m), E(d), E(l);
							var h = R(l, 2), g = (e) => {
								var t = Yf(), r = F(t), i = R(r);
								q(i), E(t), z((e) => {
									W(r, `${e ?? ""} `), J(i, B(n).date ?? "");
								}, [() => X("lbl.date")]), V("change", i, (e) => nc(B(ys), B(n).id, "date", e.target.value)), U(e, t);
							};
							G(h, (e) => {
								B(t).kind !== "products" && e(g);
							});
							var _ = R(h, 2);
							ut(_);
							var v = R(_, 2), y = (e) => {
								var t = pu(), r = F(t), i = R(r);
								q(i), E(t), z((e, t) => {
									W(r, `${e ?? ""} `), J(i, B(n).href ?? ""), Y(i, "placeholder", t);
								}, [() => X("lbl.link"), () => X("ph.collections.href")]), V("change", i, (e) => nc(B(ys), B(n).id, "href", e.target.value)), U(e, t);
							};
							G(v, (e) => {
								B(t).kind !== "products" && e(y);
							});
							var b = R(v, 2), x = F(b), S = F(x), C = R(S);
							E(x);
							var ee = R(x, 2), w = (e) => {
								var t = Xf(), r = I(t), i = R(r, 2);
								K(i, () => c.cross, !0), E(i), z((e) => {
									Y(r, "src", B(n).image), Y(i, "title", e);
								}, [() => X("tip.removeImage")]), V("click", i, () => nc(B(ys), B(n).id, "image", "")), U(e, t);
							};
							G(ee, (e) => {
								B(n).image && e(w);
							}), E(b);
							var te = R(b, 2), T = (e) => {
								var t = $f(), r = I(t), i = F(r), a = R(i);
								q(a), E(r);
								var o = R(r, 2), s = F(o), l = R(s);
								q(l), E(o);
								var u = R(o, 2), d = F(u), f = R(d);
								q(f), E(u);
								var p = R(u, 2), m = F(p), h = R(m);
								q(h), E(p);
								var g = R(p, 2);
								Yr(g, 17, () => B(n).colors ?? [], Gr, (e, t, r) => {
									var i = Qf(), a = F(i);
									q(a);
									var o = R(a, 2), s = F(o), l = R(s);
									E(o);
									var u = R(o, 2), d = (e) => {
										var n = Zf();
										z(() => Y(n, "src", B(t).image)), U(e, n);
									};
									G(u, (e) => {
										B(t).image && e(d);
									});
									var f = R(u, 2);
									K(f, () => c.cross, !0), E(f), E(i), z((e, n) => {
										J(a, B(t).name), Y(a, "placeholder", e), W(s, `${n ?? ""} `);
									}, [() => X("ph.colorName"), () => B(t).image ? X("ui.changeImage") : X("ui.addImage")]), V("change", a, (e) => cc(B(ys), B(n).id, r, "name", e.target.value)), V("change", l, (e) => lc(B(ys), B(n).id, r, e)), V("click", f, () => uc(B(ys), B(n).id, r)), U(e, i);
								});
								var _ = R(g, 2), v = L(_, !0);
								z((e, t, r, c, g, y, b, x, S, C, ee) => {
									W(i, `${e ?? ""} `), J(a, B(n).price ?? ""), Y(o, "title", t), W(s, `${r ?? ""} `), J(l, B(n).memberPrice ?? ""), Y(u, "title", c), W(d, `${g ?? ""} `), J(f, B(n).badge ?? ""), Y(p, "title", y), W(m, `${b ?? ""} `), J(h, x), Y(h, "placeholder", S), Y(_, "title", C), W(v, ee);
								}, [
									() => X("lbl.price"),
									() => X("tip.entry.memberPrice"),
									() => X("lbl.memberPrice"),
									() => X("tip.entry.badge"),
									() => X("lbl.productBadge"),
									() => X("tip.entry.sizes"),
									() => X("lbl.sizes"),
									() => (B(n).sizes ?? []).join(", "),
									() => X("ph.sizes"),
									() => X("tip.entry.colors"),
									() => X("ui.addColor")
								]), V("change", a, (e) => nc(B(ys), B(n).id, "price", e.target.value === "" ? "" : Number(e.target.value))), V("change", l, (e) => nc(B(ys), B(n).id, "memberPrice", e.target.value === "" ? "" : Number(e.target.value))), V("change", f, (e) => nc(B(ys), B(n).id, "badge", e.target.value)), V("change", h, (e) => oc(B(ys), B(n).id, e.target.value)), V("click", _, () => sc(B(ys), B(n).id)), U(e, t);
							};
							G(te, (e) => {
								B(t).kind === "products" && e(T);
							}), E(s), E(i), z((e, i, a, s, c) => {
								W(o, `${e ?? ""}${B(t).kind === "products" ? B(n).price == null ? "" : ` · ${B(n).price}` : B(n).date ? ` · ${B(n).date}` : ""}`), J(u, B(n).title), Y(u, "title", i), f.disabled = B(r) === 0, p.disabled = B(r) === B(t).entries.length - 1, Y(m, "title", a), Y(_, "placeholder", s), J(_, B(n).text ?? ""), W(S, `${c ?? ""} `);
							}, [
								() => Bs(B(n).title),
								() => X("lbl.title"),
								() => X("tip.collections.deleteEntry"),
								() => X("ph.collections.text"),
								() => B(n).image ? X("ui.changeImage") : X("ui.addImage")
							]), V("change", u, (e) => nc(B(ys), B(n).id, "title", e.target.value || X("ui.untitled"))), V("click", f, () => rc(B(ys), B(r), -1)), V("click", p, () => rc(B(ys), B(r), 1)), V("click", m, () => ic(B(ys), B(n).id)), V("change", _, (e) => nc(B(ys), B(n).id, "text", e.target.value)), V("change", C, (e) => ac(B(ys), B(n).id, e)), U(e, i);
						});
						var m = R(p, 2), h = (e) => {
							var t = fu(), n = L(t, !0);
							z((e) => W(n, e), [() => X("hint.collections.empty")]), U(e, t);
						};
						G(m, (e) => {
							B(t).entries.length || e(h);
						}), ke(2), z((e, t, n, r, i, c) => {
							W(a, e), Y(o, "title", t), W(s, n), Y(l, "title", r), W(u, `${i ?? ""} `), Y(f, "title", c);
						}, [
							() => X("ui.addEntry"),
							() => X("tip.collections.exportCsv"),
							() => X("ui.exportCsv"),
							() => X("tip.collections.importCsv"),
							() => X("ui.importCsv"),
							() => X("tip.collections.deleteCollection")
						]), V("click", i, () => Zs(B(ys))), V("click", o, () => dc(B(ys))), V("change", d, (e) => fc(B(ys), e)), V("click", f, () => Ys(B(ys))), U(e, n);
					};
					G(i, (e) => {
						B(ys) && B(vs)[B(ys)] && e(a);
					});
					var o = R(i, 2), s = F(o), l = R(s);
					q(l), E(o);
					var u = R(o, 2), d = F(u);
					Z(R(d), {
						get value() {
							return B(xs);
						},
						get options() {
							return Ss;
						},
						onchange: (e) => P(xs, e, !0)
					}), E(u);
					var f = R(u, 2), p = L(f, !0);
					E(t), z((e, t, n, r, i) => {
						W(s, `${e ?? ""} `), Y(l, "placeholder", t), W(d, `${n ?? ""} `), f.disabled = r, W(p, i);
					}, [
						() => X("lbl.newCollectionName"),
						() => X("ph.collections.name"),
						() => X("common.type"),
						() => !B(bs).trim(),
						() => X("ui.createCollection")
					]), V("keydown", l, (e) => e.key === "Enter" && Ks()), Di(l, () => B(bs), (e) => P(bs, e)), V("click", f, Ks), U(e, t);
				}, w = (e) => {
					var t = lp(), n = F(t), r = (e) => {
						var t = fu(), n = L(t, !0);
						z((e) => W(n, e), [() => X("hint.plugins.empty")]), U(e, t);
					}, i = /* @__PURE__ */ A(() => !Dc().length);
					G(n, (e) => {
						B(i) && e(r);
					});
					var a = R(n, 2);
					Yr(a, 16, Dc, (e) => e, (e, t) => {
						let n = /* @__PURE__ */ A(() => _c[t]), r = /* @__PURE__ */ A(() => (B(gc)?.enabled ?? []).includes(t));
						var i = ap();
						let a;
						var o = F(i), s = F(o), l = L(s, !0), u = R(s, 2), d = (e) => {
							var t = rp(), r = L(t);
							z(() => W(r, `v${B(n).version ?? ""}`)), U(e, t);
						};
						G(u, (e) => {
							B(n)?.version && e(d);
						});
						var f = R(u, 2), p = F(f), m = F(p);
						q(m);
						var h = R(m);
						E(p);
						var g = R(p, 2);
						K(g, () => c.cross, !0), E(g), E(f), E(o);
						var _ = R(o, 2), v = (e) => {
							var t = ip(), r = L(t, !0);
							z((e) => W(r, e), [() => B(n).errors.join("; ")]), U(e, t);
						}, y = (e) => {
							var t = ip(), r = L(t, !0);
							z((e) => W(r, e), [() => X("plugin.engineMismatch", {
								required: B(n).requiresEngine,
								current: B(vc)
							})]), U(e, t);
						}, b = (e) => {
							var t = ip(), r = L(t, !0);
							z((e) => W(r, e), [() => X("plugin.cspNeeded", { list: Vc(B(n).csp).join(", ") })]), U(e, t);
						}, x = /* @__PURE__ */ A(() => B(n)?.csp && Vc(B(n).csp).length);
						G(_, (e) => {
							B(n)?.errors?.length ? e(v) : B(n) && !B(n).satisfied ? e(y, 1) : B(x) && e(b, 2);
						});
						var S = R(_, 2), C = (e) => {
							var t = fu(), r = L(t, !0);
							z((e) => W(r, e), [() => X("plugin.languages", { list: B(n).languages.map((e) => e.name).join(", ") })]), U(e, t);
						};
						G(S, (e) => {
							B(n)?.languages?.length && e(C);
						}), E(i), z((e, t, o, s, c) => {
							a = gi(i, 1, "plugin-row svelte-1n46o8q", null, a, { "plugin-broken": B(n)?.errors?.length }), W(l, e), Y(p, "title", t), Ci(m, B(r)), m.disabled = o, W(h, ` ${s ?? ""}`), Y(g, "title", c);
						}, [
							() => B(n)?.names?.[Gi()] ?? B(n)?.name ?? t,
							() => B(r) ? X("tip.plugins.on") : X("tip.plugins.off"),
							() => !!B(n)?.errors?.length,
							() => B(r) ? X("ui.on") : X("ui.off"),
							() => X("tip.plugins.remove")
						]), V("change", m, (e) => Kc(t, e.target.checked)), V("click", g, () => Jc(t)), U(e, i);
					});
					var o = R(a, 2), s = (e) => {
						var t = sp(), n = R(I(t), 2), r = L(n, !0);
						Yr(R(n, 2), 16, () => B(xc), (e) => e, (e, t) => {
							var n = op(), r = F(n), i = F(r), a = L(i, !0), o = R(i, 2), s = (e) => {
								var n = rp(), r = L(n);
								z(() => W(r, `v${_c[t].version ?? ""}`)), U(e, n);
							};
							G(o, (e) => {
								_c[t]?.version && e(s);
							});
							var l = R(o, 2), u = F(l);
							K(u, () => c.right, !0), E(u), E(l), E(r), E(n), z((e, t) => {
								W(a, e), Y(u, "title", t);
							}, [() => _c[t]?.names?.[Gi()] ?? _c[t]?.name ?? t, () => X("tip.plugins.addFound")]), V("click", u, () => Xc(t)), U(e, n);
						}), z((e) => W(r, e), [() => X("hint.plugins.found")]), U(e, t);
					};
					G(o, (e) => {
						B(xc).length && e(s);
					});
					var l = R(o, 2), u = (e) => {
						var t = Pr(), n = I(t), r = (e) => {
							var t = fu(), n = L(t, !0);
							z((e) => W(n, e), [() => X("hint.plugins.autoDiscover")]), U(e, t);
						};
						G(n, (e) => {
							B(xc).length || e(r);
						}), U(e, t);
					}, d = (e) => {
						var t = cp(), n = R(I(t), 2);
						q(n);
						var r = R(n, 2), i = L(r, !0), a = R(r, 2), o = (e) => {
							var t = ip(), n = L(t, !0);
							z(() => W(n, B(bc))), U(e, t);
						};
						G(a, (e) => {
							B(bc) && e(o);
						}), z((e, t, a) => {
							Y(n, "placeholder", e), r.disabled = t, W(i, a);
						}, [
							() => X("ph.plugins.folder"),
							() => !B(yc).trim(),
							() => X("ui.addPlugin")
						]), V("keydown", n, (e) => e.key === "Enter" && Yc()), Di(n, () => B(yc), (e) => P(yc, e)), V("click", r, Yc), U(e, t);
					};
					G(l, (e) => {
						B(Ec) === "ok" ? e(u) : e(d, -1);
					}), E(t), U(e, t);
				}, ne = (e) => {
					var t = Vf(), n = F(t), r = (e) => {
						var t = fu(), n = L(t, !0);
						z((e) => W(n, e), [() => X("hint.history.loading")]), U(e, t);
					}, i = (e) => {
						var t = fp(), n = I(t), r = (e) => {
							var t = fu(), n = L(t, !0);
							z(() => W(n, B(di))), U(e, t);
						};
						G(n, (e) => {
							B(di) && e(r);
						});
						var i = R(n, 2), a = (e) => {
							var t = dp(), n = I(t), r = L(n, !0);
							Yr(R(n, 2), 19, () => B(ui), (e) => e.sha, (e, t, n) => {
								var r = up();
								let i;
								var a = F(r), o = L(a, !0), s = L(R(a, 2));
								E(r), z((e) => {
									i = gi(r, 1, "history-row svelte-1n46o8q", null, i, { head: B(n) === 0 }), Y(a, "title", B(t).sha), W(o, B(t).message), W(s, `${B(t).author ?? ""}${e ?? ""}`);
								}, [() => B(t).date ? ` · ${mi.format(new Date(B(t).date))}` : ""]), U(e, r);
							}), z((e, t) => {
								n.disabled = B(fi) || !B(te)?.allowed, Y(n, "title", e), W(r, t);
							}, [() => B(te)?.allowed ? X("tip.history.revert") : X("tip.history.needsAccess"), () => X("ui.revertLast")]), V("click", n, _i), U(e, t);
						};
						G(i, (e) => {
							B(ui).length > 0 && e(a);
						}), U(e, t);
					};
					G(n, (e) => {
						B(ui) === null ? e(r) : e(i, -1);
					}), E(t), U(e, t);
				}, re = (e) => {
					var t = Vf(), n = F(t), r = (e) => {
						var t = fu(), n = L(t, !0);
						z((e) => W(n, e), [() => X("update.checking")]), U(e, t);
					}, i = (e) => {
						var t = pp(), n = I(t), r = L(n, !0), i = R(n, 2), a = L(i, !0);
						z((e) => {
							W(r, B(wi)), W(a, e);
						}, [() => X("update.retry")]), V("click", i, Oi), U(e, t);
					}, a = (e) => {
						var t = wp(), n = I(t), r = F(n), i = L(r, !0), a = R(r, 2), o = (e) => {
							var t = mp(), n = I(t);
							K(n, () => c.right, !0), E(n);
							var r = L(R(n, 2), !0);
							z(() => W(r, B(Si).target)), U(e, t);
						};
						G(a, (e) => {
							B(Si).upToDate || e(o);
						}), E(n);
						var s = R(n, 2), l = (e) => {
							var t = fu(), n = L(t, !0);
							z((e) => W(n, e), [() => X("update.upToDate")]), U(e, t);
						}, u = (e) => {
							var t = Cp(), n = I(t), r = L(n, !0), i = R(n, 2), a = (e) => {
								var t = hp(), n = F(t), r = L(n, !0), i = R(n, 2), a = L(F(i), !0);
								E(i), E(t), z((e) => {
									W(r, e), W(a, B(Si).notes);
								}, [() => X("update.aboutVersion", { target: B(Si).target })]), U(e, t);
							};
							G(i, (e) => {
								B(Si).notes && e(a);
							});
							var o = R(i, 2), s = (e) => {
								var t = gp(), n = F(t), r = F(n);
								K(r, () => c.warn, !0), E(r);
								var i = R(r);
								E(n);
								var a = R(n, 2), o = L(F(a), !0);
								E(a), E(t), z((e, t) => {
									Y(n, "title", e), W(i, ` ${t ?? ""}`), W(o, B(Si).headers.upstream);
								}, [() => X("update.headersManual"), () => X("update.headersTitle")]), U(e, t);
							};
							G(o, (e) => {
								B(Si).headers?.upstream && e(s);
							});
							var l = R(o, 2);
							Yr(l, 17, () => B(Si).changes.filter((e) => e.atom && e.conflict), (e) => e.path, (e, t) => {
								var n = vp(), r = F(n), i = L(r, !0), a = R(r, 2), o = F(a), s = (e) => {
									var t = _p(), n = L(t, !0);
									z((e) => W(n, e), [() => X("update.actionDelete")]), U(e, t);
								};
								G(o, (e) => {
									B(t).action === "delete" && e(s);
								});
								var l = R(o, 2);
								K(l, () => c.warn, !0), E(l), E(a), E(n), z((e) => {
									Y(r, "title", B(t).path), W(i, B(t).path), Y(l, "title", e);
								}, [() => X(`update.conflict.${B(t).conflict}`)]), U(e, n);
							});
							var u = R(l, 2), d = F(u), f = L(d), p = R(d, 2);
							Yr(p, 21, () => B(Si).changes.filter((e) => e.atom && !e.conflict), (e) => e.path, (e, t) => {
								var n = yp(), r = F(n), i = L(r, !0), a = R(r, 2), o = (e) => {
									var t = _p(), n = L(t, !0);
									z((e) => W(n, e), [() => X("update.actionDelete")]), U(e, t);
								};
								G(a, (e) => {
									B(t).action === "delete" && e(o);
								}), E(n), z(() => {
									Y(r, "title", B(t).path), W(i, B(t).path);
								}), U(e, n);
							}), E(p), E(u);
							var m = R(u, 2), h = (e) => {
								var t = Sp(), n = I(t), r = F(n), i = L(r, !0), a = L(R(r, 2), !0);
								E(n), Yr(R(n, 2), 17, () => B(Si).changes.filter((e) => !e.atom), (e) => e.path, (e, t) => {
									var n = xp(), r = F(n);
									let i;
									var a = L(r, !0), o = R(r, 2), s = F(o), l = (e) => {
										var t = _p(), n = L(t, !0);
										z((e) => W(n, e), [() => X("update.actionDelete")]), U(e, t);
									};
									G(s, (e) => {
										B(t).action === "delete" && e(l);
									});
									var u = R(s, 2), d = (e) => {
										var n = bp();
										K(n, () => c.warn, !0), E(n), z((e) => Y(n, "title", e), [() => X(`update.conflict.${B(t).conflict}`)]), U(e, n);
									};
									G(u, (e) => {
										B(t).conflict && e(d);
									});
									var f = R(u, 2);
									q(f), E(o), E(n), z((e, n, o, s) => {
										i = gi(r, 1, "update-path svelte-1n46o8q", null, i, { skipped: e }), Y(r, "title", B(t).path), W(a, B(t).path), Ci(f, n), Y(f, "title", o), Y(f, "aria-label", s);
									}, [
										() => B(Ei).has(B(t).path),
										() => B(Ei).has(B(t).path),
										() => X("update.keepMine.title"),
										() => X("update.keepMine")
									]), V("change", f, () => ki(B(t).path)), U(e, n);
								}), z((e, t) => {
									W(i, e), W(a, t);
								}, [() => X("update.optionalTitle"), () => X("update.keepMine")]), U(e, t);
							}, g = /* @__PURE__ */ A(() => B(Si).changes.some((e) => !e.atom));
							G(m, (e) => {
								B(g) && e(h);
							});
							var _ = R(m, 2), v = L(_, !0);
							z((e, t, n, i, a, o) => {
								W(r, e), Y(d, "title", t), W(f, `${n ?? ""} · ${i ?? ""}`), _.disabled = B(Ti) || !B(te)?.allowed, Y(_, "title", a), W(v, o);
							}, [
								() => X("update.summary", {
									writes: B(Si).changes.filter((e) => e.action === "write").length,
									deletes: B(Si).changes.filter((e) => e.action === "delete").length
								}),
								() => X("update.atomGroup.title"),
								() => X("update.atomTitle"),
								() => B(Si).changes.filter((e) => e.atom).length,
								() => B(te)?.allowed ? X("update.run.title") : X("tip.history.needsAccess"),
								() => X("update.run", { target: B(Si).target })
							]), V("click", _, Ai), U(e, t);
						};
						G(s, (e) => {
							B(Si).upToDate ? e(l) : e(u, -1);
						}), z((e) => W(i, e), [() => X("update.current", { version: B(Si).current })]), U(e, t);
					};
					G(n, (e) => {
						B(Ti) && !B(Si) ? e(r) : B(wi) ? e(i, 1) : B(Si) && e(a, 2);
					}), E(t), U(e, t);
				};
				G(d, (e) => {
					B(vt) === "pages" ? e(p) : B(vt) === "nav" ? e(g, 1) : B(vt) === "site" ? e(v, 2) : B(vt) === "theme" ? e(y, 3) : B(vt) === "blocks" ? e(b, 4) : B(vt) === "grid" ? e(x, 5) : B(vt) === "properties" ? e(S, 6) : B(vt) === "footer" ? e(C, 7) : B(vt) === "collections" ? e(ee, 8) : B(vt) === "plugins" ? e(w, 9) : B(vt) === "history" ? e(ne, 10) : B(vt) === "update" && e(re, 11);
				}), E(t), ji(t, (e) => P(Xp, e), () => B(Xp)), z((e) => {
					Y(o, "title", e), W(s, xt[B(vt)]);
				}, [() => St[B(vt)]?.map((e) => X(e)).join("\n")]), U(e, t);
			};
			G(y, (e) => {
				B(vt) && e(b);
			}), z((e) => {
				p = gi(u, 1, "rail-gear svelte-1n46o8q", null, p, { active: B(zi) }), Y(u, "title", e);
			}, [() => X("settings.title")]), V("click", u, () => P(zi, !B(zi))), U(e, t);
		};
		G(i, (e) => {
			B(ne) && e(o);
		});
		var s = R(i, 2);
		let u;
		var p = F(s), g = F(p);
		ji(g, (e) => P(w, e), () => B(w)), E(p), E(s), ji(s, (e) => P(he, e), () => B(he)), E(t), z((e) => {
			u = gi(s, 1, "frame-wrap svelte-1n46o8q", null, u, {
				mobile: B(me) === "mobile",
				pan: B(Oe),
				fold: B(Se) > 0
			}), vi(p, `width:${B(Ee) ?? ""}px; height:${B(De) ?? ""}px`), Y(g, "title", e), Y(g, "src", `/?page=${B(_)}&preview=1`), vi(g, `width:${B(xe) ?? ""}px; height:${B(Te) ?? ""}px; transform:scale(${B(Ce) ?? ""}); transform-origin:top left`);
		}, [() => X("ui.previewTitle")]), wr("load", g, Ii), Sr(g), U(e, t);
	}, Nh = (e) => {
		var t = Op(), n = L(t, !0);
		z((e) => W(n, e), [() => X("ui.loading")]), U(e, t);
	};
	G(jh, (e) => {
		B(g) ? e(Mh) : e(Nh, -1);
	});
	var Ph = R(jh, 2), Fh = (e) => {
		Yo(e, {
			get image() {
				return B(Fa);
			},
			onapply: La,
			oncancel: () => P(Fa, null)
		});
	};
	G(Ph, (e) => {
		B(Fa) && e(Fh);
	});
	var Ih = R(Ph, 2), Lh = (e) => {
		var t = Ap(), n = F(t), r = F(n), i = L(r, !0), a = R(r, 2);
		Yr(a, 16, () => B(at).lines, (e) => e, (e, t) => {
			var n = kp(), r = L(n, !0);
			z(() => W(r, t)), U(e, n);
		});
		var o = R(a, 2), s = (e) => {
			var t = hu();
			q(t), lt(t, !0), z(() => Y(t, "placeholder", B(at).placeholder)), V("keydown", t, (e) => e.key === "Enter" && B(at).value.trim() && ct(!0)), Di(t, () => B(at).value, (e) => B(at).value = e), U(e, t);
		};
		G(o, (e) => {
			B(at).prompt && e(s);
		});
		var c = R(o, 2), l = F(c), u = L(l, !0), d = R(l, 2), f = L(d, !0);
		E(c), E(n), E(t), z(() => {
			W(i, B(at).title), W(u, B(at).cancelLabel), W(f, B(at).okLabel);
		}), V("pointerdown", t, (e) => dt = e.target === e.currentTarget), V("click", t, (e) => dt && e.target === e.currentTarget && ct(!1)), V("click", l, () => ct(!1)), V("click", d, () => ct(!0)), U(e, t);
	};
	G(Ih, (e) => {
		B(at) && e(Lh);
	});
	var Rh = R(Ih, 2), zh = (e) => {
		var t = jp(), n = F(t), r = F(n), i = L(r, !0), a = R(r, 2), o = L(a, !0), s = R(a, 2), c = F(s), l = R(c);
		q(l), E(s);
		var u = R(s, 2), d = F(u), f = R(d);
		{
			let e = /* @__PURE__ */ A(() => X("setup.accentPick"));
			ga(f, {
				get value() {
					return B(mt);
				},
				get label() {
					return B(e);
				},
				onchange: (e) => P(mt, e, !0)
			});
		}
		E(u);
		var p = R(u, 2), m = F(p), h = R(m);
		{
			let e = /* @__PURE__ */ A(() => X("setup.bgLabel"));
			ga(h, {
				get value() {
					return B(ht);
				},
				get label() {
					return B(e);
				},
				onchange: (e) => P(ht, e, !0)
			});
		}
		E(p);
		var g = R(p, 2), _ = L(g, !0), v = R(g, 2), y = F(v), b = L(y, !0), x = R(y, 2), S = L(x, !0);
		E(v), E(n), E(t), z((e, t, n, r, a, s, u, f, p, h) => {
			W(i, e), W(o, t), W(c, `${n ?? ""} `), Y(l, "placeholder", r), W(d, `${a ?? ""} `), W(m, `${s ?? ""} `), W(_, u), W(b, f), x.disabled = p, W(S, h);
		}, [
			() => X("setup.title"),
			() => X("setup.intro"),
			() => X("setup.nameLabel"),
			() => X("ph.setup.name"),
			() => X("setup.accentLabel"),
			() => X("setup.bgLabel"),
			() => X("setup.outro"),
			() => X("setup.skip"),
			() => !B(pt).trim(),
			() => X("setup.start")
		]), V("keydown", l, (e) => e.key === "Enter" && _t()), Di(l, () => B(pt), (e) => P(pt, e)), V("click", y, gt), V("click", x, _t), U(e, t);
	};
	G(Rh, (e) => {
		B(ft) && e(zh);
	});
	var Bh = R(Rh, 2), Vh = (e) => {
		var t = Mp();
		let n;
		var r = F(t), i = L(r, !0), a = R(r, 2);
		E(t), z((e) => {
			n = gi(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: B(b) === "ok",
				error: B(b) === "error"
			}), W(i, B(y)), Y(a, "title", e);
		}, [() => X("ui.close")]), V("click", a, () => S("")), U(e, t);
	};
	G(Bh, (e) => {
		B(y) && e(Vh);
	}), E(hh);
	var Hh = R(hh, 2), Uh = (e) => {
		var t = Np(), n = F(t), r = F(n), i = L(r, !0), o = R(r, 2);
		K(o, () => c.cross, !0), E(o), E(n);
		var s = R(n, 2), l = F(s);
		a(l), E(s), E(t), z((e, n) => {
			vi(t, `left: ${B(Pt).left ?? ""}px; top: ${B(Pt).top ?? ""}px`), W(i, e), Y(o, "title", n);
		}, [() => X("blocks.suffix", { label: En[B(j).type] ?? B(j).type }), () => X("tip.closeEsc")]), V("click", o, () => P(Pt, null)), U(e, t);
	};
	G(Hh, (e) => {
		B(Pt) && B(j) && e(Uh);
	}), z(() => yh = gi(vh, 1, "topbar svelte-1n46o8q", null, yh, { hidden: !B(ne) })), U(e, mh), Ye();
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
var Ip = Br(Fp, { target: document.getElementById("urd-admin") });
//#endregion
export { Ip as default };
