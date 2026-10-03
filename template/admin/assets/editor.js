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
var g = 1024, _ = 2048, v = 4096, y = 8192, b = 16384, x = 32768, S = 1 << 25, ee = 65536, te = 1 << 19, ne = 1 << 20, C = 1 << 25, re = 1 << 21, ie = 1 << 22, ae = 1 << 23, oe = Symbol("$state"), se = Symbol("component"), ce = Symbol("legacy props"), w = Symbol(""), le = Symbol("attributes"), ue = Symbol("class"), de = Symbol("style"), fe = Symbol("text"), T = Symbol("form reset"), pe = new class extends Error {
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
function E(e) {
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
function Ye(e) {
	Je = e;
}
function Xe(e, t = !1, n) {
	Je = {
		p: Je,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: Kn,
		l: null
	};
}
function Ze(e) {
	var t = Je, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) xn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, Je = t.p, Qe(e);
}
function Qe(e = {}) {
	return i(e, se, { value: !0 }), e;
}
function $e() {
	return !0;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var et = [];
function D() {
	var e = et;
	et = [], p(e);
}
function tt(e) {
	if (et.length === 0 && !At) {
		var t = et;
		queueMicrotask(() => {
			t === et && D();
		});
	}
	et.push(e);
}
function nt() {
	for (; et.length > 0;) D();
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/status.js
var O = ~(_ | v | g);
function rt(e, t) {
	e.f = e.f & O | t;
}
function it(e) {
	e.f & 512 || e.deps === null ? rt(e, g) : rt(e, v);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function at(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), rt(e, g);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
function ot(e, t) {
	if (t) {
		let t = document.body;
		e.autofocus = !0, tt(() => {
			document.activeElement === t && e.focus();
		});
	}
}
function st(e) {
	Ce && /* @__PURE__ */ cn(e) !== null && un(e);
}
var ct = !1;
function lt() {
	ct || (ct = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[T]?.();
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
	let i = e[T];
	e[T] = i ? () => {
		i(), r(!0);
	} : () => r(!0), lt();
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function ft(e, t, n, r) {
	let i = $e() ? gt : yt;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = Kn, c = pt(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				mn(e, s);
			}
			mt();
		}
	}
	var d = ht();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ vt(e))).then(u).catch((e) => mn(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), mt();
	}) : f();
}
function pt() {
	var e = Kn, t = Un, n = Je, r = Et;
	return function(i = !0) {
		qn(e), Gn(t), Ye(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function mt(e = !0) {
	qn(null), Gn(null), Ye(null), e && Et?.deactivate();
}
function ht() {
	var e = Kn, t = e.b, n = Et, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function gt(e) {
	var t = 2 | _;
	return Kn !== null && (Kn.f |= te), {
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
		parent: Kn,
		ac: null
	};
}
var _t = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function vt(e, t, n) {
	let r = Kn;
	r === null && Pe();
	var i = void 0, a = qt(ge), o = !Un, s = /* @__PURE__ */ new Set();
	return wn(() => {
		var t = Kn, n = m();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== pe && n.reject(e);
			}).finally(mt);
		} catch (e) {
			n.reject(e), mt();
		}
		var c = Et;
		if (o) {
			if (t.f & 32768) var l = ht();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(_t);
			else for (let e of s.values()) e.reject(_t);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== _t && (c.activate(), t ? (a.f |= ae, Zt(a, t)) : (a.f & 8388608 && (a.f ^= ae), Zt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), yn(() => {
		for (let e of s) e.reject(_t);
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
function k(e) {
	let t = /* @__PURE__ */ gt(e);
	return Yn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function yt(e) {
	let t = /* @__PURE__ */ gt(e);
	return t.equals = Ne, t;
}
function bt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) jn(t[n]);
	}
}
function xt(e) {
	var t, n = Kn, r = e.parent;
	if (!Vn && r !== null && e.v !== ge && r.f & 24576) return be(), e.v;
	qn(r);
	try {
		bt(e), t = sr(e);
	} finally {
		qn(n);
	}
	return t;
}
function St(e) {
	var t = xt(e);
	if (!e.equals(t) && (e.wv = ir(), (!Et?.is_fork || e.deps === null) && (Et === null ? e.v = t : (Et.capture(e, t, !0), Dt?.capture(e, t, !0)), e.deps === null))) {
		rt(e, g);
		return;
	}
	Vn || (Ot === null ? it(e) : (vn() || Et?.is_fork) && Ot.set(e, t));
}
function Ct(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && ut(() => {
		t.ac.abort(pe), t.ac = null;
	}), t.fn !== null && (t.teardown = f), ur(t, 0), kn(t));
}
function wt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && dr(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var Tt = null, Et = null, Dt = null, Ot = null, kt = null, At = !1, jt = !1, Mt = null, Nt = null, Pt = 0, Ft = 1, It = class e {
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
		Tt === null ? Tt = this : (Tt.#n = this, this.#t = Tt), Tt = this;
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
					t.f ^= g;
				}
			}
			n || e.push(t);
		}
		return this.#c = [], e;
	}
	#_() {
		this.#e = !0;
		for (let e of this.#u) this.#d.delete(e), rt(e, _), this.schedule(e);
		for (let e of this.#d) rt(e, v), this.schedule(e);
		this.apply();
		for (var t = Mt = [], n = [], r = Nt = []; this.#c.length > 0;) {
			Pt++ > 1e3 && (this.#S(), Rt());
			for (let e of this.#g()) try {
				this.#v(e, t, n);
			} catch (t) {
				throw Ut(e), this.#h() || this.discard(), t;
			}
		}
		if (Et = null, r.length > 0) {
			var i = e.ensure();
			for (let e of r) i.schedule(e);
		}
		if (Mt = null, Nt = null, this.#h()) {
			this.#x(n), this.#x(t);
			for (let [e, t] of this.#f) Ht(e, t);
			r.length > 0 && Et.#_();
			return;
		}
		let a = this.#y();
		if (a) {
			this.#x(n), this.#x(t), a.#b(this);
			return;
		}
		this.#u.clear(), this.#d.clear();
		for (let e of this.#r) e(this);
		this.#r.clear(), Dt = this, Bt(n), Bt(t), Dt = null, this.#s?.resolve();
		var o = Et;
		if (this.#a === 0 && (this.#c.length === 0 || o !== null) && this.#S(), this.#c.length > 0) {
			if (o !== null) {
				for (let e of this.#c) o.#c.push(e);
				this.#c = [];
			} else o = this;
		}
		o !== null && (Gt.clear(), o.#_());
	}
	#v(e, t, n) {
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), rt(i, _), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#S(), Et = this, this.#_();
	}
	#x(e) {
		for (var t = 0; t < e.length; t += 1) at(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== ge && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), Ot?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		Et = this;
	}
	deactivate() {
		Et = null, Ot = null;
	}
	flush() {
		try {
			jt = !0, Et = this, this.#_();
		} finally {
			Pt = 0, kt = null, Mt = null, Nt = null, jt = !1, Et = null, Ot = null, Gt.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(_t);
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
		this.#m || (this.#m = !0, tt(() => {
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
		if (Et === null) {
			let t = Et = new e();
			!jt && !At && tt(() => {
				t.#e || t.flush();
			});
		}
		return Et;
	}
	apply() {
		Ot = null;
	}
	schedule(e) {
		if (kt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		this.#c.push(e);
	}
	#S() {
		if (this.linked) {
			var e = this.#t, t = this.#n;
			e === null || (e.#n = t), t === null ? Tt = e : t.#t = e, this.linked = !1;
		}
	}
};
function Lt(e) {
	var t = At;
	At = !0;
	try {
		var n;
		for (e && (Et !== null && !Et.is_fork && Et.flush(), n = e());;) {
			if (nt(), Et === null) return n;
			Et.flush();
		}
	} finally {
		At = t;
	}
}
function Rt() {
	try {
		ze();
	} catch (e) {
		mn(e, kt);
	}
}
var zt = null;
function Bt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && ar(r) && (zt = /* @__PURE__ */ new Set(), dr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Nn(r), zt?.size > 0)) {
				Gt.clear();
				for (let e of zt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) zt.has(n) && (zt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || dr(n);
					}
				}
				zt.clear();
			}
		}
		zt = null;
	}
}
function Vt(e) {
	Et.schedule(e);
}
function Ht(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), rt(e, g);
		for (var n = e.first; n !== null;) Ht(n, t), n = n.next;
	}
}
function Ut(e) {
	rt(e, g);
	for (var t = e.first; t !== null;) Ut(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var Wt = /* @__PURE__ */ new Set(), Gt = /* @__PURE__ */ new Map(), Kt = !1;
function qt(e, t) {
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
function A(e, t) {
	let n = qt(e, t);
	return Yn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Jt(e, t = !1, n = !0) {
	let r = qt(e);
	return t || (r.equals = Ne), r;
}
function j(e, t, n = !1) {
	return Un !== null && (!Wn || Un.f & 131072) && $e() && Un.f & 4325394 && (Jn === null || !Jn.has(e)) && Ue(), Zt(e, n ? en(t) : t, Nt);
}
var Yt = null, Xt = 0;
function Zt(e, t, n = null) {
	if (!e.equals(t)) {
		Vn ? Gt.set(e, t) : Gt.has(e) || Gt.set(e, e.v);
		var r = It.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && xt(t), Ot === null && it(t);
		}
		e.wv = ir(), Yt = null, Xt = 0, $t(e, _, n), Yt = null, $e() && Kn !== null && Kn.f & 1024 && !(Kn.f & 96) && (Qn === null ? $n([e]) : Qn.push(e)), !r.is_fork && Wt.size > 0 && !Kt && Qt();
	}
	return t;
}
function Qt() {
	Kt = !1;
	for (let e of Wt) {
		e.f & 1024 && rt(e, v);
		let t;
		try {
			t = ar(e);
		} catch {
			t = !0;
		}
		t && dr(e);
	}
	Wt.clear();
}
function M(e) {
	j(e, e.v + 1);
}
function $t(e, t, n) {
	var r = e.reactions;
	if (r !== null) {
		var i = $e(), a = r.length;
		if (Xt += a, Xt > 1e5 && Yt === null && (Yt = /* @__PURE__ */ new Set()), Yt !== null) {
			if (Yt.has(e)) return;
			Yt.add(e);
		}
		for (var o = 0; o < a; o++) {
			var s = r[o], c = s.f;
			if (i || s !== Kn) {
				var l = (c & _) === 0;
				if (l && rt(s, t), c & 131072) Wt.add(s);
				else if (c & 2) {
					var u = s;
					Ot?.delete(u), $t(u, v, n);
				} else if (l) {
					var d = s;
					c & 16 && zt !== null && zt.add(d), n === null ? Vt(d) : n.push(d);
				}
			}
		}
	}
}
function en(t) {
	if (typeof t != "object" || !t || oe in t || se in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ A(0), u = null, d = nr, f = (e) => {
		if (nr === d) return e();
		var t = Un, n = nr;
		Gn(null), rr(d);
		var r = e();
		return Gn(t), rr(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ A(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && Ve();
			var i = r.get(t);
			return i === void 0 ? f(() => {
				var e = /* @__PURE__ */ A(n.value, u);
				return r.set(t, e), e;
			}) : j(i, n.value, !0), !0;
		},
		deleteProperty(e, t) {
			var n = r.get(t);
			if (n === void 0) {
				if (t in e) {
					let e = f(() => /* @__PURE__ */ A(ge, u));
					r.set(t, e), M(o);
				}
			} else j(n, ge), M(o);
			return !0;
		},
		get(e, n, i) {
			if (n === oe) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ A(en(s ? e[n] : ge), u)), r.set(n, o)), o !== void 0) {
				var c = z(o);
				return c === ge ? void 0 : c;
			}
			return Reflect.get(e, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			this.has?.(e, t);
			var n = Reflect.getOwnPropertyDescriptor(e, t), i = r.get(t);
			if (i !== void 0) {
				var a = z(i);
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
			if (t === oe) return !0;
			var n = r.get(t), i = n !== void 0 && n.v !== ge || Reflect.has(e, t);
			return (n !== void 0 || Kn !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ A(i ? en(e[t]) : ge, u)), r.set(t, n)), z(n) === ge) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ A(ge, u)), r.set(d + "", p)) : j(p, ge);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ A(void 0, u)), j(c, en(n)), r.set(t, c));
			else {
				l = c.v !== ge;
				var m = f(() => en(n));
				j(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && j(g, _ + 1);
				}
				M(o);
			}
			return !0;
		},
		ownKeys(e) {
			z(o);
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
function N(e, t) {
	if (!Ce) return /* @__PURE__ */ cn(e);
	var n = /* @__PURE__ */ cn(Te);
	if (n === null) n = Te.appendChild(sn());
	else if (t && n.nodeType !== 3) {
		var r = sn();
		return n?.before(r), Ee(r), r;
	}
	return t && fn(n), Ee(n), n;
}
function P(e, t = !1) {
	if (!Ce) {
		var n = /* @__PURE__ */ cn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ ln(n) : n;
	}
	if (t) {
		if (Te?.nodeType !== 3) {
			var r = sn();
			return Te?.before(r), Ee(r), r;
		}
		fn(Te);
	}
	return Te;
}
function F(e, t = !1) {
	if (!Ce) return /* @__PURE__ */ cn(e);
	var n = N(e, t);
	return E(e), n;
}
function I(e, t = 1, n = !1) {
	let r = Ce ? Te : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ ln(r);
	if (!Ce) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = sn();
			return r === null ? i?.after(a) : r.before(a), Ee(a), a;
		}
		fn(r);
	}
	return Ee(r), r;
}
function un(e) {
	e.textContent = "";
}
function L() {
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
	if (t === null) return Un.f |= ae, e;
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
	Et?.register_created_effect(r);
	var i = r;
	if (e & 4) Mt === null ? It.ensure().schedule(r) : Mt.push(r);
	else if (t !== null) {
		try {
			dr(r);
		} catch (e) {
			throw jn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= ee));
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
	if (!Un && t & 32 && Je !== null && !Je.i) {
		var n = Je;
		(n.e ??= []).push(e);
	} else return xn(e);
}
function xn(e) {
	return _n(4 | ne, e);
}
function Sn(e) {
	It.ensure();
	let t = _n(64 | te, e);
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
	return _n(ie | te, e);
}
function Tn(e, t = 0) {
	return _n(8 | t, e);
}
function R(e, t = [], n = [], r = []) {
	ft(r, t, n, (t) => {
		_n(8, () => {
			e(...t.map(z));
		});
	});
}
function En(e, t = 0) {
	return _n(16 | t, e);
}
function Dn(e) {
	return _n(32 | te, e);
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
		e !== null && ut(() => {
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
		var n = e === t ? null : /* @__PURE__ */ ln(e);
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
		e.f ^= y, e.f & 1024 || (rt(e, _), It.ensure().schedule(e));
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
		var i = n === r ? null : /* @__PURE__ */ ln(n);
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
	Un !== null && (Un.f & 2097152 || Un.f & 2) && (Jn ??= /* @__PURE__ */ new Set()).add(e);
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
	if (t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (ar(a) && St(a), a.wv > e.wv) return !0;
		}
		t & 512 && Ot === null && rt(e, g);
	}
	return !1;
}
function or(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Jn !== null && Jn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? or(a, t, !1) : t === a && (n ? rt(a, _) : a.f & 1024 && rt(a, v), Vt(a));
	}
}
function sr(e) {
	var t = Xn, n = Zn, r = Qn, i = Un, a = Jn, o = Je, s = Wn, c = nr, l = e.f;
	Xn = null, Zn = 0, Qn = null, Un = l & 96 ? null : e, Jn = null, Ye(e.ctx), Wn = !1, nr = ++tr, e.ac !== null && (ut(() => {
		e.ac.abort(pe);
	}), e.ac = null);
	try {
		e.f |= re;
		var u = e.fn, d = u();
		e.f |= x;
		var f = cr(e);
		if ($e() && Qn !== null && !Wn && f !== null && !(e.f & 6146)) for (var p = 0; p < Qn.length; p++) or(Qn[p], e);
		if (i !== null && i !== e) {
			if (tr++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = tr;
			if (t !== null) for (let e of t) e.rv = tr;
			Qn !== null && (r === null ? r = Qn : r.push(...Qn));
		}
		return e.f & 8388608 && (e.f ^= ae), d;
	} catch (t) {
		return cr(e), pn(t);
	} finally {
		e.f ^= re, Xn = t, Zn = n, Qn = r, Un = i, Jn = a, Ye(o), Wn = s, nr = c;
	}
}
function cr(e) {
	var t = e.deps, n = Et?.is_fork;
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
		s.f & 512 && (s.f ^= 512), s.v !== ge && it(s), s.ac !== null && ut(() => {
			s.ac.abort(pe), s.ac = null, rt(s, _);
		}), Ct(s), ur(s, 0);
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
	await Promise.resolve(), Lt();
}
function z(e) {
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
	if (Vn && Gt.has(e)) return Gt.get(e);
	if (t) {
		var a = e;
		if (Vn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || mr(a)) && (o = xt(a)), Gt.set(a, o), o;
		}
		var s = !(a.f & 512) && !Wn && Un !== null && (Bn || !!(Un.f & 512)), c = (a.f & x) === 0;
		ar(a) && (s && (a.f |= 512), St(a)), s && !c && (wt(a), pr(a));
	}
	if (Ot?.has(e)) return Ot.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function pr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (wt(t), pr(t));
}
function mr(e) {
	if (e.v === ge) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Gt.has(t) || t.f & 2 && mr(t)) return !0;
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
		if (r.capture || Dr.call(t, e), !e.cancelBubble) return ut(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? (i.__removed = !1, tt(() => {
		i.__removed || t.addEventListener(e, i, r);
	})) : t.addEventListener(e, i, r), i;
}
function Cr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = Sr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && yn(() => {
		o.__removed = !0, t.removeEventListener(e, o, a);
	});
}
function B(e, t, n) {
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
function V(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (Ce) return jr(Te, null), Te;
		i === void 0 && (i = Ar(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ cn(i)));
		var t = r || nn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ cn(t), s = t.lastChild;
			jr(o, s);
		} else jr(t, t);
		return t;
	};
}
function Mr(e = "") {
	if (!Ce) {
		var t = sn(e + "");
		return jr(t, t), t;
	}
	var n = Te;
	return n.nodeType === 3 ? fn(n) : (n.before(n = sn()), Ee(n)), jr(n, n), n;
}
function Nr() {
	if (Ce) return jr(Te, null), Te;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = sn();
	return e.append(t, n), jr(t, n), e;
}
function H(e, t) {
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
	let t = 0, n = qt(0), r;
	return () => {
		vn() && (z(n), Tn(() => (t === 0 && (r = hr(() => e(() => M(n)))), t += 1, () => {
			tt(() => {
				--t, t === 0 && (r?.(), r = void 0, M(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Fr = ee | te;
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
	#h = Pr(() => (this.#m = qt(this.#l), () => {
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
		tt(r), t && (this.#s = Dn(() => {
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
			t = !0, n && We(), this.#s !== null && Pn(this.#s, () => {
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
		e && (this.is_pending = !0, this.#o = Dn(() => e(this.#e)), tt(() => {
			var e = this.#c = document.createDocumentFragment(), t = sn(), n = !1;
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
				this.#c = null, n && this.#x(Et);
				return;
			}
			this.#u === 0 && (this.#e.before(e), this.#c = null, Pn(this.#o, () => {
				this.#o = null;
			}), this.#x(Et));
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
			} else this.#x(Et);
		} catch (e) {
			this.error(e);
		}
	}
	#x(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		at(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#S(e) {
		var t = Kn, n = Un, r = Je;
		qn(this.#i), Gn(this.#i), Ye(this.#i.ctx);
		try {
			return It.ensure(), e();
		} finally {
			qn(t), Gn(n), Ye(r);
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
		this.#C(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, tt(() => {
			this.#d = !1, this.#m && Zt(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), z(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		Et?.is_fork ? (this.#a && Et.skip_effect(this.#a), this.#o && Et.skip_effect(this.#o), this.#s && Et.skip_effect(this.#s), Et.oncommit(() => {
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
		tt(() => {
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
function U(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[fe] ??= e.nodeValue) && (e[fe] = n, e.nodeValue = `${n}`);
}
function zr(e, t) {
	return Vr(e, t);
}
var Br = /* @__PURE__ */ new Map();
function Vr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	on();
	var l = void 0, u = Sn(() => {
		var u = n ?? t.appendChild(sn());
		Ir(u, { pending: () => {} }, (t) => {
			Xe({});
			var n = Je;
			if (o && (n.c = o), a && (i.$$events = a), Ce && jr(t, null), Rr = s, l = e(t, i) || Qe(), Rr = !0, Ce && (Kn.nodes.end = Te, Te === null || Te.nodeType !== 8 || Te.data !== "]")) throw xe(), he;
			Ze();
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
						Rn(r, t), t.append(sn()), this.#n.set(e, {
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
		var n = Et, r = L();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = sn();
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
function W(e, t, n = !1) {
	var r;
	Ce && (r = Te, De());
	var i = new Ur(e), a = n ? ee : 0;
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
			un(d), d.append(u), e.items.clear();
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
		r?.has(a) ? (a.f |= C, Rn(a, document.createDocumentFragment())) : jn(t[i], n);
	}
}
var qr;
function Jr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = Ce ? Ee(/* @__PURE__ */ cn(u)) : u.appendChild(sn());
	}
	Ce && De();
	var d = null, f = /* @__PURE__ */ yt(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Xr(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= C, Qr(d, null, c)) : In(d) : Pn(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: En(() => {
			p = z(f);
			var e = p.length;
			let t = !1;
			Ce && Ae(c) === "[!" != (e === 0) && (c = ke(), Ee(c), we(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = Et, v = L(), y = 0; y < e; y += 1) {
				Ce && Te.nodeType === 8 && Te.data === "]" && (c = Te, t = !0, we(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Zt(S.v, b), S.i && Zt(S.i, y), v && u.unskip_effect(S.e)) : (S = Zr(l, h ? c : qr ??= sn(), b, x, y, o, n, i), h || (S.e.f |= C), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = Dn(() => s(c)) : (d = Dn(() => s(qr ??= sn())), d.f |= C)), e > r.size && Fe("", "", ""), Ce && e > 0 && Ee(ke()), !h) {
				if (m.set(u, r), v) {
					for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
					u.oncommit(g), u.ondiscard(_);
				} else g(u);
			}
			t && we(!0), z(f);
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
			if (_.f ^= C, _ === l) Qr(_, null, n);
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
					var S = p[0], ee = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Qr(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					$r(e, S.prev, ee.next), $r(e, d, S), $r(e, ee, b), l = b, d = ee, --v, p = [], m = [];
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
		var te = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || te.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && te.push(l), l = Yr(l.next);
		var ne = te.length;
		if (ne > 0) {
			var re = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < ne; v += 1) te[v].nodes?.a?.measure();
				for (v = 0; v < ne; v += 1) te[v].nodes?.a?.fix();
			}
			Gr(e, te, re);
		}
	}
	o && tt(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Zr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? qt(n) : /* @__PURE__ */ Jt(n, !1, !1) : null, l = o & 2 ? qt(i) : null;
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
		var o = /* @__PURE__ */ ln(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function $r(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function G(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		Ce && (o = Ee(/* @__PURE__ */ cn(c)));
	}
	R(() => {
		var e = Kn;
		if (s === (s = t() ?? "")) {
			Ce && De();
			return;
		}
		if (n && !Ce) {
			e.nodes = null, c.innerHTML = s, s !== "" && jr(/* @__PURE__ */ cn(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (Mn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (Ce) {
				for (var a = Te.data, l = De(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ ln(l);
				if (l === null) throw xe(), he;
				jr(Te, u), o = Ee(l);
				return;
			}
			var d = dn(r ? "svg" : i ? "math" : "template", r ? ve : i ? ye : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (jr(/* @__PURE__ */ cn(f), f.lastChild), r || i) for (; /* @__PURE__ */ cn(f);) o.before(/* @__PURE__ */ cn(f));
			else o.before(f);
		}
	});
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/snippet.js
function ei(e, t, ...n) {
	var r = new Ur(e);
	En(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, ee);
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
	ut(() => {
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
		return ut(() => l ??= n()(t, r?.() ?? {}, { direction: c }));
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
function ui(e, t, n, r, i, a) {
	var o = r === 1, s = !1;
	if (d(t)) {
		var c;
		return tt(() => {
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
	return tt(() => {
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
	if (Ce || o !== n || o === void 0) {
		var s = fi(n, r, a);
		(!Ce || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[ue] = n;
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
	if (Ce || i !== t) {
		var a = hi(t, r);
		(!Ce || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[de] = t;
	} else r && (Array.isArray(r) ? (_i(e, n?.[0], r[0]), _i(e, n?.[1], r[1], "important")) : _i(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var yi = Symbol("is custom element"), bi = Symbol("is html"), xi = me ? "link" : "LINK", Si = me ? "progress" : "PROGRESS";
function K(e) {
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
		e[T] = n, tt(n), lt();
	}
}
function q(e, t) {
	var n = wi(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === Si) && (e.value = t ?? "");
}
function Ci(e, t) {
	var n = wi(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function J(e, t, n, r) {
	var i = wi(e);
	Ce && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === xi) || i[t] !== (i[t] = n) && (t === "loading" && (e[w] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Ei(e).has(t) ? e[t] = n : e.setAttribute(t, n));
}
function wi(e) {
	return e[le] ??= {
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
	dt(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = Oi(e) ? ki(a) : a, n(a), Et !== null && r.add(Et), await fr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (Ce && e.defaultValue !== e.value || hr(t) == null && e.value) && (n(Oi(e) ? ki(e.value) : e.value), Et !== null && r.add(Et)), Tn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = Et;
			if (r.has(i)) return;
		}
		Oi(e) && n === ki(e.value) || (e.type !== "date" || n || e.value) && n !== e.value && (e.value = n ?? "");
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
	return e === t || e?.[oe] === t;
}
function ji(e = Qe(), t, n, r) {
	var i = Je.r, a = Kn;
	return Cn(() => {
		var o, s;
		return Tn(() => {
			o = s, s = r?.() || [], hr(() => {
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
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var Mi = !1;
function Ni(e) {
	var t = Mi;
	try {
		return Mi = !1, [e(), Mi];
	} finally {
		Mi = t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
function Pi(e, t, n, r) {
	var i = !0, o = !!(n & 8), s = !!(n & 16), c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ gt(r), z(u)) : (l && (l = !1, c = s ? hr(r) : r), c);
	let f;
	if (o) {
		var p = oe in e || ce in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = Ni(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && Be(t), f(m)));
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
	var v = !1, y = (n & 1 ? gt : yt)(() => (v = !1, g()));
	o && z(y);
	var b = Kn;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? z(y) : i && o ? en(e) : e;
			return j(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Vn && v || b.f & 16384 ? y.v : z(y);
	});
}
var Fi = {
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
		"calendar.unitDays": "dager",
		"calendar.unitHours": "timer",
		"calendar.unitMin": "min",
		"calendar.browse": "Bla gjennom kortene",
		"calendar.untilStart": "Fram til start",
		"calendar.wholeProgram": "Hele programmet",
		"calendar.noticeLabel": "Kunngjøring",
		"calendar.noticeTitle": "Skriv overskriften på kunngjøringen her",
		"calendar.noticeText": "Klikk på teksten i forhåndsvisningen og skriv kunngjøringen.",
		"calendar.moreInfo": "Les mer",
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
		"calendar.swWeek": "Uka",
		"calendar.swMonth": "Måned",
		"calendar.recurring": "Gjentas",
		"calendar.openToAll": "Åpent for alle",
		"calendar.showAll": "Vis alle {n} ({m} til)",
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
}, Ii = [
	"nb",
	"nn",
	"en-GB",
	"se",
	"tr"
], Li = /^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/, Ri = {
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
function zi(e) {
	let t = String(e ?? "").trim().toLowerCase();
	for (let [e, n] of Object.entries(Ri)) if (n.some((e) => t === e || t.startsWith(`${e}-`))) return e;
	return null;
}
function Bi(e) {
	return Ii.includes(String(e ?? ""));
}
function Vi(e) {
	let t = [];
	if (!Array.isArray(e)) return ["languages must be a list"];
	for (let n of e) {
		if (!n || typeof n != "object" || Array.isArray(n)) {
			t.push("languages: every entry must be an object");
			continue;
		}
		let e = String(n.code ?? "");
		Li.test(e) ? Bi(e) && t.push(`languages: '${e}' is built into Urd and cannot be overridden`) : t.push(`languages: '${e}' is not a valid language code`), (typeof n.name != "string" || !n.name.trim()) && t.push(`languages/${e}: name is missing (the language's own name)`);
		for (let r of ["site", "admin"]) n[r] !== void 0 && typeof n[r] != "boolean" && t.push(`languages/${e}: ${r} must be a boolean`);
		n.site !== !0 && n.admin !== !0 && t.push(`languages/${e}: must cover site, admin or both`);
	}
	return t;
}
function Hi(e) {
	let t = zi(e);
	if (t) return t;
	let n = String(e ?? "").trim();
	return Li.test(n) ? n : "nb";
}
async function Ui(e, t) {
	try {
		return await (await import(
			/* @vite-ignore */
			"/assets/urd/language-packs.js"
)).loadPackStrings(e, t);
	} catch {
		return null;
	}
}
var Wi = {
	lang: "nb",
	dict: { ...Fi.strings },
	dates: null
}, Gi = {
	lang: "nb",
	dict: {}
};
function Ki(e, t) {
	if (!t) return e;
	let n = e;
	for (let [e, r] of Object.entries(t)) n = n.replaceAll(`{${e}}`, String(r));
	return n;
}
function Y(e, t) {
	return Ki(Gi.dict[e] ?? e, t);
}
function qi(e, t, n) {
	let r = "other";
	try {
		r = new Intl.PluralRules(Wi.lang).select(t);
	} catch {}
	return Ki(Wi.dict[`${e}.${r}`] ?? Wi.dict[`${e}.other`] ?? `${e}.${r}`, {
		...n,
		n: t
	});
}
function Ji(e) {
	let t = `api.${e?.code}`;
	return e?.code && Gi.dict[t] !== void 0 ? Ki(Gi.dict[t], e) : e?.error ?? null;
}
function Yi() {
	return Gi.lang;
}
function Xi() {
	let e = null;
	try {
		e = localStorage.getItem("urd-admin-lang");
	} catch {}
	if (e) return Hi(e);
	for (let e of navigator.languages ?? [navigator.language]) {
		let t = zi(e);
		if (t) return t;
	}
	return "en-GB";
}
var Zi;
new Promise((e) => {
	Zi = e;
});
async function Qi(e = Xi()) {
	let t = async (e) => (await import(
		/* @vite-ignore */
		`/assets/urd/locales/admin/${e}.js`
)).default.strings;
	Gi.lang = Hi(e);
	let n = Bi(Gi.lang);
	try {
		Object.assign(Gi.dict, await t("nb")), n && Gi.lang !== "nb" && Object.assign(Gi.dict, await t(Gi.lang));
	} catch {}
	if (!n) {
		let e = await Ui(Gi.lang, "admin");
		e ? Object.assign(Gi.dict, e) : Gi.lang = "nb";
	}
	return Zi(Gi.lang), Gi.lang;
}
//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region node_modules/svelte/src/transition/index.js
function $i(e) {
	let t = e - 1;
	return t * t * t + 1;
}
function ea(e) {
	let t = typeof e == "string" && e.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
	return t ? [parseFloat(t[1]), t[2] || "px"] : [e, "px"];
}
function ta(e, { delay: t = 0, duration: n = 400, easing: r = $i, x: i = 0, y: a = 0, opacity: o = 0 } = {}) {
	let s = getComputedStyle(e), c = +s.opacity, l = s.transform === "none" ? "" : s.transform, u = c * (1 - o), [d, f] = ea(i), [p, m] = ea(a);
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
function na(e, t, n, r) {
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
function ra(e = globalThis) {
	let t = e?.HTMLElement?.prototype, n = e?.CSS;
	return !!(t && "popover" in t && typeof t.showPopover == "function" && typeof n?.supports == "function" && n.supports("anchor-name: --urd") && n.supports("position-try-fallbacks: flip-block"));
}
var ia = 0;
function aa(e = "urd-pop") {
	return ia += 1, `--${e}-${ia}`;
}
function oa(e, t) {
	let n = e?.closest?.(".panel-body, .block-menu-body");
	n && (t ? n.style.setProperty("anchor-name", "--urd-pane") : n.style.removeProperty("anchor-name"));
}
//#endregion
//#region src/lib/ColorPicker.svelte
var sa = /* @__PURE__ */ V("<button type=\"button\" class=\"cp-eye svelte-zxiloo\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), ca = /* @__PURE__ */ V("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), la = /* @__PURE__ */ V("<button type=\"button\"></button>"), ua = /* @__PURE__ */ V("<span class=\"cp-label svelte-zxiloo\"> <!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), da = /* @__PURE__ */ V("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\">×</button></span>"), fa = /* @__PURE__ */ V("<span class=\"cp-tokens svelte-zxiloo\"></span>"), pa = /* @__PURE__ */ V("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), ma = /* @__PURE__ */ V("<span class=\"cp-label svelte-zxiloo\"> </span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), ha = /* @__PURE__ */ V("<div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\"> <button type=\"button\" class=\"cp-add svelte-zxiloo\">+</button></span> <!> <!>", 1), ga = /* @__PURE__ */ V("<button type=\"button\" class=\"cp-clear svelte-zxiloo\">×</button>"), _a = /* @__PURE__ */ V("<div class=\"cp-pop cp-anchored svelte-zxiloo\" popover=\"auto\"><!></div>"), va = /* @__PURE__ */ V("<div class=\"cp-pop svelte-zxiloo\"><!></div>"), ya = /* @__PURE__ */ V("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!> <!></span>");
function ba(e, t) {
	Xe(t, !0);
	let n = (e) => {
		var t = ha(), n = P(t), a = F(n), o = I(n, 2);
		K(o);
		var s = I(o, 2);
		K(s);
		var c = I(s, 2), l = N(c), u = I(l, 2);
		K(u);
		var d = I(u, 2), f = (e) => {
			var t = sa();
			R((e) => J(t, "title", e), [() => Y("cp.eyedropper")]), B("click", t, xe), H(e, t);
		};
		W(d, (e) => {
			be && e(f);
		}), E(c);
		var p = I(c, 2);
		Jr(p, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = ca();
			K(r), R((e) => {
				J(r, "title", t), q(r, e);
			}, [() => ve(z(n))]), B("change", r, (e) => ye(z(n), e.target.value)), H(e, r);
		}), E(p);
		var v = I(p, 2), y = (e) => {
			var t = ua(), n = P(t), a = N(n, !0), o = I(a), s = (e) => {
				var t = Mr();
				R((e) => U(t, e), [() => Y("cp.linkedSuffix", { token: m() })]), H(e, t);
			}, c = /* @__PURE__ */ k(() => m());
			W(o, (e) => {
				z(c) && e(s);
			}), E(n);
			var l = I(n, 2);
			Jr(l, 21, i, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ k(() => h(z(t), 2));
				let i = () => z(n)[0], a = () => z(n)[1];
				var o = la();
				let s;
				R((e) => {
					s = gi(o, 1, "cp-token svelte-zxiloo", null, s, { active: r() === i() }), vi(o, `background: ${a() ?? ""}`), J(o, "title", e);
				}, [() => Y("cp.tokenTitle", { name: i() })]), B("click", o, () => he(i(), a())), H(e, o);
			}), E(l), R((e) => U(a, e), [() => Y("cp.themeColors")]), H(e, t);
		};
		W(v, (e) => {
			i().length && e(y);
		});
		var b = I(v, 2), x = N(b), S = I(x);
		E(b);
		var ie = I(b, 2), ae = (e) => {
			var t = fa();
			Jr(t, 20, () => z(_), (e) => e, (e, t) => {
				var n = da(), r = N(n), i = I(r, 2);
				E(n), R((e) => {
					vi(r, `background: ${t ?? ""}`), J(r, "title", t), J(i, "title", e);
				}, [() => Y("cp.removeSaved")]), B("click", r, () => Se(t)), B("click", i, () => we(t)), H(e, n);
			}), E(t), H(e, t);
		};
		W(ie, (e) => {
			z(_).length && e(ae);
		});
		var oe = I(ie, 2), se = (e) => {
			var t = ma(), n = P(t), r = F(n, !0), i = I(n, 2);
			Jr(i, 20, () => z(g), (e) => e, (e, t) => {
				var n = pa();
				R(() => {
					vi(n, `background: ${t ?? ""}`), J(n, "title", t);
				}), B("click", n, () => Se(t)), H(e, n);
			}), E(i), R((e) => U(r, e), [() => Y("common.recent")]), H(e, t);
		};
		W(oe, (e) => {
			z(g).length && e(se);
		}), R((e, t, r, i, c) => {
			vi(n, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${z(ee) ?? ""}, 100%, 50%)`), vi(a, `left: ${z(te) * 100}%; top: ${(1 - z(ne)) * 100}%`), q(o, z(ee)), q(s, e), J(s, "title", t), vi(s, `background: linear-gradient(to right, transparent, ${r ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), vi(l, `background: ${z(re) ?? ""}`), q(u, z(re)), U(x, `${i ?? ""} `), J(S, "title", c);
		}, [
			() => Math.round(z(C) * 100),
			() => Y("cp.alpha"),
			() => ce(),
			() => Y("cp.saved"),
			() => Y("cp.saveTitle")
		]), B("pointerdown", n, ge), B("input", o, (e) => {
			j(ee, Number(e.target.value), !0), le();
		}), B("input", s, (e) => {
			j(C, Number(e.target.value) / 100), le();
		}), B("change", u, _e), B("click", S, Ce), H(e, t);
	}, r = Pi(t, "value", 3, "#000000"), i = Pi(t, "tokens", 19, () => []), a = Pi(t, "label", 19, () => Y("cp.pickColor")), o = Pi(t, "allowClear", 3, !1), s = "urd-recent-colors", c = "urd-saved-colors", l = ra(), u = aa("urd-cp"), d = u.slice(2), f = /* @__PURE__ */ A(null), p = () => {
		let e = i().find(([e]) => e === r());
		return e ? e[1] : r();
	}, m = () => i().find(([e]) => e === r())?.[0] ?? null, g = /* @__PURE__ */ A(en([])), _ = /* @__PURE__ */ A(en([])), v = "", y = "", b = /* @__PURE__ */ A(null), x = /* @__PURE__ */ A(!1), S = /* @__PURE__ */ A(en({
		top: 0,
		left: 0
	})), ee = /* @__PURE__ */ A(0), te = /* @__PURE__ */ A(0), ne = /* @__PURE__ */ A(1), C = /* @__PURE__ */ A(1), re = /* @__PURE__ */ A("#000000");
	function ie(e) {
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
	let ae = (e, t, n) => "#" + [
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
		return ae(...se(z(ee), z(te), z(ne)));
	}
	function w() {
		let e = ce();
		return z(C) >= .995 ? e : e + Math.round(z(C) * 255).toString(16).padStart(2, "0");
	}
	function le() {
		j(re, w(), !0), y = z(re), t.onchange?.(z(re));
	}
	function ue(e) {
		let t = ie(e);
		return t ? (((e) => {
			var t = h(e, 3);
			j(ee, t[0], !0), j(te, t[1], !0), j(ne, t[2], !0);
		})(oe(t[0], t[1], t[2])), j(C, t[3], !0), j(re, w(), !0), !0) : !1;
	}
	function de() {
		ue(p()) || ue("#000000"), v = r(), y = "";
		try {
			let e = JSON.parse(localStorage.getItem(s) ?? "[]");
			j(g, Array.isArray(e) ? e : [], !0);
		} catch {
			j(g, [], !0);
		}
		try {
			let e = JSON.parse(localStorage.getItem(c) ?? "[]");
			j(_, Array.isArray(e) ? e : [], !0);
		} catch {
			j(_, [], !0);
		}
	}
	function fe(e) {
		e.newState === "open" ? (de(), oa(z(b), !0), j(x, !0)) : z(x) && (oa(z(b), !1), j(x, !1), pe());
	}
	function T() {
		de();
		let e = z(b).getBoundingClientRect(), t = z(b).closest(".panel-body")?.getBoundingClientRect(), n = t ? t.right : window.innerWidth, r = Math.max(8, Math.min(e.right - 236, n - 236 - 8)), i = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		j(S, {
			top: i,
			left: r
		}, !0), j(x, !0);
	}
	function pe() {
		if (y && y !== v) {
			let e = [y, ...z(g).filter((e) => e !== y)].slice(0, 8);
			localStorage.setItem(s, JSON.stringify(e));
		}
	}
	function me() {
		if (l) {
			z(f)?.hidePopover();
			return;
		}
		j(x, !1), pe();
	}
	function he(e, n) {
		ue(n), j(re, n, !0), t.onchange?.(e);
	}
	function ge(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			j(te, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), j(ne, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), le();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function _e(e) {
		ue(e.target.value) ? le() : j(re, ce(), !0);
	}
	function ve(e) {
		return (ie(ce()) ?? [
			0,
			0,
			0
		])[e];
	}
	function ye(e, t) {
		let n = ie(ce()) ?? [
			0,
			0,
			0
		];
		n[e] = Math.min(255, Math.max(0, Number(t) || 0)), ((e) => {
			var t = h(e, 3);
			j(ee, t[0], !0), j(te, t[1], !0), j(ne, t[2], !0);
		})(oe(...n)), le();
	}
	let be = typeof window < "u" && "EyeDropper" in window;
	async function xe() {
		try {
			ue((await new window.EyeDropper().open()).sRGBHex) && le();
		} catch {}
	}
	function Se(e) {
		ue(e) && le();
	}
	function Ce() {
		let e = w();
		z(_).includes(e) || (j(_, [e, ...z(_)].slice(0, 12), !0), localStorage.setItem(c, JSON.stringify(Ke(z(_)))));
	}
	function we(e) {
		j(_, z(_).filter((t) => t !== e), !0), localStorage.setItem(c, JSON.stringify(Ke(z(_))));
	}
	bn(() => {
		if (!z(x)) return;
		let e = () => me();
		if (window.addEventListener("blur", e), l) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			z(b) && !z(b).contains(e.target) && me();
		}, n = (e) => {
			e.key === "Escape" && me();
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), () => {
			document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), window.removeEventListener("blur", e);
		};
	});
	var Te = ya(), Ee = N(Te);
	let De;
	var Oe = I(Ee, 2), ke = (e) => {
		var n = ga();
		R((e, t) => {
			J(n, "title", e), J(n, "aria-label", t);
		}, [() => Y("cp.clearTitle"), () => Y("cp.clear")]), B("click", n, () => t.onchange?.("")), H(e, n);
	};
	W(Oe, (e) => {
		o() && r() && e(ke);
	});
	var Ae = I(Oe, 2), je = (e) => {
		var t = _a(), r = N(t), i = (e) => {
			n(e);
		};
		W(r, (e) => {
			z(x) && e(i);
		}), E(t), ji(t, (e) => j(f, e), () => z(f)), R(() => {
			J(t, "id", d), vi(t, `position-anchor: ${u ?? ""}`);
		}), Cr("toggle", t, fe), B("click", t, (e) => e.preventDefault()), H(e, t);
	}, Me = (e) => {
		var t = va(), r = N(t);
		n(r), E(t), R(() => vi(t, `top: ${z(S).top ?? ""}px; left: ${z(S).left ?? ""}px`)), B("click", t, (e) => e.preventDefault()), H(e, t);
	};
	W(Ae, (e) => {
		l ? e(je) : z(x) && e(Me, 1);
	}), E(Te), ji(Te, (e) => j(b, e), () => z(b)), R((e, t, n) => {
		De = gi(Ee, 1, "cp-swatch svelte-zxiloo", null, De, {
			linked: e,
			"cp-empty": o() && !r()
		}), vi(Ee, `background: ${t ?? ""}${l ? `; anchor-name: ${u}` : ""}`), J(Ee, "title", n), J(Ee, "popovertarget", l ? d : void 0), J(Ee, "aria-label", a());
	}, [
		() => m(),
		() => r() ? p() : "transparent",
		() => m() ? Y("cp.linkedTitle", {
			label: a(),
			token: m()
		}) : a()
	]), B("click", Ee, function(...e) {
		(l ? void 0 : () => z(x) ? me() : T())?.apply(this, e);
	}), H(e, Te), Ze();
}
wr([
	"pointerdown",
	"input",
	"change",
	"click"
]);
//#endregion
//#region ../template/assets/engine/0.7.4/imageTools.js
var xa = 1600, Sa = .82, Ca = .6, wa = 15e6, Ta = 4e6, Ea = class extends Error {
	constructor(e) {
		super("The animated image is too large"), this.code = "animatedTooLarge", this.bytes = e;
	}
}, Da = (e, t, n) => {
	if (t + n.length > e.length) return !1;
	for (let r = 0; r < n.length; r += 1) if (e[t + r] !== n.charCodeAt(r)) return !1;
	return !0;
};
function Oa(e) {
	if (!Da(e, 0, "GIF87a") && !Da(e, 0, "GIF89a") || e.length < 13) return !1;
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
function ka(e) {
	return !Da(e, 0, "RIFF") || !Da(e, 8, "WEBP") ? !1 : Da(e, 12, "VP8X") && e.length > 20 && !!(e[20] & 2);
}
function Aa(e) {
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
		if (Da(e, t + 4, "acTL")) return !0;
		if (Da(e, t + 4, "IDAT") || Da(e, t + 4, "IEND")) return !1;
		t += 12 + n;
	}
	return !1;
}
function ja(e) {
	return e instanceof Uint8Array ? Oa(e) ? "gif" : ka(e) ? "webp" : Aa(e) ? "png" : null : null;
}
async function Ma(e) {
	if (!/^image\/(?:gif|webp|png|apng)$/i.test(e.type || "") && !/\.(?:gif|webp|a?png)$/i.test(e.name || "")) return null;
	let t = new Uint8Array(await e.arrayBuffer()), n = ja(t);
	if (!n) return null;
	if (t.length > 4e6) throw new Ea(t.length);
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
async function Na(e, t = xa) {
	if (Fa(e)) return Ia(await e.text());
	let n = await Ma(e);
	if (n) return n;
	let r = await createImageBitmap(e), i = Math.min(1, t / Math.max(r.width, r.height)), a = Math.round(r.width * i), o = Math.round(r.height * i), s = document.createElement("canvas");
	s.width = a, s.height = o, s.getContext("2d").drawImage(r, 0, 0, a, o), r.close();
	let c = (e) => new Promise((t) => s.toBlob(t, "image/webp", e)), l = await c(Sa);
	return l.size > 4e5 && (l = await c(Ca)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(l);
		}),
		bytes: l.size,
		width: a,
		height: o
	};
}
var Pa = "image/svg+xml";
function Fa(e) {
	return e.type === Pa || /\.svg$/i.test(e.name || "");
}
function Ia(e) {
	let t = String(e ?? "");
	if (!/<svg[\s>]/i.test(t)) throw Error("Invalid SVG");
	if (/<\s*script[\s>]/i.test(t) || /<\s*foreignObject[\s>]/i.test(t) || /\son[a-z]+\s*=/i.test(t) || /javascript:/i.test(t)) throw Error("The SVG contains scripts or event handlers and cannot be used");
	let n = new Blob([t]).size, r = `data:${Pa};base64,${btoa(unescape(encodeURIComponent(t)))}`, i = t.match(/<svg\b[^>]*>/i)?.[0] ?? "", a = i.match(/viewBox\s*=\s*["']\s*([-\d.]+(?:[\s,]+[-\d.]+){3})\s*["']/i)?.[1]?.split(/[\s,]+/).map(Number);
	return {
		dataUrl: r,
		bytes: n,
		width: a?.length === 4 ? a[2] : Number.parseFloat(i.match(/\bwidth\s*=\s*["']?([\d.]+)/i)?.[1]) || 0,
		height: a?.length === 4 ? a[3] : Number.parseFloat(i.match(/\bheight\s*=\s*["']?([\d.]+)/i)?.[1]) || 0
	};
}
function La(e, t, n = .04) {
	let r = String(e ?? "");
	if (!t || !(t.width > 0) || !(t.height > 0)) return r;
	let i = r.match(/<svg\b[^>]*>/i)?.[0];
	if (!i) return r;
	let a = (e) => Math.round(e * 1e3) / 1e3, o = Math.max(t.width, t.height) * Math.max(0, n), s = a(t.x - o), c = a(t.y - o), l = a(t.width + 2 * o), u = a(t.height + 2 * o), d = i.replace(/\sviewBox\s*=\s*["'][^"']*["']/i, "").replace(/\swidth\s*=\s*["'][^"']*["']/i, "").replace(/\sheight\s*=\s*["'][^"']*["']/i, "").replace(/<svg\b/i, `<svg viewBox="${s} ${c} ${l} ${u}" width="${l}" height="${u}"`);
	return r.replace(i, d);
}
function Ra(e) {
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
function za(e) {
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
function Ba(e, t = "image") {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || t;
}
function Va(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region ../template/assets/engine/0.7.4/glyphs.js
var Ha = "urd-recent-glyphs", Ua = "urd-recent-icons", Wa = [
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
function Ga(e, t) {
	return [t, ...(Array.isArray(e) ? e : []).filter((e) => e !== t)].slice(0, 16);
}
var Ka = (e) => {
	try {
		let t = JSON.parse(localStorage.getItem(e) ?? "[]");
		return Array.isArray(t) ? t : [];
	} catch {
		return [];
	}
}, qa = (e, t, n) => {
	let r = Ga(t, n);
	try {
		localStorage.setItem(e, JSON.stringify(r));
	} catch {}
	return r;
};
function Ja() {
	return Ka(Ha);
}
function Ya(e) {
	return qa(Ha, Ja(), e);
}
function Xa() {
	return Ka(Ua);
}
function Za(e) {
	return qa(Ua, Xa(), e);
}
//#endregion
//#region ../template/assets/engine/0.7.4/icons.js
var Qa = "fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"", $a = "fill=\"currentColor\" stroke=\"none\"", eo = {
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
}, to = [
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
function no(e) {
	let t = typeof e == "string" ? eo[e] : null;
	return t ? `<svg viewBox="0 0 24 24" width="100%" height="100%" ${t.fill ? $a : Qa} aria-hidden="true" focusable="false">${t.body}</svg>` : null;
}
//#endregion
//#region src/lib/GlyphPicker.svelte
var ro = /* @__PURE__ */ V("<button type=\"button\"><span class=\"gp-svg svelte-15ln1c3\"></span></button>"), io = /* @__PURE__ */ V("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), ao = /* @__PURE__ */ V("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"><!> <!></div>", 1), oo = /* @__PURE__ */ V("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), so = /* @__PURE__ */ V("<button type=\"button\"> </button>"), co = /* @__PURE__ */ V("<div class=\"gp-group svelte-15ln1c3\"> </div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\"> </button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\"> </p>", 1), lo = /* @__PURE__ */ V("<!> <!> <!> <!>", 1), uo = /* @__PURE__ */ V("<img class=\"gp-own svelte-15ln1c3\"/>"), fo = /* @__PURE__ */ V("<span class=\"gp-svg svelte-15ln1c3\"></span>"), po = /* @__PURE__ */ V("<div class=\"gp-pop gp-anchored svelte-15ln1c3\" popover=\"auto\"><!></div>"), mo = /* @__PURE__ */ V("<div class=\"gp-pop svelte-15ln1c3\"><!></div>"), ho = /* @__PURE__ */ V("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"><!></button> <!></span>");
function go(e, t) {
	Xe(t, !0);
	let n = (e) => {
		var n = lo(), a = P(n), o = (e) => {
			var t = ao(), n = P(t), r = F(n, !0), a = I(n, 2), o = N(a);
			Jr(o, 16, () => z(d), (e) => e, (e, t) => {
				var n = ro();
				let r;
				var a = N(n);
				G(a, () => no(t), !0), E(a), E(n), R((e) => {
					r = gi(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, r, { active: t === i() }), J(n, "title", e);
				}, [() => Y(eo[t].labelKey)]), B("click", n, () => ee(t)), H(e, n);
			}), Jr(I(o, 2), 16, () => z(u), (e) => e, (e, t) => {
				var n = io(), r = F(n, !0);
				R(() => U(r, t)), B("click", n, () => S(t)), H(e, n);
			}), E(a), R((e) => U(r, e), [() => Y("common.recent")]), H(e, t);
		};
		W(a, (e) => {
			(z(u).length || z(d).length) && e(o);
		});
		var s = I(a, 2), c = (e) => {
			var t = Nr();
			Jr(P(t), 17, () => to, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ k(() => h(z(t), 2));
				let r = () => z(n)[0], a = () => z(n)[1];
				var o = oo(), s = P(o), c = F(s, !0), l = I(s, 2);
				Jr(l, 20, a, (e) => e, (e, t) => {
					var n = ro();
					let r;
					var a = N(n);
					G(a, () => no(t), !0), E(a), E(n), R((e) => {
						r = gi(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, r, { active: t === i() }), J(n, "title", e);
					}, [() => Y(eo[t].labelKey)]), B("click", n, () => ee(t)), H(e, n);
				}), E(l), R((e) => U(c, e), [() => Y(r())]), H(e, o);
			}), H(e, t);
		};
		W(s, (e) => {
			t.onicon && e(c);
		});
		var l = I(s, 2);
		Jr(l, 17, () => Wa, ([e, t]) => e, (e, t) => {
			var n = /* @__PURE__ */ k(() => h(z(t), 2));
			let i = () => z(n)[0], a = () => z(n)[1];
			var o = oo(), s = P(o), c = F(s, !0), l = I(s, 2);
			Jr(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var n = so();
				let i;
				var a = F(n, !0);
				R(() => {
					i = gi(n, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === r() }), U(a, t);
				}), B("click", n, () => S(t)), H(e, n);
			}), E(l), R((e) => U(c, e), [() => Y(i())]), H(e, o);
		});
		var f = I(l, 2), p = (e) => {
			var t = co(), n = P(t), r = F(n, !0), i = I(n, 2), a = F(i, !0), o = I(i, 2);
			ji(o, (e) => j(m, e), () => z(m));
			var s = F(I(o, 2), !0);
			R((e, t, n) => {
				U(r, e), U(a, t), U(s, n);
			}, [
				() => Y("gp.ownIcon"),
				() => Y("gp.upload"),
				() => Y("gp.uploadHint")
			]), B("click", i, () => z(m).click()), B("change", o, te), H(e, t);
		};
		W(f, (e) => {
			t.onimage && e(p);
		}), H(e, n);
	}, r = Pi(t, "value", 3, "★"), i = Pi(t, "icon", 3, null), a = Pi(t, "image", 3, null), o = Pi(t, "label", 19, () => Y("gp.pickGlyph")), s = ra(), c = aa("urd-gp"), l = c.slice(2), u = /* @__PURE__ */ A(en([])), d = /* @__PURE__ */ A(en([])), f = /* @__PURE__ */ A(null), p = /* @__PURE__ */ A(null), m = /* @__PURE__ */ A(null), g = /* @__PURE__ */ A(!1), _ = /* @__PURE__ */ A(en({
		top: 0,
		left: 0
	}));
	function v() {
		j(u, Ja(), !0), j(d, t.onicon ? Xa().filter((e) => eo[e]) : [], !0);
	}
	function y(e) {
		j(g, e.newState === "open"), oa(z(f), z(g)), z(g) && v();
	}
	function b() {
		s && z(p)?.hidePopover(), j(g, !1);
	}
	function x() {
		v();
		let e = z(f).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		j(_, {
			top: n,
			left: t
		}, !0), j(g, !0);
	}
	function S(e) {
		Ya(e), t.onpick?.(e), b();
	}
	function ee(e) {
		Za(e), t.onicon?.(e), b();
	}
	async function te(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", !n) return;
		let r = await Na(n, 256);
		t.onimage?.(r.dataUrl), b();
	}
	bn(() => {
		if (!z(g)) return;
		let e = () => b();
		if (window.addEventListener("blur", e), s) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			z(f) && !z(f).contains(e.target) && j(g, !1);
		}, n = (e) => {
			e.key === "Escape" && j(g, !1);
		}, r = (e) => {
			z(f) && e.target instanceof Node && !z(f).contains(e.target) && j(g, !1);
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var ne = ho(), C = N(ne), re = N(C), ie = (e) => {
		var t = uo();
		R((e) => {
			J(t, "src", a()), J(t, "alt", e);
		}, [() => Y("gp.ownIcon")]), H(e, t);
	}, ae = (e) => {
		var t = fo();
		G(t, () => no(i()), !0), E(t), H(e, t);
	}, oe = (e) => {
		var t = Mr();
		R(() => U(t, r() || "★")), H(e, t);
	};
	W(re, (e) => {
		a() ? e(ie) : i() && eo[i()] ? e(ae, 1) : e(oe, -1);
	}), E(C);
	var se = I(C, 2), ce = (e) => {
		var t = po(), r = N(t), i = (e) => {
			n(e);
		};
		W(r, (e) => {
			z(g) && e(i);
		}), E(t), ji(t, (e) => j(p, e), () => z(p)), R(() => {
			J(t, "id", l), vi(t, `position-anchor: ${c ?? ""}`);
		}), Cr("toggle", t, y), H(e, t);
	}, w = (e) => {
		var t = mo(), r = N(t);
		n(r), E(t), R(() => vi(t, `top: ${z(_).top ?? ""}px; left: ${z(_).left ?? ""}px`)), H(e, t);
	};
	W(se, (e) => {
		s ? e(ce) : z(g) && e(w, 1);
	}), E(ne), ji(ne, (e) => j(f, e), () => z(f)), R(() => {
		J(C, "title", o()), J(C, "aria-label", o()), J(C, "popovertarget", s ? l : void 0), vi(C, s ? `anchor-name: ${c}` : void 0);
	}), B("click", C, function(...e) {
		(s ? void 0 : () => z(g) ? j(g, !1) : x())?.apply(this, e);
	}), H(e, ne), Ze();
}
wr(["click", "change"]);
//#endregion
//#region src/lib/MarkPicker.svelte
var _o = /* @__PURE__ */ V("<span class=\"mp-count svelte-1y5ipgc\"> </span>"), vo = /* @__PURE__ */ V("<div class=\"mp-tabs svelte-1y5ipgc\" role=\"group\"><button type=\"button\"> </button> <button type=\"button\"> <!></button></div>"), yo = /* @__PURE__ */ V("<button type=\"button\"><span class=\"mp-svg svelte-1y5ipgc\"></span></button>"), bo = /* @__PURE__ */ V("<p class=\"mp-hint svelte-1y5ipgc\"> </p>"), xo = /* @__PURE__ */ V("<input class=\"mp-search svelte-1y5ipgc\" type=\"search\"/> <div class=\"mp-scroll svelte-1y5ipgc\"><div class=\"mp-grid svelte-1y5ipgc\"><button type=\"button\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" aria-hidden=\"true\" class=\"svelte-1y5ipgc\"><circle cx=\"12\" cy=\"12\" r=\"8.5\"></circle><path d=\"M6 18L18 6\"></path></svg></button> <!></div> <!></div>", 1), So = /* @__PURE__ */ V("<button type=\"button\"><img alt=\"\" class=\"svelte-1y5ipgc\"/></button>"), Co = /* @__PURE__ */ V("<div class=\"mp-scroll svelte-1y5ipgc\"><div class=\"mp-grid mp-grid-img svelte-1y5ipgc\"><button type=\"button\" class=\"mp-cell mp-upload svelte-1y5ipgc\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" aria-hidden=\"true\" class=\"svelte-1y5ipgc\"><path d=\"M12 5v14\"></path><path d=\"M5 12h14\"></path></svg> <span> </span></button> <!></div> <p class=\"mp-hint svelte-1y5ipgc\"> </p></div>"), wo = /* @__PURE__ */ V("<!> <!>", 1), To = /* @__PURE__ */ V("<img class=\"mp-own svelte-1y5ipgc\" alt=\"\"/>"), Eo = /* @__PURE__ */ V("<span class=\"mp-svg svelte-1y5ipgc\"></span>"), Do = /* @__PURE__ */ V("<span class=\"mp-empty svelte-1y5ipgc\" aria-hidden=\"true\">+</span>"), Oo = /* @__PURE__ */ V("<div class=\"mp-pop mp-anchored svelte-1y5ipgc\" popover=\"auto\"><!></div>"), ko = /* @__PURE__ */ V("<div class=\"mp-pop svelte-1y5ipgc\"><!></div>"), Ao = /* @__PURE__ */ V("<span class=\"mp svelte-1y5ipgc\"><button type=\"button\"><!></button> <!> <input type=\"file\" accept=\"image/*\" hidden=\"\"/></span>");
function jo(e, t) {
	Xe(t, !0);
	let n = (e) => {
		var t = wo(), n = P(t), a = (e) => {
			var t = vo(), n = N(t);
			let r;
			var i = F(n, !0), a = I(n, 2);
			let s;
			var c = N(a, !0), l = I(c), u = (e) => {
				var t = _o(), n = F(t, !0);
				R(() => U(n, z(S).length)), H(e, t);
			};
			W(l, (e) => {
				z(S).length && e(u);
			}), E(a), E(t), R((e, l) => {
				J(t, "aria-label", o()), r = gi(n, 1, "mp-tab svelte-1y5ipgc", null, r, { on: z(_) === "icons" }), J(n, "aria-pressed", z(_) === "icons"), U(i, e), s = gi(a, 1, "mp-tab svelte-1y5ipgc", null, s, { on: z(_) === "images" }), J(a, "aria-pressed", z(_) === "images"), U(c, l);
			}, [() => Y("mp.icons"), () => Y("mp.images")]), B("click", n, () => j(_, "icons")), B("click", a, () => j(_, "images")), H(e, t);
		};
		W(n, (e) => {
			l() || e(a);
		});
		var c = I(n, 2), u = (e) => {
			var t = xo(), n = P(t);
			K(n);
			var a = I(n, 2), o = N(a), c = N(o);
			let l;
			Jr(I(c, 2), 17, () => z(x), ({ id: e }) => e, (e, t) => {
				let n = () => z(t).id;
				var a = yo();
				let o;
				var s = N(a);
				G(s, () => no(n()), !0), E(s), E(a), R((e, t) => {
					o = gi(a, 1, "mp-cell svelte-1y5ipgc", null, o, { active: n() === r() && !i() }), J(a, "title", e), J(a, "aria-label", t);
				}, [() => Y(eo[n()].labelKey), () => Y(eo[n()].labelKey)]), B("click", a, () => re(n())), H(e, a);
			}), E(o);
			var u = I(o, 2), d = (e) => {
				var t = bo(), n = F(t, !0);
				R((e) => U(n, e), [() => Y("mp.noHits")]), H(e, t);
			};
			W(u, (e) => {
				z(x).length || e(d);
			}), E(a), R((e, t) => {
				J(n, "placeholder", e), J(n, "aria-label", t), l = gi(c, 1, "mp-cell mp-none svelte-1y5ipgc", null, l, { active: !r() && !i() }), J(c, "title", s()), J(c, "aria-label", s());
			}, [() => Y("mp.search"), () => Y("mp.search")]), Di(n, () => z(v), (e) => j(v, e)), B("click", c, ae), H(e, t);
		}, d = (e) => {
			var t = Co(), n = N(t), r = N(n), a = F(I(N(r), 2), !0);
			E(r), Jr(I(r, 2), 16, () => z(S), (e) => e, (e, t) => {
				var n = So();
				let r;
				var a = F(n);
				R(() => {
					r = gi(n, 1, "mp-cell mp-img svelte-1y5ipgc", null, r, { active: t === i() }), J(a, "src", t);
				}), B("click", n, () => ie(t)), H(e, n);
			}), E(n);
			var o = F(I(n, 2), !0);
			E(t), R((e, t) => {
				U(a, e), U(o, t);
			}, [() => Y("mp.upload"), () => Y("mp.imagesHint")]), B("click", r, ce), H(e, t);
		};
		W(c, (e) => {
			z(_) === "icons" ? e(u) : e(d, -1);
		}), H(e, t);
	}, r = Pi(t, "icon", 3, ""), i = Pi(t, "image", 3, ""), a = Pi(t, "images", 19, () => []), o = Pi(t, "label", 19, () => Y("mp.pickMark")), s = Pi(t, "noneLabel", 19, () => Y("common.none")), c = Pi(t, "klass", 3, ""), l = Pi(t, "iconsOnly", 3, !1), u = ra(), d = aa("urd-mp"), f = d.slice(2), p = /* @__PURE__ */ A(null), m = /* @__PURE__ */ A(null), h = /* @__PURE__ */ A(null), g = /* @__PURE__ */ A(!1), _ = /* @__PURE__ */ A("icons"), v = /* @__PURE__ */ A(""), y = /* @__PURE__ */ A(en({
		top: 0,
		left: 0
	})), b = to.flatMap(([e, t]) => t.map((t) => ({
		id: t,
		cat: e
	}))), x = /* @__PURE__ */ k(() => {
		let e = z(v).trim().toLowerCase();
		return e ? b.filter(({ id: t }) => {
			let n = Y(eo[t].labelKey) || eo[t].label;
			return t.includes(e) || n.toLowerCase().includes(e);
		}) : b;
	}), S = /* @__PURE__ */ k(() => [...new Set(a().filter(Boolean))]);
	function ee() {
		j(v, ""), j(oe, !1), j(_, i() && !l() ? "images" : "icons", !0);
	}
	function te(e) {
		j(g, e.newState === "open"), oa(z(p), z(g)), z(g) && ee();
	}
	function ne() {
		u && z(m)?.hidePopover(), j(g, !1);
	}
	function C() {
		ee();
		let e = z(p).getBoundingClientRect();
		j(y, {
			left: Math.max(8, Math.min(e.left, window.innerWidth - 286 - 8)),
			top: e.bottom + 332 + 8 > window.innerHeight ? Math.max(8, e.top - 332 - 8) : e.bottom + 6
		}, !0), j(g, !0);
	}
	function re(e) {
		t.onpick?.({
			icon: e,
			image: ""
		});
	}
	function ie(e) {
		t.onpick?.({ image: e });
	}
	function ae() {
		t.onpick?.({
			icon: "",
			image: ""
		});
	}
	let oe = /* @__PURE__ */ A(!1);
	function se(e) {
		j(oe, !1);
		let n = e.target.files?.[0];
		e.target.value = "", n && t.onfile?.(n);
	}
	function ce() {
		j(oe, !0), z(h).click();
	}
	bn(() => {
		if (!z(g)) return;
		let e = () => {
			z(oe) || ne();
		};
		if (window.addEventListener("blur", e), u) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			z(p) && !z(p).contains(e.target) && j(g, !1);
		}, n = (e) => {
			e.key === "Escape" && j(g, !1);
		}, r = (e) => {
			z(p) && e.target instanceof Node && !z(p).contains(e.target) && j(g, !1);
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var w = Ao(), le = N(w), ue = N(le), de = (e) => {
		var n = Nr();
		ei(P(n), () => t.children), H(e, n);
	}, fe = (e) => {
		var t = To();
		R(() => J(t, "src", i())), H(e, t);
	}, T = (e) => {
		var t = Eo();
		G(t, () => no(r()), !0), E(t), H(e, t);
	}, pe = (e) => {
		H(e, Do());
	};
	W(ue, (e) => {
		t.children ? e(de) : i() ? e(fe, 1) : r() && eo[r()] ? e(T, 2) : e(pe, -1);
	}), E(le);
	var me = I(le, 2), he = (e) => {
		var t = Oo(), r = N(t), i = (e) => {
			n(e);
		};
		W(r, (e) => {
			z(g) && e(i);
		}), E(t), ji(t, (e) => j(m, e), () => z(m)), R(() => {
			J(t, "id", f), vi(t, `position-anchor: ${d ?? ""}`);
		}), Cr("toggle", t, te), H(e, t);
	}, ge = (e) => {
		var t = ko(), r = N(t);
		n(r), E(t), R(() => vi(t, `top: ${z(y).top ?? ""}px; left: ${z(y).left ?? ""}px`)), H(e, t);
	};
	W(me, (e) => {
		u ? e(he) : z(g) && e(ge, 1);
	});
	var _e = I(me, 2);
	ji(_e, (e) => j(h, e), () => z(h)), E(w), ji(w, (e) => j(p, e), () => z(p)), R(() => {
		gi(le, 1, `mp-trigger ${c() ?? ""}`, "svelte-1y5ipgc"), J(le, "title", o()), J(le, "aria-label", o()), J(le, "popovertarget", u ? f : void 0), vi(le, u ? `anchor-name: ${d}` : void 0);
	}), B("click", le, function(...e) {
		(u ? void 0 : () => z(g) ? j(g, !1) : C())?.apply(this, e);
	}), B("change", _e, se), Cr("cancel", _e, () => j(oe, !1)), H(e, w), Ze();
}
wr(["click", "change"]);
//#endregion
//#region src/lib/previewBridge.js
function Mo(e, t = {}) {
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
function No(e, t) {
	return !(e > 0) || !(t > 0) ? 1 : e / t;
}
function Po(e, t, n, r = 0, i = 0) {
	if (n === "full") return 1;
	let a = i > 0 ? No(r, i) : Infinity;
	return Math.max(.1, Math.min(1, No(e, t), a));
}
//#endregion
//#region src/lib/deploy-wait.js
function Fo(e, { max: t = 8 } = {}) {
	let n = (e ?? []).filter((e) => e && typeof e.path == "string" && typeof e.content == "string" && e.encoding === "utf-8" && !e.delete && (e.path.startsWith("content/") || e.path === "plugins/plugins.json"));
	return n.sort((e, t) => (e.path === "content/site.json" ? -1 : 0) - (t.path === "content/site.json" ? -1 : 0)), n.slice(0, t).map(({ path: e, content: t }) => ({
		path: e,
		content: t
	}));
}
async function Io(e, { fetchFn: t = fetch, delayMs: n = 1e4, attempts: r = 18, sleep: i = (e) => new Promise((t) => setTimeout(t, e)) } = {}) {
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
var Lo = 3840, Ro = 2400, zo = (e, t, n) => Math.min(n, Math.max(t, e));
function Bo({ innerWidth: e = 0, screenWidth: t = 0 } = {}) {
	let n = e > 0 ? e : t;
	return Math.max(1, Math.round(n > 0 ? n : 1));
}
function Vo(e) {
	return !e || typeof e.innerWidth != "number" ? null : Bo({
		innerWidth: e.innerWidth,
		screenWidth: e.screen?.width ?? 0
	});
}
function Ho(e, t) {
	let n = e && typeof e == "object" && !Array.isArray(e) ? e : {}, r = n.mode === "custom" ? "custom" : "own", i = Number(n.width), a = zo(Number.isFinite(i) && i > 0 ? i : t, 640, Lo), o = Number(n.height), s = Number.isFinite(o) && o > 0 ? zo(o, 480, Ro) : 0;
	return {
		mode: r,
		width: Math.round(a),
		height: Math.round(s)
	};
}
function Uo(e, t) {
	return e?.mode === "custom" ? {
		width: e.width,
		height: e.height || 0
	} : {
		width: t,
		height: 0
	};
}
var Wo = 1920, Go = [
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
], Ko = [
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
], qo = [
	1920,
	1536,
	1366
];
function Jo(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 1440;
	let n = Math.round(t / 20) * 20;
	return Math.min(Wo, Math.max(960, n));
}
function Yo(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 6;
	let n = Math.round(t / 1) * 1;
	return Math.min(12, Math.max(0, n));
}
function Xo(e, t) {
	if (e === "full") return 0;
	let n = Math.min(49, Math.max(0, Number(t) || 0));
	return Math.ceil(Number(e) / (1 - 2 * n / 100));
}
function Zo(e, t, n) {
	let r = Math.max(0, Number(t) || 0) / 100 * n, i = Math.max(0, n - 2 * r), a = e !== "full" && Number(e) < i, o = a ? Number(e) : i;
	return {
		width: o,
		margin: Math.round((n - o) / 2),
		pct: n > 0 ? o / n * 100 : 0,
		bound: a
	};
}
function Qo(e) {
	return Ko.find((t) => t.width === e)?.id ?? null;
}
//#endregion
//#region src/lib/nav-size.js
var $o = {
	min: 0,
	max: 64,
	step: 1
}, es = {
	min: 12,
	max: 28,
	step: 1
}, ts = {
	min: 0,
	max: 80,
	step: 1
}, ns = {
	min: 0,
	max: 64,
	step: 1
}, rs = {
	min: 480,
	max: 1920,
	step: 20
}, is = {
	min: .3,
	max: .8,
	step: .05
}, as = {
	min: 0,
	max: 400,
	step: 10
}, os = {
	min: 0,
	max: 1200,
	step: 20
}, ss = {
	min: 0,
	max: 64,
	step: 1
}, cs = {
	min: 180,
	max: 400,
	step: 1
}, ls = {
	min: 12,
	max: 128,
	step: 1
}, us = {
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
}, ds = [
	"sm",
	"md",
	"lg",
	"xl"
], fs = .67;
function ps(e) {
	return e === "floating" || e === "floating-square" || e === "floating-tab";
}
function ms(e, { min: t, max: n, step: r = 1 }, i) {
	let a = Number(e);
	if (e == null || e === "" || !Number.isFinite(a)) return i;
	let o = Math.round(a / r) * r, s = Math.min(n, Math.max(t, o));
	return r < 1 ? Math.round(s * 100) / 100 : s;
}
function hs(e, t) {
	if (e?.padY != null && e.padY !== "") return ms(e.padY, $o, us.md.padY);
	let n = us[e?.size] ?? us.md;
	return Math.round(n.padY * (ps(t) ? fs : 1));
}
function gs(e) {
	if (e?.textSize != null && e.textSize !== "") return ms(e.textSize, es, us.md.textSize);
	let t = us[e?.size] ?? us.md;
	return Math.round(t.textSize);
}
function _s(e) {
	return e?.padY != null && e.padY !== "" || e?.textSize != null && e.textSize !== "" ? null : ds.includes(e?.size) ? e.size : "md";
}
//#endregion
//#region src/lib/Dropdown.svelte
var vs = /* @__PURE__ */ V("<span aria-hidden=\"true\"><svg viewBox=\"0 0 16 16\" width=\"1em\" height=\"1em\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"svelte-vtocc6\"><path d=\"M3.5 6l4.5 4.5L12.5 6\"></path></svg></span>"), ys = /* @__PURE__ */ V("<button type=\"button\"> </button>"), bs = /* @__PURE__ */ V("<button type=\"button\"><span class=\"dd-value svelte-vtocc6\"> </span> <!></button> <div class=\"dd-pop dd-anchored svelte-vtocc6\" popover=\"auto\"><!></div>", 1), xs = /* @__PURE__ */ V("<div class=\"dd-pop svelte-vtocc6\"></div>"), Ss = /* @__PURE__ */ V("<button type=\"button\"><span class=\"dd-value svelte-vtocc6\"> </span> <!></button> <!>", 1), Cs = /* @__PURE__ */ V("<span class=\"dd svelte-vtocc6\"><!></span>");
function X(e, t) {
	Xe(t, !0);
	let n = (e) => {
		var t = vs();
		let n;
		R(() => n = gi(t, 1, "dd-caret svelte-vtocc6", null, n, { "dd-caret-open": z(f) })), H(e, t);
	}, r = Pi(t, "value", 3, null), i = Pi(t, "options", 19, () => []), a = Pi(t, "title", 3, null), o = Pi(t, "disabled", 3, !1), s = Pi(t, "filled", 3, !1), c = Pi(t, "compact", 3, !1), l = ra(), u = aa("urd-dd"), d = u.slice(2), f = /* @__PURE__ */ A(!1), p = /* @__PURE__ */ A(null), m = /* @__PURE__ */ A(null), g = /* @__PURE__ */ A(en({
		top: 0,
		left: 0,
		width: 160
	})), _ = () => i().find(([e]) => `${e ?? ""}` == `${r() ?? ""}`)?.[1] ?? "";
	function v() {
		let e = z(p).getBoundingClientRect(), t = Math.min(320, i().length * 32 + 12), n = Math.max(e.width, 160), r = e.bottom + t + 8 <= window.innerHeight;
		j(g, {
			top: r ? e.bottom + 4 : Math.max(8, e.top - t - 4),
			left: Math.max(8, Math.min(e.left, window.innerWidth - n - 8)),
			width: n
		}, !0);
	}
	function y() {
		if (!o()) {
			if (z(f)) {
				j(f, !1);
				return;
			}
			v(), j(f, !0);
		}
	}
	function b(e) {
		l && z(m)?.hidePopover(), j(f, !1), t.onchange?.(e);
	}
	bn(() => {
		if (!z(f)) return;
		let e = () => {
			l ? z(m)?.hidePopover() : j(f, !1);
		};
		if (window.addEventListener("blur", e), l) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			z(p) && !z(p).contains(e.target) && j(f, !1);
		}, n = (e) => {
			e.key === "Escape" && j(f, !1);
		}, r = (e) => {
			z(p) && e.target instanceof Node && !z(p).contains(e.target) && v();
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var x = Cs(), S = N(x), ee = (e) => {
		var t = bs(), l = P(t);
		let p;
		var g = N(l), v = F(g, !0), y = I(g, 2);
		n(y), E(l);
		var x = I(l, 2), S = N(x), ee = (e) => {
			var t = Nr();
			Jr(P(t), 17, i, ([e, t]) => `${e ?? ""}`, (e, t) => {
				var n = /* @__PURE__ */ k(() => h(z(t), 2));
				let i = () => z(n)[0], a = () => z(n)[1];
				var o = ys();
				let s;
				var c = F(o, !0);
				R(() => {
					s = gi(o, 1, "dd-opt svelte-vtocc6", null, s, { selected: `${i() ?? ""}` == `${r() ?? ""}` }), U(c, a());
				}), B("click", o, () => b(i())), H(e, o);
			}), H(e, t);
		};
		W(S, (e) => {
			z(f) && e(ee);
		}), E(x), ji(x, (e) => j(m, e), () => z(m)), R((e) => {
			p = gi(l, 1, "dd-btn svelte-vtocc6", null, p, {
				"dd-filled": s(),
				"dd-compact": c()
			}), J(l, "title", a()), l.disabled = o(), J(l, "popovertarget", d), vi(l, `anchor-name: ${u ?? ""}`), U(v, e), J(x, "id", d), vi(x, `position-anchor: ${u ?? ""}`);
		}, [() => _()]), Cr("toggle", x, (e) => {
			j(f, e.newState === "open");
		}), H(e, t);
	}, te = (e) => {
		var t = Ss(), l = P(t);
		let u;
		var d = N(l), p = F(d, !0), m = I(d, 2);
		n(m), E(l);
		var v = I(l, 2), x = (e) => {
			var t = xs();
			Jr(t, 21, i, ([e, t]) => `${e ?? ""}`, (e, t) => {
				var n = /* @__PURE__ */ k(() => h(z(t), 2));
				let i = () => z(n)[0], a = () => z(n)[1];
				var o = ys();
				let s;
				var c = F(o, !0);
				R(() => {
					s = gi(o, 1, "dd-opt svelte-vtocc6", null, s, { selected: `${i() ?? ""}` == `${r() ?? ""}` }), U(c, a());
				}), B("click", o, () => b(i())), H(e, o);
			}), E(t), R(() => vi(t, `top: ${z(g).top ?? ""}px; left: ${z(g).left ?? ""}px; min-width: ${z(g).width ?? ""}px`)), H(e, t);
		};
		W(v, (e) => {
			z(f) && e(x);
		}), R((e) => {
			u = gi(l, 1, "dd-btn svelte-vtocc6", null, u, {
				"dd-filled": s(),
				"dd-compact": c()
			}), J(l, "title", a()), l.disabled = o(), U(p, e);
		}, [() => _()]), B("click", l, y), H(e, t);
	};
	W(S, (e) => {
		l ? e(ee) : e(te, -1);
	}), E(x), ji(x, (e) => j(p, e), () => z(p)), H(e, x), Ze();
}
wr(["click"]);
//#endregion
//#region src/lib/Choice.svelte
var ws = /* @__PURE__ */ V("<button type=\"button\"> </button>"), Ts = /* @__PURE__ */ V("<div><span class=\"choice-label svelte-1ehof1c\"> </span> <div class=\"choice-seg svelte-1ehof1c\" role=\"group\"></div></div>");
function Es(e, t) {
	Xe(t, !0);
	let n = Pi(t, "title", 3, void 0), r = /* @__PURE__ */ k(() => t.options.length > 3 || t.options.reduce((e, [, t]) => e + `${t}`.length, 0) > 20), i = (e) => `${e ?? ""}`;
	var a = Ts();
	let o;
	var s = N(a), c = F(s, !0), l = I(s, 2);
	Jr(l, 21, () => t.options, ([e, t]) => i(e), (e, n) => {
		var r = /* @__PURE__ */ k(() => h(z(n), 2));
		let a = () => z(r)[0], o = () => z(r)[1];
		var s = ws();
		let c;
		var l = F(s, !0);
		R((e, t) => {
			J(s, "aria-pressed", e), c = gi(s, 1, "svelte-1ehof1c", null, c, { on: t }), U(l, o());
		}, [() => i(a()) === i(t.value), () => i(a()) === i(t.value)]), B("click", s, () => t.onchange(a())), H(e, s);
	}), E(l), E(a), R(() => {
		o = gi(a, 1, "choice svelte-1ehof1c", null, o, { stacked: z(r) }), J(a, "title", n()), U(c, t.label), J(l, "aria-label", t.label);
	}), H(e, a), Ze();
}
wr(["click"]);
//#endregion
//#region src/lib/IconEditor.svelte
var Ds = /* @__PURE__ */ V("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\"> </h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\"></canvas> <p class=\"ie-hint svelte-e7sog7\"> </p></div> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"ghost svelte-e7sog7\"> </button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"primary svelte-e7sog7\"> </button></span></div></div>");
function Os(e, t) {
	Xe(t, !0);
	let n = Pi(t, "image", 3, ""), r = /* @__PURE__ */ A(null), i = /* @__PURE__ */ A(null), a = /* @__PURE__ */ A(1), o = /* @__PURE__ */ A(.5), s = /* @__PURE__ */ A(.5), c = /* @__PURE__ */ A(1), l = /* @__PURE__ */ A(1), u = /* @__PURE__ */ A(1);
	bn(() => {
		if (!n()) return;
		let e = new Image();
		e.onload = () => {
			j(i, e, !0);
		}, e.src = n();
	});
	function d(e, t) {
		if (e.clearRect(0, 0, t, t), !z(i)) return;
		e.filter = `brightness(${z(c)}) contrast(${z(l)}) saturate(${z(u)})`;
		let n = Math.max(t / z(i).width, t / z(i).height) * z(a), r = z(i).width * n, d = z(i).height * n, f = t / 2 - z(o) * r, p = t / 2 - z(s) * d;
		f = Math.min(0, Math.max(t - r, f)), p = Math.min(0, Math.max(t - d, p)), e.drawImage(z(i), f, p, r, d), e.filter = "none";
	}
	bn(() => {
		z(i), z(a), z(o), z(s), z(c), z(l), z(u), z(r) && d(z(r).getContext("2d"), 220);
	});
	function f(e) {
		if (!z(i)) return;
		e.preventDefault();
		let t = e.clientX, n = e.clientY, r = Math.max(220 / z(i).width, 220 / z(i).height) * z(a), c = z(i).width * r, l = z(i).height * r, u = (e) => {
			j(o, Math.min(1, Math.max(0, z(o) - (e.clientX - t) / c)), !0), j(s, Math.min(1, Math.max(0, z(s) - (e.clientY - n) / l)), !0), t = e.clientX, n = e.clientY;
		}, d = () => {
			window.removeEventListener("pointermove", u), window.removeEventListener("pointerup", d);
		};
		window.addEventListener("pointermove", u), window.addEventListener("pointerup", d);
	}
	function p() {
		j(a, 1), j(o, .5), j(s, .5), j(c, 1), j(l, 1), j(u, 1);
	}
	function m() {
		let e = document.createElement("canvas");
		e.width = 128, e.height = 128, d(e.getContext("2d"), 128), t.onapply?.(e.toDataURL("image/webp", .92));
	}
	var h = Ds(), g = N(h), _ = N(g), v = F(_, !0), y = I(_, 2), b = N(y);
	J(b, "width", 220), J(b, "height", 220), ji(b, (e) => j(r, e), () => z(r));
	var x = F(I(b, 2), !0);
	E(y);
	var S = I(y, 2), ee = N(S), te = F(I(ee));
	E(S);
	var ne = I(S, 2);
	K(ne);
	var C = I(ne, 2), re = N(C), ie = F(I(re));
	E(C);
	var ae = I(C, 2);
	K(ae);
	var oe = I(ae, 2), se = N(oe), ce = F(I(se));
	E(oe);
	var w = I(oe, 2);
	K(w);
	var le = I(w, 2), ue = N(le), de = F(I(ue));
	E(le);
	var fe = I(le, 2);
	K(fe);
	var T = I(fe, 2), pe = N(T), me = F(pe, !0), he = I(pe, 2), ge = F(he, !0);
	E(T);
	var _e = I(T, 2), ve = N(_e), ye = F(ve, !0), be = I(ve, 2), xe = F(be, !0);
	E(_e), E(g), E(h), R((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) => {
		U(v, e), J(b, "title", t), U(x, n), U(ee, `${r ?? ""} `), U(te, `${i ?? ""}x`), U(re, `${a ?? ""} `), U(ie, `${o ?? ""}%`), U(se, `${s ?? ""} `), U(ce, `${c ?? ""}%`), U(ue, `${l ?? ""} `), U(de, `${u ?? ""}%`), U(me, d), U(ge, f), U(ye, p), U(xe, m);
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
	]), B("pointerdown", b, f), Di(ne, () => z(a), (e) => j(a, e)), Di(ae, () => z(c), (e) => j(c, e)), Di(w, () => z(l), (e) => j(l, e)), Di(fe, () => z(u), (e) => j(u, e)), B("click", pe, () => j(u, 0)), B("click", he, p), B("click", ve, () => t.oncancel?.()), B("click", be, m), H(e, h), Ze();
}
wr(["pointerdown", "click"]);
//#endregion
//#region ../template/assets/engine/0.7.4/blocks/form.js
var ks = () => [
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
], As = 24, js = {
	"oppsett-byttet": "layout-changed",
	"blokk-endret": "block-edited",
	"desktop-endret-etter-mobil": "desktop-changed-after-mobile",
	seksjonshøyde: "section-height",
	"blokk-flyttet": "block-moved",
	"blokk-slettet": "block-deleted",
	"blokk-lagt-til": "block-added"
};
function Ms(e, t) {
	if (!e || !("y" in e || "h" in e)) return e ?? null;
	if (t && e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h) return null;
	let n = {
		x: e.x,
		w: e.w
	};
	return Number.isFinite(e.y) && (n.row = Math.max(1, Math.round((e.y - As) / 8) + 1), n.rows = Number.isFinite(e.h) ? Math.max(1, Math.ceil(e.h / 8)) : 1), Number.isFinite(e.z) && e.z !== 1 && (n.z = e.z), e.rot && (n.rot = e.rot), n;
}
var Ns = {
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
}, Ps = { bildegalleri: "slideshow" }, Fs = {
	flate: "surface",
	aksent: "accent",
	invers: "inverse",
	dus: "soft",
	dempet: "muted",
	dyp: "deep",
	uthevet: "highlighted"
}, Is = {
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
function Ls(e) {
	let t = Array.isArray(e) ? e : e.blocks ?? [];
	for (let e of t) Ns[e.type] && (e.type = Ns[e.type]);
	if (!Array.isArray(e)) {
		for (let t of e.background?.layers ?? []) Ps[t.type] && (t.type = Ps[t.type]);
		Fs[e.theme] && (e.theme = Fs[e.theme]), Is[e.preset] && (e.preset = Is[e.preset]);
	}
	return e;
}
var Rs = {
	1: (e) => {
		for (let t of e.sections ?? []) {
			let e = t.responsive?.mobile;
			for (let e of t.blocks ?? []) e.decor && (e.hideMobile = !0), e.frames?.mobile && (e.frames.mobile = Ms(e.frames.mobile, e.frames.desktop));
			e?.mode === "manual" && (e.mode = "auto");
			let n = e?.attention?.reason;
			n && js[n] && (e.attention.reason = js[n]);
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) Ls(t);
		return e;
	},
	3: (e) => {
		for (let t of e.sections ?? []) Ls(t);
		return e;
	}
}, zs = {
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
function Bs(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 4;) {
		let r = zs[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function Vs(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 4;) {
		let i = Rs[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/plugins.js
function Hs(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var Us = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function Ws(e, t) {
	let n = Hs(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = Hs(t[2]), a = Us(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var Gs = /^[a-z0-9][a-z0-9-]*$/;
function Ks(e) {
	let t = [];
	if (!e || typeof e != "object") return ["the manifest is not an object"];
	Gs.test(e.id ?? "") || t.push("id is missing or invalid"), (typeof e.name != "string" || !e.name) && t.push("name is missing"), Hs(e.version ?? "") || t.push("version is not semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine is missing");
	let n = Array.isArray(e.languages) && e.languages.length > 0;
	return (e.entry !== void 0 || !n) && (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry is missing or is not a .js file"), (e.provides !== void 0 || !n) && (!e.provides || typeof e.provides != "object") && t.push("provides is missing"), e.languages !== void 0 && t.push(...Vi(e.languages)), e.locales !== void 0 && typeof e.locales != "boolean" && t.push("locales must be a boolean"), e.names !== void 0 && (typeof e.names != "object" || e.names === null || Array.isArray(e.names) || Object.values(e.names).some((e) => typeof e != "string" || !e)) && t.push("names must be an object mapping language code to name"), t;
}
Promise.resolve();
//#endregion
//#region ../template/assets/engine/0.7.4/sections/presets.js
function qs(e) {
	return typeof crypto < "u" && crypto.randomUUID ? `${e}-${crypto.randomUUID().slice(0, 8)}` : `${e}-${[...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4))].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
var Js = () => ({ mobile: {
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
}), Ys = (e, t, n = {}) => ({
	id: qs("blk"),
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
}), Xs = (e, t = {}) => ({
	id: qs("blk"),
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
}), Zs = (e, t, n = {}) => ({
	id: qs("blk"),
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
}), Qs = (e, t, n = 40) => ({
	id: qs("blk"),
	type: "icon",
	version: 1,
	props: {
		glyph: t,
		color: "accent",
		size: n
	},
	animation: null,
	frames: e
}), $s = (e, t = {}) => ({
	id: qs("blk"),
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
}), ec = (e, t = {}) => ({
	id: qs("blk"),
	type: "form",
	version: 1,
	props: {
		recipient: "",
		subject: "",
		mode: "mailto",
		endpoint: "",
		submitLabel: Y("form.sendDefault"),
		successText: Y("form.thanksDefault"),
		fields: ks(),
		...t
	},
	animation: null,
	frames: e
}), tc = (e, t = {}) => ({
	id: qs("blk"),
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
}), nc = () => ({
	type: "hover-lift",
	version: 1,
	props: {}
}), rc = (e, t, n = {}) => ({
	id: qs("blk"),
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
}), ic = (e, t = {}) => ({
	id: qs("blk"),
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
}), ac = (e, t = {}) => ({
	id: qs("blk"),
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
}), oc = (e, t = {}) => ({
	id: qs("blk"),
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
}), sc = (e, t = {}) => ({
	id: qs("blk"),
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
}), cc = (e, t) => ({
	id: qs("blk"),
	type: "faq",
	version: 1,
	props: {
		items: t,
		multi: !1
	},
	animation: null,
	frames: e
}), lc = (e, t = {}) => ({
	id: qs("blk"),
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
}), uc = (e, t) => ({
	id: qs("blk"),
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
}), dc = (e, t = {}) => ({
	id: qs("blk"),
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
}), fc = (...e) => ({
	version: 1,
	layers: e
}), pc = (e) => ({
	type: "color",
	version: 1,
	props: { value: e }
}), mc = (e, t, n, r = .5) => ({
	type: "glow",
	version: 1,
	props: {
		x: e,
		y: t,
		color: "accent",
		radius: r,
		opacity: n
	}
}), hc = (e) => Math.max(0, ...e.blocks.map((e) => e.frames.desktop.y + e.frames.desktop.h)), gc = (e, t, n, r, i, a) => ({
	x: n + e % t * r,
	y: i + Math.floor(e / t) * a
}), _c = (e, t, n, r, i, a, o, s, c = 0) => {
	let l = (t) => e.blocks.some((e) => {
		let n = e.frames.desktop;
		return n.x < t.x + t.w - .01 && t.x < n.x + n.w - .01 && n.y < t.y + t.h - .01 && t.y < n.y + n.h - .01;
	});
	for (let e = 0; e < 60; e++) {
		let u = gc(e, t, n, r, i, a);
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
		y: hc(e) + 16,
		n: 0
	};
}, vc = (e, t, n) => e + t * .1 + n * .01, yc = (e, t, n, r, i = null) => ({
	id: qs("sec"),
	version: 1,
	preset: e,
	size: { minHeight: t },
	grid: i,
	background: n,
	blocks: r,
	responsive: Js()
});
function bc(e) {
	e.sections.define("blank", {
		label: "Empty section",
		labelKey: "preset.blank.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "A blank canvas to build on freely",
		hintKey: "preset.blank.hint",
		create: () => yc("blank", "40vh", fc(pc("bg")), [])
	}), e.sections.define("hero", {
		label: "Hero",
		labelKey: "preset.hero.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Large opening with gradient and glow, left-aligned",
		hintKey: "preset.hero.hint",
		create: () => yc("hero", "70vh", {
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
				mc(.7, .2, .35),
				{
					type: "grain",
					version: 1,
					props: { opacity: .06 }
				}
			]
		}, [
			Ys(Z(8.33, 40, 50, 38), Y("seed.hero.title")),
			Ys(Z(8.33, 84, 41.67, 26), Y("seed.hero.intro")),
			Zs(Z(8.33, 118, 20, 32), Y("seed.readMore"))
		])
	}), e.sections.define("hero-centered", {
		label: "Hero, centred",
		labelKey: "preset.hero-centered.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Centred opening with two buttons",
		hintKey: "preset.hero-centered.hint",
		create: () => yc("hero-centered", "60vh", fc(pc("bg")), [
			Ys(Z(15, 64, 70, 44), Y("seed.heroCenter.title"), { align: "center" }),
			Ys(Z(25, 116, 50, 26), Y("seed.heroCenter.intro"), { align: "center" }),
			Zs(Z(31.5, 160, 17, 40), Y("seed.join")),
			Zs(Z(51.5, 160, 17, 40), Y("seed.readMore"), { style: "secondary" })
		])
	}), e.sections.define("hero-image", {
		label: "Hero over a photo",
		labelKey: "preset.hero-image.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Opening over a photo that creeps slowly, with a veil under the text",
		hintKey: "preset.hero-image.hint",
		create: () => {
			let e = yc("hero-image", "70vh", {
				version: 1,
				layers: [
					pc("bg"),
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
				Ys(Z(8.33, 40, 50, 38), Y("seed.hero.title")),
				Ys(Z(8.33, 84, 41.67, 26), Y("seed.hero.intro")),
				Zs(Z(8.33, 118, 20, 32), Y("seed.readMore"))
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
			let e = yc("hero-photos", "70vh", {
				version: 1,
				layers: [
					pc("bg"),
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
				Ys(Z(15, 64, 70, 44), Y("seed.heroCenter.title"), { align: "center" }),
				Ys(Z(25, 116, 50, 26), Y("seed.heroCenter.intro"), { align: "center" }),
				Zs(Z(41.5, 160, 17, 40), Y("seed.readMore"))
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
		create: () => yc("images", "360px", fc(pc("bg")), [
			Ys(Z(4, 24, 50, 32), Y("seed.images.title")),
			Xs(Z(4, 72, 28, 220)),
			Xs(Z(36, 72, 28, 220)),
			Xs(Z(68, 72, 28, 220))
		]),
		itemLabel: "image",
		itemLabelKey: "item.image",
		item: (e) => {
			let { x: t, y: n } = _c(e, 3, 4, 32, 72, 244, 28, 220);
			return {
				blocks: [Xs(Z(t, n, 28, 220))],
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
		create: () => yc("gallery", "440px", fc(pc("bg")), [Ys(Z(4, 24, 50, 32), Y("seed.gallery.title")), sc(Z(4, 72, 92, 320))])
	}), e.sections.define("find-us", {
		label: "Find us",
		labelKey: "preset.find-us.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Map with your address (privacy-friendly OpenStreetMap)",
		hintKey: "preset.find-us.hint",
		create: () => yc("find-us", "480px", fc(pc("bg")), [Ys(Z(6, 40, 60, 70), Y("seed.findUs.title")), $s(Z(6, 120, 88, 360, 2))])
	}), e.sections.define("whats-on", {
		label: "What is on",
		labelKey: "preset.whats-on.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Event list from a subscribable calendar (iCal/Google)",
		hintKey: "preset.whats-on.hint",
		create: () => yc("whats-on", "520px", fc(pc("bg")), [Ys(Z(6, 40, 60, 70), Y("seed.whatsOn.title")), tc(Z(6, 130, 88, 320, 2), { limit: 5 })])
	}), e.sections.define("contact-form", {
		label: "Contact form",
		labelKey: "preset.contact-form.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Contact form that sends via email (or your own endpoint)",
		hintKey: "preset.contact-form.hint",
		create: () => yc("contact-form", "520px", fc(pc("bg")), [Ys(Z(6, 40, 60, 120), Y("seed.contactForm.intro")), ec(Z(6, 180, 60, 380, 2))])
	}), e.sections.define("contact", {
		label: "Contact",
		labelKey: "preset.contact.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Contact details in a card with an email button",
		hintKey: "preset.contact.hint",
		create: () => yc("contact", "320px", fc(pc("surface"), mc(.2, .8, .2)), [
			Ys(Z(10, 32, 40, 36), Y("seed.contact.title")),
			Ys(Z(10, 84, 36, 130), Y("seed.contact.info"), { box: !0 }),
			Zs(Z(60, 100, 22, 40), Y("seed.contact.button"), { href: `mailto:${Y("seed.email")}` })
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
				let i = Qs(Z(e + 10.5, 88, 4, 52), n), a = Ys(Z(e, 152, 25, 200), Y("seed.features.card", { title: r }), {
					align: "center",
					box: !0
				});
				return a.animation = nc(), i.mobileOrder = vc(88, t, 0), a.mobileOrder = vc(88, t, 1), [i, a];
			};
			return yc("feature-cards", "420px", fc(pc("bg")), [
				Ys(Z(6, 28, 60, 38), Y("seed.features.title")),
				...e(6, 0, "✦", Y("seed.features.card1")),
				...e(37.5, 1, "★", Y("seed.features.card2")),
				...e(69, 2, "✓", Y("seed.features.card3"))
			]);
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = _c(e, 3, 6, 31.5, 152, 296, 25, 264, -64), i = Qs(Z(t + 10.5, n - 64, 4, 52), "✦"), a = Ys(Z(t, n, 25, 200), Y("seed.features.card", { title: Y("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return a.animation = nc(), i.mobileOrder = vc(88, r, 0), a.mobileOrder = vc(88, r, 1), {
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
				let r = Ys(Z(e, 88, 25, 200), Y("seed.features.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.animation = nc(), r.mobileOrder = vc(88, t, 0), r;
			};
			return yc("feature-cards-simple", "360px", fc(pc("bg")), [
				Ys(Z(6, 28, 60, 38), Y("seed.features.title")),
				e(6, 0, Y("seed.features.card1")),
				e(37.5, 1, Y("seed.features.card2")),
				e(69, 2, Y("seed.features.card3"))
			]);
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = _c(e, 3, 6, 31.5, 88, 232, 25, 200), i = Ys(Z(t, n, 25, 200), Y("seed.features.card", { title: Y("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.animation = nc(), i.mobileOrder = vc(88, r, 0), {
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
				let n = Xs(Z(e, 88, 25, 160)), r = Ys(Z(e, 256, 25, 160), Y("seed.news.card"));
				return n.mobileOrder = vc(88, t, 0), r.mobileOrder = vc(88, t, 1), [n, r];
			};
			return yc("news", "460px", fc(pc("bg")), [
				Ys(Z(6, 28, 50, 38), Y("seed.news.title")),
				Zs(Z(78, 30, 16, 36), Y("seed.news.seeAll"), { style: "secondary" }),
				...e(6, 0),
				...e(37.5, 1),
				...e(69, 2)
			]);
		},
		itemLabel: "story",
		itemLabelKey: "item.story",
		item: (e) => {
			let { x: t, y: n, n: r } = _c(e, 3, 6, 31.5, 88, 344, 25, 328), i = Xs(Z(t, n, 25, 160)), a = Ys(Z(t, n + 168, 25, 160), Y("seed.news.card"));
			return i.mobileOrder = vc(88, r, 0), a.mobileOrder = vc(88, r, 1), {
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
		create: () => yc("news-collection", "300px", fc(pc("bg")), [Ys(Z(6, 28, 50, 38), Y("seed.news.title")), rc(Z(6, 88, 88, 180), "cards")])
	}), e.sections.define("noticeboard", {
		label: "Noticeboard",
		labelKey: "preset.noticeboard.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Dated list from a collection (notices/announcements)",
		hintKey: "preset.noticeboard.hint",
		create: () => yc("noticeboard", "300px", fc(pc("surface")), [Ys(Z(6, 28, 50, 38), Y("seed.noticeboard.title")), rc(Z(6, 88, 88, 180), "list", { limit: 8 })])
	}), e.sections.define("publication-archive", {
		label: "Publication archive",
		labelKey: "preset.publication-archive.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Year-grouped archive from a collection (issues, minutes, reports)",
		hintKey: "preset.publication-archive.hint",
		create: () => yc("publication-archive", "300px", fc(pc("bg")), [Ys(Z(6, 28, 60, 38), Y("seed.archive.title")), rc(Z(6, 88, 88, 180), "archive", { limit: 0 })])
	}), e.sections.define("events", {
		label: "Events",
		labelKey: "preset.events.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Three rows with date badge and sign-up button",
		hintKey: "preset.events.hint",
		create: () => {
			let e = (e, t, n, r) => [
				Ys(Z(6, e, 8, 88), Y("seed.events.dateBadge", {
					day: t,
					month: n
				}), {
					align: "center",
					box: !0
				}),
				Ys(Z(16, e, 58, 88), Y("seed.events.row", { title: r })),
				Zs(Z(78, e + 24, 16, 40), Y("seed.events.signup"), { style: "secondary" })
			];
			return yc("events", "440px", fc(pc("surface")), [
				Ys(Z(6, 28, 50, 38), Y("seed.events.title")),
				...e(88, "11", Y("seed.events.monthAug"), Y("seed.events.row1")),
				...e(196, "25", Y("seed.events.monthAug"), Y("seed.events.row2")),
				...e(304, "8", Y("seed.events.monthSep"), Y("seed.events.row3"))
			]);
		},
		itemLabel: "row",
		itemLabelKey: "item.row",
		item: (e) => {
			let t = hc(e) + 16;
			return {
				blocks: [
					Ys(Z(6, t, 8, 88), Y("seed.events.newBadge"), {
						align: "center",
						box: !0
					}),
					Ys(Z(16, t, 58, 88), Y("seed.events.row", { title: Y("seed.events.newTitle") })),
					Zs(Z(78, t + 24, 16, 40), Y("seed.events.signup"), { style: "secondary" })
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
				let r = Xs(Z(e, 80, 22, 180), { alt: Y("seed.team.alt") }), i = Ys(Z(e, 268, 22, 84), Y("seed.team.member", { role: n }), { align: "center" });
				return r.mobileOrder = vc(80, t, 0), i.mobileOrder = vc(80, t, 1), [r, i];
			};
			return yc("team", "420px", fc(pc("surface")), [
				Ys(Z(6, 24, 50, 32), Y("seed.team.title")),
				...e(7.5, 0, Y("seed.team.role1")),
				...e(39, 1, Y("seed.team.role2")),
				...e(70.5, 2, Y("seed.team.role3"))
			]);
		},
		itemLabel: "person",
		itemLabelKey: "item.person",
		item: (e) => {
			let { x: t, y: n, n: r } = _c(e, 3, 7.5, 31.5, 80, 288, 22, 272), i = Xs(Z(t, n, 22, 180), { alt: Y("seed.team.alt") }), a = Ys(Z(t, n + 188, 22, 84), Y("seed.team.member", { role: Y("seed.team.roleNew") }), { align: "center" });
			return i.mobileOrder = vc(80, r, 0), a.mobileOrder = vc(80, r, 1), {
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
		create: () => yc("faq", "520px", fc(pc("bg")), [
			Ys(Z(25, 24, 50, 36), Y("seed.faq.title"), { align: "center" }),
			cc(Z(20, 80, 60, 320), [
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
			Ys(Z(20, 416, 60, 32), Y("seed.faq.more"), { align: "center" })
		])
	}), e.sections.define("timeline", {
		label: "Timeline",
		labelKey: "preset.timeline.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Your story as events along a line",
		hintKey: "preset.timeline.hint",
		create: () => yc("timeline", "480px", fc(pc("bg")), [Ys(Z(25, 24, 50, 36), Y("seed.timeline.title"), { align: "center" }), uc(Z(25, 88, 50, 330), [
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
				let r = Ys(Z(e, 88, 25, 72), `<h3>${t + 1}</h3>`, {
					align: "center",
					size: 44
				}), i = Ys(Z(e, 168, 25, 160), Y("seed.steps.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.mobileOrder = vc(88, t, 0), i.mobileOrder = vc(88, t, 1), [r, i];
			};
			return yc("steps", "400px", fc(pc("bg")), [
				Ys(Z(6, 28, 60, 38), Y("seed.steps.title")),
				...e(6, 0, Y("seed.steps.s1")),
				...e(37.5, 1, Y("seed.steps.s2")),
				...e(69, 2, Y("seed.steps.s3"))
			]);
		},
		itemLabel: "step",
		itemLabelKey: "item.step",
		item: (e) => {
			let { x: t, y: n, n: r } = _c(e, 3, 6, 31.5, 88, 272, 25, 240), i = Ys(Z(t, n, 25, 72), `<h3>${r + 1}</h3>`, {
				align: "center",
				size: 44
			}), a = Ys(Z(t, n + 80, 25, 160), Y("seed.steps.card", { title: Y("seed.steps.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.mobileOrder = vc(88, r, 0), a.mobileOrder = vc(88, r, 1), {
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
				Xs(Z(6, 40, 55, 300)),
				Ys(Z(6, 348, 55, 108), Y("seed.feature.main")),
				Zs(Z(6, 464, 14, 38), Y("seed.readMore"), { style: "secondary" }),
				Xs(Z(66, 40, 28, 120)),
				Ys(Z(66, 164, 28, 60), Y("seed.feature.small1")),
				Xs(Z(66, 244, 28, 120)),
				Ys(Z(66, 368, 28, 60), Y("seed.feature.small2"))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = vc(40, t < 3 ? 0 : 1, t);
			}), yc("lead-story", "540px", fc(pc("bg")), e);
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
					Xs(Z(e, 88, 25, 200)),
					Ys(Z(e, 296, 25, 76), Y("seed.products.card", {
						name: n,
						price: r
					}), { align: "center" }),
					Zs(Z(e + 5, 380, 15, 40), Y("seed.products.buy"))
				];
				return i.forEach((e, n) => {
					e.mobileOrder = vc(88, t, n);
				}), i;
			};
			return yc("products", "470px", fc(pc("bg")), [
				Ys(Z(6, 28, 50, 38), Y("seed.products.title")),
				...e(6, 0, Y("seed.products.name"), Y("seed.products.price1")),
				...e(37.5, 1, Y("seed.products.name"), Y("seed.products.price2")),
				...e(69, 2, Y("seed.products.name"), Y("seed.products.price3"))
			]);
		},
		itemLabel: "product",
		itemLabelKey: "item.product",
		item: (e) => {
			let { x: t, y: n, n: r } = _c(e, 3, 6, 31.5, 88, 348, 25, 332), i = [
				Xs(Z(t, n, 25, 200)),
				Ys(Z(t, n + 208, 25, 76), Y("seed.products.card", {
					name: Y("seed.products.name"),
					price: Y("seed.products.price1")
				}), { align: "center" }),
				Zs(Z(t + 5, n + 292, 15, 40), Y("seed.products.buy"))
			];
			return i.forEach((e, t) => {
				e.mobileOrder = vc(88, r, t);
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
		create: () => yc("shop", "544px", fc(pc("bg")), [
			Ys(Z(6, 28, 50, 38), Y("seed.shop.title")),
			ac(Z(78, 88, 16, 48)),
			ic(Z(6, 176, 88, 320))
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
				Ys(Z(6, 48, 52, 96), Y("seed.shopHero.title")),
				Ys(Z(6, 152, 40, 48), Y("seed.shopHero.sub")),
				Zs(Z(6, 216, 17, 42), Y("seed.shopHero.cta")),
				Xs(Z(62, 40, 32, 300))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = vc(48, t < 3 ? 0 : 1, t);
			}), yc("shop-hero", "400px", {
				version: 1,
				layers: [
					pc("bg"),
					mc(.8, .25, .28, .6),
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
				let r = Xs(Z(e, 88, 21, 170)), i = Ys(Z(e, 266, 21, 34), Y("seed.shopCategories.tile", { name: n }), { align: "center" });
				return r.mobileOrder = vc(88, t, 0), i.mobileOrder = vc(88, t, 1), [r, i];
			}, t = yc("shop-categories", "360px", fc(pc("bg")), [
				Ys(Z(6, 28, 60, 38), Y("seed.shopCategories.title")),
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
			let { x: t, y: n, n: r } = _c(e, 4, 6, 23.5, 88, 220, 21, 212), i = Xs(Z(t, n, 21, 170)), a = Ys(Z(t, n + 178, 21, 34), Y("seed.shopCategories.tile", { name: Y("seed.shopCategories.newCat") }), { align: "center" });
			return i.mobileOrder = vc(88, r, 0), a.mobileOrder = vc(88, r, 1), {
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
				let i = Qs(Z(e + 10.5, 88, 4, 52), r, 44), a = Ys(Z(e, 148, 25, 96), Y(n), { align: "center" });
				return i.mobileOrder = vc(88, t, 0), a.mobileOrder = vc(88, t, 1), [i, a];
			}, t = yc("shop-trust", "300px", fc(pc("bg")), [
				Ys(Z(6, 28, 60, 38), Y("seed.shopTrust.title")),
				...e(6, 0, "seed.shopTrust.t1", "✓"),
				...e(37.5, 1, "seed.shopTrust.t2", "↻"),
				...e(69, 2, "seed.shopTrust.t3", "✉")
			]);
			return t.theme = "muted", t;
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = _c(e, 3, 6, 31.5, 148, 216, 25, 156, -60), i = Qs(Z(t + 10.5, n - 60, 4, 52), "✓", 44), a = Ys(Z(t, n, 25, 96), Y("seed.shopTrust.newItem"), { align: "center" });
			return i.mobileOrder = vc(88, r, 0), a.mobileOrder = vc(88, r, 1), {
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
				Ys(Z(6, 56, 52, 100), Y("seed.shopShowcase.title")),
				Ys(Z(6, 164, 42, 56), Y("seed.shopShowcase.text")),
				Zs(Z(6, 236, 18, 42), Y("seed.shopShowcase.cta")),
				Xs(Z(62, 48, 32, 240))
			];
			e.forEach((e, t) => {
				e.mobileOrder = vc(56, t < 3 ? 0 : 1, t);
			});
			let t = yc("shop-showcase", "340px", fc(pc("bg")), e);
			return t.theme = "deep", t;
		}
	}), e.sections.define("checkout", {
		label: "Checkout",
		labelKey: "preset.checkout.label",
		group: "Shop",
		groupKey: "presetGroup.shop",
		hint: "Order form that sends the basket as an email or to an endpoint",
		hintKey: "preset.checkout.hint",
		create: () => yc("checkout", "560px", fc(pc("bg")), [Ys(Z(6, 28, 50, 38), Y("seed.checkout.title")), oc(Z(25, 96, 50, 430))])
	}), e.sections.define("cta", {
		label: "CTA banner",
		labelKey: "preset.cta.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Full width with one clear action",
		hintKey: "preset.cta.hint",
		create: () => yc("cta", "280px", fc(pc("surface"), mc(.5, .5, .3, .7)), [
			Ys(Z(20, 56, 60, 40), Y("seed.cta.title"), { align: "center" }),
			Ys(Z(25, 104, 50, 26), Y("seed.cta.sub"), { align: "center" }),
			Zs(Z(42, 148, 16, 42), Y("seed.join"))
		])
	}), e.sections.define("quote", {
		label: "Quote",
		labelKey: "preset.quote.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Large quote with attribution",
		hintKey: "preset.quote.hint",
		create: () => yc("quote", "300px", fc(pc("bg")), [lc(Z(20, 56, 60, 190), {
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
				let a = dc(Z(e, 76, 25, 120), {
					value: n,
					suffix: r,
					label: i
				});
				return a.mobileOrder = vc(76, t, 0), a;
			};
			return yc("stats", "260px", fc(pc("surface")), [
				e(6, 0, "120", "+", Y("seed.stats.l1")),
				e(37.5, 1, "25", "", Y("seed.stats.l2")),
				e(69, 2, "1981", "", Y("seed.stats.l3"))
			]);
		},
		itemLabel: "number",
		itemLabelKey: "item.number",
		item: (e) => {
			let { x: t, y: n, n: r } = _c(e, 3, 6, 31.5, 76, 140, 25, 120), i = dc(Z(t, n, 25, 120), {
				value: "42",
				label: Y("seed.stats.newLabel")
			});
			return i.mobileOrder = vc(76, r, 0), {
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
			let e = (e) => Xs(Z(e, 108, 18.5, 100), {
				alt: Y("seed.sponsors.alt"),
				fit: "contain",
				radius: null,
				saturate: 0
			});
			return yc("sponsors", "280px", fc(pc("bg")), [
				Ys(Z(6, 28, 60, 36), Y("seed.sponsors.title")),
				e(5.5),
				e(29),
				e(52.5),
				e(76)
			]);
		},
		itemLabel: "logo",
		itemLabelKey: "item.logo",
		item: (e) => {
			let { x: t, y: n } = _c(e, 4, 5.5, 23.5, 108, 124, 18.5, 100);
			return {
				blocks: [Xs(Z(t, n, 18.5, 100), {
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
		create: () => yc("membership", "500px", fc(pc("surface")), [
			Ys(Z(6, 28, 50, 38), Y("seed.membership.title")),
			Ys(Z(14, 88, 32, 250), Y("seed.membership.tier1"), {
				align: "center",
				box: !0
			}),
			Ys(Z(54, 88, 32, 250), Y("seed.membership.tier2"), {
				align: "center",
				box: !0
			}),
			Zs(Z(42, 358, 16, 42), Y("seed.join")),
			Ys(Z(25, 414, 50, 30), Y("seed.membership.vipps"), { align: "center" })
		])
	});
}
//#endregion
//#region ../template/assets/engine/0.7.4/templates-model.js
var xc = [
	"section",
	"blocks",
	"page"
];
function Sc(e) {
	return Ba(String(e ?? ""), "");
}
function Cc(e, t, { id: n, title: r }) {
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
var wc = [
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
function Tc(e) {
	let t = String(e ?? "");
	return /[",\n\r]/.test(t) ? `"${t.replaceAll("\"", "\"\"")}"` : t;
}
function Ec(e, t) {
	return t === "sizes" ? (e.sizes ?? []).join("|") : t === "colors" ? (e.colors ?? []).map((e) => e.name).join("|") : e[t] ?? "";
}
function Dc(e) {
	let t = [wc.join(",")];
	for (let n of e ?? []) t.push(wc.map((e) => Tc(Ec(n, e))).join(","));
	return t.join("\n") + "\n";
}
function Oc(e) {
	let t = [], n = [], r = "", i = !1, a = String(e ?? "");
	for (let e = 0; e < a.length; e += 1) {
		let o = a[e];
		i ? o === "\"" && a[e + 1] === "\"" ? (r += "\"", e += 1) : o === "\"" ? i = !1 : r += o : o === "\"" ? i = !0 : o === "," ? (n.push(r), r = "") : o === "\n" || o === "\r" ? (o === "\r" && a[e + 1] === "\n" && (e += 1), n.push(r), t.push(n), n = [], r = "") : r += o;
	}
	return (r !== "" || n.length) && (n.push(r), t.push(n)), t.filter((e) => e.some((e) => e.trim() !== ""));
}
var kc = (e) => String(e ?? "").split("|").map((e) => e.trim()).filter(Boolean);
function Ac(e) {
	let t = Oc(e);
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
		let s = kc(t.sizes);
		s.length && (o.sizes = s);
		let c = kc(t.colors);
		c.length && (o.colors = c.map((e) => ({ name: e }))), r.push(o);
	}
	return {
		entries: r,
		skipped: i
	};
}
//#endregion
//#region ../template/assets/engine/0.7.4/feeds.js
function jc(e) {
	return String(e ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&apos;");
}
function Mc(e, t) {
	let n = String(t ?? "").replace(/\/+$/, "");
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${(e ?? []).filter((e) => !e.noindex).map((e) => `  <url><loc>${jc(n + (e.path === "/" ? "/" : e.path))}</loc></url>`).join("\n")}\n</urlset>\n`;
}
function Nc(e) {
	return `User-agent: *\nDisallow: /admin/\n\nSitemap: ${String(e ?? "").replace(/\/+$/, "")}/sitemap.xml\n`;
}
var Pc = [
	"news",
	"notices",
	"publications"
];
function Fc(e) {
	let t = String(e.origin ?? "").replace(/\/+$/, ""), n = (e.items ?? []).map((n) => {
		let r = n.href ? new URL(n.href, t + "/").href : t + "/", i = n.date ? new Date(n.date) : null, a = i && !Number.isNaN(i.getTime()) ? `\n      <pubDate>${i.toUTCString()}</pubDate>` : "", o = n.text ? `\n      <description>${jc(n.text)}</description>` : "";
		return `    <item>\n      <title>${jc(n.title)}</title>\n      <link>${jc(r)}</link>\n      <guid isPermaLink="false">${jc(`${e.path}#${n.id ?? n.title}`)}</guid>${o}${a}\n    </item>`;
	}).join("\n");
	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${jc(e.title)}</title>\n    <link>${jc(t + "/")}</link>\n    <description>${jc(e.description ?? e.title)}</description>\n${n}${n ? "\n" : ""}  </channel>\n</rss>\n`;
}
function Ic(e) {
	return Number(e) === 2 ? 2 : 1;
}
//#endregion
//#region ../template/assets/engine/0.7.4/gallery-layout.js
var Lc = [
	"floating",
	"fill",
	"band",
	"mosaic"
], Rc = [
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
], zc = [
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
], Bc = [
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
], Vc = [
	"square",
	"circle",
	"triangle",
	"diamond",
	"hexagon",
	"octagon",
	"star",
	"heart"
], Hc = {
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
}, Uc = {
	floating: "drift",
	fill: "none",
	mosaic: "crossfade",
	band: "none"
}, Wc = {
	min: 1,
	max: 20,
	dflt: 8
}, Gc = {
	min: 60,
	max: 400
}, Kc = {
	floating: 140,
	band: 156,
	mosaic: 140,
	fill: 0
}, qc = {
	polaroid: "#ffffff",
	border: "#ffffff",
	thick: "#ffffff",
	double: "#ffffff",
	dark: "#161616",
	glow: "accent"
}, Jc = 1.35, Yc = {
	min: 0,
	max: 1,
	dflt: .85
}, Xc = {
	min: 0,
	max: 15,
	dflt: 5
}, Zc = {
	min: 0,
	max: 48,
	dflt: 5
}, Qc = {
	min: .5,
	max: 90,
	dflt: 30
}, $c = {
	min: .5,
	max: 90,
	dflt: 12
}, el = {
	min: 4,
	max: 20,
	dflt: 12
};
function tl(e) {
	let t = String(e), n = 5381;
	for (let e = 0; e < t.length; e++) n = (n << 5) + n + t.charCodeAt(e) >>> 0;
	return n;
}
function nl(e, t) {
	let n = tl(`${e}:${t}`);
	return n ^= n >>> 15, n = Math.imul(n, 739982445) >>> 0, n ^= n >>> 12, n = Math.imul(n, 695872825) >>> 0, n ^= n >>> 15, (n >>> 0) / 4294967296;
}
function rl(e) {
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
function il(e) {
	return Array.from({ length: Math.max(1, Math.round(Number(e) || 0)) }, (e, t) => ({ src: rl(t) }));
}
var al = (e) => Math.round(e * 100) / 100;
function ol(e, { min: t, max: n, dflt: r }) {
	if (e == null || e === "") return r;
	let i = Number(e);
	return Number.isFinite(i) ? Math.min(n, Math.max(t, i)) : r;
}
function sl(e) {
	return Lc.includes(e) ? e : "floating";
}
function cl(e, t) {
	let n = sl(e);
	return Hc[n].includes(t) ? t : Uc[n];
}
function ll(e) {
	return Hc[sl(e)];
}
function ul({ style: e = "floating", motion: t, reducedMotion: n = !1 } = {}) {
	return n ? !1 : sl(e) === "band" || cl(e, t) !== "none";
}
function dl(e, t, n, r = !1) {
	let i = Math.round(ol(e, sl(t) === "mosaic" ? el : Wc)), a = Number(n);
	return !r && Number.isFinite(a) && a > 0 ? Math.min(i, a) : i;
}
function fl(e, t) {
	let n = Kc[sl(t)] || Kc.floating;
	return Math.round(ol(e, {
		...Gc,
		dflt: n
	}));
}
function pl(e) {
	return gl(e) in qc;
}
function ml(e, t) {
	let n = qc[gl(e)] ?? "";
	return n && typeof t == "string" && t.trim() ? t.trim() : n;
}
function hl(e) {
	return Rc.includes(e) ? e : "rect";
}
function gl(e) {
	return zc.includes(e) ? e : "shadow";
}
function _l(e) {
	return Bc.includes(e) ? e : "natural";
}
function vl(e, t) {
	if (gl(t) === "polaroid") return .84;
	let n = hl(e);
	return Vc.includes(n) ? 1 : n === "arch" ? .8 : Jc;
}
function yl(e) {
	return ["rect", "square"].includes(hl(e));
}
function bl(e) {
	return ol(e, $c);
}
function xl(e) {
	return ol(e, Yc);
}
function Sl(e) {
	return ol(e, Xc);
}
function Cl(e) {
	return Math.round(ol(e, Zc));
}
function wl(e) {
	return ol(e, Qc);
}
function Tl(e) {
	return Ic(e);
}
function El(e, t) {
	let n = Number(e);
	return Number.isFinite(n) && n > 0 ? Math.round(n) : Number(t) || 1;
}
function Dl(e, { count: t, seed: n, size: r, spread: i, tilt: a, style: o = "floating", repeat: s = !1 } = {}) {
	let c = (Array.isArray(e) ? e : []).filter((e) => e && typeof e.src == "string" && e.src), l = dl(t, o, c.length, s), u = fl(r, o), d = xl(i), f = Sl(a), p = n == null || n === "" ? 1 : n, m = Math.ceil(Math.sqrt(l * 1.6)), h = Math.ceil(l / m), g = Array.from({ length: m * h }, (e, t) => t).map((e) => ({
		cell: e,
		at: nl(p, `cell${e}`)
	})).sort((e, t) => e.at - t.at).map((e) => e.cell), _ = [];
	for (let e = 0; e < l; e++) {
		let t = g[e], n = (t % m + .5) / m + (nl(p, `x${e}`) - .5) * (.9 / m), r = (Math.floor(t / m) + .5) / h + (nl(p, `y${e}`) - .5) * (.9 / h);
		_.push({
			src: c.length ? c[e % c.length].src : "",
			index: c.length ? e % c.length : -1,
			x: al(50 + (n - .5) * 100 * d),
			y: al(50 + (r - .5) * 100 * d),
			w: Math.round(u * (.8 + nl(p, `w${e}`) * .4)),
			rot: Ol(p, e, f),
			phase: al(nl(p, `p${e}`)),
			heading: al(nl(p, `h${e}`))
		});
	}
	return _;
}
function Ol(e, t, n) {
	return al((nl(e == null || e === "" ? 1 : e, `r${t}`) - .5) * 2 * Sl(n));
}
function kl(e, t) {
	let n = e == null || e === "" ? 1 : e, r = nl(n, `m${t}`);
	return {
		cols: r < .3 ? 2 : 1,
		rows: r > .7 || r < .1 ? 2 : 1,
		phase: al(nl(n, `mp${t}`))
	};
}
function Al(e, t, n, r = !1) {
	let i = dl(e, "mosaic", n, r);
	return Array.from({ length: i }, (e, n) => kl(t, n));
}
//#endregion
//#region ../template/assets/engine/0.7.4/preset-thumb.js
var jl = /^#[0-9a-fA-F]{3,8}$/, Ml = /^[a-z][a-z0-9-]*$/, Nl = "#171c26", Pl = "#232a38", Fl = "#98a1b3", Il = "#7c5cff", Ll = (e, t) => `var(--urd-color-${e}, ${t})`;
function Rl(e, t) {
	return typeof e == "string" ? jl.test(e) ? e : Ml.test(e) ? Ll(e, t) : t : t;
}
function zl(e, t = 800) {
	let n = Number.parseFloat(e);
	return !Number.isFinite(n) || n <= 0 ? 400 : typeof e == "string" && e.trim().endsWith("vh") ? n / 100 * t : n;
}
var Bl = (e) => Math.round(e * 10) / 10, Vl = (e, t, n) => Math.min(n, Math.max(t, e)), Hl = (e, t, n, r, i, a = "") => `<rect x="${Bl(e)}" y="${Bl(t)}" width="${Bl(Math.max(n, 1))}" height="${Bl(Math.max(r, 1))}" fill="${i}"${a}/>`;
function Ul(e) {
	if (e?.theme) return e.theme === "inverse" || e.theme === "deep" ? Ll("text", Fl) : e.theme === "accent" ? Ll("accent", Il) : Ll("surface", Pl);
	for (let t of e?.background?.layers ?? []) {
		if (t.type === "color") return Rl(t.props?.value, Nl);
		if (t.type === "gradient") return Rl(Array.isArray(t.props?.stops) ? t.props.stops[0] : null, Nl);
	}
	return Ll("bg", Nl);
}
function Wl(e, t, n, r, i) {
	let a = /<h[1-3]/.test(String(i?.html ?? "")), o = i?.align === "center", s = Ll("text", Fl), c = [];
	i?.box && c.push(Hl(e, t, n, r, Ll("surface", Pl), " rx=\"1.5\""));
	let l = i?.box ? Math.min(2, n * .06) : 0, u = e + l, d = n - l * 2, f = [
		.72,
		.9,
		.5
	], p = [
		a ? 4 : 2.2,
		2.2,
		2.2
	], m = Vl(r / (p[0] + p[1] + p[2] + 4.8 + 2), 0, 1), h = t + l + Math.min(1, r * .08);
	for (let e = 0; e < 3; e++) {
		let n = Math.min(Math.max(e === 0 ? a ? 1.4 : 1 : .8, p[e] * m), Math.max(r, 1));
		if (e > 0 && h + n > t + r - l) break;
		let i = d * f[e], g = o ? u + (d - i) / 2 : u;
		c.push(Hl(g, h, i, n, s, ` opacity="${e === 0 ? .8 : .4}" rx="${Bl(Math.min(1, n / 2))}"`)), h += n + Math.max(.8, 2.4 * m);
	}
	return c.join("");
}
function Gl(e, t, n, r, i = !1) {
	let a = Ll("text", Fl), o = [];
	i ? (o.push(Hl(e, t, n, r, Ll("surface", Pl), " rx=\"1.5\" opacity=\"0.35\"")), o.push(`<rect x="${Bl(e + .4)}" y="${Bl(t + .4)}" width="${Bl(Math.max(n - .8, 1))}" height="${Bl(Math.max(r - .8, 1))}" fill="none" stroke="${a}" stroke-width="0.6" stroke-dasharray="2 2" opacity="0.35" rx="1.5"/>`)) : o.push(Hl(e, t, n, r, Ll("surface", Pl), " rx=\"1.5\""));
	let s = i ? .15 : .4, c = (t) => Bl(e + n * t), l = (e) => Bl(t + r * e);
	return o.push(`<polygon points="${c(.08)},${l(.9)} ${c(.42)},${l(.38)} ${c(.62)},${l(.68)} ${c(.75)},${l(.5)} ${c(.92)},${l(.9)}" fill="${a}" opacity="${s}"/>`), o.push(`<circle cx="${c(.28)}" cy="${l(.26)}" r="${Bl(Math.max(1, Math.min(n, r) * .1))}" fill="${a}" opacity="${Bl(s + .1)}"/>`), o.join("");
}
function Kl(e, t, n, r, i) {
	let a = !(Array.isArray(i?.images) && i.images.length), o = Math.max(1, n * .03), s = (n - o * 2) / 3, c = [];
	for (let n = 0; n < 3; n++) c.push(Gl(e + n * (s + o), t, s, r, a));
	return c.join("");
}
function ql(e, t, n, r) {
	let i = Math.max(1, n * .03), a = (n - i * 2) / 3, o = [];
	for (let n = 0; n < 3; n++) {
		let s = e + n * (a + i);
		o.push(Hl(s, t, a, r * .55, Ll("surface", Pl), " rx=\"1.5\"")), o.push(Hl(s, t + r * .62, a * .8, 2, Ll("text", Fl), " opacity=\"0.5\" rx=\"1\""));
	}
	return o.join("");
}
function Jl(e, t, n, r, i) {
	let a = Rl(i?.color, Il), o = i?.kind;
	return o === "circle" ? `<ellipse cx="${Bl(e + n / 2)}" cy="${Bl(t + r / 2)}" rx="${Bl(Math.max(n / 2, 1))}" ry="${Bl(Math.max(r / 2, 1))}" fill="${a}" opacity="0.8"/>` : o === "triangle" ? `<polygon points="${Bl(e)},${Bl(t + r)} ${Bl(e + n / 2)},${Bl(t)} ${Bl(e + n)},${Bl(t + r)}" fill="${a}" opacity="0.8"/>` : o === "line" || o === "arrow" ? Hl(e, t + r / 2 - .75, n, 1.5, a, " opacity=\"0.85\" rx=\"0.75\"") : Hl(e, t, n, r, a, " opacity=\"0.8\" rx=\"1\"");
}
function Yl(e, t, n, r, i, a) {
	if (e === "text") return Wl(t, n, r, i, a);
	if (e === "image") return Gl(t, n, r, i, !a?.src);
	if (e === "gallery") return Kl(t, n, r, i, a);
	if (e === "collection") return ql(t, n, r, i);
	if (e === "faq") {
		let e = Vl(Math.floor(i / 5), 2, 3), a = Math.max(.6, i * .04), o = (i - a * (e - 1)) / e, s = [];
		for (let i = 0; i < e; i += 1) {
			let e = n + i * (o + a);
			s.push(Hl(t, e, r, o, Ll("surface", Pl), " rx=\"1\"")), s.push(Hl(t + r * .06, e + o / 2 - .7, r * .55, 1.4, Ll("text", Fl), " opacity=\"0.5\" rx=\"0.7\"")), s.push(`<circle cx="${Bl(t + r * .92)}" cy="${Bl(e + o / 2)}" r="0.9" fill="${Ll("text", Fl)}" opacity="0.4"/>`);
		}
		return s.join("");
	}
	if (e === "shape") return Jl(t, n, r, i, a);
	if (e === "button") return Hl(t, n, r, i, Ll("accent", Il), ` rx="${Bl(Math.min(i / 2, 4))}"`);
	if (e === "icon") {
		let e = Math.max(1.2, Math.min(r, i) / 2);
		return `<circle cx="${Bl(t + r / 2)}" cy="${Bl(n + i / 2)}" r="${Bl(e)}" fill="${Ll("accent", Il)}" opacity="0.85"/>`;
	}
	if (e === "video") {
		let e = [Hl(t, n, r, i, Ll("surface", Pl), " rx=\"1.5\"")], a = t + r / 2, o = n + i / 2, s = Math.max(1.5, Math.min(r, i) * .22);
		return e.push(`<polygon points="${Bl(a - s / 2)},${Bl(o - s)} ${Bl(a - s / 2)},${Bl(o + s)} ${Bl(a + s)},${Bl(o)}" fill="${Ll("text", Fl)}" opacity="0.6"/>`), e.join("");
	}
	if (e === "timeline") {
		let e = [Hl(t + 1, n, 1.4, i, Ll("accent", Il), " opacity=\"0.7\" rx=\"0.7\"")];
		for (let a = 0; a < 3; a += 1) {
			let o = n + i * (.18 + a * .32);
			e.push(`<circle cx="${Bl(t + 1.7)}" cy="${Bl(o)}" r="1.6" fill="${Ll("accent", Il)}"/>`), e.push(Hl(t + 5, o - 1, r * .5, 2, Ll("text", Fl), " opacity=\"0.5\" rx=\"1\""));
		}
		return e.join("");
	}
	if (e === "quote") return [
		`<text x="${Bl(t + r / 2)}" y="${Bl(n + i * .34)}" text-anchor="middle" font-size="${Bl(Math.min(r, i) * .5)}" font-family="Georgia, serif" fill="${Ll("accent", Il)}">“</text>`,
		Hl(t + r * .15, n + i * .48, r * .7, 2, Ll("text", Fl), " opacity=\"0.6\" rx=\"1\""),
		Hl(t + r * .25, n + i * .62, r * .5, 2, Ll("text", Fl), " opacity=\"0.6\" rx=\"1\""),
		Hl(t + r * .35, n + i * .82, r * .3, 1.6, Ll("text", Fl), " opacity=\"0.35\" rx=\"0.8\"")
	].join("");
	if (e === "ribbon") return [
		Hl(t, n + i * .3, r, i * .4, Ll("accent", Il), " opacity=\"0.85\" rx=\"1\""),
		Hl(t + r * .08, n + i * .46, r * .18, 1.8, Ll("bg", Nl), " opacity=\"0.9\" rx=\"0.9\""),
		Hl(t + r * .34, n + i * .46, r * .24, 1.8, Ll("bg", Nl), " opacity=\"0.9\" rx=\"0.9\""),
		Hl(t + r * .66, n + i * .46, r * .2, 1.8, Ll("bg", Nl), " opacity=\"0.9\" rx=\"0.9\"")
	].join("");
	if (e === "stats") return [Hl(t + r * .28, n + i * .15, r * .44, i * .42, Ll("accent", Il), " opacity=\"0.85\" rx=\"1\""), Hl(t + r * .32, n + i * .72, r * .36, 1.6, Ll("text", Fl), " opacity=\"0.4\" rx=\"0.8\"")].join("");
	if (e === "table") {
		let e = Math.max(1.6, i * .22), a = [Hl(t, n, r, e, Ll("accent", Il), " opacity=\"0.5\" rx=\"0.8\"")], o = Vl(Math.floor((i - e) / 3.2), 1, 3);
		for (let s = 0; s < o; s += 1) a.push(Hl(t, n + e + 1 + s * ((i - e - 1) / o), r, 1, Ll("text", Fl), " opacity=\"0.3\""));
		return a.push(Hl(t + r * .33, n, .6, i, Ll("text", Fl), " opacity=\"0.2\"")), a.push(Hl(t + r * .66, n, .6, i, Ll("text", Fl), " opacity=\"0.2\"")), a.join("");
	}
	if (e === "share") {
		let e = Math.max(1.2, Math.min(i / 2, r / 9)), a = [];
		for (let r = 0; r < 4; r += 1) a.push(`<circle cx="${Bl(t + e + r * (e * 2 + 1.5))}" cy="${Bl(n + i / 2)}" r="${Bl(e)}" fill="${Ll("accent", Il)}" opacity="0.8"/>`);
		return a.join("");
	}
	if (e === "countdown") {
		let e = Math.max(.8, r * .03), a = (r - e * 3) / 4, o = [];
		for (let r = 0; r < 4; r += 1) {
			let s = t + r * (a + e);
			o.push(Hl(s, n, a, i, Ll("surface", Pl), " rx=\"1\"")), o.push(Hl(s + a * .25, n + i * .2, a * .5, i * .35, Ll("accent", Il), " opacity=\"0.85\" rx=\"0.8\""));
		}
		return o.join("");
	}
	if (e === "audio") {
		let e = [Hl(t, n, r, i, Ll("surface", Pl), " rx=\"1.5\"")], a = n + i / 2, o = Math.max(1.2, i * .28);
		return e.push(`<polygon points="${Bl(t + r * .06)},${Bl(a - o)} ${Bl(t + r * .06)},${Bl(a + o)} ${Bl(t + r * .06 + o * 1.4)},${Bl(a)}" fill="${Ll("accent", Il)}" opacity="0.85"/>`), e.push(Hl(t + r * .2, a - .6, r * .7, 1.2, Ll("text", Fl), " opacity=\"0.35\" rx=\"0.6\"")), e.join("");
	}
	if (e === "product") {
		let e = Math.max(.8, r * .03), a = (r - e * 2) / 3, o = [];
		for (let r = 0; r < 3; r += 1) {
			let s = t + r * (a + e);
			o.push(Hl(s, n, a, i, Ll("surface", Pl), " rx=\"1\"")), o.push(Hl(s + a * .08, n + i * .06, a * .84, i * .42, Ll("text", Fl), " opacity=\"0.15\" rx=\"0.8\"")), o.push(Hl(s + a * .08, n + i * .56, a * .6, 1.4, Ll("text", Fl), " opacity=\"0.5\" rx=\"0.7\"")), o.push(Hl(s + a * .08, n + i * .72, a * .35, 1.4, Ll("accent", Il), " opacity=\"0.85\" rx=\"0.7\"")), o.push(Hl(s + a * .08, n + i * .84, a * .84, i * .1, Ll("accent", Il), " opacity=\"0.6\" rx=\"1\""));
		}
		return o.join("");
	}
	if (e === "cart") {
		let e = Math.max(1.5, Math.min(r, i) / 2.4), a = t + r / 2, o = n + i / 2;
		return [
			`<circle cx="${Bl(a)}" cy="${Bl(o)}" r="${Bl(e)}" fill="${Ll("surface", Pl)}"/>`,
			Hl(a - e * .5, o - e * .25, e, e * .55, Ll("text", Fl), " opacity=\"0.5\" rx=\"0.4\""),
			`<circle cx="${Bl(a + e * .75)}" cy="${Bl(o - e * .75)}" r="${Bl(Math.max(.9, e * .35))}" fill="${Ll("accent", Il)}"/>`
		].join("");
	}
	return e === "checkout" ? [
		Hl(t, n, r * .7, 1.2, Ll("text", Fl), " opacity=\"0.5\" rx=\"0.6\""),
		Hl(t, n + i * .12, r * .5, 1.2, Ll("text", Fl), " opacity=\"0.35\" rx=\"0.6\""),
		Hl(t, n + i * .3, r, i * .14, Ll("surface", Pl), " rx=\"1\""),
		Hl(t, n + i * .5, r, i * .14, Ll("surface", Pl), " rx=\"1\""),
		Hl(t, n + i * .78, r * .45, i * .16, Ll("accent", Il), " opacity=\"0.85\" rx=\"1.2\"")
	].join("") : Hl(t, n, r, i, Ll("surface", Pl), " rx=\"1.5\"");
}
function Xl(e, t, n) {
	let r = Array.isArray(e?.blocks) ? e.blocks : [], i = r.map((e) => (e.frames?.desktop?.y ?? 0) + (e.frames?.desktop?.h ?? 0)), a = n / Math.max(zl(e?.size?.minHeight), i.length ? Math.max(...i) + 16 : 0), o = [Hl(0, 0, t, n, Ul(e))];
	for (let r of e?.background?.layers ?? []) {
		if (r.type !== "glow") continue;
		let e = r.props ?? {};
		o.push(`<circle cx="${Bl(Vl(e.x ?? .5, 0, 1) * t)}" cy="${Bl(Vl(e.y ?? .3, 0, 1) * n)}" r="${Bl(t * Vl(e.radius ?? .5, .1, 1) * .5)}" fill="${Rl(e.color, Il)}" opacity="${Bl(Vl(e.opacity ?? .3, 0, .5))}"/>`);
	}
	for (let r of e?.background?.layers ?? []) {
		if (r.type !== "slideshow") continue;
		let e = r.props ?? {}, i = e.style ?? "floating", a = Ll("surface", Pl);
		if (i === "floating") {
			let r = e.look === "polaroid", s = t * (r ? .17 : .13), c = s / (r ? .84 : 1.35);
			for (let r of Dl(e.images, {
				...e,
				seed: e.seed || 1,
				style: i
			})) {
				let e = r.x / 100 * t - s / 2, i = r.y / 100 * n - c / 2, l = ` rx="1" opacity="0.75" transform="rotate(${Bl(r.rot)} ${Bl(e + s / 2)} ${Bl(i + c / 2)})"`;
				o.push(Hl(e, i, s, c, a, l));
			}
		} else if (i === "band") {
			let r = Number(e.rows) === 1 ? 1 : 2, i = n * (r === 1 ? .4 : .3), s = i * 1.33;
			for (let e = 0; e < r; e += 1) {
				let c = r === 1 ? (n - i) / 2 : n * .1 + e * (i + n * .1);
				for (let n = -s * (e * .5); n < t; n += s + 3) o.push(Hl(n, c, s, i, a, " rx=\"1\" opacity=\"0.75\""));
			}
		} else if (i === "mosaic") {
			let r = (t - 10) / 4, i = n / 3.4, s = 0, c = 0;
			for (let t of Al(e.count, e.seed || 1)) {
				s + t.cols > 4 && (s = 0, c += 1);
				let e = 2 + c * (i + 2);
				if (e > n) break;
				o.push(Hl(2 + s * (r + 2), e, r * t.cols + 2 * (t.cols - 1), i * t.rows + 2 * (t.rows - 1), a, " rx=\"1\" opacity=\"0.75\"")), s += t.cols, s >= 4 && (s = 0, c += 1);
			}
		}
	}
	let s = t * .06, c = t - s * 2;
	for (let e of r) {
		let r = e.frames?.desktop;
		if (!r) continue;
		let i = Vl(s + (r.x ?? 0) * (c / 100), 0, t - 2), l = Vl((r.y ?? 0) * a, 0, n - 2), u = Vl((r.w ?? 10) * (c / 100), 2, t - i), d = Vl((r.h ?? 20) * a, 2, n - l);
		o.push(Yl(e.type, i, l, u, d, e.props));
	}
	return o.join("");
}
function Zl(e, { w: t = 96, h: n = 116, max: r = 6 } = {}) {
	let i = (Array.isArray(e?.sections) ? e.sections : []).slice(0, r);
	if (!i.length) return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${Hl(0, 0, t, n, Ll("bg", Nl))}</svg>`;
	let a = i.map((e) => Vl(zl(e?.size?.minHeight), 160, 900)), o = a.reduce((e, t) => e + t, 0), s = n - 1 * (i.length - 1), c = [], l = 0;
	for (let e = 0; e < i.length; e += 1) {
		let n = Math.max(6, a[e] / o * s);
		c.push(`<g transform="translate(0 ${Bl(l)})">${Xl(i[e], t, n)}</g>`), l += n + 1;
	}
	return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${c.join("")}</svg>`;
}
//#endregion
//#region ../template/assets/engine/0.7.4/page-presets.js
var Ql = /* @__PURE__ */ new Map();
bc({ sections: { define: (e, t) => Ql.set(e, t) } });
var $l = [
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
function eu(e, { pageId: t, title: n }) {
	let r = $l.find((t) => t.id === e);
	return r ? {
		schemaVersion: 4,
		meta: {
			id: t,
			title: n
		},
		sections: r.sections.map((e) => Ql.get(e).create())
	} : null;
}
//#endregion
//#region ../template/assets/engine/0.7.4/palette-search.js
function tu(e) {
	return String(e ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}
function nu(e, t) {
	let n = tu(t).trim(), r = tu(e);
	return n ? r.startsWith(n) ? 0 : r.split(/[^a-z0-9]+/).some((e) => e.startsWith(n)) ? 1 : r.includes(n) ? 2 : -1 : 2;
}
function ru(e, t, n) {
	return e.map((e, r) => ({
		item: e,
		i: r,
		rank: nu(n(e), t)
	})).filter((e) => e.rank >= 0).sort((e, t) => e.rank - t.rank || e.i - t.i).map((e) => e.item);
}
//#endregion
//#region ../template/assets/engine/0.7.4/theme.js
function iu(e, t, n) {
	return t === "light" || t === "dark" ? t : n ? "dark" : "light";
}
function au(e, t) {
	let n = e.tokens || {}, r = e.scheme === "dark" ? "dark" : "light";
	if (!e.alt?.tokens || t === r) return n;
	let i = {};
	for (let t of /* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(e.alt.tokens)])) i[t] = {
		...n[t],
		...e.alt.tokens[t]
	};
	return i;
}
var ou = /^[a-zA-Z0-9#%.,()'"\s+\-*/]+$/;
function su(e) {
	return typeof e == "string" && ou.test(e) && !/url\(|\/\*|\*\/|expression/i.test(e);
}
function cu(e) {
	let t = e.tokens || {}, n = au(e, "light"), r = au(e, "dark"), i = e.scheme === "dark" ? "dark" : "light", a = [], o = [], s = [], c = /* @__PURE__ */ new Set([
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
			su(c) && (a.push(`  --urd-${e}-${l}: ${c};`), i && a.push(`  --urd-base-${l}: ${c};`)), u !== d && (i && su(u) && su(d) ? o.push({
				name: l,
				lv: u,
				dv: d
			}) : !i && su(u) && su(d) && s.push({
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
	].some((e) => su(e.color?.["accent-text"])) && su(t.color?.accent);
	u && su(t.color?.bg) && (a.push(`  --urd-color-accent-text: ${t.color.bg};`), a.push(`  --urd-base-accent-text: ${t.color.bg};`));
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
function lu(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
var uu = {
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
}, du = {
	surface: "sectionTheme.surface",
	accent: "sectionTheme.accent",
	inverse: "sectionTheme.inverse",
	soft: "sectionTheme.soft",
	muted: "sectionTheme.muted",
	deep: "sectionTheme.deep",
	highlighted: "sectionTheme.highlighted"
};
[...new Set(Object.values(uu).flatMap(Object.keys))];
function fu(e) {
	return uu[e] ?? {};
}
function pu(e) {
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
function mu(e, t) {
	let n = pu(e), r = pu(t);
	return n == null || r == null ? null : (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/color.js
var hu = {
	version: 1,
	label: "Colour",
	labelKey: "bgLayer.color",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = lu(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, gu = {
	linear: [
		"pan",
		"pan-loop",
		"rotate"
	],
	radial: ["pulse", "orbit"]
};
function _u(e) {
	let t = Array.isArray(e) && e.length ? e : [{ color: "#0b0e14" }, { color: "#1a1030" }], n = t.map((e) => Math.max(0, Number(e?.share) || 0)), r = n.reduce((e, t) => e + t, 0), i = r <= 0, a = i ? t.length : r, o = 0;
	return t.map((e, t) => {
		let r = i ? 1 : n[t], s = (o + r / 2) / a * 100;
		return o += r, {
			color: e?.color ?? "#0b0e14",
			at: Math.round(s * 100) / 100
		};
	});
}
function vu(e) {
	let t = (e) => Math.round(e * 100) / 100, n = e[0]?.at ?? 0;
	return [...e.map((e) => ({
		color: e.color,
		at: t(e.at - n)
	})), {
		color: e[0]?.color ?? "#0b0e14",
		at: 100
	}];
}
function yu(e, t, n, r = .5) {
	let i = n % 360 * Math.PI / 180, a = (e) => Math.round(e * 100) / 100 || 0, o = (Math.abs(e * Math.sin(i)) + Math.abs(t * Math.cos(i))) / (1 - Math.min(Math.max(r, 0), .9));
	return {
		period: a(o),
		dx: a(Math.sin(i) * o),
		dy: a(-Math.cos(i) * o)
	};
}
function bu(e, t, n) {
	return `repeating-linear-gradient(${t}deg, ${e.map((e) => `${lu(e.color)} ${Math.round(e.at / 100 * n * 100) / 100}px`).join(", ")})`;
}
function xu(e) {
	let t = e.kind === "radial" ? "radial" : "linear", n = (gu[t] ?? []).includes(e.animation) ? e.animation : null, r = _u(e.stops), i = r.map((e) => `${lu(e.color)} ${e.at}%`).join(", "), a = {}, o;
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
					stops: vu(r),
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
var Su = /* @__PURE__ */ new Set(), Cu = !1;
function wu(e) {
	Su.add(e), !(Cu || typeof window > "u") && (Cu = !0, window.addEventListener("resize", () => {
		for (let e of [...Su]) e() || Su.delete(e);
	}));
}
var Tu = !1;
function Eu() {
	if (!Tu) {
		Tu = !0;
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
var Du = {
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
		let n = xu(t);
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
					let e = yu(r, i, n.loop.angle, n.loop.maxShare);
					t.style.inset = `${-Math.ceil(e.period)}px`, t.style.background = bu(n.loop.stops, n.loop.angle, e.period), t.style.setProperty("--urd-loop-dx", `${e.dx}px`), t.style.setProperty("--urd-loop-dy", `${e.dy}px`);
				}
				return !0;
			};
			requestAnimationFrame(r), wu(r);
			return;
		}
		if (n.runner) {
			e.classList.add("urd-bg-loop-host");
			let t = document.createElement("div");
			t.className = n.runner.className, t.style.background = n.runner.background, n.runner.left != null && (t.style.left = n.runner.left), n.runner.top != null && (t.style.top = n.runner.top), e.appendChild(t);
			return;
		}
		e.style.background = n.background, n.className && (e.classList.add(n.className), n.className === "urd-bg-rotate" && Eu());
	}
}, Ou = {
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
		let n = lu(t.color), r = t.x ?? .5, i = t.y ?? .3, a = t.radius ?? .5;
		e.style.background = `radial-gradient(circle at ${r * 100}% ${i * 100}%, ${n} 0%, transparent ${a * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, ku = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", Au = {
	version: 1,
	label: "Grain",
	labelKey: "bgLayer.grain",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = ku, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
}, ju = [
	"dots",
	"grid",
	"diagonal",
	"checks",
	"waves",
	"zigzag",
	"plus",
	"triangles"
], Mu = {
	min: 8,
	max: 160,
	dflt: 28
}, Nu = .12, Pu = {
	dots: "<circle cx=\"12\" cy=\"12\" r=\"3\"/>",
	grid: "<rect width=\"24\" height=\"1.6\"/><rect width=\"1.6\" height=\"24\"/>",
	diagonal: "<path d=\"M-6 6L6 -6M0 24L24 0M18 30L30 18\" fill=\"none\" stroke=\"#000\" stroke-width=\"4\"/>",
	checks: "<rect width=\"12\" height=\"12\"/><rect x=\"12\" y=\"12\" width=\"12\" height=\"12\"/>",
	waves: "<path d=\"M0 12Q6 4 12 12T24 12\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\"/>",
	zigzag: "<path d=\"M0 16L6 8L12 16L18 8L24 16\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\"/>",
	plus: "<path d=\"M12 7V17M7 12H17\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\" stroke-linecap=\"round\"/>",
	triangles: "<path d=\"M0 24L12 4L24 24Z\"/>"
};
function Fu(e) {
	return ju.includes(e) ? e : "dots";
}
function Iu(e) {
	let t = Number(e);
	return !Number.isFinite(t) || t <= 0 ? Mu.dflt : Math.min(Mu.max, Math.max(Mu.min, Math.round(t)));
}
function Lu(e) {
	let t = Number(e);
	return Number.isFinite(t) ? (Math.round(t) % 360 + 360) % 360 : 0;
}
function Ru(e) {
	let t = Number(e);
	return e == null || e === "" || !Number.isFinite(t) ? Nu : Math.min(1, Math.max(0, t));
}
function zu(e = {}) {
	let t = Iu(e.size), n = Lu(e.rotation), r = Pu[Fu(e.pattern)], i = `<pattern id="p" width="${t}" height="${t}" patternUnits="userSpaceOnUse"${n ? ` patternTransform="rotate(${n})"` : ""}><g transform="scale(${t / 24})">${r}</g></pattern>`, a = "<rect width=\"100%\" height=\"100%\" fill=\"url(#p)\"/>";
	return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><defs>${i}</defs>${e.invert === !0 ? `<mask id="m"><rect width="100%" height="100%" fill="#fff"/>${a}</mask><rect width="100%" height="100%" mask="url(#m)"/>` : a}</svg>`;
}
var Bu = () => typeof CSS < "u" && typeof CSS.supports == "function" && (CSS.supports("mask-image", "none") || CSS.supports("-webkit-mask-image", "none")), Vu = {
	version: 1,
	label: "Pattern",
	labelKey: "bgLayer.pattern",
	defaults: () => ({
		pattern: "dots",
		color: "text",
		size: Mu.dflt,
		opacity: Nu,
		rotation: 0,
		invert: !1
	}),
	migrations: {},
	render(e, t) {
		if (!Bu()) return;
		let n = `url("data:image/svg+xml,${encodeURIComponent(zu(t))}")`;
		e.style.backgroundColor = lu(t.color ?? "text"), e.style.opacity = String(Ru(t.opacity));
		for (let t of ["webkitMask", "mask"]) e.style[`${t}Image`] = n, e.style[`${t}Size`] = "100% 100%", e.style[`${t}Repeat`] = "no-repeat";
	}
}, Hu = [
	"wave",
	"tilt",
	"curve",
	"triangle",
	"zigzag"
], Uu = {
	min: 16,
	max: 240,
	dflt: 64
}, Wu = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/api\/photo\?[^\s"'<>\\]{1,2048}|\/(?!\/)[\w%./-]*)$/;
function Gu(e) {
	return typeof e == "string" && Wu.test(e);
}
var Ku = /^(?:https?:\/\/|mailto:|tel:)[^\s]+$/i;
function qu(e) {
	return typeof e == "string" && Ku.test(e.trim());
}
var Ju = /^(?:\/(?![/\\])[^\s\\]*|#[^\s]*)$/;
function Yu(e) {
	return qu(e) || typeof e == "string" && Ju.test(e.trim());
}
var Xu = [
	"launcher",
	"cart",
	"theme"
];
function Zu(e = {}) {
	let t = Array.isArray(e.tools?.order) ? e.tools.order : [], n = [];
	for (let e of t) Xu.includes(e) && !n.includes(e) && n.push(e);
	for (let e of Xu) n.includes(e) || n.push(e);
	return n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/image.js
var Qu = .4, $u = [
	"none",
	"kenburns",
	"drift"
], ed = {
	min: 6,
	max: 60,
	dflt: 20
};
function td(e) {
	return $u.includes(e) ? e : "none";
}
function nd(e) {
	let { min: t, max: n, dflt: r } = ed, i = Number(e);
	return !Number.isFinite(i) || i <= 0 ? r : Math.min(n, Math.max(t, i));
}
function rd(e, t) {
	return `${(e ?? .5) * 100}% ${(t ?? .5) * 100}%`;
}
function id(e, t) {
	return e === "contain" ? "contain" : e === "cover" ? "cover" : `${Math.max(0, t ?? 1) * 100}%`;
}
function ad(e) {
	let t = "-9999px";
	return e === "up" ? `inset(${t} 0 0 0)` : e === "down" ? `inset(0 0 ${t} 0)` : e === "both" ? `inset(${t} 0 ${t} 0)` : "inset(0)";
}
function od(e, t, n, r = .18) {
	let i = Math.max(0, Math.min(1, n)) * Qu * t;
	return Math.round(Math.min(i, r * e));
}
function sd(e, t, n, r, i) {
	let a = e + t / 2, o = (n / 2 - a) * Math.max(0, Math.min(1, r)) * Qu, s = i ?? od(t, n, r);
	return Math.max(-s, Math.min(s, o)) || 0;
}
var cd = /* @__PURE__ */ new Set(), ld = !1, ud = 0;
function dd() {
	ud = 0;
	for (let e of [...cd]) e() || cd.delete(e);
}
function fd() {
	ud ||= requestAnimationFrame(dd);
}
function pd(e) {
	cd.add(e), e(), !(ld || typeof window > "u") && (ld = !0, window.addEventListener("scroll", fd, { passive: !0 }), window.addEventListener("resize", fd, { passive: !0 }));
}
function md(e, t, n, r) {
	let i = r === "cover" || r === "tile" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement, o = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
	e.style.willChange = "transform";
	let s = (t) => {
		e.style.top = `-${t}px`, e.style.bottom = `-${t}px`;
	}, c = () => {
		if (!e.isConnected) return !1;
		if (o || document.body.classList.contains("urd-mobile")) return s(n), e.style.transform = "", !0;
		let r = (a ?? e).getBoundingClientRect(), c = window.innerHeight || document.documentElement.clientHeight, l = od(r.height, c, t, i ? .18 : .6);
		s(i ? Math.max(n, l) : n);
		let u = sd(r.top, r.height, c, t, l);
		return e.style.transform = `translateY(${u.toFixed(1)}px)`, !0;
	};
	pd(c), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(c));
}
function hd() {
	return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("animation-timeline", "view()");
}
var gd = /* @__PURE__ */ new Set(), _d = !1, vd = 0;
function yd() {
	vd = 0;
	for (let e of [...gd]) e() || gd.delete(e);
}
function bd() {
	!vd && typeof requestAnimationFrame == "function" && (vd = requestAnimationFrame(yd));
}
function xd(e) {
	gd.add(e), e(), !(_d || typeof window > "u") && (_d = !0, window.addEventListener("resize", bd, { passive: !0 }));
}
function Sd(e, t, n, r) {
	let i = r === "cover" || r === "tile" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement;
	e.style.willChange = "transform", e.classList.add("urd-parallax-css");
	let o = () => {
		if (!e.isConnected) return !1;
		let r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || document.body.classList.contains("urd-mobile"), o = (a ?? e).getBoundingClientRect(), s = window.innerHeight || document.documentElement.clientHeight, c = od(o.height, s, t, i ? .18 : .6), l = i && !r ? Math.max(n, c) : n;
		return e.style.setProperty("--urd-px-shift", `${c}px`), e.style.top = `-${l}px`, e.style.bottom = `-${l}px`, !0;
	};
	xd(o), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(o));
}
var Cd = {
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
		motionSpeed: ed.dflt
	}),
	migrations: {
		1: (e) => ({
			...e,
			fit: e.fit === "vanlig" ? "plain" : e.fit === "flislegg" ? "tile" : e.fit === "egen" ? "custom" : e.fit
		}),
		2: (e) => ({
			motion: "none",
			motionSpeed: ed.dflt,
			...e
		})
	},
	render(e, t) {
		let n = !Gu(t.src);
		n && e.classList.add("urd-bg-demo");
		let r = n ? rl(0) : t.src;
		e.style.opacity = String(t.opacity ?? 1), e.style.clipPath = ad(t.bleed), e.style.zIndex = t.bleed === "down" || t.bleed === "both" ? "1" : "";
		let i = document.createElement("div");
		i.className = "urd-bg-image", i.style.position = "absolute", i.style.left = "0", i.style.right = "0", i.style.top = "0", i.style.bottom = "0";
		let a = td(t.motion), o = a === "none" ? i : document.createElement("div");
		o !== i && (o.className = `urd-bg-motion urd-bg-motion-${a}`, o.style.position = "absolute", o.style.left = "0", o.style.right = "0", o.style.top = "0", o.style.bottom = "0", o.style.animationDuration = `${nd(t.motionSpeed)}s`, i.appendChild(o));
		let s = t.fit === "tile" || t.fit === "repeat";
		o.style.backgroundImage = `url("${r}")`, o.style.backgroundSize = id(t.fit, t.size), o.style.backgroundRepeat = s ? "repeat" : "no-repeat", o.style.backgroundPosition = rd(t.x, t.y);
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
		e.appendChild(i), t.parallax > 0 && wd(i, t.parallax, o === i ? c : 0, t.fit ?? "cover");
	}
};
function wd(e, t, n, r) {
	hd() ? Sd(e, t, n, r) : md(e, t, n, r);
}
//#endregion
//#region ../template/assets/engine/0.7.4/gallery-model.js
var Td = [
	"grid",
	"carousel",
	"slides",
	"ribbon",
	"mosaic",
	"polaroid"
], Ed = [
	"grid",
	"mosaic",
	"polaroid"
], Dd = {
	min: 80,
	max: 400,
	dflt: 140
}, Od = {
	min: 0,
	max: 15,
	dflt: 4
};
function kd(e) {
	return Td.includes(e) ? e : "grid";
}
function Ad(e, t, n) {
	return !Number.isFinite(n) || n < 1 ? 0 : (((Number.isFinite(e) ? e : 0) + t) % n + n) % n;
}
function jd({ count: e = 0, reducedMotion: t = !1 } = {}) {
	return e >= 2 && !t;
}
function Md(e, { min: t = 2, fallback: n = 5 } = {}) {
	let r = Number(e);
	return !Number.isFinite(r) || r <= 0 ? n : Math.max(t, r);
}
//#endregion
//#region ../template/assets/engine/0.7.4/photo-source.js
var Nd = [
	"drive",
	"gphotos",
	"nextcloud",
	"json"
], Pd = {
	min: 1,
	max: 60,
	dflt: 24
}, Fd = [
	"name",
	"newest",
	"random"
], Id = [
	480,
	800,
	1200,
	1600,
	2e3
], Ld = /^[A-Za-z0-9_-]{10,128}$/, Rd = /^(?!\d+(?:\.\d+)*$)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/;
function zd(e) {
	let t = Number(e);
	return !Number.isFinite(t) || t <= 0 ? Pd.dflt : Math.min(Pd.max, Math.max(Pd.min, Math.round(t)));
}
function Bd(e) {
	let t = typeof e == "string" ? e.trim() : "";
	if (!t) return null;
	if (Ld.test(t) && !t.includes(".")) return {
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
		return Ld.test(t) ? {
			provider: "drive",
			id: t
		} : null;
	}
	if (r === "photos.google.com") {
		let e = /^\/share\/([A-Za-z0-9_-]{10,256})\/?$/.exec(n.pathname), t = n.searchParams.get("key") ?? "";
		return e ? {
			provider: "gphotos",
			id: e[1],
			...Ld.test(t) ? { host: t } : {}
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
	return i && Rd.test(r) ? {
		provider: "nextcloud",
		id: i[1],
		host: r
	} : /\.json$/i.test(n.pathname) && Rd.test(r) ? {
		provider: "json",
		url: n.href
	} : null;
}
function Vd(e) {
	return Fd.includes(e) ? e : "name";
}
var Hd = (e) => Vd(e) === "newest" ? "newest" : "name";
function Ud(e, t) {
	if (!e || !Nd.includes(e.provider)) return null;
	let n = new URLSearchParams({
		p: e.provider,
		sort: Hd(t),
		max: "200"
	});
	return e.id && n.set("id", e.id), e.host && n.set("host", e.host), e.url && n.set("url", e.url), `/api/photos?${n.toString()}`;
}
function Wd(e, t = 200) {
	return (Array.isArray(e?.photos) ? e.photos : []).filter((e) => typeof e?.src == "string" && e.src.startsWith("/api/photo?")).slice(0, Math.max(1, Math.min(200, Number(t) || 200))).map((e) => ({
		src: e.src,
		name: typeof e.name == "string" ? e.name : ""
	}));
}
function Gd(e) {
	let t = e >>> 0;
	return () => {
		t = t + 1831565813 >>> 0;
		let e = t;
		return e = Math.imul(e ^ e >>> 15, e | 1), e ^= e + Math.imul(e ^ e >>> 7, e | 61), ((e ^ e >>> 14) >>> 0) / 4294967296;
	};
}
function Kd(e, t) {
	let n = [...e], r = Gd(Number(t) || 0);
	for (let e = n.length - 1; e > 0; e--) {
		let t = Math.floor(r() * (e + 1));
		[n[e], n[t]] = [n[t], n[e]];
	}
	return n;
}
function qd(e, t, n) {
	return Vd(t) === "random" ? Kd(e, n) : [...e];
}
var Jd = 0;
function Yd() {
	return Jd ||= typeof crypto < "u" && crypto.getRandomValues ? crypto.getRandomValues(/* @__PURE__ */ new Uint32Array(1))[0] || 1 : Date.now() >>> 0 || 1, Jd;
}
function Xd(e, t = 1) {
	let n = (Number(e) || 0) * Math.min(3, Math.max(1, Number(t) || 1));
	return Id.find((e) => e >= n) ?? Id[Id.length - 1];
}
function Zd(e, t) {
	if (typeof e != "string" || !e.startsWith("/api/photo?")) return e;
	let n = new URLSearchParams(e.slice(11));
	return n.set("w", String(t)), `/api/photo?${n.toString()}`;
}
var Qd = 6e5, $d = 3e4, ef = /* @__PURE__ */ new Map(), tf = /* @__PURE__ */ new Map();
function nf(e) {
	return e?.source === "folder" && typeof e.folder == "string" ? e.folder.trim() : "";
}
function rf(e, t) {
	let n = Ud(Bd(e), t);
	return n ? af(ef.get(n)) : null;
}
function af(e) {
	if (!e) return null;
	let t = e.value.photos.length ? Qd : $d;
	return Date.now() - e.at < t ? e.value : null;
}
function of(e, t, { force: n = !1 } = {}) {
	let r = Ud(Bd(e), t);
	if (!r) return Promise.resolve({
		photos: [],
		error: "badAddress",
		code: "photoFolderUnknown"
	});
	if (!n) {
		let e = af(ef.get(r));
		if (e) return Promise.resolve(e);
		if (tf.has(r)) return tf.get(r);
	}
	let i = (async () => {
		let e;
		try {
			let t = await fetch(r), n = await t.json().catch(() => null);
			e = t.ok ? {
				photos: Wd(n),
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
		return ef.set(r, {
			at: Date.now(),
			value: e
		}), tf.delete(r), e;
	})();
	return tf.set(r, i), i;
}
function sf(e) {
	let t = nf(e), n = t ? rf(t, e.order) : null;
	return n?.photos.length ? qd(n.photos, e.order, Yd()).slice(0, zd(e.folderMax)) : e.images ?? [];
}
function cf(e, t, n) {
	let r = nf(t);
	r && !rf(r, t.order) && of(r, t.order).then((r) => {
		e.isConnected && r.photos.length && (e.textContent = "", e.removeAttribute("style"), e.className = "urd-bg-layer", n(e, t));
	}), n(e, t);
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/slideshow.js
var lf = {
	source: "upload",
	folder: "",
	order: "random",
	folderMax: Pd.dflt,
	style: "floating",
	motion: "drift",
	motionSpeed: Qc.dflt,
	interval: $c.dflt,
	fade: 1.5,
	count: Wc.dflt,
	seed: 0,
	size: null,
	spread: Yc.dflt,
	tilt: Xc.dflt,
	radius: Zc.dflt,
	rows: 2,
	direction: "left",
	underNav: !0,
	underAnnounce: !1,
	repeat: !1,
	shape: "rect",
	look: "shadow",
	tone: "natural",
	frameColor: ""
}, uf = {
	version: 2,
	label: "Image gallery",
	labelKey: "bgLayer.slideshow",
	defaults: () => ({
		images: [],
		fit: "cover",
		opacity: .85,
		blur: 0,
		...lf
	}),
	migrations: { 1: (e) => ({
		...lf,
		style: "fill",
		motion: "none",
		interval: 6,
		opacity: 1,
		...e
	}) },
	render(e, t) {
		cf(e, t, ff);
	}
}, df = (e, t) => {
	let n = document.createElement(e);
	return n.className = t, n;
};
function ff(e, t) {
	let n = sl(t.style), r = sf(t).filter((e) => Gu(e?.src)), i = hl(t.shape), a = gl(t.look);
	e.classList.add("urd-bg-slideshow", `urd-gallery-${n}`, `urd-gallery-tone-${_l(t.tone)}`), n !== "fill" && e.classList.add(`urd-gallery-shape-${i}`, `urd-gallery-look-${a}`), e.style.setProperty("--urd-frame-radius", `${Cl(t.radius)}px`), r.length || e.classList.add("urd-bg-demo"), e.style.opacity = String(t.opacity ?? .85);
	let o = ml(a, t.frameColor);
	o && e.style.setProperty("--urd-frame-color", lu(o));
	let s = t.underNav === !1 ? ["var(--urd-announce-h, 0px)", "var(--urd-nav-own-h, 0px)"] : t.underAnnounce === !0 ? [] : ["var(--urd-announce-h, 0px)"], c = s.length ? `calc(${s.join(" + ")})` : "", l = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, u = cl(n, t.motion), d = {
		el: e,
		props: t,
		style: n,
		images: r,
		motion: u,
		shape: i,
		look: a,
		aspect: vl(i, a),
		moves: ul({
			style: n,
			motion: u,
			reducedMotion: l
		}),
		reduced: l,
		seed: El(t.seed, Yd()),
		time: wl(t.motionSpeed),
		dwell: bl(t.interval),
		dpr: window.devicePixelRatio || 1
	};
	Cf[n](d), c && (e.style.top = n === "fill" && t.blur > 0 ? `calc(${c} - ${t.blur * 2}px)` : c);
}
function pf(e, t, n, r, i) {
	let a = t[n];
	e.style.backgroundImage = `url("${a ? Zd(a.src, r) : rl(i)}")`, e.style.backgroundPosition = a ? rd(a.x, a.y) : "";
}
function mf({ el: e, props: t, images: n, motion: r, reduced: i, dpr: a, dwell: o }) {
	let s = !n.length, c = s ? il(3) : n, l = Xd(window.innerWidth, a);
	t.blur > 0 && (e.style.filter = `blur(${t.blur}px)`, e.style.inset = `-${t.blur * 2}px`);
	let u = Math.max(0, Number(t.fade) || 0);
	e.style.setProperty("--urd-bgg-fade", `${u}s`);
	let d = td(r === "drift" ? "drift" : r === "kenburns" ? "kenburns" : "none"), f = (e) => {
		let n = df("div", e ? "urd-bg-slide on" : "urd-bg-slide");
		return d !== "none" && (n.classList.add("urd-bg-motion", `urd-bg-motion-${d}`), n.style.animationDuration = `${nd(t.motionSpeed)}s`), n;
	}, p = (e, n) => {
		e.style.backgroundImage = `url("${s ? n.src : Zd(n.src, l)}")`, e.style.backgroundSize = s ? "240px auto" : id(t.fit), e.style.backgroundRepeat = s ? "repeat" : "no-repeat", e.style.backgroundPosition = s ? "" : rd(n.x, n.y);
	}, m = new Image();
	if (m.src = s ? c[0].src : Zd(c[0].src, l), !m.complete) {
		e.style.visibility = "hidden";
		let t = () => {
			e.style.visibility = "";
		};
		m.addEventListener("load", t, { once: !0 }), m.addEventListener("error", t, { once: !0 });
	}
	let h = f(!0);
	if (p(h, c[0]), e.appendChild(h), !jd({
		count: c.length,
		reducedMotion: i
	})) return;
	let g = f(!1);
	e.appendChild(g);
	let _ = 0, v = h, y = Math.max(Md(o, { fallback: $c.dflt }), u + .5) * 1e3, b = setInterval(() => {
		if (!h.isConnected) {
			clearInterval(b);
			return;
		}
		if (document.hidden) return;
		let e = Ad(_, 1, c.length), t = new Image();
		t.src = s ? c[e].src : Zd(c[e].src, l);
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
function hf(e, t, n, r, i) {
	let a = df("div", "urd-gallery-skin"), o = df("div", "urd-gallery-face");
	return pf(o, t, n, r, i), a.appendChild(o), e.appendChild(a), {
		skin: a,
		face: o
	};
}
function gf(e, t) {
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
function _f({ frame: e, skin: t, face: n }, r, i, a) {
	let { motion: o, moves: s, time: c } = a;
	if (!s) return;
	let l = `-${(r.phase * c).toFixed(2)}s`;
	if (o === "drift" || o === "rise") {
		e.classList.add("urd-gallery-travel");
		let t = gf(r, o);
		e.style.setProperty("--tx0", t.tx0), e.style.setProperty("--ty0", t.ty0), e.style.setProperty("--tx1", t.tx1), e.style.setProperty("--ty1", t.ty1), e.style.animationDuration = `${c}s`, e.style.animationDelay = l;
	} else if (o === "kenburns") e.classList.add("urd-gallery-kenburns"), e.style.animationDuration = `${c}s`, e.style.animationDelay = l;
	else if (o === "bounce") {
		e.style.left = "0", e.style.top = "0", e.style.translate = "0 0", e.classList.add("urd-gallery-bounce-x"), t.classList.add("urd-gallery-bounce-y");
		let n = c * (.8 + r.heading * .4), i = c * (.5 + r.phase * .35);
		e.style.animationDuration = `${n.toFixed(2)}s`, e.style.animationDelay = `-${(r.phase * n).toFixed(2)}s`, t.style.animationDuration = `${i.toFixed(2)}s`, t.style.animationDelay = `-${(r.heading * i).toFixed(2)}s`;
	}
}
function vf(e, t, n) {
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
			a >= 0 && (pf(t.face, r, a, t.width, i), c[i] = a, l[a] = ++u), n && (f += 1, yf(t, n(i, f, e.filter((e) => e !== t))));
		});
	});
}
function yf(e, t) {
	let n = t.w / 2 * 1.15, r = t.w / e.aspect / 2 * 1.15;
	e.frame.style.left = `clamp(${n.toFixed(1)}px, ${t.x}%, calc(100% - ${n.toFixed(1)}px))`, e.frame.style.top = `clamp(${r.toFixed(1)}px, ${t.y}%, calc(100% - ${r.toFixed(1)}px))`, e.frame.style.width = `${t.w}px`, e.frame.style.rotate = `${t.rot}deg`, e.x = t.x, e.y = t.y;
}
function bf(e) {
	let { el: t, props: n, style: r, images: i, seed: a, aspect: o, dpr: s } = e, c = {
		count: n.count,
		seed: a,
		size: n.size,
		spread: n.spread,
		tilt: n.tilt,
		style: r,
		repeat: n.repeat === !0
	};
	vf(Dl(i, c).map((n, r) => {
		let a = df("div", "urd-gallery-box urd-gallery-frame" + (n.index < 0 ? " urd-gallery-frame-empty" : ""));
		a.style.aspectRatio = String(o);
		let c = Xd(n.w, s), { skin: l, face: u } = hf(a, i, n.index, c, r);
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
		return yf(d, n), _f(d, n, r, e), d;
	}), e, (e, t, n) => {
		let r = null, o = -1;
		for (let s = 0; s < 6; s += 1) {
			let l = Dl(i, {
				...c,
				seed: `${a}:${t * 6 + s}`
			})[e], u = Math.min(999, ...n.map((e) => Math.hypot(e.x - l.x, e.y - l.y)));
			u > o && (o = u, r = l);
		}
		return r;
	});
}
function xf(e) {
	let { el: t, props: n, images: r, moves: i, time: a, aspect: o, dpr: s } = e, c = Tl(n.rows), l = fl(n.size, "band");
	t.style.setProperty("--urd-band-h", `${l}px`);
	let u = r.length || 8, d = Xd(l * o, s);
	for (let e = 0; e < c; e += 1) {
		let s = df("div", "urd-gallery-band-row");
		i || s.classList.add("urd-ribbon-still");
		let c = df("div", "urd-ribbon-track");
		n.direction === "right" != (e === 1) && c.classList.add("urd-ribbon-right"), c.style.setProperty("--urd-ribbon-ms", `${a * 1e3}ms`), e === 1 && (c.style.animationDelay = `-${(a / 3).toFixed(1)}s`);
		let l = (e) => {
			for (let t = 0; t < u; t += 1) {
				let n = df("div", "urd-gallery-box urd-gallery-band-tile" + (r.length ? "" : " urd-gallery-frame-empty"));
				n.style.aspectRatio = String(o), hf(n, r, r.length ? t : -1, d, t), e.appendChild(n);
			}
		}, f = df("div", "urd-ribbon-run");
		l(f);
		let p = df("div", "urd-ribbon-run");
		p.setAttribute("aria-hidden", "true"), l(p), c.append(f, p), s.appendChild(c), t.appendChild(s);
	}
}
function Sf(e) {
	let { el: t, props: n, images: r, seed: i, dpr: a, motion: o, moves: s, time: c } = e, l = Al(n.count, i, r.length, n.repeat === !0);
	t.style.setProperty("--urd-mosaic-row", `${fl(n.size, "mosaic")}px`);
	let u = Xd(fl(n.size, "mosaic") * 2.2, a);
	vf(l.map((e, n) => {
		let i = df("div", "urd-gallery-box urd-gallery-tile" + (r.length ? "" : " urd-gallery-frame-empty"));
		i.style.gridColumn = `span ${e.cols}`, i.style.gridRow = `span ${e.rows}`;
		let a = r.length ? n % r.length : -1, { face: l } = hf(i, r, a, u, n);
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
var Cf = {
	fill: mf,
	floating: bf,
	band: xf,
	mosaic: Sf
}, wf = /^(?:data:video\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/media\/[\w%./-]+\.(?:mp4|webm))$/i;
function Tf(e) {
	return typeof e == "string" && wf.test(e);
}
var Ef = null;
function Df(e) {
	Ef ??= new IntersectionObserver((e) => {
		for (let t of e) {
			if (!t.target.isConnected) {
				Ef.unobserve(t.target);
				continue;
			}
			t.isIntersecting ? t.target.play().catch(() => {}) : t.target.pause();
		}
	}, { threshold: 0 }), Ef.observe(e);
}
var Of = (e, t, n, r) => {
	e.style.position = "absolute", e.style.inset = "0", e.style.width = "100%", e.style.height = "100%", e.style.objectFit = t === "contain" ? "contain" : "cover", e.style.objectPosition = rd(n, r);
}, kf = {
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
		if (!Tf(t.src)) return;
		if (e.style.opacity = String(t.opacity ?? 1), window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
			if (!Gu(t.poster)) return;
			let n = document.createElement("img");
			n.className = "urd-bg-video-poster", n.alt = "", n.setAttribute("aria-hidden", "true"), n.src = t.poster, Of(n, t.fit, t.x, t.y), e.appendChild(n);
			return;
		}
		let n = document.createElement("video");
		n.className = "urd-bg-video", n.muted = !0, n.setAttribute("muted", ""), n.loop = !0, n.playsInline = !0, n.setAttribute("playsinline", ""), n.preload = "metadata", n.disablePictureInPicture = !0, n.setAttribute("aria-hidden", "true"), Gu(t.poster) && (n.poster = t.poster), n.src = t.src, Of(n, t.fit, t.x, t.y), e.appendChild(n), Df(n), t.parallax > 0 && wd(n, t.parallax, 0, t.fit === "contain" ? "contain" : "cover");
	}
};
//#endregion
//#region ../template/assets/engine/0.7.4/footer-thumb.js
function Af(e = {}) {
	let t = "#2fd6b6", n = "#5c6b64", r = e.mega ? "#16221d" : "#0e1512", i = e.cols ?? 0, a = e.social ?? 0, o = `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${r}"/>`;
	if (e.mega && (o += `<circle cx="20" cy="6" r="34" fill="${t}" opacity="0.18"/>`), e.bigcta) return o += `<rect x="45" y="18" width="70" height="8" rx="3" fill="${n}" opacity="0.85"/>`, o += `<rect x="56" y="32" width="48" height="4" rx="2" fill="${n}" opacity="0.5"/>`, o += `<rect x="62" y="43" width="36" height="10" rx="3" fill="${t}"/>`, o += jf(n, e.baselineLinks), o + "</svg>";
	if (e.chapters) {
		o += `<rect x="12" y="10" width="20" height="6" rx="2" fill="${t}"/>`, o += `<rect x="12" y="20" width="46" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		let r = i || 3, a = (136 - (r - 1) * 8) / r;
		for (let e = 0; e < r; e++) {
			let r = 12 + e * (a + 8);
			o += `<line x1="${r}" y1="30" x2="${r + a}" y2="30" stroke="${n}" stroke-width="0.8" opacity="0.7"/>`, o += `<rect x="${r}" y="34" width="9" height="6" rx="1.5" fill="${t}"/>`;
			for (let e = 0; e < 3; e++) o += `<rect x="${r}" y="${44 + e * 6}" width="${a * .7}" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		}
		return o += jf(n, e.baselineLinks), o + "</svg>";
	}
	if (e.split) {
		o += `<rect x="8" y="8" width="70" height="52" rx="4" fill="${t}" opacity="0.16"/>`, o += `<rect x="16" y="16" width="20" height="6" rx="2" fill="${t}"/>`, o += `<rect x="16" y="26" width="46" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`, o += `<rect x="16" y="36" width="26" height="9" rx="3" fill="${t}"/>`;
		let r = i || 2;
		for (let e = 0; e < r; e++) {
			let r = 90 + e * 32;
			o += `<rect x="${r}" y="14" width="16" height="3" rx="1.5" fill="${t}" opacity="0.8"/>`;
			for (let e = 0; e < 4; e++) o += `<rect x="${r}" y="${22 + e * 7}" width="22" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		}
		return o += jf(n, e.baselineLinks), o + "</svg>";
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
	return o += jf(n, e.baselineLinks), o + "</svg>";
}
function jf(e, t = 0) {
	let n = `<line x1="8" y1="66" x2="152" y2="66" stroke="${e}" stroke-width="0.6" opacity="0.5"/>`;
	return n += `<rect x="8" y="70" width="40" height="3" rx="1.5" fill="${e}" opacity="0.6"/>`, t && (n += `<g fill="${e}" opacity="0.6">` + Array.from({ length: t }, (e, t) => `<rect x="${120 - t * 16}" y="70" width="12" height="3" rx="1.5"/>`).join("") + "</g>"), n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/animations/core.js
var Mf = () => ({
	duration: 600,
	delay: 0
}), Nf = 90, Pf = {
	"fade-in": {
		version: 1,
		label: "Fade in",
		labelKey: "anim.fadeIn",
		entrance: !0,
		defaults: Mf,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Slide up",
		labelKey: "anim.slideUp",
		entrance: !0,
		defaults: Mf,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom in",
		labelKey: "anim.zoomIn",
		entrance: !0,
		defaults: Mf,
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
			step: Nf,
			effect: "slide-up",
			pattern: "sequence"
		}),
		migrations: {}
	}
}, Ff = [
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
function If(e) {
	let t = (e) => Math.round(e * 100) / 100, n = Math.max(0, t(100 - e.w)), r = Math.min(n, Math.max(0, t(e.x - e.w / 2))), i = Math.max(0, e.y - e.h / 2), a = e.snap === !1 || e.grid?.snap === !1, o = e.grid?.size || 8;
	return i = a ? Math.round(i) : Math.round(i / o) * o, {
		x: r,
		y: Math.max(0, i)
	};
}
//#endregion
//#region ../template/assets/engine/0.7.4/calendar-designs.js
var Lf = [
	"list",
	"cards",
	"month",
	"agenda",
	"next",
	"week",
	"day",
	"year"
], Rf = [
	"title",
	"date",
	"time",
	"place",
	"description",
	"category",
	"number"
], zf = ["emptyKicker", "emptyTitle"], Bf = [
	"noticeLabel",
	"noticeTitle",
	"noticeText",
	"moreInfo"
], Vf = [
	"all",
	"signup",
	"subscribe",
	"subscribeMulti",
	"addGoogle",
	"swUpcoming",
	"swWeek",
	"swMonth"
], Q = (e, t = "colors") => ({
	key: e,
	labelKey: `calendar.slot.${e}`,
	section: t
}), Hf = [
	{
		id: "plain",
		labelKey: "calendar.design.plain",
		view: null,
		stripe: !1,
		slots: [
			Q("accent"),
			Q("surface"),
			Q("line"),
			Q("chip")
		],
		texts: [
			"next",
			"now",
			"later",
			...Vf
		]
	},
	{
		id: "timeline",
		labelKey: "calendar.design.timeline",
		view: "list",
		module: "list",
		stripe: !1,
		slots: [
			Q("accent"),
			Q("dot"),
			Q("line"),
			Q("chip")
		],
		texts: Vf
	},
	{
		id: "table",
		labelKey: "calendar.design.table",
		view: "list",
		module: "list",
		stripe: !1,
		slots: [
			Q("accent"),
			Q("head"),
			Q("headText"),
			Q("zebra"),
			Q("line"),
			Q("chip")
		],
		texts: [
			"colDate",
			"colTime",
			"colEvent",
			"colPlace",
			...Vf
		]
	},
	{
		id: "booklet",
		labelKey: "calendar.design.booklet",
		view: "list",
		module: "list",
		stripe: !1,
		slots: [
			Q("accent"),
			Q("surface"),
			Q("rule"),
			Q("chip")
		],
		texts: ["program", ...Vf]
	},
	{
		id: "numbered",
		labelKey: "calendar.design.numbered",
		view: "list",
		module: "list",
		stripe: !1,
		slots: [
			Q("accent"),
			Q("number"),
			Q("line"),
			Q("chip")
		],
		texts: Vf
	},
	{
		id: "apList",
		labelKey: "calendar.design.apList",
		empty: "ap",
		view: "list",
		module: "list",
		stripe: !1,
		slots: [
			Q("row"),
			Q("text"),
			Q("gold"),
			Q("line"),
			Q("rec")
		],
		texts: [
			"recurring",
			...zf,
			...Vf
		]
	},
	{
		id: "glass",
		labelKey: "calendar.design.glass",
		view: "list",
		module: "list",
		stripe: !1,
		slots: [
			Q("ground"),
			Q("text"),
			Q("glass", "glass"),
			Q("glassLine", "glass"),
			Q("chip", "glass"),
			Q("blobA", "blobs"),
			Q("blobB", "blobs"),
			Q("blobC", "blobs")
		],
		texts: Vf
	},
	{
		id: "posters",
		labelKey: "calendar.design.posters",
		view: "cards",
		module: "cards",
		stripe: !1,
		program: !0,
		slots: [
			Q("accent"),
			Q("surface"),
			Q("line"),
			Q("posterA", "posters"),
			Q("posterAText", "posters"),
			Q("posterB", "posters"),
			Q("posterBText", "posters"),
			Q("posterC", "posters"),
			Q("posterCText", "posters")
		],
		texts: ["wholeProgram", ...Vf]
	},
	{
		id: "tickets",
		labelKey: "calendar.design.tickets",
		view: "cards",
		module: "cards",
		stripe: !1,
		program: !0,
		open: !0,
		slots: [
			Q("accent"),
			Q("surface"),
			Q("line"),
			Q("stub", "stub"),
			Q("stubText", "stub")
		],
		texts: [
			"wholeProgram",
			"openToAll",
			...Vf
		]
	},
	{
		id: "carousel",
		labelKey: "calendar.design.carousel",
		view: "cards",
		module: "cards",
		stripe: !1,
		slots: [
			Q("accent"),
			Q("surface"),
			Q("line"),
			Q("chip"),
			Q("card", "first"),
			Q("cardText", "first")
		],
		texts: Vf
	},
	{
		id: "photo",
		labelKey: "calendar.design.photo",
		view: "cards",
		module: "cards",
		stripe: !1,
		slots: [
			Q("accent"),
			Q("surface"),
			Q("line"),
			Q("placeholder"),
			Q("badge", "onPicture"),
			Q("badgeText", "onPicture"),
			Q("chip", "onPicture")
		],
		texts: Vf
	},
	{
		id: "apGrid",
		labelKey: "calendar.design.apGrid",
		empty: "ap",
		view: "cards",
		module: "cards",
		stripe: !1,
		slots: [
			Q("head"),
			Q("card"),
			Q("text"),
			Q("gold"),
			Q("rec")
		],
		texts: [
			"recurring",
			...zf,
			...Vf
		]
	},
	{
		id: "bento",
		labelKey: "calendar.design.bento",
		view: "cards",
		module: "cards",
		stripe: !1,
		ownSubscribe: !0,
		slots: [
			Q("accent"),
			Q("soft"),
			Q("tile"),
			Q("line"),
			Q("hero", "hero"),
			Q("heroText", "hero")
		],
		texts: [
			"nextShort",
			"thisMonth",
			...Vf
		]
	},
	{
		id: "weekStrip",
		labelKey: "calendar.design.weekStrip",
		view: "week",
		module: "time",
		stripe: !1,
		slots: [
			Q("accent"),
			Q("surface"),
			Q("line"),
			Q("todayBg"),
			Q("pill"),
			Q("pillText")
		],
		texts: Vf
	},
	{
		id: "weekPlan",
		labelKey: "calendar.design.weekPlan",
		view: "week",
		module: "time",
		stripe: !1,
		slots: [
			Q("accent"),
			Q("surface"),
			Q("line"),
			Q("todayBg"),
			Q("event")
		],
		texts: ["todayBtn", ...Vf]
	},
	{
		id: "layers",
		labelKey: "calendar.design.layers",
		view: "week",
		module: "time",
		stripe: !1,
		ownFilter: !0,
		slots: [
			Q("accent"),
			Q("surface"),
			Q("line"),
			Q("todayBg")
		],
		texts: [
			"subscribe",
			"subscribeMulti",
			"addGoogle",
			"signup"
		]
	},
	{
		id: "sidepanel",
		labelKey: "calendar.design.sidepanel",
		view: "month",
		module: "time",
		stripe: !1,
		slots: [
			Q("accent"),
			Q("surface"),
			Q("panel"),
			Q("line"),
			Q("todayBg"),
			Q("selected"),
			Q("chip")
		],
		texts: Vf
	},
	{
		id: "apMonth",
		labelKey: "calendar.design.apMonth",
		empty: "ap",
		view: "month",
		module: "time",
		stripe: !1,
		slots: [
			Q("card"),
			Q("text"),
			Q("gold"),
			Q("goldDark"),
			Q("grid"),
			Q("pill")
		],
		texts: [...zf, ...Vf]
	},
	{
		id: "dayPlan",
		labelKey: "calendar.design.dayPlan",
		view: "day",
		module: "time",
		stripe: !1,
		slots: [
			Q("accent"),
			Q("surface"),
			Q("line"),
			Q("past"),
			Q("event")
		],
		texts: ["todayBtn", ...Vf]
	},
	{
		id: "yearWheel",
		labelKey: "calendar.design.yearWheel",
		view: "year",
		module: "time",
		stripe: !1,
		slots: [
			Q("accent"),
			Q("surface"),
			Q("line"),
			Q("ring", "wheel"),
			Q("past", "wheel"),
			Q("dot", "wheel"),
			Q("dotOff", "wheel")
		],
		texts: [
			"wheel",
			"pickMonth",
			...Vf
		]
	},
	{
		id: "heatmap",
		labelKey: "calendar.design.heatmap",
		view: "year",
		module: "time",
		stripe: !1,
		slots: [
			Q("surface"),
			Q("panel"),
			Q("line"),
			Q("cell0", "scale"),
			Q("cell1", "scale"),
			Q("cell2", "scale"),
			Q("cell3", "scale"),
			Q("today", "scale")
		],
		texts: [
			"wholeYear",
			"fewer",
			"more",
			"pickDay",
			...Vf
		]
	},
	{
		id: "billboard",
		labelKey: "calendar.design.billboard",
		view: "next",
		module: "next",
		stripe: !1,
		ownSubscribe: !0,
		program: !0,
		slots: [
			Q("bg"),
			Q("text"),
			Q("label"),
			Q("pulse"),
			Q("tile", "countdown"),
			Q("tileText", "countdown"),
			Q("button", "buttons"),
			Q("buttonText", "buttons")
		],
		texts: [
			"now",
			"then",
			"unitDays",
			"unitHours",
			"unitMin",
			"wholeProgram",
			...Vf
		]
	},
	{
		id: "stacked",
		labelKey: "calendar.design.stacked",
		view: "next",
		module: "next",
		stripe: !1,
		slots: [
			Q("accent"),
			Q("surface"),
			Q("line"),
			Q("card", "cards"),
			Q("cardText", "cards"),
			Q("cardMid", "cards"),
			Q("cardBack", "cards"),
			Q("badge", "cards"),
			Q("badgeText", "cards")
		],
		texts: [
			"now",
			"browse",
			...Vf
		]
	},
	{
		id: "noticeboard",
		labelKey: "calendar.design.noticeboard",
		view: "next",
		module: "next",
		stripe: !1,
		notice: !0,
		slots: [
			Q("board"),
			Q("boardText"),
			Q("note", "notes"),
			Q("noteText", "notes"),
			Q("noteLabel", "notes"),
			Q("noteAlt", "notes"),
			Q("noteAltText", "notes"),
			Q("pin", "notes"),
			Q("pinAlt", "notes"),
			Q("button", "buttons"),
			Q("buttonText", "buttons"),
			Q("strip", "later"),
			Q("stripText", "later")
		],
		texts: [
			"now",
			"next",
			"later",
			...Bf,
			...Vf
		]
	},
	{
		id: "split",
		labelKey: "calendar.design.split",
		view: "next",
		module: "next",
		stripe: !1,
		slots: [
			Q("accent"),
			Q("surface"),
			Q("line"),
			Q("chip"),
			Q("panel", "panel"),
			Q("panelText", "panel"),
			Q("button", "buttons"),
			Q("buttonText", "buttons"),
			Q("laterBg", "later")
		],
		texts: [
			"now",
			"later",
			...Vf
		]
	},
	{
		id: "band",
		labelKey: "calendar.design.band",
		view: "next",
		module: "next",
		stripe: !1,
		slots: [
			Q("band", "band"),
			Q("bandText", "band"),
			Q("dot", "band"),
			Q("tag", "band"),
			Q("tagText", "band")
		],
		texts: ["now", ...Vf]
	},
	{
		id: "oneLine",
		labelKey: "calendar.design.oneLine",
		view: "next",
		module: "next",
		stripe: !0,
		slots: [
			Q("accent"),
			Q("surface"),
			Q("line"),
			Q("ring"),
			Q("button", "buttons"),
			Q("buttonText", "buttons")
		],
		texts: [
			"now",
			"later",
			...Vf
		]
	},
	{
		id: "ring",
		labelKey: "calendar.design.ring",
		view: "next",
		module: "next",
		stripe: !1,
		slots: [
			Q("surface"),
			Q("line"),
			Q("chip"),
			Q("accent", "ring"),
			Q("track", "ring")
		],
		texts: [
			"now",
			"unitDays",
			"unitHours",
			...Vf
		]
	},
	{
		id: "darkGlass",
		labelKey: "calendar.design.darkGlass",
		view: "next",
		module: "next",
		stripe: !1,
		ownSubscribe: !0,
		slots: [
			Q("ground"),
			Q("text"),
			Q("label"),
			Q("edge", "glass"),
			Q("glass", "glass"),
			Q("track", "glass"),
			Q("blobA", "blobs"),
			Q("blobB", "blobs"),
			Q("button", "buttons"),
			Q("buttonText", "buttons")
		],
		texts: [
			"now",
			"then",
			"untilStart",
			...Vf
		]
	},
	{
		id: "nextBento",
		labelKey: "calendar.design.nextBento",
		view: "next",
		module: "next",
		stripe: !1,
		ownSubscribe: !0,
		program: !0,
		slots: [
			Q("accent"),
			Q("accentText"),
			Q("soft"),
			Q("tile"),
			Q("line")
		],
		texts: [
			"now",
			"wholeProgram",
			...Vf
		]
	},
	{
		id: "apNow",
		labelKey: "calendar.design.apNow",
		view: "next",
		module: "more",
		stripe: !1,
		notice: !0,
		noticeBand: !0,
		empty: "ap",
		slots: [
			Q("head"),
			Q("card"),
			Q("panel"),
			Q("text"),
			Q("gold"),
			Q("goldDark"),
			Q("alert", "alert"),
			Q("alertText", "alert")
		],
		texts: [
			"now",
			"next",
			"later",
			...Bf,
			...zf,
			...Vf
		]
	},
	{
		id: "apNavy",
		labelKey: "calendar.design.apNavy",
		view: "next",
		module: "more",
		stripe: !1,
		empty: "ap",
		slots: [
			Q("ground"),
			Q("text"),
			Q("tile"),
			Q("line"),
			Q("gold"),
			Q("goldDark"),
			Q("card", "first"),
			Q("cardText", "first")
		],
		texts: [
			"now",
			"later",
			"moreInfo",
			...zf,
			...Vf
		]
	},
	{
		id: "apSeries",
		labelKey: "calendar.design.apSeries",
		view: "list",
		module: "more",
		stripe: !1,
		notice: !0,
		empty: "ap",
		slots: [
			Q("card"),
			Q("row"),
			Q("text"),
			Q("title"),
			Q("gold"),
			Q("goldDark"),
			Q("line")
		],
		texts: [
			"series",
			"when",
			"where",
			"forWhom",
			"openAll",
			"allDates",
			...Bf,
			...zf,
			...Vf
		]
	},
	{
		id: "mobileAgenda",
		labelKey: "calendar.design.mobileAgenda",
		view: "agenda",
		module: "more",
		stripe: !0,
		ownFilter: !0,
		slots: [
			Q("ground"),
			Q("text"),
			Q("card"),
			Q("edge"),
			Q("accent"),
			Q("chip")
		],
		texts: ["todayBtn", ...Vf]
	}
];
function Uf(e) {
	return Hf.find((t) => t.id === e) ?? Hf[0];
}
function Wf(e) {
	return Uf(e?.design).view || (Lf.includes(e?.view) ? e.view : "list");
}
var Gf = [
	"list",
	"cards",
	"agenda",
	"next"
];
function Kf() {
	let e = [{
		view: null,
		designs: Hf.filter((e) => e.view === null)
	}];
	for (let t of Lf) {
		let n = Hf.filter((e) => e.view === t);
		n.length && e.push({
			view: t,
			designs: n
		});
	}
	return e;
}
var qf = /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, Jf = /^[a-z][a-z0-9-]*$/;
function Yf(e) {
	return typeof e == "string" ? qf.test(e) ? e : Jf.test(e) ? `var(--urd-color-${e})` : null : null;
}
function Xf(e, t) {
	let n = typeof t?.show == "boolean" ? t.show : e.stripe;
	return {
		show: n,
		color: n ? Yf(t?.color) : null
	};
}
var Zf = {
	min: 8,
	max: 120
};
function Qf(e, t) {
	let n = e?.[t];
	return typeof n == "string" && n.trim() ? n : null;
}
function $f(e, t) {
	return e.texts.some((e) => Qf(t, e) !== null);
}
//#endregion
//#region ../template/assets/engine/0.7.4/calendar-thumb.js
var ep = "#0e1512", tp = "#2fd6b6", np = "#5c6b64", rp = "#22302a", ip = "#e8efe9", ap = "#16221d", op = "#1c2340", sp = "#f3ecd8", cp = "#d0a74a", lp = (e) => e < 1 ? ` opacity="${e}"` : "", $ = (e, t, n, r, i, a = 1, o = 2) => `<rect x="${e}" y="${t}" width="${n}" height="${r}" rx="${o}" fill="${i}"${lp(a)}/>`, up = (e, t, n, r, i = 1) => `<circle cx="${e}" cy="${t}" r="${n}" fill="${r}"${lp(i)}/>`, dp = (e, t, n, r, i, a = 1, o = 1) => `<line x1="${e}" y1="${t}" x2="${n}" y2="${r}" stroke="${i}" stroke-width="${a}"${lp(o)}/>`, fp = (e, t, n, r) => Array.from({ length: e }, (e, i) => r(t + i * n, i)).join(""), pp = (e, t = ep) => `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${t}"/>${e}</svg>`;
function mp(e, t, n, r, i, a = np) {
	let o = "", s = n / 7, c = r / 4;
	for (let n = 0; n < 28; n++) {
		let r = e + n % 7 * s + s / 2, l = t + Math.floor(n / 7) * c + c / 2;
		o += up(r, l, 1.6, i.includes(n) ? tp : a, i.includes(n) ? 1 : .55);
	}
	return o;
}
var hp = {
	plain: () => fp(3, 12, 20, (e) => $(14, e, 14, 14, rp, 1, 3) + $(34, e + 2, 70, 4, np, .9) + $(34, e + 9, 46, 3, np, .5)),
	timeline: () => dp(50, 10, 50, 70, np, 1.2, .7) + fp(3, 16, 22, (e, t) => $(18, e - 3, 24, 5, np, .9) + up(50, e, 3.4, t ? np : tp) + $(60, e - 3, 62, 4, np, .9) + $(60, e + 4, 40, 3, np, .5)),
	table: () => $(12, 10, 136, 10, tp, 1, 3) + fp(4, 26, 12, (e, t) => (t % 2 ? $(12, e - 3, 136, 12, rp, .8, 0) : "") + $(16, e, 20, 3, np, .9) + $(44, e, 14, 3, np, .5) + $(66, e, 44, 3, np, .9) + $(118, e, 24, 3, np, .5)),
	booklet: () => $(12, 8, 136, 64, ip, 1, 2) + $(20, 14, 40, 7, ap) + dp(20, 26, 140, 26, ap, 1.4) + [20, 84].map((e) => fp(3, 32, 12, (t) => $(e, t, 8, 8, tp, 1, 1) + $(e + 12, t, 36, 3, ap, .85) + $(e + 12, t + 5, 26, 2.5, ap, .4))).join(""),
	numbered: () => fp(3, 12, 20, (e) => dp(14, e - 3, 146, e - 3, np, .8, .6) + $(14, e, 14, 12, tp, 1, 2) + $(36, e + 1, 64, 4, np, .9) + $(36, e + 8, 44, 3, np, .5) + $(120, e + 3, 24, 4, tp, .7)),
	apList: () => fp(3, 10, 21, (e) => $(12, e, 136, 17, op, 1, 2) + $(18, e + 4, 10, 9, cp, 1, 1) + dp(34, e + 3, 34, e + 14, cp, .8, .5) + $(40, e + 4, 26, 3, cp, .8) + $(40, e + 10, 56, 3.5, sp, .9)),
	glass: () => up(30, 14, 34, "#ff8a65", .55) + up(132, 70, 36, "#7fd1c4", .55) + up(100, 10, 20, "#ffd36b", .4) + fp(3, 12, 20, (e) => $(14, e, 132, 15, "#ffffff", .32, 6) + $(20, e + 4, 9, 7, ip, .9, 1) + $(36, e + 4, 50, 3, ip, .9) + $(36, e + 9, 34, 2.5, ip, .5)),
	posters: () => $(12, 10, 62, 60, tp, 1, 4) + $(20, 30, 18, 20, ap, .9, 2) + $(20, 56, 40, 4, ap, .8) + $(80, 10, 32, 28, ip, 1, 4) + $(86, 16, 10, 10, ap, .8, 1) + $(116, 10, 32, 28, "#bfe9df", 1, 4) + $(122, 16, 10, 10, ap, .8, 1) + $(80, 42, 32, 28, rp, 1, 4) + $(86, 48, 10, 10, tp, 1, 1) + $(116, 42, 32, 28, rp, .5, 4),
	tickets: () => fp(3, 10, 21, (e) => $(12, e, 136, 17, rp, 1, 4) + $(12, e, 30, 17, tp, 1, 4) + $(20, e + 4, 12, 9, ap, .85, 1) + dp(42, e + 1, 42, e + 16, ep, 1.6) + $(50, e + 4, 50, 3.5, np, .95) + $(50, e + 10, 34, 2.5, np, .55) + $(120, e + 5, 22, 7, tp, .85)),
	carousel: () => [
		12,
		50,
		88,
		126
	].map((e, t) => $(e, 14, 34, 54, t ? rp : tp, 1, 4) + $(e + 6, 22, 12, 14, t ? tp : ap, .9, 1) + $(e + 6, 50, 22, 3, t ? np : ap, .9) + $(e + 6, 56, 14, 2.5, t ? np : ap, .5)).join(""),
	photo: () => [
		12,
		60,
		108
	].map((e) => $(e, 12, 40, 56, rp, 1, 4) + $(e, 12, 40, 26, tp, .45, 4) + $(e + 4, 16, 12, 6, ip, .95, 1) + $(e + 5, 44, 28, 3.5, np, .95) + $(e + 5, 51, 20, 2.5, np, .5) + $(e + 5, 58, 14, 5, tp, .9)).join(""),
	apGrid: () => [
		12,
		60,
		108
	].map((e) => $(e, 12, 40, 56, sp, 1, 2) + $(e, 12, 40, 16, op, 1, 2) + dp(e, 28, e + 40, 28, cp, 1.4) + $(e + 4, 16, 8, 8, cp, 1, 1) + $(e + 22, 18, 14, 4, cp, .9) + $(e + 5, 36, 28, 4, op, .9) + $(e + 5, 44, 18, 2.5, op, .55) + $(e + 5, 52, 24, 2.5, op, .4)).join(""),
	bento: () => $(12, 10, 66, 40, ip, 1, 6) + $(18, 14, 16, 5, tp, 1, 2) + $(18, 28, 14, 14, ap, .9, 1) + $(36, 38, 34, 4, ap, .8) + $(82, 10, 31, 18, rp, 1, 5) + $(117, 10, 31, 18, rp, 1, 5) + $(82, 32, 66, 18, rp, 1, 5) + mp(86, 34, 58, 14, [
		9,
		12,
		19
	]) + $(12, 54, 31, 18, ip, 1, 5) + $(47, 54, 31, 18, tp, .4, 5) + $(82, 54, 66, 18, rp, 1, 5) + $(88, 60, 30, 4, np, .9),
	weekStrip: () => $(60, 8, 40, 5, np, .9) + Array.from({ length: 7 }, (e, t) => $(12 + t * 19.6, 20, 17, 50, t === 3 ? tp : rp, t === 3 ? .25 : 1, 3) + $(15 + t * 19.6, 24, 6, 5, np, .9, 1) + ([
		1,
		3,
		5
	].includes(t) ? $(14 + t * 19.6, 36, 13, 7, tp, 1, 2) : "")).join(""),
	weekPlan: () => $(12, 8, 136, 64, rp, .6, 3) + fp(4, 22, 12, (e) => dp(12, e, 148, e, np, .6, .6)) + Array.from({ length: 7 }, (e, t) => dp(30 + t * 17, 14, 30 + t * 17, 72, np, .6, .6)).join("") + $(82, 14, 16, 58, tp, .14, 0) + $(49, 36, 13, 10, tp, .9, 2) + $(83, 48, 13, 14, tp, .9, 2) + $(117, 24, 13, 9, ip, .7, 2),
	layers: () => $(12, 8, 136, 64, rp, .6, 3) + $(70, 12, 22, 6, tp, .9, 3) + $(96, 12, 22, 6, ip, .7, 3) + $(122, 12, 22, 6, np, .6, 3) + fp(3, 26, 15, (e, t) => dp(12, e - 2, 148, e - 2, np, .6, .6) + $(16, e + 3, 16, 3, np, .9) + $([
		44,
		62,
		100
	][t], e + 1, [
		46,
		22,
		40
	][t], 8, [
		tp,
		ip,
		"#7fd1c4"
	][t], .9, 3)),
	sidepanel: () => $(12, 8, 136, 64, rp, .6, 3) + mp(18, 18, 76, 48, [
		5,
		10,
		17,
		24
	]) + $(100, 8, 48, 64, rp, 1, 3) + $(106, 14, 26, 5, ip, .9) + fp(2, 26, 16, (e) => $(106, e, 36, 12, ep, 1, 2) + dp(106, e, 106, e + 12, tp, 2) + $(111, e + 3, 24, 3, np, .9)),
	apMonth: () => $(12, 8, 136, 64, sp, 1, 2) + dp(12, 8, 148, 8, cp, 2.4) + $(58, 13, 44, 5, op, .9) + fp(4, 26, 12, (e) => dp(12, e, 148, e, cp, .6, .5)) + Array.from({ length: 6 }, (e, t) => dp(31.4 + t * 19.4, 26, 31.4 + t * 19.4, 72, cp, .6, .5)).join("") + $(54, 40, 14, 5, cp, .6, 0) + dp(54, 40, 54, 45, cp, 2) + $(112, 52, 14, 5, cp, .6, 0) + dp(112, 52, 112, 57, cp, 2) + up(98, 32, 3.4, cp),
	dayPlan: () => $(34, 6, 92, 68, rp, .6, 5) + $(42, 12, 40, 5, ip, .9) + Array.from({ length: 7 }, (e, t) => $(42 + t * 11, 22, 8, 9, t === 2 ? tp : rp, 1, 2)).join("") + fp(4, 38, 9, (e) => dp(34, e, 126, e, np, .6, .6)) + $(56, 39, 62, 7, ip, .5, 2) + $(56, 57, 62, 7, tp, .5, 2) + dp(48, 51, 126, 51, tp, 1.4) + up(48, 51, 2.2, tp),
	yearWheel: () => `<circle cx="46" cy="40" r="24" fill="none" stroke="${rp}" stroke-width="9"/><circle cx="46" cy="40" r="24" fill="none" stroke="${np}" stroke-width="9" stroke-dasharray="100 151" transform="rotate(-90 46 40)"${lp(.8)}/><circle cx="46" cy="40" r="24" fill="none" stroke="${tp}" stroke-width="9" stroke-dasharray="13 151" stroke-dashoffset="-100" transform="rotate(-90 46 40)"/>` + up(24, 32, 2, ip) + up(26, 50, 2, ip) + up(60, 60, 2, ip, .5) + $(38, 37, 16, 6, ip, .9) + $(88, 20, 20, 4, tp) + fp(3, 30, 13, (e) => $(88, e, 56, 9, rp, 1, 2) + $(92, e + 3, 34, 3, np, .9)),
	heatmap: () => $(12, 8, 136, 64, rp, .6, 3) + Array.from({ length: 3 }, (e, t) => Array.from({ length: 28 }, (e, n) => $(18 + t * 44 + n % 7 * 5.4, 16 + Math.floor(n / 7) * 5.4, 4.2, 4.2, [
		3,
		11,
		16,
		24
	].includes((n + t * 5) % 28) ? tp : np, [
		3,
		11,
		16,
		24
	].includes((n + t * 5) % 28) ? 1 : (n * 7 + t) % 5 == 0 ? .6 : .28, 1)).join("")).join("") + $(18, 46, 124, 9, ep, .8, 2) + $(22, 49, 30, 3, ip, .8),
	billboard: () => $(34, 6, 92, 68, ap, 1, 6) + up(42, 14, 2, tp) + $(48, 12, 24, 4, tp, .9) + $(42, 22, 60, 7, ip, .95) + [
		42,
		70,
		98
	].map((e) => $(e, 36, 22, 16, rp, 1, 3) + $(e + 6, 40, 10, 7, ip, .9, 1)).join("") + $(42, 58, 78, 9, tp, 1, 3),
	stacked: () => $(54, 10, 70, 44, rp, .7, 5) + $(46, 16, 70, 44, rp, 1, 5) + $(38, 22, 70, 44, ip, 1, 5) + $(44, 28, 22, 6, tp, 1, 3) + $(44, 40, 44, 5, ap, .9) + $(44, 49, 30, 3, ap, .5) + $(44, 56, 20, 6, tp, 1, 2),
	noticeboard: () => $(34, 6, 92, 68, "#8a5a3c", 1, 5) + $(42, 14, 64, 28, "#fff7cc", 1, 0) + up(74, 14, 3, "#d33a2c") + $(48, 22, 40, 5, ap, .9) + $(48, 31, 28, 3, ap, .5) + $(48, 46, 58, 20, "#d9ecff", 1, 0) + up(54, 46, 2.6, "#2f6fd6") + $(54, 53, 36, 4, ap, .85) + $(54, 60, 44, 2.5, ap, .45),
	split: () => $(16, 10, 128, 60, rp, 1, 6) + $(16, 10, 44, 42, tp, 1, 6) + $(24, 22, 20, 22, ap, .9, 2) + $(68, 16, 20, 5, np, .7, 2) + $(68, 26, 58, 6, ip, .95) + $(68, 36, 40, 3, np, .7) + dp(16, 52, 144, 52, np, .6, .6) + $(24, 58, 60, 3, np, .8) + $(24, 64, 44, 2.5, np, .5),
	band: () => $(8, 30, 144, 20, tp, 1, 0) + $(8, 30, 40, 20, ap, 1, 0) + up(16, 40, 2, tp) + $(22, 38, 20, 4, ip, .9) + $(56, 38, 34, 4, ap, .85) + up(96, 40, 1.8, ap) + $(102, 38, 34, 4, ap, .85) + up(142, 40, 1.8, ap),
	oneLine: () => fp(3, 12, 20, (e, t) => $(12, e, 136, 15, rp, t ? .7 : 1, 4) + dp(12, e + 1, 12, e + 14, t ? np : tp, 3) + up(22, e + 7.5, 2.4, t ? np : tp) + $(30, e + 5.5, 20, 4, t ? np : tp, .9) + $(56, e + 5.5, 54, 4, np, .9) + (t ? "" : $(124, e + 4, 18, 7, tp, 1, 2))),
	ring: () => $(30, 6, 100, 68, rp, 1, 8) + `<circle cx="58" cy="34" r="15" fill="none" stroke="${np}" stroke-width="5"${lp(.5)}/><circle cx="58" cy="34" r="15" fill="none" stroke="${tp}" stroke-width="5" stroke-linecap="round" stroke-dasharray="70 94" transform="rotate(-90 58 34)"/>` + $(53, 31, 10, 6, ip, .9, 1) + $(82, 24, 38, 6, ip, .95) + $(82, 35, 28, 3, np, .8) + dp(38, 56, 122, 56, np, .6, .6) + $(38, 61, 50, 3, np, .7) + $(38, 67, 40, 3, np, .5),
	darkGlass: () => $(34, 6, 92, 68, "#121216", 1, 7) + up(112, 16, 22, tp, .45) + up(46, 68, 20, "#3fb8a4", .35) + up(42, 14, 2, tp) + $(48, 12, 22, 4, tp, .9) + $(42, 22, 56, 6, ip, .95) + $(42, 34, 76, 3, np, .6, 1.5) + $(42, 34, 60, 3, tp, 1, 1.5) + $(42, 42, 36, 9, ip, 1, 3) + $(82, 42, 36, 9, ip, .18, 3) + $(42, 56, 76, 14, ip, .1, 3) + $(47, 61, 40, 3, ip, .7),
	nextBento: () => $(40, 8, 80, 26, tp, 1, 6) + $(46, 13, 22, 4, ap, .8) + $(46, 23, 44, 5, ap, .9) + $(40, 38, 38, 16, rp, 1, 5) + $(82, 38, 38, 16, rp, 1, 5) + $(40, 58, 38, 16, ip, 1, 5) + $(82, 58, 38, 16, tp, .4, 5) + $(46, 42, 8, 7, ip, .9, 1) + $(88, 42, 8, 7, ip, .9, 1) + $(46, 62, 8, 7, ap, .9, 1),
	apNow: () => $(40, 6, 80, 68, sp, 1, 5) + $(40, 6, 80, 12, op, 1, 5) + up(47, 12, 1.8, cp) + $(52, 10, 22, 4, cp, .9) + $(46, 24, 14, 14, op, 1, 2) + $(50, 28, 6, 6, cp, 1, 1) + $(66, 25, 44, 5, op, .9) + $(66, 34, 32, 3, op, .5) + $(40, 46, 80, 28, "#eae1c7", 1, 0) + dp(48, 54, 48, 66, cp, 1) + up(48, 54, 1.8, cp) + up(48, 66, 1.8, cp) + $(54, 52, 40, 3.5, op, .8) + $(54, 64, 34, 3.5, op, .8),
	apNavy: () => $(40, 6, 80, 68, op, 1, 5) + up(47, 13, 1.8, cp) + $(52, 11, 22, 4, cp, .9) + $(46, 20, 68, 22, sp, 1, 3) + $(51, 25, 8, 10, cp, 1, 1) + $(64, 25, 40, 5, op, .9) + $(64, 34, 26, 3, op, .5) + `<rect x="46" y="46" width="68" height="14" rx="3" fill="#262e4f" stroke="${cp}" stroke-width="0.8"/>` + $(51, 50, 7, 6, cp, 1, 1) + $(64, 51, 36, 4, sp, .85) + $(46, 66, 50, 3, sp, .6),
	apSeries: () => $(12, 8, 136, 64, "#f5efdd", 1, 2) + dp(20, 17, 34, 17, cp, 1) + $(38, 15, 26, 3.5, cp, .9) + $(20, 24, 58, 8, "#7a1a1a") + $(20, 38, 64, 3, op, .6) + $(20, 44, 52, 3, op, .6) + [
		20,
		46,
		72
	].map((e) => $(e, 54, 12, 2.5, cp, .9) + $(e, 60, 20, 3.5, op, .8)).join("") + dp(100, 14, 100, 66, cp, .8, .6) + $(108, 18, 30, 8, "#7a1a1a", .85) + $(108, 32, 32, 2.5, op, .5) + $(108, 38, 26, 2.5, op, .5),
	mobileAgenda: () => $(50, 4, 60, 72, "#121216", 1, 8) + $(56, 10, 22, 4, ip, .9) + Array.from({ length: 7 }, (e, t) => $(56 + t * 7.1, 18, 5.6, 9, t === 2 ? tp : rp, 1, 2)).join("") + fp(3, 32, 14, (e) => $(56, e, 48, 11, "#1c1c22", 1, 3) + dp(67, e + 2, 67, e + 9, tp, 1.4) + $(58, e + 4, 6, 3, np, .8) + $(70, e + 3, 26, 3, ip, .85))
};
Object.keys(hp);
function gp(e) {
	let t = hp[e] ?? hp.plain, n = ["booklet"].includes(e);
	return pp(t(), n ? "#1a2620" : ep);
}
//#endregion
//#region src/App.svelte
var _p = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), vp = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!>", 1), yp = /* @__PURE__ */ V("<p> </p>"), bp = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"text\" placeholder=\"https://drive.google.com/drive/folders/...\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"60\" class=\"svelte-1n46o8q\"/></label> <button type=\"button\" class=\"ghost action svelte-1n46o8q\"><!> </button> <!>", 1), xp = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), Sp = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"6\" max=\"60\" step=\"1\" class=\"svelte-1n46o8q\"/>", 1), Cp = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), wp = /* @__PURE__ */ V("<button class=\"ghost row-tool svelte-1n46o8q\"></button>"), Tp = /* @__PURE__ */ V("<span><span class=\"grad-grip svelte-1n46o8q\"><svg viewBox=\"0 0 16 16\" width=\"14\" height=\"14\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"13\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"13\" r=\"1.4\"></circle></svg></span> <!> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span> <!></span>"), Ep = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Dp = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/>", 1), Op = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), kp = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Ap = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), jp = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"180\" step=\"5\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Mp = /* @__PURE__ */ V("<div class=\"sizefill svelte-1n46o8q\"><button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button> <button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button></div> <label class=\"svelte-1n46o8q\"> </label> <div class=\"focalpad svelte-1n46o8q\"><span class=\"focaldot svelte-1n46o8q\"></span></div> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Np = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Pp = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> </label> <div class=\"sizestep svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"10\" max=\"400\" class=\"svelte-1n46o8q\"/> <span class=\"sizeunit svelte-1n46o8q\">%</span> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></div> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Fp = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.5\" max=\"90\" step=\"0.5\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/>", 1), Ip = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Lp = /* @__PURE__ */ V("<button type=\"button\" class=\"ghost action svelte-1n46o8q\"><!> </button>"), Rp = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" max=\"20\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), zp = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"15\" step=\"1\" class=\"svelte-1n46o8q\"/>", 1), Bp = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label>"), Vp = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"48\" step=\"1\" class=\"svelte-1n46o8q\"/>", 1), Hp = /* @__PURE__ */ V("<!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"60\" max=\"400\" step=\"2\" class=\"svelte-1n46o8q\"/> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!>", 1), Up = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.5\" max=\"90\" step=\"0.5\" class=\"svelte-1n46o8q\"/>", 1), Wp = /* @__PURE__ */ V("<label><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>"), Gp = /* @__PURE__ */ V("<!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Kp = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), qp = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"video/mp4,video/webm\" class=\"svelte-1n46o8q\"/></label> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Jp = /* @__PURE__ */ V("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!></div>"), Yp = /* @__PURE__ */ V("<!> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), Xp = /* @__PURE__ */ V("<input class=\"nav-target svelte-1n46o8q\"/>"), Zp = /* @__PURE__ */ V("<div class=\"nav-row nav-sub-row\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target\"><!></span> <!></div>"), Qp = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"num-stepper svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"1\" max=\"12\" step=\"1\" class=\"svelte-1n46o8q\"/> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></span></label>", 1), $p = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), em = /* @__PURE__ */ V("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), tm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>"), nm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), rm = /* @__PURE__ */ V("<input class=\"svelte-1n46o8q\"/>"), im = /* @__PURE__ */ V("<span class=\"nav-line svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), am = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), om = /* @__PURE__ */ V("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input class=\"tb-grow svelte-1n46o8q\" spellcheck=\"false\"/> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"toolbar-row svelte-1n46o8q\"><input class=\"tb-grow svelte-1n46o8q\"/> <!></span></div>"), sm = /* @__PURE__ */ V("<button type=\"button\" class=\"linkish cal-source svelte-1n46o8q\"> </button>"), cm = /* @__PURE__ */ V("<span class=\"gridmenu-value svelte-1n46o8q\"> </span>"), lm = /* @__PURE__ */ V("<!> <!>", 1), um = /* @__PURE__ */ V("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>"), dm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"50\" class=\"svelte-1n46o8q\"/></label> <!>", 1), fm = /* @__PURE__ */ V("<!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0\" max=\"10\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>", 1), pm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input placeholder=\"/program\" spellcheck=\"false\" class=\"svelte-1n46o8q\"/></label>"), mm = /* @__PURE__ */ V("<!> <label class=\"svelte-1n46o8q\"> <input placeholder=\"https://\" spellcheck=\"false\" class=\"svelte-1n46o8q\"/></label>", 1), hm = /* @__PURE__ */ V("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), gm = /* @__PURE__ */ V("<button type=\"button\" class=\"ghost action svelte-1n46o8q\"> </button>"), _m = /* @__PURE__ */ V("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button type=\"button\" class=\"ghost action svelte-1n46o8q\"><!> </button> <button type=\"button\" class=\"ghost action svelte-1n46o8q\"><!> </button> <!> <!> <!> <!> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <!> <!> <!>", 1), vm = /* @__PURE__ */ V("<span class=\"nav-line svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span>"), ym = /* @__PURE__ */ V("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), bm = /* @__PURE__ */ V("<span class=\"nav-line svelte-1n46o8q\"><input class=\"tl-year svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <input class=\"svelte-1n46o8q\"/>", 1), xm = /* @__PURE__ */ V("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), Sm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Cm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), wm = /* @__PURE__ */ V("<button type=\"button\"></button>"), Tm = /* @__PURE__ */ V("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input class=\"field-filled svelte-1n46o8q\"/></label>"), Em = /* @__PURE__ */ V("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-6 svelte-1n46o8q\" role=\"group\"></div></div> <!>", 1), Dm = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></span> <span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Om = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"datetime-local\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), km = /* @__PURE__ */ V("<button class=\"ghost svelte-1n46o8q\"> </button>"), Am = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"audio/*\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), jm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), Mm = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), Nm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> </label> <input class=\"svelte-1n46o8q\"/>", 1), Pm = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"video/mp4,video/webm\" class=\"svelte-1n46o8q\"/></label> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Fm = /* @__PURE__ */ V("<!> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Im = /* @__PURE__ */ V("<input class=\"token-input svelte-1n46o8q\" maxlength=\"4\"/>"), Lm = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\"> </button></span>"), Rm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"toolbar-row svelte-1n46o8q\"><!> <!></span></label> <!>", 1), zm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Bm = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost action svelte-1n46o8q\"> </button></span>"), Vm = /* @__PURE__ */ V("<button class=\"ghost action svelte-1n46o8q\"> </button>"), Hm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Um = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Wm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"email\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"url\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Gm = /* @__PURE__ */ V("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label></div>"), Km = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), qm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" class=\"svelte-1n46o8q\"/></label>"), Jm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label>"), Ym = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Xm = /* @__PURE__ */ V("<span class=\"mini-label svelte-1n46o8q\"> </span>"), Zm = /* @__PURE__ */ V("<button type=\"button\"><span class=\"footer-tp-thumb svelte-1n46o8q\"></span> <span class=\"footer-tp-name svelte-1n46o8q\"> </span></button>"), Qm = /* @__PURE__ */ V("<!> <div class=\"footer-tpick svelte-1n46o8q\"></div>", 1), $m = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <!></div>"), eh = /* @__PURE__ */ V("<details class=\"group cal-designs svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" class=\"svelte-1n46o8q\"/></label> <!> <span class=\"toolbar-row svelte-1n46o8q\"><button type=\"button\"><i> </i></button> <button type=\"button\"><u> </u></button> <!></span> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), th = /* @__PURE__ */ V("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), nh = /* @__PURE__ */ V("<!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), rh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), ih = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!>", 1), ah = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), oh = /* @__PURE__ */ V("<!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), sh = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0.5\" max=\"10\" step=\"0.5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), ch = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"10\" max=\"300\" step=\"5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), lh = /* @__PURE__ */ V("<button class=\"ghost action svelte-1n46o8q\"> </button> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), uh = /* @__PURE__ */ V("<!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"2\" max=\"40\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>", 1), dh = /* @__PURE__ */ V("<div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div>"), fh = /* @__PURE__ */ V("<div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!> <!></div> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <!> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <!> <!></div> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!> <!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"-10\" max=\"10\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div></div> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"8\" max=\"120\" step=\"2\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div></div> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"swatch-row svelte-1n46o8q\"><!> <div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div></div></div> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), ph = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), mh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"24\" max=\"64\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), hh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), gh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), _h = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), vh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), yh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), bh = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" step=\"10\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <button type=\"button\" class=\"ghost action svelte-1n46o8q\"><!> </button>", 1), xh = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Sh = /* @__PURE__ */ V("<!> <!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"10\" max=\"300\" step=\"5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"80\" max=\"400\" step=\"10\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Ch = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"60\" class=\"svelte-1n46o8q\"/></label>"), wh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Th = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label>"), Eh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Dh = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" min=\"1\" max=\"100\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), Oh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label>", 1), kh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"400\" class=\"svelte-1n46o8q\"/></label>"), Ah = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!>", 1), jh = /* @__PURE__ */ V("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Mh = /* @__PURE__ */ V("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), Nh = /* @__PURE__ */ V("<!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details>", 1), Ph = /* @__PURE__ */ V("<div class=\"props-tabs svelte-1n46o8q\"><span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div> <!>", 1), Fh = /* @__PURE__ */ V("<button class=\"chrome-restore svelte-1n46o8q\"><!> </button>"), Ih = /* @__PURE__ */ V("<button><!> </button>"), Lh = /* @__PURE__ */ V("<div class=\"tool-pop svelte-1n46o8q\"></div>"), Rh = /* @__PURE__ */ V("<span class=\"toolmenu svelte-1n46o8q\"><button><!><!></button> <!></span>"), zh = /* @__PURE__ */ V("<button></button>"), Bh = /* @__PURE__ */ V("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"viewswitch toolgrp svelte-1n46o8q\"></span>", 1), Vh = /* @__PURE__ */ V("<div class=\"tool-pop svelte-1n46o8q\"><div class=\"tool-pop-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button></div> <button><!> </button></div>"), Hh = /* @__PURE__ */ V("<span class=\"toolmenu svelte-1n46o8q\"><button><span class=\"zoom-cap svelte-1n46o8q\"> </span><!></button> <!></span>"), Uh = /* @__PURE__ */ V("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"zoomswitch toolgrp svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button> <button></button></span>", 1), Wh = /* @__PURE__ */ V("<div class=\"tool-pop svelte-1n46o8q\"><button><!> </button> <button><!> </button></div>"), Gh = /* @__PURE__ */ V("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"toolgrp svelte-1n46o8q\"><button></button> <button></button></span>", 1), Kh = /* @__PURE__ */ V("<button class=\"ghost page-btn svelte-1n46o8q\"> </button> <span class=\"toolset svelte-1n46o8q\"><!> <!> <!></span>", 1), qh = /* @__PURE__ */ V("<button class=\"badge attention svelte-1n46o8q\"><!> <span class=\"btn-label svelte-1n46o8q\"> </span> <span class=\"badge-mini svelte-1n46o8q\"> </span></button>"), Jh = /* @__PURE__ */ V("<button class=\"discard-confirm svelte-1n46o8q\"><!> </button>"), Yh = /* @__PURE__ */ V("<span class=\"draft-cluster svelte-1n46o8q\"><span class=\"chip draft-chip svelte-1n46o8q\"><span class=\"chip-full svelte-1n46o8q\" aria-hidden=\"true\"> </span> <span class=\"chip-mini svelte-1n46o8q\" aria-hidden=\"true\">!</span></span>  <span class=\"discard-wrap svelte-1n46o8q\"><button><!><span class=\"discard-label svelte-1n46o8q\"> </span></button> <!></span></span>"), Xh = /* @__PURE__ */ V("<!> <span class=\"btn-label svelte-1n46o8q\"> </span>", 1), Zh = /* @__PURE__ */ V("<span class=\"who svelte-1n46o8q\"><!> </span>"), Qh = /* @__PURE__ */ V("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\"> </a>"), $h = /* @__PURE__ */ V("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\"><!> <span class=\"btn-label svelte-1n46o8q\"> </span></a> <button class=\"primary svelte-1n46o8q\"> </button>", 1), eg = /* @__PURE__ */ V("<button> </button>"), tg = /* @__PURE__ */ V("<span class=\"rail-group svelte-1n46o8q\"> </span> <!>", 1), ng = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" step=\"10\"/> <span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" step=\"10\" placeholder=\"0\"/></div>"), rg = /* @__PURE__ */ V("<p class=\"mini-label svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input type=\"text\" spellcheck=\"false\" class=\"svelte-1n46o8q\"/></label>", 1), ig = /* @__PURE__ */ V("<div class=\"settings-pop svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <p class=\"mini-label svelte-1n46o8q\"> </p> <div class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></div> <!> <!></div>"), ag = /* @__PURE__ */ V("<span class=\"page-path svelte-1n46o8q\">/</span>"), og = /* @__PURE__ */ V("<input class=\"page-slug svelte-1n46o8q\"/>"), sg = /* @__PURE__ */ V("<span class=\"seo-warn svelte-1n46o8q\"></span>"), cg = /* @__PURE__ */ V("<button class=\"ghost danger svelte-1n46o8q\"><!> </button>"), lg = /* @__PURE__ */ V("<div class=\"page-menu svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"><!> </button> <!></div>"), ug = /* @__PURE__ */ V("<div><input class=\"page-title svelte-1n46o8q\"/> <!> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <span class=\"page-menu-wrap svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <!></span></span></div>"), dg = /* @__PURE__ */ V("<img class=\"site-icon-preview svelte-1n46o8q\"/>"), fg = /* @__PURE__ */ V("<div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button></div>"), pg = /* @__PURE__ */ V("<div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button> <button class=\"page-template-del svelte-1n46o8q\"></button></div>"), mg = /* @__PURE__ */ V("<span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-template-grid svelte-1n46o8q\"></div>", 1), hg = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <textarea rows=\"2\" class=\"svelte-1n46o8q\"></textarea></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <textarea rows=\"2\" class=\"svelte-1n46o8q\"></textarea></label> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-template-grid svelte-1n46o8q\"><div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button></div> <!></div> <!></div>"), gg = /* @__PURE__ */ V("<input class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\"/> <button><b> </b></button> <button><i> </i></button></span>", 1), _g = /* @__PURE__ */ V("<img alt=\"\" class=\"svelte-1n46o8q\"/>"), vg = /* @__PURE__ */ V("<span class=\"logo-file svelte-1n46o8q\"> </span>"), yg = /* @__PURE__ */ V("<div class=\"logo-pick svelte-1n46o8q\"><span class=\"logo-thumb svelte-1n46o8q\"><!></span> <span class=\"logo-pick-col svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div> <div class=\"ctl-triple svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\"/></div> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\"/></div></div>", 1), bg = /* @__PURE__ */ V("<button type=\"button\"><!><span class=\"svelte-1n46o8q\"> </span></button>"), xg = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><span class=\"mini-label tb-grow svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" placeholder=\"1100\"/></span>"), Sg = /* @__PURE__ */ V("<!> <!> <span class=\"toolbar-row svelte-1n46o8q\"><span class=\"mini-label tb-grow svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></span>", 1), Cg = /* @__PURE__ */ V("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), wg = /* @__PURE__ */ V("<!> <span class=\"toolbar-row svelte-1n46o8q\"><span class=\"mini-label tb-grow svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></span>", 1), Tg = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div>"), Eg = /* @__PURE__ */ V("<div class=\"ctl-pair svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div></div>"), Dg = /* @__PURE__ */ V("<span class=\"toolbar-row ctl-end svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"1\" max=\"8\"/> <span class=\"mini-label svelte-1n46o8q\"> </span> <!></span>"), Og = /* @__PURE__ */ V("<div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-5 svelte-1n46o8q\" role=\"group\"></div></div> <!>", 1), kg = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"30\" max=\"80\" step=\"5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0\" max=\"400\" step=\"10\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0\" max=\"1200\" step=\"20\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <!>", 1), Ag = /* @__PURE__ */ V("<div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), jg = /* @__PURE__ */ V("<div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div>"), Mg = /* @__PURE__ */ V("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label>"), Ng = /* @__PURE__ */ V("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <!> <!> <!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <!> <input type=\"range\" min=\"0\" max=\"100\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Pg = /* @__PURE__ */ V("<button type=\"button\"><span> </span><span class=\"svelte-1n46o8q\"> </span></button>"), Fg = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), Ig = /* @__PURE__ */ V("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"text\" class=\"field-filled svelte-1n46o8q\" placeholder=\"https://\"/></label>"), Lg = /* @__PURE__ */ V("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"text\" class=\"field-filled svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Rg = /* @__PURE__ */ V("<span class=\"tool-move svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span>"), zg = /* @__PURE__ */ V("<div class=\"mini-card svelte-1n46o8q\"><span class=\"tool-head svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span><!></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), Bg = /* @__PURE__ */ V("<div class=\"mini-card svelte-1n46o8q\"><span class=\"tool-head svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span><!></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div>"), Vg = /* @__PURE__ */ V("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"text\" class=\"field-filled svelte-1n46o8q\"/></label>"), Hg = /* @__PURE__ */ V("<img alt=\"\"/>"), Ug = /* @__PURE__ */ V("<span class=\"lrow-warn svelte-1n46o8q\"></span>"), Wg = /* @__PURE__ */ V("<span class=\"lrow-tile-mark svelte-1n46o8q\"><!></span> <span class=\"lrow-tile-name svelte-1n46o8q\"> </span>", 1), Gg = /* @__PURE__ */ V("<span class=\"bad-target-note svelte-1n46o8q\"> </span>"), Kg = /* @__PURE__ */ V("<div class=\"lrow-body svelte-1n46o8q\"><!> <div class=\"lrow-fields svelte-1n46o8q\"><input class=\"field-filled svelte-1n46o8q\"/> <input/> <!> <span class=\"lrow-actions svelte-1n46o8q\"><!> <button class=\"linkish danger svelte-1n46o8q\"> </button></span></div></div>"), qg = /* @__PURE__ */ V("<div><div class=\"lrow-head svelte-1n46o8q\" role=\"button\" tabindex=\"0\"><span class=\"lrow-mark svelte-1n46o8q\" aria-hidden=\"true\"><!></span> <span class=\"lrow-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\" role=\"none\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"lrow-chev svelte-1n46o8q\" aria-hidden=\"true\"></span></div> <!></div>"), Jg = /* @__PURE__ */ V("<div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-3 svelte-1n46o8q\" role=\"group\"></div></div> <!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"1\" max=\"24\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <span class=\"lbtn-pick svelte-1n46o8q\"><!> <span class=\"lbtn-name svelte-1n46o8q\"><!></span></span></div> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), Yg = /* @__PURE__ */ V("<details class=\"group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"><span class=\"tool-head svelte-1n46o8q\"> <!></span></summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details>"), Xg = /* @__PURE__ */ V("<div aria-hidden=\"true\"><span class=\"nav-grip svelte-1n46o8q\"></span> <div class=\"nav-item-main svelte-1n46o8q\"><span class=\"nav-item-name ghost-name svelte-1n46o8q\"> </span> <span class=\"ghost-target svelte-1n46o8q\"> </span></div></div>"), Zg = /* @__PURE__ */ V("<input class=\"nav-item-href svelte-1n46o8q\"/>"), Qg = /* @__PURE__ */ V("<span class=\"nav-item-sub svelte-1n46o8q\"></span>"), $g = /* @__PURE__ */ V("<!> <div><span class=\"nav-grip svelte-1n46o8q\" draggable=\"true\"></span> <div class=\"nav-item-main svelte-1n46o8q\"><input class=\"nav-item-name svelte-1n46o8q\"/> <div class=\"nav-item-target svelte-1n46o8q\"><!> <!></div></div> <span class=\"nav-actions svelte-1n46o8q\"><button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button></span> <button class=\"ghost row-tool nav-more svelte-1n46o8q\"></button></div> <!>", 1), e_ = /* @__PURE__ */ V("<!> <div><span class=\"nav-grip svelte-1n46o8q\" draggable=\"true\"></span> <div class=\"nav-item-main svelte-1n46o8q\"><input class=\"nav-item-name svelte-1n46o8q\"/> <div class=\"nav-item-target svelte-1n46o8q\"><!> <!></div></div> <!> <span class=\"nav-actions svelte-1n46o8q\"><button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button></span> <button class=\"ghost row-tool nav-more svelte-1n46o8q\"></button></div> <!> <!> <!>", 1), t_ = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <!> <!> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-3 svelte-1n46o8q\" role=\"group\"></div></div> <!> <!> <!> <!> <!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"seg cw-seg svelte-1n46o8q\"></div> <details class=\"sub-inset svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"sub-inset-body svelte-1n46o8q\"><!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div> <!></div></details></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-pair svelte-1n46o8q\"><!> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div></div> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label></div> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <!></div> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label></div> <!> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <!></div> <!> <!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-5 svelte-1n46o8q\" role=\"group\"></div></div> <!> <div class=\"swatch-row svelte-1n46o8q\"><!> <div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div></div> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!></div></details></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!>  <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div role=\"group\"></div></div> <!> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"4\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"nav-list svelte-1n46o8q\" role=\"list\"></div> <button class=\"ghost action svelte-1n46o8q\"> </button> <span class=\"toolbar-row svelte-1n46o8q\"><input class=\"tb-grow svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button></span></div></details></div>"), n_ = /* @__PURE__ */ V("<div class=\"cw-row svelte-1n46o8q\"><span class=\"mini-label cw-screen svelte-1n46o8q\"> </span> <span><span class=\"cw-fill svelte-1n46o8q\"></span></span> <span class=\"gridmenu-value cw-margin svelte-1n46o8q\"> </span></div>"), r_ = /* @__PURE__ */ V("<div class=\"mini-label cw-binds svelte-1n46o8q\"> </div>"), i_ = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), a_ = /* @__PURE__ */ V("<button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), o_ = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"sample cw-sample svelte-1n46o8q\"><!> <div class=\"cw-legend svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!></div> <div class=\"seg cw-seg svelte-1n46o8q\"></div> <!> <p class=\"mini-label svelte-1n46o8q\"> </p> <div class=\"seg cw-seg svelte-1n46o8q\"></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div>"), s_ = /* @__PURE__ */ V("<div class=\"mini-label tpv-cap svelte-1n46o8q\"> </div>"), c_ = /* @__PURE__ */ V("<div class=\"theme-pvw svelte-1n46o8q\"><!> <div class=\"tpv-demo svelte-1n46o8q\"><div class=\"tpv-h svelte-1n46o8q\"> </div> <div class=\"tpv-card svelte-1n46o8q\"> </div> <div class=\"tpv-row svelte-1n46o8q\"><span class=\"tpv-btn svelte-1n46o8q\"> </span><span class=\"tpv-lnk svelte-1n46o8q\"> </span></div></div></div>"), l_ = /* @__PURE__ */ V("<button type=\"button\"><span class=\"tp-band svelte-1n46o8q\"><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i></span> <small class=\"svelte-1n46o8q\"> </small></button>"), u_ = /* @__PURE__ */ V("<div class=\"ctl-row autorow svelte-1n46o8q\"><span class=\"autolbl svelte-1n46o8q\"> </span> <span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div>"), d_ = /* @__PURE__ */ V("<div class=\"palcol svelte-1n46o8q\"><!> <span class=\"palcap svelte-1n46o8q\"> </span> <b class=\"palhex svelte-1n46o8q\"> </b></div>"), f_ = /* @__PURE__ */ V("<div class=\"ctl-row palhead svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <button type=\"button\"> </button></div> <div></div>", 1), p_ = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"theme-presets svelte-1n46o8q\"></div> <p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <div class=\"ctl-row palhead svelte-1n46o8q\"><!> <button type=\"button\"> </button></div> <div class=\"palcells svelte-1n46o8q\"></div> <!> <div class=\"ctl-row palauto-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <button type=\"button\"> </button></div> <div class=\"theme-previews svelte-1n46o8q\"><!> <!></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <div class=\"sample typo-sample svelte-1n46o8q\"><div class=\"ts-h svelte-1n46o8q\"> </div> <div class=\"ts-b svelte-1n46o8q\"> </div></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"sample form-prev svelte-1n46o8q\"><span class=\"fp-btn svelte-1n46o8q\"> </span> <span class=\"fp-card svelte-1n46o8q\"> </span></div> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"24\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"40\" step=\"1\" class=\"svelte-1n46o8q\"/></div></details></div>"), m_ = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label>"), h_ = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label>"), g_ = /* @__PURE__ */ V("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), __ = /* @__PURE__ */ V("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <!> <!>", 1), v_ = /* @__PURE__ */ V("<div><input type=\"text\" class=\"svelte-1n46o8q\"/> <!></div>"), y_ = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), b_ = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), x_ = /* @__PURE__ */ V("<button><span class=\"rs-sample svelte-1n46o8q\"><i class=\"rs-line svelte-1n46o8q\"></i> <i class=\"rs-chip svelte-1n46o8q\"></i> <i class=\"rs-dot svelte-1n46o8q\"></i></span> <span class=\"rs-name svelte-1n46o8q\"> </span></button>"), S_ = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" step=\"4\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), C_ = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"1000\" step=\"10\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), w_ = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <!>", 1), T_ = /* @__PURE__ */ V("<p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"token-input svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"rs-grid svelte-1n46o8q\"></div> <label class=\"svelte-1n46o8q\"> <span class=\"row-tools svelte-1n46o8q\"><span class=\"gridmenu-value svelte-1n46o8q\"> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label>", 1), E_ = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), D_ = /* @__PURE__ */ V("<button class=\"footer-tp svelte-1n46o8q\"><span class=\"footer-tp-thumb svelte-1n46o8q\"></span> <span class=\"footer-tp-name svelte-1n46o8q\"> </span></button>"), O_ = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"16\" max=\"160\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), k_ = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!>", 1), A_ = /* @__PURE__ */ V("<div class=\"nav-row\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></div> <!>", 1), j_ = /* @__PURE__ */ V("<div class=\"nav-row\"><span class=\"nav-line svelte-1n46o8q\"><span class=\"footer-soc-preview svelte-1n46o8q\" aria-hidden=\"true\"></span> <!></span> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <input class=\"nav-target svelte-1n46o8q\"/></div>"), M_ = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), N_ = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"footer-tpick svelte-1n46o8q\"></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"svelte-1n46o8q\"> <!></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details></div>"), P_ = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"date\" class=\"svelte-1n46o8q\"/></label>"), F_ = /* @__PURE__ */ V("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), I_ = /* @__PURE__ */ V("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/>"), L_ = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span>"), R_ = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" step=\"0.01\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" step=\"0.01\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), z_ = /* @__PURE__ */ V("<details class=\"group collection-entry svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <textarea rows=\"3\" class=\"svelte-1n46o8q\"></textarea> <!> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!></div></details>"), B_ = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\".csv,text/csv\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), V_ = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button></div>"), H_ = /* @__PURE__ */ V("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), U_ = /* @__PURE__ */ V("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), W_ = /* @__PURE__ */ V("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <!></div>"), G_ = /* @__PURE__ */ V("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span></div>"), K_ = /* @__PURE__ */ V("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), q_ = /* @__PURE__ */ V("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <!>", 1), J_ = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <!> <!></div>"), Y_ = /* @__PURE__ */ V("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), X_ = /* @__PURE__ */ V("<button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), Z_ = /* @__PURE__ */ V("<p class=\"panel-hint svelte-1n46o8q\"> </p> <button class=\"ghost svelte-1n46o8q\"> </button>", 1), Q_ = /* @__PURE__ */ V("<span class=\"update-arrow svelte-1n46o8q\"></span> <span class=\"badge svelte-1n46o8q\"> </span>", 1), $_ = /* @__PURE__ */ V("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><p class=\"update-notes svelte-1n46o8q\"> </p></div></details>"), ev = /* @__PURE__ */ V("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"><span class=\"update-warn svelte-1n46o8q\"></span> </summary> <div class=\"group-items svelte-1n46o8q\"><pre class=\"update-headers svelte-1n46o8q\"> </pre></div></details>"), tv = /* @__PURE__ */ V("<span class=\"chip svelte-1n46o8q\"> </span>"), nv = /* @__PURE__ */ V("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <span class=\"update-warn svelte-1n46o8q\"></span></span></div>"), rv = /* @__PURE__ */ V("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <!></div>"), iv = /* @__PURE__ */ V("<span class=\"update-warn svelte-1n46o8q\"></span>"), av = /* @__PURE__ */ V("<div class=\"update-row svelte-1n46o8q\"><span> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <!> <input type=\"checkbox\" class=\"svelte-1n46o8q\"/></span></div>"), ov = /* @__PURE__ */ V("<div class=\"ctl-row update-opt-head svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!>", 1), sv = /* @__PURE__ */ V("<p class=\"update-summary svelte-1n46o8q\"> </p> <!> <!> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details> <!> <button class=\"primary update-run svelte-1n46o8q\"> </button>", 1), cv = /* @__PURE__ */ V("<div class=\"update-versions svelte-1n46o8q\"><span class=\"update-from svelte-1n46o8q\"> </span> <!></div> <!>", 1), lv = /* @__PURE__ */ V("<aside><div class=\"panel-head svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></div> <!></aside>"), uv = /* @__PURE__ */ V("<div class=\"workspace svelte-1n46o8q\"><nav><!> <span class=\"rail-settings svelte-1n46o8q\"><span class=\"rail-brand svelte-1n46o8q\" title=\"Urd\"><svg class=\"brand-mark svelte-1n46o8q\" viewBox=\"10.3 8.3 19.4 25.4\" aria-hidden=\"true\"><path d=\"M12 32V10l16 6.5V32\" fill=\"none\" stroke=\"var(--urd-brand)\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg> <span class=\"brand-word svelte-1n46o8q\">Urd</span></span> <button></button> <!></span></nav> <!> <div><div class=\"stage svelte-1n46o8q\"><iframe class=\"svelte-1n46o8q\"></iframe></div></div></div>"), dv = /* @__PURE__ */ V("<p class=\"loading svelte-1n46o8q\"> </p>"), fv = /* @__PURE__ */ V("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), pv = /* @__PURE__ */ V("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), mv = /* @__PURE__ */ V("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <p class=\"panel-hint svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <p class=\"panel-hint svelte-1n46o8q\"> </p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), hv = /* @__PURE__ */ V("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\">×</button></div>"), gv = /* @__PURE__ */ V("<div class=\"block-menu svelte-1n46o8q\"><header class=\"block-menu-head svelte-1n46o8q\"><span> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></header> <div class=\"panel-body block-menu-body svelte-1n46o8q\"><!></div></div>"), _v = /* @__PURE__ */ V("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><!> <!></span> <span class=\"topbar-group topbar-draft svelte-1n46o8q\"><!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!> <!></div>     <!>", 1);
function vv(e, t) {
	Xe(t, !0);
	let n = (e, t = f, n = f, r = f) => {
		var i = Nr(), a = P(i), o = (e) => {
			var i = vp(), a = P(i), o = N(a), s = I(o);
			E(a), Jr(I(a, 2), 17, () => r().props.images ?? [], Wr, (e, i, a) => {
				var o = _p(), s = P(o), c = N(s), l = I(c, 2), u = N(l);
				u.disabled = a === 0, G(u, () => C.up, !0), E(u);
				var d = I(u, 2);
				G(d, () => C.down, !0), E(d);
				var f = I(d, 2);
				G(f, () => C.cross, !0), E(f), E(l), E(s);
				var p = I(s, 2), m = N(p), h = F(I(m));
				E(p);
				var g = I(p, 2);
				K(g);
				var _ = I(g, 2), v = N(_), y = F(I(v));
				E(_);
				var b = I(_, 2);
				K(b), R((e, t, n, o, s) => {
					J(c, "src", z(i).src), d.disabled = a === r().props.images.length - 1, J(f, "title", e), U(m, `${t ?? ""} `), U(h, `${n ?? ""}%`), q(g, z(i).x ?? .5), U(v, `${o ?? ""} `), U(y, `${s ?? ""}%`), q(b, z(i).y ?? .5);
				}, [
					() => Y("tip.removeImage"),
					() => Y("lbl.focusX"),
					() => Math.round((z(i).x ?? .5) * 100),
					() => Y("lbl.focusY"),
					() => Math.round((z(i).y ?? .5) * 100)
				]), B("click", u, () => Ei(t(), n(), a, -1)), B("click", d, () => Ei(t(), n(), a, 1)), B("click", f, () => Oi(t(), n(), a)), B("input", g, (e) => ki(t(), n(), a, "x", Number(e.target.value))), B("input", b, (e) => ki(t(), n(), a, "y", Number(e.target.value))), H(e, o);
			}), R((e, t) => {
				J(a, "title", e), U(o, `${t ?? ""} `);
			}, [() => Y("tip.bg.addImages"), () => Y("ui.addImages")]), B("change", s, (e) => Ti(t(), n(), e)), H(e, i);
		};
		W(a, (e) => {
			(r().props.source ?? "upload") !== "folder" && e(o);
		}), H(e, i);
	}, r = (e, t = f, n = f, r = f) => {
		let i = /* @__PURE__ */ k(() => Jc(r()));
		var a = xp(), o = P(a), s = N(o), c = I(s);
		{
			let e = /* @__PURE__ */ k(() => z(i).source ?? "upload"), r = /* @__PURE__ */ k(() => [["upload", Y("opt.photoSource.upload")], ["folder", Y("opt.photoSource.folder")]]);
			X(c, {
				get value() {
					return z(e);
				},
				get options() {
					return z(r);
				},
				onchange: (e) => Vr(t(), n(), "source", e)
			});
		}
		E(o);
		var l = I(o, 2), u = (e) => {
			let a = /* @__PURE__ */ k(() => Bd(z(i).folder ?? "")), o = /* @__PURE__ */ k(() => !z(a) || z(a).provider === "drive" || z(a).provider === "nextcloud");
			var s = bp(), c = P(s), l = N(c), u = I(l);
			K(u);
			let d;
			E(c);
			var f = I(c, 2), p = N(f), m = I(p);
			{
				let e = /* @__PURE__ */ k(() => z(o) || z(i).order === "random" ? z(i).order ?? "name" : "name"), r = /* @__PURE__ */ k(() => z(o) ? [
					["name", Y("opt.folderOrder.name")],
					["newest", Y("opt.folderOrder.newest")],
					["random", Y("opt.folderOrder.random")]
				] : [["name", Y("opt.folderOrder.listed")], ["random", Y("opt.folderOrder.random")]]);
				X(m, {
					get value() {
						return z(e);
					},
					get options() {
						return z(r);
					},
					onchange: (e) => Vr(t(), n(), "order", e)
				});
			}
			E(f);
			var h = I(f, 2), g = N(h), _ = I(g);
			K(_), E(h);
			var v = I(h, 2), y = N(v);
			G(y, () => C.eye);
			var b = I(y);
			E(v);
			var x = I(v, 2), S = (e) => {
				var r = yp();
				let i;
				var a = F(r, !0);
				R((e, t) => {
					i = gi(r, 1, "folder-status svelte-1n46o8q", null, i, { err: e }), U(a, t);
				}, [() => bi[xi(t(), n())].err, () => bi[xi(t(), n())].text]), H(e, r);
			}, ee = /* @__PURE__ */ k(() => bi[xi(t(), n())]);
			W(x, (e) => {
				z(ee) && e(S);
			}), R((e, t, n, r, o, s, m, y) => {
				J(c, "title", e), U(l, `${t ?? ""} `), q(u, z(i).folder ?? ""), d = gi(u, 1, "svelte-1n46o8q", null, d, { "bad-target": n }), J(f, "title", r), U(p, `${o ?? ""} `), J(h, "title", s), U(g, `${m ?? ""} `), q(_, z(i).folderMax ?? 24), v.disabled = !z(a), U(b, ` ${y ?? ""}`);
			}, [
				() => Y("tip.bg.photoFolder"),
				() => Y("lbl.photoFolder"),
				() => (z(i).folder ?? "").trim() && !z(a),
				() => Y("tip.bg.folderOrder"),
				() => Y("lbl.folderOrder"),
				() => Y("tip.bg.folderMax"),
				() => Y("lbl.folderMax"),
				() => Y("ui.checkFolder")
			]), B("change", u, (e) => Vr(t(), n(), "folder", e.target.value.trim())), B("change", _, (e) => Vr(t(), n(), "folderMax", Number(e.target.value))), B("click", v, () => wi(t(), n(), r())), H(e, s);
		};
		W(l, (e) => {
			(z(i).source ?? "upload") === "folder" && e(u);
		}), R((e, t) => {
			J(o, "title", e), U(s, `${t ?? ""} `);
		}, [() => Y("tip.bg.photoSource"), () => Y("lbl.photoSource")]), H(e, a);
	}, i = (e, t = f, n = f, r = f) => {
		var i = xp(), a = P(i), o = N(a), s = I(o);
		{
			let e = /* @__PURE__ */ k(() => r().props.motion ?? "none"), i = /* @__PURE__ */ k(() => [
				["none", Y("common.none")],
				["kenburns", Y("opt.bgMotion.kenburns")],
				["drift", Y("opt.bgMotion.drift")]
			]);
			X(s, {
				get value() {
					return z(e);
				},
				get options() {
					return z(i);
				},
				onchange: (e) => Vr(t(), n(), "motion", e)
			});
		}
		E(a);
		var c = I(a, 2), l = (e) => {
			var i = Sp(), a = P(i), o = N(a), s = F(I(o));
			E(a);
			var c = I(a, 2);
			K(c), R((e) => {
				U(o, `${e ?? ""} `), U(s, `${r().props.motionSpeed ?? 20 ?? ""} s`), q(c, r().props.motionSpeed ?? 20);
			}, [() => Y("lbl.motionSpeed")]), B("input", c, (e) => Vr(t(), n(), "motionSpeed", Number(e.target.value))), H(e, i);
		};
		W(c, (e) => {
			(r().props.motion ?? "none") !== "none" && e(l);
		}), R((e, t) => {
			J(a, "title", e), U(o, `${t ?? ""} `);
		}, [() => Y("tip.bg.imageMotion"), () => Y("lbl.motion")]), H(e, i);
	}, a = (e, t = f, a = f) => {
		var o = Yp(), s = P(o);
		Jr(s, 17, a, Wr, (e, o, s) => {
			var c = Jp(), l = N(c), u = N(l);
			{
				let e = /* @__PURE__ */ k(() => Y("tip.bg.changeType")), n = /* @__PURE__ */ k(() => te.map(([e, t]) => [e, t.labelKey ? Y(t.labelKey) : t.label]));
				X(u, {
					get value() {
						return z(o).type;
					},
					get title() {
						return z(e);
					},
					get options() {
						return z(n);
					},
					onchange: (e) => oi(t(), s, e)
				});
			}
			var d = I(u, 2), f = N(d);
			f.disabled = s === 0, G(f, () => C.up, !0), E(f);
			var p = I(f, 2);
			G(p, () => C.down, !0), E(p);
			var m = I(p, 2);
			G(m, () => C.cross, !0), E(m), E(d), E(l);
			var h = I(l, 2), g = (e) => {
				var n = Cp(), r = P(n), i = N(r), a = I(i);
				{
					let e = /* @__PURE__ */ k(Ri), n = /* @__PURE__ */ k(() => Y("tip.bg.layerColor"));
					ba(a, {
						get value() {
							return z(o).props.value;
						},
						get tokens() {
							return z(e);
						},
						get label() {
							return z(n);
						},
						onchange: (e) => Vr(t(), s, "value", e)
					});
				}
				E(r);
				var c = I(r, 2), l = N(c), u = F(I(l));
				E(c);
				var d = I(c, 2);
				K(d), R((e, t, n) => {
					U(i, `${e ?? ""} `), U(l, `${t ?? ""} `), U(u, `${n ?? ""}%`), q(d, z(o).props.opacity ?? 1);
				}, [
					() => Y("lbl.color"),
					() => Y("lbl.strength"),
					() => Math.round((z(o).props.opacity ?? 1) * 100)
				]), B("input", d, (e) => Vr(t(), s, "opacity", Number(e.target.value))), H(e, n);
			}, _ = (e) => {
				let n = /* @__PURE__ */ k(() => Yr(z(o))), r = /* @__PURE__ */ k(() => z(n).stops.reduce((e, t) => e + Math.max(0, Number(t.share) || 0), 0));
				var i = Op(), a = P(i), c = N(a), l = I(c);
				{
					let e = /* @__PURE__ */ k(() => z(n).kind ?? "linear"), r = /* @__PURE__ */ k(() => [["linear", Y("opt.grad.linear")], ["radial", Y("opt.grad.radial")]]);
					X(l, {
						get value() {
							return z(e);
						},
						get options() {
							return z(r);
						},
						onchange: (e) => $r(t(), s, e)
					});
				}
				E(a);
				var u = I(a, 2);
				Jr(u, 17, () => z(n).stops, Wr, (e, i, a) => {
					var o = Tp();
					let c;
					var l = N(o), u = I(l, 2);
					{
						let e = /* @__PURE__ */ k(Ri), n = /* @__PURE__ */ k(() => Y("tip.bg.stopColor"));
						ba(u, {
							get value() {
								return z(i).color;
							},
							get tokens() {
								return z(e);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => ei(t(), s, a, { color: e })
						});
					}
					var d = I(u, 2);
					K(d);
					var f = I(d, 2), p = F(f), m = I(f, 2), h = (e) => {
						var n = wp();
						G(n, () => C.cross, !0), E(n), R((e) => J(n, "title", e), [() => Y("tip.bg.removeStop")]), B("click", n, () => ni(t(), s, a)), H(e, n);
					};
					W(m, (e) => {
						z(n).stops.length > 2 && e(h);
					}), E(o), R((e, t, r) => {
						c = gi(o, 1, "nav-line grad-stop svelte-1n46o8q", null, c, {
							dragging: z(ii)?.layer === s && z(ii).from === a,
							"drop-above": z(ii)?.layer === s && z(ii).insert === a,
							"drop-below": z(ii)?.layer === s && z(ii).insert === z(n).stops.length && a === z(n).stops.length - 1
						}), J(l, "title", e), q(d, z(i).share ?? 50), J(d, "title", t), U(p, `${r ?? ""}%`);
					}, [
						() => Y("tip.bg.dragStop"),
						() => Y("tip.bg.stopShare"),
						() => z(r) > 0 ? Math.round(Math.max(0, Number(z(i).share) || 0) / z(r) * 100) : Math.round(100 / z(n).stops.length)
					]), B("pointerdown", l, (e) => ai(t(), e, s, a)), B("input", d, (e) => ei(t(), s, a, { share: Number(e.target.value) })), H(e, o);
				});
				var d = I(u, 2), f = F(d, !0), p = I(d, 2), m = (e) => {
					var r = Ep(), i = P(r), a = N(i), o = F(I(a));
					E(i);
					var c = I(i, 2);
					K(c);
					var l = I(c, 2), u = N(l), d = F(I(u));
					E(l);
					var f = I(l, 2);
					K(f), R((e, t, r, i) => {
						U(a, `${e ?? ""} `), U(o, `${t ?? ""}%`), q(c, z(n).x ?? .5), U(u, `${r ?? ""} `), U(d, `${i ?? ""}%`), q(f, z(n).y ?? .5);
					}, [
						() => Y("lbl.centerX"),
						() => Math.round((z(n).x ?? .5) * 100),
						() => Y("lbl.centerY"),
						() => Math.round((z(n).y ?? .5) * 100)
					]), B("input", c, (e) => Zr(t(), s, "x", Number(e.target.value))), B("input", f, (e) => Zr(t(), s, "y", Number(e.target.value))), H(e, r);
				}, h = (e) => {
					var r = Dp(), i = P(r), a = N(i), o = F(I(a));
					E(i);
					var c = I(i, 2);
					K(c), R((e) => {
						U(a, `${e ?? ""} `), U(o, `${z(n).angle ?? ""}°`), q(c, z(n).angle);
					}, [() => Y("lbl.angle")]), B("input", c, (e) => Zr(t(), s, "angle", Number(e.target.value))), H(e, r);
				};
				W(p, (e) => {
					(z(n).kind ?? "linear") === "radial" ? e(m) : e(h, -1);
				});
				var g = I(p, 2), _ = N(g), v = F(I(_));
				E(g);
				var y = I(g, 2);
				K(y);
				var b = I(y, 2), x = N(b), S = I(x);
				{
					let e = /* @__PURE__ */ k(() => z(n).animation ?? "none");
					X(S, {
						get value() {
							return z(e);
						},
						get options() {
							return Qr[(z(n).kind ?? "linear") === "radial" ? "radial" : "linear"];
						},
						onchange: (e) => Zr(t(), s, "animation", e)
					});
				}
				E(b), R((e, t, r, i, a, o, s) => {
					U(c, `${e ?? ""} `), J(d, "title", t), U(f, r), U(_, `${i ?? ""} `), U(v, `${a ?? ""}%`), q(y, z(n).opacity ?? 1), J(b, "title", o), U(x, `${s ?? ""} `);
				}, [
					() => Y("blocks.shape"),
					() => Y("tip.bg.addStop"),
					() => Y("ui.addStop"),
					() => Y("lbl.strength"),
					() => Math.round((z(n).opacity ?? 1) * 100),
					() => Y("tip.bg.motion"),
					() => Y("lbl.motion")
				]), B("click", d, () => ti(t(), s)), B("input", y, (e) => Zr(t(), s, "opacity", Number(e.target.value))), H(e, i);
			}, v = (e) => {
				var n = kp(), r = P(n), i = N(r), a = I(i);
				{
					let e = /* @__PURE__ */ k(Ri), n = /* @__PURE__ */ k(() => Y("tip.bg.glowColor"));
					ba(a, {
						get value() {
							return z(o).props.color;
						},
						get tokens() {
							return z(e);
						},
						get label() {
							return z(n);
						},
						onchange: (e) => Vr(t(), s, "color", e)
					});
				}
				E(r);
				var c = I(r, 2), l = N(c), u = F(I(l));
				E(c);
				var d = I(c, 2);
				K(d);
				var f = I(d, 2), p = N(f), m = F(I(p));
				E(f);
				var h = I(f, 2);
				K(h);
				var g = I(h, 2), _ = N(g), v = F(I(_));
				E(g);
				var y = I(g, 2);
				K(y);
				var b = I(y, 2), x = N(b), S = F(I(x));
				E(b);
				var ee = I(b, 2);
				K(ee), R((e, t, n, r, a, s, c, f, g) => {
					U(i, `${e ?? ""} `), U(l, `${t ?? ""} `), U(u, `${n ?? ""}%`), q(d, z(o).props.x), U(p, `${r ?? ""} `), U(m, `${a ?? ""}%`), q(h, z(o).props.y), U(_, `${s ?? ""} `), U(v, `${c ?? ""}%`), q(y, z(o).props.radius), U(x, `${f ?? ""} `), U(S, `${g ?? ""}%`), q(ee, z(o).props.opacity);
				}, [
					() => Y("lbl.color"),
					() => Y("lbl.posX"),
					() => Math.round(z(o).props.x * 100),
					() => Y("lbl.posY"),
					() => Math.round(z(o).props.y * 100),
					() => Y("lbl.size"),
					() => Math.round(z(o).props.radius * 100),
					() => Y("lbl.strength"),
					() => Math.round(z(o).props.opacity * 100)
				]), B("input", d, (e) => Vr(t(), s, "x", Number(e.target.value))), B("input", h, (e) => Vr(t(), s, "y", Number(e.target.value))), B("input", y, (e) => Vr(t(), s, "radius", Number(e.target.value))), B("input", ee, (e) => Vr(t(), s, "opacity", Number(e.target.value))), H(e, n);
			}, y = (e) => {
				var n = Ap(), r = P(n), i = N(r), a = F(I(i));
				E(r);
				var c = I(r, 2);
				K(c), R((e, t) => {
					U(i, `${e ?? ""} `), U(a, `${t ?? ""}%`), q(c, z(o).props.opacity);
				}, [() => Y("lbl.strength"), () => Math.round(z(o).props.opacity * 100)]), B("input", c, (e) => Vr(t(), s, "opacity", Number(e.target.value))), H(e, n);
			}, b = (e) => {
				var n = jp(), r = P(n), i = N(r), a = I(i);
				{
					let e = /* @__PURE__ */ k(() => Fu(z(o).props.pattern)), n = /* @__PURE__ */ k(() => ju.map((e) => [e, Y(`opt.bgPattern.${e}`)]));
					X(a, {
						get value() {
							return z(e);
						},
						get options() {
							return z(n);
						},
						onchange: (e) => Vr(t(), s, "pattern", e)
					});
				}
				E(r);
				var c = I(r, 2), l = N(c), u = I(l);
				{
					let e = /* @__PURE__ */ k(() => z(o).props.color ?? "text"), n = /* @__PURE__ */ k(Ri), r = /* @__PURE__ */ k(() => Y("lbl.color"));
					ba(u, {
						get value() {
							return z(e);
						},
						get tokens() {
							return z(n);
						},
						get label() {
							return z(r);
						},
						onchange: (e) => Vr(t(), s, "color", e)
					});
				}
				E(c);
				var d = I(c, 2), f = N(d), p = F(I(f));
				E(d);
				var m = I(d, 2);
				K(m);
				var h = I(m, 2), g = N(h), _ = F(I(g));
				E(h);
				var v = I(h, 2);
				K(v);
				var y = I(v, 2), b = N(y), x = F(I(b));
				E(y);
				var S = I(y, 2);
				K(S);
				var ee = I(S, 2), te = N(ee);
				K(te);
				var ne = I(te);
				E(ee), R((e, t, n, r, a, s, c, u) => {
					U(i, `${e ?? ""} `), U(l, `${t ?? ""} `), U(f, `${n ?? ""} `), U(p, `${z(o).props.size ?? Mu.dflt ?? ""} px`), J(m, "min", Mu.min), J(m, "max", Mu.max), q(m, z(o).props.size ?? Mu.dflt), U(g, `${r ?? ""} `), U(_, `${a ?? ""}%`), q(v, z(o).props.opacity ?? .12), U(b, `${s ?? ""} `), U(x, `${z(o).props.rotation ?? 0 ?? ""}°`), q(S, z(o).props.rotation ?? 0), J(ee, "title", c), Ci(te, z(o).props.invert === !0), U(ne, ` ${u ?? ""}`);
				}, [
					() => Y("lbl.bgPattern"),
					() => Y("lbl.color"),
					() => Y("lbl.size"),
					() => Y("lbl.strength"),
					() => Math.round((z(o).props.opacity ?? .12) * 100),
					() => Y("lbl.patternRotation"),
					() => Y("tip.bg.patternInvert"),
					() => Y("lbl.patternInvert")
				]), B("input", m, (e) => Vr(t(), s, "size", Number(e.target.value))), B("input", v, (e) => Vr(t(), s, "opacity", Number(e.target.value))), B("input", S, (e) => Vr(t(), s, "rotation", Number(e.target.value))), B("change", te, (e) => Vr(t(), s, "invert", e.target.checked)), H(e, n);
			}, x = (e) => {
				let n = /* @__PURE__ */ k(() => z(o).props.fit === "tile" || z(o).props.fit === "repeat");
				var r = Pp(), a = P(r), c = N(a), l = I(c);
				E(a);
				var u = I(a, 2), d = N(u), f = I(d);
				{
					let e = /* @__PURE__ */ k(() => z(n) ? "tile" : "plain"), r = /* @__PURE__ */ k(() => [["plain", Y("opt.img.plain")], ["tile", Y("opt.img.tile")]]);
					X(f, {
						get value() {
							return z(e);
						},
						get options() {
							return z(r);
						},
						onchange: (e) => Vr(t(), s, "fit", e)
					});
				}
				E(u);
				var p = I(u, 2), m = F(p, !0), h = I(p, 2), g = N(h), _ = I(g, 2);
				K(_);
				var v = I(_, 4);
				E(h);
				var y = I(h, 2), b = (e) => {
					var n = Mp(), r = P(n), i = N(r), a = F(i, !0), c = I(i, 2), l = F(c, !0);
					E(r);
					var u = I(r, 2), d = F(u, !0), f = I(u, 2), p = I(f, 2), m = N(p), h = F(I(m));
					E(p);
					var g = I(p, 2);
					K(g);
					var _ = I(g, 2), v = N(_), y = F(I(v));
					E(_);
					var b = I(_, 2);
					K(b), R((e, t, n, r, s, p, _, x, S, ee, te, ne) => {
						J(i, "title", e), U(a, t), J(c, "title", n), U(l, r), J(u, "title", s), U(d, p), vi(f, `--fx:${_ ?? ""}%; --fy:${x ?? ""}%`), U(m, `${S ?? ""} `), U(h, `${ee ?? ""}%`), q(g, z(o).props.x ?? .5), U(v, `${te ?? ""} `), U(y, `${ne ?? ""}%`), q(b, z(o).props.y ?? .5);
					}, [
						() => Y("tip.bg.cover"),
						() => Y("ui.cover"),
						() => Y("opt.fitFrame.contain"),
						() => Y("opt.fit.contain"),
						() => Y("tip.bg.position"),
						() => Y("lbl.position"),
						() => Math.max(0, Math.min(1, z(o).props.x ?? .5)) * 100,
						() => Math.max(0, Math.min(1, z(o).props.y ?? .5)) * 100,
						() => Y("lbl.horizontal"),
						() => Math.round((z(o).props.x ?? .5) * 100),
						() => Y("lbl.vertical"),
						() => Math.round((z(o).props.y ?? .5) * 100)
					]), B("click", i, () => qr(t(), s, z(o), "cover")), B("click", c, () => qr(t(), s, z(o), "contain")), B("pointerdown", f, (e) => Hr(e, t(), s, "xy")), B("input", g, (e) => Vr(t(), s, "x", Number(e.target.value))), B("input", b, (e) => Vr(t(), s, "y", Number(e.target.value))), H(e, n);
				};
				W(y, (e) => {
					z(n) || e(b);
				});
				var x = I(y, 2), S = N(x), ee = F(I(S));
				E(x);
				var te = I(x, 2);
				K(te);
				var ne = I(te, 2), C = N(ne), re = F(I(C));
				E(ne);
				var ie = I(ne, 2);
				K(ie);
				var ae = I(ie, 2);
				i(ae, t, () => s, () => z(o));
				var oe = I(ae, 2), se = N(oe);
				K(se);
				var ce = I(se);
				E(oe);
				var w = I(oe, 2), le = (e) => {
					var n = Np(), r = P(n), i = N(r), a = F(I(i));
					E(r);
					var c = I(r, 2);
					K(c);
					var l = I(c, 2), u = N(l), d = I(u);
					{
						let e = /* @__PURE__ */ k(() => z(o).props.bleed ?? "none"), n = /* @__PURE__ */ k(() => [
							["none", Y("common.none")],
							["up", Y("opt.bleed.up")],
							["down", Y("opt.bleed.down")],
							["both", Y("opt.brand.both")]
						]);
						X(d, {
							get value() {
								return z(e);
							},
							get options() {
								return z(n);
							},
							onchange: (e) => Vr(t(), s, "bleed", e)
						});
					}
					E(l), R((e, t, n, r) => {
						U(i, `${e ?? ""} `), U(a, `${t ?? ""}%`), q(c, z(o).props.parallax ?? .3), J(l, "title", n), U(u, `${r ?? ""} `);
					}, [
						() => Y("lbl.parallaxStrength"),
						() => Math.round((z(o).props.parallax ?? 0) * 100),
						() => Y("tip.bg.bleed"),
						() => Y("lbl.bleed")
					]), B("input", c, (e) => Vr(t(), s, "parallax", Number(e.target.value))), H(e, n);
				};
				W(w, (e) => {
					(z(o).props.parallax ?? 0) > 0 && e(le);
				}), R((e, t, n, r, i, s, l, f, h, y, b, x, ne, ae) => {
					J(a, "title", e), U(c, `${t ?? ""} `), J(u, "title", n), U(d, `${r ?? ""} `), J(p, "title", i), U(m, s), J(g, "title", l), q(_, f), J(v, "title", h), U(S, `${y ?? ""} `), U(ee, `${z(o).props.blur ?? 0 ?? ""} px`), q(te, z(o).props.blur ?? 0), U(C, `${b ?? ""} `), U(re, `${x ?? ""}%`), q(ie, z(o).props.opacity ?? 1), J(oe, "title", ne), Ci(se, (z(o).props.parallax ?? 0) > 0), U(ce, ` ${ae ?? ""}`);
				}, [
					() => Y("tip.webpAuto"),
					() => z(o).props.src ? Y("ui.changeImage") : Y("ui.chooseImage"),
					() => Y("tip.bg.fit"),
					() => Y("lbl.fit"),
					() => Y("tip.bg.size"),
					() => Y("lbl.size"),
					() => Y("tip.smaller"),
					() => Math.round((z(o).props.size ?? 1) * 100),
					() => Y("tip.larger"),
					() => Y("lbl.blur"),
					() => Y("lbl.strength"),
					() => Math.round((z(o).props.opacity ?? 1) * 100),
					() => Y("tip.bg.parallax"),
					() => Y("lbl.parallax")
				]), B("change", l, (e) => hi(t(), s, e)), B("click", g, () => Gr(t(), s, z(o).props.size ?? 1, -.05)), B("change", _, (e) => Kr(t(), s, e.target.value)), B("click", v, () => Gr(t(), s, z(o).props.size ?? 1, .05)), B("input", te, (e) => Vr(t(), s, "blur", Number(e.target.value))), B("input", ie, (e) => Vr(t(), s, "opacity", Number(e.target.value))), B("change", se, (e) => Vr(t(), s, "parallax", e.target.checked ? .3 : 0)), H(e, r);
			}, S = (e) => {
				let i = /* @__PURE__ */ k(() => Jc(z(o))), a = /* @__PURE__ */ k(() => z(i).style ?? "floating"), c = /* @__PURE__ */ k(() => cl(z(a), z(i).motion)), l = /* @__PURE__ */ k(() => (z(i).seed ?? 0) > 0);
				var u = Gp(), d = P(u);
				r(d, t, () => s, () => z(o));
				var f = I(d, 2);
				n(f, t, () => s, () => z(o));
				var p = I(f, 2), m = N(p), h = I(m);
				{
					let e = /* @__PURE__ */ k(() => Lc.map((e) => [e, Y(`opt.galleryStyle.${e}`)]));
					X(h, {
						get value() {
							return z(a);
						},
						get options() {
							return z(e);
						},
						onchange: (e) => Vr(t(), s, "style", e)
					});
				}
				E(p);
				var g = I(p, 2), _ = (e) => {
					var n = Fp(), r = P(n), a = N(r), o = I(a);
					{
						let e = /* @__PURE__ */ k(() => z(i).fit ?? "cover"), n = /* @__PURE__ */ k(() => [["cover", Y("opt.fit.cover")], ["contain", Y("opt.fit.contain")]]);
						X(o, {
							get value() {
								return z(e);
							},
							get options() {
								return z(n);
							},
							onchange: (e) => Vr(t(), s, "fit", e)
						});
					}
					E(r);
					var c = I(r, 2), l = N(c), u = F(I(l));
					E(c);
					var d = I(c, 2);
					K(d);
					var f = I(d, 2), p = N(f), m = F(I(p));
					E(f);
					var h = I(f, 2);
					K(h);
					var g = I(h, 2), _ = N(g), v = F(I(_));
					E(g);
					var y = I(g, 2);
					K(y), R((e, t, n, r, o) => {
						U(a, `${e ?? ""} `), U(l, `${t ?? ""} `), U(u, `${z(i).interval ?? 12 ?? ""} s`), q(d, z(i).interval ?? 12), U(p, `${n ?? ""} `), U(m, `${r ?? ""} s`), q(h, z(i).fade ?? 1.5), U(_, `${o ?? ""} `), U(v, `${z(i).blur ?? 0 ?? ""} px`), q(y, z(i).blur ?? 0);
					}, [
						() => Y("lbl.fit"),
						() => Y("lbl.secondsPerImage"),
						() => Y("lbl.transition"),
						() => (z(i).fade ?? 1.5).toFixed(1),
						() => Y("lbl.blur")
					]), B("input", d, (e) => Vr(t(), s, "interval", Number(e.target.value))), B("input", h, (e) => Vr(t(), s, "fade", Number(e.target.value))), B("input", y, (e) => Vr(t(), s, "blur", Number(e.target.value))), H(e, n);
				}, v = (e) => {
					var n = Hp(), r = P(n), o = (e) => {
						var n = Ip(), r = P(n), a = N(r), o = I(a);
						{
							let e = /* @__PURE__ */ k(() => String(z(i).rows ?? 2));
							X(o, {
								get value() {
									return z(e);
								},
								options: [["1", "1"], ["2", "2"]],
								onchange: (e) => Vr(t(), s, "rows", Number(e))
							});
						}
						E(r);
						var c = I(r, 2), l = N(c), u = I(l);
						{
							let e = /* @__PURE__ */ k(() => z(i).direction ?? "left"), n = /* @__PURE__ */ k(() => [["left", Y("opt.ribbonDir.left")], ["right", Y("opt.ribbonDir.right")]]);
							X(u, {
								get value() {
									return z(e);
								},
								get options() {
									return z(n);
								},
								onchange: (e) => Vr(t(), s, "direction", e)
							});
						}
						E(c), R((e, t) => {
							U(a, `${e ?? ""} `), U(l, `${t ?? ""} `);
						}, [() => Y("lbl.galleryRows"), () => Y("lbl.photoDirection")]), H(e, n);
					}, c = (e) => {
						var n = Rp(), r = P(n), o = N(r), c = I(o);
						K(c), E(r);
						var u = I(r, 2), d = N(u), f = I(d);
						{
							let e = /* @__PURE__ */ k(() => z(i).repeat === !0 ? "repeat" : "once"), n = /* @__PURE__ */ k(() => [["once", Y("opt.galleryRepeat.once")], ["repeat", Y("opt.galleryRepeat.repeat")]]);
							X(f, {
								get value() {
									return z(e);
								},
								get options() {
									return z(n);
								},
								onchange: (e) => Vr(t(), s, "repeat", e === "repeat")
							});
						}
						E(u);
						var p = I(u, 2), m = N(p), h = I(m);
						{
							let e = /* @__PURE__ */ k(() => z(l) ? "fixed" : "random"), n = /* @__PURE__ */ k(() => [["random", Y("opt.galleryPlace.random")], ["fixed", Y("opt.galleryPlace.fixed")]]);
							X(h, {
								get value() {
									return z(e);
								},
								get options() {
									return z(n);
								},
								onchange: (e) => Vr(t(), s, "seed", e === "fixed" ? Si() : 0)
							});
						}
						E(p);
						var g = I(p, 2), _ = (e) => {
							var n = Lp(), r = N(n);
							G(r, () => C.shuffle);
							var i = I(r);
							E(n), R((e, t) => {
								J(n, "title", e), U(i, ` ${t ?? ""}`);
							}, [() => Y("tip.bg.photoSeed"), () => Y("ui.shufflePhotos")]), B("click", n, () => Vr(t(), s, "seed", Si())), H(e, n);
						};
						W(g, (e) => {
							z(l) && e(_);
						}), R((e, t, n, s, l, f) => {
							J(r, "title", e), U(o, `${t ?? ""} `), J(c, "min", z(a) === "mosaic" ? 4 : 1), q(c, z(i).count ?? (z(a) === "mosaic" ? 12 : 8)), J(u, "title", n), U(d, `${s ?? ""} `), J(p, "title", l), U(m, `${f ?? ""} `);
						}, [
							() => Y("tip.bg.photoCount"),
							() => Y("lbl.photoCount"),
							() => Y("tip.bg.galleryRepeat"),
							() => Y("lbl.galleryRepeat"),
							() => Y("tip.bg.galleryPlace"),
							() => Y("lbl.galleryPlace")
						]), B("change", c, (e) => Vr(t(), s, "count", Number(e.target.value))), H(e, n);
					};
					W(r, (e) => {
						z(a) === "band" ? e(o) : e(c, -1);
					});
					var u = I(r, 2), d = N(u), f = F(I(d));
					E(u);
					var p = I(u, 2);
					K(p);
					var m = I(p, 2), h = (e) => {
						var n = zp(), r = P(n), a = N(r), o = F(I(a));
						E(r);
						var c = I(r, 2);
						K(c);
						var l = I(c, 2), u = N(l), d = F(I(u));
						E(l);
						var f = I(l, 2);
						K(f), R((e, t, n, s) => {
							J(r, "title", e), U(a, `${t ?? ""} `), U(o, `${n ?? ""}%`), q(c, z(i).spread ?? .85), U(u, `${s ?? ""} `), U(d, `${z(i).tilt ?? 5 ?? ""}°`), q(f, z(i).tilt ?? 5);
						}, [
							() => Y("tip.bg.photoSpread"),
							() => Y("lbl.photoSpread"),
							() => Math.round((z(i).spread ?? .85) * 100),
							() => Y("lbl.photoTilt")
						]), B("input", c, (e) => Vr(t(), s, "spread", Number(e.target.value))), B("input", f, (e) => Vr(t(), s, "tilt", Number(e.target.value))), H(e, n);
					};
					W(m, (e) => {
						z(a) === "floating" && e(h);
					});
					var g = I(m, 2), _ = N(g), v = I(_);
					{
						let e = /* @__PURE__ */ k(() => z(i).shape ?? "rect"), n = /* @__PURE__ */ k(() => Rc.map((e) => [e, Y(`opt.galleryShape.${e}`)]));
						X(v, {
							get value() {
								return z(e);
							},
							get options() {
								return z(n);
							},
							onchange: (e) => Vr(t(), s, "shape", e)
						});
					}
					E(g);
					var y = I(g, 2), b = N(y), x = I(b);
					{
						let e = /* @__PURE__ */ k(() => z(i).look ?? "shadow"), n = /* @__PURE__ */ k(() => zc.map((e) => [e, Y(`opt.galleryLook.${e}`)]));
						X(x, {
							get value() {
								return z(e);
							},
							get options() {
								return z(n);
							},
							onchange: (e) => Vr(t(), s, "look", e)
						});
					}
					E(y);
					var S = I(y, 2), ee = (e) => {
						var n = Bp(), r = N(n), a = I(r);
						{
							let e = /* @__PURE__ */ k(() => ml(z(i).look, z(i).frameColor)), n = /* @__PURE__ */ k(Ri), r = /* @__PURE__ */ k(() => Y("tip.bg.frameColor"));
							ba(a, {
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
								onchange: (e) => Vr(t(), s, "frameColor", e ?? "")
							});
						}
						E(n), R((e) => U(r, `${e ?? ""} `), [() => Y("lbl.frameColor")]), H(e, n);
					}, te = /* @__PURE__ */ k(() => pl(z(i).look));
					W(S, (e) => {
						z(te) && e(ee);
					});
					var ne = I(S, 2), re = (e) => {
						var n = Vp(), r = P(n), a = N(r), o = F(I(a));
						E(r);
						var c = I(r, 2);
						K(c), R((e) => {
							U(a, `${e ?? ""} `), U(o, `${z(i).radius ?? 5 ?? ""} px`), q(c, z(i).radius ?? 5);
						}, [() => Y("lbl.rounding")]), B("input", c, (e) => Vr(t(), s, "radius", Number(e.target.value))), H(e, n);
					}, ie = /* @__PURE__ */ k(() => yl(z(i).shape) && (z(i).look ?? "shadow") !== "polaroid");
					W(ne, (e) => {
						z(ie) && e(re);
					}), R((e, t, n, r, i, a, o) => {
						U(d, `${e ?? ""} `), U(f, `${t ?? ""} px`), q(p, n), J(g, "title", r), U(_, `${i ?? ""} `), J(y, "title", a), U(b, `${o ?? ""} `);
					}, [
						() => Y("lbl.size"),
						() => fl(z(i).size, z(a)),
						() => fl(z(i).size, z(a)),
						() => Y("tip.bg.galleryShape"),
						() => Y("lbl.galleryShape"),
						() => Y("tip.bg.galleryLook"),
						() => Y("lbl.galleryLook")
					]), B("input", p, (e) => Vr(t(), s, "size", Number(e.target.value))), H(e, n);
				};
				W(g, (e) => {
					z(a) === "fill" ? e(_) : e(v, -1);
				});
				var y = I(g, 2), b = N(y), x = I(b);
				{
					let e = /* @__PURE__ */ k(() => z(i).tone ?? "natural"), n = /* @__PURE__ */ k(() => Bc.map((e) => [e, Y(`opt.galleryTone.${e}`)]));
					X(x, {
						get value() {
							return z(e);
						},
						get options() {
							return z(n);
						},
						onchange: (e) => Vr(t(), s, "tone", e)
					});
				}
				E(y);
				var S = I(y, 2), ee = (e) => {
					var n = Bp(), r = N(n), i = I(r);
					{
						let e = /* @__PURE__ */ k(() => ll(z(a)).map((e) => [e, Y(e === "none" ? "common.none" : `opt.galleryMotion.${e}`)]));
						X(i, {
							get value() {
								return z(c);
							},
							get options() {
								return z(e);
							},
							onchange: (e) => Vr(t(), s, "motion", e)
						});
					}
					E(n), R((e, t) => {
						J(n, "title", e), U(r, `${t ?? ""} `);
					}, [() => Y("tip.bg.photoMotion"), () => Y("lbl.motion")]), H(e, n);
				}, te = /* @__PURE__ */ k(() => ll(z(a)).length > 1);
				W(S, (e) => {
					z(te) && e(ee);
				});
				var ne = I(S, 2), re = (e) => {
					var n = Up(), r = P(n), a = N(r), o = F(I(a));
					E(r);
					var c = I(r, 2);
					K(c), R((e) => {
						U(a, `${e ?? ""} `), U(o, `${z(i).interval ?? 12 ?? ""} s`), q(c, z(i).interval ?? 12);
					}, [() => Y("lbl.secondsPerImage")]), B("input", c, (e) => Vr(t(), s, "interval", Number(e.target.value))), H(e, n);
				}, ie = (e) => {
					var n = Up(), r = P(n), a = N(r), o = F(I(a));
					E(r);
					var c = I(r, 2);
					K(c), R((e) => {
						U(a, `${e ?? ""} `), U(o, `${z(i).motionSpeed ?? 30 ?? ""} s`), q(c, z(i).motionSpeed ?? 30);
					}, [() => Y("lbl.motionSpeed")]), B("input", c, (e) => Vr(t(), s, "motionSpeed", Number(e.target.value))), H(e, n);
				};
				W(ne, (e) => {
					z(c) === "crossfade" && z(a) !== "fill" ? e(re) : (z(c) !== "none" || z(a) === "band") && e(ie, 1);
				});
				var ae = I(ne, 2), oe = N(ae);
				K(oe);
				var se = I(oe);
				E(ae);
				var ce = I(ae, 2), w = (e) => {
					var n = Wp();
					let r;
					var a = N(n);
					K(a);
					var o = I(a);
					E(n), R((e, t) => {
						r = gi(n, 1, "gridmenu-snap svelte-1n46o8q", null, r, { muted: z(i).underNav === !1 }), J(n, "title", e), Ci(a, z(i).underAnnounce === !0), a.disabled = z(i).underNav === !1, U(o, ` ${t ?? ""}`);
					}, [() => Y("tip.bg.underAnnounce"), () => Y("lbl.underAnnounce")]), B("change", a, (e) => e.target.checked ? Br(t(), s, {
						underAnnounce: !0,
						underNav: !0
					}) : Vr(t(), s, "underAnnounce", !1)), H(e, n);
				};
				W(ce, (e) => {
					z(O).nav?.announcement?.text && e(w);
				});
				var le = I(ce, 2), ue = N(le), de = F(I(ue));
				E(le);
				var fe = I(le, 2);
				K(fe), R((e, t, n, r, a, o, s, c) => {
					J(p, "title", e), U(m, `${t ?? ""} `), J(y, "title", n), U(b, `${r ?? ""} `), J(ae, "title", a), Ci(oe, z(i).underNav !== !1), U(se, ` ${o ?? ""}`), U(ue, `${s ?? ""} `), U(de, `${c ?? ""}%`), q(fe, z(i).opacity ?? .85);
				}, [
					() => Y("tip.bg.galleryStyle"),
					() => Y("lbl.galleryStyle"),
					() => Y("tip.bg.galleryTone"),
					() => Y("lbl.galleryTone"),
					() => Y("tip.bg.underNav"),
					() => Y("lbl.underNav"),
					() => Y("lbl.strength"),
					() => Math.round((z(i).opacity ?? .85) * 100)
				]), B("change", oe, (e) => e.target.checked ? Vr(t(), s, "underNav", !0) : Br(t(), s, {
					underNav: !1,
					underAnnounce: !1
				})), B("input", fe, (e) => Vr(t(), s, "opacity", Number(e.target.value))), H(e, u);
			}, ee = (e) => {
				var n = qp(), r = P(n), i = N(r), a = I(i);
				E(r);
				var c = I(r, 2), l = N(c), u = I(l);
				E(c);
				var d = I(c, 2), f = N(d), p = I(f);
				{
					let e = /* @__PURE__ */ k(() => z(o).props.fit ?? "cover"), n = /* @__PURE__ */ k(() => [["cover", Y("opt.fit.cover")], ["contain", Y("opt.fit.contain")]]);
					X(p, {
						get value() {
							return z(e);
						},
						get options() {
							return z(n);
						},
						onchange: (e) => Vr(t(), s, "fit", e)
					});
				}
				E(d);
				var m = I(d, 2), h = N(m), g = F(I(h));
				E(m);
				var _ = I(m, 2);
				K(_);
				var v = I(_, 2), y = N(v), b = F(I(y));
				E(v);
				var x = I(v, 2);
				K(x);
				var S = I(x, 2), ee = N(S), te = F(I(ee));
				E(S);
				var ne = I(S, 2);
				K(ne);
				var C = I(ne, 2), re = N(C);
				K(re);
				var ie = I(re);
				E(C);
				var ae = I(C, 2), oe = (e) => {
					var n = Kp(), r = P(n), i = N(r), a = F(I(i));
					E(r);
					var c = I(r, 2);
					K(c), R((e, t) => {
						U(i, `${e ?? ""} `), U(a, `${t ?? ""}%`), q(c, z(o).props.parallax ?? .3);
					}, [() => Y("lbl.parallaxStrength"), () => Math.round((z(o).props.parallax ?? 0) * 100)]), B("input", c, (e) => Vr(t(), s, "parallax", Number(e.target.value))), H(e, n);
				};
				W(ae, (e) => {
					(z(o).props.parallax ?? 0) > 0 && e(oe);
				}), R((e, t, n, a, s, u, p, m, v, S, ae, oe, se, ce) => {
					J(r, "title", e), U(i, `${t ?? ""} `), J(c, "title", n), U(l, `${a ?? ""} `), J(d, "title", s), U(f, `${u ?? ""} `), U(h, `${p ?? ""} `), U(g, `${m ?? ""}%`), q(_, z(o).props.x ?? .5), U(y, `${v ?? ""} `), U(b, `${S ?? ""}%`), q(x, z(o).props.y ?? .5), U(ee, `${ae ?? ""} `), U(te, `${oe ?? ""}%`), q(ne, z(o).props.opacity ?? 1), J(C, "title", se), Ci(re, (z(o).props.parallax ?? 0) > 0), U(ie, ` ${ce ?? ""}`);
				}, [
					() => Y("tip.bg.videoFile"),
					() => z(o).props.src ? Y("ui.changeVideo") : Y("ui.chooseVideo"),
					() => Y("tip.bg.poster"),
					() => z(o).props.poster ? Y("ui.changeImage") : Y("ui.choosePoster"),
					() => Y("tip.bg.fit"),
					() => Y("lbl.fit"),
					() => Y("lbl.horizontal"),
					() => Math.round((z(o).props.x ?? .5) * 100),
					() => Y("lbl.vertical"),
					() => Math.round((z(o).props.y ?? .5) * 100),
					() => Y("lbl.strength"),
					() => Math.round((z(o).props.opacity ?? 1) * 100),
					() => Y("tip.bg.parallax"),
					() => Y("lbl.parallax")
				]), B("change", a, (e) => _i(t(), s, e)), B("change", u, (e) => yi(t(), s, e)), B("input", _, (e) => Vr(t(), s, "x", Number(e.target.value))), B("input", x, (e) => Vr(t(), s, "y", Number(e.target.value))), B("input", ne, (e) => Vr(t(), s, "opacity", Number(e.target.value))), B("change", re, (e) => Vr(t(), s, "parallax", e.target.checked ? .3 : 0)), H(e, n);
			};
			W(h, (e) => {
				z(o).type === "color" ? e(g) : z(o).type === "gradient" ? e(_, 1) : z(o).type === "glow" ? e(v, 2) : z(o).type === "grain" ? e(y, 3) : z(o).type === "pattern" ? e(b, 4) : z(o).type === "image" ? e(x, 5) : z(o).type === "slideshow" ? e(S, 6) : z(o).type === "video" && e(ee, 7);
			}), E(c), R((e, t, n) => {
				J(f, "title", e), J(p, "title", t), p.disabled = s === a().length - 1, J(m, "title", n);
			}, [
				() => Y("hint.bg.order"),
				() => Y("hint.bg.order"),
				() => Y("tip.bg.removeLayer")
			]), B("click", f, () => zr(t(), s, -1)), B("click", p, () => zr(t(), s, 1)), B("click", m, () => Rr(t(), s)), H(e, c);
		});
		var c = I(s, 2), l = N(c), u = I(l);
		{
			let e = /* @__PURE__ */ k(() => te.map(([e, t]) => [e, t.labelKey ? Y(t.labelKey) : t.label]));
			X(u, {
				get value() {
					return z(Ir);
				},
				get options() {
					return z(e);
				},
				onchange: (e) => j(Ir, e, !0)
			});
		}
		E(c);
		var d = I(c, 2), p = F(d, !0);
		R((e, t) => {
			U(l, `${e ?? ""} `), U(p, t);
		}, [() => Y("lbl.newLayer"), () => Y("ui.addLayer")]), B("click", d, () => Lr(t(), z(Ir))), H(e, o);
	}, o = (e, t = f, n = f) => {
		var r = Nr();
		Jr(P(r), 17, n, Wr, (e, r, i) => {
			var a = Zp(), o = N(a);
			K(o);
			var s = I(o, 2), c = N(s);
			c.disabled = i === 0, G(c, () => C.up, !0), E(c);
			var l = I(c, 2);
			G(l, () => C.down, !0), E(l);
			var u = I(l, 2);
			G(u, () => C.cross, !0), E(u), E(s);
			var d = I(s, 2), f = N(d);
			{
				let e = /* @__PURE__ */ k(() => z(r).page ?? "__href"), n = /* @__PURE__ */ k(() => Y("tip.linkTarget")), a = /* @__PURE__ */ k(() => [...z(O).pages.map((e) => [e.id, e.title]), ["__href", Y("opt.linkHref")]]);
				X(f, {
					get value() {
						return z(e);
					},
					get title() {
						return z(n);
					},
					get options() {
						return z(a);
					},
					onchange: (e) => sd(t(), i, e)
				});
			}
			E(d);
			var p = I(d, 2), m = (e) => {
				var n = Xp();
				K(n), R((e, t) => {
					q(n, z(r).href ?? ""), J(n, "placeholder", e), J(n, "title", t);
				}, [() => Y("ph.hrefAnchor"), () => Y("tip.hrefAnchor")]), B("change", n, (e) => cd(t(), i, e.target.value)), H(e, n);
			};
			W(p, (e) => {
				z(r).page || e(m);
			}), E(a), R((e, t) => {
				q(o, z(r).label), J(o, "title", e), l.disabled = i === n().length - 1, J(u, "title", t);
			}, [() => Y("tip.linkLabel"), () => Y("tip.removeLink")]), B("input", o, (e) => od(t(), i, e.target.value)), B("click", c, () => ad(t(), i, -1)), B("click", l, () => ad(t(), i, 1)), B("click", u, () => id(t(), i)), H(e, a);
		}), H(e, r);
	}, s = (e) => {
		let t = /* @__PURE__ */ k(() => z(M).props.boxStyle ?? {});
		var n = $p(), r = P(n), i = N(r), a = I(i);
		{
			let e = /* @__PURE__ */ k(() => z(t).bg ?? ""), n = /* @__PURE__ */ k(Ri), r = /* @__PURE__ */ k(() => Y("tip.box.bg"));
			ba(a, {
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
				onchange: (e) => jn({ bg: e || null })
			});
		}
		E(r);
		var o = I(r, 2), s = N(o), c = I(s);
		{
			let e = /* @__PURE__ */ k(() => z(t).shadow ?? ""), n = /* @__PURE__ */ k(() => [
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
				onchange: (e) => jn({ shadow: e || null })
			});
		}
		E(o);
		var l = I(o, 2), u = (e) => {
			var n = Bp(), r = N(n), i = I(r);
			{
				let e = /* @__PURE__ */ k(() => z(t).shadowColor ?? ""), n = /* @__PURE__ */ k(Ri), r = /* @__PURE__ */ k(() => Y("tip.box.shadowColor"));
				ba(i, {
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
					onchange: (e) => jn({ shadowColor: e || null })
				});
			}
			E(n), R((e) => U(r, `${e ?? ""} `), [() => Y("lbl.shadowColor")]), H(e, n);
		};
		W(l, (e) => {
			z(t).shadow && e(u);
		});
		var d = I(l, 2), f = N(d), p = I(f);
		{
			let e = /* @__PURE__ */ k(() => z(t).border === "none" ? "none" : z(t).border ? "custom" : ""), n = /* @__PURE__ */ k(() => [
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
				onchange: (e) => jn({ border: e === "custom" ? {
					color: "accent",
					width: 1
				} : e || null })
			});
		}
		E(d);
		var m = I(d, 2), h = (e) => {
			let n = /* @__PURE__ */ k(() => typeof z(t).border == "object" ? z(t).border : {
				color: "text",
				width: 1
			});
			var r = Qp(), i = P(r), a = N(i), o = I(a);
			{
				let e = /* @__PURE__ */ k(Ri), t = /* @__PURE__ */ k(() => Y("tip.box.borderColor"));
				ba(o, {
					get value() {
						return z(n).color;
					},
					get tokens() {
						return z(e);
					},
					get label() {
						return z(t);
					},
					onchange: (e) => jn({ border: {
						...z(n),
						color: e
					} })
				});
			}
			E(i);
			var s = I(i, 2), c = N(s), l = I(c), u = N(l), d = I(u, 2);
			K(d);
			var f = I(d, 2);
			E(l), E(s), R((e, t, r, i, o, s) => {
				U(a, `${e ?? ""} `), U(c, `${t ?? ""} `), J(u, "title", r), J(u, "aria-label", i), q(d, z(n).width), J(f, "title", o), J(f, "aria-label", s);
			}, [
				() => Y("lbl.borderColor"),
				() => Y("lbl.thicknessPx"),
				() => Y("tip.thinner"),
				() => Y("tip.thinner"),
				() => Y("tip.thicker"),
				() => Y("tip.thicker")
			]), B("click", u, () => jn({ border: {
				...z(n),
				width: Math.max(1, z(n).width - 1)
			} })), B("change", d, (e) => jn({ border: {
				...z(n),
				width: Math.min(12, Math.max(1, Number(e.target.value) || 1))
			} })), B("click", f, () => jn({ border: {
				...z(n),
				width: Math.min(12, z(n).width + 1)
			} })), H(e, r);
		};
		W(m, (e) => {
			z(t).border !== "none" && e(h);
		});
		var g = I(m, 2), _ = N(g);
		K(_);
		var v = I(_);
		E(g), R((e, t, n, r, a, o) => {
			U(i, `${e ?? ""} `), U(s, `${t ?? ""} `), U(f, `${n ?? ""} `), J(g, "title", r), Ci(_, a), U(v, ` ${o ?? ""}`);
		}, [
			() => Y("lbl.blockColor"),
			() => Y("lbl.shadow"),
			() => Y("lbl.border"),
			() => Y("tip.box.glass"),
			() => !!z(t).glass,
			() => Y("lbl.glass")
		]), B("change", _, (e) => jn({ glass: e.target.checked || null })), H(e, n);
	}, c = (e) => {
		var t = Ph(), n = P(t), r = N(n), i = N(r);
		let a;
		var o = F(i, !0), c = I(i, 2);
		let l;
		var u = F(c, !0);
		E(r), E(n);
		var d = I(n, 2), f = (e) => {
			var t = Nr(), n = P(t), r = (e) => {
				var t = em(), n = F(t, !0);
				R((e) => U(n, e), [() => Y("hint.textInline")]), H(e, t);
			}, i = (e) => {
				var t = am(), n = P(t), r = N(n), i = I(r);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.mode ?? "mailto"), t = /* @__PURE__ */ k(() => [["mailto", Y("form.modeMailto")], ["endpoint", Y("form.modeEndpoint")]]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => L("mode", e)
					});
				}
				E(n);
				var a = I(n, 2), o = (e) => {
					var t = tm(), n = N(t), r = I(n);
					K(r), E(t), R((e, i, a) => {
						J(t, "title", e), U(n, `${i ?? ""} `), q(r, z(M).props.endpoint ?? ""), J(r, "placeholder", a);
					}, [
						() => Y("form.endpointNote"),
						() => Y("form.endpoint"),
						() => Y("form.endpointPh")
					]), B("change", r, (e) => L("endpoint", e.target.value.trim())), H(e, t);
				}, s = (e) => {
					var t = nm(), n = P(t), r = N(n), i = I(r);
					K(i), E(n);
					var a = I(n, 2), o = N(a), s = I(o);
					K(s), E(a), R((e, t, n, a) => {
						U(r, `${e ?? ""} `), q(i, z(M).props.recipient ?? ""), J(i, "placeholder", t), U(o, `${n ?? ""} `), q(s, z(M).props.subject ?? ""), J(s, "placeholder", a);
					}, [
						() => Y("form.recipient"),
						() => Y("form.recipientPh"),
						() => Y("form.subject"),
						() => Y("form.subjectPh")
					]), B("change", i, (e) => L("recipient", e.target.value.trim())), B("change", s, (e) => L("subject", e.target.value.trim())), H(e, t);
				};
				W(a, (e) => {
					(z(M).props.mode ?? "mailto") === "endpoint" ? e(o) : e(s, -1);
				});
				var c = I(a, 2), l = F(c, !0), u = I(c, 2);
				Jr(u, 19, () => z(M).props.fields ?? [], (e, t) => e.id ?? t, (e, t, n) => {
					var r = im(), i = P(r), a = N(i);
					K(a);
					var o = I(a, 2);
					{
						let e = /* @__PURE__ */ k(() => z(t).type ?? "text"), r = /* @__PURE__ */ k(() => Mn.map((e) => [e, Y(`form.type${e[0].toUpperCase()}${e.slice(1)}`)]));
						X(o, {
							get value() {
								return z(e);
							},
							get options() {
								return z(r);
							},
							onchange: (e) => Fn(z(n), { type: e })
						});
					}
					var s = I(o, 2), c = N(s);
					G(c, () => C.up, !0), E(c);
					var l = I(c, 2);
					G(l, () => C.down, !0), E(l);
					var u = I(l, 2);
					G(u, () => C.cross, !0), E(u), E(s), E(i);
					var d = I(i, 2), f = N(d);
					K(f);
					var p = I(f);
					E(d);
					var m = I(d, 2), h = (e) => {
						var r = rm();
						K(r), R((e, t) => {
							q(r, e), J(r, "placeholder", t);
						}, [() => (z(t).options ?? []).join(", "), () => Y("form.optionsPh")]), B("change", r, (e) => In(z(n), e.target.value)), H(e, r);
					}, g = /* @__PURE__ */ k(() => Nn.has(z(t).type));
					W(m, (e) => {
						z(g) && e(h);
					}), R((e, r, i) => {
						q(a, z(t).label), J(a, "placeholder", e), c.disabled = z(n) === 0, l.disabled = z(n) === (z(M).props.fields?.length ?? 0) - 1, J(u, "title", r), Ci(f, z(t).required === !0), U(p, ` ${i ?? ""}`);
					}, [
						() => Y("form.fieldNamePh"),
						() => Y("form.removeField"),
						() => Y("form.required")
					]), B("change", a, (e) => Fn(z(n), { label: e.target.value.trim() || Y("form.fieldFallback") })), B("click", c, () => zn(z(n), -1)), B("click", l, () => zn(z(n), 1)), B("click", u, () => Rn(z(n))), B("change", f, (e) => Fn(z(n), { required: e.target.checked })), H(e, r);
				});
				var d = I(u, 2), f = F(d, !0), p = I(d, 2), m = N(p), h = I(m);
				K(h), E(p);
				var g = I(p, 2), _ = N(g), v = I(_);
				K(v), E(g), R((e, t, i, a, o, s, c, u) => {
					J(n, "title", e), U(r, `${t ?? ""} `), U(l, i), U(f, a), U(m, `${o ?? ""} `), q(h, z(M).props.submitLabel ?? ""), J(h, "placeholder", s), U(_, `${c ?? ""} `), q(v, z(M).props.successText ?? ""), J(v, "placeholder", u);
				}, [
					() => Y("form.modeTitle"),
					() => Y("form.mode"),
					() => Y("form.fields"),
					() => Y("form.addField"),
					() => Y("lbl.buttonText"),
					() => Y("form.sendDefault"),
					() => Y("form.receipt"),
					() => Y("form.thanksDefault")
				]), B("click", d, Ln), B("change", h, (e) => L("submitLabel", e.target.value.trim() || Y("form.sendDefault"))), B("change", v, (e) => L("successText", e.target.value.trim() || Y("form.thanksDefault"))), H(e, t);
			}, a = (e) => {
				var t = _m(), n = P(t), r = F(n, !0), i = I(n, 2);
				Jr(i, 17, () => z(M).props.sources ?? [], Wr, (e, t, n) => {
					let r = /* @__PURE__ */ k(() => Bn(z(t)));
					var i = om(), a = N(i), o = N(a);
					K(o);
					var s = I(o, 2);
					G(s, () => C.cross, !0), E(s), E(a);
					var c = I(a, 2), l = N(c);
					K(l);
					var u = I(l, 2);
					{
						let e = /* @__PURE__ */ k(() => z(r).color || "accent"), t = /* @__PURE__ */ k(Ri), i = /* @__PURE__ */ k(() => Y("tip.calendar.sourceColor"));
						ba(u, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							allowClear: !0,
							get label() {
								return z(i);
							},
							onchange: (e) => Hn(n, { color: e ?? "" })
						});
					}
					E(c), E(i), R((e, t, n, i, a) => {
						q(o, z(r).url), J(o, "placeholder", e), J(o, "title", t), J(s, "title", n), q(l, z(r).name), J(l, "placeholder", i), J(l, "title", a);
					}, [
						() => Y("calendar.sourcesPh"),
						() => Y("calendar.sourceUrl"),
						() => Y("ui.remove"),
						() => Y("calendar.sourceName"),
						() => Y("tip.calendar.sourceName")
					]), B("change", o, (e) => Hn(n, { url: e.target.value.trim() })), B("click", s, () => Wn(n)), B("change", l, (e) => Hn(n, { name: e.target.value.trim() })), H(e, i);
				});
				var a = I(i, 2), o = N(a);
				G(o, () => C.plus);
				var s = I(o);
				E(a);
				var c = I(a, 2), l = N(c);
				G(l, () => C.plus);
				var u = I(l);
				E(c);
				var d = I(c, 2), f = (e) => {
					let t = /* @__PURE__ */ k(() => z(Gn).filter((e) => !(z(M).props.sources ?? []).some((t) => Bn(t).url === e)));
					var n = lm(), r = P(n);
					Jr(r, 16, () => z(t), (e) => e, (e, t) => {
						var n = sm(), r = F(n, !0);
						R(() => {
							J(n, "title", t), U(r, t);
						}), B("click", n, () => qn(t)), H(e, n);
					});
					var i = I(r, 2), a = (e) => {
						var t = cm(), n = F(t, !0);
						R((e) => U(n, e), [() => Y("calendar.siteSourcesNone")]), H(e, t);
					};
					W(i, (e) => {
						z(t).length || e(a);
					}), H(e, n);
				};
				W(d, (e) => {
					z(Gn) && e(f);
				});
				var p = I(d, 2), m = (e) => {
					var t = Bp(), n = N(t), r = I(n);
					{
						let e = /* @__PURE__ */ k(() => z(M).props.view ?? "list"), t = /* @__PURE__ */ k(() => [
							["list", Y("calendar.viewList")],
							["cards", Y("calendar.viewCards")],
							["month", Y("calendar.viewMonth")],
							["agenda", Y("calendar.viewAgenda")],
							["next", Y("calendar.viewNext")]
						]);
						X(r, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => L("view", e)
						});
					}
					E(t), R((e) => U(n, `${e ?? ""} `), [() => Y("lbl.view")]), H(e, t);
				}, h = /* @__PURE__ */ k(() => !Uf(z(M).props.design).view);
				W(p, (e) => {
					z(h) && e(m);
				});
				var g = I(p, 2), _ = (e) => {
					var t = um(), n = N(t);
					K(n);
					var r = I(n);
					E(t), R((e, i) => {
						J(t, "title", e), Ci(n, z(M).props.switcher === !0), U(r, ` ${i ?? ""}`);
					}, [() => Y("tip.calendar.switcher"), () => Y("calendar.switcher")]), B("change", n, (e) => L("switcher", e.target.checked || void 0)), H(e, t);
				}, v = /* @__PURE__ */ k(() => Gf.includes(Wf(z(M).props)));
				W(g, (e) => {
					z(v) && e(_);
				});
				var y = I(g, 2), b = (e) => {
					var t = dm(), n = P(t), r = N(n), i = I(r);
					K(i), E(n);
					var a = I(n, 2), o = (e) => {
						var t = um(), n = N(t);
						K(n);
						var r = I(n);
						E(t), R((e, i) => {
							J(t, "title", e), Ci(n, z(M).props.showMore !== !1), U(r, ` ${i ?? ""}`);
						}, [() => Y("tip.calendar.showMore"), () => Y("calendar.showMore")]), B("change", n, (e) => L("showMore", e.target.checked ? void 0 : !1)), H(e, t);
					}, s = /* @__PURE__ */ k(() => Wf(z(M).props) === "list" && Uf(z(M).props.design).module !== "more");
					W(a, (e) => {
						z(s) && e(o);
					}), R((e, t) => {
						J(n, "title", e), U(r, `${t ?? ""} `), q(i, z(M).props.limit ?? 6);
					}, [() => Y("tip.collection.limit"), () => Y("lbl.maxCount")]), B("change", i, (e) => L("limit", Math.max(1, Math.min(50, Number(e.target.value) || 6)))), H(e, t);
				}, x = /* @__PURE__ */ k(() => [
					"list",
					"cards",
					"agenda"
				].includes(z(M).props.view ?? "list"));
				W(y, (e) => {
					z(x) && e(b);
				});
				var S = I(y, 2), ee = (e) => {
					var t = fm(), n = P(t);
					{
						let e = /* @__PURE__ */ k(() => Y("calendar.nextCount")), t = /* @__PURE__ */ k(() => Y("tip.calendar.nextCount")), r = /* @__PURE__ */ k(() => String(Math.min(3, Math.max(1, Number(z(M).props.nextCount) || 1))));
						Es(n, {
							get label() {
								return z(e);
							},
							get title() {
								return z(t);
							},
							get value() {
								return z(r);
							},
							options: [
								["1", "1"],
								["2", "2"],
								["3", "3"]
							],
							onchange: (e) => L("nextCount", Number(e))
						});
					}
					var r = I(n, 2), i = N(r), a = F(i, !0), o = I(i, 2);
					K(o);
					var s = F(I(o, 2), !0);
					E(r), R((e, t) => {
						J(r, "title", e), U(a, t), q(o, z(M).props.laterCount ?? 0), U(s, z(M).props.laterCount ?? 0);
					}, [() => Y("tip.calendar.laterCount"), () => Y("calendar.laterCount")]), B("input", o, (e) => L("laterCount", e.target.valueAsNumber)), H(e, t);
				};
				W(S, (e) => {
					z(M).props.view === "next" && e(ee);
				});
				var te = I(S, 2), ne = N(te), re = I(ne);
				K(re), E(te);
				var ie = I(te, 2), ae = N(ie), oe = I(ae);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.emptyIcon === "none" ? "" : z(M).props.emptyIcon ?? "calendar"), t = /* @__PURE__ */ k(() => Y("tip.calendar.emptyIcon"));
					jo(oe, {
						iconsOnly: !0,
						get icon() {
							return z(e);
						},
						klass: "lbtn-mark",
						get label() {
							return z(t);
						},
						onpick: (e) => L("emptyIcon", e.icon || "none"),
						children: (e, t) => {
							var n = Nr(), r = P(n), i = (e) => {
								var t = Nr();
								G(P(t), () => no(z(M).props.emptyIcon ?? "calendar") || no("calendar")), H(e, t);
							};
							W(r, (e) => {
								z(M).props.emptyIcon !== "none" && e(i);
							}), H(e, n);
						},
						$$slots: { default: !0 }
					});
				}
				E(ie);
				var se = I(ie, 2), ce = (e) => {
					var t = um(), n = N(t);
					K(n);
					var r = I(n);
					E(t), R((e) => {
						Ci(n, z(M).props.showCategories !== !1), U(r, ` ${e ?? ""}`);
					}, [() => Y("calendar.showCategories")]), B("change", n, (e) => L("showCategories", e.target.checked)), H(e, t);
				}, w = /* @__PURE__ */ k(() => !Uf(z(M).props.design).ownFilter);
				W(se, (e) => {
					z(w) && e(ce);
				});
				var le = I(se, 2), ue = N(le);
				K(ue);
				var de = I(ue);
				E(le);
				var fe = I(le, 2), T = N(fe);
				K(T);
				var pe = I(T);
				E(fe);
				var me = I(fe, 2), he = (e) => {
					var t = um(), n = N(t);
					K(n);
					var r = I(n);
					E(t), R((e, i) => {
						J(t, "title", e), Ci(n, z(M).props.showOpen !== !1), U(r, ` ${i ?? ""}`);
					}, [() => Y("tip.calendar.showOpen"), () => Y("calendar.showOpen")]), B("change", n, (e) => L("showOpen", e.target.checked ? void 0 : !1)), H(e, t);
				}, ge = /* @__PURE__ */ k(() => Uf(z(M).props.design).open);
				W(me, (e) => {
					z(ge) && e(he);
				});
				var _e = I(me, 2), ve = (e) => {
					var t = pm(), n = N(t), r = I(n);
					K(r), E(t), R((e, i) => {
						J(t, "title", e), U(n, `${i ?? ""} `), q(r, z(M).props.programHref ?? "");
					}, [() => Y("tip.calendar.programHref"), () => Y("calendar.programHref")]), B("change", r, (e) => L("programHref", e.target.value.trim() || void 0)), H(e, t);
				}, ye = /* @__PURE__ */ k(() => Uf(z(M).props.design).program);
				W(_e, (e) => {
					z(ye) && e(ve);
				});
				var be = I(_e, 2), xe = (e) => {
					var t = hm(), n = P(t), r = N(n);
					K(r);
					var i = I(r);
					E(n);
					var a = I(n, 2), o = (e) => {
						var t = mm(), n = P(t), r = (e) => {
							{
								let t = /* @__PURE__ */ k(() => Y("calendar.noticeAs")), n = /* @__PURE__ */ k(() => Y("tip.calendar.noticeAs")), r = /* @__PURE__ */ k(() => z(M).props.notice?.as === "band" ? "band" : "note"), i = /* @__PURE__ */ k(() => [["note", Y("calendar.noticeAsNote")], ["band", Y("calendar.noticeAsBand")]]);
								Es(e, {
									get label() {
										return z(t);
									},
									get title() {
										return z(n);
									},
									get value() {
										return z(r);
									},
									get options() {
										return z(i);
									},
									onchange: (e) => L("notice", {
										...z(M).props.notice ?? {},
										as: e === "band" ? "band" : void 0
									})
								});
							}
						}, i = /* @__PURE__ */ k(() => Uf(z(M).props.design).noticeBand);
						W(n, (e) => {
							z(i) && e(r);
						});
						var a = I(n, 2), o = N(a), s = I(o);
						K(s), E(a), R((e, t) => {
							J(a, "title", e), U(o, `${t ?? ""} `), q(s, z(M).props.notice?.href ?? "");
						}, [() => Y("tip.calendar.noticeHref"), () => Y("calendar.noticeHref")]), B("change", s, (e) => L("notice", {
							...z(M).props.notice ?? {},
							href: e.target.value.trim() || void 0
						})), H(e, t);
					};
					W(a, (e) => {
						z(M).props.notice?.show === !0 && e(o);
					}), R((e, t) => {
						J(n, "title", e), Ci(r, z(M).props.notice?.show === !0), U(i, ` ${t ?? ""}`);
					}, [() => Y("tip.calendar.showNotice"), () => Y("calendar.showNotice")]), B("change", r, (e) => L("notice", {
						...z(M).props.notice ?? {},
						show: e.target.checked
					})), H(e, t);
				}, Se = /* @__PURE__ */ k(() => Uf(z(M).props.design).notice);
				W(be, (e) => {
					z(Se) && e(xe);
				});
				var Ce = I(be, 2), we = (e) => {
					var t = gm(), n = F(t, !0);
					R((e, r) => {
						J(t, "title", e), U(n, r);
					}, [() => Y("tip.calendar.resetTexts"), () => Y("calendar.resetTexts")]), B("click", t, () => L("texts", void 0)), H(e, t);
				}, Te = /* @__PURE__ */ k(() => $f(Uf(z(M).props.design), z(M).props.texts));
				W(Ce, (e) => {
					z(Te) && e(we);
				}), R((e, t, i, a, o, l, d, f, p, m, h, g) => {
					J(n, "title", e), U(r, t), U(s, ` ${i ?? ""}`), J(c, "title", a), U(u, ` ${o ?? ""}`), J(te, "title", l), U(ne, `${d ?? ""} `), q(re, z(M).props.emptyText ?? ""), J(re, "placeholder", f), J(ie, "title", p), U(ae, `${m ?? ""} `), Ci(ue, z(M).props.showSubscribe !== !1), U(de, ` ${h ?? ""}`), Ci(T, z(M).props.showSignup !== !1), U(pe, ` ${g ?? ""}`);
				}, [
					() => Y("calendar.sourcesPh"),
					() => Y("calendar.sources"),
					() => Y("ui.addCalendar"),
					() => Y("tip.calendar.siteSources"),
					() => Y("calendar.siteSources"),
					() => Y("tip.calendar.emptyText"),
					() => Y("calendar.emptyText"),
					() => Y("calendar.emptyPh"),
					() => Y("tip.calendar.emptyIcon"),
					() => Y("calendar.emptyIcon"),
					() => Y("calendar.showSubscribe"),
					() => Y("calendar.showSignup")
				]), B("click", a, Un), B("click", c, Kn), B("change", re, (e) => L("emptyText", e.target.value.trim() || void 0)), B("change", ue, (e) => L("showSubscribe", e.target.checked)), B("change", T, (e) => L("showSignup", e.target.checked)), H(e, t);
			}, o = (e) => {
				var t = ym(), n = P(t), r = N(n);
				K(r);
				var i = I(r);
				E(n);
				var a = I(n, 2), o = F(a, !0), s = I(a, 2);
				Jr(s, 17, () => z(M).props.items ?? [], Wr, (e, t, n) => {
					var r = vm(), i = N(r);
					K(i);
					var a = I(i, 2), o = N(a);
					o.disabled = n === 0, G(o, () => C.up, !0), E(o);
					var s = I(o, 2);
					G(s, () => C.down, !0), E(s);
					var c = I(s, 2);
					G(c, () => C.cross, !0), E(c), E(a), E(r), R((e, r) => {
						q(i, z(t).q), J(i, "title", e), s.disabled = n === (z(M).props.items?.length ?? 0) - 1, J(c, "title", r);
					}, [() => Y("tip.faq.question"), () => Y("tip.faq.remove")]), B("change", i, (e) => Jn(n, { q: e.target.value })), B("click", o, () => Zn(n, -1)), B("click", s, () => Zn(n, 1)), B("click", c, () => Xn(n)), H(e, r);
				});
				var c = I(s, 2), l = F(c, !0);
				R((e, t, a, s, c) => {
					J(n, "title", e), Ci(r, t), U(i, ` ${a ?? ""}`), U(o, s), U(l, c);
				}, [
					() => Y("tip.faq.multi"),
					() => !!z(M).props.multi,
					() => Y("lbl.faqMulti"),
					() => Y("lbl.questions"),
					() => Y("ui.addQuestion")
				]), B("change", r, (e) => L("multi", e.target.checked)), B("click", c, Yn), H(e, t);
			}, s = (e) => {
				var t = xm(), n = P(t), r = F(n, !0), i = I(n, 2);
				Jr(i, 17, () => z(M).props.items ?? [], Wr, (e, t, n) => {
					var r = bm(), i = P(r), a = N(i);
					K(a);
					var o = I(a, 2);
					K(o);
					var s = I(o, 2), c = N(s);
					c.disabled = n === 0, G(c, () => C.up, !0), E(c);
					var l = I(c, 2);
					G(l, () => C.down, !0), E(l);
					var u = I(l, 2);
					G(u, () => C.cross, !0), E(u), E(s), E(i);
					var d = I(i, 2);
					K(d), R((e, r, i, s, c, f) => {
						q(a, z(t).year), J(a, "placeholder", e), J(a, "title", r), q(o, z(t).title), J(o, "title", i), l.disabled = n === (z(M).props.items?.length ?? 0) - 1, J(u, "title", s), q(d, z(t).text), J(d, "placeholder", c), J(d, "title", f);
					}, [
						() => Y("ph.tlYear"),
						() => Y("tip.timeline.year"),
						() => Y("tip.timeline.title"),
						() => Y("tip.timeline.remove"),
						() => Y("ph.tlText"),
						() => Y("tip.timeline.text")
					]), B("change", a, (e) => nr(n, { year: e.target.value })), B("change", o, (e) => nr(n, { title: e.target.value })), B("click", c, () => ar(n, -1)), B("click", l, () => ar(n, 1)), B("click", u, () => ir(n)), B("change", d, (e) => nr(n, { text: e.target.value })), H(e, r);
				});
				var a = I(i, 2), o = F(a, !0);
				R((e, t) => {
					U(r, e), U(o, t);
				}, [() => Y("lbl.timelineItems"), () => Y("ui.addTlItem")]), B("click", a, rr), H(e, t);
			}, c = (e) => {
				var t = Sm(), n = P(t), r = N(n), i = I(r);
				K(i), E(n);
				var a = I(n, 2), o = N(a), s = I(o);
				K(s), E(a);
				var c = I(a, 2), l = N(c), u = I(l);
				K(u), E(c), R((e, t, n) => {
					U(r, `${e ?? ""} `), q(i, z(M).props.text ?? ""), U(o, `${t ?? ""} `), q(s, z(M).props.attribution ?? ""), U(l, `${n ?? ""} `), q(u, z(M).props.role ?? "");
				}, [
					() => Y("lbl.quoteText"),
					() => Y("lbl.quoteName"),
					() => Y("lbl.quoteRole")
				]), B("change", i, (e) => L("text", e.target.value)), B("change", s, (e) => L("attribution", e.target.value)), B("change", u, (e) => L("role", e.target.value)), H(e, t);
			}, l = (e) => {
				var t = Cm(), n = P(t), r = N(n), i = I(r);
				K(i), E(n);
				var a = I(n, 2), o = N(a), s = I(o);
				K(s), E(a);
				var c = I(a, 2), l = N(c), u = I(l);
				K(u), E(c);
				var d = I(c, 2), f = N(d), p = I(f);
				K(p), E(d), R((e, t, n, a, c) => {
					U(r, `${e ?? ""} `), q(i, z(M).props.value ?? ""), J(i, "title", t), U(o, `${n ?? ""} `), q(s, z(M).props.prefix ?? ""), U(l, `${a ?? ""} `), q(u, z(M).props.suffix ?? ""), U(f, `${c ?? ""} `), q(p, z(M).props.label ?? "");
				}, [
					() => Y("lbl.statValue"),
					() => Y("tip.stat.value"),
					() => Y("lbl.statPrefix"),
					() => Y("lbl.statSuffix"),
					() => Y("lbl.statLabel")
				]), B("change", i, (e) => L("value", e.target.value)), B("change", s, (e) => L("prefix", e.target.value)), B("change", u, (e) => L("suffix", e.target.value)), B("change", p, (e) => L("label", e.target.value)), H(e, t);
			}, u = (e) => {
				var t = Em(), n = P(t), r = F(n, !0), i = I(n, 2);
				Jr(i, 17, () => z(M).props.items ?? [], Wr, (e, t, n) => {
					var r = vm(), i = N(r);
					K(i);
					var a = I(i, 2), o = N(a);
					o.disabled = n === 0, G(o, () => C.up, !0), E(o);
					var s = I(o, 2);
					G(s, () => C.down, !0), E(s);
					var c = I(s, 2);
					G(c, () => C.cross, !0), E(c), E(a), E(r), R((e, r, a, l) => {
						q(i, z(t)), J(i, "title", e), J(o, "title", r), J(s, "title", a), s.disabled = n === (z(M).props.items?.length ?? 0) - 1, J(c, "title", l);
					}, [
						() => Y("tip.ribbon.item"),
						() => Y("tip.moveUp"),
						() => Y("tip.moveDown"),
						() => Y("tip.ribbon.remove")
					]), B("change", i, (e) => Qn(n, e.target.value)), B("click", o, () => tr(n, -1)), B("click", s, () => tr(n, 1)), B("click", c, () => er(n)), H(e, r);
				});
				var a = I(i, 2), o = F(a, !0), s = I(a, 2), c = N(s), l = F(c, !0), u = I(c, 2);
				Jr(u, 21, () => z(x), ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ k(() => h(z(t), 2));
					let r = () => z(n)[0], i = () => z(n)[1];
					var a = wm();
					let o;
					G(a, () => v[r()], !0), E(a), R(() => {
						o = gi(a, 1, "tile svelte-1n46o8q", null, o, { on: (z(M).props.sep ?? "dot") === r() }), J(a, "aria-pressed", (z(M).props.sep ?? "dot") === r()), J(a, "title", i());
					}), B("click", a, () => L("sep", r())), H(e, a);
				}), E(u), E(s);
				var d = I(s, 2), f = (e) => {
					var t = Tm(), n = N(t), r = F(n, !0), i = I(n, 2);
					K(i), E(t), R((e, n) => {
						J(t, "title", e), U(r, n), q(i, z(M).props.sepText ?? "");
					}, [() => Y("tip.ribbon.sepText"), () => Y("lbl.ribbonSepText")]), B("change", i, (e) => L("sepText", e.target.value)), H(e, t);
				};
				W(d, (e) => {
					z(M).props.sep === "custom" && e(f);
				}), R((e, t, n, i) => {
					U(r, e), U(o, t), U(l, n), J(u, "aria-label", i);
				}, [
					() => Y("lbl.ribbonItems"),
					() => Y("ui.addRibbonItem"),
					() => Y("lbl.ribbonSep"),
					() => Y("lbl.ribbonSep")
				]), B("click", a, $n), H(e, t);
			}, d = (e) => {
				var t = Dm(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2), o = F(a, !0);
				E(n);
				var s = I(n, 2), c = N(s), l = F(c, !0), u = I(c, 2), d = F(u, !0);
				E(s);
				var f = I(s, 2), p = N(f);
				K(p);
				var m = I(p);
				E(f), R((e, t, n, r, a, s) => {
					U(i, e), U(o, t), U(l, n), U(d, r), J(f, "title", a), Ci(p, z(M).props.header !== !1), U(m, ` ${s ?? ""}`);
				}, [
					() => Y("ui.addRow"),
					() => Y("ui.removeRow"),
					() => Y("ui.addColumn"),
					() => Y("ui.removeColumn"),
					() => Y("tip.table.header"),
					() => Y("lbl.tableHeader")
				]), B("click", r, () => sr(1, 0)), B("click", a, () => sr(-1, 0)), B("click", c, () => sr(0, 1)), B("click", u, () => sr(0, -1)), B("change", p, (e) => L("header", e.target.checked)), H(e, t);
			}, f = (e) => {
				var t = Nr();
				Jr(P(t), 17, () => [
					["facebook", "Facebook"],
					["x", "X"],
					["linkedin", "LinkedIn"],
					["whatsapp", "WhatsApp"],
					["email", Y("opt.share.email")],
					["copy", Y("opt.share.copy")]
				], ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ k(() => h(z(t), 2));
					let r = () => z(n)[0], i = () => z(n)[1];
					var a = um(), o = N(a);
					K(o);
					var s = I(o);
					E(a), R((e) => {
						Ci(o, e), U(s, ` ${i() ?? ""}`);
					}, [() => (z(M).props.services ?? []).includes(r())]), B("change", o, (e) => cr(r(), e.target.checked)), H(e, a);
				}), H(e, t);
			}, p = (e) => {
				var t = Om(), n = P(t), r = N(n), i = I(r);
				K(i), E(n);
				var a = I(n, 2), o = N(a), s = I(o);
				K(s), E(a), R((e, t, n) => {
					U(r, `${e ?? ""} `), q(i, z(M).props.target ?? ""), J(a, "title", t), U(o, `${n ?? ""} `), q(s, z(M).props.doneText ?? "");
				}, [
					() => Y("lbl.countdownTarget"),
					() => Y("tip.countdown.done"),
					() => Y("lbl.countdownDone")
				]), B("change", i, (e) => L("target", e.target.value)), B("change", s, (e) => L("doneText", e.target.value)), H(e, t);
			}, m = (e) => {
				var t = Am(), n = P(t), r = N(n), i = I(r);
				E(n);
				var a = I(n, 2), o = (e) => {
					var t = km(), n = F(t, !0);
					R((e) => U(n, e), [() => Y("ui.removeAudio")]), B("click", t, () => L("src", "")), H(e, t);
				};
				W(a, (e) => {
					z(M).props.src && e(o);
				});
				var s = I(a, 2), c = N(s), l = I(c);
				K(l), E(s);
				var u = I(s, 2), d = N(u);
				K(d);
				var f = I(d);
				E(u), R((e, t, i, a, o) => {
					J(n, "title", e), U(r, `${t ?? ""} `), U(c, `${i ?? ""} `), q(l, z(M).props.title ?? ""), Ci(d, a), U(f, ` ${o ?? ""}`);
				}, [
					() => Y("tip.blocks.audioFile"),
					() => Y("ui.chooseAudio"),
					() => Y("lbl.audioTitle"),
					() => !!z(M).props.loop,
					() => Y("lbl.audioLoop")
				]), B("change", i, lr), B("change", l, (e) => L("title", e.target.value)), B("change", d, (e) => L("loop", e.target.checked)), H(e, t);
			}, g = (e) => {
				var t = jm(), n = P(t), r = N(n), i = I(r);
				K(i), E(n);
				var a = I(n, 2), o = N(a), s = I(o);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.page ?? "__href"), t = /* @__PURE__ */ k(() => [...z(O).pages.map((e) => [e.id, e.title]), ["__href", Y("opt.externalLink")]]);
					X(s, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => {
							let t = e === "__href" ? null : e;
							un(`edit:${z(M).blockId}`, (e) => {
								e.props.page = t, t && (e.props.href = null);
							});
						}
					});
				}
				E(a);
				var c = I(a, 2), l = (e) => {
					var t = rm();
					K(t), R((e) => {
						J(t, "placeholder", e), q(t, z(M).props.href === "#" ? "" : z(M).props.href ?? "");
					}, [() => Y("ph.url")]), B("change", t, (e) => L("href", e.target.value || null)), H(e, t);
				};
				W(c, (e) => {
					z(M).props.page || e(l);
				}), R((e, t) => {
					U(r, `${e ?? ""} `), q(i, z(M).props.label), U(o, `${t ?? ""} `);
				}, [() => Y("blocks.text"), () => Y("lbl.goesTo")]), B("change", i, (e) => L("label", e.target.value)), H(e, t);
			}, _ = (e) => {
				var t = Mm(), n = P(t), r = N(n), i = I(r);
				E(n);
				var a = I(n, 2), o = N(a), s = I(o);
				K(s), E(a);
				var c = I(a, 2), l = N(c), u = I(l);
				K(u), E(c);
				var d = I(c, 2), f = (e) => {
					var t = um(), n = N(t);
					K(n);
					var r = I(n);
					E(t), R((e, i, a) => {
						J(t, "title", e), Ci(n, i), U(r, ` ${a ?? ""}`);
					}, [
						() => Y("tip.lightbox"),
						() => !!z(M).props.lightbox,
						() => Y("lbl.lightbox")
					]), B("change", n, (e) => L("lightbox", e.target.checked)), H(e, t);
				};
				W(d, (e) => {
					z(M).props.href || e(f);
				}), R((e, t, n, i, a) => {
					U(r, `${e ?? ""} `), U(o, `${t ?? ""} `), q(s, z(M).props.alt ?? ""), J(s, "placeholder", n), U(l, `${i ?? ""} `), q(u, z(M).props.href ?? ""), J(u, "placeholder", a);
				}, [
					() => Y("ui.changeImage"),
					() => Y("lbl.description"),
					() => Y("ph.altText"),
					() => Y("lbl.link"),
					() => Y("ph.optionalImageLink")
				]), B("change", i, dr), B("change", s, (e) => L("alt", e.target.value)), B("change", u, (e) => L("href", e.target.value || null)), H(e, t);
			}, y = (e) => {
				let t = /* @__PURE__ */ k(() => z(M).props.source === "file" ? "file" : "embed");
				var n = Fm(), r = P(n);
				{
					let e = /* @__PURE__ */ k(() => Y("lbl.videoSource")), n = /* @__PURE__ */ k(() => [["embed", Y("opt.videoSource.embed")], ["file", Y("opt.videoSource.file")]]);
					Es(r, {
						get label() {
							return z(e);
						},
						get value() {
							return z(t);
						},
						get options() {
							return z(n);
						},
						onchange: (e) => L("source", e)
					});
				}
				var i = I(r, 2), a = (e) => {
					var t = Nm(), n = P(t), r = F(n, !0), i = I(n, 2);
					K(i), R((e, t, a) => {
						J(n, "title", e), U(r, t), q(i, z(M).props.url ?? ""), J(i, "placeholder", a);
					}, [
						() => Y("hint.video"),
						() => Y("lbl.videoUrl"),
						() => Y("ph.videoUrl")
					]), B("change", i, (e) => L("url", e.target.value)), H(e, t);
				}, o = (e) => {
					var t = Pm(), n = P(t), r = N(n), i = I(r);
					E(n);
					var a = I(n, 2), o = N(a), s = I(o);
					E(a);
					var c = I(a, 2), l = N(c);
					K(l);
					var u = I(l);
					E(c);
					var d = I(c, 2), f = N(d);
					K(f);
					var p = I(f);
					E(d);
					var m = I(d, 2), h = (e) => {
						var t = um(), n = N(t);
						K(n);
						var r = I(n);
						E(t), R((e, i) => {
							J(t, "title", e), Ci(n, z(M).props.autoplay === !0), U(r, ` ${i ?? ""}`);
						}, [() => Y("tip.video.autoplay"), () => Y("lbl.videoAutoplay")]), B("change", n, (e) => L("autoplay", e.target.checked)), H(e, t);
					};
					W(m, (e) => {
						z(M).props.muted === !0 && e(h);
					}), R((e, t, i, s, c, d) => {
						J(n, "title", e), U(r, `${t ?? ""} `), J(a, "title", i), U(o, `${s ?? ""} `), Ci(l, z(M).props.loop === !0), U(u, ` ${c ?? ""}`), Ci(f, z(M).props.muted === !0), U(p, ` ${d ?? ""}`);
					}, [
						() => Y("tip.video.file"),
						() => z(M).props.src ? Y("ui.changeVideo") : Y("ui.chooseVideo"),
						() => Y("tip.bg.poster"),
						() => z(M).props.poster ? Y("ui.changeImage") : Y("ui.choosePoster"),
						() => Y("lbl.videoLoop"),
						() => Y("lbl.videoMuted")
					]), B("change", i, pi), B("change", s, mi), B("change", l, (e) => L("loop", e.target.checked)), B("change", f, (e) => dn("muted", e.target.checked ? { muted: !0 } : {
						muted: !1,
						autoplay: !1
					})), H(e, t);
				};
				W(i, (e) => {
					z(t) === "embed" ? e(a) : e(o, -1);
				});
				var s = I(i, 2), c = N(s), l = I(c);
				K(l), E(s), R((e) => {
					U(c, `${e ?? ""} `), q(l, z(M).props.title ?? "");
				}, [() => Y("lbl.videoTitle")]), B("change", l, (e) => L("title", e.target.value)), H(e, n);
			}, b = (e) => {
				var t = Rm(), n = P(t), r = N(n), i = I(r), a = N(i);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.glyph ?? "★"), t = /* @__PURE__ */ k(() => z(M).props.icon ?? null), n = /* @__PURE__ */ k(() => z(M).props.image ?? null);
					go(a, {
						get value() {
							return z(e);
						},
						get icon() {
							return z(t);
						},
						get image() {
							return z(n);
						},
						onpick: (e) => un(`edit:${z(M).blockId}`, (t) => {
							t.props.glyph = e, t.props.icon = null, t.props.image = null;
						}),
						onicon: (e) => un(`edit:${z(M).blockId}`, (t) => {
							t.props.icon = e, t.props.image = null;
						}),
						onimage: (e) => L("image", e)
					});
				}
				var o = I(a, 2), s = (e) => {
					var t = Im();
					K(t), R((e) => {
						q(t, z(M).props.glyph ?? ""), J(t, "title", e);
					}, [() => Y("tip.icon.typeGlyph")]), B("change", t, (e) => L("glyph", e.target.value || "★")), H(e, t);
				}, c = (e) => {
					var t = km(), n = F(t, !0);
					R((e, r) => {
						J(t, "title", e), U(n, r);
					}, [() => Y("tip.icon.backToGlyph"), () => Y("ui.removeDrawnIcon")]), B("click", t, () => L("icon", null)), H(e, t);
				};
				W(o, (e) => {
					z(M).props.icon ? e(c, -1) : e(s);
				}), E(i), E(n);
				var l = I(n, 2), u = (e) => {
					var t = Lm(), n = N(t), r = I(n, 2), i = F(r, !0);
					E(t), R((e, r, a) => {
						J(t, "title", e), J(n, "src", z(M).props.image), J(n, "alt", r), U(i, a);
					}, [
						() => Y("hint.icon.ownImage"),
						() => Y("gp.ownIcon"),
						() => Y("ui.removeOwnIcon")
					]), B("click", r, () => L("image", null)), H(e, t);
				};
				W(l, (e) => {
					z(M).props.image && e(u);
				}), R((e) => U(r, `${e ?? ""} `), [() => Y("blocks.icon")]), H(e, t);
			}, S = (e) => {
				var t = zm(), n = P(t), r = N(n), i = I(r);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.collection ?? ""), t = /* @__PURE__ */ k(() => [["", Y("common.choose")], ...z(al).map((e) => [e, z(ol)[e]?.name ?? e])]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => L("collection", e || null)
					});
				}
				E(n);
				var a = I(n, 2), o = N(a), s = I(o);
				K(s), E(a);
				var c = I(a, 2), l = N(c);
				K(l);
				var u = I(l);
				E(c), R((e, t, i, c, d) => {
					J(n, "title", e), U(r, `${t ?? ""} `), J(a, "title", i), U(o, `${c ?? ""} `), q(s, z(M).props.limit ?? 6), Ci(l, z(M).props.newestFirst !== !1), U(u, ` ${d ?? ""}`);
				}, [
					() => Y("tip.collection.source"),
					() => Y("blocks.collection"),
					() => Y("tip.collection.limit"),
					() => Y("lbl.maxCount"),
					() => Y("lbl.newestFirst")
				]), B("change", s, (e) => L("limit", Number(e.target.value))), B("change", l, (e) => L("newestFirst", e.target.checked)), H(e, t);
			}, ee = (e) => {
				var t = Hm(), n = P(t), r = N(n), i = I(r);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.collection ?? ""), t = /* @__PURE__ */ k(() => [["", Y("common.choose")], ...z(al).filter((e) => z(ol)[e]?.kind === "products").map((e) => [e, z(ol)[e]?.name ?? e])]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => L("collection", e || null)
					});
				}
				E(n);
				var a = I(n, 2), o = (e) => {
					var t = Bm(), n = N(t), r = F(n, !0), i = I(n, 2), a = F(i, !0);
					E(t), R((e, t, o, s) => {
						J(n, "title", e), U(r, t), J(i, "title", o), U(a, s);
					}, [
						() => Y("tip.product.addProduct"),
						() => Y("ui.addProduct"),
						() => Y("tip.product.editCatalog"),
						() => Y("ui.editCatalog")
					]), B("click", n, () => Bl(z(M).props.collection)), B("click", i, () => {
						j(sl, z(M).props.collection, !0), j(zt, "collections");
					}), H(e, t);
				}, s = (e) => {
					var t = Vm(), n = F(t, !0);
					R((e, r) => {
						J(t, "title", e), U(n, r);
					}, [() => Y("tip.product.createCatalog"), () => Y("ui.createCatalog")]), B("click", t, Rl), H(e, t);
				}, c = /* @__PURE__ */ k(() => !z(al).some((e) => z(ol)[e]?.kind === "products"));
				W(a, (e) => {
					z(M).props.collection && z(ol)[z(M).props.collection]?.kind === "products" ? e(o) : z(c) && e(s, 1);
				});
				var l = I(a, 2), u = N(l), d = I(u);
				K(d), E(l);
				var f = I(l, 2), p = N(f), m = I(p);
				K(m), E(f), R((e, t, i, a, o, s) => {
					J(n, "title", e), U(r, `${t ?? ""} `), J(l, "title", i), U(u, `${a ?? ""} `), q(d, z(M).props.limit ?? 0), J(f, "title", o), U(p, `${s ?? ""} `), q(m, z(M).props.currency ?? "kr");
				}, [
					() => Y("tip.product.source"),
					() => Y("blocks.collection"),
					() => Y("tip.collection.limit"),
					() => Y("lbl.maxCount"),
					() => Y("tip.product.currency"),
					() => Y("lbl.currency")
				]), B("change", d, (e) => L("limit", Number(e.target.value))), B("change", m, (e) => L("currency", e.target.value)), H(e, t);
			}, te = (e) => {
				var t = Um(), n = P(t), r = N(n), i = I(r);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.href ?? ""), t = /* @__PURE__ */ k(() => [["", Y("common.none")], ...z(O).pages.map((e) => [e.path, e.title])]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => L("href", e)
					});
				}
				E(n);
				var a = I(n, 2), o = N(a), s = I(o);
				K(s), E(a), R((e, t, i, c) => {
					J(n, "title", e), U(r, `${t ?? ""} `), J(a, "title", i), U(o, `${c ?? ""} `), q(s, z(M).props.currency ?? "kr");
				}, [
					() => Y("tip.cart.checkout"),
					() => Y("lbl.checkoutPage"),
					() => Y("tip.product.currency"),
					() => Y("lbl.currency")
				]), B("change", s, (e) => L("currency", e.target.value)), H(e, t);
			}, ne = (e) => {
				var t = Wm(), n = P(t), r = N(n), i = I(r);
				K(i), E(n);
				var a = I(n, 2), o = N(a), s = I(o);
				K(s), E(a);
				var c = I(a, 2), l = N(c), u = I(l);
				K(u), E(c);
				var d = I(c, 2), f = N(d);
				K(f);
				var p = I(f);
				E(d);
				var m = I(d, 2), h = N(m), g = I(h);
				K(g), E(m), R((e, t, _, v, y, b, x, S, ee, te) => {
					J(n, "title", e), U(r, `${t ?? ""} `), q(i, z(M).props.recipient ?? ""), J(a, "title", _), U(o, `${v ?? ""} `), q(s, z(M).props.endpoint ?? ""), J(c, "title", y), U(l, `${b ?? ""} `), q(u, z(M).props.vipps ?? ""), J(d, "title", x), Ci(f, z(M).props.vippsCheckout === !0), U(p, ` ${S ?? ""}`), J(m, "title", ee), U(h, `${te ?? ""} `), q(g, z(M).props.currency ?? "kr");
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
				]), B("change", i, (e) => L("recipient", e.target.value.trim())), B("change", s, (e) => L("endpoint", e.target.value.trim())), B("change", u, (e) => L("vipps", e.target.value.trim())), B("change", f, (e) => L("vippsCheckout", e.target.checked)), B("change", g, (e) => L("currency", e.target.value)), H(e, t);
			}, re = (e) => {
				var t = vp(), n = P(t), r = N(n), i = I(r);
				E(n), Jr(I(n, 2), 17, () => z(M).props.images ?? [], Wr, (e, t, n) => {
					var r = Gm(), i = N(r), a = N(i), o = I(a, 2), s = N(o);
					s.disabled = n === 0, G(s, () => C.up, !0), E(s);
					var c = I(s, 2);
					G(c, () => C.down, !0), E(c);
					var l = I(c, 2);
					G(l, () => C.cross, !0), E(l), E(o), E(i);
					var u = I(i, 2), d = N(u), f = I(d);
					K(f), E(u);
					var p = I(u, 2), m = N(p), h = I(m);
					K(h), E(p), E(r), R((e, r, o, s, u, p) => {
						J(i, "title", e), J(a, "src", z(t).src), c.disabled = n === z(M).props.images.length - 1, J(l, "title", r), U(d, `${o ?? ""} `), q(f, z(t).alt ?? ""), J(f, "placeholder", s), U(m, `${u ?? ""} `), q(h, z(t).href ?? ""), J(h, "placeholder", p);
					}, [
						() => Y("hint.gallery"),
						() => Y("tip.removeImage"),
						() => Y("lbl.description"),
						() => Y("ph.altShort"),
						() => Y("lbl.link"),
						() => Y("ph.galleryHref")
					]), B("click", s, () => kv(n, -1)), B("click", c, () => kv(n, 1)), B("click", l, () => Av(n)), B("change", f, (e) => jv(n, "alt", e.target.value)), B("change", h, (e) => jv(n, "href", e.target.value || null)), H(e, r);
				}), R((e, t) => {
					J(n, "title", e), U(r, `${t ?? ""} `);
				}, [() => Y("tip.gallery.addImages"), () => Y("ui.addImages")]), B("change", i, Dv), H(e, t);
			}, ie = (e) => {
				var t = Bp(), n = N(t);
				X(I(n), {
					get value() {
						return z(M).props.kind;
					},
					get options() {
						return hr;
					},
					onchange: (e) => L("kind", e)
				}), E(t), R((e) => U(n, `${e ?? ""} `), [() => Y("blocks.shape")]), H(e, t);
			}, ae = (e) => {
				let t = /* @__PURE__ */ k(() => vv[z(M).type] ?? z(hp).find((e) => e.type === z(M).type)?.fields ?? []);
				var n = Nr(), r = P(n), i = (e) => {
					var n = Nr();
					Jr(P(n), 17, () => z(t), (e) => e.key, (e, t) => {
						var n = Nr(), r = P(n), i = (e) => {
							let n = /* @__PURE__ */ k(() => `${z(M).blockId}:${z(t).key}`);
							var r = Km(), i = P(r), a = N(i), o = I(a);
							K(o), E(i);
							var s = I(i, 2), c = F(s, !0), l = I(s, 2), u = (e) => {
								var t = yp();
								let r;
								var i = F(t, !0);
								R(() => {
									r = gi(t, 1, "panel-hint svelte-1n46o8q", null, r, { "place-error": Tn[z(n)].err }), U(i, Tn[z(n)].text);
								}), H(e, t);
							};
							W(l, (e) => {
								Tn[z(n)] && e(u);
							}), R((e) => {
								U(a, `${z(t).label ?? ""} `), J(o, "placeholder", z(t).placeholder), q(o, wn[z(n)] ?? z(M).props[z(t).key] ?? ""), s.disabled = z(En), U(c, e);
							}, [() => Y("props.place.search")]), B("input", o, (e) => {
								wn[z(n)] = e.target.value;
							}), B("keydown", o, (e) => {
								e.key === "Enter" && kn(z(t));
							}), B("click", s, () => kn(z(t))), H(e, r);
						}, a = (e) => {
							var n = qm(), r = N(n), i = I(r);
							K(i), E(n), R(() => {
								U(r, `${z(t).label ?? ""} `), J(i, "min", z(t).min), J(i, "max", z(t).max), J(i, "step", z(t).step ?? 1), q(i, z(M).props[z(t).key]);
							}), B("change", i, (e) => L(z(t).key, On(z(t), Number(e.target.value)))), H(e, n);
						}, o = (e) => {
							var n = um(), r = N(n);
							K(r);
							var i = I(r);
							E(n), R((e) => {
								Ci(r, e), U(i, ` ${z(t).label ?? ""}`);
							}, [() => !!z(M).props[z(t).key]]), B("change", r, (e) => L(z(t).key, e.target.checked)), H(e, n);
						}, s = (e) => {
							var n = Bp(), r = N(n), i = I(r);
							{
								let e = /* @__PURE__ */ k(() => (z(t).options ?? []).map((e) => [e.value, e.label]));
								X(i, {
									get value() {
										return z(M).props[z(t).key];
									},
									get options() {
										return z(e);
									},
									onchange: (e) => L(z(t).key, e)
								});
							}
							E(n), R(() => U(r, `${z(t).label ?? ""} `)), H(e, n);
						}, c = (e) => {
							var n = Jm(), r = N(n), i = I(r);
							K(i), E(n), R(() => {
								U(r, `${z(t).label ?? ""} `), J(i, "placeholder", z(t).placeholder), q(i, z(M).props[z(t).key] ?? "");
							}), B("change", i, (e) => L(z(t).key, e.target.value)), H(e, n);
						};
						W(r, (e) => {
							z(t).type === "place" ? e(i) : z(t).type === "number" ? e(a, 1) : z(t).type === "toggle" ? e(o, 2) : z(t).type === "select" ? e(s, 3) : e(c, -1);
						}), H(e, n);
					}), H(e, n);
				}, a = (e) => {
					var t = km(), n = F(t, !0);
					R((e, r) => {
						J(t, "title", e), U(n, r);
					}, [() => Y("hint.pluginBlock"), () => Y("ui.settings")]), B("click", t, () => nt?.sendOpenConfig(z(M).blockId)), H(e, t);
				};
				W(r, (e) => {
					z(t).length ? e(i) : e(a, -1);
				}), H(e, n);
			};
			W(n, (e) => {
				z(M).type === "text" ? e(r) : z(M).type === "form" ? e(i, 1) : z(M).type === "calendar" ? e(a, 2) : z(M).type === "faq" ? e(o, 3) : z(M).type === "timeline" ? e(s, 4) : z(M).type === "quote" ? e(c, 5) : z(M).type === "stats" ? e(l, 6) : z(M).type === "ribbon" ? e(u, 7) : z(M).type === "table" ? e(d, 8) : z(M).type === "share" ? e(f, 9) : z(M).type === "countdown" ? e(p, 10) : z(M).type === "audio" ? e(m, 11) : z(M).type === "button" ? e(g, 12) : z(M).type === "image" ? e(_, 13) : z(M).type === "video" ? e(y, 14) : z(M).type === "icon" ? e(b, 15) : z(M).type === "collection" ? e(S, 16) : z(M).type === "product" ? e(ee, 17) : z(M).type === "cart" ? e(te, 18) : z(M).type === "checkout" ? e(ne, 19) : z(M).type === "gallery" ? e(re, 20) : z(M).type === "shape" ? e(ie, 21) : e(ae, -1);
			}), H(e, t);
		}, p = (e) => {
			var t = Nh(), n = P(t), r = (e) => {
				var t = Ym(), n = P(t), r = N(n), i = I(r);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.align ?? "left"), t = /* @__PURE__ */ k(() => [
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
						onchange: (e) => L("align", e)
					});
				}
				E(n);
				var a = I(n, 2), o = N(a);
				K(o);
				var c = I(o);
				E(a);
				var l = I(a, 2), u = (e) => {
					s(e);
				};
				W(l, (e) => {
					z(M).props.box && e(u);
				}), Oe(2), R((e, t, n) => {
					U(r, `${e ?? ""} `), Ci(o, t), U(c, ` ${n ?? ""}`);
				}, [
					() => Y("lbl.align"),
					() => !!z(M).props.box,
					() => Y("lbl.textBoxToggle")
				]), B("change", o, (e) => L("box", e.target.checked)), H(e, t);
			}, i = (e) => {
				let t = /* @__PURE__ */ k(() => Uf(z(M).props.design));
				var n = eh(), r = P(n), i = N(r), a = F(i), o = I(i, 2);
				Jr(o, 21, Kf, (e) => e.view ?? "plain", (e, n) => {
					var r = Qm(), i = P(r), a = (e) => {
						var t = Xm(), r = F(t, !0);
						R((e) => U(r, e), [() => Y(pn[z(n).view])]), H(e, t);
					};
					W(i, (e) => {
						z(n).view && e(a);
					});
					var o = I(i, 2);
					Jr(o, 21, () => z(n).designs, (e) => e.id, (e, n) => {
						var r = Zm();
						let i;
						var a = N(r);
						G(a, () => gp(z(n).id), !0), E(a);
						var o = F(I(a, 2), !0);
						E(r), R((e, a) => {
							i = gi(r, 1, "footer-tp svelte-1n46o8q", null, i, { on: z(n).id === z(t).id }), J(r, "aria-pressed", z(n).id === z(t).id), J(r, "title", e), U(o, a);
						}, [() => Y(z(n).labelKey), () => Y(z(n).labelKey)]), B("click", r, () => gn(z(n).id)), H(e, r);
					}), E(o), H(e, r);
				}), E(o), E(r);
				var s = I(r, 2), c = F(s, !0), l = I(s, 2);
				Jr(l, 19, () => mn(z(t)), (e) => e.section, (e, t, n) => {
					var r = lm(), i = P(r), a = (e) => {
						var n = Xm(), r = F(n, !0);
						R((e) => U(r, e), [() => Y(`calendar.section.${z(t).section}`)]), H(e, n);
					};
					W(i, (e) => {
						z(n) > 0 && e(a);
					}), Jr(I(i, 2), 17, () => z(t).slots, (e) => e.key, (e, t) => {
						var n = $m(), r = N(n), i = F(r, !0), a = I(r, 2);
						{
							let e = /* @__PURE__ */ k(() => z(M).props.colors?.[z(t).key] ?? ""), n = /* @__PURE__ */ k(Ri), r = /* @__PURE__ */ k(() => Y(z(t).labelKey));
							ba(a, {
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
								onchange: (e) => _n(z(t).key, e || "")
							});
						}
						E(n), R((e, t) => {
							J(n, "title", e), U(i, t);
						}, [() => Y("tip.calendar.slot"), () => Y(z(t).labelKey)]), H(e, n);
					}), H(e, r);
				});
				var u = I(l, 2), d = N(u);
				K(d);
				var f = I(d);
				E(u);
				var p = I(u, 2), m = (e) => {
					var t = $m(), n = N(t), r = F(n, !0), i = I(n, 2);
					{
						let e = /* @__PURE__ */ k(() => z(M).props.stripe?.color ?? ""), t = /* @__PURE__ */ k(Ri), n = /* @__PURE__ */ k(() => Y("calendar.stripeColor"));
						ba(i, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							allowClear: !0,
							get label() {
								return z(n);
							},
							onchange: (e) => vn({ color: e || void 0 })
						});
					}
					E(t), R((e, n) => {
						J(t, "title", e), U(r, n);
					}, [() => Y("tip.calendar.stripeColor"), () => Y("calendar.stripeColor")]), H(e, t);
				}, h = /* @__PURE__ */ k(() => Xf(z(t), z(M).props.stripe).show);
				W(p, (e) => {
					z(h) && e(m);
				});
				var g = I(p, 2), _ = F(g, !0), v = I(g, 2);
				{
					let e = /* @__PURE__ */ k(() => Rf.map((e) => [e, Y(`calendar.field.${e}`)]));
					X(v, {
						get value() {
							return z(fn);
						},
						get options() {
							return z(e);
						},
						onchange: (e) => j(fn, e, !0)
					});
				}
				var y = I(v, 2), b = N(y), x = I(b);
				{
					let e = /* @__PURE__ */ k(() => hn().font ?? ""), t = /* @__PURE__ */ k(() => [["", Y("common.inherit")], ...Ff.map(([e, t]) => [t, Y(e)])]);
					X(x, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => yn({ font: e || void 0 })
					});
				}
				E(y);
				var S = I(y, 2), ee = N(S), te = I(ee);
				K(te), E(S);
				var ne = I(S, 2);
				{
					let e = /* @__PURE__ */ k(() => Y("calendar.fieldWeight")), t = /* @__PURE__ */ k(() => hn().bold === !0 ? "bold" : hn().bold === !1 ? "normal" : ""), n = /* @__PURE__ */ k(() => [
						["", Y("common.inherit")],
						["bold", Y("format.bold")],
						["normal", Y("calendar.fieldNormal")]
					]);
					Es(ne, {
						get label() {
							return z(e);
						},
						get value() {
							return z(t);
						},
						get options() {
							return z(n);
						},
						onchange: (e) => yn({ bold: e === "bold" || e !== "normal" && void 0 })
					});
				}
				var C = I(ne, 2), re = N(C);
				let ie;
				var ae = F(N(re), !0);
				E(re);
				var oe = I(re, 2);
				let se;
				var ce = F(N(oe), !0);
				E(oe);
				var w = I(oe, 2);
				{
					let e = /* @__PURE__ */ k(() => hn().color ?? ""), t = /* @__PURE__ */ k(Ri), n = /* @__PURE__ */ k(() => Y("calendar.fieldColor"));
					ba(w, {
						get value() {
							return z(e);
						},
						get tokens() {
							return z(t);
						},
						allowClear: !0,
						get label() {
							return z(n);
						},
						onchange: (e) => yn({ color: e || void 0 })
					});
				}
				E(C), Oe(2), R((e, t, n, i, o, l, p, m, h, v, y, x, ne, C, w, le, ue, de, fe, T, pe) => {
					J(r, "title", e), U(a, `${t ?? ""}: ${n ?? ""}`), J(s, "title", i), U(c, o), J(u, "title", l), Ci(d, p), U(f, ` ${m ?? ""}`), J(g, "title", h), U(_, v), U(b, `${y ?? ""} `), J(S, "title", x), U(ee, `${ne ?? ""} `), J(te, "min", Zf.min), J(te, "max", Zf.max), q(te, C), J(te, "placeholder", w), ie = gi(re, 1, "tbtn svelte-1n46o8q", null, ie, { active: le }), J(re, "title", ue), U(ae, de), se = gi(oe, 1, "tbtn svelte-1n46o8q", null, se, { active: fe }), J(oe, "title", T), U(ce, pe);
				}, [
					() => Y("tip.calendar.design"),
					() => Y("calendar.design"),
					() => Y(z(t).labelKey),
					() => Y("tip.calendar.slot"),
					() => Y("calendar.colors"),
					() => Y("tip.calendar.stripe"),
					() => Xf(z(t), z(M).props.stripe).show,
					() => Y("calendar.stripe"),
					() => Y("tip.calendar.fieldStyle"),
					() => Y("calendar.fieldStyle"),
					() => Y("calendar.fieldFont"),
					() => Y("tip.calendar.fieldSize"),
					() => Y("calendar.fieldSize"),
					() => hn().size ?? "",
					() => Y("common.inherit"),
					() => hn().italic === !0,
					() => Y("format.italic"),
					() => Y("format.italicLetter"),
					() => hn().underline === !0,
					() => Y("calendar.fieldUnderline"),
					() => Y("format.underlineLetter")
				]), B("change", d, (e) => vn({ show: e.target.checked })), B("change", te, (e) => yn({ size: e.target.value === "" ? void 0 : Math.max(Zf.min, Math.min(Zf.max, Number(e.target.value) || Zf.min)) })), B("click", re, () => yn({ italic: !hn().italic || void 0 })), B("click", oe, () => yn({ underline: !hn().underline || void 0 })), H(e, n);
			}, a = (e) => {
				var t = nh(), n = P(t);
				{
					let e = /* @__PURE__ */ k(() => Y("lbl.variant")), t = /* @__PURE__ */ k(() => z(M).props.variant === "list" ? "list" : "cards"), r = /* @__PURE__ */ k(() => qc.map((e) => [e, Y(`opt.faqVariant.${e}`)]));
					Es(n, {
						get label() {
							return z(e);
						},
						get value() {
							return z(t);
						},
						get options() {
							return z(r);
						},
						onchange: (e) => L("variant", e)
					});
				}
				var r = I(n, 2), i = (e) => {
					var t = th(), n = P(t), r = F(n, !0), i = I(n, 2);
					s(i), R((e) => U(r, e), [() => Y("lbl.cardStyle")]), H(e, t);
				};
				W(r, (e) => {
					z(M).props.variant !== "list" && e(i);
				}), Oe(2), H(e, t);
			}, o = (e) => {
				var t = rh(), n = P(t), r = N(n), i = I(r);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.variant ?? "left"), t = /* @__PURE__ */ k(() => [["left", Y("opt.timeline.left")], ["alternating", Y("opt.timeline.alternating")]]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => L("variant", e)
					});
				}
				E(n);
				var a = I(n, 2), o = N(a), s = I(o);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.marker ?? "filled"), t = /* @__PURE__ */ k(() => [["filled", Y("opt.timeline.filled")], ["ring", Y("opt.timeline.ring")]]);
					X(s, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => L("marker", e)
					});
				}
				E(a);
				var c = I(a, 2), l = N(c), u = I(l);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.accent ?? "accent"), t = /* @__PURE__ */ k(Ri);
					ba(u, {
						get value() {
							return z(e);
						},
						get tokens() {
							return z(t);
						},
						onchange: (e) => L("accent", e === "accent" ? null : e)
					});
				}
				E(c), Oe(2), R((e, t, n) => {
					U(r, `${e ?? ""} `), U(o, `${t ?? ""} `), U(l, `${n ?? ""} `);
				}, [
					() => Y("lbl.variant"),
					() => Y("lbl.timelineMarker"),
					() => Y("lbl.color")
				]), H(e, t);
			}, c = (e) => {
				var t = ah(), n = P(t), r = N(n), i = I(r);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.variant ?? "large"), t = /* @__PURE__ */ k(() => [["large", Y("opt.quote.large")], ["short", Y("opt.quote.short")]]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => L("variant", e)
					});
				}
				E(n);
				var a = I(n, 2), o = (e) => {
					var t = ih(), n = P(t), r = N(n), i = I(r);
					E(n);
					var a = I(n, 2), o = (e) => {
						var t = km(), n = F(t, !0);
						R((e) => U(n, e), [() => Y("ui.quotePortraitRemove")]), B("click", t, () => L("image", "")), H(e, t);
					};
					W(a, (e) => {
						z(M).props.image && e(o);
					}), R((e) => U(r, `${e ?? ""} `), [() => Y("ui.quotePortrait")]), B("change", i, pr), H(e, t);
				}, s = (e) => {
					var t = um(), n = N(t);
					K(n);
					var r = I(n);
					E(t), R((e, i) => {
						J(t, "title", e), Ci(n, z(M).props.card === !0), U(r, ` ${i ?? ""}`);
					}, [() => Y("tip.quote.card"), () => Y("lbl.quoteCard")]), B("change", n, (e) => L("card", e.target.checked)), H(e, t);
				};
				W(a, (e) => {
					z(M).props.variant === "short" ? e(o) : e(s, -1);
				});
				var c = I(a, 2), l = N(c), u = I(l);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.accent ?? "accent"), t = /* @__PURE__ */ k(Ri);
					ba(u, {
						get value() {
							return z(e);
						},
						get tokens() {
							return z(t);
						},
						onchange: (e) => L("accent", e === "accent" ? null : e)
					});
				}
				E(c), Oe(2), R((e, t) => {
					U(r, `${e ?? ""} `), U(l, `${t ?? ""} `);
				}, [() => Y("lbl.variant"), () => Y("lbl.color")]), H(e, t);
			}, l = (e) => {
				var t = oh(), n = P(t);
				{
					let e = /* @__PURE__ */ k(() => Y("lbl.variant")), t = /* @__PURE__ */ k(() => Kc.includes(z(M).props.variant) ? z(M).props.variant : "plain"), r = /* @__PURE__ */ k(() => Kc.map((e) => [e, Y(`opt.statVariant.${e}`)]));
					Es(n, {
						get label() {
							return z(e);
						},
						get value() {
							return z(t);
						},
						get options() {
							return z(r);
						},
						onchange: (e) => L("variant", e)
					});
				}
				var r = I(n, 2), i = N(r);
				K(i);
				var a = I(i);
				E(r), Oe(2), R((e, t) => {
					J(r, "title", e), Ci(i, z(M).props.countUp !== !1), U(a, ` ${t ?? ""}`);
				}, [() => Y("tip.stat.countUp"), () => Y("lbl.statCountUp")]), B("change", i, (e) => L("countUp", e.target.checked)), H(e, t);
			}, u = (e) => {
				let t = /* @__PURE__ */ k(() => z(M).props.motion ?? "roll");
				var n = fh(), r = P(n), i = N(r), a = F(i, !0), o = I(i, 2);
				{
					let e = /* @__PURE__ */ k(() => [
						["roll", Y("opt.ribbonMotion.roll")],
						["sway", Y("opt.ribbonMotion.sway")],
						["step", Y("opt.ribbonMotion.step")],
						["none", Y("opt.ribbonMotion.none")]
					]);
					X(o, {
						filled: !0,
						get value() {
							return z(t);
						},
						get options() {
							return z(e);
						},
						onchange: (e) => L("motion", e)
					});
				}
				var s = I(o, 2), c = (e) => {
					var n = lh(), r = P(n), i = F(r, !0), a = I(r, 2);
					{
						let e = /* @__PURE__ */ k(() => Y("lbl.ribbonDirection")), t = /* @__PURE__ */ k(() => z(M).props.direction ?? "left"), n = /* @__PURE__ */ k(() => [["left", Y("opt.ribbonDir.left")], ["right", Y("opt.ribbonDir.right")]]);
						Es(a, {
							get label() {
								return z(e);
							},
							get value() {
								return z(t);
							},
							get options() {
								return z(n);
							},
							onchange: (e) => L("direction", e)
						});
					}
					var o = I(a, 2), s = (e) => {
						var t = sh(), n = N(t), r = F(n, !0), i = I(n, 2);
						K(i);
						var a = F(I(i, 2));
						E(t), R((e, n) => {
							J(t, "title", e), U(r, n), q(i, z(M).props.dwell ?? 2.5), U(a, `${z(M).props.dwell ?? 2.5 ?? ""} s`);
						}, [() => Y("tip.ribbon.dwell"), () => Y("lbl.ribbonDwell")]), B("input", i, (e) => L("dwell", e.target.valueAsNumber)), H(e, t);
					}, c = (e) => {
						var t = ch(), n = N(t), r = F(n, !0), i = I(n, 2);
						K(i);
						var a = F(I(i, 2), !0);
						E(t), R((e, n) => {
							J(t, "title", e), U(r, n), q(i, z(M).props.speed ?? 60), U(a, z(M).props.speed ?? 60);
						}, [() => Y("tip.ribbon.speed"), () => Y("lbl.ribbonSpeed")]), B("input", i, (e) => L("speed", e.target.valueAsNumber)), H(e, t);
					};
					W(o, (e) => {
						z(t) === "step" ? e(s) : e(c, -1);
					});
					var l = I(o, 2), u = N(l);
					K(u);
					var d = I(u);
					E(l);
					var f = I(l, 2), p = N(f);
					K(p);
					var m = I(p);
					E(f), R((e, t, n, a, o, s) => {
						J(r, "title", e), U(i, t), J(l, "title", n), Ci(u, z(M).props.pauseOnHover !== !1), U(d, ` ${a ?? ""}`), J(f, "title", o), Ci(p, z(M).props.fade !== !1), U(m, ` ${s ?? ""}`);
					}, [
						() => Y("tip.ribbon.play"),
						() => Y("ui.ribbonPlay"),
						() => Y("tip.ribbon.pause"),
						() => Y("lbl.ribbonPause"),
						() => Y("tip.ribbon.fade"),
						() => Y("lbl.ribbonFade")
					]), B("click", r, () => nt?.sendDemoMotion()), B("change", u, (e) => L("pauseOnHover", e.target.checked)), B("change", p, (e) => L("fade", e.target.checked)), H(e, n);
				};
				W(s, (e) => {
					z(t) !== "none" && e(c);
				}), E(r);
				var l = I(r, 2), u = N(l), d = F(u, !0), f = I(u, 2), p = N(f), m = F(p, !0), h = I(p, 2);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.above ?? "none");
					X(h, {
						filled: !0,
						get value() {
							return z(e);
						},
						get options() {
							return z(b);
						},
						onchange: (e) => L("above", e)
					});
				}
				E(f);
				var g = I(f, 2), _ = (e) => {
					var t = Bp(), n = N(t), r = I(n);
					{
						let e = /* @__PURE__ */ k(() => z(M).props.aboveColor ?? Gc(z(M).props)), t = /* @__PURE__ */ k(Ri), n = /* @__PURE__ */ k(() => Y("tip.ribbon.stripeColor"));
						ba(r, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => L("aboveColor", e)
						});
					}
					E(t), R((e, r) => {
						J(t, "title", e), U(n, `${r ?? ""} `);
					}, [() => Y("tip.ribbon.stripeColor"), () => Y("lbl.colour")]), H(e, t);
				};
				W(g, (e) => {
					(z(M).props.above ?? "none") !== "none" && e(_);
				});
				var v = I(g, 2), x = N(v), S = F(x, !0), ee = I(x, 2);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.main ?? "text");
					X(ee, {
						filled: !0,
						get value() {
							return z(e);
						},
						get options() {
							return z(y);
						},
						onchange: (e) => L("main", e)
					});
				}
				E(v);
				var te = I(v, 2), ne = N(te), C = F(ne, !0), re = I(ne, 2);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.below ?? "none");
					X(re, {
						filled: !0,
						get value() {
							return z(e);
						},
						get options() {
							return z(b);
						},
						onchange: (e) => L("below", e)
					});
				}
				E(te);
				var ie = I(te, 2), ae = (e) => {
					var t = Bp(), n = N(t), r = I(n);
					{
						let e = /* @__PURE__ */ k(() => z(M).props.belowColor ?? Gc(z(M).props)), t = /* @__PURE__ */ k(Ri), n = /* @__PURE__ */ k(() => Y("tip.ribbon.stripeColor"));
						ba(r, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => L("belowColor", e)
						});
					}
					E(t), R((e, r) => {
						J(t, "title", e), U(n, `${r ?? ""} `);
					}, [() => Y("tip.ribbon.stripeColor"), () => Y("lbl.colour")]), H(e, t);
				};
				W(ie, (e) => {
					(z(M).props.below ?? "none") !== "none" && e(ae);
				});
				var oe = I(ie, 2), se = (e) => {
					var t = uh(), n = P(t);
					{
						let e = /* @__PURE__ */ k(() => Y("lbl.ribbonStripePlace")), t = /* @__PURE__ */ k(() => Y("tip.ribbon.stripePlace")), r = /* @__PURE__ */ k(() => z(M).props.stripePlace ?? "stack"), i = /* @__PURE__ */ k(() => [["stack", Y("opt.ribbonPlace.stack")], ["edge", Y("opt.ribbonPlace.edge")]]);
						Es(n, {
							get label() {
								return z(e);
							},
							get title() {
								return z(t);
							},
							get value() {
								return z(r);
							},
							get options() {
								return z(i);
							},
							onchange: (e) => L("stripePlace", e)
						});
					}
					var r = I(n, 2), i = N(r), a = F(i, !0), o = I(i, 2);
					K(o);
					var s = F(I(o, 2));
					E(r), R((e, t) => {
						J(r, "title", e), U(a, t), q(o, z(M).props.thickness ?? 8), U(s, `${z(M).props.thickness ?? 8 ?? ""} px`);
					}, [() => Y("tip.ribbon.thickness"), () => Y("lbl.ribbonThickness")]), B("input", o, (e) => L("thickness", e.target.valueAsNumber)), H(e, t);
				};
				W(oe, (e) => {
					((z(M).props.above ?? "none") !== "none" || (z(M).props.below ?? "none") !== "none") && e(se);
				}), E(l);
				var ce = I(l, 2), w = N(ce), le = F(w, !0), ue = I(w, 2);
				{
					let e = /* @__PURE__ */ k(() => Y("lbl.ribbonWidth")), t = /* @__PURE__ */ k(() => z(M).props.width ?? "content"), n = /* @__PURE__ */ k(() => [["content", Y("opt.ribbonWidth.content")], ["page", Y("opt.ribbonWidth.page")]]);
					Es(ue, {
						get label() {
							return z(e);
						},
						get value() {
							return z(t);
						},
						get options() {
							return z(n);
						},
						onchange: (e) => L("width", e)
					});
				}
				var de = I(ue, 2);
				{
					let e = /* @__PURE__ */ k(() => Y("lbl.ribbonVariant")), t = /* @__PURE__ */ k(() => z(M).props.variant ?? "band"), n = /* @__PURE__ */ k(() => [["band", Y("opt.ribbonVariant.band")], ["plain", Y("opt.ribbonVariant.plain")]]);
					Es(de, {
						get label() {
							return z(e);
						},
						get value() {
							return z(t);
						},
						get options() {
							return z(n);
						},
						onchange: (e) => L("variant", e)
					});
				}
				var fe = I(de, 2), T = N(fe), pe = F(T, !0), me = I(T, 2);
				K(me);
				var he = F(I(me, 2));
				E(fe), E(ce);
				var ge = I(ce, 2), _e = N(ge), ve = F(_e, !0), ye = I(_e, 2), be = N(ye), xe = F(be, !0), Se = I(be, 2);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.size ?? "md"), t = /* @__PURE__ */ k(() => [
						["sm", Y("opt.size.sm")],
						["md", Y("opt.size.md")],
						["lg", Y("opt.size.lg")],
						["xl", Y("opt.size.xl")]
					]);
					X(Se, {
						filled: !0,
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => L("size", e)
					});
				}
				E(ye);
				var Ce = I(ye, 2), we = N(Ce);
				K(we);
				var Te = I(we);
				E(Ce);
				var Ee = I(Ce, 2), De = N(Ee);
				K(De);
				var ke = I(De);
				E(Ee);
				var Ae = I(Ee, 2), je = N(Ae);
				K(je);
				var Me = I(je);
				E(Ae);
				var Ne = I(Ae, 2), Pe = N(Ne), Fe = F(Pe, !0), Ie = I(Pe, 2);
				K(Ie);
				var Le = F(I(Ie, 2));
				E(Ne), E(ge);
				var Re = I(ge, 2), ze = N(Re), Be = F(ze, !0), Ve = I(ze, 2), He = N(Ve), Ue = (e) => {
					var t = dh(), n = N(t);
					{
						let e = /* @__PURE__ */ k(() => z(M).props.bg ?? "accent"), t = /* @__PURE__ */ k(Ri), r = /* @__PURE__ */ k(() => Y("tip.ribbon.bg"));
						ba(n, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							get label() {
								return z(r);
							},
							onchange: (e) => L("bg", e)
						});
					}
					var r = F(I(n, 2), !0);
					E(t), R((e, n) => {
						J(t, "title", e), U(r, n);
					}, [() => Y("tip.ribbon.bg"), () => Y("lbl.background")]), H(e, t);
				};
				W(He, (e) => {
					(z(M).props.variant ?? "band") !== "plain" && e(Ue);
				});
				var We = I(He, 2), Ge = N(We);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.color ?? ((z(M).props.variant ?? "band") === "plain" ? "text" : "accent-text")), t = /* @__PURE__ */ k(Ri), n = /* @__PURE__ */ k(() => Y("tip.ribbon.color"));
					ba(Ge, {
						get value() {
							return z(e);
						},
						get tokens() {
							return z(t);
						},
						get label() {
							return z(n);
						},
						onchange: (e) => L("color", e)
					});
				}
				var Ke = F(I(Ge, 2), !0);
				E(We), E(Ve), E(Re), Oe(2), R((e, t, n, r, i, o, s, c, l, u, p, h, g, _, y, b, x, ee, ne, re, ie, ae, oe, se) => {
					U(a, e), U(d, t), J(f, "title", n), U(m, r), J(v, "title", i), U(S, o), J(te, "title", s), U(C, c), U(le, l), J(fe, "title", u), U(pe, p), q(me, z(M).props.tilt ?? 0), U(he, `${z(M).props.tilt ?? 0 ?? ""}°`), U(ve, h), U(xe, g), J(Ce, "title", _), Ci(we, z(M).props.caps === !0), U(Te, ` ${y ?? ""}`), J(Ee, "title", b), Ci(De, z(M).props.weight === "bold"), U(ke, ` ${x ?? ""}`), J(Ae, "title", ee), Ci(je, z(M).props.outline === !0), U(Me, ` ${ne ?? ""}`), J(Ne, "title", re), U(Fe, ie), q(Ie, z(M).props.gap ?? 40), U(Le, `${z(M).props.gap ?? 40 ?? ""} px`), U(Be, ae), J(We, "title", oe), U(Ke, se);
				}, [
					() => Y("lbl.ribbonMotion"),
					() => Y("lbl.ribbonStripes"),
					() => Y("tip.ribbon.above"),
					() => Y("lbl.ribbonAbove"),
					() => Y("tip.ribbon.main"),
					() => Y("lbl.ribbonMain"),
					() => Y("tip.ribbon.below"),
					() => Y("lbl.ribbonBelow"),
					() => Y("lbl.ribbonShape"),
					() => Y("tip.ribbon.tilt"),
					() => Y("lbl.ribbonTilt"),
					() => Y("lbl.ribbonText"),
					() => Y("lbl.size"),
					() => Y("tip.ribbon.caps"),
					() => Y("lbl.ribbonCaps"),
					() => Y("tip.ribbon.bold"),
					() => Y("lbl.ribbonBold"),
					() => Y("tip.ribbon.outline"),
					() => Y("lbl.ribbonOutline"),
					() => Y("tip.ribbon.gap"),
					() => Y("lbl.ribbonGap"),
					() => Y("group.navColours"),
					() => Y("tip.ribbon.color"),
					() => Y("lbl.textColor")
				]), B("input", me, (e) => L("tilt", e.target.valueAsNumber)), B("change", we, (e) => L("caps", e.target.checked)), B("change", De, (e) => L("weight", e.target.checked ? "bold" : "normal")), B("change", je, (e) => L("outline", e.target.checked)), B("input", Ie, (e) => L("gap", e.target.valueAsNumber)), H(e, n);
			}, d = (e) => {
				var t = ph(), n = P(t), r = N(n), i = I(r);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.lines ?? "rows"), t = /* @__PURE__ */ k(() => [
						["rows", Y("opt.table.rows")],
						["grid", Y("opt.table.grid")],
						["none", Y("common.none")]
					]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => L("lines", e)
					});
				}
				E(n);
				var a = I(n, 2), o = N(a);
				K(o);
				var s = I(o);
				E(a), Oe(2), R((e, t, n) => {
					U(r, `${e ?? ""} `), Ci(o, t), U(s, ` ${n ?? ""}`);
				}, [
					() => Y("lbl.tableLines"),
					() => !!z(M).props.striped,
					() => Y("lbl.tableStriped")
				]), B("change", o, (e) => L("striped", e.target.checked)), H(e, t);
			}, f = (e) => {
				var t = mh(), n = P(t), r = N(n), i = I(r);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.variant ?? "icons"), t = /* @__PURE__ */ k(() => [["icons", Y("opt.share.icons")], ["labels", Y("opt.share.labels")]]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => L("variant", e)
					});
				}
				E(n);
				var a = I(n, 2), o = N(a), s = I(o);
				K(s), E(a);
				var c = I(a, 2), l = N(c), u = I(l);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.color || "accent"), t = /* @__PURE__ */ k(Ri);
					ba(u, {
						get value() {
							return z(e);
						},
						get tokens() {
							return z(t);
						},
						onchange: (e) => L("color", e === "accent" ? "" : e)
					});
				}
				E(c), Oe(2), R((e, t, n) => {
					U(r, `${e ?? ""} `), U(o, `${t ?? ""} `), q(s, z(M).props.size ?? 38), U(l, `${n ?? ""} `);
				}, [
					() => Y("lbl.variant"),
					() => Y("lbl.size"),
					() => Y("lbl.color")
				]), B("change", s, (e) => L("size", Number(e.target.value) || 38)), H(e, t);
			}, p = (e) => {
				var t = ph(), n = P(t), r = N(n), i = I(r);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.variant ?? "boxes"), t = /* @__PURE__ */ k(() => [["boxes", Y("opt.countdown.boxes")], ["plain", Y("opt.countdown.plain")]]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => L("variant", e)
					});
				}
				E(n);
				var a = I(n, 2), o = N(a);
				K(o);
				var s = I(o);
				E(a), Oe(2), R((e, t) => {
					U(r, `${e ?? ""} `), Ci(o, z(M).props.showSeconds !== !1), U(s, ` ${t ?? ""}`);
				}, [() => Y("lbl.variant"), () => Y("lbl.countdownSeconds")]), B("change", o, (e) => L("showSeconds", e.target.checked)), H(e, t);
			}, m = (e) => {
				var t = hh(), n = P(t), r = N(n), i = I(r);
				{
					let e = /* @__PURE__ */ k(() => [["primary", Y("opt.btn.primary")], ["secondary", Y("opt.btn.secondary")]]);
					X(i, {
						get value() {
							return z(M).props.style;
						},
						get options() {
							return z(e);
						},
						onchange: (e) => L("style", e)
					});
				}
				E(n), Oe(2), R((e) => U(r, `${e ?? ""} `), [() => Y("lbl.style")]), H(e, t);
			}, h = (e) => {
				var t = gh(), n = P(t), r = N(n), i = I(r);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.fit ?? "cover"), t = /* @__PURE__ */ k(() => [["cover", Y("opt.fitFrame.cover")], ["contain", Y("opt.fitFrame.contain")]]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => L("fit", e)
					});
				}
				E(n);
				var a = I(n, 2), o = N(a), s = I(o);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.radius ?? ""), t = /* @__PURE__ */ k(() => [
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
						onchange: (e) => L("radius", e || null)
					});
				}
				E(a);
				var c = I(a, 2), l = N(c), u = F(I(l));
				E(c);
				var d = I(c, 2);
				K(d);
				var f = I(d, 2), p = N(f), m = F(I(p));
				E(f);
				var h = I(f, 2);
				K(h);
				var g = I(h, 2), _ = N(g), v = F(I(_));
				E(g);
				var y = I(g, 2);
				K(y);
				var b = I(y, 2), x = N(b), S = F(I(x));
				E(b);
				var ee = I(b, 2);
				K(ee);
				var te = I(ee, 2), ne = N(te), C = F(I(ne));
				E(te);
				var re = I(te, 2);
				K(re);
				var ie = I(re, 2), ae = N(ie), oe = F(I(ae));
				E(ie);
				var se = I(ie, 2);
				K(se);
				var ce = I(se, 2), w = F(ce, !0);
				Oe(2), R((e, t, n, i, a, s, c, f, b, te, ie, le, ue, de, fe, T, pe) => {
					U(r, `${e ?? ""} `), U(o, `${t ?? ""} `), U(l, `${n ?? ""} `), U(u, `${i ?? ""}%`), q(d, z(M).props.x ?? .5), U(p, `${a ?? ""} `), U(m, `${s ?? ""}%`), q(h, z(M).props.y ?? .5), J(g, "title", c), U(_, `${f ?? ""} `), U(v, `${b ?? ""}x`), q(y, z(M).props.zoom ?? 1), U(x, `${te ?? ""} `), U(S, `${ie ?? ""}%`), q(ee, z(M).props.brightness ?? 1), U(ne, `${le ?? ""} `), U(C, `${ue ?? ""}%`), q(re, z(M).props.contrast ?? 1), U(ae, `${de ?? ""} `), U(oe, `${fe ?? ""}%`), q(se, z(M).props.saturate ?? 1), J(ce, "title", T), U(w, pe);
				}, [
					() => Y("lbl.fit"),
					() => Y("lbl.radius"),
					() => Y("lbl.focusX"),
					() => Math.round((z(M).props.x ?? .5) * 100),
					() => Y("lbl.focusY"),
					() => Math.round((z(M).props.y ?? .5) * 100),
					() => Y("tip.zoomCrop"),
					() => Y("lbl.zoom"),
					() => (z(M).props.zoom ?? 1).toFixed(2),
					() => Y("lbl.brightness"),
					() => Math.round((z(M).props.brightness ?? 1) * 100),
					() => Y("lbl.contrast"),
					() => Math.round((z(M).props.contrast ?? 1) * 100),
					() => Y("lbl.saturate"),
					() => Math.round((z(M).props.saturate ?? 1) * 100),
					() => Y("tip.resetAdjust"),
					() => Y("ui.resetAdjust")
				]), B("input", d, (e) => L("x", Number(e.target.value))), B("input", h, (e) => L("y", Number(e.target.value))), B("input", y, (e) => L("zoom", Number(e.target.value))), B("input", ee, (e) => L("brightness", Number(e.target.value))), B("input", re, (e) => L("contrast", Number(e.target.value))), B("input", se, (e) => L("saturate", Number(e.target.value))), B("click", ce, () => un(`edit:${z(M).blockId}`, (e) => {
					e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
				})), H(e, t);
			}, g = (e) => {
				var t = _h(), n = P(t), r = N(n), i = I(r);
				K(i), E(n);
				var a = I(n, 2), o = N(a), s = I(o);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.color ?? "accent"), t = /* @__PURE__ */ k(Ri);
					ba(s, {
						get value() {
							return z(e);
						},
						get tokens() {
							return z(t);
						},
						onchange: (e) => L("color", e)
					});
				}
				E(a), Oe(2), R((e, t, n) => {
					U(r, `${e ?? ""} `), q(i, z(M).props.size ?? 48), J(a, "title", t), U(o, `${n ?? ""} `);
				}, [
					() => Y("lbl.sizePx"),
					() => Y("hint.icon.color"),
					() => Y("lbl.color")
				]), B("change", i, (e) => L("size", Number(e.target.value))), H(e, t);
			}, _ = (e) => {
				var t = hh(), n = P(t), r = N(n), i = I(r);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.view ?? "cards"), t = /* @__PURE__ */ k(() => [
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
						onchange: (e) => L("view", e)
					});
				}
				E(n), Oe(2), R((e) => U(r, `${e ?? ""} `), [() => Y("lbl.view")]), H(e, t);
			}, v = (e) => {
				var t = vh(), n = P(t), r = N(n), i = I(r);
				K(i), E(n), Oe(2), R((e, t) => {
					J(n, "title", e), U(r, `${t ?? ""} `), q(i, z(M).props.columns ?? 0);
				}, [() => Y("tip.product.columns"), () => Y("lbl.columns")]), B("change", i, (e) => L("columns", Number(e.target.value))), H(e, t);
			}, x = (e) => {
				var t = hh(), n = P(t), r = N(n), i = I(r);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.variant ?? "button"), t = /* @__PURE__ */ k(() => [["button", Y("opt.cart.button")], ["icon", Y("opt.cart.icon")]]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => L("variant", e)
					});
				}
				E(n), Oe(2), R((e) => U(r, `${e ?? ""} `), [() => Y("lbl.view")]), H(e, t);
			}, S = (e) => {
				let t = /* @__PURE__ */ k(() => kd(z(M).props.view));
				var n = wh(), r = P(n), i = N(r), a = I(i);
				{
					let e = /* @__PURE__ */ k(() => Td.map((e) => [e, Y(`opt.galleryView.${e}`)]));
					X(a, {
						get value() {
							return z(t);
						},
						get options() {
							return z(e);
						},
						onchange: (e) => L("view", e)
					});
				}
				E(r);
				var o = I(r, 2), s = (e) => {
					var t = yh(), n = P(t), r = N(n), i = I(r);
					K(i), E(n);
					var a = I(n, 2), o = N(a), s = F(I(o));
					E(a);
					var c = I(a, 2);
					K(c), R((e, t) => {
						U(r, `${e ?? ""} `), q(i, z(M).props.columns ?? 3), U(o, `${t ?? ""} `), U(s, `${z(M).props.gap ?? 12 ?? ""} px`), q(c, z(M).props.gap ?? 12);
					}, [() => Y("lbl.columns"), () => Y("lbl.imageGap")]), B("change", i, (e) => L("columns", Number(e.target.value))), B("input", c, (e) => L("gap", Number(e.target.value))), H(e, t);
				}, c = /* @__PURE__ */ k(() => Ed.includes(z(t)));
				W(o, (e) => {
					z(c) && e(s);
				});
				var l = I(o, 2), u = (e) => {
					var t = bh(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2);
					K(a);
					var o = F(I(a, 2));
					E(n);
					var s = I(n, 2), c = N(s);
					G(c, () => C.shuffle);
					var l = I(c);
					E(s), R((e, t, r, c) => {
						J(n, "title", e), U(i, t), J(a, "min", Dd.min), J(a, "max", Dd.max), q(a, z(M).props.rowHeight ?? Dd.dflt), U(o, `${z(M).props.rowHeight ?? Dd.dflt ?? ""} px`), J(s, "title", r), U(l, ` ${c ?? ""}`);
					}, [
						() => Y("tip.gallery.rowHeight"),
						() => Y("lbl.galleryRowHeight"),
						() => Y("tip.gallery.shuffleMosaic"),
						() => Y("ui.shufflePhotos")
					]), B("input", a, (e) => L("rowHeight", e.target.valueAsNumber)), B("click", s, () => L("seed", Si())), H(e, t);
				};
				W(l, (e) => {
					z(t) === "mosaic" && e(u);
				});
				var d = I(l, 2), f = (e) => {
					var t = xh(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2);
					K(a);
					var o = F(I(a, 2));
					E(n);
					var s = I(n, 2), c = (e) => {
						var t = Lp(), n = N(t);
						G(n, () => C.shuffle);
						var r = I(n);
						E(t), R((e, n) => {
							J(t, "title", e), U(r, ` ${n ?? ""}`);
						}, [() => Y("tip.gallery.shuffleTilt"), () => Y("ui.shufflePhotos")]), B("click", t, () => L("seed", Si())), H(e, t);
					};
					W(s, (e) => {
						(z(M).props.tilt ?? Od.dflt) > 0 && e(c);
					});
					var l = I(s, 2), u = N(l), d = I(u);
					{
						let e = /* @__PURE__ */ k(() => z(M).props.frameColor || "#ffffff"), t = /* @__PURE__ */ k(Ri), n = /* @__PURE__ */ k(() => Y("tip.gallery.frameColor"));
						ba(d, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							allowClear: !0,
							get label() {
								return z(n);
							},
							onchange: (e) => L("frameColor", e ?? "")
						});
					}
					E(l);
					var f = I(l, 2), p = N(f);
					K(p);
					var m = I(p);
					E(f), R((e, t, r, s, c, d) => {
						J(n, "title", e), U(i, t), J(a, "min", Od.min), J(a, "max", Od.max), q(a, z(M).props.tilt ?? Od.dflt), U(o, `${z(M).props.tilt ?? Od.dflt ?? ""}°`), J(l, "title", r), U(u, `${s ?? ""} `), J(f, "title", c), Ci(p, z(M).props.captions === !0), U(m, ` ${d ?? ""}`);
					}, [
						() => Y("tip.gallery.tilt"),
						() => Y("lbl.polaroidTilt"),
						() => Y("tip.gallery.frameColor"),
						() => Y("lbl.frameColor"),
						() => Y("tip.gallery.captions"),
						() => Y("lbl.galleryCaptions")
					]), B("input", a, (e) => L("tilt", e.target.valueAsNumber)), B("change", p, (e) => L("captions", e.target.checked)), H(e, t);
				};
				W(d, (e) => {
					z(t) === "polaroid" && e(f);
				});
				var p = I(d, 2), m = (e) => {
					var t = Sh(), n = P(t);
					{
						let e = /* @__PURE__ */ k(() => Y("lbl.ribbonRows")), t = /* @__PURE__ */ k(() => String(z(M).props.rows ?? 1)), r = /* @__PURE__ */ k(() => [["1", Y("opt.ribbonRows.one")], ["2", Y("opt.ribbonRows.two")]]);
						Es(n, {
							get label() {
								return z(e);
							},
							get value() {
								return z(t);
							},
							get options() {
								return z(r);
							},
							onchange: (e) => L("rows", Number(e))
						});
					}
					var r = I(n, 2);
					{
						let e = /* @__PURE__ */ k(() => Y("lbl.ribbonDirection")), t = /* @__PURE__ */ k(() => z(M).props.direction ?? "left"), n = /* @__PURE__ */ k(() => [["left", Y("opt.ribbonDir.left")], ["right", Y("opt.ribbonDir.right")]]);
						Es(r, {
							get label() {
								return z(e);
							},
							get value() {
								return z(t);
							},
							get options() {
								return z(n);
							},
							onchange: (e) => L("direction", e)
						});
					}
					var i = I(r, 2), a = N(i), o = F(a, !0), s = I(a, 2);
					K(s);
					var c = F(I(s, 2), !0);
					E(i);
					var l = I(i, 2), u = N(l), d = F(u, !0), f = I(u, 2);
					K(f);
					var p = F(I(f, 2));
					E(l);
					var m = I(l, 2), h = N(m), g = F(I(h));
					E(m);
					var _ = I(m, 2);
					K(_);
					var v = I(_, 2), y = N(v);
					K(y);
					var b = I(y);
					E(v);
					var x = I(v, 2), S = N(x);
					K(S);
					var ee = I(S);
					E(x), R((e, t, n, r, a, u, m, te, ne) => {
						J(i, "title", e), U(o, t), q(s, z(M).props.speed ?? 60), U(c, z(M).props.speed ?? 60), J(l, "title", n), U(d, r), q(f, z(M).props.bandHeight ?? 160), U(p, `${z(M).props.bandHeight ?? 160 ?? ""} px`), U(h, `${a ?? ""} `), U(g, `${z(M).props.gap ?? 12 ?? ""} px`), q(_, z(M).props.gap ?? 12), J(v, "title", u), Ci(y, z(M).props.pauseOnHover !== !1), U(b, ` ${m ?? ""}`), J(x, "title", te), Ci(S, z(M).props.fade !== !1), U(ee, ` ${ne ?? ""}`);
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
					]), B("input", s, (e) => L("speed", e.target.valueAsNumber)), B("input", f, (e) => L("bandHeight", e.target.valueAsNumber)), B("input", _, (e) => L("gap", Number(e.target.value))), B("change", y, (e) => L("pauseOnHover", e.target.checked)), B("change", S, (e) => L("fade", e.target.checked)), H(e, t);
				};
				W(p, (e) => {
					z(t) === "ribbon" && e(m);
				});
				var h = I(p, 2), g = (e) => {
					var t = Ch(), n = N(t), r = I(n);
					K(r), E(t), R((e) => {
						U(n, `${e ?? ""} `), q(r, z(M).props.interval ?? 5);
					}, [() => Y("lbl.secondsPerImage")]), B("change", r, (e) => L("interval", Number(e.target.value))), H(e, t);
				};
				W(h, (e) => {
					z(t) === "slides" && e(g);
				});
				var _ = I(h, 2), v = N(_), y = I(v);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.radius ?? ""), t = /* @__PURE__ */ k(() => [
						["", Y("common.none")],
						["sm", Y("opt.size.sm")],
						["md", Y("opt.radius.md")]
					]);
					X(y, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => L("radius", e || null)
					});
				}
				E(_);
				var b = I(_, 2), x = N(b);
				K(x);
				var S = I(x);
				E(b), Oe(2), R((e, t, n, r) => {
					U(i, `${e ?? ""} `), U(v, `${t ?? ""} `), J(b, "title", n), Ci(x, z(M).props.lightbox !== !1), U(S, ` ${r ?? ""}`);
				}, [
					() => Y("lbl.view"),
					() => Y("lbl.radius"),
					() => Y("tip.lightbox"),
					() => Y("lbl.lightbox")
				]), B("change", x, (e) => L("lightbox", e.target.checked)), H(e, n);
			}, ee = (e) => {
				var t = Eh(), n = P(t), r = N(n);
				X(I(r), {
					get value() {
						return z(M).props.color;
					},
					get options() {
						return gr;
					},
					onchange: (e) => L("color", e)
				}), E(n);
				var i = I(n, 2), a = N(i), o = I(a);
				K(o), E(i);
				var s = I(i, 2), c = (e) => {
					var t = Th(), n = N(t), r = I(n);
					K(r), E(t), R((e, t) => {
						U(n, `${e ?? ""} `), J(r, "max", t), q(r, z(M).frame.w);
					}, [() => Y("lbl.length"), () => Math.max(1, Math.round(100 - z(M).frame.x))]), B("change", r, (e) => An("w", Math.max(1, Math.min(Number(e.target.value), 100 - z(M).frame.x)))), H(e, t);
				};
				W(s, (e) => {
					(z(M).props.kind === "line" || z(M).props.kind === "arrow") && e(c);
				});
				var l = I(s, 2), u = (e) => {
					var t = tm(), n = N(t), r = I(n);
					K(r), E(t), R((e, i) => {
						J(t, "title", e), U(n, `${i ?? ""} `), q(r, z(M).props.label ?? "");
					}, [() => Y("tip.shape.label"), () => Y("lbl.shapeLabel")]), B("change", r, (e) => L("label", e.target.value.trim() || void 0)), H(e, t);
				};
				W(l, (e) => {
					z(M).props.kind === "line" && e(u);
				});
				var d = I(l, 2), f = N(d);
				K(f);
				var p = I(f);
				E(d), Oe(2), R((e, t, n, i, s) => {
					U(r, `${e ?? ""} `), U(a, `${t ?? ""} `), q(o, z(M).props.thickness), J(d, "title", n), Ci(f, i), U(p, ` ${s ?? ""}`);
				}, [
					() => Y("lbl.color"),
					() => Y("lbl.thickness"),
					() => Y("tip.shape.fill"),
					() => !!z(M).props.fill,
					() => Y("lbl.filled")
				]), B("change", o, (e) => L("thickness", Number(e.target.value))), B("change", f, (e) => L("fill", e.target.checked ? z(M).props.color : null)), H(e, t);
			};
			W(n, (e) => {
				z(M).type === "text" ? e(r) : z(M).type === "calendar" ? e(i, 1) : z(M).type === "faq" ? e(a, 2) : z(M).type === "timeline" ? e(o, 3) : z(M).type === "quote" ? e(c, 4) : z(M).type === "stats" ? e(l, 5) : z(M).type === "ribbon" ? e(u, 6) : z(M).type === "table" ? e(d, 7) : z(M).type === "share" ? e(f, 8) : z(M).type === "countdown" ? e(p, 9) : z(M).type === "button" ? e(m, 10) : z(M).type === "image" ? e(h, 11) : z(M).type === "icon" ? e(g, 12) : z(M).type === "collection" ? e(_, 13) : z(M).type === "product" ? e(v, 14) : z(M).type === "cart" ? e(x, 15) : z(M).type === "gallery" ? e(S, 16) : z(M).type === "shape" && e(ee, 17);
			});
			var te = I(n, 2), ne = N(te), re = I(ne);
			{
				let e = /* @__PURE__ */ k(() => z(M).fit === "shrink" ? "shrink" : "wrap"), t = /* @__PURE__ */ k(() => xn.has(z(M).type) ? [["wrap", Y("opt.fit.fluid")], ["shrink", Y("opt.fit.floor")]] : [["wrap", Y("opt.fit.wrap")], ["shrink", Y("opt.fit.shrink")]]);
				X(re, {
					get value() {
						return z(e);
					},
					get options() {
						return z(t);
					},
					onchange: (e) => Sn(e)
				});
			}
			E(te);
			var ie = I(te, 2), ae = (e) => {
				var t = Dh(), n = N(t), r = F(n, !0), i = I(n, 2);
				K(i);
				var a = F(I(i, 2));
				E(t), R((e, n, o, s) => {
					J(t, "title", e), U(r, n), q(i, o), U(a, `${s ?? ""} %`);
				}, [
					() => Y("tip.fitMin"),
					() => Y("lbl.fitMin"),
					() => Math.round((z(M).fitMin ?? .6) * 100),
					() => Math.round((z(M).fitMin ?? .6) * 100)
				]), B("input", i, (e) => Cn(e.target.valueAsNumber / 100)), H(e, t);
			};
			W(ie, (e) => {
				z(M).fit === "shrink" && e(ae);
			});
			var oe = I(ie, 4), se = N(oe), ce = I(se);
			{
				let e = /* @__PURE__ */ k(() => Ki(z(M).animation) ? z(M).animation.type : "");
				X(ce, {
					get value() {
						return z(e);
					},
					get options() {
						return Zi;
					},
					onchange: (e) => ea(e || null)
				});
			}
			E(oe);
			var w = I(oe, 2), le = (e) => {
				var t = Oh(), n = P(t), r = N(n), i = I(r);
				K(i), E(n);
				var a = I(n, 2), o = N(a), s = I(o);
				K(s), E(a), R((e, t) => {
					U(r, `${e ?? ""} `), q(i, z(M).animation.props.duration), U(o, `${t ?? ""} `), q(s, z(M).animation.props.delay);
				}, [() => Y("lbl.durationMs"), () => Y("lbl.delayMs")]), B("change", i, (e) => ia("duration", Number(e.target.value))), B("change", s, (e) => ia("delay", Number(e.target.value))), H(e, t);
			}, ue = /* @__PURE__ */ k(() => Ki(z(M).animation));
			W(w, (e) => {
				z(ue) && e(le);
			});
			var de = I(w, 2), fe = N(de), T = I(fe);
			{
				let e = /* @__PURE__ */ k(() => z(M).hover?.type ?? (z(M).animation && !Ki(z(M).animation) ? z(M).animation.type : ""));
				X(T, {
					get value() {
						return z(e);
					},
					get options() {
						return Qi;
					},
					onchange: (e) => ra(e || null)
				});
			}
			E(de);
			var pe = I(de, 2), me = (e) => {
				var t = jh(), n = I(P(t), 2), r = N(n);
				K(r);
				var i = I(r);
				E(n);
				var a = I(n, 2), o = (e) => {
					var t = Ah(), n = P(t), r = N(n), i = I(r);
					{
						let e = /* @__PURE__ */ k(() => z(M).sticky.mode ?? "scroll"), t = /* @__PURE__ */ k(() => [["scroll", Y("opt.sticky.modeScroll")], ["screen", Y("opt.sticky.modeScreen")]]);
						X(i, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => un(`edit:${z(M).blockId}`, (t) => {
								t.sticky = {
									...t.sticky,
									mode: e
								};
							})
						});
					}
					E(n);
					var a = I(n, 2), o = (e) => {
						var t = kh(), n = N(t), r = I(n);
						K(r), E(t), R((e, i) => {
							J(t, "title", e), U(n, `${i ?? ""} `), q(r, z(M).sticky.offset ?? 16);
						}, [() => z(M).sticky.mode === "screen" ? Y("tip.stickyEdge") : Y("tip.stickyOffset"), () => z(M).sticky.mode === "screen" ? Y("lbl.stickyEdge") : Y("lbl.stickyOffset")]), B("change", r, (e) => un(`edit:${z(M).blockId}`, (t) => {
							t.sticky = {
								...t.sticky,
								offset: Math.max(0, Number(e.target.value) || 0)
							};
						})), H(e, t);
					};
					W(a, (e) => {
						(z(M).sticky.mode !== "screen" || (z(M).sticky.dock ?? "bottom-right") !== "middle-center") && e(o);
					});
					var s = I(a, 2), c = (e) => {
						var t = Bp(), n = N(t), r = I(n);
						{
							let e = /* @__PURE__ */ k(() => z(M).sticky.dock ?? "bottom-right"), t = /* @__PURE__ */ k(() => sn.map(([e, t]) => [e, Y(t)]));
							X(r, {
								get value() {
									return z(e);
								},
								get options() {
									return z(t);
								},
								onchange: (e) => un(`edit:${z(M).blockId}`, (t) => {
									t.sticky = {
										...t.sticky,
										dock: e
									};
								})
							});
						}
						E(t), R((e, r) => {
							J(t, "title", e), U(n, `${r ?? ""} `);
						}, [() => Y("tip.stickyDock"), () => Y("lbl.stickyDock")]), H(e, t);
					}, l = (e) => {
						var t = Bp(), n = N(t), r = I(n);
						{
							let e = /* @__PURE__ */ k(() => z(M).sticky.until ?? ""), t = /* @__PURE__ */ k(cn);
							X(r, {
								get value() {
									return z(e);
								},
								get options() {
									return z(t);
								},
								onchange: (e) => un(`edit:${z(M).blockId}`, (t) => {
									t.sticky = {
										...t.sticky,
										until: e || null
									};
								})
							});
						}
						E(t), R((e, r) => {
							J(t, "title", e), U(n, `${r ?? ""} `);
						}, [() => Y("tip.stickyUntil"), () => Y("lbl.stickyUntil")]), H(e, t);
					};
					W(s, (e) => {
						z(M).sticky.mode === "screen" ? e(c) : e(l, -1);
					}), R((e, t) => {
						J(n, "title", e), U(r, `${t ?? ""} `);
					}, [() => Y("tip.stickyMode"), () => Y("lbl.stickyMode")]), H(e, t);
				};
				W(a, (e) => {
					z(M).sticky && e(o);
				}), R((e, t, a) => {
					J(n, "title", e), Ci(r, t), U(i, ` ${a ?? ""}`);
				}, [
					() => Y("tip.sticky"),
					() => !!z(M).sticky,
					() => Y("lbl.sticky")
				]), B("change", r, (e) => un(`edit:${z(M).blockId}`, (t) => {
					t.sticky = e.target.checked ? {
						offset: 16,
						until: null
					} : null;
				})), H(e, t);
			};
			W(pe, (e) => {
				z(je) === "desktop" && e(me);
			});
			var he = I(pe, 4), ge = N(he), _e = F(ge, !0), ve = I(ge, 2), ye = N(ve), be = (e) => {
				var t = Mh(), n = N(t), r = N(n, !0), i = I(r);
				K(i), E(n);
				var a = I(n, 2), o = N(a, !0), s = I(o);
				K(s), E(a);
				var c = I(a, 2), l = N(c, !0), u = I(l);
				K(u), E(c);
				var d = I(c, 2), f = N(d, !0), p = I(f);
				K(p), E(d);
				var m = I(d, 2), h = N(m, !0), g = I(h);
				K(g), E(m);
				var _ = I(m, 2), v = N(_, !0), y = I(v);
				K(y), E(_), E(t), R((e, t, n, a, c, d, _) => {
					U(r, e), q(i, z(M).frame.x), U(o, t), q(s, z(M).frame.y), U(l, n), q(u, z(M).frame.w), U(f, a), q(p, z(M).frame.h), J(m, "title", c), U(h, d), q(g, z(M).frame.z ?? 1), U(v, _), q(y, z(M).frame.rot ?? 0);
				}, [
					() => Y("frame.x"),
					() => Y("frame.y"),
					() => Y("frame.w"),
					() => Y("frame.h"),
					() => Y("tip.frameZ"),
					() => Y("frame.z"),
					() => Y("frame.rot")
				]), B("change", i, (e) => An("x", Number(e.target.value))), B("change", s, (e) => An("y", Number(e.target.value))), B("change", u, (e) => An("w", Number(e.target.value))), B("change", p, (e) => An("h", Number(e.target.value))), B("change", g, (e) => An("z", Number(e.target.value))), B("change", y, (e) => An("rot", Number(e.target.value))), H(e, t);
			};
			W(ye, (e) => {
				z(je) === "desktop" && e(be);
			});
			var xe = I(ye, 2), Se = N(xe);
			K(Se);
			var Ce = I(Se);
			E(xe);
			var we = I(xe, 2), Te = N(we);
			K(Te);
			var Ee = I(Te);
			E(we), E(ve), E(he), R((e, t, n, r, i, a, o, s, c, l, u, d) => {
				J(te, "title", e), U(ne, `${t ?? ""} `), J(oe, "title", n), U(se, `${r ?? ""} `), J(de, "title", i), U(fe, `${a ?? ""} `), J(ge, "title", o), U(_e, s), J(xe, "title", c), Ci(Se, z(M).hideMobile), U(Ce, ` ${l ?? ""}`), J(we, "title", u), Ci(Te, z(M).decor), U(Ee, ` ${d ?? ""}`);
			}, [
				() => Y("tip.fit"),
				() => Y("lbl.fit"),
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
			]), B("change", Se, (e) => ur(e.target.checked)), B("change", Te, (e) => or(e.target.checked)), H(e, t);
		};
		W(d, (e) => {
			z(Dn) === "content" ? e(f) : e(p, -1);
		}), R((e, t) => {
			a = gi(i, 1, "svelte-1n46o8q", null, a, { on: z(Dn) === "content" }), U(o, e), l = gi(c, 1, "svelte-1n46o8q", null, l, { on: z(Dn) === "style" }), U(u, t);
		}, [() => Y("props.tabContent"), () => Y("props.tabStyle")]), B("click", i, () => j(Dn, "content")), B("click", c, () => j(Dn, "style")), H(e, t);
	}, l = (e) => `<svg width="40" height="26" viewBox="0 0 40 26" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${e}</svg>`, u = {
		bar: l("<rect x=\"1\" y=\"1\" width=\"38\" height=\"7\" rx=\"1\"/><rect x=\"1\" y=\"11\" width=\"38\" height=\"14\" rx=\"1\" stroke-opacity=\"0.35\"/>"),
		floating: l("<rect x=\"5\" y=\"2\" width=\"30\" height=\"7\" rx=\"3.5\"/><rect x=\"1\" y=\"11\" width=\"38\" height=\"14\" rx=\"1\" stroke-opacity=\"0.35\"/>"),
		"floating-square": l("<rect x=\"5\" y=\"2\" width=\"30\" height=\"7\"/><rect x=\"1\" y=\"11\" width=\"38\" height=\"14\" rx=\"1\" stroke-opacity=\"0.35\"/>"),
		"floating-tab": l("<path d=\"M5 1h30v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z\"/><rect x=\"1\" y=\"11\" width=\"38\" height=\"14\" rx=\"1\" stroke-opacity=\"0.35\"/>"),
		"side-left": l("<rect x=\"1\" y=\"1\" width=\"9\" height=\"24\" rx=\"1\"/><rect x=\"13\" y=\"1\" width=\"26\" height=\"24\" rx=\"1\" stroke-opacity=\"0.35\"/>"),
		"side-right": l("<rect x=\"30\" y=\"1\" width=\"9\" height=\"24\" rx=\"1\"/><rect x=\"1\" y=\"1\" width=\"26\" height=\"24\" rx=\"1\" stroke-opacity=\"0.35\"/>")
	}, d = {
		"": l("<rect x=\"1\" y=\"4\" width=\"38\" height=\"18\" rx=\"1\" stroke-opacity=\"0.35\"/>"),
		bottom: l("<rect x=\"1\" y=\"4\" width=\"38\" height=\"18\" rx=\"1\" stroke-opacity=\"0.35\"/><path d=\"M1 22h38\" stroke-width=\"2.5\"/>"),
		top: l("<rect x=\"1\" y=\"4\" width=\"38\" height=\"18\" rx=\"1\" stroke-opacity=\"0.35\"/><path d=\"M1 4h38\" stroke-width=\"2.5\"/>"),
		both: l("<rect x=\"1\" y=\"4\" width=\"38\" height=\"18\" rx=\"1\" stroke-opacity=\"0.35\"/><path d=\"M1 4h38M1 22h38\" stroke-width=\"2.5\"/>"),
		all: l("<rect x=\"1\" y=\"4\" width=\"38\" height=\"18\" rx=\"1\" stroke-width=\"2.5\"/>")
	}, p = (e) => `<svg width="48" height="34" viewBox="0 0 48 34" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${e}</svg>`, m = {
		card: p("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><rect x=\"10\" y=\"6\" width=\"28\" height=\"24\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.18\"/><path d=\"M15 13h18M15 19h14M15 25h16\" stroke-opacity=\"0.8\"/>"),
		flat: p("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><rect x=\"1\" y=\"6\" width=\"46\" height=\"24\" fill=\"currentColor\" fill-opacity=\"0.12\" stroke=\"none\"/><path d=\"M15 13h18M15 19h14M15 25h16\" stroke-opacity=\"0.8\"/>"),
		pills: p("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><rect x=\"10\" y=\"7\" width=\"28\" height=\"6\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.35\" stroke=\"none\"/><rect x=\"10\" y=\"16\" width=\"28\" height=\"6\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.2\" stroke=\"none\"/><rect x=\"10\" y=\"25\" width=\"28\" height=\"6\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.2\" stroke=\"none\"/>"),
		lines: p("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><path d=\"M12 12h24M12 21h24M12 30h24\" stroke-opacity=\"0.8\"/>"),
		flyout: p("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><rect x=\"1\" y=\"6\" width=\"46\" height=\"24\" fill=\"currentColor\" fill-opacity=\"0.12\" stroke=\"none\"/><path d=\"M6 13h10M6 19h8M22 13h10M22 19h8M38 13h6M38 19h4\" stroke-opacity=\"0.8\"/>")
	}, g = {
		grid: p("<rect x=\"1\" y=\"1\" width=\"46\" height=\"32\" rx=\"3\" stroke-opacity=\"0.35\"/><rect x=\"6\" y=\"6\" width=\"10\" height=\"10\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><rect x=\"19\" y=\"6\" width=\"10\" height=\"10\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><rect x=\"32\" y=\"6\" width=\"10\" height=\"10\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><path d=\"M7 20h8M20 20h8M33 20h8\" stroke-opacity=\"0.7\"/><path d=\"M6 26h10M19 26h10M32 26h10\" stroke-opacity=\"0.35\"/>"),
		list: p("<rect x=\"1\" y=\"1\" width=\"46\" height=\"32\" rx=\"3\" stroke-opacity=\"0.35\"/><rect x=\"6\" y=\"6\" width=\"7\" height=\"7\" rx=\"2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><rect x=\"6\" y=\"17\" width=\"7\" height=\"7\" rx=\"2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><path d=\"M17 9.5h24M17 20.5h18\" stroke-opacity=\"0.7\"/>"),
		cover: p("<rect x=\"1\" y=\"1\" width=\"46\" height=\"32\" rx=\"3\" stroke-opacity=\"0.35\"/><rect x=\"6\" y=\"6\" width=\"16\" height=\"12\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><rect x=\"26\" y=\"6\" width=\"16\" height=\"12\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><path d=\"M6 14h16M26 14h16\" stroke-opacity=\"0.55\" stroke-width=\"3\"/><path d=\"M6 23h12M26 23h12\" stroke-opacity=\"0.35\"/>")
	}, _ = (e) => `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">${e}</svg>`, v = {
		dot: _("<circle cx=\"12\" cy=\"12\" r=\"3\"/>"),
		dash: _("<rect x=\"3\" y=\"10.6\" width=\"18\" height=\"2.8\" rx=\"1.4\"/>"),
		slash: _("<path d=\"M15.5 3.5L8.5 20.5\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\" fill=\"none\"/>"),
		star: _("<path d=\"M12 2.8l2.3 6.1 6.5.4-5 4.1 1.6 6.3-5.4-3.5-5.4 3.5 1.6-6.3-5-4.1 6.5-.4z\"/>"),
		none: _("<path d=\"M5 12h14\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\" opacity=\"0.35\"/><path d=\"M6 6l12 12\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>"),
		custom: _("<path d=\"M5 8h14M5 12h9M5 16h12\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>")
	}, y = /* @__PURE__ */ k(() => [
		["text", Y("opt.ribbonStripe.text")],
		["marks", Y("opt.ribbonStripe.marks")],
		["plain", Y("opt.ribbonStripe.plain")]
	]), b = /* @__PURE__ */ k(() => [["none", Y("common.none")], ...z(y)]), x = /* @__PURE__ */ k(() => [
		["dot", Y("opt.ribbonSep.dot")],
		["dash", Y("opt.ribbonSep.dash")],
		["slash", Y("opt.ribbonSep.slash")],
		["star", Y("opt.ribbonSep.star")],
		["none", Y("common.none")],
		["custom", Y("opt.ribbonSep.custom")]
	]), S = /* @__PURE__ */ A("");
	function ee() {
		z(S).trim() && (j(_o, z(S), !0), j(vo, null), wo() !== !1 && j(S, ""));
	}
	let te = [
		["color", hu],
		["gradient", Du],
		["glow", Ou],
		["image", Cd],
		["slideshow", uf],
		["video", kf],
		["pattern", Vu],
		["grain", Au]
	], ne = Object.fromEntries(te), C = {
		copy: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"9\" y=\"9\" width=\"11\" height=\"11\" rx=\"2\"/><path d=\"M5 15V5a2 2 0 0 1 2-2h10\"/></svg>",
		phone: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><rect x=\"8\" y=\"3\" width=\"8\" height=\"18\" rx=\"2\"/><path d=\"M11 17.5h2\"/></svg>",
		shuffle: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M16 3h5v5\"/><path d=\"M4 20 21 3\"/><path d=\"M21 16v5h-5\"/><path d=\"M15 15l6 6\"/><path d=\"M4 4l5 5\"/></svg>",
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
	}, re = [
		["purple", Y("adminTheme.purple")],
		["well", Y("adminTheme.well")],
		["gold", Y("adminTheme.gold")],
		["grey", Y("adminTheme.grey")],
		["aurora", Y("adminTheme.aurora")],
		["dusk", Y("adminTheme.dusk")],
		["ember", Y("adminTheme.ember")]
	], ie = {
		lilla: "purple",
		bronn: "well",
		gull: "gold",
		graa: "grey",
		nordlys: "aurora",
		skumring: "dusk",
		glo: "ember"
	}, ae = /* @__PURE__ */ A(en((() => {
		let e = localStorage.getItem("urd-admin-theme");
		return ie[e] ?? e ?? "grey";
	})()));
	bn(() => {
		document.documentElement.dataset.adminTheme = z(ae), localStorage.setItem("urd-admin-theme", z(ae)), oe();
	});
	function oe() {
		let e = getComputedStyle(document.documentElement), t = e.getPropertyValue("--urd-color-accent").trim();
		nt?.sendAdminTheme({
			bg: e.getPropertyValue("--urd-color-bg").trim(),
			surface: e.getPropertyValue("--urd-color-surface").trim(),
			accent: t,
			text: e.getPropertyValue("--urd-color-text").trim(),
			"accent-text": se(t)
		});
	}
	function se(e) {
		return pu(e) == null || (mu(e, "#ffffff") ?? 0) >= (mu(e, "#0b0e14") ?? 0) ? "#ffffff" : "#0b0e14";
	}
	let ce = /* @__PURE__ */ A(null), w = /* @__PURE__ */ A(null), le = /* @__PURE__ */ A(!1), ue = /* @__PURE__ */ A(""), de = /* @__PURE__ */ A("info"), fe = 0;
	function T(e, t = "info") {
		j(ue, e, !0), j(de, t, !0);
		let n = ++fe;
		t === "ok" && setTimeout(() => {
			fe === n && (j(ue, ""), j(de, "info"));
		}, 8e3);
	}
	function pe() {
		T(Y("status.storageFull"), "error");
	}
	function me(e, t) {
		try {
			localStorage.setItem(e, t);
		} catch {
			pe();
		}
	}
	let he = /* @__PURE__ */ A(null), ge = /* @__PURE__ */ A(null), _e = /* @__PURE__ */ A(en({
		size: 16,
		snap: !0
	})), ve = /* @__PURE__ */ A(!0), ye = /* @__PURE__ */ A(en(Vo(typeof window < "u" ? window : null) ?? 1920)), be = "urd-admin-screen";
	function xe() {
		let e = null;
		try {
			e = JSON.parse(localStorage.getItem(be) ?? "null");
		} catch {
			e = null;
		}
		return Ho(e, z(ye));
	}
	let Se = /* @__PURE__ */ A(en(xe()));
	function Ce(e) {
		j(Se, Ho({
			...Ke(z(Se)),
			...e
		}, z(ye)), !0);
		try {
			localStorage.setItem(be, JSON.stringify(z(Se)));
		} catch {}
	}
	let we = /* @__PURE__ */ k(() => Uo(z(Se), z(ye))), Te = [
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
	], Ee = /* @__PURE__ */ k(() => [{
		id: "desktop",
		width: z(we).width,
		height: z(we).height || null,
		viewport: "desktop"
	}, ...Te]);
	function De(e) {
		let t = Zo(z(Ms), z(Ns), e.width).width;
		return Y(e.id === "desktop" ? z(Se).mode === "own" ? "tip.view.desktop" : e.height ? "tip.view.desktopSizeH" : "tip.view.desktopSize" : `tip.view.${e.id}`, {
			w: e.width,
			h: e.height ?? 0,
			c: t
		});
	}
	let ke = /* @__PURE__ */ A("desktop"), Ae = /* @__PURE__ */ k(() => z(Ee).find((e) => e.id === z(ke)) ?? z(Ee)[0]), je = /* @__PURE__ */ k(() => z(Ae).viewport === "mobile" || z(Ae).width <= (z(O)?.breakpoints?.mobile ?? 640) ? "mobile" : "desktop"), Me = /* @__PURE__ */ A(null), Ne = /* @__PURE__ */ A(0), Pe = /* @__PURE__ */ A(0), Fe = /* @__PURE__ */ A("fit"), Ie = /* @__PURE__ */ A(1), Le = /* @__PURE__ */ k(() => Xo(z(Ms), z(Ns))), Re = /* @__PURE__ */ k(() => z(Ae).width), ze = /* @__PURE__ */ k(() => z(Ae).height ?? 0), Be = /* @__PURE__ */ k(() => z(Fe) === "manual" ? z(Ie) : Po(z(Ne), z(Re), "fit", z(Pe), z(ze)));
	function Ve(e) {
		let t = Math.min(400, Math.max(10, (Math.round(Math.round(z(Be) * 100) / 10) + e) * 10));
		j(Ie, t / 100), j(Fe, "manual");
	}
	let He = /* @__PURE__ */ k(() => z(ze) > 0 ? z(ze) : z(Be) > 0 ? z(Pe) / z(Be) : z(Pe)), Ue = /* @__PURE__ */ k(() => z(Re) * z(Be)), We = /* @__PURE__ */ k(() => z(ze) > 0 ? z(ze) * z(Be) : z(Pe)), Ge = /* @__PURE__ */ k(() => z(Ue) > z(Ne) + 1 || z(We) > z(Pe) + 1);
	bn(() => {
		let e = () => nt?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), bn(() => {
		let e = z(je);
		nt?.sendViewport(e);
	}), bn(() => {
		let e = z(Be);
		nt?.sendZoom(e);
	}), bn(() => {
		let e = () => {
			j(ye, Vo(window) ?? z(ye), !0);
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}), bn(() => {
		let e = z(Me);
		if (!e || typeof ResizeObserver > "u") return;
		let t = () => {
			j(Ne, e.clientWidth, !0), j(Pe, e.clientHeight, !0);
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	});
	let qe = /* @__PURE__ */ A(0);
	function Je() {
		j(qe, D?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function Ye() {
		let e = D?.data.sections.find((e) => e.responsive?.mobile?.attention?.needed);
		j(ke, "mobile"), e && setTimeout(() => nt?.sendScrollSection(e.id), 0);
	}
	function Qe(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			mt("layout");
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
			}, et(t, "layout-changed"), e.sectionId === z(_r) && j(yr, e.minHeight, !0), z(M)?.sectionId === e.sectionId && nn(), D.save(), lt(), nt?.sendSection(z(w), t);
		}
	}
	function $e(e) {
		return e?.blocks?.some((e) => e.frames?.mobile) ?? !1;
	}
	function et(e, t) {
		e && $e(e) && (e.responsive?.mobile?.attention?.needed || (e.responsive = {
			...e.responsive ?? {},
			mobile: {
				...e.responsive?.mobile ?? { mode: "auto" },
				attention: {
					needed: !0,
					reason: t,
					since: (/* @__PURE__ */ new Date()).toISOString()
				}
			}
		}, Je(), nt?.sendAttention(e.id, !0)));
	}
	let D = null, tt = null, nt = null, O = /* @__PURE__ */ A(null);
	function rt() {
		j(O, tt.data, !0), tt.replace(z(O));
	}
	function it() {
		nt?.sendSite(Ke(z(O)));
	}
	let at = /* @__PURE__ */ new Set(), ct = () => z(O).pages.find((e) => e.id === z(w));
	function lt() {
		let e = z(O)?.pages?.some((e) => !at.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = tl?.hasDraft() || Object.values(nl).some((e) => e.hasDraft()), n = gl?.hasDraft() || Object.values(_l).some((e) => e.hasDraft());
		j(le, e || D?.hasDraft() && !at.has(z(w)) || tt?.hasDraft() || tu?.hasDraft() || t || n || !1, !0);
	}
	let ut = [], dt = [], ft = null;
	function pt() {
		return JSON.stringify({
			pageId: z(w),
			page: D.data,
			site: tt.data,
			collectionsIndex: il ? tl.data : null,
			collections: il ? Object.fromEntries(Object.entries(nl).map(([e, t]) => [e, t.data])) : {},
			templatesIndex: bl ? gl.data : null,
			templates: bl ? Object.fromEntries(Object.entries(_l).map(([e, t]) => [e, t.data])) : {},
			plugins: tu?.data ?? null
		});
	}
	function mt(e) {
		(e !== ft || !e.startsWith("edit:") && !e.startsWith("grid:")) && (ut.push(pt()), ut.length > 50 && ut.shift(), dt.length = 0, ft = e);
	}
	function ht(e) {
		let { pageId: t, page: n, site: r, collectionsIndex: i, collections: a, templatesIndex: o, templates: s, plugins: c } = JSON.parse(e);
		if (tt.replace(r), rt(), tt.save(), j(_e, {
			snap: !0,
			...z(O).grid
		}, !0), it(), gt(i, a ?? {}), _t(o, s ?? {}), vt(c), t && t !== z(w) && z(O).pages.some((e) => e.id === t)) {
			me(`urd-draft-${t}`, JSON.stringify(n)), Ya(t, { keepHistory: !0 }), lt();
			return;
		}
		D.replace(n), D.save(), lt(), Je(), nn(), Dr(D.data.sections.find((e) => e.id === z(_r))), z(O).pages.some((e) => e.id === z(w)) ? nt?.sendPage(z(w), D.data) : Ya(z(O).pages[0].id, { keepHistory: !0 });
	}
	function gt(e, t) {
		if (tl && e && JSON.stringify({
			index: tl.data,
			collections: Object.fromEntries(Object.entries(nl).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			collections: t
		})) {
			tl.replace(e), tl.save();
			for (let e of Object.keys(nl)) e in t || (localStorage.removeItem(`urd-draft-collection-${e}`), localStorage.removeItem(`urd-draft-samling-${e}`), delete nl[e]);
			for (let [e, n] of Object.entries(t)) {
				if (!nl[e]) {
					let t = rl[e] ?? null;
					nl[e] = na(`urd-draft-collection-${e}`, () => t, pe, `urd-draft-samling-${e}`);
				}
				nl[e].replace(n), nl[e].save();
			}
			j(al, [...e.samlinger ?? []], !0), z(sl) && !z(al).includes(z(sl)) && j(sl, null), Al();
		}
	}
	function _t(e, t) {
		if (gl && e && JSON.stringify({
			index: gl.data,
			templates: Object.fromEntries(Object.entries(_l).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			templates: t
		})) {
			gl.replace(e), gl.save();
			for (let e of Object.keys(_l)) e in t || (localStorage.removeItem(`urd-draft-template-${e}`), localStorage.removeItem(`urd-draft-mal-${e}`), delete _l[e]);
			for (let [e, n] of Object.entries(t)) _l[e] || (_l[e] = na(`urd-draft-template-${e}`, () => vl[e] ?? null, pe, `urd-draft-mal-${e}`)), _l[e].replace(n), _l[e].save();
			j(xl, [...e.maler ?? []], !0), lt(), Cl();
		}
	}
	function vt(e) {
		tu && e && JSON.stringify(tu.data) !== JSON.stringify(e) && (tu.replace(e), tu.save(), Cu(), Ru());
	}
	function yt() {
		ut.length && (dt.push(pt()), ht(ut.pop()), ft = null, T(Y("status.undone")));
	}
	function bt() {
		dt.length && (ut.push(pt()), ht(dt.pop()), ft = null, T(Y("status.redone")));
	}
	function xt(e) {
		z(an) && (e.target instanceof Element && e.target.closest(".block-menu") || j(an, null));
	}
	function St(e) {
		if (e.key === "Escape" && z(an)) {
			j(an, null);
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
			].includes(t.type)) || !z(M) || z(je) === "mobile") return;
			e.preventDefault(), nt?.sendDuplicate();
			return;
		}
		if (t !== "z" && t !== "y") return;
		let n = e.target;
		n instanceof HTMLElement && (n.isContentEditable || n.tagName === "TEXTAREA" || n.tagName === "INPUT" && ![
			"number",
			"checkbox",
			"range",
			"color"
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? bt() : yt());
	}
	async function Ct() {
		j(ce, Bs(await (await fetch("/content/site.json")).json()), !0), tt = na("urd-draft-site", () => z(ce), pe), (tt.data.schemaVersion ?? 1) > 4 && (console.warn(`Urd: the site draft has schemaVersion ${tt.data.schemaVersion} (the engine has 4) and is discarded`), tt.replace(Ke(z(ce)))), tt.replace(Bs(tt.data)), tt.save(), rt(), j(_e, {
			snap: !0,
			...z(O).grid
		}, !0), await Ya(new URLSearchParams(location.search).get("page") ?? z(O).pages[0].id), await ku(), await kl(), await Sl(), await ha(), z(ge) && _a(), Qt(), z(O).site.setup === !0 && !localStorage.getItem("urd-setup-done") && (j(At, z(O).site.title, !0), j(jt, z(O).theme.tokens.color.accent, !0), j(Mt, z(O).theme.tokens.color.bg, !0), j(kt, !0));
	}
	let wt = /* @__PURE__ */ A(null);
	function Tt({ title: e, lines: t = [], okLabel: n = Y("confirm.ok"), cancelLabel: r = Y("confirm.cancel") }) {
		return new Promise((i) => {
			j(wt, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function Et({ title: e, lines: t = [], value: n = "", placeholder: r = "", okLabel: i = Y("confirm.ok"), cancelLabel: a = Y("confirm.cancel") }) {
		return new Promise((o) => {
			j(wt, {
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
	function Dt(e) {
		z(wt)?.resolve(z(wt).prompt ? e ? z(wt).value : null : e), j(wt, null);
	}
	let Ot = !1;
	bn(() => {
		if (!z(wt)) return;
		let e = (e) => {
			e.key === "Escape" && (e.stopPropagation(), Dt(!1));
		};
		return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
	});
	let kt = /* @__PURE__ */ A(!1), At = /* @__PURE__ */ A(""), jt = /* @__PURE__ */ A("#7c5cff"), Mt = /* @__PURE__ */ A("#0b0e14");
	function Nt() {
		localStorage.setItem("urd-setup-done", "1"), j(kt, !1);
	}
	function Pt() {
		let e = z(At).trim();
		e && (ho("setup", () => {
			z(O).site.title = e, z(O).nav.logo = {
				type: "text",
				value: e
			}, z(O).theme.tokens.color.accent = z(jt), z(O).theme.tokens.color.bg = z(Mt), delete z(O).site.setup;
		}), Nt(), T(Y("status.setupDone"), "ok"));
	}
	let Ft = "urd-admin-panels", It = "urd-admin-panel-open", Lt = /* @__PURE__ */ A(en(localStorage.getItem(Ft) === "reset" ? "reset" : "remember"));
	function Rt(e) {
		j(Lt, e === "reset" ? "reset" : "remember", !0), z(Lt) === "reset" ? localStorage.setItem(Ft, "reset") : localStorage.removeItem(Ft);
	}
	let zt = /* @__PURE__ */ A(en(z(Lt) === "reset" ? null : localStorage.getItem(It))), Bt = [
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
	], Vt = [
		"rail.thisPage",
		"rail.site",
		"rail.system"
	], Ht = Object.fromEntries(Bt.flat().map((e) => [e, Y(`panel.${e}`)]));
	z(zt) && !Ht[z(zt)] && j(zt, null), bn(() => {
		if (z(Lt) === "reset") {
			localStorage.removeItem(It);
			return;
		}
		z(zt) ? localStorage.setItem(It, z(zt)) : localStorage.removeItem(It);
	});
	let Ut = {
		pages: ["hint.pages.drafts"],
		blocks: ["hint.blocks.intro"],
		grid: ["hint.grid.intro", "hint.grid.section"],
		collections: ["hint.collections.intro"],
		plugins: ["hint.plugins.intro"],
		history: ["hint.history.intro"]
	}, Wt = [
		["se", "Davvisámegiella"],
		["en-GB", "English (UK)"],
		["nb", "Norsk bokmål"],
		["nn", "Norsk nynorsk"],
		["tr", "Türkçe"]
	], Gt = (e) => [...e].sort((e, t) => e[1].localeCompare(t[1]));
	function Kt(e, t) {
		let n = [];
		for (let r of e) for (let e of uu[r]?.languages ?? []) e?.[t] === !0 && typeof e.code == "string" && typeof e.name == "string" && e.name && (Wt.some(([t]) => t === e.code) || n.some(([t]) => t === e.code) || n.push([e.code, e.name]));
		return n;
	}
	function qt() {
		let e = Gt([...Wt, ...Kt(z(bu), "admin")]);
		return Yt === "auto" || e.some(([e]) => e === Yt) ? e : [[Yt, Yt], ...e];
	}
	let Jt = () => Kt(z(lu)?.enabled ?? [], "site"), Yt = localStorage.getItem("urd-admin-lang") ?? "auto";
	function Xt(e) {
		e !== Yt && (e === "auto" ? localStorage.removeItem("urd-admin-lang") : localStorage.setItem("urd-admin-lang", e), location.reload());
	}
	function Zt(e) {
		j(zt, z(zt) === e ? null : e, !0), Qt();
	}
	function Qt() {
		z(zt) === "history" && Ca(), z(zt) === "update" && !z(Fa) && Ua();
	}
	let M = /* @__PURE__ */ A(null);
	function $t(e, t) {
		let n = D?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function nn() {
		if (!z(M)) return;
		let { block: e } = $t(z(M).sectionId, z(M).blockId);
		if (!e) {
			j(M, null);
			return;
		}
		j(M, {
			sectionId: z(M).sectionId,
			blockId: z(M).blockId,
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
	function rn(e) {
		if (j(an, null), !e.blockId) {
			j(M, null);
			return;
		}
		j(M, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), e.sectionId && j(_r, e.sectionId, !0), nn();
	}
	let an = /* @__PURE__ */ A(null), on = window.matchMedia("(prefers-reduced-motion: reduce)").matches, sn = [
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
	function cn() {
		let e = D?.data.sections ?? [], t = e.findIndex((e) => e.id === z(M)?.sectionId);
		return t < 0 ? [["", Y("opt.sticky.ownSection")]] : [["", Y("opt.sticky.ownSection")], ...e.slice(t + 1).map((e, n) => [e.id, Y("opt.sticky.atSection", { n: t + 2 + n })])];
	}
	function ln(e) {
		if (rn(e), !z(M)) return;
		let t = z(he)?.getBoundingClientRect();
		if (!t) return;
		let n = t.left + z(Be) * e.rect.right + 12;
		n + 300 > window.innerWidth - 8 && (n = Math.max(8, t.left + z(Be) * e.rect.left - 300 - 12));
		let r = window.innerHeight - Math.min(window.innerHeight * .7, 560) - 8, i = Math.min(Math.max(8, t.top + z(Be) * e.rect.top), Math.max(8, r));
		j(an, {
			left: n,
			top: i
		}, !0);
	}
	function un(e, t) {
		let { section: n, block: r } = $t(z(M)?.sectionId, z(M)?.blockId);
		r && (e && mt(e), t(r, n), et(n, "block-edited"), D.save(), lt(), nt?.sendSection(z(w), n), nn());
	}
	function L(e, t) {
		un(`edit:${z(M).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function dn(e, t) {
		un(`edit:${z(M).blockId}:${e}`, (e) => {
			Object.assign(e.props, t);
		});
	}
	let fn = /* @__PURE__ */ A("title"), pn = {
		list: "calendar.viewList",
		cards: "calendar.viewCards",
		month: "calendar.viewMonth",
		agenda: "calendar.viewAgenda",
		next: "calendar.viewNext",
		week: "calendar.viewWeek",
		day: "calendar.viewDay",
		year: "calendar.viewYear"
	};
	function mn(e) {
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
	function hn() {
		return z(M)?.props.fieldStyle?.[z(fn)] ?? {};
	}
	function gn(e) {
		let t = Uf(e);
		dn("design", {
			design: t.id === "plain" ? void 0 : t.id,
			...t.view ? { view: t.view } : {}
		});
	}
	function _n(e, t) {
		let n = { ...z(M).props.colors ?? {} };
		t ? n[e] = t : delete n[e], L("colors", Object.keys(n).length ? n : void 0);
	}
	function vn(e) {
		let t = {
			...z(M).props.stripe ?? {},
			...e
		};
		for (let e of Object.keys(t)) t[e] === void 0 && delete t[e];
		L("stripe", Object.keys(t).length ? t : void 0);
	}
	function yn(e) {
		let t = { ...z(M).props.fieldStyle ?? {} }, n = {
			...t[z(fn)] ?? {},
			...e
		};
		for (let e of Object.keys(n)) n[e] === void 0 && delete n[e];
		Object.keys(n).length ? t[z(fn)] = n : delete t[z(fn)], L("fieldStyle", Object.keys(t).length ? t : void 0);
	}
	let xn = /* @__PURE__ */ new Set([
		"image",
		"video",
		"shape",
		"icon"
	]);
	function Sn(e) {
		un(`edit:${z(M).blockId}:fit`, (t) => {
			e === "shrink" ? (t.fit = "shrink", t.fitMin ??= .6) : (delete t.fit, delete t.fitMin);
		});
	}
	function Cn(e) {
		un(`edit:${z(M).blockId}:fitMin`, (t) => {
			t.fitMin = e;
		});
	}
	let wn = en({}), Tn = en({}), En = /* @__PURE__ */ A(!1), Dn = /* @__PURE__ */ A("content"), On = (e, t) => (Number.isFinite(t) || (t = e.min ?? 0), e.min != null && (t = Math.max(e.min, t)), e.max != null && (t = Math.min(e.max, t)), t);
	async function kn(e) {
		let t = z(M).blockId, n = `${t}:${e.key}`, r = (wn[n] ?? z(M).props[e.key] ?? "").trim();
		Tn[n] = null;
		let i = r.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
		if (!r || i || /^https?:\/\//i.test(r)) {
			dn(e.key, {
				[e.key]: r,
				lat: i ? Number(i[1]) : null,
				lon: i ? Number(i[2]) : null
			});
			return;
		}
		j(En, !0), Tn[n] = {
			text: Y("props.place.searching"),
			err: !1
		};
		try {
			let i = await fetch(`/api/geocode?q=${encodeURIComponent(r)}`), a = await i.json().catch(() => null);
			if (z(M)?.blockId !== t) return;
			i.ok && Number.isFinite(a?.lat) ? (dn(e.key, {
				[e.key]: r,
				lat: a.lat,
				lon: a.lon
			}), Tn[n] = null) : Tn[n] = {
				text: Ji(a) ?? Y("props.place.notFound"),
				err: !0
			};
		} catch {
			Tn[n] = {
				text: Y("props.place.failed"),
				err: !0
			};
		} finally {
			j(En, !1);
		}
	}
	function An(e, t) {
		Number.isFinite(t) && un(`edit:frame-${z(M).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function jn(e) {
		un(`edit:${z(M).blockId}:boxStyle`, (t) => {
			let n = {
				...t.props.boxStyle ?? {},
				...e
			};
			for (let e of Object.keys(n)) n[e] ?? delete n[e];
			Object.keys(n).length ? t.props.boxStyle = n : delete t.props.boxStyle;
		});
	}
	let Mn = [
		"text",
		"email",
		"tel",
		"textarea",
		"select",
		"checkbox",
		"radio",
		"date"
	], Nn = /* @__PURE__ */ new Set(["select", "radio"]), Pn = () => "f" + [...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(3))].map((e) => e.toString(16).padStart(2, "0")).join("");
	function Fn(e, t) {
		un(`edit:${z(M).blockId}:field${e}`, (n) => {
			let r = {
				...n.props.fields[e],
				...t
			};
			Nn.has(r.type) ? r.options ??= [] : delete r.options, n.props.fields[e] = r;
		});
	}
	function In(e, t) {
		Fn(e, { options: String(t).split(",").map((e) => e.trim()).filter(Boolean) });
	}
	function Ln() {
		un("form-field", (e) => {
			(e.props.fields ??= []).push({
				id: Pn(),
				label: Y("form.newField"),
				type: "text",
				required: !1
			});
		});
	}
	function Rn(e) {
		un("form-field", (t) => {
			t.props.fields.splice(e, 1);
		});
	}
	function zn(e, t) {
		let n = e + t;
		un("form-field", (t) => {
			n < 0 || n >= t.props.fields.length || ([t.props.fields[e], t.props.fields[n]] = [t.props.fields[n], t.props.fields[e]]);
		});
	}
	let Bn = (e) => e && typeof e == "object" ? {
		url: e.url ?? "",
		name: e.name ?? "",
		color: e.color ?? ""
	} : {
		url: typeof e == "string" ? e : "",
		name: "",
		color: ""
	}, Vn = ({ url: e, name: t, color: n }) => t || n ? {
		url: e,
		...t ? { name: t } : {},
		...n ? { color: n } : {}
	} : e;
	function Hn(e, t) {
		un(`edit:${z(M).blockId}:source${e}`, (n) => {
			let r = [...n.props.sources ?? []];
			r[e] = Vn({
				...Bn(r[e]),
				...t
			}), n.props.sources = r;
		});
	}
	function Un() {
		L("sources", [...z(M).props.sources ?? [], ""]);
	}
	function Wn(e) {
		L("sources", (z(M).props.sources ?? []).filter((t, n) => n !== e));
	}
	let Gn = /* @__PURE__ */ A(null);
	async function Kn() {
		let e = /* @__PURE__ */ new Set(), t = (t) => {
			for (let n of t?.sections ?? []) for (let t of n.blocks ?? []) if (t.type === "calendar") for (let n of t.props?.sources ?? []) {
				let { url: t } = Bn(n);
				t.trim() && e.add(t.trim());
			}
		};
		t(D?.data), await Promise.all((z(O).pages ?? []).filter((e) => e.id !== z(w)).map(async (e) => {
			try {
				let n = localStorage.getItem(`urd-draft-${e.id}`);
				t(n ? JSON.parse(n) : await (await fetch(`/${e.file}`)).json());
			} catch {}
		})), j(Gn, [...e], !0);
	}
	function qn(e) {
		let t = z(M).props.sources ?? [];
		t.some((t) => Bn(t).url === e) || L("sources", [...t, e]);
	}
	function Jn(e, t) {
		un(`edit:${z(M).blockId}:faq${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function Yn() {
		un("faq-item", (e) => {
			(e.props.items ??= []).push({
				q: Y("seed.faq.newQ"),
				a: Y("seed.faq.answer")
			});
		});
	}
	function Xn(e) {
		un("faq-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function Zn(e, t) {
		let n = e + t;
		un("faq-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function Qn(e, t) {
		un(`edit:${z(M).blockId}:ribbon${e}`, (n) => {
			n.props.items[e] = t;
		});
	}
	function $n() {
		un("ribbon-item", (e) => {
			(e.props.items ??= []).push(Y("seed.ribbonBlock.new"));
		});
	}
	function er(e) {
		un("ribbon-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function tr(e, t) {
		let n = e + t;
		un("ribbon-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function nr(e, t) {
		un(`edit:${z(M).blockId}:tl${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function rr() {
		un("tl-item", (e) => {
			(e.props.items ??= []).push({
				year: "",
				title: Y("seed.timeline.newTitle"),
				text: ""
			});
		});
	}
	function ir(e) {
		un("tl-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function ar(e, t) {
		let n = e + t;
		un("tl-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function or(e) {
		un("decor", (t) => {
			t.decor = e;
		});
	}
	function sr(e, t) {
		un(`edit:${z(M).blockId}:table-form`, (n) => {
			let r = (Array.isArray(n.props.rows) && n.props.rows.length ? n.props.rows : [[""]]).map((e) => Array.isArray(e) ? e.map((e) => String(e ?? "")) : [""]), i = Math.max(1, ...r.map((e) => e.length));
			r = r.map((e) => [...e, ...Array(i - e.length).fill("")]), e > 0 ? r.push(Array(i).fill("")) : e < 0 && r.length > 1 && r.pop(), t > 0 ? r = r.map((e) => [...e, ""]) : t < 0 && i > 1 && (r = r.map((e) => e.slice(0, i - 1))), n.props.rows = r;
		});
	}
	function cr(e, t) {
		un(`edit:${z(M).blockId}:share`, (n) => {
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
	function lr(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		let n = new FileReader();
		n.onload = () => {
			L("src", String(n.result ?? "")), t.size > 4e5 && T(Y("status.audioLarge", { kb: Math.round(t.size / 1024) }), "error");
		}, n.onerror = () => T(Y("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function ur(e) {
		let { section: t, block: n } = $t(z(M)?.sectionId, z(M)?.blockId);
		n && (mt("hide-mobile"), n.hideMobile = e, D.save(), lt(), nt?.sendSection(z(w), t), nn());
	}
	async function dr(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await ui(t);
			un(`edit:${z(M).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || Ba(t.name).replaceAll("-", " ");
			});
		} catch (e) {
			T(di(e), "error");
		}
	}
	async function pr(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await ui(t);
			un(`edit:${z(M).blockId}`, (t) => {
				t.props.image = e.dataUrl;
			});
		} catch (e) {
			T(di(e), "error");
		}
	}
	let mr = {
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
	}, hr = [
		["line", Y("shape.line")],
		["arrow", Y("shape.arrow")],
		["circle", Y("shape.circle")],
		["rect", Y("shape.rect")],
		["triangle", Y("shape.triangle")]
	], gr = [
		["accent", Y("color.accent")],
		["text", Y("color.text")],
		["surface", Y("color.surface")],
		["bg", Y("color.bg")]
	], _r = /* @__PURE__ */ A(null), vr = /* @__PURE__ */ A(null), yr = /* @__PURE__ */ A(""), br = /* @__PURE__ */ A(en([])), Sr = /* @__PURE__ */ A(null), wr = /* @__PURE__ */ A(null), Tr = /* @__PURE__ */ A(""), Er = /* @__PURE__ */ A(en({}));
	function Dr(e) {
		j(vr, e?.grid ? { ...e.grid } : null, !0), j(yr, e?.size?.minHeight ?? "", !0), j(br, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), j(Sr, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0), j(wr, e?.hover ? JSON.parse(JSON.stringify(e.hover)) : null, !0), j(Tr, e?.theme ?? "", !0), j(Er, e?.divider ? JSON.parse(JSON.stringify(e.divider)) : {}, !0);
	}
	let Or = /* @__PURE__ */ A(null), kr = en({});
	function Ar() {
		try {
			let e = ((z(he)?.contentDocument)?.querySelector(`.urd-section[data-section-id="${z(_r)}"]`))?.getBoundingClientRect();
			j(Or, e && e.width ? {
				w: e.width,
				h: e.height
			} : null, !0);
		} catch {
			j(Or, null);
		}
	}
	bn(() => {
		z(_r), z(br), requestAnimationFrame(() => requestAnimationFrame(Ar));
	}), bn(() => {
		let e = z(he);
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(() => Ar());
		return t.observe(e), () => t.disconnect();
	}), bn(() => {
		for (let e of z(br)) {
			let t = e?.props?.src;
			if (e?.type === "image" && t && !kr[t]) {
				let e = new Image();
				e.onload = () => {
					kr[t] = {
						w: e.naturalWidth,
						h: e.naturalHeight
					};
				}, e.src = t;
			}
		}
	});
	function jr(e) {
		Fr("section-theme", (t) => {
			e ? t.theme = e : delete t.theme;
		});
	}
	function V(e) {
		let t = z(Li), n = (e) => e.replaceAll("var(--urd-base-bg)", t.bg).replaceAll("var(--urd-base-surface)", t.surface).replaceAll("var(--urd-base-text)", t.text).replaceAll("var(--urd-base-accent)", t.accent).replaceAll("var(--urd-base-accent-text)", t["accent-text"] ?? se(Lf(t.accent ?? "#000000", t))), r = fu(e);
		return {
			bg: r["--urd-color-bg"] ? n(r["--urd-color-bg"]) : t.bg,
			surface: r["--urd-color-surface"] ? n(r["--urd-color-surface"]) : t.surface,
			text: r["--urd-color-text"] ? n(r["--urd-color-text"]) : t.text,
			accent: r["--urd-color-accent"] ? n(r["--urd-color-accent"]) : t.accent
		};
	}
	function Pr(e) {
		j(_r, e.sectionId, !0), Dr(D?.data.sections.find((t) => t.id === e.sectionId));
	}
	function Fr(e, t) {
		let n = D.data.sections.find((e) => e.id === z(_r));
		n && (mt(e), t(n), D.save(), lt(), nt?.sendSection(z(w), n), Dr(n));
	}
	let Ir = /* @__PURE__ */ A("color");
	function Lr(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background ??= {
				version: 1,
				layers: []
			}, e.background.layers.push({
				type: t,
				version: ne[t].version ?? 1,
				props: ne[t].defaults()
			});
		});
	}
	function Rr(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers.splice(t, 1), e.background.layers.length || delete e.background;
		});
	}
	function zr(e, t, n) {
		let r = t + n;
		e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers;
			r < 0 || r >= n.length || ([n[t], n[r]] = [n[r], n[t]]);
		});
	}
	function Br(e, t, n) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${Object.keys(n).join("+")}`, (e) => {
			Object.assign(e.background.layers[t].props, n);
		});
	}
	function Vr(e, t, n, r) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e.background.layers[t].props[n] = r;
		});
	}
	function Hr(e, t, n, r = "xy") {
		e.preventDefault();
		let i = e.currentTarget;
		i.setPointerCapture?.(e.pointerId);
		let a = (e) => {
			let a = i.getBoundingClientRect();
			if (r.includes("x")) {
				let r = Math.min(1, Math.max(0, (e.clientX - a.left) / a.width));
				Vr(t, n, "x", Math.round(r * 100) / 100);
			}
			if (r.includes("y")) {
				let r = Math.min(1, Math.max(0, (e.clientY - a.top) / a.height));
				Vr(t, n, "y", Math.round(r * 100) / 100);
			}
		};
		a(e);
		let o = () => {
			i.removeEventListener("pointermove", a), i.removeEventListener("pointerup", o), i.removeEventListener("pointercancel", o);
		};
		i.addEventListener("pointermove", a), i.addEventListener("pointerup", o), i.addEventListener("pointercancel", o);
	}
	let Ur = (e) => Math.min(4, Math.max(.1, e));
	function Gr(e, t, n, r) {
		Vr(e, t, "size", Ur(Math.round((n + r) * 100) / 100));
	}
	function Kr(e, t, n) {
		let r = Number(n);
		Number.isFinite(r) && Vr(e, t, "size", Ur(r / 100));
	}
	function qr(e, t, n, r) {
		let i = kr[n.props.src];
		if (!i?.w || !i?.h || !z(Or)?.w || !z(Or)?.h) return;
		let a = z(Or).h * i.w / (z(Or).w * i.h), o = r === "cover" ? Math.max(1, a) : Math.min(1, a);
		(n.props.fit === "tile" || n.props.fit === "repeat") && Vr(e, t, "fit", "plain"), Vr(e, t, "size", Ur(Math.round(o * 100) / 100));
	}
	function Yr(e) {
		return e.props;
	}
	function Xr(e, t, n, r) {
		e.mutate(n, (e) => {
			r(e.background.layers[t].props);
		});
	}
	function Zr(e, t, n, r) {
		Xr(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e[n] = r;
		});
	}
	let Qr = {
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
	function $r(e, t, n) {
		Xr(e, t, e.keyPrefix, (e) => {
			e.kind = n, Qr[n].some(([t]) => t === (e.animation ?? "none")) || (e.animation = "none");
		});
	}
	function ei(e, t, n, r) {
		Xr(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-stop${n}`, (e) => {
			e.stops[n] = {
				...e.stops[n],
				...r
			};
		});
	}
	function ti(e, t) {
		Xr(e, t, e.keyPrefix, (e) => {
			let t = Math.round(e.stops.reduce((e, t) => e + (Number(t.share) || 0), 0) / e.stops.length) || 50;
			e.stops.push({
				color: e.stops[e.stops.length - 1]?.color ?? "#ffffff",
				share: t
			});
		});
	}
	function ni(e, t, n) {
		Xr(e, t, e.keyPrefix, (e) => {
			e.stops.length > 2 && e.stops.splice(n, 1);
		});
	}
	function ri(e, t, n, r) {
		Xr(e, t, e.keyPrefix, (e) => {
			let [t] = e.stops.splice(n, 1);
			e.stops.splice(r, 0, t);
		});
	}
	let ii = /* @__PURE__ */ A(null);
	function ai(e, t, n, r) {
		if (t.button !== 0) return;
		t.preventDefault();
		let i = t.currentTarget.closest(".bg-layer"), a = t.currentTarget.closest(".grad-stop");
		j(ii, {
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
			j(ii, {
				...z(ii),
				insert: n
			}, !0);
		}, u = () => {
			window.removeEventListener("pointermove", l), window.removeEventListener("pointerup", u), c.remove();
			let t = z(ii);
			if (j(ii, null), !t) return;
			let n = t.insert > t.from ? t.insert - 1 : t.insert;
			n !== t.from && ri(e, t.layer, t.from, n);
		};
		window.addEventListener("pointermove", l), window.addEventListener("pointerup", u);
	}
	function oi(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].type !== n && (e.background.layers[t] = {
				type: n,
				version: ne[n].version ?? 1,
				props: ne[n].defaults()
			});
		});
	}
	async function si(e, t) {
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
	async function ci(e) {
		let t = await e.text(), n = Ia(t), r = Ra(t);
		if (!r) return n;
		let i = await si(n.dataUrl, r);
		if (!i) return n;
		let a = La(t, i);
		if (a === t) return n;
		try {
			return Ia(a);
		} catch {
			return n;
		}
	}
	async function ui(e) {
		if (e.type === "image/svg+xml" || /\.svg$/i.test(e.name || "")) return ci(e);
		let t = await Na(e);
		return t.animated && t.bytes > 1e6 && T(Y("status.animatedLarge", { mb: (t.bytes / 1e6).toFixed(1) }), "error"), t;
	}
	function di(e) {
		return e?.code === "animatedTooLarge" ? Y("status.animatedTooLarge", {
			mb: (e.bytes / 1e6).toFixed(1),
			max: Math.round(Ta / 1e6)
		}) : Y("status.imageReadError");
	}
	function fi(e, t, n) {
		if (!["video/mp4", "video/webm"].includes(e.type)) {
			T(Y(t), "error");
			return;
		}
		if (e.size > 15e6) {
			T(Y("status.videoTooLarge", {
				mb: (e.size / 1e6).toFixed(1),
				max: Math.round(wa / 1e6)
			}), "error");
			return;
		}
		let r = new FileReader();
		r.onload = () => {
			n(String(r.result ?? "")), e.size > 4e6 && T(Y("status.videoLarge", { mb: (e.size / 1e6).toFixed(1) }), "error");
		}, r.onerror = () => T(Y("status.imageReadError"), "error"), r.readAsDataURL(e);
	}
	function pi(e) {
		let t = e.target.files?.[0];
		e.target.value = "", t && fi(t, "status.videoFileFormat", (e) => L("src", e));
	}
	async function mi(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			L("poster", (await ui(t)).dataUrl);
		} catch (e) {
			T(di(e), "error");
		}
	}
	async function hi(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			Vr(e, t, "src", (await ui(r)).dataUrl);
		} catch (e) {
			T(di(e), "error");
		}
	}
	function _i(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && fi(r, "status.videoFormat", (n) => Vr(e, t, "src", n));
	}
	async function yi(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			Vr(e, t, "poster", (await ui(r)).dataUrl);
		} catch (e) {
			T(di(e), "error");
		}
	}
	let bi = en({}), xi = (e, t) => `${e.keyPrefix}-${e.keyId}-${t}`, Si = () => 1 + crypto.getRandomValues(/* @__PURE__ */ new Uint32Array(1))[0] % 1e6;
	async function wi(e, t, n) {
		let r = xi(e, t);
		bi[r] = {
			text: Y("status.folderChecking"),
			err: !1
		};
		let i = await of(n.props.folder, n.props.order, { force: !0 });
		bi[r] = i.photos.length ? {
			text: qi("status.folderFound", i.photos.length, { count: i.photos.length }),
			err: !1
		} : {
			text: Ji(i) ?? Y("status.folderNone"),
			err: !0
		};
	}
	async function Ti(e, t, n) {
		let r = [...n.target.files ?? []];
		if (n.target.value = "", !r.length) return;
		T(Y("status.compressingImages"));
		let { images: i, failed: a, big: o } = await Tv(r);
		i.length && e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers[t].props;
			n.images ??= [], n.images.push(...i.map(({ src: e }) => ({
				src: e,
				x: .5,
				y: .5
			})));
		}), Ev(i.length, a, o);
	}
	function Ei(e, t, n, r) {
		e.mutate(e.keyPrefix, (e) => {
			let i = e.background.layers[t].props.images, a = n + r;
			a < 0 || a >= i.length || ([i[n], i[a]] = [i[a], i[n]]);
		});
	}
	function Oi(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].props.images.splice(n, 1);
		});
	}
	function ki(e, t, n, r, i) {
		e.mutate(`edit:${e.keyPrefix}g-${e.keyId}-${t}-${n}-${r}`, (e) => {
			e.background.layers[t].props.images[n][r] = i;
		});
	}
	function Ai(e, t) {
		ho(e, () => {
			z(O).nav.style ??= {}, t(z(O).nav.style);
		});
	}
	let Mi = /* @__PURE__ */ k(() => ({
		mutate: Fr,
		keyPrefix: "bg",
		keyId: z(_r)
	})), Ni = {
		mutate: Ai,
		keyPrefix: "navbg",
		keyId: "nav"
	}, Pi = {
		mutate: Gu,
		keyPrefix: "footerbg",
		keyId: "footer"
	}, Fi = () => {
		let e = null;
		try {
			e = localStorage.getItem("urd-theme-mode");
		} catch {}
		return iu(z(O)?.theme?.scheme, e, window.matchMedia("(prefers-color-scheme: dark)").matches);
	}, Ii = /* @__PURE__ */ A("light");
	bn(() => {
		j(Ii, Fi(), !0);
		let e = window.matchMedia("(prefers-color-scheme: dark)"), t = (e) => {
			e instanceof StorageEvent && e.key && e.key !== "urd-theme-mode" || j(Ii, Fi(), !0);
		};
		return e.addEventListener("change", t), window.addEventListener("storage", t), () => {
			e.removeEventListener("change", t), window.removeEventListener("storage", t);
		};
	});
	let Li = /* @__PURE__ */ k(() => z(O)?.theme ? au(z(O).theme, z(Ii)).color ?? {} : {}), Ri = () => Object.entries(z(Li)), zi = [
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
	], Bi = /* @__PURE__ */ k(() => !!z(O)?.theme.alt), Vi = /* @__PURE__ */ k(() => z(O)?.theme.alt?.auto === !0), Hi = /* @__PURE__ */ k(() => z(O)?.theme.scheme === "dark" ? "dark" : "light"), Ui = /* @__PURE__ */ k(() => z(O)?.theme.tokens.color ?? {}), Wi = /* @__PURE__ */ k(() => ({
		...z(O)?.theme.tokens.color ?? {},
		...z(O)?.theme.alt?.tokens?.color ?? {}
	}));
	function Gi(e) {
		return {
			type: e,
			version: Pf[e].version,
			props: Pf[e].defaults()
		};
	}
	let Ki = (e) => !!(e && Pf[e.type]?.entrance), Xi = [["", Y("common.none")], ...Object.entries(Pf).filter(([, e]) => e.entrance).map(([e, t]) => [e, t.labelKey ? Y(t.labelKey) : t.label])], Zi = Xi.filter(([e]) => !Pf[e]?.group), Qi = [["", Y("common.none")], ...Object.entries(Pf).filter(([, e]) => !e.entrance).map(([e, t]) => [e, t.labelKey ? Y(t.labelKey) : t.label])];
	function $i(e) {
		e.animation && !Ki(e.animation) && (e.hover ??= e.animation, e.animation = null);
	}
	function ea(e) {
		un(`edit:anim-${z(M).blockId}`, (t) => {
			$i(t), t.animation = e ? Gi(e) : null;
		}), z(M) && nt?.sendDemoAnim(z(M).sectionId, z(M).blockId);
	}
	function ra(e) {
		un(`edit:hover-${z(M).blockId}`, (t) => {
			$i(t), t.hover = e ? Gi(e) : null;
		});
	}
	function ia(e, t) {
		Number.isFinite(t) && (un(`edit:anim-${z(M).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), z(M) && nt?.sendDemoAnim(z(M).sectionId, z(M).blockId));
	}
	function aa(e) {
		Fr("section-anim", (t) => {
			$i(t), t.animation = e ? Gi(e) : null;
		}), nt?.sendDemoAnim(z(_r));
	}
	function oa(e, t, n) {
		Fr(`section-divider-${e}-${t}`, (r) => {
			let i = { ...r.divider ?? {} };
			if (t === "shape" && !n) delete i[e];
			else {
				let r = { ...i[e] ?? { shape: "wave" } };
				n === void 0 || n === !1 || n === "" ? delete r[t] : r[t] = n, i[e] = r;
			}
			Object.keys(i).length ? r.divider = i : delete r.divider;
		});
	}
	function sa(e) {
		Fr("section-hover", (t) => {
			$i(t), t.hover = e ? Gi(e) : null;
		});
	}
	function ca(e, t) {
		Number.isFinite(t) && (Fr("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), nt?.sendDemoAnim(z(_r)));
	}
	function la(e, t) {
		Fr("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), nt?.sendDemoAnim(z(_r));
	}
	function ua(e) {
		let t = D.data.sections.find((e) => e.id === z(_r));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		mt("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, j(yr, r, !0), D.save(), lt(), nt?.sendSection(z(w), t);
	}
	function da() {
		return D.data.sections.find((e) => e.id === z(_r)) ?? D.data.sections[0];
	}
	function fa(e) {
		let t = D.data.sections.find((e) => e.id === z(_r));
		t && (mt("grid:section"), t.grid = e ? { ...tt.data.grid } : null, j(vr, t.grid ? { ...t.grid } : null, !0), D.save(), lt(), nt?.sendSection(z(w), t), z(fo) && nt?.sendShowGrid(!0));
	}
	function pa(e, t) {
		let n = D.data.sections.find((e) => e.id === z(_r));
		n?.grid && (mt("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, j(vr, { ...n.grid }, !0), D.save(), lt(), nt?.sendSection(z(w), n), z(fo) && nt?.sendShowGrid(!0));
	}
	function ma(e, t) {
		mt("grid:site"), j(_e, {
			...z(_e),
			[e]: t
		}, !0), tt.data.grid = {
			...tt.data.grid,
			[e]: t
		}, tt.save(), lt(), it(), z(fo) && nt?.sendShowGrid(!0);
	}
	async function ha() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? j(ge, await e.json(), !0) : e.status !== 503 && j(ge, null);
		} catch {
			j(ge, null);
		}
	}
	let ga = null;
	async function _a() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (ga = (await e.json()).head ?? null);
		} catch {}
	}
	async function va(e) {
		if (!ga) return await _a(), {
			ok: await Tt({
				title: Y("confirm.conflictUnknown.title"),
				lines: [Y("confirm.conflictUnknown.body"), Y("confirm.conflictUnknown.warning")],
				okLabel: Y("confirm.publishAnyway"),
				cancelLabel: Y("confirm.cancel")
			}),
			head: ga
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${ga}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === ga) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? [Y("confirm.conflict.truncated")] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await Tt({
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
	let ya = /* @__PURE__ */ A(null), xa = /* @__PURE__ */ A(""), Sa = /* @__PURE__ */ A(!1);
	async function Ca() {
		j(xa, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? j(ya, (await e.json()).commits, !0) : e.status === 401 ? (j(ya, [], !0), j(xa, Y("status.historyLoginRequired"), !0)) : (j(ya, [], !0), j(xa, Ji(await e.json().catch(() => null)) ?? Y("status.historyFetchFailed"), !0));
		} catch {
			j(ya, [], !0), j(xa, Y("status.historyUnavailable"), !0);
		}
	}
	let Ea = (() => {
		let e = {
			dateStyle: "short",
			timeStyle: "short"
		};
		try {
			return new Intl.DateTimeFormat(Yi(), e);
		} catch {
			return new Intl.DateTimeFormat(void 0, e);
		}
	})(), Da = !1;
	async function Oa() {
		let e = z(ya)?.[0];
		if (e && !z(Sa) && await Tt({
			title: Y("confirm.revert.title"),
			lines: [`«${e.message}»`, Y("confirm.revert.body")],
			okLabel: Y("confirm.revert.ok"),
			cancelLabel: Y("confirm.cancel")
		})) {
			j(Sa, !0), T(Y("status.reverting"));
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? ga = e : _a(), Da = !0, T(Y("status.revertDone"), "ok"), ka();
				} else t.status === 409 ? T(Y("status.revertConflict"), "error") : T(Ji(await t.json().catch(() => null)) ?? Y("status.revertFailed"), "error");
			} catch {
				T(Y("status.publishLayerUnreachable"), "error");
			}
			j(Sa, !1), Ca();
		}
	}
	async function ka() {
		let e = ["/content/site.json", ...z(O).pages.map((e) => `/${e.file}`)], t = async () => {
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
				T(Y("status.revertDeployed"), "ok");
				for (let e of Object.keys(localStorage).filter((e) => e.startsWith("urd-draft-"))) localStorage.removeItem(e);
				await new Promise((e) => setTimeout(e, 800)), location.reload();
				return;
			}
		}
		T(Y("status.revertDeployTimeout"), "error");
	}
	let Aa = 0;
	async function ja(e) {
		let t = ++Aa, n = fe, r = await Io(Fo(e));
		t === Aa && n === fe && (r ? T(Y("status.publishLive"), "ok") : T(Y("status.publishDeployTimeout"), "error"));
	}
	let Ma = /* @__PURE__ */ A(null), Pa = /* @__PURE__ */ A(null), Fa = /* @__PURE__ */ A(!1), Ha = /* @__PURE__ */ A(en(/* @__PURE__ */ new Set()));
	async function Ua() {
		j(Fa, !0), j(Pa, null), j(Ma, null);
		try {
			let e = await fetch("/api/github/update"), t = await e.json().catch(() => null);
			e.ok ? (j(Ma, t, !0), j(Ha, /* @__PURE__ */ new Set(), !0)) : j(Pa, Ji(t) ?? Y("update.checkFailed"), !0);
		} catch {
			j(Pa, Y("status.publishLayerUnreachable"), !0);
		}
		j(Fa, !1);
	}
	function Wa(e) {
		let t = new Set(z(Ha));
		t.has(e) ? t.delete(e) : t.add(e), j(Ha, t, !0);
	}
	async function Ga() {
		if (!z(Ma) || z(Ma).upToDate || z(Fa)) return;
		let e = [...z(Ha)], t = z(Ma).changes.filter((e) => !z(Ha).has(e.path)), n = t.filter((e) => e.atom && e.conflict);
		if (await Tt({
			title: Y("confirm.update.title"),
			lines: [Y("confirm.update.body", {
				target: z(Ma).target,
				writes: t.filter((e) => e.action === "write").length,
				deletes: t.filter((e) => e.action === "delete").length
			}), ...n.length > 0 ? [Y("confirm.update.warnEdited", { paths: n.map((e) => e.path).join(", ") })] : []],
			okLabel: Y("confirm.update.ok"),
			cancelLabel: Y("confirm.cancel")
		})) {
			j(Fa, !0), T(Y("update.running", { target: z(Ma).target }));
			try {
				let t = await fetch("/api/github/update", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						to: z(Ma).target,
						expect: z(Ma).head,
						skip: e
					})
				}), n = await t.json().catch(() => null);
				t.ok ? (T(Y("update.committed", { target: z(Ma).target }), "ok"), await Ka(z(Ma).target.replace(/^v/, ""))) : t.status === 409 ? (T(Ji(n) ?? Y("update.checkFailed"), "error"), await Ua()) : T(Ji(n) ?? Y("update.failed"), "error");
			} catch {
				T(Y("status.publishLayerUnreachable"), "error");
			}
			j(Fa, !1);
		}
	}
	async function Ka(e) {
		for (let t = 0; t < 18; t++) {
			await new Promise((e) => setTimeout(e, 1e4));
			try {
				if ((await (await fetch("/urd.json", { cache: "no-store" })).json())?.engine === e) {
					T(Y("update.deployed"), "ok"), await new Promise((e) => setTimeout(e, 800)), location.reload();
					return;
				}
			} catch {}
		}
		T(Y("update.deployTimeout"), "error");
	}
	let qa = null;
	function Ja(e) {
		return {
			schemaVersion: 4,
			meta: {
				id: e.id,
				title: e.title
			},
			sections: [{
				id: qs("sec"),
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
	async function Ya(e, { keepHistory: t = !1 } = {}) {
		j(w, e, !0), qa = (async () => {
			let n = ct(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = Vs(await e.json(), tt.data));
			} catch {}
			r ? at.delete(e) : r = Ja(n), D = na(`urd-draft-${e}`, () => r, pe), (D.data.schemaVersion ?? 1) > 4 && (console.warn(`Urd: the draft for '${e}' has schemaVersion ${D.data.schemaVersion} (the engine has 4) and is discarded`), D.replace(structuredClone(r))), D.replace(Vs(D.data, tt.data)), D.save(), t || (ft = null), j(_r, null), j(vr, null), lt(), Oo(), Je(), j(ue, "");
		})(), await qa;
	}
	function Xa() {
		nt?.destroy(), z(he)?.contentDocument?.addEventListener("pointerdown", () => {
			z(an) && j(an, null);
		}, !0), nt = Mo(z(he), {
			onEdit: Jf,
			onMove: Yf,
			onGrow: Qf,
			onDelete: lp,
			onAddSection: ip,
			onMoveSection: ap,
			onDeleteSection: op,
			onSectionSize: sp,
			onUndo: (e) => e.redo ? bt() : yt(),
			onSelectSection: Pr,
			onSelectBlock: rn,
			onBlockMenu: ln,
			onReady: Za,
			onNavigate: mo,
			onAddBlock: (e) => fp(e.sectionId, e.block),
			onAddBlocks: (e) => pp(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: Cv,
			onMoveBlockSection: cp,
			onMobileReset: ep,
			onMobileOrder: tp,
			onReviewDone: np,
			onBlockFlag: rp,
			onCollectionEdit: Fl,
			onCollectionAdd: Nl,
			onSaveTemplate: wl,
			onStickyGroup: El,
			onStickyDock: Tl,
			onDeleteTemplate: Ol,
			onApplyLayout: Qe,
			onPluginBlocks: (e) => {
				j(hp, e.blocks ?? [], !0);
			},
			onNavWidth: (e) => ho("edit:nav-width", () => {
				z(O).nav.style ??= {}, z(O).nav.style.width = e.width;
			})
		});
	}
	async function Za() {
		await qa, await ou, nt?.sendPlugins(Ke(z(lu))?.enabled ?? []), nt?.sendViewport(z(je)), nt?.sendZoom(z(Be)), jl(), Cl(), tt.hasDraft() && it();
		let e = !z(ce).pages.some((e) => e.id === z(w));
		(D.hasDraft() || e) && nt?.sendPage(z(w), D.data), z(ve) || nt?.sendChrome(!1), z(fo) && nt?.sendShowGrid(!0), z(Qa) && nt?.sendShowGuides(!0), oe();
	}
	let Qa = /* @__PURE__ */ A(localStorage.getItem("urd-guides") === "1"), $a = /* @__PURE__ */ A(!1), ro = /* @__PURE__ */ A(en(localStorage.getItem("urd-layout-picker") === "menu" ? "menu" : "strip"));
	function io(e) {
		j(ro, e === "menu" ? "menu" : "strip", !0), z(ro) === "menu" ? localStorage.setItem("urd-layout-picker", "menu") : localStorage.removeItem("urd-layout-picker");
	}
	let ao = /* @__PURE__ */ A(null);
	bn(() => {
		if (!z($a)) return;
		let e = (e) => {
			z(ao)?.contains(e.target) || j($a, !1);
		}, t = (e) => {
			e.key === "Escape" && j($a, !1);
		}, n = () => {
			j($a, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let oo = {
		view: 1079,
		device: 999,
		zoom: 919
	}, so = /* @__PURE__ */ A(null), co = /* @__PURE__ */ A(null), lo = en({
		view: !1,
		device: !1,
		zoom: !1
	});
	bn(() => {
		let e = Object.entries(oo).map(([e, t]) => {
			let n = window.matchMedia(`(max-width: ${t}px)`), r = () => {
				lo[e] = n.matches;
			};
			return r(), n.addEventListener("change", r), () => n.removeEventListener("change", r);
		});
		return () => e.forEach((e) => e());
	}), bn(() => {
		z(so) && !lo[z(so)] && j(so, null);
	}), bn(() => {
		if (!z(so)) return;
		let e = (e) => {
			z(co)?.contains(e.target) || j(so, null);
		}, t = (e) => {
			e.key === "Escape" && j(so, null);
		}, n = () => {
			j(so, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	function uo() {
		j(Qa, !z(Qa)), localStorage.setItem("urd-guides", z(Qa) ? "1" : "0"), nt?.sendShowGuides(z(Qa));
	}
	let fo = /* @__PURE__ */ A(localStorage.getItem("urd-grid-overlay") === "1");
	function po() {
		j(fo, !z(fo)), localStorage.setItem("urd-grid-overlay", z(fo) ? "1" : "0"), nt?.sendShowGrid(z(fo));
	}
	function mo(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = z(O).pages.find((e) => e.path === t);
		n && n.id !== z(w) && Ya(n.id);
	}
	function ho(e, t) {
		mt(e), t(), tt.save(), lt(), it();
	}
	let _o = /* @__PURE__ */ A(""), vo = /* @__PURE__ */ A(null), yo = Object.fromEntries($l.map((e) => [e.id, Zl(eu(e.id, {
		pageId: "preview",
		title: ""
	}))])), bo = /* @__PURE__ */ k(() => {
		let e = z(O)?.theme?.tokens?.color ?? {};
		return [
			"bg",
			"surface",
			"text",
			"accent"
		].filter((t) => typeof e[t] == "string" && su(e[t])).map((t) => `--urd-color-${t}: ${e[t]};`).join(" ");
	}), xo = /* @__PURE__ */ A(null);
	bn(() => {
		if (!z(xo)) return;
		let e = (e) => {
			e.target.closest?.(".page-menu-wrap") || j(xo, null);
		}, t = (e) => {
			e.key === "Escape" && j(xo, null);
		}, n = () => {
			j(xo, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let So = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions",
		"readme"
	];
	function Co(e, t = null) {
		return e ? So.includes(e) ? Y("error.reservedName", { slug: e }) : z(O).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? Y("error.pageExists") : null : Y("error.pageNeedsName");
	}
	function wo() {
		let e = z(_o).trim(), t = Ba(e), n = Co(t);
		if (n) return T(n, "error"), !1;
		let r = z(vo) && !z(vo).startsWith("preset:") ? _l[z(vo)]?.data?.page : null, i = z(vo)?.startsWith("preset:") ? eu(z(vo).slice(7), {
			pageId: t,
			title: e
		}) ?? Ja({
			id: t,
			title: e
		}) : r ? Cc(Vs(JSON.parse(JSON.stringify(r)), tt.data), qs, {
			id: t,
			title: e
		}) : Ja({
			id: t,
			title: e
		});
		ho("pages", () => {
			z(O).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), z(O).nav.items.push({
				label: e,
				page: t
			});
		}), me(`urd-draft-${t}`, JSON.stringify(i)), lt(), j(_o, ""), j(vo, null), Ya(t);
	}
	async function To(e) {
		j(xo, null), await Dl("page", e.id === z(w) ? JSON.parse(JSON.stringify(D.data)) : await us(e));
	}
	function Eo(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		ho("pages", () => {
			e.title = n;
			for (let t of z(O).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === z(w) ? (D.data.meta.title = n, D.save(), lt(), nt?.sendPage(z(w), D.data)) : fs(e, (e) => {
			e.meta.title = n;
		});
	}
	let Do = /* @__PURE__ */ A(en({
		description: "",
		ogTitle: "",
		ogDescription: "",
		ogImage: ""
	}));
	function Oo() {
		let e = D?.data?.meta ?? {};
		j(Do, {
			description: e.description ?? "",
			ogTitle: e.og?.title ?? "",
			ogDescription: e.og?.description ?? "",
			ogImage: e.og?.image ?? ""
		}, !0);
	}
	function ko(e, t) {
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
		D.save(), lt(), Oo();
		let r = z(O).pages.find((e) => e.id === z(w));
		z(No)[z(w)] = !r?.noindex && !D.data.meta.description;
	}
	function Ao(e) {
		let t = z(O).pages.find((e) => e.id === z(w));
		t && (ho("edit:page-noindex", () => {
			e ? t.noindex = !0 : delete t.noindex;
		}), z(No)[z(w)] = !e && !D?.data?.meta?.description);
	}
	let No = /* @__PURE__ */ A(en({}));
	async function zo() {
		let e = {};
		for (let t of z(O).pages) {
			if (t.noindex) continue;
			if (t.id === z(w)) {
				e[t.id] = !D?.data?.meta?.description;
				continue;
			}
			let n = await us(t);
			e[t.id] = !n?.meta?.description;
		}
		j(No, e, !0);
	}
	bn(() => {
		z(zt) === "pages" && z(w) && zo();
	});
	async function Bo(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			ko("ogImage", (await ui(t)).dataUrl);
		} catch (e) {
			T(di(e), "error");
		}
	}
	async function us(e) {
		let t = localStorage.getItem(`urd-draft-${e.id}`);
		if (t) try {
			return JSON.parse(t);
		} catch {}
		try {
			let t = await fetch(`/${e.file}`);
			if (t.ok) return Vs(await t.json(), tt.data);
		} catch {}
		return Ja(e);
	}
	async function fs(e, t) {
		let n = await us(e);
		t(n), me(`urd-draft-${e.id}`, JSON.stringify(n)), lt();
	}
	function ps(e, t) {
		let n = Ba(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = Co(n, e.id);
		if (r) {
			T(r, "error");
			return;
		}
		ho("pages", () => {
			e.path = `/${n}`;
		});
	}
	function vs(e) {
		e.path !== "/" && (ho("pages", () => {
			z(O).pages = z(O).pages.filter((t) => t.id !== e.id), z(O).nav.items = z(O).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of z(O).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			z(O).nav.items = z(O).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === z(w) && Ya(z(O).pages[0].id), T(Y("status.pageRemoved")));
	}
	function ys(e) {
		ho("edit:nav-logo", () => {
			z(O).nav.logo = {
				type: "text",
				value: "",
				...z(O).nav.logo,
				...e
			};
		});
	}
	function bs(e) {
		ho("nav", () => {
			z(O).nav.logo ??= {
				type: "text",
				value: z(O).site.title
			};
			let t = z(O).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = z(O).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = z(O).site.title), delete t.image), t.type = e;
		});
	}
	async function xs(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await ui(t);
			ho("nav", () => {
				let t = z(O).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			T(Y("status.imageReadErrorSvg"), "error");
		}
	}
	let Ss = /* @__PURE__ */ A(null);
	async function Cs(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		if (t.type === "image/svg+xml" || /\.svg$/i.test(t.name || "")) {
			try {
				let e = await ci(t);
				j(Ss, e.dataUrl, !0);
			} catch {
				T(Y("status.imageReadErrorSvg"), "error");
			}
			return;
		}
		let n = new FileReader();
		n.onload = () => {
			j(Ss, String(n.result), !0);
		}, n.onerror = () => T(Y("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function ws(e) {
		ho("edit:site-icon", () => {
			z(O).site.icon = e;
		}), j(Ss, null);
	}
	function Ts() {
		ho("edit:site-icon", () => {
			delete z(O).site.icon;
		});
	}
	function Ds(e) {
		ho("edit:site-title", () => {
			z(O).site.title = e;
		});
	}
	function As(e) {
		ho("edit:site-desc", () => {
			z(O).site.description = e;
		});
	}
	function js(e) {
		let t = String(e ?? "").trim();
		ho("edit:site-analytics", () => {
			t ? z(O).analytics = { token: t } : delete z(O).analytics;
		});
	}
	let Ms = /* @__PURE__ */ k(() => z(O)?.layout?.contentWidth ?? 1440), Ns = /* @__PURE__ */ k(() => z(O)?.layout?.gutter ?? 6), Ps = /* @__PURE__ */ k(() => Qo(z(Ms))), Fs = /* @__PURE__ */ k(() => Go.find((e) => e.gutter === z(Ns))?.id ?? null), Is = /* @__PURE__ */ A(!1), Ls = /* @__PURE__ */ k(() => z(Ms) === "full" ? Wo : Jo(z(Ms))), Rs = /* @__PURE__ */ k(() => qo.map((e) => ({
		screen: e,
		...Zo(z(Ms), z(Ns), e)
	})));
	function zs(e, t) {
		ho(t, () => {
			let t = {
				...z(O).layout ?? {},
				contentWidth: z(Ms),
				gutter: z(Ns),
				...e
			};
			for (let e of Object.keys(t)) t[e] === void 0 && delete t[e];
			z(O).layout = t;
		});
	}
	let Hs = (e) => zs({ contentWidth: e === "full" ? "full" : Jo(e) }, "edit:site-width"), Us = (e) => zs({ gutter: Yo(e) }, "edit:site-gutter");
	function Gs() {
		let e = z(O).site.lang ?? "no";
		return e === "no" ? "nb" : e;
	}
	function Js() {
		let e = Gs(), t = Gt([...Wt, ...Jt()]);
		return [...t.some(([t]) => t === e) ? [] : [[e, e]], ...t];
	}
	function Z(e) {
		ho("site", () => {
			z(O).site.lang = e;
		});
	}
	let Ys = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	bn(() => {
		if (!z(O)?.site) return;
		let e = z(O).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 49.6V14.4l25.6 10.4V49.6' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
				return;
			}
			Ys.test(e) && (t.href = e);
		}
	});
	function Xs(e) {
		ho("nav", () => {
			z(O).nav.layout = e;
		});
	}
	let Zs = (e) => e !== "theme" || !!z(O).theme?.alt?.tokens, Qs = /* @__PURE__ */ k(() => Zu(z(O)?.nav?.style ?? {}).filter(Zs));
	function $s(e, t) {
		let n = Zu(z(O).nav.style ?? {}), r = n.indexOf(e), i = r + t;
		for (; i >= 0 && i < n.length && !Zs(n[i]);) i += t;
		r < 0 || i < 0 || i >= n.length || ([n[r], n[i]] = [n[i], n[r]], ec("order", n));
	}
	function ec(e, t) {
		ho(`edit:nav-tools-${e}`, () => {
			z(O).nav.style ??= {};
			let n = { ...z(O).nav.style.tools ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? z(O).nav.style.tools = n : delete z(O).nav.style.tools;
		});
	}
	function tc(e, t) {
		ho(`edit:nav-style-${e}`, () => {
			z(O).nav.style ??= {}, t === void 0 ? delete z(O).nav.style[e] : z(O).nav.style[e] = t;
		});
	}
	let nc = /* @__PURE__ */ k(() => z(O)?.nav?.variant === "side-left" || z(O)?.nav?.variant === "side-right"), rc = /* @__PURE__ */ k(() => [
		"floating",
		"floating-square",
		"floating-tab"
	].includes(z(O)?.nav?.variant)), ic = /* @__PURE__ */ k(() => _s(z(O)?.nav?.style)), ac = /* @__PURE__ */ k(() => hs(z(O)?.nav?.style, z(O)?.nav?.variant)), oc = /* @__PURE__ */ k(() => gs(z(O)?.nav?.style));
	function sc(e) {
		ho("nav", () => {
			z(O).nav.style ??= {}, e === "md" ? delete z(O).nav.style.size : z(O).nav.style.size = e, delete z(O).nav.style.padY, delete z(O).nav.style.textSize;
		});
	}
	function cc(e, t, n) {
		let r = e.target.value;
		tc(t, r === "" ? void 0 : ms(r, n, void 0)), e.target.value = z(O).nav.style?.[t] ?? "";
	}
	function lc(e, t) {
		ho(`edit:nav-mobile-${e}`, () => {
			z(O).nav.style ??= {};
			let n = { ...z(O).nav.style.mobile ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? z(O).nav.style.mobile = n : delete z(O).nav.style.mobile;
		});
	}
	let uc = (e) => {
		let t = z(O)?.nav?.style?.mobile?.[e];
		return t === void 0 ? "" : t ? "on" : "off";
	}, dc = (e, t) => lc(e, t === "" ? void 0 : t === "on"), fc = (e) => lc("border", e ? {
		...z(O).nav.style?.mobile?.border ?? {},
		side: e
	} : void 0);
	function pc(e, t) {
		ho(`edit:nav-announce-${e}`, () => {
			let n = { ...z(O).nav.announcement ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? z(O).nav.announcement = n : delete z(O).nav.announcement;
		});
	}
	let mc = "<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"currentColor\" aria-hidden=\"true\">" + [
		6,
		12,
		18
	].flatMap((e) => [
		6,
		12,
		18
	].map((t) => `<circle cx="${t}" cy="${e}" r="1.6"/>`)).join("") + "</svg>", hc = /* @__PURE__ */ A(null);
	function gc() {
		let e = z(O).nav?.launcher;
		return [e?.image, ...(e?.links ?? []).map((e) => e.image)].filter(Boolean);
	}
	function _c(e, t) {
		ho("nav", () => {
			z(O).nav.launcher ??= { links: [] };
			let n = e === null ? z(O).nav.launcher : z(O).nav.launcher.links[e];
			t.image ? n.image = t.image : delete n.image, t.icon ? n.icon = t.icon : delete n.icon;
		});
	}
	function vc(e, t) {
		ho(`edit:nav-launcher-${e}`, () => {
			z(O).nav.launcher ??= { links: [] }, t === void 0 ? delete z(O).nav.launcher[e] : z(O).nav.launcher[e] = t;
		});
	}
	function yc() {
		ho("nav", () => {
			z(O).nav.launcher ??= { links: [] }, z(O).nav.launcher.links ??= [], z(O).nav.launcher.links.push({
				label: Y("seed.link"),
				href: "",
				icon: "globe"
			});
		});
	}
	function bc(e) {
		ho("nav", () => {
			z(O).nav.launcher.links.splice(e, 1);
		});
	}
	function wc(e, t) {
		ho("nav", () => {
			let n = z(O).nav.launcher.links, r = e + t;
			r < 0 || r >= n.length || ([n[e], n[r]] = [n[r], n[e]]);
		});
	}
	function Tc(e, t, n) {
		ho(`edit:nav-launcher-${t}-${e}`, () => {
			z(O).nav.launcher.links[e][t] = n;
		});
	}
	async function Ec(e, t) {
		if (e) try {
			let n = await ui(e);
			ho("nav", () => {
				z(O).nav.launcher ??= { links: [] }, t === null ? z(O).nav.launcher.image = n.dataUrl : z(O).nav.launcher.links[t].image = n.dataUrl;
			});
		} catch {
			T(Y("status.imageReadErrorSvg"), "error");
		}
	}
	function Oc(e, t) {
		ho(`edit:nav-sheet-${e}`, () => {
			z(O).nav.style ??= {};
			let n = { ...z(O).nav.style.sheet ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? z(O).nav.style.sheet = n : delete z(O).nav.style.sheet;
		});
	}
	function kc(e, t, n) {
		let r = e.target.value;
		tc(t, r === "" ? void 0 : ms(r, n, void 0)), e.target.value = z(t === "padY" ? ac : oc);
	}
	function jc(e, t, n) {
		let r = e.target.value;
		lc(t, r === "" ? void 0 : ms(r, n, void 0)), e.target.value = z(O).nav.style?.mobile?.[t] ?? "";
	}
	function Ic(e) {
		let t = ms(e / 100, is, .5);
		tc("shrinkTo", t === .5 ? void 0 : t);
	}
	function Vc(e) {
		let t = ms(e, as, 80);
		tc("shrinkAt", t === 80 ? void 0 : t);
	}
	function Hc(e) {
		let t = ms(e, os, 220);
		tc("shrinkMs", t === 220 ? void 0 : t);
	}
	let Uc = {
		underline: [Y("hoverColor.underline.label"), Y("hoverColor.underline.title")],
		pill: [Y("hoverColor.pill.label"), Y("hoverColor.pill.title")],
		lift: [Y("hoverColor.lift.label"), Y("hoverColor.lift.title")]
	}, Wc = /* @__PURE__ */ k(() => Uc[z(O)?.nav?.style?.hover] ?? null), Gc = (e) => e.color || (e.variant === "plain" ? "text" : "accent-text"), Kc = [
		"plain",
		"cards",
		"band"
	], qc = ["cards", "list"], Jc = (e) => (e.version ?? 1) < uf.version ? uf.migrations[1](e.props ?? {}) : e.props ?? {}, Yc = /* @__PURE__ */ k(() => [
		["grid", Y("opt.launcherView.grid")],
		["list", Y("opt.launcherView.list")],
		["cover", Y("opt.launcherView.cover")]
	]), Xc = /* @__PURE__ */ k(() => z(nc) ? [
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
	function Zc(e) {
		(z(O).nav.variant ?? "bar") !== e && ho("nav", () => {
			e === "bar" ? delete z(O).nav.variant : z(O).nav.variant = e, z(O).nav.style && delete z(O).nav.style.radius;
		});
	}
	function Qc(e) {
		ho("nav", () => {
			z(O).nav.style ??= {}, e ? z(O).nav.style.glow = !0 : delete z(O).nav.style.glow;
		});
	}
	function $c(e) {
		ho("nav", () => {
			z(O).nav.style ??= {}, e ? delete z(O).nav.style.topGap : z(O).nav.style.topGap = !1;
		});
	}
	function el(e) {
		ho("nav", () => {
			z(O).nav.style ??= {}, e === "standard" ? delete z(O).nav.style.hover : z(O).nav.style.hover = e;
		});
	}
	let tl = null, nl = {}, rl = {}, il = !1, al = /* @__PURE__ */ A(en([])), ol = /* @__PURE__ */ A(en({})), sl = /* @__PURE__ */ A(null), ul = /* @__PURE__ */ A(""), dl = /* @__PURE__ */ A("news"), hl = [
		["news", Y("collectionKind.news")],
		["notices", Y("collectionKind.notices")],
		["publications", Y("collectionKind.publications")],
		["products", Y("collectionKind.products")],
		["custom", Y("collectionKind.custom")]
	], gl = null, _l = {}, vl = {}, bl = !1, xl = /* @__PURE__ */ A(en([]));
	async function Sl() {
		let e = {
			version: 1,
			maler: []
		};
		try {
			e = await (await fetch("/content/maler.json")).json();
		} catch {}
		gl = na("urd-draft-templates", () => e, pe, "urd-draft-maler"), j(xl, [...gl.data.maler ?? []], !0);
		for (let e of z(xl)) {
			let t = null;
			try {
				t = await (await fetch(`/content/maler/${e}.json`)).json();
			} catch {}
			vl[e] = t, _l[e] = na(`urd-draft-template-${e}`, () => t, pe, `urd-draft-mal-${e}`), (_l[e].data?.schemaVersion ?? 1) > 1 && _l[e].reset();
		}
		bl = !0, Cl();
	}
	function Cl() {
		let e = z(xl).map((e) => _l[e]?.data ? {
			id: e,
			...JSON.parse(JSON.stringify(_l[e].data))
		} : null).filter(Boolean).map(({ id: e, mal: t, section: n, blocks: r, page: i }) => ({
			id: e,
			name: t.name,
			kind: t.kind,
			section: n,
			blocks: r,
			page: i
		}));
		nt?.sendTemplates(e);
	}
	function wl(e) {
		let t = xc.includes(e.kind) ? e.kind : "section";
		return Dl(t, e[t]);
	}
	function Tl(e) {
		let { section: t, block: n } = $t(e.sectionId, e.blockId);
		t && n?.sticky && sn.some(([t]) => t === e.dock) && (mt(`sticky-dock:${e.blockId}`), n.sticky = {
			...n.sticky,
			dock: e.dock
		}, D.save(), lt(), nt?.sendSection(z(w), t), nn());
	}
	function El(e) {
		let t = e.blockIds ?? [], { section: n } = $t(e.sectionId, t[0]);
		if (!n || !t.length) return;
		mt(`sticky-group:${e.sectionId}`);
		let r = e.on ? qs("stk") : null;
		for (let e of n.blocks) t.includes(e.id) && (e.sticky = r ? {
			offset: 16,
			until: null,
			...e.sticky,
			group: r
		} : null);
		et(n, "block-edited"), D.save(), lt(), nt?.sendSection(z(w), n), nn(), T(Y(e.on ? "status.stickyGrouped" : "status.stickyUngrouped"));
	}
	async function Dl(e, t) {
		if (!t || !gl) return;
		let n = (await Et({
			title: Y("canvas.templateNamePrompt"),
			placeholder: Y("ph.templateName")
		}))?.trim();
		if (!n) return;
		let r = Sc(n);
		if (!r) {
			T(Y("status.invalidName"), "error");
			return;
		}
		if (z(xl).includes(r)) {
			T(Y("status.templateExists"), "error");
			return;
		}
		mt("templates");
		let i = {
			schemaVersion: 1,
			mal: {
				name: n,
				kind: e
			},
			[e]: t
		};
		_l[r] = na(`urd-draft-template-${r}`, () => null, pe, `urd-draft-mal-${r}`), _l[r].replace(i), _l[r].save(), gl.data.maler = [...z(xl), r], gl.save(), j(xl, [...z(xl), r], !0), T(Y("status.templateSaved", { name: n }), "ok"), lt(), Cl();
	}
	async function Ol(e) {
		let t = _l[e.id]?.data?.mal;
		t && await Tt({ title: Y("confirm.deleteTemplate", { name: t.name }) }) && (mt("templates"), z(vo) === e.id && j(vo, null), localStorage.removeItem(`urd-draft-template-${e.id}`), localStorage.removeItem(`urd-draft-mal-${e.id}`), delete _l[e.id], gl.data.maler = z(xl).filter((t) => t !== e.id), gl.save(), j(xl, z(xl).filter((t) => t !== e.id), !0), lt(), Cl());
	}
	async function kl() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/collections.json")).json();
		} catch {}
		tl = na("urd-draft-collections", () => e, pe, "urd-draft-samlinger"), j(al, [...tl.data.samlinger ?? []], !0);
		for (let e of z(al)) {
			let t = null;
			try {
				t = await (await fetch(`/content/samlinger/${e}.json`)).json();
			} catch {}
			rl[e] = t, nl[e] = na(`urd-draft-collection-${e}`, () => t, pe, `urd-draft-samling-${e}`), !t && !nl[e].data && (nl[e].replace({
				schemaVersion: 1,
				id: e,
				name: e,
				kind: "custom",
				entries: []
			}), nl[e].save());
		}
		il = !0, Al();
	}
	function Al(e = !0) {
		let t = {};
		for (let e of z(al)) nl[e] && (t[e] = JSON.parse(JSON.stringify(nl[e].data)));
		j(ol, t, !0), e && jl();
	}
	function jl() {
		nt?.sendCollections(Ke(z(ol)) ?? {});
	}
	function Ml(e, t, n, r = !0) {
		let i = nl[e];
		i && (mt(t), n(i.data), i.save(), lt(), Al(r));
	}
	function Nl(e) {
		nl[e.collection] && Bl(e.collection);
	}
	function Pl(e) {
		return (new DOMParser().parseFromString(String(e ?? ""), "text/html").body.textContent ?? "").trim();
	}
	function Fl(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r !== "title" || Pl(i)) && Ml(t, `edit:collection:${t}:${n}:${r}`, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image");
	}
	function Il(e, t, n) {
		let r = {
			schemaVersion: 1,
			id: e,
			name: t,
			kind: n,
			entries: []
		};
		nl[e] = na(`urd-draft-collection-${e}`, () => null, pe, `urd-draft-samling-${e}`), nl[e].replace(r), nl[e].save(), tl.data.samlinger = [...z(al), e], tl.save(), j(al, [...z(al), e], !0), j(sl, e, !0), lt(), Al();
	}
	function Ll() {
		let e = z(ul).trim();
		if (!e) return;
		let t = Ba(e);
		if (!t || z(al).includes(t)) {
			T(Y(t ? "status.collectionExists" : "status.invalidName"), "error");
			return;
		}
		mt("collections"), Il(t, e, z(dl)), j(ul, "");
	}
	function Rl() {
		let e = Y("seed.productCatalogName"), t = Ba(e) || "collection", n = t;
		for (let e = 2; z(al).includes(n); e += 1) n = `${t}-${e}`;
		mt("collections"), Il(n, e, "products"), un(null, (e) => {
			e.props.collection = n;
		});
	}
	function zl(e) {
		mt("collections"), localStorage.removeItem(`urd-draft-collection-${e}`), localStorage.removeItem(`urd-draft-samling-${e}`), delete nl[e], tl.data.samlinger = z(al).filter((t) => t !== e), tl.save(), j(al, z(al).filter((t) => t !== e), !0), z(sl) === e && j(sl, null), lt(), Al();
	}
	function Bl(e) {
		Ml(e, `collection:${e}:add-entry`, (e) => {
			e.kind === "products" ? e.entries.push({
				id: qs("entry"),
				title: Y("seed.newProduct"),
				text: ""
			}) : e.entries.unshift({
				id: qs("entry"),
				title: Y("seed.newEntry"),
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function Vl(e, t, n, r) {
		Ml(e, `edit:collection:${e}:${t}:${n}`, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function Hl(e, t, n) {
		Ml(e, `collection:${e}:move-entry`, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function Ul(e, t) {
		Ml(e, `collection:${e}:remove-entry`, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function Wl(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && Vl(e, t, "image", (await ui(r)).dataUrl);
	}
	function Gl(e, t, n) {
		let r = n.split(",").map((e) => e.trim()).filter(Boolean);
		Vl(e, t, "sizes", r.length ? r : "");
	}
	function Kl(e, t) {
		Ml(e, `collection:${e}:${t}:colors`, (e) => {
			let n = e.entries.find((e) => e.id === t);
			n && (n.colors = [...n.colors ?? [], { name: Y("ph.colorName") }]);
		});
	}
	function ql(e, t, n, r, i) {
		Ml(e, `edit:collection:${e}:${t}:color:${n}:${r}`, (e) => {
			let a = e.entries.find((e) => e.id === t)?.colors?.[n];
			a && (r === "image" && !i ? delete a.image : i && (a[r] = i));
		});
	}
	async function Jl(e, t, n, r) {
		let i = r.target.files?.[0];
		r.target.value = "", i && ql(e, t, n, "image", (await ui(i)).dataUrl);
	}
	function Yl(e, t, n) {
		Ml(e, `collection:${e}:${t}:colors`, (e) => {
			let r = e.entries.find((e) => e.id === t);
			r?.colors && (r.colors = r.colors.filter((e, t) => t !== n), r.colors.length || delete r.colors);
		});
	}
	function Xl(e) {
		let t = nl[e]?.data;
		if (!t) return;
		let n = URL.createObjectURL(new Blob([Dc(t.entries)], { type: "text/csv" })), r = document.createElement("a");
		r.href = n, r.download = `${e}.csv`, r.click(), URL.revokeObjectURL(n);
	}
	async function Ql(e, t) {
		let n = t.target.files?.[0];
		if (t.target.value = "", !n) return;
		let r = Ac(await n.text());
		if (!r) {
			T(Y("status.csvInvalid"), "error");
			return;
		}
		let i = /* @__PURE__ */ new Set();
		for (let e of r.entries) (!/^[a-z0-9][a-z0-9-]*$/.test(e.id) || i.has(e.id)) && (e.id = qs("entry")), i.add(e.id);
		Ml(e, `collection:${e}:import`, (e) => {
			e.entries = r.entries;
		}), T(Y("status.csvImported", { count: String(r.entries.length) }), "ok");
	}
	let tu = null, nu, ou = new Promise((e) => {
		nu = e;
	}), lu = /* @__PURE__ */ A(null), uu = en({}), gu = /* @__PURE__ */ A("0.0.0"), _u = /* @__PURE__ */ A(""), vu = /* @__PURE__ */ A(""), yu = /* @__PURE__ */ A(en([])), bu = /* @__PURE__ */ A(en([])), xu = /* @__PURE__ */ A("pending"), Su = () => [.../* @__PURE__ */ new Set([...z(lu)?.enabled ?? [], ...z(lu)?.disabled ?? []])];
	function Cu() {
		j(lu, JSON.parse(JSON.stringify(tu.data)), !0);
	}
	let wu = /* @__PURE__ */ A(null);
	async function Tu() {
		try {
			let e = (await fetch("/urd.json", { cache: "no-store" })).headers.get("content-security-policy");
			if (!e) {
				j(wu, { unknown: !0 }, !0);
				return;
			}
			let t = (t) => new Set((e.split(";").map((e) => e.trim()).find((e) => e.startsWith(`${t} `)) ?? "").split(/\s+/).slice(1));
			j(wu, {
				frameSrc: t("frame-src"),
				connectSrc: t("connect-src"),
				scriptSrc: t("script-src")
			}, !0);
		} catch {
			j(wu, { unknown: !0 }, !0);
		}
	}
	function Eu(e) {
		let t = [
			...(e.scriptSrc ?? []).map((e) => ["script-src", e]),
			...(e.connectSrc ?? []).map((e) => ["connect-src", e]),
			...(e.frameSrc ?? []).map((e) => ["frame-src", e])
		];
		if (!z(wu) || z(wu).unknown) return [];
		let n = {
			"script-src": z(wu).scriptSrc,
			"connect-src": z(wu).connectSrc,
			"frame-src": z(wu).frameSrc
		};
		return t.filter(([e, t]) => !n[e]?.has(t)).map(([e, t]) => `${e} ${t}`);
	}
	async function ku() {
		Tu();
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		j(bu, e.enabled ?? [], !0), tu = na("urd-draft-plugins", () => e, pe), Cu();
		try {
			j(gu, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of Su()) Iu(e);
		Nu(), nu(), nt?.sendPlugins(Ke(z(lu))?.enabled ?? []);
	}
	async function Nu() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				Pu();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), j(yu, (t ?? []).filter((e) => !Su().includes(e)), !0);
			for (let e of z(yu)) Iu(e);
			j(xu, "ok");
		} catch {
			Pu();
		}
	}
	function Pu() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				j(yu, e.filter((e) => !Su().includes(e)), !0);
				for (let e of z(yu)) Iu(e);
				j(xu, "ok");
				return;
			}
		} catch {}
		j(xu, "unavailable");
	}
	async function Iu(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = Ks(t);
			uu[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && Ws(z(gu), t.requiresEngine)
			};
		} catch {
			uu[e] = {
				name: e,
				errors: [Y("plugin.manifestNotFound", { id: e })],
				satisfied: !1
			};
		}
	}
	function Lu(e, t) {
		mt("plugins");
		let n = tu.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), tu.save(), lt(), Cu(), Ru();
	}
	function Ru() {
		z(he) && (z(he).src = z(he).src);
	}
	function zu(e) {
		mt("plugins");
		let t = tu.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), tu.save(), lt(), Cu(), Ru();
	}
	async function Bu() {
		j(vu, "");
		let e = z(_u).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			j(vu, Y("plugin.invalidId"), !0);
			return;
		}
		if (Su().includes(e)) {
			j(vu, Y("plugin.alreadyListed"), !0);
			return;
		}
		if (await Iu(e), uu[e].errors.length) {
			j(vu, Y("plugin.invalidManifest", { errors: uu[e].errors.join("; ") }), !0);
			return;
		}
		Lu(e, !0), j(_u, "");
	}
	function Wu(e) {
		j(yu, z(yu).filter((t) => t !== e), !0), Lu(e, !0);
	}
	function Gu(e, t) {
		ho(e, () => {
			z(O).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(z(O).footer);
		});
	}
	function Ku(e, t) {
		Gu(`edit:footer-brand-${e}`, (n) => {
			n.brand ??= {}, t.trim() ? n.brand[e] = t : delete n.brand[e], !n.brand.title && !n.brand.tagline && !n.brand.logo && delete n.brand;
		});
	}
	function qu(e) {
		Gu("footer", (t) => {
			t.brand ??= {}, e === "image" || e === "both" ? t.brand.mode = e : delete t.brand.mode;
		});
	}
	async function Ju(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await ui(t);
			Gu("footer", (t) => {
				t.brand ??= {}, t.brand.logo = e.dataUrl, t.brand.mode || (t.brand.mode = "both");
			});
		} catch {
			T(Y("status.imageReadErrorSvg"), "error");
		}
	}
	function Xu() {
		Gu("footer", (e) => {
			e.brand && (delete e.brand.logo, delete e.brand.mode, delete e.brand.logoHeight, !e.brand.title && !e.brand.tagline && delete e.brand);
		});
	}
	function Qu(e) {
		Gu("edit:footer-logo-height", (t) => {
			t.brand ??= {};
			let n = Number(e);
			Number.isFinite(n) && (t.brand.logoHeight = Math.min(160, Math.max(16, Math.round(n))));
		});
	}
	function $u(e) {
		Gu("edit:footer-copyright", (t) => {
			e.trim() ? t.copyright = e : delete t.copyright;
		});
	}
	let ed = [
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
	function td(e) {
		let t = Y("seed.orgName"), n = z(O).pages ?? [], r = (e) => n.slice(0, e).map((e) => ({
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
		} : e === "centered" ? {
			align: "center",
			brand: { title: t },
			linkRow: r(5),
			social: i([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: `${o} · ${Y("seed.footer.madeWith")}`
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
					a(Y("seed.footer.about"), "#"),
					a(Y("seed.footer.contact"), "#"),
					a(Y("seed.footer.privacy"), "#")
				]
			}],
			social: i(["facebook", "instagram"]),
			copyright: o,
			baseline: [a(Y("seed.footer.privacy"), "#")]
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
			social: i([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: o,
			baseline: [a(Y("seed.footer.privacy"), "#"), a(Y("seed.footer.terms"), "#")]
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
						a(Y("seed.footer.address"), "#"),
						a(Y("seed.email"), `mailto:${Y("seed.email")}`),
						a(Y("seed.phone"), `tel:${Y("seed.phone").replace(/\s+/g, "")}`)
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
						a(Y("seed.footer.about"), "#"),
						a(Y("seed.footer.history"), "#"),
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
				}
			],
			copyright: o,
			baseline: [a(Y("seed.footer.privacy"), "#"), a(Y("seed.footer.terms"), "#")]
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
					a(Y("seed.footer.about"), "#"),
					a(Y("seed.footer.contact"), "#"),
					a(Y("seed.footer.privacy"), "#")
				]
			}],
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
				links: [a(Y("seed.footer.newsletter"), "#"), a(Y("seed.email"), `mailto:${Y("seed.email")}`)]
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
					version: Ou.version ?? 1,
					props: {
						...Ou.defaults(),
						color: "accent",
						x: .12,
						y: 0,
						radius: .6,
						opacity: .45
					}
				}, {
					type: "grain",
					version: Au.version ?? 1,
					props: {
						...Au.defaults(),
						opacity: .08
					}
				}]
			}
		};
	}
	function nd(e) {
		Gu("footer-template", (t) => {
			let n = td(e);
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
	function rd(e) {
		Gu("footer", (t) => {
			t[e] ??= [], t[e].push(z(O).pages[0] ? {
				label: Y("seed.link"),
				page: z(O).pages[0].id
			} : {
				label: Y("seed.link"),
				href: "https://"
			});
		});
	}
	function id(e, t) {
		Gu("footer", (n) => {
			n[e].splice(t, 1), n[e].length || delete n[e];
		});
	}
	function ad(e, t, n) {
		Gu("footer", (r) => {
			let i = r[e], a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function od(e, t, n) {
		Gu(`edit:footer-${e}-label-${t}`, (r) => {
			r[e][t].label = n;
		});
	}
	function sd(e, t, n) {
		Gu("footer", (r) => {
			let i = r[e][t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function cd(e, t, n) {
		Gu(`edit:footer-${e}-href-${t}`, (r) => {
			r[e][t].href = n;
		});
	}
	function ld(e) {
		Gu("footer", (t) => {
			e === "center" ? t.columnsAlign = "center" : delete t.columnsAlign;
		});
	}
	function ud(e) {
		Gu("footer", (t) => {
			e ? t.cta ??= {
				kind: "button",
				label: Y("seed.join")
			} : delete t.cta;
		});
	}
	function dd(e, t) {
		Gu(`edit:footer-cta-${e}`, (n) => {
			n.cta ??= {}, t === "" || t == null || t === !1 ? delete n.cta[e] : n.cta[e] = t;
		});
	}
	function fd(e) {
		Gu("footer", (t) => {
			t.cta ??= {}, e === "__href" ? (delete t.cta.page, t.cta.href = t.cta.href ?? "https://") : (t.cta.page = e, delete t.cta.href);
		});
	}
	function pd(e, t) {
		Gu("footer", (n) => {
			let r = new Set(n.hideOn ?? []);
			t ? r.delete(e) : r.add(e), r.size ? n.hideOn = [...r] : delete n.hideOn;
		});
	}
	function md() {
		Gu("footer", (e) => {
			e.columns ??= [], e.columns.push({
				title: Y("seed.column"),
				links: [{
					label: Y("seed.link"),
					page: z(O).pages[0].id
				}]
			});
		});
	}
	function hd(e) {
		Gu("footer", (t) => {
			t.columns.splice(e, 1), t.columns.length || delete t.columns;
		});
	}
	function gd(e, t) {
		Gu("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.columns.length || ([n.columns[e], n.columns[r]] = [n.columns[r], n.columns[e]]);
		});
	}
	function _d(e, t) {
		Gu(`edit:footer-col-title-${e}`, (n) => {
			n.columns[e].title = t;
		});
	}
	function vd(e) {
		Gu("footer", (t) => {
			t.columns[e].links ??= [], t.columns[e].links.push({
				label: Y("seed.link"),
				page: z(O).pages[0].id
			});
		});
	}
	function yd(e, t) {
		Gu("footer", (n) => {
			n.columns[e].links.splice(t, 1);
		});
	}
	function bd(e, t, n) {
		Gu("footer", (r) => {
			let i = r.columns[e].links, a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function xd(e, t, n) {
		Gu(`edit:footer-link-label-${e}-${t}`, (r) => {
			r.columns[e].links[t].label = n;
		});
	}
	function Sd(e, t, n) {
		Gu("footer", (r) => {
			let i = r.columns[e].links[t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function wd(e, t, n) {
		Gu(`edit:footer-link-href-${e}-${t}`, (r) => {
			r.columns[e].links[t].href = n;
		});
	}
	function Ad() {
		Gu("footer", (e) => {
			e.social ??= [], e.social.push({
				icon: "facebook",
				url: "https://"
			});
		});
	}
	function jd(e) {
		Gu("footer", (t) => {
			t.social.splice(e, 1), t.social.length || delete t.social;
		});
	}
	function Md(e, t) {
		Gu("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.social.length || ([n.social[e], n.social[r]] = [n.social[r], n.social[e]]);
		});
	}
	function Nd(e, t) {
		Gu("footer", (n) => {
			n.social[e].icon = t;
		});
	}
	function Pd(e, t) {
		Gu(`edit:footer-social-url-${e}`, (n) => {
			n.social[e].url = t;
		});
	}
	let Fd = to.filter(([e]) => e === "iconCat.social" || e === "iconCat.communication").flatMap(([, e]) => e.map((e) => [e, Y(eo[e].labelKey)]));
	function Id(e, t) {
		ho(`edit:nav-label-${e}`, () => {
			z(O).nav.items[e].label = t;
		});
	}
	function Ld(e, t) {
		ho("nav", () => {
			let n = z(O).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function Rd(e, t) {
		ho(`edit:nav-href-${e}`, () => {
			z(O).nav.items[e].href = t;
		});
	}
	function zd(e, t) {
		let n = e + t, r = z(O).nav.items;
		n < 0 || n >= r.length || ho("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function Vd(e) {
		ho("nav", () => {
			z(O).nav.items.splice(e, 1);
		});
	}
	let Hd = /* @__PURE__ */ A(""), Ud = /* @__PURE__ */ A(""), Wd = /* @__PURE__ */ A(null);
	function Gd(e) {
		let [t, n] = e.split(".").map(Number), r = z(O).nav.items;
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
	function Kd(e, t, n, r) {
		if (!z(Ud) || z(Ud) === t) return null;
		let i = e.getBoundingClientRect(), a = (r - i.top) / i.height, o = n - i.left, s = Gd(z(Ud)), c = Gd(t), l = s.list[s.index], u;
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
		}, qd(u, l, s);
	}
	function qd(e, t, n) {
		let r = Gd(e.key);
		if (r.parent) {
			if (r.parent === t) return null;
			t.children?.length && (e = {
				key: e.key.split(".")[0],
				pos: "after"
			}, r = Gd(e.key));
		}
		let i = r.list[r.index];
		if (e.pos === "into") {
			let n = i.children ?? [];
			return n.length && n[n.length - 1] === t ? null : e;
		}
		let a = r.parent ? r.parent.children : z(O).nav.items, o = a.filter((e) => e !== t).indexOf(i) + +(e.pos === "after");
		return a === n.list && o === n.index ? null : e;
	}
	function Jd() {
		if (!z(Ud)) return {
			label: "",
			target: ""
		};
		let e = Gd(z(Ud)), t = e.list[e.index], n = t.page ? z(O).pages.find((e) => e.id === t.page) : null;
		return {
			label: t.label,
			target: n ? n.title : t.href ?? Y("opt.noLink")
		};
	}
	function Yd(e) {
		z(Wd) && e?.dataTransfer?.dropEffect !== "none" && Qd(z(Wd).key), j(Ud, ""), j(Wd, null);
	}
	bn(() => {
		if (!z(Ud)) return;
		let e = (e) => e.preventDefault();
		return window.addEventListener("dragover", e), window.addEventListener("drop", e), () => {
			window.removeEventListener("dragover", e), window.removeEventListener("drop", e);
		};
	});
	let Xd = "application/x-urd-nav-row";
	function Zd(e) {
		if (!z(Ud)) return;
		let t = [...e.currentTarget.querySelectorAll(".nav-item:not(.ghost)")];
		if (!t.length) return;
		let n = t.find((t) => {
			let n = t.getBoundingClientRect();
			return e.clientY >= n.top && e.clientY <= n.bottom;
		}), r = null;
		if (n) r = Kd(n, n.dataset.key, e.clientX, e.clientY);
		else {
			let n = Gd(z(Ud)), i = n.list[n.index], a = t.find((t) => {
				let n = t.getBoundingClientRect();
				return n.top + n.height / 2 > e.clientY;
			});
			if (a) r = a.dataset.key === z(Ud) ? null : qd({
				key: a.dataset.key,
				pos: "before"
			}, i, n);
			else {
				let e = [...t].reverse().find((e) => !e.classList.contains("child"));
				r = e.dataset.key === z(Ud) ? null : qd({
					key: e.dataset.key,
					pos: "after"
				}, i, n);
			}
		}
		if (!r) {
			j(Wd, null);
			return;
		}
		e.preventDefault(), (z(Wd)?.key !== r.key || z(Wd)?.pos !== r.pos) && j(Wd, r, !0);
	}
	function Qd(e) {
		let t = z(Ud), n = z(Wd);
		if (j(Ud, ""), j(Wd, null), t && n && n.key === e && t !== e) {
			{
				let r = Gd(t), i = Gd(e), a = r.list[r.index];
				if (i.parent && (i.parent === a || a.children?.length) || n.pos === "into" && a.children?.length) return;
			}
			ho("nav", () => {
				let r = z(O).nav.items, i = Gd(t), a = Gd(e), o = i.list[i.index], s = a.list[a.index];
				if (o !== s) {
					if (i.list.splice(i.index, 1), i.parent && i.parent.children.length === 0 && (delete i.parent.children, !i.parent.page && !i.parent.href && (i.parent.page = z(O).pages[0].id)), n.pos === "into") s.children ??= [], s.children.push(o);
					else {
						let e = a.parent ? a.parent.children : r, t = e.indexOf(s) + +(n.pos === "after");
						e.splice(t, 0, o);
					}
					!o.page && o.href == null && !o.children?.length && (o.page = z(O).pages[0].id);
				}
			}), j(Hd, "");
		}
	}
	let $d = "<svg width=\"10\" height=\"16\" viewBox=\"0 0 10 16\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"3\" cy=\"3\" r=\"1.3\"/><circle cx=\"7\" cy=\"3\" r=\"1.3\"/><circle cx=\"3\" cy=\"8\" r=\"1.3\"/><circle cx=\"7\" cy=\"8\" r=\"1.3\"/><circle cx=\"3\" cy=\"13\" r=\"1.3\"/><circle cx=\"7\" cy=\"13\" r=\"1.3\"/></svg>";
	function ef() {
		ho("nav", () => {
			z(O).nav.items.push({
				label: Y("seed.link"),
				page: z(O).pages[0].id
			});
		});
	}
	function tf(e) {
		ho("nav", () => {
			let t = z(O).nav.items[e];
			t.children ??= [], t.children.push({
				label: Y("seed.link"),
				page: z(O).pages[0].id
			});
		});
	}
	function nf(e, t, n) {
		ho(`edit:nav-child-label-${e}-${t}`, () => {
			z(O).nav.items[e].children[t].label = n;
		});
	}
	function rf(e, t, n) {
		ho("nav", () => {
			let r = z(O).nav.items[e].children[t];
			n === "__href" ? (delete r.page, r.href = r.href ?? "https://") : (r.page = n, delete r.href);
		});
	}
	function af(e, t, n) {
		ho(`edit:nav-child-href-${e}-${t}`, () => {
			z(O).nav.items[e].children[t].href = n;
		});
	}
	function sf(e, t, n) {
		let r = t + n, i = z(O).nav.items[e].children;
		r < 0 || r >= i.length || ho("nav", () => {
			[i[t], i[r]] = [i[r], i[t]];
		});
	}
	function cf(e, t) {
		ho("nav", () => {
			let n = z(O).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = z(O).pages[0].id));
		});
	}
	function lf(e, t) {
		ho(`edit:theme-color-${e}`, () => {
			z(O).theme.tokens.color[e] = t, z(O).theme.alt?.auto && (z(O).theme.alt.tokens.color = wf());
		});
	}
	function df(e, t) {
		return e === "accent-text" ? se(Lf(t.accent ?? "#000000", t)) : t.bg;
	}
	let ff = /* @__PURE__ */ k(() => !z(O)?.theme?.tokens?.color?.["accent-text"] && !z(O)?.theme?.alt?.tokens?.color?.["accent-text"]), pf = /* @__PURE__ */ A(null), mf = /* @__PURE__ */ A(!1), hf = /* @__PURE__ */ A(!1), gf = (e) => e.length > 0 && [...e].every((e) => e.open);
	function _f() {
		let e = z(pf)?.querySelectorAll("details.group") ?? [];
		j(mf, e.length > 0), j(hf, gf(e), !0);
	}
	bn(() => {
		z(zt), fr().then(_f);
	});
	function vf() {
		let e = !z(hf);
		z(pf)?.querySelectorAll("details.group").forEach((t) => {
			t.open = e;
		}), _f();
	}
	function yf(e) {
		for (let t of e.querySelectorAll("details.group")) {
			let e = t.querySelector(":scope > summary");
			if (!e || e.querySelector(".fold-sub")) continue;
			let n = () => t.querySelectorAll(":scope > .group-items details.group");
			if (!n().length) continue;
			let r = document.createElement("button");
			r.type = "button", r.className = "fold-sub fold-toggle", r.innerHTML = C.foldToggle;
			let i = () => {
				let e = gf(n());
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
	bn(() => {
		let e = z(pf);
		if (!e) return;
		let t = new MutationObserver(() => {
			yf(e), _f();
		});
		return t.observe(e, {
			childList: !0,
			subtree: !0
		}), e.addEventListener("toggle", _f, !0), yf(e), () => {
			t.disconnect(), e.removeEventListener("toggle", _f, !0);
		};
	});
	function bf(e) {
		ho("edit:theme-color-accent-text", () => {
			e ? (delete z(O).theme.tokens.color["accent-text"], z(O).theme.alt?.tokens?.color && delete z(O).theme.alt.tokens.color["accent-text"]) : (z(O).theme.tokens.color["accent-text"] = df("accent-text", z(Ui)), z(O).theme.alt?.auto && (z(O).theme.alt.tokens.color = wf()));
		});
	}
	function xf(e, t) {
		ho("theme", () => {
			z(O).theme.tokens.font[e] = t;
		});
	}
	function Sf(e, t) {
		ho("theme", () => {
			z(O).theme.tokens.radius[e] = t;
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
		return Object.fromEntries(Object.entries(z(O).theme.tokens.color).map(([e, t]) => [e, Cf(t)]));
	}
	function Tf(e, t) {
		ho(`edit:theme-alt-${e}`, () => {
			z(O).theme.alt.tokens.color[e] = t, z(O).theme.alt.auto = !1;
		});
	}
	function Ef(e) {
		ho("theme", () => {
			e === "light" ? delete z(O).theme.scheme : z(O).theme.scheme = e;
		});
	}
	function Df(e) {
		ho("theme", () => {
			e ? z(O).theme.alt = {
				auto: !0,
				tokens: { color: wf() }
			} : delete z(O).theme.alt;
		});
	}
	function Of(e) {
		ho("theme", () => {
			z(O).theme.alt ??= { tokens: { color: wf() } }, z(O).theme.alt.auto = e, e && (z(O).theme.alt.tokens.color = wf());
		});
	}
	function jf(e) {
		let t = z(O).theme.tokens.font[e];
		return [...Ff.some(([, e]) => e === t) ? [] : [[t, Y("opt.customFont")]], ...Ff.map(([e, t]) => [t, Y(e)])];
	}
	let Mf = (e) => parseInt(e, 10) || 0;
	function Nf(e, t) {
		Sf(e, `${t}px`);
	}
	let Lf = (e, t) => e && t && t[e] ? t[e] : e, zf = [
		"bg",
		"surface",
		"text",
		"accent",
		"accent-text"
	], Bf = [
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
	function Vf(e) {
		ho("theme", () => {
			let t = e.scheme === "dark", n = t ? e.dark : e.light, r = t ? e.light : e.dark;
			for (let e of zf) z(O).theme.tokens.color[e] = n[e];
			t ? z(O).theme.scheme = "dark" : delete z(O).theme.scheme, z(O).theme.alt = { tokens: { color: { ...r } } };
		});
	}
	let Q = /* @__PURE__ */ k(() => {
		if (!z(O)) return null;
		let e = z(O).theme.tokens.color, t = z(O).theme.alt?.tokens?.color ?? {}, n = z(O).theme.scheme === "dark";
		return Bf.find((r) => {
			let i = n ? r.dark : r.light, a = n ? r.light : r.dark;
			return zf.every((n) => e[n] === i[n] && t[n] === a[n]);
		})?.id ?? null;
	}), Hf = 0;
	async function qf() {
		z(ve) && (Hf = z(pf)?.scrollTop ?? 0), j(ve, !z(ve)), nt?.sendChrome(z(ve)), z(ve) && (await fr(), requestAnimationFrame(() => {
			z(pf) && (z(pf).scrollTop = Hf);
		}));
	}
	function Jf(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (mt(`edit:${e.blockId}`), n.props = e.props, D.save(), lt(), z(M)?.blockId === e.blockId && nn(), e.rerender && nt?.sendSection(z(w), t), j(ue, ""));
	}
	function Yf(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		mt(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && et(t, "desktop-changed-after-mobile"), D.save(), lt(), z(M)?.blockId === e.blockId && nn();
	}
	function Qf(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t?.frames?.desktop && t.frames.desktop.h !== e.h && (D.amendBaseline((t) => {
			let n = t.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
			n?.frames?.desktop && (n.frames.desktop.h = e.h);
		}), D.hasDraft() && mt(`edit:${e.blockId}`), t.frames.desktop.h = e.h, D.save(), lt(), z(M)?.blockId === e.blockId && nn());
	}
	function ep(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			if (mt("mobile-reset"), e.blockId) {
				let n = t.blocks.find((t) => t.id === e.blockId);
				n && (n.frames.mobile = null);
			} else for (let e of t.blocks) e.frames.mobile = null;
			!$e(t) && t.responsive?.mobile && (t.responsive.mobile.attention = null), D.save(), lt(), Je(), nt?.sendSection(z(w), t);
		}
	}
	function tp(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && typeof e.mobileOrder == "number" && (mt("mobile-order"), n.mobileOrder = e.mobileOrder, D.save(), lt(), nt?.sendSection(z(w), t));
	}
	function np(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (mt("review-done"), t.responsive.mobile.attention = null, D.save(), lt(), Je());
	}
	function rp(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (mt("block-flag"), typeof e.decor == "boolean" && (n.decor = e.decor), typeof e.hideMobile == "boolean" && (n.hideMobile = e.hideMobile), D.save(), lt(), typeof e.hideMobile == "boolean" && z(je) === "mobile" && nt?.sendSection(z(w), t), z(M)?.blockId === e.blockId && nn());
	}
	function ip(e) {
		mt("add-section"), e.section.id || (e.section.id = qs("sec")), D.data.sections.splice(e.index, 0, e.section), D.save(), lt(), nt?.sendPage(z(w), D.data), j(_r, e.section.id, !0), Dr(e.section), j(zt, "properties");
	}
	function ap(e) {
		let t = D.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (mt("move-section"), [t[n], t[r]] = [t[r], t[n]], D.save(), lt(), nt?.sendPage(z(w), D.data));
	}
	function op(e) {
		mt("delete-section"), e.sectionId === z(_r) && (j(_r, null), j(vr, null)), z(M)?.sectionId === e.sectionId && j(M, null), D.data.sections = D.data.sections.filter((t) => t.id !== e.sectionId), D.save(), lt(), nt?.sendPage(z(w), D.data);
	}
	function sp(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			mt("section-size"), t.size = {
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
			e.moves?.length && (et(t, "section-height"), z(M)?.sectionId === e.sectionId && nn()), e.sectionId === z(_r) && j(yr, e.minHeight, !0), D.save(), lt();
		}
	}
	function cp(e) {
		let t = D.data.sections.find((t) => t.id === e.fromSectionId), n = D.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		t && n && r && (mt("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), et(t, "block-moved"), et(n, "block-moved"), D.save(), lt(), Je(), nt?.sendSection(z(w), t), nt?.sendSection(z(w), n), z(M)?.blockId === e.blockId && (j(M, {
			...z(M),
			sectionId: e.toSectionId
		}, !0), nn()));
	}
	function lp(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		if (!t) return;
		let n = e.blockIds ?? [e.blockId];
		mt("delete-block"), t.blocks = t.blocks.filter((e) => !n.includes(e.id)), n.includes(z(M)?.blockId) && j(M, null), et(t, "block-deleted"), D.save(), lt(), nt?.sendSection(z(w), t);
	}
	let $ = {
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
				submitLabel: Y("form.sendDefault"),
				successText: Y("form.thanksDefault"),
				fields: ks()
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
		"calendar-agenda": {
			type: "calendar",
			props: {
				sources: [],
				view: "agenda",
				limit: 8,
				showCategories: !0,
				showSubscribe: !0
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
	function up(e) {
		let t = $[e];
		return t ? {
			id: qs("blk"),
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
	function dp(e) {
		nt ? nt.sendPlaceBlock(e) : fp(da()?.id, e);
	}
	function fp(e, t) {
		let n = D.data.sections.find((t) => t.id === e) ?? D.data.sections[0];
		if (!n) return;
		mt("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), et(n, "block-added"), D.save(), lt(), nt?.sendSection(z(w), n);
	}
	function pp(e, t, n, r) {
		let i = D.data.sections.find((t) => t.id === e);
		if (!i || !t?.length) return;
		mt("add-blocks");
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
		}), et(i, "block-added"), D.save(), lt(), nt?.sendSection(z(w), i);
	}
	function mp(e) {
		dp(up(e));
	}
	let hp = /* @__PURE__ */ A(en([])), vv = { map: [
		{
			key: "location",
			type: "place",
			label: Y("lbl.mapLocation"),
			placeholder: Y("ph.mapLocation")
		},
		{
			key: "zoom",
			type: "number",
			label: Y("lbl.mapZoom"),
			min: 1,
			max: 19
		},
		{
			key: "height",
			type: "number",
			label: Y("lbl.mapHeight"),
			min: 120,
			max: 900,
			step: 10
		}
	] };
	function yv(e, t = {}) {
		let n = Ke(e);
		dp({
			id: qs("blk"),
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
	let bv = /* @__PURE__ */ A("");
	function xv() {
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
		for (let t of z(xl)) {
			let n = _l[t]?.data?.mal;
			n?.kind === "blocks" && e.push({
				label: n.name,
				act: "template",
				id: t
			});
		}
		for (let t of z(hp)) if (t.variants?.length) for (let n of t.variants) e.push({
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
	function Sv(e) {
		e.act === "block" ? mp(e.kind) : e.act === "plugin" ? yv(e.entry, e.props ?? {}) : e.act === "template" && nt?.sendInsertTemplate(e.id);
	}
	function Cv(e) {
		let t = up(e.kind);
		if (t) {
			if (e.at && typeof e.at.x == "number" && typeof e.at.y == "number") {
				let n = D.data.sections.find((t) => t.id === e.sectionId)?.grid ?? z(O).grid, r = If({
					x: e.at.x,
					y: e.at.y,
					w: t.frames.desktop.w,
					h: t.frames.desktop.h,
					grid: n
				});
				t.frames.desktop.x = r.x, t.frames.desktop.y = r.y;
			} else t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40;
			fp(e.sectionId, t), nt?.sendSelect(t.id), e.kind === "image" && T(Y("status.imageBlockAdded")), e.kind === "gallery" && T(Y("status.galleryBlockAdded"));
		}
	}
	async function wv(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		T(Y("status.compressingImage"));
		let n;
		try {
			n = await ui(t);
		} catch (e) {
			T(di(e), "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (z(he)?.clientWidth ?? 1280));
		dp({
			id: qs("blk"),
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: Ba(t.name).replaceAll("-", " "),
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
		}), n.bytes > 4e5 ? T(Y("status.imageLarge", { kb: Math.round(n.bytes / 1024) }), "error") : T("");
	}
	async function Tv(e) {
		let t = [], n = 0, r = 0;
		for (let i of e) try {
			let e = await ui(i);
			e.bytes > 4e5 && (r += 1), t.push({
				src: e.dataUrl,
				alt: Ba(i.name).replaceAll("-", " "),
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
	function Ev(e, t, n) {
		t ? T(Y("status.imagesReadFailed", { n: t }), "error") : n ? T(Y("status.imagesLarge", { n }), "error") : T(e ? "" : Y("status.noImagesAdded"));
	}
	async function Dv(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		T(Y("status.compressingImages"));
		let { images: n, failed: r, big: i } = await Tv(t);
		n.length && un("gallery-add", (e) => {
			e.props.images.push(...n);
		}), Ev(n.length, r, i);
	}
	async function Ov(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		T(Y("status.compressingImages"));
		let { images: n, failed: r, big: i } = await Tv(t);
		if (!n.length) {
			Ev(0, r, i);
			return;
		}
		let a = up("gallery");
		a.props.images = n, dp(a), Ev(n.length, r, i);
	}
	function kv(e, t) {
		un("gallery-move", (n) => {
			let r = e + t;
			r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
		});
	}
	function Av(e) {
		un("gallery-remove", (t) => {
			t.props.images.splice(e, 1);
		});
	}
	function jv(e, t, n) {
		un(`edit:${z(M).blockId}:img${e}-${t}`, (r) => {
			r.props.images[e][t] = n;
		});
	}
	function Mv(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/") && !i?.startsWith("data:audio/") && !i?.startsWith("data:video/")) return;
		let a = i.split(",", 2)[1], o = `media/${Ba(n || "image")}-${Va(a)}.${za(i)}`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function Nv(e, t) {
		Mv(e, "image", e.title, t);
		for (let n of e.colors ?? []) Mv(n, "image", `${e.title}-${n.name}`, t);
	}
	function Pv(e, t) {
		for (let n of e?.layers ?? []) {
			if (n.type === "image" && Mv(n.props, "src", "background", t), n.type === "slideshow") for (let e of n.props.images ?? []) Mv(e, "src", "background", t);
			n.type === "video" && (Mv(n.props, "src", "video", t), Mv(n.props, "poster", "plakat", t));
		}
	}
	function Fv(e, t) {
		if (e.type === "image" && Mv(e.props, "src", e.props.alt, t), e.type === "icon" && Mv(e.props, "image", "ikon", t), e.type === "gallery") for (let n of e.props.images ?? []) Mv(n, "src", n.alt || "gallery", t);
		e.type === "audio" && Mv(e.props, "src", e.props.title || "lyd", t), e.type === "video" && (Mv(e.props, "src", e.props.title || "video", t), Mv(e.props, "poster", "poster", t));
	}
	function Iv(e, t) {
		Pv(e.background, t);
		for (let n of e.blocks) Fv(n, t);
	}
	function Lv(e) {
		let t = [];
		e.meta?.og && Mv(e.meta.og, "image", "share", t);
		for (let n of e.sections) Iv(n, t);
		return t;
	}
	function Rv(e) {
		let t = [], n = e.nav?.logo;
		if (n?.type === "image" && Mv(n, "value", "logo", t), n?.type === "both" && Mv(n, "image", "logo", t), e.nav?.style && Mv(e.nav.style, "image", "menu", t), Pv(e.nav?.style?.background, t), Pv(e.footer?.background, t), e.footer?.brand && Mv(e.footer.brand, "logo", "footer-logo", t), e.nav?.launcher) {
			Mv(e.nav.launcher, "image", "snarvei", t);
			for (let n of e.nav.launcher.links ?? []) Mv(n, "image", "snarvei", t);
		}
		return Mv(e.site, "icon", "ikon", t), t;
	}
	let zv = /* @__PURE__ */ A(!1), Bv = /* @__PURE__ */ A(null);
	function Vv() {
		j(zv, !z(zv));
	}
	function Hv() {
		j(zv, !1);
		try {
			Uv(), T(Y("ui.discarded"), "info");
		} catch (e) {
			console.error("Urd: discard failed", e), T(String(e?.message ?? e), "error");
		}
	}
	bn(() => {
		if (!z(zv)) return;
		let e = (e) => {
			if (!z(Bv)?.contains(e.target)) {
				j(zv, !1);
				return;
			}
			e.target instanceof Element && e.target.closest(".discard-confirm") && (e.preventDefault(), e.stopPropagation(), Hv());
		}, t = (e) => {
			e.key === "Escape" && j(zv, !1);
		}, n = !1, r = (e) => {
			n = !!z(Bv)?.contains(e.target);
		}, i = () => {
			n = !1;
		}, a = () => {
			n || j(zv, !1);
		};
		return window.addEventListener("pointerdown", r, !0), window.addEventListener("pointerup", i, !0), window.addEventListener("click", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", a), () => {
			window.removeEventListener("pointerdown", r, !0), window.removeEventListener("pointerup", i, !0), window.removeEventListener("click", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", a);
		};
	});
	function Uv() {
		mt("discard");
		for (let e of z(O).pages) e.id !== z(w) && !at.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = D.reset();
		if (tt.reset(), tu && (tu.reset(), Cu()), tl) {
			tl.reset(), j(al, [...tl.data.samlinger ?? []], !0);
			for (let e of Object.keys(nl)) z(al).includes(e) ? nl[e].reset() : delete nl[e];
			Al();
		}
		if (gl) {
			gl.reset(), j(xl, [...gl.data.maler ?? []], !0);
			for (let e of Object.keys(_l)) z(xl).includes(e) ? _l[e].reset() : (localStorage.removeItem(`urd-draft-template-${e}`), localStorage.removeItem(`urd-draft-mal-${e}`), delete _l[e]);
			Cl();
		}
		rt(), j(_e, {
			snap: !0,
			...z(O).grid
		}, !0), lt(), j(ue, ""), it(), z(O).pages.some((e) => e.id === z(w)) ? nt?.sendPage(z(w), e) : Ya(z(O).pages[0].id);
	}
	async function Wv() {
		if (Da) {
			T(Y("status.revertReloadBeforePublish"), "error");
			return;
		}
		if (z(Fa)) {
			T(Y("update.publishBlocked"), "error");
			return;
		}
		T(Y("status.publishing"));
		let e = [], t = [], n = [], r = [];
		for (let i of z(O).pages) {
			let a = `urd-draft-${i.id}`, o = at.has(i.id) || !z(ce).pages.some((e) => e.id === i.id), s = null;
			if (i.id === z(w) && (D.hasDraft() || o)) s = D.data;
			else if (i.id !== z(w)) {
				let e = localStorage.getItem(a);
				if (e) try {
					s = Vs(JSON.parse(e), tt.data);
				} catch {}
			}
			if (!s && o && (s = Ja(i)), !s) continue;
			let c = JSON.parse(JSON.stringify(s));
			e.push(...Lv(c)), e.push({
				path: i.file,
				content: JSON.stringify(c, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (tt.hasDraft()) {
			let r = JSON.parse(JSON.stringify(z(O)));
			e.push(...Rv(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), e.push({
				path: "content/theme.css",
				content: cu(r.theme),
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(z(ce).theme, z(O).theme) || t.push(Y("publish.part.theme")), i(z(ce).nav, z(O).nav) || t.push(Y("publish.part.nav")), i(z(ce).footer, z(O).footer) || t.push(Y("publish.part.footer")), i(z(ce).pages, z(O).pages) || t.push(Y("publish.part.pages")), i(z(ce).grid, z(O).grid) || t.push(Y("publish.part.grid")), (z(ce).site.icon ?? null) !== (z(O).site.icon ?? null) && t.push(Y("publish.part.icon"));
			let { icon: a, ...o } = z(ce).site, { icon: s, ...c } = z(O).site;
			i(o, c) || t.push(Y("publish.part.siteInfo"));
		}
		let i = Object.entries(nl).filter(([, e]) => e.hasDraft());
		if (i.length || tl?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) Nv(t, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), Pc.includes(i.kind) && e.push({
					path: `content/samlinger/${t}.xml`,
					content: Fc({
						title: i.name ?? t,
						origin: location.origin,
						path: `/content/samlinger/${t}.xml`,
						items: i.entries.map((e) => ({
							id: e.id,
							title: Pl(e.title),
							text: Pl(e.text),
							date: e.date,
							href: e.href
						}))
					}),
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (tl?.hasDraft()) {
				e.push({
					path: "content/collections.json",
					content: JSON.stringify(tl.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-collections", "urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/collections.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!z(al).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push(Y("publish.part.collections"));
		}
		let a = Object.entries(_l).filter(([, e]) => e.hasDraft());
		if (a.length || gl?.hasDraft()) {
			for (let [t, r] of a) {
				let i = JSON.parse(JSON.stringify(r.data));
				i.section && Iv(i.section, e);
				for (let t of i.blocks ?? []) Fv(t, e);
				for (let t of i.page?.sections ?? []) Iv(t, e);
				e.push({
					path: `content/maler/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-mal-${t}`);
			}
			if (gl?.hasDraft()) {
				e.push({
					path: "content/maler.json",
					content: JSON.stringify(gl.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-templates", "urd-draft-maler");
				let t = { maler: [] };
				try {
					t = await (await fetch("/content/maler.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.maler ?? []) {
					let t = `content/maler/${n}.json`;
					!z(xl).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push(Y("publish.part.templates"));
		}
		tu?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(tu.data, null, 2) + "\n",
			encoding: "utf-8"
		}), n.push("urd-draft-plugins"), t.push(Y("publish.part.plugins")));
		try {
			let t = await (await fetch("/index.html")).text();
			for (let n of z(O).pages) n.path !== "/" && e.push({
				path: `${n.path.slice(1)}/index.html`,
				content: t,
				encoding: "utf-8"
			});
		} catch {}
		e.push({
			path: "sitemap.xml",
			content: Mc(z(O).pages, location.origin),
			encoding: "utf-8"
		}), e.push({
			path: "robots.txt",
			content: Nc(location.origin),
			encoding: "utf-8"
		});
		let o = new Set(e.map((e) => e.path)), s = (t) => {
			o.has(t) || e.push({
				path: t,
				delete: !0
			});
		};
		for (let e of z(ce).pages) {
			let t = z(O).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && s(`${e.path.slice(1)}/index.html`) : (s(e.file), e.path !== "/" && s(`${e.path.slice(1)}/index.html`));
		}
		let c = await va(e);
		if (!c.ok) {
			T(Y("status.publishAborted"), "error");
			return;
		}
		let l = {
			message: Y("publish.commitMessage", { titles: t.join(", ") || Y("publish.theSite") }),
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
			t ? ga = t : _a(), Lv(D.data), Rv(z(O));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) at.add(e);
			if (j(ce, JSON.parse(JSON.stringify(z(O))), !0), tt = na("urd-draft-site", () => z(ce), pe), rt(), tu) {
				let e = JSON.parse(JSON.stringify(tu.data));
				tu = na("urd-draft-plugins", () => e, pe), Cu();
			}
			if (tl) {
				for (let e of Object.values(nl)) for (let t of e.data.entries) Nv(t, []);
				let e = JSON.parse(JSON.stringify(tl.data));
				tl = na("urd-draft-collections", () => e, pe, "urd-draft-samlinger"), rl = {};
				for (let e of z(al)) {
					if (!nl[e]) continue;
					let t = JSON.parse(JSON.stringify(nl[e].data));
					rl[e] = t, nl[e] = na(`urd-draft-collection-${e}`, () => t, pe, `urd-draft-samling-${e}`);
				}
				Al();
			}
			if (gl) {
				for (let e of Object.values(_l)) {
					e.data?.section && Iv(e.data.section, []);
					for (let t of e.data?.blocks ?? []) Fv(t, []);
					for (let t of e.data?.page?.sections ?? []) Iv(t, []);
				}
				let e = JSON.parse(JSON.stringify(gl.data));
				gl = na("urd-draft-templates", () => e, pe, "urd-draft-maler"), vl = {};
				for (let e of z(xl)) {
					if (!_l[e]) continue;
					let t = JSON.parse(JSON.stringify(_l[e].data));
					vl[e] = t, _l[e] = na(`urd-draft-template-${e}`, () => t, pe, `urd-draft-mal-${e}`);
				}
				Cl();
			}
			j(_e, {
				snap: !0,
				...z(O).grid
			}, !0);
			let i = JSON.parse(JSON.stringify(D.data));
			D = na(`urd-draft-${z(w)}`, () => i, pe), at.has(z(w)) && me(`urd-draft-${z(w)}`, JSON.stringify(i)), lt(), T(Y("status.published"), "info"), ja(e);
		} else if (u?.status === 401) {
			let e = await u.json().catch(() => null);
			T(e?.code === "loginExpired" ? Y("status.loginExpired") : Y("status.loginRequired", { reason: Ji(e) ?? Y("status.unknownReason") }), "error"), await ha();
		} else u?.status === 403 ? T(Ji(await u.json().catch(() => null)) ?? Y("status.noPublishAccess"), "error") : u?.status === 409 ? T(Y("status.publishRace"), "error") : T(u ? Ji(await u.json().catch(() => null)) ?? Y("status.publishFailed") : Y("status.publishUnavailable"), "error");
	}
	Ct();
	var Gv = _v();
	Cr("keydown", tn, St), Cr("pointerdown", tn, xt);
	var Kv = P(Gv), qv = N(Kv), Jv = (e) => {
		var t = Fh(), n = N(t);
		G(n, () => C.pencil);
		var r = I(n);
		E(t), R((e, n) => {
			J(t, "title", e), U(r, ` ${n ?? ""}`);
		}, [() => Y("tip.backToEdit"), () => Y("ui.edit")]), B("click", t, qf), H(e, t);
	};
	W(qv, (e) => {
		z(ve) || e(Jv);
	});
	var Yv = I(qv, 2);
	let Xv;
	var Zv = N(Yv), Qv = N(Zv), $v = (e) => {
		var t = Kh(), n = P(t), r = F(n, !0), i = I(n, 2), a = N(i), o = (e) => {
			var t = Rh(), n = N(t);
			let r;
			var i = N(n);
			G(i, () => C[`device_${z(ke)}`]), G(I(i), () => C.caret), E(n);
			var a = I(n, 2), o = (e) => {
				var t = Lh();
				Jr(t, 21, () => z(Ee), (e) => e.id, (e, t) => {
					var n = Ih();
					let r;
					var i = N(n);
					G(i, () => C[`device_${z(t).id}`]);
					var a = I(i);
					E(n), R((e, i) => {
						r = gi(n, 1, "ghost svelte-1n46o8q", null, r, { active: z(ke) === z(t).id }), J(n, "title", e), U(a, ` ${i ?? ""}`);
					}, [() => De(z(t)), () => Y(`lbl.device.${z(t).id}`)]), B("click", n, () => {
						j(ke, z(t).id, !0), j(so, null);
					}), H(e, n);
				}), E(t), H(e, t);
			};
			W(a, (e) => {
				z(so) === "device" && e(o);
			}), E(t), R((e) => {
				r = gi(n, 1, "ghost svelte-1n46o8q", null, r, { active: z(so) === "device" }), J(n, "title", e);
			}, [() => Y("lbl.group.device")]), B("click", n, () => j(so, z(so) === "device" ? null : "device", !0)), H(e, t);
		}, s = (e) => {
			var t = Bh(), n = P(t), r = F(n, !0), i = I(n, 2);
			Jr(i, 21, () => z(Ee), (e) => e.id, (e, t) => {
				var n = zh();
				let r;
				G(n, () => C[`device_${z(t).id}`], !0), E(n), R((e) => {
					r = gi(n, 1, "ghost svelte-1n46o8q", null, r, { active: z(ke) === z(t).id }), J(n, "title", e);
				}, [() => De(z(t))]), B("click", n, () => j(ke, z(t).id, !0)), H(e, n);
			}), E(i), R((e) => U(r, e), [() => Y("lbl.group.device")]), H(e, t);
		};
		W(a, (e) => {
			lo.device ? e(o) : e(s, -1);
		});
		var c = I(a, 2), l = (e) => {
			var t = Hh(), n = N(t);
			let r;
			var i = N(n), a = F(i);
			G(I(i), () => C.caret), E(n);
			var o = I(n, 2), s = (e) => {
				var t = Vh(), n = N(t), r = N(n);
				G(r, () => C.minus, !0), E(r);
				var i = I(r, 2), a = F(i), o = I(i, 2);
				G(o, () => C.plus, !0), E(o), E(n);
				var s = I(n, 2);
				let c;
				var l = N(s);
				G(l, () => C.fit);
				var u = I(l);
				E(s), E(t), R((e, t, n, l, d, f) => {
					J(r, "title", e), J(i, "title", t), U(a, `${n ?? ""}%`), J(o, "title", l), c = gi(s, 1, "ghost svelte-1n46o8q", null, c, { active: z(Fe) === "fit" }), J(s, "title", d), U(u, ` ${f ?? ""}`);
				}, [
					() => Y("tip.zoomOut"),
					() => Y("tip.zoomCurrent"),
					() => Math.round(z(Be) * 100),
					() => Y("tip.zoomIn"),
					() => Y("tip.zoomFit"),
					() => Y("lbl.zoom.fit")
				]), B("click", r, () => Ve(-1)), B("click", o, () => Ve(1)), B("click", s, () => j(Fe, "fit")), H(e, t);
			};
			W(o, (e) => {
				z(so) === "zoom" && e(s);
			}), E(t), R((e, t) => {
				r = gi(n, 1, "ghost svelte-1n46o8q", null, r, { active: z(so) === "zoom" }), J(n, "title", e), U(a, `${t ?? ""}%`);
			}, [() => Y("lbl.group.zoom"), () => Math.round(z(Be) * 100)]), B("click", n, () => j(so, z(so) === "zoom" ? null : "zoom", !0)), H(e, t);
		}, u = (e) => {
			var t = Uh(), n = P(t), r = F(n, !0), i = I(n, 2), a = N(i);
			G(a, () => C.minus, !0), E(a);
			var o = I(a, 2), s = F(o), c = I(o, 2);
			G(c, () => C.plus, !0), E(c);
			var l = I(c, 2);
			let u;
			G(l, () => C.fit, !0), E(l), E(i), R((e, t, n, i, d, f) => {
				U(r, e), J(a, "title", t), J(o, "title", n), U(s, `${i ?? ""}%`), J(c, "title", d), u = gi(l, 1, "ghost svelte-1n46o8q", null, u, { active: z(Fe) === "fit" }), J(l, "title", f);
			}, [
				() => Y("lbl.group.zoom"),
				() => Y("tip.zoomOut"),
				() => Y("tip.zoomCurrent"),
				() => Math.round(z(Be) * 100),
				() => Y("tip.zoomIn"),
				() => Y("tip.zoomFit")
			]), B("click", a, () => Ve(-1)), B("click", c, () => Ve(1)), B("click", l, () => j(Fe, "fit")), H(e, t);
		};
		W(c, (e) => {
			lo.zoom ? e(l) : e(u, -1);
		});
		var d = I(c, 2), f = (e) => {
			var t = Rh(), n = N(t);
			let r;
			var i = N(n);
			G(i, () => C.gridToggle), G(I(i), () => C.caret), E(n);
			var a = I(n, 2), o = (e) => {
				var t = Wh(), n = N(t);
				let r;
				var i = N(n);
				G(i, () => C.gridToggle);
				var a = I(i);
				E(n);
				var o = I(n, 2);
				let s;
				var c = N(o);
				G(c, () => C.guides);
				var l = I(c);
				E(o), E(t), R((e, t, i, c) => {
					r = gi(n, 1, "ghost svelte-1n46o8q", null, r, { active: z(fo) }), J(n, "title", e), U(a, ` ${t ?? ""}`), s = gi(o, 1, "ghost svelte-1n46o8q", null, s, { active: z(Qa) }), J(o, "title", i), U(l, ` ${c ?? ""}`);
				}, [
					() => Y("tip.gridToggle"),
					() => Y("lbl.view.grid"),
					() => Y("tip.guides"),
					() => Y("lbl.view.guides")
				]), B("click", n, po), B("click", o, uo), H(e, t);
			};
			W(a, (e) => {
				z(so) === "view" && e(o);
			}), E(t), R((e) => {
				r = gi(n, 1, "ghost svelte-1n46o8q", null, r, { active: z(so) === "view" || z(fo) || z(Qa) }), J(n, "title", e);
			}, [() => Y("lbl.group.view")]), B("click", n, () => j(so, z(so) === "view" ? null : "view", !0)), H(e, t);
		}, p = (e) => {
			var t = Gh(), n = P(t), r = F(n, !0), i = I(n, 2), a = N(i);
			let o;
			G(a, () => C.gridToggle, !0), E(a);
			var s = I(a, 2);
			let c;
			G(s, () => C.guides, !0), E(s), E(i), R((e, t, n) => {
				U(r, e), o = gi(a, 1, "ghost svelte-1n46o8q", null, o, { active: z(fo) }), J(a, "title", t), c = gi(s, 1, "ghost svelte-1n46o8q", null, c, { active: z(Qa) }), J(s, "title", n);
			}, [
				() => Y("lbl.group.view"),
				() => Y("tip.gridToggle"),
				() => Y("tip.guides")
			]), B("click", a, po), B("click", s, uo), H(e, t);
		};
		W(d, (e) => {
			lo.view ? e(f) : e(p, -1);
		}), E(i), ji(i, (e) => j(co, e), () => z(co)), R((e, t) => {
			J(n, "title", e), U(r, t);
		}, [() => Y("tip.switchPage"), () => ct()?.title ?? ""]), B("click", n, () => Zt("pages")), H(e, t);
	};
	W(Qv, (e) => {
		z(ce) && e($v);
	});
	var ey = I(Qv, 2), ty = (e) => {
		var t = qh(), n = N(t);
		G(n, () => C.phone);
		var r = I(n, 2), i = F(r, !0), a = F(I(r, 2), !0);
		E(t), R((e, n) => {
			J(t, "title", e), U(i, n), U(a, z(qe));
		}, [() => Y("tip.attention"), () => Y(z(qe) === 1 ? "ui.attentionOne" : "ui.attentionMany", { n: z(qe) })]), B("click", t, Ye), H(e, t);
	};
	W(ey, (e) => {
		z(qe) > 0 && e(ty);
	}), E(Zv);
	var ny = I(Zv, 2), ry = N(ny), iy = (e) => {
		var t = Yh(), n = N(t), r = F(N(n), !0);
		Oe(2), E(n);
		var i = I(n, 2), a = N(i);
		let o;
		var s = N(a);
		G(s, () => C.restore);
		var c = F(I(s), !0);
		E(a);
		var l = I(a, 2), u = (e) => {
			var t = Jh(), n = N(t);
			G(n, () => C.restore);
			var r = I(n);
			E(t), R((e, n) => {
				J(t, "title", e), U(r, ` ${n ?? ""}`);
			}, [() => Y("tip.discardArmed"), () => Y("ui.discardConfirm")]), B("click", t, Hv), H(e, t);
		};
		W(l, (e) => {
			z(zv) && e(u);
		}), E(i), ji(i, (e) => j(Bv, e), () => z(Bv)), E(t), R((e, t, i, s, l) => {
			J(n, "title", e), J(n, "aria-label", t), U(r, i), o = gi(a, 1, "discard-dot svelte-1n46o8q", null, o, { armed: z(zv) }), J(a, "title", s), U(c, l);
		}, [
			() => Y("ui.unpublished"),
			() => Y("ui.unpublished"),
			() => Y("ui.unpublished"),
			() => z(zv) ? Y("tip.discardArmed") : Y("tip.discard"),
			() => Y("ui.discard")
		]), B("click", a, Vv), li(2, t, () => ta, () => ({
			x: 24,
			duration: on ? 0 : 150
		})), H(e, t);
	};
	W(ry, (e) => {
		z(le) && e(iy);
	}), E(ny);
	var ay = I(ny, 2), oy = N(ay), sy = (e) => {
		var t = $h(), n = P(t), r = N(n), i = (e) => {
			var t = Xh(), n = P(t);
			G(n, () => C.eye);
			var r = F(I(n, 2), !0);
			R((e) => U(r, e), [() => Y("ui.cleanView")]), H(e, t);
		}, a = (e) => {
			var t = Xh(), n = P(t);
			G(n, () => C.pencil);
			var r = F(I(n, 2), !0);
			R((e) => U(r, e), [() => Y("ui.edit")]), H(e, t);
		};
		W(r, (e) => {
			z(ve) ? e(i) : e(a, -1);
		}), E(n);
		var o = I(n, 2), s = (e) => {
			var t = Zh(), n = N(t), r = (e) => {
				var t = Nr();
				G(P(t), () => C.warn), H(e, t);
			};
			W(n, (e) => {
				z(ge).allowed || e(r);
			});
			var i = I(n, 1, !0);
			E(t), R((e) => {
				J(t, "title", e), U(i, z(ge).login);
			}, [() => z(ge).allowed ? Y("tip.hasPublishAccess") : Y("tip.noPublishAccess")]), H(e, t);
		}, c = (e) => {
			var t = Qh(), n = F(t, !0);
			R((e) => U(n, e), [() => Y("ui.loginGitHub")]), H(e, t);
		};
		W(o, (e) => {
			z(ge)?.loggedIn ? e(s) : z(ge) && e(c, 1);
		});
		var l = I(o, 2), u = N(l);
		G(u, () => C.external);
		var d = F(I(u, 2), !0);
		E(l);
		var f = I(l, 2), p = F(f, !0);
		R((e, t, r, i, a) => {
			J(n, "title", e), J(l, "href", t), J(l, "title", r), U(d, i), f.disabled = !z(le), U(p, a);
		}, [
			() => z(ve) ? Y("tip.chromeHide") : Y("tip.chromeShow"),
			() => ct()?.path ?? "/",
			() => Y("ui.viewSite"),
			() => Y("ui.viewSite"),
			() => Y("ui.publish")
		]), B("click", n, qf), B("click", f, Wv), H(e, t);
	};
	W(oy, (e) => {
		z(ce) && e(sy);
	}), E(ay), E(Yv);
	var cy = I(Yv, 2), ly = (e) => {
		var t = uv(), n = N(t);
		let r;
		var i = N(n);
		Jr(i, 17, () => Bt, Wr, (e, t, n) => {
			var r = tg(), i = P(r), a = F(i, !0);
			Jr(I(i, 2), 16, () => z(t), (e) => e, (e, t) => {
				var n = eg();
				let r;
				var i = F(n, !0);
				R(() => {
					r = gi(n, 1, "svelte-1n46o8q", null, r, { active: z(zt) === t }), U(i, Ht[t]);
				}), B("click", n, () => Zt(t)), H(e, n);
			}), R((e) => U(a, e), [() => Y(Vt[n])]), H(e, r);
		});
		var s = I(i, 2), l = I(N(s), 2);
		let p;
		G(l, () => C.gear, !0), E(l);
		var _ = I(l, 2), v = (e) => {
			var t = ig(), n = N(t), r = F(n, !0), i = I(n, 2), a = N(i);
			X(I(a), {
				get value() {
					return z(ae);
				},
				get options() {
					return re;
				},
				onchange: (e) => j(ae, e, !0)
			}), E(i);
			var o = I(i, 2), s = N(o), c = I(s);
			{
				let e = /* @__PURE__ */ k(() => [["auto", Y("lang.auto")], ...qt()]);
				X(c, {
					get value() {
						return Yt;
					},
					get options() {
						return z(e);
					},
					onchange: Xt
				});
			}
			E(o);
			var l = I(o, 2), u = N(l), d = I(u);
			{
				let e = /* @__PURE__ */ k(() => [["strip", Y("settings.layoutPickerStrip")], ["menu", Y("settings.layoutPickerMenu")]]);
				X(d, {
					get value() {
						return z(ro);
					},
					get options() {
						return z(e);
					},
					onchange: io
				});
			}
			E(l);
			var f = I(l, 2), p = N(f), m = I(p);
			{
				let e = /* @__PURE__ */ k(() => [["remember", Y("settings.panelsRemember")], ["reset", Y("settings.panelsReset")]]);
				X(m, {
					get value() {
						return z(Lt);
					},
					get options() {
						return z(e);
					},
					onchange: Rt
				});
			}
			E(f);
			var h = I(f, 2), g = F(h, !0), _ = I(h, 2), v = N(_);
			let y;
			var b = F(v, !0), x = I(v, 2);
			let S;
			var ee = F(x, !0);
			E(_);
			var te = I(_, 2), ne = (e) => {
				var t = ng(), n = N(t), r = F(n, !0), i = I(n, 2);
				K(i);
				var a = I(i, 2), o = F(a, !0), s = I(a, 2);
				K(s), E(t), R((e, t, n, a) => {
					U(r, e), J(i, "min", 640), J(i, "max", Lo), J(i, "title", t), q(i, z(Se).width), U(o, n), J(s, "max", Ro), J(s, "title", a), q(s, z(Se).height || "");
				}, [
					() => Y("lbl.screen.w"),
					() => Y("tip.screen.width", {
						min: 640,
						max: Lo
					}),
					() => Y("lbl.screen.h"),
					() => Y("tip.screen.height", {
						min: 480,
						max: Ro
					})
				]), B("change", i, (e) => {
					Ce({ width: Number(e.target.value) }), e.target.value = z(Se).width;
				}), B("change", s, (e) => {
					Ce({ height: Number(e.target.value) }), e.target.value = z(Se).height || "";
				}), H(e, t);
			};
			W(te, (e) => {
				z(Se).mode === "custom" && e(ne);
			});
			var C = I(te, 2), ie = (e) => {
				var t = rg(), n = P(t), r = F(n, !0), i = I(n, 2), a = N(i), o = I(a);
				K(o), E(i), R((e, t, s, c, l) => {
					J(n, "title", e), U(r, t), J(i, "title", s), U(a, `${c ?? ""} `), J(o, "placeholder", l), q(o, z(O).analytics?.token ?? "");
				}, [
					() => Y("tip.analytics"),
					() => Y("settings.analytics"),
					() => Y("tip.analytics"),
					() => Y("lbl.analyticsToken"),
					() => Y("ph.analyticsToken")
				]), B("change", o, (e) => js(e.target.value)), H(e, t);
			};
			W(C, (e) => {
				z(O) && e(ie);
			}), E(t), R((e, t, n, c, d, m, te, ne, C, re, ie, ae, oe, se) => {
				U(r, e), J(i, "title", t), U(a, `${n ?? ""} `), J(o, "title", c), U(s, `${d ?? ""} `), J(l, "title", m), U(u, `${te ?? ""} `), J(f, "title", ne), U(p, `${C ?? ""} `), J(h, "title", re), U(g, ie), J(_, "title", ae), y = gi(v, 1, "svelte-1n46o8q", null, y, { on: z(Se).mode === "own" }), U(b, oe), S = gi(x, 1, "svelte-1n46o8q", null, S, { on: z(Se).mode === "custom" }), U(ee, se);
			}, [
				() => Y("settings.title"),
				() => Y("topbar.adminTheme.title"),
				() => Y("settings.theme"),
				() => Y("topbar.language.title"),
				() => Y("settings.language"),
				() => Y("tip.settings.layoutPicker"),
				() => Y("settings.layoutPicker"),
				() => Y("tip.settings.panels"),
				() => Y("settings.panels"),
				() => Y("tip.screen.mode"),
				() => Y("settings.screen"),
				() => Y("tip.screen.mode"),
				() => Y("lbl.screen.own"),
				() => Y("lbl.screen.size")
			]), B("click", v, () => Ce({ mode: "own" })), B("click", x, () => Ce({ mode: "custom" })), H(e, t);
		};
		W(_, (e) => {
			z($a) && e(v);
		}), E(s), ji(s, (e) => j(ao, e), () => z(ao)), E(n);
		var y = I(n, 2), b = (e) => {
			var t = lv();
			let n;
			var r = N(t), i = N(r), s = F(i, !0), l = I(i, 2), p = (e) => {
				var t = wm();
				let n;
				G(t, () => C.foldToggle, !0), E(t), R((e, r) => {
					n = gi(t, 1, "fold-all fold-toggle svelte-1n46o8q", null, n, { collapse: z(hf) }), J(t, "title", e), J(t, "aria-label", r);
				}, [() => Y(z(hf) ? "ui.collapseAll" : "ui.expandAll"), () => Y(z(hf) ? "ui.collapseAll" : "ui.expandAll")]), B("click", t, vf), H(e, t);
			};
			W(l, (e) => {
				z(mf) && e(p);
			}), E(r);
			var _ = I(r, 2), v = (e) => {
				var t = hg(), n = N(t);
				Jr(n, 17, () => z(O).pages, (e) => e.id, (e, t) => {
					var n = ug();
					let r;
					var i = N(n);
					K(i);
					var a = I(i, 2), o = (e) => {
						var t = ag();
						R((e) => J(t, "title", e), [() => Y("tip.pages.homeLocked")]), H(e, t);
					}, s = (e) => {
						var n = og();
						K(n), R((e, t) => {
							q(n, e), J(n, "title", t);
						}, [() => z(t).path.slice(1), () => Y("tip.pages.slug")]), B("change", n, (e) => ps(z(t), e.target.value)), H(e, n);
					};
					W(a, (e) => {
						z(t).path === "/" ? e(o) : e(s, -1);
					});
					var c = I(a, 2), l = (e) => {
						var t = sg();
						G(t, () => C.warn, !0), E(t), R((e) => J(t, "title", e), [() => Y("tip.pages.missingDescription")]), H(e, t);
					};
					W(c, (e) => {
						z(No)[z(t).id] && e(l);
					});
					var u = I(c, 2), d = N(u);
					G(d, () => C.right, !0), E(d);
					var f = I(d, 2), p = N(f);
					G(p, () => C.kebab, !0), E(p);
					var m = I(p, 2), h = (e) => {
						var n = lg(), r = N(n), i = N(r);
						G(i, () => C.bookmark);
						var a = I(i);
						E(r);
						var o = I(r, 2), s = (e) => {
							var n = cg(), r = N(n);
							G(r, () => C.cross);
							var i = I(r);
							E(n), R((e, t) => {
								J(n, "title", e), U(i, ` ${t ?? ""}`);
							}, [() => Y("tip.pages.delete"), () => Y("ui.deletePage")]), B("click", n, () => {
								j(xo, null), vs(z(t));
							}), H(e, n);
						};
						W(o, (e) => {
							z(t).path !== "/" && e(s);
						}), E(n), R((e) => U(a, ` ${e ?? ""}`), [() => Y("ui.savePageTemplate")]), B("click", r, () => To(z(t))), H(e, n);
					};
					W(m, (e) => {
						z(xo) === z(t).id && e(h);
					}), E(f), E(u), E(n), R((e, a, o) => {
						r = gi(n, 1, "page-row svelte-1n46o8q", null, r, { current: z(t).id === z(w) }), q(i, z(t).title), J(i, "title", e), J(d, "title", a), d.disabled = z(t).id === z(w), J(p, "title", o);
					}, [
						() => Y("tip.pages.title"),
						() => Y("tip.pages.open"),
						() => Y("tip.pages.menu")
					]), B("change", i, (e) => Eo(z(t), e.target.value)), B("click", d, () => Ya(z(t).id)), B("click", p, () => j(xo, z(xo) === z(t).id ? null : z(t).id, !0)), H(e, n);
				});
				var r = I(n, 2), i = N(r), a = F(i, !0), o = I(i, 2), s = N(o), c = N(s), l = I(c);
				st(l), E(s);
				var u = I(s, 2), d = N(u), f = I(d);
				K(f), E(u);
				var p = I(u, 2), m = N(p), h = I(m);
				st(h), E(p);
				var g = I(p, 2), _ = N(g), v = I(_), y = (e) => {
					var t = dg();
					R((e) => {
						J(t, "src", z(Do).ogImage), J(t, "alt", e);
					}, [() => Y("lbl.ogImage")]), H(e, t);
				};
				W(v, (e) => {
					z(Do).ogImage && e(y);
				}), E(g);
				var b = I(g, 2), x = N(b), S = N(x), ee = I(S);
				E(x);
				var te = I(x, 2), ne = (e) => {
					var t = wp();
					G(t, () => C.cross, !0), E(t), R((e) => J(t, "title", e), [() => Y("tip.seo.removeOgImage")]), B("click", t, () => ko("ogImage", "")), H(e, t);
				};
				W(te, (e) => {
					z(Do).ogImage && e(ne);
				}), E(b);
				var re = I(b, 2), ie = N(re);
				K(ie);
				var ae = I(ie);
				E(re), E(o), E(r);
				var oe = I(r, 4);
				K(oe);
				var se = I(oe, 2), ce = F(se, !0), le = I(se, 2), ue = F(le, !0), de = I(le, 2), fe = N(de);
				let T;
				var pe = N(fe), me = N(pe);
				G(me, () => Zl({ sections: [] }), !0), E(me);
				var he = F(I(me, 2), !0);
				E(pe), E(fe), Jr(I(fe, 2), 17, () => $l, (e) => e.id, (e, t) => {
					var n = fg();
					let r;
					var i = N(n), a = N(i);
					G(a, () => yo[z(t).id], !0), E(a);
					var o = F(I(a, 2), !0);
					E(i), E(n), R((e, a) => {
						r = gi(n, 1, "page-template-card svelte-1n46o8q", null, r, { picked: z(vo) === `preset:${z(t).id}` }), J(i, "title", e), U(o, a);
					}, [() => Y("tip.pages.templatePick", { name: Y(z(t).labelKey) }), () => Y(z(t).labelKey)]), B("click", i, () => j(vo, z(vo) === `preset:${z(t).id}` ? null : `preset:${z(t).id}`, !0)), H(e, n);
				}), E(de);
				var ge = I(de, 2), _e = (e) => {
					var t = mg(), n = P(t), r = F(n, !0), i = I(n, 2);
					Jr(i, 20, () => z(xl).filter((e) => _l[e]?.data?.mal?.kind === "page"), (e) => e, (e, t) => {
						var n = pg();
						let r;
						var i = N(n), a = N(i);
						G(a, () => Zl(_l[t].data.page), !0), E(a);
						var o = F(I(a, 2), !0);
						E(i);
						var s = I(i, 2);
						G(s, () => C.cross, !0), E(s), E(n), R((e, a) => {
							r = gi(n, 1, "page-template-card svelte-1n46o8q", null, r, { picked: z(vo) === t }), J(i, "title", e), U(o, _l[t].data.mal.name), J(s, "title", a);
						}, [() => Y("tip.pages.templatePick", { name: _l[t].data.mal.name }), () => Y("canvas.deleteTemplate")]), B("click", i, () => j(vo, z(vo) === t ? null : t, !0)), B("click", s, () => Ol({ id: t })), H(e, n);
					}), E(i), R((e) => {
						U(r, e), vi(i, z(bo));
					}, [() => Y("canvas.tabMyTemplates")]), H(e, t);
				}, ve = /* @__PURE__ */ k(() => z(xl).some((e) => _l[e]?.data?.mal?.kind === "page"));
				W(ge, (e) => {
					z(ve) && e(_e);
				}), E(t), R((e, t, n, r, i, o, v, y, b, ee, te, ne, C, w, le, me, ge, _e, ve, ye, be, xe) => {
					U(a, e), J(s, "title", t), U(c, `${n ?? ""} `), q(l, z(Do).description), J(u, "title", r), U(d, `${i ?? ""} `), q(f, z(Do).ogTitle), J(f, "placeholder", o), J(p, "title", v), U(m, `${y ?? ""} `), q(h, z(Do).ogDescription), J(h, "placeholder", z(Do).description), J(g, "title", b), U(_, `${ee ?? ""} `), J(x, "title", te), U(S, `${ne ?? ""} `), J(re, "title", C), Ci(ie, w), U(ae, ` ${le ?? ""}`), J(oe, "placeholder", me), J(se, "title", ge), se.disabled = _e, U(ce, ve), U(ue, ye), vi(de, z(bo)), T = gi(fe, 1, "page-template-card svelte-1n46o8q", null, T, { picked: z(vo) === null }), J(pe, "title", be), U(he, xe);
				}, [
					() => Y("ui.seoGroup", { page: z(O).pages.find((e) => e.id === z(w))?.title ?? "" }),
					() => Y("tip.seo.description"),
					() => Y("lbl.seoDescription"),
					() => Y("tip.seo.ogTitle"),
					() => Y("lbl.ogTitle"),
					() => z(O).pages.find((e) => e.id === z(w))?.title ?? "",
					() => Y("tip.seo.ogDescription"),
					() => Y("lbl.ogDescription"),
					() => Y("tip.seo.ogImage"),
					() => Y("lbl.ogImage"),
					() => Y("tip.seo.ogImage"),
					() => z(Do).ogImage ? Y("ui.changeImage") : Y("ui.chooseImage"),
					() => Y("tip.seo.hideFromSearch"),
					() => z(O).pages.find((e) => e.id === z(w))?.noindex === !0,
					() => Y("lbl.hideFromSearch"),
					() => Y("ph.newPageName"),
					() => Y("hint.pages.autoMenu"),
					() => !z(_o).trim(),
					() => Y("ui.createPage"),
					() => Y("canvas.tabPresets"),
					() => Y("tip.pages.blankPick"),
					() => Y("ui.blankPage")
				]), B("change", l, (e) => ko("description", e.target.value)), B("change", f, (e) => ko("ogTitle", e.target.value)), B("change", h, (e) => ko("ogDescription", e.target.value)), B("change", ee, Bo), B("change", ie, (e) => Ao(e.target.checked)), B("keydown", oe, (e) => e.key === "Enter" && wo()), Di(oe, () => z(_o), (e) => j(_o, e)), B("click", se, wo), B("click", pe, () => j(vo, null)), H(e, t);
			}, y = (e) => {
				var t = t_(), n = N(t), r = N(n), i = F(r, !0), o = I(r, 2), s = N(o);
				{
					let e = /* @__PURE__ */ k(() => Y("common.type")), t = /* @__PURE__ */ k(() => z(O).nav.logo?.type ?? "text"), n = /* @__PURE__ */ k(() => [
						["text", Y("blocks.text")],
						["image", Y("blocks.image")],
						["both", Y("opt.logo.both")]
					]);
					Es(s, {
						get label() {
							return z(e);
						},
						get value() {
							return z(t);
						},
						get options() {
							return z(n);
						},
						onchange: (e) => bs(e)
					});
				}
				var c = I(s, 2), l = (e) => {
					var t = gg(), n = P(t);
					K(n);
					var r = I(n, 2), i = N(r);
					{
						let e = /* @__PURE__ */ k(() => Y("tip.nav.logoFont")), t = /* @__PURE__ */ k(() => z(O).nav.logo?.font ?? ""), n = /* @__PURE__ */ k(() => [["", Y("common.inherit")], ...Ff.map(([e, t]) => [t, Y(e)])]);
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
							onchange: (e) => ys({ font: e || void 0 })
						});
					}
					var a = I(i, 2);
					K(a);
					var o = I(a, 2);
					let s;
					var c = F(N(o), !0);
					E(o);
					var l = I(o, 2);
					let u;
					var d = F(N(l), !0);
					E(l), E(r), R((e, t, r, i, f, p, m) => {
						q(n, z(O).nav.logo?.value ?? ""), J(n, "placeholder", e), J(a, "title", t), q(a, z(O).nav.logo?.textSize ?? ""), s = gi(o, 1, "tbtn svelte-1n46o8q", null, s, { active: z(O).nav.logo?.bold !== !1 }), J(o, "title", r), U(c, i), u = gi(l, 1, "tbtn svelte-1n46o8q", null, u, { active: f }), J(l, "title", p), U(d, m);
					}, [
						() => Y("ph.nav.logoName"),
						() => Y("tip.nav.textSize"),
						() => Y("format.bold"),
						() => Y("format.boldLetter"),
						() => !!z(O).nav.logo?.italic,
						() => Y("format.italic"),
						() => Y("format.italicLetter")
					]), B("input", n, (e) => ys({ value: e.target.value })), B("change", a, (e) => ys({ textSize: e.target.value ? Number(e.target.value) : void 0 })), B("click", o, () => ys({ bold: z(O).nav.logo?.bold === !1 })), B("click", l, () => ys({ italic: !z(O).nav.logo?.italic })), H(e, t);
				};
				W(c, (e) => {
					(z(O).nav.logo?.type ?? "text") !== "image" && e(l);
				});
				var p = I(c, 2), _ = (e) => {
					let t = /* @__PURE__ */ k(() => z(O).nav.logo?.type === "image" ? z(O).nav.logo?.value : z(O).nav.logo?.image);
					var n = yg(), r = P(n), i = N(r), a = N(i), o = (e) => {
						var n = _g();
						R(() => J(n, "src", z(t))), H(e, n);
					};
					W(a, (e) => {
						z(t) && e(o);
					}), E(i);
					var s = I(i, 2), c = N(s), l = N(c), u = I(l);
					E(c);
					var d = I(c, 2), f = (e) => {
						var n = vg(), r = F(n, !0);
						R((e) => U(r, e), [() => z(t).split("/").pop()]), H(e, n);
					};
					W(d, (e) => {
						z(t) && e(f);
					}), E(s), E(r);
					var p = I(r, 2), m = N(p), h = N(m), g = F(h, !0), _ = I(h, 2);
					K(_), E(m);
					var v = I(m, 2), y = N(v), b = F(y, !0), x = I(y, 2);
					K(x), E(v);
					var S = I(v, 2), ee = N(S), te = F(ee, !0), ne = I(ee, 2);
					K(ne), E(S), E(p), R((e, t, n, r, i, a, o, s, u) => {
						J(c, "title", e), U(l, `${t ?? ""} `), J(m, "title", n), U(g, r), q(_, z(O).nav.logo?.size ?? 32), J(v, "title", i), U(b, a), J(x, "min", ls.min), J(x, "max", ls.max), J(x, "placeholder", o), q(x, z(O).nav.logo?.mobileSize ?? ""), J(S, "title", s), U(te, u), q(ne, z(O).nav.logo?.radius ?? 0);
					}, [
						() => Y("tip.webpAuto"),
						() => z(t) ? Y("ui.changeImage") : Y("ui.chooseImage"),
						() => Y("tip.nav.logoHeight"),
						() => Y("lbl.height"),
						() => Y("tip.nav.logoHeightMobile"),
						() => Y("lbl.onMobile"),
						() => Y("lbl.navSameAsDesktop"),
						() => Y("tip.nav.logoRadius"),
						() => Y("lbl.rounding")
					]), B("change", u, xs), B("change", _, (e) => ys({ size: Number(e.target.value) })), B("change", x, (e) => {
						let t = e.target.value;
						ys({ mobileSize: t === "" ? void 0 : ms(t, ls, void 0) }), e.target.value = z(O).nav.logo?.mobileSize ?? "";
					}), B("change", ne, (e) => ys({ radius: Number(e.target.value) })), H(e, n);
				};
				W(p, (e) => {
					(z(O).nav.logo?.type ?? "text") !== "text" && e(_);
				});
				var v = I(p, 2), y = (e) => {
					{
						let t = /* @__PURE__ */ k(() => Y("lbl.order")), n = /* @__PURE__ */ k(() => z(O).nav.logo?.order ?? "image-first"), r = /* @__PURE__ */ k(() => [["image-first", Y("opt.logo.imageFirst")], ["text-first", Y("opt.logo.textFirst")]]);
						Es(e, {
							get label() {
								return z(t);
							},
							get value() {
								return z(n);
							},
							get options() {
								return z(r);
							},
							onchange: (e) => ys({ order: e })
						});
					}
				};
				W(v, (e) => {
					z(O).nav.logo?.type === "both" && e(y);
				}), E(o), E(n);
				var b = I(n, 2), x = N(b), te = F(x, !0), ne = I(x, 2), re = N(ne), ie = N(re), ae = F(ie, !0), oe = I(ie, 2), se = N(oe), ce = N(se), w = F(ce, !0), le = I(ce, 2);
				Jr(le, 21, () => [
					["bar", Y("opt.navVariant.bar")],
					["floating", Y("opt.navVariant.floating")],
					["floating-square", Y("opt.navVariant.floatingSquare")],
					["floating-tab", Y("opt.navVariant.floatingTab")],
					["side-left", Y("opt.navVariant.sideLeft")],
					["side-right", Y("opt.navVariant.sideRight")]
				], ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ k(() => h(z(t), 2));
					let r = () => z(n)[0], i = () => z(n)[1];
					var a = bg();
					let o;
					var s = N(a);
					G(s, () => u[r()]);
					var c = F(I(s), !0);
					E(a), R(() => {
						o = gi(a, 1, "tile svelte-1n46o8q", null, o, { on: (z(O).nav.variant ?? "bar") === r() }), J(a, "aria-pressed", (z(O).nav.variant ?? "bar") === r()), U(c, i());
					}), B("click", a, () => Zc(r())), H(e, a);
				}), E(le), E(se);
				var ue = I(se, 2), de = (e) => {
					var t = Sg(), n = P(t);
					{
						let e = /* @__PURE__ */ k(() => Y("lbl.navPillWidth")), t = /* @__PURE__ */ k(() => Y("tip.nav.pillWidth")), r = /* @__PURE__ */ k(() => z(O).nav.style?.pillWidth === "content" ? "content" : "custom"), i = /* @__PURE__ */ k(() => [["content", Y("opt.pillWidth.content")], ["custom", Y("opt.pillWidth.custom")]]);
						Es(n, {
							get label() {
								return z(e);
							},
							get title() {
								return z(t);
							},
							get value() {
								return z(r);
							},
							get options() {
								return z(i);
							},
							onchange: (e) => tc("pillWidth", e === "content" ? "content" : void 0)
						});
					}
					var r = I(n, 2), i = (e) => {
						var t = xg(), n = N(t), r = F(n, !0), i = I(n, 2);
						K(i), E(t), R((e, n) => {
							J(t, "title", e), U(r, n), J(i, "min", rs.min), J(i, "max", rs.max), J(i, "step", rs.step), q(i, typeof z(O).nav.style?.pillWidth == "number" ? z(O).nav.style.pillWidth : "");
						}, [() => Y("tip.nav.pillWidthPx"), () => Y("lbl.navPillWidthPx")]), B("change", i, (e) => cc(e, "pillWidth", rs)), H(e, t);
					};
					W(r, (e) => {
						z(O).nav.style?.pillWidth !== "content" && e(i);
					});
					var a = I(r, 2), o = N(a), s = F(o, !0), c = I(o, 2);
					K(c), E(a), R((e, t) => {
						J(a, "title", e), U(s, t), J(c, "min", ss.min), J(c, "max", ss.max), J(c, "step", ss.step), J(c, "placeholder", z(O).nav.variant === "floating-square" ? "0" : ""), q(c, typeof z(O).nav.style?.radius == "number" ? z(O).nav.style.radius : "");
					}, [() => Y("tip.nav.radius"), () => Y("lbl.navRadius")]), B("change", c, (e) => cc(e, "radius", ss)), H(e, t);
				};
				W(ue, (e) => {
					z(rc) && e(de);
				});
				var fe = I(ue, 2), T = (e) => {
					{
						let t = /* @__PURE__ */ k(() => Y("lbl.navPlacement")), n = /* @__PURE__ */ k(() => z(O).nav.style?.sidePlacement ?? "top"), r = /* @__PURE__ */ k(() => [
							["top", Y("opt.place.top")],
							["middle", Y("opt.place.middle")],
							["bottom", Y("opt.place.bottom")]
						]);
						Es(e, {
							get label() {
								return z(t);
							},
							get value() {
								return z(n);
							},
							get options() {
								return z(r);
							},
							onchange: (e) => tc("sidePlacement", e === "top" ? void 0 : e)
						});
					}
				}, pe = (e) => {
					{
						let t = /* @__PURE__ */ k(() => Y("lbl.navPlacement")), n = /* @__PURE__ */ k(() => Y("opt.layout.leftAfterLogo")), r = /* @__PURE__ */ k(() => z(O).nav.layout ?? "right"), i = /* @__PURE__ */ k(() => [
							["left", Y("common.left")],
							["center", Y("common.center")],
							["right", Y("common.right")]
						]);
						Es(e, {
							get label() {
								return z(t);
							},
							get title() {
								return z(n);
							},
							get value() {
								return z(r);
							},
							get options() {
								return z(i);
							},
							onchange: (e) => Xs(e)
						});
					}
				};
				W(fe, (e) => {
					z(nc) ? e(T) : e(pe, -1);
				});
				var me = I(fe, 2), he = (e) => {
					var t = Cg(), n = P(t), r = N(n);
					K(r);
					var i = I(r);
					E(n);
					var a = I(n, 2), o = N(a);
					K(o);
					var s = I(o);
					E(a), R((e, t, c, l) => {
						J(n, "title", e), Ci(r, z(O).nav.style?.glow === !0), U(i, ` ${t ?? ""}`), J(a, "title", c), Ci(o, z(O).nav.style?.topGap !== !1), U(s, ` ${l ?? ""}`);
					}, [
						() => Y("tip.nav.glow"),
						() => Y("lbl.navGlow"),
						() => Y("tip.nav.topGap"),
						() => Y("lbl.navTopGap")
					]), B("change", r, (e) => Qc(e.target.checked)), B("change", o, (e) => $c(e.target.checked)), H(e, t);
				};
				W(me, (e) => {
					z(rc) && e(he);
				});
				var ge = I(me, 2), _e = (e) => {
					var t = Cg(), n = P(t), r = N(n);
					K(r);
					var i = I(r);
					E(n);
					var a = I(n, 2), o = N(a);
					K(o);
					var s = I(o);
					E(a), R((e, t, c, l) => {
						J(n, "title", e), Ci(r, z(O).nav.overlay === !0), U(i, ` ${t ?? ""}`), J(a, "title", c), Ci(o, z(O).nav.style?.inset !== !1), U(s, ` ${l ?? ""}`);
					}, [
						() => Y("tip.nav.overlay"),
						() => Y("lbl.navOverlay"),
						() => Y("tip.nav.inset"),
						() => Y("lbl.navInset")
					]), B("change", r, (e) => ho("nav", () => {
						e.target.checked ? z(O).nav.overlay = !0 : delete z(O).nav.overlay;
					})), B("change", o, (e) => tc("inset", e.target.checked ? void 0 : !1)), H(e, t);
				};
				W(ge, (e) => {
					!z(rc) && !z(nc) && e(_e);
				});
				var ve = I(ge, 2), ye = (e) => {
					var t = wg(), n = P(t);
					{
						let e = /* @__PURE__ */ k(() => Y("lbl.textAlign")), t = /* @__PURE__ */ k(() => Y("tip.nav.sideAlign")), r = /* @__PURE__ */ k(() => z(O).nav.style?.sideAlign ?? "left"), i = /* @__PURE__ */ k(() => [
							["left", Y("common.left")],
							["center", Y("common.center")],
							["right", Y("common.right")]
						]);
						Es(n, {
							get label() {
								return z(e);
							},
							get title() {
								return z(t);
							},
							get value() {
								return z(r);
							},
							get options() {
								return z(i);
							},
							onchange: (e) => tc("sideAlign", e === "left" ? void 0 : e)
						});
					}
					var r = I(n, 2), i = N(r), a = F(i, !0), o = I(i, 2);
					K(o), E(r), R((e, t) => {
						J(r, "title", e), U(a, t), J(o, "min", cs.min), J(o, "max", cs.max), q(o, z(O).nav.style?.width ?? 250);
					}, [() => Y("tip.nav.colWidth"), () => Y("lbl.navColWidth")]), B("change", o, (e) => {
						let t = ms(e.target.value, cs, 250);
						tc("width", t === 250 ? void 0 : t), e.target.value = z(O).nav.style?.width ?? 250;
					}), H(e, t);
				};
				W(ve, (e) => {
					z(nc) && e(ye);
				}), E(oe), E(re);
				var be = I(re, 4), xe = N(be), Se = F(xe, !0), Ce = I(xe, 2), we = N(Ce);
				Jr(we, 20, () => ds, (e) => e, (e, t) => {
					var n = eg();
					let r;
					var i = F(n, !0);
					R((e) => {
						r = gi(n, 1, "svelte-1n46o8q", null, r, { on: z(ic) === t }), U(i, e);
					}, [() => Y(`opt.size.${t}`)]), B("click", n, () => sc(t)), H(e, n);
				}), E(we);
				var Te = I(we, 2), Ee = N(Te), De = F(Ee, !0), ke = I(Ee, 2), Ae = N(ke), je = (e) => {
					var t = Tg(), n = N(t), r = F(n, !0), i = I(n, 2);
					K(i);
					var a = I(i, 2);
					K(a), E(t), R((e, n) => {
						J(t, "title", e), U(r, n), J(i, "min", $o.min), J(i, "max", $o.max), J(i, "step", $o.step), q(i, z(ac)), J(a, "min", $o.min), J(a, "max", $o.max), q(a, z(ac));
					}, [() => Y("tip.nav.thickness"), () => Y("lbl.navThickness")]), B("input", i, (e) => tc("padY", e.target.valueAsNumber)), B("change", a, (e) => kc(e, "padY", $o)), H(e, t);
				};
				W(Ae, (e) => {
					z(nc) || e(je);
				});
				var Me = I(Ae, 2), Ne = N(Me), Pe = F(Ne, !0), Fe = I(Ne, 2);
				K(Fe);
				var Ie = I(Fe, 2);
				K(Ie), E(Me);
				var Le = I(Me, 2), Re = (e) => {
					var t = Eg(), n = N(t), r = N(n), i = F(r, !0), a = I(r, 2);
					K(a), E(n);
					var o = I(n, 2), s = N(o), c = F(s, !0), l = I(s, 2);
					K(l), E(o), E(t), R((e, t, r, s, u, d) => {
						J(n, "title", e), U(i, t), J(a, "min", ts.min), J(a, "max", ts.max), J(a, "placeholder", r), q(a, z(O).nav.style?.padX ?? ""), J(o, "title", s), U(c, u), J(l, "min", ns.min), J(l, "max", ns.max), J(l, "placeholder", d), q(l, z(O).nav.style?.gap ?? "");
					}, [
						() => Y("tip.nav.padX"),
						() => Y("lbl.navPadX"),
						() => Y("common.auto"),
						() => Y("tip.nav.gap"),
						() => Y("lbl.navGap"),
						() => Y("common.auto")
					]), B("change", a, (e) => cc(e, "padX", ts)), B("change", l, (e) => cc(e, "gap", ns)), H(e, t);
				};
				W(Le, (e) => {
					z(nc) || e(Re);
				}), E(ke), E(Te), E(Ce), E(be);
				var ze = I(be, 4), Be = N(ze), Ve = F(Be, !0), He = I(Be, 2), Ue = N(He), We = (e) => {
					var t = Og(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2);
					Jr(a, 21, () => [
						["", Y("common.none")],
						["bottom", Y("opt.navBorder.bottom")],
						["top", Y("opt.navBorder.top")],
						["both", Y("opt.navBorder.both")],
						["all", Y("opt.navBorder.all")]
					], ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ k(() => h(z(t), 2));
						let r = () => z(n)[0], i = () => z(n)[1];
						var a = bg();
						let o;
						var s = N(a);
						G(s, () => d[r()]);
						var c = F(I(s), !0);
						E(a), R(() => {
							o = gi(a, 1, "tile svelte-1n46o8q", null, o, { on: (z(O).nav.style?.border?.side ?? "") === r() }), J(a, "aria-pressed", (z(O).nav.style?.border?.side ?? "") === r()), U(c, i());
						}), B("click", a, () => tc("border", r() ? {
							...z(O).nav.style?.border ?? {},
							side: r()
						} : void 0)), H(e, a);
					}), E(a), E(n);
					var o = I(n, 2), s = (e) => {
						var t = Dg(), n = N(t), r = F(n, !0), i = I(n, 2);
						K(i);
						var a = I(i, 2), o = F(a, !0), s = I(a, 2);
						{
							let e = /* @__PURE__ */ k(() => z(O).nav.style.border.color ?? "text"), t = /* @__PURE__ */ k(Ri), n = /* @__PURE__ */ k(() => Y("tip.nav.borderColorPick"));
							ba(s, {
								get value() {
									return z(e);
								},
								get tokens() {
									return z(t);
								},
								get label() {
									return z(n);
								},
								onchange: (e) => tc("border", {
									...z(O).nav.style.border,
									color: e
								})
							});
						}
						E(t), R((e, t, s, c, l) => {
							J(n, "title", e), U(r, t), J(i, "title", s), q(i, z(O).nav.style.border.width ?? 1), J(a, "title", c), U(o, l);
						}, [
							() => Y("tip.nav.borderWidth"),
							() => Y("lbl.navBorderWidth"),
							() => Y("tip.nav.borderWidth"),
							() => Y("tip.nav.borderColorPick"),
							() => Y("lbl.navBorderColor")
						]), B("change", i, (e) => {
							let t = ms(e.target.value, {
								min: 1,
								max: 8
							}, 1), n = { ...z(O).nav.style.border };
							t === 1 ? delete n.width : n.width = t, tc("border", n), e.target.value = z(O).nav.style.border.width ?? 1;
						}), H(e, t);
					};
					W(o, (e) => {
						z(O).nav.style?.border?.side && e(s);
					}), R((e, t, r) => {
						J(n, "title", e), U(i, t), J(a, "aria-label", r);
					}, [
						() => Y("tip.nav.border"),
						() => Y("lbl.navBorder"),
						() => Y("lbl.navBorder")
					]), H(e, t);
				};
				W(Ue, (e) => {
					z(nc) || e(We);
				});
				var Ge = I(Ue, 2), Ke = (e) => {
					{
						let t = /* @__PURE__ */ k(() => Y("lbl.navShadow")), n = /* @__PURE__ */ k(() => Y("tip.nav.shadow")), r = /* @__PURE__ */ k(() => z(O).nav.style?.shadow ?? ""), i = /* @__PURE__ */ k(() => [
							["", Y("common.none")],
							["soft", Y("opt.navShadow.soft")],
							["strong", Y("opt.navShadow.strong")]
						]);
						Es(e, {
							get label() {
								return z(t);
							},
							get title() {
								return z(n);
							},
							get value() {
								return z(r);
							},
							get options() {
								return z(i);
							},
							onchange: (e) => tc("shadow", e || void 0)
						});
					}
				};
				W(Ge, (e) => {
					!z(rc) && !z(nc) && e(Ke);
				}), E(He), E(ze);
				var qe = I(ze, 4), Je = N(qe), Ye = F(Je, !0), Xe = I(Je, 2), Ze = N(Xe), Qe = (e) => {
					var t = Ag(), n = N(t), r = F(n, !0), i = I(n, 2), a = N(i);
					K(a);
					var o = I(a);
					E(i);
					var s = I(i, 2), c = (e) => {
						var t = lm(), n = P(t);
						{
							let e = /* @__PURE__ */ k(() => Y("lbl.navScroll")), t = /* @__PURE__ */ k(() => Y("tip.nav.scroll")), r = /* @__PURE__ */ k(() => z(O).nav.scroll ?? "none"), i = /* @__PURE__ */ k(() => [
								["none", Y("opt.scroll.none")],
								["shrink", Y("opt.scroll.shrink")],
								["hide", Y("opt.scroll.hide")]
							]);
							Es(n, {
								get label() {
									return z(e);
								},
								get title() {
									return z(t);
								},
								get value() {
									return z(r);
								},
								get options() {
									return z(i);
								},
								onchange: (e) => ho("nav", () => {
									e === "none" ? delete z(O).nav.scroll : z(O).nav.scroll = e;
								})
							});
						}
						var r = I(n, 2), i = (e) => {
							var t = kg(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2);
							K(a);
							var o = F(I(a, 2));
							E(n);
							var s = I(n, 2), c = N(s), l = F(c, !0), u = I(c, 2);
							K(u);
							var d = F(I(u, 2));
							E(s);
							var f = I(s, 2), p = N(f), m = F(p, !0), h = I(p, 2);
							K(h);
							var g = F(I(h, 2));
							E(f);
							var _ = I(f, 2), v = (e) => {
								var t = um(), n = N(t);
								K(n);
								var r = I(n);
								E(t), R((e, i) => {
									J(t, "title", e), Ci(n, z(O).nav.style?.shrinkLogo === !0), U(r, ` ${i ?? ""}`);
								}, [() => Y("tip.nav.shrinkLogo"), () => Y("lbl.navShrinkLogo")]), B("change", n, (e) => tc("shrinkLogo", e.target.checked ? !0 : void 0)), H(e, t);
							};
							W(_, (e) => {
								(z(O).nav.logo?.type ?? "text") !== "text" && e(v);
							}), R((e, t, r, c, p, _, v, y) => {
								J(n, "title", e), U(i, t), q(a, r), U(o, `${c ?? ""}%`), J(s, "title", p), U(l, _), q(u, z(O).nav.style?.shrinkAt ?? 80), U(d, `${z(O).nav.style?.shrinkAt ?? 80 ?? ""} px`), J(f, "title", v), U(m, y), q(h, z(O).nav.style?.shrinkMs ?? 220), U(g, `${z(O).nav.style?.shrinkMs ?? 220 ?? ""} ms`);
							}, [
								() => Y("tip.nav.shrinkTo"),
								() => Y("lbl.navShrinkTo"),
								() => Math.round((z(O).nav.style?.shrinkTo ?? .5) * 100),
								() => Math.round((z(O).nav.style?.shrinkTo ?? .5) * 100),
								() => Y("tip.nav.shrinkAt"),
								() => Y("lbl.navShrinkAt"),
								() => Y("tip.nav.shrinkMs"),
								() => Y("lbl.navShrinkMs")
							]), B("input", a, (e) => Ic(e.target.valueAsNumber)), B("input", u, (e) => Vc(e.target.valueAsNumber)), B("input", h, (e) => Hc(e.target.valueAsNumber)), H(e, t);
						};
						W(r, (e) => {
							z(O).nav.scroll === "shrink" && e(i);
						}), H(e, t);
					};
					W(s, (e) => {
						z(O).nav.sticky !== !1 && e(c);
					});
					var l = I(s, 2), u = N(l);
					K(u);
					var d = I(u);
					E(l), E(t), R((e, t, n, s, c) => {
						U(r, e), J(i, "title", t), Ci(a, z(O).nav.sticky !== !1), U(o, ` ${n ?? ""}`), J(l, "title", s), Ci(u, z(O).nav.style?.atTop === "clear"), U(d, ` ${c ?? ""}`);
					}, [
						() => Y("group.navScrolling"),
						() => Y("tip.nav.sticky"),
						() => Y("lbl.navSticky"),
						() => Y("tip.nav.atTop"),
						() => Y("lbl.navAtTop")
					]), B("change", a, (e) => ho("nav", () => {
						z(O).nav.sticky = e.target.checked;
					})), B("change", u, (e) => tc("atTop", e.target.checked ? "clear" : void 0)), H(e, t);
				};
				W(Ze, (e) => {
					z(nc) || e(Qe);
				}), E(Xe), E(qe);
				var $e = I(qe, 4), et = N($e), D = F(et, !0), tt = I(et, 2), rt = N(tt), it = N(rt), at = (e) => {
					var t = jg(), n = N(t), r = F(n, !0), i = I(n, 2);
					K(i), E(t), R((e, n, a) => {
						J(t, "title", e), U(r, n), J(i, "min", $o.min), J(i, "max", $o.max), J(i, "placeholder", a), q(i, z(O).nav.style?.mobile?.padY ?? "");
					}, [
						() => Y("tip.nav.thickness"),
						() => Y("lbl.navThickness"),
						() => Y("lbl.navSameAsDesktop")
					]), B("change", i, (e) => jc(e, "padY", $o)), H(e, t);
				};
				W(it, (e) => {
					z(nc) || e(at);
				});
				var ot = I(it, 2), st = N(ot), ct = F(st, !0), lt = I(st, 2);
				K(lt), E(ot), E(rt);
				var ut = I(rt, 2), dt = N(ut), ft = N(dt), pt = F(ft, !0), mt = I(ft, 2);
				{
					let e = /* @__PURE__ */ k(() => z(O).nav.style?.mobile?.size ?? ""), t = /* @__PURE__ */ k(() => [["", Y("lbl.navSameAsDesktop")], ...ds.map((e) => [e, Y(`opt.size.${e}`)])]);
					X(mt, {
						filled: !0,
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => lc("size", e || void 0)
					});
				}
				E(dt);
				var ht = I(dt, 2), gt = N(ht), _t = F(gt, !0), vt = I(gt, 2);
				{
					let e = /* @__PURE__ */ k(() => z(O).nav.style?.mobile?.layout ?? ""), t = /* @__PURE__ */ k(() => [
						["", Y("lbl.navSameAsDesktop")],
						["left", Y("common.left")],
						["center", Y("common.center")],
						["right", Y("common.right")]
					]);
					X(vt, {
						filled: !0,
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => lc("layout", e || void 0)
					});
				}
				E(ht), E(ut);
				var yt = I(ut, 2), bt = N(yt), xt = N(bt), St = F(xt, !0), Ct = I(xt, 2);
				{
					let e = /* @__PURE__ */ k(() => z(O).nav.style?.mobile?.tools?.side ?? ""), t = /* @__PURE__ */ k(() => [
						["", Y("lbl.navSameAsDesktop")],
						["start", Y("common.left")],
						["end", Y("common.right")]
					]);
					X(Ct, {
						filled: !0,
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => lc("tools", e ? { side: e } : void 0)
					});
				}
				E(bt);
				var wt = I(bt, 2), Tt = (e) => {
					var t = Mg(), n = N(t), r = F(n, !0), i = I(n, 2);
					{
						let e = /* @__PURE__ */ k(() => uc("overlay")), t = /* @__PURE__ */ k(() => [
							["", Y("lbl.navSameAsDesktop")],
							["on", Y("common.on")],
							["off", Y("common.off")]
						]);
						X(i, {
							filled: !0,
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => dc("overlay", e)
						});
					}
					E(t), R((e, n) => {
						J(t, "title", e), U(r, n);
					}, [() => Y("tip.nav.mobileOverlay"), () => Y("lbl.navOverlay")]), H(e, t);
				};
				W(wt, (e) => {
					!z(rc) && !z(nc) && e(Tt);
				}), E(yt);
				var Et = I(yt, 2), Dt = N(Et), Ot = N(Dt), kt = F(Ot, !0), At = I(Ot, 2);
				{
					let e = /* @__PURE__ */ k(() => z(O).nav.style?.mobile?.border?.side ?? ""), t = /* @__PURE__ */ k(() => [
						["", Y("lbl.navSameAsDesktop")],
						["none", Y("common.none")],
						["bottom", Y("opt.navBorder.bottom")],
						["top", Y("opt.navBorder.top")],
						["both", Y("opt.navBorder.both")],
						["all", Y("opt.navBorder.all")]
					]);
					X(At, {
						filled: !0,
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => fc(e)
					});
				}
				E(Dt), E(Et);
				var jt = I(Et, 2), Mt = (e) => {
					var t = Dg(), n = N(t), r = F(n, !0), i = I(n, 2);
					K(i);
					var a = I(i, 2), o = F(a, !0), s = I(a, 2);
					{
						let e = /* @__PURE__ */ k(() => z(O).nav.style.mobile.border.color ?? "text"), t = /* @__PURE__ */ k(Ri), n = /* @__PURE__ */ k(() => Y("tip.nav.borderColorPick"));
						ba(s, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => lc("border", {
								...z(O).nav.style.mobile.border,
								color: e
							})
						});
					}
					E(t), R((e, t, s, c, l) => {
						J(n, "title", e), U(r, t), J(i, "title", s), q(i, z(O).nav.style.mobile.border.width ?? 1), J(a, "title", c), U(o, l);
					}, [
						() => Y("tip.nav.borderWidth"),
						() => Y("lbl.navBorderWidth"),
						() => Y("tip.nav.borderWidth"),
						() => Y("tip.nav.borderColorPick"),
						() => Y("lbl.navBorderColor")
					]), B("change", i, (e) => {
						let t = ms(e.target.value, {
							min: 1,
							max: 8
						}, 1), n = { ...z(O).nav.style.mobile.border };
						t === 1 ? delete n.width : n.width = t, lc("border", n), e.target.value = z(O).nav.style.mobile.border.width ?? 1;
					}), H(e, t);
				};
				W(jt, (e) => {
					z(O).nav.style?.mobile?.border?.side && z(O).nav.style.mobile.border.side !== "none" && e(Mt);
				});
				var Nt = I(jt, 2), Pt = N(Nt), Ft = N(Pt), It = F(Ft, !0), Lt = I(Ft, 2);
				{
					let e = /* @__PURE__ */ k(() => z(O).nav.style?.mobileMenu ?? "dropdown"), t = /* @__PURE__ */ k(() => [["dropdown", Y("opt.mobileMenu.dropdown")], ["sheet", Y("opt.mobileMenu.sheet")]]);
					X(Lt, {
						filled: !0,
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => tc("mobileMenu", e === "dropdown" ? void 0 : e)
					});
				}
				E(Pt);
				var Rt = I(Pt, 2), zt = (e) => {
					var t = Mg(), n = N(t), r = F(n, !0), i = I(n, 2);
					{
						let e = /* @__PURE__ */ k(() => z(O).nav.style?.sheetMotion ?? "top"), t = /* @__PURE__ */ k(() => [
							"top",
							"bottom",
							"left",
							"right",
							"fade",
							"none"
						].map((e) => [e, Y(`opt.sheetMotion.${e}`)]));
						X(i, {
							filled: !0,
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => tc("sheetMotion", e === "top" ? void 0 : e)
						});
					}
					E(t), R((e, n) => {
						J(t, "title", e), U(r, n);
					}, [() => Y("tip.nav.sheetMotion"), () => Y("lbl.sheetMotion")]), H(e, t);
				};
				W(Rt, (e) => {
					z(O).nav.style?.mobileMenu === "sheet" && e(zt);
				}), E(Nt);
				var Bt = I(Nt, 2), Vt = (e) => {
					var t = Ng(), n = P(t), r = N(n);
					K(r);
					var i = I(r);
					E(n);
					var a = I(n, 2), o = (e) => {
						var t = um(), n = N(t);
						K(n);
						var r = I(n);
						E(t), R((e, i) => {
							J(t, "title", e), Ci(n, z(O).nav.style?.sheetTheme === !0), U(r, ` ${i ?? ""}`);
						}, [() => Y("tip.nav.sheetTheme"), () => Y("lbl.sheetTheme")]), B("change", n, (e) => tc("sheetTheme", e.target.checked ? !0 : void 0)), H(e, t);
					};
					W(a, (e) => {
						z(O).theme?.alt?.tokens && z(O).nav.style?.tools?.theme !== !1 && e(o);
					});
					var s = I(a, 2), c = (e) => {
						var t = um(), n = N(t);
						K(n);
						var r = I(n);
						E(t), R((e, i) => {
							J(t, "title", e), Ci(n, z(O).nav.style?.sheetCart === !0), U(r, ` ${i ?? ""}`);
						}, [() => Y("tip.nav.sheetCart"), () => Y("lbl.sheetCart")]), B("change", n, (e) => tc("sheetCart", e.target.checked ? !0 : void 0)), H(e, t);
					};
					W(s, (e) => {
						z(O).nav.cart?.show && e(c);
					});
					var l = I(s, 2), u = (e) => {
						var t = um(), n = N(t);
						K(n);
						var r = I(n);
						E(t), R((e, i) => {
							J(t, "title", e), Ci(n, z(O).nav.style?.sheetAnnounce === !0), U(r, ` ${i ?? ""}`);
						}, [() => Y("tip.nav.sheetAnnounce"), () => Y("lbl.sheetAnnounce")]), B("change", n, (e) => tc("sheetAnnounce", e.target.checked ? !0 : void 0)), H(e, t);
					};
					W(l, (e) => {
						z(O).nav.announcement?.show && e(u);
					});
					var d = I(l, 2), f = (e) => {
						var t = um(), n = N(t);
						K(n);
						var r = I(n);
						E(t), R((e, i) => {
							J(t, "title", e), Ci(n, z(O).nav.style?.sheetToolLabels === !0), U(r, ` ${i ?? ""}`);
						}, [() => Y("tip.nav.sheetToolLabels"), () => Y("lbl.sheetToolLabels")]), B("change", n, (e) => tc("sheetToolLabels", e.target.checked ? !0 : void 0)), H(e, t);
					};
					W(d, (e) => {
						(z(O).nav.style?.sheetTheme || z(O).nav.style?.sheetCart) && e(f);
					});
					var p = I(d, 2), m = N(p), h = F(m, !0), g = I(m, 2);
					{
						let e = /* @__PURE__ */ k(() => z(O).nav.style?.sheet?.bg ?? "surface"), t = /* @__PURE__ */ k(Ri), n = /* @__PURE__ */ k(() => Y("tip.nav.sheetBg"));
						ba(g, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => Oc("bg", e)
						});
					}
					var _ = I(g, 2);
					K(_);
					var v = F(I(_, 2));
					E(p);
					var y = I(p, 2), b = N(y);
					K(b);
					var x = I(b);
					E(y);
					var S = I(y, 2), ee = N(S), te = I(ee);
					{
						let e = /* @__PURE__ */ k(() => z(O).nav.style?.sheet?.textColor ?? z(O).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ k(Ri), n = /* @__PURE__ */ k(() => Y("tip.nav.sheetTextColorPick"));
						ba(te, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => Oc("textColor", e)
						});
					}
					E(S), R((e, t, a, o, s, c, l, u, d, f) => {
						J(n, "title", e), Ci(r, z(O).nav.style?.sheetLogo === !0), U(i, ` ${t ?? ""}`), J(p, "title", a), U(h, o), J(_, "title", s), q(_, c), U(v, `${l ?? ""}%`), J(y, "title", u), Ci(b, z(O).nav.style?.sheet?.blur ?? z(O).nav.style?.blur !== !1), U(x, ` ${d ?? ""}`), U(ee, `${f ?? ""} `);
					}, [
						() => Y("tip.nav.sheetLogo"),
						() => Y("lbl.sheetLogo"),
						() => Y("tip.nav.sheetBg"),
						() => Y("lbl.background"),
						() => Y("tip.nav.sheetOpacity"),
						() => Math.round((z(O).nav.style?.sheet?.bgOpacity ?? .85) * 100),
						() => Math.round((z(O).nav.style?.sheet?.bgOpacity ?? .85) * 100),
						() => Y("tip.nav.sheetBlur"),
						() => Y("lbl.sheetBlur"),
						() => Y("lbl.textColor")
					]), B("change", r, (e) => tc("sheetLogo", e.target.checked ? !0 : void 0)), B("input", _, (e) => Oc("bgOpacity", e.target.valueAsNumber / 100)), B("change", b, (e) => Oc("blur", e.target.checked)), H(e, t);
				};
				W(Bt, (e) => {
					z(O).nav.style?.mobileMenu === "sheet" && e(Vt);
				});
				var Ht = I(Bt, 2), Ut = (e) => {
					var t = Mg(), n = N(t), r = F(n, !0), i = I(n, 2);
					{
						let e = /* @__PURE__ */ k(() => z(O).nav.style?.mobileSubs ?? "collapsed"), t = /* @__PURE__ */ k(() => [["collapsed", Y("opt.mobileSubs.collapsed")], ["expanded", Y("opt.mobileSubs.expanded")]]);
						X(i, {
							filled: !0,
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => tc("mobileSubs", e === "collapsed" ? void 0 : e)
						});
					}
					E(t), R((e, n) => {
						J(t, "title", e), U(r, n);
					}, [() => Y("tip.nav.mobileSubs"), () => Y("lbl.mobileSubs")]), H(e, t);
				}, Wt = /* @__PURE__ */ k(() => z(O).nav.items?.some((e) => e.children?.length));
				W(Ht, (e) => {
					z(Wt) && e(Ut);
				}), E(tt), E($e);
				var Gt = I($e, 4), Kt = N(Gt), qt = F(Kt, !0), A = I(Kt, 2), Jt = N(A), Yt = N(Jt), Xt = F(Yt, !0), Zt = I(Yt, 2);
				Jr(Zt, 21, () => [
					["standard", Y("opt.hover.standard")],
					["underline", Y("opt.hover.underline")],
					["pill", Y("opt.hover.pill")],
					["lift-plain", Y("opt.hover.liftPlain")],
					["lift", Y("opt.hover.lift")]
				], ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ k(() => h(z(t), 2));
					let r = () => z(n)[0], i = () => z(n)[1];
					var a = Pg();
					let o;
					var s = N(a), c = F(s, !0), l = F(I(s), !0);
					E(a), R((e) => {
						o = gi(a, 1, "tile hover-tile svelte-1n46o8q", null, o, { on: (z(O).nav.style?.hover ?? "standard") === r() }), J(a, "aria-pressed", (z(O).nav.style?.hover ?? "standard") === r()), gi(s, 1, `hover-sample hover-${r() ?? ""}`, "svelte-1n46o8q"), U(c, e), U(l, i());
					}, [() => Y("seed.home")]), B("click", a, () => el(r())), H(e, a);
				}), E(Zt), E(Jt);
				var Qt = I(Jt, 2), M = (e) => {
					var t = Fg(), n = N(t), r = F(n, !0), i = I(n, 2);
					K(i);
					var a = F(I(i, 2));
					E(t), R((e, n, o) => {
						J(t, "title", e), U(r, n), q(i, z(O).nav.style?.hoverGlow ?? .6), U(a, `${o ?? ""}%`);
					}, [
						() => Y("tip.nav.hoverGlow"),
						() => Y("lbl.glowStrength"),
						() => Math.round((z(O).nav.style?.hoverGlow ?? .6) * 100)
					]), B("input", i, (e) => tc("hoverGlow", Number(e.target.value))), H(e, t);
				};
				W(Qt, (e) => {
					z(O).nav.style?.hover === "lift" && e(M);
				});
				var $t = I(Qt, 2), en = N($t), tn = (e) => {
					var t = dh(), n = N(t);
					{
						let e = /* @__PURE__ */ k(() => z(O).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ k(Ri);
						ba(n, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							get label() {
								return z(Wc)[1];
							},
							onchange: (e) => tc("hoverColor", e)
						});
					}
					var r = F(I(n, 2), !0);
					E(t), R(() => {
						J(t, "title", z(Wc)[1]), U(r, z(Wc)[0]);
					}), H(e, t);
				};
				W(en, (e) => {
					z(Wc) && e(tn);
				});
				var nn = I(en, 2), rn = N(nn);
				{
					let e = /* @__PURE__ */ k(() => z(O).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ k(Ri), n = /* @__PURE__ */ k(() => Y("tip.nav.hoverTextColorPick"));
					ba(rn, {
						get value() {
							return z(e);
						},
						get tokens() {
							return z(t);
						},
						get label() {
							return z(n);
						},
						onchange: (e) => tc("hoverTextColor", e)
					});
				}
				var an = F(I(rn, 2), !0);
				E(nn);
				var on = I(nn, 2), sn = N(on);
				{
					let e = /* @__PURE__ */ k(() => z(O).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ k(Ri), n = /* @__PURE__ */ k(() => Y("tip.nav.textColorPick"));
					ba(sn, {
						get value() {
							return z(e);
						},
						get tokens() {
							return z(t);
						},
						get label() {
							return z(n);
						},
						onchange: (e) => tc("textColor", e)
					});
				}
				var cn = F(I(sn, 2), !0);
				E(on), E($t);
				var ln = I($t, 2), un = N(ln);
				K(un);
				var L = I(un);
				E(ln), E(A), E(Gt);
				var dn = I(Gt, 4), fn = N(dn), pn = F(fn, !0), mn = I(fn, 2), hn = N(mn);
				a(hn, () => Ni, () => z(O).nav?.style?.background?.layers ?? []), E(mn), E(dn), E(ne), E(b);
				var gn = I(b, 2), _n = N(gn), vn = F(_n, !0), yn = I(_n, 2), bn = N(yn), xn = N(bn);
				K(xn);
				var Sn = I(xn);
				E(bn);
				var Cn = I(bn, 2), wn = (e) => {
					var t = Lg(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2);
					K(a), E(n);
					var o = I(n, 2), s = N(o), c = I(s);
					{
						let e = /* @__PURE__ */ k(() => z(O).nav.announcement?.page ?? (z(O).nav.announcement?.href === void 0 ? "" : "custom")), t = /* @__PURE__ */ k(() => [
							["", Y("common.none")],
							...z(O).pages.map((e) => [e.id, e.title]),
							["custom", Y("opt.announceLink.custom")]
						]);
						X(c, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => ho("edit:nav-announce-link", () => {
								let t = { ...z(O).nav.announcement ?? {} };
								delete t.page, delete t.href, e === "custom" ? t.href = "" : e && (t.page = e), z(O).nav.announcement = t;
							})
						});
					}
					E(o);
					var l = I(o, 2), u = (e) => {
						var t = Ig(), n = N(t), r = F(n, !0), i = I(n, 2);
						K(i), E(t), R((e, n) => {
							J(t, "title", e), U(r, n), q(i, z(O).nav.announcement?.href ?? "");
						}, [() => Y("tip.nav.announceHref"), () => Y("lbl.announceHref")]), B("change", i, (e) => pc("href", e.target.value.trim())), H(e, t);
					};
					W(l, (e) => {
						z(O).nav.announcement?.href !== void 0 && !z(O).nav.announcement?.page && e(u);
					});
					var d = I(l, 2), f = (e) => {
						var t = um(), n = N(t);
						K(n);
						var r = I(n);
						E(t), R((e, i) => {
							J(t, "title", e), Ci(n, z(O).nav.announcement?.sticky !== !1), U(r, ` ${i ?? ""}`);
						}, [() => Y("tip.nav.announceSticky"), () => Y("lbl.announceSticky")]), B("change", n, (e) => pc("sticky", e.target.checked ? void 0 : !1)), H(e, t);
					};
					W(d, (e) => {
						z(O).nav.sticky !== !1 && !z(rc) && !z(nc) && !z(O).nav.overlay && e(f);
					});
					var p = I(d, 2), m = (e) => {
						var t = um(), n = N(t);
						K(n);
						var r = I(n);
						E(t), R((e, i) => {
							J(t, "title", e), Ci(n, z(O).nav.announcement?.followNav === !0), U(r, ` ${i ?? ""}`);
						}, [() => Y("tip.nav.announceFollowNav"), () => Y("lbl.announceFollowNav")]), B("change", n, (e) => pc("followNav", e.target.checked ? !0 : void 0)), H(e, t);
					};
					W(p, (e) => {
						z(O).nav.scroll === "hide" && z(O).nav.sticky !== !1 && !z(nc) && z(O).nav.announcement?.sticky !== !1 && e(m);
					});
					var h = I(p, 2), g = (e) => {
						{
							let t = /* @__PURE__ */ k(() => Y("lbl.announcePlace")), n = /* @__PURE__ */ k(() => Y("tip.nav.announcePlace")), r = /* @__PURE__ */ k(() => z(O).nav.announcement?.place ?? "nav"), i = /* @__PURE__ */ k(() => [
								["nav", Y("opt.announcePlace.nav")],
								["page", Y("opt.announcePlace.page")],
								["content", Y("opt.announcePlace.content")]
							]);
							Es(e, {
								get label() {
									return z(t);
								},
								get title() {
									return z(n);
								},
								get value() {
									return z(r);
								},
								get options() {
									return z(i);
								},
								onchange: (e) => pc("place", e === "nav" ? void 0 : e)
							});
						}
					};
					W(h, (e) => {
						z(nc) && e(g);
					});
					var _ = I(h, 2), v = N(_);
					K(v);
					var y = I(v);
					E(_);
					var b = I(_, 2), x = (e) => {
						var t = km(), n = F(t, !0);
						R((e, r) => {
							J(t, "title", e), U(n, r);
						}, [() => Y("tip.nav.announceShowAgain"), () => Y("lbl.announceShowAgain")]), B("click", t, () => nt?.sendAnnounceReset()), H(e, t);
					};
					W(b, (e) => {
						z(O).nav.announcement?.dismiss !== !1 && e(x);
					});
					var S = I(b, 2), ee = N(S), te = I(ee);
					{
						let e = /* @__PURE__ */ k(() => z(O).nav.announcement?.color ?? "accent"), t = /* @__PURE__ */ k(Ri), n = /* @__PURE__ */ k(() => Y("tip.nav.announceColor"));
						ba(te, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => pc("color", e)
						});
					}
					E(S);
					var ne = I(S, 2), C = N(ne), re = I(C);
					{
						let e = /* @__PURE__ */ k(() => z(O).nav.announcement?.textColor ?? "accent-text"), t = /* @__PURE__ */ k(Ri), n = /* @__PURE__ */ k(() => Y("tip.nav.announceTextColor"));
						ba(re, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => pc("textColor", e)
						});
					}
					E(ne), R((e, t, r, c, l, u, d, f, p, m) => {
						J(n, "title", e), U(i, t), q(a, z(O).nav.announcement?.text ?? ""), J(o, "title", r), U(s, `${c ?? ""} `), J(_, "title", l), Ci(v, z(O).nav.announcement?.dismiss !== !1), U(y, ` ${u ?? ""}`), J(S, "title", d), U(ee, `${f ?? ""} `), J(ne, "title", p), U(C, `${m ?? ""} `);
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
					]), B("change", a, (e) => pc("text", e.target.value.trim() || void 0)), B("change", v, (e) => pc("dismiss", e.target.checked ? void 0 : !1)), H(e, t);
				};
				W(Cn, (e) => {
					z(O).nav.announcement?.show && e(wn);
				}), E(yn), E(gn);
				var Tn = I(gn, 2), En = N(Tn), Dn = F(En, !0), On = I(En, 2);
				{
					let e = (e, t = f, n = f) => {
						var r = Rg(), i = N(r);
						G(i, () => C.up, !0), E(i);
						var a = I(i, 2);
						G(a, () => C.down, !0), E(a), E(r), R((e, t) => {
							J(i, "title", e), i.disabled = n() === 0, J(a, "title", t), a.disabled = n() === z(Qs).length - 1;
						}, [() => Y("tip.moveUp"), () => Y("tip.moveDown")]), B("click", i, (e) => {
							e.preventDefault(), e.stopPropagation(), $s(t(), -1);
						}), B("click", a, (e) => {
							e.preventDefault(), e.stopPropagation(), $s(t(), 1);
						}), H(e, r);
					};
					var kn = N(On), An = (e) => {
						var t = lm(), n = P(t);
						{
							let e = /* @__PURE__ */ k(() => Y("lbl.toolsSide")), t = /* @__PURE__ */ k(() => Y("tip.nav.toolsSideColumn")), r = /* @__PURE__ */ k(() => z(O).nav.style?.tools?.side ?? "end"), i = /* @__PURE__ */ k(() => [["start", Y("opt.toolsSide.top")], ["end", Y("opt.toolsSide.bottom")]]);
							Es(n, {
								get label() {
									return z(e);
								},
								get title() {
									return z(t);
								},
								get value() {
									return z(r);
								},
								get options() {
									return z(i);
								},
								onchange: (e) => ec("side", e === "start" ? "start" : void 0)
							});
						}
						var r = I(n, 2);
						{
							let e = /* @__PURE__ */ k(() => Y("lbl.toolsAlign")), t = /* @__PURE__ */ k(() => Y("tip.nav.toolsAlign")), n = /* @__PURE__ */ k(() => z(O).nav.style?.tools?.align ?? "center"), i = /* @__PURE__ */ k(() => [
								["start", Y("opt.toolsAlign.start")],
								["center", Y("opt.toolsAlign.center")],
								["end", Y("opt.toolsAlign.end")],
								["spread", Y("opt.toolsAlign.spread")]
							]);
							Es(r, {
								get label() {
									return z(e);
								},
								get title() {
									return z(t);
								},
								get value() {
									return z(n);
								},
								get options() {
									return z(i);
								},
								onchange: (e) => ec("align", e === "center" ? void 0 : e)
							});
						}
						H(e, t);
					}, jn = (e) => {
						{
							let t = /* @__PURE__ */ k(() => Y("lbl.toolsSide")), n = /* @__PURE__ */ k(() => Y("tip.nav.toolsSide")), r = /* @__PURE__ */ k(() => z(O).nav.style?.tools?.side ?? "end"), i = /* @__PURE__ */ k(() => [["start", Y("opt.toolsSide.start")], ["end", Y("opt.toolsSide.end")]]);
							Es(e, {
								get label() {
									return z(t);
								},
								get title() {
									return z(n);
								},
								get value() {
									return z(r);
								},
								get options() {
									return z(i);
								},
								onchange: (e) => ec("side", e === "start" ? "start" : void 0)
							});
						}
					};
					W(kn, (e) => {
						z(nc) ? e(An) : e(jn, -1);
					}), Jr(I(kn, 2), 18, () => z(Qs), (e) => e, (t, n, r) => {
						var i = Nr(), a = P(i), o = (t) => {
							var i = Nr(), a = P(i), o = (t) => {
								var i = zg(), a = N(i), o = N(a), s = F(o, !0), c = I(o);
								e(c, () => n, () => z(r)), E(a);
								var l = I(a, 2), u = N(l);
								K(u);
								var d = I(u);
								E(l), E(i), R((e, t, n) => {
									U(s, e), J(l, "title", t), Ci(u, z(O).nav.style?.tools?.theme !== !1), U(d, ` ${n ?? ""}`);
								}, [
									() => Y("lbl.themeToggle"),
									() => Y("tip.nav.themeToggle"),
									() => Y("lbl.showInMenu")
								]), B("change", u, (e) => ec("theme", e.target.checked ? void 0 : !1)), H(t, i);
							};
							W(a, (e) => {
								z(O).theme?.alt?.tokens && e(o);
							}), H(t, i);
						}, s = (t) => {
							var i = Bg(), a = N(i), o = N(a), s = F(o, !0), c = I(o);
							e(c, () => n, () => z(r)), E(a);
							var l = I(a, 2), u = N(l);
							K(u);
							var d = I(u);
							E(l);
							var f = I(l, 2), p = (e) => {
								var t = Mg(), n = N(t), r = F(n, !0), i = I(n, 2);
								{
									let e = /* @__PURE__ */ k(() => z(O).nav.cart?.href ?? ""), t = /* @__PURE__ */ k(() => [["", Y("common.none")], ...z(O).pages.map((e) => [e.path, e.title])]);
									X(i, {
										filled: !0,
										get value() {
											return z(e);
										},
										get options() {
											return z(t);
										},
										onchange: (e) => ho("nav", () => {
											e ? z(O).nav.cart.href = e : delete z(O).nav.cart.href;
										})
									});
								}
								E(t), R((e, n) => {
									J(t, "title", e), U(r, n);
								}, [() => Y("tip.cart.checkout"), () => Y("lbl.checkoutPage")]), H(e, t);
							};
							W(f, (e) => {
								z(O).nav.cart?.show && e(p);
							}), E(i), R((e, t, n) => {
								U(s, e), J(l, "title", t), Ci(u, z(O).nav.cart?.show === !0), U(d, ` ${n ?? ""}`);
							}, [
								() => Y("lbl.cart"),
								() => Y("tip.nav.cart"),
								() => Y("lbl.showInMenu")
							]), B("change", u, (e) => ho("nav", () => {
								e.target.checked ? z(O).nav.cart = {
									...z(O).nav.cart ?? {},
									show: !0
								} : delete z(O).nav.cart;
							})), H(t, i);
						}, c = (t) => {
							var i = Yg(), a = N(i), o = N(a), s = N(o, !0), c = I(s);
							e(c, () => n, () => z(r)), E(o), E(a);
							var l = I(a, 2), u = N(l), d = N(u);
							K(d);
							var f = I(d);
							E(u);
							var p = I(u, 2), m = (e) => {
								var t = Jg(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2);
								Jr(a, 21, () => z(Yc), ([e, t]) => e, (e, t) => {
									var n = /* @__PURE__ */ k(() => h(z(t), 2));
									let r = () => z(n)[0], i = () => z(n)[1];
									var a = bg();
									let o;
									var s = N(a);
									G(s, () => g[r()]);
									var c = F(I(s), !0);
									E(a), R(() => {
										o = gi(a, 1, "tile svelte-1n46o8q", null, o, { on: (z(O).nav.launcher?.view ?? "grid") === r() }), J(a, "aria-pressed", (z(O).nav.launcher?.view ?? "grid") === r()), U(c, i());
									}), B("click", a, () => vc("view", r() === "grid" ? void 0 : r())), H(e, a);
								}), E(a), E(n);
								var o = I(n, 2);
								{
									let e = /* @__PURE__ */ k(() => Y("lbl.launcherMobileView")), t = /* @__PURE__ */ k(() => Y("tip.nav.launcherMobileView")), n = /* @__PURE__ */ k(() => z(O).nav.launcher?.mobileView ?? ""), r = /* @__PURE__ */ k(() => [["", Y("lbl.navSameAsDesktop")], ...z(Yc)]);
									Es(o, {
										get label() {
											return z(e);
										},
										get title() {
											return z(t);
										},
										get value() {
											return z(n);
										},
										get options() {
											return z(r);
										},
										onchange: (e) => vc("mobileView", e || void 0)
									});
								}
								var s = I(o, 2), c = N(s), l = F(c, !0), u = I(c, 2);
								K(u);
								var d = F(I(u, 2), !0);
								E(s);
								var f = I(s, 2), p = N(f);
								K(p);
								var m = I(p);
								E(f);
								var _ = I(f, 2), v = (e) => {
									var t = Vg(), n = N(t), r = F(n, !0), i = I(n, 2);
									K(i), E(t), R((e, n, a) => {
										J(t, "title", e), U(r, n), J(i, "placeholder", a), q(i, z(O).nav.launcher?.title ?? "");
									}, [
										() => Y("tip.nav.launcherTitleText"),
										() => Y("lbl.launcherTitle"),
										() => Y("ph.launcherTitle")
									]), B("change", i, (e) => vc("title", e.target.value.trim() || void 0)), H(e, t);
								};
								W(_, (e) => {
									z(O).nav.launcher?.showTitle !== !1 && e(v);
								});
								var y = I(_, 2), b = N(y), x = F(b, !0), S = I(b, 2), ee = N(S);
								{
									let e = /* @__PURE__ */ k(() => z(O).nav.launcher?.icon ?? ""), t = /* @__PURE__ */ k(() => z(O).nav.launcher?.image ?? ""), n = /* @__PURE__ */ k(gc), r = /* @__PURE__ */ k(() => Y("opt.launcherDots")), i = /* @__PURE__ */ k(() => Y("tip.nav.launcherIcon"));
									jo(ee, {
										get icon() {
											return z(e);
										},
										get image() {
											return z(t);
										},
										get images() {
											return z(n);
										},
										klass: "lbtn-mark",
										get noneLabel() {
											return z(r);
										},
										get label() {
											return z(i);
										},
										onpick: (e) => _c(null, e),
										onfile: (e) => Ec(e, null),
										children: (e, t) => {
											var n = Nr(), r = P(n), i = (e) => {
												var t = Hg();
												R(() => J(t, "src", z(O).nav.launcher.image)), H(e, t);
											}, a = (e) => {
												var t = Nr();
												G(P(t), () => no(z(O).nav.launcher.icon) || ""), H(e, t);
											}, o = (e) => {
												var t = Nr();
												G(P(t), () => mc), H(e, t);
											};
											W(r, (e) => {
												z(O).nav.launcher?.image ? e(i) : z(O).nav.launcher?.icon ? e(a, 1) : e(o, -1);
											}), H(e, n);
										},
										$$slots: { default: !0 }
									});
								}
								var te = I(ee, 2), ne = N(te), re = (e) => {
									var t = Mr();
									R((e) => U(t, e), [() => Y("mp.ownImage")]), H(e, t);
								}, ie = (e) => {
									var t = Mr();
									R((e) => U(t, e), [() => Y(eo[z(O).nav.launcher.icon]?.labelKey ?? "common.none")]), H(e, t);
								}, ae = (e) => {
									var t = Mr();
									R((e) => U(t, e), [() => Y("opt.launcherDots")]), H(e, t);
								};
								W(ne, (e) => {
									z(O).nav.launcher?.image ? e(re) : z(O).nav.launcher?.icon ? e(ie, 1) : e(ae, -1);
								}), E(te), E(S), E(y);
								var oe = I(y, 2);
								Jr(oe, 17, () => z(O).nav.launcher?.links ?? [], Wr, (e, t, n) => {
									let r = /* @__PURE__ */ k(() => !Yu(z(t).href ?? ""));
									var i = qg();
									let a;
									var o = N(i), s = N(o), c = N(s), l = (e) => {
										var n = _g();
										R(() => J(n, "src", z(t).image)), H(e, n);
									}, u = (e) => {
										var n = Nr();
										G(P(n), () => no(z(t).icon) || ""), H(e, n);
									};
									W(c, (e) => {
										z(t).image ? e(l) : e(u, -1);
									}), E(s);
									var d = I(s, 2), f = F(d, !0), p = I(d, 2), m = (e) => {
										var t = Ug();
										G(t, () => C.warn, !0), E(t), R((e) => J(t, "title", e), [() => Y("tip.badTarget")]), H(e, t);
									};
									W(p, (e) => {
										z(r) && e(m);
									});
									var h = I(p, 2), g = N(h);
									g.disabled = n === 0, G(g, () => C.up, !0), E(g);
									var _ = I(g, 2);
									G(_, () => C.down, !0), E(_), E(h);
									var v = I(h, 2);
									G(v, () => C.caret, !0), E(v), E(o);
									var y = I(o, 2), b = (e) => {
										var i = Kg(), a = N(i);
										{
											let e = /* @__PURE__ */ k(() => z(t).icon ?? ""), r = /* @__PURE__ */ k(() => z(t).image ?? ""), i = /* @__PURE__ */ k(gc), o = /* @__PURE__ */ k(() => Y("mp.pickMark"));
											jo(a, {
												get icon() {
													return z(e);
												},
												get image() {
													return z(r);
												},
												get images() {
													return z(i);
												},
												klass: "lrow-tile",
												get label() {
													return z(o);
												},
												onpick: (e) => _c(n, e),
												onfile: (e) => Ec(e, n),
												children: (e, n) => {
													var r = Wg(), i = P(r), a = N(i), o = (e) => {
														var n = _g();
														R(() => J(n, "src", z(t).image)), H(e, n);
													}, s = (e) => {
														var n = Nr();
														G(P(n), () => no(z(t).icon) || ""), H(e, n);
													};
													W(a, (e) => {
														z(t).image ? e(o) : z(t).icon && e(s, 1);
													}), E(i);
													var c = F(I(i, 2), !0);
													R((e) => U(c, e), [() => z(t).label || Y("seed.link")]), H(e, r);
												},
												$$slots: { default: !0 }
											});
										}
										var o = I(a, 2), s = N(o);
										K(s);
										var c = I(s, 2);
										K(c);
										let l;
										var u = I(c, 2), d = (e) => {
											var t = Gg(), n = F(t, !0);
											R((e) => U(n, e), [() => Y("ui.badTarget")]), H(e, t);
										};
										W(u, (e) => {
											z(r) && e(d);
										});
										var f = I(u, 2), p = N(f);
										{
											let e = /* @__PURE__ */ k(() => z(t).icon ?? ""), r = /* @__PURE__ */ k(() => z(t).image ?? ""), i = /* @__PURE__ */ k(gc), a = /* @__PURE__ */ k(() => Y("mp.pickMark"));
											jo(p, {
												get icon() {
													return z(e);
												},
												get image() {
													return z(r);
												},
												get images() {
													return z(i);
												},
												klass: "linkish",
												get label() {
													return z(a);
												},
												onpick: (e) => _c(n, e),
												onfile: (e) => Ec(e, n),
												children: (e, t) => {
													Oe();
													var n = Mr();
													R((e) => U(n, e), [() => Y("mp.changeMark")]), H(e, n);
												},
												$$slots: { default: !0 }
											});
										}
										var m = I(p, 2), h = F(m, !0);
										E(f), E(o), E(i), R((e, n, i, a, o, u) => {
											q(s, z(t).label), J(s, "title", e), J(s, "placeholder", n), l = gi(c, 1, "field-filled svelte-1n46o8q", null, l, { "bad-target": z(r) }), q(c, z(t).href ?? ""), J(c, "placeholder", i), J(c, "title", a), J(m, "title", o), U(h, u);
										}, [
											() => Y("tip.nav.launcherLabel"),
											() => Y("lbl.text"),
											() => Y("ph.hrefAnchor"),
											() => z(r) ? Y("tip.badTarget") : Y("tip.hrefAnchor"),
											() => Y("tip.removeLink"),
											() => Y("ui.remove")
										]), B("change", s, (e) => Tc(n, "label", e.target.value)), B("change", c, (e) => Tc(n, "href", e.target.value)), B("click", m, () => bc(n)), H(e, i);
									};
									W(y, (e) => {
										z(hc) === n && e(b);
									}), E(i), R((e, t, r) => {
										a = gi(i, 1, "lrow svelte-1n46o8q", null, a, { open: z(hc) === n }), U(f, e), J(g, "title", t), J(_, "title", r), _.disabled = n === z(O).nav.launcher.links.length - 1;
									}, [
										() => z(t).label || Y("seed.link"),
										() => Y("tip.moveUp"),
										() => Y("tip.moveDown")
									]), B("click", o, () => j(hc, z(hc) === n ? null : n, !0)), B("keydown", o, (e) => {
										(e.key === "Enter" || e.key === " ") && (e.preventDefault(), j(hc, z(hc) === n ? null : n, !0));
									}), B("click", h, (e) => e.stopPropagation()), B("keydown", h, (e) => e.stopPropagation()), B("click", g, () => wc(n, -1)), B("click", _, () => wc(n, 1)), H(e, i);
								});
								var se = I(oe, 2), ce = F(se, !0);
								R((e, t, n, r, o, c, h, g) => {
									U(i, e), J(a, "aria-label", t), J(s, "title", n), U(l, r), q(u, z(O).nav.launcher?.mobileMax ?? 6), U(d, z(O).nav.launcher?.mobileMax ?? 6), J(f, "title", o), Ci(p, z(O).nav.launcher?.showTitle !== !1), U(m, ` ${c ?? ""}`), U(x, h), U(ce, g);
								}, [
									() => Y("lbl.design"),
									() => Y("lbl.design"),
									() => Y("tip.nav.launcherMobileMax"),
									() => Y("lbl.launcherMobileMax"),
									() => Y("tip.nav.launcherTitle"),
									() => Y("lbl.launcherShowTitle"),
									() => Y("lbl.launcherButton"),
									() => Y("ui.addLauncherLink")
								]), B("input", u, (e) => vc("mobileMax", e.target.valueAsNumber === 6 ? void 0 : e.target.valueAsNumber)), B("change", p, (e) => vc("showTitle", e.target.checked ? void 0 : !1)), B("click", se, yc), H(e, t);
							};
							W(p, (e) => {
								z(O).nav.launcher?.show === !0 && e(m);
							}), E(l), E(i), R((e, t, n, r) => {
								J(a, "title", e), U(s, t), J(u, "title", n), Ci(d, z(O).nav.launcher?.show === !0), U(f, ` ${r ?? ""}`);
							}, [
								() => Y("tip.nav.launcher"),
								() => Y("group.launcher"),
								() => Y("tip.nav.launcher"),
								() => Y("lbl.showInMenu")
							]), B("change", d, (e) => vc("show", e.target.checked ? !0 : void 0)), H(t, i);
						};
						W(a, (e) => {
							n === "theme" ? e(o) : n === "cart" ? e(s, 1) : e(c, -1);
						}), H(t, i);
					}), E(On);
				}
				E(Tn);
				var Mn = I(Tn, 2), Nn = N(Mn), Pn = F(Nn, !0), Fn = I(Nn, 2), In = N(Fn), Ln = N(In), Rn = F(Ln, !0), zn = I(Ln, 2);
				let Bn;
				Jr(zn, 21, () => z(Xc), ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ k(() => h(z(t), 2));
					let r = () => z(n)[0], i = () => z(n)[1];
					var a = bg();
					let o;
					var s = N(a);
					G(s, () => m[r()]);
					var c = F(I(s), !0);
					E(a), R(() => {
						o = gi(a, 1, "tile svelte-1n46o8q", null, o, { on: (z(O).nav.style?.subStyle ?? "card") === r() }), J(a, "aria-pressed", (z(O).nav.style?.subStyle ?? "card") === r()), U(c, i());
					}), B("click", a, () => tc("subStyle", r() === "card" ? void 0 : r())), H(e, a);
				}), E(zn), E(In);
				var Vn = I(In, 2), Hn = (e) => {
					var t = lm(), n = P(t), r = (e) => {
						var t = lm(), n = P(t);
						{
							let e = /* @__PURE__ */ k(() => Y("lbl.sideSubs")), t = /* @__PURE__ */ k(() => Y("tip.nav.sideSubs")), r = /* @__PURE__ */ k(() => z(O).nav.style?.sideSubs ?? "collapsed"), i = /* @__PURE__ */ k(() => [["collapsed", Y("opt.mobileSubs.collapsed")], ["expanded", Y("opt.mobileSubs.expanded")]]);
							Es(n, {
								get label() {
									return z(e);
								},
								get title() {
									return z(t);
								},
								get value() {
									return z(r);
								},
								get options() {
									return z(i);
								},
								onchange: (e) => tc("sideSubs", e === "collapsed" ? void 0 : e)
							});
						}
						var r = I(n, 2), i = (e) => {
							var t = um(), n = N(t);
							K(n);
							var r = I(n);
							E(t), R((e, i) => {
								J(t, "title", e), Ci(n, z(O).nav.style?.sideSubArrow === !0), U(r, ` ${i ?? ""}`);
							}, [() => Y("tip.nav.sideSubArrow"), () => Y("lbl.sideSubArrow")]), B("change", n, (e) => tc("sideSubArrow", e.target.checked ? !0 : void 0)), H(e, t);
						};
						W(r, (e) => {
							z(O).nav.style?.sideSubs === "expanded" && e(i);
						}), H(e, t);
					};
					W(n, (e) => {
						z(nc) && e(r);
					});
					var i = I(n, 2), a = (e) => {
						{
							let t = /* @__PURE__ */ k(() => Y("lbl.subOpen")), n = /* @__PURE__ */ k(() => Y("tip.nav.subOpen")), r = /* @__PURE__ */ k(() => z(O).nav.style?.subOpen ?? "hover"), i = /* @__PURE__ */ k(() => [
								["hover", Y("opt.subOpen.hover")],
								["stay", Y("opt.subOpen.stay")],
								["click", Y("opt.subOpen.click")]
							]);
							Es(e, {
								get label() {
									return z(t);
								},
								get title() {
									return z(n);
								},
								get value() {
									return z(r);
								},
								get options() {
									return z(i);
								},
								onchange: (e) => tc("subOpen", e === "hover" ? void 0 : e)
							});
						}
					};
					W(i, (e) => {
						(!z(nc) || z(O).nav.style?.sideSubs !== "expanded") && e(a);
					}), H(e, t);
				}, Un = /* @__PURE__ */ k(() => z(O).nav.items?.some((e) => e.children?.length));
				W(Vn, (e) => {
					z(Un) && e(Hn);
				});
				var Wn = I(Vn, 2), Gn = (e) => {
					var t = Bp(), n = N(t), r = I(n);
					{
						let e = /* @__PURE__ */ k(() => z(O).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ k(Ri), n = /* @__PURE__ */ k(() => Y("tip.nav.subPillColorPick"));
						ba(r, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => tc("subPillColor", e)
						});
					}
					E(t), R((e, r) => {
						J(t, "title", e), U(n, `${r ?? ""} `);
					}, [() => Y("tip.nav.subPillColor"), () => Y("lbl.subPillColor")]), H(e, t);
				};
				W(Wn, (e) => {
					z(O).nav.style?.subStyle === "pills" && e(Gn);
				});
				var Kn = I(Wn, 2), qn = N(Kn), Jn = I(qn);
				K(Jn), E(Kn), E(Fn), E(Mn);
				var Yn = I(Mn, 2), Xn = N(Yn), Zn = F(Xn, !0), Qn = I(Xn, 2);
				{
					let e = (e, t = f) => {
						let n = /* @__PURE__ */ k(Jd);
						var r = Xg();
						let i;
						var a = N(r);
						G(a, () => $d, !0), E(a);
						var o = I(a, 2), s = N(o), c = F(s, !0), l = F(I(s, 2), !0);
						E(o), E(r), R(() => {
							i = gi(r, 1, "nav-item ghost svelte-1n46o8q", null, i, { child: t() }), U(c, z(n).label), U(l, z(n).target);
						}), H(e, r);
					};
					var $n = N(Qn);
					Jr($n, 21, () => z(O).nav.items, Wr, (t, n, r) => {
						let i = /* @__PURE__ */ k(() => `${r}`);
						var a = e_(), o = P(a), s = (t) => {
							e(t, () => !1);
						};
						W(o, (e) => {
							z(Wd)?.key === z(i) && z(Wd).pos === "before" && e(s);
						});
						var c = I(o, 2);
						let l;
						var u = N(c);
						G(u, () => $d, !0), E(u);
						var d = I(u, 2), f = N(d);
						K(f);
						var p = I(f, 2), m = N(p);
						{
							let e = /* @__PURE__ */ k(() => z(n).page ?? (z(n).href == null ? "__none" : "__href")), t = /* @__PURE__ */ k(() => Y("tip.linkTarget")), i = /* @__PURE__ */ k(() => [
								...z(O).pages.map((e) => [e.id, e.title]),
								["__href", Y("opt.linkHref")],
								...z(n).children ? [["__none", Y("opt.noLink")]] : []
							]);
							X(m, {
								compact: !0,
								get value() {
									return z(e);
								},
								get title() {
									return z(t);
								},
								get options() {
									return z(i);
								},
								onchange: (e) => Ld(r, e)
							});
						}
						var h = I(m, 2), g = (e) => {
							var t = Zg();
							K(t), R((e, r) => {
								q(t, z(n).href), J(t, "placeholder", e), J(t, "title", r);
							}, [() => Y("ph.hrefAnchor"), () => Y("tip.hrefAnchor")]), B("change", t, (e) => Rd(r, e.target.value)), H(e, t);
						};
						W(h, (e) => {
							!z(n).page && z(n).href != null && e(g);
						}), E(p), E(d);
						var _ = I(d, 2), v = (e) => {
							var t = Qg();
							G(t, () => "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M6 9l6 6 6-6\"/></svg>", !0), E(t), R((e) => J(t, "title", e), [() => Y("tip.nav.hasSubmenu")]), H(e, t);
						};
						W(_, (e) => {
							z(n).children?.length && e(v);
						});
						var y = I(_, 2), b = N(y);
						G(b, () => C.plus, !0), E(b);
						var x = I(b, 2);
						x.disabled = r === 0, G(x, () => C.up, !0), E(x);
						var S = I(x, 2);
						G(S, () => C.cross, !0), E(S);
						var ee = I(S, 2);
						G(ee, () => C.down, !0), E(ee), E(y);
						var te = I(y, 2);
						G(te, () => C.kebab, !0), E(te), E(c);
						var ne = I(c, 2);
						Jr(ne, 17, () => z(n).children ?? [], Wr, (t, i, a) => {
							let o = /* @__PURE__ */ k(() => `${r}.${a}`);
							var s = $g(), c = P(s), l = (t) => {
								e(t, () => !0);
							};
							W(c, (e) => {
								z(Wd)?.key === z(o) && z(Wd).pos === "before" && e(l);
							});
							var u = I(c, 2);
							let d;
							var f = N(u);
							G(f, () => $d, !0), E(f);
							var p = I(f, 2), m = N(p);
							K(m);
							var h = I(m, 2), g = N(h);
							{
								let e = /* @__PURE__ */ k(() => z(i).page ?? "__href"), t = /* @__PURE__ */ k(() => Y("tip.linkTarget")), n = /* @__PURE__ */ k(() => [...z(O).pages.map((e) => [e.id, e.title]), ["__href", Y("opt.linkHref")]]);
								X(g, {
									compact: !0,
									get value() {
										return z(e);
									},
									get title() {
										return z(t);
									},
									get options() {
										return z(n);
									},
									onchange: (e) => rf(r, a, e)
								});
							}
							var _ = I(g, 2), v = (e) => {
								var t = Zg();
								K(t), R((e, n) => {
									q(t, z(i).href ?? ""), J(t, "placeholder", e), J(t, "title", n);
								}, [() => Y("ph.hrefAnchor"), () => Y("tip.hrefAnchor")]), B("change", t, (e) => af(r, a, e.target.value)), H(e, t);
							};
							W(_, (e) => {
								z(i).page || e(v);
							}), E(h), E(p);
							var y = I(p, 2), b = N(y);
							b.disabled = a === 0, G(b, () => C.up, !0), E(b);
							var x = I(b, 2);
							G(x, () => C.cross, !0), E(x);
							var S = I(x, 2);
							G(S, () => C.down, !0), E(S), E(y);
							var ee = I(y, 2);
							G(ee, () => C.kebab, !0), E(ee), E(u);
							var te = I(u, 2), ne = (t) => {
								e(t, () => !0);
							};
							W(te, (e) => {
								z(Wd)?.key === z(o) && z(Wd).pos === "after" && e(ne);
							}), R((e, t, r, s, c, l, p) => {
								d = gi(u, 1, "nav-item child svelte-1n46o8q", null, d, {
									selected: z(Hd) === z(o),
									dragging: z(Ud) === z(o)
								}), J(u, "data-key", z(o)), J(f, "title", e), q(m, z(i).label), J(m, "title", t), J(b, "title", r), J(x, "title", s), J(S, "title", c), S.disabled = a === z(n).children.length - 1, J(ee, "title", l), J(ee, "aria-label", p);
							}, [
								() => Y("tip.nav.dragItem"),
								() => Y("tip.nav.childLabel"),
								() => Y("tip.moveUp"),
								() => Y("tip.nav.removeChild"),
								() => Y("tip.moveDown"),
								() => Y("tip.nav.itemActions"),
								() => Y("tip.nav.itemActions")
							]), B("click", u, (e) => {
								e.stopPropagation(), j(Hd, z(o));
							}), Cr("dragstart", f, (e) => {
								e.stopPropagation(), j(Ud, z(o)), e.dataTransfer?.setData(Xd, z(o));
							}), Cr("dragend", f, Yd), B("input", m, (e) => nf(r, a, e.target.value)), B("click", b, () => sf(r, a, -1)), B("click", x, () => cf(r, a)), B("click", S, () => sf(r, a, 1)), B("click", ee, (e) => {
								e.stopPropagation(), j(Hd, z(o));
							}), H(t, s);
						});
						var re = I(ne, 2), ie = (t) => {
							e(t, () => !0);
						};
						W(re, (e) => {
							z(Wd)?.key === z(i) && z(Wd).pos === "into" && e(ie);
						});
						var ae = I(re, 2), oe = (t) => {
							e(t, () => !1);
						};
						W(ae, (e) => {
							z(Wd)?.key === z(i) && z(Wd).pos === "after" && e(oe);
						}), R((e, t, a, o, s, d, p, m) => {
							l = gi(c, 1, "nav-item svelte-1n46o8q", null, l, {
								selected: z(Hd) === z(i),
								dragging: z(Ud) === z(i),
								"drop-target": z(Wd)?.key === z(i) && z(Wd).pos === "into"
							}), J(c, "data-key", z(i)), J(u, "title", e), q(f, z(n).label), J(f, "title", t), J(b, "title", a), J(x, "title", o), J(S, "title", s), J(ee, "title", d), ee.disabled = r === z(O).nav.items.length - 1, J(te, "title", p), J(te, "aria-label", m);
						}, [
							() => Y("tip.nav.dragItem"),
							() => Y("tip.nav.itemLabel"),
							() => Y("tip.nav.addChild"),
							() => Y("tip.moveUp"),
							() => Y("tip.nav.removeItem"),
							() => Y("tip.moveDown"),
							() => Y("tip.nav.itemActions"),
							() => Y("tip.nav.itemActions")
						]), B("click", c, () => {
							j(Hd, z(i));
						}), Cr("dragstart", u, (e) => {
							j(Ud, z(i)), e.dataTransfer?.setData(Xd, z(i));
						}), Cr("dragend", u, Yd), B("input", f, (e) => Id(r, e.target.value)), B("click", b, () => tf(r)), B("click", x, () => zd(r, -1)), B("click", S, () => Vd(r)), B("click", ee, () => zd(r, 1)), B("click", te, () => {
							j(Hd, z(i));
						}), H(t, a);
					}), E($n);
					var er = I($n, 2), tr = F(er, !0), nr = I(er, 2), rr = N(nr);
					K(rr);
					var ir = I(rr, 2), ar = F(ir, !0);
					E(nr), E(Qn), R((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, ee, te, ne, C, re, ie, ae, oe, se, ce, w, le, ue, de, fe, T, pe, me, he, ge, _e, ve, ye, be, xe, Se, Ce, we, Te, Ee, De, E, Oe, ke, Ae) => {
						U(tr, De), J(nr, "title", E), J(rr, "placeholder", Oe), ir.disabled = ke, U(ar, Ae);
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
						() => !z(S).trim(),
						() => Y("ui.newPageAsItem")
					]), Cr("dragover", $n, Zd), Cr("drop", $n, (e) => {
						e.preventDefault(), Qd(z(Wd)?.key ?? "");
					}), B("click", er, ef), B("keydown", rr, (e) => {
						e.key === "Enter" && ee();
					}), Di(rr, () => z(S), (e) => j(S, e)), B("click", ir, ee);
				}
				E(Yn), E(t), R((e, t, n, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, ee, ne, C, re, ie, oe, ce, ue, de, fe, T, pe, me, he, ge, _e, ve, ye, be, Ce, Te, Ee, E, Oe, ke, Ae, je, Ne, Le, Re, ze, Be, He, Ue, We, Ge, Ke) => {
					J(r, "title", e), U(i, t), U(te, n), U(ae, a), J(se, "title", o), U(w, s), J(le, "aria-label", c), J(xe, "title", l), U(Se, u), J(we, "title", d), U(De, f), J(Me, "title", p), U(Pe, m), J(Fe, "min", es.min), J(Fe, "max", es.max), J(Fe, "step", es.step), q(Fe, z(oc)), J(Ie, "min", es.min), J(Ie, "max", es.max), q(Ie, z(oc)), U(Ve, h), U(Ye, g), J(et, "title", _), U(D, v), J(ot, "title", y), U(ct, b), J(lt, "min", es.min), J(lt, "max", es.max), J(lt, "placeholder", x), q(lt, z(O).nav.style?.mobile?.textSize ?? ""), J(dt, "title", S), U(pt, ee), J(ht, "title", ne), U(_t, C), J(bt, "title", re), U(St, ie), J(Dt, "title", oe), U(kt, ce), J(Pt, "title", ue), U(It, de), U(qt, fe), U(Xt, T), J(Zt, "aria-label", pe), J(nn, "title", me), U(an, he), J(on, "title", ge), U(cn, _e), J(ln, "title", ve), Ci(un, z(O).nav.style?.blur !== !1), U(L, ` ${ye ?? ""}`), U(pn, be), J(_n, "title", Ce), U(vn, Te), J(bn, "title", Ee), Ci(xn, z(O).nav.announcement?.show === !0), U(Sn, ` ${E ?? ""}`), J(En, "title", Oe), U(Dn, ke), U(Pn, Ae), U(Rn, je), Bn = gi(zn, 1, "tile-grid svelte-1n46o8q", null, Bn, {
						"cols-5": !z(nc),
						"cols-3": z(nc)
					}), J(zn, "aria-label", Ne), J(Kn, "title", Le), U(qn, `${Re ?? ""} `), q(Jn, z(O).nav.style?.subColumns ?? 1), J(Xn, "title", ze), U(Zn, Be);
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
					() => !z(S).trim(),
					() => Y("ui.newPageAsItem")
				]), B("input", Fe, (e) => tc("textSize", e.target.valueAsNumber)), B("change", Ie, (e) => kc(e, "textSize", es)), B("change", lt, (e) => jc(e, "textSize", es)), B("change", un, (e) => tc("blur", e.target.checked)), B("change", xn, (e) => pc("show", e.target.checked ? !0 : void 0)), B("change", Jn, (e) => tc("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), H(e, t);
			}, b = (e) => {
				var t = o_(), n = N(t), r = N(n), i = I(r);
				K(i), E(n);
				var a = I(n, 2), o = N(a), s = I(o);
				K(s), E(a);
				var c = I(a, 2), l = N(c), u = I(l);
				{
					let e = /* @__PURE__ */ k(Gs), t = /* @__PURE__ */ k(Js);
					X(u, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => Z(e)
					});
				}
				E(c);
				var d = I(c, 4), f = F(d, !0), p = I(d, 2), m = N(p);
				Jr(m, 17, () => z(Rs), (e) => e.screen, (e, t) => {
					var n = n_(), r = N(n), i = F(r, !0), a = I(r, 2);
					let o;
					var s = F(a), c = F(I(a, 2), !0);
					E(n), R(() => {
						U(i, z(t).screen), o = gi(a, 1, "cw-bar svelte-1n46o8q", null, o, { fluid: !z(t).bound }), vi(s, `width:${z(t).pct ?? ""}%`), U(c, z(t).bound ? `${z(t).margin}` : "-");
					}), H(e, n);
				});
				var h = I(m, 2), g = N(h), _ = F(g, !0), v = F(I(g, 2), !0);
				E(h);
				var y = I(h, 2), b = (e) => {
					var t = r_(), n = F(t, !0);
					R((e) => U(n, e), [() => Y("lbl.bindsFrom", { n: z(Le) })]), H(e, t);
				};
				W(y, (e) => {
					z(Ms) !== "full" && e(b);
				}), E(p);
				var x = I(p, 2);
				Jr(x, 21, () => Ko, (e) => e.id, (e, t) => {
					var n = eg();
					let r;
					var i = F(n, !0);
					R((e) => {
						r = gi(n, 1, "svelte-1n46o8q", null, r, { on: z(Ps) === z(t).id }), U(i, e);
					}, [() => Y(`lbl.width.${z(t).id}`)]), B("click", n, () => Hs(z(t).width)), H(e, n);
				}), E(x);
				var S = I(x, 2), ee = (e) => {
					var t = i_(), n = N(t), r = F(n, !0), i = I(n, 2);
					K(i);
					var a = F(I(i, 2));
					E(t), R((e, n) => {
						J(t, "title", e), U(r, n), J(i, "min", 960), J(i, "max", Wo), J(i, "step", 20), q(i, z(Ls)), U(a, `${z(Ls) ?? ""} px`);
					}, [() => Y("tip.site.contentWidthFree"), () => Y("lbl.widthFree")]), B("input", i, (e) => Hs(e.target.valueAsNumber)), H(e, t);
				};
				W(S, (e) => {
					z(Ms) !== "full" && e(ee);
				});
				var te = I(S, 2), ne = F(te, !0), re = I(te, 2);
				Jr(re, 21, () => Go, (e) => e.id, (e, t) => {
					var n = eg();
					let r;
					var i = F(n, !0);
					R((e) => {
						r = gi(n, 1, "svelte-1n46o8q", null, r, { on: z(Fs) === z(t).id }), U(i, e);
					}, [() => Y(`lbl.gutter.${z(t).id}`)]), B("click", n, () => Us(z(t).gutter)), H(e, n);
				}), E(re);
				var ie = I(re, 2), ae = N(ie), oe = F(ae, !0), se = I(ae, 2), ce = N(se), w = N(ce), le = F(w, !0), ue = I(w, 2);
				K(ue);
				var de = F(I(ue, 2));
				E(ce), E(se), E(ie);
				var fe = I(ie, 4), T = N(fe), pe = I(T), me = (e) => {
					var t = dg();
					R((e) => {
						J(t, "src", z(O).site.icon), J(t, "alt", e);
					}, [() => Y("lbl.siteIcon")]), H(e, t);
				};
				W(pe, (e) => {
					z(O).site.icon && e(me);
				}), E(fe);
				var he = I(fe, 2), ge = N(he), _e = N(ge), ve = I(_e);
				E(ge);
				var ye = I(ge, 2), be = (e) => {
					var t = a_(), n = P(t);
					G(n, () => C.pencil ?? "✎", !0), E(n);
					var r = I(n, 2);
					G(r, () => C.cross, !0), E(r), R((e, t) => {
						J(n, "title", e), J(r, "title", t);
					}, [() => Y("tip.site.editIcon"), () => Y("tip.site.removeIcon")]), B("click", n, () => j(Ss, z(O).site.icon, !0)), B("click", r, Ts), H(e, t);
				};
				W(ye, (e) => {
					z(O).site.icon && e(be);
				}), E(he), E(t), R((e, t, u, p, m, h, g, y, b, x, S, ee, C, re, ae, se, w, fe, pe, me) => {
					J(n, "title", e), U(r, `${t ?? ""} `), q(i, z(O).site.title ?? ""), J(i, "placeholder", u), J(a, "title", p), U(o, `${m ?? ""} `), q(s, z(O).site.description ?? ""), J(s, "placeholder", h), J(c, "title", g), U(l, `${y ?? ""} `), J(d, "title", b), U(f, x), U(_, S), U(v, ee), J(te, "title", C), U(ne, re), ie.open = z(Fs) === null || z(Is), U(oe, ae), J(ce, "title", se), U(le, w), J(ue, "min", 0), J(ue, "max", 12), J(ue, "step", 1), q(ue, z(Ns)), U(de, `${z(Ns) ?? ""} vw`), U(T, `${fe ?? ""} `), J(ge, "title", pe), U(_e, `${me ?? ""} `);
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
					() => z(O).site.icon ? Y("ui.changeIcon") : Y("ui.chooseIcon")
				]), B("input", i, (e) => Ds(e.target.value)), B("input", s, (e) => As(e.target.value)), Cr("toggle", ie, (e) => j(Is, e.currentTarget.open, !0)), B("input", ue, (e) => Us(e.target.valueAsNumber)), B("change", ve, Cs), H(e, t);
			}, x = (e) => {
				var t = p_();
				{
					let e = (e, t = f, n = f) => {
						var r = c_(), i = N(r), a = (e) => {
							var t = s_(), r = F(t, !0);
							R(() => U(r, n())), H(e, t);
						};
						W(i, (e) => {
							n() && e(a);
						});
						var o = I(i, 2), s = N(o), c = F(s, !0), l = I(s, 2), u = F(l, !0), d = I(l, 2), p = N(d), m = F(p, !0), h = F(I(p), !0);
						E(d), E(o), E(r), R((e, t, n, r, i, a, s, l, d) => {
							vi(o, `--tv-bg:${e ?? ""};--tv-surface:${t ?? ""};--tv-text:${n ?? ""};--tv-accent:${r ?? ""};--tv-accent-ink:${i ?? ""}`), U(c, a), U(u, s), U(m, l), U(h, d);
						}, [
							() => Lf(t().bg, t()),
							() => Lf(t().surface, t()),
							() => Lf(t().text, t()),
							() => Lf(t().accent, t()),
							() => Lf(t()["accent-text"] ?? se(Lf(t().accent ?? "#000000", t())), t()),
							() => Y("preview.heading"),
							() => Y("preview.cardBody"),
							() => Y("preview.button"),
							() => Y("preview.link")
						]), H(e, r);
					};
					var n = N(t), r = F(n, !0), i = I(n, 2);
					Jr(i, 21, () => Bf, (e) => e.id, (e, t) => {
						var n = l_();
						let r;
						var i = N(n), a = N(i), o = I(a), s = I(o), c = I(s);
						E(i);
						var l = F(I(i, 2), !0);
						E(n), R(() => {
							r = gi(n, 1, "theme-preset svelte-1n46o8q", null, r, { sel: z(Q) === z(t).id }), J(n, "title", `${z(t).name} - ${z(t).note}`), vi(a, `background:${z(t).light.bg ?? ""}`), vi(o, `background:${z(t).light.surface ?? ""}`), vi(s, `background:${z(t).light.accent ?? ""}`), vi(c, `background:${z(t).light.text ?? ""}`), U(l, z(t).name);
						}), B("click", n, () => Vf(z(t))), H(e, n);
					}), E(i);
					var a = I(i, 2), o = F(a, !0), s = I(a, 2), c = N(s);
					K(c);
					var l = I(c);
					E(s);
					var u = I(s, 2), d = (e) => {
						var t = u_(), n = N(t), r = F(n, !0), i = I(n, 2), a = N(i);
						let o;
						var s = F(a, !0), c = I(a, 2);
						let l;
						var u = F(c, !0);
						E(i), E(t), R((e, t, n, i) => {
							U(r, e), J(a, "title", t), o = gi(a, 1, "svelte-1n46o8q", null, o, { on: z(Vi) }), U(s, n), l = gi(c, 1, "svelte-1n46o8q", null, l, { on: !z(Vi) }), U(u, i);
						}, [
							() => Y("lbl.darkColors"),
							() => Y("hint.theme.autoDark"),
							() => Y("opt.auto"),
							() => Y("opt.custom")
						]), B("click", a, () => Of(!0)), B("click", c, () => Of(!1)), H(e, t);
					};
					W(u, (e) => {
						z(Bi) && e(d);
					});
					var p = I(u, 2), m = N(p), g = (e) => {
						var t = Xm(), n = F(t, !0);
						R((e) => U(n, e), [() => Y("lbl.light")]), H(e, t);
					};
					W(m, (e) => {
						z(Bi) && e(g);
					});
					var _ = I(m, 2);
					let Le;
					var v = F(_, !0);
					E(p);
					var y = I(p, 2);
					Jr(y, 21, () => zi, ([e, t, n]) => e, (e, t) => {
						var n = /* @__PURE__ */ k(() => h(z(t), 3));
						let r = () => z(n)[0], i = () => z(n)[1], a = () => z(n)[2];
						var o = d_(), s = N(o);
						{
							let e = /* @__PURE__ */ k(() => z(O).theme.tokens.color[r()] ?? df(r(), z(Ui))), t = /* @__PURE__ */ k(Ri);
							ba(s, {
								get value() {
									return z(e);
								},
								get tokens() {
									return z(t);
								},
								get label() {
									return i();
								},
								onchange: (e) => lf(r(), e)
							});
						}
						var c = I(s, 2), l = F(c, !0), u = F(I(c, 2), !0);
						E(o), R((e) => {
							U(l, a()), U(u, e);
						}, [() => Lf(z(O).theme.tokens.color[r()] ?? df(r(), z(Ui)), z(Ui))]), H(e, o);
					}), E(y);
					var b = I(y, 2), x = (e) => {
						var t = f_(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2);
						let o;
						var s = F(a, !0);
						E(n);
						var c = I(n, 2);
						let l;
						Jr(c, 21, () => zi, ([e, t, n]) => e, (e, t) => {
							var n = /* @__PURE__ */ k(() => h(z(t), 3));
							let r = () => z(n)[0], i = () => z(n)[1], a = () => z(n)[2];
							var o = d_(), s = N(o);
							{
								let e = /* @__PURE__ */ k(() => z(O).theme.alt.tokens.color[r()] ?? z(Wi)[r()] ?? df(r(), z(Wi))), t = /* @__PURE__ */ k(Ri), n = /* @__PURE__ */ k(() => Y("theme.darkColorLabel", { name: i() }));
								ba(s, {
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
							var c = I(s, 2), l = F(c, !0), u = F(I(c, 2), !0);
							E(o), R((e) => {
								U(l, a()), U(u, e);
							}, [() => Lf(z(O).theme.alt.tokens.color[r()] ?? z(Wi)[r()] ?? df(r(), z(Wi)), z(Wi))]), H(e, o);
						}), E(c), R((e, t, n) => {
							U(i, e), o = gi(a, 1, "chip svelte-1n46o8q", null, o, { accent: z(Hi) === "dark" }), J(a, "title", t), U(s, n), l = gi(c, 1, "palcells svelte-1n46o8q", null, l, { autopal: z(Vi) });
						}, [
							() => Y("lbl.dark"),
							() => Y("tip.theme.darkDefault"),
							() => Y("common.standard")
						]), B("click", a, () => Ef("dark")), H(e, t);
					};
					W(b, (e) => {
						z(Bi) && e(x);
					});
					var S = I(b, 2), ee = N(S), te = F(ee, !0), ne = I(ee, 2);
					let Re;
					var C = F(ne, !0);
					E(S);
					var re = I(S, 2), ie = N(re);
					{
						let t = /* @__PURE__ */ k(() => z(Bi) ? Y("lbl.light") : "");
						e(ie, () => z(Ui), () => z(t));
					}
					var ae = I(ie, 2), oe = (t) => {
						{
							let n = /* @__PURE__ */ k(() => Y("lbl.dark"));
							e(t, () => z(Wi), () => z(n));
						}
					};
					W(ae, (e) => {
						z(Bi) && e(oe);
					}), E(re);
					var ce = I(re, 2), w = N(ce), le = F(w, !0), ue = I(w, 2), de = N(ue), fe = N(de), T = I(fe);
					{
						let e = /* @__PURE__ */ k(() => jf("heading"));
						X(T, {
							get value() {
								return z(O).theme.tokens.font.heading;
							},
							get options() {
								return z(e);
							},
							onchange: (e) => xf("heading", e)
						});
					}
					E(de);
					var pe = I(de, 2), me = N(pe), he = I(me);
					{
						let e = /* @__PURE__ */ k(() => jf("body"));
						X(he, {
							get value() {
								return z(O).theme.tokens.font.body;
							},
							get options() {
								return z(e);
							},
							onchange: (e) => xf("body", e)
						});
					}
					E(pe);
					var ge = I(pe, 2), _e = N(ge), ve = F(_e, !0), ye = I(_e, 2), be = F(ye, !0);
					E(ge), E(ue), E(ce);
					var xe = I(ce, 2), Se = N(xe), Ce = F(Se, !0), we = I(Se, 2), Te = N(we), Ee = N(Te), De = F(Ee, !0), Oe = F(I(Ee, 2), !0);
					E(Te);
					var ke = I(Te, 2), Ae = N(ke, !0), je = F(I(Ae), !0);
					E(ke);
					var Me = I(ke, 2);
					K(Me);
					var Ne = I(Me, 2), Pe = N(Ne, !0), Fe = F(I(Pe), !0);
					E(Ne);
					var Ie = I(Ne, 2);
					K(Ie), E(we), E(xe), E(t), R((e, t, n, i, a, u, d, f, p, m, h, g, y, b, x, ee, re, ie, ae, oe, se) => {
						U(r, e), U(o, t), J(s, "title", n), Ci(c, z(Bi)), U(l, ` ${i ?? ""}`), Le = gi(_, 1, "chip svelte-1n46o8q", null, Le, { accent: z(Hi) === "light" }), J(_, "title", a), U(v, u), J(S, "title", d), U(te, f), Re = gi(ne, 1, "chip palauto svelte-1n46o8q", null, Re, { accent: z(ff) }), U(C, p), U(le, m), U(fe, `${h ?? ""} `), U(me, `${g ?? ""} `), vi(_e, `font-family:${z(O).theme.tokens.font.heading ?? ""}`), U(ve, y), vi(ye, `font-family:${z(O).theme.tokens.font.body ?? ""}`), U(be, b), U(Ce, x), vi(Te, `--r-sm:${z(O).theme.tokens.radius.sm ?? ""};--r-md:${z(O).theme.tokens.radius.md ?? ""}`), U(De, ee), U(Oe, re), U(Ae, ie), U(je, z(O).theme.tokens.radius.sm), q(Me, ae), U(Pe, oe), U(Fe, z(O).theme.tokens.radius.md), q(Ie, se);
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
						() => Mf(z(O).theme.tokens.radius.sm),
						() => Y("lbl.largeCorners"),
						() => Mf(z(O).theme.tokens.radius.md)
					]), B("change", c, (e) => Df(e.target.checked)), B("click", _, () => Ef("light")), B("click", ne, () => bf(!z(ff))), B("input", Me, (e) => Nf("sm", Number(e.target.value))), B("input", Ie, (e) => Nf("md", Number(e.target.value)));
				}
				H(e, t);
			}, te = (e) => {
				var t = v_();
				let n;
				var r = N(t);
				K(r);
				var i = I(r, 2), a = (e) => {
					var t = Nr();
					Jr(P(t), 17, () => ru(xv(), z(bv), (e) => e.label), (e) => e.label, (e, t) => {
						var n = Nr(), r = P(n), i = (e) => {
							var n = m_(), r = N(n), i = I(r);
							E(n), R((e) => {
								J(n, "title", e), U(r, `${z(t).label ?? ""} `);
							}, [() => Y("tip.webpAuto")]), B("change", i, wv), H(e, n);
						}, a = (e) => {
							var n = h_(), r = N(n), i = I(r);
							E(n), R((e) => {
								J(n, "title", e), U(r, `${z(t).label ?? ""} `);
							}, [() => Y("tip.blocks.galleryImages")]), B("change", i, Ov), H(e, n);
						}, o = (e) => {
							var n = km(), r = F(n, !0);
							R(() => U(r, z(t).label)), B("click", n, () => Sv(z(t))), H(e, n);
						};
						W(r, (e) => {
							z(t).act === "image" ? e(i) : z(t).act === "galleryImages" ? e(a, 1) : e(o, -1);
						}), H(e, n);
					}, (e) => {
						var t = em(), n = F(t, !0);
						R((e) => U(n, e), [() => Y("canvas.searchEmpty")]), H(e, t);
					}), H(e, t);
				}, o = /* @__PURE__ */ k(() => z(bv).trim()), s = (e) => {
					var t = __(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2), o = N(a), s = F(o, !0), c = I(o, 2), l = F(c, !0);
					E(a), E(n);
					var u = I(n, 2), d = F(u, !0), f = I(u, 2), p = N(f), m = I(p);
					E(f);
					var h = I(f, 2), g = F(h, !0), _ = I(h, 2), v = F(_, !0), y = I(_, 2), b = F(y, !0), x = I(y, 2), S = F(x, !0), ee = I(x, 2), te = F(ee, !0), ne = I(ee, 2), C = F(ne, !0), re = I(ne, 2), ie = F(re, !0), ae = I(re, 2), oe = F(ae, !0), se = I(ae, 2), ce = F(se, !0), w = I(se, 2), le = F(w, !0), ue = I(w, 2), de = F(ue, !0), fe = I(ue, 2), T = F(fe, !0), pe = I(fe, 2), me = F(pe, !0), he = I(pe, 2), ge = F(he, !0), _e = I(he, 2), ve = F(_e, !0), ye = I(_e, 2), be = F(ye, !0), xe = I(ye, 2), Se = F(xe, !0), Ce = I(xe, 2), we = N(Ce), Te = F(we, !0), Ee = I(we, 2), De = N(Ee), Oe = F(De, !0), ke = I(De, 2), Ae = N(ke), je = I(Ae);
					E(ke), E(Ee), E(Ce);
					var Me = I(Ce, 2), Ne = N(Me), Pe = F(Ne, !0), Fe = I(Ne, 2), Ie = N(Fe), Le = F(Ie, !0), Re = I(Ie, 2), ze = F(Re, !0), Be = I(Re, 2), Ve = F(Be, !0), He = I(Be, 2), Ue = F(He, !0), We = I(He, 2), Ge = F(We, !0);
					E(Fe), E(Me);
					var Ke = I(Me, 2), qe = N(Ke), Je = F(qe, !0), Ye = I(qe, 2), Xe = N(Ye), Ze = F(Xe, !0), Qe = I(Xe, 2), $e = F(Qe, !0), et = I(Qe, 2), D = F(et, !0), tt = I(et, 2), O = F(tt, !0), rt = I(tt, 2), it = F(rt, !0);
					E(Ye), E(Ke);
					var at = I(Ke, 2), ot = (e) => {
						let t = /* @__PURE__ */ k(() => z(xl).filter((e) => _l[e]?.data?.mal?.kind === "blocks"));
						var n = g_(), r = N(n), i = F(r, !0), a = I(r, 2);
						Jr(a, 20, () => z(t), (e) => e, (e, t) => {
							var n = km(), r = F(n, !0);
							R((e) => {
								J(n, "title", e), U(r, _l[t].data.mal.name);
							}, [() => Y("canvas.insertGroup")]), B("click", n, () => nt?.sendInsertTemplate(t)), H(e, n);
						}), E(a), E(n), R((e) => U(i, e), [() => Y("canvas.tabMyTemplates")]), H(e, n);
					}, st = /* @__PURE__ */ k(() => z(xl).some((e) => _l[e]?.data?.mal?.kind === "blocks"));
					W(at, (e) => {
						z(st) && e(ot);
					});
					var ct = I(at, 2), lt = (e) => {
						var t = g_(), n = N(t), r = F(n, !0), i = I(n, 2);
						Jr(i, 21, () => z(hp), (e) => e.type, (e, t) => {
							var n = Nr(), r = P(n), i = (e) => {
								var n = g_(), r = N(n), i = F(r, !0), a = I(r, 2);
								Jr(a, 21, () => z(t).variants, (e) => e.label, (e, n) => {
									var r = km(), i = F(r, !0);
									R((e) => {
										J(r, "title", e), U(i, z(n).label);
									}, [() => Y("tip.blocks.fromPlugin", { plugin: z(t).plugin })]), B("click", r, () => yv(z(t), z(n).props)), H(e, r);
								}), E(a), E(n), R(() => U(i, z(t).label)), H(e, n);
							}, a = (e) => {
								var n = km(), r = F(n, !0);
								R((e) => {
									J(n, "title", e), U(r, z(t).label);
								}, [() => Y("tip.blocks.fromPlugin", { plugin: z(t).plugin })]), B("click", n, () => yv(z(t))), H(e, n);
							};
							W(r, (e) => {
								z(t).variants?.length ? e(i) : e(a, -1);
							}), H(e, n);
						}), E(i), E(t), R((e) => U(r, e), [() => Y("panel.plugins")]), H(e, t);
					};
					W(ct, (e) => {
						z(hp).length && e(lt);
					}), R((e, t, n, r, a, o, u, m, Ce, we, Ee, E, je, Me, Ne, Fe, Ke, qe, Ye, Xe, Qe, et, tt, nt, rt, at, ot, st, ct, lt, ut, dt, ft, pt, mt, ht, gt, _t, vt, k, yt, bt, xt, St, Ct, wt, Tt, Et, Dt, Ot, kt, At, jt, Mt, Nt, Pt, Ft, It, Lt, Rt, zt, Bt, Vt) => {
						U(i, e), U(s, t), J(c, "title", n), U(l, r), U(d, a), J(f, "title", o), U(p, `${u ?? ""} `), J(h, "title", m), U(g, Ce), J(_, "title", we), U(v, Ee), J(y, "title", E), U(b, je), J(x, "title", Me), U(S, Ne), J(ee, "title", Fe), U(te, Ke), J(ne, "title", qe), U(C, Ye), J(re, "title", Xe), U(ie, Qe), J(ae, "title", et), U(oe, tt), J(se, "title", nt), U(ce, rt), J(w, "title", at), U(le, ot), J(ue, "title", st), U(de, ct), J(fe, "title", lt), U(T, ut), J(pe, "title", dt), U(me, ft), J(he, "title", pt), U(ge, mt), J(_e, "title", ht), U(ve, gt), J(ye, "title", _t), U(be, vt), J(xe, "title", k), U(Se, yt), U(Te, bt), J(De, "title", xt), U(Oe, St), J(ke, "title", Ct), U(Ae, `${wt ?? ""} `), U(Pe, Tt), J(Ie, "title", Et), U(Le, Dt), J(Re, "title", Ot), U(ze, kt), J(Be, "title", At), U(Ve, jt), J(He, "title", Mt), U(Ue, Nt), J(We, "title", Pt), U(Ge, Ft), U(Je, It), U(Ze, Lt), U($e, Rt), U(D, zt), U(O, Bt), U(it, Vt);
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
						() => Y("group.shapes"),
						() => Y("shape.line"),
						() => Y("shape.arrow"),
						() => Y("shape.circle"),
						() => Y("shape.rect"),
						() => Y("shape.triangle")
					]), B("click", o, () => mp("text")), B("click", c, () => mp("text-box")), B("click", u, () => mp("button")), B("change", m, wv), B("click", h, () => mp("video")), B("click", _, () => mp("icon")), B("click", y, () => mp("map")), B("click", x, () => mp("form")), B("click", ee, () => mp("collection")), B("click", ne, () => mp("faq")), B("click", re, () => mp("timeline")), B("click", ae, () => mp("quote")), B("click", se, () => mp("stats")), B("click", w, () => mp("ribbon")), B("click", ue, () => mp("table")), B("click", fe, () => mp("share")), B("click", pe, () => mp("countdown")), B("click", he, () => mp("audio")), B("click", _e, () => mp("product")), B("click", ye, () => mp("cart")), B("click", xe, () => mp("checkout")), B("click", De, () => mp("gallery")), B("change", je, Ov), B("click", Ie, () => mp("calendar")), B("click", Re, () => mp("calendar-cards")), B("click", Be, () => mp("calendar-month")), B("click", He, () => mp("calendar-next")), B("click", We, () => mp("calendar-agenda")), B("click", Xe, () => mp("shape-line")), B("click", Qe, () => mp("shape-arrow")), B("click", et, () => mp("shape-circle")), B("click", tt, () => mp("shape-rect")), B("click", rt, () => mp("shape-triangle")), H(e, t);
				};
				W(i, (e) => {
					z(o) ? e(a) : e(s, -1);
				}), E(t), R((e, i, a) => {
					n = gi(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: z(je) === "mobile" }), J(t, "title", e), J(r, "placeholder", i), J(r, "title", a);
				}, [
					() => z(je) === "mobile" ? Y("tip.blocks.mobileLocked") : void 0,
					() => Y("canvas.searchBlocks"),
					() => Y("canvas.searchBlocks")
				]), Di(r, () => z(bv), (e) => j(bv, e)), H(e, t);
			}, ne = (e) => {
				var t = y_(), n = N(t), r = N(n), i = F(I(r));
				E(n);
				var a = I(n, 2);
				K(a);
				var o = I(a, 2), s = N(o);
				K(s);
				var c = I(s);
				E(o), E(t), R((e, t) => {
					U(r, `${e ?? ""} `), U(i, `${z(_e).size ?? ""} px`), q(a, z(_e).size), Ci(s, z(_e).snap !== !1), U(c, ` ${t ?? ""}`);
				}, [() => Y("lbl.gridSize"), () => Y("lbl.gridSnap")]), B("input", a, (e) => ma("size", Number(e.target.value))), B("change", s, (e) => ma("snap", e.target.checked)), H(e, t);
			}, re = (e) => {
				var t = E_(), n = N(t), r = (e) => {
					var t = th(), n = P(t), r = F(n, !0), i = I(n, 2);
					c(i), R((e) => U(r, e), [() => Y("blocks.suffix", { label: mr[z(M).type] ?? z(M).type })]), H(e, t);
				}, i = (e) => {
					var t = T_(), n = P(t), r = F(n, !0), i = I(n, 2), o = N(i), s = I(o);
					K(s), E(i);
					var c = I(i, 4), l = N(c);
					K(l);
					var u = I(l);
					E(c);
					var d = I(c, 2), f = (e) => {
						var t = b_(), n = P(t), r = N(n), i = F(I(r));
						E(n);
						var a = I(n, 2);
						K(a), R((e) => {
							U(r, `${e ?? ""} `), U(i, `${z(vr).size ?? ""} px`), q(a, z(vr).size);
						}, [() => Y("lbl.gridSize")]), B("input", a, (e) => pa("size", Number(e.target.value))), H(e, t);
					};
					W(d, (e) => {
						z(vr) && e(f);
					});
					var p = I(d, 4), m = F(p, !0), g = I(p, 2);
					Jr(g, 21, () => [["", "common.standard"], ...Object.entries(du)], ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ k(() => h(z(t), 2));
						let r = () => z(n)[0], i = () => z(n)[1], a = /* @__PURE__ */ k(() => V(r()));
						var o = x_();
						let s;
						var c = N(o), l = N(c), u = I(l, 2), d = I(u, 2);
						E(c);
						var f = F(I(c, 2), !0);
						E(o), R((e, t) => {
							s = gi(o, 1, "rs-card svelte-1n46o8q", null, s, { on: z(Tr) === r() }), J(o, "title", e), vi(c, `background: ${z(a).bg ?? ""}`), vi(l, `background: ${z(a).text ?? ""}`), vi(u, `background: ${z(a).surface ?? ""}`), vi(d, `background: ${z(a).accent ?? ""}`), U(f, t);
						}, [() => Y("tip.props.sectionTheme"), () => Y(i())]), B("click", o, () => jr(r())), H(e, o);
					}), E(g);
					var _ = I(g, 2), v = N(_), y = I(v), b = N(y), x = F(b), S = I(b, 2);
					G(S, () => C.copy, !0), E(S), E(y), E(_);
					var ee = I(_, 4), te = F(ee, !0), ne = I(ee, 2);
					a(ne, () => z(Mi), () => z(br));
					var re = I(ne, 4), ie = F(re, !0), ae = I(re, 2);
					Jr(ae, 16, () => [["top", "lbl.dividerTop"], ["bottom", "lbl.dividerBottom"]], ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ k(() => h(t, 2));
						let r = () => z(n)[0], i = () => z(n)[1], a = /* @__PURE__ */ k(() => z(Er)[r()]);
						var o = xp(), s = P(o), c = N(s), l = I(c);
						{
							let e = /* @__PURE__ */ k(() => z(a)?.shape ?? ""), t = /* @__PURE__ */ k(() => [["", Y("common.none")], ...Hu.map((e) => [e, Y(`opt.divider.${e}`)])]);
							X(l, {
								get value() {
									return z(e);
								},
								get options() {
									return z(t);
								},
								onchange: (e) => oa(r(), "shape", e)
							});
						}
						E(s);
						var u = I(s, 2), d = (e) => {
							var t = S_(), n = P(t), i = N(n), o = F(i, !0), s = I(i, 2);
							K(s);
							var c = F(I(s, 2));
							E(n);
							var l = I(n, 2), u = N(l), d = I(u);
							{
								let e = /* @__PURE__ */ k(() => z(a).color ?? "bg"), t = /* @__PURE__ */ k(Ri), n = /* @__PURE__ */ k(() => Y("tip.divider.color"));
								ba(d, {
									get value() {
										return z(e);
									},
									get tokens() {
										return z(t);
									},
									get label() {
										return z(n);
									},
									onchange: (e) => oa(r(), "color", e)
								});
							}
							E(l);
							var f = I(l, 2), p = N(f);
							K(p);
							var m = I(p);
							E(f);
							var h = I(f, 2), g = N(h);
							K(g);
							var _ = I(g);
							E(h), R((e, t, n, r, i, d, v) => {
								U(o, e), J(s, "min", Uu.min), J(s, "max", Uu.max), q(s, z(a).height ?? Uu.dflt), U(c, `${z(a).height ?? Uu.dflt ?? ""} px`), J(l, "title", t), U(u, `${n ?? ""} `), J(f, "title", r), Ci(p, z(a).flip === !0), U(m, ` ${i ?? ""}`), J(h, "title", d), Ci(g, z(a).invert === !0), U(_, ` ${v ?? ""}`);
							}, [
								() => Y("lbl.height"),
								() => Y("tip.divider.color"),
								() => Y("lbl.color"),
								() => Y("tip.divider.flip"),
								() => Y("lbl.dividerFlip"),
								() => Y("tip.divider.invert"),
								() => Y("lbl.patternInvert")
							]), B("input", s, (e) => oa(r(), "height", e.target.valueAsNumber)), B("change", p, (e) => oa(r(), "flip", e.target.checked)), B("change", g, (e) => oa(r(), "invert", e.target.checked)), H(e, t);
						};
						W(u, (e) => {
							z(a)?.shape && e(d);
						}), R((e, t) => {
							J(s, "title", e), U(c, `${t ?? ""} `);
						}, [() => Y("tip.props.dividers"), () => Y(i())]), H(e, o);
					});
					var oe = I(ae, 4), se = N(oe), ce = I(se);
					{
						let e = /* @__PURE__ */ k(() => Ki(z(Sr)) ? z(Sr).type : "");
						X(ce, {
							get value() {
								return z(e);
							},
							get options() {
								return Xi;
							},
							onchange: (e) => aa(e || null)
						});
					}
					E(oe);
					var w = I(oe, 2), le = (e) => {
						var t = w_(), n = P(t), r = N(n), i = I(r);
						K(i), E(n);
						var a = I(n, 2), o = N(a), s = I(o);
						K(s), E(a);
						var c = I(a, 2), l = (e) => {
							var t = C_(), n = P(t), r = N(n), i = I(r);
							{
								let e = /* @__PURE__ */ k(() => z(Sr).props.effect ?? "slide-up"), t = /* @__PURE__ */ k(() => [
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
									onchange: (e) => la("effect", e)
								});
							}
							E(n);
							var a = I(n, 2), o = N(a), s = I(o);
							K(s), E(a);
							var c = I(a, 2), l = N(c), u = I(l);
							{
								let e = /* @__PURE__ */ k(() => z(Sr).props.pattern ?? "sequence"), t = /* @__PURE__ */ k(() => [
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
									onchange: (e) => la("pattern", e)
								});
							}
							E(c), R((e, t, i, u, d, f) => {
								J(n, "title", e), U(r, `${t ?? ""} `), J(a, "title", i), U(o, `${u ?? ""} `), q(s, z(Sr).props.step ?? 90), J(c, "title", d), U(l, `${f ?? ""} `);
							}, [
								() => Y("tip.props.staggerEffect"),
								() => Y("lbl.staggerEffect"),
								() => Y("tip.props.staggerStep"),
								() => Y("lbl.stepMs"),
								() => Y("tip.props.staggerPattern"),
								() => Y("lbl.pattern")
							]), B("change", s, (e) => ca("step", Number(e.target.value))), H(e, t);
						};
						W(c, (e) => {
							z(Sr).type === "stagger" && e(l);
						}), R((e, t) => {
							U(r, `${e ?? ""} `), q(i, z(Sr).props.duration), U(o, `${t ?? ""} `), q(s, z(Sr).props.delay ?? 0);
						}, [() => Y("lbl.durationMs"), () => Y("lbl.delayMs")]), B("change", i, (e) => ca("duration", Number(e.target.value))), B("change", s, (e) => ca("delay", Number(e.target.value))), H(e, t);
					}, ue = /* @__PURE__ */ k(() => Ki(z(Sr)));
					W(w, (e) => {
						z(ue) && e(le);
					});
					var de = I(w, 2), fe = N(de), T = I(fe);
					{
						let e = /* @__PURE__ */ k(() => z(wr)?.type ?? (z(Sr) && !Ki(z(Sr)) ? z(Sr).type : ""));
						X(T, {
							get value() {
								return z(e);
							},
							get options() {
								return Qi;
							},
							onchange: (e) => sa(e || null)
						});
					}
					E(de), R((e, t, n, a, c, d, f, h, g, y, b, ee, ne, C, ae, ce, w) => {
						U(r, e), J(i, "title", t), U(o, `${n ?? ""} `), q(s, z(yr)), J(s, "placeholder", a), Ci(l, z(vr) !== null), U(u, ` ${c ?? ""}`), J(p, "title", d), U(m, f), J(_, "title", h), U(v, `${g ?? ""} `), U(x, `#${z(_r) ?? ""}`), J(S, "title", y), U(te, b), J(re, "title", ee), U(ie, ne), J(oe, "title", C), U(se, `${ae ?? ""} `), J(de, "title", ce), U(fe, `${w ?? ""} `);
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
					]), B("change", s, (e) => ua(e.target.value)), B("change", l, (e) => fa(e.target.checked)), B("click", S, () => navigator.clipboard?.writeText(`#${z(_r)}`)), H(e, t);
				}, o = (e) => {
					var t = em(), n = F(t, !0);
					R((e) => U(n, e), [() => Y("hint.props.empty")]), H(e, t);
				};
				W(n, (e) => {
					z(M) ? e(r) : z(_r) ? e(i, 1) : e(o, -1);
				}), E(t), H(e, t);
			}, ie = (e) => {
				var t = N_(), n = N(t), r = N(n);
				K(r);
				var i = I(r);
				E(n);
				var s = I(n, 2), c = (e) => {
					var t = g_(), n = N(t), r = F(n, !0), i = I(n, 2);
					Jr(i, 21, () => z(O).pages ?? [], (e) => e.id, (e, t) => {
						var n = um(), r = N(n);
						K(r);
						var i = I(r);
						E(n), R((e, a) => {
							J(n, "title", e), Ci(r, a), U(i, ` ${(z(t).title || z(t).id) ?? ""}`);
						}, [() => Y("tip.footer.hideOnPage"), () => !(z(O).footer?.hideOn ?? []).includes(z(t).id)]), B("change", r, (e) => pd(z(t).id, e.target.checked)), H(e, n);
					}), E(i), E(t), R((e) => U(r, e), [() => Y("group.showOnPages")]), H(e, t);
				};
				W(s, (e) => {
					z(O).footer?.show && e(c);
				});
				var l = I(s, 2), u = N(l), d = F(u, !0), f = I(u, 2), p = N(f);
				Jr(p, 21, () => ed, (e) => e.id, (e, t) => {
					var n = D_(), r = N(n);
					G(r, () => Af(z(t).thumb), !0), E(r);
					var i = F(I(r, 2), !0);
					E(n), R((e) => {
						J(n, "title", e), U(i, z(t).label);
					}, [() => Y("tip.footer.template", { label: z(t).label })]), B("click", n, () => nd(z(t).id)), H(e, n);
				}), E(p), E(f), E(l);
				var m = I(l, 2), h = N(m), g = F(h, !0), _ = I(h, 2), v = N(_), y = N(v), b = I(y);
				K(b), E(v);
				var x = I(v, 2), S = N(x), ee = I(S);
				K(ee), E(x);
				var te = I(x, 2), ne = N(te), re = I(ne);
				{
					let e = /* @__PURE__ */ k(() => z(O).footer?.brand?.mode ?? "text"), t = /* @__PURE__ */ k(() => [
						["text", Y("blocks.text")],
						["image", Y("opt.brand.image")],
						["both", Y("opt.brand.both")]
					]);
					X(re, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => qu(e)
					});
				}
				E(te);
				var ie = I(te, 2), ae = (e) => {
					var t = k_(), n = P(t), r = N(n), i = N(r), a = I(i);
					E(r);
					var o = I(r, 2), s = (e) => {
						var t = wp();
						G(t, () => C.cross, !0), E(t), R((e) => J(t, "title", e), [() => Y("tip.footer.removeLogo")]), B("click", t, Xu), H(e, t);
					};
					W(o, (e) => {
						z(O).footer?.brand?.logo && e(s);
					}), E(n);
					var c = I(n, 2), l = (e) => {
						var t = O_(), n = P(t), r = N(n), i = F(I(r));
						E(n);
						var a = I(n, 2);
						K(a), R((e) => {
							U(r, `${e ?? ""} `), U(i, `${z(O).footer?.brand?.logoHeight ?? 40 ?? ""} px`), q(a, z(O).footer?.brand?.logoHeight ?? 40);
						}, [() => Y("lbl.logoHeight")]), B("input", a, (e) => Qu(e.target.value)), H(e, t);
					};
					W(c, (e) => {
						z(O).footer?.brand?.logo && e(l);
					}), R((e, t) => {
						J(r, "title", e), U(i, `${t ?? ""} `);
					}, [() => Y("tip.webpAutoPublish"), () => z(O).footer?.brand?.logo ? Y("ui.changeLogo") : Y("ui.uploadLogo")]), B("change", a, Ju), H(e, t);
				};
				W(ie, (e) => {
					(z(O).footer?.brand?.mode ?? "text") !== "text" && e(ae);
				}), E(_), E(m);
				var oe = I(m, 2), se = N(oe), ce = F(se, !0), w = I(se, 2), le = N(w);
				Jr(le, 17, () => z(O).footer?.columns ?? [], Wr, (e, t, n) => {
					var r = A_(), i = P(r), a = N(i);
					K(a);
					var o = I(a, 2), s = N(o);
					G(s, () => C.plus, !0), E(s);
					var c = I(s, 2);
					c.disabled = n === 0, G(c, () => C.up, !0), E(c);
					var l = I(c, 2);
					G(l, () => C.down, !0), E(l);
					var u = I(l, 2);
					G(u, () => C.cross, !0), E(u), E(o), E(i), Jr(I(i, 2), 17, () => z(t).links ?? [], Wr, (e, r, i) => {
						var a = Zp(), o = N(a);
						K(o);
						var s = I(o, 2), c = N(s);
						c.disabled = i === 0, G(c, () => C.up, !0), E(c);
						var l = I(c, 2);
						G(l, () => C.down, !0), E(l);
						var u = I(l, 2);
						G(u, () => C.cross, !0), E(u), E(s);
						var d = I(s, 2), f = N(d);
						{
							let e = /* @__PURE__ */ k(() => z(r).page ?? "__href"), t = /* @__PURE__ */ k(() => Y("tip.linkTarget")), a = /* @__PURE__ */ k(() => [...z(O).pages.map((e) => [e.id, e.title]), ["__href", Y("opt.linkHref")]]);
							X(f, {
								get value() {
									return z(e);
								},
								get title() {
									return z(t);
								},
								get options() {
									return z(a);
								},
								onchange: (e) => Sd(n, i, e)
							});
						}
						E(d);
						var p = I(d, 2), m = (e) => {
							var t = Xp();
							K(t), R((e, n) => {
								q(t, z(r).href ?? ""), J(t, "placeholder", e), J(t, "title", n);
							}, [() => Y("ph.hrefAnchor"), () => Y("tip.hrefAnchor")]), B("change", t, (e) => wd(n, i, e.target.value)), H(e, t);
						};
						W(p, (e) => {
							z(r).page || e(m);
						}), E(a), R((e, n) => {
							q(o, z(r).label), J(o, "title", e), l.disabled = i === z(t).links.length - 1, J(u, "title", n);
						}, [() => Y("tip.linkLabel"), () => Y("tip.removeLink")]), B("input", o, (e) => xd(n, i, e.target.value)), B("click", c, () => bd(n, i, -1)), B("click", l, () => bd(n, i, 1)), B("click", u, () => yd(n, i)), H(e, a);
					}), R((e, r, i) => {
						q(a, z(t).title), J(a, "title", e), J(s, "title", r), l.disabled = n === z(O).footer.columns.length - 1, J(u, "title", i);
					}, [
						() => Y("tip.footer.columnTitle"),
						() => Y("tip.footer.addLink"),
						() => Y("tip.footer.removeColumn")
					]), B("input", a, (e) => _d(n, e.target.value)), B("click", s, () => vd(n)), B("click", c, () => gd(n, -1)), B("click", l, () => gd(n, 1)), B("click", u, () => hd(n)), H(e, r);
				});
				var ue = I(le, 2), de = F(ue, !0), fe = I(ue, 2), T = N(fe), pe = I(T);
				{
					let e = /* @__PURE__ */ k(() => z(O).footer?.columnsAlign ?? "left"), t = /* @__PURE__ */ k(() => [["left", Y("common.left")], ["center", Y("common.center")]]);
					X(pe, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => ld(e)
					});
				}
				E(fe), E(w), E(oe);
				var me = I(oe, 2), he = N(me), ge = F(he, !0), _e = I(he, 2), ve = N(_e);
				Jr(ve, 17, () => z(O).footer?.social ?? [], Wr, (e, t, n) => {
					var r = j_(), i = N(r), a = N(i);
					G(a, () => no(z(t).icon) || "", !0), E(a);
					var o = I(a, 2);
					{
						let e = /* @__PURE__ */ k(() => Y("blocks.icon"));
						X(o, {
							get value() {
								return z(t).icon;
							},
							get title() {
								return z(e);
							},
							get options() {
								return Fd;
							},
							onchange: (e) => Nd(n, e)
						});
					}
					E(i);
					var s = I(i, 2), c = N(s);
					c.disabled = n === 0, G(c, () => C.up, !0), E(c);
					var l = I(c, 2);
					G(l, () => C.down, !0), E(l);
					var u = I(l, 2);
					G(u, () => C.cross, !0), E(u), E(s);
					var d = I(s, 2);
					K(d), E(r), R((e, r) => {
						l.disabled = n === z(O).footer.social.length - 1, J(u, "title", e), q(d, z(t).url), J(d, "placeholder", r);
					}, [() => Y("tip.removeLink"), () => Y("ph.hrefMailto")]), B("click", c, () => Md(n, -1)), B("click", l, () => Md(n, 1)), B("click", u, () => jd(n)), B("change", d, (e) => Pd(n, e.target.value)), H(e, r);
				});
				var ye = I(ve, 2), be = F(ye, !0);
				E(_e), E(me);
				var xe = I(me, 2), Se = N(xe), Ce = F(Se, !0), we = I(Se, 2), Te = N(we), Ee = N(Te);
				K(Ee);
				var De = I(Ee);
				E(Te);
				var ke = I(Te, 2), Ae = (e) => {
					let t = /* @__PURE__ */ k(() => z(O).footer.cta);
					var n = M_(), r = P(n), i = N(r), a = I(i);
					{
						let e = /* @__PURE__ */ k(() => z(t).kind ?? "button"), n = /* @__PURE__ */ k(() => [["button", Y("opt.cta.button")], ["newsletter", Y("opt.cta.newsletter")]]);
						X(a, {
							get value() {
								return z(e);
							},
							get options() {
								return z(n);
							},
							onchange: (e) => dd("kind", e)
						});
					}
					E(r);
					var o = I(r, 2), s = N(o);
					K(s);
					var c = I(s);
					E(o);
					var l = I(o, 2), u = N(l), d = I(u);
					K(d), E(l);
					var f = I(l, 2), p = N(f), m = I(p);
					K(m), E(f);
					var h = I(f, 2), g = N(h), _ = I(g);
					K(_), E(h);
					var v = I(h, 2), y = (e) => {
						var n = xp(), r = P(n), i = N(r), a = I(i);
						{
							let e = /* @__PURE__ */ k(() => z(t).page ?? "__href"), n = /* @__PURE__ */ k(() => [...z(O).pages.map((e) => [e.id, e.title]), ["__href", Y("opt.linkHrefMailto")]]);
							X(a, {
								get value() {
									return z(e);
								},
								get options() {
									return z(n);
								},
								onchange: (e) => fd(e)
							});
						}
						E(r);
						var o = I(r, 2), s = (e) => {
							var n = rm();
							K(n), R((e, r) => {
								q(n, z(t).href ?? ""), J(n, "placeholder", e), J(n, "title", r);
							}, [() => Y("ph.hrefMailtoAnchor"), () => Y("tip.hrefAnchor")]), B("change", n, (e) => dd("href", e.target.value)), H(e, n);
						};
						W(o, (e) => {
							z(t).page || e(s);
						}), R((e, t) => {
							J(r, "title", e), U(i, `${t ?? ""} `);
						}, [() => Y("tip.footer.ctaTarget"), () => Y("lbl.buttonTarget")]), H(e, n);
					}, b = (e) => {
						var n = Sm(), r = P(n), i = N(r), a = I(i);
						K(a), E(r);
						var o = I(r, 2), s = N(o), c = I(s);
						K(c), E(o);
						var l = I(o, 2), u = N(l), d = I(u);
						K(d), E(l), R((e, n, f, p, m, h, g, _, v) => {
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
						]), B("change", a, (e) => dd("endpoint", e.target.value)), B("change", c, (e) => dd("recipient", e.target.value)), B("input", d, (e) => dd("success", e.target.value)), H(e, n);
					};
					W(v, (e) => {
						(z(t).kind ?? "button") === "button" ? e(y) : e(b, -1);
					}), R((e, n, a, v, y, b, x, S, ee, te, ne, C) => {
						J(r, "title", e), U(i, `${n ?? ""} `), J(o, "title", a), Ci(s, z(t).big === !0), U(c, ` ${v ?? ""}`), J(l, "title", y), U(u, `${b ?? ""} `), q(d, z(t).heading ?? ""), J(d, "placeholder", x), J(f, "title", S), U(p, `${ee ?? ""} `), q(m, z(t).sub ?? ""), J(h, "title", te), U(g, `${ne ?? ""} `), q(_, z(t).label ?? ""), J(_, "placeholder", C);
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
					]), B("change", s, (e) => dd("big", e.target.checked)), B("input", d, (e) => dd("heading", e.target.value)), B("input", m, (e) => dd("sub", e.target.value)), B("input", _, (e) => dd("label", e.target.value)), H(e, n);
				};
				W(ke, (e) => {
					z(O).footer?.cta && e(Ae);
				}), E(we), E(xe);
				var je = I(xe, 2), Me = N(je), Ne = F(Me, !0), Pe = I(Me, 2), Fe = N(Pe);
				o(Fe, () => "linkRow", () => z(O).footer?.linkRow ?? []);
				var Ie = I(Fe, 2), Le = F(Ie, !0);
				E(Pe), E(je);
				var Re = I(je, 2), ze = N(Re), Be = F(ze, !0), Ve = I(ze, 2), He = N(Ve), Ue = (e) => {
					var t = hh(), n = P(t), r = N(n), i = I(r);
					{
						let e = /* @__PURE__ */ k(() => z(O).footer?.align ?? "left"), t = /* @__PURE__ */ k(() => [
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
							onchange: (e) => Gu("footer", (t) => {
								t.align = e;
							})
						});
					}
					E(n), Oe(2), R((e, t) => {
						J(n, "title", e), U(r, `${t ?? ""} `);
					}, [() => Y("tip.footer.align"), () => Y("lbl.align")]), H(e, t);
				};
				W(He, (e) => {
					z(O).footer?.cta?.big !== !0 && e(Ue);
				});
				var We = I(He, 2), Ge = F(We, !0), Ke = I(We, 2);
				a(Ke, () => Pi, () => z(O).footer?.background?.layers ?? []), E(Ve), E(Re);
				var qe = I(Re, 2), Je = N(qe), Ye = F(Je, !0), Xe = I(Je, 2), Ze = N(Xe), Qe = N(Ze), $e = I(Qe);
				K($e), E(Ze);
				var et = I(Ze, 2), D = F(et, !0), tt = I(et, 2);
				o(tt, () => "baseline", () => z(O).footer?.baseline ?? []);
				var nt = I(tt, 2), rt = F(nt, !0);
				E(Xe), E(qe), E(t), R((e, t, a, o, s, c, l, u, f, p, m, h, _, C, re, ie, ae, oe, se, w, le, ue, pe, me, he, _e, ve, ye, xe, Se, we, E) => {
					J(n, "title", e), Ci(r, t), U(i, ` ${a ?? ""}`), U(d, o), U(g, s), J(v, "title", c), U(y, `${l ?? ""} `), q(b, z(O).footer?.brand?.title ?? ""), J(b, "placeholder", u), J(x, "title", f), U(S, `${p ?? ""} `), q(ee, z(O).footer?.brand?.tagline ?? ""), J(te, "title", m), U(ne, `${h ?? ""} `), U(ce, _), U(de, C), J(fe, "title", re), U(T, `${ie ?? ""} `), U(ge, ae), U(be, oe), U(Ce, se), J(Te, "title", w), Ci(Ee, le), U(De, ` ${ue ?? ""}`), U(Ne, pe), U(Le, me), U(Be, he), U(Ge, _e), U(Ye, ve), J(Ze, "title", ye), U(Qe, `${xe ?? ""} `), q($e, z(O).footer?.copyright ?? ""), J($e, "placeholder", Se), U(D, we), U(rt, E);
				}, [
					() => Y("tip.footer.show"),
					() => !!z(O).footer?.show,
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
					() => !!z(O).footer?.cta,
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
				]), B("change", r, (e) => Gu("footer", (t) => {
					t.show = e.target.checked;
				})), B("input", b, (e) => Ku("title", e.target.value)), B("input", ee, (e) => Ku("tagline", e.target.value)), B("click", ue, md), B("click", ye, Ad), B("change", Ee, (e) => ud(e.target.checked)), B("click", Ie, () => rd("linkRow")), B("input", $e, (e) => $u(e.target.value)), B("click", nt, () => rd("baseline")), H(e, t);
			}, ae = (e) => {
				var t = V_(), n = N(t), r = (e) => {
					var t = Bp(), n = N(t), r = I(n);
					{
						let e = /* @__PURE__ */ k(() => z(sl) ?? ""), t = /* @__PURE__ */ k(() => [["", Y("common.choose")], ...z(al).map((e) => [e, z(ol)[e]?.name ?? e])]);
						X(r, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => j(sl, e || null, !0)
						});
					}
					E(t), R((e) => U(n, `${e ?? ""} `), [() => Y("blocks.collection")]), H(e, t);
				};
				W(n, (e) => {
					z(al).length && e(r);
				});
				var i = I(n, 2), a = (e) => {
					let t = /* @__PURE__ */ k(() => z(ol)[z(sl)]);
					var n = B_(), r = P(n), i = N(r), a = F(i, !0), o = I(i, 2), s = F(o, !0), c = I(o, 2), l = N(c), u = I(l);
					E(c);
					var d = I(c, 2);
					G(d, () => C.cross, !0), E(d), E(r);
					var f = I(r, 2);
					Jr(f, 19, () => z(t).entries, (e) => e.id, (e, n, r) => {
						var i = z_(), a = N(i), o = F(a), s = I(a, 2), c = N(s), l = N(c);
						K(l);
						var u = I(l, 2), d = N(u);
						G(d, () => C.up, !0), E(d);
						var f = I(d, 2);
						G(f, () => C.down, !0), E(f);
						var p = I(f, 2);
						G(p, () => C.cross, !0), E(p), E(u), E(c);
						var m = I(c, 2), h = (e) => {
							var t = P_(), r = N(t), i = I(r);
							K(i), E(t), R((e) => {
								U(r, `${e ?? ""} `), q(i, z(n).date ?? "");
							}, [() => Y("lbl.date")]), B("change", i, (e) => Vl(z(sl), z(n).id, "date", e.target.value)), H(e, t);
						};
						W(m, (e) => {
							z(t).kind !== "products" && e(h);
						});
						var g = I(m, 2);
						st(g);
						var _ = I(g, 2), v = (e) => {
							var t = tm(), r = N(t), i = I(r);
							K(i), E(t), R((e, t) => {
								U(r, `${e ?? ""} `), q(i, z(n).href ?? ""), J(i, "placeholder", t);
							}, [() => Y("lbl.link"), () => Y("ph.collections.href")]), B("change", i, (e) => Vl(z(sl), z(n).id, "href", e.target.value)), H(e, t);
						};
						W(_, (e) => {
							z(t).kind !== "products" && e(v);
						});
						var y = I(_, 2), b = N(y), x = N(b), S = I(x);
						E(b);
						var ee = I(b, 2), te = (e) => {
							var t = F_(), r = P(t), i = I(r, 2);
							G(i, () => C.cross, !0), E(i), R((e) => {
								J(r, "src", z(n).image), J(i, "title", e);
							}, [() => Y("tip.removeImage")]), B("click", i, () => Vl(z(sl), z(n).id, "image", "")), H(e, t);
						};
						W(ee, (e) => {
							z(n).image && e(te);
						}), E(y);
						var ne = I(y, 2), re = (e) => {
							var t = R_(), r = P(t), i = N(r), a = I(i);
							K(a), E(r);
							var o = I(r, 2), s = N(o), c = I(s);
							K(c), E(o);
							var l = I(o, 2), u = N(l), d = I(u);
							K(d), E(l);
							var f = I(l, 2), p = N(f), m = I(p);
							K(m), E(f);
							var h = I(f, 2);
							Jr(h, 17, () => z(n).colors ?? [], Wr, (e, t, r) => {
								var i = L_(), a = N(i);
								K(a);
								var o = I(a, 2), s = N(o), c = I(s);
								E(o);
								var l = I(o, 2), u = (e) => {
									var n = I_();
									R(() => J(n, "src", z(t).image)), H(e, n);
								};
								W(l, (e) => {
									z(t).image && e(u);
								});
								var d = I(l, 2);
								G(d, () => C.cross, !0), E(d), E(i), R((e, n) => {
									q(a, z(t).name), J(a, "placeholder", e), U(s, `${n ?? ""} `);
								}, [() => Y("ph.colorName"), () => z(t).image ? Y("ui.changeImage") : Y("ui.addImage")]), B("change", a, (e) => ql(z(sl), z(n).id, r, "name", e.target.value)), B("change", c, (e) => Jl(z(sl), z(n).id, r, e)), B("click", d, () => Yl(z(sl), z(n).id, r)), H(e, i);
							});
							var g = I(h, 2), _ = F(g, !0);
							R((e, t, r, h, v, y, b, x, S, ee, te) => {
								U(i, `${e ?? ""} `), q(a, z(n).price ?? ""), J(o, "title", t), U(s, `${r ?? ""} `), q(c, z(n).memberPrice ?? ""), J(l, "title", h), U(u, `${v ?? ""} `), q(d, z(n).badge ?? ""), J(f, "title", y), U(p, `${b ?? ""} `), q(m, x), J(m, "placeholder", S), J(g, "title", ee), U(_, te);
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
							]), B("change", a, (e) => Vl(z(sl), z(n).id, "price", e.target.value === "" ? "" : Number(e.target.value))), B("change", c, (e) => Vl(z(sl), z(n).id, "memberPrice", e.target.value === "" ? "" : Number(e.target.value))), B("change", d, (e) => Vl(z(sl), z(n).id, "badge", e.target.value)), B("change", m, (e) => Gl(z(sl), z(n).id, e.target.value)), B("click", g, () => Kl(z(sl), z(n).id)), H(e, t);
						};
						W(ne, (e) => {
							z(t).kind === "products" && e(re);
						}), E(s), E(i), R((e, i, a, s, c) => {
							U(o, `${e ?? ""}${z(t).kind === "products" ? z(n).price == null ? "" : ` · ${z(n).price}` : z(n).date ? ` · ${z(n).date}` : ""}`), q(l, z(n).title), J(l, "title", i), d.disabled = z(r) === 0, f.disabled = z(r) === z(t).entries.length - 1, J(p, "title", a), J(g, "placeholder", s), q(g, z(n).text ?? ""), U(x, `${c ?? ""} `);
						}, [
							() => Pl(z(n).title),
							() => Y("lbl.title"),
							() => Y("tip.collections.deleteEntry"),
							() => Y("ph.collections.text"),
							() => z(n).image ? Y("ui.changeImage") : Y("ui.addImage")
						]), B("change", l, (e) => Vl(z(sl), z(n).id, "title", e.target.value || Y("ui.untitled"))), B("click", d, () => Hl(z(sl), z(r), -1)), B("click", f, () => Hl(z(sl), z(r), 1)), B("click", p, () => Ul(z(sl), z(n).id)), B("change", g, (e) => Vl(z(sl), z(n).id, "text", e.target.value)), B("change", S, (e) => Wl(z(sl), z(n).id, e)), H(e, i);
					});
					var p = I(f, 2), m = (e) => {
						var t = em(), n = F(t, !0);
						R((e) => U(n, e), [() => Y("hint.collections.empty")]), H(e, t);
					};
					W(p, (e) => {
						z(t).entries.length || e(m);
					}), Oe(2), R((e, t, n, r, i, u) => {
						U(a, e), J(o, "title", t), U(s, n), J(c, "title", r), U(l, `${i ?? ""} `), J(d, "title", u);
					}, [
						() => Y("ui.addEntry"),
						() => Y("tip.collections.exportCsv"),
						() => Y("ui.exportCsv"),
						() => Y("tip.collections.importCsv"),
						() => Y("ui.importCsv"),
						() => Y("tip.collections.deleteCollection")
					]), B("click", i, () => Bl(z(sl))), B("click", o, () => Xl(z(sl))), B("change", u, (e) => Ql(z(sl), e)), B("click", d, () => zl(z(sl))), H(e, n);
				};
				W(i, (e) => {
					z(sl) && z(ol)[z(sl)] && e(a);
				});
				var o = I(i, 2), s = N(o), c = I(s);
				K(c), E(o);
				var l = I(o, 2), u = N(l);
				X(I(u), {
					get value() {
						return z(dl);
					},
					get options() {
						return hl;
					},
					onchange: (e) => j(dl, e, !0)
				}), E(l);
				var d = I(l, 2), f = F(d, !0);
				E(t), R((e, t, n, r, i) => {
					U(s, `${e ?? ""} `), J(c, "placeholder", t), U(u, `${n ?? ""} `), d.disabled = r, U(f, i);
				}, [
					() => Y("lbl.newCollectionName"),
					() => Y("ph.collections.name"),
					() => Y("common.type"),
					() => !z(ul).trim(),
					() => Y("ui.createCollection")
				]), B("keydown", c, (e) => e.key === "Enter" && Ll()), Di(c, () => z(ul), (e) => j(ul, e)), B("click", d, Ll), H(e, t);
			}, oe = (e) => {
				var t = J_(), n = N(t), r = (e) => {
					var t = em(), n = F(t, !0);
					R((e) => U(n, e), [() => Y("hint.plugins.empty")]), H(e, t);
				}, i = /* @__PURE__ */ k(() => !Su().length);
				W(n, (e) => {
					z(i) && e(r);
				});
				var a = I(n, 2);
				Jr(a, 16, Su, (e) => e, (e, t) => {
					let n = /* @__PURE__ */ k(() => uu[t]), r = /* @__PURE__ */ k(() => (z(lu)?.enabled ?? []).includes(t));
					var i = W_();
					let a;
					var o = N(i), s = N(o), c = F(s, !0), l = I(s, 2), u = (e) => {
						var t = H_(), r = F(t);
						R(() => U(r, `v${z(n).version ?? ""}`)), H(e, t);
					};
					W(l, (e) => {
						z(n)?.version && e(u);
					});
					var d = I(l, 2), f = N(d), p = N(f);
					K(p);
					var m = I(p);
					E(f);
					var h = I(f, 2);
					G(h, () => C.cross, !0), E(h), E(d), E(o);
					var g = I(o, 2), _ = (e) => {
						var t = U_(), r = F(t, !0);
						R((e) => U(r, e), [() => z(n).errors.join("; ")]), H(e, t);
					}, v = (e) => {
						var t = U_(), r = F(t, !0);
						R((e) => U(r, e), [() => Y("plugin.engineMismatch", {
							required: z(n).requiresEngine,
							current: z(gu)
						})]), H(e, t);
					}, y = (e) => {
						var t = U_(), r = F(t, !0);
						R((e) => U(r, e), [() => Y("plugin.cspNeeded", { list: Eu(z(n).csp).join(", ") })]), H(e, t);
					}, b = /* @__PURE__ */ k(() => z(n)?.csp && Eu(z(n).csp).length);
					W(g, (e) => {
						z(n)?.errors?.length ? e(_) : z(n) && !z(n).satisfied ? e(v, 1) : z(b) && e(y, 2);
					});
					var x = I(g, 2), S = (e) => {
						var t = em(), r = F(t, !0);
						R((e) => U(r, e), [() => Y("plugin.languages", { list: z(n).languages.map((e) => e.name).join(", ") })]), H(e, t);
					};
					W(x, (e) => {
						z(n)?.languages?.length && e(S);
					}), E(i), R((e, t, o, s, l) => {
						a = gi(i, 1, "plugin-row svelte-1n46o8q", null, a, { "plugin-broken": z(n)?.errors?.length }), U(c, e), J(f, "title", t), Ci(p, z(r)), p.disabled = o, U(m, ` ${s ?? ""}`), J(h, "title", l);
					}, [
						() => z(n)?.names?.[Yi()] ?? z(n)?.name ?? t,
						() => z(r) ? Y("tip.plugins.on") : Y("tip.plugins.off"),
						() => !!z(n)?.errors?.length,
						() => z(r) ? Y("ui.on") : Y("ui.off"),
						() => Y("tip.plugins.remove")
					]), B("change", p, (e) => Lu(t, e.target.checked)), B("click", h, () => zu(t)), H(e, i);
				});
				var o = I(a, 2), s = (e) => {
					var t = K_(), n = I(P(t), 2), r = F(n, !0);
					Jr(I(n, 2), 16, () => z(yu), (e) => e, (e, t) => {
						var n = G_(), r = N(n), i = N(r), a = F(i, !0), o = I(i, 2), s = (e) => {
							var n = H_(), r = F(n);
							R(() => U(r, `v${uu[t].version ?? ""}`)), H(e, n);
						};
						W(o, (e) => {
							uu[t]?.version && e(s);
						});
						var c = I(o, 2), l = N(c);
						G(l, () => C.right, !0), E(l), E(c), E(r), E(n), R((e, t) => {
							U(a, e), J(l, "title", t);
						}, [() => uu[t]?.names?.[Yi()] ?? uu[t]?.name ?? t, () => Y("tip.plugins.addFound")]), B("click", l, () => Wu(t)), H(e, n);
					}), R((e) => U(r, e), [() => Y("hint.plugins.found")]), H(e, t);
				};
				W(o, (e) => {
					z(yu).length && e(s);
				});
				var c = I(o, 2), l = (e) => {
					var t = Nr(), n = P(t), r = (e) => {
						var t = em(), n = F(t, !0);
						R((e) => U(n, e), [() => Y("hint.plugins.autoDiscover")]), H(e, t);
					};
					W(n, (e) => {
						z(yu).length || e(r);
					}), H(e, t);
				}, u = (e) => {
					var t = q_(), n = I(P(t), 2);
					K(n);
					var r = I(n, 2), i = F(r, !0), a = I(r, 2), o = (e) => {
						var t = U_(), n = F(t, !0);
						R(() => U(n, z(vu))), H(e, t);
					};
					W(a, (e) => {
						z(vu) && e(o);
					}), R((e, t, a) => {
						J(n, "placeholder", e), r.disabled = t, U(i, a);
					}, [
						() => Y("ph.plugins.folder"),
						() => !z(_u).trim(),
						() => Y("ui.addPlugin")
					]), B("keydown", n, (e) => e.key === "Enter" && Bu()), Di(n, () => z(_u), (e) => j(_u, e)), B("click", r, Bu), H(e, t);
				};
				W(c, (e) => {
					z(xu) === "ok" ? e(l) : e(u, -1);
				}), E(t), H(e, t);
			}, ce = (e) => {
				var t = E_(), n = N(t), r = (e) => {
					var t = em(), n = F(t, !0);
					R((e) => U(n, e), [() => Y("hint.history.loading")]), H(e, t);
				}, i = (e) => {
					var t = lm(), n = P(t), r = (e) => {
						var t = em(), n = F(t, !0);
						R(() => U(n, z(xa))), H(e, t);
					};
					W(n, (e) => {
						z(xa) && e(r);
					});
					var i = I(n, 2), a = (e) => {
						var t = X_(), n = P(t), r = F(n, !0);
						Jr(I(n, 2), 19, () => z(ya), (e) => e.sha, (e, t, n) => {
							var r = Y_();
							let i;
							var a = N(r), o = F(a, !0), s = F(I(a, 2));
							E(r), R((e) => {
								i = gi(r, 1, "history-row svelte-1n46o8q", null, i, { head: z(n) === 0 }), J(a, "title", z(t).sha), U(o, z(t).message), U(s, `${z(t).author ?? ""}${e ?? ""}`);
							}, [() => z(t).date ? ` · ${Ea.format(new Date(z(t).date))}` : ""]), H(e, r);
						}), R((e, t) => {
							n.disabled = z(Sa) || !z(ge)?.allowed, J(n, "title", e), U(r, t);
						}, [() => z(ge)?.allowed ? Y("tip.history.revert") : Y("tip.history.needsAccess"), () => Y("ui.revertLast")]), B("click", n, Oa), H(e, t);
					};
					W(i, (e) => {
						z(ya).length > 0 && e(a);
					}), H(e, t);
				};
				W(n, (e) => {
					z(ya) === null ? e(r) : e(i, -1);
				}), E(t), H(e, t);
			}, le = (e) => {
				var t = E_(), n = N(t), r = (e) => {
					var t = em(), n = F(t, !0);
					R((e) => U(n, e), [() => Y("update.checking")]), H(e, t);
				}, i = (e) => {
					var t = Z_(), n = P(t), r = F(n, !0), i = I(n, 2), a = F(i, !0);
					R((e) => {
						U(r, z(Pa)), U(a, e);
					}, [() => Y("update.retry")]), B("click", i, Ua), H(e, t);
				}, a = (e) => {
					var t = cv(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2), o = (e) => {
						var t = Q_(), n = P(t);
						G(n, () => C.right, !0), E(n);
						var r = F(I(n, 2), !0);
						R(() => U(r, z(Ma).target)), H(e, t);
					};
					W(a, (e) => {
						z(Ma).upToDate || e(o);
					}), E(n);
					var s = I(n, 2), c = (e) => {
						var t = em(), n = F(t, !0);
						R((e) => U(n, e), [() => Y("update.upToDate")]), H(e, t);
					}, l = (e) => {
						var t = sv(), n = P(t), r = F(n, !0), i = I(n, 2), a = (e) => {
							var t = $_(), n = N(t), r = F(n, !0), i = I(n, 2), a = F(N(i), !0);
							E(i), E(t), R((e) => {
								U(r, e), U(a, z(Ma).notes);
							}, [() => Y("update.aboutVersion", { target: z(Ma).target })]), H(e, t);
						};
						W(i, (e) => {
							z(Ma).notes && e(a);
						});
						var o = I(i, 2), s = (e) => {
							var t = ev(), n = N(t), r = N(n);
							G(r, () => C.warn, !0), E(r);
							var i = I(r);
							E(n);
							var a = I(n, 2), o = F(N(a), !0);
							E(a), E(t), R((e, t) => {
								J(n, "title", e), U(i, ` ${t ?? ""}`), U(o, z(Ma).headers.upstream);
							}, [() => Y("update.headersManual"), () => Y("update.headersTitle")]), H(e, t);
						};
						W(o, (e) => {
							z(Ma).headers?.upstream && e(s);
						});
						var c = I(o, 2);
						Jr(c, 17, () => z(Ma).changes.filter((e) => e.atom && e.conflict), (e) => e.path, (e, t) => {
							var n = nv(), r = N(n), i = F(r, !0), a = I(r, 2), o = N(a), s = (e) => {
								var t = tv(), n = F(t, !0);
								R((e) => U(n, e), [() => Y("update.actionDelete")]), H(e, t);
							};
							W(o, (e) => {
								z(t).action === "delete" && e(s);
							});
							var c = I(o, 2);
							G(c, () => C.warn, !0), E(c), E(a), E(n), R((e) => {
								J(r, "title", z(t).path), U(i, z(t).path), J(c, "title", e);
							}, [() => Y(`update.conflict.${z(t).conflict}`)]), H(e, n);
						});
						var l = I(c, 2), u = N(l), d = F(u), f = I(u, 2);
						Jr(f, 21, () => z(Ma).changes.filter((e) => e.atom && !e.conflict), (e) => e.path, (e, t) => {
							var n = rv(), r = N(n), i = F(r, !0), a = I(r, 2), o = (e) => {
								var t = tv(), n = F(t, !0);
								R((e) => U(n, e), [() => Y("update.actionDelete")]), H(e, t);
							};
							W(a, (e) => {
								z(t).action === "delete" && e(o);
							}), E(n), R(() => {
								J(r, "title", z(t).path), U(i, z(t).path);
							}), H(e, n);
						}), E(f), E(l);
						var p = I(l, 2), m = (e) => {
							var t = ov(), n = P(t), r = N(n), i = F(r, !0), a = F(I(r, 2), !0);
							E(n), Jr(I(n, 2), 17, () => z(Ma).changes.filter((e) => !e.atom), (e) => e.path, (e, t) => {
								var n = av(), r = N(n);
								let i;
								var a = F(r, !0), o = I(r, 2), s = N(o), c = (e) => {
									var t = tv(), n = F(t, !0);
									R((e) => U(n, e), [() => Y("update.actionDelete")]), H(e, t);
								};
								W(s, (e) => {
									z(t).action === "delete" && e(c);
								});
								var l = I(s, 2), u = (e) => {
									var n = iv();
									G(n, () => C.warn, !0), E(n), R((e) => J(n, "title", e), [() => Y(`update.conflict.${z(t).conflict}`)]), H(e, n);
								};
								W(l, (e) => {
									z(t).conflict && e(u);
								});
								var d = I(l, 2);
								K(d), E(o), E(n), R((e, n, o, s) => {
									i = gi(r, 1, "update-path svelte-1n46o8q", null, i, { skipped: e }), J(r, "title", z(t).path), U(a, z(t).path), Ci(d, n), J(d, "title", o), J(d, "aria-label", s);
								}, [
									() => z(Ha).has(z(t).path),
									() => z(Ha).has(z(t).path),
									() => Y("update.keepMine.title"),
									() => Y("update.keepMine")
								]), B("change", d, () => Wa(z(t).path)), H(e, n);
							}), R((e, t) => {
								U(i, e), U(a, t);
							}, [() => Y("update.optionalTitle"), () => Y("update.keepMine")]), H(e, t);
						}, h = /* @__PURE__ */ k(() => z(Ma).changes.some((e) => !e.atom));
						W(p, (e) => {
							z(h) && e(m);
						});
						var g = I(p, 2), _ = F(g, !0);
						R((e, t, n, i, a, o) => {
							U(r, e), J(u, "title", t), U(d, `${n ?? ""} · ${i ?? ""}`), g.disabled = z(Fa) || !z(ge)?.allowed, J(g, "title", a), U(_, o);
						}, [
							() => Y("update.summary", {
								writes: z(Ma).changes.filter((e) => e.action === "write").length,
								deletes: z(Ma).changes.filter((e) => e.action === "delete").length
							}),
							() => Y("update.atomGroup.title"),
							() => Y("update.atomTitle"),
							() => z(Ma).changes.filter((e) => e.atom).length,
							() => z(ge)?.allowed ? Y("update.run.title") : Y("tip.history.needsAccess"),
							() => Y("update.run", { target: z(Ma).target })
						]), B("click", g, Ga), H(e, t);
					};
					W(s, (e) => {
						z(Ma).upToDate ? e(c) : e(l, -1);
					}), R((e) => U(i, e), [() => Y("update.current", { version: z(Ma).current })]), H(e, t);
				};
				W(n, (e) => {
					z(Fa) && !z(Ma) ? e(r) : z(Pa) ? e(i, 1) : z(Ma) && e(a, 2);
				}), E(t), H(e, t);
			};
			W(_, (e) => {
				z(zt) === "pages" ? e(v) : z(zt) === "nav" ? e(y, 1) : z(zt) === "site" ? e(b, 2) : z(zt) === "theme" ? e(x, 3) : z(zt) === "blocks" ? e(te, 4) : z(zt) === "grid" ? e(ne, 5) : z(zt) === "properties" ? e(re, 6) : z(zt) === "footer" ? e(ie, 7) : z(zt) === "collections" ? e(ae, 8) : z(zt) === "plugins" ? e(oe, 9) : z(zt) === "history" ? e(ce, 10) : z(zt) === "update" && e(le, 11);
			}), E(t), ji(t, (e) => j(pf, e), () => z(pf)), R((e) => {
				n = gi(t, 1, "panel svelte-1n46o8q", null, n, { hidden: !z(ve) }), J(i, "title", e), U(s, Ht[z(zt)]);
			}, [() => Ut[z(zt)]?.map((e) => Y(e)).join("\n")]), H(e, t);
		};
		W(y, (e) => {
			z(zt) && e(b);
		});
		var x = I(y, 2);
		let te;
		var ne = N(x), ie = N(ne);
		ji(ie, (e) => j(he, e), () => z(he)), E(ne), E(x), ji(x, (e) => j(Me, e), () => z(Me)), E(t), R((e, t) => {
			r = gi(n, 1, "rail svelte-1n46o8q", null, r, { hidden: !z(ve) }), p = gi(l, 1, "rail-gear svelte-1n46o8q", null, p, { active: z($a) }), J(l, "title", e), te = gi(x, 1, "frame-wrap svelte-1n46o8q", null, te, {
				mobile: z(je) === "mobile",
				pan: z(Ge),
				fold: z(ze) > 0
			}), vi(ne, `width:${z(Ue) ?? ""}px; height:${z(We) ?? ""}px`), J(ie, "title", t), J(ie, "src", `/?page=${z(w)}&preview=1`), vi(ie, `width:${z(Re) ?? ""}px; height:${z(He) ?? ""}px; transform:scale(${z(Be) ?? ""}); transform-origin:top left`);
		}, [() => Y("settings.title"), () => Y("ui.previewTitle")]), B("click", l, () => j($a, !z($a))), Cr("load", ie, Xa), xr(ie), H(e, t);
	}, uy = (e) => {
		var t = dv(), n = F(t, !0);
		R((e) => U(n, e), [() => Y("ui.loading")]), H(e, t);
	};
	W(cy, (e) => {
		z(ce) ? e(ly) : e(uy, -1);
	});
	var dy = I(cy, 2), fy = (e) => {
		Os(e, {
			get image() {
				return z(Ss);
			},
			onapply: ws,
			oncancel: () => j(Ss, null)
		});
	};
	W(dy, (e) => {
		z(Ss) && e(fy);
	});
	var py = I(dy, 2), my = (e) => {
		var t = pv(), n = N(t), r = N(n), i = F(r, !0), a = I(r, 2);
		Jr(a, 16, () => z(wt).lines, (e) => e, (e, t) => {
			var n = fv(), r = F(n, !0);
			R(() => U(r, t)), H(e, n);
		});
		var o = I(a, 2), s = (e) => {
			var t = rm();
			K(t), ot(t, !0), R(() => J(t, "placeholder", z(wt).placeholder)), B("keydown", t, (e) => e.key === "Enter" && z(wt).value.trim() && Dt(!0)), Di(t, () => z(wt).value, (e) => z(wt).value = e), H(e, t);
		};
		W(o, (e) => {
			z(wt).prompt && e(s);
		});
		var c = I(o, 2), l = N(c), u = F(l, !0), d = I(l, 2), f = F(d, !0);
		E(c), E(n), E(t), R(() => {
			U(i, z(wt).title), U(u, z(wt).cancelLabel), U(f, z(wt).okLabel);
		}), B("pointerdown", t, (e) => Ot = e.target === e.currentTarget), B("click", t, (e) => Ot && e.target === e.currentTarget && Dt(!1)), B("click", l, () => Dt(!1)), B("click", d, () => Dt(!0)), H(e, t);
	};
	W(py, (e) => {
		z(wt) && e(my);
	});
	var hy = I(py, 2), gy = (e) => {
		var t = mv(), n = N(t), r = N(n), i = F(r, !0), a = I(r, 2), o = F(a, !0), s = I(a, 2), c = N(s), l = I(c);
		K(l), E(s);
		var u = I(s, 2), d = N(u), f = I(d);
		{
			let e = /* @__PURE__ */ k(() => Y("setup.accentPick"));
			ba(f, {
				get value() {
					return z(jt);
				},
				get label() {
					return z(e);
				},
				onchange: (e) => j(jt, e, !0)
			});
		}
		E(u);
		var p = I(u, 2), m = N(p), h = I(m);
		{
			let e = /* @__PURE__ */ k(() => Y("setup.bgLabel"));
			ba(h, {
				get value() {
					return z(Mt);
				},
				get label() {
					return z(e);
				},
				onchange: (e) => j(Mt, e, !0)
			});
		}
		E(p);
		var g = I(p, 2), _ = F(g, !0), v = I(g, 2), y = N(v), b = F(y, !0), x = I(y, 2), S = F(x, !0);
		E(v), E(n), E(t), R((e, t, n, r, a, s, u, f, p, h) => {
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
			() => !z(At).trim(),
			() => Y("setup.start")
		]), B("keydown", l, (e) => e.key === "Enter" && Pt()), Di(l, () => z(At), (e) => j(At, e)), B("click", y, Nt), B("click", x, Pt), H(e, t);
	};
	W(hy, (e) => {
		z(kt) && e(gy);
	});
	var _y = I(hy, 2), vy = (e) => {
		var t = hv();
		let n;
		var r = N(t), i = F(r, !0), a = I(r, 2);
		E(t), R((e) => {
			n = gi(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: z(de) === "ok",
				error: z(de) === "error"
			}), U(i, z(ue)), J(a, "title", e);
		}, [() => Y("ui.close")]), B("click", a, () => T("")), H(e, t);
	};
	W(_y, (e) => {
		z(ue) && e(vy);
	}), E(Kv);
	var yy = I(Kv, 2), by = (e) => {
		var t = gv(), n = N(t), r = N(n), i = F(r, !0), a = I(r, 2);
		G(a, () => C.cross, !0), E(a), E(n);
		var o = I(n, 2), s = N(o);
		c(s), E(o), E(t), R((e, n) => {
			vi(t, `left: ${z(an).left ?? ""}px; top: ${z(an).top ?? ""}px`), U(i, e), J(a, "title", n);
		}, [() => Y("blocks.suffix", { label: mr[z(M).type] ?? z(M).type }), () => Y("tip.closeEsc")]), B("click", a, () => j(an, null)), H(e, t);
	};
	W(yy, (e) => {
		z(an) && z(M) && e(by);
	}), R(() => Xv = gi(Yv, 1, "topbar svelte-1n46o8q", null, Xv, { hidden: !z(ve) })), H(e, Gv), Ze();
}
//#endregion
//#region src/main.js
wr([
	"change",
	"click",
	"input",
	"pointerdown",
	"keydown"
]), document.documentElement.lang = await Qi();
var yv = zr(vv, { target: document.getElementById("urd-admin") });
//#endregion
export { yv as default };
