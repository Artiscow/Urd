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
function h(e, t, n = !1) {
	return e === void 0 ? n ? t() : t : e;
}
function g(e, t) {
	if (Array.isArray(e)) return e;
	if (t === void 0 || !(Symbol.iterator in e)) return Array.from(e);
	let n = [];
	for (let r of e) if (n.push(r), n.length === t) break;
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/constants.js
var _ = 1 << 24, v = 1024, y = 2048, b = 4096, x = 8192, S = 16384, ee = 32768, te = 1 << 25, ne = 65536, re = 1 << 19, ie = 1 << 20, ae = 1 << 25, C = 1 << 21, oe = 1 << 22, se = 1 << 23, ce = Symbol("$state"), le = Symbol("component"), ue = Symbol("legacy props"), de = Symbol(""), fe = Symbol("attributes"), pe = Symbol("class"), me = Symbol("style"), he = Symbol("text"), ge = Symbol("form reset"), w = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), _e = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml"), ve = {}, ye = Symbol("uninitialized"), be = "http://www.w3.org/1999/xhtml", xe = "http://www.w3.org/2000/svg", Se = "http://www.w3.org/1998/Math/MathML";
function Ce() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function we(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Te() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
var Ee = !1;
function De(e) {
	Ee = e;
}
var Oe;
function ke(e) {
	if (e === null) throw we(), ve;
	return Oe = e;
}
function Ae() {
	return ke(/* @__PURE__ */ fn(Oe));
}
function T(e) {
	if (Ee) {
		if (/* @__PURE__ */ fn(Oe) !== null) throw we(), ve;
		Oe = e;
	}
}
function je(e = 1) {
	if (Ee) {
		for (var t = e, n = Oe; t--;) n = /* @__PURE__ */ fn(n);
		Oe = n;
	}
}
function Me(e = !0) {
	for (var t = 0, n = Oe;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ fn(n);
		e && n.remove(), n = i;
	}
}
function Ne(e) {
	if (!e || e.nodeType !== 8) throw we(), ve;
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
//#region node_modules/svelte/src/internal/client/errors.js
function Le() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function Re(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function ze(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function Be() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Ve(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function He() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Ue(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function We() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Ge() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function Ke() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function qe() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
//#endregion
//#region node_modules/svelte/src/internal/shared/clone.js
var Je = [];
function Ye(e, t = !1, n = !1) {
	return Xe(e, /* @__PURE__ */ new Map(), "", Je, null, n);
}
function Xe(t, n, r, i, a = null, o = !1) {
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
				d in t && (u[d] = Xe(f, n, r, i, null, o));
			}
			return u;
		}
		if (l(t) === s) {
			u = {}, n.set(t, u), a !== null && n.set(a, u);
			for (var p of Object.keys(t)) u[p] = Xe(t[p], n, r, i, null, o);
			return u;
		}
		if (t instanceof Date) return t.getTime(), structuredClone(t);
		if (typeof t.toJSON == "function" && !o) return Xe(t.toJSON(), n, r, i, t);
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
var Ze = null;
function Qe(e) {
	Ze = e;
}
function $e(e, t = !1, n) {
	Ze = {
		p: Ze,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: Xn,
		l: null
	};
}
function et(e) {
	var t = Ze, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) Tn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, Ze = t.p, tt(e);
}
function tt(e = {}) {
	return i(e, le, { value: !0 }), e;
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
function E(e) {
	if (rt.length === 0 && !Nt) {
		var t = rt;
		queueMicrotask(() => {
			t === rt && it();
		});
	}
	rt.push(e);
}
function at() {
	for (; rt.length > 0;) it();
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/status.js
var ot = ~(y | b | v);
function D(e, t) {
	e.f = e.f & ot | t;
}
function st(e) {
	e.f & 512 || e.deps === null ? D(e, v) : D(e, b);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function ct(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), D(e, v);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
function lt(e, t) {
	if (t) {
		let t = document.body;
		e.autofocus = !0, E(() => {
			document.activeElement === t && e.focus();
		});
	}
}
function ut(e) {
	Ee && /* @__PURE__ */ dn(e) !== null && pn(e);
}
var dt = !1;
function ft() {
	dt || (dt = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[ge]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function pt(e) {
	var t = qn, n = Xn;
	Yn(null), Zn(null);
	try {
		return e();
	} finally {
		Yn(t), Zn(n);
	}
}
function mt(e, t, n, r = n) {
	e.addEventListener(t, () => pt(n));
	let i = e[ge];
	e[ge] = i ? () => {
		i(), r(!0);
	} : () => r(!0), ft();
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function ht(e, t, n, r) {
	let i = nt() ? yt : St;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = Xn, c = gt(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				vn(e, s);
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
		Promise.all(n.map((e) => /* @__PURE__ */ xt(e))).then(u).catch((e) => vn(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), _t();
	}) : f();
}
function gt() {
	var e = Xn, t = qn, n = Ze, r = kt;
	return function(i = !0) {
		Zn(e), Yn(t), Qe(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function _t(e = !0) {
	Zn(null), Yn(null), Qe(null), e && kt?.deactivate();
}
function vt() {
	var e = Xn, t = e.b, n = kt, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function yt(e) {
	var t = 2 | y;
	return Xn !== null && (Xn.f |= re), {
		ctx: Ze,
		deps: null,
		effects: null,
		equals: Pe,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: ye,
		wv: 0,
		parent: Xn,
		ac: null
	};
}
var bt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function xt(e, t, n) {
	let r = Xn;
	r === null && Le();
	var i = void 0, a = Xt(ye), o = !qn, s = /* @__PURE__ */ new Set();
	return On(() => {
		var t = Xn, n = m();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== w && n.reject(e);
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
			l?.(), s.delete(n), t !== bt && (c.activate(), t ? (a.f |= se, en(a, t)) : (a.f & 8388608 && (a.f ^= se), en(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), Cn(() => {
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
function O(e) {
	let t = /* @__PURE__ */ yt(e);
	return $n(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function St(e) {
	let t = /* @__PURE__ */ yt(e);
	return t.equals = Ie, t;
}
function Ct(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) In(t[n]);
	}
}
function wt(e) {
	var t, n = Xn, r = e.parent;
	if (!Gn && r !== null && e.v !== ye && r.f & 24576) return Ce(), e.v;
	Zn(r);
	try {
		Ct(e), t = dr(e);
	} finally {
		Zn(n);
	}
	return t;
}
function Tt(e) {
	var t = wt(e);
	if (!e.equals(t) && (e.wv = cr(), (!kt?.is_fork || e.deps === null) && (kt === null ? e.v = t : (kt.capture(e, t, !0), At?.capture(e, t, !0)), e.deps === null))) {
		D(e, v);
		return;
	}
	Gn || (jt === null ? st(e) : (Sn() || kt?.is_fork) && jt.set(e, t));
}
function Et(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && pt(() => {
		t.ac.abort(w), t.ac = null;
	}), t.fn !== null && (t.teardown = f), mr(t, 0), Pn(t));
}
function Dt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && hr(t);
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
			for (var r of n.d) D(r, y), t(r);
			for (r of n.m) D(r, b), t(r);
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
					t.f ^= v;
				}
			}
			n || e.push(t);
		}
		return this.#c = [], e;
	}
	#_() {
		this.#e = !0;
		for (let e of this.#u) this.#d.delete(e), D(e, y), this.schedule(e);
		for (let e of this.#d) D(e, b), this.schedule(e);
		this.apply();
		for (var t = Ft = [], n = [], r = It = []; this.#c.length > 0;) {
			Lt++ > 1e3 && (this.#S(), Vt());
			for (let e of this.#g()) try {
				this.#v(e, t, n);
			} catch (t) {
				throw Kt(e), this.#h() || this.discard(), t;
			}
		}
		if (kt = null, r.length > 0) {
			var i = e.ensure();
			for (let e of r) i.schedule(e);
		}
		if (Ft = null, It = null, this.#h()) {
			this.#x(n), this.#x(t);
			for (let [e, t] of this.#f) Gt(e, t);
			r.length > 0 && kt.#_();
			return;
		}
		let a = this.#y();
		if (a) {
			this.#x(n), this.#x(t), a.#b(this);
			return;
		}
		this.#u.clear(), this.#d.clear();
		for (let e of this.#r) e(this);
		this.#r.clear(), At = this, Ut(n), Ut(t), At = null, this.#s?.resolve();
		var o = kt;
		if (this.#a === 0 && (this.#c.length === 0 || o !== null) && this.#S(), this.#c.length > 0) {
			if (o !== null) {
				for (let e of this.#c) o.#c.push(e);
				this.#c = [];
			} else o = this;
		}
		o !== null && (Jt.clear(), o.#_());
	}
	#v(e, t, n) {
		e.f ^= v;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
				a ? r.f ^= v : i & 4 ? t.push(r) : lr(r) && (i & 16 && this.#d.add(r), hr(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), D(i, y), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#S(), kt = this, this.#_();
	}
	#x(e) {
		for (var t = 0; t < e.length; t += 1) ct(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== ye && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), jt?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		kt = this;
	}
	deactivate() {
		kt = null, jt = null;
	}
	flush() {
		try {
			Pt = !0, kt = this, this.#_();
		} finally {
			Lt = 0, Mt = null, Ft = null, It = null, Pt = !1, kt = null, jt = null, Jt.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(bt);
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
		this.#m || (this.#m = !0, E(() => {
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
			!Pt && !Nt && E(() => {
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
		this.#c.push(e);
	}
	#S() {
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
			if (at(), kt === null) return n;
			kt.flush();
		}
	} finally {
		Nt = t;
	}
}
function Vt() {
	try {
		He();
	} catch (e) {
		vn(e, Mt);
	}
}
var Ht = null;
function Ut(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && lr(r) && (Ht = /* @__PURE__ */ new Set(), hr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Rn(r), Ht?.size > 0)) {
				Jt.clear();
				for (let e of Ht) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Ht.has(n) && (Ht.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || hr(n);
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
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), D(e, v);
		for (var n = e.first; n !== null;) Gt(n, t), n = n.next;
	}
}
function Kt(e) {
	D(e, v);
	for (var t = e.first; t !== null;) Kt(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var qt = /* @__PURE__ */ new Set(), Jt = /* @__PURE__ */ new Map(), Yt = !1;
function Xt(e, t) {
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
function k(e, t) {
	let n = Xt(e, t);
	return $n(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Zt(e, t = !1, n = !0) {
	let r = Xt(e);
	return t || (r.equals = Ie), r;
}
function A(e, t, n = !1) {
	return qn !== null && (!Jn || qn.f & 131072) && nt() && qn.f & 4325394 && (Qn === null || !Qn.has(e)) && Ke(), en(e, n ? an(t) : t, It);
}
var Qt = null, $t = 0;
function en(e, t, n = null) {
	if (!e.equals(t)) {
		Gn ? Jt.set(e, t) : Jt.has(e) || Jt.set(e, e.v);
		var r = zt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && wt(t), jt === null && st(t);
		}
		e.wv = cr(), Qt = null, $t = 0, rn(e, y, n), Qt = null, nt() && Xn !== null && Xn.f & 1024 && !(Xn.f & 96) && (nr === null ? rr([e]) : nr.push(e)), !r.is_fork && qt.size > 0 && !Yt && tn();
	}
	return t;
}
function tn() {
	Yt = !1;
	for (let e of qt) {
		e.f & 1024 && D(e, b);
		let t;
		try {
			t = lr(e);
		} catch {
			t = !0;
		}
		t && hr(e);
	}
	qt.clear();
}
function nn(e) {
	A(e, e.v + 1);
}
function rn(e, t, n) {
	var r = e.reactions;
	if (r !== null) {
		var i = nt(), a = r.length;
		if ($t += a, $t > 1e5 && Qt === null && (Qt = /* @__PURE__ */ new Set()), Qt !== null) {
			if (Qt.has(e)) return;
			Qt.add(e);
		}
		for (var o = 0; o < a; o++) {
			var s = r[o], c = s.f;
			if (i || s !== Xn) {
				var l = (c & y) === 0;
				if (l && D(s, t), c & 131072) qt.add(s);
				else if (c & 2) {
					var u = s;
					jt?.delete(u), rn(u, b, n);
				} else if (l) {
					var d = s;
					c & 16 && Ht !== null && Ht.add(d), n === null ? Wt(d) : n.push(d);
				}
			}
		}
	}
}
function an(t) {
	if (typeof t != "object" || !t || ce in t || le in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ k(0), u = null, d = or, f = (e) => {
		if (or === d) return e();
		var t = qn, n = or;
		Yn(null), sr(d);
		var r = e();
		return Yn(t), sr(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ k(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && We();
			var i = r.get(t);
			return i === void 0 ? f(() => {
				var e = /* @__PURE__ */ k(n.value, u);
				return r.set(t, e), e;
			}) : A(i, n.value, !0), !0;
		},
		deleteProperty(e, t) {
			var n = r.get(t);
			if (n === void 0) {
				if (t in e) {
					let e = f(() => /* @__PURE__ */ k(ye, u));
					r.set(t, e), nn(o);
				}
			} else A(n, ye), nn(o);
			return !0;
		},
		get(e, n, i) {
			if (n === ce) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ k(an(s ? e[n] : ye), u)), r.set(n, o)), o !== void 0) {
				var c = R(o);
				return c === ye ? void 0 : c;
			}
			return Reflect.get(e, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			this.has?.(e, t);
			var n = Reflect.getOwnPropertyDescriptor(e, t), i = r.get(t);
			if (i !== void 0) {
				var a = R(i);
				if (a === ye) return;
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
			if (t === ce) return !0;
			var n = r.get(t), i = n !== void 0 && n.v !== ye || Reflect.has(e, t);
			return (n !== void 0 || Xn !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ k(i ? an(e[t]) : ye, u)), r.set(t, n)), R(n) === ye) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ k(ye, u)), r.set(d + "", p)) : A(p, ye);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ k(void 0, u)), A(c, an(n)), r.set(t, c));
			else {
				l = c.v !== ye;
				var m = f(() => an(n));
				A(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && A(g, _ + 1);
				}
				nn(o);
			}
			return !0;
		},
		ownKeys(e) {
			R(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== ye;
			});
			for (var [n, i] of r) i.v !== ye && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			Ge();
		}
	});
}
var on, j, sn, cn;
function ln() {
	if (on === void 0) {
		on = window, j = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		sn = a(t, "firstChild").get, cn = a(t, "nextSibling").get, u(e) && (e[pe] = void 0, e[fe] = null, e[me] = void 0, e.__e = void 0), u(n) && (n[he] = void 0);
	}
}
function un(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function dn(e) {
	return sn.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function fn(e) {
	return cn.call(e);
}
function M(e, t) {
	if (!Ee) return /* @__PURE__ */ dn(e);
	var n = /* @__PURE__ */ dn(Oe);
	if (n === null) n = Oe.appendChild(un());
	else if (t && n.nodeType !== 3) {
		var r = un();
		return n?.before(r), ke(r), r;
	}
	return t && gn(n), ke(n), n;
}
function N(e, t = !1) {
	if (!Ee) {
		var n = /* @__PURE__ */ dn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ fn(n) : n;
	}
	if (t) {
		if (Oe?.nodeType !== 3) {
			var r = un();
			return Oe?.before(r), ke(r), r;
		}
		gn(Oe);
	}
	return Oe;
}
function P(e, t = !1) {
	if (!Ee) return /* @__PURE__ */ dn(e);
	var n = M(e, t);
	return T(e), n;
}
function F(e, t = 1, n = !1) {
	let r = Ee ? Oe : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ fn(r);
	if (!Ee) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = un();
			return r === null ? i?.after(a) : r.before(a), ke(a), a;
		}
		gn(r);
	}
	return ke(r), r;
}
function pn(e) {
	e.textContent = "";
}
function mn() {
	return !1;
}
function hn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function gn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
function _n(e) {
	var t = Xn;
	if (t === null) return qn.f |= se, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	vn(e, t);
}
function vn(e, t) {
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
function yn(e) {
	Xn === null && (qn === null && Ve(e), Be()), Gn && ze(e);
}
function bn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function xn(e, t) {
	var n = Xn;
	n !== null && n.f & 8192 && (e |= x);
	var r = {
		ctx: Ze,
		deps: null,
		nodes: null,
		f: e | y | 512,
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
			hr(r);
		} catch (e) {
			throw In(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= ne));
	}
	if (i !== null && (i.parent = n, n !== null && bn(i, n), qn !== null && qn.f & 2 && !(e & 64))) {
		var a = qn;
		(a.effects ??= []).push(i);
	}
	return r;
}
function Sn() {
	return qn !== null && !Jn;
}
function Cn(e) {
	let t = xn(8, null);
	return D(t, v), t.teardown = e, t;
}
function wn(e) {
	yn("$effect");
	var t = Xn.f;
	if (!qn && t & 32 && Ze !== null && !Ze.i) {
		var n = Ze;
		(n.e ??= []).push(e);
	} else return Tn(e);
}
function Tn(e) {
	return xn(4 | ie, e);
}
function En(e) {
	zt.ensure();
	let t = xn(64 | re, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? zn(t, () => {
			In(t), n(void 0);
		}) : (In(t), n(void 0));
	});
}
function Dn(e) {
	return xn(4, e);
}
function On(e) {
	return xn(oe | re, e);
}
function kn(e, t = 0) {
	return xn(8 | t, e);
}
function I(e, t = [], n = [], r = []) {
	ht(r, t, n, (t) => {
		xn(8, () => {
			e(...t.map(R));
		});
	});
}
function An(e, t = 0) {
	return xn(16 | t, e);
}
function jn(e, t = 0) {
	return xn(_ | t, e);
}
function Mn(e) {
	return xn(32 | re, e);
}
function Nn(e) {
	var t = e.teardown;
	if (t !== null) {
		let n = Gn, r = qn;
		Kn(!0), Yn(null);
		try {
			t.call(null);
		} catch (t) {
			vn(t, e.parent);
		} finally {
			Kn(n), Yn(r);
		}
	}
}
function Pn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && pt(() => {
			e.abort(w);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : In(n, t), n = r;
	}
}
function Fn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || In(t), t = n;
	}
}
function In(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Ln(e.nodes.start, e.nodes.end), n = !0), e.f |= te, Pn(e, t && !n), mr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	Nn(e), e.f ^= te, e.f |= S;
	var i = e.parent;
	i !== null && i.first !== null && Rn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Ln(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ fn(e);
		e.remove(), e = n;
	}
}
function Rn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function zn(e, t, n = !0) {
	var r = [];
	e.f |= 256, Bn(e, r, !0);
	var i = () => {
		n && In(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Bn(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= x;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				Bn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Vn(e) {
	e.f &= -257, L(e, !0);
}
function L(e, t) {
	if (!(e.f & 256) && e.f & 8192) {
		e.f ^= x, e.f & 1024 || (D(e, y), zt.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			L(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Hn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ fn(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var Un = null, Wn = !1, Gn = !1;
function Kn(e) {
	Gn = e;
}
var qn = null, Jn = !1;
function Yn(e) {
	qn = e;
}
var Xn = null;
function Zn(e) {
	Xn = e;
}
var Qn = null;
function $n(e) {
	qn !== null && (qn.f & 2097152 || qn.f & 2) && (Qn ??= /* @__PURE__ */ new Set()).add(e);
}
var er = null, tr = 0, nr = null;
function rr(e) {
	nr = e;
}
var ir = 1, ar = 0, or = ar;
function sr(e) {
	or = e;
}
function cr() {
	return ++ir;
}
function lr(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (lr(a) && Tt(a), a.wv > e.wv) return !0;
		}
		t & 512 && jt === null && D(e, v);
	}
	return !1;
}
function ur(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Qn !== null && Qn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? ur(a, t, !1) : t === a && (n ? D(a, y) : a.f & 1024 && D(a, b), Wt(a));
	}
}
function dr(e) {
	var t = er, n = tr, r = nr, i = qn, a = Qn, o = Ze, s = Jn, c = or, l = e.f;
	er = null, tr = 0, nr = null, qn = l & 96 ? null : e, Qn = null, Qe(e.ctx), Jn = !1, or = ++ar, e.ac !== null && (pt(() => {
		e.ac.abort(w);
	}), e.ac = null);
	try {
		e.f |= C;
		var u = e.fn, d = u();
		e.f |= ee;
		var f = fr(e);
		if (nt() && nr !== null && !Jn && f !== null && !(e.f & 6146)) for (var p = 0; p < nr.length; p++) ur(nr[p], e);
		if (i !== null && i !== e) {
			if (ar++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = ar;
			if (t !== null) for (let e of t) e.rv = ar;
			nr !== null && (r === null ? r = nr : r.push(...nr));
		}
		return e.f & 8388608 && (e.f ^= se), d;
	} catch (t) {
		return fr(e), _n(t);
	} finally {
		e.f ^= C, er = t, tr = n, nr = r, qn = i, Qn = a, Qe(o), Jn = s, or = c;
	}
}
function fr(e) {
	var t = e.deps, n = kt?.is_fork;
	if (er !== null) {
		var r;
		if (n || mr(e, tr), t !== null && tr > 0) for (t.length = tr + er.length, r = 0; r < er.length; r++) t[tr + r] = er[r];
		else e.deps = t = er;
		if (Sn() && e.f & 512) for (r = tr; r < t.length; r++) (t[r].reactions ??= []).push(e);
	} else !n && t !== null && tr < t.length && (mr(e, tr), t.length = tr);
	return t;
}
function pr(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && (er === null || !n.call(er, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512), s.v !== ye && st(s), s.ac !== null && pt(() => {
			s.ac.abort(w), s.ac = null, D(s, y);
		}), Et(s), mr(s, 0);
	}
}
function mr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) pr(e, n[r]);
}
function hr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		D(e, v);
		var n = Xn, r = Wn;
		Xn = e, Wn = !(t & 96);
		try {
			t & 16777232 ? Fn(e) : Pn(e), Nn(e);
			var i = dr(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = ir;
		} finally {
			Wn = r, Xn = n;
		}
	}
}
async function gr() {
	await Promise.resolve(), Bt();
}
function R(e) {
	var t = !!(e.f & 2);
	if (Un?.add(e), qn !== null && !Jn && !(Xn !== null && Xn.f & 16384) && (Qn === null || !Qn.has(e))) {
		var r = qn.deps;
		if (qn.f & 2097152) e.rv < ar && (e.rv = ar, er === null && r !== null && r[tr] === e ? tr++ : er === null ? er = [e] : er.push(e));
		else {
			qn.deps ??= [], n.call(qn.deps, e) || qn.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [qn] : n.call(i, qn) || i.push(qn);
		}
	}
	if (Gn && Jt.has(e)) return Jt.get(e);
	if (t) {
		var a = e;
		if (Gn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || vr(a)) && (o = wt(a)), Jt.set(a, o), o;
		}
		var s = !(a.f & 512) && !Jn && qn !== null && (Wn || !!(qn.f & 512)), c = (a.f & ee) === 0;
		lr(a) && (s && (a.f |= 512), Tt(a)), s && !c && (Dt(a), _r(a));
	}
	if (jt?.has(e)) return jt.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function _r(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Dt(t), _r(t));
}
function vr(e) {
	if (e.v === ye) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Jt.has(t) || t.f & 2 && vr(t)) return !0;
	return !1;
}
function yr(e) {
	var t = Jn;
	try {
		return Jn = !0, e();
	} finally {
		Jn = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var br = ["touchstart", "touchmove"];
function xr(e) {
	return br.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var Sr = Symbol("events"), Cr = /* @__PURE__ */ new Set(), wr = /* @__PURE__ */ new Set();
function Tr(e) {
	if (!Ee) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function Er(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || jr.call(t, e), !e.cancelBubble) return pt(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? (i.__removed = !1, E(() => {
		i.__removed || t.addEventListener(e, i, r);
	})) : t.addEventListener(e, i, r), i;
}
function Dr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = Er(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && Cn(() => {
		o.__removed = !0, t.removeEventListener(e, o, a);
	});
}
function z(e, t, n) {
	(t[Sr] ??= {})[e] = n;
}
function Or(e) {
	for (var t = 0; t < e.length; t++) Cr.add(e[t]);
	for (var n of wr) n(e);
}
var kr = null, Ar = !1;
function jr(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	kr = e, Ar || (Ar = !0, setTimeout(() => {
		Ar = !1, kr = null;
	}));
	var s = 0, c = kr === e && e[Sr];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[Sr] = t;
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
		var d = qn, f = Xn;
		Yn(null), Zn(null);
		try {
			for (var p, m = []; o !== null && o !== t;) {
				try {
					var h = o[Sr]?.[r];
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
			e[Sr] = t, delete e.currentTarget, Yn(d), Zn(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var Mr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Nr(e) {
	return Mr?.createHTML(e) ?? e;
}
function Pr(e) {
	var t = hn("template");
	return t.innerHTML = Nr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function Fr(e, t) {
	var n = Xn;
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
		if (Ee) return Fr(Oe, null), Oe;
		i === void 0 && (i = Pr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ dn(i)));
		var t = r || j ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ dn(t), s = t.lastChild;
			Fr(o, s);
		} else Fr(t, t);
		return t;
	};
}
function Ir(e = "") {
	if (!Ee) {
		var t = un(e + "");
		return Fr(t, t), t;
	}
	var n = Oe;
	return n.nodeType === 3 ? gn(n) : (n.before(n = un()), ke(n)), Fr(n, n), n;
}
function Lr() {
	if (Ee) return Fr(Oe, null), Oe;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = un();
	return e.append(t, n), Fr(t, n), e;
}
function V(e, t) {
	if (Ee) {
		var n = Xn;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = Oe), Ae();
		return;
	}
	e !== null && e.before(t);
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function Rr(e) {
	let t = 0, n = Xt(0), r;
	return () => {
		Sn() && (R(n), kn(() => (t === 0 && (r = yr(() => e(() => nn(n)))), t += 1, () => {
			E(() => {
				--t, t === 0 && (r?.(), r = void 0, nn(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var zr = ne | re;
function Br(e, t, n, r) {
	new Vr(e, t, n, r);
}
var Vr = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = Ee ? Oe : null;
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
	#h = Rr(() => (this.#m = Xt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = Xn;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = Xn.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = An(() => {
			if (Ee) {
				let e = this.#t;
				Ae();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#y() : this.#g();
			} else this.#b();
		}, zr), Ee && (this.#e = Oe);
	}
	#g() {
		try {
			this.#a = Mn(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#v(e);
		E(r), t && (this.#s = Mn(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#v(e) {
		var t = !1, n = !1;
		let r = () => {
			if (t) {
				Te();
				return;
			}
			t = !0, n && qe(), this.#s !== null && zn(this.#s, () => {
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
					vn(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#y() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = Mn(() => e(this.#e)), E(() => {
			var e = this.#c = document.createDocumentFragment(), t = un(), n = !1;
			if (e.append(t), this.#a = this.#S(() => {
				try {
					return Mn(() => this.#r(t));
				} catch (e) {
					try {
						this.error(e), n = !0;
					} catch (e) {
						vn(e, this.#i.parent);
					}
					return null;
				}
			}), this.#a === null) {
				this.#c = null, n && this.#x(kt);
				return;
			}
			this.#u === 0 && (this.#e.before(e), this.#c = null, zn(this.#o, () => {
				this.#o = null;
			}), this.#x(kt));
		}));
	}
	#b() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = Mn(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Hn(this.#a, e);
				let t = this.#n.pending;
				this.#o = Mn(() => t(this.#e));
			} else this.#x(kt);
		} catch (e) {
			this.error(e);
		}
	}
	#x(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		ct(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#S(e) {
		var t = Xn, n = qn, r = Ze;
		Zn(this.#i), Yn(this.#i), Qe(this.#i.ctx);
		try {
			return zt.ensure(), e();
		} finally {
			Zn(t), Yn(n), Qe(r);
		}
	}
	#C(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#C(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#x(t), this.#o && zn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#C(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, E(() => {
			this.#d = !1, this.#m && en(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), R(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		kt?.is_fork ? (this.#a && kt.skip_effect(this.#a), this.#o && kt.skip_effect(this.#o), this.#s && kt.skip_effect(this.#s), kt.oncommit(() => {
			this.#w(e);
		})) : this.#w(e);
	}
	#w(e) {
		this.#a &&= (In(this.#a), null), this.#o &&= (In(this.#o), null), this.#s &&= (In(this.#s), null), Ee && (ke(this.#t), je(), ke(Me()));
		let t = this.#n.failed, n = (e) => {
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && (this.#s = this.#S(() => {
				try {
					return Mn(() => {
						var r = Xn;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return vn(e, this.#i.parent), null;
				}
			}));
		};
		E(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				vn(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => vn(e, this.#i && this.#i.parent)) : n(t);
		});
	}
}, Hr = !0;
function H(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[he] ??= e.nodeValue) && (e[he] = n, e.nodeValue = `${n}`);
}
function Ur(e, t) {
	return Gr(e, t);
}
var Wr = /* @__PURE__ */ new Map();
function Gr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	ln();
	var l = void 0, u = En(() => {
		var u = n ?? t.appendChild(un());
		Br(u, { pending: () => {} }, (t) => {
			$e({});
			var n = Ze;
			if (o && (n.c = o), a && (i.$$events = a), Ee && Fr(t, null), Hr = s, l = e(t, i) || tt(), Hr = !0, Ee && (Xn.nodes.end = Oe, Oe === null || Oe.nodeType !== 8 || Oe.data !== "]")) throw we(), ve;
			et();
		}, c);
		var d = /* @__PURE__ */ new Set(), f = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!d.has(r)) {
					d.add(r);
					var i = xr(r);
					for (let e of [t, document]) {
						var a = Wr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Wr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, jr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return f(r(Cr)), wr.add(f), () => {
			for (var e of d) for (let n of [t, document]) {
				var r = Wr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, jr), r.delete(e), r.size === 0 && Wr.delete(n)) : r.set(e, i);
			}
			wr.delete(f), u !== n && u.parentNode?.removeChild(u);
		};
	});
	return Kr.set(l, u), l;
}
var Kr = /* @__PURE__ */ new WeakMap(), qr = class {
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
			if (n) Vn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (Vn(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (In(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						Hn(r, t), t.append(un()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else In(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), zn(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (In(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = kt, r = mn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = un();
				i.append(a), this.#n.set(e, {
					effect: Mn(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, Mn(() => t(this.anchor)));
		}
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else Ee && (this.anchor = Oe), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function U(e, t, n = !1) {
	var r;
	Ee && (r = Oe, Ae());
	var i = new qr(e), a = n ? ne : 0;
	function o(e, t) {
		if (Ee) {
			var n = Ne(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Me();
				ke(a), i.anchor = a, De(!1), i.ensure(e, t), De(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	An(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
function Jr(e, t) {
	return t;
}
function Yr(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		zn(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					Xr(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null && e.pending.size === 0;
		if (l) {
			var u = n, d = u.parentNode;
			pn(d), d.append(u), e.items.clear();
		}
		Xr(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function Xr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= ae, Hn(a, document.createDocumentFragment())) : In(t[i], n);
	}
}
var Zr;
function Qr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = Ee ? ke(/* @__PURE__ */ dn(u)) : u.appendChild(un());
	}
	Ee && Ae();
	var d = null, f = /* @__PURE__ */ St(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, ei(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= ae, ni(d, null, c)) : Vn(d) : zn(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: An(() => {
			p = R(f);
			var e = p.length;
			let t = !1;
			Ee && Ne(c) === "[!" != (e === 0) && (c = Me(), ke(c), De(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = kt, v = mn(), y = 0; y < e; y += 1) {
				Ee && Oe.nodeType === 8 && Oe.data === "]" && (c = Oe, t = !0, De(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && en(S.v, b), S.i && en(S.i, y), v && u.unskip_effect(S.e)) : (S = ti(l, h ? c : Zr ??= un(), b, x, y, o, n, i), h || (S.e.f |= ae), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = Mn(() => s(c)) : (d = Mn(() => s(Zr ??= un())), d.f |= ae)), e > r.size && Re("", "", ""), Ee && e > 0 && ke(Me()), !h) {
				if (m.set(u, r), v) {
					for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
					u.oncommit(g), u.ondiscard(_);
				} else g(u);
			}
			t && De(!0), R(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, Ee && (c = Oe);
}
function $r(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function ei(e, t, n, i, a) {
	var o = !!(i & 8), s = t.length, c = e.items, l = $r(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (Vn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) {
			if (_.f ^= ae, _ === l) ni(_, null, n);
			else {
				var y = d ? d.next : l;
				_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), ri(e, d, _), ri(e, _, y), ni(_, y, n), d = _, p = [], m = [], l = $r(d.next);
				continue;
			}
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], ee = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) ni(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					ri(e, S.prev, ee.next), ri(e, d, S), ri(e, ee, b), l = b, d = ee, --v, p = [], m = [];
				} else u.delete(_), ni(_, l, n), ri(e, _.prev, _.next), ri(e, _, d === null ? e.effect.first : d.next), ri(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = $r(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = $r(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Xr(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var te = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || te.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && te.push(l), l = $r(l.next);
		var ne = te.length;
		if (ne > 0) {
			var re = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < ne; v += 1) te[v].nodes?.a?.measure();
				for (v = 0; v < ne; v += 1) te[v].nodes?.a?.fix();
			}
			Yr(e, te, re);
		}
	}
	o && E(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function ti(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Xt(n) : /* @__PURE__ */ Zt(n, !1, !1) : null, l = o & 2 ? Xt(i) : null;
	return {
		v: c,
		i: l,
		e: Mn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function ni(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ fn(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function ri(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function W(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		Ee && (o = ke(/* @__PURE__ */ dn(c)));
	}
	I(() => {
		var e = Xn;
		if (s === (s = t() ?? "")) {
			Ee && Ae();
			return;
		}
		if (n && !Ee) {
			e.nodes = null, c.innerHTML = s, s !== "" && Fr(/* @__PURE__ */ dn(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (Ln(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (Ee) {
				for (var a = Oe.data, l = Ae(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ fn(l);
				if (l === null) throw we(), ve;
				Fr(Oe, u), o = ke(l);
				return;
			}
			var d = hn(r ? "svg" : i ? "math" : "template", r ? xe : i ? Se : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (Fr(/* @__PURE__ */ dn(f), f.lastChild), r || i) for (; /* @__PURE__ */ dn(f);) o.before(/* @__PURE__ */ dn(f));
			else o.before(f);
		}
	});
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/snippet.js
function ii(e, t, ...n) {
	var r = new qr(e);
	An(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, ne);
}
//#endregion
//#region node_modules/svelte/src/internal/client/timing.js
var ai = () => performance.now(), oi = {
	tick: (e) => requestAnimationFrame(e),
	now: () => ai(),
	tasks: /* @__PURE__ */ new Set()
};
//#endregion
//#region node_modules/svelte/src/internal/client/loop.js
function si() {
	let e = oi.now();
	oi.tasks.forEach((t) => {
		t.c(e) || (oi.tasks.delete(t), t.f());
	}), oi.tasks.size !== 0 && oi.tick(si);
}
function ci(e) {
	let t;
	return oi.tasks.size === 0 && oi.tick(si), {
		promise: new Promise((n) => {
			oi.tasks.add(t = {
				c: e,
				f: n
			});
		}),
		abort() {
			oi.tasks.delete(t);
		}
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/transitions.js
function li(e, t) {
	pt(() => {
		e.dispatchEvent(new CustomEvent(t));
	});
}
function ui(e) {
	if (e === "float") return "cssFloat";
	if (e === "offset") return "cssOffset";
	if (e.startsWith("--")) return e;
	let t = e.split("-");
	return t.length === 1 ? t[0] : t[0] + t.slice(1).map((e) => e[0].toUpperCase() + e.slice(1)).join("");
}
function di(e) {
	let t = {}, n = e.split(";");
	for (let e of n) {
		let [n, r] = e.split(":");
		if (!n || r === void 0) break;
		let i = ui(n.trim());
		t[i] = r.trim();
	}
	return t;
}
var fi = (e) => e;
function pi(e, t, n, r) {
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
			a || f?.abort(), f = mi(t, m(), p, 1, () => {
				li(t, "introstart");
			}, () => {
				li(t, "introend"), f?.abort(), f = l = void 0, t.style.overflow = d;
			});
		},
		out(e) {
			if (!a) {
				e?.(), l = void 0;
				return;
			}
			t.inert = !0, p = mi(t, m(), f, 0, () => {
				li(t, "outrostart");
			}, () => {
				li(t, "outroend"), e?.();
			});
		},
		stop: () => {
			f?.abort(), p?.abort();
		}
	}, g = Xn;
	if ((g.nodes.t ??= []).push(h), i && Hr) {
		var _ = s;
		if (!_) {
			for (var v = g.parent; v && v.f & 65536;) for (; (v = v.parent) && !(v.f & 16););
			_ = !v || !!(v.f & 32768);
		}
		_ && Dn(() => {
			yr(() => h.in());
		});
	}
}
function mi(e, t, n, r, i, a) {
	var o = r === 1, s = !1;
	if (d(t)) {
		var c;
		return E(() => {
			s || (c = mi(e, t({ direction: o ? "in" : "out" }), n, r, i, a));
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
	let { delay: l = 0, css: u, tick: p, easing: m = fi } = t;
	var h, g = () => 1 - r;
	return E(() => {
		if (!s) {
			var c = [];
			if (o && n === void 0 && (p && p(0, 1), u)) {
				var d = di(u(0, 1));
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
						var v = o + s * m(_ / f), y = di(u(v, 1 - v));
						l.push(y), d ||= y.overflow === "hidden";
					}
					d && (e.style.overflow = "hidden"), g = () => {
						var e = h.currentTime;
						return o + s * m(e / c);
					}, p && ci(() => {
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
function hi(e, t) {
	var n = void 0, r;
	jn(() => {
		n !== (n = t()) && (r &&= (In(r), null), n && (r = Mn(() => {
			Dn(() => n(e));
		})));
	});
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
var gi = [..." 	\n\r\f\xA0\v﻿"];
function _i(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || gi.includes(r[o - 1])) && (s === r.length || gi.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function vi(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function yi(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function bi(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\/\*.*?\*\//g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(yi)), i && c.push(...Object.keys(i).map(yi));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = yi(e.substring(l, u).trim());
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
		return r && (n += vi(r)), i && (n += vi(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function xi(e, t, n, r, i, a) {
	var o = e[pe];
	if (Ee || o !== n || o === void 0) {
		var s = _i(n, r, a);
		(!Ee || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[pe] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/style.js
function Si(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function Ci(e, t, n, r) {
	var i = e[me];
	if (Ee || i !== t) {
		var a = bi(t, r);
		(!Ee || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[me] = t;
	} else r && (Array.isArray(r) ? (Si(e, n?.[0], r[0]), Si(e, n?.[1], r[1], "important")) : Si(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var wi = Symbol("is custom element"), Ti = Symbol("is html"), Ei = _e ? "link" : "LINK", Di = _e ? "progress" : "PROGRESS";
function G(e) {
	if (Ee) {
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
		e[ge] = n, E(n), ft();
	}
}
function K(e, t) {
	var n = ki(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === Di) && (e.value = t ?? "");
}
function Oi(e, t) {
	var n = ki(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function q(e, t, n, r) {
	var i = ki(e);
	Ee && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === Ei) || i[t] !== (i[t] = n) && (t === "loading" && (e[de] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && ji(e).has(t) ? e[t] = n : e.setAttribute(t, n));
}
function ki(e) {
	return e[fe] ??= {
		[wi]: e.nodeName.includes("-"),
		[Ti]: e.namespaceURI === be
	};
}
var Ai = /* @__PURE__ */ new Map();
function ji(e) {
	var t = e.getAttribute("is") || e.nodeName, n = Ai.get(t);
	if (n) return n;
	Ai.set(t, n = /* @__PURE__ */ new Set());
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.add(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function Mi(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	mt(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = Ni(e) ? Pi(a) : a, n(a), kt !== null && r.add(kt), await gr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (Ee && e.defaultValue !== e.value || yr(t) == null && e.value) && (n(Ni(e) ? Pi(e.value) : e.value), kt !== null && r.add(kt)), kn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = kt;
			if (r.has(i)) return;
		}
		Ni(e) && n === Pi(e.value) || (e.type !== "date" || n || e.value) && n !== e.value && (e.value = n ?? "");
	});
}
function Ni(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function Pi(e) {
	return e === "" ? null : +e;
}
var Fi = /* @__PURE__ */ new class e {
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
function Ii(e, t, n) {
	var r = Fi.observe(e, () => n(e[t]));
	Dn(() => (yr(() => n(e[t])), r));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function Li(e, t) {
	return e === t || e?.[ce] === t;
}
function Ri(e = tt(), t, n, r) {
	var i = Ze.r, a = Xn;
	return Dn(() => {
		var o, s;
		return kn(() => {
			o = s, s = r?.() || [], yr(() => {
				Li(n(...s), e) || (t(e, ...s), o && Li(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && Li(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/universal.js
function zi(e, t, n, r, i) {
	var a = () => {
		r(n[e]);
	};
	n.addEventListener(t, a), i ? kn(() => {
		n[e] = i();
	}) : a(), (n === document.body || n === window || n === document) && Cn(() => {
		n.removeEventListener(t, a);
	});
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var Bi = !1;
function Vi(e) {
	var t = Bi;
	try {
		return Bi = !1, [e(), Bi];
	} finally {
		Bi = t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
function Hi(e, t, n, r) {
	var i = !0, o = !!(n & 8), s = !!(n & 16), c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ yt(r), R(u)) : (l && (l = !1, c = s ? yr(r) : r), c);
	let f;
	if (o) {
		var p = ce in e || ue in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = Vi(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && Ue(t), f(m)));
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
	o && R(y);
	var b = Xn;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? R(y) : i && o ? an(e) : e;
			return A(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Gn && v || b.f & 16384 ? y.v : R(y);
	});
}
var Ui = {
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
}, Wi = [
	"nb",
	"nn",
	"en-GB",
	"se",
	"tr"
], Gi = /^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/, Ki = {
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
function qi(e) {
	let t = String(e ?? "").trim().toLowerCase();
	for (let [e, n] of Object.entries(Ki)) if (n.some((e) => t === e || t.startsWith(`${e}-`))) return e;
	return null;
}
function Ji(e) {
	return Wi.includes(String(e ?? ""));
}
function Yi(e) {
	let t = [];
	if (!Array.isArray(e)) return ["languages must be a list"];
	for (let n of e) {
		if (!n || typeof n != "object" || Array.isArray(n)) {
			t.push("languages: every entry must be an object");
			continue;
		}
		let e = String(n.code ?? "");
		Gi.test(e) ? Ji(e) && t.push(`languages: '${e}' is built into Urd and cannot be overridden`) : t.push(`languages: '${e}' is not a valid language code`), (typeof n.name != "string" || !n.name.trim()) && t.push(`languages/${e}: name is missing (the language's own name)`);
		for (let r of ["site", "admin"]) n[r] !== void 0 && typeof n[r] != "boolean" && t.push(`languages/${e}: ${r} must be a boolean`);
		n.site !== !0 && n.admin !== !0 && t.push(`languages/${e}: must cover site, admin or both`);
	}
	return t;
}
function Xi(e) {
	let t = qi(e);
	if (t) return t;
	let n = String(e ?? "").trim();
	return Gi.test(n) ? n : "nb";
}
async function Zi(e, t) {
	try {
		return await (await import(
			/* @vite-ignore */
			"/assets/urd/language-packs.js"
)).loadPackStrings(e, t);
	} catch {
		return null;
	}
}
var Qi = {
	lang: "nb",
	dict: { ...Ui.strings },
	dates: null
}, $i = {
	lang: "nb",
	dict: {}
};
function ea(e, t) {
	if (!t) return e;
	let n = e;
	for (let [e, r] of Object.entries(t)) n = n.replaceAll(`{${e}}`, String(r));
	return n;
}
function J(e, t) {
	return ea($i.dict[e] ?? e, t);
}
function ta(e, t) {
	let n = "other";
	try {
		n = new Intl.PluralRules(Qi.lang).select(t);
	} catch {}
	let r = Qi.dict[`${e}.${n}`] !== void 0 || Qi.dict[`${e}.other`] === void 0 ? n : "other";
	return {
		form: r,
		key: `${e}.${r}`
	};
}
function na(e, t, n) {
	let { key: r } = ta(e, t);
	return ea(Qi.dict[r] ?? r, {
		...n,
		n: t
	});
}
function ra(e) {
	let t = `api.${e?.code}`;
	return e?.code && $i.dict[t] !== void 0 ? ea($i.dict[t], e) : e?.error ?? null;
}
function ia() {
	return $i.lang;
}
function aa() {
	let e = null;
	try {
		e = localStorage.getItem("urd-admin-lang");
	} catch {}
	if (e) return Xi(e);
	for (let e of navigator.languages ?? [navigator.language]) {
		let t = qi(e);
		if (t) return t;
	}
	return "en-GB";
}
var oa;
new Promise((e) => {
	oa = e;
});
async function sa(e = aa()) {
	let t = async (e) => (await import(
		/* @vite-ignore */
		`/assets/urd/locales/admin/${e}.js`
)).default.strings;
	$i.lang = Xi(e);
	let n = Ji($i.lang);
	try {
		Object.assign($i.dict, await t("nb")), n && $i.lang !== "nb" && Object.assign($i.dict, await t($i.lang));
	} catch {}
	if (!n) {
		let e = await Zi($i.lang, "admin");
		e ? Object.assign($i.dict, e) : $i.lang = "nb";
	}
	return oa($i.lang), $i.lang;
}
//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region node_modules/svelte/src/reactivity/set.js
var ca = [
	"forEach",
	"isDisjointFrom",
	"isSubsetOf",
	"isSupersetOf"
], la = [
	"difference",
	"intersection",
	"symmetricDifference",
	"union"
], ua = !1, da = class e extends Set {
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ k(0);
	#n = /* @__PURE__ */ k(0);
	#r = or || -1;
	constructor(e) {
		if (super(), e) {
			for (var t of e) super.add(t);
			this.#n.v = super.size;
		}
		ua || this.#a();
	}
	#i(e) {
		return or === this.#r ? /* @__PURE__ */ k(e) : Xt(e);
	}
	#a() {
		ua = !0;
		var t = e.prototype, n = Set.prototype;
		for (let e of ca) t[e] = function(...t) {
			return R(this.#t), n[e].apply(this, t);
		};
		for (let r of la) t[r] = function(...t) {
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
		return super.has(e) || (super.add(e), A(this.#n, super.size), nn(this.#t)), this;
	}
	delete(e) {
		var t = super.delete(e), n = this.#e, r = n.get(e);
		return r !== void 0 && (n.delete(e), A(r, !1)), t && (A(this.#n, super.size), nn(this.#t)), t;
	}
	clear() {
		if (super.size !== 0) {
			super.clear();
			var e = this.#e;
			for (var t of e.values()) A(t, !1);
			e.clear(), A(this.#n, 0), nn(this.#t);
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
};
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
		var t = Oa(), n = N(t), a = P(n), o = F(n, 2);
		G(o);
		var s = F(o, 2);
		G(s);
		var c = F(s, 2), l = M(c), u = F(l, 2);
		G(u);
		var d = F(u, 2), f = (e) => {
			var t = ba();
			I((e) => q(t, "title", e), [() => J("cp.eyedropper")]), z("click", t, Se), V(e, t);
		};
		U(d, (e) => {
			xe && e(f);
		}), T(c);
		var p = F(c, 2);
		Qr(p, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = xa();
			G(r), I((e) => {
				q(r, "title", t), K(r, e);
			}, [() => ye(R(n))]), z("change", r, (e) => be(R(n), e.target.value)), V(e, r);
		}), T(p);
		var v = F(p, 2), y = (e) => {
			var t = Ca(), n = N(t), a = M(n, !0), o = F(a), s = (e) => {
				var t = Ir();
				I((e) => H(t, e), [() => J("cp.linkedSuffix", { token: m() })]), V(e, t);
			}, c = /* @__PURE__ */ O(() => m());
			U(o, (e) => {
				R(c) && e(s);
			}), T(n);
			var l = F(n, 2);
			Qr(l, 21, i, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ O(() => g(R(t), 2));
				let i = () => R(n)[0], a = () => R(n)[1];
				var o = Sa();
				let s;
				I((e) => {
					s = xi(o, 1, "cp-token svelte-zxiloo", null, s, { active: r() === i() }), Ci(o, `background: ${a() ?? ""}`), q(o, "title", e);
				}, [() => J("cp.tokenTitle", { name: i() })]), z("click", o, () => w(i(), a())), V(e, o);
			}), T(l), I((e) => H(a, e), [() => J("cp.themeColors")]), V(e, t);
		};
		U(v, (e) => {
			i().length && e(y);
		});
		var b = F(v, 2), x = M(b), S = F(x);
		T(b);
		var ae = F(b, 2), C = (e) => {
			var t = Ta();
			Qr(t, 20, () => R(_), (e) => e, (e, t) => {
				var n = wa(), r = M(n), i = F(r, 2);
				T(n), I((e) => {
					Ci(r, `background: ${t ?? ""}`), q(r, "title", t), q(i, "title", e);
				}, [() => J("cp.removeSaved")]), z("click", r, () => Ce(t)), z("click", i, () => Te(t)), V(e, n);
			}), T(t), V(e, t);
		};
		U(ae, (e) => {
			R(_).length && e(C);
		});
		var oe = F(ae, 2), se = (e) => {
			var t = Da(), n = N(t), r = P(n, !0), i = F(n, 2);
			Qr(i, 20, () => R(h), (e) => e, (e, t) => {
				var n = Ea();
				I(() => {
					Ci(n, `background: ${t ?? ""}`), q(n, "title", t);
				}), z("click", n, () => Ce(t)), V(e, n);
			}), T(i), I((e) => H(r, e), [() => J("common.recent")]), V(e, t);
		};
		U(oe, (e) => {
			R(h).length && e(se);
		}), I((e, t, r, i, c) => {
			Ci(n, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${R(ee) ?? ""}, 100%, 50%)`), Ci(a, `left: ${R(te) * 100}%; top: ${(1 - R(ne)) * 100}%`), K(o, R(ee)), K(s, e), q(s, "title", t), Ci(s, `background: linear-gradient(to right, transparent, ${r ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), Ci(l, `background: ${R(ie) ?? ""}`), K(u, R(ie)), H(x, `${i ?? ""} `), q(S, "title", c);
		}, [
			() => Math.round(R(re) * 100),
			() => J("cp.alpha"),
			() => ce(),
			() => J("cp.saved"),
			() => J("cp.saveTitle")
		]), z("pointerdown", n, _e), z("input", o, (e) => {
			A(ee, Number(e.target.value), !0), ue();
		}), z("input", s, (e) => {
			A(re, Number(e.target.value) / 100), ue();
		}), z("change", u, ve), z("click", S, we), V(e, t);
	}, r = Hi(t, "value", 3, "#000000"), i = Hi(t, "tokens", 19, () => []), a = Hi(t, "label", 19, () => J("cp.pickColor")), o = Hi(t, "allowClear", 3, !1), s = "urd-recent-colors", c = "urd-saved-colors", l = ga(), u = va("urd-cp"), d = u.slice(2), f = /* @__PURE__ */ k(null), p = () => {
		let e = i().find(([e]) => e === r());
		return e ? e[1] : r();
	}, m = () => i().find(([e]) => e === r())?.[0] ?? null, h = /* @__PURE__ */ k(an([])), _ = /* @__PURE__ */ k(an([])), v = "", y = "", b = /* @__PURE__ */ k(null), x = /* @__PURE__ */ k(!1), S = /* @__PURE__ */ k(an({
		top: 0,
		left: 0
	})), ee = /* @__PURE__ */ k(0), te = /* @__PURE__ */ k(0), ne = /* @__PURE__ */ k(1), re = /* @__PURE__ */ k(1), ie = /* @__PURE__ */ k("#000000");
	function ae(e) {
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
	function oe(e, t, n) {
		e /= 255, t /= 255, n /= 255;
		let r = Math.max(e, t, n), i = r - Math.min(e, t, n), a = 0;
		return i && (a = r === e ? (t - n) / i % 6 : r === t ? (n - e) / i + 2 : (e - t) / i + 4, a *= 60, a < 0 && (a += 360)), [
			a,
			r ? i / r : 0,
			r
		];
	}
	function se(e, t, n) {
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
	function ce() {
		return C(...se(R(ee), R(te), R(ne)));
	}
	function le() {
		let e = ce();
		return R(re) >= .995 ? e : e + Math.round(R(re) * 255).toString(16).padStart(2, "0");
	}
	function ue() {
		A(ie, le(), !0), y = R(ie), t.onchange?.(R(ie));
	}
	function de(e) {
		let t = ae(e);
		return t ? (((e) => {
			var t = g(e, 3);
			A(ee, t[0], !0), A(te, t[1], !0), A(ne, t[2], !0);
		})(oe(t[0], t[1], t[2])), A(re, t[3], !0), A(ie, le(), !0), !0) : !1;
	}
	function fe() {
		de(p()) || de("#000000"), v = r(), y = "";
		try {
			let e = JSON.parse(localStorage.getItem(s) ?? "[]");
			A(h, Array.isArray(e) ? e : [], !0);
		} catch {
			A(h, [], !0);
		}
		try {
			let e = JSON.parse(localStorage.getItem(c) ?? "[]");
			A(_, Array.isArray(e) ? e : [], !0);
		} catch {
			A(_, [], !0);
		}
	}
	function pe(e) {
		e.newState === "open" ? (fe(), ya(R(b), !0), A(x, !0)) : R(x) && (ya(R(b), !1), A(x, !1), he());
	}
	function me() {
		fe();
		let e = R(b).getBoundingClientRect(), t = R(b).closest(".panel-body")?.getBoundingClientRect(), n = t ? t.right : window.innerWidth, r = Math.max(8, Math.min(e.right - 236, n - 236 - 8)), i = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		A(S, {
			top: i,
			left: r
		}, !0), A(x, !0);
	}
	function he() {
		if (y && y !== v) {
			let e = [y, ...R(h).filter((e) => e !== y)].slice(0, 8);
			localStorage.setItem(s, JSON.stringify(e));
		}
	}
	function ge() {
		if (l) {
			R(f)?.hidePopover();
			return;
		}
		A(x, !1), he();
	}
	function w(e, n) {
		de(n), A(ie, n, !0), t.onchange?.(e);
	}
	function _e(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			A(te, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), A(ne, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), ue();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function ve(e) {
		de(e.target.value) ? ue() : A(ie, ce(), !0);
	}
	function ye(e) {
		return (ae(ce()) ?? [
			0,
			0,
			0
		])[e];
	}
	function be(e, t) {
		let n = ae(ce()) ?? [
			0,
			0,
			0
		];
		n[e] = Math.min(255, Math.max(0, Number(t) || 0)), ((e) => {
			var t = g(e, 3);
			A(ee, t[0], !0), A(te, t[1], !0), A(ne, t[2], !0);
		})(oe(...n)), ue();
	}
	let xe = typeof window < "u" && "EyeDropper" in window;
	async function Se() {
		try {
			de((await new window.EyeDropper().open()).sRGBHex) && ue();
		} catch {}
	}
	function Ce(e) {
		de(e) && ue();
	}
	function we() {
		let e = le();
		R(_).includes(e) || (A(_, [e, ...R(_)].slice(0, 12), !0), localStorage.setItem(c, JSON.stringify(Ye(R(_)))));
	}
	function Te(e) {
		A(_, R(_).filter((t) => t !== e), !0), localStorage.setItem(c, JSON.stringify(Ye(R(_))));
	}
	wn(() => {
		if (!R(x)) return;
		let e = () => ge();
		if (window.addEventListener("blur", e), l) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			R(b) && !R(b).contains(e.target) && ge();
		}, n = (e) => {
			e.key === "Escape" && ge();
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), () => {
			document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), window.removeEventListener("blur", e);
		};
	});
	var Ee = Ma(), De = M(Ee);
	let Oe;
	var ke = F(De, 2), Ae = (e) => {
		var n = ka();
		I((e, t) => {
			q(n, "title", e), q(n, "aria-label", t);
		}, [() => J("cp.clearTitle"), () => J("cp.clear")]), z("click", n, () => t.onchange?.("")), V(e, n);
	};
	U(ke, (e) => {
		o() && r() && e(Ae);
	});
	var je = F(ke, 2), Me = (e) => {
		var t = Aa(), r = M(t), i = (e) => {
			n(e);
		};
		U(r, (e) => {
			R(x) && e(i);
		}), T(t), Ri(t, (e) => A(f, e), () => R(f)), I(() => {
			q(t, "id", d), Ci(t, `position-anchor: ${u ?? ""}`);
		}), Dr("toggle", t, pe), z("click", t, (e) => e.preventDefault()), V(e, t);
	}, Ne = (e) => {
		var t = ja(), r = M(t);
		n(r), T(t), I(() => Ci(t, `top: ${R(S).top ?? ""}px; left: ${R(S).left ?? ""}px`)), z("click", t, (e) => e.preventDefault()), V(e, t);
	};
	U(je, (e) => {
		l ? e(Me) : R(x) && e(Ne, 1);
	}), T(Ee), Ri(Ee, (e) => A(b, e), () => R(b)), I((e, t, n) => {
		Oe = xi(De, 1, "cp-swatch svelte-zxiloo", null, Oe, {
			linked: e,
			"cp-empty": o() && !r()
		}), Ci(De, `background: ${t ?? ""}${l ? `; anchor-name: ${u}` : ""}`), q(De, "title", n), q(De, "popovertarget", l ? d : void 0), q(De, "aria-label", a());
	}, [
		() => m(),
		() => r() ? p() : "transparent",
		() => m() ? J("cp.linkedTitle", {
			label: a(),
			token: m()
		}) : a()
	]), z("click", De, function(...e) {
		(l ? void 0 : () => R(x) ? ge() : me())?.apply(this, e);
	}), V(e, Ee), et();
}
Or([
	"pointerdown",
	"input",
	"change",
	"click"
]);
//#endregion
//#region ../template/assets/engine/0.7.4/imageTools.js
var Pa = 1600, Fa = .82, Ia = .6, La = 15e6, Ra = 4e6, za = 256e3;
function Ba(e) {
	if (!Ha(e, 0, "GIF8")) return !1;
	for (let t = 13; t < e.length - 11; t++) if (e[t] === 33 && e[t + 1] === 255 && e[t + 2] === 11 && (Ha(e, t + 3, "NETSCAPE2.0") || Ha(e, t + 3, "ANIMEXTS1.0"))) return !0;
	return !1;
}
var Va = class extends Error {
	constructor(e) {
		super("The animated image is too large"), this.code = "animatedTooLarge", this.bytes = e;
	}
}, Ha = (e, t, n) => {
	if (t + n.length > e.length) return !1;
	for (let r = 0; r < n.length; r += 1) if (e[t + r] !== n.charCodeAt(r)) return !1;
	return !0;
};
function Ua(e) {
	if (!Ha(e, 0, "GIF87a") && !Ha(e, 0, "GIF89a") || e.length < 13) return !1;
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
function Wa(e) {
	return !Ha(e, 0, "RIFF") || !Ha(e, 8, "WEBP") ? !1 : Ha(e, 12, "VP8X") && e.length > 20 && !!(e[20] & 2);
}
function Ga(e) {
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
		if (Ha(e, t + 4, "acTL")) return !0;
		if (Ha(e, t + 4, "IDAT") || Ha(e, t + 4, "IEND")) return !1;
		t += 12 + n;
	}
	return !1;
}
function Ka(e) {
	return e instanceof Uint8Array ? Ua(e) ? "gif" : Wa(e) ? "webp" : Ga(e) ? "png" : null : null;
}
async function qa(e) {
	if (!/^image\/(?:gif|webp|png|apng)$/i.test(e.type || "") && !/\.(?:gif|webp|a?png)$/i.test(e.name || "")) return null;
	if (e.size > 4e6) {
		let t = new Uint8Array(await e.slice(0, za).arrayBuffer());
		if (Ka(t) || Ba(t)) throw new Va(e.size);
		return null;
	}
	let t = new Uint8Array(await e.arrayBuffer()), n = Ka(t);
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
async function Ja(e, t = Pa, { still: n = !1 } = {}) {
	if (Xa(e)) return Za(await e.text());
	let r = n ? null : await qa(e);
	if (r) return r;
	let i = await createImageBitmap(e), a = Math.min(1, t / Math.max(i.width, i.height)), o = Math.round(i.width * a), s = Math.round(i.height * a), c = document.createElement("canvas");
	c.width = o, c.height = s, c.getContext("2d").drawImage(i, 0, 0, o, s), i.close();
	let l = (e) => new Promise((t) => c.toBlob(t, "image/webp", e)), u = await l(Fa);
	return u.size > 4e5 && (u = await l(Ia)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(u);
		}),
		bytes: u.size,
		width: o,
		height: s
	};
}
var Ya = "image/svg+xml";
function Xa(e) {
	return e.type === Ya || /\.svg$/i.test(e.name || "");
}
function Za(e) {
	let t = String(e ?? "");
	if (!/<svg[\s>]/i.test(t)) throw Error("Invalid SVG");
	if (/<\s*script[\s>]/i.test(t) || /<\s*foreignObject[\s>]/i.test(t) || /\son[a-z]+\s*=/i.test(t) || /javascript:/i.test(t)) throw Error("The SVG contains scripts or event handlers and cannot be used");
	let n = new Blob([t]).size, r = `data:${Ya};base64,${btoa(unescape(encodeURIComponent(t)))}`, i = t.match(/<svg\b[^>]*>/i)?.[0] ?? "", a = i.match(/viewBox\s*=\s*["']\s*([-\d.]+(?:[\s,]+[-\d.]+){3})\s*["']/i)?.[1]?.split(/[\s,]+/).map(Number);
	return {
		dataUrl: r,
		bytes: n,
		width: a?.length === 4 ? a[2] : Number.parseFloat(i.match(/\bwidth\s*=\s*["']?([\d.]+)/i)?.[1]) || 0,
		height: a?.length === 4 ? a[3] : Number.parseFloat(i.match(/\bheight\s*=\s*["']?([\d.]+)/i)?.[1]) || 0
	};
}
function Qa(e, t, n = .04) {
	let r = String(e ?? "");
	if (!t || !(t.width > 0) || !(t.height > 0)) return r;
	let i = r.match(/<svg\b[^>]*>/i)?.[0];
	if (!i) return r;
	let a = (e) => Math.round(e * 1e3) / 1e3, o = Math.max(t.width, t.height) * Math.max(0, n), s = a(t.x - o), c = a(t.y - o), l = a(t.width + 2 * o), u = a(t.height + 2 * o), d = i.replace(/\sviewBox\s*=\s*["'][^"']*["']/i, "").replace(/\swidth\s*=\s*["'][^"']*["']/i, "").replace(/\sheight\s*=\s*["'][^"']*["']/i, "").replace(/<svg\b/i, `<svg viewBox="${s} ${c} ${l} ${u}" width="${l}" height="${u}"`);
	return r.replace(i, d);
}
function $a(e) {
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
function eo(e) {
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
function to(e, t = "image") {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || t;
}
function no(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region ../template/assets/engine/0.7.4/glyphs.js
var ro = "urd-recent-glyphs", io = "urd-recent-icons", ao = [
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
function oo(e, t) {
	return [t, ...(Array.isArray(e) ? e : []).filter((e) => e !== t)].slice(0, 16);
}
var so = (e) => {
	try {
		let t = JSON.parse(localStorage.getItem(e) ?? "[]");
		return Array.isArray(t) ? t : [];
	} catch {
		return [];
	}
}, co = (e, t, n) => {
	let r = oo(t, n);
	try {
		localStorage.setItem(e, JSON.stringify(r));
	} catch {}
	return r;
};
function lo() {
	return so(ro);
}
function uo(e) {
	return co(ro, lo(), e);
}
function fo() {
	return so(io);
}
function po(e) {
	return co(io, fo(), e);
}
//#endregion
//#region ../template/assets/engine/0.7.4/icons.js
var mo = "fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"", ho = "fill=\"currentColor\" stroke=\"none\"", go = {
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
}, _o = [
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
function vo(e) {
	let t = typeof e == "string" ? go[e] : null;
	return t ? `<svg viewBox="0 0 24 24" width="100%" height="100%" ${t.fill ? ho : mo} aria-hidden="true" focusable="false">${t.body}</svg>` : null;
}
//#endregion
//#region src/lib/GlyphPicker.svelte
var yo = /* @__PURE__ */ B("<button type=\"button\"><span class=\"gp-svg svelte-15ln1c3\"></span></button>"), bo = /* @__PURE__ */ B("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), xo = /* @__PURE__ */ B("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"><!> <!></div>", 1), So = /* @__PURE__ */ B("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), Co = /* @__PURE__ */ B("<button type=\"button\"> </button>"), wo = /* @__PURE__ */ B("<div class=\"gp-group svelte-15ln1c3\"> </div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\"> </button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\"> </p>", 1), To = /* @__PURE__ */ B("<!> <!> <!> <!>", 1), Eo = /* @__PURE__ */ B("<img class=\"gp-own svelte-15ln1c3\"/>"), Do = /* @__PURE__ */ B("<span class=\"gp-svg svelte-15ln1c3\"></span>"), Oo = /* @__PURE__ */ B("<div class=\"gp-pop gp-anchored svelte-15ln1c3\" popover=\"auto\"><!></div>"), ko = /* @__PURE__ */ B("<div class=\"gp-pop svelte-15ln1c3\"><!></div>"), Ao = /* @__PURE__ */ B("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"><!></button> <!></span>");
function jo(e, t) {
	$e(t, !0);
	let n = (e) => {
		var n = To(), a = N(n), o = (e) => {
			var t = xo(), n = N(t), r = P(n, !0), a = F(n, 2), o = M(a);
			Qr(o, 16, () => R(d), (e) => e, (e, t) => {
				var n = yo();
				let r;
				var a = M(n);
				W(a, () => vo(t), !0), T(a), T(n), I((e) => {
					r = xi(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, r, { active: t === i() }), q(n, "title", e);
				}, [() => J(go[t].labelKey)]), z("click", n, () => ee(t)), V(e, n);
			}), Qr(F(o, 2), 16, () => R(u), (e) => e, (e, t) => {
				var n = bo(), r = P(n, !0);
				I(() => H(r, t)), z("click", n, () => S(t)), V(e, n);
			}), T(a), I((e) => H(r, e), [() => J("common.recent")]), V(e, t);
		};
		U(a, (e) => {
			(R(u).length || R(d).length) && e(o);
		});
		var s = F(a, 2), c = (e) => {
			var t = Lr();
			Qr(N(t), 17, () => _o, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ O(() => g(R(t), 2));
				let r = () => R(n)[0], a = () => R(n)[1];
				var o = So(), s = N(o), c = P(s, !0), l = F(s, 2);
				Qr(l, 20, a, (e) => e, (e, t) => {
					var n = yo();
					let r;
					var a = M(n);
					W(a, () => vo(t), !0), T(a), T(n), I((e) => {
						r = xi(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, r, { active: t === i() }), q(n, "title", e);
					}, [() => J(go[t].labelKey)]), z("click", n, () => ee(t)), V(e, n);
				}), T(l), I((e) => H(c, e), [() => J(r())]), V(e, o);
			}), V(e, t);
		};
		U(s, (e) => {
			t.onicon && e(c);
		});
		var l = F(s, 2);
		Qr(l, 17, () => ao, ([e, t]) => e, (e, t) => {
			var n = /* @__PURE__ */ O(() => g(R(t), 2));
			let i = () => R(n)[0], a = () => R(n)[1];
			var o = So(), s = N(o), c = P(s, !0), l = F(s, 2);
			Qr(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var n = Co();
				let i;
				var a = P(n, !0);
				I(() => {
					i = xi(n, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === r() }), H(a, t);
				}), z("click", n, () => S(t)), V(e, n);
			}), T(l), I((e) => H(c, e), [() => J(i())]), V(e, o);
		});
		var f = F(l, 2), p = (e) => {
			var t = wo(), n = N(t), r = P(n, !0), i = F(n, 2), a = P(i, !0), o = F(i, 2);
			Ri(o, (e) => A(m, e), () => R(m));
			var s = P(F(o, 2), !0);
			I((e, t, n) => {
				H(r, e), H(a, t), H(s, n);
			}, [
				() => J("gp.ownIcon"),
				() => J("gp.upload"),
				() => J("gp.uploadHint")
			]), z("click", i, () => R(m).click()), z("change", o, te), V(e, t);
		};
		U(f, (e) => {
			t.onimage && e(p);
		}), V(e, n);
	}, r = Hi(t, "value", 3, "★"), i = Hi(t, "icon", 3, null), a = Hi(t, "image", 3, null), o = Hi(t, "label", 19, () => J("gp.pickGlyph")), s = ga(), c = va("urd-gp"), l = c.slice(2), u = /* @__PURE__ */ k(an([])), d = /* @__PURE__ */ k(an([])), f = /* @__PURE__ */ k(null), p = /* @__PURE__ */ k(null), m = /* @__PURE__ */ k(null), h = /* @__PURE__ */ k(!1), _ = /* @__PURE__ */ k(an({
		top: 0,
		left: 0
	}));
	function v() {
		A(u, lo(), !0), A(d, t.onicon ? fo().filter((e) => go[e]) : [], !0);
	}
	function y(e) {
		A(h, e.newState === "open"), ya(R(f), R(h)), R(h) && v();
	}
	function b() {
		s && R(p)?.hidePopover(), A(h, !1);
	}
	function x() {
		v();
		let e = R(f).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		A(_, {
			top: n,
			left: t
		}, !0), A(h, !0);
	}
	function S(e) {
		uo(e), t.onpick?.(e), b();
	}
	function ee(e) {
		po(e), t.onicon?.(e), b();
	}
	async function te(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", n) {
			try {
				let e = await Ja(n, 256, { still: !0 });
				t.onimage?.(e.dataUrl);
			} catch (e) {
				console.warn("Urd: the icon could not be read", e);
			}
			b();
		}
	}
	wn(() => {
		if (!R(h)) return;
		let e = () => b();
		if (window.addEventListener("blur", e), s) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			R(f) && !R(f).contains(e.target) && A(h, !1);
		}, n = (e) => {
			e.key === "Escape" && A(h, !1);
		}, r = (e) => {
			R(f) && e.target instanceof Node && !R(f).contains(e.target) && A(h, !1);
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var ne = Ao(), re = M(ne), ie = M(re), ae = (e) => {
		var t = Eo();
		I((e) => {
			q(t, "src", a()), q(t, "alt", e);
		}, [() => J("gp.ownIcon")]), V(e, t);
	}, C = (e) => {
		var t = Do();
		W(t, () => vo(i()), !0), T(t), V(e, t);
	}, oe = (e) => {
		var t = Ir();
		I(() => H(t, r() || "★")), V(e, t);
	};
	U(ie, (e) => {
		a() ? e(ae) : i() && go[i()] ? e(C, 1) : e(oe, -1);
	}), T(re);
	var se = F(re, 2), ce = (e) => {
		var t = Oo(), r = M(t), i = (e) => {
			n(e);
		};
		U(r, (e) => {
			R(h) && e(i);
		}), T(t), Ri(t, (e) => A(p, e), () => R(p)), I(() => {
			q(t, "id", l), Ci(t, `position-anchor: ${c ?? ""}`);
		}), Dr("toggle", t, y), V(e, t);
	}, le = (e) => {
		var t = ko(), r = M(t);
		n(r), T(t), I(() => Ci(t, `top: ${R(_).top ?? ""}px; left: ${R(_).left ?? ""}px`)), V(e, t);
	};
	U(se, (e) => {
		s ? e(ce) : R(h) && e(le, 1);
	}), T(ne), Ri(ne, (e) => A(f, e), () => R(f)), I(() => {
		q(re, "title", o()), q(re, "aria-label", o()), q(re, "popovertarget", s ? l : void 0), Ci(re, s ? `anchor-name: ${c}` : void 0);
	}), z("click", re, function(...e) {
		(s ? void 0 : () => R(h) ? A(h, !1) : x())?.apply(this, e);
	}), V(e, ne), et();
}
Or(["click", "change"]);
//#endregion
//#region src/lib/MarkPicker.svelte
var Mo = /* @__PURE__ */ B("<span class=\"mp-count svelte-1y5ipgc\"> </span>"), No = /* @__PURE__ */ B("<div class=\"mp-tabs svelte-1y5ipgc\" role=\"group\"><button type=\"button\"> </button> <button type=\"button\"> <!></button></div>"), Po = /* @__PURE__ */ B("<button type=\"button\"><span class=\"mp-svg svelte-1y5ipgc\"></span></button>"), Fo = /* @__PURE__ */ B("<p class=\"mp-hint svelte-1y5ipgc\"> </p>"), Io = /* @__PURE__ */ B("<input class=\"mp-search svelte-1y5ipgc\" type=\"search\"/> <div class=\"mp-scroll svelte-1y5ipgc\"><div class=\"mp-grid svelte-1y5ipgc\"><button type=\"button\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" aria-hidden=\"true\" class=\"svelte-1y5ipgc\"><circle cx=\"12\" cy=\"12\" r=\"8.5\"></circle><path d=\"M6 18L18 6\"></path></svg></button> <!></div> <!></div>", 1), Lo = /* @__PURE__ */ B("<button type=\"button\"><img alt=\"\" class=\"svelte-1y5ipgc\"/></button>"), Ro = /* @__PURE__ */ B("<div class=\"mp-scroll svelte-1y5ipgc\"><div class=\"mp-grid mp-grid-img svelte-1y5ipgc\"><button type=\"button\" class=\"mp-cell mp-upload svelte-1y5ipgc\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" aria-hidden=\"true\" class=\"svelte-1y5ipgc\"><path d=\"M12 5v14\"></path><path d=\"M5 12h14\"></path></svg> <span> </span></button> <!></div> <p class=\"mp-hint svelte-1y5ipgc\"> </p></div>"), zo = /* @__PURE__ */ B("<!> <!>", 1), Bo = /* @__PURE__ */ B("<img class=\"mp-own svelte-1y5ipgc\" alt=\"\"/>"), Vo = /* @__PURE__ */ B("<span class=\"mp-svg svelte-1y5ipgc\"></span>"), Ho = /* @__PURE__ */ B("<span class=\"mp-empty svelte-1y5ipgc\" aria-hidden=\"true\">+</span>"), Uo = /* @__PURE__ */ B("<div class=\"mp-pop mp-anchored svelte-1y5ipgc\" popover=\"auto\"><!></div>"), Wo = /* @__PURE__ */ B("<div class=\"mp-pop svelte-1y5ipgc\"><!></div>"), Go = /* @__PURE__ */ B("<span class=\"mp svelte-1y5ipgc\"><button type=\"button\"><!></button> <!> <input type=\"file\" accept=\"image/*\" hidden=\"\"/></span>");
function Ko(e, t) {
	$e(t, !0);
	let n = (e) => {
		var t = zo(), n = N(t), a = (e) => {
			var t = No(), n = M(t);
			let r;
			var i = P(n, !0), a = F(n, 2);
			let s;
			var c = M(a, !0), l = F(c), u = (e) => {
				var t = Mo(), n = P(t, !0);
				I(() => H(n, R(S).length)), V(e, t);
			};
			U(l, (e) => {
				R(S).length && e(u);
			}), T(a), T(t), I((e, l) => {
				q(t, "aria-label", o()), r = xi(n, 1, "mp-tab svelte-1y5ipgc", null, r, { on: R(_) === "icons" }), q(n, "aria-pressed", R(_) === "icons"), H(i, e), s = xi(a, 1, "mp-tab svelte-1y5ipgc", null, s, { on: R(_) === "images" }), q(a, "aria-pressed", R(_) === "images"), H(c, l);
			}, [() => J("mp.icons"), () => J("mp.images")]), z("click", n, () => A(_, "icons")), z("click", a, () => A(_, "images")), V(e, t);
		};
		U(n, (e) => {
			l() || e(a);
		});
		var c = F(n, 2), u = (e) => {
			var t = Io(), n = N(t);
			G(n);
			var a = F(n, 2), o = M(a), c = M(o);
			let l;
			Qr(F(c, 2), 17, () => R(x), ({ id: e }) => e, (e, t) => {
				let n = () => R(t).id;
				var a = Po();
				let o;
				var s = M(a);
				W(s, () => vo(n()), !0), T(s), T(a), I((e, t) => {
					o = xi(a, 1, "mp-cell svelte-1y5ipgc", null, o, { active: n() === r() && !i() }), q(a, "title", e), q(a, "aria-label", t);
				}, [() => J(go[n()].labelKey), () => J(go[n()].labelKey)]), z("click", a, () => ie(n())), V(e, a);
			}), T(o);
			var u = F(o, 2), d = (e) => {
				var t = Fo(), n = P(t, !0);
				I((e) => H(n, e), [() => J("mp.noHits")]), V(e, t);
			};
			U(u, (e) => {
				R(x).length || e(d);
			}), T(a), I((e, t) => {
				q(n, "placeholder", e), q(n, "aria-label", t), l = xi(c, 1, "mp-cell mp-none svelte-1y5ipgc", null, l, { active: !r() && !i() }), q(c, "title", s()), q(c, "aria-label", s());
			}, [() => J("mp.search"), () => J("mp.search")]), Mi(n, () => R(v), (e) => A(v, e)), z("click", c, C), V(e, t);
		}, d = (e) => {
			var t = Ro(), n = M(t), r = M(n), a = P(F(M(r), 2), !0);
			T(r), Qr(F(r, 2), 16, () => R(S), (e) => e, (e, t) => {
				var n = Lo();
				let r;
				var a = P(n);
				I(() => {
					r = xi(n, 1, "mp-cell mp-img svelte-1y5ipgc", null, r, { active: t === i() }), q(a, "src", t);
				}), z("click", n, () => ae(t)), V(e, n);
			}), T(n);
			var o = P(F(n, 2), !0);
			T(t), I((e, t) => {
				H(a, e), H(o, t);
			}, [() => J("mp.upload"), () => J("mp.imagesHint")]), z("click", r, ce), V(e, t);
		};
		U(c, (e) => {
			R(_) === "icons" ? e(u) : e(d, -1);
		}), V(e, t);
	}, r = Hi(t, "icon", 3, ""), i = Hi(t, "image", 3, ""), a = Hi(t, "images", 19, () => []), o = Hi(t, "label", 19, () => J("mp.pickMark")), s = Hi(t, "noneLabel", 19, () => J("common.none")), c = Hi(t, "klass", 3, ""), l = Hi(t, "iconsOnly", 3, !1), u = ga(), d = va("urd-mp"), f = d.slice(2), p = /* @__PURE__ */ k(null), m = /* @__PURE__ */ k(null), h = /* @__PURE__ */ k(null), g = /* @__PURE__ */ k(!1), _ = /* @__PURE__ */ k("icons"), v = /* @__PURE__ */ k(""), y = /* @__PURE__ */ k(an({
		top: 0,
		left: 0
	})), b = _o.flatMap(([e, t]) => t.map((t) => ({
		id: t,
		cat: e
	}))), x = /* @__PURE__ */ O(() => {
		let e = R(v).trim().toLowerCase();
		return e ? b.filter(({ id: t }) => {
			let n = J(go[t].labelKey) || go[t].label;
			return t.includes(e) || n.toLowerCase().includes(e);
		}) : b;
	}), S = /* @__PURE__ */ O(() => [...new Set(a().filter(Boolean))]);
	function ee() {
		A(v, ""), A(oe, !1), A(_, i() && !l() ? "images" : "icons", !0);
	}
	function te(e) {
		A(g, e.newState === "open"), ya(R(p), R(g)), R(g) && ee();
	}
	function ne() {
		u && R(m)?.hidePopover(), A(g, !1);
	}
	function re() {
		ee();
		let e = R(p).getBoundingClientRect();
		A(y, {
			left: Math.max(8, Math.min(e.left, window.innerWidth - 286 - 8)),
			top: e.bottom + 332 + 8 > window.innerHeight ? Math.max(8, e.top - 332 - 8) : e.bottom + 6
		}, !0), A(g, !0);
	}
	function ie(e) {
		t.onpick?.({
			icon: e,
			image: ""
		});
	}
	function ae(e) {
		t.onpick?.({ image: e });
	}
	function C() {
		t.onpick?.({
			icon: "",
			image: ""
		});
	}
	let oe = /* @__PURE__ */ k(!1);
	function se(e) {
		A(oe, !1);
		let n = e.target.files?.[0];
		e.target.value = "", n && t.onfile?.(n);
	}
	function ce() {
		A(oe, !0), R(h).click();
	}
	wn(() => {
		if (!R(g)) return;
		let e = () => {
			R(oe) || ne();
		};
		if (window.addEventListener("blur", e), u) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			R(p) && !R(p).contains(e.target) && A(g, !1);
		}, n = (e) => {
			e.key === "Escape" && A(g, !1);
		}, r = (e) => {
			R(p) && e.target instanceof Node && !R(p).contains(e.target) && A(g, !1);
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var le = Go(), ue = M(le), de = M(ue), fe = (e) => {
		var n = Lr();
		ii(N(n), () => t.children), V(e, n);
	}, pe = (e) => {
		var t = Bo();
		I(() => q(t, "src", i())), V(e, t);
	}, me = (e) => {
		var t = Vo();
		W(t, () => vo(r()), !0), T(t), V(e, t);
	}, he = (e) => {
		V(e, Ho());
	};
	U(de, (e) => {
		t.children ? e(fe) : i() ? e(pe, 1) : r() && go[r()] ? e(me, 2) : e(he, -1);
	}), T(ue);
	var ge = F(ue, 2), w = (e) => {
		var t = Uo(), r = M(t), i = (e) => {
			n(e);
		};
		U(r, (e) => {
			R(g) && e(i);
		}), T(t), Ri(t, (e) => A(m, e), () => R(m)), I(() => {
			q(t, "id", f), Ci(t, `position-anchor: ${d ?? ""}`);
		}), Dr("toggle", t, te), V(e, t);
	}, _e = (e) => {
		var t = Wo(), r = M(t);
		n(r), T(t), I(() => Ci(t, `top: ${R(y).top ?? ""}px; left: ${R(y).left ?? ""}px`)), V(e, t);
	};
	U(ge, (e) => {
		u ? e(w) : R(g) && e(_e, 1);
	});
	var ve = F(ge, 2);
	Ri(ve, (e) => A(h, e), () => R(h)), T(le), Ri(le, (e) => A(p, e), () => R(p)), I(() => {
		xi(ue, 1, `mp-trigger ${c() ?? ""}`, "svelte-1y5ipgc"), q(ue, "title", o()), q(ue, "aria-label", o()), q(ue, "popovertarget", u ? f : void 0), Ci(ue, u ? `anchor-name: ${d}` : void 0);
	}), z("click", ue, function(...e) {
		(u ? void 0 : () => R(g) ? A(g, !1) : re())?.apply(this, e);
	}), z("change", ve, se), Dr("cancel", ve, () => A(oe, !1)), V(e, le), et();
}
Or(["click", "change"]);
//#endregion
//#region src/lib/previewBridge.js
function qo(e, t = {}) {
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
var Jo = 400;
function Yo({ prepare: e, onHeight: t, title: n }) {
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
			}, clearTimeout(a), a = setTimeout(l, Jo);
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
//#region src/lib/quick-row.js
var Xo = "urd-quick-row", Zo = ["fit", "phone"], Qo = {
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
function $o(e) {
	return [...Qo[e] ?? [], ...Zo];
}
var es = Object.freeze({
	pinned: [],
	removed: []
});
function ts(e) {
	let t = (e) => Array.isArray(e) ? [...new Set(e.filter((e) => typeof e == "string" && e))] : [];
	return {
		pinned: t(e?.pinned),
		removed: t(e?.removed)
	};
}
function ns(e, t, n) {
	let r = $o(e).filter((e) => !t.removed.includes(e));
	for (let e of t.pinned) r.includes(e) || r.push(e);
	return r.filter((e) => n.has(e));
}
function rs(e, t, n) {
	return $o(e).includes(n) ? !t.removed.includes(n) : t.pinned.includes(n);
}
function is(e, t, n) {
	let r = $o(e).includes(n);
	return rs(e, t, n) ? r ? {
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
function as(e) {
	return e.pinned.length > 0 || e.removed.length > 0;
}
function os(e) {
	try {
		let t = JSON.parse(e.getItem("urd-quick-row") ?? "{}");
		return !t || typeof t != "object" || Array.isArray(t) ? {} : Object.fromEntries(Object.entries(t).map(([e, t]) => [e, ts(t)]));
	} catch {
		return {};
	}
}
function ss(e, t) {
	let n = Object.fromEntries(Object.entries(t).filter(([, e]) => as(e)));
	try {
		e.setItem(Xo, JSON.stringify(n));
	} catch {}
}
//#endregion
//#region src/lib/preview-scale.js
function cs(e, t) {
	return !(e > 0) || !(t > 0) ? 1 : e / t;
}
function ls(e, t, n, r = 0, i = 0) {
	if (n === "full") return 1;
	let a = i > 0 ? cs(r, i) : Infinity;
	return Math.max(.1, Math.min(1, cs(e, t), a));
}
//#endregion
//#region src/lib/deploy-wait.js
function us(e, { max: t = 8 } = {}) {
	let n = (e ?? []).filter((e) => e && typeof e.path == "string" && typeof e.content == "string" && e.encoding === "utf-8" && !e.delete && (e.path.startsWith("content/") || e.path === "plugins/plugins.json"));
	return n.sort((e, t) => (e.path === "content/site.json" ? -1 : 0) - (t.path === "content/site.json" ? -1 : 0)), n.slice(0, t).map(({ path: e, content: t }) => ({
		path: e,
		content: t
	}));
}
async function ds(e, { fetchFn: t = fetch, delayMs: n = 1e4, attempts: r = 18, sleep: i = (e) => new Promise((t) => setTimeout(t, e)) } = {}) {
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
//#endregion
//#region src/lib/menu-search.js
function fs(e, t, n = "", r = /* @__PURE__ */ new Set()) {
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
			if (fs(a.children, t, `${e} ${a.text}`, r), r.size > o) {
				r.add(a);
				for (let e of a.children ?? []) e.kind === "row" && !e.text.trim() && r.add(e);
			}
		} else t(`${e} ${a.text}`) && r.add(a);
		i && r.size > o && r.add(i);
	}
	return r;
}
var ps = "button, select, textarea, svg, [popover], .dd, .gridmenu-value, .menu-group-value", ms = ".row-tool, .cp-clear, [popover] *";
function hs(e) {
	let t = [], n = (e) => {
		for (let r of e.childNodes) r.nodeType === 3 ? t.push(r.data) : r.nodeType === 1 && !r.matches(ps) && n(r);
	};
	n(e);
	let r = e.getAttribute("title");
	r && t.push(r);
	for (let n of e.querySelectorAll("[title]")) n.matches(ms) || t.push(n.getAttribute("title"));
	return t.join(" ").replace(/\s+/g, " ").trim();
}
function gs(e, t = "") {
	let n = [];
	for (let r of e.children) if (!(t && r.matches(t))) {
		if (r.tagName === "DETAILS") {
			let e = r.querySelector(":scope > summary"), t = r.querySelector(":scope > .group-items") ?? r;
			n.push({
				kind: "group",
				el: r,
				text: e ? hs(e) : "",
				children: gs(t, "summary")
			});
		} else r.tagName === "HR" ? n.push({
			kind: "rule",
			el: r,
			text: ""
		}) : r.matches(".panel-strong, .mini-label") ? n.push({
			kind: "heading",
			el: r,
			text: hs(r)
		}) : n.push({
			kind: "row",
			el: r,
			text: hs(r)
		});
	}
	return n;
}
function _s(e, t) {
	for (let n of e.children) {
		let e = gs(n, ".emenu-title, .emenu-none"), r = fs(e, t), i = (e) => {
			for (let t of e) t.el.classList.toggle("menu-miss", !r.has(t)), t.kind === "group" && (r.has(t) && (t.el.open = !0), i(t.children));
		};
		i(e), n.classList.toggle("menu-empty", !e.some((e) => r.has(e)));
	}
}
function vs(e, t) {
	return (n) => {
		let r = () => _s(n, (n) => t(n, e));
		r();
		let i = new MutationObserver(r);
		return i.observe(n, {
			childList: !0,
			subtree: !0,
			characterData: !0
		}), () => i.disconnect();
	};
}
var ys = 3840, bs = 2400, xs = (e, t, n) => Math.min(n, Math.max(t, e));
function Ss({ innerWidth: e = 0, screenWidth: t = 0 } = {}) {
	let n = e > 0 ? e : t;
	return Math.max(1, Math.round(n > 0 ? n : 1));
}
function Cs(e) {
	return !e || typeof e.innerWidth != "number" ? null : Ss({
		innerWidth: e.innerWidth,
		screenWidth: e.screen?.width ?? 0
	});
}
function ws(e, t) {
	let n = e && typeof e == "object" && !Array.isArray(e) ? e : {}, r = n.mode === "custom" ? "custom" : "own", i = Number(n.width), a = xs(Number.isFinite(i) && i > 0 ? i : t, 640, ys), o = Number(n.height), s = Number.isFinite(o) && o > 0 ? xs(o, 480, bs) : 0;
	return {
		mode: r,
		width: Math.round(a),
		height: Math.round(s)
	};
}
function Ts(e, t) {
	return e?.mode === "custom" ? {
		width: e.width,
		height: e.height || 0
	} : {
		width: t,
		height: 0
	};
}
var Es = 1920, Ds = [
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
], Os = [
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
], ks = [
	1920,
	1536,
	1366
];
function As(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 1440;
	let n = Math.round(t / 20) * 20;
	return Math.min(Es, Math.max(960, n));
}
function js(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 6;
	let n = Math.round(t / 1) * 1;
	return Math.min(12, Math.max(0, n));
}
function Ms(e, t) {
	if (e === "full") return 0;
	let n = Math.min(49, Math.max(0, Number(t) || 0));
	return Math.ceil(Number(e) / (1 - 2 * n / 100));
}
function Ns(e, t, n) {
	let r = Math.max(0, Number(t) || 0) / 100 * n, i = Math.max(0, n - 2 * r), a = e !== "full" && Number(e) < i, o = a ? Number(e) : i;
	return {
		width: o,
		margin: Math.round((n - o) / 2),
		pct: n > 0 ? o / n * 100 : 0,
		bound: a
	};
}
function Ps(e) {
	return Os.find((t) => t.width === e)?.id ?? null;
}
//#endregion
//#region src/lib/nav-size.js
var Fs = {
	min: 0,
	max: 64,
	step: 1
}, Is = {
	min: 12,
	max: 28,
	step: 1
}, Ls = {
	min: 0,
	max: 80,
	step: 1
}, Rs = {
	min: 0,
	max: 64,
	step: 1
}, zs = {
	min: 480,
	max: 1920,
	step: 20
}, Bs = {
	min: .3,
	max: .8,
	step: .05
}, Vs = {
	min: 0,
	max: 400,
	step: 10
}, Hs = {
	min: 0,
	max: 1200,
	step: 20
}, Us = {
	min: 0,
	max: 64,
	step: 1
}, Ws = {
	min: 180,
	max: 400,
	step: 1
}, Gs = {
	min: 12,
	max: 128,
	step: 1
}, Ks = {
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
}, qs = [
	"sm",
	"md",
	"lg",
	"xl"
], Js = .67;
function Ys(e) {
	return e === "floating" || e === "floating-square" || e === "floating-tab";
}
function Xs(e, { min: t, max: n, step: r = 1 }, i) {
	let a = Number(e);
	if (e == null || e === "" || !Number.isFinite(a)) return i;
	let o = Math.round(a / r) * r, s = Math.min(n, Math.max(t, o));
	return r < 1 ? Math.round(s * 100) / 100 : s;
}
function Zs(e, t) {
	if (e?.padY != null && e.padY !== "") return Xs(e.padY, Fs, Ks.md.padY);
	let n = Ks[e?.size] ?? Ks.md;
	return Math.round(n.padY * (Ys(t) ? Js : 1));
}
function Qs(e) {
	if (e?.textSize != null && e.textSize !== "") return Xs(e.textSize, Is, Ks.md.textSize);
	let t = Ks[e?.size] ?? Ks.md;
	return Math.round(t.textSize);
}
function $s(e) {
	return e?.padY != null && e.padY !== "" || e?.textSize != null && e.textSize !== "" ? null : qs.includes(e?.size) ? e.size : "md";
}
//#endregion
//#region src/lib/Dropdown.svelte
var ec = /* @__PURE__ */ B("<span aria-hidden=\"true\"><svg viewBox=\"0 0 16 16\" width=\"1em\" height=\"1em\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"svelte-vtocc6\"><path d=\"M3.5 6l4.5 4.5L12.5 6\"></path></svg></span>"), tc = /* @__PURE__ */ B("<span class=\"dd-note svelte-vtocc6\"> </span>"), nc = /* @__PURE__ */ B("<button type=\"button\"> <!></button>"), rc = /* @__PURE__ */ B("<button type=\"button\"><span class=\"dd-value svelte-vtocc6\"> </span> <!></button> <div class=\"dd-pop dd-anchored svelte-vtocc6\" popover=\"auto\"><!></div>", 1), ic = /* @__PURE__ */ B("<div class=\"dd-pop svelte-vtocc6\"></div>"), ac = /* @__PURE__ */ B("<button type=\"button\"><span class=\"dd-value svelte-vtocc6\"> </span> <!></button> <!>", 1), oc = /* @__PURE__ */ B("<span class=\"dd svelte-vtocc6\"><!></span>");
function Y(e, t) {
	$e(t, !0);
	let n = (e) => {
		var t = ec();
		let n;
		I(() => n = xi(t, 1, "dd-caret svelte-vtocc6", null, n, { "dd-caret-open": R(f) })), V(e, t);
	}, r = Hi(t, "value", 3, null), i = Hi(t, "options", 19, () => []), a = Hi(t, "title", 3, null), o = Hi(t, "disabled", 3, !1), s = Hi(t, "filled", 3, !1), c = Hi(t, "compact", 3, !1), l = ga(), u = va("urd-dd"), d = u.slice(2), f = /* @__PURE__ */ k(!1), p = /* @__PURE__ */ k(null), m = /* @__PURE__ */ k(null), h = /* @__PURE__ */ k(an({
		top: 0,
		left: 0,
		width: 160
	})), _ = () => i().find(([e]) => `${e ?? ""}` == `${r() ?? ""}`)?.[1] ?? "";
	function v() {
		let e = R(p).getBoundingClientRect(), t = Math.min(320, i().reduce((e, t) => e + (t[2] ? 76 : 32), 12)), n = Math.max(e.width, 160), r = e.bottom + t + 8 <= window.innerHeight;
		A(h, {
			top: r ? e.bottom + 4 : Math.max(8, e.top - t - 4),
			left: Math.max(8, Math.min(e.left, window.innerWidth - n - 8)),
			width: n
		}, !0);
	}
	function y() {
		if (!o()) {
			if (R(f)) {
				A(f, !1);
				return;
			}
			v(), A(f, !0);
		}
	}
	function b(e) {
		l && R(m)?.hidePopover(), A(f, !1), t.onchange?.(e);
	}
	wn(() => {
		if (!R(f)) return;
		let e = () => {
			l ? R(m)?.hidePopover() : A(f, !1);
		};
		if (window.addEventListener("blur", e), l) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			R(p) && !R(p).contains(e.target) && A(f, !1);
		}, n = (e) => {
			e.key === "Escape" && A(f, !1);
		}, r = (e) => {
			R(p) && e.target instanceof Node && !R(p).contains(e.target) && v();
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var x = oc(), S = M(x), ee = (e) => {
		var t = rc(), l = N(t);
		let p;
		var h = M(l), v = P(h, !0), y = F(h, 2);
		n(y), T(l);
		var x = F(l, 2), S = M(x), ee = (e) => {
			var t = Lr();
			Qr(N(t), 17, i, ([e, t, n]) => `${e ?? ""}`, (e, t) => {
				var n = /* @__PURE__ */ O(() => g(R(t), 3));
				let i = () => R(n)[0], a = () => R(n)[1], o = () => R(n)[2];
				var s = nc();
				let c;
				var l = M(s, !0), u = F(l), d = (e) => {
					var t = tc(), n = P(t, !0);
					I(() => H(n, o())), V(e, t);
				};
				U(u, (e) => {
					o() && e(d);
				}), T(s), I(() => {
					c = xi(s, 1, "dd-opt svelte-vtocc6", null, c, { selected: `${i() ?? ""}` == `${r() ?? ""}` }), H(l, a());
				}), z("click", s, () => b(i())), V(e, s);
			}), V(e, t);
		};
		U(S, (e) => {
			R(f) && e(ee);
		}), T(x), Ri(x, (e) => A(m, e), () => R(m)), I((e) => {
			p = xi(l, 1, "dd-btn svelte-vtocc6", null, p, {
				"dd-filled": s(),
				"dd-compact": c()
			}), q(l, "title", a()), l.disabled = o(), q(l, "popovertarget", d), Ci(l, `anchor-name: ${u ?? ""}`), H(v, e), q(x, "id", d), Ci(x, `position-anchor: ${u ?? ""}`);
		}, [() => _()]), Dr("toggle", x, (e) => {
			A(f, e.newState === "open");
		}), V(e, t);
	}, te = (e) => {
		var t = ac(), l = N(t);
		let u;
		var d = M(l), p = P(d, !0), m = F(d, 2);
		n(m), T(l);
		var v = F(l, 2), x = (e) => {
			var t = ic();
			Qr(t, 21, i, ([e, t, n]) => `${e ?? ""}`, (e, t) => {
				var n = /* @__PURE__ */ O(() => g(R(t), 3));
				let i = () => R(n)[0], a = () => R(n)[1], o = () => R(n)[2];
				var s = nc();
				let c;
				var l = M(s, !0), u = F(l), d = (e) => {
					var t = tc(), n = P(t, !0);
					I(() => H(n, o())), V(e, t);
				};
				U(u, (e) => {
					o() && e(d);
				}), T(s), I(() => {
					c = xi(s, 1, "dd-opt svelte-vtocc6", null, c, { selected: `${i() ?? ""}` == `${r() ?? ""}` }), H(l, a());
				}), z("click", s, () => b(i())), V(e, s);
			}), T(t), I(() => Ci(t, `top: ${R(h).top ?? ""}px; left: ${R(h).left ?? ""}px; min-width: ${R(h).width ?? ""}px`)), V(e, t);
		};
		U(v, (e) => {
			R(f) && e(x);
		}), I((e) => {
			u = xi(l, 1, "dd-btn svelte-vtocc6", null, u, {
				"dd-filled": s(),
				"dd-compact": c()
			}), q(l, "title", a()), l.disabled = o(), H(p, e);
		}, [() => _()]), z("click", l, y), V(e, t);
	};
	U(S, (e) => {
		l ? e(ee) : e(te, -1);
	}), T(x), Ri(x, (e) => A(p, e), () => R(p)), V(e, x), et();
}
Or(["click"]);
//#endregion
//#region src/lib/Choice.svelte
var sc = /* @__PURE__ */ B("<button type=\"button\"> </button>"), cc = /* @__PURE__ */ B("<div><span class=\"choice-label svelte-1ehof1c\"> </span> <div class=\"choice-seg svelte-1ehof1c\" role=\"group\"></div></div>");
function lc(e, t) {
	$e(t, !0);
	let n = Hi(t, "title", 3, void 0), r = /* @__PURE__ */ O(() => t.options.length > 3 || t.options.reduce((e, [, t]) => e + `${t}`.length, 0) > 14), i = (e) => `${e ?? ""}`;
	var a = cc();
	let o;
	var s = M(a), c = P(s, !0), l = F(s, 2);
	Qr(l, 21, () => t.options, ([e, t]) => i(e), (e, n) => {
		var r = /* @__PURE__ */ O(() => g(R(n), 2));
		let a = () => R(r)[0], o = () => R(r)[1];
		var s = sc();
		let c;
		var l = P(s, !0);
		I((e, t) => {
			q(s, "aria-pressed", e), c = xi(s, 1, "svelte-1ehof1c", null, c, { on: t }), H(l, o());
		}, [() => i(a()) === i(t.value), () => i(a()) === i(t.value)]), z("click", s, () => t.onchange(a())), V(e, s);
	}), T(l), T(a), I(() => {
		o = xi(a, 1, "choice svelte-1ehof1c", null, o, { stacked: R(r) }), q(a, "title", n()), H(c, t.label), q(l, "aria-label", t.label);
	}), V(e, a), et();
}
Or(["click"]);
//#endregion
//#region src/lib/IconEditor.svelte
var uc = /* @__PURE__ */ B("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\"> </h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\"></canvas> <p class=\"ie-hint svelte-e7sog7\"> </p></div> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"ghost svelte-e7sog7\"> </button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"primary svelte-e7sog7\"> </button></span></div></div>");
function dc(e, t) {
	$e(t, !0);
	let n = Hi(t, "image", 3, ""), r = /* @__PURE__ */ k(null), i = /* @__PURE__ */ k(null), a = /* @__PURE__ */ k(1), o = /* @__PURE__ */ k(.5), s = /* @__PURE__ */ k(.5), c = /* @__PURE__ */ k(1), l = /* @__PURE__ */ k(1), u = /* @__PURE__ */ k(1);
	wn(() => {
		if (!n()) return;
		let e = new Image();
		e.onload = () => {
			A(i, e, !0);
		}, e.src = n();
	});
	function d(e, t) {
		if (e.clearRect(0, 0, t, t), !R(i)) return;
		e.filter = `brightness(${R(c)}) contrast(${R(l)}) saturate(${R(u)})`;
		let n = Math.max(t / R(i).width, t / R(i).height) * R(a), r = R(i).width * n, d = R(i).height * n, f = t / 2 - R(o) * r, p = t / 2 - R(s) * d;
		f = Math.min(0, Math.max(t - r, f)), p = Math.min(0, Math.max(t - d, p)), e.drawImage(R(i), f, p, r, d), e.filter = "none";
	}
	wn(() => {
		R(i), R(a), R(o), R(s), R(c), R(l), R(u), R(r) && d(R(r).getContext("2d"), 220);
	});
	function f(e) {
		if (!R(i)) return;
		e.preventDefault();
		let t = e.clientX, n = e.clientY, r = Math.max(220 / R(i).width, 220 / R(i).height) * R(a), c = R(i).width * r, l = R(i).height * r, u = (e) => {
			A(o, Math.min(1, Math.max(0, R(o) - (e.clientX - t) / c)), !0), A(s, Math.min(1, Math.max(0, R(s) - (e.clientY - n) / l)), !0), t = e.clientX, n = e.clientY;
		}, d = () => {
			window.removeEventListener("pointermove", u), window.removeEventListener("pointerup", d);
		};
		window.addEventListener("pointermove", u), window.addEventListener("pointerup", d);
	}
	function p() {
		A(a, 1), A(o, .5), A(s, .5), A(c, 1), A(l, 1), A(u, 1);
	}
	function m() {
		let e = document.createElement("canvas");
		e.width = 128, e.height = 128, d(e.getContext("2d"), 128), t.onapply?.(e.toDataURL("image/webp", .92));
	}
	var h = uc(), g = M(h), _ = M(g), v = P(_, !0), y = F(_, 2), b = M(y);
	q(b, "width", 220), q(b, "height", 220), Ri(b, (e) => A(r, e), () => R(r));
	var x = P(F(b, 2), !0);
	T(y);
	var S = F(y, 2), ee = M(S), te = P(F(ee));
	T(S);
	var ne = F(S, 2);
	G(ne);
	var re = F(ne, 2), ie = M(re), ae = P(F(ie));
	T(re);
	var C = F(re, 2);
	G(C);
	var oe = F(C, 2), se = M(oe), ce = P(F(se));
	T(oe);
	var le = F(oe, 2);
	G(le);
	var ue = F(le, 2), de = M(ue), fe = P(F(de));
	T(ue);
	var pe = F(ue, 2);
	G(pe);
	var me = F(pe, 2), he = M(me), ge = P(he, !0), w = F(he, 2), _e = P(w, !0);
	T(me);
	var ve = F(me, 2), ye = M(ve), be = P(ye, !0), xe = F(ye, 2), Se = P(xe, !0);
	T(ve), T(g), T(h), I((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) => {
		H(v, e), q(b, "title", t), H(x, n), H(ee, `${r ?? ""} `), H(te, `${i ?? ""}x`), H(ie, `${a ?? ""} `), H(ae, `${o ?? ""}%`), H(se, `${s ?? ""} `), H(ce, `${c ?? ""}%`), H(de, `${l ?? ""} `), H(fe, `${u ?? ""}%`), H(ge, d), H(_e, f), H(be, p), H(Se, m);
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
	]), z("pointerdown", b, f), Mi(ne, () => R(a), (e) => A(a, e)), Mi(C, () => R(c), (e) => A(c, e)), Mi(le, () => R(l), (e) => A(l, e)), Mi(pe, () => R(u), (e) => A(u, e)), z("click", he, () => A(u, 0)), z("click", w, p), z("click", ye, () => t.oncancel?.()), z("click", xe, m), V(e, h), et();
}
Or(["pointerdown", "click"]);
//#endregion
//#region ../template/assets/engine/0.7.4/calendar-designs.js
var fc = [
	"list",
	"cards",
	"month",
	"agenda",
	"next",
	"week",
	"day",
	"year"
], pc = [
	"title",
	"date",
	"time",
	"place",
	"description",
	"category",
	"number"
], mc = [
	"noticeLabel",
	"noticeTitle",
	"noticeText",
	"emptyKicker",
	"emptyTitle",
	"series",
	"forWhom",
	"openAll"
], hc = {
	noticeTitle: "calendar.noticeTitleHint",
	noticeText: "calendar.noticeTextHint"
}, gc = ["emptyKicker", "emptyTitle"], _c = [
	"noticeLabel",
	"noticeTitle",
	"noticeText",
	"readWhole",
	"moreInfo"
], X = /* @__PURE__ */ "all.signup.subscribe.subscribeMulti.addGoogle.swUpcoming.swWeek.swMonth.noMatch.earlier.showAll.zoneOf.zoneYours.weekN.range.moreN.dayNone.cancelled.allDay.until.timeAt.today.tomorrow.inDays.when.where.organizer.moreAbout.join.addEvent.addOne.addFile.addWhole.icalAddress.onMap.recurring".split("."), vc = [
	"modern",
	"next",
	"ap"
];
function yc() {
	return vc.map((e) => ({
		family: e,
		labelKey: `calendar.family.${e}`,
		designs: bc.filter((t) => t.family === e)
	})).filter((e) => e.designs.length);
}
var Z = (e, t = "colors") => ({
	key: e,
	labelKey: `calendar.slot.${e}`,
	section: t
}), bc = [
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
			...X
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
		texts: X
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
			...X
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
		texts: ["program", ...X]
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
		texts: ["count", ...X]
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
		texts: [...gc, ...X]
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
		texts: X
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
		texts: ["wholeProgram", ...X]
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
			...X
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
		texts: X
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
		texts: X
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
		texts: [...gc, ...X]
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
			...X
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
		texts: X
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
		texts: ["todayBtn", ...X]
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
		texts: ["unnamed", ...X]
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
		texts: X
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
		texts: [...gc, ...X]
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
			...X
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
			...X
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
			...X
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
			...X
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
			...X
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
			..._c,
			...X
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
			...X
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
		texts: ["now", ...X]
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
			...X
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
			...X
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
			...X
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
			...X
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
			..._c,
			...gc,
			...X
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
			...gc,
			...X
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
			..._c,
			...gc,
			...X
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
		texts: ["todayBtn", ...X]
	}
], xc = (e, t, n, r) => ({
	key: e,
	kind: "choice",
	values: t,
	def: n,
	labelKey: `calendar.opt.${e}`,
	...r ? { when: r } : {}
}), Sc = (e, t) => ({
	key: e,
	kind: "switch",
	def: t,
	labelKey: `calendar.opt.${e}`
}), Cc = (e) => ({
	key: e,
	kind: "hour",
	def: null,
	labelKey: `calendar.opt.${e}`
}), wc = {
	sidepanel: [xc("panelSide", [
		"right",
		"left",
		"under"
	], "right")],
	weekPlan: [
		Cc("hourFrom"),
		Cc("hourTo"),
		Sc("weekend", !1)
	],
	dayPlan: [
		Cc("hourFrom"),
		Cc("hourTo"),
		Sc("weekend", !1)
	],
	table: [
		Sc("colTime", !0),
		Sc("colPlace", !0),
		Sc("zebra", !0)
	],
	posters: [xc("columns", [
		"auto",
		"2",
		"3",
		"4"
	], "auto")],
	photo: [xc("columns", [
		"auto",
		"2",
		"3",
		"4"
	], "auto")],
	yearWheel: [xc("firstMonth", [
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
	numbered: [Sc("pad", !0)],
	band: [Sc("roll", !0), xc("pause", ["button", "touch"], "button", { roll: !0 })]
}, Tc = [
	"weekStrip",
	"weekPlan",
	"layers"
], Ec = [
	"month",
	"sidepanel",
	"apMonth"
];
function Dc(e) {
	let t = Nc(e?.design), n = e?.switcherViews ?? {};
	return {
		week: Tc.includes(n.week) ? n.week : "weekStrip",
		month: Ec.includes(n.month) ? n.month : t.set === "apCream" || t.set === "apNavy" ? "apMonth" : "month"
	};
}
function Oc(e) {
	return e?.description === "card" || e?.description === "rows" ? e.description : e?.options?.description === !1 ? "card" : "rows";
}
function kc(e) {
	let t = Nc(e?.design);
	return t.excerpt === !0 || t.id === "plain" && Pc(e) === "cards";
}
function Ac(e) {
	return wc[Nc(e).id] ?? [];
}
function jc(e) {
	let t = e?.options ?? {}, n = {};
	for (let r of Ac(e?.design)) {
		let e = t[r.key];
		r.kind === "choice" ? n[r.key] = r.values.includes(e) ? e : r.def : r.kind === "switch" ? n[r.key] = typeof e == "boolean" ? e : r.def : n[r.key] = Number.isInteger(e) && e >= 0 && e <= 24 ? e : null;
	}
	return n;
}
function Mc(e, t) {
	return !e.when || Object.entries(e.when).every(([e, n]) => t?.[e] === n);
}
function Nc(e) {
	return bc.find((t) => t.id === e) ?? bc[0];
}
function Pc(e) {
	return Nc(e?.design).view || (fc.includes(e?.view) ? e.view : "list");
}
var Fc = [
	"list",
	"cards",
	"agenda",
	"next"
];
function Ic() {
	let e = [{
		view: null,
		designs: bc.filter((e) => e.view === null)
	}];
	for (let t of fc) {
		let n = bc.filter((e) => e.view === t);
		n.length && e.push({
			view: t,
			designs: n
		});
	}
	return e;
}
var Lc = /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, Rc = /^[a-z][a-z0-9-]*$/;
function zc(e) {
	return typeof e == "string" ? Lc.test(e) ? e : Rc.test(e) ? `var(--urd-color-${e})` : null : null;
}
function Bc(e, t) {
	let n = typeof t?.show == "boolean" ? t.show : e.stripe;
	return {
		show: n,
		color: n ? zc(t?.color) : null
	};
}
var Vc = {
	min: 8,
	max: 120
}, Hc = /^(?:\s|&nbsp;|&#160;|<[^<>]*>)*$/i;
function Uc(e) {
	return typeof e != "string" || Hc.test(e);
}
function Wc(e, t) {
	return Object.keys(t ?? {}).some((n) => {
		let r = n.split(".")[0];
		return !e.texts.includes(r) || hc[r] ? !1 : t[n] === !1 ? mc.includes(r) : !Uc(t[n]);
	});
}
function Gc(e) {
	let t = {};
	for (let n of Object.keys(hc)) Uc(e?.[n]) || (t[n] = e[n]);
	return Object.keys(t).length ? t : void 0;
}
//#endregion
//#region ../template/assets/engine/0.7.4/calendar-thumb.js
var Kc = "#0e1512", qc = "#2fd6b6", Jc = "#5c6b64", Yc = "#22302a", Xc = "#e8efe9", Zc = "#16221d", Qc = "#1c2340", $c = "#f3ecd8", el = "#d0a74a", tl = (e) => e < 1 ? ` opacity="${e}"` : "", Q = (e, t, n, r, i, a = 1, o = 2) => `<rect x="${e}" y="${t}" width="${n}" height="${r}" rx="${o}" fill="${i}"${tl(a)}/>`, nl = (e, t, n, r, i = 1) => `<circle cx="${e}" cy="${t}" r="${n}" fill="${r}"${tl(i)}/>`, rl = (e, t, n, r, i, a = 1, o = 1) => `<line x1="${e}" y1="${t}" x2="${n}" y2="${r}" stroke="${i}" stroke-width="${a}"${tl(o)}/>`, il = (e, t, n, r) => Array.from({ length: e }, (e, i) => r(t + i * n, i)).join(""), al = (e, t = Kc) => `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${t}"/>${e}</svg>`;
function ol(e, t, n, r, i, a = Jc) {
	let o = "", s = n / 7, c = r / 4;
	for (let n = 0; n < 28; n++) {
		let r = e + n % 7 * s + s / 2, l = t + Math.floor(n / 7) * c + c / 2;
		o += nl(r, l, 1.6, i.includes(n) ? qc : a, i.includes(n) ? 1 : .55);
	}
	return o;
}
var sl = {
	plain: () => il(3, 12, 20, (e) => Q(14, e, 14, 14, Yc, 1, 3) + Q(34, e + 2, 70, 4, Jc, .9) + Q(34, e + 9, 46, 3, Jc, .5)),
	timeline: () => rl(50, 10, 50, 70, Jc, 1.2, .7) + il(3, 16, 22, (e, t) => Q(18, e - 3, 24, 5, Jc, .9) + nl(50, e, 3.4, t ? Jc : qc) + Q(60, e - 3, 62, 4, Jc, .9) + Q(60, e + 4, 40, 3, Jc, .5)),
	table: () => Q(12, 10, 136, 10, qc, 1, 3) + il(4, 26, 12, (e, t) => (t % 2 ? Q(12, e - 3, 136, 12, Yc, .8, 0) : "") + Q(16, e, 20, 3, Jc, .9) + Q(44, e, 14, 3, Jc, .5) + Q(66, e, 44, 3, Jc, .9) + Q(118, e, 24, 3, Jc, .5)),
	booklet: () => Q(12, 8, 136, 64, Xc, 1, 2) + Q(20, 14, 40, 7, Zc) + rl(20, 26, 140, 26, Zc, 1.4) + [20, 84].map((e) => il(3, 32, 12, (t) => Q(e, t, 8, 8, qc, 1, 1) + Q(e + 12, t, 36, 3, Zc, .85) + Q(e + 12, t + 5, 26, 2.5, Zc, .4))).join(""),
	numbered: () => il(3, 12, 20, (e) => rl(14, e - 3, 146, e - 3, Jc, .8, .6) + Q(14, e, 14, 12, qc, 1, 2) + Q(36, e + 1, 64, 4, Jc, .9) + Q(36, e + 8, 44, 3, Jc, .5) + Q(120, e + 3, 24, 4, qc, .7)),
	apList: () => il(3, 10, 21, (e) => Q(12, e, 136, 17, Qc, 1, 2) + Q(18, e + 4, 10, 9, el, 1, 1) + rl(34, e + 3, 34, e + 14, el, .8, .5) + Q(40, e + 4, 26, 3, el, .8) + Q(40, e + 10, 56, 3.5, $c, .9)),
	glass: () => nl(30, 14, 34, "#ff8a65", .55) + nl(132, 70, 36, "#7fd1c4", .55) + nl(100, 10, 20, "#ffd36b", .4) + il(3, 12, 20, (e) => Q(14, e, 132, 15, "#ffffff", .32, 6) + Q(20, e + 4, 9, 7, Xc, .9, 1) + Q(36, e + 4, 50, 3, Xc, .9) + Q(36, e + 9, 34, 2.5, Xc, .5)),
	posters: () => Q(12, 10, 62, 60, qc, 1, 4) + Q(20, 30, 18, 20, Zc, .9, 2) + Q(20, 56, 40, 4, Zc, .8) + Q(80, 10, 32, 28, Xc, 1, 4) + Q(86, 16, 10, 10, Zc, .8, 1) + Q(116, 10, 32, 28, "#bfe9df", 1, 4) + Q(122, 16, 10, 10, Zc, .8, 1) + Q(80, 42, 32, 28, Yc, 1, 4) + Q(86, 48, 10, 10, qc, 1, 1) + Q(116, 42, 32, 28, Yc, .5, 4),
	tickets: () => il(3, 10, 21, (e) => Q(12, e, 136, 17, Yc, 1, 4) + Q(12, e, 30, 17, qc, 1, 4) + Q(20, e + 4, 12, 9, Zc, .85, 1) + rl(42, e + 1, 42, e + 16, Kc, 1.6) + Q(50, e + 4, 50, 3.5, Jc, .95) + Q(50, e + 10, 34, 2.5, Jc, .55) + Q(120, e + 5, 22, 7, qc, .85)),
	carousel: () => [
		12,
		50,
		88,
		126
	].map((e, t) => Q(e, 14, 34, 54, t ? Yc : qc, 1, 4) + Q(e + 6, 22, 12, 14, t ? qc : Zc, .9, 1) + Q(e + 6, 50, 22, 3, t ? Jc : Zc, .9) + Q(e + 6, 56, 14, 2.5, t ? Jc : Zc, .5)).join(""),
	photo: () => [
		12,
		60,
		108
	].map((e) => Q(e, 12, 40, 56, Yc, 1, 4) + Q(e, 12, 40, 26, qc, .45, 4) + Q(e + 4, 16, 12, 6, Xc, .95, 1) + Q(e + 5, 44, 28, 3.5, Jc, .95) + Q(e + 5, 51, 20, 2.5, Jc, .5) + Q(e + 5, 58, 14, 5, qc, .9)).join(""),
	apGrid: () => [
		12,
		60,
		108
	].map((e) => Q(e, 12, 40, 56, $c, 1, 2) + Q(e, 12, 40, 16, Qc, 1, 2) + rl(e, 28, e + 40, 28, el, 1.4) + Q(e + 4, 16, 8, 8, el, 1, 1) + Q(e + 22, 18, 14, 4, el, .9) + Q(e + 5, 36, 28, 4, Qc, .9) + Q(e + 5, 44, 18, 2.5, Qc, .55) + Q(e + 5, 52, 24, 2.5, Qc, .4)).join(""),
	bento: () => Q(12, 10, 66, 40, Xc, 1, 6) + Q(18, 14, 16, 5, qc, 1, 2) + Q(18, 28, 14, 14, Zc, .9, 1) + Q(36, 38, 34, 4, Zc, .8) + Q(82, 10, 31, 18, Yc, 1, 5) + Q(117, 10, 31, 18, Yc, 1, 5) + Q(82, 32, 66, 18, Yc, 1, 5) + ol(86, 34, 58, 14, [
		9,
		12,
		19
	]) + Q(12, 54, 31, 18, Xc, 1, 5) + Q(47, 54, 31, 18, qc, .4, 5) + Q(82, 54, 66, 18, Yc, 1, 5) + Q(88, 60, 30, 4, Jc, .9),
	weekStrip: () => Q(60, 8, 40, 5, Jc, .9) + Array.from({ length: 7 }, (e, t) => Q(12 + t * 19.6, 20, 17, 50, t === 3 ? qc : Yc, t === 3 ? .25 : 1, 3) + Q(15 + t * 19.6, 24, 6, 5, Jc, .9, 1) + ([
		1,
		3,
		5
	].includes(t) ? Q(14 + t * 19.6, 36, 13, 7, qc, 1, 2) : "")).join(""),
	weekPlan: () => Q(12, 8, 136, 64, Yc, .6, 3) + il(4, 22, 12, (e) => rl(12, e, 148, e, Jc, .6, .6)) + Array.from({ length: 7 }, (e, t) => rl(30 + t * 17, 14, 30 + t * 17, 72, Jc, .6, .6)).join("") + Q(82, 14, 16, 58, qc, .14, 0) + Q(49, 36, 13, 10, qc, .9, 2) + Q(83, 48, 13, 14, qc, .9, 2) + Q(117, 24, 13, 9, Xc, .7, 2),
	layers: () => Q(12, 8, 136, 64, Yc, .6, 3) + Q(70, 12, 22, 6, qc, .9, 3) + Q(96, 12, 22, 6, Xc, .7, 3) + Q(122, 12, 22, 6, Jc, .6, 3) + il(3, 26, 15, (e, t) => rl(12, e - 2, 148, e - 2, Jc, .6, .6) + Q(16, e + 3, 16, 3, Jc, .9) + Q([
		44,
		62,
		100
	][t], e + 1, [
		46,
		22,
		40
	][t], 8, [
		qc,
		Xc,
		"#7fd1c4"
	][t], .9, 3)),
	sidepanel: () => Q(12, 8, 136, 64, Yc, .6, 3) + ol(18, 18, 76, 48, [
		5,
		10,
		17,
		24
	]) + Q(100, 8, 48, 64, Yc, 1, 3) + Q(106, 14, 26, 5, Xc, .9) + il(2, 26, 16, (e) => Q(106, e, 36, 12, Kc, 1, 2) + rl(106, e, 106, e + 12, qc, 2) + Q(111, e + 3, 24, 3, Jc, .9)),
	apMonth: () => Q(12, 8, 136, 64, $c, 1, 2) + rl(12, 8, 148, 8, el, 2.4) + Q(58, 13, 44, 5, Qc, .9) + il(4, 26, 12, (e) => rl(12, e, 148, e, el, .6, .5)) + Array.from({ length: 6 }, (e, t) => rl(31.4 + t * 19.4, 26, 31.4 + t * 19.4, 72, el, .6, .5)).join("") + Q(54, 40, 14, 5, el, .6, 0) + rl(54, 40, 54, 45, el, 2) + Q(112, 52, 14, 5, el, .6, 0) + rl(112, 52, 112, 57, el, 2) + nl(98, 32, 3.4, el),
	dayPlan: () => Q(34, 6, 92, 68, Yc, .6, 5) + Q(42, 12, 40, 5, Xc, .9) + Array.from({ length: 7 }, (e, t) => Q(42 + t * 11, 22, 8, 9, t === 2 ? qc : Yc, 1, 2)).join("") + il(4, 38, 9, (e) => rl(34, e, 126, e, Jc, .6, .6)) + Q(56, 39, 62, 7, Xc, .5, 2) + Q(56, 57, 62, 7, qc, .5, 2) + rl(48, 51, 126, 51, qc, 1.4) + nl(48, 51, 2.2, qc),
	yearWheel: () => `<circle cx="46" cy="40" r="24" fill="none" stroke="${Yc}" stroke-width="9"/><circle cx="46" cy="40" r="24" fill="none" stroke="${Jc}" stroke-width="9" stroke-dasharray="100 151" transform="rotate(-90 46 40)"${tl(.8)}/><circle cx="46" cy="40" r="24" fill="none" stroke="${qc}" stroke-width="9" stroke-dasharray="13 151" stroke-dashoffset="-100" transform="rotate(-90 46 40)"/>` + nl(24, 32, 2, Xc) + nl(26, 50, 2, Xc) + nl(60, 60, 2, Xc, .5) + Q(38, 37, 16, 6, Xc, .9) + Q(88, 20, 20, 4, qc) + il(3, 30, 13, (e) => Q(88, e, 56, 9, Yc, 1, 2) + Q(92, e + 3, 34, 3, Jc, .9)),
	heatmap: () => Q(12, 8, 136, 64, Yc, .6, 3) + Array.from({ length: 3 }, (e, t) => Array.from({ length: 28 }, (e, n) => Q(18 + t * 44 + n % 7 * 5.4, 16 + Math.floor(n / 7) * 5.4, 4.2, 4.2, [
		3,
		11,
		16,
		24
	].includes((n + t * 5) % 28) ? qc : Jc, [
		3,
		11,
		16,
		24
	].includes((n + t * 5) % 28) ? 1 : (n * 7 + t) % 5 == 0 ? .6 : .28, 1)).join("")).join("") + Q(18, 46, 124, 9, Kc, .8, 2) + Q(22, 49, 30, 3, Xc, .8),
	billboard: () => Q(34, 6, 92, 68, Zc, 1, 6) + nl(42, 14, 2, qc) + Q(48, 12, 24, 4, qc, .9) + Q(42, 22, 60, 7, Xc, .95) + [
		42,
		70,
		98
	].map((e) => Q(e, 36, 22, 16, Yc, 1, 3) + Q(e + 6, 40, 10, 7, Xc, .9, 1)).join("") + Q(42, 58, 78, 9, qc, 1, 3),
	stacked: () => Q(54, 10, 70, 44, Yc, .7, 5) + Q(46, 16, 70, 44, Yc, 1, 5) + Q(38, 22, 70, 44, Xc, 1, 5) + Q(44, 28, 22, 6, qc, 1, 3) + Q(44, 40, 44, 5, Zc, .9) + Q(44, 49, 30, 3, Zc, .5) + Q(44, 56, 20, 6, qc, 1, 2),
	noticeboard: () => Q(34, 6, 92, 68, "#8a5a3c", 1, 5) + Q(42, 14, 64, 28, "#fff7cc", 1, 0) + nl(74, 14, 3, "#d33a2c") + Q(48, 22, 40, 5, Zc, .9) + Q(48, 31, 28, 3, Zc, .5) + Q(48, 46, 58, 20, "#d9ecff", 1, 0) + nl(54, 46, 2.6, "#2f6fd6") + Q(54, 53, 36, 4, Zc, .85) + Q(54, 60, 44, 2.5, Zc, .45),
	split: () => Q(16, 10, 128, 60, Yc, 1, 6) + Q(16, 10, 44, 42, qc, 1, 6) + Q(24, 22, 20, 22, Zc, .9, 2) + Q(68, 16, 20, 5, Jc, .7, 2) + Q(68, 26, 58, 6, Xc, .95) + Q(68, 36, 40, 3, Jc, .7) + rl(16, 52, 144, 52, Jc, .6, .6) + Q(24, 58, 60, 3, Jc, .8) + Q(24, 64, 44, 2.5, Jc, .5),
	band: () => Q(8, 30, 144, 20, qc, 1, 0) + Q(8, 30, 40, 20, Zc, 1, 0) + nl(16, 40, 2, qc) + Q(22, 38, 20, 4, Xc, .9) + Q(56, 38, 34, 4, Zc, .85) + nl(96, 40, 1.8, Zc) + Q(102, 38, 34, 4, Zc, .85) + nl(142, 40, 1.8, Zc),
	oneLine: () => il(3, 12, 20, (e, t) => Q(12, e, 136, 15, Yc, t ? .7 : 1, 4) + rl(12, e + 1, 12, e + 14, t ? Jc : qc, 3) + nl(22, e + 7.5, 2.4, t ? Jc : qc) + Q(30, e + 5.5, 20, 4, t ? Jc : qc, .9) + Q(56, e + 5.5, 54, 4, Jc, .9) + (t ? "" : Q(124, e + 4, 18, 7, qc, 1, 2))),
	ring: () => Q(30, 6, 100, 68, Yc, 1, 8) + `<circle cx="58" cy="34" r="15" fill="none" stroke="${Jc}" stroke-width="5"${tl(.5)}/><circle cx="58" cy="34" r="15" fill="none" stroke="${qc}" stroke-width="5" stroke-linecap="round" stroke-dasharray="70 94" transform="rotate(-90 58 34)"/>` + Q(53, 31, 10, 6, Xc, .9, 1) + Q(82, 24, 38, 6, Xc, .95) + Q(82, 35, 28, 3, Jc, .8) + rl(38, 56, 122, 56, Jc, .6, .6) + Q(38, 61, 50, 3, Jc, .7) + Q(38, 67, 40, 3, Jc, .5),
	darkGlass: () => Q(34, 6, 92, 68, "#121216", 1, 7) + nl(112, 16, 22, qc, .45) + nl(46, 68, 20, "#3fb8a4", .35) + nl(42, 14, 2, qc) + Q(48, 12, 22, 4, qc, .9) + Q(42, 22, 56, 6, Xc, .95) + Q(42, 34, 76, 3, Jc, .6, 1.5) + Q(42, 34, 60, 3, qc, 1, 1.5) + Q(42, 42, 36, 9, Xc, 1, 3) + Q(82, 42, 36, 9, Xc, .18, 3) + Q(42, 56, 76, 14, Xc, .1, 3) + Q(47, 61, 40, 3, Xc, .7),
	nextBento: () => Q(40, 8, 80, 26, qc, 1, 6) + Q(46, 13, 22, 4, Zc, .8) + Q(46, 23, 44, 5, Zc, .9) + Q(40, 38, 38, 16, Yc, 1, 5) + Q(82, 38, 38, 16, Yc, 1, 5) + Q(40, 58, 38, 16, Xc, 1, 5) + Q(82, 58, 38, 16, qc, .4, 5) + Q(46, 42, 8, 7, Xc, .9, 1) + Q(88, 42, 8, 7, Xc, .9, 1) + Q(46, 62, 8, 7, Zc, .9, 1),
	apNow: () => Q(40, 6, 80, 68, $c, 1, 5) + Q(40, 6, 80, 12, Qc, 1, 5) + nl(47, 12, 1.8, el) + Q(52, 10, 22, 4, el, .9) + Q(46, 24, 14, 14, Qc, 1, 2) + Q(50, 28, 6, 6, el, 1, 1) + Q(66, 25, 44, 5, Qc, .9) + Q(66, 34, 32, 3, Qc, .5) + Q(40, 46, 80, 28, "#eae1c7", 1, 0) + rl(48, 54, 48, 66, el, 1) + nl(48, 54, 1.8, el) + nl(48, 66, 1.8, el) + Q(54, 52, 40, 3.5, Qc, .8) + Q(54, 64, 34, 3.5, Qc, .8),
	apNavy: () => Q(40, 6, 80, 68, Qc, 1, 5) + nl(47, 13, 1.8, el) + Q(52, 11, 22, 4, el, .9) + Q(46, 20, 68, 22, $c, 1, 3) + Q(51, 25, 8, 10, el, 1, 1) + Q(64, 25, 40, 5, Qc, .9) + Q(64, 34, 26, 3, Qc, .5) + `<rect x="46" y="46" width="68" height="14" rx="3" fill="#262e4f" stroke="${el}" stroke-width="0.8"/>` + Q(51, 50, 7, 6, el, 1, 1) + Q(64, 51, 36, 4, $c, .85) + Q(46, 66, 50, 3, $c, .6),
	apSeries: () => Q(12, 8, 136, 64, "#f5efdd", 1, 2) + rl(20, 17, 34, 17, el, 1) + Q(38, 15, 26, 3.5, el, .9) + Q(20, 24, 58, 8, "#7a1a1a") + Q(20, 38, 64, 3, Qc, .6) + Q(20, 44, 52, 3, Qc, .6) + [
		20,
		46,
		72
	].map((e) => Q(e, 54, 12, 2.5, el, .9) + Q(e, 60, 20, 3.5, Qc, .8)).join("") + rl(100, 14, 100, 66, el, .8, .6) + Q(108, 18, 30, 8, "#7a1a1a", .85) + Q(108, 32, 32, 2.5, Qc, .5) + Q(108, 38, 26, 2.5, Qc, .5),
	mobileAgenda: () => Q(50, 4, 60, 72, "#121216", 1, 8) + Q(56, 10, 22, 4, Xc, .9) + Array.from({ length: 7 }, (e, t) => Q(56 + t * 7.1, 18, 5.6, 9, t === 2 ? qc : Yc, 1, 2)).join("") + il(3, 32, 14, (e) => Q(56, e, 48, 11, "#1c1c22", 1, 3) + rl(67, e + 2, 67, e + 9, qc, 1.4) + Q(58, e + 4, 6, 3, Jc, .8) + Q(70, e + 3, 26, 3, Xc, .85))
};
Object.keys(sl);
function cl(e) {
	let t = sl[e] ?? sl.plain, n = ["booklet"].includes(e);
	return al(t(), n ? "#1a2620" : Kc);
}
//#endregion
//#region src/lib/DesignPicker.svelte
var ll = /* @__PURE__ */ B("<button type=\"button\"> </button>"), ul = /* @__PURE__ */ B("<img alt=\"\" loading=\"lazy\" decoding=\"async\" class=\"svelte-wurosr\"/>"), dl = /* @__PURE__ */ B("<span class=\"dp-mark svelte-wurosr\"> </span>"), fl = /* @__PURE__ */ B("<button type=\"button\"><span class=\"dp-pic svelte-wurosr\"><!></span> <span class=\"dp-name svelte-wurosr\"> </span> <!></button>"), pl = /* @__PURE__ */ B("<section class=\"dp-family svelte-wurosr\"><h3 class=\"svelte-wurosr\"> </h3> <div class=\"dp-grid svelte-wurosr\"></div></section>"), ml = /* @__PURE__ */ B("<p class=\"dp-none svelte-wurosr\"> </p>"), hl = /* @__PURE__ */ B("<span class=\"dp-side-view svelte-wurosr\"> </span>"), gl = /* @__PURE__ */ B("<dialog class=\"dp-overlay svelte-wurosr\"><div class=\"dp-card svelte-wurosr\"><div class=\"dp-head svelte-wurosr\"><h2 class=\"svelte-wurosr\"> </h2> <input class=\"dp-search svelte-wurosr\" type=\"search\"/> <span class=\"dp-count svelte-wurosr\"> </span> <button type=\"button\" class=\"dp-close svelte-wurosr\"><svg viewBox=\"0 0 16 16\" width=\"16\" height=\"16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" aria-hidden=\"true\"><path d=\"M3 3l10 10M13 3L3 13\"></path></svg></button></div> <div class=\"dp-views svelte-wurosr\" role=\"group\"><button type=\"button\"> </button> <!></div> <div class=\"dp-body svelte-wurosr\"><div class=\"dp-list svelte-wurosr\"><!> <!></div> <aside class=\"dp-side svelte-wurosr\"><div class=\"dp-side-head svelte-wurosr\"><strong> </strong> <!></div> <div class=\"dp-preview svelte-wurosr\"><div class=\"dp-stage svelte-wurosr\"><iframe src=\"/?preview=1\" class=\"svelte-wurosr\"></iframe></div></div> <button type=\"button\" class=\"dp-use svelte-wurosr\"> </button></aside></div></div></dialog>");
function _l(e, t) {
	$e(t, !0);
	let n = Hi(t, "current", 3, null), r = Hi(t, "mode", 3, "set"), i = Hi(t, "site", 3, null), a = Hi(t, "page", 3, null), o = {
		list: "calendar.viewList",
		cards: "calendar.viewCards",
		month: "calendar.viewMonth",
		agenda: "calendar.viewAgenda",
		next: "calendar.viewNext",
		week: "calendar.viewWeek",
		day: "calendar.viewDay",
		year: "calendar.viewYear"
	}, s = 1040, c = /* @__PURE__ */ k(""), l = /* @__PURE__ */ k(""), u = /* @__PURE__ */ k(an(n() ?? "plain")), d = /* @__PURE__ */ k(an(/* @__PURE__ */ new Set())), f = /* @__PURE__ */ k(null), p = /* @__PURE__ */ k(0), m = /* @__PURE__ */ k(!1), h = /* @__PURE__ */ k(600), g = /* @__PURE__ */ k(null), _ = /* @__PURE__ */ k(null), v = (e) => !R(l) || e.view === null || e.view === R(l), y = (e) => v(e) && (!R(c).trim() || J(e.labelKey).toLowerCase().includes(R(c).trim().toLowerCase())), b = /* @__PURE__ */ O(() => yc().map((e) => ({
		...e,
		designs: e.designs.filter(y)
	})).filter((e) => e.designs.length)), x = /* @__PURE__ */ O(() => R(b).reduce((e, t) => e + t.designs.length, 0)), S = /* @__PURE__ */ O(() => Nc(R(u))), ee = /* @__PURE__ */ O(() => R(p) ? Math.min(1, R(p) / s) : .4);
	wn(() => {
		R(_) && !R(_).open && R(_).showModal(), R(g)?.focus();
	});
	function te(e) {
		let t = Nc(e), n = {
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
	let ne = (e) => R(f)?.contentWindow?.postMessage(e, location.origin);
	function re() {
		let e = R(f)?.contentDocument, t = e?.querySelector(".urd-block[data-block-id=\"design-picker-cal\"]");
		if (!t) return;
		let n = t.getBoundingClientRect().bottom + (e.defaultView?.scrollY ?? 0), r = Math.max(160, Math.ceil(n + 24));
		r !== R(h) && A(h, r, !0);
	}
	let ie = null, ae = null;
	function C() {
		ie?.disconnect(), ie = null;
		let e = R(f)?.contentWindow;
		if (!e?.ResizeObserver) return;
		let t = 0, n = () => {
			let r = e.document.querySelector(".urd-block[data-block-id=\"design-picker-cal\"]");
			r && r !== ae ? (ae = r, ie = new e.ResizeObserver(re), ie.observe(r), re()) : t++ < 300 && e.requestAnimationFrame(n);
		};
		n();
	}
	function oe() {
		ne({
			type: "urd-preview-full",
			pageId: "design-picker",
			page: te(R(u))
		}), C();
	}
	function se(e) {
		if (e.origin !== location.origin || e.source !== R(f)?.contentWindow || e.data?.type !== "urd-ready") return;
		let t = R(f)?.contentDocument;
		if (t && !t.getElementById("design-picker-style")) {
			let e = t.createElement("style");
			e.id = "design-picker-style", e.textContent = ".urd-nav, #urd-announce, .urd-nav-announce, #urd-footer, .urd-totop { display: none !important; }", t.head.appendChild(e);
		}
		i() && ne({
			type: "urd-site",
			site: i()
		}), ne({
			type: "urd-viewport",
			mode: "desktop"
		}), ne({
			type: "urd-chrome",
			visible: !1
		}), A(m, !0);
	}
	wn(() => {
		R(u), R(m) && oe();
	}), wn(() => () => ie?.disconnect());
	function ce() {
		t.onclose?.();
	}
	function le(e) {
		A(d, /* @__PURE__ */ new Set([...R(d), e]), !0);
	}
	var ue = gl();
	Dr("message", on, se);
	var de = M(ue), fe = M(de), pe = M(fe), me = P(pe, !0), he = F(pe, 2);
	G(he), Ri(he, (e) => A(g, e), () => R(g));
	var ge = F(he, 2), w = P(ge, !0), _e = F(ge, 2);
	T(fe);
	var ve = F(fe, 2), ye = M(ve);
	let be;
	var xe = P(ye, !0);
	Qr(F(ye, 2), 16, () => fc, (e) => e, (e, t) => {
		var n = ll();
		let r;
		var i = P(n, !0);
		I((e) => {
			q(n, "aria-pressed", R(l) === t), r = xi(n, 1, "svelte-wurosr", null, r, { on: R(l) === t }), H(i, e);
		}, [() => J(o[t])]), z("click", n, () => A(l, t, !0)), V(e, n);
	}), T(ve);
	var Se = F(ve, 2), Ce = M(Se), we = M(Ce);
	Qr(we, 17, () => R(b), (e) => e.family, (e, r) => {
		var i = pl(), a = M(i), o = P(a, !0), s = F(a, 2);
		Qr(s, 21, () => R(r).designs, (e) => e.id, (e, r) => {
			var i = fl();
			let a;
			var o = M(i), s = M(o), c = (e) => {
				var t = Lr();
				W(N(t), () => cl(R(r).id)), V(e, t);
			}, l = /* @__PURE__ */ O(() => R(d).has(R(r).id)), f = (e) => {
				var t = ul();
				I(() => q(t, "src", `/admin/designs/${R(r).id}.webp`)), Dr("error", t, () => le(R(r).id)), Tr(t), V(e, t);
			};
			U(s, (e) => {
				R(l) ? e(c) : e(f, -1);
			}), T(o);
			var p = F(o, 2), m = P(p, !0), h = F(p, 2), g = (e) => {
				var t = dl(), n = P(t, !0);
				I((e) => H(n, e), [() => J("calendar.picker.current")]), V(e, t);
			};
			U(h, (e) => {
				n() !== null && R(r).id === n() && e(g);
			}), T(i), I((e, t) => {
				a = xi(i, 1, "dp-tile svelte-wurosr", null, a, {
					on: R(r).id === R(u),
					current: n() !== null && R(r).id === n()
				}), q(i, "aria-pressed", R(r).id === R(u)), q(i, "title", e), H(m, t);
			}, [() => J(R(r).labelKey), () => J(R(r).labelKey)]), z("click", i, () => A(u, R(r).id, !0)), z("dblclick", i, () => t.onpick?.(R(r).id)), V(e, i);
		}), T(s), T(i), I((e) => H(o, e), [() => J(R(r).labelKey)]), V(e, i);
	});
	var Te = F(we, 2), Ee = (e) => {
		var t = ml(), n = P(t, !0);
		I((e) => H(n, e), [() => J("calendar.picker.none")]), V(e, t);
	};
	U(Te, (e) => {
		R(b).length || e(Ee);
	}), T(Ce);
	var De = F(Ce, 2), Oe = M(De), ke = M(Oe), Ae = P(ke, !0), je = F(ke, 2), Me = (e) => {
		var t = hl(), n = P(t, !0);
		I((e) => H(n, e), [() => J(o[R(S).view])]), V(e, t);
	};
	U(je, (e) => {
		R(S).view && e(Me);
	}), T(Oe);
	var Ne = F(Oe, 2), Pe = M(Ne), Fe = M(Pe);
	Ri(Fe, (e) => A(f, e), () => R(f)), T(Pe), T(Ne);
	var Ie = F(Ne, 2), Le = P(Ie, !0);
	T(De), T(Se), T(de), T(ue), Ri(ue, (e) => A(_, e), () => R(_)), I((e, t, n, r, i, a, o, c, u, d, f) => {
		q(ue, "aria-label", e), H(me, t), q(he, "placeholder", n), q(he, "aria-label", r), H(w, i), q(_e, "aria-label", a), q(_e, "title", o), q(ye, "aria-pressed", R(l) === ""), be = xi(ye, 1, "svelte-wurosr", null, be, { on: R(l) === "" }), H(xe, c), H(Ae, u), Ci(Pe, `width:${s * R(ee)}px; height:${R(h) * R(ee)}px`), q(Fe, "title", d), Ci(Fe, `width:1040px; height:${R(h) ?? ""}px; transform:scale(${R(ee) ?? ""}); transform-origin:top left`), H(Le, f);
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
	]), Dr("close", ue, ce), Mi(he, () => R(c), (e) => A(c, e)), z("click", _e, () => t.onclose?.()), z("click", ye, () => A(l, "")), Ii(Ne, "clientWidth", (e) => A(p, e)), z("click", Ie, () => t.onpick?.(R(u))), V(e, ue), et();
}
Or(["click", "dblclick"]);
//#endregion
//#region ../template/assets/engine/0.7.4/blocks/form.js
var vl = () => [
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
], yl = /* @__PURE__ */ new Set([
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
function bl(e) {
	return yl.has(e?.type) && e.height?.mode !== "own";
}
var xl = /* @__PURE__ */ new Set([
	"calendar",
	"collection",
	"product"
]), Sl = /* @__PURE__ */ new Set([
	"countdown",
	"quote",
	"stats"
]), Cl = /* @__PURE__ */ new Set([
	"image",
	"video",
	"shape",
	"icon",
	"map"
]), wl = {
	min: .4,
	max: 2
}, Tl = {
	min: 6,
	max: 200,
	minDefault: 12,
	maxDefault: 96
};
function El(e) {
	if (!e || Cl.has(e.type)) return 1;
	let t = Number(e.size);
	return !Number.isFinite(t) || t <= 0 ? 1 : Math.round(Math.min(wl.max, Math.max(wl.min, t)) * 100) / 100;
}
function Dl(e) {
	let t = (e, t) => {
		let n = Number(e);
		return Number.isFinite(n) && n > 0 ? Math.min(Tl.max, Math.max(Tl.min, Math.round(n))) : t;
	}, n = t(e?.sizeMin, Tl.minDefault);
	return {
		min: n,
		max: Math.max(n, t(e?.sizeMax, Tl.maxDefault))
	};
}
function Ol(e, t = {}) {
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
function kl(e, t, n) {
	return Al(e, /* @__PURE__ */ new Map([[t, n]]));
}
function Al(e, t) {
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
	let { shifts: i } = Ol(n);
	for (let e of n) {
		let t = i.get(e.id) ?? 0;
		t && r.set(e.id, e.y + t);
	}
	return r;
}
var jl = 24, Ml = {
	"oppsett-byttet": "layout-changed",
	"blokk-endret": "block-edited",
	"desktop-endret-etter-mobil": "desktop-changed-after-mobile",
	seksjonshøyde: "section-height",
	"blokk-flyttet": "block-moved",
	"blokk-slettet": "block-deleted",
	"blokk-lagt-til": "block-added"
};
function Nl(e, t) {
	if (!e || !("y" in e || "h" in e)) return e ?? null;
	if (t && e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h) return null;
	let n = {
		x: e.x,
		w: e.w
	};
	return Number.isFinite(e.y) && (n.row = Math.max(1, Math.round((e.y - jl) / 8) + 1), n.rows = Number.isFinite(e.h) ? Math.max(1, Math.ceil(e.h / 8)) : 1), Number.isFinite(e.z) && e.z !== 1 && (n.z = e.z), e.rot && (n.rot = e.rot), n;
}
var Pl = {
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
}, Fl = { bildegalleri: "slideshow" }, Il = {
	flate: "surface",
	aksent: "accent",
	invers: "inverse",
	dus: "soft",
	dempet: "muted",
	dyp: "deep",
	uthevet: "highlighted"
}, Ll = {
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
function Rl(e) {
	let t = Array.isArray(e) ? e : e.blocks ?? [];
	for (let e of t) Pl[e.type] && (e.type = Pl[e.type]);
	if (!Array.isArray(e)) {
		for (let t of e.background?.layers ?? []) Fl[t.type] && (t.type = Fl[t.type]);
		Il[e.theme] && (e.theme = Il[e.theme]), Ll[e.preset] && (e.preset = Ll[e.preset]);
	}
	return e;
}
var zl = 26;
function Bl(e) {
	for (let t of e?.blocks ?? []) {
		if (t.type !== "calendar" || !t.props || !("scale" in t.props)) continue;
		let e = El({
			type: "calendar",
			size: t.props.scale
		});
		delete t.props.scale, e !== 1 && (t.size = e);
	}
}
function Vl(e) {
	for (let t of e?.blocks ?? []) {
		if (t.type !== "map" && t.type !== "kart" || !Number.isFinite(t.props?.height)) continue;
		let n = t.frames?.desktop;
		if (n && Number.isFinite(n.h)) {
			let r = Math.max(n.h, Math.round(t.props.height + zl)), i = kl(e.blocks, t.id, r);
			n.h = r;
			for (let t of e.blocks) {
				let e = i.get(t.id);
				Number.isFinite(e) && t.frames?.desktop && (t.frames.desktop.y = e);
			}
		}
		delete t.props.height;
	}
}
var Hl = {
	1: (e) => {
		for (let t of e.sections ?? []) {
			let e = t.responsive?.mobile;
			for (let e of t.blocks ?? []) e.decor && (e.hideMobile = !0), e.frames?.mobile && (e.frames.mobile = Nl(e.frames.mobile, e.frames.desktop));
			e?.mode === "manual" && (e.mode = "auto");
			let n = e?.attention?.reason;
			n && Ml[n] && (e.attention.reason = Ml[n]);
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) Rl(t);
		return e;
	},
	3: (e) => {
		for (let t of e.sections ?? []) Rl(t);
		return e;
	},
	4: (e) => {
		for (let t of e.sections ?? []) Vl(t);
		return e;
	},
	5: (e) => {
		for (let t of e.sections ?? []) Bl(t);
		return e;
	}
}, Ul = {
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
function Wl(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 4;) {
		let r = Ul[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function Gl(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 6;) {
		let i = Hl[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/plugins.js
function Kl(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var ql = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function Jl(e, t) {
	let n = Kl(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = Kl(t[2]), a = ql(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var Yl = /^[a-z0-9][a-z0-9-]*$/;
function Xl(e) {
	let t = [];
	if (!e || typeof e != "object") return ["the manifest is not an object"];
	Yl.test(e.id ?? "") || t.push("id is missing or invalid"), (typeof e.name != "string" || !e.name) && t.push("name is missing"), Kl(e.version ?? "") || t.push("version is not semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine is missing");
	let n = Array.isArray(e.languages) && e.languages.length > 0;
	return (e.entry !== void 0 || !n) && (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry is missing or is not a .js file"), (e.provides !== void 0 || !n) && (!e.provides || typeof e.provides != "object") && t.push("provides is missing"), e.languages !== void 0 && t.push(...Yi(e.languages)), e.locales !== void 0 && typeof e.locales != "boolean" && t.push("locales must be a boolean"), e.names !== void 0 && (typeof e.names != "object" || e.names === null || Array.isArray(e.names) || Object.values(e.names).some((e) => typeof e != "string" || !e)) && t.push("names must be an object mapping language code to name"), t;
}
Promise.resolve();
//#endregion
//#region ../template/assets/engine/0.7.4/sections/presets.js
function Zl(e) {
	return typeof crypto < "u" && crypto.randomUUID ? `${e}-${crypto.randomUUID().slice(0, 8)}` : `${e}-${[...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4))].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
var Ql = () => ({ mobile: {
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
}), $l = (e, t, n = {}) => ({
	id: Zl("blk"),
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
}), eu = (e, t = {}) => ({
	id: Zl("blk"),
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
}), tu = (e, t, n = {}) => ({
	id: Zl("blk"),
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
}), nu = (e, t, n = 40) => ({
	id: Zl("blk"),
	type: "icon",
	version: 1,
	props: {
		glyph: t,
		color: "accent",
		size: n
	},
	animation: null,
	frames: e
}), ru = (e, t = {}) => ({
	id: Zl("blk"),
	type: "map",
	version: 2,
	props: {
		location: "",
		zoom: 15,
		...t
	},
	animation: null,
	frames: e
}), iu = (e, t = {}) => ({
	id: Zl("blk"),
	type: "form",
	version: 1,
	props: {
		recipient: "",
		subject: "",
		mode: "mailto",
		endpoint: "",
		submitLabel: J("form.sendDefault"),
		successText: J("form.thanksDefault"),
		fields: vl(),
		...t
	},
	animation: null,
	frames: e
}), au = (e, t = {}) => ({
	id: Zl("blk"),
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
}), ou = () => ({
	type: "hover-lift",
	version: 1,
	props: {}
}), su = (e, t, n = {}) => ({
	id: Zl("blk"),
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
}), cu = (e, t = {}) => ({
	id: Zl("blk"),
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
}), lu = (e, t = {}) => ({
	id: Zl("blk"),
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
}), uu = (e, t = {}) => ({
	id: Zl("blk"),
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
}), du = (e, t = {}) => ({
	id: Zl("blk"),
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
}), fu = (e, t) => ({
	id: Zl("blk"),
	type: "faq",
	version: 1,
	props: {
		items: t,
		multi: !1
	},
	animation: null,
	frames: e
}), pu = (e, t = {}) => ({
	id: Zl("blk"),
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
}), mu = (e, t) => ({
	id: Zl("blk"),
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
}), hu = (e, t = {}) => ({
	id: Zl("blk"),
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
}), gu = (...e) => ({
	version: 1,
	layers: e
}), _u = (e) => ({
	type: "color",
	version: 1,
	props: { value: e }
}), vu = (e, t, n, r = .5) => ({
	type: "glow",
	version: 1,
	props: {
		x: e,
		y: t,
		color: "accent",
		radius: r,
		opacity: n
	}
}), yu = (e) => Math.max(0, ...e.blocks.map((e) => e.frames.desktop.y + e.frames.desktop.h)), bu = (e, t, n, r, i, a) => ({
	x: n + e % t * r,
	y: i + Math.floor(e / t) * a
}), xu = (e, t, n, r, i, a, o, s, c = 0) => {
	let l = (t) => e.blocks.some((e) => {
		let n = e.frames.desktop;
		return n.x < t.x + t.w - .01 && t.x < n.x + n.w - .01 && n.y < t.y + t.h - .01 && t.y < n.y + n.h - .01;
	});
	for (let e = 0; e < 60; e++) {
		let u = bu(e, t, n, r, i, a);
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
		y: yu(e) + 16,
		n: 0
	};
}, Su = (e, t, n) => e + t * .1 + n * .01, Cu = (e, t, n, r, i = null) => ({
	id: Zl("sec"),
	version: 1,
	preset: e,
	size: { minHeight: t },
	grid: i,
	background: n,
	blocks: r,
	responsive: Ql()
});
function wu(e) {
	e.sections.define("blank", {
		label: "Empty section",
		labelKey: "preset.blank.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "A blank canvas to build on freely",
		hintKey: "preset.blank.hint",
		create: () => Cu("blank", "40vh", gu(_u("bg")), [])
	}), e.sections.define("hero", {
		label: "Hero",
		labelKey: "preset.hero.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Large opening with gradient and glow, left-aligned",
		hintKey: "preset.hero.hint",
		create: () => Cu("hero", "70vh", {
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
				vu(.7, .2, .35),
				{
					type: "grain",
					version: 1,
					props: { opacity: .06 }
				}
			]
		}, [
			$l($(8.33, 40, 50, 38), J("seed.hero.title")),
			$l($(8.33, 84, 41.67, 26), J("seed.hero.intro")),
			tu($(8.33, 118, 20, 32), J("seed.readMore"))
		])
	}), e.sections.define("hero-centered", {
		label: "Hero, centred",
		labelKey: "preset.hero-centered.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Centred opening with two buttons",
		hintKey: "preset.hero-centered.hint",
		create: () => Cu("hero-centered", "60vh", gu(_u("bg")), [
			$l($(15, 64, 70, 44), J("seed.heroCenter.title"), { align: "center" }),
			$l($(25, 116, 50, 26), J("seed.heroCenter.intro"), { align: "center" }),
			tu($(31.5, 160, 17, 40), J("seed.join")),
			tu($(51.5, 160, 17, 40), J("seed.readMore"), { style: "secondary" })
		])
	}), e.sections.define("hero-image", {
		label: "Hero over a photo",
		labelKey: "preset.hero-image.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Opening over a photo that creeps slowly, with a veil under the text",
		hintKey: "preset.hero-image.hint",
		create: () => {
			let e = Cu("hero-image", "70vh", {
				version: 1,
				layers: [
					_u("bg"),
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
				$l($(8.33, 40, 50, 38), J("seed.hero.title")),
				$l($(8.33, 84, 41.67, 26), J("seed.hero.intro")),
				tu($(8.33, 118, 20, 32), J("seed.readMore"))
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
			let e = Cu("hero-photos", "70vh", {
				version: 1,
				layers: [
					_u("bg"),
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
				$l($(15, 64, 70, 44), J("seed.heroCenter.title"), { align: "center" }),
				$l($(25, 116, 50, 26), J("seed.heroCenter.intro"), { align: "center" }),
				tu($(41.5, 160, 17, 40), J("seed.readMore"))
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
		create: () => Cu("images", "360px", gu(_u("bg")), [
			$l($(4, 24, 50, 32), J("seed.images.title")),
			eu($(4, 72, 28, 220)),
			eu($(36, 72, 28, 220)),
			eu($(68, 72, 28, 220))
		]),
		itemLabel: "image",
		itemLabelKey: "item.image",
		item: (e) => {
			let { x: t, y: n } = xu(e, 3, 4, 32, 72, 244, 28, 220);
			return {
				blocks: [eu($(t, n, 28, 220))],
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
		create: () => Cu("gallery", "440px", gu(_u("bg")), [$l($(4, 24, 50, 32), J("seed.gallery.title")), du($(4, 72, 92, 320))])
	}), e.sections.define("find-us", {
		label: "Find us",
		labelKey: "preset.find-us.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Map with your address (privacy-friendly OpenStreetMap)",
		hintKey: "preset.find-us.hint",
		create: () => Cu("find-us", "480px", gu(_u("bg")), [$l($(6, 40, 60, 70), J("seed.findUs.title")), ru($(6, 120, 88, 360, 2))])
	}), e.sections.define("whats-on", {
		label: "What is on",
		labelKey: "preset.whats-on.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Event list from a subscribable calendar (iCal/Google)",
		hintKey: "preset.whats-on.hint",
		create: () => Cu("whats-on", "520px", gu(_u("bg")), [$l($(6, 40, 60, 70), J("seed.whatsOn.title")), au($(6, 130, 88, 320, 2), { limit: 5 })])
	});
	let t = (t, n, r) => e.sections.define(t, {
		label: `What is on: ${t.slice(9)}`,
		labelKey: `preset.${t}.label`,
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Events from a subscribable calendar (iCal/Google)",
		hintKey: `preset.${t}.hint`,
		create: () => Cu(t, n, gu(_u("bg")), [$l($(6, 40, 60, 70), J("seed.whatsOn.title")), r()])
	});
	t("whats-on-cards", "560px", () => au($(6, 130, 88, 360, 2), {
		view: "cards",
		limit: 6
	})), t("whats-on-month", "720px", () => au($(6, 130, 88, 520, 2), { view: "month" })), t("whats-on-week", "560px", () => au($(6, 130, 88, 360, 2), {
		view: "week",
		design: "weekStrip"
	})), t("whats-on-next", "460px", () => au($(6, 130, 48, 260, 2), {
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
		create: () => Cu("contact-form", "520px", gu(_u("bg")), [$l($(6, 40, 60, 120), J("seed.contactForm.intro")), iu($(6, 180, 60, 380, 2))])
	}), e.sections.define("contact", {
		label: "Contact",
		labelKey: "preset.contact.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Contact details in a card with an email button",
		hintKey: "preset.contact.hint",
		create: () => Cu("contact", "320px", gu(_u("surface"), vu(.2, .8, .2)), [
			$l($(10, 32, 40, 36), J("seed.contact.title")),
			$l($(10, 84, 36, 130), J("seed.contact.info"), { box: !0 }),
			tu($(60, 100, 22, 40), J("seed.contact.button"), { href: `mailto:${J("seed.email")}` })
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
				let i = nu($(e + 10.5, 88, 4, 52), n), a = $l($(e, 152, 25, 200), J("seed.features.card", { title: r }), {
					align: "center",
					box: !0
				});
				return a.animation = ou(), i.mobileOrder = Su(88, t, 0), a.mobileOrder = Su(88, t, 1), [i, a];
			};
			return Cu("feature-cards", "420px", gu(_u("bg")), [
				$l($(6, 28, 60, 38), J("seed.features.title")),
				...e(6, 0, "✦", J("seed.features.card1")),
				...e(37.5, 1, "★", J("seed.features.card2")),
				...e(69, 2, "✓", J("seed.features.card3"))
			]);
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = xu(e, 3, 6, 31.5, 152, 296, 25, 264, -64), i = nu($(t + 10.5, n - 64, 4, 52), "✦"), a = $l($(t, n, 25, 200), J("seed.features.card", { title: J("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return a.animation = ou(), i.mobileOrder = Su(88, r, 0), a.mobileOrder = Su(88, r, 1), {
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
				let r = $l($(e, 88, 25, 200), J("seed.features.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.animation = ou(), r.mobileOrder = Su(88, t, 0), r;
			};
			return Cu("feature-cards-simple", "360px", gu(_u("bg")), [
				$l($(6, 28, 60, 38), J("seed.features.title")),
				e(6, 0, J("seed.features.card1")),
				e(37.5, 1, J("seed.features.card2")),
				e(69, 2, J("seed.features.card3"))
			]);
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = xu(e, 3, 6, 31.5, 88, 232, 25, 200), i = $l($(t, n, 25, 200), J("seed.features.card", { title: J("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.animation = ou(), i.mobileOrder = Su(88, r, 0), {
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
				let n = eu($(e, 88, 25, 160)), r = $l($(e, 256, 25, 160), J("seed.news.card"));
				return n.mobileOrder = Su(88, t, 0), r.mobileOrder = Su(88, t, 1), [n, r];
			};
			return Cu("news", "460px", gu(_u("bg")), [
				$l($(6, 28, 50, 38), J("seed.news.title")),
				tu($(78, 30, 16, 36), J("seed.news.seeAll"), { style: "secondary" }),
				...e(6, 0),
				...e(37.5, 1),
				...e(69, 2)
			]);
		},
		itemLabel: "story",
		itemLabelKey: "item.story",
		item: (e) => {
			let { x: t, y: n, n: r } = xu(e, 3, 6, 31.5, 88, 344, 25, 328), i = eu($(t, n, 25, 160)), a = $l($(t, n + 168, 25, 160), J("seed.news.card"));
			return i.mobileOrder = Su(88, r, 0), a.mobileOrder = Su(88, r, 1), {
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
		create: () => Cu("news-collection", "300px", gu(_u("bg")), [$l($(6, 28, 50, 38), J("seed.news.title")), su($(6, 88, 88, 180), "cards")])
	}), e.sections.define("noticeboard", {
		label: "Noticeboard",
		labelKey: "preset.noticeboard.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Dated list from a collection (notices/announcements)",
		hintKey: "preset.noticeboard.hint",
		create: () => Cu("noticeboard", "300px", gu(_u("surface")), [$l($(6, 28, 50, 38), J("seed.noticeboard.title")), su($(6, 88, 88, 180), "list", { limit: 8 })])
	}), e.sections.define("publication-archive", {
		label: "Publication archive",
		labelKey: "preset.publication-archive.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Year-grouped archive from a collection (issues, minutes, reports)",
		hintKey: "preset.publication-archive.hint",
		create: () => Cu("publication-archive", "300px", gu(_u("bg")), [$l($(6, 28, 60, 38), J("seed.archive.title")), su($(6, 88, 88, 180), "archive", { limit: 0 })])
	}), e.sections.define("events", {
		label: "Events",
		labelKey: "preset.events.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Three rows with date badge and sign-up button",
		hintKey: "preset.events.hint",
		create: () => {
			let e = (e, t, n, r) => [
				$l($(6, e, 8, 88), J("seed.events.dateBadge", {
					day: t,
					month: n
				}), {
					align: "center",
					box: !0
				}),
				$l($(16, e, 58, 88), J("seed.events.row", { title: r })),
				tu($(78, e + 24, 16, 40), J("seed.events.signup"), { style: "secondary" })
			];
			return Cu("events", "440px", gu(_u("surface")), [
				$l($(6, 28, 50, 38), J("seed.events.title")),
				...e(88, "11", J("seed.events.monthAug"), J("seed.events.row1")),
				...e(196, "25", J("seed.events.monthAug"), J("seed.events.row2")),
				...e(304, "8", J("seed.events.monthSep"), J("seed.events.row3"))
			]);
		},
		itemLabel: "row",
		itemLabelKey: "item.row",
		item: (e) => {
			let t = yu(e) + 16;
			return {
				blocks: [
					$l($(6, t, 8, 88), J("seed.events.newBadge"), {
						align: "center",
						box: !0
					}),
					$l($(16, t, 58, 88), J("seed.events.row", { title: J("seed.events.newTitle") })),
					tu($(78, t + 24, 16, 40), J("seed.events.signup"), { style: "secondary" })
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
				let r = eu($(e, 80, 22, 180), { alt: J("seed.team.alt") }), i = $l($(e, 268, 22, 84), J("seed.team.member", { role: n }), { align: "center" });
				return r.mobileOrder = Su(80, t, 0), i.mobileOrder = Su(80, t, 1), [r, i];
			};
			return Cu("team", "420px", gu(_u("surface")), [
				$l($(6, 24, 50, 32), J("seed.team.title")),
				...e(7.5, 0, J("seed.team.role1")),
				...e(39, 1, J("seed.team.role2")),
				...e(70.5, 2, J("seed.team.role3"))
			]);
		},
		itemLabel: "person",
		itemLabelKey: "item.person",
		item: (e) => {
			let { x: t, y: n, n: r } = xu(e, 3, 7.5, 31.5, 80, 288, 22, 272), i = eu($(t, n, 22, 180), { alt: J("seed.team.alt") }), a = $l($(t, n + 188, 22, 84), J("seed.team.member", { role: J("seed.team.roleNew") }), { align: "center" });
			return i.mobileOrder = Su(80, r, 0), a.mobileOrder = Su(80, r, 1), {
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
		create: () => Cu("faq", "520px", gu(_u("bg")), [
			$l($(25, 24, 50, 36), J("seed.faq.title"), { align: "center" }),
			fu($(20, 80, 60, 320), [
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
			$l($(20, 416, 60, 32), J("seed.faq.more"), { align: "center" })
		])
	}), e.sections.define("timeline", {
		label: "Timeline",
		labelKey: "preset.timeline.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Your story as events along a line",
		hintKey: "preset.timeline.hint",
		create: () => Cu("timeline", "480px", gu(_u("bg")), [$l($(25, 24, 50, 36), J("seed.timeline.title"), { align: "center" }), mu($(25, 88, 50, 330), [
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
				let r = $l($(e, 88, 25, 72), `<h3>${t + 1}</h3>`, {
					align: "center",
					size: 44
				}), i = $l($(e, 168, 25, 160), J("seed.steps.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.mobileOrder = Su(88, t, 0), i.mobileOrder = Su(88, t, 1), [r, i];
			};
			return Cu("steps", "400px", gu(_u("bg")), [
				$l($(6, 28, 60, 38), J("seed.steps.title")),
				...e(6, 0, J("seed.steps.s1")),
				...e(37.5, 1, J("seed.steps.s2")),
				...e(69, 2, J("seed.steps.s3"))
			]);
		},
		itemLabel: "step",
		itemLabelKey: "item.step",
		item: (e) => {
			let { x: t, y: n, n: r } = xu(e, 3, 6, 31.5, 88, 272, 25, 240), i = $l($(t, n, 25, 72), `<h3>${r + 1}</h3>`, {
				align: "center",
				size: 44
			}), a = $l($(t, n + 80, 25, 160), J("seed.steps.card", { title: J("seed.steps.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.mobileOrder = Su(88, r, 0), a.mobileOrder = Su(88, r, 1), {
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
				eu($(6, 40, 55, 300)),
				$l($(6, 348, 55, 108), J("seed.feature.main")),
				tu($(6, 464, 14, 38), J("seed.readMore"), { style: "secondary" }),
				eu($(66, 40, 28, 120)),
				$l($(66, 164, 28, 60), J("seed.feature.small1")),
				eu($(66, 244, 28, 120)),
				$l($(66, 368, 28, 60), J("seed.feature.small2"))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = Su(40, t < 3 ? 0 : 1, t);
			}), Cu("lead-story", "540px", gu(_u("bg")), e);
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
					eu($(e, 88, 25, 200)),
					$l($(e, 296, 25, 76), J("seed.products.card", {
						name: n,
						price: r
					}), { align: "center" }),
					tu($(e + 5, 380, 15, 40), J("seed.products.buy"))
				];
				return i.forEach((e, n) => {
					e.mobileOrder = Su(88, t, n);
				}), i;
			};
			return Cu("products", "470px", gu(_u("bg")), [
				$l($(6, 28, 50, 38), J("seed.products.title")),
				...e(6, 0, J("seed.products.name"), J("seed.products.price1")),
				...e(37.5, 1, J("seed.products.name"), J("seed.products.price2")),
				...e(69, 2, J("seed.products.name"), J("seed.products.price3"))
			]);
		},
		itemLabel: "product",
		itemLabelKey: "item.product",
		item: (e) => {
			let { x: t, y: n, n: r } = xu(e, 3, 6, 31.5, 88, 348, 25, 332), i = [
				eu($(t, n, 25, 200)),
				$l($(t, n + 208, 25, 76), J("seed.products.card", {
					name: J("seed.products.name"),
					price: J("seed.products.price1")
				}), { align: "center" }),
				tu($(t + 5, n + 292, 15, 40), J("seed.products.buy"))
			];
			return i.forEach((e, t) => {
				e.mobileOrder = Su(88, r, t);
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
		create: () => Cu("shop", "544px", gu(_u("bg")), [
			$l($(6, 28, 50, 38), J("seed.shop.title")),
			lu($(78, 88, 16, 48)),
			cu($(6, 176, 88, 320))
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
				$l($(6, 48, 52, 96), J("seed.shopHero.title")),
				$l($(6, 152, 40, 48), J("seed.shopHero.sub")),
				tu($(6, 216, 17, 42), J("seed.shopHero.cta")),
				eu($(62, 40, 32, 300))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = Su(48, t < 3 ? 0 : 1, t);
			}), Cu("shop-hero", "400px", {
				version: 1,
				layers: [
					_u("bg"),
					vu(.8, .25, .28, .6),
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
				let r = eu($(e, 88, 21, 170)), i = $l($(e, 266, 21, 34), J("seed.shopCategories.tile", { name: n }), { align: "center" });
				return r.mobileOrder = Su(88, t, 0), i.mobileOrder = Su(88, t, 1), [r, i];
			}, t = Cu("shop-categories", "360px", gu(_u("bg")), [
				$l($(6, 28, 60, 38), J("seed.shopCategories.title")),
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
			let { x: t, y: n, n: r } = xu(e, 4, 6, 23.5, 88, 220, 21, 212), i = eu($(t, n, 21, 170)), a = $l($(t, n + 178, 21, 34), J("seed.shopCategories.tile", { name: J("seed.shopCategories.newCat") }), { align: "center" });
			return i.mobileOrder = Su(88, r, 0), a.mobileOrder = Su(88, r, 1), {
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
				let i = nu($(e + 10.5, 88, 4, 52), r, 44), a = $l($(e, 148, 25, 96), J(n), { align: "center" });
				return i.mobileOrder = Su(88, t, 0), a.mobileOrder = Su(88, t, 1), [i, a];
			}, t = Cu("shop-trust", "300px", gu(_u("bg")), [
				$l($(6, 28, 60, 38), J("seed.shopTrust.title")),
				...e(6, 0, "seed.shopTrust.t1", "✓"),
				...e(37.5, 1, "seed.shopTrust.t2", "↻"),
				...e(69, 2, "seed.shopTrust.t3", "✉")
			]);
			return t.theme = "muted", t;
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = xu(e, 3, 6, 31.5, 148, 216, 25, 156, -60), i = nu($(t + 10.5, n - 60, 4, 52), "✓", 44), a = $l($(t, n, 25, 96), J("seed.shopTrust.newItem"), { align: "center" });
			return i.mobileOrder = Su(88, r, 0), a.mobileOrder = Su(88, r, 1), {
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
				$l($(6, 56, 52, 100), J("seed.shopShowcase.title")),
				$l($(6, 164, 42, 56), J("seed.shopShowcase.text")),
				tu($(6, 236, 18, 42), J("seed.shopShowcase.cta")),
				eu($(62, 48, 32, 240))
			];
			e.forEach((e, t) => {
				e.mobileOrder = Su(56, t < 3 ? 0 : 1, t);
			});
			let t = Cu("shop-showcase", "340px", gu(_u("bg")), e);
			return t.theme = "deep", t;
		}
	}), e.sections.define("checkout", {
		label: "Checkout",
		labelKey: "preset.checkout.label",
		group: "Shop",
		groupKey: "presetGroup.shop",
		hint: "Order form that sends the basket as an email or to an endpoint",
		hintKey: "preset.checkout.hint",
		create: () => Cu("checkout", "560px", gu(_u("bg")), [$l($(6, 28, 50, 38), J("seed.checkout.title")), uu($(25, 96, 50, 430))])
	}), e.sections.define("cta", {
		label: "CTA banner",
		labelKey: "preset.cta.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Full width with one clear action",
		hintKey: "preset.cta.hint",
		create: () => Cu("cta", "280px", gu(_u("surface"), vu(.5, .5, .3, .7)), [
			$l($(20, 56, 60, 40), J("seed.cta.title"), { align: "center" }),
			$l($(25, 104, 50, 26), J("seed.cta.sub"), { align: "center" }),
			tu($(42, 148, 16, 42), J("seed.join"))
		])
	}), e.sections.define("quote", {
		label: "Quote",
		labelKey: "preset.quote.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Large quote with attribution",
		hintKey: "preset.quote.hint",
		create: () => Cu("quote", "300px", gu(_u("bg")), [pu($(20, 56, 60, 190), {
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
				let a = hu($(e, 76, 25, 120), {
					value: n,
					suffix: r,
					label: i
				});
				return a.mobileOrder = Su(76, t, 0), a;
			};
			return Cu("stats", "260px", gu(_u("surface")), [
				e(6, 0, "120", "+", J("seed.stats.l1")),
				e(37.5, 1, "25", "", J("seed.stats.l2")),
				e(69, 2, "1981", "", J("seed.stats.l3"))
			]);
		},
		itemLabel: "number",
		itemLabelKey: "item.number",
		item: (e) => {
			let { x: t, y: n, n: r } = xu(e, 3, 6, 31.5, 76, 140, 25, 120), i = hu($(t, n, 25, 120), {
				value: "42",
				label: J("seed.stats.newLabel")
			});
			return i.mobileOrder = Su(76, r, 0), {
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
			let e = (e) => eu($(e, 108, 18.5, 100), {
				alt: J("seed.sponsors.alt"),
				fit: "contain",
				radius: null,
				saturate: 0
			});
			return Cu("sponsors", "280px", gu(_u("bg")), [
				$l($(6, 28, 60, 36), J("seed.sponsors.title")),
				e(5.5),
				e(29),
				e(52.5),
				e(76)
			]);
		},
		itemLabel: "logo",
		itemLabelKey: "item.logo",
		item: (e) => {
			let { x: t, y: n } = xu(e, 4, 5.5, 23.5, 108, 124, 18.5, 100);
			return {
				blocks: [eu($(t, n, 18.5, 100), {
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
		create: () => Cu("membership", "500px", gu(_u("surface")), [
			$l($(6, 28, 50, 38), J("seed.membership.title")),
			$l($(14, 88, 32, 250), J("seed.membership.tier1"), {
				align: "center",
				box: !0
			}),
			$l($(54, 88, 32, 250), J("seed.membership.tier2"), {
				align: "center",
				box: !0
			}),
			tu($(42, 358, 16, 42), J("seed.join")),
			$l($(25, 414, 50, 30), J("seed.membership.vipps"), { align: "center" })
		])
	});
}
//#endregion
//#region ../template/assets/engine/0.7.4/templates-model.js
var Tu = [
	"section",
	"blocks",
	"page"
];
function Eu(e) {
	return to(String(e ?? ""), "");
}
function Du(e, t, { id: n, title: r }) {
	let i = structuredClone(e);
	i.meta = {
		...i.meta,
		id: n,
		title: r
	};
	for (let e of i.sections ?? []) {
		e.id = t("sec");
		for (let n of e.blocks ?? []) n.id = t("blk");
		Vl(e), Bl(e);
	}
	return i;
}
//#endregion
//#region ../template/assets/engine/0.7.4/collections-csv.js
var Ou = [
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
function ku(e) {
	let t = String(e ?? "");
	return /[",\n\r]/.test(t) ? `"${t.replaceAll("\"", "\"\"")}"` : t;
}
function Au(e, t) {
	return t === "sizes" ? (e.sizes ?? []).join("|") : t === "colors" ? (e.colors ?? []).map((e) => e.name).join("|") : e[t] ?? "";
}
function ju(e) {
	let t = [Ou.join(",")];
	for (let n of e ?? []) t.push(Ou.map((e) => ku(Au(n, e))).join(","));
	return t.join("\n") + "\n";
}
function Mu(e) {
	let t = [], n = [], r = "", i = !1, a = String(e ?? "");
	for (let e = 0; e < a.length; e += 1) {
		let o = a[e];
		i ? o === "\"" && a[e + 1] === "\"" ? (r += "\"", e += 1) : o === "\"" ? i = !1 : r += o : o === "\"" ? i = !0 : o === "," ? (n.push(r), r = "") : o === "\n" || o === "\r" ? (o === "\r" && a[e + 1] === "\n" && (e += 1), n.push(r), t.push(n), n = [], r = "") : r += o;
	}
	return (r !== "" || n.length) && (n.push(r), t.push(n)), t.filter((e) => e.some((e) => e.trim() !== ""));
}
var Nu = (e) => String(e ?? "").split("|").map((e) => e.trim()).filter(Boolean);
function Pu(e) {
	let t = Mu(e);
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
		let s = Nu(t.sizes);
		s.length && (o.sizes = s);
		let c = Nu(t.colors);
		c.length && (o.colors = c.map((e) => ({ name: e }))), r.push(o);
	}
	return {
		entries: r,
		skipped: i
	};
}
//#endregion
//#region ../template/assets/engine/0.7.4/feeds.js
function Fu(e) {
	return String(e ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&apos;");
}
function Iu(e, t) {
	let n = String(t ?? "").replace(/\/+$/, "");
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${(e ?? []).filter((e) => !e.noindex).map((e) => `  <url><loc>${Fu(n + (e.path === "/" ? "/" : e.path))}</loc></url>`).join("\n")}\n</urlset>\n`;
}
function Lu(e) {
	return `User-agent: *\nDisallow: /admin/\n\nSitemap: ${String(e ?? "").replace(/\/+$/, "")}/sitemap.xml\n`;
}
var Ru = [
	"news",
	"notices",
	"publications"
];
function zu(e) {
	let t = String(e.origin ?? "").replace(/\/+$/, ""), n = (e.items ?? []).map((n) => {
		let r = n.href ? new URL(n.href, t + "/").href : t + "/", i = n.date ? new Date(n.date) : null, a = i && !Number.isNaN(i.getTime()) ? `\n      <pubDate>${i.toUTCString()}</pubDate>` : "", o = n.text ? `\n      <description>${Fu(n.text)}</description>` : "";
		return `    <item>\n      <title>${Fu(n.title)}</title>\n      <link>${Fu(r)}</link>\n      <guid isPermaLink="false">${Fu(`${e.path}#${n.id ?? n.title}`)}</guid>${o}${a}\n    </item>`;
	}).join("\n");
	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${Fu(e.title)}</title>\n    <link>${Fu(t + "/")}</link>\n    <description>${Fu(e.description ?? e.title)}</description>\n${n}${n ? "\n" : ""}  </channel>\n</rss>\n`;
}
function Bu(e) {
	return Number(e) === 2 ? 2 : 1;
}
//#endregion
//#region ../template/assets/engine/0.7.4/gallery-layout.js
var Vu = [
	"floating",
	"fill",
	"band",
	"mosaic"
], Hu = [
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
], Uu = [
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
], Wu = [
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
], Gu = [
	"square",
	"circle",
	"triangle",
	"diamond",
	"hexagon",
	"octagon",
	"star",
	"heart"
], Ku = {
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
}, qu = {
	floating: "drift",
	fill: "none",
	mosaic: "crossfade",
	band: "none"
}, Ju = {
	min: 1,
	max: 20,
	dflt: 8
}, Yu = {
	min: 60,
	max: 400
}, Xu = {
	floating: 140,
	band: 156,
	mosaic: 140,
	fill: 0
}, Zu = {
	polaroid: "#ffffff",
	border: "#ffffff",
	thick: "#ffffff",
	double: "#ffffff",
	dark: "#161616",
	glow: "accent"
}, Qu = 1.35, $u = {
	min: 0,
	max: 1,
	dflt: .85
}, ed = {
	min: 0,
	max: 15,
	dflt: 5
}, td = {
	min: 0,
	max: 48,
	dflt: 5
}, nd = {
	min: .5,
	max: 90,
	dflt: 30
}, rd = {
	min: .5,
	max: 90,
	dflt: 12
}, id = {
	min: 4,
	max: 20,
	dflt: 12
};
function ad(e) {
	let t = String(e), n = 5381;
	for (let e = 0; e < t.length; e++) n = (n << 5) + n + t.charCodeAt(e) >>> 0;
	return n;
}
function od(e, t) {
	let n = ad(`${e}:${t}`);
	return n ^= n >>> 15, n = Math.imul(n, 739982445) >>> 0, n ^= n >>> 12, n = Math.imul(n, 695872825) >>> 0, n ^= n >>> 15, (n >>> 0) / 4294967296;
}
function sd(e) {
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
function cd(e) {
	return Array.from({ length: Math.max(1, Math.round(Number(e) || 0)) }, (e, t) => ({ src: sd(t) }));
}
var ld = (e) => Math.round(e * 100) / 100;
function ud(e, { min: t, max: n, dflt: r }) {
	if (e == null || e === "") return r;
	let i = Number(e);
	return Number.isFinite(i) ? Math.min(n, Math.max(t, i)) : r;
}
function dd(e) {
	return Vu.includes(e) ? e : "floating";
}
function fd(e, t) {
	let n = dd(e);
	return Ku[n].includes(t) ? t : qu[n];
}
function pd(e) {
	return Ku[dd(e)];
}
function md({ style: e = "floating", motion: t, reducedMotion: n = !1 } = {}) {
	return n ? !1 : dd(e) === "band" || fd(e, t) !== "none";
}
function hd(e, t, n, r = !1) {
	let i = Math.round(ud(e, dd(t) === "mosaic" ? id : Ju)), a = Number(n);
	return !r && Number.isFinite(a) && a > 0 ? Math.min(i, a) : i;
}
function gd(e, t) {
	let n = Xu[dd(t)] || Xu.floating;
	return Math.round(ud(e, {
		...Yu,
		dflt: n
	}));
}
function _d(e) {
	return bd(e) in Zu;
}
function vd(e, t) {
	let n = Zu[bd(e)] ?? "";
	return n && typeof t == "string" && t.trim() ? t.trim() : n;
}
function yd(e) {
	return Hu.includes(e) ? e : "rect";
}
function bd(e) {
	return Uu.includes(e) ? e : "shadow";
}
function xd(e) {
	return Wu.includes(e) ? e : "natural";
}
function Sd(e, t) {
	if (bd(t) === "polaroid") return .84;
	let n = yd(e);
	return Gu.includes(n) ? 1 : n === "arch" ? .8 : Qu;
}
function Cd(e) {
	return ["rect", "square"].includes(yd(e));
}
function wd(e) {
	return ud(e, rd);
}
function Td(e) {
	return ud(e, $u);
}
function Ed(e) {
	return ud(e, ed);
}
function Dd(e) {
	return Math.round(ud(e, td));
}
function Od(e) {
	return ud(e, nd);
}
function kd(e) {
	return Bu(e);
}
function Ad(e, t) {
	let n = Number(e);
	return Number.isFinite(n) && n > 0 ? Math.round(n) : Number(t) || 1;
}
function jd(e, { count: t, seed: n, size: r, spread: i, tilt: a, style: o = "floating", repeat: s = !1 } = {}) {
	let c = (Array.isArray(e) ? e : []).filter((e) => e && typeof e.src == "string" && e.src), l = hd(t, o, c.length, s), u = gd(r, o), d = Td(i), f = Ed(a), p = n == null || n === "" ? 1 : n, m = Math.ceil(Math.sqrt(l * 1.6)), h = Math.ceil(l / m), g = Array.from({ length: m * h }, (e, t) => t).map((e) => ({
		cell: e,
		at: od(p, `cell${e}`)
	})).sort((e, t) => e.at - t.at).map((e) => e.cell), _ = [];
	for (let e = 0; e < l; e++) {
		let t = g[e], n = (t % m + .5) / m + (od(p, `x${e}`) - .5) * (.9 / m), r = (Math.floor(t / m) + .5) / h + (od(p, `y${e}`) - .5) * (.9 / h);
		_.push({
			src: c.length ? c[e % c.length].src : "",
			index: c.length ? e % c.length : -1,
			x: ld(50 + (n - .5) * 100 * d),
			y: ld(50 + (r - .5) * 100 * d),
			w: Math.round(u * (.8 + od(p, `w${e}`) * .4)),
			rot: Md(p, e, f),
			phase: ld(od(p, `p${e}`)),
			heading: ld(od(p, `h${e}`))
		});
	}
	return _;
}
function Md(e, t, n) {
	return ld((od(e == null || e === "" ? 1 : e, `r${t}`) - .5) * 2 * Ed(n));
}
function Nd(e, t) {
	let n = e == null || e === "" ? 1 : e, r = od(n, `m${t}`);
	return {
		cols: r < .3 ? 2 : 1,
		rows: r > .7 || r < .1 ? 2 : 1,
		phase: ld(od(n, `mp${t}`))
	};
}
function Pd(e, t, n, r = !1) {
	let i = hd(e, "mosaic", n, r);
	return Array.from({ length: i }, (e, n) => Nd(t, n));
}
//#endregion
//#region ../template/assets/engine/0.7.4/preset-thumb.js
var Fd = /^#[0-9a-fA-F]{3,8}$/, Id = /^[a-z][a-z0-9-]*$/, Ld = "#171c26", Rd = "#232a38", zd = "#98a1b3", Bd = "#7c5cff", Vd = (e, t) => `var(--urd-color-${e}, ${t})`;
function Hd(e, t) {
	return typeof e == "string" ? Fd.test(e) ? e : Id.test(e) ? Vd(e, t) : t : t;
}
function Ud(e, t = 800) {
	let n = Number.parseFloat(e);
	return !Number.isFinite(n) || n <= 0 ? 400 : typeof e == "string" && e.trim().endsWith("vh") ? n / 100 * t : n;
}
var Wd = (e) => Math.round(e * 10) / 10, Gd = (e, t, n) => Math.min(n, Math.max(t, e)), Kd = (e, t, n, r, i, a = "") => `<rect x="${Wd(e)}" y="${Wd(t)}" width="${Wd(Math.max(n, 1))}" height="${Wd(Math.max(r, 1))}" fill="${i}"${a}/>`;
function qd(e) {
	if (e?.theme) return e.theme === "inverse" || e.theme === "deep" ? Vd("text", zd) : e.theme === "accent" ? Vd("accent", Bd) : Vd("surface", Rd);
	for (let t of e?.background?.layers ?? []) {
		if (t.type === "color") return Hd(t.props?.value, Ld);
		if (t.type === "gradient") return Hd(Array.isArray(t.props?.stops) ? t.props.stops[0] : null, Ld);
	}
	return Vd("bg", Ld);
}
function Jd(e, t, n, r, i) {
	let a = /<h[1-3]/.test(String(i?.html ?? "")), o = i?.align === "center", s = Vd("text", zd), c = [];
	i?.box && c.push(Kd(e, t, n, r, Vd("surface", Rd), " rx=\"1.5\""));
	let l = i?.box ? Math.min(2, n * .06) : 0, u = e + l, d = n - l * 2, f = [
		.72,
		.9,
		.5
	], p = [
		a ? 4 : 2.2,
		2.2,
		2.2
	], m = Gd(r / (p[0] + p[1] + p[2] + 4.8 + 2), 0, 1), h = t + l + Math.min(1, r * .08);
	for (let e = 0; e < 3; e++) {
		let n = Math.min(Math.max(e === 0 ? a ? 1.4 : 1 : .8, p[e] * m), Math.max(r, 1));
		if (e > 0 && h + n > t + r - l) break;
		let i = d * f[e], g = o ? u + (d - i) / 2 : u;
		c.push(Kd(g, h, i, n, s, ` opacity="${e === 0 ? .8 : .4}" rx="${Wd(Math.min(1, n / 2))}"`)), h += n + Math.max(.8, 2.4 * m);
	}
	return c.join("");
}
function Yd(e, t, n, r, i = !1) {
	let a = Vd("text", zd), o = [];
	i ? (o.push(Kd(e, t, n, r, Vd("surface", Rd), " rx=\"1.5\" opacity=\"0.35\"")), o.push(`<rect x="${Wd(e + .4)}" y="${Wd(t + .4)}" width="${Wd(Math.max(n - .8, 1))}" height="${Wd(Math.max(r - .8, 1))}" fill="none" stroke="${a}" stroke-width="0.6" stroke-dasharray="2 2" opacity="0.35" rx="1.5"/>`)) : o.push(Kd(e, t, n, r, Vd("surface", Rd), " rx=\"1.5\""));
	let s = i ? .15 : .4, c = (t) => Wd(e + n * t), l = (e) => Wd(t + r * e);
	return o.push(`<polygon points="${c(.08)},${l(.9)} ${c(.42)},${l(.38)} ${c(.62)},${l(.68)} ${c(.75)},${l(.5)} ${c(.92)},${l(.9)}" fill="${a}" opacity="${s}"/>`), o.push(`<circle cx="${c(.28)}" cy="${l(.26)}" r="${Wd(Math.max(1, Math.min(n, r) * .1))}" fill="${a}" opacity="${Wd(s + .1)}"/>`), o.join("");
}
function Xd(e, t, n, r, i) {
	let a = !(Array.isArray(i?.images) && i.images.length), o = Math.max(1, n * .03), s = (n - o * 2) / 3, c = [];
	for (let n = 0; n < 3; n++) c.push(Yd(e + n * (s + o), t, s, r, a));
	return c.join("");
}
function Zd(e, t, n, r) {
	let i = Math.max(1, n * .03), a = (n - i * 2) / 3, o = [];
	for (let n = 0; n < 3; n++) {
		let s = e + n * (a + i);
		o.push(Kd(s, t, a, r * .55, Vd("surface", Rd), " rx=\"1.5\"")), o.push(Kd(s, t + r * .62, a * .8, 2, Vd("text", zd), " opacity=\"0.5\" rx=\"1\""));
	}
	return o.join("");
}
function Qd(e, t, n, r, i) {
	let a = Hd(i?.color, Bd), o = i?.kind;
	return o === "circle" ? `<ellipse cx="${Wd(e + n / 2)}" cy="${Wd(t + r / 2)}" rx="${Wd(Math.max(n / 2, 1))}" ry="${Wd(Math.max(r / 2, 1))}" fill="${a}" opacity="0.8"/>` : o === "triangle" ? `<polygon points="${Wd(e)},${Wd(t + r)} ${Wd(e + n / 2)},${Wd(t)} ${Wd(e + n)},${Wd(t + r)}" fill="${a}" opacity="0.8"/>` : o === "line" || o === "arrow" ? Kd(e, t + r / 2 - .75, n, 1.5, a, " opacity=\"0.85\" rx=\"0.75\"") : Kd(e, t, n, r, a, " opacity=\"0.8\" rx=\"1\"");
}
function $d(e, t, n, r, i, a) {
	if (e === "text") return Jd(t, n, r, i, a);
	if (e === "image") return Yd(t, n, r, i, !a?.src);
	if (e === "gallery") return Xd(t, n, r, i, a);
	if (e === "collection") return Zd(t, n, r, i);
	if (e === "faq") {
		let e = Gd(Math.floor(i / 5), 2, 3), a = Math.max(.6, i * .04), o = (i - a * (e - 1)) / e, s = [];
		for (let i = 0; i < e; i += 1) {
			let e = n + i * (o + a);
			s.push(Kd(t, e, r, o, Vd("surface", Rd), " rx=\"1\"")), s.push(Kd(t + r * .06, e + o / 2 - .7, r * .55, 1.4, Vd("text", zd), " opacity=\"0.5\" rx=\"0.7\"")), s.push(`<circle cx="${Wd(t + r * .92)}" cy="${Wd(e + o / 2)}" r="0.9" fill="${Vd("text", zd)}" opacity="0.4"/>`);
		}
		return s.join("");
	}
	if (e === "shape") return Qd(t, n, r, i, a);
	if (e === "button") return Kd(t, n, r, i, Vd("accent", Bd), ` rx="${Wd(Math.min(i / 2, 4))}"`);
	if (e === "icon") {
		let e = Math.max(1.2, Math.min(r, i) / 2);
		return `<circle cx="${Wd(t + r / 2)}" cy="${Wd(n + i / 2)}" r="${Wd(e)}" fill="${Vd("accent", Bd)}" opacity="0.85"/>`;
	}
	if (e === "video") {
		let e = [Kd(t, n, r, i, Vd("surface", Rd), " rx=\"1.5\"")], a = t + r / 2, o = n + i / 2, s = Math.max(1.5, Math.min(r, i) * .22);
		return e.push(`<polygon points="${Wd(a - s / 2)},${Wd(o - s)} ${Wd(a - s / 2)},${Wd(o + s)} ${Wd(a + s)},${Wd(o)}" fill="${Vd("text", zd)}" opacity="0.6"/>`), e.join("");
	}
	if (e === "timeline") {
		let e = [Kd(t + 1, n, 1.4, i, Vd("accent", Bd), " opacity=\"0.7\" rx=\"0.7\"")];
		for (let a = 0; a < 3; a += 1) {
			let o = n + i * (.18 + a * .32);
			e.push(`<circle cx="${Wd(t + 1.7)}" cy="${Wd(o)}" r="1.6" fill="${Vd("accent", Bd)}"/>`), e.push(Kd(t + 5, o - 1, r * .5, 2, Vd("text", zd), " opacity=\"0.5\" rx=\"1\""));
		}
		return e.join("");
	}
	if (e === "quote") return [
		`<text x="${Wd(t + r / 2)}" y="${Wd(n + i * .34)}" text-anchor="middle" font-size="${Wd(Math.min(r, i) * .5)}" font-family="Georgia, serif" fill="${Vd("accent", Bd)}">“</text>`,
		Kd(t + r * .15, n + i * .48, r * .7, 2, Vd("text", zd), " opacity=\"0.6\" rx=\"1\""),
		Kd(t + r * .25, n + i * .62, r * .5, 2, Vd("text", zd), " opacity=\"0.6\" rx=\"1\""),
		Kd(t + r * .35, n + i * .82, r * .3, 1.6, Vd("text", zd), " opacity=\"0.35\" rx=\"0.8\"")
	].join("");
	if (e === "ribbon") return [
		Kd(t, n + i * .3, r, i * .4, Vd("accent", Bd), " opacity=\"0.85\" rx=\"1\""),
		Kd(t + r * .08, n + i * .46, r * .18, 1.8, Vd("bg", Ld), " opacity=\"0.9\" rx=\"0.9\""),
		Kd(t + r * .34, n + i * .46, r * .24, 1.8, Vd("bg", Ld), " opacity=\"0.9\" rx=\"0.9\""),
		Kd(t + r * .66, n + i * .46, r * .2, 1.8, Vd("bg", Ld), " opacity=\"0.9\" rx=\"0.9\"")
	].join("");
	if (e === "stats") return [Kd(t + r * .28, n + i * .15, r * .44, i * .42, Vd("accent", Bd), " opacity=\"0.85\" rx=\"1\""), Kd(t + r * .32, n + i * .72, r * .36, 1.6, Vd("text", zd), " opacity=\"0.4\" rx=\"0.8\"")].join("");
	if (e === "table") {
		let e = Math.max(1.6, i * .22), a = [Kd(t, n, r, e, Vd("accent", Bd), " opacity=\"0.5\" rx=\"0.8\"")], o = Gd(Math.floor((i - e) / 3.2), 1, 3);
		for (let s = 0; s < o; s += 1) a.push(Kd(t, n + e + 1 + s * ((i - e - 1) / o), r, 1, Vd("text", zd), " opacity=\"0.3\""));
		return a.push(Kd(t + r * .33, n, .6, i, Vd("text", zd), " opacity=\"0.2\"")), a.push(Kd(t + r * .66, n, .6, i, Vd("text", zd), " opacity=\"0.2\"")), a.join("");
	}
	if (e === "share") {
		let e = Math.max(1.2, Math.min(i / 2, r / 9)), a = [];
		for (let r = 0; r < 4; r += 1) a.push(`<circle cx="${Wd(t + e + r * (e * 2 + 1.5))}" cy="${Wd(n + i / 2)}" r="${Wd(e)}" fill="${Vd("accent", Bd)}" opacity="0.8"/>`);
		return a.join("");
	}
	if (e === "countdown") {
		let e = Math.max(.8, r * .03), a = (r - e * 3) / 4, o = [];
		for (let r = 0; r < 4; r += 1) {
			let s = t + r * (a + e);
			o.push(Kd(s, n, a, i, Vd("surface", Rd), " rx=\"1\"")), o.push(Kd(s + a * .25, n + i * .2, a * .5, i * .35, Vd("accent", Bd), " opacity=\"0.85\" rx=\"0.8\""));
		}
		return o.join("");
	}
	if (e === "audio") {
		let e = [Kd(t, n, r, i, Vd("surface", Rd), " rx=\"1.5\"")], a = n + i / 2, o = Math.max(1.2, i * .28);
		return e.push(`<polygon points="${Wd(t + r * .06)},${Wd(a - o)} ${Wd(t + r * .06)},${Wd(a + o)} ${Wd(t + r * .06 + o * 1.4)},${Wd(a)}" fill="${Vd("accent", Bd)}" opacity="0.85"/>`), e.push(Kd(t + r * .2, a - .6, r * .7, 1.2, Vd("text", zd), " opacity=\"0.35\" rx=\"0.6\"")), e.join("");
	}
	if (e === "product") {
		let e = Math.max(.8, r * .03), a = (r - e * 2) / 3, o = [];
		for (let r = 0; r < 3; r += 1) {
			let s = t + r * (a + e);
			o.push(Kd(s, n, a, i, Vd("surface", Rd), " rx=\"1\"")), o.push(Kd(s + a * .08, n + i * .06, a * .84, i * .42, Vd("text", zd), " opacity=\"0.15\" rx=\"0.8\"")), o.push(Kd(s + a * .08, n + i * .56, a * .6, 1.4, Vd("text", zd), " opacity=\"0.5\" rx=\"0.7\"")), o.push(Kd(s + a * .08, n + i * .72, a * .35, 1.4, Vd("accent", Bd), " opacity=\"0.85\" rx=\"0.7\"")), o.push(Kd(s + a * .08, n + i * .84, a * .84, i * .1, Vd("accent", Bd), " opacity=\"0.6\" rx=\"1\""));
		}
		return o.join("");
	}
	if (e === "cart") {
		let e = Math.max(1.5, Math.min(r, i) / 2.4), a = t + r / 2, o = n + i / 2;
		return [
			`<circle cx="${Wd(a)}" cy="${Wd(o)}" r="${Wd(e)}" fill="${Vd("surface", Rd)}"/>`,
			Kd(a - e * .5, o - e * .25, e, e * .55, Vd("text", zd), " opacity=\"0.5\" rx=\"0.4\""),
			`<circle cx="${Wd(a + e * .75)}" cy="${Wd(o - e * .75)}" r="${Wd(Math.max(.9, e * .35))}" fill="${Vd("accent", Bd)}"/>`
		].join("");
	}
	return e === "checkout" ? [
		Kd(t, n, r * .7, 1.2, Vd("text", zd), " opacity=\"0.5\" rx=\"0.6\""),
		Kd(t, n + i * .12, r * .5, 1.2, Vd("text", zd), " opacity=\"0.35\" rx=\"0.6\""),
		Kd(t, n + i * .3, r, i * .14, Vd("surface", Rd), " rx=\"1\""),
		Kd(t, n + i * .5, r, i * .14, Vd("surface", Rd), " rx=\"1\""),
		Kd(t, n + i * .78, r * .45, i * .16, Vd("accent", Bd), " opacity=\"0.85\" rx=\"1.2\"")
	].join("") : Kd(t, n, r, i, Vd("surface", Rd), " rx=\"1.5\"");
}
function ef(e, t, n) {
	let r = Array.isArray(e?.blocks) ? e.blocks : [], i = r.map((e) => (e.frames?.desktop?.y ?? 0) + (e.frames?.desktop?.h ?? 0)), a = n / Math.max(Ud(e?.size?.minHeight), i.length ? Math.max(...i) + 16 : 0), o = [Kd(0, 0, t, n, qd(e))];
	for (let r of e?.background?.layers ?? []) {
		if (r.type !== "glow") continue;
		let e = r.props ?? {};
		o.push(`<circle cx="${Wd(Gd(e.x ?? .5, 0, 1) * t)}" cy="${Wd(Gd(e.y ?? .3, 0, 1) * n)}" r="${Wd(t * Gd(e.radius ?? .5, .1, 1) * .5)}" fill="${Hd(e.color, Bd)}" opacity="${Wd(Gd(e.opacity ?? .3, 0, .5))}"/>`);
	}
	for (let r of e?.background?.layers ?? []) {
		if (r.type !== "slideshow") continue;
		let e = r.props ?? {}, i = e.style ?? "floating", a = Vd("surface", Rd);
		if (i === "floating") {
			let r = e.look === "polaroid", s = t * (r ? .17 : .13), c = s / (r ? .84 : 1.35);
			for (let r of jd(e.images, {
				...e,
				seed: e.seed || 1,
				style: i
			})) {
				let e = r.x / 100 * t - s / 2, i = r.y / 100 * n - c / 2, l = ` rx="1" opacity="0.75" transform="rotate(${Wd(r.rot)} ${Wd(e + s / 2)} ${Wd(i + c / 2)})"`;
				o.push(Kd(e, i, s, c, a, l));
			}
		} else if (i === "band") {
			let r = Number(e.rows) === 1 ? 1 : 2, i = n * (r === 1 ? .4 : .3), s = i * 1.33;
			for (let e = 0; e < r; e += 1) {
				let c = r === 1 ? (n - i) / 2 : n * .1 + e * (i + n * .1);
				for (let n = -s * (e * .5); n < t; n += s + 3) o.push(Kd(n, c, s, i, a, " rx=\"1\" opacity=\"0.75\""));
			}
		} else if (i === "mosaic") {
			let r = (t - 10) / 4, i = n / 3.4, s = 0, c = 0;
			for (let t of Pd(e.count, e.seed || 1)) {
				s + t.cols > 4 && (s = 0, c += 1);
				let e = 2 + c * (i + 2);
				if (e > n) break;
				o.push(Kd(2 + s * (r + 2), e, r * t.cols + 2 * (t.cols - 1), i * t.rows + 2 * (t.rows - 1), a, " rx=\"1\" opacity=\"0.75\"")), s += t.cols, s >= 4 && (s = 0, c += 1);
			}
		}
	}
	let s = t * .06, c = t - s * 2;
	for (let e of r) {
		let r = e.frames?.desktop;
		if (!r) continue;
		let i = Gd(s + (r.x ?? 0) * (c / 100), 0, t - 2), l = Gd((r.y ?? 0) * a, 0, n - 2), u = Gd((r.w ?? 10) * (c / 100), 2, t - i), d = Gd((r.h ?? 20) * a, 2, n - l);
		o.push($d(e.type, i, l, u, d, e.props));
	}
	return o.join("");
}
function tf(e, { w: t = 96, h: n = 116, max: r = 6 } = {}) {
	let i = (Array.isArray(e?.sections) ? e.sections : []).slice(0, r);
	if (!i.length) return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${Kd(0, 0, t, n, Vd("bg", Ld))}</svg>`;
	let a = i.map((e) => Gd(Ud(e?.size?.minHeight), 160, 900)), o = a.reduce((e, t) => e + t, 0), s = n - 1 * (i.length - 1), c = [], l = 0;
	for (let e = 0; e < i.length; e += 1) {
		let n = Math.max(6, a[e] / o * s);
		c.push(`<g transform="translate(0 ${Wd(l)})">${ef(i[e], t, n)}</g>`), l += n + 1;
	}
	return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${c.join("")}</svg>`;
}
//#endregion
//#region ../template/assets/engine/0.7.4/page-presets.js
var nf = /* @__PURE__ */ new Map();
wu({ sections: { define: (e, t) => nf.set(e, t) } });
var rf = [
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
function af(e, { pageId: t, title: n }) {
	let r = rf.find((t) => t.id === e);
	return r ? {
		schemaVersion: 6,
		meta: {
			id: t,
			title: n
		},
		sections: r.sections.map((e) => nf.get(e).create())
	} : null;
}
//#endregion
//#region ../template/assets/engine/0.7.4/palette-search.js
function of(e) {
	return String(e ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}
function sf(e, t) {
	let n = of(t).trim(), r = of(e);
	return n ? r.startsWith(n) ? 0 : r.split(/[^a-z0-9]+/).some((e) => e.startsWith(n)) ? 1 : r.includes(n) ? 2 : -1 : 2;
}
function cf(e, t) {
	let n = of(e);
	return of(t).split(/\s+/).filter(Boolean).every((e) => n.includes(e));
}
function lf(e, t, n) {
	return e.map((e, r) => ({
		item: e,
		i: r,
		rank: sf(n(e), t)
	})).filter((e) => e.rank >= 0).sort((e, t) => e.rank - t.rank || e.i - t.i).map((e) => e.item);
}
//#endregion
//#region ../template/assets/engine/0.7.4/theme.js
function uf(e, t, n) {
	return t === "light" || t === "dark" ? t : n ? "dark" : "light";
}
function df(e, t) {
	let n = e.tokens || {}, r = e.scheme === "dark" ? "dark" : "light";
	if (!e.alt?.tokens || t === r) return n;
	let i = {};
	for (let t of /* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(e.alt.tokens)])) i[t] = {
		...n[t],
		...e.alt.tokens[t]
	};
	return i;
}
var ff = /^[a-zA-Z0-9#%.,()'"\s+\-*/]+$/;
function pf(e) {
	return typeof e == "string" && ff.test(e) && !/url\(|\/\*|\*\/|expression/i.test(e);
}
function mf(e) {
	let t = e.tokens || {}, n = df(e, "light"), r = df(e, "dark"), i = e.scheme === "dark" ? "dark" : "light", a = [], o = [], s = [], c = /* @__PURE__ */ new Set([
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
			pf(c) && (a.push(`  --urd-${e}-${l}: ${c};`), i && a.push(`  --urd-base-${l}: ${c};`)), u !== d && (i && pf(u) && pf(d) ? o.push({
				name: l,
				lv: u,
				dv: d
			}) : !i && pf(u) && pf(d) && s.push({
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
	].some((e) => pf(e.color?.["accent-text"])) && pf(t.color?.accent);
	u && pf(t.color?.bg) && (a.push(`  --urd-color-accent-text: ${t.color.bg};`), a.push(`  --urd-base-accent-text: ${t.color.bg};`));
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
function hf(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
var gf = {
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
}, _f = {
	surface: "sectionTheme.surface",
	accent: "sectionTheme.accent",
	inverse: "sectionTheme.inverse",
	soft: "sectionTheme.soft",
	muted: "sectionTheme.muted",
	deep: "sectionTheme.deep",
	highlighted: "sectionTheme.highlighted"
};
[...new Set(Object.values(gf).flatMap(Object.keys))];
function vf(e) {
	return gf[e] ?? {};
}
function yf(e) {
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
function bf(e, t) {
	let n = yf(e), r = yf(t);
	return n == null || r == null ? null : (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/color.js
var xf = {
	version: 1,
	label: "Colour",
	labelKey: "bgLayer.color",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = hf(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, Sf = {
	linear: [
		"pan",
		"pan-loop",
		"rotate"
	],
	radial: ["pulse", "orbit"]
};
function Cf(e) {
	let t = Array.isArray(e) && e.length ? e : [{ color: "#0b0e14" }, { color: "#1a1030" }], n = t.map((e) => Math.max(0, Number(e?.share) || 0)), r = n.reduce((e, t) => e + t, 0), i = r <= 0, a = i ? t.length : r, o = 0;
	return t.map((e, t) => {
		let r = i ? 1 : n[t], s = (o + r / 2) / a * 100;
		return o += r, {
			color: e?.color ?? "#0b0e14",
			at: Math.round(s * 100) / 100
		};
	});
}
function wf(e) {
	let t = (e) => Math.round(e * 100) / 100, n = e[0]?.at ?? 0;
	return [...e.map((e) => ({
		color: e.color,
		at: t(e.at - n)
	})), {
		color: e[0]?.color ?? "#0b0e14",
		at: 100
	}];
}
function Tf(e, t, n, r = .5) {
	let i = n % 360 * Math.PI / 180, a = (e) => Math.round(e * 100) / 100 || 0, o = (Math.abs(e * Math.sin(i)) + Math.abs(t * Math.cos(i))) / (1 - Math.min(Math.max(r, 0), .9));
	return {
		period: a(o),
		dx: a(Math.sin(i) * o),
		dy: a(-Math.cos(i) * o)
	};
}
function Ef(e, t, n) {
	return `repeating-linear-gradient(${t}deg, ${e.map((e) => `${hf(e.color)} ${Math.round(e.at / 100 * n * 100) / 100}px`).join(", ")})`;
}
function Df(e) {
	let t = e.kind === "radial" ? "radial" : "linear", n = (Sf[t] ?? []).includes(e.animation) ? e.animation : null, r = Cf(e.stops), i = r.map((e) => `${hf(e.color)} ${e.at}%`).join(", "), a = {}, o;
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
					stops: wf(r),
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
var Of = /* @__PURE__ */ new Set(), kf = !1;
function Af(e) {
	Of.add(e), !(kf || typeof window > "u") && (kf = !0, window.addEventListener("resize", () => {
		for (let e of [...Of]) e() || Of.delete(e);
	}));
}
var jf = !1;
function Mf() {
	if (!jf) {
		jf = !0;
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
var Nf = {
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
		let n = Df(t);
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
					let e = Tf(r, i, n.loop.angle, n.loop.maxShare);
					t.style.inset = `${-Math.ceil(e.period)}px`, t.style.background = Ef(n.loop.stops, n.loop.angle, e.period), t.style.setProperty("--urd-loop-dx", `${e.dx}px`), t.style.setProperty("--urd-loop-dy", `${e.dy}px`);
				}
				return !0;
			};
			requestAnimationFrame(r), Af(r);
			return;
		}
		if (n.runner) {
			e.classList.add("urd-bg-loop-host");
			let t = document.createElement("div");
			t.className = n.runner.className, t.style.background = n.runner.background, n.runner.left != null && (t.style.left = n.runner.left), n.runner.top != null && (t.style.top = n.runner.top), e.appendChild(t);
			return;
		}
		e.style.background = n.background, n.className && (e.classList.add(n.className), n.className === "urd-bg-rotate" && Mf());
	}
}, Pf = {
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
		let n = hf(t.color), r = t.x ?? .5, i = t.y ?? .3, a = t.radius ?? .5;
		e.style.background = `radial-gradient(circle at ${r * 100}% ${i * 100}%, ${n} 0%, transparent ${a * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, Ff = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", If = {
	version: 1,
	label: "Grain",
	labelKey: "bgLayer.grain",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = Ff, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
}, Lf = [
	"dots",
	"grid",
	"diagonal",
	"checks",
	"waves",
	"zigzag",
	"plus",
	"triangles"
], Rf = {
	min: 8,
	max: 160,
	dflt: 28
}, zf = .12, Bf = {
	dots: "<circle cx=\"12\" cy=\"12\" r=\"3\"/>",
	grid: "<rect width=\"24\" height=\"1.6\"/><rect width=\"1.6\" height=\"24\"/>",
	diagonal: "<path d=\"M-6 6L6 -6M0 24L24 0M18 30L30 18\" fill=\"none\" stroke=\"#000\" stroke-width=\"4\"/>",
	checks: "<rect width=\"12\" height=\"12\"/><rect x=\"12\" y=\"12\" width=\"12\" height=\"12\"/>",
	waves: "<path d=\"M0 12Q6 4 12 12T24 12\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\"/>",
	zigzag: "<path d=\"M0 16L6 8L12 16L18 8L24 16\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\"/>",
	plus: "<path d=\"M12 7V17M7 12H17\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\" stroke-linecap=\"round\"/>",
	triangles: "<path d=\"M0 24L12 4L24 24Z\"/>"
};
function Vf(e) {
	return Lf.includes(e) ? e : "dots";
}
function Hf(e) {
	let t = Number(e);
	return !Number.isFinite(t) || t <= 0 ? Rf.dflt : Math.min(Rf.max, Math.max(Rf.min, Math.round(t)));
}
function Uf(e) {
	let t = Number(e);
	return Number.isFinite(t) ? (Math.round(t) % 360 + 360) % 360 : 0;
}
function Wf(e) {
	let t = Number(e);
	return e == null || e === "" || !Number.isFinite(t) ? zf : Math.min(1, Math.max(0, t));
}
function Gf(e = {}) {
	let t = Hf(e.size), n = Uf(e.rotation), r = Bf[Vf(e.pattern)], i = `<pattern id="p" width="${t}" height="${t}" patternUnits="userSpaceOnUse"${n ? ` patternTransform="rotate(${n})"` : ""}><g transform="scale(${t / 24})">${r}</g></pattern>`, a = "<rect width=\"100%\" height=\"100%\" fill=\"url(#p)\"/>";
	return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><defs>${i}</defs>${e.invert === !0 ? `<mask id="m"><rect width="100%" height="100%" fill="#fff"/>${a}</mask><rect width="100%" height="100%" mask="url(#m)"/>` : a}</svg>`;
}
var Kf = () => typeof CSS < "u" && typeof CSS.supports == "function" && (CSS.supports("mask-image", "none") || CSS.supports("-webkit-mask-image", "none")), qf = {
	version: 1,
	label: "Pattern",
	labelKey: "bgLayer.pattern",
	defaults: () => ({
		pattern: "dots",
		color: "text",
		size: Rf.dflt,
		opacity: zf,
		rotation: 0,
		invert: !1
	}),
	migrations: {},
	render(e, t) {
		if (!Kf()) return;
		let n = `url("data:image/svg+xml,${encodeURIComponent(Gf(t))}")`;
		e.style.backgroundColor = hf(t.color ?? "text"), e.style.opacity = String(Wf(t.opacity));
		for (let t of ["webkitMask", "mask"]) e.style[`${t}Image`] = n, e.style[`${t}Size`] = "100% 100%", e.style[`${t}Repeat`] = "no-repeat";
	}
}, Jf = [
	"wave",
	"tilt",
	"curve",
	"triangle",
	"zigzag"
], Yf = {
	min: 16,
	max: 240,
	dflt: 64
}, Xf = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/api\/photo\?[^\s"'<>\\]{1,2048}|\/(?!\/)[\w%./-]*)$/;
function Zf(e) {
	return typeof e == "string" && Xf.test(e);
}
var Qf = /^(?:https?:\/\/|mailto:|tel:)[^\s]+$/i;
function $f(e) {
	return typeof e == "string" && Qf.test(e.trim());
}
var ep = /^(?:\/(?![/\\])[^\s\\]*|#[^\s]*)$/;
function tp(e) {
	return $f(e) || typeof e == "string" && ep.test(e.trim());
}
var np = [
	"launcher",
	"cart",
	"theme"
];
function rp(e = {}) {
	let t = Array.isArray(e.tools?.order) ? e.tools.order : [], n = [];
	for (let e of t) np.includes(e) && !n.includes(e) && n.push(e);
	for (let e of np) n.includes(e) || n.push(e);
	return n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/image.js
var ip = .4, ap = [
	"none",
	"kenburns",
	"drift"
], op = {
	min: 6,
	max: 60,
	dflt: 20
};
function sp(e) {
	return ap.includes(e) ? e : "none";
}
function cp(e) {
	let { min: t, max: n, dflt: r } = op, i = Number(e);
	return !Number.isFinite(i) || i <= 0 ? r : Math.min(n, Math.max(t, i));
}
function lp(e, t) {
	return `${(e ?? .5) * 100}% ${(t ?? .5) * 100}%`;
}
function up(e, t) {
	return e === "contain" ? "contain" : e === "cover" ? "cover" : `${Math.max(0, t ?? 1) * 100}%`;
}
function dp(e) {
	let t = "-9999px";
	return e === "up" ? `inset(${t} 0 0 0)` : e === "down" ? `inset(0 0 ${t} 0)` : e === "both" ? `inset(${t} 0 ${t} 0)` : "inset(0)";
}
function fp(e, t, n, r = .18) {
	let i = Math.max(0, Math.min(1, n)) * ip * t;
	return Math.round(Math.min(i, r * e));
}
function pp(e, t, n, r, i) {
	let a = e + t / 2, o = (n / 2 - a) * Math.max(0, Math.min(1, r)) * ip, s = i ?? fp(t, n, r);
	return Math.max(-s, Math.min(s, o)) || 0;
}
var mp = /* @__PURE__ */ new Set(), hp = !1, gp = 0;
function _p() {
	gp = 0;
	for (let e of [...mp]) e() || mp.delete(e);
}
function vp() {
	gp ||= requestAnimationFrame(_p);
}
function yp(e) {
	mp.add(e), e(), !(hp || typeof window > "u") && (hp = !0, window.addEventListener("scroll", vp, { passive: !0 }), window.addEventListener("resize", vp, { passive: !0 }));
}
function bp(e, t, n, r) {
	let i = r === "cover" || r === "tile" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement, o = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
	e.style.willChange = "transform";
	let s = (t) => {
		e.style.top = `-${t}px`, e.style.bottom = `-${t}px`;
	}, c = () => {
		if (!e.isConnected) return !1;
		if (o || document.body.classList.contains("urd-mobile")) return s(n), e.style.transform = "", !0;
		let r = (a ?? e).getBoundingClientRect(), c = window.innerHeight || document.documentElement.clientHeight, l = fp(r.height, c, t, i ? .18 : .6);
		s(i ? Math.max(n, l) : n);
		let u = pp(r.top, r.height, c, t, l);
		return e.style.transform = `translateY(${u.toFixed(1)}px)`, !0;
	};
	yp(c), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(c));
}
function xp() {
	return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("animation-timeline", "view()");
}
var Sp = /* @__PURE__ */ new Set(), Cp = !1, wp = 0;
function Tp() {
	wp = 0;
	for (let e of [...Sp]) e() || Sp.delete(e);
}
function Ep() {
	!wp && typeof requestAnimationFrame == "function" && (wp = requestAnimationFrame(Tp));
}
function Dp(e) {
	Sp.add(e), e(), !(Cp || typeof window > "u") && (Cp = !0, window.addEventListener("resize", Ep, { passive: !0 }));
}
function Op(e, t, n, r) {
	let i = r === "cover" || r === "tile" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement;
	e.style.willChange = "transform", e.classList.add("urd-parallax-css");
	let o = () => {
		if (!e.isConnected) return !1;
		let r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || document.body.classList.contains("urd-mobile"), o = (a ?? e).getBoundingClientRect(), s = window.innerHeight || document.documentElement.clientHeight, c = fp(o.height, s, t, i ? .18 : .6), l = i && !r ? Math.max(n, c) : n;
		return e.style.setProperty("--urd-px-shift", `${c}px`), e.style.top = `-${l}px`, e.style.bottom = `-${l}px`, !0;
	};
	Dp(o), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(o));
}
var kp = {
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
		motionSpeed: op.dflt
	}),
	migrations: {
		1: (e) => ({
			...e,
			fit: e.fit === "vanlig" ? "plain" : e.fit === "flislegg" ? "tile" : e.fit === "egen" ? "custom" : e.fit
		}),
		2: (e) => ({
			motion: "none",
			motionSpeed: op.dflt,
			...e
		})
	},
	render(e, t) {
		let n = !Zf(t.src);
		n && e.classList.add("urd-bg-demo");
		let r = n ? sd(0) : t.src;
		e.style.opacity = String(t.opacity ?? 1), e.style.clipPath = dp(t.bleed), e.style.zIndex = t.bleed === "down" || t.bleed === "both" ? "1" : "";
		let i = document.createElement("div");
		i.className = "urd-bg-image", i.style.position = "absolute", i.style.left = "0", i.style.right = "0", i.style.top = "0", i.style.bottom = "0";
		let a = sp(t.motion), o = a === "none" ? i : document.createElement("div");
		o !== i && (o.className = `urd-bg-motion urd-bg-motion-${a}`, o.style.position = "absolute", o.style.left = "0", o.style.right = "0", o.style.top = "0", o.style.bottom = "0", o.style.animationDuration = `${cp(t.motionSpeed)}s`, i.appendChild(o));
		let s = t.fit === "tile" || t.fit === "repeat";
		o.style.backgroundImage = `url("${r}")`, o.style.backgroundSize = up(t.fit, t.size), o.style.backgroundRepeat = s ? "repeat" : "no-repeat", o.style.backgroundPosition = lp(t.x, t.y);
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
		e.appendChild(i), t.parallax > 0 && Ap(i, t.parallax, o === i ? c : 0, t.fit ?? "cover");
	}
};
function Ap(e, t, n, r) {
	xp() ? Op(e, t, n, r) : bp(e, t, n, r);
}
//#endregion
//#region ../template/assets/engine/0.7.4/gallery-model.js
var jp = [
	"grid",
	"carousel",
	"slides",
	"ribbon",
	"mosaic",
	"polaroid"
], Mp = [
	"grid",
	"mosaic",
	"polaroid"
], Np = {
	min: 80,
	max: 400,
	dflt: 140
}, Pp = {
	min: 0,
	max: 15,
	dflt: 4
};
function Fp(e) {
	return jp.includes(e) ? e : "grid";
}
function Ip(e, t, n) {
	return !Number.isFinite(n) || n < 1 ? 0 : (((Number.isFinite(e) ? e : 0) + t) % n + n) % n;
}
function Lp({ count: e = 0, reducedMotion: t = !1 } = {}) {
	return e >= 2 && !t;
}
function Rp(e, { min: t = 2, fallback: n = 5 } = {}) {
	let r = Number(e);
	return !Number.isFinite(r) || r <= 0 ? n : Math.max(t, r);
}
//#endregion
//#region ../template/assets/engine/0.7.4/photo-source.js
var zp = [
	"drive",
	"gphotos",
	"nextcloud",
	"json"
], Bp = {
	min: 1,
	max: 60,
	dflt: 24
}, Vp = [
	"name",
	"newest",
	"random"
], Hp = [
	480,
	800,
	1200,
	1600,
	2e3
], Up = /^[A-Za-z0-9_-]{10,128}$/, Wp = /^(?!\d+(?:\.\d+)*$)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/;
function Gp(e) {
	let t = Number(e);
	return !Number.isFinite(t) || t <= 0 ? Bp.dflt : Math.min(Bp.max, Math.max(Bp.min, Math.round(t)));
}
function Kp(e) {
	let t = typeof e == "string" ? e.trim() : "";
	if (!t) return null;
	if (Up.test(t) && !t.includes(".")) return {
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
		return Up.test(t) ? {
			provider: "drive",
			id: t
		} : null;
	}
	if (r === "photos.google.com") {
		let e = /^\/share\/([A-Za-z0-9_-]{10,256})\/?$/.exec(n.pathname), t = n.searchParams.get("key") ?? "";
		return e ? {
			provider: "gphotos",
			id: e[1],
			...Up.test(t) ? { host: t } : {}
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
	return i && Wp.test(r) ? {
		provider: "nextcloud",
		id: i[1],
		host: r
	} : /\.json$/i.test(n.pathname) && Wp.test(r) ? {
		provider: "json",
		url: n.href
	} : null;
}
function qp(e) {
	return Vp.includes(e) ? e : "name";
}
var Jp = (e) => qp(e) === "newest" ? "newest" : "name";
function Yp(e, t) {
	if (!e || !zp.includes(e.provider)) return null;
	let n = new URLSearchParams({
		p: e.provider,
		sort: Jp(t),
		max: "200"
	});
	return e.id && n.set("id", e.id), e.host && n.set("host", e.host), e.url && n.set("url", e.url), `/api/photos?${n.toString()}`;
}
function Xp(e, t = 200) {
	return (Array.isArray(e?.photos) ? e.photos : []).filter((e) => typeof e?.src == "string" && e.src.startsWith("/api/photo?")).slice(0, Math.max(1, Math.min(200, Number(t) || 200))).map((e) => ({
		src: e.src,
		name: typeof e.name == "string" ? e.name : ""
	}));
}
function Zp(e) {
	let t = e >>> 0;
	return () => {
		t = t + 1831565813 >>> 0;
		let e = t;
		return e = Math.imul(e ^ e >>> 15, e | 1), e ^= e + Math.imul(e ^ e >>> 7, e | 61), ((e ^ e >>> 14) >>> 0) / 4294967296;
	};
}
function Qp(e, t) {
	let n = [...e], r = Zp(Number(t) || 0);
	for (let e = n.length - 1; e > 0; e--) {
		let t = Math.floor(r() * (e + 1));
		[n[e], n[t]] = [n[t], n[e]];
	}
	return n;
}
function $p(e, t, n) {
	return qp(t) === "random" ? Qp(e, n) : [...e];
}
var em = 0;
function tm() {
	return em ||= typeof crypto < "u" && crypto.getRandomValues ? crypto.getRandomValues(/* @__PURE__ */ new Uint32Array(1))[0] || 1 : Date.now() >>> 0 || 1, em;
}
function nm(e, t = 1) {
	let n = (Number(e) || 0) * Math.min(3, Math.max(1, Number(t) || 1));
	return Hp.find((e) => e >= n) ?? Hp[Hp.length - 1];
}
function rm(e, t) {
	if (typeof e != "string" || !e.startsWith("/api/photo?")) return e;
	let n = new URLSearchParams(e.slice(11));
	return n.set("w", String(t)), `/api/photo?${n.toString()}`;
}
var im = 6e5, am = 3e4, om = /* @__PURE__ */ new Map(), sm = /* @__PURE__ */ new Map();
function cm(e) {
	return e?.source === "folder" && typeof e.folder == "string" ? e.folder.trim() : "";
}
function lm(e, t) {
	let n = Yp(Kp(e), t);
	return n ? um(om.get(n)) : null;
}
function um(e) {
	if (!e) return null;
	let t = e.value.photos.length ? im : am;
	return Date.now() - e.at < t ? e.value : null;
}
function dm(e, t, { force: n = !1 } = {}) {
	let r = Yp(Kp(e), t);
	if (!r) return Promise.resolve({
		photos: [],
		error: "badAddress",
		code: "photoFolderUnknown"
	});
	if (!n) {
		let e = um(om.get(r));
		if (e) return Promise.resolve(e);
		if (sm.has(r)) return sm.get(r);
	}
	let i = (async () => {
		let e;
		try {
			let t = await fetch(r), n = await t.json().catch(() => null);
			e = t.ok ? {
				photos: Xp(n),
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
		return om.set(r, {
			at: Date.now(),
			value: e
		}), sm.delete(r), e;
	})();
	return sm.set(r, i), i;
}
function fm(e) {
	let t = cm(e), n = t ? lm(t, e.order) : null;
	return n?.photos.length ? $p(n.photos, e.order, tm()).slice(0, Gp(e.folderMax)) : e.images ?? [];
}
function pm(e, t, n) {
	let r = cm(t);
	r && !lm(r, t.order) && dm(r, t.order).then((r) => {
		e.isConnected && r.photos.length && (e.textContent = "", e.removeAttribute("style"), e.className = "urd-bg-layer", n(e, t));
	}), n(e, t);
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/slideshow.js
var mm = {
	source: "upload",
	folder: "",
	order: "random",
	folderMax: Bp.dflt,
	style: "floating",
	motion: "drift",
	motionSpeed: nd.dflt,
	interval: rd.dflt,
	fade: 1.5,
	count: Ju.dflt,
	seed: 0,
	size: null,
	spread: $u.dflt,
	tilt: ed.dflt,
	radius: td.dflt,
	rows: 2,
	direction: "left",
	underNav: !0,
	underAnnounce: !1,
	repeat: !1,
	shape: "rect",
	look: "shadow",
	tone: "natural",
	frameColor: ""
}, hm = {
	version: 2,
	label: "Image gallery",
	labelKey: "bgLayer.slideshow",
	defaults: () => ({
		images: [],
		fit: "cover",
		opacity: .85,
		blur: 0,
		...mm
	}),
	migrations: { 1: (e) => ({
		...mm,
		style: "fill",
		motion: "none",
		interval: 6,
		opacity: 1,
		...e
	}) },
	render(e, t) {
		pm(e, t, _m);
	}
}, gm = (e, t) => {
	let n = document.createElement(e);
	return n.className = t, n;
};
function _m(e, t) {
	let n = dd(t.style), r = fm(t).filter((e) => Zf(e?.src)), i = yd(t.shape), a = bd(t.look);
	e.classList.add("urd-bg-slideshow", `urd-gallery-${n}`, `urd-gallery-tone-${xd(t.tone)}`), n !== "fill" && e.classList.add(`urd-gallery-shape-${i}`, `urd-gallery-look-${a}`), e.style.setProperty("--urd-frame-radius", `${Dd(t.radius)}px`), r.length || e.classList.add("urd-bg-demo"), e.style.opacity = String(t.opacity ?? .85);
	let o = vd(a, t.frameColor);
	o && e.style.setProperty("--urd-frame-color", hf(o));
	let s = t.underNav === !1 ? ["var(--urd-announce-h, 0px)", "var(--urd-nav-own-h, 0px)"] : t.underAnnounce === !0 ? [] : ["var(--urd-announce-h, 0px)"], c = s.length ? `calc(${s.join(" + ")})` : "", l = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, u = fd(n, t.motion), d = {
		el: e,
		props: t,
		style: n,
		images: r,
		motion: u,
		shape: i,
		look: a,
		aspect: Sd(i, a),
		moves: md({
			style: n,
			motion: u,
			reducedMotion: l
		}),
		reduced: l,
		seed: Ad(t.seed, tm()),
		time: Od(t.motionSpeed),
		dwell: wd(t.interval),
		dpr: window.devicePixelRatio || 1
	};
	Om[n](d), c && (e.style.top = n === "fill" && t.blur > 0 ? `calc(${c} - ${t.blur * 2}px)` : c);
}
function vm(e, t, n, r, i) {
	let a = t[n];
	e.style.backgroundImage = `url("${a ? rm(a.src, r) : sd(i)}")`, e.style.backgroundPosition = a ? lp(a.x, a.y) : "";
}
function ym({ el: e, props: t, images: n, motion: r, reduced: i, dpr: a, dwell: o }) {
	let s = !n.length, c = s ? cd(3) : n, l = nm(window.innerWidth, a);
	t.blur > 0 && (e.style.filter = `blur(${t.blur}px)`, e.style.inset = `-${t.blur * 2}px`);
	let u = Math.max(0, Number(t.fade) || 0);
	e.style.setProperty("--urd-bgg-fade", `${u}s`);
	let d = sp(r === "drift" ? "drift" : r === "kenburns" ? "kenburns" : "none"), f = (e) => {
		let n = gm("div", e ? "urd-bg-slide on" : "urd-bg-slide");
		return d !== "none" && (n.classList.add("urd-bg-motion", `urd-bg-motion-${d}`), n.style.animationDuration = `${cp(t.motionSpeed)}s`), n;
	}, p = (e, n) => {
		e.style.backgroundImage = `url("${s ? n.src : rm(n.src, l)}")`, e.style.backgroundSize = s ? "240px auto" : up(t.fit), e.style.backgroundRepeat = s ? "repeat" : "no-repeat", e.style.backgroundPosition = s ? "" : lp(n.x, n.y);
	}, m = new Image();
	if (m.src = s ? c[0].src : rm(c[0].src, l), !m.complete) {
		e.style.visibility = "hidden";
		let t = () => {
			e.style.visibility = "";
		};
		m.addEventListener("load", t, { once: !0 }), m.addEventListener("error", t, { once: !0 });
	}
	let h = f(!0);
	if (p(h, c[0]), e.appendChild(h), !Lp({
		count: c.length,
		reducedMotion: i
	})) return;
	let g = f(!1);
	e.appendChild(g);
	let _ = 0, v = h, y = Math.max(Rp(o, { fallback: rd.dflt }), u + .5) * 1e3, b = setInterval(() => {
		if (!h.isConnected) {
			clearInterval(b);
			return;
		}
		if (document.hidden) return;
		let e = Ip(_, 1, c.length), t = new Image();
		t.src = s ? c[e].src : rm(c[e].src, l);
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
function bm(e, t, n, r, i) {
	let a = gm("div", "urd-gallery-skin"), o = gm("div", "urd-gallery-face");
	return vm(o, t, n, r, i), a.appendChild(o), e.appendChild(a), {
		skin: a,
		face: o
	};
}
function xm(e, t) {
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
function Sm({ frame: e, skin: t, face: n }, r, i, a) {
	let { motion: o, moves: s, time: c } = a;
	if (!s) return;
	let l = `-${(r.phase * c).toFixed(2)}s`;
	if (o === "drift" || o === "rise") {
		e.classList.add("urd-gallery-travel");
		let t = xm(r, o);
		e.style.setProperty("--tx0", t.tx0), e.style.setProperty("--ty0", t.ty0), e.style.setProperty("--tx1", t.tx1), e.style.setProperty("--ty1", t.ty1), e.style.animationDuration = `${c}s`, e.style.animationDelay = l;
	} else if (o === "kenburns") e.classList.add("urd-gallery-kenburns"), e.style.animationDuration = `${c}s`, e.style.animationDelay = l;
	else if (o === "bounce") {
		e.style.left = "0", e.style.top = "0", e.style.translate = "0 0", e.classList.add("urd-gallery-bounce-x"), t.classList.add("urd-gallery-bounce-y");
		let n = c * (.8 + r.heading * .4), i = c * (.5 + r.phase * .35);
		e.style.animationDuration = `${n.toFixed(2)}s`, e.style.animationDelay = `-${(r.phase * n).toFixed(2)}s`, t.style.animationDuration = `${i.toFixed(2)}s`, t.style.animationDelay = `-${(r.heading * i).toFixed(2)}s`;
	}
}
function Cm(e, t, n) {
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
			a >= 0 && (vm(t.face, r, a, t.width, i), c[i] = a, l[a] = ++u), n && (f += 1, wm(t, n(i, f, e.filter((e) => e !== t))));
		});
	});
}
function wm(e, t) {
	let n = t.w / 2 * 1.15, r = t.w / e.aspect / 2 * 1.15;
	e.frame.style.left = `clamp(${n.toFixed(1)}px, ${t.x}%, calc(100% - ${n.toFixed(1)}px))`, e.frame.style.top = `clamp(${r.toFixed(1)}px, ${t.y}%, calc(100% - ${r.toFixed(1)}px))`, e.frame.style.width = `${t.w}px`, e.frame.style.rotate = `${t.rot}deg`, e.x = t.x, e.y = t.y;
}
function Tm(e) {
	let { el: t, props: n, style: r, images: i, seed: a, aspect: o, dpr: s } = e, c = {
		count: n.count,
		seed: a,
		size: n.size,
		spread: n.spread,
		tilt: n.tilt,
		style: r,
		repeat: n.repeat === !0
	};
	Cm(jd(i, c).map((n, r) => {
		let a = gm("div", "urd-gallery-box urd-gallery-frame" + (n.index < 0 ? " urd-gallery-frame-empty" : ""));
		a.style.aspectRatio = String(o);
		let c = nm(n.w, s), { skin: l, face: u } = bm(a, i, n.index, c, r);
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
		return wm(d, n), Sm(d, n, r, e), d;
	}), e, (e, t, n) => {
		let r = null, o = -1;
		for (let s = 0; s < 6; s += 1) {
			let l = jd(i, {
				...c,
				seed: `${a}:${t * 6 + s}`
			})[e], u = Math.min(999, ...n.map((e) => Math.hypot(e.x - l.x, e.y - l.y)));
			u > o && (o = u, r = l);
		}
		return r;
	});
}
function Em(e) {
	let { el: t, props: n, images: r, moves: i, time: a, aspect: o, dpr: s } = e, c = kd(n.rows), l = gd(n.size, "band");
	t.style.setProperty("--urd-band-h", `${l}px`);
	let u = r.length || 8, d = nm(l * o, s);
	for (let e = 0; e < c; e += 1) {
		let s = gm("div", "urd-gallery-band-row");
		i || s.classList.add("urd-ribbon-still");
		let c = gm("div", "urd-ribbon-track");
		n.direction === "right" != (e === 1) && c.classList.add("urd-ribbon-right"), c.style.setProperty("--urd-ribbon-ms", `${a * 1e3}ms`), e === 1 && (c.style.animationDelay = `-${(a / 3).toFixed(1)}s`);
		let l = (e) => {
			for (let t = 0; t < u; t += 1) {
				let n = gm("div", "urd-gallery-box urd-gallery-band-tile" + (r.length ? "" : " urd-gallery-frame-empty"));
				n.style.aspectRatio = String(o), bm(n, r, r.length ? t : -1, d, t), e.appendChild(n);
			}
		}, f = gm("div", "urd-ribbon-run");
		l(f);
		let p = gm("div", "urd-ribbon-run");
		p.setAttribute("aria-hidden", "true"), l(p), c.append(f, p), s.appendChild(c), t.appendChild(s);
	}
}
function Dm(e) {
	let { el: t, props: n, images: r, seed: i, dpr: a, motion: o, moves: s, time: c } = e, l = Pd(n.count, i, r.length, n.repeat === !0);
	t.style.setProperty("--urd-mosaic-row", `${gd(n.size, "mosaic")}px`);
	let u = nm(gd(n.size, "mosaic") * 2.2, a);
	Cm(l.map((e, n) => {
		let i = gm("div", "urd-gallery-box urd-gallery-tile" + (r.length ? "" : " urd-gallery-frame-empty"));
		i.style.gridColumn = `span ${e.cols}`, i.style.gridRow = `span ${e.rows}`;
		let a = r.length ? n % r.length : -1, { face: l } = bm(i, r, a, u, n);
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
var Om = {
	fill: ym,
	floating: Tm,
	band: Em,
	mosaic: Dm
}, km = /^(?:data:video\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/media\/[\w%./-]+\.(?:mp4|webm))$/i;
function Am(e) {
	return typeof e == "string" && km.test(e);
}
var jm = null;
function Mm(e) {
	jm ??= new IntersectionObserver((e) => {
		for (let t of e) {
			if (!t.target.isConnected) {
				jm.unobserve(t.target);
				continue;
			}
			t.isIntersecting ? t.target.play().catch(() => {}) : t.target.pause();
		}
	}, { threshold: 0 }), jm.observe(e);
}
var Nm = (e, t, n, r) => {
	e.style.position = "absolute", e.style.inset = "0", e.style.width = "100%", e.style.height = "100%", e.style.objectFit = t === "contain" ? "contain" : "cover", e.style.objectPosition = lp(n, r);
}, Pm = {
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
		if (!Am(t.src)) return;
		if (e.style.opacity = String(t.opacity ?? 1), window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
			if (!Zf(t.poster)) return;
			let n = document.createElement("img");
			n.className = "urd-bg-video-poster", n.alt = "", n.setAttribute("aria-hidden", "true"), n.src = t.poster, Nm(n, t.fit, t.x, t.y), e.appendChild(n);
			return;
		}
		let n = document.createElement("video");
		n.className = "urd-bg-video", n.muted = !0, n.setAttribute("muted", ""), n.loop = !0, n.playsInline = !0, n.setAttribute("playsinline", ""), n.preload = "metadata", n.disablePictureInPicture = !0, n.setAttribute("aria-hidden", "true"), Zf(t.poster) && (n.poster = t.poster), n.src = t.src, Nm(n, t.fit, t.x, t.y), e.appendChild(n), Mm(n), t.parallax > 0 && Ap(n, t.parallax, 0, t.fit === "contain" ? "contain" : "cover");
	}
};
//#endregion
//#region ../template/assets/engine/0.7.4/footer-thumb.js
function Fm(e = {}) {
	let t = "#2fd6b6", n = "#5c6b64", r = e.mega ? "#16221d" : "#0e1512", i = e.cols ?? 0, a = e.social ?? 0, o = `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${r}"/>`;
	if (e.mega && (o += `<circle cx="20" cy="6" r="34" fill="${t}" opacity="0.18"/>`), e.bigcta) return o += `<rect x="45" y="18" width="70" height="8" rx="3" fill="${n}" opacity="0.85"/>`, o += `<rect x="56" y="32" width="48" height="4" rx="2" fill="${n}" opacity="0.5"/>`, o += `<rect x="62" y="43" width="36" height="10" rx="3" fill="${t}"/>`, o += Im(n, e.baselineLinks), o + "</svg>";
	if (e.chapters) {
		o += `<rect x="12" y="10" width="20" height="6" rx="2" fill="${t}"/>`, o += `<rect x="12" y="20" width="46" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		let r = i || 3, a = (136 - (r - 1) * 8) / r;
		for (let e = 0; e < r; e++) {
			let r = 12 + e * (a + 8);
			o += `<line x1="${r}" y1="30" x2="${r + a}" y2="30" stroke="${n}" stroke-width="0.8" opacity="0.7"/>`, o += `<rect x="${r}" y="34" width="9" height="6" rx="1.5" fill="${t}"/>`;
			for (let e = 0; e < 3; e++) o += `<rect x="${r}" y="${44 + e * 6}" width="${a * .7}" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		}
		return o += Im(n, e.baselineLinks), o + "</svg>";
	}
	if (e.split) {
		o += `<rect x="8" y="8" width="70" height="52" rx="4" fill="${t}" opacity="0.16"/>`, o += `<rect x="16" y="16" width="20" height="6" rx="2" fill="${t}"/>`, o += `<rect x="16" y="26" width="46" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`, o += `<rect x="16" y="36" width="26" height="9" rx="3" fill="${t}"/>`;
		let r = i || 2;
		for (let e = 0; e < r; e++) {
			let r = 90 + e * 32;
			o += `<rect x="${r}" y="14" width="16" height="3" rx="1.5" fill="${t}" opacity="0.8"/>`;
			for (let e = 0; e < 4; e++) o += `<rect x="${r}" y="${22 + e * 7}" width="22" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		}
		return o += Im(n, e.baselineLinks), o + "</svg>";
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
	return o += Im(n, e.baselineLinks), o + "</svg>";
}
function Im(e, t = 0) {
	let n = `<line x1="8" y1="66" x2="152" y2="66" stroke="${e}" stroke-width="0.6" opacity="0.5"/>`;
	return n += `<rect x="8" y="70" width="40" height="3" rx="1.5" fill="${e}" opacity="0.6"/>`, t && (n += `<g fill="${e}" opacity="0.6">` + Array.from({ length: t }, (e, t) => `<rect x="${120 - t * 16}" y="70" width="12" height="3" rx="1.5"/>`).join("") + "</g>"), n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/animations/core.js
var Lm = () => ({
	duration: 600,
	delay: 0
}), Rm = 90, zm = {
	"fade-in": {
		version: 1,
		label: "Fade in",
		labelKey: "anim.fadeIn",
		entrance: !0,
		defaults: Lm,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Slide up",
		labelKey: "anim.slideUp",
		entrance: !0,
		defaults: Lm,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom in",
		labelKey: "anim.zoomIn",
		entrance: !0,
		defaults: Lm,
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
			step: Rm,
			effect: "slide-up",
			pattern: "sequence"
		}),
		migrations: {}
	}
}, Bm = [
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
function Vm(e) {
	let t = (e) => Math.round(e * 100) / 100, n = Math.max(0, t(100 - e.w)), r = Math.min(n, Math.max(0, t(e.x - e.w / 2))), i = Math.max(0, e.y - e.h / 2), a = e.snap === !1 || e.grid?.snap === !1, o = e.grid?.size || 8;
	return i = a ? Math.round(i) : Math.round(i / o) * o, {
		x: r,
		y: Math.max(0, i)
	};
}
//#endregion
//#region ../template/assets/engine/0.7.4/calendar-format.js
function Hm(e) {
	if (typeof e != "string" || !e.trim()) return !1;
	try {
		return new Intl.DateTimeFormat("en", { timeZone: e.trim() }), !0;
	} catch {
		return !1;
	}
}
//#endregion
//#region ../template/assets/engine/0.7.4/map-links.js
var Um = {
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
}, Wm = Object.keys(Um);
function Gm(e) {
	let t = e?.site?.mapService;
	return Object.hasOwn(Um, t) ? t : "osm";
}
//#endregion
//#region ../template/assets/engine/0.7.4/meeting-links.js
var Km = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/;
function qm(e) {
	let t = Array.isArray(e) ? e : String(e ?? "").split(/[\s,;]+/), n = [];
	for (let e of t) {
		let t = String(e ?? "").trim().toLowerCase();
		if (!t) continue;
		let r = "";
		try {
			r = new URL(/^[a-z][a-z0-9+.-]*:\/\//.test(t) ? t : `https://${t}`).hostname;
		} catch {}
		Km.test(r) && !n.includes(r) && n.push(r);
	}
	return n;
}
//#endregion
//#region src/App.svelte
var Jm = (e, t = f, n = f) => {
	var r = Ih();
	G(r), I((e, t, n) => {
		q(r, "placeholder", e), q(r, "aria-label", t), q(r, "title", n);
	}, [
		() => J("menu.search"),
		() => J("menu.search"),
		() => J("tip.menu.search")
	]), z("keydown", r, (e) => {
		e.key === "Escape" && t()() && (e.stopPropagation(), n()(""));
	}), Mi(r, t(), n()), V(e, r);
}, Ym = /* @__PURE__ */ B("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Xm = /* @__PURE__ */ B("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Zm = /* @__PURE__ */ B("<p> </p>"), Qm = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input type=\"text\" placeholder=\"https://drive.google.com/drive/folders/...\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"60\" class=\"svelte-1n46o8q\"/></label> <button type=\"button\" class=\"ghost action svelte-1n46o8q\"><!> </button> <!>", 1), $m = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), eh = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"6\" max=\"60\" step=\"1\" class=\"svelte-1n46o8q\"/>", 1), th = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), nh = /* @__PURE__ */ B("<button class=\"ghost row-tool svelte-1n46o8q\"></button>"), rh = /* @__PURE__ */ B("<span><span class=\"grad-grip svelte-1n46o8q\"><svg viewBox=\"0 0 16 16\" width=\"14\" height=\"14\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"13\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"13\" r=\"1.4\"></circle></svg></span> <!> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span> <!></span>"), ih = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), ah = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/>", 1), oh = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), sh = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), ch = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), lh = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"180\" step=\"5\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), uh = /* @__PURE__ */ B("<div class=\"sizefill svelte-1n46o8q\"><button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button> <button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button></div> <label class=\"svelte-1n46o8q\"> </label> <div class=\"focalpad svelte-1n46o8q\"><span class=\"focaldot svelte-1n46o8q\"></span></div> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), dh = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), fh = /* @__PURE__ */ B("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> </label> <div class=\"sizestep svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"10\" max=\"400\" class=\"svelte-1n46o8q\"/> <span class=\"sizeunit svelte-1n46o8q\">%</span> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></div> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), ph = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.5\" max=\"90\" step=\"0.5\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/>", 1), mh = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), hh = /* @__PURE__ */ B("<button type=\"button\" class=\"ghost action svelte-1n46o8q\"><!> </button>"), gh = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input type=\"number\" max=\"20\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), _h = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"15\" step=\"1\" class=\"svelte-1n46o8q\"/>", 1), vh = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label>"), yh = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"48\" step=\"1\" class=\"svelte-1n46o8q\"/>", 1), bh = /* @__PURE__ */ B("<!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"60\" max=\"400\" step=\"2\" class=\"svelte-1n46o8q\"/> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!>", 1), xh = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.5\" max=\"90\" step=\"0.5\" class=\"svelte-1n46o8q\"/>", 1), Sh = /* @__PURE__ */ B("<label><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>"), Ch = /* @__PURE__ */ B("<!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), wh = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Th = /* @__PURE__ */ B("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"video/mp4,video/webm\" class=\"svelte-1n46o8q\"/></label> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Eh = /* @__PURE__ */ B("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!></div>"), Dh = /* @__PURE__ */ B("<!> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), Oh = /* @__PURE__ */ B("<input class=\"nav-target svelte-1n46o8q\"/>"), kh = /* @__PURE__ */ B("<div class=\"nav-row nav-sub-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target\"><!></span> <!></div>"), Ah = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"num-stepper svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"1\" max=\"12\" step=\"1\" class=\"svelte-1n46o8q\"/> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></span></label>", 1), jh = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Mh = /* @__PURE__ */ B("<button type=\"button\"></button>"), Nh = /* @__PURE__ */ B("<i class=\"menu-group-dot svelte-1n46o8q\" aria-hidden=\"true\"></i>"), Ph = /* @__PURE__ */ B("<button type=\"button\" class=\"linkish menu-group-reset svelte-1n46o8q\"> </button>"), Fh = /* @__PURE__ */ B("<details class=\"group menu-group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"><!><span class=\"menu-group-title svelte-1n46o8q\"> </span><span class=\"menu-group-value svelte-1n46o8q\"> </span></summary> <div class=\"group-items svelte-1n46o8q\"><!> <!></div></details>"), Ih = /* @__PURE__ */ B("<input type=\"search\" class=\"menu-search svelte-1n46o8q\"/>"), Lh = /* @__PURE__ */ B("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), Rh = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>"), zh = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Bh = /* @__PURE__ */ B("<input class=\"svelte-1n46o8q\"/>"), Vh = /* @__PURE__ */ B("<span class=\"nav-line svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Hh = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Uh = /* @__PURE__ */ B("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><span class=\"cal-ref-swatch svelte-1n46o8q\" aria-hidden=\"true\"></span> <span> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></div>"), Wh = /* @__PURE__ */ B("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input class=\"tb-grow svelte-1n46o8q\" spellcheck=\"false\"/> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"toolbar-row svelte-1n46o8q\"><input class=\"tb-grow svelte-1n46o8q\"/> <!></span> <button type=\"button\" class=\"ghost action svelte-1n46o8q\"> </button></div>"), Gh = /* @__PURE__ */ B("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>"), Kh = /* @__PURE__ */ B("<span class=\"gridmenu-value svelte-1n46o8q\"> </span>"), qh = /* @__PURE__ */ B("<!> <button type=\"button\" class=\"ghost action svelte-1n46o8q\"><!> </button> <span class=\"mini-label svelte-1n46o8q\"> </span> <!> <!> <button type=\"button\" class=\"linkish svelte-1n46o8q\"> </button>", 1), Jh = /* @__PURE__ */ B("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <!></div> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <!></div>", 1), Yh = /* @__PURE__ */ B("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <!>", 1), Xh = /* @__PURE__ */ B("<div class=\"pin-line svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"50\" class=\"svelte-1n46o8q\"/></label> <!></div> <!>", 1), Zh = /* @__PURE__ */ B("<!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0\" max=\"10\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>", 1), Qh = /* @__PURE__ */ B("<!> <!> <!> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <!> <!>", 1), $h = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input placeholder=\"/program\" spellcheck=\"false\" class=\"svelte-1n46o8q\"/></label>"), eg = /* @__PURE__ */ B("<!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <div class=\"pin-line svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <!>", 1), tg = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), ng = /* @__PURE__ */ B("<label class=\"field-stack svelte-1n46o8q\"> <textarea rows=\"3\" class=\"svelte-1n46o8q\"></textarea></label>"), rg = /* @__PURE__ */ B("<!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\"> <input placeholder=\"https://\" spellcheck=\"false\" class=\"svelte-1n46o8q\"/></label>", 1), ig = /* @__PURE__ */ B("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), ag = /* @__PURE__ */ B("<button type=\"button\" class=\"ghost action svelte-1n46o8q\"> </button>"), og = /* @__PURE__ */ B("<!> <!> <!> <!> <!> <!>", 1), sg = /* @__PURE__ */ B("<span class=\"nav-line svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span>"), cg = /* @__PURE__ */ B("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), lg = /* @__PURE__ */ B("<span class=\"nav-line svelte-1n46o8q\"><input class=\"tl-year svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <input class=\"svelte-1n46o8q\"/>", 1), ug = /* @__PURE__ */ B("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), dg = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), fg = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), pg = /* @__PURE__ */ B("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input class=\"field-filled svelte-1n46o8q\"/></label>"), mg = /* @__PURE__ */ B("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-6 svelte-1n46o8q\" role=\"group\"></div></div> <!>", 1), hg = /* @__PURE__ */ B("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></span> <span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), gg = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input type=\"datetime-local\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), _g = /* @__PURE__ */ B("<button class=\"ghost svelte-1n46o8q\"> </button>"), vg = /* @__PURE__ */ B("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"audio/*\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), yg = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <div class=\"pin-line svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!></div> <!>", 1), bg = /* @__PURE__ */ B("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), xg = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), Sg = /* @__PURE__ */ B("<!> <!>", 1), Cg = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> </label> <input class=\"svelte-1n46o8q\"/>", 1), wg = /* @__PURE__ */ B("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"video/mp4,video/webm\" class=\"svelte-1n46o8q\"/></label> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label>", 1), Tg = /* @__PURE__ */ B("<div class=\"pin-line svelte-1n46o8q\"><!> <!></div> <!>", 1), Eg = /* @__PURE__ */ B("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Dg = /* @__PURE__ */ B("<!> <!> <!>", 1), Og = /* @__PURE__ */ B("<input class=\"token-input svelte-1n46o8q\" maxlength=\"4\"/>"), kg = /* @__PURE__ */ B("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\"> </button></span>"), Ag = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <span class=\"toolbar-row svelte-1n46o8q\"><!> <!></span></label> <!>", 1), jg = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Mg = /* @__PURE__ */ B("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost action svelte-1n46o8q\"> </button></span>"), Ng = /* @__PURE__ */ B("<button class=\"ghost action svelte-1n46o8q\"> </button>"), Pg = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Fg = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Ig = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input type=\"email\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"url\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Lg = /* @__PURE__ */ B("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label></div>"), Rg = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), zg = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input type=\"number\" class=\"svelte-1n46o8q\"/></label>"), Bg = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label>"), Vg = /* @__PURE__ */ B("<div class=\"pin-line svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!></div>"), Hg = /* @__PURE__ */ B("<div class=\"pin-line svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div> <!>", 1), Ug = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"24\" class=\"svelte-1n46o8q\"/></label>"), Wg = /* @__PURE__ */ B("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <!></div>"), Gg = /* @__PURE__ */ B("<span class=\"mini-label svelte-1n46o8q\"> </span>"), Kg = /* @__PURE__ */ B("<div class=\"cal-slot svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div>"), qg = /* @__PURE__ */ B("<!> <div class=\"cal-slots svelte-1n46o8q\"></div>", 1), Jg = /* @__PURE__ */ B("<!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" class=\"svelte-1n46o8q\"/></label> <!> <span class=\"toolbar-row svelte-1n46o8q\"><button type=\"button\"><i> </i></button> <button type=\"button\"><u> </u></button> <!></span>", 1), Yg = /* @__PURE__ */ B("<div class=\"pin-line svelte-1n46o8q\"><button type=\"button\" class=\"menu-row cal-design-row svelte-1n46o8q\"><span class=\"menu-group-title svelte-1n46o8q\"> </span><span class=\"menu-group-value svelte-1n46o8q\"> </span></button> <!></div>   <!> <!> <!> <!>", 1), Xg = /* @__PURE__ */ B("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), Zg = /* @__PURE__ */ B("<!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Qg = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), $g = /* @__PURE__ */ B("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!>", 1), e_ = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), t_ = /* @__PURE__ */ B("<!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), n_ = /* @__PURE__ */ B("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0.5\" max=\"10\" step=\"0.5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), r_ = /* @__PURE__ */ B("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"10\" max=\"300\" step=\"5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), i_ = /* @__PURE__ */ B("<button class=\"ghost action svelte-1n46o8q\"> </button> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), a_ = /* @__PURE__ */ B("<!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"2\" max=\"40\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>", 1), o_ = /* @__PURE__ */ B("<div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div>"), s_ = /* @__PURE__ */ B("<div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!> <!></div> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <!> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <!> <!></div> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!> <!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"-10\" max=\"10\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div></div> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"8\" max=\"120\" step=\"2\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div></div> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"swatch-row svelte-1n46o8q\"><!> <div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div></div></div> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), c_ = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), l_ = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"24\" max=\"64\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), u_ = /* @__PURE__ */ B("<div class=\"pin-line svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!></div> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <button type=\"button\" class=\"linkish svelte-1n46o8q\"> </button>", 1), d_ = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), f_ = /* @__PURE__ */ B("<div class=\"pin-line svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <!></div> <div class=\"pin-line svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!></div>", 1), p_ = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), m_ = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), h_ = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), g_ = /* @__PURE__ */ B("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" step=\"10\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <button type=\"button\" class=\"ghost action svelte-1n46o8q\"><!> </button>", 1), __ = /* @__PURE__ */ B("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), v_ = /* @__PURE__ */ B("<!> <!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"10\" max=\"300\" step=\"5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"80\" max=\"400\" step=\"10\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), y_ = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"60\" class=\"svelte-1n46o8q\"/></label>"), b_ = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), x_ = /* @__PURE__ */ B("<div class=\"pin-line svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!></div> <div class=\"pin-line svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <!></div> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), S_ = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"4\" step=\"1\" class=\"svelte-1n46o8q\"/></label>"), C_ = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label>"), w_ = /* @__PURE__ */ B("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input type=\"number\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" class=\"svelte-1n46o8q\"/></label></div>"), T_ = /* @__PURE__ */ B("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" step=\"5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span> <!></div> <!>", 1), E_ = /* @__PURE__ */ B("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" min=\"1\" max=\"100\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), D_ = /* @__PURE__ */ B("<div class=\"pin-line svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!></div> <!>", 1), O_ = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label>", 1), k_ = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label>", 1), A_ = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"400\" class=\"svelte-1n46o8q\"/></label>"), j_ = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!>", 1), M_ = /* @__PURE__ */ B("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), N_ = /* @__PURE__ */ B("<!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), P_ = /* @__PURE__ */ B("<!> <!> <!> <div class=\"pin-line svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div> <!> <!> <!>", 1), F_ = /* @__PURE__ */ B("<button type=\"button\" class=\"menu-quick-open svelte-1n46o8q\"> </button>"), I_ = /* @__PURE__ */ B("<input type=\"number\" class=\"svelte-1n46o8q\"/>"), L_ = /* @__PURE__ */ B("<button type=\"button\"> </button>"), R_ = /* @__PURE__ */ B("<span class=\"seg svelte-1n46o8q\" role=\"group\"></span>"), z_ = /* @__PURE__ */ B("<div class=\"menu-quick-item svelte-1n46o8q\"><span class=\"menu-quick-head svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span><!></span> <!></div>"), B_ = /* @__PURE__ */ B("<button type=\"button\" class=\"linkish menu-quick-reset svelte-1n46o8q\"> </button>"), V_ = /* @__PURE__ */ B("<div class=\"menu-quick svelte-1n46o8q\"><!> <!></div>"), H_ = /* @__PURE__ */ B("<div><section class=\"emenu-col svelte-1n46o8q\"><p class=\"panel-strong emenu-title svelte-1n46o8q\"> </p><!><p class=\"emenu-none svelte-1n46o8q\"> </p></section> <section class=\"emenu-col svelte-1n46o8q\"><p class=\"panel-strong emenu-title svelte-1n46o8q\"> </p><!><p class=\"emenu-none svelte-1n46o8q\"> </p></section> <section class=\"emenu-col svelte-1n46o8q\"><p class=\"panel-strong emenu-title svelte-1n46o8q\"> </p><!><p class=\"emenu-none svelte-1n46o8q\"> </p></section></div>"), U_ = /* @__PURE__ */ B("<div class=\"emenu-cols svelte-1n46o8q\"><section class=\"emenu-col svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p><!></section> <section class=\"emenu-col svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p><!></section> <section class=\"emenu-col svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p><!></section></div>"), W_ = /* @__PURE__ */ B("<div class=\"props-tabs svelte-1n46o8q\"><span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button> <button type=\"button\"> </button></span></div> <!>", 1), G_ = /* @__PURE__ */ B("<button class=\"chrome-restore svelte-1n46o8q\"><!> </button>"), K_ = /* @__PURE__ */ B("<button><!> </button>"), q_ = /* @__PURE__ */ B("<div class=\"tool-pop svelte-1n46o8q\"></div>"), J_ = /* @__PURE__ */ B("<span class=\"toolmenu svelte-1n46o8q\"><button><!><!></button> <!></span>"), Y_ = /* @__PURE__ */ B("<button></button>"), X_ = /* @__PURE__ */ B("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"viewswitch toolgrp svelte-1n46o8q\"></span>", 1), Z_ = /* @__PURE__ */ B("<div class=\"tool-pop svelte-1n46o8q\"><div class=\"tool-pop-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button></div> <button><!> </button></div>"), Q_ = /* @__PURE__ */ B("<span class=\"toolmenu svelte-1n46o8q\"><button><span class=\"zoom-cap svelte-1n46o8q\"> </span><!></button> <!></span>"), $_ = /* @__PURE__ */ B("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"zoomswitch toolgrp svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button> <button></button></span>", 1), ev = /* @__PURE__ */ B("<div class=\"tool-pop svelte-1n46o8q\"><button><!> </button> <button><!> </button></div>"), tv = /* @__PURE__ */ B("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"toolgrp svelte-1n46o8q\"><button></button> <button></button></span>", 1), nv = /* @__PURE__ */ B("<button class=\"ghost page-btn svelte-1n46o8q\"> </button> <span class=\"toolset svelte-1n46o8q\"><!> <!> <!></span>", 1), rv = /* @__PURE__ */ B("<button class=\"badge attention svelte-1n46o8q\"><!> <span class=\"btn-label svelte-1n46o8q\"> </span> <span class=\"badge-mini svelte-1n46o8q\"> </span></button>"), iv = /* @__PURE__ */ B("<button class=\"discard-confirm svelte-1n46o8q\"><!> </button>"), av = /* @__PURE__ */ B("<span class=\"draft-cluster svelte-1n46o8q\"><span class=\"chip draft-chip svelte-1n46o8q\"><span class=\"chip-full svelte-1n46o8q\" aria-hidden=\"true\"> </span> <span class=\"chip-mini svelte-1n46o8q\" aria-hidden=\"true\">!</span></span>  <span class=\"discard-wrap svelte-1n46o8q\"><button><!><span class=\"discard-label svelte-1n46o8q\"> </span></button> <!></span></span>"), ov = /* @__PURE__ */ B("<!> <span class=\"btn-label svelte-1n46o8q\"> </span>", 1), sv = /* @__PURE__ */ B("<span class=\"who svelte-1n46o8q\"><!> </span>"), cv = /* @__PURE__ */ B("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\"> </a>"), lv = /* @__PURE__ */ B("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\"><!> <span class=\"btn-label svelte-1n46o8q\"> </span></a> <button class=\"primary svelte-1n46o8q\"> </button>", 1), uv = /* @__PURE__ */ B("<button> </button>"), dv = /* @__PURE__ */ B("<span class=\"rail-group svelte-1n46o8q\"> </span> <!>", 1), fv = /* @__PURE__ */ B("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" step=\"10\"/> <span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" step=\"10\" placeholder=\"0\"/></div>"), pv = /* @__PURE__ */ B("<p class=\"mini-label svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input type=\"text\" spellcheck=\"false\" class=\"svelte-1n46o8q\"/></label>", 1), mv = /* @__PURE__ */ B("<div class=\"settings-pop svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <p class=\"mini-label svelte-1n46o8q\"> </p> <div class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></div> <!> <!></div>"), hv = /* @__PURE__ */ B("<span class=\"page-path svelte-1n46o8q\">/</span>"), gv = /* @__PURE__ */ B("<input class=\"page-slug svelte-1n46o8q\"/>"), _v = /* @__PURE__ */ B("<span class=\"seo-warn svelte-1n46o8q\"></span>"), vv = /* @__PURE__ */ B("<button class=\"ghost danger svelte-1n46o8q\"><!> </button>"), yv = /* @__PURE__ */ B("<div class=\"page-menu svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"><!> </button> <!></div>"), bv = /* @__PURE__ */ B("<div><input class=\"page-title svelte-1n46o8q\"/> <!> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <span class=\"page-menu-wrap svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <!></span></span></div>"), xv = /* @__PURE__ */ B("<img class=\"site-icon-preview svelte-1n46o8q\"/>"), Sv = /* @__PURE__ */ B("<div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button></div>"), Cv = /* @__PURE__ */ B("<div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button> <button class=\"page-template-del svelte-1n46o8q\"></button></div>"), wv = /* @__PURE__ */ B("<span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-template-grid svelte-1n46o8q\"></div>", 1), Tv = /* @__PURE__ */ B("<div class=\"panel-body svelte-1n46o8q\"><!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <textarea rows=\"2\" class=\"svelte-1n46o8q\"></textarea></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <textarea rows=\"2\" class=\"svelte-1n46o8q\"></textarea></label> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-template-grid svelte-1n46o8q\"><div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button></div> <!></div> <!></div>"), Ev = /* @__PURE__ */ B("<input class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\"/> <button><b> </b></button> <button><i> </i></button></span>", 1), Dv = /* @__PURE__ */ B("<img alt=\"\" class=\"svelte-1n46o8q\"/>"), Ov = /* @__PURE__ */ B("<span class=\"logo-file svelte-1n46o8q\"> </span>"), kv = /* @__PURE__ */ B("<div class=\"logo-pick svelte-1n46o8q\"><span class=\"logo-thumb svelte-1n46o8q\"><!></span> <span class=\"logo-pick-col svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div> <div class=\"ctl-triple svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\"/></div> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\"/></div></div>", 1), Av = /* @__PURE__ */ B("<button type=\"button\"><!><span class=\"svelte-1n46o8q\"> </span></button>"), jv = /* @__PURE__ */ B("<span class=\"toolbar-row svelte-1n46o8q\"><span class=\"mini-label tb-grow svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" placeholder=\"1100\"/></span>"), Mv = /* @__PURE__ */ B("<!> <!> <span class=\"toolbar-row svelte-1n46o8q\"><span class=\"mini-label tb-grow svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></span>", 1), Nv = /* @__PURE__ */ B("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Pv = /* @__PURE__ */ B("<!> <span class=\"toolbar-row svelte-1n46o8q\"><span class=\"mini-label tb-grow svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></span>", 1), Fv = /* @__PURE__ */ B("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div>"), Iv = /* @__PURE__ */ B("<div class=\"ctl-pair svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div></div>"), Lv = /* @__PURE__ */ B("<span class=\"toolbar-row ctl-end svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"1\" max=\"8\"/> <span class=\"mini-label svelte-1n46o8q\"> </span> <!></span>"), Rv = /* @__PURE__ */ B("<div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-5 svelte-1n46o8q\" role=\"group\"></div></div> <!>", 1), zv = /* @__PURE__ */ B("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"30\" max=\"80\" step=\"5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0\" max=\"400\" step=\"10\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0\" max=\"1200\" step=\"20\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <!>", 1), Bv = /* @__PURE__ */ B("<div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), Vv = /* @__PURE__ */ B("<div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div>"), Hv = /* @__PURE__ */ B("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label>"), Uv = /* @__PURE__ */ B("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <!> <!> <!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <!> <input type=\"range\" min=\"0\" max=\"100\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Wv = /* @__PURE__ */ B("<button type=\"button\"><span> </span><span class=\"svelte-1n46o8q\"> </span></button>"), Gv = /* @__PURE__ */ B("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), Kv = /* @__PURE__ */ B("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"text\" class=\"field-filled svelte-1n46o8q\" placeholder=\"https://\"/></label>"), qv = /* @__PURE__ */ B("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"text\" class=\"field-filled svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Jv = /* @__PURE__ */ B("<span class=\"tool-move svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span>"), Yv = /* @__PURE__ */ B("<div class=\"mini-card svelte-1n46o8q\"><span class=\"tool-head svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span><!></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), Xv = /* @__PURE__ */ B("<div class=\"mini-card svelte-1n46o8q\"><span class=\"tool-head svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span><!></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div>"), Zv = /* @__PURE__ */ B("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"text\" class=\"field-filled svelte-1n46o8q\"/></label>"), Qv = /* @__PURE__ */ B("<img alt=\"\"/>"), $v = /* @__PURE__ */ B("<span class=\"lrow-warn svelte-1n46o8q\"></span>"), ey = /* @__PURE__ */ B("<span class=\"lrow-tile-mark svelte-1n46o8q\"><!></span> <span class=\"lrow-tile-name svelte-1n46o8q\"> </span>", 1), ty = /* @__PURE__ */ B("<span class=\"bad-target-note svelte-1n46o8q\"> </span>"), ny = /* @__PURE__ */ B("<div class=\"lrow-body svelte-1n46o8q\"><!> <div class=\"lrow-fields svelte-1n46o8q\"><input class=\"field-filled svelte-1n46o8q\"/> <input/> <!> <span class=\"lrow-actions svelte-1n46o8q\"><!> <button class=\"linkish danger svelte-1n46o8q\"> </button></span></div></div>"), ry = /* @__PURE__ */ B("<div><div class=\"lrow-head svelte-1n46o8q\" role=\"button\" tabindex=\"0\"><span class=\"lrow-mark svelte-1n46o8q\" aria-hidden=\"true\"><!></span> <span class=\"lrow-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\" role=\"none\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"lrow-chev svelte-1n46o8q\" aria-hidden=\"true\"></span></div> <!></div>"), iy = /* @__PURE__ */ B("<div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-3 svelte-1n46o8q\" role=\"group\"></div></div> <!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"1\" max=\"24\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <span class=\"lbtn-pick svelte-1n46o8q\"><!> <span class=\"lbtn-name svelte-1n46o8q\"><!></span></span></div> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), ay = /* @__PURE__ */ B("<details class=\"group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"><span class=\"tool-head svelte-1n46o8q\"> <!></span></summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details>"), oy = /* @__PURE__ */ B("<div aria-hidden=\"true\"><span class=\"nav-grip svelte-1n46o8q\"></span> <div class=\"nav-item-main svelte-1n46o8q\"><span class=\"nav-item-name ghost-name svelte-1n46o8q\"> </span> <span class=\"ghost-target svelte-1n46o8q\"> </span></div></div>"), sy = /* @__PURE__ */ B("<input class=\"nav-item-href svelte-1n46o8q\"/>"), cy = /* @__PURE__ */ B("<span class=\"nav-item-sub svelte-1n46o8q\"></span>"), ly = /* @__PURE__ */ B("<!> <div><span class=\"nav-grip svelte-1n46o8q\" draggable=\"true\"></span> <div class=\"nav-item-main svelte-1n46o8q\"><input class=\"nav-item-name svelte-1n46o8q\"/> <div class=\"nav-item-target svelte-1n46o8q\"><!> <!></div></div> <span class=\"nav-actions svelte-1n46o8q\"><button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button></span> <button class=\"ghost row-tool nav-more svelte-1n46o8q\"></button></div> <!>", 1), uy = /* @__PURE__ */ B("<!> <div><span class=\"nav-grip svelte-1n46o8q\" draggable=\"true\"></span> <div class=\"nav-item-main svelte-1n46o8q\"><input class=\"nav-item-name svelte-1n46o8q\"/> <div class=\"nav-item-target svelte-1n46o8q\"><!> <!></div></div> <!> <span class=\"nav-actions svelte-1n46o8q\"><button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button></span> <button class=\"ghost row-tool nav-more svelte-1n46o8q\"></button></div> <!> <!> <!>", 1), dy = /* @__PURE__ */ B("<div class=\"panel-body svelte-1n46o8q\"><details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <!> <!> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-3 svelte-1n46o8q\" role=\"group\"></div></div> <!> <!> <!> <!> <!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"seg cw-seg svelte-1n46o8q\"></div> <details class=\"sub-inset svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"sub-inset-body svelte-1n46o8q\"><!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div> <!></div></details></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-pair svelte-1n46o8q\"><!> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div></div> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label></div> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <!></div> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label></div> <!> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <!></div> <!> <!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-5 svelte-1n46o8q\" role=\"group\"></div></div> <!> <div class=\"swatch-row svelte-1n46o8q\"><!> <div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div></div> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!></div></details></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!>  <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div role=\"group\"></div></div> <!> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"4\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"nav-list svelte-1n46o8q\" role=\"list\"></div> <button class=\"ghost action svelte-1n46o8q\"> </button> <span class=\"toolbar-row svelte-1n46o8q\"><input class=\"tb-grow svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button></span></div></details></div>"), fy = /* @__PURE__ */ B("<p class=\"panel-hint place-error svelte-1n46o8q\"> </p>"), py = /* @__PURE__ */ B("<span class=\"site-cal-color svelte-1n46o8q\"><!> <span> </span></span>"), my = /* @__PURE__ */ B("<div><button type=\"button\" class=\"site-cal-head svelte-1n46o8q\"><span class=\"site-cal-dot svelte-1n46o8q\" aria-hidden=\"true\"></span> <span class=\"site-cal-text svelte-1n46o8q\"><span class=\"site-cal-name svelte-1n46o8q\"> </span> <span class=\"site-cal-addr svelte-1n46o8q\"> </span></span> <span class=\"site-cal-chev svelte-1n46o8q\" aria-hidden=\"true\"></span></button> <div class=\"site-cal-body svelte-1n46o8q\"><div class=\"site-cal-clip svelte-1n46o8q\"><div class=\"site-cal-fields svelte-1n46o8q\"><span class=\"mini-label site-cal-section svelte-1n46o8q\"> </span> <label class=\"site-cal-field svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"site-cal-field svelte-1n46o8q\"> <input spellcheck=\"false\" class=\"svelte-1n46o8q\"/></label> <label class=\"site-cal-field svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <span class=\"mini-label site-cal-section svelte-1n46o8q\"> </span> <div class=\"site-cal-colors svelte-1n46o8q\"><span class=\"site-cal-color svelte-1n46o8q\"><!> <span> </span></span> <!></div> <span class=\"mini-label site-cal-section svelte-1n46o8q\"> </span> <label class=\"site-cal-field svelte-1n46o8q\"> <input placeholder=\"https://\" spellcheck=\"false\" class=\"svelte-1n46o8q\"/></label> <label class=\"site-cal-field svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <div class=\"site-cal-foot svelte-1n46o8q\"><span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <button type=\"button\" class=\"site-cal-remove svelte-1n46o8q\"> </button></div></div></div></div></div>"), hy = /* @__PURE__ */ B("<div class=\"site-cal-list svelte-1n46o8q\"></div>"), gy = /* @__PURE__ */ B("<div class=\"cw-row svelte-1n46o8q\"><span class=\"mini-label cw-screen svelte-1n46o8q\"> </span> <span><span class=\"cw-fill svelte-1n46o8q\"></span></span> <span class=\"gridmenu-value cw-margin svelte-1n46o8q\"> </span></div>"), _y = /* @__PURE__ */ B("<div class=\"mini-label cw-binds svelte-1n46o8q\"> </div>"), vy = /* @__PURE__ */ B("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), yy = /* @__PURE__ */ B("<button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), by = /* @__PURE__ */ B("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input placeholder=\"Europe/Oslo\" spellcheck=\"false\"/></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input placeholder=\"meet.example.org\" spellcheck=\"false\" class=\"svelte-1n46o8q\"/></label> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button type=\"button\" class=\"site-cal-add svelte-1n46o8q\"><!> </button> <!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"sample cw-sample svelte-1n46o8q\"><!> <div class=\"cw-legend svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!></div> <div class=\"seg cw-seg svelte-1n46o8q\"></div> <!> <p class=\"mini-label svelte-1n46o8q\"> </p> <div class=\"seg cw-seg svelte-1n46o8q\"></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div>"), xy = /* @__PURE__ */ B("<div class=\"mini-label tpv-cap svelte-1n46o8q\"> </div>"), Sy = /* @__PURE__ */ B("<div class=\"theme-pvw svelte-1n46o8q\"><!> <div class=\"tpv-demo svelte-1n46o8q\"><div class=\"tpv-h svelte-1n46o8q\"> </div> <div class=\"tpv-card svelte-1n46o8q\"> </div> <div class=\"tpv-row svelte-1n46o8q\"><span class=\"tpv-btn svelte-1n46o8q\"> </span><span class=\"tpv-lnk svelte-1n46o8q\"> </span></div></div></div>"), Cy = /* @__PURE__ */ B("<button type=\"button\"><span class=\"tp-band svelte-1n46o8q\"><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i></span> <small class=\"svelte-1n46o8q\"> </small></button>"), wy = /* @__PURE__ */ B("<div class=\"ctl-row autorow svelte-1n46o8q\"><span class=\"autolbl svelte-1n46o8q\"> </span> <span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div>"), Ty = /* @__PURE__ */ B("<div class=\"palcol svelte-1n46o8q\"><!> <span class=\"palcap svelte-1n46o8q\"> </span> <b class=\"palhex svelte-1n46o8q\"> </b></div>"), Ey = /* @__PURE__ */ B("<div class=\"ctl-row palhead svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <button type=\"button\"> </button></div> <div></div>", 1), Dy = /* @__PURE__ */ B("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"theme-presets svelte-1n46o8q\"></div> <p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <div class=\"ctl-row palhead svelte-1n46o8q\"><!> <button type=\"button\"> </button></div> <div class=\"palcells svelte-1n46o8q\"></div> <!> <div class=\"ctl-row palauto-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <button type=\"button\"> </button></div> <div class=\"theme-previews svelte-1n46o8q\"><!> <!></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <div class=\"sample typo-sample svelte-1n46o8q\"><div class=\"ts-h svelte-1n46o8q\"> </div> <div class=\"ts-b svelte-1n46o8q\"> </div></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"sample form-prev svelte-1n46o8q\"><span class=\"fp-btn svelte-1n46o8q\"> </span> <span class=\"fp-card svelte-1n46o8q\"> </span></div> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"24\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"40\" step=\"1\" class=\"svelte-1n46o8q\"/></div></details></div>"), Oy = /* @__PURE__ */ B("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label>"), ky = /* @__PURE__ */ B("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label>"), Ay = /* @__PURE__ */ B("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), jy = /* @__PURE__ */ B("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <!> <!>", 1), My = /* @__PURE__ */ B("<div><input type=\"text\" class=\"svelte-1n46o8q\"/> <!></div>"), Ny = /* @__PURE__ */ B("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), Py = /* @__PURE__ */ B("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <!>", 1), Fy = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Iy = /* @__PURE__ */ B("<button><span class=\"rs-sample svelte-1n46o8q\"><i class=\"rs-line svelte-1n46o8q\"></i> <i class=\"rs-chip svelte-1n46o8q\"></i> <i class=\"rs-dot svelte-1n46o8q\"></i></span> <span class=\"rs-name svelte-1n46o8q\"> </span></button>"), Ly = /* @__PURE__ */ B("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" step=\"4\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Ry = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"1000\" step=\"10\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), zy = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <!>", 1), By = /* @__PURE__ */ B("<p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"token-input svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"rs-grid svelte-1n46o8q\"></div> <label class=\"svelte-1n46o8q\"> <span class=\"row-tools svelte-1n46o8q\"><span class=\"gridmenu-value svelte-1n46o8q\"> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Vy = /* @__PURE__ */ B("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), Hy = /* @__PURE__ */ B("<button class=\"footer-tp svelte-1n46o8q\"><span class=\"footer-tp-thumb svelte-1n46o8q\"></span> <span class=\"footer-tp-name svelte-1n46o8q\"> </span></button>"), Uy = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"16\" max=\"160\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Wy = /* @__PURE__ */ B("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!>", 1), Gy = /* @__PURE__ */ B("<div class=\"nav-row nav-sub-row\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target\"><!></span> <!></div>"), Ky = /* @__PURE__ */ B("<div class=\"nav-row\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></div> <!>", 1), qy = /* @__PURE__ */ B("<div class=\"nav-row\"><span class=\"nav-line svelte-1n46o8q\"><span class=\"footer-soc-preview svelte-1n46o8q\" aria-hidden=\"true\"></span> <!></span> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <input class=\"nav-target svelte-1n46o8q\"/></div>"), Jy = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), Yy = /* @__PURE__ */ B("<div class=\"panel-body svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"footer-tpick svelte-1n46o8q\"></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"svelte-1n46o8q\"> <!></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details></div>"), Xy = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input type=\"date\" class=\"svelte-1n46o8q\"/></label>"), Zy = /* @__PURE__ */ B("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), Qy = /* @__PURE__ */ B("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/>"), $y = /* @__PURE__ */ B("<span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span>"), eb = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" step=\"0.01\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" step=\"0.01\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), tb = /* @__PURE__ */ B("<details class=\"group collection-entry svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <textarea rows=\"3\" class=\"svelte-1n46o8q\"></textarea> <!> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!></div></details>"), nb = /* @__PURE__ */ B("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\".csv,text/csv\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), rb = /* @__PURE__ */ B("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button></div>"), ib = /* @__PURE__ */ B("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), ab = /* @__PURE__ */ B("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), ob = /* @__PURE__ */ B("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <!></div>"), sb = /* @__PURE__ */ B("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span></div>"), cb = /* @__PURE__ */ B("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), lb = /* @__PURE__ */ B("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <!>", 1), ub = /* @__PURE__ */ B("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <!> <!></div>"), db = /* @__PURE__ */ B("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), fb = /* @__PURE__ */ B("<button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), pb = /* @__PURE__ */ B("<p class=\"panel-hint svelte-1n46o8q\"> </p> <button class=\"ghost svelte-1n46o8q\"> </button>", 1), mb = /* @__PURE__ */ B("<span class=\"update-arrow svelte-1n46o8q\"></span> <span class=\"badge svelte-1n46o8q\"> </span>", 1), hb = /* @__PURE__ */ B("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><p class=\"update-notes svelte-1n46o8q\"> </p></div></details>"), gb = /* @__PURE__ */ B("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"><span class=\"update-warn svelte-1n46o8q\"></span> </summary> <div class=\"group-items svelte-1n46o8q\"><pre class=\"update-headers svelte-1n46o8q\"> </pre></div></details>"), _b = /* @__PURE__ */ B("<span class=\"chip svelte-1n46o8q\"> </span>"), vb = /* @__PURE__ */ B("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <span class=\"update-warn svelte-1n46o8q\"></span></span></div>"), yb = /* @__PURE__ */ B("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <!></div>"), bb = /* @__PURE__ */ B("<span class=\"update-warn svelte-1n46o8q\"></span>"), xb = /* @__PURE__ */ B("<div class=\"update-row svelte-1n46o8q\"><span> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <!> <input type=\"checkbox\" class=\"svelte-1n46o8q\"/></span></div>"), Sb = /* @__PURE__ */ B("<div class=\"ctl-row update-opt-head svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!>", 1), Cb = /* @__PURE__ */ B("<p class=\"update-summary svelte-1n46o8q\"> </p> <!> <!> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details> <!> <button class=\"primary update-run svelte-1n46o8q\"> </button>", 1), wb = /* @__PURE__ */ B("<div class=\"update-versions svelte-1n46o8q\"><span class=\"update-from svelte-1n46o8q\"> </span> <!></div> <!>", 1), Tb = /* @__PURE__ */ B("<aside><div class=\"panel-head svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></div> <!></aside>"), Eb = /* @__PURE__ */ B("<div class=\"workspace svelte-1n46o8q\"><nav><!> <span class=\"rail-settings svelte-1n46o8q\"><span class=\"rail-brand svelte-1n46o8q\" title=\"Urd\"><svg class=\"brand-mark svelte-1n46o8q\" viewBox=\"10.3 8.3 19.4 25.4\" aria-hidden=\"true\"><path d=\"M12 32V10l16 6.5V32\" fill=\"none\" stroke=\"var(--urd-brand)\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg> <span class=\"brand-word svelte-1n46o8q\">Urd</span></span> <button></button> <!></span></nav> <!> <div><div class=\"stage svelte-1n46o8q\"><iframe class=\"svelte-1n46o8q\"></iframe></div></div></div>"), Db = /* @__PURE__ */ B("<p class=\"loading svelte-1n46o8q\"> </p>"), Ob = /* @__PURE__ */ B("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), kb = /* @__PURE__ */ B("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), Ab = /* @__PURE__ */ B("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <p class=\"panel-hint svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <p class=\"panel-hint svelte-1n46o8q\"> </p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), jb = /* @__PURE__ */ B("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\">×</button></div>"), Mb = /* @__PURE__ */ B("<div><header class=\"block-menu-head svelte-1n46o8q\"><span class=\"block-menu-title svelte-1n46o8q\"> </span> <!> <button class=\"ghost row-tool menu-width svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></header> <div class=\"panel-body block-menu-body svelte-1n46o8q\"><!></div></div>"), Nb = /* @__PURE__ */ B("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><!> <!></span> <span class=\"topbar-group topbar-draft svelte-1n46o8q\"><!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!> <!> <!></div>      <!>", 1);
function Pb(e, t) {
	$e(t, !0);
	let n = (e, t = f, n = f, r = f) => {
		var i = Lr(), a = N(i), o = (e) => {
			var i = Xm(), a = N(i), o = M(a), s = F(o);
			T(a), Qr(F(a, 2), 17, () => r().props.images ?? [], Jr, (e, i, a) => {
				var o = Ym(), s = N(o), c = M(s), l = F(c, 2), u = M(l);
				u.disabled = a === 0, W(u, () => C.up, !0), T(u);
				var d = F(u, 2);
				W(d, () => C.down, !0), T(d);
				var f = F(d, 2);
				W(f, () => C.cross, !0), T(f), T(l), T(s);
				var p = F(s, 2), m = M(p), h = P(F(m));
				T(p);
				var g = F(p, 2);
				G(g);
				var _ = F(g, 2), v = M(_), y = P(F(v));
				T(_);
				var b = F(_, 2);
				G(b), I((e, t, n, o, s) => {
					q(c, "src", R(i).src), d.disabled = a === r().props.images.length - 1, q(f, "title", e), H(m, `${t ?? ""} `), H(h, `${n ?? ""}%`), K(g, R(i).x ?? .5), H(v, `${o ?? ""} `), H(y, `${s ?? ""}%`), K(b, R(i).y ?? .5);
				}, [
					() => J("tip.removeImage"),
					() => J("lbl.focusX"),
					() => Math.round((R(i).x ?? .5) * 100),
					() => J("lbl.focusY"),
					() => Math.round((R(i).y ?? .5) * 100)
				]), z("click", u, () => Ga(t(), n(), a, -1)), z("click", d, () => Ga(t(), n(), a, 1)), z("click", f, () => Ka(t(), n(), a)), z("input", g, (e) => qa(t(), n(), a, "x", Number(e.target.value))), z("input", b, (e) => qa(t(), n(), a, "y", Number(e.target.value))), V(e, o);
			}), I((e, t) => {
				q(a, "title", e), H(o, `${t ?? ""} `);
			}, [() => J("tip.bg.addImages"), () => J("ui.addImages")]), z("change", s, (e) => Wa(t(), n(), e)), V(e, i);
		};
		U(a, (e) => {
			(r().props.source ?? "upload") !== "folder" && e(o);
		}), V(e, i);
	}, r = (e, t = f, n = f, r = f) => {
		let i = /* @__PURE__ */ O(() => Qu(r()));
		var a = $m(), o = N(a), s = M(o), c = F(s);
		{
			let e = /* @__PURE__ */ O(() => R(i).source ?? "upload"), r = /* @__PURE__ */ O(() => [["upload", J("opt.photoSource.upload")], ["folder", J("opt.photoSource.folder")]]);
			Y(c, {
				get value() {
					return R(e);
				},
				get options() {
					return R(r);
				},
				onchange: (e) => oa(t(), n(), "source", e)
			});
		}
		T(o);
		var l = F(o, 2), u = (e) => {
			let a = /* @__PURE__ */ O(() => Kp(R(i).folder ?? "")), o = /* @__PURE__ */ O(() => !R(a) || R(a).provider === "drive" || R(a).provider === "nextcloud");
			var s = Qm(), c = N(s), l = M(c), u = F(l);
			G(u);
			let d;
			T(c);
			var f = F(c, 2), p = M(f), m = F(p);
			{
				let e = /* @__PURE__ */ O(() => R(o) || R(i).order === "random" ? R(i).order ?? "name" : "name"), r = /* @__PURE__ */ O(() => R(o) ? [
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
					onchange: (e) => oa(t(), n(), "order", e)
				});
			}
			T(f);
			var h = F(f, 2), g = M(h), _ = F(g);
			G(_), T(h);
			var v = F(h, 2), y = M(v);
			W(y, () => C.eye);
			var b = F(y);
			T(v);
			var x = F(v, 2), S = (e) => {
				var r = Zm();
				let i;
				var a = P(r, !0);
				I((e, t) => {
					i = xi(r, 1, "folder-status svelte-1n46o8q", null, i, { err: e }), H(a, t);
				}, [() => Ba[Va(t(), n())].err, () => Ba[Va(t(), n())].text]), V(e, r);
			}, ee = /* @__PURE__ */ O(() => Ba[Va(t(), n())]);
			U(x, (e) => {
				R(ee) && e(S);
			}), I((e, t, n, r, o, s, m, y) => {
				q(c, "title", e), H(l, `${t ?? ""} `), K(u, R(i).folder ?? ""), d = xi(u, 1, "svelte-1n46o8q", null, d, { "bad-target": n }), q(f, "title", r), H(p, `${o ?? ""} `), q(h, "title", s), H(g, `${m ?? ""} `), K(_, R(i).folderMax ?? 24), v.disabled = !R(a), H(b, ` ${y ?? ""}`);
			}, [
				() => J("tip.bg.photoFolder"),
				() => J("lbl.photoFolder"),
				() => (R(i).folder ?? "").trim() && !R(a),
				() => J("tip.bg.folderOrder"),
				() => J("lbl.folderOrder"),
				() => J("tip.bg.folderMax"),
				() => J("lbl.folderMax"),
				() => J("ui.checkFolder")
			]), z("change", u, (e) => oa(t(), n(), "folder", e.target.value.trim())), z("change", _, (e) => oa(t(), n(), "folderMax", Number(e.target.value))), z("click", v, () => Ua(t(), n(), r())), V(e, s);
		};
		U(l, (e) => {
			(R(i).source ?? "upload") === "folder" && e(u);
		}), I((e, t) => {
			q(o, "title", e), H(s, `${t ?? ""} `);
		}, [() => J("tip.bg.photoSource"), () => J("lbl.photoSource")]), V(e, a);
	}, i = (e, t = f, n = f, r = f) => {
		var i = $m(), a = N(i), o = M(a), s = F(o);
		{
			let e = /* @__PURE__ */ O(() => r().props.motion ?? "none"), i = /* @__PURE__ */ O(() => [
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
				onchange: (e) => oa(t(), n(), "motion", e)
			});
		}
		T(a);
		var c = F(a, 2), l = (e) => {
			var i = eh(), a = N(i), o = M(a), s = P(F(o));
			T(a);
			var c = F(a, 2);
			G(c), I((e) => {
				H(o, `${e ?? ""} `), H(s, `${r().props.motionSpeed ?? 20 ?? ""} s`), K(c, r().props.motionSpeed ?? 20);
			}, [() => J("lbl.motionSpeed")]), z("input", c, (e) => oa(t(), n(), "motionSpeed", Number(e.target.value))), V(e, i);
		};
		U(c, (e) => {
			(r().props.motion ?? "none") !== "none" && e(l);
		}), I((e, t) => {
			q(a, "title", e), H(o, `${t ?? ""} `);
		}, [() => J("tip.bg.imageMotion"), () => J("lbl.motion")]), V(e, i);
	}, a = (e, t = f, a = f) => {
		var o = Dh(), s = N(o);
		Qr(s, 17, a, Jr, (e, o, s) => {
			var c = Eh(), l = M(c), u = M(l);
			{
				let e = /* @__PURE__ */ O(() => J("tip.bg.changeType")), n = /* @__PURE__ */ O(() => ie.map(([e, t]) => [e, t.labelKey ? J(t.labelKey) : t.label]));
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
					onchange: (e) => Ea(t(), s, e)
				});
			}
			var d = F(u, 2), f = M(d);
			f.disabled = s === 0, W(f, () => C.up, !0), T(f);
			var p = F(f, 2);
			W(p, () => C.down, !0), T(p);
			var m = F(p, 2);
			W(m, () => C.cross, !0), T(m), T(d), T(l);
			var h = F(l, 2), g = (e) => {
				var n = th(), r = N(n), i = M(r), a = F(i);
				{
					let e = /* @__PURE__ */ O(co), n = /* @__PURE__ */ O(() => J("tip.bg.layerColor"));
					Na(a, {
						get value() {
							return R(o).props.value;
						},
						get tokens() {
							return R(e);
						},
						get label() {
							return R(n);
						},
						onchange: (e) => oa(t(), s, "value", e)
					});
				}
				T(r);
				var c = F(r, 2), l = M(c), u = P(F(l));
				T(c);
				var d = F(c, 2);
				G(d), I((e, t, n) => {
					H(i, `${e ?? ""} `), H(l, `${t ?? ""} `), H(u, `${n ?? ""}%`), K(d, R(o).props.opacity ?? 1);
				}, [
					() => J("lbl.color"),
					() => J("lbl.strength"),
					() => Math.round((R(o).props.opacity ?? 1) * 100)
				]), z("input", d, (e) => oa(t(), s, "opacity", Number(e.target.value))), V(e, n);
			}, _ = (e) => {
				let n = /* @__PURE__ */ O(() => pa(R(o))), r = /* @__PURE__ */ O(() => R(n).stops.reduce((e, t) => e + Math.max(0, Number(t.share) || 0), 0));
				var i = oh(), a = N(i), c = M(a), l = F(c);
				{
					let e = /* @__PURE__ */ O(() => R(n).kind ?? "linear"), r = /* @__PURE__ */ O(() => [["linear", J("opt.grad.linear")], ["radial", J("opt.grad.radial")]]);
					Y(l, {
						get value() {
							return R(e);
						},
						get options() {
							return R(r);
						},
						onchange: (e) => ya(t(), s, e)
					});
				}
				T(a);
				var u = F(a, 2);
				Qr(u, 17, () => R(n).stops, Jr, (e, i, a) => {
					var o = rh();
					let c;
					var l = M(o), u = F(l, 2);
					{
						let e = /* @__PURE__ */ O(co), n = /* @__PURE__ */ O(() => J("tip.bg.stopColor"));
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
							onchange: (e) => ba(t(), s, a, { color: e })
						});
					}
					var d = F(u, 2);
					G(d);
					var f = F(d, 2), p = P(f), m = F(f, 2), h = (e) => {
						var n = nh();
						W(n, () => C.cross, !0), T(n), I((e) => q(n, "title", e), [() => J("tip.bg.removeStop")]), z("click", n, () => Sa(t(), s, a)), V(e, n);
					};
					U(m, (e) => {
						R(n).stops.length > 2 && e(h);
					}), T(o), I((e, t, r) => {
						c = xi(o, 1, "nav-line grad-stop svelte-1n46o8q", null, c, {
							dragging: R(wa)?.layer === s && R(wa).from === a,
							"drop-above": R(wa)?.layer === s && R(wa).insert === a,
							"drop-below": R(wa)?.layer === s && R(wa).insert === R(n).stops.length && a === R(n).stops.length - 1
						}), q(l, "title", e), K(d, R(i).share ?? 50), q(d, "title", t), H(p, `${r ?? ""}%`);
					}, [
						() => J("tip.bg.dragStop"),
						() => J("tip.bg.stopShare"),
						() => R(r) > 0 ? Math.round(Math.max(0, Number(R(i).share) || 0) / R(r) * 100) : Math.round(100 / R(n).stops.length)
					]), z("pointerdown", l, (e) => Ta(t(), e, s, a)), z("input", d, (e) => ba(t(), s, a, { share: Number(e.target.value) })), V(e, o);
				});
				var d = F(u, 2), f = P(d, !0), p = F(d, 2), m = (e) => {
					var r = ih(), i = N(r), a = M(i), o = P(F(a));
					T(i);
					var c = F(i, 2);
					G(c);
					var l = F(c, 2), u = M(l), d = P(F(u));
					T(l);
					var f = F(l, 2);
					G(f), I((e, t, r, i) => {
						H(a, `${e ?? ""} `), H(o, `${t ?? ""}%`), K(c, R(n).x ?? .5), H(u, `${r ?? ""} `), H(d, `${i ?? ""}%`), K(f, R(n).y ?? .5);
					}, [
						() => J("lbl.centerX"),
						() => Math.round((R(n).x ?? .5) * 100),
						() => J("lbl.centerY"),
						() => Math.round((R(n).y ?? .5) * 100)
					]), z("input", c, (e) => _a(t(), s, "x", Number(e.target.value))), z("input", f, (e) => _a(t(), s, "y", Number(e.target.value))), V(e, r);
				}, h = (e) => {
					var r = ah(), i = N(r), a = M(i), o = P(F(a));
					T(i);
					var c = F(i, 2);
					G(c), I((e) => {
						H(a, `${e ?? ""} `), H(o, `${R(n).angle ?? ""}°`), K(c, R(n).angle);
					}, [() => J("lbl.angle")]), z("input", c, (e) => _a(t(), s, "angle", Number(e.target.value))), V(e, r);
				};
				U(p, (e) => {
					(R(n).kind ?? "linear") === "radial" ? e(m) : e(h, -1);
				});
				var g = F(p, 2), _ = M(g), v = P(F(_));
				T(g);
				var y = F(g, 2);
				G(y);
				var b = F(y, 2), x = M(b), S = F(x);
				{
					let e = /* @__PURE__ */ O(() => R(n).animation ?? "none");
					Y(S, {
						get value() {
							return R(e);
						},
						get options() {
							return va[(R(n).kind ?? "linear") === "radial" ? "radial" : "linear"];
						},
						onchange: (e) => _a(t(), s, "animation", e)
					});
				}
				T(b), I((e, t, r, i, a, o, s) => {
					H(c, `${e ?? ""} `), q(d, "title", t), H(f, r), H(_, `${i ?? ""} `), H(v, `${a ?? ""}%`), K(y, R(n).opacity ?? 1), q(b, "title", o), H(x, `${s ?? ""} `);
				}, [
					() => J("blocks.shape"),
					() => J("tip.bg.addStop"),
					() => J("ui.addStop"),
					() => J("lbl.strength"),
					() => Math.round((R(n).opacity ?? 1) * 100),
					() => J("tip.bg.motion"),
					() => J("lbl.motion")
				]), z("click", d, () => xa(t(), s)), z("input", y, (e) => _a(t(), s, "opacity", Number(e.target.value))), V(e, i);
			}, v = (e) => {
				var n = sh(), r = N(n), i = M(r), a = F(i);
				{
					let e = /* @__PURE__ */ O(co), n = /* @__PURE__ */ O(() => J("tip.bg.glowColor"));
					Na(a, {
						get value() {
							return R(o).props.color;
						},
						get tokens() {
							return R(e);
						},
						get label() {
							return R(n);
						},
						onchange: (e) => oa(t(), s, "color", e)
					});
				}
				T(r);
				var c = F(r, 2), l = M(c), u = P(F(l));
				T(c);
				var d = F(c, 2);
				G(d);
				var f = F(d, 2), p = M(f), m = P(F(p));
				T(f);
				var h = F(f, 2);
				G(h);
				var g = F(h, 2), _ = M(g), v = P(F(_));
				T(g);
				var y = F(g, 2);
				G(y);
				var b = F(y, 2), x = M(b), S = P(F(x));
				T(b);
				var ee = F(b, 2);
				G(ee), I((e, t, n, r, a, s, c, f, g) => {
					H(i, `${e ?? ""} `), H(l, `${t ?? ""} `), H(u, `${n ?? ""}%`), K(d, R(o).props.x), H(p, `${r ?? ""} `), H(m, `${a ?? ""}%`), K(h, R(o).props.y), H(_, `${s ?? ""} `), H(v, `${c ?? ""}%`), K(y, R(o).props.radius), H(x, `${f ?? ""} `), H(S, `${g ?? ""}%`), K(ee, R(o).props.opacity);
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
				]), z("input", d, (e) => oa(t(), s, "x", Number(e.target.value))), z("input", h, (e) => oa(t(), s, "y", Number(e.target.value))), z("input", y, (e) => oa(t(), s, "radius", Number(e.target.value))), z("input", ee, (e) => oa(t(), s, "opacity", Number(e.target.value))), V(e, n);
			}, y = (e) => {
				var n = ch(), r = N(n), i = M(r), a = P(F(i));
				T(r);
				var c = F(r, 2);
				G(c), I((e, t) => {
					H(i, `${e ?? ""} `), H(a, `${t ?? ""}%`), K(c, R(o).props.opacity);
				}, [() => J("lbl.strength"), () => Math.round(R(o).props.opacity * 100)]), z("input", c, (e) => oa(t(), s, "opacity", Number(e.target.value))), V(e, n);
			}, b = (e) => {
				var n = lh(), r = N(n), i = M(r), a = F(i);
				{
					let e = /* @__PURE__ */ O(() => Vf(R(o).props.pattern)), n = /* @__PURE__ */ O(() => Lf.map((e) => [e, J(`opt.bgPattern.${e}`)]));
					Y(a, {
						get value() {
							return R(e);
						},
						get options() {
							return R(n);
						},
						onchange: (e) => oa(t(), s, "pattern", e)
					});
				}
				T(r);
				var c = F(r, 2), l = M(c), u = F(l);
				{
					let e = /* @__PURE__ */ O(() => R(o).props.color ?? "text"), n = /* @__PURE__ */ O(co), r = /* @__PURE__ */ O(() => J("lbl.color"));
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
						onchange: (e) => oa(t(), s, "color", e)
					});
				}
				T(c);
				var d = F(c, 2), f = M(d), p = P(F(f));
				T(d);
				var m = F(d, 2);
				G(m);
				var h = F(m, 2), g = M(h), _ = P(F(g));
				T(h);
				var v = F(h, 2);
				G(v);
				var y = F(v, 2), b = M(y), x = P(F(b));
				T(y);
				var S = F(y, 2);
				G(S);
				var ee = F(S, 2), te = M(ee);
				G(te);
				var ne = F(te);
				T(ee), I((e, t, n, r, a, s, c, u) => {
					H(i, `${e ?? ""} `), H(l, `${t ?? ""} `), H(f, `${n ?? ""} `), H(p, `${R(o).props.size ?? Rf.dflt ?? ""} px`), q(m, "min", Rf.min), q(m, "max", Rf.max), K(m, R(o).props.size ?? Rf.dflt), H(g, `${r ?? ""} `), H(_, `${a ?? ""}%`), K(v, R(o).props.opacity ?? .12), H(b, `${s ?? ""} `), H(x, `${R(o).props.rotation ?? 0 ?? ""}°`), K(S, R(o).props.rotation ?? 0), q(ee, "title", c), Oi(te, R(o).props.invert === !0), H(ne, ` ${u ?? ""}`);
				}, [
					() => J("lbl.bgPattern"),
					() => J("lbl.color"),
					() => J("lbl.size"),
					() => J("lbl.strength"),
					() => Math.round((R(o).props.opacity ?? .12) * 100),
					() => J("lbl.patternRotation"),
					() => J("tip.bg.patternInvert"),
					() => J("lbl.patternInvert")
				]), z("input", m, (e) => oa(t(), s, "size", Number(e.target.value))), z("input", v, (e) => oa(t(), s, "opacity", Number(e.target.value))), z("input", S, (e) => oa(t(), s, "rotation", Number(e.target.value))), z("change", te, (e) => oa(t(), s, "invert", e.target.checked)), V(e, n);
			}, x = (e) => {
				let n = /* @__PURE__ */ O(() => R(o).props.fit === "tile" || R(o).props.fit === "repeat");
				var r = fh(), a = N(r), c = M(a), l = F(c);
				T(a);
				var u = F(a, 2), d = M(u), f = F(d);
				{
					let e = /* @__PURE__ */ O(() => R(n) ? "tile" : "plain"), r = /* @__PURE__ */ O(() => [["plain", J("opt.img.plain")], ["tile", J("opt.img.tile")]]);
					Y(f, {
						get value() {
							return R(e);
						},
						get options() {
							return R(r);
						},
						onchange: (e) => oa(t(), s, "fit", e)
					});
				}
				T(u);
				var p = F(u, 2), m = P(p, !0), h = F(p, 2), g = M(h), _ = F(g, 2);
				G(_);
				var v = F(_, 4);
				T(h);
				var y = F(h, 2), b = (e) => {
					var n = uh(), r = N(n), i = M(r), a = P(i, !0), c = F(i, 2), l = P(c, !0);
					T(r);
					var u = F(r, 2), d = P(u, !0), f = F(u, 2), p = F(f, 2), m = M(p), h = P(F(m));
					T(p);
					var g = F(p, 2);
					G(g);
					var _ = F(g, 2), v = M(_), y = P(F(v));
					T(_);
					var b = F(_, 2);
					G(b), I((e, t, n, r, s, p, _, x, S, ee, te, ne) => {
						q(i, "title", e), H(a, t), q(c, "title", n), H(l, r), q(u, "title", s), H(d, p), Ci(f, `--fx:${_ ?? ""}%; --fy:${x ?? ""}%`), H(m, `${S ?? ""} `), H(h, `${ee ?? ""}%`), K(g, R(o).props.x ?? .5), H(v, `${te ?? ""} `), H(y, `${ne ?? ""}%`), K(b, R(o).props.y ?? .5);
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
					]), z("click", i, () => fa(t(), s, R(o), "cover")), z("click", c, () => fa(t(), s, R(o), "contain")), z("pointerdown", f, (e) => sa(e, t(), s, "xy")), z("input", g, (e) => oa(t(), s, "x", Number(e.target.value))), z("input", b, (e) => oa(t(), s, "y", Number(e.target.value))), V(e, n);
				};
				U(y, (e) => {
					R(n) || e(b);
				});
				var x = F(y, 2), S = M(x), ee = P(F(S));
				T(x);
				var te = F(x, 2);
				G(te);
				var ne = F(te, 2), re = M(ne), ie = P(F(re));
				T(ne);
				var ae = F(ne, 2);
				G(ae);
				var C = F(ae, 2);
				i(C, t, () => s, () => R(o));
				var oe = F(C, 2), se = M(oe);
				G(se);
				var ce = F(se);
				T(oe);
				var le = F(oe, 2), ue = (e) => {
					var n = dh(), r = N(n), i = M(r), a = P(F(i));
					T(r);
					var c = F(r, 2);
					G(c);
					var l = F(c, 2), u = M(l), d = F(u);
					{
						let e = /* @__PURE__ */ O(() => R(o).props.bleed ?? "none"), n = /* @__PURE__ */ O(() => [
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
							onchange: (e) => oa(t(), s, "bleed", e)
						});
					}
					T(l), I((e, t, n, r) => {
						H(i, `${e ?? ""} `), H(a, `${t ?? ""}%`), K(c, R(o).props.parallax ?? .3), q(l, "title", n), H(u, `${r ?? ""} `);
					}, [
						() => J("lbl.parallaxStrength"),
						() => Math.round((R(o).props.parallax ?? 0) * 100),
						() => J("tip.bg.bleed"),
						() => J("lbl.bleed")
					]), z("input", c, (e) => oa(t(), s, "parallax", Number(e.target.value))), V(e, n);
				};
				U(le, (e) => {
					(R(o).props.parallax ?? 0) > 0 && e(ue);
				}), I((e, t, n, r, i, s, l, f, h, y, b, x, ne, C) => {
					q(a, "title", e), H(c, `${t ?? ""} `), q(u, "title", n), H(d, `${r ?? ""} `), q(p, "title", i), H(m, s), q(g, "title", l), K(_, f), q(v, "title", h), H(S, `${y ?? ""} `), H(ee, `${R(o).props.blur ?? 0 ?? ""} px`), K(te, R(o).props.blur ?? 0), H(re, `${b ?? ""} `), H(ie, `${x ?? ""}%`), K(ae, R(o).props.opacity ?? 1), q(oe, "title", ne), Oi(se, (R(o).props.parallax ?? 0) > 0), H(ce, ` ${C ?? ""}`);
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
				]), z("change", l, (e) => Fa(t(), s, e)), z("click", g, () => la(t(), s, R(o).props.size ?? 1, -.05)), z("change", _, (e) => ua(t(), s, e.target.value)), z("click", v, () => la(t(), s, R(o).props.size ?? 1, .05)), z("input", te, (e) => oa(t(), s, "blur", Number(e.target.value))), z("input", ae, (e) => oa(t(), s, "opacity", Number(e.target.value))), z("change", se, (e) => oa(t(), s, "parallax", e.target.checked ? .3 : 0)), V(e, r);
			}, S = (e) => {
				let i = /* @__PURE__ */ O(() => Qu(R(o))), a = /* @__PURE__ */ O(() => R(i).style ?? "floating"), c = /* @__PURE__ */ O(() => fd(R(a), R(i).motion)), l = /* @__PURE__ */ O(() => (R(i).seed ?? 0) > 0);
				var u = Ch(), d = N(u);
				r(d, t, () => s, () => R(o));
				var f = F(d, 2);
				n(f, t, () => s, () => R(o));
				var p = F(f, 2), m = M(p), h = F(m);
				{
					let e = /* @__PURE__ */ O(() => Vu.map((e) => [e, J(`opt.galleryStyle.${e}`)]));
					Y(h, {
						get value() {
							return R(a);
						},
						get options() {
							return R(e);
						},
						onchange: (e) => oa(t(), s, "style", e)
					});
				}
				T(p);
				var g = F(p, 2), _ = (e) => {
					var n = ph(), r = N(n), a = M(r), o = F(a);
					{
						let e = /* @__PURE__ */ O(() => R(i).fit ?? "cover"), n = /* @__PURE__ */ O(() => [["cover", J("opt.fit.cover")], ["contain", J("opt.fit.contain")]]);
						Y(o, {
							get value() {
								return R(e);
							},
							get options() {
								return R(n);
							},
							onchange: (e) => oa(t(), s, "fit", e)
						});
					}
					T(r);
					var c = F(r, 2), l = M(c), u = P(F(l));
					T(c);
					var d = F(c, 2);
					G(d);
					var f = F(d, 2), p = M(f), m = P(F(p));
					T(f);
					var h = F(f, 2);
					G(h);
					var g = F(h, 2), _ = M(g), v = P(F(_));
					T(g);
					var y = F(g, 2);
					G(y), I((e, t, n, r, o) => {
						H(a, `${e ?? ""} `), H(l, `${t ?? ""} `), H(u, `${R(i).interval ?? 12 ?? ""} s`), K(d, R(i).interval ?? 12), H(p, `${n ?? ""} `), H(m, `${r ?? ""} s`), K(h, R(i).fade ?? 1.5), H(_, `${o ?? ""} `), H(v, `${R(i).blur ?? 0 ?? ""} px`), K(y, R(i).blur ?? 0);
					}, [
						() => J("lbl.imageFit"),
						() => J("lbl.secondsPerImage"),
						() => J("lbl.transition"),
						() => (R(i).fade ?? 1.5).toFixed(1),
						() => J("lbl.blur")
					]), z("input", d, (e) => oa(t(), s, "interval", Number(e.target.value))), z("input", h, (e) => oa(t(), s, "fade", Number(e.target.value))), z("input", y, (e) => oa(t(), s, "blur", Number(e.target.value))), V(e, n);
				}, v = (e) => {
					var n = bh(), r = N(n), o = (e) => {
						var n = mh(), r = N(n), a = M(r), o = F(a);
						{
							let e = /* @__PURE__ */ O(() => String(R(i).rows ?? 2));
							Y(o, {
								get value() {
									return R(e);
								},
								options: [["1", "1"], ["2", "2"]],
								onchange: (e) => oa(t(), s, "rows", Number(e))
							});
						}
						T(r);
						var c = F(r, 2), l = M(c), u = F(l);
						{
							let e = /* @__PURE__ */ O(() => R(i).direction ?? "left"), n = /* @__PURE__ */ O(() => [["left", J("opt.ribbonDir.left")], ["right", J("opt.ribbonDir.right")]]);
							Y(u, {
								get value() {
									return R(e);
								},
								get options() {
									return R(n);
								},
								onchange: (e) => oa(t(), s, "direction", e)
							});
						}
						T(c), I((e, t) => {
							H(a, `${e ?? ""} `), H(l, `${t ?? ""} `);
						}, [() => J("lbl.galleryRows"), () => J("lbl.photoDirection")]), V(e, n);
					}, c = (e) => {
						var n = gh(), r = N(n), o = M(r), c = F(o);
						G(c), T(r);
						var u = F(r, 2), d = M(u), f = F(d);
						{
							let e = /* @__PURE__ */ O(() => R(i).repeat === !0 ? "repeat" : "once"), n = /* @__PURE__ */ O(() => [["once", J("opt.galleryRepeat.once")], ["repeat", J("opt.galleryRepeat.repeat")]]);
							Y(f, {
								get value() {
									return R(e);
								},
								get options() {
									return R(n);
								},
								onchange: (e) => oa(t(), s, "repeat", e === "repeat")
							});
						}
						T(u);
						var p = F(u, 2), m = M(p), h = F(m);
						{
							let e = /* @__PURE__ */ O(() => R(l) ? "fixed" : "random"), n = /* @__PURE__ */ O(() => [["random", J("opt.galleryPlace.random")], ["fixed", J("opt.galleryPlace.fixed")]]);
							Y(h, {
								get value() {
									return R(e);
								},
								get options() {
									return R(n);
								},
								onchange: (e) => oa(t(), s, "seed", e === "fixed" ? Ha() : 0)
							});
						}
						T(p);
						var g = F(p, 2), _ = (e) => {
							var n = hh(), r = M(n);
							W(r, () => C.shuffle);
							var i = F(r);
							T(n), I((e, t) => {
								q(n, "title", e), H(i, ` ${t ?? ""}`);
							}, [() => J("tip.bg.photoSeed"), () => J("ui.shufflePhotos")]), z("click", n, () => oa(t(), s, "seed", Ha())), V(e, n);
						};
						U(g, (e) => {
							R(l) && e(_);
						}), I((e, t, n, s, l, f) => {
							q(r, "title", e), H(o, `${t ?? ""} `), q(c, "min", R(a) === "mosaic" ? 4 : 1), K(c, R(i).count ?? (R(a) === "mosaic" ? 12 : 8)), q(u, "title", n), H(d, `${s ?? ""} `), q(p, "title", l), H(m, `${f ?? ""} `);
						}, [
							() => J("tip.bg.photoCount"),
							() => J("lbl.photoCount"),
							() => J("tip.bg.galleryRepeat"),
							() => J("lbl.galleryRepeat"),
							() => J("tip.bg.galleryPlace"),
							() => J("lbl.galleryPlace")
						]), z("change", c, (e) => oa(t(), s, "count", Number(e.target.value))), V(e, n);
					};
					U(r, (e) => {
						R(a) === "band" ? e(o) : e(c, -1);
					});
					var u = F(r, 2), d = M(u), f = P(F(d));
					T(u);
					var p = F(u, 2);
					G(p);
					var m = F(p, 2), h = (e) => {
						var n = _h(), r = N(n), a = M(r), o = P(F(a));
						T(r);
						var c = F(r, 2);
						G(c);
						var l = F(c, 2), u = M(l), d = P(F(u));
						T(l);
						var f = F(l, 2);
						G(f), I((e, t, n, s) => {
							q(r, "title", e), H(a, `${t ?? ""} `), H(o, `${n ?? ""}%`), K(c, R(i).spread ?? .85), H(u, `${s ?? ""} `), H(d, `${R(i).tilt ?? 5 ?? ""}°`), K(f, R(i).tilt ?? 5);
						}, [
							() => J("tip.bg.photoSpread"),
							() => J("lbl.photoSpread"),
							() => Math.round((R(i).spread ?? .85) * 100),
							() => J("lbl.photoTilt")
						]), z("input", c, (e) => oa(t(), s, "spread", Number(e.target.value))), z("input", f, (e) => oa(t(), s, "tilt", Number(e.target.value))), V(e, n);
					};
					U(m, (e) => {
						R(a) === "floating" && e(h);
					});
					var g = F(m, 2), _ = M(g), v = F(_);
					{
						let e = /* @__PURE__ */ O(() => R(i).shape ?? "rect"), n = /* @__PURE__ */ O(() => Hu.map((e) => [e, J(`opt.galleryShape.${e}`)]));
						Y(v, {
							get value() {
								return R(e);
							},
							get options() {
								return R(n);
							},
							onchange: (e) => oa(t(), s, "shape", e)
						});
					}
					T(g);
					var y = F(g, 2), b = M(y), x = F(b);
					{
						let e = /* @__PURE__ */ O(() => R(i).look ?? "shadow"), n = /* @__PURE__ */ O(() => Uu.map((e) => [e, J(`opt.galleryLook.${e}`)]));
						Y(x, {
							get value() {
								return R(e);
							},
							get options() {
								return R(n);
							},
							onchange: (e) => oa(t(), s, "look", e)
						});
					}
					T(y);
					var S = F(y, 2), ee = (e) => {
						var n = vh(), r = M(n), a = F(r);
						{
							let e = /* @__PURE__ */ O(() => vd(R(i).look, R(i).frameColor)), n = /* @__PURE__ */ O(co), r = /* @__PURE__ */ O(() => J("tip.bg.frameColor"));
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
								onchange: (e) => oa(t(), s, "frameColor", e ?? "")
							});
						}
						T(n), I((e) => H(r, `${e ?? ""} `), [() => J("lbl.frameColor")]), V(e, n);
					}, te = /* @__PURE__ */ O(() => _d(R(i).look));
					U(S, (e) => {
						R(te) && e(ee);
					});
					var ne = F(S, 2), re = (e) => {
						var n = yh(), r = N(n), a = M(r), o = P(F(a));
						T(r);
						var c = F(r, 2);
						G(c), I((e) => {
							H(a, `${e ?? ""} `), H(o, `${R(i).radius ?? 5 ?? ""} px`), K(c, R(i).radius ?? 5);
						}, [() => J("lbl.rounding")]), z("input", c, (e) => oa(t(), s, "radius", Number(e.target.value))), V(e, n);
					}, ie = /* @__PURE__ */ O(() => Cd(R(i).shape) && (R(i).look ?? "shadow") !== "polaroid");
					U(ne, (e) => {
						R(ie) && e(re);
					}), I((e, t, n, r, i, a, o) => {
						H(d, `${e ?? ""} `), H(f, `${t ?? ""} px`), K(p, n), q(g, "title", r), H(_, `${i ?? ""} `), q(y, "title", a), H(b, `${o ?? ""} `);
					}, [
						() => J("lbl.size"),
						() => gd(R(i).size, R(a)),
						() => gd(R(i).size, R(a)),
						() => J("tip.bg.galleryShape"),
						() => J("lbl.galleryShape"),
						() => J("tip.bg.galleryLook"),
						() => J("lbl.galleryLook")
					]), z("input", p, (e) => oa(t(), s, "size", Number(e.target.value))), V(e, n);
				};
				U(g, (e) => {
					R(a) === "fill" ? e(_) : e(v, -1);
				});
				var y = F(g, 2), b = M(y), x = F(b);
				{
					let e = /* @__PURE__ */ O(() => R(i).tone ?? "natural"), n = /* @__PURE__ */ O(() => Wu.map((e) => [e, J(`opt.galleryTone.${e}`)]));
					Y(x, {
						get value() {
							return R(e);
						},
						get options() {
							return R(n);
						},
						onchange: (e) => oa(t(), s, "tone", e)
					});
				}
				T(y);
				var S = F(y, 2), ee = (e) => {
					var n = vh(), r = M(n), i = F(r);
					{
						let e = /* @__PURE__ */ O(() => pd(R(a)).map((e) => [e, J(e === "none" ? "common.none" : `opt.galleryMotion.${e}`)]));
						Y(i, {
							get value() {
								return R(c);
							},
							get options() {
								return R(e);
							},
							onchange: (e) => oa(t(), s, "motion", e)
						});
					}
					T(n), I((e, t) => {
						q(n, "title", e), H(r, `${t ?? ""} `);
					}, [() => J("tip.bg.photoMotion"), () => J("lbl.motion")]), V(e, n);
				}, te = /* @__PURE__ */ O(() => pd(R(a)).length > 1);
				U(S, (e) => {
					R(te) && e(ee);
				});
				var ne = F(S, 2), re = (e) => {
					var n = xh(), r = N(n), a = M(r), o = P(F(a));
					T(r);
					var c = F(r, 2);
					G(c), I((e) => {
						H(a, `${e ?? ""} `), H(o, `${R(i).interval ?? 12 ?? ""} s`), K(c, R(i).interval ?? 12);
					}, [() => J("lbl.secondsPerImage")]), z("input", c, (e) => oa(t(), s, "interval", Number(e.target.value))), V(e, n);
				}, ie = (e) => {
					var n = xh(), r = N(n), a = M(r), o = P(F(a));
					T(r);
					var c = F(r, 2);
					G(c), I((e) => {
						H(a, `${e ?? ""} `), H(o, `${R(i).motionSpeed ?? 30 ?? ""} s`), K(c, R(i).motionSpeed ?? 30);
					}, [() => J("lbl.motionSpeed")]), z("input", c, (e) => oa(t(), s, "motionSpeed", Number(e.target.value))), V(e, n);
				};
				U(ne, (e) => {
					R(c) === "crossfade" && R(a) !== "fill" ? e(re) : (R(c) !== "none" || R(a) === "band") && e(ie, 1);
				});
				var ae = F(ne, 2), oe = M(ae);
				G(oe);
				var se = F(oe);
				T(ae);
				var ce = F(ae, 2), le = (e) => {
					var n = Sh();
					let r;
					var a = M(n);
					G(a);
					var o = F(a);
					T(n), I((e, t) => {
						r = xi(n, 1, "gridmenu-snap svelte-1n46o8q", null, r, { muted: R(i).underNav === !1 }), q(n, "title", e), Oi(a, R(i).underAnnounce === !0), a.disabled = R(i).underNav === !1, H(o, ` ${t ?? ""}`);
					}, [() => J("tip.bg.underAnnounce"), () => J("lbl.underAnnounce")]), z("change", a, (e) => e.target.checked ? aa(t(), s, {
						underAnnounce: !0,
						underNav: !0
					}) : oa(t(), s, "underAnnounce", !1)), V(e, n);
				};
				U(ce, (e) => {
					R(D).nav?.announcement?.text && e(le);
				});
				var ue = F(ce, 2), de = M(ue), fe = P(F(de));
				T(ue);
				var pe = F(ue, 2);
				G(pe), I((e, t, n, r, a, o, s, c) => {
					q(p, "title", e), H(m, `${t ?? ""} `), q(y, "title", n), H(b, `${r ?? ""} `), q(ae, "title", a), Oi(oe, R(i).underNav !== !1), H(se, ` ${o ?? ""}`), H(de, `${s ?? ""} `), H(fe, `${c ?? ""}%`), K(pe, R(i).opacity ?? .85);
				}, [
					() => J("tip.bg.galleryStyle"),
					() => J("lbl.galleryStyle"),
					() => J("tip.bg.galleryTone"),
					() => J("lbl.galleryTone"),
					() => J("tip.bg.underNav"),
					() => J("lbl.underNav"),
					() => J("lbl.strength"),
					() => Math.round((R(i).opacity ?? .85) * 100)
				]), z("change", oe, (e) => e.target.checked ? oa(t(), s, "underNav", !0) : aa(t(), s, {
					underNav: !1,
					underAnnounce: !1
				})), z("input", pe, (e) => oa(t(), s, "opacity", Number(e.target.value))), V(e, u);
			}, ee = (e) => {
				var n = Th(), r = N(n), i = M(r), a = F(i);
				T(r);
				var c = F(r, 2), l = M(c), u = F(l);
				T(c);
				var d = F(c, 2), f = M(d), p = F(f);
				{
					let e = /* @__PURE__ */ O(() => R(o).props.fit ?? "cover"), n = /* @__PURE__ */ O(() => [["cover", J("opt.fit.cover")], ["contain", J("opt.fit.contain")]]);
					Y(p, {
						get value() {
							return R(e);
						},
						get options() {
							return R(n);
						},
						onchange: (e) => oa(t(), s, "fit", e)
					});
				}
				T(d);
				var m = F(d, 2), h = M(m), g = P(F(h));
				T(m);
				var _ = F(m, 2);
				G(_);
				var v = F(_, 2), y = M(v), b = P(F(y));
				T(v);
				var x = F(v, 2);
				G(x);
				var S = F(x, 2), ee = M(S), te = P(F(ee));
				T(S);
				var ne = F(S, 2);
				G(ne);
				var re = F(ne, 2), ie = M(re);
				G(ie);
				var ae = F(ie);
				T(re);
				var C = F(re, 2), oe = (e) => {
					var n = wh(), r = N(n), i = M(r), a = P(F(i));
					T(r);
					var c = F(r, 2);
					G(c), I((e, t) => {
						H(i, `${e ?? ""} `), H(a, `${t ?? ""}%`), K(c, R(o).props.parallax ?? .3);
					}, [() => J("lbl.parallaxStrength"), () => Math.round((R(o).props.parallax ?? 0) * 100)]), z("input", c, (e) => oa(t(), s, "parallax", Number(e.target.value))), V(e, n);
				};
				U(C, (e) => {
					(R(o).props.parallax ?? 0) > 0 && e(oe);
				}), I((e, t, n, a, s, u, p, m, v, S, C, oe, se, ce) => {
					q(r, "title", e), H(i, `${t ?? ""} `), q(c, "title", n), H(l, `${a ?? ""} `), q(d, "title", s), H(f, `${u ?? ""} `), H(h, `${p ?? ""} `), H(g, `${m ?? ""}%`), K(_, R(o).props.x ?? .5), H(y, `${v ?? ""} `), H(b, `${S ?? ""}%`), K(x, R(o).props.y ?? .5), H(ee, `${C ?? ""} `), H(te, `${oe ?? ""}%`), K(ne, R(o).props.opacity ?? 1), q(re, "title", se), Oi(ie, (R(o).props.parallax ?? 0) > 0), H(ae, ` ${ce ?? ""}`);
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
				]), z("change", a, (e) => Ia(t(), s, e)), z("change", u, (e) => za(t(), s, e)), z("input", _, (e) => oa(t(), s, "x", Number(e.target.value))), z("input", x, (e) => oa(t(), s, "y", Number(e.target.value))), z("input", ne, (e) => oa(t(), s, "opacity", Number(e.target.value))), z("change", ie, (e) => oa(t(), s, "parallax", e.target.checked ? .3 : 0)), V(e, n);
			};
			U(h, (e) => {
				R(o).type === "color" ? e(g) : R(o).type === "gradient" ? e(_, 1) : R(o).type === "glow" ? e(v, 2) : R(o).type === "grain" ? e(y, 3) : R(o).type === "pattern" ? e(b, 4) : R(o).type === "image" ? e(x, 5) : R(o).type === "slideshow" ? e(S, 6) : R(o).type === "video" && e(ee, 7);
			}), T(c), I((e, t, n) => {
				q(f, "title", e), q(p, "title", t), p.disabled = s === a().length - 1, q(m, "title", n);
			}, [
				() => J("hint.bg.order"),
				() => J("hint.bg.order"),
				() => J("tip.bg.removeLayer")
			]), z("click", f, () => ta(t(), s, -1)), z("click", p, () => ta(t(), s, 1)), z("click", m, () => ea(t(), s)), V(e, c);
		});
		var c = F(s, 2), l = M(c), u = F(l);
		{
			let e = /* @__PURE__ */ O(() => ie.map(([e, t]) => [e, t.labelKey ? J(t.labelKey) : t.label]));
			Y(u, {
				get value() {
					return R(Qi);
				},
				get options() {
					return R(e);
				},
				onchange: (e) => A(Qi, e, !0)
			});
		}
		T(c);
		var d = F(c, 2), p = P(d, !0);
		I((e, t) => {
			H(l, `${e ?? ""} `), H(p, t);
		}, [() => J("lbl.newLayer"), () => J("ui.addLayer")]), z("click", d, () => $i(t(), R(Qi))), V(e, o);
	}, o = (e, t = f, n = f) => {
		var r = Lr();
		Qr(N(r), 17, n, Jr, (e, r, i) => {
			var a = kh(), o = M(a);
			G(o);
			var s = F(o, 2), c = M(s);
			c.disabled = i === 0, W(c, () => C.up, !0), T(c);
			var l = F(c, 2);
			W(l, () => C.down, !0), T(l);
			var u = F(l, 2);
			W(u, () => C.cross, !0), T(u), T(s);
			var d = F(s, 2), f = M(d);
			{
				let e = /* @__PURE__ */ O(() => R(r).page ?? "__href"), n = /* @__PURE__ */ O(() => J("tip.linkTarget")), a = /* @__PURE__ */ O(() => [...R(D).pages.map((e) => [e.id, e.title]), ["__href", J("opt.linkHref")]]);
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
					onchange: (e) => pp(t(), i, e)
				});
			}
			T(d);
			var p = F(d, 2), m = (e) => {
				var n = Oh();
				G(n), I((e, t) => {
					K(n, R(r).href ?? ""), q(n, "placeholder", e), q(n, "title", t);
				}, [() => J("ph.hrefAnchor"), () => J("tip.hrefAnchor")]), z("change", n, (e) => mp(t(), i, e.target.value)), V(e, n);
			};
			U(p, (e) => {
				R(r).page || e(m);
			}), T(a), I((e, t) => {
				K(o, R(r).label), q(o, "title", e), l.disabled = i === n().length - 1, q(u, "title", t);
			}, [() => J("tip.linkLabel"), () => J("tip.removeLink")]), z("input", o, (e) => fp(t(), i, e.target.value)), z("click", c, () => dp(t(), i, -1)), z("click", l, () => dp(t(), i, 1)), z("click", u, () => up(t(), i)), V(e, a);
		}), V(e, r);
	}, s = (e) => {
		let t = /* @__PURE__ */ O(() => R(j).props.boxStyle ?? {});
		var n = jh(), r = N(n), i = M(r), a = F(i);
		{
			let e = /* @__PURE__ */ O(() => R(t).bg ?? ""), n = /* @__PURE__ */ O(co), r = /* @__PURE__ */ O(() => J("tip.box.bg"));
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
				onchange: (e) => Br({ bg: e || null })
			});
		}
		T(r);
		var o = F(r, 2), s = M(o), c = F(s);
		{
			let e = /* @__PURE__ */ O(() => R(t).shadow ?? ""), n = /* @__PURE__ */ O(() => [
				["", J("common.none")],
				["soft", J("opt.shadow.soft")],
				["strong", J("opt.shadow.strong")]
			]);
			Y(c, {
				get value() {
					return R(e);
				},
				get options() {
					return R(n);
				},
				onchange: (e) => Br({ shadow: e || null })
			});
		}
		T(o);
		var l = F(o, 2), u = (e) => {
			var n = vh(), r = M(n), i = F(r);
			{
				let e = /* @__PURE__ */ O(() => R(t).shadowColor ?? ""), n = /* @__PURE__ */ O(co), r = /* @__PURE__ */ O(() => J("tip.box.shadowColor"));
				Na(i, {
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
					onchange: (e) => Br({ shadowColor: e || null })
				});
			}
			T(n), I((e) => H(r, `${e ?? ""} `), [() => J("lbl.shadowColor")]), V(e, n);
		};
		U(l, (e) => {
			R(t).shadow && e(u);
		});
		var d = F(l, 2), f = M(d), p = F(f);
		{
			let e = /* @__PURE__ */ O(() => R(t).border === "none" ? "none" : R(t).border ? "custom" : ""), n = /* @__PURE__ */ O(() => [
				["", J("opt.border.theme")],
				["none", J("common.none")],
				["custom", J("opt.border.custom")]
			]);
			Y(p, {
				get value() {
					return R(e);
				},
				get options() {
					return R(n);
				},
				onchange: (e) => Br({ border: e === "custom" ? {
					color: "accent",
					width: 1
				} : e || null })
			});
		}
		T(d);
		var m = F(d, 2), h = (e) => {
			let n = /* @__PURE__ */ O(() => typeof R(t).border == "object" ? R(t).border : {
				color: "text",
				width: 1
			});
			var r = Ah(), i = N(r), a = M(i), o = F(a);
			{
				let e = /* @__PURE__ */ O(co), t = /* @__PURE__ */ O(() => J("tip.box.borderColor"));
				Na(o, {
					get value() {
						return R(n).color;
					},
					get tokens() {
						return R(e);
					},
					get label() {
						return R(t);
					},
					onchange: (e) => Br({ border: {
						...R(n),
						color: e
					} })
				});
			}
			T(i);
			var s = F(i, 2), c = M(s), l = F(c), u = M(l), d = F(u, 2);
			G(d);
			var f = F(d, 2);
			T(l), T(s), I((e, t, r, i, o, s) => {
				H(a, `${e ?? ""} `), H(c, `${t ?? ""} `), q(u, "title", r), q(u, "aria-label", i), K(d, R(n).width), q(f, "title", o), q(f, "aria-label", s);
			}, [
				() => J("lbl.borderColor"),
				() => J("lbl.thicknessPx"),
				() => J("tip.thinner"),
				() => J("tip.thinner"),
				() => J("tip.thicker"),
				() => J("tip.thicker")
			]), z("click", u, () => Br({ border: {
				...R(n),
				width: Math.max(1, R(n).width - 1)
			} })), z("change", d, (e) => Br({ border: {
				...R(n),
				width: Math.min(12, Math.max(1, Number(e.target.value) || 1))
			} })), z("click", f, () => Br({ border: {
				...R(n),
				width: Math.min(12, R(n).width + 1)
			} })), V(e, r);
		};
		U(m, (e) => {
			R(t).border !== "none" && e(h);
		});
		var g = F(m, 2), _ = M(g);
		G(_);
		var v = F(_);
		T(g), I((e, t, n, r, a, o) => {
			H(i, `${e ?? ""} `), H(s, `${t ?? ""} `), H(f, `${n ?? ""} `), q(g, "title", r), Oi(_, a), H(v, ` ${o ?? ""}`);
		}, [
			() => J("lbl.blockColor"),
			() => J("lbl.shadow"),
			() => J("lbl.border"),
			() => J("tip.box.glass"),
			() => !!R(t).glass,
			() => J("lbl.glass")
		]), z("change", _, (e) => Br({ glass: e.target.checked || null })), V(e, n);
	}, c = (e, t = f) => {
		let n = /* @__PURE__ */ O(() => rs(R(j).type, xn(), t()));
		var r = Mh();
		let i;
		W(r, () => R(n) ? C.pinOn : C.pin, !0), T(r), I((e, t) => {
			i = xi(r, 1, "menu-pin svelte-1n46o8q", null, i, { on: R(n) }), q(r, "aria-pressed", R(n)), q(r, "title", e), q(r, "aria-label", t);
		}, [() => R(n) ? J("menu.unpin") : J("menu.pin"), () => R(n) ? J("menu.unpin") : J("menu.pin")]), z("click", r, () => Cn(t())), V(e, r);
	}, l = (e, t = f, n = f, r = f, i = f, a) => {
		let o = /* @__PURE__ */ St(() => h(a?.(), null));
		var s = Fh(), c = M(s), l = M(c), u = (e) => {
			V(e, Nh());
		};
		U(l, (e) => {
			R(o) && e(u);
		});
		var d = F(l), p = P(d, !0), m = P(F(d), !0);
		T(c);
		var g = F(c, 2), _ = M(g);
		ii(_, i);
		var v = F(_, 2), y = (e) => {
			var t = Ph(), n = P(t, !0);
			I((e) => H(n, e), [() => J("menu.reset")]), z("click", t, function(...e) {
				R(o)?.apply(this, e);
			}), V(e, t);
		};
		U(v, (e) => {
			R(o) && e(y);
		}), T(g), T(s), I((e) => {
			s.open = e, H(p, n()), H(m, r());
		}, [() => hn.has(t())]), Dr("toggle", s, (e) => {
			e.currentTarget.closest(".emenu-search") || (e.currentTarget.open ? hn.add(t()) : hn.delete(t()));
		}), V(e, s);
	}, u = (e, t = f, n) => {
		let r = /* @__PURE__ */ St(() => h(n?.(), "")), i = (e) => {
			var t = Lr(), n = N(t), r = (e) => {
				var t = Lh(), n = P(t, !0);
				I((e) => H(n, e), [() => J("hint.textInline")]), V(e, t);
			}, i = (e) => {
				var t = Hh(), n = N(t), r = M(n), i = F(r);
				{
					let e = /* @__PURE__ */ O(() => R(j).props.mode ?? "mailto"), t = /* @__PURE__ */ O(() => [["mailto", J("form.modeMailto")], ["endpoint", J("form.modeEndpoint")]]);
					Y(i, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => L("mode", e)
					});
				}
				T(n);
				var a = F(n, 2), o = (e) => {
					var t = Rh(), n = M(t), r = F(n);
					G(r), T(t), I((e, i, a) => {
						q(t, "title", e), H(n, `${i ?? ""} `), K(r, R(j).props.endpoint ?? ""), q(r, "placeholder", a);
					}, [
						() => J("form.endpointNote"),
						() => J("form.endpoint"),
						() => J("form.endpointPh")
					]), z("change", r, (e) => L("endpoint", e.target.value.trim())), V(e, t);
				}, s = (e) => {
					var t = zh(), n = N(t), r = M(n), i = F(r);
					G(i), T(n);
					var a = F(n, 2), o = M(a), s = F(o);
					G(s), T(a), I((e, t, n, a) => {
						H(r, `${e ?? ""} `), K(i, R(j).props.recipient ?? ""), q(i, "placeholder", t), H(o, `${n ?? ""} `), K(s, R(j).props.subject ?? ""), q(s, "placeholder", a);
					}, [
						() => J("form.recipient"),
						() => J("form.recipientPh"),
						() => J("form.subject"),
						() => J("form.subjectPh")
					]), z("change", i, (e) => L("recipient", e.target.value.trim())), z("change", s, (e) => L("subject", e.target.value.trim())), V(e, t);
				};
				U(a, (e) => {
					(R(j).props.mode ?? "mailto") === "endpoint" ? e(o) : e(s, -1);
				});
				var c = F(a, 2), l = P(c, !0), u = F(c, 2);
				Qr(u, 19, () => R(j).props.fields ?? [], (e, t) => e.id ?? t, (e, t, n) => {
					var r = Vh(), i = N(r), a = M(i);
					G(a);
					var o = F(a, 2);
					{
						let e = /* @__PURE__ */ O(() => R(t).type ?? "text"), r = /* @__PURE__ */ O(() => Vr.map((e) => [e, J(`form.type${e[0].toUpperCase()}${e.slice(1)}`)]));
						Y(o, {
							get value() {
								return R(e);
							},
							get options() {
								return R(r);
							},
							onchange: (e) => Wr(R(n), { type: e })
						});
					}
					var s = F(o, 2), c = M(s);
					W(c, () => C.up, !0), T(c);
					var l = F(c, 2);
					W(l, () => C.down, !0), T(l);
					var u = F(l, 2);
					W(u, () => C.cross, !0), T(u), T(s), T(i);
					var d = F(i, 2), f = M(d);
					G(f);
					var p = F(f);
					T(d);
					var m = F(d, 2), h = (e) => {
						var r = Bh();
						G(r), I((e, t) => {
							K(r, e), q(r, "placeholder", t);
						}, [() => (R(t).options ?? []).join(", "), () => J("form.optionsPh")]), z("change", r, (e) => Gr(R(n), e.target.value)), V(e, r);
					}, g = /* @__PURE__ */ O(() => Hr.has(R(t).type));
					U(m, (e) => {
						R(g) && e(h);
					}), I((e, r, i) => {
						K(a, R(t).label), q(a, "placeholder", e), c.disabled = R(n) === 0, l.disabled = R(n) === (R(j).props.fields?.length ?? 0) - 1, q(u, "title", r), Oi(f, R(t).required === !0), H(p, ` ${i ?? ""}`);
					}, [
						() => J("form.fieldNamePh"),
						() => J("form.removeField"),
						() => J("form.required")
					]), z("change", a, (e) => Wr(R(n), { label: e.target.value.trim() || J("form.fieldFallback") })), z("click", c, () => Yr(R(n), -1)), z("click", l, () => Yr(R(n), 1)), z("click", u, () => qr(R(n))), z("change", f, (e) => Wr(R(n), { required: e.target.checked })), V(e, r);
				});
				var d = F(u, 2), f = P(d, !0), p = F(d, 2), m = M(p), h = F(m);
				G(h), T(p);
				var g = F(p, 2), _ = M(g), v = F(_);
				G(v), T(g), I((e, t, i, a, o, s, c, u) => {
					q(n, "title", e), H(r, `${t ?? ""} `), H(l, i), H(f, a), H(m, `${o ?? ""} `), K(h, R(j).props.submitLabel ?? ""), q(h, "placeholder", s), H(_, `${c ?? ""} `), K(v, R(j).props.successText ?? ""), q(v, "placeholder", u);
				}, [
					() => J("form.modeTitle"),
					() => J("form.mode"),
					() => J("form.fields"),
					() => J("form.addField"),
					() => J("lbl.buttonText"),
					() => J("form.sendDefault"),
					() => J("form.receipt"),
					() => J("form.thanksDefault")
				]), z("click", d, Kr), z("change", h, (e) => L("submitLabel", e.target.value.trim() || J("form.sendDefault"))), z("change", v, (e) => L("successText", e.target.value.trim() || J("form.thanksDefault"))), V(e, t);
			}, a = (e) => {
				let t = (e) => {
					var t = qh(), n = N(t);
					Qr(n, 17, () => R(j).props.sources ?? [], Jr, (e, t, n) => {
						let r = /* @__PURE__ */ O(() => Xr(R(t)));
						var i = Lr(), a = N(i), o = (e) => {
							let t = /* @__PURE__ */ O(() => Bl(R(r).ref));
							var i = Uh(), a = M(i), o = M(a);
							let s;
							var c = F(o, 2);
							let l;
							var u = P(c, !0), d = F(c, 2);
							W(d, () => C.cross, !0), T(d), T(a), T(i), I((e, n, r) => {
								s = Ci(o, "", s, { background: e }), l = xi(c, 1, "tb-grow cal-ref-name svelte-1n46o8q", null, l, { muted: !R(t) }), H(u, n), q(d, "title", r);
							}, [
								() => Ll(R(t)?.color),
								() => R(t) ? R(t).name || R(t).url : J("calendar.refMissing"),
								() => J("ui.remove")
							]), z("click", d, () => ai(n)), V(e, i);
						}, s = (e) => {
							var t = Wh(), i = M(t), a = M(i);
							G(a);
							var o = F(a, 2);
							W(o, () => C.cross, !0), T(o), T(i);
							var s = F(i, 2), c = M(s);
							G(c);
							var l = F(c, 2);
							{
								let e = /* @__PURE__ */ O(() => R(r).color || "accent"), t = /* @__PURE__ */ O(co), i = /* @__PURE__ */ O(() => J("tip.calendar.sourceColor"));
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
									onchange: (e) => ni(n, { color: e ?? "" })
								});
							}
							T(s);
							var u = F(s, 2), d = P(u, !0);
							T(t), I((e, t, n, i, s, l, f, p) => {
								K(a, R(r).url), q(a, "placeholder", e), q(a, "title", t), q(o, "title", n), K(c, R(r).name), q(c, "placeholder", i), q(c, "title", s), q(u, "title", l), u.disabled = f, H(d, p);
							}, [
								() => J("calendar.sourcesPh"),
								() => J("calendar.sourceUrl"),
								() => J("ui.remove"),
								() => J("calendar.sourceName"),
								() => J("tip.calendar.sourceName"),
								() => J("tip.calendar.saveToSite"),
								() => !R(r).url.trim(),
								() => J("calendar.saveToSite")
							]), z("change", a, (e) => ni(n, { url: e.target.value.trim() })), z("click", o, () => ai(n)), z("change", c, (e) => ni(n, { name: e.target.value.trim() })), z("click", u, () => ti(n)), V(e, t);
						};
						U(a, (e) => {
							R(r).ref ? e(o) : e(s, -1);
						}), V(e, i);
					});
					var r = F(n, 2), i = M(r);
					W(i, () => C.plus);
					var a = F(i);
					T(r);
					var o = F(r, 2), s = P(o, !0), c = F(o, 2);
					Qr(c, 17, zl, (e) => e.id, (e, t) => {
						var n = Gh(), r = M(n);
						G(r);
						var i = F(r);
						T(n), I((e) => {
							Oi(r, e), H(i, ` ${(R(t).name || R(t).url) ?? ""}`);
						}, [() => $r().has(R(t).id)]), z("change", r, (e) => ei(R(t).id, e.target.checked)), V(e, n);
					});
					var l = F(c, 2), u = (e) => {
						var t = Kh(), n = P(t, !0);
						I((e) => H(n, e), [() => J("calendar.siteSourcesNone")]), V(e, t);
					}, d = /* @__PURE__ */ O(() => !zl().length);
					U(l, (e) => {
						R(d) && e(u);
					});
					var f = F(l, 2), p = P(f, !0);
					I((e, t, n, r) => {
						H(a, ` ${e ?? ""}`), q(o, "title", t), H(s, n), H(p, r);
					}, [
						() => J("ui.addCalendar"),
						() => J("tip.calendar.siteSources"),
						() => J("calendar.siteSources"),
						() => J("calendar.editSiteCalendars")
					]), z("click", r, ri), z("click", f, () => {
						A(Fl, !0), A(Wt, "site");
					}), V(e, t);
				}, n = (e) => {
					var t = Qh(), n = N(t), r = (e) => {
						var t = vh(), n = M(t), r = F(n);
						{
							let e = /* @__PURE__ */ O(() => R(j).props.view ?? "list"), t = /* @__PURE__ */ O(() => [
								["list", J("calendar.viewList")],
								["cards", J("calendar.viewCards")],
								["month", J("calendar.viewMonth")],
								["agenda", J("calendar.viewAgenda")],
								["next", J("calendar.viewNext")]
							]);
							Y(r, {
								get value() {
									return R(e);
								},
								get options() {
									return R(t);
								},
								onchange: (e) => L("view", e)
							});
						}
						T(t), I((e) => H(n, `${e ?? ""} `), [() => J("lbl.view")]), V(e, t);
					}, i = /* @__PURE__ */ O(() => !Nc(R(j).props.design).view);
					U(n, (e) => {
						R(i) && e(r);
					});
					var a = F(n, 2), o = (e) => {
						var t = Yh(), n = N(t), r = M(n);
						G(r);
						var i = F(r);
						T(n);
						var a = F(n, 2), o = (e) => {
							let t = /* @__PURE__ */ O(() => Dc(R(j).props));
							var n = Jh(), r = N(n), i = M(r), a = P(i, !0), o = F(i, 2);
							{
								let e = /* @__PURE__ */ O(() => Tc.map((e) => [e, J(`calendar.design.${e}`)]));
								Y(o, {
									get value() {
										return R(t).week;
									},
									get options() {
										return R(e);
									},
									onchange: (e) => L("switcherViews", {
										...R(j).props.switcherViews ?? {},
										week: e
									})
								});
							}
							T(r);
							var s = F(r, 2), c = M(s), l = P(c, !0), u = F(c, 2);
							{
								let e = /* @__PURE__ */ O(() => Ec.map((e) => [e, J(e === "month" ? "calendar.viewMonth" : `calendar.design.${e}`)]));
								Y(u, {
									get value() {
										return R(t).month;
									},
									get options() {
										return R(e);
									},
									onchange: (e) => L("switcherViews", {
										...R(j).props.switcherViews ?? {},
										month: e
									})
								});
							}
							T(s), I((e, t, n, i) => {
								q(r, "title", e), H(a, t), q(s, "title", n), H(l, i);
							}, [
								() => J("tip.calendar.switchWeek"),
								() => J("calendar.switchWeek"),
								() => J("tip.calendar.switchMonth"),
								() => J("calendar.switchMonth")
							]), V(e, n);
						};
						U(a, (e) => {
							R(j).props.switcher === !0 && e(o);
						});
						var s = F(a, 2);
						{
							let e = /* @__PURE__ */ O(() => J("calendar.toolsSize")), t = /* @__PURE__ */ O(() => J("tip.calendar.toolsSize")), n = /* @__PURE__ */ O(() => ["s", "l"].includes(R(j).props.toolsSize) ? R(j).props.toolsSize : "m"), r = /* @__PURE__ */ O(() => [
								["s", J("calendar.toolsSize.s")],
								["m", J("calendar.toolsSize.m")],
								["l", J("calendar.toolsSize.l")]
							]);
							lc(s, {
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
								onchange: (e) => L("toolsSize", e === "m" ? void 0 : e)
							});
						}
						I((e, t) => {
							q(n, "title", e), Oi(r, R(j).props.switcher === !0), H(i, ` ${t ?? ""}`);
						}, [() => J("tip.calendar.switcher"), () => J("calendar.switcher")]), z("change", r, (e) => L("switcher", e.target.checked || void 0)), V(e, t);
					}, s = /* @__PURE__ */ O(() => Fc.includes(Pc(R(j).props)));
					U(a, (e) => {
						R(s) && e(o);
					});
					var l = F(a, 2), u = (e) => {
						var t = Gh(), n = M(t);
						G(n);
						var r = F(n);
						T(t), I((e, i) => {
							q(t, "title", e), Oi(n, R(j).props.phoneDesign !== !1), H(r, ` ${i ?? ""}`);
						}, [() => J("tip.calendar.phoneDesign"), () => J("calendar.phoneDesign")]), z("change", n, (e) => L("phoneDesign", e.target.checked ? void 0 : !1)), V(e, t);
					}, d = /* @__PURE__ */ O(() => Nc(R(j).props.design).phone === "switch");
					U(l, (e) => {
						R(d) && e(u);
					});
					var f = F(l, 2), p = (e) => {
						{
							let t = /* @__PURE__ */ O(() => J("calendar.opt.description")), n = /* @__PURE__ */ O(() => J("tip.calendar.opt.description")), r = /* @__PURE__ */ O(() => Oc(R(j).props)), i = /* @__PURE__ */ O(() => [["rows", J("calendar.descriptionRows")], ["card", J("calendar.descriptionCard")]]);
							lc(e, {
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
								onchange: (e) => L("description", e === "rows" ? void 0 : e)
							});
						}
					}, m = /* @__PURE__ */ O(() => kc(R(j).props));
					U(f, (e) => {
						R(m) && e(p);
					});
					var h = F(f, 2), g = (e) => {
						var t = Xh(), n = N(t), r = M(n), i = M(r), a = F(i);
						G(a), T(r);
						var o = F(r, 2);
						c(o, () => "limit"), T(n);
						var s = F(n, 2), l = (e) => {
							var t = Gh(), n = M(t);
							G(n);
							var r = F(n);
							T(t), I((e, i) => {
								q(t, "title", e), Oi(n, R(j).props.showMore !== !1), H(r, ` ${i ?? ""}`);
							}, [() => J("tip.calendar.showMore"), () => J("calendar.showMore")]), z("change", n, (e) => L("showMore", e.target.checked ? void 0 : !1)), V(e, t);
						}, u = /* @__PURE__ */ O(() => Pc(R(j).props) === "list" && Nc(R(j).props.design).module !== "more");
						U(s, (e) => {
							R(u) && e(l);
						}), I((e, t) => {
							q(r, "title", e), H(i, `${t ?? ""} `), K(a, R(j).props.limit ?? 6);
						}, [() => J("tip.collection.limit"), () => J("lbl.maxCount")]), z("change", a, (e) => L("limit", Math.max(1, Math.min(50, Number(e.target.value) || 6)))), V(e, t);
					}, _ = /* @__PURE__ */ O(() => [
						"list",
						"cards",
						"agenda"
					].includes(R(j).props.view ?? "list"));
					U(h, (e) => {
						R(_) && e(g);
					});
					var v = F(h, 2), y = M(v);
					G(y);
					var b = F(y);
					T(v);
					var x = F(v, 2), S = M(x);
					G(S);
					var ee = F(S);
					T(x);
					var te = F(x, 2);
					{
						let e = /* @__PURE__ */ O(() => J("calendar.clock")), t = /* @__PURE__ */ O(() => J("tip.calendar.clock")), n = /* @__PURE__ */ O(() => R(j).props.clock === "12" ? "12" : "24"), r = /* @__PURE__ */ O(() => [["24", J("calendar.clock.24")], ["12", J("calendar.clock.12")]]);
						lc(te, {
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
							onchange: (e) => L("clock", e === "12" ? "12" : void 0)
						});
					}
					var ne = F(te, 2), re = (e) => {
						{
							let t = /* @__PURE__ */ O(() => J("calendar.weekStart")), n = /* @__PURE__ */ O(() => J("tip.calendar.weekStart")), r = /* @__PURE__ */ O(() => ["mon", "sun"].includes(R(j).props.weekStart) ? R(j).props.weekStart : "auto"), i = /* @__PURE__ */ O(() => [
								["auto", J("calendar.weekStart.auto")],
								["mon", J("calendar.weekStart.mon")],
								["sun", J("calendar.weekStart.sun")]
							]);
							lc(e, {
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
								onchange: (e) => L("weekStart", e === "auto" ? void 0 : e)
							});
						}
					}, ie = /* @__PURE__ */ O(() => [
						"month",
						"week",
						"year",
						"agenda"
					].includes(Pc(R(j).props)) || R(j).props.design === "bento" || R(j).props.switcher === !0);
					U(ne, (e) => {
						R(ie) && e(re);
					});
					var ae = F(ne, 2), C = (e) => {
						var t = Zh(), n = N(t);
						{
							let e = /* @__PURE__ */ O(() => J("calendar.nextCount")), t = /* @__PURE__ */ O(() => J("tip.calendar.nextCount")), r = /* @__PURE__ */ O(() => String(Math.min(3, Math.max(1, Number(R(j).props.nextCount) || 1))));
							lc(n, {
								get label() {
									return R(e);
								},
								get title() {
									return R(t);
								},
								get value() {
									return R(r);
								},
								options: [
									["1", "1"],
									["2", "2"],
									["3", "3"]
								],
								onchange: (e) => L("nextCount", Number(e))
							});
						}
						var r = F(n, 2), i = M(r), a = P(i, !0), o = F(i, 2);
						G(o);
						var s = P(F(o, 2), !0);
						T(r), I((e, t) => {
							q(r, "title", e), H(a, t), K(o, R(j).props.laterCount ?? 0), H(s, R(j).props.laterCount ?? 0);
						}, [() => J("tip.calendar.laterCount"), () => J("calendar.laterCount")]), z("input", o, (e) => L("laterCount", e.target.valueAsNumber)), V(e, t);
					};
					U(ae, (e) => {
						R(j).props.view === "next" && e(C);
					}), I((e, t, n, r) => {
						q(v, "title", e), Oi(y, R(j).props.showCancelled !== !1), H(b, ` ${t ?? ""}`), q(x, "title", n), Oi(S, R(j).props.structuredData !== !1), H(ee, ` ${r ?? ""}`);
					}, [
						() => J("tip.calendar.showCancelled"),
						() => J("calendar.showCancelled"),
						() => J("tip.calendar.structuredData"),
						() => J("calendar.structuredData")
					]), z("change", y, (e) => L("showCancelled", e.target.checked ? void 0 : !1)), z("change", S, (e) => L("structuredData", e.target.checked ? void 0 : !1)), V(e, t);
				}, r = (e) => {
					var t = eg(), n = N(t), r = (e) => {
						var t = Gh(), n = M(t);
						G(n);
						var r = F(n);
						T(t), I((e, i) => {
							q(t, "title", e), Oi(n, R(j).props.showCategories === !0), H(r, ` ${i ?? ""}`);
						}, [() => J("tip.calendar.showCategories"), () => J("calendar.showCategories")]), z("change", n, (e) => L("showCategories", e.target.checked)), V(e, t);
					}, i = /* @__PURE__ */ O(() => !Nc(R(j).props.design).ownFilter);
					U(n, (e) => {
						R(i) && e(r);
					});
					var a = F(n, 2), o = M(a);
					G(o);
					var s = F(o);
					T(a);
					var l = F(a, 2), u = (e) => {
						var t = Gh(), n = M(t);
						G(n);
						var r = F(n);
						T(t), I((e, i) => {
							q(t, "title", e), Oi(n, R(j).props.showEarlier === !0), H(r, ` ${i ?? ""}`);
						}, [() => J("tip.calendar.showEarlier"), () => J("calendar.showEarlier")]), z("change", n, (e) => L("showEarlier", e.target.checked ? !0 : void 0)), V(e, t);
					}, d = /* @__PURE__ */ O(() => ![
						"month",
						"week",
						"day",
						"year"
					].includes(Pc(R(j).props)));
					U(l, (e) => {
						R(d) && e(u);
					});
					var f = F(l, 2), p = M(f), m = M(p);
					G(m);
					var h = F(m);
					T(p);
					var g = F(p, 2);
					c(g, () => "subscribe"), T(f);
					var _ = F(f, 2), v = M(_);
					G(v);
					var y = F(v);
					T(_);
					var b = F(_, 2), x = M(b);
					G(x);
					var S = F(x);
					T(b);
					var ee = F(b, 2), te = (e) => {
						var t = Gh(), n = M(t);
						G(n);
						var r = F(n);
						T(t), I((e, i) => {
							q(t, "title", e), Oi(n, R(j).props.showOpen !== !1), H(r, ` ${i ?? ""}`);
						}, [() => J("tip.calendar.showOpen"), () => J("calendar.showOpen")]), z("change", n, (e) => L("showOpen", e.target.checked ? void 0 : !1)), V(e, t);
					}, ne = /* @__PURE__ */ O(() => Nc(R(j).props.design).open);
					U(ee, (e) => {
						R(ne) && e(te);
					});
					var re = F(ee, 2), ie = (e) => {
						var t = $h(), n = M(t), r = F(n);
						G(r), T(t), I((e, i) => {
							q(t, "title", e), H(n, `${i ?? ""} `), K(r, R(j).props.programHref ?? "");
						}, [() => J("tip.calendar.programHref"), () => J("calendar.programHref")]), z("change", r, (e) => L("programHref", e.target.value.trim() || void 0)), V(e, t);
					}, ae = /* @__PURE__ */ O(() => Nc(R(j).props.design).program);
					U(re, (e) => {
						R(ae) && e(ie);
					}), I((e, t, n, r, i, c) => {
						q(a, "title", e), Oi(o, R(j).props.showSearch === !0), H(s, ` ${t ?? ""}`), Oi(m, R(j).props.showSubscribe !== !1), H(h, ` ${n ?? ""}`), Oi(v, R(j).props.showSignup === !0), H(y, ` ${r ?? ""}`), q(b, "title", i), Oi(x, R(j).props.showAdd !== !1), H(S, ` ${c ?? ""}`);
					}, [
						() => J("tip.calendar.showSearch"),
						() => J("calendar.showSearch"),
						() => J("calendar.showSubscribe"),
						() => J("calendar.showSignup"),
						() => J("tip.calendar.showAdd"),
						() => J("calendar.showAdd")
					]), z("change", o, (e) => L("showSearch", e.target.checked ? !0 : void 0)), z("change", m, (e) => L("showSubscribe", e.target.checked)), z("change", v, (e) => L("showSignup", e.target.checked)), z("change", x, (e) => L("showAdd", e.target.checked ? void 0 : !1)), V(e, t);
				}, i = (e) => {
					var t = tg(), n = N(t), r = M(n), i = F(r);
					G(i), T(n);
					var a = F(n, 2), o = M(a), s = F(o);
					{
						let e = /* @__PURE__ */ O(() => R(j).props.emptyIcon === "none" ? "" : R(j).props.emptyIcon ?? "calendar"), t = /* @__PURE__ */ O(() => J("tip.calendar.emptyIcon"));
						Ko(s, {
							iconsOnly: !0,
							get icon() {
								return R(e);
							},
							klass: "lbtn-mark",
							get label() {
								return R(t);
							},
							onpick: (e) => L("emptyIcon", e.icon || "none"),
							children: (e, t) => {
								var n = Lr(), r = N(n), i = (e) => {
									var t = Lr();
									W(N(t), () => vo(R(j).props.emptyIcon ?? "calendar") || vo("calendar")), V(e, t);
								};
								U(r, (e) => {
									R(j).props.emptyIcon !== "none" && e(i);
								}), V(e, n);
							},
							$$slots: { default: !0 }
						});
					}
					T(a), I((e, t, s, c, l) => {
						q(n, "title", e), H(r, `${t ?? ""} `), K(i, R(j).props.emptyText ?? ""), q(i, "placeholder", s), q(a, "title", c), H(o, `${l ?? ""} `);
					}, [
						() => J("tip.calendar.emptyText"),
						() => J("calendar.emptyText"),
						() => J("calendar.emptyPh"),
						() => J("tip.calendar.emptyIcon"),
						() => J("calendar.emptyIcon")
					]), z("change", i, (e) => L("emptyText", e.target.value.trim() || void 0)), V(e, t);
				}, a = (e) => {
					var t = Lr(), n = N(t), r = (e) => {
						var t = ig(), n = N(t), r = M(n);
						G(r);
						var i = F(r);
						T(n);
						var a = F(n, 2), o = (e) => {
							var t = rg(), n = N(t), r = (e) => {
								{
									let t = /* @__PURE__ */ O(() => J("calendar.noticeAs")), n = /* @__PURE__ */ O(() => J("tip.calendar.noticeAs")), r = /* @__PURE__ */ O(() => R(j).props.notice?.as === "band" ? "band" : "note"), i = /* @__PURE__ */ O(() => [["note", J("calendar.noticeAsNote")], ["band", J("calendar.noticeAsBand")]]);
									lc(e, {
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
										onchange: (e) => L("notice", {
											...R(j).props.notice ?? {},
											as: e === "band" ? "band" : void 0
										})
									});
								}
							}, i = /* @__PURE__ */ O(() => Nc(R(j).props.design).noticeBand);
							U(n, (e) => {
								R(i) && e(r);
							});
							var a = F(n, 2), o = M(a), s = F(o);
							G(s), T(a);
							var c = F(a, 2), l = (e) => {
								var t = ng(), n = M(t), r = F(n);
								ut(r), T(t), I((e, i, a) => {
									q(t, "title", e), H(n, `${i ?? ""} `), K(r, a);
								}, [
									() => J("tip.calendar.noticeBody"),
									() => J("calendar.noticeBody"),
									() => dr("noticeText")
								]), z("change", r, (e) => fr("noticeText", e.target.value)), V(e, t);
							}, u = /* @__PURE__ */ O(() => R(j).props.notice?.as !== "band" || !Nc(R(j).props.design).noticeBand);
							U(c, (e) => {
								R(u) && e(l);
							});
							var d = F(c, 2), f = M(d), p = F(f);
							G(p), T(d), I((e, t, n, r, i, c) => {
								q(a, "title", e), H(o, `${t ?? ""} `), K(s, n), q(s, "placeholder", r), q(d, "title", i), H(f, `${c ?? ""} `), K(p, R(j).props.notice?.href ?? "");
							}, [
								() => J("tip.calendar.noticeHeading"),
								() => J("calendar.noticeHeading"),
								() => dr("noticeTitle"),
								() => J("calendar.noticeTitleHint"),
								() => J("tip.calendar.noticeHref"),
								() => J("calendar.noticeHref")
							]), z("change", s, (e) => fr("noticeTitle", e.target.value)), z("change", p, (e) => L("notice", {
								...R(j).props.notice ?? {},
								href: e.target.value.trim() || void 0
							})), V(e, t);
						};
						U(a, (e) => {
							R(j).props.notice?.show === !0 && e(o);
						}), I((e, t) => {
							q(n, "title", e), Oi(r, R(j).props.notice?.show === !0), H(i, ` ${t ?? ""}`);
						}, [() => J("tip.calendar.showNotice"), () => J("calendar.showNotice")]), z("change", r, (e) => L("notice", {
							...R(j).props.notice ?? {},
							show: e.target.checked
						})), V(e, t);
					}, i = /* @__PURE__ */ O(() => Nc(R(j).props.design).notice);
					U(n, (e) => {
						R(i) && e(r);
					}), V(e, t);
				}, o = /* @__PURE__ */ O(Dn);
				var s = og(), u = N(s);
				{
					let e = /* @__PURE__ */ O(() => J("calendar.sources"));
					l(u, () => "cal-sources", () => R(e), () => R(o).sources, () => t);
				}
				var d = F(u, 2);
				{
					let e = /* @__PURE__ */ O(() => J("calendar.group.view"));
					l(d, () => "cal-view", () => R(e), () => R(o).view, () => n, () => R(o).viewReset);
				}
				var f = F(d, 2);
				{
					let e = /* @__PURE__ */ O(() => J("calendar.group.buttons"));
					l(f, () => "cal-buttons", () => R(e), () => R(o).buttons, () => r, () => R(o).buttonsReset);
				}
				var p = F(f, 2);
				{
					let e = /* @__PURE__ */ O(() => J("calendar.group.empty"));
					l(p, () => "cal-empty", () => R(e), () => R(o).empty, () => i, () => R(o).emptyReset);
				}
				var m = F(p, 2), h = (e) => {
					{
						let t = /* @__PURE__ */ O(() => J("calendar.group.notice"));
						l(e, () => "cal-notice", () => R(t), () => R(o).notice, () => a, () => R(o).noticeReset);
					}
				}, g = /* @__PURE__ */ O(() => Nc(R(j).props.design).notice);
				U(m, (e) => {
					R(g) && e(h);
				});
				var _ = F(m, 2), v = (e) => {
					var t = ag(), n = P(t, !0);
					I((e, r) => {
						q(t, "title", e), H(n, r);
					}, [() => J("tip.calendar.resetTexts"), () => J("calendar.resetTexts")]), z("click", t, () => L("texts", Gc(R(j).props.texts))), V(e, t);
				}, y = /* @__PURE__ */ O(() => Wc(Nc(R(j).props.design), R(j).props.texts));
				U(_, (e) => {
					R(y) && e(v);
				}), V(e, s);
			}, o = (e) => {
				var t = cg(), n = N(t), r = M(n);
				G(r);
				var i = F(r);
				T(n);
				var a = F(n, 2), o = P(a, !0), s = F(a, 2);
				Qr(s, 17, () => R(j).props.items ?? [], Jr, (e, t, n) => {
					var r = sg(), i = M(r);
					G(i);
					var a = F(i, 2), o = M(a);
					o.disabled = n === 0, W(o, () => C.up, !0), T(o);
					var s = F(o, 2);
					W(s, () => C.down, !0), T(s);
					var c = F(s, 2);
					W(c, () => C.cross, !0), T(c), T(a), T(r), I((e, r) => {
						K(i, R(t).q), q(i, "title", e), s.disabled = n === (R(j).props.items?.length ?? 0) - 1, q(c, "title", r);
					}, [() => J("tip.faq.question"), () => J("tip.faq.remove")]), z("change", i, (e) => oi(n, { q: e.target.value })), z("click", o, () => li(n, -1)), z("click", s, () => li(n, 1)), z("click", c, () => ci(n)), V(e, r);
				});
				var c = F(s, 2), l = P(c, !0);
				I((e, t, a, s, c) => {
					q(n, "title", e), Oi(r, t), H(i, ` ${a ?? ""}`), H(o, s), H(l, c);
				}, [
					() => J("tip.faq.multi"),
					() => !!R(j).props.multi,
					() => J("lbl.faqMulti"),
					() => J("lbl.questions"),
					() => J("ui.addQuestion")
				]), z("change", r, (e) => L("multi", e.target.checked)), z("click", c, si), V(e, t);
			}, s = (e) => {
				var t = ug(), n = N(t), r = P(n, !0), i = F(n, 2);
				Qr(i, 17, () => R(j).props.items ?? [], Jr, (e, t, n) => {
					var r = lg(), i = N(r), a = M(i);
					G(a);
					var o = F(a, 2);
					G(o);
					var s = F(o, 2), c = M(s);
					c.disabled = n === 0, W(c, () => C.up, !0), T(c);
					var l = F(c, 2);
					W(l, () => C.down, !0), T(l);
					var u = F(l, 2);
					W(u, () => C.cross, !0), T(u), T(s), T(i);
					var d = F(i, 2);
					G(d), I((e, r, i, s, c, f) => {
						K(a, R(t).year), q(a, "placeholder", e), q(a, "title", r), K(o, R(t).title), q(o, "title", i), l.disabled = n === (R(j).props.items?.length ?? 0) - 1, q(u, "title", s), K(d, R(t).text), q(d, "placeholder", c), q(d, "title", f);
					}, [
						() => J("ph.tlYear"),
						() => J("tip.timeline.year"),
						() => J("tip.timeline.title"),
						() => J("tip.timeline.remove"),
						() => J("ph.tlText"),
						() => J("tip.timeline.text")
					]), z("change", a, (e) => gi(n, { year: e.target.value })), z("change", o, (e) => gi(n, { title: e.target.value })), z("click", c, () => yi(n, -1)), z("click", l, () => yi(n, 1)), z("click", u, () => vi(n)), z("change", d, (e) => gi(n, { text: e.target.value })), V(e, r);
				});
				var a = F(i, 2), o = P(a, !0);
				I((e, t) => {
					H(r, e), H(o, t);
				}, [() => J("lbl.timelineItems"), () => J("ui.addTlItem")]), z("click", a, _i), V(e, t);
			}, u = (e) => {
				var t = dg(), n = N(t), r = M(n), i = F(r);
				G(i), T(n);
				var a = F(n, 2), o = M(a), s = F(o);
				G(s), T(a);
				var c = F(a, 2), l = M(c), u = F(l);
				G(u), T(c), I((e, t, n) => {
					H(r, `${e ?? ""} `), K(i, R(j).props.text ?? ""), H(o, `${t ?? ""} `), K(s, R(j).props.attribution ?? ""), H(l, `${n ?? ""} `), K(u, R(j).props.role ?? "");
				}, [
					() => J("lbl.quoteText"),
					() => J("lbl.quoteName"),
					() => J("lbl.quoteRole")
				]), z("change", i, (e) => L("text", e.target.value)), z("change", s, (e) => L("attribution", e.target.value)), z("change", u, (e) => L("role", e.target.value)), V(e, t);
			}, d = (e) => {
				var t = fg(), n = N(t), r = M(n), i = F(r);
				G(i), T(n);
				var a = F(n, 2), o = M(a), s = F(o);
				G(s), T(a);
				var c = F(a, 2), l = M(c), u = F(l);
				G(u), T(c);
				var d = F(c, 2), f = M(d), p = F(f);
				G(p), T(d), I((e, t, n, a, c) => {
					H(r, `${e ?? ""} `), K(i, R(j).props.value ?? ""), q(i, "title", t), H(o, `${n ?? ""} `), K(s, R(j).props.prefix ?? ""), H(l, `${a ?? ""} `), K(u, R(j).props.suffix ?? ""), H(f, `${c ?? ""} `), K(p, R(j).props.label ?? "");
				}, [
					() => J("lbl.statValue"),
					() => J("tip.stat.value"),
					() => J("lbl.statPrefix"),
					() => J("lbl.statSuffix"),
					() => J("lbl.statLabel")
				]), z("change", i, (e) => L("value", e.target.value)), z("change", s, (e) => L("prefix", e.target.value)), z("change", u, (e) => L("suffix", e.target.value)), z("change", p, (e) => L("label", e.target.value)), V(e, t);
			}, f = (e) => {
				var t = mg(), n = N(t), r = P(n, !0), i = F(n, 2);
				Qr(i, 17, () => R(j).props.items ?? [], Jr, (e, t, n) => {
					var r = sg(), i = M(r);
					G(i);
					var a = F(i, 2), o = M(a);
					o.disabled = n === 0, W(o, () => C.up, !0), T(o);
					var s = F(o, 2);
					W(s, () => C.down, !0), T(s);
					var c = F(s, 2);
					W(c, () => C.cross, !0), T(c), T(a), T(r), I((e, r, a, l) => {
						K(i, R(t)), q(i, "title", e), q(o, "title", r), q(s, "title", a), s.disabled = n === (R(j).props.items?.length ?? 0) - 1, q(c, "title", l);
					}, [
						() => J("tip.ribbon.item"),
						() => J("tip.moveUp"),
						() => J("tip.moveDown"),
						() => J("tip.ribbon.remove")
					]), z("change", i, (e) => ui(n, e.target.value)), z("click", o, () => mi(n, -1)), z("click", s, () => mi(n, 1)), z("click", c, () => fi(n)), V(e, r);
				});
				var a = F(i, 2), o = P(a, !0), s = F(a, 2), c = M(s), l = P(c, !0), u = F(c, 2);
				Qr(u, 21, () => R(te), ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ O(() => g(R(t), 2));
					let r = () => R(n)[0], i = () => R(n)[1];
					var a = Mh();
					let o;
					W(a, () => x[r()], !0), T(a), I(() => {
						o = xi(a, 1, "tile svelte-1n46o8q", null, o, { on: (R(j).props.sep ?? "dot") === r() }), q(a, "aria-pressed", (R(j).props.sep ?? "dot") === r()), q(a, "title", i());
					}), z("click", a, () => L("sep", r())), V(e, a);
				}), T(u), T(s);
				var d = F(s, 2), f = (e) => {
					var t = pg(), n = M(t), r = P(n, !0), i = F(n, 2);
					G(i), T(t), I((e, n) => {
						q(t, "title", e), H(r, n), K(i, R(j).props.sepText ?? "");
					}, [() => J("tip.ribbon.sepText"), () => J("lbl.ribbonSepText")]), z("change", i, (e) => L("sepText", e.target.value)), V(e, t);
				};
				U(d, (e) => {
					R(j).props.sep === "custom" && e(f);
				}), I((e, t, n, i) => {
					H(r, e), H(o, t), H(l, n), q(u, "aria-label", i);
				}, [
					() => J("lbl.ribbonItems"),
					() => J("ui.addRibbonItem"),
					() => J("lbl.ribbonSep"),
					() => J("lbl.ribbonSep")
				]), z("click", a, di), V(e, t);
			}, p = (e) => {
				var t = hg(), n = N(t), r = M(n), i = P(r, !0), a = F(r, 2), o = P(a, !0);
				T(n);
				var s = F(n, 2), c = M(s), l = P(c, !0), u = F(c, 2), d = P(u, !0);
				T(s);
				var f = F(s, 2), p = M(f);
				G(p);
				var m = F(p);
				T(f), I((e, t, n, r, a, s) => {
					H(i, e), H(o, t), H(l, n), H(d, r), q(f, "title", a), Oi(p, R(j).props.header !== !1), H(m, ` ${s ?? ""}`);
				}, [
					() => J("ui.addRow"),
					() => J("ui.removeRow"),
					() => J("ui.addColumn"),
					() => J("ui.removeColumn"),
					() => J("tip.table.header"),
					() => J("lbl.tableHeader")
				]), z("click", r, () => Si(1, 0)), z("click", a, () => Si(-1, 0)), z("click", c, () => Si(0, 1)), z("click", u, () => Si(0, -1)), z("change", p, (e) => L("header", e.target.checked)), V(e, t);
			}, m = (e) => {
				var t = Lr();
				Qr(N(t), 17, () => [
					["facebook", "Facebook"],
					["x", "X"],
					["linkedin", "LinkedIn"],
					["whatsapp", "WhatsApp"],
					["email", J("opt.share.email")],
					["copy", J("opt.share.copy")]
				], ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ O(() => g(R(t), 2));
					let r = () => R(n)[0], i = () => R(n)[1];
					var a = Gh(), o = M(a);
					G(o);
					var s = F(o);
					T(a), I((e) => {
						Oi(o, e), H(s, ` ${i() ?? ""}`);
					}, [() => (R(j).props.services ?? []).includes(r())]), z("change", o, (e) => wi(r(), e.target.checked)), V(e, a);
				}), V(e, t);
			}, h = (e) => {
				var t = gg(), n = N(t), r = M(n), i = F(r);
				G(i), T(n);
				var a = F(n, 2), o = M(a), s = F(o);
				G(s), T(a), I((e, t, n) => {
					H(r, `${e ?? ""} `), K(i, R(j).props.target ?? ""), q(a, "title", t), H(o, `${n ?? ""} `), K(s, R(j).props.doneText ?? "");
				}, [
					() => J("lbl.countdownTarget"),
					() => J("tip.countdown.done"),
					() => J("lbl.countdownDone")
				]), z("change", i, (e) => L("target", e.target.value)), z("change", s, (e) => L("doneText", e.target.value)), V(e, t);
			}, _ = (e) => {
				var t = vg(), n = N(t), r = M(n), i = F(r);
				T(n);
				var a = F(n, 2), o = (e) => {
					var t = _g(), n = P(t, !0);
					I((e) => H(n, e), [() => J("ui.removeAudio")]), z("click", t, () => L("src", "")), V(e, t);
				};
				U(a, (e) => {
					R(j).props.src && e(o);
				});
				var s = F(a, 2), c = M(s), l = F(c);
				G(l), T(s);
				var u = F(s, 2), d = M(u);
				G(d);
				var f = F(d);
				T(u), I((e, t, i, a, o) => {
					q(n, "title", e), H(r, `${t ?? ""} `), H(c, `${i ?? ""} `), K(l, R(j).props.title ?? ""), Oi(d, a), H(f, ` ${o ?? ""}`);
				}, [
					() => J("tip.blocks.audioFile"),
					() => J("ui.chooseAudio"),
					() => J("lbl.audioTitle"),
					() => !!R(j).props.loop,
					() => J("lbl.audioLoop")
				]), z("change", i, Ti), z("change", l, (e) => L("title", e.target.value)), z("change", d, (e) => L("loop", e.target.checked)), V(e, t);
			}, v = (e) => {
				let t = (e) => {
					var t = yg(), n = N(t), r = M(n), i = F(r);
					G(i), T(n);
					var a = F(n, 2), o = M(a), s = M(o), l = F(s);
					{
						let e = /* @__PURE__ */ O(() => R(j).props.page ?? "__href"), t = /* @__PURE__ */ O(Kn);
						Y(l, {
							get value() {
								return R(e);
							},
							get options() {
								return R(t);
							},
							onchange: qn
						});
					}
					T(o);
					var u = F(o, 2);
					c(u, () => "goesTo"), T(a);
					var d = F(a, 2), f = (e) => {
						var t = Bh();
						G(t), I((e) => {
							q(t, "placeholder", e), K(t, R(j).props.href === "#" ? "" : R(j).props.href ?? "");
						}, [() => J("ph.url")]), z("change", t, (e) => L("href", e.target.value || null)), V(e, t);
					};
					U(d, (e) => {
						R(j).props.page || e(f);
					}), I((e, t) => {
						H(r, `${e ?? ""} `), K(i, R(j).props.label), H(s, `${t ?? ""} `);
					}, [() => J("blocks.text"), () => J("lbl.goesTo")]), z("change", i, (e) => L("label", e.target.value)), V(e, t);
				};
				{
					let n = /* @__PURE__ */ O(() => J("group.textLink")), r = /* @__PURE__ */ O(() => Kn().find(([e]) => e === (R(j).props.page ?? "__href"))?.[1] ?? "");
					l(e, () => "btn-link", () => R(n), () => R(r), () => t);
				}
			}, y = (e) => {
				let t = (e) => {
					var t = bg(), n = N(t), r = M(n), i = F(r);
					T(n);
					var a = F(n, 2), o = M(a), s = F(o);
					G(s), T(a), I((e, t, n) => {
						H(r, `${e ?? ""} `), H(o, `${t ?? ""} `), K(s, R(j).props.alt ?? ""), q(s, "placeholder", n);
					}, [
						() => J("ui.changeImage"),
						() => J("lbl.description"),
						() => J("ph.altText")
					]), z("change", i, Di), z("change", s, (e) => L("alt", e.target.value)), V(e, t);
				}, n = (e) => {
					var t = xg(), n = N(t), r = M(n), i = F(r);
					G(i), T(n);
					var a = F(n, 2), o = (e) => {
						var t = Gh(), n = M(t);
						G(n);
						var r = F(n);
						T(t), I((e, i, a) => {
							q(t, "title", e), Oi(n, i), H(r, ` ${a ?? ""}`);
						}, [
							() => J("tip.lightbox"),
							() => !!R(j).props.lightbox,
							() => J("lbl.lightbox")
						]), z("change", n, (e) => L("lightbox", e.target.checked)), V(e, t);
					};
					U(a, (e) => {
						R(j).props.href || e(o);
					}), I((e, t) => {
						H(r, `${e ?? ""} `), K(i, R(j).props.href ?? ""), q(i, "placeholder", t);
					}, [() => J("lbl.link"), () => J("ph.optionalImageLink")]), z("change", i, (e) => L("href", e.target.value || null)), V(e, t);
				};
				var r = Sg(), i = N(r);
				{
					let e = /* @__PURE__ */ O(() => J("blocks.image")), n = /* @__PURE__ */ O(() => R(j).props.alt || J("menu.noAlt"));
					l(i, () => "img-image", () => R(e), () => R(n), () => t);
				}
				var a = F(i, 2);
				{
					let e = /* @__PURE__ */ O(() => J("group.linkClick")), t = /* @__PURE__ */ O(() => R(j).props.href || (R(j).props.lightbox ? J("menu.lightboxShort") : J("common.none"))), r = /* @__PURE__ */ O(() => Un("img-link", {
						href: null,
						lightbox: !1
					}));
					l(a, () => "img-link", () => R(e), () => R(t), () => n, () => R(r));
				}
				V(e, r);
			}, b = (e) => {
				let t = (e) => {
					var t = Tg(), n = N(t), r = M(n);
					{
						let e = /* @__PURE__ */ O(() => J("lbl.videoSource")), t = /* @__PURE__ */ O(() => [["embed", J("opt.videoSource.embed")], ["file", J("opt.videoSource.file")]]);
						lc(r, {
							get label() {
								return R(e);
							},
							get value() {
								return R(i);
							},
							get options() {
								return R(t);
							},
							onchange: (e) => L("source", e)
						});
					}
					var a = F(r, 2);
					c(a, () => "videoSource"), T(n);
					var o = F(n, 2), s = (e) => {
						var t = Cg(), n = N(t), r = P(n, !0), i = F(n, 2);
						G(i), I((e, t, a) => {
							q(n, "title", e), H(r, t), K(i, R(j).props.url ?? ""), q(i, "placeholder", a);
						}, [
							() => J("hint.video"),
							() => J("lbl.videoUrl"),
							() => J("ph.videoUrl")
						]), z("change", i, (e) => L("url", e.target.value)), V(e, t);
					}, l = (e) => {
						var t = wg(), n = N(t), r = M(n), i = F(r);
						T(n);
						var a = F(n, 2), o = M(a), s = F(o);
						T(a), I((e, t, i, s) => {
							q(n, "title", e), H(r, `${t ?? ""} `), q(a, "title", i), H(o, `${s ?? ""} `);
						}, [
							() => J("tip.video.file"),
							() => R(j).props.src ? J("ui.changeVideo") : J("ui.chooseVideo"),
							() => J("tip.bg.poster"),
							() => R(j).props.poster ? J("ui.changeImage") : J("ui.choosePoster")
						]), z("change", i, Ma), z("change", s, Pa), V(e, t);
					};
					U(o, (e) => {
						R(i) === "embed" ? e(s) : e(l, -1);
					}), V(e, t);
				}, n = (e) => {
					var t = Eg(), n = N(t), r = M(n);
					G(r);
					var i = F(r);
					T(n);
					var a = F(n, 2), o = M(a);
					G(o);
					var s = F(o);
					T(a);
					var c = F(a, 2), l = (e) => {
						var t = Gh(), n = M(t);
						G(n);
						var r = F(n);
						T(t), I((e, i) => {
							q(t, "title", e), Oi(n, R(j).props.autoplay === !0), H(r, ` ${i ?? ""}`);
						}, [() => J("tip.video.autoplay"), () => J("lbl.videoAutoplay")]), z("change", n, (e) => L("autoplay", e.target.checked)), V(e, t);
					};
					U(c, (e) => {
						R(j).props.muted === !0 && e(l);
					}), I((e, t) => {
						Oi(r, R(j).props.loop === !0), H(i, ` ${e ?? ""}`), Oi(o, R(j).props.muted === !0), H(s, ` ${t ?? ""}`);
					}, [() => J("lbl.videoLoop"), () => J("lbl.videoMuted")]), z("change", r, (e) => L("loop", e.target.checked)), z("change", o, (e) => Hn("muted", e.target.checked ? { muted: !0 } : {
						muted: !1,
						autoplay: !1
					})), V(e, t);
				}, r = (e) => {
					var t = Rh(), n = M(t), r = F(n);
					G(r), T(t), I((e) => {
						H(n, `${e ?? ""} `), K(r, R(j).props.title ?? "");
					}, [() => J("lbl.videoTitle")]), z("change", r, (e) => L("title", e.target.value)), V(e, t);
				}, i = /* @__PURE__ */ O(() => R(j).props.source === "file" ? "file" : "embed");
				var a = Dg(), o = N(a);
				{
					let e = /* @__PURE__ */ O(() => J("lbl.videoSource")), n = /* @__PURE__ */ O(() => R(i) === "file" ? J("opt.videoSource.file") : J("opt.videoSource.embed"));
					l(o, () => "video-source", () => R(e), () => R(n), () => t);
				}
				var s = F(o, 2), u = (e) => {
					let t = /* @__PURE__ */ O(() => [
						R(j).props.loop === !0,
						R(j).props.muted === !0,
						R(j).props.autoplay === !0
					].filter(Boolean).length);
					{
						let r = /* @__PURE__ */ O(() => J("group.playback")), i = /* @__PURE__ */ O(() => R(t) ? J("menu.onCount", { n: R(t) }) : J("common.off")), a = /* @__PURE__ */ O(() => Un("video-play", {
							loop: !1,
							muted: !1,
							autoplay: !1
						}));
						l(e, () => "video-play", () => R(r), () => R(i), () => n, () => R(a));
					}
				};
				U(s, (e) => {
					R(i) === "file" && e(u);
				});
				var d = F(s, 2);
				{
					let e = /* @__PURE__ */ O(() => J("group.accessibility")), t = /* @__PURE__ */ O(() => R(j).props.title || J("menu.noTitle"));
					l(d, () => "video-a11y", () => R(e), () => R(t), () => r);
				}
				V(e, a);
			}, S = (e) => {
				let t = (e) => {
					var t = Ag(), n = N(t), r = M(n), i = F(r), a = M(i);
					{
						let e = /* @__PURE__ */ O(() => R(j).props.glyph ?? "★"), t = /* @__PURE__ */ O(() => R(j).props.icon ?? null), n = /* @__PURE__ */ O(() => R(j).props.image ?? null);
						jo(a, {
							get value() {
								return R(e);
							},
							get icon() {
								return R(t);
							},
							get image() {
								return R(n);
							},
							onpick: (e) => Vn(`edit:${R(j).blockId}`, (t) => {
								t.props.glyph = e, t.props.icon = null, t.props.image = null;
							}),
							onicon: (e) => Vn(`edit:${R(j).blockId}`, (t) => {
								t.props.icon = e, t.props.image = null;
							}),
							onimage: (e) => L("image", e)
						});
					}
					var o = F(a, 2), s = (e) => {
						var t = Og();
						G(t), I((e) => {
							K(t, R(j).props.glyph ?? ""), q(t, "title", e);
						}, [() => J("tip.icon.typeGlyph")]), z("change", t, (e) => L("glyph", e.target.value || "★")), V(e, t);
					}, c = (e) => {
						var t = _g(), n = P(t, !0);
						I((e, r) => {
							q(t, "title", e), H(n, r);
						}, [() => J("tip.icon.backToGlyph"), () => J("ui.removeDrawnIcon")]), z("click", t, () => L("icon", null)), V(e, t);
					};
					U(o, (e) => {
						R(j).props.icon ? e(c, -1) : e(s);
					}), T(i), T(n);
					var l = F(n, 2), u = (e) => {
						var t = kg(), n = M(t), r = F(n, 2), i = P(r, !0);
						T(t), I((e, r, a) => {
							q(t, "title", e), q(n, "src", R(j).props.image), q(n, "alt", r), H(i, a);
						}, [
							() => J("hint.icon.ownImage"),
							() => J("gp.ownIcon"),
							() => J("ui.removeOwnIcon")
						]), z("click", r, () => L("image", null)), V(e, t);
					};
					U(l, (e) => {
						R(j).props.image && e(u);
					}), I((e) => H(r, `${e ?? ""} `), [() => J("blocks.icon")]), V(e, t);
				};
				{
					let n = /* @__PURE__ */ O(() => J("blocks.icon")), r = /* @__PURE__ */ O(() => R(j).props.image ? J("gp.ownIcon") : R(j).props.icon ? J("menu.drawnIcon") : R(j).props.glyph ?? "★");
					l(e, () => "icon-icon", () => R(n), () => R(r), () => t);
				}
			}, ee = (e) => {
				var t = jg(), n = N(t), r = M(n), i = F(r);
				{
					let e = /* @__PURE__ */ O(() => R(j).props.collection ?? ""), t = /* @__PURE__ */ O(() => [["", J("common.choose")], ...R(ld).map((e) => [e, R(ud)[e]?.name ?? e])]);
					Y(i, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => L("collection", e || null)
					});
				}
				T(n);
				var a = F(n, 2), o = M(a), s = F(o);
				G(s), T(a);
				var c = F(a, 2), l = M(c);
				G(l);
				var u = F(l);
				T(c), I((e, t, i, c, d) => {
					q(n, "title", e), H(r, `${t ?? ""} `), q(a, "title", i), H(o, `${c ?? ""} `), K(s, R(j).props.limit ?? 6), Oi(l, R(j).props.newestFirst !== !1), H(u, ` ${d ?? ""}`);
				}, [
					() => J("tip.collection.source"),
					() => J("blocks.collection"),
					() => J("tip.collection.limit"),
					() => J("lbl.maxCount"),
					() => J("lbl.newestFirst")
				]), z("change", s, (e) => L("limit", Number(e.target.value))), z("change", l, (e) => L("newestFirst", e.target.checked)), V(e, t);
			}, ne = (e) => {
				var t = Pg(), n = N(t), r = M(n), i = F(r);
				{
					let e = /* @__PURE__ */ O(() => R(j).props.collection ?? ""), t = /* @__PURE__ */ O(() => [["", J("common.choose")], ...R(ld).filter((e) => R(ud)[e]?.kind === "products").map((e) => [e, R(ud)[e]?.name ?? e])]);
					Y(i, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => L("collection", e || null)
					});
				}
				T(n);
				var a = F(n, 2), o = (e) => {
					var t = Mg(), n = M(t), r = P(n, !0), i = F(n, 2), a = P(i, !0);
					T(t), I((e, t, o, s) => {
						q(n, "title", e), H(r, t), q(i, "title", o), H(a, s);
					}, [
						() => J("tip.product.addProduct"),
						() => J("ui.addProduct"),
						() => J("tip.product.editCatalog"),
						() => J("ui.editCatalog")
					]), z("click", n, () => Wd(R(j).props.collection)), z("click", i, () => {
						A(dd, R(j).props.collection, !0), A(Wt, "collections");
					}), V(e, t);
				}, s = (e) => {
					var t = Ng(), n = P(t, !0);
					I((e, r) => {
						q(t, "title", e), H(n, r);
					}, [() => J("tip.product.createCatalog"), () => J("ui.createCatalog")]), z("click", t, Hd), V(e, t);
				}, c = /* @__PURE__ */ O(() => !R(ld).some((e) => R(ud)[e]?.kind === "products"));
				U(a, (e) => {
					R(j).props.collection && R(ud)[R(j).props.collection]?.kind === "products" ? e(o) : R(c) && e(s, 1);
				});
				var l = F(a, 2), u = M(l), d = F(u);
				G(d), T(l);
				var f = F(l, 2), p = M(f), m = F(p);
				G(m), T(f), I((e, t, i, a, o, s) => {
					q(n, "title", e), H(r, `${t ?? ""} `), q(l, "title", i), H(u, `${a ?? ""} `), K(d, R(j).props.limit ?? 0), q(f, "title", o), H(p, `${s ?? ""} `), K(m, R(j).props.currency ?? "kr");
				}, [
					() => J("tip.product.source"),
					() => J("blocks.collection"),
					() => J("tip.collection.limit"),
					() => J("lbl.maxCount"),
					() => J("tip.product.currency"),
					() => J("lbl.currency")
				]), z("change", d, (e) => L("limit", Number(e.target.value))), z("change", m, (e) => L("currency", e.target.value)), V(e, t);
			}, re = (e) => {
				var t = Fg(), n = N(t), r = M(n), i = F(r);
				{
					let e = /* @__PURE__ */ O(() => R(j).props.href ?? ""), t = /* @__PURE__ */ O(() => [["", J("common.none")], ...R(D).pages.map((e) => [e.path, e.title])]);
					Y(i, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => L("href", e)
					});
				}
				T(n);
				var a = F(n, 2), o = M(a), s = F(o);
				G(s), T(a), I((e, t, i, c) => {
					q(n, "title", e), H(r, `${t ?? ""} `), q(a, "title", i), H(o, `${c ?? ""} `), K(s, R(j).props.currency ?? "kr");
				}, [
					() => J("tip.cart.checkout"),
					() => J("lbl.checkoutPage"),
					() => J("tip.product.currency"),
					() => J("lbl.currency")
				]), z("change", s, (e) => L("currency", e.target.value)), V(e, t);
			}, ie = (e) => {
				var t = Ig(), n = N(t), r = M(n), i = F(r);
				G(i), T(n);
				var a = F(n, 2), o = M(a), s = F(o);
				G(s), T(a);
				var c = F(a, 2), l = M(c), u = F(l);
				G(u), T(c);
				var d = F(c, 2), f = M(d);
				G(f);
				var p = F(f);
				T(d);
				var m = F(d, 2), h = M(m), g = F(h);
				G(g), T(m), I((e, t, _, v, y, b, x, S, ee, te) => {
					q(n, "title", e), H(r, `${t ?? ""} `), K(i, R(j).props.recipient ?? ""), q(a, "title", _), H(o, `${v ?? ""} `), K(s, R(j).props.endpoint ?? ""), q(c, "title", y), H(l, `${b ?? ""} `), K(u, R(j).props.vipps ?? ""), q(d, "title", x), Oi(f, R(j).props.vippsCheckout === !0), H(p, ` ${S ?? ""}`), q(m, "title", ee), H(h, `${te ?? ""} `), K(g, R(j).props.currency ?? "kr");
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
				]), z("change", i, (e) => L("recipient", e.target.value.trim())), z("change", s, (e) => L("endpoint", e.target.value.trim())), z("change", u, (e) => L("vipps", e.target.value.trim())), z("change", f, (e) => L("vippsCheckout", e.target.checked)), z("change", g, (e) => L("currency", e.target.value)), V(e, t);
			}, ae = (e) => {
				var t = Xm(), n = N(t), r = M(n), i = F(r);
				T(n), Qr(F(n, 2), 17, () => R(j).props.images ?? [], Jr, (e, t, n) => {
					var r = Lg(), i = M(r), a = M(i), o = F(a, 2), s = M(o);
					s.disabled = n === 0, W(s, () => C.up, !0), T(s);
					var c = F(s, 2);
					W(c, () => C.down, !0), T(c);
					var l = F(c, 2);
					W(l, () => C.cross, !0), T(l), T(o), T(i);
					var u = F(i, 2), d = M(u), f = F(d);
					G(f), T(u);
					var p = F(u, 2), m = M(p), h = F(m);
					G(h), T(p), T(r), I((e, r, o, s, u, p) => {
						q(i, "title", e), q(a, "src", R(t).src), c.disabled = n === R(j).props.images.length - 1, q(l, "title", r), H(d, `${o ?? ""} `), K(f, R(t).alt ?? ""), q(f, "placeholder", s), H(m, `${u ?? ""} `), K(h, R(t).href ?? ""), q(h, "placeholder", p);
					}, [
						() => J("hint.gallery"),
						() => J("tip.removeImage"),
						() => J("lbl.description"),
						() => J("ph.altShort"),
						() => J("lbl.link"),
						() => J("ph.galleryHref")
					]), z("click", s, () => vx(n, -1)), z("click", c, () => vx(n, 1)), z("click", l, () => yx(n)), z("change", f, (e) => bx(n, "alt", e.target.value)), z("change", h, (e) => bx(n, "href", e.target.value || null)), V(e, r);
				}), I((e, t) => {
					q(n, "title", e), H(r, `${t ?? ""} `);
				}, [() => J("tip.gallery.addImages"), () => J("ui.addImages")]), z("change", i, gx), V(e, t);
			}, oe = (e) => {
				let t = (e) => {
					var t = $m(), n = N(t), r = M(n);
					Y(F(r), {
						get value() {
							return R(j).props.kind;
						},
						get options() {
							return ji;
						},
						onchange: (e) => L("kind", e)
					}), T(n);
					var i = F(n, 2), a = (e) => {
						var t = Rh(), n = M(t), r = F(n);
						G(r), T(t), I((e, i) => {
							q(t, "title", e), H(n, `${i ?? ""} `), K(r, R(j).props.label ?? "");
						}, [() => J("tip.shape.label"), () => J("lbl.shapeLabel")]), z("change", r, (e) => L("label", e.target.value.trim() || void 0)), V(e, t);
					};
					U(i, (e) => {
						R(j).props.kind === "line" && e(a);
					}), I((e) => H(r, `${e ?? ""} `), [() => J("blocks.shape")]), V(e, t);
				};
				{
					let n = /* @__PURE__ */ O(() => J("blocks.shape")), r = /* @__PURE__ */ O(() => ji.find(([e]) => e === R(j).props.kind)?.[1] ?? "");
					l(e, () => "shape-shape", () => R(n), () => R(r), () => t);
				}
			}, se = (e) => {
				let t = /* @__PURE__ */ O(() => sx[R(j).type] ?? R(ox).find((e) => e.type === R(j).type)?.fields ?? []);
				var n = Lr(), r = N(n), i = (e) => {
					var n = Lr();
					Qr(N(n), 17, () => R(t), (e) => e.key, (e, t) => {
						var n = Lr(), r = N(n), i = (e) => {
							let n = /* @__PURE__ */ O(() => `${R(j).blockId}:${R(t).key}`);
							var r = Rg(), i = N(r), a = M(i), o = F(a);
							G(o), T(i);
							var s = F(i, 2), c = P(s, !0), l = F(s, 2), u = (e) => {
								var t = Zm();
								let r;
								var i = P(t, !0);
								I(() => {
									r = xi(t, 1, "panel-hint svelte-1n46o8q", null, r, { "place-error": Ar[R(n)].err }), H(i, Ar[R(n)].text);
								}), V(e, t);
							};
							U(l, (e) => {
								Ar[R(n)] && e(u);
							}), I((e) => {
								H(a, `${R(t).label ?? ""} `), q(o, "placeholder", R(t).placeholder), K(o, kr[R(n)] ?? R(j).props[R(t).key] ?? ""), s.disabled = R(jr), H(c, e);
							}, [() => J("props.place.search")]), z("input", o, (e) => {
								kr[R(n)] = e.target.value;
							}), z("keydown", o, (e) => {
								e.key === "Enter" && Pr(R(t));
							}), z("click", s, () => Pr(R(t))), V(e, r);
						}, a = (e) => {
							var n = zg(), r = M(n), i = F(r);
							G(i), T(n), I(() => {
								H(r, `${R(t).label ?? ""} `), q(i, "min", R(t).min), q(i, "max", R(t).max), q(i, "step", R(t).step ?? 1), K(i, R(j).props[R(t).key]);
							}), z("change", i, (e) => L(R(t).key, Nr(R(t), Number(e.target.value)))), V(e, n);
						}, o = (e) => {
							var n = Gh(), r = M(n);
							G(r);
							var i = F(r);
							T(n), I((e) => {
								Oi(r, e), H(i, ` ${R(t).label ?? ""}`);
							}, [() => !!R(j).props[R(t).key]]), z("change", r, (e) => L(R(t).key, e.target.checked)), V(e, n);
						}, s = (e) => {
							var n = vh(), r = M(n), i = F(r);
							{
								let e = /* @__PURE__ */ O(() => (R(t).options ?? []).map((e) => [e.value, e.label]));
								Y(i, {
									get value() {
										return R(j).props[R(t).key];
									},
									get options() {
										return R(e);
									},
									onchange: (e) => L(R(t).key, e)
								});
							}
							T(n), I(() => H(r, `${R(t).label ?? ""} `)), V(e, n);
						}, c = (e) => {
							var n = Bg(), r = M(n), i = F(r);
							G(i), T(n), I(() => {
								H(r, `${R(t).label ?? ""} `), q(i, "placeholder", R(t).placeholder), K(i, R(j).props[R(t).key] ?? "");
							}), z("change", i, (e) => L(R(t).key, e.target.value)), V(e, n);
						};
						U(r, (e) => {
							R(t).type === "place" ? e(i) : R(t).type === "number" ? e(a, 1) : R(t).type === "toggle" ? e(o, 2) : R(t).type === "select" ? e(s, 3) : e(c, -1);
						}), V(e, n);
					}), V(e, n);
				}, a = (e) => {
					var t = _g(), n = P(t, !0);
					I((e, r) => {
						q(t, "title", e), H(n, r);
					}, [() => J("hint.pluginBlock"), () => J("ui.settings")]), z("click", t, () => ot?.sendOpenConfig(R(j).blockId)), V(e, t);
				};
				U(r, (e) => {
					R(t).length ? e(i) : e(a, -1);
				}), V(e, n);
			};
			U(n, (e) => {
				R(j).type === "text" ? e(r) : R(j).type === "form" ? e(i, 1) : R(j).type === "calendar" ? e(a, 2) : R(j).type === "faq" ? e(o, 3) : R(j).type === "timeline" ? e(s, 4) : R(j).type === "quote" ? e(u, 5) : R(j).type === "stats" ? e(d, 6) : R(j).type === "ribbon" ? e(f, 7) : R(j).type === "table" ? e(p, 8) : R(j).type === "share" ? e(m, 9) : R(j).type === "countdown" ? e(h, 10) : R(j).type === "audio" ? e(_, 11) : R(j).type === "button" ? e(v, 12) : R(j).type === "image" ? e(y, 13) : R(j).type === "video" ? e(b, 14) : R(j).type === "icon" ? e(S, 15) : R(j).type === "collection" ? e(ee, 16) : R(j).type === "product" ? e(ne, 17) : R(j).type === "cart" ? e(re, 18) : R(j).type === "checkout" ? e(ie, 19) : R(j).type === "gallery" ? e(ae, 20) : R(j).type === "shape" ? e(oe, 21) : e(se, -1);
			}), V(e, t);
		}, a = (e) => {
			var t = Lr(), n = N(t), r = (e) => {
				let t = (e) => {
					var t = Vg(), n = M(t), r = M(n), i = F(r);
					{
						let e = /* @__PURE__ */ O(() => R(j).props.align ?? "left"), t = /* @__PURE__ */ O(() => [
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
							onchange: (e) => L("align", e)
						});
					}
					T(n);
					var a = F(n, 2);
					c(a, () => "align"), T(t), I((e) => H(r, `${e ?? ""} `), [() => J("lbl.align")]), V(e, t);
				}, n = (e) => {
					var t = Hg(), n = N(t), r = M(n), i = M(r);
					G(i);
					var a = F(i);
					T(r);
					var o = F(r, 2);
					c(o, () => "textBox"), T(n);
					var l = F(n, 2), u = (e) => {
						s(e);
					};
					U(l, (e) => {
						R(j).props.box && e(u);
					}), I((e, t) => {
						Oi(i, e), H(a, ` ${t ?? ""}`);
					}, [() => !!R(j).props.box, () => J("lbl.textBoxToggle")]), z("change", i, (e) => L("box", e.target.checked)), V(e, t);
				};
				var r = Sg(), i = N(r);
				{
					let e = /* @__PURE__ */ O(() => J("lbl.align")), n = /* @__PURE__ */ O(() => ({
						left: J("common.left"),
						center: J("common.center"),
						right: J("common.right")
					})[R(j).props.align ?? "left"]), r = /* @__PURE__ */ O(() => Un("text-align", { align: "left" }));
					l(i, () => "text-align", () => R(e), () => R(n), () => t, () => R(r));
				}
				var a = F(i, 2);
				{
					let e = /* @__PURE__ */ O(() => J("group.textBox")), t = /* @__PURE__ */ O(() => R(j).props.box ? J("common.on") : J("common.off")), r = /* @__PURE__ */ O(() => Un("text-box", {
						box: !1,
						boxStyle: null
					}));
					l(a, () => "text-box", () => R(e), () => R(t), () => n, () => R(r));
				}
				V(e, r);
			}, i = (e) => {
				let t = (e) => {
					var t = Lr(), n = N(t), r = (e) => {
						let t = /* @__PURE__ */ O(() => jc(R(j).props));
						var n = Lr();
						Qr(N(n), 17, () => Ac(R(j).props.design).filter((e) => Mc(e, R(t))), (e) => e.key, (e, n) => {
							var r = Lr(), i = N(r), a = (e) => {
								var r = Gh(), i = M(r);
								G(i);
								var a = F(i);
								T(r), I((e) => {
									Oi(i, R(t)[R(n).key]), H(a, ` ${e ?? ""}`);
								}, [() => J(R(n).labelKey)]), z("change", i, (e) => sr(R(n), e.target.checked)), V(e, r);
							}, o = (e) => {
								var r = Ug(), i = M(r), a = F(i);
								G(a), T(r), I((e, o, s) => {
									q(r, "title", e), H(i, `${o ?? ""} `), K(a, R(t)[R(n).key] ?? ""), q(a, "placeholder", s);
								}, [
									() => J("tip.calendar.opt.hours"),
									() => J(R(n).labelKey),
									() => J("calendar.opt.columns.auto")
								]), z("change", a, (e) => sr(R(n), e.target.value === "" ? null : Math.max(0, Math.min(24, Math.round(Number(e.target.value)) || 0)))), V(e, r);
							}, s = (e) => {
								var r = Wg(), i = M(r), a = P(i, !0), o = F(i, 2);
								{
									let e = /* @__PURE__ */ O(() => R(n).values.map((e) => [e, cr(R(n), e)]));
									Y(o, {
										get value() {
											return R(t)[R(n).key];
										},
										get options() {
											return R(e);
										},
										onchange: (e) => sr(R(n), e)
									});
								}
								T(r), I((e) => H(a, e), [() => J(R(n).labelKey)]), V(e, r);
							}, c = (e) => {
								{
									let r = /* @__PURE__ */ O(() => J(R(n).labelKey)), i = /* @__PURE__ */ O(() => R(n).values.map((e) => [e, cr(R(n), e)]));
									lc(e, {
										get label() {
											return R(r);
										},
										get value() {
											return R(t)[R(n).key];
										},
										get options() {
											return R(i);
										},
										onchange: (e) => sr(R(n), e)
									});
								}
							};
							U(i, (e) => {
								R(n).kind === "switch" ? e(a) : R(n).kind === "hour" ? e(o, 1) : R(n).values.length > 4 ? e(s, 2) : e(c, -1);
							}), V(e, r);
						}), V(e, n);
					}, i = /* @__PURE__ */ O(() => Ac(R(j).props.design).length);
					U(n, (e) => {
						R(i) && e(r);
					}), V(e, t);
				}, n = (e) => {
					var t = Lr();
					Qr(N(t), 19, () => lr(R(a)), (e) => e.section, (e, t, n) => {
						var r = qg(), i = N(r), a = (e) => {
							var n = Gg(), r = P(n, !0);
							I((e) => H(r, e), [() => J(`calendar.section.${R(t).section}`)]), V(e, n);
						};
						U(i, (e) => {
							R(n) > 0 && e(a);
						});
						var o = F(i, 2);
						Qr(o, 21, () => R(t).slots, (e) => e.key, (e, t) => {
							var n = Kg(), r = M(n);
							{
								let e = /* @__PURE__ */ O(() => R(j).props.colors?.[R(t).key] ?? ""), n = /* @__PURE__ */ O(co), i = /* @__PURE__ */ O(() => J(R(t).labelKey));
								Na(r, {
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
									onchange: (e) => mr(R(t).key, e || "")
								});
							}
							var i = P(F(r, 2), !0);
							T(n), I((e, t) => {
								q(n, "title", e), H(i, t);
							}, [() => J("tip.calendar.slot"), () => J(R(t).labelKey)]), V(e, n);
						}), T(o), V(e, r);
					}), V(e, t);
				}, r = (e) => {
					var t = ig(), n = N(t), r = M(n);
					G(r);
					var i = F(r);
					T(n);
					var o = F(n, 2), s = (e) => {
						var t = Wg(), n = M(t), r = P(n, !0), i = F(n, 2);
						{
							let e = /* @__PURE__ */ O(() => R(j).props.stripe?.color ?? ""), t = /* @__PURE__ */ O(co), n = /* @__PURE__ */ O(() => J("calendar.stripeColor"));
							Na(i, {
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
								onchange: (e) => hr({ color: e || void 0 })
							});
						}
						T(t), I((e, n) => {
							q(t, "title", e), H(r, n);
						}, [() => J("tip.calendar.stripeColor"), () => J("calendar.stripeColor")]), V(e, t);
					}, c = /* @__PURE__ */ O(() => Bc(R(a), R(j).props.stripe).show);
					U(o, (e) => {
						R(c) && e(s);
					}), I((e, t, a) => {
						q(n, "title", e), Oi(r, t), H(i, ` ${a ?? ""}`);
					}, [
						() => J("tip.calendar.stripe"),
						() => Bc(R(a), R(j).props.stripe).show,
						() => J("calendar.stripe")
					]), z("change", r, (e) => hr({ show: e.target.checked })), V(e, t);
				}, i = (e) => {
					var t = Jg(), n = N(t);
					{
						let e = /* @__PURE__ */ O(() => pc.map((e) => [e, J(`calendar.field.${e}`)]));
						Y(n, {
							get value() {
								return R(ar);
							},
							get options() {
								return R(e);
							},
							onchange: (e) => A(ar, e, !0)
						});
					}
					var r = F(n, 2), i = M(r), a = F(i);
					{
						let e = /* @__PURE__ */ O(() => ur().font ?? ""), t = /* @__PURE__ */ O(() => [["", J("common.inherit")], ...Bm.map(([e, t]) => [t, J(e)])]);
						Y(a, {
							get value() {
								return R(e);
							},
							get options() {
								return R(t);
							},
							onchange: (e) => _r({ font: e || void 0 })
						});
					}
					T(r);
					var o = F(r, 2), s = M(o), c = F(s);
					G(c), T(o);
					var l = F(o, 2);
					{
						let e = /* @__PURE__ */ O(() => J("calendar.fieldWeight")), t = /* @__PURE__ */ O(() => ur().bold === !0 ? "bold" : ur().bold === !1 ? "normal" : ""), n = /* @__PURE__ */ O(() => [
							["", J("common.inherit")],
							["bold", J("format.bold")],
							["normal", J("calendar.fieldNormal")]
						]);
						lc(l, {
							get label() {
								return R(e);
							},
							get value() {
								return R(t);
							},
							get options() {
								return R(n);
							},
							onchange: (e) => _r({ bold: e === "bold" || e !== "normal" && void 0 })
						});
					}
					var u = F(l, 2), d = M(u);
					let f;
					var p = P(M(d), !0);
					T(d);
					var m = F(d, 2);
					let h;
					var g = P(M(m), !0);
					T(m);
					var _ = F(m, 2);
					{
						let e = /* @__PURE__ */ O(() => ur().color ?? ""), t = /* @__PURE__ */ O(co), n = /* @__PURE__ */ O(() => J("calendar.fieldColor"));
						Na(_, {
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
							onchange: (e) => _r({ color: e || void 0 })
						});
					}
					T(u), I((e, t, n, r, a, l, u, _, v, y, b) => {
						H(i, `${e ?? ""} `), q(o, "title", t), H(s, `${n ?? ""} `), q(c, "min", Vc.min), q(c, "max", Vc.max), K(c, r), q(c, "placeholder", a), f = xi(d, 1, "tbtn svelte-1n46o8q", null, f, { active: l }), q(d, "title", u), H(p, _), h = xi(m, 1, "tbtn svelte-1n46o8q", null, h, { active: v }), q(m, "title", y), H(g, b);
					}, [
						() => J("calendar.fieldFont"),
						() => J("tip.calendar.fieldSize"),
						() => J("calendar.fieldSize"),
						() => ur().size ?? "",
						() => J("common.inherit"),
						() => ur().italic === !0,
						() => J("format.italic"),
						() => J("format.italicLetter"),
						() => ur().underline === !0,
						() => J("calendar.fieldUnderline"),
						() => J("format.underlineLetter")
					]), z("change", c, (e) => _r({ size: e.target.value === "" ? void 0 : Math.max(Vc.min, Math.min(Vc.max, Number(e.target.value) || Vc.min)) })), z("click", d, () => _r({ italic: !ur().italic || void 0 })), z("click", m, () => _r({ underline: !ur().underline || void 0 })), V(e, t);
				}, a = /* @__PURE__ */ O(() => Nc(R(j).props.design)), o = /* @__PURE__ */ O(Dn);
				var s = Yg(), u = N(s), d = M(u), f = M(d), p = P(f, !0), m = P(F(f), !0);
				T(d);
				var h = F(d, 2);
				c(h, () => "design"), T(u);
				var g = F(u, 2);
				{
					let e = /* @__PURE__ */ O(() => J("calendar.section.options"));
					l(g, () => "cal-opts", () => R(e), () => R(o).opts, () => t, () => R(o).optsReset);
				}
				var _ = F(g, 2);
				{
					let e = /* @__PURE__ */ O(() => J("calendar.colors"));
					l(_, () => "cal-colors", () => R(e), () => R(o).colors, () => n, () => R(o).colorsReset);
				}
				var v = F(_, 2);
				{
					let e = /* @__PURE__ */ O(() => J("calendar.stripe"));
					l(v, () => "cal-stripe", () => R(e), () => R(o).stripe, () => r, () => R(o).stripeReset);
				}
				var y = F(v, 2);
				{
					let e = /* @__PURE__ */ O(() => J("calendar.fieldStyle"));
					l(y, () => "cal-fields", () => R(e), () => R(o).fields, () => i, () => R(o).fieldsReset);
				}
				I((e, t, n) => {
					q(d, "title", e), H(p, t), H(m, n);
				}, [
					() => J("tip.calendar.design"),
					() => J("calendar.design"),
					() => J(R(a).labelKey)
				]), z("click", d, () => A(On, { mode: "set" }, !0)), V(e, s);
			}, a = (e) => {
				var t = Zg(), n = N(t);
				{
					let e = /* @__PURE__ */ O(() => J("lbl.variant")), t = /* @__PURE__ */ O(() => R(j).props.variant === "list" ? "list" : "cards"), r = /* @__PURE__ */ O(() => Zu.map((e) => [e, J(`opt.faqVariant.${e}`)]));
					lc(n, {
						get label() {
							return R(e);
						},
						get value() {
							return R(t);
						},
						get options() {
							return R(r);
						},
						onchange: (e) => L("variant", e)
					});
				}
				var r = F(n, 2), i = (e) => {
					var t = Xg(), n = N(t), r = P(n, !0), i = F(n, 2);
					s(i), I((e) => H(r, e), [() => J("lbl.cardStyle")]), V(e, t);
				};
				U(r, (e) => {
					R(j).props.variant !== "list" && e(i);
				}), je(2), V(e, t);
			}, o = (e) => {
				var t = Qg(), n = N(t), r = M(n), i = F(r);
				{
					let e = /* @__PURE__ */ O(() => R(j).props.variant ?? "left"), t = /* @__PURE__ */ O(() => [["left", J("opt.timeline.left")], ["alternating", J("opt.timeline.alternating")]]);
					Y(i, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => L("variant", e)
					});
				}
				T(n);
				var a = F(n, 2), o = M(a), s = F(o);
				{
					let e = /* @__PURE__ */ O(() => R(j).props.marker ?? "filled"), t = /* @__PURE__ */ O(() => [["filled", J("opt.timeline.filled")], ["ring", J("opt.timeline.ring")]]);
					Y(s, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => L("marker", e)
					});
				}
				T(a);
				var c = F(a, 2), l = M(c), u = F(l);
				{
					let e = /* @__PURE__ */ O(() => R(j).props.accent ?? "accent"), t = /* @__PURE__ */ O(co);
					Na(u, {
						get value() {
							return R(e);
						},
						get tokens() {
							return R(t);
						},
						onchange: (e) => L("accent", e === "accent" ? null : e)
					});
				}
				T(c), je(2), I((e, t, n) => {
					H(r, `${e ?? ""} `), H(o, `${t ?? ""} `), H(l, `${n ?? ""} `);
				}, [
					() => J("lbl.variant"),
					() => J("lbl.timelineMarker"),
					() => J("lbl.color")
				]), V(e, t);
			}, u = (e) => {
				var t = e_(), n = N(t), r = M(n), i = F(r);
				{
					let e = /* @__PURE__ */ O(() => R(j).props.variant ?? "large"), t = /* @__PURE__ */ O(() => [["large", J("opt.quote.large")], ["short", J("opt.quote.short")]]);
					Y(i, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => L("variant", e)
					});
				}
				T(n);
				var a = F(n, 2), o = (e) => {
					var t = $g(), n = N(t), r = M(n), i = F(r);
					T(n);
					var a = F(n, 2), o = (e) => {
						var t = _g(), n = P(t, !0);
						I((e) => H(n, e), [() => J("ui.quotePortraitRemove")]), z("click", t, () => L("image", "")), V(e, t);
					};
					U(a, (e) => {
						R(j).props.image && e(o);
					}), I((e) => H(r, `${e ?? ""} `), [() => J("ui.quotePortrait")]), z("change", i, ki), V(e, t);
				}, s = (e) => {
					var t = Gh(), n = M(t);
					G(n);
					var r = F(n);
					T(t), I((e, i) => {
						q(t, "title", e), Oi(n, R(j).props.card === !0), H(r, ` ${i ?? ""}`);
					}, [() => J("tip.quote.card"), () => J("lbl.quoteCard")]), z("change", n, (e) => L("card", e.target.checked)), V(e, t);
				};
				U(a, (e) => {
					R(j).props.variant === "short" ? e(o) : e(s, -1);
				});
				var c = F(a, 2), l = M(c), u = F(l);
				{
					let e = /* @__PURE__ */ O(() => R(j).props.accent ?? "accent"), t = /* @__PURE__ */ O(co);
					Na(u, {
						get value() {
							return R(e);
						},
						get tokens() {
							return R(t);
						},
						onchange: (e) => L("accent", e === "accent" ? null : e)
					});
				}
				T(c), je(2), I((e, t) => {
					H(r, `${e ?? ""} `), H(l, `${t ?? ""} `);
				}, [() => J("lbl.variant"), () => J("lbl.color")]), V(e, t);
			}, d = (e) => {
				var t = t_(), n = N(t);
				{
					let e = /* @__PURE__ */ O(() => J("lbl.variant")), t = /* @__PURE__ */ O(() => Xu.includes(R(j).props.variant) ? R(j).props.variant : "plain"), r = /* @__PURE__ */ O(() => Xu.map((e) => [e, J(`opt.statVariant.${e}`)]));
					lc(n, {
						get label() {
							return R(e);
						},
						get value() {
							return R(t);
						},
						get options() {
							return R(r);
						},
						onchange: (e) => L("variant", e)
					});
				}
				var r = F(n, 2), i = M(r);
				G(i);
				var a = F(i);
				T(r), je(2), I((e, t) => {
					q(r, "title", e), Oi(i, R(j).props.countUp !== !1), H(a, ` ${t ?? ""}`);
				}, [() => J("tip.stat.countUp"), () => J("lbl.statCountUp")]), z("change", i, (e) => L("countUp", e.target.checked)), V(e, t);
			}, f = (e) => {
				let t = /* @__PURE__ */ O(() => R(j).props.motion ?? "roll");
				var n = s_(), r = N(n), i = M(r), a = P(i, !0), o = F(i, 2);
				{
					let e = /* @__PURE__ */ O(() => [
						["roll", J("opt.ribbonMotion.roll")],
						["sway", J("opt.ribbonMotion.sway")],
						["step", J("opt.ribbonMotion.step")],
						["none", J("opt.ribbonMotion.none")]
					]);
					Y(o, {
						filled: !0,
						get value() {
							return R(t);
						},
						get options() {
							return R(e);
						},
						onchange: (e) => L("motion", e)
					});
				}
				var s = F(o, 2), c = (e) => {
					var n = i_(), r = N(n), i = P(r, !0), a = F(r, 2);
					{
						let e = /* @__PURE__ */ O(() => J("lbl.ribbonDirection")), t = /* @__PURE__ */ O(() => R(j).props.direction ?? "left"), n = /* @__PURE__ */ O(() => [["left", J("opt.ribbonDir.left")], ["right", J("opt.ribbonDir.right")]]);
						lc(a, {
							get label() {
								return R(e);
							},
							get value() {
								return R(t);
							},
							get options() {
								return R(n);
							},
							onchange: (e) => L("direction", e)
						});
					}
					var o = F(a, 2), s = (e) => {
						var t = n_(), n = M(t), r = P(n, !0), i = F(n, 2);
						G(i);
						var a = P(F(i, 2));
						T(t), I((e, n) => {
							q(t, "title", e), H(r, n), K(i, R(j).props.dwell ?? 2.5), H(a, `${R(j).props.dwell ?? 2.5 ?? ""} s`);
						}, [() => J("tip.ribbon.dwell"), () => J("lbl.ribbonDwell")]), z("input", i, (e) => L("dwell", e.target.valueAsNumber)), V(e, t);
					}, c = (e) => {
						var t = r_(), n = M(t), r = P(n, !0), i = F(n, 2);
						G(i);
						var a = P(F(i, 2), !0);
						T(t), I((e, n) => {
							q(t, "title", e), H(r, n), K(i, R(j).props.speed ?? 60), H(a, R(j).props.speed ?? 60);
						}, [() => J("tip.ribbon.speed"), () => J("lbl.ribbonSpeed")]), z("input", i, (e) => L("speed", e.target.valueAsNumber)), V(e, t);
					};
					U(o, (e) => {
						R(t) === "step" ? e(s) : e(c, -1);
					});
					var l = F(o, 2), u = M(l);
					G(u);
					var d = F(u);
					T(l);
					var f = F(l, 2), p = M(f);
					G(p);
					var m = F(p);
					T(f), I((e, t, n, a, o, s) => {
						q(r, "title", e), H(i, t), q(l, "title", n), Oi(u, R(j).props.pauseOnHover !== !1), H(d, ` ${a ?? ""}`), q(f, "title", o), Oi(p, R(j).props.fade !== !1), H(m, ` ${s ?? ""}`);
					}, [
						() => J("tip.ribbon.play"),
						() => J("ui.ribbonPlay"),
						() => J("tip.ribbon.pause"),
						() => J("lbl.ribbonPause"),
						() => J("tip.ribbon.fade"),
						() => J("lbl.ribbonFade")
					]), z("click", r, () => ot?.sendDemoMotion()), z("change", u, (e) => L("pauseOnHover", e.target.checked)), z("change", p, (e) => L("fade", e.target.checked)), V(e, n);
				};
				U(s, (e) => {
					R(t) !== "none" && e(c);
				}), T(r);
				var l = F(r, 2), u = M(l), d = P(u, !0), f = F(u, 2), p = M(f), m = P(p, !0), h = F(p, 2);
				{
					let e = /* @__PURE__ */ O(() => R(j).props.above ?? "none");
					Y(h, {
						filled: !0,
						get value() {
							return R(e);
						},
						get options() {
							return R(ee);
						},
						onchange: (e) => L("above", e)
					});
				}
				T(f);
				var g = F(f, 2), _ = (e) => {
					var t = vh(), n = M(t), r = F(n);
					{
						let e = /* @__PURE__ */ O(() => R(j).props.aboveColor ?? Yu(R(j).props)), t = /* @__PURE__ */ O(co), n = /* @__PURE__ */ O(() => J("tip.ribbon.stripeColor"));
						Na(r, {
							get value() {
								return R(e);
							},
							get tokens() {
								return R(t);
							},
							get label() {
								return R(n);
							},
							onchange: (e) => L("aboveColor", e)
						});
					}
					T(t), I((e, r) => {
						q(t, "title", e), H(n, `${r ?? ""} `);
					}, [() => J("tip.ribbon.stripeColor"), () => J("lbl.colour")]), V(e, t);
				};
				U(g, (e) => {
					(R(j).props.above ?? "none") !== "none" && e(_);
				});
				var v = F(g, 2), y = M(v), b = P(y, !0), x = F(y, 2);
				{
					let e = /* @__PURE__ */ O(() => R(j).props.main ?? "text");
					Y(x, {
						filled: !0,
						get value() {
							return R(e);
						},
						get options() {
							return R(S);
						},
						onchange: (e) => L("main", e)
					});
				}
				T(v);
				var te = F(v, 2), ne = M(te), re = P(ne, !0), ie = F(ne, 2);
				{
					let e = /* @__PURE__ */ O(() => R(j).props.below ?? "none");
					Y(ie, {
						filled: !0,
						get value() {
							return R(e);
						},
						get options() {
							return R(ee);
						},
						onchange: (e) => L("below", e)
					});
				}
				T(te);
				var ae = F(te, 2), C = (e) => {
					var t = vh(), n = M(t), r = F(n);
					{
						let e = /* @__PURE__ */ O(() => R(j).props.belowColor ?? Yu(R(j).props)), t = /* @__PURE__ */ O(co), n = /* @__PURE__ */ O(() => J("tip.ribbon.stripeColor"));
						Na(r, {
							get value() {
								return R(e);
							},
							get tokens() {
								return R(t);
							},
							get label() {
								return R(n);
							},
							onchange: (e) => L("belowColor", e)
						});
					}
					T(t), I((e, r) => {
						q(t, "title", e), H(n, `${r ?? ""} `);
					}, [() => J("tip.ribbon.stripeColor"), () => J("lbl.colour")]), V(e, t);
				};
				U(ae, (e) => {
					(R(j).props.below ?? "none") !== "none" && e(C);
				});
				var oe = F(ae, 2), se = (e) => {
					var t = a_(), n = N(t);
					{
						let e = /* @__PURE__ */ O(() => J("lbl.ribbonStripePlace")), t = /* @__PURE__ */ O(() => J("tip.ribbon.stripePlace")), r = /* @__PURE__ */ O(() => R(j).props.stripePlace ?? "stack"), i = /* @__PURE__ */ O(() => [["stack", J("opt.ribbonPlace.stack")], ["edge", J("opt.ribbonPlace.edge")]]);
						lc(n, {
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
							onchange: (e) => L("stripePlace", e)
						});
					}
					var r = F(n, 2), i = M(r), a = P(i, !0), o = F(i, 2);
					G(o);
					var s = P(F(o, 2));
					T(r), I((e, t) => {
						q(r, "title", e), H(a, t), K(o, R(j).props.thickness ?? 8), H(s, `${R(j).props.thickness ?? 8 ?? ""} px`);
					}, [() => J("tip.ribbon.thickness"), () => J("lbl.ribbonThickness")]), z("input", o, (e) => L("thickness", e.target.valueAsNumber)), V(e, t);
				};
				U(oe, (e) => {
					((R(j).props.above ?? "none") !== "none" || (R(j).props.below ?? "none") !== "none") && e(se);
				}), T(l);
				var ce = F(l, 2), le = M(ce), ue = P(le, !0), de = F(le, 2);
				{
					let e = /* @__PURE__ */ O(() => J("lbl.ribbonWidth")), t = /* @__PURE__ */ O(() => R(j).props.width ?? "content"), n = /* @__PURE__ */ O(() => [["content", J("opt.ribbonWidth.content")], ["page", J("opt.ribbonWidth.page")]]);
					lc(de, {
						get label() {
							return R(e);
						},
						get value() {
							return R(t);
						},
						get options() {
							return R(n);
						},
						onchange: (e) => L("width", e)
					});
				}
				var fe = F(de, 2);
				{
					let e = /* @__PURE__ */ O(() => J("lbl.ribbonVariant")), t = /* @__PURE__ */ O(() => R(j).props.variant ?? "band"), n = /* @__PURE__ */ O(() => [["band", J("opt.ribbonVariant.band")], ["plain", J("opt.ribbonVariant.plain")]]);
					lc(fe, {
						get label() {
							return R(e);
						},
						get value() {
							return R(t);
						},
						get options() {
							return R(n);
						},
						onchange: (e) => L("variant", e)
					});
				}
				var pe = F(fe, 2), me = M(pe), he = P(me, !0), ge = F(me, 2);
				G(ge);
				var w = P(F(ge, 2));
				T(pe), T(ce);
				var _e = F(ce, 2), ve = M(_e), ye = P(ve, !0), be = F(ve, 2), xe = M(be), Se = P(xe, !0), Ce = F(xe, 2);
				{
					let e = /* @__PURE__ */ O(() => R(j).props.size ?? "md"), t = /* @__PURE__ */ O(() => [
						["sm", J("opt.size.sm")],
						["md", J("opt.size.md")],
						["lg", J("opt.size.lg")],
						["xl", J("opt.size.xl")]
					]);
					Y(Ce, {
						filled: !0,
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => L("size", e)
					});
				}
				T(be);
				var we = F(be, 2), Te = M(we);
				G(Te);
				var Ee = F(Te);
				T(we);
				var De = F(we, 2), Oe = M(De);
				G(Oe);
				var ke = F(Oe);
				T(De);
				var Ae = F(De, 2), Me = M(Ae);
				G(Me);
				var Ne = F(Me);
				T(Ae);
				var Pe = F(Ae, 2), Fe = M(Pe), Ie = P(Fe, !0), Le = F(Fe, 2);
				G(Le);
				var Re = P(F(Le, 2));
				T(Pe), T(_e);
				var ze = F(_e, 2), Be = M(ze), Ve = P(Be, !0), He = F(Be, 2), Ue = M(He), We = (e) => {
					var t = o_(), n = M(t);
					{
						let e = /* @__PURE__ */ O(() => R(j).props.bg ?? "accent"), t = /* @__PURE__ */ O(co), r = /* @__PURE__ */ O(() => J("tip.ribbon.bg"));
						Na(n, {
							get value() {
								return R(e);
							},
							get tokens() {
								return R(t);
							},
							get label() {
								return R(r);
							},
							onchange: (e) => L("bg", e)
						});
					}
					var r = P(F(n, 2), !0);
					T(t), I((e, n) => {
						q(t, "title", e), H(r, n);
					}, [() => J("tip.ribbon.bg"), () => J("lbl.background")]), V(e, t);
				};
				U(Ue, (e) => {
					(R(j).props.variant ?? "band") !== "plain" && e(We);
				});
				var Ge = F(Ue, 2), Ke = M(Ge);
				{
					let e = /* @__PURE__ */ O(() => R(j).props.color ?? ((R(j).props.variant ?? "band") === "plain" ? "text" : "accent-text")), t = /* @__PURE__ */ O(co), n = /* @__PURE__ */ O(() => J("tip.ribbon.color"));
					Na(Ke, {
						get value() {
							return R(e);
						},
						get tokens() {
							return R(t);
						},
						get label() {
							return R(n);
						},
						onchange: (e) => L("color", e)
					});
				}
				var qe = P(F(Ke, 2), !0);
				T(Ge), T(He), T(ze), je(2), I((e, t, n, r, i, o, s, c, l, u, p, h, g, _, y, x, S, ee, ne, ie, ae, C, oe, se) => {
					H(a, e), H(d, t), q(f, "title", n), H(m, r), q(v, "title", i), H(b, o), q(te, "title", s), H(re, c), H(ue, l), q(pe, "title", u), H(he, p), K(ge, R(j).props.tilt ?? 0), H(w, `${R(j).props.tilt ?? 0 ?? ""}°`), H(ye, h), H(Se, g), q(we, "title", _), Oi(Te, R(j).props.caps === !0), H(Ee, ` ${y ?? ""}`), q(De, "title", x), Oi(Oe, R(j).props.weight === "bold"), H(ke, ` ${S ?? ""}`), q(Ae, "title", ee), Oi(Me, R(j).props.outline === !0), H(Ne, ` ${ne ?? ""}`), q(Pe, "title", ie), H(Ie, ae), K(Le, R(j).props.gap ?? 40), H(Re, `${R(j).props.gap ?? 40 ?? ""} px`), H(Ve, C), q(Ge, "title", oe), H(qe, se);
				}, [
					() => J("lbl.ribbonMotion"),
					() => J("lbl.ribbonStripes"),
					() => J("tip.ribbon.above"),
					() => J("lbl.ribbonAbove"),
					() => J("tip.ribbon.main"),
					() => J("lbl.ribbonMain"),
					() => J("tip.ribbon.below"),
					() => J("lbl.ribbonBelow"),
					() => J("lbl.ribbonShape"),
					() => J("tip.ribbon.tilt"),
					() => J("lbl.ribbonTilt"),
					() => J("lbl.ribbonText"),
					() => J("lbl.size"),
					() => J("tip.ribbon.caps"),
					() => J("lbl.ribbonCaps"),
					() => J("tip.ribbon.bold"),
					() => J("lbl.ribbonBold"),
					() => J("tip.ribbon.outline"),
					() => J("lbl.ribbonOutline"),
					() => J("tip.ribbon.gap"),
					() => J("lbl.ribbonGap"),
					() => J("group.navColours"),
					() => J("tip.ribbon.color"),
					() => J("lbl.textColor")
				]), z("input", ge, (e) => L("tilt", e.target.valueAsNumber)), z("change", Te, (e) => L("caps", e.target.checked)), z("change", Oe, (e) => L("weight", e.target.checked ? "bold" : "normal")), z("change", Me, (e) => L("outline", e.target.checked)), z("input", Le, (e) => L("gap", e.target.valueAsNumber)), V(e, n);
			}, p = (e) => {
				var t = c_(), n = N(t), r = M(n), i = F(r);
				{
					let e = /* @__PURE__ */ O(() => R(j).props.lines ?? "rows"), t = /* @__PURE__ */ O(() => [
						["rows", J("opt.table.rows")],
						["grid", J("opt.table.grid")],
						["none", J("common.none")]
					]);
					Y(i, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => L("lines", e)
					});
				}
				T(n);
				var a = F(n, 2), o = M(a);
				G(o);
				var s = F(o);
				T(a), je(2), I((e, t, n) => {
					H(r, `${e ?? ""} `), Oi(o, t), H(s, ` ${n ?? ""}`);
				}, [
					() => J("lbl.tableLines"),
					() => !!R(j).props.striped,
					() => J("lbl.tableStriped")
				]), z("change", o, (e) => L("striped", e.target.checked)), V(e, t);
			}, m = (e) => {
				var t = l_(), n = N(t), r = M(n), i = F(r);
				{
					let e = /* @__PURE__ */ O(() => R(j).props.variant ?? "icons"), t = /* @__PURE__ */ O(() => [["icons", J("opt.share.icons")], ["labels", J("opt.share.labels")]]);
					Y(i, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => L("variant", e)
					});
				}
				T(n);
				var a = F(n, 2), o = M(a), s = F(o);
				G(s), T(a);
				var c = F(a, 2), l = M(c), u = F(l);
				{
					let e = /* @__PURE__ */ O(() => R(j).props.color || "accent"), t = /* @__PURE__ */ O(co);
					Na(u, {
						get value() {
							return R(e);
						},
						get tokens() {
							return R(t);
						},
						onchange: (e) => L("color", e === "accent" ? "" : e)
					});
				}
				T(c), je(2), I((e, t, n) => {
					H(r, `${e ?? ""} `), H(o, `${t ?? ""} `), K(s, R(j).props.size ?? 38), H(l, `${n ?? ""} `);
				}, [
					() => J("lbl.variant"),
					() => J("lbl.size"),
					() => J("lbl.color")
				]), z("change", s, (e) => L("size", Number(e.target.value) || 38)), V(e, t);
			}, h = (e) => {
				var t = c_(), n = N(t), r = M(n), i = F(r);
				{
					let e = /* @__PURE__ */ O(() => R(j).props.variant ?? "boxes"), t = /* @__PURE__ */ O(() => [["boxes", J("opt.countdown.boxes")], ["plain", J("opt.countdown.plain")]]);
					Y(i, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => L("variant", e)
					});
				}
				T(n);
				var a = F(n, 2), o = M(a);
				G(o);
				var s = F(o);
				T(a), je(2), I((e, t) => {
					H(r, `${e ?? ""} `), Oi(o, R(j).props.showSeconds !== !1), H(s, ` ${t ?? ""}`);
				}, [() => J("lbl.variant"), () => J("lbl.countdownSeconds")]), z("change", o, (e) => L("showSeconds", e.target.checked)), V(e, t);
			}, g = (e) => {
				let t = (e) => {
					var t = Vg(), n = M(t), r = M(n), i = F(r);
					{
						let e = /* @__PURE__ */ O(() => [["primary", J("opt.btn.primary")], ["secondary", J("opt.btn.secondary")]]);
						Y(i, {
							get value() {
								return R(j).props.style;
							},
							get options() {
								return R(e);
							},
							onchange: (e) => L("style", e)
						});
					}
					T(n);
					var a = F(n, 2);
					c(a, () => "btnStyle"), T(t), I((e) => H(r, `${e ?? ""} `), [() => J("lbl.style")]), V(e, t);
				};
				{
					let n = /* @__PURE__ */ O(() => J("group.appearance")), r = /* @__PURE__ */ O(() => R(j).props.style === "secondary" ? J("opt.btn.secondary") : J("opt.btn.primary")), i = /* @__PURE__ */ O(() => Un("btn-look", { style: "primary" }));
					l(e, () => "btn-look", () => R(n), () => R(r), () => t, () => R(i));
				}
			}, _ = (e) => {
				let t = (e) => {
					var t = u_(), n = N(t), r = M(n), i = M(r), a = F(i);
					{
						let e = /* @__PURE__ */ O(() => R(j).props.fit ?? "cover"), t = /* @__PURE__ */ O(() => [["cover", J("opt.fitFrame.cover")], ["contain", J("opt.fitFrame.contain")]]);
						Y(a, {
							get value() {
								return R(e);
							},
							get options() {
								return R(t);
							},
							onchange: (e) => L("fit", e)
						});
					}
					T(r);
					var o = F(r, 2);
					c(o, () => "imgFit"), T(n);
					var s = F(n, 2), l = M(s), u = P(F(l));
					T(s);
					var d = F(s, 2);
					G(d);
					var f = F(d, 2), p = M(f), m = P(F(p));
					T(f);
					var h = F(f, 2);
					G(h);
					var g = F(h, 2), _ = M(g), v = P(F(_));
					T(g);
					var y = F(g, 2);
					G(y);
					var b = F(y, 2), x = P(b, !0);
					I((e, t, n, r, a, o, s, c, f) => {
						H(i, `${e ?? ""} `), H(l, `${t ?? ""} `), H(u, `${n ?? ""}%`), K(d, R(j).props.x ?? .5), H(p, `${r ?? ""} `), H(m, `${a ?? ""}%`), K(h, R(j).props.y ?? .5), q(g, "title", o), H(_, `${s ?? ""} `), H(v, `${c ?? ""}x`), K(y, R(j).props.zoom ?? 1), H(x, f);
					}, [
						() => J("lbl.imageFit"),
						() => J("lbl.focusX"),
						() => Math.round((R(j).props.x ?? .5) * 100),
						() => J("lbl.focusY"),
						() => Math.round((R(j).props.y ?? .5) * 100),
						() => J("tip.zoomCrop"),
						() => J("lbl.zoom"),
						() => (R(j).props.zoom ?? 1).toFixed(2),
						() => J("ui.openImageEditor")
					]), z("input", d, (e) => L("x", Number(e.target.value))), z("input", h, (e) => L("y", Number(e.target.value))), z("input", y, (e) => L("zoom", Number(e.target.value))), z("click", b, Jn), V(e, t);
				}, n = (e) => {
					var t = d_(), n = N(t), r = M(n), i = P(F(r));
					T(n);
					var a = F(n, 2);
					G(a);
					var o = F(a, 2), s = M(o), c = P(F(s));
					T(o);
					var l = F(o, 2);
					G(l);
					var u = F(l, 2), d = M(u), f = P(F(d));
					T(u);
					var p = F(u, 2);
					G(p), I((e, t, n, o, u, m) => {
						H(r, `${e ?? ""} `), H(i, `${t ?? ""}%`), K(a, R(j).props.brightness ?? 1), H(s, `${n ?? ""} `), H(c, `${o ?? ""}%`), K(l, R(j).props.contrast ?? 1), H(d, `${u ?? ""} `), H(f, `${m ?? ""}%`), K(p, R(j).props.saturate ?? 1);
					}, [
						() => J("lbl.brightness"),
						() => Math.round((R(j).props.brightness ?? 1) * 100),
						() => J("lbl.contrast"),
						() => Math.round((R(j).props.contrast ?? 1) * 100),
						() => J("lbl.saturate"),
						() => Math.round((R(j).props.saturate ?? 1) * 100)
					]), z("input", a, (e) => L("brightness", Number(e.target.value))), z("input", l, (e) => L("contrast", Number(e.target.value))), z("input", p, (e) => L("saturate", Number(e.target.value))), V(e, t);
				}, r = (e) => {
					var t = Vg(), n = M(t), r = M(n), i = F(r);
					{
						let e = /* @__PURE__ */ O(() => R(j).props.radius ?? ""), t = /* @__PURE__ */ O(() => [
							["", J("common.none")],
							["sm", J("opt.size.sm")],
							["md", J("opt.radius.md")]
						]);
						Y(i, {
							get value() {
								return R(e);
							},
							get options() {
								return R(t);
							},
							onchange: (e) => L("radius", e || null)
						});
					}
					T(n);
					var a = F(n, 2);
					c(a, () => "radius"), T(t), I((e) => H(r, `${e ?? ""} `), [() => J("lbl.radius")]), V(e, t);
				}, i = /* @__PURE__ */ O(() => Wn({
					fit: "cover",
					x: .5,
					y: .5,
					zoom: 1
				})), a = /* @__PURE__ */ O(() => Wn({
					brightness: 1,
					contrast: 1,
					saturate: 1
				}));
				var o = Dg(), s = N(o);
				{
					let e = /* @__PURE__ */ O(() => J("group.crop")), n = /* @__PURE__ */ O(() => R(i) ? J("menu.changed", { n: R(i) }) : J("menu.standard")), r = /* @__PURE__ */ O(() => Un("img-crop", {
						fit: "cover",
						x: .5,
						y: .5,
						zoom: 1
					}));
					l(s, () => "img-crop", () => R(e), () => R(n), () => t, () => R(r));
				}
				var u = F(s, 2);
				{
					let e = /* @__PURE__ */ O(() => J("group.filters")), t = /* @__PURE__ */ O(() => R(a) ? J("menu.changed", { n: R(a) }) : J("menu.standard")), r = /* @__PURE__ */ O(() => Un("img-filters", {
						brightness: 1,
						contrast: 1,
						saturate: 1
					}));
					l(u, () => "img-filters", () => R(e), () => R(t), () => n, () => R(r));
				}
				var d = F(u, 2);
				{
					let e = /* @__PURE__ */ O(() => J("group.corners")), t = /* @__PURE__ */ O(() => ({
						"": J("common.none"),
						sm: J("opt.size.sm"),
						md: J("opt.radius.md")
					})[R(j).props.radius ?? ""]), n = /* @__PURE__ */ O(() => Un("img-corners", { radius: "md" }));
					l(d, () => "img-corners", () => R(e), () => R(t), () => r, () => R(n));
				}
				V(e, o);
			}, v = (e) => {
				let t = (e) => {
					var t = f_(), n = N(t), r = M(n), i = M(r), a = F(i);
					G(a), T(r);
					var o = F(r, 2);
					c(o, () => "iconSize"), T(n);
					var s = F(n, 2), l = M(s), u = M(l), d = F(u);
					{
						let e = /* @__PURE__ */ O(() => R(j).props.color ?? "accent"), t = /* @__PURE__ */ O(co);
						Na(d, {
							get value() {
								return R(e);
							},
							get tokens() {
								return R(t);
							},
							onchange: (e) => L("color", e)
						});
					}
					T(l);
					var f = F(l, 2);
					c(f, () => "iconColor"), T(s), I((e, t, n) => {
						H(i, `${e ?? ""} `), K(a, R(j).props.size ?? 48), q(l, "title", t), H(u, `${n ?? ""} `);
					}, [
						() => J("lbl.sizePx"),
						() => J("hint.icon.color"),
						() => J("lbl.color")
					]), z("change", a, (e) => L("size", Number(e.target.value))), V(e, t);
				};
				{
					let n = /* @__PURE__ */ O(() => J("group.appearance")), r = /* @__PURE__ */ O(() => Un("icon-look", {
						size: 48,
						color: "accent"
					}));
					l(e, () => "icon-look", () => R(n), () => `${R(j).props.size ?? 48} px`, () => t, () => R(r));
				}
			}, y = (e) => {
				var t = p_(), n = N(t), r = M(n), i = F(r);
				{
					let e = /* @__PURE__ */ O(() => R(j).props.view ?? "cards"), t = /* @__PURE__ */ O(() => [
						["cards", J("opt.collectionView.cards")],
						["list", J("opt.collectionView.list")],
						["archive", J("opt.collectionView.archive")]
					]);
					Y(i, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => L("view", e)
					});
				}
				T(n), je(2), I((e) => H(r, `${e ?? ""} `), [() => J("lbl.view")]), V(e, t);
			}, b = (e) => {
				var t = m_(), n = N(t), r = M(n), i = F(r);
				G(i), T(n), je(2), I((e, t) => {
					q(n, "title", e), H(r, `${t ?? ""} `), K(i, R(j).props.columns ?? 0);
				}, [() => J("tip.product.columns"), () => J("lbl.columns")]), z("change", i, (e) => L("columns", Number(e.target.value))), V(e, t);
			}, x = (e) => {
				var t = p_(), n = N(t), r = M(n), i = F(r);
				{
					let e = /* @__PURE__ */ O(() => R(j).props.variant ?? "button"), t = /* @__PURE__ */ O(() => [["button", J("opt.cart.button")], ["icon", J("opt.cart.icon")]]);
					Y(i, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => L("variant", e)
					});
				}
				T(n), je(2), I((e) => H(r, `${e ?? ""} `), [() => J("lbl.view")]), V(e, t);
			}, te = (e) => {
				let t = /* @__PURE__ */ O(() => Fp(R(j).props.view));
				var n = b_(), r = N(n), i = M(r), a = F(i);
				{
					let e = /* @__PURE__ */ O(() => jp.map((e) => [e, J(`opt.galleryView.${e}`)]));
					Y(a, {
						get value() {
							return R(t);
						},
						get options() {
							return R(e);
						},
						onchange: (e) => L("view", e)
					});
				}
				T(r);
				var o = F(r, 2), s = (e) => {
					var t = h_(), n = N(t), r = M(n), i = F(r);
					G(i), T(n);
					var a = F(n, 2), o = M(a), s = P(F(o));
					T(a);
					var c = F(a, 2);
					G(c), I((e, t) => {
						H(r, `${e ?? ""} `), K(i, R(j).props.columns ?? 3), H(o, `${t ?? ""} `), H(s, `${R(j).props.gap ?? 12 ?? ""} px`), K(c, R(j).props.gap ?? 12);
					}, [() => J("lbl.columns"), () => J("lbl.imageGap")]), z("change", i, (e) => L("columns", Number(e.target.value))), z("input", c, (e) => L("gap", Number(e.target.value))), V(e, t);
				}, c = /* @__PURE__ */ O(() => Mp.includes(R(t)));
				U(o, (e) => {
					R(c) && e(s);
				});
				var l = F(o, 2), u = (e) => {
					var t = g_(), n = N(t), r = M(n), i = P(r, !0), a = F(r, 2);
					G(a);
					var o = P(F(a, 2));
					T(n);
					var s = F(n, 2), c = M(s);
					W(c, () => C.shuffle);
					var l = F(c);
					T(s), I((e, t, r, c) => {
						q(n, "title", e), H(i, t), q(a, "min", Np.min), q(a, "max", Np.max), K(a, R(j).props.rowHeight ?? Np.dflt), H(o, `${R(j).props.rowHeight ?? Np.dflt ?? ""} px`), q(s, "title", r), H(l, ` ${c ?? ""}`);
					}, [
						() => J("tip.gallery.rowHeight"),
						() => J("lbl.galleryRowHeight"),
						() => J("tip.gallery.shuffleMosaic"),
						() => J("ui.shufflePhotos")
					]), z("input", a, (e) => L("rowHeight", e.target.valueAsNumber)), z("click", s, () => L("seed", Ha())), V(e, t);
				};
				U(l, (e) => {
					R(t) === "mosaic" && e(u);
				});
				var d = F(l, 2), f = (e) => {
					var t = __(), n = N(t), r = M(n), i = P(r, !0), a = F(r, 2);
					G(a);
					var o = P(F(a, 2));
					T(n);
					var s = F(n, 2), c = (e) => {
						var t = hh(), n = M(t);
						W(n, () => C.shuffle);
						var r = F(n);
						T(t), I((e, n) => {
							q(t, "title", e), H(r, ` ${n ?? ""}`);
						}, [() => J("tip.gallery.shuffleTilt"), () => J("ui.shufflePhotos")]), z("click", t, () => L("seed", Ha())), V(e, t);
					};
					U(s, (e) => {
						(R(j).props.tilt ?? Pp.dflt) > 0 && e(c);
					});
					var l = F(s, 2), u = M(l), d = F(u);
					{
						let e = /* @__PURE__ */ O(() => R(j).props.frameColor || "#ffffff"), t = /* @__PURE__ */ O(co), n = /* @__PURE__ */ O(() => J("tip.gallery.frameColor"));
						Na(d, {
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
							onchange: (e) => L("frameColor", e ?? "")
						});
					}
					T(l);
					var f = F(l, 2), p = M(f);
					G(p);
					var m = F(p);
					T(f), I((e, t, r, s, c, d) => {
						q(n, "title", e), H(i, t), q(a, "min", Pp.min), q(a, "max", Pp.max), K(a, R(j).props.tilt ?? Pp.dflt), H(o, `${R(j).props.tilt ?? Pp.dflt ?? ""}°`), q(l, "title", r), H(u, `${s ?? ""} `), q(f, "title", c), Oi(p, R(j).props.captions === !0), H(m, ` ${d ?? ""}`);
					}, [
						() => J("tip.gallery.tilt"),
						() => J("lbl.polaroidTilt"),
						() => J("tip.gallery.frameColor"),
						() => J("lbl.frameColor"),
						() => J("tip.gallery.captions"),
						() => J("lbl.galleryCaptions")
					]), z("input", a, (e) => L("tilt", e.target.valueAsNumber)), z("change", p, (e) => L("captions", e.target.checked)), V(e, t);
				};
				U(d, (e) => {
					R(t) === "polaroid" && e(f);
				});
				var p = F(d, 2), m = (e) => {
					var t = v_(), n = N(t);
					{
						let e = /* @__PURE__ */ O(() => J("lbl.ribbonRows")), t = /* @__PURE__ */ O(() => String(R(j).props.rows ?? 1)), r = /* @__PURE__ */ O(() => [["1", J("opt.ribbonRows.one")], ["2", J("opt.ribbonRows.two")]]);
						lc(n, {
							get label() {
								return R(e);
							},
							get value() {
								return R(t);
							},
							get options() {
								return R(r);
							},
							onchange: (e) => L("rows", Number(e))
						});
					}
					var r = F(n, 2);
					{
						let e = /* @__PURE__ */ O(() => J("lbl.ribbonDirection")), t = /* @__PURE__ */ O(() => R(j).props.direction ?? "left"), n = /* @__PURE__ */ O(() => [["left", J("opt.ribbonDir.left")], ["right", J("opt.ribbonDir.right")]]);
						lc(r, {
							get label() {
								return R(e);
							},
							get value() {
								return R(t);
							},
							get options() {
								return R(n);
							},
							onchange: (e) => L("direction", e)
						});
					}
					var i = F(r, 2), a = M(i), o = P(a, !0), s = F(a, 2);
					G(s);
					var c = P(F(s, 2), !0);
					T(i);
					var l = F(i, 2), u = M(l), d = P(u, !0), f = F(u, 2);
					G(f);
					var p = P(F(f, 2));
					T(l);
					var m = F(l, 2), h = M(m), g = P(F(h));
					T(m);
					var _ = F(m, 2);
					G(_);
					var v = F(_, 2), y = M(v);
					G(y);
					var b = F(y);
					T(v);
					var x = F(v, 2), S = M(x);
					G(S);
					var ee = F(S);
					T(x), I((e, t, n, r, a, u, m, te, ne) => {
						q(i, "title", e), H(o, t), K(s, R(j).props.speed ?? 60), H(c, R(j).props.speed ?? 60), q(l, "title", n), H(d, r), K(f, R(j).props.bandHeight ?? 160), H(p, `${R(j).props.bandHeight ?? 160 ?? ""} px`), H(h, `${a ?? ""} `), H(g, `${R(j).props.gap ?? 12 ?? ""} px`), K(_, R(j).props.gap ?? 12), q(v, "title", u), Oi(y, R(j).props.pauseOnHover !== !1), H(b, ` ${m ?? ""}`), q(x, "title", te), Oi(S, R(j).props.fade !== !1), H(ee, ` ${ne ?? ""}`);
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
					]), z("input", s, (e) => L("speed", e.target.valueAsNumber)), z("input", f, (e) => L("bandHeight", e.target.valueAsNumber)), z("input", _, (e) => L("gap", Number(e.target.value))), z("change", y, (e) => L("pauseOnHover", e.target.checked)), z("change", S, (e) => L("fade", e.target.checked)), V(e, t);
				};
				U(p, (e) => {
					R(t) === "ribbon" && e(m);
				});
				var h = F(p, 2), g = (e) => {
					var t = y_(), n = M(t), r = F(n);
					G(r), T(t), I((e) => {
						H(n, `${e ?? ""} `), K(r, R(j).props.interval ?? 5);
					}, [() => J("lbl.secondsPerImage")]), z("change", r, (e) => L("interval", Number(e.target.value))), V(e, t);
				};
				U(h, (e) => {
					R(t) === "slides" && e(g);
				});
				var _ = F(h, 2), v = M(_), y = F(v);
				{
					let e = /* @__PURE__ */ O(() => R(j).props.radius ?? ""), t = /* @__PURE__ */ O(() => [
						["", J("common.none")],
						["sm", J("opt.size.sm")],
						["md", J("opt.radius.md")]
					]);
					Y(y, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => L("radius", e || null)
					});
				}
				T(_);
				var b = F(_, 2), x = M(b);
				G(x);
				var S = F(x);
				T(b), je(2), I((e, t, n, r) => {
					H(i, `${e ?? ""} `), H(v, `${t ?? ""} `), q(b, "title", n), Oi(x, R(j).props.lightbox !== !1), H(S, ` ${r ?? ""}`);
				}, [
					() => J("lbl.view"),
					() => J("lbl.radius"),
					() => J("tip.lightbox"),
					() => J("lbl.lightbox")
				]), z("change", x, (e) => L("lightbox", e.target.checked)), V(e, n);
			}, ne = (e) => {
				let t = (e) => {
					var t = x_(), n = N(t), r = M(n), i = M(r);
					Y(F(i), {
						get value() {
							return R(j).props.color;
						},
						get options() {
							return Ni;
						},
						onchange: (e) => L("color", e)
					}), T(r);
					var a = F(r, 2);
					c(a, () => "shapeColor"), T(n);
					var o = F(n, 2), s = M(o), l = M(s), u = F(l);
					G(u), T(s);
					var d = F(s, 2);
					c(d, () => "thickness"), T(o);
					var f = F(o, 2), p = M(f);
					G(p);
					var m = F(p);
					T(f), I((e, t, n, r, a) => {
						H(i, `${e ?? ""} `), H(l, `${t ?? ""} `), K(u, R(j).props.thickness), q(f, "title", n), Oi(p, r), H(m, ` ${a ?? ""}`);
					}, [
						() => J("lbl.color"),
						() => J("lbl.thickness"),
						() => J("tip.shape.fill"),
						() => !!R(j).props.fill,
						() => J("lbl.filled")
					]), z("change", u, (e) => L("thickness", Number(e.target.value))), z("change", p, (e) => L("fill", e.target.checked ? R(j).props.color : null)), V(e, t);
				}, n = (e) => {
					var t = Lr(), n = N(t), r = (e) => {
						var t = S_(), n = M(t), r = F(n);
						G(r), T(t), I((e, i, a, o) => {
							q(t, "title", e), H(n, `${i ?? ""} `), q(r, "max", a), K(r, o);
						}, [
							() => J("tip.shapeSize"),
							() => J("lbl.length"),
							() => Rr(100 - R(j).frame.x),
							() => Rr(R(j).frame.w)
						]), z("change", r, (e) => zr(Number(e.target.value), !1)), V(e, t);
					}, i = /* @__PURE__ */ O(() => (R(j).props.kind === "line" || R(j).props.kind === "arrow") && B()), a = (e) => {
						var t = C_(), n = M(t), r = F(n);
						G(r), T(t), I((e, t) => {
							H(n, `${e ?? ""} `), q(r, "max", t), K(r, R(j).frame.w);
						}, [() => J("lbl.length"), () => Math.max(1, Math.round(100 - R(j).frame.x))]), z("change", r, (e) => Fr("w", Math.max(1, Math.min(Number(e.target.value), 100 - R(j).frame.x)))), V(e, t);
					}, o = (e) => {
						var t = S_(), n = M(t), r = F(n);
						G(r), T(t), I((e, i, a, o) => {
							q(t, "title", e), H(n, `${i ?? ""} `), q(r, "max", a), K(r, o);
						}, [
							() => J("tip.shapeSize"),
							() => J("lbl.sizePx"),
							() => Rr(100 - R(j).frame.x),
							() => Rr(R(j).frame.w)
						]), z("change", r, (e) => zr(Number(e.target.value), !0)), V(e, t);
					};
					U(n, (e) => {
						R(i) ? e(r) : R(j).props.kind === "line" || R(j).props.kind === "arrow" ? e(a, 1) : e(o, -1);
					}), V(e, t);
				}, r = /* @__PURE__ */ O(() => R(j).props.kind === "line" || R(j).props.kind === "arrow");
				var i = Sg(), a = N(i);
				{
					let e = /* @__PURE__ */ O(() => J("group.strokeFill")), n = /* @__PURE__ */ O(() => `${Ni.find(([e]) => e === R(j).props.color)?.[1] ?? ""} · ${R(j).props.thickness ?? 2} px`), r = /* @__PURE__ */ O(() => Un("shape-stroke", {
						color: "accent",
						thickness: 2,
						fill: null
					}));
					l(a, () => "shape-stroke", () => R(e), () => R(n), () => t, () => R(r));
				}
				var o = F(a, 2), s = (e) => {
					{
						let t = /* @__PURE__ */ O(() => J("group.measures")), r = /* @__PURE__ */ O(() => B() ? `${Rr(R(j).frame.w)} px` : `${R(j).frame.w} %`);
						l(e, () => "shape-size", () => R(t), () => R(r), () => n);
					}
				}, u = /* @__PURE__ */ O(() => R(r) || B());
				U(o, (e) => {
					R(u) && e(s);
				}), V(e, i);
			};
			U(n, (e) => {
				R(j).type === "text" ? e(r) : R(j).type === "calendar" ? e(i, 1) : R(j).type === "faq" ? e(a, 2) : R(j).type === "timeline" ? e(o, 3) : R(j).type === "quote" ? e(u, 4) : R(j).type === "stats" ? e(d, 5) : R(j).type === "ribbon" ? e(f, 6) : R(j).type === "table" ? e(p, 7) : R(j).type === "share" ? e(m, 8) : R(j).type === "countdown" ? e(h, 9) : R(j).type === "button" ? e(g, 10) : R(j).type === "image" ? e(_, 11) : R(j).type === "icon" ? e(v, 12) : R(j).type === "collection" ? e(y, 13) : R(j).type === "product" ? e(b, 14) : R(j).type === "cart" ? e(x, 15) : R(j).type === "gallery" ? e(te, 16) : R(j).type === "shape" && e(ne, 17);
			}), V(e, t);
		}, o = (e) => {
			var t = T_(), n = N(t), r = M(n), i = P(r, !0), a = F(r, 2);
			G(a);
			var o = F(a, 2), s = P(o), l = F(o, 2);
			c(l, () => "size"), T(n);
			var u = F(n, 2), d = (e) => {
				var t = w_(), n = M(t), r = M(n, !0), i = F(r);
				G(i), T(n);
				var a = F(n, 2), o = M(a, !0), s = F(o);
				G(s), T(a), T(t), I((e, t, c, l, u, d) => {
					q(n, "title", e), H(r, t), q(i, "min", Tl.min), q(i, "max", Tl.max), K(i, c), q(a, "title", l), H(o, u), q(s, "min", Tl.min), q(s, "max", Tl.max), K(s, d);
				}, [
					() => J("tip.scaleMin"),
					() => J("lbl.scaleMin"),
					() => Dl(R(j)).min,
					() => J("tip.scaleMax"),
					() => J("lbl.scaleMax"),
					() => Dl(R(j)).max
				]), z("change", i, (e) => Cr("sizeMin", e.target.value)), z("change", s, (e) => Cr("sizeMax", e.target.value)), V(e, t);
			}, f = /* @__PURE__ */ O(() => El(R(j)) !== 1);
			U(u, (e) => {
				R(f) && e(d);
			}), I((e, t, r, o, c) => {
				q(n, "title", e), H(i, t), q(a, "min", wl.min * 100), q(a, "max", wl.max * 100), K(a, r), q(a, "aria-label", o), H(s, `${c ?? ""} %`);
			}, [
				() => J("tip.scale"),
				() => J("lbl.scale"),
				() => Math.round(El(R(j)) * 100),
				() => J("lbl.scale"),
				() => Math.round(El(R(j)) * 100)
			]), z("input", a, (e) => Sr(e.target.valueAsNumber / 100)), z("change", a, () => xr = null), V(e, t);
		}, u = (e) => {
			var t = D_(), n = N(t), r = M(n), i = M(r), a = F(i);
			{
				let e = /* @__PURE__ */ O(() => R(j).fit ?? "wrap"), t = /* @__PURE__ */ O(() => vr.has(R(j).type) ? [["wrap", J("opt.fit.fluid")], ["shrink", J("opt.fit.floor")]] : [
					["wrap", J("opt.fit.wrap")],
					...B() || R(j).fit === "shrink" ? [["shrink", J("opt.fit.shrink")]] : [],
					["both", J("opt.fit.both")]
				]);
				Y(a, {
					get value() {
						return R(e);
					},
					get options() {
						return R(t);
					},
					onchange: (e) => yr(e)
				});
			}
			T(r);
			var o = F(r, 2);
			c(o, () => "fit"), T(n);
			var s = F(n, 2), l = (e) => {
				var t = E_(), n = M(t), r = P(n, !0), i = F(n, 2);
				G(i);
				var a = P(F(i, 2));
				T(t), I((e, n, o, s) => {
					q(t, "title", e), H(r, n), K(i, o), H(a, `${s ?? ""} %`);
				}, [
					() => J("tip.fitMin"),
					() => J("lbl.fitMin"),
					() => Math.round((R(j).fitMin ?? .6) * 100),
					() => Math.round((R(j).fitMin ?? .6) * 100)
				]), z("input", i, (e) => br(e.target.valueAsNumber / 100)), V(e, t);
			};
			U(s, (e) => {
				R(j).fit && e(l);
			}), I((e, t) => {
				q(r, "title", e), H(i, `${t ?? ""} `);
			}, [() => J("tip.fit"), () => J("lbl.fit")]), V(e, t);
		}, d = (e) => {
			var t = k_(), n = N(t), r = M(n), i = F(r);
			{
				let e = /* @__PURE__ */ O(() => bo(R(j).animation) ? R(j).animation.type : "");
				Y(i, {
					get value() {
						return R(e);
					},
					get options() {
						return So;
					},
					onchange: (e) => To(e || null)
				});
			}
			T(n);
			var a = F(n, 2), o = (e) => {
				var t = O_(), n = N(t), r = M(n), i = F(r);
				G(i), T(n);
				var a = F(n, 2), o = M(a), s = F(o);
				G(s), T(a), I((e, t) => {
					H(r, `${e ?? ""} `), K(i, R(j).animation.props.duration), H(o, `${t ?? ""} `), K(s, R(j).animation.props.delay);
				}, [() => J("lbl.durationMs"), () => J("lbl.delayMs")]), z("change", i, (e) => Do("duration", Number(e.target.value))), z("change", s, (e) => Do("delay", Number(e.target.value))), V(e, t);
			}, s = /* @__PURE__ */ O(() => bo(R(j).animation));
			U(a, (e) => {
				R(s) && e(o);
			});
			var c = F(a, 2), l = M(c), u = F(l);
			{
				let e = /* @__PURE__ */ O(() => R(j).hover?.type ?? (R(j).animation && !bo(R(j).animation) ? R(j).animation.type : ""));
				Y(u, {
					get value() {
						return R(e);
					},
					get options() {
						return Co;
					},
					onchange: (e) => Eo(e || null)
				});
			}
			T(c), I((e, t, i, a) => {
				q(n, "title", e), H(r, `${t ?? ""} `), q(c, "title", i), H(l, `${a ?? ""} `);
			}, [
				() => J("tip.props.blockAnim"),
				() => J("lbl.animIn"),
				() => J("tip.props.blockHover"),
				() => J("lbl.onHover")
			]), V(e, t);
		}, p = (e) => {
			var t = Lr(), n = N(t), r = (e) => {
				var t = ig(), n = N(t), r = M(n);
				G(r);
				var i = F(r);
				T(n);
				var a = F(n, 2), o = (e) => {
					var t = j_(), n = N(t), r = M(n), i = F(r);
					{
						let e = /* @__PURE__ */ O(() => R(j).sticky.mode ?? "scroll"), t = /* @__PURE__ */ O(() => [["scroll", J("opt.sticky.modeScroll")], ["screen", J("opt.sticky.modeScreen")]]);
						Y(i, {
							get value() {
								return R(e);
							},
							get options() {
								return R(t);
							},
							onchange: (e) => Vn(`edit:${R(j).blockId}`, (t) => {
								t.sticky = {
									...t.sticky,
									mode: e
								};
							})
						});
					}
					T(n);
					var a = F(n, 2), o = (e) => {
						var t = A_(), n = M(t), r = F(n);
						G(r), T(t), I((e, i) => {
							q(t, "title", e), H(n, `${i ?? ""} `), K(r, R(j).sticky.offset ?? 16);
						}, [() => R(j).sticky.mode === "screen" ? J("tip.stickyEdge") : J("tip.stickyOffset"), () => R(j).sticky.mode === "screen" ? J("lbl.stickyEdge") : J("lbl.stickyOffset")]), z("change", r, (e) => Vn(`edit:${R(j).blockId}`, (t) => {
							t.sticky = {
								...t.sticky,
								offset: Math.max(0, Number(e.target.value) || 0)
							};
						})), V(e, t);
					};
					U(a, (e) => {
						(R(j).sticky.mode !== "screen" || (R(j).sticky.dock ?? "bottom-right") !== "middle-center") && e(o);
					});
					var s = F(a, 2), c = (e) => {
						var t = vh(), n = M(t), r = F(n);
						{
							let e = /* @__PURE__ */ O(() => R(j).sticky.dock ?? "bottom-right"), t = /* @__PURE__ */ O(() => Rn.map(([e, t]) => [e, J(t)]));
							Y(r, {
								get value() {
									return R(e);
								},
								get options() {
									return R(t);
								},
								onchange: (e) => Vn(`edit:${R(j).blockId}`, (t) => {
									t.sticky = {
										...t.sticky,
										dock: e
									};
								})
							});
						}
						T(t), I((e, r) => {
							q(t, "title", e), H(n, `${r ?? ""} `);
						}, [() => J("tip.stickyDock"), () => J("lbl.stickyDock")]), V(e, t);
					}, l = (e) => {
						var t = vh(), n = M(t), r = F(n);
						{
							let e = /* @__PURE__ */ O(() => R(j).sticky.until ?? ""), t = /* @__PURE__ */ O(zn);
							Y(r, {
								get value() {
									return R(e);
								},
								get options() {
									return R(t);
								},
								onchange: (e) => Vn(`edit:${R(j).blockId}`, (t) => {
									t.sticky = {
										...t.sticky,
										until: e || null
									};
								})
							});
						}
						T(t), I((e, r) => {
							q(t, "title", e), H(n, `${r ?? ""} `);
						}, [() => J("tip.stickyUntil"), () => J("lbl.stickyUntil")]), V(e, t);
					};
					U(s, (e) => {
						R(j).sticky.mode === "screen" ? e(c) : e(l, -1);
					}), I((e, t) => {
						q(n, "title", e), H(r, `${t ?? ""} `);
					}, [() => J("tip.stickyMode"), () => J("lbl.stickyMode")]), V(e, t);
				};
				U(a, (e) => {
					R(j).sticky && e(o);
				}), I((e, t, a) => {
					q(n, "title", e), Oi(r, t), H(i, ` ${a ?? ""}`);
				}, [
					() => J("tip.sticky"),
					() => !!R(j).sticky,
					() => J("lbl.sticky")
				]), z("change", r, (e) => Vn(`edit:${R(j).blockId}`, (t) => {
					t.sticky = e.target.checked ? {
						offset: 16,
						until: null
					} : null;
				})), V(e, t);
			};
			U(n, (e) => {
				R(Fe) === "desktop" && e(r);
			}), V(e, t);
		}, m = (e) => {
			var t = N_(), n = N(t), r = (e) => {
				var t = M_(), n = M(t), r = M(n, !0), i = F(r);
				G(i), T(n);
				var a = F(n, 2), o = M(a, !0), s = F(o);
				G(s), T(a);
				var c = F(a, 2), l = M(c, !0), u = F(l);
				G(u), T(c);
				var d = F(c, 2), f = M(d, !0), p = F(f);
				G(p), T(d);
				var m = F(d, 2), h = M(m, !0), g = F(h);
				G(g), T(m);
				var _ = F(m, 2), v = M(_, !0), y = F(v);
				G(y), T(_), T(t), I((e, t, n, a, c, d, _) => {
					H(r, e), K(i, R(j).frame.x), H(o, t), K(s, R(j).frame.y), H(l, n), K(u, R(j).frame.w), H(f, a), K(p, R(j).frame.h), q(m, "title", c), H(h, d), K(g, R(j).frame.z ?? 1), H(v, _), K(y, R(j).frame.rot ?? 0);
				}, [
					() => J("frame.x"),
					() => J("frame.y"),
					() => J("frame.w"),
					() => J("frame.h"),
					() => J("tip.frameZ"),
					() => J("frame.z"),
					() => J("frame.rot")
				]), z("change", i, (e) => Fr("x", Number(e.target.value))), z("change", s, (e) => Fr("y", Number(e.target.value))), z("change", u, (e) => Fr("w", Number(e.target.value))), z("change", p, (e) => Fr("h", Number(e.target.value))), z("change", g, (e) => Fr("z", Number(e.target.value))), z("change", y, (e) => Fr("rot", Number(e.target.value))), V(e, t);
			};
			U(n, (e) => {
				R(Fe) === "desktop" && e(r);
			});
			var i = F(n, 2), a = M(i);
			G(a);
			var o = F(a);
			T(i), I((e, t) => {
				q(i, "title", e), Oi(a, R(j).decor), H(o, ` ${t ?? ""}`);
			}, [() => J("tip.decor"), () => J("lbl.decor")]), z("change", a, (e) => bi(e.target.checked)), V(e, t);
		}, _ = (e) => {
			var t = P_(), n = N(t), r = (e) => {
				var t = $m(), n = N(t), r = M(n), i = F(r);
				{
					let e = /* @__PURE__ */ O(() => R(j).height?.mode === "own" ? "own" : "content"), t = /* @__PURE__ */ O(() => [["content", J("opt.height.content")], ["own", J("opt.height.own")]]);
					Y(i, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => wr(e)
					});
				}
				T(n);
				var a = F(n, 2), o = (e) => {
					let t = /* @__PURE__ */ O(() => [
						"middle",
						"bottom",
						"stretch"
					].includes(R(j).height.align) ? R(j).height.align : "top");
					var n = vh(), r = M(n), i = F(r);
					{
						let e = /* @__PURE__ */ O(() => [
							["top", J("opt.heightAlign.top")],
							["middle", J("opt.heightAlign.middle")],
							["bottom", J("opt.heightAlign.bottom")],
							...Or() || R(t) === "stretch" ? [["stretch", J("opt.heightAlign.stretch")]] : []
						]);
						Y(i, {
							get value() {
								return R(t);
							},
							get options() {
								return R(e);
							},
							onchange: (e) => Er(e)
						});
					}
					T(n), I((e, t) => {
						q(n, "title", e), H(r, `${t ?? ""} `);
					}, [() => J("tip.heightAlign"), () => J("lbl.heightAlign")]), V(e, n);
				};
				U(a, (e) => {
					R(j).height?.mode === "own" && e(o);
				}), I((e, t) => {
					q(n, "title", e), H(r, `${t ?? ""} `);
				}, [() => J("tip.height"), () => J("lbl.height")]), V(e, t);
			}, i = /* @__PURE__ */ O(() => yl.has(R(j).type));
			U(n, (e) => {
				R(i) && e(r);
			});
			var a = F(n, 2), s = (e) => {
				o(e);
			}, f = /* @__PURE__ */ O(() => !Cl.has(R(j).type));
			U(a, (e) => {
				R(f) && e(s);
			});
			var h = F(a, 2);
			u(h);
			var g = F(h, 2), _ = M(g), v = M(_);
			G(v);
			var y = F(v);
			T(_);
			var b = F(_, 2);
			c(b, () => "phone"), T(g);
			var x = F(g, 2);
			p(x);
			var S = F(x, 2);
			{
				let e = /* @__PURE__ */ O(() => J("group.motion")), t = /* @__PURE__ */ O(In);
				l(S, () => "motion", () => R(e), () => R(t), () => d);
			}
			var ee = F(S, 2);
			{
				let e = /* @__PURE__ */ O(() => J("group.placement"));
				l(ee, () => "frame", () => R(e), () => R(Fe) === "desktop" ? `${R(j).frame.w} % × ${R(j).frame.h}` : "", () => m);
			}
			I((e, t) => {
				q(_, "title", e), Oi(v, R(j).hideMobile), H(y, ` ${t ?? ""}`);
			}, [() => J("tip.hideMobile"), () => J("lbl.hideMobile")]), z("change", v, (e) => Ei(e.target.checked)), V(e, t);
		};
		var v = Sg(), y = N(v), b = (e) => {
			var t = V_(), n = M(t);
			Qr(n, 17, Tn, (e) => e.id, (e, t) => {
				var n = z_(), r = M(n), i = M(r), a = P(i, !0), o = F(i);
				c(o, () => R(t).id), T(r);
				var s = F(r, 2), l = (e) => {
					var n = F_(), r = P(n, !0);
					I(() => H(r, R(t).value)), z("click", n, function(...e) {
						R(t).run?.apply(this, e);
					}), V(e, n);
				}, u = (e) => {
					var n = I_();
					G(n), I(() => {
						q(n, "min", R(t).min), q(n, "max", R(t).max), q(n, "step", R(t).step ?? 1), K(n, R(t).value), q(n, "aria-label", R(t).label);
					}), z("change", n, (e) => R(t).set(e.target.value)), V(e, n);
				}, d = (e) => {
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
				}, f = (e) => {
					{
						let n = /* @__PURE__ */ O(co);
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
				}, p = (e) => {
					var n = R_();
					Qr(n, 21, () => R(t).options, ([e, t]) => e, (e, n) => {
						var r = /* @__PURE__ */ O(() => g(R(n), 2));
						let i = () => R(r)[0], a = () => R(r)[1];
						var o = L_();
						let s;
						var c = P(o, !0);
						I(() => {
							q(o, "aria-pressed", R(t).value === i()), s = xi(o, 1, "svelte-1n46o8q", null, s, { on: R(t).value === i() }), H(c, a());
						}), z("click", o, () => R(t).set(i())), V(e, o);
					}), T(n), I(() => q(n, "aria-label", R(t).label)), V(e, n);
				};
				U(s, (e) => {
					R(t).kind === "open" ? e(l) : R(t).kind === "number" ? e(u, 1) : R(t).kind === "select" ? e(d, 2) : R(t).kind === "color" ? e(f, 3) : e(p, -1);
				}), T(n), I(() => H(a, R(t).label)), V(e, n);
			});
			var r = F(n, 2), i = (e) => {
				var t = B_(), n = P(t, !0);
				I((e) => H(n, e), [() => J("menu.quickReset")]), z("click", t, () => Sn(es)), V(e, t);
			}, a = /* @__PURE__ */ O(() => as(xn()));
			U(r, (e) => {
				R(a) && e(i);
			}), T(t), V(e, t);
		}, ne = /* @__PURE__ */ O(() => !R(r).trim());
		U(y, (e) => {
			R(ne) && e(b);
		});
		var re = F(y, 2), ie = (e) => {
			var n = H_();
			let o;
			var s = M(n), c = M(s), l = P(c, !0), u = F(c);
			i(u);
			var d = P(F(u), !0);
			T(s);
			var f = F(s, 2), p = M(f), m = P(p, !0), h = F(p);
			a(h);
			var g = P(F(h), !0);
			T(f);
			var v = F(f, 2), y = M(v), b = P(y, !0), x = F(y);
			_(x);
			var S = P(F(x), !0);
			T(v), T(n), hi(n, () => vs(R(r), cf)), I((e, r, i, a, s, c) => {
				o = xi(n, 1, "emenu-cols emenu-search svelte-1n46o8q", null, o, { stacked: !t() }), H(l, e), H(d, r), H(m, i), H(g, a), H(b, s), H(S, c);
			}, [
				() => J("props.tabContent"),
				() => J("menu.noMatch"),
				() => J("props.tabStyle"),
				() => J("menu.noMatch"),
				() => J("props.tabPlacement"),
				() => J("menu.noMatch")
			]), V(e, n);
		}, ae = /* @__PURE__ */ O(() => R(r).trim()), oe = (e) => {
			var t = U_(), n = M(t), r = M(n), o = P(r, !0), s = F(r);
			i(s), T(n);
			var c = F(n, 2), l = M(c), u = P(l, !0), d = F(l);
			a(d), T(c);
			var f = F(c, 2), p = M(f), m = P(p, !0), h = F(p);
			_(h), T(f), T(t), I((e, t, n) => {
				H(o, e), H(u, t), H(m, n);
			}, [
				() => J("props.tabContent"),
				() => J("props.tabStyle"),
				() => J("props.tabPlacement")
			]), V(e, t);
		}, se = (e) => {
			var t = W_(), n = N(t), r = M(n), o = M(r);
			let s;
			var c = P(o, !0), l = F(o, 2);
			let u;
			var d = P(l, !0), f = F(l, 2);
			let p;
			var m = P(f, !0);
			T(r), T(n);
			var h = F(n, 2), g = (e) => {
				i(e);
			}, v = (e) => {
				a(e);
			}, y = (e) => {
				_(e);
			};
			U(h, (e) => {
				R(Mr) === "content" ? e(g) : R(Mr) === "style" ? e(v, 1) : e(y, -1);
			}), I((e, t, n) => {
				s = xi(o, 1, "svelte-1n46o8q", null, s, { on: R(Mr) === "content" }), H(c, e), u = xi(l, 1, "svelte-1n46o8q", null, u, { on: R(Mr) === "style" }), H(d, t), p = xi(f, 1, "svelte-1n46o8q", null, p, { on: R(Mr) === "placement" }), H(m, n);
			}, [
				() => J("props.tabContent"),
				() => J("props.tabStyle"),
				() => J("props.tabPlacement")
			]), z("click", o, () => A(Mr, "content")), z("click", l, () => A(Mr, "style")), z("click", f, () => A(Mr, "placement")), V(e, t);
		};
		U(re, (e) => {
			R(ae) ? e(ie) : t() ? e(oe, 1) : e(se, -1);
		}), V(e, v);
	}, d = (e) => `<svg width="40" height="26" viewBox="0 0 40 26" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${e}</svg>`, p = {
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
	}, _ = (e) => `<svg width="48" height="34" viewBox="0 0 48 34" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${e}</svg>`, v = {
		card: _("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><rect x=\"10\" y=\"6\" width=\"28\" height=\"24\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.18\"/><path d=\"M15 13h18M15 19h14M15 25h16\" stroke-opacity=\"0.8\"/>"),
		flat: _("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><rect x=\"1\" y=\"6\" width=\"46\" height=\"24\" fill=\"currentColor\" fill-opacity=\"0.12\" stroke=\"none\"/><path d=\"M15 13h18M15 19h14M15 25h16\" stroke-opacity=\"0.8\"/>"),
		pills: _("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><rect x=\"10\" y=\"7\" width=\"28\" height=\"6\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.35\" stroke=\"none\"/><rect x=\"10\" y=\"16\" width=\"28\" height=\"6\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.2\" stroke=\"none\"/><rect x=\"10\" y=\"25\" width=\"28\" height=\"6\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.2\" stroke=\"none\"/>"),
		lines: _("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><path d=\"M12 12h24M12 21h24M12 30h24\" stroke-opacity=\"0.8\"/>"),
		flyout: _("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><rect x=\"1\" y=\"6\" width=\"46\" height=\"24\" fill=\"currentColor\" fill-opacity=\"0.12\" stroke=\"none\"/><path d=\"M6 13h10M6 19h8M22 13h10M22 19h8M38 13h6M38 19h4\" stroke-opacity=\"0.8\"/>")
	}, y = {
		grid: _("<rect x=\"1\" y=\"1\" width=\"46\" height=\"32\" rx=\"3\" stroke-opacity=\"0.35\"/><rect x=\"6\" y=\"6\" width=\"10\" height=\"10\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><rect x=\"19\" y=\"6\" width=\"10\" height=\"10\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><rect x=\"32\" y=\"6\" width=\"10\" height=\"10\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><path d=\"M7 20h8M20 20h8M33 20h8\" stroke-opacity=\"0.7\"/><path d=\"M6 26h10M19 26h10M32 26h10\" stroke-opacity=\"0.35\"/>"),
		list: _("<rect x=\"1\" y=\"1\" width=\"46\" height=\"32\" rx=\"3\" stroke-opacity=\"0.35\"/><rect x=\"6\" y=\"6\" width=\"7\" height=\"7\" rx=\"2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><rect x=\"6\" y=\"17\" width=\"7\" height=\"7\" rx=\"2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><path d=\"M17 9.5h24M17 20.5h18\" stroke-opacity=\"0.7\"/>"),
		cover: _("<rect x=\"1\" y=\"1\" width=\"46\" height=\"32\" rx=\"3\" stroke-opacity=\"0.35\"/><rect x=\"6\" y=\"6\" width=\"16\" height=\"12\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><rect x=\"26\" y=\"6\" width=\"16\" height=\"12\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><path d=\"M6 14h16M26 14h16\" stroke-opacity=\"0.55\" stroke-width=\"3\"/><path d=\"M6 23h12M26 23h12\" stroke-opacity=\"0.35\"/>")
	}, b = (e) => `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">${e}</svg>`, x = {
		dot: b("<circle cx=\"12\" cy=\"12\" r=\"3\"/>"),
		dash: b("<rect x=\"3\" y=\"10.6\" width=\"18\" height=\"2.8\" rx=\"1.4\"/>"),
		slash: b("<path d=\"M15.5 3.5L8.5 20.5\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\" fill=\"none\"/>"),
		star: b("<path d=\"M12 2.8l2.3 6.1 6.5.4-5 4.1 1.6 6.3-5.4-3.5-5.4 3.5 1.6-6.3-5-4.1 6.5-.4z\"/>"),
		none: b("<path d=\"M5 12h14\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\" opacity=\"0.35\"/><path d=\"M6 6l12 12\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>"),
		custom: b("<path d=\"M5 8h14M5 12h9M5 16h12\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>")
	}, S = /* @__PURE__ */ O(() => [
		["text", J("opt.ribbonStripe.text")],
		["marks", J("opt.ribbonStripe.marks")],
		["plain", J("opt.ribbonStripe.plain")]
	]), ee = /* @__PURE__ */ O(() => [["none", J("common.none")], ...R(S)]), te = /* @__PURE__ */ O(() => [
		["dot", J("opt.ribbonSep.dot")],
		["dash", J("opt.ribbonSep.dash")],
		["slash", J("opt.ribbonSep.slash")],
		["star", J("opt.ribbonSep.star")],
		["none", J("common.none")],
		["custom", J("opt.ribbonSep.custom")]
	]), ne = /* @__PURE__ */ k("");
	function re() {
		R(ne).trim() && (A(vc, R(ne), !0), A(yc, null), wc() !== !1 && A(ne, ""));
	}
	let ie = [
		["color", xf],
		["gradient", Nf],
		["glow", Pf],
		["image", kp],
		["slideshow", hm],
		["video", Pm],
		["pattern", qf],
		["grain", If]
	], ae = Object.fromEntries(ie), C = {
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
	}, oe = [
		["purple", J("adminTheme.purple")],
		["well", J("adminTheme.well")],
		["gold", J("adminTheme.gold")],
		["grey", J("adminTheme.grey")],
		["aurora", J("adminTheme.aurora")],
		["dusk", J("adminTheme.dusk")],
		["ember", J("adminTheme.ember")]
	], se = {
		lilla: "purple",
		bronn: "well",
		gull: "gold",
		graa: "grey",
		nordlys: "aurora",
		skumring: "dusk",
		glo: "ember"
	}, ce = /* @__PURE__ */ k(an((() => {
		let e = localStorage.getItem("urd-admin-theme");
		return se[e] ?? e ?? "grey";
	})()));
	wn(() => {
		document.documentElement.dataset.adminTheme = R(ce), localStorage.setItem("urd-admin-theme", R(ce)), le();
	});
	function le() {
		let e = getComputedStyle(document.documentElement), t = e.getPropertyValue("--urd-color-accent").trim();
		ot?.sendAdminTheme({
			bg: e.getPropertyValue("--urd-color-bg").trim(),
			surface: e.getPropertyValue("--urd-color-surface").trim(),
			accent: t,
			text: e.getPropertyValue("--urd-color-text").trim(),
			"accent-text": ue(t)
		});
	}
	function ue(e) {
		return yf(e) == null || (bf(e, "#ffffff") ?? 0) >= (bf(e, "#0b0e14") ?? 0) ? "#ffffff" : "#0b0e14";
	}
	let de = /* @__PURE__ */ k(null), fe = /* @__PURE__ */ k(null), pe = /* @__PURE__ */ k(!1), me = /* @__PURE__ */ k(""), he = /* @__PURE__ */ k("info"), ge = 0;
	function w(e, t = "info") {
		A(me, e, !0), A(he, t, !0);
		let n = ++ge;
		t === "ok" && setTimeout(() => {
			ge === n && (A(me, ""), A(he, "info"));
		}, 8e3);
	}
	function _e() {
		w(J("status.storageFull"), "error");
	}
	function ve(e, t) {
		try {
			localStorage.setItem(e, t);
		} catch {
			_e();
		}
	}
	let ye = /* @__PURE__ */ k(null), be = /* @__PURE__ */ k(null), xe = /* @__PURE__ */ k(an({
		size: 16,
		snap: !0
	})), Se = /* @__PURE__ */ k(!0), Ce = /* @__PURE__ */ k(an(Cs(typeof window < "u" ? window : null) ?? 1920)), we = "urd-admin-screen";
	function Te() {
		let e = null;
		try {
			e = JSON.parse(localStorage.getItem(we) ?? "null");
		} catch {
			e = null;
		}
		return ws(e, R(Ce));
	}
	let Ee = /* @__PURE__ */ k(an(Te()));
	function De(e) {
		A(Ee, ws({
			...Ye(R(Ee)),
			...e
		}, R(Ce)), !0);
		try {
			localStorage.setItem(we, JSON.stringify(R(Ee)));
		} catch {}
	}
	let Oe = /* @__PURE__ */ O(() => Ts(R(Ee), R(Ce))), ke = [
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
	], Ae = /* @__PURE__ */ O(() => [{
		id: "desktop",
		width: R(Oe).width,
		height: R(Oe).height || null,
		viewport: "desktop"
	}, ...ke]);
	function Me(e) {
		let t = Ns(R(ll), R(ul), e.width).width;
		return J(e.id === "desktop" ? R(Ee).mode === "own" ? "tip.view.desktop" : e.height ? "tip.view.desktopSizeH" : "tip.view.desktopSize" : `tip.view.${e.id}`, {
			w: e.width,
			h: e.height ?? 0,
			c: t
		});
	}
	let Ne = /* @__PURE__ */ k("desktop"), Pe = /* @__PURE__ */ O(() => R(Ae).find((e) => e.id === R(Ne)) ?? R(Ae)[0]), Fe = /* @__PURE__ */ O(() => R(Pe).viewport === "mobile" || R(Pe).width <= (R(D)?.breakpoints?.mobile ?? 640) ? "mobile" : "desktop"), Ie = /* @__PURE__ */ k(null), Le = /* @__PURE__ */ k(0), Re = /* @__PURE__ */ k(0), ze = /* @__PURE__ */ k("fit"), Be = /* @__PURE__ */ k(1), Ve = /* @__PURE__ */ O(() => Ms(R(ll), R(ul))), He = /* @__PURE__ */ O(() => R(Pe).width), Ue = /* @__PURE__ */ O(() => R(Pe).height ?? 0), We = /* @__PURE__ */ O(() => R(ze) === "manual" ? R(Be) : ls(R(Le), R(He), "fit", R(Re), R(Ue)));
	function Ge(e) {
		let t = Math.min(400, Math.max(10, (Math.round(Math.round(R(We) * 100) / 10) + e) * 10));
		A(Be, t / 100), A(ze, "manual");
	}
	let Ke = /* @__PURE__ */ O(() => R(Ue) > 0 ? R(Ue) : R(We) > 0 ? R(Re) / R(We) : R(Re)), qe = /* @__PURE__ */ O(() => R(He) * R(We)), Je = /* @__PURE__ */ O(() => R(Ue) > 0 ? R(Ue) * R(We) : R(Re)), Xe = /* @__PURE__ */ O(() => R(qe) > R(Le) + 1 || R(Je) > R(Re) + 1);
	wn(() => {
		let e = () => ot?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), wn(() => {
		let e = R(Fe);
		ot?.sendViewport(e);
	}), wn(() => {
		let e = R(We);
		ot?.sendZoom(e);
	}), wn(() => {
		let e = () => {
			A(Ce, Cs(window) ?? R(Ce), !0);
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}), wn(() => {
		let e = R(Ie);
		if (!e || typeof ResizeObserver > "u") return;
		let t = () => {
			A(Le, e.clientWidth, !0), A(Re, e.clientHeight, !0);
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	});
	let Ze = /* @__PURE__ */ k(0);
	function Qe() {
		A(Ze, E?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function tt() {
		let e = E?.data.sections.find((e) => e.responsive?.mobile?.attention?.needed);
		A(Ne, "mobile"), e && setTimeout(() => ot?.sendScrollSection(e.id), 0);
	}
	function nt(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			vt("layout");
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
			}, it(t, "layout-changed"), e.sectionId === R(Pi) && A(Ii, e.minHeight, !0), R(j)?.sectionId === e.sectionId && cn(), E.save(), pt(), ot?.sendSection(R(fe), t);
		}
	}
	function rt(e) {
		return e?.blocks?.some((e) => e.frames?.mobile) ?? !1;
	}
	function it(e, t) {
		e && rt(e) && (e.responsive?.mobile?.attention?.needed || (e.responsive = {
			...e.responsive ?? {},
			mobile: {
				...e.responsive?.mobile ?? { mode: "auto" },
				attention: {
					needed: !0,
					reason: t,
					since: (/* @__PURE__ */ new Date()).toISOString()
				}
			}
		}, Qe(), ot?.sendAttention(e.id, !0)));
	}
	let E = null, at = null, ot = null, D = /* @__PURE__ */ k(null);
	function st() {
		A(D, at.data, !0), at.replace(R(D));
	}
	function ct() {
		ot?.sendSite(Ye(R(D)));
	}
	let dt = /* @__PURE__ */ new Set(), ft = () => R(D).pages.find((e) => e.id === R(fe));
	function pt() {
		let e = R(D)?.pages?.some((e) => !dt.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = ad?.hasDraft() || Object.values(od).some((e) => e.hasDraft()), n = bd?.hasDraft() || Object.values(xd).some((e) => e.hasDraft());
		A(pe, e || E?.hasDraft() && !dt.has(R(fe)) || at?.hasDraft() || of?.hasDraft() || t || n || !1, !0);
	}
	let mt = [], ht = [], gt = null;
	function _t() {
		return JSON.stringify({
			pageId: R(fe),
			page: E.data,
			site: at.data,
			collectionsIndex: cd ? ad.data : null,
			collections: cd ? Object.fromEntries(Object.entries(od).map(([e, t]) => [e, t.data])) : {},
			templatesIndex: wd ? bd.data : null,
			templates: wd ? Object.fromEntries(Object.entries(xd).map(([e, t]) => [e, t.data])) : {},
			plugins: of?.data ?? null
		});
	}
	function vt(e) {
		(e !== gt || !e.startsWith("edit:") && !e.startsWith("grid:")) && (mt.push(_t()), mt.length > 50 && mt.shift(), ht.length = 0, gt = e);
	}
	function yt(e) {
		let { pageId: t, page: n, site: r, collectionsIndex: i, collections: a, templatesIndex: o, templates: s, plugins: c } = JSON.parse(e);
		if (at.replace(r), st(), at.save(), A(xe, {
			snap: !0,
			...R(D).grid
		}, !0), ct(), bt(i, a ?? {}), xt(o, s ?? {}), Ct(c), t && t !== R(fe) && R(D).pages.some((e) => e.id === t)) {
			ve(`urd-draft-${t}`, JSON.stringify(n)), Ys(t, { keepHistory: !0 }), pt();
			return;
		}
		E.replace(n), E.save(), pt(), Qe(), cn(), Wi(E.data.sections.find((e) => e.id === R(Pi))), R(D).pages.some((e) => e.id === R(fe)) ? ot?.sendPage(R(fe), E.data) : Ys(R(D).pages[0].id, { keepHistory: !0 });
	}
	function bt(e, t) {
		if (ad && e && JSON.stringify({
			index: ad.data,
			collections: Object.fromEntries(Object.entries(od).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			collections: t
		})) {
			ad.replace(e), ad.save();
			for (let e of Object.keys(od)) e in t || (localStorage.removeItem(`urd-draft-collection-${e}`), localStorage.removeItem(`urd-draft-samling-${e}`), delete od[e]);
			for (let [e, n] of Object.entries(t)) {
				if (!od[e]) {
					let t = sd[e] ?? null;
					od[e] = ha(`urd-draft-collection-${e}`, () => t, _e, `urd-draft-samling-${e}`);
				}
				od[e].replace(n), od[e].save();
			}
			A(ld, [...e.samlinger ?? []], !0), R(dd) && !R(ld).includes(R(dd)) && A(dd, null), Pd();
		}
	}
	function xt(e, t) {
		if (bd && e && JSON.stringify({
			index: bd.data,
			templates: Object.fromEntries(Object.entries(xd).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			templates: t
		})) {
			bd.replace(e), bd.save();
			for (let e of Object.keys(xd)) e in t || (localStorage.removeItem(`urd-draft-template-${e}`), localStorage.removeItem(`urd-draft-mal-${e}`), delete xd[e]);
			for (let [e, n] of Object.entries(t)) xd[e] || (xd[e] = ha(`urd-draft-template-${e}`, () => Sd[e] ?? null, _e, `urd-draft-mal-${e}`)), xd[e].replace(n), xd[e].save();
			A(Td, [...e.maler ?? []], !0), pt(), Dd();
		}
	}
	function Ct(e) {
		of && e && JSON.stringify(of.data) !== JSON.stringify(e) && (of.replace(e), of.save(), kf(), Wf());
	}
	function wt() {
		mt.length && (ir(), ht.push(_t()), yt(mt.pop()), gt = null, w(J("status.undone")));
	}
	function Tt() {
		ht.length && (ir(), mt.push(_t()), yt(ht.pop()), gt = null, w(J("status.redone")));
	}
	function Et(e) {
		R(un) && (e.target instanceof Element && e.target.closest(".block-menu") || A(un, null));
	}
	function Dt(e) {
		if (e.key === "Escape" && R(un)) {
			A(un, null);
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
			].includes(t.type)) || !R(j) || R(Fe) === "mobile") return;
			e.preventDefault(), ot?.sendDuplicate();
			return;
		}
		if (t !== "z" && t !== "y") return;
		let n = e.target;
		n instanceof HTMLElement && (n.isContentEditable || n.tagName === "TEXTAREA" || n.tagName === "INPUT" && ![
			"number",
			"checkbox",
			"range",
			"color"
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? Tt() : wt());
	}
	async function Ot() {
		A(de, Wl(await (await fetch("/content/site.json")).json()), !0), at = ha("urd-draft-site", () => R(de), _e), (at.data.schemaVersion ?? 1) > 4 && (console.warn(`Urd: the site draft has schemaVersion ${at.data.schemaVersion} (the engine has 4) and is discarded`), at.replace(Ye(R(de)))), at.replace(Wl(at.data)), at.save(), st(), A(xe, {
			snap: !0,
			...R(D).grid
		}, !0), await Ys(new URLSearchParams(location.search).get("page") ?? R(D).pages[0].id), await Ff(), await Nd(), await Ed(), await zo(), R(be) && Vo(), rn(), R(D).site.setup === !0 && !localStorage.getItem("urd-setup-done") && (A(Ft, R(D).site.title, !0), A(It, R(D).theme.tokens.color.accent, !0), A(Lt, R(D).theme.tokens.color.bg, !0), A(Pt, !0));
	}
	let kt = /* @__PURE__ */ k(null);
	function At({ title: e, lines: t = [], okLabel: n = J("confirm.ok"), cancelLabel: r = J("confirm.cancel") }) {
		return new Promise((i) => {
			A(kt, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function jt({ title: e, lines: t = [], value: n = "", placeholder: r = "", okLabel: i = J("confirm.ok"), cancelLabel: a = J("confirm.cancel") }) {
		return new Promise((o) => {
			A(kt, {
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
	function Mt(e) {
		R(kt)?.resolve(R(kt).prompt ? e ? R(kt).value : null : e), A(kt, null);
	}
	let Nt = !1;
	wn(() => {
		if (!R(kt)) return;
		let e = (e) => {
			e.key === "Escape" && (e.stopPropagation(), Mt(!1));
		};
		return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
	});
	let Pt = /* @__PURE__ */ k(!1), Ft = /* @__PURE__ */ k(""), It = /* @__PURE__ */ k("#7c5cff"), Lt = /* @__PURE__ */ k("#0b0e14");
	function Rt() {
		localStorage.setItem("urd-setup-done", "1"), A(Pt, !1);
	}
	function zt() {
		let e = R(Ft).trim();
		e && (X("setup", () => {
			R(D).site.title = e, R(D).nav.logo = {
				type: "text",
				value: e
			}, R(D).theme.tokens.color.accent = R(It), R(D).theme.tokens.color.bg = R(Lt), delete R(D).site.setup;
		}), Rt(), w(J("status.setupDone"), "ok"));
	}
	let Bt = "urd-admin-panels", Vt = "urd-admin-panel-open", Ht = /* @__PURE__ */ k(an(localStorage.getItem(Bt) === "reset" ? "reset" : "remember"));
	function Ut(e) {
		A(Ht, e === "reset" ? "reset" : "remember", !0), R(Ht) === "reset" ? localStorage.setItem(Bt, "reset") : localStorage.removeItem(Bt);
	}
	let Wt = /* @__PURE__ */ k(an(R(Ht) === "reset" ? null : localStorage.getItem(Vt))), Gt = [
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
	], Kt = [
		"rail.thisPage",
		"rail.site",
		"rail.system"
	], qt = Object.fromEntries(Gt.flat().map((e) => [e, J(`panel.${e}`)]));
	R(Wt) && !qt[R(Wt)] && A(Wt, null), wn(() => {
		if (R(Ht) === "reset") {
			localStorage.removeItem(Vt);
			return;
		}
		R(Wt) ? localStorage.setItem(Vt, R(Wt)) : localStorage.removeItem(Vt);
	});
	let Jt = {
		pages: ["hint.pages.drafts"],
		blocks: ["hint.blocks.intro"],
		grid: ["hint.grid.intro", "hint.grid.section"],
		collections: ["hint.collections.intro"],
		plugins: ["hint.plugins.intro"],
		history: ["hint.history.intro"]
	}, Yt = [
		["se", "Davvisámegiella"],
		["en-GB", "English (UK)"],
		["nb", "Norsk bokmål"],
		["nn", "Norsk nynorsk"],
		["tr", "Türkçe"]
	], Xt = (e) => [...e].sort((e, t) => e[1].localeCompare(t[1]));
	function Zt(e, t) {
		let n = [];
		for (let r of e) for (let e of gf[r]?.languages ?? []) e?.[t] === !0 && typeof e.code == "string" && typeof e.name == "string" && e.name && (Yt.some(([t]) => t === e.code) || n.some(([t]) => t === e.code) || n.push([e.code, e.name]));
		return n;
	}
	function Qt() {
		let e = Xt([...Yt, ...Zt(R(Ef), "admin")]);
		return en === "auto" || e.some(([e]) => e === en) ? e : [[en, en], ...e];
	}
	let $t = () => Zt(R(hf)?.enabled ?? [], "site"), en = localStorage.getItem("urd-admin-lang") ?? "auto";
	function tn(e) {
		e !== en && (e === "auto" ? localStorage.removeItem("urd-admin-lang") : localStorage.setItem("urd-admin-lang", e), location.reload());
	}
	function nn(e) {
		A(Wt, R(Wt) === e ? null : e, !0), rn();
	}
	function rn() {
		R(Wt) === "history" && Jo(), R(Wt) === "update" && !R(ms) && gs();
	}
	let j = /* @__PURE__ */ k(null);
	function sn(e, t) {
		let n = E?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function cn() {
		if (!R(j)) return;
		let { block: e } = sn(R(j).sectionId, R(j).blockId);
		if (!e) {
			A(j, null);
			return;
		}
		A(j, {
			sectionId: R(j).sectionId,
			blockId: R(j).blockId,
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
	function ln(e) {
		if (A(un, null), !e.blockId) {
			A(j, null);
			return;
		}
		A(j, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), e.sectionId && A(Pi, e.sectionId, !0), cn();
	}
	let un = /* @__PURE__ */ k(null), dn = "urd-admin-menu-width", fn = /* @__PURE__ */ k(an(localStorage.getItem(dn) === "narrow" ? "narrow" : "wide")), pn = /* @__PURE__ */ k(localStorage.getItem(dn) !== "narrow");
	function mn(e) {
		A(fn, e === "narrow" ? "narrow" : "wide", !0), A(pn, R(fn) === "wide"), R(fn) === "narrow" ? localStorage.setItem(dn, "narrow") : localStorage.removeItem(dn);
	}
	let hn = new da(), gn = /* @__PURE__ */ k(8), _n = /* @__PURE__ */ k(an(Infinity));
	function vn() {
		let e = R(Ie)?.getBoundingClientRect().left ?? 0;
		A(gn, Math.round(e) + 8), A(_n, window.innerWidth - R(gn) - 8);
	}
	let yn = /* @__PURE__ */ O(() => R(pn) && R(_n) >= 740);
	wn(() => {
		if (R(un)) return vn(), window.addEventListener("resize", vn), () => window.removeEventListener("resize", vn);
	});
	let bn = /* @__PURE__ */ k(an(os(localStorage)));
	function xn() {
		return R(bn)[R(j).type] ?? es;
	}
	function Sn(e) {
		A(bn, {
			...R(bn),
			[R(j).type]: e
		}, !0), ss(localStorage, R(bn));
	}
	function Cn(e) {
		Sn(is(R(j).type, xn(), e));
	}
	function Tn() {
		let e = xn(), t = new Map(En().map((e) => [e.id, e]));
		return ns(R(j).type, e, new Set(t.keys())).map((e) => t.get(e));
	}
	function En() {
		let e = R(j), t = [];
		e.type === "calendar" && (t.push({
			id: "design",
			label: J("calendar.design"),
			kind: "open",
			value: J(Nc(e.props.design).labelKey),
			run: () => A(On, { mode: "set" }, !0)
		}), [
			"list",
			"cards",
			"agenda"
		].includes(Pc(e.props)) && t.push({
			id: "limit",
			label: J("lbl.maxCount"),
			kind: "number",
			min: 1,
			max: 50,
			value: e.props.limit ?? 6,
			set: (e) => L("limit", Math.max(1, Math.min(50, Number(e) || 6)))
		}), t.push({
			id: "subscribe",
			label: J("quick.subscribe"),
			kind: "choice",
			value: e.props.showSubscribe === !1 ? "off" : "on",
			options: [["on", J("common.on")], ["off", J("common.off")]],
			set: (e) => L("showSubscribe", e === "on")
		}));
		let n = vr.has(e.type);
		t.push({
			id: "fit",
			label: J("quick.fit"),
			kind: "choice",
			value: e.fit === "shrink" || e.fit === "both" ? e.fit : "wrap",
			options: n ? [["wrap", J("quick.fit.fluid")], ["shrink", J("quick.fit.floor")]] : [
				["wrap", J("quick.fit.wrap")],
				...B() || e.fit === "shrink" ? [["shrink", J("quick.fit.shrink")]] : [],
				["both", J("quick.fit.both")]
			],
			set: (e) => yr(e)
		}), t.push({
			id: "phone",
			label: J("quick.phone"),
			kind: "choice",
			value: e.hideMobile ? "off" : "on",
			options: [["on", J("quick.phone.show")], ["off", J("quick.phone.hide")]],
			set: (e) => Ei(e === "off")
		});
		let r = e.props;
		return e.type === "text" ? (t.push({
			id: "align",
			label: J("lbl.align"),
			kind: "choice",
			value: r.align ?? "left",
			options: [
				["left", J("common.left")],
				["center", J("common.center")],
				["right", J("common.right")]
			],
			set: (e) => L("align", e)
		}), t.push({
			id: "textBox",
			label: J("group.textBox"),
			kind: "choice",
			value: r.box ? "on" : "off",
			options: Gn(),
			set: (e) => L("box", e === "on")
		})) : e.type === "button" ? (t.push({
			id: "goesTo",
			label: J("lbl.goesTo"),
			kind: "select",
			value: r.page ?? "__href",
			options: Kn(),
			set: qn
		}), t.push({
			id: "btnStyle",
			label: J("lbl.style"),
			kind: "select",
			value: r.style ?? "primary",
			options: [["primary", J("opt.btn.primary")], ["secondary", J("opt.btn.secondary")]],
			set: (e) => L("style", e)
		})) : e.type === "image" ? (t.push({
			id: "imgFit",
			label: J("lbl.imageFit"),
			kind: "select",
			value: r.fit ?? "cover",
			options: [["cover", J("opt.fitFrame.cover")], ["contain", J("opt.fitFrame.contain")]],
			set: (e) => L("fit", e)
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
			set: (e) => L("radius", e || null)
		})) : e.type === "video" ? t.push({
			id: "videoSource",
			label: J("lbl.videoSource"),
			kind: "choice",
			value: r.source === "file" ? "file" : "embed",
			options: [["embed", J("opt.videoSource.embed")], ["file", J("opt.videoSource.file")]],
			set: (e) => L("source", e)
		}) : e.type === "icon" ? (t.push({
			id: "iconSize",
			label: J("lbl.sizePx"),
			kind: "number",
			min: 8,
			max: 400,
			value: r.size ?? 48,
			set: (e) => L("size", Math.max(8, Math.min(400, Number(e) || 48)))
		}), t.push({
			id: "iconColor",
			label: J("lbl.color"),
			kind: "color",
			value: r.color ?? "accent",
			set: (e) => L("color", e)
		})) : e.type === "shape" && (t.push({
			id: "shapeColor",
			label: J("lbl.color"),
			kind: "select",
			value: r.color ?? "accent",
			options: Ni,
			set: (e) => L("color", e)
		}), t.push({
			id: "thickness",
			label: J("lbl.thickness"),
			kind: "number",
			min: 1,
			max: 40,
			value: r.thickness ?? 2,
			set: (e) => L("thickness", Math.max(1, Math.min(40, Number(e) || 2)))
		})), Cl.has(e.type) || t.push({
			id: "size",
			label: J("lbl.scale"),
			kind: "number",
			min: wl.min * 100,
			max: wl.max * 100,
			step: 5,
			value: Math.round(El(e) * 100),
			set: (e) => {
				xr = null, Sr(Math.min(wl.max, Math.max(wl.min, (Number(e) || 100) / 100))), xr = null;
			}
		}), t;
	}
	function Dn() {
		let e = R(j).props, t = Nc(e.design), n = (e, t) => () => Hn(e, t), r = Pc(e), i = r === "agenda" ? 8 : 6, a = r === "next" ? 3 : void 0, o = e.switcher === !0 || e.switcherViews != null || e.toolsSize != null || e.description != null || e.showMore === !1 || (e.limit ?? 6) !== i || e.nextCount !== a || e.laterCount !== a || e.showCancelled === !1 || e.structuredData === !1 || e.clock != null || e.weekStart != null, s = [
			!t.ownFilter && e.showCategories === !0,
			e.showSubscribe !== !1,
			e.showSignup === !0,
			e.showSearch === !0,
			e.showEarlier === !0
		].filter(Boolean).length, c = s > 0 || e.showOpen === !1 || e.showAdd === !1 || !!e.programHref, l = !!e.emptyText || e.emptyIcon != null && e.emptyIcon !== "calendar", u = Ac(e.design).filter((t) => e.options?.[t.key] != null).length, d = t.slots.filter((t) => e.colors?.[t.key]).length, f = Object.keys(e.fieldStyle ?? {}).length;
		return {
			sources: String((e.sources ?? []).filter((e) => {
				let t = Xr(e);
				return t.ref ? !!Bl(t.ref) : t.url.trim();
			}).length),
			view: J(or[Pc(e)]),
			viewReset: o ? n("cal-view", {
				switcher: void 0,
				switcherViews: void 0,
				toolsSize: void 0,
				description: void 0,
				showMore: void 0,
				limit: i,
				nextCount: a,
				laterCount: a,
				showCancelled: void 0,
				structuredData: void 0,
				clock: void 0,
				weekStart: void 0
			}) : null,
			buttons: s ? J("menu.onCount", { n: s }) : J("common.off"),
			buttonsReset: c ? n("cal-buttons", {
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
			emptyReset: l ? n("cal-empty", {
				emptyText: void 0,
				emptyIcon: void 0
			}) : null,
			notice: e.notice?.show === !0 ? J("common.on") : J("common.off"),
			noticeReset: e.notice ? n("cal-notice", { notice: void 0 }) : null,
			opts: u ? J("menu.changed", { n: u }) : J("menu.standard"),
			optsReset: u ? n("cal-opts", { options: void 0 }) : null,
			colors: d ? J("menu.changedOf", {
				n: d,
				m: t.slots.length
			}) : J("menu.standard"),
			colorsReset: d ? n("cal-colors", { colors: void 0 }) : null,
			stripe: Bc(t, e.stripe).show ? J("common.on") : J("common.off"),
			stripeReset: e.stripe ? n("cal-stripe", { stripe: void 0 }) : null,
			fields: f ? J("menu.changed", { n: f }) : J("menu.standard"),
			fieldsReset: f ? n("cal-fields", { fieldStyle: void 0 }) : null
		};
	}
	let On = /* @__PURE__ */ k(null);
	wn(() => {
		R(On)?.mode === "set" && R(j)?.type !== "calendar" && A(On, null);
	});
	let kn = /* @__PURE__ */ k(""), An = /* @__PURE__ */ k(""), jn = null;
	wn(() => {
		let e = R(j)?.blockId ?? null;
		e !== jn && (jn = e, A(kn, ""), A(An, ""));
	}), wn(() => {
		R(un) || A(kn, "");
	});
	let Mn = () => R(kn), Nn = () => R(An);
	function Pn(e) {
		A(kn, e, !0);
	}
	function Fn(e) {
		A(An, e, !0);
	}
	function In() {
		let e = bo(R(j).animation) ? R(j).animation.type : R(j).hover?.type, t = e ? [...So, ...Co].find(([t]) => t === e) : null;
		return t ? t[1] : J("common.none");
	}
	let Ln = window.matchMedia("(prefers-reduced-motion: reduce)").matches, Rn = [
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
	function zn() {
		let e = E?.data.sections ?? [], t = e.findIndex((e) => e.id === R(j)?.sectionId);
		return t < 0 ? [["", J("opt.sticky.ownSection")]] : [["", J("opt.sticky.ownSection")], ...e.slice(t + 1).map((e, n) => [e.id, J("opt.sticky.atSection", { n: t + 2 + n })])];
	}
	function Bn(e) {
		if (ln(e), !R(j)) return;
		vn();
		let t = Math.min(R(pn) && R(_n) >= 740 ? 740 : 400, window.innerWidth - 16), n = R(ye)?.getBoundingClientRect();
		if (!n) return;
		let r = n.left + R(We) * e.rect.right + 12;
		r + t > window.innerWidth - 8 && (r = Math.max(8, n.left + R(We) * e.rect.left - t - 12));
		let i = window.innerHeight - Math.min(window.innerHeight * .7, 560) - 8, a = Math.min(Math.max(8, n.top + R(We) * e.rect.top), Math.max(8, i));
		A(un, {
			left: r,
			top: a
		}, !0);
	}
	function Vn(e, t) {
		let { section: n, block: r } = sn(R(j)?.sectionId, R(j)?.blockId);
		r && (e && vt(e), t(r, n), it(n, "block-edited"), E.save(), pt(), ot?.sendSection(R(fe), n), cn(), Qn(n.id, r));
	}
	function L(e, t) {
		Vn(`edit:${R(j).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function Hn(e, t) {
		Vn(`edit:${R(j).blockId}:${e}`, (e) => {
			Object.assign(e.props, t);
		});
	}
	function Un(e, t) {
		let n = R(j).props;
		return Object.entries(t).some(([e, t]) => n[e] !== void 0 && JSON.stringify(n[e]) !== JSON.stringify(t)) ? () => Hn(e, { ...t }) : null;
	}
	function Wn(e) {
		let t = R(j).props;
		return Object.entries(e).filter(([e, n]) => t[e] !== void 0 && JSON.stringify(t[e]) !== JSON.stringify(n)).length;
	}
	let Gn = () => [["on", J("common.on")], ["off", J("common.off")]];
	function Kn() {
		return [...R(D).pages.map((e) => [e.id, e.title]), ["__href", J("opt.externalLink")]];
	}
	function qn(e) {
		let t = e === "__href" ? null : e;
		Vn(`edit:${R(j).blockId}`, (e) => {
			e.props.page = t, t && (e.props.href = null);
		});
	}
	function Jn() {
		ot?.sendOpenImageEditor(R(j).blockId), A(un, null);
	}
	let Yn = /* @__PURE__ */ new Map(), Xn = /* @__PURE__ */ new Map(), Zn = 0;
	function Qn(e, t) {
		if (nr(e, t), R(Fe) !== "desktop" || !bl(t)) return;
		clearTimeout(Yn.get(t.id));
		let n = ++Zn;
		Xn.set(t.id, n), Yn.set(t.id, setTimeout(() => ot?.sendFitBlock(e, t.id, n), 60));
	}
	let $n = /* @__PURE__ */ new Map(), er = null, tr = "";
	function nr(e, t) {
		if (!xl.has(t.type) || !bl(t)) return;
		er ??= Yo({
			title: () => J("canvas.phoneMeasure"),
			prepare: (e, t) => {
				let n = Ye(R(hf))?.enabled ?? [], r = JSON.stringify(n);
				(t || r !== tr) && e({
					type: "urd-plugins",
					enabled: n
				}), tr = r, e({
					type: "urd-site",
					site: Ye(R(D))
				}), e({
					type: "urd-collections",
					collections: Ye(R(ud)) ?? {}
				});
			},
			onHeight: rr
		});
		let n = ++Zn;
		$n.set(t.id, n), er.request(R(fe), Ye(E.data), e, t.id, n);
	}
	function rr(e, t, n, r) {
		if (e !== R(fe) || r !== $n.get(t)) return;
		let i = E.data.sections.flatMap((e) => e.blocks).find((e) => e.id === t), a = Math.round(n);
		i && a > 0 && i.mobileHeight !== a && (i.mobileHeight = a, E.save(), pt());
	}
	function ir() {
		for (let e of Yn.values()) clearTimeout(e);
		Yn.clear(), Xn.clear(), $n.clear(), er?.cancel();
	}
	let ar = /* @__PURE__ */ k("title"), or = {
		list: "calendar.viewList",
		cards: "calendar.viewCards",
		month: "calendar.viewMonth",
		agenda: "calendar.viewAgenda",
		next: "calendar.viewNext",
		week: "calendar.viewWeek",
		day: "calendar.viewDay",
		year: "calendar.viewYear"
	};
	function sr(e, t) {
		let n = { ...R(j).props.options ?? {} };
		t === e.def || t == null ? delete n[e.key] : n[e.key] = t, L("options", Object.keys(n).length ? n : void 0);
	}
	function cr(e, t) {
		return e.key === "firstMonth" && t === "now" ? J("calendar.opt.firstMonth.now") : e.key === "firstMonth" ? new Intl.DateTimeFormat(ia(), { month: "long" }).format(new Date(2024, Number(t), 1)) : J(`${e.labelKey}.${t}`);
	}
	function lr(e) {
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
	function ur() {
		return R(j)?.props.fieldStyle?.[R(ar)] ?? {};
	}
	function dr(e) {
		let t = R(j).props.texts?.[e];
		return typeof t == "string" ? new DOMParser().parseFromString(t.replace(/<br\s*\/?>/gi, "\n"), "text/html").body.textContent.trim() : "";
	}
	function fr(e, t) {
		let n = t.trim(), r = { ...R(j).props.texts ?? {} };
		n ? r[e] = n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>") : delete r[e], L("texts", Object.keys(r).length ? r : void 0);
	}
	function pr(e) {
		let t = Nc(e), n = t.view === "next" ? {
			nextCount: R(j).props.nextCount ?? 3,
			laterCount: R(j).props.laterCount ?? 3
		} : {}, r = t.id === "plain" && ![
			"list",
			"cards",
			"month",
			"agenda",
			"next"
		].includes(Pc(R(j).props)) ? { view: "list" } : {};
		Hn("design", {
			design: t.id === "plain" ? void 0 : t.id,
			...t.view ? { view: t.view } : {},
			...r,
			...n
		});
	}
	function mr(e, t) {
		let n = { ...R(j).props.colors ?? {} };
		t ? n[e] = t : delete n[e], L("colors", Object.keys(n).length ? n : void 0);
	}
	function hr(e) {
		let t = {
			...R(j).props.stripe ?? {},
			...e
		};
		for (let e of Object.keys(t)) t[e] === void 0 && delete t[e];
		L("stripe", Object.keys(t).length ? t : void 0);
	}
	function _r(e) {
		let t = { ...R(j).props.fieldStyle ?? {} }, n = {
			...t[R(ar)] ?? {},
			...e
		};
		for (let e of Object.keys(n)) n[e] === void 0 && delete n[e];
		Object.keys(n).length ? t[R(ar)] = n : delete t[R(ar)], L("fieldStyle", Object.keys(t).length ? t : void 0);
	}
	let vr = /* @__PURE__ */ new Set([
		"image",
		"video",
		"shape",
		"icon"
	]);
	function yr(e) {
		Vn(`edit:${R(j).blockId}:fit`, (t) => {
			e === "shrink" || e === "both" ? (t.fit = e, t.fitMin ??= .6) : (delete t.fit, delete t.fitMin);
		});
	}
	function br(e) {
		Vn(`edit:${R(j).blockId}:fitMin`, (t) => {
			t.fitMin = e;
		});
	}
	let xr = null;
	function Sr(e) {
		Vn(`edit:${R(j).blockId}:size`, (t, n) => {
			xr?.blockId !== t.id && (xr = {
				blockId: t.id,
				size: El(t),
				frame: { ...t.frames.desktop },
				ys: new Map(n.blocks.filter((e) => e.frames?.desktop).map((e) => [e.id, e.frames.desktop.y]))
			}), e === 1 ? (delete t.size, delete t.sizeMin, delete t.sizeMax) : t.size = e;
			let r = xr;
			for (let e of n.blocks) e.id !== t.id && e.frames?.desktop && r.ys.has(e.id) && (e.frames.desktop = {
				...e.frames.desktop,
				y: r.ys.get(e.id)
			});
			t.frames.desktop = { ...r.frame };
			let i = El(t) / r.size;
			if (i === 1) return;
			let a = {
				...r.frame,
				w: Math.min(Math.round(r.frame.w * i * 100) / 100, Math.round((100 - r.frame.x) * 100) / 100)
			};
			if (!bl(t)) {
				a.h = Math.max(1, Math.round(r.frame.h * i));
				for (let [e, r] of kl(n.blocks, t.id, a.h)) {
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
	function Cr(e, t) {
		let n = e === "sizeMin" ? Tl.minDefault : Tl.maxDefault;
		Vn(`edit:${R(j).blockId}:${e}`, (r) => {
			let i = Math.round(Number(t));
			Number.isFinite(i) && i > 0 && i !== n ? r[e] = Math.min(Tl.max, Math.max(Tl.min, i)) : delete r[e];
		});
	}
	function wr(e) {
		Vn(`edit:${R(j).blockId}:height`, (t) => {
			e === "own" ? t.height = { mode: "own" } : delete t.height;
		});
	}
	function Er(e) {
		Vn(`edit:${R(j).blockId}:heightAlign`, (t) => {
			t.height = { mode: "own" }, e !== "top" && (t.height.align = e);
		});
	}
	function Or() {
		let e = R(j);
		if (Sl.has(e.type)) return !0;
		if (e.type !== "calendar") return !1;
		let t = Nc(e.props.design);
		return !t.module && ["list", "cards"].includes(t.view);
	}
	let kr = an({}), Ar = an({}), jr = /* @__PURE__ */ k(!1), Mr = /* @__PURE__ */ k("content"), Nr = (e, t) => (Number.isFinite(t) || (t = e.min ?? 0), e.min != null && (t = Math.max(e.min, t)), e.max != null && (t = Math.min(e.max, t)), t);
	async function Pr(e) {
		let t = R(j).blockId, n = `${t}:${e.key}`, r = (kr[n] ?? R(j).props[e.key] ?? "").trim();
		Ar[n] = null;
		let i = r.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
		if (!r || i || /^https?:\/\//i.test(r)) {
			Hn(e.key, {
				[e.key]: r,
				lat: i ? Number(i[1]) : null,
				lon: i ? Number(i[2]) : null
			});
			return;
		}
		A(jr, !0), Ar[n] = {
			text: J("props.place.searching"),
			err: !1
		};
		try {
			let i = await fetch(`/api/geocode?q=${encodeURIComponent(r)}`), a = await i.json().catch(() => null);
			if (R(j)?.blockId !== t) return;
			i.ok && Number.isFinite(a?.lat) ? (Hn(e.key, {
				[e.key]: r,
				lat: a.lat,
				lon: a.lon
			}), Ar[n] = null) : Ar[n] = {
				text: ra(a) ?? J("props.place.notFound"),
				err: !0
			};
		} catch {
			Ar[n] = {
				text: J("props.place.failed"),
				err: !0
			};
		} finally {
			A(jr, !1);
		}
	}
	function Fr(e, t) {
		Number.isFinite(t) && Vn(`edit:frame-${R(j).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function B() {
		let e = E.data.sections.find((e) => e.id === R(j)?.sectionId)?.size?.maxWidth, t = typeof R(ll) == "number" ? R(ll) : 0;
		return e === "full" ? 0 : e ? /^\d+(\.\d+)?px$/.test(e) ? Math.min(parseFloat(e), t || Infinity) : 0 : t;
	}
	function Rr(e) {
		return Math.round(e / 100 * B());
	}
	function zr(e, t) {
		let n = B();
		if (!Number.isFinite(e) || e < 4 || !(n > 0)) return;
		let { x: r, w: i, h: a } = R(j).frame, o = Math.max(.5, Math.min(Math.round(e / n * 200) / 2, Math.round((100 - r) * 2) / 2)), s = t ? Math.max(1, Math.round(o / i * a)) : a;
		Number.isFinite(o) && Number.isFinite(s) && Vn(`edit:frame-${R(j).blockId}:size`, (e) => {
			e.frames.desktop = {
				...e.frames.desktop,
				w: o,
				h: s
			};
		});
	}
	function Br(e) {
		Vn(`edit:${R(j).blockId}:boxStyle`, (t) => {
			let n = {
				...t.props.boxStyle ?? {},
				...e
			};
			for (let e of Object.keys(n)) n[e] ?? delete n[e];
			Object.keys(n).length ? t.props.boxStyle = n : delete t.props.boxStyle;
		});
	}
	let Vr = [
		"text",
		"email",
		"tel",
		"textarea",
		"select",
		"checkbox",
		"radio",
		"date"
	], Hr = /* @__PURE__ */ new Set(["select", "radio"]), Ur = () => "f" + [...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(3))].map((e) => e.toString(16).padStart(2, "0")).join("");
	function Wr(e, t) {
		Vn(`edit:${R(j).blockId}:field${e}`, (n) => {
			let r = {
				...n.props.fields[e],
				...t
			};
			Hr.has(r.type) ? r.options ??= [] : delete r.options, n.props.fields[e] = r;
		});
	}
	function Gr(e, t) {
		Wr(e, { options: String(t).split(",").map((e) => e.trim()).filter(Boolean) });
	}
	function Kr() {
		Vn("form-field", (e) => {
			(e.props.fields ??= []).push({
				id: Ur(),
				label: J("form.newField"),
				type: "text",
				required: !1
			});
		});
	}
	function qr(e) {
		Vn("form-field", (t) => {
			t.props.fields.splice(e, 1);
		});
	}
	function Yr(e, t) {
		let n = e + t;
		Vn("form-field", (t) => {
			n < 0 || n >= t.props.fields.length || ([t.props.fields[e], t.props.fields[n]] = [t.props.fields[n], t.props.fields[e]]);
		});
	}
	let Xr = (e) => e && typeof e == "object" && "calendar" in e ? {
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
	}, Zr = ({ ref: e, url: t, name: n, color: r }) => e ? { calendar: e } : n || r ? {
		url: t,
		...n ? { name: n } : {},
		...r ? { color: r } : {}
	} : t, $r = () => new Set((R(j).props.sources ?? []).map((e) => Xr(e).ref).filter(Boolean));
	function ei(e, t) {
		let n = Ye(R(j).props.sources ?? []).filter((t) => Xr(t).ref !== e);
		L("sources", t ? [...n, { calendar: e }] : n);
	}
	function ti(e) {
		let t = Ye(R(j).props.sources ?? []), { url: n, name: r, color: i } = Xr(t[e]), a = Vl({
			url: n.trim(),
			...r ? { name: r } : {},
			...i ? { color: i } : {}
		});
		L("sources", t.map((t, n) => n === e ? { calendar: a } : t));
	}
	function ni(e, t) {
		Vn(`edit:${R(j).blockId}:source${e}`, (n) => {
			let r = [...n.props.sources ?? []];
			r[e] = Zr({
				...Xr(r[e]),
				...t
			}), n.props.sources = r;
		});
	}
	function ri() {
		L("sources", [...Ye(R(j).props.sources ?? []), ""]);
	}
	function ai(e) {
		L("sources", Ye(R(j).props.sources ?? []).filter((t, n) => n !== e));
	}
	function oi(e, t) {
		Vn(`edit:${R(j).blockId}:faq${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function si() {
		Vn("faq-item", (e) => {
			(e.props.items ??= []).push({
				q: J("seed.faq.newQ"),
				a: J("seed.faq.answer")
			});
		});
	}
	function ci(e) {
		Vn("faq-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function li(e, t) {
		let n = e + t;
		Vn("faq-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function ui(e, t) {
		Vn(`edit:${R(j).blockId}:ribbon${e}`, (n) => {
			n.props.items[e] = t;
		});
	}
	function di() {
		Vn("ribbon-item", (e) => {
			(e.props.items ??= []).push(J("seed.ribbonBlock.new"));
		});
	}
	function fi(e) {
		Vn("ribbon-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function mi(e, t) {
		let n = e + t;
		Vn("ribbon-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function gi(e, t) {
		Vn(`edit:${R(j).blockId}:tl${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function _i() {
		Vn("tl-item", (e) => {
			(e.props.items ??= []).push({
				year: "",
				title: J("seed.timeline.newTitle"),
				text: ""
			});
		});
	}
	function vi(e) {
		Vn("tl-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function yi(e, t) {
		let n = e + t;
		Vn("tl-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function bi(e) {
		Vn("decor", (t) => {
			t.decor = e;
		});
	}
	function Si(e, t) {
		Vn(`edit:${R(j).blockId}:table-form`, (n) => {
			let r = (Array.isArray(n.props.rows) && n.props.rows.length ? n.props.rows : [[""]]).map((e) => Array.isArray(e) ? e.map((e) => String(e ?? "")) : [""]), i = Math.max(1, ...r.map((e) => e.length));
			r = r.map((e) => [...e, ...Array(i - e.length).fill("")]), e > 0 ? r.push(Array(i).fill("")) : e < 0 && r.length > 1 && r.pop(), t > 0 ? r = r.map((e) => [...e, ""]) : t < 0 && i > 1 && (r = r.map((e) => e.slice(0, i - 1))), n.props.rows = r;
		});
	}
	function wi(e, t) {
		Vn(`edit:${R(j).blockId}:share`, (n) => {
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
	function Ti(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		let n = new FileReader();
		n.onload = () => {
			L("src", String(n.result ?? "")), t.size > 4e5 && w(J("status.audioLarge", { kb: Math.round(t.size / 1024) }), "error");
		}, n.onerror = () => w(J("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function Ei(e) {
		let { section: t, block: n } = sn(R(j)?.sectionId, R(j)?.blockId);
		n && (vt("hide-mobile"), n.hideMobile = e, E.save(), pt(), ot?.sendSection(R(fe), t), cn());
	}
	async function Di(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await ka(t);
			Vn(`edit:${R(j).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || to(t.name).replaceAll("-", " ");
			});
		} catch (e) {
			w(Aa(e), "error");
		}
	}
	async function ki(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await ka(t);
			Vn(`edit:${R(j).blockId}`, (t) => {
				t.props.image = e.dataUrl;
			});
		} catch (e) {
			w(Aa(e), "error");
		}
	}
	let Ai = {
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
	}, ji = [
		["line", J("shape.line")],
		["arrow", J("shape.arrow")],
		["circle", J("shape.circle")],
		["rect", J("shape.rect")],
		["triangle", J("shape.triangle")]
	], Ni = [
		["accent", J("color.accent")],
		["text", J("color.text")],
		["surface", J("color.surface")],
		["bg", J("color.bg")]
	], Pi = /* @__PURE__ */ k(null), Fi = /* @__PURE__ */ k(null), Ii = /* @__PURE__ */ k(""), Li = /* @__PURE__ */ k(an([])), Bi = /* @__PURE__ */ k(null), Vi = /* @__PURE__ */ k(null), Hi = /* @__PURE__ */ k(""), Ui = /* @__PURE__ */ k(an({}));
	function Wi(e) {
		A(Fi, e?.grid ? { ...e.grid } : null, !0), A(Ii, e?.size?.minHeight ?? "", !0), A(Li, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), A(Bi, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0), A(Vi, e?.hover ? JSON.parse(JSON.stringify(e.hover)) : null, !0), A(Hi, e?.theme ?? "", !0), A(Ui, e?.divider ? JSON.parse(JSON.stringify(e.divider)) : {}, !0);
	}
	let Gi = /* @__PURE__ */ k(null), Ki = an({});
	function qi() {
		try {
			let e = ((R(ye)?.contentDocument)?.querySelector(`.urd-section[data-section-id="${R(Pi)}"]`))?.getBoundingClientRect();
			A(Gi, e && e.width ? {
				w: e.width,
				h: e.height
			} : null, !0);
		} catch {
			A(Gi, null);
		}
	}
	wn(() => {
		R(Pi), R(Li), requestAnimationFrame(() => requestAnimationFrame(qi));
	}), wn(() => {
		let e = R(ye);
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(() => qi());
		return t.observe(e), () => t.disconnect();
	}), wn(() => {
		for (let e of R(Li)) {
			let t = e?.props?.src;
			if (e?.type === "image" && t && !Ki[t]) {
				let e = new Image();
				e.onload = () => {
					Ki[t] = {
						w: e.naturalWidth,
						h: e.naturalHeight
					};
				}, e.src = t;
			}
		}
	});
	function Ji(e) {
		Zi("section-theme", (t) => {
			e ? t.theme = e : delete t.theme;
		});
	}
	function Yi(e) {
		let t = R(so), n = (e) => e.replaceAll("var(--urd-base-bg)", t.bg).replaceAll("var(--urd-base-surface)", t.surface).replaceAll("var(--urd-base-text)", t.text).replaceAll("var(--urd-base-accent)", t.accent).replaceAll("var(--urd-base-accent-text)", t["accent-text"] ?? ue(Um(t.accent ?? "#000000", t))), r = vf(e);
		return {
			bg: r["--urd-color-bg"] ? n(r["--urd-color-bg"]) : t.bg,
			surface: r["--urd-color-surface"] ? n(r["--urd-color-surface"]) : t.surface,
			text: r["--urd-color-text"] ? n(r["--urd-color-text"]) : t.text,
			accent: r["--urd-color-accent"] ? n(r["--urd-color-accent"]) : t.accent
		};
	}
	function Xi(e) {
		A(Pi, e.sectionId, !0), Wi(E?.data.sections.find((t) => t.id === e.sectionId));
	}
	function Zi(e, t) {
		let n = E.data.sections.find((e) => e.id === R(Pi));
		n && (vt(e), t(n), E.save(), pt(), ot?.sendSection(R(fe), n), Wi(n));
	}
	let Qi = /* @__PURE__ */ k("color");
	function $i(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background ??= {
				version: 1,
				layers: []
			}, e.background.layers.push({
				type: t,
				version: ae[t].version ?? 1,
				props: ae[t].defaults()
			});
		});
	}
	function ea(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers.splice(t, 1), e.background.layers.length || delete e.background;
		});
	}
	function ta(e, t, n) {
		let r = t + n;
		e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers;
			r < 0 || r >= n.length || ([n[t], n[r]] = [n[r], n[t]]);
		});
	}
	function aa(e, t, n) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${Object.keys(n).join("+")}`, (e) => {
			Object.assign(e.background.layers[t].props, n);
		});
	}
	function oa(e, t, n, r) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e.background.layers[t].props[n] = r;
		});
	}
	function sa(e, t, n, r = "xy") {
		e.preventDefault();
		let i = e.currentTarget;
		i.setPointerCapture?.(e.pointerId);
		let a = (e) => {
			let a = i.getBoundingClientRect();
			if (r.includes("x")) {
				let r = Math.min(1, Math.max(0, (e.clientX - a.left) / a.width));
				oa(t, n, "x", Math.round(r * 100) / 100);
			}
			if (r.includes("y")) {
				let r = Math.min(1, Math.max(0, (e.clientY - a.top) / a.height));
				oa(t, n, "y", Math.round(r * 100) / 100);
			}
		};
		a(e);
		let o = () => {
			i.removeEventListener("pointermove", a), i.removeEventListener("pointerup", o), i.removeEventListener("pointercancel", o);
		};
		i.addEventListener("pointermove", a), i.addEventListener("pointerup", o), i.addEventListener("pointercancel", o);
	}
	let ca = (e) => Math.min(4, Math.max(.1, e));
	function la(e, t, n, r) {
		oa(e, t, "size", ca(Math.round((n + r) * 100) / 100));
	}
	function ua(e, t, n) {
		let r = Number(n);
		Number.isFinite(r) && oa(e, t, "size", ca(r / 100));
	}
	function fa(e, t, n, r) {
		let i = Ki[n.props.src];
		if (!i?.w || !i?.h || !R(Gi)?.w || !R(Gi)?.h) return;
		let a = R(Gi).h * i.w / (R(Gi).w * i.h), o = r === "cover" ? Math.max(1, a) : Math.min(1, a);
		(n.props.fit === "tile" || n.props.fit === "repeat") && oa(e, t, "fit", "plain"), oa(e, t, "size", ca(Math.round(o * 100) / 100));
	}
	function pa(e) {
		return e.props;
	}
	function ga(e, t, n, r) {
		e.mutate(n, (e) => {
			r(e.background.layers[t].props);
		});
	}
	function _a(e, t, n, r) {
		ga(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e[n] = r;
		});
	}
	let va = {
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
	function ya(e, t, n) {
		ga(e, t, e.keyPrefix, (e) => {
			e.kind = n, va[n].some(([t]) => t === (e.animation ?? "none")) || (e.animation = "none");
		});
	}
	function ba(e, t, n, r) {
		ga(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-stop${n}`, (e) => {
			e.stops[n] = {
				...e.stops[n],
				...r
			};
		});
	}
	function xa(e, t) {
		ga(e, t, e.keyPrefix, (e) => {
			let t = Math.round(e.stops.reduce((e, t) => e + (Number(t.share) || 0), 0) / e.stops.length) || 50;
			e.stops.push({
				color: e.stops[e.stops.length - 1]?.color ?? "#ffffff",
				share: t
			});
		});
	}
	function Sa(e, t, n) {
		ga(e, t, e.keyPrefix, (e) => {
			e.stops.length > 2 && e.stops.splice(n, 1);
		});
	}
	function Ca(e, t, n, r) {
		ga(e, t, e.keyPrefix, (e) => {
			let [t] = e.stops.splice(n, 1);
			e.stops.splice(r, 0, t);
		});
	}
	let wa = /* @__PURE__ */ k(null);
	function Ta(e, t, n, r) {
		if (t.button !== 0) return;
		t.preventDefault();
		let i = t.currentTarget.closest(".bg-layer"), a = t.currentTarget.closest(".grad-stop");
		A(wa, {
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
			A(wa, {
				...R(wa),
				insert: n
			}, !0);
		}, u = () => {
			window.removeEventListener("pointermove", l), window.removeEventListener("pointerup", u), c.remove();
			let t = R(wa);
			if (A(wa, null), !t) return;
			let n = t.insert > t.from ? t.insert - 1 : t.insert;
			n !== t.from && Ca(e, t.layer, t.from, n);
		};
		window.addEventListener("pointermove", l), window.addEventListener("pointerup", u);
	}
	function Ea(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].type !== n && (e.background.layers[t] = {
				type: n,
				version: ae[n].version ?? 1,
				props: ae[n].defaults()
			});
		});
	}
	async function Da(e, t) {
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
	async function Oa(e) {
		let t = await e.text(), n = Za(t), r = $a(t);
		if (!r) return n;
		let i = await Da(n.dataUrl, r);
		if (!i) return n;
		let a = Qa(t, i);
		if (a === t) return n;
		try {
			return Za(a);
		} catch {
			return n;
		}
	}
	async function ka(e) {
		if (e.type === "image/svg+xml" || /\.svg$/i.test(e.name || "")) return Oa(e);
		let t = await Ja(e);
		return t.animated && t.bytes > 1e6 && w(J("status.animatedLarge", { mb: (t.bytes / 1e6).toFixed(1) }), "error"), t;
	}
	function Aa(e) {
		return e?.code === "animatedTooLarge" ? J("status.animatedTooLarge", {
			mb: (e.bytes / 1e6).toFixed(1),
			max: Math.round(Ra / 1e6)
		}) : J("status.imageReadError");
	}
	function ja(e, t, n) {
		if (!["video/mp4", "video/webm"].includes(e.type)) {
			w(J(t), "error");
			return;
		}
		if (e.size > 15e6) {
			w(J("status.videoTooLarge", {
				mb: (e.size / 1e6).toFixed(1),
				max: Math.round(La / 1e6)
			}), "error");
			return;
		}
		let r = new FileReader();
		r.onload = () => {
			n(String(r.result ?? "")), e.size > 4e6 && w(J("status.videoLarge", { mb: (e.size / 1e6).toFixed(1) }), "error");
		}, r.onerror = () => w(J("status.imageReadError"), "error"), r.readAsDataURL(e);
	}
	function Ma(e) {
		let t = e.target.files?.[0];
		e.target.value = "", t && ja(t, "status.videoFileFormat", (e) => L("src", e));
	}
	async function Pa(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			L("poster", (await ka(t)).dataUrl);
		} catch (e) {
			w(Aa(e), "error");
		}
	}
	async function Fa(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			oa(e, t, "src", (await ka(r)).dataUrl);
		} catch (e) {
			w(Aa(e), "error");
		}
	}
	function Ia(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && ja(r, "status.videoFormat", (n) => oa(e, t, "src", n));
	}
	async function za(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			oa(e, t, "poster", (await ka(r)).dataUrl);
		} catch (e) {
			w(Aa(e), "error");
		}
	}
	let Ba = an({}), Va = (e, t) => `${e.keyPrefix}-${e.keyId}-${t}`, Ha = () => 1 + crypto.getRandomValues(/* @__PURE__ */ new Uint32Array(1))[0] % 1e6;
	async function Ua(e, t, n) {
		let r = Va(e, t);
		Ba[r] = {
			text: J("status.folderChecking"),
			err: !1
		};
		let i = await dm(n.props.folder, n.props.order, { force: !0 });
		Ba[r] = i.photos.length ? {
			text: na("status.folderFound", i.photos.length, { count: i.photos.length }),
			err: !1
		} : {
			text: ra(i) ?? J("status.folderNone"),
			err: !0
		};
	}
	async function Wa(e, t, n) {
		let r = [...n.target.files ?? []];
		if (n.target.value = "", !r.length) return;
		w(J("status.compressingImages"));
		let { images: i, failed: a, big: o } = await mx(r);
		i.length && e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers[t].props;
			n.images ??= [], n.images.push(...i.map(({ src: e }) => ({
				src: e,
				x: .5,
				y: .5
			})));
		}), hx(i.length, a, o);
	}
	function Ga(e, t, n, r) {
		e.mutate(e.keyPrefix, (e) => {
			let i = e.background.layers[t].props.images, a = n + r;
			a < 0 || a >= i.length || ([i[n], i[a]] = [i[a], i[n]]);
		});
	}
	function Ka(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].props.images.splice(n, 1);
		});
	}
	function qa(e, t, n, r, i) {
		e.mutate(`edit:${e.keyPrefix}g-${e.keyId}-${t}-${n}-${r}`, (e) => {
			e.background.layers[t].props.images[n][r] = i;
		});
	}
	function Ya(e, t) {
		X(e, () => {
			R(D).nav.style ??= {}, t(R(D).nav.style);
		});
	}
	let Xa = /* @__PURE__ */ O(() => ({
		mutate: Zi,
		keyPrefix: "bg",
		keyId: R(Pi)
	})), ro = {
		mutate: Ya,
		keyPrefix: "navbg",
		keyId: "nav"
	}, io = {
		mutate: Zf,
		keyPrefix: "footerbg",
		keyId: "footer"
	}, ao = () => {
		let e = null;
		try {
			e = localStorage.getItem("urd-theme-mode");
		} catch {}
		return uf(R(D)?.theme?.scheme, e, window.matchMedia("(prefers-color-scheme: dark)").matches);
	}, oo = /* @__PURE__ */ k("light");
	wn(() => {
		A(oo, ao(), !0);
		let e = window.matchMedia("(prefers-color-scheme: dark)"), t = (e) => {
			e instanceof StorageEvent && e.key && e.key !== "urd-theme-mode" || A(oo, ao(), !0);
		};
		return e.addEventListener("change", t), window.addEventListener("storage", t), () => {
			e.removeEventListener("change", t), window.removeEventListener("storage", t);
		};
	});
	let so = /* @__PURE__ */ O(() => R(D)?.theme ? df(R(D).theme, R(oo)).color ?? {} : {}), co = () => Object.entries(R(so)), lo = [
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
	], uo = /* @__PURE__ */ O(() => !!R(D)?.theme.alt), fo = /* @__PURE__ */ O(() => R(D)?.theme.alt?.auto === !0), po = /* @__PURE__ */ O(() => R(D)?.theme.scheme === "dark" ? "dark" : "light"), mo = /* @__PURE__ */ O(() => R(D)?.theme.tokens.color ?? {}), ho = /* @__PURE__ */ O(() => ({
		...R(D)?.theme.tokens.color ?? {},
		...R(D)?.theme.alt?.tokens?.color ?? {}
	}));
	function yo(e) {
		return {
			type: e,
			version: zm[e].version,
			props: zm[e].defaults()
		};
	}
	let bo = (e) => !!(e && zm[e.type]?.entrance), xo = [["", J("common.none")], ...Object.entries(zm).filter(([, e]) => e.entrance).map(([e, t]) => [e, t.labelKey ? J(t.labelKey) : t.label])], So = xo.filter(([e]) => !zm[e]?.group), Co = [["", J("common.none")], ...Object.entries(zm).filter(([, e]) => !e.entrance).map(([e, t]) => [e, t.labelKey ? J(t.labelKey) : t.label])];
	function wo(e) {
		e.animation && !bo(e.animation) && (e.hover ??= e.animation, e.animation = null);
	}
	function To(e) {
		Vn(`edit:anim-${R(j).blockId}`, (t) => {
			wo(t), t.animation = e ? yo(e) : null;
		}), R(j) && ot?.sendDemoAnim(R(j).sectionId, R(j).blockId);
	}
	function Eo(e) {
		Vn(`edit:hover-${R(j).blockId}`, (t) => {
			wo(t), t.hover = e ? yo(e) : null;
		});
	}
	function Do(e, t) {
		Number.isFinite(t) && (Vn(`edit:anim-${R(j).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), R(j) && ot?.sendDemoAnim(R(j).sectionId, R(j).blockId));
	}
	function Oo(e) {
		Zi("section-anim", (t) => {
			wo(t), t.animation = e ? yo(e) : null;
		}), ot?.sendDemoAnim(R(Pi));
	}
	function ko(e, t, n) {
		Zi(`section-divider-${e}-${t}`, (r) => {
			let i = { ...r.divider ?? {} };
			if (t === "shape" && !n) delete i[e];
			else {
				let r = { ...i[e] ?? { shape: "wave" } };
				n === void 0 || n === !1 || n === "" ? delete r[t] : r[t] = n, i[e] = r;
			}
			Object.keys(i).length ? r.divider = i : delete r.divider;
		});
	}
	function Ao(e) {
		Zi("section-hover", (t) => {
			wo(t), t.hover = e ? yo(e) : null;
		});
	}
	function Mo(e, t) {
		Number.isFinite(t) && (Zi("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), ot?.sendDemoAnim(R(Pi)));
	}
	function No(e, t) {
		Zi("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), ot?.sendDemoAnim(R(Pi));
	}
	function Po(e) {
		let t = E.data.sections.find((e) => e.id === R(Pi));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		vt("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, A(Ii, r, !0), E.save(), pt(), ot?.sendSection(R(fe), t);
	}
	function Fo() {
		return E.data.sections.find((e) => e.id === R(Pi)) ?? E.data.sections[0];
	}
	function Io(e) {
		let t = E.data.sections.find((e) => e.id === R(Pi));
		t && (vt("grid:section"), t.grid = e ? { ...at.data.grid } : null, A(Fi, t.grid ? { ...t.grid } : null, !0), E.save(), pt(), ot?.sendSection(R(fe), t), R(hc) && ot?.sendShowGrid(!0));
	}
	function Lo(e, t) {
		let n = E.data.sections.find((e) => e.id === R(Pi));
		n?.grid && (vt("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, A(Fi, { ...n.grid }, !0), E.save(), pt(), ot?.sendSection(R(fe), n), R(hc) && ot?.sendShowGrid(!0));
	}
	function Ro(e, t) {
		vt("grid:site"), A(xe, {
			...R(xe),
			[e]: t
		}, !0), at.data.grid = {
			...at.data.grid,
			[e]: t
		}, at.save(), pt(), ct(), R(hc) && ot?.sendShowGrid(!0);
	}
	async function zo() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? A(be, await e.json(), !0) : e.status !== 503 && A(be, null);
		} catch {
			A(be, null);
		}
	}
	let Bo = null;
	async function Vo() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (Bo = (await e.json()).head ?? null);
		} catch {}
	}
	async function Ho(e) {
		if (!Bo) return await Vo(), {
			ok: await At({
				title: J("confirm.conflictUnknown.title"),
				lines: [J("confirm.conflictUnknown.body"), J("confirm.conflictUnknown.warning")],
				okLabel: J("confirm.publishAnyway"),
				cancelLabel: J("confirm.cancel")
			}),
			head: Bo
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${Bo}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === Bo) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? [J("confirm.conflict.truncated")] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await At({
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
	let Uo = /* @__PURE__ */ k(null), Wo = /* @__PURE__ */ k(""), Go = /* @__PURE__ */ k(!1);
	async function Jo() {
		A(Wo, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? A(Uo, (await e.json()).commits, !0) : e.status === 401 ? (A(Uo, [], !0), A(Wo, J("status.historyLoginRequired"), !0)) : (A(Uo, [], !0), A(Wo, ra(await e.json().catch(() => null)) ?? J("status.historyFetchFailed"), !0));
		} catch {
			A(Uo, [], !0), A(Wo, J("status.historyUnavailable"), !0);
		}
	}
	let Xo = (() => {
		let e = {
			dateStyle: "short",
			timeStyle: "short"
		};
		try {
			return new Intl.DateTimeFormat(ia(), e);
		} catch {
			return new Intl.DateTimeFormat(void 0, e);
		}
	})(), Zo = !1;
	async function Qo() {
		let e = R(Uo)?.[0];
		if (e && !R(Go) && await At({
			title: J("confirm.revert.title"),
			lines: [`«${e.message}»`, J("confirm.revert.body")],
			okLabel: J("confirm.revert.ok"),
			cancelLabel: J("confirm.cancel")
		})) {
			A(Go, !0), w(J("status.reverting"));
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? Bo = e : Vo(), Zo = !0, w(J("status.revertDone"), "ok"), $o();
				} else t.status === 409 ? w(J("status.revertConflict"), "error") : w(ra(await t.json().catch(() => null)) ?? J("status.revertFailed"), "error");
			} catch {
				w(J("status.publishLayerUnreachable"), "error");
			}
			A(Go, !1), Jo();
		}
	}
	async function $o() {
		let e = ["/content/site.json", ...R(D).pages.map((e) => `/${e.file}`)], t = async () => {
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
				w(J("status.revertDeployed"), "ok");
				for (let e of Object.keys(localStorage).filter((e) => e.startsWith("urd-draft-"))) localStorage.removeItem(e);
				await new Promise((e) => setTimeout(e, 800)), location.reload();
				return;
			}
		}
		w(J("status.revertDeployTimeout"), "error");
	}
	let ts = 0;
	async function cs(e) {
		let t = ++ts, n = ge, r = await ds(us(e));
		t === ts && n === ge && (r ? w(J("status.publishLive"), "ok") : w(J("status.publishDeployTimeout"), "error"));
	}
	let fs = /* @__PURE__ */ k(null), ps = /* @__PURE__ */ k(null), ms = /* @__PURE__ */ k(!1), hs = /* @__PURE__ */ k(an(/* @__PURE__ */ new Set()));
	async function gs() {
		A(ms, !0), A(ps, null), A(fs, null);
		try {
			let e = await fetch("/api/github/update"), t = await e.json().catch(() => null);
			e.ok ? (A(fs, t, !0), A(hs, /* @__PURE__ */ new Set(), !0)) : A(ps, ra(t) ?? J("update.checkFailed"), !0);
		} catch {
			A(ps, J("status.publishLayerUnreachable"), !0);
		}
		A(ms, !1);
	}
	function _s(e) {
		let t = new Set(R(hs));
		t.has(e) ? t.delete(e) : t.add(e), A(hs, t, !0);
	}
	async function xs() {
		if (!R(fs) || R(fs).upToDate || R(ms)) return;
		let e = [...R(hs)], t = R(fs).changes.filter((e) => !R(hs).has(e.path)), n = t.filter((e) => e.atom && e.conflict);
		if (await At({
			title: J("confirm.update.title"),
			lines: [J("confirm.update.body", {
				target: R(fs).target,
				writes: t.filter((e) => e.action === "write").length,
				deletes: t.filter((e) => e.action === "delete").length
			}), ...n.length > 0 ? [J("confirm.update.warnEdited", { paths: n.map((e) => e.path).join(", ") })] : []],
			okLabel: J("confirm.update.ok"),
			cancelLabel: J("confirm.cancel")
		})) {
			A(ms, !0), w(J("update.running", { target: R(fs).target }));
			try {
				let t = await fetch("/api/github/update", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						to: R(fs).target,
						expect: R(fs).head,
						skip: e
					})
				}), n = await t.json().catch(() => null);
				t.ok ? (w(J("update.committed", { target: R(fs).target }), "ok"), await Ss(R(fs).target.replace(/^v/, ""))) : t.status === 409 ? (w(ra(n) ?? J("update.checkFailed"), "error"), await gs()) : w(ra(n) ?? J("update.failed"), "error");
			} catch {
				w(J("status.publishLayerUnreachable"), "error");
			}
			A(ms, !1);
		}
	}
	async function Ss(e) {
		for (let t = 0; t < 18; t++) {
			await new Promise((e) => setTimeout(e, 1e4));
			try {
				if ((await (await fetch("/urd.json", { cache: "no-store" })).json())?.engine === e) {
					w(J("update.deployed"), "ok"), await new Promise((e) => setTimeout(e, 800)), location.reload();
					return;
				}
			} catch {}
		}
		w(J("update.deployTimeout"), "error");
	}
	let Ks = null;
	function Js(e) {
		return {
			schemaVersion: 6,
			meta: {
				id: e.id,
				title: e.title
			},
			sections: [{
				id: Zl("sec"),
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
	async function Ys(e, { keepHistory: t = !1 } = {}) {
		A(fe, e, !0), Ks = (async () => {
			let n = ft(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = Gl(await e.json(), at.data));
			} catch {}
			r ? dt.delete(e) : r = Js(n), E = ha(`urd-draft-${e}`, () => r, _e), (E.data.schemaVersion ?? 1) > 6 && (console.warn(`Urd: the draft for '${e}' has schemaVersion ${E.data.schemaVersion} (the engine has 6) and is discarded`), E.replace(structuredClone(r))), E.replace(Gl(E.data, at.data)), E.save(), t || (gt = null), A(Pi, null), A(Fi, null), pt(), Hc(), Qe(), A(me, "");
		})(), await Ks;
	}
	function ec() {
		ot?.destroy(), R(ye)?.contentDocument?.addEventListener("pointerdown", () => {
			R(un) && A(un, null);
		}, !0), ot = qo(R(ye), {
			onEdit: Rb,
			onMove: zb,
			onGrow: Bb,
			onDelete: Zb,
			onAddSection: Kb,
			onMoveSection: qb,
			onDeleteSection: Jb,
			onSectionSize: Yb,
			onUndo: (e) => e.redo ? Tt() : wt(),
			onSelectSection: Xi,
			onSelectBlock: ln,
			onBlockMenu: Bn,
			onReady: tc,
			onNavigate: _c,
			onAddBlock: (e) => tx(e.sectionId, e.block),
			onAddBlocks: (e) => nx(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: fx,
			onMoveBlockSection: Xb,
			onMobileReset: Hb,
			onMobileOrder: Ub,
			onReviewDone: Wb,
			onBlockFlag: Gb,
			onCollectionEdit: zd,
			onCollectionAdd: Ld,
			onSaveTemplate: Od,
			onStickyGroup: Ad,
			onStickyDock: kd,
			onDeleteTemplate: Md,
			onApplyLayout: nt,
			onPluginBlocks: (e) => {
				A(ox, e.blocks ?? [], !0);
			},
			onNavWidth: (e) => X("edit:nav-width", () => {
				R(D).nav.style ??= {}, R(D).nav.style.width = e.width;
			})
		});
	}
	async function tc() {
		await Ks, await ff, ot?.sendPlugins(Ye(R(hf))?.enabled ?? []), ot?.sendViewport(R(Fe)), ot?.sendZoom(R(We)), Fd(), Dd(), at.hasDraft() && ct();
		let e = !R(de).pages.some((e) => e.id === R(fe));
		(E.hasDraft() || e) && ot?.sendPage(R(fe), E.data), R(Se) || ot?.sendChrome(!1), R(hc) && ot?.sendShowGrid(!0), R(nc) && ot?.sendShowGuides(!0), le();
	}
	let nc = /* @__PURE__ */ k(localStorage.getItem("urd-guides") === "1"), rc = /* @__PURE__ */ k(!1), ic = /* @__PURE__ */ k(an(localStorage.getItem("urd-layout-picker") === "menu" ? "menu" : "strip"));
	function ac(e) {
		A(ic, e === "menu" ? "menu" : "strip", !0), R(ic) === "menu" ? localStorage.setItem("urd-layout-picker", "menu") : localStorage.removeItem("urd-layout-picker");
	}
	let oc = /* @__PURE__ */ k(null);
	wn(() => {
		if (!R(rc)) return;
		let e = (e) => {
			R(oc)?.contains(e.target) || A(rc, !1);
		}, t = (e) => {
			e.key === "Escape" && A(rc, !1);
		}, n = () => {
			A(rc, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let sc = {
		view: 1079,
		device: 999,
		zoom: 919
	}, cc = /* @__PURE__ */ k(null), uc = /* @__PURE__ */ k(null), fc = an({
		view: !1,
		device: !1,
		zoom: !1
	});
	wn(() => {
		let e = Object.entries(sc).map(([e, t]) => {
			let n = window.matchMedia(`(max-width: ${t}px)`), r = () => {
				fc[e] = n.matches;
			};
			return r(), n.addEventListener("change", r), () => n.removeEventListener("change", r);
		});
		return () => e.forEach((e) => e());
	}), wn(() => {
		R(cc) && !fc[R(cc)] && A(cc, null);
	}), wn(() => {
		if (!R(cc)) return;
		let e = (e) => {
			R(uc)?.contains(e.target) || A(cc, null);
		}, t = (e) => {
			e.key === "Escape" && A(cc, null);
		}, n = () => {
			A(cc, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	function mc() {
		A(nc, !R(nc)), localStorage.setItem("urd-guides", R(nc) ? "1" : "0"), ot?.sendShowGuides(R(nc));
	}
	let hc = /* @__PURE__ */ k(localStorage.getItem("urd-grid-overlay") === "1");
	function gc() {
		A(hc, !R(hc)), localStorage.setItem("urd-grid-overlay", R(hc) ? "1" : "0"), ot?.sendShowGrid(R(hc));
	}
	function _c(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = R(D).pages.find((e) => e.path === t);
		n && n.id !== R(fe) && Ys(n.id);
	}
	function X(e, t) {
		vt(e), t(), at.save(), pt(), ct();
	}
	let vc = /* @__PURE__ */ k(""), yc = /* @__PURE__ */ k(null), Z = Object.fromEntries(rf.map((e) => [e.id, tf(af(e.id, {
		pageId: "preview",
		title: ""
	}))])), bc = /* @__PURE__ */ O(() => {
		let e = R(D)?.theme?.tokens?.color ?? {};
		return [
			"bg",
			"surface",
			"text",
			"accent"
		].filter((t) => typeof e[t] == "string" && pf(e[t])).map((t) => `--urd-color-${t}: ${e[t]};`).join(" ");
	}), xc = /* @__PURE__ */ k(null);
	wn(() => {
		if (!R(xc)) return;
		let e = (e) => {
			e.target.closest?.(".page-menu-wrap") || A(xc, null);
		}, t = (e) => {
			e.key === "Escape" && A(xc, null);
		}, n = () => {
			A(xc, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let Sc = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions",
		"readme"
	];
	function Cc(e, t = null) {
		return e ? Sc.includes(e) ? J("error.reservedName", { slug: e }) : R(D).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? J("error.pageExists") : null : J("error.pageNeedsName");
	}
	function wc() {
		let e = R(vc).trim(), t = to(e), n = Cc(t);
		if (n) return w(n, "error"), !1;
		let r = R(yc) && !R(yc).startsWith("preset:") ? xd[R(yc)]?.data?.page : null, i = R(yc)?.startsWith("preset:") ? af(R(yc).slice(7), {
			pageId: t,
			title: e
		}) ?? Js({
			id: t,
			title: e
		}) : r ? Du(Gl(JSON.parse(JSON.stringify(r)), at.data), Zl, {
			id: t,
			title: e
		}) : Js({
			id: t,
			title: e
		});
		X("pages", () => {
			R(D).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), R(D).nav.items.push({
				label: e,
				page: t
			});
		}), ve(`urd-draft-${t}`, JSON.stringify(i)), pt(), A(vc, ""), A(yc, null), Ys(t);
	}
	async function Lc(e) {
		A(xc, null), await jd("page", e.id === R(fe) ? JSON.parse(JSON.stringify(E.data)) : await Xc(e));
	}
	function Rc(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		X("pages", () => {
			e.title = n;
			for (let t of R(D).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === R(fe) ? (E.data.meta.title = n, E.save(), pt(), ot?.sendPage(R(fe), E.data)) : Zc(e, (e) => {
			e.meta.title = n;
		});
	}
	let zc = /* @__PURE__ */ k(an({
		description: "",
		ogTitle: "",
		ogDescription: "",
		ogImage: ""
	}));
	function Hc() {
		let e = E?.data?.meta ?? {};
		A(zc, {
			description: e.description ?? "",
			ogTitle: e.og?.title ?? "",
			ogDescription: e.og?.description ?? "",
			ogImage: e.og?.image ?? ""
		}, !0);
	}
	function Uc(e, t) {
		let n = String(t ?? "").trim();
		if (e === "description") n ? E.data.meta.description = n : delete E.data.meta.description;
		else {
			let t = {
				ogTitle: "title",
				ogDescription: "description",
				ogImage: "image"
			}[e], r = { ...E.data.meta.og ?? {} };
			n ? r[t] = n : delete r[t], Object.keys(r).length ? E.data.meta.og = r : delete E.data.meta.og;
		}
		E.save(), pt(), Hc();
		let r = R(D).pages.find((e) => e.id === R(fe));
		R(qc)[R(fe)] = !r?.noindex && !E.data.meta.description;
	}
	function Kc(e) {
		let t = R(D).pages.find((e) => e.id === R(fe));
		t && (X("edit:page-noindex", () => {
			e ? t.noindex = !0 : delete t.noindex;
		}), R(qc)[R(fe)] = !e && !E?.data?.meta?.description);
	}
	let qc = /* @__PURE__ */ k(an({}));
	async function Jc() {
		let e = {};
		for (let t of R(D).pages) {
			if (t.noindex) continue;
			if (t.id === R(fe)) {
				e[t.id] = !E?.data?.meta?.description;
				continue;
			}
			let n = await Xc(t);
			e[t.id] = !n?.meta?.description;
		}
		A(qc, e, !0);
	}
	wn(() => {
		R(Wt) === "pages" && R(fe) && Jc();
	});
	async function Yc(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			Uc("ogImage", (await ka(t)).dataUrl);
		} catch (e) {
			w(Aa(e), "error");
		}
	}
	async function Xc(e) {
		let t = localStorage.getItem(`urd-draft-${e.id}`);
		if (t) try {
			return JSON.parse(t);
		} catch {}
		try {
			let t = await fetch(`/${e.file}`);
			if (t.ok) return Gl(await t.json(), at.data);
		} catch {}
		return Js(e);
	}
	async function Zc(e, t) {
		let n = await Xc(e);
		t(n), ve(`urd-draft-${e.id}`, JSON.stringify(n)), pt();
	}
	function Qc(e, t) {
		let n = to(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = Cc(n, e.id);
		if (r) {
			w(r, "error");
			return;
		}
		X("pages", () => {
			e.path = `/${n}`;
		});
	}
	function $c(e) {
		e.path !== "/" && (X("pages", () => {
			R(D).pages = R(D).pages.filter((t) => t.id !== e.id), R(D).nav.items = R(D).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of R(D).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			R(D).nav.items = R(D).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === R(fe) && Ys(R(D).pages[0].id), w(J("status.pageRemoved")));
	}
	function el(e) {
		X("edit:nav-logo", () => {
			R(D).nav.logo = {
				type: "text",
				value: "",
				...R(D).nav.logo,
				...e
			};
		});
	}
	function tl(e) {
		X("nav", () => {
			R(D).nav.logo ??= {
				type: "text",
				value: R(D).site.title
			};
			let t = R(D).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = R(D).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = R(D).site.title), delete t.image), t.type = e;
		});
	}
	async function Q(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await ka(t);
			X("nav", () => {
				let t = R(D).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			w(J("status.imageReadErrorSvg"), "error");
		}
	}
	let nl = /* @__PURE__ */ k(null);
	async function rl(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		if (t.type === "image/svg+xml" || /\.svg$/i.test(t.name || "")) {
			try {
				let e = await Oa(t);
				A(nl, e.dataUrl, !0);
			} catch {
				w(J("status.imageReadErrorSvg"), "error");
			}
			return;
		}
		let n = new FileReader();
		n.onload = () => {
			A(nl, String(n.result), !0);
		}, n.onerror = () => w(J("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function il(e) {
		X("edit:site-icon", () => {
			R(D).site.icon = e;
		}), A(nl, null);
	}
	function al() {
		X("edit:site-icon", () => {
			delete R(D).site.icon;
		});
	}
	function ol(e) {
		X("edit:site-title", () => {
			R(D).site.title = e;
		});
	}
	function sl(e) {
		X("edit:site-desc", () => {
			R(D).site.description = e;
		});
	}
	function cl(e) {
		let t = String(e ?? "").trim();
		X("edit:site-analytics", () => {
			t ? R(D).analytics = { token: t } : delete R(D).analytics;
		});
	}
	let ll = /* @__PURE__ */ O(() => R(D)?.layout?.contentWidth ?? 1440), ul = /* @__PURE__ */ O(() => R(D)?.layout?.gutter ?? 6), dl = /* @__PURE__ */ O(() => Ps(R(ll))), fl = /* @__PURE__ */ O(() => Ds.find((e) => e.gutter === R(ul))?.id ?? null), pl = /* @__PURE__ */ k(!1), ml = /* @__PURE__ */ O(() => R(ll) === "full" ? Es : As(R(ll))), hl = /* @__PURE__ */ O(() => ks.map((e) => ({
		screen: e,
		...Ns(R(ll), R(ul), e)
	})));
	function gl(e, t) {
		X(t, () => {
			let t = {
				...R(D).layout ?? {},
				contentWidth: R(ll),
				gutter: R(ul),
				...e
			};
			for (let e of Object.keys(t)) t[e] === void 0 && delete t[e];
			R(D).layout = t;
		});
	}
	let Ol = (e) => gl({ contentWidth: e === "full" ? "full" : As(e) }, "edit:site-width"), Al = (e) => gl({ gutter: js(e) }, "edit:site-gutter");
	function jl() {
		let e = R(D).site.lang ?? "no";
		return e === "no" ? "nb" : e;
	}
	function Ml() {
		let e = jl(), t = Xt([...Yt, ...$t()]);
		return [...t.some(([t]) => t === e) ? [] : [[e, e]], ...t];
	}
	function Nl(e) {
		X("site", () => {
			R(D).site.lang = e;
		});
	}
	function Pl(e) {
		let t = qm(e);
		X("site", () => {
			t.length ? R(D).site.meetingHosts = t : delete R(D).site.meetingHosts;
		});
	}
	let Fl = /* @__PURE__ */ k(!1), Il = /* @__PURE__ */ k(null), Ll = (e) => e ? e.startsWith("#") ? e : `var(--urd-color-${e})` : "var(--urd-color-accent)", Rl = /* @__PURE__ */ k(null);
	wn(() => {
		let e = R(Rl);
		e && (A(Rl, null), gr().then(() => document.querySelector(`[data-cal-name="${e}"]`)?.focus()));
	});
	let zl = () => R(D)?.site?.calendars ?? [], Bl = (e) => zl().find((t) => t.id === e) ?? null;
	function Vl(e = {}) {
		let t = {
			id: Zl("cal"),
			url: "",
			...e
		};
		return X("site", () => {
			(R(D).site.calendars ??= []).unshift(t);
		}), A(Il, t.id, !0), A(Rl, t.id, !0), A(Fl, !0), t.id;
	}
	function Hl(e) {
		X("site", () => {
			R(D).site.calendars[e]?.id === R(Il) && A(Il, null), R(D).site.calendars.splice(e, 1), R(D).site.calendars.length || delete R(D).site.calendars;
		});
	}
	function Ul(e, t) {
		X("site", () => {
			let n = R(D).site.calendars, r = e + t;
			r < 0 || r >= n.length || ([n[e], n[r]] = [n[r], n[e]]);
		});
	}
	function Kl(e, t, n, r = !1) {
		let i = String(n ?? "").trim();
		X(`edit:site-cal-${e}-${t}`, () => {
			let n = R(D).site.calendars[e];
			i || r ? n[t] = i : delete n[t];
		});
	}
	function ql(e, t, n) {
		X("site", () => {
			let r = R(D).site.calendars[e];
			n ? delete r[t] : r[t] = !1;
		});
	}
	function Yl(e) {
		X("site", () => {
			e && e !== "osm" ? R(D).site.mapService = e : delete R(D).site.mapService;
		});
	}
	let Ql = /* @__PURE__ */ k(!1);
	function $(e) {
		let t = e.trim();
		A(Ql, t !== "" && !Hm(t), !0), !R(Ql) && X("site", () => {
			t ? R(D).site.timeZone = t : delete R(D).site.timeZone;
		});
	}
	let $l = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	wn(() => {
		if (!R(D)?.site) return;
		let e = R(D).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 49.6V14.4l25.6 10.4V49.6' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
				return;
			}
			$l.test(e) && (t.href = e);
		}
	});
	function eu(e) {
		X("nav", () => {
			R(D).nav.layout = e;
		});
	}
	let tu = (e) => e !== "theme" || !!R(D).theme?.alt?.tokens, nu = /* @__PURE__ */ O(() => rp(R(D)?.nav?.style ?? {}).filter(tu));
	function ru(e, t) {
		let n = rp(R(D).nav.style ?? {}), r = n.indexOf(e), i = r + t;
		for (; i >= 0 && i < n.length && !tu(n[i]);) i += t;
		r < 0 || i < 0 || i >= n.length || ([n[r], n[i]] = [n[i], n[r]], iu("order", n));
	}
	function iu(e, t) {
		X(`edit:nav-tools-${e}`, () => {
			R(D).nav.style ??= {};
			let n = { ...R(D).nav.style.tools ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? R(D).nav.style.tools = n : delete R(D).nav.style.tools;
		});
	}
	function au(e, t) {
		X(`edit:nav-style-${e}`, () => {
			R(D).nav.style ??= {}, t === void 0 ? delete R(D).nav.style[e] : R(D).nav.style[e] = t;
		});
	}
	let ou = /* @__PURE__ */ O(() => R(D)?.nav?.variant === "side-left" || R(D)?.nav?.variant === "side-right"), su = /* @__PURE__ */ O(() => [
		"floating",
		"floating-square",
		"floating-tab"
	].includes(R(D)?.nav?.variant)), cu = /* @__PURE__ */ O(() => $s(R(D)?.nav?.style)), lu = /* @__PURE__ */ O(() => Zs(R(D)?.nav?.style, R(D)?.nav?.variant)), uu = /* @__PURE__ */ O(() => Qs(R(D)?.nav?.style));
	function du(e) {
		X("nav", () => {
			R(D).nav.style ??= {}, e === "md" ? delete R(D).nav.style.size : R(D).nav.style.size = e, delete R(D).nav.style.padY, delete R(D).nav.style.textSize;
		});
	}
	function fu(e, t, n) {
		let r = e.target.value;
		au(t, r === "" ? void 0 : Xs(r, n, void 0)), e.target.value = R(D).nav.style?.[t] ?? "";
	}
	function pu(e, t) {
		X(`edit:nav-mobile-${e}`, () => {
			R(D).nav.style ??= {};
			let n = { ...R(D).nav.style.mobile ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? R(D).nav.style.mobile = n : delete R(D).nav.style.mobile;
		});
	}
	let mu = (e) => {
		let t = R(D)?.nav?.style?.mobile?.[e];
		return t === void 0 ? "" : t ? "on" : "off";
	}, hu = (e, t) => pu(e, t === "" ? void 0 : t === "on"), gu = (e) => pu("border", e ? {
		...R(D).nav.style?.mobile?.border ?? {},
		side: e
	} : void 0);
	function _u(e, t) {
		X(`edit:nav-announce-${e}`, () => {
			let n = { ...R(D).nav.announcement ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? R(D).nav.announcement = n : delete R(D).nav.announcement;
		});
	}
	let vu = "<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"currentColor\" aria-hidden=\"true\">" + [
		6,
		12,
		18
	].flatMap((e) => [
		6,
		12,
		18
	].map((t) => `<circle cx="${t}" cy="${e}" r="1.6"/>`)).join("") + "</svg>", yu = /* @__PURE__ */ k(null);
	function bu() {
		let e = R(D).nav?.launcher;
		return [e?.image, ...(e?.links ?? []).map((e) => e.image)].filter(Boolean);
	}
	function xu(e, t) {
		X("nav", () => {
			R(D).nav.launcher ??= { links: [] };
			let n = e === null ? R(D).nav.launcher : R(D).nav.launcher.links[e];
			t.image ? n.image = t.image : delete n.image, t.icon ? n.icon = t.icon : delete n.icon;
		});
	}
	function Su(e, t) {
		X(`edit:nav-launcher-${e}`, () => {
			R(D).nav.launcher ??= { links: [] }, t === void 0 ? delete R(D).nav.launcher[e] : R(D).nav.launcher[e] = t;
		});
	}
	function Cu() {
		X("nav", () => {
			R(D).nav.launcher ??= { links: [] }, R(D).nav.launcher.links ??= [], R(D).nav.launcher.links.push({
				label: J("seed.link"),
				href: "",
				icon: "globe"
			});
		});
	}
	function wu(e) {
		X("nav", () => {
			R(D).nav.launcher.links.splice(e, 1);
		});
	}
	function Ou(e, t) {
		X("nav", () => {
			let n = R(D).nav.launcher.links, r = e + t;
			r < 0 || r >= n.length || ([n[e], n[r]] = [n[r], n[e]]);
		});
	}
	function ku(e, t, n) {
		X(`edit:nav-launcher-${t}-${e}`, () => {
			R(D).nav.launcher.links[e][t] = n;
		});
	}
	async function Au(e, t) {
		if (e) try {
			let n = await ka(e);
			X("nav", () => {
				R(D).nav.launcher ??= { links: [] }, t === null ? R(D).nav.launcher.image = n.dataUrl : R(D).nav.launcher.links[t].image = n.dataUrl;
			});
		} catch {
			w(J("status.imageReadErrorSvg"), "error");
		}
	}
	function Mu(e, t) {
		X(`edit:nav-sheet-${e}`, () => {
			R(D).nav.style ??= {};
			let n = { ...R(D).nav.style.sheet ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? R(D).nav.style.sheet = n : delete R(D).nav.style.sheet;
		});
	}
	function Nu(e, t, n) {
		let r = e.target.value;
		au(t, r === "" ? void 0 : Xs(r, n, void 0)), e.target.value = R(t === "padY" ? lu : uu);
	}
	function Fu(e, t, n) {
		let r = e.target.value;
		pu(t, r === "" ? void 0 : Xs(r, n, void 0)), e.target.value = R(D).nav.style?.mobile?.[t] ?? "";
	}
	function Bu(e) {
		let t = Xs(e / 100, Bs, .5);
		au("shrinkTo", t === .5 ? void 0 : t);
	}
	function Gu(e) {
		let t = Xs(e, Vs, 80);
		au("shrinkAt", t === 80 ? void 0 : t);
	}
	function Ku(e) {
		let t = Xs(e, Hs, 220);
		au("shrinkMs", t === 220 ? void 0 : t);
	}
	let qu = {
		underline: [J("hoverColor.underline.label"), J("hoverColor.underline.title")],
		pill: [J("hoverColor.pill.label"), J("hoverColor.pill.title")],
		lift: [J("hoverColor.lift.label"), J("hoverColor.lift.title")]
	}, Ju = /* @__PURE__ */ O(() => qu[R(D)?.nav?.style?.hover] ?? null), Yu = (e) => e.color || (e.variant === "plain" ? "text" : "accent-text"), Xu = [
		"plain",
		"cards",
		"band"
	], Zu = ["cards", "list"], Qu = (e) => (e.version ?? 1) < hm.version ? hm.migrations[1](e.props ?? {}) : e.props ?? {}, $u = /* @__PURE__ */ O(() => [
		["grid", J("opt.launcherView.grid")],
		["list", J("opt.launcherView.list")],
		["cover", J("opt.launcherView.cover")]
	]), ed = /* @__PURE__ */ O(() => R(ou) ? [
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
	function td(e) {
		(R(D).nav.variant ?? "bar") !== e && X("nav", () => {
			e === "bar" ? delete R(D).nav.variant : R(D).nav.variant = e, R(D).nav.style && delete R(D).nav.style.radius;
		});
	}
	function nd(e) {
		X("nav", () => {
			R(D).nav.style ??= {}, e ? R(D).nav.style.glow = !0 : delete R(D).nav.style.glow;
		});
	}
	function rd(e) {
		X("nav", () => {
			R(D).nav.style ??= {}, e ? delete R(D).nav.style.topGap : R(D).nav.style.topGap = !1;
		});
	}
	function id(e) {
		X("nav", () => {
			R(D).nav.style ??= {}, e === "standard" ? delete R(D).nav.style.hover : R(D).nav.style.hover = e;
		});
	}
	let ad = null, od = {}, sd = {}, cd = !1, ld = /* @__PURE__ */ k(an([])), ud = /* @__PURE__ */ k(an({})), dd = /* @__PURE__ */ k(null), md = /* @__PURE__ */ k(""), hd = /* @__PURE__ */ k("news"), yd = [
		["news", J("collectionKind.news")],
		["notices", J("collectionKind.notices")],
		["publications", J("collectionKind.publications")],
		["products", J("collectionKind.products")],
		["custom", J("collectionKind.custom")]
	], bd = null, xd = {}, Sd = {}, wd = !1, Td = /* @__PURE__ */ k(an([]));
	async function Ed() {
		let e = {
			version: 1,
			maler: []
		};
		try {
			e = await (await fetch("/content/maler.json")).json();
		} catch {}
		bd = ha("urd-draft-templates", () => e, _e, "urd-draft-maler"), A(Td, [...bd.data.maler ?? []], !0);
		for (let e of R(Td)) {
			let t = null;
			try {
				t = await (await fetch(`/content/maler/${e}.json`)).json();
			} catch {}
			Sd[e] = t, xd[e] = ha(`urd-draft-template-${e}`, () => t, _e, `urd-draft-mal-${e}`), (xd[e].data?.schemaVersion ?? 1) > 1 && xd[e].reset();
		}
		wd = !0, Dd();
	}
	function Dd() {
		let e = R(Td).map((e) => xd[e]?.data ? {
			id: e,
			...JSON.parse(JSON.stringify(xd[e].data))
		} : null).filter(Boolean).map(({ id: e, mal: t, section: n, blocks: r, page: i }) => ({
			id: e,
			name: t.name,
			kind: t.kind,
			section: n,
			blocks: r,
			page: i
		}));
		ot?.sendTemplates(e);
	}
	function Od(e) {
		let t = Tu.includes(e.kind) ? e.kind : "section";
		return jd(t, e[t]);
	}
	function kd(e) {
		let { section: t, block: n } = sn(e.sectionId, e.blockId);
		t && n?.sticky && Rn.some(([t]) => t === e.dock) && (vt(`sticky-dock:${e.blockId}`), n.sticky = {
			...n.sticky,
			dock: e.dock
		}, E.save(), pt(), ot?.sendSection(R(fe), t), cn());
	}
	function Ad(e) {
		let t = e.blockIds ?? [], { section: n } = sn(e.sectionId, t[0]);
		if (!n || !t.length) return;
		vt(`sticky-group:${e.sectionId}`);
		let r = e.on ? Zl("stk") : null;
		for (let e of n.blocks) t.includes(e.id) && (e.sticky = r ? {
			offset: 16,
			until: null,
			...e.sticky,
			group: r
		} : null);
		it(n, "block-edited"), E.save(), pt(), ot?.sendSection(R(fe), n), cn(), w(J(e.on ? "status.stickyGrouped" : "status.stickyUngrouped"));
	}
	async function jd(e, t) {
		if (!t || !bd) return;
		let n = (await jt({
			title: J("canvas.templateNamePrompt"),
			placeholder: J("ph.templateName")
		}))?.trim();
		if (!n) return;
		let r = Eu(n);
		if (!r) {
			w(J("status.invalidName"), "error");
			return;
		}
		if (R(Td).includes(r)) {
			w(J("status.templateExists"), "error");
			return;
		}
		vt("templates");
		let i = {
			schemaVersion: 1,
			mal: {
				name: n,
				kind: e
			},
			[e]: t
		};
		xd[r] = ha(`urd-draft-template-${r}`, () => null, _e, `urd-draft-mal-${r}`), xd[r].replace(i), xd[r].save(), bd.data.maler = [...R(Td), r], bd.save(), A(Td, [...R(Td), r], !0), w(J("status.templateSaved", { name: n }), "ok"), pt(), Dd();
	}
	async function Md(e) {
		let t = xd[e.id]?.data?.mal;
		t && await At({ title: J("confirm.deleteTemplate", { name: t.name }) }) && (vt("templates"), R(yc) === e.id && A(yc, null), localStorage.removeItem(`urd-draft-template-${e.id}`), localStorage.removeItem(`urd-draft-mal-${e.id}`), delete xd[e.id], bd.data.maler = R(Td).filter((t) => t !== e.id), bd.save(), A(Td, R(Td).filter((t) => t !== e.id), !0), pt(), Dd());
	}
	async function Nd() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/collections.json")).json();
		} catch {}
		ad = ha("urd-draft-collections", () => e, _e, "urd-draft-samlinger"), A(ld, [...ad.data.samlinger ?? []], !0);
		for (let e of R(ld)) {
			let t = null;
			try {
				t = await (await fetch(`/content/samlinger/${e}.json`)).json();
			} catch {}
			sd[e] = t, od[e] = ha(`urd-draft-collection-${e}`, () => t, _e, `urd-draft-samling-${e}`), !t && !od[e].data && (od[e].replace({
				schemaVersion: 1,
				id: e,
				name: e,
				kind: "custom",
				entries: []
			}), od[e].save());
		}
		cd = !0, Pd();
	}
	function Pd(e = !0) {
		let t = {};
		for (let e of R(ld)) od[e] && (t[e] = JSON.parse(JSON.stringify(od[e].data)));
		A(ud, t, !0), e && Fd();
	}
	function Fd() {
		ot?.sendCollections(Ye(R(ud)) ?? {});
	}
	function Id(e, t, n, r = !0) {
		let i = od[e];
		i && (vt(t), n(i.data), i.save(), pt(), Pd(r));
	}
	function Ld(e) {
		od[e.collection] && Wd(e.collection);
	}
	function Rd(e) {
		return (new DOMParser().parseFromString(String(e ?? ""), "text/html").body.textContent ?? "").trim();
	}
	function zd(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r !== "title" || Rd(i)) && Id(t, `edit:collection:${t}:${n}:${r}`, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image");
	}
	function Bd(e, t, n) {
		let r = {
			schemaVersion: 1,
			id: e,
			name: t,
			kind: n,
			entries: []
		};
		od[e] = ha(`urd-draft-collection-${e}`, () => null, _e, `urd-draft-samling-${e}`), od[e].replace(r), od[e].save(), ad.data.samlinger = [...R(ld), e], ad.save(), A(ld, [...R(ld), e], !0), A(dd, e, !0), pt(), Pd();
	}
	function Vd() {
		let e = R(md).trim();
		if (!e) return;
		let t = to(e);
		if (!t || R(ld).includes(t)) {
			w(J(t ? "status.collectionExists" : "status.invalidName"), "error");
			return;
		}
		vt("collections"), Bd(t, e, R(hd)), A(md, "");
	}
	function Hd() {
		let e = J("seed.productCatalogName"), t = to(e) || "collection", n = t;
		for (let e = 2; R(ld).includes(n); e += 1) n = `${t}-${e}`;
		vt("collections"), Bd(n, e, "products"), Vn(null, (e) => {
			e.props.collection = n;
		});
	}
	function Ud(e) {
		vt("collections"), localStorage.removeItem(`urd-draft-collection-${e}`), localStorage.removeItem(`urd-draft-samling-${e}`), delete od[e], ad.data.samlinger = R(ld).filter((t) => t !== e), ad.save(), A(ld, R(ld).filter((t) => t !== e), !0), R(dd) === e && A(dd, null), pt(), Pd();
	}
	function Wd(e) {
		Id(e, `collection:${e}:add-entry`, (e) => {
			e.kind === "products" ? e.entries.push({
				id: Zl("entry"),
				title: J("seed.newProduct"),
				text: ""
			}) : e.entries.unshift({
				id: Zl("entry"),
				title: J("seed.newEntry"),
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function Gd(e, t, n, r) {
		Id(e, `edit:collection:${e}:${t}:${n}`, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function Kd(e, t, n) {
		Id(e, `collection:${e}:move-entry`, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function qd(e, t) {
		Id(e, `collection:${e}:remove-entry`, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function Jd(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && Gd(e, t, "image", (await ka(r)).dataUrl);
	}
	function Yd(e, t, n) {
		let r = n.split(",").map((e) => e.trim()).filter(Boolean);
		Gd(e, t, "sizes", r.length ? r : "");
	}
	function Xd(e, t) {
		Id(e, `collection:${e}:${t}:colors`, (e) => {
			let n = e.entries.find((e) => e.id === t);
			n && (n.colors = [...n.colors ?? [], { name: J("ph.colorName") }]);
		});
	}
	function Zd(e, t, n, r, i) {
		Id(e, `edit:collection:${e}:${t}:color:${n}:${r}`, (e) => {
			let a = e.entries.find((e) => e.id === t)?.colors?.[n];
			a && (r === "image" && !i ? delete a.image : i && (a[r] = i));
		});
	}
	async function Qd(e, t, n, r) {
		let i = r.target.files?.[0];
		r.target.value = "", i && Zd(e, t, n, "image", (await ka(i)).dataUrl);
	}
	function $d(e, t, n) {
		Id(e, `collection:${e}:${t}:colors`, (e) => {
			let r = e.entries.find((e) => e.id === t);
			r?.colors && (r.colors = r.colors.filter((e, t) => t !== n), r.colors.length || delete r.colors);
		});
	}
	function ef(e) {
		let t = od[e]?.data;
		if (!t) return;
		let n = URL.createObjectURL(new Blob([ju(t.entries)], { type: "text/csv" })), r = document.createElement("a");
		r.href = n, r.download = `${e}.csv`, r.click(), URL.revokeObjectURL(n);
	}
	async function nf(e, t) {
		let n = t.target.files?.[0];
		if (t.target.value = "", !n) return;
		let r = Pu(await n.text());
		if (!r) {
			w(J("status.csvInvalid"), "error");
			return;
		}
		let i = /* @__PURE__ */ new Set();
		for (let e of r.entries) (!/^[a-z0-9][a-z0-9-]*$/.test(e.id) || i.has(e.id)) && (e.id = Zl("entry")), i.add(e.id);
		Id(e, `collection:${e}:import`, (e) => {
			e.entries = r.entries;
		}), w(J("status.csvImported", { count: String(r.entries.length) }), "ok");
	}
	let of = null, sf, ff = new Promise((e) => {
		sf = e;
	}), hf = /* @__PURE__ */ k(null), gf = an({}), Sf = /* @__PURE__ */ k("0.0.0"), Cf = /* @__PURE__ */ k(""), wf = /* @__PURE__ */ k(""), Tf = /* @__PURE__ */ k(an([])), Ef = /* @__PURE__ */ k(an([])), Df = /* @__PURE__ */ k("pending"), Of = () => [.../* @__PURE__ */ new Set([...R(hf)?.enabled ?? [], ...R(hf)?.disabled ?? []])];
	function kf() {
		A(hf, JSON.parse(JSON.stringify(of.data)), !0);
	}
	let Af = /* @__PURE__ */ k(null);
	async function jf() {
		try {
			let e = (await fetch("/urd.json", { cache: "no-store" })).headers.get("content-security-policy");
			if (!e) {
				A(Af, { unknown: !0 }, !0);
				return;
			}
			let t = (t) => new Set((e.split(";").map((e) => e.trim()).find((e) => e.startsWith(`${t} `)) ?? "").split(/\s+/).slice(1));
			A(Af, {
				frameSrc: t("frame-src"),
				connectSrc: t("connect-src"),
				scriptSrc: t("script-src")
			}, !0);
		} catch {
			A(Af, { unknown: !0 }, !0);
		}
	}
	function Mf(e) {
		let t = [
			...(e.scriptSrc ?? []).map((e) => ["script-src", e]),
			...(e.connectSrc ?? []).map((e) => ["connect-src", e]),
			...(e.frameSrc ?? []).map((e) => ["frame-src", e])
		];
		if (!R(Af) || R(Af).unknown) return [];
		let n = {
			"script-src": R(Af).scriptSrc,
			"connect-src": R(Af).connectSrc,
			"frame-src": R(Af).frameSrc
		};
		return t.filter(([e, t]) => !n[e]?.has(t)).map(([e, t]) => `${e} ${t}`);
	}
	async function Ff() {
		jf();
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		A(Ef, e.enabled ?? [], !0), of = ha("urd-draft-plugins", () => e, _e), kf();
		try {
			A(Sf, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of Of()) Hf(e);
		zf(), sf(), ot?.sendPlugins(Ye(R(hf))?.enabled ?? []);
	}
	async function zf() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				Bf();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), A(Tf, (t ?? []).filter((e) => !Of().includes(e)), !0);
			for (let e of R(Tf)) Hf(e);
			A(Df, "ok");
		} catch {
			Bf();
		}
	}
	function Bf() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				A(Tf, e.filter((e) => !Of().includes(e)), !0);
				for (let e of R(Tf)) Hf(e);
				A(Df, "ok");
				return;
			}
		} catch {}
		A(Df, "unavailable");
	}
	async function Hf(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = Xl(t);
			gf[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && Jl(R(Sf), t.requiresEngine)
			};
		} catch {
			gf[e] = {
				name: e,
				errors: [J("plugin.manifestNotFound", { id: e })],
				satisfied: !1
			};
		}
	}
	function Uf(e, t) {
		vt("plugins");
		let n = of.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), of.save(), pt(), kf(), Wf();
	}
	function Wf() {
		R(ye) && (R(ye).src = R(ye).src);
	}
	function Gf(e) {
		vt("plugins");
		let t = of.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), of.save(), pt(), kf(), Wf();
	}
	async function Kf() {
		A(wf, "");
		let e = R(Cf).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			A(wf, J("plugin.invalidId"), !0);
			return;
		}
		if (Of().includes(e)) {
			A(wf, J("plugin.alreadyListed"), !0);
			return;
		}
		if (await Hf(e), gf[e].errors.length) {
			A(wf, J("plugin.invalidManifest", { errors: gf[e].errors.join("; ") }), !0);
			return;
		}
		Uf(e, !0), A(Cf, "");
	}
	function Xf(e) {
		A(Tf, R(Tf).filter((t) => t !== e), !0), Uf(e, !0);
	}
	function Zf(e, t) {
		X(e, () => {
			R(D).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(R(D).footer);
		});
	}
	function Qf(e, t) {
		Zf(`edit:footer-brand-${e}`, (n) => {
			n.brand ??= {}, t.trim() ? n.brand[e] = t : delete n.brand[e], !n.brand.title && !n.brand.tagline && !n.brand.logo && delete n.brand;
		});
	}
	function $f(e) {
		Zf("footer", (t) => {
			t.brand ??= {}, e === "image" || e === "both" ? t.brand.mode = e : delete t.brand.mode;
		});
	}
	async function ep(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await ka(t);
			Zf("footer", (t) => {
				t.brand ??= {}, t.brand.logo = e.dataUrl, t.brand.mode || (t.brand.mode = "both");
			});
		} catch {
			w(J("status.imageReadErrorSvg"), "error");
		}
	}
	function np() {
		Zf("footer", (e) => {
			e.brand && (delete e.brand.logo, delete e.brand.mode, delete e.brand.logoHeight, !e.brand.title && !e.brand.tagline && delete e.brand);
		});
	}
	function ip(e) {
		Zf("edit:footer-logo-height", (t) => {
			t.brand ??= {};
			let n = Number(e);
			Number.isFinite(n) && (t.brand.logoHeight = Math.min(160, Math.max(16, Math.round(n))));
		});
	}
	function ap(e) {
		Zf("edit:footer-copyright", (t) => {
			e.trim() ? t.copyright = e : delete t.copyright;
		});
	}
	let op = [
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
	function sp(e) {
		let t = J("seed.orgName"), n = R(D).pages ?? [], r = (e) => n.slice(0, e).map((e) => ({
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
					version: Pf.version ?? 1,
					props: {
						...Pf.defaults(),
						color: "accent",
						x: .12,
						y: 0,
						radius: .6,
						opacity: .45
					}
				}, {
					type: "grain",
					version: If.version ?? 1,
					props: {
						...If.defaults(),
						opacity: .08
					}
				}]
			}
		};
	}
	function cp(e) {
		Zf("footer-template", (t) => {
			let n = sp(e);
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
	function lp(e) {
		Zf("footer", (t) => {
			t[e] ??= [], t[e].push(R(D).pages[0] ? {
				label: J("seed.link"),
				page: R(D).pages[0].id
			} : {
				label: J("seed.link"),
				href: "https://"
			});
		});
	}
	function up(e, t) {
		Zf("footer", (n) => {
			n[e].splice(t, 1), n[e].length || delete n[e];
		});
	}
	function dp(e, t, n) {
		Zf("footer", (r) => {
			let i = r[e], a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function fp(e, t, n) {
		Zf(`edit:footer-${e}-label-${t}`, (r) => {
			r[e][t].label = n;
		});
	}
	function pp(e, t, n) {
		Zf("footer", (r) => {
			let i = r[e][t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function mp(e, t, n) {
		Zf(`edit:footer-${e}-href-${t}`, (r) => {
			r[e][t].href = n;
		});
	}
	function hp(e) {
		Zf("footer", (t) => {
			e === "center" ? t.columnsAlign = "center" : delete t.columnsAlign;
		});
	}
	function gp(e) {
		Zf("footer", (t) => {
			e ? t.cta ??= {
				kind: "button",
				label: J("seed.join")
			} : delete t.cta;
		});
	}
	function _p(e, t) {
		Zf(`edit:footer-cta-${e}`, (n) => {
			n.cta ??= {}, t === "" || t == null || t === !1 ? delete n.cta[e] : n.cta[e] = t;
		});
	}
	function vp(e) {
		Zf("footer", (t) => {
			t.cta ??= {}, e === "__href" ? (delete t.cta.page, t.cta.href = t.cta.href ?? "https://") : (t.cta.page = e, delete t.cta.href);
		});
	}
	function yp(e, t) {
		Zf("footer", (n) => {
			let r = new Set(n.hideOn ?? []);
			t ? r.delete(e) : r.add(e), r.size ? n.hideOn = [...r] : delete n.hideOn;
		});
	}
	function bp() {
		Zf("footer", (e) => {
			e.columns ??= [], e.columns.push({
				title: J("seed.column"),
				links: [{
					label: J("seed.link"),
					page: R(D).pages[0].id
				}]
			});
		});
	}
	function xp(e) {
		Zf("footer", (t) => {
			t.columns.splice(e, 1), t.columns.length || delete t.columns;
		});
	}
	function Sp(e, t) {
		Zf("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.columns.length || ([n.columns[e], n.columns[r]] = [n.columns[r], n.columns[e]]);
		});
	}
	function Cp(e, t) {
		Zf(`edit:footer-col-title-${e}`, (n) => {
			n.columns[e].title = t;
		});
	}
	function wp(e) {
		Zf("footer", (t) => {
			t.columns[e].links ??= [], t.columns[e].links.push({
				label: J("seed.link"),
				page: R(D).pages[0].id
			});
		});
	}
	function Tp(e, t) {
		Zf("footer", (n) => {
			n.columns[e].links.splice(t, 1);
		});
	}
	function Ep(e, t, n) {
		Zf("footer", (r) => {
			let i = r.columns[e].links, a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function Dp(e, t, n) {
		Zf(`edit:footer-link-label-${e}-${t}`, (r) => {
			r.columns[e].links[t].label = n;
		});
	}
	function Op(e, t, n) {
		Zf("footer", (r) => {
			let i = r.columns[e].links[t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function Ap(e, t, n) {
		Zf(`edit:footer-link-href-${e}-${t}`, (r) => {
			r.columns[e].links[t].href = n;
		});
	}
	function Ip() {
		Zf("footer", (e) => {
			e.social ??= [], e.social.push({
				icon: "facebook",
				url: "https://"
			});
		});
	}
	function Lp(e) {
		Zf("footer", (t) => {
			t.social.splice(e, 1), t.social.length || delete t.social;
		});
	}
	function Rp(e, t) {
		Zf("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.social.length || ([n.social[e], n.social[r]] = [n.social[r], n.social[e]]);
		});
	}
	function zp(e, t) {
		Zf("footer", (n) => {
			n.social[e].icon = t;
		});
	}
	function Bp(e, t) {
		Zf(`edit:footer-social-url-${e}`, (n) => {
			n.social[e].url = t;
		});
	}
	let Vp = _o.filter(([e]) => e === "iconCat.social" || e === "iconCat.communication").flatMap(([, e]) => e.map((e) => [e, J(go[e].labelKey)]));
	function Hp(e, t) {
		X(`edit:nav-label-${e}`, () => {
			R(D).nav.items[e].label = t;
		});
	}
	function Up(e, t) {
		X("nav", () => {
			let n = R(D).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function Wp(e, t) {
		X(`edit:nav-href-${e}`, () => {
			R(D).nav.items[e].href = t;
		});
	}
	function Gp(e, t) {
		let n = e + t, r = R(D).nav.items;
		n < 0 || n >= r.length || X("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function qp(e) {
		X("nav", () => {
			R(D).nav.items.splice(e, 1);
		});
	}
	let Jp = /* @__PURE__ */ k(""), Yp = /* @__PURE__ */ k(""), Xp = /* @__PURE__ */ k(null);
	function Zp(e) {
		let [t, n] = e.split(".").map(Number), r = R(D).nav.items;
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
	function Qp(e, t, n, r) {
		if (!R(Yp) || R(Yp) === t) return null;
		let i = e.getBoundingClientRect(), a = (r - i.top) / i.height, o = n - i.left, s = Zp(R(Yp)), c = Zp(t), l = s.list[s.index], u;
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
		}, $p(u, l, s);
	}
	function $p(e, t, n) {
		let r = Zp(e.key);
		if (r.parent) {
			if (r.parent === t) return null;
			t.children?.length && (e = {
				key: e.key.split(".")[0],
				pos: "after"
			}, r = Zp(e.key));
		}
		let i = r.list[r.index];
		if (e.pos === "into") {
			let n = i.children ?? [];
			return n.length && n[n.length - 1] === t ? null : e;
		}
		let a = r.parent ? r.parent.children : R(D).nav.items, o = a.filter((e) => e !== t).indexOf(i) + +(e.pos === "after");
		return a === n.list && o === n.index ? null : e;
	}
	function em() {
		if (!R(Yp)) return {
			label: "",
			target: ""
		};
		let e = Zp(R(Yp)), t = e.list[e.index], n = t.page ? R(D).pages.find((e) => e.id === t.page) : null;
		return {
			label: t.label,
			target: n ? n.title : t.href ?? J("opt.noLink")
		};
	}
	function tm(e) {
		R(Xp) && e?.dataTransfer?.dropEffect !== "none" && im(R(Xp).key), A(Yp, ""), A(Xp, null);
	}
	wn(() => {
		if (!R(Yp)) return;
		let e = (e) => e.preventDefault();
		return window.addEventListener("dragover", e), window.addEventListener("drop", e), () => {
			window.removeEventListener("dragover", e), window.removeEventListener("drop", e);
		};
	});
	let nm = "application/x-urd-nav-row";
	function rm(e) {
		if (!R(Yp)) return;
		let t = [...e.currentTarget.querySelectorAll(".nav-item:not(.ghost)")];
		if (!t.length) return;
		let n = t.find((t) => {
			let n = t.getBoundingClientRect();
			return e.clientY >= n.top && e.clientY <= n.bottom;
		}), r = null;
		if (n) r = Qp(n, n.dataset.key, e.clientX, e.clientY);
		else {
			let n = Zp(R(Yp)), i = n.list[n.index], a = t.find((t) => {
				let n = t.getBoundingClientRect();
				return n.top + n.height / 2 > e.clientY;
			});
			if (a) r = a.dataset.key === R(Yp) ? null : $p({
				key: a.dataset.key,
				pos: "before"
			}, i, n);
			else {
				let e = [...t].reverse().find((e) => !e.classList.contains("child"));
				r = e.dataset.key === R(Yp) ? null : $p({
					key: e.dataset.key,
					pos: "after"
				}, i, n);
			}
		}
		if (!r) {
			A(Xp, null);
			return;
		}
		e.preventDefault(), (R(Xp)?.key !== r.key || R(Xp)?.pos !== r.pos) && A(Xp, r, !0);
	}
	function im(e) {
		let t = R(Yp), n = R(Xp);
		if (A(Yp, ""), A(Xp, null), t && n && n.key === e && t !== e) {
			{
				let r = Zp(t), i = Zp(e), a = r.list[r.index];
				if (i.parent && (i.parent === a || a.children?.length) || n.pos === "into" && a.children?.length) return;
			}
			X("nav", () => {
				let r = R(D).nav.items, i = Zp(t), a = Zp(e), o = i.list[i.index], s = a.list[a.index];
				if (o !== s) {
					if (i.list.splice(i.index, 1), i.parent && i.parent.children.length === 0 && (delete i.parent.children, !i.parent.page && !i.parent.href && (i.parent.page = R(D).pages[0].id)), n.pos === "into") s.children ??= [], s.children.push(o);
					else {
						let e = a.parent ? a.parent.children : r, t = e.indexOf(s) + +(n.pos === "after");
						e.splice(t, 0, o);
					}
					!o.page && o.href == null && !o.children?.length && (o.page = R(D).pages[0].id);
				}
			}), A(Jp, "");
		}
	}
	let am = "<svg width=\"10\" height=\"16\" viewBox=\"0 0 10 16\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"3\" cy=\"3\" r=\"1.3\"/><circle cx=\"7\" cy=\"3\" r=\"1.3\"/><circle cx=\"3\" cy=\"8\" r=\"1.3\"/><circle cx=\"7\" cy=\"8\" r=\"1.3\"/><circle cx=\"3\" cy=\"13\" r=\"1.3\"/><circle cx=\"7\" cy=\"13\" r=\"1.3\"/></svg>";
	function om() {
		X("nav", () => {
			R(D).nav.items.push({
				label: J("seed.link"),
				page: R(D).pages[0].id
			});
		});
	}
	function sm(e) {
		X("nav", () => {
			let t = R(D).nav.items[e];
			t.children ??= [], t.children.push({
				label: J("seed.link"),
				page: R(D).pages[0].id
			});
		});
	}
	function cm(e, t, n) {
		X(`edit:nav-child-label-${e}-${t}`, () => {
			R(D).nav.items[e].children[t].label = n;
		});
	}
	function lm(e, t, n) {
		X("nav", () => {
			let r = R(D).nav.items[e].children[t];
			n === "__href" ? (delete r.page, r.href = r.href ?? "https://") : (r.page = n, delete r.href);
		});
	}
	function um(e, t, n) {
		X(`edit:nav-child-href-${e}-${t}`, () => {
			R(D).nav.items[e].children[t].href = n;
		});
	}
	function fm(e, t, n) {
		let r = t + n, i = R(D).nav.items[e].children;
		r < 0 || r >= i.length || X("nav", () => {
			[i[t], i[r]] = [i[r], i[t]];
		});
	}
	function pm(e, t) {
		X("nav", () => {
			let n = R(D).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = R(D).pages[0].id));
		});
	}
	function mm(e, t) {
		X(`edit:theme-color-${e}`, () => {
			R(D).theme.tokens.color[e] = t, R(D).theme.alt?.auto && (R(D).theme.alt.tokens.color = km());
		});
	}
	function gm(e, t) {
		return e === "accent-text" ? ue(Um(t.accent ?? "#000000", t)) : t.bg;
	}
	let _m = /* @__PURE__ */ O(() => !R(D)?.theme?.tokens?.color?.["accent-text"] && !R(D)?.theme?.alt?.tokens?.color?.["accent-text"]), vm = /* @__PURE__ */ k(null), ym = /* @__PURE__ */ k(!1), bm = /* @__PURE__ */ k(!1), xm = (e) => e.length > 0 && [...e].every((e) => e.open);
	function Sm() {
		let e = R(vm)?.querySelectorAll("details.group") ?? [];
		A(ym, e.length > 0), A(bm, xm(e), !0);
	}
	wn(() => {
		R(Wt), gr().then(Sm);
	});
	function Cm() {
		let e = !R(bm);
		R(vm)?.querySelectorAll("details.group").forEach((t) => {
			t.open = e;
		}), Sm();
	}
	function wm(e) {
		for (let t of e.querySelectorAll("details.group")) {
			let e = t.querySelector(":scope > summary");
			if (!e || e.querySelector(".fold-sub")) continue;
			let n = () => t.querySelectorAll(":scope > .group-items details.group");
			if (!n().length) continue;
			let r = document.createElement("button");
			r.type = "button", r.className = "fold-sub fold-toggle", r.innerHTML = C.foldToggle;
			let i = () => {
				let e = xm(n());
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
	wn(() => {
		let e = R(vm);
		if (!e) return;
		let t = new MutationObserver(() => {
			wm(e), Sm();
		});
		return t.observe(e, {
			childList: !0,
			subtree: !0
		}), e.addEventListener("toggle", Sm, !0), wm(e), () => {
			t.disconnect(), e.removeEventListener("toggle", Sm, !0);
		};
	});
	function Tm(e) {
		X("edit:theme-color-accent-text", () => {
			e ? (delete R(D).theme.tokens.color["accent-text"], R(D).theme.alt?.tokens?.color && delete R(D).theme.alt.tokens.color["accent-text"]) : (R(D).theme.tokens.color["accent-text"] = gm("accent-text", R(mo)), R(D).theme.alt?.auto && (R(D).theme.alt.tokens.color = km()));
		});
	}
	function Em(e, t) {
		X("theme", () => {
			R(D).theme.tokens.font[e] = t;
		});
	}
	function Dm(e, t) {
		X("theme", () => {
			R(D).theme.tokens.radius[e] = t;
		});
	}
	function Om(e) {
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
	function km() {
		return Object.fromEntries(Object.entries(R(D).theme.tokens.color).map(([e, t]) => [e, Om(t)]));
	}
	function Am(e, t) {
		X(`edit:theme-alt-${e}`, () => {
			R(D).theme.alt.tokens.color[e] = t, R(D).theme.alt.auto = !1;
		});
	}
	function jm(e) {
		X("theme", () => {
			e === "light" ? delete R(D).theme.scheme : R(D).theme.scheme = e;
		});
	}
	function Mm(e) {
		X("theme", () => {
			e ? R(D).theme.alt = {
				auto: !0,
				tokens: { color: km() }
			} : delete R(D).theme.alt;
		});
	}
	function Nm(e) {
		X("theme", () => {
			R(D).theme.alt ??= { tokens: { color: km() } }, R(D).theme.alt.auto = e, e && (R(D).theme.alt.tokens.color = km());
		});
	}
	function Im(e) {
		let t = R(D).theme.tokens.font[e];
		return [...Bm.some(([, e]) => e === t) ? [] : [[t, J("opt.customFont")]], ...Bm.map(([e, t]) => [t, J(e)])];
	}
	let Lm = (e) => parseInt(e, 10) || 0;
	function Rm(e, t) {
		Dm(e, `${t}px`);
	}
	let Um = (e, t) => e && t && t[e] ? t[e] : e, Km = [
		"bg",
		"surface",
		"text",
		"accent",
		"accent-text"
	], Ih = [
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
	function Pb(e) {
		X("theme", () => {
			let t = e.scheme === "dark", n = t ? e.dark : e.light, r = t ? e.light : e.dark;
			for (let e of Km) R(D).theme.tokens.color[e] = n[e];
			t ? R(D).theme.scheme = "dark" : delete R(D).theme.scheme, R(D).theme.alt = { tokens: { color: { ...r } } };
		});
	}
	let Fb = /* @__PURE__ */ O(() => {
		if (!R(D)) return null;
		let e = R(D).theme.tokens.color, t = R(D).theme.alt?.tokens?.color ?? {}, n = R(D).theme.scheme === "dark";
		return Ih.find((r) => {
			let i = n ? r.dark : r.light, a = n ? r.light : r.dark;
			return Km.every((n) => e[n] === i[n] && t[n] === a[n]);
		})?.id ?? null;
	}), Ib = 0;
	async function Lb() {
		R(Se) && (Ib = R(vm)?.scrollTop ?? 0), A(Se, !R(Se)), ot?.sendChrome(R(Se)), R(Se) || A(un, null), R(Se) && (await gr(), requestAnimationFrame(() => {
			R(vm) && (R(vm).scrollTop = Ib);
		}));
	}
	function Rb(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (vt(`edit:${e.blockId}`), n.props = e.props, E.save(), pt(), R(j)?.blockId === e.blockId && cn(), e.rerender && ot?.sendSection(R(fe), t), A(me, ""), Qn(t.id, n));
	}
	function zb(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		vt(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop", i = n.frames.desktop?.w;
		n.frames[r] = e.frame, r === "desktop" && it(t, "desktop-changed-after-mobile"), E.save(), pt(), R(j)?.blockId === e.blockId && cn(), r === "desktop" && e.frame?.w !== i ? Qn(t.id, n) : r === "mobile" && nr(t.id, n);
	}
	function Bb(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (n?.frames?.desktop && n.frames.desktop.h !== e.h) {
			if (e.fit) {
				R(Fe) === "desktop" && e.seq === Xn.get(e.blockId) && Vb(t, n, e.h);
				return;
			}
			E.amendBaseline((t) => {
				let n = t.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
				n?.frames?.desktop && (n.frames.desktop.h = e.h);
			}), E.hasDraft() && vt(`edit:${e.blockId}`), n.frames.desktop.h = e.h, E.save(), pt(), R(j)?.blockId === e.blockId && cn();
		}
	}
	function Vb(e, t, n) {
		let r = kl(e.blocks, t.id, n), i = {};
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
		it(e, "block-edited"), E.save(), pt(), R(j)?.blockId === t.id && cn(), ot?.sendFrames(e.id, Ye(i));
	}
	function Hb(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			if (vt("mobile-reset"), e.blockId) {
				let n = t.blocks.find((t) => t.id === e.blockId);
				n && (n.frames.mobile = null);
			} else for (let e of t.blocks) e.frames.mobile = null;
			!rt(t) && t.responsive?.mobile && (t.responsive.mobile.attention = null), E.save(), pt(), Qe(), ot?.sendSection(R(fe), t);
		}
	}
	function Ub(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && typeof e.mobileOrder == "number" && (vt("mobile-order"), n.mobileOrder = e.mobileOrder, E.save(), pt(), ot?.sendSection(R(fe), t));
	}
	function Wb(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (vt("review-done"), t.responsive.mobile.attention = null, E.save(), pt(), Qe());
	}
	function Gb(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (vt("block-flag"), typeof e.decor == "boolean" && (n.decor = e.decor), typeof e.hideMobile == "boolean" && (n.hideMobile = e.hideMobile), E.save(), pt(), typeof e.hideMobile == "boolean" && R(Fe) === "mobile" && ot?.sendSection(R(fe), t), R(j)?.blockId === e.blockId && cn());
	}
	function Kb(e) {
		vt("add-section"), e.section.id || (e.section.id = Zl("sec")), E.data.sections.splice(e.index, 0, e.section), E.save(), pt(), ot?.sendPage(R(fe), E.data), A(Pi, e.section.id, !0), Wi(e.section), A(Wt, "properties");
	}
	function qb(e) {
		let t = E.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (vt("move-section"), [t[n], t[r]] = [t[r], t[n]], E.save(), pt(), ot?.sendPage(R(fe), E.data));
	}
	function Jb(e) {
		vt("delete-section"), e.sectionId === R(Pi) && (A(Pi, null), A(Fi, null)), R(j)?.sectionId === e.sectionId && A(j, null), E.data.sections = E.data.sections.filter((t) => t.id !== e.sectionId), E.save(), pt(), ot?.sendPage(R(fe), E.data);
	}
	function Yb(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			vt("section-size"), t.size = {
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
			e.moves?.length && (it(t, "section-height"), R(j)?.sectionId === e.sectionId && cn()), e.sectionId === R(Pi) && A(Ii, e.minHeight, !0), E.save(), pt();
		}
	}
	function Xb(e) {
		let t = E.data.sections.find((t) => t.id === e.fromSectionId), n = E.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		t && n && r && (vt(e.groupKey ? `edit:${e.groupKey}` : "move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), it(t, "block-moved"), it(n, "block-moved"), E.save(), pt(), Qe(), ot?.sendSection(R(fe), t), ot?.sendSection(R(fe), n), R(j)?.blockId === e.blockId && (A(j, {
			...R(j),
			sectionId: e.toSectionId
		}, !0), cn()));
	}
	function Zb(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId);
		if (!t) return;
		let n = e.blockIds ?? [e.blockId];
		vt("delete-block"), t.blocks = t.blocks.filter((e) => !n.includes(e.id)), n.includes(R(j)?.blockId) && A(j, null), it(t, "block-deleted"), E.save(), pt(), ot?.sendSection(R(fe), t);
	}
	let Qb = {
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
				fields: vl()
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
	function $b(e) {
		let t = Qb[e];
		return t ? {
			id: Zl("blk"),
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
	function ex(e) {
		ot ? ot.sendPlaceBlock(e) : tx(Fo()?.id, e);
	}
	function tx(e, t) {
		let n = E.data.sections.find((t) => t.id === e) ?? E.data.sections[0];
		if (!n) return;
		vt("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), it(n, "block-added"), E.save(), pt(), ot?.sendSection(R(fe), n), Qn(n.id, t);
	}
	function nx(e, t, n, r) {
		let i = E.data.sections.find((t) => t.id === e);
		if (!i || !t?.length) return;
		vt("add-blocks");
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
		}), it(i, "block-added"), E.save(), pt(), ot?.sendSection(R(fe), i);
	}
	function rx(e) {
		ex($b(e));
	}
	let ix = {
		list: "calendar",
		cards: "calendar-cards",
		month: "calendar-month",
		next: "calendar-next",
		agenda: "calendar-agenda",
		week: "calendar-month",
		day: "calendar",
		year: "calendar-month"
	};
	function ax(e) {
		let t = Nc(e), n = $b(ix[t.view] ?? "calendar");
		n && (n.props = {
			...n.props,
			...t.view ? { view: t.view } : {},
			...t.id === "plain" ? {} : { design: t.id },
			...t.view === "next" ? {
				nextCount: 3,
				laterCount: 3
			} : {}
		}, ex(n));
	}
	let ox = /* @__PURE__ */ k(an([])), sx = { map: [{
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
	function cx(e, t = {}) {
		let n = Ye(e);
		ex({
			id: Zl("blk"),
			type: n.type,
			version: n.version ?? 1,
			decor: !1,
			props: {
				...n.defaults ?? {},
				...Ye(t)
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
	let lx = /* @__PURE__ */ k("");
	function ux() {
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
			...Ic().flatMap((e) => e.designs).filter((e) => e.id !== "plain").map((e) => ({
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
		for (let t of R(Td)) {
			let n = xd[t]?.data?.mal;
			n?.kind === "blocks" && e.push({
				label: n.name,
				act: "template",
				id: t
			});
		}
		for (let t of R(ox)) if (t.variants?.length) for (let n of t.variants) e.push({
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
	function dx(e) {
		e.act === "block" ? rx(e.kind) : e.act === "calendarDesign" ? ax(e.design) : e.act === "plugin" ? cx(e.entry, e.props ?? {}) : e.act === "template" && ot?.sendInsertTemplate(e.id);
	}
	function fx(e) {
		let t = $b(e.kind);
		if (t) {
			if (e.at && typeof e.at.x == "number" && typeof e.at.y == "number") {
				let n = E.data.sections.find((t) => t.id === e.sectionId)?.grid ?? R(D).grid, r = Vm({
					x: e.at.x,
					y: e.at.y,
					w: t.frames.desktop.w,
					h: t.frames.desktop.h,
					grid: n
				});
				t.frames.desktop.x = r.x, t.frames.desktop.y = r.y;
			} else t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40;
			tx(e.sectionId, t), ot?.sendSelect(t.id), e.kind === "image" && w(J("status.imageBlockAdded")), e.kind === "gallery" && w(J("status.galleryBlockAdded"));
		}
	}
	async function px(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		w(J("status.compressingImage"));
		let n;
		try {
			n = await ka(t);
		} catch (e) {
			w(Aa(e), "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (R(ye)?.clientWidth ?? 1280));
		ex({
			id: Zl("blk"),
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: to(t.name).replaceAll("-", " "),
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
		}), n.bytes > 4e5 ? w(J("status.imageLarge", { kb: Math.round(n.bytes / 1024) }), "error") : w("");
	}
	async function mx(e) {
		let t = [], n = 0, r = 0;
		for (let i of e) try {
			let e = await ka(i);
			e.bytes > 4e5 && (r += 1), t.push({
				src: e.dataUrl,
				alt: to(i.name).replaceAll("-", " "),
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
	function hx(e, t, n) {
		t ? w(J("status.imagesReadFailed", { n: t }), "error") : n ? w(J("status.imagesLarge", { n }), "error") : w(e ? "" : J("status.noImagesAdded"));
	}
	async function gx(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		w(J("status.compressingImages"));
		let { images: n, failed: r, big: i } = await mx(t);
		n.length && Vn("gallery-add", (e) => {
			e.props.images.push(...n);
		}), hx(n.length, r, i);
	}
	async function _x(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		w(J("status.compressingImages"));
		let { images: n, failed: r, big: i } = await mx(t);
		if (!n.length) {
			hx(0, r, i);
			return;
		}
		let a = $b("gallery");
		a.props.images = n, ex(a), hx(n.length, r, i);
	}
	function vx(e, t) {
		Vn("gallery-move", (n) => {
			let r = e + t;
			r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
		});
	}
	function yx(e) {
		Vn("gallery-remove", (t) => {
			t.props.images.splice(e, 1);
		});
	}
	function bx(e, t, n) {
		Vn(`edit:${R(j).blockId}:img${e}-${t}`, (r) => {
			r.props.images[e][t] = n;
		});
	}
	function xx(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/") && !i?.startsWith("data:audio/") && !i?.startsWith("data:video/")) return;
		let a = i.split(",", 2)[1], o = `media/${to(n || "image")}-${no(a)}.${eo(i)}`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function Sx(e, t) {
		xx(e, "image", e.title, t);
		for (let n of e.colors ?? []) xx(n, "image", `${e.title}-${n.name}`, t);
	}
	function Cx(e, t) {
		for (let n of e?.layers ?? []) {
			if (n.type === "image" && xx(n.props, "src", "background", t), n.type === "slideshow") for (let e of n.props.images ?? []) xx(e, "src", "background", t);
			n.type === "video" && (xx(n.props, "src", "video", t), xx(n.props, "poster", "plakat", t));
		}
	}
	function wx(e, t) {
		if (e.type === "image" && xx(e.props, "src", e.props.alt, t), e.type === "icon" && xx(e.props, "image", "ikon", t), e.type === "gallery") for (let n of e.props.images ?? []) xx(n, "src", n.alt || "gallery", t);
		e.type === "audio" && xx(e.props, "src", e.props.title || "lyd", t), e.type === "video" && (xx(e.props, "src", e.props.title || "video", t), xx(e.props, "poster", "poster", t));
	}
	function Tx(e, t) {
		Cx(e.background, t);
		for (let n of e.blocks) wx(n, t);
	}
	function Ex(e) {
		let t = [];
		e.meta?.og && xx(e.meta.og, "image", "share", t);
		for (let n of e.sections) Tx(n, t);
		return t;
	}
	function Dx(e) {
		let t = [], n = e.nav?.logo;
		if (n?.type === "image" && xx(n, "value", "logo", t), n?.type === "both" && xx(n, "image", "logo", t), e.nav?.style && xx(e.nav.style, "image", "menu", t), Cx(e.nav?.style?.background, t), Cx(e.footer?.background, t), e.footer?.brand && xx(e.footer.brand, "logo", "footer-logo", t), e.nav?.launcher) {
			xx(e.nav.launcher, "image", "snarvei", t);
			for (let n of e.nav.launcher.links ?? []) xx(n, "image", "snarvei", t);
		}
		return xx(e.site, "icon", "ikon", t), t;
	}
	let Ox = /* @__PURE__ */ k(!1), kx = /* @__PURE__ */ k(null);
	function Ax() {
		A(Ox, !R(Ox));
	}
	function jx() {
		A(Ox, !1);
		try {
			Mx(), w(J("ui.discarded"), "info");
		} catch (e) {
			console.error("Urd: discard failed", e), w(String(e?.message ?? e), "error");
		}
	}
	wn(() => {
		if (!R(Ox)) return;
		let e = (e) => {
			if (!R(kx)?.contains(e.target)) {
				A(Ox, !1);
				return;
			}
			e.target instanceof Element && e.target.closest(".discard-confirm") && (e.preventDefault(), e.stopPropagation(), jx());
		}, t = (e) => {
			e.key === "Escape" && A(Ox, !1);
		}, n = !1, r = (e) => {
			n = !!R(kx)?.contains(e.target);
		}, i = () => {
			n = !1;
		}, a = () => {
			n || A(Ox, !1);
		};
		return window.addEventListener("pointerdown", r, !0), window.addEventListener("pointerup", i, !0), window.addEventListener("click", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", a), () => {
			window.removeEventListener("pointerdown", r, !0), window.removeEventListener("pointerup", i, !0), window.removeEventListener("click", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", a);
		};
	});
	function Mx() {
		vt("discard");
		for (let e of R(D).pages) e.id !== R(fe) && !dt.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = E.reset();
		if (at.reset(), of && (of.reset(), kf()), ad) {
			ad.reset(), A(ld, [...ad.data.samlinger ?? []], !0);
			for (let e of Object.keys(od)) R(ld).includes(e) ? od[e].reset() : delete od[e];
			Pd();
		}
		if (bd) {
			bd.reset(), A(Td, [...bd.data.maler ?? []], !0);
			for (let e of Object.keys(xd)) R(Td).includes(e) ? xd[e].reset() : (localStorage.removeItem(`urd-draft-template-${e}`), localStorage.removeItem(`urd-draft-mal-${e}`), delete xd[e]);
			Dd();
		}
		st(), A(xe, {
			snap: !0,
			...R(D).grid
		}, !0), pt(), A(me, ""), ct(), R(D).pages.some((e) => e.id === R(fe)) ? ot?.sendPage(R(fe), e) : Ys(R(D).pages[0].id);
	}
	async function Nx() {
		if (Zo) {
			w(J("status.revertReloadBeforePublish"), "error");
			return;
		}
		if (R(ms)) {
			w(J("update.publishBlocked"), "error");
			return;
		}
		w(J("status.publishing"));
		let e = [], t = [], n = [], r = [];
		for (let i of R(D).pages) {
			let a = `urd-draft-${i.id}`, o = dt.has(i.id) || !R(de).pages.some((e) => e.id === i.id), s = null;
			if (i.id === R(fe) && (E.hasDraft() || o)) s = E.data;
			else if (i.id !== R(fe)) {
				let e = localStorage.getItem(a);
				if (e) try {
					s = Gl(JSON.parse(e), at.data);
				} catch {}
			}
			if (!s && o && (s = Js(i)), !s) continue;
			let c = JSON.parse(JSON.stringify(s));
			e.push(...Ex(c)), e.push({
				path: i.file,
				content: JSON.stringify(c, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (at.hasDraft()) {
			let r = JSON.parse(JSON.stringify(R(D)));
			e.push(...Dx(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), e.push({
				path: "content/theme.css",
				content: mf(r.theme),
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(R(de).theme, R(D).theme) || t.push(J("publish.part.theme")), i(R(de).nav, R(D).nav) || t.push(J("publish.part.nav")), i(R(de).footer, R(D).footer) || t.push(J("publish.part.footer")), i(R(de).pages, R(D).pages) || t.push(J("publish.part.pages")), i(R(de).grid, R(D).grid) || t.push(J("publish.part.grid")), (R(de).site.icon ?? null) !== (R(D).site.icon ?? null) && t.push(J("publish.part.icon"));
			let { icon: a, ...o } = R(de).site, { icon: s, ...c } = R(D).site;
			i(o, c) || t.push(J("publish.part.siteInfo"));
		}
		let i = Object.entries(od).filter(([, e]) => e.hasDraft());
		if (i.length || ad?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) Sx(t, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), Ru.includes(i.kind) && e.push({
					path: `content/samlinger/${t}.xml`,
					content: zu({
						title: i.name ?? t,
						origin: location.origin,
						path: `/content/samlinger/${t}.xml`,
						items: i.entries.map((e) => ({
							id: e.id,
							title: Rd(e.title),
							text: Rd(e.text),
							date: e.date,
							href: e.href
						}))
					}),
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (ad?.hasDraft()) {
				e.push({
					path: "content/collections.json",
					content: JSON.stringify(ad.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-collections", "urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/collections.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!R(ld).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push(J("publish.part.collections"));
		}
		let a = Object.entries(xd).filter(([, e]) => e.hasDraft());
		if (a.length || bd?.hasDraft()) {
			for (let [t, r] of a) {
				let i = JSON.parse(JSON.stringify(r.data));
				i.section && Tx(i.section, e);
				for (let t of i.blocks ?? []) wx(t, e);
				for (let t of i.page?.sections ?? []) Tx(t, e);
				e.push({
					path: `content/maler/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-mal-${t}`);
			}
			if (bd?.hasDraft()) {
				e.push({
					path: "content/maler.json",
					content: JSON.stringify(bd.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-templates", "urd-draft-maler");
				let t = { maler: [] };
				try {
					t = await (await fetch("/content/maler.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.maler ?? []) {
					let t = `content/maler/${n}.json`;
					!R(Td).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push(J("publish.part.templates"));
		}
		of?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(of.data, null, 2) + "\n",
			encoding: "utf-8"
		}), n.push("urd-draft-plugins"), t.push(J("publish.part.plugins")));
		try {
			let t = await (await fetch("/index.html")).text();
			for (let n of R(D).pages) n.path !== "/" && e.push({
				path: `${n.path.slice(1)}/index.html`,
				content: t,
				encoding: "utf-8"
			});
		} catch {}
		e.push({
			path: "sitemap.xml",
			content: Iu(R(D).pages, location.origin),
			encoding: "utf-8"
		}), e.push({
			path: "robots.txt",
			content: Lu(location.origin),
			encoding: "utf-8"
		});
		let o = new Set(e.map((e) => e.path)), s = (t) => {
			o.has(t) || e.push({
				path: t,
				delete: !0
			});
		};
		for (let e of R(de).pages) {
			let t = R(D).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && s(`${e.path.slice(1)}/index.html`) : (s(e.file), e.path !== "/" && s(`${e.path.slice(1)}/index.html`));
		}
		let c = await Ho(e);
		if (!c.ok) {
			w(J("status.publishAborted"), "error");
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
			t ? Bo = t : Vo(), Ex(E.data), Dx(R(D));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) dt.add(e);
			if (A(de, JSON.parse(JSON.stringify(R(D))), !0), at = ha("urd-draft-site", () => R(de), _e), st(), of) {
				let e = JSON.parse(JSON.stringify(of.data));
				of = ha("urd-draft-plugins", () => e, _e), kf();
			}
			if (ad) {
				for (let e of Object.values(od)) for (let t of e.data.entries) Sx(t, []);
				let e = JSON.parse(JSON.stringify(ad.data));
				ad = ha("urd-draft-collections", () => e, _e, "urd-draft-samlinger"), sd = {};
				for (let e of R(ld)) {
					if (!od[e]) continue;
					let t = JSON.parse(JSON.stringify(od[e].data));
					sd[e] = t, od[e] = ha(`urd-draft-collection-${e}`, () => t, _e, `urd-draft-samling-${e}`);
				}
				Pd();
			}
			if (bd) {
				for (let e of Object.values(xd)) {
					e.data?.section && Tx(e.data.section, []);
					for (let t of e.data?.blocks ?? []) wx(t, []);
					for (let t of e.data?.page?.sections ?? []) Tx(t, []);
				}
				let e = JSON.parse(JSON.stringify(bd.data));
				bd = ha("urd-draft-templates", () => e, _e, "urd-draft-maler"), Sd = {};
				for (let e of R(Td)) {
					if (!xd[e]) continue;
					let t = JSON.parse(JSON.stringify(xd[e].data));
					Sd[e] = t, xd[e] = ha(`urd-draft-template-${e}`, () => t, _e, `urd-draft-mal-${e}`);
				}
				Dd();
			}
			A(xe, {
				snap: !0,
				...R(D).grid
			}, !0);
			let i = JSON.parse(JSON.stringify(E.data));
			E = ha(`urd-draft-${R(fe)}`, () => i, _e), dt.has(R(fe)) && ve(`urd-draft-${R(fe)}`, JSON.stringify(i)), pt(), w(J("status.published"), "info"), cs(e);
		} else if (u?.status === 401) {
			let e = await u.json().catch(() => null);
			w(e?.code === "loginExpired" ? J("status.loginExpired") : J("status.loginRequired", { reason: ra(e) ?? J("status.unknownReason") }), "error"), await zo();
		} else u?.status === 403 ? w(ra(await u.json().catch(() => null)) ?? J("status.noPublishAccess"), "error") : u?.status === 409 ? w(J("status.publishRace"), "error") : w(u ? ra(await u.json().catch(() => null)) ?? J("status.publishFailed") : J("status.publishUnavailable"), "error");
	}
	Ot();
	var Px = Nb();
	Dr("keydown", on, Dt), Dr("pointerdown", on, Et);
	var Fx = N(Px), Ix = M(Fx), Lx = (e) => {
		var t = G_(), n = M(t);
		W(n, () => C.pencil);
		var r = F(n);
		T(t), I((e, n) => {
			q(t, "title", e), H(r, ` ${n ?? ""}`);
		}, [() => J("tip.backToEdit"), () => J("ui.edit")]), z("click", t, Lb), V(e, t);
	};
	U(Ix, (e) => {
		R(Se) || e(Lx);
	});
	var Rx = F(Ix, 2);
	let zx;
	var Bx = M(Rx), Vx = M(Bx), Hx = (e) => {
		var t = nv(), n = N(t), r = P(n, !0), i = F(n, 2), a = M(i), o = (e) => {
			var t = J_(), n = M(t);
			let r;
			var i = M(n);
			W(i, () => C[`device_${R(Ne)}`]), W(F(i), () => C.caret), T(n);
			var a = F(n, 2), o = (e) => {
				var t = q_();
				Qr(t, 21, () => R(Ae), (e) => e.id, (e, t) => {
					var n = K_();
					let r;
					var i = M(n);
					W(i, () => C[`device_${R(t).id}`]);
					var a = F(i);
					T(n), I((e, i) => {
						r = xi(n, 1, "ghost svelte-1n46o8q", null, r, { active: R(Ne) === R(t).id }), q(n, "title", e), H(a, ` ${i ?? ""}`);
					}, [() => Me(R(t)), () => J(`lbl.device.${R(t).id}`)]), z("click", n, () => {
						A(Ne, R(t).id, !0), A(cc, null);
					}), V(e, n);
				}), T(t), V(e, t);
			};
			U(a, (e) => {
				R(cc) === "device" && e(o);
			}), T(t), I((e) => {
				r = xi(n, 1, "ghost svelte-1n46o8q", null, r, { active: R(cc) === "device" }), q(n, "title", e);
			}, [() => J("lbl.group.device")]), z("click", n, () => A(cc, R(cc) === "device" ? null : "device", !0)), V(e, t);
		}, s = (e) => {
			var t = X_(), n = N(t), r = P(n, !0), i = F(n, 2);
			Qr(i, 21, () => R(Ae), (e) => e.id, (e, t) => {
				var n = Y_();
				let r;
				W(n, () => C[`device_${R(t).id}`], !0), T(n), I((e) => {
					r = xi(n, 1, "ghost svelte-1n46o8q", null, r, { active: R(Ne) === R(t).id }), q(n, "title", e);
				}, [() => Me(R(t))]), z("click", n, () => A(Ne, R(t).id, !0)), V(e, n);
			}), T(i), I((e) => H(r, e), [() => J("lbl.group.device")]), V(e, t);
		};
		U(a, (e) => {
			fc.device ? e(o) : e(s, -1);
		});
		var c = F(a, 2), l = (e) => {
			var t = Q_(), n = M(t);
			let r;
			var i = M(n), a = P(i);
			W(F(i), () => C.caret), T(n);
			var o = F(n, 2), s = (e) => {
				var t = Z_(), n = M(t), r = M(n);
				W(r, () => C.minus, !0), T(r);
				var i = F(r, 2), a = P(i), o = F(i, 2);
				W(o, () => C.plus, !0), T(o), T(n);
				var s = F(n, 2);
				let c;
				var l = M(s);
				W(l, () => C.fit);
				var u = F(l);
				T(s), T(t), I((e, t, n, l, d, f) => {
					q(r, "title", e), q(i, "title", t), H(a, `${n ?? ""}%`), q(o, "title", l), c = xi(s, 1, "ghost svelte-1n46o8q", null, c, { active: R(ze) === "fit" }), q(s, "title", d), H(u, ` ${f ?? ""}`);
				}, [
					() => J("tip.zoomOut"),
					() => J("tip.zoomCurrent"),
					() => Math.round(R(We) * 100),
					() => J("tip.zoomIn"),
					() => J("tip.zoomFit"),
					() => J("lbl.zoom.fit")
				]), z("click", r, () => Ge(-1)), z("click", o, () => Ge(1)), z("click", s, () => A(ze, "fit")), V(e, t);
			};
			U(o, (e) => {
				R(cc) === "zoom" && e(s);
			}), T(t), I((e, t) => {
				r = xi(n, 1, "ghost svelte-1n46o8q", null, r, { active: R(cc) === "zoom" }), q(n, "title", e), H(a, `${t ?? ""}%`);
			}, [() => J("lbl.group.zoom"), () => Math.round(R(We) * 100)]), z("click", n, () => A(cc, R(cc) === "zoom" ? null : "zoom", !0)), V(e, t);
		}, u = (e) => {
			var t = $_(), n = N(t), r = P(n, !0), i = F(n, 2), a = M(i);
			W(a, () => C.minus, !0), T(a);
			var o = F(a, 2), s = P(o), c = F(o, 2);
			W(c, () => C.plus, !0), T(c);
			var l = F(c, 2);
			let u;
			W(l, () => C.fit, !0), T(l), T(i), I((e, t, n, i, d, f) => {
				H(r, e), q(a, "title", t), q(o, "title", n), H(s, `${i ?? ""}%`), q(c, "title", d), u = xi(l, 1, "ghost svelte-1n46o8q", null, u, { active: R(ze) === "fit" }), q(l, "title", f);
			}, [
				() => J("lbl.group.zoom"),
				() => J("tip.zoomOut"),
				() => J("tip.zoomCurrent"),
				() => Math.round(R(We) * 100),
				() => J("tip.zoomIn"),
				() => J("tip.zoomFit")
			]), z("click", a, () => Ge(-1)), z("click", c, () => Ge(1)), z("click", l, () => A(ze, "fit")), V(e, t);
		};
		U(c, (e) => {
			fc.zoom ? e(l) : e(u, -1);
		});
		var d = F(c, 2), f = (e) => {
			var t = J_(), n = M(t);
			let r;
			var i = M(n);
			W(i, () => C.gridToggle), W(F(i), () => C.caret), T(n);
			var a = F(n, 2), o = (e) => {
				var t = ev(), n = M(t);
				let r;
				var i = M(n);
				W(i, () => C.gridToggle);
				var a = F(i);
				T(n);
				var o = F(n, 2);
				let s;
				var c = M(o);
				W(c, () => C.guides);
				var l = F(c);
				T(o), T(t), I((e, t, i, c) => {
					r = xi(n, 1, "ghost svelte-1n46o8q", null, r, { active: R(hc) }), q(n, "title", e), H(a, ` ${t ?? ""}`), s = xi(o, 1, "ghost svelte-1n46o8q", null, s, { active: R(nc) }), q(o, "title", i), H(l, ` ${c ?? ""}`);
				}, [
					() => J("tip.gridToggle"),
					() => J("lbl.view.grid"),
					() => J("tip.guides"),
					() => J("lbl.view.guides")
				]), z("click", n, gc), z("click", o, mc), V(e, t);
			};
			U(a, (e) => {
				R(cc) === "view" && e(o);
			}), T(t), I((e) => {
				r = xi(n, 1, "ghost svelte-1n46o8q", null, r, { active: R(cc) === "view" || R(hc) || R(nc) }), q(n, "title", e);
			}, [() => J("lbl.group.view")]), z("click", n, () => A(cc, R(cc) === "view" ? null : "view", !0)), V(e, t);
		}, p = (e) => {
			var t = tv(), n = N(t), r = P(n, !0), i = F(n, 2), a = M(i);
			let o;
			W(a, () => C.gridToggle, !0), T(a);
			var s = F(a, 2);
			let c;
			W(s, () => C.guides, !0), T(s), T(i), I((e, t, n) => {
				H(r, e), o = xi(a, 1, "ghost svelte-1n46o8q", null, o, { active: R(hc) }), q(a, "title", t), c = xi(s, 1, "ghost svelte-1n46o8q", null, c, { active: R(nc) }), q(s, "title", n);
			}, [
				() => J("lbl.group.view"),
				() => J("tip.gridToggle"),
				() => J("tip.guides")
			]), z("click", a, gc), z("click", s, mc), V(e, t);
		};
		U(d, (e) => {
			fc.view ? e(f) : e(p, -1);
		}), T(i), Ri(i, (e) => A(uc, e), () => R(uc)), I((e, t) => {
			q(n, "title", e), H(r, t);
		}, [() => J("tip.switchPage"), () => ft()?.title ?? ""]), z("click", n, () => nn("pages")), V(e, t);
	};
	U(Vx, (e) => {
		R(de) && e(Hx);
	});
	var Ux = F(Vx, 2), Wx = (e) => {
		var t = rv(), n = M(t);
		W(n, () => C.phone);
		var r = F(n, 2), i = P(r, !0), a = P(F(r, 2), !0);
		T(t), I((e, n) => {
			q(t, "title", e), H(i, n), H(a, R(Ze));
		}, [() => J("tip.attention"), () => J(R(Ze) === 1 ? "ui.attentionOne" : "ui.attentionMany", { n: R(Ze) })]), z("click", t, tt), V(e, t);
	};
	U(Ux, (e) => {
		R(Ze) > 0 && e(Wx);
	}), T(Bx);
	var Gx = F(Bx, 2), Kx = M(Gx), qx = (e) => {
		var t = av(), n = M(t), r = P(M(n), !0);
		je(2), T(n);
		var i = F(n, 2), a = M(i);
		let o;
		var s = M(a);
		W(s, () => C.restore);
		var c = P(F(s), !0);
		T(a);
		var l = F(a, 2), u = (e) => {
			var t = iv(), n = M(t);
			W(n, () => C.restore);
			var r = F(n);
			T(t), I((e, n) => {
				q(t, "title", e), H(r, ` ${n ?? ""}`);
			}, [() => J("tip.discardArmed"), () => J("ui.discardConfirm")]), z("click", t, jx), V(e, t);
		};
		U(l, (e) => {
			R(Ox) && e(u);
		}), T(i), Ri(i, (e) => A(kx, e), () => R(kx)), T(t), I((e, t, i, s, l) => {
			q(n, "title", e), q(n, "aria-label", t), H(r, i), o = xi(a, 1, "discard-dot svelte-1n46o8q", null, o, { armed: R(Ox) }), q(a, "title", s), H(c, l);
		}, [
			() => J("ui.unpublished"),
			() => J("ui.unpublished"),
			() => J("ui.unpublished"),
			() => R(Ox) ? J("tip.discardArmed") : J("tip.discard"),
			() => J("ui.discard")
		]), z("click", a, Ax), pi(2, t, () => ma, () => ({
			x: 24,
			duration: Ln ? 0 : 150
		})), V(e, t);
	};
	U(Kx, (e) => {
		R(pe) && e(qx);
	}), T(Gx);
	var Jx = F(Gx, 2), Yx = M(Jx), Xx = (e) => {
		var t = lv(), n = N(t), r = M(n), i = (e) => {
			var t = ov(), n = N(t);
			W(n, () => C.eye);
			var r = P(F(n, 2), !0);
			I((e) => H(r, e), [() => J("ui.cleanView")]), V(e, t);
		}, a = (e) => {
			var t = ov(), n = N(t);
			W(n, () => C.pencil);
			var r = P(F(n, 2), !0);
			I((e) => H(r, e), [() => J("ui.edit")]), V(e, t);
		};
		U(r, (e) => {
			R(Se) ? e(i) : e(a, -1);
		}), T(n);
		var o = F(n, 2), s = (e) => {
			var t = sv(), n = M(t), r = (e) => {
				var t = Lr();
				W(N(t), () => C.warn), V(e, t);
			};
			U(n, (e) => {
				R(be).allowed || e(r);
			});
			var i = F(n, 1, !0);
			T(t), I((e) => {
				q(t, "title", e), H(i, R(be).login);
			}, [() => R(be).allowed ? J("tip.hasPublishAccess") : J("tip.noPublishAccess")]), V(e, t);
		}, c = (e) => {
			var t = cv(), n = P(t, !0);
			I((e) => H(n, e), [() => J("ui.loginGitHub")]), V(e, t);
		};
		U(o, (e) => {
			R(be)?.loggedIn ? e(s) : R(be) && e(c, 1);
		});
		var l = F(o, 2), u = M(l);
		W(u, () => C.external);
		var d = P(F(u, 2), !0);
		T(l);
		var f = F(l, 2), p = P(f, !0);
		I((e, t, r, i, a) => {
			q(n, "title", e), q(l, "href", t), q(l, "title", r), H(d, i), f.disabled = !R(pe), H(p, a);
		}, [
			() => R(Se) ? J("tip.chromeHide") : J("tip.chromeShow"),
			() => ft()?.path ?? "/",
			() => J("ui.viewSite"),
			() => J("ui.viewSite"),
			() => J("ui.publish")
		]), z("click", n, Lb), z("click", f, Nx), V(e, t);
	};
	U(Yx, (e) => {
		R(de) && e(Xx);
	}), T(Jx), T(Rx);
	var Zx = F(Rx, 2), Qx = (e) => {
		var t = Eb(), n = M(t);
		let r;
		var i = M(n);
		Qr(i, 17, () => Gt, Jr, (e, t, n) => {
			var r = dv(), i = N(r), a = P(i, !0);
			Qr(F(i, 2), 16, () => R(t), (e) => e, (e, t) => {
				var n = uv();
				let r;
				var i = P(n, !0);
				I(() => {
					r = xi(n, 1, "svelte-1n46o8q", null, r, { active: R(Wt) === t }), H(i, qt[t]);
				}), z("click", n, () => nn(t)), V(e, n);
			}), I((e) => H(a, e), [() => J(Kt[n])]), V(e, r);
		});
		var s = F(i, 2), c = F(M(s), 2);
		let l;
		W(c, () => C.gear, !0), T(c);
		var d = F(c, 2), h = (e) => {
			var t = mv(), n = M(t), r = P(n, !0), i = F(n, 2), a = M(i);
			Y(F(a), {
				get value() {
					return R(ce);
				},
				get options() {
					return oe;
				},
				onchange: (e) => A(ce, e, !0)
			}), T(i);
			var o = F(i, 2), s = M(o), c = F(s);
			{
				let e = /* @__PURE__ */ O(() => [["auto", J("lang.auto")], ...Qt()]);
				Y(c, {
					get value() {
						return en;
					},
					get options() {
						return R(e);
					},
					onchange: tn
				});
			}
			T(o);
			var l = F(o, 2), u = M(l), d = F(u);
			{
				let e = /* @__PURE__ */ O(() => [["strip", J("settings.layoutPickerStrip")], ["menu", J("settings.layoutPickerMenu")]]);
				Y(d, {
					get value() {
						return R(ic);
					},
					get options() {
						return R(e);
					},
					onchange: ac
				});
			}
			T(l);
			var f = F(l, 2), p = M(f), m = F(p);
			{
				let e = /* @__PURE__ */ O(() => [["wide", J("settings.menuWide")], ["narrow", J("settings.menuNarrow")]]);
				Y(m, {
					get value() {
						return R(fn);
					},
					get options() {
						return R(e);
					},
					onchange: mn
				});
			}
			T(f);
			var h = F(f, 2), g = M(h), _ = F(g);
			{
				let e = /* @__PURE__ */ O(() => [["remember", J("settings.panelsRemember")], ["reset", J("settings.panelsReset")]]);
				Y(_, {
					get value() {
						return R(Ht);
					},
					get options() {
						return R(e);
					},
					onchange: Ut
				});
			}
			T(h);
			var v = F(h, 2), y = P(v, !0), b = F(v, 2), x = M(b);
			let S;
			var ee = P(x, !0), te = F(x, 2);
			let ne;
			var re = P(te, !0);
			T(b);
			var ie = F(b, 2), ae = (e) => {
				var t = fv(), n = M(t), r = P(n, !0), i = F(n, 2);
				G(i);
				var a = F(i, 2), o = P(a, !0), s = F(a, 2);
				G(s), T(t), I((e, t, n, a) => {
					H(r, e), q(i, "min", 640), q(i, "max", ys), q(i, "title", t), K(i, R(Ee).width), H(o, n), q(s, "max", bs), q(s, "title", a), K(s, R(Ee).height || "");
				}, [
					() => J("lbl.screen.w"),
					() => J("tip.screen.width", {
						min: 640,
						max: ys
					}),
					() => J("lbl.screen.h"),
					() => J("tip.screen.height", {
						min: 480,
						max: bs
					})
				]), z("change", i, (e) => {
					De({ width: Number(e.target.value) }), e.target.value = R(Ee).width;
				}), z("change", s, (e) => {
					De({ height: Number(e.target.value) }), e.target.value = R(Ee).height || "";
				}), V(e, t);
			};
			U(ie, (e) => {
				R(Ee).mode === "custom" && e(ae);
			});
			var C = F(ie, 2), se = (e) => {
				var t = pv(), n = N(t), r = P(n, !0), i = F(n, 2), a = M(i), o = F(a);
				G(o), T(i), I((e, t, s, c, l) => {
					q(n, "title", e), H(r, t), q(i, "title", s), H(a, `${c ?? ""} `), q(o, "placeholder", l), K(o, R(D).analytics?.token ?? "");
				}, [
					() => J("tip.analytics"),
					() => J("settings.analytics"),
					() => J("tip.analytics"),
					() => J("lbl.analyticsToken"),
					() => J("ph.analyticsToken")
				]), z("change", o, (e) => cl(e.target.value)), V(e, t);
			};
			U(C, (e) => {
				R(D) && e(se);
			}), T(t), I((e, t, n, c, d, m, _, ie, ae, C, oe, se, ce, le, ue, de) => {
				H(r, e), q(i, "title", t), H(a, `${n ?? ""} `), q(o, "title", c), H(s, `${d ?? ""} `), q(l, "title", m), H(u, `${_ ?? ""} `), q(f, "title", ie), H(p, `${ae ?? ""} `), q(h, "title", C), H(g, `${oe ?? ""} `), q(v, "title", se), H(y, ce), q(b, "title", le), S = xi(x, 1, "svelte-1n46o8q", null, S, { on: R(Ee).mode === "own" }), H(ee, ue), ne = xi(te, 1, "svelte-1n46o8q", null, ne, { on: R(Ee).mode === "custom" }), H(re, de);
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
			]), z("click", x, () => De({ mode: "own" })), z("click", te, () => De({ mode: "custom" })), V(e, t);
		};
		U(d, (e) => {
			R(rc) && e(h);
		}), T(s), Ri(s, (e) => A(oc, e), () => R(oc)), T(n);
		var _ = F(n, 2), b = (e) => {
			var t = Tb();
			let n;
			var r = M(t), i = M(r), s = P(i, !0), c = F(i, 2), l = (e) => {
				var t = Mh();
				let n;
				W(t, () => C.foldToggle, !0), T(t), I((e, r) => {
					n = xi(t, 1, "fold-all fold-toggle svelte-1n46o8q", null, n, { collapse: R(bm) }), q(t, "title", e), q(t, "aria-label", r);
				}, [() => J(R(bm) ? "ui.collapseAll" : "ui.expandAll"), () => J(R(bm) ? "ui.collapseAll" : "ui.expandAll")]), z("click", t, Cm), V(e, t);
			};
			U(c, (e) => {
				R(ym) && e(l);
			}), T(r);
			var d = F(r, 2), h = (e) => {
				var t = Tv(), n = M(t);
				Qr(n, 17, () => R(D).pages, (e) => e.id, (e, t) => {
					var n = bv();
					let r;
					var i = M(n);
					G(i);
					var a = F(i, 2), o = (e) => {
						var t = hv();
						I((e) => q(t, "title", e), [() => J("tip.pages.homeLocked")]), V(e, t);
					}, s = (e) => {
						var n = gv();
						G(n), I((e, t) => {
							K(n, e), q(n, "title", t);
						}, [() => R(t).path.slice(1), () => J("tip.pages.slug")]), z("change", n, (e) => Qc(R(t), e.target.value)), V(e, n);
					};
					U(a, (e) => {
						R(t).path === "/" ? e(o) : e(s, -1);
					});
					var c = F(a, 2), l = (e) => {
						var t = _v();
						W(t, () => C.warn, !0), T(t), I((e) => q(t, "title", e), [() => J("tip.pages.missingDescription")]), V(e, t);
					};
					U(c, (e) => {
						R(qc)[R(t).id] && e(l);
					});
					var u = F(c, 2), d = M(u);
					W(d, () => C.right, !0), T(d);
					var f = F(d, 2), p = M(f);
					W(p, () => C.kebab, !0), T(p);
					var m = F(p, 2), h = (e) => {
						var n = yv(), r = M(n), i = M(r);
						W(i, () => C.bookmark);
						var a = F(i);
						T(r);
						var o = F(r, 2), s = (e) => {
							var n = vv(), r = M(n);
							W(r, () => C.cross);
							var i = F(r);
							T(n), I((e, t) => {
								q(n, "title", e), H(i, ` ${t ?? ""}`);
							}, [() => J("tip.pages.delete"), () => J("ui.deletePage")]), z("click", n, () => {
								A(xc, null), $c(R(t));
							}), V(e, n);
						};
						U(o, (e) => {
							R(t).path !== "/" && e(s);
						}), T(n), I((e) => H(a, ` ${e ?? ""}`), [() => J("ui.savePageTemplate")]), z("click", r, () => Lc(R(t))), V(e, n);
					};
					U(m, (e) => {
						R(xc) === R(t).id && e(h);
					}), T(f), T(u), T(n), I((e, a, o) => {
						r = xi(n, 1, "page-row svelte-1n46o8q", null, r, { current: R(t).id === R(fe) }), K(i, R(t).title), q(i, "title", e), q(d, "title", a), d.disabled = R(t).id === R(fe), q(p, "title", o);
					}, [
						() => J("tip.pages.title"),
						() => J("tip.pages.open"),
						() => J("tip.pages.menu")
					]), z("change", i, (e) => Rc(R(t), e.target.value)), z("click", d, () => Ys(R(t).id)), z("click", p, () => A(xc, R(xc) === R(t).id ? null : R(t).id, !0)), V(e, n);
				});
				var r = F(n, 2), i = M(r), a = P(i, !0), o = F(i, 2), s = M(o), c = M(s), l = F(c);
				ut(l), T(s);
				var u = F(s, 2), d = M(u), f = F(d);
				G(f), T(u);
				var p = F(u, 2), m = M(p), h = F(m);
				ut(h), T(p);
				var g = F(p, 2), _ = M(g), v = F(_), y = (e) => {
					var t = xv();
					I((e) => {
						q(t, "src", R(zc).ogImage), q(t, "alt", e);
					}, [() => J("lbl.ogImage")]), V(e, t);
				};
				U(v, (e) => {
					R(zc).ogImage && e(y);
				}), T(g);
				var b = F(g, 2), x = M(b), S = M(x), ee = F(S);
				T(x);
				var te = F(x, 2), ne = (e) => {
					var t = nh();
					W(t, () => C.cross, !0), T(t), I((e) => q(t, "title", e), [() => J("tip.seo.removeOgImage")]), z("click", t, () => Uc("ogImage", "")), V(e, t);
				};
				U(te, (e) => {
					R(zc).ogImage && e(ne);
				}), T(b);
				var re = F(b, 2), ie = M(re);
				G(ie);
				var ae = F(ie);
				T(re), T(o), T(r);
				var oe = F(r, 4);
				G(oe);
				var se = F(oe, 2), ce = P(se, !0), le = F(se, 2), ue = P(le, !0), de = F(le, 2), pe = M(de);
				let me;
				var he = M(pe), ge = M(he);
				W(ge, () => tf({ sections: [] }), !0), T(ge);
				var w = P(F(ge, 2), !0);
				T(he), T(pe), Qr(F(pe, 2), 17, () => rf, (e) => e.id, (e, t) => {
					var n = Sv();
					let r;
					var i = M(n), a = M(i);
					W(a, () => Z[R(t).id], !0), T(a);
					var o = P(F(a, 2), !0);
					T(i), T(n), I((e, a) => {
						r = xi(n, 1, "page-template-card svelte-1n46o8q", null, r, { picked: R(yc) === `preset:${R(t).id}` }), q(i, "title", e), H(o, a);
					}, [() => J("tip.pages.templatePick", { name: J(R(t).labelKey) }), () => J(R(t).labelKey)]), z("click", i, () => A(yc, R(yc) === `preset:${R(t).id}` ? null : `preset:${R(t).id}`, !0)), V(e, n);
				}), T(de);
				var _e = F(de, 2), ve = (e) => {
					var t = wv(), n = N(t), r = P(n, !0), i = F(n, 2);
					Qr(i, 20, () => R(Td).filter((e) => xd[e]?.data?.mal?.kind === "page"), (e) => e, (e, t) => {
						var n = Cv();
						let r;
						var i = M(n), a = M(i);
						W(a, () => tf(xd[t].data.page), !0), T(a);
						var o = P(F(a, 2), !0);
						T(i);
						var s = F(i, 2);
						W(s, () => C.cross, !0), T(s), T(n), I((e, a) => {
							r = xi(n, 1, "page-template-card svelte-1n46o8q", null, r, { picked: R(yc) === t }), q(i, "title", e), H(o, xd[t].data.mal.name), q(s, "title", a);
						}, [() => J("tip.pages.templatePick", { name: xd[t].data.mal.name }), () => J("canvas.deleteTemplate")]), z("click", i, () => A(yc, R(yc) === t ? null : t, !0)), z("click", s, () => Md({ id: t })), V(e, n);
					}), T(i), I((e) => {
						H(r, e), Ci(i, R(bc));
					}, [() => J("canvas.tabMyTemplates")]), V(e, t);
				}, ye = /* @__PURE__ */ O(() => R(Td).some((e) => xd[e]?.data?.mal?.kind === "page"));
				U(_e, (e) => {
					R(ye) && e(ve);
				}), T(t), I((e, t, n, r, i, o, v, y, b, ee, te, ne, C, le, fe, ge, _e, ve, ye, be, xe, Se) => {
					H(a, e), q(s, "title", t), H(c, `${n ?? ""} `), K(l, R(zc).description), q(u, "title", r), H(d, `${i ?? ""} `), K(f, R(zc).ogTitle), q(f, "placeholder", o), q(p, "title", v), H(m, `${y ?? ""} `), K(h, R(zc).ogDescription), q(h, "placeholder", R(zc).description), q(g, "title", b), H(_, `${ee ?? ""} `), q(x, "title", te), H(S, `${ne ?? ""} `), q(re, "title", C), Oi(ie, le), H(ae, ` ${fe ?? ""}`), q(oe, "placeholder", ge), q(se, "title", _e), se.disabled = ve, H(ce, ye), H(ue, be), Ci(de, R(bc)), me = xi(pe, 1, "page-template-card svelte-1n46o8q", null, me, { picked: R(yc) === null }), q(he, "title", xe), H(w, Se);
				}, [
					() => J("ui.seoGroup", { page: R(D).pages.find((e) => e.id === R(fe))?.title ?? "" }),
					() => J("tip.seo.description"),
					() => J("lbl.seoDescription"),
					() => J("tip.seo.ogTitle"),
					() => J("lbl.ogTitle"),
					() => R(D).pages.find((e) => e.id === R(fe))?.title ?? "",
					() => J("tip.seo.ogDescription"),
					() => J("lbl.ogDescription"),
					() => J("tip.seo.ogImage"),
					() => J("lbl.ogImage"),
					() => J("tip.seo.ogImage"),
					() => R(zc).ogImage ? J("ui.changeImage") : J("ui.chooseImage"),
					() => J("tip.seo.hideFromSearch"),
					() => R(D).pages.find((e) => e.id === R(fe))?.noindex === !0,
					() => J("lbl.hideFromSearch"),
					() => J("ph.newPageName"),
					() => J("hint.pages.autoMenu"),
					() => !R(vc).trim(),
					() => J("ui.createPage"),
					() => J("canvas.tabPresets"),
					() => J("tip.pages.blankPick"),
					() => J("ui.blankPage")
				]), z("change", l, (e) => Uc("description", e.target.value)), z("change", f, (e) => Uc("ogTitle", e.target.value)), z("change", h, (e) => Uc("ogDescription", e.target.value)), z("change", ee, Yc), z("change", ie, (e) => Kc(e.target.checked)), z("keydown", oe, (e) => e.key === "Enter" && wc()), Mi(oe, () => R(vc), (e) => A(vc, e)), z("click", se, wc), z("click", he, () => A(yc, null)), V(e, t);
			}, _ = (e) => {
				var t = dy(), n = M(t), r = M(n), i = P(r, !0), o = F(r, 2), s = M(o);
				{
					let e = /* @__PURE__ */ O(() => J("common.type")), t = /* @__PURE__ */ O(() => R(D).nav.logo?.type ?? "text"), n = /* @__PURE__ */ O(() => [
						["text", J("blocks.text")],
						["image", J("blocks.image")],
						["both", J("opt.logo.both")]
					]);
					lc(s, {
						get label() {
							return R(e);
						},
						get value() {
							return R(t);
						},
						get options() {
							return R(n);
						},
						onchange: (e) => tl(e)
					});
				}
				var c = F(s, 2), l = (e) => {
					var t = Ev(), n = N(t);
					G(n);
					var r = F(n, 2), i = M(r);
					{
						let e = /* @__PURE__ */ O(() => J("tip.nav.logoFont")), t = /* @__PURE__ */ O(() => R(D).nav.logo?.font ?? ""), n = /* @__PURE__ */ O(() => [["", J("common.inherit")], ...Bm.map(([e, t]) => [t, J(e)])]);
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
							onchange: (e) => el({ font: e || void 0 })
						});
					}
					var a = F(i, 2);
					G(a);
					var o = F(a, 2);
					let s;
					var c = P(M(o), !0);
					T(o);
					var l = F(o, 2);
					let u;
					var d = P(M(l), !0);
					T(l), T(r), I((e, t, r, i, f, p, m) => {
						K(n, R(D).nav.logo?.value ?? ""), q(n, "placeholder", e), q(a, "title", t), K(a, R(D).nav.logo?.textSize ?? ""), s = xi(o, 1, "tbtn svelte-1n46o8q", null, s, { active: R(D).nav.logo?.bold !== !1 }), q(o, "title", r), H(c, i), u = xi(l, 1, "tbtn svelte-1n46o8q", null, u, { active: f }), q(l, "title", p), H(d, m);
					}, [
						() => J("ph.nav.logoName"),
						() => J("tip.nav.textSize"),
						() => J("format.bold"),
						() => J("format.boldLetter"),
						() => !!R(D).nav.logo?.italic,
						() => J("format.italic"),
						() => J("format.italicLetter")
					]), z("input", n, (e) => el({ value: e.target.value })), z("change", a, (e) => el({ textSize: e.target.value ? Number(e.target.value) : void 0 })), z("click", o, () => el({ bold: R(D).nav.logo?.bold === !1 })), z("click", l, () => el({ italic: !R(D).nav.logo?.italic })), V(e, t);
				};
				U(c, (e) => {
					(R(D).nav.logo?.type ?? "text") !== "image" && e(l);
				});
				var u = F(c, 2), d = (e) => {
					let t = /* @__PURE__ */ O(() => R(D).nav.logo?.type === "image" ? R(D).nav.logo?.value : R(D).nav.logo?.image);
					var n = kv(), r = N(n), i = M(r), a = M(i), o = (e) => {
						var n = Dv();
						I(() => q(n, "src", R(t))), V(e, n);
					};
					U(a, (e) => {
						R(t) && e(o);
					}), T(i);
					var s = F(i, 2), c = M(s), l = M(c), u = F(l);
					T(c);
					var d = F(c, 2), f = (e) => {
						var n = Ov(), r = P(n, !0);
						I((e) => H(r, e), [() => R(t).split("/").pop()]), V(e, n);
					};
					U(d, (e) => {
						R(t) && e(f);
					}), T(s), T(r);
					var p = F(r, 2), m = M(p), h = M(m), g = P(h, !0), _ = F(h, 2);
					G(_), T(m);
					var v = F(m, 2), y = M(v), b = P(y, !0), x = F(y, 2);
					G(x), T(v);
					var S = F(v, 2), ee = M(S), te = P(ee, !0), ne = F(ee, 2);
					G(ne), T(S), T(p), I((e, t, n, r, i, a, o, s, u) => {
						q(c, "title", e), H(l, `${t ?? ""} `), q(m, "title", n), H(g, r), K(_, R(D).nav.logo?.size ?? 32), q(v, "title", i), H(b, a), q(x, "min", Gs.min), q(x, "max", Gs.max), q(x, "placeholder", o), K(x, R(D).nav.logo?.mobileSize ?? ""), q(S, "title", s), H(te, u), K(ne, R(D).nav.logo?.radius ?? 0);
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
					]), z("change", u, Q), z("change", _, (e) => el({ size: Number(e.target.value) })), z("change", x, (e) => {
						let t = e.target.value;
						el({ mobileSize: t === "" ? void 0 : Xs(t, Gs, void 0) }), e.target.value = R(D).nav.logo?.mobileSize ?? "";
					}), z("change", ne, (e) => el({ radius: Number(e.target.value) })), V(e, n);
				};
				U(u, (e) => {
					(R(D).nav.logo?.type ?? "text") !== "text" && e(d);
				});
				var h = F(u, 2), _ = (e) => {
					{
						let t = /* @__PURE__ */ O(() => J("lbl.order")), n = /* @__PURE__ */ O(() => R(D).nav.logo?.order ?? "image-first"), r = /* @__PURE__ */ O(() => [["image-first", J("opt.logo.imageFirst")], ["text-first", J("opt.logo.textFirst")]]);
						lc(e, {
							get label() {
								return R(t);
							},
							get value() {
								return R(n);
							},
							get options() {
								return R(r);
							},
							onchange: (e) => el({ order: e })
						});
					}
				};
				U(h, (e) => {
					R(D).nav.logo?.type === "both" && e(_);
				}), T(o), T(n);
				var b = F(n, 2), x = M(b), S = P(x, !0), ee = F(x, 2), te = M(ee), ie = M(te), ae = P(ie, !0), oe = F(ie, 2), se = M(oe), ce = M(se), le = P(ce, !0), ue = F(ce, 2);
				Qr(ue, 21, () => [
					["bar", J("opt.navVariant.bar")],
					["floating", J("opt.navVariant.floating")],
					["floating-square", J("opt.navVariant.floatingSquare")],
					["floating-tab", J("opt.navVariant.floatingTab")],
					["side-left", J("opt.navVariant.sideLeft")],
					["side-right", J("opt.navVariant.sideRight")]
				], ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ O(() => g(R(t), 2));
					let r = () => R(n)[0], i = () => R(n)[1];
					var a = Av();
					let o;
					var s = M(a);
					W(s, () => p[r()]);
					var c = P(F(s), !0);
					T(a), I(() => {
						o = xi(a, 1, "tile svelte-1n46o8q", null, o, { on: (R(D).nav.variant ?? "bar") === r() }), q(a, "aria-pressed", (R(D).nav.variant ?? "bar") === r()), H(c, i());
					}), z("click", a, () => td(r())), V(e, a);
				}), T(ue), T(se);
				var de = F(se, 2), fe = (e) => {
					var t = Mv(), n = N(t);
					{
						let e = /* @__PURE__ */ O(() => J("lbl.navPillWidth")), t = /* @__PURE__ */ O(() => J("tip.nav.pillWidth")), r = /* @__PURE__ */ O(() => R(D).nav.style?.pillWidth === "content" ? "content" : "custom"), i = /* @__PURE__ */ O(() => [["content", J("opt.pillWidth.content")], ["custom", J("opt.pillWidth.custom")]]);
						lc(n, {
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
							onchange: (e) => au("pillWidth", e === "content" ? "content" : void 0)
						});
					}
					var r = F(n, 2), i = (e) => {
						var t = jv(), n = M(t), r = P(n, !0), i = F(n, 2);
						G(i), T(t), I((e, n) => {
							q(t, "title", e), H(r, n), q(i, "min", zs.min), q(i, "max", zs.max), q(i, "step", zs.step), K(i, typeof R(D).nav.style?.pillWidth == "number" ? R(D).nav.style.pillWidth : "");
						}, [() => J("tip.nav.pillWidthPx"), () => J("lbl.navPillWidthPx")]), z("change", i, (e) => fu(e, "pillWidth", zs)), V(e, t);
					};
					U(r, (e) => {
						R(D).nav.style?.pillWidth !== "content" && e(i);
					});
					var a = F(r, 2), o = M(a), s = P(o, !0), c = F(o, 2);
					G(c), T(a), I((e, t) => {
						q(a, "title", e), H(s, t), q(c, "min", Us.min), q(c, "max", Us.max), q(c, "step", Us.step), q(c, "placeholder", R(D).nav.variant === "floating-square" ? "0" : ""), K(c, typeof R(D).nav.style?.radius == "number" ? R(D).nav.style.radius : "");
					}, [() => J("tip.nav.radius"), () => J("lbl.navRadius")]), z("change", c, (e) => fu(e, "radius", Us)), V(e, t);
				};
				U(de, (e) => {
					R(su) && e(fe);
				});
				var pe = F(de, 2), me = (e) => {
					{
						let t = /* @__PURE__ */ O(() => J("lbl.navPlacement")), n = /* @__PURE__ */ O(() => R(D).nav.style?.sidePlacement ?? "top"), r = /* @__PURE__ */ O(() => [
							["top", J("opt.place.top")],
							["middle", J("opt.place.middle")],
							["bottom", J("opt.place.bottom")]
						]);
						lc(e, {
							get label() {
								return R(t);
							},
							get value() {
								return R(n);
							},
							get options() {
								return R(r);
							},
							onchange: (e) => au("sidePlacement", e === "top" ? void 0 : e)
						});
					}
				}, he = (e) => {
					{
						let t = /* @__PURE__ */ O(() => J("lbl.navPlacement")), n = /* @__PURE__ */ O(() => J("opt.layout.leftAfterLogo")), r = /* @__PURE__ */ O(() => R(D).nav.layout ?? "right"), i = /* @__PURE__ */ O(() => [
							["left", J("common.left")],
							["center", J("common.center")],
							["right", J("common.right")]
						]);
						lc(e, {
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
							onchange: (e) => eu(e)
						});
					}
				};
				U(pe, (e) => {
					R(ou) ? e(me) : e(he, -1);
				});
				var ge = F(pe, 2), w = (e) => {
					var t = Nv(), n = N(t), r = M(n);
					G(r);
					var i = F(r);
					T(n);
					var a = F(n, 2), o = M(a);
					G(o);
					var s = F(o);
					T(a), I((e, t, c, l) => {
						q(n, "title", e), Oi(r, R(D).nav.style?.glow === !0), H(i, ` ${t ?? ""}`), q(a, "title", c), Oi(o, R(D).nav.style?.topGap !== !1), H(s, ` ${l ?? ""}`);
					}, [
						() => J("tip.nav.glow"),
						() => J("lbl.navGlow"),
						() => J("tip.nav.topGap"),
						() => J("lbl.navTopGap")
					]), z("change", r, (e) => nd(e.target.checked)), z("change", o, (e) => rd(e.target.checked)), V(e, t);
				};
				U(ge, (e) => {
					R(su) && e(w);
				});
				var _e = F(ge, 2), ve = (e) => {
					var t = Nv(), n = N(t), r = M(n);
					G(r);
					var i = F(r);
					T(n);
					var a = F(n, 2), o = M(a);
					G(o);
					var s = F(o);
					T(a), I((e, t, c, l) => {
						q(n, "title", e), Oi(r, R(D).nav.overlay === !0), H(i, ` ${t ?? ""}`), q(a, "title", c), Oi(o, R(D).nav.style?.inset !== !1), H(s, ` ${l ?? ""}`);
					}, [
						() => J("tip.nav.overlay"),
						() => J("lbl.navOverlay"),
						() => J("tip.nav.inset"),
						() => J("lbl.navInset")
					]), z("change", r, (e) => X("nav", () => {
						e.target.checked ? R(D).nav.overlay = !0 : delete R(D).nav.overlay;
					})), z("change", o, (e) => au("inset", e.target.checked ? void 0 : !1)), V(e, t);
				};
				U(_e, (e) => {
					!R(su) && !R(ou) && e(ve);
				});
				var ye = F(_e, 2), be = (e) => {
					var t = Pv(), n = N(t);
					{
						let e = /* @__PURE__ */ O(() => J("lbl.textAlign")), t = /* @__PURE__ */ O(() => J("tip.nav.sideAlign")), r = /* @__PURE__ */ O(() => R(D).nav.style?.sideAlign ?? "left"), i = /* @__PURE__ */ O(() => [
							["left", J("common.left")],
							["center", J("common.center")],
							["right", J("common.right")]
						]);
						lc(n, {
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
							onchange: (e) => au("sideAlign", e === "left" ? void 0 : e)
						});
					}
					var r = F(n, 2), i = M(r), a = P(i, !0), o = F(i, 2);
					G(o), T(r), I((e, t) => {
						q(r, "title", e), H(a, t), q(o, "min", Ws.min), q(o, "max", Ws.max), K(o, R(D).nav.style?.width ?? 250);
					}, [() => J("tip.nav.colWidth"), () => J("lbl.navColWidth")]), z("change", o, (e) => {
						let t = Xs(e.target.value, Ws, 250);
						au("width", t === 250 ? void 0 : t), e.target.value = R(D).nav.style?.width ?? 250;
					}), V(e, t);
				};
				U(ye, (e) => {
					R(ou) && e(be);
				}), T(oe), T(te);
				var xe = F(te, 4), Se = M(xe), Ce = P(Se, !0), we = F(Se, 2), Te = M(we);
				Qr(Te, 20, () => qs, (e) => e, (e, t) => {
					var n = uv();
					let r;
					var i = P(n, !0);
					I((e) => {
						r = xi(n, 1, "svelte-1n46o8q", null, r, { on: R(cu) === t }), H(i, e);
					}, [() => J(`opt.size.${t}`)]), z("click", n, () => du(t)), V(e, n);
				}), T(Te);
				var Ee = F(Te, 2), De = M(Ee), Oe = P(De, !0), ke = F(De, 2), Ae = M(ke), Me = (e) => {
					var t = Fv(), n = M(t), r = P(n, !0), i = F(n, 2);
					G(i);
					var a = F(i, 2);
					G(a), T(t), I((e, n) => {
						q(t, "title", e), H(r, n), q(i, "min", Fs.min), q(i, "max", Fs.max), q(i, "step", Fs.step), K(i, R(lu)), q(a, "min", Fs.min), q(a, "max", Fs.max), K(a, R(lu));
					}, [() => J("tip.nav.thickness"), () => J("lbl.navThickness")]), z("input", i, (e) => au("padY", e.target.valueAsNumber)), z("change", a, (e) => Nu(e, "padY", Fs)), V(e, t);
				};
				U(Ae, (e) => {
					R(ou) || e(Me);
				});
				var Ne = F(Ae, 2), Pe = M(Ne), Fe = P(Pe, !0), Ie = F(Pe, 2);
				G(Ie);
				var Le = F(Ie, 2);
				G(Le), T(Ne);
				var Re = F(Ne, 2), ze = (e) => {
					var t = Iv(), n = M(t), r = M(n), i = P(r, !0), a = F(r, 2);
					G(a), T(n);
					var o = F(n, 2), s = M(o), c = P(s, !0), l = F(s, 2);
					G(l), T(o), T(t), I((e, t, r, s, u, d) => {
						q(n, "title", e), H(i, t), q(a, "min", Ls.min), q(a, "max", Ls.max), q(a, "placeholder", r), K(a, R(D).nav.style?.padX ?? ""), q(o, "title", s), H(c, u), q(l, "min", Rs.min), q(l, "max", Rs.max), q(l, "placeholder", d), K(l, R(D).nav.style?.gap ?? "");
					}, [
						() => J("tip.nav.padX"),
						() => J("lbl.navPadX"),
						() => J("common.auto"),
						() => J("tip.nav.gap"),
						() => J("lbl.navGap"),
						() => J("common.auto")
					]), z("change", a, (e) => fu(e, "padX", Ls)), z("change", l, (e) => fu(e, "gap", Rs)), V(e, t);
				};
				U(Re, (e) => {
					R(ou) || e(ze);
				}), T(ke), T(Ee), T(we), T(xe);
				var Be = F(xe, 4), Ve = M(Be), He = P(Ve, !0), Ue = F(Ve, 2), We = M(Ue), Ge = (e) => {
					var t = Rv(), n = N(t), r = M(n), i = P(r, !0), a = F(r, 2);
					Qr(a, 21, () => [
						["", J("common.none")],
						["bottom", J("opt.navBorder.bottom")],
						["top", J("opt.navBorder.top")],
						["both", J("opt.navBorder.both")],
						["all", J("opt.navBorder.all")]
					], ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ O(() => g(R(t), 2));
						let r = () => R(n)[0], i = () => R(n)[1];
						var a = Av();
						let o;
						var s = M(a);
						W(s, () => m[r()]);
						var c = P(F(s), !0);
						T(a), I(() => {
							o = xi(a, 1, "tile svelte-1n46o8q", null, o, { on: (R(D).nav.style?.border?.side ?? "") === r() }), q(a, "aria-pressed", (R(D).nav.style?.border?.side ?? "") === r()), H(c, i());
						}), z("click", a, () => au("border", r() ? {
							...R(D).nav.style?.border ?? {},
							side: r()
						} : void 0)), V(e, a);
					}), T(a), T(n);
					var o = F(n, 2), s = (e) => {
						var t = Lv(), n = M(t), r = P(n, !0), i = F(n, 2);
						G(i);
						var a = F(i, 2), o = P(a, !0), s = F(a, 2);
						{
							let e = /* @__PURE__ */ O(() => R(D).nav.style.border.color ?? "text"), t = /* @__PURE__ */ O(co), n = /* @__PURE__ */ O(() => J("tip.nav.borderColorPick"));
							Na(s, {
								get value() {
									return R(e);
								},
								get tokens() {
									return R(t);
								},
								get label() {
									return R(n);
								},
								onchange: (e) => au("border", {
									...R(D).nav.style.border,
									color: e
								})
							});
						}
						T(t), I((e, t, s, c, l) => {
							q(n, "title", e), H(r, t), q(i, "title", s), K(i, R(D).nav.style.border.width ?? 1), q(a, "title", c), H(o, l);
						}, [
							() => J("tip.nav.borderWidth"),
							() => J("lbl.navBorderWidth"),
							() => J("tip.nav.borderWidth"),
							() => J("tip.nav.borderColorPick"),
							() => J("lbl.navBorderColor")
						]), z("change", i, (e) => {
							let t = Xs(e.target.value, {
								min: 1,
								max: 8
							}, 1), n = { ...R(D).nav.style.border };
							t === 1 ? delete n.width : n.width = t, au("border", n), e.target.value = R(D).nav.style.border.width ?? 1;
						}), V(e, t);
					};
					U(o, (e) => {
						R(D).nav.style?.border?.side && e(s);
					}), I((e, t, r) => {
						q(n, "title", e), H(i, t), q(a, "aria-label", r);
					}, [
						() => J("tip.nav.border"),
						() => J("lbl.navBorder"),
						() => J("lbl.navBorder")
					]), V(e, t);
				};
				U(We, (e) => {
					R(ou) || e(Ge);
				});
				var Ke = F(We, 2), qe = (e) => {
					{
						let t = /* @__PURE__ */ O(() => J("lbl.navShadow")), n = /* @__PURE__ */ O(() => J("tip.nav.shadow")), r = /* @__PURE__ */ O(() => R(D).nav.style?.shadow ?? ""), i = /* @__PURE__ */ O(() => [
							["", J("common.none")],
							["soft", J("opt.navShadow.soft")],
							["strong", J("opt.navShadow.strong")]
						]);
						lc(e, {
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
							onchange: (e) => au("shadow", e || void 0)
						});
					}
				};
				U(Ke, (e) => {
					!R(su) && !R(ou) && e(qe);
				}), T(Ue), T(Be);
				var Je = F(Be, 4), Ye = M(Je), Xe = P(Ye, !0), Ze = F(Ye, 2), Qe = M(Ze), $e = (e) => {
					var t = Bv(), n = M(t), r = P(n, !0), i = F(n, 2), a = M(i);
					G(a);
					var o = F(a);
					T(i);
					var s = F(i, 2), c = (e) => {
						var t = Sg(), n = N(t);
						{
							let e = /* @__PURE__ */ O(() => J("lbl.navScroll")), t = /* @__PURE__ */ O(() => J("tip.nav.scroll")), r = /* @__PURE__ */ O(() => R(D).nav.scroll ?? "none"), i = /* @__PURE__ */ O(() => [
								["none", J("opt.scroll.none")],
								["shrink", J("opt.scroll.shrink")],
								["hide", J("opt.scroll.hide")]
							]);
							lc(n, {
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
								onchange: (e) => X("nav", () => {
									e === "none" ? delete R(D).nav.scroll : R(D).nav.scroll = e;
								})
							});
						}
						var r = F(n, 2), i = (e) => {
							var t = zv(), n = N(t), r = M(n), i = P(r, !0), a = F(r, 2);
							G(a);
							var o = P(F(a, 2));
							T(n);
							var s = F(n, 2), c = M(s), l = P(c, !0), u = F(c, 2);
							G(u);
							var d = P(F(u, 2));
							T(s);
							var f = F(s, 2), p = M(f), m = P(p, !0), h = F(p, 2);
							G(h);
							var g = P(F(h, 2));
							T(f);
							var _ = F(f, 2), v = (e) => {
								var t = Gh(), n = M(t);
								G(n);
								var r = F(n);
								T(t), I((e, i) => {
									q(t, "title", e), Oi(n, R(D).nav.style?.shrinkLogo === !0), H(r, ` ${i ?? ""}`);
								}, [() => J("tip.nav.shrinkLogo"), () => J("lbl.navShrinkLogo")]), z("change", n, (e) => au("shrinkLogo", e.target.checked ? !0 : void 0)), V(e, t);
							};
							U(_, (e) => {
								(R(D).nav.logo?.type ?? "text") !== "text" && e(v);
							}), I((e, t, r, c, p, _, v, y) => {
								q(n, "title", e), H(i, t), K(a, r), H(o, `${c ?? ""}%`), q(s, "title", p), H(l, _), K(u, R(D).nav.style?.shrinkAt ?? 80), H(d, `${R(D).nav.style?.shrinkAt ?? 80 ?? ""} px`), q(f, "title", v), H(m, y), K(h, R(D).nav.style?.shrinkMs ?? 220), H(g, `${R(D).nav.style?.shrinkMs ?? 220 ?? ""} ms`);
							}, [
								() => J("tip.nav.shrinkTo"),
								() => J("lbl.navShrinkTo"),
								() => Math.round((R(D).nav.style?.shrinkTo ?? .5) * 100),
								() => Math.round((R(D).nav.style?.shrinkTo ?? .5) * 100),
								() => J("tip.nav.shrinkAt"),
								() => J("lbl.navShrinkAt"),
								() => J("tip.nav.shrinkMs"),
								() => J("lbl.navShrinkMs")
							]), z("input", a, (e) => Bu(e.target.valueAsNumber)), z("input", u, (e) => Gu(e.target.valueAsNumber)), z("input", h, (e) => Ku(e.target.valueAsNumber)), V(e, t);
						};
						U(r, (e) => {
							R(D).nav.scroll === "shrink" && e(i);
						}), V(e, t);
					};
					U(s, (e) => {
						R(D).nav.sticky !== !1 && e(c);
					});
					var l = F(s, 2), u = M(l);
					G(u);
					var d = F(u);
					T(l), T(t), I((e, t, n, s, c) => {
						H(r, e), q(i, "title", t), Oi(a, R(D).nav.sticky !== !1), H(o, ` ${n ?? ""}`), q(l, "title", s), Oi(u, R(D).nav.style?.atTop === "clear"), H(d, ` ${c ?? ""}`);
					}, [
						() => J("group.navScrolling"),
						() => J("tip.nav.sticky"),
						() => J("lbl.navSticky"),
						() => J("tip.nav.atTop"),
						() => J("lbl.navAtTop")
					]), z("change", a, (e) => X("nav", () => {
						R(D).nav.sticky = e.target.checked;
					})), z("change", u, (e) => au("atTop", e.target.checked ? "clear" : void 0)), V(e, t);
				};
				U(Qe, (e) => {
					R(ou) || e($e);
				}), T(Ze), T(Je);
				var et = F(Je, 4), tt = M(et), nt = P(tt, !0), rt = F(tt, 2), it = M(rt), E = M(it), at = (e) => {
					var t = Vv(), n = M(t), r = P(n, !0), i = F(n, 2);
					G(i), T(t), I((e, n, a) => {
						q(t, "title", e), H(r, n), q(i, "min", Fs.min), q(i, "max", Fs.max), q(i, "placeholder", a), K(i, R(D).nav.style?.mobile?.padY ?? "");
					}, [
						() => J("tip.nav.thickness"),
						() => J("lbl.navThickness"),
						() => J("lbl.navSameAsDesktop")
					]), z("change", i, (e) => Fu(e, "padY", Fs)), V(e, t);
				};
				U(E, (e) => {
					R(ou) || e(at);
				});
				var st = F(E, 2), ct = M(st), lt = P(ct, !0), ut = F(ct, 2);
				G(ut), T(st), T(it);
				var dt = F(it, 2), ft = M(dt), pt = M(ft), mt = P(pt, !0), ht = F(pt, 2);
				{
					let e = /* @__PURE__ */ O(() => R(D).nav.style?.mobile?.size ?? ""), t = /* @__PURE__ */ O(() => [["", J("lbl.navSameAsDesktop")], ...qs.map((e) => [e, J(`opt.size.${e}`)])]);
					Y(ht, {
						filled: !0,
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => pu("size", e || void 0)
					});
				}
				T(ft);
				var gt = F(ft, 2), _t = M(gt), vt = P(_t, !0), yt = F(_t, 2);
				{
					let e = /* @__PURE__ */ O(() => R(D).nav.style?.mobile?.layout ?? ""), t = /* @__PURE__ */ O(() => [
						["", J("lbl.navSameAsDesktop")],
						["left", J("common.left")],
						["center", J("common.center")],
						["right", J("common.right")]
					]);
					Y(yt, {
						filled: !0,
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => pu("layout", e || void 0)
					});
				}
				T(gt), T(dt);
				var bt = F(dt, 2), xt = M(bt), St = M(xt), Ct = P(St, !0), wt = F(St, 2);
				{
					let e = /* @__PURE__ */ O(() => R(D).nav.style?.mobile?.tools?.side ?? ""), t = /* @__PURE__ */ O(() => [
						["", J("lbl.navSameAsDesktop")],
						["start", J("common.left")],
						["end", J("common.right")]
					]);
					Y(wt, {
						filled: !0,
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => pu("tools", e ? { side: e } : void 0)
					});
				}
				T(xt);
				var Tt = F(xt, 2), Et = (e) => {
					var t = Hv(), n = M(t), r = P(n, !0), i = F(n, 2);
					{
						let e = /* @__PURE__ */ O(() => mu("overlay")), t = /* @__PURE__ */ O(() => [
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
							onchange: (e) => hu("overlay", e)
						});
					}
					T(t), I((e, n) => {
						q(t, "title", e), H(r, n);
					}, [() => J("tip.nav.mobileOverlay"), () => J("lbl.navOverlay")]), V(e, t);
				};
				U(Tt, (e) => {
					!R(su) && !R(ou) && e(Et);
				}), T(bt);
				var Dt = F(bt, 2), Ot = M(Dt), kt = M(Ot), At = P(kt, !0), jt = F(kt, 2);
				{
					let e = /* @__PURE__ */ O(() => R(D).nav.style?.mobile?.border?.side ?? ""), t = /* @__PURE__ */ O(() => [
						["", J("lbl.navSameAsDesktop")],
						["none", J("common.none")],
						["bottom", J("opt.navBorder.bottom")],
						["top", J("opt.navBorder.top")],
						["both", J("opt.navBorder.both")],
						["all", J("opt.navBorder.all")]
					]);
					Y(jt, {
						filled: !0,
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => gu(e)
					});
				}
				T(Ot), T(Dt);
				var Mt = F(Dt, 2), Nt = (e) => {
					var t = Lv(), n = M(t), r = P(n, !0), i = F(n, 2);
					G(i);
					var a = F(i, 2), o = P(a, !0), s = F(a, 2);
					{
						let e = /* @__PURE__ */ O(() => R(D).nav.style.mobile.border.color ?? "text"), t = /* @__PURE__ */ O(co), n = /* @__PURE__ */ O(() => J("tip.nav.borderColorPick"));
						Na(s, {
							get value() {
								return R(e);
							},
							get tokens() {
								return R(t);
							},
							get label() {
								return R(n);
							},
							onchange: (e) => pu("border", {
								...R(D).nav.style.mobile.border,
								color: e
							})
						});
					}
					T(t), I((e, t, s, c, l) => {
						q(n, "title", e), H(r, t), q(i, "title", s), K(i, R(D).nav.style.mobile.border.width ?? 1), q(a, "title", c), H(o, l);
					}, [
						() => J("tip.nav.borderWidth"),
						() => J("lbl.navBorderWidth"),
						() => J("tip.nav.borderWidth"),
						() => J("tip.nav.borderColorPick"),
						() => J("lbl.navBorderColor")
					]), z("change", i, (e) => {
						let t = Xs(e.target.value, {
							min: 1,
							max: 8
						}, 1), n = { ...R(D).nav.style.mobile.border };
						t === 1 ? delete n.width : n.width = t, pu("border", n), e.target.value = R(D).nav.style.mobile.border.width ?? 1;
					}), V(e, t);
				};
				U(Mt, (e) => {
					R(D).nav.style?.mobile?.border?.side && R(D).nav.style.mobile.border.side !== "none" && e(Nt);
				});
				var Pt = F(Mt, 2), Ft = M(Pt), It = M(Ft), Lt = P(It, !0), Rt = F(It, 2);
				{
					let e = /* @__PURE__ */ O(() => R(D).nav.style?.mobileMenu ?? "dropdown"), t = /* @__PURE__ */ O(() => [["dropdown", J("opt.mobileMenu.dropdown")], ["sheet", J("opt.mobileMenu.sheet")]]);
					Y(Rt, {
						filled: !0,
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => au("mobileMenu", e === "dropdown" ? void 0 : e)
					});
				}
				T(Ft);
				var zt = F(Ft, 2), Bt = (e) => {
					var t = Hv(), n = M(t), r = P(n, !0), i = F(n, 2);
					{
						let e = /* @__PURE__ */ O(() => R(D).nav.style?.sheetMotion ?? "top"), t = /* @__PURE__ */ O(() => [
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
							onchange: (e) => au("sheetMotion", e === "top" ? void 0 : e)
						});
					}
					T(t), I((e, n) => {
						q(t, "title", e), H(r, n);
					}, [() => J("tip.nav.sheetMotion"), () => J("lbl.sheetMotion")]), V(e, t);
				};
				U(zt, (e) => {
					R(D).nav.style?.mobileMenu === "sheet" && e(Bt);
				}), T(Pt);
				var Vt = F(Pt, 2), Ht = (e) => {
					var t = Uv(), n = N(t), r = M(n);
					G(r);
					var i = F(r);
					T(n);
					var a = F(n, 2), o = (e) => {
						var t = Gh(), n = M(t);
						G(n);
						var r = F(n);
						T(t), I((e, i) => {
							q(t, "title", e), Oi(n, R(D).nav.style?.sheetTheme === !0), H(r, ` ${i ?? ""}`);
						}, [() => J("tip.nav.sheetTheme"), () => J("lbl.sheetTheme")]), z("change", n, (e) => au("sheetTheme", e.target.checked ? !0 : void 0)), V(e, t);
					};
					U(a, (e) => {
						R(D).theme?.alt?.tokens && R(D).nav.style?.tools?.theme !== !1 && e(o);
					});
					var s = F(a, 2), c = (e) => {
						var t = Gh(), n = M(t);
						G(n);
						var r = F(n);
						T(t), I((e, i) => {
							q(t, "title", e), Oi(n, R(D).nav.style?.sheetCart === !0), H(r, ` ${i ?? ""}`);
						}, [() => J("tip.nav.sheetCart"), () => J("lbl.sheetCart")]), z("change", n, (e) => au("sheetCart", e.target.checked ? !0 : void 0)), V(e, t);
					};
					U(s, (e) => {
						R(D).nav.cart?.show && e(c);
					});
					var l = F(s, 2), u = (e) => {
						var t = Gh(), n = M(t);
						G(n);
						var r = F(n);
						T(t), I((e, i) => {
							q(t, "title", e), Oi(n, R(D).nav.style?.sheetAnnounce === !0), H(r, ` ${i ?? ""}`);
						}, [() => J("tip.nav.sheetAnnounce"), () => J("lbl.sheetAnnounce")]), z("change", n, (e) => au("sheetAnnounce", e.target.checked ? !0 : void 0)), V(e, t);
					};
					U(l, (e) => {
						R(D).nav.announcement?.show && e(u);
					});
					var d = F(l, 2), f = (e) => {
						var t = Gh(), n = M(t);
						G(n);
						var r = F(n);
						T(t), I((e, i) => {
							q(t, "title", e), Oi(n, R(D).nav.style?.sheetToolLabels === !0), H(r, ` ${i ?? ""}`);
						}, [() => J("tip.nav.sheetToolLabels"), () => J("lbl.sheetToolLabels")]), z("change", n, (e) => au("sheetToolLabels", e.target.checked ? !0 : void 0)), V(e, t);
					};
					U(d, (e) => {
						(R(D).nav.style?.sheetTheme || R(D).nav.style?.sheetCart) && e(f);
					});
					var p = F(d, 2), m = M(p), h = P(m, !0), g = F(m, 2);
					{
						let e = /* @__PURE__ */ O(() => R(D).nav.style?.sheet?.bg ?? "surface"), t = /* @__PURE__ */ O(co), n = /* @__PURE__ */ O(() => J("tip.nav.sheetBg"));
						Na(g, {
							get value() {
								return R(e);
							},
							get tokens() {
								return R(t);
							},
							get label() {
								return R(n);
							},
							onchange: (e) => Mu("bg", e)
						});
					}
					var _ = F(g, 2);
					G(_);
					var v = P(F(_, 2));
					T(p);
					var y = F(p, 2), b = M(y);
					G(b);
					var x = F(b);
					T(y);
					var S = F(y, 2), ee = M(S), te = F(ee);
					{
						let e = /* @__PURE__ */ O(() => R(D).nav.style?.sheet?.textColor ?? R(D).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ O(co), n = /* @__PURE__ */ O(() => J("tip.nav.sheetTextColorPick"));
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
							onchange: (e) => Mu("textColor", e)
						});
					}
					T(S), I((e, t, a, o, s, c, l, u, d, f) => {
						q(n, "title", e), Oi(r, R(D).nav.style?.sheetLogo === !0), H(i, ` ${t ?? ""}`), q(p, "title", a), H(h, o), q(_, "title", s), K(_, c), H(v, `${l ?? ""}%`), q(y, "title", u), Oi(b, R(D).nav.style?.sheet?.blur ?? R(D).nav.style?.blur !== !1), H(x, ` ${d ?? ""}`), H(ee, `${f ?? ""} `);
					}, [
						() => J("tip.nav.sheetLogo"),
						() => J("lbl.sheetLogo"),
						() => J("tip.nav.sheetBg"),
						() => J("lbl.background"),
						() => J("tip.nav.sheetOpacity"),
						() => Math.round((R(D).nav.style?.sheet?.bgOpacity ?? .85) * 100),
						() => Math.round((R(D).nav.style?.sheet?.bgOpacity ?? .85) * 100),
						() => J("tip.nav.sheetBlur"),
						() => J("lbl.sheetBlur"),
						() => J("lbl.textColor")
					]), z("change", r, (e) => au("sheetLogo", e.target.checked ? !0 : void 0)), z("input", _, (e) => Mu("bgOpacity", e.target.valueAsNumber / 100)), z("change", b, (e) => Mu("blur", e.target.checked)), V(e, t);
				};
				U(Vt, (e) => {
					R(D).nav.style?.mobileMenu === "sheet" && e(Ht);
				});
				var Ut = F(Vt, 2), Wt = (e) => {
					var t = Hv(), n = M(t), r = P(n, !0), i = F(n, 2);
					{
						let e = /* @__PURE__ */ O(() => R(D).nav.style?.mobileSubs ?? "collapsed"), t = /* @__PURE__ */ O(() => [["collapsed", J("opt.mobileSubs.collapsed")], ["expanded", J("opt.mobileSubs.expanded")]]);
						Y(i, {
							filled: !0,
							get value() {
								return R(e);
							},
							get options() {
								return R(t);
							},
							onchange: (e) => au("mobileSubs", e === "collapsed" ? void 0 : e)
						});
					}
					T(t), I((e, n) => {
						q(t, "title", e), H(r, n);
					}, [() => J("tip.nav.mobileSubs"), () => J("lbl.mobileSubs")]), V(e, t);
				}, Gt = /* @__PURE__ */ O(() => R(D).nav.items?.some((e) => e.children?.length));
				U(Ut, (e) => {
					R(Gt) && e(Wt);
				}), T(rt), T(et);
				var Kt = F(et, 4), qt = M(Kt), Jt = P(qt, !0), Yt = F(qt, 2), Xt = M(Yt), k = M(Xt), Zt = P(k, !0), Qt = F(k, 2);
				Qr(Qt, 21, () => [
					["standard", J("opt.hover.standard")],
					["underline", J("opt.hover.underline")],
					["pill", J("opt.hover.pill")],
					["lift-plain", J("opt.hover.liftPlain")],
					["lift", J("opt.hover.lift")]
				], ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ O(() => g(R(t), 2));
					let r = () => R(n)[0], i = () => R(n)[1];
					var a = Wv();
					let o;
					var s = M(a), c = P(s, !0), l = P(F(s), !0);
					T(a), I((e) => {
						o = xi(a, 1, "tile hover-tile svelte-1n46o8q", null, o, { on: (R(D).nav.style?.hover ?? "standard") === r() }), q(a, "aria-pressed", (R(D).nav.style?.hover ?? "standard") === r()), xi(s, 1, `hover-sample hover-${r() ?? ""}`, "svelte-1n46o8q"), H(c, e), H(l, i());
					}, [() => J("seed.home")]), z("click", a, () => id(r())), V(e, a);
				}), T(Qt), T(Xt);
				var $t = F(Xt, 2), en = (e) => {
					var t = Gv(), n = M(t), r = P(n, !0), i = F(n, 2);
					G(i);
					var a = P(F(i, 2));
					T(t), I((e, n, o) => {
						q(t, "title", e), H(r, n), K(i, R(D).nav.style?.hoverGlow ?? .6), H(a, `${o ?? ""}%`);
					}, [
						() => J("tip.nav.hoverGlow"),
						() => J("lbl.glowStrength"),
						() => Math.round((R(D).nav.style?.hoverGlow ?? .6) * 100)
					]), z("input", i, (e) => au("hoverGlow", Number(e.target.value))), V(e, t);
				};
				U($t, (e) => {
					R(D).nav.style?.hover === "lift" && e(en);
				});
				var tn = F($t, 2), nn = M(tn), rn = (e) => {
					var t = o_(), n = M(t);
					{
						let e = /* @__PURE__ */ O(() => R(D).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ O(co);
						Na(n, {
							get value() {
								return R(e);
							},
							get tokens() {
								return R(t);
							},
							get label() {
								return R(Ju)[1];
							},
							onchange: (e) => au("hoverColor", e)
						});
					}
					var r = P(F(n, 2), !0);
					T(t), I(() => {
						q(t, "title", R(Ju)[1]), H(r, R(Ju)[0]);
					}), V(e, t);
				};
				U(nn, (e) => {
					R(Ju) && e(rn);
				});
				var an = F(nn, 2), on = M(an);
				{
					let e = /* @__PURE__ */ O(() => R(D).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ O(co), n = /* @__PURE__ */ O(() => J("tip.nav.hoverTextColorPick"));
					Na(on, {
						get value() {
							return R(e);
						},
						get tokens() {
							return R(t);
						},
						get label() {
							return R(n);
						},
						onchange: (e) => au("hoverTextColor", e)
					});
				}
				var j = P(F(on, 2), !0);
				T(an);
				var sn = F(an, 2), cn = M(sn);
				{
					let e = /* @__PURE__ */ O(() => R(D).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ O(co), n = /* @__PURE__ */ O(() => J("tip.nav.textColorPick"));
					Na(cn, {
						get value() {
							return R(e);
						},
						get tokens() {
							return R(t);
						},
						get label() {
							return R(n);
						},
						onchange: (e) => au("textColor", e)
					});
				}
				var ln = P(F(cn, 2), !0);
				T(sn), T(tn);
				var un = F(tn, 2), dn = M(un);
				G(dn);
				var fn = F(dn);
				T(un), T(Yt), T(Kt);
				var pn = F(Kt, 4), mn = M(pn), hn = P(mn, !0), gn = F(mn, 2), _n = M(gn);
				a(_n, () => ro, () => R(D).nav?.style?.background?.layers ?? []), T(gn), T(pn), T(ee), T(b);
				var vn = F(b, 2), yn = M(vn), bn = P(yn, !0), xn = F(yn, 2), Sn = M(xn), Cn = M(Sn);
				G(Cn);
				var wn = F(Cn);
				T(Sn);
				var Tn = F(Sn, 2), En = (e) => {
					var t = qv(), n = N(t), r = M(n), i = P(r, !0), a = F(r, 2);
					G(a), T(n);
					var o = F(n, 2), s = M(o), c = F(s);
					{
						let e = /* @__PURE__ */ O(() => R(D).nav.announcement?.page ?? (R(D).nav.announcement?.href === void 0 ? "" : "custom")), t = /* @__PURE__ */ O(() => [
							["", J("common.none")],
							...R(D).pages.map((e) => [e.id, e.title]),
							["custom", J("opt.announceLink.custom")]
						]);
						Y(c, {
							get value() {
								return R(e);
							},
							get options() {
								return R(t);
							},
							onchange: (e) => X("edit:nav-announce-link", () => {
								let t = { ...R(D).nav.announcement ?? {} };
								delete t.page, delete t.href, e === "custom" ? t.href = "" : e && (t.page = e), R(D).nav.announcement = t;
							})
						});
					}
					T(o);
					var l = F(o, 2), u = (e) => {
						var t = Kv(), n = M(t), r = P(n, !0), i = F(n, 2);
						G(i), T(t), I((e, n) => {
							q(t, "title", e), H(r, n), K(i, R(D).nav.announcement?.href ?? "");
						}, [() => J("tip.nav.announceHref"), () => J("lbl.announceHref")]), z("change", i, (e) => _u("href", e.target.value.trim())), V(e, t);
					};
					U(l, (e) => {
						R(D).nav.announcement?.href !== void 0 && !R(D).nav.announcement?.page && e(u);
					});
					var d = F(l, 2), f = (e) => {
						var t = Gh(), n = M(t);
						G(n);
						var r = F(n);
						T(t), I((e, i) => {
							q(t, "title", e), Oi(n, R(D).nav.announcement?.sticky !== !1), H(r, ` ${i ?? ""}`);
						}, [() => J("tip.nav.announceSticky"), () => J("lbl.announceSticky")]), z("change", n, (e) => _u("sticky", e.target.checked ? void 0 : !1)), V(e, t);
					};
					U(d, (e) => {
						R(D).nav.sticky !== !1 && !R(su) && !R(ou) && !R(D).nav.overlay && e(f);
					});
					var p = F(d, 2), m = (e) => {
						var t = Gh(), n = M(t);
						G(n);
						var r = F(n);
						T(t), I((e, i) => {
							q(t, "title", e), Oi(n, R(D).nav.announcement?.followNav === !0), H(r, ` ${i ?? ""}`);
						}, [() => J("tip.nav.announceFollowNav"), () => J("lbl.announceFollowNav")]), z("change", n, (e) => _u("followNav", e.target.checked ? !0 : void 0)), V(e, t);
					};
					U(p, (e) => {
						R(D).nav.scroll === "hide" && R(D).nav.sticky !== !1 && !R(ou) && R(D).nav.announcement?.sticky !== !1 && e(m);
					});
					var h = F(p, 2), g = (e) => {
						{
							let t = /* @__PURE__ */ O(() => J("lbl.announcePlace")), n = /* @__PURE__ */ O(() => J("tip.nav.announcePlace")), r = /* @__PURE__ */ O(() => R(D).nav.announcement?.place ?? "nav"), i = /* @__PURE__ */ O(() => [
								["nav", J("opt.announcePlace.nav")],
								["page", J("opt.announcePlace.page")],
								["content", J("opt.announcePlace.content")]
							]);
							lc(e, {
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
								onchange: (e) => _u("place", e === "nav" ? void 0 : e)
							});
						}
					};
					U(h, (e) => {
						R(ou) && e(g);
					});
					var _ = F(h, 2), v = M(_);
					G(v);
					var y = F(v);
					T(_);
					var b = F(_, 2), x = (e) => {
						var t = _g(), n = P(t, !0);
						I((e, r) => {
							q(t, "title", e), H(n, r);
						}, [() => J("tip.nav.announceShowAgain"), () => J("lbl.announceShowAgain")]), z("click", t, () => ot?.sendAnnounceReset()), V(e, t);
					};
					U(b, (e) => {
						R(D).nav.announcement?.dismiss !== !1 && e(x);
					});
					var S = F(b, 2), ee = M(S), te = F(ee);
					{
						let e = /* @__PURE__ */ O(() => R(D).nav.announcement?.color ?? "accent"), t = /* @__PURE__ */ O(co), n = /* @__PURE__ */ O(() => J("tip.nav.announceColor"));
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
							onchange: (e) => _u("color", e)
						});
					}
					T(S);
					var ne = F(S, 2), re = M(ne), ie = F(re);
					{
						let e = /* @__PURE__ */ O(() => R(D).nav.announcement?.textColor ?? "accent-text"), t = /* @__PURE__ */ O(co), n = /* @__PURE__ */ O(() => J("tip.nav.announceTextColor"));
						Na(ie, {
							get value() {
								return R(e);
							},
							get tokens() {
								return R(t);
							},
							get label() {
								return R(n);
							},
							onchange: (e) => _u("textColor", e)
						});
					}
					T(ne), I((e, t, r, c, l, u, d, f, p, m) => {
						q(n, "title", e), H(i, t), K(a, R(D).nav.announcement?.text ?? ""), q(o, "title", r), H(s, `${c ?? ""} `), q(_, "title", l), Oi(v, R(D).nav.announcement?.dismiss !== !1), H(y, ` ${u ?? ""}`), q(S, "title", d), H(ee, `${f ?? ""} `), q(ne, "title", p), H(re, `${m ?? ""} `);
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
					]), z("change", a, (e) => _u("text", e.target.value.trim() || void 0)), z("change", v, (e) => _u("dismiss", e.target.checked ? void 0 : !1)), V(e, t);
				};
				U(Tn, (e) => {
					R(D).nav.announcement?.show && e(En);
				}), T(xn), T(vn);
				var Dn = F(vn, 2), On = M(Dn), kn = P(On, !0), An = F(On, 2);
				{
					let e = (e, t = f, n = f) => {
						var r = Jv(), i = M(r);
						W(i, () => C.up, !0), T(i);
						var a = F(i, 2);
						W(a, () => C.down, !0), T(a), T(r), I((e, t) => {
							q(i, "title", e), i.disabled = n() === 0, q(a, "title", t), a.disabled = n() === R(nu).length - 1;
						}, [() => J("tip.moveUp"), () => J("tip.moveDown")]), z("click", i, (e) => {
							e.preventDefault(), e.stopPropagation(), ru(t(), -1);
						}), z("click", a, (e) => {
							e.preventDefault(), e.stopPropagation(), ru(t(), 1);
						}), V(e, r);
					};
					var jn = M(An), Mn = (e) => {
						var t = Sg(), n = N(t);
						{
							let e = /* @__PURE__ */ O(() => J("lbl.toolsSide")), t = /* @__PURE__ */ O(() => J("tip.nav.toolsSideColumn")), r = /* @__PURE__ */ O(() => R(D).nav.style?.tools?.side ?? "end"), i = /* @__PURE__ */ O(() => [["start", J("opt.toolsSide.top")], ["end", J("opt.toolsSide.bottom")]]);
							lc(n, {
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
								onchange: (e) => iu("side", e === "start" ? "start" : void 0)
							});
						}
						var r = F(n, 2);
						{
							let e = /* @__PURE__ */ O(() => J("lbl.toolsAlign")), t = /* @__PURE__ */ O(() => J("tip.nav.toolsAlign")), n = /* @__PURE__ */ O(() => R(D).nav.style?.tools?.align ?? "center"), i = /* @__PURE__ */ O(() => [
								["start", J("opt.toolsAlign.start")],
								["center", J("opt.toolsAlign.center")],
								["end", J("opt.toolsAlign.end")],
								["spread", J("opt.toolsAlign.spread")]
							]);
							lc(r, {
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
								onchange: (e) => iu("align", e === "center" ? void 0 : e)
							});
						}
						V(e, t);
					}, Nn = (e) => {
						{
							let t = /* @__PURE__ */ O(() => J("lbl.toolsSide")), n = /* @__PURE__ */ O(() => J("tip.nav.toolsSide")), r = /* @__PURE__ */ O(() => R(D).nav.style?.tools?.side ?? "end"), i = /* @__PURE__ */ O(() => [["start", J("opt.toolsSide.start")], ["end", J("opt.toolsSide.end")]]);
							lc(e, {
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
								onchange: (e) => iu("side", e === "start" ? "start" : void 0)
							});
						}
					};
					U(jn, (e) => {
						R(ou) ? e(Mn) : e(Nn, -1);
					}), Qr(F(jn, 2), 18, () => R(nu), (e) => e, (t, n, r) => {
						var i = Lr(), a = N(i), o = (t) => {
							var i = Lr(), a = N(i), o = (t) => {
								var i = Yv(), a = M(i), o = M(a), s = P(o, !0), c = F(o);
								e(c, () => n, () => R(r)), T(a);
								var l = F(a, 2), u = M(l);
								G(u);
								var d = F(u);
								T(l), T(i), I((e, t, n) => {
									H(s, e), q(l, "title", t), Oi(u, R(D).nav.style?.tools?.theme !== !1), H(d, ` ${n ?? ""}`);
								}, [
									() => J("lbl.themeToggle"),
									() => J("tip.nav.themeToggle"),
									() => J("lbl.showInMenu")
								]), z("change", u, (e) => iu("theme", e.target.checked ? void 0 : !1)), V(t, i);
							};
							U(a, (e) => {
								R(D).theme?.alt?.tokens && e(o);
							}), V(t, i);
						}, s = (t) => {
							var i = Xv(), a = M(i), o = M(a), s = P(o, !0), c = F(o);
							e(c, () => n, () => R(r)), T(a);
							var l = F(a, 2), u = M(l);
							G(u);
							var d = F(u);
							T(l);
							var f = F(l, 2), p = (e) => {
								var t = Hv(), n = M(t), r = P(n, !0), i = F(n, 2);
								{
									let e = /* @__PURE__ */ O(() => R(D).nav.cart?.href ?? ""), t = /* @__PURE__ */ O(() => [["", J("common.none")], ...R(D).pages.map((e) => [e.path, e.title])]);
									Y(i, {
										filled: !0,
										get value() {
											return R(e);
										},
										get options() {
											return R(t);
										},
										onchange: (e) => X("nav", () => {
											e ? R(D).nav.cart.href = e : delete R(D).nav.cart.href;
										})
									});
								}
								T(t), I((e, n) => {
									q(t, "title", e), H(r, n);
								}, [() => J("tip.cart.checkout"), () => J("lbl.checkoutPage")]), V(e, t);
							};
							U(f, (e) => {
								R(D).nav.cart?.show && e(p);
							}), T(i), I((e, t, n) => {
								H(s, e), q(l, "title", t), Oi(u, R(D).nav.cart?.show === !0), H(d, ` ${n ?? ""}`);
							}, [
								() => J("lbl.cart"),
								() => J("tip.nav.cart"),
								() => J("lbl.showInMenu")
							]), z("change", u, (e) => X("nav", () => {
								e.target.checked ? R(D).nav.cart = {
									...R(D).nav.cart ?? {},
									show: !0
								} : delete R(D).nav.cart;
							})), V(t, i);
						}, c = (t) => {
							var i = ay(), a = M(i), o = M(a), s = M(o, !0), c = F(s);
							e(c, () => n, () => R(r)), T(o), T(a);
							var l = F(a, 2), u = M(l), d = M(u);
							G(d);
							var f = F(d);
							T(u);
							var p = F(u, 2), m = (e) => {
								var t = iy(), n = N(t), r = M(n), i = P(r, !0), a = F(r, 2);
								Qr(a, 21, () => R($u), ([e, t]) => e, (e, t) => {
									var n = /* @__PURE__ */ O(() => g(R(t), 2));
									let r = () => R(n)[0], i = () => R(n)[1];
									var a = Av();
									let o;
									var s = M(a);
									W(s, () => y[r()]);
									var c = P(F(s), !0);
									T(a), I(() => {
										o = xi(a, 1, "tile svelte-1n46o8q", null, o, { on: (R(D).nav.launcher?.view ?? "grid") === r() }), q(a, "aria-pressed", (R(D).nav.launcher?.view ?? "grid") === r()), H(c, i());
									}), z("click", a, () => Su("view", r() === "grid" ? void 0 : r())), V(e, a);
								}), T(a), T(n);
								var o = F(n, 2);
								{
									let e = /* @__PURE__ */ O(() => J("lbl.launcherMobileView")), t = /* @__PURE__ */ O(() => J("tip.nav.launcherMobileView")), n = /* @__PURE__ */ O(() => R(D).nav.launcher?.mobileView ?? ""), r = /* @__PURE__ */ O(() => [["", J("lbl.navSameAsDesktop")], ...R($u)]);
									lc(o, {
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
										onchange: (e) => Su("mobileView", e || void 0)
									});
								}
								var s = F(o, 2), c = M(s), l = P(c, !0), u = F(c, 2);
								G(u);
								var d = P(F(u, 2), !0);
								T(s);
								var f = F(s, 2), p = M(f);
								G(p);
								var m = F(p);
								T(f);
								var h = F(f, 2), _ = (e) => {
									var t = Zv(), n = M(t), r = P(n, !0), i = F(n, 2);
									G(i), T(t), I((e, n, a) => {
										q(t, "title", e), H(r, n), q(i, "placeholder", a), K(i, R(D).nav.launcher?.title ?? "");
									}, [
										() => J("tip.nav.launcherTitleText"),
										() => J("lbl.launcherTitle"),
										() => J("ph.launcherTitle")
									]), z("change", i, (e) => Su("title", e.target.value.trim() || void 0)), V(e, t);
								};
								U(h, (e) => {
									R(D).nav.launcher?.showTitle !== !1 && e(_);
								});
								var v = F(h, 2), b = M(v), x = P(b, !0), S = F(b, 2), ee = M(S);
								{
									let e = /* @__PURE__ */ O(() => R(D).nav.launcher?.icon ?? ""), t = /* @__PURE__ */ O(() => R(D).nav.launcher?.image ?? ""), n = /* @__PURE__ */ O(bu), r = /* @__PURE__ */ O(() => J("opt.launcherDots")), i = /* @__PURE__ */ O(() => J("tip.nav.launcherIcon"));
									Ko(ee, {
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
										onpick: (e) => xu(null, e),
										onfile: (e) => Au(e, null),
										children: (e, t) => {
											var n = Lr(), r = N(n), i = (e) => {
												var t = Qv();
												I(() => q(t, "src", R(D).nav.launcher.image)), V(e, t);
											}, a = (e) => {
												var t = Lr();
												W(N(t), () => vo(R(D).nav.launcher.icon) || ""), V(e, t);
											}, o = (e) => {
												var t = Lr();
												W(N(t), () => vu), V(e, t);
											};
											U(r, (e) => {
												R(D).nav.launcher?.image ? e(i) : R(D).nav.launcher?.icon ? e(a, 1) : e(o, -1);
											}), V(e, n);
										},
										$$slots: { default: !0 }
									});
								}
								var te = F(ee, 2), ne = M(te), re = (e) => {
									var t = Ir();
									I((e) => H(t, e), [() => J("mp.ownImage")]), V(e, t);
								}, ie = (e) => {
									var t = Ir();
									I((e) => H(t, e), [() => J(go[R(D).nav.launcher.icon]?.labelKey ?? "common.none")]), V(e, t);
								}, ae = (e) => {
									var t = Ir();
									I((e) => H(t, e), [() => J("opt.launcherDots")]), V(e, t);
								};
								U(ne, (e) => {
									R(D).nav.launcher?.image ? e(re) : R(D).nav.launcher?.icon ? e(ie, 1) : e(ae, -1);
								}), T(te), T(S), T(v);
								var oe = F(v, 2);
								Qr(oe, 17, () => R(D).nav.launcher?.links ?? [], Jr, (e, t, n) => {
									let r = /* @__PURE__ */ O(() => !tp(R(t).href ?? ""));
									var i = ry();
									let a;
									var o = M(i), s = M(o), c = M(s), l = (e) => {
										var n = Dv();
										I(() => q(n, "src", R(t).image)), V(e, n);
									}, u = (e) => {
										var n = Lr();
										W(N(n), () => vo(R(t).icon) || ""), V(e, n);
									};
									U(c, (e) => {
										R(t).image ? e(l) : e(u, -1);
									}), T(s);
									var d = F(s, 2), f = P(d, !0), p = F(d, 2), m = (e) => {
										var t = $v();
										W(t, () => C.warn, !0), T(t), I((e) => q(t, "title", e), [() => J("tip.badTarget")]), V(e, t);
									};
									U(p, (e) => {
										R(r) && e(m);
									});
									var h = F(p, 2), g = M(h);
									g.disabled = n === 0, W(g, () => C.up, !0), T(g);
									var _ = F(g, 2);
									W(_, () => C.down, !0), T(_), T(h);
									var v = F(h, 2);
									W(v, () => C.caret, !0), T(v), T(o);
									var y = F(o, 2), b = (e) => {
										var i = ny(), a = M(i);
										{
											let e = /* @__PURE__ */ O(() => R(t).icon ?? ""), r = /* @__PURE__ */ O(() => R(t).image ?? ""), i = /* @__PURE__ */ O(bu), o = /* @__PURE__ */ O(() => J("mp.pickMark"));
											Ko(a, {
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
												onpick: (e) => xu(n, e),
												onfile: (e) => Au(e, n),
												children: (e, n) => {
													var r = ey(), i = N(r), a = M(i), o = (e) => {
														var n = Dv();
														I(() => q(n, "src", R(t).image)), V(e, n);
													}, s = (e) => {
														var n = Lr();
														W(N(n), () => vo(R(t).icon) || ""), V(e, n);
													};
													U(a, (e) => {
														R(t).image ? e(o) : R(t).icon && e(s, 1);
													}), T(i);
													var c = P(F(i, 2), !0);
													I((e) => H(c, e), [() => R(t).label || J("seed.link")]), V(e, r);
												},
												$$slots: { default: !0 }
											});
										}
										var o = F(a, 2), s = M(o);
										G(s);
										var c = F(s, 2);
										G(c);
										let l;
										var u = F(c, 2), d = (e) => {
											var t = ty(), n = P(t, !0);
											I((e) => H(n, e), [() => J("ui.badTarget")]), V(e, t);
										};
										U(u, (e) => {
											R(r) && e(d);
										});
										var f = F(u, 2), p = M(f);
										{
											let e = /* @__PURE__ */ O(() => R(t).icon ?? ""), r = /* @__PURE__ */ O(() => R(t).image ?? ""), i = /* @__PURE__ */ O(bu), a = /* @__PURE__ */ O(() => J("mp.pickMark"));
											Ko(p, {
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
												onpick: (e) => xu(n, e),
												onfile: (e) => Au(e, n),
												children: (e, t) => {
													je();
													var n = Ir();
													I((e) => H(n, e), [() => J("mp.changeMark")]), V(e, n);
												},
												$$slots: { default: !0 }
											});
										}
										var m = F(p, 2), h = P(m, !0);
										T(f), T(o), T(i), I((e, n, i, a, o, u) => {
											K(s, R(t).label), q(s, "title", e), q(s, "placeholder", n), l = xi(c, 1, "field-filled svelte-1n46o8q", null, l, { "bad-target": R(r) }), K(c, R(t).href ?? ""), q(c, "placeholder", i), q(c, "title", a), q(m, "title", o), H(h, u);
										}, [
											() => J("tip.nav.launcherLabel"),
											() => J("lbl.text"),
											() => J("ph.hrefAnchor"),
											() => R(r) ? J("tip.badTarget") : J("tip.hrefAnchor"),
											() => J("tip.removeLink"),
											() => J("ui.remove")
										]), z("change", s, (e) => ku(n, "label", e.target.value)), z("change", c, (e) => ku(n, "href", e.target.value)), z("click", m, () => wu(n)), V(e, i);
									};
									U(y, (e) => {
										R(yu) === n && e(b);
									}), T(i), I((e, t, r) => {
										a = xi(i, 1, "lrow svelte-1n46o8q", null, a, { open: R(yu) === n }), H(f, e), q(g, "title", t), q(_, "title", r), _.disabled = n === R(D).nav.launcher.links.length - 1;
									}, [
										() => R(t).label || J("seed.link"),
										() => J("tip.moveUp"),
										() => J("tip.moveDown")
									]), z("click", o, () => A(yu, R(yu) === n ? null : n, !0)), z("keydown", o, (e) => {
										(e.key === "Enter" || e.key === " ") && (e.preventDefault(), A(yu, R(yu) === n ? null : n, !0));
									}), z("click", h, (e) => e.stopPropagation()), z("keydown", h, (e) => e.stopPropagation()), z("click", g, () => Ou(n, -1)), z("click", _, () => Ou(n, 1)), V(e, i);
								});
								var se = F(oe, 2), ce = P(se, !0);
								I((e, t, n, r, o, c, h, g) => {
									H(i, e), q(a, "aria-label", t), q(s, "title", n), H(l, r), K(u, R(D).nav.launcher?.mobileMax ?? 6), H(d, R(D).nav.launcher?.mobileMax ?? 6), q(f, "title", o), Oi(p, R(D).nav.launcher?.showTitle !== !1), H(m, ` ${c ?? ""}`), H(x, h), H(ce, g);
								}, [
									() => J("lbl.design"),
									() => J("lbl.design"),
									() => J("tip.nav.launcherMobileMax"),
									() => J("lbl.launcherMobileMax"),
									() => J("tip.nav.launcherTitle"),
									() => J("lbl.launcherShowTitle"),
									() => J("lbl.launcherButton"),
									() => J("ui.addLauncherLink")
								]), z("input", u, (e) => Su("mobileMax", e.target.valueAsNumber === 6 ? void 0 : e.target.valueAsNumber)), z("change", p, (e) => Su("showTitle", e.target.checked ? void 0 : !1)), z("click", se, Cu), V(e, t);
							};
							U(p, (e) => {
								R(D).nav.launcher?.show === !0 && e(m);
							}), T(l), T(i), I((e, t, n, r) => {
								q(a, "title", e), H(s, t), q(u, "title", n), Oi(d, R(D).nav.launcher?.show === !0), H(f, ` ${r ?? ""}`);
							}, [
								() => J("tip.nav.launcher"),
								() => J("group.launcher"),
								() => J("tip.nav.launcher"),
								() => J("lbl.showInMenu")
							]), z("change", d, (e) => Su("show", e.target.checked ? !0 : void 0)), V(t, i);
						};
						U(a, (e) => {
							n === "theme" ? e(o) : n === "cart" ? e(s, 1) : e(c, -1);
						}), V(t, i);
					}), T(An);
				}
				T(Dn);
				var Pn = F(Dn, 2), Fn = M(Pn), In = P(Fn, !0), Ln = F(Fn, 2), Rn = M(Ln), zn = M(Rn), Bn = P(zn, !0), Vn = F(zn, 2);
				let L;
				Qr(Vn, 21, () => R(ed), ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ O(() => g(R(t), 2));
					let r = () => R(n)[0], i = () => R(n)[1];
					var a = Av();
					let o;
					var s = M(a);
					W(s, () => v[r()]);
					var c = P(F(s), !0);
					T(a), I(() => {
						o = xi(a, 1, "tile svelte-1n46o8q", null, o, { on: (R(D).nav.style?.subStyle ?? "card") === r() }), q(a, "aria-pressed", (R(D).nav.style?.subStyle ?? "card") === r()), H(c, i());
					}), z("click", a, () => au("subStyle", r() === "card" ? void 0 : r())), V(e, a);
				}), T(Vn), T(Rn);
				var Hn = F(Rn, 2), Un = (e) => {
					var t = Sg(), n = N(t), r = (e) => {
						var t = Sg(), n = N(t);
						{
							let e = /* @__PURE__ */ O(() => J("lbl.sideSubs")), t = /* @__PURE__ */ O(() => J("tip.nav.sideSubs")), r = /* @__PURE__ */ O(() => R(D).nav.style?.sideSubs ?? "collapsed"), i = /* @__PURE__ */ O(() => [["collapsed", J("opt.mobileSubs.collapsed")], ["expanded", J("opt.mobileSubs.expanded")]]);
							lc(n, {
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
								onchange: (e) => au("sideSubs", e === "collapsed" ? void 0 : e)
							});
						}
						var r = F(n, 2), i = (e) => {
							var t = Gh(), n = M(t);
							G(n);
							var r = F(n);
							T(t), I((e, i) => {
								q(t, "title", e), Oi(n, R(D).nav.style?.sideSubArrow === !0), H(r, ` ${i ?? ""}`);
							}, [() => J("tip.nav.sideSubArrow"), () => J("lbl.sideSubArrow")]), z("change", n, (e) => au("sideSubArrow", e.target.checked ? !0 : void 0)), V(e, t);
						};
						U(r, (e) => {
							R(D).nav.style?.sideSubs === "expanded" && e(i);
						}), V(e, t);
					};
					U(n, (e) => {
						R(ou) && e(r);
					});
					var i = F(n, 2), a = (e) => {
						{
							let t = /* @__PURE__ */ O(() => J("lbl.subOpen")), n = /* @__PURE__ */ O(() => J("tip.nav.subOpen")), r = /* @__PURE__ */ O(() => R(D).nav.style?.subOpen ?? "hover"), i = /* @__PURE__ */ O(() => [
								["hover", J("opt.subOpen.hover")],
								["stay", J("opt.subOpen.stay")],
								["click", J("opt.subOpen.click")]
							]);
							lc(e, {
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
								onchange: (e) => au("subOpen", e === "hover" ? void 0 : e)
							});
						}
					};
					U(i, (e) => {
						(!R(ou) || R(D).nav.style?.sideSubs !== "expanded") && e(a);
					}), V(e, t);
				}, Wn = /* @__PURE__ */ O(() => R(D).nav.items?.some((e) => e.children?.length));
				U(Hn, (e) => {
					R(Wn) && e(Un);
				});
				var Gn = F(Hn, 2), Kn = (e) => {
					var t = vh(), n = M(t), r = F(n);
					{
						let e = /* @__PURE__ */ O(() => R(D).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ O(co), n = /* @__PURE__ */ O(() => J("tip.nav.subPillColorPick"));
						Na(r, {
							get value() {
								return R(e);
							},
							get tokens() {
								return R(t);
							},
							get label() {
								return R(n);
							},
							onchange: (e) => au("subPillColor", e)
						});
					}
					T(t), I((e, r) => {
						q(t, "title", e), H(n, `${r ?? ""} `);
					}, [() => J("tip.nav.subPillColor"), () => J("lbl.subPillColor")]), V(e, t);
				};
				U(Gn, (e) => {
					R(D).nav.style?.subStyle === "pills" && e(Kn);
				});
				var qn = F(Gn, 2), Jn = M(qn), Yn = F(Jn);
				G(Yn), T(qn), T(Ln), T(Pn);
				var Xn = F(Pn, 2), Zn = M(Xn), Qn = P(Zn, !0), $n = F(Zn, 2);
				{
					let e = (e, t = f) => {
						let n = /* @__PURE__ */ O(em);
						var r = oy();
						let i;
						var a = M(r);
						W(a, () => am, !0), T(a);
						var o = F(a, 2), s = M(o), c = P(s, !0), l = P(F(s, 2), !0);
						T(o), T(r), I(() => {
							i = xi(r, 1, "nav-item ghost svelte-1n46o8q", null, i, { child: t() }), H(c, R(n).label), H(l, R(n).target);
						}), V(e, r);
					};
					var er = M($n);
					Qr(er, 21, () => R(D).nav.items, Jr, (t, n, r) => {
						let i = /* @__PURE__ */ O(() => `${r}`);
						var a = uy(), o = N(a), s = (t) => {
							e(t, () => !1);
						};
						U(o, (e) => {
							R(Xp)?.key === R(i) && R(Xp).pos === "before" && e(s);
						});
						var c = F(o, 2);
						let l;
						var u = M(c);
						W(u, () => am, !0), T(u);
						var d = F(u, 2), f = M(d);
						G(f);
						var p = F(f, 2), m = M(p);
						{
							let e = /* @__PURE__ */ O(() => R(n).page ?? (R(n).href == null ? "__none" : "__href")), t = /* @__PURE__ */ O(() => J("tip.linkTarget")), i = /* @__PURE__ */ O(() => [
								...R(D).pages.map((e) => [e.id, e.title]),
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
								onchange: (e) => Up(r, e)
							});
						}
						var h = F(m, 2), g = (e) => {
							var t = sy();
							G(t), I((e, r) => {
								K(t, R(n).href), q(t, "placeholder", e), q(t, "title", r);
							}, [() => J("ph.hrefAnchor"), () => J("tip.hrefAnchor")]), z("change", t, (e) => Wp(r, e.target.value)), V(e, t);
						};
						U(h, (e) => {
							!R(n).page && R(n).href != null && e(g);
						}), T(p), T(d);
						var _ = F(d, 2), v = (e) => {
							var t = cy();
							W(t, () => "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M6 9l6 6 6-6\"/></svg>", !0), T(t), I((e) => q(t, "title", e), [() => J("tip.nav.hasSubmenu")]), V(e, t);
						};
						U(_, (e) => {
							R(n).children?.length && e(v);
						});
						var y = F(_, 2), b = M(y);
						W(b, () => C.plus, !0), T(b);
						var x = F(b, 2);
						x.disabled = r === 0, W(x, () => C.up, !0), T(x);
						var S = F(x, 2);
						W(S, () => C.cross, !0), T(S);
						var ee = F(S, 2);
						W(ee, () => C.down, !0), T(ee), T(y);
						var te = F(y, 2);
						W(te, () => C.kebab, !0), T(te), T(c);
						var ne = F(c, 2);
						Qr(ne, 17, () => R(n).children ?? [], Jr, (t, i, a) => {
							let o = /* @__PURE__ */ O(() => `${r}.${a}`);
							var s = ly(), c = N(s), l = (t) => {
								e(t, () => !0);
							};
							U(c, (e) => {
								R(Xp)?.key === R(o) && R(Xp).pos === "before" && e(l);
							});
							var u = F(c, 2);
							let d;
							var f = M(u);
							W(f, () => am, !0), T(f);
							var p = F(f, 2), m = M(p);
							G(m);
							var h = F(m, 2), g = M(h);
							{
								let e = /* @__PURE__ */ O(() => R(i).page ?? "__href"), t = /* @__PURE__ */ O(() => J("tip.linkTarget")), n = /* @__PURE__ */ O(() => [...R(D).pages.map((e) => [e.id, e.title]), ["__href", J("opt.linkHref")]]);
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
									onchange: (e) => lm(r, a, e)
								});
							}
							var _ = F(g, 2), v = (e) => {
								var t = sy();
								G(t), I((e, n) => {
									K(t, R(i).href ?? ""), q(t, "placeholder", e), q(t, "title", n);
								}, [() => J("ph.hrefAnchor"), () => J("tip.hrefAnchor")]), z("change", t, (e) => um(r, a, e.target.value)), V(e, t);
							};
							U(_, (e) => {
								R(i).page || e(v);
							}), T(h), T(p);
							var y = F(p, 2), b = M(y);
							b.disabled = a === 0, W(b, () => C.up, !0), T(b);
							var x = F(b, 2);
							W(x, () => C.cross, !0), T(x);
							var S = F(x, 2);
							W(S, () => C.down, !0), T(S), T(y);
							var ee = F(y, 2);
							W(ee, () => C.kebab, !0), T(ee), T(u);
							var te = F(u, 2), ne = (t) => {
								e(t, () => !0);
							};
							U(te, (e) => {
								R(Xp)?.key === R(o) && R(Xp).pos === "after" && e(ne);
							}), I((e, t, r, s, c, l, p) => {
								d = xi(u, 1, "nav-item child svelte-1n46o8q", null, d, {
									selected: R(Jp) === R(o),
									dragging: R(Yp) === R(o)
								}), q(u, "data-key", R(o)), q(f, "title", e), K(m, R(i).label), q(m, "title", t), q(b, "title", r), q(x, "title", s), q(S, "title", c), S.disabled = a === R(n).children.length - 1, q(ee, "title", l), q(ee, "aria-label", p);
							}, [
								() => J("tip.nav.dragItem"),
								() => J("tip.nav.childLabel"),
								() => J("tip.moveUp"),
								() => J("tip.nav.removeChild"),
								() => J("tip.moveDown"),
								() => J("tip.nav.itemActions"),
								() => J("tip.nav.itemActions")
							]), z("click", u, (e) => {
								e.stopPropagation(), A(Jp, R(o));
							}), Dr("dragstart", f, (e) => {
								e.stopPropagation(), A(Yp, R(o)), e.dataTransfer?.setData(nm, R(o));
							}), Dr("dragend", f, tm), z("input", m, (e) => cm(r, a, e.target.value)), z("click", b, () => fm(r, a, -1)), z("click", x, () => pm(r, a)), z("click", S, () => fm(r, a, 1)), z("click", ee, (e) => {
								e.stopPropagation(), A(Jp, R(o));
							}), V(t, s);
						});
						var re = F(ne, 2), ie = (t) => {
							e(t, () => !0);
						};
						U(re, (e) => {
							R(Xp)?.key === R(i) && R(Xp).pos === "into" && e(ie);
						});
						var ae = F(re, 2), oe = (t) => {
							e(t, () => !1);
						};
						U(ae, (e) => {
							R(Xp)?.key === R(i) && R(Xp).pos === "after" && e(oe);
						}), I((e, t, a, o, s, d, p, m) => {
							l = xi(c, 1, "nav-item svelte-1n46o8q", null, l, {
								selected: R(Jp) === R(i),
								dragging: R(Yp) === R(i),
								"drop-target": R(Xp)?.key === R(i) && R(Xp).pos === "into"
							}), q(c, "data-key", R(i)), q(u, "title", e), K(f, R(n).label), q(f, "title", t), q(b, "title", a), q(x, "title", o), q(S, "title", s), q(ee, "title", d), ee.disabled = r === R(D).nav.items.length - 1, q(te, "title", p), q(te, "aria-label", m);
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
							A(Jp, R(i));
						}), Dr("dragstart", u, (e) => {
							A(Yp, R(i)), e.dataTransfer?.setData(nm, R(i));
						}), Dr("dragend", u, tm), z("input", f, (e) => Hp(r, e.target.value)), z("click", b, () => sm(r)), z("click", x, () => Gp(r, -1)), z("click", S, () => qp(r)), z("click", ee, () => Gp(r, 1)), z("click", te, () => {
							A(Jp, R(i));
						}), V(t, a);
					}), T(er);
					var tr = F(er, 2), nr = P(tr, !0), rr = F(tr, 2), ir = M(rr);
					G(ir);
					var ar = F(ir, 2), or = P(ar, !0);
					T(rr), T($n), I((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, ee, te, ne, re, ie, ae, C, oe, se, ce, le, ue, de, fe, pe, me, he, ge, w, _e, ve, ye, be, xe, Se, Ce, we, Te, Ee, De, Oe, ke, Ae, T, je) => {
						H(nr, Oe), q(rr, "title", ke), q(ir, "placeholder", Ae), ar.disabled = T, H(or, je);
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
						() => !R(ne).trim(),
						() => J("ui.newPageAsItem")
					]), Dr("dragover", er, rm), Dr("drop", er, (e) => {
						e.preventDefault(), im(R(Xp)?.key ?? "");
					}), z("click", tr, om), z("keydown", ir, (e) => {
						e.key === "Enter" && re();
					}), Mi(ir, () => R(ne), (e) => A(ne, e)), z("click", ar, re);
				}
				T(Xn), T(t), I((e, t, n, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, ee, te, ne, re, ie, C, oe, ce, de, fe, pe, me, he, ge, w, _e, ve, ye, be, xe, we, Ee, De, ke, Ae, T, je, Me, Pe, Re, ze, Be, Ve, Ue, We, Ge, Ke, qe) => {
					q(r, "title", e), H(i, t), H(S, n), H(ae, a), q(se, "title", o), H(le, s), q(ue, "aria-label", c), q(Se, "title", l), H(Ce, u), q(Te, "title", d), H(Oe, f), q(Ne, "title", p), H(Fe, m), q(Ie, "min", Is.min), q(Ie, "max", Is.max), q(Ie, "step", Is.step), K(Ie, R(uu)), q(Le, "min", Is.min), q(Le, "max", Is.max), K(Le, R(uu)), H(He, h), H(Xe, g), q(tt, "title", _), H(nt, v), q(st, "title", y), H(lt, b), q(ut, "min", Is.min), q(ut, "max", Is.max), q(ut, "placeholder", x), K(ut, R(D).nav.style?.mobile?.textSize ?? ""), q(ft, "title", ee), H(mt, te), q(gt, "title", ne), H(vt, re), q(xt, "title", ie), H(Ct, C), q(Ot, "title", oe), H(At, ce), q(Ft, "title", de), H(Lt, fe), H(Jt, pe), H(Zt, me), q(Qt, "aria-label", he), q(an, "title", ge), H(j, w), q(sn, "title", _e), H(ln, ve), q(un, "title", ye), Oi(dn, R(D).nav.style?.blur !== !1), H(fn, ` ${be ?? ""}`), H(hn, xe), q(yn, "title", we), H(bn, Ee), q(Sn, "title", De), Oi(Cn, R(D).nav.announcement?.show === !0), H(wn, ` ${ke ?? ""}`), q(On, "title", Ae), H(kn, T), H(In, je), H(Bn, Me), L = xi(Vn, 1, "tile-grid svelte-1n46o8q", null, L, {
						"cols-5": !R(ou),
						"cols-3": R(ou)
					}), q(Vn, "aria-label", Pe), q(qn, "title", Re), H(Jn, `${ze ?? ""} `), K(Yn, R(D).nav.style?.subColumns ?? 1), q(Zn, "title", Be), H(Qn, Ve);
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
					() => !R(ne).trim(),
					() => J("ui.newPageAsItem")
				]), z("input", Ie, (e) => au("textSize", e.target.valueAsNumber)), z("change", Le, (e) => Nu(e, "textSize", Is)), z("change", ut, (e) => Fu(e, "textSize", Is)), z("change", dn, (e) => au("blur", e.target.checked)), z("change", Cn, (e) => _u("show", e.target.checked ? !0 : void 0)), z("change", Yn, (e) => au("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), V(e, t);
			}, b = (e) => {
				var t = by(), n = M(t), r = M(n), i = F(r);
				G(i), T(n);
				var a = F(n, 2), o = M(a), s = F(o);
				G(s), T(a);
				var c = F(a, 2), l = M(c), u = F(l);
				{
					let e = /* @__PURE__ */ O(jl), t = /* @__PURE__ */ O(Ml);
					Y(u, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => Nl(e)
					});
				}
				T(c);
				var d = F(c, 2), f = M(d), p = F(f);
				G(p);
				let m;
				T(d);
				var h = F(d, 2), _ = (e) => {
					var t = fy(), n = P(t, !0);
					I((e) => H(n, e), [() => J("settings.timeZoneBad")]), V(e, t);
				};
				U(h, (e) => {
					R(Ql) && e(_);
				});
				var v = F(h, 2), y = M(v), b = F(y);
				{
					let e = /* @__PURE__ */ O(() => Gm(R(D))), t = /* @__PURE__ */ O(() => Wm.map((e) => [
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
						onchange: (e) => Yl(e)
					});
				}
				T(v);
				var x = F(v, 2), S = M(x), ee = F(S);
				G(ee), T(x);
				var te = F(x, 2), ne = M(te), re = P(ne, !0), ie = F(ne, 2), ae = M(ie), oe = M(ae);
				W(oe, () => C.plus);
				var se = F(oe);
				T(ae);
				var ce = F(ae, 2), le = (e) => {
					var t = hy();
					Qr(t, 23, zl, (e) => e.id, (e, t, n) => {
						let r = /* @__PURE__ */ O(() => R(Il) === R(t).id);
						var i = my();
						let a;
						var o = M(i), s = M(o);
						let c;
						var l = F(s, 2), u = M(l), d = P(u, !0), f = P(F(u, 2), !0);
						T(l);
						var p = F(l, 2);
						W(p, () => C.down, !0), T(p), T(o);
						var m = F(o, 2), h = M(m), _ = M(h), v = M(_), y = P(v, !0), b = F(v, 2), x = M(b), S = F(x);
						G(S), T(b);
						var ee = F(b, 2), te = M(ee), ne = F(te);
						G(ne), T(ee);
						var re = F(ee, 2), ie = M(re), ae = F(ie);
						G(ae), T(re);
						var oe = F(re, 2), se = P(oe, !0), ce = F(oe, 2), le = M(ce), ue = M(le);
						{
							let e = /* @__PURE__ */ O(() => R(t).color || "accent"), r = /* @__PURE__ */ O(co), i = /* @__PURE__ */ O(() => J("siteCal.colorMain"));
							Na(ue, {
								get value() {
									return R(e);
								},
								get tokens() {
									return R(r);
								},
								get label() {
									return R(i);
								},
								onchange: (e) => Kl(R(n), "color", e ?? "")
							});
						}
						var de = P(F(ue, 2), !0);
						T(le), Qr(F(le, 2), 16, () => [
							["colorText", "siteCal.colorText"],
							["colorBox", "siteCal.colorBox"],
							["colorChip", "siteCal.colorChip"]
						], ([e, t]) => e, (e, r) => {
							var i = /* @__PURE__ */ O(() => g(r, 2));
							let a = () => R(i)[0], o = () => R(i)[1];
							var s = py(), c = M(s);
							{
								let e = /* @__PURE__ */ O(() => R(t)[a()] || ""), r = /* @__PURE__ */ O(co), i = /* @__PURE__ */ O(() => J(o()));
								Na(c, {
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
									onchange: (e) => Kl(R(n), a(), e ?? "")
								});
							}
							var l = P(F(c, 2), !0);
							T(s), I((e, t) => {
								q(s, "title", e), H(l, t);
							}, [() => J(`tip.${o()}`), () => J(o())]), V(e, s);
						}), T(ce);
						var fe = F(ce, 2), pe = P(fe, !0), me = F(fe, 2), he = M(me), ge = F(he);
						G(ge), T(me);
						var w = F(me, 2), _e = M(w), ve = F(_e);
						G(ve), T(w);
						var ye = F(w, 2), be = M(ye);
						G(be);
						var xe = F(be);
						T(ye);
						var Se = F(ye, 2), Ce = M(Se);
						G(Ce);
						var we = F(Ce);
						T(Se);
						var Te = F(Se, 2), Ee = M(Te), De = M(Ee);
						W(De, () => C.up, !0), T(De);
						var Oe = F(De, 2);
						W(Oe, () => C.down, !0), T(Oe), T(Ee);
						var ke = F(Ee, 2), Ae = P(ke, !0);
						T(Te), T(_), T(h), T(m), T(i), I((e, l, u, p, h, g, _, v, b, ee, C, oe, ce, ue, fe, Te, Ee, T, je, Me, Ne, Pe, Fe, Ie, Le, Re) => {
							a = xi(i, 1, "site-cal-row svelte-1n46o8q", null, a, { open: R(r) }), q(o, "aria-expanded", R(r)), c = Ci(s, "", c, { background: e }), H(d, l), H(f, u), m.inert = !R(r), H(y, p), H(x, `${h ?? ""} `), K(S, R(t).name ?? ""), q(S, "placeholder", g), q(S, "title", _), q(S, "data-cal-name", R(t).id), H(te, `${v ?? ""} `), K(ne, R(t).url), q(ne, "placeholder", b), q(re, "title", ee), H(ie, `${C ?? ""} `), K(ae, R(t).description ?? ""), H(se, oe), q(le, "title", ce), H(de, ue), H(pe, fe), q(me, "title", Te), H(he, `${Ee ?? ""} `), K(ge, R(t).link ?? ""), q(w, "title", T), H(_e, `${je ?? ""} `), K(ve, R(t).organizer ?? ""), q(ye, "title", Me), Oi(be, R(t).subscribable !== !1), H(xe, ` ${Ne ?? ""}`), q(Se, "title", Pe), Oi(Ce, R(t).inFilter !== !1), H(we, ` ${Fe ?? ""}`), De.disabled = R(n) === 0, Oe.disabled = Ie, q(ke, "title", Le), H(Ae, Re);
						}, [
							() => Ll(R(t).color),
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
							() => R(n) === zl().length - 1,
							() => J("tip.site.removeCalendar"),
							() => J("siteCal.remove")
						]), z("click", o, () => A(Il, R(r) ? null : R(t).id, !0)), z("change", S, (e) => Kl(R(n), "name", e.target.value)), z("change", ne, (e) => Kl(R(n), "url", e.target.value, !0)), z("change", ae, (e) => Kl(R(n), "description", e.target.value)), z("change", ge, (e) => Kl(R(n), "link", e.target.value)), z("change", ve, (e) => Kl(R(n), "organizer", e.target.value)), z("change", be, (e) => ql(R(n), "subscribable", e.target.checked)), z("change", Ce, (e) => ql(R(n), "inFilter", e.target.checked)), z("click", De, () => Ul(R(n), -1)), z("click", Oe, () => Ul(R(n), 1)), z("click", ke, () => Hl(R(n))), V(e, i);
					}), T(t), V(e, t);
				}, ue = /* @__PURE__ */ O(() => zl().length);
				U(ce, (e) => {
					R(ue) && e(le);
				}), T(ie), T(te);
				var de = F(te, 4), fe = P(de, !0), pe = F(de, 2), me = M(pe);
				Qr(me, 17, () => R(hl), (e) => e.screen, (e, t) => {
					var n = gy(), r = M(n), i = P(r, !0), a = F(r, 2);
					let o;
					var s = P(a), c = P(F(a, 2), !0);
					T(n), I(() => {
						H(i, R(t).screen), o = xi(a, 1, "cw-bar svelte-1n46o8q", null, o, { fluid: !R(t).bound }), Ci(s, `width:${R(t).pct ?? ""}%`), H(c, R(t).bound ? `${R(t).margin}` : "-");
					}), V(e, n);
				});
				var he = F(me, 2), ge = M(he), w = P(ge, !0), _e = P(F(ge, 2), !0);
				T(he);
				var ve = F(he, 2), ye = (e) => {
					var t = _y(), n = P(t, !0);
					I((e) => H(n, e), [() => J("lbl.bindsFrom", { n: R(Ve) })]), V(e, t);
				};
				U(ve, (e) => {
					R(ll) !== "full" && e(ye);
				}), T(pe);
				var be = F(pe, 2);
				Qr(be, 21, () => Os, (e) => e.id, (e, t) => {
					var n = uv();
					let r;
					var i = P(n, !0);
					I((e) => {
						r = xi(n, 1, "svelte-1n46o8q", null, r, { on: R(dl) === R(t).id }), H(i, e);
					}, [() => J(`lbl.width.${R(t).id}`)]), z("click", n, () => Ol(R(t).width)), V(e, n);
				}), T(be);
				var xe = F(be, 2), Se = (e) => {
					var t = vy(), n = M(t), r = P(n, !0), i = F(n, 2);
					G(i);
					var a = P(F(i, 2));
					T(t), I((e, n) => {
						q(t, "title", e), H(r, n), q(i, "min", 960), q(i, "max", Es), q(i, "step", 20), K(i, R(ml)), H(a, `${R(ml) ?? ""} px`);
					}, [() => J("tip.site.contentWidthFree"), () => J("lbl.widthFree")]), z("input", i, (e) => Ol(e.target.valueAsNumber)), V(e, t);
				};
				U(xe, (e) => {
					R(ll) !== "full" && e(Se);
				});
				var Ce = F(xe, 2), we = P(Ce, !0), Te = F(Ce, 2);
				Qr(Te, 21, () => Ds, (e) => e.id, (e, t) => {
					var n = uv();
					let r;
					var i = P(n, !0);
					I((e) => {
						r = xi(n, 1, "svelte-1n46o8q", null, r, { on: R(fl) === R(t).id }), H(i, e);
					}, [() => J(`lbl.gutter.${R(t).id}`)]), z("click", n, () => Al(R(t).gutter)), V(e, n);
				}), T(Te);
				var Ee = F(Te, 2), De = M(Ee), Oe = P(De, !0), ke = F(De, 2), Ae = M(ke), je = M(Ae), Me = P(je, !0), Ne = F(je, 2);
				G(Ne);
				var Pe = P(F(Ne, 2));
				T(Ae), T(ke), T(Ee);
				var Fe = F(Ee, 4), Ie = M(Fe), Le = F(Ie), Re = (e) => {
					var t = xv();
					I((e) => {
						q(t, "src", R(D).site.icon), q(t, "alt", e);
					}, [() => J("lbl.siteIcon")]), V(e, t);
				};
				U(Le, (e) => {
					R(D).site.icon && e(Re);
				}), T(Fe);
				var ze = F(Fe, 2), Be = M(ze), He = M(Be), Ue = F(He);
				T(Be);
				var We = F(Be, 2), Ge = (e) => {
					var t = yy(), n = N(t);
					W(n, () => C.pencil ?? "✎", !0), T(n);
					var r = F(n, 2);
					W(r, () => C.cross, !0), T(r), I((e, t) => {
						q(n, "title", e), q(r, "title", t);
					}, [() => J("tip.site.editIcon"), () => J("tip.site.removeIcon")]), z("click", n, () => A(nl, R(D).site.icon, !0)), z("click", r, al), V(e, t);
				};
				U(We, (e) => {
					R(D).site.icon && e(Ge);
				}), T(ze), T(t), I((e, t, u, h, g, _, b, te, ie, ae, C, oe, ce, le, ue, pe, me, he, ge, ve, ye, be, xe, Se, Te, De, ke, T, je, Fe) => {
					q(n, "title", e), H(r, `${t ?? ""} `), K(i, R(D).site.title ?? ""), q(i, "placeholder", u), q(a, "title", h), H(o, `${g ?? ""} `), K(s, R(D).site.description ?? ""), q(s, "placeholder", _), q(c, "title", b), H(l, `${te ?? ""} `), q(d, "title", ie), H(f, `${ae ?? ""} `), K(p, R(D).site.timeZone ?? ""), m = xi(p, 1, "svelte-1n46o8q", null, m, { "place-error": R(Ql) }), q(v, "title", C), H(y, `${oe ?? ""} `), q(x, "title", ce), H(S, `${le ?? ""} `), K(ee, ue), q(ne, "title", pe), H(re, me), H(se, ` ${he ?? ""}`), q(de, "title", ge), H(fe, ve), H(w, ye), H(_e, be), q(Ce, "title", xe), H(we, Se), Ee.open = R(fl) === null || R(pl), H(Oe, Te), q(Ae, "title", De), H(Me, ke), q(Ne, "min", 0), q(Ne, "max", 12), q(Ne, "step", 1), K(Ne, R(ul)), H(Pe, `${R(ul) ?? ""} vw`), H(Ie, `${T ?? ""} `), q(Be, "title", je), H(He, `${Fe ?? ""} `);
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
					() => (R(D).site.meetingHosts ?? []).join(", "),
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
					() => R(D).site.icon ? J("ui.changeIcon") : J("ui.chooseIcon")
				]), z("input", i, (e) => ol(e.target.value)), z("input", s, (e) => sl(e.target.value)), z("change", p, (e) => $(e.target.value)), z("change", ee, (e) => Pl(e.target.value)), z("click", ae, () => Vl()), zi("open", "toggle", te, (e) => A(Fl, e), () => R(Fl)), Dr("toggle", Ee, (e) => A(pl, e.currentTarget.open, !0)), z("input", Ne, (e) => Al(e.target.valueAsNumber)), z("change", Ue, rl), V(e, t);
			}, x = (e) => {
				var t = Dy();
				{
					let e = (e, t = f, n = f) => {
						var r = Sy(), i = M(r), a = (e) => {
							var t = xy(), r = P(t, !0);
							I(() => H(r, n())), V(e, t);
						};
						U(i, (e) => {
							n() && e(a);
						});
						var o = F(i, 2), s = M(o), c = P(s, !0), l = F(s, 2), u = P(l, !0), d = F(l, 2), p = M(d), m = P(p, !0), h = P(F(p), !0);
						T(d), T(o), T(r), I((e, t, n, r, i, a, s, l, d) => {
							Ci(o, `--tv-bg:${e ?? ""};--tv-surface:${t ?? ""};--tv-text:${n ?? ""};--tv-accent:${r ?? ""};--tv-accent-ink:${i ?? ""}`), H(c, a), H(u, s), H(m, l), H(h, d);
						}, [
							() => Um(t().bg, t()),
							() => Um(t().surface, t()),
							() => Um(t().text, t()),
							() => Um(t().accent, t()),
							() => Um(t()["accent-text"] ?? ue(Um(t().accent ?? "#000000", t())), t()),
							() => J("preview.heading"),
							() => J("preview.cardBody"),
							() => J("preview.button"),
							() => J("preview.link")
						]), V(e, r);
					};
					var n = M(t), r = P(n, !0), i = F(n, 2);
					Qr(i, 21, () => Ih, (e) => e.id, (e, t) => {
						var n = Cy();
						let r;
						var i = M(n), a = M(i), o = F(a), s = F(o), c = F(s);
						T(i);
						var l = P(F(i, 2), !0);
						T(n), I(() => {
							r = xi(n, 1, "theme-preset svelte-1n46o8q", null, r, { sel: R(Fb) === R(t).id }), q(n, "title", `${R(t).name} - ${R(t).note}`), Ci(a, `background:${R(t).light.bg ?? ""}`), Ci(o, `background:${R(t).light.surface ?? ""}`), Ci(s, `background:${R(t).light.accent ?? ""}`), Ci(c, `background:${R(t).light.text ?? ""}`), H(l, R(t).name);
						}), z("click", n, () => Pb(R(t))), V(e, n);
					}), T(i);
					var a = F(i, 2), o = P(a, !0), s = F(a, 2), c = M(s);
					G(c);
					var l = F(c);
					T(s);
					var u = F(s, 2), d = (e) => {
						var t = wy(), n = M(t), r = P(n, !0), i = F(n, 2), a = M(i);
						let o;
						var s = P(a, !0), c = F(a, 2);
						let l;
						var u = P(c, !0);
						T(i), T(t), I((e, t, n, i) => {
							H(r, e), q(a, "title", t), o = xi(a, 1, "svelte-1n46o8q", null, o, { on: R(fo) }), H(s, n), l = xi(c, 1, "svelte-1n46o8q", null, l, { on: !R(fo) }), H(u, i);
						}, [
							() => J("lbl.darkColors"),
							() => J("hint.theme.autoDark"),
							() => J("opt.auto"),
							() => J("opt.custom")
						]), z("click", a, () => Nm(!0)), z("click", c, () => Nm(!1)), V(e, t);
					};
					U(u, (e) => {
						R(uo) && e(d);
					});
					var p = F(u, 2), m = M(p), h = (e) => {
						var t = Gg(), n = P(t, !0);
						I((e) => H(n, e), [() => J("lbl.light")]), V(e, t);
					};
					U(m, (e) => {
						R(uo) && e(h);
					});
					var _ = F(m, 2);
					let Re;
					var v = P(_, !0);
					T(p);
					var y = F(p, 2);
					Qr(y, 21, () => lo, ([e, t, n]) => e, (e, t) => {
						var n = /* @__PURE__ */ O(() => g(R(t), 3));
						let r = () => R(n)[0], i = () => R(n)[1], a = () => R(n)[2];
						var o = Ty(), s = M(o);
						{
							let e = /* @__PURE__ */ O(() => R(D).theme.tokens.color[r()] ?? gm(r(), R(mo))), t = /* @__PURE__ */ O(co);
							Na(s, {
								get value() {
									return R(e);
								},
								get tokens() {
									return R(t);
								},
								get label() {
									return i();
								},
								onchange: (e) => mm(r(), e)
							});
						}
						var c = F(s, 2), l = P(c, !0), u = P(F(c, 2), !0);
						T(o), I((e) => {
							H(l, a()), H(u, e);
						}, [() => Um(R(D).theme.tokens.color[r()] ?? gm(r(), R(mo)), R(mo))]), V(e, o);
					}), T(y);
					var b = F(y, 2), x = (e) => {
						var t = Ey(), n = N(t), r = M(n), i = P(r, !0), a = F(r, 2);
						let o;
						var s = P(a, !0);
						T(n);
						var c = F(n, 2);
						let l;
						Qr(c, 21, () => lo, ([e, t, n]) => e, (e, t) => {
							var n = /* @__PURE__ */ O(() => g(R(t), 3));
							let r = () => R(n)[0], i = () => R(n)[1], a = () => R(n)[2];
							var o = Ty(), s = M(o);
							{
								let e = /* @__PURE__ */ O(() => R(D).theme.alt.tokens.color[r()] ?? R(ho)[r()] ?? gm(r(), R(ho))), t = /* @__PURE__ */ O(co), n = /* @__PURE__ */ O(() => J("theme.darkColorLabel", { name: i() }));
								Na(s, {
									get value() {
										return R(e);
									},
									get tokens() {
										return R(t);
									},
									get label() {
										return R(n);
									},
									onchange: (e) => Am(r(), e)
								});
							}
							var c = F(s, 2), l = P(c, !0), u = P(F(c, 2), !0);
							T(o), I((e) => {
								H(l, a()), H(u, e);
							}, [() => Um(R(D).theme.alt.tokens.color[r()] ?? R(ho)[r()] ?? gm(r(), R(ho)), R(ho))]), V(e, o);
						}), T(c), I((e, t, n) => {
							H(i, e), o = xi(a, 1, "chip svelte-1n46o8q", null, o, { accent: R(po) === "dark" }), q(a, "title", t), H(s, n), l = xi(c, 1, "palcells svelte-1n46o8q", null, l, { autopal: R(fo) });
						}, [
							() => J("lbl.dark"),
							() => J("tip.theme.darkDefault"),
							() => J("common.standard")
						]), z("click", a, () => jm("dark")), V(e, t);
					};
					U(b, (e) => {
						R(uo) && e(x);
					});
					var S = F(b, 2), ee = M(S), te = P(ee, !0), ne = F(ee, 2);
					let ze;
					var re = P(ne, !0);
					T(S);
					var ie = F(S, 2), ae = M(ie);
					{
						let t = /* @__PURE__ */ O(() => R(uo) ? J("lbl.light") : "");
						e(ae, () => R(mo), () => R(t));
					}
					var C = F(ae, 2), oe = (t) => {
						{
							let n = /* @__PURE__ */ O(() => J("lbl.dark"));
							e(t, () => R(ho), () => R(n));
						}
					};
					U(C, (e) => {
						R(uo) && e(oe);
					}), T(ie);
					var se = F(ie, 2), ce = M(se), le = P(ce, !0), de = F(ce, 2), fe = M(de), pe = M(fe), me = F(pe);
					{
						let e = /* @__PURE__ */ O(() => Im("heading"));
						Y(me, {
							get value() {
								return R(D).theme.tokens.font.heading;
							},
							get options() {
								return R(e);
							},
							onchange: (e) => Em("heading", e)
						});
					}
					T(fe);
					var he = F(fe, 2), ge = M(he), w = F(ge);
					{
						let e = /* @__PURE__ */ O(() => Im("body"));
						Y(w, {
							get value() {
								return R(D).theme.tokens.font.body;
							},
							get options() {
								return R(e);
							},
							onchange: (e) => Em("body", e)
						});
					}
					T(he);
					var _e = F(he, 2), ve = M(_e), ye = P(ve, !0), be = F(ve, 2), xe = P(be, !0);
					T(_e), T(de), T(se);
					var Se = F(se, 2), Ce = M(Se), we = P(Ce, !0), Te = F(Ce, 2), Ee = M(Te), De = M(Ee), Oe = P(De, !0), ke = P(F(De, 2), !0);
					T(Ee);
					var Ae = F(Ee, 2), je = M(Ae, !0), Me = P(F(je), !0);
					T(Ae);
					var Ne = F(Ae, 2);
					G(Ne);
					var Pe = F(Ne, 2), Fe = M(Pe, !0), Ie = P(F(Fe), !0);
					T(Pe);
					var Le = F(Pe, 2);
					G(Le), T(Te), T(Se), T(t), I((e, t, n, i, a, u, d, f, p, m, h, g, y, b, x, ee, ie, ae, C, oe, se) => {
						H(r, e), H(o, t), q(s, "title", n), Oi(c, R(uo)), H(l, ` ${i ?? ""}`), Re = xi(_, 1, "chip svelte-1n46o8q", null, Re, { accent: R(po) === "light" }), q(_, "title", a), H(v, u), q(S, "title", d), H(te, f), ze = xi(ne, 1, "chip palauto svelte-1n46o8q", null, ze, { accent: R(_m) }), H(re, p), H(le, m), H(pe, `${h ?? ""} `), H(ge, `${g ?? ""} `), Ci(ve, `font-family:${R(D).theme.tokens.font.heading ?? ""}`), H(ye, y), Ci(be, `font-family:${R(D).theme.tokens.font.body ?? ""}`), H(xe, b), H(we, x), Ci(Ee, `--r-sm:${R(D).theme.tokens.radius.sm ?? ""};--r-md:${R(D).theme.tokens.radius.md ?? ""}`), H(Oe, ee), H(ke, ie), H(je, ae), H(Me, R(D).theme.tokens.radius.sm), K(Ne, C), H(Fe, oe), H(Ie, R(D).theme.tokens.radius.md), K(Le, se);
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
						() => Lm(R(D).theme.tokens.radius.sm),
						() => J("lbl.largeCorners"),
						() => Lm(R(D).theme.tokens.radius.md)
					]), z("change", c, (e) => Mm(e.target.checked)), z("click", _, () => jm("light")), z("click", ne, () => Tm(!R(_m))), z("input", Ne, (e) => Rm("sm", Number(e.target.value))), z("input", Le, (e) => Rm("md", Number(e.target.value)));
				}
				V(e, t);
			}, S = (e) => {
				var t = My();
				let n;
				var r = M(t);
				G(r);
				var i = F(r, 2), a = (e) => {
					var t = Lr();
					Qr(N(t), 17, () => lf(ux(), R(lx), (e) => e.label), (e) => e.label, (e, t) => {
						var n = Lr(), r = N(n), i = (e) => {
							var n = Oy(), r = M(n), i = F(r);
							T(n), I((e) => {
								q(n, "title", e), H(r, `${R(t).label ?? ""} `);
							}, [() => J("tip.webpAuto")]), z("change", i, px), V(e, n);
						}, a = (e) => {
							var n = ky(), r = M(n), i = F(r);
							T(n), I((e) => {
								q(n, "title", e), H(r, `${R(t).label ?? ""} `);
							}, [() => J("tip.blocks.galleryImages")]), z("change", i, _x), V(e, n);
						}, o = (e) => {
							var n = _g(), r = P(n, !0);
							I(() => H(r, R(t).label)), z("click", n, () => dx(R(t))), V(e, n);
						};
						U(r, (e) => {
							R(t).act === "image" ? e(i) : R(t).act === "galleryImages" ? e(a, 1) : e(o, -1);
						}), V(e, n);
					}, (e) => {
						var t = Lh(), n = P(t, !0);
						I((e) => H(n, e), [() => J("canvas.searchEmpty")]), V(e, t);
					}), V(e, t);
				}, o = /* @__PURE__ */ O(() => R(lx).trim()), s = (e) => {
					var t = jy(), n = N(t), r = M(n), i = P(r, !0), a = F(r, 2), o = M(a), s = P(o, !0), c = F(o, 2), l = P(c, !0);
					T(a), T(n);
					var u = F(n, 2), d = P(u, !0), f = F(u, 2), p = M(f), m = F(p);
					T(f);
					var h = F(f, 2), g = P(h, !0), _ = F(h, 2), v = P(_, !0), y = F(_, 2), b = P(y, !0), x = F(y, 2), S = P(x, !0), ee = F(x, 2), te = P(ee, !0), ne = F(ee, 2), re = P(ne, !0), ie = F(ne, 2), ae = P(ie, !0), C = F(ie, 2), oe = P(C, !0), se = F(C, 2), ce = P(se, !0), le = F(se, 2), ue = P(le, !0), de = F(le, 2), fe = P(de, !0), pe = F(de, 2), me = P(pe, !0), he = F(pe, 2), ge = P(he, !0), w = F(he, 2), _e = P(w, !0), ve = F(w, 2), ye = P(ve, !0), be = F(ve, 2), xe = P(be, !0), Se = F(be, 2), Ce = P(Se, !0), we = F(Se, 2), Te = M(we), Ee = P(Te, !0), De = F(Te, 2), Oe = M(De), ke = P(Oe, !0), Ae = F(Oe, 2), je = M(Ae), Me = F(je);
					T(Ae), T(De), T(we);
					var Ne = F(we, 2), Pe = M(Ne), Fe = P(Pe, !0), Ie = F(Pe, 2), Le = M(Ie), Re = P(Le, !0), ze = F(Le, 2), Be = P(ze, !0), Ve = F(ze, 2), He = P(Ve, !0), Ue = F(Ve, 2), We = P(Ue, !0), Ge = F(Ue, 2), Ke = P(Ge, !0);
					T(Ie);
					var qe = F(Ie, 2), Je = M(qe), Ye = P(Je, !0);
					T(qe), T(Ne);
					var Xe = F(Ne, 2), Ze = M(Xe), Qe = P(Ze, !0), $e = F(Ze, 2), et = M($e), tt = P(et, !0), nt = F(et, 2), rt = P(nt, !0), it = F(nt, 2), E = P(it, !0), at = F(it, 2), D = P(at, !0), st = F(at, 2), ct = P(st, !0);
					T($e), T(Xe);
					var lt = F(Xe, 2), ut = (e) => {
						let t = /* @__PURE__ */ O(() => R(Td).filter((e) => xd[e]?.data?.mal?.kind === "blocks"));
						var n = Ay(), r = M(n), i = P(r, !0), a = F(r, 2);
						Qr(a, 20, () => R(t), (e) => e, (e, t) => {
							var n = _g(), r = P(n, !0);
							I((e) => {
								q(n, "title", e), H(r, xd[t].data.mal.name);
							}, [() => J("canvas.insertGroup")]), z("click", n, () => ot?.sendInsertTemplate(t)), V(e, n);
						}), T(a), T(n), I((e) => H(i, e), [() => J("canvas.tabMyTemplates")]), V(e, n);
					}, dt = /* @__PURE__ */ O(() => R(Td).some((e) => xd[e]?.data?.mal?.kind === "blocks"));
					U(lt, (e) => {
						R(dt) && e(ut);
					});
					var ft = F(lt, 2), pt = (e) => {
						var t = Ay(), n = M(t), r = P(n, !0), i = F(n, 2);
						Qr(i, 21, () => R(ox), (e) => e.type, (e, t) => {
							var n = Lr(), r = N(n), i = (e) => {
								var n = Ay(), r = M(n), i = P(r, !0), a = F(r, 2);
								Qr(a, 21, () => R(t).variants, (e) => e.label, (e, n) => {
									var r = _g(), i = P(r, !0);
									I((e) => {
										q(r, "title", e), H(i, R(n).label);
									}, [() => J("tip.blocks.fromPlugin", { plugin: R(t).plugin })]), z("click", r, () => cx(R(t), R(n).props)), V(e, r);
								}), T(a), T(n), I(() => H(i, R(t).label)), V(e, n);
							}, a = (e) => {
								var n = _g(), r = P(n, !0);
								I((e) => {
									q(n, "title", e), H(r, R(t).label);
								}, [() => J("tip.blocks.fromPlugin", { plugin: R(t).plugin })]), z("click", n, () => cx(R(t))), V(e, n);
							};
							U(r, (e) => {
								R(t).variants?.length ? e(i) : e(a, -1);
							}), V(e, n);
						}), T(i), T(t), I((e) => H(r, e), [() => J("panel.plugins")]), V(e, t);
					};
					U(ft, (e) => {
						R(ox).length && e(pt);
					}), I((e, t, n, r, a, o, u, m, we, Te, De, T, Me, Ne, Pe, Ie, qe, Xe, Ze, $e, et, nt, it, at, ot, st, lt, ut, dt, ft, pt, mt, ht, gt, _t, vt, yt, bt, xt, O, St, Ct, wt, Tt, Et, Dt, Ot, kt, At, jt, Mt, Nt, Pt, Ft, It, Lt, Rt, zt, Bt, Vt, Ht, Ut, Wt, Gt, Kt) => {
						H(i, e), H(s, t), q(c, "title", n), H(l, r), H(d, a), q(f, "title", o), H(p, `${u ?? ""} `), q(h, "title", m), H(g, we), q(_, "title", Te), H(v, De), q(y, "title", T), H(b, Me), q(x, "title", Ne), H(S, Pe), q(ee, "title", Ie), H(te, qe), q(ne, "title", Xe), H(re, Ze), q(ie, "title", $e), H(ae, et), q(C, "title", nt), H(oe, it), q(se, "title", at), H(ce, ot), q(le, "title", st), H(ue, lt), q(de, "title", ut), H(fe, dt), q(pe, "title", ft), H(me, pt), q(he, "title", mt), H(ge, ht), q(w, "title", gt), H(_e, _t), q(ve, "title", vt), H(ye, yt), q(be, "title", bt), H(xe, xt), q(Se, "title", O), H(Ce, St), H(Ee, Ct), q(Oe, "title", wt), H(ke, Tt), q(Ae, "title", Et), H(je, `${Dt ?? ""} `), H(Fe, Ot), q(Le, "title", kt), H(Re, At), q(ze, "title", jt), H(Be, Mt), q(Ve, "title", Nt), H(He, Pt), q(Ue, "title", Ft), H(We, It), q(Ge, "title", Lt), H(Ke, Rt), q(Je, "title", zt), H(Ye, Bt), H(Qe, Vt), H(tt, Ht), H(rt, Ut), H(E, Wt), H(D, Gt), H(ct, Kt);
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
					]), z("click", o, () => rx("text")), z("click", c, () => rx("text-box")), z("click", u, () => rx("button")), z("change", m, px), z("click", h, () => rx("video")), z("click", _, () => rx("icon")), z("click", y, () => rx("map")), z("click", x, () => rx("form")), z("click", ee, () => rx("collection")), z("click", ne, () => rx("faq")), z("click", ie, () => rx("timeline")), z("click", C, () => rx("quote")), z("click", se, () => rx("stats")), z("click", le, () => rx("ribbon")), z("click", de, () => rx("table")), z("click", pe, () => rx("share")), z("click", he, () => rx("countdown")), z("click", w, () => rx("audio")), z("click", ve, () => rx("product")), z("click", be, () => rx("cart")), z("click", Se, () => rx("checkout")), z("click", Oe, () => rx("gallery")), z("change", Me, _x), z("click", Le, () => rx("calendar")), z("click", ze, () => rx("calendar-cards")), z("click", Ve, () => rx("calendar-month")), z("click", Ue, () => rx("calendar-next")), z("click", Ge, () => rx("calendar-agenda")), z("click", Je, () => A(On, { mode: "add" }, !0)), z("click", et, () => rx("shape-line")), z("click", nt, () => rx("shape-arrow")), z("click", it, () => rx("shape-circle")), z("click", at, () => rx("shape-rect")), z("click", st, () => rx("shape-triangle")), V(e, t);
				};
				U(i, (e) => {
					R(o) ? e(a) : e(s, -1);
				}), T(t), I((e, i, a) => {
					n = xi(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: R(Fe) === "mobile" }), q(t, "title", e), q(r, "placeholder", i), q(r, "title", a);
				}, [
					() => R(Fe) === "mobile" ? J("tip.blocks.mobileLocked") : void 0,
					() => J("canvas.searchBlocks"),
					() => J("canvas.searchBlocks")
				]), Mi(r, () => R(lx), (e) => A(lx, e)), V(e, t);
			}, ee = (e) => {
				var t = Ny(), n = M(t), r = M(n), i = P(F(r));
				T(n);
				var a = F(n, 2);
				G(a);
				var o = F(a, 2), s = M(o);
				G(s);
				var c = F(s);
				T(o), T(t), I((e, t) => {
					H(r, `${e ?? ""} `), H(i, `${R(xe).size ?? ""} px`), K(a, R(xe).size), Oi(s, R(xe).snap !== !1), H(c, ` ${t ?? ""}`);
				}, [() => J("lbl.gridSize"), () => J("lbl.gridSnap")]), z("input", a, (e) => Ro("size", Number(e.target.value))), z("change", s, (e) => Ro("snap", e.target.checked)), V(e, t);
			}, te = (e) => {
				var t = Vy(), n = M(t), r = (e) => {
					var t = Py(), n = N(t), r = P(n, !0), i = F(n, 2);
					Jm(i, () => Nn, () => Fn);
					var a = F(i, 2);
					u(a, () => !1, () => R(An)), I((e) => H(r, e), [() => J("blocks.suffix", { label: Ai[R(j).type] ?? R(j).type })]), V(e, t);
				}, i = (e) => {
					var t = By(), n = N(t), r = P(n, !0), i = F(n, 2), o = M(i), s = F(o);
					G(s), T(i);
					var c = F(i, 4), l = M(c);
					G(l);
					var u = F(l);
					T(c);
					var d = F(c, 2), f = (e) => {
						var t = Fy(), n = N(t), r = M(n), i = P(F(r));
						T(n);
						var a = F(n, 2);
						G(a), I((e) => {
							H(r, `${e ?? ""} `), H(i, `${R(Fi).size ?? ""} px`), K(a, R(Fi).size);
						}, [() => J("lbl.gridSize")]), z("input", a, (e) => Lo("size", Number(e.target.value))), V(e, t);
					};
					U(d, (e) => {
						R(Fi) && e(f);
					});
					var p = F(d, 4), m = P(p, !0), h = F(p, 2);
					Qr(h, 21, () => [["", "common.standard"], ...Object.entries(_f)], ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ O(() => g(R(t), 2));
						let r = () => R(n)[0], i = () => R(n)[1], a = /* @__PURE__ */ O(() => Yi(r()));
						var o = Iy();
						let s;
						var c = M(o), l = M(c), u = F(l, 2), d = F(u, 2);
						T(c);
						var f = P(F(c, 2), !0);
						T(o), I((e, t) => {
							s = xi(o, 1, "rs-card svelte-1n46o8q", null, s, { on: R(Hi) === r() }), q(o, "title", e), Ci(c, `background: ${R(a).bg ?? ""}`), Ci(l, `background: ${R(a).text ?? ""}`), Ci(u, `background: ${R(a).surface ?? ""}`), Ci(d, `background: ${R(a).accent ?? ""}`), H(f, t);
						}, [() => J("tip.props.sectionTheme"), () => J(i())]), z("click", o, () => Ji(r())), V(e, o);
					}), T(h);
					var _ = F(h, 2), v = M(_), y = F(v), b = M(y), x = P(b), S = F(b, 2);
					W(S, () => C.copy, !0), T(S), T(y), T(_);
					var ee = F(_, 4), te = P(ee, !0), ne = F(ee, 2);
					a(ne, () => R(Xa), () => R(Li));
					var re = F(ne, 4), ie = P(re, !0), ae = F(re, 2);
					Qr(ae, 16, () => [["top", "lbl.dividerTop"], ["bottom", "lbl.dividerBottom"]], ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ O(() => g(t, 2));
						let r = () => R(n)[0], i = () => R(n)[1], a = /* @__PURE__ */ O(() => R(Ui)[r()]);
						var o = $m(), s = N(o), c = M(s), l = F(c);
						{
							let e = /* @__PURE__ */ O(() => R(a)?.shape ?? ""), t = /* @__PURE__ */ O(() => [["", J("common.none")], ...Jf.map((e) => [e, J(`opt.divider.${e}`)])]);
							Y(l, {
								get value() {
									return R(e);
								},
								get options() {
									return R(t);
								},
								onchange: (e) => ko(r(), "shape", e)
							});
						}
						T(s);
						var u = F(s, 2), d = (e) => {
							var t = Ly(), n = N(t), i = M(n), o = P(i, !0), s = F(i, 2);
							G(s);
							var c = P(F(s, 2));
							T(n);
							var l = F(n, 2), u = M(l), d = F(u);
							{
								let e = /* @__PURE__ */ O(() => R(a).color ?? "bg"), t = /* @__PURE__ */ O(co), n = /* @__PURE__ */ O(() => J("tip.divider.color"));
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
									onchange: (e) => ko(r(), "color", e)
								});
							}
							T(l);
							var f = F(l, 2), p = M(f);
							G(p);
							var m = F(p);
							T(f);
							var h = F(f, 2), g = M(h);
							G(g);
							var _ = F(g);
							T(h), I((e, t, n, r, i, d, v) => {
								H(o, e), q(s, "min", Yf.min), q(s, "max", Yf.max), K(s, R(a).height ?? Yf.dflt), H(c, `${R(a).height ?? Yf.dflt ?? ""} px`), q(l, "title", t), H(u, `${n ?? ""} `), q(f, "title", r), Oi(p, R(a).flip === !0), H(m, ` ${i ?? ""}`), q(h, "title", d), Oi(g, R(a).invert === !0), H(_, ` ${v ?? ""}`);
							}, [
								() => J("lbl.height"),
								() => J("tip.divider.color"),
								() => J("lbl.color"),
								() => J("tip.divider.flip"),
								() => J("lbl.dividerFlip"),
								() => J("tip.divider.invert"),
								() => J("lbl.patternInvert")
							]), z("input", s, (e) => ko(r(), "height", e.target.valueAsNumber)), z("change", p, (e) => ko(r(), "flip", e.target.checked)), z("change", g, (e) => ko(r(), "invert", e.target.checked)), V(e, t);
						};
						U(u, (e) => {
							R(a)?.shape && e(d);
						}), I((e, t) => {
							q(s, "title", e), H(c, `${t ?? ""} `);
						}, [() => J("tip.props.dividers"), () => J(i())]), V(e, o);
					});
					var oe = F(ae, 4), se = M(oe), ce = F(se);
					{
						let e = /* @__PURE__ */ O(() => bo(R(Bi)) ? R(Bi).type : "");
						Y(ce, {
							get value() {
								return R(e);
							},
							get options() {
								return xo;
							},
							onchange: (e) => Oo(e || null)
						});
					}
					T(oe);
					var le = F(oe, 2), ue = (e) => {
						var t = zy(), n = N(t), r = M(n), i = F(r);
						G(i), T(n);
						var a = F(n, 2), o = M(a), s = F(o);
						G(s), T(a);
						var c = F(a, 2), l = (e) => {
							var t = Ry(), n = N(t), r = M(n), i = F(r);
							{
								let e = /* @__PURE__ */ O(() => R(Bi).props.effect ?? "slide-up"), t = /* @__PURE__ */ O(() => [
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
									onchange: (e) => No("effect", e)
								});
							}
							T(n);
							var a = F(n, 2), o = M(a), s = F(o);
							G(s), T(a);
							var c = F(a, 2), l = M(c), u = F(l);
							{
								let e = /* @__PURE__ */ O(() => R(Bi).props.pattern ?? "sequence"), t = /* @__PURE__ */ O(() => [
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
									onchange: (e) => No("pattern", e)
								});
							}
							T(c), I((e, t, i, u, d, f) => {
								q(n, "title", e), H(r, `${t ?? ""} `), q(a, "title", i), H(o, `${u ?? ""} `), K(s, R(Bi).props.step ?? 90), q(c, "title", d), H(l, `${f ?? ""} `);
							}, [
								() => J("tip.props.staggerEffect"),
								() => J("lbl.staggerEffect"),
								() => J("tip.props.staggerStep"),
								() => J("lbl.stepMs"),
								() => J("tip.props.staggerPattern"),
								() => J("lbl.pattern")
							]), z("change", s, (e) => Mo("step", Number(e.target.value))), V(e, t);
						};
						U(c, (e) => {
							R(Bi).type === "stagger" && e(l);
						}), I((e, t) => {
							H(r, `${e ?? ""} `), K(i, R(Bi).props.duration), H(o, `${t ?? ""} `), K(s, R(Bi).props.delay ?? 0);
						}, [() => J("lbl.durationMs"), () => J("lbl.delayMs")]), z("change", i, (e) => Mo("duration", Number(e.target.value))), z("change", s, (e) => Mo("delay", Number(e.target.value))), V(e, t);
					}, de = /* @__PURE__ */ O(() => bo(R(Bi)));
					U(le, (e) => {
						R(de) && e(ue);
					});
					var fe = F(le, 2), pe = M(fe), me = F(pe);
					{
						let e = /* @__PURE__ */ O(() => R(Vi)?.type ?? (R(Bi) && !bo(R(Bi)) ? R(Bi).type : ""));
						Y(me, {
							get value() {
								return R(e);
							},
							get options() {
								return Co;
							},
							onchange: (e) => Ao(e || null)
						});
					}
					T(fe), I((e, t, n, a, c, d, f, h, g, y, b, ee, ne, ae, C, ce, le) => {
						H(r, e), q(i, "title", t), H(o, `${n ?? ""} `), K(s, R(Ii)), q(s, "placeholder", a), Oi(l, R(Fi) !== null), H(u, ` ${c ?? ""}`), q(p, "title", d), H(m, f), q(_, "title", h), H(v, `${g ?? ""} `), H(x, `#${R(Pi) ?? ""}`), q(S, "title", y), H(te, b), q(re, "title", ee), H(ie, ne), q(oe, "title", ae), H(se, `${C ?? ""} `), q(fe, "title", ce), H(pe, `${le ?? ""} `);
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
					]), z("change", s, (e) => Po(e.target.value)), z("change", l, (e) => Io(e.target.checked)), z("click", S, () => navigator.clipboard?.writeText(`#${R(Pi)}`)), V(e, t);
				}, o = (e) => {
					var t = Lh(), n = P(t, !0);
					I((e) => H(n, e), [() => J("hint.props.empty")]), V(e, t);
				};
				U(n, (e) => {
					R(j) ? e(r) : R(Pi) ? e(i, 1) : e(o, -1);
				}), T(t), V(e, t);
			}, ie = (e) => {
				var t = Yy(), n = M(t), r = M(n);
				G(r);
				var i = F(r);
				T(n);
				var s = F(n, 2), c = (e) => {
					var t = Ay(), n = M(t), r = P(n, !0), i = F(n, 2);
					Qr(i, 21, () => R(D).pages ?? [], (e) => e.id, (e, t) => {
						var n = Gh(), r = M(n);
						G(r);
						var i = F(r);
						T(n), I((e, a) => {
							q(n, "title", e), Oi(r, a), H(i, ` ${(R(t).title || R(t).id) ?? ""}`);
						}, [() => J("tip.footer.hideOnPage"), () => !(R(D).footer?.hideOn ?? []).includes(R(t).id)]), z("change", r, (e) => yp(R(t).id, e.target.checked)), V(e, n);
					}), T(i), T(t), I((e) => H(r, e), [() => J("group.showOnPages")]), V(e, t);
				};
				U(s, (e) => {
					R(D).footer?.show && e(c);
				});
				var l = F(s, 2), u = M(l), d = P(u, !0), f = F(u, 2), p = M(f);
				Qr(p, 21, () => op, (e) => e.id, (e, t) => {
					var n = Hy(), r = M(n);
					W(r, () => Fm(R(t).thumb), !0), T(r);
					var i = P(F(r, 2), !0);
					T(n), I((e) => {
						q(n, "title", e), H(i, R(t).label);
					}, [() => J("tip.footer.template", { label: R(t).label })]), z("click", n, () => cp(R(t).id)), V(e, n);
				}), T(p), T(f), T(l);
				var m = F(l, 2), h = M(m), g = P(h, !0), _ = F(h, 2), v = M(_), y = M(v), b = F(y);
				G(b), T(v);
				var x = F(v, 2), S = M(x), ee = F(S);
				G(ee), T(x);
				var te = F(x, 2), ne = M(te), re = F(ne);
				{
					let e = /* @__PURE__ */ O(() => R(D).footer?.brand?.mode ?? "text"), t = /* @__PURE__ */ O(() => [
						["text", J("blocks.text")],
						["image", J("opt.brand.image")],
						["both", J("opt.brand.both")]
					]);
					Y(re, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => $f(e)
					});
				}
				T(te);
				var ie = F(te, 2), ae = (e) => {
					var t = Wy(), n = N(t), r = M(n), i = M(r), a = F(i);
					T(r);
					var o = F(r, 2), s = (e) => {
						var t = nh();
						W(t, () => C.cross, !0), T(t), I((e) => q(t, "title", e), [() => J("tip.footer.removeLogo")]), z("click", t, np), V(e, t);
					};
					U(o, (e) => {
						R(D).footer?.brand?.logo && e(s);
					}), T(n);
					var c = F(n, 2), l = (e) => {
						var t = Uy(), n = N(t), r = M(n), i = P(F(r));
						T(n);
						var a = F(n, 2);
						G(a), I((e) => {
							H(r, `${e ?? ""} `), H(i, `${R(D).footer?.brand?.logoHeight ?? 40 ?? ""} px`), K(a, R(D).footer?.brand?.logoHeight ?? 40);
						}, [() => J("lbl.logoHeight")]), z("input", a, (e) => ip(e.target.value)), V(e, t);
					};
					U(c, (e) => {
						R(D).footer?.brand?.logo && e(l);
					}), I((e, t) => {
						q(r, "title", e), H(i, `${t ?? ""} `);
					}, [() => J("tip.webpAutoPublish"), () => R(D).footer?.brand?.logo ? J("ui.changeLogo") : J("ui.uploadLogo")]), z("change", a, ep), V(e, t);
				};
				U(ie, (e) => {
					(R(D).footer?.brand?.mode ?? "text") !== "text" && e(ae);
				}), T(_), T(m);
				var oe = F(m, 2), se = M(oe), ce = P(se, !0), le = F(se, 2), ue = M(le);
				Qr(ue, 17, () => R(D).footer?.columns ?? [], Jr, (e, t, n) => {
					var r = Ky(), i = N(r), a = M(i);
					G(a);
					var o = F(a, 2), s = M(o);
					W(s, () => C.plus, !0), T(s);
					var c = F(s, 2);
					c.disabled = n === 0, W(c, () => C.up, !0), T(c);
					var l = F(c, 2);
					W(l, () => C.down, !0), T(l);
					var u = F(l, 2);
					W(u, () => C.cross, !0), T(u), T(o), T(i), Qr(F(i, 2), 17, () => R(t).links ?? [], Jr, (e, r, i) => {
						var a = Gy(), o = M(a);
						G(o);
						var s = F(o, 2), c = M(s);
						c.disabled = i === 0, W(c, () => C.up, !0), T(c);
						var l = F(c, 2);
						W(l, () => C.down, !0), T(l);
						var u = F(l, 2);
						W(u, () => C.cross, !0), T(u), T(s);
						var d = F(s, 2), f = M(d);
						{
							let e = /* @__PURE__ */ O(() => R(r).page ?? "__href"), t = /* @__PURE__ */ O(() => J("tip.linkTarget")), a = /* @__PURE__ */ O(() => [...R(D).pages.map((e) => [e.id, e.title]), ["__href", J("opt.linkHref")]]);
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
								onchange: (e) => Op(n, i, e)
							});
						}
						T(d);
						var p = F(d, 2), m = (e) => {
							var t = Oh();
							G(t), I((e, n) => {
								K(t, R(r).href ?? ""), q(t, "placeholder", e), q(t, "title", n);
							}, [() => J("ph.hrefAnchor"), () => J("tip.hrefAnchor")]), z("change", t, (e) => Ap(n, i, e.target.value)), V(e, t);
						};
						U(p, (e) => {
							R(r).page || e(m);
						}), T(a), I((e, n) => {
							K(o, R(r).label), q(o, "title", e), l.disabled = i === R(t).links.length - 1, q(u, "title", n);
						}, [() => J("tip.linkLabel"), () => J("tip.removeLink")]), z("input", o, (e) => Dp(n, i, e.target.value)), z("click", c, () => Ep(n, i, -1)), z("click", l, () => Ep(n, i, 1)), z("click", u, () => Tp(n, i)), V(e, a);
					}), I((e, r, i) => {
						K(a, R(t).title), q(a, "title", e), q(s, "title", r), l.disabled = n === R(D).footer.columns.length - 1, q(u, "title", i);
					}, [
						() => J("tip.footer.columnTitle"),
						() => J("tip.footer.addLink"),
						() => J("tip.footer.removeColumn")
					]), z("input", a, (e) => Cp(n, e.target.value)), z("click", s, () => wp(n)), z("click", c, () => Sp(n, -1)), z("click", l, () => Sp(n, 1)), z("click", u, () => xp(n)), V(e, r);
				});
				var de = F(ue, 2), fe = P(de, !0), pe = F(de, 2), me = M(pe), he = F(me);
				{
					let e = /* @__PURE__ */ O(() => R(D).footer?.columnsAlign ?? "left"), t = /* @__PURE__ */ O(() => [["left", J("common.left")], ["center", J("common.center")]]);
					Y(he, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => hp(e)
					});
				}
				T(pe), T(le), T(oe);
				var ge = F(oe, 2), w = M(ge), _e = P(w, !0), ve = F(w, 2), ye = M(ve);
				Qr(ye, 17, () => R(D).footer?.social ?? [], Jr, (e, t, n) => {
					var r = qy(), i = M(r), a = M(i);
					W(a, () => vo(R(t).icon) || "", !0), T(a);
					var o = F(a, 2);
					{
						let e = /* @__PURE__ */ O(() => J("blocks.icon"));
						Y(o, {
							get value() {
								return R(t).icon;
							},
							get title() {
								return R(e);
							},
							get options() {
								return Vp;
							},
							onchange: (e) => zp(n, e)
						});
					}
					T(i);
					var s = F(i, 2), c = M(s);
					c.disabled = n === 0, W(c, () => C.up, !0), T(c);
					var l = F(c, 2);
					W(l, () => C.down, !0), T(l);
					var u = F(l, 2);
					W(u, () => C.cross, !0), T(u), T(s);
					var d = F(s, 2);
					G(d), T(r), I((e, r) => {
						l.disabled = n === R(D).footer.social.length - 1, q(u, "title", e), K(d, R(t).url), q(d, "placeholder", r);
					}, [() => J("tip.removeLink"), () => J("ph.hrefMailto")]), z("click", c, () => Rp(n, -1)), z("click", l, () => Rp(n, 1)), z("click", u, () => Lp(n)), z("change", d, (e) => Bp(n, e.target.value)), V(e, r);
				});
				var be = F(ye, 2), xe = P(be, !0);
				T(ve), T(ge);
				var Se = F(ge, 2), Ce = M(Se), we = P(Ce, !0), Te = F(Ce, 2), Ee = M(Te), De = M(Ee);
				G(De);
				var Oe = F(De);
				T(Ee);
				var ke = F(Ee, 2), Ae = (e) => {
					let t = /* @__PURE__ */ O(() => R(D).footer.cta);
					var n = Jy(), r = N(n), i = M(r), a = F(i);
					{
						let e = /* @__PURE__ */ O(() => R(t).kind ?? "button"), n = /* @__PURE__ */ O(() => [["button", J("opt.cta.button")], ["newsletter", J("opt.cta.newsletter")]]);
						Y(a, {
							get value() {
								return R(e);
							},
							get options() {
								return R(n);
							},
							onchange: (e) => _p("kind", e)
						});
					}
					T(r);
					var o = F(r, 2), s = M(o);
					G(s);
					var c = F(s);
					T(o);
					var l = F(o, 2), u = M(l), d = F(u);
					G(d), T(l);
					var f = F(l, 2), p = M(f), m = F(p);
					G(m), T(f);
					var h = F(f, 2), g = M(h), _ = F(g);
					G(_), T(h);
					var v = F(h, 2), y = (e) => {
						var n = $m(), r = N(n), i = M(r), a = F(i);
						{
							let e = /* @__PURE__ */ O(() => R(t).page ?? "__href"), n = /* @__PURE__ */ O(() => [...R(D).pages.map((e) => [e.id, e.title]), ["__href", J("opt.linkHrefMailto")]]);
							Y(a, {
								get value() {
									return R(e);
								},
								get options() {
									return R(n);
								},
								onchange: (e) => vp(e)
							});
						}
						T(r);
						var o = F(r, 2), s = (e) => {
							var n = Bh();
							G(n), I((e, r) => {
								K(n, R(t).href ?? ""), q(n, "placeholder", e), q(n, "title", r);
							}, [() => J("ph.hrefMailtoAnchor"), () => J("tip.hrefAnchor")]), z("change", n, (e) => _p("href", e.target.value)), V(e, n);
						};
						U(o, (e) => {
							R(t).page || e(s);
						}), I((e, t) => {
							q(r, "title", e), H(i, `${t ?? ""} `);
						}, [() => J("tip.footer.ctaTarget"), () => J("lbl.buttonTarget")]), V(e, n);
					}, b = (e) => {
						var n = dg(), r = N(n), i = M(r), a = F(i);
						G(a), T(r);
						var o = F(r, 2), s = M(o), c = F(s);
						G(c), T(o);
						var l = F(o, 2), u = M(l), d = F(u);
						G(d), T(l), I((e, n, f, p, m, h, g, _, v) => {
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
						]), z("change", a, (e) => _p("endpoint", e.target.value)), z("change", c, (e) => _p("recipient", e.target.value)), z("input", d, (e) => _p("success", e.target.value)), V(e, n);
					};
					U(v, (e) => {
						(R(t).kind ?? "button") === "button" ? e(y) : e(b, -1);
					}), I((e, n, a, v, y, b, x, S, ee, te, ne, re) => {
						q(r, "title", e), H(i, `${n ?? ""} `), q(o, "title", a), Oi(s, R(t).big === !0), H(c, ` ${v ?? ""}`), q(l, "title", y), H(u, `${b ?? ""} `), K(d, R(t).heading ?? ""), q(d, "placeholder", x), q(f, "title", S), H(p, `${ee ?? ""} `), K(m, R(t).sub ?? ""), q(h, "title", te), H(g, `${ne ?? ""} `), K(_, R(t).label ?? ""), q(_, "placeholder", re);
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
					]), z("change", s, (e) => _p("big", e.target.checked)), z("input", d, (e) => _p("heading", e.target.value)), z("input", m, (e) => _p("sub", e.target.value)), z("input", _, (e) => _p("label", e.target.value)), V(e, n);
				};
				U(ke, (e) => {
					R(D).footer?.cta && e(Ae);
				}), T(Te), T(Se);
				var Me = F(Se, 2), Ne = M(Me), Pe = P(Ne, !0), Fe = F(Ne, 2), Ie = M(Fe);
				o(Ie, () => "linkRow", () => R(D).footer?.linkRow ?? []);
				var Le = F(Ie, 2), Re = P(Le, !0);
				T(Fe), T(Me);
				var ze = F(Me, 2), Be = M(ze), Ve = P(Be, !0), He = F(Be, 2), Ue = M(He), We = (e) => {
					var t = p_(), n = N(t), r = M(n), i = F(r);
					{
						let e = /* @__PURE__ */ O(() => R(D).footer?.align ?? "left"), t = /* @__PURE__ */ O(() => [
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
							onchange: (e) => Zf("footer", (t) => {
								t.align = e;
							})
						});
					}
					T(n), je(2), I((e, t) => {
						q(n, "title", e), H(r, `${t ?? ""} `);
					}, [() => J("tip.footer.align"), () => J("lbl.align")]), V(e, t);
				};
				U(Ue, (e) => {
					R(D).footer?.cta?.big !== !0 && e(We);
				});
				var Ge = F(Ue, 2), Ke = P(Ge, !0), qe = F(Ge, 2);
				a(qe, () => io, () => R(D).footer?.background?.layers ?? []), T(He), T(ze);
				var Je = F(ze, 2), Ye = M(Je), Xe = P(Ye, !0), Ze = F(Ye, 2), Qe = M(Ze), $e = M(Qe), et = F($e);
				G(et), T(Qe);
				var tt = F(Qe, 2), nt = P(tt, !0), rt = F(tt, 2);
				o(rt, () => "baseline", () => R(D).footer?.baseline ?? []);
				var it = F(rt, 2), E = P(it, !0);
				T(Ze), T(Je), T(t), I((e, t, a, o, s, c, l, u, f, p, m, h, _, re, ie, ae, C, oe, se, le, ue, de, he, ge, w, ve, ye, be, Se, Ce, Te, ke) => {
					q(n, "title", e), Oi(r, t), H(i, ` ${a ?? ""}`), H(d, o), H(g, s), q(v, "title", c), H(y, `${l ?? ""} `), K(b, R(D).footer?.brand?.title ?? ""), q(b, "placeholder", u), q(x, "title", f), H(S, `${p ?? ""} `), K(ee, R(D).footer?.brand?.tagline ?? ""), q(te, "title", m), H(ne, `${h ?? ""} `), H(ce, _), H(fe, re), q(pe, "title", ie), H(me, `${ae ?? ""} `), H(_e, C), H(xe, oe), H(we, se), q(Ee, "title", le), Oi(De, ue), H(Oe, ` ${de ?? ""}`), H(Pe, he), H(Re, ge), H(Ve, w), H(Ke, ve), H(Xe, ye), q(Qe, "title", be), H($e, `${Se ?? ""} `), K(et, R(D).footer?.copyright ?? ""), q(et, "placeholder", Ce), H(nt, Te), H(E, ke);
				}, [
					() => J("tip.footer.show"),
					() => !!R(D).footer?.show,
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
					() => !!R(D).footer?.cta,
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
				]), z("change", r, (e) => Zf("footer", (t) => {
					t.show = e.target.checked;
				})), z("input", b, (e) => Qf("title", e.target.value)), z("input", ee, (e) => Qf("tagline", e.target.value)), z("click", de, bp), z("click", be, Ip), z("change", De, (e) => gp(e.target.checked)), z("click", Le, () => lp("linkRow")), z("input", et, (e) => ap(e.target.value)), z("click", it, () => lp("baseline")), V(e, t);
			}, ae = (e) => {
				var t = rb(), n = M(t), r = (e) => {
					var t = vh(), n = M(t), r = F(n);
					{
						let e = /* @__PURE__ */ O(() => R(dd) ?? ""), t = /* @__PURE__ */ O(() => [["", J("common.choose")], ...R(ld).map((e) => [e, R(ud)[e]?.name ?? e])]);
						Y(r, {
							get value() {
								return R(e);
							},
							get options() {
								return R(t);
							},
							onchange: (e) => A(dd, e || null, !0)
						});
					}
					T(t), I((e) => H(n, `${e ?? ""} `), [() => J("blocks.collection")]), V(e, t);
				};
				U(n, (e) => {
					R(ld).length && e(r);
				});
				var i = F(n, 2), a = (e) => {
					let t = /* @__PURE__ */ O(() => R(ud)[R(dd)]);
					var n = nb(), r = N(n), i = M(r), a = P(i, !0), o = F(i, 2), s = P(o, !0), c = F(o, 2), l = M(c), u = F(l);
					T(c);
					var d = F(c, 2);
					W(d, () => C.cross, !0), T(d), T(r);
					var f = F(r, 2);
					Qr(f, 19, () => R(t).entries, (e) => e.id, (e, n, r) => {
						var i = tb(), a = M(i), o = P(a), s = F(a, 2), c = M(s), l = M(c);
						G(l);
						var u = F(l, 2), d = M(u);
						W(d, () => C.up, !0), T(d);
						var f = F(d, 2);
						W(f, () => C.down, !0), T(f);
						var p = F(f, 2);
						W(p, () => C.cross, !0), T(p), T(u), T(c);
						var m = F(c, 2), h = (e) => {
							var t = Xy(), r = M(t), i = F(r);
							G(i), T(t), I((e) => {
								H(r, `${e ?? ""} `), K(i, R(n).date ?? "");
							}, [() => J("lbl.date")]), z("change", i, (e) => Gd(R(dd), R(n).id, "date", e.target.value)), V(e, t);
						};
						U(m, (e) => {
							R(t).kind !== "products" && e(h);
						});
						var g = F(m, 2);
						ut(g);
						var _ = F(g, 2), v = (e) => {
							var t = Rh(), r = M(t), i = F(r);
							G(i), T(t), I((e, t) => {
								H(r, `${e ?? ""} `), K(i, R(n).href ?? ""), q(i, "placeholder", t);
							}, [() => J("lbl.link"), () => J("ph.collections.href")]), z("change", i, (e) => Gd(R(dd), R(n).id, "href", e.target.value)), V(e, t);
						};
						U(_, (e) => {
							R(t).kind !== "products" && e(v);
						});
						var y = F(_, 2), b = M(y), x = M(b), S = F(x);
						T(b);
						var ee = F(b, 2), te = (e) => {
							var t = Zy(), r = N(t), i = F(r, 2);
							W(i, () => C.cross, !0), T(i), I((e) => {
								q(r, "src", R(n).image), q(i, "title", e);
							}, [() => J("tip.removeImage")]), z("click", i, () => Gd(R(dd), R(n).id, "image", "")), V(e, t);
						};
						U(ee, (e) => {
							R(n).image && e(te);
						}), T(y);
						var ne = F(y, 2), re = (e) => {
							var t = eb(), r = N(t), i = M(r), a = F(i);
							G(a), T(r);
							var o = F(r, 2), s = M(o), c = F(s);
							G(c), T(o);
							var l = F(o, 2), u = M(l), d = F(u);
							G(d), T(l);
							var f = F(l, 2), p = M(f), m = F(p);
							G(m), T(f);
							var h = F(f, 2);
							Qr(h, 17, () => R(n).colors ?? [], Jr, (e, t, r) => {
								var i = $y(), a = M(i);
								G(a);
								var o = F(a, 2), s = M(o), c = F(s);
								T(o);
								var l = F(o, 2), u = (e) => {
									var n = Qy();
									I(() => q(n, "src", R(t).image)), V(e, n);
								};
								U(l, (e) => {
									R(t).image && e(u);
								});
								var d = F(l, 2);
								W(d, () => C.cross, !0), T(d), T(i), I((e, n) => {
									K(a, R(t).name), q(a, "placeholder", e), H(s, `${n ?? ""} `);
								}, [() => J("ph.colorName"), () => R(t).image ? J("ui.changeImage") : J("ui.addImage")]), z("change", a, (e) => Zd(R(dd), R(n).id, r, "name", e.target.value)), z("change", c, (e) => Qd(R(dd), R(n).id, r, e)), z("click", d, () => $d(R(dd), R(n).id, r)), V(e, i);
							});
							var g = F(h, 2), _ = P(g, !0);
							I((e, t, r, h, v, y, b, x, S, ee, te) => {
								H(i, `${e ?? ""} `), K(a, R(n).price ?? ""), q(o, "title", t), H(s, `${r ?? ""} `), K(c, R(n).memberPrice ?? ""), q(l, "title", h), H(u, `${v ?? ""} `), K(d, R(n).badge ?? ""), q(f, "title", y), H(p, `${b ?? ""} `), K(m, x), q(m, "placeholder", S), q(g, "title", ee), H(_, te);
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
							]), z("change", a, (e) => Gd(R(dd), R(n).id, "price", e.target.value === "" ? "" : Number(e.target.value))), z("change", c, (e) => Gd(R(dd), R(n).id, "memberPrice", e.target.value === "" ? "" : Number(e.target.value))), z("change", d, (e) => Gd(R(dd), R(n).id, "badge", e.target.value)), z("change", m, (e) => Yd(R(dd), R(n).id, e.target.value)), z("click", g, () => Xd(R(dd), R(n).id)), V(e, t);
						};
						U(ne, (e) => {
							R(t).kind === "products" && e(re);
						}), T(s), T(i), I((e, i, a, s, c) => {
							H(o, `${e ?? ""}${R(t).kind === "products" ? R(n).price == null ? "" : ` · ${R(n).price}` : R(n).date ? ` · ${R(n).date}` : ""}`), K(l, R(n).title), q(l, "title", i), d.disabled = R(r) === 0, f.disabled = R(r) === R(t).entries.length - 1, q(p, "title", a), q(g, "placeholder", s), K(g, R(n).text ?? ""), H(x, `${c ?? ""} `);
						}, [
							() => Rd(R(n).title),
							() => J("lbl.title"),
							() => J("tip.collections.deleteEntry"),
							() => J("ph.collections.text"),
							() => R(n).image ? J("ui.changeImage") : J("ui.addImage")
						]), z("change", l, (e) => Gd(R(dd), R(n).id, "title", e.target.value || J("ui.untitled"))), z("click", d, () => Kd(R(dd), R(r), -1)), z("click", f, () => Kd(R(dd), R(r), 1)), z("click", p, () => qd(R(dd), R(n).id)), z("change", g, (e) => Gd(R(dd), R(n).id, "text", e.target.value)), z("change", S, (e) => Jd(R(dd), R(n).id, e)), V(e, i);
					});
					var p = F(f, 2), m = (e) => {
						var t = Lh(), n = P(t, !0);
						I((e) => H(n, e), [() => J("hint.collections.empty")]), V(e, t);
					};
					U(p, (e) => {
						R(t).entries.length || e(m);
					}), je(2), I((e, t, n, r, i, u) => {
						H(a, e), q(o, "title", t), H(s, n), q(c, "title", r), H(l, `${i ?? ""} `), q(d, "title", u);
					}, [
						() => J("ui.addEntry"),
						() => J("tip.collections.exportCsv"),
						() => J("ui.exportCsv"),
						() => J("tip.collections.importCsv"),
						() => J("ui.importCsv"),
						() => J("tip.collections.deleteCollection")
					]), z("click", i, () => Wd(R(dd))), z("click", o, () => ef(R(dd))), z("change", u, (e) => nf(R(dd), e)), z("click", d, () => Ud(R(dd))), V(e, n);
				};
				U(i, (e) => {
					R(dd) && R(ud)[R(dd)] && e(a);
				});
				var o = F(i, 2), s = M(o), c = F(s);
				G(c), T(o);
				var l = F(o, 2), u = M(l);
				Y(F(u), {
					get value() {
						return R(hd);
					},
					get options() {
						return yd;
					},
					onchange: (e) => A(hd, e, !0)
				}), T(l);
				var d = F(l, 2), f = P(d, !0);
				T(t), I((e, t, n, r, i) => {
					H(s, `${e ?? ""} `), q(c, "placeholder", t), H(u, `${n ?? ""} `), d.disabled = r, H(f, i);
				}, [
					() => J("lbl.newCollectionName"),
					() => J("ph.collections.name"),
					() => J("common.type"),
					() => !R(md).trim(),
					() => J("ui.createCollection")
				]), z("keydown", c, (e) => e.key === "Enter" && Vd()), Mi(c, () => R(md), (e) => A(md, e)), z("click", d, Vd), V(e, t);
			}, oe = (e) => {
				var t = ub(), n = M(t), r = (e) => {
					var t = Lh(), n = P(t, !0);
					I((e) => H(n, e), [() => J("hint.plugins.empty")]), V(e, t);
				}, i = /* @__PURE__ */ O(() => !Of().length);
				U(n, (e) => {
					R(i) && e(r);
				});
				var a = F(n, 2);
				Qr(a, 16, Of, (e) => e, (e, t) => {
					let n = /* @__PURE__ */ O(() => gf[t]), r = /* @__PURE__ */ O(() => (R(hf)?.enabled ?? []).includes(t));
					var i = ob();
					let a;
					var o = M(i), s = M(o), c = P(s, !0), l = F(s, 2), u = (e) => {
						var t = ib(), r = P(t);
						I(() => H(r, `v${R(n).version ?? ""}`)), V(e, t);
					};
					U(l, (e) => {
						R(n)?.version && e(u);
					});
					var d = F(l, 2), f = M(d), p = M(f);
					G(p);
					var m = F(p);
					T(f);
					var h = F(f, 2);
					W(h, () => C.cross, !0), T(h), T(d), T(o);
					var g = F(o, 2), _ = (e) => {
						var t = ab(), r = P(t, !0);
						I((e) => H(r, e), [() => R(n).errors.join("; ")]), V(e, t);
					}, v = (e) => {
						var t = ab(), r = P(t, !0);
						I((e) => H(r, e), [() => J("plugin.engineMismatch", {
							required: R(n).requiresEngine,
							current: R(Sf)
						})]), V(e, t);
					}, y = (e) => {
						var t = ab(), r = P(t, !0);
						I((e) => H(r, e), [() => J("plugin.cspNeeded", { list: Mf(R(n).csp).join(", ") })]), V(e, t);
					}, b = /* @__PURE__ */ O(() => R(n)?.csp && Mf(R(n).csp).length);
					U(g, (e) => {
						R(n)?.errors?.length ? e(_) : R(n) && !R(n).satisfied ? e(v, 1) : R(b) && e(y, 2);
					});
					var x = F(g, 2), S = (e) => {
						var t = Lh(), r = P(t, !0);
						I((e) => H(r, e), [() => J("plugin.languages", { list: R(n).languages.map((e) => e.name).join(", ") })]), V(e, t);
					};
					U(x, (e) => {
						R(n)?.languages?.length && e(S);
					}), T(i), I((e, t, o, s, l) => {
						a = xi(i, 1, "plugin-row svelte-1n46o8q", null, a, { "plugin-broken": R(n)?.errors?.length }), H(c, e), q(f, "title", t), Oi(p, R(r)), p.disabled = o, H(m, ` ${s ?? ""}`), q(h, "title", l);
					}, [
						() => R(n)?.names?.[ia()] ?? R(n)?.name ?? t,
						() => R(r) ? J("tip.plugins.on") : J("tip.plugins.off"),
						() => !!R(n)?.errors?.length,
						() => R(r) ? J("ui.on") : J("ui.off"),
						() => J("tip.plugins.remove")
					]), z("change", p, (e) => Uf(t, e.target.checked)), z("click", h, () => Gf(t)), V(e, i);
				});
				var o = F(a, 2), s = (e) => {
					var t = cb(), n = F(N(t), 2), r = P(n, !0);
					Qr(F(n, 2), 16, () => R(Tf), (e) => e, (e, t) => {
						var n = sb(), r = M(n), i = M(r), a = P(i, !0), o = F(i, 2), s = (e) => {
							var n = ib(), r = P(n);
							I(() => H(r, `v${gf[t].version ?? ""}`)), V(e, n);
						};
						U(o, (e) => {
							gf[t]?.version && e(s);
						});
						var c = F(o, 2), l = M(c);
						W(l, () => C.right, !0), T(l), T(c), T(r), T(n), I((e, t) => {
							H(a, e), q(l, "title", t);
						}, [() => gf[t]?.names?.[ia()] ?? gf[t]?.name ?? t, () => J("tip.plugins.addFound")]), z("click", l, () => Xf(t)), V(e, n);
					}), I((e) => H(r, e), [() => J("hint.plugins.found")]), V(e, t);
				};
				U(o, (e) => {
					R(Tf).length && e(s);
				});
				var c = F(o, 2), l = (e) => {
					var t = Lr(), n = N(t), r = (e) => {
						var t = Lh(), n = P(t, !0);
						I((e) => H(n, e), [() => J("hint.plugins.autoDiscover")]), V(e, t);
					};
					U(n, (e) => {
						R(Tf).length || e(r);
					}), V(e, t);
				}, u = (e) => {
					var t = lb(), n = F(N(t), 2);
					G(n);
					var r = F(n, 2), i = P(r, !0), a = F(r, 2), o = (e) => {
						var t = ab(), n = P(t, !0);
						I(() => H(n, R(wf))), V(e, t);
					};
					U(a, (e) => {
						R(wf) && e(o);
					}), I((e, t, a) => {
						q(n, "placeholder", e), r.disabled = t, H(i, a);
					}, [
						() => J("ph.plugins.folder"),
						() => !R(Cf).trim(),
						() => J("ui.addPlugin")
					]), z("keydown", n, (e) => e.key === "Enter" && Kf()), Mi(n, () => R(Cf), (e) => A(Cf, e)), z("click", r, Kf), V(e, t);
				};
				U(c, (e) => {
					R(Df) === "ok" ? e(l) : e(u, -1);
				}), T(t), V(e, t);
			}, se = (e) => {
				var t = Vy(), n = M(t), r = (e) => {
					var t = Lh(), n = P(t, !0);
					I((e) => H(n, e), [() => J("hint.history.loading")]), V(e, t);
				}, i = (e) => {
					var t = Sg(), n = N(t), r = (e) => {
						var t = Lh(), n = P(t, !0);
						I(() => H(n, R(Wo))), V(e, t);
					};
					U(n, (e) => {
						R(Wo) && e(r);
					});
					var i = F(n, 2), a = (e) => {
						var t = fb(), n = N(t), r = P(n, !0);
						Qr(F(n, 2), 19, () => R(Uo), (e) => e.sha, (e, t, n) => {
							var r = db();
							let i;
							var a = M(r), o = P(a, !0), s = P(F(a, 2));
							T(r), I((e) => {
								i = xi(r, 1, "history-row svelte-1n46o8q", null, i, { head: R(n) === 0 }), q(a, "title", R(t).sha), H(o, R(t).message), H(s, `${R(t).author ?? ""}${e ?? ""}`);
							}, [() => R(t).date ? ` · ${Xo.format(new Date(R(t).date))}` : ""]), V(e, r);
						}), I((e, t) => {
							n.disabled = R(Go) || !R(be)?.allowed, q(n, "title", e), H(r, t);
						}, [() => R(be)?.allowed ? J("tip.history.revert") : J("tip.history.needsAccess"), () => J("ui.revertLast")]), z("click", n, Qo), V(e, t);
					};
					U(i, (e) => {
						R(Uo).length > 0 && e(a);
					}), V(e, t);
				};
				U(n, (e) => {
					R(Uo) === null ? e(r) : e(i, -1);
				}), T(t), V(e, t);
			}, ce = (e) => {
				var t = Vy(), n = M(t), r = (e) => {
					var t = Lh(), n = P(t, !0);
					I((e) => H(n, e), [() => J("update.checking")]), V(e, t);
				}, i = (e) => {
					var t = pb(), n = N(t), r = P(n, !0), i = F(n, 2), a = P(i, !0);
					I((e) => {
						H(r, R(ps)), H(a, e);
					}, [() => J("update.retry")]), z("click", i, gs), V(e, t);
				}, a = (e) => {
					var t = wb(), n = N(t), r = M(n), i = P(r, !0), a = F(r, 2), o = (e) => {
						var t = mb(), n = N(t);
						W(n, () => C.right, !0), T(n);
						var r = P(F(n, 2), !0);
						I(() => H(r, R(fs).target)), V(e, t);
					};
					U(a, (e) => {
						R(fs).upToDate || e(o);
					}), T(n);
					var s = F(n, 2), c = (e) => {
						var t = Lh(), n = P(t, !0);
						I((e) => H(n, e), [() => J("update.upToDate")]), V(e, t);
					}, l = (e) => {
						var t = Cb(), n = N(t), r = P(n, !0), i = F(n, 2), a = (e) => {
							var t = hb(), n = M(t), r = P(n, !0), i = F(n, 2), a = P(M(i), !0);
							T(i), T(t), I((e) => {
								H(r, e), H(a, R(fs).notes);
							}, [() => J("update.aboutVersion", { target: R(fs).target })]), V(e, t);
						};
						U(i, (e) => {
							R(fs).notes && e(a);
						});
						var o = F(i, 2), s = (e) => {
							var t = gb(), n = M(t), r = M(n);
							W(r, () => C.warn, !0), T(r);
							var i = F(r);
							T(n);
							var a = F(n, 2), o = P(M(a), !0);
							T(a), T(t), I((e, t) => {
								q(n, "title", e), H(i, ` ${t ?? ""}`), H(o, R(fs).headers.upstream);
							}, [() => J("update.headersManual"), () => J("update.headersTitle")]), V(e, t);
						};
						U(o, (e) => {
							R(fs).headers?.upstream && e(s);
						});
						var c = F(o, 2);
						Qr(c, 17, () => R(fs).changes.filter((e) => e.atom && e.conflict), (e) => e.path, (e, t) => {
							var n = vb(), r = M(n), i = P(r, !0), a = F(r, 2), o = M(a), s = (e) => {
								var t = _b(), n = P(t, !0);
								I((e) => H(n, e), [() => J("update.actionDelete")]), V(e, t);
							};
							U(o, (e) => {
								R(t).action === "delete" && e(s);
							});
							var c = F(o, 2);
							W(c, () => C.warn, !0), T(c), T(a), T(n), I((e) => {
								q(r, "title", R(t).path), H(i, R(t).path), q(c, "title", e);
							}, [() => J(`update.conflict.${R(t).conflict}`)]), V(e, n);
						});
						var l = F(c, 2), u = M(l), d = P(u), f = F(u, 2);
						Qr(f, 21, () => R(fs).changes.filter((e) => e.atom && !e.conflict), (e) => e.path, (e, t) => {
							var n = yb(), r = M(n), i = P(r, !0), a = F(r, 2), o = (e) => {
								var t = _b(), n = P(t, !0);
								I((e) => H(n, e), [() => J("update.actionDelete")]), V(e, t);
							};
							U(a, (e) => {
								R(t).action === "delete" && e(o);
							}), T(n), I(() => {
								q(r, "title", R(t).path), H(i, R(t).path);
							}), V(e, n);
						}), T(f), T(l);
						var p = F(l, 2), m = (e) => {
							var t = Sb(), n = N(t), r = M(n), i = P(r, !0), a = P(F(r, 2), !0);
							T(n), Qr(F(n, 2), 17, () => R(fs).changes.filter((e) => !e.atom), (e) => e.path, (e, t) => {
								var n = xb(), r = M(n);
								let i;
								var a = P(r, !0), o = F(r, 2), s = M(o), c = (e) => {
									var t = _b(), n = P(t, !0);
									I((e) => H(n, e), [() => J("update.actionDelete")]), V(e, t);
								};
								U(s, (e) => {
									R(t).action === "delete" && e(c);
								});
								var l = F(s, 2), u = (e) => {
									var n = bb();
									W(n, () => C.warn, !0), T(n), I((e) => q(n, "title", e), [() => J(`update.conflict.${R(t).conflict}`)]), V(e, n);
								};
								U(l, (e) => {
									R(t).conflict && e(u);
								});
								var d = F(l, 2);
								G(d), T(o), T(n), I((e, n, o, s) => {
									i = xi(r, 1, "update-path svelte-1n46o8q", null, i, { skipped: e }), q(r, "title", R(t).path), H(a, R(t).path), Oi(d, n), q(d, "title", o), q(d, "aria-label", s);
								}, [
									() => R(hs).has(R(t).path),
									() => R(hs).has(R(t).path),
									() => J("update.keepMine.title"),
									() => J("update.keepMine")
								]), z("change", d, () => _s(R(t).path)), V(e, n);
							}), I((e, t) => {
								H(i, e), H(a, t);
							}, [() => J("update.optionalTitle"), () => J("update.keepMine")]), V(e, t);
						}, h = /* @__PURE__ */ O(() => R(fs).changes.some((e) => !e.atom));
						U(p, (e) => {
							R(h) && e(m);
						});
						var g = F(p, 2), _ = P(g, !0);
						I((e, t, n, i, a, o) => {
							H(r, e), q(u, "title", t), H(d, `${n ?? ""} · ${i ?? ""}`), g.disabled = R(ms) || !R(be)?.allowed, q(g, "title", a), H(_, o);
						}, [
							() => J("update.summary", {
								writes: R(fs).changes.filter((e) => e.action === "write").length,
								deletes: R(fs).changes.filter((e) => e.action === "delete").length
							}),
							() => J("update.atomGroup.title"),
							() => J("update.atomTitle"),
							() => R(fs).changes.filter((e) => e.atom).length,
							() => R(be)?.allowed ? J("update.run.title") : J("tip.history.needsAccess"),
							() => J("update.run", { target: R(fs).target })
						]), z("click", g, xs), V(e, t);
					};
					U(s, (e) => {
						R(fs).upToDate ? e(c) : e(l, -1);
					}), I((e) => H(i, e), [() => J("update.current", { version: R(fs).current })]), V(e, t);
				};
				U(n, (e) => {
					R(ms) && !R(fs) ? e(r) : R(ps) ? e(i, 1) : R(fs) && e(a, 2);
				}), T(t), V(e, t);
			};
			U(d, (e) => {
				R(Wt) === "pages" ? e(h) : R(Wt) === "nav" ? e(_, 1) : R(Wt) === "site" ? e(b, 2) : R(Wt) === "theme" ? e(x, 3) : R(Wt) === "blocks" ? e(S, 4) : R(Wt) === "grid" ? e(ee, 5) : R(Wt) === "properties" ? e(te, 6) : R(Wt) === "footer" ? e(ie, 7) : R(Wt) === "collections" ? e(ae, 8) : R(Wt) === "plugins" ? e(oe, 9) : R(Wt) === "history" ? e(se, 10) : R(Wt) === "update" && e(ce, 11);
			}), T(t), Ri(t, (e) => A(vm, e), () => R(vm)), I((e) => {
				n = xi(t, 1, "panel svelte-1n46o8q", null, n, { hidden: !R(Se) }), q(i, "title", e), H(s, qt[R(Wt)]);
			}, [() => Jt[R(Wt)]?.map((e) => J(e)).join("\n")]), V(e, t);
		};
		U(_, (e) => {
			R(Wt) && e(b);
		});
		var x = F(_, 2);
		let S;
		var ee = M(x), te = M(ee);
		Ri(te, (e) => A(ye, e), () => R(ye)), T(ee), T(x), Ri(x, (e) => A(Ie, e), () => R(Ie)), T(t), I((e, t) => {
			r = xi(n, 1, "rail svelte-1n46o8q", null, r, { hidden: !R(Se) }), l = xi(c, 1, "rail-gear svelte-1n46o8q", null, l, { active: R(rc) }), q(c, "title", e), S = xi(x, 1, "frame-wrap svelte-1n46o8q", null, S, {
				mobile: R(Fe) === "mobile",
				pan: R(Xe),
				fold: R(Ue) > 0
			}), Ci(ee, `width:${R(qe) ?? ""}px; height:${R(Je) ?? ""}px`), q(te, "title", t), q(te, "src", `/?page=${R(fe)}&preview=1`), Ci(te, `width:${R(He) ?? ""}px; height:${R(Ke) ?? ""}px; transform:scale(${R(We) ?? ""}); transform-origin:top left`);
		}, [() => J("settings.title"), () => J("ui.previewTitle")]), z("click", c, () => A(rc, !R(rc))), Dr("load", te, ec), Tr(te), V(e, t);
	}, $x = (e) => {
		var t = Db(), n = P(t, !0);
		I((e) => H(n, e), [() => J("ui.loading")]), V(e, t);
	};
	U(Zx, (e) => {
		R(de) ? e(Qx) : e($x, -1);
	});
	var eS = F(Zx, 2), tS = (e) => {
		dc(e, {
			get image() {
				return R(nl);
			},
			onapply: il,
			oncancel: () => A(nl, null)
		});
	};
	U(eS, (e) => {
		R(nl) && e(tS);
	});
	var nS = F(eS, 2), rS = (e) => {
		{
			let t = /* @__PURE__ */ O(() => R(On).mode === "set" ? Nc(R(j)?.props.design).id : null), n = /* @__PURE__ */ O(() => R(D) ? Ye(R(D)) : null), r = /* @__PURE__ */ O(() => E?.data ? Ye(E.data) : null);
			_l(e, {
				get mode() {
					return R(On).mode;
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
					R(On).mode === "add" ? ax(e) : pr(e), A(On, null);
				},
				onclose: () => A(On, null)
			});
		}
	};
	U(nS, (e) => {
		R(On) && e(rS);
	});
	var iS = F(nS, 2), aS = (e) => {
		var t = kb(), n = M(t), r = M(n), i = P(r, !0), a = F(r, 2);
		Qr(a, 16, () => R(kt).lines, (e) => e, (e, t) => {
			var n = Ob(), r = P(n, !0);
			I(() => H(r, t)), V(e, n);
		});
		var o = F(a, 2), s = (e) => {
			var t = Bh();
			G(t), lt(t, !0), I(() => q(t, "placeholder", R(kt).placeholder)), z("keydown", t, (e) => e.key === "Enter" && R(kt).value.trim() && Mt(!0)), Mi(t, () => R(kt).value, (e) => R(kt).value = e), V(e, t);
		};
		U(o, (e) => {
			R(kt).prompt && e(s);
		});
		var c = F(o, 2), l = M(c), u = P(l, !0), d = F(l, 2), f = P(d, !0);
		T(c), T(n), T(t), I(() => {
			H(i, R(kt).title), H(u, R(kt).cancelLabel), H(f, R(kt).okLabel);
		}), z("pointerdown", t, (e) => Nt = e.target === e.currentTarget), z("click", t, (e) => Nt && e.target === e.currentTarget && Mt(!1)), z("click", l, () => Mt(!1)), z("click", d, () => Mt(!0)), V(e, t);
	};
	U(iS, (e) => {
		R(kt) && e(aS);
	});
	var oS = F(iS, 2), sS = (e) => {
		var t = Ab(), n = M(t), r = M(n), i = P(r, !0), a = F(r, 2), o = P(a, !0), s = F(a, 2), c = M(s), l = F(c);
		G(l), T(s);
		var u = F(s, 2), d = M(u), f = F(d);
		{
			let e = /* @__PURE__ */ O(() => J("setup.accentPick"));
			Na(f, {
				get value() {
					return R(It);
				},
				get label() {
					return R(e);
				},
				onchange: (e) => A(It, e, !0)
			});
		}
		T(u);
		var p = F(u, 2), m = M(p), h = F(m);
		{
			let e = /* @__PURE__ */ O(() => J("setup.bgLabel"));
			Na(h, {
				get value() {
					return R(Lt);
				},
				get label() {
					return R(e);
				},
				onchange: (e) => A(Lt, e, !0)
			});
		}
		T(p);
		var g = F(p, 2), _ = P(g, !0), v = F(g, 2), y = M(v), b = P(y, !0), x = F(y, 2), S = P(x, !0);
		T(v), T(n), T(t), I((e, t, n, r, a, s, u, f, p, h) => {
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
			() => !R(Ft).trim(),
			() => J("setup.start")
		]), z("keydown", l, (e) => e.key === "Enter" && zt()), Mi(l, () => R(Ft), (e) => A(Ft, e)), z("click", y, Rt), z("click", x, zt), V(e, t);
	};
	U(oS, (e) => {
		R(Pt) && e(sS);
	});
	var cS = F(oS, 2), lS = (e) => {
		var t = jb();
		let n;
		var r = M(t), i = P(r, !0), a = F(r, 2);
		T(t), I((e) => {
			n = xi(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: R(he) === "ok",
				error: R(he) === "error"
			}), H(i, R(me)), q(a, "title", e);
		}, [() => J("ui.close")]), z("click", a, () => w("")), V(e, t);
	};
	U(cS, (e) => {
		R(me) && e(lS);
	}), T(Fx);
	var uS = F(Fx, 2), dS = (e) => {
		var t = Mb();
		let n;
		var r = M(t), i = M(r), a = P(i, !0), o = F(i, 2);
		Jm(o, () => Mn, () => Pn);
		var s = F(o, 2);
		W(s, () => R(pn) ? "<svg viewBox=\"0 0 18 18\" width=\"14\" height=\"14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M2 4l4 5-4 5M16 4l-4 5 4 5\"/></svg>" : "<svg viewBox=\"0 0 18 18\" width=\"14\" height=\"14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M6 4L2 9l4 5M12 4l4 5-4 5\"/></svg>", !0), T(s);
		var c = F(s, 2);
		W(c, () => C.cross, !0), T(c), T(r);
		var l = F(r, 2), d = M(l);
		u(d, () => R(yn), () => R(kn)), T(l), T(t), I((e, r, i, o) => {
			n = xi(t, 1, "block-menu svelte-1n46o8q", null, n, { wide: R(yn) }), Ci(t, `--menu-left: ${R(un).left ?? ""}px; --menu-top: ${R(un).top ?? ""}px; --menu-min: ${R(gn) ?? ""}px`), H(a, e), q(s, "title", r), q(s, "aria-label", i), q(c, "title", o);
		}, [
			() => J("blocks.suffix", { label: Ai[R(j).type] ?? R(j).type }),
			() => R(pn) ? J("menu.toNarrow") : J("menu.toWide"),
			() => R(pn) ? J("menu.toNarrow") : J("menu.toWide"),
			() => J("tip.closeEsc")
		]), z("click", s, () => A(pn, !R(pn))), z("click", c, () => A(un, null)), V(e, t);
	};
	U(uS, (e) => {
		R(un) && R(j) && e(dS);
	}), I(() => zx = xi(Rx, 1, "topbar svelte-1n46o8q", null, zx, { hidden: !R(Se) })), V(e, Px), et();
}
//#endregion
//#region src/main.js
Or([
	"change",
	"click",
	"input",
	"pointerdown",
	"keydown"
]), document.documentElement.lang = await sa();
var Fb = Ur(Pb, { target: document.getElementById("urd-admin") });
//#endregion
export { Fb as default };
