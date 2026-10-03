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
var g = 1024, _ = 2048, v = 4096, y = 8192, b = 16384, x = 32768, S = 1 << 25, ee = 65536, te = 1 << 19, ne = 1 << 20, re = 1 << 25, C = 1 << 21, ie = 1 << 22, ae = 1 << 23, oe = Symbol("$state"), se = Symbol("component"), ce = Symbol("legacy props"), le = Symbol(""), w = Symbol("attributes"), ue = Symbol("class"), de = Symbol("style"), fe = Symbol("text"), pe = Symbol("form reset"), T = new class extends Error {
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
		for (var r of n) Sn(r);
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
function tt() {
	var e = et;
	et = [], p(e);
}
function D(e) {
	if (et.length === 0 && !At) {
		var t = et;
		queueMicrotask(() => {
			t === et && tt();
		});
	}
	et.push(e);
}
function nt() {
	for (; et.length > 0;) tt();
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/status.js
var rt = ~(_ | v | g);
function O(e, t) {
	e.f = e.f & rt | t;
}
function it(e) {
	e.f & 512 || e.deps === null ? O(e, g) : O(e, v);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function at(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), O(e, g);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
function ot(e, t) {
	if (t) {
		let t = document.body;
		e.autofocus = !0, D(() => {
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
			if (!e.defaultPrevented) for (let t of e.target.elements) t[pe]?.();
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
	let i = e[pe];
	e[pe] = i ? () => {
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
				hn(e, s);
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
		Promise.all(n.map((e) => /* @__PURE__ */ vt(e))).then(u).catch((e) => hn(e, s)).finally(d);
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
	return Tn(() => {
		var t = Kn, n = m();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== T && n.reject(e);
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
	}), bn(() => {
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
		O(e, g);
		return;
	}
	Vn || (Ot === null ? it(e) : (yn() || Et?.is_fork) && Ot.set(e, t));
}
function Ct(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && ut(() => {
		t.ac.abort(T), t.ac = null;
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
			for (var r of n.d) O(r, _), t(r);
			for (r of n.m) O(r, v), t(r);
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
		for (let e of this.#u) this.#d.delete(e), O(e, _), this.schedule(e);
		for (let e of this.#d) O(e, v), this.schedule(e);
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), O(i, _), this.schedule(i));
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
		this.#m || (this.#m = !0, D(() => {
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
			!jt && !At && D(() => {
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
		hn(e, kt);
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
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), O(e, g);
		for (var n = e.first; n !== null;) Ht(n, t), n = n.next;
	}
}
function Ut(e) {
	O(e, g);
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
		e.wv = ir(), Yt = null, Xt = 0, M(e, _, n), Yt = null, $e() && Kn !== null && Kn.f & 1024 && !(Kn.f & 96) && (Qn === null ? $n([e]) : Qn.push(e)), !r.is_fork && Wt.size > 0 && !Kt && Qt();
	}
	return t;
}
function Qt() {
	Kt = !1;
	for (let e of Wt) {
		e.f & 1024 && O(e, v);
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
function $t(e) {
	j(e, e.v + 1);
}
function M(e, t, n) {
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
				if (l && O(s, t), c & 131072) Wt.add(s);
				else if (c & 2) {
					var u = s;
					Ot?.delete(u), M(u, v, n);
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
					r.set(t, e), $t(o);
				}
			} else j(n, ge), $t(o);
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
				$t(o);
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
		rn = a(t, "firstChild").get, an = a(t, "nextSibling").get, u(e) && (e[ue] = void 0, e[w] = null, e[de] = void 0, e.__e = void 0), u(n) && (n[fe] = void 0);
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
	return t && pn(n), Ee(n), n;
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
		pn(Te);
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
	var t = Kn;
	if (t === null) return Un.f |= ae, e;
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
	Kn === null && (Un === null && Re(e), Le()), Vn && Ie(e);
}
function _n(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function vn(e, t) {
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
	if (i !== null && (i.parent = n, n !== null && _n(i, n), Un !== null && Un.f & 2 && !(e & 64))) {
		var a = Un;
		(a.effects ??= []).push(i);
	}
	return r;
}
function yn() {
	return Un !== null && !Wn;
}
function bn(e) {
	let t = vn(8, null);
	return O(t, g), t.teardown = e, t;
}
function xn(e) {
	gn("$effect");
	var t = Kn.f;
	if (!Un && t & 32 && Je !== null && !Je.i) {
		var n = Je;
		(n.e ??= []).push(e);
	} else return Sn(e);
}
function Sn(e) {
	return vn(4 | ne, e);
}
function Cn(e) {
	It.ensure();
	let t = vn(64 | te, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Pn(t, () => {
			jn(t), n(void 0);
		}) : (jn(t), n(void 0));
	});
}
function wn(e) {
	return vn(4, e);
}
function Tn(e) {
	return vn(ie | te, e);
}
function L(e, t = 0) {
	return vn(8 | t, e);
}
function R(e, t = [], n = [], r = []) {
	ft(r, t, n, (t) => {
		vn(8, () => {
			e(...t.map(z));
		});
	});
}
function En(e, t = 0) {
	return vn(16 | t, e);
}
function Dn(e) {
	return vn(32 | te, e);
}
function On(e) {
	var t = e.teardown;
	if (t !== null) {
		let n = Vn, r = Un;
		Hn(!0), Gn(null);
		try {
			t.call(null);
		} catch (t) {
			hn(t, e.parent);
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
			e.abort(T);
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
		e.f ^= y, e.f & 1024 || (O(e, _), It.ensure().schedule(e));
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
		t & 512 && Ot === null && O(e, g);
	}
	return !1;
}
function or(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Jn !== null && Jn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? or(a, t, !1) : t === a && (n ? O(a, _) : a.f & 1024 && O(a, v), Vt(a));
	}
}
function sr(e) {
	var t = Xn, n = Zn, r = Qn, i = Un, a = Jn, o = Je, s = Wn, c = nr, l = e.f;
	Xn = null, Zn = 0, Qn = null, Un = l & 96 ? null : e, Jn = null, Ye(e.ctx), Wn = !1, nr = ++tr, e.ac !== null && (ut(() => {
		e.ac.abort(T);
	}), e.ac = null);
	try {
		e.f |= C;
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
		return cr(e), mn(t);
	} finally {
		e.f ^= C, Xn = t, Zn = n, Qn = r, Un = i, Jn = a, Ye(o), Wn = s, nr = c;
	}
}
function cr(e) {
	var t = e.deps, n = Et?.is_fork;
	if (Xn !== null) {
		var r;
		if (n || ur(e, Zn), t !== null && Zn > 0) for (t.length = Zn + Xn.length, r = 0; r < Xn.length; r++) t[Zn + r] = Xn[r];
		else e.deps = t = Xn;
		if (yn() && e.f & 512) for (r = Zn; r < t.length; r++) (t[r].reactions ??= []).push(e);
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
			s.ac.abort(T), s.ac = null, O(s, _);
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
		O(e, g);
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
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? (i.__removed = !1, D(() => {
		i.__removed || t.addEventListener(e, i, r);
	})) : t.addEventListener(e, i, r), i;
}
function Cr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = Sr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && bn(() => {
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
	var t = fn("template");
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
	return n.nodeType === 3 ? pn(n) : (n.before(n = sn()), Ee(n)), jr(n, n), n;
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
		yn() && (z(n), L(() => (t === 0 && (r = hr(() => e(() => $t(n)))), t += 1, () => {
			D(() => {
				--t, t === 0 && (r?.(), r = void 0, $t(n));
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
		D(r), t && (this.#s = Dn(() => {
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
					hn(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#y() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = Dn(() => e(this.#e)), D(() => {
			var e = this.#c = document.createDocumentFragment(), t = sn(), n = !1;
			if (e.append(t), this.#a = this.#S(() => {
				try {
					return Dn(() => this.#r(t));
				} catch (e) {
					try {
						this.error(e), n = !0;
					} catch (e) {
						hn(e, this.#i.parent);
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
		this.#C(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, D(() => {
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
					return hn(e, this.#i.parent), null;
				}
			}));
		};
		D(() => {
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
	var l = void 0, u = Cn(() => {
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
		var n = Et, r = dn();
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
		r?.has(a) ? (a.f |= re, Rn(a, document.createDocumentFragment())) : jn(t[i], n);
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
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Xr(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= re, Qr(d, null, c)) : In(d) : Pn(d, () => {
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
			for (var r = /* @__PURE__ */ new Set(), u = Et, v = dn(), y = 0; y < e; y += 1) {
				Ce && Te.nodeType === 8 && Te.data === "]" && (c = Te, t = !0, we(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Zt(S.v, b), S.i && Zt(S.i, y), v && u.unskip_effect(S.e)) : (S = Zr(l, h ? c : qr ??= sn(), b, x, y, o, n, i), h || (S.e.f |= re), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = Dn(() => s(c)) : (d = Dn(() => s(qr ??= sn())), d.f |= re)), e > r.size && Fe("", "", ""), Ce && e > 0 && Ee(ke()), !h) {
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
			if (_.f ^= re, _ === l) Qr(_, null, n);
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
			var C = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < ne; v += 1) te[v].nodes?.a?.measure();
				for (v = 0; v < ne; v += 1) te[v].nodes?.a?.fix();
			}
			Gr(e, te, C);
		}
	}
	o && D(() => {
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
			var d = fn(r ? "svg" : i ? "math" : "template", r ? ve : i ? ye : void 0);
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
		_ && wn(() => {
			hr(() => h.in());
		});
	}
}
function ui(e, t, n, r, i, a) {
	var o = r === 1, s = !1;
	if (d(t)) {
		var c;
		return D(() => {
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
	return D(() => {
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
		e[pe] = n, D(n), lt();
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
	Ce && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === xi) || i[t] !== (i[t] = n) && (t === "loading" && (e[le] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Ei(e).has(t) ? e[t] = n : e.setAttribute(t, n));
}
function wi(e) {
	return e[w] ??= {
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
	}), (Ce && e.defaultValue !== e.value || hr(t) == null && e.value) && (n(Oi(e) ? ki(e.value) : e.value), Et !== null && r.add(Et)), L(() => {
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
	return wn(() => {
		var o, s;
		return L(() => {
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
//#region node_modules/svelte/src/reactivity/set.js
var $i = [
	"forEach",
	"isDisjointFrom",
	"isSubsetOf",
	"isSupersetOf"
], ea = [
	"difference",
	"intersection",
	"symmetricDifference",
	"union"
], ta = !1, na = class e extends Set {
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ A(0);
	#n = /* @__PURE__ */ A(0);
	#r = nr || -1;
	constructor(e) {
		if (super(), e) {
			for (var t of e) super.add(t);
			this.#n.v = super.size;
		}
		ta || this.#a();
	}
	#i(e) {
		return nr === this.#r ? /* @__PURE__ */ A(e) : qt(e);
	}
	#a() {
		ta = !0;
		var t = e.prototype, n = Set.prototype;
		for (let e of $i) t[e] = function(...t) {
			return z(this.#t), n[e].apply(this, t);
		};
		for (let r of ea) t[r] = function(...t) {
			z(this.#t);
			var i = n[r].apply(this, t);
			return new e(i);
		};
	}
	has(e) {
		var t = super.has(e), n = this.#e, r = n.get(e);
		if (r === void 0) {
			if (!t) return z(this.#t), !1;
			r = this.#i(!0), n.set(e, r);
		}
		return z(r), t;
	}
	add(e) {
		return super.has(e) || (super.add(e), j(this.#n, super.size), $t(this.#t)), this;
	}
	delete(e) {
		var t = super.delete(e), n = this.#e, r = n.get(e);
		return r !== void 0 && (n.delete(e), j(r, !1)), t && (j(this.#n, super.size), $t(this.#t)), t;
	}
	clear() {
		if (super.size !== 0) {
			super.clear();
			var e = this.#e;
			for (var t of e.values()) j(t, !1);
			e.clear(), j(this.#n, 0), $t(this.#t);
		}
	}
	keys() {
		return this.values();
	}
	values() {
		return z(this.#t), super.values();
	}
	entries() {
		return z(this.#t), super.entries();
	}
	[Symbol.iterator]() {
		return this.keys();
	}
	get size() {
		return z(this.#n);
	}
};
//#endregion
//#region node_modules/svelte/src/transition/index.js
function ra(e) {
	let t = e - 1;
	return t * t * t + 1;
}
function ia(e) {
	let t = typeof e == "string" && e.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
	return t ? [parseFloat(t[1]), t[2] || "px"] : [e, "px"];
}
function aa(e, { delay: t = 0, duration: n = 400, easing: r = ra, x: i = 0, y: a = 0, opacity: o = 0 } = {}) {
	let s = getComputedStyle(e), c = +s.opacity, l = s.transform === "none" ? "" : s.transform, u = c * (1 - o), [d, f] = ia(i), [p, m] = ia(a);
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
function oa(e, t, n, r) {
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
function sa(e = globalThis) {
	let t = e?.HTMLElement?.prototype, n = e?.CSS;
	return !!(t && "popover" in t && typeof t.showPopover == "function" && typeof n?.supports == "function" && n.supports("anchor-name: --urd") && n.supports("position-try-fallbacks: flip-block"));
}
var ca = 0;
function la(e = "urd-pop") {
	return ca += 1, `--${e}-${ca}`;
}
function ua(e, t) {
	let n = e?.closest?.(".panel-body, .block-menu-body");
	n && (t ? n.style.setProperty("anchor-name", "--urd-pane") : n.style.removeProperty("anchor-name"));
}
//#endregion
//#region src/lib/ColorPicker.svelte
var da = /* @__PURE__ */ V("<button type=\"button\" class=\"cp-eye svelte-zxiloo\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), fa = /* @__PURE__ */ V("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), pa = /* @__PURE__ */ V("<button type=\"button\"></button>"), ma = /* @__PURE__ */ V("<span class=\"cp-label svelte-zxiloo\"> <!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), ha = /* @__PURE__ */ V("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\">×</button></span>"), ga = /* @__PURE__ */ V("<span class=\"cp-tokens svelte-zxiloo\"></span>"), _a = /* @__PURE__ */ V("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), va = /* @__PURE__ */ V("<span class=\"cp-label svelte-zxiloo\"> </span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), ya = /* @__PURE__ */ V("<div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\"> <button type=\"button\" class=\"cp-add svelte-zxiloo\">+</button></span> <!> <!>", 1), ba = /* @__PURE__ */ V("<button type=\"button\" class=\"cp-clear svelte-zxiloo\">×</button>"), xa = /* @__PURE__ */ V("<div class=\"cp-pop cp-anchored svelte-zxiloo\" popover=\"auto\"><!></div>"), Sa = /* @__PURE__ */ V("<div class=\"cp-pop svelte-zxiloo\"><!></div>"), Ca = /* @__PURE__ */ V("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!> <!></span>");
function wa(e, t) {
	Xe(t, !0);
	let n = (e) => {
		var t = ya(), n = P(t), a = F(n), o = I(n, 2);
		K(o);
		var s = I(o, 2);
		K(s);
		var c = I(s, 2), l = N(c), u = I(l, 2);
		K(u);
		var d = I(u, 2), f = (e) => {
			var t = da();
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
			var r = fa();
			K(r), R((e) => {
				J(r, "title", t), q(r, e);
			}, [() => ve(z(n))]), B("change", r, (e) => ye(z(n), e.target.value)), H(e, r);
		}), E(p);
		var v = I(p, 2), y = (e) => {
			var t = ma(), n = P(t), a = N(n, !0), o = I(a), s = (e) => {
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
				var o = pa();
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
			var t = ga();
			Jr(t, 20, () => z(_), (e) => e, (e, t) => {
				var n = ha(), r = N(n), i = I(r, 2);
				E(n), R((e) => {
					vi(r, `background: ${t ?? ""}`), J(r, "title", t), J(i, "title", e);
				}, [() => Y("cp.removeSaved")]), B("click", r, () => Se(t)), B("click", i, () => we(t)), H(e, n);
			}), E(t), H(e, t);
		};
		W(ie, (e) => {
			z(_).length && e(ae);
		});
		var oe = I(ie, 2), se = (e) => {
			var t = va(), n = P(t), r = F(n, !0), i = I(n, 2);
			Jr(i, 20, () => z(g), (e) => e, (e, t) => {
				var n = _a();
				R(() => {
					vi(n, `background: ${t ?? ""}`), J(n, "title", t);
				}), B("click", n, () => Se(t)), H(e, n);
			}), E(i), R((e) => U(r, e), [() => Y("common.recent")]), H(e, t);
		};
		W(oe, (e) => {
			z(g).length && e(se);
		}), R((e, t, r, i, c) => {
			vi(n, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${z(ee) ?? ""}, 100%, 50%)`), vi(a, `left: ${z(te) * 100}%; top: ${(1 - z(ne)) * 100}%`), q(o, z(ee)), q(s, e), J(s, "title", t), vi(s, `background: linear-gradient(to right, transparent, ${r ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), vi(l, `background: ${z(C) ?? ""}`), q(u, z(C)), U(x, `${i ?? ""} `), J(S, "title", c);
		}, [
			() => Math.round(z(re) * 100),
			() => Y("cp.alpha"),
			() => ce(),
			() => Y("cp.saved"),
			() => Y("cp.saveTitle")
		]), B("pointerdown", n, ge), B("input", o, (e) => {
			j(ee, Number(e.target.value), !0), w();
		}), B("input", s, (e) => {
			j(re, Number(e.target.value) / 100), w();
		}), B("change", u, _e), B("click", S, Ce), H(e, t);
	}, r = Pi(t, "value", 3, "#000000"), i = Pi(t, "tokens", 19, () => []), a = Pi(t, "label", 19, () => Y("cp.pickColor")), o = Pi(t, "allowClear", 3, !1), s = "urd-recent-colors", c = "urd-saved-colors", l = sa(), u = la("urd-cp"), d = u.slice(2), f = /* @__PURE__ */ A(null), p = () => {
		let e = i().find(([e]) => e === r());
		return e ? e[1] : r();
	}, m = () => i().find(([e]) => e === r())?.[0] ?? null, g = /* @__PURE__ */ A(en([])), _ = /* @__PURE__ */ A(en([])), v = "", y = "", b = /* @__PURE__ */ A(null), x = /* @__PURE__ */ A(!1), S = /* @__PURE__ */ A(en({
		top: 0,
		left: 0
	})), ee = /* @__PURE__ */ A(0), te = /* @__PURE__ */ A(0), ne = /* @__PURE__ */ A(1), re = /* @__PURE__ */ A(1), C = /* @__PURE__ */ A("#000000");
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
	function le() {
		let e = ce();
		return z(re) >= .995 ? e : e + Math.round(z(re) * 255).toString(16).padStart(2, "0");
	}
	function w() {
		j(C, le(), !0), y = z(C), t.onchange?.(z(C));
	}
	function ue(e) {
		let t = ie(e);
		return t ? (((e) => {
			var t = h(e, 3);
			j(ee, t[0], !0), j(te, t[1], !0), j(ne, t[2], !0);
		})(oe(t[0], t[1], t[2])), j(re, t[3], !0), j(C, le(), !0), !0) : !1;
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
		e.newState === "open" ? (de(), ua(z(b), !0), j(x, !0)) : z(x) && (ua(z(b), !1), j(x, !1), T());
	}
	function pe() {
		de();
		let e = z(b).getBoundingClientRect(), t = z(b).closest(".panel-body")?.getBoundingClientRect(), n = t ? t.right : window.innerWidth, r = Math.max(8, Math.min(e.right - 236, n - 236 - 8)), i = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		j(S, {
			top: i,
			left: r
		}, !0), j(x, !0);
	}
	function T() {
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
		j(x, !1), T();
	}
	function he(e, n) {
		ue(n), j(C, n, !0), t.onchange?.(e);
	}
	function ge(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			j(te, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), j(ne, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), w();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function _e(e) {
		ue(e.target.value) ? w() : j(C, ce(), !0);
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
		})(oe(...n)), w();
	}
	let be = typeof window < "u" && "EyeDropper" in window;
	async function xe() {
		try {
			ue((await new window.EyeDropper().open()).sRGBHex) && w();
		} catch {}
	}
	function Se(e) {
		ue(e) && w();
	}
	function Ce() {
		let e = le();
		z(_).includes(e) || (j(_, [e, ...z(_)].slice(0, 12), !0), localStorage.setItem(c, JSON.stringify(Ke(z(_)))));
	}
	function we(e) {
		j(_, z(_).filter((t) => t !== e), !0), localStorage.setItem(c, JSON.stringify(Ke(z(_))));
	}
	xn(() => {
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
	var Te = Ca(), Ee = N(Te);
	let De;
	var Oe = I(Ee, 2), ke = (e) => {
		var n = ba();
		R((e, t) => {
			J(n, "title", e), J(n, "aria-label", t);
		}, [() => Y("cp.clearTitle"), () => Y("cp.clear")]), B("click", n, () => t.onchange?.("")), H(e, n);
	};
	W(Oe, (e) => {
		o() && r() && e(ke);
	});
	var Ae = I(Oe, 2), je = (e) => {
		var t = xa(), r = N(t), i = (e) => {
			n(e);
		};
		W(r, (e) => {
			z(x) && e(i);
		}), E(t), ji(t, (e) => j(f, e), () => z(f)), R(() => {
			J(t, "id", d), vi(t, `position-anchor: ${u ?? ""}`);
		}), Cr("toggle", t, fe), B("click", t, (e) => e.preventDefault()), H(e, t);
	}, Me = (e) => {
		var t = Sa(), r = N(t);
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
		(l ? void 0 : () => z(x) ? me() : pe())?.apply(this, e);
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
var Ta = 1600, Ea = .82, Da = .6, Oa = 15e6, ka = 4e6, Aa = class extends Error {
	constructor(e) {
		super("The animated image is too large"), this.code = "animatedTooLarge", this.bytes = e;
	}
}, ja = (e, t, n) => {
	if (t + n.length > e.length) return !1;
	for (let r = 0; r < n.length; r += 1) if (e[t + r] !== n.charCodeAt(r)) return !1;
	return !0;
};
function Ma(e) {
	if (!ja(e, 0, "GIF87a") && !ja(e, 0, "GIF89a") || e.length < 13) return !1;
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
function Na(e) {
	return !ja(e, 0, "RIFF") || !ja(e, 8, "WEBP") ? !1 : ja(e, 12, "VP8X") && e.length > 20 && !!(e[20] & 2);
}
function Pa(e) {
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
		if (ja(e, t + 4, "acTL")) return !0;
		if (ja(e, t + 4, "IDAT") || ja(e, t + 4, "IEND")) return !1;
		t += 12 + n;
	}
	return !1;
}
function Fa(e) {
	return e instanceof Uint8Array ? Ma(e) ? "gif" : Na(e) ? "webp" : Pa(e) ? "png" : null : null;
}
async function Ia(e) {
	if (!/^image\/(?:gif|webp|png|apng)$/i.test(e.type || "") && !/\.(?:gif|webp|a?png)$/i.test(e.name || "")) return null;
	let t = new Uint8Array(await e.arrayBuffer()), n = Fa(t);
	if (!n) return null;
	if (t.length > 4e6) throw new Aa(t.length);
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
async function La(e, t = Ta) {
	if (za(e)) return Ba(await e.text());
	let n = await Ia(e);
	if (n) return n;
	let r = await createImageBitmap(e), i = Math.min(1, t / Math.max(r.width, r.height)), a = Math.round(r.width * i), o = Math.round(r.height * i), s = document.createElement("canvas");
	s.width = a, s.height = o, s.getContext("2d").drawImage(r, 0, 0, a, o), r.close();
	let c = (e) => new Promise((t) => s.toBlob(t, "image/webp", e)), l = await c(Ea);
	return l.size > 4e5 && (l = await c(Da)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(l);
		}),
		bytes: l.size,
		width: a,
		height: o
	};
}
var Ra = "image/svg+xml";
function za(e) {
	return e.type === Ra || /\.svg$/i.test(e.name || "");
}
function Ba(e) {
	let t = String(e ?? "");
	if (!/<svg[\s>]/i.test(t)) throw Error("Invalid SVG");
	if (/<\s*script[\s>]/i.test(t) || /<\s*foreignObject[\s>]/i.test(t) || /\son[a-z]+\s*=/i.test(t) || /javascript:/i.test(t)) throw Error("The SVG contains scripts or event handlers and cannot be used");
	let n = new Blob([t]).size, r = `data:${Ra};base64,${btoa(unescape(encodeURIComponent(t)))}`, i = t.match(/<svg\b[^>]*>/i)?.[0] ?? "", a = i.match(/viewBox\s*=\s*["']\s*([-\d.]+(?:[\s,]+[-\d.]+){3})\s*["']/i)?.[1]?.split(/[\s,]+/).map(Number);
	return {
		dataUrl: r,
		bytes: n,
		width: a?.length === 4 ? a[2] : Number.parseFloat(i.match(/\bwidth\s*=\s*["']?([\d.]+)/i)?.[1]) || 0,
		height: a?.length === 4 ? a[3] : Number.parseFloat(i.match(/\bheight\s*=\s*["']?([\d.]+)/i)?.[1]) || 0
	};
}
function Va(e, t, n = .04) {
	let r = String(e ?? "");
	if (!t || !(t.width > 0) || !(t.height > 0)) return r;
	let i = r.match(/<svg\b[^>]*>/i)?.[0];
	if (!i) return r;
	let a = (e) => Math.round(e * 1e3) / 1e3, o = Math.max(t.width, t.height) * Math.max(0, n), s = a(t.x - o), c = a(t.y - o), l = a(t.width + 2 * o), u = a(t.height + 2 * o), d = i.replace(/\sviewBox\s*=\s*["'][^"']*["']/i, "").replace(/\swidth\s*=\s*["'][^"']*["']/i, "").replace(/\sheight\s*=\s*["'][^"']*["']/i, "").replace(/<svg\b/i, `<svg viewBox="${s} ${c} ${l} ${u}" width="${l}" height="${u}"`);
	return r.replace(i, d);
}
function Ha(e) {
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
function Ua(e) {
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
function Wa(e, t = "image") {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || t;
}
function Ga(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region ../template/assets/engine/0.7.4/glyphs.js
var Ka = "urd-recent-glyphs", qa = "urd-recent-icons", Ja = [
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
function Ya(e, t) {
	return [t, ...(Array.isArray(e) ? e : []).filter((e) => e !== t)].slice(0, 16);
}
var Xa = (e) => {
	try {
		let t = JSON.parse(localStorage.getItem(e) ?? "[]");
		return Array.isArray(t) ? t : [];
	} catch {
		return [];
	}
}, Za = (e, t, n) => {
	let r = Ya(t, n);
	try {
		localStorage.setItem(e, JSON.stringify(r));
	} catch {}
	return r;
};
function Qa() {
	return Xa(Ka);
}
function $a(e) {
	return Za(Ka, Qa(), e);
}
function eo() {
	return Xa(qa);
}
function to(e) {
	return Za(qa, eo(), e);
}
//#endregion
//#region ../template/assets/engine/0.7.4/icons.js
var no = "fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"", ro = "fill=\"currentColor\" stroke=\"none\"", io = {
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
}, ao = [
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
function oo(e) {
	let t = typeof e == "string" ? io[e] : null;
	return t ? `<svg viewBox="0 0 24 24" width="100%" height="100%" ${t.fill ? ro : no} aria-hidden="true" focusable="false">${t.body}</svg>` : null;
}
//#endregion
//#region src/lib/GlyphPicker.svelte
var so = /* @__PURE__ */ V("<button type=\"button\"><span class=\"gp-svg svelte-15ln1c3\"></span></button>"), co = /* @__PURE__ */ V("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), lo = /* @__PURE__ */ V("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"><!> <!></div>", 1), uo = /* @__PURE__ */ V("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), fo = /* @__PURE__ */ V("<button type=\"button\"> </button>"), po = /* @__PURE__ */ V("<div class=\"gp-group svelte-15ln1c3\"> </div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\"> </button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\"> </p>", 1), mo = /* @__PURE__ */ V("<!> <!> <!> <!>", 1), ho = /* @__PURE__ */ V("<img class=\"gp-own svelte-15ln1c3\"/>"), go = /* @__PURE__ */ V("<span class=\"gp-svg svelte-15ln1c3\"></span>"), _o = /* @__PURE__ */ V("<div class=\"gp-pop gp-anchored svelte-15ln1c3\" popover=\"auto\"><!></div>"), vo = /* @__PURE__ */ V("<div class=\"gp-pop svelte-15ln1c3\"><!></div>"), yo = /* @__PURE__ */ V("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"><!></button> <!></span>");
function bo(e, t) {
	Xe(t, !0);
	let n = (e) => {
		var n = mo(), a = P(n), o = (e) => {
			var t = lo(), n = P(t), r = F(n, !0), a = I(n, 2), o = N(a);
			Jr(o, 16, () => z(d), (e) => e, (e, t) => {
				var n = so();
				let r;
				var a = N(n);
				G(a, () => oo(t), !0), E(a), E(n), R((e) => {
					r = gi(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, r, { active: t === i() }), J(n, "title", e);
				}, [() => Y(io[t].labelKey)]), B("click", n, () => ee(t)), H(e, n);
			}), Jr(I(o, 2), 16, () => z(u), (e) => e, (e, t) => {
				var n = co(), r = F(n, !0);
				R(() => U(r, t)), B("click", n, () => S(t)), H(e, n);
			}), E(a), R((e) => U(r, e), [() => Y("common.recent")]), H(e, t);
		};
		W(a, (e) => {
			(z(u).length || z(d).length) && e(o);
		});
		var s = I(a, 2), c = (e) => {
			var t = Nr();
			Jr(P(t), 17, () => ao, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ k(() => h(z(t), 2));
				let r = () => z(n)[0], a = () => z(n)[1];
				var o = uo(), s = P(o), c = F(s, !0), l = I(s, 2);
				Jr(l, 20, a, (e) => e, (e, t) => {
					var n = so();
					let r;
					var a = N(n);
					G(a, () => oo(t), !0), E(a), E(n), R((e) => {
						r = gi(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, r, { active: t === i() }), J(n, "title", e);
					}, [() => Y(io[t].labelKey)]), B("click", n, () => ee(t)), H(e, n);
				}), E(l), R((e) => U(c, e), [() => Y(r())]), H(e, o);
			}), H(e, t);
		};
		W(s, (e) => {
			t.onicon && e(c);
		});
		var l = I(s, 2);
		Jr(l, 17, () => Ja, ([e, t]) => e, (e, t) => {
			var n = /* @__PURE__ */ k(() => h(z(t), 2));
			let i = () => z(n)[0], a = () => z(n)[1];
			var o = uo(), s = P(o), c = F(s, !0), l = I(s, 2);
			Jr(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var n = fo();
				let i;
				var a = F(n, !0);
				R(() => {
					i = gi(n, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === r() }), U(a, t);
				}), B("click", n, () => S(t)), H(e, n);
			}), E(l), R((e) => U(c, e), [() => Y(i())]), H(e, o);
		});
		var f = I(l, 2), p = (e) => {
			var t = po(), n = P(t), r = F(n, !0), i = I(n, 2), a = F(i, !0), o = I(i, 2);
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
	}, r = Pi(t, "value", 3, "★"), i = Pi(t, "icon", 3, null), a = Pi(t, "image", 3, null), o = Pi(t, "label", 19, () => Y("gp.pickGlyph")), s = sa(), c = la("urd-gp"), l = c.slice(2), u = /* @__PURE__ */ A(en([])), d = /* @__PURE__ */ A(en([])), f = /* @__PURE__ */ A(null), p = /* @__PURE__ */ A(null), m = /* @__PURE__ */ A(null), g = /* @__PURE__ */ A(!1), _ = /* @__PURE__ */ A(en({
		top: 0,
		left: 0
	}));
	function v() {
		j(u, Qa(), !0), j(d, t.onicon ? eo().filter((e) => io[e]) : [], !0);
	}
	function y(e) {
		j(g, e.newState === "open"), ua(z(f), z(g)), z(g) && v();
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
		$a(e), t.onpick?.(e), b();
	}
	function ee(e) {
		to(e), t.onicon?.(e), b();
	}
	async function te(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", !n) return;
		let r = await La(n, 256);
		t.onimage?.(r.dataUrl), b();
	}
	xn(() => {
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
	var ne = yo(), re = N(ne), C = N(re), ie = (e) => {
		var t = ho();
		R((e) => {
			J(t, "src", a()), J(t, "alt", e);
		}, [() => Y("gp.ownIcon")]), H(e, t);
	}, ae = (e) => {
		var t = go();
		G(t, () => oo(i()), !0), E(t), H(e, t);
	}, oe = (e) => {
		var t = Mr();
		R(() => U(t, r() || "★")), H(e, t);
	};
	W(C, (e) => {
		a() ? e(ie) : i() && io[i()] ? e(ae, 1) : e(oe, -1);
	}), E(re);
	var se = I(re, 2), ce = (e) => {
		var t = _o(), r = N(t), i = (e) => {
			n(e);
		};
		W(r, (e) => {
			z(g) && e(i);
		}), E(t), ji(t, (e) => j(p, e), () => z(p)), R(() => {
			J(t, "id", l), vi(t, `position-anchor: ${c ?? ""}`);
		}), Cr("toggle", t, y), H(e, t);
	}, le = (e) => {
		var t = vo(), r = N(t);
		n(r), E(t), R(() => vi(t, `top: ${z(_).top ?? ""}px; left: ${z(_).left ?? ""}px`)), H(e, t);
	};
	W(se, (e) => {
		s ? e(ce) : z(g) && e(le, 1);
	}), E(ne), ji(ne, (e) => j(f, e), () => z(f)), R(() => {
		J(re, "title", o()), J(re, "aria-label", o()), J(re, "popovertarget", s ? l : void 0), vi(re, s ? `anchor-name: ${c}` : void 0);
	}), B("click", re, function(...e) {
		(s ? void 0 : () => z(g) ? j(g, !1) : x())?.apply(this, e);
	}), H(e, ne), Ze();
}
wr(["click", "change"]);
//#endregion
//#region src/lib/MarkPicker.svelte
var xo = /* @__PURE__ */ V("<span class=\"mp-count svelte-1y5ipgc\"> </span>"), So = /* @__PURE__ */ V("<div class=\"mp-tabs svelte-1y5ipgc\" role=\"group\"><button type=\"button\"> </button> <button type=\"button\"> <!></button></div>"), Co = /* @__PURE__ */ V("<button type=\"button\"><span class=\"mp-svg svelte-1y5ipgc\"></span></button>"), wo = /* @__PURE__ */ V("<p class=\"mp-hint svelte-1y5ipgc\"> </p>"), To = /* @__PURE__ */ V("<input class=\"mp-search svelte-1y5ipgc\" type=\"search\"/> <div class=\"mp-scroll svelte-1y5ipgc\"><div class=\"mp-grid svelte-1y5ipgc\"><button type=\"button\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" aria-hidden=\"true\" class=\"svelte-1y5ipgc\"><circle cx=\"12\" cy=\"12\" r=\"8.5\"></circle><path d=\"M6 18L18 6\"></path></svg></button> <!></div> <!></div>", 1), Eo = /* @__PURE__ */ V("<button type=\"button\"><img alt=\"\" class=\"svelte-1y5ipgc\"/></button>"), Do = /* @__PURE__ */ V("<div class=\"mp-scroll svelte-1y5ipgc\"><div class=\"mp-grid mp-grid-img svelte-1y5ipgc\"><button type=\"button\" class=\"mp-cell mp-upload svelte-1y5ipgc\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" aria-hidden=\"true\" class=\"svelte-1y5ipgc\"><path d=\"M12 5v14\"></path><path d=\"M5 12h14\"></path></svg> <span> </span></button> <!></div> <p class=\"mp-hint svelte-1y5ipgc\"> </p></div>"), Oo = /* @__PURE__ */ V("<!> <!>", 1), ko = /* @__PURE__ */ V("<img class=\"mp-own svelte-1y5ipgc\" alt=\"\"/>"), Ao = /* @__PURE__ */ V("<span class=\"mp-svg svelte-1y5ipgc\"></span>"), jo = /* @__PURE__ */ V("<span class=\"mp-empty svelte-1y5ipgc\" aria-hidden=\"true\">+</span>"), Mo = /* @__PURE__ */ V("<div class=\"mp-pop mp-anchored svelte-1y5ipgc\" popover=\"auto\"><!></div>"), No = /* @__PURE__ */ V("<div class=\"mp-pop svelte-1y5ipgc\"><!></div>"), Po = /* @__PURE__ */ V("<span class=\"mp svelte-1y5ipgc\"><button type=\"button\"><!></button> <!> <input type=\"file\" accept=\"image/*\" hidden=\"\"/></span>");
function Fo(e, t) {
	Xe(t, !0);
	let n = (e) => {
		var t = Oo(), n = P(t), a = (e) => {
			var t = So(), n = N(t);
			let r;
			var i = F(n, !0), a = I(n, 2);
			let s;
			var c = N(a, !0), l = I(c), u = (e) => {
				var t = xo(), n = F(t, !0);
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
			var t = To(), n = P(t);
			K(n);
			var a = I(n, 2), o = N(a), c = N(o);
			let l;
			Jr(I(c, 2), 17, () => z(x), ({ id: e }) => e, (e, t) => {
				let n = () => z(t).id;
				var a = Co();
				let o;
				var s = N(a);
				G(s, () => oo(n()), !0), E(s), E(a), R((e, t) => {
					o = gi(a, 1, "mp-cell svelte-1y5ipgc", null, o, { active: n() === r() && !i() }), J(a, "title", e), J(a, "aria-label", t);
				}, [() => Y(io[n()].labelKey), () => Y(io[n()].labelKey)]), B("click", a, () => C(n())), H(e, a);
			}), E(o);
			var u = I(o, 2), d = (e) => {
				var t = wo(), n = F(t, !0);
				R((e) => U(n, e), [() => Y("mp.noHits")]), H(e, t);
			};
			W(u, (e) => {
				z(x).length || e(d);
			}), E(a), R((e, t) => {
				J(n, "placeholder", e), J(n, "aria-label", t), l = gi(c, 1, "mp-cell mp-none svelte-1y5ipgc", null, l, { active: !r() && !i() }), J(c, "title", s()), J(c, "aria-label", s());
			}, [() => Y("mp.search"), () => Y("mp.search")]), Di(n, () => z(v), (e) => j(v, e)), B("click", c, ae), H(e, t);
		}, d = (e) => {
			var t = Do(), n = N(t), r = N(n), a = F(I(N(r), 2), !0);
			E(r), Jr(I(r, 2), 16, () => z(S), (e) => e, (e, t) => {
				var n = Eo();
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
	}, r = Pi(t, "icon", 3, ""), i = Pi(t, "image", 3, ""), a = Pi(t, "images", 19, () => []), o = Pi(t, "label", 19, () => Y("mp.pickMark")), s = Pi(t, "noneLabel", 19, () => Y("common.none")), c = Pi(t, "klass", 3, ""), l = Pi(t, "iconsOnly", 3, !1), u = sa(), d = la("urd-mp"), f = d.slice(2), p = /* @__PURE__ */ A(null), m = /* @__PURE__ */ A(null), h = /* @__PURE__ */ A(null), g = /* @__PURE__ */ A(!1), _ = /* @__PURE__ */ A("icons"), v = /* @__PURE__ */ A(""), y = /* @__PURE__ */ A(en({
		top: 0,
		left: 0
	})), b = ao.flatMap(([e, t]) => t.map((t) => ({
		id: t,
		cat: e
	}))), x = /* @__PURE__ */ k(() => {
		let e = z(v).trim().toLowerCase();
		return e ? b.filter(({ id: t }) => {
			let n = Y(io[t].labelKey) || io[t].label;
			return t.includes(e) || n.toLowerCase().includes(e);
		}) : b;
	}), S = /* @__PURE__ */ k(() => [...new Set(a().filter(Boolean))]);
	function ee() {
		j(v, ""), j(oe, !1), j(_, i() && !l() ? "images" : "icons", !0);
	}
	function te(e) {
		j(g, e.newState === "open"), ua(z(p), z(g)), z(g) && ee();
	}
	function ne() {
		u && z(m)?.hidePopover(), j(g, !1);
	}
	function re() {
		ee();
		let e = z(p).getBoundingClientRect();
		j(y, {
			left: Math.max(8, Math.min(e.left, window.innerWidth - 286 - 8)),
			top: e.bottom + 332 + 8 > window.innerHeight ? Math.max(8, e.top - 332 - 8) : e.bottom + 6
		}, !0), j(g, !0);
	}
	function C(e) {
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
	xn(() => {
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
	var le = Po(), w = N(le), ue = N(w), de = (e) => {
		var n = Nr();
		ei(P(n), () => t.children), H(e, n);
	}, fe = (e) => {
		var t = ko();
		R(() => J(t, "src", i())), H(e, t);
	}, pe = (e) => {
		var t = Ao();
		G(t, () => oo(r()), !0), E(t), H(e, t);
	}, T = (e) => {
		H(e, jo());
	};
	W(ue, (e) => {
		t.children ? e(de) : i() ? e(fe, 1) : r() && io[r()] ? e(pe, 2) : e(T, -1);
	}), E(w);
	var me = I(w, 2), he = (e) => {
		var t = Mo(), r = N(t), i = (e) => {
			n(e);
		};
		W(r, (e) => {
			z(g) && e(i);
		}), E(t), ji(t, (e) => j(m, e), () => z(m)), R(() => {
			J(t, "id", f), vi(t, `position-anchor: ${d ?? ""}`);
		}), Cr("toggle", t, te), H(e, t);
	}, ge = (e) => {
		var t = No(), r = N(t);
		n(r), E(t), R(() => vi(t, `top: ${z(y).top ?? ""}px; left: ${z(y).left ?? ""}px`)), H(e, t);
	};
	W(me, (e) => {
		u ? e(he) : z(g) && e(ge, 1);
	});
	var _e = I(me, 2);
	ji(_e, (e) => j(h, e), () => z(h)), E(le), ji(le, (e) => j(p, e), () => z(p)), R(() => {
		gi(w, 1, `mp-trigger ${c() ?? ""}`, "svelte-1y5ipgc"), J(w, "title", o()), J(w, "aria-label", o()), J(w, "popovertarget", u ? f : void 0), vi(w, u ? `anchor-name: ${d}` : void 0);
	}), B("click", w, function(...e) {
		(u ? void 0 : () => z(g) ? j(g, !1) : re())?.apply(this, e);
	}), B("change", _e, se), Cr("cancel", _e, () => j(oe, !1)), H(e, le), Ze();
}
wr(["click", "change"]);
//#endregion
//#region src/lib/previewBridge.js
function Io(e, t = {}) {
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
		sendFitBlock(e, t, n = !1) {
			r({
				type: "urd-fit-block",
				sectionId: e,
				blockId: t,
				growOnly: n
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
function Lo(e, t) {
	return !(e > 0) || !(t > 0) ? 1 : e / t;
}
function Ro(e, t, n, r = 0, i = 0) {
	if (n === "full") return 1;
	let a = i > 0 ? Lo(r, i) : Infinity;
	return Math.max(.1, Math.min(1, Lo(e, t), a));
}
//#endregion
//#region src/lib/deploy-wait.js
function zo(e, { max: t = 8 } = {}) {
	let n = (e ?? []).filter((e) => e && typeof e.path == "string" && typeof e.content == "string" && e.encoding === "utf-8" && !e.delete && (e.path.startsWith("content/") || e.path === "plugins/plugins.json"));
	return n.sort((e, t) => (e.path === "content/site.json" ? -1 : 0) - (t.path === "content/site.json" ? -1 : 0)), n.slice(0, t).map(({ path: e, content: t }) => ({
		path: e,
		content: t
	}));
}
async function Bo(e, { fetchFn: t = fetch, delayMs: n = 1e4, attempts: r = 18, sleep: i = (e) => new Promise((t) => setTimeout(t, e)) } = {}) {
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
var Vo = 3840, Ho = 2400, Uo = (e, t, n) => Math.min(n, Math.max(t, e));
function Wo({ innerWidth: e = 0, screenWidth: t = 0 } = {}) {
	let n = e > 0 ? e : t;
	return Math.max(1, Math.round(n > 0 ? n : 1));
}
function Go(e) {
	return !e || typeof e.innerWidth != "number" ? null : Wo({
		innerWidth: e.innerWidth,
		screenWidth: e.screen?.width ?? 0
	});
}
function Ko(e, t) {
	let n = e && typeof e == "object" && !Array.isArray(e) ? e : {}, r = n.mode === "custom" ? "custom" : "own", i = Number(n.width), a = Uo(Number.isFinite(i) && i > 0 ? i : t, 640, Vo), o = Number(n.height), s = Number.isFinite(o) && o > 0 ? Uo(o, 480, Ho) : 0;
	return {
		mode: r,
		width: Math.round(a),
		height: Math.round(s)
	};
}
function qo(e, t) {
	return e?.mode === "custom" ? {
		width: e.width,
		height: e.height || 0
	} : {
		width: t,
		height: 0
	};
}
var Jo = 1920, Yo = [
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
], Xo = [
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
], Zo = [
	1920,
	1536,
	1366
];
function Qo(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 1440;
	let n = Math.round(t / 20) * 20;
	return Math.min(Jo, Math.max(960, n));
}
function $o(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 6;
	let n = Math.round(t / 1) * 1;
	return Math.min(12, Math.max(0, n));
}
function es(e, t) {
	if (e === "full") return 0;
	let n = Math.min(49, Math.max(0, Number(t) || 0));
	return Math.ceil(Number(e) / (1 - 2 * n / 100));
}
function ts(e, t, n) {
	let r = Math.max(0, Number(t) || 0) / 100 * n, i = Math.max(0, n - 2 * r), a = e !== "full" && Number(e) < i, o = a ? Number(e) : i;
	return {
		width: o,
		margin: Math.round((n - o) / 2),
		pct: n > 0 ? o / n * 100 : 0,
		bound: a
	};
}
function ns(e) {
	return Xo.find((t) => t.width === e)?.id ?? null;
}
//#endregion
//#region src/lib/nav-size.js
var rs = {
	min: 0,
	max: 64,
	step: 1
}, is = {
	min: 12,
	max: 28,
	step: 1
}, as = {
	min: 0,
	max: 80,
	step: 1
}, os = {
	min: 0,
	max: 64,
	step: 1
}, ss = {
	min: 480,
	max: 1920,
	step: 20
}, cs = {
	min: .3,
	max: .8,
	step: .05
}, ls = {
	min: 0,
	max: 400,
	step: 10
}, us = {
	min: 0,
	max: 1200,
	step: 20
}, ds = {
	min: 0,
	max: 64,
	step: 1
}, fs = {
	min: 180,
	max: 400,
	step: 1
}, ps = {
	min: 12,
	max: 128,
	step: 1
}, ms = {
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
}, hs = [
	"sm",
	"md",
	"lg",
	"xl"
], gs = .67;
function _s(e) {
	return e === "floating" || e === "floating-square" || e === "floating-tab";
}
function vs(e, { min: t, max: n, step: r = 1 }, i) {
	let a = Number(e);
	if (e == null || e === "" || !Number.isFinite(a)) return i;
	let o = Math.round(a / r) * r, s = Math.min(n, Math.max(t, o));
	return r < 1 ? Math.round(s * 100) / 100 : s;
}
function ys(e, t) {
	if (e?.padY != null && e.padY !== "") return vs(e.padY, rs, ms.md.padY);
	let n = ms[e?.size] ?? ms.md;
	return Math.round(n.padY * (_s(t) ? gs : 1));
}
function bs(e) {
	if (e?.textSize != null && e.textSize !== "") return vs(e.textSize, is, ms.md.textSize);
	let t = ms[e?.size] ?? ms.md;
	return Math.round(t.textSize);
}
function xs(e) {
	return e?.padY != null && e.padY !== "" || e?.textSize != null && e.textSize !== "" ? null : hs.includes(e?.size) ? e.size : "md";
}
//#endregion
//#region src/lib/Dropdown.svelte
var Ss = /* @__PURE__ */ V("<span aria-hidden=\"true\"><svg viewBox=\"0 0 16 16\" width=\"1em\" height=\"1em\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"svelte-vtocc6\"><path d=\"M3.5 6l4.5 4.5L12.5 6\"></path></svg></span>"), Cs = /* @__PURE__ */ V("<button type=\"button\"> </button>"), ws = /* @__PURE__ */ V("<button type=\"button\"><span class=\"dd-value svelte-vtocc6\"> </span> <!></button> <div class=\"dd-pop dd-anchored svelte-vtocc6\" popover=\"auto\"><!></div>", 1), Ts = /* @__PURE__ */ V("<div class=\"dd-pop svelte-vtocc6\"></div>"), Es = /* @__PURE__ */ V("<button type=\"button\"><span class=\"dd-value svelte-vtocc6\"> </span> <!></button> <!>", 1), Ds = /* @__PURE__ */ V("<span class=\"dd svelte-vtocc6\"><!></span>");
function X(e, t) {
	Xe(t, !0);
	let n = (e) => {
		var t = Ss();
		let n;
		R(() => n = gi(t, 1, "dd-caret svelte-vtocc6", null, n, { "dd-caret-open": z(f) })), H(e, t);
	}, r = Pi(t, "value", 3, null), i = Pi(t, "options", 19, () => []), a = Pi(t, "title", 3, null), o = Pi(t, "disabled", 3, !1), s = Pi(t, "filled", 3, !1), c = Pi(t, "compact", 3, !1), l = sa(), u = la("urd-dd"), d = u.slice(2), f = /* @__PURE__ */ A(!1), p = /* @__PURE__ */ A(null), m = /* @__PURE__ */ A(null), g = /* @__PURE__ */ A(en({
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
	xn(() => {
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
	var x = Ds(), S = N(x), ee = (e) => {
		var t = ws(), l = P(t);
		let p;
		var g = N(l), v = F(g, !0), y = I(g, 2);
		n(y), E(l);
		var x = I(l, 2), S = N(x), ee = (e) => {
			var t = Nr();
			Jr(P(t), 17, i, ([e, t]) => `${e ?? ""}`, (e, t) => {
				var n = /* @__PURE__ */ k(() => h(z(t), 2));
				let i = () => z(n)[0], a = () => z(n)[1];
				var o = Cs();
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
		var t = Es(), l = P(t);
		let u;
		var d = N(l), p = F(d, !0), m = I(d, 2);
		n(m), E(l);
		var v = I(l, 2), x = (e) => {
			var t = Ts();
			Jr(t, 21, i, ([e, t]) => `${e ?? ""}`, (e, t) => {
				var n = /* @__PURE__ */ k(() => h(z(t), 2));
				let i = () => z(n)[0], a = () => z(n)[1];
				var o = Cs();
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
var Os = /* @__PURE__ */ V("<button type=\"button\"> </button>"), ks = /* @__PURE__ */ V("<div><span class=\"choice-label svelte-1ehof1c\"> </span> <div class=\"choice-seg svelte-1ehof1c\" role=\"group\"></div></div>");
function As(e, t) {
	Xe(t, !0);
	let n = Pi(t, "title", 3, void 0), r = /* @__PURE__ */ k(() => t.options.length > 3 || t.options.reduce((e, [, t]) => e + `${t}`.length, 0) > 20), i = (e) => `${e ?? ""}`;
	var a = ks();
	let o;
	var s = N(a), c = F(s, !0), l = I(s, 2);
	Jr(l, 21, () => t.options, ([e, t]) => i(e), (e, n) => {
		var r = /* @__PURE__ */ k(() => h(z(n), 2));
		let a = () => z(r)[0], o = () => z(r)[1];
		var s = Os();
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
var js = /* @__PURE__ */ V("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\"> </h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\"></canvas> <p class=\"ie-hint svelte-e7sog7\"> </p></div> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"ghost svelte-e7sog7\"> </button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"primary svelte-e7sog7\"> </button></span></div></div>");
function Ms(e, t) {
	Xe(t, !0);
	let n = Pi(t, "image", 3, ""), r = /* @__PURE__ */ A(null), i = /* @__PURE__ */ A(null), a = /* @__PURE__ */ A(1), o = /* @__PURE__ */ A(.5), s = /* @__PURE__ */ A(.5), c = /* @__PURE__ */ A(1), l = /* @__PURE__ */ A(1), u = /* @__PURE__ */ A(1);
	xn(() => {
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
	xn(() => {
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
	var h = js(), g = N(h), _ = N(g), v = F(_, !0), y = I(_, 2), b = N(y);
	J(b, "width", 220), J(b, "height", 220), ji(b, (e) => j(r, e), () => z(r));
	var x = F(I(b, 2), !0);
	E(y);
	var S = I(y, 2), ee = N(S), te = F(I(ee));
	E(S);
	var ne = I(S, 2);
	K(ne);
	var re = I(ne, 2), C = N(re), ie = F(I(C));
	E(re);
	var ae = I(re, 2);
	K(ae);
	var oe = I(ae, 2), se = N(oe), ce = F(I(se));
	E(oe);
	var le = I(oe, 2);
	K(le);
	var w = I(le, 2), ue = N(w), de = F(I(ue));
	E(w);
	var fe = I(w, 2);
	K(fe);
	var pe = I(fe, 2), T = N(pe), me = F(T, !0), he = I(T, 2), ge = F(he, !0);
	E(pe);
	var _e = I(pe, 2), ve = N(_e), ye = F(ve, !0), be = I(ve, 2), xe = F(be, !0);
	E(_e), E(g), E(h), R((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) => {
		U(v, e), J(b, "title", t), U(x, n), U(ee, `${r ?? ""} `), U(te, `${i ?? ""}x`), U(C, `${a ?? ""} `), U(ie, `${o ?? ""}%`), U(se, `${s ?? ""} `), U(ce, `${c ?? ""}%`), U(ue, `${l ?? ""} `), U(de, `${u ?? ""}%`), U(me, d), U(ge, f), U(ye, p), U(xe, m);
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
	]), B("pointerdown", b, f), Di(ne, () => z(a), (e) => j(a, e)), Di(ae, () => z(c), (e) => j(c, e)), Di(le, () => z(l), (e) => j(l, e)), Di(fe, () => z(u), (e) => j(u, e)), B("click", T, () => j(u, 0)), B("click", he, p), B("click", ve, () => t.oncancel?.()), B("click", be, m), H(e, h), Ze();
}
wr(["pointerdown", "click"]);
//#endregion
//#region ../template/assets/engine/0.7.4/blocks/form.js
var Ns = () => [
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
], Ps = 24, Fs = {
	"oppsett-byttet": "layout-changed",
	"blokk-endret": "block-edited",
	"desktop-endret-etter-mobil": "desktop-changed-after-mobile",
	seksjonshøyde: "section-height",
	"blokk-flyttet": "block-moved",
	"blokk-slettet": "block-deleted",
	"blokk-lagt-til": "block-added"
};
function Is(e, t) {
	if (!e || !("y" in e || "h" in e)) return e ?? null;
	if (t && e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h) return null;
	let n = {
		x: e.x,
		w: e.w
	};
	return Number.isFinite(e.y) && (n.row = Math.max(1, Math.round((e.y - Ps) / 8) + 1), n.rows = Number.isFinite(e.h) ? Math.max(1, Math.ceil(e.h / 8)) : 1), Number.isFinite(e.z) && e.z !== 1 && (n.z = e.z), e.rot && (n.rot = e.rot), n;
}
var Ls = {
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
}, Rs = { bildegalleri: "slideshow" }, zs = {
	flate: "surface",
	aksent: "accent",
	invers: "inverse",
	dus: "soft",
	dempet: "muted",
	dyp: "deep",
	uthevet: "highlighted"
}, Bs = {
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
function Vs(e) {
	let t = Array.isArray(e) ? e : e.blocks ?? [];
	for (let e of t) Ls[e.type] && (e.type = Ls[e.type]);
	if (!Array.isArray(e)) {
		for (let t of e.background?.layers ?? []) Rs[t.type] && (t.type = Rs[t.type]);
		zs[e.theme] && (e.theme = zs[e.theme]), Bs[e.preset] && (e.preset = Bs[e.preset]);
	}
	return e;
}
var Hs = {
	1: (e) => {
		for (let t of e.sections ?? []) {
			let e = t.responsive?.mobile;
			for (let e of t.blocks ?? []) e.decor && (e.hideMobile = !0), e.frames?.mobile && (e.frames.mobile = Is(e.frames.mobile, e.frames.desktop));
			e?.mode === "manual" && (e.mode = "auto");
			let n = e?.attention?.reason;
			n && Fs[n] && (e.attention.reason = Fs[n]);
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) Vs(t);
		return e;
	},
	3: (e) => {
		for (let t of e.sections ?? []) Vs(t);
		return e;
	}
}, Us = {
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
function Ws(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 4;) {
		let r = Us[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function Gs(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 4;) {
		let i = Hs[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/plugins.js
function Ks(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var qs = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function Js(e, t) {
	let n = Ks(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = Ks(t[2]), a = qs(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var Ys = /^[a-z0-9][a-z0-9-]*$/;
function Xs(e) {
	let t = [];
	if (!e || typeof e != "object") return ["the manifest is not an object"];
	Ys.test(e.id ?? "") || t.push("id is missing or invalid"), (typeof e.name != "string" || !e.name) && t.push("name is missing"), Ks(e.version ?? "") || t.push("version is not semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine is missing");
	let n = Array.isArray(e.languages) && e.languages.length > 0;
	return (e.entry !== void 0 || !n) && (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry is missing or is not a .js file"), (e.provides !== void 0 || !n) && (!e.provides || typeof e.provides != "object") && t.push("provides is missing"), e.languages !== void 0 && t.push(...Vi(e.languages)), e.locales !== void 0 && typeof e.locales != "boolean" && t.push("locales must be a boolean"), e.names !== void 0 && (typeof e.names != "object" || e.names === null || Array.isArray(e.names) || Object.values(e.names).some((e) => typeof e != "string" || !e)) && t.push("names must be an object mapping language code to name"), t;
}
Promise.resolve();
//#endregion
//#region ../template/assets/engine/0.7.4/sections/presets.js
function Zs(e) {
	return typeof crypto < "u" && crypto.randomUUID ? `${e}-${crypto.randomUUID().slice(0, 8)}` : `${e}-${[...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4))].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
var Qs = () => ({ mobile: {
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
}), $s = (e, t, n = {}) => ({
	id: Zs("blk"),
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
}), ec = (e, t = {}) => ({
	id: Zs("blk"),
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
}), tc = (e, t, n = {}) => ({
	id: Zs("blk"),
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
}), nc = (e, t, n = 40) => ({
	id: Zs("blk"),
	type: "icon",
	version: 1,
	props: {
		glyph: t,
		color: "accent",
		size: n
	},
	animation: null,
	frames: e
}), rc = (e, t = {}) => ({
	id: Zs("blk"),
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
}), ic = (e, t = {}) => ({
	id: Zs("blk"),
	type: "form",
	version: 1,
	props: {
		recipient: "",
		subject: "",
		mode: "mailto",
		endpoint: "",
		submitLabel: Y("form.sendDefault"),
		successText: Y("form.thanksDefault"),
		fields: Ns(),
		...t
	},
	animation: null,
	frames: e
}), ac = (e, t = {}) => ({
	id: Zs("blk"),
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
}), oc = () => ({
	type: "hover-lift",
	version: 1,
	props: {}
}), sc = (e, t, n = {}) => ({
	id: Zs("blk"),
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
}), cc = (e, t = {}) => ({
	id: Zs("blk"),
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
}), lc = (e, t = {}) => ({
	id: Zs("blk"),
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
}), uc = (e, t = {}) => ({
	id: Zs("blk"),
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
}), dc = (e, t = {}) => ({
	id: Zs("blk"),
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
}), fc = (e, t) => ({
	id: Zs("blk"),
	type: "faq",
	version: 1,
	props: {
		items: t,
		multi: !1
	},
	animation: null,
	frames: e
}), pc = (e, t = {}) => ({
	id: Zs("blk"),
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
}), mc = (e, t) => ({
	id: Zs("blk"),
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
}), hc = (e, t = {}) => ({
	id: Zs("blk"),
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
}), gc = (...e) => ({
	version: 1,
	layers: e
}), _c = (e) => ({
	type: "color",
	version: 1,
	props: { value: e }
}), vc = (e, t, n, r = .5) => ({
	type: "glow",
	version: 1,
	props: {
		x: e,
		y: t,
		color: "accent",
		radius: r,
		opacity: n
	}
}), yc = (e) => Math.max(0, ...e.blocks.map((e) => e.frames.desktop.y + e.frames.desktop.h)), bc = (e, t, n, r, i, a) => ({
	x: n + e % t * r,
	y: i + Math.floor(e / t) * a
}), xc = (e, t, n, r, i, a, o, s, c = 0) => {
	let l = (t) => e.blocks.some((e) => {
		let n = e.frames.desktop;
		return n.x < t.x + t.w - .01 && t.x < n.x + n.w - .01 && n.y < t.y + t.h - .01 && t.y < n.y + n.h - .01;
	});
	for (let e = 0; e < 60; e++) {
		let u = bc(e, t, n, r, i, a);
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
		y: yc(e) + 16,
		n: 0
	};
}, Sc = (e, t, n) => e + t * .1 + n * .01, Cc = (e, t, n, r, i = null) => ({
	id: Zs("sec"),
	version: 1,
	preset: e,
	size: { minHeight: t },
	grid: i,
	background: n,
	blocks: r,
	responsive: Qs()
});
function wc(e) {
	e.sections.define("blank", {
		label: "Empty section",
		labelKey: "preset.blank.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "A blank canvas to build on freely",
		hintKey: "preset.blank.hint",
		create: () => Cc("blank", "40vh", gc(_c("bg")), [])
	}), e.sections.define("hero", {
		label: "Hero",
		labelKey: "preset.hero.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Large opening with gradient and glow, left-aligned",
		hintKey: "preset.hero.hint",
		create: () => Cc("hero", "70vh", {
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
				vc(.7, .2, .35),
				{
					type: "grain",
					version: 1,
					props: { opacity: .06 }
				}
			]
		}, [
			$s(Z(8.33, 40, 50, 38), Y("seed.hero.title")),
			$s(Z(8.33, 84, 41.67, 26), Y("seed.hero.intro")),
			tc(Z(8.33, 118, 20, 32), Y("seed.readMore"))
		])
	}), e.sections.define("hero-centered", {
		label: "Hero, centred",
		labelKey: "preset.hero-centered.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Centred opening with two buttons",
		hintKey: "preset.hero-centered.hint",
		create: () => Cc("hero-centered", "60vh", gc(_c("bg")), [
			$s(Z(15, 64, 70, 44), Y("seed.heroCenter.title"), { align: "center" }),
			$s(Z(25, 116, 50, 26), Y("seed.heroCenter.intro"), { align: "center" }),
			tc(Z(31.5, 160, 17, 40), Y("seed.join")),
			tc(Z(51.5, 160, 17, 40), Y("seed.readMore"), { style: "secondary" })
		])
	}), e.sections.define("hero-image", {
		label: "Hero over a photo",
		labelKey: "preset.hero-image.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Opening over a photo that creeps slowly, with a veil under the text",
		hintKey: "preset.hero-image.hint",
		create: () => {
			let e = Cc("hero-image", "70vh", {
				version: 1,
				layers: [
					_c("bg"),
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
				$s(Z(8.33, 40, 50, 38), Y("seed.hero.title")),
				$s(Z(8.33, 84, 41.67, 26), Y("seed.hero.intro")),
				tc(Z(8.33, 118, 20, 32), Y("seed.readMore"))
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
			let e = Cc("hero-photos", "70vh", {
				version: 1,
				layers: [
					_c("bg"),
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
				$s(Z(15, 64, 70, 44), Y("seed.heroCenter.title"), { align: "center" }),
				$s(Z(25, 116, 50, 26), Y("seed.heroCenter.intro"), { align: "center" }),
				tc(Z(41.5, 160, 17, 40), Y("seed.readMore"))
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
		create: () => Cc("images", "360px", gc(_c("bg")), [
			$s(Z(4, 24, 50, 32), Y("seed.images.title")),
			ec(Z(4, 72, 28, 220)),
			ec(Z(36, 72, 28, 220)),
			ec(Z(68, 72, 28, 220))
		]),
		itemLabel: "image",
		itemLabelKey: "item.image",
		item: (e) => {
			let { x: t, y: n } = xc(e, 3, 4, 32, 72, 244, 28, 220);
			return {
				blocks: [ec(Z(t, n, 28, 220))],
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
		create: () => Cc("gallery", "440px", gc(_c("bg")), [$s(Z(4, 24, 50, 32), Y("seed.gallery.title")), dc(Z(4, 72, 92, 320))])
	}), e.sections.define("find-us", {
		label: "Find us",
		labelKey: "preset.find-us.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Map with your address (privacy-friendly OpenStreetMap)",
		hintKey: "preset.find-us.hint",
		create: () => Cc("find-us", "480px", gc(_c("bg")), [$s(Z(6, 40, 60, 70), Y("seed.findUs.title")), rc(Z(6, 120, 88, 360, 2))])
	}), e.sections.define("whats-on", {
		label: "What is on",
		labelKey: "preset.whats-on.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Event list from a subscribable calendar (iCal/Google)",
		hintKey: "preset.whats-on.hint",
		create: () => Cc("whats-on", "520px", gc(_c("bg")), [$s(Z(6, 40, 60, 70), Y("seed.whatsOn.title")), ac(Z(6, 130, 88, 320, 2), { limit: 5 })])
	}), e.sections.define("contact-form", {
		label: "Contact form",
		labelKey: "preset.contact-form.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Contact form that sends via email (or your own endpoint)",
		hintKey: "preset.contact-form.hint",
		create: () => Cc("contact-form", "520px", gc(_c("bg")), [$s(Z(6, 40, 60, 120), Y("seed.contactForm.intro")), ic(Z(6, 180, 60, 380, 2))])
	}), e.sections.define("contact", {
		label: "Contact",
		labelKey: "preset.contact.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Contact details in a card with an email button",
		hintKey: "preset.contact.hint",
		create: () => Cc("contact", "320px", gc(_c("surface"), vc(.2, .8, .2)), [
			$s(Z(10, 32, 40, 36), Y("seed.contact.title")),
			$s(Z(10, 84, 36, 130), Y("seed.contact.info"), { box: !0 }),
			tc(Z(60, 100, 22, 40), Y("seed.contact.button"), { href: `mailto:${Y("seed.email")}` })
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
				let i = nc(Z(e + 10.5, 88, 4, 52), n), a = $s(Z(e, 152, 25, 200), Y("seed.features.card", { title: r }), {
					align: "center",
					box: !0
				});
				return a.animation = oc(), i.mobileOrder = Sc(88, t, 0), a.mobileOrder = Sc(88, t, 1), [i, a];
			};
			return Cc("feature-cards", "420px", gc(_c("bg")), [
				$s(Z(6, 28, 60, 38), Y("seed.features.title")),
				...e(6, 0, "✦", Y("seed.features.card1")),
				...e(37.5, 1, "★", Y("seed.features.card2")),
				...e(69, 2, "✓", Y("seed.features.card3"))
			]);
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = xc(e, 3, 6, 31.5, 152, 296, 25, 264, -64), i = nc(Z(t + 10.5, n - 64, 4, 52), "✦"), a = $s(Z(t, n, 25, 200), Y("seed.features.card", { title: Y("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return a.animation = oc(), i.mobileOrder = Sc(88, r, 0), a.mobileOrder = Sc(88, r, 1), {
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
				let r = $s(Z(e, 88, 25, 200), Y("seed.features.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.animation = oc(), r.mobileOrder = Sc(88, t, 0), r;
			};
			return Cc("feature-cards-simple", "360px", gc(_c("bg")), [
				$s(Z(6, 28, 60, 38), Y("seed.features.title")),
				e(6, 0, Y("seed.features.card1")),
				e(37.5, 1, Y("seed.features.card2")),
				e(69, 2, Y("seed.features.card3"))
			]);
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = xc(e, 3, 6, 31.5, 88, 232, 25, 200), i = $s(Z(t, n, 25, 200), Y("seed.features.card", { title: Y("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.animation = oc(), i.mobileOrder = Sc(88, r, 0), {
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
				let n = ec(Z(e, 88, 25, 160)), r = $s(Z(e, 256, 25, 160), Y("seed.news.card"));
				return n.mobileOrder = Sc(88, t, 0), r.mobileOrder = Sc(88, t, 1), [n, r];
			};
			return Cc("news", "460px", gc(_c("bg")), [
				$s(Z(6, 28, 50, 38), Y("seed.news.title")),
				tc(Z(78, 30, 16, 36), Y("seed.news.seeAll"), { style: "secondary" }),
				...e(6, 0),
				...e(37.5, 1),
				...e(69, 2)
			]);
		},
		itemLabel: "story",
		itemLabelKey: "item.story",
		item: (e) => {
			let { x: t, y: n, n: r } = xc(e, 3, 6, 31.5, 88, 344, 25, 328), i = ec(Z(t, n, 25, 160)), a = $s(Z(t, n + 168, 25, 160), Y("seed.news.card"));
			return i.mobileOrder = Sc(88, r, 0), a.mobileOrder = Sc(88, r, 1), {
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
		create: () => Cc("news-collection", "300px", gc(_c("bg")), [$s(Z(6, 28, 50, 38), Y("seed.news.title")), sc(Z(6, 88, 88, 180), "cards")])
	}), e.sections.define("noticeboard", {
		label: "Noticeboard",
		labelKey: "preset.noticeboard.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Dated list from a collection (notices/announcements)",
		hintKey: "preset.noticeboard.hint",
		create: () => Cc("noticeboard", "300px", gc(_c("surface")), [$s(Z(6, 28, 50, 38), Y("seed.noticeboard.title")), sc(Z(6, 88, 88, 180), "list", { limit: 8 })])
	}), e.sections.define("publication-archive", {
		label: "Publication archive",
		labelKey: "preset.publication-archive.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Year-grouped archive from a collection (issues, minutes, reports)",
		hintKey: "preset.publication-archive.hint",
		create: () => Cc("publication-archive", "300px", gc(_c("bg")), [$s(Z(6, 28, 60, 38), Y("seed.archive.title")), sc(Z(6, 88, 88, 180), "archive", { limit: 0 })])
	}), e.sections.define("events", {
		label: "Events",
		labelKey: "preset.events.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Three rows with date badge and sign-up button",
		hintKey: "preset.events.hint",
		create: () => {
			let e = (e, t, n, r) => [
				$s(Z(6, e, 8, 88), Y("seed.events.dateBadge", {
					day: t,
					month: n
				}), {
					align: "center",
					box: !0
				}),
				$s(Z(16, e, 58, 88), Y("seed.events.row", { title: r })),
				tc(Z(78, e + 24, 16, 40), Y("seed.events.signup"), { style: "secondary" })
			];
			return Cc("events", "440px", gc(_c("surface")), [
				$s(Z(6, 28, 50, 38), Y("seed.events.title")),
				...e(88, "11", Y("seed.events.monthAug"), Y("seed.events.row1")),
				...e(196, "25", Y("seed.events.monthAug"), Y("seed.events.row2")),
				...e(304, "8", Y("seed.events.monthSep"), Y("seed.events.row3"))
			]);
		},
		itemLabel: "row",
		itemLabelKey: "item.row",
		item: (e) => {
			let t = yc(e) + 16;
			return {
				blocks: [
					$s(Z(6, t, 8, 88), Y("seed.events.newBadge"), {
						align: "center",
						box: !0
					}),
					$s(Z(16, t, 58, 88), Y("seed.events.row", { title: Y("seed.events.newTitle") })),
					tc(Z(78, t + 24, 16, 40), Y("seed.events.signup"), { style: "secondary" })
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
				let r = ec(Z(e, 80, 22, 180), { alt: Y("seed.team.alt") }), i = $s(Z(e, 268, 22, 84), Y("seed.team.member", { role: n }), { align: "center" });
				return r.mobileOrder = Sc(80, t, 0), i.mobileOrder = Sc(80, t, 1), [r, i];
			};
			return Cc("team", "420px", gc(_c("surface")), [
				$s(Z(6, 24, 50, 32), Y("seed.team.title")),
				...e(7.5, 0, Y("seed.team.role1")),
				...e(39, 1, Y("seed.team.role2")),
				...e(70.5, 2, Y("seed.team.role3"))
			]);
		},
		itemLabel: "person",
		itemLabelKey: "item.person",
		item: (e) => {
			let { x: t, y: n, n: r } = xc(e, 3, 7.5, 31.5, 80, 288, 22, 272), i = ec(Z(t, n, 22, 180), { alt: Y("seed.team.alt") }), a = $s(Z(t, n + 188, 22, 84), Y("seed.team.member", { role: Y("seed.team.roleNew") }), { align: "center" });
			return i.mobileOrder = Sc(80, r, 0), a.mobileOrder = Sc(80, r, 1), {
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
		create: () => Cc("faq", "520px", gc(_c("bg")), [
			$s(Z(25, 24, 50, 36), Y("seed.faq.title"), { align: "center" }),
			fc(Z(20, 80, 60, 320), [
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
			$s(Z(20, 416, 60, 32), Y("seed.faq.more"), { align: "center" })
		])
	}), e.sections.define("timeline", {
		label: "Timeline",
		labelKey: "preset.timeline.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Your story as events along a line",
		hintKey: "preset.timeline.hint",
		create: () => Cc("timeline", "480px", gc(_c("bg")), [$s(Z(25, 24, 50, 36), Y("seed.timeline.title"), { align: "center" }), mc(Z(25, 88, 50, 330), [
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
				let r = $s(Z(e, 88, 25, 72), `<h3>${t + 1}</h3>`, {
					align: "center",
					size: 44
				}), i = $s(Z(e, 168, 25, 160), Y("seed.steps.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.mobileOrder = Sc(88, t, 0), i.mobileOrder = Sc(88, t, 1), [r, i];
			};
			return Cc("steps", "400px", gc(_c("bg")), [
				$s(Z(6, 28, 60, 38), Y("seed.steps.title")),
				...e(6, 0, Y("seed.steps.s1")),
				...e(37.5, 1, Y("seed.steps.s2")),
				...e(69, 2, Y("seed.steps.s3"))
			]);
		},
		itemLabel: "step",
		itemLabelKey: "item.step",
		item: (e) => {
			let { x: t, y: n, n: r } = xc(e, 3, 6, 31.5, 88, 272, 25, 240), i = $s(Z(t, n, 25, 72), `<h3>${r + 1}</h3>`, {
				align: "center",
				size: 44
			}), a = $s(Z(t, n + 80, 25, 160), Y("seed.steps.card", { title: Y("seed.steps.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.mobileOrder = Sc(88, r, 0), a.mobileOrder = Sc(88, r, 1), {
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
				ec(Z(6, 40, 55, 300)),
				$s(Z(6, 348, 55, 108), Y("seed.feature.main")),
				tc(Z(6, 464, 14, 38), Y("seed.readMore"), { style: "secondary" }),
				ec(Z(66, 40, 28, 120)),
				$s(Z(66, 164, 28, 60), Y("seed.feature.small1")),
				ec(Z(66, 244, 28, 120)),
				$s(Z(66, 368, 28, 60), Y("seed.feature.small2"))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = Sc(40, t < 3 ? 0 : 1, t);
			}), Cc("lead-story", "540px", gc(_c("bg")), e);
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
					ec(Z(e, 88, 25, 200)),
					$s(Z(e, 296, 25, 76), Y("seed.products.card", {
						name: n,
						price: r
					}), { align: "center" }),
					tc(Z(e + 5, 380, 15, 40), Y("seed.products.buy"))
				];
				return i.forEach((e, n) => {
					e.mobileOrder = Sc(88, t, n);
				}), i;
			};
			return Cc("products", "470px", gc(_c("bg")), [
				$s(Z(6, 28, 50, 38), Y("seed.products.title")),
				...e(6, 0, Y("seed.products.name"), Y("seed.products.price1")),
				...e(37.5, 1, Y("seed.products.name"), Y("seed.products.price2")),
				...e(69, 2, Y("seed.products.name"), Y("seed.products.price3"))
			]);
		},
		itemLabel: "product",
		itemLabelKey: "item.product",
		item: (e) => {
			let { x: t, y: n, n: r } = xc(e, 3, 6, 31.5, 88, 348, 25, 332), i = [
				ec(Z(t, n, 25, 200)),
				$s(Z(t, n + 208, 25, 76), Y("seed.products.card", {
					name: Y("seed.products.name"),
					price: Y("seed.products.price1")
				}), { align: "center" }),
				tc(Z(t + 5, n + 292, 15, 40), Y("seed.products.buy"))
			];
			return i.forEach((e, t) => {
				e.mobileOrder = Sc(88, r, t);
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
		create: () => Cc("shop", "544px", gc(_c("bg")), [
			$s(Z(6, 28, 50, 38), Y("seed.shop.title")),
			lc(Z(78, 88, 16, 48)),
			cc(Z(6, 176, 88, 320))
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
				$s(Z(6, 48, 52, 96), Y("seed.shopHero.title")),
				$s(Z(6, 152, 40, 48), Y("seed.shopHero.sub")),
				tc(Z(6, 216, 17, 42), Y("seed.shopHero.cta")),
				ec(Z(62, 40, 32, 300))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = Sc(48, t < 3 ? 0 : 1, t);
			}), Cc("shop-hero", "400px", {
				version: 1,
				layers: [
					_c("bg"),
					vc(.8, .25, .28, .6),
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
				let r = ec(Z(e, 88, 21, 170)), i = $s(Z(e, 266, 21, 34), Y("seed.shopCategories.tile", { name: n }), { align: "center" });
				return r.mobileOrder = Sc(88, t, 0), i.mobileOrder = Sc(88, t, 1), [r, i];
			}, t = Cc("shop-categories", "360px", gc(_c("bg")), [
				$s(Z(6, 28, 60, 38), Y("seed.shopCategories.title")),
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
			let { x: t, y: n, n: r } = xc(e, 4, 6, 23.5, 88, 220, 21, 212), i = ec(Z(t, n, 21, 170)), a = $s(Z(t, n + 178, 21, 34), Y("seed.shopCategories.tile", { name: Y("seed.shopCategories.newCat") }), { align: "center" });
			return i.mobileOrder = Sc(88, r, 0), a.mobileOrder = Sc(88, r, 1), {
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
				let i = nc(Z(e + 10.5, 88, 4, 52), r, 44), a = $s(Z(e, 148, 25, 96), Y(n), { align: "center" });
				return i.mobileOrder = Sc(88, t, 0), a.mobileOrder = Sc(88, t, 1), [i, a];
			}, t = Cc("shop-trust", "300px", gc(_c("bg")), [
				$s(Z(6, 28, 60, 38), Y("seed.shopTrust.title")),
				...e(6, 0, "seed.shopTrust.t1", "✓"),
				...e(37.5, 1, "seed.shopTrust.t2", "↻"),
				...e(69, 2, "seed.shopTrust.t3", "✉")
			]);
			return t.theme = "muted", t;
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = xc(e, 3, 6, 31.5, 148, 216, 25, 156, -60), i = nc(Z(t + 10.5, n - 60, 4, 52), "✓", 44), a = $s(Z(t, n, 25, 96), Y("seed.shopTrust.newItem"), { align: "center" });
			return i.mobileOrder = Sc(88, r, 0), a.mobileOrder = Sc(88, r, 1), {
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
				$s(Z(6, 56, 52, 100), Y("seed.shopShowcase.title")),
				$s(Z(6, 164, 42, 56), Y("seed.shopShowcase.text")),
				tc(Z(6, 236, 18, 42), Y("seed.shopShowcase.cta")),
				ec(Z(62, 48, 32, 240))
			];
			e.forEach((e, t) => {
				e.mobileOrder = Sc(56, t < 3 ? 0 : 1, t);
			});
			let t = Cc("shop-showcase", "340px", gc(_c("bg")), e);
			return t.theme = "deep", t;
		}
	}), e.sections.define("checkout", {
		label: "Checkout",
		labelKey: "preset.checkout.label",
		group: "Shop",
		groupKey: "presetGroup.shop",
		hint: "Order form that sends the basket as an email or to an endpoint",
		hintKey: "preset.checkout.hint",
		create: () => Cc("checkout", "560px", gc(_c("bg")), [$s(Z(6, 28, 50, 38), Y("seed.checkout.title")), uc(Z(25, 96, 50, 430))])
	}), e.sections.define("cta", {
		label: "CTA banner",
		labelKey: "preset.cta.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Full width with one clear action",
		hintKey: "preset.cta.hint",
		create: () => Cc("cta", "280px", gc(_c("surface"), vc(.5, .5, .3, .7)), [
			$s(Z(20, 56, 60, 40), Y("seed.cta.title"), { align: "center" }),
			$s(Z(25, 104, 50, 26), Y("seed.cta.sub"), { align: "center" }),
			tc(Z(42, 148, 16, 42), Y("seed.join"))
		])
	}), e.sections.define("quote", {
		label: "Quote",
		labelKey: "preset.quote.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Large quote with attribution",
		hintKey: "preset.quote.hint",
		create: () => Cc("quote", "300px", gc(_c("bg")), [pc(Z(20, 56, 60, 190), {
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
				let a = hc(Z(e, 76, 25, 120), {
					value: n,
					suffix: r,
					label: i
				});
				return a.mobileOrder = Sc(76, t, 0), a;
			};
			return Cc("stats", "260px", gc(_c("surface")), [
				e(6, 0, "120", "+", Y("seed.stats.l1")),
				e(37.5, 1, "25", "", Y("seed.stats.l2")),
				e(69, 2, "1981", "", Y("seed.stats.l3"))
			]);
		},
		itemLabel: "number",
		itemLabelKey: "item.number",
		item: (e) => {
			let { x: t, y: n, n: r } = xc(e, 3, 6, 31.5, 76, 140, 25, 120), i = hc(Z(t, n, 25, 120), {
				value: "42",
				label: Y("seed.stats.newLabel")
			});
			return i.mobileOrder = Sc(76, r, 0), {
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
			let e = (e) => ec(Z(e, 108, 18.5, 100), {
				alt: Y("seed.sponsors.alt"),
				fit: "contain",
				radius: null,
				saturate: 0
			});
			return Cc("sponsors", "280px", gc(_c("bg")), [
				$s(Z(6, 28, 60, 36), Y("seed.sponsors.title")),
				e(5.5),
				e(29),
				e(52.5),
				e(76)
			]);
		},
		itemLabel: "logo",
		itemLabelKey: "item.logo",
		item: (e) => {
			let { x: t, y: n } = xc(e, 4, 5.5, 23.5, 108, 124, 18.5, 100);
			return {
				blocks: [ec(Z(t, n, 18.5, 100), {
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
		create: () => Cc("membership", "500px", gc(_c("surface")), [
			$s(Z(6, 28, 50, 38), Y("seed.membership.title")),
			$s(Z(14, 88, 32, 250), Y("seed.membership.tier1"), {
				align: "center",
				box: !0
			}),
			$s(Z(54, 88, 32, 250), Y("seed.membership.tier2"), {
				align: "center",
				box: !0
			}),
			tc(Z(42, 358, 16, 42), Y("seed.join")),
			$s(Z(25, 414, 50, 30), Y("seed.membership.vipps"), { align: "center" })
		])
	});
}
//#endregion
//#region ../template/assets/engine/0.7.4/templates-model.js
var Tc = [
	"section",
	"blocks",
	"page"
];
function Ec(e) {
	return Wa(String(e ?? ""), "");
}
function Dc(e, t, { id: n, title: r }) {
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
var Oc = [
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
function kc(e) {
	let t = String(e ?? "");
	return /[",\n\r]/.test(t) ? `"${t.replaceAll("\"", "\"\"")}"` : t;
}
function Ac(e, t) {
	return t === "sizes" ? (e.sizes ?? []).join("|") : t === "colors" ? (e.colors ?? []).map((e) => e.name).join("|") : e[t] ?? "";
}
function jc(e) {
	let t = [Oc.join(",")];
	for (let n of e ?? []) t.push(Oc.map((e) => kc(Ac(n, e))).join(","));
	return t.join("\n") + "\n";
}
function Mc(e) {
	let t = [], n = [], r = "", i = !1, a = String(e ?? "");
	for (let e = 0; e < a.length; e += 1) {
		let o = a[e];
		i ? o === "\"" && a[e + 1] === "\"" ? (r += "\"", e += 1) : o === "\"" ? i = !1 : r += o : o === "\"" ? i = !0 : o === "," ? (n.push(r), r = "") : o === "\n" || o === "\r" ? (o === "\r" && a[e + 1] === "\n" && (e += 1), n.push(r), t.push(n), n = [], r = "") : r += o;
	}
	return (r !== "" || n.length) && (n.push(r), t.push(n)), t.filter((e) => e.some((e) => e.trim() !== ""));
}
var Nc = (e) => String(e ?? "").split("|").map((e) => e.trim()).filter(Boolean);
function Pc(e) {
	let t = Mc(e);
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
		let s = Nc(t.sizes);
		s.length && (o.sizes = s);
		let c = Nc(t.colors);
		c.length && (o.colors = c.map((e) => ({ name: e }))), r.push(o);
	}
	return {
		entries: r,
		skipped: i
	};
}
//#endregion
//#region ../template/assets/engine/0.7.4/feeds.js
function Fc(e) {
	return String(e ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&apos;");
}
function Ic(e, t) {
	let n = String(t ?? "").replace(/\/+$/, "");
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${(e ?? []).filter((e) => !e.noindex).map((e) => `  <url><loc>${Fc(n + (e.path === "/" ? "/" : e.path))}</loc></url>`).join("\n")}\n</urlset>\n`;
}
function Lc(e) {
	return `User-agent: *\nDisallow: /admin/\n\nSitemap: ${String(e ?? "").replace(/\/+$/, "")}/sitemap.xml\n`;
}
var Rc = [
	"news",
	"notices",
	"publications"
];
function zc(e) {
	let t = String(e.origin ?? "").replace(/\/+$/, ""), n = (e.items ?? []).map((n) => {
		let r = n.href ? new URL(n.href, t + "/").href : t + "/", i = n.date ? new Date(n.date) : null, a = i && !Number.isNaN(i.getTime()) ? `\n      <pubDate>${i.toUTCString()}</pubDate>` : "", o = n.text ? `\n      <description>${Fc(n.text)}</description>` : "";
		return `    <item>\n      <title>${Fc(n.title)}</title>\n      <link>${Fc(r)}</link>\n      <guid isPermaLink="false">${Fc(`${e.path}#${n.id ?? n.title}`)}</guid>${o}${a}\n    </item>`;
	}).join("\n");
	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${Fc(e.title)}</title>\n    <link>${Fc(t + "/")}</link>\n    <description>${Fc(e.description ?? e.title)}</description>\n${n}${n ? "\n" : ""}  </channel>\n</rss>\n`;
}
function Bc(e) {
	return Number(e) === 2 ? 2 : 1;
}
//#endregion
//#region ../template/assets/engine/0.7.4/gallery-layout.js
var Vc = [
	"floating",
	"fill",
	"band",
	"mosaic"
], Hc = [
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
], Uc = [
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
], Wc = [
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
], Gc = [
	"square",
	"circle",
	"triangle",
	"diamond",
	"hexagon",
	"octagon",
	"star",
	"heart"
], Kc = {
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
}, qc = {
	floating: "drift",
	fill: "none",
	mosaic: "crossfade",
	band: "none"
}, Jc = {
	min: 1,
	max: 20,
	dflt: 8
}, Yc = {
	min: 60,
	max: 400
}, Xc = {
	floating: 140,
	band: 156,
	mosaic: 140,
	fill: 0
}, Zc = {
	polaroid: "#ffffff",
	border: "#ffffff",
	thick: "#ffffff",
	double: "#ffffff",
	dark: "#161616",
	glow: "accent"
}, Qc = 1.35, $c = {
	min: 0,
	max: 1,
	dflt: .85
}, el = {
	min: 0,
	max: 15,
	dflt: 5
}, tl = {
	min: 0,
	max: 48,
	dflt: 5
}, nl = {
	min: .5,
	max: 90,
	dflt: 30
}, rl = {
	min: .5,
	max: 90,
	dflt: 12
}, il = {
	min: 4,
	max: 20,
	dflt: 12
};
function al(e) {
	let t = String(e), n = 5381;
	for (let e = 0; e < t.length; e++) n = (n << 5) + n + t.charCodeAt(e) >>> 0;
	return n;
}
function ol(e, t) {
	let n = al(`${e}:${t}`);
	return n ^= n >>> 15, n = Math.imul(n, 739982445) >>> 0, n ^= n >>> 12, n = Math.imul(n, 695872825) >>> 0, n ^= n >>> 15, (n >>> 0) / 4294967296;
}
function sl(e) {
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
function cl(e) {
	return Array.from({ length: Math.max(1, Math.round(Number(e) || 0)) }, (e, t) => ({ src: sl(t) }));
}
var ll = (e) => Math.round(e * 100) / 100;
function ul(e, { min: t, max: n, dflt: r }) {
	if (e == null || e === "") return r;
	let i = Number(e);
	return Number.isFinite(i) ? Math.min(n, Math.max(t, i)) : r;
}
function dl(e) {
	return Vc.includes(e) ? e : "floating";
}
function fl(e, t) {
	let n = dl(e);
	return Kc[n].includes(t) ? t : qc[n];
}
function pl(e) {
	return Kc[dl(e)];
}
function ml({ style: e = "floating", motion: t, reducedMotion: n = !1 } = {}) {
	return n ? !1 : dl(e) === "band" || fl(e, t) !== "none";
}
function hl(e, t, n, r = !1) {
	let i = Math.round(ul(e, dl(t) === "mosaic" ? il : Jc)), a = Number(n);
	return !r && Number.isFinite(a) && a > 0 ? Math.min(i, a) : i;
}
function gl(e, t) {
	let n = Xc[dl(t)] || Xc.floating;
	return Math.round(ul(e, {
		...Yc,
		dflt: n
	}));
}
function _l(e) {
	return bl(e) in Zc;
}
function vl(e, t) {
	let n = Zc[bl(e)] ?? "";
	return n && typeof t == "string" && t.trim() ? t.trim() : n;
}
function yl(e) {
	return Hc.includes(e) ? e : "rect";
}
function bl(e) {
	return Uc.includes(e) ? e : "shadow";
}
function xl(e) {
	return Wc.includes(e) ? e : "natural";
}
function Sl(e, t) {
	if (bl(t) === "polaroid") return .84;
	let n = yl(e);
	return Gc.includes(n) ? 1 : n === "arch" ? .8 : Qc;
}
function Cl(e) {
	return ["rect", "square"].includes(yl(e));
}
function wl(e) {
	return ul(e, rl);
}
function Tl(e) {
	return ul(e, $c);
}
function El(e) {
	return ul(e, el);
}
function Dl(e) {
	return Math.round(ul(e, tl));
}
function Ol(e) {
	return ul(e, nl);
}
function kl(e) {
	return Bc(e);
}
function Al(e, t) {
	let n = Number(e);
	return Number.isFinite(n) && n > 0 ? Math.round(n) : Number(t) || 1;
}
function jl(e, { count: t, seed: n, size: r, spread: i, tilt: a, style: o = "floating", repeat: s = !1 } = {}) {
	let c = (Array.isArray(e) ? e : []).filter((e) => e && typeof e.src == "string" && e.src), l = hl(t, o, c.length, s), u = gl(r, o), d = Tl(i), f = El(a), p = n == null || n === "" ? 1 : n, m = Math.ceil(Math.sqrt(l * 1.6)), h = Math.ceil(l / m), g = Array.from({ length: m * h }, (e, t) => t).map((e) => ({
		cell: e,
		at: ol(p, `cell${e}`)
	})).sort((e, t) => e.at - t.at).map((e) => e.cell), _ = [];
	for (let e = 0; e < l; e++) {
		let t = g[e], n = (t % m + .5) / m + (ol(p, `x${e}`) - .5) * (.9 / m), r = (Math.floor(t / m) + .5) / h + (ol(p, `y${e}`) - .5) * (.9 / h);
		_.push({
			src: c.length ? c[e % c.length].src : "",
			index: c.length ? e % c.length : -1,
			x: ll(50 + (n - .5) * 100 * d),
			y: ll(50 + (r - .5) * 100 * d),
			w: Math.round(u * (.8 + ol(p, `w${e}`) * .4)),
			rot: Ml(p, e, f),
			phase: ll(ol(p, `p${e}`)),
			heading: ll(ol(p, `h${e}`))
		});
	}
	return _;
}
function Ml(e, t, n) {
	return ll((ol(e == null || e === "" ? 1 : e, `r${t}`) - .5) * 2 * El(n));
}
function Nl(e, t) {
	let n = e == null || e === "" ? 1 : e, r = ol(n, `m${t}`);
	return {
		cols: r < .3 ? 2 : 1,
		rows: r > .7 || r < .1 ? 2 : 1,
		phase: ll(ol(n, `mp${t}`))
	};
}
function Pl(e, t, n, r = !1) {
	let i = hl(e, "mosaic", n, r);
	return Array.from({ length: i }, (e, n) => Nl(t, n));
}
//#endregion
//#region ../template/assets/engine/0.7.4/preset-thumb.js
var Fl = /^#[0-9a-fA-F]{3,8}$/, Il = /^[a-z][a-z0-9-]*$/, Ll = "#171c26", Rl = "#232a38", zl = "#98a1b3", Bl = "#7c5cff", Vl = (e, t) => `var(--urd-color-${e}, ${t})`;
function Hl(e, t) {
	return typeof e == "string" ? Fl.test(e) ? e : Il.test(e) ? Vl(e, t) : t : t;
}
function Ul(e, t = 800) {
	let n = Number.parseFloat(e);
	return !Number.isFinite(n) || n <= 0 ? 400 : typeof e == "string" && e.trim().endsWith("vh") ? n / 100 * t : n;
}
var Wl = (e) => Math.round(e * 10) / 10, Gl = (e, t, n) => Math.min(n, Math.max(t, e)), Kl = (e, t, n, r, i, a = "") => `<rect x="${Wl(e)}" y="${Wl(t)}" width="${Wl(Math.max(n, 1))}" height="${Wl(Math.max(r, 1))}" fill="${i}"${a}/>`;
function ql(e) {
	if (e?.theme) return e.theme === "inverse" || e.theme === "deep" ? Vl("text", zl) : e.theme === "accent" ? Vl("accent", Bl) : Vl("surface", Rl);
	for (let t of e?.background?.layers ?? []) {
		if (t.type === "color") return Hl(t.props?.value, Ll);
		if (t.type === "gradient") return Hl(Array.isArray(t.props?.stops) ? t.props.stops[0] : null, Ll);
	}
	return Vl("bg", Ll);
}
function Jl(e, t, n, r, i) {
	let a = /<h[1-3]/.test(String(i?.html ?? "")), o = i?.align === "center", s = Vl("text", zl), c = [];
	i?.box && c.push(Kl(e, t, n, r, Vl("surface", Rl), " rx=\"1.5\""));
	let l = i?.box ? Math.min(2, n * .06) : 0, u = e + l, d = n - l * 2, f = [
		.72,
		.9,
		.5
	], p = [
		a ? 4 : 2.2,
		2.2,
		2.2
	], m = Gl(r / (p[0] + p[1] + p[2] + 4.8 + 2), 0, 1), h = t + l + Math.min(1, r * .08);
	for (let e = 0; e < 3; e++) {
		let n = Math.min(Math.max(e === 0 ? a ? 1.4 : 1 : .8, p[e] * m), Math.max(r, 1));
		if (e > 0 && h + n > t + r - l) break;
		let i = d * f[e], g = o ? u + (d - i) / 2 : u;
		c.push(Kl(g, h, i, n, s, ` opacity="${e === 0 ? .8 : .4}" rx="${Wl(Math.min(1, n / 2))}"`)), h += n + Math.max(.8, 2.4 * m);
	}
	return c.join("");
}
function Yl(e, t, n, r, i = !1) {
	let a = Vl("text", zl), o = [];
	i ? (o.push(Kl(e, t, n, r, Vl("surface", Rl), " rx=\"1.5\" opacity=\"0.35\"")), o.push(`<rect x="${Wl(e + .4)}" y="${Wl(t + .4)}" width="${Wl(Math.max(n - .8, 1))}" height="${Wl(Math.max(r - .8, 1))}" fill="none" stroke="${a}" stroke-width="0.6" stroke-dasharray="2 2" opacity="0.35" rx="1.5"/>`)) : o.push(Kl(e, t, n, r, Vl("surface", Rl), " rx=\"1.5\""));
	let s = i ? .15 : .4, c = (t) => Wl(e + n * t), l = (e) => Wl(t + r * e);
	return o.push(`<polygon points="${c(.08)},${l(.9)} ${c(.42)},${l(.38)} ${c(.62)},${l(.68)} ${c(.75)},${l(.5)} ${c(.92)},${l(.9)}" fill="${a}" opacity="${s}"/>`), o.push(`<circle cx="${c(.28)}" cy="${l(.26)}" r="${Wl(Math.max(1, Math.min(n, r) * .1))}" fill="${a}" opacity="${Wl(s + .1)}"/>`), o.join("");
}
function Xl(e, t, n, r, i) {
	let a = !(Array.isArray(i?.images) && i.images.length), o = Math.max(1, n * .03), s = (n - o * 2) / 3, c = [];
	for (let n = 0; n < 3; n++) c.push(Yl(e + n * (s + o), t, s, r, a));
	return c.join("");
}
function Zl(e, t, n, r) {
	let i = Math.max(1, n * .03), a = (n - i * 2) / 3, o = [];
	for (let n = 0; n < 3; n++) {
		let s = e + n * (a + i);
		o.push(Kl(s, t, a, r * .55, Vl("surface", Rl), " rx=\"1.5\"")), o.push(Kl(s, t + r * .62, a * .8, 2, Vl("text", zl), " opacity=\"0.5\" rx=\"1\""));
	}
	return o.join("");
}
function Ql(e, t, n, r, i) {
	let a = Hl(i?.color, Bl), o = i?.kind;
	return o === "circle" ? `<ellipse cx="${Wl(e + n / 2)}" cy="${Wl(t + r / 2)}" rx="${Wl(Math.max(n / 2, 1))}" ry="${Wl(Math.max(r / 2, 1))}" fill="${a}" opacity="0.8"/>` : o === "triangle" ? `<polygon points="${Wl(e)},${Wl(t + r)} ${Wl(e + n / 2)},${Wl(t)} ${Wl(e + n)},${Wl(t + r)}" fill="${a}" opacity="0.8"/>` : o === "line" || o === "arrow" ? Kl(e, t + r / 2 - .75, n, 1.5, a, " opacity=\"0.85\" rx=\"0.75\"") : Kl(e, t, n, r, a, " opacity=\"0.8\" rx=\"1\"");
}
function $l(e, t, n, r, i, a) {
	if (e === "text") return Jl(t, n, r, i, a);
	if (e === "image") return Yl(t, n, r, i, !a?.src);
	if (e === "gallery") return Xl(t, n, r, i, a);
	if (e === "collection") return Zl(t, n, r, i);
	if (e === "faq") {
		let e = Gl(Math.floor(i / 5), 2, 3), a = Math.max(.6, i * .04), o = (i - a * (e - 1)) / e, s = [];
		for (let i = 0; i < e; i += 1) {
			let e = n + i * (o + a);
			s.push(Kl(t, e, r, o, Vl("surface", Rl), " rx=\"1\"")), s.push(Kl(t + r * .06, e + o / 2 - .7, r * .55, 1.4, Vl("text", zl), " opacity=\"0.5\" rx=\"0.7\"")), s.push(`<circle cx="${Wl(t + r * .92)}" cy="${Wl(e + o / 2)}" r="0.9" fill="${Vl("text", zl)}" opacity="0.4"/>`);
		}
		return s.join("");
	}
	if (e === "shape") return Ql(t, n, r, i, a);
	if (e === "button") return Kl(t, n, r, i, Vl("accent", Bl), ` rx="${Wl(Math.min(i / 2, 4))}"`);
	if (e === "icon") {
		let e = Math.max(1.2, Math.min(r, i) / 2);
		return `<circle cx="${Wl(t + r / 2)}" cy="${Wl(n + i / 2)}" r="${Wl(e)}" fill="${Vl("accent", Bl)}" opacity="0.85"/>`;
	}
	if (e === "video") {
		let e = [Kl(t, n, r, i, Vl("surface", Rl), " rx=\"1.5\"")], a = t + r / 2, o = n + i / 2, s = Math.max(1.5, Math.min(r, i) * .22);
		return e.push(`<polygon points="${Wl(a - s / 2)},${Wl(o - s)} ${Wl(a - s / 2)},${Wl(o + s)} ${Wl(a + s)},${Wl(o)}" fill="${Vl("text", zl)}" opacity="0.6"/>`), e.join("");
	}
	if (e === "timeline") {
		let e = [Kl(t + 1, n, 1.4, i, Vl("accent", Bl), " opacity=\"0.7\" rx=\"0.7\"")];
		for (let a = 0; a < 3; a += 1) {
			let o = n + i * (.18 + a * .32);
			e.push(`<circle cx="${Wl(t + 1.7)}" cy="${Wl(o)}" r="1.6" fill="${Vl("accent", Bl)}"/>`), e.push(Kl(t + 5, o - 1, r * .5, 2, Vl("text", zl), " opacity=\"0.5\" rx=\"1\""));
		}
		return e.join("");
	}
	if (e === "quote") return [
		`<text x="${Wl(t + r / 2)}" y="${Wl(n + i * .34)}" text-anchor="middle" font-size="${Wl(Math.min(r, i) * .5)}" font-family="Georgia, serif" fill="${Vl("accent", Bl)}">“</text>`,
		Kl(t + r * .15, n + i * .48, r * .7, 2, Vl("text", zl), " opacity=\"0.6\" rx=\"1\""),
		Kl(t + r * .25, n + i * .62, r * .5, 2, Vl("text", zl), " opacity=\"0.6\" rx=\"1\""),
		Kl(t + r * .35, n + i * .82, r * .3, 1.6, Vl("text", zl), " opacity=\"0.35\" rx=\"0.8\"")
	].join("");
	if (e === "ribbon") return [
		Kl(t, n + i * .3, r, i * .4, Vl("accent", Bl), " opacity=\"0.85\" rx=\"1\""),
		Kl(t + r * .08, n + i * .46, r * .18, 1.8, Vl("bg", Ll), " opacity=\"0.9\" rx=\"0.9\""),
		Kl(t + r * .34, n + i * .46, r * .24, 1.8, Vl("bg", Ll), " opacity=\"0.9\" rx=\"0.9\""),
		Kl(t + r * .66, n + i * .46, r * .2, 1.8, Vl("bg", Ll), " opacity=\"0.9\" rx=\"0.9\"")
	].join("");
	if (e === "stats") return [Kl(t + r * .28, n + i * .15, r * .44, i * .42, Vl("accent", Bl), " opacity=\"0.85\" rx=\"1\""), Kl(t + r * .32, n + i * .72, r * .36, 1.6, Vl("text", zl), " opacity=\"0.4\" rx=\"0.8\"")].join("");
	if (e === "table") {
		let e = Math.max(1.6, i * .22), a = [Kl(t, n, r, e, Vl("accent", Bl), " opacity=\"0.5\" rx=\"0.8\"")], o = Gl(Math.floor((i - e) / 3.2), 1, 3);
		for (let s = 0; s < o; s += 1) a.push(Kl(t, n + e + 1 + s * ((i - e - 1) / o), r, 1, Vl("text", zl), " opacity=\"0.3\""));
		return a.push(Kl(t + r * .33, n, .6, i, Vl("text", zl), " opacity=\"0.2\"")), a.push(Kl(t + r * .66, n, .6, i, Vl("text", zl), " opacity=\"0.2\"")), a.join("");
	}
	if (e === "share") {
		let e = Math.max(1.2, Math.min(i / 2, r / 9)), a = [];
		for (let r = 0; r < 4; r += 1) a.push(`<circle cx="${Wl(t + e + r * (e * 2 + 1.5))}" cy="${Wl(n + i / 2)}" r="${Wl(e)}" fill="${Vl("accent", Bl)}" opacity="0.8"/>`);
		return a.join("");
	}
	if (e === "countdown") {
		let e = Math.max(.8, r * .03), a = (r - e * 3) / 4, o = [];
		for (let r = 0; r < 4; r += 1) {
			let s = t + r * (a + e);
			o.push(Kl(s, n, a, i, Vl("surface", Rl), " rx=\"1\"")), o.push(Kl(s + a * .25, n + i * .2, a * .5, i * .35, Vl("accent", Bl), " opacity=\"0.85\" rx=\"0.8\""));
		}
		return o.join("");
	}
	if (e === "audio") {
		let e = [Kl(t, n, r, i, Vl("surface", Rl), " rx=\"1.5\"")], a = n + i / 2, o = Math.max(1.2, i * .28);
		return e.push(`<polygon points="${Wl(t + r * .06)},${Wl(a - o)} ${Wl(t + r * .06)},${Wl(a + o)} ${Wl(t + r * .06 + o * 1.4)},${Wl(a)}" fill="${Vl("accent", Bl)}" opacity="0.85"/>`), e.push(Kl(t + r * .2, a - .6, r * .7, 1.2, Vl("text", zl), " opacity=\"0.35\" rx=\"0.6\"")), e.join("");
	}
	if (e === "product") {
		let e = Math.max(.8, r * .03), a = (r - e * 2) / 3, o = [];
		for (let r = 0; r < 3; r += 1) {
			let s = t + r * (a + e);
			o.push(Kl(s, n, a, i, Vl("surface", Rl), " rx=\"1\"")), o.push(Kl(s + a * .08, n + i * .06, a * .84, i * .42, Vl("text", zl), " opacity=\"0.15\" rx=\"0.8\"")), o.push(Kl(s + a * .08, n + i * .56, a * .6, 1.4, Vl("text", zl), " opacity=\"0.5\" rx=\"0.7\"")), o.push(Kl(s + a * .08, n + i * .72, a * .35, 1.4, Vl("accent", Bl), " opacity=\"0.85\" rx=\"0.7\"")), o.push(Kl(s + a * .08, n + i * .84, a * .84, i * .1, Vl("accent", Bl), " opacity=\"0.6\" rx=\"1\""));
		}
		return o.join("");
	}
	if (e === "cart") {
		let e = Math.max(1.5, Math.min(r, i) / 2.4), a = t + r / 2, o = n + i / 2;
		return [
			`<circle cx="${Wl(a)}" cy="${Wl(o)}" r="${Wl(e)}" fill="${Vl("surface", Rl)}"/>`,
			Kl(a - e * .5, o - e * .25, e, e * .55, Vl("text", zl), " opacity=\"0.5\" rx=\"0.4\""),
			`<circle cx="${Wl(a + e * .75)}" cy="${Wl(o - e * .75)}" r="${Wl(Math.max(.9, e * .35))}" fill="${Vl("accent", Bl)}"/>`
		].join("");
	}
	return e === "checkout" ? [
		Kl(t, n, r * .7, 1.2, Vl("text", zl), " opacity=\"0.5\" rx=\"0.6\""),
		Kl(t, n + i * .12, r * .5, 1.2, Vl("text", zl), " opacity=\"0.35\" rx=\"0.6\""),
		Kl(t, n + i * .3, r, i * .14, Vl("surface", Rl), " rx=\"1\""),
		Kl(t, n + i * .5, r, i * .14, Vl("surface", Rl), " rx=\"1\""),
		Kl(t, n + i * .78, r * .45, i * .16, Vl("accent", Bl), " opacity=\"0.85\" rx=\"1.2\"")
	].join("") : Kl(t, n, r, i, Vl("surface", Rl), " rx=\"1.5\"");
}
function eu(e, t, n) {
	let r = Array.isArray(e?.blocks) ? e.blocks : [], i = r.map((e) => (e.frames?.desktop?.y ?? 0) + (e.frames?.desktop?.h ?? 0)), a = n / Math.max(Ul(e?.size?.minHeight), i.length ? Math.max(...i) + 16 : 0), o = [Kl(0, 0, t, n, ql(e))];
	for (let r of e?.background?.layers ?? []) {
		if (r.type !== "glow") continue;
		let e = r.props ?? {};
		o.push(`<circle cx="${Wl(Gl(e.x ?? .5, 0, 1) * t)}" cy="${Wl(Gl(e.y ?? .3, 0, 1) * n)}" r="${Wl(t * Gl(e.radius ?? .5, .1, 1) * .5)}" fill="${Hl(e.color, Bl)}" opacity="${Wl(Gl(e.opacity ?? .3, 0, .5))}"/>`);
	}
	for (let r of e?.background?.layers ?? []) {
		if (r.type !== "slideshow") continue;
		let e = r.props ?? {}, i = e.style ?? "floating", a = Vl("surface", Rl);
		if (i === "floating") {
			let r = e.look === "polaroid", s = t * (r ? .17 : .13), c = s / (r ? .84 : 1.35);
			for (let r of jl(e.images, {
				...e,
				seed: e.seed || 1,
				style: i
			})) {
				let e = r.x / 100 * t - s / 2, i = r.y / 100 * n - c / 2, l = ` rx="1" opacity="0.75" transform="rotate(${Wl(r.rot)} ${Wl(e + s / 2)} ${Wl(i + c / 2)})"`;
				o.push(Kl(e, i, s, c, a, l));
			}
		} else if (i === "band") {
			let r = Number(e.rows) === 1 ? 1 : 2, i = n * (r === 1 ? .4 : .3), s = i * 1.33;
			for (let e = 0; e < r; e += 1) {
				let c = r === 1 ? (n - i) / 2 : n * .1 + e * (i + n * .1);
				for (let n = -s * (e * .5); n < t; n += s + 3) o.push(Kl(n, c, s, i, a, " rx=\"1\" opacity=\"0.75\""));
			}
		} else if (i === "mosaic") {
			let r = (t - 10) / 4, i = n / 3.4, s = 0, c = 0;
			for (let t of Pl(e.count, e.seed || 1)) {
				s + t.cols > 4 && (s = 0, c += 1);
				let e = 2 + c * (i + 2);
				if (e > n) break;
				o.push(Kl(2 + s * (r + 2), e, r * t.cols + 2 * (t.cols - 1), i * t.rows + 2 * (t.rows - 1), a, " rx=\"1\" opacity=\"0.75\"")), s += t.cols, s >= 4 && (s = 0, c += 1);
			}
		}
	}
	let s = t * .06, c = t - s * 2;
	for (let e of r) {
		let r = e.frames?.desktop;
		if (!r) continue;
		let i = Gl(s + (r.x ?? 0) * (c / 100), 0, t - 2), l = Gl((r.y ?? 0) * a, 0, n - 2), u = Gl((r.w ?? 10) * (c / 100), 2, t - i), d = Gl((r.h ?? 20) * a, 2, n - l);
		o.push($l(e.type, i, l, u, d, e.props));
	}
	return o.join("");
}
function tu(e, { w: t = 96, h: n = 116, max: r = 6 } = {}) {
	let i = (Array.isArray(e?.sections) ? e.sections : []).slice(0, r);
	if (!i.length) return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${Kl(0, 0, t, n, Vl("bg", Ll))}</svg>`;
	let a = i.map((e) => Gl(Ul(e?.size?.minHeight), 160, 900)), o = a.reduce((e, t) => e + t, 0), s = n - 1 * (i.length - 1), c = [], l = 0;
	for (let e = 0; e < i.length; e += 1) {
		let n = Math.max(6, a[e] / o * s);
		c.push(`<g transform="translate(0 ${Wl(l)})">${eu(i[e], t, n)}</g>`), l += n + 1;
	}
	return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${c.join("")}</svg>`;
}
//#endregion
//#region ../template/assets/engine/0.7.4/page-presets.js
var nu = /* @__PURE__ */ new Map();
wc({ sections: { define: (e, t) => nu.set(e, t) } });
var ru = [
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
function iu(e, { pageId: t, title: n }) {
	let r = ru.find((t) => t.id === e);
	return r ? {
		schemaVersion: 4,
		meta: {
			id: t,
			title: n
		},
		sections: r.sections.map((e) => nu.get(e).create())
	} : null;
}
//#endregion
//#region ../template/assets/engine/0.7.4/palette-search.js
function au(e) {
	return String(e ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}
function ou(e, t) {
	let n = au(t).trim(), r = au(e);
	return n ? r.startsWith(n) ? 0 : r.split(/[^a-z0-9]+/).some((e) => e.startsWith(n)) ? 1 : r.includes(n) ? 2 : -1 : 2;
}
function su(e, t, n) {
	return e.map((e, r) => ({
		item: e,
		i: r,
		rank: ou(n(e), t)
	})).filter((e) => e.rank >= 0).sort((e, t) => e.rank - t.rank || e.i - t.i).map((e) => e.item);
}
//#endregion
//#region ../template/assets/engine/0.7.4/theme.js
function cu(e, t, n) {
	return t === "light" || t === "dark" ? t : n ? "dark" : "light";
}
function lu(e, t) {
	let n = e.tokens || {}, r = e.scheme === "dark" ? "dark" : "light";
	if (!e.alt?.tokens || t === r) return n;
	let i = {};
	for (let t of /* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(e.alt.tokens)])) i[t] = {
		...n[t],
		...e.alt.tokens[t]
	};
	return i;
}
var uu = /^[a-zA-Z0-9#%.,()'"\s+\-*/]+$/;
function du(e) {
	return typeof e == "string" && uu.test(e) && !/url\(|\/\*|\*\/|expression/i.test(e);
}
function fu(e) {
	let t = e.tokens || {}, n = lu(e, "light"), r = lu(e, "dark"), i = e.scheme === "dark" ? "dark" : "light", a = [], o = [], s = [], c = /* @__PURE__ */ new Set([
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
			du(c) && (a.push(`  --urd-${e}-${l}: ${c};`), i && a.push(`  --urd-base-${l}: ${c};`)), u !== d && (i && du(u) && du(d) ? o.push({
				name: l,
				lv: u,
				dv: d
			}) : !i && du(u) && du(d) && s.push({
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
	].some((e) => du(e.color?.["accent-text"])) && du(t.color?.accent);
	u && du(t.color?.bg) && (a.push(`  --urd-color-accent-text: ${t.color.bg};`), a.push(`  --urd-base-accent-text: ${t.color.bg};`));
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
function pu(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
var mu = {
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
}, hu = {
	surface: "sectionTheme.surface",
	accent: "sectionTheme.accent",
	inverse: "sectionTheme.inverse",
	soft: "sectionTheme.soft",
	muted: "sectionTheme.muted",
	deep: "sectionTheme.deep",
	highlighted: "sectionTheme.highlighted"
};
[...new Set(Object.values(mu).flatMap(Object.keys))];
function gu(e) {
	return mu[e] ?? {};
}
function _u(e) {
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
function vu(e, t) {
	let n = _u(e), r = _u(t);
	return n == null || r == null ? null : (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/color.js
var yu = {
	version: 1,
	label: "Colour",
	labelKey: "bgLayer.color",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = pu(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, bu = {
	linear: [
		"pan",
		"pan-loop",
		"rotate"
	],
	radial: ["pulse", "orbit"]
};
function xu(e) {
	let t = Array.isArray(e) && e.length ? e : [{ color: "#0b0e14" }, { color: "#1a1030" }], n = t.map((e) => Math.max(0, Number(e?.share) || 0)), r = n.reduce((e, t) => e + t, 0), i = r <= 0, a = i ? t.length : r, o = 0;
	return t.map((e, t) => {
		let r = i ? 1 : n[t], s = (o + r / 2) / a * 100;
		return o += r, {
			color: e?.color ?? "#0b0e14",
			at: Math.round(s * 100) / 100
		};
	});
}
function Su(e) {
	let t = (e) => Math.round(e * 100) / 100, n = e[0]?.at ?? 0;
	return [...e.map((e) => ({
		color: e.color,
		at: t(e.at - n)
	})), {
		color: e[0]?.color ?? "#0b0e14",
		at: 100
	}];
}
function Cu(e, t, n, r = .5) {
	let i = n % 360 * Math.PI / 180, a = (e) => Math.round(e * 100) / 100 || 0, o = (Math.abs(e * Math.sin(i)) + Math.abs(t * Math.cos(i))) / (1 - Math.min(Math.max(r, 0), .9));
	return {
		period: a(o),
		dx: a(Math.sin(i) * o),
		dy: a(-Math.cos(i) * o)
	};
}
function wu(e, t, n) {
	return `repeating-linear-gradient(${t}deg, ${e.map((e) => `${pu(e.color)} ${Math.round(e.at / 100 * n * 100) / 100}px`).join(", ")})`;
}
function Tu(e) {
	let t = e.kind === "radial" ? "radial" : "linear", n = (bu[t] ?? []).includes(e.animation) ? e.animation : null, r = xu(e.stops), i = r.map((e) => `${pu(e.color)} ${e.at}%`).join(", "), a = {}, o;
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
					stops: Su(r),
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
var Eu = /* @__PURE__ */ new Set(), Du = !1;
function Ou(e) {
	Eu.add(e), !(Du || typeof window > "u") && (Du = !0, window.addEventListener("resize", () => {
		for (let e of [...Eu]) e() || Eu.delete(e);
	}));
}
var ku = !1;
function Au() {
	if (!ku) {
		ku = !0;
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
var ju = {
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
		let n = Tu(t);
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
					let e = Cu(r, i, n.loop.angle, n.loop.maxShare);
					t.style.inset = `${-Math.ceil(e.period)}px`, t.style.background = wu(n.loop.stops, n.loop.angle, e.period), t.style.setProperty("--urd-loop-dx", `${e.dx}px`), t.style.setProperty("--urd-loop-dy", `${e.dy}px`);
				}
				return !0;
			};
			requestAnimationFrame(r), Ou(r);
			return;
		}
		if (n.runner) {
			e.classList.add("urd-bg-loop-host");
			let t = document.createElement("div");
			t.className = n.runner.className, t.style.background = n.runner.background, n.runner.left != null && (t.style.left = n.runner.left), n.runner.top != null && (t.style.top = n.runner.top), e.appendChild(t);
			return;
		}
		e.style.background = n.background, n.className && (e.classList.add(n.className), n.className === "urd-bg-rotate" && Au());
	}
}, Mu = {
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
		let n = pu(t.color), r = t.x ?? .5, i = t.y ?? .3, a = t.radius ?? .5;
		e.style.background = `radial-gradient(circle at ${r * 100}% ${i * 100}%, ${n} 0%, transparent ${a * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, Nu = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", Pu = {
	version: 1,
	label: "Grain",
	labelKey: "bgLayer.grain",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = Nu, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
}, Fu = [
	"dots",
	"grid",
	"diagonal",
	"checks",
	"waves",
	"zigzag",
	"plus",
	"triangles"
], Iu = {
	min: 8,
	max: 160,
	dflt: 28
}, Lu = .12, Ru = {
	dots: "<circle cx=\"12\" cy=\"12\" r=\"3\"/>",
	grid: "<rect width=\"24\" height=\"1.6\"/><rect width=\"1.6\" height=\"24\"/>",
	diagonal: "<path d=\"M-6 6L6 -6M0 24L24 0M18 30L30 18\" fill=\"none\" stroke=\"#000\" stroke-width=\"4\"/>",
	checks: "<rect width=\"12\" height=\"12\"/><rect x=\"12\" y=\"12\" width=\"12\" height=\"12\"/>",
	waves: "<path d=\"M0 12Q6 4 12 12T24 12\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\"/>",
	zigzag: "<path d=\"M0 16L6 8L12 16L18 8L24 16\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\"/>",
	plus: "<path d=\"M12 7V17M7 12H17\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\" stroke-linecap=\"round\"/>",
	triangles: "<path d=\"M0 24L12 4L24 24Z\"/>"
};
function zu(e) {
	return Fu.includes(e) ? e : "dots";
}
function Bu(e) {
	let t = Number(e);
	return !Number.isFinite(t) || t <= 0 ? Iu.dflt : Math.min(Iu.max, Math.max(Iu.min, Math.round(t)));
}
function Vu(e) {
	let t = Number(e);
	return Number.isFinite(t) ? (Math.round(t) % 360 + 360) % 360 : 0;
}
function Hu(e) {
	let t = Number(e);
	return e == null || e === "" || !Number.isFinite(t) ? Lu : Math.min(1, Math.max(0, t));
}
function Uu(e = {}) {
	let t = Bu(e.size), n = Vu(e.rotation), r = Ru[zu(e.pattern)], i = `<pattern id="p" width="${t}" height="${t}" patternUnits="userSpaceOnUse"${n ? ` patternTransform="rotate(${n})"` : ""}><g transform="scale(${t / 24})">${r}</g></pattern>`, a = "<rect width=\"100%\" height=\"100%\" fill=\"url(#p)\"/>";
	return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><defs>${i}</defs>${e.invert === !0 ? `<mask id="m"><rect width="100%" height="100%" fill="#fff"/>${a}</mask><rect width="100%" height="100%" mask="url(#m)"/>` : a}</svg>`;
}
var Wu = () => typeof CSS < "u" && typeof CSS.supports == "function" && (CSS.supports("mask-image", "none") || CSS.supports("-webkit-mask-image", "none")), Gu = {
	version: 1,
	label: "Pattern",
	labelKey: "bgLayer.pattern",
	defaults: () => ({
		pattern: "dots",
		color: "text",
		size: Iu.dflt,
		opacity: Lu,
		rotation: 0,
		invert: !1
	}),
	migrations: {},
	render(e, t) {
		if (!Wu()) return;
		let n = `url("data:image/svg+xml,${encodeURIComponent(Uu(t))}")`;
		e.style.backgroundColor = pu(t.color ?? "text"), e.style.opacity = String(Hu(t.opacity));
		for (let t of ["webkitMask", "mask"]) e.style[`${t}Image`] = n, e.style[`${t}Size`] = "100% 100%", e.style[`${t}Repeat`] = "no-repeat";
	}
}, Ku = [
	"wave",
	"tilt",
	"curve",
	"triangle",
	"zigzag"
], qu = {
	min: 16,
	max: 240,
	dflt: 64
}, Ju = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/api\/photo\?[^\s"'<>\\]{1,2048}|\/(?!\/)[\w%./-]*)$/;
function Yu(e) {
	return typeof e == "string" && Ju.test(e);
}
var Xu = /^(?:https?:\/\/|mailto:|tel:)[^\s]+$/i;
function Zu(e) {
	return typeof e == "string" && Xu.test(e.trim());
}
var Qu = /^(?:\/(?![/\\])[^\s\\]*|#[^\s]*)$/;
function $u(e) {
	return Zu(e) || typeof e == "string" && Qu.test(e.trim());
}
var ed = [
	"launcher",
	"cart",
	"theme"
];
function td(e = {}) {
	let t = Array.isArray(e.tools?.order) ? e.tools.order : [], n = [];
	for (let e of t) ed.includes(e) && !n.includes(e) && n.push(e);
	for (let e of ed) n.includes(e) || n.push(e);
	return n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/image.js
var nd = .4, rd = [
	"none",
	"kenburns",
	"drift"
], id = {
	min: 6,
	max: 60,
	dflt: 20
};
function ad(e) {
	return rd.includes(e) ? e : "none";
}
function od(e) {
	let { min: t, max: n, dflt: r } = id, i = Number(e);
	return !Number.isFinite(i) || i <= 0 ? r : Math.min(n, Math.max(t, i));
}
function sd(e, t) {
	return `${(e ?? .5) * 100}% ${(t ?? .5) * 100}%`;
}
function cd(e, t) {
	return e === "contain" ? "contain" : e === "cover" ? "cover" : `${Math.max(0, t ?? 1) * 100}%`;
}
function ld(e) {
	let t = "-9999px";
	return e === "up" ? `inset(${t} 0 0 0)` : e === "down" ? `inset(0 0 ${t} 0)` : e === "both" ? `inset(${t} 0 ${t} 0)` : "inset(0)";
}
function ud(e, t, n, r = .18) {
	let i = Math.max(0, Math.min(1, n)) * nd * t;
	return Math.round(Math.min(i, r * e));
}
function dd(e, t, n, r, i) {
	let a = e + t / 2, o = (n / 2 - a) * Math.max(0, Math.min(1, r)) * nd, s = i ?? ud(t, n, r);
	return Math.max(-s, Math.min(s, o)) || 0;
}
var fd = /* @__PURE__ */ new Set(), pd = !1, md = 0;
function hd() {
	md = 0;
	for (let e of [...fd]) e() || fd.delete(e);
}
function gd() {
	md ||= requestAnimationFrame(hd);
}
function _d(e) {
	fd.add(e), e(), !(pd || typeof window > "u") && (pd = !0, window.addEventListener("scroll", gd, { passive: !0 }), window.addEventListener("resize", gd, { passive: !0 }));
}
function vd(e, t, n, r) {
	let i = r === "cover" || r === "tile" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement, o = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
	e.style.willChange = "transform";
	let s = (t) => {
		e.style.top = `-${t}px`, e.style.bottom = `-${t}px`;
	}, c = () => {
		if (!e.isConnected) return !1;
		if (o || document.body.classList.contains("urd-mobile")) return s(n), e.style.transform = "", !0;
		let r = (a ?? e).getBoundingClientRect(), c = window.innerHeight || document.documentElement.clientHeight, l = ud(r.height, c, t, i ? .18 : .6);
		s(i ? Math.max(n, l) : n);
		let u = dd(r.top, r.height, c, t, l);
		return e.style.transform = `translateY(${u.toFixed(1)}px)`, !0;
	};
	_d(c), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(c));
}
function yd() {
	return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("animation-timeline", "view()");
}
var bd = /* @__PURE__ */ new Set(), xd = !1, Sd = 0;
function Cd() {
	Sd = 0;
	for (let e of [...bd]) e() || bd.delete(e);
}
function wd() {
	!Sd && typeof requestAnimationFrame == "function" && (Sd = requestAnimationFrame(Cd));
}
function Td(e) {
	bd.add(e), e(), !(xd || typeof window > "u") && (xd = !0, window.addEventListener("resize", wd, { passive: !0 }));
}
function Ed(e, t, n, r) {
	let i = r === "cover" || r === "tile" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement;
	e.style.willChange = "transform", e.classList.add("urd-parallax-css");
	let o = () => {
		if (!e.isConnected) return !1;
		let r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || document.body.classList.contains("urd-mobile"), o = (a ?? e).getBoundingClientRect(), s = window.innerHeight || document.documentElement.clientHeight, c = ud(o.height, s, t, i ? .18 : .6), l = i && !r ? Math.max(n, c) : n;
		return e.style.setProperty("--urd-px-shift", `${c}px`), e.style.top = `-${l}px`, e.style.bottom = `-${l}px`, !0;
	};
	Td(o), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(o));
}
var Dd = {
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
		motionSpeed: id.dflt
	}),
	migrations: {
		1: (e) => ({
			...e,
			fit: e.fit === "vanlig" ? "plain" : e.fit === "flislegg" ? "tile" : e.fit === "egen" ? "custom" : e.fit
		}),
		2: (e) => ({
			motion: "none",
			motionSpeed: id.dflt,
			...e
		})
	},
	render(e, t) {
		let n = !Yu(t.src);
		n && e.classList.add("urd-bg-demo");
		let r = n ? sl(0) : t.src;
		e.style.opacity = String(t.opacity ?? 1), e.style.clipPath = ld(t.bleed), e.style.zIndex = t.bleed === "down" || t.bleed === "both" ? "1" : "";
		let i = document.createElement("div");
		i.className = "urd-bg-image", i.style.position = "absolute", i.style.left = "0", i.style.right = "0", i.style.top = "0", i.style.bottom = "0";
		let a = ad(t.motion), o = a === "none" ? i : document.createElement("div");
		o !== i && (o.className = `urd-bg-motion urd-bg-motion-${a}`, o.style.position = "absolute", o.style.left = "0", o.style.right = "0", o.style.top = "0", o.style.bottom = "0", o.style.animationDuration = `${od(t.motionSpeed)}s`, i.appendChild(o));
		let s = t.fit === "tile" || t.fit === "repeat";
		o.style.backgroundImage = `url("${r}")`, o.style.backgroundSize = cd(t.fit, t.size), o.style.backgroundRepeat = s ? "repeat" : "no-repeat", o.style.backgroundPosition = sd(t.x, t.y);
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
		e.appendChild(i), t.parallax > 0 && Od(i, t.parallax, o === i ? c : 0, t.fit ?? "cover");
	}
};
function Od(e, t, n, r) {
	yd() ? Ed(e, t, n, r) : vd(e, t, n, r);
}
//#endregion
//#region ../template/assets/engine/0.7.4/gallery-model.js
var kd = [
	"grid",
	"carousel",
	"slides",
	"ribbon",
	"mosaic",
	"polaroid"
], Ad = [
	"grid",
	"mosaic",
	"polaroid"
], jd = {
	min: 80,
	max: 400,
	dflt: 140
}, Md = {
	min: 0,
	max: 15,
	dflt: 4
};
function Nd(e) {
	return kd.includes(e) ? e : "grid";
}
function Pd(e, t, n) {
	return !Number.isFinite(n) || n < 1 ? 0 : (((Number.isFinite(e) ? e : 0) + t) % n + n) % n;
}
function Fd({ count: e = 0, reducedMotion: t = !1 } = {}) {
	return e >= 2 && !t;
}
function Id(e, { min: t = 2, fallback: n = 5 } = {}) {
	let r = Number(e);
	return !Number.isFinite(r) || r <= 0 ? n : Math.max(t, r);
}
//#endregion
//#region ../template/assets/engine/0.7.4/photo-source.js
var Ld = [
	"drive",
	"gphotos",
	"nextcloud",
	"json"
], Rd = {
	min: 1,
	max: 60,
	dflt: 24
}, zd = [
	"name",
	"newest",
	"random"
], Bd = [
	480,
	800,
	1200,
	1600,
	2e3
], Vd = /^[A-Za-z0-9_-]{10,128}$/, Hd = /^(?!\d+(?:\.\d+)*$)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/;
function Ud(e) {
	let t = Number(e);
	return !Number.isFinite(t) || t <= 0 ? Rd.dflt : Math.min(Rd.max, Math.max(Rd.min, Math.round(t)));
}
function Wd(e) {
	let t = typeof e == "string" ? e.trim() : "";
	if (!t) return null;
	if (Vd.test(t) && !t.includes(".")) return {
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
		return Vd.test(t) ? {
			provider: "drive",
			id: t
		} : null;
	}
	if (r === "photos.google.com") {
		let e = /^\/share\/([A-Za-z0-9_-]{10,256})\/?$/.exec(n.pathname), t = n.searchParams.get("key") ?? "";
		return e ? {
			provider: "gphotos",
			id: e[1],
			...Vd.test(t) ? { host: t } : {}
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
	return i && Hd.test(r) ? {
		provider: "nextcloud",
		id: i[1],
		host: r
	} : /\.json$/i.test(n.pathname) && Hd.test(r) ? {
		provider: "json",
		url: n.href
	} : null;
}
function Gd(e) {
	return zd.includes(e) ? e : "name";
}
var Kd = (e) => Gd(e) === "newest" ? "newest" : "name";
function qd(e, t) {
	if (!e || !Ld.includes(e.provider)) return null;
	let n = new URLSearchParams({
		p: e.provider,
		sort: Kd(t),
		max: "200"
	});
	return e.id && n.set("id", e.id), e.host && n.set("host", e.host), e.url && n.set("url", e.url), `/api/photos?${n.toString()}`;
}
function Jd(e, t = 200) {
	return (Array.isArray(e?.photos) ? e.photos : []).filter((e) => typeof e?.src == "string" && e.src.startsWith("/api/photo?")).slice(0, Math.max(1, Math.min(200, Number(t) || 200))).map((e) => ({
		src: e.src,
		name: typeof e.name == "string" ? e.name : ""
	}));
}
function Yd(e) {
	let t = e >>> 0;
	return () => {
		t = t + 1831565813 >>> 0;
		let e = t;
		return e = Math.imul(e ^ e >>> 15, e | 1), e ^= e + Math.imul(e ^ e >>> 7, e | 61), ((e ^ e >>> 14) >>> 0) / 4294967296;
	};
}
function Xd(e, t) {
	let n = [...e], r = Yd(Number(t) || 0);
	for (let e = n.length - 1; e > 0; e--) {
		let t = Math.floor(r() * (e + 1));
		[n[e], n[t]] = [n[t], n[e]];
	}
	return n;
}
function Zd(e, t, n) {
	return Gd(t) === "random" ? Xd(e, n) : [...e];
}
var Qd = 0;
function $d() {
	return Qd ||= typeof crypto < "u" && crypto.getRandomValues ? crypto.getRandomValues(/* @__PURE__ */ new Uint32Array(1))[0] || 1 : Date.now() >>> 0 || 1, Qd;
}
function ef(e, t = 1) {
	let n = (Number(e) || 0) * Math.min(3, Math.max(1, Number(t) || 1));
	return Bd.find((e) => e >= n) ?? Bd[Bd.length - 1];
}
function tf(e, t) {
	if (typeof e != "string" || !e.startsWith("/api/photo?")) return e;
	let n = new URLSearchParams(e.slice(11));
	return n.set("w", String(t)), `/api/photo?${n.toString()}`;
}
var nf = 6e5, rf = 3e4, af = /* @__PURE__ */ new Map(), of = /* @__PURE__ */ new Map();
function sf(e) {
	return e?.source === "folder" && typeof e.folder == "string" ? e.folder.trim() : "";
}
function cf(e, t) {
	let n = qd(Wd(e), t);
	return n ? lf(af.get(n)) : null;
}
function lf(e) {
	if (!e) return null;
	let t = e.value.photos.length ? nf : rf;
	return Date.now() - e.at < t ? e.value : null;
}
function uf(e, t, { force: n = !1 } = {}) {
	let r = qd(Wd(e), t);
	if (!r) return Promise.resolve({
		photos: [],
		error: "badAddress",
		code: "photoFolderUnknown"
	});
	if (!n) {
		let e = lf(af.get(r));
		if (e) return Promise.resolve(e);
		if (of.has(r)) return of.get(r);
	}
	let i = (async () => {
		let e;
		try {
			let t = await fetch(r), n = await t.json().catch(() => null);
			e = t.ok ? {
				photos: Jd(n),
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
		return af.set(r, {
			at: Date.now(),
			value: e
		}), of.delete(r), e;
	})();
	return of.set(r, i), i;
}
function df(e) {
	let t = sf(e), n = t ? cf(t, e.order) : null;
	return n?.photos.length ? Zd(n.photos, e.order, $d()).slice(0, Ud(e.folderMax)) : e.images ?? [];
}
function ff(e, t, n) {
	let r = sf(t);
	r && !cf(r, t.order) && uf(r, t.order).then((r) => {
		e.isConnected && r.photos.length && (e.textContent = "", e.removeAttribute("style"), e.className = "urd-bg-layer", n(e, t));
	}), n(e, t);
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/slideshow.js
var pf = {
	source: "upload",
	folder: "",
	order: "random",
	folderMax: Rd.dflt,
	style: "floating",
	motion: "drift",
	motionSpeed: nl.dflt,
	interval: rl.dflt,
	fade: 1.5,
	count: Jc.dflt,
	seed: 0,
	size: null,
	spread: $c.dflt,
	tilt: el.dflt,
	radius: tl.dflt,
	rows: 2,
	direction: "left",
	underNav: !0,
	underAnnounce: !1,
	repeat: !1,
	shape: "rect",
	look: "shadow",
	tone: "natural",
	frameColor: ""
}, mf = {
	version: 2,
	label: "Image gallery",
	labelKey: "bgLayer.slideshow",
	defaults: () => ({
		images: [],
		fit: "cover",
		opacity: .85,
		blur: 0,
		...pf
	}),
	migrations: { 1: (e) => ({
		...pf,
		style: "fill",
		motion: "none",
		interval: 6,
		opacity: 1,
		...e
	}) },
	render(e, t) {
		ff(e, t, gf);
	}
}, hf = (e, t) => {
	let n = document.createElement(e);
	return n.className = t, n;
};
function gf(e, t) {
	let n = dl(t.style), r = df(t).filter((e) => Yu(e?.src)), i = yl(t.shape), a = bl(t.look);
	e.classList.add("urd-bg-slideshow", `urd-gallery-${n}`, `urd-gallery-tone-${xl(t.tone)}`), n !== "fill" && e.classList.add(`urd-gallery-shape-${i}`, `urd-gallery-look-${a}`), e.style.setProperty("--urd-frame-radius", `${Dl(t.radius)}px`), r.length || e.classList.add("urd-bg-demo"), e.style.opacity = String(t.opacity ?? .85);
	let o = vl(a, t.frameColor);
	o && e.style.setProperty("--urd-frame-color", pu(o));
	let s = t.underNav === !1 ? ["var(--urd-announce-h, 0px)", "var(--urd-nav-own-h, 0px)"] : t.underAnnounce === !0 ? [] : ["var(--urd-announce-h, 0px)"], c = s.length ? `calc(${s.join(" + ")})` : "", l = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, u = fl(n, t.motion), d = {
		el: e,
		props: t,
		style: n,
		images: r,
		motion: u,
		shape: i,
		look: a,
		aspect: Sl(i, a),
		moves: ml({
			style: n,
			motion: u,
			reducedMotion: l
		}),
		reduced: l,
		seed: Al(t.seed, $d()),
		time: Ol(t.motionSpeed),
		dwell: wl(t.interval),
		dpr: window.devicePixelRatio || 1
	};
	Df[n](d), c && (e.style.top = n === "fill" && t.blur > 0 ? `calc(${c} - ${t.blur * 2}px)` : c);
}
function _f(e, t, n, r, i) {
	let a = t[n];
	e.style.backgroundImage = `url("${a ? tf(a.src, r) : sl(i)}")`, e.style.backgroundPosition = a ? sd(a.x, a.y) : "";
}
function vf({ el: e, props: t, images: n, motion: r, reduced: i, dpr: a, dwell: o }) {
	let s = !n.length, c = s ? cl(3) : n, l = ef(window.innerWidth, a);
	t.blur > 0 && (e.style.filter = `blur(${t.blur}px)`, e.style.inset = `-${t.blur * 2}px`);
	let u = Math.max(0, Number(t.fade) || 0);
	e.style.setProperty("--urd-bgg-fade", `${u}s`);
	let d = ad(r === "drift" ? "drift" : r === "kenburns" ? "kenburns" : "none"), f = (e) => {
		let n = hf("div", e ? "urd-bg-slide on" : "urd-bg-slide");
		return d !== "none" && (n.classList.add("urd-bg-motion", `urd-bg-motion-${d}`), n.style.animationDuration = `${od(t.motionSpeed)}s`), n;
	}, p = (e, n) => {
		e.style.backgroundImage = `url("${s ? n.src : tf(n.src, l)}")`, e.style.backgroundSize = s ? "240px auto" : cd(t.fit), e.style.backgroundRepeat = s ? "repeat" : "no-repeat", e.style.backgroundPosition = s ? "" : sd(n.x, n.y);
	}, m = new Image();
	if (m.src = s ? c[0].src : tf(c[0].src, l), !m.complete) {
		e.style.visibility = "hidden";
		let t = () => {
			e.style.visibility = "";
		};
		m.addEventListener("load", t, { once: !0 }), m.addEventListener("error", t, { once: !0 });
	}
	let h = f(!0);
	if (p(h, c[0]), e.appendChild(h), !Fd({
		count: c.length,
		reducedMotion: i
	})) return;
	let g = f(!1);
	e.appendChild(g);
	let _ = 0, v = h, y = Math.max(Id(o, { fallback: rl.dflt }), u + .5) * 1e3, b = setInterval(() => {
		if (!h.isConnected) {
			clearInterval(b);
			return;
		}
		if (document.hidden) return;
		let e = Pd(_, 1, c.length), t = new Image();
		t.src = s ? c[e].src : tf(c[e].src, l);
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
function yf(e, t, n, r, i) {
	let a = hf("div", "urd-gallery-skin"), o = hf("div", "urd-gallery-face");
	return _f(o, t, n, r, i), a.appendChild(o), e.appendChild(a), {
		skin: a,
		face: o
	};
}
function bf(e, t) {
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
function xf({ frame: e, skin: t, face: n }, r, i, a) {
	let { motion: o, moves: s, time: c } = a;
	if (!s) return;
	let l = `-${(r.phase * c).toFixed(2)}s`;
	if (o === "drift" || o === "rise") {
		e.classList.add("urd-gallery-travel");
		let t = bf(r, o);
		e.style.setProperty("--tx0", t.tx0), e.style.setProperty("--ty0", t.ty0), e.style.setProperty("--tx1", t.tx1), e.style.setProperty("--ty1", t.ty1), e.style.animationDuration = `${c}s`, e.style.animationDelay = l;
	} else if (o === "kenburns") e.classList.add("urd-gallery-kenburns"), e.style.animationDuration = `${c}s`, e.style.animationDelay = l;
	else if (o === "bounce") {
		e.style.left = "0", e.style.top = "0", e.style.translate = "0 0", e.classList.add("urd-gallery-bounce-x"), t.classList.add("urd-gallery-bounce-y");
		let n = c * (.8 + r.heading * .4), i = c * (.5 + r.phase * .35);
		e.style.animationDuration = `${n.toFixed(2)}s`, e.style.animationDelay = `-${(r.phase * n).toFixed(2)}s`, t.style.animationDuration = `${i.toFixed(2)}s`, t.style.animationDelay = `-${(r.heading * i).toFixed(2)}s`;
	}
}
function Sf(e, t, n) {
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
			a >= 0 && (_f(t.face, r, a, t.width, i), c[i] = a, l[a] = ++u), n && (f += 1, Cf(t, n(i, f, e.filter((e) => e !== t))));
		});
	});
}
function Cf(e, t) {
	let n = t.w / 2 * 1.15, r = t.w / e.aspect / 2 * 1.15;
	e.frame.style.left = `clamp(${n.toFixed(1)}px, ${t.x}%, calc(100% - ${n.toFixed(1)}px))`, e.frame.style.top = `clamp(${r.toFixed(1)}px, ${t.y}%, calc(100% - ${r.toFixed(1)}px))`, e.frame.style.width = `${t.w}px`, e.frame.style.rotate = `${t.rot}deg`, e.x = t.x, e.y = t.y;
}
function wf(e) {
	let { el: t, props: n, style: r, images: i, seed: a, aspect: o, dpr: s } = e, c = {
		count: n.count,
		seed: a,
		size: n.size,
		spread: n.spread,
		tilt: n.tilt,
		style: r,
		repeat: n.repeat === !0
	};
	Sf(jl(i, c).map((n, r) => {
		let a = hf("div", "urd-gallery-box urd-gallery-frame" + (n.index < 0 ? " urd-gallery-frame-empty" : ""));
		a.style.aspectRatio = String(o);
		let c = ef(n.w, s), { skin: l, face: u } = yf(a, i, n.index, c, r);
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
		return Cf(d, n), xf(d, n, r, e), d;
	}), e, (e, t, n) => {
		let r = null, o = -1;
		for (let s = 0; s < 6; s += 1) {
			let l = jl(i, {
				...c,
				seed: `${a}:${t * 6 + s}`
			})[e], u = Math.min(999, ...n.map((e) => Math.hypot(e.x - l.x, e.y - l.y)));
			u > o && (o = u, r = l);
		}
		return r;
	});
}
function Tf(e) {
	let { el: t, props: n, images: r, moves: i, time: a, aspect: o, dpr: s } = e, c = kl(n.rows), l = gl(n.size, "band");
	t.style.setProperty("--urd-band-h", `${l}px`);
	let u = r.length || 8, d = ef(l * o, s);
	for (let e = 0; e < c; e += 1) {
		let s = hf("div", "urd-gallery-band-row");
		i || s.classList.add("urd-ribbon-still");
		let c = hf("div", "urd-ribbon-track");
		n.direction === "right" != (e === 1) && c.classList.add("urd-ribbon-right"), c.style.setProperty("--urd-ribbon-ms", `${a * 1e3}ms`), e === 1 && (c.style.animationDelay = `-${(a / 3).toFixed(1)}s`);
		let l = (e) => {
			for (let t = 0; t < u; t += 1) {
				let n = hf("div", "urd-gallery-box urd-gallery-band-tile" + (r.length ? "" : " urd-gallery-frame-empty"));
				n.style.aspectRatio = String(o), yf(n, r, r.length ? t : -1, d, t), e.appendChild(n);
			}
		}, f = hf("div", "urd-ribbon-run");
		l(f);
		let p = hf("div", "urd-ribbon-run");
		p.setAttribute("aria-hidden", "true"), l(p), c.append(f, p), s.appendChild(c), t.appendChild(s);
	}
}
function Ef(e) {
	let { el: t, props: n, images: r, seed: i, dpr: a, motion: o, moves: s, time: c } = e, l = Pl(n.count, i, r.length, n.repeat === !0);
	t.style.setProperty("--urd-mosaic-row", `${gl(n.size, "mosaic")}px`);
	let u = ef(gl(n.size, "mosaic") * 2.2, a);
	Sf(l.map((e, n) => {
		let i = hf("div", "urd-gallery-box urd-gallery-tile" + (r.length ? "" : " urd-gallery-frame-empty"));
		i.style.gridColumn = `span ${e.cols}`, i.style.gridRow = `span ${e.rows}`;
		let a = r.length ? n % r.length : -1, { face: l } = yf(i, r, a, u, n);
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
var Df = {
	fill: vf,
	floating: wf,
	band: Tf,
	mosaic: Ef
}, Of = /^(?:data:video\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/media\/[\w%./-]+\.(?:mp4|webm))$/i;
function kf(e) {
	return typeof e == "string" && Of.test(e);
}
var Af = null;
function jf(e) {
	Af ??= new IntersectionObserver((e) => {
		for (let t of e) {
			if (!t.target.isConnected) {
				Af.unobserve(t.target);
				continue;
			}
			t.isIntersecting ? t.target.play().catch(() => {}) : t.target.pause();
		}
	}, { threshold: 0 }), Af.observe(e);
}
var Mf = (e, t, n, r) => {
	e.style.position = "absolute", e.style.inset = "0", e.style.width = "100%", e.style.height = "100%", e.style.objectFit = t === "contain" ? "contain" : "cover", e.style.objectPosition = sd(n, r);
}, Nf = {
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
		if (!kf(t.src)) return;
		if (e.style.opacity = String(t.opacity ?? 1), window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
			if (!Yu(t.poster)) return;
			let n = document.createElement("img");
			n.className = "urd-bg-video-poster", n.alt = "", n.setAttribute("aria-hidden", "true"), n.src = t.poster, Mf(n, t.fit, t.x, t.y), e.appendChild(n);
			return;
		}
		let n = document.createElement("video");
		n.className = "urd-bg-video", n.muted = !0, n.setAttribute("muted", ""), n.loop = !0, n.playsInline = !0, n.setAttribute("playsinline", ""), n.preload = "metadata", n.disablePictureInPicture = !0, n.setAttribute("aria-hidden", "true"), Yu(t.poster) && (n.poster = t.poster), n.src = t.src, Mf(n, t.fit, t.x, t.y), e.appendChild(n), jf(n), t.parallax > 0 && Od(n, t.parallax, 0, t.fit === "contain" ? "contain" : "cover");
	}
};
//#endregion
//#region ../template/assets/engine/0.7.4/footer-thumb.js
function Pf(e = {}) {
	let t = "#2fd6b6", n = "#5c6b64", r = e.mega ? "#16221d" : "#0e1512", i = e.cols ?? 0, a = e.social ?? 0, o = `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${r}"/>`;
	if (e.mega && (o += `<circle cx="20" cy="6" r="34" fill="${t}" opacity="0.18"/>`), e.bigcta) return o += `<rect x="45" y="18" width="70" height="8" rx="3" fill="${n}" opacity="0.85"/>`, o += `<rect x="56" y="32" width="48" height="4" rx="2" fill="${n}" opacity="0.5"/>`, o += `<rect x="62" y="43" width="36" height="10" rx="3" fill="${t}"/>`, o += Ff(n, e.baselineLinks), o + "</svg>";
	if (e.chapters) {
		o += `<rect x="12" y="10" width="20" height="6" rx="2" fill="${t}"/>`, o += `<rect x="12" y="20" width="46" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		let r = i || 3, a = (136 - (r - 1) * 8) / r;
		for (let e = 0; e < r; e++) {
			let r = 12 + e * (a + 8);
			o += `<line x1="${r}" y1="30" x2="${r + a}" y2="30" stroke="${n}" stroke-width="0.8" opacity="0.7"/>`, o += `<rect x="${r}" y="34" width="9" height="6" rx="1.5" fill="${t}"/>`;
			for (let e = 0; e < 3; e++) o += `<rect x="${r}" y="${44 + e * 6}" width="${a * .7}" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		}
		return o += Ff(n, e.baselineLinks), o + "</svg>";
	}
	if (e.split) {
		o += `<rect x="8" y="8" width="70" height="52" rx="4" fill="${t}" opacity="0.16"/>`, o += `<rect x="16" y="16" width="20" height="6" rx="2" fill="${t}"/>`, o += `<rect x="16" y="26" width="46" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`, o += `<rect x="16" y="36" width="26" height="9" rx="3" fill="${t}"/>`;
		let r = i || 2;
		for (let e = 0; e < r; e++) {
			let r = 90 + e * 32;
			o += `<rect x="${r}" y="14" width="16" height="3" rx="1.5" fill="${t}" opacity="0.8"/>`;
			for (let e = 0; e < 4; e++) o += `<rect x="${r}" y="${22 + e * 7}" width="22" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		}
		return o += Ff(n, e.baselineLinks), o + "</svg>";
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
	return o += Ff(n, e.baselineLinks), o + "</svg>";
}
function Ff(e, t = 0) {
	let n = `<line x1="8" y1="66" x2="152" y2="66" stroke="${e}" stroke-width="0.6" opacity="0.5"/>`;
	return n += `<rect x="8" y="70" width="40" height="3" rx="1.5" fill="${e}" opacity="0.6"/>`, t && (n += `<g fill="${e}" opacity="0.6">` + Array.from({ length: t }, (e, t) => `<rect x="${120 - t * 16}" y="70" width="12" height="3" rx="1.5"/>`).join("") + "</g>"), n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/animations/core.js
var If = () => ({
	duration: 600,
	delay: 0
}), Lf = 90, Rf = {
	"fade-in": {
		version: 1,
		label: "Fade in",
		labelKey: "anim.fadeIn",
		entrance: !0,
		defaults: If,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Slide up",
		labelKey: "anim.slideUp",
		entrance: !0,
		defaults: If,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom in",
		labelKey: "anim.zoomIn",
		entrance: !0,
		defaults: If,
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
			step: Lf,
			effect: "slide-up",
			pattern: "sequence"
		}),
		migrations: {}
	}
}, zf = [
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
function Bf(e) {
	let t = (e) => Math.round(e * 100) / 100, n = Math.max(0, t(100 - e.w)), r = Math.min(n, Math.max(0, t(e.x - e.w / 2))), i = Math.max(0, e.y - e.h / 2), a = e.snap === !1 || e.grid?.snap === !1, o = e.grid?.size || 8;
	return i = a ? Math.round(i) : Math.round(i / o) * o, {
		x: r,
		y: Math.max(0, i)
	};
}
//#endregion
//#region ../template/assets/engine/0.7.4/calendar-designs.js
var Vf = [
	"list",
	"cards",
	"month",
	"agenda",
	"next",
	"week",
	"day",
	"year"
], Hf = [
	"title",
	"date",
	"time",
	"place",
	"description",
	"category",
	"number"
], Uf = ["emptyKicker", "emptyTitle"], Wf = [
	"noticeLabel",
	"noticeTitle",
	"noticeText",
	"moreInfo"
], Gf = [
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
}), Kf = [
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
			...Gf
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
		texts: Gf
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
			...Gf
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
		texts: ["program", ...Gf]
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
		texts: Gf
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
			...Uf,
			...Gf
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
		texts: Gf
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
		texts: ["wholeProgram", ...Gf]
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
			...Gf
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
		texts: Gf
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
		texts: Gf
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
			...Uf,
			...Gf
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
			...Gf
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
		texts: Gf
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
		texts: ["todayBtn", ...Gf]
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
		texts: Gf
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
		texts: [...Uf, ...Gf]
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
		texts: ["todayBtn", ...Gf]
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
			...Gf
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
			...Gf
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
			...Gf
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
			...Gf
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
			...Wf,
			...Gf
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
			...Gf
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
		texts: ["now", ...Gf]
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
			...Gf
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
			...Gf
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
			...Gf
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
			...Gf
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
			Q("text"),
			Q("panel"),
			Q("panelText"),
			Q("gold"),
			Q("goldDark"),
			Q("alert", "alert"),
			Q("alertText", "alert")
		],
		texts: [
			"now",
			"next",
			"later",
			...Wf,
			...Uf,
			...Gf
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
			...Uf,
			...Gf
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
			...Wf,
			...Uf,
			...Gf
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
		texts: ["todayBtn", ...Gf]
	}
], qf = (e, t, n) => ({
	key: e,
	kind: "choice",
	values: t,
	def: n,
	labelKey: `calendar.opt.${e}`
}), Jf = (e, t) => ({
	key: e,
	kind: "switch",
	def: t,
	labelKey: `calendar.opt.${e}`
}), Yf = (e) => ({
	key: e,
	kind: "hour",
	def: null,
	labelKey: `calendar.opt.${e}`
}), Xf = {
	sidepanel: [qf("panelSide", [
		"right",
		"left",
		"under"
	], "right")],
	weekPlan: [
		Yf("hourFrom"),
		Yf("hourTo"),
		Jf("weekend", !1)
	],
	dayPlan: [
		Yf("hourFrom"),
		Yf("hourTo"),
		Jf("weekend", !1)
	],
	table: [
		Jf("colTime", !0),
		Jf("colPlace", !0),
		Jf("zebra", !0)
	],
	posters: [qf("columns", [
		"auto",
		"2",
		"3",
		"4"
	], "auto")],
	photo: [qf("columns", [
		"auto",
		"2",
		"3",
		"4"
	], "auto")],
	yearWheel: [qf("firstMonth", [
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
		"11"
	], "0")],
	numbered: [Jf("pad", !0)],
	booklet: [Jf("description", !0)],
	split: [Jf("description", !0)],
	band: [Jf("roll", !0)]
};
function Zf(e) {
	return Xf[tp(e).id] ?? [];
}
function Qf(e) {
	let t = e?.options ?? {}, n = {};
	for (let r of Zf(e?.design)) {
		let e = t[r.key];
		r.kind === "choice" ? n[r.key] = r.values.includes(e) ? e : r.def : r.kind === "switch" ? n[r.key] = typeof e == "boolean" ? e : r.def : n[r.key] = Number.isInteger(e) && e >= 0 && e <= 24 ? e : null;
	}
	return n;
}
var $f = {
	min: .4,
	max: 2
};
function ep(e) {
	let t = Number(e?.scale);
	return !Number.isFinite(t) || t <= 0 ? 1 : Math.round(Math.min($f.max, Math.max($f.min, t)) * 100) / 100;
}
function tp(e) {
	return Kf.find((t) => t.id === e) ?? Kf[0];
}
function np(e) {
	return tp(e?.design).view || (Vf.includes(e?.view) ? e.view : "list");
}
var rp = [
	"list",
	"cards",
	"agenda",
	"next"
];
function ip() {
	let e = [{
		view: null,
		designs: Kf.filter((e) => e.view === null)
	}];
	for (let t of Vf) {
		let n = Kf.filter((e) => e.view === t);
		n.length && e.push({
			view: t,
			designs: n
		});
	}
	return e;
}
var ap = /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, op = /^[a-z][a-z0-9-]*$/;
function sp(e) {
	return typeof e == "string" ? ap.test(e) ? e : op.test(e) ? `var(--urd-color-${e})` : null : null;
}
function cp(e, t) {
	let n = typeof t?.show == "boolean" ? t.show : e.stripe;
	return {
		show: n,
		color: n ? sp(t?.color) : null
	};
}
var lp = {
	min: 8,
	max: 120
};
function up(e, t) {
	let n = e?.[t];
	return typeof n == "string" && n.trim() ? n : null;
}
function dp(e, t) {
	return e.texts.some((e) => up(t, e) !== null);
}
//#endregion
//#region ../template/assets/engine/0.7.4/calendar-thumb.js
var fp = "#0e1512", pp = "#2fd6b6", mp = "#5c6b64", hp = "#22302a", gp = "#e8efe9", _p = "#16221d", vp = "#1c2340", yp = "#f3ecd8", bp = "#d0a74a", xp = (e) => e < 1 ? ` opacity="${e}"` : "", $ = (e, t, n, r, i, a = 1, o = 2) => `<rect x="${e}" y="${t}" width="${n}" height="${r}" rx="${o}" fill="${i}"${xp(a)}/>`, Sp = (e, t, n, r, i = 1) => `<circle cx="${e}" cy="${t}" r="${n}" fill="${r}"${xp(i)}/>`, Cp = (e, t, n, r, i, a = 1, o = 1) => `<line x1="${e}" y1="${t}" x2="${n}" y2="${r}" stroke="${i}" stroke-width="${a}"${xp(o)}/>`, wp = (e, t, n, r) => Array.from({ length: e }, (e, i) => r(t + i * n, i)).join(""), Tp = (e, t = fp) => `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${t}"/>${e}</svg>`;
function Ep(e, t, n, r, i, a = mp) {
	let o = "", s = n / 7, c = r / 4;
	for (let n = 0; n < 28; n++) {
		let r = e + n % 7 * s + s / 2, l = t + Math.floor(n / 7) * c + c / 2;
		o += Sp(r, l, 1.6, i.includes(n) ? pp : a, i.includes(n) ? 1 : .55);
	}
	return o;
}
var Dp = {
	plain: () => wp(3, 12, 20, (e) => $(14, e, 14, 14, hp, 1, 3) + $(34, e + 2, 70, 4, mp, .9) + $(34, e + 9, 46, 3, mp, .5)),
	timeline: () => Cp(50, 10, 50, 70, mp, 1.2, .7) + wp(3, 16, 22, (e, t) => $(18, e - 3, 24, 5, mp, .9) + Sp(50, e, 3.4, t ? mp : pp) + $(60, e - 3, 62, 4, mp, .9) + $(60, e + 4, 40, 3, mp, .5)),
	table: () => $(12, 10, 136, 10, pp, 1, 3) + wp(4, 26, 12, (e, t) => (t % 2 ? $(12, e - 3, 136, 12, hp, .8, 0) : "") + $(16, e, 20, 3, mp, .9) + $(44, e, 14, 3, mp, .5) + $(66, e, 44, 3, mp, .9) + $(118, e, 24, 3, mp, .5)),
	booklet: () => $(12, 8, 136, 64, gp, 1, 2) + $(20, 14, 40, 7, _p) + Cp(20, 26, 140, 26, _p, 1.4) + [20, 84].map((e) => wp(3, 32, 12, (t) => $(e, t, 8, 8, pp, 1, 1) + $(e + 12, t, 36, 3, _p, .85) + $(e + 12, t + 5, 26, 2.5, _p, .4))).join(""),
	numbered: () => wp(3, 12, 20, (e) => Cp(14, e - 3, 146, e - 3, mp, .8, .6) + $(14, e, 14, 12, pp, 1, 2) + $(36, e + 1, 64, 4, mp, .9) + $(36, e + 8, 44, 3, mp, .5) + $(120, e + 3, 24, 4, pp, .7)),
	apList: () => wp(3, 10, 21, (e) => $(12, e, 136, 17, vp, 1, 2) + $(18, e + 4, 10, 9, bp, 1, 1) + Cp(34, e + 3, 34, e + 14, bp, .8, .5) + $(40, e + 4, 26, 3, bp, .8) + $(40, e + 10, 56, 3.5, yp, .9)),
	glass: () => Sp(30, 14, 34, "#ff8a65", .55) + Sp(132, 70, 36, "#7fd1c4", .55) + Sp(100, 10, 20, "#ffd36b", .4) + wp(3, 12, 20, (e) => $(14, e, 132, 15, "#ffffff", .32, 6) + $(20, e + 4, 9, 7, gp, .9, 1) + $(36, e + 4, 50, 3, gp, .9) + $(36, e + 9, 34, 2.5, gp, .5)),
	posters: () => $(12, 10, 62, 60, pp, 1, 4) + $(20, 30, 18, 20, _p, .9, 2) + $(20, 56, 40, 4, _p, .8) + $(80, 10, 32, 28, gp, 1, 4) + $(86, 16, 10, 10, _p, .8, 1) + $(116, 10, 32, 28, "#bfe9df", 1, 4) + $(122, 16, 10, 10, _p, .8, 1) + $(80, 42, 32, 28, hp, 1, 4) + $(86, 48, 10, 10, pp, 1, 1) + $(116, 42, 32, 28, hp, .5, 4),
	tickets: () => wp(3, 10, 21, (e) => $(12, e, 136, 17, hp, 1, 4) + $(12, e, 30, 17, pp, 1, 4) + $(20, e + 4, 12, 9, _p, .85, 1) + Cp(42, e + 1, 42, e + 16, fp, 1.6) + $(50, e + 4, 50, 3.5, mp, .95) + $(50, e + 10, 34, 2.5, mp, .55) + $(120, e + 5, 22, 7, pp, .85)),
	carousel: () => [
		12,
		50,
		88,
		126
	].map((e, t) => $(e, 14, 34, 54, t ? hp : pp, 1, 4) + $(e + 6, 22, 12, 14, t ? pp : _p, .9, 1) + $(e + 6, 50, 22, 3, t ? mp : _p, .9) + $(e + 6, 56, 14, 2.5, t ? mp : _p, .5)).join(""),
	photo: () => [
		12,
		60,
		108
	].map((e) => $(e, 12, 40, 56, hp, 1, 4) + $(e, 12, 40, 26, pp, .45, 4) + $(e + 4, 16, 12, 6, gp, .95, 1) + $(e + 5, 44, 28, 3.5, mp, .95) + $(e + 5, 51, 20, 2.5, mp, .5) + $(e + 5, 58, 14, 5, pp, .9)).join(""),
	apGrid: () => [
		12,
		60,
		108
	].map((e) => $(e, 12, 40, 56, yp, 1, 2) + $(e, 12, 40, 16, vp, 1, 2) + Cp(e, 28, e + 40, 28, bp, 1.4) + $(e + 4, 16, 8, 8, bp, 1, 1) + $(e + 22, 18, 14, 4, bp, .9) + $(e + 5, 36, 28, 4, vp, .9) + $(e + 5, 44, 18, 2.5, vp, .55) + $(e + 5, 52, 24, 2.5, vp, .4)).join(""),
	bento: () => $(12, 10, 66, 40, gp, 1, 6) + $(18, 14, 16, 5, pp, 1, 2) + $(18, 28, 14, 14, _p, .9, 1) + $(36, 38, 34, 4, _p, .8) + $(82, 10, 31, 18, hp, 1, 5) + $(117, 10, 31, 18, hp, 1, 5) + $(82, 32, 66, 18, hp, 1, 5) + Ep(86, 34, 58, 14, [
		9,
		12,
		19
	]) + $(12, 54, 31, 18, gp, 1, 5) + $(47, 54, 31, 18, pp, .4, 5) + $(82, 54, 66, 18, hp, 1, 5) + $(88, 60, 30, 4, mp, .9),
	weekStrip: () => $(60, 8, 40, 5, mp, .9) + Array.from({ length: 7 }, (e, t) => $(12 + t * 19.6, 20, 17, 50, t === 3 ? pp : hp, t === 3 ? .25 : 1, 3) + $(15 + t * 19.6, 24, 6, 5, mp, .9, 1) + ([
		1,
		3,
		5
	].includes(t) ? $(14 + t * 19.6, 36, 13, 7, pp, 1, 2) : "")).join(""),
	weekPlan: () => $(12, 8, 136, 64, hp, .6, 3) + wp(4, 22, 12, (e) => Cp(12, e, 148, e, mp, .6, .6)) + Array.from({ length: 7 }, (e, t) => Cp(30 + t * 17, 14, 30 + t * 17, 72, mp, .6, .6)).join("") + $(82, 14, 16, 58, pp, .14, 0) + $(49, 36, 13, 10, pp, .9, 2) + $(83, 48, 13, 14, pp, .9, 2) + $(117, 24, 13, 9, gp, .7, 2),
	layers: () => $(12, 8, 136, 64, hp, .6, 3) + $(70, 12, 22, 6, pp, .9, 3) + $(96, 12, 22, 6, gp, .7, 3) + $(122, 12, 22, 6, mp, .6, 3) + wp(3, 26, 15, (e, t) => Cp(12, e - 2, 148, e - 2, mp, .6, .6) + $(16, e + 3, 16, 3, mp, .9) + $([
		44,
		62,
		100
	][t], e + 1, [
		46,
		22,
		40
	][t], 8, [
		pp,
		gp,
		"#7fd1c4"
	][t], .9, 3)),
	sidepanel: () => $(12, 8, 136, 64, hp, .6, 3) + Ep(18, 18, 76, 48, [
		5,
		10,
		17,
		24
	]) + $(100, 8, 48, 64, hp, 1, 3) + $(106, 14, 26, 5, gp, .9) + wp(2, 26, 16, (e) => $(106, e, 36, 12, fp, 1, 2) + Cp(106, e, 106, e + 12, pp, 2) + $(111, e + 3, 24, 3, mp, .9)),
	apMonth: () => $(12, 8, 136, 64, yp, 1, 2) + Cp(12, 8, 148, 8, bp, 2.4) + $(58, 13, 44, 5, vp, .9) + wp(4, 26, 12, (e) => Cp(12, e, 148, e, bp, .6, .5)) + Array.from({ length: 6 }, (e, t) => Cp(31.4 + t * 19.4, 26, 31.4 + t * 19.4, 72, bp, .6, .5)).join("") + $(54, 40, 14, 5, bp, .6, 0) + Cp(54, 40, 54, 45, bp, 2) + $(112, 52, 14, 5, bp, .6, 0) + Cp(112, 52, 112, 57, bp, 2) + Sp(98, 32, 3.4, bp),
	dayPlan: () => $(34, 6, 92, 68, hp, .6, 5) + $(42, 12, 40, 5, gp, .9) + Array.from({ length: 7 }, (e, t) => $(42 + t * 11, 22, 8, 9, t === 2 ? pp : hp, 1, 2)).join("") + wp(4, 38, 9, (e) => Cp(34, e, 126, e, mp, .6, .6)) + $(56, 39, 62, 7, gp, .5, 2) + $(56, 57, 62, 7, pp, .5, 2) + Cp(48, 51, 126, 51, pp, 1.4) + Sp(48, 51, 2.2, pp),
	yearWheel: () => `<circle cx="46" cy="40" r="24" fill="none" stroke="${hp}" stroke-width="9"/><circle cx="46" cy="40" r="24" fill="none" stroke="${mp}" stroke-width="9" stroke-dasharray="100 151" transform="rotate(-90 46 40)"${xp(.8)}/><circle cx="46" cy="40" r="24" fill="none" stroke="${pp}" stroke-width="9" stroke-dasharray="13 151" stroke-dashoffset="-100" transform="rotate(-90 46 40)"/>` + Sp(24, 32, 2, gp) + Sp(26, 50, 2, gp) + Sp(60, 60, 2, gp, .5) + $(38, 37, 16, 6, gp, .9) + $(88, 20, 20, 4, pp) + wp(3, 30, 13, (e) => $(88, e, 56, 9, hp, 1, 2) + $(92, e + 3, 34, 3, mp, .9)),
	heatmap: () => $(12, 8, 136, 64, hp, .6, 3) + Array.from({ length: 3 }, (e, t) => Array.from({ length: 28 }, (e, n) => $(18 + t * 44 + n % 7 * 5.4, 16 + Math.floor(n / 7) * 5.4, 4.2, 4.2, [
		3,
		11,
		16,
		24
	].includes((n + t * 5) % 28) ? pp : mp, [
		3,
		11,
		16,
		24
	].includes((n + t * 5) % 28) ? 1 : (n * 7 + t) % 5 == 0 ? .6 : .28, 1)).join("")).join("") + $(18, 46, 124, 9, fp, .8, 2) + $(22, 49, 30, 3, gp, .8),
	billboard: () => $(34, 6, 92, 68, _p, 1, 6) + Sp(42, 14, 2, pp) + $(48, 12, 24, 4, pp, .9) + $(42, 22, 60, 7, gp, .95) + [
		42,
		70,
		98
	].map((e) => $(e, 36, 22, 16, hp, 1, 3) + $(e + 6, 40, 10, 7, gp, .9, 1)).join("") + $(42, 58, 78, 9, pp, 1, 3),
	stacked: () => $(54, 10, 70, 44, hp, .7, 5) + $(46, 16, 70, 44, hp, 1, 5) + $(38, 22, 70, 44, gp, 1, 5) + $(44, 28, 22, 6, pp, 1, 3) + $(44, 40, 44, 5, _p, .9) + $(44, 49, 30, 3, _p, .5) + $(44, 56, 20, 6, pp, 1, 2),
	noticeboard: () => $(34, 6, 92, 68, "#8a5a3c", 1, 5) + $(42, 14, 64, 28, "#fff7cc", 1, 0) + Sp(74, 14, 3, "#d33a2c") + $(48, 22, 40, 5, _p, .9) + $(48, 31, 28, 3, _p, .5) + $(48, 46, 58, 20, "#d9ecff", 1, 0) + Sp(54, 46, 2.6, "#2f6fd6") + $(54, 53, 36, 4, _p, .85) + $(54, 60, 44, 2.5, _p, .45),
	split: () => $(16, 10, 128, 60, hp, 1, 6) + $(16, 10, 44, 42, pp, 1, 6) + $(24, 22, 20, 22, _p, .9, 2) + $(68, 16, 20, 5, mp, .7, 2) + $(68, 26, 58, 6, gp, .95) + $(68, 36, 40, 3, mp, .7) + Cp(16, 52, 144, 52, mp, .6, .6) + $(24, 58, 60, 3, mp, .8) + $(24, 64, 44, 2.5, mp, .5),
	band: () => $(8, 30, 144, 20, pp, 1, 0) + $(8, 30, 40, 20, _p, 1, 0) + Sp(16, 40, 2, pp) + $(22, 38, 20, 4, gp, .9) + $(56, 38, 34, 4, _p, .85) + Sp(96, 40, 1.8, _p) + $(102, 38, 34, 4, _p, .85) + Sp(142, 40, 1.8, _p),
	oneLine: () => wp(3, 12, 20, (e, t) => $(12, e, 136, 15, hp, t ? .7 : 1, 4) + Cp(12, e + 1, 12, e + 14, t ? mp : pp, 3) + Sp(22, e + 7.5, 2.4, t ? mp : pp) + $(30, e + 5.5, 20, 4, t ? mp : pp, .9) + $(56, e + 5.5, 54, 4, mp, .9) + (t ? "" : $(124, e + 4, 18, 7, pp, 1, 2))),
	ring: () => $(30, 6, 100, 68, hp, 1, 8) + `<circle cx="58" cy="34" r="15" fill="none" stroke="${mp}" stroke-width="5"${xp(.5)}/><circle cx="58" cy="34" r="15" fill="none" stroke="${pp}" stroke-width="5" stroke-linecap="round" stroke-dasharray="70 94" transform="rotate(-90 58 34)"/>` + $(53, 31, 10, 6, gp, .9, 1) + $(82, 24, 38, 6, gp, .95) + $(82, 35, 28, 3, mp, .8) + Cp(38, 56, 122, 56, mp, .6, .6) + $(38, 61, 50, 3, mp, .7) + $(38, 67, 40, 3, mp, .5),
	darkGlass: () => $(34, 6, 92, 68, "#121216", 1, 7) + Sp(112, 16, 22, pp, .45) + Sp(46, 68, 20, "#3fb8a4", .35) + Sp(42, 14, 2, pp) + $(48, 12, 22, 4, pp, .9) + $(42, 22, 56, 6, gp, .95) + $(42, 34, 76, 3, mp, .6, 1.5) + $(42, 34, 60, 3, pp, 1, 1.5) + $(42, 42, 36, 9, gp, 1, 3) + $(82, 42, 36, 9, gp, .18, 3) + $(42, 56, 76, 14, gp, .1, 3) + $(47, 61, 40, 3, gp, .7),
	nextBento: () => $(40, 8, 80, 26, pp, 1, 6) + $(46, 13, 22, 4, _p, .8) + $(46, 23, 44, 5, _p, .9) + $(40, 38, 38, 16, hp, 1, 5) + $(82, 38, 38, 16, hp, 1, 5) + $(40, 58, 38, 16, gp, 1, 5) + $(82, 58, 38, 16, pp, .4, 5) + $(46, 42, 8, 7, gp, .9, 1) + $(88, 42, 8, 7, gp, .9, 1) + $(46, 62, 8, 7, _p, .9, 1),
	apNow: () => $(40, 6, 80, 68, yp, 1, 5) + $(40, 6, 80, 12, vp, 1, 5) + Sp(47, 12, 1.8, bp) + $(52, 10, 22, 4, bp, .9) + $(46, 24, 14, 14, vp, 1, 2) + $(50, 28, 6, 6, bp, 1, 1) + $(66, 25, 44, 5, vp, .9) + $(66, 34, 32, 3, vp, .5) + $(40, 46, 80, 28, "#eae1c7", 1, 0) + Cp(48, 54, 48, 66, bp, 1) + Sp(48, 54, 1.8, bp) + Sp(48, 66, 1.8, bp) + $(54, 52, 40, 3.5, vp, .8) + $(54, 64, 34, 3.5, vp, .8),
	apNavy: () => $(40, 6, 80, 68, vp, 1, 5) + Sp(47, 13, 1.8, bp) + $(52, 11, 22, 4, bp, .9) + $(46, 20, 68, 22, yp, 1, 3) + $(51, 25, 8, 10, bp, 1, 1) + $(64, 25, 40, 5, vp, .9) + $(64, 34, 26, 3, vp, .5) + `<rect x="46" y="46" width="68" height="14" rx="3" fill="#262e4f" stroke="${bp}" stroke-width="0.8"/>` + $(51, 50, 7, 6, bp, 1, 1) + $(64, 51, 36, 4, yp, .85) + $(46, 66, 50, 3, yp, .6),
	apSeries: () => $(12, 8, 136, 64, "#f5efdd", 1, 2) + Cp(20, 17, 34, 17, bp, 1) + $(38, 15, 26, 3.5, bp, .9) + $(20, 24, 58, 8, "#7a1a1a") + $(20, 38, 64, 3, vp, .6) + $(20, 44, 52, 3, vp, .6) + [
		20,
		46,
		72
	].map((e) => $(e, 54, 12, 2.5, bp, .9) + $(e, 60, 20, 3.5, vp, .8)).join("") + Cp(100, 14, 100, 66, bp, .8, .6) + $(108, 18, 30, 8, "#7a1a1a", .85) + $(108, 32, 32, 2.5, vp, .5) + $(108, 38, 26, 2.5, vp, .5),
	mobileAgenda: () => $(50, 4, 60, 72, "#121216", 1, 8) + $(56, 10, 22, 4, gp, .9) + Array.from({ length: 7 }, (e, t) => $(56 + t * 7.1, 18, 5.6, 9, t === 2 ? pp : hp, 1, 2)).join("") + wp(3, 32, 14, (e) => $(56, e, 48, 11, "#1c1c22", 1, 3) + Cp(67, e + 2, 67, e + 9, pp, 1.4) + $(58, e + 4, 6, 3, mp, .8) + $(70, e + 3, 26, 3, gp, .85))
};
Object.keys(Dp);
function Op(e) {
	let t = Dp[e] ?? Dp.plain, n = ["booklet"].includes(e);
	return Tp(t(), n ? "#1a2620" : fp);
}
//#endregion
//#region src/App.svelte
var kp = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Ap = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!>", 1), jp = /* @__PURE__ */ V("<p> </p>"), Mp = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"text\" placeholder=\"https://drive.google.com/drive/folders/...\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"60\" class=\"svelte-1n46o8q\"/></label> <button type=\"button\" class=\"ghost action svelte-1n46o8q\"><!> </button> <!>", 1), Np = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), Pp = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"6\" max=\"60\" step=\"1\" class=\"svelte-1n46o8q\"/>", 1), Fp = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Ip = /* @__PURE__ */ V("<button class=\"ghost row-tool svelte-1n46o8q\"></button>"), Lp = /* @__PURE__ */ V("<span><span class=\"grad-grip svelte-1n46o8q\"><svg viewBox=\"0 0 16 16\" width=\"14\" height=\"14\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"13\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"13\" r=\"1.4\"></circle></svg></span> <!> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span> <!></span>"), Rp = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), zp = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/>", 1), Bp = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Vp = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Hp = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Up = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"180\" step=\"5\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Wp = /* @__PURE__ */ V("<div class=\"sizefill svelte-1n46o8q\"><button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button> <button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button></div> <label class=\"svelte-1n46o8q\"> </label> <div class=\"focalpad svelte-1n46o8q\"><span class=\"focaldot svelte-1n46o8q\"></span></div> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Gp = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Kp = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> </label> <div class=\"sizestep svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"10\" max=\"400\" class=\"svelte-1n46o8q\"/> <span class=\"sizeunit svelte-1n46o8q\">%</span> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></div> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), qp = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.5\" max=\"90\" step=\"0.5\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/>", 1), Jp = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Yp = /* @__PURE__ */ V("<button type=\"button\" class=\"ghost action svelte-1n46o8q\"><!> </button>"), Xp = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" max=\"20\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), Zp = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"15\" step=\"1\" class=\"svelte-1n46o8q\"/>", 1), Qp = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label>"), $p = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"48\" step=\"1\" class=\"svelte-1n46o8q\"/>", 1), em = /* @__PURE__ */ V("<!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"60\" max=\"400\" step=\"2\" class=\"svelte-1n46o8q\"/> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!>", 1), tm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.5\" max=\"90\" step=\"0.5\" class=\"svelte-1n46o8q\"/>", 1), nm = /* @__PURE__ */ V("<label><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>"), rm = /* @__PURE__ */ V("<!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), im = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), am = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"video/mp4,video/webm\" class=\"svelte-1n46o8q\"/></label> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), om = /* @__PURE__ */ V("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!></div>"), sm = /* @__PURE__ */ V("<!> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), cm = /* @__PURE__ */ V("<input class=\"nav-target svelte-1n46o8q\"/>"), lm = /* @__PURE__ */ V("<div class=\"nav-row nav-sub-row\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target\"><!></span> <!></div>"), um = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"num-stepper svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"1\" max=\"12\" step=\"1\" class=\"svelte-1n46o8q\"/> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></span></label>", 1), dm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), fm = /* @__PURE__ */ V("<details class=\"group menu-group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"><span class=\"menu-group-title svelte-1n46o8q\"> </span><span class=\"menu-group-value svelte-1n46o8q\"> </span></summary> <div class=\"group-items svelte-1n46o8q\"><!></div></details>"), pm = /* @__PURE__ */ V("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), mm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>"), hm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), gm = /* @__PURE__ */ V("<input class=\"svelte-1n46o8q\"/>"), _m = /* @__PURE__ */ V("<span class=\"nav-line svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), vm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), ym = /* @__PURE__ */ V("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input class=\"tb-grow svelte-1n46o8q\" spellcheck=\"false\"/> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"toolbar-row svelte-1n46o8q\"><input class=\"tb-grow svelte-1n46o8q\"/> <!></span></div>"), bm = /* @__PURE__ */ V("<button type=\"button\" class=\"linkish cal-source svelte-1n46o8q\"> </button>"), xm = /* @__PURE__ */ V("<span class=\"gridmenu-value svelte-1n46o8q\"> </span>"), Sm = /* @__PURE__ */ V("<!> <!>", 1), Cm = /* @__PURE__ */ V("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>"), wm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"50\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Tm = /* @__PURE__ */ V("<!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0\" max=\"10\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>", 1), Em = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input placeholder=\"/program\" spellcheck=\"false\" class=\"svelte-1n46o8q\"/></label>"), Dm = /* @__PURE__ */ V("<!> <label class=\"svelte-1n46o8q\"> <input placeholder=\"https://\" spellcheck=\"false\" class=\"svelte-1n46o8q\"/></label>", 1), Om = /* @__PURE__ */ V("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), km = /* @__PURE__ */ V("<button type=\"button\" class=\"ghost action svelte-1n46o8q\"> </button>"), Am = /* @__PURE__ */ V("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button type=\"button\" class=\"ghost action svelte-1n46o8q\"><!> </button> <button type=\"button\" class=\"ghost action svelte-1n46o8q\"><!> </button> <!> <!> <!> <!> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <!> <!> <!>", 1), jm = /* @__PURE__ */ V("<span class=\"nav-line svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span>"), Mm = /* @__PURE__ */ V("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), Nm = /* @__PURE__ */ V("<span class=\"nav-line svelte-1n46o8q\"><input class=\"tl-year svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <input class=\"svelte-1n46o8q\"/>", 1), Pm = /* @__PURE__ */ V("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), Fm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Im = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Lm = /* @__PURE__ */ V("<button type=\"button\"></button>"), Rm = /* @__PURE__ */ V("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input class=\"field-filled svelte-1n46o8q\"/></label>"), zm = /* @__PURE__ */ V("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-6 svelte-1n46o8q\" role=\"group\"></div></div> <!>", 1), Bm = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></span> <span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Vm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"datetime-local\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Hm = /* @__PURE__ */ V("<button class=\"ghost svelte-1n46o8q\"> </button>"), Um = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"audio/*\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Wm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), Gm = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), Km = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> </label> <input class=\"svelte-1n46o8q\"/>", 1), qm = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"video/mp4,video/webm\" class=\"svelte-1n46o8q\"/></label> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Jm = /* @__PURE__ */ V("<!> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Ym = /* @__PURE__ */ V("<input class=\"token-input svelte-1n46o8q\" maxlength=\"4\"/>"), Xm = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\"> </button></span>"), Zm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"toolbar-row svelte-1n46o8q\"><!> <!></span></label> <!>", 1), Qm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), $m = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost action svelte-1n46o8q\"> </button></span>"), eh = /* @__PURE__ */ V("<button class=\"ghost action svelte-1n46o8q\"> </button>"), th = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), nh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), rh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"email\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"url\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), ih = /* @__PURE__ */ V("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label></div>"), ah = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), oh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" class=\"svelte-1n46o8q\"/></label>"), sh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label>"), ch = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), lh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"24\" class=\"svelte-1n46o8q\"/></label>"), uh = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <!></div>"), dh = /* @__PURE__ */ V("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), fh = /* @__PURE__ */ V("<span class=\"mini-label svelte-1n46o8q\"> </span>"), ph = /* @__PURE__ */ V("<div class=\"cal-slot svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div>"), mh = /* @__PURE__ */ V("<!> <div class=\"cal-slots svelte-1n46o8q\"></div>", 1), hh = /* @__PURE__ */ V("<button type=\"button\" class=\"menu-row cal-design-row svelte-1n46o8q\"><span class=\"menu-group-title svelte-1n46o8q\"> </span><span class=\"menu-group-value svelte-1n46o8q\"> </span></button> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" step=\"5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" class=\"svelte-1n46o8q\"/></label> <!> <span class=\"toolbar-row svelte-1n46o8q\"><button type=\"button\"><i> </i></button> <button type=\"button\"><u> </u></button> <!></span> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), gh = /* @__PURE__ */ V("<!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), _h = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), vh = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!>", 1), yh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), bh = /* @__PURE__ */ V("<!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), xh = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0.5\" max=\"10\" step=\"0.5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), Sh = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"10\" max=\"300\" step=\"5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), Ch = /* @__PURE__ */ V("<button class=\"ghost action svelte-1n46o8q\"> </button> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), wh = /* @__PURE__ */ V("<!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"2\" max=\"40\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>", 1), Th = /* @__PURE__ */ V("<div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div>"), Eh = /* @__PURE__ */ V("<div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!> <!></div> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <!> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <!> <!></div> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!> <!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"-10\" max=\"10\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div></div> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"8\" max=\"120\" step=\"2\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div></div> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"swatch-row svelte-1n46o8q\"><!> <div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div></div></div> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Dh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Oh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"24\" max=\"64\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), kh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Ah = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), jh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Mh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Nh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Ph = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" step=\"10\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <button type=\"button\" class=\"ghost action svelte-1n46o8q\"><!> </button>", 1), Fh = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Ih = /* @__PURE__ */ V("<!> <!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"10\" max=\"300\" step=\"5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"80\" max=\"400\" step=\"10\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Lh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"60\" class=\"svelte-1n46o8q\"/></label>"), Rh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), zh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label>"), Bh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Vh = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" min=\"1\" max=\"100\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), Hh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label>", 1), Uh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Wh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"400\" class=\"svelte-1n46o8q\"/></label>"), Gh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!>", 1), Kh = /* @__PURE__ */ V("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), qh = /* @__PURE__ */ V("<!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Jh = /* @__PURE__ */ V("<!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <!> <!>", 1), Yh = /* @__PURE__ */ V("<button type=\"button\"><span class=\"footer-tp-thumb svelte-1n46o8q\"></span> <span class=\"footer-tp-name svelte-1n46o8q\"> </span></button>"), Xh = /* @__PURE__ */ V("<!> <div class=\"footer-tpick svelte-1n46o8q\"></div>", 1), Zh = /* @__PURE__ */ V("<div class=\"menu-picker cal-designs svelte-1n46o8q\"><div class=\"menu-picker-head svelte-1n46o8q\"><button type=\"button\" class=\"ghost action svelte-1n46o8q\"> </button> <span class=\"panel-strong svelte-1n46o8q\"> </span></div> <!></div>"), Qh = /* @__PURE__ */ V("<button type=\"button\" class=\"menu-quick-open svelte-1n46o8q\"> </button>"), $h = /* @__PURE__ */ V("<input type=\"number\" class=\"svelte-1n46o8q\"/>"), eg = /* @__PURE__ */ V("<button type=\"button\"> </button>"), tg = /* @__PURE__ */ V("<span class=\"seg svelte-1n46o8q\" role=\"group\"></span>"), ng = /* @__PURE__ */ V("<div class=\"menu-quick-item svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></div>"), rg = /* @__PURE__ */ V("<div class=\"menu-quick svelte-1n46o8q\"></div>"), ig = /* @__PURE__ */ V("<div class=\"emenu-cols svelte-1n46o8q\"><section class=\"emenu-col svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p><!></section> <section class=\"emenu-col svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p><!></section> <section class=\"emenu-col svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p><!></section></div>"), ag = /* @__PURE__ */ V("<div class=\"props-tabs svelte-1n46o8q\"><span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button> <button type=\"button\"> </button></span></div> <!>", 1), og = /* @__PURE__ */ V("<button class=\"chrome-restore svelte-1n46o8q\"><!> </button>"), sg = /* @__PURE__ */ V("<button><!> </button>"), cg = /* @__PURE__ */ V("<div class=\"tool-pop svelte-1n46o8q\"></div>"), lg = /* @__PURE__ */ V("<span class=\"toolmenu svelte-1n46o8q\"><button><!><!></button> <!></span>"), ug = /* @__PURE__ */ V("<button></button>"), dg = /* @__PURE__ */ V("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"viewswitch toolgrp svelte-1n46o8q\"></span>", 1), fg = /* @__PURE__ */ V("<div class=\"tool-pop svelte-1n46o8q\"><div class=\"tool-pop-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button></div> <button><!> </button></div>"), pg = /* @__PURE__ */ V("<span class=\"toolmenu svelte-1n46o8q\"><button><span class=\"zoom-cap svelte-1n46o8q\"> </span><!></button> <!></span>"), mg = /* @__PURE__ */ V("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"zoomswitch toolgrp svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button> <button></button></span>", 1), hg = /* @__PURE__ */ V("<div class=\"tool-pop svelte-1n46o8q\"><button><!> </button> <button><!> </button></div>"), gg = /* @__PURE__ */ V("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"toolgrp svelte-1n46o8q\"><button></button> <button></button></span>", 1), _g = /* @__PURE__ */ V("<button class=\"ghost page-btn svelte-1n46o8q\"> </button> <span class=\"toolset svelte-1n46o8q\"><!> <!> <!></span>", 1), vg = /* @__PURE__ */ V("<button class=\"badge attention svelte-1n46o8q\"><!> <span class=\"btn-label svelte-1n46o8q\"> </span> <span class=\"badge-mini svelte-1n46o8q\"> </span></button>"), yg = /* @__PURE__ */ V("<button class=\"discard-confirm svelte-1n46o8q\"><!> </button>"), bg = /* @__PURE__ */ V("<span class=\"draft-cluster svelte-1n46o8q\"><span class=\"chip draft-chip svelte-1n46o8q\"><span class=\"chip-full svelte-1n46o8q\" aria-hidden=\"true\"> </span> <span class=\"chip-mini svelte-1n46o8q\" aria-hidden=\"true\">!</span></span>  <span class=\"discard-wrap svelte-1n46o8q\"><button><!><span class=\"discard-label svelte-1n46o8q\"> </span></button> <!></span></span>"), xg = /* @__PURE__ */ V("<!> <span class=\"btn-label svelte-1n46o8q\"> </span>", 1), Sg = /* @__PURE__ */ V("<span class=\"who svelte-1n46o8q\"><!> </span>"), Cg = /* @__PURE__ */ V("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\"> </a>"), wg = /* @__PURE__ */ V("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\"><!> <span class=\"btn-label svelte-1n46o8q\"> </span></a> <button class=\"primary svelte-1n46o8q\"> </button>", 1), Tg = /* @__PURE__ */ V("<button> </button>"), Eg = /* @__PURE__ */ V("<span class=\"rail-group svelte-1n46o8q\"> </span> <!>", 1), Dg = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" step=\"10\"/> <span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" step=\"10\" placeholder=\"0\"/></div>"), Og = /* @__PURE__ */ V("<p class=\"mini-label svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input type=\"text\" spellcheck=\"false\" class=\"svelte-1n46o8q\"/></label>", 1), kg = /* @__PURE__ */ V("<div class=\"settings-pop svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <p class=\"mini-label svelte-1n46o8q\"> </p> <div class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></div> <!> <!></div>"), Ag = /* @__PURE__ */ V("<span class=\"page-path svelte-1n46o8q\">/</span>"), jg = /* @__PURE__ */ V("<input class=\"page-slug svelte-1n46o8q\"/>"), Mg = /* @__PURE__ */ V("<span class=\"seo-warn svelte-1n46o8q\"></span>"), Ng = /* @__PURE__ */ V("<button class=\"ghost danger svelte-1n46o8q\"><!> </button>"), Pg = /* @__PURE__ */ V("<div class=\"page-menu svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"><!> </button> <!></div>"), Fg = /* @__PURE__ */ V("<div><input class=\"page-title svelte-1n46o8q\"/> <!> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <span class=\"page-menu-wrap svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <!></span></span></div>"), Ig = /* @__PURE__ */ V("<img class=\"site-icon-preview svelte-1n46o8q\"/>"), Lg = /* @__PURE__ */ V("<div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button></div>"), Rg = /* @__PURE__ */ V("<div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button> <button class=\"page-template-del svelte-1n46o8q\"></button></div>"), zg = /* @__PURE__ */ V("<span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-template-grid svelte-1n46o8q\"></div>", 1), Bg = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <textarea rows=\"2\" class=\"svelte-1n46o8q\"></textarea></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <textarea rows=\"2\" class=\"svelte-1n46o8q\"></textarea></label> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-template-grid svelte-1n46o8q\"><div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button></div> <!></div> <!></div>"), Vg = /* @__PURE__ */ V("<input class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\"/> <button><b> </b></button> <button><i> </i></button></span>", 1), Hg = /* @__PURE__ */ V("<img alt=\"\" class=\"svelte-1n46o8q\"/>"), Ug = /* @__PURE__ */ V("<span class=\"logo-file svelte-1n46o8q\"> </span>"), Wg = /* @__PURE__ */ V("<div class=\"logo-pick svelte-1n46o8q\"><span class=\"logo-thumb svelte-1n46o8q\"><!></span> <span class=\"logo-pick-col svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div> <div class=\"ctl-triple svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\"/></div> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\"/></div></div>", 1), Gg = /* @__PURE__ */ V("<button type=\"button\"><!><span class=\"svelte-1n46o8q\"> </span></button>"), Kg = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><span class=\"mini-label tb-grow svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" placeholder=\"1100\"/></span>"), qg = /* @__PURE__ */ V("<!> <!> <span class=\"toolbar-row svelte-1n46o8q\"><span class=\"mini-label tb-grow svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></span>", 1), Jg = /* @__PURE__ */ V("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Yg = /* @__PURE__ */ V("<!> <span class=\"toolbar-row svelte-1n46o8q\"><span class=\"mini-label tb-grow svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></span>", 1), Xg = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div>"), Zg = /* @__PURE__ */ V("<div class=\"ctl-pair svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div></div>"), Qg = /* @__PURE__ */ V("<span class=\"toolbar-row ctl-end svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"1\" max=\"8\"/> <span class=\"mini-label svelte-1n46o8q\"> </span> <!></span>"), $g = /* @__PURE__ */ V("<div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-5 svelte-1n46o8q\" role=\"group\"></div></div> <!>", 1), e_ = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"30\" max=\"80\" step=\"5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0\" max=\"400\" step=\"10\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0\" max=\"1200\" step=\"20\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <!>", 1), t_ = /* @__PURE__ */ V("<div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), n_ = /* @__PURE__ */ V("<div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div>"), r_ = /* @__PURE__ */ V("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label>"), i_ = /* @__PURE__ */ V("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <!> <!> <!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <!> <input type=\"range\" min=\"0\" max=\"100\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), a_ = /* @__PURE__ */ V("<button type=\"button\"><span> </span><span class=\"svelte-1n46o8q\"> </span></button>"), o_ = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), s_ = /* @__PURE__ */ V("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"text\" class=\"field-filled svelte-1n46o8q\" placeholder=\"https://\"/></label>"), c_ = /* @__PURE__ */ V("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"text\" class=\"field-filled svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), l_ = /* @__PURE__ */ V("<span class=\"tool-move svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span>"), u_ = /* @__PURE__ */ V("<div class=\"mini-card svelte-1n46o8q\"><span class=\"tool-head svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span><!></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), d_ = /* @__PURE__ */ V("<div class=\"mini-card svelte-1n46o8q\"><span class=\"tool-head svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span><!></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div>"), f_ = /* @__PURE__ */ V("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"text\" class=\"field-filled svelte-1n46o8q\"/></label>"), p_ = /* @__PURE__ */ V("<img alt=\"\"/>"), m_ = /* @__PURE__ */ V("<span class=\"lrow-warn svelte-1n46o8q\"></span>"), h_ = /* @__PURE__ */ V("<span class=\"lrow-tile-mark svelte-1n46o8q\"><!></span> <span class=\"lrow-tile-name svelte-1n46o8q\"> </span>", 1), g_ = /* @__PURE__ */ V("<span class=\"bad-target-note svelte-1n46o8q\"> </span>"), __ = /* @__PURE__ */ V("<div class=\"lrow-body svelte-1n46o8q\"><!> <div class=\"lrow-fields svelte-1n46o8q\"><input class=\"field-filled svelte-1n46o8q\"/> <input/> <!> <span class=\"lrow-actions svelte-1n46o8q\"><!> <button class=\"linkish danger svelte-1n46o8q\"> </button></span></div></div>"), v_ = /* @__PURE__ */ V("<div><div class=\"lrow-head svelte-1n46o8q\" role=\"button\" tabindex=\"0\"><span class=\"lrow-mark svelte-1n46o8q\" aria-hidden=\"true\"><!></span> <span class=\"lrow-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\" role=\"none\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"lrow-chev svelte-1n46o8q\" aria-hidden=\"true\"></span></div> <!></div>"), y_ = /* @__PURE__ */ V("<div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-3 svelte-1n46o8q\" role=\"group\"></div></div> <!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"1\" max=\"24\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <span class=\"lbtn-pick svelte-1n46o8q\"><!> <span class=\"lbtn-name svelte-1n46o8q\"><!></span></span></div> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), b_ = /* @__PURE__ */ V("<details class=\"group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"><span class=\"tool-head svelte-1n46o8q\"> <!></span></summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details>"), x_ = /* @__PURE__ */ V("<div aria-hidden=\"true\"><span class=\"nav-grip svelte-1n46o8q\"></span> <div class=\"nav-item-main svelte-1n46o8q\"><span class=\"nav-item-name ghost-name svelte-1n46o8q\"> </span> <span class=\"ghost-target svelte-1n46o8q\"> </span></div></div>"), S_ = /* @__PURE__ */ V("<input class=\"nav-item-href svelte-1n46o8q\"/>"), C_ = /* @__PURE__ */ V("<span class=\"nav-item-sub svelte-1n46o8q\"></span>"), w_ = /* @__PURE__ */ V("<!> <div><span class=\"nav-grip svelte-1n46o8q\" draggable=\"true\"></span> <div class=\"nav-item-main svelte-1n46o8q\"><input class=\"nav-item-name svelte-1n46o8q\"/> <div class=\"nav-item-target svelte-1n46o8q\"><!> <!></div></div> <span class=\"nav-actions svelte-1n46o8q\"><button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button></span> <button class=\"ghost row-tool nav-more svelte-1n46o8q\"></button></div> <!>", 1), T_ = /* @__PURE__ */ V("<!> <div><span class=\"nav-grip svelte-1n46o8q\" draggable=\"true\"></span> <div class=\"nav-item-main svelte-1n46o8q\"><input class=\"nav-item-name svelte-1n46o8q\"/> <div class=\"nav-item-target svelte-1n46o8q\"><!> <!></div></div> <!> <span class=\"nav-actions svelte-1n46o8q\"><button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button></span> <button class=\"ghost row-tool nav-more svelte-1n46o8q\"></button></div> <!> <!> <!>", 1), E_ = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <!> <!> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-3 svelte-1n46o8q\" role=\"group\"></div></div> <!> <!> <!> <!> <!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"seg cw-seg svelte-1n46o8q\"></div> <details class=\"sub-inset svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"sub-inset-body svelte-1n46o8q\"><!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div> <!></div></details></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-pair svelte-1n46o8q\"><!> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div></div> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label></div> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <!></div> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label></div> <!> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <!></div> <!> <!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-5 svelte-1n46o8q\" role=\"group\"></div></div> <!> <div class=\"swatch-row svelte-1n46o8q\"><!> <div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div></div> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!></div></details></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!>  <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div role=\"group\"></div></div> <!> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"4\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"nav-list svelte-1n46o8q\" role=\"list\"></div> <button class=\"ghost action svelte-1n46o8q\"> </button> <span class=\"toolbar-row svelte-1n46o8q\"><input class=\"tb-grow svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button></span></div></details></div>"), D_ = /* @__PURE__ */ V("<div class=\"cw-row svelte-1n46o8q\"><span class=\"mini-label cw-screen svelte-1n46o8q\"> </span> <span><span class=\"cw-fill svelte-1n46o8q\"></span></span> <span class=\"gridmenu-value cw-margin svelte-1n46o8q\"> </span></div>"), O_ = /* @__PURE__ */ V("<div class=\"mini-label cw-binds svelte-1n46o8q\"> </div>"), k_ = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), A_ = /* @__PURE__ */ V("<button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), j_ = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"sample cw-sample svelte-1n46o8q\"><!> <div class=\"cw-legend svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!></div> <div class=\"seg cw-seg svelte-1n46o8q\"></div> <!> <p class=\"mini-label svelte-1n46o8q\"> </p> <div class=\"seg cw-seg svelte-1n46o8q\"></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div>"), M_ = /* @__PURE__ */ V("<div class=\"mini-label tpv-cap svelte-1n46o8q\"> </div>"), N_ = /* @__PURE__ */ V("<div class=\"theme-pvw svelte-1n46o8q\"><!> <div class=\"tpv-demo svelte-1n46o8q\"><div class=\"tpv-h svelte-1n46o8q\"> </div> <div class=\"tpv-card svelte-1n46o8q\"> </div> <div class=\"tpv-row svelte-1n46o8q\"><span class=\"tpv-btn svelte-1n46o8q\"> </span><span class=\"tpv-lnk svelte-1n46o8q\"> </span></div></div></div>"), P_ = /* @__PURE__ */ V("<button type=\"button\"><span class=\"tp-band svelte-1n46o8q\"><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i></span> <small class=\"svelte-1n46o8q\"> </small></button>"), F_ = /* @__PURE__ */ V("<div class=\"ctl-row autorow svelte-1n46o8q\"><span class=\"autolbl svelte-1n46o8q\"> </span> <span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div>"), I_ = /* @__PURE__ */ V("<div class=\"palcol svelte-1n46o8q\"><!> <span class=\"palcap svelte-1n46o8q\"> </span> <b class=\"palhex svelte-1n46o8q\"> </b></div>"), L_ = /* @__PURE__ */ V("<div class=\"ctl-row palhead svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <button type=\"button\"> </button></div> <div></div>", 1), R_ = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"theme-presets svelte-1n46o8q\"></div> <p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <div class=\"ctl-row palhead svelte-1n46o8q\"><!> <button type=\"button\"> </button></div> <div class=\"palcells svelte-1n46o8q\"></div> <!> <div class=\"ctl-row palauto-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <button type=\"button\"> </button></div> <div class=\"theme-previews svelte-1n46o8q\"><!> <!></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <div class=\"sample typo-sample svelte-1n46o8q\"><div class=\"ts-h svelte-1n46o8q\"> </div> <div class=\"ts-b svelte-1n46o8q\"> </div></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"sample form-prev svelte-1n46o8q\"><span class=\"fp-btn svelte-1n46o8q\"> </span> <span class=\"fp-card svelte-1n46o8q\"> </span></div> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"24\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"40\" step=\"1\" class=\"svelte-1n46o8q\"/></div></details></div>"), z_ = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label>"), B_ = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label>"), V_ = /* @__PURE__ */ V("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), H_ = /* @__PURE__ */ V("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <!> <!>", 1), U_ = /* @__PURE__ */ V("<div><input type=\"text\" class=\"svelte-1n46o8q\"/> <!></div>"), W_ = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), G_ = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), K_ = /* @__PURE__ */ V("<button><span class=\"rs-sample svelte-1n46o8q\"><i class=\"rs-line svelte-1n46o8q\"></i> <i class=\"rs-chip svelte-1n46o8q\"></i> <i class=\"rs-dot svelte-1n46o8q\"></i></span> <span class=\"rs-name svelte-1n46o8q\"> </span></button>"), q_ = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" step=\"4\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), J_ = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"1000\" step=\"10\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Y_ = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <!>", 1), X_ = /* @__PURE__ */ V("<p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"token-input svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"rs-grid svelte-1n46o8q\"></div> <label class=\"svelte-1n46o8q\"> <span class=\"row-tools svelte-1n46o8q\"><span class=\"gridmenu-value svelte-1n46o8q\"> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Z_ = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), Q_ = /* @__PURE__ */ V("<button class=\"footer-tp svelte-1n46o8q\"><span class=\"footer-tp-thumb svelte-1n46o8q\"></span> <span class=\"footer-tp-name svelte-1n46o8q\"> </span></button>"), $_ = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"16\" max=\"160\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), ev = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!>", 1), tv = /* @__PURE__ */ V("<div class=\"nav-row\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></div> <!>", 1), nv = /* @__PURE__ */ V("<div class=\"nav-row\"><span class=\"nav-line svelte-1n46o8q\"><span class=\"footer-soc-preview svelte-1n46o8q\" aria-hidden=\"true\"></span> <!></span> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <input class=\"nav-target svelte-1n46o8q\"/></div>"), rv = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), iv = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"footer-tpick svelte-1n46o8q\"></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"svelte-1n46o8q\"> <!></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details></div>"), av = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"date\" class=\"svelte-1n46o8q\"/></label>"), ov = /* @__PURE__ */ V("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), sv = /* @__PURE__ */ V("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/>"), cv = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span>"), lv = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" step=\"0.01\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" step=\"0.01\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), uv = /* @__PURE__ */ V("<details class=\"group collection-entry svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <textarea rows=\"3\" class=\"svelte-1n46o8q\"></textarea> <!> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!></div></details>"), dv = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\".csv,text/csv\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), fv = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button></div>"), pv = /* @__PURE__ */ V("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), mv = /* @__PURE__ */ V("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), hv = /* @__PURE__ */ V("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <!></div>"), gv = /* @__PURE__ */ V("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span></div>"), _v = /* @__PURE__ */ V("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), vv = /* @__PURE__ */ V("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <!>", 1), yv = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <!> <!></div>"), bv = /* @__PURE__ */ V("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), xv = /* @__PURE__ */ V("<button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), Sv = /* @__PURE__ */ V("<p class=\"panel-hint svelte-1n46o8q\"> </p> <button class=\"ghost svelte-1n46o8q\"> </button>", 1), Cv = /* @__PURE__ */ V("<span class=\"update-arrow svelte-1n46o8q\"></span> <span class=\"badge svelte-1n46o8q\"> </span>", 1), wv = /* @__PURE__ */ V("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><p class=\"update-notes svelte-1n46o8q\"> </p></div></details>"), Tv = /* @__PURE__ */ V("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"><span class=\"update-warn svelte-1n46o8q\"></span> </summary> <div class=\"group-items svelte-1n46o8q\"><pre class=\"update-headers svelte-1n46o8q\"> </pre></div></details>"), Ev = /* @__PURE__ */ V("<span class=\"chip svelte-1n46o8q\"> </span>"), Dv = /* @__PURE__ */ V("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <span class=\"update-warn svelte-1n46o8q\"></span></span></div>"), Ov = /* @__PURE__ */ V("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <!></div>"), kv = /* @__PURE__ */ V("<span class=\"update-warn svelte-1n46o8q\"></span>"), Av = /* @__PURE__ */ V("<div class=\"update-row svelte-1n46o8q\"><span> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <!> <input type=\"checkbox\" class=\"svelte-1n46o8q\"/></span></div>"), jv = /* @__PURE__ */ V("<div class=\"ctl-row update-opt-head svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!>", 1), Mv = /* @__PURE__ */ V("<p class=\"update-summary svelte-1n46o8q\"> </p> <!> <!> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details> <!> <button class=\"primary update-run svelte-1n46o8q\"> </button>", 1), Nv = /* @__PURE__ */ V("<div class=\"update-versions svelte-1n46o8q\"><span class=\"update-from svelte-1n46o8q\"> </span> <!></div> <!>", 1), Pv = /* @__PURE__ */ V("<aside><div class=\"panel-head svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></div> <!></aside>"), Fv = /* @__PURE__ */ V("<div class=\"workspace svelte-1n46o8q\"><nav><!> <span class=\"rail-settings svelte-1n46o8q\"><span class=\"rail-brand svelte-1n46o8q\" title=\"Urd\"><svg class=\"brand-mark svelte-1n46o8q\" viewBox=\"10.3 8.3 19.4 25.4\" aria-hidden=\"true\"><path d=\"M12 32V10l16 6.5V32\" fill=\"none\" stroke=\"var(--urd-brand)\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg> <span class=\"brand-word svelte-1n46o8q\">Urd</span></span> <button></button> <!></span></nav> <!> <div><div class=\"stage svelte-1n46o8q\"><iframe class=\"svelte-1n46o8q\"></iframe></div></div></div>"), Iv = /* @__PURE__ */ V("<p class=\"loading svelte-1n46o8q\"> </p>"), Lv = /* @__PURE__ */ V("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), Rv = /* @__PURE__ */ V("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), zv = /* @__PURE__ */ V("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <p class=\"panel-hint svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <p class=\"panel-hint svelte-1n46o8q\"> </p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), Bv = /* @__PURE__ */ V("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\">×</button></div>"), Vv = /* @__PURE__ */ V("<div><header class=\"block-menu-head svelte-1n46o8q\"><span> </span> <button class=\"ghost row-tool menu-width svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></header> <div class=\"panel-body block-menu-body svelte-1n46o8q\"><!></div></div>"), Hv = /* @__PURE__ */ V("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><!> <!></span> <span class=\"topbar-group topbar-draft svelte-1n46o8q\"><!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!> <!></div>     <!>", 1);
function Uv(e, t) {
	Xe(t, !0);
	let n = (e, t = f, n = f, r = f) => {
		var i = Nr(), a = P(i), o = (e) => {
			var i = Ap(), a = P(i), o = N(a), s = I(o);
			E(a), Jr(I(a, 2), 17, () => r().props.images ?? [], Wr, (e, i, a) => {
				var o = kp(), s = P(o), c = N(s), l = I(c, 2), u = N(l);
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
				]), B("click", u, () => Xi(t(), n(), a, -1)), B("click", d, () => Xi(t(), n(), a, 1)), B("click", f, () => Zi(t(), n(), a)), B("input", g, (e) => Qi(t(), n(), a, "x", Number(e.target.value))), B("input", b, (e) => Qi(t(), n(), a, "y", Number(e.target.value))), H(e, o);
			}), R((e, t) => {
				J(a, "title", e), U(o, `${t ?? ""} `);
			}, [() => Y("tip.bg.addImages"), () => Y("ui.addImages")]), B("change", s, (e) => Ki(t(), n(), e)), H(e, i);
		};
		W(a, (e) => {
			(r().props.source ?? "upload") !== "folder" && e(o);
		}), H(e, i);
	}, r = (e, t = f, n = f, r = f) => {
		let i = /* @__PURE__ */ k(() => yl(r()));
		var a = Np(), o = P(a), s = N(o), c = I(s);
		{
			let e = /* @__PURE__ */ k(() => z(i).source ?? "upload"), r = /* @__PURE__ */ k(() => [["upload", Y("opt.photoSource.upload")], ["folder", Y("opt.photoSource.folder")]]);
			X(c, {
				get value() {
					return z(e);
				},
				get options() {
					return z(r);
				},
				onchange: (e) => ci(t(), n(), "source", e)
			});
		}
		E(o);
		var l = I(o, 2), u = (e) => {
			let a = /* @__PURE__ */ k(() => Wd(z(i).folder ?? "")), o = /* @__PURE__ */ k(() => !z(a) || z(a).provider === "drive" || z(a).provider === "nextcloud");
			var s = Mp(), c = P(s), l = N(c), u = I(l);
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
					onchange: (e) => ci(t(), n(), "order", e)
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
				var r = jp();
				let i;
				var a = F(r, !0);
				R((e, t) => {
					i = gi(r, 1, "folder-status svelte-1n46o8q", null, i, { err: e }), U(a, t);
				}, [() => Hi[Ui(t(), n())].err, () => Hi[Ui(t(), n())].text]), H(e, r);
			}, ee = /* @__PURE__ */ k(() => Hi[Ui(t(), n())]);
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
			]), B("change", u, (e) => ci(t(), n(), "folder", e.target.value.trim())), B("change", _, (e) => ci(t(), n(), "folderMax", Number(e.target.value))), B("click", v, () => Gi(t(), n(), r())), H(e, s);
		};
		W(l, (e) => {
			(z(i).source ?? "upload") === "folder" && e(u);
		}), R((e, t) => {
			J(o, "title", e), U(s, `${t ?? ""} `);
		}, [() => Y("tip.bg.photoSource"), () => Y("lbl.photoSource")]), H(e, a);
	}, i = (e, t = f, n = f, r = f) => {
		var i = Np(), a = P(i), o = N(a), s = I(o);
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
				onchange: (e) => ci(t(), n(), "motion", e)
			});
		}
		E(a);
		var c = I(a, 2), l = (e) => {
			var i = Pp(), a = P(i), o = N(a), s = F(I(o));
			E(a);
			var c = I(a, 2);
			K(c), R((e) => {
				U(o, `${e ?? ""} `), U(s, `${r().props.motionSpeed ?? 20 ?? ""} s`), q(c, r().props.motionSpeed ?? 20);
			}, [() => Y("lbl.motionSpeed")]), B("input", c, (e) => ci(t(), n(), "motionSpeed", Number(e.target.value))), H(e, i);
		};
		W(c, (e) => {
			(r().props.motion ?? "none") !== "none" && e(l);
		}), R((e, t) => {
			J(a, "title", e), U(o, `${t ?? ""} `);
		}, [() => Y("tip.bg.imageMotion"), () => Y("lbl.motion")]), H(e, i);
	}, a = (e, t = f, a = f) => {
		var o = sm(), s = P(o);
		Jr(s, 17, a, Wr, (e, o, s) => {
			var c = om(), l = N(c), u = N(l);
			{
				let e = /* @__PURE__ */ k(() => Y("tip.bg.changeType")), n = /* @__PURE__ */ k(() => ne.map(([e, t]) => [e, t.labelKey ? Y(t.labelKey) : t.label]));
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
					onchange: (e) => Ai(t(), s, e)
				});
			}
			var d = I(u, 2), f = N(d);
			f.disabled = s === 0, G(f, () => C.up, !0), E(f);
			var p = I(f, 2);
			G(p, () => C.down, !0), E(p);
			var m = I(p, 2);
			G(m, () => C.cross, !0), E(m), E(d), E(l);
			var h = I(l, 2), g = (e) => {
				var n = Fp(), r = P(n), i = N(r), a = I(i);
				{
					let e = /* @__PURE__ */ k(la), n = /* @__PURE__ */ k(() => Y("tip.bg.layerColor"));
					wa(a, {
						get value() {
							return z(o).props.value;
						},
						get tokens() {
							return z(e);
						},
						get label() {
							return z(n);
						},
						onchange: (e) => ci(t(), s, "value", e)
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
				]), B("input", d, (e) => ci(t(), s, "opacity", Number(e.target.value))), H(e, n);
			}, _ = (e) => {
				let n = /* @__PURE__ */ k(() => hi(z(o))), r = /* @__PURE__ */ k(() => z(n).stops.reduce((e, t) => e + Math.max(0, Number(t.share) || 0), 0));
				var i = Bp(), a = P(i), c = N(a), l = I(c);
				{
					let e = /* @__PURE__ */ k(() => z(n).kind ?? "linear"), r = /* @__PURE__ */ k(() => [["linear", Y("opt.grad.linear")], ["radial", Y("opt.grad.radial")]]);
					X(l, {
						get value() {
							return z(e);
						},
						get options() {
							return z(r);
						},
						onchange: (e) => xi(t(), s, e)
					});
				}
				E(a);
				var u = I(a, 2);
				Jr(u, 17, () => z(n).stops, Wr, (e, i, a) => {
					var o = Lp();
					let c;
					var l = N(o), u = I(l, 2);
					{
						let e = /* @__PURE__ */ k(la), n = /* @__PURE__ */ k(() => Y("tip.bg.stopColor"));
						wa(u, {
							get value() {
								return z(i).color;
							},
							get tokens() {
								return z(e);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => Si(t(), s, a, { color: e })
						});
					}
					var d = I(u, 2);
					K(d);
					var f = I(d, 2), p = F(f), m = I(f, 2), h = (e) => {
						var n = Ip();
						G(n, () => C.cross, !0), E(n), R((e) => J(n, "title", e), [() => Y("tip.bg.removeStop")]), B("click", n, () => Ti(t(), s, a)), H(e, n);
					};
					W(m, (e) => {
						z(n).stops.length > 2 && e(h);
					}), E(o), R((e, t, r) => {
						c = gi(o, 1, "nav-line grad-stop svelte-1n46o8q", null, c, {
							dragging: z(Oi)?.layer === s && z(Oi).from === a,
							"drop-above": z(Oi)?.layer === s && z(Oi).insert === a,
							"drop-below": z(Oi)?.layer === s && z(Oi).insert === z(n).stops.length && a === z(n).stops.length - 1
						}), J(l, "title", e), q(d, z(i).share ?? 50), J(d, "title", t), U(p, `${r ?? ""}%`);
					}, [
						() => Y("tip.bg.dragStop"),
						() => Y("tip.bg.stopShare"),
						() => z(r) > 0 ? Math.round(Math.max(0, Number(z(i).share) || 0) / z(r) * 100) : Math.round(100 / z(n).stops.length)
					]), B("pointerdown", l, (e) => ki(t(), e, s, a)), B("input", d, (e) => Si(t(), s, a, { share: Number(e.target.value) })), H(e, o);
				});
				var d = I(u, 2), f = F(d, !0), p = I(d, 2), m = (e) => {
					var r = Rp(), i = P(r), a = N(i), o = F(I(a));
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
					]), B("input", c, (e) => yi(t(), s, "x", Number(e.target.value))), B("input", f, (e) => yi(t(), s, "y", Number(e.target.value))), H(e, r);
				}, h = (e) => {
					var r = zp(), i = P(r), a = N(i), o = F(I(a));
					E(i);
					var c = I(i, 2);
					K(c), R((e) => {
						U(a, `${e ?? ""} `), U(o, `${z(n).angle ?? ""}°`), q(c, z(n).angle);
					}, [() => Y("lbl.angle")]), B("input", c, (e) => yi(t(), s, "angle", Number(e.target.value))), H(e, r);
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
							return bi[(z(n).kind ?? "linear") === "radial" ? "radial" : "linear"];
						},
						onchange: (e) => yi(t(), s, "animation", e)
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
				]), B("click", d, () => wi(t(), s)), B("input", y, (e) => yi(t(), s, "opacity", Number(e.target.value))), H(e, i);
			}, v = (e) => {
				var n = Vp(), r = P(n), i = N(r), a = I(i);
				{
					let e = /* @__PURE__ */ k(la), n = /* @__PURE__ */ k(() => Y("tip.bg.glowColor"));
					wa(a, {
						get value() {
							return z(o).props.color;
						},
						get tokens() {
							return z(e);
						},
						get label() {
							return z(n);
						},
						onchange: (e) => ci(t(), s, "color", e)
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
				]), B("input", d, (e) => ci(t(), s, "x", Number(e.target.value))), B("input", h, (e) => ci(t(), s, "y", Number(e.target.value))), B("input", y, (e) => ci(t(), s, "radius", Number(e.target.value))), B("input", ee, (e) => ci(t(), s, "opacity", Number(e.target.value))), H(e, n);
			}, y = (e) => {
				var n = Hp(), r = P(n), i = N(r), a = F(I(i));
				E(r);
				var c = I(r, 2);
				K(c), R((e, t) => {
					U(i, `${e ?? ""} `), U(a, `${t ?? ""}%`), q(c, z(o).props.opacity);
				}, [() => Y("lbl.strength"), () => Math.round(z(o).props.opacity * 100)]), B("input", c, (e) => ci(t(), s, "opacity", Number(e.target.value))), H(e, n);
			}, b = (e) => {
				var n = Up(), r = P(n), i = N(r), a = I(i);
				{
					let e = /* @__PURE__ */ k(() => zu(z(o).props.pattern)), n = /* @__PURE__ */ k(() => Fu.map((e) => [e, Y(`opt.bgPattern.${e}`)]));
					X(a, {
						get value() {
							return z(e);
						},
						get options() {
							return z(n);
						},
						onchange: (e) => ci(t(), s, "pattern", e)
					});
				}
				E(r);
				var c = I(r, 2), l = N(c), u = I(l);
				{
					let e = /* @__PURE__ */ k(() => z(o).props.color ?? "text"), n = /* @__PURE__ */ k(la), r = /* @__PURE__ */ k(() => Y("lbl.color"));
					wa(u, {
						get value() {
							return z(e);
						},
						get tokens() {
							return z(n);
						},
						get label() {
							return z(r);
						},
						onchange: (e) => ci(t(), s, "color", e)
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
					U(i, `${e ?? ""} `), U(l, `${t ?? ""} `), U(f, `${n ?? ""} `), U(p, `${z(o).props.size ?? Iu.dflt ?? ""} px`), J(m, "min", Iu.min), J(m, "max", Iu.max), q(m, z(o).props.size ?? Iu.dflt), U(g, `${r ?? ""} `), U(_, `${a ?? ""}%`), q(v, z(o).props.opacity ?? .12), U(b, `${s ?? ""} `), U(x, `${z(o).props.rotation ?? 0 ?? ""}°`), q(S, z(o).props.rotation ?? 0), J(ee, "title", c), Ci(te, z(o).props.invert === !0), U(ne, ` ${u ?? ""}`);
				}, [
					() => Y("lbl.bgPattern"),
					() => Y("lbl.color"),
					() => Y("lbl.size"),
					() => Y("lbl.strength"),
					() => Math.round((z(o).props.opacity ?? .12) * 100),
					() => Y("lbl.patternRotation"),
					() => Y("tip.bg.patternInvert"),
					() => Y("lbl.patternInvert")
				]), B("input", m, (e) => ci(t(), s, "size", Number(e.target.value))), B("input", v, (e) => ci(t(), s, "opacity", Number(e.target.value))), B("input", S, (e) => ci(t(), s, "rotation", Number(e.target.value))), B("change", te, (e) => ci(t(), s, "invert", e.target.checked)), H(e, n);
			}, x = (e) => {
				let n = /* @__PURE__ */ k(() => z(o).props.fit === "tile" || z(o).props.fit === "repeat");
				var r = Kp(), a = P(r), c = N(a), l = I(c);
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
						onchange: (e) => ci(t(), s, "fit", e)
					});
				}
				E(u);
				var p = I(u, 2), m = F(p, !0), h = I(p, 2), g = N(h), _ = I(g, 2);
				K(_);
				var v = I(_, 4);
				E(h);
				var y = I(h, 2), b = (e) => {
					var n = Wp(), r = P(n), i = N(r), a = F(i, !0), c = I(i, 2), l = F(c, !0);
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
					]), B("click", i, () => mi(t(), s, z(o), "cover")), B("click", c, () => mi(t(), s, z(o), "contain")), B("pointerdown", f, (e) => ui(e, t(), s, "xy")), B("input", g, (e) => ci(t(), s, "x", Number(e.target.value))), B("input", b, (e) => ci(t(), s, "y", Number(e.target.value))), H(e, n);
				};
				W(y, (e) => {
					z(n) || e(b);
				});
				var x = I(y, 2), S = N(x), ee = F(I(S));
				E(x);
				var te = I(x, 2);
				K(te);
				var ne = I(te, 2), re = N(ne), C = F(I(re));
				E(ne);
				var ie = I(ne, 2);
				K(ie);
				var ae = I(ie, 2);
				i(ae, t, () => s, () => z(o));
				var oe = I(ae, 2), se = N(oe);
				K(se);
				var ce = I(se);
				E(oe);
				var le = I(oe, 2), w = (e) => {
					var n = Gp(), r = P(n), i = N(r), a = F(I(i));
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
							onchange: (e) => ci(t(), s, "bleed", e)
						});
					}
					E(l), R((e, t, n, r) => {
						U(i, `${e ?? ""} `), U(a, `${t ?? ""}%`), q(c, z(o).props.parallax ?? .3), J(l, "title", n), U(u, `${r ?? ""} `);
					}, [
						() => Y("lbl.parallaxStrength"),
						() => Math.round((z(o).props.parallax ?? 0) * 100),
						() => Y("tip.bg.bleed"),
						() => Y("lbl.bleed")
					]), B("input", c, (e) => ci(t(), s, "parallax", Number(e.target.value))), H(e, n);
				};
				W(le, (e) => {
					(z(o).props.parallax ?? 0) > 0 && e(w);
				}), R((e, t, n, r, i, s, l, f, h, y, b, x, ne, ae) => {
					J(a, "title", e), U(c, `${t ?? ""} `), J(u, "title", n), U(d, `${r ?? ""} `), J(p, "title", i), U(m, s), J(g, "title", l), q(_, f), J(v, "title", h), U(S, `${y ?? ""} `), U(ee, `${z(o).props.blur ?? 0 ?? ""} px`), q(te, z(o).props.blur ?? 0), U(re, `${b ?? ""} `), U(C, `${x ?? ""}%`), q(ie, z(o).props.opacity ?? 1), J(oe, "title", ne), Ci(se, (z(o).props.parallax ?? 0) > 0), U(ce, ` ${ae ?? ""}`);
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
				]), B("change", l, (e) => zi(t(), s, e)), B("click", g, () => fi(t(), s, z(o).props.size ?? 1, -.05)), B("change", _, (e) => pi(t(), s, e.target.value)), B("click", v, () => fi(t(), s, z(o).props.size ?? 1, .05)), B("input", te, (e) => ci(t(), s, "blur", Number(e.target.value))), B("input", ie, (e) => ci(t(), s, "opacity", Number(e.target.value))), B("change", se, (e) => ci(t(), s, "parallax", e.target.checked ? .3 : 0)), H(e, r);
			}, S = (e) => {
				let i = /* @__PURE__ */ k(() => yl(z(o))), a = /* @__PURE__ */ k(() => z(i).style ?? "floating"), c = /* @__PURE__ */ k(() => fl(z(a), z(i).motion)), l = /* @__PURE__ */ k(() => (z(i).seed ?? 0) > 0);
				var u = rm(), d = P(u);
				r(d, t, () => s, () => z(o));
				var f = I(d, 2);
				n(f, t, () => s, () => z(o));
				var p = I(f, 2), m = N(p), h = I(m);
				{
					let e = /* @__PURE__ */ k(() => Vc.map((e) => [e, Y(`opt.galleryStyle.${e}`)]));
					X(h, {
						get value() {
							return z(a);
						},
						get options() {
							return z(e);
						},
						onchange: (e) => ci(t(), s, "style", e)
					});
				}
				E(p);
				var g = I(p, 2), _ = (e) => {
					var n = qp(), r = P(n), a = N(r), o = I(a);
					{
						let e = /* @__PURE__ */ k(() => z(i).fit ?? "cover"), n = /* @__PURE__ */ k(() => [["cover", Y("opt.fit.cover")], ["contain", Y("opt.fit.contain")]]);
						X(o, {
							get value() {
								return z(e);
							},
							get options() {
								return z(n);
							},
							onchange: (e) => ci(t(), s, "fit", e)
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
					]), B("input", d, (e) => ci(t(), s, "interval", Number(e.target.value))), B("input", h, (e) => ci(t(), s, "fade", Number(e.target.value))), B("input", y, (e) => ci(t(), s, "blur", Number(e.target.value))), H(e, n);
				}, v = (e) => {
					var n = em(), r = P(n), o = (e) => {
						var n = Jp(), r = P(n), a = N(r), o = I(a);
						{
							let e = /* @__PURE__ */ k(() => String(z(i).rows ?? 2));
							X(o, {
								get value() {
									return z(e);
								},
								options: [["1", "1"], ["2", "2"]],
								onchange: (e) => ci(t(), s, "rows", Number(e))
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
								onchange: (e) => ci(t(), s, "direction", e)
							});
						}
						E(c), R((e, t) => {
							U(a, `${e ?? ""} `), U(l, `${t ?? ""} `);
						}, [() => Y("lbl.galleryRows"), () => Y("lbl.photoDirection")]), H(e, n);
					}, c = (e) => {
						var n = Xp(), r = P(n), o = N(r), c = I(o);
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
								onchange: (e) => ci(t(), s, "repeat", e === "repeat")
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
								onchange: (e) => ci(t(), s, "seed", e === "fixed" ? Wi() : 0)
							});
						}
						E(p);
						var g = I(p, 2), _ = (e) => {
							var n = Yp(), r = N(n);
							G(r, () => C.shuffle);
							var i = I(r);
							E(n), R((e, t) => {
								J(n, "title", e), U(i, ` ${t ?? ""}`);
							}, [() => Y("tip.bg.photoSeed"), () => Y("ui.shufflePhotos")]), B("click", n, () => ci(t(), s, "seed", Wi())), H(e, n);
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
						]), B("change", c, (e) => ci(t(), s, "count", Number(e.target.value))), H(e, n);
					};
					W(r, (e) => {
						z(a) === "band" ? e(o) : e(c, -1);
					});
					var u = I(r, 2), d = N(u), f = F(I(d));
					E(u);
					var p = I(u, 2);
					K(p);
					var m = I(p, 2), h = (e) => {
						var n = Zp(), r = P(n), a = N(r), o = F(I(a));
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
						]), B("input", c, (e) => ci(t(), s, "spread", Number(e.target.value))), B("input", f, (e) => ci(t(), s, "tilt", Number(e.target.value))), H(e, n);
					};
					W(m, (e) => {
						z(a) === "floating" && e(h);
					});
					var g = I(m, 2), _ = N(g), v = I(_);
					{
						let e = /* @__PURE__ */ k(() => z(i).shape ?? "rect"), n = /* @__PURE__ */ k(() => Hc.map((e) => [e, Y(`opt.galleryShape.${e}`)]));
						X(v, {
							get value() {
								return z(e);
							},
							get options() {
								return z(n);
							},
							onchange: (e) => ci(t(), s, "shape", e)
						});
					}
					E(g);
					var y = I(g, 2), b = N(y), x = I(b);
					{
						let e = /* @__PURE__ */ k(() => z(i).look ?? "shadow"), n = /* @__PURE__ */ k(() => Uc.map((e) => [e, Y(`opt.galleryLook.${e}`)]));
						X(x, {
							get value() {
								return z(e);
							},
							get options() {
								return z(n);
							},
							onchange: (e) => ci(t(), s, "look", e)
						});
					}
					E(y);
					var S = I(y, 2), ee = (e) => {
						var n = Qp(), r = N(n), a = I(r);
						{
							let e = /* @__PURE__ */ k(() => vl(z(i).look, z(i).frameColor)), n = /* @__PURE__ */ k(la), r = /* @__PURE__ */ k(() => Y("tip.bg.frameColor"));
							wa(a, {
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
								onchange: (e) => ci(t(), s, "frameColor", e ?? "")
							});
						}
						E(n), R((e) => U(r, `${e ?? ""} `), [() => Y("lbl.frameColor")]), H(e, n);
					}, te = /* @__PURE__ */ k(() => _l(z(i).look));
					W(S, (e) => {
						z(te) && e(ee);
					});
					var ne = I(S, 2), re = (e) => {
						var n = $p(), r = P(n), a = N(r), o = F(I(a));
						E(r);
						var c = I(r, 2);
						K(c), R((e) => {
							U(a, `${e ?? ""} `), U(o, `${z(i).radius ?? 5 ?? ""} px`), q(c, z(i).radius ?? 5);
						}, [() => Y("lbl.rounding")]), B("input", c, (e) => ci(t(), s, "radius", Number(e.target.value))), H(e, n);
					}, ie = /* @__PURE__ */ k(() => Cl(z(i).shape) && (z(i).look ?? "shadow") !== "polaroid");
					W(ne, (e) => {
						z(ie) && e(re);
					}), R((e, t, n, r, i, a, o) => {
						U(d, `${e ?? ""} `), U(f, `${t ?? ""} px`), q(p, n), J(g, "title", r), U(_, `${i ?? ""} `), J(y, "title", a), U(b, `${o ?? ""} `);
					}, [
						() => Y("lbl.size"),
						() => gl(z(i).size, z(a)),
						() => gl(z(i).size, z(a)),
						() => Y("tip.bg.galleryShape"),
						() => Y("lbl.galleryShape"),
						() => Y("tip.bg.galleryLook"),
						() => Y("lbl.galleryLook")
					]), B("input", p, (e) => ci(t(), s, "size", Number(e.target.value))), H(e, n);
				};
				W(g, (e) => {
					z(a) === "fill" ? e(_) : e(v, -1);
				});
				var y = I(g, 2), b = N(y), x = I(b);
				{
					let e = /* @__PURE__ */ k(() => z(i).tone ?? "natural"), n = /* @__PURE__ */ k(() => Wc.map((e) => [e, Y(`opt.galleryTone.${e}`)]));
					X(x, {
						get value() {
							return z(e);
						},
						get options() {
							return z(n);
						},
						onchange: (e) => ci(t(), s, "tone", e)
					});
				}
				E(y);
				var S = I(y, 2), ee = (e) => {
					var n = Qp(), r = N(n), i = I(r);
					{
						let e = /* @__PURE__ */ k(() => pl(z(a)).map((e) => [e, Y(e === "none" ? "common.none" : `opt.galleryMotion.${e}`)]));
						X(i, {
							get value() {
								return z(c);
							},
							get options() {
								return z(e);
							},
							onchange: (e) => ci(t(), s, "motion", e)
						});
					}
					E(n), R((e, t) => {
						J(n, "title", e), U(r, `${t ?? ""} `);
					}, [() => Y("tip.bg.photoMotion"), () => Y("lbl.motion")]), H(e, n);
				}, te = /* @__PURE__ */ k(() => pl(z(a)).length > 1);
				W(S, (e) => {
					z(te) && e(ee);
				});
				var ne = I(S, 2), re = (e) => {
					var n = tm(), r = P(n), a = N(r), o = F(I(a));
					E(r);
					var c = I(r, 2);
					K(c), R((e) => {
						U(a, `${e ?? ""} `), U(o, `${z(i).interval ?? 12 ?? ""} s`), q(c, z(i).interval ?? 12);
					}, [() => Y("lbl.secondsPerImage")]), B("input", c, (e) => ci(t(), s, "interval", Number(e.target.value))), H(e, n);
				}, ie = (e) => {
					var n = tm(), r = P(n), a = N(r), o = F(I(a));
					E(r);
					var c = I(r, 2);
					K(c), R((e) => {
						U(a, `${e ?? ""} `), U(o, `${z(i).motionSpeed ?? 30 ?? ""} s`), q(c, z(i).motionSpeed ?? 30);
					}, [() => Y("lbl.motionSpeed")]), B("input", c, (e) => ci(t(), s, "motionSpeed", Number(e.target.value))), H(e, n);
				};
				W(ne, (e) => {
					z(c) === "crossfade" && z(a) !== "fill" ? e(re) : (z(c) !== "none" || z(a) === "band") && e(ie, 1);
				});
				var ae = I(ne, 2), oe = N(ae);
				K(oe);
				var se = I(oe);
				E(ae);
				var ce = I(ae, 2), le = (e) => {
					var n = nm();
					let r;
					var a = N(n);
					K(a);
					var o = I(a);
					E(n), R((e, t) => {
						r = gi(n, 1, "gridmenu-snap svelte-1n46o8q", null, r, { muted: z(i).underNav === !1 }), J(n, "title", e), Ci(a, z(i).underAnnounce === !0), a.disabled = z(i).underNav === !1, U(o, ` ${t ?? ""}`);
					}, [() => Y("tip.bg.underAnnounce"), () => Y("lbl.underAnnounce")]), B("change", a, (e) => e.target.checked ? si(t(), s, {
						underAnnounce: !0,
						underNav: !0
					}) : ci(t(), s, "underAnnounce", !1)), H(e, n);
				};
				W(ce, (e) => {
					z(O).nav?.announcement?.text && e(le);
				});
				var w = I(ce, 2), ue = N(w), de = F(I(ue));
				E(w);
				var fe = I(w, 2);
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
				]), B("change", oe, (e) => e.target.checked ? ci(t(), s, "underNav", !0) : si(t(), s, {
					underNav: !1,
					underAnnounce: !1
				})), B("input", fe, (e) => ci(t(), s, "opacity", Number(e.target.value))), H(e, u);
			}, ee = (e) => {
				var n = am(), r = P(n), i = N(r), a = I(i);
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
						onchange: (e) => ci(t(), s, "fit", e)
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
				var re = I(ne, 2), C = N(re);
				K(C);
				var ie = I(C);
				E(re);
				var ae = I(re, 2), oe = (e) => {
					var n = im(), r = P(n), i = N(r), a = F(I(i));
					E(r);
					var c = I(r, 2);
					K(c), R((e, t) => {
						U(i, `${e ?? ""} `), U(a, `${t ?? ""}%`), q(c, z(o).props.parallax ?? .3);
					}, [() => Y("lbl.parallaxStrength"), () => Math.round((z(o).props.parallax ?? 0) * 100)]), B("input", c, (e) => ci(t(), s, "parallax", Number(e.target.value))), H(e, n);
				};
				W(ae, (e) => {
					(z(o).props.parallax ?? 0) > 0 && e(oe);
				}), R((e, t, n, a, s, u, p, m, v, S, ae, oe, se, ce) => {
					J(r, "title", e), U(i, `${t ?? ""} `), J(c, "title", n), U(l, `${a ?? ""} `), J(d, "title", s), U(f, `${u ?? ""} `), U(h, `${p ?? ""} `), U(g, `${m ?? ""}%`), q(_, z(o).props.x ?? .5), U(y, `${v ?? ""} `), U(b, `${S ?? ""}%`), q(x, z(o).props.y ?? .5), U(ee, `${ae ?? ""} `), U(te, `${oe ?? ""}%`), q(ne, z(o).props.opacity ?? 1), J(re, "title", se), Ci(C, (z(o).props.parallax ?? 0) > 0), U(ie, ` ${ce ?? ""}`);
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
				]), B("change", a, (e) => Bi(t(), s, e)), B("change", u, (e) => Vi(t(), s, e)), B("input", _, (e) => ci(t(), s, "x", Number(e.target.value))), B("input", x, (e) => ci(t(), s, "y", Number(e.target.value))), B("input", ne, (e) => ci(t(), s, "opacity", Number(e.target.value))), B("change", C, (e) => ci(t(), s, "parallax", e.target.checked ? .3 : 0)), H(e, n);
			};
			W(h, (e) => {
				z(o).type === "color" ? e(g) : z(o).type === "gradient" ? e(_, 1) : z(o).type === "glow" ? e(v, 2) : z(o).type === "grain" ? e(y, 3) : z(o).type === "pattern" ? e(b, 4) : z(o).type === "image" ? e(x, 5) : z(o).type === "slideshow" ? e(S, 6) : z(o).type === "video" && e(ee, 7);
			}), E(c), R((e, t, n) => {
				J(f, "title", e), J(p, "title", t), p.disabled = s === a().length - 1, J(m, "title", n);
			}, [
				() => Y("hint.bg.order"),
				() => Y("hint.bg.order"),
				() => Y("tip.bg.removeLayer")
			]), B("click", f, () => oi(t(), s, -1)), B("click", p, () => oi(t(), s, 1)), B("click", m, () => ai(t(), s)), H(e, c);
		});
		var c = I(s, 2), l = N(c), u = I(l);
		{
			let e = /* @__PURE__ */ k(() => ne.map(([e, t]) => [e, t.labelKey ? Y(t.labelKey) : t.label]));
			X(u, {
				get value() {
					return z(ri);
				},
				get options() {
					return z(e);
				},
				onchange: (e) => j(ri, e, !0)
			});
		}
		E(c);
		var d = I(c, 2), p = F(d, !0);
		R((e, t) => {
			U(l, `${e ?? ""} `), U(p, t);
		}, [() => Y("lbl.newLayer"), () => Y("ui.addLayer")]), B("click", d, () => ii(t(), z(ri))), H(e, o);
	}, o = (e, t = f, n = f) => {
		var r = Nr();
		Jr(P(r), 17, n, Wr, (e, r, i) => {
			var a = lm(), o = N(a);
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
					onchange: (e) => Od(t(), i, e)
				});
			}
			E(d);
			var p = I(d, 2), m = (e) => {
				var n = cm();
				K(n), R((e, t) => {
					q(n, z(r).href ?? ""), J(n, "placeholder", e), J(n, "title", t);
				}, [() => Y("ph.hrefAnchor"), () => Y("tip.hrefAnchor")]), B("change", n, (e) => Pd(t(), i, e.target.value)), H(e, n);
			};
			W(p, (e) => {
				z(r).page || e(m);
			}), E(a), R((e, t) => {
				q(o, z(r).label), J(o, "title", e), l.disabled = i === n().length - 1, J(u, "title", t);
			}, [() => Y("tip.linkLabel"), () => Y("tip.removeLink")]), B("input", o, (e) => Ed(t(), i, e.target.value)), B("click", c, () => Td(t(), i, -1)), B("click", l, () => Td(t(), i, 1)), B("click", u, () => wd(t(), i)), H(e, a);
		}), H(e, r);
	}, s = (e) => {
		let t = /* @__PURE__ */ k(() => z(M).props.boxStyle ?? {});
		var n = dm(), r = P(n), i = N(r), a = I(i);
		{
			let e = /* @__PURE__ */ k(() => z(t).bg ?? ""), n = /* @__PURE__ */ k(la), r = /* @__PURE__ */ k(() => Y("tip.box.bg"));
			wa(a, {
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
				onchange: (e) => Yn({ bg: e || null })
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
				onchange: (e) => Yn({ shadow: e || null })
			});
		}
		E(o);
		var l = I(o, 2), u = (e) => {
			var n = Qp(), r = N(n), i = I(r);
			{
				let e = /* @__PURE__ */ k(() => z(t).shadowColor ?? ""), n = /* @__PURE__ */ k(la), r = /* @__PURE__ */ k(() => Y("tip.box.shadowColor"));
				wa(i, {
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
					onchange: (e) => Yn({ shadowColor: e || null })
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
				onchange: (e) => Yn({ border: e === "custom" ? {
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
			var r = um(), i = P(r), a = N(i), o = I(a);
			{
				let e = /* @__PURE__ */ k(la), t = /* @__PURE__ */ k(() => Y("tip.box.borderColor"));
				wa(o, {
					get value() {
						return z(n).color;
					},
					get tokens() {
						return z(e);
					},
					get label() {
						return z(t);
					},
					onchange: (e) => Yn({ border: {
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
			]), B("click", u, () => Yn({ border: {
				...z(n),
				width: Math.max(1, z(n).width - 1)
			} })), B("change", d, (e) => Yn({ border: {
				...z(n),
				width: Math.min(12, Math.max(1, Number(e.target.value) || 1))
			} })), B("click", f, () => Yn({ border: {
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
		]), B("change", _, (e) => Yn({ glass: e.target.checked || null })), H(e, n);
	}, c = (e, t = f, n = f, r = f, i = f) => {
		var a = fm(), o = N(a), s = N(o), c = F(s, !0), l = F(I(s), !0);
		E(o);
		var u = I(o, 2);
		ei(N(u), i), E(u), E(a), R((e) => {
			a.open = e, U(c, n()), U(l, r());
		}, [() => dn.has(t())]), Cr("toggle", a, (e) => {
			e.currentTarget.open ? dn.add(t()) : dn.delete(t());
		}), H(e, a);
	}, l = (e, t = f) => {
		let n = (e) => {
			var t = Nr(), n = P(t), r = (e) => {
				var t = pm(), n = F(t, !0);
				R((e) => U(n, e), [() => Y("hint.textInline")]), H(e, t);
			}, i = (e) => {
				var t = vm(), n = P(t), r = N(n), i = I(r);
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
					var t = mm(), n = N(t), r = I(n);
					K(r), E(t), R((e, i, a) => {
						J(t, "title", e), U(n, `${i ?? ""} `), q(r, z(M).props.endpoint ?? ""), J(r, "placeholder", a);
					}, [
						() => Y("form.endpointNote"),
						() => Y("form.endpoint"),
						() => Y("form.endpointPh")
					]), B("change", r, (e) => L("endpoint", e.target.value.trim())), H(e, t);
				}, s = (e) => {
					var t = hm(), n = P(t), r = N(n), i = I(r);
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
					var r = _m(), i = P(r), a = N(i);
					K(a);
					var o = I(a, 2);
					{
						let e = /* @__PURE__ */ k(() => z(t).type ?? "text"), r = /* @__PURE__ */ k(() => Xn.map((e) => [e, Y(`form.type${e[0].toUpperCase()}${e.slice(1)}`)]));
						X(o, {
							get value() {
								return z(e);
							},
							get options() {
								return z(r);
							},
							onchange: (e) => $n(z(n), { type: e })
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
						var r = gm();
						K(r), R((e, t) => {
							q(r, e), J(r, "placeholder", t);
						}, [() => (z(t).options ?? []).join(", "), () => Y("form.optionsPh")]), B("change", r, (e) => er(z(n), e.target.value)), H(e, r);
					}, g = /* @__PURE__ */ k(() => Zn.has(z(t).type));
					W(m, (e) => {
						z(g) && e(h);
					}), R((e, r, i) => {
						q(a, z(t).label), J(a, "placeholder", e), c.disabled = z(n) === 0, l.disabled = z(n) === (z(M).props.fields?.length ?? 0) - 1, J(u, "title", r), Ci(f, z(t).required === !0), U(p, ` ${i ?? ""}`);
					}, [
						() => Y("form.fieldNamePh"),
						() => Y("form.removeField"),
						() => Y("form.required")
					]), B("change", a, (e) => $n(z(n), { label: e.target.value.trim() || Y("form.fieldFallback") })), B("click", c, () => rr(z(n), -1)), B("click", l, () => rr(z(n), 1)), B("click", u, () => nr(z(n))), B("change", f, (e) => $n(z(n), { required: e.target.checked })), H(e, r);
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
				]), B("click", d, tr), B("change", h, (e) => L("submitLabel", e.target.value.trim() || Y("form.sendDefault"))), B("change", v, (e) => L("successText", e.target.value.trim() || Y("form.thanksDefault"))), H(e, t);
			}, a = (e) => {
				var t = Am(), n = P(t), r = F(n, !0), i = I(n, 2);
				Jr(i, 17, () => z(M).props.sources ?? [], Wr, (e, t, n) => {
					let r = /* @__PURE__ */ k(() => ir(z(t)));
					var i = ym(), a = N(i), o = N(a);
					K(o);
					var s = I(o, 2);
					G(s, () => C.cross, !0), E(s), E(a);
					var c = I(a, 2), l = N(c);
					K(l);
					var u = I(l, 2);
					{
						let e = /* @__PURE__ */ k(() => z(r).color || "accent"), t = /* @__PURE__ */ k(la), i = /* @__PURE__ */ k(() => Y("tip.calendar.sourceColor"));
						wa(u, {
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
							onchange: (e) => or(n, { color: e ?? "" })
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
					]), B("change", o, (e) => or(n, { url: e.target.value.trim() })), B("click", s, () => cr(n)), B("change", l, (e) => or(n, { name: e.target.value.trim() })), H(e, i);
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
					let t = /* @__PURE__ */ k(() => z(lr).filter((e) => !(z(M).props.sources ?? []).some((t) => ir(t).url === e)));
					var n = Sm(), r = P(n);
					Jr(r, 16, () => z(t), (e) => e, (e, t) => {
						var n = bm(), r = F(n, !0);
						R(() => {
							J(n, "title", t), U(r, t);
						}), B("click", n, () => dr(t)), H(e, n);
					});
					var i = I(r, 2), a = (e) => {
						var t = xm(), n = F(t, !0);
						R((e) => U(n, e), [() => Y("calendar.siteSourcesNone")]), H(e, t);
					};
					W(i, (e) => {
						z(t).length || e(a);
					}), H(e, n);
				};
				W(d, (e) => {
					z(lr) && e(f);
				});
				var p = I(d, 2), m = (e) => {
					var t = Qp(), n = N(t), r = I(n);
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
				}, h = /* @__PURE__ */ k(() => !tp(z(M).props.design).view);
				W(p, (e) => {
					z(h) && e(m);
				});
				var g = I(p, 2), _ = (e) => {
					var t = Cm(), n = N(t);
					K(n);
					var r = I(n);
					E(t), R((e, i) => {
						J(t, "title", e), Ci(n, z(M).props.switcher === !0), U(r, ` ${i ?? ""}`);
					}, [() => Y("tip.calendar.switcher"), () => Y("calendar.switcher")]), B("change", n, (e) => L("switcher", e.target.checked || void 0)), H(e, t);
				}, v = /* @__PURE__ */ k(() => rp.includes(np(z(M).props)));
				W(g, (e) => {
					z(v) && e(_);
				});
				var y = I(g, 2), b = (e) => {
					var t = wm(), n = P(t), r = N(n), i = I(r);
					K(i), E(n);
					var a = I(n, 2), o = (e) => {
						var t = Cm(), n = N(t);
						K(n);
						var r = I(n);
						E(t), R((e, i) => {
							J(t, "title", e), Ci(n, z(M).props.showMore !== !1), U(r, ` ${i ?? ""}`);
						}, [() => Y("tip.calendar.showMore"), () => Y("calendar.showMore")]), B("change", n, (e) => L("showMore", e.target.checked ? void 0 : !1)), H(e, t);
					}, s = /* @__PURE__ */ k(() => np(z(M).props) === "list" && tp(z(M).props.design).module !== "more");
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
					var t = Tm(), n = P(t);
					{
						let e = /* @__PURE__ */ k(() => Y("calendar.nextCount")), t = /* @__PURE__ */ k(() => Y("tip.calendar.nextCount")), r = /* @__PURE__ */ k(() => String(Math.min(3, Math.max(1, Number(z(M).props.nextCount) || 1))));
						As(n, {
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
					Fo(oe, {
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
								G(P(t), () => oo(z(M).props.emptyIcon ?? "calendar") || oo("calendar")), H(e, t);
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
					var t = Cm(), n = N(t);
					K(n);
					var r = I(n);
					E(t), R((e) => {
						Ci(n, z(M).props.showCategories !== !1), U(r, ` ${e ?? ""}`);
					}, [() => Y("calendar.showCategories")]), B("change", n, (e) => L("showCategories", e.target.checked)), H(e, t);
				}, le = /* @__PURE__ */ k(() => !tp(z(M).props.design).ownFilter);
				W(se, (e) => {
					z(le) && e(ce);
				});
				var w = I(se, 2), ue = N(w);
				K(ue);
				var de = I(ue);
				E(w);
				var fe = I(w, 2), pe = N(fe);
				K(pe);
				var T = I(pe);
				E(fe);
				var me = I(fe, 2), he = (e) => {
					var t = Cm(), n = N(t);
					K(n);
					var r = I(n);
					E(t), R((e, i) => {
						J(t, "title", e), Ci(n, z(M).props.showOpen !== !1), U(r, ` ${i ?? ""}`);
					}, [() => Y("tip.calendar.showOpen"), () => Y("calendar.showOpen")]), B("change", n, (e) => L("showOpen", e.target.checked ? void 0 : !1)), H(e, t);
				}, ge = /* @__PURE__ */ k(() => tp(z(M).props.design).open);
				W(me, (e) => {
					z(ge) && e(he);
				});
				var _e = I(me, 2), ve = (e) => {
					var t = Em(), n = N(t), r = I(n);
					K(r), E(t), R((e, i) => {
						J(t, "title", e), U(n, `${i ?? ""} `), q(r, z(M).props.programHref ?? "");
					}, [() => Y("tip.calendar.programHref"), () => Y("calendar.programHref")]), B("change", r, (e) => L("programHref", e.target.value.trim() || void 0)), H(e, t);
				}, ye = /* @__PURE__ */ k(() => tp(z(M).props.design).program);
				W(_e, (e) => {
					z(ye) && e(ve);
				});
				var be = I(_e, 2), xe = (e) => {
					var t = Om(), n = P(t), r = N(n);
					K(r);
					var i = I(r);
					E(n);
					var a = I(n, 2), o = (e) => {
						var t = Dm(), n = P(t), r = (e) => {
							{
								let t = /* @__PURE__ */ k(() => Y("calendar.noticeAs")), n = /* @__PURE__ */ k(() => Y("tip.calendar.noticeAs")), r = /* @__PURE__ */ k(() => z(M).props.notice?.as === "band" ? "band" : "note"), i = /* @__PURE__ */ k(() => [["note", Y("calendar.noticeAsNote")], ["band", Y("calendar.noticeAsBand")]]);
								As(e, {
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
						}, i = /* @__PURE__ */ k(() => tp(z(M).props.design).noticeBand);
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
				}, Se = /* @__PURE__ */ k(() => tp(z(M).props.design).notice);
				W(be, (e) => {
					z(Se) && e(xe);
				});
				var Ce = I(be, 2), we = (e) => {
					var t = km(), n = F(t, !0);
					R((e, r) => {
						J(t, "title", e), U(n, r);
					}, [() => Y("tip.calendar.resetTexts"), () => Y("calendar.resetTexts")]), B("click", t, () => L("texts", void 0)), H(e, t);
				}, Te = /* @__PURE__ */ k(() => dp(tp(z(M).props.design), z(M).props.texts));
				W(Ce, (e) => {
					z(Te) && e(we);
				}), R((e, t, i, a, o, l, d, f, p, m, h, g) => {
					J(n, "title", e), U(r, t), U(s, ` ${i ?? ""}`), J(c, "title", a), U(u, ` ${o ?? ""}`), J(te, "title", l), U(ne, `${d ?? ""} `), q(re, z(M).props.emptyText ?? ""), J(re, "placeholder", f), J(ie, "title", p), U(ae, `${m ?? ""} `), Ci(ue, z(M).props.showSubscribe !== !1), U(de, ` ${h ?? ""}`), Ci(pe, z(M).props.showSignup === !0), U(T, ` ${g ?? ""}`);
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
				]), B("click", a, sr), B("click", c, ur), B("change", re, (e) => L("emptyText", e.target.value.trim() || void 0)), B("change", ue, (e) => L("showSubscribe", e.target.checked)), B("change", pe, (e) => L("showSignup", e.target.checked)), H(e, t);
			}, o = (e) => {
				var t = Mm(), n = P(t), r = N(n);
				K(r);
				var i = I(r);
				E(n);
				var a = I(n, 2), o = F(a, !0), s = I(a, 2);
				Jr(s, 17, () => z(M).props.items ?? [], Wr, (e, t, n) => {
					var r = jm(), i = N(r);
					K(i);
					var a = I(i, 2), o = N(a);
					o.disabled = n === 0, G(o, () => C.up, !0), E(o);
					var s = I(o, 2);
					G(s, () => C.down, !0), E(s);
					var c = I(s, 2);
					G(c, () => C.cross, !0), E(c), E(a), E(r), R((e, r) => {
						q(i, z(t).q), J(i, "title", e), s.disabled = n === (z(M).props.items?.length ?? 0) - 1, J(c, "title", r);
					}, [() => Y("tip.faq.question"), () => Y("tip.faq.remove")]), B("change", i, (e) => pr(n, { q: e.target.value })), B("click", o, () => gr(n, -1)), B("click", s, () => gr(n, 1)), B("click", c, () => hr(n)), H(e, r);
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
				]), B("change", r, (e) => L("multi", e.target.checked)), B("click", c, mr), H(e, t);
			}, s = (e) => {
				var t = Pm(), n = P(t), r = F(n, !0), i = I(n, 2);
				Jr(i, 17, () => z(M).props.items ?? [], Wr, (e, t, n) => {
					var r = Nm(), i = P(r), a = N(i);
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
					]), B("change", a, (e) => Sr(n, { year: e.target.value })), B("change", o, (e) => Sr(n, { title: e.target.value })), B("click", c, () => Er(n, -1)), B("click", l, () => Er(n, 1)), B("click", u, () => Tr(n)), B("change", d, (e) => Sr(n, { text: e.target.value })), H(e, r);
				});
				var a = I(i, 2), o = F(a, !0);
				R((e, t) => {
					U(r, e), U(o, t);
				}, [() => Y("lbl.timelineItems"), () => Y("ui.addTlItem")]), B("click", a, wr), H(e, t);
			}, c = (e) => {
				var t = Fm(), n = P(t), r = N(n), i = I(r);
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
				var t = Im(), n = P(t), r = N(n), i = I(r);
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
				var t = zm(), n = P(t), r = F(n, !0), i = I(n, 2);
				Jr(i, 17, () => z(M).props.items ?? [], Wr, (e, t, n) => {
					var r = jm(), i = N(r);
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
					]), B("change", i, (e) => _r(n, e.target.value)), B("click", o, () => br(n, -1)), B("click", s, () => br(n, 1)), B("click", c, () => yr(n)), H(e, r);
				});
				var a = I(i, 2), o = F(a, !0), s = I(a, 2), c = N(s), l = F(c, !0), u = I(c, 2);
				Jr(u, 21, () => z(S), ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ k(() => h(z(t), 2));
					let r = () => z(n)[0], i = () => z(n)[1];
					var a = Lm();
					let o;
					G(a, () => y[r()], !0), E(a), R(() => {
						o = gi(a, 1, "tile svelte-1n46o8q", null, o, { on: (z(M).props.sep ?? "dot") === r() }), J(a, "aria-pressed", (z(M).props.sep ?? "dot") === r()), J(a, "title", i());
					}), B("click", a, () => L("sep", r())), H(e, a);
				}), E(u), E(s);
				var d = I(s, 2), f = (e) => {
					var t = Rm(), n = N(t), r = F(n, !0), i = I(n, 2);
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
				]), B("click", a, vr), H(e, t);
			}, d = (e) => {
				var t = Bm(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2), o = F(a, !0);
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
				]), B("click", r, () => Or(1, 0)), B("click", a, () => Or(-1, 0)), B("click", c, () => Or(0, 1)), B("click", u, () => Or(0, -1)), B("change", p, (e) => L("header", e.target.checked)), H(e, t);
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
					var a = Cm(), o = N(a);
					K(o);
					var s = I(o);
					E(a), R((e) => {
						Ci(o, e), U(s, ` ${i() ?? ""}`);
					}, [() => (z(M).props.services ?? []).includes(r())]), B("change", o, (e) => kr(r(), e.target.checked)), H(e, a);
				}), H(e, t);
			}, p = (e) => {
				var t = Vm(), n = P(t), r = N(n), i = I(r);
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
				var t = Um(), n = P(t), r = N(n), i = I(r);
				E(n);
				var a = I(n, 2), o = (e) => {
					var t = Hm(), n = F(t, !0);
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
				]), B("change", i, Ar), B("change", l, (e) => L("title", e.target.value)), B("change", d, (e) => L("loop", e.target.checked)), H(e, t);
			}, g = (e) => {
				var t = Wm(), n = P(t), r = N(n), i = I(r);
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
							Tn(`edit:${z(M).blockId}`, (e) => {
								e.props.page = t, t && (e.props.href = null);
							});
						}
					});
				}
				E(a);
				var c = I(a, 2), l = (e) => {
					var t = gm();
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
				var t = Gm(), n = P(t), r = N(n), i = I(r);
				E(n);
				var a = I(n, 2), o = N(a), s = I(o);
				K(s), E(a);
				var c = I(a, 2), l = N(c), u = I(l);
				K(u), E(c);
				var d = I(c, 2), f = (e) => {
					var t = Cm(), n = N(t);
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
				]), B("change", i, V), B("change", s, (e) => L("alt", e.target.value)), B("change", u, (e) => L("href", e.target.value || null)), H(e, t);
			}, v = (e) => {
				let t = /* @__PURE__ */ k(() => z(M).props.source === "file" ? "file" : "embed");
				var n = Jm(), r = P(n);
				{
					let e = /* @__PURE__ */ k(() => Y("lbl.videoSource")), n = /* @__PURE__ */ k(() => [["embed", Y("opt.videoSource.embed")], ["file", Y("opt.videoSource.file")]]);
					As(r, {
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
					var t = Km(), n = P(t), r = F(n, !0), i = I(n, 2);
					K(i), R((e, t, a) => {
						J(n, "title", e), U(r, t), q(i, z(M).props.url ?? ""), J(i, "placeholder", a);
					}, [
						() => Y("hint.video"),
						() => Y("lbl.videoUrl"),
						() => Y("ph.videoUrl")
					]), B("change", i, (e) => L("url", e.target.value)), H(e, t);
				}, o = (e) => {
					var t = qm(), n = P(t), r = N(n), i = I(r);
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
						var t = Cm(), n = N(t);
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
					]), B("change", i, Li), B("change", s, Ri), B("change", l, (e) => L("loop", e.target.checked)), B("change", f, (e) => En("muted", e.target.checked ? { muted: !0 } : {
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
				var t = Zm(), n = P(t), r = N(n), i = I(r), a = N(i);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.glyph ?? "★"), t = /* @__PURE__ */ k(() => z(M).props.icon ?? null), n = /* @__PURE__ */ k(() => z(M).props.image ?? null);
					bo(a, {
						get value() {
							return z(e);
						},
						get icon() {
							return z(t);
						},
						get image() {
							return z(n);
						},
						onpick: (e) => Tn(`edit:${z(M).blockId}`, (t) => {
							t.props.glyph = e, t.props.icon = null, t.props.image = null;
						}),
						onicon: (e) => Tn(`edit:${z(M).blockId}`, (t) => {
							t.props.icon = e, t.props.image = null;
						}),
						onimage: (e) => L("image", e)
					});
				}
				var o = I(a, 2), s = (e) => {
					var t = Ym();
					K(t), R((e) => {
						q(t, z(M).props.glyph ?? ""), J(t, "title", e);
					}, [() => Y("tip.icon.typeGlyph")]), B("change", t, (e) => L("glyph", e.target.value || "★")), H(e, t);
				}, c = (e) => {
					var t = Hm(), n = F(t, !0);
					R((e, r) => {
						J(t, "title", e), U(n, r);
					}, [() => Y("tip.icon.backToGlyph"), () => Y("ui.removeDrawnIcon")]), B("click", t, () => L("icon", null)), H(e, t);
				};
				W(o, (e) => {
					z(M).props.icon ? e(c, -1) : e(s);
				}), E(i), E(n);
				var l = I(n, 2), u = (e) => {
					var t = Xm(), n = N(t), r = I(n, 2), i = F(r, !0);
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
			}, x = (e) => {
				var t = Qm(), n = P(t), r = N(n), i = I(r);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.collection ?? ""), t = /* @__PURE__ */ k(() => [["", Y("common.choose")], ...z(jl).map((e) => [e, z(Ml)[e]?.name ?? e])]);
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
				var t = th(), n = P(t), r = N(n), i = I(r);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.collection ?? ""), t = /* @__PURE__ */ k(() => [["", Y("common.choose")], ...z(jl).filter((e) => z(Ml)[e]?.kind === "products").map((e) => [e, z(Ml)[e]?.name ?? e])]);
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
					var t = $m(), n = N(t), r = F(n, !0), i = I(n, 2), a = F(i, !0);
					E(t), R((e, t, o, s) => {
						J(n, "title", e), U(r, t), J(i, "title", o), U(a, s);
					}, [
						() => Y("tip.product.addProduct"),
						() => Y("ui.addProduct"),
						() => Y("tip.product.editCatalog"),
						() => Y("ui.editCatalog")
					]), B("click", n, () => mu(z(M).props.collection)), B("click", i, () => {
						j(Nl, z(M).props.collection, !0), j(Bt, "collections");
					}), H(e, t);
				}, s = (e) => {
					var t = eh(), n = F(t, !0);
					R((e, r) => {
						J(t, "title", e), U(n, r);
					}, [() => Y("tip.product.createCatalog"), () => Y("ui.createCatalog")]), B("click", t, uu), H(e, t);
				}, c = /* @__PURE__ */ k(() => !z(jl).some((e) => z(Ml)[e]?.kind === "products"));
				W(a, (e) => {
					z(M).props.collection && z(Ml)[z(M).props.collection]?.kind === "products" ? e(o) : z(c) && e(s, 1);
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
				var t = nh(), n = P(t), r = N(n), i = I(r);
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
				var t = rh(), n = P(t), r = N(n), i = I(r);
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
				var t = Ap(), n = P(t), r = N(n), i = I(r);
				E(n), Jr(I(n, 2), 17, () => z(M).props.images ?? [], Wr, (e, t, n) => {
					var r = ih(), i = N(r), a = N(i), o = I(a, 2), s = N(o);
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
					]), B("click", s, () => fy(n, -1)), B("click", c, () => fy(n, 1)), B("click", l, () => py(n)), B("change", f, (e) => my(n, "alt", e.target.value)), B("change", h, (e) => my(n, "href", e.target.value || null)), H(e, r);
				}), R((e, t) => {
					J(n, "title", e), U(r, `${t ?? ""} `);
				}, [() => Y("tip.gallery.addImages"), () => Y("ui.addImages")]), B("change", i, uy), H(e, t);
			}, ie = (e) => {
				var t = Qp(), n = N(t);
				X(I(n), {
					get value() {
						return z(M).props.kind;
					},
					get options() {
						return Ir;
					},
					onchange: (e) => L("kind", e)
				}), E(t), R((e) => U(n, `${e ?? ""} `), [() => Y("blocks.shape")]), H(e, t);
			}, ae = (e) => {
				let t = /* @__PURE__ */ k(() => ty[z(M).type] ?? z(ey).find((e) => e.type === z(M).type)?.fields ?? []);
				var n = Nr(), r = P(n), i = (e) => {
					var n = Nr();
					Jr(P(n), 17, () => z(t), (e) => e.key, (e, t) => {
						var n = Nr(), r = P(n), i = (e) => {
							let n = /* @__PURE__ */ k(() => `${z(M).blockId}:${z(t).key}`);
							var r = ah(), i = P(r), a = N(i), o = I(a);
							K(o), E(i);
							var s = I(i, 2), c = F(s, !0), l = I(s, 2), u = (e) => {
								var t = jp();
								let r;
								var i = F(t, !0);
								R(() => {
									r = gi(t, 1, "panel-hint svelte-1n46o8q", null, r, { "place-error": Un[z(n)].err }), U(i, Un[z(n)].text);
								}), H(e, t);
							};
							W(l, (e) => {
								Un[z(n)] && e(u);
							}), R((e) => {
								U(a, `${z(t).label ?? ""} `), J(o, "placeholder", z(t).placeholder), q(o, Hn[z(n)] ?? z(M).props[z(t).key] ?? ""), s.disabled = z(Wn), U(c, e);
							}, [() => Y("props.place.search")]), B("input", o, (e) => {
								Hn[z(n)] = e.target.value;
							}), B("keydown", o, (e) => {
								e.key === "Enter" && qn(z(t));
							}), B("click", s, () => qn(z(t))), H(e, r);
						}, a = (e) => {
							var n = oh(), r = N(n), i = I(r);
							K(i), E(n), R(() => {
								U(r, `${z(t).label ?? ""} `), J(i, "min", z(t).min), J(i, "max", z(t).max), J(i, "step", z(t).step ?? 1), q(i, z(M).props[z(t).key]);
							}), B("change", i, (e) => L(z(t).key, Kn(z(t), Number(e.target.value)))), H(e, n);
						}, o = (e) => {
							var n = Cm(), r = N(n);
							K(r);
							var i = I(r);
							E(n), R((e) => {
								Ci(r, e), U(i, ` ${z(t).label ?? ""}`);
							}, [() => !!z(M).props[z(t).key]]), B("change", r, (e) => L(z(t).key, e.target.checked)), H(e, n);
						}, s = (e) => {
							var n = Qp(), r = N(n), i = I(r);
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
							var n = sh(), r = N(n), i = I(r);
							K(i), E(n), R(() => {
								U(r, `${z(t).label ?? ""} `), J(i, "placeholder", z(t).placeholder), q(i, z(M).props[z(t).key] ?? "");
							}), B("change", i, (e) => L(z(t).key, e.target.value)), H(e, n);
						};
						W(r, (e) => {
							z(t).type === "place" ? e(i) : z(t).type === "number" ? e(a, 1) : z(t).type === "toggle" ? e(o, 2) : z(t).type === "select" ? e(s, 3) : e(c, -1);
						}), H(e, n);
					}), H(e, n);
				}, a = (e) => {
					var t = Hm(), n = F(t, !0);
					R((e, r) => {
						J(t, "title", e), U(n, r);
					}, [() => Y("hint.pluginBlock"), () => Y("ui.settings")]), B("click", t, () => rt?.sendOpenConfig(z(M).blockId)), H(e, t);
				};
				W(r, (e) => {
					z(t).length ? e(i) : e(a, -1);
				}), H(e, n);
			};
			W(n, (e) => {
				z(M).type === "text" ? e(r) : z(M).type === "form" ? e(i, 1) : z(M).type === "calendar" ? e(a, 2) : z(M).type === "faq" ? e(o, 3) : z(M).type === "timeline" ? e(s, 4) : z(M).type === "quote" ? e(c, 5) : z(M).type === "stats" ? e(l, 6) : z(M).type === "ribbon" ? e(u, 7) : z(M).type === "table" ? e(d, 8) : z(M).type === "share" ? e(f, 9) : z(M).type === "countdown" ? e(p, 10) : z(M).type === "audio" ? e(m, 11) : z(M).type === "button" ? e(g, 12) : z(M).type === "image" ? e(_, 13) : z(M).type === "video" ? e(v, 14) : z(M).type === "icon" ? e(b, 15) : z(M).type === "collection" ? e(x, 16) : z(M).type === "product" ? e(ee, 17) : z(M).type === "cart" ? e(te, 18) : z(M).type === "checkout" ? e(ne, 19) : z(M).type === "gallery" ? e(re, 20) : z(M).type === "shape" ? e(ie, 21) : e(ae, -1);
			}), H(e, t);
		}, r = (e) => {
			var t = Nr(), n = P(t), r = (e) => {
				var t = ch(), n = P(t), r = N(n), i = I(r);
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
				let t = /* @__PURE__ */ k(() => tp(z(M).props.design));
				var n = hh(), r = P(n), i = N(r), a = F(i, !0), o = F(I(i), !0);
				E(r);
				var s = I(r, 2), c = N(s), l = F(c, !0), u = I(c, 2);
				K(u);
				var d = F(I(u, 2));
				E(s);
				var f = I(s, 2), p = (e) => {
					let t = /* @__PURE__ */ k(() => Qf(z(M).props));
					var n = dh(), r = P(n), i = F(r, !0);
					Jr(I(r, 2), 17, () => Zf(z(M).props.design), (e) => e.key, (e, n) => {
						var r = Nr(), i = P(r), a = (e) => {
							var r = Cm(), i = N(r);
							K(i);
							var a = I(i);
							E(r), R((e) => {
								Ci(i, z(t)[z(n).key]), U(a, ` ${e ?? ""}`);
							}, [() => Y(z(n).labelKey)]), B("change", i, (e) => jn(z(n), e.target.checked)), H(e, r);
						}, o = (e) => {
							var r = lh(), i = N(r), a = I(i);
							K(a), E(r), R((e, o, s) => {
								J(r, "title", e), U(i, `${o ?? ""} `), q(a, z(t)[z(n).key] ?? ""), J(a, "placeholder", s);
							}, [
								() => Y("tip.calendar.opt.hours"),
								() => Y(z(n).labelKey),
								() => Y("calendar.opt.columns.auto")
							]), B("change", a, (e) => jn(z(n), e.target.value === "" ? null : Math.max(0, Math.min(24, Math.round(Number(e.target.value)) || 0)))), H(e, r);
						}, s = (e) => {
							var r = uh(), i = N(r), a = F(i, !0), o = I(i, 2);
							{
								let e = /* @__PURE__ */ k(() => z(n).values.map((e) => [e, Mn(z(n), e)]));
								X(o, {
									get value() {
										return z(t)[z(n).key];
									},
									get options() {
										return z(e);
									},
									onchange: (e) => jn(z(n), e)
								});
							}
							E(r), R((e) => U(a, e), [() => Y(z(n).labelKey)]), H(e, r);
						}, c = (e) => {
							{
								let r = /* @__PURE__ */ k(() => Y(z(n).labelKey)), i = /* @__PURE__ */ k(() => z(n).values.map((e) => [e, Mn(z(n), e)]));
								As(e, {
									get label() {
										return z(r);
									},
									get value() {
										return z(t)[z(n).key];
									},
									get options() {
										return z(i);
									},
									onchange: (e) => jn(z(n), e)
								});
							}
						};
						W(i, (e) => {
							z(n).kind === "switch" ? e(a) : z(n).kind === "hour" ? e(o, 1) : z(n).values.length > 4 ? e(s, 2) : e(c, -1);
						}), H(e, r);
					}), R((e) => U(i, e), [() => Y("calendar.section.options")]), H(e, n);
				}, m = /* @__PURE__ */ k(() => Zf(z(M).props.design).length);
				W(f, (e) => {
					z(m) && e(p);
				});
				var h = I(f, 2), g = F(h, !0), _ = I(h, 2);
				Jr(_, 19, () => Nn(z(t)), (e) => e.section, (e, t, n) => {
					var r = mh(), i = P(r), a = (e) => {
						var n = fh(), r = F(n, !0);
						R((e) => U(r, e), [() => Y(`calendar.section.${z(t).section}`)]), H(e, n);
					};
					W(i, (e) => {
						z(n) > 0 && e(a);
					});
					var o = I(i, 2);
					Jr(o, 21, () => z(t).slots, (e) => e.key, (e, t) => {
						var n = ph(), r = N(n);
						{
							let e = /* @__PURE__ */ k(() => z(M).props.colors?.[z(t).key] ?? ""), n = /* @__PURE__ */ k(la), i = /* @__PURE__ */ k(() => Y(z(t).labelKey));
							wa(r, {
								get value() {
									return z(e);
								},
								get tokens() {
									return z(n);
								},
								allowClear: !0,
								get label() {
									return z(i);
								},
								onchange: (e) => In(z(t).key, e || "")
							});
						}
						var i = F(I(r, 2), !0);
						E(n), R((e, t) => {
							J(n, "title", e), U(i, t);
						}, [() => Y("tip.calendar.slot"), () => Y(z(t).labelKey)]), H(e, n);
					}), E(o), H(e, r);
				});
				var v = I(_, 2), y = N(v);
				K(y);
				var b = I(y);
				E(v);
				var x = I(v, 2), S = (e) => {
					var t = uh(), n = N(t), r = F(n, !0), i = I(n, 2);
					{
						let e = /* @__PURE__ */ k(() => z(M).props.stripe?.color ?? ""), t = /* @__PURE__ */ k(la), n = /* @__PURE__ */ k(() => Y("calendar.stripeColor"));
						wa(i, {
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
							onchange: (e) => Ln({ color: e || void 0 })
						});
					}
					E(t), R((e, n) => {
						J(t, "title", e), U(r, n);
					}, [() => Y("tip.calendar.stripeColor"), () => Y("calendar.stripeColor")]), H(e, t);
				}, ee = /* @__PURE__ */ k(() => cp(z(t), z(M).props.stripe).show);
				W(x, (e) => {
					z(ee) && e(S);
				});
				var te = I(x, 2), ne = F(te, !0), re = I(te, 2);
				{
					let e = /* @__PURE__ */ k(() => Hf.map((e) => [e, Y(`calendar.field.${e}`)]));
					X(re, {
						get value() {
							return z(kn);
						},
						get options() {
							return z(e);
						},
						onchange: (e) => j(kn, e, !0)
					});
				}
				var C = I(re, 2), ie = N(C), ae = I(ie);
				{
					let e = /* @__PURE__ */ k(() => Pn().font ?? ""), t = /* @__PURE__ */ k(() => [["", Y("common.inherit")], ...zf.map(([e, t]) => [t, Y(e)])]);
					X(ae, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => Rn({ font: e || void 0 })
					});
				}
				E(C);
				var oe = I(C, 2), se = N(oe), ce = I(se);
				K(ce), E(oe);
				var le = I(oe, 2);
				{
					let e = /* @__PURE__ */ k(() => Y("calendar.fieldWeight")), t = /* @__PURE__ */ k(() => Pn().bold === !0 ? "bold" : Pn().bold === !1 ? "normal" : ""), n = /* @__PURE__ */ k(() => [
						["", Y("common.inherit")],
						["bold", Y("format.bold")],
						["normal", Y("calendar.fieldNormal")]
					]);
					As(le, {
						get label() {
							return z(e);
						},
						get value() {
							return z(t);
						},
						get options() {
							return z(n);
						},
						onchange: (e) => Rn({ bold: e === "bold" || e !== "normal" && void 0 })
					});
				}
				var w = I(le, 2), ue = N(w);
				let de;
				var fe = F(N(ue), !0);
				E(ue);
				var pe = I(ue, 2);
				let T;
				var me = F(N(pe), !0);
				E(pe);
				var he = I(pe, 2);
				{
					let e = /* @__PURE__ */ k(() => Pn().color ?? ""), t = /* @__PURE__ */ k(la), n = /* @__PURE__ */ k(() => Y("calendar.fieldColor"));
					wa(he, {
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
						onchange: (e) => Rn({ color: e || void 0 })
					});
				}
				E(w), Oe(2), R((e, t, n, i, c, f, p, m, _, x, S, ee, re, C, ae, le, w, he, ge, _e, ve, ye, be, xe, Se, Ce) => {
					J(r, "title", e), U(a, t), U(o, n), J(s, "title", i), U(l, c), J(u, "min", $f.min * 100), J(u, "max", $f.max * 100), q(u, f), J(u, "aria-label", p), U(d, `${m ?? ""} %`), J(h, "title", _), U(g, x), J(v, "title", S), Ci(y, ee), U(b, ` ${re ?? ""}`), J(te, "title", C), U(ne, ae), U(ie, `${le ?? ""} `), J(oe, "title", w), U(se, `${he ?? ""} `), J(ce, "min", lp.min), J(ce, "max", lp.max), q(ce, ge), J(ce, "placeholder", _e), de = gi(ue, 1, "tbtn svelte-1n46o8q", null, de, { active: ve }), J(ue, "title", ye), U(fe, be), T = gi(pe, 1, "tbtn svelte-1n46o8q", null, T, { active: xe }), J(pe, "title", Se), U(me, Ce);
				}, [
					() => Y("tip.calendar.design"),
					() => Y("calendar.design"),
					() => Y(z(t).labelKey),
					() => Y("tip.calendar.scale"),
					() => Y("calendar.scale"),
					() => Math.round(ep(z(M).props) * 100),
					() => Y("calendar.scale"),
					() => Math.round(ep(z(M).props) * 100),
					() => Y("tip.calendar.slot"),
					() => Y("calendar.colors"),
					() => Y("tip.calendar.stripe"),
					() => cp(z(t), z(M).props.stripe).show,
					() => Y("calendar.stripe"),
					() => Y("tip.calendar.fieldStyle"),
					() => Y("calendar.fieldStyle"),
					() => Y("calendar.fieldFont"),
					() => Y("tip.calendar.fieldSize"),
					() => Y("calendar.fieldSize"),
					() => Pn().size ?? "",
					() => Y("common.inherit"),
					() => Pn().italic === !0,
					() => Y("format.italic"),
					() => Y("format.italicLetter"),
					() => Pn().underline === !0,
					() => Y("calendar.fieldUnderline"),
					() => Y("format.underlineLetter")
				]), B("click", r, () => j(_n, z(M).blockId, !0)), B("change", u, (e) => L("scale", e.target.valueAsNumber === 100 ? void 0 : e.target.valueAsNumber / 100)), B("change", y, (e) => Ln({ show: e.target.checked })), B("change", ce, (e) => Rn({ size: e.target.value === "" ? void 0 : Math.max(lp.min, Math.min(lp.max, Number(e.target.value) || lp.min)) })), B("click", ue, () => Rn({ italic: !Pn().italic || void 0 })), B("click", pe, () => Rn({ underline: !Pn().underline || void 0 })), H(e, n);
			}, a = (e) => {
				var t = gh(), n = P(t);
				{
					let e = /* @__PURE__ */ k(() => Y("lbl.variant")), t = /* @__PURE__ */ k(() => z(M).props.variant === "list" ? "list" : "cards"), r = /* @__PURE__ */ k(() => hl.map((e) => [e, Y(`opt.faqVariant.${e}`)]));
					As(n, {
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
					var t = dh(), n = P(t), r = F(n, !0), i = I(n, 2);
					s(i), R((e) => U(r, e), [() => Y("lbl.cardStyle")]), H(e, t);
				};
				W(r, (e) => {
					z(M).props.variant !== "list" && e(i);
				}), Oe(2), H(e, t);
			}, o = (e) => {
				var t = _h(), n = P(t), r = N(n), i = I(r);
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
					let e = /* @__PURE__ */ k(() => z(M).props.accent ?? "accent"), t = /* @__PURE__ */ k(la);
					wa(u, {
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
				var t = yh(), n = P(t), r = N(n), i = I(r);
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
					var t = vh(), n = P(t), r = N(n), i = I(r);
					E(n);
					var a = I(n, 2), o = (e) => {
						var t = Hm(), n = F(t, !0);
						R((e) => U(n, e), [() => Y("ui.quotePortraitRemove")]), B("click", t, () => L("image", "")), H(e, t);
					};
					W(a, (e) => {
						z(M).props.image && e(o);
					}), R((e) => U(r, `${e ?? ""} `), [() => Y("ui.quotePortrait")]), B("change", i, Pr), H(e, t);
				}, s = (e) => {
					var t = Cm(), n = N(t);
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
					let e = /* @__PURE__ */ k(() => z(M).props.accent ?? "accent"), t = /* @__PURE__ */ k(la);
					wa(u, {
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
				var t = bh(), n = P(t);
				{
					let e = /* @__PURE__ */ k(() => Y("lbl.variant")), t = /* @__PURE__ */ k(() => ml.includes(z(M).props.variant) ? z(M).props.variant : "plain"), r = /* @__PURE__ */ k(() => ml.map((e) => [e, Y(`opt.statVariant.${e}`)]));
					As(n, {
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
				var n = Eh(), r = P(n), i = N(r), a = F(i, !0), o = I(i, 2);
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
					var n = Ch(), r = P(n), i = F(r, !0), a = I(r, 2);
					{
						let e = /* @__PURE__ */ k(() => Y("lbl.ribbonDirection")), t = /* @__PURE__ */ k(() => z(M).props.direction ?? "left"), n = /* @__PURE__ */ k(() => [["left", Y("opt.ribbonDir.left")], ["right", Y("opt.ribbonDir.right")]]);
						As(a, {
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
						var t = xh(), n = N(t), r = F(n, !0), i = I(n, 2);
						K(i);
						var a = F(I(i, 2));
						E(t), R((e, n) => {
							J(t, "title", e), U(r, n), q(i, z(M).props.dwell ?? 2.5), U(a, `${z(M).props.dwell ?? 2.5 ?? ""} s`);
						}, [() => Y("tip.ribbon.dwell"), () => Y("lbl.ribbonDwell")]), B("input", i, (e) => L("dwell", e.target.valueAsNumber)), H(e, t);
					}, c = (e) => {
						var t = Sh(), n = N(t), r = F(n, !0), i = I(n, 2);
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
					]), B("click", r, () => rt?.sendDemoMotion()), B("change", u, (e) => L("pauseOnHover", e.target.checked)), B("change", p, (e) => L("fade", e.target.checked)), H(e, n);
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
							return z(x);
						},
						onchange: (e) => L("above", e)
					});
				}
				E(f);
				var g = I(f, 2), _ = (e) => {
					var t = Qp(), n = N(t), r = I(n);
					{
						let e = /* @__PURE__ */ k(() => z(M).props.aboveColor ?? dl(z(M).props)), t = /* @__PURE__ */ k(la), n = /* @__PURE__ */ k(() => Y("tip.ribbon.stripeColor"));
						wa(r, {
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
				var v = I(g, 2), y = N(v), S = F(y, !0), ee = I(y, 2);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.main ?? "text");
					X(ee, {
						filled: !0,
						get value() {
							return z(e);
						},
						get options() {
							return z(b);
						},
						onchange: (e) => L("main", e)
					});
				}
				E(v);
				var te = I(v, 2), ne = N(te), re = F(ne, !0), C = I(ne, 2);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.below ?? "none");
					X(C, {
						filled: !0,
						get value() {
							return z(e);
						},
						get options() {
							return z(x);
						},
						onchange: (e) => L("below", e)
					});
				}
				E(te);
				var ie = I(te, 2), ae = (e) => {
					var t = Qp(), n = N(t), r = I(n);
					{
						let e = /* @__PURE__ */ k(() => z(M).props.belowColor ?? dl(z(M).props)), t = /* @__PURE__ */ k(la), n = /* @__PURE__ */ k(() => Y("tip.ribbon.stripeColor"));
						wa(r, {
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
					var t = wh(), n = P(t);
					{
						let e = /* @__PURE__ */ k(() => Y("lbl.ribbonStripePlace")), t = /* @__PURE__ */ k(() => Y("tip.ribbon.stripePlace")), r = /* @__PURE__ */ k(() => z(M).props.stripePlace ?? "stack"), i = /* @__PURE__ */ k(() => [["stack", Y("opt.ribbonPlace.stack")], ["edge", Y("opt.ribbonPlace.edge")]]);
						As(n, {
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
				var ce = I(l, 2), le = N(ce), w = F(le, !0), ue = I(le, 2);
				{
					let e = /* @__PURE__ */ k(() => Y("lbl.ribbonWidth")), t = /* @__PURE__ */ k(() => z(M).props.width ?? "content"), n = /* @__PURE__ */ k(() => [["content", Y("opt.ribbonWidth.content")], ["page", Y("opt.ribbonWidth.page")]]);
					As(ue, {
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
					As(de, {
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
				var fe = I(de, 2), pe = N(fe), T = F(pe, !0), me = I(pe, 2);
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
					var t = Th(), n = N(t);
					{
						let e = /* @__PURE__ */ k(() => z(M).props.bg ?? "accent"), t = /* @__PURE__ */ k(la), r = /* @__PURE__ */ k(() => Y("tip.ribbon.bg"));
						wa(n, {
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
					let e = /* @__PURE__ */ k(() => z(M).props.color ?? ((z(M).props.variant ?? "band") === "plain" ? "text" : "accent-text")), t = /* @__PURE__ */ k(la), n = /* @__PURE__ */ k(() => Y("tip.ribbon.color"));
					wa(Ge, {
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
				E(We), E(Ve), E(Re), Oe(2), R((e, t, n, r, i, o, s, c, l, u, p, h, g, _, y, b, x, ee, ne, C, ie, ae, oe, se) => {
					U(a, e), U(d, t), J(f, "title", n), U(m, r), J(v, "title", i), U(S, o), J(te, "title", s), U(re, c), U(w, l), J(fe, "title", u), U(T, p), q(me, z(M).props.tilt ?? 0), U(he, `${z(M).props.tilt ?? 0 ?? ""}°`), U(ve, h), U(xe, g), J(Ce, "title", _), Ci(we, z(M).props.caps === !0), U(Te, ` ${y ?? ""}`), J(Ee, "title", b), Ci(De, z(M).props.weight === "bold"), U(ke, ` ${x ?? ""}`), J(Ae, "title", ee), Ci(je, z(M).props.outline === !0), U(Me, ` ${ne ?? ""}`), J(Ne, "title", C), U(Fe, ie), q(Ie, z(M).props.gap ?? 40), U(Le, `${z(M).props.gap ?? 40 ?? ""} px`), U(Be, ae), J(We, "title", oe), U(Ke, se);
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
				var t = Dh(), n = P(t), r = N(n), i = I(r);
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
				var t = Oh(), n = P(t), r = N(n), i = I(r);
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
					let e = /* @__PURE__ */ k(() => z(M).props.color || "accent"), t = /* @__PURE__ */ k(la);
					wa(u, {
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
				var t = Dh(), n = P(t), r = N(n), i = I(r);
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
				var t = kh(), n = P(t), r = N(n), i = I(r);
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
				var t = Ah(), n = P(t), r = N(n), i = I(r);
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
				var te = I(ee, 2), ne = N(te), re = F(I(ne));
				E(te);
				var C = I(te, 2);
				K(C);
				var ie = I(C, 2), ae = N(ie), oe = F(I(ae));
				E(ie);
				var se = I(ie, 2);
				K(se);
				var ce = I(se, 2), le = F(ce, !0);
				Oe(2), R((e, t, n, i, a, s, c, f, b, te, ie, w, ue, de, fe, pe, T) => {
					U(r, `${e ?? ""} `), U(o, `${t ?? ""} `), U(l, `${n ?? ""} `), U(u, `${i ?? ""}%`), q(d, z(M).props.x ?? .5), U(p, `${a ?? ""} `), U(m, `${s ?? ""}%`), q(h, z(M).props.y ?? .5), J(g, "title", c), U(_, `${f ?? ""} `), U(v, `${b ?? ""}x`), q(y, z(M).props.zoom ?? 1), U(x, `${te ?? ""} `), U(S, `${ie ?? ""}%`), q(ee, z(M).props.brightness ?? 1), U(ne, `${w ?? ""} `), U(re, `${ue ?? ""}%`), q(C, z(M).props.contrast ?? 1), U(ae, `${de ?? ""} `), U(oe, `${fe ?? ""}%`), q(se, z(M).props.saturate ?? 1), J(ce, "title", pe), U(le, T);
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
				]), B("input", d, (e) => L("x", Number(e.target.value))), B("input", h, (e) => L("y", Number(e.target.value))), B("input", y, (e) => L("zoom", Number(e.target.value))), B("input", ee, (e) => L("brightness", Number(e.target.value))), B("input", C, (e) => L("contrast", Number(e.target.value))), B("input", se, (e) => L("saturate", Number(e.target.value))), B("click", ce, () => Tn(`edit:${z(M).blockId}`, (e) => {
					e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
				})), H(e, t);
			}, g = (e) => {
				var t = jh(), n = P(t), r = N(n), i = I(r);
				K(i), E(n);
				var a = I(n, 2), o = N(a), s = I(o);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.color ?? "accent"), t = /* @__PURE__ */ k(la);
					wa(s, {
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
				var t = kh(), n = P(t), r = N(n), i = I(r);
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
				var t = Mh(), n = P(t), r = N(n), i = I(r);
				K(i), E(n), Oe(2), R((e, t) => {
					J(n, "title", e), U(r, `${t ?? ""} `), q(i, z(M).props.columns ?? 0);
				}, [() => Y("tip.product.columns"), () => Y("lbl.columns")]), B("change", i, (e) => L("columns", Number(e.target.value))), H(e, t);
			}, y = (e) => {
				var t = kh(), n = P(t), r = N(n), i = I(r);
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
				let t = /* @__PURE__ */ k(() => Nd(z(M).props.view));
				var n = Rh(), r = P(n), i = N(r), a = I(i);
				{
					let e = /* @__PURE__ */ k(() => kd.map((e) => [e, Y(`opt.galleryView.${e}`)]));
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
					var t = Nh(), n = P(t), r = N(n), i = I(r);
					K(i), E(n);
					var a = I(n, 2), o = N(a), s = F(I(o));
					E(a);
					var c = I(a, 2);
					K(c), R((e, t) => {
						U(r, `${e ?? ""} `), q(i, z(M).props.columns ?? 3), U(o, `${t ?? ""} `), U(s, `${z(M).props.gap ?? 12 ?? ""} px`), q(c, z(M).props.gap ?? 12);
					}, [() => Y("lbl.columns"), () => Y("lbl.imageGap")]), B("change", i, (e) => L("columns", Number(e.target.value))), B("input", c, (e) => L("gap", Number(e.target.value))), H(e, t);
				}, c = /* @__PURE__ */ k(() => Ad.includes(z(t)));
				W(o, (e) => {
					z(c) && e(s);
				});
				var l = I(o, 2), u = (e) => {
					var t = Ph(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2);
					K(a);
					var o = F(I(a, 2));
					E(n);
					var s = I(n, 2), c = N(s);
					G(c, () => C.shuffle);
					var l = I(c);
					E(s), R((e, t, r, c) => {
						J(n, "title", e), U(i, t), J(a, "min", jd.min), J(a, "max", jd.max), q(a, z(M).props.rowHeight ?? jd.dflt), U(o, `${z(M).props.rowHeight ?? jd.dflt ?? ""} px`), J(s, "title", r), U(l, ` ${c ?? ""}`);
					}, [
						() => Y("tip.gallery.rowHeight"),
						() => Y("lbl.galleryRowHeight"),
						() => Y("tip.gallery.shuffleMosaic"),
						() => Y("ui.shufflePhotos")
					]), B("input", a, (e) => L("rowHeight", e.target.valueAsNumber)), B("click", s, () => L("seed", Wi())), H(e, t);
				};
				W(l, (e) => {
					z(t) === "mosaic" && e(u);
				});
				var d = I(l, 2), f = (e) => {
					var t = Fh(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2);
					K(a);
					var o = F(I(a, 2));
					E(n);
					var s = I(n, 2), c = (e) => {
						var t = Yp(), n = N(t);
						G(n, () => C.shuffle);
						var r = I(n);
						E(t), R((e, n) => {
							J(t, "title", e), U(r, ` ${n ?? ""}`);
						}, [() => Y("tip.gallery.shuffleTilt"), () => Y("ui.shufflePhotos")]), B("click", t, () => L("seed", Wi())), H(e, t);
					};
					W(s, (e) => {
						(z(M).props.tilt ?? Md.dflt) > 0 && e(c);
					});
					var l = I(s, 2), u = N(l), d = I(u);
					{
						let e = /* @__PURE__ */ k(() => z(M).props.frameColor || "#ffffff"), t = /* @__PURE__ */ k(la), n = /* @__PURE__ */ k(() => Y("tip.gallery.frameColor"));
						wa(d, {
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
						J(n, "title", e), U(i, t), J(a, "min", Md.min), J(a, "max", Md.max), q(a, z(M).props.tilt ?? Md.dflt), U(o, `${z(M).props.tilt ?? Md.dflt ?? ""}°`), J(l, "title", r), U(u, `${s ?? ""} `), J(f, "title", c), Ci(p, z(M).props.captions === !0), U(m, ` ${d ?? ""}`);
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
					var t = Ih(), n = P(t);
					{
						let e = /* @__PURE__ */ k(() => Y("lbl.ribbonRows")), t = /* @__PURE__ */ k(() => String(z(M).props.rows ?? 1)), r = /* @__PURE__ */ k(() => [["1", Y("opt.ribbonRows.one")], ["2", Y("opt.ribbonRows.two")]]);
						As(n, {
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
						As(r, {
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
					var t = Lh(), n = N(t), r = I(n);
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
				var t = Bh(), n = P(t), r = N(n);
				X(I(r), {
					get value() {
						return z(M).props.color;
					},
					get options() {
						return Lr;
					},
					onchange: (e) => L("color", e)
				}), E(n);
				var i = I(n, 2), a = N(i), o = I(a);
				K(o), E(i);
				var s = I(i, 2), c = (e) => {
					var t = zh(), n = N(t), r = I(n);
					K(r), E(t), R((e, t) => {
						U(n, `${e ?? ""} `), J(r, "max", t), q(r, z(M).frame.w);
					}, [() => Y("lbl.length"), () => Math.max(1, Math.round(100 - z(M).frame.x))]), B("change", r, (e) => Jn("w", Math.max(1, Math.min(Number(e.target.value), 100 - z(M).frame.x)))), H(e, t);
				};
				W(s, (e) => {
					(z(M).props.kind === "line" || z(M).props.kind === "arrow") && e(c);
				});
				var l = I(s, 2), u = (e) => {
					var t = mm(), n = N(t), r = I(n);
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
				z(M).type === "text" ? e(r) : z(M).type === "calendar" ? e(i, 1) : z(M).type === "faq" ? e(a, 2) : z(M).type === "timeline" ? e(o, 3) : z(M).type === "quote" ? e(c, 4) : z(M).type === "stats" ? e(l, 5) : z(M).type === "ribbon" ? e(u, 6) : z(M).type === "table" ? e(d, 7) : z(M).type === "share" ? e(f, 8) : z(M).type === "countdown" ? e(p, 9) : z(M).type === "button" ? e(m, 10) : z(M).type === "image" ? e(h, 11) : z(M).type === "icon" ? e(g, 12) : z(M).type === "collection" ? e(_, 13) : z(M).type === "product" ? e(v, 14) : z(M).type === "cart" ? e(y, 15) : z(M).type === "gallery" ? e(S, 16) : z(M).type === "shape" && e(ee, 17);
			}), H(e, t);
		}, i = (e) => {
			var t = Np(), n = P(t), r = N(n), i = I(r);
			{
				let e = /* @__PURE__ */ k(() => z(M).fit === "shrink" ? "shrink" : "wrap"), t = /* @__PURE__ */ k(() => zn.has(z(M).type) ? [["wrap", Y("opt.fit.fluid")], ["shrink", Y("opt.fit.floor")]] : [["wrap", Y("opt.fit.wrap")], ["shrink", Y("opt.fit.shrink")]]);
				X(i, {
					get value() {
						return z(e);
					},
					get options() {
						return z(t);
					},
					onchange: (e) => Bn(e)
				});
			}
			E(n);
			var a = I(n, 2), o = (e) => {
				var t = Vh(), n = N(t), r = F(n, !0), i = I(n, 2);
				K(i);
				var a = F(I(i, 2));
				E(t), R((e, n, o, s) => {
					J(t, "title", e), U(r, n), q(i, o), U(a, `${s ?? ""} %`);
				}, [
					() => Y("tip.fitMin"),
					() => Y("lbl.fitMin"),
					() => Math.round((z(M).fitMin ?? .6) * 100),
					() => Math.round((z(M).fitMin ?? .6) * 100)
				]), B("input", i, (e) => Vn(e.target.valueAsNumber / 100)), H(e, t);
			};
			W(a, (e) => {
				z(M).fit === "shrink" && e(o);
			}), R((e, t) => {
				J(n, "title", e), U(r, `${t ?? ""} `);
			}, [() => Y("tip.fit"), () => Y("lbl.fit")]), H(e, t);
		}, a = (e) => {
			var t = Uh(), n = P(t), r = N(n), i = I(r);
			{
				let e = /* @__PURE__ */ k(() => _a(z(M).animation) ? z(M).animation.type : "");
				X(i, {
					get value() {
						return z(e);
					},
					get options() {
						return ya;
					},
					onchange: (e) => Sa(e || null)
				});
			}
			E(n);
			var a = I(n, 2), o = (e) => {
				var t = Hh(), n = P(t), r = N(n), i = I(r);
				K(i), E(n);
				var a = I(n, 2), o = N(a), s = I(o);
				K(s), E(a), R((e, t) => {
					U(r, `${e ?? ""} `), q(i, z(M).animation.props.duration), U(o, `${t ?? ""} `), q(s, z(M).animation.props.delay);
				}, [() => Y("lbl.durationMs"), () => Y("lbl.delayMs")]), B("change", i, (e) => Ta("duration", Number(e.target.value))), B("change", s, (e) => Ta("delay", Number(e.target.value))), H(e, t);
			}, s = /* @__PURE__ */ k(() => _a(z(M).animation));
			W(a, (e) => {
				z(s) && e(o);
			});
			var c = I(a, 2), l = N(c), u = I(l);
			{
				let e = /* @__PURE__ */ k(() => z(M).hover?.type ?? (z(M).animation && !_a(z(M).animation) ? z(M).animation.type : ""));
				X(u, {
					get value() {
						return z(e);
					},
					get options() {
						return ba;
					},
					onchange: (e) => Ca(e || null)
				});
			}
			E(c), R((e, t, i, a) => {
				J(n, "title", e), U(r, `${t ?? ""} `), J(c, "title", i), U(l, `${a ?? ""} `);
			}, [
				() => Y("tip.props.blockAnim"),
				() => Y("lbl.animIn"),
				() => Y("tip.props.blockHover"),
				() => Y("lbl.onHover")
			]), H(e, t);
		}, o = (e) => {
			var t = Nr(), n = P(t), r = (e) => {
				var t = Om(), n = P(t), r = N(n);
				K(r);
				var i = I(r);
				E(n);
				var a = I(n, 2), o = (e) => {
					var t = Gh(), n = P(t), r = N(n), i = I(r);
					{
						let e = /* @__PURE__ */ k(() => z(M).sticky.mode ?? "scroll"), t = /* @__PURE__ */ k(() => [["scroll", Y("opt.sticky.modeScroll")], ["screen", Y("opt.sticky.modeScreen")]]);
						X(i, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => Tn(`edit:${z(M).blockId}`, (t) => {
								t.sticky = {
									...t.sticky,
									mode: e
								};
							})
						});
					}
					E(n);
					var a = I(n, 2), o = (e) => {
						var t = Wh(), n = N(t), r = I(n);
						K(r), E(t), R((e, i) => {
							J(t, "title", e), U(n, `${i ?? ""} `), q(r, z(M).sticky.offset ?? 16);
						}, [() => z(M).sticky.mode === "screen" ? Y("tip.stickyEdge") : Y("tip.stickyOffset"), () => z(M).sticky.mode === "screen" ? Y("lbl.stickyEdge") : Y("lbl.stickyOffset")]), B("change", r, (e) => Tn(`edit:${z(M).blockId}`, (t) => {
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
						var t = Qp(), n = N(t), r = I(n);
						{
							let e = /* @__PURE__ */ k(() => z(M).sticky.dock ?? "bottom-right"), t = /* @__PURE__ */ k(() => Sn.map(([e, t]) => [e, Y(t)]));
							X(r, {
								get value() {
									return z(e);
								},
								get options() {
									return z(t);
								},
								onchange: (e) => Tn(`edit:${z(M).blockId}`, (t) => {
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
						var t = Qp(), n = N(t), r = I(n);
						{
							let e = /* @__PURE__ */ k(() => z(M).sticky.until ?? ""), t = /* @__PURE__ */ k(Cn);
							X(r, {
								get value() {
									return z(e);
								},
								get options() {
									return z(t);
								},
								onchange: (e) => Tn(`edit:${z(M).blockId}`, (t) => {
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
				]), B("change", r, (e) => Tn(`edit:${z(M).blockId}`, (t) => {
					t.sticky = e.target.checked ? {
						offset: 16,
						until: null
					} : null;
				})), H(e, t);
			};
			W(n, (e) => {
				z(Me) === "desktop" && e(r);
			}), H(e, t);
		}, l = (e) => {
			var t = qh(), n = P(t), r = (e) => {
				var t = Kh(), n = N(t), r = N(n, !0), i = I(r);
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
				]), B("change", i, (e) => Jn("x", Number(e.target.value))), B("change", s, (e) => Jn("y", Number(e.target.value))), B("change", u, (e) => Jn("w", Number(e.target.value))), B("change", p, (e) => Jn("h", Number(e.target.value))), B("change", g, (e) => Jn("z", Number(e.target.value))), B("change", y, (e) => Jn("rot", Number(e.target.value))), H(e, t);
			};
			W(n, (e) => {
				z(Me) === "desktop" && e(r);
			});
			var i = I(n, 2), a = N(i);
			K(a);
			var o = I(a);
			E(i), R((e, t) => {
				J(i, "title", e), Ci(a, z(M).decor), U(o, ` ${t ?? ""}`);
			}, [() => Y("tip.decor"), () => Y("lbl.decor")]), B("change", a, (e) => Dr(e.target.checked)), H(e, t);
		}, u = (e) => {
			var t = Jh(), n = P(t);
			i(n);
			var r = I(n, 2), s = N(r);
			K(s);
			var u = I(s);
			E(r);
			var d = I(r, 2);
			o(d);
			var f = I(d, 2);
			{
				let e = /* @__PURE__ */ k(() => Y("group.motion")), t = /* @__PURE__ */ k(yn);
				c(f, () => "motion", () => z(e), () => z(t), () => a);
			}
			var p = I(f, 2);
			{
				let e = /* @__PURE__ */ k(() => Y("group.placement"));
				c(p, () => "frame", () => z(e), () => z(Me) === "desktop" ? `${z(M).frame.w} % × ${z(M).frame.h}` : "", () => l);
			}
			R((e, t) => {
				J(r, "title", e), Ci(s, z(M).hideMobile), U(u, ` ${t ?? ""}`);
			}, [() => Y("tip.hideMobile"), () => Y("lbl.hideMobile")]), B("change", s, (e) => jr(e.target.checked)), H(e, t);
		}, d = (e) => {
			let t = /* @__PURE__ */ k(() => tp(z(M).props.design));
			var n = Zh(), r = N(n), i = N(r), a = F(i, !0), o = F(I(i, 2));
			E(r), Jr(I(r, 2), 17, ip, (e) => e.view ?? "plain", (e, n) => {
				var r = Xh(), i = P(r), a = (e) => {
					var t = fh(), r = F(t, !0);
					R((e) => U(r, e), [() => Y(An[z(n).view])]), H(e, t);
				};
				W(i, (e) => {
					z(n).view && e(a);
				});
				var o = I(i, 2);
				Jr(o, 21, () => z(n).designs, (e) => e.id, (e, n) => {
					var r = Yh();
					let i;
					var a = N(r);
					G(a, () => Op(z(n).id), !0), E(a);
					var o = F(I(a, 2), !0);
					E(r), R((e, a) => {
						i = gi(r, 1, "footer-tp svelte-1n46o8q", null, i, { on: z(n).id === z(t).id }), J(r, "aria-pressed", z(n).id === z(t).id), J(r, "title", e), U(o, a);
					}, [() => Y(z(n).labelKey), () => Y(z(n).labelKey)]), B("click", r, () => Fn(z(n).id)), H(e, r);
				}), E(o), H(e, r);
			}), E(n), R((e, t, n) => {
				U(a, e), U(o, `${t ?? ""}: ${n ?? ""}`);
			}, [
				() => Y("menu.back"),
				() => Y("calendar.design"),
				() => Y(z(t).labelKey)
			]), B("click", i, () => j(_n, null)), H(e, n);
		};
		var p = Sm(), m = P(p), g = (e) => {
			d(e);
		}, _ = /* @__PURE__ */ k(() => vn()), v = (e) => {
			var t = rg();
			Jr(t, 21, gn, (e) => e.id, (e, t) => {
				var n = ng(), r = N(n), i = F(r, !0), a = I(r, 2), o = (e) => {
					var n = Qh(), r = F(n, !0);
					R(() => U(r, z(t).value)), B("click", n, function(...e) {
						z(t).run?.apply(this, e);
					}), H(e, n);
				}, s = (e) => {
					var n = $h();
					K(n), R(() => {
						J(n, "min", z(t).min), J(n, "max", z(t).max), q(n, z(t).value), J(n, "aria-label", z(t).label);
					}), B("change", n, (e) => z(t).set(e.target.value)), H(e, n);
				}, c = (e) => {
					var n = tg();
					Jr(n, 21, () => z(t).options, ([e, t]) => e, (e, n) => {
						var r = /* @__PURE__ */ k(() => h(z(n), 2));
						let i = () => z(r)[0], a = () => z(r)[1];
						var o = eg();
						let s;
						var c = F(o, !0);
						R(() => {
							J(o, "aria-pressed", z(t).value === i()), s = gi(o, 1, "svelte-1n46o8q", null, s, { on: z(t).value === i() }), U(c, a());
						}), B("click", o, () => z(t).set(i())), H(e, o);
					}), E(n), R(() => J(n, "aria-label", z(t).label)), H(e, n);
				};
				W(a, (e) => {
					z(t).kind === "open" ? e(o) : z(t).kind === "number" ? e(s, 1) : e(c, -1);
				}), E(n), R(() => U(i, z(t).label)), H(e, n);
			}), E(t), H(e, t);
		};
		W(m, (e) => {
			z(_) ? e(g) : e(v, -1);
		});
		var ee = I(m, 2), te = (e) => {
			var t = ig(), i = N(t), a = N(i), o = F(a, !0), s = I(a);
			n(s), E(i);
			var c = I(i, 2), l = N(c), d = F(l, !0), f = I(l);
			r(f), E(c);
			var p = I(c, 2), m = N(p), h = F(m, !0), g = I(m);
			u(g), E(p), E(t), R((e, t, n) => {
				U(o, e), U(d, t), U(h, n);
			}, [
				() => Y("props.tabContent"),
				() => Y("props.tabStyle"),
				() => Y("props.tabPlacement")
			]), H(e, t);
		}, ne = /* @__PURE__ */ k(() => !vn() && t()), re = (e) => {
			var t = ag(), i = P(t), a = N(i), o = N(a);
			let s;
			var c = F(o, !0), l = I(o, 2);
			let d;
			var f = F(l, !0), p = I(l, 2);
			let m;
			var h = F(p, !0);
			E(a), E(i);
			var g = I(i, 2), _ = (e) => {
				n(e);
			}, v = (e) => {
				r(e);
			}, y = (e) => {
				u(e);
			};
			W(g, (e) => {
				z(Gn) === "content" ? e(_) : z(Gn) === "style" ? e(v, 1) : e(y, -1);
			}), R((e, t, n) => {
				s = gi(o, 1, "svelte-1n46o8q", null, s, { on: z(Gn) === "content" }), U(c, e), d = gi(l, 1, "svelte-1n46o8q", null, d, { on: z(Gn) === "style" }), U(f, t), m = gi(p, 1, "svelte-1n46o8q", null, m, { on: z(Gn) === "placement" }), U(h, n);
			}, [
				() => Y("props.tabContent"),
				() => Y("props.tabStyle"),
				() => Y("props.tabPlacement")
			]), B("click", o, () => j(Gn, "content")), B("click", l, () => j(Gn, "style")), B("click", p, () => j(Gn, "placement")), H(e, t);
		}, ie = /* @__PURE__ */ k(() => !vn());
		W(ee, (e) => {
			z(ne) ? e(te) : z(ie) && e(re, 1);
		}), H(e, p);
	}, u = (e) => `<svg width="40" height="26" viewBox="0 0 40 26" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${e}</svg>`, d = {
		bar: u("<rect x=\"1\" y=\"1\" width=\"38\" height=\"7\" rx=\"1\"/><rect x=\"1\" y=\"11\" width=\"38\" height=\"14\" rx=\"1\" stroke-opacity=\"0.35\"/>"),
		floating: u("<rect x=\"5\" y=\"2\" width=\"30\" height=\"7\" rx=\"3.5\"/><rect x=\"1\" y=\"11\" width=\"38\" height=\"14\" rx=\"1\" stroke-opacity=\"0.35\"/>"),
		"floating-square": u("<rect x=\"5\" y=\"2\" width=\"30\" height=\"7\"/><rect x=\"1\" y=\"11\" width=\"38\" height=\"14\" rx=\"1\" stroke-opacity=\"0.35\"/>"),
		"floating-tab": u("<path d=\"M5 1h30v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z\"/><rect x=\"1\" y=\"11\" width=\"38\" height=\"14\" rx=\"1\" stroke-opacity=\"0.35\"/>"),
		"side-left": u("<rect x=\"1\" y=\"1\" width=\"9\" height=\"24\" rx=\"1\"/><rect x=\"13\" y=\"1\" width=\"26\" height=\"24\" rx=\"1\" stroke-opacity=\"0.35\"/>"),
		"side-right": u("<rect x=\"30\" y=\"1\" width=\"9\" height=\"24\" rx=\"1\"/><rect x=\"1\" y=\"1\" width=\"26\" height=\"24\" rx=\"1\" stroke-opacity=\"0.35\"/>")
	}, p = {
		"": u("<rect x=\"1\" y=\"4\" width=\"38\" height=\"18\" rx=\"1\" stroke-opacity=\"0.35\"/>"),
		bottom: u("<rect x=\"1\" y=\"4\" width=\"38\" height=\"18\" rx=\"1\" stroke-opacity=\"0.35\"/><path d=\"M1 22h38\" stroke-width=\"2.5\"/>"),
		top: u("<rect x=\"1\" y=\"4\" width=\"38\" height=\"18\" rx=\"1\" stroke-opacity=\"0.35\"/><path d=\"M1 4h38\" stroke-width=\"2.5\"/>"),
		both: u("<rect x=\"1\" y=\"4\" width=\"38\" height=\"18\" rx=\"1\" stroke-opacity=\"0.35\"/><path d=\"M1 4h38M1 22h38\" stroke-width=\"2.5\"/>"),
		all: u("<rect x=\"1\" y=\"4\" width=\"38\" height=\"18\" rx=\"1\" stroke-width=\"2.5\"/>")
	}, m = (e) => `<svg width="48" height="34" viewBox="0 0 48 34" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${e}</svg>`, g = {
		card: m("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><rect x=\"10\" y=\"6\" width=\"28\" height=\"24\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.18\"/><path d=\"M15 13h18M15 19h14M15 25h16\" stroke-opacity=\"0.8\"/>"),
		flat: m("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><rect x=\"1\" y=\"6\" width=\"46\" height=\"24\" fill=\"currentColor\" fill-opacity=\"0.12\" stroke=\"none\"/><path d=\"M15 13h18M15 19h14M15 25h16\" stroke-opacity=\"0.8\"/>"),
		pills: m("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><rect x=\"10\" y=\"7\" width=\"28\" height=\"6\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.35\" stroke=\"none\"/><rect x=\"10\" y=\"16\" width=\"28\" height=\"6\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.2\" stroke=\"none\"/><rect x=\"10\" y=\"25\" width=\"28\" height=\"6\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.2\" stroke=\"none\"/>"),
		lines: m("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><path d=\"M12 12h24M12 21h24M12 30h24\" stroke-opacity=\"0.8\"/>"),
		flyout: m("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><rect x=\"1\" y=\"6\" width=\"46\" height=\"24\" fill=\"currentColor\" fill-opacity=\"0.12\" stroke=\"none\"/><path d=\"M6 13h10M6 19h8M22 13h10M22 19h8M38 13h6M38 19h4\" stroke-opacity=\"0.8\"/>")
	}, _ = {
		grid: m("<rect x=\"1\" y=\"1\" width=\"46\" height=\"32\" rx=\"3\" stroke-opacity=\"0.35\"/><rect x=\"6\" y=\"6\" width=\"10\" height=\"10\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><rect x=\"19\" y=\"6\" width=\"10\" height=\"10\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><rect x=\"32\" y=\"6\" width=\"10\" height=\"10\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><path d=\"M7 20h8M20 20h8M33 20h8\" stroke-opacity=\"0.7\"/><path d=\"M6 26h10M19 26h10M32 26h10\" stroke-opacity=\"0.35\"/>"),
		list: m("<rect x=\"1\" y=\"1\" width=\"46\" height=\"32\" rx=\"3\" stroke-opacity=\"0.35\"/><rect x=\"6\" y=\"6\" width=\"7\" height=\"7\" rx=\"2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><rect x=\"6\" y=\"17\" width=\"7\" height=\"7\" rx=\"2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><path d=\"M17 9.5h24M17 20.5h18\" stroke-opacity=\"0.7\"/>"),
		cover: m("<rect x=\"1\" y=\"1\" width=\"46\" height=\"32\" rx=\"3\" stroke-opacity=\"0.35\"/><rect x=\"6\" y=\"6\" width=\"16\" height=\"12\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><rect x=\"26\" y=\"6\" width=\"16\" height=\"12\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><path d=\"M6 14h16M26 14h16\" stroke-opacity=\"0.55\" stroke-width=\"3\"/><path d=\"M6 23h12M26 23h12\" stroke-opacity=\"0.35\"/>")
	}, v = (e) => `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">${e}</svg>`, y = {
		dot: v("<circle cx=\"12\" cy=\"12\" r=\"3\"/>"),
		dash: v("<rect x=\"3\" y=\"10.6\" width=\"18\" height=\"2.8\" rx=\"1.4\"/>"),
		slash: v("<path d=\"M15.5 3.5L8.5 20.5\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\" fill=\"none\"/>"),
		star: v("<path d=\"M12 2.8l2.3 6.1 6.5.4-5 4.1 1.6 6.3-5.4-3.5-5.4 3.5 1.6-6.3-5-4.1 6.5-.4z\"/>"),
		none: v("<path d=\"M5 12h14\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\" opacity=\"0.35\"/><path d=\"M6 6l12 12\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>"),
		custom: v("<path d=\"M5 8h14M5 12h9M5 16h12\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>")
	}, b = /* @__PURE__ */ k(() => [
		["text", Y("opt.ribbonStripe.text")],
		["marks", Y("opt.ribbonStripe.marks")],
		["plain", Y("opt.ribbonStripe.plain")]
	]), x = /* @__PURE__ */ k(() => [["none", Y("common.none")], ...z(b)]), S = /* @__PURE__ */ k(() => [
		["dot", Y("opt.ribbonSep.dot")],
		["dash", Y("opt.ribbonSep.dash")],
		["slash", Y("opt.ribbonSep.slash")],
		["star", Y("opt.ribbonSep.star")],
		["none", Y("common.none")],
		["custom", Y("opt.ribbonSep.custom")]
	]), ee = /* @__PURE__ */ A("");
	function te() {
		z(ee).trim() && (j(Wo, z(ee), !0), j(ms, null), Ts() !== !1 && j(ee, ""));
	}
	let ne = [
		["color", yu],
		["gradient", ju],
		["glow", Mu],
		["image", Dd],
		["slideshow", mf],
		["video", Nf],
		["pattern", Gu],
		["grain", Pu]
	], re = Object.fromEntries(ne), C = {
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
	}, ie = [
		["purple", Y("adminTheme.purple")],
		["well", Y("adminTheme.well")],
		["gold", Y("adminTheme.gold")],
		["grey", Y("adminTheme.grey")],
		["aurora", Y("adminTheme.aurora")],
		["dusk", Y("adminTheme.dusk")],
		["ember", Y("adminTheme.ember")]
	], ae = {
		lilla: "purple",
		bronn: "well",
		gull: "gold",
		graa: "grey",
		nordlys: "aurora",
		skumring: "dusk",
		glo: "ember"
	}, oe = /* @__PURE__ */ A(en((() => {
		let e = localStorage.getItem("urd-admin-theme");
		return ae[e] ?? e ?? "grey";
	})()));
	xn(() => {
		document.documentElement.dataset.adminTheme = z(oe), localStorage.setItem("urd-admin-theme", z(oe)), se();
	});
	function se() {
		let e = getComputedStyle(document.documentElement), t = e.getPropertyValue("--urd-color-accent").trim();
		rt?.sendAdminTheme({
			bg: e.getPropertyValue("--urd-color-bg").trim(),
			surface: e.getPropertyValue("--urd-color-surface").trim(),
			accent: t,
			text: e.getPropertyValue("--urd-color-text").trim(),
			"accent-text": ce(t)
		});
	}
	function ce(e) {
		return _u(e) == null || (vu(e, "#ffffff") ?? 0) >= (vu(e, "#0b0e14") ?? 0) ? "#ffffff" : "#0b0e14";
	}
	let le = /* @__PURE__ */ A(null), w = /* @__PURE__ */ A(null), ue = /* @__PURE__ */ A(!1), de = /* @__PURE__ */ A(""), fe = /* @__PURE__ */ A("info"), pe = 0;
	function T(e, t = "info") {
		j(de, e, !0), j(fe, t, !0);
		let n = ++pe;
		t === "ok" && setTimeout(() => {
			pe === n && (j(de, ""), j(fe, "info"));
		}, 8e3);
	}
	function me() {
		T(Y("status.storageFull"), "error");
	}
	function he(e, t) {
		try {
			localStorage.setItem(e, t);
		} catch {
			me();
		}
	}
	let ge = /* @__PURE__ */ A(null), _e = /* @__PURE__ */ A(null), ve = /* @__PURE__ */ A(en({
		size: 16,
		snap: !0
	})), ye = /* @__PURE__ */ A(!0), be = /* @__PURE__ */ A(en(Go(typeof window < "u" ? window : null) ?? 1920)), xe = "urd-admin-screen";
	function Se() {
		let e = null;
		try {
			e = JSON.parse(localStorage.getItem(xe) ?? "null");
		} catch {
			e = null;
		}
		return Ko(e, z(be));
	}
	let Ce = /* @__PURE__ */ A(en(Se()));
	function we(e) {
		j(Ce, Ko({
			...Ke(z(Ce)),
			...e
		}, z(be)), !0);
		try {
			localStorage.setItem(xe, JSON.stringify(z(Ce)));
		} catch {}
	}
	let Te = /* @__PURE__ */ k(() => qo(z(Ce), z(be))), Ee = [
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
	], De = /* @__PURE__ */ k(() => [{
		id: "desktop",
		width: z(Te).width,
		height: z(Te).height || null,
		viewport: "desktop"
	}, ...Ee]);
	function ke(e) {
		let t = ts(z(nc), z(rc), e.width).width;
		return Y(e.id === "desktop" ? z(Ce).mode === "own" ? "tip.view.desktop" : e.height ? "tip.view.desktopSizeH" : "tip.view.desktopSize" : `tip.view.${e.id}`, {
			w: e.width,
			h: e.height ?? 0,
			c: t
		});
	}
	let Ae = /* @__PURE__ */ A("desktop"), je = /* @__PURE__ */ k(() => z(De).find((e) => e.id === z(Ae)) ?? z(De)[0]), Me = /* @__PURE__ */ k(() => z(je).viewport === "mobile" || z(je).width <= (z(O)?.breakpoints?.mobile ?? 640) ? "mobile" : "desktop"), Ne = /* @__PURE__ */ A(null), Pe = /* @__PURE__ */ A(0), Fe = /* @__PURE__ */ A(0), Ie = /* @__PURE__ */ A("fit"), Le = /* @__PURE__ */ A(1), Re = /* @__PURE__ */ k(() => es(z(nc), z(rc))), ze = /* @__PURE__ */ k(() => z(je).width), Be = /* @__PURE__ */ k(() => z(je).height ?? 0), Ve = /* @__PURE__ */ k(() => z(Ie) === "manual" ? z(Le) : Ro(z(Pe), z(ze), "fit", z(Fe), z(Be)));
	function He(e) {
		let t = Math.min(400, Math.max(10, (Math.round(Math.round(z(Ve) * 100) / 10) + e) * 10));
		j(Le, t / 100), j(Ie, "manual");
	}
	let Ue = /* @__PURE__ */ k(() => z(Be) > 0 ? z(Be) : z(Ve) > 0 ? z(Fe) / z(Ve) : z(Fe)), We = /* @__PURE__ */ k(() => z(ze) * z(Ve)), Ge = /* @__PURE__ */ k(() => z(Be) > 0 ? z(Be) * z(Ve) : z(Fe)), qe = /* @__PURE__ */ k(() => z(We) > z(Pe) + 1 || z(Ge) > z(Fe) + 1);
	xn(() => {
		let e = () => rt?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), xn(() => {
		let e = z(Me);
		rt?.sendViewport(e);
	}), xn(() => {
		let e = z(Ve);
		rt?.sendZoom(e);
	}), xn(() => {
		let e = () => {
			j(be, Go(window) ?? z(be), !0);
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}), xn(() => {
		let e = z(Ne);
		if (!e || typeof ResizeObserver > "u") return;
		let t = () => {
			j(Pe, e.clientWidth, !0), j(Fe, e.clientHeight, !0);
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	});
	let Je = /* @__PURE__ */ A(0);
	function Ye() {
		j(Je, D?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function Qe() {
		let e = D?.data.sections.find((e) => e.responsive?.mobile?.attention?.needed);
		j(Ae, "mobile"), e && setTimeout(() => rt?.sendScrollSection(e.id), 0);
	}
	function $e(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			ht("layout");
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
			}, tt(t, "layout-changed"), e.sectionId === z(Rr) && j(Br, e.minHeight, !0), z(M)?.sectionId === e.sectionId && rn(), D.save(), ut(), rt?.sendSection(z(w), t);
		}
	}
	function et(e) {
		return e?.blocks?.some((e) => e.frames?.mobile) ?? !1;
	}
	function tt(e, t) {
		e && et(e) && (e.responsive?.mobile?.attention?.needed || (e.responsive = {
			...e.responsive ?? {},
			mobile: {
				...e.responsive?.mobile ?? { mode: "auto" },
				attention: {
					needed: !0,
					reason: t,
					since: (/* @__PURE__ */ new Date()).toISOString()
				}
			}
		}, Ye(), rt?.sendAttention(e.id, !0)));
	}
	let D = null, nt = null, rt = null, O = /* @__PURE__ */ A(null);
	function it() {
		j(O, nt.data, !0), nt.replace(z(O));
	}
	function at() {
		rt?.sendSite(Ke(z(O)));
	}
	let ct = /* @__PURE__ */ new Set(), lt = () => z(O).pages.find((e) => e.id === z(w));
	function ut() {
		let e = z(O)?.pages?.some((e) => !ct.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = Dl?.hasDraft() || Object.values(Ol).some((e) => e.hasDraft()), n = Ll?.hasDraft() || Object.values(Rl).some((e) => e.hasDraft());
		j(ue, e || D?.hasDraft() && !ct.has(z(w)) || nt?.hasDraft() || Nu?.hasDraft() || t || n || !1, !0);
	}
	let dt = [], ft = [], pt = null;
	function mt() {
		return JSON.stringify({
			pageId: z(w),
			page: D.data,
			site: nt.data,
			collectionsIndex: Al ? Dl.data : null,
			collections: Al ? Object.fromEntries(Object.entries(Ol).map(([e, t]) => [e, t.data])) : {},
			templatesIndex: Bl ? Ll.data : null,
			templates: Bl ? Object.fromEntries(Object.entries(Rl).map(([e, t]) => [e, t.data])) : {},
			plugins: Nu?.data ?? null
		});
	}
	function ht(e) {
		(e !== pt || !e.startsWith("edit:") && !e.startsWith("grid:")) && (dt.push(mt()), dt.length > 50 && dt.shift(), ft.length = 0, pt = e);
	}
	function gt(e) {
		let { pageId: t, page: n, site: r, collectionsIndex: i, collections: a, templatesIndex: o, templates: s, plugins: c } = JSON.parse(e);
		if (nt.replace(r), it(), nt.save(), j(ve, {
			snap: !0,
			...z(O).grid
		}, !0), at(), _t(i, a ?? {}), vt(o, s ?? {}), yt(c), t && t !== z(w) && z(O).pages.some((e) => e.id === t)) {
			he(`urd-draft-${t}`, JSON.stringify(n)), yo(t, { keepHistory: !0 }), ut();
			return;
		}
		D.replace(n), D.save(), ut(), Ye(), rn(), qr(D.data.sections.find((e) => e.id === z(Rr))), z(O).pages.some((e) => e.id === z(w)) ? rt?.sendPage(z(w), D.data) : yo(z(O).pages[0].id, { keepHistory: !0 });
	}
	function _t(e, t) {
		if (Dl && e && JSON.stringify({
			index: Dl.data,
			collections: Object.fromEntries(Object.entries(Ol).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			collections: t
		})) {
			Dl.replace(e), Dl.save();
			for (let e of Object.keys(Ol)) e in t || (localStorage.removeItem(`urd-draft-collection-${e}`), localStorage.removeItem(`urd-draft-samling-${e}`), delete Ol[e]);
			for (let [e, n] of Object.entries(t)) {
				if (!Ol[e]) {
					let t = kl[e] ?? null;
					Ol[e] = oa(`urd-draft-collection-${e}`, () => t, me, `urd-draft-samling-${e}`);
				}
				Ol[e].replace(n), Ol[e].save();
			}
			j(jl, [...e.samlinger ?? []], !0), z(Nl) && !z(jl).includes(z(Nl)) && j(Nl, null), Xl();
		}
	}
	function vt(e, t) {
		if (Ll && e && JSON.stringify({
			index: Ll.data,
			templates: Object.fromEntries(Object.entries(Rl).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			templates: t
		})) {
			Ll.replace(e), Ll.save();
			for (let e of Object.keys(Rl)) e in t || (localStorage.removeItem(`urd-draft-template-${e}`), localStorage.removeItem(`urd-draft-mal-${e}`), delete Rl[e]);
			for (let [e, n] of Object.entries(t)) Rl[e] || (Rl[e] = oa(`urd-draft-template-${e}`, () => zl[e] ?? null, me, `urd-draft-mal-${e}`)), Rl[e].replace(n), Rl[e].save();
			j(Vl, [...e.maler ?? []], !0), ut(), Ul();
		}
	}
	function yt(e) {
		Nu && e && JSON.stringify(Nu.data) !== JSON.stringify(e) && (Nu.replace(e), Nu.save(), Qu(), ld());
	}
	function bt() {
		dt.length && (ft.push(mt()), gt(dt.pop()), pt = null, T(Y("status.undone")));
	}
	function xt() {
		ft.length && (dt.push(mt()), gt(ft.pop()), pt = null, T(Y("status.redone")));
	}
	function St(e) {
		z(on) && (e.target instanceof Element && e.target.closest(".block-menu") || j(on, null));
	}
	function Ct(e) {
		if (e.key === "Escape" && z(on)) {
			j(on, null);
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
			].includes(t.type)) || !z(M) || z(Me) === "mobile") return;
			e.preventDefault(), rt?.sendDuplicate();
			return;
		}
		if (t !== "z" && t !== "y") return;
		let n = e.target;
		n instanceof HTMLElement && (n.isContentEditable || n.tagName === "TEXTAREA" || n.tagName === "INPUT" && ![
			"number",
			"checkbox",
			"range",
			"color"
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? xt() : bt());
	}
	async function wt() {
		j(le, Ws(await (await fetch("/content/site.json")).json()), !0), nt = oa("urd-draft-site", () => z(le), me), (nt.data.schemaVersion ?? 1) > 4 && (console.warn(`Urd: the site draft has schemaVersion ${nt.data.schemaVersion} (the engine has 4) and is discarded`), nt.replace(Ke(z(le)))), nt.replace(Ws(nt.data)), nt.save(), it(), j(ve, {
			snap: !0,
			...z(O).grid
		}, !0), await yo(new URLSearchParams(location.search).get("page") ?? z(O).pages[0].id), await id(), await Yl(), await Hl(), await za(), z(_e) && qa(), $t(), z(O).site.setup === !0 && !localStorage.getItem("urd-setup-done") && (j(jt, z(O).site.title, !0), j(Mt, z(O).theme.tokens.color.accent, !0), j(Nt, z(O).theme.tokens.color.bg, !0), j(At, !0));
	}
	let Tt = /* @__PURE__ */ A(null);
	function Et({ title: e, lines: t = [], okLabel: n = Y("confirm.ok"), cancelLabel: r = Y("confirm.cancel") }) {
		return new Promise((i) => {
			j(Tt, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function Dt({ title: e, lines: t = [], value: n = "", placeholder: r = "", okLabel: i = Y("confirm.ok"), cancelLabel: a = Y("confirm.cancel") }) {
		return new Promise((o) => {
			j(Tt, {
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
	function Ot(e) {
		z(Tt)?.resolve(z(Tt).prompt ? e ? z(Tt).value : null : e), j(Tt, null);
	}
	let kt = !1;
	xn(() => {
		if (!z(Tt)) return;
		let e = (e) => {
			e.key === "Escape" && (e.stopPropagation(), Ot(!1));
		};
		return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
	});
	let At = /* @__PURE__ */ A(!1), jt = /* @__PURE__ */ A(""), Mt = /* @__PURE__ */ A("#7c5cff"), Nt = /* @__PURE__ */ A("#0b0e14");
	function Pt() {
		localStorage.setItem("urd-setup-done", "1"), j(At, !1);
	}
	function Ft() {
		let e = z(jt).trim();
		e && (Uo("setup", () => {
			z(O).site.title = e, z(O).nav.logo = {
				type: "text",
				value: e
			}, z(O).theme.tokens.color.accent = z(Mt), z(O).theme.tokens.color.bg = z(Nt), delete z(O).site.setup;
		}), Pt(), T(Y("status.setupDone"), "ok"));
	}
	let It = "urd-admin-panels", Lt = "urd-admin-panel-open", Rt = /* @__PURE__ */ A(en(localStorage.getItem(It) === "reset" ? "reset" : "remember"));
	function zt(e) {
		j(Rt, e === "reset" ? "reset" : "remember", !0), z(Rt) === "reset" ? localStorage.setItem(It, "reset") : localStorage.removeItem(It);
	}
	let Bt = /* @__PURE__ */ A(en(z(Rt) === "reset" ? null : localStorage.getItem(Lt))), Vt = [
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
	], Ht = [
		"rail.thisPage",
		"rail.site",
		"rail.system"
	], Ut = Object.fromEntries(Vt.flat().map((e) => [e, Y(`panel.${e}`)]));
	z(Bt) && !Ut[z(Bt)] && j(Bt, null), xn(() => {
		if (z(Rt) === "reset") {
			localStorage.removeItem(Lt);
			return;
		}
		z(Bt) ? localStorage.setItem(Lt, z(Bt)) : localStorage.removeItem(Lt);
	});
	let Wt = {
		pages: ["hint.pages.drafts"],
		blocks: ["hint.blocks.intro"],
		grid: ["hint.grid.intro", "hint.grid.section"],
		collections: ["hint.collections.intro"],
		plugins: ["hint.plugins.intro"],
		history: ["hint.history.intro"]
	}, Gt = [
		["se", "Davvisámegiella"],
		["en-GB", "English (UK)"],
		["nb", "Norsk bokmål"],
		["nn", "Norsk nynorsk"],
		["tr", "Türkçe"]
	], Kt = (e) => [...e].sort((e, t) => e[1].localeCompare(t[1]));
	function qt(e, t) {
		let n = [];
		for (let r of e) for (let e of Vu[r]?.languages ?? []) e?.[t] === !0 && typeof e.code == "string" && typeof e.name == "string" && e.name && (Gt.some(([t]) => t === e.code) || n.some(([t]) => t === e.code) || n.push([e.code, e.name]));
		return n;
	}
	function Jt() {
		let e = Kt([...Gt, ...qt(z(Yu), "admin")]);
		return Xt === "auto" || e.some(([e]) => e === Xt) ? e : [[Xt, Xt], ...e];
	}
	let Yt = () => qt(z(Bu)?.enabled ?? [], "site"), Xt = localStorage.getItem("urd-admin-lang") ?? "auto";
	function Zt(e) {
		e !== Xt && (e === "auto" ? localStorage.removeItem("urd-admin-lang") : localStorage.setItem("urd-admin-lang", e), location.reload());
	}
	function Qt(e) {
		j(Bt, z(Bt) === e ? null : e, !0), $t();
	}
	function $t() {
		z(Bt) === "history" && Qa(), z(Bt) === "update" && !z(uo) && po();
	}
	let M = /* @__PURE__ */ A(null);
	function nn(e, t) {
		let n = D?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function rn() {
		if (!z(M)) return;
		let { block: e } = nn(z(M).sectionId, z(M).blockId);
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
			fit: e.fit === "shrink" ? "shrink" : void 0,
			fitMin: typeof e.fitMin == "number" ? e.fitMin : void 0,
			props: JSON.parse(JSON.stringify(e.props)),
			frame: { ...e.frames.desktop },
			animation: e.animation ? JSON.parse(JSON.stringify(e.animation)) : null,
			hover: e.hover ? JSON.parse(JSON.stringify(e.hover)) : null,
			sticky: e.sticky ? JSON.parse(JSON.stringify(e.sticky)) : null
		}, !0);
	}
	function an(e) {
		if (j(on, null), !e.blockId) {
			j(M, null);
			return;
		}
		j(M, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), e.sectionId && j(Rr, e.sectionId, !0), rn();
	}
	let on = /* @__PURE__ */ A(null), sn = "urd-admin-menu-width", cn = /* @__PURE__ */ A(en(localStorage.getItem(sn) === "narrow" ? "narrow" : "wide")), ln = /* @__PURE__ */ A(localStorage.getItem(sn) !== "narrow");
	function un(e) {
		j(cn, e === "narrow" ? "narrow" : "wide", !0), j(ln, z(cn) === "wide"), z(cn) === "narrow" ? localStorage.setItem(sn, "narrow") : localStorage.removeItem(sn);
	}
	let dn = new na(), fn = /* @__PURE__ */ A(8), pn = /* @__PURE__ */ A(en(Infinity));
	function mn() {
		let e = z(Ne)?.getBoundingClientRect().left ?? 0;
		j(fn, Math.round(e) + 8), j(pn, window.innerWidth - z(fn) - 8);
	}
	let hn = /* @__PURE__ */ k(() => z(ln) && z(pn) >= 740);
	xn(() => {
		if (z(on)) return mn(), window.addEventListener("resize", mn), () => window.removeEventListener("resize", mn);
	});
	function gn() {
		let e = z(M), t = [];
		e.type === "calendar" && (t.push({
			id: "design",
			label: Y("calendar.design"),
			kind: "open",
			value: Y(tp(e.props.design).labelKey),
			run: () => j(_n, e.blockId, !0)
		}), [
			"list",
			"cards",
			"agenda"
		].includes(np(e.props)) && t.push({
			id: "limit",
			label: Y("lbl.maxCount"),
			kind: "number",
			min: 1,
			max: 50,
			value: e.props.limit ?? 6,
			set: (e) => L("limit", Math.max(1, Math.min(50, Number(e) || 6)))
		}), t.push({
			id: "subscribe",
			label: Y("quick.subscribe"),
			kind: "choice",
			value: e.props.showSubscribe === !1 ? "off" : "on",
			options: [["on", Y("common.on")], ["off", Y("common.off")]],
			set: (e) => L("showSubscribe", e === "on")
		}));
		let n = zn.has(e.type);
		return t.push({
			id: "fit",
			label: Y("quick.fit"),
			kind: "choice",
			value: e.fit === "shrink" ? "shrink" : "wrap",
			options: n ? [["wrap", Y("quick.fit.fluid")], ["shrink", Y("quick.fit.floor")]] : [["wrap", Y("quick.fit.wrap")], ["shrink", Y("quick.fit.shrink")]],
			set: (e) => Bn(e)
		}), t.push({
			id: "phone",
			label: Y("quick.phone"),
			kind: "choice",
			value: e.hideMobile ? "off" : "on",
			options: [["on", Y("quick.phone.show")], ["off", Y("quick.phone.hide")]],
			set: (e) => jr(e === "off")
		}), t;
	}
	let _n = /* @__PURE__ */ A(null), vn = () => z(M)?.type === "calendar" && z(_n) === z(M).blockId;
	function yn() {
		let e = _a(z(M).animation) ? z(M).animation.type : z(M).hover?.type, t = e ? [...ya, ...ba].find(([t]) => t === e) : null;
		return t ? t[1] : Y("common.none");
	}
	let bn = window.matchMedia("(prefers-reduced-motion: reduce)").matches, Sn = [
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
	function Cn() {
		let e = D?.data.sections ?? [], t = e.findIndex((e) => e.id === z(M)?.sectionId);
		return t < 0 ? [["", Y("opt.sticky.ownSection")]] : [["", Y("opt.sticky.ownSection")], ...e.slice(t + 1).map((e, n) => [e.id, Y("opt.sticky.atSection", { n: t + 2 + n })])];
	}
	function wn(e) {
		if (an(e), !z(M)) return;
		mn();
		let t = Math.min(z(ln) && z(pn) >= 740 ? 740 : 400, window.innerWidth - 16), n = z(ge)?.getBoundingClientRect();
		if (!n) return;
		let r = n.left + z(Ve) * e.rect.right + 12;
		r + t > window.innerWidth - 8 && (r = Math.max(8, n.left + z(Ve) * e.rect.left - t - 12));
		let i = window.innerHeight - Math.min(window.innerHeight * .7, 560) - 8, a = Math.min(Math.max(8, n.top + z(Ve) * e.rect.top), Math.max(8, i));
		j(on, {
			left: r,
			top: a
		}, !0);
	}
	function Tn(e, t) {
		let { section: n, block: r } = nn(z(M)?.sectionId, z(M)?.blockId);
		r && (e && ht(e), t(r, n), tt(n, "block-edited"), D.save(), ut(), rt?.sendSection(z(w), n), rn());
	}
	function L(e, t) {
		Tn(`edit:${z(M).blockId}:${e}`, (n) => {
			n.props[e] = t;
		}), z(M).type === "calendar" && On(z(M).sectionId, z(M).blockId);
	}
	function En(e, t) {
		Tn(`edit:${z(M).blockId}:${e}`, (e) => {
			Object.assign(e.props, t);
		}), z(M).type === "calendar" && On(z(M).sectionId, z(M).blockId);
	}
	let Dn = 0;
	function On(e, t, n = !1) {
		z(Me) === "desktop" && (clearTimeout(Dn), Dn = setTimeout(() => rt?.sendFitBlock(e, t, n), 60));
	}
	let kn = /* @__PURE__ */ A("title"), An = {
		list: "calendar.viewList",
		cards: "calendar.viewCards",
		month: "calendar.viewMonth",
		agenda: "calendar.viewAgenda",
		next: "calendar.viewNext",
		week: "calendar.viewWeek",
		day: "calendar.viewDay",
		year: "calendar.viewYear"
	};
	function jn(e, t) {
		let n = { ...z(M).props.options ?? {} };
		t === e.def || t == null ? delete n[e.key] : n[e.key] = t, L("options", Object.keys(n).length ? n : void 0);
	}
	function Mn(e, t) {
		return e.key === "firstMonth" ? new Intl.DateTimeFormat(Yi(), { month: "long" }).format(new Date(2024, Number(t), 1)) : Y(`${e.labelKey}.${t}`);
	}
	function Nn(e) {
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
	function Pn() {
		return z(M)?.props.fieldStyle?.[z(kn)] ?? {};
	}
	function Fn(e) {
		let t = tp(e), n = t.view === "next" ? {
			nextCount: z(M).props.nextCount ?? 3,
			laterCount: z(M).props.laterCount ?? 3
		} : {};
		En("design", {
			design: t.id === "plain" ? void 0 : t.id,
			...t.view ? { view: t.view } : {},
			...n
		}), On(z(M).sectionId, z(M).blockId);
	}
	function In(e, t) {
		let n = { ...z(M).props.colors ?? {} };
		t ? n[e] = t : delete n[e], L("colors", Object.keys(n).length ? n : void 0);
	}
	function Ln(e) {
		let t = {
			...z(M).props.stripe ?? {},
			...e
		};
		for (let e of Object.keys(t)) t[e] === void 0 && delete t[e];
		L("stripe", Object.keys(t).length ? t : void 0);
	}
	function Rn(e) {
		let t = { ...z(M).props.fieldStyle ?? {} }, n = {
			...t[z(kn)] ?? {},
			...e
		};
		for (let e of Object.keys(n)) n[e] === void 0 && delete n[e];
		Object.keys(n).length ? t[z(kn)] = n : delete t[z(kn)], L("fieldStyle", Object.keys(t).length ? t : void 0);
	}
	let zn = /* @__PURE__ */ new Set([
		"image",
		"video",
		"shape",
		"icon"
	]);
	function Bn(e) {
		Tn(`edit:${z(M).blockId}:fit`, (t) => {
			e === "shrink" ? (t.fit = "shrink", t.fitMin ??= .6) : (delete t.fit, delete t.fitMin);
		});
	}
	function Vn(e) {
		Tn(`edit:${z(M).blockId}:fitMin`, (t) => {
			t.fitMin = e;
		});
	}
	let Hn = en({}), Un = en({}), Wn = /* @__PURE__ */ A(!1), Gn = /* @__PURE__ */ A("content"), Kn = (e, t) => (Number.isFinite(t) || (t = e.min ?? 0), e.min != null && (t = Math.max(e.min, t)), e.max != null && (t = Math.min(e.max, t)), t);
	async function qn(e) {
		let t = z(M).blockId, n = `${t}:${e.key}`, r = (Hn[n] ?? z(M).props[e.key] ?? "").trim();
		Un[n] = null;
		let i = r.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
		if (!r || i || /^https?:\/\//i.test(r)) {
			En(e.key, {
				[e.key]: r,
				lat: i ? Number(i[1]) : null,
				lon: i ? Number(i[2]) : null
			});
			return;
		}
		j(Wn, !0), Un[n] = {
			text: Y("props.place.searching"),
			err: !1
		};
		try {
			let i = await fetch(`/api/geocode?q=${encodeURIComponent(r)}`), a = await i.json().catch(() => null);
			if (z(M)?.blockId !== t) return;
			i.ok && Number.isFinite(a?.lat) ? (En(e.key, {
				[e.key]: r,
				lat: a.lat,
				lon: a.lon
			}), Un[n] = null) : Un[n] = {
				text: Ji(a) ?? Y("props.place.notFound"),
				err: !0
			};
		} catch {
			Un[n] = {
				text: Y("props.place.failed"),
				err: !0
			};
		} finally {
			j(Wn, !1);
		}
	}
	function Jn(e, t) {
		Number.isFinite(t) && Tn(`edit:frame-${z(M).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function Yn(e) {
		Tn(`edit:${z(M).blockId}:boxStyle`, (t) => {
			let n = {
				...t.props.boxStyle ?? {},
				...e
			};
			for (let e of Object.keys(n)) n[e] ?? delete n[e];
			Object.keys(n).length ? t.props.boxStyle = n : delete t.props.boxStyle;
		});
	}
	let Xn = [
		"text",
		"email",
		"tel",
		"textarea",
		"select",
		"checkbox",
		"radio",
		"date"
	], Zn = /* @__PURE__ */ new Set(["select", "radio"]), Qn = () => "f" + [...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(3))].map((e) => e.toString(16).padStart(2, "0")).join("");
	function $n(e, t) {
		Tn(`edit:${z(M).blockId}:field${e}`, (n) => {
			let r = {
				...n.props.fields[e],
				...t
			};
			Zn.has(r.type) ? r.options ??= [] : delete r.options, n.props.fields[e] = r;
		});
	}
	function er(e, t) {
		$n(e, { options: String(t).split(",").map((e) => e.trim()).filter(Boolean) });
	}
	function tr() {
		Tn("form-field", (e) => {
			(e.props.fields ??= []).push({
				id: Qn(),
				label: Y("form.newField"),
				type: "text",
				required: !1
			});
		});
	}
	function nr(e) {
		Tn("form-field", (t) => {
			t.props.fields.splice(e, 1);
		});
	}
	function rr(e, t) {
		let n = e + t;
		Tn("form-field", (t) => {
			n < 0 || n >= t.props.fields.length || ([t.props.fields[e], t.props.fields[n]] = [t.props.fields[n], t.props.fields[e]]);
		});
	}
	let ir = (e) => e && typeof e == "object" ? {
		url: e.url ?? "",
		name: e.name ?? "",
		color: e.color ?? ""
	} : {
		url: typeof e == "string" ? e : "",
		name: "",
		color: ""
	}, ar = ({ url: e, name: t, color: n }) => t || n ? {
		url: e,
		...t ? { name: t } : {},
		...n ? { color: n } : {}
	} : e;
	function or(e, t) {
		Tn(`edit:${z(M).blockId}:source${e}`, (n) => {
			let r = [...n.props.sources ?? []];
			r[e] = ar({
				...ir(r[e]),
				...t
			}), n.props.sources = r;
		});
	}
	function sr() {
		L("sources", [...z(M).props.sources ?? [], ""]);
	}
	function cr(e) {
		L("sources", (z(M).props.sources ?? []).filter((t, n) => n !== e));
	}
	let lr = /* @__PURE__ */ A(null);
	async function ur() {
		let e = /* @__PURE__ */ new Set(), t = (t) => {
			for (let n of t?.sections ?? []) for (let t of n.blocks ?? []) if (t.type === "calendar") for (let n of t.props?.sources ?? []) {
				let { url: t } = ir(n);
				t.trim() && e.add(t.trim());
			}
		};
		t(D?.data), await Promise.all((z(O).pages ?? []).filter((e) => e.id !== z(w)).map(async (e) => {
			try {
				let n = localStorage.getItem(`urd-draft-${e.id}`);
				t(n ? JSON.parse(n) : await (await fetch(`/${e.file}`)).json());
			} catch {}
		})), j(lr, [...e], !0);
	}
	function dr(e) {
		let t = z(M).props.sources ?? [];
		t.some((t) => ir(t).url === e) || L("sources", [...t, e]);
	}
	function pr(e, t) {
		Tn(`edit:${z(M).blockId}:faq${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function mr() {
		Tn("faq-item", (e) => {
			(e.props.items ??= []).push({
				q: Y("seed.faq.newQ"),
				a: Y("seed.faq.answer")
			});
		});
	}
	function hr(e) {
		Tn("faq-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function gr(e, t) {
		let n = e + t;
		Tn("faq-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function _r(e, t) {
		Tn(`edit:${z(M).blockId}:ribbon${e}`, (n) => {
			n.props.items[e] = t;
		});
	}
	function vr() {
		Tn("ribbon-item", (e) => {
			(e.props.items ??= []).push(Y("seed.ribbonBlock.new"));
		});
	}
	function yr(e) {
		Tn("ribbon-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function br(e, t) {
		let n = e + t;
		Tn("ribbon-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function Sr(e, t) {
		Tn(`edit:${z(M).blockId}:tl${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function wr() {
		Tn("tl-item", (e) => {
			(e.props.items ??= []).push({
				year: "",
				title: Y("seed.timeline.newTitle"),
				text: ""
			});
		});
	}
	function Tr(e) {
		Tn("tl-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function Er(e, t) {
		let n = e + t;
		Tn("tl-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function Dr(e) {
		Tn("decor", (t) => {
			t.decor = e;
		});
	}
	function Or(e, t) {
		Tn(`edit:${z(M).blockId}:table-form`, (n) => {
			let r = (Array.isArray(n.props.rows) && n.props.rows.length ? n.props.rows : [[""]]).map((e) => Array.isArray(e) ? e.map((e) => String(e ?? "")) : [""]), i = Math.max(1, ...r.map((e) => e.length));
			r = r.map((e) => [...e, ...Array(i - e.length).fill("")]), e > 0 ? r.push(Array(i).fill("")) : e < 0 && r.length > 1 && r.pop(), t > 0 ? r = r.map((e) => [...e, ""]) : t < 0 && i > 1 && (r = r.map((e) => e.slice(0, i - 1))), n.props.rows = r;
		});
	}
	function kr(e, t) {
		Tn(`edit:${z(M).blockId}:share`, (n) => {
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
	function Ar(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		let n = new FileReader();
		n.onload = () => {
			L("src", String(n.result ?? "")), t.size > 4e5 && T(Y("status.audioLarge", { kb: Math.round(t.size / 1024) }), "error");
		}, n.onerror = () => T(Y("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function jr(e) {
		let { section: t, block: n } = nn(z(M)?.sectionId, z(M)?.blockId);
		n && (ht("hide-mobile"), n.hideMobile = e, D.save(), ut(), rt?.sendSection(z(w), t), rn());
	}
	async function V(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Pi(t);
			Tn(`edit:${z(M).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || Wa(t.name).replaceAll("-", " ");
			});
		} catch (e) {
			T(Fi(e), "error");
		}
	}
	async function Pr(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Pi(t);
			Tn(`edit:${z(M).blockId}`, (t) => {
				t.props.image = e.dataUrl;
			});
		} catch (e) {
			T(Fi(e), "error");
		}
	}
	let Fr = {
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
	}, Ir = [
		["line", Y("shape.line")],
		["arrow", Y("shape.arrow")],
		["circle", Y("shape.circle")],
		["rect", Y("shape.rect")],
		["triangle", Y("shape.triangle")]
	], Lr = [
		["accent", Y("color.accent")],
		["text", Y("color.text")],
		["surface", Y("color.surface")],
		["bg", Y("color.bg")]
	], Rr = /* @__PURE__ */ A(null), zr = /* @__PURE__ */ A(null), Br = /* @__PURE__ */ A(""), Vr = /* @__PURE__ */ A(en([])), Hr = /* @__PURE__ */ A(null), Ur = /* @__PURE__ */ A(null), Gr = /* @__PURE__ */ A(""), Kr = /* @__PURE__ */ A(en({}));
	function qr(e) {
		j(zr, e?.grid ? { ...e.grid } : null, !0), j(Br, e?.size?.minHeight ?? "", !0), j(Vr, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), j(Hr, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0), j(Ur, e?.hover ? JSON.parse(JSON.stringify(e.hover)) : null, !0), j(Gr, e?.theme ?? "", !0), j(Kr, e?.divider ? JSON.parse(JSON.stringify(e.divider)) : {}, !0);
	}
	let Yr = /* @__PURE__ */ A(null), Xr = en({});
	function Zr() {
		try {
			let e = ((z(ge)?.contentDocument)?.querySelector(`.urd-section[data-section-id="${z(Rr)}"]`))?.getBoundingClientRect();
			j(Yr, e && e.width ? {
				w: e.width,
				h: e.height
			} : null, !0);
		} catch {
			j(Yr, null);
		}
	}
	xn(() => {
		z(Rr), z(Vr), requestAnimationFrame(() => requestAnimationFrame(Zr));
	}), xn(() => {
		let e = z(ge);
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(() => Zr());
		return t.observe(e), () => t.disconnect();
	}), xn(() => {
		for (let e of z(Vr)) {
			let t = e?.props?.src;
			if (e?.type === "image" && t && !Xr[t]) {
				let e = new Image();
				e.onload = () => {
					Xr[t] = {
						w: e.naturalWidth,
						h: e.naturalHeight
					};
				}, e.src = t;
			}
		}
	});
	function Qr(e) {
		ni("section-theme", (t) => {
			e ? t.theme = e : delete t.theme;
		});
	}
	function $r(e) {
		let t = z(ca), n = (e) => e.replaceAll("var(--urd-base-bg)", t.bg).replaceAll("var(--urd-base-surface)", t.surface).replaceAll("var(--urd-base-text)", t.text).replaceAll("var(--urd-base-accent)", t.accent).replaceAll("var(--urd-base-accent-text)", t["accent-text"] ?? ce(mp(t.accent ?? "#000000", t))), r = gu(e);
		return {
			bg: r["--urd-color-bg"] ? n(r["--urd-color-bg"]) : t.bg,
			surface: r["--urd-color-surface"] ? n(r["--urd-color-surface"]) : t.surface,
			text: r["--urd-color-text"] ? n(r["--urd-color-text"]) : t.text,
			accent: r["--urd-color-accent"] ? n(r["--urd-color-accent"]) : t.accent
		};
	}
	function ti(e) {
		j(Rr, e.sectionId, !0), qr(D?.data.sections.find((t) => t.id === e.sectionId));
	}
	function ni(e, t) {
		let n = D.data.sections.find((e) => e.id === z(Rr));
		n && (ht(e), t(n), D.save(), ut(), rt?.sendSection(z(w), n), qr(n));
	}
	let ri = /* @__PURE__ */ A("color");
	function ii(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background ??= {
				version: 1,
				layers: []
			}, e.background.layers.push({
				type: t,
				version: re[t].version ?? 1,
				props: re[t].defaults()
			});
		});
	}
	function ai(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers.splice(t, 1), e.background.layers.length || delete e.background;
		});
	}
	function oi(e, t, n) {
		let r = t + n;
		e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers;
			r < 0 || r >= n.length || ([n[t], n[r]] = [n[r], n[t]]);
		});
	}
	function si(e, t, n) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${Object.keys(n).join("+")}`, (e) => {
			Object.assign(e.background.layers[t].props, n);
		});
	}
	function ci(e, t, n, r) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e.background.layers[t].props[n] = r;
		});
	}
	function ui(e, t, n, r = "xy") {
		e.preventDefault();
		let i = e.currentTarget;
		i.setPointerCapture?.(e.pointerId);
		let a = (e) => {
			let a = i.getBoundingClientRect();
			if (r.includes("x")) {
				let r = Math.min(1, Math.max(0, (e.clientX - a.left) / a.width));
				ci(t, n, "x", Math.round(r * 100) / 100);
			}
			if (r.includes("y")) {
				let r = Math.min(1, Math.max(0, (e.clientY - a.top) / a.height));
				ci(t, n, "y", Math.round(r * 100) / 100);
			}
		};
		a(e);
		let o = () => {
			i.removeEventListener("pointermove", a), i.removeEventListener("pointerup", o), i.removeEventListener("pointercancel", o);
		};
		i.addEventListener("pointermove", a), i.addEventListener("pointerup", o), i.addEventListener("pointercancel", o);
	}
	let di = (e) => Math.min(4, Math.max(.1, e));
	function fi(e, t, n, r) {
		ci(e, t, "size", di(Math.round((n + r) * 100) / 100));
	}
	function pi(e, t, n) {
		let r = Number(n);
		Number.isFinite(r) && ci(e, t, "size", di(r / 100));
	}
	function mi(e, t, n, r) {
		let i = Xr[n.props.src];
		if (!i?.w || !i?.h || !z(Yr)?.w || !z(Yr)?.h) return;
		let a = z(Yr).h * i.w / (z(Yr).w * i.h), o = r === "cover" ? Math.max(1, a) : Math.min(1, a);
		(n.props.fit === "tile" || n.props.fit === "repeat") && ci(e, t, "fit", "plain"), ci(e, t, "size", di(Math.round(o * 100) / 100));
	}
	function hi(e) {
		return e.props;
	}
	function _i(e, t, n, r) {
		e.mutate(n, (e) => {
			r(e.background.layers[t].props);
		});
	}
	function yi(e, t, n, r) {
		_i(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e[n] = r;
		});
	}
	let bi = {
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
	function xi(e, t, n) {
		_i(e, t, e.keyPrefix, (e) => {
			e.kind = n, bi[n].some(([t]) => t === (e.animation ?? "none")) || (e.animation = "none");
		});
	}
	function Si(e, t, n, r) {
		_i(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-stop${n}`, (e) => {
			e.stops[n] = {
				...e.stops[n],
				...r
			};
		});
	}
	function wi(e, t) {
		_i(e, t, e.keyPrefix, (e) => {
			let t = Math.round(e.stops.reduce((e, t) => e + (Number(t.share) || 0), 0) / e.stops.length) || 50;
			e.stops.push({
				color: e.stops[e.stops.length - 1]?.color ?? "#ffffff",
				share: t
			});
		});
	}
	function Ti(e, t, n) {
		_i(e, t, e.keyPrefix, (e) => {
			e.stops.length > 2 && e.stops.splice(n, 1);
		});
	}
	function Ei(e, t, n, r) {
		_i(e, t, e.keyPrefix, (e) => {
			let [t] = e.stops.splice(n, 1);
			e.stops.splice(r, 0, t);
		});
	}
	let Oi = /* @__PURE__ */ A(null);
	function ki(e, t, n, r) {
		if (t.button !== 0) return;
		t.preventDefault();
		let i = t.currentTarget.closest(".bg-layer"), a = t.currentTarget.closest(".grad-stop");
		j(Oi, {
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
			j(Oi, {
				...z(Oi),
				insert: n
			}, !0);
		}, u = () => {
			window.removeEventListener("pointermove", l), window.removeEventListener("pointerup", u), c.remove();
			let t = z(Oi);
			if (j(Oi, null), !t) return;
			let n = t.insert > t.from ? t.insert - 1 : t.insert;
			n !== t.from && Ei(e, t.layer, t.from, n);
		};
		window.addEventListener("pointermove", l), window.addEventListener("pointerup", u);
	}
	function Ai(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].type !== n && (e.background.layers[t] = {
				type: n,
				version: re[n].version ?? 1,
				props: re[n].defaults()
			});
		});
	}
	async function Mi(e, t) {
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
	async function Ni(e) {
		let t = await e.text(), n = Ba(t), r = Ha(t);
		if (!r) return n;
		let i = await Mi(n.dataUrl, r);
		if (!i) return n;
		let a = Va(t, i);
		if (a === t) return n;
		try {
			return Ba(a);
		} catch {
			return n;
		}
	}
	async function Pi(e) {
		if (e.type === "image/svg+xml" || /\.svg$/i.test(e.name || "")) return Ni(e);
		let t = await La(e);
		return t.animated && t.bytes > 1e6 && T(Y("status.animatedLarge", { mb: (t.bytes / 1e6).toFixed(1) }), "error"), t;
	}
	function Fi(e) {
		return e?.code === "animatedTooLarge" ? Y("status.animatedTooLarge", {
			mb: (e.bytes / 1e6).toFixed(1),
			max: Math.round(ka / 1e6)
		}) : Y("status.imageReadError");
	}
	function Ii(e, t, n) {
		if (!["video/mp4", "video/webm"].includes(e.type)) {
			T(Y(t), "error");
			return;
		}
		if (e.size > 15e6) {
			T(Y("status.videoTooLarge", {
				mb: (e.size / 1e6).toFixed(1),
				max: Math.round(Oa / 1e6)
			}), "error");
			return;
		}
		let r = new FileReader();
		r.onload = () => {
			n(String(r.result ?? "")), e.size > 4e6 && T(Y("status.videoLarge", { mb: (e.size / 1e6).toFixed(1) }), "error");
		}, r.onerror = () => T(Y("status.imageReadError"), "error"), r.readAsDataURL(e);
	}
	function Li(e) {
		let t = e.target.files?.[0];
		e.target.value = "", t && Ii(t, "status.videoFileFormat", (e) => L("src", e));
	}
	async function Ri(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			L("poster", (await Pi(t)).dataUrl);
		} catch (e) {
			T(Fi(e), "error");
		}
	}
	async function zi(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			ci(e, t, "src", (await Pi(r)).dataUrl);
		} catch (e) {
			T(Fi(e), "error");
		}
	}
	function Bi(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && Ii(r, "status.videoFormat", (n) => ci(e, t, "src", n));
	}
	async function Vi(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			ci(e, t, "poster", (await Pi(r)).dataUrl);
		} catch (e) {
			T(Fi(e), "error");
		}
	}
	let Hi = en({}), Ui = (e, t) => `${e.keyPrefix}-${e.keyId}-${t}`, Wi = () => 1 + crypto.getRandomValues(/* @__PURE__ */ new Uint32Array(1))[0] % 1e6;
	async function Gi(e, t, n) {
		let r = Ui(e, t);
		Hi[r] = {
			text: Y("status.folderChecking"),
			err: !1
		};
		let i = await uf(n.props.folder, n.props.order, { force: !0 });
		Hi[r] = i.photos.length ? {
			text: qi("status.folderFound", i.photos.length, { count: i.photos.length }),
			err: !1
		} : {
			text: Ji(i) ?? Y("status.folderNone"),
			err: !0
		};
	}
	async function Ki(e, t, n) {
		let r = [...n.target.files ?? []];
		if (n.target.value = "", !r.length) return;
		T(Y("status.compressingImages"));
		let { images: i, failed: a, big: o } = await cy(r);
		i.length && e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers[t].props;
			n.images ??= [], n.images.push(...i.map(({ src: e }) => ({
				src: e,
				x: .5,
				y: .5
			})));
		}), ly(i.length, a, o);
	}
	function Xi(e, t, n, r) {
		e.mutate(e.keyPrefix, (e) => {
			let i = e.background.layers[t].props.images, a = n + r;
			a < 0 || a >= i.length || ([i[n], i[a]] = [i[a], i[n]]);
		});
	}
	function Zi(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].props.images.splice(n, 1);
		});
	}
	function Qi(e, t, n, r, i) {
		e.mutate(`edit:${e.keyPrefix}g-${e.keyId}-${t}-${n}-${r}`, (e) => {
			e.background.layers[t].props.images[n][r] = i;
		});
	}
	function $i(e, t) {
		Uo(e, () => {
			z(O).nav.style ??= {}, t(z(O).nav.style);
		});
	}
	let ea = /* @__PURE__ */ k(() => ({
		mutate: ni,
		keyPrefix: "bg",
		keyId: z(Rr)
	})), ta = {
		mutate: $i,
		keyPrefix: "navbg",
		keyId: "nav"
	}, ra = {
		mutate: pd,
		keyPrefix: "footerbg",
		keyId: "footer"
	}, ia = () => {
		let e = null;
		try {
			e = localStorage.getItem("urd-theme-mode");
		} catch {}
		return cu(z(O)?.theme?.scheme, e, window.matchMedia("(prefers-color-scheme: dark)").matches);
	}, sa = /* @__PURE__ */ A("light");
	xn(() => {
		j(sa, ia(), !0);
		let e = window.matchMedia("(prefers-color-scheme: dark)"), t = (e) => {
			e instanceof StorageEvent && e.key && e.key !== "urd-theme-mode" || j(sa, ia(), !0);
		};
		return e.addEventListener("change", t), window.addEventListener("storage", t), () => {
			e.removeEventListener("change", t), window.removeEventListener("storage", t);
		};
	});
	let ca = /* @__PURE__ */ k(() => z(O)?.theme ? lu(z(O).theme, z(sa)).color ?? {} : {}), la = () => Object.entries(z(ca)), ua = [
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
	], da = /* @__PURE__ */ k(() => !!z(O)?.theme.alt), fa = /* @__PURE__ */ k(() => z(O)?.theme.alt?.auto === !0), pa = /* @__PURE__ */ k(() => z(O)?.theme.scheme === "dark" ? "dark" : "light"), ma = /* @__PURE__ */ k(() => z(O)?.theme.tokens.color ?? {}), ha = /* @__PURE__ */ k(() => ({
		...z(O)?.theme.tokens.color ?? {},
		...z(O)?.theme.alt?.tokens?.color ?? {}
	}));
	function ga(e) {
		return {
			type: e,
			version: Rf[e].version,
			props: Rf[e].defaults()
		};
	}
	let _a = (e) => !!(e && Rf[e.type]?.entrance), va = [["", Y("common.none")], ...Object.entries(Rf).filter(([, e]) => e.entrance).map(([e, t]) => [e, t.labelKey ? Y(t.labelKey) : t.label])], ya = va.filter(([e]) => !Rf[e]?.group), ba = [["", Y("common.none")], ...Object.entries(Rf).filter(([, e]) => !e.entrance).map(([e, t]) => [e, t.labelKey ? Y(t.labelKey) : t.label])];
	function xa(e) {
		e.animation && !_a(e.animation) && (e.hover ??= e.animation, e.animation = null);
	}
	function Sa(e) {
		Tn(`edit:anim-${z(M).blockId}`, (t) => {
			xa(t), t.animation = e ? ga(e) : null;
		}), z(M) && rt?.sendDemoAnim(z(M).sectionId, z(M).blockId);
	}
	function Ca(e) {
		Tn(`edit:hover-${z(M).blockId}`, (t) => {
			xa(t), t.hover = e ? ga(e) : null;
		});
	}
	function Ta(e, t) {
		Number.isFinite(t) && (Tn(`edit:anim-${z(M).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), z(M) && rt?.sendDemoAnim(z(M).sectionId, z(M).blockId));
	}
	function Ea(e) {
		ni("section-anim", (t) => {
			xa(t), t.animation = e ? ga(e) : null;
		}), rt?.sendDemoAnim(z(Rr));
	}
	function Da(e, t, n) {
		ni(`section-divider-${e}-${t}`, (r) => {
			let i = { ...r.divider ?? {} };
			if (t === "shape" && !n) delete i[e];
			else {
				let r = { ...i[e] ?? { shape: "wave" } };
				n === void 0 || n === !1 || n === "" ? delete r[t] : r[t] = n, i[e] = r;
			}
			Object.keys(i).length ? r.divider = i : delete r.divider;
		});
	}
	function Aa(e) {
		ni("section-hover", (t) => {
			xa(t), t.hover = e ? ga(e) : null;
		});
	}
	function ja(e, t) {
		Number.isFinite(t) && (ni("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), rt?.sendDemoAnim(z(Rr)));
	}
	function Ma(e, t) {
		ni("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), rt?.sendDemoAnim(z(Rr));
	}
	function Na(e) {
		let t = D.data.sections.find((e) => e.id === z(Rr));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		ht("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, j(Br, r, !0), D.save(), ut(), rt?.sendSection(z(w), t);
	}
	function Pa() {
		return D.data.sections.find((e) => e.id === z(Rr)) ?? D.data.sections[0];
	}
	function Fa(e) {
		let t = D.data.sections.find((e) => e.id === z(Rr));
		t && (ht("grid:section"), t.grid = e ? { ...nt.data.grid } : null, j(zr, t.grid ? { ...t.grid } : null, !0), D.save(), ut(), rt?.sendSection(z(w), t), z(No) && rt?.sendShowGrid(!0));
	}
	function Ia(e, t) {
		let n = D.data.sections.find((e) => e.id === z(Rr));
		n?.grid && (ht("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, j(zr, { ...n.grid }, !0), D.save(), ut(), rt?.sendSection(z(w), n), z(No) && rt?.sendShowGrid(!0));
	}
	function Ra(e, t) {
		ht("grid:site"), j(ve, {
			...z(ve),
			[e]: t
		}, !0), nt.data.grid = {
			...nt.data.grid,
			[e]: t
		}, nt.save(), ut(), at(), z(No) && rt?.sendShowGrid(!0);
	}
	async function za() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? j(_e, await e.json(), !0) : e.status !== 503 && j(_e, null);
		} catch {
			j(_e, null);
		}
	}
	let Ka = null;
	async function qa() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (Ka = (await e.json()).head ?? null);
		} catch {}
	}
	async function Ja(e) {
		if (!Ka) return await qa(), {
			ok: await Et({
				title: Y("confirm.conflictUnknown.title"),
				lines: [Y("confirm.conflictUnknown.body"), Y("confirm.conflictUnknown.warning")],
				okLabel: Y("confirm.publishAnyway"),
				cancelLabel: Y("confirm.cancel")
			}),
			head: Ka
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${Ka}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === Ka) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? [Y("confirm.conflict.truncated")] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await Et({
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
	let Ya = /* @__PURE__ */ A(null), Xa = /* @__PURE__ */ A(""), Za = /* @__PURE__ */ A(!1);
	async function Qa() {
		j(Xa, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? j(Ya, (await e.json()).commits, !0) : e.status === 401 ? (j(Ya, [], !0), j(Xa, Y("status.historyLoginRequired"), !0)) : (j(Ya, [], !0), j(Xa, Ji(await e.json().catch(() => null)) ?? Y("status.historyFetchFailed"), !0));
		} catch {
			j(Ya, [], !0), j(Xa, Y("status.historyUnavailable"), !0);
		}
	}
	let $a = (() => {
		let e = {
			dateStyle: "short",
			timeStyle: "short"
		};
		try {
			return new Intl.DateTimeFormat(Yi(), e);
		} catch {
			return new Intl.DateTimeFormat(void 0, e);
		}
	})(), eo = !1;
	async function to() {
		let e = z(Ya)?.[0];
		if (e && !z(Za) && await Et({
			title: Y("confirm.revert.title"),
			lines: [`«${e.message}»`, Y("confirm.revert.body")],
			okLabel: Y("confirm.revert.ok"),
			cancelLabel: Y("confirm.cancel")
		})) {
			j(Za, !0), T(Y("status.reverting"));
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? Ka = e : qa(), eo = !0, T(Y("status.revertDone"), "ok"), no();
				} else t.status === 409 ? T(Y("status.revertConflict"), "error") : T(Ji(await t.json().catch(() => null)) ?? Y("status.revertFailed"), "error");
			} catch {
				T(Y("status.publishLayerUnreachable"), "error");
			}
			j(Za, !1), Qa();
		}
	}
	async function no() {
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
	let ro = 0;
	async function so(e) {
		let t = ++ro, n = pe, r = await Bo(zo(e));
		t === ro && n === pe && (r ? T(Y("status.publishLive"), "ok") : T(Y("status.publishDeployTimeout"), "error"));
	}
	let co = /* @__PURE__ */ A(null), lo = /* @__PURE__ */ A(null), uo = /* @__PURE__ */ A(!1), fo = /* @__PURE__ */ A(en(/* @__PURE__ */ new Set()));
	async function po() {
		j(uo, !0), j(lo, null), j(co, null);
		try {
			let e = await fetch("/api/github/update"), t = await e.json().catch(() => null);
			e.ok ? (j(co, t, !0), j(fo, /* @__PURE__ */ new Set(), !0)) : j(lo, Ji(t) ?? Y("update.checkFailed"), !0);
		} catch {
			j(lo, Y("status.publishLayerUnreachable"), !0);
		}
		j(uo, !1);
	}
	function mo(e) {
		let t = new Set(z(fo));
		t.has(e) ? t.delete(e) : t.add(e), j(fo, t, !0);
	}
	async function ho() {
		if (!z(co) || z(co).upToDate || z(uo)) return;
		let e = [...z(fo)], t = z(co).changes.filter((e) => !z(fo).has(e.path)), n = t.filter((e) => e.atom && e.conflict);
		if (await Et({
			title: Y("confirm.update.title"),
			lines: [Y("confirm.update.body", {
				target: z(co).target,
				writes: t.filter((e) => e.action === "write").length,
				deletes: t.filter((e) => e.action === "delete").length
			}), ...n.length > 0 ? [Y("confirm.update.warnEdited", { paths: n.map((e) => e.path).join(", ") })] : []],
			okLabel: Y("confirm.update.ok"),
			cancelLabel: Y("confirm.cancel")
		})) {
			j(uo, !0), T(Y("update.running", { target: z(co).target }));
			try {
				let t = await fetch("/api/github/update", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						to: z(co).target,
						expect: z(co).head,
						skip: e
					})
				}), n = await t.json().catch(() => null);
				t.ok ? (T(Y("update.committed", { target: z(co).target }), "ok"), await go(z(co).target.replace(/^v/, ""))) : t.status === 409 ? (T(Ji(n) ?? Y("update.checkFailed"), "error"), await po()) : T(Ji(n) ?? Y("update.failed"), "error");
			} catch {
				T(Y("status.publishLayerUnreachable"), "error");
			}
			j(uo, !1);
		}
	}
	async function go(e) {
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
	let _o = null;
	function vo(e) {
		return {
			schemaVersion: 4,
			meta: {
				id: e.id,
				title: e.title
			},
			sections: [{
				id: Zs("sec"),
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
	async function yo(e, { keepHistory: t = !1 } = {}) {
		j(w, e, !0), _o = (async () => {
			let n = lt(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = Gs(await e.json(), nt.data));
			} catch {}
			r ? ct.delete(e) : r = vo(n), D = oa(`urd-draft-${e}`, () => r, me), (D.data.schemaVersion ?? 1) > 4 && (console.warn(`Urd: the draft for '${e}' has schemaVersion ${D.data.schemaVersion} (the engine has 4) and is discarded`), D.replace(structuredClone(r))), D.replace(Gs(D.data, nt.data)), D.save(), t || (pt = null), j(Rr, null), j(zr, null), ut(), ks(), Ye(), j(de, "");
		})(), await _o;
	}
	function xo() {
		rt?.destroy(), z(ge)?.contentDocument?.addEventListener("pointerdown", () => {
			z(on) && j(on, null);
		}, !0), rt = Io(z(ge), {
			onEdit: xp,
			onMove: $,
			onGrow: Sp,
			onDelete: qv,
			onAddSection: Dp,
			onMoveSection: Uv,
			onDeleteSection: Wv,
			onSectionSize: Gv,
			onUndo: (e) => e.redo ? xt() : bt(),
			onSelectSection: ti,
			onSelectBlock: an,
			onBlockMenu: wn,
			onReady: So,
			onNavigate: Lo,
			onAddBlock: (e) => Zv(e.sectionId, e.block),
			onAddBlocks: (e) => Qv(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: oy,
			onMoveBlockSection: Kv,
			onMobileReset: Cp,
			onMobileOrder: wp,
			onReviewDone: Tp,
			onBlockFlag: Ep,
			onCollectionEdit: nu,
			onCollectionAdd: $l,
			onSaveTemplate: Wl,
			onStickyGroup: Kl,
			onStickyDock: Gl,
			onDeleteTemplate: Jl,
			onApplyLayout: $e,
			onPluginBlocks: (e) => {
				j(ey, e.blocks ?? [], !0);
			},
			onNavWidth: (e) => Uo("edit:nav-width", () => {
				z(O).nav.style ??= {}, z(O).nav.style.width = e.width;
			})
		});
	}
	async function So() {
		await _o, await Ru, rt?.sendPlugins(Ke(z(Bu))?.enabled ?? []), rt?.sendViewport(z(Me)), rt?.sendZoom(z(Ve)), Zl(), Ul(), nt.hasDraft() && at();
		let e = !z(le).pages.some((e) => e.id === z(w));
		(D.hasDraft() || e) && rt?.sendPage(z(w), D.data), z(ye) || rt?.sendChrome(!1), z(No) && rt?.sendShowGrid(!0), z(Co) && rt?.sendShowGuides(!0), se();
	}
	let Co = /* @__PURE__ */ A(localStorage.getItem("urd-guides") === "1"), wo = /* @__PURE__ */ A(!1), To = /* @__PURE__ */ A(en(localStorage.getItem("urd-layout-picker") === "menu" ? "menu" : "strip"));
	function Eo(e) {
		j(To, e === "menu" ? "menu" : "strip", !0), z(To) === "menu" ? localStorage.setItem("urd-layout-picker", "menu") : localStorage.removeItem("urd-layout-picker");
	}
	let Do = /* @__PURE__ */ A(null);
	xn(() => {
		if (!z(wo)) return;
		let e = (e) => {
			z(Do)?.contains(e.target) || j(wo, !1);
		}, t = (e) => {
			e.key === "Escape" && j(wo, !1);
		}, n = () => {
			j(wo, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let Oo = {
		view: 1079,
		device: 999,
		zoom: 919
	}, ko = /* @__PURE__ */ A(null), Ao = /* @__PURE__ */ A(null), jo = en({
		view: !1,
		device: !1,
		zoom: !1
	});
	xn(() => {
		let e = Object.entries(Oo).map(([e, t]) => {
			let n = window.matchMedia(`(max-width: ${t}px)`), r = () => {
				jo[e] = n.matches;
			};
			return r(), n.addEventListener("change", r), () => n.removeEventListener("change", r);
		});
		return () => e.forEach((e) => e());
	}), xn(() => {
		z(ko) && !jo[z(ko)] && j(ko, null);
	}), xn(() => {
		if (!z(ko)) return;
		let e = (e) => {
			z(Ao)?.contains(e.target) || j(ko, null);
		}, t = (e) => {
			e.key === "Escape" && j(ko, null);
		}, n = () => {
			j(ko, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	function Mo() {
		j(Co, !z(Co)), localStorage.setItem("urd-guides", z(Co) ? "1" : "0"), rt?.sendShowGuides(z(Co));
	}
	let No = /* @__PURE__ */ A(localStorage.getItem("urd-grid-overlay") === "1");
	function Po() {
		j(No, !z(No)), localStorage.setItem("urd-grid-overlay", z(No) ? "1" : "0"), rt?.sendShowGrid(z(No));
	}
	function Lo(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = z(O).pages.find((e) => e.path === t);
		n && n.id !== z(w) && yo(n.id);
	}
	function Uo(e, t) {
		ht(e), t(), nt.save(), ut(), at();
	}
	let Wo = /* @__PURE__ */ A(""), ms = /* @__PURE__ */ A(null), gs = Object.fromEntries(ru.map((e) => [e.id, tu(iu(e.id, {
		pageId: "preview",
		title: ""
	}))])), _s = /* @__PURE__ */ k(() => {
		let e = z(O)?.theme?.tokens?.color ?? {};
		return [
			"bg",
			"surface",
			"text",
			"accent"
		].filter((t) => typeof e[t] == "string" && du(e[t])).map((t) => `--urd-color-${t}: ${e[t]};`).join(" ");
	}), Ss = /* @__PURE__ */ A(null);
	xn(() => {
		if (!z(Ss)) return;
		let e = (e) => {
			e.target.closest?.(".page-menu-wrap") || j(Ss, null);
		}, t = (e) => {
			e.key === "Escape" && j(Ss, null);
		}, n = () => {
			j(Ss, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let Cs = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions",
		"readme"
	];
	function ws(e, t = null) {
		return e ? Cs.includes(e) ? Y("error.reservedName", { slug: e }) : z(O).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? Y("error.pageExists") : null : Y("error.pageNeedsName");
	}
	function Ts() {
		let e = z(Wo).trim(), t = Wa(e), n = ws(t);
		if (n) return T(n, "error"), !1;
		let r = z(ms) && !z(ms).startsWith("preset:") ? Rl[z(ms)]?.data?.page : null, i = z(ms)?.startsWith("preset:") ? iu(z(ms).slice(7), {
			pageId: t,
			title: e
		}) ?? vo({
			id: t,
			title: e
		}) : r ? Dc(Gs(JSON.parse(JSON.stringify(r)), nt.data), Zs, {
			id: t,
			title: e
		}) : vo({
			id: t,
			title: e
		});
		Uo("pages", () => {
			z(O).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), z(O).nav.items.push({
				label: e,
				page: t
			});
		}), he(`urd-draft-${t}`, JSON.stringify(i)), ut(), j(Wo, ""), j(ms, null), yo(t);
	}
	async function Es(e) {
		j(Ss, null), await ql("page", e.id === z(w) ? JSON.parse(JSON.stringify(D.data)) : await Rs(e));
	}
	function Ds(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		Uo("pages", () => {
			e.title = n;
			for (let t of z(O).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === z(w) ? (D.data.meta.title = n, D.save(), ut(), rt?.sendPage(z(w), D.data)) : zs(e, (e) => {
			e.meta.title = n;
		});
	}
	let Os = /* @__PURE__ */ A(en({
		description: "",
		ogTitle: "",
		ogDescription: "",
		ogImage: ""
	}));
	function ks() {
		let e = D?.data?.meta ?? {};
		j(Os, {
			description: e.description ?? "",
			ogTitle: e.og?.title ?? "",
			ogDescription: e.og?.description ?? "",
			ogImage: e.og?.image ?? ""
		}, !0);
	}
	function js(e, t) {
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
		D.save(), ut(), ks();
		let r = z(O).pages.find((e) => e.id === z(w));
		z(Fs)[z(w)] = !r?.noindex && !D.data.meta.description;
	}
	function Ps(e) {
		let t = z(O).pages.find((e) => e.id === z(w));
		t && (Uo("edit:page-noindex", () => {
			e ? t.noindex = !0 : delete t.noindex;
		}), z(Fs)[z(w)] = !e && !D?.data?.meta?.description);
	}
	let Fs = /* @__PURE__ */ A(en({}));
	async function Is() {
		let e = {};
		for (let t of z(O).pages) {
			if (t.noindex) continue;
			if (t.id === z(w)) {
				e[t.id] = !D?.data?.meta?.description;
				continue;
			}
			let n = await Rs(t);
			e[t.id] = !n?.meta?.description;
		}
		j(Fs, e, !0);
	}
	xn(() => {
		z(Bt) === "pages" && z(w) && Is();
	});
	async function Ls(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			js("ogImage", (await Pi(t)).dataUrl);
		} catch (e) {
			T(Fi(e), "error");
		}
	}
	async function Rs(e) {
		let t = localStorage.getItem(`urd-draft-${e.id}`);
		if (t) try {
			return JSON.parse(t);
		} catch {}
		try {
			let t = await fetch(`/${e.file}`);
			if (t.ok) return Gs(await t.json(), nt.data);
		} catch {}
		return vo(e);
	}
	async function zs(e, t) {
		let n = await Rs(e);
		t(n), he(`urd-draft-${e.id}`, JSON.stringify(n)), ut();
	}
	function Bs(e, t) {
		let n = Wa(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = ws(n, e.id);
		if (r) {
			T(r, "error");
			return;
		}
		Uo("pages", () => {
			e.path = `/${n}`;
		});
	}
	function Vs(e) {
		e.path !== "/" && (Uo("pages", () => {
			z(O).pages = z(O).pages.filter((t) => t.id !== e.id), z(O).nav.items = z(O).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of z(O).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			z(O).nav.items = z(O).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === z(w) && yo(z(O).pages[0].id), T(Y("status.pageRemoved")));
	}
	function Hs(e) {
		Uo("edit:nav-logo", () => {
			z(O).nav.logo = {
				type: "text",
				value: "",
				...z(O).nav.logo,
				...e
			};
		});
	}
	function Us(e) {
		Uo("nav", () => {
			z(O).nav.logo ??= {
				type: "text",
				value: z(O).site.title
			};
			let t = z(O).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = z(O).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = z(O).site.title), delete t.image), t.type = e;
		});
	}
	async function Ks(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Pi(t);
			Uo("nav", () => {
				let t = z(O).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			T(Y("status.imageReadErrorSvg"), "error");
		}
	}
	let qs = /* @__PURE__ */ A(null);
	async function Ys(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		if (t.type === "image/svg+xml" || /\.svg$/i.test(t.name || "")) {
			try {
				let e = await Ni(t);
				j(qs, e.dataUrl, !0);
			} catch {
				T(Y("status.imageReadErrorSvg"), "error");
			}
			return;
		}
		let n = new FileReader();
		n.onload = () => {
			j(qs, String(n.result), !0);
		}, n.onerror = () => T(Y("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function Qs(e) {
		Uo("edit:site-icon", () => {
			z(O).site.icon = e;
		}), j(qs, null);
	}
	function Z() {
		Uo("edit:site-icon", () => {
			delete z(O).site.icon;
		});
	}
	function $s(e) {
		Uo("edit:site-title", () => {
			z(O).site.title = e;
		});
	}
	function ec(e) {
		Uo("edit:site-desc", () => {
			z(O).site.description = e;
		});
	}
	function tc(e) {
		let t = String(e ?? "").trim();
		Uo("edit:site-analytics", () => {
			t ? z(O).analytics = { token: t } : delete z(O).analytics;
		});
	}
	let nc = /* @__PURE__ */ k(() => z(O)?.layout?.contentWidth ?? 1440), rc = /* @__PURE__ */ k(() => z(O)?.layout?.gutter ?? 6), ic = /* @__PURE__ */ k(() => ns(z(nc))), ac = /* @__PURE__ */ k(() => Yo.find((e) => e.gutter === z(rc))?.id ?? null), oc = /* @__PURE__ */ A(!1), sc = /* @__PURE__ */ k(() => z(nc) === "full" ? Jo : Qo(z(nc))), cc = /* @__PURE__ */ k(() => Zo.map((e) => ({
		screen: e,
		...ts(z(nc), z(rc), e)
	})));
	function lc(e, t) {
		Uo(t, () => {
			let t = {
				...z(O).layout ?? {},
				contentWidth: z(nc),
				gutter: z(rc),
				...e
			};
			for (let e of Object.keys(t)) t[e] === void 0 && delete t[e];
			z(O).layout = t;
		});
	}
	let uc = (e) => lc({ contentWidth: e === "full" ? "full" : Qo(e) }, "edit:site-width"), dc = (e) => lc({ gutter: $o(e) }, "edit:site-gutter");
	function fc() {
		let e = z(O).site.lang ?? "no";
		return e === "no" ? "nb" : e;
	}
	function pc() {
		let e = fc(), t = Kt([...Gt, ...Yt()]);
		return [...t.some(([t]) => t === e) ? [] : [[e, e]], ...t];
	}
	function mc(e) {
		Uo("site", () => {
			z(O).site.lang = e;
		});
	}
	let hc = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	xn(() => {
		if (!z(O)?.site) return;
		let e = z(O).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 49.6V14.4l25.6 10.4V49.6' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
				return;
			}
			hc.test(e) && (t.href = e);
		}
	});
	function gc(e) {
		Uo("nav", () => {
			z(O).nav.layout = e;
		});
	}
	let _c = (e) => e !== "theme" || !!z(O).theme?.alt?.tokens, vc = /* @__PURE__ */ k(() => td(z(O)?.nav?.style ?? {}).filter(_c));
	function yc(e, t) {
		let n = td(z(O).nav.style ?? {}), r = n.indexOf(e), i = r + t;
		for (; i >= 0 && i < n.length && !_c(n[i]);) i += t;
		r < 0 || i < 0 || i >= n.length || ([n[r], n[i]] = [n[i], n[r]], bc("order", n));
	}
	function bc(e, t) {
		Uo(`edit:nav-tools-${e}`, () => {
			z(O).nav.style ??= {};
			let n = { ...z(O).nav.style.tools ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? z(O).nav.style.tools = n : delete z(O).nav.style.tools;
		});
	}
	function xc(e, t) {
		Uo(`edit:nav-style-${e}`, () => {
			z(O).nav.style ??= {}, t === void 0 ? delete z(O).nav.style[e] : z(O).nav.style[e] = t;
		});
	}
	let Sc = /* @__PURE__ */ k(() => z(O)?.nav?.variant === "side-left" || z(O)?.nav?.variant === "side-right"), Cc = /* @__PURE__ */ k(() => [
		"floating",
		"floating-square",
		"floating-tab"
	].includes(z(O)?.nav?.variant)), wc = /* @__PURE__ */ k(() => xs(z(O)?.nav?.style)), Oc = /* @__PURE__ */ k(() => ys(z(O)?.nav?.style, z(O)?.nav?.variant)), kc = /* @__PURE__ */ k(() => bs(z(O)?.nav?.style));
	function Ac(e) {
		Uo("nav", () => {
			z(O).nav.style ??= {}, e === "md" ? delete z(O).nav.style.size : z(O).nav.style.size = e, delete z(O).nav.style.padY, delete z(O).nav.style.textSize;
		});
	}
	function Mc(e, t, n) {
		let r = e.target.value;
		xc(t, r === "" ? void 0 : vs(r, n, void 0)), e.target.value = z(O).nav.style?.[t] ?? "";
	}
	function Nc(e, t) {
		Uo(`edit:nav-mobile-${e}`, () => {
			z(O).nav.style ??= {};
			let n = { ...z(O).nav.style.mobile ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? z(O).nav.style.mobile = n : delete z(O).nav.style.mobile;
		});
	}
	let Fc = (e) => {
		let t = z(O)?.nav?.style?.mobile?.[e];
		return t === void 0 ? "" : t ? "on" : "off";
	}, Bc = (e, t) => Nc(e, t === "" ? void 0 : t === "on"), Gc = (e) => Nc("border", e ? {
		...z(O).nav.style?.mobile?.border ?? {},
		side: e
	} : void 0);
	function Kc(e, t) {
		Uo(`edit:nav-announce-${e}`, () => {
			let n = { ...z(O).nav.announcement ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? z(O).nav.announcement = n : delete z(O).nav.announcement;
		});
	}
	let qc = "<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"currentColor\" aria-hidden=\"true\">" + [
		6,
		12,
		18
	].flatMap((e) => [
		6,
		12,
		18
	].map((t) => `<circle cx="${t}" cy="${e}" r="1.6"/>`)).join("") + "</svg>", Jc = /* @__PURE__ */ A(null);
	function Yc() {
		let e = z(O).nav?.launcher;
		return [e?.image, ...(e?.links ?? []).map((e) => e.image)].filter(Boolean);
	}
	function Xc(e, t) {
		Uo("nav", () => {
			z(O).nav.launcher ??= { links: [] };
			let n = e === null ? z(O).nav.launcher : z(O).nav.launcher.links[e];
			t.image ? n.image = t.image : delete n.image, t.icon ? n.icon = t.icon : delete n.icon;
		});
	}
	function Zc(e, t) {
		Uo(`edit:nav-launcher-${e}`, () => {
			z(O).nav.launcher ??= { links: [] }, t === void 0 ? delete z(O).nav.launcher[e] : z(O).nav.launcher[e] = t;
		});
	}
	function Qc() {
		Uo("nav", () => {
			z(O).nav.launcher ??= { links: [] }, z(O).nav.launcher.links ??= [], z(O).nav.launcher.links.push({
				label: Y("seed.link"),
				href: "",
				icon: "globe"
			});
		});
	}
	function $c(e) {
		Uo("nav", () => {
			z(O).nav.launcher.links.splice(e, 1);
		});
	}
	function el(e, t) {
		Uo("nav", () => {
			let n = z(O).nav.launcher.links, r = e + t;
			r < 0 || r >= n.length || ([n[e], n[r]] = [n[r], n[e]]);
		});
	}
	function tl(e, t, n) {
		Uo(`edit:nav-launcher-${t}-${e}`, () => {
			z(O).nav.launcher.links[e][t] = n;
		});
	}
	async function nl(e, t) {
		if (e) try {
			let n = await Pi(e);
			Uo("nav", () => {
				z(O).nav.launcher ??= { links: [] }, t === null ? z(O).nav.launcher.image = n.dataUrl : z(O).nav.launcher.links[t].image = n.dataUrl;
			});
		} catch {
			T(Y("status.imageReadErrorSvg"), "error");
		}
	}
	function rl(e, t) {
		Uo(`edit:nav-sheet-${e}`, () => {
			z(O).nav.style ??= {};
			let n = { ...z(O).nav.style.sheet ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? z(O).nav.style.sheet = n : delete z(O).nav.style.sheet;
		});
	}
	function il(e, t, n) {
		let r = e.target.value;
		xc(t, r === "" ? void 0 : vs(r, n, void 0)), e.target.value = z(t === "padY" ? Oc : kc);
	}
	function al(e, t, n) {
		let r = e.target.value;
		Nc(t, r === "" ? void 0 : vs(r, n, void 0)), e.target.value = z(O).nav.style?.mobile?.[t] ?? "";
	}
	function ol(e) {
		let t = vs(e / 100, cs, .5);
		xc("shrinkTo", t === .5 ? void 0 : t);
	}
	function sl(e) {
		let t = vs(e, ls, 80);
		xc("shrinkAt", t === 80 ? void 0 : t);
	}
	function cl(e) {
		let t = vs(e, us, 220);
		xc("shrinkMs", t === 220 ? void 0 : t);
	}
	let ll = {
		underline: [Y("hoverColor.underline.label"), Y("hoverColor.underline.title")],
		pill: [Y("hoverColor.pill.label"), Y("hoverColor.pill.title")],
		lift: [Y("hoverColor.lift.label"), Y("hoverColor.lift.title")]
	}, ul = /* @__PURE__ */ k(() => ll[z(O)?.nav?.style?.hover] ?? null), dl = (e) => e.color || (e.variant === "plain" ? "text" : "accent-text"), ml = [
		"plain",
		"cards",
		"band"
	], hl = ["cards", "list"], yl = (e) => (e.version ?? 1) < mf.version ? mf.migrations[1](e.props ?? {}) : e.props ?? {}, bl = /* @__PURE__ */ k(() => [
		["grid", Y("opt.launcherView.grid")],
		["list", Y("opt.launcherView.list")],
		["cover", Y("opt.launcherView.cover")]
	]), xl = /* @__PURE__ */ k(() => z(Sc) ? [
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
	function Sl(e) {
		(z(O).nav.variant ?? "bar") !== e && Uo("nav", () => {
			e === "bar" ? delete z(O).nav.variant : z(O).nav.variant = e, z(O).nav.style && delete z(O).nav.style.radius;
		});
	}
	function wl(e) {
		Uo("nav", () => {
			z(O).nav.style ??= {}, e ? z(O).nav.style.glow = !0 : delete z(O).nav.style.glow;
		});
	}
	function Tl(e) {
		Uo("nav", () => {
			z(O).nav.style ??= {}, e ? delete z(O).nav.style.topGap : z(O).nav.style.topGap = !1;
		});
	}
	function El(e) {
		Uo("nav", () => {
			z(O).nav.style ??= {}, e === "standard" ? delete z(O).nav.style.hover : z(O).nav.style.hover = e;
		});
	}
	let Dl = null, Ol = {}, kl = {}, Al = !1, jl = /* @__PURE__ */ A(en([])), Ml = /* @__PURE__ */ A(en({})), Nl = /* @__PURE__ */ A(null), Pl = /* @__PURE__ */ A(""), Fl = /* @__PURE__ */ A("news"), Il = [
		["news", Y("collectionKind.news")],
		["notices", Y("collectionKind.notices")],
		["publications", Y("collectionKind.publications")],
		["products", Y("collectionKind.products")],
		["custom", Y("collectionKind.custom")]
	], Ll = null, Rl = {}, zl = {}, Bl = !1, Vl = /* @__PURE__ */ A(en([]));
	async function Hl() {
		let e = {
			version: 1,
			maler: []
		};
		try {
			e = await (await fetch("/content/maler.json")).json();
		} catch {}
		Ll = oa("urd-draft-templates", () => e, me, "urd-draft-maler"), j(Vl, [...Ll.data.maler ?? []], !0);
		for (let e of z(Vl)) {
			let t = null;
			try {
				t = await (await fetch(`/content/maler/${e}.json`)).json();
			} catch {}
			zl[e] = t, Rl[e] = oa(`urd-draft-template-${e}`, () => t, me, `urd-draft-mal-${e}`), (Rl[e].data?.schemaVersion ?? 1) > 1 && Rl[e].reset();
		}
		Bl = !0, Ul();
	}
	function Ul() {
		let e = z(Vl).map((e) => Rl[e]?.data ? {
			id: e,
			...JSON.parse(JSON.stringify(Rl[e].data))
		} : null).filter(Boolean).map(({ id: e, mal: t, section: n, blocks: r, page: i }) => ({
			id: e,
			name: t.name,
			kind: t.kind,
			section: n,
			blocks: r,
			page: i
		}));
		rt?.sendTemplates(e);
	}
	function Wl(e) {
		let t = Tc.includes(e.kind) ? e.kind : "section";
		return ql(t, e[t]);
	}
	function Gl(e) {
		let { section: t, block: n } = nn(e.sectionId, e.blockId);
		t && n?.sticky && Sn.some(([t]) => t === e.dock) && (ht(`sticky-dock:${e.blockId}`), n.sticky = {
			...n.sticky,
			dock: e.dock
		}, D.save(), ut(), rt?.sendSection(z(w), t), rn());
	}
	function Kl(e) {
		let t = e.blockIds ?? [], { section: n } = nn(e.sectionId, t[0]);
		if (!n || !t.length) return;
		ht(`sticky-group:${e.sectionId}`);
		let r = e.on ? Zs("stk") : null;
		for (let e of n.blocks) t.includes(e.id) && (e.sticky = r ? {
			offset: 16,
			until: null,
			...e.sticky,
			group: r
		} : null);
		tt(n, "block-edited"), D.save(), ut(), rt?.sendSection(z(w), n), rn(), T(Y(e.on ? "status.stickyGrouped" : "status.stickyUngrouped"));
	}
	async function ql(e, t) {
		if (!t || !Ll) return;
		let n = (await Dt({
			title: Y("canvas.templateNamePrompt"),
			placeholder: Y("ph.templateName")
		}))?.trim();
		if (!n) return;
		let r = Ec(n);
		if (!r) {
			T(Y("status.invalidName"), "error");
			return;
		}
		if (z(Vl).includes(r)) {
			T(Y("status.templateExists"), "error");
			return;
		}
		ht("templates");
		let i = {
			schemaVersion: 1,
			mal: {
				name: n,
				kind: e
			},
			[e]: t
		};
		Rl[r] = oa(`urd-draft-template-${r}`, () => null, me, `urd-draft-mal-${r}`), Rl[r].replace(i), Rl[r].save(), Ll.data.maler = [...z(Vl), r], Ll.save(), j(Vl, [...z(Vl), r], !0), T(Y("status.templateSaved", { name: n }), "ok"), ut(), Ul();
	}
	async function Jl(e) {
		let t = Rl[e.id]?.data?.mal;
		t && await Et({ title: Y("confirm.deleteTemplate", { name: t.name }) }) && (ht("templates"), z(ms) === e.id && j(ms, null), localStorage.removeItem(`urd-draft-template-${e.id}`), localStorage.removeItem(`urd-draft-mal-${e.id}`), delete Rl[e.id], Ll.data.maler = z(Vl).filter((t) => t !== e.id), Ll.save(), j(Vl, z(Vl).filter((t) => t !== e.id), !0), ut(), Ul());
	}
	async function Yl() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/collections.json")).json();
		} catch {}
		Dl = oa("urd-draft-collections", () => e, me, "urd-draft-samlinger"), j(jl, [...Dl.data.samlinger ?? []], !0);
		for (let e of z(jl)) {
			let t = null;
			try {
				t = await (await fetch(`/content/samlinger/${e}.json`)).json();
			} catch {}
			kl[e] = t, Ol[e] = oa(`urd-draft-collection-${e}`, () => t, me, `urd-draft-samling-${e}`), !t && !Ol[e].data && (Ol[e].replace({
				schemaVersion: 1,
				id: e,
				name: e,
				kind: "custom",
				entries: []
			}), Ol[e].save());
		}
		Al = !0, Xl();
	}
	function Xl(e = !0) {
		let t = {};
		for (let e of z(jl)) Ol[e] && (t[e] = JSON.parse(JSON.stringify(Ol[e].data)));
		j(Ml, t, !0), e && Zl();
	}
	function Zl() {
		rt?.sendCollections(Ke(z(Ml)) ?? {});
	}
	function Ql(e, t, n, r = !0) {
		let i = Ol[e];
		i && (ht(t), n(i.data), i.save(), ut(), Xl(r));
	}
	function $l(e) {
		Ol[e.collection] && mu(e.collection);
	}
	function eu(e) {
		return (new DOMParser().parseFromString(String(e ?? ""), "text/html").body.textContent ?? "").trim();
	}
	function nu(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r !== "title" || eu(i)) && Ql(t, `edit:collection:${t}:${n}:${r}`, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image");
	}
	function au(e, t, n) {
		let r = {
			schemaVersion: 1,
			id: e,
			name: t,
			kind: n,
			entries: []
		};
		Ol[e] = oa(`urd-draft-collection-${e}`, () => null, me, `urd-draft-samling-${e}`), Ol[e].replace(r), Ol[e].save(), Dl.data.samlinger = [...z(jl), e], Dl.save(), j(jl, [...z(jl), e], !0), j(Nl, e, !0), ut(), Xl();
	}
	function ou() {
		let e = z(Pl).trim();
		if (!e) return;
		let t = Wa(e);
		if (!t || z(jl).includes(t)) {
			T(Y(t ? "status.collectionExists" : "status.invalidName"), "error");
			return;
		}
		ht("collections"), au(t, e, z(Fl)), j(Pl, "");
	}
	function uu() {
		let e = Y("seed.productCatalogName"), t = Wa(e) || "collection", n = t;
		for (let e = 2; z(jl).includes(n); e += 1) n = `${t}-${e}`;
		ht("collections"), au(n, e, "products"), Tn(null, (e) => {
			e.props.collection = n;
		});
	}
	function pu(e) {
		ht("collections"), localStorage.removeItem(`urd-draft-collection-${e}`), localStorage.removeItem(`urd-draft-samling-${e}`), delete Ol[e], Dl.data.samlinger = z(jl).filter((t) => t !== e), Dl.save(), j(jl, z(jl).filter((t) => t !== e), !0), z(Nl) === e && j(Nl, null), ut(), Xl();
	}
	function mu(e) {
		Ql(e, `collection:${e}:add-entry`, (e) => {
			e.kind === "products" ? e.entries.push({
				id: Zs("entry"),
				title: Y("seed.newProduct"),
				text: ""
			}) : e.entries.unshift({
				id: Zs("entry"),
				title: Y("seed.newEntry"),
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function bu(e, t, n, r) {
		Ql(e, `edit:collection:${e}:${t}:${n}`, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function xu(e, t, n) {
		Ql(e, `collection:${e}:move-entry`, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function Su(e, t) {
		Ql(e, `collection:${e}:remove-entry`, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function Cu(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && bu(e, t, "image", (await Pi(r)).dataUrl);
	}
	function wu(e, t, n) {
		let r = n.split(",").map((e) => e.trim()).filter(Boolean);
		bu(e, t, "sizes", r.length ? r : "");
	}
	function Tu(e, t) {
		Ql(e, `collection:${e}:${t}:colors`, (e) => {
			let n = e.entries.find((e) => e.id === t);
			n && (n.colors = [...n.colors ?? [], { name: Y("ph.colorName") }]);
		});
	}
	function Eu(e, t, n, r, i) {
		Ql(e, `edit:collection:${e}:${t}:color:${n}:${r}`, (e) => {
			let a = e.entries.find((e) => e.id === t)?.colors?.[n];
			a && (r === "image" && !i ? delete a.image : i && (a[r] = i));
		});
	}
	async function Du(e, t, n, r) {
		let i = r.target.files?.[0];
		r.target.value = "", i && Eu(e, t, n, "image", (await Pi(i)).dataUrl);
	}
	function Ou(e, t, n) {
		Ql(e, `collection:${e}:${t}:colors`, (e) => {
			let r = e.entries.find((e) => e.id === t);
			r?.colors && (r.colors = r.colors.filter((e, t) => t !== n), r.colors.length || delete r.colors);
		});
	}
	function ku(e) {
		let t = Ol[e]?.data;
		if (!t) return;
		let n = URL.createObjectURL(new Blob([jc(t.entries)], { type: "text/csv" })), r = document.createElement("a");
		r.href = n, r.download = `${e}.csv`, r.click(), URL.revokeObjectURL(n);
	}
	async function Au(e, t) {
		let n = t.target.files?.[0];
		if (t.target.value = "", !n) return;
		let r = Pc(await n.text());
		if (!r) {
			T(Y("status.csvInvalid"), "error");
			return;
		}
		let i = /* @__PURE__ */ new Set();
		for (let e of r.entries) (!/^[a-z0-9][a-z0-9-]*$/.test(e.id) || i.has(e.id)) && (e.id = Zs("entry")), i.add(e.id);
		Ql(e, `collection:${e}:import`, (e) => {
			e.entries = r.entries;
		}), T(Y("status.csvImported", { count: String(r.entries.length) }), "ok");
	}
	let Nu = null, Lu, Ru = new Promise((e) => {
		Lu = e;
	}), Bu = /* @__PURE__ */ A(null), Vu = en({}), Hu = /* @__PURE__ */ A("0.0.0"), Uu = /* @__PURE__ */ A(""), Wu = /* @__PURE__ */ A(""), Ju = /* @__PURE__ */ A(en([])), Yu = /* @__PURE__ */ A(en([])), Xu = /* @__PURE__ */ A("pending"), Zu = () => [.../* @__PURE__ */ new Set([...z(Bu)?.enabled ?? [], ...z(Bu)?.disabled ?? []])];
	function Qu() {
		j(Bu, JSON.parse(JSON.stringify(Nu.data)), !0);
	}
	let ed = /* @__PURE__ */ A(null);
	async function nd() {
		try {
			let e = (await fetch("/urd.json", { cache: "no-store" })).headers.get("content-security-policy");
			if (!e) {
				j(ed, { unknown: !0 }, !0);
				return;
			}
			let t = (t) => new Set((e.split(";").map((e) => e.trim()).find((e) => e.startsWith(`${t} `)) ?? "").split(/\s+/).slice(1));
			j(ed, {
				frameSrc: t("frame-src"),
				connectSrc: t("connect-src"),
				scriptSrc: t("script-src")
			}, !0);
		} catch {
			j(ed, { unknown: !0 }, !0);
		}
	}
	function rd(e) {
		let t = [
			...(e.scriptSrc ?? []).map((e) => ["script-src", e]),
			...(e.connectSrc ?? []).map((e) => ["connect-src", e]),
			...(e.frameSrc ?? []).map((e) => ["frame-src", e])
		];
		if (!z(ed) || z(ed).unknown) return [];
		let n = {
			"script-src": z(ed).scriptSrc,
			"connect-src": z(ed).connectSrc,
			"frame-src": z(ed).frameSrc
		};
		return t.filter(([e, t]) => !n[e]?.has(t)).map(([e, t]) => `${e} ${t}`);
	}
	async function id() {
		nd();
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		j(Yu, e.enabled ?? [], !0), Nu = oa("urd-draft-plugins", () => e, me), Qu();
		try {
			j(Hu, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of Zu()) sd(e);
		ad(), Lu(), rt?.sendPlugins(Ke(z(Bu))?.enabled ?? []);
	}
	async function ad() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				od();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), j(Ju, (t ?? []).filter((e) => !Zu().includes(e)), !0);
			for (let e of z(Ju)) sd(e);
			j(Xu, "ok");
		} catch {
			od();
		}
	}
	function od() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				j(Ju, e.filter((e) => !Zu().includes(e)), !0);
				for (let e of z(Ju)) sd(e);
				j(Xu, "ok");
				return;
			}
		} catch {}
		j(Xu, "unavailable");
	}
	async function sd(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = Xs(t);
			Vu[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && Js(z(Hu), t.requiresEngine)
			};
		} catch {
			Vu[e] = {
				name: e,
				errors: [Y("plugin.manifestNotFound", { id: e })],
				satisfied: !1
			};
		}
	}
	function cd(e, t) {
		ht("plugins");
		let n = Nu.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), Nu.save(), ut(), Qu(), ld();
	}
	function ld() {
		z(ge) && (z(ge).src = z(ge).src);
	}
	function ud(e) {
		ht("plugins");
		let t = Nu.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), Nu.save(), ut(), Qu(), ld();
	}
	async function dd() {
		j(Wu, "");
		let e = z(Uu).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			j(Wu, Y("plugin.invalidId"), !0);
			return;
		}
		if (Zu().includes(e)) {
			j(Wu, Y("plugin.alreadyListed"), !0);
			return;
		}
		if (await sd(e), Vu[e].errors.length) {
			j(Wu, Y("plugin.invalidManifest", { errors: Vu[e].errors.join("; ") }), !0);
			return;
		}
		cd(e, !0), j(Uu, "");
	}
	function fd(e) {
		j(Ju, z(Ju).filter((t) => t !== e), !0), cd(e, !0);
	}
	function pd(e, t) {
		Uo(e, () => {
			z(O).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(z(O).footer);
		});
	}
	function md(e, t) {
		pd(`edit:footer-brand-${e}`, (n) => {
			n.brand ??= {}, t.trim() ? n.brand[e] = t : delete n.brand[e], !n.brand.title && !n.brand.tagline && !n.brand.logo && delete n.brand;
		});
	}
	function hd(e) {
		pd("footer", (t) => {
			t.brand ??= {}, e === "image" || e === "both" ? t.brand.mode = e : delete t.brand.mode;
		});
	}
	async function gd(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Pi(t);
			pd("footer", (t) => {
				t.brand ??= {}, t.brand.logo = e.dataUrl, t.brand.mode || (t.brand.mode = "both");
			});
		} catch {
			T(Y("status.imageReadErrorSvg"), "error");
		}
	}
	function _d() {
		pd("footer", (e) => {
			e.brand && (delete e.brand.logo, delete e.brand.mode, delete e.brand.logoHeight, !e.brand.title && !e.brand.tagline && delete e.brand);
		});
	}
	function vd(e) {
		pd("edit:footer-logo-height", (t) => {
			t.brand ??= {};
			let n = Number(e);
			Number.isFinite(n) && (t.brand.logoHeight = Math.min(160, Math.max(16, Math.round(n))));
		});
	}
	function yd(e) {
		pd("edit:footer-copyright", (t) => {
			e.trim() ? t.copyright = e : delete t.copyright;
		});
	}
	let bd = [
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
	function xd(e) {
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
					version: Mu.version ?? 1,
					props: {
						...Mu.defaults(),
						color: "accent",
						x: .12,
						y: 0,
						radius: .6,
						opacity: .45
					}
				}, {
					type: "grain",
					version: Pu.version ?? 1,
					props: {
						...Pu.defaults(),
						opacity: .08
					}
				}]
			}
		};
	}
	function Sd(e) {
		pd("footer-template", (t) => {
			let n = xd(e);
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
	function Cd(e) {
		pd("footer", (t) => {
			t[e] ??= [], t[e].push(z(O).pages[0] ? {
				label: Y("seed.link"),
				page: z(O).pages[0].id
			} : {
				label: Y("seed.link"),
				href: "https://"
			});
		});
	}
	function wd(e, t) {
		pd("footer", (n) => {
			n[e].splice(t, 1), n[e].length || delete n[e];
		});
	}
	function Td(e, t, n) {
		pd("footer", (r) => {
			let i = r[e], a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function Ed(e, t, n) {
		pd(`edit:footer-${e}-label-${t}`, (r) => {
			r[e][t].label = n;
		});
	}
	function Od(e, t, n) {
		pd("footer", (r) => {
			let i = r[e][t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function Pd(e, t, n) {
		pd(`edit:footer-${e}-href-${t}`, (r) => {
			r[e][t].href = n;
		});
	}
	function Fd(e) {
		pd("footer", (t) => {
			e === "center" ? t.columnsAlign = "center" : delete t.columnsAlign;
		});
	}
	function Id(e) {
		pd("footer", (t) => {
			e ? t.cta ??= {
				kind: "button",
				label: Y("seed.join")
			} : delete t.cta;
		});
	}
	function Ld(e, t) {
		pd(`edit:footer-cta-${e}`, (n) => {
			n.cta ??= {}, t === "" || t == null || t === !1 ? delete n.cta[e] : n.cta[e] = t;
		});
	}
	function Rd(e) {
		pd("footer", (t) => {
			t.cta ??= {}, e === "__href" ? (delete t.cta.page, t.cta.href = t.cta.href ?? "https://") : (t.cta.page = e, delete t.cta.href);
		});
	}
	function zd(e, t) {
		pd("footer", (n) => {
			let r = new Set(n.hideOn ?? []);
			t ? r.delete(e) : r.add(e), r.size ? n.hideOn = [...r] : delete n.hideOn;
		});
	}
	function Bd() {
		pd("footer", (e) => {
			e.columns ??= [], e.columns.push({
				title: Y("seed.column"),
				links: [{
					label: Y("seed.link"),
					page: z(O).pages[0].id
				}]
			});
		});
	}
	function Vd(e) {
		pd("footer", (t) => {
			t.columns.splice(e, 1), t.columns.length || delete t.columns;
		});
	}
	function Hd(e, t) {
		pd("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.columns.length || ([n.columns[e], n.columns[r]] = [n.columns[r], n.columns[e]]);
		});
	}
	function Ud(e, t) {
		pd(`edit:footer-col-title-${e}`, (n) => {
			n.columns[e].title = t;
		});
	}
	function Gd(e) {
		pd("footer", (t) => {
			t.columns[e].links ??= [], t.columns[e].links.push({
				label: Y("seed.link"),
				page: z(O).pages[0].id
			});
		});
	}
	function Kd(e, t) {
		pd("footer", (n) => {
			n.columns[e].links.splice(t, 1);
		});
	}
	function qd(e, t, n) {
		pd("footer", (r) => {
			let i = r.columns[e].links, a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function Jd(e, t, n) {
		pd(`edit:footer-link-label-${e}-${t}`, (r) => {
			r.columns[e].links[t].label = n;
		});
	}
	function Yd(e, t, n) {
		pd("footer", (r) => {
			let i = r.columns[e].links[t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function Xd(e, t, n) {
		pd(`edit:footer-link-href-${e}-${t}`, (r) => {
			r.columns[e].links[t].href = n;
		});
	}
	function Zd() {
		pd("footer", (e) => {
			e.social ??= [], e.social.push({
				icon: "facebook",
				url: "https://"
			});
		});
	}
	function Qd(e) {
		pd("footer", (t) => {
			t.social.splice(e, 1), t.social.length || delete t.social;
		});
	}
	function $d(e, t) {
		pd("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.social.length || ([n.social[e], n.social[r]] = [n.social[r], n.social[e]]);
		});
	}
	function ef(e, t) {
		pd("footer", (n) => {
			n.social[e].icon = t;
		});
	}
	function tf(e, t) {
		pd(`edit:footer-social-url-${e}`, (n) => {
			n.social[e].url = t;
		});
	}
	let nf = ao.filter(([e]) => e === "iconCat.social" || e === "iconCat.communication").flatMap(([, e]) => e.map((e) => [e, Y(io[e].labelKey)]));
	function rf(e, t) {
		Uo(`edit:nav-label-${e}`, () => {
			z(O).nav.items[e].label = t;
		});
	}
	function af(e, t) {
		Uo("nav", () => {
			let n = z(O).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function of(e, t) {
		Uo(`edit:nav-href-${e}`, () => {
			z(O).nav.items[e].href = t;
		});
	}
	function sf(e, t) {
		let n = e + t, r = z(O).nav.items;
		n < 0 || n >= r.length || Uo("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function cf(e) {
		Uo("nav", () => {
			z(O).nav.items.splice(e, 1);
		});
	}
	let lf = /* @__PURE__ */ A(""), df = /* @__PURE__ */ A(""), ff = /* @__PURE__ */ A(null);
	function pf(e) {
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
	function hf(e, t, n, r) {
		if (!z(df) || z(df) === t) return null;
		let i = e.getBoundingClientRect(), a = (r - i.top) / i.height, o = n - i.left, s = pf(z(df)), c = pf(t), l = s.list[s.index], u;
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
		}, gf(u, l, s);
	}
	function gf(e, t, n) {
		let r = pf(e.key);
		if (r.parent) {
			if (r.parent === t) return null;
			t.children?.length && (e = {
				key: e.key.split(".")[0],
				pos: "after"
			}, r = pf(e.key));
		}
		let i = r.list[r.index];
		if (e.pos === "into") {
			let n = i.children ?? [];
			return n.length && n[n.length - 1] === t ? null : e;
		}
		let a = r.parent ? r.parent.children : z(O).nav.items, o = a.filter((e) => e !== t).indexOf(i) + +(e.pos === "after");
		return a === n.list && o === n.index ? null : e;
	}
	function _f() {
		if (!z(df)) return {
			label: "",
			target: ""
		};
		let e = pf(z(df)), t = e.list[e.index], n = t.page ? z(O).pages.find((e) => e.id === t.page) : null;
		return {
			label: t.label,
			target: n ? n.title : t.href ?? Y("opt.noLink")
		};
	}
	function vf(e) {
		z(ff) && e?.dataTransfer?.dropEffect !== "none" && xf(z(ff).key), j(df, ""), j(ff, null);
	}
	xn(() => {
		if (!z(df)) return;
		let e = (e) => e.preventDefault();
		return window.addEventListener("dragover", e), window.addEventListener("drop", e), () => {
			window.removeEventListener("dragover", e), window.removeEventListener("drop", e);
		};
	});
	let yf = "application/x-urd-nav-row";
	function bf(e) {
		if (!z(df)) return;
		let t = [...e.currentTarget.querySelectorAll(".nav-item:not(.ghost)")];
		if (!t.length) return;
		let n = t.find((t) => {
			let n = t.getBoundingClientRect();
			return e.clientY >= n.top && e.clientY <= n.bottom;
		}), r = null;
		if (n) r = hf(n, n.dataset.key, e.clientX, e.clientY);
		else {
			let n = pf(z(df)), i = n.list[n.index], a = t.find((t) => {
				let n = t.getBoundingClientRect();
				return n.top + n.height / 2 > e.clientY;
			});
			if (a) r = a.dataset.key === z(df) ? null : gf({
				key: a.dataset.key,
				pos: "before"
			}, i, n);
			else {
				let e = [...t].reverse().find((e) => !e.classList.contains("child"));
				r = e.dataset.key === z(df) ? null : gf({
					key: e.dataset.key,
					pos: "after"
				}, i, n);
			}
		}
		if (!r) {
			j(ff, null);
			return;
		}
		e.preventDefault(), (z(ff)?.key !== r.key || z(ff)?.pos !== r.pos) && j(ff, r, !0);
	}
	function xf(e) {
		let t = z(df), n = z(ff);
		if (j(df, ""), j(ff, null), t && n && n.key === e && t !== e) {
			{
				let r = pf(t), i = pf(e), a = r.list[r.index];
				if (i.parent && (i.parent === a || a.children?.length) || n.pos === "into" && a.children?.length) return;
			}
			Uo("nav", () => {
				let r = z(O).nav.items, i = pf(t), a = pf(e), o = i.list[i.index], s = a.list[a.index];
				if (o !== s) {
					if (i.list.splice(i.index, 1), i.parent && i.parent.children.length === 0 && (delete i.parent.children, !i.parent.page && !i.parent.href && (i.parent.page = z(O).pages[0].id)), n.pos === "into") s.children ??= [], s.children.push(o);
					else {
						let e = a.parent ? a.parent.children : r, t = e.indexOf(s) + +(n.pos === "after");
						e.splice(t, 0, o);
					}
					!o.page && o.href == null && !o.children?.length && (o.page = z(O).pages[0].id);
				}
			}), j(lf, "");
		}
	}
	let Sf = "<svg width=\"10\" height=\"16\" viewBox=\"0 0 10 16\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"3\" cy=\"3\" r=\"1.3\"/><circle cx=\"7\" cy=\"3\" r=\"1.3\"/><circle cx=\"3\" cy=\"8\" r=\"1.3\"/><circle cx=\"7\" cy=\"8\" r=\"1.3\"/><circle cx=\"3\" cy=\"13\" r=\"1.3\"/><circle cx=\"7\" cy=\"13\" r=\"1.3\"/></svg>";
	function Cf() {
		Uo("nav", () => {
			z(O).nav.items.push({
				label: Y("seed.link"),
				page: z(O).pages[0].id
			});
		});
	}
	function wf(e) {
		Uo("nav", () => {
			let t = z(O).nav.items[e];
			t.children ??= [], t.children.push({
				label: Y("seed.link"),
				page: z(O).pages[0].id
			});
		});
	}
	function Tf(e, t, n) {
		Uo(`edit:nav-child-label-${e}-${t}`, () => {
			z(O).nav.items[e].children[t].label = n;
		});
	}
	function Ef(e, t, n) {
		Uo("nav", () => {
			let r = z(O).nav.items[e].children[t];
			n === "__href" ? (delete r.page, r.href = r.href ?? "https://") : (r.page = n, delete r.href);
		});
	}
	function Df(e, t, n) {
		Uo(`edit:nav-child-href-${e}-${t}`, () => {
			z(O).nav.items[e].children[t].href = n;
		});
	}
	function Of(e, t, n) {
		let r = t + n, i = z(O).nav.items[e].children;
		r < 0 || r >= i.length || Uo("nav", () => {
			[i[t], i[r]] = [i[r], i[t]];
		});
	}
	function kf(e, t) {
		Uo("nav", () => {
			let n = z(O).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = z(O).pages[0].id));
		});
	}
	function Af(e, t) {
		Uo(`edit:theme-color-${e}`, () => {
			z(O).theme.tokens.color[e] = t, z(O).theme.alt?.auto && (z(O).theme.alt.tokens.color = Yf());
		});
	}
	function jf(e, t) {
		return e === "accent-text" ? ce(mp(t.accent ?? "#000000", t)) : t.bg;
	}
	let Mf = /* @__PURE__ */ k(() => !z(O)?.theme?.tokens?.color?.["accent-text"] && !z(O)?.theme?.alt?.tokens?.color?.["accent-text"]), Ff = /* @__PURE__ */ A(null), If = /* @__PURE__ */ A(!1), Lf = /* @__PURE__ */ A(!1), Vf = (e) => e.length > 0 && [...e].every((e) => e.open);
	function Uf() {
		let e = z(Ff)?.querySelectorAll("details.group") ?? [];
		j(If, e.length > 0), j(Lf, Vf(e), !0);
	}
	xn(() => {
		z(Bt), fr().then(Uf);
	});
	function Wf() {
		let e = !z(Lf);
		z(Ff)?.querySelectorAll("details.group").forEach((t) => {
			t.open = e;
		}), Uf();
	}
	function Gf(e) {
		for (let t of e.querySelectorAll("details.group")) {
			let e = t.querySelector(":scope > summary");
			if (!e || e.querySelector(".fold-sub")) continue;
			let n = () => t.querySelectorAll(":scope > .group-items details.group");
			if (!n().length) continue;
			let r = document.createElement("button");
			r.type = "button", r.className = "fold-sub fold-toggle", r.innerHTML = C.foldToggle;
			let i = () => {
				let e = Vf(n());
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
	xn(() => {
		let e = z(Ff);
		if (!e) return;
		let t = new MutationObserver(() => {
			Gf(e), Uf();
		});
		return t.observe(e, {
			childList: !0,
			subtree: !0
		}), e.addEventListener("toggle", Uf, !0), Gf(e), () => {
			t.disconnect(), e.removeEventListener("toggle", Uf, !0);
		};
	});
	function Q(e) {
		Uo("edit:theme-color-accent-text", () => {
			e ? (delete z(O).theme.tokens.color["accent-text"], z(O).theme.alt?.tokens?.color && delete z(O).theme.alt.tokens.color["accent-text"]) : (z(O).theme.tokens.color["accent-text"] = jf("accent-text", z(ma)), z(O).theme.alt?.auto && (z(O).theme.alt.tokens.color = Yf()));
		});
	}
	function Kf(e, t) {
		Uo("theme", () => {
			z(O).theme.tokens.font[e] = t;
		});
	}
	function qf(e, t) {
		Uo("theme", () => {
			z(O).theme.tokens.radius[e] = t;
		});
	}
	function Jf(e) {
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
	function Yf() {
		return Object.fromEntries(Object.entries(z(O).theme.tokens.color).map(([e, t]) => [e, Jf(t)]));
	}
	function Xf(e, t) {
		Uo(`edit:theme-alt-${e}`, () => {
			z(O).theme.alt.tokens.color[e] = t, z(O).theme.alt.auto = !1;
		});
	}
	function ap(e) {
		Uo("theme", () => {
			e === "light" ? delete z(O).theme.scheme : z(O).theme.scheme = e;
		});
	}
	function op(e) {
		Uo("theme", () => {
			e ? z(O).theme.alt = {
				auto: !0,
				tokens: { color: Yf() }
			} : delete z(O).theme.alt;
		});
	}
	function sp(e) {
		Uo("theme", () => {
			z(O).theme.alt ??= { tokens: { color: Yf() } }, z(O).theme.alt.auto = e, e && (z(O).theme.alt.tokens.color = Yf());
		});
	}
	function up(e) {
		let t = z(O).theme.tokens.font[e];
		return [...zf.some(([, e]) => e === t) ? [] : [[t, Y("opt.customFont")]], ...zf.map(([e, t]) => [t, Y(e)])];
	}
	let fp = (e) => parseInt(e, 10) || 0;
	function pp(e, t) {
		qf(e, `${t}px`);
	}
	let mp = (e, t) => e && t && t[e] ? t[e] : e, hp = [
		"bg",
		"surface",
		"text",
		"accent",
		"accent-text"
	], gp = [
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
	function _p(e) {
		Uo("theme", () => {
			let t = e.scheme === "dark", n = t ? e.dark : e.light, r = t ? e.light : e.dark;
			for (let e of hp) z(O).theme.tokens.color[e] = n[e];
			t ? z(O).theme.scheme = "dark" : delete z(O).theme.scheme, z(O).theme.alt = { tokens: { color: { ...r } } };
		});
	}
	let vp = /* @__PURE__ */ k(() => {
		if (!z(O)) return null;
		let e = z(O).theme.tokens.color, t = z(O).theme.alt?.tokens?.color ?? {}, n = z(O).theme.scheme === "dark";
		return gp.find((r) => {
			let i = n ? r.dark : r.light, a = n ? r.light : r.dark;
			return hp.every((n) => e[n] === i[n] && t[n] === a[n]);
		})?.id ?? null;
	}), yp = 0;
	async function bp() {
		z(ye) && (yp = z(Ff)?.scrollTop ?? 0), j(ye, !z(ye)), rt?.sendChrome(z(ye)), z(ye) && (await fr(), requestAnimationFrame(() => {
			z(Ff) && (z(Ff).scrollTop = yp);
		}));
	}
	function xp(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (ht(`edit:${e.blockId}`), n.props = e.props, D.save(), ut(), z(M)?.blockId === e.blockId && rn(), e.rerender && rt?.sendSection(z(w), t), j(de, ""));
	}
	function $(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		ht(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && tt(t, "desktop-changed-after-mobile"), D.save(), ut(), z(M)?.blockId === e.blockId && rn(), r === "desktop" && n.type === "calendar" && !e.coalesce && On(e.sectionId, e.blockId, !0);
	}
	function Sp(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n?.frames?.desktop && n.frames.desktop.h !== e.h && (e.growOnly && e.h < n.frames.desktop.h || (D.amendBaseline((t) => {
			let n = t.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
			n?.frames?.desktop && (n.frames.desktop.h = e.h);
		}), D.hasDraft() && ht(`edit:${e.blockId}`), n.frames.desktop.h = e.h, D.save(), ut(), z(M)?.blockId === e.blockId && rn(), rt?.sendSection(z(w), t)));
	}
	function Cp(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			if (ht("mobile-reset"), e.blockId) {
				let n = t.blocks.find((t) => t.id === e.blockId);
				n && (n.frames.mobile = null);
			} else for (let e of t.blocks) e.frames.mobile = null;
			!et(t) && t.responsive?.mobile && (t.responsive.mobile.attention = null), D.save(), ut(), Ye(), rt?.sendSection(z(w), t);
		}
	}
	function wp(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && typeof e.mobileOrder == "number" && (ht("mobile-order"), n.mobileOrder = e.mobileOrder, D.save(), ut(), rt?.sendSection(z(w), t));
	}
	function Tp(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (ht("review-done"), t.responsive.mobile.attention = null, D.save(), ut(), Ye());
	}
	function Ep(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (ht("block-flag"), typeof e.decor == "boolean" && (n.decor = e.decor), typeof e.hideMobile == "boolean" && (n.hideMobile = e.hideMobile), D.save(), ut(), typeof e.hideMobile == "boolean" && z(Me) === "mobile" && rt?.sendSection(z(w), t), z(M)?.blockId === e.blockId && rn());
	}
	function Dp(e) {
		ht("add-section"), e.section.id || (e.section.id = Zs("sec")), D.data.sections.splice(e.index, 0, e.section), D.save(), ut(), rt?.sendPage(z(w), D.data), j(Rr, e.section.id, !0), qr(e.section), j(Bt, "properties");
	}
	function Uv(e) {
		let t = D.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (ht("move-section"), [t[n], t[r]] = [t[r], t[n]], D.save(), ut(), rt?.sendPage(z(w), D.data));
	}
	function Wv(e) {
		ht("delete-section"), e.sectionId === z(Rr) && (j(Rr, null), j(zr, null)), z(M)?.sectionId === e.sectionId && j(M, null), D.data.sections = D.data.sections.filter((t) => t.id !== e.sectionId), D.save(), ut(), rt?.sendPage(z(w), D.data);
	}
	function Gv(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			ht("section-size"), t.size = {
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
			e.moves?.length && (tt(t, "section-height"), z(M)?.sectionId === e.sectionId && rn()), e.sectionId === z(Rr) && j(Br, e.minHeight, !0), D.save(), ut();
		}
	}
	function Kv(e) {
		let t = D.data.sections.find((t) => t.id === e.fromSectionId), n = D.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		t && n && r && (ht("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), tt(t, "block-moved"), tt(n, "block-moved"), D.save(), ut(), Ye(), rt?.sendSection(z(w), t), rt?.sendSection(z(w), n), z(M)?.blockId === e.blockId && (j(M, {
			...z(M),
			sectionId: e.toSectionId
		}, !0), rn()));
	}
	function qv(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		if (!t) return;
		let n = e.blockIds ?? [e.blockId];
		ht("delete-block"), t.blocks = t.blocks.filter((e) => !n.includes(e.id)), n.includes(z(M)?.blockId) && j(M, null), tt(t, "block-deleted"), D.save(), ut(), rt?.sendSection(z(w), t);
	}
	let Jv = {
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
				fields: Ns()
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
	function Yv(e) {
		let t = Jv[e];
		return t ? {
			id: Zs("blk"),
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
	function Xv(e) {
		rt ? rt.sendPlaceBlock(e) : Zv(Pa()?.id, e);
	}
	function Zv(e, t) {
		let n = D.data.sections.find((t) => t.id === e) ?? D.data.sections[0];
		if (!n) return;
		ht("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), tt(n, "block-added"), D.save(), ut(), rt?.sendSection(z(w), n);
	}
	function Qv(e, t, n, r) {
		let i = D.data.sections.find((t) => t.id === e);
		if (!i || !t?.length) return;
		ht("add-blocks");
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
		}), tt(i, "block-added"), D.save(), ut(), rt?.sendSection(z(w), i);
	}
	function $v(e) {
		Xv(Yv(e));
	}
	let ey = /* @__PURE__ */ A(en([])), ty = { map: [
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
	function ny(e, t = {}) {
		let n = Ke(e);
		Xv({
			id: Zs("blk"),
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
	let ry = /* @__PURE__ */ A("");
	function iy() {
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
		for (let t of z(Vl)) {
			let n = Rl[t]?.data?.mal;
			n?.kind === "blocks" && e.push({
				label: n.name,
				act: "template",
				id: t
			});
		}
		for (let t of z(ey)) if (t.variants?.length) for (let n of t.variants) e.push({
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
	function ay(e) {
		e.act === "block" ? $v(e.kind) : e.act === "plugin" ? ny(e.entry, e.props ?? {}) : e.act === "template" && rt?.sendInsertTemplate(e.id);
	}
	function oy(e) {
		let t = Yv(e.kind);
		if (t) {
			if (e.at && typeof e.at.x == "number" && typeof e.at.y == "number") {
				let n = D.data.sections.find((t) => t.id === e.sectionId)?.grid ?? z(O).grid, r = Bf({
					x: e.at.x,
					y: e.at.y,
					w: t.frames.desktop.w,
					h: t.frames.desktop.h,
					grid: n
				});
				t.frames.desktop.x = r.x, t.frames.desktop.y = r.y;
			} else t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40;
			Zv(e.sectionId, t), rt?.sendSelect(t.id), e.kind === "image" && T(Y("status.imageBlockAdded")), e.kind === "gallery" && T(Y("status.galleryBlockAdded"));
		}
	}
	async function sy(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		T(Y("status.compressingImage"));
		let n;
		try {
			n = await Pi(t);
		} catch (e) {
			T(Fi(e), "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (z(ge)?.clientWidth ?? 1280));
		Xv({
			id: Zs("blk"),
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: Wa(t.name).replaceAll("-", " "),
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
	async function cy(e) {
		let t = [], n = 0, r = 0;
		for (let i of e) try {
			let e = await Pi(i);
			e.bytes > 4e5 && (r += 1), t.push({
				src: e.dataUrl,
				alt: Wa(i.name).replaceAll("-", " "),
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
	function ly(e, t, n) {
		t ? T(Y("status.imagesReadFailed", { n: t }), "error") : n ? T(Y("status.imagesLarge", { n }), "error") : T(e ? "" : Y("status.noImagesAdded"));
	}
	async function uy(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		T(Y("status.compressingImages"));
		let { images: n, failed: r, big: i } = await cy(t);
		n.length && Tn("gallery-add", (e) => {
			e.props.images.push(...n);
		}), ly(n.length, r, i);
	}
	async function dy(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		T(Y("status.compressingImages"));
		let { images: n, failed: r, big: i } = await cy(t);
		if (!n.length) {
			ly(0, r, i);
			return;
		}
		let a = Yv("gallery");
		a.props.images = n, Xv(a), ly(n.length, r, i);
	}
	function fy(e, t) {
		Tn("gallery-move", (n) => {
			let r = e + t;
			r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
		});
	}
	function py(e) {
		Tn("gallery-remove", (t) => {
			t.props.images.splice(e, 1);
		});
	}
	function my(e, t, n) {
		Tn(`edit:${z(M).blockId}:img${e}-${t}`, (r) => {
			r.props.images[e][t] = n;
		});
	}
	function hy(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/") && !i?.startsWith("data:audio/") && !i?.startsWith("data:video/")) return;
		let a = i.split(",", 2)[1], o = `media/${Wa(n || "image")}-${Ga(a)}.${Ua(i)}`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function gy(e, t) {
		hy(e, "image", e.title, t);
		for (let n of e.colors ?? []) hy(n, "image", `${e.title}-${n.name}`, t);
	}
	function _y(e, t) {
		for (let n of e?.layers ?? []) {
			if (n.type === "image" && hy(n.props, "src", "background", t), n.type === "slideshow") for (let e of n.props.images ?? []) hy(e, "src", "background", t);
			n.type === "video" && (hy(n.props, "src", "video", t), hy(n.props, "poster", "plakat", t));
		}
	}
	function vy(e, t) {
		if (e.type === "image" && hy(e.props, "src", e.props.alt, t), e.type === "icon" && hy(e.props, "image", "ikon", t), e.type === "gallery") for (let n of e.props.images ?? []) hy(n, "src", n.alt || "gallery", t);
		e.type === "audio" && hy(e.props, "src", e.props.title || "lyd", t), e.type === "video" && (hy(e.props, "src", e.props.title || "video", t), hy(e.props, "poster", "poster", t));
	}
	function yy(e, t) {
		_y(e.background, t);
		for (let n of e.blocks) vy(n, t);
	}
	function by(e) {
		let t = [];
		e.meta?.og && hy(e.meta.og, "image", "share", t);
		for (let n of e.sections) yy(n, t);
		return t;
	}
	function xy(e) {
		let t = [], n = e.nav?.logo;
		if (n?.type === "image" && hy(n, "value", "logo", t), n?.type === "both" && hy(n, "image", "logo", t), e.nav?.style && hy(e.nav.style, "image", "menu", t), _y(e.nav?.style?.background, t), _y(e.footer?.background, t), e.footer?.brand && hy(e.footer.brand, "logo", "footer-logo", t), e.nav?.launcher) {
			hy(e.nav.launcher, "image", "snarvei", t);
			for (let n of e.nav.launcher.links ?? []) hy(n, "image", "snarvei", t);
		}
		return hy(e.site, "icon", "ikon", t), t;
	}
	let Sy = /* @__PURE__ */ A(!1), Cy = /* @__PURE__ */ A(null);
	function wy() {
		j(Sy, !z(Sy));
	}
	function Ty() {
		j(Sy, !1);
		try {
			Ey(), T(Y("ui.discarded"), "info");
		} catch (e) {
			console.error("Urd: discard failed", e), T(String(e?.message ?? e), "error");
		}
	}
	xn(() => {
		if (!z(Sy)) return;
		let e = (e) => {
			if (!z(Cy)?.contains(e.target)) {
				j(Sy, !1);
				return;
			}
			e.target instanceof Element && e.target.closest(".discard-confirm") && (e.preventDefault(), e.stopPropagation(), Ty());
		}, t = (e) => {
			e.key === "Escape" && j(Sy, !1);
		}, n = !1, r = (e) => {
			n = !!z(Cy)?.contains(e.target);
		}, i = () => {
			n = !1;
		}, a = () => {
			n || j(Sy, !1);
		};
		return window.addEventListener("pointerdown", r, !0), window.addEventListener("pointerup", i, !0), window.addEventListener("click", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", a), () => {
			window.removeEventListener("pointerdown", r, !0), window.removeEventListener("pointerup", i, !0), window.removeEventListener("click", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", a);
		};
	});
	function Ey() {
		ht("discard");
		for (let e of z(O).pages) e.id !== z(w) && !ct.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = D.reset();
		if (nt.reset(), Nu && (Nu.reset(), Qu()), Dl) {
			Dl.reset(), j(jl, [...Dl.data.samlinger ?? []], !0);
			for (let e of Object.keys(Ol)) z(jl).includes(e) ? Ol[e].reset() : delete Ol[e];
			Xl();
		}
		if (Ll) {
			Ll.reset(), j(Vl, [...Ll.data.maler ?? []], !0);
			for (let e of Object.keys(Rl)) z(Vl).includes(e) ? Rl[e].reset() : (localStorage.removeItem(`urd-draft-template-${e}`), localStorage.removeItem(`urd-draft-mal-${e}`), delete Rl[e]);
			Ul();
		}
		it(), j(ve, {
			snap: !0,
			...z(O).grid
		}, !0), ut(), j(de, ""), at(), z(O).pages.some((e) => e.id === z(w)) ? rt?.sendPage(z(w), e) : yo(z(O).pages[0].id);
	}
	async function Dy() {
		if (eo) {
			T(Y("status.revertReloadBeforePublish"), "error");
			return;
		}
		if (z(uo)) {
			T(Y("update.publishBlocked"), "error");
			return;
		}
		T(Y("status.publishing"));
		let e = [], t = [], n = [], r = [];
		for (let i of z(O).pages) {
			let a = `urd-draft-${i.id}`, o = ct.has(i.id) || !z(le).pages.some((e) => e.id === i.id), s = null;
			if (i.id === z(w) && (D.hasDraft() || o)) s = D.data;
			else if (i.id !== z(w)) {
				let e = localStorage.getItem(a);
				if (e) try {
					s = Gs(JSON.parse(e), nt.data);
				} catch {}
			}
			if (!s && o && (s = vo(i)), !s) continue;
			let c = JSON.parse(JSON.stringify(s));
			e.push(...by(c)), e.push({
				path: i.file,
				content: JSON.stringify(c, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (nt.hasDraft()) {
			let r = JSON.parse(JSON.stringify(z(O)));
			e.push(...xy(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), e.push({
				path: "content/theme.css",
				content: fu(r.theme),
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(z(le).theme, z(O).theme) || t.push(Y("publish.part.theme")), i(z(le).nav, z(O).nav) || t.push(Y("publish.part.nav")), i(z(le).footer, z(O).footer) || t.push(Y("publish.part.footer")), i(z(le).pages, z(O).pages) || t.push(Y("publish.part.pages")), i(z(le).grid, z(O).grid) || t.push(Y("publish.part.grid")), (z(le).site.icon ?? null) !== (z(O).site.icon ?? null) && t.push(Y("publish.part.icon"));
			let { icon: a, ...o } = z(le).site, { icon: s, ...c } = z(O).site;
			i(o, c) || t.push(Y("publish.part.siteInfo"));
		}
		let i = Object.entries(Ol).filter(([, e]) => e.hasDraft());
		if (i.length || Dl?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) gy(t, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), Rc.includes(i.kind) && e.push({
					path: `content/samlinger/${t}.xml`,
					content: zc({
						title: i.name ?? t,
						origin: location.origin,
						path: `/content/samlinger/${t}.xml`,
						items: i.entries.map((e) => ({
							id: e.id,
							title: eu(e.title),
							text: eu(e.text),
							date: e.date,
							href: e.href
						}))
					}),
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (Dl?.hasDraft()) {
				e.push({
					path: "content/collections.json",
					content: JSON.stringify(Dl.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-collections", "urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/collections.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!z(jl).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push(Y("publish.part.collections"));
		}
		let a = Object.entries(Rl).filter(([, e]) => e.hasDraft());
		if (a.length || Ll?.hasDraft()) {
			for (let [t, r] of a) {
				let i = JSON.parse(JSON.stringify(r.data));
				i.section && yy(i.section, e);
				for (let t of i.blocks ?? []) vy(t, e);
				for (let t of i.page?.sections ?? []) yy(t, e);
				e.push({
					path: `content/maler/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-mal-${t}`);
			}
			if (Ll?.hasDraft()) {
				e.push({
					path: "content/maler.json",
					content: JSON.stringify(Ll.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-templates", "urd-draft-maler");
				let t = { maler: [] };
				try {
					t = await (await fetch("/content/maler.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.maler ?? []) {
					let t = `content/maler/${n}.json`;
					!z(Vl).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push(Y("publish.part.templates"));
		}
		Nu?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(Nu.data, null, 2) + "\n",
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
			content: Ic(z(O).pages, location.origin),
			encoding: "utf-8"
		}), e.push({
			path: "robots.txt",
			content: Lc(location.origin),
			encoding: "utf-8"
		});
		let o = new Set(e.map((e) => e.path)), s = (t) => {
			o.has(t) || e.push({
				path: t,
				delete: !0
			});
		};
		for (let e of z(le).pages) {
			let t = z(O).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && s(`${e.path.slice(1)}/index.html`) : (s(e.file), e.path !== "/" && s(`${e.path.slice(1)}/index.html`));
		}
		let c = await Ja(e);
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
			t ? Ka = t : qa(), by(D.data), xy(z(O));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) ct.add(e);
			if (j(le, JSON.parse(JSON.stringify(z(O))), !0), nt = oa("urd-draft-site", () => z(le), me), it(), Nu) {
				let e = JSON.parse(JSON.stringify(Nu.data));
				Nu = oa("urd-draft-plugins", () => e, me), Qu();
			}
			if (Dl) {
				for (let e of Object.values(Ol)) for (let t of e.data.entries) gy(t, []);
				let e = JSON.parse(JSON.stringify(Dl.data));
				Dl = oa("urd-draft-collections", () => e, me, "urd-draft-samlinger"), kl = {};
				for (let e of z(jl)) {
					if (!Ol[e]) continue;
					let t = JSON.parse(JSON.stringify(Ol[e].data));
					kl[e] = t, Ol[e] = oa(`urd-draft-collection-${e}`, () => t, me, `urd-draft-samling-${e}`);
				}
				Xl();
			}
			if (Ll) {
				for (let e of Object.values(Rl)) {
					e.data?.section && yy(e.data.section, []);
					for (let t of e.data?.blocks ?? []) vy(t, []);
					for (let t of e.data?.page?.sections ?? []) yy(t, []);
				}
				let e = JSON.parse(JSON.stringify(Ll.data));
				Ll = oa("urd-draft-templates", () => e, me, "urd-draft-maler"), zl = {};
				for (let e of z(Vl)) {
					if (!Rl[e]) continue;
					let t = JSON.parse(JSON.stringify(Rl[e].data));
					zl[e] = t, Rl[e] = oa(`urd-draft-template-${e}`, () => t, me, `urd-draft-mal-${e}`);
				}
				Ul();
			}
			j(ve, {
				snap: !0,
				...z(O).grid
			}, !0);
			let i = JSON.parse(JSON.stringify(D.data));
			D = oa(`urd-draft-${z(w)}`, () => i, me), ct.has(z(w)) && he(`urd-draft-${z(w)}`, JSON.stringify(i)), ut(), T(Y("status.published"), "info"), so(e);
		} else if (u?.status === 401) {
			let e = await u.json().catch(() => null);
			T(e?.code === "loginExpired" ? Y("status.loginExpired") : Y("status.loginRequired", { reason: Ji(e) ?? Y("status.unknownReason") }), "error"), await za();
		} else u?.status === 403 ? T(Ji(await u.json().catch(() => null)) ?? Y("status.noPublishAccess"), "error") : u?.status === 409 ? T(Y("status.publishRace"), "error") : T(u ? Ji(await u.json().catch(() => null)) ?? Y("status.publishFailed") : Y("status.publishUnavailable"), "error");
	}
	wt();
	var Oy = Hv();
	Cr("keydown", tn, Ct), Cr("pointerdown", tn, St);
	var ky = P(Oy), Ay = N(ky), jy = (e) => {
		var t = og(), n = N(t);
		G(n, () => C.pencil);
		var r = I(n);
		E(t), R((e, n) => {
			J(t, "title", e), U(r, ` ${n ?? ""}`);
		}, [() => Y("tip.backToEdit"), () => Y("ui.edit")]), B("click", t, bp), H(e, t);
	};
	W(Ay, (e) => {
		z(ye) || e(jy);
	});
	var My = I(Ay, 2);
	let Ny;
	var Py = N(My), Fy = N(Py), Iy = (e) => {
		var t = _g(), n = P(t), r = F(n, !0), i = I(n, 2), a = N(i), o = (e) => {
			var t = lg(), n = N(t);
			let r;
			var i = N(n);
			G(i, () => C[`device_${z(Ae)}`]), G(I(i), () => C.caret), E(n);
			var a = I(n, 2), o = (e) => {
				var t = cg();
				Jr(t, 21, () => z(De), (e) => e.id, (e, t) => {
					var n = sg();
					let r;
					var i = N(n);
					G(i, () => C[`device_${z(t).id}`]);
					var a = I(i);
					E(n), R((e, i) => {
						r = gi(n, 1, "ghost svelte-1n46o8q", null, r, { active: z(Ae) === z(t).id }), J(n, "title", e), U(a, ` ${i ?? ""}`);
					}, [() => ke(z(t)), () => Y(`lbl.device.${z(t).id}`)]), B("click", n, () => {
						j(Ae, z(t).id, !0), j(ko, null);
					}), H(e, n);
				}), E(t), H(e, t);
			};
			W(a, (e) => {
				z(ko) === "device" && e(o);
			}), E(t), R((e) => {
				r = gi(n, 1, "ghost svelte-1n46o8q", null, r, { active: z(ko) === "device" }), J(n, "title", e);
			}, [() => Y("lbl.group.device")]), B("click", n, () => j(ko, z(ko) === "device" ? null : "device", !0)), H(e, t);
		}, s = (e) => {
			var t = dg(), n = P(t), r = F(n, !0), i = I(n, 2);
			Jr(i, 21, () => z(De), (e) => e.id, (e, t) => {
				var n = ug();
				let r;
				G(n, () => C[`device_${z(t).id}`], !0), E(n), R((e) => {
					r = gi(n, 1, "ghost svelte-1n46o8q", null, r, { active: z(Ae) === z(t).id }), J(n, "title", e);
				}, [() => ke(z(t))]), B("click", n, () => j(Ae, z(t).id, !0)), H(e, n);
			}), E(i), R((e) => U(r, e), [() => Y("lbl.group.device")]), H(e, t);
		};
		W(a, (e) => {
			jo.device ? e(o) : e(s, -1);
		});
		var c = I(a, 2), l = (e) => {
			var t = pg(), n = N(t);
			let r;
			var i = N(n), a = F(i);
			G(I(i), () => C.caret), E(n);
			var o = I(n, 2), s = (e) => {
				var t = fg(), n = N(t), r = N(n);
				G(r, () => C.minus, !0), E(r);
				var i = I(r, 2), a = F(i), o = I(i, 2);
				G(o, () => C.plus, !0), E(o), E(n);
				var s = I(n, 2);
				let c;
				var l = N(s);
				G(l, () => C.fit);
				var u = I(l);
				E(s), E(t), R((e, t, n, l, d, f) => {
					J(r, "title", e), J(i, "title", t), U(a, `${n ?? ""}%`), J(o, "title", l), c = gi(s, 1, "ghost svelte-1n46o8q", null, c, { active: z(Ie) === "fit" }), J(s, "title", d), U(u, ` ${f ?? ""}`);
				}, [
					() => Y("tip.zoomOut"),
					() => Y("tip.zoomCurrent"),
					() => Math.round(z(Ve) * 100),
					() => Y("tip.zoomIn"),
					() => Y("tip.zoomFit"),
					() => Y("lbl.zoom.fit")
				]), B("click", r, () => He(-1)), B("click", o, () => He(1)), B("click", s, () => j(Ie, "fit")), H(e, t);
			};
			W(o, (e) => {
				z(ko) === "zoom" && e(s);
			}), E(t), R((e, t) => {
				r = gi(n, 1, "ghost svelte-1n46o8q", null, r, { active: z(ko) === "zoom" }), J(n, "title", e), U(a, `${t ?? ""}%`);
			}, [() => Y("lbl.group.zoom"), () => Math.round(z(Ve) * 100)]), B("click", n, () => j(ko, z(ko) === "zoom" ? null : "zoom", !0)), H(e, t);
		}, u = (e) => {
			var t = mg(), n = P(t), r = F(n, !0), i = I(n, 2), a = N(i);
			G(a, () => C.minus, !0), E(a);
			var o = I(a, 2), s = F(o), c = I(o, 2);
			G(c, () => C.plus, !0), E(c);
			var l = I(c, 2);
			let u;
			G(l, () => C.fit, !0), E(l), E(i), R((e, t, n, i, d, f) => {
				U(r, e), J(a, "title", t), J(o, "title", n), U(s, `${i ?? ""}%`), J(c, "title", d), u = gi(l, 1, "ghost svelte-1n46o8q", null, u, { active: z(Ie) === "fit" }), J(l, "title", f);
			}, [
				() => Y("lbl.group.zoom"),
				() => Y("tip.zoomOut"),
				() => Y("tip.zoomCurrent"),
				() => Math.round(z(Ve) * 100),
				() => Y("tip.zoomIn"),
				() => Y("tip.zoomFit")
			]), B("click", a, () => He(-1)), B("click", c, () => He(1)), B("click", l, () => j(Ie, "fit")), H(e, t);
		};
		W(c, (e) => {
			jo.zoom ? e(l) : e(u, -1);
		});
		var d = I(c, 2), f = (e) => {
			var t = lg(), n = N(t);
			let r;
			var i = N(n);
			G(i, () => C.gridToggle), G(I(i), () => C.caret), E(n);
			var a = I(n, 2), o = (e) => {
				var t = hg(), n = N(t);
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
					r = gi(n, 1, "ghost svelte-1n46o8q", null, r, { active: z(No) }), J(n, "title", e), U(a, ` ${t ?? ""}`), s = gi(o, 1, "ghost svelte-1n46o8q", null, s, { active: z(Co) }), J(o, "title", i), U(l, ` ${c ?? ""}`);
				}, [
					() => Y("tip.gridToggle"),
					() => Y("lbl.view.grid"),
					() => Y("tip.guides"),
					() => Y("lbl.view.guides")
				]), B("click", n, Po), B("click", o, Mo), H(e, t);
			};
			W(a, (e) => {
				z(ko) === "view" && e(o);
			}), E(t), R((e) => {
				r = gi(n, 1, "ghost svelte-1n46o8q", null, r, { active: z(ko) === "view" || z(No) || z(Co) }), J(n, "title", e);
			}, [() => Y("lbl.group.view")]), B("click", n, () => j(ko, z(ko) === "view" ? null : "view", !0)), H(e, t);
		}, p = (e) => {
			var t = gg(), n = P(t), r = F(n, !0), i = I(n, 2), a = N(i);
			let o;
			G(a, () => C.gridToggle, !0), E(a);
			var s = I(a, 2);
			let c;
			G(s, () => C.guides, !0), E(s), E(i), R((e, t, n) => {
				U(r, e), o = gi(a, 1, "ghost svelte-1n46o8q", null, o, { active: z(No) }), J(a, "title", t), c = gi(s, 1, "ghost svelte-1n46o8q", null, c, { active: z(Co) }), J(s, "title", n);
			}, [
				() => Y("lbl.group.view"),
				() => Y("tip.gridToggle"),
				() => Y("tip.guides")
			]), B("click", a, Po), B("click", s, Mo), H(e, t);
		};
		W(d, (e) => {
			jo.view ? e(f) : e(p, -1);
		}), E(i), ji(i, (e) => j(Ao, e), () => z(Ao)), R((e, t) => {
			J(n, "title", e), U(r, t);
		}, [() => Y("tip.switchPage"), () => lt()?.title ?? ""]), B("click", n, () => Qt("pages")), H(e, t);
	};
	W(Fy, (e) => {
		z(le) && e(Iy);
	});
	var Ly = I(Fy, 2), Ry = (e) => {
		var t = vg(), n = N(t);
		G(n, () => C.phone);
		var r = I(n, 2), i = F(r, !0), a = F(I(r, 2), !0);
		E(t), R((e, n) => {
			J(t, "title", e), U(i, n), U(a, z(Je));
		}, [() => Y("tip.attention"), () => Y(z(Je) === 1 ? "ui.attentionOne" : "ui.attentionMany", { n: z(Je) })]), B("click", t, Qe), H(e, t);
	};
	W(Ly, (e) => {
		z(Je) > 0 && e(Ry);
	}), E(Py);
	var zy = I(Py, 2), By = N(zy), Vy = (e) => {
		var t = bg(), n = N(t), r = F(N(n), !0);
		Oe(2), E(n);
		var i = I(n, 2), a = N(i);
		let o;
		var s = N(a);
		G(s, () => C.restore);
		var c = F(I(s), !0);
		E(a);
		var l = I(a, 2), u = (e) => {
			var t = yg(), n = N(t);
			G(n, () => C.restore);
			var r = I(n);
			E(t), R((e, n) => {
				J(t, "title", e), U(r, ` ${n ?? ""}`);
			}, [() => Y("tip.discardArmed"), () => Y("ui.discardConfirm")]), B("click", t, Ty), H(e, t);
		};
		W(l, (e) => {
			z(Sy) && e(u);
		}), E(i), ji(i, (e) => j(Cy, e), () => z(Cy)), E(t), R((e, t, i, s, l) => {
			J(n, "title", e), J(n, "aria-label", t), U(r, i), o = gi(a, 1, "discard-dot svelte-1n46o8q", null, o, { armed: z(Sy) }), J(a, "title", s), U(c, l);
		}, [
			() => Y("ui.unpublished"),
			() => Y("ui.unpublished"),
			() => Y("ui.unpublished"),
			() => z(Sy) ? Y("tip.discardArmed") : Y("tip.discard"),
			() => Y("ui.discard")
		]), B("click", a, wy), li(2, t, () => aa, () => ({
			x: 24,
			duration: bn ? 0 : 150
		})), H(e, t);
	};
	W(By, (e) => {
		z(ue) && e(Vy);
	}), E(zy);
	var Hy = I(zy, 2), Uy = N(Hy), Wy = (e) => {
		var t = wg(), n = P(t), r = N(n), i = (e) => {
			var t = xg(), n = P(t);
			G(n, () => C.eye);
			var r = F(I(n, 2), !0);
			R((e) => U(r, e), [() => Y("ui.cleanView")]), H(e, t);
		}, a = (e) => {
			var t = xg(), n = P(t);
			G(n, () => C.pencil);
			var r = F(I(n, 2), !0);
			R((e) => U(r, e), [() => Y("ui.edit")]), H(e, t);
		};
		W(r, (e) => {
			z(ye) ? e(i) : e(a, -1);
		}), E(n);
		var o = I(n, 2), s = (e) => {
			var t = Sg(), n = N(t), r = (e) => {
				var t = Nr();
				G(P(t), () => C.warn), H(e, t);
			};
			W(n, (e) => {
				z(_e).allowed || e(r);
			});
			var i = I(n, 1, !0);
			E(t), R((e) => {
				J(t, "title", e), U(i, z(_e).login);
			}, [() => z(_e).allowed ? Y("tip.hasPublishAccess") : Y("tip.noPublishAccess")]), H(e, t);
		}, c = (e) => {
			var t = Cg(), n = F(t, !0);
			R((e) => U(n, e), [() => Y("ui.loginGitHub")]), H(e, t);
		};
		W(o, (e) => {
			z(_e)?.loggedIn ? e(s) : z(_e) && e(c, 1);
		});
		var l = I(o, 2), u = N(l);
		G(u, () => C.external);
		var d = F(I(u, 2), !0);
		E(l);
		var f = I(l, 2), p = F(f, !0);
		R((e, t, r, i, a) => {
			J(n, "title", e), J(l, "href", t), J(l, "title", r), U(d, i), f.disabled = !z(ue), U(p, a);
		}, [
			() => z(ye) ? Y("tip.chromeHide") : Y("tip.chromeShow"),
			() => lt()?.path ?? "/",
			() => Y("ui.viewSite"),
			() => Y("ui.viewSite"),
			() => Y("ui.publish")
		]), B("click", n, bp), B("click", f, Dy), H(e, t);
	};
	W(Uy, (e) => {
		z(le) && e(Wy);
	}), E(Hy), E(My);
	var Gy = I(My, 2), Ky = (e) => {
		var t = Fv(), n = N(t);
		let r;
		var i = N(n);
		Jr(i, 17, () => Vt, Wr, (e, t, n) => {
			var r = Eg(), i = P(r), a = F(i, !0);
			Jr(I(i, 2), 16, () => z(t), (e) => e, (e, t) => {
				var n = Tg();
				let r;
				var i = F(n, !0);
				R(() => {
					r = gi(n, 1, "svelte-1n46o8q", null, r, { active: z(Bt) === t }), U(i, Ut[t]);
				}), B("click", n, () => Qt(t)), H(e, n);
			}), R((e) => U(a, e), [() => Y(Ht[n])]), H(e, r);
		});
		var s = I(i, 2), c = I(N(s), 2);
		let u;
		G(c, () => C.gear, !0), E(c);
		var m = I(c, 2), v = (e) => {
			var t = kg(), n = N(t), r = F(n, !0), i = I(n, 2), a = N(i);
			X(I(a), {
				get value() {
					return z(oe);
				},
				get options() {
					return ie;
				},
				onchange: (e) => j(oe, e, !0)
			}), E(i);
			var o = I(i, 2), s = N(o), c = I(s);
			{
				let e = /* @__PURE__ */ k(() => [["auto", Y("lang.auto")], ...Jt()]);
				X(c, {
					get value() {
						return Xt;
					},
					get options() {
						return z(e);
					},
					onchange: Zt
				});
			}
			E(o);
			var l = I(o, 2), u = N(l), d = I(u);
			{
				let e = /* @__PURE__ */ k(() => [["strip", Y("settings.layoutPickerStrip")], ["menu", Y("settings.layoutPickerMenu")]]);
				X(d, {
					get value() {
						return z(To);
					},
					get options() {
						return z(e);
					},
					onchange: Eo
				});
			}
			E(l);
			var f = I(l, 2), p = N(f), m = I(p);
			{
				let e = /* @__PURE__ */ k(() => [["wide", Y("settings.menuWide")], ["narrow", Y("settings.menuNarrow")]]);
				X(m, {
					get value() {
						return z(cn);
					},
					get options() {
						return z(e);
					},
					onchange: un
				});
			}
			E(f);
			var h = I(f, 2), g = N(h), _ = I(g);
			{
				let e = /* @__PURE__ */ k(() => [["remember", Y("settings.panelsRemember")], ["reset", Y("settings.panelsReset")]]);
				X(_, {
					get value() {
						return z(Rt);
					},
					get options() {
						return z(e);
					},
					onchange: zt
				});
			}
			E(h);
			var v = I(h, 2), y = F(v, !0), b = I(v, 2), x = N(b);
			let S;
			var ee = F(x, !0), te = I(x, 2);
			let ne;
			var re = F(te, !0);
			E(b);
			var C = I(b, 2), ae = (e) => {
				var t = Dg(), n = N(t), r = F(n, !0), i = I(n, 2);
				K(i);
				var a = I(i, 2), o = F(a, !0), s = I(a, 2);
				K(s), E(t), R((e, t, n, a) => {
					U(r, e), J(i, "min", 640), J(i, "max", Vo), J(i, "title", t), q(i, z(Ce).width), U(o, n), J(s, "max", Ho), J(s, "title", a), q(s, z(Ce).height || "");
				}, [
					() => Y("lbl.screen.w"),
					() => Y("tip.screen.width", {
						min: 640,
						max: Vo
					}),
					() => Y("lbl.screen.h"),
					() => Y("tip.screen.height", {
						min: 480,
						max: Ho
					})
				]), B("change", i, (e) => {
					we({ width: Number(e.target.value) }), e.target.value = z(Ce).width;
				}), B("change", s, (e) => {
					we({ height: Number(e.target.value) }), e.target.value = z(Ce).height || "";
				}), H(e, t);
			};
			W(C, (e) => {
				z(Ce).mode === "custom" && e(ae);
			});
			var se = I(C, 2), ce = (e) => {
				var t = Og(), n = P(t), r = F(n, !0), i = I(n, 2), a = N(i), o = I(a);
				K(o), E(i), R((e, t, s, c, l) => {
					J(n, "title", e), U(r, t), J(i, "title", s), U(a, `${c ?? ""} `), J(o, "placeholder", l), q(o, z(O).analytics?.token ?? "");
				}, [
					() => Y("tip.analytics"),
					() => Y("settings.analytics"),
					() => Y("tip.analytics"),
					() => Y("lbl.analyticsToken"),
					() => Y("ph.analyticsToken")
				]), B("change", o, (e) => tc(e.target.value)), H(e, t);
			};
			W(se, (e) => {
				z(O) && e(ce);
			}), E(t), R((e, t, n, c, d, m, _, C, ie, ae, oe, se, ce, le, w, ue) => {
				U(r, e), J(i, "title", t), U(a, `${n ?? ""} `), J(o, "title", c), U(s, `${d ?? ""} `), J(l, "title", m), U(u, `${_ ?? ""} `), J(f, "title", C), U(p, `${ie ?? ""} `), J(h, "title", ae), U(g, `${oe ?? ""} `), J(v, "title", se), U(y, ce), J(b, "title", le), S = gi(x, 1, "svelte-1n46o8q", null, S, { on: z(Ce).mode === "own" }), U(ee, w), ne = gi(te, 1, "svelte-1n46o8q", null, ne, { on: z(Ce).mode === "custom" }), U(re, ue);
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
			]), B("click", x, () => we({ mode: "own" })), B("click", te, () => we({ mode: "custom" })), H(e, t);
		};
		W(m, (e) => {
			z(wo) && e(v);
		}), E(s), ji(s, (e) => j(Do, e), () => z(Do)), E(n);
		var y = I(n, 2), b = (e) => {
			var t = Pv();
			let n;
			var r = N(t), i = N(r), s = F(i, !0), c = I(i, 2), u = (e) => {
				var t = Lm();
				let n;
				G(t, () => C.foldToggle, !0), E(t), R((e, r) => {
					n = gi(t, 1, "fold-all fold-toggle svelte-1n46o8q", null, n, { collapse: z(Lf) }), J(t, "title", e), J(t, "aria-label", r);
				}, [() => Y(z(Lf) ? "ui.collapseAll" : "ui.expandAll"), () => Y(z(Lf) ? "ui.collapseAll" : "ui.expandAll")]), B("click", t, Wf), H(e, t);
			};
			W(c, (e) => {
				z(If) && e(u);
			}), E(r);
			var m = I(r, 2), v = (e) => {
				var t = Bg(), n = N(t);
				Jr(n, 17, () => z(O).pages, (e) => e.id, (e, t) => {
					var n = Fg();
					let r;
					var i = N(n);
					K(i);
					var a = I(i, 2), o = (e) => {
						var t = Ag();
						R((e) => J(t, "title", e), [() => Y("tip.pages.homeLocked")]), H(e, t);
					}, s = (e) => {
						var n = jg();
						K(n), R((e, t) => {
							q(n, e), J(n, "title", t);
						}, [() => z(t).path.slice(1), () => Y("tip.pages.slug")]), B("change", n, (e) => Bs(z(t), e.target.value)), H(e, n);
					};
					W(a, (e) => {
						z(t).path === "/" ? e(o) : e(s, -1);
					});
					var c = I(a, 2), l = (e) => {
						var t = Mg();
						G(t, () => C.warn, !0), E(t), R((e) => J(t, "title", e), [() => Y("tip.pages.missingDescription")]), H(e, t);
					};
					W(c, (e) => {
						z(Fs)[z(t).id] && e(l);
					});
					var u = I(c, 2), d = N(u);
					G(d, () => C.right, !0), E(d);
					var f = I(d, 2), p = N(f);
					G(p, () => C.kebab, !0), E(p);
					var m = I(p, 2), h = (e) => {
						var n = Pg(), r = N(n), i = N(r);
						G(i, () => C.bookmark);
						var a = I(i);
						E(r);
						var o = I(r, 2), s = (e) => {
							var n = Ng(), r = N(n);
							G(r, () => C.cross);
							var i = I(r);
							E(n), R((e, t) => {
								J(n, "title", e), U(i, ` ${t ?? ""}`);
							}, [() => Y("tip.pages.delete"), () => Y("ui.deletePage")]), B("click", n, () => {
								j(Ss, null), Vs(z(t));
							}), H(e, n);
						};
						W(o, (e) => {
							z(t).path !== "/" && e(s);
						}), E(n), R((e) => U(a, ` ${e ?? ""}`), [() => Y("ui.savePageTemplate")]), B("click", r, () => Es(z(t))), H(e, n);
					};
					W(m, (e) => {
						z(Ss) === z(t).id && e(h);
					}), E(f), E(u), E(n), R((e, a, o) => {
						r = gi(n, 1, "page-row svelte-1n46o8q", null, r, { current: z(t).id === z(w) }), q(i, z(t).title), J(i, "title", e), J(d, "title", a), d.disabled = z(t).id === z(w), J(p, "title", o);
					}, [
						() => Y("tip.pages.title"),
						() => Y("tip.pages.open"),
						() => Y("tip.pages.menu")
					]), B("change", i, (e) => Ds(z(t), e.target.value)), B("click", d, () => yo(z(t).id)), B("click", p, () => j(Ss, z(Ss) === z(t).id ? null : z(t).id, !0)), H(e, n);
				});
				var r = I(n, 2), i = N(r), a = F(i, !0), o = I(i, 2), s = N(o), c = N(s), l = I(c);
				st(l), E(s);
				var u = I(s, 2), d = N(u), f = I(d);
				K(f), E(u);
				var p = I(u, 2), m = N(p), h = I(m);
				st(h), E(p);
				var g = I(p, 2), _ = N(g), v = I(_), y = (e) => {
					var t = Ig();
					R((e) => {
						J(t, "src", z(Os).ogImage), J(t, "alt", e);
					}, [() => Y("lbl.ogImage")]), H(e, t);
				};
				W(v, (e) => {
					z(Os).ogImage && e(y);
				}), E(g);
				var b = I(g, 2), x = N(b), S = N(x), ee = I(S);
				E(x);
				var te = I(x, 2), ne = (e) => {
					var t = Ip();
					G(t, () => C.cross, !0), E(t), R((e) => J(t, "title", e), [() => Y("tip.seo.removeOgImage")]), B("click", t, () => js("ogImage", "")), H(e, t);
				};
				W(te, (e) => {
					z(Os).ogImage && e(ne);
				}), E(b);
				var re = I(b, 2), ie = N(re);
				K(ie);
				var ae = I(ie);
				E(re), E(o), E(r);
				var oe = I(r, 4);
				K(oe);
				var se = I(oe, 2), ce = F(se, !0), le = I(se, 2), ue = F(le, !0), de = I(le, 2), fe = N(de);
				let pe;
				var T = N(fe), me = N(T);
				G(me, () => tu({ sections: [] }), !0), E(me);
				var he = F(I(me, 2), !0);
				E(T), E(fe), Jr(I(fe, 2), 17, () => ru, (e) => e.id, (e, t) => {
					var n = Lg();
					let r;
					var i = N(n), a = N(i);
					G(a, () => gs[z(t).id], !0), E(a);
					var o = F(I(a, 2), !0);
					E(i), E(n), R((e, a) => {
						r = gi(n, 1, "page-template-card svelte-1n46o8q", null, r, { picked: z(ms) === `preset:${z(t).id}` }), J(i, "title", e), U(o, a);
					}, [() => Y("tip.pages.templatePick", { name: Y(z(t).labelKey) }), () => Y(z(t).labelKey)]), B("click", i, () => j(ms, z(ms) === `preset:${z(t).id}` ? null : `preset:${z(t).id}`, !0)), H(e, n);
				}), E(de);
				var ge = I(de, 2), _e = (e) => {
					var t = zg(), n = P(t), r = F(n, !0), i = I(n, 2);
					Jr(i, 20, () => z(Vl).filter((e) => Rl[e]?.data?.mal?.kind === "page"), (e) => e, (e, t) => {
						var n = Rg();
						let r;
						var i = N(n), a = N(i);
						G(a, () => tu(Rl[t].data.page), !0), E(a);
						var o = F(I(a, 2), !0);
						E(i);
						var s = I(i, 2);
						G(s, () => C.cross, !0), E(s), E(n), R((e, a) => {
							r = gi(n, 1, "page-template-card svelte-1n46o8q", null, r, { picked: z(ms) === t }), J(i, "title", e), U(o, Rl[t].data.mal.name), J(s, "title", a);
						}, [() => Y("tip.pages.templatePick", { name: Rl[t].data.mal.name }), () => Y("canvas.deleteTemplate")]), B("click", i, () => j(ms, z(ms) === t ? null : t, !0)), B("click", s, () => Jl({ id: t })), H(e, n);
					}), E(i), R((e) => {
						U(r, e), vi(i, z(_s));
					}, [() => Y("canvas.tabMyTemplates")]), H(e, t);
				}, ve = /* @__PURE__ */ k(() => z(Vl).some((e) => Rl[e]?.data?.mal?.kind === "page"));
				W(ge, (e) => {
					z(ve) && e(_e);
				}), E(t), R((e, t, n, r, i, o, v, y, b, ee, te, ne, C, le, w, me, ge, _e, ve, ye, be, xe) => {
					U(a, e), J(s, "title", t), U(c, `${n ?? ""} `), q(l, z(Os).description), J(u, "title", r), U(d, `${i ?? ""} `), q(f, z(Os).ogTitle), J(f, "placeholder", o), J(p, "title", v), U(m, `${y ?? ""} `), q(h, z(Os).ogDescription), J(h, "placeholder", z(Os).description), J(g, "title", b), U(_, `${ee ?? ""} `), J(x, "title", te), U(S, `${ne ?? ""} `), J(re, "title", C), Ci(ie, le), U(ae, ` ${w ?? ""}`), J(oe, "placeholder", me), J(se, "title", ge), se.disabled = _e, U(ce, ve), U(ue, ye), vi(de, z(_s)), pe = gi(fe, 1, "page-template-card svelte-1n46o8q", null, pe, { picked: z(ms) === null }), J(T, "title", be), U(he, xe);
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
					() => z(Os).ogImage ? Y("ui.changeImage") : Y("ui.chooseImage"),
					() => Y("tip.seo.hideFromSearch"),
					() => z(O).pages.find((e) => e.id === z(w))?.noindex === !0,
					() => Y("lbl.hideFromSearch"),
					() => Y("ph.newPageName"),
					() => Y("hint.pages.autoMenu"),
					() => !z(Wo).trim(),
					() => Y("ui.createPage"),
					() => Y("canvas.tabPresets"),
					() => Y("tip.pages.blankPick"),
					() => Y("ui.blankPage")
				]), B("change", l, (e) => js("description", e.target.value)), B("change", f, (e) => js("ogTitle", e.target.value)), B("change", h, (e) => js("ogDescription", e.target.value)), B("change", ee, Ls), B("change", ie, (e) => Ps(e.target.checked)), B("keydown", oe, (e) => e.key === "Enter" && Ts()), Di(oe, () => z(Wo), (e) => j(Wo, e)), B("click", se, Ts), B("click", T, () => j(ms, null)), H(e, t);
			}, y = (e) => {
				var t = E_(), n = N(t), r = N(n), i = F(r, !0), o = I(r, 2), s = N(o);
				{
					let e = /* @__PURE__ */ k(() => Y("common.type")), t = /* @__PURE__ */ k(() => z(O).nav.logo?.type ?? "text"), n = /* @__PURE__ */ k(() => [
						["text", Y("blocks.text")],
						["image", Y("blocks.image")],
						["both", Y("opt.logo.both")]
					]);
					As(s, {
						get label() {
							return z(e);
						},
						get value() {
							return z(t);
						},
						get options() {
							return z(n);
						},
						onchange: (e) => Us(e)
					});
				}
				var c = I(s, 2), l = (e) => {
					var t = Vg(), n = P(t);
					K(n);
					var r = I(n, 2), i = N(r);
					{
						let e = /* @__PURE__ */ k(() => Y("tip.nav.logoFont")), t = /* @__PURE__ */ k(() => z(O).nav.logo?.font ?? ""), n = /* @__PURE__ */ k(() => [["", Y("common.inherit")], ...zf.map(([e, t]) => [t, Y(e)])]);
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
							onchange: (e) => Hs({ font: e || void 0 })
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
					]), B("input", n, (e) => Hs({ value: e.target.value })), B("change", a, (e) => Hs({ textSize: e.target.value ? Number(e.target.value) : void 0 })), B("click", o, () => Hs({ bold: z(O).nav.logo?.bold === !1 })), B("click", l, () => Hs({ italic: !z(O).nav.logo?.italic })), H(e, t);
				};
				W(c, (e) => {
					(z(O).nav.logo?.type ?? "text") !== "image" && e(l);
				});
				var u = I(c, 2), m = (e) => {
					let t = /* @__PURE__ */ k(() => z(O).nav.logo?.type === "image" ? z(O).nav.logo?.value : z(O).nav.logo?.image);
					var n = Wg(), r = P(n), i = N(r), a = N(i), o = (e) => {
						var n = Hg();
						R(() => J(n, "src", z(t))), H(e, n);
					};
					W(a, (e) => {
						z(t) && e(o);
					}), E(i);
					var s = I(i, 2), c = N(s), l = N(c), u = I(l);
					E(c);
					var d = I(c, 2), f = (e) => {
						var n = Ug(), r = F(n, !0);
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
						J(c, "title", e), U(l, `${t ?? ""} `), J(m, "title", n), U(g, r), q(_, z(O).nav.logo?.size ?? 32), J(v, "title", i), U(b, a), J(x, "min", ps.min), J(x, "max", ps.max), J(x, "placeholder", o), q(x, z(O).nav.logo?.mobileSize ?? ""), J(S, "title", s), U(te, u), q(ne, z(O).nav.logo?.radius ?? 0);
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
					]), B("change", u, Ks), B("change", _, (e) => Hs({ size: Number(e.target.value) })), B("change", x, (e) => {
						let t = e.target.value;
						Hs({ mobileSize: t === "" ? void 0 : vs(t, ps, void 0) }), e.target.value = z(O).nav.logo?.mobileSize ?? "";
					}), B("change", ne, (e) => Hs({ radius: Number(e.target.value) })), H(e, n);
				};
				W(u, (e) => {
					(z(O).nav.logo?.type ?? "text") !== "text" && e(m);
				});
				var v = I(u, 2), y = (e) => {
					{
						let t = /* @__PURE__ */ k(() => Y("lbl.order")), n = /* @__PURE__ */ k(() => z(O).nav.logo?.order ?? "image-first"), r = /* @__PURE__ */ k(() => [["image-first", Y("opt.logo.imageFirst")], ["text-first", Y("opt.logo.textFirst")]]);
						As(e, {
							get label() {
								return z(t);
							},
							get value() {
								return z(n);
							},
							get options() {
								return z(r);
							},
							onchange: (e) => Hs({ order: e })
						});
					}
				};
				W(v, (e) => {
					z(O).nav.logo?.type === "both" && e(y);
				}), E(o), E(n);
				var b = I(n, 2), x = N(b), S = F(x, !0), ne = I(x, 2), re = N(ne), ie = N(re), ae = F(ie, !0), oe = I(ie, 2), se = N(oe), ce = N(se), le = F(ce, !0), w = I(ce, 2);
				Jr(w, 21, () => [
					["bar", Y("opt.navVariant.bar")],
					["floating", Y("opt.navVariant.floating")],
					["floating-square", Y("opt.navVariant.floatingSquare")],
					["floating-tab", Y("opt.navVariant.floatingTab")],
					["side-left", Y("opt.navVariant.sideLeft")],
					["side-right", Y("opt.navVariant.sideRight")]
				], ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ k(() => h(z(t), 2));
					let r = () => z(n)[0], i = () => z(n)[1];
					var a = Gg();
					let o;
					var s = N(a);
					G(s, () => d[r()]);
					var c = F(I(s), !0);
					E(a), R(() => {
						o = gi(a, 1, "tile svelte-1n46o8q", null, o, { on: (z(O).nav.variant ?? "bar") === r() }), J(a, "aria-pressed", (z(O).nav.variant ?? "bar") === r()), U(c, i());
					}), B("click", a, () => Sl(r())), H(e, a);
				}), E(w), E(se);
				var ue = I(se, 2), de = (e) => {
					var t = qg(), n = P(t);
					{
						let e = /* @__PURE__ */ k(() => Y("lbl.navPillWidth")), t = /* @__PURE__ */ k(() => Y("tip.nav.pillWidth")), r = /* @__PURE__ */ k(() => z(O).nav.style?.pillWidth === "content" ? "content" : "custom"), i = /* @__PURE__ */ k(() => [["content", Y("opt.pillWidth.content")], ["custom", Y("opt.pillWidth.custom")]]);
						As(n, {
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
							onchange: (e) => xc("pillWidth", e === "content" ? "content" : void 0)
						});
					}
					var r = I(n, 2), i = (e) => {
						var t = Kg(), n = N(t), r = F(n, !0), i = I(n, 2);
						K(i), E(t), R((e, n) => {
							J(t, "title", e), U(r, n), J(i, "min", ss.min), J(i, "max", ss.max), J(i, "step", ss.step), q(i, typeof z(O).nav.style?.pillWidth == "number" ? z(O).nav.style.pillWidth : "");
						}, [() => Y("tip.nav.pillWidthPx"), () => Y("lbl.navPillWidthPx")]), B("change", i, (e) => Mc(e, "pillWidth", ss)), H(e, t);
					};
					W(r, (e) => {
						z(O).nav.style?.pillWidth !== "content" && e(i);
					});
					var a = I(r, 2), o = N(a), s = F(o, !0), c = I(o, 2);
					K(c), E(a), R((e, t) => {
						J(a, "title", e), U(s, t), J(c, "min", ds.min), J(c, "max", ds.max), J(c, "step", ds.step), J(c, "placeholder", z(O).nav.variant === "floating-square" ? "0" : ""), q(c, typeof z(O).nav.style?.radius == "number" ? z(O).nav.style.radius : "");
					}, [() => Y("tip.nav.radius"), () => Y("lbl.navRadius")]), B("change", c, (e) => Mc(e, "radius", ds)), H(e, t);
				};
				W(ue, (e) => {
					z(Cc) && e(de);
				});
				var fe = I(ue, 2), pe = (e) => {
					{
						let t = /* @__PURE__ */ k(() => Y("lbl.navPlacement")), n = /* @__PURE__ */ k(() => z(O).nav.style?.sidePlacement ?? "top"), r = /* @__PURE__ */ k(() => [
							["top", Y("opt.place.top")],
							["middle", Y("opt.place.middle")],
							["bottom", Y("opt.place.bottom")]
						]);
						As(e, {
							get label() {
								return z(t);
							},
							get value() {
								return z(n);
							},
							get options() {
								return z(r);
							},
							onchange: (e) => xc("sidePlacement", e === "top" ? void 0 : e)
						});
					}
				}, T = (e) => {
					{
						let t = /* @__PURE__ */ k(() => Y("lbl.navPlacement")), n = /* @__PURE__ */ k(() => Y("opt.layout.leftAfterLogo")), r = /* @__PURE__ */ k(() => z(O).nav.layout ?? "right"), i = /* @__PURE__ */ k(() => [
							["left", Y("common.left")],
							["center", Y("common.center")],
							["right", Y("common.right")]
						]);
						As(e, {
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
							onchange: (e) => gc(e)
						});
					}
				};
				W(fe, (e) => {
					z(Sc) ? e(pe) : e(T, -1);
				});
				var me = I(fe, 2), he = (e) => {
					var t = Jg(), n = P(t), r = N(n);
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
					]), B("change", r, (e) => wl(e.target.checked)), B("change", o, (e) => Tl(e.target.checked)), H(e, t);
				};
				W(me, (e) => {
					z(Cc) && e(he);
				});
				var ge = I(me, 2), _e = (e) => {
					var t = Jg(), n = P(t), r = N(n);
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
					]), B("change", r, (e) => Uo("nav", () => {
						e.target.checked ? z(O).nav.overlay = !0 : delete z(O).nav.overlay;
					})), B("change", o, (e) => xc("inset", e.target.checked ? void 0 : !1)), H(e, t);
				};
				W(ge, (e) => {
					!z(Cc) && !z(Sc) && e(_e);
				});
				var ve = I(ge, 2), ye = (e) => {
					var t = Yg(), n = P(t);
					{
						let e = /* @__PURE__ */ k(() => Y("lbl.textAlign")), t = /* @__PURE__ */ k(() => Y("tip.nav.sideAlign")), r = /* @__PURE__ */ k(() => z(O).nav.style?.sideAlign ?? "left"), i = /* @__PURE__ */ k(() => [
							["left", Y("common.left")],
							["center", Y("common.center")],
							["right", Y("common.right")]
						]);
						As(n, {
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
							onchange: (e) => xc("sideAlign", e === "left" ? void 0 : e)
						});
					}
					var r = I(n, 2), i = N(r), a = F(i, !0), o = I(i, 2);
					K(o), E(r), R((e, t) => {
						J(r, "title", e), U(a, t), J(o, "min", fs.min), J(o, "max", fs.max), q(o, z(O).nav.style?.width ?? 250);
					}, [() => Y("tip.nav.colWidth"), () => Y("lbl.navColWidth")]), B("change", o, (e) => {
						let t = vs(e.target.value, fs, 250);
						xc("width", t === 250 ? void 0 : t), e.target.value = z(O).nav.style?.width ?? 250;
					}), H(e, t);
				};
				W(ve, (e) => {
					z(Sc) && e(ye);
				}), E(oe), E(re);
				var be = I(re, 4), xe = N(be), Se = F(xe, !0), Ce = I(xe, 2), we = N(Ce);
				Jr(we, 20, () => hs, (e) => e, (e, t) => {
					var n = Tg();
					let r;
					var i = F(n, !0);
					R((e) => {
						r = gi(n, 1, "svelte-1n46o8q", null, r, { on: z(wc) === t }), U(i, e);
					}, [() => Y(`opt.size.${t}`)]), B("click", n, () => Ac(t)), H(e, n);
				}), E(we);
				var Te = I(we, 2), Ee = N(Te), De = F(Ee, !0), ke = I(Ee, 2), Ae = N(ke), je = (e) => {
					var t = Xg(), n = N(t), r = F(n, !0), i = I(n, 2);
					K(i);
					var a = I(i, 2);
					K(a), E(t), R((e, n) => {
						J(t, "title", e), U(r, n), J(i, "min", rs.min), J(i, "max", rs.max), J(i, "step", rs.step), q(i, z(Oc)), J(a, "min", rs.min), J(a, "max", rs.max), q(a, z(Oc));
					}, [() => Y("tip.nav.thickness"), () => Y("lbl.navThickness")]), B("input", i, (e) => xc("padY", e.target.valueAsNumber)), B("change", a, (e) => il(e, "padY", rs)), H(e, t);
				};
				W(Ae, (e) => {
					z(Sc) || e(je);
				});
				var Me = I(Ae, 2), Ne = N(Me), Pe = F(Ne, !0), Fe = I(Ne, 2);
				K(Fe);
				var Ie = I(Fe, 2);
				K(Ie), E(Me);
				var Le = I(Me, 2), Re = (e) => {
					var t = Zg(), n = N(t), r = N(n), i = F(r, !0), a = I(r, 2);
					K(a), E(n);
					var o = I(n, 2), s = N(o), c = F(s, !0), l = I(s, 2);
					K(l), E(o), E(t), R((e, t, r, s, u, d) => {
						J(n, "title", e), U(i, t), J(a, "min", as.min), J(a, "max", as.max), J(a, "placeholder", r), q(a, z(O).nav.style?.padX ?? ""), J(o, "title", s), U(c, u), J(l, "min", os.min), J(l, "max", os.max), J(l, "placeholder", d), q(l, z(O).nav.style?.gap ?? "");
					}, [
						() => Y("tip.nav.padX"),
						() => Y("lbl.navPadX"),
						() => Y("common.auto"),
						() => Y("tip.nav.gap"),
						() => Y("lbl.navGap"),
						() => Y("common.auto")
					]), B("change", a, (e) => Mc(e, "padX", as)), B("change", l, (e) => Mc(e, "gap", os)), H(e, t);
				};
				W(Le, (e) => {
					z(Sc) || e(Re);
				}), E(ke), E(Te), E(Ce), E(be);
				var ze = I(be, 4), Be = N(ze), Ve = F(Be, !0), He = I(Be, 2), Ue = N(He), We = (e) => {
					var t = $g(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2);
					Jr(a, 21, () => [
						["", Y("common.none")],
						["bottom", Y("opt.navBorder.bottom")],
						["top", Y("opt.navBorder.top")],
						["both", Y("opt.navBorder.both")],
						["all", Y("opt.navBorder.all")]
					], ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ k(() => h(z(t), 2));
						let r = () => z(n)[0], i = () => z(n)[1];
						var a = Gg();
						let o;
						var s = N(a);
						G(s, () => p[r()]);
						var c = F(I(s), !0);
						E(a), R(() => {
							o = gi(a, 1, "tile svelte-1n46o8q", null, o, { on: (z(O).nav.style?.border?.side ?? "") === r() }), J(a, "aria-pressed", (z(O).nav.style?.border?.side ?? "") === r()), U(c, i());
						}), B("click", a, () => xc("border", r() ? {
							...z(O).nav.style?.border ?? {},
							side: r()
						} : void 0)), H(e, a);
					}), E(a), E(n);
					var o = I(n, 2), s = (e) => {
						var t = Qg(), n = N(t), r = F(n, !0), i = I(n, 2);
						K(i);
						var a = I(i, 2), o = F(a, !0), s = I(a, 2);
						{
							let e = /* @__PURE__ */ k(() => z(O).nav.style.border.color ?? "text"), t = /* @__PURE__ */ k(la), n = /* @__PURE__ */ k(() => Y("tip.nav.borderColorPick"));
							wa(s, {
								get value() {
									return z(e);
								},
								get tokens() {
									return z(t);
								},
								get label() {
									return z(n);
								},
								onchange: (e) => xc("border", {
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
							let t = vs(e.target.value, {
								min: 1,
								max: 8
							}, 1), n = { ...z(O).nav.style.border };
							t === 1 ? delete n.width : n.width = t, xc("border", n), e.target.value = z(O).nav.style.border.width ?? 1;
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
					z(Sc) || e(We);
				});
				var Ge = I(Ue, 2), Ke = (e) => {
					{
						let t = /* @__PURE__ */ k(() => Y("lbl.navShadow")), n = /* @__PURE__ */ k(() => Y("tip.nav.shadow")), r = /* @__PURE__ */ k(() => z(O).nav.style?.shadow ?? ""), i = /* @__PURE__ */ k(() => [
							["", Y("common.none")],
							["soft", Y("opt.navShadow.soft")],
							["strong", Y("opt.navShadow.strong")]
						]);
						As(e, {
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
							onchange: (e) => xc("shadow", e || void 0)
						});
					}
				};
				W(Ge, (e) => {
					!z(Cc) && !z(Sc) && e(Ke);
				}), E(He), E(ze);
				var qe = I(ze, 4), Je = N(qe), Ye = F(Je, !0), Xe = I(Je, 2), Ze = N(Xe), Qe = (e) => {
					var t = t_(), n = N(t), r = F(n, !0), i = I(n, 2), a = N(i);
					K(a);
					var o = I(a);
					E(i);
					var s = I(i, 2), c = (e) => {
						var t = Sm(), n = P(t);
						{
							let e = /* @__PURE__ */ k(() => Y("lbl.navScroll")), t = /* @__PURE__ */ k(() => Y("tip.nav.scroll")), r = /* @__PURE__ */ k(() => z(O).nav.scroll ?? "none"), i = /* @__PURE__ */ k(() => [
								["none", Y("opt.scroll.none")],
								["shrink", Y("opt.scroll.shrink")],
								["hide", Y("opt.scroll.hide")]
							]);
							As(n, {
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
								onchange: (e) => Uo("nav", () => {
									e === "none" ? delete z(O).nav.scroll : z(O).nav.scroll = e;
								})
							});
						}
						var r = I(n, 2), i = (e) => {
							var t = e_(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2);
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
								var t = Cm(), n = N(t);
								K(n);
								var r = I(n);
								E(t), R((e, i) => {
									J(t, "title", e), Ci(n, z(O).nav.style?.shrinkLogo === !0), U(r, ` ${i ?? ""}`);
								}, [() => Y("tip.nav.shrinkLogo"), () => Y("lbl.navShrinkLogo")]), B("change", n, (e) => xc("shrinkLogo", e.target.checked ? !0 : void 0)), H(e, t);
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
							]), B("input", a, (e) => ol(e.target.valueAsNumber)), B("input", u, (e) => sl(e.target.valueAsNumber)), B("input", h, (e) => cl(e.target.valueAsNumber)), H(e, t);
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
					]), B("change", a, (e) => Uo("nav", () => {
						z(O).nav.sticky = e.target.checked;
					})), B("change", u, (e) => xc("atTop", e.target.checked ? "clear" : void 0)), H(e, t);
				};
				W(Ze, (e) => {
					z(Sc) || e(Qe);
				}), E(Xe), E(qe);
				var $e = I(qe, 4), et = N($e), tt = F(et, !0), D = I(et, 2), nt = N(D), it = N(nt), at = (e) => {
					var t = n_(), n = N(t), r = F(n, !0), i = I(n, 2);
					K(i), E(t), R((e, n, a) => {
						J(t, "title", e), U(r, n), J(i, "min", rs.min), J(i, "max", rs.max), J(i, "placeholder", a), q(i, z(O).nav.style?.mobile?.padY ?? "");
					}, [
						() => Y("tip.nav.thickness"),
						() => Y("lbl.navThickness"),
						() => Y("lbl.navSameAsDesktop")
					]), B("change", i, (e) => al(e, "padY", rs)), H(e, t);
				};
				W(it, (e) => {
					z(Sc) || e(at);
				});
				var ot = I(it, 2), st = N(ot), ct = F(st, !0), lt = I(st, 2);
				K(lt), E(ot), E(nt);
				var ut = I(nt, 2), dt = N(ut), ft = N(dt), pt = F(ft, !0), mt = I(ft, 2);
				{
					let e = /* @__PURE__ */ k(() => z(O).nav.style?.mobile?.size ?? ""), t = /* @__PURE__ */ k(() => [["", Y("lbl.navSameAsDesktop")], ...hs.map((e) => [e, Y(`opt.size.${e}`)])]);
					X(mt, {
						filled: !0,
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => Nc("size", e || void 0)
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
						onchange: (e) => Nc("layout", e || void 0)
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
						onchange: (e) => Nc("tools", e ? { side: e } : void 0)
					});
				}
				E(bt);
				var wt = I(bt, 2), Tt = (e) => {
					var t = r_(), n = N(t), r = F(n, !0), i = I(n, 2);
					{
						let e = /* @__PURE__ */ k(() => Fc("overlay")), t = /* @__PURE__ */ k(() => [
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
							onchange: (e) => Bc("overlay", e)
						});
					}
					E(t), R((e, n) => {
						J(t, "title", e), U(r, n);
					}, [() => Y("tip.nav.mobileOverlay"), () => Y("lbl.navOverlay")]), H(e, t);
				};
				W(wt, (e) => {
					!z(Cc) && !z(Sc) && e(Tt);
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
						onchange: (e) => Gc(e)
					});
				}
				E(Dt), E(Et);
				var jt = I(Et, 2), Mt = (e) => {
					var t = Qg(), n = N(t), r = F(n, !0), i = I(n, 2);
					K(i);
					var a = I(i, 2), o = F(a, !0), s = I(a, 2);
					{
						let e = /* @__PURE__ */ k(() => z(O).nav.style.mobile.border.color ?? "text"), t = /* @__PURE__ */ k(la), n = /* @__PURE__ */ k(() => Y("tip.nav.borderColorPick"));
						wa(s, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => Nc("border", {
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
						let t = vs(e.target.value, {
							min: 1,
							max: 8
						}, 1), n = { ...z(O).nav.style.mobile.border };
						t === 1 ? delete n.width : n.width = t, Nc("border", n), e.target.value = z(O).nav.style.mobile.border.width ?? 1;
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
						onchange: (e) => xc("mobileMenu", e === "dropdown" ? void 0 : e)
					});
				}
				E(Pt);
				var Rt = I(Pt, 2), zt = (e) => {
					var t = r_(), n = N(t), r = F(n, !0), i = I(n, 2);
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
							onchange: (e) => xc("sheetMotion", e === "top" ? void 0 : e)
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
					var t = i_(), n = P(t), r = N(n);
					K(r);
					var i = I(r);
					E(n);
					var a = I(n, 2), o = (e) => {
						var t = Cm(), n = N(t);
						K(n);
						var r = I(n);
						E(t), R((e, i) => {
							J(t, "title", e), Ci(n, z(O).nav.style?.sheetTheme === !0), U(r, ` ${i ?? ""}`);
						}, [() => Y("tip.nav.sheetTheme"), () => Y("lbl.sheetTheme")]), B("change", n, (e) => xc("sheetTheme", e.target.checked ? !0 : void 0)), H(e, t);
					};
					W(a, (e) => {
						z(O).theme?.alt?.tokens && z(O).nav.style?.tools?.theme !== !1 && e(o);
					});
					var s = I(a, 2), c = (e) => {
						var t = Cm(), n = N(t);
						K(n);
						var r = I(n);
						E(t), R((e, i) => {
							J(t, "title", e), Ci(n, z(O).nav.style?.sheetCart === !0), U(r, ` ${i ?? ""}`);
						}, [() => Y("tip.nav.sheetCart"), () => Y("lbl.sheetCart")]), B("change", n, (e) => xc("sheetCart", e.target.checked ? !0 : void 0)), H(e, t);
					};
					W(s, (e) => {
						z(O).nav.cart?.show && e(c);
					});
					var l = I(s, 2), u = (e) => {
						var t = Cm(), n = N(t);
						K(n);
						var r = I(n);
						E(t), R((e, i) => {
							J(t, "title", e), Ci(n, z(O).nav.style?.sheetAnnounce === !0), U(r, ` ${i ?? ""}`);
						}, [() => Y("tip.nav.sheetAnnounce"), () => Y("lbl.sheetAnnounce")]), B("change", n, (e) => xc("sheetAnnounce", e.target.checked ? !0 : void 0)), H(e, t);
					};
					W(l, (e) => {
						z(O).nav.announcement?.show && e(u);
					});
					var d = I(l, 2), f = (e) => {
						var t = Cm(), n = N(t);
						K(n);
						var r = I(n);
						E(t), R((e, i) => {
							J(t, "title", e), Ci(n, z(O).nav.style?.sheetToolLabels === !0), U(r, ` ${i ?? ""}`);
						}, [() => Y("tip.nav.sheetToolLabels"), () => Y("lbl.sheetToolLabels")]), B("change", n, (e) => xc("sheetToolLabels", e.target.checked ? !0 : void 0)), H(e, t);
					};
					W(d, (e) => {
						(z(O).nav.style?.sheetTheme || z(O).nav.style?.sheetCart) && e(f);
					});
					var p = I(d, 2), m = N(p), h = F(m, !0), g = I(m, 2);
					{
						let e = /* @__PURE__ */ k(() => z(O).nav.style?.sheet?.bg ?? "surface"), t = /* @__PURE__ */ k(la), n = /* @__PURE__ */ k(() => Y("tip.nav.sheetBg"));
						wa(g, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => rl("bg", e)
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
						let e = /* @__PURE__ */ k(() => z(O).nav.style?.sheet?.textColor ?? z(O).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ k(la), n = /* @__PURE__ */ k(() => Y("tip.nav.sheetTextColorPick"));
						wa(te, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => rl("textColor", e)
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
					]), B("change", r, (e) => xc("sheetLogo", e.target.checked ? !0 : void 0)), B("input", _, (e) => rl("bgOpacity", e.target.valueAsNumber / 100)), B("change", b, (e) => rl("blur", e.target.checked)), H(e, t);
				};
				W(Bt, (e) => {
					z(O).nav.style?.mobileMenu === "sheet" && e(Vt);
				});
				var Ht = I(Bt, 2), Ut = (e) => {
					var t = r_(), n = N(t), r = F(n, !0), i = I(n, 2);
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
							onchange: (e) => xc("mobileSubs", e === "collapsed" ? void 0 : e)
						});
					}
					E(t), R((e, n) => {
						J(t, "title", e), U(r, n);
					}, [() => Y("tip.nav.mobileSubs"), () => Y("lbl.mobileSubs")]), H(e, t);
				}, Wt = /* @__PURE__ */ k(() => z(O).nav.items?.some((e) => e.children?.length));
				W(Ht, (e) => {
					z(Wt) && e(Ut);
				}), E(D), E($e);
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
					var a = a_();
					let o;
					var s = N(a), c = F(s, !0), l = F(I(s), !0);
					E(a), R((e) => {
						o = gi(a, 1, "tile hover-tile svelte-1n46o8q", null, o, { on: (z(O).nav.style?.hover ?? "standard") === r() }), J(a, "aria-pressed", (z(O).nav.style?.hover ?? "standard") === r()), gi(s, 1, `hover-sample hover-${r() ?? ""}`, "svelte-1n46o8q"), U(c, e), U(l, i());
					}, [() => Y("seed.home")]), B("click", a, () => El(r())), H(e, a);
				}), E(Zt), E(Jt);
				var Qt = I(Jt, 2), $t = (e) => {
					var t = o_(), n = N(t), r = F(n, !0), i = I(n, 2);
					K(i);
					var a = F(I(i, 2));
					E(t), R((e, n, o) => {
						J(t, "title", e), U(r, n), q(i, z(O).nav.style?.hoverGlow ?? .6), U(a, `${o ?? ""}%`);
					}, [
						() => Y("tip.nav.hoverGlow"),
						() => Y("lbl.glowStrength"),
						() => Math.round((z(O).nav.style?.hoverGlow ?? .6) * 100)
					]), B("input", i, (e) => xc("hoverGlow", Number(e.target.value))), H(e, t);
				};
				W(Qt, (e) => {
					z(O).nav.style?.hover === "lift" && e($t);
				});
				var M = I(Qt, 2), en = N(M), tn = (e) => {
					var t = Th(), n = N(t);
					{
						let e = /* @__PURE__ */ k(() => z(O).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ k(la);
						wa(n, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							get label() {
								return z(ul)[1];
							},
							onchange: (e) => xc("hoverColor", e)
						});
					}
					var r = F(I(n, 2), !0);
					E(t), R(() => {
						J(t, "title", z(ul)[1]), U(r, z(ul)[0]);
					}), H(e, t);
				};
				W(en, (e) => {
					z(ul) && e(tn);
				});
				var nn = I(en, 2), rn = N(nn);
				{
					let e = /* @__PURE__ */ k(() => z(O).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ k(la), n = /* @__PURE__ */ k(() => Y("tip.nav.hoverTextColorPick"));
					wa(rn, {
						get value() {
							return z(e);
						},
						get tokens() {
							return z(t);
						},
						get label() {
							return z(n);
						},
						onchange: (e) => xc("hoverTextColor", e)
					});
				}
				var an = F(I(rn, 2), !0);
				E(nn);
				var on = I(nn, 2), sn = N(on);
				{
					let e = /* @__PURE__ */ k(() => z(O).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ k(la), n = /* @__PURE__ */ k(() => Y("tip.nav.textColorPick"));
					wa(sn, {
						get value() {
							return z(e);
						},
						get tokens() {
							return z(t);
						},
						get label() {
							return z(n);
						},
						onchange: (e) => xc("textColor", e)
					});
				}
				var cn = F(I(sn, 2), !0);
				E(on), E(M);
				var ln = I(M, 2), un = N(ln);
				K(un);
				var dn = I(un);
				E(ln), E(A), E(Gt);
				var fn = I(Gt, 4), pn = N(fn), mn = F(pn, !0), hn = I(pn, 2), gn = N(hn);
				a(gn, () => ta, () => z(O).nav?.style?.background?.layers ?? []), E(hn), E(fn), E(ne), E(b);
				var _n = I(b, 2), vn = N(_n), yn = F(vn, !0), bn = I(vn, 2), xn = N(bn), Sn = N(xn);
				K(Sn);
				var Cn = I(Sn);
				E(xn);
				var wn = I(xn, 2), Tn = (e) => {
					var t = c_(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2);
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
							onchange: (e) => Uo("edit:nav-announce-link", () => {
								let t = { ...z(O).nav.announcement ?? {} };
								delete t.page, delete t.href, e === "custom" ? t.href = "" : e && (t.page = e), z(O).nav.announcement = t;
							})
						});
					}
					E(o);
					var l = I(o, 2), u = (e) => {
						var t = s_(), n = N(t), r = F(n, !0), i = I(n, 2);
						K(i), E(t), R((e, n) => {
							J(t, "title", e), U(r, n), q(i, z(O).nav.announcement?.href ?? "");
						}, [() => Y("tip.nav.announceHref"), () => Y("lbl.announceHref")]), B("change", i, (e) => Kc("href", e.target.value.trim())), H(e, t);
					};
					W(l, (e) => {
						z(O).nav.announcement?.href !== void 0 && !z(O).nav.announcement?.page && e(u);
					});
					var d = I(l, 2), f = (e) => {
						var t = Cm(), n = N(t);
						K(n);
						var r = I(n);
						E(t), R((e, i) => {
							J(t, "title", e), Ci(n, z(O).nav.announcement?.sticky !== !1), U(r, ` ${i ?? ""}`);
						}, [() => Y("tip.nav.announceSticky"), () => Y("lbl.announceSticky")]), B("change", n, (e) => Kc("sticky", e.target.checked ? void 0 : !1)), H(e, t);
					};
					W(d, (e) => {
						z(O).nav.sticky !== !1 && !z(Cc) && !z(Sc) && !z(O).nav.overlay && e(f);
					});
					var p = I(d, 2), m = (e) => {
						var t = Cm(), n = N(t);
						K(n);
						var r = I(n);
						E(t), R((e, i) => {
							J(t, "title", e), Ci(n, z(O).nav.announcement?.followNav === !0), U(r, ` ${i ?? ""}`);
						}, [() => Y("tip.nav.announceFollowNav"), () => Y("lbl.announceFollowNav")]), B("change", n, (e) => Kc("followNav", e.target.checked ? !0 : void 0)), H(e, t);
					};
					W(p, (e) => {
						z(O).nav.scroll === "hide" && z(O).nav.sticky !== !1 && !z(Sc) && z(O).nav.announcement?.sticky !== !1 && e(m);
					});
					var h = I(p, 2), g = (e) => {
						{
							let t = /* @__PURE__ */ k(() => Y("lbl.announcePlace")), n = /* @__PURE__ */ k(() => Y("tip.nav.announcePlace")), r = /* @__PURE__ */ k(() => z(O).nav.announcement?.place ?? "nav"), i = /* @__PURE__ */ k(() => [
								["nav", Y("opt.announcePlace.nav")],
								["page", Y("opt.announcePlace.page")],
								["content", Y("opt.announcePlace.content")]
							]);
							As(e, {
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
								onchange: (e) => Kc("place", e === "nav" ? void 0 : e)
							});
						}
					};
					W(h, (e) => {
						z(Sc) && e(g);
					});
					var _ = I(h, 2), v = N(_);
					K(v);
					var y = I(v);
					E(_);
					var b = I(_, 2), x = (e) => {
						var t = Hm(), n = F(t, !0);
						R((e, r) => {
							J(t, "title", e), U(n, r);
						}, [() => Y("tip.nav.announceShowAgain"), () => Y("lbl.announceShowAgain")]), B("click", t, () => rt?.sendAnnounceReset()), H(e, t);
					};
					W(b, (e) => {
						z(O).nav.announcement?.dismiss !== !1 && e(x);
					});
					var S = I(b, 2), ee = N(S), te = I(ee);
					{
						let e = /* @__PURE__ */ k(() => z(O).nav.announcement?.color ?? "accent"), t = /* @__PURE__ */ k(la), n = /* @__PURE__ */ k(() => Y("tip.nav.announceColor"));
						wa(te, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => Kc("color", e)
						});
					}
					E(S);
					var ne = I(S, 2), re = N(ne), C = I(re);
					{
						let e = /* @__PURE__ */ k(() => z(O).nav.announcement?.textColor ?? "accent-text"), t = /* @__PURE__ */ k(la), n = /* @__PURE__ */ k(() => Y("tip.nav.announceTextColor"));
						wa(C, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => Kc("textColor", e)
						});
					}
					E(ne), R((e, t, r, c, l, u, d, f, p, m) => {
						J(n, "title", e), U(i, t), q(a, z(O).nav.announcement?.text ?? ""), J(o, "title", r), U(s, `${c ?? ""} `), J(_, "title", l), Ci(v, z(O).nav.announcement?.dismiss !== !1), U(y, ` ${u ?? ""}`), J(S, "title", d), U(ee, `${f ?? ""} `), J(ne, "title", p), U(re, `${m ?? ""} `);
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
					]), B("change", a, (e) => Kc("text", e.target.value.trim() || void 0)), B("change", v, (e) => Kc("dismiss", e.target.checked ? void 0 : !1)), H(e, t);
				};
				W(wn, (e) => {
					z(O).nav.announcement?.show && e(Tn);
				}), E(bn), E(_n);
				var L = I(_n, 2), En = N(L), Dn = F(En, !0), On = I(En, 2);
				{
					let e = (e, t = f, n = f) => {
						var r = l_(), i = N(r);
						G(i, () => C.up, !0), E(i);
						var a = I(i, 2);
						G(a, () => C.down, !0), E(a), E(r), R((e, t) => {
							J(i, "title", e), i.disabled = n() === 0, J(a, "title", t), a.disabled = n() === z(vc).length - 1;
						}, [() => Y("tip.moveUp"), () => Y("tip.moveDown")]), B("click", i, (e) => {
							e.preventDefault(), e.stopPropagation(), yc(t(), -1);
						}), B("click", a, (e) => {
							e.preventDefault(), e.stopPropagation(), yc(t(), 1);
						}), H(e, r);
					};
					var kn = N(On), An = (e) => {
						var t = Sm(), n = P(t);
						{
							let e = /* @__PURE__ */ k(() => Y("lbl.toolsSide")), t = /* @__PURE__ */ k(() => Y("tip.nav.toolsSideColumn")), r = /* @__PURE__ */ k(() => z(O).nav.style?.tools?.side ?? "end"), i = /* @__PURE__ */ k(() => [["start", Y("opt.toolsSide.top")], ["end", Y("opt.toolsSide.bottom")]]);
							As(n, {
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
								onchange: (e) => bc("side", e === "start" ? "start" : void 0)
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
							As(r, {
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
								onchange: (e) => bc("align", e === "center" ? void 0 : e)
							});
						}
						H(e, t);
					}, jn = (e) => {
						{
							let t = /* @__PURE__ */ k(() => Y("lbl.toolsSide")), n = /* @__PURE__ */ k(() => Y("tip.nav.toolsSide")), r = /* @__PURE__ */ k(() => z(O).nav.style?.tools?.side ?? "end"), i = /* @__PURE__ */ k(() => [["start", Y("opt.toolsSide.start")], ["end", Y("opt.toolsSide.end")]]);
							As(e, {
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
								onchange: (e) => bc("side", e === "start" ? "start" : void 0)
							});
						}
					};
					W(kn, (e) => {
						z(Sc) ? e(An) : e(jn, -1);
					}), Jr(I(kn, 2), 18, () => z(vc), (e) => e, (t, n, r) => {
						var i = Nr(), a = P(i), o = (t) => {
							var i = Nr(), a = P(i), o = (t) => {
								var i = u_(), a = N(i), o = N(a), s = F(o, !0), c = I(o);
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
								]), B("change", u, (e) => bc("theme", e.target.checked ? void 0 : !1)), H(t, i);
							};
							W(a, (e) => {
								z(O).theme?.alt?.tokens && e(o);
							}), H(t, i);
						}, s = (t) => {
							var i = d_(), a = N(i), o = N(a), s = F(o, !0), c = I(o);
							e(c, () => n, () => z(r)), E(a);
							var l = I(a, 2), u = N(l);
							K(u);
							var d = I(u);
							E(l);
							var f = I(l, 2), p = (e) => {
								var t = r_(), n = N(t), r = F(n, !0), i = I(n, 2);
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
										onchange: (e) => Uo("nav", () => {
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
							]), B("change", u, (e) => Uo("nav", () => {
								e.target.checked ? z(O).nav.cart = {
									...z(O).nav.cart ?? {},
									show: !0
								} : delete z(O).nav.cart;
							})), H(t, i);
						}, c = (t) => {
							var i = b_(), a = N(i), o = N(a), s = N(o, !0), c = I(s);
							e(c, () => n, () => z(r)), E(o), E(a);
							var l = I(a, 2), u = N(l), d = N(u);
							K(d);
							var f = I(d);
							E(u);
							var p = I(u, 2), m = (e) => {
								var t = y_(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2);
								Jr(a, 21, () => z(bl), ([e, t]) => e, (e, t) => {
									var n = /* @__PURE__ */ k(() => h(z(t), 2));
									let r = () => z(n)[0], i = () => z(n)[1];
									var a = Gg();
									let o;
									var s = N(a);
									G(s, () => _[r()]);
									var c = F(I(s), !0);
									E(a), R(() => {
										o = gi(a, 1, "tile svelte-1n46o8q", null, o, { on: (z(O).nav.launcher?.view ?? "grid") === r() }), J(a, "aria-pressed", (z(O).nav.launcher?.view ?? "grid") === r()), U(c, i());
									}), B("click", a, () => Zc("view", r() === "grid" ? void 0 : r())), H(e, a);
								}), E(a), E(n);
								var o = I(n, 2);
								{
									let e = /* @__PURE__ */ k(() => Y("lbl.launcherMobileView")), t = /* @__PURE__ */ k(() => Y("tip.nav.launcherMobileView")), n = /* @__PURE__ */ k(() => z(O).nav.launcher?.mobileView ?? ""), r = /* @__PURE__ */ k(() => [["", Y("lbl.navSameAsDesktop")], ...z(bl)]);
									As(o, {
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
										onchange: (e) => Zc("mobileView", e || void 0)
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
								var g = I(f, 2), v = (e) => {
									var t = f_(), n = N(t), r = F(n, !0), i = I(n, 2);
									K(i), E(t), R((e, n, a) => {
										J(t, "title", e), U(r, n), J(i, "placeholder", a), q(i, z(O).nav.launcher?.title ?? "");
									}, [
										() => Y("tip.nav.launcherTitleText"),
										() => Y("lbl.launcherTitle"),
										() => Y("ph.launcherTitle")
									]), B("change", i, (e) => Zc("title", e.target.value.trim() || void 0)), H(e, t);
								};
								W(g, (e) => {
									z(O).nav.launcher?.showTitle !== !1 && e(v);
								});
								var y = I(g, 2), b = N(y), x = F(b, !0), S = I(b, 2), ee = N(S);
								{
									let e = /* @__PURE__ */ k(() => z(O).nav.launcher?.icon ?? ""), t = /* @__PURE__ */ k(() => z(O).nav.launcher?.image ?? ""), n = /* @__PURE__ */ k(Yc), r = /* @__PURE__ */ k(() => Y("opt.launcherDots")), i = /* @__PURE__ */ k(() => Y("tip.nav.launcherIcon"));
									Fo(ee, {
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
										onpick: (e) => Xc(null, e),
										onfile: (e) => nl(e, null),
										children: (e, t) => {
											var n = Nr(), r = P(n), i = (e) => {
												var t = p_();
												R(() => J(t, "src", z(O).nav.launcher.image)), H(e, t);
											}, a = (e) => {
												var t = Nr();
												G(P(t), () => oo(z(O).nav.launcher.icon) || ""), H(e, t);
											}, o = (e) => {
												var t = Nr();
												G(P(t), () => qc), H(e, t);
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
									R((e) => U(t, e), [() => Y(io[z(O).nav.launcher.icon]?.labelKey ?? "common.none")]), H(e, t);
								}, ae = (e) => {
									var t = Mr();
									R((e) => U(t, e), [() => Y("opt.launcherDots")]), H(e, t);
								};
								W(ne, (e) => {
									z(O).nav.launcher?.image ? e(re) : z(O).nav.launcher?.icon ? e(ie, 1) : e(ae, -1);
								}), E(te), E(S), E(y);
								var oe = I(y, 2);
								Jr(oe, 17, () => z(O).nav.launcher?.links ?? [], Wr, (e, t, n) => {
									let r = /* @__PURE__ */ k(() => !$u(z(t).href ?? ""));
									var i = v_();
									let a;
									var o = N(i), s = N(o), c = N(s), l = (e) => {
										var n = Hg();
										R(() => J(n, "src", z(t).image)), H(e, n);
									}, u = (e) => {
										var n = Nr();
										G(P(n), () => oo(z(t).icon) || ""), H(e, n);
									};
									W(c, (e) => {
										z(t).image ? e(l) : e(u, -1);
									}), E(s);
									var d = I(s, 2), f = F(d, !0), p = I(d, 2), m = (e) => {
										var t = m_();
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
										var i = __(), a = N(i);
										{
											let e = /* @__PURE__ */ k(() => z(t).icon ?? ""), r = /* @__PURE__ */ k(() => z(t).image ?? ""), i = /* @__PURE__ */ k(Yc), o = /* @__PURE__ */ k(() => Y("mp.pickMark"));
											Fo(a, {
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
												onpick: (e) => Xc(n, e),
												onfile: (e) => nl(e, n),
												children: (e, n) => {
													var r = h_(), i = P(r), a = N(i), o = (e) => {
														var n = Hg();
														R(() => J(n, "src", z(t).image)), H(e, n);
													}, s = (e) => {
														var n = Nr();
														G(P(n), () => oo(z(t).icon) || ""), H(e, n);
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
											var t = g_(), n = F(t, !0);
											R((e) => U(n, e), [() => Y("ui.badTarget")]), H(e, t);
										};
										W(u, (e) => {
											z(r) && e(d);
										});
										var f = I(u, 2), p = N(f);
										{
											let e = /* @__PURE__ */ k(() => z(t).icon ?? ""), r = /* @__PURE__ */ k(() => z(t).image ?? ""), i = /* @__PURE__ */ k(Yc), a = /* @__PURE__ */ k(() => Y("mp.pickMark"));
											Fo(p, {
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
												onpick: (e) => Xc(n, e),
												onfile: (e) => nl(e, n),
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
										]), B("change", s, (e) => tl(n, "label", e.target.value)), B("change", c, (e) => tl(n, "href", e.target.value)), B("click", m, () => $c(n)), H(e, i);
									};
									W(y, (e) => {
										z(Jc) === n && e(b);
									}), E(i), R((e, t, r) => {
										a = gi(i, 1, "lrow svelte-1n46o8q", null, a, { open: z(Jc) === n }), U(f, e), J(g, "title", t), J(_, "title", r), _.disabled = n === z(O).nav.launcher.links.length - 1;
									}, [
										() => z(t).label || Y("seed.link"),
										() => Y("tip.moveUp"),
										() => Y("tip.moveDown")
									]), B("click", o, () => j(Jc, z(Jc) === n ? null : n, !0)), B("keydown", o, (e) => {
										(e.key === "Enter" || e.key === " ") && (e.preventDefault(), j(Jc, z(Jc) === n ? null : n, !0));
									}), B("click", h, (e) => e.stopPropagation()), B("keydown", h, (e) => e.stopPropagation()), B("click", g, () => el(n, -1)), B("click", _, () => el(n, 1)), H(e, i);
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
								]), B("input", u, (e) => Zc("mobileMax", e.target.valueAsNumber === 6 ? void 0 : e.target.valueAsNumber)), B("change", p, (e) => Zc("showTitle", e.target.checked ? void 0 : !1)), B("click", se, Qc), H(e, t);
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
							]), B("change", d, (e) => Zc("show", e.target.checked ? !0 : void 0)), H(t, i);
						};
						W(a, (e) => {
							n === "theme" ? e(o) : n === "cart" ? e(s, 1) : e(c, -1);
						}), H(t, i);
					}), E(On);
				}
				E(L);
				var Mn = I(L, 2), Nn = N(Mn), Pn = F(Nn, !0), Fn = I(Nn, 2), In = N(Fn), Ln = N(In), Rn = F(Ln, !0), zn = I(Ln, 2);
				let Bn;
				Jr(zn, 21, () => z(xl), ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ k(() => h(z(t), 2));
					let r = () => z(n)[0], i = () => z(n)[1];
					var a = Gg();
					let o;
					var s = N(a);
					G(s, () => g[r()]);
					var c = F(I(s), !0);
					E(a), R(() => {
						o = gi(a, 1, "tile svelte-1n46o8q", null, o, { on: (z(O).nav.style?.subStyle ?? "card") === r() }), J(a, "aria-pressed", (z(O).nav.style?.subStyle ?? "card") === r()), U(c, i());
					}), B("click", a, () => xc("subStyle", r() === "card" ? void 0 : r())), H(e, a);
				}), E(zn), E(In);
				var Vn = I(In, 2), Hn = (e) => {
					var t = Sm(), n = P(t), r = (e) => {
						var t = Sm(), n = P(t);
						{
							let e = /* @__PURE__ */ k(() => Y("lbl.sideSubs")), t = /* @__PURE__ */ k(() => Y("tip.nav.sideSubs")), r = /* @__PURE__ */ k(() => z(O).nav.style?.sideSubs ?? "collapsed"), i = /* @__PURE__ */ k(() => [["collapsed", Y("opt.mobileSubs.collapsed")], ["expanded", Y("opt.mobileSubs.expanded")]]);
							As(n, {
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
								onchange: (e) => xc("sideSubs", e === "collapsed" ? void 0 : e)
							});
						}
						var r = I(n, 2), i = (e) => {
							var t = Cm(), n = N(t);
							K(n);
							var r = I(n);
							E(t), R((e, i) => {
								J(t, "title", e), Ci(n, z(O).nav.style?.sideSubArrow === !0), U(r, ` ${i ?? ""}`);
							}, [() => Y("tip.nav.sideSubArrow"), () => Y("lbl.sideSubArrow")]), B("change", n, (e) => xc("sideSubArrow", e.target.checked ? !0 : void 0)), H(e, t);
						};
						W(r, (e) => {
							z(O).nav.style?.sideSubs === "expanded" && e(i);
						}), H(e, t);
					};
					W(n, (e) => {
						z(Sc) && e(r);
					});
					var i = I(n, 2), a = (e) => {
						{
							let t = /* @__PURE__ */ k(() => Y("lbl.subOpen")), n = /* @__PURE__ */ k(() => Y("tip.nav.subOpen")), r = /* @__PURE__ */ k(() => z(O).nav.style?.subOpen ?? "hover"), i = /* @__PURE__ */ k(() => [
								["hover", Y("opt.subOpen.hover")],
								["stay", Y("opt.subOpen.stay")],
								["click", Y("opt.subOpen.click")]
							]);
							As(e, {
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
								onchange: (e) => xc("subOpen", e === "hover" ? void 0 : e)
							});
						}
					};
					W(i, (e) => {
						(!z(Sc) || z(O).nav.style?.sideSubs !== "expanded") && e(a);
					}), H(e, t);
				}, Un = /* @__PURE__ */ k(() => z(O).nav.items?.some((e) => e.children?.length));
				W(Vn, (e) => {
					z(Un) && e(Hn);
				});
				var Wn = I(Vn, 2), Gn = (e) => {
					var t = Qp(), n = N(t), r = I(n);
					{
						let e = /* @__PURE__ */ k(() => z(O).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ k(la), n = /* @__PURE__ */ k(() => Y("tip.nav.subPillColorPick"));
						wa(r, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => xc("subPillColor", e)
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
						let n = /* @__PURE__ */ k(_f);
						var r = x_();
						let i;
						var a = N(r);
						G(a, () => Sf, !0), E(a);
						var o = I(a, 2), s = N(o), c = F(s, !0), l = F(I(s, 2), !0);
						E(o), E(r), R(() => {
							i = gi(r, 1, "nav-item ghost svelte-1n46o8q", null, i, { child: t() }), U(c, z(n).label), U(l, z(n).target);
						}), H(e, r);
					};
					var $n = N(Qn);
					Jr($n, 21, () => z(O).nav.items, Wr, (t, n, r) => {
						let i = /* @__PURE__ */ k(() => `${r}`);
						var a = T_(), o = P(a), s = (t) => {
							e(t, () => !1);
						};
						W(o, (e) => {
							z(ff)?.key === z(i) && z(ff).pos === "before" && e(s);
						});
						var c = I(o, 2);
						let l;
						var u = N(c);
						G(u, () => Sf, !0), E(u);
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
								onchange: (e) => af(r, e)
							});
						}
						var h = I(m, 2), g = (e) => {
							var t = S_();
							K(t), R((e, r) => {
								q(t, z(n).href), J(t, "placeholder", e), J(t, "title", r);
							}, [() => Y("ph.hrefAnchor"), () => Y("tip.hrefAnchor")]), B("change", t, (e) => of(r, e.target.value)), H(e, t);
						};
						W(h, (e) => {
							!z(n).page && z(n).href != null && e(g);
						}), E(p), E(d);
						var _ = I(d, 2), v = (e) => {
							var t = C_();
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
							var s = w_(), c = P(s), l = (t) => {
								e(t, () => !0);
							};
							W(c, (e) => {
								z(ff)?.key === z(o) && z(ff).pos === "before" && e(l);
							});
							var u = I(c, 2);
							let d;
							var f = N(u);
							G(f, () => Sf, !0), E(f);
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
									onchange: (e) => Ef(r, a, e)
								});
							}
							var _ = I(g, 2), v = (e) => {
								var t = S_();
								K(t), R((e, n) => {
									q(t, z(i).href ?? ""), J(t, "placeholder", e), J(t, "title", n);
								}, [() => Y("ph.hrefAnchor"), () => Y("tip.hrefAnchor")]), B("change", t, (e) => Df(r, a, e.target.value)), H(e, t);
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
								z(ff)?.key === z(o) && z(ff).pos === "after" && e(ne);
							}), R((e, t, r, s, c, l, p) => {
								d = gi(u, 1, "nav-item child svelte-1n46o8q", null, d, {
									selected: z(lf) === z(o),
									dragging: z(df) === z(o)
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
								e.stopPropagation(), j(lf, z(o));
							}), Cr("dragstart", f, (e) => {
								e.stopPropagation(), j(df, z(o)), e.dataTransfer?.setData(yf, z(o));
							}), Cr("dragend", f, vf), B("input", m, (e) => Tf(r, a, e.target.value)), B("click", b, () => Of(r, a, -1)), B("click", x, () => kf(r, a)), B("click", S, () => Of(r, a, 1)), B("click", ee, (e) => {
								e.stopPropagation(), j(lf, z(o));
							}), H(t, s);
						});
						var re = I(ne, 2), ie = (t) => {
							e(t, () => !0);
						};
						W(re, (e) => {
							z(ff)?.key === z(i) && z(ff).pos === "into" && e(ie);
						});
						var ae = I(re, 2), oe = (t) => {
							e(t, () => !1);
						};
						W(ae, (e) => {
							z(ff)?.key === z(i) && z(ff).pos === "after" && e(oe);
						}), R((e, t, a, o, s, d, p, m) => {
							l = gi(c, 1, "nav-item svelte-1n46o8q", null, l, {
								selected: z(lf) === z(i),
								dragging: z(df) === z(i),
								"drop-target": z(ff)?.key === z(i) && z(ff).pos === "into"
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
							j(lf, z(i));
						}), Cr("dragstart", u, (e) => {
							j(df, z(i)), e.dataTransfer?.setData(yf, z(i));
						}), Cr("dragend", u, vf), B("input", f, (e) => rf(r, e.target.value)), B("click", b, () => wf(r)), B("click", x, () => sf(r, -1)), B("click", S, () => cf(r)), B("click", ee, () => sf(r, 1)), B("click", te, () => {
							j(lf, z(i));
						}), H(t, a);
					}), E($n);
					var er = I($n, 2), tr = F(er, !0), nr = I(er, 2), rr = N(nr);
					K(rr);
					var ir = I(rr, 2), ar = F(ir, !0);
					E(nr), E(Qn), R((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, ee, te, ne, re, C, ie, ae, oe, se, ce, le, w, ue, de, fe, pe, T, me, he, ge, _e, ve, ye, be, xe, Se, Ce, we, Te, Ee, De, E, Oe, ke, Ae) => {
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
						() => !z(ee).trim(),
						() => Y("ui.newPageAsItem")
					]), Cr("dragover", $n, bf), Cr("drop", $n, (e) => {
						e.preventDefault(), xf(z(ff)?.key ?? "");
					}), B("click", er, Cf), B("keydown", rr, (e) => {
						e.key === "Enter" && te();
					}), Di(rr, () => z(ee), (e) => j(ee, e)), B("click", ir, te);
				}
				E(Yn), E(t), R((e, t, n, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, ee, te, ne, re, C, ie, oe, ce, ue, de, fe, pe, T, me, he, ge, _e, ve, ye, be, Ce, Te, Ee, E, Oe, ke, Ae, je, Ne, Le, Re, ze, Be, He, Ue, We, Ge, Ke) => {
					J(r, "title", e), U(i, t), U(S, n), U(ae, a), J(se, "title", o), U(le, s), J(w, "aria-label", c), J(xe, "title", l), U(Se, u), J(we, "title", d), U(De, f), J(Me, "title", p), U(Pe, m), J(Fe, "min", is.min), J(Fe, "max", is.max), J(Fe, "step", is.step), q(Fe, z(kc)), J(Ie, "min", is.min), J(Ie, "max", is.max), q(Ie, z(kc)), U(Ve, h), U(Ye, g), J(et, "title", _), U(tt, v), J(ot, "title", y), U(ct, b), J(lt, "min", is.min), J(lt, "max", is.max), J(lt, "placeholder", x), q(lt, z(O).nav.style?.mobile?.textSize ?? ""), J(dt, "title", ee), U(pt, te), J(ht, "title", ne), U(_t, re), J(bt, "title", C), U(St, ie), J(Dt, "title", oe), U(kt, ce), J(Pt, "title", ue), U(It, de), U(qt, fe), U(Xt, pe), J(Zt, "aria-label", T), J(nn, "title", me), U(an, he), J(on, "title", ge), U(cn, _e), J(ln, "title", ve), Ci(un, z(O).nav.style?.blur !== !1), U(dn, ` ${ye ?? ""}`), U(mn, be), J(vn, "title", Ce), U(yn, Te), J(xn, "title", Ee), Ci(Sn, z(O).nav.announcement?.show === !0), U(Cn, ` ${E ?? ""}`), J(En, "title", Oe), U(Dn, ke), U(Pn, Ae), U(Rn, je), Bn = gi(zn, 1, "tile-grid svelte-1n46o8q", null, Bn, {
						"cols-5": !z(Sc),
						"cols-3": z(Sc)
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
					() => !z(ee).trim(),
					() => Y("ui.newPageAsItem")
				]), B("input", Fe, (e) => xc("textSize", e.target.valueAsNumber)), B("change", Ie, (e) => il(e, "textSize", is)), B("change", lt, (e) => al(e, "textSize", is)), B("change", un, (e) => xc("blur", e.target.checked)), B("change", Sn, (e) => Kc("show", e.target.checked ? !0 : void 0)), B("change", Jn, (e) => xc("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), H(e, t);
			}, b = (e) => {
				var t = j_(), n = N(t), r = N(n), i = I(r);
				K(i), E(n);
				var a = I(n, 2), o = N(a), s = I(o);
				K(s), E(a);
				var c = I(a, 2), l = N(c), u = I(l);
				{
					let e = /* @__PURE__ */ k(fc), t = /* @__PURE__ */ k(pc);
					X(u, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => mc(e)
					});
				}
				E(c);
				var d = I(c, 4), f = F(d, !0), p = I(d, 2), m = N(p);
				Jr(m, 17, () => z(cc), (e) => e.screen, (e, t) => {
					var n = D_(), r = N(n), i = F(r, !0), a = I(r, 2);
					let o;
					var s = F(a), c = F(I(a, 2), !0);
					E(n), R(() => {
						U(i, z(t).screen), o = gi(a, 1, "cw-bar svelte-1n46o8q", null, o, { fluid: !z(t).bound }), vi(s, `width:${z(t).pct ?? ""}%`), U(c, z(t).bound ? `${z(t).margin}` : "-");
					}), H(e, n);
				});
				var h = I(m, 2), g = N(h), _ = F(g, !0), v = F(I(g, 2), !0);
				E(h);
				var y = I(h, 2), b = (e) => {
					var t = O_(), n = F(t, !0);
					R((e) => U(n, e), [() => Y("lbl.bindsFrom", { n: z(Re) })]), H(e, t);
				};
				W(y, (e) => {
					z(nc) !== "full" && e(b);
				}), E(p);
				var x = I(p, 2);
				Jr(x, 21, () => Xo, (e) => e.id, (e, t) => {
					var n = Tg();
					let r;
					var i = F(n, !0);
					R((e) => {
						r = gi(n, 1, "svelte-1n46o8q", null, r, { on: z(ic) === z(t).id }), U(i, e);
					}, [() => Y(`lbl.width.${z(t).id}`)]), B("click", n, () => uc(z(t).width)), H(e, n);
				}), E(x);
				var S = I(x, 2), ee = (e) => {
					var t = k_(), n = N(t), r = F(n, !0), i = I(n, 2);
					K(i);
					var a = F(I(i, 2));
					E(t), R((e, n) => {
						J(t, "title", e), U(r, n), J(i, "min", 960), J(i, "max", Jo), J(i, "step", 20), q(i, z(sc)), U(a, `${z(sc) ?? ""} px`);
					}, [() => Y("tip.site.contentWidthFree"), () => Y("lbl.widthFree")]), B("input", i, (e) => uc(e.target.valueAsNumber)), H(e, t);
				};
				W(S, (e) => {
					z(nc) !== "full" && e(ee);
				});
				var te = I(S, 2), ne = F(te, !0), re = I(te, 2);
				Jr(re, 21, () => Yo, (e) => e.id, (e, t) => {
					var n = Tg();
					let r;
					var i = F(n, !0);
					R((e) => {
						r = gi(n, 1, "svelte-1n46o8q", null, r, { on: z(ac) === z(t).id }), U(i, e);
					}, [() => Y(`lbl.gutter.${z(t).id}`)]), B("click", n, () => dc(z(t).gutter)), H(e, n);
				}), E(re);
				var ie = I(re, 2), ae = N(ie), oe = F(ae, !0), se = I(ae, 2), ce = N(se), le = N(ce), w = F(le, !0), ue = I(le, 2);
				K(ue);
				var de = F(I(ue, 2));
				E(ce), E(se), E(ie);
				var fe = I(ie, 4), pe = N(fe), T = I(pe), me = (e) => {
					var t = Ig();
					R((e) => {
						J(t, "src", z(O).site.icon), J(t, "alt", e);
					}, [() => Y("lbl.siteIcon")]), H(e, t);
				};
				W(T, (e) => {
					z(O).site.icon && e(me);
				}), E(fe);
				var he = I(fe, 2), ge = N(he), _e = N(ge), ve = I(_e);
				E(ge);
				var ye = I(ge, 2), be = (e) => {
					var t = A_(), n = P(t);
					G(n, () => C.pencil ?? "✎", !0), E(n);
					var r = I(n, 2);
					G(r, () => C.cross, !0), E(r), R((e, t) => {
						J(n, "title", e), J(r, "title", t);
					}, [() => Y("tip.site.editIcon"), () => Y("tip.site.removeIcon")]), B("click", n, () => j(qs, z(O).site.icon, !0)), B("click", r, Z), H(e, t);
				};
				W(ye, (e) => {
					z(O).site.icon && e(be);
				}), E(he), E(t), R((e, t, u, p, m, h, g, y, b, x, S, ee, re, C, ae, se, le, fe, T, me) => {
					J(n, "title", e), U(r, `${t ?? ""} `), q(i, z(O).site.title ?? ""), J(i, "placeholder", u), J(a, "title", p), U(o, `${m ?? ""} `), q(s, z(O).site.description ?? ""), J(s, "placeholder", h), J(c, "title", g), U(l, `${y ?? ""} `), J(d, "title", b), U(f, x), U(_, S), U(v, ee), J(te, "title", re), U(ne, C), ie.open = z(ac) === null || z(oc), U(oe, ae), J(ce, "title", se), U(w, le), J(ue, "min", 0), J(ue, "max", 12), J(ue, "step", 1), q(ue, z(rc)), U(de, `${z(rc) ?? ""} vw`), U(pe, `${fe ?? ""} `), J(ge, "title", T), U(_e, `${me ?? ""} `);
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
				]), B("input", i, (e) => $s(e.target.value)), B("input", s, (e) => ec(e.target.value)), Cr("toggle", ie, (e) => j(oc, e.currentTarget.open, !0)), B("input", ue, (e) => dc(e.target.valueAsNumber)), B("change", ve, Ys), H(e, t);
			}, x = (e) => {
				var t = R_();
				{
					let e = (e, t = f, n = f) => {
						var r = N_(), i = N(r), a = (e) => {
							var t = M_(), r = F(t, !0);
							R(() => U(r, n())), H(e, t);
						};
						W(i, (e) => {
							n() && e(a);
						});
						var o = I(i, 2), s = N(o), c = F(s, !0), l = I(s, 2), u = F(l, !0), d = I(l, 2), p = N(d), m = F(p, !0), h = F(I(p), !0);
						E(d), E(o), E(r), R((e, t, n, r, i, a, s, l, d) => {
							vi(o, `--tv-bg:${e ?? ""};--tv-surface:${t ?? ""};--tv-text:${n ?? ""};--tv-accent:${r ?? ""};--tv-accent-ink:${i ?? ""}`), U(c, a), U(u, s), U(m, l), U(h, d);
						}, [
							() => mp(t().bg, t()),
							() => mp(t().surface, t()),
							() => mp(t().text, t()),
							() => mp(t().accent, t()),
							() => mp(t()["accent-text"] ?? ce(mp(t().accent ?? "#000000", t())), t()),
							() => Y("preview.heading"),
							() => Y("preview.cardBody"),
							() => Y("preview.button"),
							() => Y("preview.link")
						]), H(e, r);
					};
					var n = N(t), r = F(n, !0), i = I(n, 2);
					Jr(i, 21, () => gp, (e) => e.id, (e, t) => {
						var n = P_();
						let r;
						var i = N(n), a = N(i), o = I(a), s = I(o), c = I(s);
						E(i);
						var l = F(I(i, 2), !0);
						E(n), R(() => {
							r = gi(n, 1, "theme-preset svelte-1n46o8q", null, r, { sel: z(vp) === z(t).id }), J(n, "title", `${z(t).name} - ${z(t).note}`), vi(a, `background:${z(t).light.bg ?? ""}`), vi(o, `background:${z(t).light.surface ?? ""}`), vi(s, `background:${z(t).light.accent ?? ""}`), vi(c, `background:${z(t).light.text ?? ""}`), U(l, z(t).name);
						}), B("click", n, () => _p(z(t))), H(e, n);
					}), E(i);
					var a = I(i, 2), o = F(a, !0), s = I(a, 2), c = N(s);
					K(c);
					var l = I(c);
					E(s);
					var u = I(s, 2), d = (e) => {
						var t = F_(), n = N(t), r = F(n, !0), i = I(n, 2), a = N(i);
						let o;
						var s = F(a, !0), c = I(a, 2);
						let l;
						var u = F(c, !0);
						E(i), E(t), R((e, t, n, i) => {
							U(r, e), J(a, "title", t), o = gi(a, 1, "svelte-1n46o8q", null, o, { on: z(fa) }), U(s, n), l = gi(c, 1, "svelte-1n46o8q", null, l, { on: !z(fa) }), U(u, i);
						}, [
							() => Y("lbl.darkColors"),
							() => Y("hint.theme.autoDark"),
							() => Y("opt.auto"),
							() => Y("opt.custom")
						]), B("click", a, () => sp(!0)), B("click", c, () => sp(!1)), H(e, t);
					};
					W(u, (e) => {
						z(da) && e(d);
					});
					var p = I(u, 2), m = N(p), g = (e) => {
						var t = fh(), n = F(t, !0);
						R((e) => U(n, e), [() => Y("lbl.light")]), H(e, t);
					};
					W(m, (e) => {
						z(da) && e(g);
					});
					var _ = I(m, 2);
					let Le;
					var v = F(_, !0);
					E(p);
					var y = I(p, 2);
					Jr(y, 21, () => ua, ([e, t, n]) => e, (e, t) => {
						var n = /* @__PURE__ */ k(() => h(z(t), 3));
						let r = () => z(n)[0], i = () => z(n)[1], a = () => z(n)[2];
						var o = I_(), s = N(o);
						{
							let e = /* @__PURE__ */ k(() => z(O).theme.tokens.color[r()] ?? jf(r(), z(ma))), t = /* @__PURE__ */ k(la);
							wa(s, {
								get value() {
									return z(e);
								},
								get tokens() {
									return z(t);
								},
								get label() {
									return i();
								},
								onchange: (e) => Af(r(), e)
							});
						}
						var c = I(s, 2), l = F(c, !0), u = F(I(c, 2), !0);
						E(o), R((e) => {
							U(l, a()), U(u, e);
						}, [() => mp(z(O).theme.tokens.color[r()] ?? jf(r(), z(ma)), z(ma))]), H(e, o);
					}), E(y);
					var b = I(y, 2), x = (e) => {
						var t = L_(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2);
						let o;
						var s = F(a, !0);
						E(n);
						var c = I(n, 2);
						let l;
						Jr(c, 21, () => ua, ([e, t, n]) => e, (e, t) => {
							var n = /* @__PURE__ */ k(() => h(z(t), 3));
							let r = () => z(n)[0], i = () => z(n)[1], a = () => z(n)[2];
							var o = I_(), s = N(o);
							{
								let e = /* @__PURE__ */ k(() => z(O).theme.alt.tokens.color[r()] ?? z(ha)[r()] ?? jf(r(), z(ha))), t = /* @__PURE__ */ k(la), n = /* @__PURE__ */ k(() => Y("theme.darkColorLabel", { name: i() }));
								wa(s, {
									get value() {
										return z(e);
									},
									get tokens() {
										return z(t);
									},
									get label() {
										return z(n);
									},
									onchange: (e) => Xf(r(), e)
								});
							}
							var c = I(s, 2), l = F(c, !0), u = F(I(c, 2), !0);
							E(o), R((e) => {
								U(l, a()), U(u, e);
							}, [() => mp(z(O).theme.alt.tokens.color[r()] ?? z(ha)[r()] ?? jf(r(), z(ha)), z(ha))]), H(e, o);
						}), E(c), R((e, t, n) => {
							U(i, e), o = gi(a, 1, "chip svelte-1n46o8q", null, o, { accent: z(pa) === "dark" }), J(a, "title", t), U(s, n), l = gi(c, 1, "palcells svelte-1n46o8q", null, l, { autopal: z(fa) });
						}, [
							() => Y("lbl.dark"),
							() => Y("tip.theme.darkDefault"),
							() => Y("common.standard")
						]), B("click", a, () => ap("dark")), H(e, t);
					};
					W(b, (e) => {
						z(da) && e(x);
					});
					var S = I(b, 2), ee = N(S), te = F(ee, !0), ne = I(ee, 2);
					let Re;
					var re = F(ne, !0);
					E(S);
					var C = I(S, 2), ie = N(C);
					{
						let t = /* @__PURE__ */ k(() => z(da) ? Y("lbl.light") : "");
						e(ie, () => z(ma), () => z(t));
					}
					var ae = I(ie, 2), oe = (t) => {
						{
							let n = /* @__PURE__ */ k(() => Y("lbl.dark"));
							e(t, () => z(ha), () => z(n));
						}
					};
					W(ae, (e) => {
						z(da) && e(oe);
					}), E(C);
					var se = I(C, 2), le = N(se), w = F(le, !0), ue = I(le, 2), de = N(ue), fe = N(de), pe = I(fe);
					{
						let e = /* @__PURE__ */ k(() => up("heading"));
						X(pe, {
							get value() {
								return z(O).theme.tokens.font.heading;
							},
							get options() {
								return z(e);
							},
							onchange: (e) => Kf("heading", e)
						});
					}
					E(de);
					var T = I(de, 2), me = N(T), he = I(me);
					{
						let e = /* @__PURE__ */ k(() => up("body"));
						X(he, {
							get value() {
								return z(O).theme.tokens.font.body;
							},
							get options() {
								return z(e);
							},
							onchange: (e) => Kf("body", e)
						});
					}
					E(T);
					var ge = I(T, 2), _e = N(ge), ve = F(_e, !0), ye = I(_e, 2), be = F(ye, !0);
					E(ge), E(ue), E(se);
					var xe = I(se, 2), Se = N(xe), Ce = F(Se, !0), we = I(Se, 2), Te = N(we), Ee = N(Te), De = F(Ee, !0), Oe = F(I(Ee, 2), !0);
					E(Te);
					var ke = I(Te, 2), Ae = N(ke, !0), je = F(I(Ae), !0);
					E(ke);
					var Me = I(ke, 2);
					K(Me);
					var Ne = I(Me, 2), Pe = N(Ne, !0), Fe = F(I(Pe), !0);
					E(Ne);
					var Ie = I(Ne, 2);
					K(Ie), E(we), E(xe), E(t), R((e, t, n, i, a, u, d, f, p, m, h, g, y, b, x, ee, C, ie, ae, oe, se) => {
						U(r, e), U(o, t), J(s, "title", n), Ci(c, z(da)), U(l, ` ${i ?? ""}`), Le = gi(_, 1, "chip svelte-1n46o8q", null, Le, { accent: z(pa) === "light" }), J(_, "title", a), U(v, u), J(S, "title", d), U(te, f), Re = gi(ne, 1, "chip palauto svelte-1n46o8q", null, Re, { accent: z(Mf) }), U(re, p), U(w, m), U(fe, `${h ?? ""} `), U(me, `${g ?? ""} `), vi(_e, `font-family:${z(O).theme.tokens.font.heading ?? ""}`), U(ve, y), vi(ye, `font-family:${z(O).theme.tokens.font.body ?? ""}`), U(be, b), U(Ce, x), vi(Te, `--r-sm:${z(O).theme.tokens.radius.sm ?? ""};--r-md:${z(O).theme.tokens.radius.md ?? ""}`), U(De, ee), U(Oe, C), U(Ae, ie), U(je, z(O).theme.tokens.radius.sm), q(Me, ae), U(Pe, oe), U(Fe, z(O).theme.tokens.radius.md), q(Ie, se);
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
						() => fp(z(O).theme.tokens.radius.sm),
						() => Y("lbl.largeCorners"),
						() => fp(z(O).theme.tokens.radius.md)
					]), B("change", c, (e) => op(e.target.checked)), B("click", _, () => ap("light")), B("click", ne, () => Q(!z(Mf))), B("input", Me, (e) => pp("sm", Number(e.target.value))), B("input", Ie, (e) => pp("md", Number(e.target.value)));
				}
				H(e, t);
			}, S = (e) => {
				var t = U_();
				let n;
				var r = N(t);
				K(r);
				var i = I(r, 2), a = (e) => {
					var t = Nr();
					Jr(P(t), 17, () => su(iy(), z(ry), (e) => e.label), (e) => e.label, (e, t) => {
						var n = Nr(), r = P(n), i = (e) => {
							var n = z_(), r = N(n), i = I(r);
							E(n), R((e) => {
								J(n, "title", e), U(r, `${z(t).label ?? ""} `);
							}, [() => Y("tip.webpAuto")]), B("change", i, sy), H(e, n);
						}, a = (e) => {
							var n = B_(), r = N(n), i = I(r);
							E(n), R((e) => {
								J(n, "title", e), U(r, `${z(t).label ?? ""} `);
							}, [() => Y("tip.blocks.galleryImages")]), B("change", i, dy), H(e, n);
						}, o = (e) => {
							var n = Hm(), r = F(n, !0);
							R(() => U(r, z(t).label)), B("click", n, () => ay(z(t))), H(e, n);
						};
						W(r, (e) => {
							z(t).act === "image" ? e(i) : z(t).act === "galleryImages" ? e(a, 1) : e(o, -1);
						}), H(e, n);
					}, (e) => {
						var t = pm(), n = F(t, !0);
						R((e) => U(n, e), [() => Y("canvas.searchEmpty")]), H(e, t);
					}), H(e, t);
				}, o = /* @__PURE__ */ k(() => z(ry).trim()), s = (e) => {
					var t = H_(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2), o = N(a), s = F(o, !0), c = I(o, 2), l = F(c, !0);
					E(a), E(n);
					var u = I(n, 2), d = F(u, !0), f = I(u, 2), p = N(f), m = I(p);
					E(f);
					var h = I(f, 2), g = F(h, !0), _ = I(h, 2), v = F(_, !0), y = I(_, 2), b = F(y, !0), x = I(y, 2), S = F(x, !0), ee = I(x, 2), te = F(ee, !0), ne = I(ee, 2), re = F(ne, !0), C = I(ne, 2), ie = F(C, !0), ae = I(C, 2), oe = F(ae, !0), se = I(ae, 2), ce = F(se, !0), le = I(se, 2), w = F(le, !0), ue = I(le, 2), de = F(ue, !0), fe = I(ue, 2), pe = F(fe, !0), T = I(fe, 2), me = F(T, !0), he = I(T, 2), ge = F(he, !0), _e = I(he, 2), ve = F(_e, !0), ye = I(_e, 2), be = F(ye, !0), xe = I(ye, 2), Se = F(xe, !0), Ce = I(xe, 2), we = N(Ce), Te = F(we, !0), Ee = I(we, 2), De = N(Ee), Oe = F(De, !0), ke = I(De, 2), Ae = N(ke), je = I(Ae);
					E(ke), E(Ee), E(Ce);
					var Me = I(Ce, 2), Ne = N(Me), Pe = F(Ne, !0), Fe = I(Ne, 2), Ie = N(Fe), Le = F(Ie, !0), Re = I(Ie, 2), ze = F(Re, !0), Be = I(Re, 2), Ve = F(Be, !0), He = I(Be, 2), Ue = F(He, !0), We = I(He, 2), Ge = F(We, !0);
					E(Fe), E(Me);
					var Ke = I(Me, 2), qe = N(Ke), Je = F(qe, !0), Ye = I(qe, 2), Xe = N(Ye), Ze = F(Xe, !0), Qe = I(Xe, 2), $e = F(Qe, !0), et = I(Qe, 2), tt = F(et, !0), D = I(et, 2), nt = F(D, !0), O = I(D, 2), it = F(O, !0);
					E(Ye), E(Ke);
					var at = I(Ke, 2), ot = (e) => {
						let t = /* @__PURE__ */ k(() => z(Vl).filter((e) => Rl[e]?.data?.mal?.kind === "blocks"));
						var n = V_(), r = N(n), i = F(r, !0), a = I(r, 2);
						Jr(a, 20, () => z(t), (e) => e, (e, t) => {
							var n = Hm(), r = F(n, !0);
							R((e) => {
								J(n, "title", e), U(r, Rl[t].data.mal.name);
							}, [() => Y("canvas.insertGroup")]), B("click", n, () => rt?.sendInsertTemplate(t)), H(e, n);
						}), E(a), E(n), R((e) => U(i, e), [() => Y("canvas.tabMyTemplates")]), H(e, n);
					}, st = /* @__PURE__ */ k(() => z(Vl).some((e) => Rl[e]?.data?.mal?.kind === "blocks"));
					W(at, (e) => {
						z(st) && e(ot);
					});
					var ct = I(at, 2), lt = (e) => {
						var t = V_(), n = N(t), r = F(n, !0), i = I(n, 2);
						Jr(i, 21, () => z(ey), (e) => e.type, (e, t) => {
							var n = Nr(), r = P(n), i = (e) => {
								var n = V_(), r = N(n), i = F(r, !0), a = I(r, 2);
								Jr(a, 21, () => z(t).variants, (e) => e.label, (e, n) => {
									var r = Hm(), i = F(r, !0);
									R((e) => {
										J(r, "title", e), U(i, z(n).label);
									}, [() => Y("tip.blocks.fromPlugin", { plugin: z(t).plugin })]), B("click", r, () => ny(z(t), z(n).props)), H(e, r);
								}), E(a), E(n), R(() => U(i, z(t).label)), H(e, n);
							}, a = (e) => {
								var n = Hm(), r = F(n, !0);
								R((e) => {
									J(n, "title", e), U(r, z(t).label);
								}, [() => Y("tip.blocks.fromPlugin", { plugin: z(t).plugin })]), B("click", n, () => ny(z(t))), H(e, n);
							};
							W(r, (e) => {
								z(t).variants?.length ? e(i) : e(a, -1);
							}), H(e, n);
						}), E(i), E(t), R((e) => U(r, e), [() => Y("panel.plugins")]), H(e, t);
					};
					W(ct, (e) => {
						z(ey).length && e(lt);
					}), R((e, t, n, r, a, o, u, m, Ce, we, Ee, E, je, Me, Ne, Fe, Ke, qe, Ye, Xe, Qe, et, D, rt, O, at, ot, st, ct, lt, ut, dt, ft, pt, mt, ht, gt, _t, vt, k, yt, bt, xt, St, Ct, wt, Tt, Et, Dt, Ot, kt, At, jt, Mt, Nt, Pt, Ft, It, Lt, Rt, zt, Bt, Vt) => {
						U(i, e), U(s, t), J(c, "title", n), U(l, r), U(d, a), J(f, "title", o), U(p, `${u ?? ""} `), J(h, "title", m), U(g, Ce), J(_, "title", we), U(v, Ee), J(y, "title", E), U(b, je), J(x, "title", Me), U(S, Ne), J(ee, "title", Fe), U(te, Ke), J(ne, "title", qe), U(re, Ye), J(C, "title", Xe), U(ie, Qe), J(ae, "title", et), U(oe, D), J(se, "title", rt), U(ce, O), J(le, "title", at), U(w, ot), J(ue, "title", st), U(de, ct), J(fe, "title", lt), U(pe, ut), J(T, "title", dt), U(me, ft), J(he, "title", pt), U(ge, mt), J(_e, "title", ht), U(ve, gt), J(ye, "title", _t), U(be, vt), J(xe, "title", k), U(Se, yt), U(Te, bt), J(De, "title", xt), U(Oe, St), J(ke, "title", Ct), U(Ae, `${wt ?? ""} `), U(Pe, Tt), J(Ie, "title", Et), U(Le, Dt), J(Re, "title", Ot), U(ze, kt), J(Be, "title", At), U(Ve, jt), J(He, "title", Mt), U(Ue, Nt), J(We, "title", Pt), U(Ge, Ft), U(Je, It), U(Ze, Lt), U($e, Rt), U(tt, zt), U(nt, Bt), U(it, Vt);
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
					]), B("click", o, () => $v("text")), B("click", c, () => $v("text-box")), B("click", u, () => $v("button")), B("change", m, sy), B("click", h, () => $v("video")), B("click", _, () => $v("icon")), B("click", y, () => $v("map")), B("click", x, () => $v("form")), B("click", ee, () => $v("collection")), B("click", ne, () => $v("faq")), B("click", C, () => $v("timeline")), B("click", ae, () => $v("quote")), B("click", se, () => $v("stats")), B("click", le, () => $v("ribbon")), B("click", ue, () => $v("table")), B("click", fe, () => $v("share")), B("click", T, () => $v("countdown")), B("click", he, () => $v("audio")), B("click", _e, () => $v("product")), B("click", ye, () => $v("cart")), B("click", xe, () => $v("checkout")), B("click", De, () => $v("gallery")), B("change", je, dy), B("click", Ie, () => $v("calendar")), B("click", Re, () => $v("calendar-cards")), B("click", Be, () => $v("calendar-month")), B("click", He, () => $v("calendar-next")), B("click", We, () => $v("calendar-agenda")), B("click", Xe, () => $v("shape-line")), B("click", Qe, () => $v("shape-arrow")), B("click", et, () => $v("shape-circle")), B("click", D, () => $v("shape-rect")), B("click", O, () => $v("shape-triangle")), H(e, t);
				};
				W(i, (e) => {
					z(o) ? e(a) : e(s, -1);
				}), E(t), R((e, i, a) => {
					n = gi(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: z(Me) === "mobile" }), J(t, "title", e), J(r, "placeholder", i), J(r, "title", a);
				}, [
					() => z(Me) === "mobile" ? Y("tip.blocks.mobileLocked") : void 0,
					() => Y("canvas.searchBlocks"),
					() => Y("canvas.searchBlocks")
				]), Di(r, () => z(ry), (e) => j(ry, e)), H(e, t);
			}, ne = (e) => {
				var t = W_(), n = N(t), r = N(n), i = F(I(r));
				E(n);
				var a = I(n, 2);
				K(a);
				var o = I(a, 2), s = N(o);
				K(s);
				var c = I(s);
				E(o), E(t), R((e, t) => {
					U(r, `${e ?? ""} `), U(i, `${z(ve).size ?? ""} px`), q(a, z(ve).size), Ci(s, z(ve).snap !== !1), U(c, ` ${t ?? ""}`);
				}, [() => Y("lbl.gridSize"), () => Y("lbl.gridSnap")]), B("input", a, (e) => Ra("size", Number(e.target.value))), B("change", s, (e) => Ra("snap", e.target.checked)), H(e, t);
			}, re = (e) => {
				var t = Z_(), n = N(t), r = (e) => {
					var t = dh(), n = P(t), r = F(n, !0), i = I(n, 2);
					l(i, () => !1), R((e) => U(r, e), [() => Y("blocks.suffix", { label: Fr[z(M).type] ?? z(M).type })]), H(e, t);
				}, i = (e) => {
					var t = X_(), n = P(t), r = F(n, !0), i = I(n, 2), o = N(i), s = I(o);
					K(s), E(i);
					var c = I(i, 4), l = N(c);
					K(l);
					var u = I(l);
					E(c);
					var d = I(c, 2), f = (e) => {
						var t = G_(), n = P(t), r = N(n), i = F(I(r));
						E(n);
						var a = I(n, 2);
						K(a), R((e) => {
							U(r, `${e ?? ""} `), U(i, `${z(zr).size ?? ""} px`), q(a, z(zr).size);
						}, [() => Y("lbl.gridSize")]), B("input", a, (e) => Ia("size", Number(e.target.value))), H(e, t);
					};
					W(d, (e) => {
						z(zr) && e(f);
					});
					var p = I(d, 4), m = F(p, !0), g = I(p, 2);
					Jr(g, 21, () => [["", "common.standard"], ...Object.entries(hu)], ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ k(() => h(z(t), 2));
						let r = () => z(n)[0], i = () => z(n)[1], a = /* @__PURE__ */ k(() => $r(r()));
						var o = K_();
						let s;
						var c = N(o), l = N(c), u = I(l, 2), d = I(u, 2);
						E(c);
						var f = F(I(c, 2), !0);
						E(o), R((e, t) => {
							s = gi(o, 1, "rs-card svelte-1n46o8q", null, s, { on: z(Gr) === r() }), J(o, "title", e), vi(c, `background: ${z(a).bg ?? ""}`), vi(l, `background: ${z(a).text ?? ""}`), vi(u, `background: ${z(a).surface ?? ""}`), vi(d, `background: ${z(a).accent ?? ""}`), U(f, t);
						}, [() => Y("tip.props.sectionTheme"), () => Y(i())]), B("click", o, () => Qr(r())), H(e, o);
					}), E(g);
					var _ = I(g, 2), v = N(_), y = I(v), b = N(y), x = F(b), S = I(b, 2);
					G(S, () => C.copy, !0), E(S), E(y), E(_);
					var ee = I(_, 4), te = F(ee, !0), ne = I(ee, 2);
					a(ne, () => z(ea), () => z(Vr));
					var re = I(ne, 4), ie = F(re, !0), ae = I(re, 2);
					Jr(ae, 16, () => [["top", "lbl.dividerTop"], ["bottom", "lbl.dividerBottom"]], ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ k(() => h(t, 2));
						let r = () => z(n)[0], i = () => z(n)[1], a = /* @__PURE__ */ k(() => z(Kr)[r()]);
						var o = Np(), s = P(o), c = N(s), l = I(c);
						{
							let e = /* @__PURE__ */ k(() => z(a)?.shape ?? ""), t = /* @__PURE__ */ k(() => [["", Y("common.none")], ...Ku.map((e) => [e, Y(`opt.divider.${e}`)])]);
							X(l, {
								get value() {
									return z(e);
								},
								get options() {
									return z(t);
								},
								onchange: (e) => Da(r(), "shape", e)
							});
						}
						E(s);
						var u = I(s, 2), d = (e) => {
							var t = q_(), n = P(t), i = N(n), o = F(i, !0), s = I(i, 2);
							K(s);
							var c = F(I(s, 2));
							E(n);
							var l = I(n, 2), u = N(l), d = I(u);
							{
								let e = /* @__PURE__ */ k(() => z(a).color ?? "bg"), t = /* @__PURE__ */ k(la), n = /* @__PURE__ */ k(() => Y("tip.divider.color"));
								wa(d, {
									get value() {
										return z(e);
									},
									get tokens() {
										return z(t);
									},
									get label() {
										return z(n);
									},
									onchange: (e) => Da(r(), "color", e)
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
								U(o, e), J(s, "min", qu.min), J(s, "max", qu.max), q(s, z(a).height ?? qu.dflt), U(c, `${z(a).height ?? qu.dflt ?? ""} px`), J(l, "title", t), U(u, `${n ?? ""} `), J(f, "title", r), Ci(p, z(a).flip === !0), U(m, ` ${i ?? ""}`), J(h, "title", d), Ci(g, z(a).invert === !0), U(_, ` ${v ?? ""}`);
							}, [
								() => Y("lbl.height"),
								() => Y("tip.divider.color"),
								() => Y("lbl.color"),
								() => Y("tip.divider.flip"),
								() => Y("lbl.dividerFlip"),
								() => Y("tip.divider.invert"),
								() => Y("lbl.patternInvert")
							]), B("input", s, (e) => Da(r(), "height", e.target.valueAsNumber)), B("change", p, (e) => Da(r(), "flip", e.target.checked)), B("change", g, (e) => Da(r(), "invert", e.target.checked)), H(e, t);
						};
						W(u, (e) => {
							z(a)?.shape && e(d);
						}), R((e, t) => {
							J(s, "title", e), U(c, `${t ?? ""} `);
						}, [() => Y("tip.props.dividers"), () => Y(i())]), H(e, o);
					});
					var oe = I(ae, 4), se = N(oe), ce = I(se);
					{
						let e = /* @__PURE__ */ k(() => _a(z(Hr)) ? z(Hr).type : "");
						X(ce, {
							get value() {
								return z(e);
							},
							get options() {
								return va;
							},
							onchange: (e) => Ea(e || null)
						});
					}
					E(oe);
					var le = I(oe, 2), w = (e) => {
						var t = Y_(), n = P(t), r = N(n), i = I(r);
						K(i), E(n);
						var a = I(n, 2), o = N(a), s = I(o);
						K(s), E(a);
						var c = I(a, 2), l = (e) => {
							var t = J_(), n = P(t), r = N(n), i = I(r);
							{
								let e = /* @__PURE__ */ k(() => z(Hr).props.effect ?? "slide-up"), t = /* @__PURE__ */ k(() => [
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
									onchange: (e) => Ma("effect", e)
								});
							}
							E(n);
							var a = I(n, 2), o = N(a), s = I(o);
							K(s), E(a);
							var c = I(a, 2), l = N(c), u = I(l);
							{
								let e = /* @__PURE__ */ k(() => z(Hr).props.pattern ?? "sequence"), t = /* @__PURE__ */ k(() => [
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
									onchange: (e) => Ma("pattern", e)
								});
							}
							E(c), R((e, t, i, u, d, f) => {
								J(n, "title", e), U(r, `${t ?? ""} `), J(a, "title", i), U(o, `${u ?? ""} `), q(s, z(Hr).props.step ?? 90), J(c, "title", d), U(l, `${f ?? ""} `);
							}, [
								() => Y("tip.props.staggerEffect"),
								() => Y("lbl.staggerEffect"),
								() => Y("tip.props.staggerStep"),
								() => Y("lbl.stepMs"),
								() => Y("tip.props.staggerPattern"),
								() => Y("lbl.pattern")
							]), B("change", s, (e) => ja("step", Number(e.target.value))), H(e, t);
						};
						W(c, (e) => {
							z(Hr).type === "stagger" && e(l);
						}), R((e, t) => {
							U(r, `${e ?? ""} `), q(i, z(Hr).props.duration), U(o, `${t ?? ""} `), q(s, z(Hr).props.delay ?? 0);
						}, [() => Y("lbl.durationMs"), () => Y("lbl.delayMs")]), B("change", i, (e) => ja("duration", Number(e.target.value))), B("change", s, (e) => ja("delay", Number(e.target.value))), H(e, t);
					}, ue = /* @__PURE__ */ k(() => _a(z(Hr)));
					W(le, (e) => {
						z(ue) && e(w);
					});
					var de = I(le, 2), fe = N(de), pe = I(fe);
					{
						let e = /* @__PURE__ */ k(() => z(Ur)?.type ?? (z(Hr) && !_a(z(Hr)) ? z(Hr).type : ""));
						X(pe, {
							get value() {
								return z(e);
							},
							get options() {
								return ba;
							},
							onchange: (e) => Aa(e || null)
						});
					}
					E(de), R((e, t, n, a, c, d, f, h, g, y, b, ee, ne, C, ae, ce, le) => {
						U(r, e), J(i, "title", t), U(o, `${n ?? ""} `), q(s, z(Br)), J(s, "placeholder", a), Ci(l, z(zr) !== null), U(u, ` ${c ?? ""}`), J(p, "title", d), U(m, f), J(_, "title", h), U(v, `${g ?? ""} `), U(x, `#${z(Rr) ?? ""}`), J(S, "title", y), U(te, b), J(re, "title", ee), U(ie, ne), J(oe, "title", C), U(se, `${ae ?? ""} `), J(de, "title", ce), U(fe, `${le ?? ""} `);
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
					]), B("change", s, (e) => Na(e.target.value)), B("change", l, (e) => Fa(e.target.checked)), B("click", S, () => navigator.clipboard?.writeText(`#${z(Rr)}`)), H(e, t);
				}, o = (e) => {
					var t = pm(), n = F(t, !0);
					R((e) => U(n, e), [() => Y("hint.props.empty")]), H(e, t);
				};
				W(n, (e) => {
					z(M) ? e(r) : z(Rr) ? e(i, 1) : e(o, -1);
				}), E(t), H(e, t);
			}, ie = (e) => {
				var t = iv(), n = N(t), r = N(n);
				K(r);
				var i = I(r);
				E(n);
				var s = I(n, 2), c = (e) => {
					var t = V_(), n = N(t), r = F(n, !0), i = I(n, 2);
					Jr(i, 21, () => z(O).pages ?? [], (e) => e.id, (e, t) => {
						var n = Cm(), r = N(n);
						K(r);
						var i = I(r);
						E(n), R((e, a) => {
							J(n, "title", e), Ci(r, a), U(i, ` ${(z(t).title || z(t).id) ?? ""}`);
						}, [() => Y("tip.footer.hideOnPage"), () => !(z(O).footer?.hideOn ?? []).includes(z(t).id)]), B("change", r, (e) => zd(z(t).id, e.target.checked)), H(e, n);
					}), E(i), E(t), R((e) => U(r, e), [() => Y("group.showOnPages")]), H(e, t);
				};
				W(s, (e) => {
					z(O).footer?.show && e(c);
				});
				var l = I(s, 2), u = N(l), d = F(u, !0), f = I(u, 2), p = N(f);
				Jr(p, 21, () => bd, (e) => e.id, (e, t) => {
					var n = Q_(), r = N(n);
					G(r, () => Pf(z(t).thumb), !0), E(r);
					var i = F(I(r, 2), !0);
					E(n), R((e) => {
						J(n, "title", e), U(i, z(t).label);
					}, [() => Y("tip.footer.template", { label: z(t).label })]), B("click", n, () => Sd(z(t).id)), H(e, n);
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
						onchange: (e) => hd(e)
					});
				}
				E(te);
				var ie = I(te, 2), ae = (e) => {
					var t = ev(), n = P(t), r = N(n), i = N(r), a = I(i);
					E(r);
					var o = I(r, 2), s = (e) => {
						var t = Ip();
						G(t, () => C.cross, !0), E(t), R((e) => J(t, "title", e), [() => Y("tip.footer.removeLogo")]), B("click", t, _d), H(e, t);
					};
					W(o, (e) => {
						z(O).footer?.brand?.logo && e(s);
					}), E(n);
					var c = I(n, 2), l = (e) => {
						var t = $_(), n = P(t), r = N(n), i = F(I(r));
						E(n);
						var a = I(n, 2);
						K(a), R((e) => {
							U(r, `${e ?? ""} `), U(i, `${z(O).footer?.brand?.logoHeight ?? 40 ?? ""} px`), q(a, z(O).footer?.brand?.logoHeight ?? 40);
						}, [() => Y("lbl.logoHeight")]), B("input", a, (e) => vd(e.target.value)), H(e, t);
					};
					W(c, (e) => {
						z(O).footer?.brand?.logo && e(l);
					}), R((e, t) => {
						J(r, "title", e), U(i, `${t ?? ""} `);
					}, [() => Y("tip.webpAutoPublish"), () => z(O).footer?.brand?.logo ? Y("ui.changeLogo") : Y("ui.uploadLogo")]), B("change", a, gd), H(e, t);
				};
				W(ie, (e) => {
					(z(O).footer?.brand?.mode ?? "text") !== "text" && e(ae);
				}), E(_), E(m);
				var oe = I(m, 2), se = N(oe), ce = F(se, !0), le = I(se, 2), w = N(le);
				Jr(w, 17, () => z(O).footer?.columns ?? [], Wr, (e, t, n) => {
					var r = tv(), i = P(r), a = N(i);
					K(a);
					var o = I(a, 2), s = N(o);
					G(s, () => C.plus, !0), E(s);
					var c = I(s, 2);
					c.disabled = n === 0, G(c, () => C.up, !0), E(c);
					var l = I(c, 2);
					G(l, () => C.down, !0), E(l);
					var u = I(l, 2);
					G(u, () => C.cross, !0), E(u), E(o), E(i), Jr(I(i, 2), 17, () => z(t).links ?? [], Wr, (e, r, i) => {
						var a = lm(), o = N(a);
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
								onchange: (e) => Yd(n, i, e)
							});
						}
						E(d);
						var p = I(d, 2), m = (e) => {
							var t = cm();
							K(t), R((e, n) => {
								q(t, z(r).href ?? ""), J(t, "placeholder", e), J(t, "title", n);
							}, [() => Y("ph.hrefAnchor"), () => Y("tip.hrefAnchor")]), B("change", t, (e) => Xd(n, i, e.target.value)), H(e, t);
						};
						W(p, (e) => {
							z(r).page || e(m);
						}), E(a), R((e, n) => {
							q(o, z(r).label), J(o, "title", e), l.disabled = i === z(t).links.length - 1, J(u, "title", n);
						}, [() => Y("tip.linkLabel"), () => Y("tip.removeLink")]), B("input", o, (e) => Jd(n, i, e.target.value)), B("click", c, () => qd(n, i, -1)), B("click", l, () => qd(n, i, 1)), B("click", u, () => Kd(n, i)), H(e, a);
					}), R((e, r, i) => {
						q(a, z(t).title), J(a, "title", e), J(s, "title", r), l.disabled = n === z(O).footer.columns.length - 1, J(u, "title", i);
					}, [
						() => Y("tip.footer.columnTitle"),
						() => Y("tip.footer.addLink"),
						() => Y("tip.footer.removeColumn")
					]), B("input", a, (e) => Ud(n, e.target.value)), B("click", s, () => Gd(n)), B("click", c, () => Hd(n, -1)), B("click", l, () => Hd(n, 1)), B("click", u, () => Vd(n)), H(e, r);
				});
				var ue = I(w, 2), de = F(ue, !0), fe = I(ue, 2), pe = N(fe), T = I(pe);
				{
					let e = /* @__PURE__ */ k(() => z(O).footer?.columnsAlign ?? "left"), t = /* @__PURE__ */ k(() => [["left", Y("common.left")], ["center", Y("common.center")]]);
					X(T, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => Fd(e)
					});
				}
				E(fe), E(le), E(oe);
				var me = I(oe, 2), he = N(me), ge = F(he, !0), _e = I(he, 2), ve = N(_e);
				Jr(ve, 17, () => z(O).footer?.social ?? [], Wr, (e, t, n) => {
					var r = nv(), i = N(r), a = N(i);
					G(a, () => oo(z(t).icon) || "", !0), E(a);
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
								return nf;
							},
							onchange: (e) => ef(n, e)
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
					}, [() => Y("tip.removeLink"), () => Y("ph.hrefMailto")]), B("click", c, () => $d(n, -1)), B("click", l, () => $d(n, 1)), B("click", u, () => Qd(n)), B("change", d, (e) => tf(n, e.target.value)), H(e, r);
				});
				var ye = I(ve, 2), be = F(ye, !0);
				E(_e), E(me);
				var xe = I(me, 2), Se = N(xe), Ce = F(Se, !0), we = I(Se, 2), Te = N(we), Ee = N(Te);
				K(Ee);
				var De = I(Ee);
				E(Te);
				var ke = I(Te, 2), Ae = (e) => {
					let t = /* @__PURE__ */ k(() => z(O).footer.cta);
					var n = rv(), r = P(n), i = N(r), a = I(i);
					{
						let e = /* @__PURE__ */ k(() => z(t).kind ?? "button"), n = /* @__PURE__ */ k(() => [["button", Y("opt.cta.button")], ["newsletter", Y("opt.cta.newsletter")]]);
						X(a, {
							get value() {
								return z(e);
							},
							get options() {
								return z(n);
							},
							onchange: (e) => Ld("kind", e)
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
						var n = Np(), r = P(n), i = N(r), a = I(i);
						{
							let e = /* @__PURE__ */ k(() => z(t).page ?? "__href"), n = /* @__PURE__ */ k(() => [...z(O).pages.map((e) => [e.id, e.title]), ["__href", Y("opt.linkHrefMailto")]]);
							X(a, {
								get value() {
									return z(e);
								},
								get options() {
									return z(n);
								},
								onchange: (e) => Rd(e)
							});
						}
						E(r);
						var o = I(r, 2), s = (e) => {
							var n = gm();
							K(n), R((e, r) => {
								q(n, z(t).href ?? ""), J(n, "placeholder", e), J(n, "title", r);
							}, [() => Y("ph.hrefMailtoAnchor"), () => Y("tip.hrefAnchor")]), B("change", n, (e) => Ld("href", e.target.value)), H(e, n);
						};
						W(o, (e) => {
							z(t).page || e(s);
						}), R((e, t) => {
							J(r, "title", e), U(i, `${t ?? ""} `);
						}, [() => Y("tip.footer.ctaTarget"), () => Y("lbl.buttonTarget")]), H(e, n);
					}, b = (e) => {
						var n = Fm(), r = P(n), i = N(r), a = I(i);
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
						]), B("change", a, (e) => Ld("endpoint", e.target.value)), B("change", c, (e) => Ld("recipient", e.target.value)), B("input", d, (e) => Ld("success", e.target.value)), H(e, n);
					};
					W(v, (e) => {
						(z(t).kind ?? "button") === "button" ? e(y) : e(b, -1);
					}), R((e, n, a, v, y, b, x, S, ee, te, ne, re) => {
						J(r, "title", e), U(i, `${n ?? ""} `), J(o, "title", a), Ci(s, z(t).big === !0), U(c, ` ${v ?? ""}`), J(l, "title", y), U(u, `${b ?? ""} `), q(d, z(t).heading ?? ""), J(d, "placeholder", x), J(f, "title", S), U(p, `${ee ?? ""} `), q(m, z(t).sub ?? ""), J(h, "title", te), U(g, `${ne ?? ""} `), q(_, z(t).label ?? ""), J(_, "placeholder", re);
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
					]), B("change", s, (e) => Ld("big", e.target.checked)), B("input", d, (e) => Ld("heading", e.target.value)), B("input", m, (e) => Ld("sub", e.target.value)), B("input", _, (e) => Ld("label", e.target.value)), H(e, n);
				};
				W(ke, (e) => {
					z(O).footer?.cta && e(Ae);
				}), E(we), E(xe);
				var je = I(xe, 2), Me = N(je), Ne = F(Me, !0), Pe = I(Me, 2), Fe = N(Pe);
				o(Fe, () => "linkRow", () => z(O).footer?.linkRow ?? []);
				var Ie = I(Fe, 2), Le = F(Ie, !0);
				E(Pe), E(je);
				var Re = I(je, 2), ze = N(Re), Be = F(ze, !0), Ve = I(ze, 2), He = N(Ve), Ue = (e) => {
					var t = kh(), n = P(t), r = N(n), i = I(r);
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
							onchange: (e) => pd("footer", (t) => {
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
				a(Ke, () => ra, () => z(O).footer?.background?.layers ?? []), E(Ve), E(Re);
				var qe = I(Re, 2), Je = N(qe), Ye = F(Je, !0), Xe = I(Je, 2), Ze = N(Xe), Qe = N(Ze), $e = I(Qe);
				K($e), E(Ze);
				var et = I(Ze, 2), tt = F(et, !0), D = I(et, 2);
				o(D, () => "baseline", () => z(O).footer?.baseline ?? []);
				var nt = I(D, 2), rt = F(nt, !0);
				E(Xe), E(qe), E(t), R((e, t, a, o, s, c, l, u, f, p, m, h, _, re, C, ie, ae, oe, se, le, w, ue, T, me, he, _e, ve, ye, xe, Se, we, E) => {
					J(n, "title", e), Ci(r, t), U(i, ` ${a ?? ""}`), U(d, o), U(g, s), J(v, "title", c), U(y, `${l ?? ""} `), q(b, z(O).footer?.brand?.title ?? ""), J(b, "placeholder", u), J(x, "title", f), U(S, `${p ?? ""} `), q(ee, z(O).footer?.brand?.tagline ?? ""), J(te, "title", m), U(ne, `${h ?? ""} `), U(ce, _), U(de, re), J(fe, "title", C), U(pe, `${ie ?? ""} `), U(ge, ae), U(be, oe), U(Ce, se), J(Te, "title", le), Ci(Ee, w), U(De, ` ${ue ?? ""}`), U(Ne, T), U(Le, me), U(Be, he), U(Ge, _e), U(Ye, ve), J(Ze, "title", ye), U(Qe, `${xe ?? ""} `), q($e, z(O).footer?.copyright ?? ""), J($e, "placeholder", Se), U(tt, we), U(rt, E);
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
				]), B("change", r, (e) => pd("footer", (t) => {
					t.show = e.target.checked;
				})), B("input", b, (e) => md("title", e.target.value)), B("input", ee, (e) => md("tagline", e.target.value)), B("click", ue, Bd), B("click", ye, Zd), B("change", Ee, (e) => Id(e.target.checked)), B("click", Ie, () => Cd("linkRow")), B("input", $e, (e) => yd(e.target.value)), B("click", nt, () => Cd("baseline")), H(e, t);
			}, ae = (e) => {
				var t = fv(), n = N(t), r = (e) => {
					var t = Qp(), n = N(t), r = I(n);
					{
						let e = /* @__PURE__ */ k(() => z(Nl) ?? ""), t = /* @__PURE__ */ k(() => [["", Y("common.choose")], ...z(jl).map((e) => [e, z(Ml)[e]?.name ?? e])]);
						X(r, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => j(Nl, e || null, !0)
						});
					}
					E(t), R((e) => U(n, `${e ?? ""} `), [() => Y("blocks.collection")]), H(e, t);
				};
				W(n, (e) => {
					z(jl).length && e(r);
				});
				var i = I(n, 2), a = (e) => {
					let t = /* @__PURE__ */ k(() => z(Ml)[z(Nl)]);
					var n = dv(), r = P(n), i = N(r), a = F(i, !0), o = I(i, 2), s = F(o, !0), c = I(o, 2), l = N(c), u = I(l);
					E(c);
					var d = I(c, 2);
					G(d, () => C.cross, !0), E(d), E(r);
					var f = I(r, 2);
					Jr(f, 19, () => z(t).entries, (e) => e.id, (e, n, r) => {
						var i = uv(), a = N(i), o = F(a), s = I(a, 2), c = N(s), l = N(c);
						K(l);
						var u = I(l, 2), d = N(u);
						G(d, () => C.up, !0), E(d);
						var f = I(d, 2);
						G(f, () => C.down, !0), E(f);
						var p = I(f, 2);
						G(p, () => C.cross, !0), E(p), E(u), E(c);
						var m = I(c, 2), h = (e) => {
							var t = av(), r = N(t), i = I(r);
							K(i), E(t), R((e) => {
								U(r, `${e ?? ""} `), q(i, z(n).date ?? "");
							}, [() => Y("lbl.date")]), B("change", i, (e) => bu(z(Nl), z(n).id, "date", e.target.value)), H(e, t);
						};
						W(m, (e) => {
							z(t).kind !== "products" && e(h);
						});
						var g = I(m, 2);
						st(g);
						var _ = I(g, 2), v = (e) => {
							var t = mm(), r = N(t), i = I(r);
							K(i), E(t), R((e, t) => {
								U(r, `${e ?? ""} `), q(i, z(n).href ?? ""), J(i, "placeholder", t);
							}, [() => Y("lbl.link"), () => Y("ph.collections.href")]), B("change", i, (e) => bu(z(Nl), z(n).id, "href", e.target.value)), H(e, t);
						};
						W(_, (e) => {
							z(t).kind !== "products" && e(v);
						});
						var y = I(_, 2), b = N(y), x = N(b), S = I(x);
						E(b);
						var ee = I(b, 2), te = (e) => {
							var t = ov(), r = P(t), i = I(r, 2);
							G(i, () => C.cross, !0), E(i), R((e) => {
								J(r, "src", z(n).image), J(i, "title", e);
							}, [() => Y("tip.removeImage")]), B("click", i, () => bu(z(Nl), z(n).id, "image", "")), H(e, t);
						};
						W(ee, (e) => {
							z(n).image && e(te);
						}), E(y);
						var ne = I(y, 2), re = (e) => {
							var t = lv(), r = P(t), i = N(r), a = I(i);
							K(a), E(r);
							var o = I(r, 2), s = N(o), c = I(s);
							K(c), E(o);
							var l = I(o, 2), u = N(l), d = I(u);
							K(d), E(l);
							var f = I(l, 2), p = N(f), m = I(p);
							K(m), E(f);
							var h = I(f, 2);
							Jr(h, 17, () => z(n).colors ?? [], Wr, (e, t, r) => {
								var i = cv(), a = N(i);
								K(a);
								var o = I(a, 2), s = N(o), c = I(s);
								E(o);
								var l = I(o, 2), u = (e) => {
									var n = sv();
									R(() => J(n, "src", z(t).image)), H(e, n);
								};
								W(l, (e) => {
									z(t).image && e(u);
								});
								var d = I(l, 2);
								G(d, () => C.cross, !0), E(d), E(i), R((e, n) => {
									q(a, z(t).name), J(a, "placeholder", e), U(s, `${n ?? ""} `);
								}, [() => Y("ph.colorName"), () => z(t).image ? Y("ui.changeImage") : Y("ui.addImage")]), B("change", a, (e) => Eu(z(Nl), z(n).id, r, "name", e.target.value)), B("change", c, (e) => Du(z(Nl), z(n).id, r, e)), B("click", d, () => Ou(z(Nl), z(n).id, r)), H(e, i);
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
							]), B("change", a, (e) => bu(z(Nl), z(n).id, "price", e.target.value === "" ? "" : Number(e.target.value))), B("change", c, (e) => bu(z(Nl), z(n).id, "memberPrice", e.target.value === "" ? "" : Number(e.target.value))), B("change", d, (e) => bu(z(Nl), z(n).id, "badge", e.target.value)), B("change", m, (e) => wu(z(Nl), z(n).id, e.target.value)), B("click", g, () => Tu(z(Nl), z(n).id)), H(e, t);
						};
						W(ne, (e) => {
							z(t).kind === "products" && e(re);
						}), E(s), E(i), R((e, i, a, s, c) => {
							U(o, `${e ?? ""}${z(t).kind === "products" ? z(n).price == null ? "" : ` · ${z(n).price}` : z(n).date ? ` · ${z(n).date}` : ""}`), q(l, z(n).title), J(l, "title", i), d.disabled = z(r) === 0, f.disabled = z(r) === z(t).entries.length - 1, J(p, "title", a), J(g, "placeholder", s), q(g, z(n).text ?? ""), U(x, `${c ?? ""} `);
						}, [
							() => eu(z(n).title),
							() => Y("lbl.title"),
							() => Y("tip.collections.deleteEntry"),
							() => Y("ph.collections.text"),
							() => z(n).image ? Y("ui.changeImage") : Y("ui.addImage")
						]), B("change", l, (e) => bu(z(Nl), z(n).id, "title", e.target.value || Y("ui.untitled"))), B("click", d, () => xu(z(Nl), z(r), -1)), B("click", f, () => xu(z(Nl), z(r), 1)), B("click", p, () => Su(z(Nl), z(n).id)), B("change", g, (e) => bu(z(Nl), z(n).id, "text", e.target.value)), B("change", S, (e) => Cu(z(Nl), z(n).id, e)), H(e, i);
					});
					var p = I(f, 2), m = (e) => {
						var t = pm(), n = F(t, !0);
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
					]), B("click", i, () => mu(z(Nl))), B("click", o, () => ku(z(Nl))), B("change", u, (e) => Au(z(Nl), e)), B("click", d, () => pu(z(Nl))), H(e, n);
				};
				W(i, (e) => {
					z(Nl) && z(Ml)[z(Nl)] && e(a);
				});
				var o = I(i, 2), s = N(o), c = I(s);
				K(c), E(o);
				var l = I(o, 2), u = N(l);
				X(I(u), {
					get value() {
						return z(Fl);
					},
					get options() {
						return Il;
					},
					onchange: (e) => j(Fl, e, !0)
				}), E(l);
				var d = I(l, 2), f = F(d, !0);
				E(t), R((e, t, n, r, i) => {
					U(s, `${e ?? ""} `), J(c, "placeholder", t), U(u, `${n ?? ""} `), d.disabled = r, U(f, i);
				}, [
					() => Y("lbl.newCollectionName"),
					() => Y("ph.collections.name"),
					() => Y("common.type"),
					() => !z(Pl).trim(),
					() => Y("ui.createCollection")
				]), B("keydown", c, (e) => e.key === "Enter" && ou()), Di(c, () => z(Pl), (e) => j(Pl, e)), B("click", d, ou), H(e, t);
			}, oe = (e) => {
				var t = yv(), n = N(t), r = (e) => {
					var t = pm(), n = F(t, !0);
					R((e) => U(n, e), [() => Y("hint.plugins.empty")]), H(e, t);
				}, i = /* @__PURE__ */ k(() => !Zu().length);
				W(n, (e) => {
					z(i) && e(r);
				});
				var a = I(n, 2);
				Jr(a, 16, Zu, (e) => e, (e, t) => {
					let n = /* @__PURE__ */ k(() => Vu[t]), r = /* @__PURE__ */ k(() => (z(Bu)?.enabled ?? []).includes(t));
					var i = hv();
					let a;
					var o = N(i), s = N(o), c = F(s, !0), l = I(s, 2), u = (e) => {
						var t = pv(), r = F(t);
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
						var t = mv(), r = F(t, !0);
						R((e) => U(r, e), [() => z(n).errors.join("; ")]), H(e, t);
					}, v = (e) => {
						var t = mv(), r = F(t, !0);
						R((e) => U(r, e), [() => Y("plugin.engineMismatch", {
							required: z(n).requiresEngine,
							current: z(Hu)
						})]), H(e, t);
					}, y = (e) => {
						var t = mv(), r = F(t, !0);
						R((e) => U(r, e), [() => Y("plugin.cspNeeded", { list: rd(z(n).csp).join(", ") })]), H(e, t);
					}, b = /* @__PURE__ */ k(() => z(n)?.csp && rd(z(n).csp).length);
					W(g, (e) => {
						z(n)?.errors?.length ? e(_) : z(n) && !z(n).satisfied ? e(v, 1) : z(b) && e(y, 2);
					});
					var x = I(g, 2), S = (e) => {
						var t = pm(), r = F(t, !0);
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
					]), B("change", p, (e) => cd(t, e.target.checked)), B("click", h, () => ud(t)), H(e, i);
				});
				var o = I(a, 2), s = (e) => {
					var t = _v(), n = I(P(t), 2), r = F(n, !0);
					Jr(I(n, 2), 16, () => z(Ju), (e) => e, (e, t) => {
						var n = gv(), r = N(n), i = N(r), a = F(i, !0), o = I(i, 2), s = (e) => {
							var n = pv(), r = F(n);
							R(() => U(r, `v${Vu[t].version ?? ""}`)), H(e, n);
						};
						W(o, (e) => {
							Vu[t]?.version && e(s);
						});
						var c = I(o, 2), l = N(c);
						G(l, () => C.right, !0), E(l), E(c), E(r), E(n), R((e, t) => {
							U(a, e), J(l, "title", t);
						}, [() => Vu[t]?.names?.[Yi()] ?? Vu[t]?.name ?? t, () => Y("tip.plugins.addFound")]), B("click", l, () => fd(t)), H(e, n);
					}), R((e) => U(r, e), [() => Y("hint.plugins.found")]), H(e, t);
				};
				W(o, (e) => {
					z(Ju).length && e(s);
				});
				var c = I(o, 2), l = (e) => {
					var t = Nr(), n = P(t), r = (e) => {
						var t = pm(), n = F(t, !0);
						R((e) => U(n, e), [() => Y("hint.plugins.autoDiscover")]), H(e, t);
					};
					W(n, (e) => {
						z(Ju).length || e(r);
					}), H(e, t);
				}, u = (e) => {
					var t = vv(), n = I(P(t), 2);
					K(n);
					var r = I(n, 2), i = F(r, !0), a = I(r, 2), o = (e) => {
						var t = mv(), n = F(t, !0);
						R(() => U(n, z(Wu))), H(e, t);
					};
					W(a, (e) => {
						z(Wu) && e(o);
					}), R((e, t, a) => {
						J(n, "placeholder", e), r.disabled = t, U(i, a);
					}, [
						() => Y("ph.plugins.folder"),
						() => !z(Uu).trim(),
						() => Y("ui.addPlugin")
					]), B("keydown", n, (e) => e.key === "Enter" && dd()), Di(n, () => z(Uu), (e) => j(Uu, e)), B("click", r, dd), H(e, t);
				};
				W(c, (e) => {
					z(Xu) === "ok" ? e(l) : e(u, -1);
				}), E(t), H(e, t);
			}, se = (e) => {
				var t = Z_(), n = N(t), r = (e) => {
					var t = pm(), n = F(t, !0);
					R((e) => U(n, e), [() => Y("hint.history.loading")]), H(e, t);
				}, i = (e) => {
					var t = Sm(), n = P(t), r = (e) => {
						var t = pm(), n = F(t, !0);
						R(() => U(n, z(Xa))), H(e, t);
					};
					W(n, (e) => {
						z(Xa) && e(r);
					});
					var i = I(n, 2), a = (e) => {
						var t = xv(), n = P(t), r = F(n, !0);
						Jr(I(n, 2), 19, () => z(Ya), (e) => e.sha, (e, t, n) => {
							var r = bv();
							let i;
							var a = N(r), o = F(a, !0), s = F(I(a, 2));
							E(r), R((e) => {
								i = gi(r, 1, "history-row svelte-1n46o8q", null, i, { head: z(n) === 0 }), J(a, "title", z(t).sha), U(o, z(t).message), U(s, `${z(t).author ?? ""}${e ?? ""}`);
							}, [() => z(t).date ? ` · ${$a.format(new Date(z(t).date))}` : ""]), H(e, r);
						}), R((e, t) => {
							n.disabled = z(Za) || !z(_e)?.allowed, J(n, "title", e), U(r, t);
						}, [() => z(_e)?.allowed ? Y("tip.history.revert") : Y("tip.history.needsAccess"), () => Y("ui.revertLast")]), B("click", n, to), H(e, t);
					};
					W(i, (e) => {
						z(Ya).length > 0 && e(a);
					}), H(e, t);
				};
				W(n, (e) => {
					z(Ya) === null ? e(r) : e(i, -1);
				}), E(t), H(e, t);
			}, le = (e) => {
				var t = Z_(), n = N(t), r = (e) => {
					var t = pm(), n = F(t, !0);
					R((e) => U(n, e), [() => Y("update.checking")]), H(e, t);
				}, i = (e) => {
					var t = Sv(), n = P(t), r = F(n, !0), i = I(n, 2), a = F(i, !0);
					R((e) => {
						U(r, z(lo)), U(a, e);
					}, [() => Y("update.retry")]), B("click", i, po), H(e, t);
				}, a = (e) => {
					var t = Nv(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2), o = (e) => {
						var t = Cv(), n = P(t);
						G(n, () => C.right, !0), E(n);
						var r = F(I(n, 2), !0);
						R(() => U(r, z(co).target)), H(e, t);
					};
					W(a, (e) => {
						z(co).upToDate || e(o);
					}), E(n);
					var s = I(n, 2), c = (e) => {
						var t = pm(), n = F(t, !0);
						R((e) => U(n, e), [() => Y("update.upToDate")]), H(e, t);
					}, l = (e) => {
						var t = Mv(), n = P(t), r = F(n, !0), i = I(n, 2), a = (e) => {
							var t = wv(), n = N(t), r = F(n, !0), i = I(n, 2), a = F(N(i), !0);
							E(i), E(t), R((e) => {
								U(r, e), U(a, z(co).notes);
							}, [() => Y("update.aboutVersion", { target: z(co).target })]), H(e, t);
						};
						W(i, (e) => {
							z(co).notes && e(a);
						});
						var o = I(i, 2), s = (e) => {
							var t = Tv(), n = N(t), r = N(n);
							G(r, () => C.warn, !0), E(r);
							var i = I(r);
							E(n);
							var a = I(n, 2), o = F(N(a), !0);
							E(a), E(t), R((e, t) => {
								J(n, "title", e), U(i, ` ${t ?? ""}`), U(o, z(co).headers.upstream);
							}, [() => Y("update.headersManual"), () => Y("update.headersTitle")]), H(e, t);
						};
						W(o, (e) => {
							z(co).headers?.upstream && e(s);
						});
						var c = I(o, 2);
						Jr(c, 17, () => z(co).changes.filter((e) => e.atom && e.conflict), (e) => e.path, (e, t) => {
							var n = Dv(), r = N(n), i = F(r, !0), a = I(r, 2), o = N(a), s = (e) => {
								var t = Ev(), n = F(t, !0);
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
						Jr(f, 21, () => z(co).changes.filter((e) => e.atom && !e.conflict), (e) => e.path, (e, t) => {
							var n = Ov(), r = N(n), i = F(r, !0), a = I(r, 2), o = (e) => {
								var t = Ev(), n = F(t, !0);
								R((e) => U(n, e), [() => Y("update.actionDelete")]), H(e, t);
							};
							W(a, (e) => {
								z(t).action === "delete" && e(o);
							}), E(n), R(() => {
								J(r, "title", z(t).path), U(i, z(t).path);
							}), H(e, n);
						}), E(f), E(l);
						var p = I(l, 2), m = (e) => {
							var t = jv(), n = P(t), r = N(n), i = F(r, !0), a = F(I(r, 2), !0);
							E(n), Jr(I(n, 2), 17, () => z(co).changes.filter((e) => !e.atom), (e) => e.path, (e, t) => {
								var n = Av(), r = N(n);
								let i;
								var a = F(r, !0), o = I(r, 2), s = N(o), c = (e) => {
									var t = Ev(), n = F(t, !0);
									R((e) => U(n, e), [() => Y("update.actionDelete")]), H(e, t);
								};
								W(s, (e) => {
									z(t).action === "delete" && e(c);
								});
								var l = I(s, 2), u = (e) => {
									var n = kv();
									G(n, () => C.warn, !0), E(n), R((e) => J(n, "title", e), [() => Y(`update.conflict.${z(t).conflict}`)]), H(e, n);
								};
								W(l, (e) => {
									z(t).conflict && e(u);
								});
								var d = I(l, 2);
								K(d), E(o), E(n), R((e, n, o, s) => {
									i = gi(r, 1, "update-path svelte-1n46o8q", null, i, { skipped: e }), J(r, "title", z(t).path), U(a, z(t).path), Ci(d, n), J(d, "title", o), J(d, "aria-label", s);
								}, [
									() => z(fo).has(z(t).path),
									() => z(fo).has(z(t).path),
									() => Y("update.keepMine.title"),
									() => Y("update.keepMine")
								]), B("change", d, () => mo(z(t).path)), H(e, n);
							}), R((e, t) => {
								U(i, e), U(a, t);
							}, [() => Y("update.optionalTitle"), () => Y("update.keepMine")]), H(e, t);
						}, h = /* @__PURE__ */ k(() => z(co).changes.some((e) => !e.atom));
						W(p, (e) => {
							z(h) && e(m);
						});
						var g = I(p, 2), _ = F(g, !0);
						R((e, t, n, i, a, o) => {
							U(r, e), J(u, "title", t), U(d, `${n ?? ""} · ${i ?? ""}`), g.disabled = z(uo) || !z(_e)?.allowed, J(g, "title", a), U(_, o);
						}, [
							() => Y("update.summary", {
								writes: z(co).changes.filter((e) => e.action === "write").length,
								deletes: z(co).changes.filter((e) => e.action === "delete").length
							}),
							() => Y("update.atomGroup.title"),
							() => Y("update.atomTitle"),
							() => z(co).changes.filter((e) => e.atom).length,
							() => z(_e)?.allowed ? Y("update.run.title") : Y("tip.history.needsAccess"),
							() => Y("update.run", { target: z(co).target })
						]), B("click", g, ho), H(e, t);
					};
					W(s, (e) => {
						z(co).upToDate ? e(c) : e(l, -1);
					}), R((e) => U(i, e), [() => Y("update.current", { version: z(co).current })]), H(e, t);
				};
				W(n, (e) => {
					z(uo) && !z(co) ? e(r) : z(lo) ? e(i, 1) : z(co) && e(a, 2);
				}), E(t), H(e, t);
			};
			W(m, (e) => {
				z(Bt) === "pages" ? e(v) : z(Bt) === "nav" ? e(y, 1) : z(Bt) === "site" ? e(b, 2) : z(Bt) === "theme" ? e(x, 3) : z(Bt) === "blocks" ? e(S, 4) : z(Bt) === "grid" ? e(ne, 5) : z(Bt) === "properties" ? e(re, 6) : z(Bt) === "footer" ? e(ie, 7) : z(Bt) === "collections" ? e(ae, 8) : z(Bt) === "plugins" ? e(oe, 9) : z(Bt) === "history" ? e(se, 10) : z(Bt) === "update" && e(le, 11);
			}), E(t), ji(t, (e) => j(Ff, e), () => z(Ff)), R((e) => {
				n = gi(t, 1, "panel svelte-1n46o8q", null, n, { hidden: !z(ye) }), J(i, "title", e), U(s, Ut[z(Bt)]);
			}, [() => Wt[z(Bt)]?.map((e) => Y(e)).join("\n")]), H(e, t);
		};
		W(y, (e) => {
			z(Bt) && e(b);
		});
		var x = I(y, 2);
		let S;
		var ne = N(x), re = N(ne);
		ji(re, (e) => j(ge, e), () => z(ge)), E(ne), E(x), ji(x, (e) => j(Ne, e), () => z(Ne)), E(t), R((e, t) => {
			r = gi(n, 1, "rail svelte-1n46o8q", null, r, { hidden: !z(ye) }), u = gi(c, 1, "rail-gear svelte-1n46o8q", null, u, { active: z(wo) }), J(c, "title", e), S = gi(x, 1, "frame-wrap svelte-1n46o8q", null, S, {
				mobile: z(Me) === "mobile",
				pan: z(qe),
				fold: z(Be) > 0
			}), vi(ne, `width:${z(We) ?? ""}px; height:${z(Ge) ?? ""}px`), J(re, "title", t), J(re, "src", `/?page=${z(w)}&preview=1`), vi(re, `width:${z(ze) ?? ""}px; height:${z(Ue) ?? ""}px; transform:scale(${z(Ve) ?? ""}); transform-origin:top left`);
		}, [() => Y("settings.title"), () => Y("ui.previewTitle")]), B("click", c, () => j(wo, !z(wo))), Cr("load", re, xo), xr(re), H(e, t);
	}, qy = (e) => {
		var t = Iv(), n = F(t, !0);
		R((e) => U(n, e), [() => Y("ui.loading")]), H(e, t);
	};
	W(Gy, (e) => {
		z(le) ? e(Ky) : e(qy, -1);
	});
	var Jy = I(Gy, 2), Yy = (e) => {
		Ms(e, {
			get image() {
				return z(qs);
			},
			onapply: Qs,
			oncancel: () => j(qs, null)
		});
	};
	W(Jy, (e) => {
		z(qs) && e(Yy);
	});
	var Xy = I(Jy, 2), Zy = (e) => {
		var t = Rv(), n = N(t), r = N(n), i = F(r, !0), a = I(r, 2);
		Jr(a, 16, () => z(Tt).lines, (e) => e, (e, t) => {
			var n = Lv(), r = F(n, !0);
			R(() => U(r, t)), H(e, n);
		});
		var o = I(a, 2), s = (e) => {
			var t = gm();
			K(t), ot(t, !0), R(() => J(t, "placeholder", z(Tt).placeholder)), B("keydown", t, (e) => e.key === "Enter" && z(Tt).value.trim() && Ot(!0)), Di(t, () => z(Tt).value, (e) => z(Tt).value = e), H(e, t);
		};
		W(o, (e) => {
			z(Tt).prompt && e(s);
		});
		var c = I(o, 2), l = N(c), u = F(l, !0), d = I(l, 2), f = F(d, !0);
		E(c), E(n), E(t), R(() => {
			U(i, z(Tt).title), U(u, z(Tt).cancelLabel), U(f, z(Tt).okLabel);
		}), B("pointerdown", t, (e) => kt = e.target === e.currentTarget), B("click", t, (e) => kt && e.target === e.currentTarget && Ot(!1)), B("click", l, () => Ot(!1)), B("click", d, () => Ot(!0)), H(e, t);
	};
	W(Xy, (e) => {
		z(Tt) && e(Zy);
	});
	var Qy = I(Xy, 2), $y = (e) => {
		var t = zv(), n = N(t), r = N(n), i = F(r, !0), a = I(r, 2), o = F(a, !0), s = I(a, 2), c = N(s), l = I(c);
		K(l), E(s);
		var u = I(s, 2), d = N(u), f = I(d);
		{
			let e = /* @__PURE__ */ k(() => Y("setup.accentPick"));
			wa(f, {
				get value() {
					return z(Mt);
				},
				get label() {
					return z(e);
				},
				onchange: (e) => j(Mt, e, !0)
			});
		}
		E(u);
		var p = I(u, 2), m = N(p), h = I(m);
		{
			let e = /* @__PURE__ */ k(() => Y("setup.bgLabel"));
			wa(h, {
				get value() {
					return z(Nt);
				},
				get label() {
					return z(e);
				},
				onchange: (e) => j(Nt, e, !0)
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
			() => !z(jt).trim(),
			() => Y("setup.start")
		]), B("keydown", l, (e) => e.key === "Enter" && Ft()), Di(l, () => z(jt), (e) => j(jt, e)), B("click", y, Pt), B("click", x, Ft), H(e, t);
	};
	W(Qy, (e) => {
		z(At) && e($y);
	});
	var eb = I(Qy, 2), tb = (e) => {
		var t = Bv();
		let n;
		var r = N(t), i = F(r, !0), a = I(r, 2);
		E(t), R((e) => {
			n = gi(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: z(fe) === "ok",
				error: z(fe) === "error"
			}), U(i, z(de)), J(a, "title", e);
		}, [() => Y("ui.close")]), B("click", a, () => T("")), H(e, t);
	};
	W(eb, (e) => {
		z(de) && e(tb);
	}), E(ky);
	var nb = I(ky, 2), rb = (e) => {
		var t = Vv();
		let n;
		var r = N(t), i = N(r), a = F(i, !0), o = I(i, 2);
		G(o, () => z(ln) ? "<svg viewBox=\"0 0 18 18\" width=\"14\" height=\"14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M2 4l4 5-4 5M16 4l-4 5 4 5\"/></svg>" : "<svg viewBox=\"0 0 18 18\" width=\"14\" height=\"14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M6 4L2 9l4 5M12 4l4 5-4 5\"/></svg>", !0), E(o);
		var s = I(o, 2);
		G(s, () => C.cross, !0), E(s), E(r);
		var c = I(r, 2), u = N(c);
		l(u, () => z(hn)), E(c), E(t), R((e, r, i, c) => {
			n = gi(t, 1, "block-menu svelte-1n46o8q", null, n, { wide: z(hn) }), vi(t, `--menu-left: ${z(on).left ?? ""}px; --menu-top: ${z(on).top ?? ""}px; --menu-min: ${z(fn) ?? ""}px`), U(a, e), J(o, "title", r), J(o, "aria-label", i), J(s, "title", c);
		}, [
			() => Y("blocks.suffix", { label: Fr[z(M).type] ?? z(M).type }),
			() => z(ln) ? Y("menu.toNarrow") : Y("menu.toWide"),
			() => z(ln) ? Y("menu.toNarrow") : Y("menu.toWide"),
			() => Y("tip.closeEsc")
		]), B("click", o, () => j(ln, !z(ln))), B("click", s, () => j(on, null)), H(e, t);
	};
	W(nb, (e) => {
		z(on) && z(M) && e(rb);
	}), R(() => Ny = gi(My, 1, "topbar svelte-1n46o8q", null, Ny, { hidden: !z(ye) })), H(e, Oy), Ze();
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
var Wv = zr(Uv, { target: document.getElementById("urd-admin") });
//#endregion
export { Wv as default };
