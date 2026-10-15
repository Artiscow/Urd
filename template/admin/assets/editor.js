//#region node_modules/svelte/src/internal/shared/utils.js
var e = Array.isArray, t = Array.prototype.indexOf, n = Array.prototype.includes, r = Array.from, i = Object.defineProperty, a = Object.getOwnPropertyDescriptor, o = Object.getOwnPropertyDescriptors, s = Object.prototype, c = Array.prototype, l = Object.getPrototypeOf, u = Object.isExtensible;
function d(e) {
	return typeof e == "function";
}
var f = () => {};
function p(e) {
	return e();
}
function m(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function h() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
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
var _ = 1 << 24, v = 1024, y = 2048, b = 4096, x = 8192, S = 16384, C = 32768, w = 1 << 25, T = 65536, E = 1 << 19, ee = 1 << 20, te = 1 << 25, ne = 1 << 21, re = 1 << 22, ie = 1 << 23, ae = Symbol("$state"), oe = Symbol("component"), se = Symbol("legacy props"), ce = Symbol(""), le = Symbol("attributes"), ue = Symbol("class"), de = Symbol("style"), fe = Symbol("text"), pe = Symbol("form reset"), me = new class extends Error {
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
	return De(/* @__PURE__ */ xn(Ee));
}
function D(e) {
	if (we) {
		if (/* @__PURE__ */ xn(Ee) !== null) throw Se(), ge;
		Ee = e;
	}
}
function ke(e = 1) {
	if (we) {
		for (var t = e, n = Ee; t--;) n = /* @__PURE__ */ xn(n);
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
		var i = /* @__PURE__ */ xn(n);
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
function Fe(e) {
	throw Error("https://svelte.dev/e/lifecycle_outside_component");
}
//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
function Ie() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function Le(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function Re(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function ze() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Be(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function Ve() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function He(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function Ue() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function We() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function Ge() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Ke() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
//#endregion
//#region node_modules/svelte/src/internal/flags/index.js
var qe = !1;
function Je() {
	qe = !0;
}
//#endregion
//#region node_modules/svelte/src/internal/shared/clone.js
var Ye = [];
function Xe(e, t = !1, n = !1) {
	return Ze(e, /* @__PURE__ */ new Map(), "", Ye, null, n);
}
function Ze(t, n, r, i, a = null, o = !1) {
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
				d in t && (u[d] = Ze(f, n, r, i, null, o));
			}
			return u;
		}
		if (l(t) === s) {
			u = {}, n.set(t, u), a !== null && n.set(a, u);
			for (var p of Object.keys(t)) u[p] = Ze(t[p], n, r, i, null, o);
			return u;
		}
		if (t instanceof Date) return t.getTime(), structuredClone(t);
		if (typeof t.toJSON == "function" && !o) return Ze(t.toJSON(), n, r, i, t);
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
function Qe(e) {
	let t = e.p;
	for (; t !== null && t.c === null;) t = t.p;
	return t?.c ?? null;
}
function $e(e, t) {
	return e === null && Fe(t), e.c ??= new Map(Qe(e) || void 0);
}
//#endregion
//#region node_modules/svelte/src/internal/client/context.js
var et = null;
function tt(e) {
	et = e;
}
function nt(e) {
	return $e(et, "getContext").get(e);
}
function rt(e, t) {
	return $e(et, "setContext").set(e, t), t;
}
function it(e, t = !1, n) {
	et = {
		p: et,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: or,
		l: qe && !t ? {
			s: null,
			u: null,
			$: []
		} : null
	};
}
function at(e) {
	var t = et, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) Pn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, et = t.p, ot(e);
}
function ot(e = {}) {
	return i(e, oe, { value: !0 }), e;
}
function st() {
	return !qe || et !== null && et.l === null;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var ct = [];
function lt() {
	var e = ct;
	ct = [], m(e);
}
function ut(e) {
	if (ct.length === 0 && !Bt) {
		var t = ct;
		queueMicrotask(() => {
			t === ct && lt();
		});
	}
	ct.push(e);
}
function dt() {
	for (; ct.length > 0;) lt();
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/status.js
var ft = ~(y | b | v);
function pt(e, t) {
	e.f = e.f & ft | t;
}
function mt(e) {
	e.f & 512 || e.deps === null ? pt(e, v) : pt(e, b);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function ht(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), pt(e, v);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
function gt(e, t) {
	if (t) {
		let t = document.body;
		e.autofocus = !0, ut(() => {
			document.activeElement === t && e.focus();
		});
	}
}
function _t(e) {
	we && /* @__PURE__ */ bn(e) !== null && Sn(e);
}
var vt = !1;
function yt() {
	vt || (vt = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[pe]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function bt(e) {
	var t = rr, n = or;
	ar(null), sr(null);
	try {
		return e();
	} finally {
		ar(t), sr(n);
	}
}
function xt(e, t, n, r = n) {
	e.addEventListener(t, () => bt(n));
	let i = e[pe];
	e[pe] = i ? () => {
		i(), r(!0);
	} : () => r(!0), yt();
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function St(e, t, n, r) {
	let i = st() ? Et : kt;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = or, c = Ct(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				Dn(e, s);
			}
			wt();
		}
	}
	var d = Tt();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ Ot(e))).then(u).catch((e) => Dn(e, s)).finally(d);
	}
	l ? l.then(() => {
		s.f & 16384 ? d() : (c(), f(), wt());
	}) : f();
}
function Ct() {
	var e = or, t = rr, n = et, r = It;
	return function(i = !0) {
		sr(e), ar(t), tt(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function wt(e = !0) {
	sr(null), ar(null), tt(null), e && It?.deactivate();
}
function Tt() {
	var e = or, t = e.b, n = It, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function Et(e) {
	var t = 2 | y;
	return or !== null && (or.f |= E), {
		ctx: et,
		deps: null,
		effects: null,
		equals: Me,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: _e,
		wv: 0,
		parent: or,
		ac: null
	};
}
var Dt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function Ot(e, t, n) {
	let r = or;
	r === null && Ie();
	var i = void 0, a = rn(_e), o = !rr, s = /* @__PURE__ */ new Set();
	return Rn(() => {
		var t = or, n = h();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== me && n.reject(e);
			}).finally(wt);
		} catch (e) {
			n.reject(e), wt();
		}
		var c = It;
		if (o) {
			if (t.f & 32768) var l = Tt();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(Dt);
			else for (let e of s.values()) e.reject(Dt);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== Dt && (c.activate(), t ? (a.f |= ie, ln(a, t)) : (a.f & 8388608 && (a.f ^= ie), ln(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), Mn(() => {
		for (let e of s) e.reject(Dt);
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
	let t = /* @__PURE__ */ Et(e);
	return lr(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function kt(e) {
	let t = /* @__PURE__ */ Et(e);
	return t.equals = Pe, t;
}
function At(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) Kn(t[n]);
	}
}
function jt(e) {
	var t, n = or, r = e.parent;
	if (!tr && r !== null && e.v !== _e && r.f & 24576) return xe(), e.v;
	sr(r);
	try {
		At(e), t = xr(e);
	} finally {
		sr(n);
	}
	return t;
}
function Mt(e) {
	var t = jt(e);
	!e.equals(t) && (e.wv = vr(), (!It?.is_fork || e.deps === null) && (It === null ? e.v = t : (It.capture(e, t, !0), Lt?.capture(e, t, !0)), e.deps === null)) ? pt(e, v) : tr || (Rt === null ? mt(e) : (jn() || It?.is_fork) && Rt.set(e, t));
}
function Nt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && bt(() => {
		t.ac.abort(me), t.ac = null;
	}), t.fn !== null && (t.teardown = f), wr(t, 0), Wn(t));
}
function Pt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && Tr(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var Ft = null, It = null, Lt = null, Rt = null, zt = null, Bt = !1, Vt = !1, Ht = null, Ut = null, Wt = 0, Gt = 1, Kt = class e {
	id = Gt++;
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
		Ft === null ? Ft = this : (Ft.#n = this, this.#t = Ft), Ft = this;
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
			for (var r of n.d) pt(r, y), t(r);
			for (r of n.m) pt(r, b), t(r);
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
		for (let e of this.#u) this.#d.delete(e), pt(e, y), this.schedule(e);
		for (let e of this.#d) pt(e, b), this.schedule(e);
		this.apply();
		for (var t = Ht = [], n = [], r = Ut = []; this.#c.length > 0;) {
			Wt++ > 1e3 && (this.#S(), Jt());
			for (let e of this.#g()) try {
				this.#v(e, t, n);
			} catch (t) {
				throw $t(e), this.#h() || this.discard(), t;
			}
		}
		if (It = null, r.length > 0) {
			var i = e.ensure();
			for (let e of r) i.schedule(e);
		}
		if (Ht = null, Ut = null, this.#h()) {
			this.#x(n), this.#x(t);
			for (let [e, t] of this.#f) Qt(e, t);
			r.length > 0 && It.#_();
			return;
		}
		let a = this.#y();
		if (a) this.#x(n), this.#x(t), a.#b(this);
		else {
			this.#u.clear(), this.#d.clear();
			for (let e of this.#r) e(this);
			this.#r.clear(), Lt = this, Xt(n), Xt(t), Lt = null, this.#s?.resolve();
			var o = It;
			if (this.#a === 0 && (this.#c.length === 0 || o !== null) && this.#S(), this.#c.length > 0) {
				if (o !== null) {
					for (let e of this.#c) o.#c.push(e);
					this.#c = [];
				} else o = this;
			}
			o !== null && (tn.clear(), o.#_());
		}
	}
	#v(e, t, n) {
		e.f ^= v;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
				a ? r.f ^= v : i & 4 ? t.push(r) : yr(r) && (i & 16 && this.#d.add(r), Tr(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), pt(i, y), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#S(), It = this, this.#_();
	}
	#x(e) {
		for (var t = 0; t < e.length; t += 1) ht(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== _e && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), Rt?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		It = this;
	}
	deactivate() {
		It = null, Rt = null;
	}
	flush() {
		try {
			Vt = !0, It = this, this.#_();
		} finally {
			Wt = 0, zt = null, Ht = null, Ut = null, Vt = !1, It = null, Rt = null, tn.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(Dt);
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
		this.#m || (this.#m = !0, ut(() => {
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
		return (this.#s ??= h()).promise;
	}
	static ensure() {
		if (It === null) {
			let t = It = new e();
			!Vt && !Bt && ut(() => {
				t.#e || t.flush();
			});
		}
		return It;
	}
	apply() {
		Rt = null;
	}
	schedule(e) {
		zt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768) ? e.b.defer_effect(e) : this.#c.push(e);
	}
	#S() {
		if (this.linked) {
			var e = this.#t, t = this.#n;
			e === null || (e.#n = t), t === null ? Ft = e : t.#t = e, this.linked = !1;
		}
	}
};
function qt(e) {
	var t = Bt, n = Lt;
	Lt = null, Bt = !0;
	try {
		var r;
		for (e && (qt(), r = e());;) {
			if (dt(), It === null) return r;
			It.flush();
		}
	} finally {
		Bt = t, Lt = n;
	}
}
function Jt() {
	try {
		Ve();
	} catch (e) {
		Dn(e, zt);
	}
}
var Yt = null;
function Xt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && yr(r) && (Yt = /* @__PURE__ */ new Set(), Tr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Jn(r), Yt?.size > 0)) {
				tn.clear();
				for (let e of Yt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Yt.has(n) && (Yt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || Tr(n);
					}
				}
				Yt.clear();
			}
		}
		Yt = null;
	}
}
function Zt(e) {
	It.schedule(e);
}
function Qt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), pt(e, v);
		for (var n = e.first; n !== null;) Qt(n, t), n = n.next;
	}
}
function $t(e) {
	pt(e, v);
	for (var t = e.first; t !== null;) $t(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var en = /* @__PURE__ */ new Set(), tn = /* @__PURE__ */ new Map(), nn = !1;
function rn(e, t) {
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
function k(e, t) {
	let n = rn(e, t);
	return lr(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function an(e, t = !1, n = !0) {
	let r = rn(e);
	return t || (r.equals = Pe), qe && n && et !== null && et.l !== null && (et.l.s ??= []).push(r), r;
}
function on(e, t) {
	return A(e, kr(() => I(e))), t;
}
function A(e, t, n = !1) {
	return rr !== null && (!ir || rr.f & 131072) && st() && rr.f & 4325394 && (cr === null || !cr.has(e)) && Ge(), ln(e, n ? pn(t) : t, Ut);
}
var sn = null, cn = 0;
function ln(e, t, n = null) {
	if (!e.equals(t)) {
		tr ? tn.set(e, t) : tn.has(e) || tn.set(e, e.v);
		var r = Kt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && jt(t), Rt === null && mt(t);
		}
		e.wv = vr(), sn = null, cn = 0, fn(e, y, n), sn = null, st() && or !== null && or.f & 1024 && !(or.f & 96) && (fr === null ? pr([e]) : fr.push(e)), !r.is_fork && en.size > 0 && !nn && un();
	}
	return t;
}
function un() {
	nn = !1;
	for (let e of en) {
		e.f & 1024 && pt(e, b);
		let t;
		try {
			t = yr(e);
		} catch {
			t = !0;
		}
		t && Tr(e);
	}
	en.clear();
}
function dn(e) {
	A(e, e.v + 1);
}
function fn(e, t, n) {
	var r = e.reactions;
	if (r !== null) {
		var i = st(), a = r.length;
		if (cn += a, cn > 1e5 && sn === null && (sn = /* @__PURE__ */ new Set()), sn !== null) {
			if (sn.has(e)) return;
			sn.add(e);
		}
		for (var o = 0; o < a; o++) {
			var s = r[o], c = s.f;
			if (i || s !== or) {
				var l = (c & y) === 0;
				if (l && pt(s, t), c & 131072) en.add(s);
				else if (c & 2) {
					var u = s;
					Rt?.delete(u), fn(u, b, n);
				} else if (l) {
					var d = s;
					c & 16 && Yt !== null && Yt.add(d), n === null ? Zt(d) : n.push(d);
				}
			}
		}
	}
}
function pn(t) {
	if (typeof t != "object" || !t || ae in t || oe in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ k(0), u = null, d = gr, f = (e) => {
		if (gr === d) return e();
		var t = rr, n = gr;
		ar(null), _r(d);
		var r = e();
		return ar(t), _r(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ k(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && Ue();
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
					let e = f(() => /* @__PURE__ */ k(_e, u));
					r.set(t, e), dn(o);
				}
			} else A(n, _e), dn(o);
			return !0;
		},
		get(e, n, i) {
			if (n === ae) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ k(pn(s ? e[n] : _e), u)), r.set(n, o)), o !== void 0) {
				var c = I(o);
				return c === _e ? void 0 : c;
			}
			return Reflect.get(e, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			this.has?.(e, t);
			var n = Reflect.getOwnPropertyDescriptor(e, t), i = r.get(t);
			if (i !== void 0) {
				var a = I(i);
				if (a === _e) return;
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
			if (t === ae) return !0;
			var n = r.get(t), i = n !== void 0 && n.v !== _e || Reflect.has(e, t);
			return (n !== void 0 || or !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ k(i ? pn(e[t]) : _e, u)), r.set(t, n)), I(n) === _e) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ k(_e, u)), r.set(d + "", p)) : A(p, _e);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ k(void 0, u)), A(c, pn(n)), r.set(t, c));
			else {
				l = c.v !== _e;
				var m = f(() => pn(n));
				A(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && A(g, _ + 1);
				}
				dn(o);
			}
			return !0;
		},
		ownKeys(e) {
			I(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== _e;
			});
			for (var [n, i] of r) i.v !== _e && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			We();
		}
	});
}
var mn, hn, gn, _n;
function vn() {
	if (mn === void 0) {
		mn = window, hn = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		gn = a(t, "firstChild").get, _n = a(t, "nextSibling").get, u(e) && (e[ue] = void 0, e[le] = null, e[de] = void 0, e.__e = void 0), u(n) && (n[fe] = void 0);
	}
}
function yn(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function bn(e) {
	return gn.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function xn(e) {
	return _n.call(e);
}
function j(e, t) {
	if (!we) return /* @__PURE__ */ bn(e);
	var n = /* @__PURE__ */ bn(Ee);
	if (n === null) n = Ee.appendChild(yn());
	else if (t && n.nodeType !== 3) {
		var r = yn();
		return n?.before(r), De(r), r;
	}
	return t && Tn(n), De(n), n;
}
function M(e, t = !1) {
	if (!we) {
		var n = /* @__PURE__ */ bn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ xn(n) : n;
	}
	if (t) {
		if (Ee?.nodeType !== 3) {
			var r = yn();
			return Ee?.before(r), De(r), r;
		}
		Tn(Ee);
	}
	return Ee;
}
function N(e, t = !1) {
	if (!we) return /* @__PURE__ */ bn(e);
	var n = j(e, t);
	return D(e), n;
}
function P(e, t = 1, n = !1) {
	let r = we ? Ee : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ xn(r);
	if (!we) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = yn();
			return r === null ? i?.after(a) : r.before(a), De(a), a;
		}
		Tn(r);
	}
	return De(r), r;
}
function Sn(e) {
	e.textContent = "";
}
function Cn() {
	return !1;
}
function wn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function Tn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
function En(e) {
	var t = or;
	if (t === null) return rr.f |= ie, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	Dn(e, t);
}
function Dn(e, t) {
	if (e === ge) throw e;
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
function On(e) {
	or === null && (rr === null && Be(e), ze()), tr && Re(e);
}
function kn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function An(e, t) {
	var n = or;
	n !== null && n.f & 8192 && (e |= x);
	var r = {
		ctx: et,
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
	It?.register_created_effect(r);
	var i = r;
	if (e & 4) Ht === null ? Kt.ensure().schedule(r) : Ht.push(r);
	else if (t !== null) {
		try {
			Tr(r);
		} catch (e) {
			throw Kn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= T));
	}
	if (i !== null && (i.parent = n, n !== null && kn(i, n), rr !== null && rr.f & 2 && !(e & 64))) {
		var a = rr;
		(a.effects ??= []).push(i);
	}
	return r;
}
function jn() {
	return rr !== null && !ir;
}
function Mn(e) {
	let t = An(8, null);
	return pt(t, v), t.teardown = e, t;
}
function Nn(e) {
	On("$effect");
	var t = or.f;
	if (!rr && t & 32 && et !== null && !et.i) {
		var n = et;
		(n.e ??= []).push(e);
	} else return Pn(e);
}
function Pn(e) {
	return An(4 | ee, e);
}
function Fn(e) {
	return On("$effect.pre"), An(8 | ee, e);
}
function In(e) {
	Kt.ensure();
	let t = An(64 | E, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Yn(t, () => {
			Kn(t), n(void 0);
		}) : (Kn(t), n(void 0));
	});
}
function Ln(e) {
	return An(4, e);
}
function Rn(e) {
	return An(re | E, e);
}
function zn(e, t = 0) {
	return An(8 | t, e);
}
function F(e, t = [], n = [], r = []) {
	St(r, t, n, (t) => {
		An(8, () => {
			e(...t.map(I));
		});
	});
}
function Bn(e, t = 0) {
	return An(16 | t, e);
}
function Vn(e, t = 0) {
	return An(_ | t, e);
}
function Hn(e) {
	return An(32 | E, e);
}
function Un(e) {
	var t = e.teardown;
	if (t !== null) {
		let n = tr, r = rr;
		nr(!0), ar(null);
		try {
			t.call(null);
		} catch (t) {
			Dn(t, e.parent);
		} finally {
			nr(n), ar(r);
		}
	}
}
function Wn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && bt(() => {
			e.abort(me);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : Kn(n, t), n = r;
	}
}
function Gn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || Kn(t), t = n;
	}
}
function Kn(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (qn(e.nodes.start, e.nodes.end), n = !0), e.f |= w, Wn(e, t && !n), wr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	Un(e), e.f ^= w, e.f |= S;
	var i = e.parent;
	i !== null && i.first !== null && Jn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function qn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ xn(e);
		e.remove(), e = n;
	}
}
function Jn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Yn(e, t, n = !0) {
	var r = [];
	e.f |= 256, Xn(e, r, !0);
	var i = () => {
		n && Kn(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Xn(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= x;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				Xn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Zn(e) {
	e.f &= -257, Qn(e, !0);
}
function Qn(e, t) {
	if (!(e.f & 256) && e.f & 8192) {
		e.f ^= x, e.f & 1024 || (pt(e, y), Kt.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			Qn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function $n(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ xn(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var er = null, tr = !1;
function nr(e) {
	tr = e;
}
var rr = null, ir = !1;
function ar(e) {
	rr = e;
}
var or = null;
function sr(e) {
	or = e;
}
var cr = null;
function lr(e) {
	rr !== null && (rr.f & 2097152 || rr.f & 2) && (cr ??= /* @__PURE__ */ new Set()).add(e);
}
var ur = null, dr = 0, fr = null;
function pr(e) {
	fr = e;
}
var mr = 1, hr = 0, gr = hr;
function _r(e) {
	gr = e;
}
function vr() {
	return ++mr;
}
function yr(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (yr(a) && Mt(a), a.wv > e.wv) return !0;
		}
		t & 512 && Rt === null && pt(e, v);
	}
	return !1;
}
function br(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(cr !== null && cr.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? br(a, t, !1) : t === a && (n ? pt(a, y) : a.f & 1024 && pt(a, b), Zt(a));
	}
}
function xr(e) {
	var t = ur, n = dr, r = fr, i = rr, a = cr, o = et, s = ir, c = gr, l = e.f;
	ur = null, dr = 0, fr = null, rr = l & 96 ? null : e, cr = null, tt(e.ctx), ir = !1, gr = ++hr, e.ac !== null && (bt(() => {
		e.ac.abort(me);
	}), e.ac = null);
	try {
		e.f |= ne;
		var u = e.fn, d = u();
		e.f |= C;
		var f = Sr(e);
		if (st() && fr !== null && !ir && f !== null && !(e.f & 6146)) for (var p = 0; p < fr.length; p++) br(fr[p], e);
		if (i !== null && i !== e) {
			if (hr++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = hr;
			if (t !== null) for (let e of t) e.rv = hr;
			fr !== null && (r === null ? r = fr : r.push(...fr));
		}
		return e.f & 8388608 && (e.f ^= ie), d;
	} catch (t) {
		return Sr(e), En(t);
	} finally {
		e.f ^= ne, ur = t, dr = n, fr = r, rr = i, cr = a, tt(o), ir = s, gr = c;
	}
}
function Sr(e) {
	var t = e.deps, n = It?.is_fork;
	if (ur !== null) {
		var r;
		if (n || wr(e, dr), t !== null && dr > 0) for (t.length = dr + ur.length, r = 0; r < ur.length; r++) t[dr + r] = ur[r];
		else e.deps = t = ur;
		if (jn() && e.f & 512) for (r = dr; r < t.length; r++) (t[r].reactions ??= []).push(e);
	} else !n && t !== null && dr < t.length && (wr(e, dr), t.length = dr);
	return t;
}
function Cr(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && (ur === null || !n.call(ur, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512), s.v !== _e && mt(s), s.ac !== null && bt(() => {
			s.ac.abort(me), s.ac = null, pt(s, y);
		}), Nt(s), wr(s, 0);
	}
}
function wr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) Cr(e, n[r]);
}
function Tr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		pt(e, v);
		var n = or;
		or = e;
		try {
			t & 16777232 ? Gn(e) : Wn(e), Un(e);
			var r = xr(e);
			e.teardown = typeof r == "function" ? r : null, e.wv = mr;
		} finally {
			or = n;
		}
	}
}
async function Er() {
	await Promise.resolve(), qt();
}
function I(e) {
	var t = !!(e.f & 2);
	if (er?.add(e), rr !== null && !ir && !(or !== null && or.f & 16384) && (cr === null || !cr.has(e))) {
		var r = rr.deps;
		if (rr.f & 2097152) e.rv < hr && (e.rv = hr, ur === null && r !== null && r[dr] === e ? dr++ : ur === null ? ur = [e] : ur.push(e));
		else {
			rr.deps ??= [], n.call(rr.deps, e) || rr.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [rr] : n.call(i, rr) || i.push(rr);
		}
	}
	if (tr && tn.has(e)) return tn.get(e);
	if (t) {
		var a = e;
		if (tr) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || Or(a)) && (o = jt(a)), tn.set(a, o), o;
		}
		var s = !(a.f & 512) && !ir && rr !== null && !!(rr.f & 512), c = (a.f & C) === 0;
		yr(a) && (s && (a.f |= 512), Mt(a)), s && !c && (Pt(a), Dr(a));
	}
	if (Rt?.has(e)) return Rt.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function Dr(e) {
	if (e.f |= 512, e.deps !== null) for (let r of e.deps) {
		var t = r.reactions;
		t === null ? r.reactions = [e] : n.call(t, e) || t.push(e), r.f & 2 && !(r.f & 512) && (Pt(r), Dr(r));
	}
}
function Or(e) {
	if (e.v === _e) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (tn.has(t) || t.f & 2 && Or(t)) return !0;
	return !1;
}
function kr(e) {
	var t = ir;
	try {
		return ir = !0, e();
	} finally {
		ir = t;
	}
}
function Ar(e) {
	if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
		if (ae in e) jr(e);
		else if (!Array.isArray(e)) for (let t in e) {
			let n = e[t];
			typeof n == "object" && n && ae in n && jr(n);
		}
	}
}
function jr(e, t = /* @__PURE__ */ new Set()) {
	if (typeof e == "object" && e && !(e instanceof EventTarget) && !t.has(e)) {
		t.add(e), e instanceof Date && e.getTime();
		for (let n in e) try {
			jr(e[n], t);
		} catch {}
		let n = l(e);
		if (n !== Object.prototype && n !== Array.prototype && n !== Map.prototype && n !== Set.prototype && n !== Date.prototype) {
			let t = o(n);
			for (let n in t) {
				let r = t[n].get;
				if (r) try {
					r.call(e);
				} catch {}
			}
		}
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var Mr = ["touchstart", "touchmove"];
function Nr(e) {
	return Mr.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var Pr = Symbol("events"), Fr = /* @__PURE__ */ new Set(), Ir = /* @__PURE__ */ new Set();
function Lr(e) {
	if (!we) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function Rr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Ur.call(t, e), !e.cancelBubble) return bt(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? (i.__removed = !1, ut(() => {
		i.__removed || t.addEventListener(e, i, r);
	})) : t.addEventListener(e, i, r), i;
}
function zr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = Rr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && Mn(() => {
		o.__removed = !0, t.removeEventListener(e, o, a);
	});
}
function L(e, t, n) {
	(t[Pr] ??= {})[e] = n;
}
function Br(e) {
	for (var t = 0; t < e.length; t++) Fr.add(e[t]);
	for (var n of Ir) n(e);
}
var Vr = null, Hr = !1;
function Ur(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	Vr = e, Hr || (Hr = !0, setTimeout(() => {
		Hr = !1, Vr = null;
	}));
	var s = 0, c = Vr === e && e[Pr];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[Pr] = t;
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
		var d = rr, f = or;
		ar(null), sr(null);
		try {
			for (var p, m = []; o !== null && o !== t;) {
				try {
					var h = o[Pr]?.[r];
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
			e[Pr] = t, delete e.currentTarget, ar(d), sr(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var Wr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Gr(e) {
	return Wr?.createHTML(e) ?? e;
}
function Kr(e) {
	var t = wn("template");
	return t.innerHTML = Gr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function qr(e, t) {
	var n = or;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function R(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (we) return qr(Ee, null), Ee;
		i === void 0 && (i = Kr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ bn(i)));
		var t = r || hn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ bn(t), s = t.lastChild;
			qr(o, s);
		} else qr(t, t);
		return t;
	};
}
function Jr(e = "") {
	if (!we) {
		var t = yn(e + "");
		return qr(t, t), t;
	}
	var n = Ee;
	return n.nodeType === 3 ? Tn(n) : (n.before(n = yn()), De(n)), qr(n, n), n;
}
function Yr() {
	if (we) return qr(Ee, null), Ee;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = yn();
	return e.append(t, n), qr(t, n), e;
}
function z(e, t) {
	if (we) {
		var n = or;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = Ee), Oe();
	} else e !== null && e.before(t);
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function Xr(e) {
	let t = 0, n = rn(0), r;
	return () => {
		jn() && (I(n), zn(() => (t === 0 && (r = kr(() => e(() => dn(n)))), t += 1, () => {
			ut(() => {
				--t, t === 0 && (r?.(), r = void 0, dn(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Zr = T | E;
function Qr(e, t, n, r) {
	new $r(e, t, n, r);
}
var $r = class {
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
	#h = Xr(() => (this.#m = rn(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = or;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = or.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = Bn(() => {
			if (we) {
				let e = je(this.#t);
				Oe();
				let t = e === "[!";
				if (e.startsWith("[?")) {
					let t = JSON.parse(e.slice(2));
					this.#_(t);
				} else t ? this.#b() : this.#g();
			} else this.#x();
		}, Zr), we && (this.#e = Ee);
	}
	#g() {
		try {
			this.#a = Hn(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#v(e);
		ut(r), t && (this.#s = Hn(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#v(e) {
		var t = !1, n = !1;
		let r = () => {
			this.#y() || (t ? Ce() : (t = !0, n && Ke(), this.#s !== null && Yn(this.#s, () => {
				this.#s = null;
			}), this.#C(() => {
				this.#x();
			})));
		};
		return {
			reset: r,
			invoke_onerror: () => {
				if (!this.#y()) try {
					n = !0, this.#n.onerror?.(e, r), n = !1;
				} catch (e) {
					Dn(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#y() {
		return (this.#i.f & (S | w)) !== 0;
	}
	#b() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = Hn(() => e(this.#e)), ut(() => {
			if (!this.#y()) {
				var e = this.#c = document.createDocumentFragment(), t = yn(), n = !1;
				e.append(t), this.#a = this.#C(() => {
					try {
						return Hn(() => this.#r(t));
					} catch (e) {
						try {
							this.error(e), n = !0;
						} catch (e) {
							Dn(e, this.#i.parent);
						}
						return null;
					}
				}), this.#a === null ? (this.#c = null, n && this.#S(It)) : this.#u === 0 && (this.#e.before(e), this.#c = null, Yn(this.#o, () => {
					this.#o = null;
				}), this.#S(It));
			}
		}));
	}
	#x() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = Hn(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				$n(this.#a, e);
				let t = this.#n.pending;
				this.#o = Hn(() => t(this.#e));
			} else this.#S(It);
		} catch (e) {
			this.error(e);
		}
	}
	#S(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		ht(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#C(e) {
		var t = or, n = rr, r = et;
		sr(this.#i), ar(this.#i), tt(this.#i.ctx);
		try {
			return Kt.ensure(), e();
		} finally {
			sr(t), ar(n), tt(r);
		}
	}
	#w(e, t) {
		this.has_pending_snippet() ? (this.#u += e, this.#u === 0 && (this.#S(t), this.#o && Yn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null))) : this.parent && this.parent.#w(e, t);
	}
	update_pending_count(e, t) {
		this.#w(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, ut(() => {
			this.#d = !1, this.#m && ln(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), I(this.#m);
	}
	error(e) {
		if (e === ge || !this.#n.onerror && !this.#n.failed) throw e;
		It?.is_fork ? (this.#a && It.skip_effect(this.#a), this.#o && It.skip_effect(this.#o), this.#s && It.skip_effect(this.#s), It.oncommit(() => {
			this.#y() || this.#T(e);
		})) : this.#T(e);
	}
	#T(e) {
		this.#a &&= (Kn(this.#a), null), this.#o &&= (Kn(this.#o), null), this.#s &&= (Kn(this.#s), null), we && (De(this.#t), ke(), De(Ae()));
		let t = this.#n.failed, n = (e) => {
			if (this.#y()) return;
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && !this.#y() && (this.#s = this.#C(() => {
				try {
					return Hn(() => {
						var r = or;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return Dn(e, this.#i.parent), null;
				}
			}));
		};
		ut(() => {
			if (!this.#y()) {
				var t;
				try {
					t = this.transform_error(e);
				} catch (e) {
					Dn(e, this.#i && this.#i.parent);
					return;
				}
				typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => Dn(e, this.#i && this.#i.parent)) : n(t);
			}
		});
	}
}, ei = !0;
function B(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[fe] ??= e.nodeValue) && (e[fe] = n, e.nodeValue = `${n}`);
}
function ti(e, t) {
	return ri(e, t);
}
var ni = /* @__PURE__ */ new Map();
function ri(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	vn();
	var l = void 0, u = In(() => {
		var u = n ?? t.appendChild(yn());
		Qr(u, { pending: () => {} }, (t) => {
			it({});
			var n = et;
			if (o && (n.c = o), a && (i.$$events = a), we && qr(t, null), ei = s, l = e(t, i) || ot(), ei = !0, we && (or.nodes.end = Ee, Ee === null || Ee.nodeType !== 8 || Ee.data !== "]")) throw Se(), ge;
			at();
		}, c);
		var d = /* @__PURE__ */ new Set(), f = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!d.has(r)) {
					d.add(r);
					var i = Nr(r);
					for (let e of [t, document]) {
						var a = ni.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), ni.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Ur, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return f(r(Fr)), Ir.add(f), () => {
			for (var e of d) for (let n of [t, document]) {
				var r = ni.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Ur), r.delete(e), r.size === 0 && ni.delete(n)) : r.set(e, i);
			}
			Ir.delete(f), u !== n && u.parentNode?.removeChild(u);
		};
	});
	return ii.set(l, u), l;
}
var ii = /* @__PURE__ */ new WeakMap(), ai = class {
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
			if (n) Zn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (Zn(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (Kn(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						$n(r, t), t.append(yn()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else Kn(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Yn(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (Kn(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = It, r = Cn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = yn();
				i.append(a), this.#n.set(e, {
					effect: Hn(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, Hn(() => t(this.anchor)));
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
function V(e, t, n = !1) {
	var r;
	we && (r = Ee, Oe());
	var i = new ai(e), a = n ? T : 0;
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
	Bn(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
function oi(e, t) {
	return t;
}
function si(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		Yn(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					ci(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null && e.pending.size === 0;
		if (l) {
			var u = n, d = u.parentNode;
			Sn(d), d.append(u), e.items.clear();
		}
		ci(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function ci(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= te, $n(a, document.createDocumentFragment())) : Kn(t[i], n);
	}
}
var li;
function ui(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = we ? De(/* @__PURE__ */ bn(u)) : u.appendChild(yn());
	}
	we && Oe();
	var d = null, f = /* @__PURE__ */ kt(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p = /* @__PURE__ */ new Map(), m = !0;
	function h(e) {
		if (!(_.effect.f & 16384)) {
			_.pending.delete(e);
			var t = I(f);
			_.fallback = d, fi(_, t, c, n, a), d !== null && (t.length === 0 ? d.f & 33554432 ? (d.f ^= te, mi(d, null, c)) : Zn(d) : Yn(d, () => {
				d = null;
			}));
		}
	}
	function g(e) {
		_.pending.delete(e);
	}
	var _ = {
		effect: Bn(() => {
			var e = I(f), t = e.length;
			let r = !1;
			we && je(c) === "[!" != (t === 0) && (c = Ae(), De(c), Te(!1), r = !0);
			for (var u = /* @__PURE__ */ new Set(), _ = It, v = Cn(), y = 0; y < t; y += 1) {
				we && Ee.nodeType === 8 && Ee.data === "]" && (c = Ee, r = !0, Te(!1));
				var b = e[y], x = a(b, y), S = m ? null : l.get(x);
				S ? (S.v && ln(S.v, b), S.i && ln(S.i, y), v && _.unskip_effect(S.e)) : (S = pi(l, m ? c : li ??= yn(), b, x, y, o, n, i), m || (S.e.f |= te), l.set(x, S)), u.add(x);
			}
			if (t === 0 && s && !d && (m ? d = Hn(() => s(c)) : (d = Hn(() => s(li ??= yn())), d.f |= te)), t > u.size && Le("", "", ""), we && t > 0 && De(Ae()), !m) {
				if (p.set(_, u), v) {
					for (let [e, t] of l) u.has(e) || _.skip_effect(t.e);
					_.oncommit(h), _.ondiscard(g);
				} else h(_);
			}
			r && Te(!0), I(f);
		}),
		flags: n,
		items: l,
		pending: p,
		outrogroups: null,
		fallback: d
	};
	m = !1, we && (c = Ee);
}
function di(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function fi(e, t, n, i, a) {
	var o = !!(i & 8), s = t.length, c = e.items, l = di(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (Zn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) {
			if (_.f ^= te, _ === l) mi(_, null, n);
			else {
				var y = d ? d.next : l;
				_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), hi(e, d, _), hi(e, _, y), mi(_, y, n), d = _, p = [], m = [], l = di(d.next);
				continue;
			}
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) mi(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					hi(e, S.prev, C.next), hi(e, d, S), hi(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), mi(_, l, n), hi(e, _.prev, _.next), hi(e, _, d === null ? e.effect.first : d.next), hi(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = di(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = di(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (ci(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var w = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || w.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && w.push(l), l = di(l.next);
		var T = w.length;
		if (T > 0) {
			var E = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.fix();
			}
			si(e, w, E);
		}
	}
	o && ut(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function pi(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? rn(n) : /* @__PURE__ */ an(n, !1, !1) : null, l = o & 2 ? rn(i) : null;
	return {
		v: c,
		i: l,
		e: Hn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function mi(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ xn(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function hi(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function H(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		we && (o = De(/* @__PURE__ */ bn(c)));
	}
	F(() => {
		var e = or;
		if (s === (s = t() ?? "")) we && Oe();
		else if (n && !we) e.nodes = null, c.innerHTML = s, s !== "" && qr(/* @__PURE__ */ bn(c), c.lastChild);
		else if (e.nodes !== null && (qn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (we) {
				for (var a = Ee.data, l = Oe(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ xn(l);
				if (l === null) throw Se(), ge;
				qr(Ee, u), o = De(l);
			} else {
				var d = wn(r ? "svg" : i ? "math" : "template", r ? ye : i ? be : void 0);
				d.innerHTML = s;
				var f = r || i ? d : d.content;
				if (qr(/* @__PURE__ */ bn(f), f.lastChild), r || i) for (; /* @__PURE__ */ bn(f);) o.before(/* @__PURE__ */ bn(f));
				else o.before(f);
			}
		}
	});
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/snippet.js
function gi(e, t, ...n) {
	var r = new ai(e);
	Bn(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, T);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/svelte-component.js
function _i(e, t, n) {
	var r;
	we && (r = Ee, Oe());
	var i = new ai(e);
	Bn(() => {
		var e = t() ?? null;
		if (we && je(r) === "[" != (e !== null)) {
			var a = Ae();
			De(a), i.anchor = a, Te(!1), i.ensure(e, e && ((t) => n(t, e))), Te(!0);
		} else i.ensure(e, e && ((t) => n(t, e)));
	}, T);
}
//#endregion
//#region node_modules/svelte/src/internal/client/timing.js
var vi = () => performance.now(), yi = {
	tick: (e) => requestAnimationFrame(e),
	now: () => vi(),
	tasks: /* @__PURE__ */ new Set()
};
//#endregion
//#region node_modules/svelte/src/internal/client/loop.js
function bi() {
	let e = yi.now();
	yi.tasks.forEach((t) => {
		t.c(e) || (yi.tasks.delete(t), t.f());
	}), yi.tasks.size !== 0 && yi.tick(bi);
}
function xi(e) {
	let t;
	return yi.tasks.size === 0 && yi.tick(bi), {
		promise: new Promise((n) => {
			yi.tasks.add(t = {
				c: e,
				f: n
			});
		}),
		abort() {
			yi.tasks.delete(t);
		}
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/transitions.js
function Si(e, t) {
	bt(() => {
		e.dispatchEvent(new CustomEvent(t));
	});
}
function Ci(e) {
	if (e === "float") return "cssFloat";
	if (e === "offset") return "cssOffset";
	if (e.startsWith("--")) return e;
	let t = e.split("-");
	return t.length === 1 ? t[0] : t[0] + t.slice(1).map((e) => e[0].toUpperCase() + e.slice(1)).join("");
}
function wi(e) {
	let t = {}, n = e.split(";");
	for (let e of n) {
		let [n, r] = e.split(":");
		if (!n || r === void 0) break;
		let i = Ci(n.trim());
		t[i] = r.trim();
	}
	return t;
}
var Ti = (e) => e;
function Ei(e, t, n, r) {
	var i = !!(e & 1), a = !!(e & 2), o = i && a, s = !!(e & 4), c = o ? "both" : i ? "in" : "out", l, u = t.inert, d = t.style.overflow, f, p;
	function m() {
		return bt(() => l ??= n()(t, r?.() ?? {}, { direction: c }));
	}
	var h = {
		is_global: s,
		in() {
			t.inert = u, i ? (a || f?.abort(), f = Di(t, m(), p, 1, () => {
				Si(t, "introstart");
			}, () => {
				Si(t, "introend"), f?.abort(), f = l = void 0, t.style.overflow = d;
			})) : (p?.abort(), p?.reset?.());
		},
		out(e) {
			a ? (t.inert = !0, p = Di(t, m(), f, 0, () => {
				Si(t, "outrostart");
			}, () => {
				Si(t, "outroend"), e?.();
			})) : (e?.(), l = void 0);
		},
		stop: () => {
			f?.abort(), p?.abort();
		}
	}, g = or;
	if ((g.nodes.t ??= []).push(h), i && ei) {
		var _ = s;
		if (!_) {
			for (var v = g.parent; v && v.f & 65536;) for (; (v = v.parent) && !(v.f & 16););
			_ = !v || !!(v.f & 32768);
		}
		_ && Ln(() => {
			kr(() => h.in());
		});
	}
}
function Di(e, t, n, r, i, a) {
	var o = r === 1, s = !1;
	if (d(t)) {
		var c;
		return ut(() => {
			s || (c = Di(e, t({ direction: o ? "in" : "out" }), n, r, i, a));
		}), {
			abort: () => {
				s = !0, c?.abort();
			},
			deactivate: () => c?.deactivate(),
			reset: () => c?.reset(),
			t: () => c?.t() ?? 1 - r
		};
	}
	if (n?.deactivate(), !t?.duration && !t?.delay) return i(), a(), {
		abort: f,
		deactivate: f,
		reset: f,
		t: () => r
	};
	let { delay: l = 0, css: u, tick: p, easing: m = Ti } = t;
	var h, g = () => 1 - r;
	return ut(() => {
		if (!s) {
			var c = [];
			if (o && n === void 0 && (p && p(0, 1), u)) {
				var d = wi(u(0, 1));
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
						var v = o + s * m(_ / f), y = wi(u(v, 1 - v));
						l.push(y), d ||= y.overflow === "hidden";
					}
					d && (e.style.overflow = "hidden"), g = () => {
						var e = h.currentTime;
						return o + s * m(e / c);
					}, p && xi(() => {
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
function Oi(e, t) {
	var n = void 0, r;
	Vn(() => {
		n !== (n = t()) && (r &&= (Kn(r), null), n && (r = Hn(() => {
			Ln(() => n(e));
		})));
	});
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
var ki = [..." 	\n\r\f\xA0\v﻿"];
function Ai(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || ki.includes(r[o - 1])) && (s === r.length || ki.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function ji(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function Mi(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Ni(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\/\*.*?\*\//g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(Mi)), i && c.push(...Object.keys(i).map(Mi));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = Mi(e.substring(l, u).trim());
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
		return r && (n += ji(r)), i && (n += ji(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function Pi(e, t, n, r, i, a) {
	var o = e[ue];
	if (we || o !== n || o === void 0) {
		var s = Ai(n, r, a);
		(!we || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[ue] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/style.js
function Fi(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function Ii(e, t, n, r) {
	var i = e[de];
	if (we || i !== t) {
		var a = Ni(t, r);
		(!we || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[de] = t;
	} else r && (Array.isArray(r) ? (Fi(e, n?.[0], r[0]), Fi(e, n?.[1], r[1], "important")) : Fi(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var Li = Symbol("is custom element"), Ri = Symbol("is html"), zi = he ? "link" : "LINK", Bi = he ? "progress" : "PROGRESS";
function U(e) {
	if (we) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					G(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					G(e, "checked", null), e.checked = r;
				}
			}
		};
		e[pe] = n, ut(n), yt();
	}
}
function W(e, t) {
	var n = Hi(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === Bi) && (e.value = t ?? "");
}
function Vi(e, t) {
	var n = Hi(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function G(e, t, n, r) {
	var i = Hi(e);
	we && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === zi) || i[t] !== (i[t] = n) && (t === "loading" && (e[ce] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Wi(e).has(t) ? e[t] = n : e.setAttribute(t, n));
}
function Hi(e) {
	return e[le] ??= {
		[Li]: e.nodeName.includes("-"),
		[Ri]: e.namespaceURI === ve
	};
}
var Ui = /* @__PURE__ */ new Map();
function Wi(e) {
	var t = e.getAttribute("is") || e.nodeName, n = Ui.get(t);
	if (n) return n;
	Ui.set(t, n = /* @__PURE__ */ new Set());
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.add(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function Gi(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	xt(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = Ki(e) ? qi(a) : a, n(a), It !== null && r.add(It), await Er(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (we && e.defaultValue !== e.value || kr(t) == null && e.value) && (n(Ki(e) ? qi(e.value) : e.value), It !== null && r.add(It)), zn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = It;
			if (r.has(i)) return;
		}
		Ki(e) && n === qi(e.value) || (e.type !== "date" || n || e.value) && n !== e.value && (e.value = n ?? "");
	});
}
function Ki(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function qi(e) {
	return e === "" ? null : +e;
}
var Ji = /* @__PURE__ */ new class e {
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
function Yi(e, t, n) {
	var r = Ji.observe(e, () => n(e[t]));
	Ln(() => (kr(() => n(e[t])), r));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function Xi(e, t) {
	return e === t || e?.[ae] === t;
}
function Zi(e = ot(), t, n, r) {
	var i = et.r, a = or;
	return Ln(() => {
		var o, s;
		return zn(() => {
			o = s, s = r?.() || [], kr(() => {
				Xi(n(...s), e) || (t(e, ...s), o && Xi(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && Xi(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/universal.js
function Qi(e, t, n, r, i) {
	var a = () => {
		r(n[e]);
	};
	n.addEventListener(t, a), i ? zn(() => {
		n[e] = i();
	}) : a(), (n === document.body || n === window || n === document) && Mn(() => {
		n.removeEventListener(t, a);
	});
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/legacy/lifecycle.js
function $i(e = !1) {
	let t = et, n = t.l.u;
	if (!n) return;
	let r = () => Ar(t.s);
	if (e) {
		let e = 0, n = {}, i = /* @__PURE__ */ Et(() => {
			let r = !1, i = t.s;
			for (let e in i) i[e] !== n[e] && (n[e] = i[e], r = !0);
			return r && e++, e;
		});
		r = () => I(i);
	}
	n.b.length && Fn(() => {
		ea(t, r), m(n.b);
	}), Nn(() => {
		let e = kr(() => n.m.map(p));
		return () => {
			for (let t of e) typeof t == "function" && t();
		};
	}), n.a.length && Nn(() => {
		ea(t, r), m(n.a);
	});
}
function ea(e, t) {
	if (e.l.s) for (let t of e.l.s) I(t);
	t();
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var ta = !1;
function na(e) {
	var t = ta;
	try {
		return ta = !1, [e(), ta];
	} finally {
		ta = t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
function ra(e, t, n, r) {
	var i = !qe || !!(n & 2), o = !!(n & 8), s = !!(n & 16), c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ Et(r), I(u)) : (l && (l = !1, c = s ? kr(r) : r), c);
	let f;
	if (o) {
		var p = ae in e || se in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = na(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && He(t), f(m)));
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
	var v = !1, y = (n & 1 ? Et : kt)(() => (v = !1, g()));
	o && I(y);
	var b = or;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? I(y) : i && o ? pn(e) : e;
			return A(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return tr && v || b.f & 16384 ? y.v : I(y);
	});
}
function ia(e) {
	et === null && Fe("onMount"), qe && et.l !== null ? aa(et).m.push(e) : Nn(() => {
		let t = kr(e);
		if (typeof t == "function") return t;
	});
}
function aa(e) {
	var t = e.l;
	return t.u ??= {
		a: [],
		b: [],
		m: []
	};
}
//#endregion
//#region ../template/assets/engine/0.7.4/locales/site/nb.js
var oa = {
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
		"gallery.pause": "Sett lysbildene på pause",
		"gallery.play": "Spill av lysbildene",
		"ribbon.pause": "Sett båndet på pause",
		"ribbon.play": "Spill av båndet",
		"video.unknownUrl": "Ukjent videolenke (YouTube og Vimeo støttes)",
		"video.emptyHint": "Lim inn en YouTube- eller Vimeo-lenke i Egenskaper",
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
}, sa = [
	"nb",
	"nn",
	"en-GB",
	"se",
	"tr"
], ca = /^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/, la = {
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
function ua(e) {
	let t = String(e ?? "").trim().toLowerCase();
	for (let [e, n] of Object.entries(la)) if (n.some((e) => t === e || t.startsWith(`${e}-`))) return e;
	return null;
}
function da(e) {
	return sa.includes(String(e ?? ""));
}
function fa(e) {
	let t = [];
	if (!Array.isArray(e)) return ["languages must be a list"];
	for (let n of e) {
		if (!n || typeof n != "object" || Array.isArray(n)) {
			t.push("languages: every entry must be an object");
			continue;
		}
		let e = String(n.code ?? "");
		ca.test(e) ? da(e) && t.push(`languages: '${e}' is built into Urd and cannot be overridden`) : t.push(`languages: '${e}' is not a valid language code`), (typeof n.name != "string" || !n.name.trim()) && t.push(`languages/${e}: name is missing (the language's own name)`);
		for (let r of ["site", "admin"]) n[r] !== void 0 && typeof n[r] != "boolean" && t.push(`languages/${e}: ${r} must be a boolean`);
		n.site !== !0 && n.admin !== !0 && t.push(`languages/${e}: must cover site, admin or both`);
	}
	return t;
}
function pa(e) {
	let t = ua(e);
	if (t) return t;
	let n = String(e ?? "").trim();
	return ca.test(n) ? n : "nb";
}
async function ma(e, t) {
	try {
		return await (await import(
			/* @vite-ignore */
			"/assets/urd/language-packs.js"
)).loadPackStrings(e, t);
	} catch {
		return null;
	}
}
var ha = {
	lang: "nb",
	dict: { ...oa.strings },
	dates: null
}, ga = {
	lang: "nb",
	dict: {}
};
function _a(e, t) {
	if (!t) return e;
	let n = e;
	for (let [e, r] of Object.entries(t)) n = n.replaceAll(`{${e}}`, String(r));
	return n;
}
function K(e, t) {
	return _a(ga.dict[e] ?? e, t);
}
function va(e, t) {
	let n = "other";
	try {
		n = new Intl.PluralRules(ha.lang).select(t);
	} catch {}
	let r = ha.dict[`${e}.${n}`] !== void 0 || ha.dict[`${e}.other`] === void 0 ? n : "other";
	return {
		form: r,
		key: `${e}.${r}`
	};
}
function ya(e, t, n) {
	let { key: r } = va(e, t);
	return _a(ha.dict[r] ?? r, {
		...n,
		n: t
	});
}
function ba(e) {
	let t = `api.${e?.code}`;
	return e?.code && ga.dict[t] !== void 0 ? _a(ga.dict[t], e) : e?.error ?? null;
}
function xa() {
	return ga.lang;
}
function Sa() {
	let e = null;
	try {
		e = localStorage.getItem("urd-admin-lang");
	} catch {}
	if (e) return pa(e);
	for (let e of navigator.languages ?? [navigator.language]) {
		let t = ua(e);
		if (t) return t;
	}
	return "en-GB";
}
var Ca;
new Promise((e) => {
	Ca = e;
});
async function wa(e = Sa()) {
	let t = async (e) => (await import(
		/* @vite-ignore */
		`/assets/urd/locales/admin/${e}.js`
)).default.strings;
	ga.lang = pa(e);
	let n = da(ga.lang);
	try {
		Object.assign(ga.dict, await t("nb")), n && ga.lang !== "nb" && Object.assign(ga.dict, await t(ga.lang));
	} catch {}
	if (!n) {
		let e = await ma(ga.lang, "admin");
		e ? Object.assign(ga.dict, e) : ga.lang = "nb";
	}
	return Ca(ga.lang), ga.lang;
}
//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region src/lib/icons.js
var q = {
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
};
//#endregion
//#region ../template/assets/engine/0.7.4/anchored.js
function Ta(e = globalThis) {
	let t = e?.HTMLElement?.prototype, n = e?.CSS;
	return !!(t && "popover" in t && typeof t.showPopover == "function" && typeof n?.supports == "function" && n.supports("anchor-name: --urd") && n.supports("position-try-fallbacks: flip-block"));
}
var Ea = 0;
function Da(e = "urd-pop") {
	return Ea += 1, `--${e}-${Ea}`;
}
function Oa(e, t) {
	let n = e?.closest?.(".panel-body, .block-menu-body");
	n && (t ? n.style.setProperty("anchor-name", "--urd-pane") : n.style.removeProperty("anchor-name"));
}
//#endregion
//#region src/lib/Dropdown.svelte
var ka = /* @__PURE__ */ R("<span aria-hidden=\"true\"><svg viewBox=\"0 0 16 16\" width=\"1em\" height=\"1em\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"svelte-vtocc6\"><path d=\"M3.5 6l4.5 4.5L12.5 6\"></path></svg></span>"), Aa = /* @__PURE__ */ R("<span class=\"dd-note svelte-vtocc6\"> </span>"), ja = /* @__PURE__ */ R("<button type=\"button\"> <!></button>"), Ma = /* @__PURE__ */ R("<button type=\"button\"><span class=\"dd-value svelte-vtocc6\"> </span> <!></button> <div class=\"dd-pop dd-anchored svelte-vtocc6\" popover=\"auto\"><!></div>", 1), Na = /* @__PURE__ */ R("<div class=\"dd-pop svelte-vtocc6\"></div>"), Pa = /* @__PURE__ */ R("<button type=\"button\"><span class=\"dd-value svelte-vtocc6\"> </span> <!></button> <!>", 1), Fa = /* @__PURE__ */ R("<span class=\"dd svelte-vtocc6\"><!></span>");
function J(e, t) {
	it(t, !0);
	let n = (e) => {
		var t = ka();
		let n;
		F(() => n = Pi(t, 1, "dd-caret svelte-vtocc6", null, n, { "dd-caret-open": I(f) })), z(e, t);
	}, r = ra(t, "value", 3, null), i = ra(t, "options", 19, () => []), a = ra(t, "title", 3, null), o = ra(t, "disabled", 3, !1), s = ra(t, "filled", 3, !1), c = ra(t, "compact", 3, !1), l = Ta(), u = Da("urd-dd"), d = u.slice(2), f = /* @__PURE__ */ k(!1), p = /* @__PURE__ */ k(null), m = /* @__PURE__ */ k(null), h = /* @__PURE__ */ k(pn({
		top: 0,
		left: 0,
		width: 160
	})), _ = () => i().find(([e]) => `${e ?? ""}` == `${r() ?? ""}`)?.[1] ?? "";
	function v() {
		let e = I(p).getBoundingClientRect(), t = Math.min(320, i().reduce((e, t) => e + (t[2] ? 76 : 32), 12)), n = Math.max(e.width, 160), r = e.bottom + t + 8 <= window.innerHeight;
		A(h, {
			top: r ? e.bottom + 4 : Math.max(8, e.top - t - 4),
			left: Math.max(8, Math.min(e.left, window.innerWidth - n - 8)),
			width: n
		}, !0);
	}
	function y() {
		o() || (I(f) ? A(f, !1) : (v(), A(f, !0)));
	}
	function b(e) {
		l && I(m)?.hidePopover(), A(f, !1), t.onchange?.(e);
	}
	Nn(() => {
		if (!I(f)) return;
		let e = () => {
			l ? I(m)?.hidePopover() : A(f, !1);
		};
		if (window.addEventListener("blur", e), l) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			I(p) && !I(p).contains(e.target) && A(f, !1);
		}, n = (e) => {
			e.key === "Escape" && A(f, !1);
		}, r = (e) => {
			I(p) && e.target instanceof Node && !I(p).contains(e.target) && v();
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var x = Fa(), S = j(x), C = (e) => {
		var t = Ma(), l = M(t);
		let p;
		var h = j(l), v = N(h, !0), y = P(h, 2);
		n(y), D(l);
		var x = P(l, 2), S = j(x), C = (e) => {
			var t = Yr();
			ui(M(t), 17, i, ([e, t, n]) => `${e ?? ""}`, (e, t) => {
				var n = /* @__PURE__ */ O(() => g(I(t), 3));
				let i = () => I(n)[0], a = () => I(n)[1], o = () => I(n)[2];
				var s = ja();
				let c;
				var l = j(s, !0), u = P(l), d = (e) => {
					var t = Aa(), n = N(t, !0);
					F(() => B(n, o())), z(e, t);
				};
				V(u, (e) => {
					o() && e(d);
				}), D(s), F(() => {
					c = Pi(s, 1, "dd-opt svelte-vtocc6", null, c, { selected: `${i() ?? ""}` == `${r() ?? ""}` }), B(l, a());
				}), L("click", s, () => b(i())), z(e, s);
			}), z(e, t);
		};
		V(S, (e) => {
			I(f) && e(C);
		}), D(x), Zi(x, (e) => A(m, e), () => I(m)), F((e) => {
			p = Pi(l, 1, "dd-btn svelte-vtocc6", null, p, {
				"dd-filled": s(),
				"dd-compact": c()
			}), G(l, "title", a()), l.disabled = o(), G(l, "popovertarget", d), Ii(l, `anchor-name: ${u ?? ""}`), B(v, e), G(x, "id", d), Ii(x, `position-anchor: ${u ?? ""}`);
		}, [() => _()]), zr("toggle", x, (e) => {
			A(f, e.newState === "open");
		}), z(e, t);
	}, w = (e) => {
		var t = Pa(), l = M(t);
		let u;
		var d = j(l), p = N(d, !0), m = P(d, 2);
		n(m), D(l);
		var v = P(l, 2), x = (e) => {
			var t = Na();
			ui(t, 21, i, ([e, t, n]) => `${e ?? ""}`, (e, t) => {
				var n = /* @__PURE__ */ O(() => g(I(t), 3));
				let i = () => I(n)[0], a = () => I(n)[1], o = () => I(n)[2];
				var s = ja();
				let c;
				var l = j(s, !0), u = P(l), d = (e) => {
					var t = Aa(), n = N(t, !0);
					F(() => B(n, o())), z(e, t);
				};
				V(u, (e) => {
					o() && e(d);
				}), D(s), F(() => {
					c = Pi(s, 1, "dd-opt svelte-vtocc6", null, c, { selected: `${i() ?? ""}` == `${r() ?? ""}` }), B(l, a());
				}), L("click", s, () => b(i())), z(e, s);
			}), D(t), F(() => Ii(t, `top: ${I(h).top ?? ""}px; left: ${I(h).left ?? ""}px; min-width: ${I(h).width ?? ""}px`)), z(e, t);
		};
		V(v, (e) => {
			I(f) && e(x);
		}), F((e) => {
			u = Pi(l, 1, "dd-btn svelte-vtocc6", null, u, {
				"dd-filled": s(),
				"dd-compact": c()
			}), G(l, "title", a()), l.disabled = o(), B(p, e);
		}, [() => _()]), L("click", l, y), z(e, t);
	};
	V(S, (e) => {
		l ? e(C) : e(w, -1);
	}), D(x), Zi(x, (e) => A(p, e), () => I(p)), z(e, x), at();
}
Br(["click"]);
function Ia(e) {
	return Number(e) === 2 ? 2 : 1;
}
//#endregion
//#region ../template/assets/engine/0.7.4/gallery-layout.js
var La = [
	"floating",
	"fill",
	"band",
	"mosaic"
], Ra = [
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
], za = [
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
], Ba = [
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
], Va = [
	"square",
	"circle",
	"triangle",
	"diamond",
	"hexagon",
	"octagon",
	"star",
	"heart"
], Ha = {
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
}, Ua = {
	floating: "drift",
	fill: "none",
	mosaic: "crossfade",
	band: "none"
}, Wa = {
	min: 1,
	max: 20,
	dflt: 8
}, Ga = {
	min: 60,
	max: 400
}, Ka = {
	floating: 140,
	band: 156,
	mosaic: 140,
	fill: 0
}, qa = {
	polaroid: "#ffffff",
	border: "#ffffff",
	thick: "#ffffff",
	double: "#ffffff",
	dark: "#161616",
	glow: "accent"
}, Ja = 1.35, Ya = {
	min: 0,
	max: 1,
	dflt: .85
}, Xa = {
	min: 0,
	max: 15,
	dflt: 5
}, Za = {
	min: 0,
	max: 48,
	dflt: 5
}, Qa = {
	min: .5,
	max: 90,
	dflt: 30
}, $a = {
	min: .5,
	max: 90,
	dflt: 12
}, eo = {
	min: 4,
	max: 20,
	dflt: 12
};
function to(e) {
	let t = String(e), n = 5381;
	for (let e = 0; e < t.length; e++) n = (n << 5) + n + t.charCodeAt(e) >>> 0;
	return n;
}
function no(e, t) {
	let n = to(`${e}:${t}`);
	return n ^= n >>> 15, n = Math.imul(n, 739982445) >>> 0, n ^= n >>> 12, n = Math.imul(n, 695872825) >>> 0, n ^= n >>> 15, (n >>> 0) / 4294967296;
}
function ro(e) {
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
function io(e) {
	return Array.from({ length: Math.max(1, Math.round(Number(e) || 0)) }, (e, t) => ({ src: ro(t) }));
}
var ao = (e) => Math.round(e * 100) / 100;
function oo(e, { min: t, max: n, dflt: r }) {
	if (e == null || e === "") return r;
	let i = Number(e);
	return Number.isFinite(i) ? Math.min(n, Math.max(t, i)) : r;
}
function so(e) {
	return La.includes(e) ? e : "floating";
}
function co(e, t) {
	let n = so(e);
	return Ha[n].includes(t) ? t : Ua[n];
}
function lo(e) {
	return Ha[so(e)];
}
function uo({ style: e = "floating", motion: t, reducedMotion: n = !1 } = {}) {
	return n ? !1 : so(e) === "band" || co(e, t) !== "none";
}
function fo(e, t, n, r = !1) {
	let i = Math.round(oo(e, so(t) === "mosaic" ? eo : Wa)), a = Number(n);
	return !r && Number.isFinite(a) && a > 0 ? Math.min(i, a) : i;
}
function po(e, t) {
	let n = Ka[so(t)] || Ka.floating;
	return Math.round(oo(e, {
		...Ga,
		dflt: n
	}));
}
function mo(e) {
	return _o(e) in qa;
}
function ho(e, t) {
	let n = qa[_o(e)] ?? "";
	return n && typeof t == "string" && t.trim() ? t.trim() : n;
}
function go(e) {
	return Ra.includes(e) ? e : "rect";
}
function _o(e) {
	return za.includes(e) ? e : "shadow";
}
function vo(e) {
	return Ba.includes(e) ? e : "natural";
}
function yo(e, t) {
	if (_o(t) === "polaroid") return .84;
	let n = go(e);
	return Va.includes(n) ? 1 : n === "arch" ? .8 : Ja;
}
function bo(e) {
	return ["rect", "square"].includes(go(e));
}
function xo(e) {
	return oo(e, $a);
}
function So(e) {
	return oo(e, Ya);
}
function Co(e) {
	return oo(e, Xa);
}
function wo(e) {
	return Math.round(oo(e, Za));
}
function To(e) {
	return oo(e, Qa);
}
function Eo(e) {
	return Ia(e);
}
function Do(e, t) {
	let n = Number(e);
	return Number.isFinite(n) && n > 0 ? Math.round(n) : Number(t) || 1;
}
function Oo(e, { count: t, seed: n, size: r, spread: i, tilt: a, style: o = "floating", repeat: s = !1 } = {}) {
	let c = (Array.isArray(e) ? e : []).filter((e) => e && typeof e.src == "string" && e.src), l = fo(t, o, c.length, s), u = po(r, o), d = So(i), f = Co(a), p = n == null || n === "" ? 1 : n, m = Math.ceil(Math.sqrt(l * 1.6)), h = Math.ceil(l / m), g = Array.from({ length: m * h }, (e, t) => t).map((e) => ({
		cell: e,
		at: no(p, `cell${e}`)
	})).sort((e, t) => e.at - t.at).map((e) => e.cell), _ = [];
	for (let e = 0; e < l; e++) {
		let t = g[e], n = (t % m + .5) / m + (no(p, `x${e}`) - .5) * (.9 / m), r = (Math.floor(t / m) + .5) / h + (no(p, `y${e}`) - .5) * (.9 / h);
		_.push({
			src: c.length ? c[e % c.length].src : "",
			index: c.length ? e % c.length : -1,
			x: ao(50 + (n - .5) * 100 * d),
			y: ao(50 + (r - .5) * 100 * d),
			w: Math.round(u * (.8 + no(p, `w${e}`) * .4)),
			rot: ko(p, e, f),
			phase: ao(no(p, `p${e}`)),
			heading: ao(no(p, `h${e}`))
		});
	}
	return _;
}
function ko(e, t, n) {
	return ao((no(e == null || e === "" ? 1 : e, `r${t}`) - .5) * 2 * Co(n));
}
function Ao(e, t) {
	let n = e == null || e === "" ? 1 : e, r = no(n, `m${t}`);
	return {
		cols: r < .3 ? 2 : 1,
		rows: r > .7 || r < .1 ? 2 : 1,
		phase: ao(no(n, `mp${t}`))
	};
}
function jo(e, t, n, r = !1) {
	let i = fo(e, "mosaic", n, r);
	return Array.from({ length: i }, (e, n) => Ao(t, n));
}
//#endregion
//#region ../template/assets/engine/0.7.4/preset-thumb.js
var Mo = /^#[0-9a-fA-F]{3,8}$/, No = /^[a-z][a-z0-9-]*$/, Po = "#171c26", Fo = "#232a38", Io = "#98a1b3", Lo = "#7c5cff", Ro = (e, t) => `var(--urd-color-${e}, ${t})`;
function zo(e, t) {
	return typeof e == "string" ? Mo.test(e) ? e : No.test(e) ? Ro(e, t) : t : t;
}
function Bo(e, t = 800) {
	let n = Number.parseFloat(e);
	return !Number.isFinite(n) || n <= 0 ? 400 : typeof e == "string" && e.trim().endsWith("vh") ? n / 100 * t : n;
}
var Vo = (e) => Math.round(e * 10) / 10, Ho = (e, t, n) => Math.min(n, Math.max(t, e)), Uo = (e, t, n, r, i, a = "") => `<rect x="${Vo(e)}" y="${Vo(t)}" width="${Vo(Math.max(n, 1))}" height="${Vo(Math.max(r, 1))}" fill="${i}"${a}/>`;
function Wo(e) {
	if (e?.theme) return e.theme === "inverse" || e.theme === "deep" ? Ro("text", Io) : e.theme === "accent" ? Ro("accent", Lo) : Ro("surface", Fo);
	for (let t of e?.background?.layers ?? []) {
		if (t.type === "color") return zo(t.props?.value, Po);
		if (t.type === "gradient") return zo(Array.isArray(t.props?.stops) ? t.props.stops[0] : null, Po);
	}
	return Ro("bg", Po);
}
function Go(e, t, n, r, i) {
	let a = /<h[1-3]/.test(String(i?.html ?? "")), o = i?.align === "center", s = Ro("text", Io), c = [];
	i?.box && c.push(Uo(e, t, n, r, Ro("surface", Fo), " rx=\"1.5\""));
	let l = i?.box ? Math.min(2, n * .06) : 0, u = e + l, d = n - l * 2, f = [
		.72,
		.9,
		.5
	], p = [
		a ? 4 : 2.2,
		2.2,
		2.2
	], m = Ho(r / (p[0] + p[1] + p[2] + 4.8 + 2), 0, 1), h = t + l + Math.min(1, r * .08);
	for (let e = 0; e < 3; e++) {
		let n = Math.min(Math.max(e === 0 ? a ? 1.4 : 1 : .8, p[e] * m), Math.max(r, 1));
		if (e > 0 && h + n > t + r - l) break;
		let i = d * f[e], g = o ? u + (d - i) / 2 : u;
		c.push(Uo(g, h, i, n, s, ` opacity="${e === 0 ? .8 : .4}" rx="${Vo(Math.min(1, n / 2))}"`)), h += n + Math.max(.8, 2.4 * m);
	}
	return c.join("");
}
function Ko(e, t, n, r, i = !1) {
	let a = Ro("text", Io), o = [];
	i ? (o.push(Uo(e, t, n, r, Ro("surface", Fo), " rx=\"1.5\" opacity=\"0.35\"")), o.push(`<rect x="${Vo(e + .4)}" y="${Vo(t + .4)}" width="${Vo(Math.max(n - .8, 1))}" height="${Vo(Math.max(r - .8, 1))}" fill="none" stroke="${a}" stroke-width="0.6" stroke-dasharray="2 2" opacity="0.35" rx="1.5"/>`)) : o.push(Uo(e, t, n, r, Ro("surface", Fo), " rx=\"1.5\""));
	let s = i ? .15 : .4, c = (t) => Vo(e + n * t), l = (e) => Vo(t + r * e);
	return o.push(`<polygon points="${c(.08)},${l(.9)} ${c(.42)},${l(.38)} ${c(.62)},${l(.68)} ${c(.75)},${l(.5)} ${c(.92)},${l(.9)}" fill="${a}" opacity="${s}"/>`), o.push(`<circle cx="${c(.28)}" cy="${l(.26)}" r="${Vo(Math.max(1, Math.min(n, r) * .1))}" fill="${a}" opacity="${Vo(s + .1)}"/>`), o.join("");
}
function qo(e, t, n, r, i) {
	let a = !(Array.isArray(i?.images) && i.images.length), o = Math.max(1, n * .03), s = (n - o * 2) / 3, c = [];
	for (let n = 0; n < 3; n++) c.push(Ko(e + n * (s + o), t, s, r, a));
	return c.join("");
}
function Jo(e, t, n, r) {
	let i = Math.max(1, n * .03), a = (n - i * 2) / 3, o = [];
	for (let n = 0; n < 3; n++) {
		let s = e + n * (a + i);
		o.push(Uo(s, t, a, r * .55, Ro("surface", Fo), " rx=\"1.5\"")), o.push(Uo(s, t + r * .62, a * .8, 2, Ro("text", Io), " opacity=\"0.5\" rx=\"1\""));
	}
	return o.join("");
}
function Yo(e, t, n, r, i) {
	let a = zo(i?.color, Lo), o = i?.kind;
	return o === "circle" ? `<ellipse cx="${Vo(e + n / 2)}" cy="${Vo(t + r / 2)}" rx="${Vo(Math.max(n / 2, 1))}" ry="${Vo(Math.max(r / 2, 1))}" fill="${a}" opacity="0.8"/>` : o === "triangle" ? `<polygon points="${Vo(e)},${Vo(t + r)} ${Vo(e + n / 2)},${Vo(t)} ${Vo(e + n)},${Vo(t + r)}" fill="${a}" opacity="0.8"/>` : o === "line" || o === "arrow" ? Uo(e, t + r / 2 - .75, n, 1.5, a, " opacity=\"0.85\" rx=\"0.75\"") : Uo(e, t, n, r, a, " opacity=\"0.8\" rx=\"1\"");
}
function Xo(e, t, n, r, i, a) {
	if (e === "text") return Go(t, n, r, i, a);
	if (e === "image") return Ko(t, n, r, i, !a?.src);
	if (e === "gallery") return qo(t, n, r, i, a);
	if (e === "collection") return Jo(t, n, r, i);
	if (e === "faq") {
		let e = Ho(Math.floor(i / 5), 2, 3), a = Math.max(.6, i * .04), o = (i - a * (e - 1)) / e, s = [];
		for (let i = 0; i < e; i += 1) {
			let e = n + i * (o + a);
			s.push(Uo(t, e, r, o, Ro("surface", Fo), " rx=\"1\"")), s.push(Uo(t + r * .06, e + o / 2 - .7, r * .55, 1.4, Ro("text", Io), " opacity=\"0.5\" rx=\"0.7\"")), s.push(`<circle cx="${Vo(t + r * .92)}" cy="${Vo(e + o / 2)}" r="0.9" fill="${Ro("text", Io)}" opacity="0.4"/>`);
		}
		return s.join("");
	}
	if (e === "shape") return Yo(t, n, r, i, a);
	if (e === "button") return Uo(t, n, r, i, Ro("accent", Lo), ` rx="${Vo(Math.min(i / 2, 4))}"`);
	if (e === "icon") {
		let e = Math.max(1.2, Math.min(r, i) / 2);
		return `<circle cx="${Vo(t + r / 2)}" cy="${Vo(n + i / 2)}" r="${Vo(e)}" fill="${Ro("accent", Lo)}" opacity="0.85"/>`;
	}
	if (e === "video") {
		let e = [Uo(t, n, r, i, Ro("surface", Fo), " rx=\"1.5\"")], a = t + r / 2, o = n + i / 2, s = Math.max(1.5, Math.min(r, i) * .22);
		return e.push(`<polygon points="${Vo(a - s / 2)},${Vo(o - s)} ${Vo(a - s / 2)},${Vo(o + s)} ${Vo(a + s)},${Vo(o)}" fill="${Ro("text", Io)}" opacity="0.6"/>`), e.join("");
	}
	if (e === "timeline") {
		let e = [Uo(t + 1, n, 1.4, i, Ro("accent", Lo), " opacity=\"0.7\" rx=\"0.7\"")];
		for (let a = 0; a < 3; a += 1) {
			let o = n + i * (.18 + a * .32);
			e.push(`<circle cx="${Vo(t + 1.7)}" cy="${Vo(o)}" r="1.6" fill="${Ro("accent", Lo)}"/>`), e.push(Uo(t + 5, o - 1, r * .5, 2, Ro("text", Io), " opacity=\"0.5\" rx=\"1\""));
		}
		return e.join("");
	}
	if (e === "quote") return [
		`<text x="${Vo(t + r / 2)}" y="${Vo(n + i * .34)}" text-anchor="middle" font-size="${Vo(Math.min(r, i) * .5)}" font-family="Georgia, serif" fill="${Ro("accent", Lo)}">“</text>`,
		Uo(t + r * .15, n + i * .48, r * .7, 2, Ro("text", Io), " opacity=\"0.6\" rx=\"1\""),
		Uo(t + r * .25, n + i * .62, r * .5, 2, Ro("text", Io), " opacity=\"0.6\" rx=\"1\""),
		Uo(t + r * .35, n + i * .82, r * .3, 1.6, Ro("text", Io), " opacity=\"0.35\" rx=\"0.8\"")
	].join("");
	if (e === "ribbon") return [
		Uo(t, n + i * .3, r, i * .4, Ro("accent", Lo), " opacity=\"0.85\" rx=\"1\""),
		Uo(t + r * .08, n + i * .46, r * .18, 1.8, Ro("bg", Po), " opacity=\"0.9\" rx=\"0.9\""),
		Uo(t + r * .34, n + i * .46, r * .24, 1.8, Ro("bg", Po), " opacity=\"0.9\" rx=\"0.9\""),
		Uo(t + r * .66, n + i * .46, r * .2, 1.8, Ro("bg", Po), " opacity=\"0.9\" rx=\"0.9\"")
	].join("");
	if (e === "stats") return [Uo(t + r * .28, n + i * .15, r * .44, i * .42, Ro("accent", Lo), " opacity=\"0.85\" rx=\"1\""), Uo(t + r * .32, n + i * .72, r * .36, 1.6, Ro("text", Io), " opacity=\"0.4\" rx=\"0.8\"")].join("");
	if (e === "table") {
		let e = Math.max(1.6, i * .22), a = [Uo(t, n, r, e, Ro("accent", Lo), " opacity=\"0.5\" rx=\"0.8\"")], o = Ho(Math.floor((i - e) / 3.2), 1, 3);
		for (let s = 0; s < o; s += 1) a.push(Uo(t, n + e + 1 + s * ((i - e - 1) / o), r, 1, Ro("text", Io), " opacity=\"0.3\""));
		return a.push(Uo(t + r * .33, n, .6, i, Ro("text", Io), " opacity=\"0.2\"")), a.push(Uo(t + r * .66, n, .6, i, Ro("text", Io), " opacity=\"0.2\"")), a.join("");
	}
	if (e === "share") {
		let e = Math.max(1.2, Math.min(i / 2, r / 9)), a = [];
		for (let r = 0; r < 4; r += 1) a.push(`<circle cx="${Vo(t + e + r * (e * 2 + 1.5))}" cy="${Vo(n + i / 2)}" r="${Vo(e)}" fill="${Ro("accent", Lo)}" opacity="0.8"/>`);
		return a.join("");
	}
	if (e === "countdown") {
		let e = Math.max(.8, r * .03), a = (r - e * 3) / 4, o = [];
		for (let r = 0; r < 4; r += 1) {
			let s = t + r * (a + e);
			o.push(Uo(s, n, a, i, Ro("surface", Fo), " rx=\"1\"")), o.push(Uo(s + a * .25, n + i * .2, a * .5, i * .35, Ro("accent", Lo), " opacity=\"0.85\" rx=\"0.8\""));
		}
		return o.join("");
	}
	if (e === "audio") {
		let e = [Uo(t, n, r, i, Ro("surface", Fo), " rx=\"1.5\"")], a = n + i / 2, o = Math.max(1.2, i * .28);
		return e.push(`<polygon points="${Vo(t + r * .06)},${Vo(a - o)} ${Vo(t + r * .06)},${Vo(a + o)} ${Vo(t + r * .06 + o * 1.4)},${Vo(a)}" fill="${Ro("accent", Lo)}" opacity="0.85"/>`), e.push(Uo(t + r * .2, a - .6, r * .7, 1.2, Ro("text", Io), " opacity=\"0.35\" rx=\"0.6\"")), e.join("");
	}
	if (e === "product") {
		let e = Math.max(.8, r * .03), a = (r - e * 2) / 3, o = [];
		for (let r = 0; r < 3; r += 1) {
			let s = t + r * (a + e);
			o.push(Uo(s, n, a, i, Ro("surface", Fo), " rx=\"1\"")), o.push(Uo(s + a * .08, n + i * .06, a * .84, i * .42, Ro("text", Io), " opacity=\"0.15\" rx=\"0.8\"")), o.push(Uo(s + a * .08, n + i * .56, a * .6, 1.4, Ro("text", Io), " opacity=\"0.5\" rx=\"0.7\"")), o.push(Uo(s + a * .08, n + i * .72, a * .35, 1.4, Ro("accent", Lo), " opacity=\"0.85\" rx=\"0.7\"")), o.push(Uo(s + a * .08, n + i * .84, a * .84, i * .1, Ro("accent", Lo), " opacity=\"0.6\" rx=\"1\""));
		}
		return o.join("");
	}
	if (e === "cart") {
		let e = Math.max(1.5, Math.min(r, i) / 2.4), a = t + r / 2, o = n + i / 2;
		return [
			`<circle cx="${Vo(a)}" cy="${Vo(o)}" r="${Vo(e)}" fill="${Ro("surface", Fo)}"/>`,
			Uo(a - e * .5, o - e * .25, e, e * .55, Ro("text", Io), " opacity=\"0.5\" rx=\"0.4\""),
			`<circle cx="${Vo(a + e * .75)}" cy="${Vo(o - e * .75)}" r="${Vo(Math.max(.9, e * .35))}" fill="${Ro("accent", Lo)}"/>`
		].join("");
	}
	return e === "checkout" ? [
		Uo(t, n, r * .7, 1.2, Ro("text", Io), " opacity=\"0.5\" rx=\"0.6\""),
		Uo(t, n + i * .12, r * .5, 1.2, Ro("text", Io), " opacity=\"0.35\" rx=\"0.6\""),
		Uo(t, n + i * .3, r, i * .14, Ro("surface", Fo), " rx=\"1\""),
		Uo(t, n + i * .5, r, i * .14, Ro("surface", Fo), " rx=\"1\""),
		Uo(t, n + i * .78, r * .45, i * .16, Ro("accent", Lo), " opacity=\"0.85\" rx=\"1.2\"")
	].join("") : Uo(t, n, r, i, Ro("surface", Fo), " rx=\"1.5\"");
}
function Zo(e, t, n) {
	let r = Array.isArray(e?.blocks) ? e.blocks : [], i = r.map((e) => (e.frames?.desktop?.y ?? 0) + (e.frames?.desktop?.h ?? 0)), a = n / Math.max(Bo(e?.size?.minHeight), i.length ? Math.max(...i) + 16 : 0), o = [Uo(0, 0, t, n, Wo(e))];
	for (let r of e?.background?.layers ?? []) {
		if (r.type !== "glow") continue;
		let e = r.props ?? {};
		o.push(`<circle cx="${Vo(Ho(e.x ?? .5, 0, 1) * t)}" cy="${Vo(Ho(e.y ?? .3, 0, 1) * n)}" r="${Vo(t * Ho(e.radius ?? .5, .1, 1) * .5)}" fill="${zo(e.color, Lo)}" opacity="${Vo(Ho(e.opacity ?? .3, 0, .5))}"/>`);
	}
	for (let r of e?.background?.layers ?? []) {
		if (r.type !== "slideshow") continue;
		let e = r.props ?? {}, i = e.style ?? "floating", a = Ro("surface", Fo);
		if (i === "floating") {
			let r = e.look === "polaroid", s = t * (r ? .17 : .13), c = s / (r ? .84 : 1.35);
			for (let r of Oo(e.images, {
				...e,
				seed: e.seed || 1,
				style: i
			})) {
				let e = r.x / 100 * t - s / 2, i = r.y / 100 * n - c / 2, l = ` rx="1" opacity="0.75" transform="rotate(${Vo(r.rot)} ${Vo(e + s / 2)} ${Vo(i + c / 2)})"`;
				o.push(Uo(e, i, s, c, a, l));
			}
		} else if (i === "band") {
			let r = Number(e.rows) === 1 ? 1 : 2, i = n * (r === 1 ? .4 : .3), s = i * 1.33;
			for (let e = 0; e < r; e += 1) {
				let c = r === 1 ? (n - i) / 2 : n * .1 + e * (i + n * .1);
				for (let n = -s * (e * .5); n < t; n += s + 3) o.push(Uo(n, c, s, i, a, " rx=\"1\" opacity=\"0.75\""));
			}
		} else if (i === "mosaic") {
			let r = (t - 10) / 4, i = n / 3.4, s = 0, c = 0;
			for (let t of jo(e.count, e.seed || 1)) {
				s + t.cols > 4 && (s = 0, c += 1);
				let e = 2 + c * (i + 2);
				if (e > n) break;
				o.push(Uo(2 + s * (r + 2), e, r * t.cols + 2 * (t.cols - 1), i * t.rows + 2 * (t.rows - 1), a, " rx=\"1\" opacity=\"0.75\"")), s += t.cols, s >= 4 && (s = 0, c += 1);
			}
		}
	}
	let s = t * .06, c = t - s * 2;
	for (let e of r) {
		let r = e.frames?.desktop;
		if (!r) continue;
		let i = Ho(s + (r.x ?? 0) * (c / 100), 0, t - 2), l = Ho((r.y ?? 0) * a, 0, n - 2), u = Ho((r.w ?? 10) * (c / 100), 2, t - i), d = Ho((r.h ?? 20) * a, 2, n - l);
		o.push(Xo(e.type, i, l, u, d, e.props));
	}
	return o.join("");
}
function Qo(e, { w: t = 96, h: n = 116, max: r = 6 } = {}) {
	let i = (Array.isArray(e?.sections) ? e.sections : []).slice(0, r);
	if (!i.length) return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${Uo(0, 0, t, n, Ro("bg", Po))}</svg>`;
	let a = i.map((e) => Ho(Bo(e?.size?.minHeight), 160, 900)), o = a.reduce((e, t) => e + t, 0), s = n - 1 * (i.length - 1), c = [], l = 0;
	for (let e = 0; e < i.length; e += 1) {
		let n = Math.max(6, a[e] / o * s);
		c.push(`<g transform="translate(0 ${Vo(l)})">${Zo(i[e], t, n)}</g>`), l += n + 1;
	}
	return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${c.join("")}</svg>`;
}
//#endregion
//#region ../template/assets/engine/0.7.4/blocks/form.js
var $o = () => [
	{
		id: "navn",
		label: K("form.fieldName"),
		type: "text",
		required: !0
	},
	{
		id: "epost",
		label: K("form.fieldEmail"),
		type: "email",
		required: !0
	},
	{
		id: "melding",
		label: K("form.fieldMessage"),
		type: "textarea",
		required: !0
	}
];
//#endregion
//#region ../template/assets/engine/0.7.4/sections/presets.js
function es(e) {
	return typeof crypto < "u" && crypto.randomUUID ? `${e}-${crypto.randomUUID().slice(0, 8)}` : `${e}-${[...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4))].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
var ts = () => ({ mobile: {
	mode: "auto",
	attention: null
} }), Y = (e, t, n, r, i = 1) => ({
	desktop: {
		x: e,
		y: t,
		w: n,
		h: r,
		z: i,
		rot: 0
	},
	mobile: null
}), ns = (e, t, n = {}) => ({
	id: es("blk"),
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
}), rs = (e, t = {}) => ({
	id: es("blk"),
	type: "image",
	version: 1,
	props: {
		src: "",
		alt: K("seed.imageAlt"),
		fit: "cover",
		radius: "md",
		href: null,
		...t
	},
	animation: null,
	frames: e
}), is = (e, t, n = {}) => ({
	id: es("blk"),
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
}), as = (e, t, n = 40) => ({
	id: es("blk"),
	type: "icon",
	version: 1,
	props: {
		glyph: t,
		color: "accent",
		size: n
	},
	animation: null,
	frames: e
}), os = (e, t = {}) => ({
	id: es("blk"),
	type: "map",
	version: 2,
	props: {
		location: "",
		zoom: 15,
		...t
	},
	animation: null,
	frames: e
}), ss = (e, t = {}) => ({
	id: es("blk"),
	type: "form",
	version: 1,
	props: {
		recipient: "",
		subject: "",
		mode: "mailto",
		endpoint: "",
		submitLabel: K("form.sendDefault"),
		successText: K("form.thanksDefault"),
		fields: $o(),
		...t
	},
	animation: null,
	frames: e
}), cs = (e, t = {}) => ({
	id: es("blk"),
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
}), ls = () => ({
	type: "hover-lift",
	version: 1,
	props: {}
}), us = (e, t, n = {}) => ({
	id: es("blk"),
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
}), ds = (e, t = {}) => ({
	id: es("blk"),
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
}), fs = (e, t = {}) => ({
	id: es("blk"),
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
}), ps = (e, t = {}) => ({
	id: es("blk"),
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
}), ms = (e, t = {}) => ({
	id: es("blk"),
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
}), hs = (e, t) => ({
	id: es("blk"),
	type: "faq",
	version: 1,
	props: {
		items: t,
		multi: !1
	},
	animation: null,
	frames: e
}), gs = (e, t = {}) => ({
	id: es("blk"),
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
}), _s = (e, t) => ({
	id: es("blk"),
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
}), vs = (e, t = {}) => ({
	id: es("blk"),
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
}), ys = (...e) => ({
	version: 1,
	layers: e
}), bs = (e) => ({
	type: "color",
	version: 1,
	props: { value: e }
}), xs = (e, t, n, r = .5) => ({
	type: "glow",
	version: 1,
	props: {
		x: e,
		y: t,
		color: "accent",
		radius: r,
		opacity: n
	}
}), Ss = (e) => Math.max(0, ...e.blocks.map((e) => e.frames.desktop.y + e.frames.desktop.h)), Cs = (e, t, n, r, i, a) => ({
	x: n + e % t * r,
	y: i + Math.floor(e / t) * a
}), ws = (e, t, n, r, i, a, o, s, c = 0) => {
	let l = (t) => e.blocks.some((e) => {
		let n = e.frames.desktop;
		return n.x < t.x + t.w - .01 && t.x < n.x + n.w - .01 && n.y < t.y + t.h - .01 && t.y < n.y + n.h - .01;
	});
	for (let e = 0; e < 60; e++) {
		let u = Cs(e, t, n, r, i, a);
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
		y: Ss(e) + 16,
		n: 0
	};
}, Ts = (e, t, n) => e + t * .1 + n * .01, Es = (e, t, n, r, i = null) => ({
	id: es("sec"),
	version: 1,
	preset: e,
	size: { minHeight: t },
	grid: i,
	background: n,
	blocks: r,
	responsive: ts()
});
function Ds(e) {
	e.sections.define("blank", {
		label: "Empty section",
		labelKey: "preset.blank.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "A blank canvas to build on freely",
		hintKey: "preset.blank.hint",
		create: () => Es("blank", "40vh", ys(bs("bg")), [])
	}), e.sections.define("hero", {
		label: "Hero",
		labelKey: "preset.hero.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Large opening with gradient and glow, left-aligned",
		hintKey: "preset.hero.hint",
		create: () => Es("hero", "70vh", {
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
				xs(.7, .2, .35),
				{
					type: "grain",
					version: 1,
					props: { opacity: .06 }
				}
			]
		}, [
			ns(Y(8.33, 40, 50, 38), K("seed.hero.title")),
			ns(Y(8.33, 84, 41.67, 26), K("seed.hero.intro")),
			is(Y(8.33, 118, 20, 32), K("seed.readMore"))
		])
	}), e.sections.define("hero-centered", {
		label: "Hero, centred",
		labelKey: "preset.hero-centered.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Centred opening with two buttons",
		hintKey: "preset.hero-centered.hint",
		create: () => Es("hero-centered", "60vh", ys(bs("bg")), [
			ns(Y(15, 64, 70, 44), K("seed.heroCenter.title"), { align: "center" }),
			ns(Y(25, 116, 50, 26), K("seed.heroCenter.intro"), { align: "center" }),
			is(Y(31.5, 160, 17, 40), K("seed.join")),
			is(Y(51.5, 160, 17, 40), K("seed.readMore"), { style: "secondary" })
		])
	}), e.sections.define("hero-image", {
		label: "Hero over a photo",
		labelKey: "preset.hero-image.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Opening over a photo that creeps slowly, with a veil under the text",
		hintKey: "preset.hero-image.hint",
		create: () => {
			let e = Es("hero-image", "70vh", {
				version: 1,
				layers: [
					bs("bg"),
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
				ns(Y(8.33, 40, 50, 38), K("seed.hero.title")),
				ns(Y(8.33, 84, 41.67, 26), K("seed.hero.intro")),
				is(Y(8.33, 118, 20, 32), K("seed.readMore"))
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
			let e = Es("hero-photos", "70vh", {
				version: 1,
				layers: [
					bs("bg"),
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
				ns(Y(15, 64, 70, 44), K("seed.heroCenter.title"), { align: "center" }),
				ns(Y(25, 116, 50, 26), K("seed.heroCenter.intro"), { align: "center" }),
				is(Y(41.5, 160, 17, 40), K("seed.readMore"))
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
		create: () => Es("images", "360px", ys(bs("bg")), [
			ns(Y(4, 24, 50, 32), K("seed.images.title")),
			rs(Y(4, 72, 28, 220)),
			rs(Y(36, 72, 28, 220)),
			rs(Y(68, 72, 28, 220))
		]),
		itemLabel: "image",
		itemLabelKey: "item.image",
		item: (e) => {
			let { x: t, y: n } = ws(e, 3, 4, 32, 72, 244, 28, 220);
			return {
				blocks: [rs(Y(t, n, 28, 220))],
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
		create: () => Es("gallery", "440px", ys(bs("bg")), [ns(Y(4, 24, 50, 32), K("seed.gallery.title")), ms(Y(4, 72, 92, 320))])
	}), e.sections.define("find-us", {
		label: "Find us",
		labelKey: "preset.find-us.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Map with your address (privacy-friendly OpenStreetMap)",
		hintKey: "preset.find-us.hint",
		create: () => Es("find-us", "480px", ys(bs("bg")), [ns(Y(6, 40, 60, 70), K("seed.findUs.title")), os(Y(6, 120, 88, 360, 2))])
	}), e.sections.define("whats-on", {
		label: "What is on",
		labelKey: "preset.whats-on.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Event list from a subscribable calendar (iCal/Google)",
		hintKey: "preset.whats-on.hint",
		create: () => Es("whats-on", "520px", ys(bs("bg")), [ns(Y(6, 40, 60, 70), K("seed.whatsOn.title")), cs(Y(6, 130, 88, 320, 2), { limit: 5 })])
	});
	let t = (t, n, r) => e.sections.define(t, {
		label: `What is on: ${t.slice(9)}`,
		labelKey: `preset.${t}.label`,
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Events from a subscribable calendar (iCal/Google)",
		hintKey: `preset.${t}.hint`,
		create: () => Es(t, n, ys(bs("bg")), [ns(Y(6, 40, 60, 70), K("seed.whatsOn.title")), r()])
	});
	t("whats-on-cards", "560px", () => cs(Y(6, 130, 88, 360, 2), {
		view: "cards",
		limit: 6
	})), t("whats-on-month", "720px", () => cs(Y(6, 130, 88, 520, 2), { view: "month" })), t("whats-on-week", "560px", () => cs(Y(6, 130, 88, 360, 2), {
		view: "week",
		design: "weekStrip"
	})), t("whats-on-next", "460px", () => cs(Y(6, 130, 48, 260, 2), {
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
		create: () => Es("contact-form", "520px", ys(bs("bg")), [ns(Y(6, 40, 60, 120), K("seed.contactForm.intro")), ss(Y(6, 180, 60, 380, 2))])
	}), e.sections.define("contact", {
		label: "Contact",
		labelKey: "preset.contact.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Contact details in a card with an email button",
		hintKey: "preset.contact.hint",
		create: () => Es("contact", "320px", ys(bs("surface"), xs(.2, .8, .2)), [
			ns(Y(10, 32, 40, 36), K("seed.contact.title")),
			ns(Y(10, 84, 36, 130), K("seed.contact.info"), { box: !0 }),
			is(Y(60, 100, 22, 40), K("seed.contact.button"), { href: `mailto:${K("seed.email")}` })
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
				let i = as(Y(e + 10.5, 88, 4, 52), n), a = ns(Y(e, 152, 25, 200), K("seed.features.card", { title: r }), {
					align: "center",
					box: !0
				});
				return a.animation = ls(), i.mobileOrder = Ts(88, t, 0), a.mobileOrder = Ts(88, t, 1), [i, a];
			};
			return Es("feature-cards", "420px", ys(bs("bg")), [
				ns(Y(6, 28, 60, 38), K("seed.features.title")),
				...e(6, 0, "✦", K("seed.features.card1")),
				...e(37.5, 1, "★", K("seed.features.card2")),
				...e(69, 2, "✓", K("seed.features.card3"))
			]);
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = ws(e, 3, 6, 31.5, 152, 296, 25, 264, -64), i = as(Y(t + 10.5, n - 64, 4, 52), "✦"), a = ns(Y(t, n, 25, 200), K("seed.features.card", { title: K("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return a.animation = ls(), i.mobileOrder = Ts(88, r, 0), a.mobileOrder = Ts(88, r, 1), {
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
				let r = ns(Y(e, 88, 25, 200), K("seed.features.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.animation = ls(), r.mobileOrder = Ts(88, t, 0), r;
			};
			return Es("feature-cards-simple", "360px", ys(bs("bg")), [
				ns(Y(6, 28, 60, 38), K("seed.features.title")),
				e(6, 0, K("seed.features.card1")),
				e(37.5, 1, K("seed.features.card2")),
				e(69, 2, K("seed.features.card3"))
			]);
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = ws(e, 3, 6, 31.5, 88, 232, 25, 200), i = ns(Y(t, n, 25, 200), K("seed.features.card", { title: K("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.animation = ls(), i.mobileOrder = Ts(88, r, 0), {
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
				let n = rs(Y(e, 88, 25, 160)), r = ns(Y(e, 256, 25, 160), K("seed.news.card"));
				return n.mobileOrder = Ts(88, t, 0), r.mobileOrder = Ts(88, t, 1), [n, r];
			};
			return Es("news", "460px", ys(bs("bg")), [
				ns(Y(6, 28, 50, 38), K("seed.news.title")),
				is(Y(78, 30, 16, 36), K("seed.news.seeAll"), { style: "secondary" }),
				...e(6, 0),
				...e(37.5, 1),
				...e(69, 2)
			]);
		},
		itemLabel: "story",
		itemLabelKey: "item.story",
		item: (e) => {
			let { x: t, y: n, n: r } = ws(e, 3, 6, 31.5, 88, 344, 25, 328), i = rs(Y(t, n, 25, 160)), a = ns(Y(t, n + 168, 25, 160), K("seed.news.card"));
			return i.mobileOrder = Ts(88, r, 0), a.mobileOrder = Ts(88, r, 1), {
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
		create: () => Es("news-collection", "300px", ys(bs("bg")), [ns(Y(6, 28, 50, 38), K("seed.news.title")), us(Y(6, 88, 88, 180), "cards")])
	}), e.sections.define("noticeboard", {
		label: "Noticeboard",
		labelKey: "preset.noticeboard.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Dated list from a collection (notices/announcements)",
		hintKey: "preset.noticeboard.hint",
		create: () => Es("noticeboard", "300px", ys(bs("surface")), [ns(Y(6, 28, 50, 38), K("seed.noticeboard.title")), us(Y(6, 88, 88, 180), "list", { limit: 8 })])
	}), e.sections.define("publication-archive", {
		label: "Publication archive",
		labelKey: "preset.publication-archive.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Year-grouped archive from a collection (issues, minutes, reports)",
		hintKey: "preset.publication-archive.hint",
		create: () => Es("publication-archive", "300px", ys(bs("bg")), [ns(Y(6, 28, 60, 38), K("seed.archive.title")), us(Y(6, 88, 88, 180), "archive", { limit: 0 })])
	}), e.sections.define("events", {
		label: "Events",
		labelKey: "preset.events.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Three rows with date badge and sign-up button",
		hintKey: "preset.events.hint",
		create: () => {
			let e = (e, t, n, r) => [
				ns(Y(6, e, 8, 88), K("seed.events.dateBadge", {
					day: t,
					month: n
				}), {
					align: "center",
					box: !0
				}),
				ns(Y(16, e, 58, 88), K("seed.events.row", { title: r })),
				is(Y(78, e + 24, 16, 40), K("seed.events.signup"), { style: "secondary" })
			];
			return Es("events", "440px", ys(bs("surface")), [
				ns(Y(6, 28, 50, 38), K("seed.events.title")),
				...e(88, "11", K("seed.events.monthAug"), K("seed.events.row1")),
				...e(196, "25", K("seed.events.monthAug"), K("seed.events.row2")),
				...e(304, "8", K("seed.events.monthSep"), K("seed.events.row3"))
			]);
		},
		itemLabel: "row",
		itemLabelKey: "item.row",
		item: (e) => {
			let t = Ss(e) + 16;
			return {
				blocks: [
					ns(Y(6, t, 8, 88), K("seed.events.newBadge"), {
						align: "center",
						box: !0
					}),
					ns(Y(16, t, 58, 88), K("seed.events.row", { title: K("seed.events.newTitle") })),
					is(Y(78, t + 24, 16, 40), K("seed.events.signup"), { style: "secondary" })
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
				let r = rs(Y(e, 80, 22, 180), { alt: K("seed.team.alt") }), i = ns(Y(e, 268, 22, 84), K("seed.team.member", { role: n }), { align: "center" });
				return r.mobileOrder = Ts(80, t, 0), i.mobileOrder = Ts(80, t, 1), [r, i];
			};
			return Es("team", "420px", ys(bs("surface")), [
				ns(Y(6, 24, 50, 32), K("seed.team.title")),
				...e(7.5, 0, K("seed.team.role1")),
				...e(39, 1, K("seed.team.role2")),
				...e(70.5, 2, K("seed.team.role3"))
			]);
		},
		itemLabel: "person",
		itemLabelKey: "item.person",
		item: (e) => {
			let { x: t, y: n, n: r } = ws(e, 3, 7.5, 31.5, 80, 288, 22, 272), i = rs(Y(t, n, 22, 180), { alt: K("seed.team.alt") }), a = ns(Y(t, n + 188, 22, 84), K("seed.team.member", { role: K("seed.team.roleNew") }), { align: "center" });
			return i.mobileOrder = Ts(80, r, 0), a.mobileOrder = Ts(80, r, 1), {
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
		create: () => Es("faq", "520px", ys(bs("bg")), [
			ns(Y(25, 24, 50, 36), K("seed.faq.title"), { align: "center" }),
			hs(Y(20, 80, 60, 320), [
				{
					q: K("seed.faq.q1"),
					a: K("seed.faq.answer")
				},
				{
					q: K("seed.faq.q2"),
					a: K("seed.faq.answer")
				},
				{
					q: K("seed.faq.q3"),
					a: K("seed.faq.answer")
				}
			]),
			ns(Y(20, 416, 60, 32), K("seed.faq.more"), { align: "center" })
		])
	}), e.sections.define("timeline", {
		label: "Timeline",
		labelKey: "preset.timeline.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Your story as events along a line",
		hintKey: "preset.timeline.hint",
		create: () => Es("timeline", "480px", ys(bs("bg")), [ns(Y(25, 24, 50, 36), K("seed.timeline.title"), { align: "center" }), _s(Y(25, 88, 50, 330), [
			{
				year: "2019",
				title: K("seed.timeline.t1"),
				text: K("seed.timeline.text")
			},
			{
				year: "2022",
				title: K("seed.timeline.t2"),
				text: K("seed.timeline.text")
			},
			{
				year: "2026",
				title: K("seed.timeline.t3"),
				text: K("seed.timeline.text")
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
				let r = ns(Y(e, 88, 25, 72), `<h3>${t + 1}</h3>`, {
					align: "center",
					size: 44
				}), i = ns(Y(e, 168, 25, 160), K("seed.steps.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.mobileOrder = Ts(88, t, 0), i.mobileOrder = Ts(88, t, 1), [r, i];
			};
			return Es("steps", "400px", ys(bs("bg")), [
				ns(Y(6, 28, 60, 38), K("seed.steps.title")),
				...e(6, 0, K("seed.steps.s1")),
				...e(37.5, 1, K("seed.steps.s2")),
				...e(69, 2, K("seed.steps.s3"))
			]);
		},
		itemLabel: "step",
		itemLabelKey: "item.step",
		item: (e) => {
			let { x: t, y: n, n: r } = ws(e, 3, 6, 31.5, 88, 272, 25, 240), i = ns(Y(t, n, 25, 72), `<h3>${r + 1}</h3>`, {
				align: "center",
				size: 44
			}), a = ns(Y(t, n + 80, 25, 160), K("seed.steps.card", { title: K("seed.steps.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.mobileOrder = Ts(88, r, 0), a.mobileOrder = Ts(88, r, 1), {
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
				rs(Y(6, 40, 55, 300)),
				ns(Y(6, 348, 55, 108), K("seed.feature.main")),
				is(Y(6, 464, 14, 38), K("seed.readMore"), { style: "secondary" }),
				rs(Y(66, 40, 28, 120)),
				ns(Y(66, 164, 28, 60), K("seed.feature.small1")),
				rs(Y(66, 244, 28, 120)),
				ns(Y(66, 368, 28, 60), K("seed.feature.small2"))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = Ts(40, t < 3 ? 0 : 1, t);
			}), Es("lead-story", "540px", ys(bs("bg")), e);
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
					rs(Y(e, 88, 25, 200)),
					ns(Y(e, 296, 25, 76), K("seed.products.card", {
						name: n,
						price: r
					}), { align: "center" }),
					is(Y(e + 5, 380, 15, 40), K("seed.products.buy"))
				];
				return i.forEach((e, n) => {
					e.mobileOrder = Ts(88, t, n);
				}), i;
			};
			return Es("products", "470px", ys(bs("bg")), [
				ns(Y(6, 28, 50, 38), K("seed.products.title")),
				...e(6, 0, K("seed.products.name"), K("seed.products.price1")),
				...e(37.5, 1, K("seed.products.name"), K("seed.products.price2")),
				...e(69, 2, K("seed.products.name"), K("seed.products.price3"))
			]);
		},
		itemLabel: "product",
		itemLabelKey: "item.product",
		item: (e) => {
			let { x: t, y: n, n: r } = ws(e, 3, 6, 31.5, 88, 348, 25, 332), i = [
				rs(Y(t, n, 25, 200)),
				ns(Y(t, n + 208, 25, 76), K("seed.products.card", {
					name: K("seed.products.name"),
					price: K("seed.products.price1")
				}), { align: "center" }),
				is(Y(t + 5, n + 292, 15, 40), K("seed.products.buy"))
			];
			return i.forEach((e, t) => {
				e.mobileOrder = Ts(88, r, t);
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
		create: () => Es("shop", "544px", ys(bs("bg")), [
			ns(Y(6, 28, 50, 38), K("seed.shop.title")),
			fs(Y(78, 88, 16, 48)),
			ds(Y(6, 176, 88, 320))
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
				ns(Y(6, 48, 52, 96), K("seed.shopHero.title")),
				ns(Y(6, 152, 40, 48), K("seed.shopHero.sub")),
				is(Y(6, 216, 17, 42), K("seed.shopHero.cta")),
				rs(Y(62, 40, 32, 300))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = Ts(48, t < 3 ? 0 : 1, t);
			}), Es("shop-hero", "400px", {
				version: 1,
				layers: [
					bs("bg"),
					xs(.8, .25, .28, .6),
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
				let r = rs(Y(e, 88, 21, 170)), i = ns(Y(e, 266, 21, 34), K("seed.shopCategories.tile", { name: n }), { align: "center" });
				return r.mobileOrder = Ts(88, t, 0), i.mobileOrder = Ts(88, t, 1), [r, i];
			}, t = Es("shop-categories", "360px", ys(bs("bg")), [
				ns(Y(6, 28, 60, 38), K("seed.shopCategories.title")),
				...e(6, 0, K("seed.shopCategories.cat1")),
				...e(29.5, 1, K("seed.shopCategories.cat2")),
				...e(53, 2, K("seed.shopCategories.cat3")),
				...e(76.5, 3, K("seed.shopCategories.cat4"))
			]);
			return t.theme = "soft", t;
		},
		itemLabel: "category",
		itemLabelKey: "item.category",
		item: (e) => {
			let { x: t, y: n, n: r } = ws(e, 4, 6, 23.5, 88, 220, 21, 212), i = rs(Y(t, n, 21, 170)), a = ns(Y(t, n + 178, 21, 34), K("seed.shopCategories.tile", { name: K("seed.shopCategories.newCat") }), { align: "center" });
			return i.mobileOrder = Ts(88, r, 0), a.mobileOrder = Ts(88, r, 1), {
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
				let i = as(Y(e + 10.5, 88, 4, 52), r, 44), a = ns(Y(e, 148, 25, 96), K(n), { align: "center" });
				return i.mobileOrder = Ts(88, t, 0), a.mobileOrder = Ts(88, t, 1), [i, a];
			}, t = Es("shop-trust", "300px", ys(bs("bg")), [
				ns(Y(6, 28, 60, 38), K("seed.shopTrust.title")),
				...e(6, 0, "seed.shopTrust.t1", "✓"),
				...e(37.5, 1, "seed.shopTrust.t2", "↻"),
				...e(69, 2, "seed.shopTrust.t3", "✉")
			]);
			return t.theme = "muted", t;
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = ws(e, 3, 6, 31.5, 148, 216, 25, 156, -60), i = as(Y(t + 10.5, n - 60, 4, 52), "✓", 44), a = ns(Y(t, n, 25, 96), K("seed.shopTrust.newItem"), { align: "center" });
			return i.mobileOrder = Ts(88, r, 0), a.mobileOrder = Ts(88, r, 1), {
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
				ns(Y(6, 56, 52, 100), K("seed.shopShowcase.title")),
				ns(Y(6, 164, 42, 56), K("seed.shopShowcase.text")),
				is(Y(6, 236, 18, 42), K("seed.shopShowcase.cta")),
				rs(Y(62, 48, 32, 240))
			];
			e.forEach((e, t) => {
				e.mobileOrder = Ts(56, t < 3 ? 0 : 1, t);
			});
			let t = Es("shop-showcase", "340px", ys(bs("bg")), e);
			return t.theme = "deep", t;
		}
	}), e.sections.define("checkout", {
		label: "Checkout",
		labelKey: "preset.checkout.label",
		group: "Shop",
		groupKey: "presetGroup.shop",
		hint: "Order form that sends the basket as an email or to an endpoint",
		hintKey: "preset.checkout.hint",
		create: () => Es("checkout", "560px", ys(bs("bg")), [ns(Y(6, 28, 50, 38), K("seed.checkout.title")), ps(Y(25, 96, 50, 430))])
	}), e.sections.define("cta", {
		label: "CTA banner",
		labelKey: "preset.cta.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Full width with one clear action",
		hintKey: "preset.cta.hint",
		create: () => Es("cta", "280px", ys(bs("surface"), xs(.5, .5, .3, .7)), [
			ns(Y(20, 56, 60, 40), K("seed.cta.title"), { align: "center" }),
			ns(Y(25, 104, 50, 26), K("seed.cta.sub"), { align: "center" }),
			is(Y(42, 148, 16, 42), K("seed.join"))
		])
	}), e.sections.define("quote", {
		label: "Quote",
		labelKey: "preset.quote.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Large quote with attribution",
		hintKey: "preset.quote.hint",
		create: () => Es("quote", "300px", ys(bs("bg")), [gs(Y(20, 56, 60, 190), {
			text: K("seed.quoteBlock.text"),
			attribution: K("seed.quoteBlock.name"),
			role: K("seed.quoteBlock.role")
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
				let a = vs(Y(e, 76, 25, 120), {
					value: n,
					suffix: r,
					label: i
				});
				return a.mobileOrder = Ts(76, t, 0), a;
			};
			return Es("stats", "260px", ys(bs("surface")), [
				e(6, 0, "120", "+", K("seed.stats.l1")),
				e(37.5, 1, "25", "", K("seed.stats.l2")),
				e(69, 2, "1981", "", K("seed.stats.l3"))
			]);
		},
		itemLabel: "number",
		itemLabelKey: "item.number",
		item: (e) => {
			let { x: t, y: n, n: r } = ws(e, 3, 6, 31.5, 76, 140, 25, 120), i = vs(Y(t, n, 25, 120), {
				value: "42",
				label: K("seed.stats.newLabel")
			});
			return i.mobileOrder = Ts(76, r, 0), {
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
			let e = (e) => rs(Y(e, 108, 18.5, 100), {
				alt: K("seed.sponsors.alt"),
				fit: "contain",
				radius: null,
				saturate: 0
			});
			return Es("sponsors", "280px", ys(bs("bg")), [
				ns(Y(6, 28, 60, 36), K("seed.sponsors.title")),
				e(5.5),
				e(29),
				e(52.5),
				e(76)
			]);
		},
		itemLabel: "logo",
		itemLabelKey: "item.logo",
		item: (e) => {
			let { x: t, y: n } = ws(e, 4, 5.5, 23.5, 108, 124, 18.5, 100);
			return {
				blocks: [rs(Y(t, n, 18.5, 100), {
					alt: K("seed.sponsors.alt"),
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
		create: () => Es("membership", "500px", ys(bs("surface")), [
			ns(Y(6, 28, 50, 38), K("seed.membership.title")),
			ns(Y(14, 88, 32, 250), K("seed.membership.tier1"), {
				align: "center",
				box: !0
			}),
			ns(Y(54, 88, 32, 250), K("seed.membership.tier2"), {
				align: "center",
				box: !0
			}),
			is(Y(42, 358, 16, 42), K("seed.join")),
			ns(Y(25, 414, 50, 30), K("seed.membership.vipps"), { align: "center" })
		])
	});
}
//#endregion
//#region ../template/assets/engine/0.7.4/theme.js
function Os(e, t, n) {
	return t === "light" || t === "dark" ? t : n ? "dark" : "light";
}
function ks(e, t) {
	let n = e.tokens || {}, r = e.scheme === "dark" ? "dark" : "light";
	if (!e.alt?.tokens || t === r) return n;
	let i = {};
	for (let t of /* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(e.alt.tokens)])) i[t] = {
		...n[t],
		...e.alt.tokens[t]
	};
	return i;
}
var As = /^[a-zA-Z0-9#%.,()'"\s+\-*/]+$/;
function js(e) {
	return typeof e == "string" && As.test(e) && !/url\(|\/\*|\*\/|expression/i.test(e);
}
function Ms(e) {
	let t = e.tokens || {}, n = ks(e, "light"), r = ks(e, "dark"), i = e.scheme === "dark" ? "dark" : "light", a = [], o = [], s = [], c = /* @__PURE__ */ new Set([
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
			js(c) && (a.push(`  --urd-${e}-${l}: ${c};`), i && a.push(`  --urd-base-${l}: ${c};`)), u !== d && (i && js(u) && js(d) ? o.push({
				name: l,
				lv: u,
				dv: d
			}) : !i && js(u) && js(d) && s.push({
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
	].some((e) => js(e.color?.["accent-text"])) && js(t.color?.accent);
	u && js(t.color?.bg) && (a.push(`  --urd-color-accent-text: ${t.color.bg};`), a.push(`  --urd-base-accent-text: ${t.color.bg};`));
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
function Ns(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
var Ps = {
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
}, Fs = {
	surface: "sectionTheme.surface",
	accent: "sectionTheme.accent",
	inverse: "sectionTheme.inverse",
	soft: "sectionTheme.soft",
	muted: "sectionTheme.muted",
	deep: "sectionTheme.deep",
	highlighted: "sectionTheme.highlighted"
};
[...new Set(Object.values(Ps).flatMap(Object.keys))];
function Is(e) {
	return Ps[e] ?? {};
}
function Ls(e) {
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
function Rs(e, t) {
	let n = Ls(e), r = Ls(t);
	return n == null || r == null ? null : (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
//#endregion
//#region ../template/assets/engine/0.7.4/nav-model.js
var zs = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/api\/photo\?[^\s"'<>\\]{1,2048}|\/(?!\/)[\w%./-]*)$/;
function Bs(e) {
	return typeof e == "string" && zs.test(e);
}
var Vs = /^(?:https?:\/\/|mailto:|tel:)[^\s]+$/i;
function Hs(e) {
	return typeof e == "string" && Vs.test(e.trim());
}
var Us = /^(?:\/(?![/\\])[^\s\\]*|#[^\s]*)$/;
function Ws(e) {
	return Hs(e) || typeof e == "string" && Us.test(e.trim());
}
var Gs = [
	"launcher",
	"cart",
	"theme",
	"links"
];
function Ks(e = {}) {
	let t = Array.isArray(e.tools?.order) ? e.tools.order : [], n = [];
	for (let e of t) Gs.includes(e) && !n.includes(e) && n.push(e);
	for (let e of Gs) n.includes(e) || n.push(e);
	return n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/icons.js
var qs = "fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"", Js = "fill=\"currentColor\" stroke=\"none\"", Ys = {
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
}, Xs = [
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
function Zs(e) {
	let t = typeof e == "string" ? Ys[e] : null;
	return t ? `<svg viewBox="0 0 24 24" width="100%" height="100%" ${t.fill ? Js : qs} aria-hidden="true" focusable="false">${t.body}</svg>` : null;
}
//#endregion
//#region ../template/assets/engine/0.7.4/links-model.js
function Qs(e) {
	let t = Array.isArray(e?.footer?.social) ? e.footer.social : null;
	if (!t) return e;
	let n = structuredClone(e);
	n.site ??= {};
	let r = Array.isArray(n.site.links) ? n.site.links : [], i = t.filter((e) => e && typeof e.icon == "string" && e.icon.trim()).map((e, t) => ({
		id: `link-${r.length + t + 1}`,
		icon: e.icon.trim(),
		label: Ys[e.icon.trim()]?.label ?? e.icon.trim(),
		url: typeof e.url == "string" ? e.url.trim() : ""
	}));
	return n.site.links = [...r, ...i], delete n.footer.social, n;
}
var $s = /* @__PURE__ */ new Set([
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
function ec(e) {
	return $s.has(e?.type) && e.height?.mode !== "own";
}
var tc = /* @__PURE__ */ new Set([
	"calendar",
	"collection",
	"product"
]), nc = /* @__PURE__ */ new Set([
	"countdown",
	"quote",
	"stats"
]), rc = /* @__PURE__ */ new Set([
	"image",
	"video",
	"shape",
	"icon"
]), ic = /* @__PURE__ */ new Set([
	"image",
	"video",
	"shape",
	"icon",
	"map"
]), ac = {
	min: .4,
	max: 2
}, oc = {
	min: 6,
	max: 200,
	minDefault: 12,
	maxDefault: 96
};
function sc(e) {
	if (!e || ic.has(e.type)) return 1;
	let t = Number(e.size);
	return !Number.isFinite(t) || t <= 0 ? 1 : Math.round(Math.min(ac.max, Math.max(ac.min, t)) * 100) / 100;
}
function cc(e) {
	let t = (e, t) => {
		let n = Number(e);
		return Number.isFinite(n) && n > 0 ? Math.min(oc.max, Math.max(oc.min, Math.round(n))) : t;
	}, n = t(e?.sizeMin, oc.minDefault);
	return {
		min: n,
		max: Math.max(n, t(e?.sizeMax, oc.maxDefault))
	};
}
function lc(e, t = {}) {
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
function uc(e, t, n) {
	return dc(e, /* @__PURE__ */ new Map([[t, n]]));
}
function dc(e, t) {
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
	let { shifts: i } = lc(n);
	for (let e of n) {
		let t = i.get(e.id) ?? 0;
		t && r.set(e.id, e.y + t);
	}
	return r;
}
var fc = 24, pc = {
	"oppsett-byttet": "layout-changed",
	"blokk-endret": "block-edited",
	"desktop-endret-etter-mobil": "desktop-changed-after-mobile",
	seksjonshøyde: "section-height",
	"blokk-flyttet": "block-moved",
	"blokk-slettet": "block-deleted",
	"blokk-lagt-til": "block-added"
};
function mc(e, t) {
	if (!e || !("y" in e || "h" in e)) return e ?? null;
	if (t && e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h) return null;
	let n = {
		x: e.x,
		w: e.w
	};
	return Number.isFinite(e.y) && (n.row = Math.max(1, Math.round((e.y - fc) / 8) + 1), n.rows = Number.isFinite(e.h) ? Math.max(1, Math.ceil(e.h / 8)) : 1), Number.isFinite(e.z) && e.z !== 1 && (n.z = e.z), e.rot && (n.rot = e.rot), n;
}
var hc = {
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
}, gc = { bildegalleri: "slideshow" }, _c = {
	flate: "surface",
	aksent: "accent",
	invers: "inverse",
	dus: "soft",
	dempet: "muted",
	dyp: "deep",
	uthevet: "highlighted"
}, vc = {
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
function yc(e) {
	let t = Array.isArray(e) ? e : e.blocks ?? [];
	for (let e of t) hc[e.type] && (e.type = hc[e.type]);
	if (!Array.isArray(e)) {
		for (let t of e.background?.layers ?? []) gc[t.type] && (t.type = gc[t.type]);
		_c[e.theme] && (e.theme = _c[e.theme]), vc[e.preset] && (e.preset = vc[e.preset]);
	}
	return e;
}
var bc = 26;
function xc(e) {
	for (let t of e?.blocks ?? []) {
		if (t.type !== "calendar" || !t.props || !("scale" in t.props)) continue;
		let e = sc({
			type: "calendar",
			size: t.props.scale
		});
		delete t.props.scale, e !== 1 && (t.size = e);
	}
}
function Sc(e) {
	for (let t of e?.blocks ?? []) {
		if (t.type !== "map" && t.type !== "kart" || !Number.isFinite(t.props?.height)) continue;
		let n = t.frames?.desktop;
		if (n && Number.isFinite(n.h)) {
			let r = Math.max(n.h, Math.round(t.props.height + bc)), i = uc(e.blocks, t.id, r);
			n.h = r;
			for (let t of e.blocks) {
				let e = i.get(t.id);
				Number.isFinite(e) && t.frames?.desktop && (t.frames.desktop.y = e);
			}
		}
		delete t.props.height;
	}
}
function Cc(e, t = !1) {
	for (let n of e?.blocks ?? []) {
		if (n.type !== "gallery" || !n.props) continue;
		let r = n.frames?.desktop;
		if ((t || "bandHeight" in n.props) && n.props.view === "ribbon" && r && Number.isFinite(r.h)) {
			let t = Math.min(400, Math.max(80, Number(n.props.bandHeight) || 160)), i = Number(n.props.rows) === 2 ? 2 : 1, a = Number(n.props.gap) || 0, o = Math.round((i * t + (i - 1) * a) * sc(n)), s = uc(e.blocks, n.id, o);
			r.h = o;
			for (let t of e.blocks) {
				let e = s.get(t.id);
				Number.isFinite(e) && t.frames?.desktop && (t.frames.desktop.y = e);
			}
		}
		delete n.props.bandHeight;
	}
}
var wc = {
	1: (e) => {
		for (let t of e.sections ?? []) {
			let e = t.responsive?.mobile;
			for (let e of t.blocks ?? []) e.decor && (e.hideMobile = !0), e.frames?.mobile && (e.frames.mobile = mc(e.frames.mobile, e.frames.desktop));
			e?.mode === "manual" && (e.mode = "auto");
			let n = e?.attention?.reason;
			n && pc[n] && (e.attention.reason = pc[n]);
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) yc(t);
		return e;
	},
	3: (e) => {
		for (let t of e.sections ?? []) yc(t);
		return e;
	},
	4: (e) => {
		for (let t of e.sections ?? []) Sc(t);
		return e;
	},
	5: (e) => {
		for (let t of e.sections ?? []) xc(t);
		return e;
	},
	6: (e) => {
		for (let t of e.sections ?? []) Cc(t, !0);
		return e;
	}
}, Tc = {
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
	} : e,
	4: (e) => Qs(e)
};
function Ec(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 5;) {
		let r = Tc[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function Dc(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 7;) {
		let i = wc[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/page-presets.js
var Oc = /* @__PURE__ */ new Map();
Ds({ sections: { define: (e, t) => Oc.set(e, t) } });
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
		schemaVersion: 7,
		meta: {
			id: t,
			title: n
		},
		sections: r.sections.map((e) => Oc.get(e).create())
	} : null;
}
//#endregion
//#region src/panels/PagesPanel.svelte
var jc = /* @__PURE__ */ R("<span class=\"page-path\">/</span>"), Mc = /* @__PURE__ */ R("<input class=\"page-slug\"/>"), Nc = /* @__PURE__ */ R("<span class=\"seo-warn\"></span>"), Pc = /* @__PURE__ */ R("<button class=\"ghost danger\"><!> </button>"), Fc = /* @__PURE__ */ R("<div class=\"page-menu\"><button class=\"ghost\"><!> </button> <!></div>"), Ic = /* @__PURE__ */ R("<div><input class=\"page-title\"/> <!> <!> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <span class=\"page-menu-wrap\"><button class=\"ghost row-tool\"></button> <!></span></span></div>"), Lc = /* @__PURE__ */ R("<img class=\"site-icon-preview\"/>"), Rc = /* @__PURE__ */ R("<button class=\"ghost row-tool\"></button>"), zc = /* @__PURE__ */ R("<div><button class=\"page-template-pick\"><span class=\"page-template-thumb\"></span> <span class=\"page-template-name\"> </span></button></div>"), Bc = /* @__PURE__ */ R("<div><button class=\"page-template-pick\"><span class=\"page-template-thumb\"></span> <span class=\"page-template-name\"> </span></button> <button class=\"page-template-del\"></button></div>"), Vc = /* @__PURE__ */ R("<span class=\"mini-label\"> </span> <div class=\"page-template-grid\"></div>", 1), Hc = /* @__PURE__ */ R("<div class=\"panel-body\"><!> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><label> <textarea rows=\"2\"></textarea></label> <label> <input/></label> <label> <textarea rows=\"2\"></textarea></label> <label> <!></label> <span class=\"toolbar-row\"><label class=\"ghost filepick tb-grow\"> <input type=\"file\" accept=\"image/*\"/></label> <!></span> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label></div></details> <hr class=\"gridmenu-divider\"/> <input/> <button class=\"ghost action\"> </button> <span class=\"mini-label\"> </span> <div class=\"page-template-grid\"><div><button class=\"page-template-pick\"><span class=\"page-template-thumb\"></span> <span class=\"page-template-name\"> </span></button></div> <!></div> <!></div>");
function Uc(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.missingSeo), i = /* @__PURE__ */ O(() => n.pageId), a = /* @__PURE__ */ O(() => n.seoDraft), o = /* @__PURE__ */ O(() => n.siteDraft), s = /* @__PURE__ */ O(() => n.templateIds), { addPage: c, deletePage: l, handleDeleteTemplate: u, renamePage: d, savePageAsTemplate: f, selectPage: p, setPageNoindex: m, setPageSeo: h, setPageSlug: g, templateStores: _, uploadOgImage: v } = n, y = Object.fromEntries(kc.map((e) => [e.id, Qo(Ac(e.id, {
		pageId: "preview",
		title: ""
	}))])), b = /* @__PURE__ */ O(() => {
		let e = I(o)?.theme?.tokens?.color ?? {};
		return [
			"bg",
			"surface",
			"text",
			"accent"
		].filter((t) => typeof e[t] == "string" && js(e[t])).map((t) => `--urd-color-${t}: ${e[t]};`).join(" ");
	});
	var x = Hc(), S = j(x);
	ui(S, 17, () => I(o).pages, (e) => e.id, (e, t) => {
		var a = Ic();
		let o;
		var s = j(a);
		U(s);
		var c = P(s, 2), u = (e) => {
			var t = jc();
			F((e) => G(t, "title", e), [() => K("tip.pages.homeLocked")]), z(e, t);
		}, m = (e) => {
			var n = Mc();
			U(n), F((e, t) => {
				W(n, e), G(n, "title", t);
			}, [() => I(t).path.slice(1), () => K("tip.pages.slug")]), L("change", n, (e) => g(I(t), e.target.value)), z(e, n);
		};
		V(c, (e) => {
			I(t).path === "/" ? e(u) : e(m, -1);
		});
		var h = P(c, 2), _ = (e) => {
			var t = Nc();
			H(t, () => q.warn, !0), D(t), F((e) => G(t, "title", e), [() => K("tip.pages.missingDescription")]), z(e, t);
		};
		V(h, (e) => {
			I(r)[I(t).id] && e(_);
		});
		var v = P(h, 2), y = j(v);
		H(y, () => q.right, !0), D(y);
		var b = P(y, 2), x = j(b);
		H(x, () => q.kebab, !0), D(x);
		var S = P(x, 2), C = (e) => {
			var r = Fc(), i = j(r), a = j(i);
			H(a, () => q.bookmark);
			var o = P(a);
			D(i);
			var s = P(i, 2), c = (e) => {
				var r = Pc(), i = j(r);
				H(i, () => q.cross);
				var a = P(i);
				D(r), F((e, t) => {
					G(r, "title", e), B(a, ` ${t ?? ""}`);
				}, [() => K("tip.pages.delete"), () => K("ui.deletePage")]), L("click", r, () => {
					n.pageMenuFor = null, l(I(t));
				}), z(e, r);
			};
			V(s, (e) => {
				I(t).path !== "/" && e(c);
			}), D(r), F((e) => B(o, ` ${e ?? ""}`), [() => K("ui.savePageTemplate")]), L("click", i, () => f(I(t))), z(e, r);
		};
		V(S, (e) => {
			n.pageMenuFor === I(t).id && e(C);
		}), D(b), D(v), D(a), F((e, n, r) => {
			o = Pi(a, 1, "page-row", null, o, { current: I(t).id === I(i) }), W(s, I(t).title), G(s, "title", e), G(y, "title", n), y.disabled = I(t).id === I(i), G(x, "title", r);
		}, [
			() => K("tip.pages.title"),
			() => K("tip.pages.open"),
			() => K("tip.pages.menu")
		]), L("change", s, (e) => d(I(t), e.target.value)), L("click", y, () => p(I(t).id)), L("click", x, () => n.pageMenuFor = n.pageMenuFor === I(t).id ? null : I(t).id), z(e, a);
	});
	var C = P(S, 2), w = j(C), T = N(w, !0), E = P(w, 2), ee = j(E), te = j(ee), ne = P(te);
	_t(ne), D(ee);
	var re = P(ee, 2), ie = j(re), ae = P(ie);
	U(ae), D(re);
	var oe = P(re, 2), se = j(oe), ce = P(se);
	_t(ce), D(oe);
	var le = P(oe, 2), ue = j(le), de = P(ue), fe = (e) => {
		var t = Lc();
		F((e) => {
			G(t, "src", I(a).ogImage), G(t, "alt", e);
		}, [() => K("lbl.ogImage")]), z(e, t);
	};
	V(de, (e) => {
		I(a).ogImage && e(fe);
	}), D(le);
	var pe = P(le, 2), me = j(pe), he = j(me), ge = P(he);
	D(me);
	var _e = P(me, 2), ve = (e) => {
		var t = Rc();
		H(t, () => q.cross, !0), D(t), F((e) => G(t, "title", e), [() => K("tip.seo.removeOgImage")]), L("click", t, () => h("ogImage", "")), z(e, t);
	};
	V(_e, (e) => {
		I(a).ogImage && e(ve);
	}), D(pe);
	var ye = P(pe, 2), be = j(ye);
	U(be);
	var xe = P(be);
	D(ye), D(E), D(C);
	var Se = P(C, 4);
	U(Se);
	var Ce = P(Se, 2), we = N(Ce, !0), Te = P(Ce, 2), Ee = N(Te, !0), De = P(Te, 2), Oe = j(De);
	let ke;
	var Ae = j(Oe), je = j(Ae);
	H(je, () => Qo({ sections: [] }), !0), D(je);
	var Me = N(P(je, 2), !0);
	D(Ae), D(Oe), ui(P(Oe, 2), 17, () => kc, (e) => e.id, (e, t) => {
		var r = zc();
		let i;
		var a = j(r), o = j(a);
		H(o, () => y[I(t).id], !0), D(o);
		var s = N(P(o, 2), !0);
		D(a), D(r), F((e, o) => {
			i = Pi(r, 1, "page-template-card", null, i, { picked: n.newPageTemplate === `preset:${I(t).id}` }), G(a, "title", e), B(s, o);
		}, [() => K("tip.pages.templatePick", { name: K(I(t).labelKey) }), () => K(I(t).labelKey)]), L("click", a, () => n.newPageTemplate = n.newPageTemplate === `preset:${I(t).id}` ? null : `preset:${I(t).id}`), z(e, r);
	}), D(De);
	var Ne = P(De, 2), Pe = (e) => {
		var t = Vc(), r = M(t), i = N(r, !0), a = P(r, 2);
		ui(a, 20, () => I(s).filter((e) => _[e]?.data?.mal?.kind === "page"), (e) => e, (e, t) => {
			var r = Bc();
			let i;
			var a = j(r), o = j(a);
			H(o, () => Qo(_[t].data.page), !0), D(o);
			var s = N(P(o, 2), !0);
			D(a);
			var c = P(a, 2);
			H(c, () => q.cross, !0), D(c), D(r), F((e, o) => {
				i = Pi(r, 1, "page-template-card", null, i, { picked: n.newPageTemplate === t }), G(a, "title", e), B(s, _[t].data.mal.name), G(c, "title", o);
			}, [() => K("tip.pages.templatePick", { name: _[t].data.mal.name }), () => K("canvas.deleteTemplate")]), L("click", a, () => n.newPageTemplate = n.newPageTemplate === t ? null : t), L("click", c, () => u({ id: t })), z(e, r);
		}), D(a), F((e) => {
			B(i, e), Ii(a, I(b));
		}, [() => K("canvas.tabMyTemplates")]), z(e, t);
	}, Fe = /* @__PURE__ */ O(() => I(s).some((e) => _[e]?.data?.mal?.kind === "page"));
	V(Ne, (e) => {
		I(Fe) && e(Pe);
	}), D(x), F((e, t, r, i, o, s, c, l, u, d, f, p, m, h, g, _, v, y, x, S, C, w) => {
		B(T, e), G(ee, "title", t), B(te, `${r ?? ""} `), W(ne, I(a).description), G(re, "title", i), B(ie, `${o ?? ""} `), W(ae, I(a).ogTitle), G(ae, "placeholder", s), G(oe, "title", c), B(se, `${l ?? ""} `), W(ce, I(a).ogDescription), G(ce, "placeholder", I(a).description), G(le, "title", u), B(ue, `${d ?? ""} `), G(me, "title", f), B(he, `${p ?? ""} `), G(ye, "title", m), Vi(be, h), B(xe, ` ${g ?? ""}`), G(Se, "placeholder", _), G(Ce, "title", v), Ce.disabled = y, B(we, x), B(Ee, S), Ii(De, I(b)), ke = Pi(Oe, 1, "page-template-card", null, ke, { picked: n.newPageTemplate === null }), G(Ae, "title", C), B(Me, w);
	}, [
		() => K("ui.seoGroup", { page: I(o).pages.find((e) => e.id === I(i))?.title ?? "" }),
		() => K("tip.seo.description"),
		() => K("lbl.seoDescription"),
		() => K("tip.seo.ogTitle"),
		() => K("lbl.ogTitle"),
		() => I(o).pages.find((e) => e.id === I(i))?.title ?? "",
		() => K("tip.seo.ogDescription"),
		() => K("lbl.ogDescription"),
		() => K("tip.seo.ogImage"),
		() => K("lbl.ogImage"),
		() => K("tip.seo.ogImage"),
		() => I(a).ogImage ? K("ui.changeImage") : K("ui.chooseImage"),
		() => K("tip.seo.hideFromSearch"),
		() => I(o).pages.find((e) => e.id === I(i))?.noindex === !0,
		() => K("lbl.hideFromSearch"),
		() => K("ph.newPageName"),
		() => K("hint.pages.autoMenu"),
		() => !n.newPageTitle.trim(),
		() => K("ui.createPage"),
		() => K("canvas.tabPresets"),
		() => K("tip.pages.blankPick"),
		() => K("ui.blankPage")
	]), L("change", ne, (e) => h("description", e.target.value)), L("change", ae, (e) => h("ogTitle", e.target.value)), L("change", ce, (e) => h("ogDescription", e.target.value)), L("change", ge, v), L("change", be, (e) => m(e.target.checked)), L("keydown", Se, (e) => e.key === "Enter" && c()), Gi(Se, () => n.newPageTitle, (e) => n.newPageTitle = e), L("click", Ce, c), L("click", Ae, () => n.newPageTemplate = null), z(e, x), at();
}
Br([
	"change",
	"click",
	"keydown"
]);
//#endregion
//#region src/lib/ColorPicker.svelte
var Wc = /* @__PURE__ */ R("<button type=\"button\" class=\"cp-eye svelte-zxiloo\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), Gc = /* @__PURE__ */ R("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), Kc = /* @__PURE__ */ R("<button type=\"button\"></button>"), qc = /* @__PURE__ */ R("<span class=\"cp-label svelte-zxiloo\"> <!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Jc = /* @__PURE__ */ R("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\">×</button></span>"), Yc = /* @__PURE__ */ R("<span class=\"cp-tokens svelte-zxiloo\"></span>"), Xc = /* @__PURE__ */ R("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), Zc = /* @__PURE__ */ R("<span class=\"cp-label svelte-zxiloo\"> </span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Qc = /* @__PURE__ */ R("<div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\"> <button type=\"button\" class=\"cp-add svelte-zxiloo\">+</button></span> <!> <!>", 1), $c = /* @__PURE__ */ R("<button type=\"button\" class=\"cp-clear svelte-zxiloo\">×</button>"), el = /* @__PURE__ */ R("<div class=\"cp-pop cp-anchored svelte-zxiloo\" popover=\"auto\"><!></div>"), tl = /* @__PURE__ */ R("<div class=\"cp-pop svelte-zxiloo\"><!></div>"), nl = /* @__PURE__ */ R("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!> <!></span>");
function rl(e, t) {
	it(t, !0);
	let n = (e) => {
		var t = Qc(), n = M(t), a = N(n), o = P(n, 2);
		U(o);
		var s = P(o, 2);
		U(s);
		var c = P(s, 2), l = j(c), u = P(l, 2);
		U(u);
		var d = P(u, 2), f = (e) => {
			var t = Wc();
			F((e) => G(t, "title", e), [() => K("cp.eyedropper")]), L("click", t, be), z(e, t);
		};
		V(d, (e) => {
			ye && e(f);
		}), D(c);
		var p = P(c, 2);
		ui(p, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = Gc();
			U(r), F((e) => {
				G(r, "title", t), W(r, e);
			}, [() => _e(I(n))]), L("change", r, (e) => ve(I(n), e.target.value)), z(e, r);
		}), D(p);
		var v = P(p, 2), y = (e) => {
			var t = qc(), n = M(t), a = j(n, !0), o = P(a), s = (e) => {
				var t = Jr();
				F((e) => B(t, e), [() => K("cp.linkedSuffix", { token: m() })]), z(e, t);
			}, c = /* @__PURE__ */ O(() => m());
			V(o, (e) => {
				I(c) && e(s);
			}), D(n);
			var l = P(n, 2);
			ui(l, 21, i, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ O(() => g(I(t), 2));
				let i = () => I(n)[0], a = () => I(n)[1];
				var o = Kc();
				let s;
				F((e) => {
					s = Pi(o, 1, "cp-token svelte-zxiloo", null, s, { active: r() === i() }), Ii(o, `background: ${a() ?? ""}`), G(o, "title", e);
				}, [() => K("cp.tokenTitle", { name: i() })]), L("click", o, () => me(i(), a())), z(e, o);
			}), D(l), F((e) => B(a, e), [() => K("cp.themeColors")]), z(e, t);
		};
		V(v, (e) => {
			i().length && e(y);
		});
		var b = P(v, 2), x = j(b), S = P(x);
		D(b);
		var te = P(b, 2), ne = (e) => {
			var t = Yc();
			ui(t, 20, () => I(_), (e) => e, (e, t) => {
				var n = Jc(), r = j(n), i = P(r, 2);
				D(n), F((e) => {
					Ii(r, `background: ${t ?? ""}`), G(r, "title", t), G(i, "title", e);
				}, [() => K("cp.removeSaved")]), L("click", r, () => xe(t)), L("click", i, () => Ce(t)), z(e, n);
			}), D(t), z(e, t);
		};
		V(te, (e) => {
			I(_).length && e(ne);
		});
		var re = P(te, 2), ie = (e) => {
			var t = Zc(), n = M(t), r = N(n, !0), i = P(n, 2);
			ui(i, 20, () => I(h), (e) => e, (e, t) => {
				var n = Xc();
				F(() => {
					Ii(n, `background: ${t ?? ""}`), G(n, "title", t);
				}), L("click", n, () => xe(t)), z(e, n);
			}), D(i), F((e) => B(r, e), [() => K("common.recent")]), z(e, t);
		};
		V(re, (e) => {
			I(h).length && e(ie);
		}), F((e, t, r, i, c) => {
			Ii(n, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${I(C) ?? ""}, 100%, 50%)`), Ii(a, `left: ${I(w) * 100}%; top: ${(1 - I(T)) * 100}%`), W(o, I(C)), W(s, e), G(s, "title", t), Ii(s, `background: linear-gradient(to right, transparent, ${r ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), Ii(l, `background: ${I(ee) ?? ""}`), W(u, I(ee)), B(x, `${i ?? ""} `), G(S, "title", c);
		}, [
			() => Math.round(I(E) * 100),
			() => K("cp.alpha"),
			() => ae(),
			() => K("cp.saved"),
			() => K("cp.saveTitle")
		]), L("pointerdown", n, he), L("input", o, (e) => {
			A(C, Number(e.target.value), !0), se();
		}), L("input", s, (e) => {
			A(E, Number(e.target.value) / 100), se();
		}), L("change", u, ge), L("click", S, Se), z(e, t);
	}, r = ra(t, "value", 3, "#000000"), i = ra(t, "tokens", 19, () => []), a = ra(t, "label", 19, () => K("cp.pickColor")), o = ra(t, "allowClear", 3, !1), s = "urd-recent-colors", c = "urd-saved-colors", l = Ta(), u = Da("urd-cp"), d = u.slice(2), f = /* @__PURE__ */ k(null), p = () => {
		let e = i().find(([e]) => e === r());
		return e ? e[1] : r();
	}, m = () => i().find(([e]) => e === r())?.[0] ?? null, h = /* @__PURE__ */ k(pn([])), _ = /* @__PURE__ */ k(pn([])), v = "", y = "", b = /* @__PURE__ */ k(null), x = /* @__PURE__ */ k(!1), S = /* @__PURE__ */ k(pn({
		top: 0,
		left: 0
	})), C = /* @__PURE__ */ k(0), w = /* @__PURE__ */ k(0), T = /* @__PURE__ */ k(1), E = /* @__PURE__ */ k(1), ee = /* @__PURE__ */ k("#000000");
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
		return ne(...ie(I(C), I(w), I(T)));
	}
	function oe() {
		let e = ae();
		return I(E) >= .995 ? e : e + Math.round(I(E) * 255).toString(16).padStart(2, "0");
	}
	function se() {
		A(ee, oe(), !0), y = I(ee), t.onchange?.(I(ee));
	}
	function ce(e) {
		let t = te(e);
		return t ? (((e) => {
			var t = g(e, 3);
			A(C, t[0], !0), A(w, t[1], !0), A(T, t[2], !0);
		})(re(t[0], t[1], t[2])), A(E, t[3], !0), A(ee, oe(), !0), !0) : !1;
	}
	function le() {
		ce(p()) || ce("#000000"), v = r(), y = "";
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
	function ue(e) {
		e.newState === "open" ? (le(), Oa(I(b), !0), A(x, !0)) : I(x) && (Oa(I(b), !1), A(x, !1), fe());
	}
	function de() {
		le();
		let e = I(b).getBoundingClientRect(), t = I(b).closest(".panel-body")?.getBoundingClientRect(), n = t ? t.right : window.innerWidth, r = Math.max(8, Math.min(e.right - 236, n - 236 - 8)), i = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		A(S, {
			top: i,
			left: r
		}, !0), A(x, !0);
	}
	function fe() {
		if (y && y !== v) {
			let e = [y, ...I(h).filter((e) => e !== y)].slice(0, 8);
			localStorage.setItem(s, JSON.stringify(e));
		}
	}
	function pe() {
		l ? I(f)?.hidePopover() : (A(x, !1), fe());
	}
	function me(e, n) {
		ce(n), A(ee, n, !0), t.onchange?.(e);
	}
	function he(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			A(w, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), A(T, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), se();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function ge(e) {
		ce(e.target.value) ? se() : A(ee, ae(), !0);
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
			var t = g(e, 3);
			A(C, t[0], !0), A(w, t[1], !0), A(T, t[2], !0);
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
		I(_).includes(e) || (A(_, [e, ...I(_)].slice(0, 12), !0), localStorage.setItem(c, JSON.stringify(Xe(I(_)))));
	}
	function Ce(e) {
		A(_, I(_).filter((t) => t !== e), !0), localStorage.setItem(c, JSON.stringify(Xe(I(_))));
	}
	Nn(() => {
		if (!I(x)) return;
		let e = () => pe();
		if (window.addEventListener("blur", e), l) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			I(b) && !I(b).contains(e.target) && pe();
		}, n = (e) => {
			e.key === "Escape" && pe();
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), () => {
			document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), window.removeEventListener("blur", e);
		};
	});
	var we = nl(), Te = j(we);
	let Ee;
	var De = P(Te, 2), Oe = (e) => {
		var n = $c();
		F((e, t) => {
			G(n, "title", e), G(n, "aria-label", t);
		}, [() => K("cp.clearTitle"), () => K("cp.clear")]), L("click", n, () => t.onchange?.("")), z(e, n);
	};
	V(De, (e) => {
		o() && r() && e(Oe);
	});
	var ke = P(De, 2), Ae = (e) => {
		var t = el(), r = j(t), i = (e) => {
			n(e);
		};
		V(r, (e) => {
			I(x) && e(i);
		}), D(t), Zi(t, (e) => A(f, e), () => I(f)), F(() => {
			G(t, "id", d), Ii(t, `position-anchor: ${u ?? ""}`);
		}), zr("toggle", t, ue), L("click", t, (e) => e.preventDefault()), z(e, t);
	}, je = (e) => {
		var t = tl(), r = j(t);
		n(r), D(t), F(() => Ii(t, `top: ${I(S).top ?? ""}px; left: ${I(S).left ?? ""}px`)), L("click", t, (e) => e.preventDefault()), z(e, t);
	};
	V(ke, (e) => {
		l ? e(Ae) : I(x) && e(je, 1);
	}), D(we), Zi(we, (e) => A(b, e), () => I(b)), F((e, t, n) => {
		Ee = Pi(Te, 1, "cp-swatch svelte-zxiloo", null, Ee, {
			linked: e,
			"cp-empty": o() && !r()
		}), Ii(Te, `background: ${t ?? ""}${l ? `; anchor-name: ${u}` : ""}`), G(Te, "title", n), G(Te, "popovertarget", l ? d : void 0), G(Te, "aria-label", a());
	}, [
		() => m(),
		() => r() ? p() : "transparent",
		() => m() ? K("cp.linkedTitle", {
			label: a(),
			token: m()
		}) : a()
	]), L("click", Te, function(...e) {
		(l ? void 0 : () => I(x) ? pe() : de())?.apply(this, e);
	}), z(e, we), at();
}
Br([
	"pointerdown",
	"input",
	"change",
	"click"
]);
//#endregion
//#region src/lib/MarkPicker.svelte
var il = /* @__PURE__ */ R("<span class=\"mp-count svelte-1y5ipgc\"> </span>"), al = /* @__PURE__ */ R("<div class=\"mp-tabs svelte-1y5ipgc\" role=\"group\"><button type=\"button\"> </button> <button type=\"button\"> <!></button></div>"), ol = /* @__PURE__ */ R("<button type=\"button\"><span class=\"mp-svg svelte-1y5ipgc\"></span></button>"), sl = /* @__PURE__ */ R("<p class=\"mp-hint svelte-1y5ipgc\"> </p>"), cl = /* @__PURE__ */ R("<input class=\"mp-search svelte-1y5ipgc\" type=\"search\"/> <div class=\"mp-scroll svelte-1y5ipgc\"><div class=\"mp-grid svelte-1y5ipgc\"><button type=\"button\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" aria-hidden=\"true\" class=\"svelte-1y5ipgc\"><circle cx=\"12\" cy=\"12\" r=\"8.5\"></circle><path d=\"M6 18L18 6\"></path></svg></button> <!></div> <!></div>", 1), ll = /* @__PURE__ */ R("<button type=\"button\"><img alt=\"\" class=\"svelte-1y5ipgc\"/></button>"), ul = /* @__PURE__ */ R("<div class=\"mp-scroll svelte-1y5ipgc\"><div class=\"mp-grid mp-grid-img svelte-1y5ipgc\"><button type=\"button\" class=\"mp-cell mp-upload svelte-1y5ipgc\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" aria-hidden=\"true\" class=\"svelte-1y5ipgc\"><path d=\"M12 5v14\"></path><path d=\"M5 12h14\"></path></svg> <span> </span></button> <!></div> <p class=\"mp-hint svelte-1y5ipgc\"> </p></div>"), dl = /* @__PURE__ */ R("<!> <!>", 1), fl = /* @__PURE__ */ R("<img class=\"mp-own svelte-1y5ipgc\" alt=\"\"/>"), pl = /* @__PURE__ */ R("<span class=\"mp-svg svelte-1y5ipgc\"></span>"), ml = /* @__PURE__ */ R("<span class=\"mp-empty svelte-1y5ipgc\" aria-hidden=\"true\">+</span>"), hl = /* @__PURE__ */ R("<div class=\"mp-pop mp-anchored svelte-1y5ipgc\" popover=\"auto\"><!></div>"), gl = /* @__PURE__ */ R("<div class=\"mp-pop svelte-1y5ipgc\"><!></div>"), _l = /* @__PURE__ */ R("<span class=\"mp svelte-1y5ipgc\"><button type=\"button\"><!></button> <!> <input type=\"file\" accept=\"image/*\" hidden=\"\"/></span>");
function vl(e, t) {
	it(t, !0);
	let n = (e) => {
		var t = dl(), n = M(t), a = (e) => {
			var t = al(), n = j(t);
			let r;
			var i = N(n, !0), a = P(n, 2);
			let s;
			var c = j(a, !0), l = P(c), u = (e) => {
				var t = il(), n = N(t, !0);
				F(() => B(n, I(S).length)), z(e, t);
			};
			V(l, (e) => {
				I(S).length && e(u);
			}), D(a), D(t), F((e, l) => {
				G(t, "aria-label", o()), r = Pi(n, 1, "mp-tab svelte-1y5ipgc", null, r, { on: I(_) === "icons" }), G(n, "aria-pressed", I(_) === "icons"), B(i, e), s = Pi(a, 1, "mp-tab svelte-1y5ipgc", null, s, { on: I(_) === "images" }), G(a, "aria-pressed", I(_) === "images"), B(c, l);
			}, [() => K("mp.icons"), () => K("mp.images")]), L("click", n, () => A(_, "icons")), L("click", a, () => A(_, "images")), z(e, t);
		};
		V(n, (e) => {
			l() || e(a);
		});
		var c = P(n, 2), u = (e) => {
			var t = cl(), n = M(t);
			U(n);
			var a = P(n, 2), o = j(a), c = j(o);
			let l;
			ui(P(c, 2), 17, () => I(x), ({ id: e }) => e, (e, t) => {
				let n = () => I(t).id;
				var a = ol();
				let o;
				var s = j(a);
				H(s, () => Zs(n()), !0), D(s), D(a), F((e, t) => {
					o = Pi(a, 1, "mp-cell svelte-1y5ipgc", null, o, { active: n() === r() && !i() }), G(a, "title", e), G(a, "aria-label", t);
				}, [() => K(Ys[n()].labelKey), () => K(Ys[n()].labelKey)]), L("click", a, () => ee(n())), z(e, a);
			}), D(o);
			var u = P(o, 2), d = (e) => {
				var t = sl(), n = N(t, !0);
				F((e) => B(n, e), [() => K("mp.noHits")]), z(e, t);
			};
			V(u, (e) => {
				I(x).length || e(d);
			}), D(a), F((e, t) => {
				G(n, "placeholder", e), G(n, "aria-label", t), l = Pi(c, 1, "mp-cell mp-none svelte-1y5ipgc", null, l, { active: !r() && !i() }), G(c, "title", s()), G(c, "aria-label", s());
			}, [() => K("mp.search"), () => K("mp.search")]), Gi(n, () => I(v), (e) => A(v, e)), L("click", c, ne), z(e, t);
		}, d = (e) => {
			var t = ul(), n = j(t), r = j(n), a = N(P(j(r), 2), !0);
			D(r), ui(P(r, 2), 16, () => I(S), (e) => e, (e, t) => {
				var n = ll();
				let r;
				var a = N(n);
				F(() => {
					r = Pi(n, 1, "mp-cell mp-img svelte-1y5ipgc", null, r, { active: t === i() }), G(a, "src", t);
				}), L("click", n, () => te(t)), z(e, n);
			}), D(n);
			var o = N(P(n, 2), !0);
			D(t), F((e, t) => {
				B(a, e), B(o, t);
			}, [() => K("mp.upload"), () => K("mp.imagesHint")]), L("click", r, ae), z(e, t);
		};
		V(c, (e) => {
			I(_) === "icons" ? e(u) : e(d, -1);
		}), z(e, t);
	}, r = ra(t, "icon", 3, ""), i = ra(t, "image", 3, ""), a = ra(t, "images", 19, () => []), o = ra(t, "label", 19, () => K("mp.pickMark")), s = ra(t, "noneLabel", 19, () => K("common.none")), c = ra(t, "klass", 3, ""), l = ra(t, "iconsOnly", 3, !1), u = Ta(), d = Da("urd-mp"), f = d.slice(2), p = /* @__PURE__ */ k(null), m = /* @__PURE__ */ k(null), h = /* @__PURE__ */ k(null), g = /* @__PURE__ */ k(!1), _ = /* @__PURE__ */ k("icons"), v = /* @__PURE__ */ k(""), y = /* @__PURE__ */ k(pn({
		top: 0,
		left: 0
	})), b = Xs.flatMap(([e, t]) => t.map((t) => ({
		id: t,
		cat: e
	}))), x = /* @__PURE__ */ O(() => {
		let e = I(v).trim().toLowerCase();
		return e ? b.filter(({ id: t }) => {
			let n = K(Ys[t].labelKey) || Ys[t].label;
			return t.includes(e) || n.toLowerCase().includes(e);
		}) : b;
	}), S = /* @__PURE__ */ O(() => [...new Set(a().filter(Boolean))]);
	function C() {
		A(v, ""), A(re, !1), A(_, i() && !l() ? "images" : "icons", !0);
	}
	function w(e) {
		A(g, e.newState === "open"), Oa(I(p), I(g)), I(g) && C();
	}
	function T() {
		u && I(m)?.hidePopover(), A(g, !1);
	}
	function E() {
		C();
		let e = I(p).getBoundingClientRect();
		A(y, {
			left: Math.max(8, Math.min(e.left, window.innerWidth - 286 - 8)),
			top: e.bottom + 332 + 8 > window.innerHeight ? Math.max(8, e.top - 332 - 8) : e.bottom + 6
		}, !0), A(g, !0);
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
	let re = /* @__PURE__ */ k(!1);
	function ie(e) {
		A(re, !1);
		let n = e.target.files?.[0];
		e.target.value = "", n && t.onfile?.(n);
	}
	function ae() {
		A(re, !0), I(h).click();
	}
	Nn(() => {
		if (!I(g)) return;
		let e = () => {
			I(re) || T();
		};
		if (window.addEventListener("blur", e), u) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			I(p) && !I(p).contains(e.target) && A(g, !1);
		}, n = (e) => {
			e.key === "Escape" && A(g, !1);
		}, r = (e) => {
			I(p) && e.target instanceof Node && !I(p).contains(e.target) && A(g, !1);
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var oe = _l(), se = j(oe), ce = j(se), le = (e) => {
		var n = Yr();
		gi(M(n), () => t.children), z(e, n);
	}, ue = (e) => {
		var t = fl();
		F(() => G(t, "src", i())), z(e, t);
	}, de = (e) => {
		var t = pl();
		H(t, () => Zs(r()), !0), D(t), z(e, t);
	}, fe = (e) => {
		z(e, ml());
	};
	V(ce, (e) => {
		t.children ? e(le) : i() ? e(ue, 1) : r() && Ys[r()] ? e(de, 2) : e(fe, -1);
	}), D(se);
	var pe = P(se, 2), me = (e) => {
		var t = hl(), r = j(t), i = (e) => {
			n(e);
		};
		V(r, (e) => {
			I(g) && e(i);
		}), D(t), Zi(t, (e) => A(m, e), () => I(m)), F(() => {
			G(t, "id", f), Ii(t, `position-anchor: ${d ?? ""}`);
		}), zr("toggle", t, w), z(e, t);
	}, he = (e) => {
		var t = gl(), r = j(t);
		n(r), D(t), F(() => Ii(t, `top: ${I(y).top ?? ""}px; left: ${I(y).left ?? ""}px`)), z(e, t);
	};
	V(pe, (e) => {
		u ? e(me) : I(g) && e(he, 1);
	});
	var ge = P(pe, 2);
	Zi(ge, (e) => A(h, e), () => I(h)), D(oe), Zi(oe, (e) => A(p, e), () => I(p)), F(() => {
		Pi(se, 1, `mp-trigger ${c() ?? ""}`, "svelte-1y5ipgc"), G(se, "title", o()), G(se, "aria-label", o()), G(se, "popovertarget", u ? f : void 0), Ii(se, u ? `anchor-name: ${d}` : void 0);
	}), L("click", se, function(...e) {
		(u ? void 0 : () => I(g) ? A(g, !1) : E())?.apply(this, e);
	}), L("change", ge, ie), zr("cancel", ge, () => A(re, !1)), z(e, oe), at();
}
Br(["click", "change"]);
//#endregion
//#region src/lib/nav-size.js
var yl = {
	min: 0,
	max: 64,
	step: 1
}, bl = {
	min: 12,
	max: 28,
	step: 1
}, xl = {
	min: 0,
	max: 80,
	step: 1
}, Sl = {
	min: 0,
	max: 64,
	step: 1
}, Cl = {
	min: 480,
	max: 1920,
	step: 20
}, wl = {
	min: .3,
	max: .8,
	step: .05
}, Tl = {
	min: 0,
	max: 400,
	step: 10
}, El = {
	min: 0,
	max: 1200,
	step: 20
}, Dl = {
	min: 0,
	max: 64,
	step: 1
}, Ol = {
	min: 180,
	max: 400,
	step: 1
}, kl = {
	min: 12,
	max: 128,
	step: 1
}, Al = {
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
}, jl = [
	"sm",
	"md",
	"lg",
	"xl"
], Ml = .67;
function Nl(e) {
	return e === "floating" || e === "floating-square" || e === "floating-tab";
}
function Pl(e, { min: t, max: n, step: r = 1 }, i) {
	let a = Number(e);
	if (e == null || e === "" || !Number.isFinite(a)) return i;
	let o = Math.round(a / r) * r, s = Math.min(n, Math.max(t, o));
	return r < 1 ? Math.round(s * 100) / 100 : s;
}
function Fl(e, t) {
	if (e?.padY != null && e.padY !== "") return Pl(e.padY, yl, Al.md.padY);
	let n = Al[e?.size] ?? Al.md;
	return Math.round(n.padY * (Nl(t) ? Ml : 1));
}
function Il(e) {
	if (e?.textSize != null && e.textSize !== "") return Pl(e.textSize, bl, Al.md.textSize);
	let t = Al[e?.size] ?? Al.md;
	return Math.round(t.textSize);
}
function Ll(e) {
	return e?.padY != null && e.padY !== "" || e?.textSize != null && e.textSize !== "" ? null : jl.includes(e?.size) ? e.size : "md";
}
//#endregion
//#region src/lib/Choice.svelte
var Rl = /* @__PURE__ */ R("<button type=\"button\"> </button>"), zl = /* @__PURE__ */ R("<div><span class=\"choice-label svelte-1ehof1c\"> </span> <div class=\"choice-seg svelte-1ehof1c\" role=\"group\"></div></div>");
function Bl(e, t) {
	it(t, !0);
	let n = ra(t, "title", 3, void 0), r = /* @__PURE__ */ O(() => t.options.length > 3 || t.options.reduce((e, [, t]) => e + `${t}`.length, 0) > 14), i = (e) => `${e ?? ""}`;
	var a = zl();
	let o;
	var s = j(a), c = N(s, !0), l = P(s, 2);
	ui(l, 21, () => t.options, ([e, t]) => i(e), (e, n) => {
		var r = /* @__PURE__ */ O(() => g(I(n), 2));
		let a = () => I(r)[0], o = () => I(r)[1];
		var s = Rl();
		let c;
		var l = N(s, !0);
		F((e, t) => {
			G(s, "aria-pressed", e), c = Pi(s, 1, "svelte-1ehof1c", null, c, { on: t }), B(l, o());
		}, [() => i(a()) === i(t.value), () => i(a()) === i(t.value)]), L("click", s, () => t.onchange(a())), z(e, s);
	}), D(l), D(a), F(() => {
		o = Pi(a, 1, "choice svelte-1ehof1c", null, o, { stacked: I(r) }), G(a, "title", n()), B(c, t.label), G(l, "aria-label", t.label);
	}), z(e, a), at();
}
Br(["click"]);
//#endregion
//#region ../template/assets/engine/0.7.4/fonts.js
var Vl = [
	["font.system", "system-ui, sans-serif"],
	["font.arial", "Arial, Helvetica, sans-serif"],
	["font.verdana", "Verdana, Geneva, sans-serif"],
	["font.trebuchet", "'Trebuchet MS', sans-serif"],
	["font.georgia", "Georgia, 'Times New Roman', serif"],
	["font.palatino", "'Palatino Linotype', Palatino, serif"],
	["font.courier", "'Courier New', monospace"]
], Hl = [
	"dots",
	"grid",
	"diagonal",
	"checks",
	"waves",
	"zigzag",
	"plus",
	"triangles"
], Ul = {
	min: 8,
	max: 160,
	dflt: 28
}, Wl = .12, Gl = {
	dots: "<circle cx=\"12\" cy=\"12\" r=\"3\"/>",
	grid: "<rect width=\"24\" height=\"1.6\"/><rect width=\"1.6\" height=\"24\"/>",
	diagonal: "<path d=\"M-6 6L6 -6M0 24L24 0M18 30L30 18\" fill=\"none\" stroke=\"#000\" stroke-width=\"4\"/>",
	checks: "<rect width=\"12\" height=\"12\"/><rect x=\"12\" y=\"12\" width=\"12\" height=\"12\"/>",
	waves: "<path d=\"M0 12Q6 4 12 12T24 12\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\"/>",
	zigzag: "<path d=\"M0 16L6 8L12 16L18 8L24 16\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\"/>",
	plus: "<path d=\"M12 7V17M7 12H17\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\" stroke-linecap=\"round\"/>",
	triangles: "<path d=\"M0 24L12 4L24 24Z\"/>"
};
function Kl(e) {
	return Hl.includes(e) ? e : "dots";
}
function ql(e) {
	let t = Number(e);
	return !Number.isFinite(t) || t <= 0 ? Ul.dflt : Math.min(Ul.max, Math.max(Ul.min, Math.round(t)));
}
function Jl(e) {
	let t = Number(e);
	return Number.isFinite(t) ? (Math.round(t) % 360 + 360) % 360 : 0;
}
function Yl(e) {
	let t = Number(e);
	return e == null || e === "" || !Number.isFinite(t) ? Wl : Math.min(1, Math.max(0, t));
}
function Xl(e = {}) {
	let t = ql(e.size), n = Jl(e.rotation), r = Gl[Kl(e.pattern)], i = `<pattern id="p" width="${t}" height="${t}" patternUnits="userSpaceOnUse"${n ? ` patternTransform="rotate(${n})"` : ""}><g transform="scale(${t / 24})">${r}</g></pattern>`, a = "<rect width=\"100%\" height=\"100%\" fill=\"url(#p)\"/>";
	return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><defs>${i}</defs>${e.invert === !0 ? `<mask id="m"><rect width="100%" height="100%" fill="#fff"/>${a}</mask><rect width="100%" height="100%" mask="url(#m)"/>` : a}</svg>`;
}
var Zl = () => typeof CSS < "u" && typeof CSS.supports == "function" && (CSS.supports("mask-image", "none") || CSS.supports("-webkit-mask-image", "none")), Ql = {
	version: 1,
	label: "Pattern",
	labelKey: "bgLayer.pattern",
	defaults: () => ({
		pattern: "dots",
		color: "text",
		size: Ul.dflt,
		opacity: Wl,
		rotation: 0,
		invert: !1
	}),
	migrations: {},
	render(e, t) {
		if (!Zl()) return;
		let n = `url("data:image/svg+xml,${encodeURIComponent(Xl(t))}")`;
		e.style.backgroundColor = Ns(t.color ?? "text"), e.style.opacity = String(Yl(t.opacity));
		for (let t of ["webkitMask", "mask"]) e.style[`${t}Image`] = n, e.style[`${t}Size`] = "100% 100%", e.style[`${t}Repeat`] = "no-repeat";
	}
}, $l = [
	"grid",
	"carousel",
	"slides",
	"ribbon",
	"mosaic",
	"polaroid"
], eu = [
	"grid",
	"mosaic",
	"polaroid"
], tu = {
	min: 80,
	max: 400,
	dflt: 140
}, nu = {
	min: 0,
	max: 15,
	dflt: 4
};
function ru(e) {
	return $l.includes(e) ? e : "grid";
}
function iu(e, t, n) {
	return !Number.isFinite(n) || n < 1 ? 0 : (((Number.isFinite(e) ? e : 0) + t) % n + n) % n;
}
function au({ count: e = 0, reducedMotion: t = !1 } = {}) {
	return e >= 2 && !t;
}
function ou(e, { min: t = 2, fallback: n = 5 } = {}) {
	let r = Number(e);
	return !Number.isFinite(r) || r <= 0 ? n : Math.max(t, r);
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/image.js
var su = .4, cu = [
	"none",
	"kenburns",
	"drift"
], lu = {
	min: 6,
	max: 60,
	dflt: 20
};
function uu(e) {
	return cu.includes(e) ? e : "none";
}
function du(e) {
	let { min: t, max: n, dflt: r } = lu, i = Number(e);
	return !Number.isFinite(i) || i <= 0 ? r : Math.min(n, Math.max(t, i));
}
function fu(e, t) {
	return `${(e ?? .5) * 100}% ${(t ?? .5) * 100}%`;
}
function pu(e, t) {
	return e === "contain" ? "contain" : e === "cover" ? "cover" : `${Math.max(0, t ?? 1) * 100}%`;
}
function mu(e) {
	let t = "-9999px";
	return e === "up" ? `inset(${t} 0 0 0)` : e === "down" ? `inset(0 0 ${t} 0)` : e === "both" ? `inset(${t} 0 ${t} 0)` : "inset(0)";
}
function hu(e, t, n, r = .18) {
	let i = Math.max(0, Math.min(1, n)) * su * t;
	return Math.round(Math.min(i, r * e));
}
function gu(e, t, n, r, i) {
	let a = e + t / 2, o = (n / 2 - a) * Math.max(0, Math.min(1, r)) * su, s = i ?? hu(t, n, r);
	return Math.max(-s, Math.min(s, o)) || 0;
}
var _u = /* @__PURE__ */ new Set(), vu = !1, yu = 0;
function bu() {
	yu = 0;
	for (let e of [..._u]) e() || _u.delete(e);
}
function xu() {
	yu ||= requestAnimationFrame(bu);
}
function Su(e) {
	_u.add(e), e(), !(vu || typeof window > "u") && (vu = !0, window.addEventListener("scroll", xu, { passive: !0 }), window.addEventListener("resize", xu, { passive: !0 }));
}
function Cu(e, t, n, r) {
	let i = r === "cover" || r === "tile" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement, o = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
	e.style.willChange = "transform";
	let s = (t) => {
		e.style.top = `-${t}px`, e.style.bottom = `-${t}px`;
	}, c = () => {
		if (!e.isConnected) return !1;
		if (o || document.body.classList.contains("urd-mobile")) return s(n), e.style.transform = "", !0;
		let r = (a ?? e).getBoundingClientRect(), c = window.innerHeight || document.documentElement.clientHeight, l = hu(r.height, c, t, i ? .18 : .6);
		s(i ? Math.max(n, l) : n);
		let u = gu(r.top, r.height, c, t, l);
		return e.style.transform = `translateY(${u.toFixed(1)}px)`, !0;
	};
	Su(c), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(c));
}
function wu() {
	return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("animation-timeline", "view()");
}
var Tu = /* @__PURE__ */ new Set(), Eu = !1, Du = 0;
function Ou() {
	Du = 0;
	for (let e of [...Tu]) e() || Tu.delete(e);
}
function ku() {
	!Du && typeof requestAnimationFrame == "function" && (Du = requestAnimationFrame(Ou));
}
function Au(e) {
	Tu.add(e), e(), !(Eu || typeof window > "u") && (Eu = !0, window.addEventListener("resize", ku, { passive: !0 }));
}
function ju(e, t, n, r) {
	let i = r === "cover" || r === "tile" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement;
	e.style.willChange = "transform", e.classList.add("urd-parallax-css");
	let o = () => {
		if (!e.isConnected) return !1;
		let r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || document.body.classList.contains("urd-mobile"), o = (a ?? e).getBoundingClientRect(), s = window.innerHeight || document.documentElement.clientHeight, c = hu(o.height, s, t, i ? .18 : .6), l = i && !r ? Math.max(n, c) : n;
		return e.style.setProperty("--urd-px-shift", `${c}px`), e.style.top = `-${l}px`, e.style.bottom = `-${l}px`, !0;
	};
	Au(o), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(o));
}
var Mu = {
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
		motionSpeed: lu.dflt
	}),
	migrations: {
		1: (e) => ({
			...e,
			fit: e.fit === "vanlig" ? "plain" : e.fit === "flislegg" ? "tile" : e.fit === "egen" ? "custom" : e.fit
		}),
		2: (e) => ({
			motion: "none",
			motionSpeed: lu.dflt,
			...e
		})
	},
	render(e, t) {
		let n = !Bs(t.src);
		n && e.classList.add("urd-bg-demo");
		let r = n ? ro(0) : t.src;
		e.style.opacity = String(t.opacity ?? 1), e.style.clipPath = mu(t.bleed), e.style.zIndex = t.bleed === "down" || t.bleed === "both" ? "1" : "";
		let i = document.createElement("div");
		i.className = "urd-bg-image", i.style.position = "absolute", i.style.left = "0", i.style.right = "0", i.style.top = "0", i.style.bottom = "0";
		let a = uu(t.motion), o = a === "none" ? i : document.createElement("div");
		o !== i && (o.className = `urd-bg-motion urd-bg-motion-${a}`, o.style.position = "absolute", o.style.left = "0", o.style.right = "0", o.style.top = "0", o.style.bottom = "0", o.style.animationDuration = `${du(t.motionSpeed)}s`, i.appendChild(o));
		let s = t.fit === "tile" || t.fit === "repeat";
		o.style.backgroundImage = `url("${r}")`, o.style.backgroundSize = pu(t.fit, t.size), o.style.backgroundRepeat = s ? "repeat" : "no-repeat", o.style.backgroundPosition = fu(t.x, t.y);
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
		e.appendChild(i), t.parallax > 0 && Nu(i, t.parallax, o === i ? c : 0, t.fit ?? "cover");
	}
};
function Nu(e, t, n, r) {
	wu() ? ju(e, t, n, r) : Cu(e, t, n, r);
}
//#endregion
//#region ../template/assets/engine/0.7.4/photo-source.js
var Pu = [
	"drive",
	"gphotos",
	"nextcloud",
	"json"
], Fu = {
	min: 1,
	max: 60,
	dflt: 24
}, Iu = [
	"name",
	"newest",
	"random"
], Lu = [
	480,
	800,
	1200,
	1600,
	2e3
], Ru = /^[A-Za-z0-9_-]{10,128}$/, zu = /^(?!\d+(?:\.\d+)*$)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/;
function Bu(e) {
	let t = Number(e);
	return !Number.isFinite(t) || t <= 0 ? Fu.dflt : Math.min(Fu.max, Math.max(Fu.min, Math.round(t)));
}
function Vu(e) {
	let t = typeof e == "string" ? e.trim() : "";
	if (!t) return null;
	if (Ru.test(t) && !t.includes(".")) return {
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
		return Ru.test(t) ? {
			provider: "drive",
			id: t
		} : null;
	}
	if (r === "photos.google.com") {
		let e = /^\/share\/([A-Za-z0-9_-]{10,256})\/?$/.exec(n.pathname), t = n.searchParams.get("key") ?? "";
		return e ? {
			provider: "gphotos",
			id: e[1],
			...Ru.test(t) ? { host: t } : {}
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
	return i && zu.test(r) ? {
		provider: "nextcloud",
		id: i[1],
		host: r
	} : /\.json$/i.test(n.pathname) && zu.test(r) ? {
		provider: "json",
		url: n.href
	} : null;
}
function Hu(e) {
	return Iu.includes(e) ? e : "name";
}
var Uu = (e) => Hu(e) === "newest" ? "newest" : "name";
function Wu(e, t) {
	if (!e || !Pu.includes(e.provider)) return null;
	let n = new URLSearchParams({
		p: e.provider,
		sort: Uu(t),
		max: "200"
	});
	return e.id && n.set("id", e.id), e.host && n.set("host", e.host), e.url && n.set("url", e.url), `/api/photos?${n.toString()}`;
}
function Gu(e, t = 200) {
	return (Array.isArray(e?.photos) ? e.photos : []).filter((e) => typeof e?.src == "string" && e.src.startsWith("/api/photo?")).slice(0, Math.max(1, Math.min(200, Number(t) || 200))).map((e) => ({
		src: e.src,
		name: typeof e.name == "string" ? e.name : ""
	}));
}
function Ku(e) {
	let t = e >>> 0;
	return () => {
		t = t + 1831565813 >>> 0;
		let e = t;
		return e = Math.imul(e ^ e >>> 15, e | 1), e ^= e + Math.imul(e ^ e >>> 7, e | 61), ((e ^ e >>> 14) >>> 0) / 4294967296;
	};
}
function qu(e, t) {
	let n = [...e], r = Ku(Number(t) || 0);
	for (let e = n.length - 1; e > 0; e--) {
		let t = Math.floor(r() * (e + 1));
		[n[e], n[t]] = [n[t], n[e]];
	}
	return n;
}
function Ju(e, t, n) {
	return Hu(t) === "random" ? qu(e, n) : [...e];
}
var Yu = 0;
function Xu() {
	return Yu ||= typeof crypto < "u" && crypto.getRandomValues ? crypto.getRandomValues(/* @__PURE__ */ new Uint32Array(1))[0] || 1 : Date.now() >>> 0 || 1, Yu;
}
function Zu(e, t = 1) {
	let n = (Number(e) || 0) * Math.min(3, Math.max(1, Number(t) || 1));
	return Lu.find((e) => e >= n) ?? Lu[Lu.length - 1];
}
function Qu(e, t) {
	if (typeof e != "string" || !e.startsWith("/api/photo?")) return e;
	let n = new URLSearchParams(e.slice(11));
	return n.set("w", String(t)), `/api/photo?${n.toString()}`;
}
var $u = 6e5, ed = 3e4, td = /* @__PURE__ */ new Map(), nd = /* @__PURE__ */ new Map();
function rd(e) {
	return e?.source === "folder" && typeof e.folder == "string" ? e.folder.trim() : "";
}
function id(e, t) {
	let n = Wu(Vu(e), t);
	return n ? ad(td.get(n)) : null;
}
function ad(e) {
	if (!e) return null;
	let t = e.value.photos.length ? $u : ed;
	return Date.now() - e.at < t ? e.value : null;
}
function od(e, t, { force: n = !1 } = {}) {
	let r = Wu(Vu(e), t);
	if (!r) return Promise.resolve({
		photos: [],
		error: "badAddress",
		code: "photoFolderUnknown"
	});
	if (!n) {
		let e = ad(td.get(r));
		if (e) return Promise.resolve(e);
		if (nd.has(r)) return nd.get(r);
	}
	let i = (async () => {
		let e;
		try {
			let t = await fetch(r), n = await t.json().catch(() => null);
			e = t.ok ? {
				photos: Gu(n),
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
		return td.set(r, {
			at: Date.now(),
			value: e
		}), nd.delete(r), e;
	})();
	return nd.set(r, i), i;
}
function sd(e) {
	let t = rd(e), n = t ? id(t, e.order) : null;
	return n?.photos.length ? Ju(n.photos, e.order, Xu()).slice(0, Bu(e.folderMax)) : e.images ?? [];
}
function cd(e, t, n) {
	let r = rd(t);
	r && !id(r, t.order) && od(r, t.order).then((r) => {
		e.isConnected && r.photos.length && (e.textContent = "", e.removeAttribute("style"), e.className = "urd-bg-layer", n(e, t));
	}), n(e, t);
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/slideshow.js
var ld = {
	source: "upload",
	folder: "",
	order: "random",
	folderMax: Fu.dflt,
	style: "floating",
	motion: "drift",
	motionSpeed: Qa.dflt,
	interval: $a.dflt,
	fade: 1.5,
	count: Wa.dflt,
	seed: 0,
	size: null,
	spread: Ya.dflt,
	tilt: Xa.dflt,
	radius: Za.dflt,
	rows: 2,
	direction: "left",
	underNav: !0,
	underAnnounce: !1,
	repeat: !1,
	shape: "rect",
	look: "shadow",
	tone: "natural",
	frameColor: ""
}, ud = {
	version: 2,
	label: "Image gallery",
	labelKey: "bgLayer.slideshow",
	defaults: () => ({
		images: [],
		fit: "cover",
		opacity: .85,
		blur: 0,
		...ld
	}),
	migrations: { 1: (e) => ({
		...ld,
		style: "fill",
		motion: "none",
		interval: 6,
		opacity: 1,
		...e
	}) },
	render(e, t) {
		cd(e, t, fd);
	}
}, dd = (e, t) => {
	let n = document.createElement(e);
	return n.className = t, n;
};
function fd(e, t) {
	let n = so(t.style), r = sd(t).filter((e) => Bs(e?.src)), i = go(t.shape), a = _o(t.look);
	e.classList.add("urd-bg-slideshow", `urd-gallery-${n}`, `urd-gallery-tone-${vo(t.tone)}`), n !== "fill" && e.classList.add(`urd-gallery-shape-${i}`, `urd-gallery-look-${a}`), e.style.setProperty("--urd-frame-radius", `${wo(t.radius)}px`), r.length || e.classList.add("urd-bg-demo"), e.style.opacity = String(t.opacity ?? .85);
	let o = ho(a, t.frameColor);
	o && e.style.setProperty("--urd-frame-color", Ns(o));
	let s = t.underNav === !1 ? ["var(--urd-announce-h, 0px)", "var(--urd-nav-own-h, 0px)"] : t.underAnnounce === !0 ? [] : ["var(--urd-announce-h, 0px)"], c = s.length ? `calc(${s.join(" + ")})` : "", l = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, u = co(n, t.motion), d = {
		el: e,
		props: t,
		style: n,
		images: r,
		motion: u,
		shape: i,
		look: a,
		aspect: yo(i, a),
		moves: uo({
			style: n,
			motion: u,
			reducedMotion: l
		}),
		reduced: l,
		seed: Do(t.seed, Xu()),
		time: To(t.motionSpeed),
		dwell: xo(t.interval),
		dpr: window.devicePixelRatio || 1
	};
	Cd[n](d), c && (e.style.top = n === "fill" && t.blur > 0 ? `calc(${c} - ${t.blur * 2}px)` : c);
}
function pd(e, t, n, r, i) {
	let a = t[n];
	e.style.backgroundImage = `url("${a ? Qu(a.src, r) : ro(i)}")`, e.style.backgroundPosition = a ? fu(a.x, a.y) : "";
}
function md({ el: e, props: t, images: n, motion: r, reduced: i, dpr: a, dwell: o }) {
	let s = !n.length, c = s ? io(3) : n, l = Zu(window.innerWidth, a);
	t.blur > 0 && (e.style.filter = `blur(${t.blur}px)`, e.style.inset = `-${t.blur * 2}px`);
	let u = Math.max(0, Number(t.fade) || 0);
	e.style.setProperty("--urd-bgg-fade", `${u}s`);
	let d = uu(r === "drift" ? "drift" : r === "kenburns" ? "kenburns" : "none"), f = (e) => {
		let n = dd("div", e ? "urd-bg-slide on" : "urd-bg-slide");
		return d !== "none" && (n.classList.add("urd-bg-motion", `urd-bg-motion-${d}`), n.style.animationDuration = `${du(t.motionSpeed)}s`), n;
	}, p = (e, n) => {
		e.style.backgroundImage = `url("${s ? n.src : Qu(n.src, l)}")`, e.style.backgroundSize = s ? "240px auto" : pu(t.fit), e.style.backgroundRepeat = s ? "repeat" : "no-repeat", e.style.backgroundPosition = s ? "" : fu(n.x, n.y);
	}, m = new Image();
	if (m.src = s ? c[0].src : Qu(c[0].src, l), !m.complete) {
		e.style.visibility = "hidden";
		let t = () => {
			e.style.visibility = "";
		};
		m.addEventListener("load", t, { once: !0 }), m.addEventListener("error", t, { once: !0 });
	}
	let h = f(!0);
	if (p(h, c[0]), e.appendChild(h), !au({
		count: c.length,
		reducedMotion: i
	})) return;
	let g = f(!1);
	e.appendChild(g);
	let _ = 0, v = h, y = Math.max(ou(o, { fallback: $a.dflt }), u + .5) * 1e3, b = setInterval(() => {
		if (!h.isConnected) {
			clearInterval(b);
			return;
		}
		if (document.hidden) return;
		let e = iu(_, 1, c.length), t = new Image();
		t.src = s ? c[e].src : Qu(c[e].src, l);
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
function hd(e, t, n, r, i) {
	let a = dd("div", "urd-gallery-skin"), o = dd("div", "urd-gallery-face");
	return pd(o, t, n, r, i), a.appendChild(o), e.appendChild(a), {
		skin: a,
		face: o
	};
}
function gd(e, t) {
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
function _d({ frame: e, skin: t, face: n }, r, i, a) {
	let { motion: o, moves: s, time: c } = a;
	if (!s) return;
	let l = `-${(r.phase * c).toFixed(2)}s`;
	if (o === "drift" || o === "rise") {
		e.classList.add("urd-gallery-travel");
		let t = gd(r, o);
		e.style.setProperty("--tx0", t.tx0), e.style.setProperty("--ty0", t.ty0), e.style.setProperty("--tx1", t.tx1), e.style.setProperty("--ty1", t.ty1), e.style.animationDuration = `${c}s`, e.style.animationDelay = l;
	} else if (o === "kenburns") e.classList.add("urd-gallery-kenburns"), e.style.animationDuration = `${c}s`, e.style.animationDelay = l;
	else if (o === "bounce") {
		e.style.left = "0", e.style.top = "0", e.style.translate = "0 0", e.classList.add("urd-gallery-bounce-x"), t.classList.add("urd-gallery-bounce-y");
		let n = c * (.8 + r.heading * .4), i = c * (.5 + r.phase * .35);
		e.style.animationDuration = `${n.toFixed(2)}s`, e.style.animationDelay = `-${(r.phase * n).toFixed(2)}s`, t.style.animationDuration = `${i.toFixed(2)}s`, t.style.animationDelay = `-${(r.heading * i).toFixed(2)}s`;
	}
}
function vd(e, t, n) {
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
			a >= 0 && (pd(t.face, r, a, t.width, i), c[i] = a, l[a] = ++u), n && (f += 1, yd(t, n(i, f, e.filter((e) => e !== t))));
		});
	});
}
function yd(e, t) {
	let n = t.w / 2 * 1.15, r = t.w / e.aspect / 2 * 1.15;
	e.frame.style.left = `clamp(${n.toFixed(1)}px, ${t.x}%, calc(100% - ${n.toFixed(1)}px))`, e.frame.style.top = `clamp(${r.toFixed(1)}px, ${t.y}%, calc(100% - ${r.toFixed(1)}px))`, e.frame.style.width = `${t.w}px`, e.frame.style.rotate = `${t.rot}deg`, e.x = t.x, e.y = t.y;
}
function bd(e) {
	let { el: t, props: n, style: r, images: i, seed: a, aspect: o, dpr: s } = e, c = {
		count: n.count,
		seed: a,
		size: n.size,
		spread: n.spread,
		tilt: n.tilt,
		style: r,
		repeat: n.repeat === !0
	};
	vd(Oo(i, c).map((n, r) => {
		let a = dd("div", "urd-gallery-box urd-gallery-frame" + (n.index < 0 ? " urd-gallery-frame-empty" : ""));
		a.style.aspectRatio = String(o);
		let c = Zu(n.w, s), { skin: l, face: u } = hd(a, i, n.index, c, r);
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
		return yd(d, n), _d(d, n, r, e), d;
	}), e, (e, t, n) => {
		let r = null, o = -1;
		for (let s = 0; s < 6; s += 1) {
			let l = Oo(i, {
				...c,
				seed: `${a}:${t * 6 + s}`
			})[e], u = Math.min(999, ...n.map((e) => Math.hypot(e.x - l.x, e.y - l.y)));
			u > o && (o = u, r = l);
		}
		return r;
	});
}
function xd(e) {
	let { el: t, props: n, images: r, moves: i, time: a, aspect: o, dpr: s } = e, c = Eo(n.rows), l = po(n.size, "band");
	t.style.setProperty("--urd-band-h", `${l}px`);
	let u = r.length || 8, d = Zu(l * o, s);
	for (let e = 0; e < c; e += 1) {
		let s = dd("div", "urd-gallery-band-row");
		i || s.classList.add("urd-ribbon-still");
		let c = dd("div", "urd-ribbon-track");
		n.direction === "right" != (e === 1) && c.classList.add("urd-ribbon-right"), c.style.setProperty("--urd-ribbon-ms", `${a * 1e3}ms`), e === 1 && (c.style.animationDelay = `-${(a / 3).toFixed(1)}s`);
		let l = (e) => {
			for (let t = 0; t < u; t += 1) {
				let n = dd("div", "urd-gallery-box urd-gallery-band-tile" + (r.length ? "" : " urd-gallery-frame-empty"));
				n.style.aspectRatio = String(o), hd(n, r, r.length ? t : -1, d, t), e.appendChild(n);
			}
		}, f = dd("div", "urd-ribbon-run");
		l(f);
		let p = dd("div", "urd-ribbon-run");
		p.setAttribute("aria-hidden", "true"), l(p), c.append(f, p), s.appendChild(c), t.appendChild(s);
	}
}
function Sd(e) {
	let { el: t, props: n, images: r, seed: i, dpr: a, motion: o, moves: s, time: c } = e, l = jo(n.count, i, r.length, n.repeat === !0);
	t.style.setProperty("--urd-mosaic-row", `${po(n.size, "mosaic")}px`);
	let u = Zu(po(n.size, "mosaic") * 2.2, a);
	vd(l.map((e, n) => {
		let i = dd("div", "urd-gallery-box urd-gallery-tile" + (r.length ? "" : " urd-gallery-frame-empty"));
		i.style.gridColumn = `span ${e.cols}`, i.style.gridRow = `span ${e.rows}`;
		let a = r.length ? n % r.length : -1, { face: l } = hd(i, r, a, u, n);
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
var Cd = {
	fill: md,
	floating: bd,
	band: xd,
	mosaic: Sd
}, wd = /* @__PURE__ */ R("<span class=\"toolbar-row\"><img class=\"site-icon-preview\" alt=\"\"/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/>", 1), Td = /* @__PURE__ */ R("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\" multiple=\"\"/></label> <!>", 1), Ed = /* @__PURE__ */ R("<p> </p>"), Dd = /* @__PURE__ */ R("<label> <input type=\"text\" placeholder=\"https://drive.google.com/drive/folders/...\"/></label> <label> <!></label> <label> <input type=\"number\" min=\"1\" max=\"60\"/></label> <button type=\"button\" class=\"ghost action\"><!> </button> <!>", 1), Od = /* @__PURE__ */ R("<label> <!></label> <!>", 1), kd = /* @__PURE__ */ R("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"6\" max=\"60\" step=\"1\"/>", 1), Ad = /* @__PURE__ */ R("<label> <!></label> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\"/>", 1), jd = /* @__PURE__ */ R("<button class=\"ghost row-tool\"></button>"), Md = /* @__PURE__ */ R("<span><span class=\"grad-grip\"><svg viewBox=\"0 0 16 16\" width=\"14\" height=\"14\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"13\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"13\" r=\"1.4\"></circle></svg></span> <!> <input type=\"range\" class=\"tb-grow\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value\"> </span> <!></span>"), Nd = /* @__PURE__ */ R("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/>", 1), Pd = /* @__PURE__ */ R("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\"/>", 1), Fd = /* @__PURE__ */ R("<label> <!></label> <!> <button class=\"ghost action\"> </button> <!> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\"/> <label> <!></label>", 1), Id = /* @__PURE__ */ R("<label> <!></label> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\"/>", 1), Ld = /* @__PURE__ */ R("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/>", 1), Rd = /* @__PURE__ */ R("<label> <!></label> <label> <!></label> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" step=\"2\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"180\" step=\"5\"/> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), zd = /* @__PURE__ */ R("<div class=\"sizefill\"><button type=\"button\" class=\"ghost\"> </button> <button type=\"button\" class=\"ghost\"> </button></div> <label> </label> <div class=\"focalpad\"><span class=\"focaldot\"></span></div> <label class=\"sub\"> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\"/> <label class=\"sub\"> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\"/>", 1), Bd = /* @__PURE__ */ R("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\"/> <label> <!></label>", 1), Vd = /* @__PURE__ */ R("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <label> <!></label> <label> </label> <div class=\"sizestep\"><button type=\"button\">−</button> <input type=\"number\" min=\"10\" max=\"400\"/> <span class=\"sizeunit\">%</span> <button type=\"button\">+</button></div> <!> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\"/> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!>", 1), Hd = /* @__PURE__ */ R("<label> <!></label> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.5\" max=\"90\" step=\"0.5\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\"/>", 1), Ud = /* @__PURE__ */ R("<label> <!></label> <label> <!></label>", 1), Wd = /* @__PURE__ */ R("<button type=\"button\" class=\"ghost action\"><!> </button>"), Gd = /* @__PURE__ */ R("<label> <input type=\"number\" max=\"20\"/></label> <label> <!></label> <label> <!></label> <!>", 1), Kd = /* @__PURE__ */ R("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"15\" step=\"1\"/>", 1), qd = /* @__PURE__ */ R("<label> <!></label>"), Jd = /* @__PURE__ */ R("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"48\" step=\"1\"/>", 1), Yd = /* @__PURE__ */ R("<!> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"60\" max=\"400\" step=\"2\"/> <!> <label> <!></label> <label> <!></label> <!> <!>", 1), Xd = /* @__PURE__ */ R("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.5\" max=\"90\" step=\"0.5\"/>", 1), Zd = /* @__PURE__ */ R("<label><input type=\"checkbox\"/> </label>"), Qd = /* @__PURE__ */ R("<!> <!> <label> <!></label> <!> <label> <!></label> <!> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\"/>", 1), $d = /* @__PURE__ */ R("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\"/>", 1), ef = /* @__PURE__ */ R("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"video/mp4,video/webm\"/></label> <label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <label> <!></label> <label class=\"sub\"> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label class=\"sub\"> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\"/> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!>", 1), tf = /* @__PURE__ */ R("<div class=\"bg-layer\"><span class=\"nav-line\"><!> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span> <!></div>"), nf = /* @__PURE__ */ R("<!> <label> <!></label> <button class=\"ghost action\"> </button>", 1);
function rf(e, t) {
	it(t, !0);
	let n = (e, t = f, n = f, r = f) => {
		var i = Yr(), a = M(i), o = (e) => {
			var i = Td(), a = M(i), o = j(a), s = P(o);
			D(a), ui(P(a, 2), 17, () => r().props.images ?? [], oi, (e, i, a) => {
				var o = wd(), s = M(o), c = j(s), l = P(c, 2), u = j(l);
				u.disabled = a === 0, H(u, () => q.up, !0), D(u);
				var d = P(u, 2);
				H(d, () => q.down, !0), D(d);
				var f = P(d, 2);
				H(f, () => q.cross, !0), D(f), D(l), D(s);
				var p = P(s, 2), m = j(p), h = N(P(m));
				D(p);
				var g = P(p, 2);
				U(g);
				var _ = P(g, 2), v = j(_), y = N(P(v));
				D(_);
				var b = P(_, 2);
				U(b), F((e, t, n, o, s) => {
					G(c, "src", I(i).src), d.disabled = a === r().props.images.length - 1, G(f, "title", e), B(m, `${t ?? ""} `), B(h, `${n ?? ""}%`), W(g, I(i).x ?? .5), B(v, `${o ?? ""} `), B(y, `${s ?? ""}%`), W(b, I(i).y ?? .5);
				}, [
					() => K("tip.removeImage"),
					() => K("lbl.focusX"),
					() => Math.round((I(i).x ?? .5) * 100),
					() => K("lbl.focusY"),
					() => Math.round((I(i).y ?? .5) * 100)
				]), L("click", u, () => we(t(), n(), a, -1)), L("click", d, () => we(t(), n(), a, 1)), L("click", f, () => Te(t(), n(), a)), L("input", g, (e) => Ee(t(), n(), a, "x", Number(e.target.value))), L("input", b, (e) => Ee(t(), n(), a, "y", Number(e.target.value))), z(e, o);
			}), F((e, t) => {
				G(a, "title", e), B(o, `${t ?? ""} `);
			}, [() => K("tip.bg.addImages"), () => K("ui.addImages")]), L("change", s, (e) => Ce(t(), n(), e)), z(e, i);
		};
		V(a, (e) => {
			(r().props.source ?? "upload") !== "folder" && e(o);
		}), z(e, i);
	}, r = (e, t = f, n = f, r = f) => {
		let i = /* @__PURE__ */ O(() => De(r()));
		var a = Od(), o = M(a), s = j(o), c = P(s);
		{
			let e = /* @__PURE__ */ O(() => I(i).source ?? "upload"), r = /* @__PURE__ */ O(() => [["upload", K("opt.photoSource.upload")], ["folder", K("opt.photoSource.folder")]]);
			J(c, {
				get value() {
					return I(e);
				},
				get options() {
					return I(r);
				},
				onchange: (e) => E(t(), n(), "source", e)
			});
		}
		D(o);
		var l = P(o, 2), u = (e) => {
			let a = /* @__PURE__ */ O(() => Vu(I(i).folder ?? "")), o = /* @__PURE__ */ O(() => !I(a) || I(a).provider === "drive" || I(a).provider === "nextcloud");
			var s = Dd(), c = M(s), l = j(c), u = P(l);
			U(u);
			let d;
			D(c);
			var f = P(c, 2), p = j(f), m = P(p);
			{
				let e = /* @__PURE__ */ O(() => I(o) || I(i).order === "random" ? I(i).order ?? "name" : "name"), r = /* @__PURE__ */ O(() => I(o) ? [
					["name", K("opt.folderOrder.name")],
					["newest", K("opt.folderOrder.newest")],
					["random", K("opt.folderOrder.random")]
				] : [["name", K("opt.folderOrder.listed")], ["random", K("opt.folderOrder.random")]]);
				J(m, {
					get value() {
						return I(e);
					},
					get options() {
						return I(r);
					},
					onchange: (e) => E(t(), n(), "order", e)
				});
			}
			D(f);
			var h = P(f, 2), g = j(h), _ = P(g);
			U(_), D(h);
			var v = P(h, 2), y = j(v);
			H(y, () => q.eye);
			var b = P(y);
			D(v);
			var x = P(v, 2), S = (e) => {
				var r = Ed();
				let i;
				var a = N(r, !0);
				F((e, t) => {
					i = Pi(r, 1, "folder-status", null, i, { err: e }), B(a, t);
				}, [() => be[xe(t(), n())].err, () => be[xe(t(), n())].text]), z(e, r);
			}, C = /* @__PURE__ */ O(() => be[xe(t(), n())]);
			V(x, (e) => {
				I(C) && e(S);
			}), F((e, t, n, r, o, s, m, y) => {
				G(c, "title", e), B(l, `${t ?? ""} `), W(u, I(i).folder ?? ""), d = Pi(u, 1, "", null, d, { "bad-target": n }), G(f, "title", r), B(p, `${o ?? ""} `), G(h, "title", s), B(g, `${m ?? ""} `), W(_, I(i).folderMax ?? 24), v.disabled = !I(a), B(b, ` ${y ?? ""}`);
			}, [
				() => K("tip.bg.photoFolder"),
				() => K("lbl.photoFolder"),
				() => (I(i).folder ?? "").trim() && !I(a),
				() => K("tip.bg.folderOrder"),
				() => K("lbl.folderOrder"),
				() => K("tip.bg.folderMax"),
				() => K("lbl.folderMax"),
				() => K("ui.checkFolder")
			]), L("change", u, (e) => E(t(), n(), "folder", e.target.value.trim())), L("change", _, (e) => E(t(), n(), "folderMax", Number(e.target.value))), L("click", v, () => Se(t(), n(), r())), z(e, s);
		};
		V(l, (e) => {
			(I(i).source ?? "upload") === "folder" && e(u);
		}), F((e, t) => {
			G(o, "title", e), B(s, `${t ?? ""} `);
		}, [() => K("tip.bg.photoSource"), () => K("lbl.photoSource")]), z(e, a);
	}, i = (e, t = f, n = f, r = f) => {
		var i = Od(), a = M(i), o = j(a), s = P(o);
		{
			let e = /* @__PURE__ */ O(() => r().props.motion ?? "none"), i = /* @__PURE__ */ O(() => [
				["none", K("common.none")],
				["kenburns", K("opt.bgMotion.kenburns")],
				["drift", K("opt.bgMotion.drift")]
			]);
			J(s, {
				get value() {
					return I(e);
				},
				get options() {
					return I(i);
				},
				onchange: (e) => E(t(), n(), "motion", e)
			});
		}
		D(a);
		var c = P(a, 2), l = (e) => {
			var i = kd(), a = M(i), o = j(a), s = N(P(o));
			D(a);
			var c = P(a, 2);
			U(c), F((e) => {
				B(o, `${e ?? ""} `), B(s, `${r().props.motionSpeed ?? 20 ?? ""} s`), W(c, r().props.motionSpeed ?? 20);
			}, [() => K("lbl.motionSpeed")]), L("input", c, (e) => E(t(), n(), "motionSpeed", Number(e.target.value))), z(e, i);
		};
		V(c, (e) => {
			(r().props.motion ?? "none") !== "none" && e(l);
		}), F((e, t) => {
			G(a, "title", e), B(o, `${t ?? ""} `);
		}, [() => K("tip.bg.imageMotion"), () => K("lbl.motion")]), z(e, i);
	}, a = nt("urd-editor"), o = /* @__PURE__ */ O(() => a.secBox), s = /* @__PURE__ */ O(() => a.sectionBg), c = /* @__PURE__ */ O(() => a.siteDraft), { BG_DEFS: l, BG_TYPES: u, compressMany: d, compressOrTrim: p, imageErrorText: m, newSeed: h, readVideoFile: g, reportUpload: _, setStatus: v, themeSwatches: y } = a, b = pn({});
	Nn(() => {
		for (let e of I(s)) {
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
	let x = /* @__PURE__ */ k("color");
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
		if (!i?.w || !i?.h || !I(o)?.w || !I(o)?.h) return;
		let a = I(o).h * i.w / (I(o).w * i.h), s = r === "cover" ? Math.max(1, a) : Math.min(1, a);
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
			["none", K("common.none")],
			["pan", K("opt.gradAnim.pan")],
			["pan-loop", K("opt.gradAnim.panLoop")],
			["rotate", K("opt.gradAnim.rotate")]
		],
		radial: [
			["none", K("common.none")],
			["pulse", K("opt.gradAnim.pulse")],
			["orbit", K("opt.gradAnim.orbit")]
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
	let me = /* @__PURE__ */ k(null);
	function he(e, t, n, r) {
		if (t.button !== 0) return;
		t.preventDefault();
		let i = t.currentTarget.closest(".bg-layer"), a = t.currentTarget.closest(".grad-stop");
		A(me, {
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
			A(me, {
				...I(me),
				insert: n
			}, !0);
		}, u = () => {
			window.removeEventListener("pointermove", l), window.removeEventListener("pointerup", u), c.remove();
			let t = I(me);
			if (A(me, null), !t) return;
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
	let be = pn({}), xe = (e, t) => `${e.keyPrefix}-${e.keyId}-${t}`;
	async function Se(e, t, n) {
		let r = xe(e, t);
		be[r] = {
			text: K("status.folderChecking"),
			err: !1
		};
		let i = await od(n.props.folder, n.props.order, { force: !0 });
		be[r] = i.photos.length ? {
			text: ya("status.folderFound", i.photos.length, { count: i.photos.length }),
			err: !1
		} : {
			text: ba(i) ?? K("status.folderNone"),
			err: !0
		};
	}
	async function Ce(e, t, n) {
		let r = [...n.target.files ?? []];
		if (n.target.value = "", !r.length) return;
		v(K("status.compressingImages"));
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
	let De = (e) => (e.version ?? 1) < ud.version ? ud.migrations[1](e.props ?? {}) : e.props ?? {};
	var Oe = nf(), ke = M(Oe);
	ui(ke, 17, () => t.layers, oi, (e, a, o) => {
		var s = tf(), l = j(s), d = j(l);
		{
			let e = /* @__PURE__ */ O(() => K("tip.bg.changeType")), n = /* @__PURE__ */ O(() => u.map(([e, t]) => [e, t.labelKey ? K(t.labelKey) : t.label]));
			J(d, {
				get value() {
					return I(a).type;
				},
				get title() {
					return I(e);
				},
				get options() {
					return I(n);
				},
				onchange: (e) => ge(t.bg, o, e)
			});
		}
		var f = P(d, 2), p = j(f);
		p.disabled = o === 0, H(p, () => q.up, !0), D(p);
		var m = P(p, 2);
		H(m, () => q.down, !0), D(m);
		var g = P(m, 2);
		H(g, () => q.cross, !0), D(g), D(f), D(l);
		var _ = P(l, 2), v = (e) => {
			var n = Ad(), r = M(n), i = j(r), s = P(i);
			{
				let e = /* @__PURE__ */ O(y), n = /* @__PURE__ */ O(() => K("tip.bg.layerColor"));
				rl(s, {
					get value() {
						return I(a).props.value;
					},
					get tokens() {
						return I(e);
					},
					get label() {
						return I(n);
					},
					onchange: (e) => E(t.bg, o, "value", e)
				});
			}
			D(r);
			var c = P(r, 2), l = j(c), u = N(P(l));
			D(c);
			var d = P(c, 2);
			U(d), F((e, t, n) => {
				B(i, `${e ?? ""} `), B(l, `${t ?? ""} `), B(u, `${n ?? ""}%`), W(d, I(a).props.opacity ?? 1);
			}, [
				() => K("lbl.color"),
				() => K("lbl.strength"),
				() => Math.round((I(a).props.opacity ?? 1) * 100)
			]), L("input", d, (e) => E(t.bg, o, "opacity", Number(e.target.value))), z(e, n);
		}, b = (e) => {
			let n = /* @__PURE__ */ O(() => ae(I(a))), r = /* @__PURE__ */ O(() => I(n).stops.reduce((e, t) => e + Math.max(0, Number(t.share) || 0), 0));
			var i = Fd(), s = M(i), c = j(s), l = P(c);
			{
				let e = /* @__PURE__ */ O(() => I(n).kind ?? "linear"), r = /* @__PURE__ */ O(() => [["linear", K("opt.grad.linear")], ["radial", K("opt.grad.radial")]]);
				J(l, {
					get value() {
						return I(e);
					},
					get options() {
						return I(r);
					},
					onchange: (e) => le(t.bg, o, e)
				});
			}
			D(s);
			var u = P(s, 2);
			ui(u, 17, () => I(n).stops, oi, (e, i, a) => {
				var s = Md();
				let c;
				var l = j(s), u = P(l, 2);
				{
					let e = /* @__PURE__ */ O(y), n = /* @__PURE__ */ O(() => K("tip.bg.stopColor"));
					rl(u, {
						get value() {
							return I(i).color;
						},
						get tokens() {
							return I(e);
						},
						get label() {
							return I(n);
						},
						onchange: (e) => ue(t.bg, o, a, { color: e })
					});
				}
				var d = P(u, 2);
				U(d);
				var f = P(d, 2), p = N(f), m = P(f, 2), h = (e) => {
					var n = jd();
					H(n, () => q.cross, !0), D(n), F((e) => G(n, "title", e), [() => K("tip.bg.removeStop")]), L("click", n, () => fe(t.bg, o, a)), z(e, n);
				};
				V(m, (e) => {
					I(n).stops.length > 2 && e(h);
				}), D(s), F((e, t, r) => {
					c = Pi(s, 1, "nav-line grad-stop", null, c, {
						dragging: I(me)?.layer === o && I(me).from === a,
						"drop-above": I(me)?.layer === o && I(me).insert === a,
						"drop-below": I(me)?.layer === o && I(me).insert === I(n).stops.length && a === I(n).stops.length - 1
					}), G(l, "title", e), W(d, I(i).share ?? 50), G(d, "title", t), B(p, `${r ?? ""}%`);
				}, [
					() => K("tip.bg.dragStop"),
					() => K("tip.bg.stopShare"),
					() => I(r) > 0 ? Math.round(Math.max(0, Number(I(i).share) || 0) / I(r) * 100) : Math.round(100 / I(n).stops.length)
				]), L("pointerdown", l, (e) => he(t.bg, e, o, a)), L("input", d, (e) => ue(t.bg, o, a, { share: Number(e.target.value) })), z(e, s);
			});
			var d = P(u, 2), f = N(d, !0), p = P(d, 2), m = (e) => {
				var r = Nd(), i = M(r), a = j(i), s = N(P(a));
				D(i);
				var c = P(i, 2);
				U(c);
				var l = P(c, 2), u = j(l), d = N(P(u));
				D(l);
				var f = P(l, 2);
				U(f), F((e, t, r, i) => {
					B(a, `${e ?? ""} `), B(s, `${t ?? ""}%`), W(c, I(n).x ?? .5), B(u, `${r ?? ""} `), B(d, `${i ?? ""}%`), W(f, I(n).y ?? .5);
				}, [
					() => K("lbl.centerX"),
					() => Math.round((I(n).x ?? .5) * 100),
					() => K("lbl.centerY"),
					() => Math.round((I(n).y ?? .5) * 100)
				]), L("input", c, (e) => se(t.bg, o, "x", Number(e.target.value))), L("input", f, (e) => se(t.bg, o, "y", Number(e.target.value))), z(e, r);
			}, h = (e) => {
				var r = Pd(), i = M(r), a = j(i), s = N(P(a));
				D(i);
				var c = P(i, 2);
				U(c), F((e) => {
					B(a, `${e ?? ""} `), B(s, `${I(n).angle ?? ""}°`), W(c, I(n).angle);
				}, [() => K("lbl.angle")]), L("input", c, (e) => se(t.bg, o, "angle", Number(e.target.value))), z(e, r);
			};
			V(p, (e) => {
				(I(n).kind ?? "linear") === "radial" ? e(m) : e(h, -1);
			});
			var g = P(p, 2), _ = j(g), v = N(P(_));
			D(g);
			var b = P(g, 2);
			U(b);
			var x = P(b, 2), S = j(x), C = P(S);
			{
				let e = /* @__PURE__ */ O(() => I(n).animation ?? "none");
				J(C, {
					get value() {
						return I(e);
					},
					get options() {
						return ce[(I(n).kind ?? "linear") === "radial" ? "radial" : "linear"];
					},
					onchange: (e) => se(t.bg, o, "animation", e)
				});
			}
			D(x), F((e, t, r, i, a, o, s) => {
				B(c, `${e ?? ""} `), G(d, "title", t), B(f, r), B(_, `${i ?? ""} `), B(v, `${a ?? ""}%`), W(b, I(n).opacity ?? 1), G(x, "title", o), B(S, `${s ?? ""} `);
			}, [
				() => K("blocks.shape"),
				() => K("tip.bg.addStop"),
				() => K("ui.addStop"),
				() => K("lbl.strength"),
				() => Math.round((I(n).opacity ?? 1) * 100),
				() => K("tip.bg.motion"),
				() => K("lbl.motion")
			]), L("click", d, () => de(t.bg, o)), L("input", b, (e) => se(t.bg, o, "opacity", Number(e.target.value))), z(e, i);
		}, x = (e) => {
			var n = Id(), r = M(n), i = j(r), s = P(i);
			{
				let e = /* @__PURE__ */ O(y), n = /* @__PURE__ */ O(() => K("tip.bg.glowColor"));
				rl(s, {
					get value() {
						return I(a).props.color;
					},
					get tokens() {
						return I(e);
					},
					get label() {
						return I(n);
					},
					onchange: (e) => E(t.bg, o, "color", e)
				});
			}
			D(r);
			var c = P(r, 2), l = j(c), u = N(P(l));
			D(c);
			var d = P(c, 2);
			U(d);
			var f = P(d, 2), p = j(f), m = N(P(p));
			D(f);
			var h = P(f, 2);
			U(h);
			var g = P(h, 2), _ = j(g), v = N(P(_));
			D(g);
			var b = P(g, 2);
			U(b);
			var x = P(b, 2), S = j(x), C = N(P(S));
			D(x);
			var w = P(x, 2);
			U(w), F((e, t, n, r, o, s, c, f, g) => {
				B(i, `${e ?? ""} `), B(l, `${t ?? ""} `), B(u, `${n ?? ""}%`), W(d, I(a).props.x), B(p, `${r ?? ""} `), B(m, `${o ?? ""}%`), W(h, I(a).props.y), B(_, `${s ?? ""} `), B(v, `${c ?? ""}%`), W(b, I(a).props.radius), B(S, `${f ?? ""} `), B(C, `${g ?? ""}%`), W(w, I(a).props.opacity);
			}, [
				() => K("lbl.color"),
				() => K("lbl.posX"),
				() => Math.round(I(a).props.x * 100),
				() => K("lbl.posY"),
				() => Math.round(I(a).props.y * 100),
				() => K("lbl.size"),
				() => Math.round(I(a).props.radius * 100),
				() => K("lbl.strength"),
				() => Math.round(I(a).props.opacity * 100)
			]), L("input", d, (e) => E(t.bg, o, "x", Number(e.target.value))), L("input", h, (e) => E(t.bg, o, "y", Number(e.target.value))), L("input", b, (e) => E(t.bg, o, "radius", Number(e.target.value))), L("input", w, (e) => E(t.bg, o, "opacity", Number(e.target.value))), z(e, n);
		}, S = (e) => {
			var n = Ld(), r = M(n), i = j(r), s = N(P(i));
			D(r);
			var c = P(r, 2);
			U(c), F((e, t) => {
				B(i, `${e ?? ""} `), B(s, `${t ?? ""}%`), W(c, I(a).props.opacity);
			}, [() => K("lbl.strength"), () => Math.round(I(a).props.opacity * 100)]), L("input", c, (e) => E(t.bg, o, "opacity", Number(e.target.value))), z(e, n);
		}, te = (e) => {
			var n = Rd(), r = M(n), i = j(r), s = P(i);
			{
				let e = /* @__PURE__ */ O(() => Kl(I(a).props.pattern)), n = /* @__PURE__ */ O(() => Hl.map((e) => [e, K(`opt.bgPattern.${e}`)]));
				J(s, {
					get value() {
						return I(e);
					},
					get options() {
						return I(n);
					},
					onchange: (e) => E(t.bg, o, "pattern", e)
				});
			}
			D(r);
			var c = P(r, 2), l = j(c), u = P(l);
			{
				let e = /* @__PURE__ */ O(() => I(a).props.color ?? "text"), n = /* @__PURE__ */ O(y), r = /* @__PURE__ */ O(() => K("lbl.color"));
				rl(u, {
					get value() {
						return I(e);
					},
					get tokens() {
						return I(n);
					},
					get label() {
						return I(r);
					},
					onchange: (e) => E(t.bg, o, "color", e)
				});
			}
			D(c);
			var d = P(c, 2), f = j(d), p = N(P(f));
			D(d);
			var m = P(d, 2);
			U(m);
			var h = P(m, 2), g = j(h), _ = N(P(g));
			D(h);
			var v = P(h, 2);
			U(v);
			var b = P(v, 2), x = j(b), S = N(P(x));
			D(b);
			var C = P(b, 2);
			U(C);
			var w = P(C, 2), T = j(w);
			U(T);
			var ee = P(T);
			D(w), F((e, t, n, r, o, s, c, u) => {
				B(i, `${e ?? ""} `), B(l, `${t ?? ""} `), B(f, `${n ?? ""} `), B(p, `${I(a).props.size ?? Ul.dflt ?? ""} px`), G(m, "min", Ul.min), G(m, "max", Ul.max), W(m, I(a).props.size ?? Ul.dflt), B(g, `${r ?? ""} `), B(_, `${o ?? ""}%`), W(v, I(a).props.opacity ?? .12), B(x, `${s ?? ""} `), B(S, `${I(a).props.rotation ?? 0 ?? ""}°`), W(C, I(a).props.rotation ?? 0), G(w, "title", c), Vi(T, I(a).props.invert === !0), B(ee, ` ${u ?? ""}`);
			}, [
				() => K("lbl.bgPattern"),
				() => K("lbl.color"),
				() => K("lbl.size"),
				() => K("lbl.strength"),
				() => Math.round((I(a).props.opacity ?? .12) * 100),
				() => K("lbl.patternRotation"),
				() => K("tip.bg.patternInvert"),
				() => K("lbl.patternInvert")
			]), L("input", m, (e) => E(t.bg, o, "size", Number(e.target.value))), L("input", v, (e) => E(t.bg, o, "opacity", Number(e.target.value))), L("input", C, (e) => E(t.bg, o, "rotation", Number(e.target.value))), L("change", T, (e) => E(t.bg, o, "invert", e.target.checked)), z(e, n);
		}, oe = (e) => {
			let n = /* @__PURE__ */ O(() => I(a).props.fit === "tile" || I(a).props.fit === "repeat");
			var r = Vd(), s = M(r), c = j(s), l = P(c);
			D(s);
			var u = P(s, 2), d = j(u), f = P(d);
			{
				let e = /* @__PURE__ */ O(() => I(n) ? "tile" : "plain"), r = /* @__PURE__ */ O(() => [["plain", K("opt.img.plain")], ["tile", K("opt.img.tile")]]);
				J(f, {
					get value() {
						return I(e);
					},
					get options() {
						return I(r);
					},
					onchange: (e) => E(t.bg, o, "fit", e)
				});
			}
			D(u);
			var p = P(u, 2), m = N(p, !0), h = P(p, 2), g = j(h), _ = P(g, 2);
			U(_);
			var v = P(_, 4);
			D(h);
			var y = P(h, 2), b = (e) => {
				var n = zd(), r = M(n), i = j(r), s = N(i, !0), c = P(i, 2), l = N(c, !0);
				D(r);
				var u = P(r, 2), d = N(u, !0), f = P(u, 2), p = P(f, 2), m = j(p), h = N(P(m));
				D(p);
				var g = P(p, 2);
				U(g);
				var _ = P(g, 2), v = j(_), y = N(P(v));
				D(_);
				var b = P(_, 2);
				U(b), F((e, t, n, r, o, p, _, x, S, C, w, T) => {
					G(i, "title", e), B(s, t), G(c, "title", n), B(l, r), G(u, "title", o), B(d, p), Ii(f, `--fx:${_ ?? ""}%; --fy:${x ?? ""}%`), B(m, `${S ?? ""} `), B(h, `${C ?? ""}%`), W(g, I(a).props.x ?? .5), B(v, `${w ?? ""} `), B(y, `${T ?? ""}%`), W(b, I(a).props.y ?? .5);
				}, [
					() => K("tip.bg.cover"),
					() => K("ui.cover"),
					() => K("opt.fitFrame.contain"),
					() => K("opt.fit.contain"),
					() => K("tip.bg.position"),
					() => K("lbl.position"),
					() => Math.max(0, Math.min(1, I(a).props.x ?? .5)) * 100,
					() => Math.max(0, Math.min(1, I(a).props.y ?? .5)) * 100,
					() => K("lbl.horizontal"),
					() => Math.round((I(a).props.x ?? .5) * 100),
					() => K("lbl.vertical"),
					() => Math.round((I(a).props.y ?? .5) * 100)
				]), L("click", i, () => ie(t.bg, o, I(a), "cover")), L("click", c, () => ie(t.bg, o, I(a), "contain")), L("pointerdown", f, (e) => ee(e, t.bg, o, "xy")), L("input", g, (e) => E(t.bg, o, "x", Number(e.target.value))), L("input", b, (e) => E(t.bg, o, "y", Number(e.target.value))), z(e, n);
			};
			V(y, (e) => {
				I(n) || e(b);
			});
			var x = P(y, 2), S = j(x), C = N(P(S));
			D(x);
			var w = P(x, 2);
			U(w);
			var T = P(w, 2), te = j(T), ae = N(P(te));
			D(T);
			var oe = P(T, 2);
			U(oe);
			var se = P(oe, 2);
			i(se, () => t.bg, () => o, () => I(a));
			var ce = P(se, 2), le = j(ce);
			U(le);
			var ue = P(le);
			D(ce);
			var de = P(ce, 2), fe = (e) => {
				var n = Bd(), r = M(n), i = j(r), s = N(P(i));
				D(r);
				var c = P(r, 2);
				U(c);
				var l = P(c, 2), u = j(l), d = P(u);
				{
					let e = /* @__PURE__ */ O(() => I(a).props.bleed ?? "none"), n = /* @__PURE__ */ O(() => [
						["none", K("common.none")],
						["up", K("opt.bleed.up")],
						["down", K("opt.bleed.down")],
						["both", K("opt.brand.both")]
					]);
					J(d, {
						get value() {
							return I(e);
						},
						get options() {
							return I(n);
						},
						onchange: (e) => E(t.bg, o, "bleed", e)
					});
				}
				D(l), F((e, t, n, r) => {
					B(i, `${e ?? ""} `), B(s, `${t ?? ""}%`), W(c, I(a).props.parallax ?? .3), G(l, "title", n), B(u, `${r ?? ""} `);
				}, [
					() => K("lbl.parallaxStrength"),
					() => Math.round((I(a).props.parallax ?? 0) * 100),
					() => K("tip.bg.bleed"),
					() => K("lbl.bleed")
				]), L("input", c, (e) => E(t.bg, o, "parallax", Number(e.target.value))), z(e, n);
			};
			V(de, (e) => {
				(I(a).props.parallax ?? 0) > 0 && e(fe);
			}), F((e, t, n, r, i, o, l, f, h, y, b, x, T, E) => {
				G(s, "title", e), B(c, `${t ?? ""} `), G(u, "title", n), B(d, `${r ?? ""} `), G(p, "title", i), B(m, o), G(g, "title", l), W(_, f), G(v, "title", h), B(S, `${y ?? ""} `), B(C, `${I(a).props.blur ?? 0 ?? ""} px`), W(w, I(a).props.blur ?? 0), B(te, `${b ?? ""} `), B(ae, `${x ?? ""}%`), W(oe, I(a).props.opacity ?? 1), G(ce, "title", T), Vi(le, (I(a).props.parallax ?? 0) > 0), B(ue, ` ${E ?? ""}`);
			}, [
				() => K("tip.webpAuto"),
				() => I(a).props.src ? K("ui.changeImage") : K("ui.chooseImage"),
				() => K("tip.bg.fit"),
				() => K("lbl.imageFit"),
				() => K("tip.bg.size"),
				() => K("lbl.size"),
				() => K("tip.smaller"),
				() => Math.round((I(a).props.size ?? 1) * 100),
				() => K("tip.larger"),
				() => K("lbl.blur"),
				() => K("lbl.strength"),
				() => Math.round((I(a).props.opacity ?? 1) * 100),
				() => K("tip.bg.parallax"),
				() => K("lbl.parallax")
			]), L("change", l, (e) => _e(t.bg, o, e)), L("click", g, () => ne(t.bg, o, I(a).props.size ?? 1, -.05)), L("change", _, (e) => re(t.bg, o, e.target.value)), L("click", v, () => ne(t.bg, o, I(a).props.size ?? 1, .05)), L("input", w, (e) => E(t.bg, o, "blur", Number(e.target.value))), L("input", oe, (e) => E(t.bg, o, "opacity", Number(e.target.value))), L("change", le, (e) => E(t.bg, o, "parallax", e.target.checked ? .3 : 0)), z(e, r);
		}, pe = (e) => {
			let i = /* @__PURE__ */ O(() => De(I(a))), s = /* @__PURE__ */ O(() => I(i).style ?? "floating"), l = /* @__PURE__ */ O(() => co(I(s), I(i).motion)), u = /* @__PURE__ */ O(() => (I(i).seed ?? 0) > 0);
			var d = Qd(), f = M(d);
			r(f, () => t.bg, () => o, () => I(a));
			var p = P(f, 2);
			n(p, () => t.bg, () => o, () => I(a));
			var m = P(p, 2), g = j(m), _ = P(g);
			{
				let e = /* @__PURE__ */ O(() => La.map((e) => [e, K(`opt.galleryStyle.${e}`)]));
				J(_, {
					get value() {
						return I(s);
					},
					get options() {
						return I(e);
					},
					onchange: (e) => E(t.bg, o, "style", e)
				});
			}
			D(m);
			var v = P(m, 2), b = (e) => {
				var n = Hd(), r = M(n), a = j(r), s = P(a);
				{
					let e = /* @__PURE__ */ O(() => I(i).fit ?? "cover"), n = /* @__PURE__ */ O(() => [["cover", K("opt.fit.cover")], ["contain", K("opt.fit.contain")]]);
					J(s, {
						get value() {
							return I(e);
						},
						get options() {
							return I(n);
						},
						onchange: (e) => E(t.bg, o, "fit", e)
					});
				}
				D(r);
				var c = P(r, 2), l = j(c), u = N(P(l));
				D(c);
				var d = P(c, 2);
				U(d);
				var f = P(d, 2), p = j(f), m = N(P(p));
				D(f);
				var h = P(f, 2);
				U(h);
				var g = P(h, 2), _ = j(g), v = N(P(_));
				D(g);
				var y = P(g, 2);
				U(y), F((e, t, n, r, o) => {
					B(a, `${e ?? ""} `), B(l, `${t ?? ""} `), B(u, `${I(i).interval ?? 12 ?? ""} s`), W(d, I(i).interval ?? 12), B(p, `${n ?? ""} `), B(m, `${r ?? ""} s`), W(h, I(i).fade ?? 1.5), B(_, `${o ?? ""} `), B(v, `${I(i).blur ?? 0 ?? ""} px`), W(y, I(i).blur ?? 0);
				}, [
					() => K("lbl.imageFit"),
					() => K("lbl.secondsPerImage"),
					() => K("lbl.transition"),
					() => (I(i).fade ?? 1.5).toFixed(1),
					() => K("lbl.blur")
				]), L("input", d, (e) => E(t.bg, o, "interval", Number(e.target.value))), L("input", h, (e) => E(t.bg, o, "fade", Number(e.target.value))), L("input", y, (e) => E(t.bg, o, "blur", Number(e.target.value))), z(e, n);
			}, x = (e) => {
				var n = Yd(), r = M(n), a = (e) => {
					var n = Ud(), r = M(n), a = j(r), s = P(a);
					{
						let e = /* @__PURE__ */ O(() => String(I(i).rows ?? 2));
						J(s, {
							get value() {
								return I(e);
							},
							options: [["1", "1"], ["2", "2"]],
							onchange: (e) => E(t.bg, o, "rows", Number(e))
						});
					}
					D(r);
					var c = P(r, 2), l = j(c), u = P(l);
					{
						let e = /* @__PURE__ */ O(() => I(i).direction ?? "left"), n = /* @__PURE__ */ O(() => [["left", K("opt.ribbonDir.left")], ["right", K("opt.ribbonDir.right")]]);
						J(u, {
							get value() {
								return I(e);
							},
							get options() {
								return I(n);
							},
							onchange: (e) => E(t.bg, o, "direction", e)
						});
					}
					D(c), F((e, t) => {
						B(a, `${e ?? ""} `), B(l, `${t ?? ""} `);
					}, [() => K("lbl.galleryRows"), () => K("lbl.photoDirection")]), z(e, n);
				}, c = (e) => {
					var n = Gd(), r = M(n), a = j(r), c = P(a);
					U(c), D(r);
					var l = P(r, 2), d = j(l), f = P(d);
					{
						let e = /* @__PURE__ */ O(() => I(i).repeat === !0 ? "repeat" : "once"), n = /* @__PURE__ */ O(() => [["once", K("opt.galleryRepeat.once")], ["repeat", K("opt.galleryRepeat.repeat")]]);
						J(f, {
							get value() {
								return I(e);
							},
							get options() {
								return I(n);
							},
							onchange: (e) => E(t.bg, o, "repeat", e === "repeat")
						});
					}
					D(l);
					var p = P(l, 2), m = j(p), g = P(m);
					{
						let e = /* @__PURE__ */ O(() => I(u) ? "fixed" : "random"), n = /* @__PURE__ */ O(() => [["random", K("opt.galleryPlace.random")], ["fixed", K("opt.galleryPlace.fixed")]]);
						J(g, {
							get value() {
								return I(e);
							},
							get options() {
								return I(n);
							},
							onchange: (e) => E(t.bg, o, "seed", e === "fixed" ? h() : 0)
						});
					}
					D(p);
					var _ = P(p, 2), v = (e) => {
						var n = Wd(), r = j(n);
						H(r, () => q.shuffle);
						var i = P(r);
						D(n), F((e, t) => {
							G(n, "title", e), B(i, ` ${t ?? ""}`);
						}, [() => K("tip.bg.photoSeed"), () => K("ui.shufflePhotos")]), L("click", n, () => E(t.bg, o, "seed", h())), z(e, n);
					};
					V(_, (e) => {
						I(u) && e(v);
					}), F((e, t, n, o, u, f) => {
						G(r, "title", e), B(a, `${t ?? ""} `), G(c, "min", I(s) === "mosaic" ? 4 : 1), W(c, I(i).count ?? (I(s) === "mosaic" ? 12 : 8)), G(l, "title", n), B(d, `${o ?? ""} `), G(p, "title", u), B(m, `${f ?? ""} `);
					}, [
						() => K("tip.bg.photoCount"),
						() => K("lbl.photoCount"),
						() => K("tip.bg.galleryRepeat"),
						() => K("lbl.galleryRepeat"),
						() => K("tip.bg.galleryPlace"),
						() => K("lbl.galleryPlace")
					]), L("change", c, (e) => E(t.bg, o, "count", Number(e.target.value))), z(e, n);
				};
				V(r, (e) => {
					I(s) === "band" ? e(a) : e(c, -1);
				});
				var l = P(r, 2), d = j(l), f = N(P(d));
				D(l);
				var p = P(l, 2);
				U(p);
				var m = P(p, 2), g = (e) => {
					var n = Kd(), r = M(n), a = j(r), s = N(P(a));
					D(r);
					var c = P(r, 2);
					U(c);
					var l = P(c, 2), u = j(l), d = N(P(u));
					D(l);
					var f = P(l, 2);
					U(f), F((e, t, n, o) => {
						G(r, "title", e), B(a, `${t ?? ""} `), B(s, `${n ?? ""}%`), W(c, I(i).spread ?? .85), B(u, `${o ?? ""} `), B(d, `${I(i).tilt ?? 5 ?? ""}°`), W(f, I(i).tilt ?? 5);
					}, [
						() => K("tip.bg.photoSpread"),
						() => K("lbl.photoSpread"),
						() => Math.round((I(i).spread ?? .85) * 100),
						() => K("lbl.photoTilt")
					]), L("input", c, (e) => E(t.bg, o, "spread", Number(e.target.value))), L("input", f, (e) => E(t.bg, o, "tilt", Number(e.target.value))), z(e, n);
				};
				V(m, (e) => {
					I(s) === "floating" && e(g);
				});
				var _ = P(m, 2), v = j(_), b = P(v);
				{
					let e = /* @__PURE__ */ O(() => I(i).shape ?? "rect"), n = /* @__PURE__ */ O(() => Ra.map((e) => [e, K(`opt.galleryShape.${e}`)]));
					J(b, {
						get value() {
							return I(e);
						},
						get options() {
							return I(n);
						},
						onchange: (e) => E(t.bg, o, "shape", e)
					});
				}
				D(_);
				var x = P(_, 2), S = j(x), C = P(S);
				{
					let e = /* @__PURE__ */ O(() => I(i).look ?? "shadow"), n = /* @__PURE__ */ O(() => za.map((e) => [e, K(`opt.galleryLook.${e}`)]));
					J(C, {
						get value() {
							return I(e);
						},
						get options() {
							return I(n);
						},
						onchange: (e) => E(t.bg, o, "look", e)
					});
				}
				D(x);
				var w = P(x, 2), T = (e) => {
					var n = qd(), r = j(n), a = P(r);
					{
						let e = /* @__PURE__ */ O(() => ho(I(i).look, I(i).frameColor)), n = /* @__PURE__ */ O(y), r = /* @__PURE__ */ O(() => K("tip.bg.frameColor"));
						rl(a, {
							get value() {
								return I(e);
							},
							get tokens() {
								return I(n);
							},
							allowClear: !0,
							get label() {
								return I(r);
							},
							onchange: (e) => E(t.bg, o, "frameColor", e ?? "")
						});
					}
					D(n), F((e) => B(r, `${e ?? ""} `), [() => K("lbl.frameColor")]), z(e, n);
				}, ee = /* @__PURE__ */ O(() => mo(I(i).look));
				V(w, (e) => {
					I(ee) && e(T);
				});
				var te = P(w, 2), ne = (e) => {
					var n = Jd(), r = M(n), a = j(r), s = N(P(a));
					D(r);
					var c = P(r, 2);
					U(c), F((e) => {
						B(a, `${e ?? ""} `), B(s, `${I(i).radius ?? 5 ?? ""} px`), W(c, I(i).radius ?? 5);
					}, [() => K("lbl.rounding")]), L("input", c, (e) => E(t.bg, o, "radius", Number(e.target.value))), z(e, n);
				}, re = /* @__PURE__ */ O(() => bo(I(i).shape) && (I(i).look ?? "shadow") !== "polaroid");
				V(te, (e) => {
					I(re) && e(ne);
				}), F((e, t, n, r, i, a, o) => {
					B(d, `${e ?? ""} `), B(f, `${t ?? ""} px`), W(p, n), G(_, "title", r), B(v, `${i ?? ""} `), G(x, "title", a), B(S, `${o ?? ""} `);
				}, [
					() => K("lbl.size"),
					() => po(I(i).size, I(s)),
					() => po(I(i).size, I(s)),
					() => K("tip.bg.galleryShape"),
					() => K("lbl.galleryShape"),
					() => K("tip.bg.galleryLook"),
					() => K("lbl.galleryLook")
				]), L("input", p, (e) => E(t.bg, o, "size", Number(e.target.value))), z(e, n);
			};
			V(v, (e) => {
				I(s) === "fill" ? e(b) : e(x, -1);
			});
			var S = P(v, 2), C = j(S), w = P(C);
			{
				let e = /* @__PURE__ */ O(() => I(i).tone ?? "natural"), n = /* @__PURE__ */ O(() => Ba.map((e) => [e, K(`opt.galleryTone.${e}`)]));
				J(w, {
					get value() {
						return I(e);
					},
					get options() {
						return I(n);
					},
					onchange: (e) => E(t.bg, o, "tone", e)
				});
			}
			D(S);
			var ee = P(S, 2), te = (e) => {
				var n = qd(), r = j(n), i = P(r);
				{
					let e = /* @__PURE__ */ O(() => lo(I(s)).map((e) => [e, K(e === "none" ? "common.none" : `opt.galleryMotion.${e}`)]));
					J(i, {
						get value() {
							return I(l);
						},
						get options() {
							return I(e);
						},
						onchange: (e) => E(t.bg, o, "motion", e)
					});
				}
				D(n), F((e, t) => {
					G(n, "title", e), B(r, `${t ?? ""} `);
				}, [() => K("tip.bg.photoMotion"), () => K("lbl.motion")]), z(e, n);
			}, ne = /* @__PURE__ */ O(() => lo(I(s)).length > 1);
			V(ee, (e) => {
				I(ne) && e(te);
			});
			var re = P(ee, 2), ie = (e) => {
				var n = Xd(), r = M(n), a = j(r), s = N(P(a));
				D(r);
				var c = P(r, 2);
				U(c), F((e) => {
					B(a, `${e ?? ""} `), B(s, `${I(i).interval ?? 12 ?? ""} s`), W(c, I(i).interval ?? 12);
				}, [() => K("lbl.secondsPerImage")]), L("input", c, (e) => E(t.bg, o, "interval", Number(e.target.value))), z(e, n);
			}, ae = (e) => {
				var n = Xd(), r = M(n), a = j(r), s = N(P(a));
				D(r);
				var c = P(r, 2);
				U(c), F((e) => {
					B(a, `${e ?? ""} `), B(s, `${I(i).motionSpeed ?? 30 ?? ""} s`), W(c, I(i).motionSpeed ?? 30);
				}, [() => K("lbl.motionSpeed")]), L("input", c, (e) => E(t.bg, o, "motionSpeed", Number(e.target.value))), z(e, n);
			};
			V(re, (e) => {
				I(l) === "crossfade" && I(s) !== "fill" ? e(ie) : (I(l) !== "none" || I(s) === "band") && e(ae, 1);
			});
			var oe = P(re, 2), se = j(oe);
			U(se);
			var ce = P(se);
			D(oe);
			var le = P(oe, 2), ue = (e) => {
				var n = Zd();
				let r;
				var a = j(n);
				U(a);
				var s = P(a);
				D(n), F((e, t) => {
					r = Pi(n, 1, "gridmenu-snap", null, r, { muted: I(i).underNav === !1 }), G(n, "title", e), Vi(a, I(i).underAnnounce === !0), a.disabled = I(i).underNav === !1, B(s, ` ${t ?? ""}`);
				}, [() => K("tip.bg.underAnnounce"), () => K("lbl.underAnnounce")]), L("change", a, (e) => e.target.checked ? T(t.bg, o, {
					underAnnounce: !0,
					underNav: !0
				}) : E(t.bg, o, "underAnnounce", !1)), z(e, n);
			};
			V(le, (e) => {
				I(c).nav?.announcement?.text && e(ue);
			});
			var de = P(le, 2), fe = j(de), pe = N(P(fe));
			D(de);
			var me = P(de, 2);
			U(me), F((e, t, n, r, a, o, s, c) => {
				G(m, "title", e), B(g, `${t ?? ""} `), G(S, "title", n), B(C, `${r ?? ""} `), G(oe, "title", a), Vi(se, I(i).underNav !== !1), B(ce, ` ${o ?? ""}`), B(fe, `${s ?? ""} `), B(pe, `${c ?? ""}%`), W(me, I(i).opacity ?? .85);
			}, [
				() => K("tip.bg.galleryStyle"),
				() => K("lbl.galleryStyle"),
				() => K("tip.bg.galleryTone"),
				() => K("lbl.galleryTone"),
				() => K("tip.bg.underNav"),
				() => K("lbl.underNav"),
				() => K("lbl.strength"),
				() => Math.round((I(i).opacity ?? .85) * 100)
			]), L("change", se, (e) => e.target.checked ? E(t.bg, o, "underNav", !0) : T(t.bg, o, {
				underNav: !1,
				underAnnounce: !1
			})), L("input", me, (e) => E(t.bg, o, "opacity", Number(e.target.value))), z(e, d);
		}, be = (e) => {
			var n = ef(), r = M(n), i = j(r), s = P(i);
			D(r);
			var c = P(r, 2), l = j(c), u = P(l);
			D(c);
			var d = P(c, 2), f = j(d), p = P(f);
			{
				let e = /* @__PURE__ */ O(() => I(a).props.fit ?? "cover"), n = /* @__PURE__ */ O(() => [["cover", K("opt.fit.cover")], ["contain", K("opt.fit.contain")]]);
				J(p, {
					get value() {
						return I(e);
					},
					get options() {
						return I(n);
					},
					onchange: (e) => E(t.bg, o, "fit", e)
				});
			}
			D(d);
			var m = P(d, 2), h = j(m), g = N(P(h));
			D(m);
			var _ = P(m, 2);
			U(_);
			var v = P(_, 2), y = j(v), b = N(P(y));
			D(v);
			var x = P(v, 2);
			U(x);
			var S = P(x, 2), C = j(S), w = N(P(C));
			D(S);
			var T = P(S, 2);
			U(T);
			var ee = P(T, 2), te = j(ee);
			U(te);
			var ne = P(te);
			D(ee);
			var re = P(ee, 2), ie = (e) => {
				var n = $d(), r = M(n), i = j(r), s = N(P(i));
				D(r);
				var c = P(r, 2);
				U(c), F((e, t) => {
					B(i, `${e ?? ""} `), B(s, `${t ?? ""}%`), W(c, I(a).props.parallax ?? .3);
				}, [() => K("lbl.parallaxStrength"), () => Math.round((I(a).props.parallax ?? 0) * 100)]), L("input", c, (e) => E(t.bg, o, "parallax", Number(e.target.value))), z(e, n);
			};
			V(re, (e) => {
				(I(a).props.parallax ?? 0) > 0 && e(ie);
			}), F((e, t, n, o, s, u, p, m, v, S, E, re, ie, ae) => {
				G(r, "title", e), B(i, `${t ?? ""} `), G(c, "title", n), B(l, `${o ?? ""} `), G(d, "title", s), B(f, `${u ?? ""} `), B(h, `${p ?? ""} `), B(g, `${m ?? ""}%`), W(_, I(a).props.x ?? .5), B(y, `${v ?? ""} `), B(b, `${S ?? ""}%`), W(x, I(a).props.y ?? .5), B(C, `${E ?? ""} `), B(w, `${re ?? ""}%`), W(T, I(a).props.opacity ?? 1), G(ee, "title", ie), Vi(te, (I(a).props.parallax ?? 0) > 0), B(ne, ` ${ae ?? ""}`);
			}, [
				() => K("tip.bg.videoFile"),
				() => I(a).props.src ? K("ui.changeVideo") : K("ui.chooseVideo"),
				() => K("tip.bg.poster"),
				() => I(a).props.poster ? K("ui.changeImage") : K("ui.choosePoster"),
				() => K("tip.bg.fit"),
				() => K("lbl.imageFit"),
				() => K("lbl.horizontal"),
				() => Math.round((I(a).props.x ?? .5) * 100),
				() => K("lbl.vertical"),
				() => Math.round((I(a).props.y ?? .5) * 100),
				() => K("lbl.strength"),
				() => Math.round((I(a).props.opacity ?? 1) * 100),
				() => K("tip.bg.parallax"),
				() => K("lbl.parallax")
			]), L("change", s, (e) => ve(t.bg, o, e)), L("change", u, (e) => ye(t.bg, o, e)), L("input", _, (e) => E(t.bg, o, "x", Number(e.target.value))), L("input", x, (e) => E(t.bg, o, "y", Number(e.target.value))), L("input", T, (e) => E(t.bg, o, "opacity", Number(e.target.value))), L("change", te, (e) => E(t.bg, o, "parallax", e.target.checked ? .3 : 0)), z(e, n);
		};
		V(_, (e) => {
			I(a).type === "color" ? e(v) : I(a).type === "gradient" ? e(b, 1) : I(a).type === "glow" ? e(x, 2) : I(a).type === "grain" ? e(S, 3) : I(a).type === "pattern" ? e(te, 4) : I(a).type === "image" ? e(oe, 5) : I(a).type === "slideshow" ? e(pe, 6) : I(a).type === "video" && e(be, 7);
		}), D(s), F((e, n, r) => {
			G(p, "title", e), G(m, "title", n), m.disabled = o === t.layers.length - 1, G(g, "title", r);
		}, [
			() => K("hint.bg.order"),
			() => K("hint.bg.order"),
			() => K("tip.bg.removeLayer")
		]), L("click", p, () => w(t.bg, o, -1)), L("click", m, () => w(t.bg, o, 1)), L("click", g, () => C(t.bg, o)), z(e, s);
	});
	var Ae = P(ke, 2), je = j(Ae), Me = P(je);
	{
		let e = /* @__PURE__ */ O(() => u.map(([e, t]) => [e, t.labelKey ? K(t.labelKey) : t.label]));
		J(Me, {
			get value() {
				return I(x);
			},
			get options() {
				return I(e);
			},
			onchange: (e) => A(x, e, !0)
		});
	}
	D(Ae);
	var Ne = P(Ae, 2), Pe = N(Ne, !0);
	F((e, t) => {
		B(je, `${e ?? ""} `), B(Pe, t);
	}, [() => K("lbl.newLayer"), () => K("ui.addLayer")]), L("click", Ne, () => S(t.bg, I(x))), z(e, Oe), at();
}
Br([
	"change",
	"click",
	"input",
	"pointerdown"
]);
//#endregion
//#region src/panels/NavPanel.svelte
var af = /* @__PURE__ */ R("<input/> <span class=\"toolbar-row\"><!> <input type=\"number\" class=\"tb-num\" min=\"8\" max=\"96\" placeholder=\"px\"/> <button><b> </b></button> <button><i> </i></button></span>", 1), of = /* @__PURE__ */ R("<img alt=\"\"/>"), sf = /* @__PURE__ */ R("<span class=\"logo-file\"> </span>"), cf = /* @__PURE__ */ R("<div class=\"logo-pick\"><span class=\"logo-thumb\"><!></span> <span class=\"logo-pick-col\"><label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <!></span></div> <div class=\"ctl-triple\"><div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\" min=\"12\" max=\"128\"/></div> <div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\"/></div> <div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\" min=\"0\" max=\"64\"/></div></div>", 1), lf = /* @__PURE__ */ R("<button type=\"button\"><!><span> </span></button>"), uf = /* @__PURE__ */ R("<span class=\"toolbar-row\"><span class=\"mini-label tb-grow\"> </span> <input type=\"number\" class=\"tb-num\" placeholder=\"1100\"/></span>"), df = /* @__PURE__ */ R("<!> <!> <span class=\"toolbar-row\"><span class=\"mini-label tb-grow\"> </span> <input type=\"number\" class=\"tb-num\"/></span>", 1), ff = /* @__PURE__ */ R("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), pf = /* @__PURE__ */ R("<!> <span class=\"toolbar-row\"><span class=\"mini-label tb-grow\"> </span> <input type=\"number\" class=\"tb-num\"/></span>", 1), mf = /* @__PURE__ */ R("<button> </button>"), hf = /* @__PURE__ */ R("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\"/> <input type=\"number\" class=\"tb-num\"/></div>"), gf = /* @__PURE__ */ R("<div class=\"ctl-pair\"><div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\"/></div> <div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\"/></div></div>"), _f = /* @__PURE__ */ R("<span class=\"toolbar-row ctl-end\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\" min=\"1\" max=\"8\"/> <span class=\"mini-label\"> </span> <!></span>"), vf = /* @__PURE__ */ R("<div class=\"ctl-field\"><span class=\"mini-label\"> </span> <div class=\"tile-grid cols-5\" role=\"group\"></div></div> <!>", 1), yf = /* @__PURE__ */ R("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), bf = /* @__PURE__ */ R("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"30\" max=\"80\" step=\"5\"/> <span class=\"gridmenu-value\"> </span></div> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"0\" max=\"400\" step=\"10\"/> <span class=\"gridmenu-value\"> </span></div> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"0\" max=\"1200\" step=\"20\"/> <span class=\"gridmenu-value\"> </span></div> <!>", 1), xf = /* @__PURE__ */ R("<!> <!>", 1), Sf = /* @__PURE__ */ R("<div class=\"mini-card\"><span class=\"mini-label\"> </span> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label></div>"), Cf = /* @__PURE__ */ R("<div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\"/></div>"), wf = /* @__PURE__ */ R("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label>"), Tf = /* @__PURE__ */ R("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <!> <!> <!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <!> <input type=\"range\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label> <!></label>", 1), Ef = /* @__PURE__ */ R("<button type=\"button\"><span> </span><span> </span></button>"), Df = /* @__PURE__ */ R("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\"/> <span class=\"gridmenu-value\"> </span></div>"), Of = /* @__PURE__ */ R("<div class=\"swatch-cell\"><!> <span class=\"mini-label\"> </span></div>"), kf = /* @__PURE__ */ R("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <input type=\"text\" class=\"field-filled\" placeholder=\"https://\"/></label>"), Af = /* @__PURE__ */ R("<button class=\"ghost\"> </button>"), jf = /* @__PURE__ */ R("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <input type=\"text\" class=\"field-filled\"/></label> <label> <!></label> <!> <!> <!> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <label> <!></label> <label> <!></label>", 1), Mf = /* @__PURE__ */ R("<span class=\"tool-move\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span>"), Nf = /* @__PURE__ */ R("<div class=\"mini-card\"><span class=\"tool-head\"><span class=\"mini-label\"> </span><!></span> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label></div>"), Pf = /* @__PURE__ */ R("<div class=\"mini-card\"><span class=\"tool-head\"><span class=\"mini-label\"> </span><!></span> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <button class=\"ghost action\"> </button></div>"), Ff = /* @__PURE__ */ R("<div class=\"mini-card\"><span class=\"tool-head\"><span class=\"mini-label\"> </span><!></span> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div>"), If = /* @__PURE__ */ R("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <input type=\"text\" class=\"field-filled\"/></label>"), Lf = /* @__PURE__ */ R("<span class=\"lrow-warn\"></span>"), Rf = /* @__PURE__ */ R("<span class=\"lrow-tile-mark\"><!></span> <span class=\"lrow-tile-name\"> </span>", 1), zf = /* @__PURE__ */ R("<span class=\"bad-target-note\"> </span>"), Bf = /* @__PURE__ */ R("<div class=\"lrow-body\"><!> <div class=\"lrow-fields\"><input class=\"field-filled\"/> <input/> <!> <span class=\"lrow-actions\"><!> <button class=\"linkish danger\"> </button></span></div></div>"), Vf = /* @__PURE__ */ R("<div><div class=\"lrow-head\" role=\"button\" tabindex=\"0\"><span class=\"lrow-mark\" aria-hidden=\"true\"><!></span> <span class=\"lrow-name\"> </span> <!> <span class=\"row-tools\" role=\"none\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span> <span class=\"lrow-chev\" aria-hidden=\"true\"></span></div> <!></div>"), Hf = /* @__PURE__ */ R("<div class=\"ctl-field\"><span class=\"mini-label\"> </span> <div class=\"tile-grid cols-3\" role=\"group\"></div></div> <!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"1\" max=\"24\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <div class=\"mini-card\"><span class=\"mini-label\"> </span> <span class=\"lbtn-pick\"><!> <span class=\"lbtn-name\"><!></span></span></div> <!> <button class=\"ghost action\"> </button>", 1), Uf = /* @__PURE__ */ R("<details class=\"group sub-fold\"><summary><span class=\"tool-head\"> <!></span></summary> <div class=\"group-items\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div></details>"), Wf = /* @__PURE__ */ R("<label> <!></label>"), Gf = /* @__PURE__ */ R("<div aria-hidden=\"true\"><span class=\"nav-grip\"></span> <div class=\"nav-item-main\"><span class=\"nav-item-name ghost-name\"> </span> <span class=\"ghost-target\"> </span></div></div>"), Kf = /* @__PURE__ */ R("<input class=\"nav-item-href\"/>"), qf = /* @__PURE__ */ R("<span class=\"nav-item-sub\"></span>"), Jf = /* @__PURE__ */ R("<!> <div><span class=\"nav-grip\" draggable=\"true\"></span> <div class=\"nav-item-main\"><input class=\"nav-item-name\"/> <div class=\"nav-item-target\"><!> <!></div></div> <span class=\"nav-actions\"><button class=\"ghost nav-act\"></button> <button class=\"ghost nav-act\"></button> <button class=\"ghost nav-act\"></button></span> <button class=\"ghost row-tool nav-more\"></button></div> <!>", 1), Yf = /* @__PURE__ */ R("<!> <div><span class=\"nav-grip\" draggable=\"true\"></span> <div class=\"nav-item-main\"><input class=\"nav-item-name\"/> <div class=\"nav-item-target\"><!> <!></div></div> <!> <span class=\"nav-actions\"><button class=\"ghost nav-act\"></button> <button class=\"ghost nav-act\"></button> <button class=\"ghost nav-act\"></button> <button class=\"ghost nav-act\"></button></span> <button class=\"ghost row-tool nav-more\"></button></div> <!> <!> <!>", 1), Xf = /* @__PURE__ */ R("<div class=\"panel-body\"><details class=\"group\"><summary> </summary> <div class=\"group-items\"><!> <!> <!> <!></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><div class=\"ctl-field\"><span class=\"mini-label\"> </span> <div class=\"tile-grid cols-3\" role=\"group\"></div></div> <!> <!> <!> <!> <!></div></details> <hr class=\"gridmenu-divider\"/> <details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><div class=\"seg cw-seg\"></div> <details class=\"sub-inset\"><summary> </summary> <div class=\"sub-inset-body\"><!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\"/> <input type=\"number\" class=\"tb-num\"/></div> <!></div></details></div></details> <hr class=\"gridmenu-divider\"/> <details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><!> <!></div></details> <hr class=\"gridmenu-divider\"/> <details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><!></div></details> <hr class=\"gridmenu-divider\"/> <details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><div class=\"ctl-pair\"><!> <div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\"/></div></div> <div class=\"ctl-pair\"><label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label></div> <div class=\"ctl-pair\"><label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <!></div> <div class=\"ctl-pair\"><label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label></div> <!> <div class=\"ctl-pair\"><label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <!></div> <!> <!></div></details> <hr class=\"gridmenu-divider\"/> <details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><div class=\"ctl-field\"><span class=\"mini-label\"> </span> <div class=\"tile-grid cols-5\" role=\"group\"></div></div> <!> <div class=\"swatch-row\"><!> <div class=\"swatch-cell\"><!> <span class=\"mini-label\"> </span></div> <div class=\"swatch-cell\"><!> <span class=\"mini-label\"> </span></div></div> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label></div></details> <hr class=\"gridmenu-divider\"/> <details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><!></div></details></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><!>  <!></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><div class=\"ctl-field\"><span class=\"mini-label\"> </span> <div role=\"group\"></div></div> <!> <!> <label> <input type=\"number\" min=\"1\" max=\"4\"/></label></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><div class=\"nav-list\" role=\"list\"></div> <button class=\"ghost action\"> </button> <span class=\"toolbar-row\"><input class=\"tb-grow\"/> <button class=\"ghost action\"> </button></span></div></details></div>");
function Zf(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.siteDraft), i = /* @__PURE__ */ O(() => n.bridge), { addPage: a, compressOrTrim: o, navBgCtx: s, setStatus: c, siteMutate: l, themeSwatches: u } = n, d = (e) => `<svg width="40" height="26" viewBox="0 0 40 26" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${e}</svg>`, p = {
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
	}, h = (e) => `<svg width="48" height="34" viewBox="0 0 48 34" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${e}</svg>`, _ = {
		card: h("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><rect x=\"10\" y=\"6\" width=\"28\" height=\"24\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.18\"/><path d=\"M15 13h18M15 19h14M15 25h16\" stroke-opacity=\"0.8\"/>"),
		flat: h("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><rect x=\"1\" y=\"6\" width=\"46\" height=\"24\" fill=\"currentColor\" fill-opacity=\"0.12\" stroke=\"none\"/><path d=\"M15 13h18M15 19h14M15 25h16\" stroke-opacity=\"0.8\"/>"),
		pills: h("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><rect x=\"10\" y=\"7\" width=\"28\" height=\"6\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.35\" stroke=\"none\"/><rect x=\"10\" y=\"16\" width=\"28\" height=\"6\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.2\" stroke=\"none\"/><rect x=\"10\" y=\"25\" width=\"28\" height=\"6\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.2\" stroke=\"none\"/>"),
		lines: h("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><path d=\"M12 12h24M12 21h24M12 30h24\" stroke-opacity=\"0.8\"/>"),
		flyout: h("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><rect x=\"1\" y=\"6\" width=\"46\" height=\"24\" fill=\"currentColor\" fill-opacity=\"0.12\" stroke=\"none\"/><path d=\"M6 13h10M6 19h8M22 13h10M22 19h8M38 13h6M38 19h4\" stroke-opacity=\"0.8\"/>")
	}, v = {
		grid: h("<rect x=\"1\" y=\"1\" width=\"46\" height=\"32\" rx=\"3\" stroke-opacity=\"0.35\"/><rect x=\"6\" y=\"6\" width=\"10\" height=\"10\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><rect x=\"19\" y=\"6\" width=\"10\" height=\"10\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><rect x=\"32\" y=\"6\" width=\"10\" height=\"10\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><path d=\"M7 20h8M20 20h8M33 20h8\" stroke-opacity=\"0.7\"/><path d=\"M6 26h10M19 26h10M32 26h10\" stroke-opacity=\"0.35\"/>"),
		list: h("<rect x=\"1\" y=\"1\" width=\"46\" height=\"32\" rx=\"3\" stroke-opacity=\"0.35\"/><rect x=\"6\" y=\"6\" width=\"7\" height=\"7\" rx=\"2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><rect x=\"6\" y=\"17\" width=\"7\" height=\"7\" rx=\"2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><path d=\"M17 9.5h24M17 20.5h18\" stroke-opacity=\"0.7\"/>"),
		cover: h("<rect x=\"1\" y=\"1\" width=\"46\" height=\"32\" rx=\"3\" stroke-opacity=\"0.35\"/><rect x=\"6\" y=\"6\" width=\"16\" height=\"12\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><rect x=\"26\" y=\"6\" width=\"16\" height=\"12\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><path d=\"M6 14h16M26 14h16\" stroke-opacity=\"0.55\" stroke-width=\"3\"/><path d=\"M6 23h12M26 23h12\" stroke-opacity=\"0.35\"/>")
	}, y = /* @__PURE__ */ k("");
	function b() {
		I(y).trim() && (n.newPageTitle = I(y), n.newPageTemplate = null, a() !== !1 && A(y, ""));
	}
	function x(e) {
		l("edit:nav-logo", () => {
			I(r).nav.logo = {
				type: "text",
				value: "",
				...I(r).nav.logo,
				...e
			};
		});
	}
	function S(e) {
		l("nav", () => {
			I(r).nav.logo ??= {
				type: "text",
				value: I(r).site.title
			};
			let t = I(r).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = I(r).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = I(r).site.title), delete t.image), t.type = e;
		});
	}
	async function C(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await o(t);
			l("nav", () => {
				let t = I(r).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			c(K("status.imageReadErrorSvg"), "error");
		}
	}
	function w(e) {
		l("nav", () => {
			I(r).nav.layout = e;
		});
	}
	let T = (e) => e !== "theme" || !!I(r).theme?.alt?.tokens, E = /* @__PURE__ */ O(() => Ks(I(r)?.nav?.style ?? {}).filter(T));
	function ee(e, t) {
		let n = Ks(I(r).nav.style ?? {}), i = n.indexOf(e), a = i + t;
		for (; a >= 0 && a < n.length && !T(n[a]);) a += t;
		i < 0 || a < 0 || a >= n.length || ([n[i], n[a]] = [n[a], n[i]], te("order", n));
	}
	function te(e, t) {
		l(`edit:nav-tools-${e}`, () => {
			I(r).nav.style ??= {};
			let n = { ...I(r).nav.style.tools ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? I(r).nav.style.tools = n : delete I(r).nav.style.tools;
		});
	}
	function ne(e, t) {
		l(`edit:nav-style-${e}`, () => {
			I(r).nav.style ??= {}, t === void 0 ? delete I(r).nav.style[e] : I(r).nav.style[e] = t;
		});
	}
	let re = /* @__PURE__ */ O(() => I(r)?.nav?.variant === "side-left" || I(r)?.nav?.variant === "side-right"), ie = /* @__PURE__ */ O(() => [
		"floating",
		"floating-square",
		"floating-tab"
	].includes(I(r)?.nav?.variant)), ae = /* @__PURE__ */ O(() => Ll(I(r)?.nav?.style)), oe = /* @__PURE__ */ O(() => Fl(I(r)?.nav?.style, I(r)?.nav?.variant)), se = /* @__PURE__ */ O(() => Il(I(r)?.nav?.style));
	function ce(e) {
		l("nav", () => {
			I(r).nav.style ??= {}, e === "md" ? delete I(r).nav.style.size : I(r).nav.style.size = e, delete I(r).nav.style.padY, delete I(r).nav.style.textSize;
		});
	}
	function le(e, t, n) {
		let i = e.target.value;
		ne(t, i === "" ? void 0 : Pl(i, n, void 0)), e.target.value = I(r).nav.style?.[t] ?? "";
	}
	function ue(e, t) {
		l(`edit:nav-mobile-${e}`, () => {
			I(r).nav.style ??= {};
			let n = { ...I(r).nav.style.mobile ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? I(r).nav.style.mobile = n : delete I(r).nav.style.mobile;
		});
	}
	let de = (e) => {
		let t = I(r)?.nav?.style?.mobile?.[e];
		return t === void 0 ? "" : t ? "on" : "off";
	}, fe = (e, t) => ue(e, t === "" ? void 0 : t === "on"), pe = (e) => ue("border", e ? {
		...I(r).nav.style?.mobile?.border ?? {},
		side: e
	} : void 0);
	function me(e, t) {
		l(`edit:nav-announce-${e}`, () => {
			let n = { ...I(r).nav.announcement ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? I(r).nav.announcement = n : delete I(r).nav.announcement;
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
	].map((t) => `<circle cx="${t}" cy="${e}" r="1.6"/>`)).join("") + "</svg>", ge = /* @__PURE__ */ k(null);
	function _e() {
		let e = I(r).nav?.launcher;
		return [e?.image, ...(e?.links ?? []).map((e) => e.image)].filter(Boolean);
	}
	function ve(e, t) {
		l("nav", () => {
			I(r).nav.launcher ??= { links: [] };
			let n = e === null ? I(r).nav.launcher : I(r).nav.launcher.links[e];
			t.image ? n.image = t.image : delete n.image, t.icon ? n.icon = t.icon : delete n.icon;
		});
	}
	function ye(e, t) {
		l(`edit:nav-launcher-${e}`, () => {
			I(r).nav.launcher ??= { links: [] }, t === void 0 ? delete I(r).nav.launcher[e] : I(r).nav.launcher[e] = t;
		});
	}
	function be() {
		l("nav", () => {
			I(r).nav.launcher ??= { links: [] }, I(r).nav.launcher.links ??= [], I(r).nav.launcher.links.push({
				label: K("seed.link"),
				href: "",
				icon: "globe"
			});
		});
	}
	function xe(e) {
		l("nav", () => {
			I(r).nav.launcher.links.splice(e, 1);
		});
	}
	function Se(e, t) {
		l("nav", () => {
			let n = I(r).nav.launcher.links, i = e + t;
			i < 0 || i >= n.length || ([n[e], n[i]] = [n[i], n[e]]);
		});
	}
	function Ce(e, t, n) {
		l(`edit:nav-launcher-${t}-${e}`, () => {
			I(r).nav.launcher.links[e][t] = n;
		});
	}
	async function we(e, t) {
		if (e) try {
			let n = await o(e);
			l("nav", () => {
				I(r).nav.launcher ??= { links: [] }, t === null ? I(r).nav.launcher.image = n.dataUrl : I(r).nav.launcher.links[t].image = n.dataUrl;
			});
		} catch {
			c(K("status.imageReadErrorSvg"), "error");
		}
	}
	function Te(e, t) {
		l(`edit:nav-sheet-${e}`, () => {
			I(r).nav.style ??= {};
			let n = { ...I(r).nav.style.sheet ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? I(r).nav.style.sheet = n : delete I(r).nav.style.sheet;
		});
	}
	function Ee(e, t, n) {
		let r = e.target.value;
		ne(t, r === "" ? void 0 : Pl(r, n, void 0)), e.target.value = I(t === "padY" ? oe : se);
	}
	function De(e, t, n) {
		let i = e.target.value;
		ue(t, i === "" ? void 0 : Pl(i, n, void 0)), e.target.value = I(r).nav.style?.mobile?.[t] ?? "";
	}
	function Oe(e) {
		let t = Pl(e / 100, wl, .5);
		ne("shrinkTo", t === .5 ? void 0 : t);
	}
	function Ae(e) {
		let t = Pl(e, Tl, 80);
		ne("shrinkAt", t === 80 ? void 0 : t);
	}
	function je(e) {
		let t = Pl(e, El, 220);
		ne("shrinkMs", t === 220 ? void 0 : t);
	}
	let Me = {
		underline: [K("hoverColor.underline.label"), K("hoverColor.underline.title")],
		pill: [K("hoverColor.pill.label"), K("hoverColor.pill.title")],
		lift: [K("hoverColor.lift.label"), K("hoverColor.lift.title")]
	}, Ne = /* @__PURE__ */ O(() => Me[I(r)?.nav?.style?.hover] ?? null), Pe = /* @__PURE__ */ O(() => [
		["grid", K("opt.launcherView.grid")],
		["list", K("opt.launcherView.list")],
		["cover", K("opt.launcherView.cover")]
	]), Fe = /* @__PURE__ */ O(() => I(re) ? [
		["card", K("common.standard")],
		["pills", K("opt.sub.pills")],
		["lines", K("opt.sub.lines")]
	] : [
		["card", K("opt.sub.card")],
		["flat", K("opt.sub.flat")],
		["pills", K("opt.sub.pills")],
		["lines", K("opt.sub.lines")],
		["flyout", K("opt.sub.flyout")]
	]);
	function Ie(e) {
		(I(r).nav.variant ?? "bar") !== e && l("nav", () => {
			e === "bar" ? delete I(r).nav.variant : I(r).nav.variant = e, I(r).nav.style && delete I(r).nav.style.radius;
		});
	}
	function Le(e) {
		l("nav", () => {
			I(r).nav.style ??= {}, e ? I(r).nav.style.glow = !0 : delete I(r).nav.style.glow;
		});
	}
	function Re(e) {
		l("nav", () => {
			I(r).nav.style ??= {}, e ? delete I(r).nav.style.topGap : I(r).nav.style.topGap = !1;
		});
	}
	function ze(e) {
		l("nav", () => {
			I(r).nav.style ??= {}, e === "standard" ? delete I(r).nav.style.hover : I(r).nav.style.hover = e;
		});
	}
	function Be(e, t) {
		l(`edit:nav-label-${e}`, () => {
			I(r).nav.items[e].label = t;
		});
	}
	function Ve(e, t) {
		l("nav", () => {
			let n = I(r).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function He(e, t) {
		l(`edit:nav-href-${e}`, () => {
			I(r).nav.items[e].href = t;
		});
	}
	function Ue(e, t) {
		let n = e + t, i = I(r).nav.items;
		n < 0 || n >= i.length || l("nav", () => {
			[i[e], i[n]] = [i[n], i[e]];
		});
	}
	function We(e) {
		l("nav", () => {
			I(r).nav.items.splice(e, 1);
		});
	}
	let Ge = /* @__PURE__ */ k(""), Ke = /* @__PURE__ */ k(""), qe = /* @__PURE__ */ k(null);
	function Je(e) {
		let [t, n] = e.split(".").map(Number), i = I(r).nav.items;
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
	function Ye(e, t, n, r) {
		if (!I(Ke) || I(Ke) === t) return null;
		let i = e.getBoundingClientRect(), a = (r - i.top) / i.height, o = n - i.left, s = Je(I(Ke)), c = Je(t), l = s.list[s.index], u;
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
		}, Xe(u, l, s);
	}
	function Xe(e, t, n) {
		let i = Je(e.key);
		if (i.parent) {
			if (i.parent === t) return null;
			t.children?.length && (e = {
				key: e.key.split(".")[0],
				pos: "after"
			}, i = Je(e.key));
		}
		let a = i.list[i.index];
		if (e.pos === "into") {
			let n = a.children ?? [];
			return n.length && n[n.length - 1] === t ? null : e;
		}
		let o = i.parent ? i.parent.children : I(r).nav.items, s = o.filter((e) => e !== t).indexOf(a) + +(e.pos === "after");
		return o === n.list && s === n.index ? null : e;
	}
	function Ze() {
		if (!I(Ke)) return {
			label: "",
			target: ""
		};
		let e = Je(I(Ke)), t = e.list[e.index], n = t.page ? I(r).pages.find((e) => e.id === t.page) : null;
		return {
			label: t.label,
			target: n ? n.title : t.href ?? K("opt.noLink")
		};
	}
	function Qe(e) {
		I(qe) && e?.dataTransfer?.dropEffect !== "none" && tt(I(qe).key), A(Ke, ""), A(qe, null);
	}
	Nn(() => {
		if (!I(Ke)) return;
		let e = (e) => e.preventDefault();
		return window.addEventListener("dragover", e), window.addEventListener("drop", e), () => {
			window.removeEventListener("dragover", e), window.removeEventListener("drop", e);
		};
	});
	let $e = "application/x-urd-nav-row";
	function et(e) {
		if (!I(Ke)) return;
		let t = [...e.currentTarget.querySelectorAll(".nav-item:not(.ghost)")];
		if (!t.length) return;
		let n = t.find((t) => {
			let n = t.getBoundingClientRect();
			return e.clientY >= n.top && e.clientY <= n.bottom;
		}), r = null;
		if (n) r = Ye(n, n.dataset.key, e.clientX, e.clientY);
		else {
			let n = Je(I(Ke)), i = n.list[n.index], a = t.find((t) => {
				let n = t.getBoundingClientRect();
				return n.top + n.height / 2 > e.clientY;
			});
			if (a) r = a.dataset.key === I(Ke) ? null : Xe({
				key: a.dataset.key,
				pos: "before"
			}, i, n);
			else {
				let e = [...t].reverse().find((e) => !e.classList.contains("child"));
				r = e.dataset.key === I(Ke) ? null : Xe({
					key: e.dataset.key,
					pos: "after"
				}, i, n);
			}
		}
		r ? (e.preventDefault(), (I(qe)?.key !== r.key || I(qe)?.pos !== r.pos) && A(qe, r, !0)) : A(qe, null);
	}
	function tt(e) {
		let t = I(Ke), n = I(qe);
		if (A(Ke, ""), A(qe, null), t && n && n.key === e && t !== e) {
			{
				let r = Je(t), i = Je(e), a = r.list[r.index];
				if (i.parent && (i.parent === a || a.children?.length) || n.pos === "into" && a.children?.length) return;
			}
			l("nav", () => {
				let i = I(r).nav.items, a = Je(t), o = Je(e), s = a.list[a.index], c = o.list[o.index];
				if (s !== c) {
					if (a.list.splice(a.index, 1), a.parent && a.parent.children.length === 0 && (delete a.parent.children, !a.parent.page && !a.parent.href && (a.parent.page = I(r).pages[0].id)), n.pos === "into") c.children ??= [], c.children.push(s);
					else {
						let e = o.parent ? o.parent.children : i, t = e.indexOf(c) + +(n.pos === "after");
						e.splice(t, 0, s);
					}
					!s.page && s.href == null && !s.children?.length && (s.page = I(r).pages[0].id);
				}
			}), A(Ge, "");
		}
	}
	let rt = "<svg width=\"10\" height=\"16\" viewBox=\"0 0 10 16\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"3\" cy=\"3\" r=\"1.3\"/><circle cx=\"7\" cy=\"3\" r=\"1.3\"/><circle cx=\"3\" cy=\"8\" r=\"1.3\"/><circle cx=\"7\" cy=\"8\" r=\"1.3\"/><circle cx=\"3\" cy=\"13\" r=\"1.3\"/><circle cx=\"7\" cy=\"13\" r=\"1.3\"/></svg>";
	function ot() {
		l("nav", () => {
			I(r).nav.items.push({
				label: K("seed.link"),
				page: I(r).pages[0].id
			});
		});
	}
	function st(e) {
		l("nav", () => {
			let t = I(r).nav.items[e];
			t.children ??= [], t.children.push({
				label: K("seed.link"),
				page: I(r).pages[0].id
			});
		});
	}
	function ct(e, t, n) {
		l(`edit:nav-child-label-${e}-${t}`, () => {
			I(r).nav.items[e].children[t].label = n;
		});
	}
	function lt(e, t, n) {
		l("nav", () => {
			let i = I(r).nav.items[e].children[t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function ut(e, t, n) {
		l(`edit:nav-child-href-${e}-${t}`, () => {
			I(r).nav.items[e].children[t].href = n;
		});
	}
	function dt(e, t, n) {
		let i = t + n, a = I(r).nav.items[e].children;
		i < 0 || i >= a.length || l("nav", () => {
			[a[t], a[i]] = [a[i], a[t]];
		});
	}
	function ft(e, t) {
		l("nav", () => {
			let n = I(r).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = I(r).pages[0].id));
		});
	}
	var pt = Xf(), mt = j(pt), ht = j(mt), gt = N(ht, !0), _t = P(ht, 2), vt = j(_t);
	{
		let e = /* @__PURE__ */ O(() => K("common.type")), t = /* @__PURE__ */ O(() => I(r).nav.logo?.type ?? "text"), n = /* @__PURE__ */ O(() => [
			["text", K("blocks.text")],
			["image", K("blocks.image")],
			["both", K("opt.logo.both")]
		]);
		Bl(vt, {
			get label() {
				return I(e);
			},
			get value() {
				return I(t);
			},
			get options() {
				return I(n);
			},
			onchange: (e) => S(e)
		});
	}
	var yt = P(vt, 2), bt = (e) => {
		var t = af(), n = M(t);
		U(n);
		var i = P(n, 2), a = j(i);
		{
			let e = /* @__PURE__ */ O(() => K("tip.nav.logoFont")), t = /* @__PURE__ */ O(() => I(r).nav.logo?.font ?? ""), n = /* @__PURE__ */ O(() => [["", K("common.inherit")], ...Vl.map(([e, t]) => [t, K(e)])]);
			J(a, {
				get title() {
					return I(e);
				},
				get value() {
					return I(t);
				},
				get options() {
					return I(n);
				},
				onchange: (e) => x({ font: e || void 0 })
			});
		}
		var o = P(a, 2);
		U(o);
		var s = P(o, 2);
		let c;
		var l = N(j(s), !0);
		D(s);
		var u = P(s, 2);
		let d;
		var f = N(j(u), !0);
		D(u), D(i), F((e, t, i, a, p, m, h) => {
			W(n, I(r).nav.logo?.value ?? ""), G(n, "placeholder", e), G(o, "title", t), W(o, I(r).nav.logo?.textSize ?? ""), c = Pi(s, 1, "tbtn", null, c, { active: I(r).nav.logo?.bold !== !1 }), G(s, "title", i), B(l, a), d = Pi(u, 1, "tbtn", null, d, { active: p }), G(u, "title", m), B(f, h);
		}, [
			() => K("ph.nav.logoName"),
			() => K("tip.nav.textSize"),
			() => K("format.bold"),
			() => K("format.boldLetter"),
			() => !!I(r).nav.logo?.italic,
			() => K("format.italic"),
			() => K("format.italicLetter")
		]), L("input", n, (e) => x({ value: e.target.value })), L("change", o, (e) => x({ textSize: e.target.value ? Number(e.target.value) : void 0 })), L("click", s, () => x({ bold: I(r).nav.logo?.bold === !1 })), L("click", u, () => x({ italic: !I(r).nav.logo?.italic })), z(e, t);
	};
	V(yt, (e) => {
		(I(r).nav.logo?.type ?? "text") !== "image" && e(bt);
	});
	var xt = P(yt, 2), St = (e) => {
		let t = /* @__PURE__ */ O(() => I(r).nav.logo?.type === "image" ? I(r).nav.logo?.value : I(r).nav.logo?.image);
		var n = cf(), i = M(n), a = j(i), o = j(a), s = (e) => {
			var n = of();
			F(() => G(n, "src", I(t))), z(e, n);
		};
		V(o, (e) => {
			I(t) && e(s);
		}), D(a);
		var c = P(a, 2), l = j(c), u = j(l), d = P(u);
		D(l);
		var f = P(l, 2), p = (e) => {
			var n = sf(), r = N(n, !0);
			F((e) => B(r, e), [() => I(t).split("/").pop()]), z(e, n);
		};
		V(f, (e) => {
			I(t) && e(p);
		}), D(c), D(i);
		var m = P(i, 2), h = j(m), g = j(h), _ = N(g, !0), v = P(g, 2);
		U(v), D(h);
		var y = P(h, 2), b = j(y), S = N(b, !0), w = P(b, 2);
		U(w), D(y);
		var T = P(y, 2), E = j(T), ee = N(E, !0), te = P(E, 2);
		U(te), D(T), D(m), F((e, t, n, i, a, o, s, c, d) => {
			G(l, "title", e), B(u, `${t ?? ""} `), G(h, "title", n), B(_, i), W(v, I(r).nav.logo?.size ?? 32), G(y, "title", a), B(S, o), G(w, "min", kl.min), G(w, "max", kl.max), G(w, "placeholder", s), W(w, I(r).nav.logo?.mobileSize ?? ""), G(T, "title", c), B(ee, d), W(te, I(r).nav.logo?.radius ?? 0);
		}, [
			() => K("tip.webpAuto"),
			() => I(t) ? K("ui.changeImage") : K("ui.chooseImage"),
			() => K("tip.nav.logoHeight"),
			() => K("lbl.height"),
			() => K("tip.nav.logoHeightMobile"),
			() => K("lbl.onMobile"),
			() => K("lbl.navSameAsDesktop"),
			() => K("tip.nav.logoRadius"),
			() => K("lbl.rounding")
		]), L("change", d, C), L("change", v, (e) => x({ size: Number(e.target.value) })), L("change", w, (e) => {
			let t = e.target.value;
			x({ mobileSize: t === "" ? void 0 : Pl(t, kl, void 0) }), e.target.value = I(r).nav.logo?.mobileSize ?? "";
		}), L("change", te, (e) => x({ radius: Number(e.target.value) })), z(e, n);
	};
	V(xt, (e) => {
		(I(r).nav.logo?.type ?? "text") !== "text" && e(St);
	});
	var Ct = P(xt, 2), wt = (e) => {
		{
			let t = /* @__PURE__ */ O(() => K("lbl.order")), n = /* @__PURE__ */ O(() => I(r).nav.logo?.order ?? "image-first"), i = /* @__PURE__ */ O(() => [["image-first", K("opt.logo.imageFirst")], ["text-first", K("opt.logo.textFirst")]]);
			Bl(e, {
				get label() {
					return I(t);
				},
				get value() {
					return I(n);
				},
				get options() {
					return I(i);
				},
				onchange: (e) => x({ order: e })
			});
		}
	};
	V(Ct, (e) => {
		I(r).nav.logo?.type === "both" && e(wt);
	}), D(_t), D(mt);
	var Tt = P(mt, 2), Et = j(Tt), Dt = N(Et, !0), Ot = P(Et, 2), kt = j(Ot), At = j(kt), jt = N(At, !0), Mt = P(At, 2), Nt = j(Mt), Pt = j(Nt), Ft = N(Pt, !0), It = P(Pt, 2);
	ui(It, 21, () => [
		["bar", K("opt.navVariant.bar")],
		["floating", K("opt.navVariant.floating")],
		["floating-square", K("opt.navVariant.floatingSquare")],
		["floating-tab", K("opt.navVariant.floatingTab")],
		["side-left", K("opt.navVariant.sideLeft")],
		["side-right", K("opt.navVariant.sideRight")]
	], ([e, t]) => e, (e, t) => {
		var n = /* @__PURE__ */ O(() => g(I(t), 2));
		let i = () => I(n)[0], a = () => I(n)[1];
		var o = lf();
		let s;
		var c = j(o);
		H(c, () => p[i()]);
		var l = N(P(c), !0);
		D(o), F(() => {
			s = Pi(o, 1, "tile", null, s, { on: (I(r).nav.variant ?? "bar") === i() }), G(o, "aria-pressed", (I(r).nav.variant ?? "bar") === i()), B(l, a());
		}), L("click", o, () => Ie(i())), z(e, o);
	}), D(It), D(Nt);
	var Lt = P(Nt, 2), Rt = (e) => {
		var t = df(), n = M(t);
		{
			let e = /* @__PURE__ */ O(() => K("lbl.navPillWidth")), t = /* @__PURE__ */ O(() => K("tip.nav.pillWidth")), i = /* @__PURE__ */ O(() => I(r).nav.style?.pillWidth === "content" ? "content" : "custom"), a = /* @__PURE__ */ O(() => [["content", K("opt.pillWidth.content")], ["custom", K("opt.pillWidth.custom")]]);
			Bl(n, {
				get label() {
					return I(e);
				},
				get title() {
					return I(t);
				},
				get value() {
					return I(i);
				},
				get options() {
					return I(a);
				},
				onchange: (e) => ne("pillWidth", e === "content" ? "content" : void 0)
			});
		}
		var i = P(n, 2), a = (e) => {
			var t = uf(), n = j(t), i = N(n, !0), a = P(n, 2);
			U(a), D(t), F((e, n) => {
				G(t, "title", e), B(i, n), G(a, "min", Cl.min), G(a, "max", Cl.max), G(a, "step", Cl.step), W(a, typeof I(r).nav.style?.pillWidth == "number" ? I(r).nav.style.pillWidth : "");
			}, [() => K("tip.nav.pillWidthPx"), () => K("lbl.navPillWidthPx")]), L("change", a, (e) => le(e, "pillWidth", Cl)), z(e, t);
		};
		V(i, (e) => {
			I(r).nav.style?.pillWidth !== "content" && e(a);
		});
		var o = P(i, 2), s = j(o), c = N(s, !0), l = P(s, 2);
		U(l), D(o), F((e, t) => {
			G(o, "title", e), B(c, t), G(l, "min", Dl.min), G(l, "max", Dl.max), G(l, "step", Dl.step), G(l, "placeholder", I(r).nav.variant === "floating-square" ? "0" : ""), W(l, typeof I(r).nav.style?.radius == "number" ? I(r).nav.style.radius : "");
		}, [() => K("tip.nav.radius"), () => K("lbl.navRadius")]), L("change", l, (e) => le(e, "radius", Dl)), z(e, t);
	};
	V(Lt, (e) => {
		I(ie) && e(Rt);
	});
	var zt = P(Lt, 2), Bt = (e) => {
		{
			let t = /* @__PURE__ */ O(() => K("lbl.navPlacement")), n = /* @__PURE__ */ O(() => I(r).nav.style?.sidePlacement ?? "top"), i = /* @__PURE__ */ O(() => [
				["top", K("opt.place.top")],
				["middle", K("opt.place.middle")],
				["bottom", K("opt.place.bottom")]
			]);
			Bl(e, {
				get label() {
					return I(t);
				},
				get value() {
					return I(n);
				},
				get options() {
					return I(i);
				},
				onchange: (e) => ne("sidePlacement", e === "top" ? void 0 : e)
			});
		}
	}, Vt = (e) => {
		{
			let t = /* @__PURE__ */ O(() => K("lbl.navPlacement")), n = /* @__PURE__ */ O(() => K("opt.layout.leftAfterLogo")), i = /* @__PURE__ */ O(() => I(r).nav.layout ?? "right"), a = /* @__PURE__ */ O(() => [
				["left", K("common.left")],
				["center", K("common.center")],
				["right", K("common.right")]
			]);
			Bl(e, {
				get label() {
					return I(t);
				},
				get title() {
					return I(n);
				},
				get value() {
					return I(i);
				},
				get options() {
					return I(a);
				},
				onchange: (e) => w(e)
			});
		}
	};
	V(zt, (e) => {
		I(re) ? e(Bt) : e(Vt, -1);
	});
	var Ht = P(zt, 2), Ut = (e) => {
		var t = ff(), n = M(t), i = j(n);
		U(i);
		var a = P(i);
		D(n);
		var o = P(n, 2), s = j(o);
		U(s);
		var c = P(s);
		D(o), F((e, t, l, u) => {
			G(n, "title", e), Vi(i, I(r).nav.style?.glow === !0), B(a, ` ${t ?? ""}`), G(o, "title", l), Vi(s, I(r).nav.style?.topGap !== !1), B(c, ` ${u ?? ""}`);
		}, [
			() => K("tip.nav.glow"),
			() => K("lbl.navGlow"),
			() => K("tip.nav.topGap"),
			() => K("lbl.navTopGap")
		]), L("change", i, (e) => Le(e.target.checked)), L("change", s, (e) => Re(e.target.checked)), z(e, t);
	};
	V(Ht, (e) => {
		I(ie) && e(Ut);
	});
	var Wt = P(Ht, 2), Gt = (e) => {
		var t = ff(), n = M(t), i = j(n);
		U(i);
		var a = P(i);
		D(n);
		var o = P(n, 2), s = j(o);
		U(s);
		var c = P(s);
		D(o), F((e, t, l, u) => {
			G(n, "title", e), Vi(i, I(r).nav.overlay === !0), B(a, ` ${t ?? ""}`), G(o, "title", l), Vi(s, I(r).nav.style?.inset !== !1), B(c, ` ${u ?? ""}`);
		}, [
			() => K("tip.nav.overlay"),
			() => K("lbl.navOverlay"),
			() => K("tip.nav.inset"),
			() => K("lbl.navInset")
		]), L("change", i, (e) => l("nav", () => {
			e.target.checked ? I(r).nav.overlay = !0 : delete I(r).nav.overlay;
		})), L("change", s, (e) => ne("inset", e.target.checked ? void 0 : !1)), z(e, t);
	};
	V(Wt, (e) => {
		!I(ie) && !I(re) && e(Gt);
	});
	var Kt = P(Wt, 2), qt = (e) => {
		var t = pf(), n = M(t);
		{
			let e = /* @__PURE__ */ O(() => K("lbl.textAlign")), t = /* @__PURE__ */ O(() => K("tip.nav.sideAlign")), i = /* @__PURE__ */ O(() => I(r).nav.style?.sideAlign ?? "left"), a = /* @__PURE__ */ O(() => [
				["left", K("common.left")],
				["center", K("common.center")],
				["right", K("common.right")]
			]);
			Bl(n, {
				get label() {
					return I(e);
				},
				get title() {
					return I(t);
				},
				get value() {
					return I(i);
				},
				get options() {
					return I(a);
				},
				onchange: (e) => ne("sideAlign", e === "left" ? void 0 : e)
			});
		}
		var i = P(n, 2), a = j(i), o = N(a, !0), s = P(a, 2);
		U(s), D(i), F((e, t) => {
			G(i, "title", e), B(o, t), G(s, "min", Ol.min), G(s, "max", Ol.max), W(s, I(r).nav.style?.width ?? 250);
		}, [() => K("tip.nav.colWidth"), () => K("lbl.navColWidth")]), L("change", s, (e) => {
			let t = Pl(e.target.value, Ol, 250);
			ne("width", t === 250 ? void 0 : t), e.target.value = I(r).nav.style?.width ?? 250;
		}), z(e, t);
	};
	V(Kt, (e) => {
		I(re) && e(qt);
	}), D(Mt), D(kt);
	var Jt = P(kt, 4), Yt = j(Jt), Xt = N(Yt, !0), Zt = P(Yt, 2), Qt = j(Zt);
	ui(Qt, 20, () => jl, (e) => e, (e, t) => {
		var n = mf();
		let r;
		var i = N(n, !0);
		F((e) => {
			r = Pi(n, 1, "", null, r, { on: I(ae) === t }), B(i, e);
		}, [() => K(`opt.size.${t}`)]), L("click", n, () => ce(t)), z(e, n);
	}), D(Qt);
	var $t = P(Qt, 2), en = j($t), tn = N(en, !0), nn = P(en, 2), rn = j(nn), an = (e) => {
		var t = hf(), n = j(t), r = N(n, !0), i = P(n, 2);
		U(i);
		var a = P(i, 2);
		U(a), D(t), F((e, n) => {
			G(t, "title", e), B(r, n), G(i, "min", yl.min), G(i, "max", yl.max), G(i, "step", yl.step), W(i, I(oe)), G(a, "min", yl.min), G(a, "max", yl.max), W(a, I(oe));
		}, [() => K("tip.nav.thickness"), () => K("lbl.navThickness")]), L("input", i, (e) => ne("padY", e.target.valueAsNumber)), L("change", a, (e) => Ee(e, "padY", yl)), z(e, t);
	};
	V(rn, (e) => {
		I(re) || e(an);
	});
	var on = P(rn, 2), sn = j(on), cn = N(sn, !0), ln = P(sn, 2);
	U(ln);
	var un = P(ln, 2);
	U(un), D(on);
	var dn = P(on, 2), fn = (e) => {
		var t = gf(), n = j(t), i = j(n), a = N(i, !0), o = P(i, 2);
		U(o), D(n);
		var s = P(n, 2), c = j(s), l = N(c, !0), u = P(c, 2);
		U(u), D(s), D(t), F((e, t, i, c, d, f) => {
			G(n, "title", e), B(a, t), G(o, "min", xl.min), G(o, "max", xl.max), G(o, "placeholder", i), W(o, I(r).nav.style?.padX ?? ""), G(s, "title", c), B(l, d), G(u, "min", Sl.min), G(u, "max", Sl.max), G(u, "placeholder", f), W(u, I(r).nav.style?.gap ?? "");
		}, [
			() => K("tip.nav.padX"),
			() => K("lbl.navPadX"),
			() => K("common.auto"),
			() => K("tip.nav.gap"),
			() => K("lbl.navGap"),
			() => K("common.auto")
		]), L("change", o, (e) => le(e, "padX", xl)), L("change", u, (e) => le(e, "gap", Sl)), z(e, t);
	};
	V(dn, (e) => {
		I(re) || e(fn);
	}), D(nn), D($t), D(Zt), D(Jt);
	var pn = P(Jt, 4), mn = j(pn), hn = N(mn, !0), gn = P(mn, 2), _n = j(gn), vn = (e) => {
		var t = vf(), n = M(t), i = j(n), a = N(i, !0), o = P(i, 2);
		ui(o, 21, () => [
			["", K("common.none")],
			["bottom", K("opt.navBorder.bottom")],
			["top", K("opt.navBorder.top")],
			["both", K("opt.navBorder.both")],
			["all", K("opt.navBorder.all")]
		], ([e, t]) => e, (e, t) => {
			var n = /* @__PURE__ */ O(() => g(I(t), 2));
			let i = () => I(n)[0], a = () => I(n)[1];
			var o = lf();
			let s;
			var c = j(o);
			H(c, () => m[i()]);
			var l = N(P(c), !0);
			D(o), F(() => {
				s = Pi(o, 1, "tile", null, s, { on: (I(r).nav.style?.border?.side ?? "") === i() }), G(o, "aria-pressed", (I(r).nav.style?.border?.side ?? "") === i()), B(l, a());
			}), L("click", o, () => ne("border", i() ? {
				...I(r).nav.style?.border ?? {},
				side: i()
			} : void 0)), z(e, o);
		}), D(o), D(n);
		var s = P(n, 2), c = (e) => {
			var t = _f(), n = j(t), i = N(n, !0), a = P(n, 2);
			U(a);
			var o = P(a, 2), s = N(o, !0), c = P(o, 2);
			{
				let e = /* @__PURE__ */ O(() => I(r).nav.style.border.color ?? "text"), t = /* @__PURE__ */ O(u), n = /* @__PURE__ */ O(() => K("tip.nav.borderColorPick"));
				rl(c, {
					get value() {
						return I(e);
					},
					get tokens() {
						return I(t);
					},
					get label() {
						return I(n);
					},
					onchange: (e) => ne("border", {
						...I(r).nav.style.border,
						color: e
					})
				});
			}
			D(t), F((e, t, c, l, u) => {
				G(n, "title", e), B(i, t), G(a, "title", c), W(a, I(r).nav.style.border.width ?? 1), G(o, "title", l), B(s, u);
			}, [
				() => K("tip.nav.borderWidth"),
				() => K("lbl.navBorderWidth"),
				() => K("tip.nav.borderWidth"),
				() => K("tip.nav.borderColorPick"),
				() => K("lbl.navBorderColor")
			]), L("change", a, (e) => {
				let t = Pl(e.target.value, {
					min: 1,
					max: 8
				}, 1), n = { ...I(r).nav.style.border };
				t === 1 ? delete n.width : n.width = t, ne("border", n), e.target.value = I(r).nav.style.border.width ?? 1;
			}), z(e, t);
		};
		V(s, (e) => {
			I(r).nav.style?.border?.side && e(c);
		}), F((e, t, r) => {
			G(n, "title", e), B(a, t), G(o, "aria-label", r);
		}, [
			() => K("tip.nav.border"),
			() => K("lbl.navBorder"),
			() => K("lbl.navBorder")
		]), z(e, t);
	};
	V(_n, (e) => {
		I(re) || e(vn);
	});
	var yn = P(_n, 2), bn = (e) => {
		{
			let t = /* @__PURE__ */ O(() => K("lbl.navShadow")), n = /* @__PURE__ */ O(() => K("tip.nav.shadow")), i = /* @__PURE__ */ O(() => I(r).nav.style?.shadow ?? ""), a = /* @__PURE__ */ O(() => [
				["", K("common.none")],
				["soft", K("opt.navShadow.soft")],
				["strong", K("opt.navShadow.strong")]
			]);
			Bl(e, {
				get label() {
					return I(t);
				},
				get title() {
					return I(n);
				},
				get value() {
					return I(i);
				},
				get options() {
					return I(a);
				},
				onchange: (e) => ne("shadow", e || void 0)
			});
		}
	};
	V(yn, (e) => {
		!I(ie) && !I(re) && e(bn);
	}), D(gn), D(pn);
	var xn = P(pn, 4), Sn = j(xn), Cn = N(Sn, !0), wn = P(Sn, 2), Tn = j(wn), En = (e) => {
		var t = Sf(), n = j(t), i = N(n, !0), a = P(n, 2), o = j(a);
		U(o);
		var s = P(o);
		D(a);
		var c = P(a, 2), u = (e) => {
			var t = xf(), n = M(t);
			{
				let e = /* @__PURE__ */ O(() => K("lbl.navScroll")), t = /* @__PURE__ */ O(() => K("tip.nav.scroll")), i = /* @__PURE__ */ O(() => I(r).nav.scroll ?? "none"), a = /* @__PURE__ */ O(() => [
					["none", K("opt.scroll.none")],
					["shrink", K("opt.scroll.shrink")],
					["hide", K("opt.scroll.hide")]
				]);
				Bl(n, {
					get label() {
						return I(e);
					},
					get title() {
						return I(t);
					},
					get value() {
						return I(i);
					},
					get options() {
						return I(a);
					},
					onchange: (e) => l("nav", () => {
						e === "none" ? delete I(r).nav.scroll : I(r).nav.scroll = e;
					})
				});
			}
			var i = P(n, 2), a = (e) => {
				var t = bf(), n = M(t), i = j(n), a = N(i, !0), o = P(i, 2);
				U(o);
				var s = N(P(o, 2));
				D(n);
				var c = P(n, 2), l = j(c), u = N(l, !0), d = P(l, 2);
				U(d);
				var f = N(P(d, 2));
				D(c);
				var p = P(c, 2), m = j(p), h = N(m, !0), g = P(m, 2);
				U(g);
				var _ = N(P(g, 2));
				D(p);
				var v = P(p, 2), y = (e) => {
					var t = yf(), n = j(t);
					U(n);
					var i = P(n);
					D(t), F((e, a) => {
						G(t, "title", e), Vi(n, I(r).nav.style?.shrinkLogo === !0), B(i, ` ${a ?? ""}`);
					}, [() => K("tip.nav.shrinkLogo"), () => K("lbl.navShrinkLogo")]), L("change", n, (e) => ne("shrinkLogo", e.target.checked ? !0 : void 0)), z(e, t);
				};
				V(v, (e) => {
					(I(r).nav.logo?.type ?? "text") !== "text" && e(y);
				}), F((e, t, i, l, m, v, y, b) => {
					G(n, "title", e), B(a, t), W(o, i), B(s, `${l ?? ""}%`), G(c, "title", m), B(u, v), W(d, I(r).nav.style?.shrinkAt ?? 80), B(f, `${I(r).nav.style?.shrinkAt ?? 80 ?? ""} px`), G(p, "title", y), B(h, b), W(g, I(r).nav.style?.shrinkMs ?? 220), B(_, `${I(r).nav.style?.shrinkMs ?? 220 ?? ""} ms`);
				}, [
					() => K("tip.nav.shrinkTo"),
					() => K("lbl.navShrinkTo"),
					() => Math.round((I(r).nav.style?.shrinkTo ?? .5) * 100),
					() => Math.round((I(r).nav.style?.shrinkTo ?? .5) * 100),
					() => K("tip.nav.shrinkAt"),
					() => K("lbl.navShrinkAt"),
					() => K("tip.nav.shrinkMs"),
					() => K("lbl.navShrinkMs")
				]), L("input", o, (e) => Oe(e.target.valueAsNumber)), L("input", d, (e) => Ae(e.target.valueAsNumber)), L("input", g, (e) => je(e.target.valueAsNumber)), z(e, t);
			};
			V(i, (e) => {
				I(r).nav.scroll === "shrink" && e(a);
			}), z(e, t);
		};
		V(c, (e) => {
			I(r).nav.sticky !== !1 && e(u);
		});
		var d = P(c, 2), f = j(d);
		U(f);
		var p = P(f);
		D(d), D(t), F((e, t, n, c, l) => {
			B(i, e), G(a, "title", t), Vi(o, I(r).nav.sticky !== !1), B(s, ` ${n ?? ""}`), G(d, "title", c), Vi(f, I(r).nav.style?.atTop === "clear"), B(p, ` ${l ?? ""}`);
		}, [
			() => K("group.navScrolling"),
			() => K("tip.nav.sticky"),
			() => K("lbl.navSticky"),
			() => K("tip.nav.atTop"),
			() => K("lbl.navAtTop")
		]), L("change", o, (e) => l("nav", () => {
			I(r).nav.sticky = e.target.checked;
		})), L("change", f, (e) => ne("atTop", e.target.checked ? "clear" : void 0)), z(e, t);
	};
	V(Tn, (e) => {
		I(re) || e(En);
	}), D(wn), D(xn);
	var Dn = P(xn, 4), On = j(Dn), kn = N(On, !0), An = P(On, 2), jn = j(An), Mn = j(jn), Pn = (e) => {
		var t = Cf(), n = j(t), i = N(n, !0), a = P(n, 2);
		U(a), D(t), F((e, n, o) => {
			G(t, "title", e), B(i, n), G(a, "min", yl.min), G(a, "max", yl.max), G(a, "placeholder", o), W(a, I(r).nav.style?.mobile?.padY ?? "");
		}, [
			() => K("tip.nav.thickness"),
			() => K("lbl.navThickness"),
			() => K("lbl.navSameAsDesktop")
		]), L("change", a, (e) => De(e, "padY", yl)), z(e, t);
	};
	V(Mn, (e) => {
		I(re) || e(Pn);
	});
	var Fn = P(Mn, 2), In = j(Fn), Ln = N(In, !0), Rn = P(In, 2);
	U(Rn), D(Fn), D(jn);
	var zn = P(jn, 2), Bn = j(zn), Vn = j(Bn), Hn = N(Vn, !0), Un = P(Vn, 2);
	{
		let e = /* @__PURE__ */ O(() => I(r).nav.style?.mobile?.size ?? ""), t = /* @__PURE__ */ O(() => [["", K("lbl.navSameAsDesktop")], ...jl.map((e) => [e, K(`opt.size.${e}`)])]);
		J(Un, {
			filled: !0,
			get value() {
				return I(e);
			},
			get options() {
				return I(t);
			},
			onchange: (e) => ue("size", e || void 0)
		});
	}
	D(Bn);
	var Wn = P(Bn, 2), Gn = j(Wn), Kn = N(Gn, !0), qn = P(Gn, 2);
	{
		let e = /* @__PURE__ */ O(() => I(r).nav.style?.mobile?.layout ?? ""), t = /* @__PURE__ */ O(() => [
			["", K("lbl.navSameAsDesktop")],
			["left", K("common.left")],
			["center", K("common.center")],
			["right", K("common.right")]
		]);
		J(qn, {
			filled: !0,
			get value() {
				return I(e);
			},
			get options() {
				return I(t);
			},
			onchange: (e) => ue("layout", e || void 0)
		});
	}
	D(Wn), D(zn);
	var Jn = P(zn, 2), Yn = j(Jn), Xn = j(Yn), Zn = N(Xn, !0), Qn = P(Xn, 2);
	{
		let e = /* @__PURE__ */ O(() => I(r).nav.style?.mobile?.tools?.side ?? ""), t = /* @__PURE__ */ O(() => [
			["", K("lbl.navSameAsDesktop")],
			["start", K("common.left")],
			["end", K("common.right")]
		]);
		J(Qn, {
			filled: !0,
			get value() {
				return I(e);
			},
			get options() {
				return I(t);
			},
			onchange: (e) => ue("tools", e ? { side: e } : void 0)
		});
	}
	D(Yn);
	var $n = P(Yn, 2), er = (e) => {
		var t = wf(), n = j(t), r = N(n, !0), i = P(n, 2);
		{
			let e = /* @__PURE__ */ O(() => de("overlay")), t = /* @__PURE__ */ O(() => [
				["", K("lbl.navSameAsDesktop")],
				["on", K("common.on")],
				["off", K("common.off")]
			]);
			J(i, {
				filled: !0,
				get value() {
					return I(e);
				},
				get options() {
					return I(t);
				},
				onchange: (e) => fe("overlay", e)
			});
		}
		D(t), F((e, n) => {
			G(t, "title", e), B(r, n);
		}, [() => K("tip.nav.mobileOverlay"), () => K("lbl.navOverlay")]), z(e, t);
	};
	V($n, (e) => {
		!I(ie) && !I(re) && e(er);
	}), D(Jn);
	var tr = P(Jn, 2), nr = j(tr), rr = j(nr), ir = N(rr, !0), ar = P(rr, 2);
	{
		let e = /* @__PURE__ */ O(() => I(r).nav.style?.mobile?.border?.side ?? ""), t = /* @__PURE__ */ O(() => [
			["", K("lbl.navSameAsDesktop")],
			["none", K("common.none")],
			["bottom", K("opt.navBorder.bottom")],
			["top", K("opt.navBorder.top")],
			["both", K("opt.navBorder.both")],
			["all", K("opt.navBorder.all")]
		]);
		J(ar, {
			filled: !0,
			get value() {
				return I(e);
			},
			get options() {
				return I(t);
			},
			onchange: (e) => pe(e)
		});
	}
	D(nr), D(tr);
	var or = P(tr, 2), sr = (e) => {
		var t = _f(), n = j(t), i = N(n, !0), a = P(n, 2);
		U(a);
		var o = P(a, 2), s = N(o, !0), c = P(o, 2);
		{
			let e = /* @__PURE__ */ O(() => I(r).nav.style.mobile.border.color ?? "text"), t = /* @__PURE__ */ O(u), n = /* @__PURE__ */ O(() => K("tip.nav.borderColorPick"));
			rl(c, {
				get value() {
					return I(e);
				},
				get tokens() {
					return I(t);
				},
				get label() {
					return I(n);
				},
				onchange: (e) => ue("border", {
					...I(r).nav.style.mobile.border,
					color: e
				})
			});
		}
		D(t), F((e, t, c, l, u) => {
			G(n, "title", e), B(i, t), G(a, "title", c), W(a, I(r).nav.style.mobile.border.width ?? 1), G(o, "title", l), B(s, u);
		}, [
			() => K("tip.nav.borderWidth"),
			() => K("lbl.navBorderWidth"),
			() => K("tip.nav.borderWidth"),
			() => K("tip.nav.borderColorPick"),
			() => K("lbl.navBorderColor")
		]), L("change", a, (e) => {
			let t = Pl(e.target.value, {
				min: 1,
				max: 8
			}, 1), n = { ...I(r).nav.style.mobile.border };
			t === 1 ? delete n.width : n.width = t, ue("border", n), e.target.value = I(r).nav.style.mobile.border.width ?? 1;
		}), z(e, t);
	};
	V(or, (e) => {
		I(r).nav.style?.mobile?.border?.side && I(r).nav.style.mobile.border.side !== "none" && e(sr);
	});
	var cr = P(or, 2), lr = j(cr), ur = j(lr), dr = N(ur, !0), fr = P(ur, 2);
	{
		let e = /* @__PURE__ */ O(() => I(r).nav.style?.mobileMenu ?? "dropdown"), t = /* @__PURE__ */ O(() => [["dropdown", K("opt.mobileMenu.dropdown")], ["sheet", K("opt.mobileMenu.sheet")]]);
		J(fr, {
			filled: !0,
			get value() {
				return I(e);
			},
			get options() {
				return I(t);
			},
			onchange: (e) => ne("mobileMenu", e === "dropdown" ? void 0 : e)
		});
	}
	D(lr);
	var pr = P(lr, 2), mr = (e) => {
		var t = wf(), n = j(t), i = N(n, !0), a = P(n, 2);
		{
			let e = /* @__PURE__ */ O(() => I(r).nav.style?.sheetMotion ?? "top"), t = /* @__PURE__ */ O(() => [
				"top",
				"bottom",
				"left",
				"right",
				"fade",
				"none"
			].map((e) => [e, K(`opt.sheetMotion.${e}`)]));
			J(a, {
				filled: !0,
				get value() {
					return I(e);
				},
				get options() {
					return I(t);
				},
				onchange: (e) => ne("sheetMotion", e === "top" ? void 0 : e)
			});
		}
		D(t), F((e, n) => {
			G(t, "title", e), B(i, n);
		}, [() => K("tip.nav.sheetMotion"), () => K("lbl.sheetMotion")]), z(e, t);
	};
	V(pr, (e) => {
		I(r).nav.style?.mobileMenu === "sheet" && e(mr);
	}), D(cr);
	var hr = P(cr, 2), gr = (e) => {
		var t = Tf(), n = M(t), i = j(n);
		U(i);
		var a = P(i);
		D(n);
		var o = P(n, 2), s = (e) => {
			var t = yf(), n = j(t);
			U(n);
			var i = P(n);
			D(t), F((e, a) => {
				G(t, "title", e), Vi(n, I(r).nav.style?.sheetTheme === !0), B(i, ` ${a ?? ""}`);
			}, [() => K("tip.nav.sheetTheme"), () => K("lbl.sheetTheme")]), L("change", n, (e) => ne("sheetTheme", e.target.checked ? !0 : void 0)), z(e, t);
		};
		V(o, (e) => {
			I(r).theme?.alt?.tokens && I(r).nav.style?.tools?.theme !== !1 && e(s);
		});
		var c = P(o, 2), l = (e) => {
			var t = yf(), n = j(t);
			U(n);
			var i = P(n);
			D(t), F((e, a) => {
				G(t, "title", e), Vi(n, I(r).nav.style?.sheetCart === !0), B(i, ` ${a ?? ""}`);
			}, [() => K("tip.nav.sheetCart"), () => K("lbl.sheetCart")]), L("change", n, (e) => ne("sheetCart", e.target.checked ? !0 : void 0)), z(e, t);
		};
		V(c, (e) => {
			I(r).nav.cart?.show && e(l);
		});
		var d = P(c, 2), f = (e) => {
			var t = yf(), n = j(t);
			U(n);
			var i = P(n);
			D(t), F((e, a) => {
				G(t, "title", e), Vi(n, I(r).nav.style?.sheetAnnounce === !0), B(i, ` ${a ?? ""}`);
			}, [() => K("tip.nav.sheetAnnounce"), () => K("lbl.sheetAnnounce")]), L("change", n, (e) => ne("sheetAnnounce", e.target.checked ? !0 : void 0)), z(e, t);
		};
		V(d, (e) => {
			I(r).nav.announcement?.show && e(f);
		});
		var p = P(d, 2), m = (e) => {
			var t = yf(), n = j(t);
			U(n);
			var i = P(n);
			D(t), F((e, a) => {
				G(t, "title", e), Vi(n, I(r).nav.style?.sheetToolLabels === !0), B(i, ` ${a ?? ""}`);
			}, [() => K("tip.nav.sheetToolLabels"), () => K("lbl.sheetToolLabels")]), L("change", n, (e) => ne("sheetToolLabels", e.target.checked ? !0 : void 0)), z(e, t);
		};
		V(p, (e) => {
			(I(r).nav.style?.sheetTheme || I(r).nav.style?.sheetCart) && e(m);
		});
		var h = P(p, 2), g = j(h), _ = N(g, !0), v = P(g, 2);
		{
			let e = /* @__PURE__ */ O(() => I(r).nav.style?.sheet?.bg ?? "surface"), t = /* @__PURE__ */ O(u), n = /* @__PURE__ */ O(() => K("tip.nav.sheetBg"));
			rl(v, {
				get value() {
					return I(e);
				},
				get tokens() {
					return I(t);
				},
				get label() {
					return I(n);
				},
				onchange: (e) => Te("bg", e)
			});
		}
		var y = P(v, 2);
		U(y);
		var b = N(P(y, 2));
		D(h);
		var x = P(h, 2), S = j(x);
		U(S);
		var C = P(S);
		D(x);
		var w = P(x, 2), T = j(w), E = P(T);
		{
			let e = /* @__PURE__ */ O(() => I(r).nav.style?.sheet?.textColor ?? I(r).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ O(u), n = /* @__PURE__ */ O(() => K("tip.nav.sheetTextColorPick"));
			rl(E, {
				get value() {
					return I(e);
				},
				get tokens() {
					return I(t);
				},
				get label() {
					return I(n);
				},
				onchange: (e) => Te("textColor", e)
			});
		}
		D(w), F((e, t, o, s, c, l, u, d, f, p) => {
			G(n, "title", e), Vi(i, I(r).nav.style?.sheetLogo === !0), B(a, ` ${t ?? ""}`), G(h, "title", o), B(_, s), G(y, "title", c), W(y, l), B(b, `${u ?? ""}%`), G(x, "title", d), Vi(S, I(r).nav.style?.sheet?.blur ?? I(r).nav.style?.blur !== !1), B(C, ` ${f ?? ""}`), B(T, `${p ?? ""} `);
		}, [
			() => K("tip.nav.sheetLogo"),
			() => K("lbl.sheetLogo"),
			() => K("tip.nav.sheetBg"),
			() => K("lbl.background"),
			() => K("tip.nav.sheetOpacity"),
			() => Math.round((I(r).nav.style?.sheet?.bgOpacity ?? .85) * 100),
			() => Math.round((I(r).nav.style?.sheet?.bgOpacity ?? .85) * 100),
			() => K("tip.nav.sheetBlur"),
			() => K("lbl.sheetBlur"),
			() => K("lbl.textColor")
		]), L("change", i, (e) => ne("sheetLogo", e.target.checked ? !0 : void 0)), L("input", y, (e) => Te("bgOpacity", e.target.valueAsNumber / 100)), L("change", S, (e) => Te("blur", e.target.checked)), z(e, t);
	};
	V(hr, (e) => {
		I(r).nav.style?.mobileMenu === "sheet" && e(gr);
	});
	var _r = P(hr, 2), vr = (e) => {
		var t = wf(), n = j(t), i = N(n, !0), a = P(n, 2);
		{
			let e = /* @__PURE__ */ O(() => I(r).nav.style?.mobileSubs ?? "collapsed"), t = /* @__PURE__ */ O(() => [["collapsed", K("opt.mobileSubs.collapsed")], ["expanded", K("opt.mobileSubs.expanded")]]);
			J(a, {
				filled: !0,
				get value() {
					return I(e);
				},
				get options() {
					return I(t);
				},
				onchange: (e) => ne("mobileSubs", e === "collapsed" ? void 0 : e)
			});
		}
		D(t), F((e, n) => {
			G(t, "title", e), B(i, n);
		}, [() => K("tip.nav.mobileSubs"), () => K("lbl.mobileSubs")]), z(e, t);
	}, yr = /* @__PURE__ */ O(() => I(r).nav.items?.some((e) => e.children?.length));
	V(_r, (e) => {
		I(yr) && e(vr);
	}), D(An), D(Dn);
	var br = P(Dn, 4), xr = j(br), Sr = N(xr, !0), Cr = P(xr, 2), wr = j(Cr), Tr = j(wr), Er = N(Tr, !0), Dr = P(Tr, 2);
	ui(Dr, 21, () => [
		["standard", K("opt.hover.standard")],
		["underline", K("opt.hover.underline")],
		["pill", K("opt.hover.pill")],
		["lift-plain", K("opt.hover.liftPlain")],
		["lift", K("opt.hover.lift")]
	], ([e, t]) => e, (e, t) => {
		var n = /* @__PURE__ */ O(() => g(I(t), 2));
		let i = () => I(n)[0], a = () => I(n)[1];
		var o = Ef();
		let s;
		var c = j(o), l = N(c, !0), u = N(P(c), !0);
		D(o), F((e) => {
			s = Pi(o, 1, "tile hover-tile", null, s, { on: (I(r).nav.style?.hover ?? "standard") === i() }), G(o, "aria-pressed", (I(r).nav.style?.hover ?? "standard") === i()), Pi(c, 1, `hover-sample hover-${i() ?? ""}`), B(l, e), B(u, a());
		}, [() => K("seed.home")]), L("click", o, () => ze(i())), z(e, o);
	}), D(Dr), D(wr);
	var Or = P(wr, 2), kr = (e) => {
		var t = Df(), n = j(t), i = N(n, !0), a = P(n, 2);
		U(a);
		var o = N(P(a, 2));
		D(t), F((e, n, s) => {
			G(t, "title", e), B(i, n), W(a, I(r).nav.style?.hoverGlow ?? .6), B(o, `${s ?? ""}%`);
		}, [
			() => K("tip.nav.hoverGlow"),
			() => K("lbl.glowStrength"),
			() => Math.round((I(r).nav.style?.hoverGlow ?? .6) * 100)
		]), L("input", a, (e) => ne("hoverGlow", Number(e.target.value))), z(e, t);
	};
	V(Or, (e) => {
		I(r).nav.style?.hover === "lift" && e(kr);
	});
	var Ar = P(Or, 2), jr = j(Ar), Mr = (e) => {
		var t = Of(), n = j(t);
		{
			let e = /* @__PURE__ */ O(() => I(r).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ O(u);
			rl(n, {
				get value() {
					return I(e);
				},
				get tokens() {
					return I(t);
				},
				get label() {
					return I(Ne)[1];
				},
				onchange: (e) => ne("hoverColor", e)
			});
		}
		var i = N(P(n, 2), !0);
		D(t), F(() => {
			G(t, "title", I(Ne)[1]), B(i, I(Ne)[0]);
		}), z(e, t);
	};
	V(jr, (e) => {
		I(Ne) && e(Mr);
	});
	var Nr = P(jr, 2), Pr = j(Nr);
	{
		let e = /* @__PURE__ */ O(() => I(r).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ O(u), n = /* @__PURE__ */ O(() => K("tip.nav.hoverTextColorPick"));
		rl(Pr, {
			get value() {
				return I(e);
			},
			get tokens() {
				return I(t);
			},
			get label() {
				return I(n);
			},
			onchange: (e) => ne("hoverTextColor", e)
		});
	}
	var Fr = N(P(Pr, 2), !0);
	D(Nr);
	var Ir = P(Nr, 2), Lr = j(Ir);
	{
		let e = /* @__PURE__ */ O(() => I(r).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ O(u), n = /* @__PURE__ */ O(() => K("tip.nav.textColorPick"));
		rl(Lr, {
			get value() {
				return I(e);
			},
			get tokens() {
				return I(t);
			},
			get label() {
				return I(n);
			},
			onchange: (e) => ne("textColor", e)
		});
	}
	var Rr = N(P(Lr, 2), !0);
	D(Ir), D(Ar);
	var Br = P(Ar, 2), Vr = j(Br);
	U(Vr);
	var Hr = P(Vr);
	D(Br), D(Cr), D(br);
	var Ur = P(br, 4), Wr = j(Ur), Gr = N(Wr, !0), Kr = P(Wr, 2), qr = j(Kr);
	{
		let e = /* @__PURE__ */ O(() => I(r).nav?.style?.background?.layers ?? []);
		rf(qr, {
			get bg() {
				return s;
			},
			get layers() {
				return I(e);
			}
		});
	}
	D(Kr), D(Ur), D(Ot), D(Tt);
	var R = P(Tt, 2), Xr = j(R), Zr = N(Xr, !0), Qr = P(Xr, 2), $r = j(Qr), ei = j($r);
	U(ei);
	var ti = P(ei);
	D($r);
	var ni = P($r, 2), ri = (e) => {
		var t = jf(), n = M(t), a = j(n), o = N(a, !0), s = P(a, 2);
		U(s), D(n);
		var c = P(n, 2), d = j(c), f = P(d);
		{
			let e = /* @__PURE__ */ O(() => I(r).nav.announcement?.page ?? (I(r).nav.announcement?.href === void 0 ? "" : "custom")), t = /* @__PURE__ */ O(() => [
				["", K("common.none")],
				...I(r).pages.map((e) => [e.id, e.title]),
				["custom", K("opt.announceLink.custom")]
			]);
			J(f, {
				get value() {
					return I(e);
				},
				get options() {
					return I(t);
				},
				onchange: (e) => l("edit:nav-announce-link", () => {
					let t = { ...I(r).nav.announcement ?? {} };
					delete t.page, delete t.href, e === "custom" ? t.href = "" : e && (t.page = e), I(r).nav.announcement = t;
				})
			});
		}
		D(c);
		var p = P(c, 2), m = (e) => {
			var t = kf(), n = j(t), i = N(n, !0), a = P(n, 2);
			U(a), D(t), F((e, n) => {
				G(t, "title", e), B(i, n), W(a, I(r).nav.announcement?.href ?? "");
			}, [() => K("tip.nav.announceHref"), () => K("lbl.announceHref")]), L("change", a, (e) => me("href", e.target.value.trim())), z(e, t);
		};
		V(p, (e) => {
			I(r).nav.announcement?.href !== void 0 && !I(r).nav.announcement?.page && e(m);
		});
		var h = P(p, 2), g = (e) => {
			var t = yf(), n = j(t);
			U(n);
			var i = P(n);
			D(t), F((e, a) => {
				G(t, "title", e), Vi(n, I(r).nav.announcement?.sticky !== !1), B(i, ` ${a ?? ""}`);
			}, [() => K("tip.nav.announceSticky"), () => K("lbl.announceSticky")]), L("change", n, (e) => me("sticky", e.target.checked ? void 0 : !1)), z(e, t);
		};
		V(h, (e) => {
			I(r).nav.sticky !== !1 && !I(ie) && !I(re) && !I(r).nav.overlay && e(g);
		});
		var _ = P(h, 2), v = (e) => {
			var t = yf(), n = j(t);
			U(n);
			var i = P(n);
			D(t), F((e, a) => {
				G(t, "title", e), Vi(n, I(r).nav.announcement?.followNav === !0), B(i, ` ${a ?? ""}`);
			}, [() => K("tip.nav.announceFollowNav"), () => K("lbl.announceFollowNav")]), L("change", n, (e) => me("followNav", e.target.checked ? !0 : void 0)), z(e, t);
		};
		V(_, (e) => {
			I(r).nav.scroll === "hide" && I(r).nav.sticky !== !1 && !I(re) && I(r).nav.announcement?.sticky !== !1 && e(v);
		});
		var y = P(_, 2), b = (e) => {
			{
				let t = /* @__PURE__ */ O(() => K("lbl.announcePlace")), n = /* @__PURE__ */ O(() => K("tip.nav.announcePlace")), i = /* @__PURE__ */ O(() => I(r).nav.announcement?.place ?? "nav"), a = /* @__PURE__ */ O(() => [
					["nav", K("opt.announcePlace.nav")],
					["page", K("opt.announcePlace.page")],
					["content", K("opt.announcePlace.content")]
				]);
				Bl(e, {
					get label() {
						return I(t);
					},
					get title() {
						return I(n);
					},
					get value() {
						return I(i);
					},
					get options() {
						return I(a);
					},
					onchange: (e) => me("place", e === "nav" ? void 0 : e)
				});
			}
		};
		V(y, (e) => {
			I(re) && e(b);
		});
		var x = P(y, 2), S = j(x);
		U(S);
		var C = P(S);
		D(x);
		var w = P(x, 2), T = (e) => {
			var t = Af(), n = N(t, !0);
			F((e, r) => {
				G(t, "title", e), B(n, r);
			}, [() => K("tip.nav.announceShowAgain"), () => K("lbl.announceShowAgain")]), L("click", t, () => I(i)?.sendAnnounceReset()), z(e, t);
		};
		V(w, (e) => {
			I(r).nav.announcement?.dismiss !== !1 && e(T);
		});
		var E = P(w, 2), ee = j(E), te = P(ee);
		{
			let e = /* @__PURE__ */ O(() => I(r).nav.announcement?.color ?? "accent"), t = /* @__PURE__ */ O(u), n = /* @__PURE__ */ O(() => K("tip.nav.announceColor"));
			rl(te, {
				get value() {
					return I(e);
				},
				get tokens() {
					return I(t);
				},
				get label() {
					return I(n);
				},
				onchange: (e) => me("color", e)
			});
		}
		D(E);
		var ne = P(E, 2), ae = j(ne), oe = P(ae);
		{
			let e = /* @__PURE__ */ O(() => I(r).nav.announcement?.textColor ?? "accent-text"), t = /* @__PURE__ */ O(u), n = /* @__PURE__ */ O(() => K("tip.nav.announceTextColor"));
			rl(oe, {
				get value() {
					return I(e);
				},
				get tokens() {
					return I(t);
				},
				get label() {
					return I(n);
				},
				onchange: (e) => me("textColor", e)
			});
		}
		D(ne), F((e, t, i, a, l, u, f, p, m, h) => {
			G(n, "title", e), B(o, t), W(s, I(r).nav.announcement?.text ?? ""), G(c, "title", i), B(d, `${a ?? ""} `), G(x, "title", l), Vi(S, I(r).nav.announcement?.dismiss !== !1), B(C, ` ${u ?? ""}`), G(E, "title", f), B(ee, `${p ?? ""} `), G(ne, "title", m), B(ae, `${h ?? ""} `);
		}, [
			() => K("tip.nav.announce"),
			() => K("lbl.text"),
			() => K("tip.nav.announceLink"),
			() => K("lbl.link"),
			() => K("tip.nav.announceDismiss"),
			() => K("lbl.announceDismiss"),
			() => K("tip.nav.announceColor"),
			() => K("lbl.background"),
			() => K("tip.nav.announceTextColor"),
			() => K("lbl.textColor")
		]), L("change", s, (e) => me("text", e.target.value.trim() || void 0)), L("change", S, (e) => me("dismiss", e.target.checked ? void 0 : !1)), z(e, t);
	};
	V(ni, (e) => {
		I(r).nav.announcement?.show && e(ri);
	}), D(Qr), D(R);
	var ii = P(R, 2), ai = j(ii), si = N(ai, !0), ci = P(ai, 2);
	{
		let e = (e, t = f, n = f) => {
			var r = Mf(), i = j(r);
			H(i, () => q.up, !0), D(i);
			var a = P(i, 2);
			H(a, () => q.down, !0), D(a), D(r), F((e, t) => {
				G(i, "title", e), i.disabled = n() === 0, G(a, "title", t), a.disabled = n() === I(E).length - 1;
			}, [() => K("tip.moveUp"), () => K("tip.moveDown")]), L("click", i, (e) => {
				e.preventDefault(), e.stopPropagation(), ee(t(), -1);
			}), L("click", a, (e) => {
				e.preventDefault(), e.stopPropagation(), ee(t(), 1);
			}), z(e, r);
		};
		var li = j(ci), di = (e) => {
			var t = xf(), n = M(t);
			{
				let e = /* @__PURE__ */ O(() => K("lbl.toolsSide")), t = /* @__PURE__ */ O(() => K("tip.nav.toolsSideColumn")), i = /* @__PURE__ */ O(() => I(r).nav.style?.tools?.side ?? "end"), a = /* @__PURE__ */ O(() => [["start", K("opt.toolsSide.top")], ["end", K("opt.toolsSide.bottom")]]);
				Bl(n, {
					get label() {
						return I(e);
					},
					get title() {
						return I(t);
					},
					get value() {
						return I(i);
					},
					get options() {
						return I(a);
					},
					onchange: (e) => te("side", e === "start" ? "start" : void 0)
				});
			}
			var i = P(n, 2);
			{
				let e = /* @__PURE__ */ O(() => K("lbl.toolsAlign")), t = /* @__PURE__ */ O(() => K("tip.nav.toolsAlign")), n = /* @__PURE__ */ O(() => I(r).nav.style?.tools?.align ?? "center"), a = /* @__PURE__ */ O(() => [
					["start", K("opt.toolsAlign.start")],
					["center", K("opt.toolsAlign.center")],
					["end", K("opt.toolsAlign.end")],
					["spread", K("opt.toolsAlign.spread")]
				]);
				Bl(i, {
					get label() {
						return I(e);
					},
					get title() {
						return I(t);
					},
					get value() {
						return I(n);
					},
					get options() {
						return I(a);
					},
					onchange: (e) => te("align", e === "center" ? void 0 : e)
				});
			}
			z(e, t);
		}, fi = (e) => {
			{
				let t = /* @__PURE__ */ O(() => K("lbl.toolsSide")), n = /* @__PURE__ */ O(() => K("tip.nav.toolsSide")), i = /* @__PURE__ */ O(() => I(r).nav.style?.tools?.side ?? "end"), a = /* @__PURE__ */ O(() => [["start", K("opt.toolsSide.start")], ["end", K("opt.toolsSide.end")]]);
				Bl(e, {
					get label() {
						return I(t);
					},
					get title() {
						return I(n);
					},
					get value() {
						return I(i);
					},
					get options() {
						return I(a);
					},
					onchange: (e) => te("side", e === "start" ? "start" : void 0)
				});
			}
		};
		V(li, (e) => {
			I(re) ? e(di) : e(fi, -1);
		}), ui(P(li, 2), 18, () => I(E), (e) => e, (t, i, a) => {
			var o = Yr(), s = M(o), c = (t) => {
				var n = Yr(), o = M(n), s = (t) => {
					var n = Nf(), o = j(n), s = j(o), c = N(s, !0), l = P(s);
					e(l, () => i, () => I(a)), D(o);
					var u = P(o, 2), d = j(u);
					U(d);
					var f = P(d);
					D(u), D(n), F((e, t, n) => {
						B(c, e), G(u, "title", t), Vi(d, I(r).nav.style?.tools?.theme !== !1), B(f, ` ${n ?? ""}`);
					}, [
						() => K("lbl.themeToggle"),
						() => K("tip.nav.themeToggle"),
						() => K("lbl.showInMenu")
					]), L("change", d, (e) => te("theme", e.target.checked ? void 0 : !1)), z(t, n);
				};
				V(o, (e) => {
					I(r).theme?.alt?.tokens && e(s);
				}), z(t, n);
			}, u = (t) => {
				var o = Pf(), s = j(o), c = j(s), l = N(c, !0), u = P(c);
				e(u, () => i, () => I(a)), D(s);
				var d = P(s, 2), f = j(d);
				U(f);
				var p = P(f);
				D(d);
				var m = P(d, 2), h = N(m, !0);
				D(o), F((e, t, n, i) => {
					B(l, e), G(d, "title", t), Vi(f, I(r).nav.style?.tools?.links === !0), B(p, ` ${n ?? ""}`), B(h, i);
				}, [
					() => K("lbl.navToolLinks"),
					() => K("tip.nav.toolLinks"),
					() => K("lbl.showInMenu"),
					() => K("ui.editSiteLinks")
				]), L("change", f, (e) => te("links", e.target.checked ? !0 : void 0)), L("click", m, () => {
					n.siteLinksOpen = !0, n.openPanel("site");
				}), z(t, o);
			}, d = (t) => {
				var n = Ff(), o = j(n), s = j(o), c = N(s, !0), u = P(s);
				e(u, () => i, () => I(a)), D(o);
				var d = P(o, 2), f = j(d);
				U(f);
				var p = P(f);
				D(d);
				var m = P(d, 2), h = (e) => {
					var t = wf(), n = j(t), i = N(n, !0), a = P(n, 2);
					{
						let e = /* @__PURE__ */ O(() => I(r).nav.cart?.href ?? ""), t = /* @__PURE__ */ O(() => [["", K("common.none")], ...I(r).pages.map((e) => [e.path, e.title])]);
						J(a, {
							filled: !0,
							get value() {
								return I(e);
							},
							get options() {
								return I(t);
							},
							onchange: (e) => l("nav", () => {
								e ? I(r).nav.cart.href = e : delete I(r).nav.cart.href;
							})
						});
					}
					D(t), F((e, n) => {
						G(t, "title", e), B(i, n);
					}, [() => K("tip.cart.checkout"), () => K("lbl.checkoutPage")]), z(e, t);
				};
				V(m, (e) => {
					I(r).nav.cart?.show && e(h);
				}), D(n), F((e, t, n) => {
					B(c, e), G(d, "title", t), Vi(f, I(r).nav.cart?.show === !0), B(p, ` ${n ?? ""}`);
				}, [
					() => K("lbl.cart"),
					() => K("tip.nav.cart"),
					() => K("lbl.showInMenu")
				]), L("change", f, (e) => l("nav", () => {
					e.target.checked ? I(r).nav.cart = {
						...I(r).nav.cart ?? {},
						show: !0
					} : delete I(r).nav.cart;
				})), z(t, n);
			}, f = (t) => {
				var n = Uf(), o = j(n), s = j(o), c = j(s, !0), l = P(c);
				e(l, () => i, () => I(a)), D(s), D(o);
				var u = P(o, 2), d = j(u), f = j(d);
				U(f);
				var p = P(f);
				D(d);
				var m = P(d, 2), h = (e) => {
					var t = Hf(), n = M(t), i = j(n), a = N(i, !0), o = P(i, 2);
					ui(o, 21, () => I(Pe), ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ O(() => g(I(t), 2));
						let i = () => I(n)[0], a = () => I(n)[1];
						var o = lf();
						let s;
						var c = j(o);
						H(c, () => v[i()]);
						var l = N(P(c), !0);
						D(o), F(() => {
							s = Pi(o, 1, "tile", null, s, { on: (I(r).nav.launcher?.view ?? "grid") === i() }), G(o, "aria-pressed", (I(r).nav.launcher?.view ?? "grid") === i()), B(l, a());
						}), L("click", o, () => ye("view", i() === "grid" ? void 0 : i())), z(e, o);
					}), D(o), D(n);
					var s = P(n, 2);
					{
						let e = /* @__PURE__ */ O(() => K("lbl.launcherMobileView")), t = /* @__PURE__ */ O(() => K("tip.nav.launcherMobileView")), n = /* @__PURE__ */ O(() => I(r).nav.launcher?.mobileView ?? ""), i = /* @__PURE__ */ O(() => [["", K("lbl.navSameAsDesktop")], ...I(Pe)]);
						Bl(s, {
							get label() {
								return I(e);
							},
							get title() {
								return I(t);
							},
							get value() {
								return I(n);
							},
							get options() {
								return I(i);
							},
							onchange: (e) => ye("mobileView", e || void 0)
						});
					}
					var c = P(s, 2), l = j(c), u = N(l, !0), d = P(l, 2);
					U(d);
					var f = N(P(d, 2), !0);
					D(c);
					var p = P(c, 2), m = j(p);
					U(m);
					var h = P(m);
					D(p);
					var _ = P(p, 2), y = (e) => {
						var t = If(), n = j(t), i = N(n, !0), a = P(n, 2);
						U(a), D(t), F((e, n, o) => {
							G(t, "title", e), B(i, n), G(a, "placeholder", o), W(a, I(r).nav.launcher?.title ?? "");
						}, [
							() => K("tip.nav.launcherTitleText"),
							() => K("lbl.launcherTitle"),
							() => K("ph.launcherTitle")
						]), L("change", a, (e) => ye("title", e.target.value.trim() || void 0)), z(e, t);
					};
					V(_, (e) => {
						I(r).nav.launcher?.showTitle !== !1 && e(y);
					});
					var b = P(_, 2), x = j(b), S = N(x, !0), C = P(x, 2), w = j(C);
					{
						let e = /* @__PURE__ */ O(() => I(r).nav.launcher?.icon ?? ""), t = /* @__PURE__ */ O(() => I(r).nav.launcher?.image ?? ""), n = /* @__PURE__ */ O(_e), i = /* @__PURE__ */ O(() => K("opt.launcherDots")), a = /* @__PURE__ */ O(() => K("tip.nav.launcherIcon"));
						vl(w, {
							get icon() {
								return I(e);
							},
							get image() {
								return I(t);
							},
							get images() {
								return I(n);
							},
							klass: "lbtn-mark",
							get noneLabel() {
								return I(i);
							},
							get label() {
								return I(a);
							},
							onpick: (e) => ve(null, e),
							onfile: (e) => we(e, null),
							children: (e, t) => {
								var n = Yr(), i = M(n), a = (e) => {
									var t = of();
									F(() => G(t, "src", I(r).nav.launcher.image)), z(e, t);
								}, o = (e) => {
									var t = Yr();
									H(M(t), () => Zs(I(r).nav.launcher.icon) || ""), z(e, t);
								}, s = (e) => {
									var t = Yr();
									H(M(t), () => he), z(e, t);
								};
								V(i, (e) => {
									I(r).nav.launcher?.image ? e(a) : I(r).nav.launcher?.icon ? e(o, 1) : e(s, -1);
								}), z(e, n);
							},
							$$slots: { default: !0 }
						});
					}
					var T = P(w, 2), E = j(T), ee = (e) => {
						var t = Jr();
						F((e) => B(t, e), [() => K("mp.ownImage")]), z(e, t);
					}, te = (e) => {
						var t = Jr();
						F((e) => B(t, e), [() => K(Ys[I(r).nav.launcher.icon]?.labelKey ?? "common.none")]), z(e, t);
					}, ne = (e) => {
						var t = Jr();
						F((e) => B(t, e), [() => K("opt.launcherDots")]), z(e, t);
					};
					V(E, (e) => {
						I(r).nav.launcher?.image ? e(ee) : I(r).nav.launcher?.icon ? e(te, 1) : e(ne, -1);
					}), D(T), D(C), D(b);
					var re = P(b, 2);
					ui(re, 17, () => I(r).nav.launcher?.links ?? [], oi, (e, t, n) => {
						let i = /* @__PURE__ */ O(() => !Ws(I(t).href ?? ""));
						var a = Vf();
						let o;
						var s = j(a), c = j(s), l = j(c), u = (e) => {
							var n = of();
							F(() => G(n, "src", I(t).image)), z(e, n);
						}, d = (e) => {
							var n = Yr();
							H(M(n), () => Zs(I(t).icon) || ""), z(e, n);
						};
						V(l, (e) => {
							I(t).image ? e(u) : e(d, -1);
						}), D(c);
						var f = P(c, 2), p = N(f, !0), m = P(f, 2), h = (e) => {
							var t = Lf();
							H(t, () => q.warn, !0), D(t), F((e) => G(t, "title", e), [() => K("tip.badTarget")]), z(e, t);
						};
						V(m, (e) => {
							I(i) && e(h);
						});
						var g = P(m, 2), _ = j(g);
						_.disabled = n === 0, H(_, () => q.up, !0), D(_);
						var v = P(_, 2);
						H(v, () => q.down, !0), D(v), D(g);
						var y = P(g, 2);
						H(y, () => q.caret, !0), D(y), D(s);
						var b = P(s, 2), x = (e) => {
							var r = Bf(), a = j(r);
							{
								let e = /* @__PURE__ */ O(() => I(t).icon ?? ""), r = /* @__PURE__ */ O(() => I(t).image ?? ""), i = /* @__PURE__ */ O(_e), o = /* @__PURE__ */ O(() => K("mp.pickMark"));
								vl(a, {
									get icon() {
										return I(e);
									},
									get image() {
										return I(r);
									},
									get images() {
										return I(i);
									},
									klass: "lrow-tile",
									get label() {
										return I(o);
									},
									onpick: (e) => ve(n, e),
									onfile: (e) => we(e, n),
									children: (e, n) => {
										var r = Rf(), i = M(r), a = j(i), o = (e) => {
											var n = of();
											F(() => G(n, "src", I(t).image)), z(e, n);
										}, s = (e) => {
											var n = Yr();
											H(M(n), () => Zs(I(t).icon) || ""), z(e, n);
										};
										V(a, (e) => {
											I(t).image ? e(o) : I(t).icon && e(s, 1);
										}), D(i);
										var c = N(P(i, 2), !0);
										F((e) => B(c, e), [() => I(t).label || K("seed.link")]), z(e, r);
									},
									$$slots: { default: !0 }
								});
							}
							var o = P(a, 2), s = j(o);
							U(s);
							var c = P(s, 2);
							U(c);
							let l;
							var u = P(c, 2), d = (e) => {
								var t = zf(), n = N(t, !0);
								F((e) => B(n, e), [() => K("ui.badTarget")]), z(e, t);
							};
							V(u, (e) => {
								I(i) && e(d);
							});
							var f = P(u, 2), p = j(f);
							{
								let e = /* @__PURE__ */ O(() => I(t).icon ?? ""), r = /* @__PURE__ */ O(() => I(t).image ?? ""), i = /* @__PURE__ */ O(_e), a = /* @__PURE__ */ O(() => K("mp.pickMark"));
								vl(p, {
									get icon() {
										return I(e);
									},
									get image() {
										return I(r);
									},
									get images() {
										return I(i);
									},
									klass: "linkish",
									get label() {
										return I(a);
									},
									onpick: (e) => ve(n, e),
									onfile: (e) => we(e, n),
									children: (e, t) => {
										ke();
										var n = Jr();
										F((e) => B(n, e), [() => K("mp.changeMark")]), z(e, n);
									},
									$$slots: { default: !0 }
								});
							}
							var m = P(p, 2), h = N(m, !0);
							D(f), D(o), D(r), F((e, n, r, a, o, u) => {
								W(s, I(t).label), G(s, "title", e), G(s, "placeholder", n), l = Pi(c, 1, "field-filled", null, l, { "bad-target": I(i) }), W(c, I(t).href ?? ""), G(c, "placeholder", r), G(c, "title", a), G(m, "title", o), B(h, u);
							}, [
								() => K("tip.nav.launcherLabel"),
								() => K("lbl.text"),
								() => K("ph.hrefAnchor"),
								() => I(i) ? K("tip.badTarget") : K("tip.hrefAnchor"),
								() => K("tip.removeLink"),
								() => K("ui.remove")
							]), L("change", s, (e) => Ce(n, "label", e.target.value)), L("change", c, (e) => Ce(n, "href", e.target.value)), L("click", m, () => xe(n)), z(e, r);
						};
						V(b, (e) => {
							I(ge) === n && e(x);
						}), D(a), F((e, t, i) => {
							o = Pi(a, 1, "lrow", null, o, { open: I(ge) === n }), B(p, e), G(_, "title", t), G(v, "title", i), v.disabled = n === I(r).nav.launcher.links.length - 1;
						}, [
							() => I(t).label || K("seed.link"),
							() => K("tip.moveUp"),
							() => K("tip.moveDown")
						]), L("click", s, () => A(ge, I(ge) === n ? null : n, !0)), L("keydown", s, (e) => {
							(e.key === "Enter" || e.key === " ") && (e.preventDefault(), A(ge, I(ge) === n ? null : n, !0));
						}), L("click", g, (e) => e.stopPropagation()), L("keydown", g, (e) => e.stopPropagation()), L("click", _, () => Se(n, -1)), L("click", v, () => Se(n, 1)), z(e, a);
					});
					var ie = P(re, 2), ae = N(ie, !0);
					F((e, t, n, i, s, l, g, _) => {
						B(a, e), G(o, "aria-label", t), G(c, "title", n), B(u, i), W(d, I(r).nav.launcher?.mobileMax ?? 6), B(f, I(r).nav.launcher?.mobileMax ?? 6), G(p, "title", s), Vi(m, I(r).nav.launcher?.showTitle !== !1), B(h, ` ${l ?? ""}`), B(S, g), B(ae, _);
					}, [
						() => K("lbl.design"),
						() => K("lbl.design"),
						() => K("tip.nav.launcherMobileMax"),
						() => K("lbl.launcherMobileMax"),
						() => K("tip.nav.launcherTitle"),
						() => K("lbl.launcherShowTitle"),
						() => K("lbl.launcherButton"),
						() => K("ui.addLauncherLink")
					]), L("input", d, (e) => ye("mobileMax", e.target.valueAsNumber === 6 ? void 0 : e.target.valueAsNumber)), L("change", m, (e) => ye("showTitle", e.target.checked ? void 0 : !1)), L("click", ie, be), z(e, t);
				};
				V(m, (e) => {
					I(r).nav.launcher?.show === !0 && e(h);
				}), D(u), D(n), F((e, t, n, i) => {
					G(o, "title", e), B(c, t), G(d, "title", n), Vi(f, I(r).nav.launcher?.show === !0), B(p, ` ${i ?? ""}`);
				}, [
					() => K("tip.nav.launcher"),
					() => K("group.launcher"),
					() => K("tip.nav.launcher"),
					() => K("lbl.showInMenu")
				]), L("change", f, (e) => ye("show", e.target.checked ? !0 : void 0)), z(t, n);
			};
			V(s, (e) => {
				i === "theme" ? e(c) : i === "links" ? e(u, 1) : i === "cart" ? e(d, 2) : e(f, -1);
			}), z(t, o);
		}), D(ci);
	}
	D(ii);
	var pi = P(ii, 2), mi = j(pi), hi = N(mi, !0), gi = P(mi, 2), _i = j(gi), vi = j(_i), yi = N(vi, !0), bi = P(vi, 2);
	let xi;
	ui(bi, 21, () => I(Fe), ([e, t]) => e, (e, t) => {
		var n = /* @__PURE__ */ O(() => g(I(t), 2));
		let i = () => I(n)[0], a = () => I(n)[1];
		var o = lf();
		let s;
		var c = j(o);
		H(c, () => _[i()]);
		var l = N(P(c), !0);
		D(o), F(() => {
			s = Pi(o, 1, "tile", null, s, { on: (I(r).nav.style?.subStyle ?? "card") === i() }), G(o, "aria-pressed", (I(r).nav.style?.subStyle ?? "card") === i()), B(l, a());
		}), L("click", o, () => ne("subStyle", i() === "card" ? void 0 : i())), z(e, o);
	}), D(bi), D(_i);
	var Si = P(_i, 2), Ci = (e) => {
		var t = xf(), n = M(t), i = (e) => {
			var t = xf(), n = M(t);
			{
				let e = /* @__PURE__ */ O(() => K("lbl.sideSubs")), t = /* @__PURE__ */ O(() => K("tip.nav.sideSubs")), i = /* @__PURE__ */ O(() => I(r).nav.style?.sideSubs ?? "collapsed"), a = /* @__PURE__ */ O(() => [["collapsed", K("opt.mobileSubs.collapsed")], ["expanded", K("opt.mobileSubs.expanded")]]);
				Bl(n, {
					get label() {
						return I(e);
					},
					get title() {
						return I(t);
					},
					get value() {
						return I(i);
					},
					get options() {
						return I(a);
					},
					onchange: (e) => ne("sideSubs", e === "collapsed" ? void 0 : e)
				});
			}
			var i = P(n, 2), a = (e) => {
				var t = yf(), n = j(t);
				U(n);
				var i = P(n);
				D(t), F((e, a) => {
					G(t, "title", e), Vi(n, I(r).nav.style?.sideSubArrow === !0), B(i, ` ${a ?? ""}`);
				}, [() => K("tip.nav.sideSubArrow"), () => K("lbl.sideSubArrow")]), L("change", n, (e) => ne("sideSubArrow", e.target.checked ? !0 : void 0)), z(e, t);
			};
			V(i, (e) => {
				I(r).nav.style?.sideSubs === "expanded" && e(a);
			}), z(e, t);
		};
		V(n, (e) => {
			I(re) && e(i);
		});
		var a = P(n, 2), o = (e) => {
			{
				let t = /* @__PURE__ */ O(() => K("lbl.subOpen")), n = /* @__PURE__ */ O(() => K("tip.nav.subOpen")), i = /* @__PURE__ */ O(() => I(r).nav.style?.subOpen ?? "hover"), a = /* @__PURE__ */ O(() => [
					["hover", K("opt.subOpen.hover")],
					["stay", K("opt.subOpen.stay")],
					["click", K("opt.subOpen.click")]
				]);
				Bl(e, {
					get label() {
						return I(t);
					},
					get title() {
						return I(n);
					},
					get value() {
						return I(i);
					},
					get options() {
						return I(a);
					},
					onchange: (e) => ne("subOpen", e === "hover" ? void 0 : e)
				});
			}
		};
		V(a, (e) => {
			(!I(re) || I(r).nav.style?.sideSubs !== "expanded") && e(o);
		}), z(e, t);
	}, wi = /* @__PURE__ */ O(() => I(r).nav.items?.some((e) => e.children?.length));
	V(Si, (e) => {
		I(wi) && e(Ci);
	});
	var Ti = P(Si, 2), Ei = (e) => {
		var t = Wf(), n = j(t), i = P(n);
		{
			let e = /* @__PURE__ */ O(() => I(r).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ O(u), n = /* @__PURE__ */ O(() => K("tip.nav.subPillColorPick"));
			rl(i, {
				get value() {
					return I(e);
				},
				get tokens() {
					return I(t);
				},
				get label() {
					return I(n);
				},
				onchange: (e) => ne("subPillColor", e)
			});
		}
		D(t), F((e, r) => {
			G(t, "title", e), B(n, `${r ?? ""} `);
		}, [() => K("tip.nav.subPillColor"), () => K("lbl.subPillColor")]), z(e, t);
	};
	V(Ti, (e) => {
		I(r).nav.style?.subStyle === "pills" && e(Ei);
	});
	var Di = P(Ti, 2), Oi = j(Di), ki = P(Oi);
	U(ki), D(Di), D(gi), D(pi);
	var Ai = P(pi, 2), ji = j(Ai), Mi = N(ji, !0), Ni = P(ji, 2);
	{
		let e = (e, t = f) => {
			let n = /* @__PURE__ */ O(Ze);
			var r = Gf();
			let i;
			var a = j(r);
			H(a, () => rt, !0), D(a);
			var o = P(a, 2), s = j(o), c = N(s, !0), l = N(P(s, 2), !0);
			D(o), D(r), F(() => {
				i = Pi(r, 1, "nav-item ghost", null, i, { child: t() }), B(c, I(n).label), B(l, I(n).target);
			}), z(e, r);
		};
		var Fi = j(Ni);
		ui(Fi, 21, () => I(r).nav.items, oi, (t, n, i) => {
			let a = /* @__PURE__ */ O(() => `${i}`);
			var o = Yf(), s = M(o), c = (t) => {
				e(t, () => !1);
			};
			V(s, (e) => {
				I(qe)?.key === I(a) && I(qe).pos === "before" && e(c);
			});
			var l = P(s, 2);
			let u;
			var d = j(l);
			H(d, () => rt, !0), D(d);
			var f = P(d, 2), p = j(f);
			U(p);
			var m = P(p, 2), h = j(m);
			{
				let e = /* @__PURE__ */ O(() => I(n).page ?? (I(n).href == null ? "__none" : "__href")), t = /* @__PURE__ */ O(() => K("tip.linkTarget")), a = /* @__PURE__ */ O(() => [
					...I(r).pages.map((e) => [e.id, e.title]),
					["__href", K("opt.linkHref")],
					...I(n).children ? [["__none", K("opt.noLink")]] : []
				]);
				J(h, {
					compact: !0,
					get value() {
						return I(e);
					},
					get title() {
						return I(t);
					},
					get options() {
						return I(a);
					},
					onchange: (e) => Ve(i, e)
				});
			}
			var g = P(h, 2), _ = (e) => {
				var t = Kf();
				U(t), F((e, r) => {
					W(t, I(n).href), G(t, "placeholder", e), G(t, "title", r);
				}, [() => K("ph.hrefAnchor"), () => K("tip.hrefAnchor")]), L("change", t, (e) => He(i, e.target.value)), z(e, t);
			};
			V(g, (e) => {
				!I(n).page && I(n).href != null && e(_);
			}), D(m), D(f);
			var v = P(f, 2), y = (e) => {
				var t = qf();
				H(t, () => "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M6 9l6 6 6-6\"/></svg>", !0), D(t), F((e) => G(t, "title", e), [() => K("tip.nav.hasSubmenu")]), z(e, t);
			};
			V(v, (e) => {
				I(n).children?.length && e(y);
			});
			var b = P(v, 2), x = j(b);
			H(x, () => q.plus, !0), D(x);
			var S = P(x, 2);
			S.disabled = i === 0, H(S, () => q.up, !0), D(S);
			var C = P(S, 2);
			H(C, () => q.cross, !0), D(C);
			var w = P(C, 2);
			H(w, () => q.down, !0), D(w), D(b);
			var T = P(b, 2);
			H(T, () => q.kebab, !0), D(T), D(l);
			var E = P(l, 2);
			ui(E, 17, () => I(n).children ?? [], oi, (t, a, o) => {
				let s = /* @__PURE__ */ O(() => `${i}.${o}`);
				var c = Jf(), l = M(c), u = (t) => {
					e(t, () => !0);
				};
				V(l, (e) => {
					I(qe)?.key === I(s) && I(qe).pos === "before" && e(u);
				});
				var d = P(l, 2);
				let f;
				var p = j(d);
				H(p, () => rt, !0), D(p);
				var m = P(p, 2), h = j(m);
				U(h);
				var g = P(h, 2), _ = j(g);
				{
					let e = /* @__PURE__ */ O(() => I(a).page ?? "__href"), t = /* @__PURE__ */ O(() => K("tip.linkTarget")), n = /* @__PURE__ */ O(() => [...I(r).pages.map((e) => [e.id, e.title]), ["__href", K("opt.linkHref")]]);
					J(_, {
						compact: !0,
						get value() {
							return I(e);
						},
						get title() {
							return I(t);
						},
						get options() {
							return I(n);
						},
						onchange: (e) => lt(i, o, e)
					});
				}
				var v = P(_, 2), y = (e) => {
					var t = Kf();
					U(t), F((e, n) => {
						W(t, I(a).href ?? ""), G(t, "placeholder", e), G(t, "title", n);
					}, [() => K("ph.hrefAnchor"), () => K("tip.hrefAnchor")]), L("change", t, (e) => ut(i, o, e.target.value)), z(e, t);
				};
				V(v, (e) => {
					I(a).page || e(y);
				}), D(g), D(m);
				var b = P(m, 2), x = j(b);
				x.disabled = o === 0, H(x, () => q.up, !0), D(x);
				var S = P(x, 2);
				H(S, () => q.cross, !0), D(S);
				var C = P(S, 2);
				H(C, () => q.down, !0), D(C), D(b);
				var w = P(b, 2);
				H(w, () => q.kebab, !0), D(w), D(d);
				var T = P(d, 2), E = (t) => {
					e(t, () => !0);
				};
				V(T, (e) => {
					I(qe)?.key === I(s) && I(qe).pos === "after" && e(E);
				}), F((e, t, r, i, c, l, u) => {
					f = Pi(d, 1, "nav-item child", null, f, {
						selected: I(Ge) === I(s),
						dragging: I(Ke) === I(s)
					}), G(d, "data-key", I(s)), G(p, "title", e), W(h, I(a).label), G(h, "title", t), G(x, "title", r), G(S, "title", i), G(C, "title", c), C.disabled = o === I(n).children.length - 1, G(w, "title", l), G(w, "aria-label", u);
				}, [
					() => K("tip.nav.dragItem"),
					() => K("tip.nav.childLabel"),
					() => K("tip.moveUp"),
					() => K("tip.nav.removeChild"),
					() => K("tip.moveDown"),
					() => K("tip.nav.itemActions"),
					() => K("tip.nav.itemActions")
				]), L("click", d, (e) => {
					e.stopPropagation(), A(Ge, I(s));
				}), zr("dragstart", p, (e) => {
					e.stopPropagation(), A(Ke, I(s)), e.dataTransfer?.setData($e, I(s));
				}), zr("dragend", p, Qe), L("input", h, (e) => ct(i, o, e.target.value)), L("click", x, () => dt(i, o, -1)), L("click", S, () => ft(i, o)), L("click", C, () => dt(i, o, 1)), L("click", w, (e) => {
					e.stopPropagation(), A(Ge, I(s));
				}), z(t, c);
			});
			var ee = P(E, 2), te = (t) => {
				e(t, () => !0);
			};
			V(ee, (e) => {
				I(qe)?.key === I(a) && I(qe).pos === "into" && e(te);
			});
			var ne = P(ee, 2), re = (t) => {
				e(t, () => !1);
			};
			V(ne, (e) => {
				I(qe)?.key === I(a) && I(qe).pos === "after" && e(re);
			}), F((e, t, o, s, c, f, m, h) => {
				u = Pi(l, 1, "nav-item", null, u, {
					selected: I(Ge) === I(a),
					dragging: I(Ke) === I(a),
					"drop-target": I(qe)?.key === I(a) && I(qe).pos === "into"
				}), G(l, "data-key", I(a)), G(d, "title", e), W(p, I(n).label), G(p, "title", t), G(x, "title", o), G(S, "title", s), G(C, "title", c), G(w, "title", f), w.disabled = i === I(r).nav.items.length - 1, G(T, "title", m), G(T, "aria-label", h);
			}, [
				() => K("tip.nav.dragItem"),
				() => K("tip.nav.itemLabel"),
				() => K("tip.nav.addChild"),
				() => K("tip.moveUp"),
				() => K("tip.nav.removeItem"),
				() => K("tip.moveDown"),
				() => K("tip.nav.itemActions"),
				() => K("tip.nav.itemActions")
			]), L("click", l, () => {
				A(Ge, I(a));
			}), zr("dragstart", d, (e) => {
				A(Ke, I(a)), e.dataTransfer?.setData($e, I(a));
			}), zr("dragend", d, Qe), L("input", p, (e) => Be(i, e.target.value)), L("click", x, () => st(i)), L("click", S, () => Ue(i, -1)), L("click", C, () => We(i)), L("click", w, () => Ue(i, 1)), L("click", T, () => {
				A(Ge, I(a));
			}), z(t, o);
		}), D(Fi);
		var Ii = P(Fi, 2), Li = N(Ii, !0), Ri = P(Ii, 2), zi = j(Ri);
		U(zi);
		var Bi = P(zi, 2), Hi = N(Bi, !0);
		D(Ri), D(Ni), F((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E, ee, te, ne, re, ie, ae, oe, se, ce, le, ue, de, fe, pe, me, he, ge, _e, ve, ye, be, xe, Se, Ce, we, Te, Ee, De, Oe, D, ke) => {
			B(Li, Ee), G(Ri, "title", De), G(zi, "placeholder", Oe), Bi.disabled = D, B(Hi, ke);
		}, [
			() => K("hint.nav.logoHome"),
			() => K("group.logo"),
			() => K("group.appearance"),
			() => K("group.navLayout"),
			() => K("tip.nav.variant"),
			() => K("lbl.navVariant"),
			() => K("lbl.navVariant"),
			() => K("tip.nav.sizePreset"),
			() => K("lbl.size"),
			() => K("tip.nav.sizePreset"),
			() => K("lbl.adjust"),
			() => K("tip.nav.menuTextSize"),
			() => K("lbl.navTextSize"),
			() => K("group.navFrame"),
			() => K("group.navBehaviour"),
			() => K("tip.nav.mobileSame"),
			() => K("group.mobile"),
			() => K("tip.nav.menuTextSize"),
			() => K("lbl.navTextSize"),
			() => K("lbl.navSameAsDesktop"),
			() => K("tip.nav.mobileSize"),
			() => K("lbl.size"),
			() => K("tip.nav.mobileLayout"),
			() => K("lbl.navPlacement"),
			() => K("tip.nav.mobileTools"),
			() => K("lbl.toolsSide"),
			() => K("tip.nav.mobileBorder"),
			() => K("lbl.navBorder"),
			() => K("tip.nav.mobileMenu"),
			() => K("lbl.mobileMenu"),
			() => K("group.navColours"),
			() => K("lbl.navHover"),
			() => K("lbl.navHover"),
			() => K("tip.nav.hoverTextColor"),
			() => K("lbl.hoverTextColor"),
			() => K("tip.nav.textColorPick"),
			() => K("lbl.textColor"),
			() => K("tip.nav.blur"),
			() => K("lbl.navBlur"),
			() => K("lbl.background"),
			() => K("tip.nav.announce"),
			() => K("group.announcement"),
			() => K("tip.nav.announce"),
			() => K("lbl.announceShow"),
			() => K("tip.nav.tools"),
			() => K("group.tools"),
			() => K("group.submenu"),
			() => K("lbl.design"),
			() => K("lbl.design"),
			() => K("tip.nav.subColumns"),
			() => K("lbl.columns"),
			() => K("hint.nav.submenu"),
			() => K("group.menuItems"),
			() => K("ui.addMenuItem"),
			() => K("tip.nav.newPageAsItem"),
			() => K("ph.nav.newPageTitle"),
			() => !I(y).trim(),
			() => K("ui.newPageAsItem")
		]), zr("dragover", Fi, et), zr("drop", Fi, (e) => {
			e.preventDefault(), tt(I(qe)?.key ?? "");
		}), L("click", Ii, ot), L("keydown", zi, (e) => {
			e.key === "Enter" && b();
		}), Gi(zi, () => I(y), (e) => A(y, e)), L("click", Bi, b);
	}
	D(Ai), D(pt), F((e, t, n, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E, ee, te, ne, ie, ae, oe, ce, le, ue, de, fe, pe, me, he, ge, _e, ve, ye, be, xe, Se, Ce, we, Te, Ee, De, Oe, D, ke, Ae, je, Me) => {
		G(ht, "title", e), B(gt, t), B(Dt, n), B(jt, i), G(Nt, "title", a), B(Ft, o), G(It, "aria-label", s), G(Yt, "title", c), B(Xt, l), G(Qt, "title", u), B(tn, d), G(on, "title", f), B(cn, p), G(ln, "min", bl.min), G(ln, "max", bl.max), G(ln, "step", bl.step), W(ln, I(se)), G(un, "min", bl.min), G(un, "max", bl.max), W(un, I(se)), B(hn, m), B(Cn, h), G(On, "title", g), B(kn, _), G(Fn, "title", v), B(Ln, y), G(Rn, "min", bl.min), G(Rn, "max", bl.max), G(Rn, "placeholder", b), W(Rn, I(r).nav.style?.mobile?.textSize ?? ""), G(Bn, "title", x), B(Hn, S), G(Wn, "title", C), B(Kn, w), G(Yn, "title", T), B(Zn, E), G(nr, "title", ee), B(ir, te), G(lr, "title", ne), B(dr, ie), B(Sr, ae), B(Er, oe), G(Dr, "aria-label", ce), G(Nr, "title", le), B(Fr, ue), G(Ir, "title", de), B(Rr, fe), G(Br, "title", pe), Vi(Vr, I(r).nav.style?.blur !== !1), B(Hr, ` ${me ?? ""}`), B(Gr, he), G(Xr, "title", ge), B(Zr, _e), G($r, "title", ve), Vi(ei, I(r).nav.announcement?.show === !0), B(ti, ` ${ye ?? ""}`), G(ai, "title", be), B(si, xe), B(hi, Se), B(yi, Ce), xi = Pi(bi, 1, "tile-grid", null, xi, {
			"cols-5": !I(re),
			"cols-3": I(re)
		}), G(bi, "aria-label", we), G(Di, "title", Te), B(Oi, `${Ee ?? ""} `), W(ki, I(r).nav.style?.subColumns ?? 1), G(ji, "title", De), B(Mi, Oe);
	}, [
		() => K("hint.nav.logoHome"),
		() => K("group.logo"),
		() => K("group.appearance"),
		() => K("group.navLayout"),
		() => K("tip.nav.variant"),
		() => K("lbl.navVariant"),
		() => K("lbl.navVariant"),
		() => K("tip.nav.sizePreset"),
		() => K("lbl.size"),
		() => K("tip.nav.sizePreset"),
		() => K("lbl.adjust"),
		() => K("tip.nav.menuTextSize"),
		() => K("lbl.navTextSize"),
		() => K("group.navFrame"),
		() => K("group.navBehaviour"),
		() => K("tip.nav.mobileSame"),
		() => K("group.mobile"),
		() => K("tip.nav.menuTextSize"),
		() => K("lbl.navTextSize"),
		() => K("lbl.navSameAsDesktop"),
		() => K("tip.nav.mobileSize"),
		() => K("lbl.size"),
		() => K("tip.nav.mobileLayout"),
		() => K("lbl.navPlacement"),
		() => K("tip.nav.mobileTools"),
		() => K("lbl.toolsSide"),
		() => K("tip.nav.mobileBorder"),
		() => K("lbl.navBorder"),
		() => K("tip.nav.mobileMenu"),
		() => K("lbl.mobileMenu"),
		() => K("group.navColours"),
		() => K("lbl.navHover"),
		() => K("lbl.navHover"),
		() => K("tip.nav.hoverTextColor"),
		() => K("lbl.hoverTextColor"),
		() => K("tip.nav.textColorPick"),
		() => K("lbl.textColor"),
		() => K("tip.nav.blur"),
		() => K("lbl.navBlur"),
		() => K("lbl.background"),
		() => K("tip.nav.announce"),
		() => K("group.announcement"),
		() => K("tip.nav.announce"),
		() => K("lbl.announceShow"),
		() => K("tip.nav.tools"),
		() => K("group.tools"),
		() => K("group.submenu"),
		() => K("lbl.design"),
		() => K("lbl.design"),
		() => K("tip.nav.subColumns"),
		() => K("lbl.columns"),
		() => K("hint.nav.submenu"),
		() => K("group.menuItems"),
		() => K("ui.addMenuItem"),
		() => K("tip.nav.newPageAsItem"),
		() => K("ph.nav.newPageTitle"),
		() => !I(y).trim(),
		() => K("ui.newPageAsItem")
	]), L("input", ln, (e) => ne("textSize", e.target.valueAsNumber)), L("change", un, (e) => Ee(e, "textSize", bl)), L("change", Rn, (e) => De(e, "textSize", bl)), L("change", Vr, (e) => ne("blur", e.target.checked)), L("change", ei, (e) => me("show", e.target.checked ? !0 : void 0)), L("change", ki, (e) => ne("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), z(e, pt), at();
}
Br([
	"input",
	"change",
	"click",
	"keydown"
]);
var Qf = 1920, $f = [
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
], ep = [
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
], tp = [
	1920,
	1536,
	1366
];
function np(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 1440;
	let n = Math.round(t / 20) * 20;
	return Math.min(Qf, Math.max(960, n));
}
function rp(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 6;
	let n = Math.round(t / 1) * 1;
	return Math.min(12, Math.max(0, n));
}
function ip(e, t) {
	if (e === "full") return 0;
	let n = Math.min(49, Math.max(0, Number(t) || 0));
	return Math.ceil(Number(e) / (1 - 2 * n / 100));
}
function ap(e, t, n) {
	let r = Math.max(0, Number(t) || 0) / 100 * n, i = Math.max(0, n - 2 * r), a = e !== "full" && Number(e) < i, o = a ? Number(e) : i;
	return {
		width: o,
		margin: Math.round((n - o) / 2),
		pct: n > 0 ? o / n * 100 : 0,
		bound: a
	};
}
function op(e) {
	return ep.find((t) => t.width === e)?.id ?? null;
}
//#endregion
//#region ../template/assets/engine/0.7.4/calendar-format.js
function sp(e) {
	if (typeof e != "string" || !e.trim()) return !1;
	try {
		return new Intl.DateTimeFormat("en", { timeZone: e.trim() }), !0;
	} catch {
		return !1;
	}
}
//#endregion
//#region ../template/assets/engine/0.7.4/map-links.js
var cp = {
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
}, lp = Object.keys(cp);
function up(e) {
	let t = e?.site?.mapService;
	return Object.hasOwn(cp, t) ? t : "osm";
}
//#endregion
//#region ../template/assets/engine/0.7.4/meeting-links.js
var dp = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/;
function fp(e) {
	let t = Array.isArray(e) ? e : String(e ?? "").split(/[\s,;]+/), n = [];
	for (let e of t) {
		let t = String(e ?? "").trim().toLowerCase();
		if (!t) continue;
		let r = "";
		try {
			r = new URL(/^[a-z][a-z0-9+.-]*:\/\//.test(t) ? t : `https://${t}`).hostname;
		} catch {}
		dp.test(r) && !n.includes(r) && n.push(r);
	}
	return n;
}
//#endregion
//#region src/lib/swatch.js
var pp = (e) => e ? e.startsWith("#") ? e : `var(--urd-color-${e})` : "var(--urd-color-accent)", mp = 1600, hp = .82, gp = .6, _p = 15e6, vp = 4e6, yp = 256e3;
function bp(e) {
	if (!Sp(e, 0, "GIF8")) return !1;
	for (let t = 13; t < e.length - 11; t++) if (e[t] === 33 && e[t + 1] === 255 && e[t + 2] === 11 && (Sp(e, t + 3, "NETSCAPE2.0") || Sp(e, t + 3, "ANIMEXTS1.0"))) return !0;
	return !1;
}
var xp = class extends Error {
	constructor(e) {
		super("The animated image is too large"), this.code = "animatedTooLarge", this.bytes = e;
	}
}, Sp = (e, t, n) => {
	if (t + n.length > e.length) return !1;
	for (let r = 0; r < n.length; r += 1) if (e[t + r] !== n.charCodeAt(r)) return !1;
	return !0;
};
function Cp(e) {
	if (!Sp(e, 0, "GIF87a") && !Sp(e, 0, "GIF89a") || e.length < 13) return !1;
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
function wp(e) {
	return !Sp(e, 0, "RIFF") || !Sp(e, 8, "WEBP") ? !1 : Sp(e, 12, "VP8X") && e.length > 20 && !!(e[20] & 2);
}
function Tp(e) {
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
		if (Sp(e, t + 4, "acTL")) return !0;
		if (Sp(e, t + 4, "IDAT") || Sp(e, t + 4, "IEND")) return !1;
		t += 12 + n;
	}
	return !1;
}
function Ep(e) {
	return e instanceof Uint8Array ? Cp(e) ? "gif" : wp(e) ? "webp" : Tp(e) ? "png" : null : null;
}
async function Dp(e) {
	if (!/^image\/(?:gif|webp|png|apng)$/i.test(e.type || "") && !/\.(?:gif|webp|a?png)$/i.test(e.name || "")) return null;
	if (e.size > 4e6) {
		let t = new Uint8Array(await e.slice(0, yp).arrayBuffer());
		if (Ep(t) || bp(t)) throw new xp(e.size);
		return null;
	}
	let t = new Uint8Array(await e.arrayBuffer()), n = Ep(t);
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
async function Op(e, t = mp, { still: n = !1 } = {}) {
	if (Ap(e)) return jp(await e.text());
	let r = n ? null : await Dp(e);
	if (r) return r;
	let i = await createImageBitmap(e), a = Math.min(1, t / Math.max(i.width, i.height)), o = Math.round(i.width * a), s = Math.round(i.height * a), c = document.createElement("canvas");
	c.width = o, c.height = s, c.getContext("2d").drawImage(i, 0, 0, o, s), i.close();
	let l = (e) => new Promise((t) => c.toBlob(t, "image/webp", e)), u = await l(hp);
	return u.size > 4e5 && (u = await l(gp)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(u);
		}),
		bytes: u.size,
		width: o,
		height: s
	};
}
var kp = "image/svg+xml";
function Ap(e) {
	return e.type === kp || /\.svg$/i.test(e.name || "");
}
function jp(e) {
	let t = String(e ?? "");
	if (!/<svg[\s>]/i.test(t)) throw Error("Invalid SVG");
	if (/<\s*script[\s>]/i.test(t) || /<\s*foreignObject[\s>]/i.test(t) || /\son[a-z]+\s*=/i.test(t) || /javascript:/i.test(t)) throw Error("The SVG contains scripts or event handlers and cannot be used");
	let n = new Blob([t]).size, r = `data:${kp};base64,${btoa(unescape(encodeURIComponent(t)))}`, i = t.match(/<svg\b[^>]*>/i)?.[0] ?? "", a = i.match(/viewBox\s*=\s*["']\s*([-\d.]+(?:[\s,]+[-\d.]+){3})\s*["']/i)?.[1]?.split(/[\s,]+/).map(Number);
	return {
		dataUrl: r,
		bytes: n,
		width: a?.length === 4 ? a[2] : Number.parseFloat(i.match(/\bwidth\s*=\s*["']?([\d.]+)/i)?.[1]) || 0,
		height: a?.length === 4 ? a[3] : Number.parseFloat(i.match(/\bheight\s*=\s*["']?([\d.]+)/i)?.[1]) || 0
	};
}
function Mp(e, t, n = .04) {
	let r = String(e ?? "");
	if (!t || !(t.width > 0) || !(t.height > 0)) return r;
	let i = r.match(/<svg\b[^>]*>/i)?.[0];
	if (!i) return r;
	let a = (e) => Math.round(e * 1e3) / 1e3, o = Math.max(t.width, t.height) * Math.max(0, n), s = a(t.x - o), c = a(t.y - o), l = a(t.width + 2 * o), u = a(t.height + 2 * o), d = i.replace(/\sviewBox\s*=\s*["'][^"']*["']/i, "").replace(/\swidth\s*=\s*["'][^"']*["']/i, "").replace(/\sheight\s*=\s*["'][^"']*["']/i, "").replace(/<svg\b/i, `<svg viewBox="${s} ${c} ${l} ${u}" width="${l}" height="${u}"`);
	return r.replace(i, d);
}
function Np(e) {
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
function Pp(e) {
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
function Fp(e, t = "image") {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || t;
}
function Ip(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region ../template/assets/engine/0.7.4/glyphs.js
var Lp = "urd-recent-glyphs", Rp = "urd-recent-icons", zp = [
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
function Bp(e, t) {
	return [t, ...(Array.isArray(e) ? e : []).filter((e) => e !== t)].slice(0, 16);
}
var Vp = (e) => {
	try {
		let t = JSON.parse(localStorage.getItem(e) ?? "[]");
		return Array.isArray(t) ? t : [];
	} catch {
		return [];
	}
}, Hp = (e, t, n) => {
	let r = Bp(t, n);
	try {
		localStorage.setItem(e, JSON.stringify(r));
	} catch {}
	return r;
};
function Up() {
	return Vp(Lp);
}
function Wp(e) {
	return Hp(Lp, Up(), e);
}
function Gp() {
	return Vp(Rp);
}
function Kp(e) {
	return Hp(Rp, Gp(), e);
}
//#endregion
//#region src/lib/GlyphPicker.svelte
var qp = /* @__PURE__ */ R("<button type=\"button\"><span class=\"gp-svg svelte-15ln1c3\"></span></button>"), Jp = /* @__PURE__ */ R("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), Yp = /* @__PURE__ */ R("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"><!> <!></div>", 1), Xp = /* @__PURE__ */ R("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), Zp = /* @__PURE__ */ R("<button type=\"button\"> </button>"), Qp = /* @__PURE__ */ R("<div class=\"gp-group svelte-15ln1c3\"> </div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\"> </button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\"> </p>", 1), $p = /* @__PURE__ */ R("<!> <!> <!> <!>", 1), em = /* @__PURE__ */ R("<img class=\"gp-own svelte-15ln1c3\"/>"), tm = /* @__PURE__ */ R("<span class=\"gp-svg svelte-15ln1c3\"></span>"), nm = /* @__PURE__ */ R("<div class=\"gp-pop gp-anchored svelte-15ln1c3\" popover=\"auto\"><!></div>"), rm = /* @__PURE__ */ R("<div class=\"gp-pop svelte-15ln1c3\"><!></div>"), im = /* @__PURE__ */ R("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"><!></button> <!></span>");
function am(e, t) {
	it(t, !0);
	let n = (e) => {
		var n = $p(), a = M(n), o = (e) => {
			var t = Yp(), n = M(t), r = N(n, !0), a = P(n, 2), o = j(a);
			ui(o, 16, () => I(f), (e) => e, (e, t) => {
				var n = qp();
				let r;
				var a = j(n);
				H(a, () => Zs(t), !0), D(a), D(n), F((e) => {
					r = Pi(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, r, { active: t === i() }), G(n, "title", e);
				}, [() => K(Ys[t].labelKey)]), L("click", n, () => w(t)), z(e, n);
			});
			var c = P(o, 2), l = (e) => {
				var t = Yr();
				ui(M(t), 16, () => I(d), (e) => e, (e, t) => {
					var n = Jp(), r = N(n, !0);
					F(() => B(r, t)), L("click", n, () => C(t)), z(e, n);
				}), z(e, t);
			};
			V(c, (e) => {
				s() || e(l);
			}), D(a), F((e) => B(r, e), [() => K("common.recent")]), z(e, t);
		};
		V(a, (e) => {
			(I(d).length || I(f).length) && e(o);
		});
		var c = P(a, 2), l = (e) => {
			var t = Yr();
			ui(M(t), 17, () => Xs, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ O(() => g(I(t), 2));
				let r = () => I(n)[0], a = () => I(n)[1];
				var o = Xp(), s = M(o), c = N(s, !0), l = P(s, 2);
				ui(l, 20, a, (e) => e, (e, t) => {
					var n = qp();
					let r;
					var a = j(n);
					H(a, () => Zs(t), !0), D(a), D(n), F((e) => {
						r = Pi(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, r, { active: t === i() }), G(n, "title", e);
					}, [() => K(Ys[t].labelKey)]), L("click", n, () => w(t)), z(e, n);
				}), D(l), F((e) => B(c, e), [() => K(r())]), z(e, o);
			}), z(e, t);
		};
		V(c, (e) => {
			t.onicon && e(l);
		});
		var u = P(c, 2), p = (e) => {
			var t = Yr();
			ui(M(t), 17, () => zp, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ O(() => g(I(t), 2));
				let i = () => I(n)[0], a = () => I(n)[1];
				var o = Xp(), s = M(o), c = N(s, !0), l = P(s, 2);
				ui(l, 20, () => a().split(" "), (e) => e, (e, t) => {
					var n = Zp();
					let i;
					var a = N(n, !0);
					F(() => {
						i = Pi(n, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === r() }), B(a, t);
					}), L("click", n, () => C(t)), z(e, n);
				}), D(l), F((e) => B(c, e), [() => K(i())]), z(e, o);
			}), z(e, t);
		};
		V(u, (e) => {
			s() || e(p);
		});
		var m = P(u, 2), _ = (e) => {
			var t = Qp(), n = M(t), r = N(n, !0), i = P(n, 2), a = N(i, !0), o = P(i, 2);
			Zi(o, (e) => A(h, e), () => I(h));
			var s = N(P(o, 2), !0);
			F((e, t, n) => {
				B(r, e), B(a, t), B(s, n);
			}, [
				() => K("gp.ownIcon"),
				() => K("gp.upload"),
				() => K("gp.uploadHint")
			]), L("click", i, () => I(h).click()), L("change", o, T), z(e, t);
		};
		V(m, (e) => {
			t.onimage && e(_);
		}), z(e, n);
	}, r = ra(t, "value", 3, "★"), i = ra(t, "icon", 3, null), a = ra(t, "image", 3, null), o = ra(t, "label", 19, () => K("gp.pickGlyph")), s = ra(t, "iconsOnly", 3, !1), c = Ta(), l = Da("urd-gp"), u = l.slice(2), d = /* @__PURE__ */ k(pn([])), f = /* @__PURE__ */ k(pn([])), p = /* @__PURE__ */ k(null), m = /* @__PURE__ */ k(null), h = /* @__PURE__ */ k(null), _ = /* @__PURE__ */ k(!1), v = /* @__PURE__ */ k(pn({
		top: 0,
		left: 0
	}));
	function y() {
		A(d, Up(), !0), A(f, t.onicon ? Gp().filter((e) => Ys[e]) : [], !0);
	}
	function b(e) {
		A(_, e.newState === "open"), Oa(I(p), I(_)), I(_) && y();
	}
	function x() {
		c && I(m)?.hidePopover(), A(_, !1);
	}
	function S() {
		y();
		let e = I(p).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		A(v, {
			top: n,
			left: t
		}, !0), A(_, !0);
	}
	function C(e) {
		Wp(e), t.onpick?.(e), x();
	}
	function w(e) {
		Kp(e), t.onicon?.(e), x();
	}
	async function T(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", n) {
			try {
				let e = await Op(n, 256, { still: !0 });
				t.onimage?.(e.dataUrl);
			} catch (e) {
				console.warn("Urd: the icon could not be read", e);
			}
			x();
		}
	}
	Nn(() => {
		if (!I(_)) return;
		let e = () => x();
		if (window.addEventListener("blur", e), c) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			I(p) && !I(p).contains(e.target) && A(_, !1);
		}, n = (e) => {
			e.key === "Escape" && A(_, !1);
		}, r = (e) => {
			I(p) && e.target instanceof Node && !I(p).contains(e.target) && A(_, !1);
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var E = im(), ee = j(E), te = j(ee), ne = (e) => {
		var t = em();
		F((e) => {
			G(t, "src", a()), G(t, "alt", e);
		}, [() => K("gp.ownIcon")]), z(e, t);
	}, re = (e) => {
		var t = tm();
		H(t, () => Zs(i()), !0), D(t), z(e, t);
	}, ie = (e) => {
		var t = Jr();
		F(() => B(t, r() || "★")), z(e, t);
	};
	V(te, (e) => {
		a() ? e(ne) : i() && Ys[i()] ? e(re, 1) : e(ie, -1);
	}), D(ee);
	var ae = P(ee, 2), oe = (e) => {
		var t = nm(), r = j(t), i = (e) => {
			n(e);
		};
		V(r, (e) => {
			I(_) && e(i);
		}), D(t), Zi(t, (e) => A(m, e), () => I(m)), F(() => {
			G(t, "id", u), Ii(t, `position-anchor: ${l ?? ""}`);
		}), zr("toggle", t, b), z(e, t);
	}, se = (e) => {
		var t = rm(), r = j(t);
		n(r), D(t), F(() => Ii(t, `top: ${I(v).top ?? ""}px; left: ${I(v).left ?? ""}px`)), z(e, t);
	};
	V(ae, (e) => {
		c ? e(oe) : I(_) && e(se, 1);
	}), D(E), Zi(E, (e) => A(p, e), () => I(p)), F(() => {
		G(ee, "title", o()), G(ee, "aria-label", o()), G(ee, "popovertarget", c ? u : void 0), Ii(ee, c ? `anchor-name: ${l}` : void 0);
	}), L("click", ee, function(...e) {
		(c ? void 0 : () => I(_) ? A(_, !1) : S())?.apply(this, e);
	}), z(e, E), at();
}
Br(["click", "change"]);
//#endregion
//#region src/lib/LinkList.svelte
var om = /* @__PURE__ */ R("<button class=\"ghost row-tool\"></button>"), sm = /* @__PURE__ */ R("<div class=\"nav-row link-row\"><span class=\"nav-line\"><!> <input class=\"nav-target\"/> <!></span> <span class=\"nav-line\"><input class=\"nav-target\" spellcheck=\"false\"/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span></div>"), cm = /* @__PURE__ */ R("<!> <button class=\"ghost action\"> </button>", 1);
function lm(e, t) {
	it(t, !0);
	let n = ra(t, "links", 19, () => []);
	var r = cm(), i = M(r);
	ui(i, 19, n, (e, t) => e.id ?? t, (e, r, i) => {
		var a = sm(), o = j(a), s = j(o);
		{
			let e = /* @__PURE__ */ O(() => I(r).image ? null : I(r).icon || null), n = /* @__PURE__ */ O(() => I(r).image || null), a = /* @__PURE__ */ O(() => K("blocks.icon"));
			am(s, {
				iconsOnly: !0,
				value: "",
				get icon() {
					return I(e);
				},
				get image() {
					return I(n);
				},
				get label() {
					return I(a);
				},
				onicon: (e) => t.onchange(I(i), {
					icon: e,
					image: ""
				}),
				onimage: (e) => t.onchange(I(i), {
					image: e,
					icon: ""
				})
			});
		}
		var c = P(s, 2);
		U(c);
		var l = P(c, 2), u = (e) => {
			var n = om();
			H(n, () => q.cross, !0), D(n), F((e) => G(n, "title", e), [() => K("ui.ownIconRemove")]), L("click", n, () => t.onchange(I(i), {
				image: "",
				icon: "globe"
			})), z(e, n);
		};
		V(l, (e) => {
			I(r).image && e(u);
		}), D(o);
		var d = P(o, 2), f = j(d);
		U(f);
		var p = P(f, 2), m = j(p);
		H(m, () => q.up, !0), D(m);
		var h = P(m, 2);
		H(h, () => q.down, !0), D(h);
		var g = P(h, 2);
		H(g, () => q.cross, !0), D(g), D(p), D(d), D(a), F((e, t, a, o, s, l, u) => {
			W(c, I(r).label ?? ""), G(c, "placeholder", e), G(c, "title", t), G(c, "data-link-label", I(r).id), W(f, I(r).url ?? ""), G(f, "placeholder", a), G(f, "title", o), G(m, "title", s), m.disabled = I(i) === 0, G(h, "title", l), h.disabled = I(i) === n().length - 1, G(g, "title", u);
		}, [
			() => I(r).icon ? Ys[I(r).icon]?.label : K("lbl.linkLabel"),
			() => K("tip.link.label"),
			() => K("ph.hrefMailto"),
			() => K("tip.link.url"),
			() => K("tip.moveUp"),
			() => K("tip.moveDown"),
			() => K("tip.removeLink")
		]), L("change", c, (e) => t.onchange(I(i), { label: e.target.value.trim() })), L("change", f, (e) => t.onchange(I(i), { url: e.target.value.trim() })), L("click", m, () => t.onmove(I(i), -1)), L("click", h, () => t.onmove(I(i), 1)), L("click", g, () => t.onremove(I(i))), z(e, a);
	});
	var a = P(i, 2), o = N(a, !0);
	F((e) => B(o, e), [() => K("ui.addSiteLink")]), L("click", a, function(...e) {
		t.onadd?.apply(this, e);
	}), z(e, r), at();
}
Br(["change", "click"]);
//#endregion
//#region src/panels/SitePanel.svelte
var um = /* @__PURE__ */ R("<p class=\"panel-hint place-error\"> </p>"), dm = /* @__PURE__ */ R("<span class=\"site-cal-color\"><!> <span> </span></span>"), fm = /* @__PURE__ */ R("<div><button type=\"button\" class=\"site-cal-head\"><span class=\"site-cal-dot\" aria-hidden=\"true\"></span> <span class=\"site-cal-text\"><span class=\"site-cal-name\"> </span> <span class=\"site-cal-addr\"> </span></span> <span class=\"site-cal-chev\" aria-hidden=\"true\"></span></button> <div class=\"site-cal-body\"><div class=\"site-cal-clip\"><div class=\"site-cal-fields\"><span class=\"mini-label site-cal-section\"> </span> <label class=\"site-cal-field\"> <input/></label> <label class=\"site-cal-field\"> <input spellcheck=\"false\"/></label> <label class=\"site-cal-field\"> <input/></label> <span class=\"mini-label site-cal-section\"> </span> <div class=\"site-cal-colors\"><span class=\"site-cal-color\"><!> <span> </span></span> <!></div> <span class=\"mini-label site-cal-section\"> </span> <label class=\"site-cal-field\"> <input placeholder=\"https://\" spellcheck=\"false\"/></label> <label class=\"site-cal-field\"> <input/></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <div class=\"site-cal-foot\"><span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span> <button type=\"button\" class=\"site-cal-remove\"> </button></div></div></div></div></div>"), pm = /* @__PURE__ */ R("<div class=\"site-cal-list\"></div>"), mm = /* @__PURE__ */ R("<div class=\"cw-row\"><span class=\"mini-label cw-screen\"> </span> <span><span class=\"cw-fill\"></span></span> <span class=\"gridmenu-value cw-margin\"> </span></div>"), hm = /* @__PURE__ */ R("<div class=\"mini-label cw-binds\"> </div>"), gm = /* @__PURE__ */ R("<button> </button>"), _m = /* @__PURE__ */ R("<div class=\"ctl-row\"><span class=\"mini-label\"> </span> <input type=\"range\"/> <span class=\"gridmenu-value\"> </span></div>"), vm = /* @__PURE__ */ R("<img class=\"site-icon-preview\"/>"), ym = /* @__PURE__ */ R("<button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button>", 1), bm = /* @__PURE__ */ R("<div class=\"panel-body\"><label> <input/></label> <label> <input/></label> <label> <!></label> <label> <input placeholder=\"Europe/Oslo\" spellcheck=\"false\"/></label> <!> <label> <!></label> <label> <input placeholder=\"meet.example.org\" spellcheck=\"false\"/></label> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><button type=\"button\" class=\"site-cal-add\"><!> </button> <!></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><!></div></details> <hr class=\"gridmenu-divider\"/> <p class=\"panel-strong\"> </p> <div class=\"sample cw-sample\"><!> <div class=\"cw-legend\"><span class=\"mini-label\"> </span> <span class=\"mini-label\"> </span></div> <!></div> <div class=\"seg cw-seg\"></div> <!> <p class=\"mini-label\"> </p> <div class=\"seg cw-seg\"></div> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><div class=\"ctl-row\"><span class=\"mini-label\"> </span> <input type=\"range\"/> <span class=\"gridmenu-value\"> </span></div></div></details> <hr class=\"gridmenu-divider\"/> <label> <!></label> <span class=\"toolbar-row\"><label class=\"ghost filepick tb-grow\"> <input type=\"file\" accept=\"image/*\"/></label> <!></span></div>");
function xm(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.bindsFrom), i = /* @__PURE__ */ O(() => n.layoutGutter), a = /* @__PURE__ */ O(() => n.layoutWidth), o = /* @__PURE__ */ O(() => n.siteDraft), { addSiteCalendar: s, setStatus: c, siteCalendars: l, siteLangOptions: u, siteLangValue: d, siteMutate: f, svgAutoTrim: p, themeSwatches: m, siteLinks: h, addSiteLink: _, removeSiteLink: v, moveSiteLink: y, setSiteLink: b } = n;
	async function x(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		if (t.type === "image/svg+xml" || /\.svg$/i.test(t.name || "")) {
			try {
				let e = await p(t);
				n.iconEditorImage = e.dataUrl;
			} catch {
				c(K("status.imageReadErrorSvg"), "error");
			}
			return;
		}
		let r = new FileReader();
		r.onload = () => {
			n.iconEditorImage = String(r.result);
		}, r.onerror = () => c(K("status.imageReadError"), "error"), r.readAsDataURL(t);
	}
	function S() {
		f("edit:site-icon", () => {
			delete I(o).site.icon;
		});
	}
	function C(e) {
		f("edit:site-title", () => {
			I(o).site.title = e;
		});
	}
	function w(e) {
		f("edit:site-desc", () => {
			I(o).site.description = e;
		});
	}
	let T = /* @__PURE__ */ O(() => op(I(a))), E = /* @__PURE__ */ O(() => $f.find((e) => e.gutter === I(i))?.id ?? null), ee = /* @__PURE__ */ k(!1), te = /* @__PURE__ */ O(() => I(a) === "full" ? Qf : np(I(a))), ne = /* @__PURE__ */ O(() => tp.map((e) => ({
		screen: e,
		...ap(I(a), I(i), e)
	})));
	function re(e, t) {
		f(t, () => {
			let t = {
				...I(o).layout ?? {},
				contentWidth: I(a),
				gutter: I(i),
				...e
			};
			for (let e of Object.keys(t)) t[e] === void 0 && delete t[e];
			I(o).layout = t;
		});
	}
	let ie = (e) => re({ contentWidth: e === "full" ? "full" : np(e) }, "edit:site-width"), ae = (e) => re({ gutter: rp(e) }, "edit:site-gutter");
	function oe(e) {
		f("site", () => {
			I(o).site.lang = e;
		});
	}
	function se(e) {
		let t = fp(e);
		f("site", () => {
			t.length ? I(o).site.meetingHosts = t : delete I(o).site.meetingHosts;
		});
	}
	function ce(e) {
		f("site", () => {
			I(o).site.calendars[e]?.id === n.openSiteCalendar && (n.openSiteCalendar = null), I(o).site.calendars.splice(e, 1), I(o).site.calendars.length || delete I(o).site.calendars;
		});
	}
	function le(e, t) {
		f("site", () => {
			let n = I(o).site.calendars, r = e + t;
			r < 0 || r >= n.length || ([n[e], n[r]] = [n[r], n[e]]);
		});
	}
	function ue(e, t, n, r = !1) {
		let i = String(n ?? "").trim();
		f(`edit:site-cal-${e}-${t}`, () => {
			let n = I(o).site.calendars[e];
			i || r ? n[t] = i : delete n[t];
		});
	}
	function de(e, t, n) {
		f("site", () => {
			let r = I(o).site.calendars[e];
			n ? delete r[t] : r[t] = !1;
		});
	}
	function fe(e) {
		f("site", () => {
			e && e !== "osm" ? I(o).site.mapService = e : delete I(o).site.mapService;
		});
	}
	function pe(e) {
		let t = e.trim();
		n.siteZoneBad = t !== "" && !sp(t), !n.siteZoneBad && f("site", () => {
			t ? I(o).site.timeZone = t : delete I(o).site.timeZone;
		});
	}
	var me = bm(), he = j(me), ge = j(he), _e = P(ge);
	U(_e), D(he);
	var ve = P(he, 2), ye = j(ve), be = P(ye);
	U(be), D(ve);
	var xe = P(ve, 2), Se = j(xe), Ce = P(Se);
	{
		let e = /* @__PURE__ */ O(d), t = /* @__PURE__ */ O(u);
		J(Ce, {
			get value() {
				return I(e);
			},
			get options() {
				return I(t);
			},
			onchange: (e) => oe(e)
		});
	}
	D(xe);
	var we = P(xe, 2), Te = j(we), Ee = P(Te);
	U(Ee);
	let De;
	D(we);
	var Oe = P(we, 2), ke = (e) => {
		var t = um(), n = N(t, !0);
		F((e) => B(n, e), [() => K("settings.timeZoneBad")]), z(e, t);
	};
	V(Oe, (e) => {
		n.siteZoneBad && e(ke);
	});
	var Ae = P(Oe, 2), je = j(Ae), Me = P(je);
	{
		let e = /* @__PURE__ */ O(() => up(I(o))), t = /* @__PURE__ */ O(() => lp.map((e) => [
			e,
			K(`mapService.${e}`),
			K(`mapService.${e}.note`)
		]));
		J(Me, {
			get value() {
				return I(e);
			},
			get options() {
				return I(t);
			},
			onchange: (e) => fe(e)
		});
	}
	D(Ae);
	var Ne = P(Ae, 2), Pe = j(Ne), Fe = P(Pe);
	U(Fe), D(Ne);
	var Ie = P(Ne, 2), Le = j(Ie), Re = N(Le, !0), ze = P(Le, 2), Be = j(ze), Ve = j(Be);
	H(Ve, () => q.plus);
	var He = P(Ve);
	D(Be);
	var Ue = P(Be, 2), We = (e) => {
		var t = pm();
		ui(t, 23, l, (e) => e.id, (e, t, r) => {
			let i = /* @__PURE__ */ O(() => n.openSiteCalendar === I(t).id);
			var a = fm();
			let o;
			var s = j(a), c = j(s);
			let u;
			var d = P(c, 2), f = j(d), p = N(f, !0), h = N(P(f, 2), !0);
			D(d);
			var _ = P(d, 2);
			H(_, () => q.down, !0), D(_), D(s);
			var v = P(s, 2), y = j(v), b = j(y), x = j(b), S = N(x, !0), C = P(x, 2), w = j(C), T = P(w);
			U(T), D(C);
			var E = P(C, 2), ee = j(E), te = P(ee);
			U(te), D(E);
			var ne = P(E, 2), re = j(ne), ie = P(re);
			U(ie), D(ne);
			var ae = P(ne, 2), oe = N(ae, !0), se = P(ae, 2), fe = j(se), pe = j(fe);
			{
				let e = /* @__PURE__ */ O(() => I(t).color || "accent"), n = /* @__PURE__ */ O(m), i = /* @__PURE__ */ O(() => K("siteCal.colorMain"));
				rl(pe, {
					get value() {
						return I(e);
					},
					get tokens() {
						return I(n);
					},
					get label() {
						return I(i);
					},
					onchange: (e) => ue(I(r), "color", e ?? "")
				});
			}
			var me = N(P(pe, 2), !0);
			D(fe), ui(P(fe, 2), 16, () => [
				["colorText", "siteCal.colorText"],
				["colorBox", "siteCal.colorBox"],
				["colorChip", "siteCal.colorChip"]
			], ([e, t]) => e, (e, n) => {
				var i = /* @__PURE__ */ O(() => g(n, 2));
				let a = () => I(i)[0], o = () => I(i)[1];
				var s = dm(), c = j(s);
				{
					let e = /* @__PURE__ */ O(() => I(t)[a()] || ""), n = /* @__PURE__ */ O(m), i = /* @__PURE__ */ O(() => K(o()));
					rl(c, {
						get value() {
							return I(e);
						},
						get tokens() {
							return I(n);
						},
						allowClear: !0,
						get label() {
							return I(i);
						},
						onchange: (e) => ue(I(r), a(), e ?? "")
					});
				}
				var l = N(P(c, 2), !0);
				D(s), F((e, t) => {
					G(s, "title", e), B(l, t);
				}, [() => K(`tip.${o()}`), () => K(o())]), z(e, s);
			}), D(se);
			var he = P(se, 2), ge = N(he, !0), _e = P(he, 2), ve = j(_e), ye = P(ve);
			U(ye), D(_e);
			var be = P(_e, 2), xe = j(be), Se = P(xe);
			U(Se), D(be);
			var Ce = P(be, 2), we = j(Ce);
			U(we);
			var Te = P(we);
			D(Ce);
			var Ee = P(Ce, 2), De = j(Ee);
			U(De);
			var Oe = P(De);
			D(Ee);
			var ke = P(Ee, 2), Ae = j(ke), je = j(Ae);
			H(je, () => q.up, !0), D(je);
			var Me = P(je, 2);
			H(Me, () => q.down, !0), D(Me), D(Ae);
			var Ne = P(Ae, 2), Pe = N(Ne, !0);
			D(ke), D(b), D(y), D(v), D(a), F((e, n, l, d, f, m, g, _, y, b, x, C, E, ae, se, ce, le, ue, de, pe, he, D, ke, Ae, Fe, Ie) => {
				o = Pi(a, 1, "site-cal-row", null, o, { open: I(i) }), G(s, "aria-expanded", I(i)), u = Ii(c, "", u, { background: e }), B(p, n), B(h, l), v.inert = !I(i), B(S, d), B(w, `${f ?? ""} `), W(T, I(t).name ?? ""), G(T, "placeholder", m), G(T, "title", g), G(T, "data-cal-name", I(t).id), B(ee, `${_ ?? ""} `), W(te, I(t).url), G(te, "placeholder", y), G(ne, "title", b), B(re, `${x ?? ""} `), W(ie, I(t).description ?? ""), B(oe, C), G(fe, "title", E), B(me, ae), B(ge, se), G(_e, "title", ce), B(ve, `${le ?? ""} `), W(ye, I(t).link ?? ""), G(be, "title", ue), B(xe, `${de ?? ""} `), W(Se, I(t).organizer ?? ""), G(Ce, "title", pe), Vi(we, I(t).subscribable !== !1), B(Te, ` ${he ?? ""}`), G(Ee, "title", D), Vi(De, I(t).inFilter !== !1), B(Oe, ` ${ke ?? ""}`), je.disabled = I(r) === 0, Me.disabled = Ae, G(Ne, "title", Fe), B(Pe, Ie);
			}, [
				() => pp(I(t).color),
				() => I(t).name || I(t).url || K("ui.addSiteCalendar"),
				() => I(t).url || K("calendar.sourceUrl"),
				() => K("group.siteCalBasics"),
				() => K("lbl.name"),
				() => K("calendar.sourceName"),
				() => K("tip.calendar.sourceName"),
				() => K("calendar.sourceUrl"),
				() => K("calendar.sourcesPh"),
				() => K("tip.siteCal.description"),
				() => K("siteCal.description"),
				() => K("group.siteCalColors"),
				() => K("tip.calendar.sourceColor"),
				() => K("siteCal.colorMain"),
				() => K("group.siteCalVisitors"),
				() => K("tip.siteCal.link"),
				() => K("siteCal.link"),
				() => K("tip.siteCal.organizer"),
				() => K("siteCal.organizer"),
				() => K("tip.siteCal.subscribable"),
				() => K("siteCal.subscribable"),
				() => K("tip.siteCal.inFilter"),
				() => K("siteCal.inFilter"),
				() => I(r) === l().length - 1,
				() => K("tip.site.removeCalendar"),
				() => K("siteCal.remove")
			]), L("click", s, () => n.openSiteCalendar = I(i) ? null : I(t).id), L("change", T, (e) => ue(I(r), "name", e.target.value)), L("change", te, (e) => ue(I(r), "url", e.target.value, !0)), L("change", ie, (e) => ue(I(r), "description", e.target.value)), L("change", ye, (e) => ue(I(r), "link", e.target.value)), L("change", Se, (e) => ue(I(r), "organizer", e.target.value)), L("change", we, (e) => de(I(r), "subscribable", e.target.checked)), L("change", De, (e) => de(I(r), "inFilter", e.target.checked)), L("click", je, () => le(I(r), -1)), L("click", Me, () => le(I(r), 1)), L("click", Ne, () => ce(I(r))), z(e, a);
		}), D(t), z(e, t);
	}, Ge = /* @__PURE__ */ O(() => l().length);
	V(Ue, (e) => {
		I(Ge) && e(We);
	}), D(ze), D(Ie);
	var Ke = P(Ie, 2), qe = j(Ke), Je = N(qe, !0), Ye = P(qe, 2), Xe = j(Ye);
	{
		let e = /* @__PURE__ */ O(h);
		lm(Xe, {
			get links() {
				return I(e);
			},
			onchange: (e, t) => b(e, t),
			onadd: () => _(),
			onremove: (e) => v(e),
			onmove: (e, t) => y(e, t)
		});
	}
	D(Ye), D(Ke);
	var Ze = P(Ke, 4), Qe = N(Ze, !0), $e = P(Ze, 2), et = j($e);
	ui(et, 17, () => I(ne), (e) => e.screen, (e, t) => {
		var n = mm(), r = j(n), i = N(r, !0), a = P(r, 2);
		let o;
		var s = N(a), c = N(P(a, 2), !0);
		D(n), F(() => {
			B(i, I(t).screen), o = Pi(a, 1, "cw-bar", null, o, { fluid: !I(t).bound }), Ii(s, `width:${I(t).pct ?? ""}%`), B(c, I(t).bound ? `${I(t).margin}` : "-");
		}), z(e, n);
	});
	var tt = P(et, 2), rt = j(tt), ot = N(rt, !0), st = N(P(rt, 2), !0);
	D(tt);
	var ct = P(tt, 2), lt = (e) => {
		var t = hm(), n = N(t, !0);
		F((e) => B(n, e), [() => K("lbl.bindsFrom", { n: I(r) })]), z(e, t);
	};
	V(ct, (e) => {
		I(a) !== "full" && e(lt);
	}), D($e);
	var ut = P($e, 2);
	ui(ut, 21, () => ep, (e) => e.id, (e, t) => {
		var n = gm();
		let r;
		var i = N(n, !0);
		F((e) => {
			r = Pi(n, 1, "", null, r, { on: I(T) === I(t).id }), B(i, e);
		}, [() => K(`lbl.width.${I(t).id}`)]), L("click", n, () => ie(I(t).width)), z(e, n);
	}), D(ut);
	var dt = P(ut, 2), ft = (e) => {
		var t = _m(), n = j(t), r = N(n, !0), i = P(n, 2);
		U(i);
		var a = N(P(i, 2));
		D(t), F((e, n) => {
			G(t, "title", e), B(r, n), G(i, "min", 960), G(i, "max", Qf), G(i, "step", 20), W(i, I(te)), B(a, `${I(te) ?? ""} px`);
		}, [() => K("tip.site.contentWidthFree"), () => K("lbl.widthFree")]), L("input", i, (e) => ie(e.target.valueAsNumber)), z(e, t);
	};
	V(dt, (e) => {
		I(a) !== "full" && e(ft);
	});
	var pt = P(dt, 2), mt = N(pt, !0), ht = P(pt, 2);
	ui(ht, 21, () => $f, (e) => e.id, (e, t) => {
		var n = gm();
		let r;
		var i = N(n, !0);
		F((e) => {
			r = Pi(n, 1, "", null, r, { on: I(E) === I(t).id }), B(i, e);
		}, [() => K(`lbl.gutter.${I(t).id}`)]), L("click", n, () => ae(I(t).gutter)), z(e, n);
	}), D(ht);
	var gt = P(ht, 2), _t = j(gt), vt = N(_t, !0), yt = P(_t, 2), bt = j(yt), xt = j(bt), St = N(xt, !0), Ct = P(xt, 2);
	U(Ct);
	var wt = N(P(Ct, 2));
	D(bt), D(yt), D(gt);
	var Tt = P(gt, 4), Et = j(Tt), Dt = P(Et), Ot = (e) => {
		var t = vm();
		F((e) => {
			G(t, "src", I(o).site.icon), G(t, "alt", e);
		}, [() => K("lbl.siteIcon")]), z(e, t);
	};
	V(Dt, (e) => {
		I(o).site.icon && e(Ot);
	}), D(Tt);
	var kt = P(Tt, 2), At = j(kt), jt = j(At), Mt = P(jt);
	D(At);
	var Nt = P(At, 2), Pt = (e) => {
		var t = ym(), r = M(t);
		H(r, () => q.pencil ?? "✎", !0), D(r);
		var i = P(r, 2);
		H(i, () => q.cross, !0), D(i), F((e, t) => {
			G(r, "title", e), G(i, "title", t);
		}, [() => K("tip.site.editIcon"), () => K("tip.site.removeIcon")]), L("click", r, () => n.iconEditorImage = I(o).site.icon), L("click", i, S), z(e, t);
	};
	V(Nt, (e) => {
		I(o).site.icon && e(Pt);
	}), D(kt), D(me), F((e, t, r, a, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, te, ne, re, ie, ae, oe, se, ce, le) => {
		G(he, "title", e), B(ge, `${t ?? ""} `), W(_e, I(o).site.title ?? ""), G(_e, "placeholder", r), G(ve, "title", a), B(ye, `${s ?? ""} `), W(be, I(o).site.description ?? ""), G(be, "placeholder", c), G(xe, "title", l), B(Se, `${u ?? ""} `), G(we, "title", d), B(Te, `${f ?? ""} `), W(Ee, I(o).site.timeZone ?? ""), De = Pi(Ee, 1, "", null, De, { "place-error": n.siteZoneBad }), G(Ae, "title", p), B(je, `${m ?? ""} `), G(Ne, "title", h), B(Pe, `${g ?? ""} `), W(Fe, _), G(Le, "title", v), B(Re, y), B(He, ` ${b ?? ""}`), G(qe, "title", x), B(Je, S), G(Ze, "title", C), B(Qe, w), B(ot, T), B(st, te), G(pt, "title", ne), B(mt, re), gt.open = I(E) === null || I(ee), B(vt, ie), G(bt, "title", ae), B(St, oe), G(Ct, "min", 0), G(Ct, "max", 12), G(Ct, "step", 1), W(Ct, I(i)), B(wt, `${I(i) ?? ""} vw`), B(Et, `${se ?? ""} `), G(At, "title", ce), B(jt, `${le ?? ""} `);
	}, [
		() => K("tip.site.name"),
		() => K("lbl.name"),
		() => K("ph.site.name"),
		() => K("tip.site.description"),
		() => K("lbl.description"),
		() => K("ph.site.description"),
		() => K("site.langTitle"),
		() => K("site.langLabel"),
		() => K("tip.settings.timeZone"),
		() => K("settings.timeZone"),
		() => K("tip.settings.mapService"),
		() => K("settings.mapService"),
		() => K("tip.settings.meetingHosts"),
		() => K("settings.meetingHosts"),
		() => (I(o).site.meetingHosts ?? []).join(", "),
		() => K("tip.site.calendars"),
		() => K("group.siteCalendars"),
		() => K("ui.addSiteCalendar"),
		() => K("tip.site.links"),
		() => K("group.siteLinks"),
		() => K("tip.site.contentWidth"),
		() => K("lbl.contentWidth"),
		() => K("lbl.screenPx"),
		() => K("lbl.marginPx"),
		() => K("tip.site.gutter"),
		() => K("lbl.gutter"),
		() => K("group.advanced"),
		() => K("tip.site.gutterVw"),
		() => K("lbl.gutterVw"),
		() => K("lbl.siteIcon"),
		() => K("tip.site.icon"),
		() => I(o).site.icon ? K("ui.changeIcon") : K("ui.chooseIcon")
	]), L("input", _e, (e) => C(e.target.value)), L("input", be, (e) => w(e.target.value)), L("change", Ee, (e) => pe(e.target.value)), L("change", Fe, (e) => se(e.target.value)), L("click", Be, () => s()), Qi("open", "toggle", Ie, (e) => n.siteCalendarsOpen = e, () => n.siteCalendarsOpen), Qi("open", "toggle", Ke, (e) => n.siteLinksOpen = e, () => n.siteLinksOpen), zr("toggle", gt, (e) => A(ee, e.currentTarget.open, !0)), L("input", Ct, (e) => ae(e.target.valueAsNumber)), L("change", Mt, x), z(e, me), at();
}
Br([
	"input",
	"change",
	"click"
]);
//#endregion
//#region src/panels/ThemePanel.svelte
var Sm = /* @__PURE__ */ R("<div class=\"mini-label tpv-cap\"> </div>"), Cm = /* @__PURE__ */ R("<div class=\"theme-pvw\"><!> <div class=\"tpv-demo\"><div class=\"tpv-h\"> </div> <div class=\"tpv-card\"> </div> <div class=\"tpv-row\"><span class=\"tpv-btn\"> </span><span class=\"tpv-lnk\"> </span></div></div></div>"), wm = /* @__PURE__ */ R("<button type=\"button\"><span class=\"tp-band\"><i></i><i></i><i></i><i></i></span> <small> </small></button>"), Tm = /* @__PURE__ */ R("<div class=\"ctl-row autorow\"><span class=\"autolbl\"> </span> <span class=\"seg\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div>"), Em = /* @__PURE__ */ R("<span class=\"mini-label\"> </span>"), Dm = /* @__PURE__ */ R("<div class=\"palcol\"><!> <span class=\"palcap\"> </span> <b class=\"palhex\"> </b></div>"), Om = /* @__PURE__ */ R("<div class=\"ctl-row palhead\"><span class=\"mini-label\"> </span> <button type=\"button\"> </button></div> <div></div>", 1), km = /* @__PURE__ */ R("<div class=\"panel-body\"><p class=\"panel-strong\"> </p> <div class=\"theme-presets\"></div> <p class=\"panel-strong\"> </p> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <div class=\"ctl-row palhead\"><!> <button type=\"button\"> </button></div> <div class=\"palcells\"></div> <!> <div class=\"ctl-row palauto-row\"><span class=\"mini-label ctl-name\"> </span> <button type=\"button\"> </button></div> <div class=\"theme-previews\"><!> <!></div> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><label> <!></label> <label> <!></label> <div class=\"sample typo-sample\"><div class=\"ts-h\"> </div> <div class=\"ts-b\"> </div></div></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><div class=\"sample form-prev\"><span class=\"fp-btn\"> </span> <span class=\"fp-card\"> </span></div> <label class=\"ctl-row\"> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"24\" step=\"1\"/> <label class=\"ctl-row\"> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"40\" step=\"1\"/></div></details></div>");
function Am(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.activeThemePreset), i = /* @__PURE__ */ O(() => n.siteDraft), { THEME_PRESETS: a, applyThemePreset: o, readableOn: s, siteMutate: c, suggestAltColors: l, themeHex: u, themeSwatches: d } = n, p = [
		[
			"bg",
			K("palette.bg"),
			K("palette.bgShort")
		],
		[
			"surface",
			K("palette.surface"),
			K("palette.surfaceShort")
		],
		[
			"text",
			K("palette.text"),
			K("palette.textShort")
		],
		[
			"accent",
			K("palette.accent"),
			K("palette.accentShort")
		],
		[
			"accent-text",
			K("palette.accentText"),
			K("palette.accentTextShort")
		]
	], m = /* @__PURE__ */ O(() => !!I(i)?.theme.alt), h = /* @__PURE__ */ O(() => I(i)?.theme.alt?.auto === !0), _ = /* @__PURE__ */ O(() => I(i)?.theme.scheme === "dark" ? "dark" : "light"), v = /* @__PURE__ */ O(() => I(i)?.theme.tokens.color ?? {}), y = /* @__PURE__ */ O(() => ({
		...I(i)?.theme.tokens.color ?? {},
		...I(i)?.theme.alt?.tokens?.color ?? {}
	}));
	function b(e, t) {
		c(`edit:theme-color-${e}`, () => {
			I(i).theme.tokens.color[e] = t, I(i).theme.alt?.auto && (I(i).theme.alt.tokens.color = l());
		});
	}
	function x(e, t) {
		return e === "accent-text" ? s(u(t.accent ?? "#000000", t)) : t.bg;
	}
	let S = /* @__PURE__ */ O(() => !I(i)?.theme?.tokens?.color?.["accent-text"] && !I(i)?.theme?.alt?.tokens?.color?.["accent-text"]);
	function C(e) {
		c("edit:theme-color-accent-text", () => {
			e ? (delete I(i).theme.tokens.color["accent-text"], I(i).theme.alt?.tokens?.color && delete I(i).theme.alt.tokens.color["accent-text"]) : (I(i).theme.tokens.color["accent-text"] = x("accent-text", I(v)), I(i).theme.alt?.auto && (I(i).theme.alt.tokens.color = l()));
		});
	}
	function w(e, t) {
		c("theme", () => {
			I(i).theme.tokens.font[e] = t;
		});
	}
	function T(e, t) {
		c("theme", () => {
			I(i).theme.tokens.radius[e] = t;
		});
	}
	function E(e, t) {
		c(`edit:theme-alt-${e}`, () => {
			I(i).theme.alt.tokens.color[e] = t, I(i).theme.alt.auto = !1;
		});
	}
	function ee(e) {
		c("theme", () => {
			e === "light" ? delete I(i).theme.scheme : I(i).theme.scheme = e;
		});
	}
	function te(e) {
		c("theme", () => {
			e ? I(i).theme.alt = {
				auto: !0,
				tokens: { color: l() }
			} : delete I(i).theme.alt;
		});
	}
	function ne(e) {
		c("theme", () => {
			I(i).theme.alt ??= { tokens: { color: l() } }, I(i).theme.alt.auto = e, e && (I(i).theme.alt.tokens.color = l());
		});
	}
	function re(e) {
		let t = I(i).theme.tokens.font[e];
		return [...Vl.some(([, e]) => e === t) ? [] : [[t, K("opt.customFont")]], ...Vl.map(([e, t]) => [t, K(e)])];
	}
	let ie = (e) => parseInt(e, 10) || 0;
	function ae(e, t) {
		T(e, `${t}px`);
	}
	var oe = km();
	{
		let e = (e, t = f, n = f) => {
			var r = Cm(), i = j(r), a = (e) => {
				var t = Sm(), r = N(t, !0);
				F(() => B(r, n())), z(e, t);
			};
			V(i, (e) => {
				n() && e(a);
			});
			var o = P(i, 2), c = j(o), l = N(c, !0), d = P(c, 2), p = N(d, !0), m = P(d, 2), h = j(m), g = N(h, !0), _ = N(P(h), !0);
			D(m), D(o), D(r), F((e, t, n, r, i, a, s, c, u) => {
				Ii(o, `--tv-bg:${e ?? ""};--tv-surface:${t ?? ""};--tv-text:${n ?? ""};--tv-accent:${r ?? ""};--tv-accent-ink:${i ?? ""}`), B(l, a), B(p, s), B(g, c), B(_, u);
			}, [
				() => u(t().bg, t()),
				() => u(t().surface, t()),
				() => u(t().text, t()),
				() => u(t().accent, t()),
				() => u(t()["accent-text"] ?? s(u(t().accent ?? "#000000", t())), t()),
				() => K("preview.heading"),
				() => K("preview.cardBody"),
				() => K("preview.button"),
				() => K("preview.link")
			]), z(e, r);
		};
		var se = j(oe), ce = N(se, !0), le = P(se, 2);
		ui(le, 21, () => a, (e) => e.id, (e, t) => {
			var n = wm();
			let i;
			var a = j(n), s = j(a), c = P(s), l = P(c), u = P(l);
			D(a);
			var d = N(P(a, 2), !0);
			D(n), F(() => {
				i = Pi(n, 1, "theme-preset", null, i, { sel: I(r) === I(t).id }), G(n, "title", `${I(t).name} - ${I(t).note}`), Ii(s, `background:${I(t).light.bg ?? ""}`), Ii(c, `background:${I(t).light.surface ?? ""}`), Ii(l, `background:${I(t).light.accent ?? ""}`), Ii(u, `background:${I(t).light.text ?? ""}`), B(d, I(t).name);
			}), L("click", n, () => o(I(t))), z(e, n);
		}), D(le);
		var ue = P(le, 2), de = N(ue, !0), fe = P(ue, 2), pe = j(fe);
		U(pe);
		var me = P(pe);
		D(fe);
		var he = P(fe, 2), ge = (e) => {
			var t = Tm(), n = j(t), r = N(n, !0), i = P(n, 2), a = j(i);
			let o;
			var s = N(a, !0), c = P(a, 2);
			let l;
			var u = N(c, !0);
			D(i), D(t), F((e, t, n, i) => {
				B(r, e), G(a, "title", t), o = Pi(a, 1, "", null, o, { on: I(h) }), B(s, n), l = Pi(c, 1, "", null, l, { on: !I(h) }), B(u, i);
			}, [
				() => K("lbl.darkColors"),
				() => K("hint.theme.autoDark"),
				() => K("opt.auto"),
				() => K("opt.custom")
			]), L("click", a, () => ne(!0)), L("click", c, () => ne(!1)), z(e, t);
		};
		V(he, (e) => {
			I(m) && e(ge);
		});
		var _e = P(he, 2), ve = j(_e), ye = (e) => {
			var t = Em(), n = N(t, !0);
			F((e) => B(n, e), [() => K("lbl.light")]), z(e, t);
		};
		V(ve, (e) => {
			I(m) && e(ye);
		});
		var be = P(ve, 2);
		let t;
		var xe = N(be, !0);
		D(_e);
		var Se = P(_e, 2);
		ui(Se, 21, () => p, ([e, t, n]) => e, (e, t) => {
			var n = /* @__PURE__ */ O(() => g(I(t), 3));
			let r = () => I(n)[0], a = () => I(n)[1], o = () => I(n)[2];
			var s = Dm(), c = j(s);
			{
				let e = /* @__PURE__ */ O(() => I(i).theme.tokens.color[r()] ?? x(r(), I(v))), t = /* @__PURE__ */ O(d);
				rl(c, {
					get value() {
						return I(e);
					},
					get tokens() {
						return I(t);
					},
					get label() {
						return a();
					},
					onchange: (e) => b(r(), e)
				});
			}
			var l = P(c, 2), f = N(l, !0), p = N(P(l, 2), !0);
			D(s), F((e) => {
				B(f, o()), B(p, e);
			}, [() => u(I(i).theme.tokens.color[r()] ?? x(r(), I(v)), I(v))]), z(e, s);
		}), D(Se);
		var Ce = P(Se, 2), we = (e) => {
			var t = Om(), n = M(t), r = j(n), a = N(r, !0), o = P(r, 2);
			let s;
			var c = N(o, !0);
			D(n);
			var l = P(n, 2);
			let f;
			ui(l, 21, () => p, ([e, t, n]) => e, (e, t) => {
				var n = /* @__PURE__ */ O(() => g(I(t), 3));
				let r = () => I(n)[0], a = () => I(n)[1], o = () => I(n)[2];
				var s = Dm(), c = j(s);
				{
					let e = /* @__PURE__ */ O(() => I(i).theme.alt.tokens.color[r()] ?? I(y)[r()] ?? x(r(), I(y))), t = /* @__PURE__ */ O(d), n = /* @__PURE__ */ O(() => K("theme.darkColorLabel", { name: a() }));
					rl(c, {
						get value() {
							return I(e);
						},
						get tokens() {
							return I(t);
						},
						get label() {
							return I(n);
						},
						onchange: (e) => E(r(), e)
					});
				}
				var l = P(c, 2), f = N(l, !0), p = N(P(l, 2), !0);
				D(s), F((e) => {
					B(f, o()), B(p, e);
				}, [() => u(I(i).theme.alt.tokens.color[r()] ?? I(y)[r()] ?? x(r(), I(y)), I(y))]), z(e, s);
			}), D(l), F((e, t, n) => {
				B(a, e), s = Pi(o, 1, "chip", null, s, { accent: I(_) === "dark" }), G(o, "title", t), B(c, n), f = Pi(l, 1, "palcells", null, f, { autopal: I(h) });
			}, [
				() => K("lbl.dark"),
				() => K("tip.theme.darkDefault"),
				() => K("common.standard")
			]), L("click", o, () => ee("dark")), z(e, t);
		};
		V(Ce, (e) => {
			I(m) && e(we);
		});
		var Te = P(Ce, 2), Ee = j(Te), De = N(Ee, !0), Oe = P(Ee, 2);
		let n;
		var ke = N(Oe, !0);
		D(Te);
		var Ae = P(Te, 2), je = j(Ae);
		{
			let t = /* @__PURE__ */ O(() => I(m) ? K("lbl.light") : "");
			e(je, () => I(v), () => I(t));
		}
		var Me = P(je, 2), Ne = (t) => {
			{
				let n = /* @__PURE__ */ O(() => K("lbl.dark"));
				e(t, () => I(y), () => I(n));
			}
		};
		V(Me, (e) => {
			I(m) && e(Ne);
		}), D(Ae);
		var Pe = P(Ae, 2), Fe = j(Pe), Ie = N(Fe, !0), Le = P(Fe, 2), Re = j(Le), ze = j(Re), Be = P(ze);
		{
			let e = /* @__PURE__ */ O(() => re("heading"));
			J(Be, {
				get value() {
					return I(i).theme.tokens.font.heading;
				},
				get options() {
					return I(e);
				},
				onchange: (e) => w("heading", e)
			});
		}
		D(Re);
		var Ve = P(Re, 2), He = j(Ve), Ue = P(He);
		{
			let e = /* @__PURE__ */ O(() => re("body"));
			J(Ue, {
				get value() {
					return I(i).theme.tokens.font.body;
				},
				get options() {
					return I(e);
				},
				onchange: (e) => w("body", e)
			});
		}
		D(Ve);
		var We = P(Ve, 2), Ge = j(We), Ke = N(Ge, !0), qe = P(Ge, 2), Je = N(qe, !0);
		D(We), D(Le), D(Pe);
		var Ye = P(Pe, 2), Xe = j(Ye), Ze = N(Xe, !0), Qe = P(Xe, 2), $e = j(Qe), et = j($e), tt = N(et, !0), rt = N(P(et, 2), !0);
		D($e);
		var ot = P($e, 2), st = j(ot, !0), ct = N(P(st), !0);
		D(ot);
		var lt = P(ot, 2);
		U(lt);
		var ut = P(lt, 2), dt = j(ut, !0), ft = N(P(dt), !0);
		D(ut);
		var pt = P(ut, 2);
		U(pt), D(Qe), D(Ye), D(oe), F((e, r, a, o, s, c, l, u, d, f, p, h, g, v, y, b, x, C, w, T, E) => {
			B(ce, e), B(de, r), G(fe, "title", a), Vi(pe, I(m)), B(me, ` ${o ?? ""}`), t = Pi(be, 1, "chip", null, t, { accent: I(_) === "light" }), G(be, "title", s), B(xe, c), G(Te, "title", l), B(De, u), n = Pi(Oe, 1, "chip palauto", null, n, { accent: I(S) }), B(ke, d), B(Ie, f), B(ze, `${p ?? ""} `), B(He, `${h ?? ""} `), Ii(Ge, `font-family:${I(i).theme.tokens.font.heading ?? ""}`), B(Ke, g), Ii(qe, `font-family:${I(i).theme.tokens.font.body ?? ""}`), B(Je, v), B(Ze, y), Ii($e, `--r-sm:${I(i).theme.tokens.radius.sm ?? ""};--r-md:${I(i).theme.tokens.radius.md ?? ""}`), B(tt, b), B(rt, x), B(st, C), B(ct, I(i).theme.tokens.radius.sm), W(lt, w), B(dt, T), B(ft, I(i).theme.tokens.radius.md), W(pt, E);
		}, [
			() => K("lbl.themePresets"),
			() => K("lbl.colors"),
			() => K("tip.theme.dualMode"),
			() => K("lbl.dualMode"),
			() => K("tip.theme.defaultScheme"),
			() => K("common.standard"),
			() => K("tip.theme.accentTextAuto"),
			() => K("palette.accentText"),
			() => K("opt.auto"),
			() => K("group.typography"),
			() => K("lbl.headings"),
			() => K("lbl.bodyText"),
			() => K("preview.heading"),
			() => K("preview.bodySample"),
			() => K("group.shape"),
			() => K("preview.button"),
			() => K("preview.card"),
			() => K("lbl.smallCorners"),
			() => ie(I(i).theme.tokens.radius.sm),
			() => K("lbl.largeCorners"),
			() => ie(I(i).theme.tokens.radius.md)
		]), L("change", pe, (e) => te(e.target.checked)), L("click", be, () => ee("light")), L("click", Oe, () => C(!I(S))), L("input", lt, (e) => ae("sm", Number(e.target.value))), L("input", pt, (e) => ae("md", Number(e.target.value)));
	}
	z(e, oe), at();
}
Br([
	"click",
	"change",
	"input"
]);
//#endregion
//#region ../template/assets/engine/0.7.4/palette-search.js
function jm(e) {
	return String(e ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}
function Mm(e, t) {
	let n = jm(t).trim(), r = jm(e);
	return n ? r.startsWith(n) ? 0 : r.split(/[^a-z0-9]+/).some((e) => e.startsWith(n)) ? 1 : r.includes(n) ? 2 : -1 : 2;
}
function Nm(e, t) {
	let n = jm(e);
	return jm(t).split(/\s+/).filter(Boolean).every((e) => n.includes(e));
}
function Pm(e, t, n) {
	return e.map((e, r) => ({
		item: e,
		i: r,
		rank: Mm(n(e), t)
	})).filter((e) => e.rank >= 0).sort((e, t) => e.rank - t.rank || e.i - t.i).map((e) => e.item);
}
//#endregion
//#region ../template/assets/engine/0.7.4/calendar-designs.js
var Fm = [
	"list",
	"cards",
	"month",
	"agenda",
	"next",
	"week",
	"day",
	"year"
], Im = [
	"title",
	"date",
	"time",
	"place",
	"description",
	"category",
	"number"
], Lm = [
	"noticeLabel",
	"noticeTitle",
	"noticeText",
	"emptyKicker",
	"emptyTitle",
	"series",
	"forWhom",
	"openAll"
], Rm = {
	noticeTitle: "calendar.noticeTitleHint",
	noticeText: "calendar.noticeTextHint"
}, zm = ["emptyKicker", "emptyTitle"], Bm = [
	"noticeLabel",
	"noticeTitle",
	"noticeText",
	"readWhole",
	"moreInfo"
], Vm = /* @__PURE__ */ "all.signup.subscribe.subscribeMulti.addGoogle.swUpcoming.swWeek.swMonth.noMatch.earlier.showAll.zoneOf.zoneYours.weekN.range.moreN.dayNone.cancelled.allDay.until.timeAt.today.tomorrow.inDays.when.where.organizer.moreAbout.join.addEvent.addOne.addFile.addWhole.icalAddress.onMap.recurring".split("."), Hm = [
	"modern",
	"next",
	"ap"
];
function Um() {
	return Hm.map((e) => ({
		family: e,
		labelKey: `calendar.family.${e}`,
		designs: Wm.filter((t) => t.family === e)
	})).filter((e) => e.designs.length);
}
var X = (e, t = "colors") => ({
	key: e,
	labelKey: `calendar.slot.${e}`,
	section: t
}), Wm = [
	{
		id: "plain",
		labelKey: "calendar.design.plain",
		set: "theme",
		family: "modern",
		phone: "fits",
		view: null,
		stripe: !1,
		slots: [
			X("accent"),
			X("surface"),
			X("line"),
			X("chip")
		],
		texts: [
			"next",
			"now",
			"later",
			...Vm
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
			X("accent"),
			X("dot"),
			X("line"),
			X("chip")
		],
		texts: Vm
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
			X("accent"),
			X("head"),
			X("headText"),
			X("zebra"),
			X("line"),
			X("chip")
		],
		texts: [
			"colDate",
			"colTime",
			"colEvent",
			"colPlace",
			...Vm
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
			X("accent"),
			X("surface"),
			X("rule"),
			X("chip")
		],
		texts: ["program", ...Vm]
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
			X("accent"),
			X("number"),
			X("line"),
			X("chip")
		],
		texts: ["count", ...Vm]
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
			X("row"),
			X("text"),
			X("gold"),
			X("line"),
			X("rec")
		],
		texts: [...zm, ...Vm]
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
			X("ground"),
			X("text"),
			X("glass", "glass"),
			X("glassLine", "glass"),
			X("chip", "glass"),
			X("blobA", "blobs"),
			X("blobB", "blobs"),
			X("blobC", "blobs")
		],
		texts: Vm
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
			X("accent"),
			X("surface"),
			X("line"),
			X("posterA", "posters"),
			X("posterAText", "posters"),
			X("posterB", "posters"),
			X("posterBText", "posters"),
			X("posterC", "posters"),
			X("posterCText", "posters")
		],
		texts: ["wholeProgram", ...Vm]
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
			X("accent"),
			X("surface"),
			X("line"),
			X("stub", "stub"),
			X("stubText", "stub")
		],
		texts: [
			"wholeProgram",
			"openToAll",
			...Vm
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
			X("accent"),
			X("surface"),
			X("line"),
			X("chip"),
			X("card", "first"),
			X("cardText", "first")
		],
		texts: Vm
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
			X("accent"),
			X("surface"),
			X("line"),
			X("placeholder"),
			X("badge", "onPicture"),
			X("badgeText", "onPicture"),
			X("chip", "onPicture")
		],
		texts: Vm
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
			X("head"),
			X("card"),
			X("text"),
			X("gold"),
			X("rec")
		],
		texts: [...zm, ...Vm]
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
			X("accent"),
			X("soft"),
			X("tile"),
			X("line"),
			X("hero", "hero"),
			X("heroText", "hero")
		],
		texts: [
			"nextShort",
			"thisMonth",
			...Vm
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
			X("accent"),
			X("surface"),
			X("line"),
			X("todayBg"),
			X("pill"),
			X("pillText")
		],
		texts: Vm
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
			X("accent"),
			X("surface"),
			X("line"),
			X("todayBg"),
			X("event")
		],
		texts: ["todayBtn", ...Vm]
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
			X("accent"),
			X("surface"),
			X("line"),
			X("todayBg")
		],
		texts: ["unnamed", ...Vm]
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
			X("accent"),
			X("surface"),
			X("panel"),
			X("line"),
			X("todayBg"),
			X("selected"),
			X("chip")
		],
		texts: Vm
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
			X("card"),
			X("text"),
			X("gold"),
			X("goldDark"),
			X("grid"),
			X("pill")
		],
		texts: [...zm, ...Vm]
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
			X("accent"),
			X("surface"),
			X("line"),
			X("past"),
			X("event")
		],
		texts: [
			"todayBtn",
			"todayCount",
			"count",
			...Vm
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
			X("accent"),
			X("surface"),
			X("line"),
			X("ring", "wheel"),
			X("past", "wheel"),
			X("dot", "wheel"),
			X("dotOff", "wheel")
		],
		texts: [
			"wheel",
			"pickMonth",
			"count",
			"monthNone",
			...Vm
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
			X("surface"),
			X("panel"),
			X("line"),
			X("cell0", "scale"),
			X("cell1", "scale"),
			X("cell2", "scale"),
			X("cell3", "scale"),
			X("today", "scale")
		],
		texts: [
			"wholeYear",
			"fewer",
			"more",
			"pickDay",
			"count",
			...Vm
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
			X("bg"),
			X("text"),
			X("label"),
			X("pulse"),
			X("tile", "countdown"),
			X("tileText", "countdown"),
			X("button", "buttons"),
			X("buttonText", "buttons")
		],
		texts: [
			"now",
			"then",
			"unitDays",
			"unitHours",
			"unitMin",
			"wholeProgram",
			...Vm
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
			X("accent"),
			X("surface"),
			X("line"),
			X("card", "cards"),
			X("cardText", "cards"),
			X("cardMid", "cards"),
			X("cardBack", "cards"),
			X("badge", "cards"),
			X("badgeText", "cards")
		],
		texts: [
			"now",
			"browse",
			"nextN",
			...Vm
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
			X("board"),
			X("boardText"),
			X("note", "notes"),
			X("noteText", "notes"),
			X("noteLabel", "notes"),
			X("noteAlt", "notes"),
			X("noteAltText", "notes"),
			X("pin", "notes"),
			X("pinAlt", "notes"),
			X("button", "buttons"),
			X("buttonText", "buttons"),
			X("strip", "later"),
			X("stripText", "later")
		],
		texts: [
			"now",
			"next",
			"later",
			...Bm,
			...Vm
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
			X("accent"),
			X("surface"),
			X("line"),
			X("chip"),
			X("panel", "panel"),
			X("panelText", "panel"),
			X("button", "buttons"),
			X("buttonText", "buttons"),
			X("laterBg", "later")
		],
		texts: [
			"now",
			"later",
			...Vm
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
			X("band", "band"),
			X("bandText", "band"),
			X("dot", "band"),
			X("tag", "band"),
			X("tagText", "band")
		],
		texts: ["now", ...Vm]
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
			X("accent"),
			X("surface"),
			X("line"),
			X("ring"),
			X("button", "buttons"),
			X("buttonText", "buttons")
		],
		texts: [
			"now",
			"later",
			...Vm
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
			X("surface"),
			X("line"),
			X("chip"),
			X("accent", "ring"),
			X("track", "ring")
		],
		texts: [
			"now",
			"unitDays",
			"unitHours",
			...Vm
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
			X("ground"),
			X("text"),
			X("label"),
			X("edge", "glass"),
			X("glass", "glass"),
			X("track", "glass"),
			X("blobA", "blobs"),
			X("blobB", "blobs"),
			X("button", "buttons"),
			X("buttonText", "buttons")
		],
		texts: [
			"now",
			"then",
			"untilStart",
			"countdownClock",
			...Vm
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
			X("accent"),
			X("accentText"),
			X("soft"),
			X("tile"),
			X("line")
		],
		texts: [
			"now",
			"wholeProgram",
			"count",
			...Vm
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
			X("head"),
			X("card"),
			X("text"),
			X("panel"),
			X("panelText"),
			X("gold"),
			X("goldDark"),
			X("alert", "alert"),
			X("alertText", "alert")
		],
		texts: [
			"now",
			"next",
			"later",
			...Bm,
			...zm,
			...Vm
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
			X("ground"),
			X("text"),
			X("tile"),
			X("line"),
			X("gold"),
			X("goldDark"),
			X("card", "first"),
			X("cardText", "first")
		],
		texts: [
			"now",
			"later",
			"moreInfo",
			"nextN",
			...zm,
			...Vm
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
			X("card"),
			X("row"),
			X("text"),
			X("title"),
			X("gold"),
			X("goldDark"),
			X("line")
		],
		texts: [
			"series",
			"forWhom",
			"openAll",
			"allDates",
			...Bm,
			...zm,
			...Vm
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
			X("ground"),
			X("text"),
			X("card"),
			X("edge"),
			X("accent"),
			X("chip")
		],
		texts: ["todayBtn", ...Vm]
	}
], Gm = (e, t, n, r) => ({
	key: e,
	kind: "choice",
	values: t,
	def: n,
	labelKey: `calendar.opt.${e}`,
	...r ? { when: r } : {}
}), Km = (e, t) => ({
	key: e,
	kind: "switch",
	def: t,
	labelKey: `calendar.opt.${e}`
}), qm = (e) => ({
	key: e,
	kind: "hour",
	def: null,
	labelKey: `calendar.opt.${e}`
}), Jm = {
	sidepanel: [Gm("panelSide", [
		"right",
		"left",
		"under"
	], "right")],
	weekPlan: [
		qm("hourFrom"),
		qm("hourTo"),
		Km("weekend", !1)
	],
	dayPlan: [
		qm("hourFrom"),
		qm("hourTo"),
		Km("weekend", !1)
	],
	table: [
		Km("colTime", !0),
		Km("colPlace", !0),
		Km("zebra", !0)
	],
	posters: [Gm("columns", [
		"auto",
		"2",
		"3",
		"4"
	], "auto")],
	photo: [Gm("columns", [
		"auto",
		"2",
		"3",
		"4"
	], "auto")],
	yearWheel: [Gm("firstMonth", [
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
	numbered: [Km("pad", !0)],
	band: [Km("roll", !0), Gm("pause", ["button", "touch"], "button", { roll: !0 })]
}, Ym = [
	"weekStrip",
	"weekPlan",
	"layers"
], Xm = [
	"month",
	"sidepanel",
	"apMonth"
];
function Zm(e) {
	let t = rh(e?.design), n = e?.switcherViews ?? {};
	return {
		week: Ym.includes(n.week) ? n.week : "weekStrip",
		month: Xm.includes(n.month) ? n.month : t.set === "apCream" || t.set === "apNavy" ? "apMonth" : "month"
	};
}
function Qm(e) {
	return e?.description === "card" || e?.description === "rows" ? e.description : e?.options?.description === !1 ? "card" : "rows";
}
function $m(e) {
	let t = rh(e?.design);
	return t.excerpt === !0 || t.id === "plain" && ih(e) === "cards";
}
function eh(e) {
	return Jm[rh(e).id] ?? [];
}
function th(e) {
	let t = e?.options ?? {}, n = {};
	for (let r of eh(e?.design)) {
		let e = t[r.key];
		r.kind === "choice" ? n[r.key] = r.values.includes(e) ? e : r.def : r.kind === "switch" ? n[r.key] = typeof e == "boolean" ? e : r.def : n[r.key] = Number.isInteger(e) && e >= 0 && e <= 24 ? e : null;
	}
	return n;
}
function nh(e, t) {
	return !e.when || Object.entries(e.when).every(([e, n]) => t?.[e] === n);
}
function rh(e) {
	return Wm.find((t) => t.id === e) ?? Wm[0];
}
function ih(e) {
	return rh(e?.design).view || (Fm.includes(e?.view) ? e.view : "list");
}
var ah = [
	"list",
	"cards",
	"agenda",
	"next"
];
function oh() {
	let e = [{
		view: null,
		designs: Wm.filter((e) => e.view === null)
	}];
	for (let t of Fm) {
		let n = Wm.filter((e) => e.view === t);
		n.length && e.push({
			view: t,
			designs: n
		});
	}
	return e;
}
var sh = /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, ch = /^[a-z][a-z0-9-]*$/;
function lh(e) {
	return typeof e == "string" ? sh.test(e) ? e : ch.test(e) ? `var(--urd-color-${e})` : null : null;
}
function uh(e, t) {
	let n = typeof t?.show == "boolean" ? t.show : e.stripe;
	return {
		show: n,
		color: n ? lh(t?.color) : null
	};
}
var dh = {
	min: 8,
	max: 120
}, fh = /^(?:\s|&nbsp;|&#160;|<[^<>]*>)*$/i;
function ph(e) {
	return typeof e != "string" || fh.test(e);
}
function mh(e, t) {
	return Object.keys(t ?? {}).some((n) => {
		let r = n.split(".")[0];
		return !e.texts.includes(r) || Rm[r] ? !1 : t[n] === !1 ? Lm.includes(r) : !ph(t[n]);
	});
}
function hh(e) {
	let t = {};
	for (let n of Object.keys(Rm)) ph(e?.[n]) || (t[n] = e[n]);
	return Object.keys(t).length ? t : void 0;
}
//#endregion
//#region src/panels/BlocksPanel.svelte
var gh = /* @__PURE__ */ R("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label>"), _h = /* @__PURE__ */ R("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\" multiple=\"\"/></label>"), vh = /* @__PURE__ */ R("<button class=\"ghost\"> </button>"), yh = /* @__PURE__ */ R("<p class=\"panel-hint\"> </p>"), bh = /* @__PURE__ */ R("<details class=\"group\"><summary> </summary> <div class=\"group-items\"></div></details>"), xh = /* @__PURE__ */ R("<details class=\"group\"><summary> </summary> <div class=\"group-items\"><button class=\"ghost\"> </button> <button class=\"ghost\"> </button></div></details> <button class=\"ghost\"> </button> <label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><button class=\"ghost\"> </button> <label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\" multiple=\"\"/></label></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button></div> <div class=\"group-items\"><button class=\"ghost\"> </button></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button></div></details> <!> <!>", 1), Sh = /* @__PURE__ */ R("<div><input type=\"text\"/> <!></div>");
function Ch(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.bridge), i = /* @__PURE__ */ O(() => n.iframeEl), a = /* @__PURE__ */ O(() => n.pluginBlocks), o = /* @__PURE__ */ O(() => n.templateIds), s = /* @__PURE__ */ O(() => n.templateStores), c = /* @__PURE__ */ O(() => n.viewMode), { addCalendarDesign: l, buildBlock: u, compressMany: d, compressOrTrim: f, imageErrorText: p, reportUpload: m, requestPlacement: h, setStatus: g } = n;
	function _(e) {
		h(u(e));
	}
	function v(e, t = {}) {
		let n = Xe(e);
		h({
			id: es("blk"),
			type: n.type,
			version: n.version ?? 1,
			decor: !1,
			props: {
				...n.defaults ?? {},
				...Xe(t)
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
	let y = /* @__PURE__ */ k("");
	function b() {
		let e = [
			{
				label: K("blocks.text"),
				act: "block",
				kind: "text"
			},
			{
				label: K("ui.textBox"),
				act: "block",
				kind: "text-box"
			},
			{
				label: K("blocks.button"),
				act: "block",
				kind: "button"
			},
			{
				label: K("blocks.image"),
				act: "image"
			},
			{
				label: K("blocks.video"),
				act: "block",
				kind: "video"
			},
			{
				label: K("blocks.icon"),
				act: "block",
				kind: "icon"
			},
			{
				label: K("blocks.map"),
				act: "block",
				kind: "map"
			},
			{
				label: K("blocks.form"),
				act: "block",
				kind: "form"
			},
			{
				label: `${K("blocks.calendar")}: ${K("calendar.viewList")}`,
				act: "block",
				kind: "calendar"
			},
			{
				label: `${K("blocks.calendar")}: ${K("calendar.viewCards")}`,
				act: "block",
				kind: "calendar-cards"
			},
			{
				label: `${K("blocks.calendar")}: ${K("calendar.viewMonth")}`,
				act: "block",
				kind: "calendar-month"
			},
			{
				label: `${K("blocks.calendar")}: ${K("calendar.viewNext")}`,
				act: "block",
				kind: "calendar-next"
			},
			{
				label: `${K("blocks.calendar")}: ${K("calendar.viewAgenda")}`,
				act: "block",
				kind: "calendar-agenda"
			},
			...oh().flatMap((e) => e.designs).filter((e) => e.id !== "plain").map((e) => ({
				label: `${K("blocks.calendar")}: ${K(e.labelKey)}`,
				act: "calendarDesign",
				design: e.id
			})),
			{
				label: K("blocks.collection"),
				act: "block",
				kind: "collection"
			},
			{
				label: K("blocks.faq"),
				act: "block",
				kind: "faq"
			},
			{
				label: K("blocks.timeline"),
				act: "block",
				kind: "timeline"
			},
			{
				label: K("blocks.quote"),
				act: "block",
				kind: "quote"
			},
			{
				label: K("blocks.stats"),
				act: "block",
				kind: "stats"
			},
			{
				label: K("blocks.ribbon"),
				act: "block",
				kind: "ribbon"
			},
			{
				label: K("blocks.table"),
				act: "block",
				kind: "table"
			},
			{
				label: K("blocks.share"),
				act: "block",
				kind: "share"
			},
			{
				label: K("blocks.countdown"),
				act: "block",
				kind: "countdown"
			},
			{
				label: K("blocks.audio"),
				act: "block",
				kind: "audio"
			},
			{
				label: K("blocks.product"),
				act: "block",
				kind: "product"
			},
			{
				label: K("blocks.cart"),
				act: "block",
				kind: "cart"
			},
			{
				label: K("blocks.checkout"),
				act: "block",
				kind: "checkout"
			},
			{
				label: K("ui.emptyGallery"),
				act: "block",
				kind: "gallery"
			},
			{
				label: K("ui.galleryWithImages"),
				act: "galleryImages"
			},
			{
				label: K("shape.line"),
				act: "block",
				kind: "shape-line"
			},
			{
				label: K("shape.arrow"),
				act: "block",
				kind: "shape-arrow"
			},
			{
				label: K("shape.circle"),
				act: "block",
				kind: "shape-circle"
			},
			{
				label: K("shape.rect"),
				act: "block",
				kind: "shape-rect"
			},
			{
				label: K("shape.triangle"),
				act: "block",
				kind: "shape-triangle"
			}
		];
		for (let t of I(o)) {
			let n = I(s)[t]?.data?.mal;
			n?.kind === "blocks" && e.push({
				label: n.name,
				act: "template",
				id: t
			});
		}
		for (let t of I(a)) if (t.variants?.length) for (let n of t.variants) e.push({
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
		e.act === "block" ? _(e.kind) : e.act === "calendarDesign" ? l(e.design) : e.act === "plugin" ? v(e.entry, e.props ?? {}) : e.act === "template" && I(r)?.sendInsertTemplate(e.id);
	}
	async function S(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		g(K("status.compressingImage"));
		let n;
		try {
			n = await f(t);
		} catch (e) {
			g(p(e), "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (I(i)?.clientWidth ?? 1280));
		h({
			id: es("blk"),
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: Fp(t.name).replaceAll("-", " "),
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
		}), n.bytes > 4e5 ? g(K("status.imageLarge", { kb: Math.round(n.bytes / 1024) }), "error") : g("");
	}
	async function C(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		g(K("status.compressingImages"));
		let { images: n, failed: r, big: i } = await d(t);
		if (!n.length) {
			m(0, r, i);
			return;
		}
		let a = u("gallery");
		a.props.images = n, h(a), m(n.length, r, i);
	}
	var w = Sh();
	let T;
	var E = j(w);
	U(E);
	var ee = P(E, 2), te = (e) => {
		var t = Yr();
		ui(M(t), 17, () => Pm(b(), I(y), (e) => e.label), (e) => e.label, (e, t) => {
			var n = Yr(), r = M(n), i = (e) => {
				var n = gh(), r = j(n), i = P(r);
				D(n), F((e) => {
					G(n, "title", e), B(r, `${I(t).label ?? ""} `);
				}, [() => K("tip.webpAuto")]), L("change", i, S), z(e, n);
			}, a = (e) => {
				var n = _h(), r = j(n), i = P(r);
				D(n), F((e) => {
					G(n, "title", e), B(r, `${I(t).label ?? ""} `);
				}, [() => K("tip.blocks.galleryImages")]), L("change", i, C), z(e, n);
			}, o = (e) => {
				var n = vh(), r = N(n, !0);
				F(() => B(r, I(t).label)), L("click", n, () => x(I(t))), z(e, n);
			};
			V(r, (e) => {
				I(t).act === "image" ? e(i) : I(t).act === "galleryImages" ? e(a, 1) : e(o, -1);
			}), z(e, n);
		}, (e) => {
			var t = yh(), n = N(t, !0);
			F((e) => B(n, e), [() => K("canvas.searchEmpty")]), z(e, t);
		}), z(e, t);
	}, ne = /* @__PURE__ */ O(() => I(y).trim()), re = (e) => {
		var t = xh(), i = M(t), c = j(i), l = N(c, !0), u = P(c, 2), d = j(u), f = N(d, !0), p = P(d, 2), m = N(p, !0);
		D(u), D(i);
		var h = P(i, 2), g = N(h, !0), y = P(h, 2), b = j(y), x = P(b);
		D(y);
		var w = P(y, 2), T = N(w, !0), E = P(w, 2), ee = N(E, !0), te = P(E, 2), ne = N(te, !0), re = P(te, 2), ie = N(re, !0), ae = P(re, 2), oe = N(ae, !0), se = P(ae, 2), ce = N(se, !0), le = P(se, 2), ue = N(le, !0), de = P(le, 2), fe = N(de, !0), pe = P(de, 2), me = N(pe, !0), he = P(pe, 2), ge = N(he, !0), _e = P(he, 2), ve = N(_e, !0), ye = P(_e, 2), be = N(ye, !0), xe = P(ye, 2), Se = N(xe, !0), Ce = P(xe, 2), we = N(Ce, !0), Te = P(Ce, 2), Ee = N(Te, !0), De = P(Te, 2), Oe = N(De, !0), ke = P(De, 2), Ae = N(ke, !0), je = P(ke, 2), Me = j(je), Ne = N(Me, !0), Pe = P(Me, 2), Fe = j(Pe), Ie = N(Fe, !0), Le = P(Fe, 2), Re = j(Le), ze = P(Re);
		D(Le), D(Pe), D(je);
		var Be = P(je, 2), Ve = j(Be), He = N(Ve, !0), Ue = P(Ve, 2), We = j(Ue), Ge = N(We, !0), Ke = P(We, 2), qe = N(Ke, !0), Je = P(Ke, 2), Ye = N(Je, !0), Xe = P(Je, 2), Ze = N(Xe, !0), Qe = P(Xe, 2), $e = N(Qe, !0);
		D(Ue);
		var et = P(Ue, 2), tt = j(et), nt = N(tt, !0);
		D(et), D(Be);
		var rt = P(Be, 2), it = j(rt), at = N(it, !0), ot = P(it, 2), st = j(ot), ct = N(st, !0), lt = P(st, 2), ut = N(lt, !0), dt = P(lt, 2), ft = N(dt, !0), pt = P(dt, 2), mt = N(pt, !0), ht = P(pt, 2), gt = N(ht, !0);
		D(ot), D(rt);
		var _t = P(rt, 2), vt = (e) => {
			let t = /* @__PURE__ */ O(() => I(o).filter((e) => I(s)[e]?.data?.mal?.kind === "blocks"));
			var n = bh(), i = j(n), a = N(i, !0), c = P(i, 2);
			ui(c, 20, () => I(t), (e) => e, (e, t) => {
				var n = vh(), i = N(n, !0);
				F((e) => {
					G(n, "title", e), B(i, I(s)[t].data.mal.name);
				}, [() => K("canvas.insertGroup")]), L("click", n, () => I(r)?.sendInsertTemplate(t)), z(e, n);
			}), D(c), D(n), F((e) => B(a, e), [() => K("canvas.tabMyTemplates")]), z(e, n);
		}, yt = /* @__PURE__ */ O(() => I(o).some((e) => I(s)[e]?.data?.mal?.kind === "blocks"));
		V(_t, (e) => {
			I(yt) && e(vt);
		});
		var bt = P(_t, 2), xt = (e) => {
			var t = bh(), n = j(t), r = N(n, !0), i = P(n, 2);
			ui(i, 21, () => I(a), (e) => e.type, (e, t) => {
				var n = Yr(), r = M(n), i = (e) => {
					var n = bh(), r = j(n), i = N(r, !0), a = P(r, 2);
					ui(a, 21, () => I(t).variants, (e) => e.label, (e, n) => {
						var r = vh(), i = N(r, !0);
						F((e) => {
							G(r, "title", e), B(i, I(n).label);
						}, [() => K("tip.blocks.fromPlugin", { plugin: I(t).plugin })]), L("click", r, () => v(I(t), I(n).props)), z(e, r);
					}), D(a), D(n), F(() => B(i, I(t).label)), z(e, n);
				}, a = (e) => {
					var n = vh(), r = N(n, !0);
					F((e) => {
						G(n, "title", e), B(r, I(t).label);
					}, [() => K("tip.blocks.fromPlugin", { plugin: I(t).plugin })]), L("click", n, () => v(I(t))), z(e, n);
				};
				V(r, (e) => {
					I(t).variants?.length ? e(i) : e(a, -1);
				}), z(e, n);
			}), D(i), D(t), F((e) => B(r, e), [() => K("panel.plugins")]), z(e, t);
		};
		V(bt, (e) => {
			I(a).length && e(xt);
		}), F((e, t, n, r, i, a, o, s, c, u, d, h, _, v, x, S, C, D, je, Me, Pe, ze, Be, Ve, Ue, et, rt, it, ot, st, lt, dt, pt, ht, _t, vt, yt, bt, xt, St, Ct, wt, Tt, Et, Dt, Ot, O, kt, At, jt, Mt, Nt, Pt, Ft, It, Lt, Rt, zt, Bt, Vt, Ht, Ut, Wt, Gt, Kt) => {
			B(l, e), B(f, t), G(p, "title", n), B(m, r), B(g, i), G(y, "title", a), B(b, `${o ?? ""} `), G(w, "title", s), B(T, c), G(E, "title", u), B(ee, d), G(te, "title", h), B(ne, _), G(re, "title", v), B(ie, x), G(ae, "title", S), B(oe, C), G(se, "title", D), B(ce, je), G(le, "title", Me), B(ue, Pe), G(de, "title", ze), B(fe, Be), G(pe, "title", Ve), B(me, Ue), G(he, "title", et), B(ge, rt), G(_e, "title", it), B(ve, ot), G(ye, "title", st), B(be, lt), G(xe, "title", dt), B(Se, pt), G(Ce, "title", ht), B(we, _t), G(Te, "title", vt), B(Ee, yt), G(De, "title", bt), B(Oe, xt), G(ke, "title", St), B(Ae, Ct), B(Ne, wt), G(Fe, "title", Tt), B(Ie, Et), G(Le, "title", Dt), B(Re, `${Ot ?? ""} `), B(He, O), G(We, "title", kt), B(Ge, At), G(Ke, "title", jt), B(qe, Mt), G(Je, "title", Nt), B(Ye, Pt), G(Xe, "title", Ft), B(Ze, It), G(Qe, "title", Lt), B($e, Rt), G(tt, "title", zt), B(nt, Bt), B(at, Vt), B(ct, Ht), B(ut, Ut), B(ft, Wt), B(mt, Gt), B(gt, Kt);
		}, [
			() => K("blocks.text"),
			() => K("blocks.text"),
			() => K("tip.blocks.textBox"),
			() => K("ui.textBox"),
			() => K("blocks.button"),
			() => K("tip.webpAuto"),
			() => K("blocks.image"),
			() => K("tip.blocks.video"),
			() => K("blocks.video"),
			() => K("tip.blocks.icon"),
			() => K("blocks.icon"),
			() => K("tip.blocks.map"),
			() => K("blocks.map"),
			() => K("tip.blocks.form"),
			() => K("blocks.form"),
			() => K("tip.blocks.collection"),
			() => K("blocks.collection"),
			() => K("tip.blocks.faq"),
			() => K("blocks.faq"),
			() => K("tip.blocks.timeline"),
			() => K("blocks.timeline"),
			() => K("tip.blocks.quote"),
			() => K("blocks.quote"),
			() => K("tip.blocks.stats"),
			() => K("blocks.stats"),
			() => K("tip.blocks.ribbon"),
			() => K("blocks.ribbon"),
			() => K("tip.blocks.table"),
			() => K("blocks.table"),
			() => K("tip.blocks.share"),
			() => K("blocks.share"),
			() => K("tip.blocks.countdown"),
			() => K("blocks.countdown"),
			() => K("tip.blocks.audio"),
			() => K("blocks.audio"),
			() => K("tip.blocks.product"),
			() => K("blocks.product"),
			() => K("tip.blocks.cart"),
			() => K("blocks.cart"),
			() => K("tip.blocks.checkout"),
			() => K("blocks.checkout"),
			() => K("blocks.gallery"),
			() => K("tip.blocks.gallery"),
			() => K("ui.emptyGallery"),
			() => K("tip.blocks.galleryImages"),
			() => K("ui.galleryWithImages"),
			() => K("blocks.calendar"),
			() => K("tip.blocks.calendar"),
			() => K("calendar.viewList"),
			() => K("tip.blocks.calendar"),
			() => K("calendar.viewCards"),
			() => K("tip.blocks.calendar"),
			() => K("calendar.viewMonth"),
			() => K("tip.blocks.calendar"),
			() => K("calendar.viewNext"),
			() => K("tip.blocks.calendar"),
			() => K("calendar.viewAgenda"),
			() => K("tip.calendar.picker.open"),
			() => K("calendar.picker.open"),
			() => K("group.shapes"),
			() => K("shape.line"),
			() => K("shape.arrow"),
			() => K("shape.circle"),
			() => K("shape.rect"),
			() => K("shape.triangle")
		]), L("click", d, () => _("text")), L("click", p, () => _("text-box")), L("click", h, () => _("button")), L("change", x, S), L("click", w, () => _("video")), L("click", E, () => _("icon")), L("click", te, () => _("map")), L("click", re, () => _("form")), L("click", ae, () => _("collection")), L("click", se, () => _("faq")), L("click", le, () => _("timeline")), L("click", de, () => _("quote")), L("click", pe, () => _("stats")), L("click", he, () => _("ribbon")), L("click", _e, () => _("table")), L("click", ye, () => _("share")), L("click", xe, () => _("countdown")), L("click", Ce, () => _("audio")), L("click", Te, () => _("product")), L("click", De, () => _("cart")), L("click", ke, () => _("checkout")), L("click", Fe, () => _("gallery")), L("change", ze, C), L("click", We, () => _("calendar")), L("click", Ke, () => _("calendar-cards")), L("click", Je, () => _("calendar-month")), L("click", Xe, () => _("calendar-next")), L("click", Qe, () => _("calendar-agenda")), L("click", tt, () => n.designPicker = { mode: "add" }), L("click", st, () => _("shape-line")), L("click", lt, () => _("shape-arrow")), L("click", dt, () => _("shape-circle")), L("click", pt, () => _("shape-rect")), L("click", ht, () => _("shape-triangle")), z(e, t);
	};
	V(ee, (e) => {
		I(ne) ? e(te) : e(re, -1);
	}), D(w), F((e, t, n) => {
		T = Pi(w, 1, "panel-body", null, T, { locked: I(c) === "mobile" }), G(w, "title", e), G(E, "placeholder", t), G(E, "title", n);
	}, [
		() => I(c) === "mobile" ? K("tip.blocks.mobileLocked") : void 0,
		() => K("canvas.searchBlocks"),
		() => K("canvas.searchBlocks")
	]), Gi(E, () => I(y), (e) => A(y, e)), z(e, w), at();
}
Br(["change", "click"]);
//#endregion
//#region src/panels/GridPanel.svelte
var wh = /* @__PURE__ */ R("<div class=\"panel-body\"><label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\"/> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label></div>");
function Th(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.grid), { setGrid: i } = n;
	var a = wh(), o = j(a), s = j(o), c = N(P(s));
	D(o);
	var l = P(o, 2);
	U(l);
	var u = P(l, 2), d = j(u);
	U(d);
	var f = P(d);
	D(u), D(a), F((e, t) => {
		B(s, `${e ?? ""} `), B(c, `${I(r).size ?? ""} px`), W(l, I(r).size), Vi(d, I(r).snap !== !1), B(f, ` ${t ?? ""}`);
	}, [() => K("lbl.gridSize"), () => K("lbl.gridSnap")]), L("input", l, (e) => i("size", Number(e.target.value))), L("change", d, (e) => i("snap", e.target.checked)), z(e, a), at();
}
Br(["input", "change"]);
//#endregion
//#region node_modules/svelte/src/reactivity/set.js
var Eh = [
	"forEach",
	"isDisjointFrom",
	"isSubsetOf",
	"isSupersetOf"
], Dh = [
	"difference",
	"intersection",
	"symmetricDifference",
	"union"
], Oh = !1, kh = class e extends Set {
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ k(0);
	#n = /* @__PURE__ */ k(0);
	#r = gr || -1;
	constructor(e) {
		if (super(), e) {
			for (var t of e) super.add(t);
			this.#n.v = super.size;
		}
		Oh || this.#a();
	}
	#i(e) {
		return gr === this.#r ? /* @__PURE__ */ k(e) : rn(e);
	}
	#a() {
		Oh = !0;
		var t = e.prototype, n = Set.prototype;
		for (let e of Eh) t[e] = function(...t) {
			return I(this.#t), n[e].apply(this, t);
		};
		for (let r of Dh) t[r] = function(...t) {
			I(this.#t);
			var i = n[r].apply(this, t);
			return new e(i);
		};
	}
	has(e) {
		var t = super.has(e), n = this.#e, r = n.get(e);
		if (r === void 0) {
			if (!t) return I(this.#t), !1;
			r = this.#i(!0), n.set(e, r);
		}
		return I(r), t;
	}
	add(e) {
		return super.has(e) || (super.add(e), A(this.#n, super.size), dn(this.#t)), this;
	}
	delete(e) {
		var t = super.delete(e), n = this.#e, r = n.get(e);
		return r !== void 0 && (n.delete(e), A(r, !1)), t && (A(this.#n, super.size), dn(this.#t)), t;
	}
	clear() {
		if (super.size !== 0) {
			super.clear();
			var e = this.#e;
			for (var t of e.values()) A(t, !1);
			e.clear(), A(this.#n, 0), dn(this.#t);
		}
	}
	keys() {
		return this.values();
	}
	values() {
		return I(this.#t), super.values();
	}
	entries() {
		return I(this.#t), super.entries();
	}
	[Symbol.iterator]() {
		return this.keys();
	}
	get size() {
		return I(this.#n);
	}
}, Ah = "urd-quick-row", jh = ["fit", "phone"], Mh = {
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
function Nh(e) {
	return [...Mh[e] ?? [], ...jh];
}
var Ph = Object.freeze({
	pinned: [],
	removed: []
});
function Fh(e) {
	let t = (e) => Array.isArray(e) ? [...new Set(e.filter((e) => typeof e == "string" && e))] : [];
	return {
		pinned: t(e?.pinned),
		removed: t(e?.removed)
	};
}
function Ih(e, t, n) {
	let r = Nh(e).filter((e) => !t.removed.includes(e));
	for (let e of t.pinned) r.includes(e) || r.push(e);
	return r.filter((e) => n.has(e));
}
function Lh(e, t, n) {
	return Nh(e).includes(n) ? !t.removed.includes(n) : t.pinned.includes(n);
}
function Rh(e, t, n) {
	let r = Nh(e).includes(n);
	return Lh(e, t, n) ? r ? {
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
function zh(e) {
	return e.pinned.length > 0 || e.removed.length > 0;
}
function Bh(e) {
	try {
		let t = JSON.parse(e.getItem("urd-quick-row") ?? "{}");
		return !t || typeof t != "object" || Array.isArray(t) ? {} : Object.fromEntries(Object.entries(t).map(([e, t]) => [e, Fh(t)]));
	} catch {
		return {};
	}
}
function Vh(e, t) {
	let n = Object.fromEntries(Object.entries(t).filter(([, e]) => zh(e)));
	try {
		e.setItem(Ah, JSON.stringify(n));
	} catch {}
}
//#endregion
//#region src/menu/state.svelte.js
var Hh = "urd-admin-menu-width", Uh = pn({
	widthPref: localStorage.getItem(Hh) === "narrow" ? "narrow" : "wide",
	wide: localStorage.getItem(Hh) !== "narrow",
	min: 8,
	room: Infinity,
	menuQuery: "",
	propsQuery: "",
	tab: "content",
	place: null
});
function Wh() {
	return Uh.wide && Uh.room >= 740;
}
function Gh(e) {
	Uh.widthPref = e === "narrow" ? "narrow" : "wide", Uh.wide = Uh.widthPref === "wide", Uh.widthPref === "narrow" ? localStorage.setItem(Hh, "narrow") : localStorage.removeItem(Hh);
}
function Kh(e) {
	Uh.min = Math.round(e) + 8, Uh.room = window.innerWidth - Uh.min - 8;
}
var qh = new kh(), Jh = /* @__PURE__ */ new Set(), Yh = pn({ choices: Bh(localStorage) });
function Xh(e) {
	return Yh.choices[e] ?? Ph;
}
function Zh(e, t) {
	Yh.choices = {
		...Yh.choices,
		[e]: t
	}, Vh(localStorage, Xe(Yh.choices));
}
function Qh(e, t) {
	Zh(e, Rh(e, Xh(e), t));
}
//#endregion
//#region src/menu/Pin.svelte
var $h = /* @__PURE__ */ R("<button type=\"button\"></button>");
function eg(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock.type), i = /* @__PURE__ */ O(() => Lh(I(r), Xh(I(r)), t.id));
	var a = $h();
	let o;
	H(a, () => I(i) ? q.pinOn : q.pin, !0), D(a), F((e, t) => {
		o = Pi(a, 1, "menu-pin", null, o, { on: I(i) }), G(a, "aria-pressed", I(i)), G(a, "title", e), G(a, "aria-label", t);
	}, [() => I(i) ? K("menu.unpin") : K("menu.pin"), () => I(i) ? K("menu.unpin") : K("menu.pin")]), L("click", a, () => Qh(I(r), t.id)), z(e, a), at();
}
Br(["click"]);
//#endregion
//#region src/menu/options.js
var tg = () => [["on", K("common.on")], ["off", K("common.off")]], ng = () => [
	["canvas", K("opt.ribbonWidth.content")],
	["page", K("opt.ribbonWidth.page")],
	["content", K("opt.ribbonWidth.own")]
], rg = (e) => e === "canvas" || e === "page" ? e : "content", ig = () => [
	["roll", K("opt.ribbonMotion.roll")],
	["sway", K("opt.ribbonMotion.sway")],
	["step", K("opt.ribbonMotion.step")],
	["none", K("opt.ribbonMotion.none")]
], ag = () => [
	["text", K("opt.ribbonStripe.text")],
	["marks", K("opt.ribbonStripe.marks")],
	["plain", K("opt.ribbonStripe.plain")]
], og = () => [["none", K("common.none")], ...ag()], sg = () => [
	["dot", K("opt.ribbonSep.dot")],
	["dash", K("opt.ribbonSep.dash")],
	["slash", K("opt.ribbonSep.slash")],
	["star", K("opt.ribbonSep.star")],
	["none", K("common.none")],
	["custom", K("opt.ribbonSep.custom")]
], cg = (e) => e.color || (e.variant === "plain" ? "text" : "accent-text"), lg = (e) => `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">${e}</svg>`, ug = {
	dot: lg("<circle cx=\"12\" cy=\"12\" r=\"3\"/>"),
	dash: lg("<rect x=\"3\" y=\"10.6\" width=\"18\" height=\"2.8\" rx=\"1.4\"/>"),
	slash: lg("<path d=\"M15.5 3.5L8.5 20.5\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\" fill=\"none\"/>"),
	star: lg("<path d=\"M12 2.8l2.3 6.1 6.5.4-5 4.1 1.6 6.3-5.4-3.5-5.4 3.5 1.6-6.3-5-4.1 6.5-.4z\"/>"),
	none: lg("<path d=\"M5 12h14\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\" opacity=\"0.35\"/><path d=\"M6 6l12 12\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>"),
	custom: lg("<path d=\"M5 8h14M5 12h9M5 16h12\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>")
}, dg = () => [
	["line", K("shape.line")],
	["arrow", K("shape.arrow")],
	["circle", K("shape.circle")],
	["rect", K("shape.rect")],
	["triangle", K("shape.triangle")]
], fg = () => [
	["accent", K("color.accent")],
	["text", K("color.text")],
	["surface", K("color.surface")],
	["bg", K("color.bg")]
], pg = [
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
//#endregion
//#region src/lib/menu-search.js
function mg(e, t, n = "", r = /* @__PURE__ */ new Set()) {
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
			if (mg(a.children, t, `${e} ${a.text}`, r), r.size > o) {
				r.add(a);
				for (let e of a.children ?? []) e.kind === "row" && !e.text.trim() && r.add(e);
			}
		} else t(`${e} ${a.text}`) && r.add(a);
		i && r.size > o && r.add(i);
	}
	return r;
}
var hg = "button, select, textarea, svg, [popover], .dd, .gridmenu-value, .menu-group-value", gg = ".row-tool, .cp-clear, [popover] *";
function _g(e) {
	let t = [], n = (e) => {
		for (let r of e.childNodes) r.nodeType === 3 ? t.push(r.data) : r.nodeType === 1 && !r.matches(hg) && n(r);
	};
	n(e);
	let r = e.getAttribute("title");
	r && t.push(r);
	for (let n of e.querySelectorAll("[title]")) n.matches(gg) || t.push(n.getAttribute("title"));
	return t.join(" ").replace(/\s+/g, " ").trim();
}
function vg(e, t = "") {
	let n = [];
	for (let r of e.children) if (!(t && r.matches(t))) {
		if (r.tagName === "DETAILS") {
			let e = r.querySelector(":scope > summary"), t = r.querySelector(":scope > .group-items") ?? r;
			n.push({
				kind: "group",
				el: r,
				text: e ? _g(e) : "",
				children: vg(t, "summary")
			});
		} else r.tagName === "HR" ? n.push({
			kind: "rule",
			el: r,
			text: ""
		}) : r.matches(".panel-strong, .mini-label") ? n.push({
			kind: "heading",
			el: r,
			text: _g(r)
		}) : n.push({
			kind: "row",
			el: r,
			text: _g(r)
		});
	}
	return n;
}
function yg(e, t) {
	for (let n of e.children) {
		let e = vg(n, ".emenu-title, .emenu-none"), r = mg(e, t), i = (e) => {
			for (let t of e) t.el.classList.toggle("menu-miss", !r.has(t)), t.kind === "group" && (r.has(t) && (t.el.open = !0), i(t.children));
		};
		i(e), n.classList.toggle("menu-empty", !e.some((e) => r.has(e)));
	}
}
function bg(e, t) {
	return (n) => {
		let r = () => yg(n, (n) => t(n, e));
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
var xg = /* @__PURE__ */ R("<i class=\"menu-group-dot\" aria-hidden=\"true\"></i>"), Sg = /* @__PURE__ */ R("<button type=\"button\" class=\"linkish menu-group-reset\"> </button>"), Cg = /* @__PURE__ */ R("<details class=\"group menu-group\"><summary><!><span class=\"menu-group-title\"> </span><span class=\"menu-group-value\"> </span></summary> <div class=\"group-items\"><!> <!></div></details>");
function wg(e, t) {
	it(t, !0);
	let n = ra(t, "reset", 3, null);
	ra(t, "defaultOpen", 3, !1)() && !Jh.has(t.id) && (Jh.add(t.id), qh.add(t.id));
	var r = Cg(), i = j(r), a = j(i), o = (e) => {
		z(e, xg());
	};
	V(a, (e) => {
		n() && e(o);
	});
	var s = P(a), c = N(s, !0), l = N(P(s), !0);
	D(i);
	var u = P(i, 2), d = j(u);
	gi(d, () => t.children);
	var f = P(d, 2), p = (e) => {
		var t = Sg(), r = N(t, !0);
		F((e) => B(r, e), [() => K("menu.reset")]), L("click", t, function(...e) {
			n()?.apply(this, e);
		}), z(e, t);
	};
	V(f, (e) => {
		n() && e(p);
	}), D(u), D(r), F((e) => {
		r.open = e, B(c, t.title), B(l, t.value);
	}, [() => qh.has(t.id)]), zr("toggle", r, (e) => {
		e.currentTarget.closest(".emenu-search") || (e.currentTarget.open ? qh.add(t.id) : qh.delete(t.id));
	}), z(e, r), at();
}
Br(["click"]);
//#endregion
//#region src/menu/Placement.svelte
var Tg = /* @__PURE__ */ R("<div class=\"frame-grid\"><label> <input type=\"number\"/></label> <label> <input type=\"number\"/></label></div>"), Eg = /* @__PURE__ */ R("<div class=\"ctl-row\"><span class=\"mini-label\"> </span> <input type=\"range\" step=\"5\"/> <span class=\"gridmenu-value\"> </span> <!></div> <!>", 1), Dg = /* @__PURE__ */ R("<div class=\"ctl-row\"><span class=\"mini-label\"> </span> <input type=\"range\" min=\"1\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div>"), Og = /* @__PURE__ */ R("<div class=\"pin-line\"><label> <!></label> <!></div> <!>", 1), kg = /* @__PURE__ */ R("<label> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\"/></label> <label> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\"/></label>", 1), Ag = /* @__PURE__ */ R("<label> <!></label> <!> <label> <!></label>", 1), jg = /* @__PURE__ */ R("<label> <input type=\"number\" min=\"0\" max=\"400\"/></label>"), Mg = /* @__PURE__ */ R("<label> <!></label>"), Ng = /* @__PURE__ */ R("<label> <!></label> <!> <!>", 1), Pg = /* @__PURE__ */ R("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!>", 1), Fg = /* @__PURE__ */ R("<div class=\"frame-grid\"><label> <input type=\"number\" step=\"0.5\"/></label> <label> <input type=\"number\" step=\"1\"/></label> <label> <input type=\"number\" step=\"0.5\" min=\"1\"/></label> <label> <input type=\"number\" step=\"1\" min=\"1\"/></label> <label> <input type=\"number\" step=\"1\"/></label> <label> <input type=\"number\" step=\"1\"/></label></div>"), Ig = /* @__PURE__ */ R("<!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), Lg = /* @__PURE__ */ R("<label> <!></label> <!>", 1), Rg = /* @__PURE__ */ R("<!> <!> <!> <div class=\"pin-line\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div> <!> <!> <!>", 1);
function zg(e, t) {
	it(t, !0);
	let n = (e) => {
		var t = Eg(), n = M(t), r = j(n), i = N(r, !0), a = P(r, 2);
		U(a);
		var o = P(a, 2), l = N(o);
		eg(P(o, 2), { id: "size" }), D(n);
		var u = P(n, 2), d = (e) => {
			var t = Tg(), n = j(t), r = j(n, !0), i = P(r);
			U(i), D(n);
			var a = P(n, 2), o = j(a, !0), s = P(o);
			U(s), D(a), D(t), F((e, t, c, l, u, d) => {
				G(n, "title", e), B(r, t), G(i, "min", oc.min), G(i, "max", oc.max), W(i, c), G(a, "title", l), B(o, u), G(s, "min", oc.min), G(s, "max", oc.max), W(s, d);
			}, [
				() => K("tip.scaleMin"),
				() => K("lbl.scaleMin"),
				() => cc(I(c)).min,
				() => K("tip.scaleMax"),
				() => K("lbl.scaleMax"),
				() => cc(I(c)).max
			]), L("change", i, (e) => g("sizeMin", e.target.value)), L("change", s, (e) => g("sizeMax", e.target.value)), z(e, t);
		}, f = /* @__PURE__ */ O(() => sc(I(c)) !== 1);
		V(u, (e) => {
			I(f) && e(d);
		}), F((e, t, r, o, s) => {
			G(n, "title", e), B(i, t), G(a, "min", ac.min * 100), G(a, "max", ac.max * 100), W(a, r), G(a, "aria-label", o), B(l, `${s ?? ""} %`);
		}, [
			() => K("tip.scale"),
			() => K("lbl.scale"),
			() => Math.round(sc(I(c)) * 100),
			() => K("lbl.scale"),
			() => Math.round(sc(I(c)) * 100)
		]), L("input", a, (e) => h(e.target.valueAsNumber / 100)), L("change", a, function(...e) {
			s.endSizeGesture?.apply(this, e);
		}), z(e, t);
	}, r = (e) => {
		var t = Og(), n = M(t), r = j(n), i = j(r), a = P(i);
		{
			let e = /* @__PURE__ */ O(() => I(c).fit ?? "wrap"), t = /* @__PURE__ */ O(() => rc.has(I(c).type) ? [["wrap", K("opt.fit.fluid")], ["shrink", K("opt.fit.floor")]] : [
				["wrap", K("opt.fit.wrap")],
				...te() || I(c).fit === "shrink" ? [["shrink", K("opt.fit.shrink")]] : [],
				["both", K("opt.fit.both")]
			]);
			J(a, {
				get value() {
					return I(e);
				},
				get options() {
					return I(t);
				},
				onchange: (e) => p(e)
			});
		}
		D(r), eg(P(r, 2), { id: "fit" }), D(n);
		var o = P(n, 2), s = (e) => {
			var t = Dg(), n = j(t), r = N(n, !0), i = P(n, 2);
			U(i);
			var a = N(P(i, 2));
			D(t), F((e, n, o, s) => {
				G(t, "title", e), B(r, n), W(i, o), B(a, `${s ?? ""} %`);
			}, [
				() => K("tip.fitMin"),
				() => K("lbl.fitMin"),
				() => Math.round((I(c).fitMin ?? .6) * 100),
				() => Math.round((I(c).fitMin ?? .6) * 100)
			]), L("input", i, (e) => m(e.target.valueAsNumber / 100)), z(e, t);
		};
		V(o, (e) => {
			I(c).fit && e(s);
		}), F((e, t) => {
			G(r, "title", e), B(i, `${t ?? ""} `);
		}, [() => K("tip.fit"), () => K("lbl.fit")]), z(e, t);
	}, i = (e) => {
		var t = Ag(), n = M(t), r = j(n), i = P(r);
		{
			let e = /* @__PURE__ */ O(() => T(I(c).animation) ? I(c).animation.type : ""), t = /* @__PURE__ */ O(E);
			J(i, {
				get value() {
					return I(e);
				},
				get options() {
					return I(t);
				},
				onchange: (e) => S(e || null)
			});
		}
		D(n);
		var a = P(n, 2), o = (e) => {
			var t = kg(), n = M(t), r = j(n), i = P(r);
			U(i), D(n);
			var a = P(n, 2), o = j(a), s = P(o);
			U(s), D(a), F((e, t) => {
				B(r, `${e ?? ""} `), W(i, I(c).animation.props.duration), B(o, `${t ?? ""} `), W(s, I(c).animation.props.delay);
			}, [() => K("lbl.durationMs"), () => K("lbl.delayMs")]), L("change", i, (e) => w("duration", Number(e.target.value))), L("change", s, (e) => w("delay", Number(e.target.value))), z(e, t);
		}, s = /* @__PURE__ */ O(() => T(I(c).animation));
		V(a, (e) => {
			I(s) && e(o);
		});
		var l = P(a, 2), u = j(l), d = P(u);
		{
			let e = /* @__PURE__ */ O(() => I(c).hover?.type ?? (I(c).animation && !T(I(c).animation) ? I(c).animation.type : "")), t = /* @__PURE__ */ O(ee);
			J(d, {
				get value() {
					return I(e);
				},
				get options() {
					return I(t);
				},
				onchange: (e) => C(e || null)
			});
		}
		D(l), F((e, t, i, a) => {
			G(n, "title", e), B(r, `${t ?? ""} `), G(l, "title", i), B(u, `${a ?? ""} `);
		}, [
			() => K("tip.props.blockAnim"),
			() => K("lbl.animIn"),
			() => K("tip.props.blockHover"),
			() => K("lbl.onHover")
		]), z(e, t);
	}, a = (e) => {
		var t = Yr(), n = M(t), r = (e) => {
			var t = Pg(), n = M(t), r = j(n);
			U(r);
			var i = P(r);
			D(n);
			var a = P(n, 2), o = (e) => {
				var t = Ng(), n = M(t), r = j(n), i = P(r);
				{
					let e = /* @__PURE__ */ O(() => I(c).sticky.mode ?? "scroll"), t = /* @__PURE__ */ O(() => [["scroll", K("opt.sticky.modeScroll")], ["screen", K("opt.sticky.modeScreen")]]);
					J(i, {
						get value() {
							return I(e);
						},
						get options() {
							return I(t);
						},
						onchange: (e) => d(`edit:${I(c).blockId}`, (t) => {
							t.sticky = {
								...t.sticky,
								mode: e
							};
						})
					});
				}
				D(n);
				var a = P(n, 2), o = (e) => {
					var t = jg(), n = j(t), r = P(n);
					U(r), D(t), F((e, i) => {
						G(t, "title", e), B(n, `${i ?? ""} `), W(r, I(c).sticky.offset ?? 16);
					}, [() => I(c).sticky.mode === "screen" ? K("tip.stickyEdge") : K("tip.stickyOffset"), () => I(c).sticky.mode === "screen" ? K("lbl.stickyEdge") : K("lbl.stickyOffset")]), L("change", r, (e) => d(`edit:${I(c).blockId}`, (t) => {
						t.sticky = {
							...t.sticky,
							offset: Math.max(0, Number(e.target.value) || 0)
						};
					})), z(e, t);
				};
				V(a, (e) => {
					(I(c).sticky.mode !== "screen" || (I(c).sticky.dock ?? "bottom-right") !== "middle-center") && e(o);
				});
				var s = P(a, 2), l = (e) => {
					var t = Mg(), n = j(t), r = P(n);
					{
						let e = /* @__PURE__ */ O(() => I(c).sticky.dock ?? "bottom-right"), t = /* @__PURE__ */ O(() => pg.map(([e, t]) => [e, K(t)]));
						J(r, {
							get value() {
								return I(e);
							},
							get options() {
								return I(t);
							},
							onchange: (e) => d(`edit:${I(c).blockId}`, (t) => {
								t.sticky = {
									...t.sticky,
									dock: e
								};
							})
						});
					}
					D(t), F((e, r) => {
						G(t, "title", e), B(n, `${r ?? ""} `);
					}, [() => K("tip.stickyDock"), () => K("lbl.stickyDock")]), z(e, t);
				}, u = (e) => {
					var t = Mg(), n = j(t), r = P(n);
					{
						let e = /* @__PURE__ */ O(() => I(c).sticky.until ?? ""), t = /* @__PURE__ */ O(re);
						J(r, {
							get value() {
								return I(e);
							},
							get options() {
								return I(t);
							},
							onchange: (e) => d(`edit:${I(c).blockId}`, (t) => {
								t.sticky = {
									...t.sticky,
									until: e || null
								};
							})
						});
					}
					D(t), F((e, r) => {
						G(t, "title", e), B(n, `${r ?? ""} `);
					}, [() => K("tip.stickyUntil"), () => K("lbl.stickyUntil")]), z(e, t);
				};
				V(s, (e) => {
					I(c).sticky.mode === "screen" ? e(l) : e(u, -1);
				}), F((e, t) => {
					G(n, "title", e), B(r, `${t ?? ""} `);
				}, [() => K("tip.stickyMode"), () => K("lbl.stickyMode")]), z(e, t);
			};
			V(a, (e) => {
				I(c).sticky && e(o);
			}), F((e, t, a) => {
				G(n, "title", e), Vi(r, t), B(i, ` ${a ?? ""}`);
			}, [
				() => K("tip.sticky"),
				() => !!I(c).sticky,
				() => K("lbl.sticky")
			]), L("change", r, (e) => d(`edit:${I(c).blockId}`, (t) => {
				t.sticky = e.target.checked ? {
					offset: 16,
					until: null
				} : null;
			})), z(e, t);
		};
		V(n, (e) => {
			I(l) === "desktop" && e(r);
		}), z(e, t);
	}, o = (e) => {
		var t = Ig(), n = M(t), r = (e) => {
			var t = Fg(), n = j(t), r = j(n, !0), i = P(r);
			U(i), D(n);
			var a = P(n, 2), o = j(a, !0), s = P(o);
			U(s), D(a);
			var l = P(a, 2), u = j(l, !0), d = P(u);
			U(d), D(l);
			var p = P(l, 2), m = j(p, !0), h = P(m);
			U(h), D(p);
			var g = P(p, 2), _ = j(g, !0), v = P(_);
			U(v), D(g);
			var y = P(g, 2), b = j(y, !0), x = P(b);
			U(x), D(y), D(t), F((e, t, n, a, l, f, p) => {
				B(r, e), W(i, I(c).frame.x), B(o, t), W(s, I(c).frame.y), B(u, n), W(d, I(c).frame.w), B(m, a), W(h, I(c).frame.h), G(g, "title", l), B(_, f), W(v, I(c).frame.z ?? 1), B(b, p), W(x, I(c).frame.rot ?? 0);
			}, [
				() => K("frame.x"),
				() => K("frame.y"),
				() => K("frame.w"),
				() => K("frame.h"),
				() => K("tip.frameZ"),
				() => K("frame.z"),
				() => K("frame.rot")
			]), L("change", i, (e) => f("x", Number(e.target.value))), L("change", s, (e) => f("y", Number(e.target.value))), L("change", d, (e) => f("w", Number(e.target.value))), L("change", h, (e) => f("h", Number(e.target.value))), L("change", v, (e) => f("z", Number(e.target.value))), L("change", x, (e) => f("rot", Number(e.target.value))), z(e, t);
		};
		V(n, (e) => {
			I(l) === "desktop" && e(r);
		});
		var i = P(n, 2), a = j(i);
		U(a);
		var o = P(a);
		D(i), F((e, t) => {
			G(i, "title", e), Vi(a, I(c).decor), B(o, ` ${t ?? ""}`);
		}, [() => K("tip.decor"), () => K("lbl.decor")]), L("change", a, (e) => x(e.target.checked)), z(e, t);
	}, s = nt("urd-editor"), c = /* @__PURE__ */ O(() => s.selectedBlock), l = /* @__PURE__ */ O(() => s.viewMode), u = /* @__PURE__ */ O(() => s.sections), { mutateBlock: d, setBlockFrame: f, setBlockFit: p, setBlockFitMin: m, setBlockSize: h, setBlockSizeBound: g, setBlockHeightMode: _, setBlockHeightAlign: v, canStretch: y, setBlockHideMobile: b, setBlockDecor: x, setBlockAnimation: S, setBlockHover: C, setBlockAnimProp: w, isEntrance: T, blockEntranceOptions: E, hoverOptions: ee, designWidth: te } = s;
	function ne() {
		let e = T(I(c).animation) ? I(c).animation.type : I(c).hover?.type, t = e ? [...E(), ...ee()].find(([t]) => t === e) : null;
		return t ? t[1] : K("common.none");
	}
	function re() {
		let e = I(u).findIndex((e) => e.id === I(c)?.sectionId);
		return e < 0 ? [["", K("opt.sticky.ownSection")]] : [["", K("opt.sticky.ownSection")], ...I(u).slice(e + 1).map((t, n) => [t.id, K("opt.sticky.atSection", { n: e + 2 + n })])];
	}
	var ie = Rg(), ae = M(ie), oe = (e) => {
		var t = Lg(), n = M(t), r = j(n), i = P(r);
		{
			let e = /* @__PURE__ */ O(() => I(c).height?.mode === "own" ? "own" : "content"), t = /* @__PURE__ */ O(() => [["content", K("opt.height.content")], ["own", K("opt.height.own")]]);
			J(i, {
				get value() {
					return I(e);
				},
				get options() {
					return I(t);
				},
				onchange: (e) => _(e)
			});
		}
		D(n);
		var a = P(n, 2), o = (e) => {
			let t = /* @__PURE__ */ O(() => [
				"middle",
				"bottom",
				"stretch"
			].includes(I(c).height.align) ? I(c).height.align : "top");
			var n = Mg(), r = j(n), i = P(r);
			{
				let e = /* @__PURE__ */ O(() => [
					["top", K("opt.heightAlign.top")],
					["middle", K("opt.heightAlign.middle")],
					["bottom", K("opt.heightAlign.bottom")],
					...y() || I(t) === "stretch" ? [["stretch", K("opt.heightAlign.stretch")]] : []
				]);
				J(i, {
					get value() {
						return I(t);
					},
					get options() {
						return I(e);
					},
					onchange: (e) => v(e)
				});
			}
			D(n), F((e, t) => {
				G(n, "title", e), B(r, `${t ?? ""} `);
			}, [() => K("tip.heightAlign"), () => K("lbl.heightAlign")]), z(e, n);
		};
		V(a, (e) => {
			I(c).height?.mode === "own" && e(o);
		}), F((e, t) => {
			G(n, "title", e), B(r, `${t ?? ""} `);
		}, [() => K("tip.height"), () => K("lbl.height")]), z(e, t);
	}, se = /* @__PURE__ */ O(() => $s.has(I(c).type));
	V(ae, (e) => {
		I(se) && e(oe);
	});
	var ce = P(ae, 2), le = (e) => {
		n(e);
	}, ue = /* @__PURE__ */ O(() => !ic.has(I(c).type));
	V(ce, (e) => {
		I(ue) && e(le);
	});
	var de = P(ce, 2);
	r(de);
	var fe = P(de, 2), pe = j(fe), me = j(pe);
	U(me);
	var he = P(me);
	D(pe), eg(P(pe, 2), { id: "phone" }), D(fe);
	var ge = P(fe, 2);
	a(ge);
	var _e = P(ge, 2);
	{
		let e = /* @__PURE__ */ O(() => K("group.motion")), t = /* @__PURE__ */ O(ne);
		wg(_e, {
			id: "motion",
			get title() {
				return I(e);
			},
			get value() {
				return I(t);
			},
			children: (e, t) => {
				i(e);
			},
			$$slots: { default: !0 }
		});
	}
	var ve = P(_e, 2);
	{
		let e = /* @__PURE__ */ O(() => K("group.placement")), t = /* @__PURE__ */ O(() => I(l) === "desktop" ? `${I(c).frame.w} % × ${I(c).frame.h}` : "");
		wg(ve, {
			id: "frame",
			get title() {
				return I(e);
			},
			get value() {
				return I(t);
			},
			children: (e, t) => {
				o(e);
			},
			$$slots: { default: !0 }
		});
	}
	F((e, t) => {
		G(pe, "title", e), Vi(me, I(c).hideMobile), B(he, ` ${t ?? ""}`);
	}, [() => K("tip.hideMobile"), () => K("lbl.hideMobile")]), L("change", me, (e) => b(e.target.checked)), z(e, ie), at();
}
Br(["input", "change"]);
//#endregion
//#region src/menu/BoxStyle.svelte
var Bg = /* @__PURE__ */ R("<label> <!></label>"), Vg = /* @__PURE__ */ R("<label> <!></label> <label> <span class=\"num-stepper\"><button type=\"button\">−</button> <input type=\"number\" min=\"1\" max=\"12\" step=\"1\"/> <button type=\"button\">+</button></span></label>", 1), Hg = /* @__PURE__ */ R("<label> <!></label> <label> <!></label> <!> <label> <!></label> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1);
function Ug(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { setBoxStyle: i, themeSwatches: a } = n, o = /* @__PURE__ */ O(() => I(r).props.boxStyle ?? {});
	var s = Hg(), c = M(s), l = j(c), u = P(l);
	{
		let e = /* @__PURE__ */ O(() => I(o).bg ?? ""), t = /* @__PURE__ */ O(a), n = /* @__PURE__ */ O(() => K("tip.box.bg"));
		rl(u, {
			get value() {
				return I(e);
			},
			get tokens() {
				return I(t);
			},
			allowClear: !0,
			get label() {
				return I(n);
			},
			onchange: (e) => i({ bg: e || null })
		});
	}
	D(c);
	var d = P(c, 2), f = j(d), p = P(f);
	{
		let e = /* @__PURE__ */ O(() => I(o).shadow ?? ""), t = /* @__PURE__ */ O(() => [
			["", K("common.none")],
			["soft", K("opt.shadow.soft")],
			["strong", K("opt.shadow.strong")]
		]);
		J(p, {
			get value() {
				return I(e);
			},
			get options() {
				return I(t);
			},
			onchange: (e) => i({ shadow: e || null })
		});
	}
	D(d);
	var m = P(d, 2), h = (e) => {
		var t = Bg(), n = j(t), r = P(n);
		{
			let e = /* @__PURE__ */ O(() => I(o).shadowColor ?? ""), t = /* @__PURE__ */ O(a), n = /* @__PURE__ */ O(() => K("tip.box.shadowColor"));
			rl(r, {
				get value() {
					return I(e);
				},
				get tokens() {
					return I(t);
				},
				allowClear: !0,
				get label() {
					return I(n);
				},
				onchange: (e) => i({ shadowColor: e || null })
			});
		}
		D(t), F((e) => B(n, `${e ?? ""} `), [() => K("lbl.shadowColor")]), z(e, t);
	};
	V(m, (e) => {
		I(o).shadow && e(h);
	});
	var g = P(m, 2), _ = j(g), v = P(_);
	{
		let e = /* @__PURE__ */ O(() => I(o).border === "none" ? "none" : I(o).border ? "custom" : ""), t = /* @__PURE__ */ O(() => [
			["", K("opt.border.theme")],
			["none", K("common.none")],
			["custom", K("opt.border.custom")]
		]);
		J(v, {
			get value() {
				return I(e);
			},
			get options() {
				return I(t);
			},
			onchange: (e) => i({ border: e === "custom" ? {
				color: "accent",
				width: 1
			} : e || null })
		});
	}
	D(g);
	var y = P(g, 2), b = (e) => {
		let t = /* @__PURE__ */ O(() => typeof I(o).border == "object" ? I(o).border : {
			color: "text",
			width: 1
		});
		var n = Vg(), r = M(n), s = j(r), c = P(s);
		{
			let e = /* @__PURE__ */ O(a), n = /* @__PURE__ */ O(() => K("tip.box.borderColor"));
			rl(c, {
				get value() {
					return I(t).color;
				},
				get tokens() {
					return I(e);
				},
				get label() {
					return I(n);
				},
				onchange: (e) => i({ border: {
					...I(t),
					color: e
				} })
			});
		}
		D(r);
		var l = P(r, 2), u = j(l), d = P(u), f = j(d), p = P(f, 2);
		U(p);
		var m = P(p, 2);
		D(d), D(l), F((e, n, r, i, a, o) => {
			B(s, `${e ?? ""} `), B(u, `${n ?? ""} `), G(f, "title", r), G(f, "aria-label", i), W(p, I(t).width), G(m, "title", a), G(m, "aria-label", o);
		}, [
			() => K("lbl.borderColor"),
			() => K("lbl.thicknessPx"),
			() => K("tip.thinner"),
			() => K("tip.thinner"),
			() => K("tip.thicker"),
			() => K("tip.thicker")
		]), L("click", f, () => i({ border: {
			...I(t),
			width: Math.max(1, I(t).width - 1)
		} })), L("change", p, (e) => i({ border: {
			...I(t),
			width: Math.min(12, Math.max(1, Number(e.target.value) || 1))
		} })), L("click", m, () => i({ border: {
			...I(t),
			width: Math.min(12, I(t).width + 1)
		} })), z(e, n);
	};
	V(y, (e) => {
		I(o).border !== "none" && e(b);
	});
	var x = P(y, 2), S = j(x);
	U(S);
	var C = P(S);
	D(x), F((e, t, n, r, i, a) => {
		B(l, `${e ?? ""} `), B(f, `${t ?? ""} `), B(_, `${n ?? ""} `), G(x, "title", r), Vi(S, i), B(C, ` ${a ?? ""}`);
	}, [
		() => K("lbl.blockColor"),
		() => K("lbl.shadow"),
		() => K("lbl.border"),
		() => K("tip.box.glass"),
		() => !!I(o).glass,
		() => K("lbl.glass")
	]), L("change", S, (e) => i({ glass: e.target.checked || null })), z(e, s), at();
}
Br(["click", "change"]);
//#endregion
//#region src/menu/groups.js
function Wg(e, t) {
	let n = (t) => Object.entries(t).filter(([t, n]) => e()[t] !== void 0 && JSON.stringify(e()[t]) !== JSON.stringify(n));
	return {
		groupReset: (e, r) => n(r).length ? () => t(e, { ...r }) : null,
		groupChanged: (e) => n(e).length
	};
}
//#endregion
//#region src/menu/families/Text.svelte
var Gg = /* @__PURE__ */ R("<p class=\"panel-hint\"> </p>"), Kg = /* @__PURE__ */ R("<div class=\"pin-line\"><label> <!></label> <!></div>"), qg = /* @__PURE__ */ R("<div class=\"pin-line\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div> <!>", 1), Jg = /* @__PURE__ */ R("<!> <!>", 1);
function Yg(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { setBlockProp: i, setBlockProps: a } = n, { groupReset: o, groupChanged: s } = Wg(() => I(r).props, a);
	var c = Yr(), l = M(c), u = (e) => {
		var t = Gg(), n = N(t, !0);
		F((e) => B(n, e), [() => K("hint.textInline")]), z(e, t);
	}, d = (e) => {
		let t = (e) => {
			var t = Kg(), n = j(t), a = j(n), o = P(a);
			{
				let e = /* @__PURE__ */ O(() => I(r).props.align ?? "left"), t = /* @__PURE__ */ O(() => [
					["left", K("common.left")],
					["center", K("common.center")],
					["right", K("common.right")]
				]);
				J(o, {
					get value() {
						return I(e);
					},
					get options() {
						return I(t);
					},
					onchange: (e) => i("align", e)
				});
			}
			D(n), eg(P(n, 2), { id: "align" }), D(t), F((e) => B(a, `${e ?? ""} `), [() => K("lbl.align")]), z(e, t);
		}, n = (e) => {
			var t = qg(), n = M(t), a = j(n), o = j(a);
			U(o);
			var s = P(o);
			D(a), eg(P(a, 2), { id: "textBox" }), D(n);
			var c = P(n, 2), l = (e) => {
				Ug(e, {});
			};
			V(c, (e) => {
				I(r).props.box && e(l);
			}), F((e, t) => {
				Vi(o, e), B(s, ` ${t ?? ""}`);
			}, [() => !!I(r).props.box, () => K("lbl.textBoxToggle")]), L("change", o, (e) => i("box", e.target.checked)), z(e, t);
		};
		var a = Jg(), s = M(a);
		{
			let e = /* @__PURE__ */ O(() => K("lbl.align")), n = /* @__PURE__ */ O(() => ({
				left: K("common.left"),
				center: K("common.center"),
				right: K("common.right")
			})[I(r).props.align ?? "left"]), i = /* @__PURE__ */ O(() => o("text-align", { align: "left" }));
			wg(s, {
				id: "text-align",
				get title() {
					return I(e);
				},
				get value() {
					return I(n);
				},
				get reset() {
					return I(i);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var c = P(s, 2);
		{
			let e = /* @__PURE__ */ O(() => K("group.textBox")), t = /* @__PURE__ */ O(() => I(r).props.box ? K("common.on") : K("common.off")), i = /* @__PURE__ */ O(() => o("text-box", {
				box: !1,
				boxStyle: null
			}));
			wg(c, {
				id: "text-box",
				get title() {
					return I(e);
				},
				get value() {
					return I(t);
				},
				get reset() {
					return I(i);
				},
				children: (e, t) => {
					n(e);
				},
				$$slots: { default: !0 }
			});
		}
		z(e, a);
	};
	V(l, (e) => {
		t.area === "content" ? e(u) : t.area === "style" && e(d, 1);
	}), z(e, c), at();
}
Br(["change"]);
//#endregion
//#region src/menu/families/Button.svelte
var Xg = /* @__PURE__ */ R("<input/>"), Zg = /* @__PURE__ */ R("<label> <input/></label> <div class=\"pin-line\"><label> <!></label> <!></div> <!>", 1), Qg = /* @__PURE__ */ R("<div class=\"pin-line\"><label> <!></label> <!></div>");
function $g(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { setBlockProp: i, setBlockProps: a, buttonTargets: o, setButtonTarget: s } = n, { groupReset: c, groupChanged: l } = Wg(() => I(r).props, a);
	var u = Yr(), d = M(u), f = (e) => {
		let t = (e) => {
			var t = Zg(), n = M(t), a = j(n), c = P(a);
			U(c), D(n);
			var l = P(n, 2), u = j(l), d = j(u), f = P(d);
			{
				let e = /* @__PURE__ */ O(() => I(r).props.page ?? "__href"), t = /* @__PURE__ */ O(o);
				J(f, {
					get value() {
						return I(e);
					},
					get options() {
						return I(t);
					},
					get onchange() {
						return s;
					}
				});
			}
			D(u), eg(P(u, 2), { id: "goesTo" }), D(l);
			var p = P(l, 2), m = (e) => {
				var t = Xg();
				U(t), F((e) => {
					G(t, "placeholder", e), W(t, I(r).props.href === "#" ? "" : I(r).props.href ?? "");
				}, [() => K("ph.url")]), L("change", t, (e) => i("href", e.target.value || null)), z(e, t);
			};
			V(p, (e) => {
				I(r).props.page || e(m);
			}), F((e, t) => {
				B(a, `${e ?? ""} `), W(c, I(r).props.label), B(d, `${t ?? ""} `);
			}, [() => K("blocks.text"), () => K("lbl.goesTo")]), L("change", c, (e) => i("label", e.target.value)), z(e, t);
		};
		{
			let n = /* @__PURE__ */ O(() => K("group.textLink")), i = /* @__PURE__ */ O(() => o().find(([e]) => e === (I(r).props.page ?? "__href"))?.[1] ?? "");
			wg(e, {
				id: "btn-link",
				defaultOpen: !0,
				get title() {
					return I(n);
				},
				get value() {
					return I(i);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	}, p = (e) => {
		let t = (e) => {
			var t = Qg(), n = j(t), a = j(n), o = P(a);
			{
				let e = /* @__PURE__ */ O(() => [["primary", K("opt.btn.primary")], ["secondary", K("opt.btn.secondary")]]);
				J(o, {
					get value() {
						return I(r).props.style;
					},
					get options() {
						return I(e);
					},
					onchange: (e) => i("style", e)
				});
			}
			D(n), eg(P(n, 2), { id: "btnStyle" }), D(t), F((e) => B(a, `${e ?? ""} `), [() => K("lbl.style")]), z(e, t);
		};
		{
			let n = /* @__PURE__ */ O(() => K("group.appearance")), i = /* @__PURE__ */ O(() => I(r).props.style === "secondary" ? K("opt.btn.secondary") : K("opt.btn.primary")), a = /* @__PURE__ */ O(() => c("btn-look", { style: "primary" }));
			wg(e, {
				id: "btn-look",
				defaultOpen: !0,
				get title() {
					return I(n);
				},
				get value() {
					return I(i);
				},
				get reset() {
					return I(a);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	};
	V(d, (e) => {
		t.area === "content" ? e(f) : t.area === "style" && e(p, 1);
	}), z(e, u), at();
}
Br(["change"]);
//#endregion
//#region src/menu/families/Image.svelte
var e_ = /* @__PURE__ */ R("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <label> <input/></label>", 1), t_ = /* @__PURE__ */ R("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), n_ = /* @__PURE__ */ R("<label> <input/></label> <!>", 1), r_ = /* @__PURE__ */ R("<!> <!>", 1), i_ = /* @__PURE__ */ R("<div class=\"pin-line\"><label> <!></label> <!></div> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.01\"/> <button type=\"button\" class=\"linkish\"> </button>", 1), a_ = /* @__PURE__ */ R("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.01\"/>", 1), o_ = /* @__PURE__ */ R("<div class=\"pin-line\"><label> <!></label> <!></div>"), s_ = /* @__PURE__ */ R("<!> <!> <!>", 1);
function c_(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, setBlockProps: o, openImageEditor: s, compressOrTrim: c, imageErrorText: l, setStatus: u } = n, { groupReset: d, groupChanged: f } = Wg(() => I(r).props, o);
	async function p(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await c(t);
			i(`edit:${I(r).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || Fp(t.name).replaceAll("-", " ");
			});
		} catch (e) {
			u(l(e), "error");
		}
	}
	var m = Yr(), h = M(m), g = (e) => {
		let t = (e) => {
			var t = e_(), n = M(t), i = j(n), o = P(i);
			D(n);
			var s = P(n, 2), c = j(s), l = P(c);
			U(l), D(s), F((e, t, n) => {
				B(i, `${e ?? ""} `), B(c, `${t ?? ""} `), W(l, I(r).props.alt ?? ""), G(l, "placeholder", n);
			}, [
				() => K("ui.changeImage"),
				() => K("lbl.description"),
				() => K("ph.altText")
			]), L("change", o, p), L("change", l, (e) => a("alt", e.target.value)), z(e, t);
		}, n = (e) => {
			var t = n_(), n = M(t), i = j(n), o = P(i);
			U(o), D(n);
			var s = P(n, 2), c = (e) => {
				var t = t_(), n = j(t);
				U(n);
				var i = P(n);
				D(t), F((e, r, a) => {
					G(t, "title", e), Vi(n, r), B(i, ` ${a ?? ""}`);
				}, [
					() => K("tip.lightbox"),
					() => !!I(r).props.lightbox,
					() => K("lbl.lightbox")
				]), L("change", n, (e) => a("lightbox", e.target.checked)), z(e, t);
			};
			V(s, (e) => {
				I(r).props.href || e(c);
			}), F((e, t) => {
				B(i, `${e ?? ""} `), W(o, I(r).props.href ?? ""), G(o, "placeholder", t);
			}, [() => K("lbl.link"), () => K("ph.optionalImageLink")]), L("change", o, (e) => a("href", e.target.value || null)), z(e, t);
		};
		var i = r_(), o = M(i);
		{
			let e = /* @__PURE__ */ O(() => K("blocks.image")), n = /* @__PURE__ */ O(() => I(r).props.alt || K("menu.noAlt"));
			wg(o, {
				id: "img-image",
				get title() {
					return I(e);
				},
				get value() {
					return I(n);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var s = P(o, 2);
		{
			let e = /* @__PURE__ */ O(() => K("group.linkClick")), t = /* @__PURE__ */ O(() => I(r).props.href || (I(r).props.lightbox ? K("menu.lightboxShort") : K("common.none"))), i = /* @__PURE__ */ O(() => d("img-link", {
				href: null,
				lightbox: !1
			}));
			wg(s, {
				id: "img-link",
				get title() {
					return I(e);
				},
				get value() {
					return I(t);
				},
				get reset() {
					return I(i);
				},
				children: (e, t) => {
					n(e);
				},
				$$slots: { default: !0 }
			});
		}
		z(e, i);
	}, _ = (e) => {
		let t = (e) => {
			var t = i_(), n = M(t), i = j(n), o = j(i), c = P(o);
			{
				let e = /* @__PURE__ */ O(() => I(r).props.fit ?? "cover"), t = /* @__PURE__ */ O(() => [["cover", K("opt.fitFrame.cover")], ["contain", K("opt.fitFrame.contain")]]);
				J(c, {
					get value() {
						return I(e);
					},
					get options() {
						return I(t);
					},
					onchange: (e) => a("fit", e)
				});
			}
			D(i), eg(P(i, 2), { id: "imgFit" }), D(n);
			var l = P(n, 2), u = j(l), d = N(P(u));
			D(l);
			var f = P(l, 2);
			U(f);
			var p = P(f, 2), m = j(p), h = N(P(m));
			D(p);
			var g = P(p, 2);
			U(g);
			var _ = P(g, 2), v = j(_), y = N(P(v));
			D(_);
			var b = P(_, 2);
			U(b);
			var x = P(b, 2), S = N(x, !0);
			F((e, t, n, i, a, s, c, l, p) => {
				B(o, `${e ?? ""} `), B(u, `${t ?? ""} `), B(d, `${n ?? ""}%`), W(f, I(r).props.x ?? .5), B(m, `${i ?? ""} `), B(h, `${a ?? ""}%`), W(g, I(r).props.y ?? .5), G(_, "title", s), B(v, `${c ?? ""} `), B(y, `${l ?? ""}x`), W(b, I(r).props.zoom ?? 1), B(S, p);
			}, [
				() => K("lbl.imageFit"),
				() => K("lbl.focusX"),
				() => Math.round((I(r).props.x ?? .5) * 100),
				() => K("lbl.focusY"),
				() => Math.round((I(r).props.y ?? .5) * 100),
				() => K("tip.zoomCrop"),
				() => K("lbl.zoom"),
				() => (I(r).props.zoom ?? 1).toFixed(2),
				() => K("ui.openImageEditor")
			]), L("input", f, (e) => a("x", Number(e.target.value))), L("input", g, (e) => a("y", Number(e.target.value))), L("input", b, (e) => a("zoom", Number(e.target.value))), L("click", x, s), z(e, t);
		}, n = (e) => {
			var t = a_(), n = M(t), i = j(n), o = N(P(i));
			D(n);
			var s = P(n, 2);
			U(s);
			var c = P(s, 2), l = j(c), u = N(P(l));
			D(c);
			var d = P(c, 2);
			U(d);
			var f = P(d, 2), p = j(f), m = N(P(p));
			D(f);
			var h = P(f, 2);
			U(h), F((e, t, n, a, c, f) => {
				B(i, `${e ?? ""} `), B(o, `${t ?? ""}%`), W(s, I(r).props.brightness ?? 1), B(l, `${n ?? ""} `), B(u, `${a ?? ""}%`), W(d, I(r).props.contrast ?? 1), B(p, `${c ?? ""} `), B(m, `${f ?? ""}%`), W(h, I(r).props.saturate ?? 1);
			}, [
				() => K("lbl.brightness"),
				() => Math.round((I(r).props.brightness ?? 1) * 100),
				() => K("lbl.contrast"),
				() => Math.round((I(r).props.contrast ?? 1) * 100),
				() => K("lbl.saturate"),
				() => Math.round((I(r).props.saturate ?? 1) * 100)
			]), L("input", s, (e) => a("brightness", Number(e.target.value))), L("input", d, (e) => a("contrast", Number(e.target.value))), L("input", h, (e) => a("saturate", Number(e.target.value))), z(e, t);
		}, i = (e) => {
			var t = o_(), n = j(t), i = j(n), o = P(i);
			{
				let e = /* @__PURE__ */ O(() => I(r).props.radius ?? ""), t = /* @__PURE__ */ O(() => [
					["", K("common.none")],
					["sm", K("opt.size.sm")],
					["md", K("opt.radius.md")]
				]);
				J(o, {
					get value() {
						return I(e);
					},
					get options() {
						return I(t);
					},
					onchange: (e) => a("radius", e || null)
				});
			}
			D(n), eg(P(n, 2), { id: "radius" }), D(t), F((e) => B(i, `${e ?? ""} `), [() => K("lbl.radius")]), z(e, t);
		}, o = /* @__PURE__ */ O(() => f({
			fit: "cover",
			x: .5,
			y: .5,
			zoom: 1
		})), c = /* @__PURE__ */ O(() => f({
			brightness: 1,
			contrast: 1,
			saturate: 1
		}));
		var l = s_(), u = M(l);
		{
			let e = /* @__PURE__ */ O(() => K("group.crop")), n = /* @__PURE__ */ O(() => I(o) ? K("menu.changed", { n: I(o) }) : K("menu.standard")), r = /* @__PURE__ */ O(() => d("img-crop", {
				fit: "cover",
				x: .5,
				y: .5,
				zoom: 1
			}));
			wg(u, {
				id: "img-crop",
				get title() {
					return I(e);
				},
				get value() {
					return I(n);
				},
				get reset() {
					return I(r);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var p = P(u, 2);
		{
			let e = /* @__PURE__ */ O(() => K("group.filters")), t = /* @__PURE__ */ O(() => I(c) ? K("menu.changed", { n: I(c) }) : K("menu.standard")), r = /* @__PURE__ */ O(() => d("img-filters", {
				brightness: 1,
				contrast: 1,
				saturate: 1
			}));
			wg(p, {
				id: "img-filters",
				get title() {
					return I(e);
				},
				get value() {
					return I(t);
				},
				get reset() {
					return I(r);
				},
				children: (e, t) => {
					n(e);
				},
				$$slots: { default: !0 }
			});
		}
		var m = P(p, 2);
		{
			let e = /* @__PURE__ */ O(() => K("group.corners")), t = /* @__PURE__ */ O(() => ({
				"": K("common.none"),
				sm: K("opt.size.sm"),
				md: K("opt.radius.md")
			})[I(r).props.radius ?? ""]), n = /* @__PURE__ */ O(() => d("img-corners", { radius: "md" }));
			wg(m, {
				id: "img-corners",
				get title() {
					return I(e);
				},
				get value() {
					return I(t);
				},
				get reset() {
					return I(n);
				},
				children: (e, t) => {
					i(e);
				},
				$$slots: { default: !0 }
			});
		}
		z(e, l);
	};
	V(h, (e) => {
		t.area === "content" ? e(g) : t.area === "style" && e(_, 1);
	}), z(e, m), at();
}
Br([
	"change",
	"input",
	"click"
]);
//#endregion
//#region src/menu/families/Video.svelte
var l_ = /* @__PURE__ */ R("<label> </label> <input/>", 1), u_ = /* @__PURE__ */ R("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"video/mp4,video/webm\"/></label> <label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label>", 1), d_ = /* @__PURE__ */ R("<div class=\"pin-line\"><!> <!></div> <!>", 1), f_ = /* @__PURE__ */ R("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), p_ = /* @__PURE__ */ R("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!>", 1), m_ = /* @__PURE__ */ R("<label> <input/></label>"), h_ = /* @__PURE__ */ R("<!> <!> <!>", 1);
function g_(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { setBlockProp: i, setBlockProps: a, setBlockVideoFile: o, setBlockVideoPoster: s } = n, { groupReset: c, groupChanged: l } = Wg(() => I(r).props, a);
	var u = Yr(), d = M(u), f = (e) => {
		let t = (e) => {
			var t = d_(), n = M(t), a = j(n);
			{
				let e = /* @__PURE__ */ O(() => K("lbl.videoSource")), t = /* @__PURE__ */ O(() => [["embed", K("opt.videoSource.embed")], ["file", K("opt.videoSource.file")]]);
				Bl(a, {
					get label() {
						return I(e);
					},
					get value() {
						return I(u);
					},
					get options() {
						return I(t);
					},
					onchange: (e) => i("source", e)
				});
			}
			eg(P(a, 2), { id: "videoSource" }), D(n);
			var c = P(n, 2), l = (e) => {
				var t = l_(), n = M(t), a = N(n, !0), o = P(n, 2);
				U(o), F((e, t, i) => {
					G(n, "title", e), B(a, t), W(o, I(r).props.url ?? ""), G(o, "placeholder", i);
				}, [
					() => K("hint.video"),
					() => K("lbl.videoUrl"),
					() => K("ph.videoUrl")
				]), L("change", o, (e) => i("url", e.target.value)), z(e, t);
			}, d = (e) => {
				var t = u_(), n = M(t), i = j(n), a = P(i);
				D(n);
				var c = P(n, 2), l = j(c), u = P(l);
				D(c), F((e, t, r, a) => {
					G(n, "title", e), B(i, `${t ?? ""} `), G(c, "title", r), B(l, `${a ?? ""} `);
				}, [
					() => K("tip.video.file"),
					() => I(r).props.src ? K("ui.changeVideo") : K("ui.chooseVideo"),
					() => K("tip.bg.poster"),
					() => I(r).props.poster ? K("ui.changeImage") : K("ui.choosePoster")
				]), L("change", a, o), L("change", u, s), z(e, t);
			};
			V(c, (e) => {
				I(u) === "embed" ? e(l) : e(d, -1);
			}), z(e, t);
		}, n = (e) => {
			var t = p_(), n = M(t), o = j(n);
			U(o);
			var s = P(o);
			D(n);
			var c = P(n, 2), l = j(c);
			U(l);
			var u = P(l);
			D(c);
			var d = P(c, 2), f = (e) => {
				var t = f_(), n = j(t);
				U(n);
				var a = P(n);
				D(t), F((e, i) => {
					G(t, "title", e), Vi(n, I(r).props.autoplay === !0), B(a, ` ${i ?? ""}`);
				}, [() => K("tip.video.autoplay"), () => K("lbl.videoAutoplay")]), L("change", n, (e) => i("autoplay", e.target.checked)), z(e, t);
			};
			V(d, (e) => {
				I(r).props.muted === !0 && e(f);
			}), F((e, t) => {
				Vi(o, I(r).props.loop === !0), B(s, ` ${e ?? ""}`), Vi(l, I(r).props.muted === !0), B(u, ` ${t ?? ""}`);
			}, [() => K("lbl.videoLoop"), () => K("lbl.videoMuted")]), L("change", o, (e) => i("loop", e.target.checked)), L("change", l, (e) => a("muted", e.target.checked ? { muted: !0 } : {
				muted: !1,
				autoplay: !1
			})), z(e, t);
		}, l = (e) => {
			var t = m_(), n = j(t), a = P(n);
			U(a), D(t), F((e) => {
				B(n, `${e ?? ""} `), W(a, I(r).props.title ?? "");
			}, [() => K("lbl.videoTitle")]), L("change", a, (e) => i("title", e.target.value)), z(e, t);
		}, u = /* @__PURE__ */ O(() => I(r).props.source === "file" ? "file" : "embed");
		var d = h_(), f = M(d);
		{
			let e = /* @__PURE__ */ O(() => K("lbl.videoSource")), n = /* @__PURE__ */ O(() => I(u) === "file" ? K("opt.videoSource.file") : K("opt.videoSource.embed"));
			wg(f, {
				id: "video-source",
				get title() {
					return I(e);
				},
				get value() {
					return I(n);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var p = P(f, 2), m = (e) => {
			let t = /* @__PURE__ */ O(() => [
				I(r).props.loop === !0,
				I(r).props.muted === !0,
				I(r).props.autoplay === !0
			].filter(Boolean).length);
			{
				let r = /* @__PURE__ */ O(() => K("group.playback")), i = /* @__PURE__ */ O(() => I(t) ? K("menu.onCount", { n: I(t) }) : K("common.off")), a = /* @__PURE__ */ O(() => c("video-play", {
					loop: !1,
					muted: !1,
					autoplay: !1
				}));
				wg(e, {
					id: "video-play",
					get title() {
						return I(r);
					},
					get value() {
						return I(i);
					},
					get reset() {
						return I(a);
					},
					children: (e, t) => {
						n(e);
					},
					$$slots: { default: !0 }
				});
			}
		};
		V(p, (e) => {
			I(u) === "file" && e(m);
		});
		var h = P(p, 2);
		{
			let e = /* @__PURE__ */ O(() => K("group.accessibility")), t = /* @__PURE__ */ O(() => I(r).props.title || K("menu.noTitle"));
			wg(h, {
				id: "video-a11y",
				get title() {
					return I(e);
				},
				get value() {
					return I(t);
				},
				children: (e, t) => {
					l(e);
				},
				$$slots: { default: !0 }
			});
		}
		z(e, d);
	};
	V(d, (e) => {
		t.area === "content" && e(f);
	}), z(e, u), at();
}
Br(["change"]);
//#endregion
//#region src/menu/families/Icon.svelte
var __ = /* @__PURE__ */ R("<input class=\"token-input\" maxlength=\"4\"/>"), v_ = /* @__PURE__ */ R("<button class=\"ghost\"> </button>"), y_ = /* @__PURE__ */ R("<span class=\"toolbar-row\"><img class=\"site-icon-preview\"/> <button class=\"ghost\"> </button></span>"), b_ = /* @__PURE__ */ R("<label> <span class=\"toolbar-row\"><!> <!></span></label> <!>", 1), x_ = /* @__PURE__ */ R("<div class=\"pin-line\"><label> <input type=\"number\" min=\"8\" max=\"400\"/></label> <!></div> <div class=\"pin-line\"><label> <!></label> <!></div>", 1);
function S_(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, setBlockProps: o, themeSwatches: s } = n, { groupReset: c, groupChanged: l } = Wg(() => I(r).props, o);
	var u = Yr(), d = M(u), f = (e) => {
		let t = (e) => {
			var t = b_(), n = M(t), o = j(n), s = P(o), c = j(s);
			{
				let e = /* @__PURE__ */ O(() => I(r).props.glyph ?? "★"), t = /* @__PURE__ */ O(() => I(r).props.icon ?? null), n = /* @__PURE__ */ O(() => I(r).props.image ?? null);
				am(c, {
					get value() {
						return I(e);
					},
					get icon() {
						return I(t);
					},
					get image() {
						return I(n);
					},
					onpick: (e) => i(`edit:${I(r).blockId}`, (t) => {
						t.props.glyph = e, t.props.icon = null, t.props.image = null;
					}),
					onicon: (e) => i(`edit:${I(r).blockId}`, (t) => {
						t.props.icon = e, t.props.image = null;
					}),
					onimage: (e) => a("image", e)
				});
			}
			var l = P(c, 2), u = (e) => {
				var t = __();
				U(t), F((e) => {
					W(t, I(r).props.glyph ?? ""), G(t, "title", e);
				}, [() => K("tip.icon.typeGlyph")]), L("change", t, (e) => a("glyph", e.target.value || "★")), z(e, t);
			}, d = (e) => {
				var t = v_(), n = N(t, !0);
				F((e, r) => {
					G(t, "title", e), B(n, r);
				}, [() => K("tip.icon.backToGlyph"), () => K("ui.removeDrawnIcon")]), L("click", t, () => a("icon", null)), z(e, t);
			};
			V(l, (e) => {
				I(r).props.icon ? e(d, -1) : e(u);
			}), D(s), D(n);
			var f = P(n, 2), p = (e) => {
				var t = y_(), n = j(t), i = P(n, 2), o = N(i, !0);
				D(t), F((e, i, a) => {
					G(t, "title", e), G(n, "src", I(r).props.image), G(n, "alt", i), B(o, a);
				}, [
					() => K("hint.icon.ownImage"),
					() => K("gp.ownIcon"),
					() => K("ui.removeOwnIcon")
				]), L("click", i, () => a("image", null)), z(e, t);
			};
			V(f, (e) => {
				I(r).props.image && e(p);
			}), F((e) => B(o, `${e ?? ""} `), [() => K("blocks.icon")]), z(e, t);
		};
		{
			let n = /* @__PURE__ */ O(() => K("blocks.icon")), i = /* @__PURE__ */ O(() => I(r).props.image ? K("gp.ownIcon") : I(r).props.icon ? K("menu.drawnIcon") : I(r).props.glyph ?? "★");
			wg(e, {
				id: "icon-icon",
				defaultOpen: !0,
				get title() {
					return I(n);
				},
				get value() {
					return I(i);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	}, p = (e) => {
		let t = (e) => {
			var t = x_(), n = M(t), i = j(n), o = j(i), c = P(o);
			U(c), D(i), eg(P(i, 2), { id: "iconSize" }), D(n);
			var l = P(n, 2), u = j(l), d = j(u), f = P(d);
			{
				let e = /* @__PURE__ */ O(() => I(r).props.color ?? "accent"), t = /* @__PURE__ */ O(s);
				rl(f, {
					get value() {
						return I(e);
					},
					get tokens() {
						return I(t);
					},
					onchange: (e) => a("color", e)
				});
			}
			D(u), eg(P(u, 2), { id: "iconColor" }), D(l), F((e, t, n) => {
				B(o, `${e ?? ""} `), W(c, I(r).props.size ?? 48), G(u, "title", t), B(d, `${n ?? ""} `);
			}, [
				() => K("lbl.sizePx"),
				() => K("hint.icon.color"),
				() => K("lbl.color")
			]), L("change", c, (e) => a("size", Number(e.target.value))), z(e, t);
		};
		{
			let n = /* @__PURE__ */ O(() => K("group.appearance")), i = /* @__PURE__ */ O(() => `${I(r).props.size ?? 48} px`), a = /* @__PURE__ */ O(() => c("icon-look", {
				size: 48,
				color: "accent"
			}));
			wg(e, {
				id: "icon-look",
				defaultOpen: !0,
				get title() {
					return I(n);
				},
				get value() {
					return I(i);
				},
				get reset() {
					return I(a);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	};
	V(d, (e) => {
		t.area === "content" ? e(f) : t.area === "style" && e(p, 1);
	}), z(e, u), at();
}
Br(["change", "click"]);
//#endregion
//#region src/menu/families/Shape.svelte
var C_ = /* @__PURE__ */ R("<label> <input/></label>"), w_ = /* @__PURE__ */ R("<label> <!></label> <!>", 1), T_ = /* @__PURE__ */ R("<div class=\"pin-line\"><label> <!></label> <!></div> <div class=\"pin-line\"><label> <input type=\"number\" min=\"1\" max=\"40\"/></label> <!></div> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), E_ = /* @__PURE__ */ R("<label> <input type=\"number\" min=\"4\" step=\"1\"/></label>"), D_ = /* @__PURE__ */ R("<label> <input type=\"number\" min=\"1\" step=\"0.5\"/></label>"), O_ = /* @__PURE__ */ R("<!> <!>", 1);
function k_(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { setBlockProp: i, setBlockProps: a, setBlockFrame: o, designWidth: s, shapePx: c, setShapeSizePx: l } = n, { groupReset: u, groupChanged: d } = Wg(() => I(r).props, a);
	var f = Yr(), p = M(f), m = (e) => {
		let t = (e) => {
			var t = w_(), n = M(t), a = j(n), o = P(a);
			{
				let e = /* @__PURE__ */ O(dg);
				J(o, {
					get value() {
						return I(r).props.kind;
					},
					get options() {
						return I(e);
					},
					onchange: (e) => i("kind", e)
				});
			}
			D(n);
			var s = P(n, 2), c = (e) => {
				var t = C_(), n = j(t), a = P(n);
				U(a), D(t), F((e, i) => {
					G(t, "title", e), B(n, `${i ?? ""} `), W(a, I(r).props.label ?? "");
				}, [() => K("tip.shape.label"), () => K("lbl.shapeLabel")]), L("change", a, (e) => i("label", e.target.value.trim() || void 0)), z(e, t);
			};
			V(s, (e) => {
				I(r).props.kind === "line" && e(c);
			}), F((e) => B(a, `${e ?? ""} `), [() => K("blocks.shape")]), z(e, t);
		};
		{
			let n = /* @__PURE__ */ O(() => K("blocks.shape")), i = /* @__PURE__ */ O(() => dg().find(([e]) => e === I(r).props.kind)?.[1] ?? "");
			wg(e, {
				id: "shape-shape",
				defaultOpen: !0,
				get title() {
					return I(n);
				},
				get value() {
					return I(i);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	}, h = (e) => {
		let t = (e) => {
			var t = T_(), n = M(t), a = j(n), o = j(a), s = P(o);
			{
				let e = /* @__PURE__ */ O(fg);
				J(s, {
					get value() {
						return I(r).props.color;
					},
					get options() {
						return I(e);
					},
					onchange: (e) => i("color", e)
				});
			}
			D(a), eg(P(a, 2), { id: "shapeColor" }), D(n);
			var c = P(n, 2), l = j(c), u = j(l), d = P(u);
			U(d), D(l), eg(P(l, 2), { id: "thickness" }), D(c);
			var f = P(c, 2), p = j(f);
			U(p);
			var m = P(p);
			D(f), F((e, t, n, i, a) => {
				B(o, `${e ?? ""} `), B(u, `${t ?? ""} `), W(d, I(r).props.thickness), G(f, "title", n), Vi(p, i), B(m, ` ${a ?? ""}`);
			}, [
				() => K("lbl.color"),
				() => K("lbl.thickness"),
				() => K("tip.shape.fill"),
				() => !!I(r).props.fill,
				() => K("lbl.filled")
			]), L("change", d, (e) => i("thickness", Number(e.target.value))), L("change", p, (e) => i("fill", e.target.checked ? I(r).props.color : null)), z(e, t);
		}, n = (e) => {
			var t = Yr(), n = M(t), i = (e) => {
				var t = E_(), n = j(t), i = P(n);
				U(i), D(t), F((e, r, a, o) => {
					G(t, "title", e), B(n, `${r ?? ""} `), G(i, "max", a), W(i, o);
				}, [
					() => K("tip.shapeSize"),
					() => K("lbl.length"),
					() => c(100 - I(r).frame.x),
					() => c(I(r).frame.w)
				]), L("change", i, (e) => l(Number(e.target.value), !1)), z(e, t);
			}, a = /* @__PURE__ */ O(() => (I(r).props.kind === "line" || I(r).props.kind === "arrow") && s()), u = (e) => {
				var t = D_(), n = j(t), i = P(n);
				U(i), D(t), F((e, t) => {
					B(n, `${e ?? ""} `), G(i, "max", t), W(i, I(r).frame.w);
				}, [() => K("lbl.length"), () => Math.max(1, Math.round(100 - I(r).frame.x))]), L("change", i, (e) => o("w", Math.max(1, Math.min(Number(e.target.value), 100 - I(r).frame.x)))), z(e, t);
			}, d = (e) => {
				var t = E_(), n = j(t), i = P(n);
				U(i), D(t), F((e, r, a, o) => {
					G(t, "title", e), B(n, `${r ?? ""} `), G(i, "max", a), W(i, o);
				}, [
					() => K("tip.shapeSize"),
					() => K("lbl.sizePx"),
					() => c(100 - I(r).frame.x),
					() => c(I(r).frame.w)
				]), L("change", i, (e) => l(Number(e.target.value), !0)), z(e, t);
			};
			V(n, (e) => {
				I(a) ? e(i) : I(r).props.kind === "line" || I(r).props.kind === "arrow" ? e(u, 1) : e(d, -1);
			}), z(e, t);
		}, a = /* @__PURE__ */ O(() => I(r).props.kind === "line" || I(r).props.kind === "arrow");
		var d = O_(), f = M(d);
		{
			let e = /* @__PURE__ */ O(() => K("group.strokeFill")), n = /* @__PURE__ */ O(() => `${fg().find(([e]) => e === I(r).props.color)?.[1] ?? ""} · ${I(r).props.thickness ?? 2} px`), i = /* @__PURE__ */ O(() => u("shape-stroke", {
				color: "accent",
				thickness: 2,
				fill: null
			}));
			wg(f, {
				id: "shape-stroke",
				get title() {
					return I(e);
				},
				get value() {
					return I(n);
				},
				get reset() {
					return I(i);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var p = P(f, 2), m = (e) => {
			{
				let t = /* @__PURE__ */ O(() => K("group.measures")), i = /* @__PURE__ */ O(() => s() ? `${c(I(r).frame.w)} px` : `${I(r).frame.w} %`);
				wg(e, {
					id: "shape-size",
					get title() {
						return I(t);
					},
					get value() {
						return I(i);
					},
					children: (e, t) => {
						n(e);
					},
					$$slots: { default: !0 }
				});
			}
		}, h = /* @__PURE__ */ O(() => I(a) || s());
		V(p, (e) => {
			I(h) && e(m);
		}), z(e, d);
	};
	V(p, (e) => {
		t.area === "content" ? e(m) : t.area === "style" && e(h, 1);
	}), z(e, f), at();
}
Br(["change"]);
//#endregion
//#region src/menu/families/Gallery.svelte
var A_ = /* @__PURE__ */ R("<div class=\"bg-layer\"><span class=\"toolbar-row\"><img class=\"site-icon-preview\" alt=\"\"/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span> <label> <input/></label> <label> <input/></label></div>"), j_ = /* @__PURE__ */ R("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\" multiple=\"\"/></label> <!>", 1), M_ = /* @__PURE__ */ R("<div class=\"pin-line\"><label> <input type=\"number\" min=\"1\" max=\"6\"/></label> <!></div> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\"/>", 1), N_ = /* @__PURE__ */ R("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" step=\"10\"/> <span class=\"gridmenu-value\"> </span></div> <button type=\"button\" class=\"ghost action\"><!> </button>", 1), P_ = /* @__PURE__ */ R("<button type=\"button\" class=\"ghost action\"><!> </button>"), F_ = /* @__PURE__ */ R("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div> <!> <label> <!></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), I_ = /* @__PURE__ */ R("<label> <input type=\"number\" min=\"2\" max=\"60\"/></label>"), L_ = /* @__PURE__ */ R("<div class=\"pin-line\"><label> <!></label> <!></div> <!> <!> <!> <!> <!>", 1), R_ = /* @__PURE__ */ R("<!> <!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"10\" max=\"300\" step=\"5\"/> <span class=\"gridmenu-value\"> </span></div> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"60\" max=\"800\" step=\"10\"/> <span class=\"gridmenu-value\"> </span></div> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\"/> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), z_ = /* @__PURE__ */ R("<label> <!></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), B_ = /* @__PURE__ */ R("<!> <!> <!>", 1);
function V_(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { setBlockProp: i, setBlockProps: a, setBlockFrame: o, addGalleryImages: s, moveGalleryImage: c, removeGalleryImage: l, setGalleryImageField: u, themeSwatches: d, newSeed: f } = n, { groupReset: p, groupChanged: m } = Wg(() => I(r).props, a);
	var h = Yr(), g = M(h), _ = (e) => {
		let t = (e) => {
			var t = j_(), n = M(t), i = j(n), a = P(i);
			D(n), ui(P(n, 2), 17, () => I(r).props.images ?? [], oi, (e, t, n) => {
				var i = A_(), a = j(i), o = j(a), s = P(o, 2), d = j(s);
				d.disabled = n === 0, H(d, () => q.up, !0), D(d);
				var f = P(d, 2);
				H(f, () => q.down, !0), D(f);
				var p = P(f, 2);
				H(p, () => q.cross, !0), D(p), D(s), D(a);
				var m = P(a, 2), h = j(m), g = P(h);
				U(g), D(m);
				var _ = P(m, 2), v = j(_), y = P(v);
				U(y), D(_), D(i), F((e, i, s, c, l, u) => {
					G(a, "title", e), G(o, "src", I(t).src), f.disabled = n === I(r).props.images.length - 1, G(p, "title", i), B(h, `${s ?? ""} `), W(g, I(t).alt ?? ""), G(g, "placeholder", c), B(v, `${l ?? ""} `), W(y, I(t).href ?? ""), G(y, "placeholder", u);
				}, [
					() => K("hint.gallery"),
					() => K("tip.removeImage"),
					() => K("lbl.description"),
					() => K("ph.altShort"),
					() => K("lbl.link"),
					() => K("ph.galleryHref")
				]), L("click", d, () => c(n, -1)), L("click", f, () => c(n, 1)), L("click", p, () => l(n)), L("change", g, (e) => u(n, "alt", e.target.value)), L("change", y, (e) => u(n, "href", e.target.value || null)), z(e, i);
			}), F((e, t) => {
				G(n, "title", e), B(i, `${t ?? ""} `);
			}, [() => K("tip.gallery.addImages"), () => K("ui.addImages")]), L("change", a, s), z(e, t);
		};
		{
			let n = /* @__PURE__ */ O(() => K("group.images")), i = /* @__PURE__ */ O(() => K("menu.imageCount", { n: I(r).props.images?.length ?? 0 }));
			wg(e, {
				id: "gallery-images",
				defaultOpen: !0,
				get title() {
					return I(n);
				},
				get value() {
					return I(i);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	}, v = (e) => {
		let t = (e) => {
			var t = L_(), n = M(t), a = j(n), o = j(a), c = P(o);
			{
				let e = /* @__PURE__ */ O(() => $l.map((e) => [e, K(`opt.galleryView.${e}`)]));
				J(c, {
					get value() {
						return I(s);
					},
					get options() {
						return I(e);
					},
					onchange: (e) => i("view", e)
				});
			}
			D(a), eg(P(a, 2), { id: "galleryView" }), D(n);
			var l = P(n, 2), u = (e) => {
				{
					let t = /* @__PURE__ */ O(() => K("lbl.ribbonWidth")), n = /* @__PURE__ */ O(() => rg(I(r).props.width)), a = /* @__PURE__ */ O(ng);
					Bl(e, {
						get label() {
							return I(t);
						},
						get value() {
							return I(n);
						},
						get options() {
							return I(a);
						},
						onchange: (e) => i("width", e)
					});
				}
			};
			V(l, (e) => {
				I(s) === "ribbon" && e(u);
			});
			var p = P(l, 2), m = (e) => {
				var t = M_(), n = M(t), a = j(n), o = j(a), s = P(o);
				U(s), D(a), eg(P(a, 2), { id: "columns" }), D(n);
				var c = P(n, 2), l = j(c), u = N(P(l));
				D(c);
				var d = P(c, 2);
				U(d), F((e, t) => {
					B(o, `${e ?? ""} `), W(s, I(r).props.columns ?? 3), B(l, `${t ?? ""} `), B(u, `${I(r).props.gap ?? 12 ?? ""} px`), W(d, I(r).props.gap ?? 12);
				}, [() => K("lbl.columns"), () => K("lbl.imageGap")]), L("change", s, (e) => i("columns", Number(e.target.value))), L("input", d, (e) => i("gap", Number(e.target.value))), z(e, t);
			}, h = /* @__PURE__ */ O(() => eu.includes(I(s)));
			V(p, (e) => {
				I(h) && e(m);
			});
			var g = P(p, 2), _ = (e) => {
				var t = N_(), n = M(t), a = j(n), o = N(a, !0), s = P(a, 2);
				U(s);
				var c = N(P(s, 2));
				D(n);
				var l = P(n, 2), u = j(l);
				H(u, () => q.shuffle);
				var d = P(u);
				D(l), F((e, t, i, a) => {
					G(n, "title", e), B(o, t), G(s, "min", tu.min), G(s, "max", tu.max), W(s, I(r).props.rowHeight ?? tu.dflt), B(c, `${I(r).props.rowHeight ?? tu.dflt ?? ""} px`), G(l, "title", i), B(d, ` ${a ?? ""}`);
				}, [
					() => K("tip.gallery.rowHeight"),
					() => K("lbl.galleryRowHeight"),
					() => K("tip.gallery.shuffleMosaic"),
					() => K("ui.shufflePhotos")
				]), L("input", s, (e) => i("rowHeight", e.target.valueAsNumber)), L("click", l, () => i("seed", f())), z(e, t);
			};
			V(g, (e) => {
				I(s) === "mosaic" && e(_);
			});
			var v = P(g, 2), y = (e) => {
				var t = F_(), n = M(t), a = j(n), o = N(a, !0), s = P(a, 2);
				U(s);
				var c = N(P(s, 2));
				D(n);
				var l = P(n, 2), u = (e) => {
					var t = P_(), n = j(t);
					H(n, () => q.shuffle);
					var r = P(n);
					D(t), F((e, n) => {
						G(t, "title", e), B(r, ` ${n ?? ""}`);
					}, [() => K("tip.gallery.shuffleTilt"), () => K("ui.shufflePhotos")]), L("click", t, () => i("seed", f())), z(e, t);
				};
				V(l, (e) => {
					(I(r).props.tilt ?? nu.dflt) > 0 && e(u);
				});
				var p = P(l, 2), m = j(p), h = P(m);
				{
					let e = /* @__PURE__ */ O(() => I(r).props.frameColor || "#ffffff"), t = /* @__PURE__ */ O(d), n = /* @__PURE__ */ O(() => K("tip.gallery.frameColor"));
					rl(h, {
						get value() {
							return I(e);
						},
						get tokens() {
							return I(t);
						},
						allowClear: !0,
						get label() {
							return I(n);
						},
						onchange: (e) => i("frameColor", e ?? "")
					});
				}
				D(p);
				var g = P(p, 2), _ = j(g);
				U(_);
				var v = P(_);
				D(g), F((e, t, i, a, l, u) => {
					G(n, "title", e), B(o, t), G(s, "min", nu.min), G(s, "max", nu.max), W(s, I(r).props.tilt ?? nu.dflt), B(c, `${I(r).props.tilt ?? nu.dflt ?? ""}°`), G(p, "title", i), B(m, `${a ?? ""} `), G(g, "title", l), Vi(_, I(r).props.captions === !0), B(v, ` ${u ?? ""}`);
				}, [
					() => K("tip.gallery.tilt"),
					() => K("lbl.polaroidTilt"),
					() => K("tip.gallery.frameColor"),
					() => K("lbl.frameColor"),
					() => K("tip.gallery.captions"),
					() => K("lbl.galleryCaptions")
				]), L("input", s, (e) => i("tilt", e.target.valueAsNumber)), L("change", _, (e) => i("captions", e.target.checked)), z(e, t);
			};
			V(v, (e) => {
				I(s) === "polaroid" && e(y);
			});
			var b = P(v, 2), x = (e) => {
				var t = I_(), n = j(t), a = P(n);
				U(a), D(t), F((e) => {
					B(n, `${e ?? ""} `), W(a, I(r).props.interval ?? 5);
				}, [() => K("lbl.secondsPerImage")]), L("change", a, (e) => i("interval", Number(e.target.value))), z(e, t);
			};
			V(b, (e) => {
				I(s) === "slides" && e(x);
			}), F((e) => B(o, `${e ?? ""} `), [() => K("lbl.view")]), z(e, t);
		}, n = (e) => {
			var t = R_(), n = M(t);
			{
				let e = /* @__PURE__ */ O(() => K("lbl.ribbonRows")), t = /* @__PURE__ */ O(() => String(I(r).props.rows ?? 1)), a = /* @__PURE__ */ O(() => [["1", K("opt.ribbonRows.one")], ["2", K("opt.ribbonRows.two")]]);
				Bl(n, {
					get label() {
						return I(e);
					},
					get value() {
						return I(t);
					},
					get options() {
						return I(a);
					},
					onchange: (e) => i("rows", Number(e))
				});
			}
			var a = P(n, 2);
			{
				let e = /* @__PURE__ */ O(() => K("lbl.ribbonDirection")), t = /* @__PURE__ */ O(() => I(r).props.direction ?? "left"), n = /* @__PURE__ */ O(() => [["left", K("opt.ribbonDir.left")], ["right", K("opt.ribbonDir.right")]]);
				Bl(a, {
					get label() {
						return I(e);
					},
					get value() {
						return I(t);
					},
					get options() {
						return I(n);
					},
					onchange: (e) => i("direction", e)
				});
			}
			var s = P(a, 2), c = j(s), l = N(c, !0), u = P(c, 2);
			U(u);
			var d = N(P(u, 2), !0);
			D(s);
			var f = P(s, 2), p = j(f), m = N(p, !0), h = P(p, 2);
			U(h);
			var g = N(P(h, 2));
			D(f);
			var _ = P(f, 2), v = j(_), y = N(P(v));
			D(_);
			var b = P(_, 2);
			U(b);
			var x = P(b, 2), S = j(x);
			U(S);
			var C = P(S);
			D(x);
			var w = P(x, 2);
			{
				let e = /* @__PURE__ */ O(() => K("lbl.bandPause")), t = /* @__PURE__ */ O(() => I(r).props.pause ?? "button"), n = /* @__PURE__ */ O(() => K("tip.ribbon.pauseMode")), a = /* @__PURE__ */ O(() => [["button", K("opt.bandPause.button")], ["touch", K("opt.bandPause.touch")]]);
				Bl(w, {
					get label() {
						return I(e);
					},
					get value() {
						return I(t);
					},
					get title() {
						return I(n);
					},
					get options() {
						return I(a);
					},
					onchange: (e) => i("pause", e)
				});
			}
			var T = P(w, 2), E = j(T);
			U(E);
			var ee = P(E);
			D(T), F((e, t, n, i, a, o, c, p, _) => {
				G(s, "title", e), B(l, t), W(u, I(r).props.speed ?? 60), B(d, I(r).props.speed ?? 60), G(f, "title", n), B(m, i), W(h, I(r).frame.h), B(g, `${I(r).frame.h ?? ""} px`), B(v, `${a ?? ""} `), B(y, `${I(r).props.gap ?? 12 ?? ""} px`), W(b, I(r).props.gap ?? 12), G(x, "title", o), Vi(S, I(r).props.pauseOnHover !== !1), B(C, ` ${c ?? ""}`), G(T, "title", p), Vi(E, I(r).props.fade !== !1), B(ee, ` ${_ ?? ""}`);
			}, [
				() => K("tip.ribbon.speed"),
				() => K("lbl.ribbonSpeed"),
				() => K("tip.ribbon.bandHeight"),
				() => K("lbl.ribbonHeight"),
				() => K("lbl.imageGap"),
				() => K("tip.ribbon.pause"),
				() => K("lbl.ribbonPause"),
				() => K("tip.ribbon.fade"),
				() => K("lbl.ribbonFade")
			]), L("input", u, (e) => i("speed", e.target.valueAsNumber)), L("input", h, (e) => o("h", e.target.valueAsNumber)), L("input", b, (e) => i("gap", Number(e.target.value))), L("change", S, (e) => i("pauseOnHover", e.target.checked)), L("change", E, (e) => i("fade", e.target.checked)), z(e, t);
		}, a = (e) => {
			var t = z_(), n = M(t), a = j(n), o = P(a);
			{
				let e = /* @__PURE__ */ O(() => I(r).props.radius ?? ""), t = /* @__PURE__ */ O(() => [
					["", K("common.none")],
					["sm", K("opt.size.sm")],
					["md", K("opt.radius.md")]
				]);
				J(o, {
					get value() {
						return I(e);
					},
					get options() {
						return I(t);
					},
					onchange: (e) => i("radius", e || null)
				});
			}
			D(n);
			var s = P(n, 2), c = j(s);
			U(c);
			var l = P(c);
			D(s), F((e, t, n) => {
				B(a, `${e ?? ""} `), G(s, "title", t), Vi(c, I(r).props.lightbox !== !1), B(l, ` ${n ?? ""}`);
			}, [
				() => K("lbl.radius"),
				() => K("tip.lightbox"),
				() => K("lbl.lightbox")
			]), L("change", c, (e) => i("lightbox", e.target.checked)), z(e, t);
		}, s = /* @__PURE__ */ O(() => ru(I(r).props.view));
		var c = B_(), l = M(c);
		{
			let e = /* @__PURE__ */ O(() => K("lbl.view")), n = /* @__PURE__ */ O(() => K(`opt.galleryView.${I(s)}`)), r = /* @__PURE__ */ O(() => p("gallery-view", {
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
			wg(l, {
				id: "gallery-view",
				get title() {
					return I(e);
				},
				get value() {
					return I(n);
				},
				get reset() {
					return I(r);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var u = P(l, 2), m = (e) => {
			{
				let t = /* @__PURE__ */ O(() => K("lbl.ribbonMotion")), i = /* @__PURE__ */ O(() => `${I(r).props.speed ?? 60} px/s`), a = /* @__PURE__ */ O(() => p("gallery-roll", {
					rows: void 0,
					direction: void 0,
					speed: void 0,
					pauseOnHover: void 0,
					pause: void 0,
					fade: void 0
				}));
				wg(e, {
					id: "gallery-roll",
					get title() {
						return I(t);
					},
					get value() {
						return I(i);
					},
					get reset() {
						return I(a);
					},
					children: (e, t) => {
						n(e);
					},
					$$slots: { default: !0 }
				});
			}
		};
		V(u, (e) => {
			I(s) === "ribbon" && e(m);
		});
		var h = P(u, 2);
		{
			let e = /* @__PURE__ */ O(() => K("group.galleryImages")), t = /* @__PURE__ */ O(() => ({
				"": K("common.none"),
				sm: K("opt.size.sm"),
				md: K("opt.radius.md")
			})[I(r).props.radius ?? ""]), n = /* @__PURE__ */ O(() => p("gallery-look", {
				radius: "md",
				lightbox: !0
			}));
			wg(h, {
				id: "gallery-look",
				get title() {
					return I(e);
				},
				get value() {
					return I(t);
				},
				get reset() {
					return I(n);
				},
				children: (e, t) => {
					a(e);
				},
				$$slots: { default: !0 }
			});
		}
		z(e, c);
	};
	V(g, (e) => {
		t.area === "content" ? e(_) : t.area === "style" && e(v, 1);
	}), z(e, h), at();
}
Br([
	"change",
	"click",
	"input"
]);
//#endregion
//#region src/menu/families/Ribbon.svelte
var H_ = /* @__PURE__ */ R("<span class=\"nav-line\"><input/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span>"), U_ = /* @__PURE__ */ R("<!> <button class=\"ghost action\"> </button>", 1), W_ = /* @__PURE__ */ R("<button type=\"button\"></button>"), G_ = /* @__PURE__ */ R("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <input class=\"field-filled\"/></label>"), K_ = /* @__PURE__ */ R("<div class=\"ctl-field\"><span class=\"mini-label\"> </span> <div class=\"tile-grid cols-6\" role=\"group\"></div></div> <!>", 1), q_ = /* @__PURE__ */ R("<!> <!>", 1), J_ = /* @__PURE__ */ R("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"0.5\" max=\"10\" step=\"0.5\"/> <span class=\"gridmenu-value\"> </span></div>"), Y_ = /* @__PURE__ */ R("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"10\" max=\"300\" step=\"5\"/> <span class=\"gridmenu-value\"> </span> <!></div>"), X_ = /* @__PURE__ */ R("<button class=\"ghost action\"> </button> <!> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), Z_ = /* @__PURE__ */ R("<div class=\"pin-line\"><!> <!></div> <!>", 1), Q_ = /* @__PURE__ */ R("<label> <!></label>"), $_ = /* @__PURE__ */ R("<!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"2\" max=\"40\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div>", 1), ev = /* @__PURE__ */ R("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <!> <label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <!> <!>", 1), tv = /* @__PURE__ */ R("<!> <!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"-10\" max=\"10\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div>", 1), nv = /* @__PURE__ */ R("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"8\" max=\"120\" step=\"2\"/> <span class=\"gridmenu-value\"> </span></div>", 1), rv = /* @__PURE__ */ R("<div class=\"swatch-cell\"><!> <span class=\"mini-label\"> </span></div>"), iv = /* @__PURE__ */ R("<div class=\"swatch-row\"><!> <div class=\"swatch-cell\"><!> <span class=\"mini-label\"> </span></div></div>"), av = /* @__PURE__ */ R("<!> <!> <!> <!> <!>", 1);
function ov(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, setBlockProps: o, themeSwatches: s } = n, { groupReset: c, groupChanged: l } = Wg(() => I(r).props, o);
	function u(e, t) {
		i(`edit:${I(r).blockId}:ribbon${e}`, (n) => {
			n.props.items[e] = t;
		});
	}
	function d() {
		i("ribbon-item", (e) => {
			e.props.items ??= [], e.props.items.push(K("seed.ribbonBlock.new"));
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
	var m = Yr(), h = M(m), _ = (e) => {
		let t = (e) => {
			var t = U_(), n = M(t);
			ui(n, 17, () => I(r).props.items ?? [], oi, (e, t, n) => {
				var i = H_(), a = j(i);
				U(a);
				var o = P(a, 2), s = j(o);
				s.disabled = n === 0, H(s, () => q.up, !0), D(s);
				var c = P(s, 2);
				H(c, () => q.down, !0), D(c);
				var l = P(c, 2);
				H(l, () => q.cross, !0), D(l), D(o), D(i), F((e, i, o, u) => {
					W(a, I(t)), G(a, "title", e), G(s, "title", i), G(c, "title", o), c.disabled = n === (I(r).props.items?.length ?? 0) - 1, G(l, "title", u);
				}, [
					() => K("tip.ribbon.item"),
					() => K("tip.moveUp"),
					() => K("tip.moveDown"),
					() => K("tip.ribbon.remove")
				]), L("change", a, (e) => u(n, e.target.value)), L("click", s, () => p(n, -1)), L("click", c, () => p(n, 1)), L("click", l, () => f(n)), z(e, i);
			});
			var i = P(n, 2), a = N(i, !0);
			F((e) => B(a, e), [() => K("ui.addRibbonItem")]), L("click", i, d), z(e, t);
		}, n = (e) => {
			var t = K_(), n = M(t), i = j(n), o = N(i, !0), s = P(i, 2);
			ui(s, 21, sg, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ O(() => g(I(t), 2));
				let i = () => I(n)[0], o = () => I(n)[1];
				var s = W_();
				let c;
				H(s, () => ug[i()], !0), D(s), F(() => {
					c = Pi(s, 1, "tile", null, c, { on: (I(r).props.sep ?? "dot") === i() }), G(s, "aria-pressed", (I(r).props.sep ?? "dot") === i()), G(s, "title", o());
				}), L("click", s, () => a("sep", i())), z(e, s);
			}), D(s), D(n);
			var c = P(n, 2), l = (e) => {
				var t = G_(), n = j(t), i = N(n, !0), o = P(n, 2);
				U(o), D(t), F((e, n) => {
					G(t, "title", e), B(i, n), W(o, I(r).props.sepText ?? "");
				}, [() => K("tip.ribbon.sepText"), () => K("lbl.ribbonSepText")]), L("change", o, (e) => a("sepText", e.target.value)), z(e, t);
			};
			V(c, (e) => {
				I(r).props.sep === "custom" && e(l);
			}), F((e, t) => {
				B(o, e), G(s, "aria-label", t);
			}, [() => K("lbl.ribbonSep"), () => K("lbl.ribbonSep")]), z(e, t);
		};
		var i = q_(), o = M(i);
		{
			let e = /* @__PURE__ */ O(() => K("lbl.ribbonItems")), n = /* @__PURE__ */ O(() => K("menu.wordCount", { n: I(r).props.items?.length ?? 0 }));
			wg(o, {
				id: "ribbon-words",
				get title() {
					return I(e);
				},
				get value() {
					return I(n);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var s = P(o, 2);
		{
			let e = /* @__PURE__ */ O(() => K("lbl.ribbonSep")), t = /* @__PURE__ */ O(() => sg().find(([e]) => e === (I(r).props.sep ?? "dot"))?.[1] ?? ""), i = /* @__PURE__ */ O(() => c("ribbon-sep", {
				sep: "dot",
				sepText: void 0
			}));
			wg(s, {
				id: "ribbon-sep",
				get title() {
					return I(e);
				},
				get value() {
					return I(t);
				},
				get reset() {
					return I(i);
				},
				children: (e, t) => {
					n(e);
				},
				$$slots: { default: !0 }
			});
		}
		z(e, i);
	}, v = (e) => {
		let t = (e) => {
			var t = Z_(), i = M(t), o = j(i);
			{
				let e = /* @__PURE__ */ O(ig);
				J(o, {
					filled: !0,
					get value() {
						return I(f);
					},
					get options() {
						return I(e);
					},
					onchange: (e) => a("motion", e)
				});
			}
			eg(P(o, 2), { id: "ribbonMotion" }), D(i);
			var s = P(i, 2), c = (e) => {
				var t = X_(), i = M(t), o = N(i, !0), s = P(i, 2);
				{
					let e = /* @__PURE__ */ O(() => K("lbl.ribbonDirection")), t = /* @__PURE__ */ O(() => I(r).props.direction ?? "left"), n = /* @__PURE__ */ O(() => [["left", K("opt.ribbonDir.left")], ["right", K("opt.ribbonDir.right")]]);
					Bl(s, {
						get label() {
							return I(e);
						},
						get value() {
							return I(t);
						},
						get options() {
							return I(n);
						},
						onchange: (e) => a("direction", e)
					});
				}
				var c = P(s, 2), l = (e) => {
					var t = J_(), n = j(t), i = N(n, !0), o = P(n, 2);
					U(o);
					var s = N(P(o, 2));
					D(t), F((e, n) => {
						G(t, "title", e), B(i, n), W(o, I(r).props.dwell ?? 2.5), B(s, `${I(r).props.dwell ?? 2.5 ?? ""} s`);
					}, [() => K("tip.ribbon.dwell"), () => K("lbl.ribbonDwell")]), L("input", o, (e) => a("dwell", e.target.valueAsNumber)), z(e, t);
				}, u = (e) => {
					var t = Y_(), n = j(t), i = N(n, !0), o = P(n, 2);
					U(o);
					var s = P(o, 2), c = N(s, !0);
					eg(P(s, 2), { id: "speed" }), D(t), F((e, n) => {
						G(t, "title", e), B(i, n), W(o, I(r).props.speed ?? 60), B(c, I(r).props.speed ?? 60);
					}, [() => K("tip.ribbon.speed"), () => K("lbl.ribbonSpeed")]), L("input", o, (e) => a("speed", e.target.valueAsNumber)), z(e, t);
				};
				V(c, (e) => {
					I(f) === "step" ? e(l) : e(u, -1);
				});
				var d = P(c, 2), p = j(d);
				U(p);
				var m = P(p);
				D(d);
				var h = P(d, 2);
				{
					let e = /* @__PURE__ */ O(() => K("lbl.bandPause")), t = /* @__PURE__ */ O(() => I(r).props.pause ?? "button"), n = /* @__PURE__ */ O(() => K("tip.ribbon.pauseMode")), i = /* @__PURE__ */ O(() => [["button", K("opt.bandPause.button")], ["touch", K("opt.bandPause.touch")]]);
					Bl(h, {
						get label() {
							return I(e);
						},
						get value() {
							return I(t);
						},
						get title() {
							return I(n);
						},
						get options() {
							return I(i);
						},
						onchange: (e) => a("pause", e)
					});
				}
				var g = P(h, 2), _ = j(g);
				U(_);
				var v = P(_);
				D(g), F((e, t, n, a, s, c) => {
					G(i, "title", e), B(o, t), G(d, "title", n), Vi(p, I(r).props.pauseOnHover !== !1), B(m, ` ${a ?? ""}`), G(g, "title", s), Vi(_, I(r).props.fade !== !1), B(v, ` ${c ?? ""}`);
				}, [
					() => K("tip.ribbon.play"),
					() => K("ui.ribbonPlay"),
					() => K("tip.ribbon.pause"),
					() => K("lbl.ribbonPause"),
					() => K("tip.ribbon.fade"),
					() => K("lbl.ribbonFade")
				]), L("click", i, () => n.bridge?.sendDemoMotion()), L("change", p, (e) => a("pauseOnHover", e.target.checked)), L("change", _, (e) => a("fade", e.target.checked)), z(e, t);
			};
			V(s, (e) => {
				I(f) !== "none" && e(c);
			}), z(e, t);
		}, i = (e) => {
			var t = ev(), n = M(t), i = j(n), o = N(i, !0), c = P(i, 2);
			{
				let e = /* @__PURE__ */ O(() => I(r).props.above ?? "none"), t = /* @__PURE__ */ O(og);
				J(c, {
					filled: !0,
					get value() {
						return I(e);
					},
					get options() {
						return I(t);
					},
					onchange: (e) => a("above", e)
				});
			}
			D(n);
			var l = P(n, 2), u = (e) => {
				var t = Q_(), n = j(t), i = P(n);
				{
					let e = /* @__PURE__ */ O(() => I(r).props.aboveColor ?? cg(I(r).props)), t = /* @__PURE__ */ O(s), n = /* @__PURE__ */ O(() => K("tip.ribbon.stripeColor"));
					rl(i, {
						get value() {
							return I(e);
						},
						get tokens() {
							return I(t);
						},
						get label() {
							return I(n);
						},
						onchange: (e) => a("aboveColor", e)
					});
				}
				D(t), F((e, r) => {
					G(t, "title", e), B(n, `${r ?? ""} `);
				}, [() => K("tip.ribbon.stripeColor"), () => K("lbl.colour")]), z(e, t);
			};
			V(l, (e) => {
				(I(r).props.above ?? "none") !== "none" && e(u);
			});
			var d = P(l, 2), f = j(d), p = N(f, !0), m = P(f, 2);
			{
				let e = /* @__PURE__ */ O(() => I(r).props.main ?? "text"), t = /* @__PURE__ */ O(ag);
				J(m, {
					filled: !0,
					get value() {
						return I(e);
					},
					get options() {
						return I(t);
					},
					onchange: (e) => a("main", e)
				});
			}
			D(d);
			var h = P(d, 2), g = j(h), _ = N(g, !0), v = P(g, 2);
			{
				let e = /* @__PURE__ */ O(() => I(r).props.below ?? "none"), t = /* @__PURE__ */ O(og);
				J(v, {
					filled: !0,
					get value() {
						return I(e);
					},
					get options() {
						return I(t);
					},
					onchange: (e) => a("below", e)
				});
			}
			D(h);
			var y = P(h, 2), b = (e) => {
				var t = Q_(), n = j(t), i = P(n);
				{
					let e = /* @__PURE__ */ O(() => I(r).props.belowColor ?? cg(I(r).props)), t = /* @__PURE__ */ O(s), n = /* @__PURE__ */ O(() => K("tip.ribbon.stripeColor"));
					rl(i, {
						get value() {
							return I(e);
						},
						get tokens() {
							return I(t);
						},
						get label() {
							return I(n);
						},
						onchange: (e) => a("belowColor", e)
					});
				}
				D(t), F((e, r) => {
					G(t, "title", e), B(n, `${r ?? ""} `);
				}, [() => K("tip.ribbon.stripeColor"), () => K("lbl.colour")]), z(e, t);
			};
			V(y, (e) => {
				(I(r).props.below ?? "none") !== "none" && e(b);
			});
			var x = P(y, 2), S = (e) => {
				var t = $_(), n = M(t);
				{
					let e = /* @__PURE__ */ O(() => K("lbl.ribbonStripePlace")), t = /* @__PURE__ */ O(() => K("tip.ribbon.stripePlace")), i = /* @__PURE__ */ O(() => I(r).props.stripePlace ?? "stack"), o = /* @__PURE__ */ O(() => [["stack", K("opt.ribbonPlace.stack")], ["edge", K("opt.ribbonPlace.edge")]]);
					Bl(n, {
						get label() {
							return I(e);
						},
						get title() {
							return I(t);
						},
						get value() {
							return I(i);
						},
						get options() {
							return I(o);
						},
						onchange: (e) => a("stripePlace", e)
					});
				}
				var i = P(n, 2), o = j(i), s = N(o, !0), c = P(o, 2);
				U(c);
				var l = N(P(c, 2));
				D(i), F((e, t) => {
					G(i, "title", e), B(s, t), W(c, I(r).props.thickness ?? 8), B(l, `${I(r).props.thickness ?? 8 ?? ""} px`);
				}, [() => K("tip.ribbon.thickness"), () => K("lbl.ribbonThickness")]), L("input", c, (e) => a("thickness", e.target.valueAsNumber)), z(e, t);
			};
			V(x, (e) => {
				((I(r).props.above ?? "none") !== "none" || (I(r).props.below ?? "none") !== "none") && e(S);
			}), F((e, t, r, i, a, s) => {
				G(n, "title", e), B(o, t), G(d, "title", r), B(p, i), G(h, "title", a), B(_, s);
			}, [
				() => K("tip.ribbon.above"),
				() => K("lbl.ribbonAbove"),
				() => K("tip.ribbon.main"),
				() => K("lbl.ribbonMain"),
				() => K("tip.ribbon.below"),
				() => K("lbl.ribbonBelow")
			]), z(e, t);
		}, o = (e) => {
			var t = tv(), n = M(t);
			{
				let e = /* @__PURE__ */ O(() => K("lbl.ribbonWidth")), t = /* @__PURE__ */ O(() => rg(I(r).props.width)), i = /* @__PURE__ */ O(ng);
				Bl(n, {
					get label() {
						return I(e);
					},
					get value() {
						return I(t);
					},
					get options() {
						return I(i);
					},
					onchange: (e) => a("width", e)
				});
			}
			var i = P(n, 2);
			{
				let e = /* @__PURE__ */ O(() => K("lbl.ribbonVariant")), t = /* @__PURE__ */ O(() => I(r).props.variant ?? "band"), n = /* @__PURE__ */ O(() => [["band", K("opt.ribbonVariant.band")], ["plain", K("opt.ribbonVariant.plain")]]);
				Bl(i, {
					get label() {
						return I(e);
					},
					get value() {
						return I(t);
					},
					get options() {
						return I(n);
					},
					onchange: (e) => a("variant", e)
				});
			}
			var o = P(i, 2), s = j(o), c = N(s, !0), l = P(s, 2);
			U(l);
			var u = N(P(l, 2));
			D(o), F((e, t) => {
				G(o, "title", e), B(c, t), W(l, I(r).props.tilt ?? 0), B(u, `${I(r).props.tilt ?? 0 ?? ""}°`);
			}, [() => K("tip.ribbon.tilt"), () => K("lbl.ribbonTilt")]), L("input", l, (e) => a("tilt", e.target.valueAsNumber)), z(e, t);
		}, u = (e) => {
			var t = nv(), n = M(t), i = j(n), o = N(i, !0), s = P(i, 2);
			{
				let e = /* @__PURE__ */ O(() => I(r).props.size ?? "md"), t = /* @__PURE__ */ O(() => [
					["sm", K("opt.size.sm")],
					["md", K("opt.size.md")],
					["lg", K("opt.size.lg")],
					["xl", K("opt.size.xl")]
				]);
				J(s, {
					filled: !0,
					get value() {
						return I(e);
					},
					get options() {
						return I(t);
					},
					onchange: (e) => a("size", e)
				});
			}
			D(n);
			var c = P(n, 2), l = j(c);
			U(l);
			var u = P(l);
			D(c);
			var d = P(c, 2), f = j(d);
			U(f);
			var p = P(f);
			D(d);
			var m = P(d, 2), h = j(m);
			U(h);
			var g = P(h);
			D(m);
			var _ = P(m, 2), v = j(_), y = N(v, !0), b = P(v, 2);
			U(b);
			var x = N(P(b, 2));
			D(_), F((e, t, n, i, a, s, v, S, C) => {
				B(o, e), G(c, "title", t), Vi(l, I(r).props.caps === !0), B(u, ` ${n ?? ""}`), G(d, "title", i), Vi(f, I(r).props.weight === "bold"), B(p, ` ${a ?? ""}`), G(m, "title", s), Vi(h, I(r).props.outline === !0), B(g, ` ${v ?? ""}`), G(_, "title", S), B(y, C), W(b, I(r).props.gap ?? 40), B(x, `${I(r).props.gap ?? 40 ?? ""} px`);
			}, [
				() => K("lbl.size"),
				() => K("tip.ribbon.caps"),
				() => K("lbl.ribbonCaps"),
				() => K("tip.ribbon.bold"),
				() => K("lbl.ribbonBold"),
				() => K("tip.ribbon.outline"),
				() => K("lbl.ribbonOutline"),
				() => K("tip.ribbon.gap"),
				() => K("lbl.ribbonGap")
			]), L("change", l, (e) => a("caps", e.target.checked)), L("change", f, (e) => a("weight", e.target.checked ? "bold" : "normal")), L("change", h, (e) => a("outline", e.target.checked)), L("input", b, (e) => a("gap", e.target.valueAsNumber)), z(e, t);
		}, d = (e) => {
			var t = iv(), n = j(t), i = (e) => {
				var t = rv(), n = j(t);
				{
					let e = /* @__PURE__ */ O(() => I(r).props.bg ?? "accent"), t = /* @__PURE__ */ O(s), i = /* @__PURE__ */ O(() => K("tip.ribbon.bg"));
					rl(n, {
						get value() {
							return I(e);
						},
						get tokens() {
							return I(t);
						},
						get label() {
							return I(i);
						},
						onchange: (e) => a("bg", e)
					});
				}
				var i = N(P(n, 2), !0);
				D(t), F((e, n) => {
					G(t, "title", e), B(i, n);
				}, [() => K("tip.ribbon.bg"), () => K("lbl.background")]), z(e, t);
			};
			V(n, (e) => {
				(I(r).props.variant ?? "band") !== "plain" && e(i);
			});
			var o = P(n, 2), c = j(o);
			{
				let e = /* @__PURE__ */ O(() => I(r).props.color ?? ((I(r).props.variant ?? "band") === "plain" ? "text" : "accent-text")), t = /* @__PURE__ */ O(s), n = /* @__PURE__ */ O(() => K("tip.ribbon.color"));
				rl(c, {
					get value() {
						return I(e);
					},
					get tokens() {
						return I(t);
					},
					get label() {
						return I(n);
					},
					onchange: (e) => a("color", e)
				});
			}
			var l = N(P(c, 2), !0);
			D(o), D(t), F((e, t) => {
				G(o, "title", e), B(l, t);
			}, [() => K("tip.ribbon.color"), () => K("lbl.textColor")]), z(e, t);
		}, f = /* @__PURE__ */ O(() => I(r).props.motion ?? "roll"), p = /* @__PURE__ */ O(() => [I(r).props.above ?? "none", I(r).props.below ?? "none"].filter((e) => e !== "none").length), m = /* @__PURE__ */ O(() => l({
			bg: void 0,
			color: void 0
		}));
		var h = av(), g = M(h);
		{
			let e = /* @__PURE__ */ O(() => K("lbl.ribbonMotion")), n = /* @__PURE__ */ O(() => ig().find(([e]) => e === I(f))?.[1] ?? ""), r = /* @__PURE__ */ O(() => c("ribbon-motion", {
				motion: "roll",
				direction: "left",
				speed: 60,
				dwell: 2.5,
				pauseOnHover: !0,
				pause: "button",
				fade: !0
			}));
			wg(g, {
				id: "ribbon-motion",
				get title() {
					return I(e);
				},
				get value() {
					return I(n);
				},
				get reset() {
					return I(r);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var _ = P(g, 2);
		{
			let e = /* @__PURE__ */ O(() => K("lbl.ribbonStripes")), t = /* @__PURE__ */ O(() => I(p) ? K("menu.onCount", { n: I(p) }) : K("common.off")), n = /* @__PURE__ */ O(() => c("ribbon-stripes", {
				above: "none",
				below: "none",
				main: "text",
				aboveColor: void 0,
				belowColor: void 0,
				stripePlace: "stack",
				thickness: 8
			}));
			wg(_, {
				id: "ribbon-stripes",
				get title() {
					return I(e);
				},
				get value() {
					return I(t);
				},
				get reset() {
					return I(n);
				},
				children: (e, t) => {
					i(e);
				},
				$$slots: { default: !0 }
			});
		}
		var v = P(_, 2);
		{
			let e = /* @__PURE__ */ O(() => K("lbl.ribbonShape")), t = /* @__PURE__ */ O(() => ng().find(([e]) => e === rg(I(r).props.width))?.[1] ?? ""), n = /* @__PURE__ */ O(() => c("ribbon-shape", {
				width: "canvas",
				variant: "band",
				tilt: 0
			}));
			wg(v, {
				id: "ribbon-shape",
				get title() {
					return I(e);
				},
				get value() {
					return I(t);
				},
				get reset() {
					return I(n);
				},
				children: (e, t) => {
					o(e);
				},
				$$slots: { default: !0 }
			});
		}
		var y = P(v, 2);
		{
			let e = /* @__PURE__ */ O(() => K("lbl.ribbonText")), t = /* @__PURE__ */ O(() => ({
				sm: K("opt.size.sm"),
				md: K("opt.size.md"),
				lg: K("opt.size.lg"),
				xl: K("opt.size.xl")
			})[I(r).props.size ?? "md"]), n = /* @__PURE__ */ O(() => c("ribbon-text", {
				size: "md",
				caps: !1,
				weight: "normal",
				outline: !1,
				gap: 40
			}));
			wg(y, {
				id: "ribbon-text",
				get title() {
					return I(e);
				},
				get value() {
					return I(t);
				},
				get reset() {
					return I(n);
				},
				children: (e, t) => {
					u(e);
				},
				$$slots: { default: !0 }
			});
		}
		var b = P(y, 2);
		{
			let e = /* @__PURE__ */ O(() => K("group.navColours")), t = /* @__PURE__ */ O(() => I(m) ? K("menu.changed", { n: I(m) }) : K("menu.standard")), n = /* @__PURE__ */ O(() => c("ribbon-colours", {
				bg: void 0,
				color: void 0
			}));
			wg(b, {
				id: "ribbon-colours",
				get title() {
					return I(e);
				},
				get value() {
					return I(t);
				},
				get reset() {
					return I(n);
				},
				children: (e, t) => {
					d(e);
				},
				$$slots: { default: !0 }
			});
		}
		z(e, h);
	};
	V(h, (e) => {
		t.area === "content" ? e(_) : t.area === "style" && e(v, 1);
	}), z(e, m), at();
}
Br([
	"change",
	"click",
	"input"
]);
//#endregion
//#region src/menu/families/Calendar.svelte
var sv = /* @__PURE__ */ k("title"), cv = /* @__PURE__ */ R("<div class=\"bg-layer\"><span class=\"toolbar-row\"><span class=\"cal-ref-swatch\" aria-hidden=\"true\"></span> <span> </span> <button class=\"ghost row-tool\"></button></span></div>"), lv = /* @__PURE__ */ R("<div class=\"bg-layer\"><span class=\"toolbar-row\"><input class=\"tb-grow\" spellcheck=\"false\"/> <button class=\"ghost row-tool\"></button></span> <span class=\"toolbar-row\"><input class=\"tb-grow\"/> <!></span> <button type=\"button\" class=\"ghost action\"> </button></div>"), uv = /* @__PURE__ */ R("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), dv = /* @__PURE__ */ R("<span class=\"gridmenu-value\"> </span>"), fv = /* @__PURE__ */ R("<!> <button type=\"button\" class=\"ghost action\"><!> </button> <span class=\"mini-label\"> </span> <!> <!> <button type=\"button\" class=\"linkish\"> </button>", 1), pv = /* @__PURE__ */ R("<label> <!></label>"), mv = /* @__PURE__ */ R("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <!></div> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <!></div>", 1), hv = /* @__PURE__ */ R("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <!>", 1), gv = /* @__PURE__ */ R("<div class=\"pin-line\"><label> <input type=\"number\" min=\"1\" max=\"50\"/></label> <!></div> <!>", 1), _v = /* @__PURE__ */ R("<!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"0\" max=\"10\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div>", 1), vv = /* @__PURE__ */ R("<!> <!> <!> <!> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <!> <!>", 1), yv = /* @__PURE__ */ R("<label> <input placeholder=\"/program\" spellcheck=\"false\"/></label>"), bv = /* @__PURE__ */ R("<!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <div class=\"pin-line\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <!>", 1), xv = /* @__PURE__ */ R("<label> <input/></label> <label> <!></label>", 1), Sv = /* @__PURE__ */ R("<label class=\"field-stack\"> <textarea rows=\"3\"></textarea></label>"), Cv = /* @__PURE__ */ R("<!> <label> <input/></label> <!> <label> <input placeholder=\"https://\" spellcheck=\"false\"/></label>", 1), wv = /* @__PURE__ */ R("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!>", 1), Tv = /* @__PURE__ */ R("<button type=\"button\" class=\"ghost action\"> </button>"), Ev = /* @__PURE__ */ R("<!> <!> <!> <!> <!> <!>", 1), Dv = /* @__PURE__ */ R("<label> <input type=\"number\" min=\"0\" max=\"24\"/></label>"), Ov = /* @__PURE__ */ R("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <!></div>"), kv = /* @__PURE__ */ R("<span class=\"mini-label\"> </span>"), Av = /* @__PURE__ */ R("<div class=\"cal-slot\"><!> <span class=\"mini-label\"> </span></div>"), jv = /* @__PURE__ */ R("<!> <div class=\"cal-slots\"></div>", 1), Mv = /* @__PURE__ */ R("<!> <label> <!></label> <label> <input type=\"number\"/></label> <!> <span class=\"toolbar-row\"><button type=\"button\"><i> </i></button> <button type=\"button\"><u> </u></button> <!></span>", 1), Nv = /* @__PURE__ */ R("<div class=\"pin-line\"><button type=\"button\" class=\"menu-row cal-design-row\"><span class=\"menu-group-title\"> </span><span class=\"menu-group-value\"> </span></button> <!></div>   <!> <!> <!> <!>", 1);
function Pv(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, setBlockProps: o, siteCalendars: s, siteCalendarById: c, addSiteCalendar: l, themeSwatches: u } = n, d = {
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
		let n = { ...I(r).props.options ?? {} };
		t === e.def || t == null ? delete n[e.key] : n[e.key] = t, a("options", Object.keys(n).length ? n : void 0);
	}
	function p(e, t) {
		return e.key === "firstMonth" && t === "now" ? K("calendar.opt.firstMonth.now") : e.key === "firstMonth" ? new Intl.DateTimeFormat(xa(), { month: "long" }).format(new Date(2024, Number(t), 1)) : K(`${e.labelKey}.${t}`);
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
		return I(r)?.props.fieldStyle?.[I(sv)] ?? {};
	}
	function g(e) {
		let t = I(r).props.texts?.[e];
		return typeof t == "string" ? new DOMParser().parseFromString(t.replace(/<br\s*\/?>/gi, "\n"), "text/html").body.textContent.trim() : "";
	}
	function _(e, t) {
		let n = t.trim(), i = { ...I(r).props.texts ?? {} };
		n ? i[e] = n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>") : delete i[e], a("texts", Object.keys(i).length ? i : void 0);
	}
	function v(e, t) {
		let n = { ...I(r).props.colors ?? {} };
		t ? n[e] = t : delete n[e], a("colors", Object.keys(n).length ? n : void 0);
	}
	function y(e) {
		let t = {
			...I(r).props.stripe ?? {},
			...e
		};
		for (let e of Object.keys(t)) t[e] === void 0 && delete t[e];
		a("stripe", Object.keys(t).length ? t : void 0);
	}
	function b(e) {
		let t = { ...I(r).props.fieldStyle ?? {} }, n = {
			...t[I(sv)] ?? {},
			...e
		};
		for (let e of Object.keys(n)) n[e] === void 0 && delete n[e];
		Object.keys(n).length ? t[I(sv)] = n : delete t[I(sv)], a("fieldStyle", Object.keys(t).length ? t : void 0);
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
	} : t, C = () => new Set((I(r).props.sources ?? []).map((e) => x(e).ref).filter(Boolean));
	function w(e, t) {
		let n = Xe(I(r).props.sources ?? []).filter((t) => x(t).ref !== e);
		a("sources", t ? [...n, { calendar: e }] : n);
	}
	function T(e) {
		let t = Xe(I(r).props.sources ?? []), { url: n, name: i, color: o } = x(t[e]), s = l({
			url: n.trim(),
			...i ? { name: i } : {},
			...o ? { color: o } : {}
		});
		a("sources", t.map((t, n) => n === e ? { calendar: s } : t));
	}
	function E(e, t) {
		i(`edit:${I(r).blockId}:source${e}`, (n) => {
			let r = [...n.props.sources ?? []];
			r[e] = S({
				...x(r[e]),
				...t
			}), n.props.sources = r;
		});
	}
	function ee() {
		a("sources", [...Xe(I(r).props.sources ?? []), ""]);
	}
	function te(e) {
		a("sources", Xe(I(r).props.sources ?? []).filter((t, n) => n !== e));
	}
	function ne() {
		let e = I(r).props, t = rh(e.design), n = (e, t) => () => o(e, t), i = ih(e), a = i === "agenda" ? 8 : 6, s = i === "next" ? 3 : void 0, l = e.switcher === !0 || e.switcherViews != null || e.toolsSize != null || e.description != null || e.showMore === !1 || (e.limit ?? 6) !== a || e.nextCount !== s || e.laterCount !== s || e.showCancelled === !1 || e.structuredData === !1 || e.clock != null || e.weekStart != null, u = [
			!t.ownFilter && e.showCategories === !0,
			e.showSubscribe !== !1,
			e.showSignup === !0,
			e.showSearch === !0,
			e.showEarlier === !0
		].filter(Boolean).length, f = u > 0 || e.showOpen === !1 || e.showAdd === !1 || !!e.programHref, p = !!e.emptyText || e.emptyIcon != null && e.emptyIcon !== "calendar", m = eh(e.design).filter((t) => e.options?.[t.key] != null).length, h = t.slots.filter((t) => e.colors?.[t.key]).length, g = Object.keys(e.fieldStyle ?? {}).length;
		return {
			sources: String((e.sources ?? []).filter((e) => {
				let t = x(e);
				return t.ref ? !!c(t.ref) : t.url.trim();
			}).length),
			view: K(d[ih(e)]),
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
			buttons: u ? K("menu.onCount", { n: u }) : K("common.off"),
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
			empty: e.emptyText || K("menu.standard"),
			emptyReset: p ? n("cal-empty", {
				emptyText: void 0,
				emptyIcon: void 0
			}) : null,
			notice: e.notice?.show === !0 ? K("common.on") : K("common.off"),
			noticeReset: e.notice ? n("cal-notice", { notice: void 0 }) : null,
			opts: m ? K("menu.changed", { n: m }) : K("menu.standard"),
			optsReset: m ? n("cal-opts", { options: void 0 }) : null,
			colors: h ? K("menu.changedOf", {
				n: h,
				m: t.slots.length
			}) : K("menu.standard"),
			colorsReset: h ? n("cal-colors", { colors: void 0 }) : null,
			stripe: uh(t, e.stripe).show ? K("common.on") : K("common.off"),
			stripeReset: e.stripe ? n("cal-stripe", { stripe: void 0 }) : null,
			fields: g ? K("menu.changed", { n: g }) : K("menu.standard"),
			fieldsReset: g ? n("cal-fields", { fieldStyle: void 0 }) : null
		};
	}
	var re = Yr(), ie = M(re), ae = (e) => {
		let t = (e) => {
			var t = fv(), i = M(t);
			ui(i, 17, () => I(r).props.sources ?? [], oi, (e, t, n) => {
				let r = /* @__PURE__ */ O(() => x(I(t)));
				var i = Yr(), a = M(i), o = (e) => {
					let t = /* @__PURE__ */ O(() => c(I(r).ref));
					var i = cv(), a = j(i), o = j(a);
					let s;
					var l = P(o, 2);
					let u;
					var d = N(l, !0), f = P(l, 2);
					H(f, () => q.cross, !0), D(f), D(a), D(i), F((e, n, r) => {
						s = Ii(o, "", s, { background: e }), u = Pi(l, 1, "tb-grow cal-ref-name", null, u, { muted: !I(t) }), B(d, n), G(f, "title", r);
					}, [
						() => pp(I(t)?.color),
						() => I(t) ? I(t).name || I(t).url : K("calendar.refMissing"),
						() => K("ui.remove")
					]), L("click", f, () => te(n)), z(e, i);
				}, s = (e) => {
					var t = lv(), i = j(t), a = j(i);
					U(a);
					var o = P(a, 2);
					H(o, () => q.cross, !0), D(o), D(i);
					var s = P(i, 2), c = j(s);
					U(c);
					var l = P(c, 2);
					{
						let e = /* @__PURE__ */ O(() => I(r).color || "accent"), t = /* @__PURE__ */ O(u), i = /* @__PURE__ */ O(() => K("tip.calendar.sourceColor"));
						rl(l, {
							get value() {
								return I(e);
							},
							get tokens() {
								return I(t);
							},
							allowClear: !0,
							get label() {
								return I(i);
							},
							onchange: (e) => E(n, { color: e ?? "" })
						});
					}
					D(s);
					var d = P(s, 2), f = N(d, !0);
					D(t), F((e, t, n, i, s, l, u, p) => {
						W(a, I(r).url), G(a, "placeholder", e), G(a, "title", t), G(o, "title", n), W(c, I(r).name), G(c, "placeholder", i), G(c, "title", s), G(d, "title", l), d.disabled = u, B(f, p);
					}, [
						() => K("calendar.sourcesPh"),
						() => K("calendar.sourceUrl"),
						() => K("ui.remove"),
						() => K("calendar.sourceName"),
						() => K("tip.calendar.sourceName"),
						() => K("tip.calendar.saveToSite"),
						() => !I(r).url.trim(),
						() => K("calendar.saveToSite")
					]), L("change", a, (e) => E(n, { url: e.target.value.trim() })), L("click", o, () => te(n)), L("change", c, (e) => E(n, { name: e.target.value.trim() })), L("click", d, () => T(n)), z(e, t);
				};
				V(a, (e) => {
					I(r).ref ? e(o) : e(s, -1);
				}), z(e, i);
			});
			var a = P(i, 2), o = j(a);
			H(o, () => q.plus);
			var l = P(o);
			D(a);
			var d = P(a, 2), f = N(d, !0), p = P(d, 2);
			ui(p, 17, s, (e) => e.id, (e, t) => {
				var n = uv(), r = j(n);
				U(r);
				var i = P(r);
				D(n), F((e) => {
					Vi(r, e), B(i, ` ${(I(t).name || I(t).url) ?? ""}`);
				}, [() => C().has(I(t).id)]), L("change", r, (e) => w(I(t).id, e.target.checked)), z(e, n);
			});
			var m = P(p, 2), h = (e) => {
				var t = dv(), n = N(t, !0);
				F((e) => B(n, e), [() => K("calendar.siteSourcesNone")]), z(e, t);
			}, g = /* @__PURE__ */ O(() => !s().length);
			V(m, (e) => {
				I(g) && e(h);
			});
			var _ = P(m, 2), v = N(_, !0);
			F((e, t, n, r) => {
				B(l, ` ${e ?? ""}`), G(d, "title", t), B(f, n), B(v, r);
			}, [
				() => K("ui.addCalendar"),
				() => K("tip.calendar.siteSources"),
				() => K("calendar.siteSources"),
				() => K("calendar.editSiteCalendars")
			]), L("click", a, ee), L("click", _, () => n.openPanel("site", { calendars: !0 })), z(e, t);
		}, i = (e) => {
			var t = vv(), n = M(t), i = (e) => {
				var t = pv(), n = j(t), i = P(n);
				{
					let e = /* @__PURE__ */ O(() => I(r).props.view ?? "list"), t = /* @__PURE__ */ O(() => [
						["list", K("calendar.viewList")],
						["cards", K("calendar.viewCards")],
						["month", K("calendar.viewMonth")],
						["agenda", K("calendar.viewAgenda")],
						["next", K("calendar.viewNext")]
					]);
					J(i, {
						get value() {
							return I(e);
						},
						get options() {
							return I(t);
						},
						onchange: (e) => a("view", e)
					});
				}
				D(t), F((e) => B(n, `${e ?? ""} `), [() => K("lbl.view")]), z(e, t);
			}, o = /* @__PURE__ */ O(() => !rh(I(r).props.design).view);
			V(n, (e) => {
				I(o) && e(i);
			});
			var s = P(n, 2), c = (e) => {
				var t = hv(), n = M(t), i = j(n);
				U(i);
				var o = P(i);
				D(n);
				var s = P(n, 2), c = (e) => {
					let t = /* @__PURE__ */ O(() => Zm(I(r).props));
					var n = mv(), i = M(n), o = j(i), s = N(o, !0), c = P(o, 2);
					{
						let e = /* @__PURE__ */ O(() => Ym.map((e) => [e, K(`calendar.design.${e}`)]));
						J(c, {
							get value() {
								return I(t).week;
							},
							get options() {
								return I(e);
							},
							onchange: (e) => a("switcherViews", {
								...I(r).props.switcherViews ?? {},
								week: e
							})
						});
					}
					D(i);
					var l = P(i, 2), u = j(l), d = N(u, !0), f = P(u, 2);
					{
						let e = /* @__PURE__ */ O(() => Xm.map((e) => [e, K(e === "month" ? "calendar.viewMonth" : `calendar.design.${e}`)]));
						J(f, {
							get value() {
								return I(t).month;
							},
							get options() {
								return I(e);
							},
							onchange: (e) => a("switcherViews", {
								...I(r).props.switcherViews ?? {},
								month: e
							})
						});
					}
					D(l), F((e, t, n, r) => {
						G(i, "title", e), B(s, t), G(l, "title", n), B(d, r);
					}, [
						() => K("tip.calendar.switchWeek"),
						() => K("calendar.switchWeek"),
						() => K("tip.calendar.switchMonth"),
						() => K("calendar.switchMonth")
					]), z(e, n);
				};
				V(s, (e) => {
					I(r).props.switcher === !0 && e(c);
				});
				var l = P(s, 2);
				{
					let e = /* @__PURE__ */ O(() => K("calendar.toolsSize")), t = /* @__PURE__ */ O(() => K("tip.calendar.toolsSize")), n = /* @__PURE__ */ O(() => ["s", "l"].includes(I(r).props.toolsSize) ? I(r).props.toolsSize : "m"), i = /* @__PURE__ */ O(() => [
						["s", K("calendar.toolsSize.s")],
						["m", K("calendar.toolsSize.m")],
						["l", K("calendar.toolsSize.l")]
					]);
					Bl(l, {
						get label() {
							return I(e);
						},
						get title() {
							return I(t);
						},
						get value() {
							return I(n);
						},
						get options() {
							return I(i);
						},
						onchange: (e) => a("toolsSize", e === "m" ? void 0 : e)
					});
				}
				F((e, t) => {
					G(n, "title", e), Vi(i, I(r).props.switcher === !0), B(o, ` ${t ?? ""}`);
				}, [() => K("tip.calendar.switcher"), () => K("calendar.switcher")]), L("change", i, (e) => a("switcher", e.target.checked || void 0)), z(e, t);
			}, l = /* @__PURE__ */ O(() => ah.includes(ih(I(r).props)));
			V(s, (e) => {
				I(l) && e(c);
			});
			var u = P(s, 2), d = (e) => {
				var t = uv(), n = j(t);
				U(n);
				var i = P(n);
				D(t), F((e, a) => {
					G(t, "title", e), Vi(n, I(r).props.phoneDesign !== !1), B(i, ` ${a ?? ""}`);
				}, [() => K("tip.calendar.phoneDesign"), () => K("calendar.phoneDesign")]), L("change", n, (e) => a("phoneDesign", e.target.checked ? void 0 : !1)), z(e, t);
			}, f = /* @__PURE__ */ O(() => rh(I(r).props.design).phone === "switch");
			V(u, (e) => {
				I(f) && e(d);
			});
			var p = P(u, 2), m = (e) => {
				{
					let t = /* @__PURE__ */ O(() => K("calendar.opt.description")), n = /* @__PURE__ */ O(() => K("tip.calendar.opt.description")), i = /* @__PURE__ */ O(() => Qm(I(r).props)), o = /* @__PURE__ */ O(() => [["rows", K("calendar.descriptionRows")], ["card", K("calendar.descriptionCard")]]);
					Bl(e, {
						get label() {
							return I(t);
						},
						get title() {
							return I(n);
						},
						get value() {
							return I(i);
						},
						get options() {
							return I(o);
						},
						onchange: (e) => a("description", e === "rows" ? void 0 : e)
					});
				}
			}, h = /* @__PURE__ */ O(() => $m(I(r).props));
			V(p, (e) => {
				I(h) && e(m);
			});
			var g = P(p, 2), _ = (e) => {
				var t = gv(), n = M(t), i = j(n), o = j(i), s = P(o);
				U(s), D(i), eg(P(i, 2), { id: "limit" }), D(n);
				var c = P(n, 2), l = (e) => {
					var t = uv(), n = j(t);
					U(n);
					var i = P(n);
					D(t), F((e, a) => {
						G(t, "title", e), Vi(n, I(r).props.showMore !== !1), B(i, ` ${a ?? ""}`);
					}, [() => K("tip.calendar.showMore"), () => K("calendar.showMore")]), L("change", n, (e) => a("showMore", e.target.checked ? void 0 : !1)), z(e, t);
				}, u = /* @__PURE__ */ O(() => ih(I(r).props) === "list" && rh(I(r).props.design).module !== "more");
				V(c, (e) => {
					I(u) && e(l);
				}), F((e, t) => {
					G(i, "title", e), B(o, `${t ?? ""} `), W(s, I(r).props.limit ?? 6);
				}, [() => K("tip.collection.limit"), () => K("lbl.maxCount")]), L("change", s, (e) => a("limit", Math.max(1, Math.min(50, Number(e.target.value) || 6)))), z(e, t);
			}, v = /* @__PURE__ */ O(() => [
				"list",
				"cards",
				"agenda"
			].includes(I(r).props.view ?? "list"));
			V(g, (e) => {
				I(v) && e(_);
			});
			var y = P(g, 2), b = j(y);
			U(b);
			var x = P(b);
			D(y);
			var S = P(y, 2), C = j(S);
			U(C);
			var w = P(C);
			D(S);
			var T = P(S, 2);
			{
				let e = /* @__PURE__ */ O(() => K("calendar.clock")), t = /* @__PURE__ */ O(() => K("tip.calendar.clock")), n = /* @__PURE__ */ O(() => I(r).props.clock === "12" ? "12" : "24"), i = /* @__PURE__ */ O(() => [["24", K("calendar.clock.24")], ["12", K("calendar.clock.12")]]);
				Bl(T, {
					get label() {
						return I(e);
					},
					get title() {
						return I(t);
					},
					get value() {
						return I(n);
					},
					get options() {
						return I(i);
					},
					onchange: (e) => a("clock", e === "12" ? "12" : void 0)
				});
			}
			var E = P(T, 2), ee = (e) => {
				{
					let t = /* @__PURE__ */ O(() => K("calendar.weekStart")), n = /* @__PURE__ */ O(() => K("tip.calendar.weekStart")), i = /* @__PURE__ */ O(() => ["mon", "sun"].includes(I(r).props.weekStart) ? I(r).props.weekStart : "auto"), o = /* @__PURE__ */ O(() => [
						["auto", K("calendar.weekStart.auto")],
						["mon", K("calendar.weekStart.mon")],
						["sun", K("calendar.weekStart.sun")]
					]);
					Bl(e, {
						get label() {
							return I(t);
						},
						get title() {
							return I(n);
						},
						get value() {
							return I(i);
						},
						get options() {
							return I(o);
						},
						onchange: (e) => a("weekStart", e === "auto" ? void 0 : e)
					});
				}
			}, te = /* @__PURE__ */ O(() => [
				"month",
				"week",
				"year",
				"agenda"
			].includes(ih(I(r).props)) || I(r).props.design === "bento" || I(r).props.switcher === !0);
			V(E, (e) => {
				I(te) && e(ee);
			});
			var ne = P(E, 2), re = (e) => {
				var t = _v(), n = M(t);
				{
					let e = /* @__PURE__ */ O(() => K("calendar.nextCount")), t = /* @__PURE__ */ O(() => K("tip.calendar.nextCount")), i = /* @__PURE__ */ O(() => String(Math.min(3, Math.max(1, Number(I(r).props.nextCount) || 1))));
					Bl(n, {
						get label() {
							return I(e);
						},
						get title() {
							return I(t);
						},
						get value() {
							return I(i);
						},
						options: [
							["1", "1"],
							["2", "2"],
							["3", "3"]
						],
						onchange: (e) => a("nextCount", Number(e))
					});
				}
				var i = P(n, 2), o = j(i), s = N(o, !0), c = P(o, 2);
				U(c);
				var l = N(P(c, 2), !0);
				D(i), F((e, t) => {
					G(i, "title", e), B(s, t), W(c, I(r).props.laterCount ?? 0), B(l, I(r).props.laterCount ?? 0);
				}, [() => K("tip.calendar.laterCount"), () => K("calendar.laterCount")]), L("input", c, (e) => a("laterCount", e.target.valueAsNumber)), z(e, t);
			};
			V(ne, (e) => {
				I(r).props.view === "next" && e(re);
			}), F((e, t, n, i) => {
				G(y, "title", e), Vi(b, I(r).props.showCancelled !== !1), B(x, ` ${t ?? ""}`), G(S, "title", n), Vi(C, I(r).props.structuredData !== !1), B(w, ` ${i ?? ""}`);
			}, [
				() => K("tip.calendar.showCancelled"),
				() => K("calendar.showCancelled"),
				() => K("tip.calendar.structuredData"),
				() => K("calendar.structuredData")
			]), L("change", b, (e) => a("showCancelled", e.target.checked ? void 0 : !1)), L("change", C, (e) => a("structuredData", e.target.checked ? void 0 : !1)), z(e, t);
		}, o = (e) => {
			var t = bv(), n = M(t), i = (e) => {
				var t = uv(), n = j(t);
				U(n);
				var i = P(n);
				D(t), F((e, a) => {
					G(t, "title", e), Vi(n, I(r).props.showCategories === !0), B(i, ` ${a ?? ""}`);
				}, [() => K("tip.calendar.showCategories"), () => K("calendar.showCategories")]), L("change", n, (e) => a("showCategories", e.target.checked)), z(e, t);
			}, o = /* @__PURE__ */ O(() => !rh(I(r).props.design).ownFilter);
			V(n, (e) => {
				I(o) && e(i);
			});
			var s = P(n, 2), c = j(s);
			U(c);
			var l = P(c);
			D(s);
			var u = P(s, 2), d = (e) => {
				var t = uv(), n = j(t);
				U(n);
				var i = P(n);
				D(t), F((e, a) => {
					G(t, "title", e), Vi(n, I(r).props.showEarlier === !0), B(i, ` ${a ?? ""}`);
				}, [() => K("tip.calendar.showEarlier"), () => K("calendar.showEarlier")]), L("change", n, (e) => a("showEarlier", e.target.checked ? !0 : void 0)), z(e, t);
			}, f = /* @__PURE__ */ O(() => ![
				"month",
				"week",
				"day",
				"year"
			].includes(ih(I(r).props)));
			V(u, (e) => {
				I(f) && e(d);
			});
			var p = P(u, 2), m = j(p), h = j(m);
			U(h);
			var g = P(h);
			D(m), eg(P(m, 2), { id: "subscribe" }), D(p);
			var _ = P(p, 2), v = j(_);
			U(v);
			var y = P(v);
			D(_);
			var b = P(_, 2), x = j(b);
			U(x);
			var S = P(x);
			D(b);
			var C = P(b, 2), w = (e) => {
				var t = uv(), n = j(t);
				U(n);
				var i = P(n);
				D(t), F((e, a) => {
					G(t, "title", e), Vi(n, I(r).props.showOpen !== !1), B(i, ` ${a ?? ""}`);
				}, [() => K("tip.calendar.showOpen"), () => K("calendar.showOpen")]), L("change", n, (e) => a("showOpen", e.target.checked ? void 0 : !1)), z(e, t);
			}, T = /* @__PURE__ */ O(() => rh(I(r).props.design).open);
			V(C, (e) => {
				I(T) && e(w);
			});
			var E = P(C, 2), ee = (e) => {
				var t = yv(), n = j(t), i = P(n);
				U(i), D(t), F((e, a) => {
					G(t, "title", e), B(n, `${a ?? ""} `), W(i, I(r).props.programHref ?? "");
				}, [() => K("tip.calendar.programHref"), () => K("calendar.programHref")]), L("change", i, (e) => a("programHref", e.target.value.trim() || void 0)), z(e, t);
			}, te = /* @__PURE__ */ O(() => rh(I(r).props.design).program);
			V(E, (e) => {
				I(te) && e(ee);
			}), F((e, t, n, i, a, o) => {
				G(s, "title", e), Vi(c, I(r).props.showSearch === !0), B(l, ` ${t ?? ""}`), Vi(h, I(r).props.showSubscribe !== !1), B(g, ` ${n ?? ""}`), Vi(v, I(r).props.showSignup === !0), B(y, ` ${i ?? ""}`), G(b, "title", a), Vi(x, I(r).props.showAdd !== !1), B(S, ` ${o ?? ""}`);
			}, [
				() => K("tip.calendar.showSearch"),
				() => K("calendar.showSearch"),
				() => K("calendar.showSubscribe"),
				() => K("calendar.showSignup"),
				() => K("tip.calendar.showAdd"),
				() => K("calendar.showAdd")
			]), L("change", c, (e) => a("showSearch", e.target.checked ? !0 : void 0)), L("change", h, (e) => a("showSubscribe", e.target.checked)), L("change", v, (e) => a("showSignup", e.target.checked)), L("change", x, (e) => a("showAdd", e.target.checked ? void 0 : !1)), z(e, t);
		}, l = (e) => {
			var t = xv(), n = M(t), i = j(n), o = P(i);
			U(o), D(n);
			var s = P(n, 2), c = j(s), l = P(c);
			{
				let e = /* @__PURE__ */ O(() => I(r).props.emptyIcon === "none" ? "" : I(r).props.emptyIcon ?? "calendar"), t = /* @__PURE__ */ O(() => K("tip.calendar.emptyIcon"));
				vl(l, {
					iconsOnly: !0,
					get icon() {
						return I(e);
					},
					klass: "lbtn-mark",
					get label() {
						return I(t);
					},
					onpick: (e) => a("emptyIcon", e.icon || "none"),
					children: (e, t) => {
						var n = Yr(), i = M(n), a = (e) => {
							var t = Yr();
							H(M(t), () => Zs(I(r).props.emptyIcon ?? "calendar") || Zs("calendar")), z(e, t);
						};
						V(i, (e) => {
							I(r).props.emptyIcon !== "none" && e(a);
						}), z(e, n);
					},
					$$slots: { default: !0 }
				});
			}
			D(s), F((e, t, a, l, u) => {
				G(n, "title", e), B(i, `${t ?? ""} `), W(o, I(r).props.emptyText ?? ""), G(o, "placeholder", a), G(s, "title", l), B(c, `${u ?? ""} `);
			}, [
				() => K("tip.calendar.emptyText"),
				() => K("calendar.emptyText"),
				() => K("calendar.emptyPh"),
				() => K("tip.calendar.emptyIcon"),
				() => K("calendar.emptyIcon")
			]), L("change", o, (e) => a("emptyText", e.target.value.trim() || void 0)), z(e, t);
		}, d = (e) => {
			var t = Yr(), n = M(t), i = (e) => {
				var t = wv(), n = M(t), i = j(n);
				U(i);
				var o = P(i);
				D(n);
				var s = P(n, 2), c = (e) => {
					var t = Cv(), n = M(t), i = (e) => {
						{
							let t = /* @__PURE__ */ O(() => K("calendar.noticeAs")), n = /* @__PURE__ */ O(() => K("tip.calendar.noticeAs")), i = /* @__PURE__ */ O(() => I(r).props.notice?.as === "band" ? "band" : "note"), o = /* @__PURE__ */ O(() => [["note", K("calendar.noticeAsNote")], ["band", K("calendar.noticeAsBand")]]);
							Bl(e, {
								get label() {
									return I(t);
								},
								get title() {
									return I(n);
								},
								get value() {
									return I(i);
								},
								get options() {
									return I(o);
								},
								onchange: (e) => a("notice", {
									...I(r).props.notice ?? {},
									as: e === "band" ? "band" : void 0
								})
							});
						}
					}, o = /* @__PURE__ */ O(() => rh(I(r).props.design).noticeBand);
					V(n, (e) => {
						I(o) && e(i);
					});
					var s = P(n, 2), c = j(s), l = P(c);
					U(l), D(s);
					var u = P(s, 2), d = (e) => {
						var t = Sv(), n = j(t), r = P(n);
						_t(r), D(t), F((e, i, a) => {
							G(t, "title", e), B(n, `${i ?? ""} `), W(r, a);
						}, [
							() => K("tip.calendar.noticeBody"),
							() => K("calendar.noticeBody"),
							() => g("noticeText")
						]), L("change", r, (e) => _("noticeText", e.target.value)), z(e, t);
					}, f = /* @__PURE__ */ O(() => I(r).props.notice?.as !== "band" || !rh(I(r).props.design).noticeBand);
					V(u, (e) => {
						I(f) && e(d);
					});
					var p = P(u, 2), m = j(p), h = P(m);
					U(h), D(p), F((e, t, n, i, a, o) => {
						G(s, "title", e), B(c, `${t ?? ""} `), W(l, n), G(l, "placeholder", i), G(p, "title", a), B(m, `${o ?? ""} `), W(h, I(r).props.notice?.href ?? "");
					}, [
						() => K("tip.calendar.noticeHeading"),
						() => K("calendar.noticeHeading"),
						() => g("noticeTitle"),
						() => K("calendar.noticeTitleHint"),
						() => K("tip.calendar.noticeHref"),
						() => K("calendar.noticeHref")
					]), L("change", l, (e) => _("noticeTitle", e.target.value)), L("change", h, (e) => a("notice", {
						...I(r).props.notice ?? {},
						href: e.target.value.trim() || void 0
					})), z(e, t);
				};
				V(s, (e) => {
					I(r).props.notice?.show === !0 && e(c);
				}), F((e, t) => {
					G(n, "title", e), Vi(i, I(r).props.notice?.show === !0), B(o, ` ${t ?? ""}`);
				}, [() => K("tip.calendar.showNotice"), () => K("calendar.showNotice")]), L("change", i, (e) => a("notice", {
					...I(r).props.notice ?? {},
					show: e.target.checked
				})), z(e, t);
			}, o = /* @__PURE__ */ O(() => rh(I(r).props.design).notice);
			V(n, (e) => {
				I(o) && e(i);
			}), z(e, t);
		}, f = /* @__PURE__ */ O(ne);
		var p = Ev(), m = M(p);
		{
			let e = /* @__PURE__ */ O(() => K("calendar.sources"));
			wg(m, {
				id: "cal-sources",
				get title() {
					return I(e);
				},
				get value() {
					return I(f).sources;
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var h = P(m, 2);
		{
			let e = /* @__PURE__ */ O(() => K("calendar.group.view"));
			wg(h, {
				id: "cal-view",
				get title() {
					return I(e);
				},
				get value() {
					return I(f).view;
				},
				get reset() {
					return I(f).viewReset;
				},
				children: (e, t) => {
					i(e);
				},
				$$slots: { default: !0 }
			});
		}
		var v = P(h, 2);
		{
			let e = /* @__PURE__ */ O(() => K("calendar.group.buttons"));
			wg(v, {
				id: "cal-buttons",
				get title() {
					return I(e);
				},
				get value() {
					return I(f).buttons;
				},
				get reset() {
					return I(f).buttonsReset;
				},
				children: (e, t) => {
					o(e);
				},
				$$slots: { default: !0 }
			});
		}
		var y = P(v, 2);
		{
			let e = /* @__PURE__ */ O(() => K("calendar.group.empty"));
			wg(y, {
				id: "cal-empty",
				get title() {
					return I(e);
				},
				get value() {
					return I(f).empty;
				},
				get reset() {
					return I(f).emptyReset;
				},
				children: (e, t) => {
					l(e);
				},
				$$slots: { default: !0 }
			});
		}
		var b = P(y, 2), S = (e) => {
			{
				let t = /* @__PURE__ */ O(() => K("calendar.group.notice"));
				wg(e, {
					id: "cal-notice",
					get title() {
						return I(t);
					},
					get value() {
						return I(f).notice;
					},
					get reset() {
						return I(f).noticeReset;
					},
					children: (e, t) => {
						d(e);
					},
					$$slots: { default: !0 }
				});
			}
		}, re = /* @__PURE__ */ O(() => rh(I(r).props.design).notice);
		V(b, (e) => {
			I(re) && e(S);
		});
		var ie = P(b, 2), ae = (e) => {
			var t = Tv(), n = N(t, !0);
			F((e, r) => {
				G(t, "title", e), B(n, r);
			}, [() => K("tip.calendar.resetTexts"), () => K("calendar.resetTexts")]), L("click", t, () => a("texts", hh(I(r).props.texts))), z(e, t);
		}, oe = /* @__PURE__ */ O(() => mh(rh(I(r).props.design), I(r).props.texts));
		V(ie, (e) => {
			I(oe) && e(ae);
		}), z(e, p);
	}, oe = (e) => {
		let t = (e) => {
			var t = Yr(), n = M(t), i = (e) => {
				let t = /* @__PURE__ */ O(() => th(I(r).props));
				var n = Yr();
				ui(M(n), 17, () => eh(I(r).props.design).filter((e) => nh(e, I(t))), (e) => e.key, (e, n) => {
					var r = Yr(), i = M(r), a = (e) => {
						var r = uv(), i = j(r);
						U(i);
						var a = P(i);
						D(r), F((e) => {
							Vi(i, I(t)[I(n).key]), B(a, ` ${e ?? ""}`);
						}, [() => K(I(n).labelKey)]), L("change", i, (e) => f(I(n), e.target.checked)), z(e, r);
					}, o = (e) => {
						var r = Dv(), i = j(r), a = P(i);
						U(a), D(r), F((e, o, s) => {
							G(r, "title", e), B(i, `${o ?? ""} `), W(a, I(t)[I(n).key] ?? ""), G(a, "placeholder", s);
						}, [
							() => K("tip.calendar.opt.hours"),
							() => K(I(n).labelKey),
							() => K("calendar.opt.columns.auto")
						]), L("change", a, (e) => f(I(n), e.target.value === "" ? null : Math.max(0, Math.min(24, Math.round(Number(e.target.value)) || 0)))), z(e, r);
					}, s = (e) => {
						var r = Ov(), i = j(r), a = N(i, !0), o = P(i, 2);
						{
							let e = /* @__PURE__ */ O(() => I(n).values.map((e) => [e, p(I(n), e)]));
							J(o, {
								get value() {
									return I(t)[I(n).key];
								},
								get options() {
									return I(e);
								},
								onchange: (e) => f(I(n), e)
							});
						}
						D(r), F((e) => B(a, e), [() => K(I(n).labelKey)]), z(e, r);
					}, c = (e) => {
						{
							let r = /* @__PURE__ */ O(() => K(I(n).labelKey)), i = /* @__PURE__ */ O(() => I(n).values.map((e) => [e, p(I(n), e)]));
							Bl(e, {
								get label() {
									return I(r);
								},
								get value() {
									return I(t)[I(n).key];
								},
								get options() {
									return I(i);
								},
								onchange: (e) => f(I(n), e)
							});
						}
					};
					V(i, (e) => {
						I(n).kind === "switch" ? e(a) : I(n).kind === "hour" ? e(o, 1) : I(n).values.length > 4 ? e(s, 2) : e(c, -1);
					}), z(e, r);
				}), z(e, n);
			}, a = /* @__PURE__ */ O(() => eh(I(r).props.design).length);
			V(n, (e) => {
				I(a) && e(i);
			}), z(e, t);
		}, i = (e) => {
			var t = Yr();
			ui(M(t), 19, () => m(I(s)), (e) => e.section, (e, t, n) => {
				var i = jv(), a = M(i), o = (e) => {
					var n = kv(), r = N(n, !0);
					F((e) => B(r, e), [() => K(`calendar.section.${I(t).section}`)]), z(e, n);
				};
				V(a, (e) => {
					I(n) > 0 && e(o);
				});
				var s = P(a, 2);
				ui(s, 21, () => I(t).slots, (e) => e.key, (e, t) => {
					var n = Av(), i = j(n);
					{
						let e = /* @__PURE__ */ O(() => I(r).props.colors?.[I(t).key] ?? ""), n = /* @__PURE__ */ O(u), a = /* @__PURE__ */ O(() => K(I(t).labelKey));
						rl(i, {
							get value() {
								return I(e);
							},
							get tokens() {
								return I(n);
							},
							allowClear: !0,
							get label() {
								return I(a);
							},
							onchange: (e) => v(I(t).key, e || "")
						});
					}
					var a = N(P(i, 2), !0);
					D(n), F((e, t) => {
						G(n, "title", e), B(a, t);
					}, [() => K("tip.calendar.slot"), () => K(I(t).labelKey)]), z(e, n);
				}), D(s), z(e, i);
			}), z(e, t);
		}, a = (e) => {
			var t = wv(), n = M(t), i = j(n);
			U(i);
			var a = P(i);
			D(n);
			var o = P(n, 2), c = (e) => {
				var t = Ov(), n = j(t), i = N(n, !0), a = P(n, 2);
				{
					let e = /* @__PURE__ */ O(() => I(r).props.stripe?.color ?? ""), t = /* @__PURE__ */ O(u), n = /* @__PURE__ */ O(() => K("calendar.stripeColor"));
					rl(a, {
						get value() {
							return I(e);
						},
						get tokens() {
							return I(t);
						},
						allowClear: !0,
						get label() {
							return I(n);
						},
						onchange: (e) => y({ color: e || void 0 })
					});
				}
				D(t), F((e, n) => {
					G(t, "title", e), B(i, n);
				}, [() => K("tip.calendar.stripeColor"), () => K("calendar.stripeColor")]), z(e, t);
			}, l = /* @__PURE__ */ O(() => uh(I(s), I(r).props.stripe).show);
			V(o, (e) => {
				I(l) && e(c);
			}), F((e, t, r) => {
				G(n, "title", e), Vi(i, t), B(a, ` ${r ?? ""}`);
			}, [
				() => K("tip.calendar.stripe"),
				() => uh(I(s), I(r).props.stripe).show,
				() => K("calendar.stripe")
			]), L("change", i, (e) => y({ show: e.target.checked })), z(e, t);
		}, o = (e) => {
			var t = Mv(), n = M(t);
			{
				let e = /* @__PURE__ */ O(() => Im.map((e) => [e, K(`calendar.field.${e}`)]));
				J(n, {
					get value() {
						return I(sv);
					},
					get options() {
						return I(e);
					},
					onchange: (e) => A(sv, e, !0)
				});
			}
			var r = P(n, 2), i = j(r), a = P(i);
			{
				let e = /* @__PURE__ */ O(() => h().font ?? ""), t = /* @__PURE__ */ O(() => [["", K("common.inherit")], ...Vl.map(([e, t]) => [t, K(e)])]);
				J(a, {
					get value() {
						return I(e);
					},
					get options() {
						return I(t);
					},
					onchange: (e) => b({ font: e || void 0 })
				});
			}
			D(r);
			var o = P(r, 2), s = j(o), c = P(s);
			U(c), D(o);
			var l = P(o, 2);
			{
				let e = /* @__PURE__ */ O(() => K("calendar.fieldWeight")), t = /* @__PURE__ */ O(() => h().bold === !0 ? "bold" : h().bold === !1 ? "normal" : ""), n = /* @__PURE__ */ O(() => [
					["", K("common.inherit")],
					["bold", K("format.bold")],
					["normal", K("calendar.fieldNormal")]
				]);
				Bl(l, {
					get label() {
						return I(e);
					},
					get value() {
						return I(t);
					},
					get options() {
						return I(n);
					},
					onchange: (e) => b({ bold: e === "bold" || e !== "normal" && void 0 })
				});
			}
			var d = P(l, 2), f = j(d);
			let p;
			var m = N(j(f), !0);
			D(f);
			var g = P(f, 2);
			let _;
			var v = N(j(g), !0);
			D(g);
			var y = P(g, 2);
			{
				let e = /* @__PURE__ */ O(() => h().color ?? ""), t = /* @__PURE__ */ O(u), n = /* @__PURE__ */ O(() => K("calendar.fieldColor"));
				rl(y, {
					get value() {
						return I(e);
					},
					get tokens() {
						return I(t);
					},
					allowClear: !0,
					get label() {
						return I(n);
					},
					onchange: (e) => b({ color: e || void 0 })
				});
			}
			D(d), F((e, t, n, r, a, l, u, d, h, y, b) => {
				B(i, `${e ?? ""} `), G(o, "title", t), B(s, `${n ?? ""} `), G(c, "min", dh.min), G(c, "max", dh.max), W(c, r), G(c, "placeholder", a), p = Pi(f, 1, "tbtn", null, p, { active: l }), G(f, "title", u), B(m, d), _ = Pi(g, 1, "tbtn", null, _, { active: h }), G(g, "title", y), B(v, b);
			}, [
				() => K("calendar.fieldFont"),
				() => K("tip.calendar.fieldSize"),
				() => K("calendar.fieldSize"),
				() => h().size ?? "",
				() => K("common.inherit"),
				() => h().italic === !0,
				() => K("format.italic"),
				() => K("format.italicLetter"),
				() => h().underline === !0,
				() => K("calendar.fieldUnderline"),
				() => K("format.underlineLetter")
			]), L("change", c, (e) => b({ size: e.target.value === "" ? void 0 : Math.max(dh.min, Math.min(dh.max, Number(e.target.value) || dh.min)) })), L("click", f, () => b({ italic: !h().italic || void 0 })), L("click", g, () => b({ underline: !h().underline || void 0 })), z(e, t);
		}, s = /* @__PURE__ */ O(() => rh(I(r).props.design)), c = /* @__PURE__ */ O(ne);
		var l = Nv(), d = M(l), g = j(d), _ = j(g), x = N(_, !0), S = N(P(_), !0);
		D(g), eg(P(g, 2), { id: "design" }), D(d);
		var C = P(d, 2);
		{
			let e = /* @__PURE__ */ O(() => K("calendar.section.options"));
			wg(C, {
				id: "cal-opts",
				get title() {
					return I(e);
				},
				get value() {
					return I(c).opts;
				},
				get reset() {
					return I(c).optsReset;
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var w = P(C, 2);
		{
			let e = /* @__PURE__ */ O(() => K("calendar.colors"));
			wg(w, {
				id: "cal-colors",
				get title() {
					return I(e);
				},
				get value() {
					return I(c).colors;
				},
				get reset() {
					return I(c).colorsReset;
				},
				children: (e, t) => {
					i(e);
				},
				$$slots: { default: !0 }
			});
		}
		var T = P(w, 2);
		{
			let e = /* @__PURE__ */ O(() => K("calendar.stripe"));
			wg(T, {
				id: "cal-stripe",
				get title() {
					return I(e);
				},
				get value() {
					return I(c).stripe;
				},
				get reset() {
					return I(c).stripeReset;
				},
				children: (e, t) => {
					a(e);
				},
				$$slots: { default: !0 }
			});
		}
		var E = P(T, 2);
		{
			let e = /* @__PURE__ */ O(() => K("calendar.fieldStyle"));
			wg(E, {
				id: "cal-fields",
				get title() {
					return I(e);
				},
				get value() {
					return I(c).fields;
				},
				get reset() {
					return I(c).fieldsReset;
				},
				children: (e, t) => {
					o(e);
				},
				$$slots: { default: !0 }
			});
		}
		F((e, t, n) => {
			G(g, "title", e), B(x, t), B(S, n);
		}, [
			() => K("tip.calendar.design"),
			() => K("calendar.design"),
			() => K(I(s).labelKey)
		]), L("click", g, function(...e) {
			n.openDesignPicker?.apply(this, e);
		}), z(e, l);
	};
	V(ie, (e) => {
		t.area === "content" ? e(ae) : t.area === "style" && e(oe, 1);
	}), z(e, re), at();
}
Br([
	"click",
	"change",
	"input"
]);
//#endregion
//#region src/menu/families/Form.svelte
var Fv = /* @__PURE__ */ R("<label> <input/></label>"), Iv = /* @__PURE__ */ R("<label> <input/></label> <label> <input/></label>", 1), Lv = /* @__PURE__ */ R("<div class=\"pin-line\"><label> <!></label> <!></div> <!>", 1), Rv = /* @__PURE__ */ R("<input/>"), zv = /* @__PURE__ */ R("<span class=\"nav-line\"><input/> <!> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!>", 1), Bv = /* @__PURE__ */ R("<!> <button class=\"ghost action\"> </button>", 1), Vv = /* @__PURE__ */ R("<!> <!> <!>", 1);
function Hv(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, setBlockProps: o } = n, { groupReset: s } = Wg(() => I(r).props, o), c = /* @__PURE__ */ O(() => (I(r).props.mode ?? "mailto") === "endpoint" ? "endpoint" : "mailto"), l = () => [["mailto", K("form.modeMailto")], ["endpoint", K("form.modeEndpoint")]], u = [
		"text",
		"email",
		"tel",
		"textarea",
		"select",
		"checkbox",
		"radio",
		"date"
	], d = /* @__PURE__ */ new Set(["select", "radio"]), f = () => "f" + [...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(3))].map((e) => e.toString(16).padStart(2, "0")).join("");
	function p(e, t) {
		i(`edit:${I(r).blockId}:field${e}`, (n) => {
			let r = {
				...n.props.fields[e],
				...t
			};
			d.has(r.type) ? r.options ??= [] : delete r.options, n.props.fields[e] = r;
		});
	}
	function m(e, t) {
		p(e, { options: String(t).split(",").map((e) => e.trim()).filter(Boolean) });
	}
	function h() {
		i("form-field", (e) => {
			e.props.fields ??= [], e.props.fields.push({
				id: f(),
				label: K("form.newField"),
				type: "text",
				required: !1
			});
		});
	}
	function g(e) {
		i("form-field", (t) => {
			t.props.fields.splice(e, 1);
		});
	}
	function _(e, t) {
		let n = e + t;
		i("form-field", (t) => {
			n < 0 || n >= t.props.fields.length || ([t.props.fields[e], t.props.fields[n]] = [t.props.fields[n], t.props.fields[e]]);
		});
	}
	var v = Yr(), y = M(v), b = (e) => {
		let t = (e) => {
			var t = Lv(), n = M(t), i = j(n), o = j(i), s = P(o);
			{
				let e = /* @__PURE__ */ O(l);
				J(s, {
					get value() {
						return I(c);
					},
					get options() {
						return I(e);
					},
					onchange: (e) => a("mode", e)
				});
			}
			D(i), eg(P(i, 2), { id: "sendMode" }), D(n);
			var u = P(n, 2), d = (e) => {
				var t = Fv(), n = j(t), i = P(n);
				U(i), D(t), F((e, a, o) => {
					G(t, "title", e), B(n, `${a ?? ""} `), W(i, I(r).props.endpoint ?? ""), G(i, "placeholder", o);
				}, [
					() => K("form.endpointNote"),
					() => K("form.endpoint"),
					() => K("form.endpointPh")
				]), L("change", i, (e) => a("endpoint", e.target.value.trim())), z(e, t);
			}, f = (e) => {
				var t = Iv(), n = M(t), i = j(n), o = P(i);
				U(o), D(n);
				var s = P(n, 2), c = j(s), l = P(c);
				U(l), D(s), F((e, t, n, a) => {
					B(i, `${e ?? ""} `), W(o, I(r).props.recipient ?? ""), G(o, "placeholder", t), B(c, `${n ?? ""} `), W(l, I(r).props.subject ?? ""), G(l, "placeholder", a);
				}, [
					() => K("form.recipient"),
					() => K("form.recipientPh"),
					() => K("form.subject"),
					() => K("form.subjectPh")
				]), L("change", o, (e) => a("recipient", e.target.value.trim())), L("change", l, (e) => a("subject", e.target.value.trim())), z(e, t);
			};
			V(u, (e) => {
				I(c) === "endpoint" ? e(d) : e(f, -1);
			}), F((e, t) => {
				G(i, "title", e), B(o, `${t ?? ""} `);
			}, [() => K("form.modeTitle"), () => K("form.mode")]), z(e, t);
		}, n = (e) => {
			var t = Bv(), n = M(t);
			ui(n, 19, () => I(r).props.fields ?? [], (e, t) => e.id ?? t, (e, t, n) => {
				var i = zv(), a = M(i), o = j(a);
				U(o);
				var s = P(o, 2);
				{
					let e = /* @__PURE__ */ O(() => I(t).type ?? "text"), r = /* @__PURE__ */ O(() => u.map((e) => [e, K(`form.type${e[0].toUpperCase()}${e.slice(1)}`)]));
					J(s, {
						get value() {
							return I(e);
						},
						get options() {
							return I(r);
						},
						onchange: (e) => p(I(n), { type: e })
					});
				}
				var c = P(s, 2), l = j(c);
				H(l, () => q.up, !0), D(l);
				var f = P(l, 2);
				H(f, () => q.down, !0), D(f);
				var h = P(f, 2);
				H(h, () => q.cross, !0), D(h), D(c), D(a);
				var v = P(a, 2), y = j(v);
				U(y);
				var b = P(y);
				D(v);
				var x = P(v, 2), S = (e) => {
					var r = Rv();
					U(r), F((e, t) => {
						W(r, e), G(r, "placeholder", t);
					}, [() => (I(t).options ?? []).join(", "), () => K("form.optionsPh")]), L("change", r, (e) => m(I(n), e.target.value)), z(e, r);
				}, C = /* @__PURE__ */ O(() => d.has(I(t).type));
				V(x, (e) => {
					I(C) && e(S);
				}), F((e, i, a) => {
					W(o, I(t).label), G(o, "placeholder", e), l.disabled = I(n) === 0, f.disabled = I(n) === (I(r).props.fields?.length ?? 0) - 1, G(h, "title", i), Vi(y, I(t).required === !0), B(b, ` ${a ?? ""}`);
				}, [
					() => K("form.fieldNamePh"),
					() => K("form.removeField"),
					() => K("form.required")
				]), L("change", o, (e) => p(I(n), { label: e.target.value.trim() || K("form.fieldFallback") })), L("click", l, () => _(I(n), -1)), L("click", f, () => _(I(n), 1)), L("click", h, () => g(I(n))), L("change", y, (e) => p(I(n), { required: e.target.checked })), z(e, i);
			});
			var i = P(n, 2), a = N(i, !0);
			F((e) => B(a, e), [() => K("form.addField")]), L("click", i, h), z(e, t);
		}, i = (e) => {
			var t = Iv(), n = M(t), i = j(n), o = P(i);
			U(o), D(n);
			var s = P(n, 2), c = j(s), l = P(c);
			U(l), D(s), F((e, t, n, a) => {
				B(i, `${e ?? ""} `), W(o, I(r).props.submitLabel ?? ""), G(o, "placeholder", t), B(c, `${n ?? ""} `), W(l, I(r).props.successText ?? ""), G(l, "placeholder", a);
			}, [
				() => K("lbl.buttonText"),
				() => K("form.sendDefault"),
				() => K("form.receipt"),
				() => K("form.thanksDefault")
			]), L("change", o, (e) => a("submitLabel", e.target.value.trim() || K("form.sendDefault"))), L("change", l, (e) => a("successText", e.target.value.trim() || K("form.thanksDefault"))), z(e, t);
		};
		var o = Vv(), f = M(o);
		{
			let e = /* @__PURE__ */ O(() => K("group.sending")), n = /* @__PURE__ */ O(() => I(c) === "endpoint" ? I(r).props.endpoint || K("form.modeEndpoint") : I(r).props.recipient || K("form.modeMailto")), i = /* @__PURE__ */ O(() => s("form-sending", { mode: "mailto" }));
			wg(f, {
				id: "form-sending",
				get title() {
					return I(e);
				},
				get value() {
					return I(n);
				},
				get reset() {
					return I(i);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var v = P(f, 2);
		{
			let e = /* @__PURE__ */ O(() => K("form.fields")), t = /* @__PURE__ */ O(() => String(I(r).props.fields?.length ?? 0));
			wg(v, {
				id: "form-fields",
				get title() {
					return I(e);
				},
				get value() {
					return I(t);
				},
				children: (e, t) => {
					n(e);
				},
				$$slots: { default: !0 }
			});
		}
		var y = P(v, 2);
		{
			let e = /* @__PURE__ */ O(() => K("group.buttonReceipt")), t = /* @__PURE__ */ O(() => I(r).props.submitLabel || K("form.sendDefault"));
			wg(y, {
				id: "form-receipt",
				get title() {
					return I(e);
				},
				get value() {
					return I(t);
				},
				children: (e, t) => {
					i(e);
				},
				$$slots: { default: !0 }
			});
		}
		z(e, o);
	};
	V(y, (e) => {
		t.area === "content" && e(b);
	}), z(e, v), at();
}
Br(["change", "click"]);
//#endregion
//#region src/menu/families/Faq.svelte
var Uv = /* @__PURE__ */ R("<span class=\"nav-line\"><input/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span>"), Wv = /* @__PURE__ */ R("<!> <button class=\"ghost action\"> </button> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), Gv = /* @__PURE__ */ R("<div class=\"pin-line\"><!> <!></div>"), Kv = /* @__PURE__ */ R("<!> <!>", 1);
function qv(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, setBlockProps: o } = n, { groupReset: s, groupChanged: c } = Wg(() => I(r).props, o), l = /* @__PURE__ */ O(() => I(r).props.variant === "list" ? "list" : "cards"), u = ["cards", "list"];
	function d(e, t) {
		i(`edit:${I(r).blockId}:faq${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function f() {
		i("faq-item", (e) => {
			e.props.items ??= [], e.props.items.push({
				q: K("seed.faq.newQ"),
				a: K("seed.faq.answer")
			});
		});
	}
	function p(e) {
		i("faq-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function m(e, t) {
		let n = e + t;
		i("faq-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	var h = Yr(), g = M(h), _ = (e) => {
		let t = (e) => {
			var t = Wv(), n = M(t);
			ui(n, 17, () => I(r).props.items ?? [], oi, (e, t, n) => {
				var i = Uv(), a = j(i);
				U(a);
				var o = P(a, 2), s = j(o);
				s.disabled = n === 0, H(s, () => q.up, !0), D(s);
				var c = P(s, 2);
				H(c, () => q.down, !0), D(c);
				var l = P(c, 2);
				H(l, () => q.cross, !0), D(l), D(o), D(i), F((e, i) => {
					W(a, I(t).q), G(a, "title", e), c.disabled = n === (I(r).props.items?.length ?? 0) - 1, G(l, "title", i);
				}, [() => K("tip.faq.question"), () => K("tip.faq.remove")]), L("change", a, (e) => d(n, { q: e.target.value })), L("click", s, () => m(n, -1)), L("click", c, () => m(n, 1)), L("click", l, () => p(n)), z(e, i);
			});
			var i = P(n, 2), o = N(i, !0), s = P(i, 2), c = j(s);
			U(c);
			var l = P(c);
			D(s), F((e, t, n, r) => {
				B(o, e), G(s, "title", t), Vi(c, n), B(l, ` ${r ?? ""}`);
			}, [
				() => K("ui.addQuestion"),
				() => K("tip.faq.multi"),
				() => !!I(r).props.multi,
				() => K("lbl.faqMulti")
			]), L("click", i, f), L("change", c, (e) => a("multi", e.target.checked)), z(e, t);
		};
		{
			let n = /* @__PURE__ */ O(() => K("lbl.questions")), i = /* @__PURE__ */ O(() => String(I(r).props.items?.length ?? 0)), a = /* @__PURE__ */ O(() => s("faq-questions", { multi: !1 }));
			wg(e, {
				id: "faq-questions",
				defaultOpen: !0,
				get title() {
					return I(n);
				},
				get value() {
					return I(i);
				},
				get reset() {
					return I(a);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	}, v = (e) => {
		let t = (e) => {
			var t = Gv(), n = j(t);
			{
				let e = /* @__PURE__ */ O(() => K("lbl.variant")), t = /* @__PURE__ */ O(() => u.map((e) => [e, K(`opt.faqVariant.${e}`)]));
				Bl(n, {
					get label() {
						return I(e);
					},
					get value() {
						return I(l);
					},
					get options() {
						return I(t);
					},
					onchange: (e) => a("variant", e)
				});
			}
			eg(P(n, 2), { id: "variant" }), D(t), z(e, t);
		}, n = (e) => {
			Ug(e, {});
		}, r = /* @__PURE__ */ O(() => c({ boxStyle: void 0 }));
		var i = Kv(), o = M(i);
		{
			let e = /* @__PURE__ */ O(() => K("lbl.variant")), n = /* @__PURE__ */ O(() => K(`opt.faqVariant.${I(l)}`)), r = /* @__PURE__ */ O(() => s("faq-variant", { variant: "cards" }));
			wg(o, {
				id: "faq-variant",
				get title() {
					return I(e);
				},
				get value() {
					return I(n);
				},
				get reset() {
					return I(r);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var d = P(o, 2), f = (e) => {
			{
				let t = /* @__PURE__ */ O(() => K("lbl.cardStyle")), i = /* @__PURE__ */ O(() => I(r) ? K("menu.changed", { n: I(r) }) : K("menu.standard")), a = /* @__PURE__ */ O(() => s("faq-card", { boxStyle: void 0 }));
				wg(e, {
					id: "faq-card",
					get title() {
						return I(t);
					},
					get value() {
						return I(i);
					},
					get reset() {
						return I(a);
					},
					children: (e, t) => {
						n(e);
					},
					$$slots: { default: !0 }
				});
			}
		};
		V(d, (e) => {
			I(l) !== "list" && e(f);
		}), z(e, i);
	};
	V(g, (e) => {
		t.area === "content" ? e(_) : t.area === "style" && e(v, 1);
	}), z(e, h), at();
}
Br(["change", "click"]);
//#endregion
//#region src/menu/families/Timeline.svelte
var Jv = /* @__PURE__ */ R("<span class=\"nav-line\"><input class=\"tl-year\"/> <input/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span> <input/>", 1), Yv = /* @__PURE__ */ R("<!> <button class=\"ghost action\"> </button>", 1), Xv = /* @__PURE__ */ R("<div class=\"pin-line\"><label> <!></label> <!></div> <label> <!></label> <label> <!></label>", 1);
function Zv(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, setBlockProps: o, themeSwatches: s } = n, { groupReset: c } = Wg(() => I(r).props, o), l = () => [["left", K("opt.timeline.left")], ["alternating", K("opt.timeline.alternating")]];
	function u(e, t) {
		i(`edit:${I(r).blockId}:tl${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function d() {
		i("tl-item", (e) => {
			e.props.items ??= [], e.props.items.push({
				year: "",
				title: K("seed.timeline.newTitle"),
				text: ""
			});
		});
	}
	function f(e) {
		i("tl-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function p(e, t) {
		let n = e + t;
		i("tl-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	var m = Yr(), h = M(m), g = (e) => {
		let t = (e) => {
			var t = Yv(), n = M(t);
			ui(n, 17, () => I(r).props.items ?? [], oi, (e, t, n) => {
				var i = Jv(), a = M(i), o = j(a);
				U(o);
				var s = P(o, 2);
				U(s);
				var c = P(s, 2), l = j(c);
				l.disabled = n === 0, H(l, () => q.up, !0), D(l);
				var d = P(l, 2);
				H(d, () => q.down, !0), D(d);
				var m = P(d, 2);
				H(m, () => q.cross, !0), D(m), D(c), D(a);
				var h = P(a, 2);
				U(h), F((e, i, a, c, l, u) => {
					W(o, I(t).year), G(o, "placeholder", e), G(o, "title", i), W(s, I(t).title), G(s, "title", a), d.disabled = n === (I(r).props.items?.length ?? 0) - 1, G(m, "title", c), W(h, I(t).text), G(h, "placeholder", l), G(h, "title", u);
				}, [
					() => K("ph.tlYear"),
					() => K("tip.timeline.year"),
					() => K("tip.timeline.title"),
					() => K("tip.timeline.remove"),
					() => K("ph.tlText"),
					() => K("tip.timeline.text")
				]), L("change", o, (e) => u(n, { year: e.target.value })), L("change", s, (e) => u(n, { title: e.target.value })), L("click", l, () => p(n, -1)), L("click", d, () => p(n, 1)), L("click", m, () => f(n)), L("change", h, (e) => u(n, { text: e.target.value })), z(e, i);
			});
			var i = P(n, 2), a = N(i, !0);
			F((e) => B(a, e), [() => K("ui.addTlItem")]), L("click", i, d), z(e, t);
		};
		{
			let n = /* @__PURE__ */ O(() => K("lbl.timelineItems")), i = /* @__PURE__ */ O(() => String(I(r).props.items?.length ?? 0));
			wg(e, {
				id: "tl-events",
				defaultOpen: !0,
				get title() {
					return I(n);
				},
				get value() {
					return I(i);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	}, _ = (e) => {
		let t = (e) => {
			var t = Xv(), n = M(t), i = j(n), o = j(i), c = P(o);
			{
				let e = /* @__PURE__ */ O(() => I(r).props.variant ?? "left"), t = /* @__PURE__ */ O(l);
				J(c, {
					get value() {
						return I(e);
					},
					get options() {
						return I(t);
					},
					onchange: (e) => a("variant", e)
				});
			}
			D(i), eg(P(i, 2), { id: "variant" }), D(n);
			var u = P(n, 2), d = j(u), f = P(d);
			{
				let e = /* @__PURE__ */ O(() => I(r).props.marker ?? "filled"), t = /* @__PURE__ */ O(() => [["filled", K("opt.timeline.filled")], ["ring", K("opt.timeline.ring")]]);
				J(f, {
					get value() {
						return I(e);
					},
					get options() {
						return I(t);
					},
					onchange: (e) => a("marker", e)
				});
			}
			D(u);
			var p = P(u, 2), m = j(p), h = P(m);
			{
				let e = /* @__PURE__ */ O(() => I(r).props.accent ?? "accent"), t = /* @__PURE__ */ O(s);
				rl(h, {
					get value() {
						return I(e);
					},
					get tokens() {
						return I(t);
					},
					onchange: (e) => a("accent", e === "accent" ? null : e)
				});
			}
			D(p), F((e, t, n) => {
				B(o, `${e ?? ""} `), B(d, `${t ?? ""} `), B(m, `${n ?? ""} `);
			}, [
				() => K("lbl.variant"),
				() => K("lbl.timelineMarker"),
				() => K("lbl.color")
			]), z(e, t);
		};
		{
			let n = /* @__PURE__ */ O(() => K("group.appearance")), i = /* @__PURE__ */ O(() => l().find(([e]) => e === (I(r).props.variant ?? "left"))?.[1] ?? ""), a = /* @__PURE__ */ O(() => c("tl-look", {
				variant: "left",
				marker: "filled",
				accent: null
			}));
			wg(e, {
				id: "tl-look",
				defaultOpen: !0,
				get title() {
					return I(n);
				},
				get value() {
					return I(i);
				},
				get reset() {
					return I(a);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	};
	V(h, (e) => {
		t.area === "content" ? e(g) : t.area === "style" && e(_, 1);
	}), z(e, m), at();
}
Br(["change", "click"]);
//#endregion
//#region src/menu/families/Quote.svelte
var Qv = /* @__PURE__ */ R("<label> <input/></label> <label> <input/></label> <label> <input/></label>", 1), $v = /* @__PURE__ */ R("<button class=\"ghost\"> </button>"), ey = /* @__PURE__ */ R("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <!>", 1), ty = /* @__PURE__ */ R("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), ny = /* @__PURE__ */ R("<div class=\"pin-line\"><label> <!></label> <!></div> <!>", 1), ry = /* @__PURE__ */ R("<label> <!></label>"), iy = /* @__PURE__ */ R("<!> <!>", 1);
function ay(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, setBlockProps: o, compressOrTrim: s, imageErrorText: c, setStatus: l, themeSwatches: u } = n, { groupReset: d, groupChanged: f } = Wg(() => I(r).props, o), p = () => [["large", K("opt.quote.large")], ["short", K("opt.quote.short")]], m = /* @__PURE__ */ O(() => {
		let e = (I(r).props.attribution ?? "").trim();
		if (e) return e;
		let t = (I(r).props.text ?? "").trim();
		return t.length > 40 ? `${t.slice(0, 40)}…` : t;
	});
	async function h(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await s(t);
			i(`edit:${I(r).blockId}`, (t) => {
				t.props.image = e.dataUrl;
			});
		} catch (e) {
			l(c(e), "error");
		}
	}
	var g = Yr(), _ = M(g), v = (e) => {
		let t = (e) => {
			var t = Qv(), n = M(t), i = j(n), o = P(i);
			U(o), D(n);
			var s = P(n, 2), c = j(s), l = P(c);
			U(l), D(s);
			var u = P(s, 2), d = j(u), f = P(d);
			U(f), D(u), F((e, t, n) => {
				B(i, `${e ?? ""} `), W(o, I(r).props.text ?? ""), B(c, `${t ?? ""} `), W(l, I(r).props.attribution ?? ""), B(d, `${n ?? ""} `), W(f, I(r).props.role ?? "");
			}, [
				() => K("lbl.quoteText"),
				() => K("lbl.quoteName"),
				() => K("lbl.quoteRole")
			]), L("change", o, (e) => a("text", e.target.value)), L("change", l, (e) => a("attribution", e.target.value)), L("change", f, (e) => a("role", e.target.value)), z(e, t);
		};
		{
			let n = /* @__PURE__ */ O(() => K("group.quote"));
			wg(e, {
				id: "quote-words",
				defaultOpen: !0,
				get title() {
					return I(n);
				},
				get value() {
					return I(m);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	}, y = (e) => {
		let t = (e) => {
			var t = ny(), n = M(t), i = j(n), o = j(i), s = P(o);
			{
				let e = /* @__PURE__ */ O(() => I(r).props.variant ?? "large"), t = /* @__PURE__ */ O(p);
				J(s, {
					get value() {
						return I(e);
					},
					get options() {
						return I(t);
					},
					onchange: (e) => a("variant", e)
				});
			}
			D(i), eg(P(i, 2), { id: "variant" }), D(n);
			var c = P(n, 2), l = (e) => {
				var t = ey(), n = M(t), i = j(n), o = P(i);
				D(n);
				var s = P(n, 2), c = (e) => {
					var t = $v(), n = N(t, !0);
					F((e) => B(n, e), [() => K("ui.quotePortraitRemove")]), L("click", t, () => a("image", "")), z(e, t);
				};
				V(s, (e) => {
					I(r).props.image && e(c);
				}), F((e) => B(i, `${e ?? ""} `), [() => K("ui.quotePortrait")]), L("change", o, h), z(e, t);
			}, u = (e) => {
				var t = ty(), n = j(t);
				U(n);
				var i = P(n);
				D(t), F((e, a) => {
					G(t, "title", e), Vi(n, I(r).props.card === !0), B(i, ` ${a ?? ""}`);
				}, [() => K("tip.quote.card"), () => K("lbl.quoteCard")]), L("change", n, (e) => a("card", e.target.checked)), z(e, t);
			};
			V(c, (e) => {
				I(r).props.variant === "short" ? e(l) : e(u, -1);
			}), F((e) => B(o, `${e ?? ""} `), [() => K("lbl.variant")]), z(e, t);
		}, n = (e) => {
			var t = ry(), n = j(t), i = P(n);
			{
				let e = /* @__PURE__ */ O(() => I(r).props.accent ?? "accent"), t = /* @__PURE__ */ O(u);
				rl(i, {
					get value() {
						return I(e);
					},
					get tokens() {
						return I(t);
					},
					onchange: (e) => a("accent", e === "accent" ? null : e)
				});
			}
			D(t), F((e) => B(n, `${e ?? ""} `), [() => K("lbl.color")]), z(e, t);
		}, i = /* @__PURE__ */ O(() => f({ accent: null }));
		var o = iy(), s = M(o);
		{
			let e = /* @__PURE__ */ O(() => K("lbl.variant")), n = /* @__PURE__ */ O(() => p().find(([e]) => e === (I(r).props.variant ?? "large"))?.[1] ?? ""), i = /* @__PURE__ */ O(() => d("quote-variant", {
				variant: "large",
				card: !1,
				image: ""
			}));
			wg(s, {
				id: "quote-variant",
				get title() {
					return I(e);
				},
				get value() {
					return I(n);
				},
				get reset() {
					return I(i);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var c = P(s, 2);
		{
			let e = /* @__PURE__ */ O(() => K("lbl.color")), t = /* @__PURE__ */ O(() => I(i) ? K("menu.changed", { n: I(i) }) : K("menu.standard")), r = /* @__PURE__ */ O(() => d("quote-colour", { accent: null }));
			wg(c, {
				id: "quote-colour",
				get title() {
					return I(e);
				},
				get value() {
					return I(t);
				},
				get reset() {
					return I(r);
				},
				children: (e, t) => {
					n(e);
				},
				$$slots: { default: !0 }
			});
		}
		z(e, o);
	};
	V(_, (e) => {
		t.area === "content" ? e(v) : t.area === "style" && e(y, 1);
	}), z(e, g), at();
}
Br(["change", "click"]);
//#endregion
//#region src/menu/families/Stats.svelte
var oy = /* @__PURE__ */ R("<label> <input/></label> <label> <input/></label> <label> <input/></label> <label> <input/></label>", 1), sy = /* @__PURE__ */ R("<div class=\"pin-line\"><!> <!></div> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1);
function cy(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { setBlockProp: i, setBlockProps: a } = n, { groupReset: o } = Wg(() => I(r).props, a), s = /* @__PURE__ */ O(() => c.includes(I(r).props.variant) ? I(r).props.variant : "plain"), c = [
		"plain",
		"cards",
		"band"
	];
	var l = Yr(), u = M(l), d = (e) => {
		let t = (e) => {
			var t = oy(), n = M(t), a = j(n), o = P(a);
			U(o), D(n);
			var s = P(n, 2), c = j(s), l = P(c);
			U(l), D(s);
			var u = P(s, 2), d = j(u), f = P(d);
			U(f), D(u);
			var p = P(u, 2), m = j(p), h = P(m);
			U(h), D(p), F((e, t, n, i, s) => {
				B(a, `${e ?? ""} `), W(o, I(r).props.value ?? ""), G(o, "title", t), B(c, `${n ?? ""} `), W(l, I(r).props.prefix ?? ""), B(d, `${i ?? ""} `), W(f, I(r).props.suffix ?? ""), B(m, `${s ?? ""} `), W(h, I(r).props.label ?? "");
			}, [
				() => K("lbl.statValue"),
				() => K("tip.stat.value"),
				() => K("lbl.statPrefix"),
				() => K("lbl.statSuffix"),
				() => K("lbl.statLabel")
			]), L("change", o, (e) => i("value", e.target.value)), L("change", l, (e) => i("prefix", e.target.value)), L("change", f, (e) => i("suffix", e.target.value)), L("change", h, (e) => i("label", e.target.value)), z(e, t);
		};
		{
			let n = /* @__PURE__ */ O(() => K("group.number")), i = /* @__PURE__ */ O(() => `${I(r).props.prefix ?? ""}${I(r).props.value ?? ""}${I(r).props.suffix ?? ""}`.trim());
			wg(e, {
				id: "stat-number",
				defaultOpen: !0,
				get title() {
					return I(n);
				},
				get value() {
					return I(i);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	}, f = (e) => {
		let t = (e) => {
			var t = sy(), n = M(t), a = j(n);
			{
				let e = /* @__PURE__ */ O(() => K("lbl.variant")), t = /* @__PURE__ */ O(() => c.map((e) => [e, K(`opt.statVariant.${e}`)]));
				Bl(a, {
					get label() {
						return I(e);
					},
					get value() {
						return I(s);
					},
					get options() {
						return I(t);
					},
					onchange: (e) => i("variant", e)
				});
			}
			eg(P(a, 2), { id: "variant" }), D(n);
			var o = P(n, 2), l = j(o);
			U(l);
			var u = P(l);
			D(o), F((e, t) => {
				G(o, "title", e), Vi(l, I(r).props.countUp !== !1), B(u, ` ${t ?? ""}`);
			}, [() => K("tip.stat.countUp"), () => K("lbl.statCountUp")]), L("change", l, (e) => i("countUp", e.target.checked)), z(e, t);
		};
		{
			let n = /* @__PURE__ */ O(() => K("group.appearance")), r = /* @__PURE__ */ O(() => K(`opt.statVariant.${I(s)}`)), i = /* @__PURE__ */ O(() => o("stat-look", {
				variant: "plain",
				countUp: !0
			}));
			wg(e, {
				id: "stat-look",
				defaultOpen: !0,
				get title() {
					return I(n);
				},
				get value() {
					return I(r);
				},
				get reset() {
					return I(i);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	};
	V(u, (e) => {
		t.area === "content" ? e(d) : t.area === "style" && e(f, 1);
	}), z(e, l), at();
}
Br(["change"]);
//#endregion
//#region src/menu/families/Table.svelte
var ly = /* @__PURE__ */ R("<span class=\"toolbar-row\"><button class=\"ghost\"> </button> <button class=\"ghost\"> </button></span> <span class=\"toolbar-row\"><button class=\"ghost\"> </button> <button class=\"ghost\"> </button></span> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), uy = /* @__PURE__ */ R("<div class=\"pin-line\"><label> <!></label> <!></div> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1);
function dy(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, setBlockProps: o } = n, { groupReset: s } = Wg(() => I(r).props, o), c = /* @__PURE__ */ O(() => {
		let e = Array.isArray(I(r).props.rows) ? I(r).props.rows : [], t = Math.max(1, ...e.map((e) => Array.isArray(e) ? e.length : 1), 1);
		return `${Math.max(1, e.length)} × ${t}`;
	}), l = () => [
		["rows", K("opt.table.rows")],
		["grid", K("opt.table.grid")],
		["none", K("common.none")]
	];
	function u(e, t) {
		i(`edit:${I(r).blockId}:table-form`, (n) => {
			let r = (Array.isArray(n.props.rows) && n.props.rows.length ? n.props.rows : [[""]]).map((e) => Array.isArray(e) ? e.map((e) => String(e ?? "")) : [""]), i = Math.max(1, ...r.map((e) => e.length));
			r = r.map((e) => [...e, ...Array(i - e.length).fill("")]), e > 0 ? r.push(Array(i).fill("")) : e < 0 && r.length > 1 && r.pop(), t > 0 ? r = r.map((e) => [...e, ""]) : t < 0 && i > 1 && (r = r.map((e) => e.slice(0, i - 1))), n.props.rows = r;
		});
	}
	var d = Yr(), f = M(d), p = (e) => {
		let t = (e) => {
			var t = ly(), n = M(t), i = j(n), o = N(i, !0), s = P(i, 2), c = N(s, !0);
			D(n);
			var l = P(n, 2), d = j(l), f = N(d, !0), p = P(d, 2), m = N(p, !0);
			D(l);
			var h = P(l, 2), g = j(h);
			U(g);
			var _ = P(g);
			D(h), F((e, t, n, i, a, s) => {
				B(o, e), B(c, t), B(f, n), B(m, i), G(h, "title", a), Vi(g, I(r).props.header !== !1), B(_, ` ${s ?? ""}`);
			}, [
				() => K("ui.addRow"),
				() => K("ui.removeRow"),
				() => K("ui.addColumn"),
				() => K("ui.removeColumn"),
				() => K("tip.table.header"),
				() => K("lbl.tableHeader")
			]), L("click", i, () => u(1, 0)), L("click", s, () => u(-1, 0)), L("click", d, () => u(0, 1)), L("click", p, () => u(0, -1)), L("change", g, (e) => a("header", e.target.checked)), z(e, t);
		};
		{
			let n = /* @__PURE__ */ O(() => K("group.rowsColumns")), r = /* @__PURE__ */ O(() => s("table-shape", { header: !0 }));
			wg(e, {
				id: "table-shape",
				defaultOpen: !0,
				get title() {
					return I(n);
				},
				get value() {
					return I(c);
				},
				get reset() {
					return I(r);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	}, m = (e) => {
		let t = (e) => {
			var t = uy(), n = M(t), i = j(n), o = j(i), s = P(o);
			{
				let e = /* @__PURE__ */ O(() => I(r).props.lines ?? "rows"), t = /* @__PURE__ */ O(l);
				J(s, {
					get value() {
						return I(e);
					},
					get options() {
						return I(t);
					},
					onchange: (e) => a("lines", e)
				});
			}
			D(i), eg(P(i, 2), { id: "tableLines" }), D(n);
			var c = P(n, 2), u = j(c);
			U(u);
			var d = P(u);
			D(c), F((e, t, n) => {
				B(o, `${e ?? ""} `), Vi(u, t), B(d, ` ${n ?? ""}`);
			}, [
				() => K("lbl.tableLines"),
				() => !!I(r).props.striped,
				() => K("lbl.tableStriped")
			]), L("change", u, (e) => a("striped", e.target.checked)), z(e, t);
		};
		{
			let n = /* @__PURE__ */ O(() => K("lbl.tableLines")), i = /* @__PURE__ */ O(() => l().find(([e]) => e === (I(r).props.lines ?? "rows"))?.[1] ?? ""), a = /* @__PURE__ */ O(() => s("table-lines", {
				lines: "rows",
				striped: !1
			}));
			wg(e, {
				id: "table-lines",
				defaultOpen: !0,
				get title() {
					return I(n);
				},
				get value() {
					return I(i);
				},
				get reset() {
					return I(a);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	};
	V(f, (e) => {
		t.area === "content" ? e(p) : t.area === "style" && e(m, 1);
	}), z(e, d), at();
}
Br(["click", "change"]);
//#endregion
//#region src/menu/families/Share.svelte
var fy = /* @__PURE__ */ R("<img alt=\"\"/>"), py = /* @__PURE__ */ R("<label class=\"gridmenu-snap link-pick\"><input type=\"checkbox\"/> <span class=\"footer-soc-preview\" aria-hidden=\"true\"><!></span> </label>"), my = /* @__PURE__ */ R("<!> <button class=\"ghost action\"> </button>", 1), hy = /* @__PURE__ */ R("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <span class=\"mini-label\"> </span> <!>", 1), gy = /* @__PURE__ */ R("<div class=\"pin-line\"><label> <!></label> <!></div> <label> <input type=\"number\" min=\"24\" max=\"64\"/></label> <label> <!></label>", 1);
function _y(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, setBlockProps: o, themeSwatches: s, siteLinks: c } = n, l = /* @__PURE__ */ O(() => I(r).props.useSite !== !1);
	function u(e, t) {
		i(`edit:${I(r).blockId}:hidden`, (n) => {
			let r = new Set(Array.isArray(n.props.hidden) ? n.props.hidden : []);
			t ? r.delete(e) : r.add(e), n.props.hidden = [...r];
		});
	}
	function d(e) {
		i(`edit:${I(r).blockId}:links`, (t) => {
			t.props.links ??= [], e(t.props.links);
		});
	}
	let { groupReset: f } = Wg(() => I(r).props, o), p = () => [["icons", K("opt.share.icons")], ["labels", K("opt.share.labels")]];
	var m = Yr(), h = M(m), g = (e) => {
		let t = (e) => {
			var t = hy(), i = M(t), o = j(i);
			U(o);
			var s = P(o);
			D(i);
			var f = P(i, 2), p = (e) => {
				var t = my(), i = M(t);
				ui(i, 17, c, (e) => e.id, (e, t) => {
					var n = py(), i = j(n);
					U(i);
					var a = P(i, 2), o = j(a), s = (e) => {
						var n = fy();
						F(() => G(n, "src", I(t).image)), z(e, n);
					}, c = (e) => {
						var n = Yr();
						H(M(n), () => Zs(I(t).icon) || ""), z(e, n);
					};
					V(o, (e) => {
						I(t).image ? e(s) : e(c, -1);
					}), D(a);
					var l = P(a);
					D(n), F((e) => {
						Vi(i, e), B(l, ` ${(I(t).label || Ys[I(t).icon]?.label || I(t).url) ?? ""}`);
					}, [() => !(I(r).props.hidden ?? []).includes(I(t).id)]), L("change", i, (e) => u(I(t).id, e.target.checked)), z(e, n);
				});
				var a = P(i, 2), o = N(a, !0);
				F((e) => B(o, e), [() => K("ui.editSiteLinks")]), L("click", a, () => {
					n.siteLinksOpen = !0, n.openPanel("site");
				}), z(e, t);
			};
			V(f, (e) => {
				I(l) && e(p);
			});
			var m = P(f, 2), h = N(m, !0), g = P(m, 2);
			{
				let e = /* @__PURE__ */ O(() => I(r).props.links ?? []);
				lm(g, {
					get links() {
						return I(e);
					},
					onchange: (e, t) => d((n) => {
						n[e] = {
							...n[e],
							...t
						};
					}),
					onadd: () => d((e) => e.push({
						id: es("link"),
						icon: "globe",
						label: "",
						url: ""
					})),
					onremove: (e) => d((t) => t.splice(e, 1)),
					onmove: (e, t) => d((n) => {
						let r = e + t;
						r >= 0 && r < n.length && ([n[e], n[r]] = [n[r], n[e]]);
					})
				});
			}
			F((e, t, n) => {
				G(i, "title", e), Vi(o, I(l)), B(s, ` ${t ?? ""}`), B(h, n);
			}, [
				() => K("tip.share.useSite"),
				() => K("lbl.useSiteLinks"),
				() => K("lbl.ownLinks")
			]), L("change", o, (e) => a("useSite", e.target.checked)), z(e, t);
		};
		{
			let n = /* @__PURE__ */ O(() => K("group.siteLinks")), i = /* @__PURE__ */ O(() => String((I(l) ? c().filter((e) => !(I(r).props.hidden ?? []).includes(e.id)).length : 0) + (I(r).props.links ?? []).length)), a = /* @__PURE__ */ O(() => f("share-services", {
				useSite: !0,
				hidden: []
			}));
			wg(e, {
				id: "share-services",
				defaultOpen: !0,
				get title() {
					return I(n);
				},
				get value() {
					return I(i);
				},
				get reset() {
					return I(a);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	}, _ = (e) => {
		let t = (e) => {
			var t = gy(), n = M(t), i = j(n), o = j(i), c = P(o);
			{
				let e = /* @__PURE__ */ O(() => I(r).props.variant ?? "icons"), t = /* @__PURE__ */ O(p);
				J(c, {
					get value() {
						return I(e);
					},
					get options() {
						return I(t);
					},
					onchange: (e) => a("variant", e)
				});
			}
			D(i), eg(P(i, 2), { id: "variant" }), D(n);
			var l = P(n, 2), u = j(l), d = P(u);
			U(d), D(l);
			var f = P(l, 2), m = j(f), h = P(m);
			{
				let e = /* @__PURE__ */ O(() => I(r).props.color || "accent"), t = /* @__PURE__ */ O(s);
				rl(h, {
					get value() {
						return I(e);
					},
					get tokens() {
						return I(t);
					},
					onchange: (e) => a("color", e === "accent" ? "" : e)
				});
			}
			D(f), F((e, t, n) => {
				B(o, `${e ?? ""} `), B(u, `${t ?? ""} `), W(d, I(r).props.size ?? 38), B(m, `${n ?? ""} `);
			}, [
				() => K("lbl.variant"),
				() => K("lbl.size"),
				() => K("lbl.color")
			]), L("change", d, (e) => a("size", Number(e.target.value) || 38)), z(e, t);
		};
		{
			let n = /* @__PURE__ */ O(() => K("group.appearance")), i = /* @__PURE__ */ O(() => p().find(([e]) => e === (I(r).props.variant ?? "icons"))?.[1] ?? ""), a = /* @__PURE__ */ O(() => f("share-look", {
				variant: "icons",
				size: 38,
				color: ""
			}));
			wg(e, {
				id: "share-look",
				defaultOpen: !0,
				get title() {
					return I(n);
				},
				get value() {
					return I(i);
				},
				get reset() {
					return I(a);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	};
	V(h, (e) => {
		t.area === "content" ? e(g) : t.area === "style" && e(_, 1);
	}), z(e, m), at();
}
Br(["change", "click"]);
//#endregion
//#region src/menu/families/Countdown.svelte
var vy = /* @__PURE__ */ R("<label> <input type=\"datetime-local\"/></label> <label> <input/></label>", 1), yy = /* @__PURE__ */ R("<label> <!></label> <div class=\"pin-line\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div>", 1);
function by(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { setBlockProp: i, setBlockProps: a } = n, { groupReset: o } = Wg(() => I(r).props, a), s = () => [["boxes", K("opt.countdown.boxes")], ["plain", K("opt.countdown.plain")]];
	var c = Yr(), l = M(c), u = (e) => {
		let t = (e) => {
			var t = vy(), n = M(t), a = j(n), o = P(a);
			U(o), D(n);
			var s = P(n, 2), c = j(s), l = P(c);
			U(l), D(s), F((e, t, n) => {
				B(a, `${e ?? ""} `), W(o, I(r).props.target ?? ""), G(s, "title", t), B(c, `${n ?? ""} `), W(l, I(r).props.doneText ?? "");
			}, [
				() => K("lbl.countdownTarget"),
				() => K("tip.countdown.done"),
				() => K("lbl.countdownDone")
			]), L("change", o, (e) => i("target", e.target.value)), L("change", l, (e) => i("doneText", e.target.value)), z(e, t);
		};
		{
			let n = /* @__PURE__ */ O(() => K("group.target")), i = /* @__PURE__ */ O(() => I(r).props.target ? I(r).props.target.replace("T", " ") : K("common.none"));
			wg(e, {
				id: "countdown-target",
				defaultOpen: !0,
				get title() {
					return I(n);
				},
				get value() {
					return I(i);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	}, d = (e) => {
		let t = (e) => {
			var t = yy(), n = M(t), a = j(n), o = P(a);
			{
				let e = /* @__PURE__ */ O(() => I(r).props.variant ?? "boxes"), t = /* @__PURE__ */ O(s);
				J(o, {
					get value() {
						return I(e);
					},
					get options() {
						return I(t);
					},
					onchange: (e) => i("variant", e)
				});
			}
			D(n);
			var c = P(n, 2), l = j(c), u = j(l);
			U(u);
			var d = P(u);
			D(l), eg(P(l, 2), { id: "seconds" }), D(c), F((e, t) => {
				B(a, `${e ?? ""} `), Vi(u, I(r).props.showSeconds !== !1), B(d, ` ${t ?? ""}`);
			}, [() => K("lbl.variant"), () => K("lbl.countdownSeconds")]), L("change", u, (e) => i("showSeconds", e.target.checked)), z(e, t);
		};
		{
			let n = /* @__PURE__ */ O(() => K("group.appearance")), i = /* @__PURE__ */ O(() => s().find(([e]) => e === (I(r).props.variant ?? "boxes"))?.[1] ?? ""), a = /* @__PURE__ */ O(() => o("countdown-look", {
				variant: "boxes",
				showSeconds: !0
			}));
			wg(e, {
				id: "countdown-look",
				defaultOpen: !0,
				get title() {
					return I(n);
				},
				get value() {
					return I(i);
				},
				get reset() {
					return I(a);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	};
	V(l, (e) => {
		t.area === "content" ? e(u) : t.area === "style" && e(d, 1);
	}), z(e, c), at();
}
Br(["change"]);
//#endregion
//#region src/menu/families/Audio.svelte
var xy = /* @__PURE__ */ R("<button class=\"ghost\"> </button>"), Sy = /* @__PURE__ */ R("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"audio/*\"/></label> <!> <label> <input/></label>", 1), Cy = /* @__PURE__ */ R("<div class=\"pin-line\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div>"), wy = /* @__PURE__ */ R("<!> <!>", 1);
function Ty(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { setBlockProp: i, setBlockProps: a, setStatus: o } = n, { groupReset: s } = Wg(() => I(r).props, a);
	function c(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		let n = new FileReader();
		n.onload = () => {
			i("src", String(n.result ?? "")), t.size > 4e5 && o(K("status.audioLarge", { kb: Math.round(t.size / 1024) }), "error");
		}, n.onerror = () => o(K("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	var l = Yr(), u = M(l), d = (e) => {
		let t = (e) => {
			var t = Sy(), n = M(t), a = j(n), o = P(a);
			D(n);
			var s = P(n, 2), l = (e) => {
				var t = xy(), n = N(t, !0);
				F((e) => B(n, e), [() => K("ui.removeAudio")]), L("click", t, () => i("src", "")), z(e, t);
			};
			V(s, (e) => {
				I(r).props.src && e(l);
			});
			var u = P(s, 2), d = j(u), f = P(d);
			U(f), D(u), F((e, t, i) => {
				G(n, "title", e), B(a, `${t ?? ""} `), B(d, `${i ?? ""} `), W(f, I(r).props.title ?? "");
			}, [
				() => K("tip.blocks.audioFile"),
				() => K("ui.chooseAudio"),
				() => K("lbl.audioTitle")
			]), L("change", o, c), L("change", f, (e) => i("title", e.target.value)), z(e, t);
		}, n = (e) => {
			var t = Cy(), n = j(t), a = j(n);
			U(a);
			var o = P(a);
			D(n), eg(P(n, 2), { id: "loop" }), D(t), F((e, t) => {
				Vi(a, e), B(o, ` ${t ?? ""}`);
			}, [() => !!I(r).props.loop, () => K("lbl.audioLoop")]), L("change", a, (e) => i("loop", e.target.checked)), z(e, t);
		};
		var a = wy(), o = M(a);
		{
			let e = /* @__PURE__ */ O(() => K("group.audioFile")), n = /* @__PURE__ */ O(() => I(r).props.title || (I(r).props.src ? K("blocks.audio") : K("common.none")));
			wg(o, {
				id: "audio-file",
				get title() {
					return I(e);
				},
				get value() {
					return I(n);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var l = P(o, 2);
		{
			let e = /* @__PURE__ */ O(() => K("group.playback")), t = /* @__PURE__ */ O(() => I(r).props.loop ? K("lbl.audioLoop") : K("menu.standard")), i = /* @__PURE__ */ O(() => s("audio-playback", { loop: !1 }));
			wg(l, {
				id: "audio-playback",
				get title() {
					return I(e);
				},
				get value() {
					return I(t);
				},
				get reset() {
					return I(i);
				},
				children: (e, t) => {
					n(e);
				},
				$$slots: { default: !0 }
			});
		}
		z(e, a);
	};
	V(u, (e) => {
		t.area === "content" && e(d);
	}), z(e, l), at();
}
Br(["change", "click"]);
//#endregion
//#region src/menu/families/Collection.svelte
var Ey = /* @__PURE__ */ R("<label> <!></label> <div class=\"pin-line\"><label> <input type=\"number\" min=\"0\" max=\"100\"/></label> <!></div> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), Dy = /* @__PURE__ */ R("<div class=\"pin-line\"><label> <!></label> <!></div>");
function Oy(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), i = /* @__PURE__ */ O(() => n.collectionIds), a = /* @__PURE__ */ O(() => n.collectionsView), { setBlockProp: o, setBlockProps: s } = n, { groupReset: c } = Wg(() => I(r).props, s), l = () => [
		["cards", K("opt.collectionView.cards")],
		["list", K("opt.collectionView.list")],
		["archive", K("opt.collectionView.archive")]
	];
	var u = Yr(), d = M(u), f = (e) => {
		let t = (e) => {
			var t = Ey(), n = M(t), s = j(n), c = P(s);
			{
				let e = /* @__PURE__ */ O(() => I(r).props.collection ?? ""), t = /* @__PURE__ */ O(() => [["", K("common.choose")], ...I(i).map((e) => [e, I(a)[e]?.name ?? e])]);
				J(c, {
					get value() {
						return I(e);
					},
					get options() {
						return I(t);
					},
					onchange: (e) => o("collection", e || null)
				});
			}
			D(n);
			var l = P(n, 2), u = j(l), d = j(u), f = P(d);
			U(f), D(u), eg(P(u, 2), { id: "limit" }), D(l);
			var p = P(l, 2), m = j(p);
			U(m);
			var h = P(m);
			D(p), F((e, t, i, a, o) => {
				G(n, "title", e), B(s, `${t ?? ""} `), G(u, "title", i), B(d, `${a ?? ""} `), W(f, I(r).props.limit ?? 6), Vi(m, I(r).props.newestFirst !== !1), B(h, ` ${o ?? ""}`);
			}, [
				() => K("tip.collection.source"),
				() => K("blocks.collection"),
				() => K("tip.collection.limit"),
				() => K("lbl.maxCount"),
				() => K("lbl.newestFirst")
			]), L("change", f, (e) => o("limit", Number(e.target.value))), L("change", m, (e) => o("newestFirst", e.target.checked)), z(e, t);
		};
		{
			let n = /* @__PURE__ */ O(() => K("group.source")), i = /* @__PURE__ */ O(() => I(a)[I(r).props.collection]?.name ?? K("common.choose")), o = /* @__PURE__ */ O(() => c("collection-source", {
				limit: 6,
				newestFirst: !0
			}));
			wg(e, {
				id: "collection-source",
				defaultOpen: !0,
				get title() {
					return I(n);
				},
				get value() {
					return I(i);
				},
				get reset() {
					return I(o);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	}, p = (e) => {
		let t = (e) => {
			var t = Dy(), n = j(t), i = j(n), a = P(i);
			{
				let e = /* @__PURE__ */ O(() => I(r).props.view ?? "cards"), t = /* @__PURE__ */ O(l);
				J(a, {
					get value() {
						return I(e);
					},
					get options() {
						return I(t);
					},
					onchange: (e) => o("view", e)
				});
			}
			D(n), eg(P(n, 2), { id: "collectionView" }), D(t), F((e) => B(i, `${e ?? ""} `), [() => K("lbl.view")]), z(e, t);
		};
		{
			let n = /* @__PURE__ */ O(() => K("lbl.view")), i = /* @__PURE__ */ O(() => l().find(([e]) => e === (I(r).props.view ?? "cards"))?.[1] ?? ""), a = /* @__PURE__ */ O(() => c("collection-view", { view: "cards" }));
			wg(e, {
				id: "collection-view",
				defaultOpen: !0,
				get title() {
					return I(n);
				},
				get value() {
					return I(i);
				},
				get reset() {
					return I(a);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	};
	V(d, (e) => {
		t.area === "content" ? e(f) : t.area === "style" && e(p, 1);
	}), z(e, u), at();
}
Br(["change"]);
//#endregion
//#region src/menu/families/Product.svelte
var ky = /* @__PURE__ */ R("<span class=\"toolbar-row\"><button class=\"ghost action\"> </button> <button class=\"ghost action\"> </button></span>"), Ay = /* @__PURE__ */ R("<button class=\"ghost action\"> </button>"), jy = /* @__PURE__ */ R("<label> <!></label> <!> <label> <input type=\"number\" min=\"0\" max=\"100\"/></label>", 1), My = /* @__PURE__ */ R("<label> <input/></label>"), Ny = /* @__PURE__ */ R("<!> <!>", 1), Py = /* @__PURE__ */ R("<div class=\"pin-line\"><label> <input type=\"number\" min=\"0\" max=\"6\"/></label> <!></div>");
function Fy(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), i = /* @__PURE__ */ O(() => n.collectionIds), a = /* @__PURE__ */ O(() => n.collectionsView), { setBlockProp: o, setBlockProps: s, addCollectionEntry: c, createCatalogForBlock: l } = n, { groupReset: u } = Wg(() => I(r).props, s);
	var d = Yr(), f = M(d), p = (e) => {
		let t = (e) => {
			var t = jy(), s = M(t), u = j(s), d = P(u);
			{
				let e = /* @__PURE__ */ O(() => I(r).props.collection ?? ""), t = /* @__PURE__ */ O(() => [["", K("common.choose")], ...I(i).filter((e) => I(a)[e]?.kind === "products").map((e) => [e, I(a)[e]?.name ?? e])]);
				J(d, {
					get value() {
						return I(e);
					},
					get options() {
						return I(t);
					},
					onchange: (e) => o("collection", e || null)
				});
			}
			D(s);
			var f = P(s, 2), p = (e) => {
				var t = ky(), i = j(t), a = N(i, !0), o = P(i, 2), s = N(o, !0);
				D(t), F((e, t, n, r) => {
					G(i, "title", e), B(a, t), G(o, "title", n), B(s, r);
				}, [
					() => K("tip.product.addProduct"),
					() => K("ui.addProduct"),
					() => K("tip.product.editCatalog"),
					() => K("ui.editCatalog")
				]), L("click", i, () => c(I(r).props.collection)), L("click", o, () => n.openCollection(I(r).props.collection)), z(e, t);
			}, m = (e) => {
				var t = Ay(), n = N(t, !0);
				F((e, r) => {
					G(t, "title", e), B(n, r);
				}, [() => K("tip.product.createCatalog"), () => K("ui.createCatalog")]), L("click", t, l), z(e, t);
			}, h = /* @__PURE__ */ O(() => !I(i).some((e) => I(a)[e]?.kind === "products"));
			V(f, (e) => {
				I(r).props.collection && I(a)[I(r).props.collection]?.kind === "products" ? e(p) : I(h) && e(m, 1);
			});
			var g = P(f, 2), _ = j(g), v = P(_);
			U(v), D(g), F((e, t, n, i) => {
				G(s, "title", e), B(u, `${t ?? ""} `), G(g, "title", n), B(_, `${i ?? ""} `), W(v, I(r).props.limit ?? 0);
			}, [
				() => K("tip.product.source"),
				() => K("blocks.collection"),
				() => K("tip.collection.limit"),
				() => K("lbl.maxCount")
			]), L("change", v, (e) => o("limit", Number(e.target.value))), z(e, t);
		}, s = (e) => {
			var t = My(), n = j(t), i = P(n);
			U(i), D(t), F((e, a) => {
				G(t, "title", e), B(n, `${a ?? ""} `), W(i, I(r).props.currency ?? "kr");
			}, [() => K("tip.product.currency"), () => K("lbl.currency")]), L("change", i, (e) => o("currency", e.target.value)), z(e, t);
		};
		var d = Ny(), f = M(d);
		{
			let e = /* @__PURE__ */ O(() => K("group.catalog")), n = /* @__PURE__ */ O(() => I(a)[I(r).props.collection]?.name ?? K("common.choose")), i = /* @__PURE__ */ O(() => u("product-catalog", { limit: 0 }));
			wg(f, {
				id: "product-catalog",
				get title() {
					return I(e);
				},
				get value() {
					return I(n);
				},
				get reset() {
					return I(i);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var p = P(f, 2);
		{
			let e = /* @__PURE__ */ O(() => K("lbl.price")), t = /* @__PURE__ */ O(() => I(r).props.currency ?? "kr"), n = /* @__PURE__ */ O(() => u("product-price", { currency: "kr" }));
			wg(p, {
				id: "product-price",
				get title() {
					return I(e);
				},
				get value() {
					return I(t);
				},
				get reset() {
					return I(n);
				},
				children: (e, t) => {
					s(e);
				},
				$$slots: { default: !0 }
			});
		}
		z(e, d);
	}, m = (e) => {
		let t = (e) => {
			var t = Py(), n = j(t), i = j(n), a = P(i);
			U(a), D(n), eg(P(n, 2), { id: "columns" }), D(t), F((e, t) => {
				G(n, "title", e), B(i, `${t ?? ""} `), W(a, I(r).props.columns ?? 0);
			}, [() => K("tip.product.columns"), () => K("lbl.columns")]), L("change", a, (e) => o("columns", Number(e.target.value))), z(e, t);
		};
		{
			let n = /* @__PURE__ */ O(() => K("group.grid")), i = /* @__PURE__ */ O(() => I(r).props.columns ? String(I(r).props.columns) : K("menu.standard")), a = /* @__PURE__ */ O(() => u("product-grid", { columns: 0 }));
			wg(e, {
				id: "product-grid",
				defaultOpen: !0,
				get title() {
					return I(n);
				},
				get value() {
					return I(i);
				},
				get reset() {
					return I(a);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	};
	V(f, (e) => {
		t.area === "content" ? e(p) : t.area === "style" && e(m, 1);
	}), z(e, d), at();
}
Br(["click", "change"]);
//#endregion
//#region src/menu/families/Cart.svelte
var Iy = /* @__PURE__ */ R("<label> <!></label> <label> <input/></label>", 1), Ly = /* @__PURE__ */ R("<div class=\"pin-line\"><label> <!></label> <!></div>");
function Ry(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), i = /* @__PURE__ */ O(() => n.siteDraft), { setBlockProp: a, setBlockProps: o } = n, { groupReset: s } = Wg(() => I(r).props, o), c = () => [["button", K("opt.cart.button")], ["icon", K("opt.cart.icon")]];
	var l = Yr(), u = M(l), d = (e) => {
		let t = (e) => {
			var t = Iy(), n = M(t), o = j(n), s = P(o);
			{
				let e = /* @__PURE__ */ O(() => I(r).props.href ?? ""), t = /* @__PURE__ */ O(() => [["", K("common.none")], ...I(i).pages.map((e) => [e.path, e.title])]);
				J(s, {
					get value() {
						return I(e);
					},
					get options() {
						return I(t);
					},
					onchange: (e) => a("href", e)
				});
			}
			D(n);
			var c = P(n, 2), l = j(c), u = P(l);
			U(u), D(c), F((e, t, i, a) => {
				G(n, "title", e), B(o, `${t ?? ""} `), G(c, "title", i), B(l, `${a ?? ""} `), W(u, I(r).props.currency ?? "kr");
			}, [
				() => K("tip.cart.checkout"),
				() => K("lbl.checkoutPage"),
				() => K("tip.product.currency"),
				() => K("lbl.currency")
			]), L("change", u, (e) => a("currency", e.target.value)), z(e, t);
		};
		{
			let n = /* @__PURE__ */ O(() => K("group.checkout")), a = /* @__PURE__ */ O(() => I(i).pages.find((e) => e.path === I(r).props.href)?.title ?? K("common.none")), o = /* @__PURE__ */ O(() => s("cart-checkout", { currency: "kr" }));
			wg(e, {
				id: "cart-checkout",
				defaultOpen: !0,
				get title() {
					return I(n);
				},
				get value() {
					return I(a);
				},
				get reset() {
					return I(o);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	}, f = (e) => {
		let t = (e) => {
			var t = Ly(), n = j(t), i = j(n), o = P(i);
			{
				let e = /* @__PURE__ */ O(() => I(r).props.variant ?? "button"), t = /* @__PURE__ */ O(c);
				J(o, {
					get value() {
						return I(e);
					},
					get options() {
						return I(t);
					},
					onchange: (e) => a("variant", e)
				});
			}
			D(n), eg(P(n, 2), { id: "cartView" }), D(t), F((e) => B(i, `${e ?? ""} `), [() => K("lbl.view")]), z(e, t);
		};
		{
			let n = /* @__PURE__ */ O(() => K("lbl.view")), i = /* @__PURE__ */ O(() => c().find(([e]) => e === (I(r).props.variant ?? "button"))?.[1] ?? ""), a = /* @__PURE__ */ O(() => s("cart-view", { variant: "button" }));
			wg(e, {
				id: "cart-view",
				defaultOpen: !0,
				get title() {
					return I(n);
				},
				get value() {
					return I(i);
				},
				get reset() {
					return I(a);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	};
	V(u, (e) => {
		t.area === "content" ? e(d) : t.area === "style" && e(f, 1);
	}), z(e, l), at();
}
Br(["change"]);
//#endregion
//#region src/menu/families/Checkout.svelte
var zy = /* @__PURE__ */ R("<label> <input type=\"email\"/></label> <label> <input type=\"url\"/></label> <label> <input/></label>", 1), By = /* @__PURE__ */ R("<label> <input/></label> <div class=\"pin-line\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div>", 1), Vy = /* @__PURE__ */ R("<!> <!>", 1);
function Hy(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { setBlockProp: i, setBlockProps: a } = n, { groupReset: o } = Wg(() => I(r).props, a);
	var s = Yr(), c = M(s), l = (e) => {
		let t = (e) => {
			var t = zy(), n = M(t), a = j(n), o = P(a);
			U(o), D(n);
			var s = P(n, 2), c = j(s), l = P(c);
			U(l), D(s);
			var u = P(s, 2), d = j(u), f = P(d);
			U(f), D(u), F((e, t, i, p, m, h) => {
				G(n, "title", e), B(a, `${t ?? ""} `), W(o, I(r).props.recipient ?? ""), G(s, "title", i), B(c, `${p ?? ""} `), W(l, I(r).props.endpoint ?? ""), G(u, "title", m), B(d, `${h ?? ""} `), W(f, I(r).props.currency ?? "kr");
			}, [
				() => K("tip.checkout.recipient"),
				() => K("lbl.recipientEmail"),
				() => K("tip.checkout.endpoint"),
				() => K("lbl.endpointUrl"),
				() => K("tip.product.currency"),
				() => K("lbl.currency")
			]), L("change", o, (e) => i("recipient", e.target.value.trim())), L("change", l, (e) => i("endpoint", e.target.value.trim())), L("change", f, (e) => i("currency", e.target.value)), z(e, t);
		}, n = (e) => {
			var t = By(), n = M(t), a = j(n), o = P(a);
			U(o), D(n);
			var s = P(n, 2), c = j(s), l = j(c);
			U(l);
			var u = P(l);
			D(c), eg(P(c, 2), { id: "vippsButton" }), D(s), F((e, t, i, s) => {
				G(n, "title", e), B(a, `${t ?? ""} `), W(o, I(r).props.vipps ?? ""), G(c, "title", i), Vi(l, I(r).props.vippsCheckout === !0), B(u, ` ${s ?? ""}`);
			}, [
				() => K("tip.checkout.vipps"),
				() => K("lbl.vippsNumber"),
				() => K("tip.checkout.vippsCheckout"),
				() => K("lbl.vippsCheckout")
			]), L("change", o, (e) => i("vipps", e.target.value.trim())), L("change", l, (e) => i("vippsCheckout", e.target.checked)), z(e, t);
		};
		var a = Vy(), s = M(a);
		{
			let e = /* @__PURE__ */ O(() => K("group.order")), n = /* @__PURE__ */ O(() => I(r).props.recipient || I(r).props.endpoint || K("common.none")), i = /* @__PURE__ */ O(() => o("checkout-order", { currency: "kr" }));
			wg(s, {
				id: "checkout-order",
				get title() {
					return I(e);
				},
				get value() {
					return I(n);
				},
				get reset() {
					return I(i);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var c = P(s, 2);
		{
			let e = /* @__PURE__ */ O(() => K("group.vipps")), t = /* @__PURE__ */ O(() => I(r).props.vippsCheckout ? K("lbl.vippsCheckout") : I(r).props.vipps || K("common.none")), i = /* @__PURE__ */ O(() => o("checkout-vipps", { vippsCheckout: !1 }));
			wg(c, {
				id: "checkout-vipps",
				get title() {
					return I(e);
				},
				get value() {
					return I(t);
				},
				get reset() {
					return I(i);
				},
				children: (e, t) => {
					n(e);
				},
				$$slots: { default: !0 }
			});
		}
		z(e, a);
	};
	V(c, (e) => {
		t.area === "content" && e(l);
	}), z(e, s), at();
}
Br(["change"]);
//#endregion
//#region src/menu/families/Fields.svelte
var Uy = pn({}), Wy = pn({}), Gy = /* @__PURE__ */ k(!1), Ky = /* @__PURE__ */ R("<p> </p>"), qy = /* @__PURE__ */ R("<label> <input type=\"text\"/></label> <button class=\"ghost\"> </button> <!>", 1), Jy = /* @__PURE__ */ R("<div class=\"pin-line\"><label> <input type=\"number\"/></label> <!></div>"), Yy = /* @__PURE__ */ R("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), Xy = /* @__PURE__ */ R("<label> <!></label>"), Zy = /* @__PURE__ */ R("<label> <input type=\"text\"/></label>"), Qy = /* @__PURE__ */ R("<button class=\"ghost\"> </button>");
function $y(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), i = /* @__PURE__ */ O(() => n.pluginBlocks), { setBlockProp: a, setBlockProps: o } = n, s = (e, t) => (Number.isFinite(t) || (t = e.min ?? 0), e.min != null && (t = Math.max(e.min, t)), e.max != null && (t = Math.min(e.max, t)), t);
	async function c(e) {
		let t = I(r).blockId, n = `${t}:${e.key}`, i = (Uy[n] ?? I(r).props[e.key] ?? "").trim();
		Wy[n] = null;
		let a = i.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
		if (!i || a || /^https?:\/\//i.test(i)) o(e.key, {
			[e.key]: i,
			lat: a ? Number(a[1]) : null,
			lon: a ? Number(a[2]) : null
		});
		else {
			A(Gy, !0), Wy[n] = {
				text: K("props.place.searching"),
				err: !1
			};
			try {
				let a = await fetch(`/api/geocode?q=${encodeURIComponent(i)}`), s = await a.json().catch(() => null);
				if (I(r)?.blockId !== t) return;
				a.ok && Number.isFinite(s?.lat) ? (o(e.key, {
					[e.key]: i,
					lat: s.lat,
					lon: s.lon
				}), Wy[n] = null) : Wy[n] = {
					text: ba(s) ?? K("props.place.notFound"),
					err: !0
				};
			} catch {
				Wy[n] = {
					text: K("props.place.failed"),
					err: !0
				};
			} finally {
				A(Gy, !1);
			}
		}
	}
	let l = { map: [{
		key: "location",
		type: "place",
		label: K("lbl.mapLocation"),
		placeholder: K("ph.mapLocation")
	}, {
		key: "zoom",
		type: "number",
		label: K("lbl.mapZoom"),
		min: 1,
		max: 19
	}] };
	var u = Yr(), d = M(u), f = (e) => {
		let t = (e) => {
			var t = Yr();
			ui(M(t), 17, () => I(o), (e) => e.key, (e, t) => {
				var n = Yr(), i = M(n), o = (e) => {
					let n = /* @__PURE__ */ O(() => `${I(r).blockId}:${I(t).key}`);
					var i = qy(), a = M(i), o = j(a), s = P(o);
					U(s), D(a);
					var l = P(a, 2), u = N(l, !0), d = P(l, 2), f = (e) => {
						var t = Ky();
						let r;
						var i = N(t, !0);
						F(() => {
							r = Pi(t, 1, "panel-hint", null, r, { "place-error": Wy[I(n)].err }), B(i, Wy[I(n)].text);
						}), z(e, t);
					};
					V(d, (e) => {
						Wy[I(n)] && e(f);
					}), F((e) => {
						B(o, `${I(t).label ?? ""} `), G(s, "placeholder", I(t).placeholder), W(s, Uy[I(n)] ?? I(r).props[I(t).key] ?? ""), l.disabled = I(Gy), B(u, e);
					}, [() => K("props.place.search")]), L("input", s, (e) => {
						Uy[I(n)] = e.target.value;
					}), L("keydown", s, (e) => {
						e.key === "Enter" && c(I(t));
					}), L("click", l, () => c(I(t))), z(e, i);
				}, l = (e) => {
					var n = Jy(), i = j(n), o = j(i), c = P(o);
					U(c), D(i);
					var l = P(i, 2), u = (e) => {
						eg(e, { id: "zoom" });
					};
					V(l, (e) => {
						I(r).type === "map" && I(t).key === "zoom" && e(u);
					}), D(n), F(() => {
						B(o, `${I(t).label ?? ""} `), G(c, "min", I(t).min), G(c, "max", I(t).max), G(c, "step", I(t).step ?? 1), W(c, I(r).props[I(t).key]);
					}), L("change", c, (e) => a(I(t).key, s(I(t), Number(e.target.value)))), z(e, n);
				}, u = (e) => {
					var n = Yy(), i = j(n);
					U(i);
					var o = P(i);
					D(n), F((e) => {
						Vi(i, e), B(o, ` ${I(t).label ?? ""}`);
					}, [() => !!I(r).props[I(t).key]]), L("change", i, (e) => a(I(t).key, e.target.checked)), z(e, n);
				}, d = (e) => {
					var n = Xy(), i = j(n), o = P(i);
					{
						let e = /* @__PURE__ */ O(() => (I(t).options ?? []).map((e) => [e.value, e.label]));
						J(o, {
							get value() {
								return I(r).props[I(t).key];
							},
							get options() {
								return I(e);
							},
							onchange: (e) => a(I(t).key, e)
						});
					}
					D(n), F(() => B(i, `${I(t).label ?? ""} `)), z(e, n);
				}, f = (e) => {
					var n = Zy(), i = j(n), o = P(i);
					U(o), D(n), F(() => {
						B(i, `${I(t).label ?? ""} `), G(o, "placeholder", I(t).placeholder), W(o, I(r).props[I(t).key] ?? "");
					}), L("change", o, (e) => a(I(t).key, e.target.value)), z(e, n);
				};
				V(i, (e) => {
					I(t).type === "place" ? e(o) : I(t).type === "number" ? e(l, 1) : I(t).type === "toggle" ? e(u, 2) : I(t).type === "select" ? e(d, 3) : e(f, -1);
				}), z(e, n);
			}), z(e, t);
		}, o = /* @__PURE__ */ O(() => l[I(r).type] ?? I(i).find((e) => e.type === I(r).type)?.fields ?? []);
		var u = Yr(), d = M(u), f = (e) => {
			{
				let n = /* @__PURE__ */ O(() => K("group.place")), i = /* @__PURE__ */ O(() => I(r).props.location || K("common.none"));
				wg(e, {
					id: "map-place",
					defaultOpen: !0,
					get title() {
						return I(n);
					},
					get value() {
						return I(i);
					},
					children: (e, n) => {
						t(e);
					},
					$$slots: { default: !0 }
				});
			}
		}, p = (e) => {
			t(e);
		}, m = (e) => {
			var t = Qy(), i = N(t, !0);
			F((e, n) => {
				G(t, "title", e), B(i, n);
			}, [() => K("hint.pluginBlock"), () => K("ui.settings")]), L("click", t, () => n.bridge?.sendOpenConfig(I(r).blockId)), z(e, t);
		};
		V(d, (e) => {
			I(r).type === "map" ? e(f) : I(o).length ? e(p, 1) : e(m, -1);
		}), z(e, u);
	};
	V(d, (e) => {
		t.area === "content" && e(f);
	}), z(e, u), at();
}
Br([
	"input",
	"keydown",
	"click",
	"change"
]);
//#endregion
//#region src/menu/ElementMenu.svelte
var eb = (e) => {
	zg(e, {});
}, tb = /* @__PURE__ */ R("<button type=\"button\" class=\"menu-quick-open\"> </button>"), nb = /* @__PURE__ */ R("<input type=\"number\"/>"), rb = /* @__PURE__ */ R("<button type=\"button\"> </button>"), ib = /* @__PURE__ */ R("<span class=\"seg\" role=\"group\"></span>"), ab = /* @__PURE__ */ R("<div class=\"menu-quick-item\"><span class=\"menu-quick-head\"><span class=\"mini-label\"> </span><!></span> <!></div>"), ob = /* @__PURE__ */ R("<button type=\"button\" class=\"linkish menu-quick-reset\"> </button>"), sb = /* @__PURE__ */ R("<div class=\"menu-quick\"><!> <!></div>"), cb = /* @__PURE__ */ R("<div><section class=\"emenu-col\"><p class=\"panel-strong emenu-title\"> </p><!><p class=\"emenu-none\"> </p></section> <section class=\"emenu-col\"><p class=\"panel-strong emenu-title\"> </p><!><p class=\"emenu-none\"> </p></section> <section class=\"emenu-col\"><p class=\"panel-strong emenu-title\"> </p><!><p class=\"emenu-none\"> </p></section></div>"), lb = /* @__PURE__ */ R("<div class=\"emenu-cols\"><section class=\"emenu-col\"><p class=\"panel-strong\"> </p><!></section> <section class=\"emenu-col\"><p class=\"panel-strong\"> </p><!></section> <section class=\"emenu-col\"><p class=\"panel-strong\"> </p><!></section></div>"), ub = /* @__PURE__ */ R("<div class=\"props-tabs\"><span class=\"seg\"><button type=\"button\"> </button> <button type=\"button\"> </button> <button type=\"button\"> </button></span></div> <!>", 1), db = /* @__PURE__ */ R("<!> <!>", 1);
function fb(e, t) {
	it(t, !0);
	let n = (e) => {
		var t = Yr();
		_i(M(t), () => I(_), (e, t) => {
			t(e, { area: "content" });
		}), z(e, t);
	}, r = (e) => {
		var t = Yr();
		_i(M(t), () => I(_), (e, t) => {
			t(e, { area: "style" });
		}), z(e, t);
	}, i = nt("urd-editor"), a = /* @__PURE__ */ O(() => i.selectedBlock), { setBlockProp: o, setBlockFit: s, setBlockSize: c, endSizeGesture: l, setBlockHideMobile: u, designWidth: d, buttonTargets: f, setButtonTarget: p, themeSwatches: m } = i, h = {
		text: Yg,
		button: $g,
		image: c_,
		video: g_,
		icon: S_,
		shape: k_,
		gallery: V_,
		ribbon: ov,
		calendar: Pv,
		form: Hv,
		faq: qv,
		timeline: Zv,
		quote: ay,
		stats: cy,
		table: dy,
		share: _y,
		countdown: by,
		audio: Ty,
		collection: Oy,
		product: Fy,
		cart: Ry,
		checkout: Hy
	}, _ = /* @__PURE__ */ O(() => h[I(a).type] ?? $y), v = ra(t, "query", 3, "");
	function y() {
		let e = Xh(I(a).type), t = new Map(b().map((e) => [e.id, e]));
		return Ih(I(a).type, e, new Set(t.keys())).map((e) => t.get(e));
	}
	function b() {
		let e = I(a), t = [];
		e.type === "calendar" && (t.push({
			id: "design",
			label: K("calendar.design"),
			kind: "open",
			value: K(rh(e.props.design).labelKey),
			run: i.openDesignPicker
		}), [
			"list",
			"cards",
			"agenda"
		].includes(ih(e.props)) && t.push({
			id: "limit",
			label: K("lbl.maxCount"),
			kind: "number",
			min: 1,
			max: 50,
			value: e.props.limit ?? 6,
			set: (e) => o("limit", Math.max(1, Math.min(50, Number(e) || 6)))
		}), t.push({
			id: "subscribe",
			label: K("quick.subscribe"),
			kind: "choice",
			value: e.props.showSubscribe === !1 ? "off" : "on",
			options: [["on", K("common.on")], ["off", K("common.off")]],
			set: (e) => o("showSubscribe", e === "on")
		}));
		let n = rc.has(e.type);
		t.push({
			id: "fit",
			label: K("quick.fit"),
			kind: "choice",
			value: e.fit === "shrink" || e.fit === "both" ? e.fit : "wrap",
			options: n ? [["wrap", K("quick.fit.fluid")], ["shrink", K("quick.fit.floor")]] : [
				["wrap", K("quick.fit.wrap")],
				...d() || e.fit === "shrink" ? [["shrink", K("quick.fit.shrink")]] : [],
				["both", K("quick.fit.both")]
			],
			set: (e) => s(e)
		}), t.push({
			id: "phone",
			label: K("quick.phone"),
			kind: "choice",
			value: e.hideMobile ? "off" : "on",
			options: [["on", K("quick.phone.show")], ["off", K("quick.phone.hide")]],
			set: (e) => u(e === "off")
		});
		let r = e.props;
		if (e.type === "text") t.push({
			id: "align",
			label: K("lbl.align"),
			kind: "choice",
			value: r.align ?? "left",
			options: [
				["left", K("common.left")],
				["center", K("common.center")],
				["right", K("common.right")]
			],
			set: (e) => o("align", e)
		}), t.push({
			id: "textBox",
			label: K("group.textBox"),
			kind: "choice",
			value: r.box ? "on" : "off",
			options: tg(),
			set: (e) => o("box", e === "on")
		});
		else if (e.type === "button") t.push({
			id: "goesTo",
			label: K("lbl.goesTo"),
			kind: "select",
			value: r.page ?? "__href",
			options: f(),
			set: p
		}), t.push({
			id: "btnStyle",
			label: K("lbl.style"),
			kind: "select",
			value: r.style ?? "primary",
			options: [["primary", K("opt.btn.primary")], ["secondary", K("opt.btn.secondary")]],
			set: (e) => o("style", e)
		});
		else if (e.type === "image") t.push({
			id: "imgFit",
			label: K("lbl.imageFit"),
			kind: "select",
			value: r.fit ?? "cover",
			options: [["cover", K("opt.fitFrame.cover")], ["contain", K("opt.fitFrame.contain")]],
			set: (e) => o("fit", e)
		}), t.push({
			id: "radius",
			label: K("group.corners"),
			kind: "choice",
			value: r.radius ?? "",
			options: [
				["", K("common.none")],
				["sm", K("opt.size.sm")],
				["md", K("opt.radius.md")]
			],
			set: (e) => o("radius", e || null)
		});
		else if (e.type === "video") t.push({
			id: "videoSource",
			label: K("lbl.videoSource"),
			kind: "choice",
			value: r.source === "file" ? "file" : "embed",
			options: [["embed", K("opt.videoSource.embed")], ["file", K("opt.videoSource.file")]],
			set: (e) => o("source", e)
		});
		else if (e.type === "icon") t.push({
			id: "iconSize",
			label: K("lbl.sizePx"),
			kind: "number",
			min: 8,
			max: 400,
			value: r.size ?? 48,
			set: (e) => o("size", Math.max(8, Math.min(400, Number(e) || 48)))
		}), t.push({
			id: "iconColor",
			label: K("lbl.color"),
			kind: "color",
			value: r.color ?? "accent",
			set: (e) => o("color", e)
		});
		else if (e.type === "gallery") {
			let e = ru(r.view);
			t.push({
				id: "galleryView",
				label: K("lbl.view"),
				kind: "select",
				value: e,
				options: $l.map((e) => [e, K(`opt.galleryView.${e}`)]),
				set: (e) => o("view", e)
			}), eu.includes(e) && t.push({
				id: "columns",
				label: K("lbl.columns"),
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
				label: K("lbl.ribbonMotion"),
				kind: "select",
				value: e,
				options: ig(),
				set: (e) => o("motion", e)
			}), (e === "roll" || e === "sway") && t.push({
				id: "speed",
				label: K("lbl.ribbonSpeed"),
				kind: "number",
				min: 10,
				max: 300,
				step: 5,
				value: r.speed ?? 60,
				set: (e) => o("speed", Math.max(10, Math.min(300, Number(e) || 60)))
			});
		} else e.type === "shape" ? (t.push({
			id: "shapeColor",
			label: K("lbl.color"),
			kind: "select",
			value: r.color ?? "accent",
			options: fg(),
			set: (e) => o("color", e)
		}), t.push({
			id: "thickness",
			label: K("lbl.thickness"),
			kind: "number",
			min: 1,
			max: 40,
			value: r.thickness ?? 2,
			set: (e) => o("thickness", Math.max(1, Math.min(40, Number(e) || 2)))
		})) : e.type === "table" ? t.push({
			id: "tableLines",
			label: K("lbl.tableLines"),
			kind: "select",
			value: r.lines ?? "rows",
			options: [
				["rows", K("opt.table.rows")],
				["grid", K("opt.table.grid")],
				["none", K("common.none")]
			],
			set: (e) => o("lines", e)
		}) : e.type === "quote" ? t.push({
			id: "variant",
			label: K("lbl.variant"),
			kind: "select",
			value: r.variant ?? "large",
			options: [["large", K("opt.quote.large")], ["short", K("opt.quote.short")]],
			set: (e) => o("variant", e)
		}) : e.type === "stats" ? t.push({
			id: "variant",
			label: K("lbl.variant"),
			kind: "select",
			value: [
				"plain",
				"cards",
				"band"
			].includes(r.variant) ? r.variant : "plain",
			options: [
				"plain",
				"cards",
				"band"
			].map((e) => [e, K(`opt.statVariant.${e}`)]),
			set: (e) => o("variant", e)
		}) : e.type === "faq" ? t.push({
			id: "variant",
			label: K("lbl.variant"),
			kind: "select",
			value: r.variant === "list" ? "list" : "cards",
			options: ["cards", "list"].map((e) => [e, K(`opt.faqVariant.${e}`)]),
			set: (e) => o("variant", e)
		}) : e.type === "timeline" ? t.push({
			id: "variant",
			label: K("lbl.variant"),
			kind: "select",
			value: r.variant ?? "left",
			options: [["left", K("opt.timeline.left")], ["alternating", K("opt.timeline.alternating")]],
			set: (e) => o("variant", e)
		}) : e.type === "form" ? t.push({
			id: "sendMode",
			label: K("form.mode"),
			kind: "select",
			value: r.mode === "endpoint" ? "endpoint" : "mailto",
			options: [["mailto", K("form.modeMailto")], ["endpoint", K("form.modeEndpoint")]],
			set: (e) => o("mode", e)
		}) : e.type === "collection" ? (t.push({
			id: "collectionView",
			label: K("lbl.view"),
			kind: "select",
			value: r.view ?? "cards",
			options: [
				["cards", K("opt.collectionView.cards")],
				["list", K("opt.collectionView.list")],
				["archive", K("opt.collectionView.archive")]
			],
			set: (e) => o("view", e)
		}), t.push({
			id: "limit",
			label: K("lbl.maxCount"),
			kind: "number",
			min: 0,
			max: 100,
			value: r.limit ?? 6,
			set: (e) => o("limit", Math.max(0, Math.min(100, Number(e) || 0)))
		})) : e.type === "product" ? t.push({
			id: "columns",
			label: K("lbl.columns"),
			kind: "number",
			min: 0,
			max: 6,
			value: r.columns ?? 0,
			set: (e) => o("columns", Math.max(0, Math.min(6, Number(e) || 0)))
		}) : e.type === "cart" ? t.push({
			id: "cartView",
			label: K("lbl.view"),
			kind: "select",
			value: r.variant ?? "button",
			options: [["button", K("opt.cart.button")], ["icon", K("opt.cart.icon")]],
			set: (e) => o("variant", e)
		}) : e.type === "checkout" ? t.push({
			id: "vippsButton",
			label: K("lbl.vippsCheckout"),
			kind: "choice",
			value: r.vippsCheckout === !0 ? "on" : "off",
			options: tg(),
			set: (e) => o("vippsCheckout", e === "on")
		}) : e.type === "share" ? t.push({
			id: "variant",
			label: K("lbl.variant"),
			kind: "select",
			value: r.variant ?? "icons",
			options: [["icons", K("opt.share.icons")], ["labels", K("opt.share.labels")]],
			set: (e) => o("variant", e)
		}) : e.type === "countdown" ? t.push({
			id: "seconds",
			label: K("lbl.countdownSeconds"),
			kind: "choice",
			value: r.showSeconds === !1 ? "off" : "on",
			options: tg(),
			set: (e) => o("showSeconds", e === "on")
		}) : e.type === "audio" ? t.push({
			id: "loop",
			label: K("lbl.audioLoop"),
			kind: "choice",
			value: r.loop ? "on" : "off",
			options: tg(),
			set: (e) => o("loop", e === "on")
		}) : e.type === "map" && t.push({
			id: "zoom",
			label: K("lbl.mapZoom"),
			kind: "number",
			min: 1,
			max: 19,
			value: r.zoom ?? 15,
			set: (e) => o("zoom", Math.max(1, Math.min(19, Number(e) || 15)))
		});
		return ic.has(e.type) || t.push({
			id: "size",
			label: K("lbl.scale"),
			kind: "number",
			min: ac.min * 100,
			max: ac.max * 100,
			step: 5,
			value: Math.round(sc(e) * 100),
			set: (e) => {
				l(), c(Math.min(ac.max, Math.max(ac.min, (Number(e) || 100) / 100))), l();
			}
		}), t;
	}
	var x = db(), S = M(x), C = (e) => {
		var t = sb(), n = j(t);
		ui(n, 17, y, (e) => e.id, (e, t) => {
			var n = ab(), r = j(n), i = j(r), a = N(i, !0);
			eg(P(i), { get id() {
				return I(t).id;
			} }), D(r);
			var o = P(r, 2), s = (e) => {
				var n = tb(), r = N(n, !0);
				F(() => B(r, I(t).value)), L("click", n, function(...e) {
					I(t).run?.apply(this, e);
				}), z(e, n);
			}, c = (e) => {
				var n = nb();
				U(n), F(() => {
					G(n, "min", I(t).min), G(n, "max", I(t).max), G(n, "step", I(t).step ?? 1), W(n, I(t).value), G(n, "aria-label", I(t).label);
				}), L("change", n, (e) => I(t).set(e.target.value)), z(e, n);
			}, l = (e) => {
				J(e, {
					get value() {
						return I(t).value;
					},
					get options() {
						return I(t).options;
					},
					get title() {
						return I(t).label;
					},
					compact: !0,
					onchange: (e) => I(t).set(e)
				});
			}, u = (e) => {
				{
					let n = /* @__PURE__ */ O(m);
					rl(e, {
						get value() {
							return I(t).value;
						},
						get tokens() {
							return I(n);
						},
						get label() {
							return I(t).label;
						},
						onchange: (e) => I(t).set(e)
					});
				}
			}, d = (e) => {
				var n = ib();
				ui(n, 21, () => I(t).options, ([e, t]) => e, (e, n) => {
					var r = /* @__PURE__ */ O(() => g(I(n), 2));
					let i = () => I(r)[0], a = () => I(r)[1];
					var o = rb();
					let s;
					var c = N(o, !0);
					F(() => {
						G(o, "aria-pressed", I(t).value === i()), s = Pi(o, 1, "", null, s, { on: I(t).value === i() }), B(c, a());
					}), L("click", o, () => I(t).set(i())), z(e, o);
				}), D(n), F(() => G(n, "aria-label", I(t).label)), z(e, n);
			};
			V(o, (e) => {
				I(t).kind === "open" ? e(s) : I(t).kind === "number" ? e(c, 1) : I(t).kind === "select" ? e(l, 2) : I(t).kind === "color" ? e(u, 3) : e(d, -1);
			}), D(n), F(() => B(a, I(t).label)), z(e, n);
		});
		var r = P(n, 2), i = (e) => {
			var t = ob(), n = N(t, !0);
			F((e) => B(n, e), [() => K("menu.quickReset")]), L("click", t, () => Zh(I(a).type, Ph)), z(e, t);
		}, o = /* @__PURE__ */ O(() => zh(Xh(I(a).type)));
		V(r, (e) => {
			I(o) && e(i);
		}), D(t), z(e, t);
	}, w = /* @__PURE__ */ O(() => !v().trim());
	V(S, (e) => {
		I(w) && e(C);
	});
	var T = P(S, 2), E = (e) => {
		var i = cb();
		let a;
		var o = j(i), s = j(o), c = N(s, !0), l = P(s);
		n(l);
		var u = N(P(l), !0);
		D(o);
		var d = P(o, 2), f = j(d), p = N(f, !0), m = P(f);
		r(m);
		var h = N(P(m), !0);
		D(d);
		var g = P(d, 2), _ = j(g), y = N(_, !0), b = P(_);
		eb(b);
		var x = N(P(b), !0);
		D(g), D(i), Oi(i, () => bg(v(), Nm)), F((e, n, r, o, s, l) => {
			a = Pi(i, 1, "emenu-cols emenu-search", null, a, { stacked: !t.wide }), B(c, e), B(u, n), B(p, r), B(h, o), B(y, s), B(x, l);
		}, [
			() => K("props.tabContent"),
			() => K("menu.noMatch"),
			() => K("props.tabStyle"),
			() => K("menu.noMatch"),
			() => K("props.tabPlacement"),
			() => K("menu.noMatch")
		]), z(e, i);
	}, ee = /* @__PURE__ */ O(() => v().trim()), te = (e) => {
		var t = lb(), i = j(t), a = j(i), o = N(a, !0), s = P(a);
		n(s), D(i);
		var c = P(i, 2), l = j(c), u = N(l, !0), d = P(l);
		r(d), D(c);
		var f = P(c, 2), p = j(f), m = N(p, !0);
		eb(P(p)), D(f), D(t), F((e, t, n) => {
			B(o, e), B(u, t), B(m, n);
		}, [
			() => K("props.tabContent"),
			() => K("props.tabStyle"),
			() => K("props.tabPlacement")
		]), z(e, t);
	}, ne = (e) => {
		var t = ub(), i = M(t), a = j(i), o = j(a);
		let s;
		var c = N(o, !0), l = P(o, 2);
		let u;
		var d = N(l, !0), f = P(l, 2);
		let p;
		var m = N(f, !0);
		D(a), D(i);
		var h = P(i, 2), g = (e) => {
			n(e);
		}, _ = (e) => {
			r(e);
		}, v = (e) => {
			eb(e);
		};
		V(h, (e) => {
			Uh.tab === "content" ? e(g) : Uh.tab === "style" ? e(_, 1) : e(v, -1);
		}), F((e, t, n) => {
			s = Pi(o, 1, "", null, s, { on: Uh.tab === "content" }), B(c, e), u = Pi(l, 1, "", null, u, { on: Uh.tab === "style" }), B(d, t), p = Pi(f, 1, "", null, p, { on: Uh.tab === "placement" }), B(m, n);
		}, [
			() => K("props.tabContent"),
			() => K("props.tabStyle"),
			() => K("props.tabPlacement")
		]), L("click", o, () => Uh.tab = "content"), L("click", l, () => Uh.tab = "style"), L("click", f, () => Uh.tab = "placement"), z(e, t);
	};
	V(T, (e) => {
		I(ee) ? e(E) : t.wide ? e(te, 1) : e(ne, -1);
	}), z(e, x), at();
}
Br(["click", "change"]);
//#endregion
//#region src/menu/SearchField.svelte
var pb = /* @__PURE__ */ R("<input type=\"search\" class=\"menu-search\"/>");
function mb(e, t) {
	it(t, !0);
	var n = pb();
	U(n), F((e, t, r) => {
		G(n, "placeholder", e), G(n, "aria-label", t), G(n, "title", r);
	}, [
		() => K("menu.search"),
		() => K("menu.search"),
		() => K("tip.menu.search")
	]), L("keydown", n, (e) => {
		e.key === "Escape" && t.get() && (e.stopPropagation(), t.set(""));
	}), Gi(n, t.get, t.set), z(e, n), at();
}
Br(["keydown"]);
//#endregion
//#region ../template/assets/engine/0.7.4/divider-model.js
var hb = [
	"wave",
	"tilt",
	"curve",
	"triangle",
	"zigzag"
], gb = {
	min: 16,
	max: 240,
	dflt: 64
}, _b = /* @__PURE__ */ R("<p class=\"panel-strong\"> </p> <!> <!>", 1), vb = /* @__PURE__ */ R("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\"/>", 1), yb = /* @__PURE__ */ R("<button><span class=\"rs-sample\"><i class=\"rs-line\"></i> <i class=\"rs-chip\"></i> <i class=\"rs-dot\"></i></span> <span class=\"rs-name\"> </span></button>"), bb = /* @__PURE__ */ R("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" step=\"4\"/> <span class=\"gridmenu-value\"> </span></div> <label> <!></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), xb = /* @__PURE__ */ R("<label> <!></label> <!>", 1), Sb = /* @__PURE__ */ R("<label> <!></label> <label> <input type=\"number\" min=\"0\" max=\"1000\" step=\"10\"/></label> <label> <!></label>", 1), Cb = /* @__PURE__ */ R("<label> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\"/></label> <label> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\"/></label> <!>", 1), wb = /* @__PURE__ */ R("<p class=\"panel-strong\"> </p> <label> <input class=\"token-input\"/></label> <hr class=\"gridmenu-divider\"/> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <hr class=\"gridmenu-divider\"/> <p class=\"panel-strong\"> </p> <div class=\"rs-grid\"></div> <label> <span class=\"row-tools\"><span class=\"gridmenu-value\"> </span> <button class=\"ghost row-tool\"></button></span></label> <hr class=\"gridmenu-divider\"/> <p class=\"panel-strong\"> </p> <!> <hr class=\"gridmenu-divider\"/> <p class=\"panel-strong\"> </p> <!> <hr class=\"gridmenu-divider\"/> <label> <!></label> <!> <label> <!></label>", 1), Tb = /* @__PURE__ */ R("<p class=\"panel-hint\"> </p>"), Eb = /* @__PURE__ */ R("<div class=\"panel-body\"><!></div>");
function Db(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.activeSectionId), i = /* @__PURE__ */ O(() => n.bridge), a = /* @__PURE__ */ O(() => n.previewPalette), o = /* @__PURE__ */ O(() => n.sectionAnim), s = /* @__PURE__ */ O(() => n.sectionBg), c = /* @__PURE__ */ O(() => n.sectionBgCtx), l = /* @__PURE__ */ O(() => n.sectionDivider), u = /* @__PURE__ */ O(() => n.sectionGrid), d = /* @__PURE__ */ O(() => n.sectionHover), f = /* @__PURE__ */ O(() => n.sectionMinHeight), p = /* @__PURE__ */ O(() => n.sectionTheme), m = /* @__PURE__ */ O(() => n.selectedBlock), { BLOCK_LABELS: h, ENTRANCE_OPTIONS: _, HOVER_OPTIONS: v, animObj: y, isEntrance: b, mutateSection: x, normalizeAnim: S, readableOn: C, setSectionGrid: w, setSectionHeight: T, themeHex: E, themeSwatches: ee, toggleSectionGrid: te } = n;
	function ne(e) {
		x("section-theme", (t) => {
			e ? t.theme = e : delete t.theme;
		});
	}
	function re(e) {
		let t = I(a), n = (e) => e.replaceAll("var(--urd-base-bg)", t.bg).replaceAll("var(--urd-base-surface)", t.surface).replaceAll("var(--urd-base-text)", t.text).replaceAll("var(--urd-base-accent)", t.accent).replaceAll("var(--urd-base-accent-text)", t["accent-text"] ?? C(E(t.accent ?? "#000000", t))), r = Is(e);
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
		}), I(i)?.sendDemoAnim(I(r));
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
		}), I(i)?.sendDemoAnim(I(r)));
	}
	function ce(e, t) {
		x("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), I(i)?.sendDemoAnim(I(r));
	}
	var le = Eb(), ue = j(le), de = (e) => {
		var t = _b(), n = M(t), r = N(n, !0), i = P(n, 2);
		mb(i, {
			get: () => Uh.propsQuery,
			set: (e) => Uh.propsQuery = e
		}), fb(P(i, 2), {
			wide: !1,
			get query() {
				return Uh.propsQuery;
			}
		}), F((e) => B(r, e), [() => K("blocks.suffix", { label: h[I(m).type] ?? I(m).type })]), z(e, t);
	}, fe = (e) => {
		var t = wb(), n = M(t), i = N(n, !0), a = P(n, 2), m = j(a), h = P(m);
		U(h), D(a);
		var y = P(a, 4), x = j(y);
		U(x);
		var S = P(x);
		D(y);
		var C = P(y, 2), E = (e) => {
			var t = vb(), n = M(t), r = j(n), i = N(P(r));
			D(n);
			var a = P(n, 2);
			U(a), F((e) => {
				B(r, `${e ?? ""} `), B(i, `${I(u).size ?? ""} px`), W(a, I(u).size);
			}, [() => K("lbl.gridSize")]), L("input", a, (e) => w("size", Number(e.target.value))), z(e, t);
		};
		V(C, (e) => {
			I(u) && e(E);
		});
		var le = P(C, 4), ue = N(le, !0), de = P(le, 2);
		ui(de, 21, () => [["", "common.standard"], ...Object.entries(Fs)], ([e, t]) => e, (e, t) => {
			var n = /* @__PURE__ */ O(() => g(I(t), 2));
			let r = () => I(n)[0], i = () => I(n)[1], a = /* @__PURE__ */ O(() => re(r()));
			var o = yb();
			let s;
			var c = j(o), l = j(c), u = P(l, 2), d = P(u, 2);
			D(c);
			var f = N(P(c, 2), !0);
			D(o), F((e, t) => {
				s = Pi(o, 1, "rs-card", null, s, { on: I(p) === r() }), G(o, "title", e), Ii(c, `background: ${I(a).bg ?? ""}`), Ii(l, `background: ${I(a).text ?? ""}`), Ii(u, `background: ${I(a).surface ?? ""}`), Ii(d, `background: ${I(a).accent ?? ""}`), B(f, t);
			}, [() => K("tip.props.sectionTheme"), () => K(i())]), L("click", o, () => ne(r())), z(e, o);
		}), D(de);
		var fe = P(de, 2), pe = j(fe), me = P(pe), he = j(me), ge = N(he), _e = P(he, 2);
		H(_e, () => q.copy, !0), D(_e), D(me), D(fe);
		var ve = P(fe, 4), ye = N(ve, !0), be = P(ve, 2);
		rf(be, {
			get bg() {
				return I(c);
			},
			get layers() {
				return I(s);
			}
		});
		var xe = P(be, 4), Se = N(xe, !0), Ce = P(xe, 2);
		ui(Ce, 16, () => [["top", "lbl.dividerTop"], ["bottom", "lbl.dividerBottom"]], ([e, t]) => e, (e, t) => {
			var n = /* @__PURE__ */ O(() => g(t, 2));
			let r = () => I(n)[0], i = () => I(n)[1], a = /* @__PURE__ */ O(() => I(l)[r()]);
			var o = xb(), s = M(o), c = j(s), u = P(c);
			{
				let e = /* @__PURE__ */ O(() => I(a)?.shape ?? ""), t = /* @__PURE__ */ O(() => [["", K("common.none")], ...hb.map((e) => [e, K(`opt.divider.${e}`)])]);
				J(u, {
					get value() {
						return I(e);
					},
					get options() {
						return I(t);
					},
					onchange: (e) => ae(r(), "shape", e)
				});
			}
			D(s);
			var d = P(s, 2), f = (e) => {
				var t = bb(), n = M(t), i = j(n), o = N(i, !0), s = P(i, 2);
				U(s);
				var c = N(P(s, 2));
				D(n);
				var l = P(n, 2), u = j(l), d = P(u);
				{
					let e = /* @__PURE__ */ O(() => I(a).color ?? "bg"), t = /* @__PURE__ */ O(ee), n = /* @__PURE__ */ O(() => K("tip.divider.color"));
					rl(d, {
						get value() {
							return I(e);
						},
						get tokens() {
							return I(t);
						},
						get label() {
							return I(n);
						},
						onchange: (e) => ae(r(), "color", e)
					});
				}
				D(l);
				var f = P(l, 2), p = j(f);
				U(p);
				var m = P(p);
				D(f);
				var h = P(f, 2), g = j(h);
				U(g);
				var _ = P(g);
				D(h), F((e, t, n, r, i, d, v) => {
					B(o, e), G(s, "min", gb.min), G(s, "max", gb.max), W(s, I(a).height ?? gb.dflt), B(c, `${I(a).height ?? gb.dflt ?? ""} px`), G(l, "title", t), B(u, `${n ?? ""} `), G(f, "title", r), Vi(p, I(a).flip === !0), B(m, ` ${i ?? ""}`), G(h, "title", d), Vi(g, I(a).invert === !0), B(_, ` ${v ?? ""}`);
				}, [
					() => K("lbl.height"),
					() => K("tip.divider.color"),
					() => K("lbl.color"),
					() => K("tip.divider.flip"),
					() => K("lbl.dividerFlip"),
					() => K("tip.divider.invert"),
					() => K("lbl.patternInvert")
				]), L("input", s, (e) => ae(r(), "height", e.target.valueAsNumber)), L("change", p, (e) => ae(r(), "flip", e.target.checked)), L("change", g, (e) => ae(r(), "invert", e.target.checked)), z(e, t);
			};
			V(d, (e) => {
				I(a)?.shape && e(f);
			}), F((e, t) => {
				G(s, "title", e), B(c, `${t ?? ""} `);
			}, [() => K("tip.props.dividers"), () => K(i())]), z(e, o);
		});
		var we = P(Ce, 4), Te = j(we), Ee = P(Te);
		{
			let e = /* @__PURE__ */ O(() => b(I(o)) ? I(o).type : "");
			J(Ee, {
				get value() {
					return I(e);
				},
				get options() {
					return _;
				},
				onchange: (e) => ie(e || null)
			});
		}
		D(we);
		var De = P(we, 2), Oe = (e) => {
			var t = Cb(), n = M(t), r = j(n), i = P(r);
			U(i), D(n);
			var a = P(n, 2), s = j(a), c = P(s);
			U(c), D(a);
			var l = P(a, 2), u = (e) => {
				var t = Sb(), n = M(t), r = j(n), i = P(r);
				{
					let e = /* @__PURE__ */ O(() => I(o).props.effect ?? "slide-up"), t = /* @__PURE__ */ O(() => [
						["fade-in", K("anim.fadeIn")],
						["slide-up", K("anim.slideUp")],
						["zoom-in", K("anim.zoomIn")]
					]);
					J(i, {
						get value() {
							return I(e);
						},
						get options() {
							return I(t);
						},
						onchange: (e) => ce("effect", e)
					});
				}
				D(n);
				var a = P(n, 2), s = j(a), c = P(s);
				U(c), D(a);
				var l = P(a, 2), u = j(l), d = P(u);
				{
					let e = /* @__PURE__ */ O(() => I(o).props.pattern ?? "sequence"), t = /* @__PURE__ */ O(() => [
						["sequence", K("opt.stagger.sequence")],
						["columns", K("opt.stagger.columns")],
						["rows", K("opt.stagger.rows")],
						["center", K("opt.stagger.center")]
					]);
					J(d, {
						get value() {
							return I(e);
						},
						get options() {
							return I(t);
						},
						onchange: (e) => ce("pattern", e)
					});
				}
				D(l), F((e, t, i, d, f, p) => {
					G(n, "title", e), B(r, `${t ?? ""} `), G(a, "title", i), B(s, `${d ?? ""} `), W(c, I(o).props.step ?? 90), G(l, "title", f), B(u, `${p ?? ""} `);
				}, [
					() => K("tip.props.staggerEffect"),
					() => K("lbl.staggerEffect"),
					() => K("tip.props.staggerStep"),
					() => K("lbl.stepMs"),
					() => K("tip.props.staggerPattern"),
					() => K("lbl.pattern")
				]), L("change", c, (e) => se("step", Number(e.target.value))), z(e, t);
			};
			V(l, (e) => {
				I(o).type === "stagger" && e(u);
			}), F((e, t) => {
				B(r, `${e ?? ""} `), W(i, I(o).props.duration), B(s, `${t ?? ""} `), W(c, I(o).props.delay ?? 0);
			}, [() => K("lbl.durationMs"), () => K("lbl.delayMs")]), L("change", i, (e) => se("duration", Number(e.target.value))), L("change", c, (e) => se("delay", Number(e.target.value))), z(e, t);
		}, ke = /* @__PURE__ */ O(() => b(I(o)));
		V(De, (e) => {
			I(ke) && e(Oe);
		});
		var Ae = P(De, 2), je = j(Ae), Me = P(je);
		{
			let e = /* @__PURE__ */ O(() => I(d)?.type ?? (I(o) && !b(I(o)) ? I(o).type : ""));
			J(Me, {
				get value() {
					return I(e);
				},
				get options() {
					return v;
				},
				onchange: (e) => oe(e || null)
			});
		}
		D(Ae), F((e, t, n, o, s, c, l, d, p, g, _, v, y, b, C, w, T) => {
			B(i, e), G(a, "title", t), B(m, `${n ?? ""} `), W(h, I(f)), G(h, "placeholder", o), Vi(x, I(u) !== null), B(S, ` ${s ?? ""}`), G(le, "title", c), B(ue, l), G(fe, "title", d), B(pe, `${p ?? ""} `), B(ge, `#${I(r) ?? ""}`), G(_e, "title", g), B(ye, _), G(xe, "title", v), B(Se, y), G(we, "title", b), B(Te, `${C ?? ""} `), G(Ae, "title", w), B(je, `${T ?? ""} `);
		}, [
			() => K("lbl.section"),
			() => K("hint.props.minHeight"),
			() => K("lbl.minHeight"),
			() => K("ph.minHeight"),
			() => K("lbl.sectionGrid"),
			() => K("tip.props.sectionTheme"),
			() => K("lbl.sectionTheme"),
			() => K("tip.props.anchor"),
			() => K("lbl.anchor"),
			() => K("tip.props.copyAnchor"),
			() => K("lbl.background"),
			() => K("tip.props.dividers"),
			() => K("lbl.sectionDividers"),
			() => K("tip.props.sectionAnim"),
			() => K("lbl.animIn"),
			() => K("tip.props.sectionHover"),
			() => K("lbl.onHover")
		]), L("change", h, (e) => T(e.target.value)), L("change", x, (e) => te(e.target.checked)), L("click", _e, () => navigator.clipboard?.writeText(`#${I(r)}`)), z(e, t);
	}, pe = (e) => {
		var t = Tb(), n = N(t, !0);
		F((e) => B(n, e), [() => K("hint.props.empty")]), z(e, t);
	};
	V(ue, (e) => {
		I(m) ? e(de) : I(r) ? e(fe, 1) : e(pe, -1);
	}), D(le), z(e, le), at();
}
Br([
	"change",
	"input",
	"click"
]);
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/glow.js
var Ob = {
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
		let n = Ns(t.color), r = t.x ?? .5, i = t.y ?? .3, a = t.radius ?? .5;
		e.style.background = `radial-gradient(circle at ${r * 100}% ${i * 100}%, ${n} 0%, transparent ${a * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, kb = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", Ab = {
	version: 1,
	label: "Grain",
	labelKey: "bgLayer.grain",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = kb, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
};
//#endregion
//#region ../template/assets/engine/0.7.4/footer-thumb.js
function jb(e = {}) {
	let t = "#2fd6b6", n = "#5c6b64", r = e.mega ? "#16221d" : "#0e1512", i = e.cols ?? 0, a = e.social ?? 0, o = `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${r}"/>`;
	if (e.mega && (o += `<circle cx="20" cy="6" r="34" fill="${t}" opacity="0.18"/>`), e.bigcta) return o += `<rect x="45" y="18" width="70" height="8" rx="3" fill="${n}" opacity="0.85"/>`, o += `<rect x="56" y="32" width="48" height="4" rx="2" fill="${n}" opacity="0.5"/>`, o += `<rect x="62" y="43" width="36" height="10" rx="3" fill="${t}"/>`, o += Mb(n, e.baselineLinks), o + "</svg>";
	if (e.chapters) {
		o += `<rect x="12" y="10" width="20" height="6" rx="2" fill="${t}"/>`, o += `<rect x="12" y="20" width="46" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		let r = i || 3, a = (136 - (r - 1) * 8) / r;
		for (let e = 0; e < r; e++) {
			let r = 12 + e * (a + 8);
			o += `<line x1="${r}" y1="30" x2="${r + a}" y2="30" stroke="${n}" stroke-width="0.8" opacity="0.7"/>`, o += `<rect x="${r}" y="34" width="9" height="6" rx="1.5" fill="${t}"/>`;
			for (let e = 0; e < 3; e++) o += `<rect x="${r}" y="${44 + e * 6}" width="${a * .7}" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		}
		return o += Mb(n, e.baselineLinks), o + "</svg>";
	}
	if (e.split) {
		o += `<rect x="8" y="8" width="70" height="52" rx="4" fill="${t}" opacity="0.16"/>`, o += `<rect x="16" y="16" width="20" height="6" rx="2" fill="${t}"/>`, o += `<rect x="16" y="26" width="46" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`, o += `<rect x="16" y="36" width="26" height="9" rx="3" fill="${t}"/>`;
		let r = i || 2;
		for (let e = 0; e < r; e++) {
			let r = 90 + e * 32;
			o += `<rect x="${r}" y="14" width="16" height="3" rx="1.5" fill="${t}" opacity="0.8"/>`;
			for (let e = 0; e < 4; e++) o += `<rect x="${r}" y="${22 + e * 7}" width="22" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		}
		return o += Mb(n, e.baselineLinks), o + "</svg>";
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
	return o += Mb(n, e.baselineLinks), o + "</svg>";
}
function Mb(e, t = 0) {
	let n = `<line x1="8" y1="66" x2="152" y2="66" stroke="${e}" stroke-width="0.6" opacity="0.5"/>`;
	return n += `<rect x="8" y="70" width="40" height="3" rx="1.5" fill="${e}" opacity="0.6"/>`, t && (n += `<g fill="${e}" opacity="0.6">` + Array.from({ length: t }, (e, t) => `<rect x="${120 - t * 16}" y="70" width="12" height="3" rx="1.5"/>`).join("") + "</g>"), n;
}
//#endregion
//#region src/panels/FooterPanel.svelte
var Nb = /* @__PURE__ */ R("<input class=\"nav-target\"/>"), Pb = /* @__PURE__ */ R("<div class=\"nav-row nav-sub-row\"><input/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span> <span class=\"nav-target\"><!></span> <!></div>"), Fb = /* @__PURE__ */ R("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), Ib = /* @__PURE__ */ R("<details class=\"group\"><summary> </summary> <div class=\"group-items\"></div></details>"), Lb = /* @__PURE__ */ R("<button class=\"footer-tp\"><span class=\"footer-tp-thumb\"></span> <span class=\"footer-tp-name\"> </span></button>"), Rb = /* @__PURE__ */ R("<button class=\"ghost row-tool\"></button>"), zb = /* @__PURE__ */ R("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"16\" max=\"160\" step=\"2\"/>", 1), Bb = /* @__PURE__ */ R("<span class=\"toolbar-row\"><label class=\"ghost filepick tb-grow\"> <input type=\"file\" accept=\"image/*\"/></label> <!></span> <!>", 1), Vb = /* @__PURE__ */ R("<div class=\"nav-row\"><input/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></div> <!>", 1), Hb = /* @__PURE__ */ R("<input/>"), Ub = /* @__PURE__ */ R("<label> <!></label> <!>", 1), Wb = /* @__PURE__ */ R("<label> <input/></label> <label> <input/></label> <label> <input/></label>", 1), Gb = /* @__PURE__ */ R("<label> <!></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label> <input/></label> <label> <input/></label> <label> <input/></label> <!>", 1), Kb = /* @__PURE__ */ R("<label> <!></label> <hr class=\"gridmenu-divider\"/>", 1), qb = /* @__PURE__ */ R("<div class=\"panel-body\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><div class=\"footer-tpick\"></div></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><label> <input/></label> <label> <input/></label> <label> <!></label> <!></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><!> <button class=\"ghost action\"> </button> <label> <!></label></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <button class=\"ghost action\"> </button></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><!> <button class=\"ghost action\"> </button></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><!> <p class=\"panel-strong\"> </p> <!></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><label> <input/></label> <p class=\"panel-strong\"> </p> <!> <button class=\"ghost action\"> </button></div></details></div>");
function Jb(e, t) {
	it(t, !0);
	let n = (e, t = f, n = f) => {
		var r = Yr();
		ui(M(r), 17, n, oi, (e, r, a) => {
			var o = Pb(), s = j(o);
			U(s);
			var c = P(s, 2), l = j(c);
			l.disabled = a === 0, H(l, () => q.up, !0), D(l);
			var u = P(l, 2);
			H(u, () => q.down, !0), D(u);
			var d = P(u, 2);
			H(d, () => q.cross, !0), D(d), D(c);
			var f = P(c, 2), p = j(f);
			{
				let e = /* @__PURE__ */ O(() => I(r).page ?? "__href"), n = /* @__PURE__ */ O(() => K("tip.linkTarget")), o = /* @__PURE__ */ O(() => [...I(i).pages.map((e) => [e.id, e.title]), ["__href", K("opt.linkHref")]]);
				J(p, {
					get value() {
						return I(e);
					},
					get title() {
						return I(n);
					},
					get options() {
						return I(o);
					},
					onchange: (e) => C(t(), a, e)
				});
			}
			D(f);
			var m = P(f, 2), h = (e) => {
				var n = Nb();
				U(n), F((e, t) => {
					W(n, I(r).href ?? ""), G(n, "placeholder", e), G(n, "title", t);
				}, [() => K("ph.hrefAnchor"), () => K("tip.hrefAnchor")]), L("change", n, (e) => w(t(), a, e.target.value)), z(e, n);
			};
			V(m, (e) => {
				I(r).page || e(h);
			}), D(o), F((e, t) => {
				W(s, I(r).label), G(s, "title", e), u.disabled = a === n().length - 1, G(d, "title", t);
			}, [() => K("tip.linkLabel"), () => K("tip.removeLink")]), L("input", s, (e) => S(t(), a, e.target.value)), L("click", l, () => x(t(), a, -1)), L("click", u, () => x(t(), a, 1)), L("click", d, () => b(t(), a)), z(e, o);
		}), z(e, r);
	}, r = nt("urd-editor"), i = /* @__PURE__ */ O(() => r.siteDraft), { compressOrTrim: a, footerBgCtx: o, footerMutate: s, setStatus: c } = r;
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
			c(K("status.imageReadErrorSvg"), "error");
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
			label: K("footerTemplate.minimal"),
			thumb: {
				center: !0,
				social: 2,
				baselineLinks: 1
			}
		},
		{
			id: "centered",
			label: K("footerTemplate.centered"),
			thumb: {
				center: !0,
				row: !0,
				social: 3
			}
		},
		{
			id: "columns",
			label: K("footerTemplate.columns"),
			thumb: {
				tag: !0,
				cols: 3,
				social: 3,
				baselineLinks: 2
			}
		},
		{
			id: "sitemap",
			label: K("footerTemplate.sitemap"),
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
			label: K("footerTemplate.newsletter"),
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
			label: K("footerTemplate.bigcta"),
			thumb: {
				center: !0,
				bigcta: !0,
				baselineLinks: 2
			}
		},
		{
			id: "contact",
			label: K("footerTemplate.contact"),
			thumb: {
				tag: !0,
				cols: 3,
				social: 2,
				baselineLinks: 1
			}
		},
		{
			id: "mega",
			label: K("footerTemplate.mega"),
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
			label: K("footerTemplate.chapters"),
			thumb: {
				chapters: !0,
				cols: 3,
				baselineLinks: 2
			}
		},
		{
			id: "split",
			label: K("footerTemplate.split"),
			thumb: {
				split: !0,
				cols: 2,
				baselineLinks: 1
			}
		}
	];
	function _(e) {
		let t = K("seed.orgName"), n = I(i).pages ?? [], r = (e) => n.slice(0, e).map((e) => ({
			label: e.title || e.id,
			page: e.id
		})), a = (e, t) => ({
			label: e,
			href: t
		}), o = `© ${t}`;
		return e === "minimal" ? {
			align: "center",
			brand: { title: t },
			copyright: o,
			baseline: [a(K("seed.footer.privacy"), "#")]
		} : e === "centered" ? {
			align: "center",
			brand: { title: t },
			linkRow: r(5),
			copyright: `${o} · ${K("seed.footer.madeWith")}`
		} : e === "columns" ? {
			align: "left",
			brand: {
				title: t,
				tagline: K("seed.footer.tagline1")
			},
			columns: [
				{
					title: K("seed.footer.colPages"),
					links: r(4)
				},
				{
					title: K("seed.footer.colCompany"),
					links: [
						a(K("seed.footer.about"), "#"),
						a(K("seed.join"), "#"),
						a(K("seed.footer.press"), "#")
					]
				},
				{
					title: K("seed.footer.colResources"),
					links: [
						a(K("seed.footer.bylaws"), "#"),
						a(K("seed.footer.privacy"), "#"),
						a(K("seed.footer.contact"), "#")
					]
				}
			],
			copyright: o,
			baseline: [a(K("seed.footer.privacy"), "#"), a(K("seed.footer.terms"), "#")]
		} : e === "sitemap" ? {
			align: "left",
			brand: {
				title: t,
				tagline: K("seed.footer.tagline2")
			},
			columns: [
				{
					title: K("seed.footer.colExplore"),
					links: [
						a(K("seed.footer.home"), "#"),
						a(K("seed.footer.events"), "#"),
						a(K("seed.footer.gallery"), "#"),
						a(K("seed.footer.blog"), "#")
					]
				},
				{
					title: K("seed.footer.colCompany"),
					links: [
						a(K("seed.footer.about"), "#"),
						a(K("seed.footer.history"), "#"),
						a(K("seed.footer.press"), "#"),
						a(K("seed.footer.contact"), "#")
					]
				},
				{
					title: K("seed.footer.colSupport"),
					links: [
						a(K("seed.join"), "#"),
						a(K("seed.footer.faq"), "#"),
						a(K("seed.footer.help"), "#")
					]
				},
				{
					title: K("seed.footer.colLegal"),
					links: [
						a(K("seed.footer.privacy"), "#"),
						a(K("seed.footer.terms"), "#"),
						a(K("seed.footer.bylaws"), "#")
					]
				}
			],
			copyright: o,
			baseline: [
				a(K("seed.footer.privacy"), "#"),
				a(K("seed.footer.terms"), "#"),
				a(K("seed.footer.cookies"), "#")
			]
		} : e === "newsletter" ? {
			align: "left",
			brand: {
				title: t,
				tagline: K("seed.footer.tagline3")
			},
			cta: {
				kind: "newsletter",
				heading: K("seed.footer.newsletterHeading"),
				label: K("seed.footer.newsletterButton"),
				recipient: K("seed.email"),
				success: K("seed.footer.newsletterSuccess")
			},
			columns: [{
				title: K("seed.footer.colPages"),
				links: r(4)
			}, {
				title: K("seed.footer.colMore"),
				links: [
					a(K("seed.footer.about"), "#"),
					a(K("seed.footer.contact"), "#"),
					a(K("seed.footer.privacy"), "#")
				]
			}],
			copyright: o,
			baseline: [a(K("seed.footer.privacy"), "#")]
		} : e === "bigcta" ? {
			align: "center",
			cta: {
				kind: "button",
				big: !0,
				heading: K("seed.footer.ctaHeading"),
				sub: K("seed.footer.ctaSub"),
				label: K("seed.join"),
				href: "#"
			},
			linkRow: r(4),
			copyright: o,
			baseline: [a(K("seed.footer.privacy"), "#"), a(K("seed.footer.terms"), "#")]
		} : e === "contact" ? {
			align: "left",
			brand: {
				title: t,
				tagline: K("seed.footer.tagline4")
			},
			columns: [
				{
					title: K("seed.footer.colVisit"),
					links: [
						a(K("seed.footer.address"), "#"),
						a(K("seed.email"), `mailto:${K("seed.email")}`),
						a(K("seed.phone"), `tel:${K("seed.phone").replace(/\s+/g, "")}`)
					]
				},
				{
					title: K("seed.footer.colHours"),
					links: [a(K("seed.footer.hours1"), "#"), a(K("seed.footer.hours2"), "#")]
				},
				{
					title: K("seed.footer.colPages"),
					links: r(4)
				}
			],
			copyright: o,
			baseline: [a(K("seed.footer.privacy"), "#")]
		} : e === "chapters" ? {
			align: "left",
			design: "chapters",
			brand: {
				title: t,
				tagline: K("seed.footer.tagline2")
			},
			columns: [
				{
					title: K("seed.footer.colExplore"),
					links: r(4)
				},
				{
					title: K("seed.footer.colCompany"),
					links: [
						a(K("seed.footer.about"), "#"),
						a(K("seed.footer.history"), "#"),
						a(K("seed.footer.contact"), "#")
					]
				},
				{
					title: K("seed.footer.colSupport"),
					links: [
						a(K("seed.join"), "#"),
						a(K("seed.footer.faq"), "#"),
						a(K("seed.footer.help"), "#")
					]
				}
			],
			copyright: o,
			baseline: [a(K("seed.footer.privacy"), "#"), a(K("seed.footer.terms"), "#")]
		} : e === "split" ? {
			align: "left",
			design: "split",
			brand: {
				title: t,
				tagline: K("seed.footer.tagline1")
			},
			cta: {
				kind: "button",
				heading: K("seed.footer.ctaHeading"),
				label: K("seed.join"),
				href: "#"
			},
			columns: [{
				title: K("seed.footer.colPages"),
				links: r(4)
			}, {
				title: K("seed.footer.colMore"),
				links: [
					a(K("seed.footer.about"), "#"),
					a(K("seed.footer.contact"), "#"),
					a(K("seed.footer.privacy"), "#")
				]
			}],
			copyright: o,
			baseline: [a(K("seed.footer.privacy"), "#")]
		} : {
			align: "left",
			brand: {
				title: t,
				tagline: K("seed.footer.tagline5")
			},
			columns: [{
				title: K("seed.footer.colExplore"),
				links: r(4)
			}, {
				title: K("seed.footer.colFollow"),
				links: [a(K("seed.footer.newsletter"), "#"), a(K("seed.email"), `mailto:${K("seed.email")}`)]
			}],
			copyright: o,
			baseline: [a(K("seed.footer.privacy"), "#"), a(K("seed.footer.madeWith"), "#")],
			background: {
				version: 1,
				layers: [{
					type: "glow",
					version: Ob.version ?? 1,
					props: {
						...Ob.defaults(),
						color: "accent",
						x: .12,
						y: 0,
						radius: .6,
						opacity: .45
					}
				}, {
					type: "grain",
					version: Ab.version ?? 1,
					props: {
						...Ab.defaults(),
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
			t[e] ??= [], t[e].push(I(i).pages[0] ? {
				label: K("seed.link"),
				page: I(i).pages[0].id
			} : {
				label: K("seed.link"),
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
				label: K("seed.join")
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
				title: K("seed.column"),
				links: [{
					label: K("seed.link"),
					page: I(i).pages[0].id
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
				label: K("seed.link"),
				page: I(i).pages[0].id
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
	var pe = qb(), me = j(pe), he = j(me);
	U(he);
	var ge = P(he);
	D(me);
	var _e = P(me, 2), ve = (e) => {
		var t = Ib(), n = j(t), r = N(n, !0), a = P(n, 2);
		ui(a, 21, () => I(i).pages ?? [], (e) => e.id, (e, t) => {
			var n = Fb(), r = j(n);
			U(r);
			var a = P(r);
			D(n), F((e, i) => {
				G(n, "title", e), Vi(r, i), B(a, ` ${(I(t).title || I(t).id) ?? ""}`);
			}, [() => K("tip.footer.hideOnPage"), () => !(I(i).footer?.hideOn ?? []).includes(I(t).id)]), L("change", r, (e) => ne(I(t).id, e.target.checked)), z(e, n);
		}), D(a), D(t), F((e) => B(r, e), [() => K("group.showOnPages")]), z(e, t);
	};
	V(_e, (e) => {
		I(i).footer?.show && e(ve);
	});
	var ye = P(_e, 2), be = j(ye), xe = N(be, !0), Se = P(be, 2), Ce = j(Se);
	ui(Ce, 21, () => g, (e) => e.id, (e, t) => {
		var n = Lb(), r = j(n);
		H(r, () => jb(I(t).thumb), !0), D(r);
		var i = N(P(r, 2), !0);
		D(n), F((e) => {
			G(n, "title", e), B(i, I(t).label);
		}, [() => K("tip.footer.template", { label: I(t).label })]), L("click", n, () => v(I(t).id)), z(e, n);
	}), D(Ce), D(Se), D(ye);
	var we = P(ye, 2), Te = j(we), Ee = N(Te, !0), De = P(Te, 2), Oe = j(De), Ae = j(Oe), je = P(Ae);
	U(je), D(Oe);
	var Me = P(Oe, 2), Ne = j(Me), Pe = P(Ne);
	U(Pe), D(Me);
	var Fe = P(Me, 2), Ie = j(Fe), Le = P(Ie);
	{
		let e = /* @__PURE__ */ O(() => I(i).footer?.brand?.mode ?? "text"), t = /* @__PURE__ */ O(() => [
			["text", K("blocks.text")],
			["image", K("opt.brand.image")],
			["both", K("opt.brand.both")]
		]);
		J(Le, {
			get value() {
				return I(e);
			},
			get options() {
				return I(t);
			},
			onchange: (e) => u(e)
		});
	}
	D(Fe);
	var Re = P(Fe, 2), ze = (e) => {
		var t = Bb(), n = M(t), r = j(n), a = j(r), o = P(a);
		D(r);
		var s = P(r, 2), c = (e) => {
			var t = Rb();
			H(t, () => q.cross, !0), D(t), F((e) => G(t, "title", e), [() => K("tip.footer.removeLogo")]), L("click", t, p), z(e, t);
		};
		V(s, (e) => {
			I(i).footer?.brand?.logo && e(c);
		}), D(n);
		var l = P(n, 2), u = (e) => {
			var t = zb(), n = M(t), r = j(n), a = N(P(r));
			D(n);
			var o = P(n, 2);
			U(o), F((e) => {
				B(r, `${e ?? ""} `), B(a, `${I(i).footer?.brand?.logoHeight ?? 40 ?? ""} px`), W(o, I(i).footer?.brand?.logoHeight ?? 40);
			}, [() => K("lbl.logoHeight")]), L("input", o, (e) => m(e.target.value)), z(e, t);
		};
		V(l, (e) => {
			I(i).footer?.brand?.logo && e(u);
		}), F((e, t) => {
			G(r, "title", e), B(a, `${t ?? ""} `);
		}, [() => K("tip.webpAutoPublish"), () => I(i).footer?.brand?.logo ? K("ui.changeLogo") : K("ui.uploadLogo")]), L("change", o, d), z(e, t);
	};
	V(Re, (e) => {
		(I(i).footer?.brand?.mode ?? "text") !== "text" && e(ze);
	}), D(De), D(we);
	var Be = P(we, 2), Ve = j(Be), He = N(Ve, !0), Ue = P(Ve, 2), We = j(Ue);
	ui(We, 17, () => I(i).footer?.columns ?? [], oi, (e, t, n) => {
		var r = Vb(), a = M(r), o = j(a);
		U(o);
		var s = P(o, 2), c = j(s);
		H(c, () => q.plus, !0), D(c);
		var l = P(c, 2);
		l.disabled = n === 0, H(l, () => q.up, !0), D(l);
		var u = P(l, 2);
		H(u, () => q.down, !0), D(u);
		var d = P(u, 2);
		H(d, () => q.cross, !0), D(d), D(s), D(a), ui(P(a, 2), 17, () => I(t).links ?? [], oi, (e, r, a) => {
			var o = Pb(), s = j(o);
			U(s);
			var c = P(s, 2), l = j(c);
			l.disabled = a === 0, H(l, () => q.up, !0), D(l);
			var u = P(l, 2);
			H(u, () => q.down, !0), D(u);
			var d = P(u, 2);
			H(d, () => q.cross, !0), D(d), D(c);
			var f = P(c, 2), p = j(f);
			{
				let e = /* @__PURE__ */ O(() => I(r).page ?? "__href"), t = /* @__PURE__ */ O(() => K("tip.linkTarget")), o = /* @__PURE__ */ O(() => [...I(i).pages.map((e) => [e.id, e.title]), ["__href", K("opt.linkHref")]]);
				J(p, {
					get value() {
						return I(e);
					},
					get title() {
						return I(t);
					},
					get options() {
						return I(o);
					},
					onchange: (e) => de(n, a, e)
				});
			}
			D(f);
			var m = P(f, 2), h = (e) => {
				var t = Nb();
				U(t), F((e, n) => {
					W(t, I(r).href ?? ""), G(t, "placeholder", e), G(t, "title", n);
				}, [() => K("ph.hrefAnchor"), () => K("tip.hrefAnchor")]), L("change", t, (e) => fe(n, a, e.target.value)), z(e, t);
			};
			V(m, (e) => {
				I(r).page || e(h);
			}), D(o), F((e, n) => {
				W(s, I(r).label), G(s, "title", e), u.disabled = a === I(t).links.length - 1, G(d, "title", n);
			}, [() => K("tip.linkLabel"), () => K("tip.removeLink")]), L("input", s, (e) => ue(n, a, e.target.value)), L("click", l, () => le(n, a, -1)), L("click", u, () => le(n, a, 1)), L("click", d, () => ce(n, a)), z(e, o);
		}), F((e, r, a) => {
			W(o, I(t).title), G(o, "title", e), G(c, "title", r), u.disabled = n === I(i).footer.columns.length - 1, G(d, "title", a);
		}, [
			() => K("tip.footer.columnTitle"),
			() => K("tip.footer.addLink"),
			() => K("tip.footer.removeColumn")
		]), L("input", o, (e) => oe(n, e.target.value)), L("click", c, () => se(n)), L("click", l, () => ae(n, -1)), L("click", u, () => ae(n, 1)), L("click", d, () => ie(n)), z(e, r);
	});
	var Ge = P(We, 2), Ke = N(Ge, !0), qe = P(Ge, 2), Je = j(qe), Ye = P(Je);
	{
		let e = /* @__PURE__ */ O(() => I(i).footer?.columnsAlign ?? "left"), t = /* @__PURE__ */ O(() => [["left", K("common.left")], ["center", K("common.center")]]);
		J(Ye, {
			get value() {
				return I(e);
			},
			get options() {
				return I(t);
			},
			onchange: (e) => T(e)
		});
	}
	D(qe), D(Ue), D(Be);
	var Xe = P(Be, 2), Ze = j(Xe), Qe = N(Ze, !0), $e = P(Ze, 2), et = j($e), tt = j(et);
	U(tt);
	var rt = P(tt);
	D(et);
	var ot = P(et, 2), st = N(ot, !0);
	D($e), D(Xe);
	var ct = P(Xe, 2), lt = j(ct), ut = N(lt, !0), dt = P(lt, 2), ft = j(dt), pt = j(ft);
	U(pt);
	var mt = P(pt);
	D(ft);
	var ht = P(ft, 2), gt = (e) => {
		let t = /* @__PURE__ */ O(() => I(i).footer.cta);
		var n = Gb(), r = M(n), a = j(r), o = P(a);
		{
			let e = /* @__PURE__ */ O(() => I(t).kind ?? "button"), n = /* @__PURE__ */ O(() => [["button", K("opt.cta.button")], ["newsletter", K("opt.cta.newsletter")]]);
			J(o, {
				get value() {
					return I(e);
				},
				get options() {
					return I(n);
				},
				onchange: (e) => ee("kind", e)
			});
		}
		D(r);
		var s = P(r, 2), c = j(s);
		U(c);
		var l = P(c);
		D(s);
		var u = P(s, 2), d = j(u), f = P(d);
		U(f), D(u);
		var p = P(u, 2), m = j(p), h = P(m);
		U(h), D(p);
		var g = P(p, 2), _ = j(g), v = P(_);
		U(v), D(g);
		var y = P(g, 2), b = (e) => {
			var n = Ub(), r = M(n), a = j(r), o = P(a);
			{
				let e = /* @__PURE__ */ O(() => I(t).page ?? "__href"), n = /* @__PURE__ */ O(() => [...I(i).pages.map((e) => [e.id, e.title]), ["__href", K("opt.linkHrefMailto")]]);
				J(o, {
					get value() {
						return I(e);
					},
					get options() {
						return I(n);
					},
					onchange: (e) => te(e)
				});
			}
			D(r);
			var s = P(r, 2), c = (e) => {
				var n = Hb();
				U(n), F((e, r) => {
					W(n, I(t).href ?? ""), G(n, "placeholder", e), G(n, "title", r);
				}, [() => K("ph.hrefMailtoAnchor"), () => K("tip.hrefAnchor")]), L("change", n, (e) => ee("href", e.target.value)), z(e, n);
			};
			V(s, (e) => {
				I(t).page || e(c);
			}), F((e, t) => {
				G(r, "title", e), B(a, `${t ?? ""} `);
			}, [() => K("tip.footer.ctaTarget"), () => K("lbl.buttonTarget")]), z(e, n);
		}, x = (e) => {
			var n = Wb(), r = M(n), i = j(r), a = P(i);
			U(a), D(r);
			var o = P(r, 2), s = j(o), c = P(s);
			U(c), D(o);
			var l = P(o, 2), u = j(l), d = P(u);
			U(d), D(l), F((e, n, f, p, m, h, g, _, v) => {
				G(r, "title", e), B(i, `${n ?? ""} `), W(a, I(t).endpoint ?? ""), G(a, "placeholder", f), G(o, "title", p), B(s, `${m ?? ""} `), W(c, I(t).recipient ?? ""), G(c, "placeholder", h), G(l, "title", g), B(u, `${_ ?? ""} `), W(d, I(t).success ?? ""), G(d, "placeholder", v);
			}, [
				() => K("tip.footer.ctaEndpoint"),
				() => K("lbl.newsletterEndpoint"),
				() => K("ph.endpoint"),
				() => K("tip.footer.ctaRecipient"),
				() => K("lbl.recipientFallback"),
				() => K("ph.email"),
				() => K("tip.footer.ctaSuccess"),
				() => K("lbl.confirmation"),
				() => K("ph.footer.ctaSuccess")
			]), L("change", a, (e) => ee("endpoint", e.target.value)), L("change", c, (e) => ee("recipient", e.target.value)), L("input", d, (e) => ee("success", e.target.value)), z(e, n);
		};
		V(y, (e) => {
			(I(t).kind ?? "button") === "button" ? e(b) : e(x, -1);
		}), F((e, n, i, o, y, b, x, S, C, w, T, E) => {
			G(r, "title", e), B(a, `${n ?? ""} `), G(s, "title", i), Vi(c, I(t).big === !0), B(l, ` ${o ?? ""}`), G(u, "title", y), B(d, `${b ?? ""} `), W(f, I(t).heading ?? ""), G(f, "placeholder", x), G(p, "title", S), B(m, `${C ?? ""} `), W(h, I(t).sub ?? ""), G(g, "title", w), B(_, `${T ?? ""} `), W(v, I(t).label ?? ""), G(v, "placeholder", E);
		}, [
			() => K("tip.footer.ctaKind"),
			() => K("common.type"),
			() => K("tip.footer.ctaBig"),
			() => K("lbl.bigCentered"),
			() => K("tip.footer.ctaHeading"),
			() => K("lbl.heading"),
			() => K("ph.footer.ctaHeading"),
			() => K("tip.footer.ctaSub"),
			() => K("lbl.subText"),
			() => K("tip.footer.ctaLabel"),
			() => K("lbl.buttonText"),
			() => K("ph.footer.ctaLabel")
		]), L("change", c, (e) => ee("big", e.target.checked)), L("input", f, (e) => ee("heading", e.target.value)), L("input", h, (e) => ee("sub", e.target.value)), L("input", v, (e) => ee("label", e.target.value)), z(e, n);
	};
	V(ht, (e) => {
		I(i).footer?.cta && e(gt);
	}), D(dt), D(ct);
	var _t = P(ct, 2), vt = j(_t), yt = N(vt, !0), bt = P(vt, 2), xt = j(bt);
	n(xt, () => "linkRow", () => I(i).footer?.linkRow ?? []);
	var St = P(xt, 2), Ct = N(St, !0);
	D(bt), D(_t);
	var wt = P(_t, 2), Tt = j(wt), Et = N(Tt, !0), Dt = P(Tt, 2), Ot = j(Dt), kt = (e) => {
		var t = Kb(), n = M(t), r = j(n), a = P(r);
		{
			let e = /* @__PURE__ */ O(() => I(i).footer?.align ?? "left"), t = /* @__PURE__ */ O(() => [
				["left", K("common.left")],
				["center", K("common.center")],
				["right", K("common.right")]
			]);
			J(a, {
				get value() {
					return I(e);
				},
				get options() {
					return I(t);
				},
				onchange: (e) => s("footer", (t) => {
					t.align = e;
				})
			});
		}
		D(n), ke(2), F((e, t) => {
			G(n, "title", e), B(r, `${t ?? ""} `);
		}, [() => K("tip.footer.align"), () => K("lbl.align")]), z(e, t);
	};
	V(Ot, (e) => {
		I(i).footer?.cta?.big !== !0 && e(kt);
	});
	var At = P(Ot, 2), jt = N(At, !0), Mt = P(At, 2);
	{
		let e = /* @__PURE__ */ O(() => I(i).footer?.background?.layers ?? []);
		rf(Mt, {
			get bg() {
				return o;
			},
			get layers() {
				return I(e);
			}
		});
	}
	D(Dt), D(wt);
	var Nt = P(wt, 2), Pt = j(Nt), Ft = N(Pt, !0), It = P(Pt, 2), Lt = j(It), Rt = j(Lt), zt = P(Rt);
	U(zt), D(Lt);
	var Bt = P(Lt, 2), Vt = N(Bt, !0), Ht = P(Bt, 2);
	n(Ht, () => "baseline", () => I(i).footer?.baseline ?? []);
	var Ut = P(Ht, 2), Wt = N(Ut, !0);
	D(It), D(Nt), D(pe), F((e, t, n, r, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E, ee, te, ne, re, ie, ae, oe, se, ce) => {
		G(me, "title", e), Vi(he, t), B(ge, ` ${n ?? ""}`), B(xe, r), B(Ee, a), G(Oe, "title", o), B(Ae, `${s ?? ""} `), W(je, I(i).footer?.brand?.title ?? ""), G(je, "placeholder", c), G(Me, "title", l), B(Ne, `${u ?? ""} `), W(Pe, I(i).footer?.brand?.tagline ?? ""), G(Fe, "title", d), B(Ie, `${f ?? ""} `), B(He, p), B(Ke, m), G(qe, "title", h), B(Je, `${g ?? ""} `), G(Ze, "title", _), B(Qe, v), G(et, "title", y), Vi(tt, I(i).footer?.links !== !1), B(rt, ` ${b ?? ""}`), B(st, x), B(ut, S), G(ft, "title", C), Vi(pt, w), B(mt, ` ${T ?? ""}`), B(yt, E), B(Ct, ee), B(Et, te), B(jt, ne), B(Ft, re), G(Lt, "title", ie), B(Rt, `${ae ?? ""} `), W(zt, I(i).footer?.copyright ?? ""), G(zt, "placeholder", oe), B(Vt, se), B(Wt, ce);
	}, [
		() => K("tip.footer.show"),
		() => !!I(i).footer?.show,
		() => K("lbl.showFooter"),
		() => K("group.startpoint"),
		() => K("group.brand"),
		() => K("tip.footer.brandTitle"),
		() => K("lbl.title"),
		() => K("ph.footer.brandTitle"),
		() => K("tip.footer.tagline"),
		() => K("lbl.tagline"),
		() => K("tip.footer.brandMode"),
		() => K("lbl.brandMode"),
		() => K("group.columns"),
		() => K("ui.addColumn"),
		() => K("tip.footer.columnsAlign"),
		() => K("lbl.splitColumnAlign"),
		() => K("tip.footer.links"),
		() => K("group.social"),
		() => K("tip.footer.links"),
		() => K("ui.footerLinks"),
		() => K("ui.editSiteLinks"),
		() => K("group.cta"),
		() => K("tip.footer.cta"),
		() => !!I(i).footer?.cta,
		() => K("lbl.showCta"),
		() => K("group.linkRow"),
		() => K("ui.addRowLink"),
		() => K("group.appearance"),
		() => K("lbl.background"),
		() => K("group.baseline"),
		() => K("tip.footer.copyright"),
		() => K("lbl.copyright"),
		() => K("ph.footer.copyright"),
		() => K("lbl.baselineLinks"),
		() => K("ui.addBaselineLink")
	]), L("change", he, (e) => s("footer", (t) => {
		t.show = e.target.checked;
	})), L("input", je, (e) => l("title", e.target.value)), L("input", Pe, (e) => l("tagline", e.target.value)), L("click", Ge, re), L("change", tt, (e) => s("footer", (t) => {
		e.target.checked ? delete t.links : t.links = !1;
	})), L("click", ot, () => {
		r.siteLinksOpen = !0, r.openPanel("site");
	}), L("change", pt, (e) => E(e.target.checked)), L("click", St, () => y("linkRow")), L("input", zt, (e) => h(e.target.value)), L("click", Ut, () => y("baseline")), z(e, pe), at();
}
Br([
	"input",
	"click",
	"change"
]);
//#endregion
//#region ../template/assets/engine/0.7.4/collections-csv.js
var Yb = [
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
function Xb(e) {
	let t = String(e ?? "");
	return /[",\n\r]/.test(t) ? `"${t.replaceAll("\"", "\"\"")}"` : t;
}
function Zb(e, t) {
	return t === "sizes" ? (e.sizes ?? []).join("|") : t === "colors" ? (e.colors ?? []).map((e) => e.name).join("|") : e[t] ?? "";
}
function Qb(e) {
	let t = [Yb.join(",")];
	for (let n of e ?? []) t.push(Yb.map((e) => Xb(Zb(n, e))).join(","));
	return t.join("\n") + "\n";
}
function $b(e) {
	let t = [], n = [], r = "", i = !1, a = String(e ?? "");
	for (let e = 0; e < a.length; e += 1) {
		let o = a[e];
		i ? o === "\"" && a[e + 1] === "\"" ? (r += "\"", e += 1) : o === "\"" ? i = !1 : r += o : o === "\"" ? i = !0 : o === "," ? (n.push(r), r = "") : o === "\n" || o === "\r" ? (o === "\r" && a[e + 1] === "\n" && (e += 1), n.push(r), t.push(n), n = [], r = "") : r += o;
	}
	return (r !== "" || n.length) && (n.push(r), t.push(n)), t.filter((e) => e.some((e) => e.trim() !== ""));
}
var ex = (e) => String(e ?? "").split("|").map((e) => e.trim()).filter(Boolean);
function tx(e) {
	let t = $b(e);
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
		let s = ex(t.sizes);
		s.length && (o.sizes = s);
		let c = ex(t.colors);
		c.length && (o.colors = c.map((e) => ({ name: e }))), r.push(o);
	}
	return {
		entries: r,
		skipped: i
	};
}
//#endregion
//#region src/panels/CollectionsPanel.svelte
var nx = /* @__PURE__ */ R("<label> <!></label>"), rx = /* @__PURE__ */ R("<label> <input type=\"date\"/></label>"), ix = /* @__PURE__ */ R("<label> <input/></label>"), ax = /* @__PURE__ */ R("<img class=\"site-icon-preview\" alt=\"\"/> <button class=\"ghost row-tool\"></button>", 1), ox = /* @__PURE__ */ R("<img class=\"site-icon-preview\" alt=\"\"/>"), sx = /* @__PURE__ */ R("<span class=\"toolbar-row\"><input/> <label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <!> <button class=\"ghost row-tool\"></button></span>"), cx = /* @__PURE__ */ R("<label> <input type=\"number\" min=\"0\" step=\"0.01\"/></label> <label> <input type=\"number\" min=\"0\" step=\"0.01\"/></label> <label> <input/></label> <label> <input/></label> <!> <button class=\"ghost action\"> </button>", 1), lx = /* @__PURE__ */ R("<details class=\"group collection-entry\"><summary> </summary> <div class=\"group-items\"><span class=\"toolbar-row\"><input/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span> <!> <textarea rows=\"3\"></textarea> <!> <span class=\"toolbar-row\"><label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <!></span> <!></div></details>"), ux = /* @__PURE__ */ R("<p class=\"panel-hint\"> </p>"), dx = /* @__PURE__ */ R("<span class=\"toolbar-row\"><button class=\"ghost action\"> </button> <button class=\"ghost action\"> </button> <label class=\"ghost filepick\"> <input type=\"file\" accept=\".csv,text/csv\"/></label> <button class=\"ghost row-tool\"></button></span> <!> <!> <hr class=\"gridmenu-divider\"/>", 1), fx = /* @__PURE__ */ R("<div class=\"panel-body\"><!> <!> <label> <input/></label> <label> <!></label> <button class=\"ghost action\"> </button></div>");
function px(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.collectionIds), i = /* @__PURE__ */ O(() => n.collectionStores), a = /* @__PURE__ */ O(() => n.collectionsView), { addCollection: o, addCollectionEntry: s, compressOrTrim: c, mutateCollection: l, plainTitle: u, removeCollection: d, setStatus: f } = n, p = [
		["news", K("collectionKind.news")],
		["notices", K("collectionKind.notices")],
		["publications", K("collectionKind.publications")],
		["products", K("collectionKind.products")],
		["custom", K("collectionKind.custom")]
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
			n && (n.colors = [...n.colors ?? [], { name: K("ph.colorName") }]);
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
		let t = I(i)[e]?.data;
		if (!t) return;
		let n = URL.createObjectURL(new Blob([Qb(t.entries)], { type: "text/csv" })), r = document.createElement("a");
		r.href = n, r.download = `${e}.csv`, r.click(), URL.revokeObjectURL(n);
	}
	async function w(e, t) {
		let n = t.target.files?.[0];
		if (t.target.value = "", !n) return;
		let r = tx(await n.text());
		if (!r) {
			f(K("status.csvInvalid"), "error");
			return;
		}
		let i = /* @__PURE__ */ new Set();
		for (let e of r.entries) (!/^[a-z0-9][a-z0-9-]*$/.test(e.id) || i.has(e.id)) && (e.id = es("entry")), i.add(e.id);
		l(e, `collection:${e}:import`, (e) => {
			e.entries = r.entries;
		}), f(K("status.csvImported", { count: String(r.entries.length) }), "ok");
	}
	var T = fx(), E = j(T), ee = (e) => {
		var t = nx(), i = j(t), o = P(i);
		{
			let e = /* @__PURE__ */ O(() => n.activeCollection ?? ""), t = /* @__PURE__ */ O(() => [["", K("common.choose")], ...I(r).map((e) => [e, I(a)[e]?.name ?? e])]);
			J(o, {
				get value() {
					return I(e);
				},
				get options() {
					return I(t);
				},
				onchange: (e) => n.activeCollection = e || null
			});
		}
		D(t), F((e) => B(i, `${e ?? ""} `), [() => K("blocks.collection")]), z(e, t);
	};
	V(E, (e) => {
		I(r).length && e(ee);
	});
	var te = P(E, 2), ne = (e) => {
		let t = /* @__PURE__ */ O(() => I(a)[n.activeCollection]);
		var r = dx(), i = M(r), o = j(i), c = N(o, !0), l = P(o, 2), f = N(l, !0), p = P(l, 2), T = j(p), E = P(T);
		D(p);
		var ee = P(p, 2);
		H(ee, () => q.cross, !0), D(ee), D(i);
		var te = P(i, 2);
		ui(te, 19, () => I(t).entries, (e) => e.id, (e, r, i) => {
			var a = lx(), o = j(a), s = N(o), c = P(o, 2), l = j(c), d = j(l);
			U(d);
			var f = P(d, 2), p = j(f);
			H(p, () => q.up, !0), D(p);
			var C = P(p, 2);
			H(C, () => q.down, !0), D(C);
			var w = P(C, 2);
			H(w, () => q.cross, !0), D(w), D(f), D(l);
			var T = P(l, 2), E = (e) => {
				var t = rx(), i = j(t), a = P(i);
				U(a), D(t), F((e) => {
					B(i, `${e ?? ""} `), W(a, I(r).date ?? "");
				}, [() => K("lbl.date")]), L("change", a, (e) => m(n.activeCollection, I(r).id, "date", e.target.value)), z(e, t);
			};
			V(T, (e) => {
				I(t).kind !== "products" && e(E);
			});
			var ee = P(T, 2);
			_t(ee);
			var te = P(ee, 2), ne = (e) => {
				var t = ix(), i = j(t), a = P(i);
				U(a), D(t), F((e, t) => {
					B(i, `${e ?? ""} `), W(a, I(r).href ?? ""), G(a, "placeholder", t);
				}, [() => K("lbl.link"), () => K("ph.collections.href")]), L("change", a, (e) => m(n.activeCollection, I(r).id, "href", e.target.value)), z(e, t);
			};
			V(te, (e) => {
				I(t).kind !== "products" && e(ne);
			});
			var re = P(te, 2), ie = j(re), ae = j(ie), oe = P(ae);
			D(ie);
			var se = P(ie, 2), ce = (e) => {
				var t = ax(), i = M(t), a = P(i, 2);
				H(a, () => q.cross, !0), D(a), F((e) => {
					G(i, "src", I(r).image), G(a, "title", e);
				}, [() => K("tip.removeImage")]), L("click", a, () => m(n.activeCollection, I(r).id, "image", "")), z(e, t);
			};
			V(se, (e) => {
				I(r).image && e(ce);
			}), D(re);
			var le = P(re, 2), ue = (e) => {
				var t = cx(), i = M(t), a = j(i), o = P(a);
				U(o), D(i);
				var s = P(i, 2), c = j(s), l = P(c);
				U(l), D(s);
				var u = P(s, 2), d = j(u), f = P(d);
				U(f), D(u);
				var p = P(u, 2), h = j(p), g = P(h);
				U(g), D(p);
				var _ = P(p, 2);
				ui(_, 17, () => I(r).colors ?? [], oi, (e, t, i) => {
					var a = sx(), o = j(a);
					U(o);
					var s = P(o, 2), c = j(s), l = P(c);
					D(s);
					var u = P(s, 2), d = (e) => {
						var n = ox();
						F(() => G(n, "src", I(t).image)), z(e, n);
					};
					V(u, (e) => {
						I(t).image && e(d);
					});
					var f = P(u, 2);
					H(f, () => q.cross, !0), D(f), D(a), F((e, n) => {
						W(o, I(t).name), G(o, "placeholder", e), B(c, `${n ?? ""} `);
					}, [() => K("ph.colorName"), () => I(t).image ? K("ui.changeImage") : K("ui.addImage")]), L("change", o, (e) => b(n.activeCollection, I(r).id, i, "name", e.target.value)), L("change", l, (e) => x(n.activeCollection, I(r).id, i, e)), L("click", f, () => S(n.activeCollection, I(r).id, i)), z(e, a);
				});
				var C = P(_, 2), w = N(C, !0);
				F((e, t, n, i, m, _, v, y, b, x, S) => {
					B(a, `${e ?? ""} `), W(o, I(r).price ?? ""), G(s, "title", t), B(c, `${n ?? ""} `), W(l, I(r).memberPrice ?? ""), G(u, "title", i), B(d, `${m ?? ""} `), W(f, I(r).badge ?? ""), G(p, "title", _), B(h, `${v ?? ""} `), W(g, y), G(g, "placeholder", b), G(C, "title", x), B(w, S);
				}, [
					() => K("lbl.price"),
					() => K("tip.entry.memberPrice"),
					() => K("lbl.memberPrice"),
					() => K("tip.entry.badge"),
					() => K("lbl.productBadge"),
					() => K("tip.entry.sizes"),
					() => K("lbl.sizes"),
					() => (I(r).sizes ?? []).join(", "),
					() => K("ph.sizes"),
					() => K("tip.entry.colors"),
					() => K("ui.addColor")
				]), L("change", o, (e) => m(n.activeCollection, I(r).id, "price", e.target.value === "" ? "" : Number(e.target.value))), L("change", l, (e) => m(n.activeCollection, I(r).id, "memberPrice", e.target.value === "" ? "" : Number(e.target.value))), L("change", f, (e) => m(n.activeCollection, I(r).id, "badge", e.target.value)), L("change", g, (e) => v(n.activeCollection, I(r).id, e.target.value)), L("click", C, () => y(n.activeCollection, I(r).id)), z(e, t);
			};
			V(le, (e) => {
				I(t).kind === "products" && e(ue);
			}), D(c), D(a), F((e, n, a, o, c) => {
				B(s, `${e ?? ""}${I(t).kind === "products" ? I(r).price == null ? "" : ` · ${I(r).price}` : I(r).date ? ` · ${I(r).date}` : ""}`), W(d, I(r).title), G(d, "title", n), p.disabled = I(i) === 0, C.disabled = I(i) === I(t).entries.length - 1, G(w, "title", a), G(ee, "placeholder", o), W(ee, I(r).text ?? ""), B(ae, `${c ?? ""} `);
			}, [
				() => u(I(r).title),
				() => K("lbl.title"),
				() => K("tip.collections.deleteEntry"),
				() => K("ph.collections.text"),
				() => I(r).image ? K("ui.changeImage") : K("ui.addImage")
			]), L("change", d, (e) => m(n.activeCollection, I(r).id, "title", e.target.value || K("ui.untitled"))), L("click", p, () => h(n.activeCollection, I(i), -1)), L("click", C, () => h(n.activeCollection, I(i), 1)), L("click", w, () => g(n.activeCollection, I(r).id)), L("change", ee, (e) => m(n.activeCollection, I(r).id, "text", e.target.value)), L("change", oe, (e) => _(n.activeCollection, I(r).id, e)), z(e, a);
		});
		var ne = P(te, 2), re = (e) => {
			var t = ux(), n = N(t, !0);
			F((e) => B(n, e), [() => K("hint.collections.empty")]), z(e, t);
		};
		V(ne, (e) => {
			I(t).entries.length || e(re);
		}), ke(2), F((e, t, n, r, i, a) => {
			B(c, e), G(l, "title", t), B(f, n), G(p, "title", r), B(T, `${i ?? ""} `), G(ee, "title", a);
		}, [
			() => K("ui.addEntry"),
			() => K("tip.collections.exportCsv"),
			() => K("ui.exportCsv"),
			() => K("tip.collections.importCsv"),
			() => K("ui.importCsv"),
			() => K("tip.collections.deleteCollection")
		]), L("click", o, () => s(n.activeCollection)), L("click", l, () => C(n.activeCollection)), L("change", E, (e) => w(n.activeCollection, e)), L("click", ee, () => d(n.activeCollection)), z(e, r);
	};
	V(te, (e) => {
		n.activeCollection && I(a)[n.activeCollection] && e(ne);
	});
	var re = P(te, 2), ie = j(re), ae = P(ie);
	U(ae), D(re);
	var oe = P(re, 2), se = j(oe);
	J(P(se), {
		get value() {
			return n.newCollectionKind;
		},
		get options() {
			return p;
		},
		onchange: (e) => n.newCollectionKind = e
	}), D(oe);
	var ce = P(oe, 2), le = N(ce, !0);
	D(T), F((e, t, n, r, i) => {
		B(ie, `${e ?? ""} `), G(ae, "placeholder", t), B(se, `${n ?? ""} `), ce.disabled = r, B(le, i);
	}, [
		() => K("lbl.newCollectionName"),
		() => K("ph.collections.name"),
		() => K("common.type"),
		() => !n.newCollectionName.trim(),
		() => K("ui.createCollection")
	]), L("keydown", ae, (e) => e.key === "Enter" && o()), Gi(ae, () => n.newCollectionName, (e) => n.newCollectionName = e), L("click", ce, o), z(e, T), at();
}
Br([
	"click",
	"change",
	"keydown"
]);
//#endregion
//#region src/panels/PluginsPanel.svelte
var mx = /* @__PURE__ */ R("<p class=\"panel-hint\"> </p>"), hx = /* @__PURE__ */ R("<span class=\"plugin-meta\"> </span>"), gx = /* @__PURE__ */ R("<p class=\"panel-hint plugin-warn\"> </p>"), _x = /* @__PURE__ */ R("<div><span class=\"plugin-head\"><span class=\"plugin-name\"> </span> <!> <span class=\"row-tools\"><label class=\"gridmenu-snap plugin-toggle\"><input type=\"checkbox\"/> </label> <button class=\"ghost row-tool\"></button></span></span> <!> <!></div>"), vx = /* @__PURE__ */ R("<div class=\"plugin-row\"><span class=\"plugin-head\"><span class=\"plugin-name\"> </span> <!> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button></span></span></div>"), yx = /* @__PURE__ */ R("<hr class=\"gridmenu-divider\"/> <p class=\"panel-strong\"> </p> <!>", 1), bx = /* @__PURE__ */ R("<hr class=\"gridmenu-divider\"/> <input/> <button class=\"ghost action\"> </button> <!>", 1), xx = /* @__PURE__ */ R("<div class=\"panel-body\"><!> <!> <!> <!></div>");
function Sx(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.liveCsp), i = /* @__PURE__ */ O(() => n.pluginDiscovery), a = /* @__PURE__ */ O(() => n.pluginEngine), o = /* @__PURE__ */ O(() => n.pluginInfo), s = /* @__PURE__ */ O(() => n.pluginsView), { knownPlugins: c, loadPluginInfo: l, removePlugin: u, setPluginEnabled: d } = n, f = /* @__PURE__ */ k(""), p = /* @__PURE__ */ k("");
	function m(e) {
		let t = [
			...(e.scriptSrc ?? []).map((e) => ["script-src", e]),
			...(e.connectSrc ?? []).map((e) => ["connect-src", e]),
			...(e.frameSrc ?? []).map((e) => ["frame-src", e])
		];
		if (!I(r) || I(r).unknown) return [];
		let n = {
			"script-src": I(r).scriptSrc,
			"connect-src": I(r).connectSrc,
			"frame-src": I(r).frameSrc
		};
		return t.filter(([e, t]) => !n[e]?.has(t)).map(([e, t]) => `${e} ${t}`);
	}
	async function h() {
		A(p, "");
		let e = I(f).trim().toLowerCase();
		/^[a-z0-9][a-z0-9-]*$/.test(e) ? c().includes(e) ? A(p, K("plugin.alreadyListed"), !0) : (await l(e), I(o)[e].errors.length ? A(p, K("plugin.invalidManifest", { errors: I(o)[e].errors.join("; ") }), !0) : (d(e, !0), A(f, ""))) : A(p, K("plugin.invalidId"), !0);
	}
	function g(e) {
		n.pluginsFound = n.pluginsFound.filter((t) => t !== e), d(e, !0);
	}
	var _ = xx(), v = j(_), y = (e) => {
		var t = mx(), n = N(t, !0);
		F((e) => B(n, e), [() => K("hint.plugins.empty")]), z(e, t);
	}, b = /* @__PURE__ */ O(() => !c().length);
	V(v, (e) => {
		I(b) && e(y);
	});
	var x = P(v, 2);
	ui(x, 16, c, (e) => e, (e, t) => {
		let n = /* @__PURE__ */ O(() => I(o)[t]), r = /* @__PURE__ */ O(() => (I(s)?.enabled ?? []).includes(t));
		var i = _x();
		let c;
		var l = j(i), f = j(l), p = N(f, !0), h = P(f, 2), g = (e) => {
			var t = hx(), r = N(t);
			F(() => B(r, `v${I(n).version ?? ""}`)), z(e, t);
		};
		V(h, (e) => {
			I(n)?.version && e(g);
		});
		var _ = P(h, 2), v = j(_), y = j(v);
		U(y);
		var b = P(y);
		D(v);
		var x = P(v, 2);
		H(x, () => q.cross, !0), D(x), D(_), D(l);
		var S = P(l, 2), C = (e) => {
			var t = gx(), r = N(t, !0);
			F((e) => B(r, e), [() => I(n).errors.join("; ")]), z(e, t);
		}, w = (e) => {
			var t = gx(), r = N(t, !0);
			F((e) => B(r, e), [() => K("plugin.engineMismatch", {
				required: I(n).requiresEngine,
				current: I(a)
			})]), z(e, t);
		}, T = (e) => {
			var t = gx(), r = N(t, !0);
			F((e) => B(r, e), [() => K("plugin.cspNeeded", { list: m(I(n).csp).join(", ") })]), z(e, t);
		}, E = /* @__PURE__ */ O(() => I(n)?.csp && m(I(n).csp).length);
		V(S, (e) => {
			I(n)?.errors?.length ? e(C) : I(n) && !I(n).satisfied ? e(w, 1) : I(E) && e(T, 2);
		});
		var ee = P(S, 2), te = (e) => {
			var t = mx(), r = N(t, !0);
			F((e) => B(r, e), [() => K("plugin.languages", { list: I(n).languages.map((e) => e.name).join(", ") })]), z(e, t);
		};
		V(ee, (e) => {
			I(n)?.languages?.length && e(te);
		}), D(i), F((e, t, a, o, s) => {
			c = Pi(i, 1, "plugin-row", null, c, { "plugin-broken": I(n)?.errors?.length }), B(p, e), G(v, "title", t), Vi(y, I(r)), y.disabled = a, B(b, ` ${o ?? ""}`), G(x, "title", s);
		}, [
			() => I(n)?.names?.[xa()] ?? I(n)?.name ?? t,
			() => I(r) ? K("tip.plugins.on") : K("tip.plugins.off"),
			() => !!I(n)?.errors?.length,
			() => I(r) ? K("ui.on") : K("ui.off"),
			() => K("tip.plugins.remove")
		]), L("change", y, (e) => d(t, e.target.checked)), L("click", x, () => u(t)), z(e, i);
	});
	var S = P(x, 2), C = (e) => {
		var t = yx(), r = P(M(t), 2), i = N(r, !0);
		ui(P(r, 2), 16, () => n.pluginsFound, (e) => e, (e, t) => {
			var n = vx(), r = j(n), i = j(r), a = N(i, !0), s = P(i, 2), c = (e) => {
				var n = hx(), r = N(n);
				F(() => B(r, `v${I(o)[t].version ?? ""}`)), z(e, n);
			};
			V(s, (e) => {
				I(o)[t]?.version && e(c);
			});
			var l = P(s, 2), u = j(l);
			H(u, () => q.right, !0), D(u), D(l), D(r), D(n), F((e, t) => {
				B(a, e), G(u, "title", t);
			}, [() => I(o)[t]?.names?.[xa()] ?? I(o)[t]?.name ?? t, () => K("tip.plugins.addFound")]), L("click", u, () => g(t)), z(e, n);
		}), F((e) => B(i, e), [() => K("hint.plugins.found")]), z(e, t);
	};
	V(S, (e) => {
		n.pluginsFound.length && e(C);
	});
	var w = P(S, 2), T = (e) => {
		var t = Yr(), r = M(t), i = (e) => {
			var t = mx(), n = N(t, !0);
			F((e) => B(n, e), [() => K("hint.plugins.autoDiscover")]), z(e, t);
		};
		V(r, (e) => {
			n.pluginsFound.length || e(i);
		}), z(e, t);
	}, E = (e) => {
		var t = bx(), n = P(M(t), 2);
		U(n);
		var r = P(n, 2), i = N(r, !0), a = P(r, 2), o = (e) => {
			var t = gx(), n = N(t, !0);
			F(() => B(n, I(p))), z(e, t);
		};
		V(a, (e) => {
			I(p) && e(o);
		}), F((e, t, a) => {
			G(n, "placeholder", e), r.disabled = t, B(i, a);
		}, [
			() => K("ph.plugins.folder"),
			() => !I(f).trim(),
			() => K("ui.addPlugin")
		]), L("keydown", n, (e) => e.key === "Enter" && h()), Gi(n, () => I(f), (e) => A(f, e)), L("click", r, h), z(e, t);
	};
	V(w, (e) => {
		I(i) === "ok" ? e(T) : e(E, -1);
	}), D(_), z(e, _), at();
}
Br([
	"change",
	"click",
	"keydown"
]);
//#endregion
//#region src/panels/HistoryPanel.svelte
var Cx = /* @__PURE__ */ R("<p class=\"panel-hint\"> </p>"), wx = /* @__PURE__ */ R("<div><span class=\"history-msg\"> </span> <span class=\"history-meta\"> </span></div>"), Tx = /* @__PURE__ */ R("<button class=\"ghost\"> </button> <!>", 1), Ex = /* @__PURE__ */ R("<!> <!>", 1), Dx = /* @__PURE__ */ R("<div class=\"panel-body\"><!></div>");
function Ox(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.auth), i = /* @__PURE__ */ O(() => n.historyError), a = /* @__PURE__ */ O(() => n.historyList), o = /* @__PURE__ */ O(() => n.siteDraft), { askConfirm: s, loadHistory: c, refreshBaseSha: l, setStatus: u } = n, d = /* @__PURE__ */ k(!1), f = (() => {
		let e = {
			dateStyle: "short",
			timeStyle: "short"
		};
		try {
			return new Intl.DateTimeFormat(xa(), e);
		} catch {
			return new Intl.DateTimeFormat(void 0, e);
		}
	})();
	async function p() {
		let e = I(a)?.[0];
		if (e && !I(d) && await s({
			title: K("confirm.revert.title"),
			lines: [`«${e.message}»`, K("confirm.revert.body")],
			okLabel: K("confirm.revert.ok"),
			cancelLabel: K("confirm.cancel")
		})) {
			A(d, !0), u(K("status.reverting"));
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? n.baseSha = e : l(), n.revertedSinceLoad = !0, u(K("status.revertDone"), "ok"), m();
				} else t.status === 409 ? u(K("status.revertConflict"), "error") : u(ba(await t.json().catch(() => null)) ?? K("status.revertFailed"), "error");
			} catch {
				u(K("status.publishLayerUnreachable"), "error");
			}
			A(d, !1), c();
		}
	}
	async function m() {
		let e = ["/content/site.json", ...I(o).pages.map((e) => `/${e.file}`)], t = async () => {
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
				u(K("status.revertDeployed"), "ok");
				for (let e of Object.keys(localStorage).filter((e) => e.startsWith("urd-draft-"))) localStorage.removeItem(e);
				await new Promise((e) => setTimeout(e, 800)), location.reload();
				return;
			}
		}
		u(K("status.revertDeployTimeout"), "error");
	}
	var h = Dx(), g = j(h), _ = (e) => {
		var t = Cx(), n = N(t, !0);
		F((e) => B(n, e), [() => K("hint.history.loading")]), z(e, t);
	}, v = (e) => {
		var t = Ex(), n = M(t), o = (e) => {
			var t = Cx(), n = N(t, !0);
			F(() => B(n, I(i))), z(e, t);
		};
		V(n, (e) => {
			I(i) && e(o);
		});
		var s = P(n, 2), c = (e) => {
			var t = Tx(), n = M(t), i = N(n, !0);
			ui(P(n, 2), 19, () => I(a), (e) => e.sha, (e, t, n) => {
				var r = wx();
				let i;
				var a = j(r), o = N(a, !0), s = N(P(a, 2));
				D(r), F((e) => {
					i = Pi(r, 1, "history-row", null, i, { head: I(n) === 0 }), G(a, "title", I(t).sha), B(o, I(t).message), B(s, `${I(t).author ?? ""}${e ?? ""}`);
				}, [() => I(t).date ? ` · ${f.format(new Date(I(t).date))}` : ""]), z(e, r);
			}), F((e, t) => {
				n.disabled = I(d) || !I(r)?.allowed, G(n, "title", e), B(i, t);
			}, [() => I(r)?.allowed ? K("tip.history.revert") : K("tip.history.needsAccess"), () => K("ui.revertLast")]), L("click", n, p), z(e, t);
		};
		V(s, (e) => {
			I(a).length > 0 && e(c);
		}), z(e, t);
	};
	V(g, (e) => {
		I(a) === null ? e(_) : e(v, -1);
	}), D(h), z(e, h), at();
}
Br(["click"]);
//#endregion
//#region src/panels/UpdatePanel.svelte
var kx = /* @__PURE__ */ R("<p class=\"panel-hint\"> </p>"), Ax = /* @__PURE__ */ R("<p class=\"panel-hint\"> </p> <button class=\"ghost\"> </button>", 1), jx = /* @__PURE__ */ R("<span class=\"update-arrow\"></span> <span class=\"badge\"> </span>", 1), Mx = /* @__PURE__ */ R("<details class=\"group\"><summary> </summary> <div class=\"group-items\"><p class=\"update-notes\"> </p></div></details>"), Nx = /* @__PURE__ */ R("<details class=\"group\"><summary><span class=\"update-warn\"></span> </summary> <div class=\"group-items\"><pre class=\"update-headers\"> </pre></div></details>"), Px = /* @__PURE__ */ R("<span class=\"chip\"> </span>"), Fx = /* @__PURE__ */ R("<div class=\"update-row\"><span class=\"update-path\"> </span> <span class=\"update-flags\"><!> <span class=\"update-warn\"></span></span></div>"), Ix = /* @__PURE__ */ R("<div class=\"update-row\"><span class=\"update-path\"> </span> <!></div>"), Lx = /* @__PURE__ */ R("<span class=\"update-warn\"></span>"), Rx = /* @__PURE__ */ R("<div class=\"update-row\"><span> </span> <span class=\"update-flags\"><!> <!> <input type=\"checkbox\"/></span></div>"), zx = /* @__PURE__ */ R("<div class=\"ctl-row update-opt-head\"><p class=\"panel-strong\"> </p> <span class=\"mini-label\"> </span></div> <!>", 1), Bx = /* @__PURE__ */ R("<p class=\"update-summary\"> </p> <!> <!> <!> <details class=\"group\"><summary> </summary> <div class=\"group-items\"></div></details> <!> <button class=\"primary update-run\"> </button>", 1), Vx = /* @__PURE__ */ R("<div class=\"update-versions\"><span class=\"update-from\"> </span> <!></div> <!>", 1), Hx = /* @__PURE__ */ R("<div class=\"panel-body\"><!></div>");
function Ux(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.auth), i = /* @__PURE__ */ O(() => n.updateError), a = /* @__PURE__ */ O(() => n.updateInfo), { askConfirm: o, loadUpdateCheck: s, setStatus: c } = n;
	function l(e) {
		let t = new Set(n.updateSkip);
		t.has(e) ? t.delete(e) : t.add(e), n.updateSkip = t;
	}
	async function u() {
		if (!I(a) || I(a).upToDate || n.updateBusy) return;
		let e = [...n.updateSkip], t = I(a).changes.filter((e) => !n.updateSkip.has(e.path)), r = t.filter((e) => e.atom && e.conflict);
		if (await o({
			title: K("confirm.update.title"),
			lines: [K("confirm.update.body", {
				target: I(a).target,
				writes: t.filter((e) => e.action === "write").length,
				deletes: t.filter((e) => e.action === "delete").length
			}), ...r.length > 0 ? [K("confirm.update.warnEdited", { paths: r.map((e) => e.path).join(", ") })] : []],
			okLabel: K("confirm.update.ok"),
			cancelLabel: K("confirm.cancel")
		})) {
			n.updateBusy = !0, c(K("update.running", { target: I(a).target }));
			try {
				let t = await fetch("/api/github/update", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						to: I(a).target,
						expect: I(a).head,
						skip: e
					})
				}), n = await t.json().catch(() => null);
				t.ok ? (c(K("update.committed", { target: I(a).target }), "ok"), await d(I(a).target.replace(/^v/, ""))) : t.status === 409 ? (c(ba(n) ?? K("update.checkFailed"), "error"), await s()) : c(ba(n) ?? K("update.failed"), "error");
			} catch {
				c(K("status.publishLayerUnreachable"), "error");
			}
			n.updateBusy = !1;
		}
	}
	async function d(e) {
		for (let t = 0; t < 18; t++) {
			await new Promise((e) => setTimeout(e, 1e4));
			try {
				if ((await (await fetch("/urd.json", { cache: "no-store" })).json())?.engine === e) {
					c(K("update.deployed"), "ok"), await new Promise((e) => setTimeout(e, 800)), location.reload();
					return;
				}
			} catch {}
		}
		c(K("update.deployTimeout"), "error");
	}
	var f = Hx(), p = j(f), m = (e) => {
		var t = kx(), n = N(t, !0);
		F((e) => B(n, e), [() => K("update.checking")]), z(e, t);
	}, h = (e) => {
		var t = Ax(), n = M(t), r = N(n, !0), a = P(n, 2), o = N(a, !0);
		F((e) => {
			B(r, I(i)), B(o, e);
		}, [() => K("update.retry")]), L("click", a, s), z(e, t);
	}, g = (e) => {
		var t = Vx(), i = M(t), o = j(i), s = N(o, !0), c = P(o, 2), d = (e) => {
			var t = jx(), n = M(t);
			H(n, () => q.right, !0), D(n);
			var r = N(P(n, 2), !0);
			F(() => B(r, I(a).target)), z(e, t);
		};
		V(c, (e) => {
			I(a).upToDate || e(d);
		}), D(i);
		var f = P(i, 2), p = (e) => {
			var t = kx(), n = N(t, !0);
			F((e) => B(n, e), [() => K("update.upToDate")]), z(e, t);
		}, m = (e) => {
			var t = Bx(), i = M(t), o = N(i, !0), s = P(i, 2), c = (e) => {
				var t = Mx(), n = j(t), r = N(n, !0), i = P(n, 2), o = N(j(i), !0);
				D(i), D(t), F((e) => {
					B(r, e), B(o, I(a).notes);
				}, [() => K("update.aboutVersion", { target: I(a).target })]), z(e, t);
			};
			V(s, (e) => {
				I(a).notes && e(c);
			});
			var d = P(s, 2), f = (e) => {
				var t = Nx(), n = j(t), r = j(n);
				H(r, () => q.warn, !0), D(r);
				var i = P(r);
				D(n);
				var o = P(n, 2), s = N(j(o), !0);
				D(o), D(t), F((e, t) => {
					G(n, "title", e), B(i, ` ${t ?? ""}`), B(s, I(a).headers.upstream);
				}, [() => K("update.headersManual"), () => K("update.headersTitle")]), z(e, t);
			};
			V(d, (e) => {
				I(a).headers?.upstream && e(f);
			});
			var p = P(d, 2);
			ui(p, 17, () => I(a).changes.filter((e) => e.atom && e.conflict), (e) => e.path, (e, t) => {
				var n = Fx(), r = j(n), i = N(r, !0), a = P(r, 2), o = j(a), s = (e) => {
					var t = Px(), n = N(t, !0);
					F((e) => B(n, e), [() => K("update.actionDelete")]), z(e, t);
				};
				V(o, (e) => {
					I(t).action === "delete" && e(s);
				});
				var c = P(o, 2);
				H(c, () => q.warn, !0), D(c), D(a), D(n), F((e) => {
					G(r, "title", I(t).path), B(i, I(t).path), G(c, "title", e);
				}, [() => K(`update.conflict.${I(t).conflict}`)]), z(e, n);
			});
			var m = P(p, 2), h = j(m), g = N(h), _ = P(h, 2);
			ui(_, 21, () => I(a).changes.filter((e) => e.atom && !e.conflict), (e) => e.path, (e, t) => {
				var n = Ix(), r = j(n), i = N(r, !0), a = P(r, 2), o = (e) => {
					var t = Px(), n = N(t, !0);
					F((e) => B(n, e), [() => K("update.actionDelete")]), z(e, t);
				};
				V(a, (e) => {
					I(t).action === "delete" && e(o);
				}), D(n), F(() => {
					G(r, "title", I(t).path), B(i, I(t).path);
				}), z(e, n);
			}), D(_), D(m);
			var v = P(m, 2), y = (e) => {
				var t = zx(), r = M(t), i = j(r), o = N(i, !0), s = N(P(i, 2), !0);
				D(r), ui(P(r, 2), 17, () => I(a).changes.filter((e) => !e.atom), (e) => e.path, (e, t) => {
					var r = Rx(), i = j(r);
					let a;
					var o = N(i, !0), s = P(i, 2), c = j(s), u = (e) => {
						var t = Px(), n = N(t, !0);
						F((e) => B(n, e), [() => K("update.actionDelete")]), z(e, t);
					};
					V(c, (e) => {
						I(t).action === "delete" && e(u);
					});
					var d = P(c, 2), f = (e) => {
						var n = Lx();
						H(n, () => q.warn, !0), D(n), F((e) => G(n, "title", e), [() => K(`update.conflict.${I(t).conflict}`)]), z(e, n);
					};
					V(d, (e) => {
						I(t).conflict && e(f);
					});
					var p = P(d, 2);
					U(p), D(s), D(r), F((e, n, r, s) => {
						a = Pi(i, 1, "update-path", null, a, { skipped: e }), G(i, "title", I(t).path), B(o, I(t).path), Vi(p, n), G(p, "title", r), G(p, "aria-label", s);
					}, [
						() => n.updateSkip.has(I(t).path),
						() => n.updateSkip.has(I(t).path),
						() => K("update.keepMine.title"),
						() => K("update.keepMine")
					]), L("change", p, () => l(I(t).path)), z(e, r);
				}), F((e, t) => {
					B(o, e), B(s, t);
				}, [() => K("update.optionalTitle"), () => K("update.keepMine")]), z(e, t);
			}, b = /* @__PURE__ */ O(() => I(a).changes.some((e) => !e.atom));
			V(v, (e) => {
				I(b) && e(y);
			});
			var x = P(v, 2), S = N(x, !0);
			F((e, t, i, a, s, c) => {
				B(o, e), G(h, "title", t), B(g, `${i ?? ""} · ${a ?? ""}`), x.disabled = n.updateBusy || !I(r)?.allowed, G(x, "title", s), B(S, c);
			}, [
				() => K("update.summary", {
					writes: I(a).changes.filter((e) => e.action === "write").length,
					deletes: I(a).changes.filter((e) => e.action === "delete").length
				}),
				() => K("update.atomGroup.title"),
				() => K("update.atomTitle"),
				() => I(a).changes.filter((e) => e.atom).length,
				() => I(r)?.allowed ? K("update.run.title") : K("tip.history.needsAccess"),
				() => K("update.run", { target: I(a).target })
			]), L("click", x, u), z(e, t);
		};
		V(f, (e) => {
			I(a).upToDate ? e(p) : e(m, -1);
		}), F((e) => B(s, e), [() => K("update.current", { version: I(a).current })]), z(e, t);
	};
	V(p, (e) => {
		n.updateBusy && !I(a) ? e(m) : I(i) ? e(h, 1) : I(a) && e(g, 2);
	}), D(f), z(e, f), at();
}
Br(["click", "change"]);
//#endregion
//#region src/lib/IconEditor.svelte
var Wx = /* @__PURE__ */ R("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\"> </h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\"></canvas> <p class=\"ie-hint svelte-e7sog7\"> </p></div> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"ghost svelte-e7sog7\"> </button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"primary svelte-e7sog7\"> </button></span></div></div>");
function Gx(e, t) {
	it(t, !0);
	let n = ra(t, "image", 3, ""), r = /* @__PURE__ */ k(null), i = /* @__PURE__ */ k(null), a = /* @__PURE__ */ k(1), o = /* @__PURE__ */ k(.5), s = /* @__PURE__ */ k(.5), c = /* @__PURE__ */ k(1), l = /* @__PURE__ */ k(1), u = /* @__PURE__ */ k(1);
	Nn(() => {
		if (!n()) return;
		let e = new Image();
		e.onload = () => {
			A(i, e, !0);
		}, e.src = n();
	});
	function d(e, t) {
		if (e.clearRect(0, 0, t, t), !I(i)) return;
		e.filter = `brightness(${I(c)}) contrast(${I(l)}) saturate(${I(u)})`;
		let n = Math.max(t / I(i).width, t / I(i).height) * I(a), r = I(i).width * n, d = I(i).height * n, f = t / 2 - I(o) * r, p = t / 2 - I(s) * d;
		f = Math.min(0, Math.max(t - r, f)), p = Math.min(0, Math.max(t - d, p)), e.drawImage(I(i), f, p, r, d), e.filter = "none";
	}
	Nn(() => {
		I(i), I(a), I(o), I(s), I(c), I(l), I(u), I(r) && d(I(r).getContext("2d"), 220);
	});
	function f(e) {
		if (!I(i)) return;
		e.preventDefault();
		let t = e.clientX, n = e.clientY, r = Math.max(220 / I(i).width, 220 / I(i).height) * I(a), c = I(i).width * r, l = I(i).height * r, u = (e) => {
			A(o, Math.min(1, Math.max(0, I(o) - (e.clientX - t) / c)), !0), A(s, Math.min(1, Math.max(0, I(s) - (e.clientY - n) / l)), !0), t = e.clientX, n = e.clientY;
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
	var h = Wx(), g = j(h), _ = j(g), v = N(_, !0), y = P(_, 2), b = j(y);
	G(b, "width", 220), G(b, "height", 220), Zi(b, (e) => A(r, e), () => I(r));
	var x = N(P(b, 2), !0);
	D(y);
	var S = P(y, 2), C = j(S), w = N(P(C));
	D(S);
	var T = P(S, 2);
	U(T);
	var E = P(T, 2), ee = j(E), te = N(P(ee));
	D(E);
	var ne = P(E, 2);
	U(ne);
	var re = P(ne, 2), ie = j(re), ae = N(P(ie));
	D(re);
	var oe = P(re, 2);
	U(oe);
	var se = P(oe, 2), ce = j(se), le = N(P(ce));
	D(se);
	var ue = P(se, 2);
	U(ue);
	var de = P(ue, 2), fe = j(de), pe = N(fe, !0), me = P(fe, 2), he = N(me, !0);
	D(de);
	var ge = P(de, 2), _e = j(ge), ve = N(_e, !0), ye = P(_e, 2), be = N(ye, !0);
	D(ge), D(g), D(h), F((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) => {
		B(v, e), G(b, "title", t), B(x, n), B(C, `${r ?? ""} `), B(w, `${i ?? ""}x`), B(ee, `${a ?? ""} `), B(te, `${o ?? ""}%`), B(ie, `${s ?? ""} `), B(ae, `${c ?? ""}%`), B(ce, `${l ?? ""} `), B(le, `${u ?? ""}%`), B(pe, d), B(he, f), B(ve, p), B(be, m);
	}, [
		() => K("ie.title"),
		() => K("ie.dragTip"),
		() => K("ie.hint"),
		() => K("lbl.zoom"),
		() => I(a).toFixed(2),
		() => K("lbl.brightness"),
		() => Math.round(I(c) * 100),
		() => K("lbl.contrast"),
		() => Math.round(I(l) * 100),
		() => K("lbl.saturate"),
		() => Math.round(I(u) * 100),
		() => K("ie.grayscale"),
		() => K("common.reset"),
		() => K("confirm.cancel"),
		() => K("common.apply")
	]), L("pointerdown", b, f), Gi(T, () => I(a), (e) => A(a, e)), Gi(ne, () => I(c), (e) => A(c, e)), Gi(oe, () => I(l), (e) => A(l, e)), Gi(ue, () => I(u), (e) => A(u, e)), L("click", fe, () => A(u, 0)), L("click", me, p), L("click", _e, () => t.oncancel?.()), L("click", ye, m), z(e, h), at();
}
Br(["pointerdown", "click"]);
//#endregion
//#region ../template/assets/engine/0.7.4/calendar-thumb.js
var Kx = "#0e1512", qx = "#2fd6b6", Jx = "#5c6b64", Yx = "#22302a", Xx = "#e8efe9", Zx = "#16221d", Qx = "#1c2340", $x = "#f3ecd8", eS = "#d0a74a", tS = (e) => e < 1 ? ` opacity="${e}"` : "", Z = (e, t, n, r, i, a = 1, o = 2) => `<rect x="${e}" y="${t}" width="${n}" height="${r}" rx="${o}" fill="${i}"${tS(a)}/>`, nS = (e, t, n, r, i = 1) => `<circle cx="${e}" cy="${t}" r="${n}" fill="${r}"${tS(i)}/>`, rS = (e, t, n, r, i, a = 1, o = 1) => `<line x1="${e}" y1="${t}" x2="${n}" y2="${r}" stroke="${i}" stroke-width="${a}"${tS(o)}/>`, iS = (e, t, n, r) => Array.from({ length: e }, (e, i) => r(t + i * n, i)).join(""), aS = (e, t = Kx) => `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${t}"/>${e}</svg>`;
function oS(e, t, n, r, i, a = Jx) {
	let o = "", s = n / 7, c = r / 4;
	for (let n = 0; n < 28; n++) {
		let r = e + n % 7 * s + s / 2, l = t + Math.floor(n / 7) * c + c / 2;
		o += nS(r, l, 1.6, i.includes(n) ? qx : a, i.includes(n) ? 1 : .55);
	}
	return o;
}
var sS = {
	plain: () => iS(3, 12, 20, (e) => Z(14, e, 14, 14, Yx, 1, 3) + Z(34, e + 2, 70, 4, Jx, .9) + Z(34, e + 9, 46, 3, Jx, .5)),
	timeline: () => rS(50, 10, 50, 70, Jx, 1.2, .7) + iS(3, 16, 22, (e, t) => Z(18, e - 3, 24, 5, Jx, .9) + nS(50, e, 3.4, t ? Jx : qx) + Z(60, e - 3, 62, 4, Jx, .9) + Z(60, e + 4, 40, 3, Jx, .5)),
	table: () => Z(12, 10, 136, 10, qx, 1, 3) + iS(4, 26, 12, (e, t) => (t % 2 ? Z(12, e - 3, 136, 12, Yx, .8, 0) : "") + Z(16, e, 20, 3, Jx, .9) + Z(44, e, 14, 3, Jx, .5) + Z(66, e, 44, 3, Jx, .9) + Z(118, e, 24, 3, Jx, .5)),
	booklet: () => Z(12, 8, 136, 64, Xx, 1, 2) + Z(20, 14, 40, 7, Zx) + rS(20, 26, 140, 26, Zx, 1.4) + [20, 84].map((e) => iS(3, 32, 12, (t) => Z(e, t, 8, 8, qx, 1, 1) + Z(e + 12, t, 36, 3, Zx, .85) + Z(e + 12, t + 5, 26, 2.5, Zx, .4))).join(""),
	numbered: () => iS(3, 12, 20, (e) => rS(14, e - 3, 146, e - 3, Jx, .8, .6) + Z(14, e, 14, 12, qx, 1, 2) + Z(36, e + 1, 64, 4, Jx, .9) + Z(36, e + 8, 44, 3, Jx, .5) + Z(120, e + 3, 24, 4, qx, .7)),
	apList: () => iS(3, 10, 21, (e) => Z(12, e, 136, 17, Qx, 1, 2) + Z(18, e + 4, 10, 9, eS, 1, 1) + rS(34, e + 3, 34, e + 14, eS, .8, .5) + Z(40, e + 4, 26, 3, eS, .8) + Z(40, e + 10, 56, 3.5, $x, .9)),
	glass: () => nS(30, 14, 34, "#ff8a65", .55) + nS(132, 70, 36, "#7fd1c4", .55) + nS(100, 10, 20, "#ffd36b", .4) + iS(3, 12, 20, (e) => Z(14, e, 132, 15, "#ffffff", .32, 6) + Z(20, e + 4, 9, 7, Xx, .9, 1) + Z(36, e + 4, 50, 3, Xx, .9) + Z(36, e + 9, 34, 2.5, Xx, .5)),
	posters: () => Z(12, 10, 62, 60, qx, 1, 4) + Z(20, 30, 18, 20, Zx, .9, 2) + Z(20, 56, 40, 4, Zx, .8) + Z(80, 10, 32, 28, Xx, 1, 4) + Z(86, 16, 10, 10, Zx, .8, 1) + Z(116, 10, 32, 28, "#bfe9df", 1, 4) + Z(122, 16, 10, 10, Zx, .8, 1) + Z(80, 42, 32, 28, Yx, 1, 4) + Z(86, 48, 10, 10, qx, 1, 1) + Z(116, 42, 32, 28, Yx, .5, 4),
	tickets: () => iS(3, 10, 21, (e) => Z(12, e, 136, 17, Yx, 1, 4) + Z(12, e, 30, 17, qx, 1, 4) + Z(20, e + 4, 12, 9, Zx, .85, 1) + rS(42, e + 1, 42, e + 16, Kx, 1.6) + Z(50, e + 4, 50, 3.5, Jx, .95) + Z(50, e + 10, 34, 2.5, Jx, .55) + Z(120, e + 5, 22, 7, qx, .85)),
	carousel: () => [
		12,
		50,
		88,
		126
	].map((e, t) => Z(e, 14, 34, 54, t ? Yx : qx, 1, 4) + Z(e + 6, 22, 12, 14, t ? qx : Zx, .9, 1) + Z(e + 6, 50, 22, 3, t ? Jx : Zx, .9) + Z(e + 6, 56, 14, 2.5, t ? Jx : Zx, .5)).join(""),
	photo: () => [
		12,
		60,
		108
	].map((e) => Z(e, 12, 40, 56, Yx, 1, 4) + Z(e, 12, 40, 26, qx, .45, 4) + Z(e + 4, 16, 12, 6, Xx, .95, 1) + Z(e + 5, 44, 28, 3.5, Jx, .95) + Z(e + 5, 51, 20, 2.5, Jx, .5) + Z(e + 5, 58, 14, 5, qx, .9)).join(""),
	apGrid: () => [
		12,
		60,
		108
	].map((e) => Z(e, 12, 40, 56, $x, 1, 2) + Z(e, 12, 40, 16, Qx, 1, 2) + rS(e, 28, e + 40, 28, eS, 1.4) + Z(e + 4, 16, 8, 8, eS, 1, 1) + Z(e + 22, 18, 14, 4, eS, .9) + Z(e + 5, 36, 28, 4, Qx, .9) + Z(e + 5, 44, 18, 2.5, Qx, .55) + Z(e + 5, 52, 24, 2.5, Qx, .4)).join(""),
	bento: () => Z(12, 10, 66, 40, Xx, 1, 6) + Z(18, 14, 16, 5, qx, 1, 2) + Z(18, 28, 14, 14, Zx, .9, 1) + Z(36, 38, 34, 4, Zx, .8) + Z(82, 10, 31, 18, Yx, 1, 5) + Z(117, 10, 31, 18, Yx, 1, 5) + Z(82, 32, 66, 18, Yx, 1, 5) + oS(86, 34, 58, 14, [
		9,
		12,
		19
	]) + Z(12, 54, 31, 18, Xx, 1, 5) + Z(47, 54, 31, 18, qx, .4, 5) + Z(82, 54, 66, 18, Yx, 1, 5) + Z(88, 60, 30, 4, Jx, .9),
	weekStrip: () => Z(60, 8, 40, 5, Jx, .9) + Array.from({ length: 7 }, (e, t) => Z(12 + t * 19.6, 20, 17, 50, t === 3 ? qx : Yx, t === 3 ? .25 : 1, 3) + Z(15 + t * 19.6, 24, 6, 5, Jx, .9, 1) + ([
		1,
		3,
		5
	].includes(t) ? Z(14 + t * 19.6, 36, 13, 7, qx, 1, 2) : "")).join(""),
	weekPlan: () => Z(12, 8, 136, 64, Yx, .6, 3) + iS(4, 22, 12, (e) => rS(12, e, 148, e, Jx, .6, .6)) + Array.from({ length: 7 }, (e, t) => rS(30 + t * 17, 14, 30 + t * 17, 72, Jx, .6, .6)).join("") + Z(82, 14, 16, 58, qx, .14, 0) + Z(49, 36, 13, 10, qx, .9, 2) + Z(83, 48, 13, 14, qx, .9, 2) + Z(117, 24, 13, 9, Xx, .7, 2),
	layers: () => Z(12, 8, 136, 64, Yx, .6, 3) + Z(70, 12, 22, 6, qx, .9, 3) + Z(96, 12, 22, 6, Xx, .7, 3) + Z(122, 12, 22, 6, Jx, .6, 3) + iS(3, 26, 15, (e, t) => rS(12, e - 2, 148, e - 2, Jx, .6, .6) + Z(16, e + 3, 16, 3, Jx, .9) + Z([
		44,
		62,
		100
	][t], e + 1, [
		46,
		22,
		40
	][t], 8, [
		qx,
		Xx,
		"#7fd1c4"
	][t], .9, 3)),
	sidepanel: () => Z(12, 8, 136, 64, Yx, .6, 3) + oS(18, 18, 76, 48, [
		5,
		10,
		17,
		24
	]) + Z(100, 8, 48, 64, Yx, 1, 3) + Z(106, 14, 26, 5, Xx, .9) + iS(2, 26, 16, (e) => Z(106, e, 36, 12, Kx, 1, 2) + rS(106, e, 106, e + 12, qx, 2) + Z(111, e + 3, 24, 3, Jx, .9)),
	apMonth: () => Z(12, 8, 136, 64, $x, 1, 2) + rS(12, 8, 148, 8, eS, 2.4) + Z(58, 13, 44, 5, Qx, .9) + iS(4, 26, 12, (e) => rS(12, e, 148, e, eS, .6, .5)) + Array.from({ length: 6 }, (e, t) => rS(31.4 + t * 19.4, 26, 31.4 + t * 19.4, 72, eS, .6, .5)).join("") + Z(54, 40, 14, 5, eS, .6, 0) + rS(54, 40, 54, 45, eS, 2) + Z(112, 52, 14, 5, eS, .6, 0) + rS(112, 52, 112, 57, eS, 2) + nS(98, 32, 3.4, eS),
	dayPlan: () => Z(34, 6, 92, 68, Yx, .6, 5) + Z(42, 12, 40, 5, Xx, .9) + Array.from({ length: 7 }, (e, t) => Z(42 + t * 11, 22, 8, 9, t === 2 ? qx : Yx, 1, 2)).join("") + iS(4, 38, 9, (e) => rS(34, e, 126, e, Jx, .6, .6)) + Z(56, 39, 62, 7, Xx, .5, 2) + Z(56, 57, 62, 7, qx, .5, 2) + rS(48, 51, 126, 51, qx, 1.4) + nS(48, 51, 2.2, qx),
	yearWheel: () => `<circle cx="46" cy="40" r="24" fill="none" stroke="${Yx}" stroke-width="9"/><circle cx="46" cy="40" r="24" fill="none" stroke="${Jx}" stroke-width="9" stroke-dasharray="100 151" transform="rotate(-90 46 40)"${tS(.8)}/><circle cx="46" cy="40" r="24" fill="none" stroke="${qx}" stroke-width="9" stroke-dasharray="13 151" stroke-dashoffset="-100" transform="rotate(-90 46 40)"/>` + nS(24, 32, 2, Xx) + nS(26, 50, 2, Xx) + nS(60, 60, 2, Xx, .5) + Z(38, 37, 16, 6, Xx, .9) + Z(88, 20, 20, 4, qx) + iS(3, 30, 13, (e) => Z(88, e, 56, 9, Yx, 1, 2) + Z(92, e + 3, 34, 3, Jx, .9)),
	heatmap: () => Z(12, 8, 136, 64, Yx, .6, 3) + Array.from({ length: 3 }, (e, t) => Array.from({ length: 28 }, (e, n) => Z(18 + t * 44 + n % 7 * 5.4, 16 + Math.floor(n / 7) * 5.4, 4.2, 4.2, [
		3,
		11,
		16,
		24
	].includes((n + t * 5) % 28) ? qx : Jx, [
		3,
		11,
		16,
		24
	].includes((n + t * 5) % 28) ? 1 : (n * 7 + t) % 5 == 0 ? .6 : .28, 1)).join("")).join("") + Z(18, 46, 124, 9, Kx, .8, 2) + Z(22, 49, 30, 3, Xx, .8),
	billboard: () => Z(34, 6, 92, 68, Zx, 1, 6) + nS(42, 14, 2, qx) + Z(48, 12, 24, 4, qx, .9) + Z(42, 22, 60, 7, Xx, .95) + [
		42,
		70,
		98
	].map((e) => Z(e, 36, 22, 16, Yx, 1, 3) + Z(e + 6, 40, 10, 7, Xx, .9, 1)).join("") + Z(42, 58, 78, 9, qx, 1, 3),
	stacked: () => Z(54, 10, 70, 44, Yx, .7, 5) + Z(46, 16, 70, 44, Yx, 1, 5) + Z(38, 22, 70, 44, Xx, 1, 5) + Z(44, 28, 22, 6, qx, 1, 3) + Z(44, 40, 44, 5, Zx, .9) + Z(44, 49, 30, 3, Zx, .5) + Z(44, 56, 20, 6, qx, 1, 2),
	noticeboard: () => Z(34, 6, 92, 68, "#8a5a3c", 1, 5) + Z(42, 14, 64, 28, "#fff7cc", 1, 0) + nS(74, 14, 3, "#d33a2c") + Z(48, 22, 40, 5, Zx, .9) + Z(48, 31, 28, 3, Zx, .5) + Z(48, 46, 58, 20, "#d9ecff", 1, 0) + nS(54, 46, 2.6, "#2f6fd6") + Z(54, 53, 36, 4, Zx, .85) + Z(54, 60, 44, 2.5, Zx, .45),
	split: () => Z(16, 10, 128, 60, Yx, 1, 6) + Z(16, 10, 44, 42, qx, 1, 6) + Z(24, 22, 20, 22, Zx, .9, 2) + Z(68, 16, 20, 5, Jx, .7, 2) + Z(68, 26, 58, 6, Xx, .95) + Z(68, 36, 40, 3, Jx, .7) + rS(16, 52, 144, 52, Jx, .6, .6) + Z(24, 58, 60, 3, Jx, .8) + Z(24, 64, 44, 2.5, Jx, .5),
	band: () => Z(8, 30, 144, 20, qx, 1, 0) + Z(8, 30, 40, 20, Zx, 1, 0) + nS(16, 40, 2, qx) + Z(22, 38, 20, 4, Xx, .9) + Z(56, 38, 34, 4, Zx, .85) + nS(96, 40, 1.8, Zx) + Z(102, 38, 34, 4, Zx, .85) + nS(142, 40, 1.8, Zx),
	oneLine: () => iS(3, 12, 20, (e, t) => Z(12, e, 136, 15, Yx, t ? .7 : 1, 4) + rS(12, e + 1, 12, e + 14, t ? Jx : qx, 3) + nS(22, e + 7.5, 2.4, t ? Jx : qx) + Z(30, e + 5.5, 20, 4, t ? Jx : qx, .9) + Z(56, e + 5.5, 54, 4, Jx, .9) + (t ? "" : Z(124, e + 4, 18, 7, qx, 1, 2))),
	ring: () => Z(30, 6, 100, 68, Yx, 1, 8) + `<circle cx="58" cy="34" r="15" fill="none" stroke="${Jx}" stroke-width="5"${tS(.5)}/><circle cx="58" cy="34" r="15" fill="none" stroke="${qx}" stroke-width="5" stroke-linecap="round" stroke-dasharray="70 94" transform="rotate(-90 58 34)"/>` + Z(53, 31, 10, 6, Xx, .9, 1) + Z(82, 24, 38, 6, Xx, .95) + Z(82, 35, 28, 3, Jx, .8) + rS(38, 56, 122, 56, Jx, .6, .6) + Z(38, 61, 50, 3, Jx, .7) + Z(38, 67, 40, 3, Jx, .5),
	darkGlass: () => Z(34, 6, 92, 68, "#121216", 1, 7) + nS(112, 16, 22, qx, .45) + nS(46, 68, 20, "#3fb8a4", .35) + nS(42, 14, 2, qx) + Z(48, 12, 22, 4, qx, .9) + Z(42, 22, 56, 6, Xx, .95) + Z(42, 34, 76, 3, Jx, .6, 1.5) + Z(42, 34, 60, 3, qx, 1, 1.5) + Z(42, 42, 36, 9, Xx, 1, 3) + Z(82, 42, 36, 9, Xx, .18, 3) + Z(42, 56, 76, 14, Xx, .1, 3) + Z(47, 61, 40, 3, Xx, .7),
	nextBento: () => Z(40, 8, 80, 26, qx, 1, 6) + Z(46, 13, 22, 4, Zx, .8) + Z(46, 23, 44, 5, Zx, .9) + Z(40, 38, 38, 16, Yx, 1, 5) + Z(82, 38, 38, 16, Yx, 1, 5) + Z(40, 58, 38, 16, Xx, 1, 5) + Z(82, 58, 38, 16, qx, .4, 5) + Z(46, 42, 8, 7, Xx, .9, 1) + Z(88, 42, 8, 7, Xx, .9, 1) + Z(46, 62, 8, 7, Zx, .9, 1),
	apNow: () => Z(40, 6, 80, 68, $x, 1, 5) + Z(40, 6, 80, 12, Qx, 1, 5) + nS(47, 12, 1.8, eS) + Z(52, 10, 22, 4, eS, .9) + Z(46, 24, 14, 14, Qx, 1, 2) + Z(50, 28, 6, 6, eS, 1, 1) + Z(66, 25, 44, 5, Qx, .9) + Z(66, 34, 32, 3, Qx, .5) + Z(40, 46, 80, 28, "#eae1c7", 1, 0) + rS(48, 54, 48, 66, eS, 1) + nS(48, 54, 1.8, eS) + nS(48, 66, 1.8, eS) + Z(54, 52, 40, 3.5, Qx, .8) + Z(54, 64, 34, 3.5, Qx, .8),
	apNavy: () => Z(40, 6, 80, 68, Qx, 1, 5) + nS(47, 13, 1.8, eS) + Z(52, 11, 22, 4, eS, .9) + Z(46, 20, 68, 22, $x, 1, 3) + Z(51, 25, 8, 10, eS, 1, 1) + Z(64, 25, 40, 5, Qx, .9) + Z(64, 34, 26, 3, Qx, .5) + `<rect x="46" y="46" width="68" height="14" rx="3" fill="#262e4f" stroke="${eS}" stroke-width="0.8"/>` + Z(51, 50, 7, 6, eS, 1, 1) + Z(64, 51, 36, 4, $x, .85) + Z(46, 66, 50, 3, $x, .6),
	apSeries: () => Z(12, 8, 136, 64, "#f5efdd", 1, 2) + rS(20, 17, 34, 17, eS, 1) + Z(38, 15, 26, 3.5, eS, .9) + Z(20, 24, 58, 8, "#7a1a1a") + Z(20, 38, 64, 3, Qx, .6) + Z(20, 44, 52, 3, Qx, .6) + [
		20,
		46,
		72
	].map((e) => Z(e, 54, 12, 2.5, eS, .9) + Z(e, 60, 20, 3.5, Qx, .8)).join("") + rS(100, 14, 100, 66, eS, .8, .6) + Z(108, 18, 30, 8, "#7a1a1a", .85) + Z(108, 32, 32, 2.5, Qx, .5) + Z(108, 38, 26, 2.5, Qx, .5),
	mobileAgenda: () => Z(50, 4, 60, 72, "#121216", 1, 8) + Z(56, 10, 22, 4, Xx, .9) + Array.from({ length: 7 }, (e, t) => Z(56 + t * 7.1, 18, 5.6, 9, t === 2 ? qx : Yx, 1, 2)).join("") + iS(3, 32, 14, (e) => Z(56, e, 48, 11, "#1c1c22", 1, 3) + rS(67, e + 2, 67, e + 9, qx, 1.4) + Z(58, e + 4, 6, 3, Jx, .8) + Z(70, e + 3, 26, 3, Xx, .85))
};
Object.keys(sS);
function cS(e) {
	let t = sS[e] ?? sS.plain, n = ["booklet"].includes(e);
	return aS(t(), n ? "#1a2620" : Kx);
}
//#endregion
//#region src/lib/DesignPicker.svelte
var lS = /* @__PURE__ */ R("<button type=\"button\"> </button>"), uS = /* @__PURE__ */ R("<img alt=\"\" loading=\"lazy\" decoding=\"async\" class=\"svelte-wurosr\"/>"), dS = /* @__PURE__ */ R("<span class=\"dp-mark svelte-wurosr\"> </span>"), fS = /* @__PURE__ */ R("<button type=\"button\"><span class=\"dp-pic svelte-wurosr\"><!></span> <span class=\"dp-name svelte-wurosr\"> </span> <!></button>"), pS = /* @__PURE__ */ R("<section class=\"dp-family svelte-wurosr\"><h3 class=\"svelte-wurosr\"> </h3> <div class=\"dp-grid svelte-wurosr\"></div></section>"), mS = /* @__PURE__ */ R("<p class=\"dp-none svelte-wurosr\"> </p>"), hS = /* @__PURE__ */ R("<span class=\"dp-side-view svelte-wurosr\"> </span>"), gS = /* @__PURE__ */ R("<dialog class=\"dp-overlay svelte-wurosr\"><div class=\"dp-card svelte-wurosr\"><div class=\"dp-head svelte-wurosr\"><h2 class=\"svelte-wurosr\"> </h2> <input class=\"dp-search svelte-wurosr\" type=\"search\"/> <span class=\"dp-count svelte-wurosr\"> </span> <button type=\"button\" class=\"dp-close svelte-wurosr\"><svg viewBox=\"0 0 16 16\" width=\"16\" height=\"16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" aria-hidden=\"true\"><path d=\"M3 3l10 10M13 3L3 13\"></path></svg></button></div> <div class=\"dp-views svelte-wurosr\" role=\"group\"><button type=\"button\"> </button> <!></div> <div class=\"dp-body svelte-wurosr\"><div class=\"dp-list svelte-wurosr\"><!> <!></div> <aside class=\"dp-side svelte-wurosr\"><div class=\"dp-side-head svelte-wurosr\"><strong> </strong> <!></div> <div class=\"dp-preview svelte-wurosr\"><div class=\"dp-stage svelte-wurosr\"><iframe src=\"/?preview=1\" class=\"svelte-wurosr\"></iframe></div></div> <button type=\"button\" class=\"dp-use svelte-wurosr\"> </button></aside></div></div></dialog>");
function _S(e, t) {
	it(t, !0);
	let n = ra(t, "current", 3, null), r = ra(t, "mode", 3, "set"), i = ra(t, "site", 3, null), a = ra(t, "page", 3, null), o = {
		list: "calendar.viewList",
		cards: "calendar.viewCards",
		month: "calendar.viewMonth",
		agenda: "calendar.viewAgenda",
		next: "calendar.viewNext",
		week: "calendar.viewWeek",
		day: "calendar.viewDay",
		year: "calendar.viewYear"
	}, s = 1040, c = /* @__PURE__ */ k(""), l = /* @__PURE__ */ k(""), u = /* @__PURE__ */ k(pn(n() ?? "plain")), d = /* @__PURE__ */ k(pn(/* @__PURE__ */ new Set())), f = /* @__PURE__ */ k(null), p = /* @__PURE__ */ k(0), m = /* @__PURE__ */ k(!1), h = /* @__PURE__ */ k(600), g = /* @__PURE__ */ k(null), _ = /* @__PURE__ */ k(null), v = (e) => !I(l) || e.view === null || e.view === I(l), y = (e) => v(e) && (!I(c).trim() || K(e.labelKey).toLowerCase().includes(I(c).trim().toLowerCase())), b = /* @__PURE__ */ O(() => Um().map((e) => ({
		...e,
		designs: e.designs.filter(y)
	})).filter((e) => e.designs.length)), x = /* @__PURE__ */ O(() => I(b).reduce((e, t) => e + t.designs.length, 0)), S = /* @__PURE__ */ O(() => rh(I(u))), C = /* @__PURE__ */ O(() => I(p) ? Math.min(1, I(p) / s) : .4);
	Nn(() => {
		I(_) && !I(_).open && I(_).showModal(), I(g)?.focus();
	});
	function w(e) {
		let t = rh(e), n = {
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
	let T = (e) => I(f)?.contentWindow?.postMessage(e, location.origin);
	function E() {
		let e = I(f)?.contentDocument, t = e?.querySelector(".urd-block[data-block-id=\"design-picker-cal\"]");
		if (!t) return;
		let n = t.getBoundingClientRect().bottom + (e.defaultView?.scrollY ?? 0), r = Math.max(160, Math.ceil(n + 24));
		r !== I(h) && A(h, r, !0);
	}
	let ee = null, te = null;
	function ne() {
		ee?.disconnect(), ee = null;
		let e = I(f)?.contentWindow;
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
			page: w(I(u))
		}), ne();
	}
	function ie(e) {
		if (e.origin !== location.origin || e.source !== I(f)?.contentWindow || e.data?.type !== "urd-ready") return;
		let t = I(f)?.contentDocument;
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
		}), A(m, !0);
	}
	Nn(() => {
		I(u), I(m) && re();
	}), Nn(() => () => ee?.disconnect());
	function ae() {
		t.onclose?.();
	}
	function oe(e) {
		A(d, /* @__PURE__ */ new Set([...I(d), e]), !0);
	}
	var se = gS();
	zr("message", mn, ie);
	var ce = j(se), le = j(ce), ue = j(le), de = N(ue, !0), fe = P(ue, 2);
	U(fe), Zi(fe, (e) => A(g, e), () => I(g));
	var pe = P(fe, 2), me = N(pe, !0), he = P(pe, 2);
	D(le);
	var ge = P(le, 2), _e = j(ge);
	let ve;
	var ye = N(_e, !0);
	ui(P(_e, 2), 16, () => Fm, (e) => e, (e, t) => {
		var n = lS();
		let r;
		var i = N(n, !0);
		F((e) => {
			G(n, "aria-pressed", I(l) === t), r = Pi(n, 1, "svelte-wurosr", null, r, { on: I(l) === t }), B(i, e);
		}, [() => K(o[t])]), L("click", n, () => A(l, t, !0)), z(e, n);
	}), D(ge);
	var be = P(ge, 2), xe = j(be), Se = j(xe);
	ui(Se, 17, () => I(b), (e) => e.family, (e, r) => {
		var i = pS(), a = j(i), o = N(a, !0), s = P(a, 2);
		ui(s, 21, () => I(r).designs, (e) => e.id, (e, r) => {
			var i = fS();
			let a;
			var o = j(i), s = j(o), c = (e) => {
				var t = Yr();
				H(M(t), () => cS(I(r).id)), z(e, t);
			}, l = /* @__PURE__ */ O(() => I(d).has(I(r).id)), f = (e) => {
				var t = uS();
				F(() => G(t, "src", `/admin/designs/${I(r).id}.webp`)), zr("error", t, () => oe(I(r).id)), Lr(t), z(e, t);
			};
			V(s, (e) => {
				I(l) ? e(c) : e(f, -1);
			}), D(o);
			var p = P(o, 2), m = N(p, !0), h = P(p, 2), g = (e) => {
				var t = dS(), n = N(t, !0);
				F((e) => B(n, e), [() => K("calendar.picker.current")]), z(e, t);
			};
			V(h, (e) => {
				n() !== null && I(r).id === n() && e(g);
			}), D(i), F((e, t) => {
				a = Pi(i, 1, "dp-tile svelte-wurosr", null, a, {
					on: I(r).id === I(u),
					current: n() !== null && I(r).id === n()
				}), G(i, "aria-pressed", I(r).id === I(u)), G(i, "title", e), B(m, t);
			}, [() => K(I(r).labelKey), () => K(I(r).labelKey)]), L("click", i, () => A(u, I(r).id, !0)), L("dblclick", i, () => t.onpick?.(I(r).id)), z(e, i);
		}), D(s), D(i), F((e) => B(o, e), [() => K(I(r).labelKey)]), z(e, i);
	});
	var Ce = P(Se, 2), we = (e) => {
		var t = mS(), n = N(t, !0);
		F((e) => B(n, e), [() => K("calendar.picker.none")]), z(e, t);
	};
	V(Ce, (e) => {
		I(b).length || e(we);
	}), D(xe);
	var Te = P(xe, 2), Ee = j(Te), De = j(Ee), Oe = N(De, !0), ke = P(De, 2), Ae = (e) => {
		var t = hS(), n = N(t, !0);
		F((e) => B(n, e), [() => K(o[I(S).view])]), z(e, t);
	};
	V(ke, (e) => {
		I(S).view && e(Ae);
	}), D(Ee);
	var je = P(Ee, 2), Me = j(je), Ne = j(Me);
	Zi(Ne, (e) => A(f, e), () => I(f)), D(Me), D(je);
	var Pe = P(je, 2), Fe = N(Pe, !0);
	D(Te), D(be), D(ce), D(se), Zi(se, (e) => A(_, e), () => I(_)), F((e, t, n, r, i, a, o, c, u, d, f) => {
		G(se, "aria-label", e), B(de, t), G(fe, "placeholder", n), G(fe, "aria-label", r), B(me, i), G(he, "aria-label", a), G(he, "title", o), G(_e, "aria-pressed", I(l) === ""), ve = Pi(_e, 1, "svelte-wurosr", null, ve, { on: I(l) === "" }), B(ye, c), B(Oe, u), Ii(Me, `width:${s * I(C)}px; height:${I(h) * I(C)}px`), G(Ne, "title", d), Ii(Ne, `width:1040px; height:${I(h) ?? ""}px; transform:scale(${I(C) ?? ""}); transform-origin:top left`), B(Fe, f);
	}, [
		() => K("calendar.picker.title"),
		() => K("calendar.picker.title"),
		() => K("calendar.picker.search"),
		() => K("calendar.picker.search"),
		() => K("calendar.picker.count", { n: I(x) }),
		() => K("ui.close"),
		() => K("ui.close"),
		() => K("calendar.picker.all"),
		() => K(I(S).labelKey),
		() => K("calendar.picker.preview", { name: K(I(S).labelKey) }),
		() => r() === "add" ? K("calendar.picker.add") : K("calendar.picker.use")
	]), zr("close", se, ae), Gi(fe, () => I(c), (e) => A(c, e)), L("click", he, () => t.onclose?.()), L("click", _e, () => A(l, "")), Yi(je, "clientWidth", (e) => A(p, e)), L("click", Pe, () => t.onpick?.(I(u))), z(e, se), at();
}
Br(["click", "dblclick"]);
//#endregion
//#region src/menu/FloatingMenu.svelte
var vS = /* @__PURE__ */ R("<button class=\"ghost row-tool\"></button>"), yS = /* @__PURE__ */ R("<div><header class=\"block-menu-head\"><span class=\"block-menu-grip\" aria-hidden=\"true\"></span> <span class=\"block-menu-title\"> </span> <!> <!> <button class=\"ghost row-tool menu-width\"></button> <button class=\"ghost row-tool\"></button></header> <div class=\"panel-body block-menu-body\"><!></div></div>");
function bS(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { moveBlockMenu: i, menuBackToBlock: a } = n, o = /* @__PURE__ */ k(!1);
	function s(e) {
		if (e.button !== 0 || e.target.closest("button, input, label")) return;
		e.preventDefault();
		let n = e.currentTarget, r = n.closest(".block-menu"), a = {
			w: r.offsetWidth,
			h: r.offsetHeight
		}, s = {
			x: e.clientX,
			y: e.clientY,
			left: t.pos.left,
			top: t.pos.top
		};
		n.setPointerCapture(e.pointerId), A(o, !0);
		let c = (e) => i({
			left: s.left + (e.clientX - s.x),
			top: s.top + (e.clientY - s.y)
		}, a), l = () => {
			n.removeEventListener("pointermove", c), n.removeEventListener("pointerup", l), n.removeEventListener("pointercancel", l), A(o, !1);
		};
		n.addEventListener("pointermove", c), n.addEventListener("pointerup", l), n.addEventListener("pointercancel", l);
	}
	var c = yS();
	let l;
	var u = j(c), d = j(u);
	H(d, () => "<svg width=\"10\" height=\"16\" viewBox=\"0 0 12 18\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"3\" cy=\"3\" r=\"1.6\"/><circle cx=\"9\" cy=\"3\" r=\"1.6\"/><circle cx=\"3\" cy=\"9\" r=\"1.6\"/><circle cx=\"9\" cy=\"9\" r=\"1.6\"/><circle cx=\"3\" cy=\"15\" r=\"1.6\"/><circle cx=\"9\" cy=\"15\" r=\"1.6\"/></svg>", !0), D(d);
	var f = P(d, 2), p = N(f, !0), m = P(f, 2);
	mb(m, {
		get: () => Uh.menuQuery,
		set: (e) => Uh.menuQuery = e
	});
	var h = P(m, 2), g = (e) => {
		var t = vS();
		H(t, () => "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1\"/><path d=\"M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1\"/></svg>", !0), D(t), F((e, n) => {
			G(t, "title", e), G(t, "aria-label", n);
		}, [() => K("menu.backToBlock"), () => K("menu.backToBlock")]), L("click", t, a), z(e, t);
	};
	V(h, (e) => {
		Uh.place && e(g);
	});
	var _ = P(h, 2);
	H(_, () => Uh.wide ? "<svg viewBox=\"0 0 18 18\" width=\"14\" height=\"14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M2 4l4 5-4 5M16 4l-4 5 4 5\"/></svg>" : "<svg viewBox=\"0 0 18 18\" width=\"14\" height=\"14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M6 4L2 9l4 5M12 4l4 5-4 5\"/></svg>", !0), D(_);
	var v = P(_, 2);
	H(v, () => q.cross, !0), D(v), D(u);
	var y = P(u, 2), b = j(y);
	{
		let e = /* @__PURE__ */ O(Wh);
		fb(b, {
			get wide() {
				return I(e);
			},
			get query() {
				return Uh.menuQuery;
			}
		});
	}
	D(y), D(c), F((e, n, r, i, a, s) => {
		l = Pi(c, 1, "block-menu", null, l, {
			wide: e,
			dragging: I(o)
		}), Ii(c, `--menu-left: ${t.pos.left ?? ""}px; --menu-top: ${t.pos.top ?? ""}px; --menu-min: ${Uh.min ?? ""}px`), G(u, "title", n), B(p, r), G(_, "title", i), G(_, "aria-label", a), G(v, "title", s);
	}, [
		() => Wh(),
		() => K("tip.menu.dragHead"),
		() => K("blocks.suffix", { label: n.blockLabel(I(r).type) }),
		() => Uh.wide ? K("menu.toNarrow") : K("menu.toWide"),
		() => Uh.wide ? K("menu.toNarrow") : K("menu.toWide"),
		() => K("tip.closeEsc")
	]), L("pointerdown", u, s), L("click", _, () => Uh.wide = !Uh.wide), L("click", v, function(...e) {
		t.onclose?.apply(this, e);
	}), z(e, c), at();
}
//#endregion
//#region node_modules/svelte/src/internal/flags/legacy.js
Br(["pointerdown", "click"]), Je();
//#endregion
//#region node_modules/svelte/src/transition/index.js
function xS(e) {
	let t = e - 1;
	return t * t * t + 1;
}
function SS(e) {
	let t = typeof e == "string" && e.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
	return t ? [parseFloat(t[1]), t[2] || "px"] : [e, "px"];
}
function CS(e, { delay: t = 0, duration: n = 400, easing: r = xS, x: i = 0, y: a = 0, opacity: o = 0 } = {}) {
	let s = getComputedStyle(e), c = +s.opacity, l = s.transform === "none" ? "" : s.transform, u = c * (1 - o), [d, f] = SS(i), [p, m] = SS(a);
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
//#region src/shell/TopBar.svelte
var wS = /* @__PURE__ */ R("<button><!> </button>"), TS = /* @__PURE__ */ R("<div class=\"tool-pop\"></div>"), ES = /* @__PURE__ */ R("<span class=\"toolmenu\"><button><!><!></button> <!></span>"), DS = /* @__PURE__ */ R("<button></button>"), OS = /* @__PURE__ */ R("<span class=\"tool-cap\"> </span> <span class=\"viewswitch toolgrp\"></span>", 1), kS = /* @__PURE__ */ R("<div class=\"tool-pop\"><div class=\"tool-pop-row\"><button class=\"ghost\"></button> <span class=\"zoom-readout\"> </span> <button class=\"ghost\"></button></div> <button><!> </button></div>"), AS = /* @__PURE__ */ R("<span class=\"toolmenu\"><button><span class=\"zoom-cap\"> </span><!></button> <!></span>"), jS = /* @__PURE__ */ R("<span class=\"tool-cap\"> </span> <span class=\"zoomswitch toolgrp\"><button class=\"ghost\"></button> <span class=\"zoom-readout\"> </span> <button class=\"ghost\"></button> <button></button></span>", 1), MS = /* @__PURE__ */ R("<div class=\"tool-pop\"><button><!> </button> <button><!> </button></div>"), NS = /* @__PURE__ */ R("<span class=\"tool-cap\"> </span> <span class=\"toolgrp\"><button></button> <button></button></span>", 1), PS = /* @__PURE__ */ R("<button class=\"ghost page-btn\"> </button> <span class=\"toolset\"><!> <!> <!></span>", 1), FS = /* @__PURE__ */ R("<button class=\"badge attention\"><!> <span class=\"btn-label\"> </span> <span class=\"badge-mini\"> </span></button>"), IS = /* @__PURE__ */ R("<button class=\"discard-confirm\"><!> </button>"), LS = /* @__PURE__ */ R("<span class=\"draft-cluster\"><span class=\"chip draft-chip\"><span class=\"chip-full\" aria-hidden=\"true\"> </span> <span class=\"chip-mini\" aria-hidden=\"true\">!</span></span>  <span class=\"discard-wrap\"><button><!><span class=\"discard-label\"> </span></button> <!></span></span>"), RS = /* @__PURE__ */ R("<!> <span class=\"btn-label\"> </span>", 1), zS = /* @__PURE__ */ R("<span class=\"who\"><!> </span>"), BS = /* @__PURE__ */ R("<a class=\"ghost\" href=\"/api/github/login\"> </a>"), VS = /* @__PURE__ */ R("<button class=\"ghost\"><!></button> <!> <a class=\"ghost\" target=\"_blank\" rel=\"noopener\"><!> <span class=\"btn-label\"> </span></a> <button class=\"primary\"> </button>", 1), HS = /* @__PURE__ */ R("<header><span class=\"topbar-group\"><!> <!></span> <span class=\"topbar-group topbar-draft\"><!></span> <span class=\"topbar-group topbar-right\"><!></span></header>");
function US(e, t) {
	it(t, !1);
	let n = /* @__PURE__ */ an(nt("urd-editor"));
	$i();
	var r = HS();
	let i;
	var a = j(r), o = j(a), s = (e) => {
		var t = PS(), r = M(t), i = N(r, !0), a = P(r, 2), o = j(a), s = (e) => {
			var t = ES(), r = j(t);
			let i;
			var a = j(r);
			H(a, () => q[`device_${I(n).deviceId}`]), H(P(a), () => q.caret), D(r);
			var o = P(r, 2), s = (e) => {
				var t = TS();
				ui(t, 5, () => I(n).devices, (e) => e.id, (e, t) => {
					var r = wS();
					let i;
					var a = j(r);
					H(a, () => q[`device_${I(t).id}`]);
					var o = P(a);
					D(r), F((e, a) => {
						i = Pi(r, 1, "ghost", null, i, { active: I(n).deviceId === I(t).id }), G(r, "title", e), B(o, ` ${a ?? ""}`);
					}, [() => I(n).deviceTip(I(t)), () => K(`lbl.device.${I(t).id}`)]), L("click", r, () => {
						on(n, I(n).deviceId = I(t).id), on(n, I(n).toolMenu = null);
					}), z(e, r);
				}), D(t), z(e, t);
			};
			V(o, (e) => {
				I(n).toolMenu === "device" && e(s);
			}), D(t), F((e) => {
				i = Pi(r, 1, "ghost", null, i, { active: I(n).toolMenu === "device" }), G(r, "title", e);
			}, [() => K("lbl.group.device")]), L("click", r, () => on(n, I(n).toolMenu = I(n).toolMenu === "device" ? null : "device")), z(e, t);
		}, c = (e) => {
			var t = OS(), r = M(t), i = N(r, !0), a = P(r, 2);
			ui(a, 5, () => I(n).devices, (e) => e.id, (e, t) => {
				var r = DS();
				let i;
				H(r, () => q[`device_${I(t).id}`], !0), D(r), F((e) => {
					i = Pi(r, 1, "ghost", null, i, { active: I(n).deviceId === I(t).id }), G(r, "title", e);
				}, [() => I(n).deviceTip(I(t))]), L("click", r, () => on(n, I(n).deviceId = I(t).id)), z(e, r);
			}), D(a), F((e) => B(i, e), [() => K("lbl.group.device")]), z(e, t);
		};
		V(o, (e) => {
			I(n).folded.device ? e(s) : e(c, -1);
		});
		var l = P(o, 2), u = (e) => {
			var t = AS(), r = j(t);
			let i;
			var a = j(r), o = N(a);
			H(P(a), () => q.caret), D(r);
			var s = P(r, 2), c = (e) => {
				var t = kS(), r = j(t), i = j(r);
				H(i, () => q.minus, !0), D(i);
				var a = P(i, 2), o = N(a), s = P(a, 2);
				H(s, () => q.plus, !0), D(s), D(r);
				var c = P(r, 2);
				let l;
				var u = j(c);
				H(u, () => q.fit);
				var d = P(u);
				D(c), D(t), F((e, t, r, u, f, p) => {
					G(i, "title", e), G(a, "title", t), B(o, `${r ?? ""}%`), G(s, "title", u), l = Pi(c, 1, "ghost", null, l, { active: I(n).zoomMode === "fit" }), G(c, "title", f), B(d, ` ${p ?? ""}`);
				}, [
					() => K("tip.zoomOut"),
					() => K("tip.zoomCurrent"),
					() => Math.round(I(n).scale * 100),
					() => K("tip.zoomIn"),
					() => K("tip.zoomFit"),
					() => K("lbl.zoom.fit")
				]), L("click", i, () => I(n).stepZoom(-1)), L("click", s, () => I(n).stepZoom(1)), L("click", c, () => on(n, I(n).zoomMode = "fit")), z(e, t);
			};
			V(s, (e) => {
				I(n).toolMenu === "zoom" && e(c);
			}), D(t), F((e, t) => {
				i = Pi(r, 1, "ghost", null, i, { active: I(n).toolMenu === "zoom" }), G(r, "title", e), B(o, `${t ?? ""}%`);
			}, [() => K("lbl.group.zoom"), () => Math.round(I(n).scale * 100)]), L("click", r, () => on(n, I(n).toolMenu = I(n).toolMenu === "zoom" ? null : "zoom")), z(e, t);
		}, d = (e) => {
			var t = jS(), r = M(t), i = N(r, !0), a = P(r, 2), o = j(a);
			H(o, () => q.minus, !0), D(o);
			var s = P(o, 2), c = N(s), l = P(s, 2);
			H(l, () => q.plus, !0), D(l);
			var u = P(l, 2);
			let d;
			H(u, () => q.fit, !0), D(u), D(a), F((e, t, r, a, f, p) => {
				B(i, e), G(o, "title", t), G(s, "title", r), B(c, `${a ?? ""}%`), G(l, "title", f), d = Pi(u, 1, "ghost", null, d, { active: I(n).zoomMode === "fit" }), G(u, "title", p);
			}, [
				() => K("lbl.group.zoom"),
				() => K("tip.zoomOut"),
				() => K("tip.zoomCurrent"),
				() => Math.round(I(n).scale * 100),
				() => K("tip.zoomIn"),
				() => K("tip.zoomFit")
			]), L("click", o, () => I(n).stepZoom(-1)), L("click", l, () => I(n).stepZoom(1)), L("click", u, () => on(n, I(n).zoomMode = "fit")), z(e, t);
		};
		V(l, (e) => {
			I(n).folded.zoom ? e(u) : e(d, -1);
		});
		var f = P(l, 2), p = (e) => {
			var t = ES(), r = j(t);
			let i;
			var a = j(r);
			H(a, () => q.gridToggle), H(P(a), () => q.caret), D(r);
			var o = P(r, 2), s = (e) => {
				var t = MS(), r = j(t);
				let i;
				var a = j(r);
				H(a, () => q.gridToggle);
				var o = P(a);
				D(r);
				var s = P(r, 2);
				let c;
				var l = j(s);
				H(l, () => q.guides);
				var u = P(l);
				D(s), D(t), F((e, t, a, l) => {
					i = Pi(r, 1, "ghost", null, i, { active: I(n).gridOn }), G(r, "title", e), B(o, ` ${t ?? ""}`), c = Pi(s, 1, "ghost", null, c, { active: I(n).guidesOn }), G(s, "title", a), B(u, ` ${l ?? ""}`);
				}, [
					() => K("tip.gridToggle"),
					() => K("lbl.view.grid"),
					() => K("tip.guides"),
					() => K("lbl.view.guides")
				]), L("click", r, function(...e) {
					I(n).toggleGrid?.apply(this, e);
				}), L("click", s, function(...e) {
					I(n).toggleGuides?.apply(this, e);
				}), z(e, t);
			};
			V(o, (e) => {
				I(n).toolMenu === "view" && e(s);
			}), D(t), F((e) => {
				i = Pi(r, 1, "ghost", null, i, { active: I(n).toolMenu === "view" || I(n).gridOn || I(n).guidesOn }), G(r, "title", e);
			}, [() => K("lbl.group.view")]), L("click", r, () => on(n, I(n).toolMenu = I(n).toolMenu === "view" ? null : "view")), z(e, t);
		}, m = (e) => {
			var t = NS(), r = M(t), i = N(r, !0), a = P(r, 2), o = j(a);
			let s;
			H(o, () => q.gridToggle, !0), D(o);
			var c = P(o, 2);
			let l;
			H(c, () => q.guides, !0), D(c), D(a), F((e, t, r) => {
				B(i, e), s = Pi(o, 1, "ghost", null, s, { active: I(n).gridOn }), G(o, "title", t), l = Pi(c, 1, "ghost", null, l, { active: I(n).guidesOn }), G(c, "title", r);
			}, [
				() => K("lbl.group.view"),
				() => K("tip.gridToggle"),
				() => K("tip.guides")
			]), L("click", o, function(...e) {
				I(n).toggleGrid?.apply(this, e);
			}), L("click", c, function(...e) {
				I(n).toggleGuides?.apply(this, e);
			}), z(e, t);
		};
		V(f, (e) => {
			I(n).folded.view ? e(p) : e(m, -1);
		}), D(a), Zi(a, (e) => on(n, I(n).toolMenuEl = e), () => I(n)?.toolMenuEl), F((e, t) => {
			G(r, "title", e), B(i, t);
		}, [() => K("tip.switchPage"), () => I(n).pageEntry()?.title ?? ""]), L("click", r, () => I(n).togglePanel("pages")), z(e, t);
	};
	V(o, (e) => {
		I(n).site && e(s);
	});
	var c = P(o, 2), l = (e) => {
		var t = FS(), r = j(t);
		H(r, () => q.phone);
		var i = P(r, 2), a = N(i, !0), o = N(P(i, 2), !0);
		D(t), F((e, r) => {
			G(t, "title", e), B(a, r), B(o, I(n).attentionCount);
		}, [() => K("tip.attention"), () => K(I(n).attentionCount === 1 ? "ui.attentionOne" : "ui.attentionMany", { n: I(n).attentionCount })]), L("click", t, function(...e) {
			I(n).jumpToAttention?.apply(this, e);
		}), z(e, t);
	};
	V(c, (e) => {
		I(n).attentionCount > 0 && e(l);
	}), D(a);
	var u = P(a, 2), d = j(u), f = (e) => {
		var t = LS(), r = j(t), i = N(j(r), !0);
		ke(2), D(r);
		var a = P(r, 2), o = j(a);
		let s;
		var c = j(o);
		H(c, () => q.restore);
		var l = N(P(c), !0);
		D(o);
		var u = P(o, 2), d = (e) => {
			var t = IS(), r = j(t);
			H(r, () => q.restore);
			var i = P(r);
			D(t), F((e, n) => {
				G(t, "title", e), B(i, ` ${n ?? ""}`);
			}, [() => K("tip.discardArmed"), () => K("ui.discardConfirm")]), L("click", t, function(...e) {
				I(n).confirmDiscard?.apply(this, e);
			}), z(e, t);
		};
		V(u, (e) => {
			I(n).discardArmed && e(d);
		}), D(a), Zi(a, (e) => on(n, I(n).discardWrapEl = e), () => I(n)?.discardWrapEl), D(t), F((e, t, a, c, u) => {
			G(r, "title", e), G(r, "aria-label", t), B(i, a), s = Pi(o, 1, "discard-dot", null, s, { armed: I(n).discardArmed }), G(o, "title", c), B(l, u);
		}, [
			() => K("ui.unpublished"),
			() => K("ui.unpublished"),
			() => K("ui.unpublished"),
			() => I(n).discardArmed ? K("tip.discardArmed") : K("tip.discard"),
			() => K("ui.discard")
		]), L("click", o, function(...e) {
			I(n).requestDiscard?.apply(this, e);
		}), Ei(2, t, () => CS, () => ({
			x: 24,
			duration: I(n).reducedMotion ? 0 : 150
		})), z(e, t);
	};
	V(d, (e) => {
		I(n).dirty && e(f);
	}), D(u);
	var p = P(u, 2), m = j(p), h = (e) => {
		var t = VS(), r = M(t), i = j(r), a = (e) => {
			var t = RS(), n = M(t);
			H(n, () => q.eye);
			var r = N(P(n, 2), !0);
			F((e) => B(r, e), [() => K("ui.cleanView")]), z(e, t);
		}, o = (e) => {
			var t = RS(), n = M(t);
			H(n, () => q.pencil);
			var r = N(P(n, 2), !0);
			F((e) => B(r, e), [() => K("ui.edit")]), z(e, t);
		};
		V(i, (e) => {
			I(n).chromeVisible ? e(a) : e(o, -1);
		}), D(r);
		var s = P(r, 2), c = (e) => {
			var t = zS(), r = j(t), i = (e) => {
				var t = Yr();
				H(M(t), () => q.warn), z(e, t);
			};
			V(r, (e) => {
				I(n).auth.allowed || e(i);
			});
			var a = P(r, 1, !0);
			D(t), F((e) => {
				G(t, "title", e), B(a, I(n).auth.login);
			}, [() => I(n).auth.allowed ? K("tip.hasPublishAccess") : K("tip.noPublishAccess")]), z(e, t);
		}, l = (e) => {
			var t = BS(), n = N(t, !0);
			F((e) => B(n, e), [() => K("ui.loginGitHub")]), z(e, t);
		};
		V(s, (e) => {
			I(n).auth?.loggedIn ? e(c) : I(n).auth && e(l, 1);
		});
		var u = P(s, 2), d = j(u);
		H(d, () => q.external);
		var f = N(P(d, 2), !0);
		D(u);
		var p = P(u, 2), m = N(p, !0);
		F((e, t, i, a, o) => {
			G(r, "title", e), G(u, "href", t), G(u, "title", i), B(f, a), p.disabled = !I(n).dirty, B(m, o);
		}, [
			() => I(n).chromeVisible ? K("tip.chromeHide") : K("tip.chromeShow"),
			() => I(n).pageEntry()?.path ?? "/",
			() => K("ui.viewSite"),
			() => K("ui.viewSite"),
			() => K("ui.publish")
		]), L("click", r, function(...e) {
			I(n).toggleChrome?.apply(this, e);
		}), L("click", p, function(...e) {
			I(n).publish?.apply(this, e);
		}), z(e, t);
	};
	V(m, (e) => {
		I(n).site && e(h);
	}), D(p), D(r), F(() => i = Pi(r, 1, "topbar", null, i, { hidden: !I(n).chromeVisible })), z(e, r), at();
}
Br(["click"]);
var WS = 3840, GS = 2400, KS = (e, t, n) => Math.min(n, Math.max(t, e));
function qS({ innerWidth: e = 0, screenWidth: t = 0 } = {}) {
	let n = e > 0 ? e : t;
	return Math.max(1, Math.round(n > 0 ? n : 1));
}
function JS(e) {
	return !e || typeof e.innerWidth != "number" ? null : qS({
		innerWidth: e.innerWidth,
		screenWidth: e.screen?.width ?? 0
	});
}
function YS(e, t) {
	let n = e && typeof e == "object" && !Array.isArray(e) ? e : {}, r = n.mode === "custom" ? "custom" : "own", i = Number(n.width), a = KS(Number.isFinite(i) && i > 0 ? i : t, 640, WS), o = Number(n.height), s = Number.isFinite(o) && o > 0 ? KS(o, 480, GS) : 0;
	return {
		mode: r,
		width: Math.round(a),
		height: Math.round(s)
	};
}
function XS(e, t) {
	return e?.mode === "custom" ? {
		width: e.width,
		height: e.height || 0
	} : {
		width: t,
		height: 0
	};
}
//#endregion
//#region src/shell/Rail.svelte
var ZS = /* @__PURE__ */ R("<button> </button>"), QS = /* @__PURE__ */ R("<span class=\"rail-group\"> </span> <!>", 1), $S = /* @__PURE__ */ R("<div class=\"ctl-row\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\" step=\"10\"/> <span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\" min=\"0\" step=\"10\" placeholder=\"0\"/></div>"), eC = /* @__PURE__ */ R("<p class=\"mini-label\"> </p> <label> <input type=\"text\" spellcheck=\"false\"/></label>", 1), tC = /* @__PURE__ */ R("<div class=\"settings-pop\"><p class=\"panel-strong\"> </p> <label> <!></label> <label> <!></label> <label> <!></label> <label> <!></label> <label> <!></label> <p class=\"mini-label\"> </p> <div class=\"seg\"><button type=\"button\"> </button> <button type=\"button\"> </button></div> <!> <!></div>"), nC = /* @__PURE__ */ R("<nav><!> <span class=\"rail-settings\"><span class=\"rail-brand\" title=\"Urd\"><svg class=\"brand-mark\" viewBox=\"10.3 8.3 19.4 25.4\" aria-hidden=\"true\"><path d=\"M12 32V10l16 6.5V32\" fill=\"none\" stroke=\"var(--urd-brand)\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg> <span class=\"brand-word\">Urd</span></span> <button></button> <!></span></nav>");
function rC(e, t) {
	it(t, !1);
	let n = /* @__PURE__ */ an(nt("urd-editor"));
	$i();
	var r = nC();
	let i;
	var a = j(r);
	ui(a, 1, () => I(n).PANEL_GROUPS, oi, (e, t, r) => {
		var i = QS(), a = M(i), o = N(a, !0);
		ui(P(a, 2), 1, () => I(t), (e) => e, (e, t) => {
			var r = ZS();
			let i;
			var a = N(r, !0);
			F(() => {
				i = Pi(r, 1, "", null, i, { active: I(n).activePanel === I(t) }), B(a, I(n).PANEL_LABELS[I(t)]);
			}), L("click", r, () => I(n).togglePanel(I(t))), z(e, r);
		}), F((e) => B(o, e), [() => K(I(n).PANEL_GROUP_KEYS[r])]), z(e, i);
	});
	var o = P(a, 2), s = P(j(o), 2);
	let c;
	H(s, () => q.gear, !0), D(s);
	var l = P(s, 2), u = (e) => {
		var t = tC(), r = j(t), i = N(r, !0), a = P(r, 2), o = j(a);
		J(P(o), {
			get value() {
				return I(n).adminTheme;
			},
			get options() {
				return I(n).ADMIN_THEMES;
			},
			onchange: (e) => on(n, I(n).adminTheme = e)
		}), D(a);
		var s = P(a, 2), c = j(s), l = P(c);
		{
			let e = /* @__PURE__ */ kt(() => [["auto", K("lang.auto")], ...I(n).adminLangOptions()]);
			J(l, {
				get value() {
					return I(n).adminLangChoice;
				},
				get options() {
					return I(e);
				},
				get onchange() {
					return I(n).setAdminLang;
				}
			});
		}
		D(s);
		var u = P(s, 2), d = j(u), f = P(d);
		{
			let e = /* @__PURE__ */ kt(() => [["strip", K("settings.layoutPickerStrip")], ["menu", K("settings.layoutPickerMenu")]]);
			J(f, {
				get value() {
					return I(n).layoutPickerPref;
				},
				get options() {
					return I(e);
				},
				get onchange() {
					return I(n).setLayoutPicker;
				}
			});
		}
		D(u);
		var p = P(u, 2), m = j(p), h = P(m);
		{
			let e = /* @__PURE__ */ kt(() => [["wide", K("settings.menuWide")], ["narrow", K("settings.menuNarrow")]]);
			J(h, {
				get value() {
					return Uh.widthPref;
				},
				get options() {
					return I(e);
				},
				get onchange() {
					return Gh;
				}
			});
		}
		D(p);
		var g = P(p, 2), _ = j(g), v = P(_);
		{
			let e = /* @__PURE__ */ kt(() => [["remember", K("settings.panelsRemember")], ["reset", K("settings.panelsReset")]]);
			J(v, {
				get value() {
					return I(n).panelsPref;
				},
				get options() {
					return I(e);
				},
				get onchange() {
					return I(n).setPanelsPref;
				}
			});
		}
		D(g);
		var y = P(g, 2), b = N(y, !0), x = P(y, 2), S = j(x);
		let C;
		var w = N(S, !0), T = P(S, 2);
		let E;
		var ee = N(T, !0);
		D(x);
		var te = P(x, 2), ne = (e) => {
			var t = $S(), r = j(t), i = N(r, !0), a = P(r, 2);
			U(a);
			var o = P(a, 2), s = N(o, !0), c = P(o, 2);
			U(c), D(t), F((e, t, r, o) => {
				B(i, e), G(a, "min", 640), G(a, "max", WS), G(a, "title", t), W(a, I(n).screenPref.width), B(s, r), G(c, "max", GS), G(c, "title", o), W(c, I(n).screenPref.height || "");
			}, [
				() => K("lbl.screen.w"),
				() => K("tip.screen.width", {
					min: 640,
					max: WS
				}),
				() => K("lbl.screen.h"),
				() => K("tip.screen.height", {
					min: 480,
					max: GS
				})
			]), L("change", a, (e) => {
				I(n).setScreenPref({ width: Number(e.target.value) }), e.target.value = I(n).screenPref.width;
			}), L("change", c, (e) => {
				I(n).setScreenPref({ height: Number(e.target.value) }), e.target.value = I(n).screenPref.height || "";
			}), z(e, t);
		};
		V(te, (e) => {
			I(n).screenPref.mode === "custom" && e(ne);
		});
		var re = P(te, 2), ie = (e) => {
			var t = eC(), r = M(t), i = N(r, !0), a = P(r, 2), o = j(a), s = P(o);
			U(s), D(a), F((e, t, c, l, u) => {
				G(r, "title", e), B(i, t), G(a, "title", c), B(o, `${l ?? ""} `), G(s, "placeholder", u), W(s, I(n).siteDraft.analytics?.token ?? "");
			}, [
				() => K("tip.analytics"),
				() => K("settings.analytics"),
				() => K("tip.analytics"),
				() => K("lbl.analyticsToken"),
				() => K("ph.analyticsToken")
			]), L("change", s, (e) => I(n).setAnalyticsToken(e.target.value)), z(e, t);
		};
		V(re, (e) => {
			I(n).siteDraft && e(ie);
		}), D(t), F((e, t, r, l, f, h, v, te, ne, re, ie, ae, oe, se, ce, le) => {
			B(i, e), G(a, "title", t), B(o, `${r ?? ""} `), G(s, "title", l), B(c, `${f ?? ""} `), G(u, "title", h), B(d, `${v ?? ""} `), G(p, "title", te), B(m, `${ne ?? ""} `), G(g, "title", re), B(_, `${ie ?? ""} `), G(y, "title", ae), B(b, oe), G(x, "title", se), C = Pi(S, 1, "", null, C, { on: I(n).screenPref.mode === "own" }), B(w, ce), E = Pi(T, 1, "", null, E, { on: I(n).screenPref.mode === "custom" }), B(ee, le);
		}, [
			() => K("settings.title"),
			() => K("topbar.adminTheme.title"),
			() => K("settings.theme"),
			() => K("topbar.language.title"),
			() => K("settings.language"),
			() => K("tip.settings.layoutPicker"),
			() => K("settings.layoutPicker"),
			() => K("tip.settings.menuWidth"),
			() => K("settings.menuWidth"),
			() => K("tip.settings.panels"),
			() => K("settings.panels"),
			() => K("tip.screen.mode"),
			() => K("settings.screen"),
			() => K("tip.screen.mode"),
			() => K("lbl.screen.own"),
			() => K("lbl.screen.size")
		]), L("click", S, () => I(n).setScreenPref({ mode: "own" })), L("click", T, () => I(n).setScreenPref({ mode: "custom" })), z(e, t);
	};
	V(l, (e) => {
		I(n).settingsOpen && e(u);
	}), D(o), Zi(o, (e) => on(n, I(n).settingsEl = e), () => I(n)?.settingsEl), D(r), F((e) => {
		i = Pi(r, 1, "rail", null, i, { hidden: !I(n).chromeVisible }), c = Pi(s, 1, "rail-gear", null, c, { active: I(n).settingsOpen }), G(s, "title", e);
	}, [() => K("settings.title")]), L("click", s, () => on(n, I(n).settingsOpen = !I(n).settingsOpen)), z(e, r), at();
}
Br(["click", "change"]);
//#endregion
//#region src/shell/PreviewStage.svelte
var iC = /* @__PURE__ */ R("<div><div class=\"stage\"><iframe></iframe></div></div>");
function aC(e, t) {
	it(t, !1);
	let n = /* @__PURE__ */ an(nt("urd-editor"));
	$i();
	var r = iC();
	let i;
	var a = j(r), o = j(a);
	Zi(o, (e) => on(n, I(n).iframeEl = e), () => I(n)?.iframeEl), D(a), D(r), Zi(r, (e) => on(n, I(n).frameWrapEl = e), () => I(n)?.frameWrapEl), F((e) => {
		i = Pi(r, 1, "frame-wrap", null, i, {
			mobile: I(n).viewMode === "mobile",
			pan: I(n).canPan,
			fold: I(n).targetH > 0
		}), Ii(a, `width:${I(n).stageW ?? ""}px; height:${I(n).stageH ?? ""}px`), G(o, "title", e), G(o, "src", `/?page=${I(n).pageId}&preview=1`), Ii(o, `width:${I(n).targetW ?? ""}px; height:${I(n).iframeH ?? ""}px; transform:scale(${I(n).scale ?? ""}); transform-origin:top left`);
	}, [() => K("ui.previewTitle")]), zr("load", o, function(...e) {
		I(n).onIframeLoad?.apply(this, e);
	}), Lr(o), z(e, r), at();
}
//#endregion
//#region src/shell/ConfirmDialog.svelte
var oC = /* @__PURE__ */ R("<p class=\"panel-hint confirm-line\"> </p>"), sC = /* @__PURE__ */ R("<input/>"), cC = /* @__PURE__ */ R("<div class=\"setup-overlay\"><div class=\"setup-card\"><h2> </h2> <!> <!> <span class=\"setup-actions\"><button class=\"ghost\"> </button> <button class=\"primary\"> </button></span></div></div>");
function lC(e, t) {
	it(t, !1);
	let n = /* @__PURE__ */ an(nt("urd-editor"));
	$i();
	var r = Yr(), i = M(r), a = (e) => {
		var t = cC(), r = j(t), i = j(r), a = N(i, !0), o = P(i, 2);
		ui(o, 1, () => I(n).confirmBox.lines, (e) => e, (e, t) => {
			var n = oC(), r = N(n, !0);
			F(() => B(r, I(t))), z(e, n);
		});
		var s = P(o, 2), c = (e) => {
			var t = sC();
			U(t), gt(t, !0), F(() => G(t, "placeholder", I(n).confirmBox.placeholder)), L("keydown", t, (e) => e.key === "Enter" && I(n).confirmBox.value.trim() && I(n).answerConfirm(!0)), Gi(t, () => I(n).confirmBox.value, (e) => on(n, I(n).confirmBox.value = e)), z(e, t);
		};
		V(s, (e) => {
			I(n).confirmBox.prompt && e(c);
		});
		var l = P(s, 2), u = j(l), d = N(u, !0), f = P(u, 2), p = N(f, !0);
		D(l), D(r), D(t), F(() => {
			B(a, I(n).confirmBox.title), B(d, I(n).confirmBox.cancelLabel), B(p, I(n).confirmBox.okLabel);
		}), L("pointerdown", t, (e) => on(n, I(n).confirmDownOnOverlay = e.target === e.currentTarget)), L("click", t, (e) => I(n).confirmDownOnOverlay && e.target === e.currentTarget && I(n).answerConfirm(!1)), L("click", u, () => I(n).answerConfirm(!1)), L("click", f, () => I(n).answerConfirm(!0)), z(e, t);
	};
	V(i, (e) => {
		I(n).confirmBox && e(a);
	}), z(e, r), at();
}
Br([
	"pointerdown",
	"click",
	"keydown"
]);
//#endregion
//#region src/shell/SetupWizard.svelte
var uC = /* @__PURE__ */ R("<div class=\"setup-overlay\"><div class=\"setup-card\"><h2> </h2> <p class=\"panel-hint\"> </p> <label> <input/></label> <label> <!></label> <label> <!></label> <p class=\"panel-hint\"> </p> <span class=\"setup-actions\"><button class=\"ghost\"> </button> <button class=\"primary\"> </button></span></div></div>");
function dC(e, t) {
	it(t, !1);
	let n = /* @__PURE__ */ an(nt("urd-editor"));
	$i();
	var r = Yr(), i = M(r), a = (e) => {
		var t = uC(), r = j(t), i = j(r), a = N(i, !0), o = P(i, 2), s = N(o, !0), c = P(o, 2), l = j(c), u = P(l);
		U(u), D(c);
		var d = P(c, 2), f = j(d), p = P(f);
		{
			let e = /* @__PURE__ */ kt(() => K("setup.accentPick"));
			rl(p, {
				get value() {
					return I(n).setupAccent;
				},
				get label() {
					return I(e);
				},
				onchange: (e) => on(n, I(n).setupAccent = e)
			});
		}
		D(d);
		var m = P(d, 2), h = j(m), g = P(h);
		{
			let e = /* @__PURE__ */ kt(() => K("setup.bgLabel"));
			rl(g, {
				get value() {
					return I(n).setupBg;
				},
				get label() {
					return I(e);
				},
				onchange: (e) => on(n, I(n).setupBg = e)
			});
		}
		D(m);
		var _ = P(m, 2), v = N(_, !0), y = P(_, 2), b = j(y), x = N(b, !0), S = P(b, 2), C = N(S, !0);
		D(y), D(r), D(t), F((e, t, n, r, i, o, c, d, p, m) => {
			B(a, e), B(s, t), B(l, `${n ?? ""} `), G(u, "placeholder", r), B(f, `${i ?? ""} `), B(h, `${o ?? ""} `), B(v, c), B(x, d), S.disabled = p, B(C, m);
		}, [
			() => K("setup.title"),
			() => K("setup.intro"),
			() => K("setup.nameLabel"),
			() => K("ph.setup.name"),
			() => K("setup.accentLabel"),
			() => K("setup.bgLabel"),
			() => K("setup.outro"),
			() => K("setup.skip"),
			() => !I(n).setupName.trim(),
			() => K("setup.start")
		]), L("keydown", u, (e) => e.key === "Enter" && I(n).applySetup()), Gi(u, () => I(n).setupName, (e) => on(n, I(n).setupName = e)), L("click", b, function(...e) {
			I(n).closeSetup?.apply(this, e);
		}), L("click", S, function(...e) {
			I(n).applySetup?.apply(this, e);
		}), z(e, t);
	};
	V(i, (e) => {
		I(n).showSetup && e(a);
	}), z(e, r), at();
}
Br(["keydown", "click"]);
//#endregion
//#region src/lib/draftStore.js
function fC(e, t, n, r) {
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
//#region src/lib/menu-place.js
function pC(e, t, n, r = 8, i = 8) {
	let a = Math.max(r, n.w - t.w - i), o = Math.max(i, n.h - t.h - i);
	return {
		left: Math.min(Math.max(r, e.left), a),
		top: Math.min(Math.max(i, e.top), o)
	};
}
function mC(e, t, n) {
	let r = Math.min(e.left + t.w, n.right) - Math.max(e.left, n.left), i = Math.min(e.top + t.h, n.bottom) - Math.max(e.top, n.top);
	return r > 0 && i > 0 ? r * i : 0;
}
function hC(e, t, n, { min: r = 8, gap: i = 12, margin: a = 8 } = {}) {
	let o = [
		["right", {
			left: e.right + i,
			top: e.top
		}],
		["left", {
			left: e.left - i - t.w,
			top: e.top
		}],
		["below", {
			left: e.left,
			top: e.bottom + i
		}]
	].map(([i, o]) => {
		let s = pC(o, t, n, r, a);
		return {
			side: i,
			...s,
			covers: mC(s, t, e)
		};
	}), s = o.find((e) => e.covers === 0) ?? o.reduce((e, t) => t.covers < e.covers ? t : e);
	return {
		left: s.left,
		top: s.top,
		side: s.side
	};
}
var gC = 400;
function _C({ prepare: e, onHeight: t, title: n }) {
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
			}, clearTimeout(a), a = setTimeout(l, gC);
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
//#region ../template/assets/engine/0.7.4/animations/core.js
var vC = () => ({
	duration: 600,
	delay: 0
}), yC = 90, bC = {
	"fade-in": {
		version: 1,
		label: "Fade in",
		labelKey: "anim.fadeIn",
		entrance: !0,
		defaults: vC,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Slide up",
		labelKey: "anim.slideUp",
		entrance: !0,
		defaults: vC,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom in",
		labelKey: "anim.zoomIn",
		entrance: !0,
		defaults: vC,
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
			step: yC,
			effect: "slide-up",
			pattern: "sequence"
		}),
		migrations: {}
	}
};
//#endregion
//#region ../template/assets/engine/0.7.4/plugins.js
function xC(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var SC = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function CC(e, t) {
	let n = xC(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = xC(t[2]), a = SC(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var wC = /^[a-z0-9][a-z0-9-]*$/;
function TC(e) {
	let t = [];
	if (!e || typeof e != "object") return ["the manifest is not an object"];
	wC.test(e.id ?? "") || t.push("id is missing or invalid"), (typeof e.name != "string" || !e.name) && t.push("name is missing"), xC(e.version ?? "") || t.push("version is not semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine is missing");
	let n = Array.isArray(e.languages) && e.languages.length > 0;
	return (e.entry !== void 0 || !n) && (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry is missing or is not a .js file"), (e.provides !== void 0 || !n) && (!e.provides || typeof e.provides != "object") && t.push("provides is missing"), e.languages !== void 0 && t.push(...fa(e.languages)), e.locales !== void 0 && typeof e.locales != "boolean" && t.push("locales must be a boolean"), e.names !== void 0 && (typeof e.names != "object" || e.names === null || Array.isArray(e.names) || Object.values(e.names).some((e) => typeof e != "string" || !e)) && t.push("names must be an object mapping language code to name"), t;
}
Promise.resolve();
//#endregion
//#region src/lib/preview-scale.js
function EC(e, t) {
	return !(e > 0) || !(t > 0) ? 1 : e / t;
}
function DC(e, t, n, r = 0, i = 0) {
	if (n === "full") return 1;
	let a = i > 0 ? EC(r, i) : Infinity;
	return Math.max(.1, Math.min(1, EC(e, t), a));
}
//#endregion
//#region src/lib/previewBridge.js
function OC(e, t = {}) {
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
//#endregion
//#region ../template/assets/engine/0.7.4/place.js
function kC(e) {
	let t = (e) => Math.round(e * 100) / 100, n = Math.max(0, t(100 - e.w)), r = Math.min(n, Math.max(0, t(e.x - e.w / 2))), i = Math.max(0, e.y - e.h / 2), a = e.snap === !1 || e.grid?.snap === !1, o = e.grid?.size || 8;
	return i = a ? Math.round(i) : Math.round(i / o) * o, {
		x: r,
		y: Math.max(0, i)
	};
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/color.js
var AC = {
	version: 1,
	label: "Colour",
	labelKey: "bgLayer.color",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = Ns(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, jC = {
	linear: [
		"pan",
		"pan-loop",
		"rotate"
	],
	radial: ["pulse", "orbit"]
};
function MC(e) {
	let t = Array.isArray(e) && e.length ? e : [{ color: "#0b0e14" }, { color: "#1a1030" }], n = t.map((e) => Math.max(0, Number(e?.share) || 0)), r = n.reduce((e, t) => e + t, 0), i = r <= 0, a = i ? t.length : r, o = 0;
	return t.map((e, t) => {
		let r = i ? 1 : n[t], s = (o + r / 2) / a * 100;
		return o += r, {
			color: e?.color ?? "#0b0e14",
			at: Math.round(s * 100) / 100
		};
	});
}
function NC(e) {
	let t = (e) => Math.round(e * 100) / 100, n = e[0]?.at ?? 0;
	return [...e.map((e) => ({
		color: e.color,
		at: t(e.at - n)
	})), {
		color: e[0]?.color ?? "#0b0e14",
		at: 100
	}];
}
function PC(e, t, n, r = .5) {
	let i = n % 360 * Math.PI / 180, a = (e) => Math.round(e * 100) / 100 || 0, o = (Math.abs(e * Math.sin(i)) + Math.abs(t * Math.cos(i))) / (1 - Math.min(Math.max(r, 0), .9));
	return {
		period: a(o),
		dx: a(Math.sin(i) * o),
		dy: a(-Math.cos(i) * o)
	};
}
function FC(e, t, n) {
	return `repeating-linear-gradient(${t}deg, ${e.map((e) => `${Ns(e.color)} ${Math.round(e.at / 100 * n * 100) / 100}px`).join(", ")})`;
}
function IC(e) {
	let t = e.kind === "radial" ? "radial" : "linear", n = (jC[t] ?? []).includes(e.animation) ? e.animation : null, r = MC(e.stops), i = r.map((e) => `${Ns(e.color)} ${e.at}%`).join(", "), a = {}, o;
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
					stops: NC(r),
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
var LC = /* @__PURE__ */ new Set(), RC = !1;
function zC(e) {
	LC.add(e), !(RC || typeof window > "u") && (RC = !0, window.addEventListener("resize", () => {
		for (let e of [...LC]) e() || LC.delete(e);
	}));
}
var BC = !1;
function VC() {
	if (!BC) {
		BC = !0;
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
var HC = {
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
		let n = IC(t);
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
					let e = PC(r, i, n.loop.angle, n.loop.maxShare);
					t.style.inset = `${-Math.ceil(e.period)}px`, t.style.background = FC(n.loop.stops, n.loop.angle, e.period), t.style.setProperty("--urd-loop-dx", `${e.dx}px`), t.style.setProperty("--urd-loop-dy", `${e.dy}px`);
				}
				return !0;
			};
			requestAnimationFrame(r), zC(r);
		} else if (n.runner) {
			e.classList.add("urd-bg-loop-host");
			let t = document.createElement("div");
			t.className = n.runner.className, t.style.background = n.runner.background, n.runner.left != null && (t.style.left = n.runner.left), n.runner.top != null && (t.style.top = n.runner.top), e.appendChild(t);
		} else e.style.background = n.background, n.className && (e.classList.add(n.className), n.className === "urd-bg-rotate" && VC());
	}
}, UC = /^(?:data:video\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/media\/[\w%./-]+\.(?:mp4|webm))$/i;
function WC(e) {
	return typeof e == "string" && UC.test(e);
}
var GC = null;
function KC(e) {
	GC ??= new IntersectionObserver((e) => {
		for (let t of e) t.target.isConnected ? t.isIntersecting ? t.target.play().catch(() => {}) : t.target.pause() : GC.unobserve(t.target);
	}, { threshold: 0 }), GC.observe(e);
}
var qC = (e, t, n, r) => {
	e.style.position = "absolute", e.style.inset = "0", e.style.width = "100%", e.style.height = "100%", e.style.objectFit = t === "contain" ? "contain" : "cover", e.style.objectPosition = fu(n, r);
}, JC = {
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
		if (!WC(t.src)) return;
		if (e.style.opacity = String(t.opacity ?? 1), window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
			if (!Bs(t.poster)) return;
			let n = document.createElement("img");
			n.className = "urd-bg-video-poster", n.alt = "", n.setAttribute("aria-hidden", "true"), n.src = t.poster, qC(n, t.fit, t.x, t.y), e.appendChild(n);
			return;
		}
		let n = document.createElement("video");
		n.className = "urd-bg-video", n.muted = !0, n.setAttribute("muted", ""), n.loop = !0, n.playsInline = !0, n.setAttribute("playsinline", ""), n.preload = "metadata", n.disablePictureInPicture = !0, n.setAttribute("aria-hidden", "true"), Bs(t.poster) && (n.poster = t.poster), n.src = t.src, qC(n, t.fit, t.x, t.y), e.appendChild(n), KC(n), t.parallax > 0 && Nu(n, t.parallax, 0, t.fit === "contain" ? "contain" : "cover");
	}
}, YC = [
	"section",
	"blocks",
	"page"
];
function XC(e) {
	return Fp(String(e ?? ""), "");
}
function ZC(e, t, { id: n, title: r }) {
	let i = structuredClone(e);
	i.meta = {
		...i.meta,
		id: n,
		title: r
	};
	for (let e of i.sections ?? []) {
		e.id = t("sec");
		for (let n of e.blocks ?? []) n.id = t("blk");
		Sc(e), xc(e), Cc(e);
	}
	return i;
}
//#endregion
//#region src/state/templates.svelte.js
var QC = null, $C = {}, ew = {}, tw = !1, nw = /* @__PURE__ */ k(pn([]));
async function rw() {
	let e = {
		version: 1,
		maler: []
	};
	try {
		e = await (await fetch("/content/maler.json")).json();
	} catch {}
	QC = fC("urd-draft-templates", () => e, lj.draftSaveError, "urd-draft-maler"), A(nw, [...QC.data.maler ?? []], !0);
	for (let e of I(nw)) {
		let t = null;
		try {
			t = await (await fetch(`/content/maler/${e}.json`)).json();
		} catch {}
		ew[e] = t, $C[e] = fC(`urd-draft-template-${e}`, () => t, lj.draftSaveError, `urd-draft-mal-${e}`), ($C[e].data?.schemaVersion ?? 1) > 1 && $C[e].reset();
	}
	tw = !0, iw();
}
function iw() {
	let e = I(nw).map((e) => $C[e]?.data ? {
		id: e,
		...JSON.parse(JSON.stringify($C[e].data))
	} : null).filter(Boolean).map(({ id: e, mal: t, section: n, blocks: r, page: i }) => ({
		id: e,
		name: t.name,
		kind: t.kind,
		section: n,
		blocks: r,
		page: i
	}));
	IE.bridge?.sendTemplates(e);
}
function aw(e) {
	let t = YC.includes(e.kind) ? e.kind : "section";
	return ow(t, e[t]);
}
async function ow(e, t) {
	if (!t || !QC) return;
	let n = (await lj.askPrompt({
		title: K("canvas.templateNamePrompt"),
		placeholder: K("ph.templateName")
	}))?.trim();
	if (!n) return;
	let r = XC(n);
	if (!r) {
		lj.setStatus(K("status.invalidName"), "error");
		return;
	}
	if (I(nw).includes(r)) {
		lj.setStatus(K("status.templateExists"), "error");
		return;
	}
	ck.pushHistory("templates");
	let i = {
		schemaVersion: 1,
		mal: {
			name: n,
			kind: e
		},
		[e]: t
	};
	$C[r] = fC(`urd-draft-template-${r}`, () => null, lj.draftSaveError, `urd-draft-mal-${r}`), $C[r].replace(i), $C[r].save(), QC.data.maler = [...I(nw), r], QC.save(), A(nw, [...I(nw), r], !0), lj.setStatus(K("status.templateSaved", { name: n }), "ok"), ck.updateDirty(), iw();
}
async function sw(e) {
	let t = $C[e.id]?.data?.mal;
	t && await lj.askConfirm({ title: K("confirm.deleteTemplate", { name: t.name }) }) && (ck.pushHistory("templates"), Q.newPageTemplate === e.id && (Q.newPageTemplate = null), localStorage.removeItem(`urd-draft-template-${e.id}`), localStorage.removeItem(`urd-draft-mal-${e.id}`), delete $C[e.id], QC.data.maler = I(nw).filter((t) => t !== e.id), QC.save(), A(nw, I(nw).filter((t) => t !== e.id), !0), ck.updateDirty(), iw());
}
var cw = {
	get templatesIndexStore() {
		return QC;
	},
	set templatesIndexStore(e) {
		QC = e;
	},
	get templateStores() {
		return $C;
	},
	set templateStores(e) {
		$C = e;
	},
	get publishedTemplates() {
		return ew;
	},
	set publishedTemplates(e) {
		ew = e;
	},
	get templatesReady() {
		return tw;
	},
	set templatesReady(e) {
		tw = e;
	},
	get templateIds() {
		return I(nw);
	},
	set templateIds(e) {
		A(nw, e, !0);
	},
	initTemplates: rw,
	pushTemplatesToPreview: iw,
	handleSaveTemplate: aw,
	saveTemplate: ow,
	handleDeleteTemplate: sw
}, lw = [
	["color", AC],
	["gradient", HC],
	["glow", Ob],
	["image", Mu],
	["slideshow", ud],
	["video", JC],
	["pattern", Ql],
	["grain", Ab]
], uw = Object.fromEntries(lw), dw = /* @__PURE__ */ k(null), fw = /* @__PURE__ */ k(pn({
	size: 16,
	snap: !0
})), pw = /* @__PURE__ */ O(() => ip(I(Gw), I(Kw))), mw = null, hw = /* @__PURE__ */ k(null);
function gw() {
	A(hw, mw.data, !0), mw.replace(I(hw));
}
function _w() {
	IE.bridge?.sendSite(Xe(I(hw)));
}
function vw(e, t) {
	ww(e, () => {
		I(hw).nav.style ??= {}, t(I(hw).nav.style);
	});
}
var yw = {
	mutate: vw,
	keyPrefix: "navbg",
	keyId: "nav"
}, bw = {
	mutate: fT,
	keyPrefix: "footerbg",
	keyId: "footer"
}, xw = /* @__PURE__ */ O(() => I(hw)?.theme ? ks(I(hw).theme, IE.previewMode).color ?? {} : {}), Sw = () => Object.entries(I(xw));
function Cw(e, t) {
	ck.pushHistory("grid:site"), A(fw, {
		...I(fw),
		[e]: t
	}, !0), mw.data.grid = {
		...mw.data.grid,
		[e]: t
	}, mw.save(), ck.updateDirty(), _w(), lj.gridOn && IE.bridge?.sendShowGrid(!0);
}
function ww(e, t) {
	ck.pushHistory(e), t(), mw.save(), ck.updateDirty(), _w();
}
var Tw = /* @__PURE__ */ k(""), Ew = /* @__PURE__ */ k(null), Dw = /* @__PURE__ */ k(null), Ow = [
	"admin",
	"api",
	"assets",
	"content",
	"media",
	"plugins",
	"functions",
	"readme"
];
function kw(e, t = null) {
	return e ? Ow.includes(e) ? K("error.reservedName", { slug: e }) : I(hw).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? K("error.pageExists") : null : K("error.pageNeedsName");
}
function Aw() {
	let e = I(Tw).trim(), t = Fp(e), n = kw(t);
	if (n) return lj.setStatus(n, "error"), !1;
	let r = I(Ew) && !I(Ew).startsWith("preset:") ? cw.templateStores[I(Ew)]?.data?.page : null, i = I(Ew)?.startsWith("preset:") ? Ac(I(Ew).slice(7), {
		pageId: t,
		title: e
	}) ?? $.blankPage({
		id: t,
		title: e
	}) : r ? ZC(Dc(JSON.parse(JSON.stringify(r)), mw.data), es, {
		id: t,
		title: e
	}) : $.blankPage({
		id: t,
		title: e
	});
	ww("pages", () => {
		I(hw).pages.push({
			id: t,
			title: e,
			path: `/${t}`,
			file: `content/pages/${t}.json`
		}), I(hw).nav.items.push({
			label: e,
			page: t
		});
	}), lj.writeDraftKey(`urd-draft-${t}`, JSON.stringify(i)), ck.updateDirty(), A(Tw, ""), A(Ew, null), $.selectPage(t);
}
async function jw(e) {
	A(Dw, null);
	let t = e.id === $.pageId ? JSON.parse(JSON.stringify($.store.data)) : await $.readPageDraft(e);
	await cw.saveTemplate("page", t);
}
function Mw(e, t) {
	let n = t.trim();
	if (!n || n === e.title) return;
	let r = e.title;
	ww("pages", () => {
		e.title = n;
		for (let t of I(hw).nav.items) t.page === e.id && t.label === r && (t.label = n);
	}), e.id === $.pageId ? ($.store.data.meta.title = n, $.store.save(), ck.updateDirty(), IE.bridge?.sendPage($.pageId, $.store.data)) : $.patchPageDraft(e, (e) => {
		e.meta.title = n;
	});
}
var Nw = /* @__PURE__ */ k(pn({
	description: "",
	ogTitle: "",
	ogDescription: "",
	ogImage: ""
}));
function Pw() {
	let e = $.store?.data?.meta ?? {};
	A(Nw, {
		description: e.description ?? "",
		ogTitle: e.og?.title ?? "",
		ogDescription: e.og?.description ?? "",
		ogImage: e.og?.image ?? ""
	}, !0);
}
function Fw(e, t) {
	let n = String(t ?? "").trim();
	if (e === "description") n ? $.store.data.meta.description = n : delete $.store.data.meta.description;
	else {
		let t = {
			ogTitle: "title",
			ogDescription: "description",
			ogImage: "image"
		}[e], r = { ...$.store.data.meta.og ?? {} };
		n ? r[t] = n : delete r[t], Object.keys(r).length ? $.store.data.meta.og = r : delete $.store.data.meta.og;
	}
	$.store.save(), ck.updateDirty(), Pw();
	let r = I(hw).pages.find((e) => e.id === $.pageId);
	I(Lw)[$.pageId] = !r?.noindex && !$.store.data.meta.description;
}
function Iw(e) {
	let t = I(hw).pages.find((e) => e.id === $.pageId);
	t && (ww("edit:page-noindex", () => {
		e ? t.noindex = !0 : delete t.noindex;
	}), I(Lw)[$.pageId] = !e && !$.store?.data?.meta?.description);
}
var Lw = /* @__PURE__ */ k(pn({}));
async function Rw() {
	let e = {};
	for (let t of I(hw).pages) {
		if (t.noindex) continue;
		if (t.id === $.pageId) {
			e[t.id] = !$.store?.data?.meta?.description;
			continue;
		}
		let n = await $.readPageDraft(t);
		e[t.id] = !n?.meta?.description;
	}
	A(Lw, e, !0);
}
async function zw(e) {
	let t = e.target.files?.[0];
	if (e.target.value = "", t) try {
		Fw("ogImage", (await vj.compressOrTrim(t)).dataUrl);
	} catch (e) {
		lj.setStatus(vj.imageErrorText(e), "error");
	}
}
function Bw(e, t) {
	let n = Fp(t);
	if (e.path === "/" || `/${n}` === e.path) return;
	let r = kw(n, e.id);
	r ? lj.setStatus(r, "error") : ww("pages", () => {
		e.path = `/${n}`;
	});
}
function Vw(e) {
	e.path !== "/" && (ww("pages", () => {
		I(hw).pages = I(hw).pages.filter((t) => t.id !== e.id), I(hw).nav.items = I(hw).nav.items.filter((t) => t.page !== e.id || t.children);
		for (let t of I(hw).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
		I(hw).nav.items = I(hw).nav.items.filter((e) => e.page || e.href || e.children);
	}), e.id === $.pageId && $.selectPage(I(hw).pages[0].id), lj.setStatus(K("status.pageRemoved")));
}
var Hw = /* @__PURE__ */ k(null);
function Uw(e) {
	ww("edit:site-icon", () => {
		I(hw).site.icon = e;
	}), A(Hw, null);
}
function Ww(e) {
	let t = String(e ?? "").trim();
	ww("edit:site-analytics", () => {
		t ? I(hw).analytics = { token: t } : delete I(hw).analytics;
	});
}
var Gw = /* @__PURE__ */ O(() => I(hw)?.layout?.contentWidth ?? 1440), Kw = /* @__PURE__ */ O(() => I(hw)?.layout?.gutter ?? 6);
function qw() {
	let e = I(hw).site.lang ?? "no";
	return e === "no" ? "nb" : e;
}
function Jw() {
	let e = qw(), t = lj.sortLangs([...lj.LANG_OPTIONS, ...lj.sitePackLangs()]);
	return [...t.some(([t]) => t === e) ? [] : [[e, e]], ...t];
}
var Yw = /* @__PURE__ */ k(!1), Xw = /* @__PURE__ */ k(null), Zw = /* @__PURE__ */ k(null), Qw = () => I(hw)?.site?.calendars ?? [], $w = (e) => Qw().find((t) => t.id === e) ?? null, eT = () => I(hw)?.site?.links ?? [], tT = /* @__PURE__ */ k(null), nT = /* @__PURE__ */ k(!1);
function rT() {
	let e = {
		id: es("link"),
		icon: "globe",
		label: "",
		url: ""
	};
	return ww("site", () => {
		I(hw).site.links ??= [], I(hw).site.links.push(e);
	}), A(tT, e.id, !0), e.id;
}
function iT(e) {
	ww("site", () => {
		I(hw).site.links.splice(e, 1), I(hw).site.links.length || delete I(hw).site.links;
	});
}
function aT(e, t) {
	let n = e + t;
	ww("site", () => {
		let t = I(hw).site.links;
		n < 0 || n >= t.length || ([t[e], t[n]] = [t[n], t[e]]);
	});
}
function oT(e, t) {
	ww(`edit:site-link-${e}`, () => {
		let n = I(hw).site.links[e];
		for (let [e, r] of Object.entries(t)) r || e === "url" ? n[e] = r : delete n[e];
	});
}
function sT(e = {}) {
	let t = {
		id: es("cal"),
		url: "",
		...e
	};
	return ww("site", () => {
		I(hw).site.calendars ??= [], I(hw).site.calendars.unshift(t);
	}), A(Xw, t.id, !0), A(Zw, t.id, !0), A(Yw, !0), t.id;
}
var cT = /* @__PURE__ */ k(!1), lT = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 49.6V14.4l25.6 10.4V49.6' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E", uT = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
function dT(e) {
	ww("nav", () => {
		e === null ? delete I(hw).nav.launcher.image : delete I(hw).nav.launcher.links[e].image;
	});
}
function fT(e, t) {
	ww(e, () => {
		I(hw).footer ??= {
			version: 1,
			show: !1,
			text: "",
			align: "center"
		}, t(I(hw).footer);
	});
}
function pT(e, t) {
	let n = I(hw).nav.items;
	e === t || e < 0 || t < 0 || e >= n.length || t >= n.length || ww("nav", () => {
		let [r] = n.splice(e, 1);
		n.splice(t, 0, r);
	});
}
function mT(e, t, n) {
	let r = I(hw).nav.items[e].children;
	t === n || t < 0 || n < 0 || t >= r.length || n >= r.length || ww("nav", () => {
		let [e] = r.splice(t, 1);
		r.splice(n, 0, e);
	});
}
function hT(e) {
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
function gT() {
	return Object.fromEntries(Object.entries(I(hw).theme.tokens.color).map(([e, t]) => [e, hT(t)]));
}
function _T() {
	ww("theme", () => {
		I(hw).theme.alt = { tokens: { color: gT() } };
	});
}
function vT() {
	ww("theme", () => {
		I(hw).theme.alt.tokens.color = gT();
	});
}
function yT() {
	ww("theme", () => {
		delete I(hw).theme.alt;
	});
}
var bT = (e, t) => e && t && t[e] ? t[e] : e, xT = [
	"bg",
	"surface",
	"text",
	"accent",
	"accent-text"
], ST = /* @__PURE__ */ O(() => [
	{
		id: "well",
		name: K("themePreset.well.name"),
		note: K("themePreset.well.note"),
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
		name: K("themePreset.stone.name"),
		note: K("themePreset.stone.note"),
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
		name: K("themePreset.plum.name"),
		note: K("themePreset.plum.note"),
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
		name: K("themePreset.rose.name"),
		note: K("themePreset.rose.note"),
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
		name: K("themePreset.ocean.name"),
		note: K("themePreset.ocean.note"),
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
		name: K("themePreset.night.name"),
		note: K("themePreset.night.note"),
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
]);
function CT(e) {
	ww("theme", () => {
		let t = e.scheme === "dark", n = t ? e.dark : e.light, r = t ? e.light : e.dark;
		for (let e of xT) I(hw).theme.tokens.color[e] = n[e];
		t ? I(hw).theme.scheme = "dark" : delete I(hw).theme.scheme, I(hw).theme.alt = { tokens: { color: { ...r } } };
	});
}
var wT = /* @__PURE__ */ O(() => {
	if (!I(hw)) return null;
	let e = I(hw).theme.tokens.color, t = I(hw).theme.alt?.tokens?.color ?? {}, n = I(hw).theme.scheme === "dark";
	return I(ST).find((r) => {
		let i = n ? r.dark : r.light, a = n ? r.light : r.dark;
		return xT.every((n) => e[n] === i[n] && t[n] === a[n]);
	})?.id ?? null;
});
function TT() {
	Nn(() => {
		if (!I(Dw)) return;
		let e = (e) => {
			e.target.closest?.(".page-menu-wrap") || A(Dw, null);
		}, t = (e) => {
			e.key === "Escape" && A(Dw, null);
		}, n = () => {
			A(Dw, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	}), Nn(() => {
		lj.activePanel === "pages" && $.pageId && Rw();
	}), Nn(() => {
		let e = I(Zw);
		e && (A(Zw, null), Er().then(() => document.querySelector(`[data-cal-name="${e}"]`)?.focus()));
	}), Nn(() => {
		let e = I(tT);
		e && (A(tT, null), Er().then(() => document.querySelector(`[data-link-label="${e}"]`)?.focus()));
	}), Nn(() => {
		if (!I(hw)?.site) return;
		let e = I(hw).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		t && (typeof e != "string" || !e ? t.href = lT : uT.test(e) && (t.href = e));
	});
}
var Q = {
	BG_TYPES: lw,
	BG_DEFS: uw,
	get site() {
		return I(dw);
	},
	set site(e) {
		A(dw, e, !0);
	},
	get grid() {
		return I(fw);
	},
	set grid(e) {
		A(fw, e, !0);
	},
	get bindsFrom() {
		return I(pw);
	},
	set bindsFrom(e) {
		A(pw, e);
	},
	get siteStore() {
		return mw;
	},
	set siteStore(e) {
		mw = e;
	},
	get siteDraft() {
		return I(hw);
	},
	set siteDraft(e) {
		A(hw, e, !0);
	},
	linkSiteDraft: gw,
	pushSiteToPreview: _w,
	navBgMutate: vw,
	navBgCtx: yw,
	footerBgCtx: bw,
	get previewPalette() {
		return I(xw);
	},
	themeSwatches: Sw,
	setGrid: Cw,
	siteMutate: ww,
	get newPageTitle() {
		return I(Tw);
	},
	set newPageTitle(e) {
		A(Tw, e, !0);
	},
	get newPageTemplate() {
		return I(Ew);
	},
	set newPageTemplate(e) {
		A(Ew, e, !0);
	},
	get pageMenuFor() {
		return I(Dw);
	},
	set pageMenuFor(e) {
		A(Dw, e, !0);
	},
	RESERVED_SLUGS: Ow,
	pageSlugError: kw,
	addPage: Aw,
	savePageAsTemplate: jw,
	renamePage: Mw,
	get seoDraft() {
		return I(Nw);
	},
	set seoDraft(e) {
		A(Nw, e, !0);
	},
	readSeoDraft: Pw,
	setPageSeo: Fw,
	setPageNoindex: Iw,
	get missingSeo() {
		return I(Lw);
	},
	set missingSeo(e) {
		A(Lw, e, !0);
	},
	refreshMissingSeo: Rw,
	uploadOgImage: zw,
	setPageSlug: Bw,
	deletePage: Vw,
	get iconEditorImage() {
		return I(Hw);
	},
	set iconEditorImage(e) {
		A(Hw, e, !0);
	},
	applyIcon: Uw,
	setAnalyticsToken: Ww,
	get layoutWidth() {
		return I(Gw);
	},
	set layoutWidth(e) {
		A(Gw, e);
	},
	get layoutGutter() {
		return I(Kw);
	},
	set layoutGutter(e) {
		A(Kw, e);
	},
	siteLangValue: qw,
	siteLangOptions: Jw,
	get siteCalendarsOpen() {
		return I(Yw);
	},
	set siteCalendarsOpen(e) {
		A(Yw, e, !0);
	},
	get openSiteCalendar() {
		return I(Xw);
	},
	set openSiteCalendar(e) {
		A(Xw, e, !0);
	},
	get focusSiteCalendar() {
		return I(Zw);
	},
	set focusSiteCalendar(e) {
		A(Zw, e, !0);
	},
	siteLinks: eT,
	addSiteLink: rT,
	removeSiteLink: iT,
	moveSiteLink: aT,
	setSiteLink: oT,
	get focusSiteLink() {
		return I(tT);
	},
	set focusSiteLink(e) {
		A(tT, e, !0);
	},
	get siteLinksOpen() {
		return I(nT);
	},
	set siteLinksOpen(e) {
		A(nT, e, !0);
	},
	siteCalendars: Qw,
	siteCalendarById: $w,
	addSiteCalendar: sT,
	get siteZoneBad() {
		return I(cT);
	},
	set siteZoneBad(e) {
		A(cT, e, !0);
	},
	URD_MARK_ICON: lT,
	SAFE_ICON_RE: uT,
	clearLauncherImage: dT,
	footerMutate: fT,
	moveNavItemTo: pT,
	moveNavChildTo: mT,
	invertLightness: hT,
	suggestAltColors: gT,
	createAltTheme: _T,
	reSuggestAltTheme: vT,
	removeAltTheme: yT,
	themeHex: bT,
	THEME_PRESET_KEYS: xT,
	get THEME_PRESETS() {
		return I(ST);
	},
	applyThemePreset: CT,
	get activeThemePreset() {
		return I(wT);
	},
	effects: TT
}, ET = /* @__PURE__ */ O(() => ({
	text: K("blocks.text"),
	button: K("blocks.button"),
	image: K("blocks.image"),
	shape: K("blocks.shape"),
	video: K("blocks.video"),
	icon: K("blocks.icon"),
	gallery: K("blocks.gallery"),
	faq: K("blocks.faq"),
	collection: K("blocks.collection"),
	timeline: K("blocks.timeline"),
	quote: K("blocks.quote"),
	stats: K("blocks.stats"),
	ribbon: K("blocks.ribbon"),
	table: K("blocks.table"),
	share: K("blocks.share"),
	countdown: K("blocks.countdown"),
	audio: K("blocks.audio"),
	product: K("blocks.product"),
	cart: K("blocks.cart"),
	checkout: K("blocks.checkout"),
	map: K("blocks.map"),
	form: K("blocks.form"),
	calendar: K("blocks.calendar")
})), DT = /* @__PURE__ */ O(() => ({
	text: {
		type: "text",
		props: {
			html: K("seed.text"),
			align: "left"
		},
		w: 33,
		h: 28
	},
	"text-box": {
		type: "text",
		props: {
			html: K("seed.textBox"),
			align: "left",
			box: !0
		},
		w: 30,
		h: 150
	},
	button: {
		type: "button",
		props: {
			label: K("seed.newButton"),
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
			submitLabel: K("form.sendDefault"),
			successText: K("form.thanksDefault"),
			fields: $o()
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
					q: K("seed.faq.q1"),
					a: K("seed.faq.answer")
				},
				{
					q: K("seed.faq.q2"),
					a: K("seed.faq.answer")
				},
				{
					q: K("seed.faq.q3"),
					a: K("seed.faq.answer")
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
					title: K("seed.timeline.t1"),
					text: K("seed.timeline.text")
				},
				{
					year: "2022",
					title: K("seed.timeline.t2"),
					text: K("seed.timeline.text")
				},
				{
					year: "2026",
					title: K("seed.timeline.t3"),
					text: K("seed.timeline.text")
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
			text: K("seed.quoteBlock.text"),
			attribution: K("seed.quoteBlock.name"),
			role: K("seed.quoteBlock.role"),
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
			label: K("seed.statsBlock.label"),
			countUp: !0
		},
		w: 20,
		h: 90
	},
	ribbon: {
		type: "ribbon",
		props: {
			items: [
				K("seed.ribbonBlock.a"),
				K("seed.ribbonBlock.b"),
				K("seed.ribbonBlock.c")
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
					K("seed.table.h1"),
					K("seed.table.h2"),
					K("seed.table.h3")
				],
				[
					K("seed.table.r1c1"),
					K("seed.table.r1c2"),
					""
				],
				[
					K("seed.table.r2c1"),
					K("seed.table.r2c2"),
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
			doneText: K("seed.countdown.done"),
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
}));
function OT(e) {
	let t = I(DT)[e];
	return t ? {
		id: es("blk"),
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
function kT(e) {
	IE.bridge ? IE.bridge.sendPlaceBlock(e) : AT($.targetSection()?.id, e);
}
function AT(e, t) {
	let n = $.store.data.sections.find((t) => t.id === e) ?? $.store.data.sections[0];
	if (!n) return;
	ck.pushHistory("add-block");
	let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
	t.frames?.desktop && (t.frames.desktop = {
		...t.frames.desktop,
		z: r
	}), n.blocks.push(t), $.markDesktopChange(n, "block-added"), $.store.save(), ck.updateDirty(), IE.bridge?.sendSection($.pageId, n), $.fitBlockSoon(n.id, t);
}
function jT(e, t, n, r) {
	let i = $.store.data.sections.find((t) => t.id === e);
	if (!i || !t?.length) return;
	ck.pushHistory("add-blocks");
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
	}), $.markDesktopChange(i, "block-added"), $.store.save(), ck.updateDirty(), IE.bridge?.sendSection($.pageId, i);
}
var MT = {
	list: "calendar",
	cards: "calendar-cards",
	month: "calendar-month",
	next: "calendar-next",
	agenda: "calendar-agenda",
	week: "calendar-month",
	day: "calendar",
	year: "calendar-month"
};
function NT(e) {
	let t = rh(e), n = OT(MT[t.view] ?? "calendar");
	n && (n.props = {
		...n.props,
		...t.view ? { view: t.view } : {},
		...t.id === "plain" ? {} : { design: t.id },
		...t.view === "next" ? {
			nextCount: 3,
			laterCount: 3
		} : {}
	}, kT(n));
}
function PT(e) {
	let t = OT(e.kind);
	if (t) {
		if (e.at && typeof e.at.x == "number" && typeof e.at.y == "number") {
			let n = $.store.data.sections.find((t) => t.id === e.sectionId)?.grid ?? Q.siteDraft.grid, r = kC({
				x: e.at.x,
				y: e.at.y,
				w: t.frames.desktop.w,
				h: t.frames.desktop.h,
				grid: n
			});
			t.frames.desktop.x = r.x, t.frames.desktop.y = r.y;
		} else t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40;
		AT(e.sectionId, t), IE.bridge?.sendSelect(t.id), e.kind === "image" && lj.setStatus(K("status.imageBlockAdded")), e.kind === "gallery" && lj.setStatus(K("status.galleryBlockAdded"));
	}
}
var FT = {
	get BLOCK_LABELS() {
		return I(ET);
	},
	get BLOCK_DEFAULTS() {
		return I(DT);
	},
	buildBlock: OT,
	requestPlacement: kT,
	insertBlock: AT,
	insertBlocks: jT,
	CAL_KIND_BY_VIEW: MT,
	addCalendarDesign: NT,
	handleRequestBlock: PT
};
//#endregion
//#region src/state/bridge.svelte.js
function IT(e) {
	let { section: t, block: n } = $.readBlock(e.sectionId, e.blockId);
	t && n?.sticky && pg.some(([t]) => t === e.dock) && (ck.pushHistory(`sticky-dock:${e.blockId}`), n.sticky = {
		...n.sticky,
		dock: e.dock
	}, $.store.save(), ck.updateDirty(), IE.bridge?.sendSection($.pageId, t), $.syncSelectedBlock());
}
function LT(e) {
	let t = e.blockIds ?? [], { section: n } = $.readBlock(e.sectionId, t[0]);
	if (!n || !t.length) return;
	ck.pushHistory(`sticky-group:${e.sectionId}`);
	let r = e.on ? es("stk") : null;
	for (let e of n.blocks) t.includes(e.id) && (e.sticky = r ? {
		offset: 16,
		until: null,
		...e.sticky,
		group: r
	} : null);
	$.markDesktopChange(n, "block-edited"), $.store.save(), ck.updateDirty(), IE.bridge?.sendSection($.pageId, n), $.syncSelectedBlock(), lj.setStatus(K(e.on ? "status.stickyGrouped" : "status.stickyUngrouped"));
}
function RT(e) {
	let t = $.store.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
	n && (ck.pushHistory(`edit:${e.blockId}`), n.props = e.props, $.store.save(), ck.updateDirty(), $.selectedBlock?.blockId === e.blockId && $.syncSelectedBlock(), e.rerender && IE.bridge?.sendSection($.pageId, t), lj.status = "", $.fitBlockSoon(t.id, n));
}
function zT(e) {
	let t = $.store.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
	if (!n) return;
	ck.pushHistory(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
	let r = e.frameKey === "mobile" ? "mobile" : "desktop", i = n.frames.desktop?.w;
	n.frames[r] = e.frame, r === "desktop" && $.markDesktopChange(t, "desktop-changed-after-mobile"), $.store.save(), ck.updateDirty(), $.selectedBlock?.blockId === e.blockId && $.syncSelectedBlock(), r === "desktop" && e.frame?.w !== i ? $.fitBlockSoon(t.id, n) : r === "mobile" && $.phoneFitSoon(t.id, n);
}
function BT(e) {
	let t = $.store.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
	n?.frames?.desktop && n.frames.desktop.h !== e.h && (e.fit ? IE.viewMode === "desktop" && e.seq === $.fitSeq.get(e.blockId) && VT(t, n, e.h) : ($.store.amendBaseline((t) => {
		let n = t.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		n?.frames?.desktop && (n.frames.desktop.h = e.h);
	}), $.store.hasDraft() && ck.pushHistory(`edit:${e.blockId}`), n.frames.desktop.h = e.h, $.store.save(), ck.updateDirty(), $.selectedBlock?.blockId === e.blockId && $.syncSelectedBlock()));
}
function VT(e, t, n) {
	let r = uc(e.blocks, t.id, n), i = {};
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
	$.markDesktopChange(e, "block-edited"), $.store.save(), ck.updateDirty(), $.selectedBlock?.blockId === t.id && $.syncSelectedBlock(), IE.bridge?.sendFrames(e.id, Xe(i));
}
function HT(e) {
	let t = $.store.data.sections.find((t) => t.id === e.sectionId);
	if (t) {
		if (ck.pushHistory("mobile-reset"), e.blockId) {
			let n = t.blocks.find((t) => t.id === e.blockId);
			n && (n.frames.mobile = null);
		} else for (let e of t.blocks) e.frames.mobile = null;
		!$.hasMobileOverrides(t) && t.responsive?.mobile && (t.responsive.mobile.attention = null), $.store.save(), ck.updateDirty(), lj.updateAttention(), IE.bridge?.sendSection($.pageId, t);
	}
}
function UT(e) {
	let t = $.store.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
	n && typeof e.mobileOrder == "number" && (ck.pushHistory("mobile-order"), n.mobileOrder = e.mobileOrder, $.store.save(), ck.updateDirty(), IE.bridge?.sendSection($.pageId, t));
}
function WT(e) {
	let t = $.store.data.sections.find((t) => t.id === e.sectionId);
	t?.responsive?.mobile && (ck.pushHistory("review-done"), t.responsive.mobile.attention = null, $.store.save(), ck.updateDirty(), lj.updateAttention());
}
function GT(e) {
	let t = $.store.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
	n && (ck.pushHistory("block-flag"), typeof e.decor == "boolean" && (n.decor = e.decor), typeof e.hideMobile == "boolean" && (n.hideMobile = e.hideMobile), $.store.save(), ck.updateDirty(), typeof e.hideMobile == "boolean" && IE.viewMode === "mobile" && IE.bridge?.sendSection($.pageId, t), $.selectedBlock?.blockId === e.blockId && $.syncSelectedBlock());
}
function KT(e) {
	ck.pushHistory("add-section"), e.section.id || (e.section.id = es("sec")), $.store.data.sections.splice(e.index, 0, e.section), $.store.save(), ck.updateDirty(), IE.bridge?.sendPage($.pageId, $.store.data), $.activeSectionId = e.section.id, $.syncSectionMirrors(e.section), lj.activePanel = "properties";
}
function qT(e) {
	let t = $.store.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
	n < 0 || r < 0 || r >= t.length || (ck.pushHistory("move-section"), [t[n], t[r]] = [t[r], t[n]], $.store.save(), ck.updateDirty(), IE.bridge?.sendPage($.pageId, $.store.data));
}
function JT(e) {
	ck.pushHistory("delete-section"), e.sectionId === $.activeSectionId && ($.activeSectionId = null, $.sectionGrid = null), $.selectedBlock?.sectionId === e.sectionId && ($.selectedBlock = null), $.store.data.sections = $.store.data.sections.filter((t) => t.id !== e.sectionId), $.store.save(), ck.updateDirty(), IE.bridge?.sendPage($.pageId, $.store.data);
}
function YT(e) {
	let t = $.store.data.sections.find((t) => t.id === e.sectionId);
	if (t) {
		ck.pushHistory("section-size"), t.size = {
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
		e.moves?.length && ($.markDesktopChange(t, "section-height"), $.selectedBlock?.sectionId === e.sectionId && $.syncSelectedBlock()), e.sectionId === $.activeSectionId && ($.sectionMinHeight = e.minHeight), $.store.save(), ck.updateDirty();
	}
}
function XT(e) {
	let t = $.store.data.sections.find((t) => t.id === e.fromSectionId), n = $.store.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
	t && n && r && (ck.pushHistory(e.groupKey ? `edit:${e.groupKey}` : "move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), $.markDesktopChange(t, "block-moved"), $.markDesktopChange(n, "block-moved"), $.store.save(), ck.updateDirty(), lj.updateAttention(), IE.bridge?.sendSection($.pageId, t), IE.bridge?.sendSection($.pageId, n), $.selectedBlock?.blockId === e.blockId && ($.selectedBlock = {
		...$.selectedBlock,
		sectionId: e.toSectionId
	}, $.syncSelectedBlock()));
}
function ZT(e) {
	let t = $.store.data.sections.find((t) => t.id === e.sectionId);
	if (!t) return;
	let n = e.blockIds ?? [e.blockId];
	ck.pushHistory("delete-block"), t.blocks = t.blocks.filter((e) => !n.includes(e.id)), n.includes($.selectedBlock?.blockId) && ($.selectedBlock = null), $.markDesktopChange(t, "block-deleted"), $.store.save(), ck.updateDirty(), IE.bridge?.sendSection($.pageId, t);
}
var QT = {
	handleStickyDock: IT,
	handleStickyGroup: LT,
	handleEdit: RT,
	handleMove: zT,
	handleGrow: BT,
	applyFit: VT,
	handleMobileReset: HT,
	handleMobileOrder: UT,
	handleReviewDone: WT,
	handleBlockFlag: GT,
	handleAddSection: KT,
	handleMoveSection: qT,
	handleDeleteSection: JT,
	handleSectionSize: YT,
	handleMoveBlockSection: XT,
	handleDelete: ZT
}, $T = /* @__PURE__ */ k(null), eE = /* @__PURE__ */ k(!0), tE = /* @__PURE__ */ k(pn(JS(typeof window < "u" ? window : null) ?? 1920)), nE = "urd-admin-screen";
function rE() {
	let e = null;
	try {
		e = JSON.parse(localStorage.getItem(nE) ?? "null");
	} catch {
		e = null;
	}
	return YS(e, I(tE));
}
var iE = /* @__PURE__ */ k(pn(rE()));
function aE(e) {
	A(iE, YS({
		...Xe(I(iE)),
		...e
	}, I(tE)), !0);
	try {
		localStorage.setItem(nE, JSON.stringify(I(iE)));
	} catch {}
}
var oE = /* @__PURE__ */ O(() => XS(I(iE), I(tE))), sE = [
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
], cE = /* @__PURE__ */ O(() => [{
	id: "desktop",
	width: I(oE).width,
	height: I(oE).height || null,
	viewport: "desktop"
}, ...sE]);
function lE(e) {
	let t = ap(Q.layoutWidth, Q.layoutGutter, e.width).width;
	return K(e.id === "desktop" ? I(iE).mode === "own" ? "tip.view.desktop" : e.height ? "tip.view.desktopSizeH" : "tip.view.desktopSize" : `tip.view.${e.id}`, {
		w: e.width,
		h: e.height ?? 0,
		c: t
	});
}
var uE = /* @__PURE__ */ k("desktop"), dE = /* @__PURE__ */ O(() => I(cE).find((e) => e.id === I(uE)) ?? I(cE)[0]), fE = /* @__PURE__ */ O(() => I(dE).viewport === "mobile" || I(dE).width <= (Q.siteDraft?.breakpoints?.mobile ?? 640) ? "mobile" : "desktop"), pE = /* @__PURE__ */ k(null), mE = /* @__PURE__ */ k(0), hE = /* @__PURE__ */ k(0), gE = /* @__PURE__ */ k("fit"), _E = /* @__PURE__ */ k(1), vE = /* @__PURE__ */ O(() => I(dE).width), yE = /* @__PURE__ */ O(() => I(dE).height ?? 0), bE = /* @__PURE__ */ O(() => I(gE) === "manual" ? I(_E) : DC(I(mE), I(vE), "fit", I(hE), I(yE)));
function xE(e) {
	A(_E, Math.min(400, Math.max(10, (Math.round(Math.round(I(bE) * 100) / 10) + e) * 10)) / 100), A(gE, "manual");
}
var SE = /* @__PURE__ */ O(() => I(yE) > 0 ? I(yE) : I(bE) > 0 ? I(hE) / I(bE) : I(hE)), CE = /* @__PURE__ */ O(() => I(vE) * I(bE)), wE = /* @__PURE__ */ O(() => I(yE) > 0 ? I(yE) * I(bE) : I(hE)), TE = /* @__PURE__ */ O(() => I(CE) > I(mE) + 1 || I(wE) > I(hE) + 1), EE = /* @__PURE__ */ k(null), DE = () => {
	let e = null;
	try {
		e = localStorage.getItem("urd-theme-mode");
	} catch {}
	return Os(Q.siteDraft?.theme?.scheme, e, window.matchMedia("(prefers-color-scheme: dark)").matches);
}, OE = /* @__PURE__ */ k("light");
function kE() {
	I(EE)?.destroy(), I($T)?.contentDocument?.addEventListener("pointerdown", () => {
		$.blockMenu &&= null;
	}, !0), A(EE, OC(I($T), {
		onEdit: QT.handleEdit,
		onMove: QT.handleMove,
		onGrow: QT.handleGrow,
		onDelete: QT.handleDelete,
		onAddSection: QT.handleAddSection,
		onMoveSection: QT.handleMoveSection,
		onDeleteSection: QT.handleDeleteSection,
		onSectionSize: QT.handleSectionSize,
		onUndo: (e) => e.redo ? ck.redo() : ck.undo(),
		onSelectSection: $.onSelectSection,
		onSelectBlock: $.onSelectBlock,
		onBlockMenu: $.onBlockMenu,
		onReady: AE,
		onNavigate: jE,
		onAddBlock: (e) => FT.insertBlock(e.sectionId, e.block),
		onAddBlocks: (e) => FT.insertBlocks(e.sectionId, e.blocks, e.minBottom, e.moves),
		onRequestBlock: FT.handleRequestBlock,
		onMoveBlockSection: QT.handleMoveBlockSection,
		onMobileReset: QT.handleMobileReset,
		onMobileOrder: QT.handleMobileOrder,
		onReviewDone: QT.handleReviewDone,
		onBlockFlag: QT.handleBlockFlag,
		onCollectionEdit: Ak.handleCollectionEdit,
		onCollectionAdd: Ak.handleCollectionAdd,
		onSaveTemplate: cw.handleSaveTemplate,
		onStickyGroup: QT.handleStickyGroup,
		onStickyDock: QT.handleStickyDock,
		onDeleteTemplate: cw.handleDeleteTemplate,
		onApplyLayout: $.handleApplyLayout,
		onPluginBlocks: (e) => {
			rD.pluginBlocks = e.blocks ?? [];
		},
		onNavWidth: (e) => Q.siteMutate("edit:nav-width", () => {
			Q.siteDraft.nav.style ??= {}, Q.siteDraft.nav.style.width = e.width;
		})
	}));
}
async function AE() {
	await $.pageLoading, await rD.pluginsReady, I(EE)?.sendPlugins(Xe(rD.pluginsView)?.enabled ?? []), I(EE)?.sendViewport(I(fE)), I(EE)?.sendZoom(I(bE)), Ak.pushCollectionsToPreview(), cw.pushTemplatesToPreview(), Q.siteStore.hasDraft() && Q.pushSiteToPreview();
	let e = !Q.site.pages.some((e) => e.id === $.pageId);
	($.store.hasDraft() || e) && I(EE)?.sendPage($.pageId, $.store.data), I(eE) || I(EE)?.sendChrome(!1), lj.gridOn && I(EE)?.sendShowGrid(!0), lj.guidesOn && I(EE)?.sendShowGuides(!0), lj.sendAdminTheme();
}
function jE(e) {
	let t = e.path.replace(/\/$/, "") || "/", n = Q.siteDraft.pages.find((e) => e.path === t);
	n && n.id !== $.pageId && $.selectPage(n.id);
}
function ME() {
	I($T) && (I($T).src = I($T).src);
}
var NE = 0;
async function PE() {
	I(eE) && (NE = lj.panelEl?.scrollTop ?? 0), A(eE, !I(eE)), I(EE)?.sendChrome(I(eE)), I(eE) || ($.blockMenu = null), I(eE) && (await Er(), requestAnimationFrame(() => {
		lj.panelEl && (lj.panelEl.scrollTop = NE);
	}));
}
function FE() {
	Nn(() => {
		let e = () => I(EE)?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), Nn(() => {
		let e = I(fE);
		I(EE)?.sendViewport(e);
	}), Nn(() => {
		let e = I(bE);
		I(EE)?.sendZoom(e);
	}), Nn(() => {
		let e = () => {
			A(tE, JS(window) ?? I(tE), !0);
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}), Nn(() => {
		let e = I(pE);
		if (!e || typeof ResizeObserver > "u") return;
		let t = () => {
			A(mE, e.clientWidth, !0), A(hE, e.clientHeight, !0);
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	}), Nn(() => {
		A(OE, DE(), !0);
		let e = window.matchMedia("(prefers-color-scheme: dark)"), t = (e) => {
			e instanceof StorageEvent && e.key && e.key !== "urd-theme-mode" || A(OE, DE(), !0);
		};
		return e.addEventListener("change", t), window.addEventListener("storage", t), () => {
			e.removeEventListener("change", t), window.removeEventListener("storage", t);
		};
	});
}
var IE = {
	get iframeEl() {
		return I($T);
	},
	set iframeEl(e) {
		A($T, e, !0);
	},
	get chromeVisible() {
		return I(eE);
	},
	set chromeVisible(e) {
		A(eE, e, !0);
	},
	get ownWidth() {
		return I(tE);
	},
	set ownWidth(e) {
		A(tE, e, !0);
	},
	SCREEN_PREF_KEY: nE,
	readScreenPref: rE,
	get screenPref() {
		return I(iE);
	},
	set screenPref(e) {
		A(iE, e, !0);
	},
	setScreenPref: aE,
	get screenTarget() {
		return I(oE);
	},
	set screenTarget(e) {
		A(oE, e);
	},
	FIXED_DEVICES: sE,
	get devices() {
		return I(cE);
	},
	set devices(e) {
		A(cE, e);
	},
	deviceTip: lE,
	get deviceId() {
		return I(uE);
	},
	set deviceId(e) {
		A(uE, e, !0);
	},
	get device() {
		return I(dE);
	},
	set device(e) {
		A(dE, e);
	},
	get viewMode() {
		return I(fE);
	},
	set viewMode(e) {
		A(fE, e);
	},
	get frameWrapEl() {
		return I(pE);
	},
	set frameWrapEl(e) {
		A(pE, e, !0);
	},
	get frameW() {
		return I(mE);
	},
	set frameW(e) {
		A(mE, e, !0);
	},
	get frameH() {
		return I(hE);
	},
	set frameH(e) {
		A(hE, e, !0);
	},
	get zoomMode() {
		return I(gE);
	},
	set zoomMode(e) {
		A(gE, e, !0);
	},
	get manualZoom() {
		return I(_E);
	},
	set manualZoom(e) {
		A(_E, e, !0);
	},
	get targetW() {
		return I(vE);
	},
	set targetW(e) {
		A(vE, e);
	},
	get targetH() {
		return I(yE);
	},
	set targetH(e) {
		A(yE, e);
	},
	get scale() {
		return I(bE);
	},
	set scale(e) {
		A(bE, e);
	},
	stepZoom: xE,
	get iframeH() {
		return I(SE);
	},
	set iframeH(e) {
		A(SE, e);
	},
	get stageW() {
		return I(CE);
	},
	set stageW(e) {
		A(CE, e);
	},
	get stageH() {
		return I(wE);
	},
	set stageH(e) {
		A(wE, e);
	},
	get canPan() {
		return I(TE);
	},
	set canPan(e) {
		A(TE, e);
	},
	get bridge() {
		return I(EE);
	},
	set bridge(e) {
		A(EE, e);
	},
	readPreviewMode: DE,
	get previewMode() {
		return I(OE);
	},
	set previewMode(e) {
		A(OE, e, !0);
	},
	onIframeLoad: kE,
	onReady: AE,
	onNavigate: jE,
	reloadPreview: ME,
	get panelScroll() {
		return NE;
	},
	set panelScroll(e) {
		NE = e;
	},
	toggleChrome: PE,
	effects: FE
}, LE = null, RE, zE = new Promise((e) => {
	RE = e;
}), BE = /* @__PURE__ */ k(null), VE = /* @__PURE__ */ k(pn({})), HE = /* @__PURE__ */ k("0.0.0"), UE = /* @__PURE__ */ k(pn([])), WE = /* @__PURE__ */ k(pn([])), GE = /* @__PURE__ */ k("pending"), KE = () => [.../* @__PURE__ */ new Set([...I(BE)?.enabled ?? [], ...I(BE)?.disabled ?? []])];
function qE() {
	A(BE, JSON.parse(JSON.stringify(LE.data)), !0);
}
var JE = /* @__PURE__ */ k(null);
async function YE() {
	try {
		let e = (await fetch("/urd.json", { cache: "no-store" })).headers.get("content-security-policy");
		if (!e) {
			A(JE, { unknown: !0 }, !0);
			return;
		}
		let t = (t) => new Set((e.split(";").map((e) => e.trim()).find((e) => e.startsWith(`${t} `)) ?? "").split(/\s+/).slice(1));
		A(JE, {
			frameSrc: t("frame-src"),
			connectSrc: t("connect-src"),
			scriptSrc: t("script-src")
		}, !0);
	} catch {
		A(JE, { unknown: !0 }, !0);
	}
}
async function XE() {
	YE();
	let e = {
		version: 1,
		enabled: []
	};
	try {
		e = await (await fetch("/plugins/plugins.json")).json();
	} catch {}
	A(WE, e.enabled ?? [], !0), LE = fC("urd-draft-plugins", () => e, lj.draftSaveError), qE();
	try {
		A(HE, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
	} catch {}
	for (let e of KE()) $E(e);
	ZE(), RE(), IE.bridge?.sendPlugins(Xe(I(BE))?.enabled ?? []);
}
async function ZE() {
	try {
		let e = await fetch("/api/github/plugins");
		if (!e.ok) {
			QE();
			return;
		}
		let { plugins: t } = await e.json();
		localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), A(UE, (t ?? []).filter((e) => !KE().includes(e)), !0);
		for (let e of I(UE)) $E(e);
		A(GE, "ok");
	} catch {
		QE();
	}
}
function QE() {
	try {
		let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
		if (Array.isArray(e) && e.length) {
			A(UE, e.filter((e) => !KE().includes(e)), !0);
			for (let e of I(UE)) $E(e);
			A(GE, "ok");
			return;
		}
	} catch {}
	A(GE, "unavailable");
}
async function $E(e) {
	try {
		let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = TC(t);
		I(VE)[e] = {
			...t,
			errors: n,
			satisfied: n.length === 0 && CC(I(HE), t.requiresEngine)
		};
	} catch {
		I(VE)[e] = {
			name: e,
			errors: [K("plugin.manifestNotFound", { id: e })],
			satisfied: !1
		};
	}
}
function eD(e, t) {
	ck.pushHistory("plugins");
	let n = LE.data;
	n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), LE.save(), ck.updateDirty(), qE(), IE.reloadPreview();
}
function tD(e) {
	ck.pushHistory("plugins");
	let t = LE.data;
	t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), LE.save(), ck.updateDirty(), qE(), IE.reloadPreview();
}
var nD = /* @__PURE__ */ k(pn([])), rD = {
	get pluginsStore() {
		return LE;
	},
	set pluginsStore(e) {
		LE = e;
	},
	get resolvePluginsReady() {
		return RE;
	},
	set resolvePluginsReady(e) {
		RE = e;
	},
	pluginsReady: zE,
	get pluginsView() {
		return I(BE);
	},
	set pluginsView(e) {
		A(BE, e, !0);
	},
	get pluginInfo() {
		return I(VE);
	},
	set pluginInfo(e) {
		A(VE, e, !0);
	},
	get pluginEngine() {
		return I(HE);
	},
	set pluginEngine(e) {
		A(HE, e, !0);
	},
	get pluginsFound() {
		return I(UE);
	},
	set pluginsFound(e) {
		A(UE, e, !0);
	},
	get publishedPluginIds() {
		return I(WE);
	},
	set publishedPluginIds(e) {
		A(WE, e, !0);
	},
	get pluginDiscovery() {
		return I(GE);
	},
	set pluginDiscovery(e) {
		A(GE, e, !0);
	},
	knownPlugins: KE,
	syncPluginsView: qE,
	get liveCsp() {
		return I(JE);
	},
	set liveCsp(e) {
		A(JE, e, !0);
	},
	loadLiveCsp: YE,
	initPlugins: XE,
	discoverPlugins: ZE,
	useCachedDiscovery: QE,
	loadPluginInfo: $E,
	setPluginEnabled: eD,
	removePlugin: tD,
	get pluginBlocks() {
		return I(nD);
	},
	set pluginBlocks(e) {
		A(nD, e, !0);
	}
}, iD = /* @__PURE__ */ k(null);
function aD(e) {
	let t = cD.data.sections.find((t) => t.id === e.sectionId);
	if (t) {
		ck.pushHistory("layout");
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
		}, sD(t, "layout-changed"), e.sectionId === I(lO) && A(dO, e.minHeight, !0), I(dD)?.sectionId === e.sectionId && pD(), cD.save(), ck.updateDirty(), IE.bridge?.sendSection(I(iD), t);
	}
}
function oD(e) {
	return e?.blocks?.some((e) => e.frames?.mobile) ?? !1;
}
function sD(e, t) {
	e && oD(e) && (e.responsive?.mobile?.attention?.needed || (e.responsive = {
		...e.responsive ?? {},
		mobile: {
			...e.responsive?.mobile ?? { mode: "auto" },
			attention: {
				needed: !0,
				reason: t,
				since: (/* @__PURE__ */ new Date()).toISOString()
			}
		}
	}, lj.updateAttention(), IE.bridge?.sendAttention(e.id, !0)));
}
var cD = null, lD = /* @__PURE__ */ new Set(), uD = () => Q.siteDraft.pages.find((e) => e.id === I(iD)), dD = /* @__PURE__ */ k(null);
function fD(e, t) {
	let n = cD?.data.sections.find((t) => t.id === e);
	return {
		section: n,
		block: n?.blocks.find((e) => e.id === t)
	};
}
function pD() {
	if (!I(dD)) return;
	let { block: e } = fD(I(dD).sectionId, I(dD).blockId);
	e ? A(dD, {
		sectionId: I(dD).sectionId,
		blockId: I(dD).blockId,
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
	}, !0) : A(dD, null);
}
function mD(e) {
	A(hD, null), e.blockId ? (A(dD, {
		sectionId: e.sectionId,
		blockId: e.blockId
	}, !0), e.sectionId && A(lO, e.sectionId, !0), pD()) : A(dD, null);
}
var hD = /* @__PURE__ */ k(null);
function gD() {
	Kh(IE.frameWrapEl?.getBoundingClientRect().left ?? 0);
}
var _D = /* @__PURE__ */ k(null), vD = null, yD = null;
function bD(e) {
	mD(e), I(dD) && (yD = e.rect, A(hD, SD(e.rect), !0));
}
function xD() {
	return gD(), {
		w: Math.min(Uh.wide && Uh.room >= 740 ? 740 : 400, window.innerWidth - 16),
		h: Math.min(window.innerHeight * .72, 620)
	};
}
function SD(e) {
	let t = xD(), n = {
		w: window.innerWidth,
		h: window.innerHeight
	};
	if (Uh.place) return pC(Uh.place, t, n, Uh.min);
	let r = IE.iframeEl?.getBoundingClientRect();
	if (!r) return {
		left: Uh.min,
		top: 8
	};
	let i = IE.scale, { left: a, top: o } = hC({
		left: r.left + i * e.left,
		top: r.top + i * e.top,
		right: r.left + i * e.right,
		bottom: r.top + i * e.bottom
	}, t, n, { min: Uh.min });
	return {
		left: a,
		top: o
	};
}
function CD(e, t = xD()) {
	let n = pC(e, t, {
		w: window.innerWidth,
		h: window.innerHeight
	}, Uh.min);
	Uh.place = n, A(hD, n, !0);
}
function wD() {
	Uh.place = null, yD && A(hD, SD(yD), !0);
}
function TD(e, t) {
	let { section: n, block: r } = fD(I(dD)?.sectionId, I(dD)?.blockId);
	r && (e && ck.pushHistory(e), t(r, n), sD(n, "block-edited"), cD.save(), ck.updateDirty(), IE.bridge?.sendSection(I(iD), n), pD(), BD(n.id, r));
}
function ED(e, t) {
	TD(`edit:${I(dD).blockId}:${e}`, (n) => {
		n.props[e] = t;
	});
}
function DD(e, t) {
	TD(`edit:${I(dD).blockId}:${e}`, (e) => {
		Object.assign(e.props, t);
	});
}
function OD(e, t) {
	let n = I(dD).props;
	return Object.entries(t).some(([e, t]) => n[e] !== void 0 && JSON.stringify(n[e]) !== JSON.stringify(t)) ? () => DD(e, { ...t }) : null;
}
function kD(e) {
	let t = I(dD).props;
	return Object.entries(e).filter(([e, n]) => t[e] !== void 0 && JSON.stringify(t[e]) !== JSON.stringify(n)).length;
}
var AD = () => [["on", K("common.on")], ["off", K("common.off")]], jD = () => [
	["canvas", K("opt.ribbonWidth.content")],
	["page", K("opt.ribbonWidth.page")],
	["content", K("opt.ribbonWidth.own")]
], MD = (e) => e === "canvas" || e === "page" ? e : "content", ND = () => [
	["roll", K("opt.ribbonMotion.roll")],
	["sway", K("opt.ribbonMotion.sway")],
	["step", K("opt.ribbonMotion.step")],
	["none", K("opt.ribbonMotion.none")]
];
function PD() {
	return [...Q.siteDraft.pages.map((e) => [e.id, e.title]), ["__href", K("opt.externalLink")]];
}
function FD(e) {
	let t = e === "__href" ? null : e;
	TD(`edit:${I(dD).blockId}`, (e) => {
		e.props.page = t, t && (e.props.href = null);
	});
}
function ID() {
	IE.bridge?.sendOpenImageEditor(I(dD).blockId), A(hD, null);
}
var LD = /* @__PURE__ */ new Map(), RD = /* @__PURE__ */ new Map(), zD = 0;
function BD(e, t) {
	if (WD(e, t), IE.viewMode !== "desktop" || !ec(t)) return;
	clearTimeout(LD.get(t.id));
	let n = ++zD;
	RD.set(t.id, n), LD.set(t.id, setTimeout(() => IE.bridge?.sendFitBlock(e, t.id, n), 60));
}
var VD = /* @__PURE__ */ new Map(), HD = null, UD = "";
function WD(e, t) {
	if (!tc.has(t.type) || !ec(t)) return;
	HD ??= _C({
		title: () => K("canvas.phoneMeasure"),
		prepare: (e, t) => {
			let n = Xe(rD.pluginsView)?.enabled ?? [], r = JSON.stringify(n);
			(t || r !== UD) && e({
				type: "urd-plugins",
				enabled: n
			}), UD = r, e({
				type: "urd-site",
				site: Xe(Q.siteDraft)
			}), e({
				type: "urd-collections",
				collections: Xe(Ak.collectionsView) ?? {}
			});
		},
		onHeight: GD
	});
	let n = ++zD;
	VD.set(t.id, n), HD.request(I(iD), Xe(cD.data), e, t.id, n);
}
function GD(e, t, n, r) {
	if (e !== I(iD) || r !== VD.get(t)) return;
	let i = cD.data.sections.flatMap((e) => e.blocks).find((e) => e.id === t), a = Math.round(n);
	i && a > 0 && i.mobileHeight !== a && (i.mobileHeight = a, cD.save(), ck.updateDirty());
}
function KD() {
	for (let e of LD.values()) clearTimeout(e);
	LD.clear(), RD.clear(), VD.clear(), HD?.cancel();
}
function qD(e) {
	let t = rh(e), n = t.view === "next" ? {
		nextCount: I(dD).props.nextCount ?? 3,
		laterCount: I(dD).props.laterCount ?? 3
	} : {}, r = t.id === "plain" && ![
		"list",
		"cards",
		"month",
		"agenda",
		"next"
	].includes(ih(I(dD).props)) ? { view: "list" } : {};
	DD("design", {
		design: t.id === "plain" ? void 0 : t.id,
		...t.view ? { view: t.view } : {},
		...r,
		...n
	});
}
function JD(e) {
	TD(`edit:${I(dD).blockId}:fit`, (t) => {
		e === "shrink" || e === "both" ? (t.fit = e, t.fitMin ??= .6) : (delete t.fit, delete t.fitMin);
	});
}
function YD(e) {
	TD(`edit:${I(dD).blockId}:fitMin`, (t) => {
		t.fitMin = e;
	});
}
var XD = null;
function ZD(e) {
	TD(`edit:${I(dD).blockId}:size`, (t, n) => {
		XD?.blockId !== t.id && (XD = {
			blockId: t.id,
			size: sc(t),
			frame: { ...t.frames.desktop },
			ys: new Map(n.blocks.filter((e) => e.frames?.desktop).map((e) => [e.id, e.frames.desktop.y]))
		}), e === 1 ? (delete t.size, delete t.sizeMin, delete t.sizeMax) : t.size = e;
		let r = XD;
		for (let e of n.blocks) e.id !== t.id && e.frames?.desktop && r.ys.has(e.id) && (e.frames.desktop = {
			...e.frames.desktop,
			y: r.ys.get(e.id)
		});
		t.frames.desktop = { ...r.frame };
		let i = sc(t) / r.size;
		if (i === 1) return;
		let a = {
			...r.frame,
			w: Math.min(Math.round(r.frame.w * i * 100) / 100, Math.round((100 - r.frame.x) * 100) / 100)
		};
		if (!ec(t)) {
			a.h = Math.max(1, Math.round(r.frame.h * i));
			for (let [e, r] of uc(n.blocks, t.id, a.h)) {
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
function QD(e, t) {
	let n = e === "sizeMin" ? oc.minDefault : oc.maxDefault;
	TD(`edit:${I(dD).blockId}:${e}`, (r) => {
		let i = Math.round(Number(t));
		Number.isFinite(i) && i > 0 && i !== n ? r[e] = Math.min(oc.max, Math.max(oc.min, i)) : delete r[e];
	});
}
function $D(e) {
	TD(`edit:${I(dD).blockId}:height`, (t) => {
		e === "own" ? t.height = { mode: "own" } : delete t.height;
	});
}
function eO(e) {
	TD(`edit:${I(dD).blockId}:heightAlign`, (t) => {
		t.height = { mode: "own" }, e !== "top" && (t.height.align = e);
	});
}
function tO() {
	let e = I(dD);
	if (nc.has(e.type)) return !0;
	if (e.type !== "calendar") return !1;
	let t = rh(e.props.design);
	return !t.module && ["list", "cards"].includes(t.view);
}
function nO(e, t) {
	Number.isFinite(t) && TD(`edit:frame-${I(dD).blockId}:${e}`, (n) => {
		n.frames.desktop = {
			...n.frames.desktop,
			[e]: t
		};
	});
}
function rO() {
	let e = cD.data.sections.find((e) => e.id === I(dD)?.sectionId)?.size?.maxWidth, t = typeof Q.layoutWidth == "number" ? Q.layoutWidth : 0;
	return e === "full" ? 0 : e ? /^\d+(\.\d+)?px$/.test(e) ? Math.min(parseFloat(e), t || Infinity) : 0 : t;
}
function iO(e) {
	return Math.round(e / 100 * rO());
}
function aO(e, t) {
	let n = rO();
	if (!Number.isFinite(e) || e < 4 || !(n > 0)) return;
	let { x: r, w: i, h: a } = I(dD).frame, o = Math.max(.5, Math.min(Math.round(e / n * 200) / 2, Math.round((100 - r) * 2) / 2)), s = t ? Math.max(1, Math.round(o / i * a)) : a;
	Number.isFinite(o) && Number.isFinite(s) && TD(`edit:frame-${I(dD).blockId}:size`, (e) => {
		e.frames.desktop = {
			...e.frames.desktop,
			w: o,
			h: s
		};
	});
}
function oO(e) {
	TD(`edit:${I(dD).blockId}:boxStyle`, (t) => {
		let n = {
			...t.props.boxStyle ?? {},
			...e
		};
		for (let e of Object.keys(n)) n[e] ?? delete n[e];
		Object.keys(n).length ? t.props.boxStyle = n : delete t.props.boxStyle;
	});
}
function sO(e) {
	TD("decor", (t) => {
		t.decor = e;
	});
}
function cO(e) {
	let { section: t, block: n } = fD(I(dD)?.sectionId, I(dD)?.blockId);
	n && (ck.pushHistory("hide-mobile"), n.hideMobile = e, cD.save(), ck.updateDirty(), IE.bridge?.sendSection(I(iD), t), pD());
}
var lO = /* @__PURE__ */ k(null), uO = /* @__PURE__ */ k(null), dO = /* @__PURE__ */ k(""), fO = /* @__PURE__ */ k(pn([])), pO = /* @__PURE__ */ k(null), mO = /* @__PURE__ */ k(null), hO = /* @__PURE__ */ k(""), gO = /* @__PURE__ */ k(pn({}));
function _O(e) {
	A(uO, e?.grid ? { ...e.grid } : null, !0), A(dO, e?.size?.minHeight ?? "", !0), A(fO, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), A(pO, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0), A(mO, e?.hover ? JSON.parse(JSON.stringify(e.hover)) : null, !0), A(hO, e?.theme ?? "", !0), A(gO, e?.divider ? JSON.parse(JSON.stringify(e.divider)) : {}, !0);
}
var vO = /* @__PURE__ */ k(null);
function yO() {
	try {
		let e = ((IE.iframeEl?.contentDocument)?.querySelector(`.urd-section[data-section-id="${I(lO)}"]`))?.getBoundingClientRect();
		A(vO, e && e.width ? {
			w: e.width,
			h: e.height
		} : null, !0);
	} catch {
		A(vO, null);
	}
}
function bO(e) {
	A(lO, e.sectionId, !0), _O(cD?.data.sections.find((t) => t.id === e.sectionId));
}
function xO(e, t) {
	let n = cD.data.sections.find((e) => e.id === I(lO));
	n && (ck.pushHistory(e), t(n), cD.save(), ck.updateDirty(), IE.bridge?.sendSection(I(iD), n), _O(n));
}
function SO(e) {
	let t = e.target.files?.[0];
	e.target.value = "", t && vj.readVideoFile(t, "status.videoFileFormat", (e) => ED("src", e));
}
async function CO(e) {
	let t = e.target.files?.[0];
	if (e.target.value = "", t) try {
		ED("poster", (await vj.compressOrTrim(t)).dataUrl);
	} catch (e) {
		lj.setStatus(vj.imageErrorText(e), "error");
	}
}
var wO = /* @__PURE__ */ O(() => ({
	mutate: xO,
	keyPrefix: "bg",
	keyId: I(lO)
}));
function TO(e) {
	return {
		type: e,
		version: bC[e].version,
		props: bC[e].defaults()
	};
}
var EO = (e) => !!(e && bC[e.type]?.entrance), DO = /* @__PURE__ */ O(() => [["", K("common.none")], ...Object.entries(bC).filter(([, e]) => e.entrance).map(([e, t]) => [e, t.labelKey ? K(t.labelKey) : t.label])]), OO = /* @__PURE__ */ O(() => I(DO).filter(([e]) => !bC[e]?.group)), kO = /* @__PURE__ */ O(() => [["", K("common.none")], ...Object.entries(bC).filter(([, e]) => !e.entrance).map(([e, t]) => [e, t.labelKey ? K(t.labelKey) : t.label])]);
function AO(e) {
	e.animation && !EO(e.animation) && (e.hover ??= e.animation, e.animation = null);
}
function jO(e) {
	TD(`edit:anim-${I(dD).blockId}`, (t) => {
		AO(t), t.animation = e ? TO(e) : null;
	}), I(dD) && IE.bridge?.sendDemoAnim(I(dD).sectionId, I(dD).blockId);
}
function MO(e) {
	TD(`edit:hover-${I(dD).blockId}`, (t) => {
		AO(t), t.hover = e ? TO(e) : null;
	});
}
function NO(e, t) {
	Number.isFinite(t) && (TD(`edit:anim-${I(dD).blockId}:${e}`, (n) => {
		n.animation && (n.animation.props[e] = t);
	}), I(dD) && IE.bridge?.sendDemoAnim(I(dD).sectionId, I(dD).blockId));
}
function PO(e) {
	let t = cD.data.sections.find((e) => e.id === I(lO));
	if (!t) return;
	let n = e.trim();
	if (!n) return;
	let r = /^\d+$/.test(n) ? `${n}px` : n;
	ck.pushHistory("section-size"), t.size = {
		...t.size,
		minHeight: r
	}, A(dO, r, !0), cD.save(), ck.updateDirty(), IE.bridge?.sendSection(I(iD), t);
}
function FO() {
	return cD.data.sections.find((e) => e.id === I(lO)) ?? cD.data.sections[0];
}
function IO(e) {
	let t = cD.data.sections.find((e) => e.id === I(lO));
	t && (ck.pushHistory("grid:section"), t.grid = e ? { ...Q.siteStore.data.grid } : null, A(uO, t.grid ? { ...t.grid } : null, !0), cD.save(), ck.updateDirty(), IE.bridge?.sendSection(I(iD), t), lj.gridOn && IE.bridge?.sendShowGrid(!0));
}
function LO(e, t) {
	let n = cD.data.sections.find((e) => e.id === I(lO));
	n?.grid && (ck.pushHistory("grid:section"), n.grid = {
		...n.grid,
		[e]: t
	}, A(uO, { ...n.grid }, !0), cD.save(), ck.updateDirty(), IE.bridge?.sendSection(I(iD), n), lj.gridOn && IE.bridge?.sendShowGrid(!0));
}
var RO = null;
function zO(e) {
	return {
		schemaVersion: 7,
		meta: {
			id: e.id,
			title: e.title
		},
		sections: [{
			id: es("sec"),
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
async function BO(e, { keepHistory: t = !1 } = {}) {
	A(iD, e, !0), RO = (async () => {
		let n = uD(), r = null;
		try {
			let e = await fetch(`/${n.file}`);
			e.ok && (r = Dc(await e.json(), Q.siteStore.data));
		} catch {}
		r ? lD.delete(e) : r = zO(n), cD = fC(`urd-draft-${e}`, () => r, lj.draftSaveError), (cD.data.schemaVersion ?? 1) > 7 && (console.warn(`Urd: the draft for '${e}' has schemaVersion ${cD.data.schemaVersion} (the engine has 7) and is discarded`), cD.replace(structuredClone(r))), cD.replace(Dc(cD.data, Q.siteStore.data)), cD.save(), t || (ck.lastHistoryKey = null), A(lO, null), A(uO, null), ck.updateDirty(), Q.readSeoDraft(), lj.updateAttention(), lj.status = "";
	})(), await RO;
}
async function VO(e) {
	let t = localStorage.getItem(`urd-draft-${e.id}`);
	if (t) try {
		return JSON.parse(t);
	} catch {}
	try {
		let t = await fetch(`/${e.file}`);
		if (t.ok) return Dc(await t.json(), Q.siteStore.data);
	} catch {}
	return zO(e);
}
async function HO(e, t) {
	let n = await VO(e);
	t(n), lj.writeDraftKey(`urd-draft-${e.id}`, JSON.stringify(n)), ck.updateDirty();
}
async function UO(e) {
	let t = [...e.target.files ?? []];
	if (e.target.value = "", !t.length) return;
	lj.setStatus(K("status.compressingImages"));
	let { images: n, failed: r, big: i } = await vj.compressMany(t);
	n.length && TD("gallery-add", (e) => {
		e.props.images.push(...n);
	}), vj.reportUpload(n.length, r, i);
}
function WO(e, t) {
	TD("gallery-move", (n) => {
		let r = e + t;
		r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
	});
}
function GO(e) {
	TD("gallery-remove", (t) => {
		t.props.images.splice(e, 1);
	});
}
function KO(e, t, n) {
	TD(`edit:${I(dD).blockId}:img${e}-${t}`, (r) => {
		r.props.images[e][t] = n;
	});
}
function qO() {
	XD = null;
}
function JO() {
	Nn(() => {
		if (I(hD)) return gD(), window.addEventListener("resize", gD), () => window.removeEventListener("resize", gD);
	}), Nn(() => {
		I(_D)?.mode === "set" && I(dD)?.type !== "calendar" && A(_D, null);
	}), Nn(() => {
		let e = I(dD)?.blockId ?? null;
		e !== vD && (vD = e, Uh.menuQuery = "", Uh.propsQuery = "");
	}), Nn(() => {
		I(hD) || (Uh.menuQuery = "");
	}), Nn(() => {
		I(lO), I(fO), requestAnimationFrame(() => requestAnimationFrame(yO));
	}), Nn(() => {
		let e = IE.iframeEl;
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(() => yO());
		return t.observe(e), () => t.disconnect();
	});
}
var $ = {
	get sections() {
		return cD?.data.sections ?? [];
	},
	get pageId() {
		return I(iD);
	},
	set pageId(e) {
		A(iD, e, !0);
	},
	handleApplyLayout: aD,
	hasMobileOverrides: oD,
	markDesktopChange: sD,
	get store() {
		return cD;
	},
	set store(e) {
		cD = e;
	},
	pendingPublished: lD,
	pageEntry: uD,
	get selectedBlock() {
		return I(dD);
	},
	set selectedBlock(e) {
		A(dD, e, !0);
	},
	readBlock: fD,
	syncSelectedBlock: pD,
	onSelectBlock: mD,
	get blockMenu() {
		return I(hD);
	},
	set blockMenu(e) {
		A(hD, e, !0);
	},
	moveBlockMenu: CD,
	menuBackToBlock: wD,
	measureMenuRoom: gD,
	get designPicker() {
		return I(_D);
	},
	set designPicker(e) {
		A(_D, e, !0);
	},
	get searchBlockId() {
		return vD;
	},
	set searchBlockId(e) {
		vD = e;
	},
	onBlockMenu: bD,
	mutateBlock: TD,
	setBlockProp: ED,
	setBlockProps: DD,
	groupReset: OD,
	groupChanged: kD,
	onOff: AD,
	RIBBON_REACH: jD,
	ribbonReach: MD,
	RIBBON_MOTIONS: ND,
	buttonTargets: PD,
	setButtonTarget: FD,
	openImageEditor: ID,
	fitTimers: LD,
	fitSeq: RD,
	get fitCount() {
		return zD;
	},
	set fitCount(e) {
		zD = e;
	},
	fitBlockSoon: BD,
	phoneSeq: VD,
	get phoneFit() {
		return HD;
	},
	set phoneFit(e) {
		HD = e;
	},
	get phonePlugins() {
		return UD;
	},
	set phonePlugins(e) {
		UD = e;
	},
	phoneFitSoon: WD,
	applyPhoneHeight: GD,
	dropFits: KD,
	setCalendarDesign: qD,
	setBlockFit: JD,
	setBlockFitMin: YD,
	get sizeGesture() {
		return XD;
	},
	set sizeGesture(e) {
		XD = e;
	},
	setBlockSize: ZD,
	setBlockSizeBound: QD,
	setBlockHeightMode: $D,
	setBlockHeightAlign: eO,
	canStretch: tO,
	setBlockFrame: nO,
	designWidth: rO,
	shapePx: iO,
	setShapeSizePx: aO,
	setBoxStyle: oO,
	setBlockDecor: sO,
	setBlockHideMobile: cO,
	get activeSectionId() {
		return I(lO);
	},
	set activeSectionId(e) {
		A(lO, e, !0);
	},
	get sectionGrid() {
		return I(uO);
	},
	set sectionGrid(e) {
		A(uO, e, !0);
	},
	get sectionMinHeight() {
		return I(dO);
	},
	set sectionMinHeight(e) {
		A(dO, e, !0);
	},
	get sectionBg() {
		return I(fO);
	},
	set sectionBg(e) {
		A(fO, e, !0);
	},
	get sectionAnim() {
		return I(pO);
	},
	set sectionAnim(e) {
		A(pO, e, !0);
	},
	get sectionHover() {
		return I(mO);
	},
	set sectionHover(e) {
		A(mO, e, !0);
	},
	get sectionTheme() {
		return I(hO);
	},
	set sectionTheme(e) {
		A(hO, e, !0);
	},
	get sectionDivider() {
		return I(gO);
	},
	set sectionDivider(e) {
		A(gO, e, !0);
	},
	syncSectionMirrors: _O,
	get secBox() {
		return I(vO);
	},
	set secBox(e) {
		A(vO, e, !0);
	},
	measureSecBox: yO,
	onSelectSection: bO,
	mutateSection: xO,
	setBlockVideoFile: SO,
	setBlockVideoPoster: CO,
	get sectionBgCtx() {
		return I(wO);
	},
	animObj: TO,
	isEntrance: EO,
	get ENTRANCE_OPTIONS() {
		return I(DO);
	},
	get BLOCK_ENTRANCE_OPTIONS() {
		return I(OO);
	},
	get HOVER_OPTIONS() {
		return I(kO);
	},
	normalizeAnim: AO,
	setBlockAnimation: jO,
	setBlockHover: MO,
	setBlockAnimProp: NO,
	setSectionHeight: PO,
	targetSection: FO,
	toggleSectionGrid: IO,
	setSectionGrid: LO,
	get pageLoading() {
		return RO;
	},
	set pageLoading(e) {
		RO = e;
	},
	blankPage: zO,
	selectPage: BO,
	readPageDraft: VO,
	patchPageDraft: HO,
	addGalleryImages: UO,
	moveGalleryImage: WO,
	removeGalleryImage: GO,
	setGalleryImageField: KO,
	endSizeGesture: qO,
	effects: JO
}, YO = /* @__PURE__ */ k(!1);
function XO() {
	let e = Q.siteDraft?.pages?.some((e) => !$.pendingPublished.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = Ak.collectionsIndexStore?.hasDraft() || Object.values(Ak.collectionStores).some((e) => e.hasDraft()), n = cw.templatesIndexStore?.hasDraft() || Object.values(cw.templateStores).some((e) => e.hasDraft());
	A(YO, e || $.store?.hasDraft() && !$.pendingPublished.has($.pageId) || Q.siteStore?.hasDraft() || rD.pluginsStore?.hasDraft() || t || n || !1, !0);
}
var ZO = [], QO = [], $O = null;
function ek() {
	return JSON.stringify({
		pageId: $.pageId,
		page: $.store.data,
		site: Q.siteStore.data,
		collectionsIndex: Ak.collectionsReady ? Ak.collectionsIndexStore.data : null,
		collections: Ak.collectionsReady ? Object.fromEntries(Object.entries(Ak.collectionStores).map(([e, t]) => [e, t.data])) : {},
		templatesIndex: cw.templatesReady ? cw.templatesIndexStore.data : null,
		templates: cw.templatesReady ? Object.fromEntries(Object.entries(cw.templateStores).map(([e, t]) => [e, t.data])) : {},
		plugins: rD.pluginsStore?.data ?? null
	});
}
function tk(e) {
	(e !== $O || !e.startsWith("edit:") && !e.startsWith("grid:")) && (ZO.push(ek()), ZO.length > 50 && ZO.shift(), QO.length = 0, $O = e);
}
function nk(e) {
	let { pageId: t, page: n, site: r, collectionsIndex: i, collections: a, templatesIndex: o, templates: s, plugins: c } = JSON.parse(e);
	Q.siteStore.replace(r), Q.linkSiteDraft(), Q.siteStore.save(), Q.grid = {
		snap: !0,
		...Q.siteDraft.grid
	}, Q.pushSiteToPreview(), rk(i, a ?? {}), ik(o, s ?? {}), ak(c), t && t !== $.pageId && Q.siteDraft.pages.some((e) => e.id === t) ? (lj.writeDraftKey(`urd-draft-${t}`, JSON.stringify(n)), $.selectPage(t, { keepHistory: !0 }), XO()) : ($.store.replace(n), $.store.save(), XO(), lj.updateAttention(), $.syncSelectedBlock(), $.syncSectionMirrors($.store.data.sections.find((e) => e.id === $.activeSectionId)), Q.siteDraft.pages.some((e) => e.id === $.pageId) ? IE.bridge?.sendPage($.pageId, $.store.data) : $.selectPage(Q.siteDraft.pages[0].id, { keepHistory: !0 }));
}
function rk(e, t) {
	if (Ak.collectionsIndexStore && e && JSON.stringify({
		index: Ak.collectionsIndexStore.data,
		collections: Object.fromEntries(Object.entries(Ak.collectionStores).map(([e, t]) => [e, t.data]))
	}) !== JSON.stringify({
		index: e,
		collections: t
	})) {
		Ak.collectionsIndexStore.replace(e), Ak.collectionsIndexStore.save();
		for (let e of Object.keys(Ak.collectionStores)) e in t || (localStorage.removeItem(`urd-draft-collection-${e}`), localStorage.removeItem(`urd-draft-samling-${e}`), delete Ak.collectionStores[e]);
		for (let [e, n] of Object.entries(t)) {
			if (!Ak.collectionStores[e]) {
				let t = Ak.publishedCollections[e] ?? null;
				Ak.collectionStores[e] = fC(`urd-draft-collection-${e}`, () => t, lj.draftSaveError, `urd-draft-samling-${e}`);
			}
			Ak.collectionStores[e].replace(n), Ak.collectionStores[e].save();
		}
		Ak.collectionIds = [...e.samlinger ?? []], Ak.activeCollection && !Ak.collectionIds.includes(Ak.activeCollection) && (Ak.activeCollection = null), Ak.syncCollectionsView();
	}
}
function ik(e, t) {
	if (cw.templatesIndexStore && e && JSON.stringify({
		index: cw.templatesIndexStore.data,
		templates: Object.fromEntries(Object.entries(cw.templateStores).map(([e, t]) => [e, t.data]))
	}) !== JSON.stringify({
		index: e,
		templates: t
	})) {
		cw.templatesIndexStore.replace(e), cw.templatesIndexStore.save();
		for (let e of Object.keys(cw.templateStores)) e in t || (localStorage.removeItem(`urd-draft-template-${e}`), localStorage.removeItem(`urd-draft-mal-${e}`), delete cw.templateStores[e]);
		for (let [e, n] of Object.entries(t)) cw.templateStores[e] || (cw.templateStores[e] = fC(`urd-draft-template-${e}`, () => cw.publishedTemplates[e] ?? null, lj.draftSaveError, `urd-draft-mal-${e}`)), cw.templateStores[e].replace(n), cw.templateStores[e].save();
		cw.templateIds = [...e.maler ?? []], XO(), cw.pushTemplatesToPreview();
	}
}
function ak(e) {
	rD.pluginsStore && e && JSON.stringify(rD.pluginsStore.data) !== JSON.stringify(e) && (rD.pluginsStore.replace(e), rD.pluginsStore.save(), rD.syncPluginsView(), IE.reloadPreview());
}
function ok() {
	ZO.length && ($.dropFits(), QO.push(ek()), nk(ZO.pop()), $O = null, lj.setStatus(K("status.undone")));
}
function sk() {
	QO.length && ($.dropFits(), ZO.push(ek()), nk(QO.pop()), $O = null, lj.setStatus(K("status.redone")));
}
var ck = {
	get dirty() {
		return I(YO);
	},
	set dirty(e) {
		A(YO, e, !0);
	},
	updateDirty: XO,
	history: ZO,
	redoStack: QO,
	get lastHistoryKey() {
		return $O;
	},
	set lastHistoryKey(e) {
		$O = e;
	},
	snapshot: ek,
	pushHistory: tk,
	restore: nk,
	restoreCollections: rk,
	restoreTemplates: ik,
	restorePlugins: ak,
	undo: ok,
	redo: sk
}, lk = null, uk = {}, dk = {}, fk = !1, pk = /* @__PURE__ */ k(pn([])), mk = /* @__PURE__ */ k(pn({})), hk = /* @__PURE__ */ k(null), gk = /* @__PURE__ */ k(""), _k = /* @__PURE__ */ k("news");
async function vk() {
	let e = {
		version: 1,
		samlinger: []
	};
	try {
		e = await (await fetch("/content/collections.json")).json();
	} catch {}
	lk = fC("urd-draft-collections", () => e, lj.draftSaveError, "urd-draft-samlinger"), A(pk, [...lk.data.samlinger ?? []], !0);
	for (let e of I(pk)) {
		let t = null;
		try {
			t = await (await fetch(`/content/samlinger/${e}.json`)).json();
		} catch {}
		dk[e] = t, uk[e] = fC(`urd-draft-collection-${e}`, () => t, lj.draftSaveError, `urd-draft-samling-${e}`), !t && !uk[e].data && (uk[e].replace({
			schemaVersion: 1,
			id: e,
			name: e,
			kind: "custom",
			entries: []
		}), uk[e].save());
	}
	fk = !0, yk();
}
function yk(e = !0) {
	let t = {};
	for (let e of I(pk)) uk[e] && (t[e] = JSON.parse(JSON.stringify(uk[e].data)));
	A(mk, t, !0), e && bk();
}
function bk() {
	IE.bridge?.sendCollections(Xe(I(mk)) ?? {});
}
function xk(e, t, n, r = !0) {
	let i = uk[e];
	i && (ck.pushHistory(t), n(i.data), i.save(), ck.updateDirty(), yk(r));
}
function Sk(e) {
	uk[e.collection] && kk(e.collection);
}
function Ck(e) {
	return (new DOMParser().parseFromString(String(e ?? ""), "text/html").body.textContent ?? "").trim();
}
function wk(e) {
	let { collection: t, entryId: n, field: r, value: i } = e;
	[
		"title",
		"text",
		"image",
		"imageAlt",
		"imageStyle"
	].includes(r) && (r !== "title" || Ck(i)) && xk(t, `edit:collection:${t}:${n}:${r}`, (e) => {
		let t = e.entries.find((e) => e.id === n);
		t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
	}, r === "image");
}
function Tk(e, t, n) {
	let r = {
		schemaVersion: 1,
		id: e,
		name: t,
		kind: n,
		entries: []
	};
	uk[e] = fC(`urd-draft-collection-${e}`, () => null, lj.draftSaveError, `urd-draft-samling-${e}`), uk[e].replace(r), uk[e].save(), lk.data.samlinger = [...I(pk), e], lk.save(), A(pk, [...I(pk), e], !0), A(hk, e, !0), ck.updateDirty(), yk();
}
function Ek() {
	let e = I(gk).trim();
	if (!e) return;
	let t = Fp(e);
	!t || I(pk).includes(t) ? lj.setStatus(K(t ? "status.collectionExists" : "status.invalidName"), "error") : (ck.pushHistory("collections"), Tk(t, e, I(_k)), A(gk, ""));
}
function Dk() {
	let e = K("seed.productCatalogName"), t = Fp(e) || "collection", n = t;
	for (let e = 2; I(pk).includes(n); e += 1) n = `${t}-${e}`;
	ck.pushHistory("collections"), Tk(n, e, "products"), $.mutateBlock(null, (e) => {
		e.props.collection = n;
	});
}
function Ok(e) {
	ck.pushHistory("collections"), localStorage.removeItem(`urd-draft-collection-${e}`), localStorage.removeItem(`urd-draft-samling-${e}`), delete uk[e], lk.data.samlinger = I(pk).filter((t) => t !== e), lk.save(), A(pk, I(pk).filter((t) => t !== e), !0), I(hk) === e && A(hk, null), ck.updateDirty(), yk();
}
function kk(e) {
	xk(e, `collection:${e}:add-entry`, (e) => {
		e.kind === "products" ? e.entries.push({
			id: es("entry"),
			title: K("seed.newProduct"),
			text: ""
		}) : e.entries.unshift({
			id: es("entry"),
			title: K("seed.newEntry"),
			date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
			text: ""
		});
	});
}
var Ak = {
	get collectionsIndexStore() {
		return lk;
	},
	set collectionsIndexStore(e) {
		lk = e;
	},
	get collectionStores() {
		return uk;
	},
	set collectionStores(e) {
		uk = e;
	},
	get publishedCollections() {
		return dk;
	},
	set publishedCollections(e) {
		dk = e;
	},
	get collectionsReady() {
		return fk;
	},
	set collectionsReady(e) {
		fk = e;
	},
	get collectionIds() {
		return I(pk);
	},
	set collectionIds(e) {
		A(pk, e, !0);
	},
	get collectionsView() {
		return I(mk);
	},
	set collectionsView(e) {
		A(mk, e, !0);
	},
	get activeCollection() {
		return I(hk);
	},
	set activeCollection(e) {
		A(hk, e, !0);
	},
	get newCollectionName() {
		return I(gk);
	},
	set newCollectionName(e) {
		A(gk, e, !0);
	},
	get newCollectionKind() {
		return I(_k);
	},
	set newCollectionKind(e) {
		A(_k, e, !0);
	},
	initCollections: vk,
	syncCollectionsView: yk,
	pushCollectionsToPreview: bk,
	mutateCollection: xk,
	handleCollectionAdd: Sk,
	plainTitle: Ck,
	handleCollectionEdit: wk,
	insertCollection: Tk,
	addCollection: Ek,
	createCatalogForBlock: Dk,
	removeCollection: Ok,
	addCollectionEntry: kk
};
//#endregion
//#region src/lib/deploy-wait.js
function jk(e, { max: t = 8 } = {}) {
	let n = (e ?? []).filter((e) => e && typeof e.path == "string" && typeof e.content == "string" && e.encoding === "utf-8" && !e.delete && (e.path.startsWith("content/") || e.path === "plugins/plugins.json"));
	return n.sort((e, t) => (e.path === "content/site.json" ? -1 : 0) - (t.path === "content/site.json" ? -1 : 0)), n.slice(0, t).map(({ path: e, content: t }) => ({
		path: e,
		content: t
	}));
}
async function Mk(e, { fetchFn: t = fetch, delayMs: n = 1e4, attempts: r = 18, sleep: i = (e) => new Promise((t) => setTimeout(t, e)) } = {}) {
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
//#region src/state/updater.svelte.js
var Nk = null;
async function Pk() {
	try {
		let e = await fetch("/api/github/latest");
		e.ok && (Nk = (await e.json()).head ?? null);
	} catch {}
}
async function Fk(e) {
	if (!Nk) return await Pk(), {
		ok: await lj.askConfirm({
			title: K("confirm.conflictUnknown.title"),
			lines: [K("confirm.conflictUnknown.body"), K("confirm.conflictUnknown.warning")],
			okLabel: K("confirm.publishAnyway"),
			cancelLabel: K("confirm.cancel")
		}),
		head: Nk
	};
	let t = null;
	try {
		let e = await fetch(`/api/github/latest?base=${Nk}`);
		e.ok && (t = await e.json().catch(() => null));
	} catch {}
	if (!t?.head) return {
		ok: !0,
		head: null
	};
	let n = t.head;
	if (n === Nk) return {
		ok: !0,
		head: n
	};
	let r = new Set(e.map((e) => e.path)), i = t.truncated ? [K("confirm.conflict.truncated")] : (t.changedFiles ?? []).filter((e) => r.has(e));
	return i.length === 0 ? {
		ok: !0,
		head: n
	} : {
		ok: await lj.askConfirm({
			title: K("confirm.conflict.title"),
			lines: [
				K("confirm.conflict.intro"),
				...i.map((e) => `• ${e}`),
				K("confirm.conflict.warning")
			],
			okLabel: K("confirm.publishAnyway"),
			cancelLabel: K("confirm.cancel")
		}),
		head: n
	};
}
var Ik = /* @__PURE__ */ k(null), Lk = /* @__PURE__ */ k("");
async function Rk() {
	A(Lk, "");
	try {
		let e = await fetch("/api/github/history");
		e.ok ? A(Ik, (await e.json()).commits, !0) : e.status === 401 ? (A(Ik, [], !0), A(Lk, K("status.historyLoginRequired"), !0)) : (A(Ik, [], !0), A(Lk, ba(await e.json().catch(() => null)) ?? K("status.historyFetchFailed"), !0));
	} catch {
		A(Ik, [], !0), A(Lk, K("status.historyUnavailable"), !0);
	}
}
var zk = !1, Bk = 0;
async function Vk(e) {
	let t = ++Bk, n = lj.statusSeq, r = await Mk(jk(e));
	t === Bk && n === lj.statusSeq && (r ? lj.setStatus(K("status.publishLive"), "ok") : lj.setStatus(K("status.publishDeployTimeout"), "error"));
}
var Hk = /* @__PURE__ */ k(null), Uk = /* @__PURE__ */ k(null), Wk = /* @__PURE__ */ k(!1), Gk = /* @__PURE__ */ k(pn(/* @__PURE__ */ new Set()));
async function Kk() {
	A(Wk, !0), A(Uk, null), A(Hk, null);
	try {
		let e = await fetch("/api/github/update"), t = await e.json().catch(() => null);
		e.ok ? (A(Hk, t, !0), A(Gk, /* @__PURE__ */ new Set(), !0)) : A(Uk, ba(t) ?? K("update.checkFailed"), !0);
	} catch {
		A(Uk, K("status.publishLayerUnreachable"), !0);
	}
	A(Wk, !1);
}
var qk = {
	get baseSha() {
		return Nk;
	},
	set baseSha(e) {
		Nk = e;
	},
	refreshBaseSha: Pk,
	confirmNoConflict: Fk,
	get historyList() {
		return I(Ik);
	},
	set historyList(e) {
		A(Ik, e, !0);
	},
	get historyError() {
		return I(Lk);
	},
	set historyError(e) {
		A(Lk, e, !0);
	},
	loadHistory: Rk,
	get revertedSinceLoad() {
		return zk;
	},
	set revertedSinceLoad(e) {
		zk = e;
	},
	get publishWave() {
		return Bk;
	},
	set publishWave(e) {
		Bk = e;
	},
	awaitPublishDeploy: Vk,
	get updateInfo() {
		return I(Hk);
	},
	set updateInfo(e) {
		A(Hk, e, !0);
	},
	get updateError() {
		return I(Uk);
	},
	set updateError(e) {
		A(Uk, e, !0);
	},
	get updateBusy() {
		return I(Wk);
	},
	set updateBusy(e) {
		A(Wk, e, !0);
	},
	get updateSkip() {
		return I(Gk);
	},
	set updateSkip(e) {
		A(Gk, e, !0);
	},
	loadUpdateCheck: Kk
}, Jk = /* @__PURE__ */ O(() => [
	["purple", K("adminTheme.purple")],
	["well", K("adminTheme.well")],
	["gold", K("adminTheme.gold")],
	["grey", K("adminTheme.grey")],
	["aurora", K("adminTheme.aurora")],
	["dusk", K("adminTheme.dusk")],
	["ember", K("adminTheme.ember")]
]), Yk = {
	lilla: "purple",
	bronn: "well",
	gull: "gold",
	graa: "grey",
	nordlys: "aurora",
	skumring: "dusk",
	glo: "ember"
}, Xk = /* @__PURE__ */ k(pn((() => {
	let e = localStorage.getItem("urd-admin-theme");
	return Yk[e] ?? e ?? "grey";
})()));
function Zk() {
	let e = getComputedStyle(document.documentElement), t = e.getPropertyValue("--urd-color-accent").trim();
	IE.bridge?.sendAdminTheme({
		bg: e.getPropertyValue("--urd-color-bg").trim(),
		surface: e.getPropertyValue("--urd-color-surface").trim(),
		accent: t,
		text: e.getPropertyValue("--urd-color-text").trim(),
		"accent-text": Qk(t)
	});
}
function Qk(e) {
	return Ls(e) == null || (Rs(e, "#ffffff") ?? 0) >= (Rs(e, "#0b0e14") ?? 0) ? "#ffffff" : "#0b0e14";
}
var $k = /* @__PURE__ */ k(""), eA = /* @__PURE__ */ k("info"), tA = 0;
function nA(e, t = "info") {
	A($k, e, !0), A(eA, t, !0);
	let n = ++tA;
	t === "ok" && setTimeout(() => {
		tA === n && (A($k, ""), A(eA, "info"));
	}, 8e3);
}
function rA() {
	nA(K("status.storageFull"), "error");
}
function iA(e, t) {
	try {
		localStorage.setItem(e, t);
	} catch {
		rA();
	}
}
var aA = /* @__PURE__ */ k(null), oA = /* @__PURE__ */ k(0);
function sA() {
	A(oA, $.store?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
}
function cA() {
	let e = $.store?.data.sections.find((e) => e.responsive?.mobile?.attention?.needed);
	IE.deviceId = "mobile", e && setTimeout(() => IE.bridge?.sendScrollSection(e.id), 0);
}
function lA(e) {
	$.blockMenu && (e.target instanceof Element && e.target.closest(".block-menu") || ($.blockMenu = null));
}
function uA(e) {
	if (e.key === "Escape" && $.blockMenu) {
		$.blockMenu = null;
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
		].includes(t.type)) || !$.selectedBlock || IE.viewMode === "mobile") return;
		e.preventDefault(), IE.bridge?.sendDuplicate();
		return;
	}
	if (t !== "z" && t !== "y") return;
	let n = e.target;
	n instanceof HTMLElement && (n.isContentEditable || n.tagName === "TEXTAREA" || n.tagName === "INPUT" && ![
		"number",
		"checkbox",
		"range",
		"color"
	].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? ck.redo() : ck.undo());
}
async function dA() {
	Q.site = Ec(await (await fetch("/content/site.json")).json()), Q.siteStore = fC("urd-draft-site", () => Q.site, rA), (Q.siteStore.data.schemaVersion ?? 1) > 5 && (console.warn(`Urd: the site draft has schemaVersion ${Q.siteStore.data.schemaVersion} (the engine has 5) and is discarded`), Q.siteStore.replace(Xe(Q.site))), Q.siteStore.replace(Ec(Q.siteStore.data)), Q.siteStore.save(), Q.linkSiteDraft(), Q.grid = {
		snap: !0,
		...Q.siteDraft.grid
	}, await $.selectPage(new URLSearchParams(location.search).get("page") ?? Q.siteDraft.pages[0].id), await rD.initPlugins(), await Ak.initCollections(), await cw.initTemplates(), await HA(), I(aA) && qk.refreshBaseSha(), BA(), Q.siteDraft.site.setup === !0 && !localStorage.getItem("urd-setup-done") && (A(vA, Q.siteDraft.site.title, !0), A(yA, Q.siteDraft.theme.tokens.color.accent, !0), A(bA, Q.siteDraft.theme.tokens.color.bg, !0), A(_A, !0));
}
var fA = /* @__PURE__ */ k(null);
function pA({ title: e, lines: t = [], okLabel: n = K("confirm.ok"), cancelLabel: r = K("confirm.cancel") }) {
	return new Promise((i) => {
		A(fA, {
			title: e,
			lines: t,
			okLabel: n,
			cancelLabel: r,
			resolve: i
		}, !0);
	});
}
function mA({ title: e, lines: t = [], value: n = "", placeholder: r = "", okLabel: i = K("confirm.ok"), cancelLabel: a = K("confirm.cancel") }) {
	return new Promise((o) => {
		A(fA, {
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
function hA(e) {
	I(fA)?.resolve(I(fA).prompt ? e ? I(fA).value : null : e), A(fA, null);
}
var gA = !1, _A = /* @__PURE__ */ k(!1), vA = /* @__PURE__ */ k(""), yA = /* @__PURE__ */ k("#7c5cff"), bA = /* @__PURE__ */ k("#0b0e14");
function xA() {
	localStorage.setItem("urd-setup-done", "1"), A(_A, !1);
}
function SA() {
	let e = I(vA).trim();
	e && (Q.siteMutate("setup", () => {
		Q.siteDraft.site.title = e, Q.siteDraft.nav.logo = {
			type: "text",
			value: e
		}, Q.siteDraft.theme.tokens.color.accent = I(yA), Q.siteDraft.theme.tokens.color.bg = I(bA), delete Q.siteDraft.site.setup;
	}), xA(), nA(K("status.setupDone"), "ok"));
}
var CA = "urd-admin-panels", wA = "urd-admin-panel-open", TA = /* @__PURE__ */ k(pn(localStorage.getItem(CA) === "reset" ? "reset" : "remember"));
function EA(e) {
	A(TA, e === "reset" ? "reset" : "remember", !0), I(TA) === "reset" ? localStorage.setItem(CA, "reset") : localStorage.removeItem(CA);
}
var DA = /* @__PURE__ */ k(pn(I(TA) === "reset" ? null : localStorage.getItem(wA))), OA = [
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
], kA = [
	"rail.thisPage",
	"rail.site",
	"rail.system"
], AA = /* @__PURE__ */ O(() => Object.fromEntries(OA.flat().map((e) => [e, K(`panel.${e}`)])));
I(DA) && !OA.flat().includes(I(DA)) && A(DA, null);
var jA = {
	pages: ["hint.pages.drafts"],
	blocks: ["hint.blocks.intro"],
	grid: ["hint.grid.intro", "hint.grid.section"],
	collections: ["hint.collections.intro"],
	plugins: ["hint.plugins.intro"],
	history: ["hint.history.intro"]
}, MA = [
	["se", "Davvisámegiella"],
	["en-GB", "English (UK)"],
	["nb", "Norsk bokmål"],
	["nn", "Norsk nynorsk"],
	["tr", "Türkçe"]
], NA = (e) => [...e].sort((e, t) => e[1].localeCompare(t[1]));
function PA(e, t) {
	let n = [];
	for (let r of e) for (let e of rD.pluginInfo[r]?.languages ?? []) e?.[t] === !0 && typeof e.code == "string" && typeof e.name == "string" && e.name && (MA.some(([t]) => t === e.code) || n.some(([t]) => t === e.code) || n.push([e.code, e.name]));
	return n;
}
function FA() {
	let e = NA([...MA, ...PA(rD.publishedPluginIds, "admin")]);
	return LA === "auto" || e.some(([e]) => e === LA) ? e : [[LA, LA], ...e];
}
var IA = () => PA(rD.pluginsView?.enabled ?? [], "site"), LA = localStorage.getItem("urd-admin-lang") ?? "auto";
function RA(e) {
	e !== LA && (e === "auto" ? localStorage.removeItem("urd-admin-lang") : localStorage.setItem("urd-admin-lang", e), location.reload());
}
function zA(e) {
	A(DA, I(DA) === e ? null : e, !0), BA();
}
function BA() {
	I(DA) === "history" && qk.loadHistory(), I(DA) === "update" && !qk.updateBusy && qk.loadUpdateCheck();
}
var VA = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
async function HA() {
	try {
		let e = await fetch("/api/github/me");
		e.ok ? A(aA, await e.json(), !0) : e.status !== 503 && A(aA, null);
	} catch {
		A(aA, null);
	}
}
var UA = /* @__PURE__ */ k(localStorage.getItem("urd-guides") === "1"), WA = /* @__PURE__ */ k(!1), GA = /* @__PURE__ */ k(pn(localStorage.getItem("urd-layout-picker") === "menu" ? "menu" : "strip"));
function KA(e) {
	A(GA, e === "menu" ? "menu" : "strip", !0), I(GA) === "menu" ? localStorage.setItem("urd-layout-picker", "menu") : localStorage.removeItem("urd-layout-picker");
}
var qA = /* @__PURE__ */ k(null), JA = {
	view: 1079,
	device: 999,
	zoom: 919
}, YA = /* @__PURE__ */ k(null), XA = /* @__PURE__ */ k(null), ZA = /* @__PURE__ */ k(pn({
	view: !1,
	device: !1,
	zoom: !1
}));
function QA() {
	A(UA, !I(UA)), localStorage.setItem("urd-guides", I(UA) ? "1" : "0"), IE.bridge?.sendShowGuides(I(UA));
}
var $A = /* @__PURE__ */ k(localStorage.getItem("urd-grid-overlay") === "1");
function ej() {
	A($A, !I($A)), localStorage.setItem("urd-grid-overlay", I($A) ? "1" : "0"), IE.bridge?.sendShowGrid(I($A));
}
var tj = /* @__PURE__ */ k(null), nj = /* @__PURE__ */ k(!1), rj = /* @__PURE__ */ k(!1), ij = (e) => e.length > 0 && [...e].every((e) => e.open);
function aj() {
	let e = I(tj)?.querySelectorAll("details.group") ?? [];
	A(nj, e.length > 0), A(rj, ij(e), !0);
}
function oj() {
	let e = !I(rj);
	I(tj)?.querySelectorAll("details.group").forEach((t) => {
		t.open = e;
	}), aj();
}
function sj(e) {
	for (let t of e.querySelectorAll("details.group")) {
		let e = t.querySelector(":scope > summary");
		if (!e || e.querySelector(".fold-sub")) continue;
		let n = () => t.querySelectorAll(":scope > .group-items details.group");
		if (!n().length) continue;
		let r = document.createElement("button");
		r.type = "button", r.className = "fold-sub fold-toggle", r.innerHTML = q.foldToggle;
		let i = () => {
			let e = ij(n());
			r.classList.toggle("collapse", e), r.title = K(e ? "ui.collapseSub" : "ui.expandSub"), r.setAttribute("aria-label", r.title);
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
function cj() {
	Nn(() => {
		document.documentElement.dataset.adminTheme = I(Xk), localStorage.setItem("urd-admin-theme", I(Xk)), Zk();
	}), Nn(() => {
		if (!I(fA)) return;
		let e = (e) => {
			e.key === "Escape" && (e.stopPropagation(), hA(!1));
		};
		return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
	}), Nn(() => {
		I(TA) === "reset" ? localStorage.removeItem(wA) : I(DA) ? localStorage.setItem(wA, I(DA)) : localStorage.removeItem(wA);
	}), Nn(() => {
		if (!I(WA)) return;
		let e = (e) => {
			I(qA)?.contains(e.target) || A(WA, !1);
		}, t = (e) => {
			e.key === "Escape" && A(WA, !1);
		}, n = () => {
			A(WA, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	}), Nn(() => {
		let e = Object.entries(JA).map(([e, t]) => {
			let n = window.matchMedia(`(max-width: ${t}px)`), r = () => {
				I(ZA)[e] = n.matches;
			};
			return r(), n.addEventListener("change", r), () => n.removeEventListener("change", r);
		});
		return () => e.forEach((e) => e());
	}), Nn(() => {
		I(YA) && !I(ZA)[I(YA)] && A(YA, null);
	}), Nn(() => {
		if (!I(YA)) return;
		let e = (e) => {
			I(XA)?.contains(e.target) || A(YA, null);
		}, t = (e) => {
			e.key === "Escape" && A(YA, null);
		}, n = () => {
			A(YA, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	}), Nn(() => {
		I(DA), Er().then(aj);
	}), Nn(() => {
		let e = I(tj);
		if (!e) return;
		let t = new MutationObserver(() => {
			sj(e), aj();
		});
		return t.observe(e, {
			childList: !0,
			subtree: !0
		}), e.addEventListener("toggle", aj, !0), sj(e), () => {
			t.disconnect(), e.removeEventListener("toggle", aj, !0);
		};
	});
}
var lj = {
	get ADMIN_THEMES() {
		return I(Jk);
	},
	LEGACY_ADMIN_THEMES: Yk,
	get adminTheme() {
		return I(Xk);
	},
	set adminTheme(e) {
		A(Xk, e, !0);
	},
	sendAdminTheme: Zk,
	readableOn: Qk,
	get status() {
		return I($k);
	},
	set status(e) {
		A($k, e, !0);
	},
	get statusKind() {
		return I(eA);
	},
	set statusKind(e) {
		A(eA, e, !0);
	},
	get statusSeq() {
		return tA;
	},
	set statusSeq(e) {
		tA = e;
	},
	setStatus: nA,
	draftSaveError: rA,
	writeDraftKey: iA,
	get auth() {
		return I(aA);
	},
	set auth(e) {
		A(aA, e, !0);
	},
	get attentionCount() {
		return I(oA);
	},
	set attentionCount(e) {
		A(oA, e, !0);
	},
	updateAttention: sA,
	jumpToAttention: cA,
	onPointerdownWindow: lA,
	onKeydown: uA,
	init: dA,
	get confirmBox() {
		return I(fA);
	},
	set confirmBox(e) {
		A(fA, e, !0);
	},
	askConfirm: pA,
	askPrompt: mA,
	answerConfirm: hA,
	get confirmDownOnOverlay() {
		return gA;
	},
	set confirmDownOnOverlay(e) {
		gA = e;
	},
	get showSetup() {
		return I(_A);
	},
	set showSetup(e) {
		A(_A, e, !0);
	},
	get setupName() {
		return I(vA);
	},
	set setupName(e) {
		A(vA, e, !0);
	},
	get setupAccent() {
		return I(yA);
	},
	set setupAccent(e) {
		A(yA, e, !0);
	},
	get setupBg() {
		return I(bA);
	},
	set setupBg(e) {
		A(bA, e, !0);
	},
	closeSetup: xA,
	applySetup: SA,
	PANELS_PREF_KEY: CA,
	PANEL_OPEN_KEY: wA,
	get panelsPref() {
		return I(TA);
	},
	set panelsPref(e) {
		A(TA, e, !0);
	},
	setPanelsPref: EA,
	get activePanel() {
		return I(DA);
	},
	set activePanel(e) {
		A(DA, e, !0);
	},
	PANEL_GROUPS: OA,
	PANEL_GROUP_KEYS: kA,
	get PANEL_LABELS() {
		return I(AA);
	},
	PANEL_INTROS: jA,
	LANG_OPTIONS: MA,
	sortLangs: NA,
	packLangOptions: PA,
	adminLangOptions: FA,
	sitePackLangs: IA,
	adminLangChoice: LA,
	setAdminLang: RA,
	togglePanel: zA,
	loadPanelData: BA,
	reducedMotion: VA,
	checkAuth: HA,
	get guidesOn() {
		return I(UA);
	},
	set guidesOn(e) {
		A(UA, e, !0);
	},
	get settingsOpen() {
		return I(WA);
	},
	set settingsOpen(e) {
		A(WA, e, !0);
	},
	get layoutPickerPref() {
		return I(GA);
	},
	set layoutPickerPref(e) {
		A(GA, e, !0);
	},
	setLayoutPicker: KA,
	get settingsEl() {
		return I(qA);
	},
	set settingsEl(e) {
		A(qA, e, !0);
	},
	FOLD_MQ: JA,
	get toolMenu() {
		return I(YA);
	},
	set toolMenu(e) {
		A(YA, e, !0);
	},
	get toolMenuEl() {
		return I(XA);
	},
	set toolMenuEl(e) {
		A(XA, e, !0);
	},
	get folded() {
		return I(ZA);
	},
	set folded(e) {
		A(ZA, e, !0);
	},
	toggleGuides: QA,
	get gridOn() {
		return I($A);
	},
	set gridOn(e) {
		A($A, e, !0);
	},
	toggleGrid: ej,
	get panelEl() {
		return I(tj);
	},
	set panelEl(e) {
		A(tj, e, !0);
	},
	get panelHasGroups() {
		return I(nj);
	},
	set panelHasGroups(e) {
		A(nj, e, !0);
	},
	get panelAllOpen() {
		return I(rj);
	},
	set panelAllOpen(e) {
		A(rj, e, !0);
	},
	allOpen: ij,
	syncPanelFolds: aj,
	togglePanelGroups: oj,
	decorateSubFolds: sj,
	effects: cj
};
//#endregion
//#region src/state/media.svelte.js
async function uj(e, t) {
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
async function dj(e) {
	let t = await e.text(), n = jp(t), r = Np(t);
	if (!r) return n;
	let i = await uj(n.dataUrl, r);
	if (!i) return n;
	let a = Mp(t, i);
	if (a === t) return n;
	try {
		return jp(a);
	} catch {
		return n;
	}
}
async function fj(e) {
	if (e.type === "image/svg+xml" || /\.svg$/i.test(e.name || "")) return dj(e);
	let t = await Op(e);
	return t.animated && t.bytes > 1e6 && lj.setStatus(K("status.animatedLarge", { mb: (t.bytes / 1e6).toFixed(1) }), "error"), t;
}
function pj(e) {
	return e?.code === "animatedTooLarge" ? K("status.animatedTooLarge", {
		mb: (e.bytes / 1e6).toFixed(1),
		max: Math.round(vp / 1e6)
	}) : K("status.imageReadError");
}
function mj(e, t, n) {
	if (!["video/mp4", "video/webm"].includes(e.type)) {
		lj.setStatus(K(t), "error");
		return;
	}
	if (e.size > 15e6) {
		lj.setStatus(K("status.videoTooLarge", {
			mb: (e.size / 1e6).toFixed(1),
			max: Math.round(_p / 1e6)
		}), "error");
		return;
	}
	let r = new FileReader();
	r.onload = () => {
		n(String(r.result ?? "")), e.size > 4e6 && lj.setStatus(K("status.videoLarge", { mb: (e.size / 1e6).toFixed(1) }), "error");
	}, r.onerror = () => lj.setStatus(K("status.imageReadError"), "error"), r.readAsDataURL(e);
}
var hj = () => 1 + Math.floor(Math.random() * 1e6);
async function gj(e) {
	let t = [], n = 0, r = 0;
	for (let i of e) try {
		let e = await fj(i);
		e.bytes > 4e5 && (r += 1), t.push({
			src: e.dataUrl,
			alt: Fp(i.name).replaceAll("-", " "),
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
function _j(e, t, n) {
	t ? lj.setStatus(K("status.imagesReadFailed", { n: t }), "error") : n ? lj.setStatus(K("status.imagesLarge", { n }), "error") : lj.setStatus(e ? "" : K("status.noImagesAdded"));
}
var vj = {
	svgContentBBox: uj,
	svgAutoTrim: dj,
	compressOrTrim: fj,
	imageErrorText: pj,
	readVideoFile: mj,
	newSeed: hj,
	compressMany: gj,
	reportUpload: _j
};
//#endregion
//#region ../template/assets/engine/0.7.4/feeds.js
function yj(e) {
	return String(e ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&apos;");
}
function bj(e, t) {
	let n = String(t ?? "").replace(/\/+$/, "");
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${(e ?? []).filter((e) => !e.noindex).map((e) => `  <url><loc>${yj(n + (e.path === "/" ? "/" : e.path))}</loc></url>`).join("\n")}\n</urlset>\n`;
}
function xj(e) {
	return `User-agent: *\nDisallow: /admin/\n\nSitemap: ${String(e ?? "").replace(/\/+$/, "")}/sitemap.xml\n`;
}
var Sj = [
	"news",
	"notices",
	"publications"
];
function Cj(e) {
	let t = String(e.origin ?? "").replace(/\/+$/, ""), n = (e.items ?? []).map((n) => {
		let r = n.href ? new URL(n.href, t + "/").href : t + "/", i = n.date ? new Date(n.date) : null, a = i && !Number.isNaN(i.getTime()) ? `\n      <pubDate>${i.toUTCString()}</pubDate>` : "", o = n.text ? `\n      <description>${yj(n.text)}</description>` : "";
		return `    <item>\n      <title>${yj(n.title)}</title>\n      <link>${yj(r)}</link>\n      <guid isPermaLink="false">${yj(`${e.path}#${n.id ?? n.title}`)}</guid>${o}${a}\n    </item>`;
	}).join("\n");
	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${yj(e.title)}</title>\n    <link>${yj(t + "/")}</link>\n    <description>${yj(e.description ?? e.title)}</description>\n${n}${n ? "\n" : ""}  </channel>\n</rss>\n`;
}
//#endregion
//#region src/state/publish.svelte.js
function wj(e, t, n, r) {
	let i = e?.[t];
	if (!i?.startsWith("data:image/") && !i?.startsWith("data:audio/") && !i?.startsWith("data:video/")) return;
	let a = i.split(",", 2)[1], o = `media/${Fp(n || "image")}-${Ip(a)}.${Pp(i)}`;
	r.push({
		path: o,
		content: a,
		encoding: "base64"
	}), e[t] = `/${o}`;
}
function Tj(e, t) {
	wj(e, "image", e.title, t);
	for (let n of e.colors ?? []) wj(n, "image", `${e.title}-${n.name}`, t);
}
function Ej(e, t) {
	for (let n of e?.layers ?? []) {
		if (n.type === "image" && wj(n.props, "src", "background", t), n.type === "slideshow") for (let e of n.props.images ?? []) wj(e, "src", "background", t);
		n.type === "video" && (wj(n.props, "src", "video", t), wj(n.props, "poster", "plakat", t));
	}
}
function Dj(e, t) {
	if (e.type === "image" && wj(e.props, "src", e.props.alt, t), e.type === "icon" && wj(e.props, "image", "ikon", t), e.type === "gallery") for (let n of e.props.images ?? []) wj(n, "src", n.alt || "gallery", t);
	e.type === "audio" && wj(e.props, "src", e.props.title || "lyd", t), e.type === "video" && (wj(e.props, "src", e.props.title || "video", t), wj(e.props, "poster", "poster", t));
}
function Oj(e, t) {
	Ej(e.background, t);
	for (let n of e.blocks) Dj(n, t);
}
function kj(e) {
	let t = [];
	e.meta?.og && wj(e.meta.og, "image", "share", t);
	for (let n of e.sections) Oj(n, t);
	return t;
}
function Aj(e) {
	let t = [], n = e.nav?.logo;
	n?.type === "image" && wj(n, "value", "logo", t), n?.type === "both" && wj(n, "image", "logo", t), e.nav?.style && wj(e.nav.style, "image", "menu", t), Ej(e.nav?.style?.background, t), Ej(e.footer?.background, t), e.footer?.brand && wj(e.footer.brand, "logo", "footer-logo", t);
	for (let n of Array.isArray(e.site?.links) ? e.site.links : []) wj(n, "image", "link-icon", t);
	if (e.nav?.launcher) {
		wj(e.nav.launcher, "image", "snarvei", t);
		for (let n of e.nav.launcher.links ?? []) wj(n, "image", "snarvei", t);
	}
	return wj(e.site, "icon", "ikon", t), t;
}
var jj = /* @__PURE__ */ k(!1), Mj = /* @__PURE__ */ k(null);
function Nj() {
	A(jj, !I(jj));
}
function Pj() {
	A(jj, !1);
	try {
		Fj(), lj.setStatus(K("ui.discarded"), "info");
	} catch (e) {
		console.error("Urd: discard failed", e), lj.setStatus(String(e?.message ?? e), "error");
	}
}
function Fj() {
	ck.pushHistory("discard");
	for (let e of Q.siteDraft.pages) e.id !== $.pageId && !$.pendingPublished.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
	let e = $.store.reset();
	if (Q.siteStore.reset(), rD.pluginsStore && (rD.pluginsStore.reset(), rD.syncPluginsView()), Ak.collectionsIndexStore) {
		Ak.collectionsIndexStore.reset(), Ak.collectionIds = [...Ak.collectionsIndexStore.data.samlinger ?? []];
		for (let e of Object.keys(Ak.collectionStores)) Ak.collectionIds.includes(e) ? Ak.collectionStores[e].reset() : delete Ak.collectionStores[e];
		Ak.syncCollectionsView();
	}
	if (cw.templatesIndexStore) {
		cw.templatesIndexStore.reset(), cw.templateIds = [...cw.templatesIndexStore.data.maler ?? []];
		for (let e of Object.keys(cw.templateStores)) cw.templateIds.includes(e) ? cw.templateStores[e].reset() : (localStorage.removeItem(`urd-draft-template-${e}`), localStorage.removeItem(`urd-draft-mal-${e}`), delete cw.templateStores[e]);
		cw.pushTemplatesToPreview();
	}
	Q.linkSiteDraft(), Q.grid = {
		snap: !0,
		...Q.siteDraft.grid
	}, ck.updateDirty(), lj.status = "", Q.pushSiteToPreview(), Q.siteDraft.pages.some((e) => e.id === $.pageId) ? IE.bridge?.sendPage($.pageId, e) : $.selectPage(Q.siteDraft.pages[0].id);
}
async function Ij() {
	if (qk.revertedSinceLoad) {
		lj.setStatus(K("status.revertReloadBeforePublish"), "error");
		return;
	}
	if (qk.updateBusy) {
		lj.setStatus(K("update.publishBlocked"), "error");
		return;
	}
	lj.setStatus(K("status.publishing"));
	let e = [], t = [], n = [], r = [];
	for (let i of Q.siteDraft.pages) {
		let a = `urd-draft-${i.id}`, o = $.pendingPublished.has(i.id) || !Q.site.pages.some((e) => e.id === i.id), s = null;
		if (i.id === $.pageId && ($.store.hasDraft() || o)) s = $.store.data;
		else if (i.id !== $.pageId) {
			let e = localStorage.getItem(a);
			if (e) try {
				s = Dc(JSON.parse(e), Q.siteStore.data);
			} catch {}
		}
		if (!s && o && (s = $.blankPage(i)), !s) continue;
		let c = JSON.parse(JSON.stringify(s));
		e.push(...kj(c)), e.push({
			path: i.file,
			content: JSON.stringify(c, null, 2) + "\n",
			encoding: "utf-8"
		}), t.push(i.title), o ? r.push(i.id) : n.push(a);
	}
	if (Q.siteStore.hasDraft()) {
		let r = JSON.parse(JSON.stringify(Q.siteDraft));
		e.push(...Aj(r)), e.push({
			path: "content/site.json",
			content: JSON.stringify(r, null, 2) + "\n",
			encoding: "utf-8"
		}), e.push({
			path: "content/theme.css",
			content: Ms(r.theme),
			encoding: "utf-8"
		}), n.push("urd-draft-site");
		let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
		i(Q.site.theme, Q.siteDraft.theme) || t.push(K("publish.part.theme")), i(Q.site.nav, Q.siteDraft.nav) || t.push(K("publish.part.nav")), i(Q.site.footer, Q.siteDraft.footer) || t.push(K("publish.part.footer")), i(Q.site.pages, Q.siteDraft.pages) || t.push(K("publish.part.pages")), i(Q.site.grid, Q.siteDraft.grid) || t.push(K("publish.part.grid")), (Q.site.site.icon ?? null) !== (Q.siteDraft.site.icon ?? null) && t.push(K("publish.part.icon"));
		let { icon: a, ...o } = Q.site.site, { icon: s, ...c } = Q.siteDraft.site;
		i(o, c) || t.push(K("publish.part.siteInfo"));
	}
	let i = Object.entries(Ak.collectionStores).filter(([, e]) => e.hasDraft());
	if (i.length || Ak.collectionsIndexStore?.hasDraft()) {
		for (let [t, r] of i) {
			let i = JSON.parse(JSON.stringify(r.data));
			for (let t of i.entries) Tj(t, e);
			e.push({
				path: `content/samlinger/${t}.json`,
				content: JSON.stringify(i, null, 2) + "\n",
				encoding: "utf-8"
			}), Sj.includes(i.kind) && e.push({
				path: `content/samlinger/${t}.xml`,
				content: Cj({
					title: i.name ?? t,
					origin: location.origin,
					path: `/content/samlinger/${t}.xml`,
					items: i.entries.map((e) => ({
						id: e.id,
						title: Ak.plainTitle(e.title),
						text: Ak.plainTitle(e.text),
						date: e.date,
						href: e.href
					}))
				}),
				encoding: "utf-8"
			}), n.push(`urd-draft-samling-${t}`);
		}
		if (Ak.collectionsIndexStore?.hasDraft()) {
			e.push({
				path: "content/collections.json",
				content: JSON.stringify(Ak.collectionsIndexStore.data, null, 2) + "\n",
				encoding: "utf-8"
			}), n.push("urd-draft-collections", "urd-draft-samlinger");
			let t = { samlinger: [] };
			try {
				t = await (await fetch("/content/collections.json")).json();
			} catch {}
			let r = new Set(e.map((e) => e.path));
			for (let n of t.samlinger ?? []) {
				let t = `content/samlinger/${n}.json`;
				!Ak.collectionIds.includes(n) && !r.has(t) && e.push({
					path: t,
					delete: !0
				});
			}
		}
		t.push(K("publish.part.collections"));
	}
	let a = Object.entries(cw.templateStores).filter(([, e]) => e.hasDraft());
	if (a.length || cw.templatesIndexStore?.hasDraft()) {
		for (let [t, r] of a) {
			let i = JSON.parse(JSON.stringify(r.data));
			i.section && Oj(i.section, e);
			for (let t of i.blocks ?? []) Dj(t, e);
			for (let t of i.page?.sections ?? []) Oj(t, e);
			e.push({
				path: `content/maler/${t}.json`,
				content: JSON.stringify(i, null, 2) + "\n",
				encoding: "utf-8"
			}), n.push(`urd-draft-mal-${t}`);
		}
		if (cw.templatesIndexStore?.hasDraft()) {
			e.push({
				path: "content/maler.json",
				content: JSON.stringify(cw.templatesIndexStore.data, null, 2) + "\n",
				encoding: "utf-8"
			}), n.push("urd-draft-templates", "urd-draft-maler");
			let t = { maler: [] };
			try {
				t = await (await fetch("/content/maler.json")).json();
			} catch {}
			let r = new Set(e.map((e) => e.path));
			for (let n of t.maler ?? []) {
				let t = `content/maler/${n}.json`;
				!cw.templateIds.includes(n) && !r.has(t) && e.push({
					path: t,
					delete: !0
				});
			}
		}
		t.push(K("publish.part.templates"));
	}
	rD.pluginsStore?.hasDraft() && (e.push({
		path: "plugins/plugins.json",
		content: JSON.stringify(rD.pluginsStore.data, null, 2) + "\n",
		encoding: "utf-8"
	}), n.push("urd-draft-plugins"), t.push(K("publish.part.plugins")));
	try {
		let t = await (await fetch("/index.html")).text();
		for (let n of Q.siteDraft.pages) n.path !== "/" && e.push({
			path: `${n.path.slice(1)}/index.html`,
			content: t,
			encoding: "utf-8"
		});
	} catch {}
	e.push({
		path: "sitemap.xml",
		content: bj(Q.siteDraft.pages, location.origin),
		encoding: "utf-8"
	}), e.push({
		path: "robots.txt",
		content: xj(location.origin),
		encoding: "utf-8"
	});
	let o = new Set(e.map((e) => e.path)), s = (t) => {
		o.has(t) || e.push({
			path: t,
			delete: !0
		});
	};
	for (let e of Q.site.pages) {
		let t = Q.siteDraft.pages.find((t) => t.id === e.id);
		t ? t.path !== e.path && e.path !== "/" && s(`${e.path.slice(1)}/index.html`) : (s(e.file), e.path !== "/" && s(`${e.path.slice(1)}/index.html`));
	}
	let c = await qk.confirmNoConflict(e);
	if (!c.ok) {
		lj.setStatus(K("status.publishAborted"), "error");
		return;
	}
	let l = {
		message: K("publish.commitMessage", { titles: t.join(", ") || K("publish.theSite") }),
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
		t ? qk.baseSha = t : qk.refreshBaseSha(), kj($.store.data), Aj(Q.siteDraft);
		for (let e of n) localStorage.removeItem(e);
		for (let e of r) $.pendingPublished.add(e);
		if (Q.site = JSON.parse(JSON.stringify(Q.siteDraft)), Q.siteStore = fC("urd-draft-site", () => Q.site, lj.draftSaveError), Q.linkSiteDraft(), rD.pluginsStore) {
			let e = JSON.parse(JSON.stringify(rD.pluginsStore.data));
			rD.pluginsStore = fC("urd-draft-plugins", () => e, lj.draftSaveError), rD.syncPluginsView();
		}
		if (Ak.collectionsIndexStore) {
			for (let e of Object.values(Ak.collectionStores)) for (let t of e.data.entries) Tj(t, []);
			let e = JSON.parse(JSON.stringify(Ak.collectionsIndexStore.data));
			Ak.collectionsIndexStore = fC("urd-draft-collections", () => e, lj.draftSaveError, "urd-draft-samlinger"), Ak.publishedCollections = {};
			for (let e of Ak.collectionIds) {
				if (!Ak.collectionStores[e]) continue;
				let t = JSON.parse(JSON.stringify(Ak.collectionStores[e].data));
				Ak.publishedCollections[e] = t, Ak.collectionStores[e] = fC(`urd-draft-collection-${e}`, () => t, lj.draftSaveError, `urd-draft-samling-${e}`);
			}
			Ak.syncCollectionsView();
		}
		if (cw.templatesIndexStore) {
			for (let e of Object.values(cw.templateStores)) {
				e.data?.section && Oj(e.data.section, []);
				for (let t of e.data?.blocks ?? []) Dj(t, []);
				for (let t of e.data?.page?.sections ?? []) Oj(t, []);
			}
			let e = JSON.parse(JSON.stringify(cw.templatesIndexStore.data));
			cw.templatesIndexStore = fC("urd-draft-templates", () => e, lj.draftSaveError, "urd-draft-maler"), cw.publishedTemplates = {};
			for (let e of cw.templateIds) {
				if (!cw.templateStores[e]) continue;
				let t = JSON.parse(JSON.stringify(cw.templateStores[e].data));
				cw.publishedTemplates[e] = t, cw.templateStores[e] = fC(`urd-draft-template-${e}`, () => t, lj.draftSaveError, `urd-draft-mal-${e}`);
			}
			cw.pushTemplatesToPreview();
		}
		Q.grid = {
			snap: !0,
			...Q.siteDraft.grid
		};
		let i = JSON.parse(JSON.stringify($.store.data));
		$.store = fC(`urd-draft-${$.pageId}`, () => i, lj.draftSaveError), $.pendingPublished.has($.pageId) && lj.writeDraftKey(`urd-draft-${$.pageId}`, JSON.stringify(i)), ck.updateDirty(), lj.setStatus(K("status.published"), "info"), qk.awaitPublishDeploy(e);
	} else if (u?.status === 401) {
		let e = await u.json().catch(() => null);
		lj.setStatus(e?.code === "loginExpired" ? K("status.loginExpired") : K("status.loginRequired", { reason: ba(e) ?? K("status.unknownReason") }), "error"), await lj.checkAuth();
	} else u?.status === 403 ? lj.setStatus(ba(await u.json().catch(() => null)) ?? K("status.noPublishAccess"), "error") : u?.status === 409 ? lj.setStatus(K("status.publishRace"), "error") : u ? lj.setStatus(ba(await u.json().catch(() => null)) ?? K("status.publishFailed"), "error") : lj.setStatus(K("status.publishUnavailable"), "error");
}
function Lj() {
	Nn(() => {
		if (!I(jj)) return;
		let e = (e) => {
			I(Mj)?.contains(e.target) ? e.target instanceof Element && e.target.closest(".discard-confirm") && (e.preventDefault(), e.stopPropagation(), Pj()) : A(jj, !1);
		}, t = (e) => {
			e.key === "Escape" && A(jj, !1);
		}, n = !1, r = (e) => {
			n = !!I(Mj)?.contains(e.target);
		}, i = () => {
			n = !1;
		}, a = () => {
			n || A(jj, !1);
		};
		return window.addEventListener("pointerdown", r, !0), window.addEventListener("pointerup", i, !0), window.addEventListener("click", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", a), () => {
			window.removeEventListener("pointerdown", r, !0), window.removeEventListener("pointerup", i, !0), window.removeEventListener("click", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", a);
		};
	});
}
var Rj = {
	materializeField: wj,
	materializeEntryImages: Tj,
	materializeBackground: Ej,
	materializeBlockImages: Dj,
	materializeSection: Oj,
	materializeImages: kj,
	materializeSiteImages: Aj,
	get discardArmed() {
		return I(jj);
	},
	set discardArmed(e) {
		A(jj, e, !0);
	},
	get discardWrapEl() {
		return I(Mj);
	},
	set discardWrapEl(e) {
		A(Mj, e, !0);
	},
	requestDiscard: Nj,
	confirmDiscard: Pj,
	discard: Fj,
	publish: Ij,
	effects: Lj
}, zj = /* @__PURE__ */ R("<button class=\"chrome-restore\"><!> </button>"), Bj = /* @__PURE__ */ R("<button type=\"button\"></button>"), Vj = /* @__PURE__ */ R("<aside><div class=\"panel-head\"><h2> </h2> <!></div> <!></aside>"), Hj = /* @__PURE__ */ R("<div class=\"workspace\"><!> <!> <!></div>"), Uj = /* @__PURE__ */ R("<p class=\"loading\"> </p>"), Wj = /* @__PURE__ */ R("<div><span> </span> <button class=\"toast-x\">×</button></div>"), Gj = /* @__PURE__ */ R("<div class=\"editor\"><!> <!> <!> <!> <!> <!> <!> <!></div> <!>", 1);
function Kj(e, t) {
	it(t, !0);
	let n = [
		vj,
		ck,
		IE,
		lj,
		Q,
		$,
		Ak,
		cw,
		rD,
		qk,
		FT,
		QT,
		Rj
	], r = {};
	for (let e of n) Object.defineProperties(r, Object.getOwnPropertyDescriptors(e));
	Object.assign(r, {
		blockLabel: (e) => FT.BLOCK_LABELS[e] ?? e,
		blockEntranceOptions: () => $.BLOCK_ENTRANCE_OPTIONS,
		hoverOptions: () => $.HOVER_OPTIONS,
		openPanel: (e, t = {}) => {
			t.calendars && (Q.siteCalendarsOpen = !0), lj.activePanel = e;
		},
		openCollection: (e) => {
			Ak.activeCollection = e, lj.activePanel = "collections";
		},
		openDesignPicker: () => {
			$.designPicker = { mode: "set" };
		}
	}), rt("urd-editor", r);
	for (let e of n) e.effects?.();
	ia(() => {
		r.init();
	});
	var i = Gj();
	zr("keydown", mn, function(...e) {
		r.onKeydown?.apply(this, e);
	}), zr("pointerdown", mn, function(...e) {
		r.onPointerdownWindow?.apply(this, e);
	});
	var a = M(i), o = j(a), s = (e) => {
		var t = zj(), n = j(t);
		H(n, () => q.pencil);
		var i = P(n);
		D(t), F((e, n) => {
			G(t, "title", e), B(i, ` ${n ?? ""}`);
		}, [() => K("tip.backToEdit"), () => K("ui.edit")]), L("click", t, function(...e) {
			r.toggleChrome?.apply(this, e);
		}), z(e, t);
	};
	V(o, (e) => {
		r.chromeVisible || e(s);
	});
	var c = P(o, 2);
	US(c, {});
	var l = P(c, 2), u = (e) => {
		var t = Hj(), n = j(t);
		rC(n, {});
		var i = P(n, 2), a = (e) => {
			var t = Vj();
			let n;
			var i = j(t), a = j(i), o = N(a, !0), s = P(a, 2), c = (e) => {
				var t = Bj();
				let n;
				H(t, () => q.foldToggle, !0), D(t), F((e, i) => {
					n = Pi(t, 1, "fold-all fold-toggle", null, n, { collapse: r.panelAllOpen }), G(t, "title", e), G(t, "aria-label", i);
				}, [() => K(r.panelAllOpen ? "ui.collapseAll" : "ui.expandAll"), () => K(r.panelAllOpen ? "ui.collapseAll" : "ui.expandAll")]), L("click", t, function(...e) {
					r.togglePanelGroups?.apply(this, e);
				}), z(e, t);
			};
			V(s, (e) => {
				r.panelHasGroups && e(c);
			}), D(i);
			var l = P(i, 2), u = (e) => {
				Uc(e, {});
			}, d = (e) => {
				Zf(e, {});
			}, f = (e) => {
				xm(e, {});
			}, p = (e) => {
				Am(e, {});
			}, m = (e) => {
				Ch(e, {});
			}, h = (e) => {
				Th(e, {});
			}, g = (e) => {
				Db(e, {});
			}, _ = (e) => {
				Jb(e, {});
			}, v = (e) => {
				px(e, {});
			}, y = (e) => {
				Sx(e, {});
			}, b = (e) => {
				Ox(e, {});
			}, x = (e) => {
				Ux(e, {});
			};
			V(l, (e) => {
				r.activePanel === "pages" ? e(u) : r.activePanel === "nav" ? e(d, 1) : r.activePanel === "site" ? e(f, 2) : r.activePanel === "theme" ? e(p, 3) : r.activePanel === "blocks" ? e(m, 4) : r.activePanel === "grid" ? e(h, 5) : r.activePanel === "properties" ? e(g, 6) : r.activePanel === "footer" ? e(_, 7) : r.activePanel === "collections" ? e(v, 8) : r.activePanel === "plugins" ? e(y, 9) : r.activePanel === "history" ? e(b, 10) : r.activePanel === "update" && e(x, 11);
			}), D(t), Zi(t, (e) => r.panelEl = e, () => r?.panelEl), F((e) => {
				n = Pi(t, 1, "panel", null, n, { hidden: !r.chromeVisible }), G(a, "title", e), B(o, r.PANEL_LABELS[r.activePanel]);
			}, [() => r.PANEL_INTROS[r.activePanel]?.map((e) => K(e)).join("\n")]), z(e, t);
		};
		V(i, (e) => {
			r.activePanel && e(a);
		}), aC(P(i, 2), {}), D(t), z(e, t);
	}, d = (e) => {
		var t = Uj(), n = N(t, !0);
		F((e) => B(n, e), [() => K("ui.loading")]), z(e, t);
	};
	V(l, (e) => {
		r.site ? e(u) : e(d, -1);
	});
	var f = P(l, 2), p = (e) => {
		Gx(e, {
			get image() {
				return r.iconEditorImage;
			},
			get onapply() {
				return r.applyIcon;
			},
			oncancel: () => r.iconEditorImage = null
		});
	};
	V(f, (e) => {
		r.iconEditorImage && e(p);
	});
	var m = P(f, 2), h = (e) => {
		{
			let t = /* @__PURE__ */ O(() => r.designPicker.mode === "set" ? rh(r.selectedBlock?.props.design).id : null), n = /* @__PURE__ */ O(() => r.siteDraft ? Xe(r.siteDraft) : null), i = /* @__PURE__ */ O(() => r.store?.data ? Xe(r.store.data) : null);
			_S(e, {
				get mode() {
					return r.designPicker.mode;
				},
				get current() {
					return I(t);
				},
				get site() {
					return I(n);
				},
				get page() {
					return I(i);
				},
				onpick: (e) => {
					r.designPicker.mode === "add" ? r.addCalendarDesign(e) : r.setCalendarDesign(e), r.designPicker = null;
				},
				onclose: () => r.designPicker = null
			});
		}
	};
	V(m, (e) => {
		r.designPicker && e(h);
	});
	var g = P(m, 2);
	lC(g, {});
	var _ = P(g, 2);
	dC(_, {});
	var v = P(_, 2), y = (e) => {
		var t = Wj();
		let n;
		var i = j(t), a = N(i, !0), o = P(i, 2);
		D(t), F((e) => {
			n = Pi(t, 1, "toast", null, n, {
				ok: r.statusKind === "ok",
				error: r.statusKind === "error"
			}), B(a, r.status), G(o, "title", e);
		}, [() => K("ui.close")]), L("click", o, () => r.setStatus("")), z(e, t);
	};
	V(v, (e) => {
		r.status && e(y);
	}), D(a);
	var b = P(a, 2), x = (e) => {
		bS(e, {
			get pos() {
				return r.blockMenu;
			},
			onclose: () => r.blockMenu = null
		});
	};
	V(b, (e) => {
		r.blockMenu && r.selectedBlock && e(x);
	}), z(e, i), at();
}
//#endregion
//#region src/main.js
Br(["click"]), document.documentElement.lang = await wa();
var qj = ti(Kj, { target: document.getElementById("urd-admin") });
//#endregion
export { qj as default };
