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
var Os = /* @__PURE__ */ new Set([
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
function ks(e) {
	return Os.has(e?.type) && e.height?.mode !== "own";
}
var As = /* @__PURE__ */ new Set([
	"calendar",
	"collection",
	"product"
]), js = /* @__PURE__ */ new Set([
	"countdown",
	"quote",
	"stats"
]), Ms = /* @__PURE__ */ new Set([
	"image",
	"video",
	"shape",
	"icon"
]), Ns = /* @__PURE__ */ new Set([
	"image",
	"video",
	"shape",
	"icon",
	"map"
]), Ps = {
	min: .4,
	max: 2
}, Fs = {
	min: 6,
	max: 200,
	minDefault: 12,
	maxDefault: 96
};
function Is(e) {
	if (!e || Ns.has(e.type)) return 1;
	let t = Number(e.size);
	return !Number.isFinite(t) || t <= 0 ? 1 : Math.round(Math.min(Ps.max, Math.max(Ps.min, t)) * 100) / 100;
}
function Ls(e) {
	let t = (e, t) => {
		let n = Number(e);
		return Number.isFinite(n) && n > 0 ? Math.min(Fs.max, Math.max(Fs.min, Math.round(n))) : t;
	}, n = t(e?.sizeMin, Fs.minDefault);
	return {
		min: n,
		max: Math.max(n, t(e?.sizeMax, Fs.maxDefault))
	};
}
function Rs(e, t = {}) {
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
function zs(e, t, n) {
	return Bs(e, /* @__PURE__ */ new Map([[t, n]]));
}
function Bs(e, t) {
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
	let { shifts: i } = Rs(n);
	for (let e of n) {
		let t = i.get(e.id) ?? 0;
		t && r.set(e.id, e.y + t);
	}
	return r;
}
var Vs = 24, Hs = {
	"oppsett-byttet": "layout-changed",
	"blokk-endret": "block-edited",
	"desktop-endret-etter-mobil": "desktop-changed-after-mobile",
	seksjonshøyde: "section-height",
	"blokk-flyttet": "block-moved",
	"blokk-slettet": "block-deleted",
	"blokk-lagt-til": "block-added"
};
function Us(e, t) {
	if (!e || !("y" in e || "h" in e)) return e ?? null;
	if (t && e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h) return null;
	let n = {
		x: e.x,
		w: e.w
	};
	return Number.isFinite(e.y) && (n.row = Math.max(1, Math.round((e.y - Vs) / 8) + 1), n.rows = Number.isFinite(e.h) ? Math.max(1, Math.ceil(e.h / 8)) : 1), Number.isFinite(e.z) && e.z !== 1 && (n.z = e.z), e.rot && (n.rot = e.rot), n;
}
var Ws = {
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
}, Gs = { bildegalleri: "slideshow" }, Ks = {
	flate: "surface",
	aksent: "accent",
	invers: "inverse",
	dus: "soft",
	dempet: "muted",
	dyp: "deep",
	uthevet: "highlighted"
}, qs = {
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
function Js(e) {
	let t = Array.isArray(e) ? e : e.blocks ?? [];
	for (let e of t) Ws[e.type] && (e.type = Ws[e.type]);
	if (!Array.isArray(e)) {
		for (let t of e.background?.layers ?? []) Gs[t.type] && (t.type = Gs[t.type]);
		Ks[e.theme] && (e.theme = Ks[e.theme]), qs[e.preset] && (e.preset = qs[e.preset]);
	}
	return e;
}
var Ys = 26;
function Xs(e) {
	for (let t of e?.blocks ?? []) {
		if (t.type !== "calendar" || !t.props || !("scale" in t.props)) continue;
		let e = Is({
			type: "calendar",
			size: t.props.scale
		});
		delete t.props.scale, e !== 1 && (t.size = e);
	}
}
function Zs(e) {
	for (let t of e?.blocks ?? []) {
		if (t.type !== "map" && t.type !== "kart" || !Number.isFinite(t.props?.height)) continue;
		let n = t.frames?.desktop;
		if (n && Number.isFinite(n.h)) {
			let r = Math.max(n.h, Math.round(t.props.height + Ys)), i = zs(e.blocks, t.id, r);
			n.h = r;
			for (let t of e.blocks) {
				let e = i.get(t.id);
				Number.isFinite(e) && t.frames?.desktop && (t.frames.desktop.y = e);
			}
		}
		delete t.props.height;
	}
}
function Qs(e, t = !1) {
	for (let n of e?.blocks ?? []) {
		if (n.type !== "gallery" || !n.props) continue;
		let r = n.frames?.desktop;
		if ((t || "bandHeight" in n.props) && n.props.view === "ribbon" && r && Number.isFinite(r.h)) {
			let t = Math.min(400, Math.max(80, Number(n.props.bandHeight) || 160)), i = Number(n.props.rows) === 2 ? 2 : 1, a = Number(n.props.gap) || 0, o = Math.round((i * t + (i - 1) * a) * Is(n)), s = zs(e.blocks, n.id, o);
			r.h = o;
			for (let t of e.blocks) {
				let e = s.get(t.id);
				Number.isFinite(e) && t.frames?.desktop && (t.frames.desktop.y = e);
			}
		}
		delete n.props.bandHeight;
	}
}
var $s = {
	1: (e) => {
		for (let t of e.sections ?? []) {
			let e = t.responsive?.mobile;
			for (let e of t.blocks ?? []) e.decor && (e.hideMobile = !0), e.frames?.mobile && (e.frames.mobile = Us(e.frames.mobile, e.frames.desktop));
			e?.mode === "manual" && (e.mode = "auto");
			let n = e?.attention?.reason;
			n && Hs[n] && (e.attention.reason = Hs[n]);
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) Js(t);
		return e;
	},
	3: (e) => {
		for (let t of e.sections ?? []) Js(t);
		return e;
	},
	4: (e) => {
		for (let t of e.sections ?? []) Zs(t);
		return e;
	},
	5: (e) => {
		for (let t of e.sections ?? []) Xs(t);
		return e;
	},
	6: (e) => {
		for (let t of e.sections ?? []) Qs(t, !0);
		return e;
	}
}, ec = {
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
function tc(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 4;) {
		let r = ec[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function nc(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 7;) {
		let i = $s[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/page-presets.js
var rc = /* @__PURE__ */ new Map();
Ds({ sections: { define: (e, t) => rc.set(e, t) } });
var ic = [
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
function ac(e, { pageId: t, title: n }) {
	let r = ic.find((t) => t.id === e);
	return r ? {
		schemaVersion: 7,
		meta: {
			id: t,
			title: n
		},
		sections: r.sections.map((e) => rc.get(e).create())
	} : null;
}
//#endregion
//#region ../template/assets/engine/0.7.4/theme.js
function oc(e, t, n) {
	return t === "light" || t === "dark" ? t : n ? "dark" : "light";
}
function sc(e, t) {
	let n = e.tokens || {}, r = e.scheme === "dark" ? "dark" : "light";
	if (!e.alt?.tokens || t === r) return n;
	let i = {};
	for (let t of /* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(e.alt.tokens)])) i[t] = {
		...n[t],
		...e.alt.tokens[t]
	};
	return i;
}
var cc = /^[a-zA-Z0-9#%.,()'"\s+\-*/]+$/;
function lc(e) {
	return typeof e == "string" && cc.test(e) && !/url\(|\/\*|\*\/|expression/i.test(e);
}
function uc(e) {
	let t = e.tokens || {}, n = sc(e, "light"), r = sc(e, "dark"), i = e.scheme === "dark" ? "dark" : "light", a = [], o = [], s = [], c = /* @__PURE__ */ new Set([
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
			lc(c) && (a.push(`  --urd-${e}-${l}: ${c};`), i && a.push(`  --urd-base-${l}: ${c};`)), u !== d && (i && lc(u) && lc(d) ? o.push({
				name: l,
				lv: u,
				dv: d
			}) : !i && lc(u) && lc(d) && s.push({
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
	].some((e) => lc(e.color?.["accent-text"])) && lc(t.color?.accent);
	u && lc(t.color?.bg) && (a.push(`  --urd-color-accent-text: ${t.color.bg};`), a.push(`  --urd-base-accent-text: ${t.color.bg};`));
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
function dc(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
var fc = {
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
}, pc = {
	surface: "sectionTheme.surface",
	accent: "sectionTheme.accent",
	inverse: "sectionTheme.inverse",
	soft: "sectionTheme.soft",
	muted: "sectionTheme.muted",
	deep: "sectionTheme.deep",
	highlighted: "sectionTheme.highlighted"
};
[...new Set(Object.values(fc).flatMap(Object.keys))];
function mc(e) {
	return fc[e] ?? {};
}
function hc(e) {
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
function gc(e, t) {
	let n = hc(e), r = hc(t);
	return n == null || r == null ? null : (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
//#endregion
//#region src/panels/PagesPanel.svelte
var _c = /* @__PURE__ */ R("<span class=\"page-path\">/</span>"), vc = /* @__PURE__ */ R("<input class=\"page-slug\"/>"), yc = /* @__PURE__ */ R("<span class=\"seo-warn\"></span>"), bc = /* @__PURE__ */ R("<button class=\"ghost danger\"><!> </button>"), xc = /* @__PURE__ */ R("<div class=\"page-menu\"><button class=\"ghost\"><!> </button> <!></div>"), Sc = /* @__PURE__ */ R("<div><input class=\"page-title\"/> <!> <!> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <span class=\"page-menu-wrap\"><button class=\"ghost row-tool\"></button> <!></span></span></div>"), Cc = /* @__PURE__ */ R("<img class=\"site-icon-preview\"/>"), wc = /* @__PURE__ */ R("<button class=\"ghost row-tool\"></button>"), Tc = /* @__PURE__ */ R("<div><button class=\"page-template-pick\"><span class=\"page-template-thumb\"></span> <span class=\"page-template-name\"> </span></button></div>"), Ec = /* @__PURE__ */ R("<div><button class=\"page-template-pick\"><span class=\"page-template-thumb\"></span> <span class=\"page-template-name\"> </span></button> <button class=\"page-template-del\"></button></div>"), Dc = /* @__PURE__ */ R("<span class=\"mini-label\"> </span> <div class=\"page-template-grid\"></div>", 1), Oc = /* @__PURE__ */ R("<div class=\"panel-body\"><!> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><label> <textarea rows=\"2\"></textarea></label> <label> <input/></label> <label> <textarea rows=\"2\"></textarea></label> <label> <!></label> <span class=\"toolbar-row\"><label class=\"ghost filepick tb-grow\"> <input type=\"file\" accept=\"image/*\"/></label> <!></span> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label></div></details> <hr class=\"gridmenu-divider\"/> <input/> <button class=\"ghost action\"> </button> <span class=\"mini-label\"> </span> <div class=\"page-template-grid\"><div><button class=\"page-template-pick\"><span class=\"page-template-thumb\"></span> <span class=\"page-template-name\"> </span></button></div> <!></div> <!></div>");
function kc(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.missingSeo), i = /* @__PURE__ */ O(() => n.pageId), a = /* @__PURE__ */ O(() => n.seoDraft), o = /* @__PURE__ */ O(() => n.siteDraft), s = /* @__PURE__ */ O(() => n.templateIds), { addPage: c, deletePage: l, handleDeleteTemplate: u, renamePage: d, savePageAsTemplate: f, selectPage: p, setPageNoindex: m, setPageSeo: h, setPageSlug: g, templateStores: _, uploadOgImage: v } = n, y = Object.fromEntries(ic.map((e) => [e.id, Qo(ac(e.id, {
		pageId: "preview",
		title: ""
	}))])), b = /* @__PURE__ */ O(() => {
		let e = I(o)?.theme?.tokens?.color ?? {};
		return [
			"bg",
			"surface",
			"text",
			"accent"
		].filter((t) => typeof e[t] == "string" && lc(e[t])).map((t) => `--urd-color-${t}: ${e[t]};`).join(" ");
	});
	var x = Oc(), S = j(x);
	ui(S, 17, () => I(o).pages, (e) => e.id, (e, t) => {
		var a = Sc();
		let o;
		var s = j(a);
		U(s);
		var c = P(s, 2), u = (e) => {
			var t = _c();
			F((e) => G(t, "title", e), [() => K("tip.pages.homeLocked")]), z(e, t);
		}, m = (e) => {
			var n = vc();
			U(n), F((e, t) => {
				W(n, e), G(n, "title", t);
			}, [() => I(t).path.slice(1), () => K("tip.pages.slug")]), L("change", n, (e) => g(I(t), e.target.value)), z(e, n);
		};
		V(c, (e) => {
			I(t).path === "/" ? e(u) : e(m, -1);
		});
		var h = P(c, 2), _ = (e) => {
			var t = yc();
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
			var r = xc(), i = j(r), a = j(i);
			H(a, () => q.bookmark);
			var o = P(a);
			D(i);
			var s = P(i, 2), c = (e) => {
				var r = bc(), i = j(r);
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
		var t = Cc();
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
		var t = wc();
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
	D(Ae), D(Oe), ui(P(Oe, 2), 17, () => ic, (e) => e.id, (e, t) => {
		var r = Tc();
		let i;
		var a = j(r), o = j(a);
		H(o, () => y[I(t).id], !0), D(o);
		var s = N(P(o, 2), !0);
		D(a), D(r), F((e, o) => {
			i = Pi(r, 1, "page-template-card", null, i, { picked: n.newPageTemplate === `preset:${I(t).id}` }), G(a, "title", e), B(s, o);
		}, [() => K("tip.pages.templatePick", { name: K(I(t).labelKey) }), () => K(I(t).labelKey)]), L("click", a, () => n.newPageTemplate = n.newPageTemplate === `preset:${I(t).id}` ? null : `preset:${I(t).id}`), z(e, r);
	}), D(De);
	var Ne = P(De, 2), Pe = (e) => {
		var t = Dc(), r = M(t), i = N(r, !0), a = P(r, 2);
		ui(a, 20, () => I(s).filter((e) => _[e]?.data?.mal?.kind === "page"), (e) => e, (e, t) => {
			var r = Ec();
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
var Ac = /* @__PURE__ */ R("<button type=\"button\" class=\"cp-eye svelte-zxiloo\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), jc = /* @__PURE__ */ R("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), Mc = /* @__PURE__ */ R("<button type=\"button\"></button>"), Nc = /* @__PURE__ */ R("<span class=\"cp-label svelte-zxiloo\"> <!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Pc = /* @__PURE__ */ R("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\">×</button></span>"), Fc = /* @__PURE__ */ R("<span class=\"cp-tokens svelte-zxiloo\"></span>"), Ic = /* @__PURE__ */ R("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), Lc = /* @__PURE__ */ R("<span class=\"cp-label svelte-zxiloo\"> </span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Rc = /* @__PURE__ */ R("<div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\"> <button type=\"button\" class=\"cp-add svelte-zxiloo\">+</button></span> <!> <!>", 1), zc = /* @__PURE__ */ R("<button type=\"button\" class=\"cp-clear svelte-zxiloo\">×</button>"), Bc = /* @__PURE__ */ R("<div class=\"cp-pop cp-anchored svelte-zxiloo\" popover=\"auto\"><!></div>"), Vc = /* @__PURE__ */ R("<div class=\"cp-pop svelte-zxiloo\"><!></div>"), Hc = /* @__PURE__ */ R("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!> <!></span>");
function Uc(e, t) {
	it(t, !0);
	let n = (e) => {
		var t = Rc(), n = M(t), a = N(n), o = P(n, 2);
		U(o);
		var s = P(o, 2);
		U(s);
		var c = P(s, 2), l = j(c), u = P(l, 2);
		U(u);
		var d = P(u, 2), f = (e) => {
			var t = Ac();
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
			var r = jc();
			U(r), F((e) => {
				G(r, "title", t), W(r, e);
			}, [() => _e(I(n))]), L("change", r, (e) => ve(I(n), e.target.value)), z(e, r);
		}), D(p);
		var v = P(p, 2), y = (e) => {
			var t = Nc(), n = M(t), a = j(n, !0), o = P(a), s = (e) => {
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
				var o = Mc();
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
			var t = Fc();
			ui(t, 20, () => I(_), (e) => e, (e, t) => {
				var n = Pc(), r = j(n), i = P(r, 2);
				D(n), F((e) => {
					Ii(r, `background: ${t ?? ""}`), G(r, "title", t), G(i, "title", e);
				}, [() => K("cp.removeSaved")]), L("click", r, () => xe(t)), L("click", i, () => Ce(t)), z(e, n);
			}), D(t), z(e, t);
		};
		V(te, (e) => {
			I(_).length && e(ne);
		});
		var re = P(te, 2), ie = (e) => {
			var t = Lc(), n = M(t), r = N(n, !0), i = P(n, 2);
			ui(i, 20, () => I(h), (e) => e, (e, t) => {
				var n = Ic();
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
	var we = Hc(), Te = j(we);
	let Ee;
	var De = P(Te, 2), Oe = (e) => {
		var n = zc();
		F((e, t) => {
			G(n, "title", e), G(n, "aria-label", t);
		}, [() => K("cp.clearTitle"), () => K("cp.clear")]), L("click", n, () => t.onchange?.("")), z(e, n);
	};
	V(De, (e) => {
		o() && r() && e(Oe);
	});
	var ke = P(De, 2), Ae = (e) => {
		var t = Bc(), r = j(t), i = (e) => {
			n(e);
		};
		V(r, (e) => {
			I(x) && e(i);
		}), D(t), Zi(t, (e) => A(f, e), () => I(f)), F(() => {
			G(t, "id", d), Ii(t, `position-anchor: ${u ?? ""}`);
		}), zr("toggle", t, ue), L("click", t, (e) => e.preventDefault()), z(e, t);
	}, je = (e) => {
		var t = Vc(), r = j(t);
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
//#region ../template/assets/engine/0.7.4/icons.js
var Wc = "fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"", Gc = "fill=\"currentColor\" stroke=\"none\"", Kc = {
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
}, qc = [
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
function Jc(e) {
	let t = typeof e == "string" ? Kc[e] : null;
	return t ? `<svg viewBox="0 0 24 24" width="100%" height="100%" ${t.fill ? Gc : Wc} aria-hidden="true" focusable="false">${t.body}</svg>` : null;
}
//#endregion
//#region src/lib/MarkPicker.svelte
var Yc = /* @__PURE__ */ R("<span class=\"mp-count svelte-1y5ipgc\"> </span>"), Xc = /* @__PURE__ */ R("<div class=\"mp-tabs svelte-1y5ipgc\" role=\"group\"><button type=\"button\"> </button> <button type=\"button\"> <!></button></div>"), Zc = /* @__PURE__ */ R("<button type=\"button\"><span class=\"mp-svg svelte-1y5ipgc\"></span></button>"), Qc = /* @__PURE__ */ R("<p class=\"mp-hint svelte-1y5ipgc\"> </p>"), $c = /* @__PURE__ */ R("<input class=\"mp-search svelte-1y5ipgc\" type=\"search\"/> <div class=\"mp-scroll svelte-1y5ipgc\"><div class=\"mp-grid svelte-1y5ipgc\"><button type=\"button\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" aria-hidden=\"true\" class=\"svelte-1y5ipgc\"><circle cx=\"12\" cy=\"12\" r=\"8.5\"></circle><path d=\"M6 18L18 6\"></path></svg></button> <!></div> <!></div>", 1), el = /* @__PURE__ */ R("<button type=\"button\"><img alt=\"\" class=\"svelte-1y5ipgc\"/></button>"), tl = /* @__PURE__ */ R("<div class=\"mp-scroll svelte-1y5ipgc\"><div class=\"mp-grid mp-grid-img svelte-1y5ipgc\"><button type=\"button\" class=\"mp-cell mp-upload svelte-1y5ipgc\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" aria-hidden=\"true\" class=\"svelte-1y5ipgc\"><path d=\"M12 5v14\"></path><path d=\"M5 12h14\"></path></svg> <span> </span></button> <!></div> <p class=\"mp-hint svelte-1y5ipgc\"> </p></div>"), nl = /* @__PURE__ */ R("<!> <!>", 1), rl = /* @__PURE__ */ R("<img class=\"mp-own svelte-1y5ipgc\" alt=\"\"/>"), il = /* @__PURE__ */ R("<span class=\"mp-svg svelte-1y5ipgc\"></span>"), al = /* @__PURE__ */ R("<span class=\"mp-empty svelte-1y5ipgc\" aria-hidden=\"true\">+</span>"), ol = /* @__PURE__ */ R("<div class=\"mp-pop mp-anchored svelte-1y5ipgc\" popover=\"auto\"><!></div>"), sl = /* @__PURE__ */ R("<div class=\"mp-pop svelte-1y5ipgc\"><!></div>"), cl = /* @__PURE__ */ R("<span class=\"mp svelte-1y5ipgc\"><button type=\"button\"><!></button> <!> <input type=\"file\" accept=\"image/*\" hidden=\"\"/></span>");
function ll(e, t) {
	it(t, !0);
	let n = (e) => {
		var t = nl(), n = M(t), a = (e) => {
			var t = Xc(), n = j(t);
			let r;
			var i = N(n, !0), a = P(n, 2);
			let s;
			var c = j(a, !0), l = P(c), u = (e) => {
				var t = Yc(), n = N(t, !0);
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
			var t = $c(), n = M(t);
			U(n);
			var a = P(n, 2), o = j(a), c = j(o);
			let l;
			ui(P(c, 2), 17, () => I(x), ({ id: e }) => e, (e, t) => {
				let n = () => I(t).id;
				var a = Zc();
				let o;
				var s = j(a);
				H(s, () => Jc(n()), !0), D(s), D(a), F((e, t) => {
					o = Pi(a, 1, "mp-cell svelte-1y5ipgc", null, o, { active: n() === r() && !i() }), G(a, "title", e), G(a, "aria-label", t);
				}, [() => K(Kc[n()].labelKey), () => K(Kc[n()].labelKey)]), L("click", a, () => ee(n())), z(e, a);
			}), D(o);
			var u = P(o, 2), d = (e) => {
				var t = Qc(), n = N(t, !0);
				F((e) => B(n, e), [() => K("mp.noHits")]), z(e, t);
			};
			V(u, (e) => {
				I(x).length || e(d);
			}), D(a), F((e, t) => {
				G(n, "placeholder", e), G(n, "aria-label", t), l = Pi(c, 1, "mp-cell mp-none svelte-1y5ipgc", null, l, { active: !r() && !i() }), G(c, "title", s()), G(c, "aria-label", s());
			}, [() => K("mp.search"), () => K("mp.search")]), Gi(n, () => I(v), (e) => A(v, e)), L("click", c, ne), z(e, t);
		}, d = (e) => {
			var t = tl(), n = j(t), r = j(n), a = N(P(j(r), 2), !0);
			D(r), ui(P(r, 2), 16, () => I(S), (e) => e, (e, t) => {
				var n = el();
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
	})), b = qc.flatMap(([e, t]) => t.map((t) => ({
		id: t,
		cat: e
	}))), x = /* @__PURE__ */ O(() => {
		let e = I(v).trim().toLowerCase();
		return e ? b.filter(({ id: t }) => {
			let n = K(Kc[t].labelKey) || Kc[t].label;
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
	var oe = cl(), se = j(oe), ce = j(se), le = (e) => {
		var n = Yr();
		gi(M(n), () => t.children), z(e, n);
	}, ue = (e) => {
		var t = rl();
		F(() => G(t, "src", i())), z(e, t);
	}, de = (e) => {
		var t = il();
		H(t, () => Jc(r()), !0), D(t), z(e, t);
	}, fe = (e) => {
		z(e, al());
	};
	V(ce, (e) => {
		t.children ? e(le) : i() ? e(ue, 1) : r() && Kc[r()] ? e(de, 2) : e(fe, -1);
	}), D(se);
	var pe = P(se, 2), me = (e) => {
		var t = ol(), r = j(t), i = (e) => {
			n(e);
		};
		V(r, (e) => {
			I(g) && e(i);
		}), D(t), Zi(t, (e) => A(m, e), () => I(m)), F(() => {
			G(t, "id", f), Ii(t, `position-anchor: ${d ?? ""}`);
		}), zr("toggle", t, w), z(e, t);
	}, he = (e) => {
		var t = sl(), r = j(t);
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
var ul = {
	min: 0,
	max: 64,
	step: 1
}, dl = {
	min: 12,
	max: 28,
	step: 1
}, fl = {
	min: 0,
	max: 80,
	step: 1
}, pl = {
	min: 0,
	max: 64,
	step: 1
}, ml = {
	min: 480,
	max: 1920,
	step: 20
}, hl = {
	min: .3,
	max: .8,
	step: .05
}, gl = {
	min: 0,
	max: 400,
	step: 10
}, _l = {
	min: 0,
	max: 1200,
	step: 20
}, vl = {
	min: 0,
	max: 64,
	step: 1
}, yl = {
	min: 180,
	max: 400,
	step: 1
}, bl = {
	min: 12,
	max: 128,
	step: 1
}, xl = {
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
}, Sl = [
	"sm",
	"md",
	"lg",
	"xl"
], Cl = .67;
function wl(e) {
	return e === "floating" || e === "floating-square" || e === "floating-tab";
}
function Tl(e, { min: t, max: n, step: r = 1 }, i) {
	let a = Number(e);
	if (e == null || e === "" || !Number.isFinite(a)) return i;
	let o = Math.round(a / r) * r, s = Math.min(n, Math.max(t, o));
	return r < 1 ? Math.round(s * 100) / 100 : s;
}
function El(e, t) {
	if (e?.padY != null && e.padY !== "") return Tl(e.padY, ul, xl.md.padY);
	let n = xl[e?.size] ?? xl.md;
	return Math.round(n.padY * (wl(t) ? Cl : 1));
}
function Dl(e) {
	if (e?.textSize != null && e.textSize !== "") return Tl(e.textSize, dl, xl.md.textSize);
	let t = xl[e?.size] ?? xl.md;
	return Math.round(t.textSize);
}
function Ol(e) {
	return e?.padY != null && e.padY !== "" || e?.textSize != null && e.textSize !== "" ? null : Sl.includes(e?.size) ? e.size : "md";
}
//#endregion
//#region src/lib/Choice.svelte
var kl = /* @__PURE__ */ R("<button type=\"button\"> </button>"), Al = /* @__PURE__ */ R("<div><span class=\"choice-label svelte-1ehof1c\"> </span> <div class=\"choice-seg svelte-1ehof1c\" role=\"group\"></div></div>");
function jl(e, t) {
	it(t, !0);
	let n = ra(t, "title", 3, void 0), r = /* @__PURE__ */ O(() => t.options.length > 3 || t.options.reduce((e, [, t]) => e + `${t}`.length, 0) > 14), i = (e) => `${e ?? ""}`;
	var a = Al();
	let o;
	var s = j(a), c = N(s, !0), l = P(s, 2);
	ui(l, 21, () => t.options, ([e, t]) => i(e), (e, n) => {
		var r = /* @__PURE__ */ O(() => g(I(n), 2));
		let a = () => I(r)[0], o = () => I(r)[1];
		var s = kl();
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
var Ml = [
	["font.system", "system-ui, sans-serif"],
	["font.arial", "Arial, Helvetica, sans-serif"],
	["font.verdana", "Verdana, Geneva, sans-serif"],
	["font.trebuchet", "'Trebuchet MS', sans-serif"],
	["font.georgia", "Georgia, 'Times New Roman', serif"],
	["font.palatino", "'Palatino Linotype', Palatino, serif"],
	["font.courier", "'Courier New', monospace"]
], Nl = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/api\/photo\?[^\s"'<>\\]{1,2048}|\/(?!\/)[\w%./-]*)$/;
function Pl(e) {
	return typeof e == "string" && Nl.test(e);
}
var Fl = /^(?:https?:\/\/|mailto:|tel:)[^\s]+$/i;
function Il(e) {
	return typeof e == "string" && Fl.test(e.trim());
}
var Ll = /^(?:\/(?![/\\])[^\s\\]*|#[^\s]*)$/;
function Rl(e) {
	return Il(e) || typeof e == "string" && Ll.test(e.trim());
}
var zl = [
	"launcher",
	"cart",
	"theme"
];
function Bl(e = {}) {
	let t = Array.isArray(e.tools?.order) ? e.tools.order : [], n = [];
	for (let e of t) zl.includes(e) && !n.includes(e) && n.push(e);
	for (let e of zl) n.includes(e) || n.push(e);
	return n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/pattern.js
var Vl = [
	"dots",
	"grid",
	"diagonal",
	"checks",
	"waves",
	"zigzag",
	"plus",
	"triangles"
], Hl = {
	min: 8,
	max: 160,
	dflt: 28
}, Ul = .12, Wl = {
	dots: "<circle cx=\"12\" cy=\"12\" r=\"3\"/>",
	grid: "<rect width=\"24\" height=\"1.6\"/><rect width=\"1.6\" height=\"24\"/>",
	diagonal: "<path d=\"M-6 6L6 -6M0 24L24 0M18 30L30 18\" fill=\"none\" stroke=\"#000\" stroke-width=\"4\"/>",
	checks: "<rect width=\"12\" height=\"12\"/><rect x=\"12\" y=\"12\" width=\"12\" height=\"12\"/>",
	waves: "<path d=\"M0 12Q6 4 12 12T24 12\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\"/>",
	zigzag: "<path d=\"M0 16L6 8L12 16L18 8L24 16\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\"/>",
	plus: "<path d=\"M12 7V17M7 12H17\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\" stroke-linecap=\"round\"/>",
	triangles: "<path d=\"M0 24L12 4L24 24Z\"/>"
};
function Gl(e) {
	return Vl.includes(e) ? e : "dots";
}
function Kl(e) {
	let t = Number(e);
	return !Number.isFinite(t) || t <= 0 ? Hl.dflt : Math.min(Hl.max, Math.max(Hl.min, Math.round(t)));
}
function ql(e) {
	let t = Number(e);
	return Number.isFinite(t) ? (Math.round(t) % 360 + 360) % 360 : 0;
}
function Jl(e) {
	let t = Number(e);
	return e == null || e === "" || !Number.isFinite(t) ? Ul : Math.min(1, Math.max(0, t));
}
function Yl(e = {}) {
	let t = Kl(e.size), n = ql(e.rotation), r = Wl[Gl(e.pattern)], i = `<pattern id="p" width="${t}" height="${t}" patternUnits="userSpaceOnUse"${n ? ` patternTransform="rotate(${n})"` : ""}><g transform="scale(${t / 24})">${r}</g></pattern>`, a = "<rect width=\"100%\" height=\"100%\" fill=\"url(#p)\"/>";
	return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><defs>${i}</defs>${e.invert === !0 ? `<mask id="m"><rect width="100%" height="100%" fill="#fff"/>${a}</mask><rect width="100%" height="100%" mask="url(#m)"/>` : a}</svg>`;
}
var Xl = () => typeof CSS < "u" && typeof CSS.supports == "function" && (CSS.supports("mask-image", "none") || CSS.supports("-webkit-mask-image", "none")), Zl = {
	version: 1,
	label: "Pattern",
	labelKey: "bgLayer.pattern",
	defaults: () => ({
		pattern: "dots",
		color: "text",
		size: Hl.dflt,
		opacity: Ul,
		rotation: 0,
		invert: !1
	}),
	migrations: {},
	render(e, t) {
		if (!Xl()) return;
		let n = `url("data:image/svg+xml,${encodeURIComponent(Yl(t))}")`;
		e.style.backgroundColor = dc(t.color ?? "text"), e.style.opacity = String(Jl(t.opacity));
		for (let t of ["webkitMask", "mask"]) e.style[`${t}Image`] = n, e.style[`${t}Size`] = "100% 100%", e.style[`${t}Repeat`] = "no-repeat";
	}
}, Ql = [
	"grid",
	"carousel",
	"slides",
	"ribbon",
	"mosaic",
	"polaroid"
], $l = [
	"grid",
	"mosaic",
	"polaroid"
], eu = {
	min: 80,
	max: 400,
	dflt: 140
}, tu = {
	min: 0,
	max: 15,
	dflt: 4
};
function nu(e) {
	return Ql.includes(e) ? e : "grid";
}
function ru(e, t, n) {
	return !Number.isFinite(n) || n < 1 ? 0 : (((Number.isFinite(e) ? e : 0) + t) % n + n) % n;
}
function iu({ count: e = 0, reducedMotion: t = !1 } = {}) {
	return e >= 2 && !t;
}
function au(e, { min: t = 2, fallback: n = 5 } = {}) {
	let r = Number(e);
	return !Number.isFinite(r) || r <= 0 ? n : Math.max(t, r);
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/image.js
var ou = .4, su = [
	"none",
	"kenburns",
	"drift"
], cu = {
	min: 6,
	max: 60,
	dflt: 20
};
function lu(e) {
	return su.includes(e) ? e : "none";
}
function uu(e) {
	let { min: t, max: n, dflt: r } = cu, i = Number(e);
	return !Number.isFinite(i) || i <= 0 ? r : Math.min(n, Math.max(t, i));
}
function du(e, t) {
	return `${(e ?? .5) * 100}% ${(t ?? .5) * 100}%`;
}
function fu(e, t) {
	return e === "contain" ? "contain" : e === "cover" ? "cover" : `${Math.max(0, t ?? 1) * 100}%`;
}
function pu(e) {
	let t = "-9999px";
	return e === "up" ? `inset(${t} 0 0 0)` : e === "down" ? `inset(0 0 ${t} 0)` : e === "both" ? `inset(${t} 0 ${t} 0)` : "inset(0)";
}
function mu(e, t, n, r = .18) {
	let i = Math.max(0, Math.min(1, n)) * ou * t;
	return Math.round(Math.min(i, r * e));
}
function hu(e, t, n, r, i) {
	let a = e + t / 2, o = (n / 2 - a) * Math.max(0, Math.min(1, r)) * ou, s = i ?? mu(t, n, r);
	return Math.max(-s, Math.min(s, o)) || 0;
}
var gu = /* @__PURE__ */ new Set(), _u = !1, vu = 0;
function yu() {
	vu = 0;
	for (let e of [...gu]) e() || gu.delete(e);
}
function bu() {
	vu ||= requestAnimationFrame(yu);
}
function xu(e) {
	gu.add(e), e(), !(_u || typeof window > "u") && (_u = !0, window.addEventListener("scroll", bu, { passive: !0 }), window.addEventListener("resize", bu, { passive: !0 }));
}
function Su(e, t, n, r) {
	let i = r === "cover" || r === "tile" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement, o = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
	e.style.willChange = "transform";
	let s = (t) => {
		e.style.top = `-${t}px`, e.style.bottom = `-${t}px`;
	}, c = () => {
		if (!e.isConnected) return !1;
		if (o || document.body.classList.contains("urd-mobile")) return s(n), e.style.transform = "", !0;
		let r = (a ?? e).getBoundingClientRect(), c = window.innerHeight || document.documentElement.clientHeight, l = mu(r.height, c, t, i ? .18 : .6);
		s(i ? Math.max(n, l) : n);
		let u = hu(r.top, r.height, c, t, l);
		return e.style.transform = `translateY(${u.toFixed(1)}px)`, !0;
	};
	xu(c), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(c));
}
function Cu() {
	return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("animation-timeline", "view()");
}
var wu = /* @__PURE__ */ new Set(), Tu = !1, Eu = 0;
function Du() {
	Eu = 0;
	for (let e of [...wu]) e() || wu.delete(e);
}
function Ou() {
	!Eu && typeof requestAnimationFrame == "function" && (Eu = requestAnimationFrame(Du));
}
function ku(e) {
	wu.add(e), e(), !(Tu || typeof window > "u") && (Tu = !0, window.addEventListener("resize", Ou, { passive: !0 }));
}
function Au(e, t, n, r) {
	let i = r === "cover" || r === "tile" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement;
	e.style.willChange = "transform", e.classList.add("urd-parallax-css");
	let o = () => {
		if (!e.isConnected) return !1;
		let r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || document.body.classList.contains("urd-mobile"), o = (a ?? e).getBoundingClientRect(), s = window.innerHeight || document.documentElement.clientHeight, c = mu(o.height, s, t, i ? .18 : .6), l = i && !r ? Math.max(n, c) : n;
		return e.style.setProperty("--urd-px-shift", `${c}px`), e.style.top = `-${l}px`, e.style.bottom = `-${l}px`, !0;
	};
	ku(o), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(o));
}
var ju = {
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
		motionSpeed: cu.dflt
	}),
	migrations: {
		1: (e) => ({
			...e,
			fit: e.fit === "vanlig" ? "plain" : e.fit === "flislegg" ? "tile" : e.fit === "egen" ? "custom" : e.fit
		}),
		2: (e) => ({
			motion: "none",
			motionSpeed: cu.dflt,
			...e
		})
	},
	render(e, t) {
		let n = !Pl(t.src);
		n && e.classList.add("urd-bg-demo");
		let r = n ? ro(0) : t.src;
		e.style.opacity = String(t.opacity ?? 1), e.style.clipPath = pu(t.bleed), e.style.zIndex = t.bleed === "down" || t.bleed === "both" ? "1" : "";
		let i = document.createElement("div");
		i.className = "urd-bg-image", i.style.position = "absolute", i.style.left = "0", i.style.right = "0", i.style.top = "0", i.style.bottom = "0";
		let a = lu(t.motion), o = a === "none" ? i : document.createElement("div");
		o !== i && (o.className = `urd-bg-motion urd-bg-motion-${a}`, o.style.position = "absolute", o.style.left = "0", o.style.right = "0", o.style.top = "0", o.style.bottom = "0", o.style.animationDuration = `${uu(t.motionSpeed)}s`, i.appendChild(o));
		let s = t.fit === "tile" || t.fit === "repeat";
		o.style.backgroundImage = `url("${r}")`, o.style.backgroundSize = fu(t.fit, t.size), o.style.backgroundRepeat = s ? "repeat" : "no-repeat", o.style.backgroundPosition = du(t.x, t.y);
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
		e.appendChild(i), t.parallax > 0 && Mu(i, t.parallax, o === i ? c : 0, t.fit ?? "cover");
	}
};
function Mu(e, t, n, r) {
	Cu() ? Au(e, t, n, r) : Su(e, t, n, r);
}
//#endregion
//#region ../template/assets/engine/0.7.4/photo-source.js
var Nu = [
	"drive",
	"gphotos",
	"nextcloud",
	"json"
], Pu = {
	min: 1,
	max: 60,
	dflt: 24
}, Fu = [
	"name",
	"newest",
	"random"
], Iu = [
	480,
	800,
	1200,
	1600,
	2e3
], Lu = /^[A-Za-z0-9_-]{10,128}$/, Ru = /^(?!\d+(?:\.\d+)*$)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/;
function zu(e) {
	let t = Number(e);
	return !Number.isFinite(t) || t <= 0 ? Pu.dflt : Math.min(Pu.max, Math.max(Pu.min, Math.round(t)));
}
function Bu(e) {
	let t = typeof e == "string" ? e.trim() : "";
	if (!t) return null;
	if (Lu.test(t) && !t.includes(".")) return {
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
		return Lu.test(t) ? {
			provider: "drive",
			id: t
		} : null;
	}
	if (r === "photos.google.com") {
		let e = /^\/share\/([A-Za-z0-9_-]{10,256})\/?$/.exec(n.pathname), t = n.searchParams.get("key") ?? "";
		return e ? {
			provider: "gphotos",
			id: e[1],
			...Lu.test(t) ? { host: t } : {}
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
	return i && Ru.test(r) ? {
		provider: "nextcloud",
		id: i[1],
		host: r
	} : /\.json$/i.test(n.pathname) && Ru.test(r) ? {
		provider: "json",
		url: n.href
	} : null;
}
function Vu(e) {
	return Fu.includes(e) ? e : "name";
}
var Hu = (e) => Vu(e) === "newest" ? "newest" : "name";
function Uu(e, t) {
	if (!e || !Nu.includes(e.provider)) return null;
	let n = new URLSearchParams({
		p: e.provider,
		sort: Hu(t),
		max: "200"
	});
	return e.id && n.set("id", e.id), e.host && n.set("host", e.host), e.url && n.set("url", e.url), `/api/photos?${n.toString()}`;
}
function Wu(e, t = 200) {
	return (Array.isArray(e?.photos) ? e.photos : []).filter((e) => typeof e?.src == "string" && e.src.startsWith("/api/photo?")).slice(0, Math.max(1, Math.min(200, Number(t) || 200))).map((e) => ({
		src: e.src,
		name: typeof e.name == "string" ? e.name : ""
	}));
}
function Gu(e) {
	let t = e >>> 0;
	return () => {
		t = t + 1831565813 >>> 0;
		let e = t;
		return e = Math.imul(e ^ e >>> 15, e | 1), e ^= e + Math.imul(e ^ e >>> 7, e | 61), ((e ^ e >>> 14) >>> 0) / 4294967296;
	};
}
function Ku(e, t) {
	let n = [...e], r = Gu(Number(t) || 0);
	for (let e = n.length - 1; e > 0; e--) {
		let t = Math.floor(r() * (e + 1));
		[n[e], n[t]] = [n[t], n[e]];
	}
	return n;
}
function qu(e, t, n) {
	return Vu(t) === "random" ? Ku(e, n) : [...e];
}
var Ju = 0;
function Yu() {
	return Ju ||= typeof crypto < "u" && crypto.getRandomValues ? crypto.getRandomValues(/* @__PURE__ */ new Uint32Array(1))[0] || 1 : Date.now() >>> 0 || 1, Ju;
}
function Xu(e, t = 1) {
	let n = (Number(e) || 0) * Math.min(3, Math.max(1, Number(t) || 1));
	return Iu.find((e) => e >= n) ?? Iu[Iu.length - 1];
}
function Zu(e, t) {
	if (typeof e != "string" || !e.startsWith("/api/photo?")) return e;
	let n = new URLSearchParams(e.slice(11));
	return n.set("w", String(t)), `/api/photo?${n.toString()}`;
}
var Qu = 6e5, $u = 3e4, ed = /* @__PURE__ */ new Map(), td = /* @__PURE__ */ new Map();
function nd(e) {
	return e?.source === "folder" && typeof e.folder == "string" ? e.folder.trim() : "";
}
function rd(e, t) {
	let n = Uu(Bu(e), t);
	return n ? id(ed.get(n)) : null;
}
function id(e) {
	if (!e) return null;
	let t = e.value.photos.length ? Qu : $u;
	return Date.now() - e.at < t ? e.value : null;
}
function ad(e, t, { force: n = !1 } = {}) {
	let r = Uu(Bu(e), t);
	if (!r) return Promise.resolve({
		photos: [],
		error: "badAddress",
		code: "photoFolderUnknown"
	});
	if (!n) {
		let e = id(ed.get(r));
		if (e) return Promise.resolve(e);
		if (td.has(r)) return td.get(r);
	}
	let i = (async () => {
		let e;
		try {
			let t = await fetch(r), n = await t.json().catch(() => null);
			e = t.ok ? {
				photos: Wu(n),
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
		return ed.set(r, {
			at: Date.now(),
			value: e
		}), td.delete(r), e;
	})();
	return td.set(r, i), i;
}
function od(e) {
	let t = nd(e), n = t ? rd(t, e.order) : null;
	return n?.photos.length ? qu(n.photos, e.order, Yu()).slice(0, zu(e.folderMax)) : e.images ?? [];
}
function sd(e, t, n) {
	let r = nd(t);
	r && !rd(r, t.order) && ad(r, t.order).then((r) => {
		e.isConnected && r.photos.length && (e.textContent = "", e.removeAttribute("style"), e.className = "urd-bg-layer", n(e, t));
	}), n(e, t);
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/slideshow.js
var cd = {
	source: "upload",
	folder: "",
	order: "random",
	folderMax: Pu.dflt,
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
}, ld = {
	version: 2,
	label: "Image gallery",
	labelKey: "bgLayer.slideshow",
	defaults: () => ({
		images: [],
		fit: "cover",
		opacity: .85,
		blur: 0,
		...cd
	}),
	migrations: { 1: (e) => ({
		...cd,
		style: "fill",
		motion: "none",
		interval: 6,
		opacity: 1,
		...e
	}) },
	render(e, t) {
		sd(e, t, dd);
	}
}, ud = (e, t) => {
	let n = document.createElement(e);
	return n.className = t, n;
};
function dd(e, t) {
	let n = so(t.style), r = od(t).filter((e) => Pl(e?.src)), i = go(t.shape), a = _o(t.look);
	e.classList.add("urd-bg-slideshow", `urd-gallery-${n}`, `urd-gallery-tone-${vo(t.tone)}`), n !== "fill" && e.classList.add(`urd-gallery-shape-${i}`, `urd-gallery-look-${a}`), e.style.setProperty("--urd-frame-radius", `${wo(t.radius)}px`), r.length || e.classList.add("urd-bg-demo"), e.style.opacity = String(t.opacity ?? .85);
	let o = ho(a, t.frameColor);
	o && e.style.setProperty("--urd-frame-color", dc(o));
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
		seed: Do(t.seed, Yu()),
		time: To(t.motionSpeed),
		dwell: xo(t.interval),
		dpr: window.devicePixelRatio || 1
	};
	Sd[n](d), c && (e.style.top = n === "fill" && t.blur > 0 ? `calc(${c} - ${t.blur * 2}px)` : c);
}
function fd(e, t, n, r, i) {
	let a = t[n];
	e.style.backgroundImage = `url("${a ? Zu(a.src, r) : ro(i)}")`, e.style.backgroundPosition = a ? du(a.x, a.y) : "";
}
function pd({ el: e, props: t, images: n, motion: r, reduced: i, dpr: a, dwell: o }) {
	let s = !n.length, c = s ? io(3) : n, l = Xu(window.innerWidth, a);
	t.blur > 0 && (e.style.filter = `blur(${t.blur}px)`, e.style.inset = `-${t.blur * 2}px`);
	let u = Math.max(0, Number(t.fade) || 0);
	e.style.setProperty("--urd-bgg-fade", `${u}s`);
	let d = lu(r === "drift" ? "drift" : r === "kenburns" ? "kenburns" : "none"), f = (e) => {
		let n = ud("div", e ? "urd-bg-slide on" : "urd-bg-slide");
		return d !== "none" && (n.classList.add("urd-bg-motion", `urd-bg-motion-${d}`), n.style.animationDuration = `${uu(t.motionSpeed)}s`), n;
	}, p = (e, n) => {
		e.style.backgroundImage = `url("${s ? n.src : Zu(n.src, l)}")`, e.style.backgroundSize = s ? "240px auto" : fu(t.fit), e.style.backgroundRepeat = s ? "repeat" : "no-repeat", e.style.backgroundPosition = s ? "" : du(n.x, n.y);
	}, m = new Image();
	if (m.src = s ? c[0].src : Zu(c[0].src, l), !m.complete) {
		e.style.visibility = "hidden";
		let t = () => {
			e.style.visibility = "";
		};
		m.addEventListener("load", t, { once: !0 }), m.addEventListener("error", t, { once: !0 });
	}
	let h = f(!0);
	if (p(h, c[0]), e.appendChild(h), !iu({
		count: c.length,
		reducedMotion: i
	})) return;
	let g = f(!1);
	e.appendChild(g);
	let _ = 0, v = h, y = Math.max(au(o, { fallback: $a.dflt }), u + .5) * 1e3, b = setInterval(() => {
		if (!h.isConnected) {
			clearInterval(b);
			return;
		}
		if (document.hidden) return;
		let e = ru(_, 1, c.length), t = new Image();
		t.src = s ? c[e].src : Zu(c[e].src, l);
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
function md(e, t, n, r, i) {
	let a = ud("div", "urd-gallery-skin"), o = ud("div", "urd-gallery-face");
	return fd(o, t, n, r, i), a.appendChild(o), e.appendChild(a), {
		skin: a,
		face: o
	};
}
function hd(e, t) {
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
function gd({ frame: e, skin: t, face: n }, r, i, a) {
	let { motion: o, moves: s, time: c } = a;
	if (!s) return;
	let l = `-${(r.phase * c).toFixed(2)}s`;
	if (o === "drift" || o === "rise") {
		e.classList.add("urd-gallery-travel");
		let t = hd(r, o);
		e.style.setProperty("--tx0", t.tx0), e.style.setProperty("--ty0", t.ty0), e.style.setProperty("--tx1", t.tx1), e.style.setProperty("--ty1", t.ty1), e.style.animationDuration = `${c}s`, e.style.animationDelay = l;
	} else if (o === "kenburns") e.classList.add("urd-gallery-kenburns"), e.style.animationDuration = `${c}s`, e.style.animationDelay = l;
	else if (o === "bounce") {
		e.style.left = "0", e.style.top = "0", e.style.translate = "0 0", e.classList.add("urd-gallery-bounce-x"), t.classList.add("urd-gallery-bounce-y");
		let n = c * (.8 + r.heading * .4), i = c * (.5 + r.phase * .35);
		e.style.animationDuration = `${n.toFixed(2)}s`, e.style.animationDelay = `-${(r.phase * n).toFixed(2)}s`, t.style.animationDuration = `${i.toFixed(2)}s`, t.style.animationDelay = `-${(r.heading * i).toFixed(2)}s`;
	}
}
function _d(e, t, n) {
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
			a >= 0 && (fd(t.face, r, a, t.width, i), c[i] = a, l[a] = ++u), n && (f += 1, vd(t, n(i, f, e.filter((e) => e !== t))));
		});
	});
}
function vd(e, t) {
	let n = t.w / 2 * 1.15, r = t.w / e.aspect / 2 * 1.15;
	e.frame.style.left = `clamp(${n.toFixed(1)}px, ${t.x}%, calc(100% - ${n.toFixed(1)}px))`, e.frame.style.top = `clamp(${r.toFixed(1)}px, ${t.y}%, calc(100% - ${r.toFixed(1)}px))`, e.frame.style.width = `${t.w}px`, e.frame.style.rotate = `${t.rot}deg`, e.x = t.x, e.y = t.y;
}
function yd(e) {
	let { el: t, props: n, style: r, images: i, seed: a, aspect: o, dpr: s } = e, c = {
		count: n.count,
		seed: a,
		size: n.size,
		spread: n.spread,
		tilt: n.tilt,
		style: r,
		repeat: n.repeat === !0
	};
	_d(Oo(i, c).map((n, r) => {
		let a = ud("div", "urd-gallery-box urd-gallery-frame" + (n.index < 0 ? " urd-gallery-frame-empty" : ""));
		a.style.aspectRatio = String(o);
		let c = Xu(n.w, s), { skin: l, face: u } = md(a, i, n.index, c, r);
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
		return vd(d, n), gd(d, n, r, e), d;
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
function bd(e) {
	let { el: t, props: n, images: r, moves: i, time: a, aspect: o, dpr: s } = e, c = Eo(n.rows), l = po(n.size, "band");
	t.style.setProperty("--urd-band-h", `${l}px`);
	let u = r.length || 8, d = Xu(l * o, s);
	for (let e = 0; e < c; e += 1) {
		let s = ud("div", "urd-gallery-band-row");
		i || s.classList.add("urd-ribbon-still");
		let c = ud("div", "urd-ribbon-track");
		n.direction === "right" != (e === 1) && c.classList.add("urd-ribbon-right"), c.style.setProperty("--urd-ribbon-ms", `${a * 1e3}ms`), e === 1 && (c.style.animationDelay = `-${(a / 3).toFixed(1)}s`);
		let l = (e) => {
			for (let t = 0; t < u; t += 1) {
				let n = ud("div", "urd-gallery-box urd-gallery-band-tile" + (r.length ? "" : " urd-gallery-frame-empty"));
				n.style.aspectRatio = String(o), md(n, r, r.length ? t : -1, d, t), e.appendChild(n);
			}
		}, f = ud("div", "urd-ribbon-run");
		l(f);
		let p = ud("div", "urd-ribbon-run");
		p.setAttribute("aria-hidden", "true"), l(p), c.append(f, p), s.appendChild(c), t.appendChild(s);
	}
}
function xd(e) {
	let { el: t, props: n, images: r, seed: i, dpr: a, motion: o, moves: s, time: c } = e, l = jo(n.count, i, r.length, n.repeat === !0);
	t.style.setProperty("--urd-mosaic-row", `${po(n.size, "mosaic")}px`);
	let u = Xu(po(n.size, "mosaic") * 2.2, a);
	_d(l.map((e, n) => {
		let i = ud("div", "urd-gallery-box urd-gallery-tile" + (r.length ? "" : " urd-gallery-frame-empty"));
		i.style.gridColumn = `span ${e.cols}`, i.style.gridRow = `span ${e.rows}`;
		let a = r.length ? n % r.length : -1, { face: l } = md(i, r, a, u, n);
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
var Sd = {
	fill: pd,
	floating: yd,
	band: bd,
	mosaic: xd
}, Cd = /* @__PURE__ */ R("<span class=\"toolbar-row\"><img class=\"site-icon-preview\" alt=\"\"/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/>", 1), wd = /* @__PURE__ */ R("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\" multiple=\"\"/></label> <!>", 1), Td = /* @__PURE__ */ R("<p> </p>"), Ed = /* @__PURE__ */ R("<label> <input type=\"text\" placeholder=\"https://drive.google.com/drive/folders/...\"/></label> <label> <!></label> <label> <input type=\"number\" min=\"1\" max=\"60\"/></label> <button type=\"button\" class=\"ghost action\"><!> </button> <!>", 1), Dd = /* @__PURE__ */ R("<label> <!></label> <!>", 1), Od = /* @__PURE__ */ R("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"6\" max=\"60\" step=\"1\"/>", 1), kd = /* @__PURE__ */ R("<label> <!></label> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\"/>", 1), Ad = /* @__PURE__ */ R("<button class=\"ghost row-tool\"></button>"), jd = /* @__PURE__ */ R("<span><span class=\"grad-grip\"><svg viewBox=\"0 0 16 16\" width=\"14\" height=\"14\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"13\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"13\" r=\"1.4\"></circle></svg></span> <!> <input type=\"range\" class=\"tb-grow\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value\"> </span> <!></span>"), Md = /* @__PURE__ */ R("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/>", 1), Nd = /* @__PURE__ */ R("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\"/>", 1), Pd = /* @__PURE__ */ R("<label> <!></label> <!> <button class=\"ghost action\"> </button> <!> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\"/> <label> <!></label>", 1), Fd = /* @__PURE__ */ R("<label> <!></label> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\"/>", 1), Id = /* @__PURE__ */ R("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/>", 1), Ld = /* @__PURE__ */ R("<label> <!></label> <label> <!></label> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" step=\"2\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"180\" step=\"5\"/> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), Rd = /* @__PURE__ */ R("<div class=\"sizefill\"><button type=\"button\" class=\"ghost\"> </button> <button type=\"button\" class=\"ghost\"> </button></div> <label> </label> <div class=\"focalpad\"><span class=\"focaldot\"></span></div> <label class=\"sub\"> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\"/> <label class=\"sub\"> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\"/>", 1), zd = /* @__PURE__ */ R("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\"/> <label> <!></label>", 1), Bd = /* @__PURE__ */ R("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <label> <!></label> <label> </label> <div class=\"sizestep\"><button type=\"button\">−</button> <input type=\"number\" min=\"10\" max=\"400\"/> <span class=\"sizeunit\">%</span> <button type=\"button\">+</button></div> <!> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\"/> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!>", 1), Vd = /* @__PURE__ */ R("<label> <!></label> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.5\" max=\"90\" step=\"0.5\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\"/>", 1), Hd = /* @__PURE__ */ R("<label> <!></label> <label> <!></label>", 1), Ud = /* @__PURE__ */ R("<button type=\"button\" class=\"ghost action\"><!> </button>"), Wd = /* @__PURE__ */ R("<label> <input type=\"number\" max=\"20\"/></label> <label> <!></label> <label> <!></label> <!>", 1), Gd = /* @__PURE__ */ R("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"15\" step=\"1\"/>", 1), Kd = /* @__PURE__ */ R("<label> <!></label>"), qd = /* @__PURE__ */ R("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"48\" step=\"1\"/>", 1), Jd = /* @__PURE__ */ R("<!> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"60\" max=\"400\" step=\"2\"/> <!> <label> <!></label> <label> <!></label> <!> <!>", 1), Yd = /* @__PURE__ */ R("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.5\" max=\"90\" step=\"0.5\"/>", 1), Xd = /* @__PURE__ */ R("<label><input type=\"checkbox\"/> </label>"), Zd = /* @__PURE__ */ R("<!> <!> <label> <!></label> <!> <label> <!></label> <!> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\"/>", 1), Qd = /* @__PURE__ */ R("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\"/>", 1), $d = /* @__PURE__ */ R("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"video/mp4,video/webm\"/></label> <label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <label> <!></label> <label class=\"sub\"> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label class=\"sub\"> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\"/> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!>", 1), ef = /* @__PURE__ */ R("<div class=\"bg-layer\"><span class=\"nav-line\"><!> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span> <!></div>"), tf = /* @__PURE__ */ R("<!> <label> <!></label> <button class=\"ghost action\"> </button>", 1);
function nf(e, t) {
	it(t, !0);
	let n = (e, t = f, n = f, r = f) => {
		var i = Yr(), a = M(i), o = (e) => {
			var i = wd(), a = M(i), o = j(a), s = P(o);
			D(a), ui(P(a, 2), 17, () => r().props.images ?? [], oi, (e, i, a) => {
				var o = Cd(), s = M(o), c = j(s), l = P(c, 2), u = j(l);
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
		var a = Dd(), o = M(a), s = j(o), c = P(s);
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
			let a = /* @__PURE__ */ O(() => Bu(I(i).folder ?? "")), o = /* @__PURE__ */ O(() => !I(a) || I(a).provider === "drive" || I(a).provider === "nextcloud");
			var s = Ed(), c = M(s), l = j(c), u = P(l);
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
				var r = Td();
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
		var i = Dd(), a = M(i), o = j(a), s = P(o);
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
			var i = Od(), a = M(i), o = j(a), s = N(P(o));
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
		let i = await ad(n.props.folder, n.props.order, { force: !0 });
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
	let De = (e) => (e.version ?? 1) < ld.version ? ld.migrations[1](e.props ?? {}) : e.props ?? {};
	var Oe = tf(), ke = M(Oe);
	ui(ke, 17, () => t.layers, oi, (e, a, o) => {
		var s = ef(), l = j(s), d = j(l);
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
			var n = kd(), r = M(n), i = j(r), s = P(i);
			{
				let e = /* @__PURE__ */ O(y), n = /* @__PURE__ */ O(() => K("tip.bg.layerColor"));
				Uc(s, {
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
			var i = Pd(), s = M(i), c = j(s), l = P(c);
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
				var s = jd();
				let c;
				var l = j(s), u = P(l, 2);
				{
					let e = /* @__PURE__ */ O(y), n = /* @__PURE__ */ O(() => K("tip.bg.stopColor"));
					Uc(u, {
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
					var n = Ad();
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
				var r = Md(), i = M(r), a = j(i), s = N(P(a));
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
				var r = Nd(), i = M(r), a = j(i), s = N(P(a));
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
			var n = Fd(), r = M(n), i = j(r), s = P(i);
			{
				let e = /* @__PURE__ */ O(y), n = /* @__PURE__ */ O(() => K("tip.bg.glowColor"));
				Uc(s, {
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
			var n = Id(), r = M(n), i = j(r), s = N(P(i));
			D(r);
			var c = P(r, 2);
			U(c), F((e, t) => {
				B(i, `${e ?? ""} `), B(s, `${t ?? ""}%`), W(c, I(a).props.opacity);
			}, [() => K("lbl.strength"), () => Math.round(I(a).props.opacity * 100)]), L("input", c, (e) => E(t.bg, o, "opacity", Number(e.target.value))), z(e, n);
		}, te = (e) => {
			var n = Ld(), r = M(n), i = j(r), s = P(i);
			{
				let e = /* @__PURE__ */ O(() => Gl(I(a).props.pattern)), n = /* @__PURE__ */ O(() => Vl.map((e) => [e, K(`opt.bgPattern.${e}`)]));
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
				Uc(u, {
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
				B(i, `${e ?? ""} `), B(l, `${t ?? ""} `), B(f, `${n ?? ""} `), B(p, `${I(a).props.size ?? Hl.dflt ?? ""} px`), G(m, "min", Hl.min), G(m, "max", Hl.max), W(m, I(a).props.size ?? Hl.dflt), B(g, `${r ?? ""} `), B(_, `${o ?? ""}%`), W(v, I(a).props.opacity ?? .12), B(x, `${s ?? ""} `), B(S, `${I(a).props.rotation ?? 0 ?? ""}°`), W(C, I(a).props.rotation ?? 0), G(w, "title", c), Vi(T, I(a).props.invert === !0), B(ee, ` ${u ?? ""}`);
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
			var r = Bd(), s = M(r), c = j(s), l = P(c);
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
				var n = Rd(), r = M(n), i = j(r), s = N(i, !0), c = P(i, 2), l = N(c, !0);
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
				var n = zd(), r = M(n), i = j(r), s = N(P(i));
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
			var d = Zd(), f = M(d);
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
				var n = Vd(), r = M(n), a = j(r), s = P(a);
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
				var n = Jd(), r = M(n), a = (e) => {
					var n = Hd(), r = M(n), a = j(r), s = P(a);
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
					var n = Wd(), r = M(n), a = j(r), c = P(a);
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
						var n = Ud(), r = j(n);
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
					var n = Gd(), r = M(n), a = j(r), s = N(P(a));
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
					var n = Kd(), r = j(n), a = P(r);
					{
						let e = /* @__PURE__ */ O(() => ho(I(i).look, I(i).frameColor)), n = /* @__PURE__ */ O(y), r = /* @__PURE__ */ O(() => K("tip.bg.frameColor"));
						Uc(a, {
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
					var n = qd(), r = M(n), a = j(r), s = N(P(a));
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
				var n = Kd(), r = j(n), i = P(r);
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
				var n = Yd(), r = M(n), a = j(r), s = N(P(a));
				D(r);
				var c = P(r, 2);
				U(c), F((e) => {
					B(a, `${e ?? ""} `), B(s, `${I(i).interval ?? 12 ?? ""} s`), W(c, I(i).interval ?? 12);
				}, [() => K("lbl.secondsPerImage")]), L("input", c, (e) => E(t.bg, o, "interval", Number(e.target.value))), z(e, n);
			}, ae = (e) => {
				var n = Yd(), r = M(n), a = j(r), s = N(P(a));
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
				var n = Xd();
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
			var n = $d(), r = M(n), i = j(r), s = P(i);
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
				var n = Qd(), r = M(n), i = j(r), s = N(P(i));
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
var rf = /* @__PURE__ */ R("<input/> <span class=\"toolbar-row\"><!> <input type=\"number\" class=\"tb-num\" min=\"8\" max=\"96\" placeholder=\"px\"/> <button><b> </b></button> <button><i> </i></button></span>", 1), af = /* @__PURE__ */ R("<img alt=\"\"/>"), of = /* @__PURE__ */ R("<span class=\"logo-file\"> </span>"), sf = /* @__PURE__ */ R("<div class=\"logo-pick\"><span class=\"logo-thumb\"><!></span> <span class=\"logo-pick-col\"><label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <!></span></div> <div class=\"ctl-triple\"><div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\" min=\"12\" max=\"128\"/></div> <div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\"/></div> <div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\" min=\"0\" max=\"64\"/></div></div>", 1), cf = /* @__PURE__ */ R("<button type=\"button\"><!><span> </span></button>"), lf = /* @__PURE__ */ R("<span class=\"toolbar-row\"><span class=\"mini-label tb-grow\"> </span> <input type=\"number\" class=\"tb-num\" placeholder=\"1100\"/></span>"), uf = /* @__PURE__ */ R("<!> <!> <span class=\"toolbar-row\"><span class=\"mini-label tb-grow\"> </span> <input type=\"number\" class=\"tb-num\"/></span>", 1), df = /* @__PURE__ */ R("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), ff = /* @__PURE__ */ R("<!> <span class=\"toolbar-row\"><span class=\"mini-label tb-grow\"> </span> <input type=\"number\" class=\"tb-num\"/></span>", 1), pf = /* @__PURE__ */ R("<button> </button>"), mf = /* @__PURE__ */ R("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\"/> <input type=\"number\" class=\"tb-num\"/></div>"), hf = /* @__PURE__ */ R("<div class=\"ctl-pair\"><div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\"/></div> <div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\"/></div></div>"), gf = /* @__PURE__ */ R("<span class=\"toolbar-row ctl-end\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\" min=\"1\" max=\"8\"/> <span class=\"mini-label\"> </span> <!></span>"), _f = /* @__PURE__ */ R("<div class=\"ctl-field\"><span class=\"mini-label\"> </span> <div class=\"tile-grid cols-5\" role=\"group\"></div></div> <!>", 1), vf = /* @__PURE__ */ R("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), yf = /* @__PURE__ */ R("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"30\" max=\"80\" step=\"5\"/> <span class=\"gridmenu-value\"> </span></div> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"0\" max=\"400\" step=\"10\"/> <span class=\"gridmenu-value\"> </span></div> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"0\" max=\"1200\" step=\"20\"/> <span class=\"gridmenu-value\"> </span></div> <!>", 1), bf = /* @__PURE__ */ R("<!> <!>", 1), xf = /* @__PURE__ */ R("<div class=\"mini-card\"><span class=\"mini-label\"> </span> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label></div>"), Sf = /* @__PURE__ */ R("<div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\"/></div>"), Cf = /* @__PURE__ */ R("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label>"), wf = /* @__PURE__ */ R("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <!> <!> <!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <!> <input type=\"range\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label> <!></label>", 1), Tf = /* @__PURE__ */ R("<button type=\"button\"><span> </span><span> </span></button>"), Ef = /* @__PURE__ */ R("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\"/> <span class=\"gridmenu-value\"> </span></div>"), Df = /* @__PURE__ */ R("<div class=\"swatch-cell\"><!> <span class=\"mini-label\"> </span></div>"), Of = /* @__PURE__ */ R("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <input type=\"text\" class=\"field-filled\" placeholder=\"https://\"/></label>"), kf = /* @__PURE__ */ R("<button class=\"ghost\"> </button>"), Af = /* @__PURE__ */ R("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <input type=\"text\" class=\"field-filled\"/></label> <label> <!></label> <!> <!> <!> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <label> <!></label> <label> <!></label>", 1), jf = /* @__PURE__ */ R("<span class=\"tool-move\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span>"), Mf = /* @__PURE__ */ R("<div class=\"mini-card\"><span class=\"tool-head\"><span class=\"mini-label\"> </span><!></span> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label></div>"), Nf = /* @__PURE__ */ R("<div class=\"mini-card\"><span class=\"tool-head\"><span class=\"mini-label\"> </span><!></span> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div>"), Pf = /* @__PURE__ */ R("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <input type=\"text\" class=\"field-filled\"/></label>"), Ff = /* @__PURE__ */ R("<span class=\"lrow-warn\"></span>"), If = /* @__PURE__ */ R("<span class=\"lrow-tile-mark\"><!></span> <span class=\"lrow-tile-name\"> </span>", 1), Lf = /* @__PURE__ */ R("<span class=\"bad-target-note\"> </span>"), Rf = /* @__PURE__ */ R("<div class=\"lrow-body\"><!> <div class=\"lrow-fields\"><input class=\"field-filled\"/> <input/> <!> <span class=\"lrow-actions\"><!> <button class=\"linkish danger\"> </button></span></div></div>"), zf = /* @__PURE__ */ R("<div><div class=\"lrow-head\" role=\"button\" tabindex=\"0\"><span class=\"lrow-mark\" aria-hidden=\"true\"><!></span> <span class=\"lrow-name\"> </span> <!> <span class=\"row-tools\" role=\"none\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span> <span class=\"lrow-chev\" aria-hidden=\"true\"></span></div> <!></div>"), Bf = /* @__PURE__ */ R("<div class=\"ctl-field\"><span class=\"mini-label\"> </span> <div class=\"tile-grid cols-3\" role=\"group\"></div></div> <!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"1\" max=\"24\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <div class=\"mini-card\"><span class=\"mini-label\"> </span> <span class=\"lbtn-pick\"><!> <span class=\"lbtn-name\"><!></span></span></div> <!> <button class=\"ghost action\"> </button>", 1), Vf = /* @__PURE__ */ R("<details class=\"group sub-fold\"><summary><span class=\"tool-head\"> <!></span></summary> <div class=\"group-items\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div></details>"), Hf = /* @__PURE__ */ R("<label> <!></label>"), Uf = /* @__PURE__ */ R("<div aria-hidden=\"true\"><span class=\"nav-grip\"></span> <div class=\"nav-item-main\"><span class=\"nav-item-name ghost-name\"> </span> <span class=\"ghost-target\"> </span></div></div>"), Wf = /* @__PURE__ */ R("<input class=\"nav-item-href\"/>"), Gf = /* @__PURE__ */ R("<span class=\"nav-item-sub\"></span>"), Kf = /* @__PURE__ */ R("<!> <div><span class=\"nav-grip\" draggable=\"true\"></span> <div class=\"nav-item-main\"><input class=\"nav-item-name\"/> <div class=\"nav-item-target\"><!> <!></div></div> <span class=\"nav-actions\"><button class=\"ghost nav-act\"></button> <button class=\"ghost nav-act\"></button> <button class=\"ghost nav-act\"></button></span> <button class=\"ghost row-tool nav-more\"></button></div> <!>", 1), qf = /* @__PURE__ */ R("<!> <div><span class=\"nav-grip\" draggable=\"true\"></span> <div class=\"nav-item-main\"><input class=\"nav-item-name\"/> <div class=\"nav-item-target\"><!> <!></div></div> <!> <span class=\"nav-actions\"><button class=\"ghost nav-act\"></button> <button class=\"ghost nav-act\"></button> <button class=\"ghost nav-act\"></button> <button class=\"ghost nav-act\"></button></span> <button class=\"ghost row-tool nav-more\"></button></div> <!> <!> <!>", 1), Jf = /* @__PURE__ */ R("<div class=\"panel-body\"><details class=\"group\"><summary> </summary> <div class=\"group-items\"><!> <!> <!> <!></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><div class=\"ctl-field\"><span class=\"mini-label\"> </span> <div class=\"tile-grid cols-3\" role=\"group\"></div></div> <!> <!> <!> <!> <!></div></details> <hr class=\"gridmenu-divider\"/> <details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><div class=\"seg cw-seg\"></div> <details class=\"sub-inset\"><summary> </summary> <div class=\"sub-inset-body\"><!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\"/> <input type=\"number\" class=\"tb-num\"/></div> <!></div></details></div></details> <hr class=\"gridmenu-divider\"/> <details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><!> <!></div></details> <hr class=\"gridmenu-divider\"/> <details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><!></div></details> <hr class=\"gridmenu-divider\"/> <details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><div class=\"ctl-pair\"><!> <div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\"/></div></div> <div class=\"ctl-pair\"><label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label></div> <div class=\"ctl-pair\"><label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <!></div> <div class=\"ctl-pair\"><label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label></div> <!> <div class=\"ctl-pair\"><label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <!></div> <!> <!></div></details> <hr class=\"gridmenu-divider\"/> <details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><div class=\"ctl-field\"><span class=\"mini-label\"> </span> <div class=\"tile-grid cols-5\" role=\"group\"></div></div> <!> <div class=\"swatch-row\"><!> <div class=\"swatch-cell\"><!> <span class=\"mini-label\"> </span></div> <div class=\"swatch-cell\"><!> <span class=\"mini-label\"> </span></div></div> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label></div></details> <hr class=\"gridmenu-divider\"/> <details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><!></div></details></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><!>  <!></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><div class=\"ctl-field\"><span class=\"mini-label\"> </span> <div role=\"group\"></div></div> <!> <!> <label> <input type=\"number\" min=\"1\" max=\"4\"/></label></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><div class=\"nav-list\" role=\"list\"></div> <button class=\"ghost action\"> </button> <span class=\"toolbar-row\"><input class=\"tb-grow\"/> <button class=\"ghost action\"> </button></span></div></details></div>");
function Yf(e, t) {
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
	let T = (e) => e !== "theme" || !!I(r).theme?.alt?.tokens, E = /* @__PURE__ */ O(() => Bl(I(r)?.nav?.style ?? {}).filter(T));
	function ee(e, t) {
		let n = Bl(I(r).nav.style ?? {}), i = n.indexOf(e), a = i + t;
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
	].includes(I(r)?.nav?.variant)), ae = /* @__PURE__ */ O(() => Ol(I(r)?.nav?.style)), oe = /* @__PURE__ */ O(() => El(I(r)?.nav?.style, I(r)?.nav?.variant)), se = /* @__PURE__ */ O(() => Dl(I(r)?.nav?.style));
	function ce(e) {
		l("nav", () => {
			I(r).nav.style ??= {}, e === "md" ? delete I(r).nav.style.size : I(r).nav.style.size = e, delete I(r).nav.style.padY, delete I(r).nav.style.textSize;
		});
	}
	function le(e, t, n) {
		let i = e.target.value;
		ne(t, i === "" ? void 0 : Tl(i, n, void 0)), e.target.value = I(r).nav.style?.[t] ?? "";
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
		ne(t, r === "" ? void 0 : Tl(r, n, void 0)), e.target.value = I(t === "padY" ? oe : se);
	}
	function De(e, t, n) {
		let i = e.target.value;
		ue(t, i === "" ? void 0 : Tl(i, n, void 0)), e.target.value = I(r).nav.style?.mobile?.[t] ?? "";
	}
	function Oe(e) {
		let t = Tl(e / 100, hl, .5);
		ne("shrinkTo", t === .5 ? void 0 : t);
	}
	function Ae(e) {
		let t = Tl(e, gl, 80);
		ne("shrinkAt", t === 80 ? void 0 : t);
	}
	function je(e) {
		let t = Tl(e, _l, 220);
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
	var pt = Jf(), mt = j(pt), ht = j(mt), gt = N(ht, !0), _t = P(ht, 2), vt = j(_t);
	{
		let e = /* @__PURE__ */ O(() => K("common.type")), t = /* @__PURE__ */ O(() => I(r).nav.logo?.type ?? "text"), n = /* @__PURE__ */ O(() => [
			["text", K("blocks.text")],
			["image", K("blocks.image")],
			["both", K("opt.logo.both")]
		]);
		jl(vt, {
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
		var t = rf(), n = M(t);
		U(n);
		var i = P(n, 2), a = j(i);
		{
			let e = /* @__PURE__ */ O(() => K("tip.nav.logoFont")), t = /* @__PURE__ */ O(() => I(r).nav.logo?.font ?? ""), n = /* @__PURE__ */ O(() => [["", K("common.inherit")], ...Ml.map(([e, t]) => [t, K(e)])]);
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
		var n = sf(), i = M(n), a = j(i), o = j(a), s = (e) => {
			var n = af();
			F(() => G(n, "src", I(t))), z(e, n);
		};
		V(o, (e) => {
			I(t) && e(s);
		}), D(a);
		var c = P(a, 2), l = j(c), u = j(l), d = P(u);
		D(l);
		var f = P(l, 2), p = (e) => {
			var n = of(), r = N(n, !0);
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
			G(l, "title", e), B(u, `${t ?? ""} `), G(h, "title", n), B(_, i), W(v, I(r).nav.logo?.size ?? 32), G(y, "title", a), B(S, o), G(w, "min", bl.min), G(w, "max", bl.max), G(w, "placeholder", s), W(w, I(r).nav.logo?.mobileSize ?? ""), G(T, "title", c), B(ee, d), W(te, I(r).nav.logo?.radius ?? 0);
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
			x({ mobileSize: t === "" ? void 0 : Tl(t, bl, void 0) }), e.target.value = I(r).nav.logo?.mobileSize ?? "";
		}), L("change", te, (e) => x({ radius: Number(e.target.value) })), z(e, n);
	};
	V(xt, (e) => {
		(I(r).nav.logo?.type ?? "text") !== "text" && e(St);
	});
	var Ct = P(xt, 2), wt = (e) => {
		{
			let t = /* @__PURE__ */ O(() => K("lbl.order")), n = /* @__PURE__ */ O(() => I(r).nav.logo?.order ?? "image-first"), i = /* @__PURE__ */ O(() => [["image-first", K("opt.logo.imageFirst")], ["text-first", K("opt.logo.textFirst")]]);
			jl(e, {
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
		var o = cf();
		let s;
		var c = j(o);
		H(c, () => p[i()]);
		var l = N(P(c), !0);
		D(o), F(() => {
			s = Pi(o, 1, "tile", null, s, { on: (I(r).nav.variant ?? "bar") === i() }), G(o, "aria-pressed", (I(r).nav.variant ?? "bar") === i()), B(l, a());
		}), L("click", o, () => Ie(i())), z(e, o);
	}), D(It), D(Nt);
	var Lt = P(Nt, 2), Rt = (e) => {
		var t = uf(), n = M(t);
		{
			let e = /* @__PURE__ */ O(() => K("lbl.navPillWidth")), t = /* @__PURE__ */ O(() => K("tip.nav.pillWidth")), i = /* @__PURE__ */ O(() => I(r).nav.style?.pillWidth === "content" ? "content" : "custom"), a = /* @__PURE__ */ O(() => [["content", K("opt.pillWidth.content")], ["custom", K("opt.pillWidth.custom")]]);
			jl(n, {
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
			var t = lf(), n = j(t), i = N(n, !0), a = P(n, 2);
			U(a), D(t), F((e, n) => {
				G(t, "title", e), B(i, n), G(a, "min", ml.min), G(a, "max", ml.max), G(a, "step", ml.step), W(a, typeof I(r).nav.style?.pillWidth == "number" ? I(r).nav.style.pillWidth : "");
			}, [() => K("tip.nav.pillWidthPx"), () => K("lbl.navPillWidthPx")]), L("change", a, (e) => le(e, "pillWidth", ml)), z(e, t);
		};
		V(i, (e) => {
			I(r).nav.style?.pillWidth !== "content" && e(a);
		});
		var o = P(i, 2), s = j(o), c = N(s, !0), l = P(s, 2);
		U(l), D(o), F((e, t) => {
			G(o, "title", e), B(c, t), G(l, "min", vl.min), G(l, "max", vl.max), G(l, "step", vl.step), G(l, "placeholder", I(r).nav.variant === "floating-square" ? "0" : ""), W(l, typeof I(r).nav.style?.radius == "number" ? I(r).nav.style.radius : "");
		}, [() => K("tip.nav.radius"), () => K("lbl.navRadius")]), L("change", l, (e) => le(e, "radius", vl)), z(e, t);
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
			jl(e, {
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
			jl(e, {
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
		var t = df(), n = M(t), i = j(n);
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
		var t = df(), n = M(t), i = j(n);
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
		var t = ff(), n = M(t);
		{
			let e = /* @__PURE__ */ O(() => K("lbl.textAlign")), t = /* @__PURE__ */ O(() => K("tip.nav.sideAlign")), i = /* @__PURE__ */ O(() => I(r).nav.style?.sideAlign ?? "left"), a = /* @__PURE__ */ O(() => [
				["left", K("common.left")],
				["center", K("common.center")],
				["right", K("common.right")]
			]);
			jl(n, {
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
			G(i, "title", e), B(o, t), G(s, "min", yl.min), G(s, "max", yl.max), W(s, I(r).nav.style?.width ?? 250);
		}, [() => K("tip.nav.colWidth"), () => K("lbl.navColWidth")]), L("change", s, (e) => {
			let t = Tl(e.target.value, yl, 250);
			ne("width", t === 250 ? void 0 : t), e.target.value = I(r).nav.style?.width ?? 250;
		}), z(e, t);
	};
	V(Kt, (e) => {
		I(re) && e(qt);
	}), D(Mt), D(kt);
	var Jt = P(kt, 4), Yt = j(Jt), Xt = N(Yt, !0), Zt = P(Yt, 2), Qt = j(Zt);
	ui(Qt, 20, () => Sl, (e) => e, (e, t) => {
		var n = pf();
		let r;
		var i = N(n, !0);
		F((e) => {
			r = Pi(n, 1, "", null, r, { on: I(ae) === t }), B(i, e);
		}, [() => K(`opt.size.${t}`)]), L("click", n, () => ce(t)), z(e, n);
	}), D(Qt);
	var $t = P(Qt, 2), en = j($t), tn = N(en, !0), nn = P(en, 2), rn = j(nn), an = (e) => {
		var t = mf(), n = j(t), r = N(n, !0), i = P(n, 2);
		U(i);
		var a = P(i, 2);
		U(a), D(t), F((e, n) => {
			G(t, "title", e), B(r, n), G(i, "min", ul.min), G(i, "max", ul.max), G(i, "step", ul.step), W(i, I(oe)), G(a, "min", ul.min), G(a, "max", ul.max), W(a, I(oe));
		}, [() => K("tip.nav.thickness"), () => K("lbl.navThickness")]), L("input", i, (e) => ne("padY", e.target.valueAsNumber)), L("change", a, (e) => Ee(e, "padY", ul)), z(e, t);
	};
	V(rn, (e) => {
		I(re) || e(an);
	});
	var on = P(rn, 2), sn = j(on), cn = N(sn, !0), ln = P(sn, 2);
	U(ln);
	var un = P(ln, 2);
	U(un), D(on);
	var dn = P(on, 2), fn = (e) => {
		var t = hf(), n = j(t), i = j(n), a = N(i, !0), o = P(i, 2);
		U(o), D(n);
		var s = P(n, 2), c = j(s), l = N(c, !0), u = P(c, 2);
		U(u), D(s), D(t), F((e, t, i, c, d, f) => {
			G(n, "title", e), B(a, t), G(o, "min", fl.min), G(o, "max", fl.max), G(o, "placeholder", i), W(o, I(r).nav.style?.padX ?? ""), G(s, "title", c), B(l, d), G(u, "min", pl.min), G(u, "max", pl.max), G(u, "placeholder", f), W(u, I(r).nav.style?.gap ?? "");
		}, [
			() => K("tip.nav.padX"),
			() => K("lbl.navPadX"),
			() => K("common.auto"),
			() => K("tip.nav.gap"),
			() => K("lbl.navGap"),
			() => K("common.auto")
		]), L("change", o, (e) => le(e, "padX", fl)), L("change", u, (e) => le(e, "gap", pl)), z(e, t);
	};
	V(dn, (e) => {
		I(re) || e(fn);
	}), D(nn), D($t), D(Zt), D(Jt);
	var pn = P(Jt, 4), mn = j(pn), hn = N(mn, !0), gn = P(mn, 2), _n = j(gn), vn = (e) => {
		var t = _f(), n = M(t), i = j(n), a = N(i, !0), o = P(i, 2);
		ui(o, 21, () => [
			["", K("common.none")],
			["bottom", K("opt.navBorder.bottom")],
			["top", K("opt.navBorder.top")],
			["both", K("opt.navBorder.both")],
			["all", K("opt.navBorder.all")]
		], ([e, t]) => e, (e, t) => {
			var n = /* @__PURE__ */ O(() => g(I(t), 2));
			let i = () => I(n)[0], a = () => I(n)[1];
			var o = cf();
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
			var t = gf(), n = j(t), i = N(n, !0), a = P(n, 2);
			U(a);
			var o = P(a, 2), s = N(o, !0), c = P(o, 2);
			{
				let e = /* @__PURE__ */ O(() => I(r).nav.style.border.color ?? "text"), t = /* @__PURE__ */ O(u), n = /* @__PURE__ */ O(() => K("tip.nav.borderColorPick"));
				Uc(c, {
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
				let t = Tl(e.target.value, {
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
			jl(e, {
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
		var t = xf(), n = j(t), i = N(n, !0), a = P(n, 2), o = j(a);
		U(o);
		var s = P(o);
		D(a);
		var c = P(a, 2), u = (e) => {
			var t = bf(), n = M(t);
			{
				let e = /* @__PURE__ */ O(() => K("lbl.navScroll")), t = /* @__PURE__ */ O(() => K("tip.nav.scroll")), i = /* @__PURE__ */ O(() => I(r).nav.scroll ?? "none"), a = /* @__PURE__ */ O(() => [
					["none", K("opt.scroll.none")],
					["shrink", K("opt.scroll.shrink")],
					["hide", K("opt.scroll.hide")]
				]);
				jl(n, {
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
				var t = yf(), n = M(t), i = j(n), a = N(i, !0), o = P(i, 2);
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
					var t = vf(), n = j(t);
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
		var t = Sf(), n = j(t), i = N(n, !0), a = P(n, 2);
		U(a), D(t), F((e, n, o) => {
			G(t, "title", e), B(i, n), G(a, "min", ul.min), G(a, "max", ul.max), G(a, "placeholder", o), W(a, I(r).nav.style?.mobile?.padY ?? "");
		}, [
			() => K("tip.nav.thickness"),
			() => K("lbl.navThickness"),
			() => K("lbl.navSameAsDesktop")
		]), L("change", a, (e) => De(e, "padY", ul)), z(e, t);
	};
	V(Mn, (e) => {
		I(re) || e(Pn);
	});
	var Fn = P(Mn, 2), In = j(Fn), Ln = N(In, !0), Rn = P(In, 2);
	U(Rn), D(Fn), D(jn);
	var zn = P(jn, 2), Bn = j(zn), Vn = j(Bn), Hn = N(Vn, !0), Un = P(Vn, 2);
	{
		let e = /* @__PURE__ */ O(() => I(r).nav.style?.mobile?.size ?? ""), t = /* @__PURE__ */ O(() => [["", K("lbl.navSameAsDesktop")], ...Sl.map((e) => [e, K(`opt.size.${e}`)])]);
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
		var t = Cf(), n = j(t), r = N(n, !0), i = P(n, 2);
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
		var t = gf(), n = j(t), i = N(n, !0), a = P(n, 2);
		U(a);
		var o = P(a, 2), s = N(o, !0), c = P(o, 2);
		{
			let e = /* @__PURE__ */ O(() => I(r).nav.style.mobile.border.color ?? "text"), t = /* @__PURE__ */ O(u), n = /* @__PURE__ */ O(() => K("tip.nav.borderColorPick"));
			Uc(c, {
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
			let t = Tl(e.target.value, {
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
		var t = Cf(), n = j(t), i = N(n, !0), a = P(n, 2);
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
		var t = wf(), n = M(t), i = j(n);
		U(i);
		var a = P(i);
		D(n);
		var o = P(n, 2), s = (e) => {
			var t = vf(), n = j(t);
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
			var t = vf(), n = j(t);
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
			var t = vf(), n = j(t);
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
			var t = vf(), n = j(t);
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
			Uc(v, {
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
			Uc(E, {
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
		var t = Cf(), n = j(t), i = N(n, !0), a = P(n, 2);
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
		var o = Tf();
		let s;
		var c = j(o), l = N(c, !0), u = N(P(c), !0);
		D(o), F((e) => {
			s = Pi(o, 1, "tile hover-tile", null, s, { on: (I(r).nav.style?.hover ?? "standard") === i() }), G(o, "aria-pressed", (I(r).nav.style?.hover ?? "standard") === i()), Pi(c, 1, `hover-sample hover-${i() ?? ""}`), B(l, e), B(u, a());
		}, [() => K("seed.home")]), L("click", o, () => ze(i())), z(e, o);
	}), D(Dr), D(wr);
	var Or = P(wr, 2), kr = (e) => {
		var t = Ef(), n = j(t), i = N(n, !0), a = P(n, 2);
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
		var t = Df(), n = j(t);
		{
			let e = /* @__PURE__ */ O(() => I(r).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ O(u);
			Uc(n, {
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
		Uc(Pr, {
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
		Uc(Lr, {
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
		nf(qr, {
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
		var t = Af(), n = M(t), a = j(n), o = N(a, !0), s = P(a, 2);
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
			var t = Of(), n = j(t), i = N(n, !0), a = P(n, 2);
			U(a), D(t), F((e, n) => {
				G(t, "title", e), B(i, n), W(a, I(r).nav.announcement?.href ?? "");
			}, [() => K("tip.nav.announceHref"), () => K("lbl.announceHref")]), L("change", a, (e) => me("href", e.target.value.trim())), z(e, t);
		};
		V(p, (e) => {
			I(r).nav.announcement?.href !== void 0 && !I(r).nav.announcement?.page && e(m);
		});
		var h = P(p, 2), g = (e) => {
			var t = vf(), n = j(t);
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
			var t = vf(), n = j(t);
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
				jl(e, {
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
			var t = kf(), n = N(t, !0);
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
			Uc(te, {
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
			Uc(oe, {
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
			var r = jf(), i = j(r);
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
			var t = bf(), n = M(t);
			{
				let e = /* @__PURE__ */ O(() => K("lbl.toolsSide")), t = /* @__PURE__ */ O(() => K("tip.nav.toolsSideColumn")), i = /* @__PURE__ */ O(() => I(r).nav.style?.tools?.side ?? "end"), a = /* @__PURE__ */ O(() => [["start", K("opt.toolsSide.top")], ["end", K("opt.toolsSide.bottom")]]);
				jl(n, {
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
				jl(i, {
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
				jl(e, {
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
		}), ui(P(li, 2), 18, () => I(E), (e) => e, (t, n, i) => {
			var a = Yr(), o = M(a), s = (t) => {
				var a = Yr(), o = M(a), s = (t) => {
					var a = Mf(), o = j(a), s = j(o), c = N(s, !0), l = P(s);
					e(l, () => n, () => I(i)), D(o);
					var u = P(o, 2), d = j(u);
					U(d);
					var f = P(d);
					D(u), D(a), F((e, t, n) => {
						B(c, e), G(u, "title", t), Vi(d, I(r).nav.style?.tools?.theme !== !1), B(f, ` ${n ?? ""}`);
					}, [
						() => K("lbl.themeToggle"),
						() => K("tip.nav.themeToggle"),
						() => K("lbl.showInMenu")
					]), L("change", d, (e) => te("theme", e.target.checked ? void 0 : !1)), z(t, a);
				};
				V(o, (e) => {
					I(r).theme?.alt?.tokens && e(s);
				}), z(t, a);
			}, c = (t) => {
				var a = Nf(), o = j(a), s = j(o), c = N(s, !0), u = P(s);
				e(u, () => n, () => I(i)), D(o);
				var d = P(o, 2), f = j(d);
				U(f);
				var p = P(f);
				D(d);
				var m = P(d, 2), h = (e) => {
					var t = Cf(), n = j(t), i = N(n, !0), a = P(n, 2);
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
				}), D(a), F((e, t, n) => {
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
				})), z(t, a);
			}, u = (t) => {
				var a = Vf(), o = j(a), s = j(o), c = j(s, !0), l = P(c);
				e(l, () => n, () => I(i)), D(s), D(o);
				var u = P(o, 2), d = j(u), f = j(d);
				U(f);
				var p = P(f);
				D(d);
				var m = P(d, 2), h = (e) => {
					var t = Bf(), n = M(t), i = j(n), a = N(i, !0), o = P(i, 2);
					ui(o, 21, () => I(Pe), ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ O(() => g(I(t), 2));
						let i = () => I(n)[0], a = () => I(n)[1];
						var o = cf();
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
						jl(s, {
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
						var t = Pf(), n = j(t), i = N(n, !0), a = P(n, 2);
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
						ll(w, {
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
									var t = af();
									F(() => G(t, "src", I(r).nav.launcher.image)), z(e, t);
								}, o = (e) => {
									var t = Yr();
									H(M(t), () => Jc(I(r).nav.launcher.icon) || ""), z(e, t);
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
						F((e) => B(t, e), [() => K(Kc[I(r).nav.launcher.icon]?.labelKey ?? "common.none")]), z(e, t);
					}, ne = (e) => {
						var t = Jr();
						F((e) => B(t, e), [() => K("opt.launcherDots")]), z(e, t);
					};
					V(E, (e) => {
						I(r).nav.launcher?.image ? e(ee) : I(r).nav.launcher?.icon ? e(te, 1) : e(ne, -1);
					}), D(T), D(C), D(b);
					var re = P(b, 2);
					ui(re, 17, () => I(r).nav.launcher?.links ?? [], oi, (e, t, n) => {
						let i = /* @__PURE__ */ O(() => !Rl(I(t).href ?? ""));
						var a = zf();
						let o;
						var s = j(a), c = j(s), l = j(c), u = (e) => {
							var n = af();
							F(() => G(n, "src", I(t).image)), z(e, n);
						}, d = (e) => {
							var n = Yr();
							H(M(n), () => Jc(I(t).icon) || ""), z(e, n);
						};
						V(l, (e) => {
							I(t).image ? e(u) : e(d, -1);
						}), D(c);
						var f = P(c, 2), p = N(f, !0), m = P(f, 2), h = (e) => {
							var t = Ff();
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
							var r = Rf(), a = j(r);
							{
								let e = /* @__PURE__ */ O(() => I(t).icon ?? ""), r = /* @__PURE__ */ O(() => I(t).image ?? ""), i = /* @__PURE__ */ O(_e), o = /* @__PURE__ */ O(() => K("mp.pickMark"));
								ll(a, {
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
										var r = If(), i = M(r), a = j(i), o = (e) => {
											var n = af();
											F(() => G(n, "src", I(t).image)), z(e, n);
										}, s = (e) => {
											var n = Yr();
											H(M(n), () => Jc(I(t).icon) || ""), z(e, n);
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
								var t = Lf(), n = N(t, !0);
								F((e) => B(n, e), [() => K("ui.badTarget")]), z(e, t);
							};
							V(u, (e) => {
								I(i) && e(d);
							});
							var f = P(u, 2), p = j(f);
							{
								let e = /* @__PURE__ */ O(() => I(t).icon ?? ""), r = /* @__PURE__ */ O(() => I(t).image ?? ""), i = /* @__PURE__ */ O(_e), a = /* @__PURE__ */ O(() => K("mp.pickMark"));
								ll(p, {
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
				}), D(u), D(a), F((e, t, n, i) => {
					G(o, "title", e), B(c, t), G(d, "title", n), Vi(f, I(r).nav.launcher?.show === !0), B(p, ` ${i ?? ""}`);
				}, [
					() => K("tip.nav.launcher"),
					() => K("group.launcher"),
					() => K("tip.nav.launcher"),
					() => K("lbl.showInMenu")
				]), L("change", f, (e) => ye("show", e.target.checked ? !0 : void 0)), z(t, a);
			};
			V(o, (e) => {
				n === "theme" ? e(s) : n === "cart" ? e(c, 1) : e(u, -1);
			}), z(t, a);
		}), D(ci);
	}
	D(ii);
	var pi = P(ii, 2), mi = j(pi), hi = N(mi, !0), gi = P(mi, 2), _i = j(gi), vi = j(_i), yi = N(vi, !0), bi = P(vi, 2);
	let xi;
	ui(bi, 21, () => I(Fe), ([e, t]) => e, (e, t) => {
		var n = /* @__PURE__ */ O(() => g(I(t), 2));
		let i = () => I(n)[0], a = () => I(n)[1];
		var o = cf();
		let s;
		var c = j(o);
		H(c, () => _[i()]);
		var l = N(P(c), !0);
		D(o), F(() => {
			s = Pi(o, 1, "tile", null, s, { on: (I(r).nav.style?.subStyle ?? "card") === i() }), G(o, "aria-pressed", (I(r).nav.style?.subStyle ?? "card") === i()), B(l, a());
		}), L("click", o, () => ne("subStyle", i() === "card" ? void 0 : i())), z(e, o);
	}), D(bi), D(_i);
	var Si = P(_i, 2), Ci = (e) => {
		var t = bf(), n = M(t), i = (e) => {
			var t = bf(), n = M(t);
			{
				let e = /* @__PURE__ */ O(() => K("lbl.sideSubs")), t = /* @__PURE__ */ O(() => K("tip.nav.sideSubs")), i = /* @__PURE__ */ O(() => I(r).nav.style?.sideSubs ?? "collapsed"), a = /* @__PURE__ */ O(() => [["collapsed", K("opt.mobileSubs.collapsed")], ["expanded", K("opt.mobileSubs.expanded")]]);
				jl(n, {
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
				var t = vf(), n = j(t);
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
				jl(e, {
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
		var t = Hf(), n = j(t), i = P(n);
		{
			let e = /* @__PURE__ */ O(() => I(r).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ O(u), n = /* @__PURE__ */ O(() => K("tip.nav.subPillColorPick"));
			Uc(i, {
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
			var r = Uf();
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
			var o = qf(), s = M(o), c = (t) => {
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
				var t = Wf();
				U(t), F((e, r) => {
					W(t, I(n).href), G(t, "placeholder", e), G(t, "title", r);
				}, [() => K("ph.hrefAnchor"), () => K("tip.hrefAnchor")]), L("change", t, (e) => He(i, e.target.value)), z(e, t);
			};
			V(g, (e) => {
				!I(n).page && I(n).href != null && e(_);
			}), D(m), D(f);
			var v = P(f, 2), y = (e) => {
				var t = Gf();
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
				var c = Kf(), l = M(c), u = (t) => {
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
					var t = Wf();
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
		G(ht, "title", e), B(gt, t), B(Dt, n), B(jt, i), G(Nt, "title", a), B(Ft, o), G(It, "aria-label", s), G(Yt, "title", c), B(Xt, l), G(Qt, "title", u), B(tn, d), G(on, "title", f), B(cn, p), G(ln, "min", dl.min), G(ln, "max", dl.max), G(ln, "step", dl.step), W(ln, I(se)), G(un, "min", dl.min), G(un, "max", dl.max), W(un, I(se)), B(hn, m), B(Cn, h), G(On, "title", g), B(kn, _), G(Fn, "title", v), B(Ln, y), G(Rn, "min", dl.min), G(Rn, "max", dl.max), G(Rn, "placeholder", b), W(Rn, I(r).nav.style?.mobile?.textSize ?? ""), G(Bn, "title", x), B(Hn, S), G(Wn, "title", C), B(Kn, w), G(Yn, "title", T), B(Zn, E), G(nr, "title", ee), B(ir, te), G(lr, "title", ne), B(dr, ie), B(Sr, ae), B(Er, oe), G(Dr, "aria-label", ce), G(Nr, "title", le), B(Fr, ue), G(Ir, "title", de), B(Rr, fe), G(Br, "title", pe), Vi(Vr, I(r).nav.style?.blur !== !1), B(Hr, ` ${me ?? ""}`), B(Gr, he), G(Xr, "title", ge), B(Zr, _e), G($r, "title", ve), Vi(ei, I(r).nav.announcement?.show === !0), B(ti, ` ${ye ?? ""}`), G(ai, "title", be), B(si, xe), B(hi, Se), B(yi, Ce), xi = Pi(bi, 1, "tile-grid", null, xi, {
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
	]), L("input", ln, (e) => ne("textSize", e.target.valueAsNumber)), L("change", un, (e) => Ee(e, "textSize", dl)), L("change", Rn, (e) => De(e, "textSize", dl)), L("change", Vr, (e) => ne("blur", e.target.checked)), L("change", ei, (e) => me("show", e.target.checked ? !0 : void 0)), L("change", ki, (e) => ne("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), z(e, pt), at();
}
Br([
	"input",
	"change",
	"click",
	"keydown"
]);
var Xf = 1920, Zf = [
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
], Qf = [
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
], $f = [
	1920,
	1536,
	1366
];
function ep(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 1440;
	let n = Math.round(t / 20) * 20;
	return Math.min(Xf, Math.max(960, n));
}
function tp(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 6;
	let n = Math.round(t / 1) * 1;
	return Math.min(12, Math.max(0, n));
}
function np(e, t) {
	if (e === "full") return 0;
	let n = Math.min(49, Math.max(0, Number(t) || 0));
	return Math.ceil(Number(e) / (1 - 2 * n / 100));
}
function rp(e, t, n) {
	let r = Math.max(0, Number(t) || 0) / 100 * n, i = Math.max(0, n - 2 * r), a = e !== "full" && Number(e) < i, o = a ? Number(e) : i;
	return {
		width: o,
		margin: Math.round((n - o) / 2),
		pct: n > 0 ? o / n * 100 : 0,
		bound: a
	};
}
function ip(e) {
	return Qf.find((t) => t.width === e)?.id ?? null;
}
//#endregion
//#region ../template/assets/engine/0.7.4/calendar-format.js
function ap(e) {
	if (typeof e != "string" || !e.trim()) return !1;
	try {
		return new Intl.DateTimeFormat("en", { timeZone: e.trim() }), !0;
	} catch {
		return !1;
	}
}
//#endregion
//#region ../template/assets/engine/0.7.4/map-links.js
var op = {
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
}, sp = Object.keys(op);
function cp(e) {
	let t = e?.site?.mapService;
	return Object.hasOwn(op, t) ? t : "osm";
}
//#endregion
//#region ../template/assets/engine/0.7.4/meeting-links.js
var lp = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/;
function up(e) {
	let t = Array.isArray(e) ? e : String(e ?? "").split(/[\s,;]+/), n = [];
	for (let e of t) {
		let t = String(e ?? "").trim().toLowerCase();
		if (!t) continue;
		let r = "";
		try {
			r = new URL(/^[a-z][a-z0-9+.-]*:\/\//.test(t) ? t : `https://${t}`).hostname;
		} catch {}
		lp.test(r) && !n.includes(r) && n.push(r);
	}
	return n;
}
//#endregion
//#region src/lib/swatch.js
var dp = (e) => e ? e.startsWith("#") ? e : `var(--urd-color-${e})` : "var(--urd-color-accent)", fp = /* @__PURE__ */ R("<p class=\"panel-hint place-error\"> </p>"), pp = /* @__PURE__ */ R("<span class=\"site-cal-color\"><!> <span> </span></span>"), mp = /* @__PURE__ */ R("<div><button type=\"button\" class=\"site-cal-head\"><span class=\"site-cal-dot\" aria-hidden=\"true\"></span> <span class=\"site-cal-text\"><span class=\"site-cal-name\"> </span> <span class=\"site-cal-addr\"> </span></span> <span class=\"site-cal-chev\" aria-hidden=\"true\"></span></button> <div class=\"site-cal-body\"><div class=\"site-cal-clip\"><div class=\"site-cal-fields\"><span class=\"mini-label site-cal-section\"> </span> <label class=\"site-cal-field\"> <input/></label> <label class=\"site-cal-field\"> <input spellcheck=\"false\"/></label> <label class=\"site-cal-field\"> <input/></label> <span class=\"mini-label site-cal-section\"> </span> <div class=\"site-cal-colors\"><span class=\"site-cal-color\"><!> <span> </span></span> <!></div> <span class=\"mini-label site-cal-section\"> </span> <label class=\"site-cal-field\"> <input placeholder=\"https://\" spellcheck=\"false\"/></label> <label class=\"site-cal-field\"> <input/></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <div class=\"site-cal-foot\"><span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span> <button type=\"button\" class=\"site-cal-remove\"> </button></div></div></div></div></div>"), hp = /* @__PURE__ */ R("<div class=\"site-cal-list\"></div>"), gp = /* @__PURE__ */ R("<div class=\"cw-row\"><span class=\"mini-label cw-screen\"> </span> <span><span class=\"cw-fill\"></span></span> <span class=\"gridmenu-value cw-margin\"> </span></div>"), _p = /* @__PURE__ */ R("<div class=\"mini-label cw-binds\"> </div>"), vp = /* @__PURE__ */ R("<button> </button>"), yp = /* @__PURE__ */ R("<div class=\"ctl-row\"><span class=\"mini-label\"> </span> <input type=\"range\"/> <span class=\"gridmenu-value\"> </span></div>"), bp = /* @__PURE__ */ R("<img class=\"site-icon-preview\"/>"), xp = /* @__PURE__ */ R("<button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button>", 1), Sp = /* @__PURE__ */ R("<div class=\"panel-body\"><label> <input/></label> <label> <input/></label> <label> <!></label> <label> <input placeholder=\"Europe/Oslo\" spellcheck=\"false\"/></label> <!> <label> <!></label> <label> <input placeholder=\"meet.example.org\" spellcheck=\"false\"/></label> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><button type=\"button\" class=\"site-cal-add\"><!> </button> <!></div></details> <hr class=\"gridmenu-divider\"/> <p class=\"panel-strong\"> </p> <div class=\"sample cw-sample\"><!> <div class=\"cw-legend\"><span class=\"mini-label\"> </span> <span class=\"mini-label\"> </span></div> <!></div> <div class=\"seg cw-seg\"></div> <!> <p class=\"mini-label\"> </p> <div class=\"seg cw-seg\"></div> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><div class=\"ctl-row\"><span class=\"mini-label\"> </span> <input type=\"range\"/> <span class=\"gridmenu-value\"> </span></div></div></details> <hr class=\"gridmenu-divider\"/> <label> <!></label> <span class=\"toolbar-row\"><label class=\"ghost filepick tb-grow\"> <input type=\"file\" accept=\"image/*\"/></label> <!></span></div>");
function Cp(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.bindsFrom), i = /* @__PURE__ */ O(() => n.layoutGutter), a = /* @__PURE__ */ O(() => n.layoutWidth), o = /* @__PURE__ */ O(() => n.siteDraft), { addSiteCalendar: s, setStatus: c, siteCalendars: l, siteLangOptions: u, siteLangValue: d, siteMutate: f, svgAutoTrim: p, themeSwatches: m } = n;
	async function h(e) {
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
	function _() {
		f("edit:site-icon", () => {
			delete I(o).site.icon;
		});
	}
	function v(e) {
		f("edit:site-title", () => {
			I(o).site.title = e;
		});
	}
	function y(e) {
		f("edit:site-desc", () => {
			I(o).site.description = e;
		});
	}
	let b = /* @__PURE__ */ O(() => ip(I(a))), x = /* @__PURE__ */ O(() => Zf.find((e) => e.gutter === I(i))?.id ?? null), S = /* @__PURE__ */ k(!1), C = /* @__PURE__ */ O(() => I(a) === "full" ? Xf : ep(I(a))), w = /* @__PURE__ */ O(() => $f.map((e) => ({
		screen: e,
		...rp(I(a), I(i), e)
	})));
	function T(e, t) {
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
	let E = (e) => T({ contentWidth: e === "full" ? "full" : ep(e) }, "edit:site-width"), ee = (e) => T({ gutter: tp(e) }, "edit:site-gutter");
	function te(e) {
		f("site", () => {
			I(o).site.lang = e;
		});
	}
	function ne(e) {
		let t = up(e);
		f("site", () => {
			t.length ? I(o).site.meetingHosts = t : delete I(o).site.meetingHosts;
		});
	}
	function re(e) {
		f("site", () => {
			I(o).site.calendars[e]?.id === n.openSiteCalendar && (n.openSiteCalendar = null), I(o).site.calendars.splice(e, 1), I(o).site.calendars.length || delete I(o).site.calendars;
		});
	}
	function ie(e, t) {
		f("site", () => {
			let n = I(o).site.calendars, r = e + t;
			r < 0 || r >= n.length || ([n[e], n[r]] = [n[r], n[e]]);
		});
	}
	function ae(e, t, n, r = !1) {
		let i = String(n ?? "").trim();
		f(`edit:site-cal-${e}-${t}`, () => {
			let n = I(o).site.calendars[e];
			i || r ? n[t] = i : delete n[t];
		});
	}
	function oe(e, t, n) {
		f("site", () => {
			let r = I(o).site.calendars[e];
			n ? delete r[t] : r[t] = !1;
		});
	}
	function se(e) {
		f("site", () => {
			e && e !== "osm" ? I(o).site.mapService = e : delete I(o).site.mapService;
		});
	}
	function ce(e) {
		let t = e.trim();
		n.siteZoneBad = t !== "" && !ap(t), !n.siteZoneBad && f("site", () => {
			t ? I(o).site.timeZone = t : delete I(o).site.timeZone;
		});
	}
	var le = Sp(), ue = j(le), de = j(ue), fe = P(de);
	U(fe), D(ue);
	var pe = P(ue, 2), me = j(pe), he = P(me);
	U(he), D(pe);
	var ge = P(pe, 2), _e = j(ge), ve = P(_e);
	{
		let e = /* @__PURE__ */ O(d), t = /* @__PURE__ */ O(u);
		J(ve, {
			get value() {
				return I(e);
			},
			get options() {
				return I(t);
			},
			onchange: (e) => te(e)
		});
	}
	D(ge);
	var ye = P(ge, 2), be = j(ye), xe = P(be);
	U(xe);
	let Se;
	D(ye);
	var Ce = P(ye, 2), we = (e) => {
		var t = fp(), n = N(t, !0);
		F((e) => B(n, e), [() => K("settings.timeZoneBad")]), z(e, t);
	};
	V(Ce, (e) => {
		n.siteZoneBad && e(we);
	});
	var Te = P(Ce, 2), Ee = j(Te), De = P(Ee);
	{
		let e = /* @__PURE__ */ O(() => cp(I(o))), t = /* @__PURE__ */ O(() => sp.map((e) => [
			e,
			K(`mapService.${e}`),
			K(`mapService.${e}.note`)
		]));
		J(De, {
			get value() {
				return I(e);
			},
			get options() {
				return I(t);
			},
			onchange: (e) => se(e)
		});
	}
	D(Te);
	var Oe = P(Te, 2), ke = j(Oe), Ae = P(ke);
	U(Ae), D(Oe);
	var je = P(Oe, 2), Me = j(je), Ne = N(Me, !0), Pe = P(Me, 2), Fe = j(Pe), Ie = j(Fe);
	H(Ie, () => q.plus);
	var Le = P(Ie);
	D(Fe);
	var Re = P(Fe, 2), ze = (e) => {
		var t = hp();
		ui(t, 23, l, (e) => e.id, (e, t, r) => {
			let i = /* @__PURE__ */ O(() => n.openSiteCalendar === I(t).id);
			var a = mp();
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
			var ne = P(E, 2), se = j(ne), ce = P(se);
			U(ce), D(ne);
			var le = P(ne, 2), ue = N(le, !0), de = P(le, 2), fe = j(de), pe = j(fe);
			{
				let e = /* @__PURE__ */ O(() => I(t).color || "accent"), n = /* @__PURE__ */ O(m), i = /* @__PURE__ */ O(() => K("siteCal.colorMain"));
				Uc(pe, {
					get value() {
						return I(e);
					},
					get tokens() {
						return I(n);
					},
					get label() {
						return I(i);
					},
					onchange: (e) => ae(I(r), "color", e ?? "")
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
				var s = pp(), c = j(s);
				{
					let e = /* @__PURE__ */ O(() => I(t)[a()] || ""), n = /* @__PURE__ */ O(m), i = /* @__PURE__ */ O(() => K(o()));
					Uc(c, {
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
						onchange: (e) => ae(I(r), a(), e ?? "")
					});
				}
				var l = N(P(c, 2), !0);
				D(s), F((e, t) => {
					G(s, "title", e), B(l, t);
				}, [() => K(`tip.${o()}`), () => K(o())]), z(e, s);
			}), D(de);
			var he = P(de, 2), ge = N(he, !0), _e = P(he, 2), ve = j(_e), ye = P(ve);
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
			D(ke), D(b), D(y), D(v), D(a), F((e, n, l, d, f, m, g, _, y, b, x, C, E, re, ie, ae, oe, le, de, pe, he, D, ke, Ae, Fe, Ie) => {
				o = Pi(a, 1, "site-cal-row", null, o, { open: I(i) }), G(s, "aria-expanded", I(i)), u = Ii(c, "", u, { background: e }), B(p, n), B(h, l), v.inert = !I(i), B(S, d), B(w, `${f ?? ""} `), W(T, I(t).name ?? ""), G(T, "placeholder", m), G(T, "title", g), G(T, "data-cal-name", I(t).id), B(ee, `${_ ?? ""} `), W(te, I(t).url), G(te, "placeholder", y), G(ne, "title", b), B(se, `${x ?? ""} `), W(ce, I(t).description ?? ""), B(ue, C), G(fe, "title", E), B(me, re), B(ge, ie), G(_e, "title", ae), B(ve, `${oe ?? ""} `), W(ye, I(t).link ?? ""), G(be, "title", le), B(xe, `${de ?? ""} `), W(Se, I(t).organizer ?? ""), G(Ce, "title", pe), Vi(we, I(t).subscribable !== !1), B(Te, ` ${he ?? ""}`), G(Ee, "title", D), Vi(De, I(t).inFilter !== !1), B(Oe, ` ${ke ?? ""}`), je.disabled = I(r) === 0, Me.disabled = Ae, G(Ne, "title", Fe), B(Pe, Ie);
			}, [
				() => dp(I(t).color),
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
			]), L("click", s, () => n.openSiteCalendar = I(i) ? null : I(t).id), L("change", T, (e) => ae(I(r), "name", e.target.value)), L("change", te, (e) => ae(I(r), "url", e.target.value, !0)), L("change", ce, (e) => ae(I(r), "description", e.target.value)), L("change", ye, (e) => ae(I(r), "link", e.target.value)), L("change", Se, (e) => ae(I(r), "organizer", e.target.value)), L("change", we, (e) => oe(I(r), "subscribable", e.target.checked)), L("change", De, (e) => oe(I(r), "inFilter", e.target.checked)), L("click", je, () => ie(I(r), -1)), L("click", Me, () => ie(I(r), 1)), L("click", Ne, () => re(I(r))), z(e, a);
		}), D(t), z(e, t);
	}, Be = /* @__PURE__ */ O(() => l().length);
	V(Re, (e) => {
		I(Be) && e(ze);
	}), D(Pe), D(je);
	var Ve = P(je, 4), He = N(Ve, !0), Ue = P(Ve, 2), We = j(Ue);
	ui(We, 17, () => I(w), (e) => e.screen, (e, t) => {
		var n = gp(), r = j(n), i = N(r, !0), a = P(r, 2);
		let o;
		var s = N(a), c = N(P(a, 2), !0);
		D(n), F(() => {
			B(i, I(t).screen), o = Pi(a, 1, "cw-bar", null, o, { fluid: !I(t).bound }), Ii(s, `width:${I(t).pct ?? ""}%`), B(c, I(t).bound ? `${I(t).margin}` : "-");
		}), z(e, n);
	});
	var Ge = P(We, 2), Ke = j(Ge), qe = N(Ke, !0), Je = N(P(Ke, 2), !0);
	D(Ge);
	var Ye = P(Ge, 2), Xe = (e) => {
		var t = _p(), n = N(t, !0);
		F((e) => B(n, e), [() => K("lbl.bindsFrom", { n: I(r) })]), z(e, t);
	};
	V(Ye, (e) => {
		I(a) !== "full" && e(Xe);
	}), D(Ue);
	var Ze = P(Ue, 2);
	ui(Ze, 21, () => Qf, (e) => e.id, (e, t) => {
		var n = vp();
		let r;
		var i = N(n, !0);
		F((e) => {
			r = Pi(n, 1, "", null, r, { on: I(b) === I(t).id }), B(i, e);
		}, [() => K(`lbl.width.${I(t).id}`)]), L("click", n, () => E(I(t).width)), z(e, n);
	}), D(Ze);
	var Qe = P(Ze, 2), $e = (e) => {
		var t = yp(), n = j(t), r = N(n, !0), i = P(n, 2);
		U(i);
		var a = N(P(i, 2));
		D(t), F((e, n) => {
			G(t, "title", e), B(r, n), G(i, "min", 960), G(i, "max", Xf), G(i, "step", 20), W(i, I(C)), B(a, `${I(C) ?? ""} px`);
		}, [() => K("tip.site.contentWidthFree"), () => K("lbl.widthFree")]), L("input", i, (e) => E(e.target.valueAsNumber)), z(e, t);
	};
	V(Qe, (e) => {
		I(a) !== "full" && e($e);
	});
	var et = P(Qe, 2), tt = N(et, !0), rt = P(et, 2);
	ui(rt, 21, () => Zf, (e) => e.id, (e, t) => {
		var n = vp();
		let r;
		var i = N(n, !0);
		F((e) => {
			r = Pi(n, 1, "", null, r, { on: I(x) === I(t).id }), B(i, e);
		}, [() => K(`lbl.gutter.${I(t).id}`)]), L("click", n, () => ee(I(t).gutter)), z(e, n);
	}), D(rt);
	var ot = P(rt, 2), st = j(ot), ct = N(st, !0), lt = P(st, 2), ut = j(lt), dt = j(ut), ft = N(dt, !0), pt = P(dt, 2);
	U(pt);
	var mt = N(P(pt, 2));
	D(ut), D(lt), D(ot);
	var ht = P(ot, 4), gt = j(ht), _t = P(gt), vt = (e) => {
		var t = bp();
		F((e) => {
			G(t, "src", I(o).site.icon), G(t, "alt", e);
		}, [() => K("lbl.siteIcon")]), z(e, t);
	};
	V(_t, (e) => {
		I(o).site.icon && e(vt);
	}), D(ht);
	var yt = P(ht, 2), bt = j(yt), xt = j(bt), St = P(xt);
	D(bt);
	var Ct = P(bt, 2), wt = (e) => {
		var t = xp(), r = M(t);
		H(r, () => q.pencil ?? "✎", !0), D(r);
		var i = P(r, 2);
		H(i, () => q.cross, !0), D(i), F((e, t) => {
			G(r, "title", e), G(i, "title", t);
		}, [() => K("tip.site.editIcon"), () => K("tip.site.removeIcon")]), L("click", r, () => n.iconEditorImage = I(o).site.icon), L("click", i, _), z(e, t);
	};
	V(Ct, (e) => {
		I(o).site.icon && e(wt);
	}), D(yt), D(le), F((e, t, r, a, s, c, l, u, d, f, p, m, h, g, _, v, y, b, C, w, T, E, ee, te, ne, re, ie, ae, oe, se) => {
		G(ue, "title", e), B(de, `${t ?? ""} `), W(fe, I(o).site.title ?? ""), G(fe, "placeholder", r), G(pe, "title", a), B(me, `${s ?? ""} `), W(he, I(o).site.description ?? ""), G(he, "placeholder", c), G(ge, "title", l), B(_e, `${u ?? ""} `), G(ye, "title", d), B(be, `${f ?? ""} `), W(xe, I(o).site.timeZone ?? ""), Se = Pi(xe, 1, "", null, Se, { "place-error": n.siteZoneBad }), G(Te, "title", p), B(Ee, `${m ?? ""} `), G(Oe, "title", h), B(ke, `${g ?? ""} `), W(Ae, _), G(Me, "title", v), B(Ne, y), B(Le, ` ${b ?? ""}`), G(Ve, "title", C), B(He, w), B(qe, T), B(Je, E), G(et, "title", ee), B(tt, te), ot.open = I(x) === null || I(S), B(ct, ne), G(ut, "title", re), B(ft, ie), G(pt, "min", 0), G(pt, "max", 12), G(pt, "step", 1), W(pt, I(i)), B(mt, `${I(i) ?? ""} vw`), B(gt, `${ae ?? ""} `), G(bt, "title", oe), B(xt, `${se ?? ""} `);
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
	]), L("input", fe, (e) => v(e.target.value)), L("input", he, (e) => y(e.target.value)), L("change", xe, (e) => ce(e.target.value)), L("change", Ae, (e) => ne(e.target.value)), L("click", Fe, () => s()), Qi("open", "toggle", je, (e) => n.siteCalendarsOpen = e, () => n.siteCalendarsOpen), zr("toggle", ot, (e) => A(S, e.currentTarget.open, !0)), L("input", pt, (e) => ee(e.target.valueAsNumber)), L("change", St, h), z(e, le), at();
}
Br([
	"input",
	"change",
	"click"
]);
//#endregion
//#region src/panels/ThemePanel.svelte
var wp = /* @__PURE__ */ R("<div class=\"mini-label tpv-cap\"> </div>"), Tp = /* @__PURE__ */ R("<div class=\"theme-pvw\"><!> <div class=\"tpv-demo\"><div class=\"tpv-h\"> </div> <div class=\"tpv-card\"> </div> <div class=\"tpv-row\"><span class=\"tpv-btn\"> </span><span class=\"tpv-lnk\"> </span></div></div></div>"), Ep = /* @__PURE__ */ R("<button type=\"button\"><span class=\"tp-band\"><i></i><i></i><i></i><i></i></span> <small> </small></button>"), Dp = /* @__PURE__ */ R("<div class=\"ctl-row autorow\"><span class=\"autolbl\"> </span> <span class=\"seg\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div>"), Op = /* @__PURE__ */ R("<span class=\"mini-label\"> </span>"), kp = /* @__PURE__ */ R("<div class=\"palcol\"><!> <span class=\"palcap\"> </span> <b class=\"palhex\"> </b></div>"), Ap = /* @__PURE__ */ R("<div class=\"ctl-row palhead\"><span class=\"mini-label\"> </span> <button type=\"button\"> </button></div> <div></div>", 1), jp = /* @__PURE__ */ R("<div class=\"panel-body\"><p class=\"panel-strong\"> </p> <div class=\"theme-presets\"></div> <p class=\"panel-strong\"> </p> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <div class=\"ctl-row palhead\"><!> <button type=\"button\"> </button></div> <div class=\"palcells\"></div> <!> <div class=\"ctl-row palauto-row\"><span class=\"mini-label ctl-name\"> </span> <button type=\"button\"> </button></div> <div class=\"theme-previews\"><!> <!></div> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><label> <!></label> <label> <!></label> <div class=\"sample typo-sample\"><div class=\"ts-h\"> </div> <div class=\"ts-b\"> </div></div></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><div class=\"sample form-prev\"><span class=\"fp-btn\"> </span> <span class=\"fp-card\"> </span></div> <label class=\"ctl-row\"> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"24\" step=\"1\"/> <label class=\"ctl-row\"> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"40\" step=\"1\"/></div></details></div>");
function Mp(e, t) {
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
		return [...Ml.some(([, e]) => e === t) ? [] : [[t, K("opt.customFont")]], ...Ml.map(([e, t]) => [t, K(e)])];
	}
	let ie = (e) => parseInt(e, 10) || 0;
	function ae(e, t) {
		T(e, `${t}px`);
	}
	var oe = jp();
	{
		let e = (e, t = f, n = f) => {
			var r = Tp(), i = j(r), a = (e) => {
				var t = wp(), r = N(t, !0);
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
			var n = Ep();
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
			var t = Dp(), n = j(t), r = N(n, !0), i = P(n, 2), a = j(i);
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
			var t = Op(), n = N(t, !0);
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
			var s = kp(), c = j(s);
			{
				let e = /* @__PURE__ */ O(() => I(i).theme.tokens.color[r()] ?? x(r(), I(v))), t = /* @__PURE__ */ O(d);
				Uc(c, {
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
			var t = Ap(), n = M(t), r = j(n), a = N(r, !0), o = P(r, 2);
			let s;
			var c = N(o, !0);
			D(n);
			var l = P(n, 2);
			let f;
			ui(l, 21, () => p, ([e, t, n]) => e, (e, t) => {
				var n = /* @__PURE__ */ O(() => g(I(t), 3));
				let r = () => I(n)[0], a = () => I(n)[1], o = () => I(n)[2];
				var s = kp(), c = j(s);
				{
					let e = /* @__PURE__ */ O(() => I(i).theme.alt.tokens.color[r()] ?? I(y)[r()] ?? x(r(), I(y))), t = /* @__PURE__ */ O(d), n = /* @__PURE__ */ O(() => K("theme.darkColorLabel", { name: a() }));
					Uc(c, {
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
function Np(e) {
	return String(e ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}
function Pp(e, t) {
	let n = Np(t).trim(), r = Np(e);
	return n ? r.startsWith(n) ? 0 : r.split(/[^a-z0-9]+/).some((e) => e.startsWith(n)) ? 1 : r.includes(n) ? 2 : -1 : 2;
}
function Fp(e, t) {
	let n = Np(e);
	return Np(t).split(/\s+/).filter(Boolean).every((e) => n.includes(e));
}
function Ip(e, t, n) {
	return e.map((e, r) => ({
		item: e,
		i: r,
		rank: Pp(n(e), t)
	})).filter((e) => e.rank >= 0).sort((e, t) => e.rank - t.rank || e.i - t.i).map((e) => e.item);
}
//#endregion
//#region ../template/assets/engine/0.7.4/imageTools.js
var Lp = 1600, Rp = .82, zp = .6, Bp = 15e6, Vp = 4e6, Hp = 256e3;
function Up(e) {
	if (!Gp(e, 0, "GIF8")) return !1;
	for (let t = 13; t < e.length - 11; t++) if (e[t] === 33 && e[t + 1] === 255 && e[t + 2] === 11 && (Gp(e, t + 3, "NETSCAPE2.0") || Gp(e, t + 3, "ANIMEXTS1.0"))) return !0;
	return !1;
}
var Wp = class extends Error {
	constructor(e) {
		super("The animated image is too large"), this.code = "animatedTooLarge", this.bytes = e;
	}
}, Gp = (e, t, n) => {
	if (t + n.length > e.length) return !1;
	for (let r = 0; r < n.length; r += 1) if (e[t + r] !== n.charCodeAt(r)) return !1;
	return !0;
};
function Kp(e) {
	if (!Gp(e, 0, "GIF87a") && !Gp(e, 0, "GIF89a") || e.length < 13) return !1;
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
function qp(e) {
	return !Gp(e, 0, "RIFF") || !Gp(e, 8, "WEBP") ? !1 : Gp(e, 12, "VP8X") && e.length > 20 && !!(e[20] & 2);
}
function Jp(e) {
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
		if (Gp(e, t + 4, "acTL")) return !0;
		if (Gp(e, t + 4, "IDAT") || Gp(e, t + 4, "IEND")) return !1;
		t += 12 + n;
	}
	return !1;
}
function Yp(e) {
	return e instanceof Uint8Array ? Kp(e) ? "gif" : qp(e) ? "webp" : Jp(e) ? "png" : null : null;
}
async function Xp(e) {
	if (!/^image\/(?:gif|webp|png|apng)$/i.test(e.type || "") && !/\.(?:gif|webp|a?png)$/i.test(e.name || "")) return null;
	if (e.size > 4e6) {
		let t = new Uint8Array(await e.slice(0, Hp).arrayBuffer());
		if (Yp(t) || Up(t)) throw new Wp(e.size);
		return null;
	}
	let t = new Uint8Array(await e.arrayBuffer()), n = Yp(t);
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
async function Zp(e, t = Lp, { still: n = !1 } = {}) {
	if ($p(e)) return em(await e.text());
	let r = n ? null : await Xp(e);
	if (r) return r;
	let i = await createImageBitmap(e), a = Math.min(1, t / Math.max(i.width, i.height)), o = Math.round(i.width * a), s = Math.round(i.height * a), c = document.createElement("canvas");
	c.width = o, c.height = s, c.getContext("2d").drawImage(i, 0, 0, o, s), i.close();
	let l = (e) => new Promise((t) => c.toBlob(t, "image/webp", e)), u = await l(Rp);
	return u.size > 4e5 && (u = await l(zp)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(u);
		}),
		bytes: u.size,
		width: o,
		height: s
	};
}
var Qp = "image/svg+xml";
function $p(e) {
	return e.type === Qp || /\.svg$/i.test(e.name || "");
}
function em(e) {
	let t = String(e ?? "");
	if (!/<svg[\s>]/i.test(t)) throw Error("Invalid SVG");
	if (/<\s*script[\s>]/i.test(t) || /<\s*foreignObject[\s>]/i.test(t) || /\son[a-z]+\s*=/i.test(t) || /javascript:/i.test(t)) throw Error("The SVG contains scripts or event handlers and cannot be used");
	let n = new Blob([t]).size, r = `data:${Qp};base64,${btoa(unescape(encodeURIComponent(t)))}`, i = t.match(/<svg\b[^>]*>/i)?.[0] ?? "", a = i.match(/viewBox\s*=\s*["']\s*([-\d.]+(?:[\s,]+[-\d.]+){3})\s*["']/i)?.[1]?.split(/[\s,]+/).map(Number);
	return {
		dataUrl: r,
		bytes: n,
		width: a?.length === 4 ? a[2] : Number.parseFloat(i.match(/\bwidth\s*=\s*["']?([\d.]+)/i)?.[1]) || 0,
		height: a?.length === 4 ? a[3] : Number.parseFloat(i.match(/\bheight\s*=\s*["']?([\d.]+)/i)?.[1]) || 0
	};
}
function tm(e, t, n = .04) {
	let r = String(e ?? "");
	if (!t || !(t.width > 0) || !(t.height > 0)) return r;
	let i = r.match(/<svg\b[^>]*>/i)?.[0];
	if (!i) return r;
	let a = (e) => Math.round(e * 1e3) / 1e3, o = Math.max(t.width, t.height) * Math.max(0, n), s = a(t.x - o), c = a(t.y - o), l = a(t.width + 2 * o), u = a(t.height + 2 * o), d = i.replace(/\sviewBox\s*=\s*["'][^"']*["']/i, "").replace(/\swidth\s*=\s*["'][^"']*["']/i, "").replace(/\sheight\s*=\s*["'][^"']*["']/i, "").replace(/<svg\b/i, `<svg viewBox="${s} ${c} ${l} ${u}" width="${l}" height="${u}"`);
	return r.replace(i, d);
}
function nm(e) {
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
function rm(e) {
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
function im(e, t = "image") {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || t;
}
function am(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region ../template/assets/engine/0.7.4/calendar-designs.js
var om = [
	"list",
	"cards",
	"month",
	"agenda",
	"next",
	"week",
	"day",
	"year"
], sm = [
	"title",
	"date",
	"time",
	"place",
	"description",
	"category",
	"number"
], cm = [
	"noticeLabel",
	"noticeTitle",
	"noticeText",
	"emptyKicker",
	"emptyTitle",
	"series",
	"forWhom",
	"openAll"
], lm = {
	noticeTitle: "calendar.noticeTitleHint",
	noticeText: "calendar.noticeTextHint"
}, um = ["emptyKicker", "emptyTitle"], dm = [
	"noticeLabel",
	"noticeTitle",
	"noticeText",
	"readWhole",
	"moreInfo"
], fm = /* @__PURE__ */ "all.signup.subscribe.subscribeMulti.addGoogle.swUpcoming.swWeek.swMonth.noMatch.earlier.showAll.zoneOf.zoneYours.weekN.range.moreN.dayNone.cancelled.allDay.until.timeAt.today.tomorrow.inDays.when.where.organizer.moreAbout.join.addEvent.addOne.addFile.addWhole.icalAddress.onMap.recurring".split("."), pm = [
	"modern",
	"next",
	"ap"
];
function mm() {
	return pm.map((e) => ({
		family: e,
		labelKey: `calendar.family.${e}`,
		designs: hm.filter((t) => t.family === e)
	})).filter((e) => e.designs.length);
}
var X = (e, t = "colors") => ({
	key: e,
	labelKey: `calendar.slot.${e}`,
	section: t
}), hm = [
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
			...fm
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
		texts: fm
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
			...fm
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
		texts: ["program", ...fm]
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
		texts: ["count", ...fm]
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
		texts: [...um, ...fm]
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
		texts: fm
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
		texts: ["wholeProgram", ...fm]
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
			...fm
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
		texts: fm
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
		texts: fm
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
		texts: [...um, ...fm]
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
			...fm
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
		texts: fm
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
		texts: ["todayBtn", ...fm]
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
		texts: ["unnamed", ...fm]
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
		texts: fm
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
		texts: [...um, ...fm]
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
			...fm
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
			...fm
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
			...fm
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
			...fm
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
			...fm
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
			...dm,
			...fm
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
			...fm
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
		texts: ["now", ...fm]
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
			...fm
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
			...fm
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
			...fm
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
			...fm
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
			...dm,
			...um,
			...fm
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
			...um,
			...fm
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
			...dm,
			...um,
			...fm
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
		texts: ["todayBtn", ...fm]
	}
], gm = (e, t, n, r) => ({
	key: e,
	kind: "choice",
	values: t,
	def: n,
	labelKey: `calendar.opt.${e}`,
	...r ? { when: r } : {}
}), _m = (e, t) => ({
	key: e,
	kind: "switch",
	def: t,
	labelKey: `calendar.opt.${e}`
}), vm = (e) => ({
	key: e,
	kind: "hour",
	def: null,
	labelKey: `calendar.opt.${e}`
}), ym = {
	sidepanel: [gm("panelSide", [
		"right",
		"left",
		"under"
	], "right")],
	weekPlan: [
		vm("hourFrom"),
		vm("hourTo"),
		_m("weekend", !1)
	],
	dayPlan: [
		vm("hourFrom"),
		vm("hourTo"),
		_m("weekend", !1)
	],
	table: [
		_m("colTime", !0),
		_m("colPlace", !0),
		_m("zebra", !0)
	],
	posters: [gm("columns", [
		"auto",
		"2",
		"3",
		"4"
	], "auto")],
	photo: [gm("columns", [
		"auto",
		"2",
		"3",
		"4"
	], "auto")],
	yearWheel: [gm("firstMonth", [
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
	numbered: [_m("pad", !0)],
	band: [_m("roll", !0), gm("pause", ["button", "touch"], "button", { roll: !0 })]
}, bm = [
	"weekStrip",
	"weekPlan",
	"layers"
], xm = [
	"month",
	"sidepanel",
	"apMonth"
];
function Sm(e) {
	let t = Om(e?.design), n = e?.switcherViews ?? {};
	return {
		week: bm.includes(n.week) ? n.week : "weekStrip",
		month: xm.includes(n.month) ? n.month : t.set === "apCream" || t.set === "apNavy" ? "apMonth" : "month"
	};
}
function Cm(e) {
	return e?.description === "card" || e?.description === "rows" ? e.description : e?.options?.description === !1 ? "card" : "rows";
}
function wm(e) {
	let t = Om(e?.design);
	return t.excerpt === !0 || t.id === "plain" && km(e) === "cards";
}
function Tm(e) {
	return ym[Om(e).id] ?? [];
}
function Em(e) {
	let t = e?.options ?? {}, n = {};
	for (let r of Tm(e?.design)) {
		let e = t[r.key];
		r.kind === "choice" ? n[r.key] = r.values.includes(e) ? e : r.def : r.kind === "switch" ? n[r.key] = typeof e == "boolean" ? e : r.def : n[r.key] = Number.isInteger(e) && e >= 0 && e <= 24 ? e : null;
	}
	return n;
}
function Dm(e, t) {
	return !e.when || Object.entries(e.when).every(([e, n]) => t?.[e] === n);
}
function Om(e) {
	return hm.find((t) => t.id === e) ?? hm[0];
}
function km(e) {
	return Om(e?.design).view || (om.includes(e?.view) ? e.view : "list");
}
var Am = [
	"list",
	"cards",
	"agenda",
	"next"
];
function jm() {
	let e = [{
		view: null,
		designs: hm.filter((e) => e.view === null)
	}];
	for (let t of om) {
		let n = hm.filter((e) => e.view === t);
		n.length && e.push({
			view: t,
			designs: n
		});
	}
	return e;
}
var Mm = /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, Nm = /^[a-z][a-z0-9-]*$/;
function Pm(e) {
	return typeof e == "string" ? Mm.test(e) ? e : Nm.test(e) ? `var(--urd-color-${e})` : null : null;
}
function Fm(e, t) {
	let n = typeof t?.show == "boolean" ? t.show : e.stripe;
	return {
		show: n,
		color: n ? Pm(t?.color) : null
	};
}
var Im = {
	min: 8,
	max: 120
}, Lm = /^(?:\s|&nbsp;|&#160;|<[^<>]*>)*$/i;
function Rm(e) {
	return typeof e != "string" || Lm.test(e);
}
function zm(e, t) {
	return Object.keys(t ?? {}).some((n) => {
		let r = n.split(".")[0];
		return !e.texts.includes(r) || lm[r] ? !1 : t[n] === !1 ? cm.includes(r) : !Rm(t[n]);
	});
}
function Bm(e) {
	let t = {};
	for (let n of Object.keys(lm)) Rm(e?.[n]) || (t[n] = e[n]);
	return Object.keys(t).length ? t : void 0;
}
//#endregion
//#region src/panels/BlocksPanel.svelte
var Vm = /* @__PURE__ */ R("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label>"), Hm = /* @__PURE__ */ R("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\" multiple=\"\"/></label>"), Um = /* @__PURE__ */ R("<button class=\"ghost\"> </button>"), Wm = /* @__PURE__ */ R("<p class=\"panel-hint\"> </p>"), Gm = /* @__PURE__ */ R("<details class=\"group\"><summary> </summary> <div class=\"group-items\"></div></details>"), Km = /* @__PURE__ */ R("<details class=\"group\"><summary> </summary> <div class=\"group-items\"><button class=\"ghost\"> </button> <button class=\"ghost\"> </button></div></details> <button class=\"ghost\"> </button> <label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><button class=\"ghost\"> </button> <label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\" multiple=\"\"/></label></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button></div> <div class=\"group-items\"><button class=\"ghost\"> </button></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button></div></details> <!> <!>", 1), qm = /* @__PURE__ */ R("<div><input type=\"text\"/> <!></div>");
function Jm(e, t) {
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
			...jm().flatMap((e) => e.designs).filter((e) => e.id !== "plain").map((e) => ({
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
				alt: im(t.name).replaceAll("-", " "),
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
	var w = qm();
	let T;
	var E = j(w);
	U(E);
	var ee = P(E, 2), te = (e) => {
		var t = Yr();
		ui(M(t), 17, () => Ip(b(), I(y), (e) => e.label), (e) => e.label, (e, t) => {
			var n = Yr(), r = M(n), i = (e) => {
				var n = Vm(), r = j(n), i = P(r);
				D(n), F((e) => {
					G(n, "title", e), B(r, `${I(t).label ?? ""} `);
				}, [() => K("tip.webpAuto")]), L("change", i, S), z(e, n);
			}, a = (e) => {
				var n = Hm(), r = j(n), i = P(r);
				D(n), F((e) => {
					G(n, "title", e), B(r, `${I(t).label ?? ""} `);
				}, [() => K("tip.blocks.galleryImages")]), L("change", i, C), z(e, n);
			}, o = (e) => {
				var n = Um(), r = N(n, !0);
				F(() => B(r, I(t).label)), L("click", n, () => x(I(t))), z(e, n);
			};
			V(r, (e) => {
				I(t).act === "image" ? e(i) : I(t).act === "galleryImages" ? e(a, 1) : e(o, -1);
			}), z(e, n);
		}, (e) => {
			var t = Wm(), n = N(t, !0);
			F((e) => B(n, e), [() => K("canvas.searchEmpty")]), z(e, t);
		}), z(e, t);
	}, ne = /* @__PURE__ */ O(() => I(y).trim()), re = (e) => {
		var t = Km(), i = M(t), c = j(i), l = N(c, !0), u = P(c, 2), d = j(u), f = N(d, !0), p = P(d, 2), m = N(p, !0);
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
			var n = Gm(), i = j(n), a = N(i, !0), c = P(i, 2);
			ui(c, 20, () => I(t), (e) => e, (e, t) => {
				var n = Um(), i = N(n, !0);
				F((e) => {
					G(n, "title", e), B(i, I(s)[t].data.mal.name);
				}, [() => K("canvas.insertGroup")]), L("click", n, () => I(r)?.sendInsertTemplate(t)), z(e, n);
			}), D(c), D(n), F((e) => B(a, e), [() => K("canvas.tabMyTemplates")]), z(e, n);
		}, yt = /* @__PURE__ */ O(() => I(o).some((e) => I(s)[e]?.data?.mal?.kind === "blocks"));
		V(_t, (e) => {
			I(yt) && e(vt);
		});
		var bt = P(_t, 2), xt = (e) => {
			var t = Gm(), n = j(t), r = N(n, !0), i = P(n, 2);
			ui(i, 21, () => I(a), (e) => e.type, (e, t) => {
				var n = Yr(), r = M(n), i = (e) => {
					var n = Gm(), r = j(n), i = N(r, !0), a = P(r, 2);
					ui(a, 21, () => I(t).variants, (e) => e.label, (e, n) => {
						var r = Um(), i = N(r, !0);
						F((e) => {
							G(r, "title", e), B(i, I(n).label);
						}, [() => K("tip.blocks.fromPlugin", { plugin: I(t).plugin })]), L("click", r, () => v(I(t), I(n).props)), z(e, r);
					}), D(a), D(n), F(() => B(i, I(t).label)), z(e, n);
				}, a = (e) => {
					var n = Um(), r = N(n, !0);
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
var Ym = /* @__PURE__ */ R("<div class=\"panel-body\"><label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\"/> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label></div>");
function Xm(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.grid), { setGrid: i } = n;
	var a = Ym(), o = j(a), s = j(o), c = N(P(s));
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
var Zm = [
	"forEach",
	"isDisjointFrom",
	"isSubsetOf",
	"isSupersetOf"
], Qm = [
	"difference",
	"intersection",
	"symmetricDifference",
	"union"
], $m = !1, eh = class e extends Set {
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ k(0);
	#n = /* @__PURE__ */ k(0);
	#r = gr || -1;
	constructor(e) {
		if (super(), e) {
			for (var t of e) super.add(t);
			this.#n.v = super.size;
		}
		$m || this.#a();
	}
	#i(e) {
		return gr === this.#r ? /* @__PURE__ */ k(e) : rn(e);
	}
	#a() {
		$m = !0;
		var t = e.prototype, n = Set.prototype;
		for (let e of Zm) t[e] = function(...t) {
			return I(this.#t), n[e].apply(this, t);
		};
		for (let r of Qm) t[r] = function(...t) {
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
}, th = "urd-quick-row", nh = ["fit", "phone"], rh = {
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
function ih(e) {
	return [...rh[e] ?? [], ...nh];
}
var ah = Object.freeze({
	pinned: [],
	removed: []
});
function oh(e) {
	let t = (e) => Array.isArray(e) ? [...new Set(e.filter((e) => typeof e == "string" && e))] : [];
	return {
		pinned: t(e?.pinned),
		removed: t(e?.removed)
	};
}
function sh(e, t, n) {
	let r = ih(e).filter((e) => !t.removed.includes(e));
	for (let e of t.pinned) r.includes(e) || r.push(e);
	return r.filter((e) => n.has(e));
}
function ch(e, t, n) {
	return ih(e).includes(n) ? !t.removed.includes(n) : t.pinned.includes(n);
}
function lh(e, t, n) {
	let r = ih(e).includes(n);
	return ch(e, t, n) ? r ? {
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
function uh(e) {
	return e.pinned.length > 0 || e.removed.length > 0;
}
function dh(e) {
	try {
		let t = JSON.parse(e.getItem("urd-quick-row") ?? "{}");
		return !t || typeof t != "object" || Array.isArray(t) ? {} : Object.fromEntries(Object.entries(t).map(([e, t]) => [e, oh(t)]));
	} catch {
		return {};
	}
}
function fh(e, t) {
	let n = Object.fromEntries(Object.entries(t).filter(([, e]) => uh(e)));
	try {
		e.setItem(th, JSON.stringify(n));
	} catch {}
}
//#endregion
//#region src/menu/state.svelte.js
var ph = "urd-admin-menu-width", mh = pn({
	widthPref: localStorage.getItem(ph) === "narrow" ? "narrow" : "wide",
	wide: localStorage.getItem(ph) !== "narrow",
	min: 8,
	room: Infinity,
	menuQuery: "",
	propsQuery: "",
	tab: "content"
});
function hh() {
	return mh.wide && mh.room >= 740;
}
function gh(e) {
	mh.widthPref = e === "narrow" ? "narrow" : "wide", mh.wide = mh.widthPref === "wide", mh.widthPref === "narrow" ? localStorage.setItem(ph, "narrow") : localStorage.removeItem(ph);
}
function _h(e) {
	mh.min = Math.round(e) + 8, mh.room = window.innerWidth - mh.min - 8;
}
var vh = new eh(), yh = pn({ choices: dh(localStorage) });
function bh(e) {
	return yh.choices[e] ?? ah;
}
function xh(e, t) {
	yh.choices = {
		...yh.choices,
		[e]: t
	}, fh(localStorage, Xe(yh.choices));
}
function Sh(e, t) {
	xh(e, lh(e, bh(e), t));
}
//#endregion
//#region src/menu/Pin.svelte
var Ch = /* @__PURE__ */ R("<button type=\"button\"></button>");
function wh(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock.type), i = /* @__PURE__ */ O(() => ch(I(r), bh(I(r)), t.id));
	var a = Ch();
	let o;
	H(a, () => I(i) ? q.pinOn : q.pin, !0), D(a), F((e, t) => {
		o = Pi(a, 1, "menu-pin", null, o, { on: I(i) }), G(a, "aria-pressed", I(i)), G(a, "title", e), G(a, "aria-label", t);
	}, [() => I(i) ? K("menu.unpin") : K("menu.pin"), () => I(i) ? K("menu.unpin") : K("menu.pin")]), L("click", a, () => Sh(I(r), t.id)), z(e, a), at();
}
Br(["click"]);
//#endregion
//#region src/menu/options.js
var Th = () => [["on", K("common.on")], ["off", K("common.off")]], Eh = () => [
	["canvas", K("opt.ribbonWidth.content")],
	["page", K("opt.ribbonWidth.page")],
	["content", K("opt.ribbonWidth.own")]
], Dh = (e) => e === "canvas" || e === "page" ? e : "content", Oh = () => [
	["roll", K("opt.ribbonMotion.roll")],
	["sway", K("opt.ribbonMotion.sway")],
	["step", K("opt.ribbonMotion.step")],
	["none", K("opt.ribbonMotion.none")]
], kh = () => [
	["text", K("opt.ribbonStripe.text")],
	["marks", K("opt.ribbonStripe.marks")],
	["plain", K("opt.ribbonStripe.plain")]
], Ah = () => [["none", K("common.none")], ...kh()], jh = () => [
	["dot", K("opt.ribbonSep.dot")],
	["dash", K("opt.ribbonSep.dash")],
	["slash", K("opt.ribbonSep.slash")],
	["star", K("opt.ribbonSep.star")],
	["none", K("common.none")],
	["custom", K("opt.ribbonSep.custom")]
], Mh = (e) => e.color || (e.variant === "plain" ? "text" : "accent-text"), Nh = (e) => `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">${e}</svg>`, Ph = {
	dot: Nh("<circle cx=\"12\" cy=\"12\" r=\"3\"/>"),
	dash: Nh("<rect x=\"3\" y=\"10.6\" width=\"18\" height=\"2.8\" rx=\"1.4\"/>"),
	slash: Nh("<path d=\"M15.5 3.5L8.5 20.5\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\" fill=\"none\"/>"),
	star: Nh("<path d=\"M12 2.8l2.3 6.1 6.5.4-5 4.1 1.6 6.3-5.4-3.5-5.4 3.5 1.6-6.3-5-4.1 6.5-.4z\"/>"),
	none: Nh("<path d=\"M5 12h14\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\" opacity=\"0.35\"/><path d=\"M6 6l12 12\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>"),
	custom: Nh("<path d=\"M5 8h14M5 12h9M5 16h12\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>")
}, Fh = () => [
	["line", K("shape.line")],
	["arrow", K("shape.arrow")],
	["circle", K("shape.circle")],
	["rect", K("shape.rect")],
	["triangle", K("shape.triangle")]
], Ih = () => [
	["accent", K("color.accent")],
	["text", K("color.text")],
	["surface", K("color.surface")],
	["bg", K("color.bg")]
], Lh = [
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
function Rh(e, t, n = "", r = /* @__PURE__ */ new Set()) {
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
			if (Rh(a.children, t, `${e} ${a.text}`, r), r.size > o) {
				r.add(a);
				for (let e of a.children ?? []) e.kind === "row" && !e.text.trim() && r.add(e);
			}
		} else t(`${e} ${a.text}`) && r.add(a);
		i && r.size > o && r.add(i);
	}
	return r;
}
var zh = "button, select, textarea, svg, [popover], .dd, .gridmenu-value, .menu-group-value", Bh = ".row-tool, .cp-clear, [popover] *";
function Vh(e) {
	let t = [], n = (e) => {
		for (let r of e.childNodes) r.nodeType === 3 ? t.push(r.data) : r.nodeType === 1 && !r.matches(zh) && n(r);
	};
	n(e);
	let r = e.getAttribute("title");
	r && t.push(r);
	for (let n of e.querySelectorAll("[title]")) n.matches(Bh) || t.push(n.getAttribute("title"));
	return t.join(" ").replace(/\s+/g, " ").trim();
}
function Hh(e, t = "") {
	let n = [];
	for (let r of e.children) if (!(t && r.matches(t))) {
		if (r.tagName === "DETAILS") {
			let e = r.querySelector(":scope > summary"), t = r.querySelector(":scope > .group-items") ?? r;
			n.push({
				kind: "group",
				el: r,
				text: e ? Vh(e) : "",
				children: Hh(t, "summary")
			});
		} else r.tagName === "HR" ? n.push({
			kind: "rule",
			el: r,
			text: ""
		}) : r.matches(".panel-strong, .mini-label") ? n.push({
			kind: "heading",
			el: r,
			text: Vh(r)
		}) : n.push({
			kind: "row",
			el: r,
			text: Vh(r)
		});
	}
	return n;
}
function Uh(e, t) {
	for (let n of e.children) {
		let e = Hh(n, ".emenu-title, .emenu-none"), r = Rh(e, t), i = (e) => {
			for (let t of e) t.el.classList.toggle("menu-miss", !r.has(t)), t.kind === "group" && (r.has(t) && (t.el.open = !0), i(t.children));
		};
		i(e), n.classList.toggle("menu-empty", !e.some((e) => r.has(e)));
	}
}
function Wh(e, t) {
	return (n) => {
		let r = () => Uh(n, (n) => t(n, e));
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
var Gh = /* @__PURE__ */ R("<i class=\"menu-group-dot\" aria-hidden=\"true\"></i>"), Kh = /* @__PURE__ */ R("<button type=\"button\" class=\"linkish menu-group-reset\"> </button>"), qh = /* @__PURE__ */ R("<details class=\"group menu-group\"><summary><!><span class=\"menu-group-title\"> </span><span class=\"menu-group-value\"> </span></summary> <div class=\"group-items\"><!> <!></div></details>");
function Jh(e, t) {
	it(t, !0);
	let n = ra(t, "reset", 3, null);
	var r = qh(), i = j(r), a = j(i), o = (e) => {
		z(e, Gh());
	};
	V(a, (e) => {
		n() && e(o);
	});
	var s = P(a), c = N(s, !0), l = N(P(s), !0);
	D(i);
	var u = P(i, 2), d = j(u);
	gi(d, () => t.children);
	var f = P(d, 2), p = (e) => {
		var t = Kh(), r = N(t, !0);
		F((e) => B(r, e), [() => K("menu.reset")]), L("click", t, function(...e) {
			n()?.apply(this, e);
		}), z(e, t);
	};
	V(f, (e) => {
		n() && e(p);
	}), D(u), D(r), F((e) => {
		r.open = e, B(c, t.title), B(l, t.value);
	}, [() => vh.has(t.id)]), zr("toggle", r, (e) => {
		e.currentTarget.closest(".emenu-search") || (e.currentTarget.open ? vh.add(t.id) : vh.delete(t.id));
	}), z(e, r), at();
}
Br(["click"]);
//#endregion
//#region src/menu/Placement.svelte
var Yh = /* @__PURE__ */ R("<div class=\"frame-grid\"><label> <input type=\"number\"/></label> <label> <input type=\"number\"/></label></div>"), Xh = /* @__PURE__ */ R("<div class=\"ctl-row\"><span class=\"mini-label\"> </span> <input type=\"range\" step=\"5\"/> <span class=\"gridmenu-value\"> </span> <!></div> <!>", 1), Zh = /* @__PURE__ */ R("<div class=\"ctl-row\"><span class=\"mini-label\"> </span> <input type=\"range\" min=\"1\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div>"), Qh = /* @__PURE__ */ R("<div class=\"pin-line\"><label> <!></label> <!></div> <!>", 1), $h = /* @__PURE__ */ R("<label> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\"/></label> <label> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\"/></label>", 1), eg = /* @__PURE__ */ R("<label> <!></label> <!> <label> <!></label>", 1), tg = /* @__PURE__ */ R("<label> <input type=\"number\" min=\"0\" max=\"400\"/></label>"), ng = /* @__PURE__ */ R("<label> <!></label>"), rg = /* @__PURE__ */ R("<label> <!></label> <!> <!>", 1), ig = /* @__PURE__ */ R("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!>", 1), ag = /* @__PURE__ */ R("<div class=\"frame-grid\"><label> <input type=\"number\" step=\"0.5\"/></label> <label> <input type=\"number\" step=\"1\"/></label> <label> <input type=\"number\" step=\"0.5\" min=\"1\"/></label> <label> <input type=\"number\" step=\"1\" min=\"1\"/></label> <label> <input type=\"number\" step=\"1\"/></label> <label> <input type=\"number\" step=\"1\"/></label></div>"), og = /* @__PURE__ */ R("<!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), sg = /* @__PURE__ */ R("<label> <!></label> <!>", 1), cg = /* @__PURE__ */ R("<!> <!> <!> <div class=\"pin-line\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div> <!> <!> <!>", 1);
function lg(e, t) {
	it(t, !0);
	let n = (e) => {
		var t = Xh(), n = M(t), r = j(n), i = N(r, !0), a = P(r, 2);
		U(a);
		var o = P(a, 2), l = N(o);
		wh(P(o, 2), { id: "size" }), D(n);
		var u = P(n, 2), d = (e) => {
			var t = Yh(), n = j(t), r = j(n, !0), i = P(r);
			U(i), D(n);
			var a = P(n, 2), o = j(a, !0), s = P(o);
			U(s), D(a), D(t), F((e, t, c, l, u, d) => {
				G(n, "title", e), B(r, t), G(i, "min", Fs.min), G(i, "max", Fs.max), W(i, c), G(a, "title", l), B(o, u), G(s, "min", Fs.min), G(s, "max", Fs.max), W(s, d);
			}, [
				() => K("tip.scaleMin"),
				() => K("lbl.scaleMin"),
				() => Ls(I(c)).min,
				() => K("tip.scaleMax"),
				() => K("lbl.scaleMax"),
				() => Ls(I(c)).max
			]), L("change", i, (e) => g("sizeMin", e.target.value)), L("change", s, (e) => g("sizeMax", e.target.value)), z(e, t);
		}, f = /* @__PURE__ */ O(() => Is(I(c)) !== 1);
		V(u, (e) => {
			I(f) && e(d);
		}), F((e, t, r, o, s) => {
			G(n, "title", e), B(i, t), G(a, "min", Ps.min * 100), G(a, "max", Ps.max * 100), W(a, r), G(a, "aria-label", o), B(l, `${s ?? ""} %`);
		}, [
			() => K("tip.scale"),
			() => K("lbl.scale"),
			() => Math.round(Is(I(c)) * 100),
			() => K("lbl.scale"),
			() => Math.round(Is(I(c)) * 100)
		]), L("input", a, (e) => h(e.target.valueAsNumber / 100)), L("change", a, function(...e) {
			s.endSizeGesture?.apply(this, e);
		}), z(e, t);
	}, r = (e) => {
		var t = Qh(), n = M(t), r = j(n), i = j(r), a = P(i);
		{
			let e = /* @__PURE__ */ O(() => I(c).fit ?? "wrap"), t = /* @__PURE__ */ O(() => Ms.has(I(c).type) ? [["wrap", K("opt.fit.fluid")], ["shrink", K("opt.fit.floor")]] : [
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
		D(r), wh(P(r, 2), { id: "fit" }), D(n);
		var o = P(n, 2), s = (e) => {
			var t = Zh(), n = j(t), r = N(n, !0), i = P(n, 2);
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
		var t = eg(), n = M(t), r = j(n), i = P(r);
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
			var t = $h(), n = M(t), r = j(n), i = P(r);
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
			var t = ig(), n = M(t), r = j(n);
			U(r);
			var i = P(r);
			D(n);
			var a = P(n, 2), o = (e) => {
				var t = rg(), n = M(t), r = j(n), i = P(r);
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
					var t = tg(), n = j(t), r = P(n);
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
					var t = ng(), n = j(t), r = P(n);
					{
						let e = /* @__PURE__ */ O(() => I(c).sticky.dock ?? "bottom-right"), t = /* @__PURE__ */ O(() => Lh.map(([e, t]) => [e, K(t)]));
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
					var t = ng(), n = j(t), r = P(n);
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
		var t = og(), n = M(t), r = (e) => {
			var t = ag(), n = j(t), r = j(n, !0), i = P(r);
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
	var ie = cg(), ae = M(ie), oe = (e) => {
		var t = sg(), n = M(t), r = j(n), i = P(r);
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
			var n = ng(), r = j(n), i = P(r);
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
	}, se = /* @__PURE__ */ O(() => Os.has(I(c).type));
	V(ae, (e) => {
		I(se) && e(oe);
	});
	var ce = P(ae, 2), le = (e) => {
		n(e);
	}, ue = /* @__PURE__ */ O(() => !Ns.has(I(c).type));
	V(ce, (e) => {
		I(ue) && e(le);
	});
	var de = P(ce, 2);
	r(de);
	var fe = P(de, 2), pe = j(fe), me = j(pe);
	U(me);
	var he = P(me);
	D(pe), wh(P(pe, 2), { id: "phone" }), D(fe);
	var ge = P(fe, 2);
	a(ge);
	var _e = P(ge, 2);
	{
		let e = /* @__PURE__ */ O(() => K("group.motion")), t = /* @__PURE__ */ O(ne);
		Jh(_e, {
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
		Jh(ve, {
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
var ug = /* @__PURE__ */ R("<label> <!></label>"), dg = /* @__PURE__ */ R("<label> <!></label> <label> <span class=\"num-stepper\"><button type=\"button\">−</button> <input type=\"number\" min=\"1\" max=\"12\" step=\"1\"/> <button type=\"button\">+</button></span></label>", 1), fg = /* @__PURE__ */ R("<label> <!></label> <label> <!></label> <!> <label> <!></label> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1);
function pg(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { setBoxStyle: i, themeSwatches: a } = n, o = /* @__PURE__ */ O(() => I(r).props.boxStyle ?? {});
	var s = fg(), c = M(s), l = j(c), u = P(l);
	{
		let e = /* @__PURE__ */ O(() => I(o).bg ?? ""), t = /* @__PURE__ */ O(a), n = /* @__PURE__ */ O(() => K("tip.box.bg"));
		Uc(u, {
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
		var t = ug(), n = j(t), r = P(n);
		{
			let e = /* @__PURE__ */ O(() => I(o).shadowColor ?? ""), t = /* @__PURE__ */ O(a), n = /* @__PURE__ */ O(() => K("tip.box.shadowColor"));
			Uc(r, {
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
		var n = dg(), r = M(n), s = j(r), c = P(s);
		{
			let e = /* @__PURE__ */ O(a), n = /* @__PURE__ */ O(() => K("tip.box.borderColor"));
			Uc(c, {
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
function mg(e, t) {
	let n = (t) => Object.entries(t).filter(([t, n]) => e()[t] !== void 0 && JSON.stringify(e()[t]) !== JSON.stringify(n));
	return {
		groupReset: (e, r) => n(r).length ? () => t(e, { ...r }) : null,
		groupChanged: (e) => n(e).length
	};
}
//#endregion
//#region src/menu/families/Text.svelte
var hg = /* @__PURE__ */ R("<p class=\"panel-hint\"> </p>"), gg = /* @__PURE__ */ R("<div class=\"pin-line\"><label> <!></label> <!></div>"), _g = /* @__PURE__ */ R("<div class=\"pin-line\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div> <!>", 1), vg = /* @__PURE__ */ R("<!> <!>", 1);
function yg(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { setBlockProp: i, setBlockProps: a } = n, { groupReset: o, groupChanged: s } = mg(() => I(r).props, a);
	var c = Yr(), l = M(c), u = (e) => {
		var t = hg(), n = N(t, !0);
		F((e) => B(n, e), [() => K("hint.textInline")]), z(e, t);
	}, d = (e) => {
		let t = (e) => {
			var t = gg(), n = j(t), a = j(n), o = P(a);
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
			D(n), wh(P(n, 2), { id: "align" }), D(t), F((e) => B(a, `${e ?? ""} `), [() => K("lbl.align")]), z(e, t);
		}, n = (e) => {
			var t = _g(), n = M(t), a = j(n), o = j(a);
			U(o);
			var s = P(o);
			D(a), wh(P(a, 2), { id: "textBox" }), D(n);
			var c = P(n, 2), l = (e) => {
				pg(e, {});
			};
			V(c, (e) => {
				I(r).props.box && e(l);
			}), F((e, t) => {
				Vi(o, e), B(s, ` ${t ?? ""}`);
			}, [() => !!I(r).props.box, () => K("lbl.textBoxToggle")]), L("change", o, (e) => i("box", e.target.checked)), z(e, t);
		};
		var a = vg(), s = M(a);
		{
			let e = /* @__PURE__ */ O(() => K("lbl.align")), n = /* @__PURE__ */ O(() => ({
				left: K("common.left"),
				center: K("common.center"),
				right: K("common.right")
			})[I(r).props.align ?? "left"]), i = /* @__PURE__ */ O(() => o("text-align", { align: "left" }));
			Jh(s, {
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
			Jh(c, {
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
var bg = /* @__PURE__ */ R("<input/>"), xg = /* @__PURE__ */ R("<label> <input/></label> <div class=\"pin-line\"><label> <!></label> <!></div> <!>", 1), Sg = /* @__PURE__ */ R("<div class=\"pin-line\"><label> <!></label> <!></div>");
function Cg(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { setBlockProp: i, setBlockProps: a, buttonTargets: o, setButtonTarget: s } = n, { groupReset: c, groupChanged: l } = mg(() => I(r).props, a);
	var u = Yr(), d = M(u), f = (e) => {
		let t = (e) => {
			var t = xg(), n = M(t), a = j(n), c = P(a);
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
			D(u), wh(P(u, 2), { id: "goesTo" }), D(l);
			var p = P(l, 2), m = (e) => {
				var t = bg();
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
			Jh(e, {
				id: "btn-link",
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
			var t = Sg(), n = j(t), a = j(n), o = P(a);
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
			D(n), wh(P(n, 2), { id: "btnStyle" }), D(t), F((e) => B(a, `${e ?? ""} `), [() => K("lbl.style")]), z(e, t);
		};
		{
			let n = /* @__PURE__ */ O(() => K("group.appearance")), i = /* @__PURE__ */ O(() => I(r).props.style === "secondary" ? K("opt.btn.secondary") : K("opt.btn.primary")), a = /* @__PURE__ */ O(() => c("btn-look", { style: "primary" }));
			Jh(e, {
				id: "btn-look",
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
var wg = /* @__PURE__ */ R("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <label> <input/></label>", 1), Tg = /* @__PURE__ */ R("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), Eg = /* @__PURE__ */ R("<label> <input/></label> <!>", 1), Dg = /* @__PURE__ */ R("<!> <!>", 1), Og = /* @__PURE__ */ R("<div class=\"pin-line\"><label> <!></label> <!></div> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.01\"/> <button type=\"button\" class=\"linkish\"> </button>", 1), kg = /* @__PURE__ */ R("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.01\"/>", 1), Ag = /* @__PURE__ */ R("<div class=\"pin-line\"><label> <!></label> <!></div>"), jg = /* @__PURE__ */ R("<!> <!> <!>", 1);
function Mg(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, setBlockProps: o, openImageEditor: s, compressOrTrim: c, imageErrorText: l, setStatus: u } = n, { groupReset: d, groupChanged: f } = mg(() => I(r).props, o);
	async function p(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await c(t);
			i(`edit:${I(r).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || im(t.name).replaceAll("-", " ");
			});
		} catch (e) {
			u(l(e), "error");
		}
	}
	var m = Yr(), h = M(m), g = (e) => {
		let t = (e) => {
			var t = wg(), n = M(t), i = j(n), o = P(i);
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
			var t = Eg(), n = M(t), i = j(n), o = P(i);
			U(o), D(n);
			var s = P(n, 2), c = (e) => {
				var t = Tg(), n = j(t);
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
		var i = Dg(), o = M(i);
		{
			let e = /* @__PURE__ */ O(() => K("blocks.image")), n = /* @__PURE__ */ O(() => I(r).props.alt || K("menu.noAlt"));
			Jh(o, {
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
			Jh(s, {
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
			var t = Og(), n = M(t), i = j(n), o = j(i), c = P(o);
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
			D(i), wh(P(i, 2), { id: "imgFit" }), D(n);
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
			var t = kg(), n = M(t), i = j(n), o = N(P(i));
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
			var t = Ag(), n = j(t), i = j(n), o = P(i);
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
			D(n), wh(P(n, 2), { id: "radius" }), D(t), F((e) => B(i, `${e ?? ""} `), [() => K("lbl.radius")]), z(e, t);
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
		var l = jg(), u = M(l);
		{
			let e = /* @__PURE__ */ O(() => K("group.crop")), n = /* @__PURE__ */ O(() => I(o) ? K("menu.changed", { n: I(o) }) : K("menu.standard")), r = /* @__PURE__ */ O(() => d("img-crop", {
				fit: "cover",
				x: .5,
				y: .5,
				zoom: 1
			}));
			Jh(u, {
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
			Jh(p, {
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
			Jh(m, {
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
var Ng = /* @__PURE__ */ R("<label> </label> <input/>", 1), Pg = /* @__PURE__ */ R("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"video/mp4,video/webm\"/></label> <label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label>", 1), Fg = /* @__PURE__ */ R("<div class=\"pin-line\"><!> <!></div> <!>", 1), Ig = /* @__PURE__ */ R("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), Lg = /* @__PURE__ */ R("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!>", 1), Rg = /* @__PURE__ */ R("<label> <input/></label>"), zg = /* @__PURE__ */ R("<!> <!> <!>", 1);
function Bg(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { setBlockProp: i, setBlockProps: a, setBlockVideoFile: o, setBlockVideoPoster: s } = n, { groupReset: c, groupChanged: l } = mg(() => I(r).props, a);
	var u = Yr(), d = M(u), f = (e) => {
		let t = (e) => {
			var t = Fg(), n = M(t), a = j(n);
			{
				let e = /* @__PURE__ */ O(() => K("lbl.videoSource")), t = /* @__PURE__ */ O(() => [["embed", K("opt.videoSource.embed")], ["file", K("opt.videoSource.file")]]);
				jl(a, {
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
			wh(P(a, 2), { id: "videoSource" }), D(n);
			var c = P(n, 2), l = (e) => {
				var t = Ng(), n = M(t), a = N(n, !0), o = P(n, 2);
				U(o), F((e, t, i) => {
					G(n, "title", e), B(a, t), W(o, I(r).props.url ?? ""), G(o, "placeholder", i);
				}, [
					() => K("hint.video"),
					() => K("lbl.videoUrl"),
					() => K("ph.videoUrl")
				]), L("change", o, (e) => i("url", e.target.value)), z(e, t);
			}, d = (e) => {
				var t = Pg(), n = M(t), i = j(n), a = P(i);
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
			var t = Lg(), n = M(t), o = j(n);
			U(o);
			var s = P(o);
			D(n);
			var c = P(n, 2), l = j(c);
			U(l);
			var u = P(l);
			D(c);
			var d = P(c, 2), f = (e) => {
				var t = Ig(), n = j(t);
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
			var t = Rg(), n = j(t), a = P(n);
			U(a), D(t), F((e) => {
				B(n, `${e ?? ""} `), W(a, I(r).props.title ?? "");
			}, [() => K("lbl.videoTitle")]), L("change", a, (e) => i("title", e.target.value)), z(e, t);
		}, u = /* @__PURE__ */ O(() => I(r).props.source === "file" ? "file" : "embed");
		var d = zg(), f = M(d);
		{
			let e = /* @__PURE__ */ O(() => K("lbl.videoSource")), n = /* @__PURE__ */ O(() => I(u) === "file" ? K("opt.videoSource.file") : K("opt.videoSource.embed"));
			Jh(f, {
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
				Jh(e, {
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
			Jh(h, {
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
//#region ../template/assets/engine/0.7.4/glyphs.js
var Vg = "urd-recent-glyphs", Hg = "urd-recent-icons", Ug = [
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
function Wg(e, t) {
	return [t, ...(Array.isArray(e) ? e : []).filter((e) => e !== t)].slice(0, 16);
}
var Gg = (e) => {
	try {
		let t = JSON.parse(localStorage.getItem(e) ?? "[]");
		return Array.isArray(t) ? t : [];
	} catch {
		return [];
	}
}, Kg = (e, t, n) => {
	let r = Wg(t, n);
	try {
		localStorage.setItem(e, JSON.stringify(r));
	} catch {}
	return r;
};
function qg() {
	return Gg(Vg);
}
function Jg(e) {
	return Kg(Vg, qg(), e);
}
function Yg() {
	return Gg(Hg);
}
function Xg(e) {
	return Kg(Hg, Yg(), e);
}
//#endregion
//#region src/lib/GlyphPicker.svelte
var Zg = /* @__PURE__ */ R("<button type=\"button\"><span class=\"gp-svg svelte-15ln1c3\"></span></button>"), Qg = /* @__PURE__ */ R("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), $g = /* @__PURE__ */ R("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"><!> <!></div>", 1), e_ = /* @__PURE__ */ R("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), t_ = /* @__PURE__ */ R("<button type=\"button\"> </button>"), n_ = /* @__PURE__ */ R("<div class=\"gp-group svelte-15ln1c3\"> </div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\"> </button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\"> </p>", 1), r_ = /* @__PURE__ */ R("<!> <!> <!> <!>", 1), i_ = /* @__PURE__ */ R("<img class=\"gp-own svelte-15ln1c3\"/>"), a_ = /* @__PURE__ */ R("<span class=\"gp-svg svelte-15ln1c3\"></span>"), o_ = /* @__PURE__ */ R("<div class=\"gp-pop gp-anchored svelte-15ln1c3\" popover=\"auto\"><!></div>"), s_ = /* @__PURE__ */ R("<div class=\"gp-pop svelte-15ln1c3\"><!></div>"), c_ = /* @__PURE__ */ R("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"><!></button> <!></span>");
function l_(e, t) {
	it(t, !0);
	let n = (e) => {
		var n = r_(), a = M(n), o = (e) => {
			var t = $g(), n = M(t), r = N(n, !0), a = P(n, 2), o = j(a);
			ui(o, 16, () => I(d), (e) => e, (e, t) => {
				var n = Zg();
				let r;
				var a = j(n);
				H(a, () => Jc(t), !0), D(a), D(n), F((e) => {
					r = Pi(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, r, { active: t === i() }), G(n, "title", e);
				}, [() => K(Kc[t].labelKey)]), L("click", n, () => C(t)), z(e, n);
			}), ui(P(o, 2), 16, () => I(u), (e) => e, (e, t) => {
				var n = Qg(), r = N(n, !0);
				F(() => B(r, t)), L("click", n, () => S(t)), z(e, n);
			}), D(a), F((e) => B(r, e), [() => K("common.recent")]), z(e, t);
		};
		V(a, (e) => {
			(I(u).length || I(d).length) && e(o);
		});
		var s = P(a, 2), c = (e) => {
			var t = Yr();
			ui(M(t), 17, () => qc, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ O(() => g(I(t), 2));
				let r = () => I(n)[0], a = () => I(n)[1];
				var o = e_(), s = M(o), c = N(s, !0), l = P(s, 2);
				ui(l, 20, a, (e) => e, (e, t) => {
					var n = Zg();
					let r;
					var a = j(n);
					H(a, () => Jc(t), !0), D(a), D(n), F((e) => {
						r = Pi(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, r, { active: t === i() }), G(n, "title", e);
					}, [() => K(Kc[t].labelKey)]), L("click", n, () => C(t)), z(e, n);
				}), D(l), F((e) => B(c, e), [() => K(r())]), z(e, o);
			}), z(e, t);
		};
		V(s, (e) => {
			t.onicon && e(c);
		});
		var l = P(s, 2);
		ui(l, 17, () => Ug, ([e, t]) => e, (e, t) => {
			var n = /* @__PURE__ */ O(() => g(I(t), 2));
			let i = () => I(n)[0], a = () => I(n)[1];
			var o = e_(), s = M(o), c = N(s, !0), l = P(s, 2);
			ui(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var n = t_();
				let i;
				var a = N(n, !0);
				F(() => {
					i = Pi(n, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === r() }), B(a, t);
				}), L("click", n, () => S(t)), z(e, n);
			}), D(l), F((e) => B(c, e), [() => K(i())]), z(e, o);
		});
		var f = P(l, 2), p = (e) => {
			var t = n_(), n = M(t), r = N(n, !0), i = P(n, 2), a = N(i, !0), o = P(i, 2);
			Zi(o, (e) => A(m, e), () => I(m));
			var s = N(P(o, 2), !0);
			F((e, t, n) => {
				B(r, e), B(a, t), B(s, n);
			}, [
				() => K("gp.ownIcon"),
				() => K("gp.upload"),
				() => K("gp.uploadHint")
			]), L("click", i, () => I(m).click()), L("change", o, w), z(e, t);
		};
		V(f, (e) => {
			t.onimage && e(p);
		}), z(e, n);
	}, r = ra(t, "value", 3, "★"), i = ra(t, "icon", 3, null), a = ra(t, "image", 3, null), o = ra(t, "label", 19, () => K("gp.pickGlyph")), s = Ta(), c = Da("urd-gp"), l = c.slice(2), u = /* @__PURE__ */ k(pn([])), d = /* @__PURE__ */ k(pn([])), f = /* @__PURE__ */ k(null), p = /* @__PURE__ */ k(null), m = /* @__PURE__ */ k(null), h = /* @__PURE__ */ k(!1), _ = /* @__PURE__ */ k(pn({
		top: 0,
		left: 0
	}));
	function v() {
		A(u, qg(), !0), A(d, t.onicon ? Yg().filter((e) => Kc[e]) : [], !0);
	}
	function y(e) {
		A(h, e.newState === "open"), Oa(I(f), I(h)), I(h) && v();
	}
	function b() {
		s && I(p)?.hidePopover(), A(h, !1);
	}
	function x() {
		v();
		let e = I(f).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		A(_, {
			top: n,
			left: t
		}, !0), A(h, !0);
	}
	function S(e) {
		Jg(e), t.onpick?.(e), b();
	}
	function C(e) {
		Xg(e), t.onicon?.(e), b();
	}
	async function w(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", n) {
			try {
				let e = await Zp(n, 256, { still: !0 });
				t.onimage?.(e.dataUrl);
			} catch (e) {
				console.warn("Urd: the icon could not be read", e);
			}
			b();
		}
	}
	Nn(() => {
		if (!I(h)) return;
		let e = () => b();
		if (window.addEventListener("blur", e), s) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			I(f) && !I(f).contains(e.target) && A(h, !1);
		}, n = (e) => {
			e.key === "Escape" && A(h, !1);
		}, r = (e) => {
			I(f) && e.target instanceof Node && !I(f).contains(e.target) && A(h, !1);
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var T = c_(), E = j(T), ee = j(E), te = (e) => {
		var t = i_();
		F((e) => {
			G(t, "src", a()), G(t, "alt", e);
		}, [() => K("gp.ownIcon")]), z(e, t);
	}, ne = (e) => {
		var t = a_();
		H(t, () => Jc(i()), !0), D(t), z(e, t);
	}, re = (e) => {
		var t = Jr();
		F(() => B(t, r() || "★")), z(e, t);
	};
	V(ee, (e) => {
		a() ? e(te) : i() && Kc[i()] ? e(ne, 1) : e(re, -1);
	}), D(E);
	var ie = P(E, 2), ae = (e) => {
		var t = o_(), r = j(t), i = (e) => {
			n(e);
		};
		V(r, (e) => {
			I(h) && e(i);
		}), D(t), Zi(t, (e) => A(p, e), () => I(p)), F(() => {
			G(t, "id", l), Ii(t, `position-anchor: ${c ?? ""}`);
		}), zr("toggle", t, y), z(e, t);
	}, oe = (e) => {
		var t = s_(), r = j(t);
		n(r), D(t), F(() => Ii(t, `top: ${I(_).top ?? ""}px; left: ${I(_).left ?? ""}px`)), z(e, t);
	};
	V(ie, (e) => {
		s ? e(ae) : I(h) && e(oe, 1);
	}), D(T), Zi(T, (e) => A(f, e), () => I(f)), F(() => {
		G(E, "title", o()), G(E, "aria-label", o()), G(E, "popovertarget", s ? l : void 0), Ii(E, s ? `anchor-name: ${c}` : void 0);
	}), L("click", E, function(...e) {
		(s ? void 0 : () => I(h) ? A(h, !1) : x())?.apply(this, e);
	}), z(e, T), at();
}
Br(["click", "change"]);
//#endregion
//#region src/menu/families/Icon.svelte
var u_ = /* @__PURE__ */ R("<input class=\"token-input\" maxlength=\"4\"/>"), d_ = /* @__PURE__ */ R("<button class=\"ghost\"> </button>"), f_ = /* @__PURE__ */ R("<span class=\"toolbar-row\"><img class=\"site-icon-preview\"/> <button class=\"ghost\"> </button></span>"), p_ = /* @__PURE__ */ R("<label> <span class=\"toolbar-row\"><!> <!></span></label> <!>", 1), m_ = /* @__PURE__ */ R("<div class=\"pin-line\"><label> <input type=\"number\" min=\"8\" max=\"400\"/></label> <!></div> <div class=\"pin-line\"><label> <!></label> <!></div>", 1);
function h_(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, setBlockProps: o, themeSwatches: s } = n, { groupReset: c, groupChanged: l } = mg(() => I(r).props, o);
	var u = Yr(), d = M(u), f = (e) => {
		let t = (e) => {
			var t = p_(), n = M(t), o = j(n), s = P(o), c = j(s);
			{
				let e = /* @__PURE__ */ O(() => I(r).props.glyph ?? "★"), t = /* @__PURE__ */ O(() => I(r).props.icon ?? null), n = /* @__PURE__ */ O(() => I(r).props.image ?? null);
				l_(c, {
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
				var t = u_();
				U(t), F((e) => {
					W(t, I(r).props.glyph ?? ""), G(t, "title", e);
				}, [() => K("tip.icon.typeGlyph")]), L("change", t, (e) => a("glyph", e.target.value || "★")), z(e, t);
			}, d = (e) => {
				var t = d_(), n = N(t, !0);
				F((e, r) => {
					G(t, "title", e), B(n, r);
				}, [() => K("tip.icon.backToGlyph"), () => K("ui.removeDrawnIcon")]), L("click", t, () => a("icon", null)), z(e, t);
			};
			V(l, (e) => {
				I(r).props.icon ? e(d, -1) : e(u);
			}), D(s), D(n);
			var f = P(n, 2), p = (e) => {
				var t = f_(), n = j(t), i = P(n, 2), o = N(i, !0);
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
			Jh(e, {
				id: "icon-icon",
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
			var t = m_(), n = M(t), i = j(n), o = j(i), c = P(o);
			U(c), D(i), wh(P(i, 2), { id: "iconSize" }), D(n);
			var l = P(n, 2), u = j(l), d = j(u), f = P(d);
			{
				let e = /* @__PURE__ */ O(() => I(r).props.color ?? "accent"), t = /* @__PURE__ */ O(s);
				Uc(f, {
					get value() {
						return I(e);
					},
					get tokens() {
						return I(t);
					},
					onchange: (e) => a("color", e)
				});
			}
			D(u), wh(P(u, 2), { id: "iconColor" }), D(l), F((e, t, n) => {
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
			Jh(e, {
				id: "icon-look",
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
var g_ = /* @__PURE__ */ R("<label> <input/></label>"), __ = /* @__PURE__ */ R("<label> <!></label> <!>", 1), v_ = /* @__PURE__ */ R("<div class=\"pin-line\"><label> <!></label> <!></div> <div class=\"pin-line\"><label> <input type=\"number\" min=\"1\" max=\"40\"/></label> <!></div> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), y_ = /* @__PURE__ */ R("<label> <input type=\"number\" min=\"4\" step=\"1\"/></label>"), b_ = /* @__PURE__ */ R("<label> <input type=\"number\" min=\"1\" step=\"0.5\"/></label>"), x_ = /* @__PURE__ */ R("<!> <!>", 1);
function S_(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { setBlockProp: i, setBlockProps: a, setBlockFrame: o, designWidth: s, shapePx: c, setShapeSizePx: l } = n, { groupReset: u, groupChanged: d } = mg(() => I(r).props, a);
	var f = Yr(), p = M(f), m = (e) => {
		let t = (e) => {
			var t = __(), n = M(t), a = j(n), o = P(a);
			{
				let e = /* @__PURE__ */ O(Fh);
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
				var t = g_(), n = j(t), a = P(n);
				U(a), D(t), F((e, i) => {
					G(t, "title", e), B(n, `${i ?? ""} `), W(a, I(r).props.label ?? "");
				}, [() => K("tip.shape.label"), () => K("lbl.shapeLabel")]), L("change", a, (e) => i("label", e.target.value.trim() || void 0)), z(e, t);
			};
			V(s, (e) => {
				I(r).props.kind === "line" && e(c);
			}), F((e) => B(a, `${e ?? ""} `), [() => K("blocks.shape")]), z(e, t);
		};
		{
			let n = /* @__PURE__ */ O(() => K("blocks.shape")), i = /* @__PURE__ */ O(() => Fh().find(([e]) => e === I(r).props.kind)?.[1] ?? "");
			Jh(e, {
				id: "shape-shape",
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
			var t = v_(), n = M(t), a = j(n), o = j(a), s = P(o);
			{
				let e = /* @__PURE__ */ O(Ih);
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
			D(a), wh(P(a, 2), { id: "shapeColor" }), D(n);
			var c = P(n, 2), l = j(c), u = j(l), d = P(u);
			U(d), D(l), wh(P(l, 2), { id: "thickness" }), D(c);
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
				var t = y_(), n = j(t), i = P(n);
				U(i), D(t), F((e, r, a, o) => {
					G(t, "title", e), B(n, `${r ?? ""} `), G(i, "max", a), W(i, o);
				}, [
					() => K("tip.shapeSize"),
					() => K("lbl.length"),
					() => c(100 - I(r).frame.x),
					() => c(I(r).frame.w)
				]), L("change", i, (e) => l(Number(e.target.value), !1)), z(e, t);
			}, a = /* @__PURE__ */ O(() => (I(r).props.kind === "line" || I(r).props.kind === "arrow") && s()), u = (e) => {
				var t = b_(), n = j(t), i = P(n);
				U(i), D(t), F((e, t) => {
					B(n, `${e ?? ""} `), G(i, "max", t), W(i, I(r).frame.w);
				}, [() => K("lbl.length"), () => Math.max(1, Math.round(100 - I(r).frame.x))]), L("change", i, (e) => o("w", Math.max(1, Math.min(Number(e.target.value), 100 - I(r).frame.x)))), z(e, t);
			}, d = (e) => {
				var t = y_(), n = j(t), i = P(n);
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
		var d = x_(), f = M(d);
		{
			let e = /* @__PURE__ */ O(() => K("group.strokeFill")), n = /* @__PURE__ */ O(() => `${Ih().find(([e]) => e === I(r).props.color)?.[1] ?? ""} · ${I(r).props.thickness ?? 2} px`), i = /* @__PURE__ */ O(() => u("shape-stroke", {
				color: "accent",
				thickness: 2,
				fill: null
			}));
			Jh(f, {
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
				Jh(e, {
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
var C_ = /* @__PURE__ */ R("<div class=\"bg-layer\"><span class=\"toolbar-row\"><img class=\"site-icon-preview\" alt=\"\"/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span> <label> <input/></label> <label> <input/></label></div>"), w_ = /* @__PURE__ */ R("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\" multiple=\"\"/></label> <!>", 1), T_ = /* @__PURE__ */ R("<div class=\"pin-line\"><label> <input type=\"number\" min=\"1\" max=\"6\"/></label> <!></div> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\"/>", 1), E_ = /* @__PURE__ */ R("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" step=\"10\"/> <span class=\"gridmenu-value\"> </span></div> <button type=\"button\" class=\"ghost action\"><!> </button>", 1), D_ = /* @__PURE__ */ R("<button type=\"button\" class=\"ghost action\"><!> </button>"), O_ = /* @__PURE__ */ R("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div> <!> <label> <!></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), k_ = /* @__PURE__ */ R("<label> <input type=\"number\" min=\"2\" max=\"60\"/></label>"), A_ = /* @__PURE__ */ R("<div class=\"pin-line\"><label> <!></label> <!></div> <!> <!> <!> <!> <!>", 1), j_ = /* @__PURE__ */ R("<!> <!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"10\" max=\"300\" step=\"5\"/> <span class=\"gridmenu-value\"> </span></div> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"60\" max=\"800\" step=\"10\"/> <span class=\"gridmenu-value\"> </span></div> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\"/> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), M_ = /* @__PURE__ */ R("<label> <!></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), N_ = /* @__PURE__ */ R("<!> <!> <!>", 1);
function P_(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { setBlockProp: i, setBlockProps: a, setBlockFrame: o, addGalleryImages: s, moveGalleryImage: c, removeGalleryImage: l, setGalleryImageField: u, themeSwatches: d, newSeed: f } = n, { groupReset: p, groupChanged: m } = mg(() => I(r).props, a);
	var h = Yr(), g = M(h), _ = (e) => {
		let t = (e) => {
			var t = w_(), n = M(t), i = j(n), a = P(i);
			D(n), ui(P(n, 2), 17, () => I(r).props.images ?? [], oi, (e, t, n) => {
				var i = C_(), a = j(i), o = j(a), s = P(o, 2), d = j(s);
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
			Jh(e, {
				id: "gallery-images",
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
			var t = A_(), n = M(t), a = j(n), o = j(a), c = P(o);
			{
				let e = /* @__PURE__ */ O(() => Ql.map((e) => [e, K(`opt.galleryView.${e}`)]));
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
			D(a), wh(P(a, 2), { id: "galleryView" }), D(n);
			var l = P(n, 2), u = (e) => {
				{
					let t = /* @__PURE__ */ O(() => K("lbl.ribbonWidth")), n = /* @__PURE__ */ O(() => Dh(I(r).props.width)), a = /* @__PURE__ */ O(Eh);
					jl(e, {
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
				var t = T_(), n = M(t), a = j(n), o = j(a), s = P(o);
				U(s), D(a), wh(P(a, 2), { id: "columns" }), D(n);
				var c = P(n, 2), l = j(c), u = N(P(l));
				D(c);
				var d = P(c, 2);
				U(d), F((e, t) => {
					B(o, `${e ?? ""} `), W(s, I(r).props.columns ?? 3), B(l, `${t ?? ""} `), B(u, `${I(r).props.gap ?? 12 ?? ""} px`), W(d, I(r).props.gap ?? 12);
				}, [() => K("lbl.columns"), () => K("lbl.imageGap")]), L("change", s, (e) => i("columns", Number(e.target.value))), L("input", d, (e) => i("gap", Number(e.target.value))), z(e, t);
			}, h = /* @__PURE__ */ O(() => $l.includes(I(s)));
			V(p, (e) => {
				I(h) && e(m);
			});
			var g = P(p, 2), _ = (e) => {
				var t = E_(), n = M(t), a = j(n), o = N(a, !0), s = P(a, 2);
				U(s);
				var c = N(P(s, 2));
				D(n);
				var l = P(n, 2), u = j(l);
				H(u, () => q.shuffle);
				var d = P(u);
				D(l), F((e, t, i, a) => {
					G(n, "title", e), B(o, t), G(s, "min", eu.min), G(s, "max", eu.max), W(s, I(r).props.rowHeight ?? eu.dflt), B(c, `${I(r).props.rowHeight ?? eu.dflt ?? ""} px`), G(l, "title", i), B(d, ` ${a ?? ""}`);
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
				var t = O_(), n = M(t), a = j(n), o = N(a, !0), s = P(a, 2);
				U(s);
				var c = N(P(s, 2));
				D(n);
				var l = P(n, 2), u = (e) => {
					var t = D_(), n = j(t);
					H(n, () => q.shuffle);
					var r = P(n);
					D(t), F((e, n) => {
						G(t, "title", e), B(r, ` ${n ?? ""}`);
					}, [() => K("tip.gallery.shuffleTilt"), () => K("ui.shufflePhotos")]), L("click", t, () => i("seed", f())), z(e, t);
				};
				V(l, (e) => {
					(I(r).props.tilt ?? tu.dflt) > 0 && e(u);
				});
				var p = P(l, 2), m = j(p), h = P(m);
				{
					let e = /* @__PURE__ */ O(() => I(r).props.frameColor || "#ffffff"), t = /* @__PURE__ */ O(d), n = /* @__PURE__ */ O(() => K("tip.gallery.frameColor"));
					Uc(h, {
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
					G(n, "title", e), B(o, t), G(s, "min", tu.min), G(s, "max", tu.max), W(s, I(r).props.tilt ?? tu.dflt), B(c, `${I(r).props.tilt ?? tu.dflt ?? ""}°`), G(p, "title", i), B(m, `${a ?? ""} `), G(g, "title", l), Vi(_, I(r).props.captions === !0), B(v, ` ${u ?? ""}`);
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
				var t = k_(), n = j(t), a = P(n);
				U(a), D(t), F((e) => {
					B(n, `${e ?? ""} `), W(a, I(r).props.interval ?? 5);
				}, [() => K("lbl.secondsPerImage")]), L("change", a, (e) => i("interval", Number(e.target.value))), z(e, t);
			};
			V(b, (e) => {
				I(s) === "slides" && e(x);
			}), F((e) => B(o, `${e ?? ""} `), [() => K("lbl.view")]), z(e, t);
		}, n = (e) => {
			var t = j_(), n = M(t);
			{
				let e = /* @__PURE__ */ O(() => K("lbl.ribbonRows")), t = /* @__PURE__ */ O(() => String(I(r).props.rows ?? 1)), a = /* @__PURE__ */ O(() => [["1", K("opt.ribbonRows.one")], ["2", K("opt.ribbonRows.two")]]);
				jl(n, {
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
				jl(a, {
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
				jl(w, {
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
			var t = M_(), n = M(t), a = j(n), o = P(a);
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
		}, s = /* @__PURE__ */ O(() => nu(I(r).props.view));
		var c = N_(), l = M(c);
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
			Jh(l, {
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
				Jh(e, {
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
			Jh(h, {
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
var F_ = /* @__PURE__ */ R("<span class=\"nav-line\"><input/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span>"), I_ = /* @__PURE__ */ R("<!> <button class=\"ghost action\"> </button>", 1), L_ = /* @__PURE__ */ R("<button type=\"button\"></button>"), R_ = /* @__PURE__ */ R("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <input class=\"field-filled\"/></label>"), z_ = /* @__PURE__ */ R("<div class=\"ctl-field\"><span class=\"mini-label\"> </span> <div class=\"tile-grid cols-6\" role=\"group\"></div></div> <!>", 1), B_ = /* @__PURE__ */ R("<!> <!>", 1), V_ = /* @__PURE__ */ R("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"0.5\" max=\"10\" step=\"0.5\"/> <span class=\"gridmenu-value\"> </span></div>"), H_ = /* @__PURE__ */ R("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"10\" max=\"300\" step=\"5\"/> <span class=\"gridmenu-value\"> </span> <!></div>"), U_ = /* @__PURE__ */ R("<button class=\"ghost action\"> </button> <!> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), W_ = /* @__PURE__ */ R("<div class=\"pin-line\"><!> <!></div> <!>", 1), G_ = /* @__PURE__ */ R("<label> <!></label>"), K_ = /* @__PURE__ */ R("<!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"2\" max=\"40\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div>", 1), q_ = /* @__PURE__ */ R("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <!> <label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <!> <!>", 1), J_ = /* @__PURE__ */ R("<!> <!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"-10\" max=\"10\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div>", 1), Y_ = /* @__PURE__ */ R("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"8\" max=\"120\" step=\"2\"/> <span class=\"gridmenu-value\"> </span></div>", 1), X_ = /* @__PURE__ */ R("<div class=\"swatch-cell\"><!> <span class=\"mini-label\"> </span></div>"), Z_ = /* @__PURE__ */ R("<div class=\"swatch-row\"><!> <div class=\"swatch-cell\"><!> <span class=\"mini-label\"> </span></div></div>"), Q_ = /* @__PURE__ */ R("<!> <!> <!> <!> <!>", 1);
function $_(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, setBlockProps: o, themeSwatches: s } = n, { groupReset: c, groupChanged: l } = mg(() => I(r).props, o);
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
			var t = I_(), n = M(t);
			ui(n, 17, () => I(r).props.items ?? [], oi, (e, t, n) => {
				var i = F_(), a = j(i);
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
			var t = z_(), n = M(t), i = j(n), o = N(i, !0), s = P(i, 2);
			ui(s, 21, jh, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ O(() => g(I(t), 2));
				let i = () => I(n)[0], o = () => I(n)[1];
				var s = L_();
				let c;
				H(s, () => Ph[i()], !0), D(s), F(() => {
					c = Pi(s, 1, "tile", null, c, { on: (I(r).props.sep ?? "dot") === i() }), G(s, "aria-pressed", (I(r).props.sep ?? "dot") === i()), G(s, "title", o());
				}), L("click", s, () => a("sep", i())), z(e, s);
			}), D(s), D(n);
			var c = P(n, 2), l = (e) => {
				var t = R_(), n = j(t), i = N(n, !0), o = P(n, 2);
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
		var i = B_(), o = M(i);
		{
			let e = /* @__PURE__ */ O(() => K("lbl.ribbonItems")), n = /* @__PURE__ */ O(() => K("menu.wordCount", { n: I(r).props.items?.length ?? 0 }));
			Jh(o, {
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
			let e = /* @__PURE__ */ O(() => K("lbl.ribbonSep")), t = /* @__PURE__ */ O(() => jh().find(([e]) => e === (I(r).props.sep ?? "dot"))?.[1] ?? ""), i = /* @__PURE__ */ O(() => c("ribbon-sep", {
				sep: "dot",
				sepText: void 0
			}));
			Jh(s, {
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
			var t = W_(), i = M(t), o = j(i);
			{
				let e = /* @__PURE__ */ O(Oh);
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
			wh(P(o, 2), { id: "ribbonMotion" }), D(i);
			var s = P(i, 2), c = (e) => {
				var t = U_(), i = M(t), o = N(i, !0), s = P(i, 2);
				{
					let e = /* @__PURE__ */ O(() => K("lbl.ribbonDirection")), t = /* @__PURE__ */ O(() => I(r).props.direction ?? "left"), n = /* @__PURE__ */ O(() => [["left", K("opt.ribbonDir.left")], ["right", K("opt.ribbonDir.right")]]);
					jl(s, {
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
					var t = V_(), n = j(t), i = N(n, !0), o = P(n, 2);
					U(o);
					var s = N(P(o, 2));
					D(t), F((e, n) => {
						G(t, "title", e), B(i, n), W(o, I(r).props.dwell ?? 2.5), B(s, `${I(r).props.dwell ?? 2.5 ?? ""} s`);
					}, [() => K("tip.ribbon.dwell"), () => K("lbl.ribbonDwell")]), L("input", o, (e) => a("dwell", e.target.valueAsNumber)), z(e, t);
				}, u = (e) => {
					var t = H_(), n = j(t), i = N(n, !0), o = P(n, 2);
					U(o);
					var s = P(o, 2), c = N(s, !0);
					wh(P(s, 2), { id: "speed" }), D(t), F((e, n) => {
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
					jl(h, {
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
			var t = q_(), n = M(t), i = j(n), o = N(i, !0), c = P(i, 2);
			{
				let e = /* @__PURE__ */ O(() => I(r).props.above ?? "none"), t = /* @__PURE__ */ O(Ah);
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
				var t = G_(), n = j(t), i = P(n);
				{
					let e = /* @__PURE__ */ O(() => I(r).props.aboveColor ?? Mh(I(r).props)), t = /* @__PURE__ */ O(s), n = /* @__PURE__ */ O(() => K("tip.ribbon.stripeColor"));
					Uc(i, {
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
				let e = /* @__PURE__ */ O(() => I(r).props.main ?? "text"), t = /* @__PURE__ */ O(kh);
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
				let e = /* @__PURE__ */ O(() => I(r).props.below ?? "none"), t = /* @__PURE__ */ O(Ah);
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
				var t = G_(), n = j(t), i = P(n);
				{
					let e = /* @__PURE__ */ O(() => I(r).props.belowColor ?? Mh(I(r).props)), t = /* @__PURE__ */ O(s), n = /* @__PURE__ */ O(() => K("tip.ribbon.stripeColor"));
					Uc(i, {
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
				var t = K_(), n = M(t);
				{
					let e = /* @__PURE__ */ O(() => K("lbl.ribbonStripePlace")), t = /* @__PURE__ */ O(() => K("tip.ribbon.stripePlace")), i = /* @__PURE__ */ O(() => I(r).props.stripePlace ?? "stack"), o = /* @__PURE__ */ O(() => [["stack", K("opt.ribbonPlace.stack")], ["edge", K("opt.ribbonPlace.edge")]]);
					jl(n, {
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
			var t = J_(), n = M(t);
			{
				let e = /* @__PURE__ */ O(() => K("lbl.ribbonWidth")), t = /* @__PURE__ */ O(() => Dh(I(r).props.width)), i = /* @__PURE__ */ O(Eh);
				jl(n, {
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
				jl(i, {
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
			var t = Y_(), n = M(t), i = j(n), o = N(i, !0), s = P(i, 2);
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
			var t = Z_(), n = j(t), i = (e) => {
				var t = X_(), n = j(t);
				{
					let e = /* @__PURE__ */ O(() => I(r).props.bg ?? "accent"), t = /* @__PURE__ */ O(s), i = /* @__PURE__ */ O(() => K("tip.ribbon.bg"));
					Uc(n, {
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
				Uc(c, {
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
		var h = Q_(), g = M(h);
		{
			let e = /* @__PURE__ */ O(() => K("lbl.ribbonMotion")), n = /* @__PURE__ */ O(() => Oh().find(([e]) => e === I(f))?.[1] ?? ""), r = /* @__PURE__ */ O(() => c("ribbon-motion", {
				motion: "roll",
				direction: "left",
				speed: 60,
				dwell: 2.5,
				pauseOnHover: !0,
				pause: "button",
				fade: !0
			}));
			Jh(g, {
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
			Jh(_, {
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
			let e = /* @__PURE__ */ O(() => K("lbl.ribbonShape")), t = /* @__PURE__ */ O(() => Eh().find(([e]) => e === Dh(I(r).props.width))?.[1] ?? ""), n = /* @__PURE__ */ O(() => c("ribbon-shape", {
				width: "canvas",
				variant: "band",
				tilt: 0
			}));
			Jh(v, {
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
			Jh(y, {
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
			Jh(b, {
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
var ev = /* @__PURE__ */ k("title"), tv = /* @__PURE__ */ R("<div class=\"bg-layer\"><span class=\"toolbar-row\"><span class=\"cal-ref-swatch\" aria-hidden=\"true\"></span> <span> </span> <button class=\"ghost row-tool\"></button></span></div>"), nv = /* @__PURE__ */ R("<div class=\"bg-layer\"><span class=\"toolbar-row\"><input class=\"tb-grow\" spellcheck=\"false\"/> <button class=\"ghost row-tool\"></button></span> <span class=\"toolbar-row\"><input class=\"tb-grow\"/> <!></span> <button type=\"button\" class=\"ghost action\"> </button></div>"), rv = /* @__PURE__ */ R("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), iv = /* @__PURE__ */ R("<span class=\"gridmenu-value\"> </span>"), av = /* @__PURE__ */ R("<!> <button type=\"button\" class=\"ghost action\"><!> </button> <span class=\"mini-label\"> </span> <!> <!> <button type=\"button\" class=\"linkish\"> </button>", 1), ov = /* @__PURE__ */ R("<label> <!></label>"), sv = /* @__PURE__ */ R("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <!></div> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <!></div>", 1), cv = /* @__PURE__ */ R("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <!>", 1), lv = /* @__PURE__ */ R("<div class=\"pin-line\"><label> <input type=\"number\" min=\"1\" max=\"50\"/></label> <!></div> <!>", 1), uv = /* @__PURE__ */ R("<!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"0\" max=\"10\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div>", 1), dv = /* @__PURE__ */ R("<!> <!> <!> <!> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <!> <!>", 1), fv = /* @__PURE__ */ R("<label> <input placeholder=\"/program\" spellcheck=\"false\"/></label>"), pv = /* @__PURE__ */ R("<!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <div class=\"pin-line\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <!>", 1), mv = /* @__PURE__ */ R("<label> <input/></label> <label> <!></label>", 1), hv = /* @__PURE__ */ R("<label class=\"field-stack\"> <textarea rows=\"3\"></textarea></label>"), gv = /* @__PURE__ */ R("<!> <label> <input/></label> <!> <label> <input placeholder=\"https://\" spellcheck=\"false\"/></label>", 1), _v = /* @__PURE__ */ R("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!>", 1), vv = /* @__PURE__ */ R("<button type=\"button\" class=\"ghost action\"> </button>"), yv = /* @__PURE__ */ R("<!> <!> <!> <!> <!> <!>", 1), bv = /* @__PURE__ */ R("<label> <input type=\"number\" min=\"0\" max=\"24\"/></label>"), xv = /* @__PURE__ */ R("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <!></div>"), Sv = /* @__PURE__ */ R("<span class=\"mini-label\"> </span>"), Cv = /* @__PURE__ */ R("<div class=\"cal-slot\"><!> <span class=\"mini-label\"> </span></div>"), wv = /* @__PURE__ */ R("<!> <div class=\"cal-slots\"></div>", 1), Tv = /* @__PURE__ */ R("<!> <label> <!></label> <label> <input type=\"number\"/></label> <!> <span class=\"toolbar-row\"><button type=\"button\"><i> </i></button> <button type=\"button\"><u> </u></button> <!></span>", 1), Ev = /* @__PURE__ */ R("<div class=\"pin-line\"><button type=\"button\" class=\"menu-row cal-design-row\"><span class=\"menu-group-title\"> </span><span class=\"menu-group-value\"> </span></button> <!></div>   <!> <!> <!> <!>", 1);
function Dv(e, t) {
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
		return I(r)?.props.fieldStyle?.[I(ev)] ?? {};
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
			...t[I(ev)] ?? {},
			...e
		};
		for (let e of Object.keys(n)) n[e] === void 0 && delete n[e];
		Object.keys(n).length ? t[I(ev)] = n : delete t[I(ev)], a("fieldStyle", Object.keys(t).length ? t : void 0);
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
		let e = I(r).props, t = Om(e.design), n = (e, t) => () => o(e, t), i = km(e), a = i === "agenda" ? 8 : 6, s = i === "next" ? 3 : void 0, l = e.switcher === !0 || e.switcherViews != null || e.toolsSize != null || e.description != null || e.showMore === !1 || (e.limit ?? 6) !== a || e.nextCount !== s || e.laterCount !== s || e.showCancelled === !1 || e.structuredData === !1 || e.clock != null || e.weekStart != null, u = [
			!t.ownFilter && e.showCategories === !0,
			e.showSubscribe !== !1,
			e.showSignup === !0,
			e.showSearch === !0,
			e.showEarlier === !0
		].filter(Boolean).length, f = u > 0 || e.showOpen === !1 || e.showAdd === !1 || !!e.programHref, p = !!e.emptyText || e.emptyIcon != null && e.emptyIcon !== "calendar", m = Tm(e.design).filter((t) => e.options?.[t.key] != null).length, h = t.slots.filter((t) => e.colors?.[t.key]).length, g = Object.keys(e.fieldStyle ?? {}).length;
		return {
			sources: String((e.sources ?? []).filter((e) => {
				let t = x(e);
				return t.ref ? !!c(t.ref) : t.url.trim();
			}).length),
			view: K(d[km(e)]),
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
			stripe: Fm(t, e.stripe).show ? K("common.on") : K("common.off"),
			stripeReset: e.stripe ? n("cal-stripe", { stripe: void 0 }) : null,
			fields: g ? K("menu.changed", { n: g }) : K("menu.standard"),
			fieldsReset: g ? n("cal-fields", { fieldStyle: void 0 }) : null
		};
	}
	var re = Yr(), ie = M(re), ae = (e) => {
		let t = (e) => {
			var t = av(), i = M(t);
			ui(i, 17, () => I(r).props.sources ?? [], oi, (e, t, n) => {
				let r = /* @__PURE__ */ O(() => x(I(t)));
				var i = Yr(), a = M(i), o = (e) => {
					let t = /* @__PURE__ */ O(() => c(I(r).ref));
					var i = tv(), a = j(i), o = j(a);
					let s;
					var l = P(o, 2);
					let u;
					var d = N(l, !0), f = P(l, 2);
					H(f, () => q.cross, !0), D(f), D(a), D(i), F((e, n, r) => {
						s = Ii(o, "", s, { background: e }), u = Pi(l, 1, "tb-grow cal-ref-name", null, u, { muted: !I(t) }), B(d, n), G(f, "title", r);
					}, [
						() => dp(I(t)?.color),
						() => I(t) ? I(t).name || I(t).url : K("calendar.refMissing"),
						() => K("ui.remove")
					]), L("click", f, () => te(n)), z(e, i);
				}, s = (e) => {
					var t = nv(), i = j(t), a = j(i);
					U(a);
					var o = P(a, 2);
					H(o, () => q.cross, !0), D(o), D(i);
					var s = P(i, 2), c = j(s);
					U(c);
					var l = P(c, 2);
					{
						let e = /* @__PURE__ */ O(() => I(r).color || "accent"), t = /* @__PURE__ */ O(u), i = /* @__PURE__ */ O(() => K("tip.calendar.sourceColor"));
						Uc(l, {
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
				var n = rv(), r = j(n);
				U(r);
				var i = P(r);
				D(n), F((e) => {
					Vi(r, e), B(i, ` ${(I(t).name || I(t).url) ?? ""}`);
				}, [() => C().has(I(t).id)]), L("change", r, (e) => w(I(t).id, e.target.checked)), z(e, n);
			});
			var m = P(p, 2), h = (e) => {
				var t = iv(), n = N(t, !0);
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
			var t = dv(), n = M(t), i = (e) => {
				var t = ov(), n = j(t), i = P(n);
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
			}, o = /* @__PURE__ */ O(() => !Om(I(r).props.design).view);
			V(n, (e) => {
				I(o) && e(i);
			});
			var s = P(n, 2), c = (e) => {
				var t = cv(), n = M(t), i = j(n);
				U(i);
				var o = P(i);
				D(n);
				var s = P(n, 2), c = (e) => {
					let t = /* @__PURE__ */ O(() => Sm(I(r).props));
					var n = sv(), i = M(n), o = j(i), s = N(o, !0), c = P(o, 2);
					{
						let e = /* @__PURE__ */ O(() => bm.map((e) => [e, K(`calendar.design.${e}`)]));
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
						let e = /* @__PURE__ */ O(() => xm.map((e) => [e, K(e === "month" ? "calendar.viewMonth" : `calendar.design.${e}`)]));
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
					jl(l, {
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
			}, l = /* @__PURE__ */ O(() => Am.includes(km(I(r).props)));
			V(s, (e) => {
				I(l) && e(c);
			});
			var u = P(s, 2), d = (e) => {
				var t = rv(), n = j(t);
				U(n);
				var i = P(n);
				D(t), F((e, a) => {
					G(t, "title", e), Vi(n, I(r).props.phoneDesign !== !1), B(i, ` ${a ?? ""}`);
				}, [() => K("tip.calendar.phoneDesign"), () => K("calendar.phoneDesign")]), L("change", n, (e) => a("phoneDesign", e.target.checked ? void 0 : !1)), z(e, t);
			}, f = /* @__PURE__ */ O(() => Om(I(r).props.design).phone === "switch");
			V(u, (e) => {
				I(f) && e(d);
			});
			var p = P(u, 2), m = (e) => {
				{
					let t = /* @__PURE__ */ O(() => K("calendar.opt.description")), n = /* @__PURE__ */ O(() => K("tip.calendar.opt.description")), i = /* @__PURE__ */ O(() => Cm(I(r).props)), o = /* @__PURE__ */ O(() => [["rows", K("calendar.descriptionRows")], ["card", K("calendar.descriptionCard")]]);
					jl(e, {
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
			}, h = /* @__PURE__ */ O(() => wm(I(r).props));
			V(p, (e) => {
				I(h) && e(m);
			});
			var g = P(p, 2), _ = (e) => {
				var t = lv(), n = M(t), i = j(n), o = j(i), s = P(o);
				U(s), D(i), wh(P(i, 2), { id: "limit" }), D(n);
				var c = P(n, 2), l = (e) => {
					var t = rv(), n = j(t);
					U(n);
					var i = P(n);
					D(t), F((e, a) => {
						G(t, "title", e), Vi(n, I(r).props.showMore !== !1), B(i, ` ${a ?? ""}`);
					}, [() => K("tip.calendar.showMore"), () => K("calendar.showMore")]), L("change", n, (e) => a("showMore", e.target.checked ? void 0 : !1)), z(e, t);
				}, u = /* @__PURE__ */ O(() => km(I(r).props) === "list" && Om(I(r).props.design).module !== "more");
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
				jl(T, {
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
					jl(e, {
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
			].includes(km(I(r).props)) || I(r).props.design === "bento" || I(r).props.switcher === !0);
			V(E, (e) => {
				I(te) && e(ee);
			});
			var ne = P(E, 2), re = (e) => {
				var t = uv(), n = M(t);
				{
					let e = /* @__PURE__ */ O(() => K("calendar.nextCount")), t = /* @__PURE__ */ O(() => K("tip.calendar.nextCount")), i = /* @__PURE__ */ O(() => String(Math.min(3, Math.max(1, Number(I(r).props.nextCount) || 1))));
					jl(n, {
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
			var t = pv(), n = M(t), i = (e) => {
				var t = rv(), n = j(t);
				U(n);
				var i = P(n);
				D(t), F((e, a) => {
					G(t, "title", e), Vi(n, I(r).props.showCategories === !0), B(i, ` ${a ?? ""}`);
				}, [() => K("tip.calendar.showCategories"), () => K("calendar.showCategories")]), L("change", n, (e) => a("showCategories", e.target.checked)), z(e, t);
			}, o = /* @__PURE__ */ O(() => !Om(I(r).props.design).ownFilter);
			V(n, (e) => {
				I(o) && e(i);
			});
			var s = P(n, 2), c = j(s);
			U(c);
			var l = P(c);
			D(s);
			var u = P(s, 2), d = (e) => {
				var t = rv(), n = j(t);
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
			].includes(km(I(r).props)));
			V(u, (e) => {
				I(f) && e(d);
			});
			var p = P(u, 2), m = j(p), h = j(m);
			U(h);
			var g = P(h);
			D(m), wh(P(m, 2), { id: "subscribe" }), D(p);
			var _ = P(p, 2), v = j(_);
			U(v);
			var y = P(v);
			D(_);
			var b = P(_, 2), x = j(b);
			U(x);
			var S = P(x);
			D(b);
			var C = P(b, 2), w = (e) => {
				var t = rv(), n = j(t);
				U(n);
				var i = P(n);
				D(t), F((e, a) => {
					G(t, "title", e), Vi(n, I(r).props.showOpen !== !1), B(i, ` ${a ?? ""}`);
				}, [() => K("tip.calendar.showOpen"), () => K("calendar.showOpen")]), L("change", n, (e) => a("showOpen", e.target.checked ? void 0 : !1)), z(e, t);
			}, T = /* @__PURE__ */ O(() => Om(I(r).props.design).open);
			V(C, (e) => {
				I(T) && e(w);
			});
			var E = P(C, 2), ee = (e) => {
				var t = fv(), n = j(t), i = P(n);
				U(i), D(t), F((e, a) => {
					G(t, "title", e), B(n, `${a ?? ""} `), W(i, I(r).props.programHref ?? "");
				}, [() => K("tip.calendar.programHref"), () => K("calendar.programHref")]), L("change", i, (e) => a("programHref", e.target.value.trim() || void 0)), z(e, t);
			}, te = /* @__PURE__ */ O(() => Om(I(r).props.design).program);
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
			var t = mv(), n = M(t), i = j(n), o = P(i);
			U(o), D(n);
			var s = P(n, 2), c = j(s), l = P(c);
			{
				let e = /* @__PURE__ */ O(() => I(r).props.emptyIcon === "none" ? "" : I(r).props.emptyIcon ?? "calendar"), t = /* @__PURE__ */ O(() => K("tip.calendar.emptyIcon"));
				ll(l, {
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
							H(M(t), () => Jc(I(r).props.emptyIcon ?? "calendar") || Jc("calendar")), z(e, t);
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
				var t = _v(), n = M(t), i = j(n);
				U(i);
				var o = P(i);
				D(n);
				var s = P(n, 2), c = (e) => {
					var t = gv(), n = M(t), i = (e) => {
						{
							let t = /* @__PURE__ */ O(() => K("calendar.noticeAs")), n = /* @__PURE__ */ O(() => K("tip.calendar.noticeAs")), i = /* @__PURE__ */ O(() => I(r).props.notice?.as === "band" ? "band" : "note"), o = /* @__PURE__ */ O(() => [["note", K("calendar.noticeAsNote")], ["band", K("calendar.noticeAsBand")]]);
							jl(e, {
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
					}, o = /* @__PURE__ */ O(() => Om(I(r).props.design).noticeBand);
					V(n, (e) => {
						I(o) && e(i);
					});
					var s = P(n, 2), c = j(s), l = P(c);
					U(l), D(s);
					var u = P(s, 2), d = (e) => {
						var t = hv(), n = j(t), r = P(n);
						_t(r), D(t), F((e, i, a) => {
							G(t, "title", e), B(n, `${i ?? ""} `), W(r, a);
						}, [
							() => K("tip.calendar.noticeBody"),
							() => K("calendar.noticeBody"),
							() => g("noticeText")
						]), L("change", r, (e) => _("noticeText", e.target.value)), z(e, t);
					}, f = /* @__PURE__ */ O(() => I(r).props.notice?.as !== "band" || !Om(I(r).props.design).noticeBand);
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
			}, o = /* @__PURE__ */ O(() => Om(I(r).props.design).notice);
			V(n, (e) => {
				I(o) && e(i);
			}), z(e, t);
		}, f = /* @__PURE__ */ O(ne);
		var p = yv(), m = M(p);
		{
			let e = /* @__PURE__ */ O(() => K("calendar.sources"));
			Jh(m, {
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
			Jh(h, {
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
			Jh(v, {
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
			Jh(y, {
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
				Jh(e, {
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
		}, re = /* @__PURE__ */ O(() => Om(I(r).props.design).notice);
		V(b, (e) => {
			I(re) && e(S);
		});
		var ie = P(b, 2), ae = (e) => {
			var t = vv(), n = N(t, !0);
			F((e, r) => {
				G(t, "title", e), B(n, r);
			}, [() => K("tip.calendar.resetTexts"), () => K("calendar.resetTexts")]), L("click", t, () => a("texts", Bm(I(r).props.texts))), z(e, t);
		}, oe = /* @__PURE__ */ O(() => zm(Om(I(r).props.design), I(r).props.texts));
		V(ie, (e) => {
			I(oe) && e(ae);
		}), z(e, p);
	}, oe = (e) => {
		let t = (e) => {
			var t = Yr(), n = M(t), i = (e) => {
				let t = /* @__PURE__ */ O(() => Em(I(r).props));
				var n = Yr();
				ui(M(n), 17, () => Tm(I(r).props.design).filter((e) => Dm(e, I(t))), (e) => e.key, (e, n) => {
					var r = Yr(), i = M(r), a = (e) => {
						var r = rv(), i = j(r);
						U(i);
						var a = P(i);
						D(r), F((e) => {
							Vi(i, I(t)[I(n).key]), B(a, ` ${e ?? ""}`);
						}, [() => K(I(n).labelKey)]), L("change", i, (e) => f(I(n), e.target.checked)), z(e, r);
					}, o = (e) => {
						var r = bv(), i = j(r), a = P(i);
						U(a), D(r), F((e, o, s) => {
							G(r, "title", e), B(i, `${o ?? ""} `), W(a, I(t)[I(n).key] ?? ""), G(a, "placeholder", s);
						}, [
							() => K("tip.calendar.opt.hours"),
							() => K(I(n).labelKey),
							() => K("calendar.opt.columns.auto")
						]), L("change", a, (e) => f(I(n), e.target.value === "" ? null : Math.max(0, Math.min(24, Math.round(Number(e.target.value)) || 0)))), z(e, r);
					}, s = (e) => {
						var r = xv(), i = j(r), a = N(i, !0), o = P(i, 2);
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
							jl(e, {
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
			}, a = /* @__PURE__ */ O(() => Tm(I(r).props.design).length);
			V(n, (e) => {
				I(a) && e(i);
			}), z(e, t);
		}, i = (e) => {
			var t = Yr();
			ui(M(t), 19, () => m(I(s)), (e) => e.section, (e, t, n) => {
				var i = wv(), a = M(i), o = (e) => {
					var n = Sv(), r = N(n, !0);
					F((e) => B(r, e), [() => K(`calendar.section.${I(t).section}`)]), z(e, n);
				};
				V(a, (e) => {
					I(n) > 0 && e(o);
				});
				var s = P(a, 2);
				ui(s, 21, () => I(t).slots, (e) => e.key, (e, t) => {
					var n = Cv(), i = j(n);
					{
						let e = /* @__PURE__ */ O(() => I(r).props.colors?.[I(t).key] ?? ""), n = /* @__PURE__ */ O(u), a = /* @__PURE__ */ O(() => K(I(t).labelKey));
						Uc(i, {
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
			var t = _v(), n = M(t), i = j(n);
			U(i);
			var a = P(i);
			D(n);
			var o = P(n, 2), c = (e) => {
				var t = xv(), n = j(t), i = N(n, !0), a = P(n, 2);
				{
					let e = /* @__PURE__ */ O(() => I(r).props.stripe?.color ?? ""), t = /* @__PURE__ */ O(u), n = /* @__PURE__ */ O(() => K("calendar.stripeColor"));
					Uc(a, {
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
			}, l = /* @__PURE__ */ O(() => Fm(I(s), I(r).props.stripe).show);
			V(o, (e) => {
				I(l) && e(c);
			}), F((e, t, r) => {
				G(n, "title", e), Vi(i, t), B(a, ` ${r ?? ""}`);
			}, [
				() => K("tip.calendar.stripe"),
				() => Fm(I(s), I(r).props.stripe).show,
				() => K("calendar.stripe")
			]), L("change", i, (e) => y({ show: e.target.checked })), z(e, t);
		}, o = (e) => {
			var t = Tv(), n = M(t);
			{
				let e = /* @__PURE__ */ O(() => sm.map((e) => [e, K(`calendar.field.${e}`)]));
				J(n, {
					get value() {
						return I(ev);
					},
					get options() {
						return I(e);
					},
					onchange: (e) => A(ev, e, !0)
				});
			}
			var r = P(n, 2), i = j(r), a = P(i);
			{
				let e = /* @__PURE__ */ O(() => h().font ?? ""), t = /* @__PURE__ */ O(() => [["", K("common.inherit")], ...Ml.map(([e, t]) => [t, K(e)])]);
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
				jl(l, {
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
				Uc(y, {
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
				B(i, `${e ?? ""} `), G(o, "title", t), B(s, `${n ?? ""} `), G(c, "min", Im.min), G(c, "max", Im.max), W(c, r), G(c, "placeholder", a), p = Pi(f, 1, "tbtn", null, p, { active: l }), G(f, "title", u), B(m, d), _ = Pi(g, 1, "tbtn", null, _, { active: h }), G(g, "title", y), B(v, b);
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
			]), L("change", c, (e) => b({ size: e.target.value === "" ? void 0 : Math.max(Im.min, Math.min(Im.max, Number(e.target.value) || Im.min)) })), L("click", f, () => b({ italic: !h().italic || void 0 })), L("click", g, () => b({ underline: !h().underline || void 0 })), z(e, t);
		}, s = /* @__PURE__ */ O(() => Om(I(r).props.design)), c = /* @__PURE__ */ O(ne);
		var l = Ev(), d = M(l), g = j(d), _ = j(g), x = N(_, !0), S = N(P(_), !0);
		D(g), wh(P(g, 2), { id: "design" }), D(d);
		var C = P(d, 2);
		{
			let e = /* @__PURE__ */ O(() => K("calendar.section.options"));
			Jh(C, {
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
			Jh(w, {
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
			Jh(T, {
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
			Jh(E, {
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
var Ov = /* @__PURE__ */ R("<label> <input/></label>"), kv = /* @__PURE__ */ R("<label> <input/></label> <label> <input/></label>", 1), Av = /* @__PURE__ */ R("<input/>"), jv = /* @__PURE__ */ R("<span class=\"nav-line\"><input/> <!> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!>", 1), Mv = /* @__PURE__ */ R("<label> <!></label> <!> <p class=\"panel-strong\"> </p> <!> <button class=\"ghost action\"> </button> <label> <input/></label> <label> <input/></label>", 1);
function Nv(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a } = n, o = [
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
		i(`edit:${I(r).blockId}:field${e}`, (n) => {
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
			e.props.fields ??= [], e.props.fields.push({
				id: c(),
				label: K("form.newField"),
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
	var m = Yr(), h = M(m), g = (e) => {
		var t = Mv(), n = M(t), i = j(n), c = P(i);
		{
			let e = /* @__PURE__ */ O(() => I(r).props.mode ?? "mailto"), t = /* @__PURE__ */ O(() => [["mailto", K("form.modeMailto")], ["endpoint", K("form.modeEndpoint")]]);
			J(c, {
				get value() {
					return I(e);
				},
				get options() {
					return I(t);
				},
				onchange: (e) => a("mode", e)
			});
		}
		D(n);
		var m = P(n, 2), h = (e) => {
			var t = Ov(), n = j(t), i = P(n);
			U(i), D(t), F((e, a, o) => {
				G(t, "title", e), B(n, `${a ?? ""} `), W(i, I(r).props.endpoint ?? ""), G(i, "placeholder", o);
			}, [
				() => K("form.endpointNote"),
				() => K("form.endpoint"),
				() => K("form.endpointPh")
			]), L("change", i, (e) => a("endpoint", e.target.value.trim())), z(e, t);
		}, g = (e) => {
			var t = kv(), n = M(t), i = j(n), o = P(i);
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
		V(m, (e) => {
			(I(r).props.mode ?? "mailto") === "endpoint" ? e(h) : e(g, -1);
		});
		var _ = P(m, 2), v = N(_, !0), y = P(_, 2);
		ui(y, 19, () => I(r).props.fields ?? [], (e, t) => e.id ?? t, (e, t, n) => {
			var i = jv(), a = M(i), c = j(a);
			U(c);
			var d = P(c, 2);
			{
				let e = /* @__PURE__ */ O(() => I(t).type ?? "text"), r = /* @__PURE__ */ O(() => o.map((e) => [e, K(`form.type${e[0].toUpperCase()}${e.slice(1)}`)]));
				J(d, {
					get value() {
						return I(e);
					},
					get options() {
						return I(r);
					},
					onchange: (e) => l(I(n), { type: e })
				});
			}
			var m = P(d, 2), h = j(m);
			H(h, () => q.up, !0), D(h);
			var g = P(h, 2);
			H(g, () => q.down, !0), D(g);
			var _ = P(g, 2);
			H(_, () => q.cross, !0), D(_), D(m), D(a);
			var v = P(a, 2), y = j(v);
			U(y);
			var b = P(y);
			D(v);
			var x = P(v, 2), S = (e) => {
				var r = Av();
				U(r), F((e, t) => {
					W(r, e), G(r, "placeholder", t);
				}, [() => (I(t).options ?? []).join(", "), () => K("form.optionsPh")]), L("change", r, (e) => u(I(n), e.target.value)), z(e, r);
			}, C = /* @__PURE__ */ O(() => s.has(I(t).type));
			V(x, (e) => {
				I(C) && e(S);
			}), F((e, i, a) => {
				W(c, I(t).label), G(c, "placeholder", e), h.disabled = I(n) === 0, g.disabled = I(n) === (I(r).props.fields?.length ?? 0) - 1, G(_, "title", i), Vi(y, I(t).required === !0), B(b, ` ${a ?? ""}`);
			}, [
				() => K("form.fieldNamePh"),
				() => K("form.removeField"),
				() => K("form.required")
			]), L("change", c, (e) => l(I(n), { label: e.target.value.trim() || K("form.fieldFallback") })), L("click", h, () => p(I(n), -1)), L("click", g, () => p(I(n), 1)), L("click", _, () => f(I(n))), L("change", y, (e) => l(I(n), { required: e.target.checked })), z(e, i);
		});
		var b = P(y, 2), x = N(b, !0), S = P(b, 2), C = j(S), w = P(C);
		U(w), D(S);
		var T = P(S, 2), E = j(T), ee = P(E);
		U(ee), D(T), F((e, t, a, o, s, c, l, u) => {
			G(n, "title", e), B(i, `${t ?? ""} `), B(v, a), B(x, o), B(C, `${s ?? ""} `), W(w, I(r).props.submitLabel ?? ""), G(w, "placeholder", c), B(E, `${l ?? ""} `), W(ee, I(r).props.successText ?? ""), G(ee, "placeholder", u);
		}, [
			() => K("form.modeTitle"),
			() => K("form.mode"),
			() => K("form.fields"),
			() => K("form.addField"),
			() => K("lbl.buttonText"),
			() => K("form.sendDefault"),
			() => K("form.receipt"),
			() => K("form.thanksDefault")
		]), L("click", b, d), L("change", w, (e) => a("submitLabel", e.target.value.trim() || K("form.sendDefault"))), L("change", ee, (e) => a("successText", e.target.value.trim() || K("form.thanksDefault"))), z(e, t);
	};
	V(h, (e) => {
		t.area === "content" && e(g);
	}), z(e, m), at();
}
Br(["change", "click"]);
//#endregion
//#region src/menu/families/Faq.svelte
var Pv = /* @__PURE__ */ R("<span class=\"nav-line\"><input/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span>"), Fv = /* @__PURE__ */ R("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <p class=\"panel-strong\"> </p> <!> <button class=\"ghost action\"> </button>", 1), Iv = /* @__PURE__ */ R("<p class=\"panel-strong\"> </p> <!>", 1), Lv = /* @__PURE__ */ R("<!> <!> <hr class=\"gridmenu-divider\"/>", 1);
function Rv(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a } = n, o = ["cards", "list"];
	function s(e, t) {
		i(`edit:${I(r).blockId}:faq${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function c() {
		i("faq-item", (e) => {
			e.props.items ??= [], e.props.items.push({
				q: K("seed.faq.newQ"),
				a: K("seed.faq.answer")
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
	var d = Yr(), f = M(d), p = (e) => {
		var t = Fv(), n = M(t), i = j(n);
		U(i);
		var o = P(i);
		D(n);
		var d = P(n, 2), f = N(d, !0), p = P(d, 2);
		ui(p, 17, () => I(r).props.items ?? [], oi, (e, t, n) => {
			var i = Pv(), a = j(i);
			U(a);
			var o = P(a, 2), c = j(o);
			c.disabled = n === 0, H(c, () => q.up, !0), D(c);
			var d = P(c, 2);
			H(d, () => q.down, !0), D(d);
			var f = P(d, 2);
			H(f, () => q.cross, !0), D(f), D(o), D(i), F((e, i) => {
				W(a, I(t).q), G(a, "title", e), d.disabled = n === (I(r).props.items?.length ?? 0) - 1, G(f, "title", i);
			}, [() => K("tip.faq.question"), () => K("tip.faq.remove")]), L("change", a, (e) => s(n, { q: e.target.value })), L("click", c, () => u(n, -1)), L("click", d, () => u(n, 1)), L("click", f, () => l(n)), z(e, i);
		});
		var m = P(p, 2), h = N(m, !0);
		F((e, t, r, a, s) => {
			G(n, "title", e), Vi(i, t), B(o, ` ${r ?? ""}`), B(f, a), B(h, s);
		}, [
			() => K("tip.faq.multi"),
			() => !!I(r).props.multi,
			() => K("lbl.faqMulti"),
			() => K("lbl.questions"),
			() => K("ui.addQuestion")
		]), L("change", i, (e) => a("multi", e.target.checked)), L("click", m, c), z(e, t);
	}, m = (e) => {
		var t = Lv(), n = M(t);
		{
			let e = /* @__PURE__ */ O(() => K("lbl.variant")), t = /* @__PURE__ */ O(() => I(r).props.variant === "list" ? "list" : "cards"), i = /* @__PURE__ */ O(() => o.map((e) => [e, K(`opt.faqVariant.${e}`)]));
			jl(n, {
				get label() {
					return I(e);
				},
				get value() {
					return I(t);
				},
				get options() {
					return I(i);
				},
				onchange: (e) => a("variant", e)
			});
		}
		var i = P(n, 2), s = (e) => {
			var t = Iv(), n = M(t), r = N(n, !0);
			pg(P(n, 2), {}), F((e) => B(r, e), [() => K("lbl.cardStyle")]), z(e, t);
		};
		V(i, (e) => {
			I(r).props.variant !== "list" && e(s);
		}), ke(2), z(e, t);
	};
	V(f, (e) => {
		t.area === "content" ? e(p) : t.area === "style" && e(m, 1);
	}), z(e, d), at();
}
Br(["change", "click"]);
//#endregion
//#region src/menu/families/Timeline.svelte
var zv = /* @__PURE__ */ R("<span class=\"nav-line\"><input class=\"tl-year\"/> <input/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span> <input/>", 1), Bv = /* @__PURE__ */ R("<p class=\"panel-strong\"> </p> <!> <button class=\"ghost action\"> </button>", 1), Vv = /* @__PURE__ */ R("<label> <!></label> <label> <!></label> <label> <!></label> <hr class=\"gridmenu-divider\"/>", 1);
function Hv(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, themeSwatches: o } = n;
	function s(e, t) {
		i(`edit:${I(r).blockId}:tl${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function c() {
		i("tl-item", (e) => {
			e.props.items ??= [], e.props.items.push({
				year: "",
				title: K("seed.timeline.newTitle"),
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
	var d = Yr(), f = M(d), p = (e) => {
		var t = Bv(), n = M(t), i = N(n, !0), a = P(n, 2);
		ui(a, 17, () => I(r).props.items ?? [], oi, (e, t, n) => {
			var i = zv(), a = M(i), o = j(a);
			U(o);
			var c = P(o, 2);
			U(c);
			var d = P(c, 2), f = j(d);
			f.disabled = n === 0, H(f, () => q.up, !0), D(f);
			var p = P(f, 2);
			H(p, () => q.down, !0), D(p);
			var m = P(p, 2);
			H(m, () => q.cross, !0), D(m), D(d), D(a);
			var h = P(a, 2);
			U(h), F((e, i, a, s, l, u) => {
				W(o, I(t).year), G(o, "placeholder", e), G(o, "title", i), W(c, I(t).title), G(c, "title", a), p.disabled = n === (I(r).props.items?.length ?? 0) - 1, G(m, "title", s), W(h, I(t).text), G(h, "placeholder", l), G(h, "title", u);
			}, [
				() => K("ph.tlYear"),
				() => K("tip.timeline.year"),
				() => K("tip.timeline.title"),
				() => K("tip.timeline.remove"),
				() => K("ph.tlText"),
				() => K("tip.timeline.text")
			]), L("change", o, (e) => s(n, { year: e.target.value })), L("change", c, (e) => s(n, { title: e.target.value })), L("click", f, () => u(n, -1)), L("click", p, () => u(n, 1)), L("click", m, () => l(n)), L("change", h, (e) => s(n, { text: e.target.value })), z(e, i);
		});
		var o = P(a, 2), d = N(o, !0);
		F((e, t) => {
			B(i, e), B(d, t);
		}, [() => K("lbl.timelineItems"), () => K("ui.addTlItem")]), L("click", o, c), z(e, t);
	}, m = (e) => {
		var t = Vv(), n = M(t), i = j(n), s = P(i);
		{
			let e = /* @__PURE__ */ O(() => I(r).props.variant ?? "left"), t = /* @__PURE__ */ O(() => [["left", K("opt.timeline.left")], ["alternating", K("opt.timeline.alternating")]]);
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
		D(n);
		var c = P(n, 2), l = j(c), u = P(l);
		{
			let e = /* @__PURE__ */ O(() => I(r).props.marker ?? "filled"), t = /* @__PURE__ */ O(() => [["filled", K("opt.timeline.filled")], ["ring", K("opt.timeline.ring")]]);
			J(u, {
				get value() {
					return I(e);
				},
				get options() {
					return I(t);
				},
				onchange: (e) => a("marker", e)
			});
		}
		D(c);
		var d = P(c, 2), f = j(d), p = P(f);
		{
			let e = /* @__PURE__ */ O(() => I(r).props.accent ?? "accent"), t = /* @__PURE__ */ O(o);
			Uc(p, {
				get value() {
					return I(e);
				},
				get tokens() {
					return I(t);
				},
				onchange: (e) => a("accent", e === "accent" ? null : e)
			});
		}
		D(d), ke(2), F((e, t, n) => {
			B(i, `${e ?? ""} `), B(l, `${t ?? ""} `), B(f, `${n ?? ""} `);
		}, [
			() => K("lbl.variant"),
			() => K("lbl.timelineMarker"),
			() => K("lbl.color")
		]), z(e, t);
	};
	V(f, (e) => {
		t.area === "content" ? e(p) : t.area === "style" && e(m, 1);
	}), z(e, d), at();
}
Br(["change", "click"]);
//#endregion
//#region src/menu/families/Quote.svelte
var Uv = /* @__PURE__ */ R("<label> <input/></label> <label> <input/></label> <label> <input/></label>", 1), Wv = /* @__PURE__ */ R("<button class=\"ghost\"> </button>"), Gv = /* @__PURE__ */ R("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <!>", 1), Kv = /* @__PURE__ */ R("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), qv = /* @__PURE__ */ R("<label> <!></label> <!> <label> <!></label> <hr class=\"gridmenu-divider\"/>", 1);
function Jv(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, compressOrTrim: o, imageErrorText: s, setStatus: c, themeSwatches: l } = n;
	async function u(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await o(t);
			i(`edit:${I(r).blockId}`, (t) => {
				t.props.image = e.dataUrl;
			});
		} catch (e) {
			c(s(e), "error");
		}
	}
	var d = Yr(), f = M(d), p = (e) => {
		var t = Uv(), n = M(t), i = j(n), o = P(i);
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
	}, m = (e) => {
		var t = qv(), n = M(t), i = j(n), o = P(i);
		{
			let e = /* @__PURE__ */ O(() => I(r).props.variant ?? "large"), t = /* @__PURE__ */ O(() => [["large", K("opt.quote.large")], ["short", K("opt.quote.short")]]);
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
		D(n);
		var s = P(n, 2), c = (e) => {
			var t = Gv(), n = M(t), i = j(n), o = P(i);
			D(n);
			var s = P(n, 2), c = (e) => {
				var t = Wv(), n = N(t, !0);
				F((e) => B(n, e), [() => K("ui.quotePortraitRemove")]), L("click", t, () => a("image", "")), z(e, t);
			};
			V(s, (e) => {
				I(r).props.image && e(c);
			}), F((e) => B(i, `${e ?? ""} `), [() => K("ui.quotePortrait")]), L("change", o, u), z(e, t);
		}, d = (e) => {
			var t = Kv(), n = j(t);
			U(n);
			var i = P(n);
			D(t), F((e, a) => {
				G(t, "title", e), Vi(n, I(r).props.card === !0), B(i, ` ${a ?? ""}`);
			}, [() => K("tip.quote.card"), () => K("lbl.quoteCard")]), L("change", n, (e) => a("card", e.target.checked)), z(e, t);
		};
		V(s, (e) => {
			I(r).props.variant === "short" ? e(c) : e(d, -1);
		});
		var f = P(s, 2), p = j(f), m = P(p);
		{
			let e = /* @__PURE__ */ O(() => I(r).props.accent ?? "accent"), t = /* @__PURE__ */ O(l);
			Uc(m, {
				get value() {
					return I(e);
				},
				get tokens() {
					return I(t);
				},
				onchange: (e) => a("accent", e === "accent" ? null : e)
			});
		}
		D(f), ke(2), F((e, t) => {
			B(i, `${e ?? ""} `), B(p, `${t ?? ""} `);
		}, [() => K("lbl.variant"), () => K("lbl.color")]), z(e, t);
	};
	V(f, (e) => {
		t.area === "content" ? e(p) : t.area === "style" && e(m, 1);
	}), z(e, d), at();
}
Br(["change", "click"]);
//#endregion
//#region src/menu/families/Stats.svelte
var Yv = /* @__PURE__ */ R("<label> <input/></label> <label> <input/></label> <label> <input/></label> <label> <input/></label>", 1), Xv = /* @__PURE__ */ R("<!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <hr class=\"gridmenu-divider\"/>", 1);
function Zv(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { setBlockProp: i } = n, a = [
		"plain",
		"cards",
		"band"
	];
	var o = Yr(), s = M(o), c = (e) => {
		var t = Yv(), n = M(t), a = j(n), o = P(a);
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
	}, l = (e) => {
		var t = Xv(), n = M(t);
		{
			let e = /* @__PURE__ */ O(() => K("lbl.variant")), t = /* @__PURE__ */ O(() => a.includes(I(r).props.variant) ? I(r).props.variant : "plain"), o = /* @__PURE__ */ O(() => a.map((e) => [e, K(`opt.statVariant.${e}`)]));
			jl(n, {
				get label() {
					return I(e);
				},
				get value() {
					return I(t);
				},
				get options() {
					return I(o);
				},
				onchange: (e) => i("variant", e)
			});
		}
		var o = P(n, 2), s = j(o);
		U(s);
		var c = P(s);
		D(o), ke(2), F((e, t) => {
			G(o, "title", e), Vi(s, I(r).props.countUp !== !1), B(c, ` ${t ?? ""}`);
		}, [() => K("tip.stat.countUp"), () => K("lbl.statCountUp")]), L("change", s, (e) => i("countUp", e.target.checked)), z(e, t);
	};
	V(s, (e) => {
		t.area === "content" ? e(c) : t.area === "style" && e(l, 1);
	}), z(e, o), at();
}
Br(["change"]);
//#endregion
//#region src/menu/families/Table.svelte
var Qv = /* @__PURE__ */ R("<span class=\"toolbar-row\"><button class=\"ghost\"> </button> <button class=\"ghost\"> </button></span> <span class=\"toolbar-row\"><button class=\"ghost\"> </button> <button class=\"ghost\"> </button></span> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), $v = /* @__PURE__ */ R("<label> <!></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <hr class=\"gridmenu-divider\"/>", 1);
function ey(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a } = n;
	function o(e, t) {
		i(`edit:${I(r).blockId}:table-form`, (n) => {
			let r = (Array.isArray(n.props.rows) && n.props.rows.length ? n.props.rows : [[""]]).map((e) => Array.isArray(e) ? e.map((e) => String(e ?? "")) : [""]), i = Math.max(1, ...r.map((e) => e.length));
			r = r.map((e) => [...e, ...Array(i - e.length).fill("")]), e > 0 ? r.push(Array(i).fill("")) : e < 0 && r.length > 1 && r.pop(), t > 0 ? r = r.map((e) => [...e, ""]) : t < 0 && i > 1 && (r = r.map((e) => e.slice(0, i - 1))), n.props.rows = r;
		});
	}
	var s = Yr(), c = M(s), l = (e) => {
		var t = Qv(), n = M(t), i = j(n), s = N(i, !0), c = P(i, 2), l = N(c, !0);
		D(n);
		var u = P(n, 2), d = j(u), f = N(d, !0), p = P(d, 2), m = N(p, !0);
		D(u);
		var h = P(u, 2), g = j(h);
		U(g);
		var _ = P(g);
		D(h), F((e, t, n, i, a, o) => {
			B(s, e), B(l, t), B(f, n), B(m, i), G(h, "title", a), Vi(g, I(r).props.header !== !1), B(_, ` ${o ?? ""}`);
		}, [
			() => K("ui.addRow"),
			() => K("ui.removeRow"),
			() => K("ui.addColumn"),
			() => K("ui.removeColumn"),
			() => K("tip.table.header"),
			() => K("lbl.tableHeader")
		]), L("click", i, () => o(1, 0)), L("click", c, () => o(-1, 0)), L("click", d, () => o(0, 1)), L("click", p, () => o(0, -1)), L("change", g, (e) => a("header", e.target.checked)), z(e, t);
	}, u = (e) => {
		var t = $v(), n = M(t), i = j(n), o = P(i);
		{
			let e = /* @__PURE__ */ O(() => I(r).props.lines ?? "rows"), t = /* @__PURE__ */ O(() => [
				["rows", K("opt.table.rows")],
				["grid", K("opt.table.grid")],
				["none", K("common.none")]
			]);
			J(o, {
				get value() {
					return I(e);
				},
				get options() {
					return I(t);
				},
				onchange: (e) => a("lines", e)
			});
		}
		D(n);
		var s = P(n, 2), c = j(s);
		U(c);
		var l = P(c);
		D(s), ke(2), F((e, t, n) => {
			B(i, `${e ?? ""} `), Vi(c, t), B(l, ` ${n ?? ""}`);
		}, [
			() => K("lbl.tableLines"),
			() => !!I(r).props.striped,
			() => K("lbl.tableStriped")
		]), L("change", c, (e) => a("striped", e.target.checked)), z(e, t);
	};
	V(c, (e) => {
		t.area === "content" ? e(l) : t.area === "style" && e(u, 1);
	}), z(e, s), at();
}
Br(["click", "change"]);
//#endregion
//#region src/menu/families/Share.svelte
var ty = /* @__PURE__ */ R("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), ny = /* @__PURE__ */ R("<label> <!></label> <label> <input type=\"number\" min=\"24\" max=\"64\"/></label> <label> <!></label> <hr class=\"gridmenu-divider\"/>", 1);
function ry(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, themeSwatches: o } = n;
	function s(e, t) {
		i(`edit:${I(r).blockId}:share`, (n) => {
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
	var c = Yr(), l = M(c), u = (e) => {
		var t = Yr();
		ui(M(t), 17, () => [
			["facebook", "Facebook"],
			["x", "X"],
			["linkedin", "LinkedIn"],
			["whatsapp", "WhatsApp"],
			["email", K("opt.share.email")],
			["copy", K("opt.share.copy")]
		], ([e, t]) => e, (e, t) => {
			var n = /* @__PURE__ */ O(() => g(I(t), 2));
			let i = () => I(n)[0], a = () => I(n)[1];
			var o = ty(), c = j(o);
			U(c);
			var l = P(c);
			D(o), F((e) => {
				Vi(c, e), B(l, ` ${a() ?? ""}`);
			}, [() => (I(r).props.services ?? []).includes(i())]), L("change", c, (e) => s(i(), e.target.checked)), z(e, o);
		}), z(e, t);
	}, d = (e) => {
		var t = ny(), n = M(t), i = j(n), s = P(i);
		{
			let e = /* @__PURE__ */ O(() => I(r).props.variant ?? "icons"), t = /* @__PURE__ */ O(() => [["icons", K("opt.share.icons")], ["labels", K("opt.share.labels")]]);
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
		D(n);
		var c = P(n, 2), l = j(c), u = P(l);
		U(u), D(c);
		var d = P(c, 2), f = j(d), p = P(f);
		{
			let e = /* @__PURE__ */ O(() => I(r).props.color || "accent"), t = /* @__PURE__ */ O(o);
			Uc(p, {
				get value() {
					return I(e);
				},
				get tokens() {
					return I(t);
				},
				onchange: (e) => a("color", e === "accent" ? "" : e)
			});
		}
		D(d), ke(2), F((e, t, n) => {
			B(i, `${e ?? ""} `), B(l, `${t ?? ""} `), W(u, I(r).props.size ?? 38), B(f, `${n ?? ""} `);
		}, [
			() => K("lbl.variant"),
			() => K("lbl.size"),
			() => K("lbl.color")
		]), L("change", u, (e) => a("size", Number(e.target.value) || 38)), z(e, t);
	};
	V(l, (e) => {
		t.area === "content" ? e(u) : t.area === "style" && e(d, 1);
	}), z(e, c), at();
}
Br(["change"]);
//#endregion
//#region src/menu/families/Countdown.svelte
var iy = /* @__PURE__ */ R("<label> <input type=\"datetime-local\"/></label> <label> <input/></label>", 1), ay = /* @__PURE__ */ R("<label> <!></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <hr class=\"gridmenu-divider\"/>", 1);
function oy(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { setBlockProp: i } = n;
	var a = Yr(), o = M(a), s = (e) => {
		var t = iy(), n = M(t), a = j(n), o = P(a);
		U(o), D(n);
		var s = P(n, 2), c = j(s), l = P(c);
		U(l), D(s), F((e, t, n) => {
			B(a, `${e ?? ""} `), W(o, I(r).props.target ?? ""), G(s, "title", t), B(c, `${n ?? ""} `), W(l, I(r).props.doneText ?? "");
		}, [
			() => K("lbl.countdownTarget"),
			() => K("tip.countdown.done"),
			() => K("lbl.countdownDone")
		]), L("change", o, (e) => i("target", e.target.value)), L("change", l, (e) => i("doneText", e.target.value)), z(e, t);
	}, c = (e) => {
		var t = ay(), n = M(t), a = j(n), o = P(a);
		{
			let e = /* @__PURE__ */ O(() => I(r).props.variant ?? "boxes"), t = /* @__PURE__ */ O(() => [["boxes", K("opt.countdown.boxes")], ["plain", K("opt.countdown.plain")]]);
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
		var s = P(n, 2), c = j(s);
		U(c);
		var l = P(c);
		D(s), ke(2), F((e, t) => {
			B(a, `${e ?? ""} `), Vi(c, I(r).props.showSeconds !== !1), B(l, ` ${t ?? ""}`);
		}, [() => K("lbl.variant"), () => K("lbl.countdownSeconds")]), L("change", c, (e) => i("showSeconds", e.target.checked)), z(e, t);
	};
	V(o, (e) => {
		t.area === "content" ? e(s) : t.area === "style" && e(c, 1);
	}), z(e, a), at();
}
Br(["change"]);
//#endregion
//#region src/menu/families/Audio.svelte
var sy = /* @__PURE__ */ R("<button class=\"ghost\"> </button>"), cy = /* @__PURE__ */ R("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"audio/*\"/></label> <!> <label> <input/></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1);
function ly(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { setBlockProp: i, setStatus: a } = n;
	function o(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		let n = new FileReader();
		n.onload = () => {
			i("src", String(n.result ?? "")), t.size > 4e5 && a(K("status.audioLarge", { kb: Math.round(t.size / 1024) }), "error");
		}, n.onerror = () => a(K("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	var s = Yr(), c = M(s), l = (e) => {
		var t = cy(), n = M(t), a = j(n), s = P(a);
		D(n);
		var c = P(n, 2), l = (e) => {
			var t = sy(), n = N(t, !0);
			F((e) => B(n, e), [() => K("ui.removeAudio")]), L("click", t, () => i("src", "")), z(e, t);
		};
		V(c, (e) => {
			I(r).props.src && e(l);
		});
		var u = P(c, 2), d = j(u), f = P(d);
		U(f), D(u);
		var p = P(u, 2), m = j(p);
		U(m);
		var h = P(m);
		D(p), F((e, t, i, o, s) => {
			G(n, "title", e), B(a, `${t ?? ""} `), B(d, `${i ?? ""} `), W(f, I(r).props.title ?? ""), Vi(m, o), B(h, ` ${s ?? ""}`);
		}, [
			() => K("tip.blocks.audioFile"),
			() => K("ui.chooseAudio"),
			() => K("lbl.audioTitle"),
			() => !!I(r).props.loop,
			() => K("lbl.audioLoop")
		]), L("change", s, o), L("change", f, (e) => i("title", e.target.value)), L("change", m, (e) => i("loop", e.target.checked)), z(e, t);
	};
	V(c, (e) => {
		t.area === "content" && e(l);
	}), z(e, s), at();
}
Br(["change", "click"]);
//#endregion
//#region src/menu/families/Collection.svelte
var uy = /* @__PURE__ */ R("<label> <!></label> <label> <input type=\"number\" min=\"0\" max=\"100\"/></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), dy = /* @__PURE__ */ R("<label> <!></label> <hr class=\"gridmenu-divider\"/>", 1);
function fy(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), i = /* @__PURE__ */ O(() => n.collectionIds), a = /* @__PURE__ */ O(() => n.collectionsView), { setBlockProp: o } = n;
	var s = Yr(), c = M(s), l = (e) => {
		var t = uy(), n = M(t), s = j(n), c = P(s);
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
		var l = P(n, 2), u = j(l), d = P(u);
		U(d), D(l);
		var f = P(l, 2), p = j(f);
		U(p);
		var m = P(p);
		D(f), F((e, t, i, a, o) => {
			G(n, "title", e), B(s, `${t ?? ""} `), G(l, "title", i), B(u, `${a ?? ""} `), W(d, I(r).props.limit ?? 6), Vi(p, I(r).props.newestFirst !== !1), B(m, ` ${o ?? ""}`);
		}, [
			() => K("tip.collection.source"),
			() => K("blocks.collection"),
			() => K("tip.collection.limit"),
			() => K("lbl.maxCount"),
			() => K("lbl.newestFirst")
		]), L("change", d, (e) => o("limit", Number(e.target.value))), L("change", p, (e) => o("newestFirst", e.target.checked)), z(e, t);
	}, u = (e) => {
		var t = dy(), n = M(t), i = j(n), a = P(i);
		{
			let e = /* @__PURE__ */ O(() => I(r).props.view ?? "cards"), t = /* @__PURE__ */ O(() => [
				["cards", K("opt.collectionView.cards")],
				["list", K("opt.collectionView.list")],
				["archive", K("opt.collectionView.archive")]
			]);
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
		D(n), ke(2), F((e) => B(i, `${e ?? ""} `), [() => K("lbl.view")]), z(e, t);
	};
	V(c, (e) => {
		t.area === "content" ? e(l) : t.area === "style" && e(u, 1);
	}), z(e, s), at();
}
Br(["change"]);
//#endregion
//#region src/menu/families/Product.svelte
var py = /* @__PURE__ */ R("<span class=\"toolbar-row\"><button class=\"ghost action\"> </button> <button class=\"ghost action\"> </button></span>"), my = /* @__PURE__ */ R("<button class=\"ghost action\"> </button>"), hy = /* @__PURE__ */ R("<label> <!></label> <!> <label> <input type=\"number\" min=\"0\" max=\"100\"/></label> <label> <input/></label>", 1), gy = /* @__PURE__ */ R("<label> <input type=\"number\" min=\"0\" max=\"6\"/></label> <hr class=\"gridmenu-divider\"/>", 1);
function _y(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), i = /* @__PURE__ */ O(() => n.collectionIds), a = /* @__PURE__ */ O(() => n.collectionsView), { setBlockProp: o, addCollectionEntry: s, createCatalogForBlock: c } = n;
	var l = Yr(), u = M(l), d = (e) => {
		var t = hy(), l = M(t), u = j(l), d = P(u);
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
		D(l);
		var f = P(l, 2), p = (e) => {
			var t = py(), i = j(t), a = N(i, !0), o = P(i, 2), c = N(o, !0);
			D(t), F((e, t, n, r) => {
				G(i, "title", e), B(a, t), G(o, "title", n), B(c, r);
			}, [
				() => K("tip.product.addProduct"),
				() => K("ui.addProduct"),
				() => K("tip.product.editCatalog"),
				() => K("ui.editCatalog")
			]), L("click", i, () => s(I(r).props.collection)), L("click", o, () => n.openCollection(I(r).props.collection)), z(e, t);
		}, m = (e) => {
			var t = my(), n = N(t, !0);
			F((e, r) => {
				G(t, "title", e), B(n, r);
			}, [() => K("tip.product.createCatalog"), () => K("ui.createCatalog")]), L("click", t, c), z(e, t);
		}, h = /* @__PURE__ */ O(() => !I(i).some((e) => I(a)[e]?.kind === "products"));
		V(f, (e) => {
			I(r).props.collection && I(a)[I(r).props.collection]?.kind === "products" ? e(p) : I(h) && e(m, 1);
		});
		var g = P(f, 2), _ = j(g), v = P(_);
		U(v), D(g);
		var y = P(g, 2), b = j(y), x = P(b);
		U(x), D(y), F((e, t, n, i, a, o) => {
			G(l, "title", e), B(u, `${t ?? ""} `), G(g, "title", n), B(_, `${i ?? ""} `), W(v, I(r).props.limit ?? 0), G(y, "title", a), B(b, `${o ?? ""} `), W(x, I(r).props.currency ?? "kr");
		}, [
			() => K("tip.product.source"),
			() => K("blocks.collection"),
			() => K("tip.collection.limit"),
			() => K("lbl.maxCount"),
			() => K("tip.product.currency"),
			() => K("lbl.currency")
		]), L("change", v, (e) => o("limit", Number(e.target.value))), L("change", x, (e) => o("currency", e.target.value)), z(e, t);
	}, f = (e) => {
		var t = gy(), n = M(t), i = j(n), a = P(i);
		U(a), D(n), ke(2), F((e, t) => {
			G(n, "title", e), B(i, `${t ?? ""} `), W(a, I(r).props.columns ?? 0);
		}, [() => K("tip.product.columns"), () => K("lbl.columns")]), L("change", a, (e) => o("columns", Number(e.target.value))), z(e, t);
	};
	V(u, (e) => {
		t.area === "content" ? e(d) : t.area === "style" && e(f, 1);
	}), z(e, l), at();
}
Br(["click", "change"]);
//#endregion
//#region src/menu/families/Cart.svelte
var vy = /* @__PURE__ */ R("<label> <!></label> <label> <input/></label>", 1), yy = /* @__PURE__ */ R("<label> <!></label> <hr class=\"gridmenu-divider\"/>", 1);
function by(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), i = /* @__PURE__ */ O(() => n.siteDraft), { setBlockProp: a } = n;
	var o = Yr(), s = M(o), c = (e) => {
		var t = vy(), n = M(t), o = j(n), s = P(o);
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
	}, l = (e) => {
		var t = yy(), n = M(t), i = j(n), o = P(i);
		{
			let e = /* @__PURE__ */ O(() => I(r).props.variant ?? "button"), t = /* @__PURE__ */ O(() => [["button", K("opt.cart.button")], ["icon", K("opt.cart.icon")]]);
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
		D(n), ke(2), F((e) => B(i, `${e ?? ""} `), [() => K("lbl.view")]), z(e, t);
	};
	V(s, (e) => {
		t.area === "content" ? e(c) : t.area === "style" && e(l, 1);
	}), z(e, o), at();
}
Br(["change"]);
//#endregion
//#region src/menu/families/Checkout.svelte
var xy = /* @__PURE__ */ R("<label> <input type=\"email\"/></label> <label> <input type=\"url\"/></label> <label> <input/></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label> <input/></label>", 1);
function Sy(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), { setBlockProp: i } = n;
	var a = Yr(), o = M(a), s = (e) => {
		var t = xy(), n = M(t), a = j(n), o = P(a);
		U(o), D(n);
		var s = P(n, 2), c = j(s), l = P(c);
		U(l), D(s);
		var u = P(s, 2), d = j(u), f = P(d);
		U(f), D(u);
		var p = P(u, 2), m = j(p);
		U(m);
		var h = P(m);
		D(p);
		var g = P(p, 2), _ = j(g), v = P(_);
		U(v), D(g), F((e, t, i, y, b, x, S, C, w, T) => {
			G(n, "title", e), B(a, `${t ?? ""} `), W(o, I(r).props.recipient ?? ""), G(s, "title", i), B(c, `${y ?? ""} `), W(l, I(r).props.endpoint ?? ""), G(u, "title", b), B(d, `${x ?? ""} `), W(f, I(r).props.vipps ?? ""), G(p, "title", S), Vi(m, I(r).props.vippsCheckout === !0), B(h, ` ${C ?? ""}`), G(g, "title", w), B(_, `${T ?? ""} `), W(v, I(r).props.currency ?? "kr");
		}, [
			() => K("tip.checkout.recipient"),
			() => K("lbl.recipientEmail"),
			() => K("tip.checkout.endpoint"),
			() => K("lbl.endpointUrl"),
			() => K("tip.checkout.vipps"),
			() => K("lbl.vippsNumber"),
			() => K("tip.checkout.vippsCheckout"),
			() => K("lbl.vippsCheckout"),
			() => K("tip.product.currency"),
			() => K("lbl.currency")
		]), L("change", o, (e) => i("recipient", e.target.value.trim())), L("change", l, (e) => i("endpoint", e.target.value.trim())), L("change", f, (e) => i("vipps", e.target.value.trim())), L("change", m, (e) => i("vippsCheckout", e.target.checked)), L("change", v, (e) => i("currency", e.target.value)), z(e, t);
	};
	V(o, (e) => {
		t.area === "content" && e(s);
	}), z(e, a), at();
}
Br(["change"]);
//#endregion
//#region src/menu/families/Fields.svelte
var Cy = pn({}), wy = pn({}), Ty = /* @__PURE__ */ k(!1), Ey = /* @__PURE__ */ R("<p> </p>"), Dy = /* @__PURE__ */ R("<label> <input type=\"text\"/></label> <button class=\"ghost\"> </button> <!>", 1), Oy = /* @__PURE__ */ R("<label> <input type=\"number\"/></label>"), ky = /* @__PURE__ */ R("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), Ay = /* @__PURE__ */ R("<label> <!></label>"), jy = /* @__PURE__ */ R("<label> <input type=\"text\"/></label>"), My = /* @__PURE__ */ R("<button class=\"ghost\"> </button>");
function Ny(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock), i = /* @__PURE__ */ O(() => n.pluginBlocks), { setBlockProp: a, setBlockProps: o } = n, s = (e, t) => (Number.isFinite(t) || (t = e.min ?? 0), e.min != null && (t = Math.max(e.min, t)), e.max != null && (t = Math.min(e.max, t)), t);
	async function c(e) {
		let t = I(r).blockId, n = `${t}:${e.key}`, i = (Cy[n] ?? I(r).props[e.key] ?? "").trim();
		wy[n] = null;
		let a = i.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
		if (!i || a || /^https?:\/\//i.test(i)) o(e.key, {
			[e.key]: i,
			lat: a ? Number(a[1]) : null,
			lon: a ? Number(a[2]) : null
		});
		else {
			A(Ty, !0), wy[n] = {
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
				}), wy[n] = null) : wy[n] = {
					text: ba(s) ?? K("props.place.notFound"),
					err: !0
				};
			} catch {
				wy[n] = {
					text: K("props.place.failed"),
					err: !0
				};
			} finally {
				A(Ty, !1);
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
		let t = /* @__PURE__ */ O(() => l[I(r).type] ?? I(i).find((e) => e.type === I(r).type)?.fields ?? []);
		var o = Yr(), u = M(o), d = (e) => {
			var n = Yr();
			ui(M(n), 17, () => I(t), (e) => e.key, (e, t) => {
				var n = Yr(), i = M(n), o = (e) => {
					let n = /* @__PURE__ */ O(() => `${I(r).blockId}:${I(t).key}`);
					var i = Dy(), a = M(i), o = j(a), s = P(o);
					U(s), D(a);
					var l = P(a, 2), u = N(l, !0), d = P(l, 2), f = (e) => {
						var t = Ey();
						let r;
						var i = N(t, !0);
						F(() => {
							r = Pi(t, 1, "panel-hint", null, r, { "place-error": wy[I(n)].err }), B(i, wy[I(n)].text);
						}), z(e, t);
					};
					V(d, (e) => {
						wy[I(n)] && e(f);
					}), F((e) => {
						B(o, `${I(t).label ?? ""} `), G(s, "placeholder", I(t).placeholder), W(s, Cy[I(n)] ?? I(r).props[I(t).key] ?? ""), l.disabled = I(Ty), B(u, e);
					}, [() => K("props.place.search")]), L("input", s, (e) => {
						Cy[I(n)] = e.target.value;
					}), L("keydown", s, (e) => {
						e.key === "Enter" && c(I(t));
					}), L("click", l, () => c(I(t))), z(e, i);
				}, l = (e) => {
					var n = Oy(), i = j(n), o = P(i);
					U(o), D(n), F(() => {
						B(i, `${I(t).label ?? ""} `), G(o, "min", I(t).min), G(o, "max", I(t).max), G(o, "step", I(t).step ?? 1), W(o, I(r).props[I(t).key]);
					}), L("change", o, (e) => a(I(t).key, s(I(t), Number(e.target.value)))), z(e, n);
				}, u = (e) => {
					var n = ky(), i = j(n);
					U(i);
					var o = P(i);
					D(n), F((e) => {
						Vi(i, e), B(o, ` ${I(t).label ?? ""}`);
					}, [() => !!I(r).props[I(t).key]]), L("change", i, (e) => a(I(t).key, e.target.checked)), z(e, n);
				}, d = (e) => {
					var n = Ay(), i = j(n), o = P(i);
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
					var n = jy(), i = j(n), o = P(i);
					U(o), D(n), F(() => {
						B(i, `${I(t).label ?? ""} `), G(o, "placeholder", I(t).placeholder), W(o, I(r).props[I(t).key] ?? "");
					}), L("change", o, (e) => a(I(t).key, e.target.value)), z(e, n);
				};
				V(i, (e) => {
					I(t).type === "place" ? e(o) : I(t).type === "number" ? e(l, 1) : I(t).type === "toggle" ? e(u, 2) : I(t).type === "select" ? e(d, 3) : e(f, -1);
				}), z(e, n);
			}), z(e, n);
		}, f = (e) => {
			var t = My(), i = N(t, !0);
			F((e, n) => {
				G(t, "title", e), B(i, n);
			}, [() => K("hint.pluginBlock"), () => K("ui.settings")]), L("click", t, () => n.bridge?.sendOpenConfig(I(r).blockId)), z(e, t);
		};
		V(u, (e) => {
			I(t).length ? e(d) : e(f, -1);
		}), z(e, o);
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
var Py = (e) => {
	lg(e, {});
}, Fy = /* @__PURE__ */ R("<button type=\"button\" class=\"menu-quick-open\"> </button>"), Iy = /* @__PURE__ */ R("<input type=\"number\"/>"), Ly = /* @__PURE__ */ R("<button type=\"button\"> </button>"), Ry = /* @__PURE__ */ R("<span class=\"seg\" role=\"group\"></span>"), zy = /* @__PURE__ */ R("<div class=\"menu-quick-item\"><span class=\"menu-quick-head\"><span class=\"mini-label\"> </span><!></span> <!></div>"), By = /* @__PURE__ */ R("<button type=\"button\" class=\"linkish menu-quick-reset\"> </button>"), Vy = /* @__PURE__ */ R("<div class=\"menu-quick\"><!> <!></div>"), Hy = /* @__PURE__ */ R("<div><section class=\"emenu-col\"><p class=\"panel-strong emenu-title\"> </p><!><p class=\"emenu-none\"> </p></section> <section class=\"emenu-col\"><p class=\"panel-strong emenu-title\"> </p><!><p class=\"emenu-none\"> </p></section> <section class=\"emenu-col\"><p class=\"panel-strong emenu-title\"> </p><!><p class=\"emenu-none\"> </p></section></div>"), Uy = /* @__PURE__ */ R("<div class=\"emenu-cols\"><section class=\"emenu-col\"><p class=\"panel-strong\"> </p><!></section> <section class=\"emenu-col\"><p class=\"panel-strong\"> </p><!></section> <section class=\"emenu-col\"><p class=\"panel-strong\"> </p><!></section></div>"), Wy = /* @__PURE__ */ R("<div class=\"props-tabs\"><span class=\"seg\"><button type=\"button\"> </button> <button type=\"button\"> </button> <button type=\"button\"> </button></span></div> <!>", 1), Gy = /* @__PURE__ */ R("<!> <!>", 1);
function Ky(e, t) {
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
		text: yg,
		button: Cg,
		image: Mg,
		video: Bg,
		icon: h_,
		shape: S_,
		gallery: P_,
		ribbon: $_,
		calendar: Dv,
		form: Nv,
		faq: Rv,
		timeline: Hv,
		quote: Jv,
		stats: Zv,
		table: ey,
		share: ry,
		countdown: oy,
		audio: ly,
		collection: fy,
		product: _y,
		cart: by,
		checkout: Sy
	}, _ = /* @__PURE__ */ O(() => h[I(a).type] ?? Ny), v = ra(t, "query", 3, "");
	function y() {
		let e = bh(I(a).type), t = new Map(b().map((e) => [e.id, e]));
		return sh(I(a).type, e, new Set(t.keys())).map((e) => t.get(e));
	}
	function b() {
		let e = I(a), t = [];
		e.type === "calendar" && (t.push({
			id: "design",
			label: K("calendar.design"),
			kind: "open",
			value: K(Om(e.props.design).labelKey),
			run: i.openDesignPicker
		}), [
			"list",
			"cards",
			"agenda"
		].includes(km(e.props)) && t.push({
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
		let n = Ms.has(e.type);
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
			options: Th(),
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
			let e = nu(r.view);
			t.push({
				id: "galleryView",
				label: K("lbl.view"),
				kind: "select",
				value: e,
				options: Ql.map((e) => [e, K(`opt.galleryView.${e}`)]),
				set: (e) => o("view", e)
			}), $l.includes(e) && t.push({
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
				options: Oh(),
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
		} else e.type === "shape" && (t.push({
			id: "shapeColor",
			label: K("lbl.color"),
			kind: "select",
			value: r.color ?? "accent",
			options: Ih(),
			set: (e) => o("color", e)
		}), t.push({
			id: "thickness",
			label: K("lbl.thickness"),
			kind: "number",
			min: 1,
			max: 40,
			value: r.thickness ?? 2,
			set: (e) => o("thickness", Math.max(1, Math.min(40, Number(e) || 2)))
		}));
		return Ns.has(e.type) || t.push({
			id: "size",
			label: K("lbl.scale"),
			kind: "number",
			min: Ps.min * 100,
			max: Ps.max * 100,
			step: 5,
			value: Math.round(Is(e) * 100),
			set: (e) => {
				l(), c(Math.min(Ps.max, Math.max(Ps.min, (Number(e) || 100) / 100))), l();
			}
		}), t;
	}
	var x = Gy(), S = M(x), C = (e) => {
		var t = Vy(), n = j(t);
		ui(n, 17, y, (e) => e.id, (e, t) => {
			var n = zy(), r = j(n), i = j(r), a = N(i, !0);
			wh(P(i), { get id() {
				return I(t).id;
			} }), D(r);
			var o = P(r, 2), s = (e) => {
				var n = Fy(), r = N(n, !0);
				F(() => B(r, I(t).value)), L("click", n, function(...e) {
					I(t).run?.apply(this, e);
				}), z(e, n);
			}, c = (e) => {
				var n = Iy();
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
					Uc(e, {
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
				var n = Ry();
				ui(n, 21, () => I(t).options, ([e, t]) => e, (e, n) => {
					var r = /* @__PURE__ */ O(() => g(I(n), 2));
					let i = () => I(r)[0], a = () => I(r)[1];
					var o = Ly();
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
			var t = By(), n = N(t, !0);
			F((e) => B(n, e), [() => K("menu.quickReset")]), L("click", t, () => xh(I(a).type, ah)), z(e, t);
		}, o = /* @__PURE__ */ O(() => uh(bh(I(a).type)));
		V(r, (e) => {
			I(o) && e(i);
		}), D(t), z(e, t);
	}, w = /* @__PURE__ */ O(() => !v().trim());
	V(S, (e) => {
		I(w) && e(C);
	});
	var T = P(S, 2), E = (e) => {
		var i = Hy();
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
		Py(b);
		var x = N(P(b), !0);
		D(g), D(i), Oi(i, () => Wh(v(), Fp)), F((e, n, r, o, s, l) => {
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
		var t = Uy(), i = j(t), a = j(i), o = N(a, !0), s = P(a);
		n(s), D(i);
		var c = P(i, 2), l = j(c), u = N(l, !0), d = P(l);
		r(d), D(c);
		var f = P(c, 2), p = j(f), m = N(p, !0);
		Py(P(p)), D(f), D(t), F((e, t, n) => {
			B(o, e), B(u, t), B(m, n);
		}, [
			() => K("props.tabContent"),
			() => K("props.tabStyle"),
			() => K("props.tabPlacement")
		]), z(e, t);
	}, ne = (e) => {
		var t = Wy(), i = M(t), a = j(i), o = j(a);
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
			Py(e);
		};
		V(h, (e) => {
			mh.tab === "content" ? e(g) : mh.tab === "style" ? e(_, 1) : e(v, -1);
		}), F((e, t, n) => {
			s = Pi(o, 1, "", null, s, { on: mh.tab === "content" }), B(c, e), u = Pi(l, 1, "", null, u, { on: mh.tab === "style" }), B(d, t), p = Pi(f, 1, "", null, p, { on: mh.tab === "placement" }), B(m, n);
		}, [
			() => K("props.tabContent"),
			() => K("props.tabStyle"),
			() => K("props.tabPlacement")
		]), L("click", o, () => mh.tab = "content"), L("click", l, () => mh.tab = "style"), L("click", f, () => mh.tab = "placement"), z(e, t);
	};
	V(T, (e) => {
		I(ee) ? e(E) : t.wide ? e(te, 1) : e(ne, -1);
	}), z(e, x), at();
}
Br(["click", "change"]);
//#endregion
//#region src/menu/SearchField.svelte
var qy = /* @__PURE__ */ R("<input type=\"search\" class=\"menu-search\"/>");
function Jy(e, t) {
	it(t, !0);
	var n = qy();
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
var Yy = [
	"wave",
	"tilt",
	"curve",
	"triangle",
	"zigzag"
], Xy = {
	min: 16,
	max: 240,
	dflt: 64
}, Zy = /* @__PURE__ */ R("<p class=\"panel-strong\"> </p> <!> <!>", 1), Qy = /* @__PURE__ */ R("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\"/>", 1), $y = /* @__PURE__ */ R("<button><span class=\"rs-sample\"><i class=\"rs-line\"></i> <i class=\"rs-chip\"></i> <i class=\"rs-dot\"></i></span> <span class=\"rs-name\"> </span></button>"), eb = /* @__PURE__ */ R("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" step=\"4\"/> <span class=\"gridmenu-value\"> </span></div> <label> <!></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), tb = /* @__PURE__ */ R("<label> <!></label> <!>", 1), nb = /* @__PURE__ */ R("<label> <!></label> <label> <input type=\"number\" min=\"0\" max=\"1000\" step=\"10\"/></label> <label> <!></label>", 1), rb = /* @__PURE__ */ R("<label> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\"/></label> <label> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\"/></label> <!>", 1), ib = /* @__PURE__ */ R("<p class=\"panel-strong\"> </p> <label> <input class=\"token-input\"/></label> <hr class=\"gridmenu-divider\"/> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <hr class=\"gridmenu-divider\"/> <p class=\"panel-strong\"> </p> <div class=\"rs-grid\"></div> <label> <span class=\"row-tools\"><span class=\"gridmenu-value\"> </span> <button class=\"ghost row-tool\"></button></span></label> <hr class=\"gridmenu-divider\"/> <p class=\"panel-strong\"> </p> <!> <hr class=\"gridmenu-divider\"/> <p class=\"panel-strong\"> </p> <!> <hr class=\"gridmenu-divider\"/> <label> <!></label> <!> <label> <!></label>", 1), ab = /* @__PURE__ */ R("<p class=\"panel-hint\"> </p>"), ob = /* @__PURE__ */ R("<div class=\"panel-body\"><!></div>");
function sb(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.activeSectionId), i = /* @__PURE__ */ O(() => n.bridge), a = /* @__PURE__ */ O(() => n.previewPalette), o = /* @__PURE__ */ O(() => n.sectionAnim), s = /* @__PURE__ */ O(() => n.sectionBg), c = /* @__PURE__ */ O(() => n.sectionBgCtx), l = /* @__PURE__ */ O(() => n.sectionDivider), u = /* @__PURE__ */ O(() => n.sectionGrid), d = /* @__PURE__ */ O(() => n.sectionHover), f = /* @__PURE__ */ O(() => n.sectionMinHeight), p = /* @__PURE__ */ O(() => n.sectionTheme), m = /* @__PURE__ */ O(() => n.selectedBlock), { BLOCK_LABELS: h, ENTRANCE_OPTIONS: _, HOVER_OPTIONS: v, animObj: y, isEntrance: b, mutateSection: x, normalizeAnim: S, readableOn: C, setSectionGrid: w, setSectionHeight: T, themeHex: E, themeSwatches: ee, toggleSectionGrid: te } = n;
	function ne(e) {
		x("section-theme", (t) => {
			e ? t.theme = e : delete t.theme;
		});
	}
	function re(e) {
		let t = I(a), n = (e) => e.replaceAll("var(--urd-base-bg)", t.bg).replaceAll("var(--urd-base-surface)", t.surface).replaceAll("var(--urd-base-text)", t.text).replaceAll("var(--urd-base-accent)", t.accent).replaceAll("var(--urd-base-accent-text)", t["accent-text"] ?? C(E(t.accent ?? "#000000", t))), r = mc(e);
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
	var le = ob(), ue = j(le), de = (e) => {
		var t = Zy(), n = M(t), r = N(n, !0), i = P(n, 2);
		Jy(i, {
			get: () => mh.propsQuery,
			set: (e) => mh.propsQuery = e
		}), Ky(P(i, 2), {
			wide: !1,
			get query() {
				return mh.propsQuery;
			}
		}), F((e) => B(r, e), [() => K("blocks.suffix", { label: h[I(m).type] ?? I(m).type })]), z(e, t);
	}, fe = (e) => {
		var t = ib(), n = M(t), i = N(n, !0), a = P(n, 2), m = j(a), h = P(m);
		U(h), D(a);
		var y = P(a, 4), x = j(y);
		U(x);
		var S = P(x);
		D(y);
		var C = P(y, 2), E = (e) => {
			var t = Qy(), n = M(t), r = j(n), i = N(P(r));
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
		ui(de, 21, () => [["", "common.standard"], ...Object.entries(pc)], ([e, t]) => e, (e, t) => {
			var n = /* @__PURE__ */ O(() => g(I(t), 2));
			let r = () => I(n)[0], i = () => I(n)[1], a = /* @__PURE__ */ O(() => re(r()));
			var o = $y();
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
		nf(be, {
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
			var o = tb(), s = M(o), c = j(s), u = P(c);
			{
				let e = /* @__PURE__ */ O(() => I(a)?.shape ?? ""), t = /* @__PURE__ */ O(() => [["", K("common.none")], ...Yy.map((e) => [e, K(`opt.divider.${e}`)])]);
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
				var t = eb(), n = M(t), i = j(n), o = N(i, !0), s = P(i, 2);
				U(s);
				var c = N(P(s, 2));
				D(n);
				var l = P(n, 2), u = j(l), d = P(u);
				{
					let e = /* @__PURE__ */ O(() => I(a).color ?? "bg"), t = /* @__PURE__ */ O(ee), n = /* @__PURE__ */ O(() => K("tip.divider.color"));
					Uc(d, {
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
					B(o, e), G(s, "min", Xy.min), G(s, "max", Xy.max), W(s, I(a).height ?? Xy.dflt), B(c, `${I(a).height ?? Xy.dflt ?? ""} px`), G(l, "title", t), B(u, `${n ?? ""} `), G(f, "title", r), Vi(p, I(a).flip === !0), B(m, ` ${i ?? ""}`), G(h, "title", d), Vi(g, I(a).invert === !0), B(_, ` ${v ?? ""}`);
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
			var t = rb(), n = M(t), r = j(n), i = P(r);
			U(i), D(n);
			var a = P(n, 2), s = j(a), c = P(s);
			U(c), D(a);
			var l = P(a, 2), u = (e) => {
				var t = nb(), n = M(t), r = j(n), i = P(r);
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
		var t = ab(), n = N(t, !0);
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
var cb = {
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
		let n = dc(t.color), r = t.x ?? .5, i = t.y ?? .3, a = t.radius ?? .5;
		e.style.background = `radial-gradient(circle at ${r * 100}% ${i * 100}%, ${n} 0%, transparent ${a * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, lb = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", ub = {
	version: 1,
	label: "Grain",
	labelKey: "bgLayer.grain",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = lb, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
};
//#endregion
//#region ../template/assets/engine/0.7.4/footer-thumb.js
function db(e = {}) {
	let t = "#2fd6b6", n = "#5c6b64", r = e.mega ? "#16221d" : "#0e1512", i = e.cols ?? 0, a = e.social ?? 0, o = `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${r}"/>`;
	if (e.mega && (o += `<circle cx="20" cy="6" r="34" fill="${t}" opacity="0.18"/>`), e.bigcta) return o += `<rect x="45" y="18" width="70" height="8" rx="3" fill="${n}" opacity="0.85"/>`, o += `<rect x="56" y="32" width="48" height="4" rx="2" fill="${n}" opacity="0.5"/>`, o += `<rect x="62" y="43" width="36" height="10" rx="3" fill="${t}"/>`, o += fb(n, e.baselineLinks), o + "</svg>";
	if (e.chapters) {
		o += `<rect x="12" y="10" width="20" height="6" rx="2" fill="${t}"/>`, o += `<rect x="12" y="20" width="46" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		let r = i || 3, a = (136 - (r - 1) * 8) / r;
		for (let e = 0; e < r; e++) {
			let r = 12 + e * (a + 8);
			o += `<line x1="${r}" y1="30" x2="${r + a}" y2="30" stroke="${n}" stroke-width="0.8" opacity="0.7"/>`, o += `<rect x="${r}" y="34" width="9" height="6" rx="1.5" fill="${t}"/>`;
			for (let e = 0; e < 3; e++) o += `<rect x="${r}" y="${44 + e * 6}" width="${a * .7}" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		}
		return o += fb(n, e.baselineLinks), o + "</svg>";
	}
	if (e.split) {
		o += `<rect x="8" y="8" width="70" height="52" rx="4" fill="${t}" opacity="0.16"/>`, o += `<rect x="16" y="16" width="20" height="6" rx="2" fill="${t}"/>`, o += `<rect x="16" y="26" width="46" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`, o += `<rect x="16" y="36" width="26" height="9" rx="3" fill="${t}"/>`;
		let r = i || 2;
		for (let e = 0; e < r; e++) {
			let r = 90 + e * 32;
			o += `<rect x="${r}" y="14" width="16" height="3" rx="1.5" fill="${t}" opacity="0.8"/>`;
			for (let e = 0; e < 4; e++) o += `<rect x="${r}" y="${22 + e * 7}" width="22" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		}
		return o += fb(n, e.baselineLinks), o + "</svg>";
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
	return o += fb(n, e.baselineLinks), o + "</svg>";
}
function fb(e, t = 0) {
	let n = `<line x1="8" y1="66" x2="152" y2="66" stroke="${e}" stroke-width="0.6" opacity="0.5"/>`;
	return n += `<rect x="8" y="70" width="40" height="3" rx="1.5" fill="${e}" opacity="0.6"/>`, t && (n += `<g fill="${e}" opacity="0.6">` + Array.from({ length: t }, (e, t) => `<rect x="${120 - t * 16}" y="70" width="12" height="3" rx="1.5"/>`).join("") + "</g>"), n;
}
//#endregion
//#region src/panels/FooterPanel.svelte
var pb = /* @__PURE__ */ R("<input class=\"nav-target\"/>"), mb = /* @__PURE__ */ R("<div class=\"nav-row nav-sub-row\"><input/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span> <span class=\"nav-target\"><!></span> <!></div>"), hb = /* @__PURE__ */ R("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), gb = /* @__PURE__ */ R("<details class=\"group\"><summary> </summary> <div class=\"group-items\"></div></details>"), _b = /* @__PURE__ */ R("<button class=\"footer-tp\"><span class=\"footer-tp-thumb\"></span> <span class=\"footer-tp-name\"> </span></button>"), vb = /* @__PURE__ */ R("<button class=\"ghost row-tool\"></button>"), yb = /* @__PURE__ */ R("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"16\" max=\"160\" step=\"2\"/>", 1), bb = /* @__PURE__ */ R("<span class=\"toolbar-row\"><label class=\"ghost filepick tb-grow\"> <input type=\"file\" accept=\"image/*\"/></label> <!></span> <!>", 1), xb = /* @__PURE__ */ R("<div class=\"nav-row\"><input/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></div> <!>", 1), Sb = /* @__PURE__ */ R("<div class=\"nav-row\"><span class=\"nav-line\"><span class=\"footer-soc-preview\" aria-hidden=\"true\"></span> <!></span> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span> <input class=\"nav-target\"/></div>"), Cb = /* @__PURE__ */ R("<input/>"), wb = /* @__PURE__ */ R("<label> <!></label> <!>", 1), Tb = /* @__PURE__ */ R("<label> <input/></label> <label> <input/></label> <label> <input/></label>", 1), Eb = /* @__PURE__ */ R("<label> <!></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label> <input/></label> <label> <input/></label> <label> <input/></label> <!>", 1), Db = /* @__PURE__ */ R("<label> <!></label> <hr class=\"gridmenu-divider\"/>", 1), Ob = /* @__PURE__ */ R("<div class=\"panel-body\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><div class=\"footer-tpick\"></div></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><label> <input/></label> <label> <input/></label> <label> <!></label> <!></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><!> <button class=\"ghost action\"> </button> <label> <!></label></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><!> <button class=\"ghost action\"> </button></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><!> <button class=\"ghost action\"> </button></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><!> <p class=\"panel-strong\"> </p> <!></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><label> <input/></label> <p class=\"panel-strong\"> </p> <!> <button class=\"ghost action\"> </button></div></details></div>");
function kb(e, t) {
	it(t, !0);
	let n = (e, t = f, n = f) => {
		var r = Yr();
		ui(M(r), 17, n, oi, (e, r, a) => {
			var o = mb(), s = j(o);
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
				var n = pb();
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
			baseline: [o(K("seed.footer.privacy"), "#")]
		} : e === "centered" ? {
			align: "center",
			brand: { title: t },
			linkRow: r(5),
			social: a([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: `${s} · ${K("seed.footer.madeWith")}`
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
						o(K("seed.footer.about"), "#"),
						o(K("seed.join"), "#"),
						o(K("seed.footer.press"), "#")
					]
				},
				{
					title: K("seed.footer.colResources"),
					links: [
						o(K("seed.footer.bylaws"), "#"),
						o(K("seed.footer.privacy"), "#"),
						o(K("seed.footer.contact"), "#")
					]
				}
			],
			social: a([
				"facebook",
				"instagram",
				"linkedin"
			]),
			copyright: s,
			baseline: [o(K("seed.footer.privacy"), "#"), o(K("seed.footer.terms"), "#")]
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
						o(K("seed.footer.home"), "#"),
						o(K("seed.footer.events"), "#"),
						o(K("seed.footer.gallery"), "#"),
						o(K("seed.footer.blog"), "#")
					]
				},
				{
					title: K("seed.footer.colCompany"),
					links: [
						o(K("seed.footer.about"), "#"),
						o(K("seed.footer.history"), "#"),
						o(K("seed.footer.press"), "#"),
						o(K("seed.footer.contact"), "#")
					]
				},
				{
					title: K("seed.footer.colSupport"),
					links: [
						o(K("seed.join"), "#"),
						o(K("seed.footer.faq"), "#"),
						o(K("seed.footer.help"), "#")
					]
				},
				{
					title: K("seed.footer.colLegal"),
					links: [
						o(K("seed.footer.privacy"), "#"),
						o(K("seed.footer.terms"), "#"),
						o(K("seed.footer.bylaws"), "#")
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
				o(K("seed.footer.privacy"), "#"),
				o(K("seed.footer.terms"), "#"),
				o(K("seed.footer.cookies"), "#")
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
					o(K("seed.footer.about"), "#"),
					o(K("seed.footer.contact"), "#"),
					o(K("seed.footer.privacy"), "#")
				]
			}],
			social: a(["facebook", "instagram"]),
			copyright: s,
			baseline: [o(K("seed.footer.privacy"), "#")]
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
			social: a([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: s,
			baseline: [o(K("seed.footer.privacy"), "#"), o(K("seed.footer.terms"), "#")]
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
						o(K("seed.footer.address"), "#"),
						o(K("seed.email"), `mailto:${K("seed.email")}`),
						o(K("seed.phone"), `tel:${K("seed.phone").replace(/\s+/g, "")}`)
					]
				},
				{
					title: K("seed.footer.colHours"),
					links: [o(K("seed.footer.hours1"), "#"), o(K("seed.footer.hours2"), "#")]
				},
				{
					title: K("seed.footer.colPages"),
					links: r(4)
				}
			],
			social: a(["facebook", "instagram"]),
			copyright: s,
			baseline: [o(K("seed.footer.privacy"), "#")]
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
						o(K("seed.footer.about"), "#"),
						o(K("seed.footer.history"), "#"),
						o(K("seed.footer.contact"), "#")
					]
				},
				{
					title: K("seed.footer.colSupport"),
					links: [
						o(K("seed.join"), "#"),
						o(K("seed.footer.faq"), "#"),
						o(K("seed.footer.help"), "#")
					]
				}
			],
			copyright: s,
			baseline: [o(K("seed.footer.privacy"), "#"), o(K("seed.footer.terms"), "#")]
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
					o(K("seed.footer.about"), "#"),
					o(K("seed.footer.contact"), "#"),
					o(K("seed.footer.privacy"), "#")
				]
			}],
			social: a(["facebook", "instagram"]),
			copyright: s,
			baseline: [o(K("seed.footer.privacy"), "#")]
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
				links: [o(K("seed.footer.newsletter"), "#"), o(K("seed.email"), `mailto:${K("seed.email")}`)]
			}],
			social: a([
				"facebook",
				"instagram",
				"linkedin",
				"youtube"
			]),
			copyright: s,
			baseline: [o(K("seed.footer.privacy"), "#"), o(K("seed.footer.madeWith"), "#")],
			background: {
				version: 1,
				layers: [{
					type: "glow",
					version: cb.version ?? 1,
					props: {
						...cb.defaults(),
						color: "accent",
						x: .12,
						y: 0,
						radius: .6,
						opacity: .45
					}
				}, {
					type: "grain",
					version: ub.version ?? 1,
					props: {
						...ub.defaults(),
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
	let ve = qc.filter(([e]) => e === "iconCat.social" || e === "iconCat.communication").flatMap(([, e]) => e.map((e) => [e, K(Kc[e].labelKey)]));
	var ye = Ob(), be = j(ye), xe = j(be);
	U(xe);
	var Se = P(xe);
	D(be);
	var Ce = P(be, 2), we = (e) => {
		var t = gb(), n = j(t), r = N(n, !0), a = P(n, 2);
		ui(a, 21, () => I(i).pages ?? [], (e) => e.id, (e, t) => {
			var n = hb(), r = j(n);
			U(r);
			var a = P(r);
			D(n), F((e, i) => {
				G(n, "title", e), Vi(r, i), B(a, ` ${(I(t).title || I(t).id) ?? ""}`);
			}, [() => K("tip.footer.hideOnPage"), () => !(I(i).footer?.hideOn ?? []).includes(I(t).id)]), L("change", r, (e) => ne(I(t).id, e.target.checked)), z(e, n);
		}), D(a), D(t), F((e) => B(r, e), [() => K("group.showOnPages")]), z(e, t);
	};
	V(Ce, (e) => {
		I(i).footer?.show && e(we);
	});
	var Te = P(Ce, 2), Ee = j(Te), De = N(Ee, !0), Oe = P(Ee, 2), Ae = j(Oe);
	ui(Ae, 21, () => g, (e) => e.id, (e, t) => {
		var n = _b(), r = j(n);
		H(r, () => db(I(t).thumb), !0), D(r);
		var i = N(P(r, 2), !0);
		D(n), F((e) => {
			G(n, "title", e), B(i, I(t).label);
		}, [() => K("tip.footer.template", { label: I(t).label })]), L("click", n, () => v(I(t).id)), z(e, n);
	}), D(Ae), D(Oe), D(Te);
	var je = P(Te, 2), Me = j(je), Ne = N(Me, !0), Pe = P(Me, 2), Fe = j(Pe), Ie = j(Fe), Le = P(Ie);
	U(Le), D(Fe);
	var Re = P(Fe, 2), ze = j(Re), Be = P(ze);
	U(Be), D(Re);
	var Ve = P(Re, 2), He = j(Ve), Ue = P(He);
	{
		let e = /* @__PURE__ */ O(() => I(i).footer?.brand?.mode ?? "text"), t = /* @__PURE__ */ O(() => [
			["text", K("blocks.text")],
			["image", K("opt.brand.image")],
			["both", K("opt.brand.both")]
		]);
		J(Ue, {
			get value() {
				return I(e);
			},
			get options() {
				return I(t);
			},
			onchange: (e) => u(e)
		});
	}
	D(Ve);
	var We = P(Ve, 2), Ge = (e) => {
		var t = bb(), n = M(t), r = j(n), a = j(r), o = P(a);
		D(r);
		var s = P(r, 2), c = (e) => {
			var t = vb();
			H(t, () => q.cross, !0), D(t), F((e) => G(t, "title", e), [() => K("tip.footer.removeLogo")]), L("click", t, p), z(e, t);
		};
		V(s, (e) => {
			I(i).footer?.brand?.logo && e(c);
		}), D(n);
		var l = P(n, 2), u = (e) => {
			var t = yb(), n = M(t), r = j(n), a = N(P(r));
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
	V(We, (e) => {
		(I(i).footer?.brand?.mode ?? "text") !== "text" && e(Ge);
	}), D(Pe), D(je);
	var Ke = P(je, 2), qe = j(Ke), Je = N(qe, !0), Ye = P(qe, 2), Xe = j(Ye);
	ui(Xe, 17, () => I(i).footer?.columns ?? [], oi, (e, t, n) => {
		var r = xb(), a = M(r), o = j(a);
		U(o);
		var s = P(o, 2), c = j(s);
		H(c, () => q.plus, !0), D(c);
		var l = P(c, 2);
		l.disabled = n === 0, H(l, () => q.up, !0), D(l);
		var u = P(l, 2);
		H(u, () => q.down, !0), D(u);
		var d = P(u, 2);
		H(d, () => q.cross, !0), D(d), D(s), D(a), ui(P(a, 2), 17, () => I(t).links ?? [], oi, (e, r, a) => {
			var o = mb(), s = j(o);
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
				var t = pb();
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
	var Ze = P(Xe, 2), Qe = N(Ze, !0), $e = P(Ze, 2), et = j($e), tt = P(et);
	{
		let e = /* @__PURE__ */ O(() => I(i).footer?.columnsAlign ?? "left"), t = /* @__PURE__ */ O(() => [["left", K("common.left")], ["center", K("common.center")]]);
		J(tt, {
			get value() {
				return I(e);
			},
			get options() {
				return I(t);
			},
			onchange: (e) => T(e)
		});
	}
	D($e), D(Ye), D(Ke);
	var rt = P(Ke, 2), ot = j(rt), st = N(ot, !0), ct = P(ot, 2), lt = j(ct);
	ui(lt, 17, () => I(i).footer?.social ?? [], oi, (e, t, n) => {
		var r = Sb(), a = j(r), o = j(a);
		H(o, () => Jc(I(t).icon) || "", !0), D(o);
		var s = P(o, 2);
		{
			let e = /* @__PURE__ */ O(() => K("blocks.icon"));
			J(s, {
				get value() {
					return I(t).icon;
				},
				get title() {
					return I(e);
				},
				get options() {
					return ve;
				},
				onchange: (e) => ge(n, e)
			});
		}
		D(a);
		var c = P(a, 2), l = j(c);
		l.disabled = n === 0, H(l, () => q.up, !0), D(l);
		var u = P(l, 2);
		H(u, () => q.down, !0), D(u);
		var d = P(u, 2);
		H(d, () => q.cross, !0), D(d), D(c);
		var f = P(c, 2);
		U(f), D(r), F((e, r) => {
			u.disabled = n === I(i).footer.social.length - 1, G(d, "title", e), W(f, I(t).url), G(f, "placeholder", r);
		}, [() => K("tip.removeLink"), () => K("ph.hrefMailto")]), L("click", l, () => he(n, -1)), L("click", u, () => he(n, 1)), L("click", d, () => me(n)), L("change", f, (e) => _e(n, e.target.value)), z(e, r);
	});
	var ut = P(lt, 2), dt = N(ut, !0);
	D(ct), D(rt);
	var ft = P(rt, 2), pt = j(ft), mt = N(pt, !0), ht = P(pt, 2), gt = j(ht), _t = j(gt);
	U(_t);
	var vt = P(_t);
	D(gt);
	var yt = P(gt, 2), bt = (e) => {
		let t = /* @__PURE__ */ O(() => I(i).footer.cta);
		var n = Eb(), r = M(n), a = j(r), o = P(a);
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
			var n = wb(), r = M(n), a = j(r), o = P(a);
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
				var n = Cb();
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
			var n = Tb(), r = M(n), i = j(r), a = P(i);
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
	V(yt, (e) => {
		I(i).footer?.cta && e(bt);
	}), D(ht), D(ft);
	var xt = P(ft, 2), St = j(xt), Ct = N(St, !0), wt = P(St, 2), Tt = j(wt);
	n(Tt, () => "linkRow", () => I(i).footer?.linkRow ?? []);
	var Et = P(Tt, 2), Dt = N(Et, !0);
	D(wt), D(xt);
	var Ot = P(xt, 2), kt = j(Ot), At = N(kt, !0), jt = P(kt, 2), Mt = j(jt), Nt = (e) => {
		var t = Db(), n = M(t), r = j(n), a = P(r);
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
	V(Mt, (e) => {
		I(i).footer?.cta?.big !== !0 && e(Nt);
	});
	var Pt = P(Mt, 2), Ft = N(Pt, !0), It = P(Pt, 2);
	{
		let e = /* @__PURE__ */ O(() => I(i).footer?.background?.layers ?? []);
		nf(It, {
			get bg() {
				return o;
			},
			get layers() {
				return I(e);
			}
		});
	}
	D(jt), D(Ot);
	var Lt = P(Ot, 2), Rt = j(Lt), zt = N(Rt, !0), Bt = P(Rt, 2), Vt = j(Bt), Ht = j(Vt), Ut = P(Ht);
	U(Ut), D(Vt);
	var Wt = P(Vt, 2), Gt = N(Wt, !0), Kt = P(Wt, 2);
	n(Kt, () => "baseline", () => I(i).footer?.baseline ?? []);
	var qt = P(Kt, 2), Jt = N(qt, !0);
	D(Bt), D(Lt), D(ye), F((e, t, n, r, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E, ee, te, ne, re, ie, ae) => {
		G(be, "title", e), Vi(xe, t), B(Se, ` ${n ?? ""}`), B(De, r), B(Ne, a), G(Fe, "title", o), B(Ie, `${s ?? ""} `), W(Le, I(i).footer?.brand?.title ?? ""), G(Le, "placeholder", c), G(Re, "title", l), B(ze, `${u ?? ""} `), W(Be, I(i).footer?.brand?.tagline ?? ""), G(Ve, "title", d), B(He, `${f ?? ""} `), B(Je, p), B(Qe, m), G($e, "title", h), B(et, `${g ?? ""} `), B(st, _), B(dt, v), B(mt, y), G(gt, "title", b), Vi(_t, x), B(vt, ` ${S ?? ""}`), B(Ct, C), B(Dt, w), B(At, T), B(Ft, E), B(zt, ee), G(Vt, "title", te), B(Ht, `${ne ?? ""} `), W(Ut, I(i).footer?.copyright ?? ""), G(Ut, "placeholder", re), B(Gt, ie), B(Jt, ae);
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
		() => K("group.social"),
		() => K("ui.addSocial"),
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
	]), L("change", xe, (e) => s("footer", (t) => {
		t.show = e.target.checked;
	})), L("input", Le, (e) => l("title", e.target.value)), L("input", Be, (e) => l("tagline", e.target.value)), L("click", Ze, re), L("click", ut, pe), L("change", _t, (e) => E(e.target.checked)), L("click", Et, () => y("linkRow")), L("input", Ut, (e) => h(e.target.value)), L("click", qt, () => y("baseline")), z(e, ye), at();
}
Br([
	"input",
	"click",
	"change"
]);
//#endregion
//#region ../template/assets/engine/0.7.4/collections-csv.js
var Ab = [
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
function jb(e) {
	let t = String(e ?? "");
	return /[",\n\r]/.test(t) ? `"${t.replaceAll("\"", "\"\"")}"` : t;
}
function Mb(e, t) {
	return t === "sizes" ? (e.sizes ?? []).join("|") : t === "colors" ? (e.colors ?? []).map((e) => e.name).join("|") : e[t] ?? "";
}
function Nb(e) {
	let t = [Ab.join(",")];
	for (let n of e ?? []) t.push(Ab.map((e) => jb(Mb(n, e))).join(","));
	return t.join("\n") + "\n";
}
function Pb(e) {
	let t = [], n = [], r = "", i = !1, a = String(e ?? "");
	for (let e = 0; e < a.length; e += 1) {
		let o = a[e];
		i ? o === "\"" && a[e + 1] === "\"" ? (r += "\"", e += 1) : o === "\"" ? i = !1 : r += o : o === "\"" ? i = !0 : o === "," ? (n.push(r), r = "") : o === "\n" || o === "\r" ? (o === "\r" && a[e + 1] === "\n" && (e += 1), n.push(r), t.push(n), n = [], r = "") : r += o;
	}
	return (r !== "" || n.length) && (n.push(r), t.push(n)), t.filter((e) => e.some((e) => e.trim() !== ""));
}
var Fb = (e) => String(e ?? "").split("|").map((e) => e.trim()).filter(Boolean);
function Ib(e) {
	let t = Pb(e);
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
		let s = Fb(t.sizes);
		s.length && (o.sizes = s);
		let c = Fb(t.colors);
		c.length && (o.colors = c.map((e) => ({ name: e }))), r.push(o);
	}
	return {
		entries: r,
		skipped: i
	};
}
//#endregion
//#region src/panels/CollectionsPanel.svelte
var Lb = /* @__PURE__ */ R("<label> <!></label>"), Rb = /* @__PURE__ */ R("<label> <input type=\"date\"/></label>"), zb = /* @__PURE__ */ R("<label> <input/></label>"), Bb = /* @__PURE__ */ R("<img class=\"site-icon-preview\" alt=\"\"/> <button class=\"ghost row-tool\"></button>", 1), Vb = /* @__PURE__ */ R("<img class=\"site-icon-preview\" alt=\"\"/>"), Hb = /* @__PURE__ */ R("<span class=\"toolbar-row\"><input/> <label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <!> <button class=\"ghost row-tool\"></button></span>"), Ub = /* @__PURE__ */ R("<label> <input type=\"number\" min=\"0\" step=\"0.01\"/></label> <label> <input type=\"number\" min=\"0\" step=\"0.01\"/></label> <label> <input/></label> <label> <input/></label> <!> <button class=\"ghost action\"> </button>", 1), Wb = /* @__PURE__ */ R("<details class=\"group collection-entry\"><summary> </summary> <div class=\"group-items\"><span class=\"toolbar-row\"><input/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span> <!> <textarea rows=\"3\"></textarea> <!> <span class=\"toolbar-row\"><label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <!></span> <!></div></details>"), Gb = /* @__PURE__ */ R("<p class=\"panel-hint\"> </p>"), Kb = /* @__PURE__ */ R("<span class=\"toolbar-row\"><button class=\"ghost action\"> </button> <button class=\"ghost action\"> </button> <label class=\"ghost filepick\"> <input type=\"file\" accept=\".csv,text/csv\"/></label> <button class=\"ghost row-tool\"></button></span> <!> <!> <hr class=\"gridmenu-divider\"/>", 1), qb = /* @__PURE__ */ R("<div class=\"panel-body\"><!> <!> <label> <input/></label> <label> <!></label> <button class=\"ghost action\"> </button></div>");
function Jb(e, t) {
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
		let n = URL.createObjectURL(new Blob([Nb(t.entries)], { type: "text/csv" })), r = document.createElement("a");
		r.href = n, r.download = `${e}.csv`, r.click(), URL.revokeObjectURL(n);
	}
	async function w(e, t) {
		let n = t.target.files?.[0];
		if (t.target.value = "", !n) return;
		let r = Ib(await n.text());
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
	var T = qb(), E = j(T), ee = (e) => {
		var t = Lb(), i = j(t), o = P(i);
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
		var r = Kb(), i = M(r), o = j(i), c = N(o, !0), l = P(o, 2), f = N(l, !0), p = P(l, 2), T = j(p), E = P(T);
		D(p);
		var ee = P(p, 2);
		H(ee, () => q.cross, !0), D(ee), D(i);
		var te = P(i, 2);
		ui(te, 19, () => I(t).entries, (e) => e.id, (e, r, i) => {
			var a = Wb(), o = j(a), s = N(o), c = P(o, 2), l = j(c), d = j(l);
			U(d);
			var f = P(d, 2), p = j(f);
			H(p, () => q.up, !0), D(p);
			var C = P(p, 2);
			H(C, () => q.down, !0), D(C);
			var w = P(C, 2);
			H(w, () => q.cross, !0), D(w), D(f), D(l);
			var T = P(l, 2), E = (e) => {
				var t = Rb(), i = j(t), a = P(i);
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
				var t = zb(), i = j(t), a = P(i);
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
				var t = Bb(), i = M(t), a = P(i, 2);
				H(a, () => q.cross, !0), D(a), F((e) => {
					G(i, "src", I(r).image), G(a, "title", e);
				}, [() => K("tip.removeImage")]), L("click", a, () => m(n.activeCollection, I(r).id, "image", "")), z(e, t);
			};
			V(se, (e) => {
				I(r).image && e(ce);
			}), D(re);
			var le = P(re, 2), ue = (e) => {
				var t = Ub(), i = M(t), a = j(i), o = P(a);
				U(o), D(i);
				var s = P(i, 2), c = j(s), l = P(c);
				U(l), D(s);
				var u = P(s, 2), d = j(u), f = P(d);
				U(f), D(u);
				var p = P(u, 2), h = j(p), g = P(h);
				U(g), D(p);
				var _ = P(p, 2);
				ui(_, 17, () => I(r).colors ?? [], oi, (e, t, i) => {
					var a = Hb(), o = j(a);
					U(o);
					var s = P(o, 2), c = j(s), l = P(c);
					D(s);
					var u = P(s, 2), d = (e) => {
						var n = Vb();
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
			var t = Gb(), n = N(t, !0);
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
var Yb = /* @__PURE__ */ R("<p class=\"panel-hint\"> </p>"), Xb = /* @__PURE__ */ R("<span class=\"plugin-meta\"> </span>"), Zb = /* @__PURE__ */ R("<p class=\"panel-hint plugin-warn\"> </p>"), Qb = /* @__PURE__ */ R("<div><span class=\"plugin-head\"><span class=\"plugin-name\"> </span> <!> <span class=\"row-tools\"><label class=\"gridmenu-snap plugin-toggle\"><input type=\"checkbox\"/> </label> <button class=\"ghost row-tool\"></button></span></span> <!> <!></div>"), $b = /* @__PURE__ */ R("<div class=\"plugin-row\"><span class=\"plugin-head\"><span class=\"plugin-name\"> </span> <!> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button></span></span></div>"), ex = /* @__PURE__ */ R("<hr class=\"gridmenu-divider\"/> <p class=\"panel-strong\"> </p> <!>", 1), tx = /* @__PURE__ */ R("<hr class=\"gridmenu-divider\"/> <input/> <button class=\"ghost action\"> </button> <!>", 1), nx = /* @__PURE__ */ R("<div class=\"panel-body\"><!> <!> <!> <!></div>");
function rx(e, t) {
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
	var _ = nx(), v = j(_), y = (e) => {
		var t = Yb(), n = N(t, !0);
		F((e) => B(n, e), [() => K("hint.plugins.empty")]), z(e, t);
	}, b = /* @__PURE__ */ O(() => !c().length);
	V(v, (e) => {
		I(b) && e(y);
	});
	var x = P(v, 2);
	ui(x, 16, c, (e) => e, (e, t) => {
		let n = /* @__PURE__ */ O(() => I(o)[t]), r = /* @__PURE__ */ O(() => (I(s)?.enabled ?? []).includes(t));
		var i = Qb();
		let c;
		var l = j(i), f = j(l), p = N(f, !0), h = P(f, 2), g = (e) => {
			var t = Xb(), r = N(t);
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
			var t = Zb(), r = N(t, !0);
			F((e) => B(r, e), [() => I(n).errors.join("; ")]), z(e, t);
		}, w = (e) => {
			var t = Zb(), r = N(t, !0);
			F((e) => B(r, e), [() => K("plugin.engineMismatch", {
				required: I(n).requiresEngine,
				current: I(a)
			})]), z(e, t);
		}, T = (e) => {
			var t = Zb(), r = N(t, !0);
			F((e) => B(r, e), [() => K("plugin.cspNeeded", { list: m(I(n).csp).join(", ") })]), z(e, t);
		}, E = /* @__PURE__ */ O(() => I(n)?.csp && m(I(n).csp).length);
		V(S, (e) => {
			I(n)?.errors?.length ? e(C) : I(n) && !I(n).satisfied ? e(w, 1) : I(E) && e(T, 2);
		});
		var ee = P(S, 2), te = (e) => {
			var t = Yb(), r = N(t, !0);
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
		var t = ex(), r = P(M(t), 2), i = N(r, !0);
		ui(P(r, 2), 16, () => n.pluginsFound, (e) => e, (e, t) => {
			var n = $b(), r = j(n), i = j(r), a = N(i, !0), s = P(i, 2), c = (e) => {
				var n = Xb(), r = N(n);
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
			var t = Yb(), n = N(t, !0);
			F((e) => B(n, e), [() => K("hint.plugins.autoDiscover")]), z(e, t);
		};
		V(r, (e) => {
			n.pluginsFound.length || e(i);
		}), z(e, t);
	}, E = (e) => {
		var t = tx(), n = P(M(t), 2);
		U(n);
		var r = P(n, 2), i = N(r, !0), a = P(r, 2), o = (e) => {
			var t = Zb(), n = N(t, !0);
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
var ix = /* @__PURE__ */ R("<p class=\"panel-hint\"> </p>"), ax = /* @__PURE__ */ R("<div><span class=\"history-msg\"> </span> <span class=\"history-meta\"> </span></div>"), ox = /* @__PURE__ */ R("<button class=\"ghost\"> </button> <!>", 1), sx = /* @__PURE__ */ R("<!> <!>", 1), cx = /* @__PURE__ */ R("<div class=\"panel-body\"><!></div>");
function lx(e, t) {
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
	var h = cx(), g = j(h), _ = (e) => {
		var t = ix(), n = N(t, !0);
		F((e) => B(n, e), [() => K("hint.history.loading")]), z(e, t);
	}, v = (e) => {
		var t = sx(), n = M(t), o = (e) => {
			var t = ix(), n = N(t, !0);
			F(() => B(n, I(i))), z(e, t);
		};
		V(n, (e) => {
			I(i) && e(o);
		});
		var s = P(n, 2), c = (e) => {
			var t = ox(), n = M(t), i = N(n, !0);
			ui(P(n, 2), 19, () => I(a), (e) => e.sha, (e, t, n) => {
				var r = ax();
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
var ux = /* @__PURE__ */ R("<p class=\"panel-hint\"> </p>"), dx = /* @__PURE__ */ R("<p class=\"panel-hint\"> </p> <button class=\"ghost\"> </button>", 1), fx = /* @__PURE__ */ R("<span class=\"update-arrow\"></span> <span class=\"badge\"> </span>", 1), px = /* @__PURE__ */ R("<details class=\"group\"><summary> </summary> <div class=\"group-items\"><p class=\"update-notes\"> </p></div></details>"), mx = /* @__PURE__ */ R("<details class=\"group\"><summary><span class=\"update-warn\"></span> </summary> <div class=\"group-items\"><pre class=\"update-headers\"> </pre></div></details>"), hx = /* @__PURE__ */ R("<span class=\"chip\"> </span>"), gx = /* @__PURE__ */ R("<div class=\"update-row\"><span class=\"update-path\"> </span> <span class=\"update-flags\"><!> <span class=\"update-warn\"></span></span></div>"), _x = /* @__PURE__ */ R("<div class=\"update-row\"><span class=\"update-path\"> </span> <!></div>"), vx = /* @__PURE__ */ R("<span class=\"update-warn\"></span>"), yx = /* @__PURE__ */ R("<div class=\"update-row\"><span> </span> <span class=\"update-flags\"><!> <!> <input type=\"checkbox\"/></span></div>"), bx = /* @__PURE__ */ R("<div class=\"ctl-row update-opt-head\"><p class=\"panel-strong\"> </p> <span class=\"mini-label\"> </span></div> <!>", 1), xx = /* @__PURE__ */ R("<p class=\"update-summary\"> </p> <!> <!> <!> <details class=\"group\"><summary> </summary> <div class=\"group-items\"></div></details> <!> <button class=\"primary update-run\"> </button>", 1), Sx = /* @__PURE__ */ R("<div class=\"update-versions\"><span class=\"update-from\"> </span> <!></div> <!>", 1), Cx = /* @__PURE__ */ R("<div class=\"panel-body\"><!></div>");
function wx(e, t) {
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
	var f = Cx(), p = j(f), m = (e) => {
		var t = ux(), n = N(t, !0);
		F((e) => B(n, e), [() => K("update.checking")]), z(e, t);
	}, h = (e) => {
		var t = dx(), n = M(t), r = N(n, !0), a = P(n, 2), o = N(a, !0);
		F((e) => {
			B(r, I(i)), B(o, e);
		}, [() => K("update.retry")]), L("click", a, s), z(e, t);
	}, g = (e) => {
		var t = Sx(), i = M(t), o = j(i), s = N(o, !0), c = P(o, 2), d = (e) => {
			var t = fx(), n = M(t);
			H(n, () => q.right, !0), D(n);
			var r = N(P(n, 2), !0);
			F(() => B(r, I(a).target)), z(e, t);
		};
		V(c, (e) => {
			I(a).upToDate || e(d);
		}), D(i);
		var f = P(i, 2), p = (e) => {
			var t = ux(), n = N(t, !0);
			F((e) => B(n, e), [() => K("update.upToDate")]), z(e, t);
		}, m = (e) => {
			var t = xx(), i = M(t), o = N(i, !0), s = P(i, 2), c = (e) => {
				var t = px(), n = j(t), r = N(n, !0), i = P(n, 2), o = N(j(i), !0);
				D(i), D(t), F((e) => {
					B(r, e), B(o, I(a).notes);
				}, [() => K("update.aboutVersion", { target: I(a).target })]), z(e, t);
			};
			V(s, (e) => {
				I(a).notes && e(c);
			});
			var d = P(s, 2), f = (e) => {
				var t = mx(), n = j(t), r = j(n);
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
				var n = gx(), r = j(n), i = N(r, !0), a = P(r, 2), o = j(a), s = (e) => {
					var t = hx(), n = N(t, !0);
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
				var n = _x(), r = j(n), i = N(r, !0), a = P(r, 2), o = (e) => {
					var t = hx(), n = N(t, !0);
					F((e) => B(n, e), [() => K("update.actionDelete")]), z(e, t);
				};
				V(a, (e) => {
					I(t).action === "delete" && e(o);
				}), D(n), F(() => {
					G(r, "title", I(t).path), B(i, I(t).path);
				}), z(e, n);
			}), D(_), D(m);
			var v = P(m, 2), y = (e) => {
				var t = bx(), r = M(t), i = j(r), o = N(i, !0), s = N(P(i, 2), !0);
				D(r), ui(P(r, 2), 17, () => I(a).changes.filter((e) => !e.atom), (e) => e.path, (e, t) => {
					var r = yx(), i = j(r);
					let a;
					var o = N(i, !0), s = P(i, 2), c = j(s), u = (e) => {
						var t = hx(), n = N(t, !0);
						F((e) => B(n, e), [() => K("update.actionDelete")]), z(e, t);
					};
					V(c, (e) => {
						I(t).action === "delete" && e(u);
					});
					var d = P(c, 2), f = (e) => {
						var n = vx();
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
var Tx = /* @__PURE__ */ R("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\"> </h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\"></canvas> <p class=\"ie-hint svelte-e7sog7\"> </p></div> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"ghost svelte-e7sog7\"> </button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"primary svelte-e7sog7\"> </button></span></div></div>");
function Ex(e, t) {
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
	var h = Tx(), g = j(h), _ = j(g), v = N(_, !0), y = P(_, 2), b = j(y);
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
var Dx = "#0e1512", Ox = "#2fd6b6", kx = "#5c6b64", Ax = "#22302a", jx = "#e8efe9", Mx = "#16221d", Nx = "#1c2340", Px = "#f3ecd8", Fx = "#d0a74a", Ix = (e) => e < 1 ? ` opacity="${e}"` : "", Z = (e, t, n, r, i, a = 1, o = 2) => `<rect x="${e}" y="${t}" width="${n}" height="${r}" rx="${o}" fill="${i}"${Ix(a)}/>`, Lx = (e, t, n, r, i = 1) => `<circle cx="${e}" cy="${t}" r="${n}" fill="${r}"${Ix(i)}/>`, Rx = (e, t, n, r, i, a = 1, o = 1) => `<line x1="${e}" y1="${t}" x2="${n}" y2="${r}" stroke="${i}" stroke-width="${a}"${Ix(o)}/>`, zx = (e, t, n, r) => Array.from({ length: e }, (e, i) => r(t + i * n, i)).join(""), Bx = (e, t = Dx) => `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${t}"/>${e}</svg>`;
function Vx(e, t, n, r, i, a = kx) {
	let o = "", s = n / 7, c = r / 4;
	for (let n = 0; n < 28; n++) {
		let r = e + n % 7 * s + s / 2, l = t + Math.floor(n / 7) * c + c / 2;
		o += Lx(r, l, 1.6, i.includes(n) ? Ox : a, i.includes(n) ? 1 : .55);
	}
	return o;
}
var Hx = {
	plain: () => zx(3, 12, 20, (e) => Z(14, e, 14, 14, Ax, 1, 3) + Z(34, e + 2, 70, 4, kx, .9) + Z(34, e + 9, 46, 3, kx, .5)),
	timeline: () => Rx(50, 10, 50, 70, kx, 1.2, .7) + zx(3, 16, 22, (e, t) => Z(18, e - 3, 24, 5, kx, .9) + Lx(50, e, 3.4, t ? kx : Ox) + Z(60, e - 3, 62, 4, kx, .9) + Z(60, e + 4, 40, 3, kx, .5)),
	table: () => Z(12, 10, 136, 10, Ox, 1, 3) + zx(4, 26, 12, (e, t) => (t % 2 ? Z(12, e - 3, 136, 12, Ax, .8, 0) : "") + Z(16, e, 20, 3, kx, .9) + Z(44, e, 14, 3, kx, .5) + Z(66, e, 44, 3, kx, .9) + Z(118, e, 24, 3, kx, .5)),
	booklet: () => Z(12, 8, 136, 64, jx, 1, 2) + Z(20, 14, 40, 7, Mx) + Rx(20, 26, 140, 26, Mx, 1.4) + [20, 84].map((e) => zx(3, 32, 12, (t) => Z(e, t, 8, 8, Ox, 1, 1) + Z(e + 12, t, 36, 3, Mx, .85) + Z(e + 12, t + 5, 26, 2.5, Mx, .4))).join(""),
	numbered: () => zx(3, 12, 20, (e) => Rx(14, e - 3, 146, e - 3, kx, .8, .6) + Z(14, e, 14, 12, Ox, 1, 2) + Z(36, e + 1, 64, 4, kx, .9) + Z(36, e + 8, 44, 3, kx, .5) + Z(120, e + 3, 24, 4, Ox, .7)),
	apList: () => zx(3, 10, 21, (e) => Z(12, e, 136, 17, Nx, 1, 2) + Z(18, e + 4, 10, 9, Fx, 1, 1) + Rx(34, e + 3, 34, e + 14, Fx, .8, .5) + Z(40, e + 4, 26, 3, Fx, .8) + Z(40, e + 10, 56, 3.5, Px, .9)),
	glass: () => Lx(30, 14, 34, "#ff8a65", .55) + Lx(132, 70, 36, "#7fd1c4", .55) + Lx(100, 10, 20, "#ffd36b", .4) + zx(3, 12, 20, (e) => Z(14, e, 132, 15, "#ffffff", .32, 6) + Z(20, e + 4, 9, 7, jx, .9, 1) + Z(36, e + 4, 50, 3, jx, .9) + Z(36, e + 9, 34, 2.5, jx, .5)),
	posters: () => Z(12, 10, 62, 60, Ox, 1, 4) + Z(20, 30, 18, 20, Mx, .9, 2) + Z(20, 56, 40, 4, Mx, .8) + Z(80, 10, 32, 28, jx, 1, 4) + Z(86, 16, 10, 10, Mx, .8, 1) + Z(116, 10, 32, 28, "#bfe9df", 1, 4) + Z(122, 16, 10, 10, Mx, .8, 1) + Z(80, 42, 32, 28, Ax, 1, 4) + Z(86, 48, 10, 10, Ox, 1, 1) + Z(116, 42, 32, 28, Ax, .5, 4),
	tickets: () => zx(3, 10, 21, (e) => Z(12, e, 136, 17, Ax, 1, 4) + Z(12, e, 30, 17, Ox, 1, 4) + Z(20, e + 4, 12, 9, Mx, .85, 1) + Rx(42, e + 1, 42, e + 16, Dx, 1.6) + Z(50, e + 4, 50, 3.5, kx, .95) + Z(50, e + 10, 34, 2.5, kx, .55) + Z(120, e + 5, 22, 7, Ox, .85)),
	carousel: () => [
		12,
		50,
		88,
		126
	].map((e, t) => Z(e, 14, 34, 54, t ? Ax : Ox, 1, 4) + Z(e + 6, 22, 12, 14, t ? Ox : Mx, .9, 1) + Z(e + 6, 50, 22, 3, t ? kx : Mx, .9) + Z(e + 6, 56, 14, 2.5, t ? kx : Mx, .5)).join(""),
	photo: () => [
		12,
		60,
		108
	].map((e) => Z(e, 12, 40, 56, Ax, 1, 4) + Z(e, 12, 40, 26, Ox, .45, 4) + Z(e + 4, 16, 12, 6, jx, .95, 1) + Z(e + 5, 44, 28, 3.5, kx, .95) + Z(e + 5, 51, 20, 2.5, kx, .5) + Z(e + 5, 58, 14, 5, Ox, .9)).join(""),
	apGrid: () => [
		12,
		60,
		108
	].map((e) => Z(e, 12, 40, 56, Px, 1, 2) + Z(e, 12, 40, 16, Nx, 1, 2) + Rx(e, 28, e + 40, 28, Fx, 1.4) + Z(e + 4, 16, 8, 8, Fx, 1, 1) + Z(e + 22, 18, 14, 4, Fx, .9) + Z(e + 5, 36, 28, 4, Nx, .9) + Z(e + 5, 44, 18, 2.5, Nx, .55) + Z(e + 5, 52, 24, 2.5, Nx, .4)).join(""),
	bento: () => Z(12, 10, 66, 40, jx, 1, 6) + Z(18, 14, 16, 5, Ox, 1, 2) + Z(18, 28, 14, 14, Mx, .9, 1) + Z(36, 38, 34, 4, Mx, .8) + Z(82, 10, 31, 18, Ax, 1, 5) + Z(117, 10, 31, 18, Ax, 1, 5) + Z(82, 32, 66, 18, Ax, 1, 5) + Vx(86, 34, 58, 14, [
		9,
		12,
		19
	]) + Z(12, 54, 31, 18, jx, 1, 5) + Z(47, 54, 31, 18, Ox, .4, 5) + Z(82, 54, 66, 18, Ax, 1, 5) + Z(88, 60, 30, 4, kx, .9),
	weekStrip: () => Z(60, 8, 40, 5, kx, .9) + Array.from({ length: 7 }, (e, t) => Z(12 + t * 19.6, 20, 17, 50, t === 3 ? Ox : Ax, t === 3 ? .25 : 1, 3) + Z(15 + t * 19.6, 24, 6, 5, kx, .9, 1) + ([
		1,
		3,
		5
	].includes(t) ? Z(14 + t * 19.6, 36, 13, 7, Ox, 1, 2) : "")).join(""),
	weekPlan: () => Z(12, 8, 136, 64, Ax, .6, 3) + zx(4, 22, 12, (e) => Rx(12, e, 148, e, kx, .6, .6)) + Array.from({ length: 7 }, (e, t) => Rx(30 + t * 17, 14, 30 + t * 17, 72, kx, .6, .6)).join("") + Z(82, 14, 16, 58, Ox, .14, 0) + Z(49, 36, 13, 10, Ox, .9, 2) + Z(83, 48, 13, 14, Ox, .9, 2) + Z(117, 24, 13, 9, jx, .7, 2),
	layers: () => Z(12, 8, 136, 64, Ax, .6, 3) + Z(70, 12, 22, 6, Ox, .9, 3) + Z(96, 12, 22, 6, jx, .7, 3) + Z(122, 12, 22, 6, kx, .6, 3) + zx(3, 26, 15, (e, t) => Rx(12, e - 2, 148, e - 2, kx, .6, .6) + Z(16, e + 3, 16, 3, kx, .9) + Z([
		44,
		62,
		100
	][t], e + 1, [
		46,
		22,
		40
	][t], 8, [
		Ox,
		jx,
		"#7fd1c4"
	][t], .9, 3)),
	sidepanel: () => Z(12, 8, 136, 64, Ax, .6, 3) + Vx(18, 18, 76, 48, [
		5,
		10,
		17,
		24
	]) + Z(100, 8, 48, 64, Ax, 1, 3) + Z(106, 14, 26, 5, jx, .9) + zx(2, 26, 16, (e) => Z(106, e, 36, 12, Dx, 1, 2) + Rx(106, e, 106, e + 12, Ox, 2) + Z(111, e + 3, 24, 3, kx, .9)),
	apMonth: () => Z(12, 8, 136, 64, Px, 1, 2) + Rx(12, 8, 148, 8, Fx, 2.4) + Z(58, 13, 44, 5, Nx, .9) + zx(4, 26, 12, (e) => Rx(12, e, 148, e, Fx, .6, .5)) + Array.from({ length: 6 }, (e, t) => Rx(31.4 + t * 19.4, 26, 31.4 + t * 19.4, 72, Fx, .6, .5)).join("") + Z(54, 40, 14, 5, Fx, .6, 0) + Rx(54, 40, 54, 45, Fx, 2) + Z(112, 52, 14, 5, Fx, .6, 0) + Rx(112, 52, 112, 57, Fx, 2) + Lx(98, 32, 3.4, Fx),
	dayPlan: () => Z(34, 6, 92, 68, Ax, .6, 5) + Z(42, 12, 40, 5, jx, .9) + Array.from({ length: 7 }, (e, t) => Z(42 + t * 11, 22, 8, 9, t === 2 ? Ox : Ax, 1, 2)).join("") + zx(4, 38, 9, (e) => Rx(34, e, 126, e, kx, .6, .6)) + Z(56, 39, 62, 7, jx, .5, 2) + Z(56, 57, 62, 7, Ox, .5, 2) + Rx(48, 51, 126, 51, Ox, 1.4) + Lx(48, 51, 2.2, Ox),
	yearWheel: () => `<circle cx="46" cy="40" r="24" fill="none" stroke="${Ax}" stroke-width="9"/><circle cx="46" cy="40" r="24" fill="none" stroke="${kx}" stroke-width="9" stroke-dasharray="100 151" transform="rotate(-90 46 40)"${Ix(.8)}/><circle cx="46" cy="40" r="24" fill="none" stroke="${Ox}" stroke-width="9" stroke-dasharray="13 151" stroke-dashoffset="-100" transform="rotate(-90 46 40)"/>` + Lx(24, 32, 2, jx) + Lx(26, 50, 2, jx) + Lx(60, 60, 2, jx, .5) + Z(38, 37, 16, 6, jx, .9) + Z(88, 20, 20, 4, Ox) + zx(3, 30, 13, (e) => Z(88, e, 56, 9, Ax, 1, 2) + Z(92, e + 3, 34, 3, kx, .9)),
	heatmap: () => Z(12, 8, 136, 64, Ax, .6, 3) + Array.from({ length: 3 }, (e, t) => Array.from({ length: 28 }, (e, n) => Z(18 + t * 44 + n % 7 * 5.4, 16 + Math.floor(n / 7) * 5.4, 4.2, 4.2, [
		3,
		11,
		16,
		24
	].includes((n + t * 5) % 28) ? Ox : kx, [
		3,
		11,
		16,
		24
	].includes((n + t * 5) % 28) ? 1 : (n * 7 + t) % 5 == 0 ? .6 : .28, 1)).join("")).join("") + Z(18, 46, 124, 9, Dx, .8, 2) + Z(22, 49, 30, 3, jx, .8),
	billboard: () => Z(34, 6, 92, 68, Mx, 1, 6) + Lx(42, 14, 2, Ox) + Z(48, 12, 24, 4, Ox, .9) + Z(42, 22, 60, 7, jx, .95) + [
		42,
		70,
		98
	].map((e) => Z(e, 36, 22, 16, Ax, 1, 3) + Z(e + 6, 40, 10, 7, jx, .9, 1)).join("") + Z(42, 58, 78, 9, Ox, 1, 3),
	stacked: () => Z(54, 10, 70, 44, Ax, .7, 5) + Z(46, 16, 70, 44, Ax, 1, 5) + Z(38, 22, 70, 44, jx, 1, 5) + Z(44, 28, 22, 6, Ox, 1, 3) + Z(44, 40, 44, 5, Mx, .9) + Z(44, 49, 30, 3, Mx, .5) + Z(44, 56, 20, 6, Ox, 1, 2),
	noticeboard: () => Z(34, 6, 92, 68, "#8a5a3c", 1, 5) + Z(42, 14, 64, 28, "#fff7cc", 1, 0) + Lx(74, 14, 3, "#d33a2c") + Z(48, 22, 40, 5, Mx, .9) + Z(48, 31, 28, 3, Mx, .5) + Z(48, 46, 58, 20, "#d9ecff", 1, 0) + Lx(54, 46, 2.6, "#2f6fd6") + Z(54, 53, 36, 4, Mx, .85) + Z(54, 60, 44, 2.5, Mx, .45),
	split: () => Z(16, 10, 128, 60, Ax, 1, 6) + Z(16, 10, 44, 42, Ox, 1, 6) + Z(24, 22, 20, 22, Mx, .9, 2) + Z(68, 16, 20, 5, kx, .7, 2) + Z(68, 26, 58, 6, jx, .95) + Z(68, 36, 40, 3, kx, .7) + Rx(16, 52, 144, 52, kx, .6, .6) + Z(24, 58, 60, 3, kx, .8) + Z(24, 64, 44, 2.5, kx, .5),
	band: () => Z(8, 30, 144, 20, Ox, 1, 0) + Z(8, 30, 40, 20, Mx, 1, 0) + Lx(16, 40, 2, Ox) + Z(22, 38, 20, 4, jx, .9) + Z(56, 38, 34, 4, Mx, .85) + Lx(96, 40, 1.8, Mx) + Z(102, 38, 34, 4, Mx, .85) + Lx(142, 40, 1.8, Mx),
	oneLine: () => zx(3, 12, 20, (e, t) => Z(12, e, 136, 15, Ax, t ? .7 : 1, 4) + Rx(12, e + 1, 12, e + 14, t ? kx : Ox, 3) + Lx(22, e + 7.5, 2.4, t ? kx : Ox) + Z(30, e + 5.5, 20, 4, t ? kx : Ox, .9) + Z(56, e + 5.5, 54, 4, kx, .9) + (t ? "" : Z(124, e + 4, 18, 7, Ox, 1, 2))),
	ring: () => Z(30, 6, 100, 68, Ax, 1, 8) + `<circle cx="58" cy="34" r="15" fill="none" stroke="${kx}" stroke-width="5"${Ix(.5)}/><circle cx="58" cy="34" r="15" fill="none" stroke="${Ox}" stroke-width="5" stroke-linecap="round" stroke-dasharray="70 94" transform="rotate(-90 58 34)"/>` + Z(53, 31, 10, 6, jx, .9, 1) + Z(82, 24, 38, 6, jx, .95) + Z(82, 35, 28, 3, kx, .8) + Rx(38, 56, 122, 56, kx, .6, .6) + Z(38, 61, 50, 3, kx, .7) + Z(38, 67, 40, 3, kx, .5),
	darkGlass: () => Z(34, 6, 92, 68, "#121216", 1, 7) + Lx(112, 16, 22, Ox, .45) + Lx(46, 68, 20, "#3fb8a4", .35) + Lx(42, 14, 2, Ox) + Z(48, 12, 22, 4, Ox, .9) + Z(42, 22, 56, 6, jx, .95) + Z(42, 34, 76, 3, kx, .6, 1.5) + Z(42, 34, 60, 3, Ox, 1, 1.5) + Z(42, 42, 36, 9, jx, 1, 3) + Z(82, 42, 36, 9, jx, .18, 3) + Z(42, 56, 76, 14, jx, .1, 3) + Z(47, 61, 40, 3, jx, .7),
	nextBento: () => Z(40, 8, 80, 26, Ox, 1, 6) + Z(46, 13, 22, 4, Mx, .8) + Z(46, 23, 44, 5, Mx, .9) + Z(40, 38, 38, 16, Ax, 1, 5) + Z(82, 38, 38, 16, Ax, 1, 5) + Z(40, 58, 38, 16, jx, 1, 5) + Z(82, 58, 38, 16, Ox, .4, 5) + Z(46, 42, 8, 7, jx, .9, 1) + Z(88, 42, 8, 7, jx, .9, 1) + Z(46, 62, 8, 7, Mx, .9, 1),
	apNow: () => Z(40, 6, 80, 68, Px, 1, 5) + Z(40, 6, 80, 12, Nx, 1, 5) + Lx(47, 12, 1.8, Fx) + Z(52, 10, 22, 4, Fx, .9) + Z(46, 24, 14, 14, Nx, 1, 2) + Z(50, 28, 6, 6, Fx, 1, 1) + Z(66, 25, 44, 5, Nx, .9) + Z(66, 34, 32, 3, Nx, .5) + Z(40, 46, 80, 28, "#eae1c7", 1, 0) + Rx(48, 54, 48, 66, Fx, 1) + Lx(48, 54, 1.8, Fx) + Lx(48, 66, 1.8, Fx) + Z(54, 52, 40, 3.5, Nx, .8) + Z(54, 64, 34, 3.5, Nx, .8),
	apNavy: () => Z(40, 6, 80, 68, Nx, 1, 5) + Lx(47, 13, 1.8, Fx) + Z(52, 11, 22, 4, Fx, .9) + Z(46, 20, 68, 22, Px, 1, 3) + Z(51, 25, 8, 10, Fx, 1, 1) + Z(64, 25, 40, 5, Nx, .9) + Z(64, 34, 26, 3, Nx, .5) + `<rect x="46" y="46" width="68" height="14" rx="3" fill="#262e4f" stroke="${Fx}" stroke-width="0.8"/>` + Z(51, 50, 7, 6, Fx, 1, 1) + Z(64, 51, 36, 4, Px, .85) + Z(46, 66, 50, 3, Px, .6),
	apSeries: () => Z(12, 8, 136, 64, "#f5efdd", 1, 2) + Rx(20, 17, 34, 17, Fx, 1) + Z(38, 15, 26, 3.5, Fx, .9) + Z(20, 24, 58, 8, "#7a1a1a") + Z(20, 38, 64, 3, Nx, .6) + Z(20, 44, 52, 3, Nx, .6) + [
		20,
		46,
		72
	].map((e) => Z(e, 54, 12, 2.5, Fx, .9) + Z(e, 60, 20, 3.5, Nx, .8)).join("") + Rx(100, 14, 100, 66, Fx, .8, .6) + Z(108, 18, 30, 8, "#7a1a1a", .85) + Z(108, 32, 32, 2.5, Nx, .5) + Z(108, 38, 26, 2.5, Nx, .5),
	mobileAgenda: () => Z(50, 4, 60, 72, "#121216", 1, 8) + Z(56, 10, 22, 4, jx, .9) + Array.from({ length: 7 }, (e, t) => Z(56 + t * 7.1, 18, 5.6, 9, t === 2 ? Ox : Ax, 1, 2)).join("") + zx(3, 32, 14, (e) => Z(56, e, 48, 11, "#1c1c22", 1, 3) + Rx(67, e + 2, 67, e + 9, Ox, 1.4) + Z(58, e + 4, 6, 3, kx, .8) + Z(70, e + 3, 26, 3, jx, .85))
};
Object.keys(Hx);
function Ux(e) {
	let t = Hx[e] ?? Hx.plain, n = ["booklet"].includes(e);
	return Bx(t(), n ? "#1a2620" : Dx);
}
//#endregion
//#region src/lib/DesignPicker.svelte
var Wx = /* @__PURE__ */ R("<button type=\"button\"> </button>"), Gx = /* @__PURE__ */ R("<img alt=\"\" loading=\"lazy\" decoding=\"async\" class=\"svelte-wurosr\"/>"), Kx = /* @__PURE__ */ R("<span class=\"dp-mark svelte-wurosr\"> </span>"), qx = /* @__PURE__ */ R("<button type=\"button\"><span class=\"dp-pic svelte-wurosr\"><!></span> <span class=\"dp-name svelte-wurosr\"> </span> <!></button>"), Jx = /* @__PURE__ */ R("<section class=\"dp-family svelte-wurosr\"><h3 class=\"svelte-wurosr\"> </h3> <div class=\"dp-grid svelte-wurosr\"></div></section>"), Yx = /* @__PURE__ */ R("<p class=\"dp-none svelte-wurosr\"> </p>"), Xx = /* @__PURE__ */ R("<span class=\"dp-side-view svelte-wurosr\"> </span>"), Zx = /* @__PURE__ */ R("<dialog class=\"dp-overlay svelte-wurosr\"><div class=\"dp-card svelte-wurosr\"><div class=\"dp-head svelte-wurosr\"><h2 class=\"svelte-wurosr\"> </h2> <input class=\"dp-search svelte-wurosr\" type=\"search\"/> <span class=\"dp-count svelte-wurosr\"> </span> <button type=\"button\" class=\"dp-close svelte-wurosr\"><svg viewBox=\"0 0 16 16\" width=\"16\" height=\"16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" aria-hidden=\"true\"><path d=\"M3 3l10 10M13 3L3 13\"></path></svg></button></div> <div class=\"dp-views svelte-wurosr\" role=\"group\"><button type=\"button\"> </button> <!></div> <div class=\"dp-body svelte-wurosr\"><div class=\"dp-list svelte-wurosr\"><!> <!></div> <aside class=\"dp-side svelte-wurosr\"><div class=\"dp-side-head svelte-wurosr\"><strong> </strong> <!></div> <div class=\"dp-preview svelte-wurosr\"><div class=\"dp-stage svelte-wurosr\"><iframe src=\"/?preview=1\" class=\"svelte-wurosr\"></iframe></div></div> <button type=\"button\" class=\"dp-use svelte-wurosr\"> </button></aside></div></div></dialog>");
function Qx(e, t) {
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
	}, s = 1040, c = /* @__PURE__ */ k(""), l = /* @__PURE__ */ k(""), u = /* @__PURE__ */ k(pn(n() ?? "plain")), d = /* @__PURE__ */ k(pn(/* @__PURE__ */ new Set())), f = /* @__PURE__ */ k(null), p = /* @__PURE__ */ k(0), m = /* @__PURE__ */ k(!1), h = /* @__PURE__ */ k(600), g = /* @__PURE__ */ k(null), _ = /* @__PURE__ */ k(null), v = (e) => !I(l) || e.view === null || e.view === I(l), y = (e) => v(e) && (!I(c).trim() || K(e.labelKey).toLowerCase().includes(I(c).trim().toLowerCase())), b = /* @__PURE__ */ O(() => mm().map((e) => ({
		...e,
		designs: e.designs.filter(y)
	})).filter((e) => e.designs.length)), x = /* @__PURE__ */ O(() => I(b).reduce((e, t) => e + t.designs.length, 0)), S = /* @__PURE__ */ O(() => Om(I(u))), C = /* @__PURE__ */ O(() => I(p) ? Math.min(1, I(p) / s) : .4);
	Nn(() => {
		I(_) && !I(_).open && I(_).showModal(), I(g)?.focus();
	});
	function w(e) {
		let t = Om(e), n = {
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
	var se = Zx();
	zr("message", mn, ie);
	var ce = j(se), le = j(ce), ue = j(le), de = N(ue, !0), fe = P(ue, 2);
	U(fe), Zi(fe, (e) => A(g, e), () => I(g));
	var pe = P(fe, 2), me = N(pe, !0), he = P(pe, 2);
	D(le);
	var ge = P(le, 2), _e = j(ge);
	let ve;
	var ye = N(_e, !0);
	ui(P(_e, 2), 16, () => om, (e) => e, (e, t) => {
		var n = Wx();
		let r;
		var i = N(n, !0);
		F((e) => {
			G(n, "aria-pressed", I(l) === t), r = Pi(n, 1, "svelte-wurosr", null, r, { on: I(l) === t }), B(i, e);
		}, [() => K(o[t])]), L("click", n, () => A(l, t, !0)), z(e, n);
	}), D(ge);
	var be = P(ge, 2), xe = j(be), Se = j(xe);
	ui(Se, 17, () => I(b), (e) => e.family, (e, r) => {
		var i = Jx(), a = j(i), o = N(a, !0), s = P(a, 2);
		ui(s, 21, () => I(r).designs, (e) => e.id, (e, r) => {
			var i = qx();
			let a;
			var o = j(i), s = j(o), c = (e) => {
				var t = Yr();
				H(M(t), () => Ux(I(r).id)), z(e, t);
			}, l = /* @__PURE__ */ O(() => I(d).has(I(r).id)), f = (e) => {
				var t = Gx();
				F(() => G(t, "src", `/admin/designs/${I(r).id}.webp`)), zr("error", t, () => oe(I(r).id)), Lr(t), z(e, t);
			};
			V(s, (e) => {
				I(l) ? e(c) : e(f, -1);
			}), D(o);
			var p = P(o, 2), m = N(p, !0), h = P(p, 2), g = (e) => {
				var t = Kx(), n = N(t, !0);
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
		var t = Yx(), n = N(t, !0);
		F((e) => B(n, e), [() => K("calendar.picker.none")]), z(e, t);
	};
	V(Ce, (e) => {
		I(b).length || e(we);
	}), D(xe);
	var Te = P(xe, 2), Ee = j(Te), De = j(Ee), Oe = N(De, !0), ke = P(De, 2), Ae = (e) => {
		var t = Xx(), n = N(t, !0);
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
var $x = /* @__PURE__ */ R("<div><header class=\"block-menu-head\"><span class=\"block-menu-title\"> </span> <!> <button class=\"ghost row-tool menu-width\"></button> <button class=\"ghost row-tool\"></button></header> <div class=\"panel-body block-menu-body\"><!></div></div>");
function eS(e, t) {
	it(t, !0);
	let n = nt("urd-editor"), r = /* @__PURE__ */ O(() => n.selectedBlock);
	var i = $x();
	let a;
	var o = j(i), s = j(o), c = N(s, !0), l = P(s, 2);
	Jy(l, {
		get: () => mh.menuQuery,
		set: (e) => mh.menuQuery = e
	});
	var u = P(l, 2);
	H(u, () => mh.wide ? "<svg viewBox=\"0 0 18 18\" width=\"14\" height=\"14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M2 4l4 5-4 5M16 4l-4 5 4 5\"/></svg>" : "<svg viewBox=\"0 0 18 18\" width=\"14\" height=\"14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M6 4L2 9l4 5M12 4l4 5-4 5\"/></svg>", !0), D(u);
	var d = P(u, 2);
	H(d, () => q.cross, !0), D(d), D(o);
	var f = P(o, 2), p = j(f);
	{
		let e = /* @__PURE__ */ O(hh);
		Ky(p, {
			get wide() {
				return I(e);
			},
			get query() {
				return mh.menuQuery;
			}
		});
	}
	D(f), D(i), F((e, n, r, o, s) => {
		a = Pi(i, 1, "block-menu", null, a, { wide: e }), Ii(i, `--menu-left: ${t.pos.left ?? ""}px; --menu-top: ${t.pos.top ?? ""}px; --menu-min: ${mh.min ?? ""}px`), B(c, n), G(u, "title", r), G(u, "aria-label", o), G(d, "title", s);
	}, [
		() => hh(),
		() => K("blocks.suffix", { label: n.blockLabel(I(r).type) }),
		() => mh.wide ? K("menu.toNarrow") : K("menu.toWide"),
		() => mh.wide ? K("menu.toNarrow") : K("menu.toWide"),
		() => K("tip.closeEsc")
	]), L("click", u, () => mh.wide = !mh.wide), L("click", d, function(...e) {
		t.onclose?.apply(this, e);
	}), z(e, i), at();
}
//#endregion
//#region node_modules/svelte/src/internal/flags/legacy.js
Br(["click"]), Je();
//#endregion
//#region node_modules/svelte/src/transition/index.js
function tS(e) {
	let t = e - 1;
	return t * t * t + 1;
}
function nS(e) {
	let t = typeof e == "string" && e.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
	return t ? [parseFloat(t[1]), t[2] || "px"] : [e, "px"];
}
function rS(e, { delay: t = 0, duration: n = 400, easing: r = tS, x: i = 0, y: a = 0, opacity: o = 0 } = {}) {
	let s = getComputedStyle(e), c = +s.opacity, l = s.transform === "none" ? "" : s.transform, u = c * (1 - o), [d, f] = nS(i), [p, m] = nS(a);
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
var iS = /* @__PURE__ */ R("<button><!> </button>"), aS = /* @__PURE__ */ R("<div class=\"tool-pop\"></div>"), oS = /* @__PURE__ */ R("<span class=\"toolmenu\"><button><!><!></button> <!></span>"), sS = /* @__PURE__ */ R("<button></button>"), cS = /* @__PURE__ */ R("<span class=\"tool-cap\"> </span> <span class=\"viewswitch toolgrp\"></span>", 1), lS = /* @__PURE__ */ R("<div class=\"tool-pop\"><div class=\"tool-pop-row\"><button class=\"ghost\"></button> <span class=\"zoom-readout\"> </span> <button class=\"ghost\"></button></div> <button><!> </button></div>"), uS = /* @__PURE__ */ R("<span class=\"toolmenu\"><button><span class=\"zoom-cap\"> </span><!></button> <!></span>"), dS = /* @__PURE__ */ R("<span class=\"tool-cap\"> </span> <span class=\"zoomswitch toolgrp\"><button class=\"ghost\"></button> <span class=\"zoom-readout\"> </span> <button class=\"ghost\"></button> <button></button></span>", 1), fS = /* @__PURE__ */ R("<div class=\"tool-pop\"><button><!> </button> <button><!> </button></div>"), pS = /* @__PURE__ */ R("<span class=\"tool-cap\"> </span> <span class=\"toolgrp\"><button></button> <button></button></span>", 1), mS = /* @__PURE__ */ R("<button class=\"ghost page-btn\"> </button> <span class=\"toolset\"><!> <!> <!></span>", 1), hS = /* @__PURE__ */ R("<button class=\"badge attention\"><!> <span class=\"btn-label\"> </span> <span class=\"badge-mini\"> </span></button>"), gS = /* @__PURE__ */ R("<button class=\"discard-confirm\"><!> </button>"), _S = /* @__PURE__ */ R("<span class=\"draft-cluster\"><span class=\"chip draft-chip\"><span class=\"chip-full\" aria-hidden=\"true\"> </span> <span class=\"chip-mini\" aria-hidden=\"true\">!</span></span>  <span class=\"discard-wrap\"><button><!><span class=\"discard-label\"> </span></button> <!></span></span>"), vS = /* @__PURE__ */ R("<!> <span class=\"btn-label\"> </span>", 1), yS = /* @__PURE__ */ R("<span class=\"who\"><!> </span>"), bS = /* @__PURE__ */ R("<a class=\"ghost\" href=\"/api/github/login\"> </a>"), xS = /* @__PURE__ */ R("<button class=\"ghost\"><!></button> <!> <a class=\"ghost\" target=\"_blank\" rel=\"noopener\"><!> <span class=\"btn-label\"> </span></a> <button class=\"primary\"> </button>", 1), SS = /* @__PURE__ */ R("<header><span class=\"topbar-group\"><!> <!></span> <span class=\"topbar-group topbar-draft\"><!></span> <span class=\"topbar-group topbar-right\"><!></span></header>");
function CS(e, t) {
	it(t, !1);
	let n = /* @__PURE__ */ an(nt("urd-editor"));
	$i();
	var r = SS();
	let i;
	var a = j(r), o = j(a), s = (e) => {
		var t = mS(), r = M(t), i = N(r, !0), a = P(r, 2), o = j(a), s = (e) => {
			var t = oS(), r = j(t);
			let i;
			var a = j(r);
			H(a, () => q[`device_${I(n).deviceId}`]), H(P(a), () => q.caret), D(r);
			var o = P(r, 2), s = (e) => {
				var t = aS();
				ui(t, 5, () => I(n).devices, (e) => e.id, (e, t) => {
					var r = iS();
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
			var t = cS(), r = M(t), i = N(r, !0), a = P(r, 2);
			ui(a, 5, () => I(n).devices, (e) => e.id, (e, t) => {
				var r = sS();
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
			var t = uS(), r = j(t);
			let i;
			var a = j(r), o = N(a);
			H(P(a), () => q.caret), D(r);
			var s = P(r, 2), c = (e) => {
				var t = lS(), r = j(t), i = j(r);
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
			var t = dS(), r = M(t), i = N(r, !0), a = P(r, 2), o = j(a);
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
			var t = oS(), r = j(t);
			let i;
			var a = j(r);
			H(a, () => q.gridToggle), H(P(a), () => q.caret), D(r);
			var o = P(r, 2), s = (e) => {
				var t = fS(), r = j(t);
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
			var t = pS(), r = M(t), i = N(r, !0), a = P(r, 2), o = j(a);
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
		var t = hS(), r = j(t);
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
		var t = _S(), r = j(t), i = N(j(r), !0);
		ke(2), D(r);
		var a = P(r, 2), o = j(a);
		let s;
		var c = j(o);
		H(c, () => q.restore);
		var l = N(P(c), !0);
		D(o);
		var u = P(o, 2), d = (e) => {
			var t = gS(), r = j(t);
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
		}), Ei(2, t, () => rS, () => ({
			x: 24,
			duration: I(n).reducedMotion ? 0 : 150
		})), z(e, t);
	};
	V(d, (e) => {
		I(n).dirty && e(f);
	}), D(u);
	var p = P(u, 2), m = j(p), h = (e) => {
		var t = xS(), r = M(t), i = j(r), a = (e) => {
			var t = vS(), n = M(t);
			H(n, () => q.eye);
			var r = N(P(n, 2), !0);
			F((e) => B(r, e), [() => K("ui.cleanView")]), z(e, t);
		}, o = (e) => {
			var t = vS(), n = M(t);
			H(n, () => q.pencil);
			var r = N(P(n, 2), !0);
			F((e) => B(r, e), [() => K("ui.edit")]), z(e, t);
		};
		V(i, (e) => {
			I(n).chromeVisible ? e(a) : e(o, -1);
		}), D(r);
		var s = P(r, 2), c = (e) => {
			var t = yS(), r = j(t), i = (e) => {
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
			var t = bS(), n = N(t, !0);
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
var wS = 3840, TS = 2400, ES = (e, t, n) => Math.min(n, Math.max(t, e));
function DS({ innerWidth: e = 0, screenWidth: t = 0 } = {}) {
	let n = e > 0 ? e : t;
	return Math.max(1, Math.round(n > 0 ? n : 1));
}
function OS(e) {
	return !e || typeof e.innerWidth != "number" ? null : DS({
		innerWidth: e.innerWidth,
		screenWidth: e.screen?.width ?? 0
	});
}
function kS(e, t) {
	let n = e && typeof e == "object" && !Array.isArray(e) ? e : {}, r = n.mode === "custom" ? "custom" : "own", i = Number(n.width), a = ES(Number.isFinite(i) && i > 0 ? i : t, 640, wS), o = Number(n.height), s = Number.isFinite(o) && o > 0 ? ES(o, 480, TS) : 0;
	return {
		mode: r,
		width: Math.round(a),
		height: Math.round(s)
	};
}
function AS(e, t) {
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
var jS = /* @__PURE__ */ R("<button> </button>"), MS = /* @__PURE__ */ R("<span class=\"rail-group\"> </span> <!>", 1), NS = /* @__PURE__ */ R("<div class=\"ctl-row\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\" step=\"10\"/> <span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\" min=\"0\" step=\"10\" placeholder=\"0\"/></div>"), PS = /* @__PURE__ */ R("<p class=\"mini-label\"> </p> <label> <input type=\"text\" spellcheck=\"false\"/></label>", 1), FS = /* @__PURE__ */ R("<div class=\"settings-pop\"><p class=\"panel-strong\"> </p> <label> <!></label> <label> <!></label> <label> <!></label> <label> <!></label> <label> <!></label> <p class=\"mini-label\"> </p> <div class=\"seg\"><button type=\"button\"> </button> <button type=\"button\"> </button></div> <!> <!></div>"), IS = /* @__PURE__ */ R("<nav><!> <span class=\"rail-settings\"><span class=\"rail-brand\" title=\"Urd\"><svg class=\"brand-mark\" viewBox=\"10.3 8.3 19.4 25.4\" aria-hidden=\"true\"><path d=\"M12 32V10l16 6.5V32\" fill=\"none\" stroke=\"var(--urd-brand)\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg> <span class=\"brand-word\">Urd</span></span> <button></button> <!></span></nav>");
function LS(e, t) {
	it(t, !1);
	let n = /* @__PURE__ */ an(nt("urd-editor"));
	$i();
	var r = IS();
	let i;
	var a = j(r);
	ui(a, 1, () => I(n).PANEL_GROUPS, oi, (e, t, r) => {
		var i = MS(), a = M(i), o = N(a, !0);
		ui(P(a, 2), 1, () => I(t), (e) => e, (e, t) => {
			var r = jS();
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
		var t = FS(), r = j(t), i = N(r, !0), a = P(r, 2), o = j(a);
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
					return mh.widthPref;
				},
				get options() {
					return I(e);
				},
				get onchange() {
					return gh;
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
			var t = NS(), r = j(t), i = N(r, !0), a = P(r, 2);
			U(a);
			var o = P(a, 2), s = N(o, !0), c = P(o, 2);
			U(c), D(t), F((e, t, r, o) => {
				B(i, e), G(a, "min", 640), G(a, "max", wS), G(a, "title", t), W(a, I(n).screenPref.width), B(s, r), G(c, "max", TS), G(c, "title", o), W(c, I(n).screenPref.height || "");
			}, [
				() => K("lbl.screen.w"),
				() => K("tip.screen.width", {
					min: 640,
					max: wS
				}),
				() => K("lbl.screen.h"),
				() => K("tip.screen.height", {
					min: 480,
					max: TS
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
			var t = PS(), r = M(t), i = N(r, !0), a = P(r, 2), o = j(a), s = P(o);
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
var RS = /* @__PURE__ */ R("<div><div class=\"stage\"><iframe></iframe></div></div>");
function zS(e, t) {
	it(t, !1);
	let n = /* @__PURE__ */ an(nt("urd-editor"));
	$i();
	var r = RS();
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
var BS = /* @__PURE__ */ R("<p class=\"panel-hint confirm-line\"> </p>"), VS = /* @__PURE__ */ R("<input/>"), HS = /* @__PURE__ */ R("<div class=\"setup-overlay\"><div class=\"setup-card\"><h2> </h2> <!> <!> <span class=\"setup-actions\"><button class=\"ghost\"> </button> <button class=\"primary\"> </button></span></div></div>");
function US(e, t) {
	it(t, !1);
	let n = /* @__PURE__ */ an(nt("urd-editor"));
	$i();
	var r = Yr(), i = M(r), a = (e) => {
		var t = HS(), r = j(t), i = j(r), a = N(i, !0), o = P(i, 2);
		ui(o, 1, () => I(n).confirmBox.lines, (e) => e, (e, t) => {
			var n = BS(), r = N(n, !0);
			F(() => B(r, I(t))), z(e, n);
		});
		var s = P(o, 2), c = (e) => {
			var t = VS();
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
var WS = /* @__PURE__ */ R("<div class=\"setup-overlay\"><div class=\"setup-card\"><h2> </h2> <p class=\"panel-hint\"> </p> <label> <input/></label> <label> <!></label> <label> <!></label> <p class=\"panel-hint\"> </p> <span class=\"setup-actions\"><button class=\"ghost\"> </button> <button class=\"primary\"> </button></span></div></div>");
function GS(e, t) {
	it(t, !1);
	let n = /* @__PURE__ */ an(nt("urd-editor"));
	$i();
	var r = Yr(), i = M(r), a = (e) => {
		var t = WS(), r = j(t), i = j(r), a = N(i, !0), o = P(i, 2), s = N(o, !0), c = P(o, 2), l = j(c), u = P(l);
		U(u), D(c);
		var d = P(c, 2), f = j(d), p = P(f);
		{
			let e = /* @__PURE__ */ kt(() => K("setup.accentPick"));
			Uc(p, {
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
			Uc(g, {
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
function KS(e, t, n, r) {
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
var qS = 400;
function JS({ prepare: e, onHeight: t, title: n }) {
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
			}, clearTimeout(a), a = setTimeout(l, qS);
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
var YS = () => ({
	duration: 600,
	delay: 0
}), XS = 90, ZS = {
	"fade-in": {
		version: 1,
		label: "Fade in",
		labelKey: "anim.fadeIn",
		entrance: !0,
		defaults: YS,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Slide up",
		labelKey: "anim.slideUp",
		entrance: !0,
		defaults: YS,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom in",
		labelKey: "anim.zoomIn",
		entrance: !0,
		defaults: YS,
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
			step: XS,
			effect: "slide-up",
			pattern: "sequence"
		}),
		migrations: {}
	}
};
//#endregion
//#region ../template/assets/engine/0.7.4/plugins.js
function QS(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var $S = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function eC(e, t) {
	let n = QS(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = QS(t[2]), a = $S(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var tC = /^[a-z0-9][a-z0-9-]*$/;
function nC(e) {
	let t = [];
	if (!e || typeof e != "object") return ["the manifest is not an object"];
	tC.test(e.id ?? "") || t.push("id is missing or invalid"), (typeof e.name != "string" || !e.name) && t.push("name is missing"), QS(e.version ?? "") || t.push("version is not semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine is missing");
	let n = Array.isArray(e.languages) && e.languages.length > 0;
	return (e.entry !== void 0 || !n) && (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry is missing or is not a .js file"), (e.provides !== void 0 || !n) && (!e.provides || typeof e.provides != "object") && t.push("provides is missing"), e.languages !== void 0 && t.push(...fa(e.languages)), e.locales !== void 0 && typeof e.locales != "boolean" && t.push("locales must be a boolean"), e.names !== void 0 && (typeof e.names != "object" || e.names === null || Array.isArray(e.names) || Object.values(e.names).some((e) => typeof e != "string" || !e)) && t.push("names must be an object mapping language code to name"), t;
}
Promise.resolve();
//#endregion
//#region src/lib/preview-scale.js
function rC(e, t) {
	return !(e > 0) || !(t > 0) ? 1 : e / t;
}
function iC(e, t, n, r = 0, i = 0) {
	if (n === "full") return 1;
	let a = i > 0 ? rC(r, i) : Infinity;
	return Math.max(.1, Math.min(1, rC(e, t), a));
}
//#endregion
//#region src/lib/previewBridge.js
function aC(e, t = {}) {
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
function oC(e) {
	let t = (e) => Math.round(e * 100) / 100, n = Math.max(0, t(100 - e.w)), r = Math.min(n, Math.max(0, t(e.x - e.w / 2))), i = Math.max(0, e.y - e.h / 2), a = e.snap === !1 || e.grid?.snap === !1, o = e.grid?.size || 8;
	return i = a ? Math.round(i) : Math.round(i / o) * o, {
		x: r,
		y: Math.max(0, i)
	};
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/color.js
var sC = {
	version: 1,
	label: "Colour",
	labelKey: "bgLayer.color",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = dc(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, cC = {
	linear: [
		"pan",
		"pan-loop",
		"rotate"
	],
	radial: ["pulse", "orbit"]
};
function lC(e) {
	let t = Array.isArray(e) && e.length ? e : [{ color: "#0b0e14" }, { color: "#1a1030" }], n = t.map((e) => Math.max(0, Number(e?.share) || 0)), r = n.reduce((e, t) => e + t, 0), i = r <= 0, a = i ? t.length : r, o = 0;
	return t.map((e, t) => {
		let r = i ? 1 : n[t], s = (o + r / 2) / a * 100;
		return o += r, {
			color: e?.color ?? "#0b0e14",
			at: Math.round(s * 100) / 100
		};
	});
}
function uC(e) {
	let t = (e) => Math.round(e * 100) / 100, n = e[0]?.at ?? 0;
	return [...e.map((e) => ({
		color: e.color,
		at: t(e.at - n)
	})), {
		color: e[0]?.color ?? "#0b0e14",
		at: 100
	}];
}
function dC(e, t, n, r = .5) {
	let i = n % 360 * Math.PI / 180, a = (e) => Math.round(e * 100) / 100 || 0, o = (Math.abs(e * Math.sin(i)) + Math.abs(t * Math.cos(i))) / (1 - Math.min(Math.max(r, 0), .9));
	return {
		period: a(o),
		dx: a(Math.sin(i) * o),
		dy: a(-Math.cos(i) * o)
	};
}
function fC(e, t, n) {
	return `repeating-linear-gradient(${t}deg, ${e.map((e) => `${dc(e.color)} ${Math.round(e.at / 100 * n * 100) / 100}px`).join(", ")})`;
}
function pC(e) {
	let t = e.kind === "radial" ? "radial" : "linear", n = (cC[t] ?? []).includes(e.animation) ? e.animation : null, r = lC(e.stops), i = r.map((e) => `${dc(e.color)} ${e.at}%`).join(", "), a = {}, o;
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
					stops: uC(r),
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
var mC = /* @__PURE__ */ new Set(), hC = !1;
function gC(e) {
	mC.add(e), !(hC || typeof window > "u") && (hC = !0, window.addEventListener("resize", () => {
		for (let e of [...mC]) e() || mC.delete(e);
	}));
}
var _C = !1;
function vC() {
	if (!_C) {
		_C = !0;
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
var yC = {
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
		let n = pC(t);
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
					let e = dC(r, i, n.loop.angle, n.loop.maxShare);
					t.style.inset = `${-Math.ceil(e.period)}px`, t.style.background = fC(n.loop.stops, n.loop.angle, e.period), t.style.setProperty("--urd-loop-dx", `${e.dx}px`), t.style.setProperty("--urd-loop-dy", `${e.dy}px`);
				}
				return !0;
			};
			requestAnimationFrame(r), gC(r);
		} else if (n.runner) {
			e.classList.add("urd-bg-loop-host");
			let t = document.createElement("div");
			t.className = n.runner.className, t.style.background = n.runner.background, n.runner.left != null && (t.style.left = n.runner.left), n.runner.top != null && (t.style.top = n.runner.top), e.appendChild(t);
		} else e.style.background = n.background, n.className && (e.classList.add(n.className), n.className === "urd-bg-rotate" && vC());
	}
}, bC = /^(?:data:video\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/media\/[\w%./-]+\.(?:mp4|webm))$/i;
function xC(e) {
	return typeof e == "string" && bC.test(e);
}
var SC = null;
function CC(e) {
	SC ??= new IntersectionObserver((e) => {
		for (let t of e) t.target.isConnected ? t.isIntersecting ? t.target.play().catch(() => {}) : t.target.pause() : SC.unobserve(t.target);
	}, { threshold: 0 }), SC.observe(e);
}
var wC = (e, t, n, r) => {
	e.style.position = "absolute", e.style.inset = "0", e.style.width = "100%", e.style.height = "100%", e.style.objectFit = t === "contain" ? "contain" : "cover", e.style.objectPosition = du(n, r);
}, TC = {
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
		if (!xC(t.src)) return;
		if (e.style.opacity = String(t.opacity ?? 1), window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
			if (!Pl(t.poster)) return;
			let n = document.createElement("img");
			n.className = "urd-bg-video-poster", n.alt = "", n.setAttribute("aria-hidden", "true"), n.src = t.poster, wC(n, t.fit, t.x, t.y), e.appendChild(n);
			return;
		}
		let n = document.createElement("video");
		n.className = "urd-bg-video", n.muted = !0, n.setAttribute("muted", ""), n.loop = !0, n.playsInline = !0, n.setAttribute("playsinline", ""), n.preload = "metadata", n.disablePictureInPicture = !0, n.setAttribute("aria-hidden", "true"), Pl(t.poster) && (n.poster = t.poster), n.src = t.src, wC(n, t.fit, t.x, t.y), e.appendChild(n), CC(n), t.parallax > 0 && Mu(n, t.parallax, 0, t.fit === "contain" ? "contain" : "cover");
	}
}, EC = [
	"section",
	"blocks",
	"page"
];
function DC(e) {
	return im(String(e ?? ""), "");
}
function OC(e, t, { id: n, title: r }) {
	let i = structuredClone(e);
	i.meta = {
		...i.meta,
		id: n,
		title: r
	};
	for (let e of i.sections ?? []) {
		e.id = t("sec");
		for (let n of e.blocks ?? []) n.id = t("blk");
		Zs(e), Xs(e), Qs(e);
	}
	return i;
}
//#endregion
//#region src/state/templates.svelte.js
var kC = null, AC = {}, jC = {}, MC = !1, NC = /* @__PURE__ */ k(pn([]));
async function PC() {
	let e = {
		version: 1,
		maler: []
	};
	try {
		e = await (await fetch("/content/maler.json")).json();
	} catch {}
	kC = KS("urd-draft-templates", () => e, OA.draftSaveError, "urd-draft-maler"), A(NC, [...kC.data.maler ?? []], !0);
	for (let e of I(NC)) {
		let t = null;
		try {
			t = await (await fetch(`/content/maler/${e}.json`)).json();
		} catch {}
		jC[e] = t, AC[e] = KS(`urd-draft-template-${e}`, () => t, OA.draftSaveError, `urd-draft-mal-${e}`), (AC[e].data?.schemaVersion ?? 1) > 1 && AC[e].reset();
	}
	MC = !0, FC();
}
function FC() {
	let e = I(NC).map((e) => AC[e]?.data ? {
		id: e,
		...JSON.parse(JSON.stringify(AC[e].data))
	} : null).filter(Boolean).map(({ id: e, mal: t, section: n, blocks: r, page: i }) => ({
		id: e,
		name: t.name,
		kind: t.kind,
		section: n,
		blocks: r,
		page: i
	}));
	oE.bridge?.sendTemplates(e);
}
function IC(e) {
	let t = EC.includes(e.kind) ? e.kind : "section";
	return LC(t, e[t]);
}
async function LC(e, t) {
	if (!t || !kC) return;
	let n = (await OA.askPrompt({
		title: K("canvas.templateNamePrompt"),
		placeholder: K("ph.templateName")
	}))?.trim();
	if (!n) return;
	let r = DC(n);
	if (!r) {
		OA.setStatus(K("status.invalidName"), "error");
		return;
	}
	if (I(NC).includes(r)) {
		OA.setStatus(K("status.templateExists"), "error");
		return;
	}
	DO.pushHistory("templates");
	let i = {
		schemaVersion: 1,
		mal: {
			name: n,
			kind: e
		},
		[e]: t
	};
	AC[r] = KS(`urd-draft-template-${r}`, () => null, OA.draftSaveError, `urd-draft-mal-${r}`), AC[r].replace(i), AC[r].save(), kC.data.maler = [...I(NC), r], kC.save(), A(NC, [...I(NC), r], !0), OA.setStatus(K("status.templateSaved", { name: n }), "ok"), DO.updateDirty(), FC();
}
async function RC(e) {
	let t = AC[e.id]?.data?.mal;
	t && await OA.askConfirm({ title: K("confirm.deleteTemplate", { name: t.name }) }) && (DO.pushHistory("templates"), Q.newPageTemplate === e.id && (Q.newPageTemplate = null), localStorage.removeItem(`urd-draft-template-${e.id}`), localStorage.removeItem(`urd-draft-mal-${e.id}`), delete AC[e.id], kC.data.maler = I(NC).filter((t) => t !== e.id), kC.save(), A(NC, I(NC).filter((t) => t !== e.id), !0), DO.updateDirty(), FC());
}
var zC = {
	get templatesIndexStore() {
		return kC;
	},
	set templatesIndexStore(e) {
		kC = e;
	},
	get templateStores() {
		return AC;
	},
	set templateStores(e) {
		AC = e;
	},
	get publishedTemplates() {
		return jC;
	},
	set publishedTemplates(e) {
		jC = e;
	},
	get templatesReady() {
		return MC;
	},
	set templatesReady(e) {
		MC = e;
	},
	get templateIds() {
		return I(NC);
	},
	set templateIds(e) {
		A(NC, e, !0);
	},
	initTemplates: PC,
	pushTemplatesToPreview: FC,
	handleSaveTemplate: IC,
	saveTemplate: LC,
	handleDeleteTemplate: RC
}, BC = [
	["color", sC],
	["gradient", yC],
	["glow", cb],
	["image", ju],
	["slideshow", ld],
	["video", TC],
	["pattern", Zl],
	["grain", ub]
], VC = Object.fromEntries(BC), HC = /* @__PURE__ */ k(null), UC = /* @__PURE__ */ k(pn({
	size: 16,
	snap: !0
})), WC = /* @__PURE__ */ O(() => np(I(Sw), I(Cw))), GC = null, KC = /* @__PURE__ */ k(null);
function qC() {
	A(KC, GC.data, !0), GC.replace(I(KC));
}
function JC() {
	oE.bridge?.sendSite(Xe(I(KC)));
}
function YC(e, t) {
	tw(e, () => {
		I(KC).nav.style ??= {}, t(I(KC).nav.style);
	});
}
var XC = {
	mutate: YC,
	keyPrefix: "navbg",
	keyId: "nav"
}, ZC = {
	mutate: Iw,
	keyPrefix: "footerbg",
	keyId: "footer"
}, QC = /* @__PURE__ */ O(() => I(KC)?.theme ? sc(I(KC).theme, oE.previewMode).color ?? {} : {}), $C = () => Object.entries(I(QC));
function ew(e, t) {
	DO.pushHistory("grid:site"), A(UC, {
		...I(UC),
		[e]: t
	}, !0), GC.data.grid = {
		...GC.data.grid,
		[e]: t
	}, GC.save(), DO.updateDirty(), JC(), OA.gridOn && oE.bridge?.sendShowGrid(!0);
}
function tw(e, t) {
	DO.pushHistory(e), t(), GC.save(), DO.updateDirty(), JC();
}
var nw = /* @__PURE__ */ k(""), rw = /* @__PURE__ */ k(null), iw = /* @__PURE__ */ k(null), aw = [
	"admin",
	"api",
	"assets",
	"content",
	"media",
	"plugins",
	"functions",
	"readme"
];
function ow(e, t = null) {
	return e ? aw.includes(e) ? K("error.reservedName", { slug: e }) : I(KC).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? K("error.pageExists") : null : K("error.pageNeedsName");
}
function sw() {
	let e = I(nw).trim(), t = im(e), n = ow(t);
	if (n) return OA.setStatus(n, "error"), !1;
	let r = I(rw) && !I(rw).startsWith("preset:") ? zC.templateStores[I(rw)]?.data?.page : null, i = I(rw)?.startsWith("preset:") ? ac(I(rw).slice(7), {
		pageId: t,
		title: e
	}) ?? $.blankPage({
		id: t,
		title: e
	}) : r ? OC(nc(JSON.parse(JSON.stringify(r)), GC.data), es, {
		id: t,
		title: e
	}) : $.blankPage({
		id: t,
		title: e
	});
	tw("pages", () => {
		I(KC).pages.push({
			id: t,
			title: e,
			path: `/${t}`,
			file: `content/pages/${t}.json`
		}), I(KC).nav.items.push({
			label: e,
			page: t
		});
	}), OA.writeDraftKey(`urd-draft-${t}`, JSON.stringify(i)), DO.updateDirty(), A(nw, ""), A(rw, null), $.selectPage(t);
}
async function cw(e) {
	A(iw, null);
	let t = e.id === $.pageId ? JSON.parse(JSON.stringify($.store.data)) : await $.readPageDraft(e);
	await zC.saveTemplate("page", t);
}
function lw(e, t) {
	let n = t.trim();
	if (!n || n === e.title) return;
	let r = e.title;
	tw("pages", () => {
		e.title = n;
		for (let t of I(KC).nav.items) t.page === e.id && t.label === r && (t.label = n);
	}), e.id === $.pageId ? ($.store.data.meta.title = n, $.store.save(), DO.updateDirty(), oE.bridge?.sendPage($.pageId, $.store.data)) : $.patchPageDraft(e, (e) => {
		e.meta.title = n;
	});
}
var uw = /* @__PURE__ */ k(pn({
	description: "",
	ogTitle: "",
	ogDescription: "",
	ogImage: ""
}));
function dw() {
	let e = $.store?.data?.meta ?? {};
	A(uw, {
		description: e.description ?? "",
		ogTitle: e.og?.title ?? "",
		ogDescription: e.og?.description ?? "",
		ogImage: e.og?.image ?? ""
	}, !0);
}
function fw(e, t) {
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
	$.store.save(), DO.updateDirty(), dw();
	let r = I(KC).pages.find((e) => e.id === $.pageId);
	I(mw)[$.pageId] = !r?.noindex && !$.store.data.meta.description;
}
function pw(e) {
	let t = I(KC).pages.find((e) => e.id === $.pageId);
	t && (tw("edit:page-noindex", () => {
		e ? t.noindex = !0 : delete t.noindex;
	}), I(mw)[$.pageId] = !e && !$.store?.data?.meta?.description);
}
var mw = /* @__PURE__ */ k(pn({}));
async function hw() {
	let e = {};
	for (let t of I(KC).pages) {
		if (t.noindex) continue;
		if (t.id === $.pageId) {
			e[t.id] = !$.store?.data?.meta?.description;
			continue;
		}
		let n = await $.readPageDraft(t);
		e[t.id] = !n?.meta?.description;
	}
	A(mw, e, !0);
}
async function gw(e) {
	let t = e.target.files?.[0];
	if (e.target.value = "", t) try {
		fw("ogImage", (await LA.compressOrTrim(t)).dataUrl);
	} catch (e) {
		OA.setStatus(LA.imageErrorText(e), "error");
	}
}
function _w(e, t) {
	let n = im(t);
	if (e.path === "/" || `/${n}` === e.path) return;
	let r = ow(n, e.id);
	r ? OA.setStatus(r, "error") : tw("pages", () => {
		e.path = `/${n}`;
	});
}
function vw(e) {
	e.path !== "/" && (tw("pages", () => {
		I(KC).pages = I(KC).pages.filter((t) => t.id !== e.id), I(KC).nav.items = I(KC).nav.items.filter((t) => t.page !== e.id || t.children);
		for (let t of I(KC).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
		I(KC).nav.items = I(KC).nav.items.filter((e) => e.page || e.href || e.children);
	}), e.id === $.pageId && $.selectPage(I(KC).pages[0].id), OA.setStatus(K("status.pageRemoved")));
}
var yw = /* @__PURE__ */ k(null);
function bw(e) {
	tw("edit:site-icon", () => {
		I(KC).site.icon = e;
	}), A(yw, null);
}
function xw(e) {
	let t = String(e ?? "").trim();
	tw("edit:site-analytics", () => {
		t ? I(KC).analytics = { token: t } : delete I(KC).analytics;
	});
}
var Sw = /* @__PURE__ */ O(() => I(KC)?.layout?.contentWidth ?? 1440), Cw = /* @__PURE__ */ O(() => I(KC)?.layout?.gutter ?? 6);
function ww() {
	let e = I(KC).site.lang ?? "no";
	return e === "no" ? "nb" : e;
}
function Tw() {
	let e = ww(), t = OA.sortLangs([...OA.LANG_OPTIONS, ...OA.sitePackLangs()]);
	return [...t.some(([t]) => t === e) ? [] : [[e, e]], ...t];
}
var Ew = /* @__PURE__ */ k(!1), Dw = /* @__PURE__ */ k(null), Ow = /* @__PURE__ */ k(null), kw = () => I(KC)?.site?.calendars ?? [], Aw = (e) => kw().find((t) => t.id === e) ?? null;
function jw(e = {}) {
	let t = {
		id: es("cal"),
		url: "",
		...e
	};
	return tw("site", () => {
		I(KC).site.calendars ??= [], I(KC).site.calendars.unshift(t);
	}), A(Dw, t.id, !0), A(Ow, t.id, !0), A(Ew, !0), t.id;
}
var Mw = /* @__PURE__ */ k(!1), Nw = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 49.6V14.4l25.6 10.4V49.6' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E", Pw = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
function Fw(e) {
	tw("nav", () => {
		e === null ? delete I(KC).nav.launcher.image : delete I(KC).nav.launcher.links[e].image;
	});
}
function Iw(e, t) {
	tw(e, () => {
		I(KC).footer ??= {
			version: 1,
			show: !1,
			text: "",
			align: "center"
		}, t(I(KC).footer);
	});
}
function Lw(e, t) {
	let n = I(KC).nav.items;
	e === t || e < 0 || t < 0 || e >= n.length || t >= n.length || tw("nav", () => {
		let [r] = n.splice(e, 1);
		n.splice(t, 0, r);
	});
}
function Rw(e, t, n) {
	let r = I(KC).nav.items[e].children;
	t === n || t < 0 || n < 0 || t >= r.length || n >= r.length || tw("nav", () => {
		let [e] = r.splice(t, 1);
		r.splice(n, 0, e);
	});
}
function zw(e) {
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
function Bw() {
	return Object.fromEntries(Object.entries(I(KC).theme.tokens.color).map(([e, t]) => [e, zw(t)]));
}
function Vw() {
	tw("theme", () => {
		I(KC).theme.alt = { tokens: { color: Bw() } };
	});
}
function Hw() {
	tw("theme", () => {
		I(KC).theme.alt.tokens.color = Bw();
	});
}
function Uw() {
	tw("theme", () => {
		delete I(KC).theme.alt;
	});
}
var Ww = (e, t) => e && t && t[e] ? t[e] : e, Gw = [
	"bg",
	"surface",
	"text",
	"accent",
	"accent-text"
], Kw = /* @__PURE__ */ O(() => [
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
function qw(e) {
	tw("theme", () => {
		let t = e.scheme === "dark", n = t ? e.dark : e.light, r = t ? e.light : e.dark;
		for (let e of Gw) I(KC).theme.tokens.color[e] = n[e];
		t ? I(KC).theme.scheme = "dark" : delete I(KC).theme.scheme, I(KC).theme.alt = { tokens: { color: { ...r } } };
	});
}
var Jw = /* @__PURE__ */ O(() => {
	if (!I(KC)) return null;
	let e = I(KC).theme.tokens.color, t = I(KC).theme.alt?.tokens?.color ?? {}, n = I(KC).theme.scheme === "dark";
	return I(Kw).find((r) => {
		let i = n ? r.dark : r.light, a = n ? r.light : r.dark;
		return Gw.every((n) => e[n] === i[n] && t[n] === a[n]);
	})?.id ?? null;
});
function Yw() {
	Nn(() => {
		if (!I(iw)) return;
		let e = (e) => {
			e.target.closest?.(".page-menu-wrap") || A(iw, null);
		}, t = (e) => {
			e.key === "Escape" && A(iw, null);
		}, n = () => {
			A(iw, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	}), Nn(() => {
		OA.activePanel === "pages" && $.pageId && hw();
	}), Nn(() => {
		let e = I(Ow);
		e && (A(Ow, null), Er().then(() => document.querySelector(`[data-cal-name="${e}"]`)?.focus()));
	}), Nn(() => {
		if (!I(KC)?.site) return;
		let e = I(KC).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		t && (typeof e != "string" || !e ? t.href = Nw : Pw.test(e) && (t.href = e));
	});
}
var Q = {
	BG_TYPES: BC,
	BG_DEFS: VC,
	get site() {
		return I(HC);
	},
	set site(e) {
		A(HC, e, !0);
	},
	get grid() {
		return I(UC);
	},
	set grid(e) {
		A(UC, e, !0);
	},
	get bindsFrom() {
		return I(WC);
	},
	set bindsFrom(e) {
		A(WC, e);
	},
	get siteStore() {
		return GC;
	},
	set siteStore(e) {
		GC = e;
	},
	get siteDraft() {
		return I(KC);
	},
	set siteDraft(e) {
		A(KC, e, !0);
	},
	linkSiteDraft: qC,
	pushSiteToPreview: JC,
	navBgMutate: YC,
	navBgCtx: XC,
	footerBgCtx: ZC,
	get previewPalette() {
		return I(QC);
	},
	themeSwatches: $C,
	setGrid: ew,
	siteMutate: tw,
	get newPageTitle() {
		return I(nw);
	},
	set newPageTitle(e) {
		A(nw, e, !0);
	},
	get newPageTemplate() {
		return I(rw);
	},
	set newPageTemplate(e) {
		A(rw, e, !0);
	},
	get pageMenuFor() {
		return I(iw);
	},
	set pageMenuFor(e) {
		A(iw, e, !0);
	},
	RESERVED_SLUGS: aw,
	pageSlugError: ow,
	addPage: sw,
	savePageAsTemplate: cw,
	renamePage: lw,
	get seoDraft() {
		return I(uw);
	},
	set seoDraft(e) {
		A(uw, e, !0);
	},
	readSeoDraft: dw,
	setPageSeo: fw,
	setPageNoindex: pw,
	get missingSeo() {
		return I(mw);
	},
	set missingSeo(e) {
		A(mw, e, !0);
	},
	refreshMissingSeo: hw,
	uploadOgImage: gw,
	setPageSlug: _w,
	deletePage: vw,
	get iconEditorImage() {
		return I(yw);
	},
	set iconEditorImage(e) {
		A(yw, e, !0);
	},
	applyIcon: bw,
	setAnalyticsToken: xw,
	get layoutWidth() {
		return I(Sw);
	},
	set layoutWidth(e) {
		A(Sw, e);
	},
	get layoutGutter() {
		return I(Cw);
	},
	set layoutGutter(e) {
		A(Cw, e);
	},
	siteLangValue: ww,
	siteLangOptions: Tw,
	get siteCalendarsOpen() {
		return I(Ew);
	},
	set siteCalendarsOpen(e) {
		A(Ew, e, !0);
	},
	get openSiteCalendar() {
		return I(Dw);
	},
	set openSiteCalendar(e) {
		A(Dw, e, !0);
	},
	get focusSiteCalendar() {
		return I(Ow);
	},
	set focusSiteCalendar(e) {
		A(Ow, e, !0);
	},
	siteCalendars: kw,
	siteCalendarById: Aw,
	addSiteCalendar: jw,
	get siteZoneBad() {
		return I(Mw);
	},
	set siteZoneBad(e) {
		A(Mw, e, !0);
	},
	URD_MARK_ICON: Nw,
	SAFE_ICON_RE: Pw,
	clearLauncherImage: Fw,
	footerMutate: Iw,
	moveNavItemTo: Lw,
	moveNavChildTo: Rw,
	invertLightness: zw,
	suggestAltColors: Bw,
	createAltTheme: Vw,
	reSuggestAltTheme: Hw,
	removeAltTheme: Uw,
	themeHex: Ww,
	THEME_PRESET_KEYS: Gw,
	get THEME_PRESETS() {
		return I(Kw);
	},
	applyThemePreset: qw,
	get activeThemePreset() {
		return I(Jw);
	},
	effects: Yw
}, Xw = /* @__PURE__ */ O(() => ({
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
})), Zw = /* @__PURE__ */ O(() => ({
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
function Qw(e) {
	let t = I(Zw)[e];
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
function $w(e) {
	oE.bridge ? oE.bridge.sendPlaceBlock(e) : eT($.targetSection()?.id, e);
}
function eT(e, t) {
	let n = $.store.data.sections.find((t) => t.id === e) ?? $.store.data.sections[0];
	if (!n) return;
	DO.pushHistory("add-block");
	let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
	t.frames?.desktop && (t.frames.desktop = {
		...t.frames.desktop,
		z: r
	}), n.blocks.push(t), $.markDesktopChange(n, "block-added"), $.store.save(), DO.updateDirty(), oE.bridge?.sendSection($.pageId, n), $.fitBlockSoon(n.id, t);
}
function tT(e, t, n, r) {
	let i = $.store.data.sections.find((t) => t.id === e);
	if (!i || !t?.length) return;
	DO.pushHistory("add-blocks");
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
	}), $.markDesktopChange(i, "block-added"), $.store.save(), DO.updateDirty(), oE.bridge?.sendSection($.pageId, i);
}
var nT = {
	list: "calendar",
	cards: "calendar-cards",
	month: "calendar-month",
	next: "calendar-next",
	agenda: "calendar-agenda",
	week: "calendar-month",
	day: "calendar",
	year: "calendar-month"
};
function rT(e) {
	let t = Om(e), n = Qw(nT[t.view] ?? "calendar");
	n && (n.props = {
		...n.props,
		...t.view ? { view: t.view } : {},
		...t.id === "plain" ? {} : { design: t.id },
		...t.view === "next" ? {
			nextCount: 3,
			laterCount: 3
		} : {}
	}, $w(n));
}
function iT(e) {
	let t = Qw(e.kind);
	if (t) {
		if (e.at && typeof e.at.x == "number" && typeof e.at.y == "number") {
			let n = $.store.data.sections.find((t) => t.id === e.sectionId)?.grid ?? Q.siteDraft.grid, r = oC({
				x: e.at.x,
				y: e.at.y,
				w: t.frames.desktop.w,
				h: t.frames.desktop.h,
				grid: n
			});
			t.frames.desktop.x = r.x, t.frames.desktop.y = r.y;
		} else t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40;
		eT(e.sectionId, t), oE.bridge?.sendSelect(t.id), e.kind === "image" && OA.setStatus(K("status.imageBlockAdded")), e.kind === "gallery" && OA.setStatus(K("status.galleryBlockAdded"));
	}
}
var aT = {
	get BLOCK_LABELS() {
		return I(Xw);
	},
	get BLOCK_DEFAULTS() {
		return I(Zw);
	},
	buildBlock: Qw,
	requestPlacement: $w,
	insertBlock: eT,
	insertBlocks: tT,
	CAL_KIND_BY_VIEW: nT,
	addCalendarDesign: rT,
	handleRequestBlock: iT
};
//#endregion
//#region src/state/bridge.svelte.js
function oT(e) {
	let { section: t, block: n } = $.readBlock(e.sectionId, e.blockId);
	t && n?.sticky && Lh.some(([t]) => t === e.dock) && (DO.pushHistory(`sticky-dock:${e.blockId}`), n.sticky = {
		...n.sticky,
		dock: e.dock
	}, $.store.save(), DO.updateDirty(), oE.bridge?.sendSection($.pageId, t), $.syncSelectedBlock());
}
function sT(e) {
	let t = e.blockIds ?? [], { section: n } = $.readBlock(e.sectionId, t[0]);
	if (!n || !t.length) return;
	DO.pushHistory(`sticky-group:${e.sectionId}`);
	let r = e.on ? es("stk") : null;
	for (let e of n.blocks) t.includes(e.id) && (e.sticky = r ? {
		offset: 16,
		until: null,
		...e.sticky,
		group: r
	} : null);
	$.markDesktopChange(n, "block-edited"), $.store.save(), DO.updateDirty(), oE.bridge?.sendSection($.pageId, n), $.syncSelectedBlock(), OA.setStatus(K(e.on ? "status.stickyGrouped" : "status.stickyUngrouped"));
}
function cT(e) {
	let t = $.store.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
	n && (DO.pushHistory(`edit:${e.blockId}`), n.props = e.props, $.store.save(), DO.updateDirty(), $.selectedBlock?.blockId === e.blockId && $.syncSelectedBlock(), e.rerender && oE.bridge?.sendSection($.pageId, t), OA.status = "", $.fitBlockSoon(t.id, n));
}
function lT(e) {
	let t = $.store.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
	if (!n) return;
	DO.pushHistory(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
	let r = e.frameKey === "mobile" ? "mobile" : "desktop", i = n.frames.desktop?.w;
	n.frames[r] = e.frame, r === "desktop" && $.markDesktopChange(t, "desktop-changed-after-mobile"), $.store.save(), DO.updateDirty(), $.selectedBlock?.blockId === e.blockId && $.syncSelectedBlock(), r === "desktop" && e.frame?.w !== i ? $.fitBlockSoon(t.id, n) : r === "mobile" && $.phoneFitSoon(t.id, n);
}
function uT(e) {
	let t = $.store.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
	n?.frames?.desktop && n.frames.desktop.h !== e.h && (e.fit ? oE.viewMode === "desktop" && e.seq === $.fitSeq.get(e.blockId) && dT(t, n, e.h) : ($.store.amendBaseline((t) => {
		let n = t.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		n?.frames?.desktop && (n.frames.desktop.h = e.h);
	}), $.store.hasDraft() && DO.pushHistory(`edit:${e.blockId}`), n.frames.desktop.h = e.h, $.store.save(), DO.updateDirty(), $.selectedBlock?.blockId === e.blockId && $.syncSelectedBlock()));
}
function dT(e, t, n) {
	let r = zs(e.blocks, t.id, n), i = {};
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
	$.markDesktopChange(e, "block-edited"), $.store.save(), DO.updateDirty(), $.selectedBlock?.blockId === t.id && $.syncSelectedBlock(), oE.bridge?.sendFrames(e.id, Xe(i));
}
function fT(e) {
	let t = $.store.data.sections.find((t) => t.id === e.sectionId);
	if (t) {
		if (DO.pushHistory("mobile-reset"), e.blockId) {
			let n = t.blocks.find((t) => t.id === e.blockId);
			n && (n.frames.mobile = null);
		} else for (let e of t.blocks) e.frames.mobile = null;
		!$.hasMobileOverrides(t) && t.responsive?.mobile && (t.responsive.mobile.attention = null), $.store.save(), DO.updateDirty(), OA.updateAttention(), oE.bridge?.sendSection($.pageId, t);
	}
}
function pT(e) {
	let t = $.store.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
	n && typeof e.mobileOrder == "number" && (DO.pushHistory("mobile-order"), n.mobileOrder = e.mobileOrder, $.store.save(), DO.updateDirty(), oE.bridge?.sendSection($.pageId, t));
}
function mT(e) {
	let t = $.store.data.sections.find((t) => t.id === e.sectionId);
	t?.responsive?.mobile && (DO.pushHistory("review-done"), t.responsive.mobile.attention = null, $.store.save(), DO.updateDirty(), OA.updateAttention());
}
function hT(e) {
	let t = $.store.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
	n && (DO.pushHistory("block-flag"), typeof e.decor == "boolean" && (n.decor = e.decor), typeof e.hideMobile == "boolean" && (n.hideMobile = e.hideMobile), $.store.save(), DO.updateDirty(), typeof e.hideMobile == "boolean" && oE.viewMode === "mobile" && oE.bridge?.sendSection($.pageId, t), $.selectedBlock?.blockId === e.blockId && $.syncSelectedBlock());
}
function gT(e) {
	DO.pushHistory("add-section"), e.section.id || (e.section.id = es("sec")), $.store.data.sections.splice(e.index, 0, e.section), $.store.save(), DO.updateDirty(), oE.bridge?.sendPage($.pageId, $.store.data), $.activeSectionId = e.section.id, $.syncSectionMirrors(e.section), OA.activePanel = "properties";
}
function _T(e) {
	let t = $.store.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
	n < 0 || r < 0 || r >= t.length || (DO.pushHistory("move-section"), [t[n], t[r]] = [t[r], t[n]], $.store.save(), DO.updateDirty(), oE.bridge?.sendPage($.pageId, $.store.data));
}
function vT(e) {
	DO.pushHistory("delete-section"), e.sectionId === $.activeSectionId && ($.activeSectionId = null, $.sectionGrid = null), $.selectedBlock?.sectionId === e.sectionId && ($.selectedBlock = null), $.store.data.sections = $.store.data.sections.filter((t) => t.id !== e.sectionId), $.store.save(), DO.updateDirty(), oE.bridge?.sendPage($.pageId, $.store.data);
}
function yT(e) {
	let t = $.store.data.sections.find((t) => t.id === e.sectionId);
	if (t) {
		DO.pushHistory("section-size"), t.size = {
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
		e.moves?.length && ($.markDesktopChange(t, "section-height"), $.selectedBlock?.sectionId === e.sectionId && $.syncSelectedBlock()), e.sectionId === $.activeSectionId && ($.sectionMinHeight = e.minHeight), $.store.save(), DO.updateDirty();
	}
}
function bT(e) {
	let t = $.store.data.sections.find((t) => t.id === e.fromSectionId), n = $.store.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
	t && n && r && (DO.pushHistory(e.groupKey ? `edit:${e.groupKey}` : "move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), $.markDesktopChange(t, "block-moved"), $.markDesktopChange(n, "block-moved"), $.store.save(), DO.updateDirty(), OA.updateAttention(), oE.bridge?.sendSection($.pageId, t), oE.bridge?.sendSection($.pageId, n), $.selectedBlock?.blockId === e.blockId && ($.selectedBlock = {
		...$.selectedBlock,
		sectionId: e.toSectionId
	}, $.syncSelectedBlock()));
}
function xT(e) {
	let t = $.store.data.sections.find((t) => t.id === e.sectionId);
	if (!t) return;
	let n = e.blockIds ?? [e.blockId];
	DO.pushHistory("delete-block"), t.blocks = t.blocks.filter((e) => !n.includes(e.id)), n.includes($.selectedBlock?.blockId) && ($.selectedBlock = null), $.markDesktopChange(t, "block-deleted"), $.store.save(), DO.updateDirty(), oE.bridge?.sendSection($.pageId, t);
}
var ST = {
	handleStickyDock: oT,
	handleStickyGroup: sT,
	handleEdit: cT,
	handleMove: lT,
	handleGrow: uT,
	applyFit: dT,
	handleMobileReset: fT,
	handleMobileOrder: pT,
	handleReviewDone: mT,
	handleBlockFlag: hT,
	handleAddSection: gT,
	handleMoveSection: _T,
	handleDeleteSection: vT,
	handleSectionSize: yT,
	handleMoveBlockSection: bT,
	handleDelete: xT
}, CT = /* @__PURE__ */ k(null), wT = /* @__PURE__ */ k(!0), TT = /* @__PURE__ */ k(pn(OS(typeof window < "u" ? window : null) ?? 1920)), ET = "urd-admin-screen";
function DT() {
	let e = null;
	try {
		e = JSON.parse(localStorage.getItem(ET) ?? "null");
	} catch {
		e = null;
	}
	return kS(e, I(TT));
}
var OT = /* @__PURE__ */ k(pn(DT()));
function kT(e) {
	A(OT, kS({
		...Xe(I(OT)),
		...e
	}, I(TT)), !0);
	try {
		localStorage.setItem(ET, JSON.stringify(I(OT)));
	} catch {}
}
var AT = /* @__PURE__ */ O(() => AS(I(OT), I(TT))), jT = [
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
], MT = /* @__PURE__ */ O(() => [{
	id: "desktop",
	width: I(AT).width,
	height: I(AT).height || null,
	viewport: "desktop"
}, ...jT]);
function NT(e) {
	let t = rp(Q.layoutWidth, Q.layoutGutter, e.width).width;
	return K(e.id === "desktop" ? I(OT).mode === "own" ? "tip.view.desktop" : e.height ? "tip.view.desktopSizeH" : "tip.view.desktopSize" : `tip.view.${e.id}`, {
		w: e.width,
		h: e.height ?? 0,
		c: t
	});
}
var PT = /* @__PURE__ */ k("desktop"), FT = /* @__PURE__ */ O(() => I(MT).find((e) => e.id === I(PT)) ?? I(MT)[0]), IT = /* @__PURE__ */ O(() => I(FT).viewport === "mobile" || I(FT).width <= (Q.siteDraft?.breakpoints?.mobile ?? 640) ? "mobile" : "desktop"), LT = /* @__PURE__ */ k(null), RT = /* @__PURE__ */ k(0), zT = /* @__PURE__ */ k(0), BT = /* @__PURE__ */ k("fit"), VT = /* @__PURE__ */ k(1), HT = /* @__PURE__ */ O(() => I(FT).width), UT = /* @__PURE__ */ O(() => I(FT).height ?? 0), WT = /* @__PURE__ */ O(() => I(BT) === "manual" ? I(VT) : iC(I(RT), I(HT), "fit", I(zT), I(UT)));
function GT(e) {
	A(VT, Math.min(400, Math.max(10, (Math.round(Math.round(I(WT) * 100) / 10) + e) * 10)) / 100), A(BT, "manual");
}
var KT = /* @__PURE__ */ O(() => I(UT) > 0 ? I(UT) : I(WT) > 0 ? I(zT) / I(WT) : I(zT)), qT = /* @__PURE__ */ O(() => I(HT) * I(WT)), JT = /* @__PURE__ */ O(() => I(UT) > 0 ? I(UT) * I(WT) : I(zT)), YT = /* @__PURE__ */ O(() => I(qT) > I(RT) + 1 || I(JT) > I(zT) + 1), XT = /* @__PURE__ */ k(null), ZT = () => {
	let e = null;
	try {
		e = localStorage.getItem("urd-theme-mode");
	} catch {}
	return oc(Q.siteDraft?.theme?.scheme, e, window.matchMedia("(prefers-color-scheme: dark)").matches);
}, QT = /* @__PURE__ */ k("light");
function $T() {
	I(XT)?.destroy(), I(CT)?.contentDocument?.addEventListener("pointerdown", () => {
		$.blockMenu &&= null;
	}, !0), A(XT, aC(I(CT), {
		onEdit: ST.handleEdit,
		onMove: ST.handleMove,
		onGrow: ST.handleGrow,
		onDelete: ST.handleDelete,
		onAddSection: ST.handleAddSection,
		onMoveSection: ST.handleMoveSection,
		onDeleteSection: ST.handleDeleteSection,
		onSectionSize: ST.handleSectionSize,
		onUndo: (e) => e.redo ? DO.redo() : DO.undo(),
		onSelectSection: $.onSelectSection,
		onSelectBlock: $.onSelectBlock,
		onBlockMenu: $.onBlockMenu,
		onReady: eE,
		onNavigate: tE,
		onAddBlock: (e) => aT.insertBlock(e.sectionId, e.block),
		onAddBlocks: (e) => aT.insertBlocks(e.sectionId, e.blocks, e.minBottom, e.moves),
		onRequestBlock: aT.handleRequestBlock,
		onMoveBlockSection: ST.handleMoveBlockSection,
		onMobileReset: ST.handleMobileReset,
		onMobileOrder: ST.handleMobileOrder,
		onReviewDone: ST.handleReviewDone,
		onBlockFlag: ST.handleBlockFlag,
		onCollectionEdit: YO.handleCollectionEdit,
		onCollectionAdd: YO.handleCollectionAdd,
		onSaveTemplate: zC.handleSaveTemplate,
		onStickyGroup: ST.handleStickyGroup,
		onStickyDock: ST.handleStickyDock,
		onDeleteTemplate: zC.handleDeleteTemplate,
		onApplyLayout: $.handleApplyLayout,
		onPluginBlocks: (e) => {
			DE.pluginBlocks = e.blocks ?? [];
		},
		onNavWidth: (e) => Q.siteMutate("edit:nav-width", () => {
			Q.siteDraft.nav.style ??= {}, Q.siteDraft.nav.style.width = e.width;
		})
	}));
}
async function eE() {
	await $.pageLoading, await DE.pluginsReady, I(XT)?.sendPlugins(Xe(DE.pluginsView)?.enabled ?? []), I(XT)?.sendViewport(I(IT)), I(XT)?.sendZoom(I(WT)), YO.pushCollectionsToPreview(), zC.pushTemplatesToPreview(), Q.siteStore.hasDraft() && Q.pushSiteToPreview();
	let e = !Q.site.pages.some((e) => e.id === $.pageId);
	($.store.hasDraft() || e) && I(XT)?.sendPage($.pageId, $.store.data), I(wT) || I(XT)?.sendChrome(!1), OA.gridOn && I(XT)?.sendShowGrid(!0), OA.guidesOn && I(XT)?.sendShowGuides(!0), OA.sendAdminTheme();
}
function tE(e) {
	let t = e.path.replace(/\/$/, "") || "/", n = Q.siteDraft.pages.find((e) => e.path === t);
	n && n.id !== $.pageId && $.selectPage(n.id);
}
function nE() {
	I(CT) && (I(CT).src = I(CT).src);
}
var rE = 0;
async function iE() {
	I(wT) && (rE = OA.panelEl?.scrollTop ?? 0), A(wT, !I(wT)), I(XT)?.sendChrome(I(wT)), I(wT) || ($.blockMenu = null), I(wT) && (await Er(), requestAnimationFrame(() => {
		OA.panelEl && (OA.panelEl.scrollTop = rE);
	}));
}
function aE() {
	Nn(() => {
		let e = () => I(XT)?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), Nn(() => {
		let e = I(IT);
		I(XT)?.sendViewport(e);
	}), Nn(() => {
		let e = I(WT);
		I(XT)?.sendZoom(e);
	}), Nn(() => {
		let e = () => {
			A(TT, OS(window) ?? I(TT), !0);
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}), Nn(() => {
		let e = I(LT);
		if (!e || typeof ResizeObserver > "u") return;
		let t = () => {
			A(RT, e.clientWidth, !0), A(zT, e.clientHeight, !0);
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	}), Nn(() => {
		A(QT, ZT(), !0);
		let e = window.matchMedia("(prefers-color-scheme: dark)"), t = (e) => {
			e instanceof StorageEvent && e.key && e.key !== "urd-theme-mode" || A(QT, ZT(), !0);
		};
		return e.addEventListener("change", t), window.addEventListener("storage", t), () => {
			e.removeEventListener("change", t), window.removeEventListener("storage", t);
		};
	});
}
var oE = {
	get iframeEl() {
		return I(CT);
	},
	set iframeEl(e) {
		A(CT, e, !0);
	},
	get chromeVisible() {
		return I(wT);
	},
	set chromeVisible(e) {
		A(wT, e, !0);
	},
	get ownWidth() {
		return I(TT);
	},
	set ownWidth(e) {
		A(TT, e, !0);
	},
	SCREEN_PREF_KEY: ET,
	readScreenPref: DT,
	get screenPref() {
		return I(OT);
	},
	set screenPref(e) {
		A(OT, e, !0);
	},
	setScreenPref: kT,
	get screenTarget() {
		return I(AT);
	},
	set screenTarget(e) {
		A(AT, e);
	},
	FIXED_DEVICES: jT,
	get devices() {
		return I(MT);
	},
	set devices(e) {
		A(MT, e);
	},
	deviceTip: NT,
	get deviceId() {
		return I(PT);
	},
	set deviceId(e) {
		A(PT, e, !0);
	},
	get device() {
		return I(FT);
	},
	set device(e) {
		A(FT, e);
	},
	get viewMode() {
		return I(IT);
	},
	set viewMode(e) {
		A(IT, e);
	},
	get frameWrapEl() {
		return I(LT);
	},
	set frameWrapEl(e) {
		A(LT, e, !0);
	},
	get frameW() {
		return I(RT);
	},
	set frameW(e) {
		A(RT, e, !0);
	},
	get frameH() {
		return I(zT);
	},
	set frameH(e) {
		A(zT, e, !0);
	},
	get zoomMode() {
		return I(BT);
	},
	set zoomMode(e) {
		A(BT, e, !0);
	},
	get manualZoom() {
		return I(VT);
	},
	set manualZoom(e) {
		A(VT, e, !0);
	},
	get targetW() {
		return I(HT);
	},
	set targetW(e) {
		A(HT, e);
	},
	get targetH() {
		return I(UT);
	},
	set targetH(e) {
		A(UT, e);
	},
	get scale() {
		return I(WT);
	},
	set scale(e) {
		A(WT, e);
	},
	stepZoom: GT,
	get iframeH() {
		return I(KT);
	},
	set iframeH(e) {
		A(KT, e);
	},
	get stageW() {
		return I(qT);
	},
	set stageW(e) {
		A(qT, e);
	},
	get stageH() {
		return I(JT);
	},
	set stageH(e) {
		A(JT, e);
	},
	get canPan() {
		return I(YT);
	},
	set canPan(e) {
		A(YT, e);
	},
	get bridge() {
		return I(XT);
	},
	set bridge(e) {
		A(XT, e);
	},
	readPreviewMode: ZT,
	get previewMode() {
		return I(QT);
	},
	set previewMode(e) {
		A(QT, e, !0);
	},
	onIframeLoad: $T,
	onReady: eE,
	onNavigate: tE,
	reloadPreview: nE,
	get panelScroll() {
		return rE;
	},
	set panelScroll(e) {
		rE = e;
	},
	toggleChrome: iE,
	effects: aE
}, sE = null, cE, lE = new Promise((e) => {
	cE = e;
}), uE = /* @__PURE__ */ k(null), dE = /* @__PURE__ */ k(pn({})), fE = /* @__PURE__ */ k("0.0.0"), pE = /* @__PURE__ */ k(pn([])), mE = /* @__PURE__ */ k(pn([])), hE = /* @__PURE__ */ k("pending"), gE = () => [.../* @__PURE__ */ new Set([...I(uE)?.enabled ?? [], ...I(uE)?.disabled ?? []])];
function _E() {
	A(uE, JSON.parse(JSON.stringify(sE.data)), !0);
}
var vE = /* @__PURE__ */ k(null);
async function yE() {
	try {
		let e = (await fetch("/urd.json", { cache: "no-store" })).headers.get("content-security-policy");
		if (!e) {
			A(vE, { unknown: !0 }, !0);
			return;
		}
		let t = (t) => new Set((e.split(";").map((e) => e.trim()).find((e) => e.startsWith(`${t} `)) ?? "").split(/\s+/).slice(1));
		A(vE, {
			frameSrc: t("frame-src"),
			connectSrc: t("connect-src"),
			scriptSrc: t("script-src")
		}, !0);
	} catch {
		A(vE, { unknown: !0 }, !0);
	}
}
async function bE() {
	yE();
	let e = {
		version: 1,
		enabled: []
	};
	try {
		e = await (await fetch("/plugins/plugins.json")).json();
	} catch {}
	A(mE, e.enabled ?? [], !0), sE = KS("urd-draft-plugins", () => e, OA.draftSaveError), _E();
	try {
		A(fE, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
	} catch {}
	for (let e of gE()) CE(e);
	xE(), cE(), oE.bridge?.sendPlugins(Xe(I(uE))?.enabled ?? []);
}
async function xE() {
	try {
		let e = await fetch("/api/github/plugins");
		if (!e.ok) {
			SE();
			return;
		}
		let { plugins: t } = await e.json();
		localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), A(pE, (t ?? []).filter((e) => !gE().includes(e)), !0);
		for (let e of I(pE)) CE(e);
		A(hE, "ok");
	} catch {
		SE();
	}
}
function SE() {
	try {
		let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
		if (Array.isArray(e) && e.length) {
			A(pE, e.filter((e) => !gE().includes(e)), !0);
			for (let e of I(pE)) CE(e);
			A(hE, "ok");
			return;
		}
	} catch {}
	A(hE, "unavailable");
}
async function CE(e) {
	try {
		let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = nC(t);
		I(dE)[e] = {
			...t,
			errors: n,
			satisfied: n.length === 0 && eC(I(fE), t.requiresEngine)
		};
	} catch {
		I(dE)[e] = {
			name: e,
			errors: [K("plugin.manifestNotFound", { id: e })],
			satisfied: !1
		};
	}
}
function wE(e, t) {
	DO.pushHistory("plugins");
	let n = sE.data;
	n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), sE.save(), DO.updateDirty(), _E(), oE.reloadPreview();
}
function TE(e) {
	DO.pushHistory("plugins");
	let t = sE.data;
	t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), sE.save(), DO.updateDirty(), _E(), oE.reloadPreview();
}
var EE = /* @__PURE__ */ k(pn([])), DE = {
	get pluginsStore() {
		return sE;
	},
	set pluginsStore(e) {
		sE = e;
	},
	get resolvePluginsReady() {
		return cE;
	},
	set resolvePluginsReady(e) {
		cE = e;
	},
	pluginsReady: lE,
	get pluginsView() {
		return I(uE);
	},
	set pluginsView(e) {
		A(uE, e, !0);
	},
	get pluginInfo() {
		return I(dE);
	},
	set pluginInfo(e) {
		A(dE, e, !0);
	},
	get pluginEngine() {
		return I(fE);
	},
	set pluginEngine(e) {
		A(fE, e, !0);
	},
	get pluginsFound() {
		return I(pE);
	},
	set pluginsFound(e) {
		A(pE, e, !0);
	},
	get publishedPluginIds() {
		return I(mE);
	},
	set publishedPluginIds(e) {
		A(mE, e, !0);
	},
	get pluginDiscovery() {
		return I(hE);
	},
	set pluginDiscovery(e) {
		A(hE, e, !0);
	},
	knownPlugins: gE,
	syncPluginsView: _E,
	get liveCsp() {
		return I(vE);
	},
	set liveCsp(e) {
		A(vE, e, !0);
	},
	loadLiveCsp: yE,
	initPlugins: bE,
	discoverPlugins: xE,
	useCachedDiscovery: SE,
	loadPluginInfo: CE,
	setPluginEnabled: wE,
	removePlugin: TE,
	get pluginBlocks() {
		return I(EE);
	},
	set pluginBlocks(e) {
		A(EE, e, !0);
	}
}, OE = /* @__PURE__ */ k(null);
function kE(e) {
	let t = ME.data.sections.find((t) => t.id === e.sectionId);
	if (t) {
		DO.pushHistory("layout");
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
		}, jE(t, "layout-changed"), e.sectionId === I(OD) && A(AD, e.minHeight, !0), I(FE)?.sectionId === e.sectionId && LE(), ME.save(), DO.updateDirty(), oE.bridge?.sendSection(I(OE), t);
	}
}
function AE(e) {
	return e?.blocks?.some((e) => e.frames?.mobile) ?? !1;
}
function jE(e, t) {
	e && AE(e) && (e.responsive?.mobile?.attention?.needed || (e.responsive = {
		...e.responsive ?? {},
		mobile: {
			...e.responsive?.mobile ?? { mode: "auto" },
			attention: {
				needed: !0,
				reason: t,
				since: (/* @__PURE__ */ new Date()).toISOString()
			}
		}
	}, OA.updateAttention(), oE.bridge?.sendAttention(e.id, !0)));
}
var ME = null, NE = /* @__PURE__ */ new Set(), PE = () => Q.siteDraft.pages.find((e) => e.id === I(OE)), FE = /* @__PURE__ */ k(null);
function IE(e, t) {
	let n = ME?.data.sections.find((t) => t.id === e);
	return {
		section: n,
		block: n?.blocks.find((e) => e.id === t)
	};
}
function LE() {
	if (!I(FE)) return;
	let { block: e } = IE(I(FE).sectionId, I(FE).blockId);
	e ? A(FE, {
		sectionId: I(FE).sectionId,
		blockId: I(FE).blockId,
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
	}, !0) : A(FE, null);
}
function RE(e) {
	A(zE, null), e.blockId ? (A(FE, {
		sectionId: e.sectionId,
		blockId: e.blockId
	}, !0), e.sectionId && A(OD, e.sectionId, !0), LE()) : A(FE, null);
}
var zE = /* @__PURE__ */ k(null);
function BE() {
	_h(oE.frameWrapEl?.getBoundingClientRect().left ?? 0);
}
var VE = /* @__PURE__ */ k(null), HE = null;
function UE(e) {
	if (RE(e), !I(FE)) return;
	BE();
	let t = Math.min(mh.wide && mh.room >= 740 ? 740 : 400, window.innerWidth - 16), n = oE.iframeEl?.getBoundingClientRect();
	if (!n) return;
	let r = n.left + oE.scale * e.rect.right + 12;
	r + t > window.innerWidth - 8 && (r = Math.max(8, n.left + oE.scale * e.rect.left - t - 12));
	let i = window.innerHeight - Math.min(window.innerHeight * .7, 560) - 8, a = Math.min(Math.max(8, n.top + oE.scale * e.rect.top), Math.max(8, i));
	A(zE, {
		left: r,
		top: a
	}, !0);
}
function WE(e, t) {
	let { section: n, block: r } = IE(I(FE)?.sectionId, I(FE)?.blockId);
	r && (e && DO.pushHistory(e), t(r, n), jE(n, "block-edited"), ME.save(), DO.updateDirty(), oE.bridge?.sendSection(I(OE), n), LE(), aD(n.id, r));
}
function GE(e, t) {
	WE(`edit:${I(FE).blockId}:${e}`, (n) => {
		n.props[e] = t;
	});
}
function KE(e, t) {
	WE(`edit:${I(FE).blockId}:${e}`, (e) => {
		Object.assign(e.props, t);
	});
}
function qE(e, t) {
	let n = I(FE).props;
	return Object.entries(t).some(([e, t]) => n[e] !== void 0 && JSON.stringify(n[e]) !== JSON.stringify(t)) ? () => KE(e, { ...t }) : null;
}
function JE(e) {
	let t = I(FE).props;
	return Object.entries(e).filter(([e, n]) => t[e] !== void 0 && JSON.stringify(t[e]) !== JSON.stringify(n)).length;
}
var YE = () => [["on", K("common.on")], ["off", K("common.off")]], XE = () => [
	["canvas", K("opt.ribbonWidth.content")],
	["page", K("opt.ribbonWidth.page")],
	["content", K("opt.ribbonWidth.own")]
], ZE = (e) => e === "canvas" || e === "page" ? e : "content", QE = () => [
	["roll", K("opt.ribbonMotion.roll")],
	["sway", K("opt.ribbonMotion.sway")],
	["step", K("opt.ribbonMotion.step")],
	["none", K("opt.ribbonMotion.none")]
];
function $E() {
	return [...Q.siteDraft.pages.map((e) => [e.id, e.title]), ["__href", K("opt.externalLink")]];
}
function eD(e) {
	let t = e === "__href" ? null : e;
	WE(`edit:${I(FE).blockId}`, (e) => {
		e.props.page = t, t && (e.props.href = null);
	});
}
function tD() {
	oE.bridge?.sendOpenImageEditor(I(FE).blockId), A(zE, null);
}
var nD = /* @__PURE__ */ new Map(), rD = /* @__PURE__ */ new Map(), iD = 0;
function aD(e, t) {
	if (lD(e, t), oE.viewMode !== "desktop" || !ks(t)) return;
	clearTimeout(nD.get(t.id));
	let n = ++iD;
	rD.set(t.id, n), nD.set(t.id, setTimeout(() => oE.bridge?.sendFitBlock(e, t.id, n), 60));
}
var oD = /* @__PURE__ */ new Map(), sD = null, cD = "";
function lD(e, t) {
	if (!As.has(t.type) || !ks(t)) return;
	sD ??= JS({
		title: () => K("canvas.phoneMeasure"),
		prepare: (e, t) => {
			let n = Xe(DE.pluginsView)?.enabled ?? [], r = JSON.stringify(n);
			(t || r !== cD) && e({
				type: "urd-plugins",
				enabled: n
			}), cD = r, e({
				type: "urd-site",
				site: Xe(Q.siteDraft)
			}), e({
				type: "urd-collections",
				collections: Xe(YO.collectionsView) ?? {}
			});
		},
		onHeight: uD
	});
	let n = ++iD;
	oD.set(t.id, n), sD.request(I(OE), Xe(ME.data), e, t.id, n);
}
function uD(e, t, n, r) {
	if (e !== I(OE) || r !== oD.get(t)) return;
	let i = ME.data.sections.flatMap((e) => e.blocks).find((e) => e.id === t), a = Math.round(n);
	i && a > 0 && i.mobileHeight !== a && (i.mobileHeight = a, ME.save(), DO.updateDirty());
}
function dD() {
	for (let e of nD.values()) clearTimeout(e);
	nD.clear(), rD.clear(), oD.clear(), sD?.cancel();
}
function fD(e) {
	let t = Om(e), n = t.view === "next" ? {
		nextCount: I(FE).props.nextCount ?? 3,
		laterCount: I(FE).props.laterCount ?? 3
	} : {}, r = t.id === "plain" && ![
		"list",
		"cards",
		"month",
		"agenda",
		"next"
	].includes(km(I(FE).props)) ? { view: "list" } : {};
	KE("design", {
		design: t.id === "plain" ? void 0 : t.id,
		...t.view ? { view: t.view } : {},
		...r,
		...n
	});
}
function pD(e) {
	WE(`edit:${I(FE).blockId}:fit`, (t) => {
		e === "shrink" || e === "both" ? (t.fit = e, t.fitMin ??= .6) : (delete t.fit, delete t.fitMin);
	});
}
function mD(e) {
	WE(`edit:${I(FE).blockId}:fitMin`, (t) => {
		t.fitMin = e;
	});
}
var hD = null;
function gD(e) {
	WE(`edit:${I(FE).blockId}:size`, (t, n) => {
		hD?.blockId !== t.id && (hD = {
			blockId: t.id,
			size: Is(t),
			frame: { ...t.frames.desktop },
			ys: new Map(n.blocks.filter((e) => e.frames?.desktop).map((e) => [e.id, e.frames.desktop.y]))
		}), e === 1 ? (delete t.size, delete t.sizeMin, delete t.sizeMax) : t.size = e;
		let r = hD;
		for (let e of n.blocks) e.id !== t.id && e.frames?.desktop && r.ys.has(e.id) && (e.frames.desktop = {
			...e.frames.desktop,
			y: r.ys.get(e.id)
		});
		t.frames.desktop = { ...r.frame };
		let i = Is(t) / r.size;
		if (i === 1) return;
		let a = {
			...r.frame,
			w: Math.min(Math.round(r.frame.w * i * 100) / 100, Math.round((100 - r.frame.x) * 100) / 100)
		};
		if (!ks(t)) {
			a.h = Math.max(1, Math.round(r.frame.h * i));
			for (let [e, r] of zs(n.blocks, t.id, a.h)) {
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
function _D(e, t) {
	let n = e === "sizeMin" ? Fs.minDefault : Fs.maxDefault;
	WE(`edit:${I(FE).blockId}:${e}`, (r) => {
		let i = Math.round(Number(t));
		Number.isFinite(i) && i > 0 && i !== n ? r[e] = Math.min(Fs.max, Math.max(Fs.min, i)) : delete r[e];
	});
}
function vD(e) {
	WE(`edit:${I(FE).blockId}:height`, (t) => {
		e === "own" ? t.height = { mode: "own" } : delete t.height;
	});
}
function yD(e) {
	WE(`edit:${I(FE).blockId}:heightAlign`, (t) => {
		t.height = { mode: "own" }, e !== "top" && (t.height.align = e);
	});
}
function bD() {
	let e = I(FE);
	if (js.has(e.type)) return !0;
	if (e.type !== "calendar") return !1;
	let t = Om(e.props.design);
	return !t.module && ["list", "cards"].includes(t.view);
}
function xD(e, t) {
	Number.isFinite(t) && WE(`edit:frame-${I(FE).blockId}:${e}`, (n) => {
		n.frames.desktop = {
			...n.frames.desktop,
			[e]: t
		};
	});
}
function SD() {
	let e = ME.data.sections.find((e) => e.id === I(FE)?.sectionId)?.size?.maxWidth, t = typeof Q.layoutWidth == "number" ? Q.layoutWidth : 0;
	return e === "full" ? 0 : e ? /^\d+(\.\d+)?px$/.test(e) ? Math.min(parseFloat(e), t || Infinity) : 0 : t;
}
function CD(e) {
	return Math.round(e / 100 * SD());
}
function wD(e, t) {
	let n = SD();
	if (!Number.isFinite(e) || e < 4 || !(n > 0)) return;
	let { x: r, w: i, h: a } = I(FE).frame, o = Math.max(.5, Math.min(Math.round(e / n * 200) / 2, Math.round((100 - r) * 2) / 2)), s = t ? Math.max(1, Math.round(o / i * a)) : a;
	Number.isFinite(o) && Number.isFinite(s) && WE(`edit:frame-${I(FE).blockId}:size`, (e) => {
		e.frames.desktop = {
			...e.frames.desktop,
			w: o,
			h: s
		};
	});
}
function TD(e) {
	WE(`edit:${I(FE).blockId}:boxStyle`, (t) => {
		let n = {
			...t.props.boxStyle ?? {},
			...e
		};
		for (let e of Object.keys(n)) n[e] ?? delete n[e];
		Object.keys(n).length ? t.props.boxStyle = n : delete t.props.boxStyle;
	});
}
function ED(e) {
	WE("decor", (t) => {
		t.decor = e;
	});
}
function DD(e) {
	let { section: t, block: n } = IE(I(FE)?.sectionId, I(FE)?.blockId);
	n && (DO.pushHistory("hide-mobile"), n.hideMobile = e, ME.save(), DO.updateDirty(), oE.bridge?.sendSection(I(OE), t), LE());
}
var OD = /* @__PURE__ */ k(null), kD = /* @__PURE__ */ k(null), AD = /* @__PURE__ */ k(""), jD = /* @__PURE__ */ k(pn([])), MD = /* @__PURE__ */ k(null), ND = /* @__PURE__ */ k(null), PD = /* @__PURE__ */ k(""), FD = /* @__PURE__ */ k(pn({}));
function ID(e) {
	A(kD, e?.grid ? { ...e.grid } : null, !0), A(AD, e?.size?.minHeight ?? "", !0), A(jD, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), A(MD, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0), A(ND, e?.hover ? JSON.parse(JSON.stringify(e.hover)) : null, !0), A(PD, e?.theme ?? "", !0), A(FD, e?.divider ? JSON.parse(JSON.stringify(e.divider)) : {}, !0);
}
var LD = /* @__PURE__ */ k(null);
function RD() {
	try {
		let e = ((oE.iframeEl?.contentDocument)?.querySelector(`.urd-section[data-section-id="${I(OD)}"]`))?.getBoundingClientRect();
		A(LD, e && e.width ? {
			w: e.width,
			h: e.height
		} : null, !0);
	} catch {
		A(LD, null);
	}
}
function zD(e) {
	A(OD, e.sectionId, !0), ID(ME?.data.sections.find((t) => t.id === e.sectionId));
}
function BD(e, t) {
	let n = ME.data.sections.find((e) => e.id === I(OD));
	n && (DO.pushHistory(e), t(n), ME.save(), DO.updateDirty(), oE.bridge?.sendSection(I(OE), n), ID(n));
}
function VD(e) {
	let t = e.target.files?.[0];
	e.target.value = "", t && LA.readVideoFile(t, "status.videoFileFormat", (e) => GE("src", e));
}
async function HD(e) {
	let t = e.target.files?.[0];
	if (e.target.value = "", t) try {
		GE("poster", (await LA.compressOrTrim(t)).dataUrl);
	} catch (e) {
		OA.setStatus(LA.imageErrorText(e), "error");
	}
}
var UD = /* @__PURE__ */ O(() => ({
	mutate: BD,
	keyPrefix: "bg",
	keyId: I(OD)
}));
function WD(e) {
	return {
		type: e,
		version: ZS[e].version,
		props: ZS[e].defaults()
	};
}
var GD = (e) => !!(e && ZS[e.type]?.entrance), KD = /* @__PURE__ */ O(() => [["", K("common.none")], ...Object.entries(ZS).filter(([, e]) => e.entrance).map(([e, t]) => [e, t.labelKey ? K(t.labelKey) : t.label])]), qD = /* @__PURE__ */ O(() => I(KD).filter(([e]) => !ZS[e]?.group)), JD = /* @__PURE__ */ O(() => [["", K("common.none")], ...Object.entries(ZS).filter(([, e]) => !e.entrance).map(([e, t]) => [e, t.labelKey ? K(t.labelKey) : t.label])]);
function YD(e) {
	e.animation && !GD(e.animation) && (e.hover ??= e.animation, e.animation = null);
}
function XD(e) {
	WE(`edit:anim-${I(FE).blockId}`, (t) => {
		YD(t), t.animation = e ? WD(e) : null;
	}), I(FE) && oE.bridge?.sendDemoAnim(I(FE).sectionId, I(FE).blockId);
}
function ZD(e) {
	WE(`edit:hover-${I(FE).blockId}`, (t) => {
		YD(t), t.hover = e ? WD(e) : null;
	});
}
function QD(e, t) {
	Number.isFinite(t) && (WE(`edit:anim-${I(FE).blockId}:${e}`, (n) => {
		n.animation && (n.animation.props[e] = t);
	}), I(FE) && oE.bridge?.sendDemoAnim(I(FE).sectionId, I(FE).blockId));
}
function $D(e) {
	let t = ME.data.sections.find((e) => e.id === I(OD));
	if (!t) return;
	let n = e.trim();
	if (!n) return;
	let r = /^\d+$/.test(n) ? `${n}px` : n;
	DO.pushHistory("section-size"), t.size = {
		...t.size,
		minHeight: r
	}, A(AD, r, !0), ME.save(), DO.updateDirty(), oE.bridge?.sendSection(I(OE), t);
}
function eO() {
	return ME.data.sections.find((e) => e.id === I(OD)) ?? ME.data.sections[0];
}
function tO(e) {
	let t = ME.data.sections.find((e) => e.id === I(OD));
	t && (DO.pushHistory("grid:section"), t.grid = e ? { ...Q.siteStore.data.grid } : null, A(kD, t.grid ? { ...t.grid } : null, !0), ME.save(), DO.updateDirty(), oE.bridge?.sendSection(I(OE), t), OA.gridOn && oE.bridge?.sendShowGrid(!0));
}
function nO(e, t) {
	let n = ME.data.sections.find((e) => e.id === I(OD));
	n?.grid && (DO.pushHistory("grid:section"), n.grid = {
		...n.grid,
		[e]: t
	}, A(kD, { ...n.grid }, !0), ME.save(), DO.updateDirty(), oE.bridge?.sendSection(I(OE), n), OA.gridOn && oE.bridge?.sendShowGrid(!0));
}
var rO = null;
function iO(e) {
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
async function aO(e, { keepHistory: t = !1 } = {}) {
	A(OE, e, !0), rO = (async () => {
		let n = PE(), r = null;
		try {
			let e = await fetch(`/${n.file}`);
			e.ok && (r = nc(await e.json(), Q.siteStore.data));
		} catch {}
		r ? NE.delete(e) : r = iO(n), ME = KS(`urd-draft-${e}`, () => r, OA.draftSaveError), (ME.data.schemaVersion ?? 1) > 7 && (console.warn(`Urd: the draft for '${e}' has schemaVersion ${ME.data.schemaVersion} (the engine has 7) and is discarded`), ME.replace(structuredClone(r))), ME.replace(nc(ME.data, Q.siteStore.data)), ME.save(), t || (DO.lastHistoryKey = null), A(OD, null), A(kD, null), DO.updateDirty(), Q.readSeoDraft(), OA.updateAttention(), OA.status = "";
	})(), await rO;
}
async function oO(e) {
	let t = localStorage.getItem(`urd-draft-${e.id}`);
	if (t) try {
		return JSON.parse(t);
	} catch {}
	try {
		let t = await fetch(`/${e.file}`);
		if (t.ok) return nc(await t.json(), Q.siteStore.data);
	} catch {}
	return iO(e);
}
async function sO(e, t) {
	let n = await oO(e);
	t(n), OA.writeDraftKey(`urd-draft-${e.id}`, JSON.stringify(n)), DO.updateDirty();
}
async function cO(e) {
	let t = [...e.target.files ?? []];
	if (e.target.value = "", !t.length) return;
	OA.setStatus(K("status.compressingImages"));
	let { images: n, failed: r, big: i } = await LA.compressMany(t);
	n.length && WE("gallery-add", (e) => {
		e.props.images.push(...n);
	}), LA.reportUpload(n.length, r, i);
}
function lO(e, t) {
	WE("gallery-move", (n) => {
		let r = e + t;
		r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
	});
}
function uO(e) {
	WE("gallery-remove", (t) => {
		t.props.images.splice(e, 1);
	});
}
function dO(e, t, n) {
	WE(`edit:${I(FE).blockId}:img${e}-${t}`, (r) => {
		r.props.images[e][t] = n;
	});
}
function fO() {
	hD = null;
}
function pO() {
	Nn(() => {
		if (I(zE)) return BE(), window.addEventListener("resize", BE), () => window.removeEventListener("resize", BE);
	}), Nn(() => {
		I(VE)?.mode === "set" && I(FE)?.type !== "calendar" && A(VE, null);
	}), Nn(() => {
		let e = I(FE)?.blockId ?? null;
		e !== HE && (HE = e, mh.menuQuery = "", mh.propsQuery = "");
	}), Nn(() => {
		I(zE) || (mh.menuQuery = "");
	}), Nn(() => {
		I(OD), I(jD), requestAnimationFrame(() => requestAnimationFrame(RD));
	}), Nn(() => {
		let e = oE.iframeEl;
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(() => RD());
		return t.observe(e), () => t.disconnect();
	});
}
var $ = {
	get sections() {
		return ME?.data.sections ?? [];
	},
	get pageId() {
		return I(OE);
	},
	set pageId(e) {
		A(OE, e, !0);
	},
	handleApplyLayout: kE,
	hasMobileOverrides: AE,
	markDesktopChange: jE,
	get store() {
		return ME;
	},
	set store(e) {
		ME = e;
	},
	pendingPublished: NE,
	pageEntry: PE,
	get selectedBlock() {
		return I(FE);
	},
	set selectedBlock(e) {
		A(FE, e, !0);
	},
	readBlock: IE,
	syncSelectedBlock: LE,
	onSelectBlock: RE,
	get blockMenu() {
		return I(zE);
	},
	set blockMenu(e) {
		A(zE, e, !0);
	},
	measureMenuRoom: BE,
	get designPicker() {
		return I(VE);
	},
	set designPicker(e) {
		A(VE, e, !0);
	},
	get searchBlockId() {
		return HE;
	},
	set searchBlockId(e) {
		HE = e;
	},
	onBlockMenu: UE,
	mutateBlock: WE,
	setBlockProp: GE,
	setBlockProps: KE,
	groupReset: qE,
	groupChanged: JE,
	onOff: YE,
	RIBBON_REACH: XE,
	ribbonReach: ZE,
	RIBBON_MOTIONS: QE,
	buttonTargets: $E,
	setButtonTarget: eD,
	openImageEditor: tD,
	fitTimers: nD,
	fitSeq: rD,
	get fitCount() {
		return iD;
	},
	set fitCount(e) {
		iD = e;
	},
	fitBlockSoon: aD,
	phoneSeq: oD,
	get phoneFit() {
		return sD;
	},
	set phoneFit(e) {
		sD = e;
	},
	get phonePlugins() {
		return cD;
	},
	set phonePlugins(e) {
		cD = e;
	},
	phoneFitSoon: lD,
	applyPhoneHeight: uD,
	dropFits: dD,
	setCalendarDesign: fD,
	setBlockFit: pD,
	setBlockFitMin: mD,
	get sizeGesture() {
		return hD;
	},
	set sizeGesture(e) {
		hD = e;
	},
	setBlockSize: gD,
	setBlockSizeBound: _D,
	setBlockHeightMode: vD,
	setBlockHeightAlign: yD,
	canStretch: bD,
	setBlockFrame: xD,
	designWidth: SD,
	shapePx: CD,
	setShapeSizePx: wD,
	setBoxStyle: TD,
	setBlockDecor: ED,
	setBlockHideMobile: DD,
	get activeSectionId() {
		return I(OD);
	},
	set activeSectionId(e) {
		A(OD, e, !0);
	},
	get sectionGrid() {
		return I(kD);
	},
	set sectionGrid(e) {
		A(kD, e, !0);
	},
	get sectionMinHeight() {
		return I(AD);
	},
	set sectionMinHeight(e) {
		A(AD, e, !0);
	},
	get sectionBg() {
		return I(jD);
	},
	set sectionBg(e) {
		A(jD, e, !0);
	},
	get sectionAnim() {
		return I(MD);
	},
	set sectionAnim(e) {
		A(MD, e, !0);
	},
	get sectionHover() {
		return I(ND);
	},
	set sectionHover(e) {
		A(ND, e, !0);
	},
	get sectionTheme() {
		return I(PD);
	},
	set sectionTheme(e) {
		A(PD, e, !0);
	},
	get sectionDivider() {
		return I(FD);
	},
	set sectionDivider(e) {
		A(FD, e, !0);
	},
	syncSectionMirrors: ID,
	get secBox() {
		return I(LD);
	},
	set secBox(e) {
		A(LD, e, !0);
	},
	measureSecBox: RD,
	onSelectSection: zD,
	mutateSection: BD,
	setBlockVideoFile: VD,
	setBlockVideoPoster: HD,
	get sectionBgCtx() {
		return I(UD);
	},
	animObj: WD,
	isEntrance: GD,
	get ENTRANCE_OPTIONS() {
		return I(KD);
	},
	get BLOCK_ENTRANCE_OPTIONS() {
		return I(qD);
	},
	get HOVER_OPTIONS() {
		return I(JD);
	},
	normalizeAnim: YD,
	setBlockAnimation: XD,
	setBlockHover: ZD,
	setBlockAnimProp: QD,
	setSectionHeight: $D,
	targetSection: eO,
	toggleSectionGrid: tO,
	setSectionGrid: nO,
	get pageLoading() {
		return rO;
	},
	set pageLoading(e) {
		rO = e;
	},
	blankPage: iO,
	selectPage: aO,
	readPageDraft: oO,
	patchPageDraft: sO,
	addGalleryImages: cO,
	moveGalleryImage: lO,
	removeGalleryImage: uO,
	setGalleryImageField: dO,
	endSizeGesture: fO,
	effects: pO
}, mO = /* @__PURE__ */ k(!1);
function hO() {
	let e = Q.siteDraft?.pages?.some((e) => !$.pendingPublished.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = YO.collectionsIndexStore?.hasDraft() || Object.values(YO.collectionStores).some((e) => e.hasDraft()), n = zC.templatesIndexStore?.hasDraft() || Object.values(zC.templateStores).some((e) => e.hasDraft());
	A(mO, e || $.store?.hasDraft() && !$.pendingPublished.has($.pageId) || Q.siteStore?.hasDraft() || DE.pluginsStore?.hasDraft() || t || n || !1, !0);
}
var gO = [], _O = [], vO = null;
function yO() {
	return JSON.stringify({
		pageId: $.pageId,
		page: $.store.data,
		site: Q.siteStore.data,
		collectionsIndex: YO.collectionsReady ? YO.collectionsIndexStore.data : null,
		collections: YO.collectionsReady ? Object.fromEntries(Object.entries(YO.collectionStores).map(([e, t]) => [e, t.data])) : {},
		templatesIndex: zC.templatesReady ? zC.templatesIndexStore.data : null,
		templates: zC.templatesReady ? Object.fromEntries(Object.entries(zC.templateStores).map(([e, t]) => [e, t.data])) : {},
		plugins: DE.pluginsStore?.data ?? null
	});
}
function bO(e) {
	(e !== vO || !e.startsWith("edit:") && !e.startsWith("grid:")) && (gO.push(yO()), gO.length > 50 && gO.shift(), _O.length = 0, vO = e);
}
function xO(e) {
	let { pageId: t, page: n, site: r, collectionsIndex: i, collections: a, templatesIndex: o, templates: s, plugins: c } = JSON.parse(e);
	Q.siteStore.replace(r), Q.linkSiteDraft(), Q.siteStore.save(), Q.grid = {
		snap: !0,
		...Q.siteDraft.grid
	}, Q.pushSiteToPreview(), SO(i, a ?? {}), CO(o, s ?? {}), wO(c), t && t !== $.pageId && Q.siteDraft.pages.some((e) => e.id === t) ? (OA.writeDraftKey(`urd-draft-${t}`, JSON.stringify(n)), $.selectPage(t, { keepHistory: !0 }), hO()) : ($.store.replace(n), $.store.save(), hO(), OA.updateAttention(), $.syncSelectedBlock(), $.syncSectionMirrors($.store.data.sections.find((e) => e.id === $.activeSectionId)), Q.siteDraft.pages.some((e) => e.id === $.pageId) ? oE.bridge?.sendPage($.pageId, $.store.data) : $.selectPage(Q.siteDraft.pages[0].id, { keepHistory: !0 }));
}
function SO(e, t) {
	if (YO.collectionsIndexStore && e && JSON.stringify({
		index: YO.collectionsIndexStore.data,
		collections: Object.fromEntries(Object.entries(YO.collectionStores).map(([e, t]) => [e, t.data]))
	}) !== JSON.stringify({
		index: e,
		collections: t
	})) {
		YO.collectionsIndexStore.replace(e), YO.collectionsIndexStore.save();
		for (let e of Object.keys(YO.collectionStores)) e in t || (localStorage.removeItem(`urd-draft-collection-${e}`), localStorage.removeItem(`urd-draft-samling-${e}`), delete YO.collectionStores[e]);
		for (let [e, n] of Object.entries(t)) {
			if (!YO.collectionStores[e]) {
				let t = YO.publishedCollections[e] ?? null;
				YO.collectionStores[e] = KS(`urd-draft-collection-${e}`, () => t, OA.draftSaveError, `urd-draft-samling-${e}`);
			}
			YO.collectionStores[e].replace(n), YO.collectionStores[e].save();
		}
		YO.collectionIds = [...e.samlinger ?? []], YO.activeCollection && !YO.collectionIds.includes(YO.activeCollection) && (YO.activeCollection = null), YO.syncCollectionsView();
	}
}
function CO(e, t) {
	if (zC.templatesIndexStore && e && JSON.stringify({
		index: zC.templatesIndexStore.data,
		templates: Object.fromEntries(Object.entries(zC.templateStores).map(([e, t]) => [e, t.data]))
	}) !== JSON.stringify({
		index: e,
		templates: t
	})) {
		zC.templatesIndexStore.replace(e), zC.templatesIndexStore.save();
		for (let e of Object.keys(zC.templateStores)) e in t || (localStorage.removeItem(`urd-draft-template-${e}`), localStorage.removeItem(`urd-draft-mal-${e}`), delete zC.templateStores[e]);
		for (let [e, n] of Object.entries(t)) zC.templateStores[e] || (zC.templateStores[e] = KS(`urd-draft-template-${e}`, () => zC.publishedTemplates[e] ?? null, OA.draftSaveError, `urd-draft-mal-${e}`)), zC.templateStores[e].replace(n), zC.templateStores[e].save();
		zC.templateIds = [...e.maler ?? []], hO(), zC.pushTemplatesToPreview();
	}
}
function wO(e) {
	DE.pluginsStore && e && JSON.stringify(DE.pluginsStore.data) !== JSON.stringify(e) && (DE.pluginsStore.replace(e), DE.pluginsStore.save(), DE.syncPluginsView(), oE.reloadPreview());
}
function TO() {
	gO.length && ($.dropFits(), _O.push(yO()), xO(gO.pop()), vO = null, OA.setStatus(K("status.undone")));
}
function EO() {
	_O.length && ($.dropFits(), gO.push(yO()), xO(_O.pop()), vO = null, OA.setStatus(K("status.redone")));
}
var DO = {
	get dirty() {
		return I(mO);
	},
	set dirty(e) {
		A(mO, e, !0);
	},
	updateDirty: hO,
	history: gO,
	redoStack: _O,
	get lastHistoryKey() {
		return vO;
	},
	set lastHistoryKey(e) {
		vO = e;
	},
	snapshot: yO,
	pushHistory: bO,
	restore: xO,
	restoreCollections: SO,
	restoreTemplates: CO,
	restorePlugins: wO,
	undo: TO,
	redo: EO
}, OO = null, kO = {}, AO = {}, jO = !1, MO = /* @__PURE__ */ k(pn([])), NO = /* @__PURE__ */ k(pn({})), PO = /* @__PURE__ */ k(null), FO = /* @__PURE__ */ k(""), IO = /* @__PURE__ */ k("news");
async function LO() {
	let e = {
		version: 1,
		samlinger: []
	};
	try {
		e = await (await fetch("/content/collections.json")).json();
	} catch {}
	OO = KS("urd-draft-collections", () => e, OA.draftSaveError, "urd-draft-samlinger"), A(MO, [...OO.data.samlinger ?? []], !0);
	for (let e of I(MO)) {
		let t = null;
		try {
			t = await (await fetch(`/content/samlinger/${e}.json`)).json();
		} catch {}
		AO[e] = t, kO[e] = KS(`urd-draft-collection-${e}`, () => t, OA.draftSaveError, `urd-draft-samling-${e}`), !t && !kO[e].data && (kO[e].replace({
			schemaVersion: 1,
			id: e,
			name: e,
			kind: "custom",
			entries: []
		}), kO[e].save());
	}
	jO = !0, RO();
}
function RO(e = !0) {
	let t = {};
	for (let e of I(MO)) kO[e] && (t[e] = JSON.parse(JSON.stringify(kO[e].data)));
	A(NO, t, !0), e && zO();
}
function zO() {
	oE.bridge?.sendCollections(Xe(I(NO)) ?? {});
}
function BO(e, t, n, r = !0) {
	let i = kO[e];
	i && (DO.pushHistory(t), n(i.data), i.save(), DO.updateDirty(), RO(r));
}
function VO(e) {
	kO[e.collection] && JO(e.collection);
}
function HO(e) {
	return (new DOMParser().parseFromString(String(e ?? ""), "text/html").body.textContent ?? "").trim();
}
function UO(e) {
	let { collection: t, entryId: n, field: r, value: i } = e;
	[
		"title",
		"text",
		"image",
		"imageAlt",
		"imageStyle"
	].includes(r) && (r !== "title" || HO(i)) && BO(t, `edit:collection:${t}:${n}:${r}`, (e) => {
		let t = e.entries.find((e) => e.id === n);
		t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
	}, r === "image");
}
function WO(e, t, n) {
	let r = {
		schemaVersion: 1,
		id: e,
		name: t,
		kind: n,
		entries: []
	};
	kO[e] = KS(`urd-draft-collection-${e}`, () => null, OA.draftSaveError, `urd-draft-samling-${e}`), kO[e].replace(r), kO[e].save(), OO.data.samlinger = [...I(MO), e], OO.save(), A(MO, [...I(MO), e], !0), A(PO, e, !0), DO.updateDirty(), RO();
}
function GO() {
	let e = I(FO).trim();
	if (!e) return;
	let t = im(e);
	!t || I(MO).includes(t) ? OA.setStatus(K(t ? "status.collectionExists" : "status.invalidName"), "error") : (DO.pushHistory("collections"), WO(t, e, I(IO)), A(FO, ""));
}
function KO() {
	let e = K("seed.productCatalogName"), t = im(e) || "collection", n = t;
	for (let e = 2; I(MO).includes(n); e += 1) n = `${t}-${e}`;
	DO.pushHistory("collections"), WO(n, e, "products"), $.mutateBlock(null, (e) => {
		e.props.collection = n;
	});
}
function qO(e) {
	DO.pushHistory("collections"), localStorage.removeItem(`urd-draft-collection-${e}`), localStorage.removeItem(`urd-draft-samling-${e}`), delete kO[e], OO.data.samlinger = I(MO).filter((t) => t !== e), OO.save(), A(MO, I(MO).filter((t) => t !== e), !0), I(PO) === e && A(PO, null), DO.updateDirty(), RO();
}
function JO(e) {
	BO(e, `collection:${e}:add-entry`, (e) => {
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
var YO = {
	get collectionsIndexStore() {
		return OO;
	},
	set collectionsIndexStore(e) {
		OO = e;
	},
	get collectionStores() {
		return kO;
	},
	set collectionStores(e) {
		kO = e;
	},
	get publishedCollections() {
		return AO;
	},
	set publishedCollections(e) {
		AO = e;
	},
	get collectionsReady() {
		return jO;
	},
	set collectionsReady(e) {
		jO = e;
	},
	get collectionIds() {
		return I(MO);
	},
	set collectionIds(e) {
		A(MO, e, !0);
	},
	get collectionsView() {
		return I(NO);
	},
	set collectionsView(e) {
		A(NO, e, !0);
	},
	get activeCollection() {
		return I(PO);
	},
	set activeCollection(e) {
		A(PO, e, !0);
	},
	get newCollectionName() {
		return I(FO);
	},
	set newCollectionName(e) {
		A(FO, e, !0);
	},
	get newCollectionKind() {
		return I(IO);
	},
	set newCollectionKind(e) {
		A(IO, e, !0);
	},
	initCollections: LO,
	syncCollectionsView: RO,
	pushCollectionsToPreview: zO,
	mutateCollection: BO,
	handleCollectionAdd: VO,
	plainTitle: HO,
	handleCollectionEdit: UO,
	insertCollection: WO,
	addCollection: GO,
	createCatalogForBlock: KO,
	removeCollection: qO,
	addCollectionEntry: JO
};
//#endregion
//#region src/lib/deploy-wait.js
function XO(e, { max: t = 8 } = {}) {
	let n = (e ?? []).filter((e) => e && typeof e.path == "string" && typeof e.content == "string" && e.encoding === "utf-8" && !e.delete && (e.path.startsWith("content/") || e.path === "plugins/plugins.json"));
	return n.sort((e, t) => (e.path === "content/site.json" ? -1 : 0) - (t.path === "content/site.json" ? -1 : 0)), n.slice(0, t).map(({ path: e, content: t }) => ({
		path: e,
		content: t
	}));
}
async function ZO(e, { fetchFn: t = fetch, delayMs: n = 1e4, attempts: r = 18, sleep: i = (e) => new Promise((t) => setTimeout(t, e)) } = {}) {
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
var QO = null;
async function $O() {
	try {
		let e = await fetch("/api/github/latest");
		e.ok && (QO = (await e.json()).head ?? null);
	} catch {}
}
async function ek(e) {
	if (!QO) return await $O(), {
		ok: await OA.askConfirm({
			title: K("confirm.conflictUnknown.title"),
			lines: [K("confirm.conflictUnknown.body"), K("confirm.conflictUnknown.warning")],
			okLabel: K("confirm.publishAnyway"),
			cancelLabel: K("confirm.cancel")
		}),
		head: QO
	};
	let t = null;
	try {
		let e = await fetch(`/api/github/latest?base=${QO}`);
		e.ok && (t = await e.json().catch(() => null));
	} catch {}
	if (!t?.head) return {
		ok: !0,
		head: null
	};
	let n = t.head;
	if (n === QO) return {
		ok: !0,
		head: n
	};
	let r = new Set(e.map((e) => e.path)), i = t.truncated ? [K("confirm.conflict.truncated")] : (t.changedFiles ?? []).filter((e) => r.has(e));
	return i.length === 0 ? {
		ok: !0,
		head: n
	} : {
		ok: await OA.askConfirm({
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
var tk = /* @__PURE__ */ k(null), nk = /* @__PURE__ */ k("");
async function rk() {
	A(nk, "");
	try {
		let e = await fetch("/api/github/history");
		e.ok ? A(tk, (await e.json()).commits, !0) : e.status === 401 ? (A(tk, [], !0), A(nk, K("status.historyLoginRequired"), !0)) : (A(tk, [], !0), A(nk, ba(await e.json().catch(() => null)) ?? K("status.historyFetchFailed"), !0));
	} catch {
		A(tk, [], !0), A(nk, K("status.historyUnavailable"), !0);
	}
}
var ik = !1, ak = 0;
async function ok(e) {
	let t = ++ak, n = OA.statusSeq, r = await ZO(XO(e));
	t === ak && n === OA.statusSeq && (r ? OA.setStatus(K("status.publishLive"), "ok") : OA.setStatus(K("status.publishDeployTimeout"), "error"));
}
var sk = /* @__PURE__ */ k(null), ck = /* @__PURE__ */ k(null), lk = /* @__PURE__ */ k(!1), uk = /* @__PURE__ */ k(pn(/* @__PURE__ */ new Set()));
async function dk() {
	A(lk, !0), A(ck, null), A(sk, null);
	try {
		let e = await fetch("/api/github/update"), t = await e.json().catch(() => null);
		e.ok ? (A(sk, t, !0), A(uk, /* @__PURE__ */ new Set(), !0)) : A(ck, ba(t) ?? K("update.checkFailed"), !0);
	} catch {
		A(ck, K("status.publishLayerUnreachable"), !0);
	}
	A(lk, !1);
}
var fk = {
	get baseSha() {
		return QO;
	},
	set baseSha(e) {
		QO = e;
	},
	refreshBaseSha: $O,
	confirmNoConflict: ek,
	get historyList() {
		return I(tk);
	},
	set historyList(e) {
		A(tk, e, !0);
	},
	get historyError() {
		return I(nk);
	},
	set historyError(e) {
		A(nk, e, !0);
	},
	loadHistory: rk,
	get revertedSinceLoad() {
		return ik;
	},
	set revertedSinceLoad(e) {
		ik = e;
	},
	get publishWave() {
		return ak;
	},
	set publishWave(e) {
		ak = e;
	},
	awaitPublishDeploy: ok,
	get updateInfo() {
		return I(sk);
	},
	set updateInfo(e) {
		A(sk, e, !0);
	},
	get updateError() {
		return I(ck);
	},
	set updateError(e) {
		A(ck, e, !0);
	},
	get updateBusy() {
		return I(lk);
	},
	set updateBusy(e) {
		A(lk, e, !0);
	},
	get updateSkip() {
		return I(uk);
	},
	set updateSkip(e) {
		A(uk, e, !0);
	},
	loadUpdateCheck: dk
}, pk = /* @__PURE__ */ O(() => [
	["purple", K("adminTheme.purple")],
	["well", K("adminTheme.well")],
	["gold", K("adminTheme.gold")],
	["grey", K("adminTheme.grey")],
	["aurora", K("adminTheme.aurora")],
	["dusk", K("adminTheme.dusk")],
	["ember", K("adminTheme.ember")]
]), mk = {
	lilla: "purple",
	bronn: "well",
	gull: "gold",
	graa: "grey",
	nordlys: "aurora",
	skumring: "dusk",
	glo: "ember"
}, hk = /* @__PURE__ */ k(pn((() => {
	let e = localStorage.getItem("urd-admin-theme");
	return mk[e] ?? e ?? "grey";
})()));
function gk() {
	let e = getComputedStyle(document.documentElement), t = e.getPropertyValue("--urd-color-accent").trim();
	oE.bridge?.sendAdminTheme({
		bg: e.getPropertyValue("--urd-color-bg").trim(),
		surface: e.getPropertyValue("--urd-color-surface").trim(),
		accent: t,
		text: e.getPropertyValue("--urd-color-text").trim(),
		"accent-text": _k(t)
	});
}
function _k(e) {
	return hc(e) == null || (gc(e, "#ffffff") ?? 0) >= (gc(e, "#0b0e14") ?? 0) ? "#ffffff" : "#0b0e14";
}
var vk = /* @__PURE__ */ k(""), yk = /* @__PURE__ */ k("info"), bk = 0;
function xk(e, t = "info") {
	A(vk, e, !0), A(yk, t, !0);
	let n = ++bk;
	t === "ok" && setTimeout(() => {
		bk === n && (A(vk, ""), A(yk, "info"));
	}, 8e3);
}
function Sk() {
	xk(K("status.storageFull"), "error");
}
function Ck(e, t) {
	try {
		localStorage.setItem(e, t);
	} catch {
		Sk();
	}
}
var wk = /* @__PURE__ */ k(null), Tk = /* @__PURE__ */ k(0);
function Ek() {
	A(Tk, $.store?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
}
function Dk() {
	let e = $.store?.data.sections.find((e) => e.responsive?.mobile?.attention?.needed);
	oE.deviceId = "mobile", e && setTimeout(() => oE.bridge?.sendScrollSection(e.id), 0);
}
function Ok(e) {
	$.blockMenu && (e.target instanceof Element && e.target.closest(".block-menu") || ($.blockMenu = null));
}
function kk(e) {
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
		].includes(t.type)) || !$.selectedBlock || oE.viewMode === "mobile") return;
		e.preventDefault(), oE.bridge?.sendDuplicate();
		return;
	}
	if (t !== "z" && t !== "y") return;
	let n = e.target;
	n instanceof HTMLElement && (n.isContentEditable || n.tagName === "TEXTAREA" || n.tagName === "INPUT" && ![
		"number",
		"checkbox",
		"range",
		"color"
	].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? DO.redo() : DO.undo());
}
async function Ak() {
	Q.site = tc(await (await fetch("/content/site.json")).json()), Q.siteStore = KS("urd-draft-site", () => Q.site, Sk), (Q.siteStore.data.schemaVersion ?? 1) > 4 && (console.warn(`Urd: the site draft has schemaVersion ${Q.siteStore.data.schemaVersion} (the engine has 4) and is discarded`), Q.siteStore.replace(Xe(Q.site))), Q.siteStore.replace(tc(Q.siteStore.data)), Q.siteStore.save(), Q.linkSiteDraft(), Q.grid = {
		snap: !0,
		...Q.siteDraft.grid
	}, await $.selectPage(new URLSearchParams(location.search).get("page") ?? Q.siteDraft.pages[0].id), await DE.initPlugins(), await YO.initCollections(), await zC.initTemplates(), await sA(), I(wk) && fk.refreshBaseSha(), aA(), Q.siteDraft.site.setup === !0 && !localStorage.getItem("urd-setup-done") && (A(Lk, Q.siteDraft.site.title, !0), A(Rk, Q.siteDraft.theme.tokens.color.accent, !0), A(zk, Q.siteDraft.theme.tokens.color.bg, !0), A(Ik, !0));
}
var jk = /* @__PURE__ */ k(null);
function Mk({ title: e, lines: t = [], okLabel: n = K("confirm.ok"), cancelLabel: r = K("confirm.cancel") }) {
	return new Promise((i) => {
		A(jk, {
			title: e,
			lines: t,
			okLabel: n,
			cancelLabel: r,
			resolve: i
		}, !0);
	});
}
function Nk({ title: e, lines: t = [], value: n = "", placeholder: r = "", okLabel: i = K("confirm.ok"), cancelLabel: a = K("confirm.cancel") }) {
	return new Promise((o) => {
		A(jk, {
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
function Pk(e) {
	I(jk)?.resolve(I(jk).prompt ? e ? I(jk).value : null : e), A(jk, null);
}
var Fk = !1, Ik = /* @__PURE__ */ k(!1), Lk = /* @__PURE__ */ k(""), Rk = /* @__PURE__ */ k("#7c5cff"), zk = /* @__PURE__ */ k("#0b0e14");
function Bk() {
	localStorage.setItem("urd-setup-done", "1"), A(Ik, !1);
}
function Vk() {
	let e = I(Lk).trim();
	e && (Q.siteMutate("setup", () => {
		Q.siteDraft.site.title = e, Q.siteDraft.nav.logo = {
			type: "text",
			value: e
		}, Q.siteDraft.theme.tokens.color.accent = I(Rk), Q.siteDraft.theme.tokens.color.bg = I(zk), delete Q.siteDraft.site.setup;
	}), Bk(), xk(K("status.setupDone"), "ok"));
}
var Hk = "urd-admin-panels", Uk = "urd-admin-panel-open", Wk = /* @__PURE__ */ k(pn(localStorage.getItem(Hk) === "reset" ? "reset" : "remember"));
function Gk(e) {
	A(Wk, e === "reset" ? "reset" : "remember", !0), I(Wk) === "reset" ? localStorage.setItem(Hk, "reset") : localStorage.removeItem(Hk);
}
var Kk = /* @__PURE__ */ k(pn(I(Wk) === "reset" ? null : localStorage.getItem(Uk))), qk = [
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
], Jk = [
	"rail.thisPage",
	"rail.site",
	"rail.system"
], Yk = /* @__PURE__ */ O(() => Object.fromEntries(qk.flat().map((e) => [e, K(`panel.${e}`)])));
I(Kk) && !qk.flat().includes(I(Kk)) && A(Kk, null);
var Xk = {
	pages: ["hint.pages.drafts"],
	blocks: ["hint.blocks.intro"],
	grid: ["hint.grid.intro", "hint.grid.section"],
	collections: ["hint.collections.intro"],
	plugins: ["hint.plugins.intro"],
	history: ["hint.history.intro"]
}, Zk = [
	["se", "Davvisámegiella"],
	["en-GB", "English (UK)"],
	["nb", "Norsk bokmål"],
	["nn", "Norsk nynorsk"],
	["tr", "Türkçe"]
], Qk = (e) => [...e].sort((e, t) => e[1].localeCompare(t[1]));
function $k(e, t) {
	let n = [];
	for (let r of e) for (let e of DE.pluginInfo[r]?.languages ?? []) e?.[t] === !0 && typeof e.code == "string" && typeof e.name == "string" && e.name && (Zk.some(([t]) => t === e.code) || n.some(([t]) => t === e.code) || n.push([e.code, e.name]));
	return n;
}
function eA() {
	let e = Qk([...Zk, ...$k(DE.publishedPluginIds, "admin")]);
	return nA === "auto" || e.some(([e]) => e === nA) ? e : [[nA, nA], ...e];
}
var tA = () => $k(DE.pluginsView?.enabled ?? [], "site"), nA = localStorage.getItem("urd-admin-lang") ?? "auto";
function rA(e) {
	e !== nA && (e === "auto" ? localStorage.removeItem("urd-admin-lang") : localStorage.setItem("urd-admin-lang", e), location.reload());
}
function iA(e) {
	A(Kk, I(Kk) === e ? null : e, !0), aA();
}
function aA() {
	I(Kk) === "history" && fk.loadHistory(), I(Kk) === "update" && !fk.updateBusy && fk.loadUpdateCheck();
}
var oA = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
async function sA() {
	try {
		let e = await fetch("/api/github/me");
		e.ok ? A(wk, await e.json(), !0) : e.status !== 503 && A(wk, null);
	} catch {
		A(wk, null);
	}
}
var cA = /* @__PURE__ */ k(localStorage.getItem("urd-guides") === "1"), lA = /* @__PURE__ */ k(!1), uA = /* @__PURE__ */ k(pn(localStorage.getItem("urd-layout-picker") === "menu" ? "menu" : "strip"));
function dA(e) {
	A(uA, e === "menu" ? "menu" : "strip", !0), I(uA) === "menu" ? localStorage.setItem("urd-layout-picker", "menu") : localStorage.removeItem("urd-layout-picker");
}
var fA = /* @__PURE__ */ k(null), pA = {
	view: 1079,
	device: 999,
	zoom: 919
}, mA = /* @__PURE__ */ k(null), hA = /* @__PURE__ */ k(null), gA = /* @__PURE__ */ k(pn({
	view: !1,
	device: !1,
	zoom: !1
}));
function _A() {
	A(cA, !I(cA)), localStorage.setItem("urd-guides", I(cA) ? "1" : "0"), oE.bridge?.sendShowGuides(I(cA));
}
var vA = /* @__PURE__ */ k(localStorage.getItem("urd-grid-overlay") === "1");
function yA() {
	A(vA, !I(vA)), localStorage.setItem("urd-grid-overlay", I(vA) ? "1" : "0"), oE.bridge?.sendShowGrid(I(vA));
}
var bA = /* @__PURE__ */ k(null), xA = /* @__PURE__ */ k(!1), SA = /* @__PURE__ */ k(!1), CA = (e) => e.length > 0 && [...e].every((e) => e.open);
function wA() {
	let e = I(bA)?.querySelectorAll("details.group") ?? [];
	A(xA, e.length > 0), A(SA, CA(e), !0);
}
function TA() {
	let e = !I(SA);
	I(bA)?.querySelectorAll("details.group").forEach((t) => {
		t.open = e;
	}), wA();
}
function EA(e) {
	for (let t of e.querySelectorAll("details.group")) {
		let e = t.querySelector(":scope > summary");
		if (!e || e.querySelector(".fold-sub")) continue;
		let n = () => t.querySelectorAll(":scope > .group-items details.group");
		if (!n().length) continue;
		let r = document.createElement("button");
		r.type = "button", r.className = "fold-sub fold-toggle", r.innerHTML = q.foldToggle;
		let i = () => {
			let e = CA(n());
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
function DA() {
	Nn(() => {
		document.documentElement.dataset.adminTheme = I(hk), localStorage.setItem("urd-admin-theme", I(hk)), gk();
	}), Nn(() => {
		if (!I(jk)) return;
		let e = (e) => {
			e.key === "Escape" && (e.stopPropagation(), Pk(!1));
		};
		return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
	}), Nn(() => {
		I(Wk) === "reset" ? localStorage.removeItem(Uk) : I(Kk) ? localStorage.setItem(Uk, I(Kk)) : localStorage.removeItem(Uk);
	}), Nn(() => {
		if (!I(lA)) return;
		let e = (e) => {
			I(fA)?.contains(e.target) || A(lA, !1);
		}, t = (e) => {
			e.key === "Escape" && A(lA, !1);
		}, n = () => {
			A(lA, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	}), Nn(() => {
		let e = Object.entries(pA).map(([e, t]) => {
			let n = window.matchMedia(`(max-width: ${t}px)`), r = () => {
				I(gA)[e] = n.matches;
			};
			return r(), n.addEventListener("change", r), () => n.removeEventListener("change", r);
		});
		return () => e.forEach((e) => e());
	}), Nn(() => {
		I(mA) && !I(gA)[I(mA)] && A(mA, null);
	}), Nn(() => {
		if (!I(mA)) return;
		let e = (e) => {
			I(hA)?.contains(e.target) || A(mA, null);
		}, t = (e) => {
			e.key === "Escape" && A(mA, null);
		}, n = () => {
			A(mA, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	}), Nn(() => {
		I(Kk), Er().then(wA);
	}), Nn(() => {
		let e = I(bA);
		if (!e) return;
		let t = new MutationObserver(() => {
			EA(e), wA();
		});
		return t.observe(e, {
			childList: !0,
			subtree: !0
		}), e.addEventListener("toggle", wA, !0), EA(e), () => {
			t.disconnect(), e.removeEventListener("toggle", wA, !0);
		};
	});
}
var OA = {
	get ADMIN_THEMES() {
		return I(pk);
	},
	LEGACY_ADMIN_THEMES: mk,
	get adminTheme() {
		return I(hk);
	},
	set adminTheme(e) {
		A(hk, e, !0);
	},
	sendAdminTheme: gk,
	readableOn: _k,
	get status() {
		return I(vk);
	},
	set status(e) {
		A(vk, e, !0);
	},
	get statusKind() {
		return I(yk);
	},
	set statusKind(e) {
		A(yk, e, !0);
	},
	get statusSeq() {
		return bk;
	},
	set statusSeq(e) {
		bk = e;
	},
	setStatus: xk,
	draftSaveError: Sk,
	writeDraftKey: Ck,
	get auth() {
		return I(wk);
	},
	set auth(e) {
		A(wk, e, !0);
	},
	get attentionCount() {
		return I(Tk);
	},
	set attentionCount(e) {
		A(Tk, e, !0);
	},
	updateAttention: Ek,
	jumpToAttention: Dk,
	onPointerdownWindow: Ok,
	onKeydown: kk,
	init: Ak,
	get confirmBox() {
		return I(jk);
	},
	set confirmBox(e) {
		A(jk, e, !0);
	},
	askConfirm: Mk,
	askPrompt: Nk,
	answerConfirm: Pk,
	get confirmDownOnOverlay() {
		return Fk;
	},
	set confirmDownOnOverlay(e) {
		Fk = e;
	},
	get showSetup() {
		return I(Ik);
	},
	set showSetup(e) {
		A(Ik, e, !0);
	},
	get setupName() {
		return I(Lk);
	},
	set setupName(e) {
		A(Lk, e, !0);
	},
	get setupAccent() {
		return I(Rk);
	},
	set setupAccent(e) {
		A(Rk, e, !0);
	},
	get setupBg() {
		return I(zk);
	},
	set setupBg(e) {
		A(zk, e, !0);
	},
	closeSetup: Bk,
	applySetup: Vk,
	PANELS_PREF_KEY: Hk,
	PANEL_OPEN_KEY: Uk,
	get panelsPref() {
		return I(Wk);
	},
	set panelsPref(e) {
		A(Wk, e, !0);
	},
	setPanelsPref: Gk,
	get activePanel() {
		return I(Kk);
	},
	set activePanel(e) {
		A(Kk, e, !0);
	},
	PANEL_GROUPS: qk,
	PANEL_GROUP_KEYS: Jk,
	get PANEL_LABELS() {
		return I(Yk);
	},
	PANEL_INTROS: Xk,
	LANG_OPTIONS: Zk,
	sortLangs: Qk,
	packLangOptions: $k,
	adminLangOptions: eA,
	sitePackLangs: tA,
	adminLangChoice: nA,
	setAdminLang: rA,
	togglePanel: iA,
	loadPanelData: aA,
	reducedMotion: oA,
	checkAuth: sA,
	get guidesOn() {
		return I(cA);
	},
	set guidesOn(e) {
		A(cA, e, !0);
	},
	get settingsOpen() {
		return I(lA);
	},
	set settingsOpen(e) {
		A(lA, e, !0);
	},
	get layoutPickerPref() {
		return I(uA);
	},
	set layoutPickerPref(e) {
		A(uA, e, !0);
	},
	setLayoutPicker: dA,
	get settingsEl() {
		return I(fA);
	},
	set settingsEl(e) {
		A(fA, e, !0);
	},
	FOLD_MQ: pA,
	get toolMenu() {
		return I(mA);
	},
	set toolMenu(e) {
		A(mA, e, !0);
	},
	get toolMenuEl() {
		return I(hA);
	},
	set toolMenuEl(e) {
		A(hA, e, !0);
	},
	get folded() {
		return I(gA);
	},
	set folded(e) {
		A(gA, e, !0);
	},
	toggleGuides: _A,
	get gridOn() {
		return I(vA);
	},
	set gridOn(e) {
		A(vA, e, !0);
	},
	toggleGrid: yA,
	get panelEl() {
		return I(bA);
	},
	set panelEl(e) {
		A(bA, e, !0);
	},
	get panelHasGroups() {
		return I(xA);
	},
	set panelHasGroups(e) {
		A(xA, e, !0);
	},
	get panelAllOpen() {
		return I(SA);
	},
	set panelAllOpen(e) {
		A(SA, e, !0);
	},
	allOpen: CA,
	syncPanelFolds: wA,
	togglePanelGroups: TA,
	decorateSubFolds: EA,
	effects: DA
};
//#endregion
//#region src/state/media.svelte.js
async function kA(e, t) {
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
async function AA(e) {
	let t = await e.text(), n = em(t), r = nm(t);
	if (!r) return n;
	let i = await kA(n.dataUrl, r);
	if (!i) return n;
	let a = tm(t, i);
	if (a === t) return n;
	try {
		return em(a);
	} catch {
		return n;
	}
}
async function jA(e) {
	if (e.type === "image/svg+xml" || /\.svg$/i.test(e.name || "")) return AA(e);
	let t = await Zp(e);
	return t.animated && t.bytes > 1e6 && OA.setStatus(K("status.animatedLarge", { mb: (t.bytes / 1e6).toFixed(1) }), "error"), t;
}
function MA(e) {
	return e?.code === "animatedTooLarge" ? K("status.animatedTooLarge", {
		mb: (e.bytes / 1e6).toFixed(1),
		max: Math.round(Vp / 1e6)
	}) : K("status.imageReadError");
}
function NA(e, t, n) {
	if (!["video/mp4", "video/webm"].includes(e.type)) {
		OA.setStatus(K(t), "error");
		return;
	}
	if (e.size > 15e6) {
		OA.setStatus(K("status.videoTooLarge", {
			mb: (e.size / 1e6).toFixed(1),
			max: Math.round(Bp / 1e6)
		}), "error");
		return;
	}
	let r = new FileReader();
	r.onload = () => {
		n(String(r.result ?? "")), e.size > 4e6 && OA.setStatus(K("status.videoLarge", { mb: (e.size / 1e6).toFixed(1) }), "error");
	}, r.onerror = () => OA.setStatus(K("status.imageReadError"), "error"), r.readAsDataURL(e);
}
var PA = () => 1 + Math.floor(Math.random() * 1e6);
async function FA(e) {
	let t = [], n = 0, r = 0;
	for (let i of e) try {
		let e = await jA(i);
		e.bytes > 4e5 && (r += 1), t.push({
			src: e.dataUrl,
			alt: im(i.name).replaceAll("-", " "),
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
function IA(e, t, n) {
	t ? OA.setStatus(K("status.imagesReadFailed", { n: t }), "error") : n ? OA.setStatus(K("status.imagesLarge", { n }), "error") : OA.setStatus(e ? "" : K("status.noImagesAdded"));
}
var LA = {
	svgContentBBox: kA,
	svgAutoTrim: AA,
	compressOrTrim: jA,
	imageErrorText: MA,
	readVideoFile: NA,
	newSeed: PA,
	compressMany: FA,
	reportUpload: IA
};
//#endregion
//#region ../template/assets/engine/0.7.4/feeds.js
function RA(e) {
	return String(e ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&apos;");
}
function zA(e, t) {
	let n = String(t ?? "").replace(/\/+$/, "");
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${(e ?? []).filter((e) => !e.noindex).map((e) => `  <url><loc>${RA(n + (e.path === "/" ? "/" : e.path))}</loc></url>`).join("\n")}\n</urlset>\n`;
}
function BA(e) {
	return `User-agent: *\nDisallow: /admin/\n\nSitemap: ${String(e ?? "").replace(/\/+$/, "")}/sitemap.xml\n`;
}
var VA = [
	"news",
	"notices",
	"publications"
];
function HA(e) {
	let t = String(e.origin ?? "").replace(/\/+$/, ""), n = (e.items ?? []).map((n) => {
		let r = n.href ? new URL(n.href, t + "/").href : t + "/", i = n.date ? new Date(n.date) : null, a = i && !Number.isNaN(i.getTime()) ? `\n      <pubDate>${i.toUTCString()}</pubDate>` : "", o = n.text ? `\n      <description>${RA(n.text)}</description>` : "";
		return `    <item>\n      <title>${RA(n.title)}</title>\n      <link>${RA(r)}</link>\n      <guid isPermaLink="false">${RA(`${e.path}#${n.id ?? n.title}`)}</guid>${o}${a}\n    </item>`;
	}).join("\n");
	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${RA(e.title)}</title>\n    <link>${RA(t + "/")}</link>\n    <description>${RA(e.description ?? e.title)}</description>\n${n}${n ? "\n" : ""}  </channel>\n</rss>\n`;
}
//#endregion
//#region src/state/publish.svelte.js
function UA(e, t, n, r) {
	let i = e?.[t];
	if (!i?.startsWith("data:image/") && !i?.startsWith("data:audio/") && !i?.startsWith("data:video/")) return;
	let a = i.split(",", 2)[1], o = `media/${im(n || "image")}-${am(a)}.${rm(i)}`;
	r.push({
		path: o,
		content: a,
		encoding: "base64"
	}), e[t] = `/${o}`;
}
function WA(e, t) {
	UA(e, "image", e.title, t);
	for (let n of e.colors ?? []) UA(n, "image", `${e.title}-${n.name}`, t);
}
function GA(e, t) {
	for (let n of e?.layers ?? []) {
		if (n.type === "image" && UA(n.props, "src", "background", t), n.type === "slideshow") for (let e of n.props.images ?? []) UA(e, "src", "background", t);
		n.type === "video" && (UA(n.props, "src", "video", t), UA(n.props, "poster", "plakat", t));
	}
}
function KA(e, t) {
	if (e.type === "image" && UA(e.props, "src", e.props.alt, t), e.type === "icon" && UA(e.props, "image", "ikon", t), e.type === "gallery") for (let n of e.props.images ?? []) UA(n, "src", n.alt || "gallery", t);
	e.type === "audio" && UA(e.props, "src", e.props.title || "lyd", t), e.type === "video" && (UA(e.props, "src", e.props.title || "video", t), UA(e.props, "poster", "poster", t));
}
function qA(e, t) {
	GA(e.background, t);
	for (let n of e.blocks) KA(n, t);
}
function JA(e) {
	let t = [];
	e.meta?.og && UA(e.meta.og, "image", "share", t);
	for (let n of e.sections) qA(n, t);
	return t;
}
function YA(e) {
	let t = [], n = e.nav?.logo;
	if (n?.type === "image" && UA(n, "value", "logo", t), n?.type === "both" && UA(n, "image", "logo", t), e.nav?.style && UA(e.nav.style, "image", "menu", t), GA(e.nav?.style?.background, t), GA(e.footer?.background, t), e.footer?.brand && UA(e.footer.brand, "logo", "footer-logo", t), e.nav?.launcher) {
		UA(e.nav.launcher, "image", "snarvei", t);
		for (let n of e.nav.launcher.links ?? []) UA(n, "image", "snarvei", t);
	}
	return UA(e.site, "icon", "ikon", t), t;
}
var XA = /* @__PURE__ */ k(!1), ZA = /* @__PURE__ */ k(null);
function QA() {
	A(XA, !I(XA));
}
function $A() {
	A(XA, !1);
	try {
		ej(), OA.setStatus(K("ui.discarded"), "info");
	} catch (e) {
		console.error("Urd: discard failed", e), OA.setStatus(String(e?.message ?? e), "error");
	}
}
function ej() {
	DO.pushHistory("discard");
	for (let e of Q.siteDraft.pages) e.id !== $.pageId && !$.pendingPublished.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
	let e = $.store.reset();
	if (Q.siteStore.reset(), DE.pluginsStore && (DE.pluginsStore.reset(), DE.syncPluginsView()), YO.collectionsIndexStore) {
		YO.collectionsIndexStore.reset(), YO.collectionIds = [...YO.collectionsIndexStore.data.samlinger ?? []];
		for (let e of Object.keys(YO.collectionStores)) YO.collectionIds.includes(e) ? YO.collectionStores[e].reset() : delete YO.collectionStores[e];
		YO.syncCollectionsView();
	}
	if (zC.templatesIndexStore) {
		zC.templatesIndexStore.reset(), zC.templateIds = [...zC.templatesIndexStore.data.maler ?? []];
		for (let e of Object.keys(zC.templateStores)) zC.templateIds.includes(e) ? zC.templateStores[e].reset() : (localStorage.removeItem(`urd-draft-template-${e}`), localStorage.removeItem(`urd-draft-mal-${e}`), delete zC.templateStores[e]);
		zC.pushTemplatesToPreview();
	}
	Q.linkSiteDraft(), Q.grid = {
		snap: !0,
		...Q.siteDraft.grid
	}, DO.updateDirty(), OA.status = "", Q.pushSiteToPreview(), Q.siteDraft.pages.some((e) => e.id === $.pageId) ? oE.bridge?.sendPage($.pageId, e) : $.selectPage(Q.siteDraft.pages[0].id);
}
async function tj() {
	if (fk.revertedSinceLoad) {
		OA.setStatus(K("status.revertReloadBeforePublish"), "error");
		return;
	}
	if (fk.updateBusy) {
		OA.setStatus(K("update.publishBlocked"), "error");
		return;
	}
	OA.setStatus(K("status.publishing"));
	let e = [], t = [], n = [], r = [];
	for (let i of Q.siteDraft.pages) {
		let a = `urd-draft-${i.id}`, o = $.pendingPublished.has(i.id) || !Q.site.pages.some((e) => e.id === i.id), s = null;
		if (i.id === $.pageId && ($.store.hasDraft() || o)) s = $.store.data;
		else if (i.id !== $.pageId) {
			let e = localStorage.getItem(a);
			if (e) try {
				s = nc(JSON.parse(e), Q.siteStore.data);
			} catch {}
		}
		if (!s && o && (s = $.blankPage(i)), !s) continue;
		let c = JSON.parse(JSON.stringify(s));
		e.push(...JA(c)), e.push({
			path: i.file,
			content: JSON.stringify(c, null, 2) + "\n",
			encoding: "utf-8"
		}), t.push(i.title), o ? r.push(i.id) : n.push(a);
	}
	if (Q.siteStore.hasDraft()) {
		let r = JSON.parse(JSON.stringify(Q.siteDraft));
		e.push(...YA(r)), e.push({
			path: "content/site.json",
			content: JSON.stringify(r, null, 2) + "\n",
			encoding: "utf-8"
		}), e.push({
			path: "content/theme.css",
			content: uc(r.theme),
			encoding: "utf-8"
		}), n.push("urd-draft-site");
		let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
		i(Q.site.theme, Q.siteDraft.theme) || t.push(K("publish.part.theme")), i(Q.site.nav, Q.siteDraft.nav) || t.push(K("publish.part.nav")), i(Q.site.footer, Q.siteDraft.footer) || t.push(K("publish.part.footer")), i(Q.site.pages, Q.siteDraft.pages) || t.push(K("publish.part.pages")), i(Q.site.grid, Q.siteDraft.grid) || t.push(K("publish.part.grid")), (Q.site.site.icon ?? null) !== (Q.siteDraft.site.icon ?? null) && t.push(K("publish.part.icon"));
		let { icon: a, ...o } = Q.site.site, { icon: s, ...c } = Q.siteDraft.site;
		i(o, c) || t.push(K("publish.part.siteInfo"));
	}
	let i = Object.entries(YO.collectionStores).filter(([, e]) => e.hasDraft());
	if (i.length || YO.collectionsIndexStore?.hasDraft()) {
		for (let [t, r] of i) {
			let i = JSON.parse(JSON.stringify(r.data));
			for (let t of i.entries) WA(t, e);
			e.push({
				path: `content/samlinger/${t}.json`,
				content: JSON.stringify(i, null, 2) + "\n",
				encoding: "utf-8"
			}), VA.includes(i.kind) && e.push({
				path: `content/samlinger/${t}.xml`,
				content: HA({
					title: i.name ?? t,
					origin: location.origin,
					path: `/content/samlinger/${t}.xml`,
					items: i.entries.map((e) => ({
						id: e.id,
						title: YO.plainTitle(e.title),
						text: YO.plainTitle(e.text),
						date: e.date,
						href: e.href
					}))
				}),
				encoding: "utf-8"
			}), n.push(`urd-draft-samling-${t}`);
		}
		if (YO.collectionsIndexStore?.hasDraft()) {
			e.push({
				path: "content/collections.json",
				content: JSON.stringify(YO.collectionsIndexStore.data, null, 2) + "\n",
				encoding: "utf-8"
			}), n.push("urd-draft-collections", "urd-draft-samlinger");
			let t = { samlinger: [] };
			try {
				t = await (await fetch("/content/collections.json")).json();
			} catch {}
			let r = new Set(e.map((e) => e.path));
			for (let n of t.samlinger ?? []) {
				let t = `content/samlinger/${n}.json`;
				!YO.collectionIds.includes(n) && !r.has(t) && e.push({
					path: t,
					delete: !0
				});
			}
		}
		t.push(K("publish.part.collections"));
	}
	let a = Object.entries(zC.templateStores).filter(([, e]) => e.hasDraft());
	if (a.length || zC.templatesIndexStore?.hasDraft()) {
		for (let [t, r] of a) {
			let i = JSON.parse(JSON.stringify(r.data));
			i.section && qA(i.section, e);
			for (let t of i.blocks ?? []) KA(t, e);
			for (let t of i.page?.sections ?? []) qA(t, e);
			e.push({
				path: `content/maler/${t}.json`,
				content: JSON.stringify(i, null, 2) + "\n",
				encoding: "utf-8"
			}), n.push(`urd-draft-mal-${t}`);
		}
		if (zC.templatesIndexStore?.hasDraft()) {
			e.push({
				path: "content/maler.json",
				content: JSON.stringify(zC.templatesIndexStore.data, null, 2) + "\n",
				encoding: "utf-8"
			}), n.push("urd-draft-templates", "urd-draft-maler");
			let t = { maler: [] };
			try {
				t = await (await fetch("/content/maler.json")).json();
			} catch {}
			let r = new Set(e.map((e) => e.path));
			for (let n of t.maler ?? []) {
				let t = `content/maler/${n}.json`;
				!zC.templateIds.includes(n) && !r.has(t) && e.push({
					path: t,
					delete: !0
				});
			}
		}
		t.push(K("publish.part.templates"));
	}
	DE.pluginsStore?.hasDraft() && (e.push({
		path: "plugins/plugins.json",
		content: JSON.stringify(DE.pluginsStore.data, null, 2) + "\n",
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
		content: zA(Q.siteDraft.pages, location.origin),
		encoding: "utf-8"
	}), e.push({
		path: "robots.txt",
		content: BA(location.origin),
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
	let c = await fk.confirmNoConflict(e);
	if (!c.ok) {
		OA.setStatus(K("status.publishAborted"), "error");
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
		t ? fk.baseSha = t : fk.refreshBaseSha(), JA($.store.data), YA(Q.siteDraft);
		for (let e of n) localStorage.removeItem(e);
		for (let e of r) $.pendingPublished.add(e);
		if (Q.site = JSON.parse(JSON.stringify(Q.siteDraft)), Q.siteStore = KS("urd-draft-site", () => Q.site, OA.draftSaveError), Q.linkSiteDraft(), DE.pluginsStore) {
			let e = JSON.parse(JSON.stringify(DE.pluginsStore.data));
			DE.pluginsStore = KS("urd-draft-plugins", () => e, OA.draftSaveError), DE.syncPluginsView();
		}
		if (YO.collectionsIndexStore) {
			for (let e of Object.values(YO.collectionStores)) for (let t of e.data.entries) WA(t, []);
			let e = JSON.parse(JSON.stringify(YO.collectionsIndexStore.data));
			YO.collectionsIndexStore = KS("urd-draft-collections", () => e, OA.draftSaveError, "urd-draft-samlinger"), YO.publishedCollections = {};
			for (let e of YO.collectionIds) {
				if (!YO.collectionStores[e]) continue;
				let t = JSON.parse(JSON.stringify(YO.collectionStores[e].data));
				YO.publishedCollections[e] = t, YO.collectionStores[e] = KS(`urd-draft-collection-${e}`, () => t, OA.draftSaveError, `urd-draft-samling-${e}`);
			}
			YO.syncCollectionsView();
		}
		if (zC.templatesIndexStore) {
			for (let e of Object.values(zC.templateStores)) {
				e.data?.section && qA(e.data.section, []);
				for (let t of e.data?.blocks ?? []) KA(t, []);
				for (let t of e.data?.page?.sections ?? []) qA(t, []);
			}
			let e = JSON.parse(JSON.stringify(zC.templatesIndexStore.data));
			zC.templatesIndexStore = KS("urd-draft-templates", () => e, OA.draftSaveError, "urd-draft-maler"), zC.publishedTemplates = {};
			for (let e of zC.templateIds) {
				if (!zC.templateStores[e]) continue;
				let t = JSON.parse(JSON.stringify(zC.templateStores[e].data));
				zC.publishedTemplates[e] = t, zC.templateStores[e] = KS(`urd-draft-template-${e}`, () => t, OA.draftSaveError, `urd-draft-mal-${e}`);
			}
			zC.pushTemplatesToPreview();
		}
		Q.grid = {
			snap: !0,
			...Q.siteDraft.grid
		};
		let i = JSON.parse(JSON.stringify($.store.data));
		$.store = KS(`urd-draft-${$.pageId}`, () => i, OA.draftSaveError), $.pendingPublished.has($.pageId) && OA.writeDraftKey(`urd-draft-${$.pageId}`, JSON.stringify(i)), DO.updateDirty(), OA.setStatus(K("status.published"), "info"), fk.awaitPublishDeploy(e);
	} else if (u?.status === 401) {
		let e = await u.json().catch(() => null);
		OA.setStatus(e?.code === "loginExpired" ? K("status.loginExpired") : K("status.loginRequired", { reason: ba(e) ?? K("status.unknownReason") }), "error"), await OA.checkAuth();
	} else u?.status === 403 ? OA.setStatus(ba(await u.json().catch(() => null)) ?? K("status.noPublishAccess"), "error") : u?.status === 409 ? OA.setStatus(K("status.publishRace"), "error") : u ? OA.setStatus(ba(await u.json().catch(() => null)) ?? K("status.publishFailed"), "error") : OA.setStatus(K("status.publishUnavailable"), "error");
}
function nj() {
	Nn(() => {
		if (!I(XA)) return;
		let e = (e) => {
			I(ZA)?.contains(e.target) ? e.target instanceof Element && e.target.closest(".discard-confirm") && (e.preventDefault(), e.stopPropagation(), $A()) : A(XA, !1);
		}, t = (e) => {
			e.key === "Escape" && A(XA, !1);
		}, n = !1, r = (e) => {
			n = !!I(ZA)?.contains(e.target);
		}, i = () => {
			n = !1;
		}, a = () => {
			n || A(XA, !1);
		};
		return window.addEventListener("pointerdown", r, !0), window.addEventListener("pointerup", i, !0), window.addEventListener("click", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", a), () => {
			window.removeEventListener("pointerdown", r, !0), window.removeEventListener("pointerup", i, !0), window.removeEventListener("click", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", a);
		};
	});
}
var rj = {
	materializeField: UA,
	materializeEntryImages: WA,
	materializeBackground: GA,
	materializeBlockImages: KA,
	materializeSection: qA,
	materializeImages: JA,
	materializeSiteImages: YA,
	get discardArmed() {
		return I(XA);
	},
	set discardArmed(e) {
		A(XA, e, !0);
	},
	get discardWrapEl() {
		return I(ZA);
	},
	set discardWrapEl(e) {
		A(ZA, e, !0);
	},
	requestDiscard: QA,
	confirmDiscard: $A,
	discard: ej,
	publish: tj,
	effects: nj
}, ij = /* @__PURE__ */ R("<button class=\"chrome-restore\"><!> </button>"), aj = /* @__PURE__ */ R("<button type=\"button\"></button>"), oj = /* @__PURE__ */ R("<aside><div class=\"panel-head\"><h2> </h2> <!></div> <!></aside>"), sj = /* @__PURE__ */ R("<div class=\"workspace\"><!> <!> <!></div>"), cj = /* @__PURE__ */ R("<p class=\"loading\"> </p>"), lj = /* @__PURE__ */ R("<div><span> </span> <button class=\"toast-x\">×</button></div>"), uj = /* @__PURE__ */ R("<div class=\"editor\"><!> <!> <!> <!> <!> <!> <!> <!></div> <!>", 1);
function dj(e, t) {
	it(t, !0);
	let n = [
		LA,
		DO,
		oE,
		OA,
		Q,
		$,
		YO,
		zC,
		DE,
		fk,
		aT,
		ST,
		rj
	], r = {};
	for (let e of n) Object.defineProperties(r, Object.getOwnPropertyDescriptors(e));
	Object.assign(r, {
		blockLabel: (e) => aT.BLOCK_LABELS[e] ?? e,
		blockEntranceOptions: () => $.BLOCK_ENTRANCE_OPTIONS,
		hoverOptions: () => $.HOVER_OPTIONS,
		openPanel: (e, t = {}) => {
			t.calendars && (Q.siteCalendarsOpen = !0), OA.activePanel = e;
		},
		openCollection: (e) => {
			YO.activeCollection = e, OA.activePanel = "collections";
		},
		openDesignPicker: () => {
			$.designPicker = { mode: "set" };
		}
	}), rt("urd-editor", r);
	for (let e of n) e.effects?.();
	ia(() => {
		r.init();
	});
	var i = uj();
	zr("keydown", mn, function(...e) {
		r.onKeydown?.apply(this, e);
	}), zr("pointerdown", mn, function(...e) {
		r.onPointerdownWindow?.apply(this, e);
	});
	var a = M(i), o = j(a), s = (e) => {
		var t = ij(), n = j(t);
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
	CS(c, {});
	var l = P(c, 2), u = (e) => {
		var t = sj(), n = j(t);
		LS(n, {});
		var i = P(n, 2), a = (e) => {
			var t = oj();
			let n;
			var i = j(t), a = j(i), o = N(a, !0), s = P(a, 2), c = (e) => {
				var t = aj();
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
				kc(e, {});
			}, d = (e) => {
				Yf(e, {});
			}, f = (e) => {
				Cp(e, {});
			}, p = (e) => {
				Mp(e, {});
			}, m = (e) => {
				Jm(e, {});
			}, h = (e) => {
				Xm(e, {});
			}, g = (e) => {
				sb(e, {});
			}, _ = (e) => {
				kb(e, {});
			}, v = (e) => {
				Jb(e, {});
			}, y = (e) => {
				rx(e, {});
			}, b = (e) => {
				lx(e, {});
			}, x = (e) => {
				wx(e, {});
			};
			V(l, (e) => {
				r.activePanel === "pages" ? e(u) : r.activePanel === "nav" ? e(d, 1) : r.activePanel === "site" ? e(f, 2) : r.activePanel === "theme" ? e(p, 3) : r.activePanel === "blocks" ? e(m, 4) : r.activePanel === "grid" ? e(h, 5) : r.activePanel === "properties" ? e(g, 6) : r.activePanel === "footer" ? e(_, 7) : r.activePanel === "collections" ? e(v, 8) : r.activePanel === "plugins" ? e(y, 9) : r.activePanel === "history" ? e(b, 10) : r.activePanel === "update" && e(x, 11);
			}), D(t), Zi(t, (e) => r.panelEl = e, () => r?.panelEl), F((e) => {
				n = Pi(t, 1, "panel", null, n, { hidden: !r.chromeVisible }), G(a, "title", e), B(o, r.PANEL_LABELS[r.activePanel]);
			}, [() => r.PANEL_INTROS[r.activePanel]?.map((e) => K(e)).join("\n")]), z(e, t);
		};
		V(i, (e) => {
			r.activePanel && e(a);
		}), zS(P(i, 2), {}), D(t), z(e, t);
	}, d = (e) => {
		var t = cj(), n = N(t, !0);
		F((e) => B(n, e), [() => K("ui.loading")]), z(e, t);
	};
	V(l, (e) => {
		r.site ? e(u) : e(d, -1);
	});
	var f = P(l, 2), p = (e) => {
		Ex(e, {
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
			let t = /* @__PURE__ */ O(() => r.designPicker.mode === "set" ? Om(r.selectedBlock?.props.design).id : null), n = /* @__PURE__ */ O(() => r.siteDraft ? Xe(r.siteDraft) : null), i = /* @__PURE__ */ O(() => r.store?.data ? Xe(r.store.data) : null);
			Qx(e, {
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
	US(g, {});
	var _ = P(g, 2);
	GS(_, {});
	var v = P(_, 2), y = (e) => {
		var t = lj();
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
		eS(e, {
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
var fj = ti(dj, { target: document.getElementById("urd-admin") });
//#endregion
export { fj as default };
