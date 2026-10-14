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
var g = 1 << 24, _ = 1024, v = 2048, y = 4096, b = 8192, x = 16384, S = 32768, C = 1 << 25, w = 65536, T = 1 << 19, ee = 1 << 20, te = 1 << 25, ne = 1 << 21, re = 1 << 22, ie = 1 << 23, ae = Symbol("$state"), oe = Symbol("component"), se = Symbol("legacy props"), ce = Symbol(""), le = Symbol("attributes"), ue = Symbol("class"), de = Symbol("style"), fe = Symbol("text"), pe = Symbol("form reset"), me = new class extends Error {
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
	return De(/* @__PURE__ */ gn(Ee));
}
function E(e) {
	if (we) {
		if (/* @__PURE__ */ gn(Ee) !== null) throw Se(), ge;
		Ee = e;
	}
}
function ke(e = 1) {
	if (we) {
		for (var t = e, n = Ee; t--;) n = /* @__PURE__ */ gn(n);
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
		var i = /* @__PURE__ */ gn(n);
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
function D(e) {
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
function O(e) {
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
//#region node_modules/svelte/src/internal/shared/context.js
function Je(e) {
	let t = e.p;
	for (; t !== null && t.c === null;) t = t.p;
	return t?.c ?? null;
}
function Ye(e, t) {
	return e === null && D(t), e.c ??= new Map(Je(e) || void 0);
}
//#endregion
//#region node_modules/svelte/src/internal/client/context.js
var Xe = null;
function Ze(e) {
	Xe = e;
}
function Qe(e) {
	return Ye(Xe, "getContext").get(e);
}
function $e(e, t) {
	return Ye(Xe, "setContext").set(e, t), t;
}
function et(e, t = !1, n) {
	Xe = {
		p: Xe,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: tr,
		l: null
	};
}
function tt(e) {
	var t = Xe, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) kn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, Xe = t.p, nt(e);
}
function nt(e = {}) {
	return i(e, oe, { value: !0 }), e;
}
function rt() {
	return !0;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var it = [];
function at() {
	var e = it;
	it = [], p(e);
}
function ot(e) {
	if (it.length === 0 && !It) {
		var t = it;
		queueMicrotask(() => {
			t === it && at();
		});
	}
	it.push(e);
}
function st() {
	for (; it.length > 0;) at();
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/status.js
var ct = ~(v | y | _);
function lt(e, t) {
	e.f = e.f & ct | t;
}
function ut(e) {
	e.f & 512 || e.deps === null ? lt(e, _) : lt(e, y);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function dt(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), lt(e, _);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
function ft(e, t) {
	if (t) {
		let t = document.body;
		e.autofocus = !0, ot(() => {
			document.activeElement === t && e.focus();
		});
	}
}
function pt(e) {
	we && /* @__PURE__ */ hn(e) !== null && _n(e);
}
var mt = !1;
function ht() {
	mt || (mt = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[pe]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function gt(e) {
	var t = Qn, n = tr;
	er(null), nr(null);
	try {
		return e();
	} finally {
		er(t), nr(n);
	}
}
function _t(e, t, n, r = n) {
	e.addEventListener(t, () => gt(n));
	let i = e[pe];
	e[pe] = i ? () => {
		i(), r(!0);
	} : () => r(!0), ht();
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function vt(e, t, n, r) {
	let i = rt() ? St : Tt;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = tr, c = yt(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				Sn(e, s);
			}
			bt();
		}
	}
	var d = xt();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ wt(e))).then(u).catch((e) => Sn(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), bt();
	}) : f();
}
function yt() {
	var e = tr, t = Qn, n = Xe, r = Mt;
	return function(i = !0) {
		nr(e), er(t), Ze(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function bt(e = !0) {
	nr(null), er(null), Ze(null), e && Mt?.deactivate();
}
function xt() {
	var e = tr, t = e.b, n = Mt, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function St(e) {
	var t = 2 | v;
	return tr !== null && (tr.f |= T), {
		ctx: Xe,
		deps: null,
		effects: null,
		equals: Me,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: _e,
		wv: 0,
		parent: tr,
		ac: null
	};
}
var Ct = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function wt(e, t, n) {
	let r = tr;
	r === null && Fe();
	var i = void 0, a = $t(_e), o = !Qn, s = /* @__PURE__ */ new Set();
	return Mn(() => {
		var t = tr, n = m();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== me && n.reject(e);
			}).finally(bt);
		} catch (e) {
			n.reject(e), bt();
		}
		var c = Mt;
		if (o) {
			if (t.f & 32768) var l = xt();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(Ct);
			else for (let e of s.values()) e.reject(Ct);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== Ct && (c.activate(), t ? (a.f |= ie, rn(a, t)) : (a.f & 8388608 && (a.f ^= ie), rn(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), Dn(() => {
		for (let e of s) e.reject(Ct);
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
	let t = /* @__PURE__ */ St(e);
	return ir(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function Tt(e) {
	let t = /* @__PURE__ */ St(e);
	return t.equals = Pe, t;
}
function Et(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) Bn(t[n]);
	}
}
function Dt(e) {
	var t, n = tr, r = e.parent;
	if (!Xn && r !== null && e.v !== _e && r.f & 24576) return xe(), e.v;
	nr(r);
	try {
		Et(e), t = gr(e);
	} finally {
		nr(n);
	}
	return t;
}
function Ot(e) {
	var t = Dt(e);
	if (!e.equals(t) && (e.wv = pr(), (!Mt?.is_fork || e.deps === null) && (Mt === null ? e.v = t : (Mt.capture(e, t, !0), Nt?.capture(e, t, !0)), e.deps === null))) {
		lt(e, _);
		return;
	}
	Xn || (Pt === null ? ut(e) : (En() || Mt?.is_fork) && Pt.set(e, t));
}
function kt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && gt(() => {
		t.ac.abort(me), t.ac = null;
	}), t.fn !== null && (t.teardown = f), yr(t, 0), Rn(t));
}
function At(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && br(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var jt = null, Mt = null, Nt = null, Pt = null, Ft = null, It = !1, Lt = !1, Rt = null, zt = null, Bt = 0, Vt = 1, Ht = class e {
	id = Vt++;
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
		jt === null ? jt = this : (jt.#n = this, this.#t = jt), jt = this;
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
			for (var r of n.d) lt(r, v), t(r);
			for (r of n.m) lt(r, y), t(r);
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
		for (let e of this.#u) this.#d.delete(e), lt(e, v), this.schedule(e);
		for (let e of this.#d) lt(e, y), this.schedule(e);
		this.apply();
		for (var t = Rt = [], n = [], r = zt = []; this.#c.length > 0;) {
			Bt++ > 1e3 && (this.#S(), Wt());
			for (let e of this.#g()) try {
				this.#v(e, t, n);
			} catch (t) {
				throw Yt(e), this.#h() || this.discard(), t;
			}
		}
		if (Mt = null, r.length > 0) {
			var i = e.ensure();
			for (let e of r) i.schedule(e);
		}
		if (Rt = null, zt = null, this.#h()) {
			this.#x(n), this.#x(t);
			for (let [e, t] of this.#f) Jt(e, t);
			r.length > 0 && Mt.#_();
			return;
		}
		let a = this.#y();
		if (a) {
			this.#x(n), this.#x(t), a.#b(this);
			return;
		}
		this.#u.clear(), this.#d.clear();
		for (let e of this.#r) e(this);
		this.#r.clear(), Nt = this, Kt(n), Kt(t), Nt = null, this.#s?.resolve();
		var o = Mt;
		if (this.#a === 0 && (this.#c.length === 0 || o !== null) && this.#S(), this.#c.length > 0) {
			if (o !== null) {
				for (let e of this.#c) o.#c.push(e);
				this.#c = [];
			} else o = this;
		}
		o !== null && (Zt.clear(), o.#_());
	}
	#v(e, t, n) {
		e.f ^= _;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
				a ? r.f ^= _ : i & 4 ? t.push(r) : mr(r) && (i & 16 && this.#d.add(r), br(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), lt(i, v), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#S(), Mt = this, this.#_();
	}
	#x(e) {
		for (var t = 0; t < e.length; t += 1) dt(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== _e && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), Pt?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		Mt = this;
	}
	deactivate() {
		Mt = null, Pt = null;
	}
	flush() {
		try {
			Lt = !0, Mt = this, this.#_();
		} finally {
			Bt = 0, Ft = null, Rt = null, zt = null, Lt = !1, Mt = null, Pt = null, Zt.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(Ct);
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
		this.#m || (this.#m = !0, ot(() => {
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
		if (Mt === null) {
			let t = Mt = new e();
			!Lt && !It && ot(() => {
				t.#e || t.flush();
			});
		}
		return Mt;
	}
	apply() {
		Pt = null;
	}
	schedule(e) {
		if (Ft = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		this.#c.push(e);
	}
	#S() {
		if (this.linked) {
			var e = this.#t, t = this.#n;
			e === null || (e.#n = t), t === null ? jt = e : t.#t = e, this.linked = !1;
		}
	}
};
function Ut(e) {
	var t = It;
	It = !0;
	try {
		var n;
		for (e && (Mt !== null && !Mt.is_fork && Mt.flush(), n = e());;) {
			if (st(), Mt === null) return n;
			Mt.flush();
		}
	} finally {
		It = t;
	}
}
function Wt() {
	try {
		ze();
	} catch (e) {
		Sn(e, Ft);
	}
}
var Gt = null;
function Kt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && mr(r) && (Gt = /* @__PURE__ */ new Set(), br(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Hn(r), Gt?.size > 0)) {
				Zt.clear();
				for (let e of Gt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Gt.has(n) && (Gt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || br(n);
					}
				}
				Gt.clear();
			}
		}
		Gt = null;
	}
}
function qt(e) {
	Mt.schedule(e);
}
function Jt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), lt(e, _);
		for (var n = e.first; n !== null;) Jt(n, t), n = n.next;
	}
}
function Yt(e) {
	lt(e, _);
	for (var t = e.first; t !== null;) Yt(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var Xt = /* @__PURE__ */ new Set(), Zt = /* @__PURE__ */ new Map(), Qt = !1;
function $t(e, t) {
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
function A(e, t) {
	let n = $t(e, t);
	return ir(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function en(e, t = !1, n = !0) {
	let r = $t(e);
	return t || (r.equals = Pe), r;
}
function j(e, t, n = !1) {
	return Qn !== null && (!$n || Qn.f & 131072) && rt() && Qn.f & 4325394 && (rr === null || !rr.has(e)) && Ue(), rn(e, n ? cn(t) : t, zt);
}
var tn = null, nn = 0;
function rn(e, t, n = null) {
	if (!e.equals(t)) {
		Xn ? Zt.set(e, t) : Zt.has(e) || Zt.set(e, e.v);
		var r = Ht.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && Dt(t), Pt === null && ut(t);
		}
		e.wv = pr(), tn = null, nn = 0, sn(e, v, n), tn = null, rt() && tr !== null && tr.f & 1024 && !(tr.f & 96) && (sr === null ? cr([e]) : sr.push(e)), !r.is_fork && Xt.size > 0 && !Qt && an();
	}
	return t;
}
function an() {
	Qt = !1;
	for (let e of Xt) {
		e.f & 1024 && lt(e, y);
		let t;
		try {
			t = mr(e);
		} catch {
			t = !0;
		}
		t && br(e);
	}
	Xt.clear();
}
function on(e) {
	j(e, e.v + 1);
}
function sn(e, t, n) {
	var r = e.reactions;
	if (r !== null) {
		var i = rt(), a = r.length;
		if (nn += a, nn > 1e5 && tn === null && (tn = /* @__PURE__ */ new Set()), tn !== null) {
			if (tn.has(e)) return;
			tn.add(e);
		}
		for (var o = 0; o < a; o++) {
			var s = r[o], c = s.f;
			if (i || s !== tr) {
				var l = (c & v) === 0;
				if (l && lt(s, t), c & 131072) Xt.add(s);
				else if (c & 2) {
					var u = s;
					Pt?.delete(u), sn(u, y, n);
				} else if (l) {
					var d = s;
					c & 16 && Gt !== null && Gt.add(d), n === null ? qt(d) : n.push(d);
				}
			}
		}
	}
}
function cn(t) {
	if (typeof t != "object" || !t || ae in t || oe in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ A(0), u = null, d = dr, f = (e) => {
		if (dr === d) return e();
		var t = Qn, n = dr;
		er(null), fr(d);
		var r = e();
		return er(t), fr(n), r;
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
					let e = f(() => /* @__PURE__ */ A(_e, u));
					r.set(t, e), on(o);
				}
			} else j(n, _e), on(o);
			return !0;
		},
		get(e, n, i) {
			if (n === ae) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ A(cn(s ? e[n] : _e), u)), r.set(n, o)), o !== void 0) {
				var c = L(o);
				return c === _e ? void 0 : c;
			}
			return Reflect.get(e, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			this.has?.(e, t);
			var n = Reflect.getOwnPropertyDescriptor(e, t), i = r.get(t);
			if (i !== void 0) {
				var a = L(i);
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
			return (n !== void 0 || tr !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ A(i ? cn(e[t]) : _e, u)), r.set(t, n)), L(n) === _e) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ A(_e, u)), r.set(d + "", p)) : j(p, _e);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ A(void 0, u)), j(c, cn(n)), r.set(t, c));
			else {
				l = c.v !== _e;
				var m = f(() => cn(n));
				j(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && j(g, _ + 1);
				}
				on(o);
			}
			return !0;
		},
		ownKeys(e) {
			L(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== _e;
			});
			for (var [n, i] of r) i.v !== _e && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			He();
		}
	});
}
var ln, un, dn, fn;
function pn() {
	if (ln === void 0) {
		ln = window, un = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		dn = a(t, "firstChild").get, fn = a(t, "nextSibling").get, u(e) && (e[ue] = void 0, e[le] = null, e[de] = void 0, e.__e = void 0), u(n) && (n[fe] = void 0);
	}
}
function mn(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function hn(e) {
	return dn.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function gn(e) {
	return fn.call(e);
}
function M(e, t) {
	if (!we) return /* @__PURE__ */ hn(e);
	var n = /* @__PURE__ */ hn(Ee);
	if (n === null) n = Ee.appendChild(mn());
	else if (t && n.nodeType !== 3) {
		var r = mn();
		return n?.before(r), De(r), r;
	}
	return t && bn(n), De(n), n;
}
function N(e, t = !1) {
	if (!we) {
		var n = /* @__PURE__ */ hn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ gn(n) : n;
	}
	if (t) {
		if (Ee?.nodeType !== 3) {
			var r = mn();
			return Ee?.before(r), De(r), r;
		}
		bn(Ee);
	}
	return Ee;
}
function P(e, t = !1) {
	if (!we) return /* @__PURE__ */ hn(e);
	var n = M(e, t);
	return E(e), n;
}
function F(e, t = 1, n = !1) {
	let r = we ? Ee : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ gn(r);
	if (!we) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = mn();
			return r === null ? i?.after(a) : r.before(a), De(a), a;
		}
		bn(r);
	}
	return De(r), r;
}
function _n(e) {
	e.textContent = "";
}
function vn() {
	return !1;
}
function yn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function bn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
function xn(e) {
	var t = tr;
	if (t === null) return Qn.f |= ie, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	Sn(e, t);
}
function Sn(e, t) {
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
function Cn(e) {
	tr === null && (Qn === null && Re(e), Le()), Xn && O(e);
}
function wn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function Tn(e, t) {
	var n = tr;
	n !== null && n.f & 8192 && (e |= b);
	var r = {
		ctx: Xe,
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
	Mt?.register_created_effect(r);
	var i = r;
	if (e & 4) Rt === null ? Ht.ensure().schedule(r) : Rt.push(r);
	else if (t !== null) {
		try {
			br(r);
		} catch (e) {
			throw Bn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= w));
	}
	if (i !== null && (i.parent = n, n !== null && wn(i, n), Qn !== null && Qn.f & 2 && !(e & 64))) {
		var a = Qn;
		(a.effects ??= []).push(i);
	}
	return r;
}
function En() {
	return Qn !== null && !$n;
}
function Dn(e) {
	let t = Tn(8, null);
	return lt(t, _), t.teardown = e, t;
}
function On(e) {
	Cn("$effect");
	var t = tr.f;
	if (!Qn && t & 32 && Xe !== null && !Xe.i) {
		var n = Xe;
		(n.e ??= []).push(e);
	} else return kn(e);
}
function kn(e) {
	return Tn(4 | ee, e);
}
function An(e) {
	Ht.ensure();
	let t = Tn(64 | T, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Un(t, () => {
			Bn(t), n(void 0);
		}) : (Bn(t), n(void 0));
	});
}
function jn(e) {
	return Tn(4, e);
}
function Mn(e) {
	return Tn(re | T, e);
}
function Nn(e, t = 0) {
	return Tn(8 | t, e);
}
function I(e, t = [], n = [], r = []) {
	vt(r, t, n, (t) => {
		Tn(8, () => {
			e(...t.map(L));
		});
	});
}
function Pn(e, t = 0) {
	return Tn(16 | t, e);
}
function Fn(e, t = 0) {
	return Tn(g | t, e);
}
function In(e) {
	return Tn(32 | T, e);
}
function Ln(e) {
	var t = e.teardown;
	if (t !== null) {
		let n = Xn, r = Qn;
		Zn(!0), er(null);
		try {
			t.call(null);
		} catch (t) {
			Sn(t, e.parent);
		} finally {
			Zn(n), er(r);
		}
	}
}
function Rn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && gt(() => {
			e.abort(me);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : Bn(n, t), n = r;
	}
}
function zn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || Bn(t), t = n;
	}
}
function Bn(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Vn(e.nodes.start, e.nodes.end), n = !0), e.f |= C, Rn(e, t && !n), yr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	Ln(e), e.f ^= C, e.f |= x;
	var i = e.parent;
	i !== null && i.first !== null && Hn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Vn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ gn(e);
		e.remove(), e = n;
	}
}
function Hn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Un(e, t, n = !0) {
	var r = [];
	e.f |= 256, Wn(e, r, !0);
	var i = () => {
		n && Bn(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Wn(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= b;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				Wn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Gn(e) {
	e.f &= -257, Kn(e, !0);
}
function Kn(e, t) {
	if (!(e.f & 256) && e.f & 8192) {
		e.f ^= b, e.f & 1024 || (lt(e, v), Ht.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			Kn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function qn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ gn(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var Jn = null, Yn = !1, Xn = !1;
function Zn(e) {
	Xn = e;
}
var Qn = null, $n = !1;
function er(e) {
	Qn = e;
}
var tr = null;
function nr(e) {
	tr = e;
}
var rr = null;
function ir(e) {
	Qn !== null && (Qn.f & 2097152 || Qn.f & 2) && (rr ??= /* @__PURE__ */ new Set()).add(e);
}
var ar = null, or = 0, sr = null;
function cr(e) {
	sr = e;
}
var lr = 1, ur = 0, dr = ur;
function fr(e) {
	dr = e;
}
function pr() {
	return ++lr;
}
function mr(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (mr(a) && Ot(a), a.wv > e.wv) return !0;
		}
		t & 512 && Pt === null && lt(e, _);
	}
	return !1;
}
function hr(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(rr !== null && rr.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? hr(a, t, !1) : t === a && (n ? lt(a, v) : a.f & 1024 && lt(a, y), qt(a));
	}
}
function gr(e) {
	var t = ar, n = or, r = sr, i = Qn, a = rr, o = Xe, s = $n, c = dr, l = e.f;
	ar = null, or = 0, sr = null, Qn = l & 96 ? null : e, rr = null, Ze(e.ctx), $n = !1, dr = ++ur, e.ac !== null && (gt(() => {
		e.ac.abort(me);
	}), e.ac = null);
	try {
		e.f |= ne;
		var u = e.fn, d = u();
		e.f |= S;
		var f = _r(e);
		if (rt() && sr !== null && !$n && f !== null && !(e.f & 6146)) for (var p = 0; p < sr.length; p++) hr(sr[p], e);
		if (i !== null && i !== e) {
			if (ur++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = ur;
			if (t !== null) for (let e of t) e.rv = ur;
			sr !== null && (r === null ? r = sr : r.push(...sr));
		}
		return e.f & 8388608 && (e.f ^= ie), d;
	} catch (t) {
		return _r(e), xn(t);
	} finally {
		e.f ^= ne, ar = t, or = n, sr = r, Qn = i, rr = a, Ze(o), $n = s, dr = c;
	}
}
function _r(e) {
	var t = e.deps, n = Mt?.is_fork;
	if (ar !== null) {
		var r;
		if (n || yr(e, or), t !== null && or > 0) for (t.length = or + ar.length, r = 0; r < ar.length; r++) t[or + r] = ar[r];
		else e.deps = t = ar;
		if (En() && e.f & 512) for (r = or; r < t.length; r++) (t[r].reactions ??= []).push(e);
	} else !n && t !== null && or < t.length && (yr(e, or), t.length = or);
	return t;
}
function vr(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && (ar === null || !n.call(ar, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512), s.v !== _e && ut(s), s.ac !== null && gt(() => {
			s.ac.abort(me), s.ac = null, lt(s, v);
		}), kt(s), yr(s, 0);
	}
}
function yr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) vr(e, n[r]);
}
function br(e) {
	var t = e.f;
	if (!(t & 16384)) {
		lt(e, _);
		var n = tr, r = Yn;
		tr = e, Yn = !(t & 96);
		try {
			t & 16777232 ? zn(e) : Rn(e), Ln(e);
			var i = gr(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = lr;
		} finally {
			Yn = r, tr = n;
		}
	}
}
async function xr() {
	await Promise.resolve(), Ut();
}
function L(e) {
	var t = !!(e.f & 2);
	if (Jn?.add(e), Qn !== null && !$n && !(tr !== null && tr.f & 16384) && (rr === null || !rr.has(e))) {
		var r = Qn.deps;
		if (Qn.f & 2097152) e.rv < ur && (e.rv = ur, ar === null && r !== null && r[or] === e ? or++ : ar === null ? ar = [e] : ar.push(e));
		else {
			Qn.deps ??= [], n.call(Qn.deps, e) || Qn.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [Qn] : n.call(i, Qn) || i.push(Qn);
		}
	}
	if (Xn && Zt.has(e)) return Zt.get(e);
	if (t) {
		var a = e;
		if (Xn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || Cr(a)) && (o = Dt(a)), Zt.set(a, o), o;
		}
		var s = !(a.f & 512) && !$n && Qn !== null && (Yn || !!(Qn.f & 512)), c = (a.f & S) === 0;
		mr(a) && (s && (a.f |= 512), Ot(a)), s && !c && (At(a), Sr(a));
	}
	if (Pt?.has(e)) return Pt.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function Sr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (At(t), Sr(t));
}
function Cr(e) {
	if (e.v === _e) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Zt.has(t) || t.f & 2 && Cr(t)) return !0;
	return !1;
}
function wr(e) {
	var t = $n;
	try {
		return $n = !0, e();
	} finally {
		$n = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var Tr = ["touchstart", "touchmove"];
function Er(e) {
	return Tr.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var Dr = Symbol("events"), Or = /* @__PURE__ */ new Set(), kr = /* @__PURE__ */ new Set();
function Ar(e) {
	if (!we) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function jr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Ir.call(t, e), !e.cancelBubble) return gt(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? (i.__removed = !1, ot(() => {
		i.__removed || t.addEventListener(e, i, r);
	})) : t.addEventListener(e, i, r), i;
}
function Mr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = jr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && Dn(() => {
		o.__removed = !0, t.removeEventListener(e, o, a);
	});
}
function R(e, t, n) {
	(t[Dr] ??= {})[e] = n;
}
function Nr(e) {
	for (var t = 0; t < e.length; t++) Or.add(e[t]);
	for (var n of kr) n(e);
}
var Pr = null, Fr = !1;
function Ir(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	Pr = e, Fr || (Fr = !0, setTimeout(() => {
		Fr = !1, Pr = null;
	}));
	var s = 0, c = Pr === e && e[Dr];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[Dr] = t;
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
		var d = Qn, f = tr;
		er(null), nr(null);
		try {
			for (var p, m = []; o !== null && o !== t;) {
				try {
					var h = o[Dr]?.[r];
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
			e[Dr] = t, delete e.currentTarget, er(d), nr(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var Lr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Rr(e) {
	return Lr?.createHTML(e) ?? e;
}
function zr(e) {
	var t = yn("template");
	return t.innerHTML = Rr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function Br(e, t) {
	var n = tr;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function z(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (we) return Br(Ee, null), Ee;
		i === void 0 && (i = zr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ hn(i)));
		var t = r || un ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ hn(t), s = t.lastChild;
			Br(o, s);
		} else Br(t, t);
		return t;
	};
}
function Vr(e = "") {
	if (!we) {
		var t = mn(e + "");
		return Br(t, t), t;
	}
	var n = Ee;
	return n.nodeType === 3 ? bn(n) : (n.before(n = mn()), De(n)), Br(n, n), n;
}
function Hr() {
	if (we) return Br(Ee, null), Ee;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = mn();
	return e.append(t, n), Br(t, n), e;
}
function B(e, t) {
	if (we) {
		var n = tr;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = Ee), Oe();
		return;
	}
	e !== null && e.before(t);
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function Ur(e) {
	let t = 0, n = $t(0), r;
	return () => {
		En() && (L(n), Nn(() => (t === 0 && (r = wr(() => e(() => on(n)))), t += 1, () => {
			ot(() => {
				--t, t === 0 && (r?.(), r = void 0, on(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Wr = w | T;
function Gr(e, t, n, r) {
	new Kr(e, t, n, r);
}
var Kr = class {
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
	#h = Ur(() => (this.#m = $t(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = tr;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = tr.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = Pn(() => {
			if (we) {
				let e = this.#t;
				Oe();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#y() : this.#g();
			} else this.#b();
		}, Wr), we && (this.#e = Ee);
	}
	#g() {
		try {
			this.#a = In(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#v(e);
		ot(r), t && (this.#s = In(() => {
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
			t = !0, n && We(), this.#s !== null && Un(this.#s, () => {
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
					Sn(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#y() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = In(() => e(this.#e)), ot(() => {
			var e = this.#c = document.createDocumentFragment(), t = mn(), n = !1;
			if (e.append(t), this.#a = this.#S(() => {
				try {
					return In(() => this.#r(t));
				} catch (e) {
					try {
						this.error(e), n = !0;
					} catch (e) {
						Sn(e, this.#i.parent);
					}
					return null;
				}
			}), this.#a === null) {
				this.#c = null, n && this.#x(Mt);
				return;
			}
			this.#u === 0 && (this.#e.before(e), this.#c = null, Un(this.#o, () => {
				this.#o = null;
			}), this.#x(Mt));
		}));
	}
	#b() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = In(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				qn(this.#a, e);
				let t = this.#n.pending;
				this.#o = In(() => t(this.#e));
			} else this.#x(Mt);
		} catch (e) {
			this.error(e);
		}
	}
	#x(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		dt(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#S(e) {
		var t = tr, n = Qn, r = Xe;
		nr(this.#i), er(this.#i), Ze(this.#i.ctx);
		try {
			return Ht.ensure(), e();
		} finally {
			nr(t), er(n), Ze(r);
		}
	}
	#C(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#C(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#x(t), this.#o && Un(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#C(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, ot(() => {
			this.#d = !1, this.#m && rn(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), L(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		Mt?.is_fork ? (this.#a && Mt.skip_effect(this.#a), this.#o && Mt.skip_effect(this.#o), this.#s && Mt.skip_effect(this.#s), Mt.oncommit(() => {
			this.#w(e);
		})) : this.#w(e);
	}
	#w(e) {
		this.#a &&= (Bn(this.#a), null), this.#o &&= (Bn(this.#o), null), this.#s &&= (Bn(this.#s), null), we && (De(this.#t), ke(), De(Ae()));
		let t = this.#n.failed, n = (e) => {
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && (this.#s = this.#S(() => {
				try {
					return In(() => {
						var r = tr;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return Sn(e, this.#i.parent), null;
				}
			}));
		};
		ot(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				Sn(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => Sn(e, this.#i && this.#i.parent)) : n(t);
		});
	}
}, qr = !0;
function V(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[fe] ??= e.nodeValue) && (e[fe] = n, e.nodeValue = `${n}`);
}
function Jr(e, t) {
	return Xr(e, t);
}
var Yr = /* @__PURE__ */ new Map();
function Xr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	pn();
	var l = void 0, u = An(() => {
		var u = n ?? t.appendChild(mn());
		Gr(u, { pending: () => {} }, (t) => {
			et({});
			var n = Xe;
			if (o && (n.c = o), a && (i.$$events = a), we && Br(t, null), qr = s, l = e(t, i) || nt(), qr = !0, we && (tr.nodes.end = Ee, Ee === null || Ee.nodeType !== 8 || Ee.data !== "]")) throw Se(), ge;
			tt();
		}, c);
		var d = /* @__PURE__ */ new Set(), f = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!d.has(r)) {
					d.add(r);
					var i = Er(r);
					for (let e of [t, document]) {
						var a = Yr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Yr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Ir, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return f(r(Or)), kr.add(f), () => {
			for (var e of d) for (let n of [t, document]) {
				var r = Yr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Ir), r.delete(e), r.size === 0 && Yr.delete(n)) : r.set(e, i);
			}
			kr.delete(f), u !== n && u.parentNode?.removeChild(u);
		};
	});
	return Zr.set(l, u), l;
}
var Zr = /* @__PURE__ */ new WeakMap(), Qr = class {
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
			if (n) Gn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (Gn(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (Bn(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						qn(r, t), t.append(mn()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else Bn(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Un(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (Bn(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = Mt, r = vn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = mn();
				i.append(a), this.#n.set(e, {
					effect: In(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, In(() => t(this.anchor)));
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
function H(e, t, n = !1) {
	var r;
	we && (r = Ee, Oe());
	var i = new Qr(e), a = n ? w : 0;
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
	Pn(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
function $r(e, t) {
	return t;
}
function ei(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		Un(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					ti(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null && e.pending.size === 0;
		if (l) {
			var u = n, d = u.parentNode;
			_n(d), d.append(u), e.items.clear();
		}
		ti(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function ti(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= te, qn(a, document.createDocumentFragment())) : Bn(t[i], n);
	}
}
var ni;
function ri(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = we ? De(/* @__PURE__ */ hn(u)) : u.appendChild(mn());
	}
	we && Oe();
	var d = null, f = /* @__PURE__ */ Tt(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, ai(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= te, si(d, null, c)) : Gn(d) : Un(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: Pn(() => {
			p = L(f);
			var e = p.length;
			let t = !1;
			we && je(c) === "[!" != (e === 0) && (c = Ae(), De(c), Te(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = Mt, v = vn(), y = 0; y < e; y += 1) {
				we && Ee.nodeType === 8 && Ee.data === "]" && (c = Ee, t = !0, Te(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && rn(S.v, b), S.i && rn(S.i, y), v && u.unskip_effect(S.e)) : (S = oi(l, h ? c : ni ??= mn(), b, x, y, o, n, i), h || (S.e.f |= te), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = In(() => s(c)) : (d = In(() => s(ni ??= mn())), d.f |= te)), e > r.size && Ie("", "", ""), we && e > 0 && De(Ae()), !h) {
				if (m.set(u, r), v) {
					for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
					u.oncommit(g), u.ondiscard(_);
				} else g(u);
			}
			t && Te(!0), L(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, we && (c = Ee);
}
function ii(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function ai(e, t, n, i, a) {
	var o = !!(i & 8), s = t.length, c = e.items, l = ii(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (Gn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) {
			if (_.f ^= te, _ === l) si(_, null, n);
			else {
				var y = d ? d.next : l;
				_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), ci(e, d, _), ci(e, _, y), si(_, y, n), d = _, p = [], m = [], l = ii(d.next);
				continue;
			}
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) si(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					ci(e, S.prev, C.next), ci(e, d, S), ci(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), si(_, l, n), ci(e, _.prev, _.next), ci(e, _, d === null ? e.effect.first : d.next), ci(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = ii(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = ii(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (ti(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var w = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || w.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && w.push(l), l = ii(l.next);
		var T = w.length;
		if (T > 0) {
			var ee = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.fix();
			}
			ei(e, w, ee);
		}
	}
	o && ot(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function oi(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? $t(n) : /* @__PURE__ */ en(n, !1, !1) : null, l = o & 2 ? $t(i) : null;
	return {
		v: c,
		i: l,
		e: In(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function si(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ gn(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function ci(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function U(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		we && (o = De(/* @__PURE__ */ hn(c)));
	}
	I(() => {
		var e = tr;
		if (s === (s = t() ?? "")) {
			we && Oe();
			return;
		}
		if (n && !we) {
			e.nodes = null, c.innerHTML = s, s !== "" && Br(/* @__PURE__ */ hn(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (Vn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (we) {
				for (var a = Ee.data, l = Oe(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ gn(l);
				if (l === null) throw Se(), ge;
				Br(Ee, u), o = De(l);
				return;
			}
			var d = yn(r ? "svg" : i ? "math" : "template", r ? ye : i ? be : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (Br(/* @__PURE__ */ hn(f), f.lastChild), r || i) for (; /* @__PURE__ */ hn(f);) o.before(/* @__PURE__ */ hn(f));
			else o.before(f);
		}
	});
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/snippet.js
function li(e, t, ...n) {
	var r = new Qr(e);
	Pn(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, w);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/svelte-component.js
function ui(e, t, n) {
	var r;
	we && (r = Ee, Oe());
	var i = new Qr(e);
	Pn(() => {
		var e = t() ?? null;
		if (we && je(r) === "[" != (e !== null)) {
			var a = Ae();
			De(a), i.anchor = a, Te(!1), i.ensure(e, e && ((t) => n(t, e))), Te(!0);
			return;
		}
		i.ensure(e, e && ((t) => n(t, e)));
	}, w);
}
//#endregion
//#region node_modules/svelte/src/internal/client/timing.js
var di = () => performance.now(), fi = {
	tick: (e) => requestAnimationFrame(e),
	now: () => di(),
	tasks: /* @__PURE__ */ new Set()
};
//#endregion
//#region node_modules/svelte/src/internal/client/loop.js
function pi() {
	let e = fi.now();
	fi.tasks.forEach((t) => {
		t.c(e) || (fi.tasks.delete(t), t.f());
	}), fi.tasks.size !== 0 && fi.tick(pi);
}
function mi(e) {
	let t;
	return fi.tasks.size === 0 && fi.tick(pi), {
		promise: new Promise((n) => {
			fi.tasks.add(t = {
				c: e,
				f: n
			});
		}),
		abort() {
			fi.tasks.delete(t);
		}
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/transitions.js
function hi(e, t) {
	gt(() => {
		e.dispatchEvent(new CustomEvent(t));
	});
}
function gi(e) {
	if (e === "float") return "cssFloat";
	if (e === "offset") return "cssOffset";
	if (e.startsWith("--")) return e;
	let t = e.split("-");
	return t.length === 1 ? t[0] : t[0] + t.slice(1).map((e) => e[0].toUpperCase() + e.slice(1)).join("");
}
function _i(e) {
	let t = {}, n = e.split(";");
	for (let e of n) {
		let [n, r] = e.split(":");
		if (!n || r === void 0) break;
		let i = gi(n.trim());
		t[i] = r.trim();
	}
	return t;
}
var vi = (e) => e;
function yi(e, t, n, r) {
	var i = !!(e & 1), a = !!(e & 2), o = i && a, s = !!(e & 4), c = o ? "both" : i ? "in" : "out", l, u = t.inert, d = t.style.overflow, f, p;
	function m() {
		return gt(() => l ??= n()(t, r?.() ?? {}, { direction: c }));
	}
	var h = {
		is_global: s,
		in() {
			if (t.inert = u, !i) {
				p?.abort(), p?.reset?.();
				return;
			}
			a || f?.abort(), f = bi(t, m(), p, 1, () => {
				hi(t, "introstart");
			}, () => {
				hi(t, "introend"), f?.abort(), f = l = void 0, t.style.overflow = d;
			});
		},
		out(e) {
			if (!a) {
				e?.(), l = void 0;
				return;
			}
			t.inert = !0, p = bi(t, m(), f, 0, () => {
				hi(t, "outrostart");
			}, () => {
				hi(t, "outroend"), e?.();
			});
		},
		stop: () => {
			f?.abort(), p?.abort();
		}
	}, g = tr;
	if ((g.nodes.t ??= []).push(h), i && qr) {
		var _ = s;
		if (!_) {
			for (var v = g.parent; v && v.f & 65536;) for (; (v = v.parent) && !(v.f & 16););
			_ = !v || !!(v.f & 32768);
		}
		_ && jn(() => {
			wr(() => h.in());
		});
	}
}
function bi(e, t, n, r, i, a) {
	var o = r === 1, s = !1;
	if (d(t)) {
		var c;
		return ot(() => {
			s || (c = bi(e, t({ direction: o ? "in" : "out" }), n, r, i, a));
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
	let { delay: l = 0, css: u, tick: p, easing: m = vi } = t;
	var h, g = () => 1 - r;
	return ot(() => {
		if (!s) {
			var c = [];
			if (o && n === void 0 && (p && p(0, 1), u)) {
				var d = _i(u(0, 1));
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
						var v = o + s * m(_ / f), y = _i(u(v, 1 - v));
						l.push(y), d ||= y.overflow === "hidden";
					}
					d && (e.style.overflow = "hidden"), g = () => {
						var e = h.currentTime;
						return o + s * m(e / c);
					}, p && mi(() => {
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
function xi(e, t) {
	var n = void 0, r;
	Fn(() => {
		n !== (n = t()) && (r &&= (Bn(r), null), n && (r = In(() => {
			jn(() => n(e));
		})));
	});
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
var Si = [..." 	\n\r\f\xA0\v﻿"];
function Ci(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || Si.includes(r[o - 1])) && (s === r.length || Si.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function wi(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function Ti(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Ei(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\/\*.*?\*\//g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(Ti)), i && c.push(...Object.keys(i).map(Ti));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = Ti(e.substring(l, u).trim());
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
		return r && (n += wi(r)), i && (n += wi(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function W(e, t, n, r, i, a) {
	var o = e[ue];
	if (we || o !== n || o === void 0) {
		var s = Ci(n, r, a);
		(!we || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[ue] = n;
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
	var i = e[de];
	if (we || i !== t) {
		var a = Ei(t, r);
		(!we || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[de] = t;
	} else r && (Array.isArray(r) ? (Di(e, n?.[0], r[0]), Di(e, n?.[1], r[1], "important")) : Di(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var ki = Symbol("is custom element"), Ai = Symbol("is html"), ji = he ? "link" : "LINK", Mi = he ? "progress" : "PROGRESS";
function G(e) {
	if (we) {
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
		e[pe] = n, ot(n), ht();
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
	we && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === ji) || i[t] !== (i[t] = n) && (t === "loading" && (e[ce] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Ii(e).has(t) ? e[t] = n : e.setAttribute(t, n));
}
function Pi(e) {
	return e[le] ??= {
		[ki]: e.nodeName.includes("-"),
		[Ai]: e.namespaceURI === ve
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
	_t(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = Ri(e) ? zi(a) : a, n(a), Mt !== null && r.add(Mt), await xr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (we && e.defaultValue !== e.value || wr(t) == null && e.value) && (n(Ri(e) ? zi(e.value) : e.value), Mt !== null && r.add(Mt)), Nn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = Mt;
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
	jn(() => (wr(() => n(e[t])), r));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function Hi(e, t) {
	return e === t || e?.[ae] === t;
}
function Ui(e = nt(), t, n, r) {
	var i = Xe.r, a = tr;
	return jn(() => {
		var o, s;
		return Nn(() => {
			o = s, s = r?.() || [], wr(() => {
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
	n.addEventListener(t, a), i ? Nn(() => {
		n[e] = i();
	}) : a(), (n === document.body || n === window || n === document) && Dn(() => {
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
	var i = !0, o = !!(n & 8), s = !!(n & 16), c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ St(r), L(u)) : (l && (l = !1, c = s ? wr(r) : r), c);
	let f;
	if (o) {
		var p = ae in e || se in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = Ki(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && Be(t), f(m)));
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
	var v = !1, y = (n & 1 ? St : Tt)(() => (v = !1, g()));
	o && L(y);
	var b = tr;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? L(y) : i && o ? cn(e) : e;
			return j(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Xn && v || b.f & 16384 ? y.v : L(y);
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
var xa = /* @__PURE__ */ z("<button type=\"button\" class=\"cp-eye svelte-zxiloo\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), Sa = /* @__PURE__ */ z("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), Ca = /* @__PURE__ */ z("<button type=\"button\"></button>"), wa = /* @__PURE__ */ z("<span class=\"cp-label svelte-zxiloo\"> <!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Ta = /* @__PURE__ */ z("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\">×</button></span>"), Ea = /* @__PURE__ */ z("<span class=\"cp-tokens svelte-zxiloo\"></span>"), Da = /* @__PURE__ */ z("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), Oa = /* @__PURE__ */ z("<span class=\"cp-label svelte-zxiloo\"> </span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), ka = /* @__PURE__ */ z("<div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\"> <button type=\"button\" class=\"cp-add svelte-zxiloo\">+</button></span> <!> <!>", 1), Aa = /* @__PURE__ */ z("<button type=\"button\" class=\"cp-clear svelte-zxiloo\">×</button>"), ja = /* @__PURE__ */ z("<div class=\"cp-pop cp-anchored svelte-zxiloo\" popover=\"auto\"><!></div>"), Ma = /* @__PURE__ */ z("<div class=\"cp-pop svelte-zxiloo\"><!></div>"), Na = /* @__PURE__ */ z("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!> <!></span>");
function Pa(e, t) {
	et(t, !0);
	let n = (e) => {
		var t = ka(), n = N(t), a = P(n), o = F(n, 2);
		G(o);
		var s = F(o, 2);
		G(s);
		var c = F(s, 2), l = M(c), u = F(l, 2);
		G(u);
		var d = F(u, 2), f = (e) => {
			var t = xa();
			I((e) => q(t, "title", e), [() => J("cp.eyedropper")]), R("click", t, xe), B(e, t);
		};
		H(d, (e) => {
			be && e(f);
		}), E(c);
		var p = F(c, 2);
		ri(p, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = Sa();
			G(r), I((e) => {
				q(r, "title", t), K(r, e);
			}, [() => ve(L(n))]), R("change", r, (e) => ye(L(n), e.target.value)), B(e, r);
		}), E(p);
		var v = F(p, 2), y = (e) => {
			var t = wa(), n = N(t), a = M(n, !0), o = F(a), s = (e) => {
				var t = Vr();
				I((e) => V(t, e), [() => J("cp.linkedSuffix", { token: m() })]), B(e, t);
			}, c = /* @__PURE__ */ k(() => m());
			H(o, (e) => {
				L(c) && e(s);
			}), E(n);
			var l = F(n, 2);
			ri(l, 21, i, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ k(() => h(L(t), 2));
				let i = () => L(n)[0], a = () => L(n)[1];
				var o = Ca();
				let s;
				I((e) => {
					s = W(o, 1, "cp-token svelte-zxiloo", null, s, { active: r() === i() }), Oi(o, `background: ${a() ?? ""}`), q(o, "title", e);
				}, [() => J("cp.tokenTitle", { name: i() })]), R("click", o, () => he(i(), a())), B(e, o);
			}), E(l), I((e) => V(a, e), [() => J("cp.themeColors")]), B(e, t);
		};
		H(v, (e) => {
			i().length && e(y);
		});
		var b = F(v, 2), x = M(b), S = F(x);
		E(b);
		var ne = F(b, 2), re = (e) => {
			var t = Ea();
			ri(t, 20, () => L(_), (e) => e, (e, t) => {
				var n = Ta(), r = M(n), i = F(r, 2);
				E(n), I((e) => {
					Oi(r, `background: ${t ?? ""}`), q(r, "title", t), q(i, "title", e);
				}, [() => J("cp.removeSaved")]), R("click", r, () => Se(t)), R("click", i, () => we(t)), B(e, n);
			}), E(t), B(e, t);
		};
		H(ne, (e) => {
			L(_).length && e(re);
		});
		var ie = F(ne, 2), ae = (e) => {
			var t = Oa(), n = N(t), r = P(n, !0), i = F(n, 2);
			ri(i, 20, () => L(g), (e) => e, (e, t) => {
				var n = Da();
				I(() => {
					Oi(n, `background: ${t ?? ""}`), q(n, "title", t);
				}), R("click", n, () => Se(t)), B(e, n);
			}), E(i), I((e) => V(r, e), [() => J("common.recent")]), B(e, t);
		};
		H(ie, (e) => {
			L(g).length && e(ae);
		}), I((e, t, r, i, c) => {
			Oi(n, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${L(C) ?? ""}, 100%, 50%)`), Oi(a, `left: ${L(w) * 100}%; top: ${(1 - L(T)) * 100}%`), K(o, L(C)), K(s, e), q(s, "title", t), Oi(s, `background: linear-gradient(to right, transparent, ${r ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), Oi(l, `background: ${L(te) ?? ""}`), K(u, L(te)), V(x, `${i ?? ""} `), q(S, "title", c);
		}, [
			() => Math.round(L(ee) * 100),
			() => J("cp.alpha"),
			() => oe(),
			() => J("cp.saved"),
			() => J("cp.saveTitle")
		]), R("pointerdown", n, ge), R("input", o, (e) => {
			j(C, Number(e.target.value), !0), ce();
		}), R("input", s, (e) => {
			j(ee, Number(e.target.value) / 100), ce();
		}), R("change", u, _e), R("click", S, Ce), B(e, t);
	}, r = qi(t, "value", 3, "#000000"), i = qi(t, "tokens", 19, () => []), a = qi(t, "label", 19, () => J("cp.pickColor")), o = qi(t, "allowClear", 3, !1), s = "urd-recent-colors", c = "urd-saved-colors", l = _a(), u = ya("urd-cp"), d = u.slice(2), f = /* @__PURE__ */ A(null), p = () => {
		let e = i().find(([e]) => e === r());
		return e ? e[1] : r();
	}, m = () => i().find(([e]) => e === r())?.[0] ?? null, g = /* @__PURE__ */ A(cn([])), _ = /* @__PURE__ */ A(cn([])), v = "", y = "", b = /* @__PURE__ */ A(null), x = /* @__PURE__ */ A(!1), S = /* @__PURE__ */ A(cn({
		top: 0,
		left: 0
	})), C = /* @__PURE__ */ A(0), w = /* @__PURE__ */ A(0), T = /* @__PURE__ */ A(1), ee = /* @__PURE__ */ A(1), te = /* @__PURE__ */ A("#000000");
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
		return re(...ae(L(C), L(w), L(T)));
	}
	function se() {
		let e = oe();
		return L(ee) >= .995 ? e : e + Math.round(L(ee) * 255).toString(16).padStart(2, "0");
	}
	function ce() {
		j(te, se(), !0), y = L(te), t.onchange?.(L(te));
	}
	function le(e) {
		let t = ne(e);
		return t ? (((e) => {
			var t = h(e, 3);
			j(C, t[0], !0), j(w, t[1], !0), j(T, t[2], !0);
		})(ie(t[0], t[1], t[2])), j(ee, t[3], !0), j(te, se(), !0), !0) : !1;
	}
	function ue() {
		le(p()) || le("#000000"), v = r(), y = "";
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
	function de(e) {
		e.newState === "open" ? (ue(), ba(L(b), !0), j(x, !0)) : L(x) && (ba(L(b), !1), j(x, !1), pe());
	}
	function fe() {
		ue();
		let e = L(b).getBoundingClientRect(), t = L(b).closest(".panel-body")?.getBoundingClientRect(), n = t ? t.right : window.innerWidth, r = Math.max(8, Math.min(e.right - 236, n - 236 - 8)), i = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		j(S, {
			top: i,
			left: r
		}, !0), j(x, !0);
	}
	function pe() {
		if (y && y !== v) {
			let e = [y, ...L(g).filter((e) => e !== y)].slice(0, 8);
			localStorage.setItem(s, JSON.stringify(e));
		}
	}
	function me() {
		if (l) {
			L(f)?.hidePopover();
			return;
		}
		j(x, !1), pe();
	}
	function he(e, n) {
		le(n), j(te, n, !0), t.onchange?.(e);
	}
	function ge(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			j(w, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), j(T, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), ce();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function _e(e) {
		le(e.target.value) ? ce() : j(te, oe(), !0);
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
			j(C, t[0], !0), j(w, t[1], !0), j(T, t[2], !0);
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
		L(_).includes(e) || (j(_, [e, ...L(_)].slice(0, 12), !0), localStorage.setItem(c, JSON.stringify(Ke(L(_)))));
	}
	function we(e) {
		j(_, L(_).filter((t) => t !== e), !0), localStorage.setItem(c, JSON.stringify(Ke(L(_))));
	}
	On(() => {
		if (!L(x)) return;
		let e = () => me();
		if (window.addEventListener("blur", e), l) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			L(b) && !L(b).contains(e.target) && me();
		}, n = (e) => {
			e.key === "Escape" && me();
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), () => {
			document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), window.removeEventListener("blur", e);
		};
	});
	var Te = Na(), Ee = M(Te);
	let De;
	var Oe = F(Ee, 2), ke = (e) => {
		var n = Aa();
		I((e, t) => {
			q(n, "title", e), q(n, "aria-label", t);
		}, [() => J("cp.clearTitle"), () => J("cp.clear")]), R("click", n, () => t.onchange?.("")), B(e, n);
	};
	H(Oe, (e) => {
		o() && r() && e(ke);
	});
	var Ae = F(Oe, 2), je = (e) => {
		var t = ja(), r = M(t), i = (e) => {
			n(e);
		};
		H(r, (e) => {
			L(x) && e(i);
		}), E(t), Ui(t, (e) => j(f, e), () => L(f)), I(() => {
			q(t, "id", d), Oi(t, `position-anchor: ${u ?? ""}`);
		}), Mr("toggle", t, de), R("click", t, (e) => e.preventDefault()), B(e, t);
	}, Me = (e) => {
		var t = Ma(), r = M(t);
		n(r), E(t), I(() => Oi(t, `top: ${L(S).top ?? ""}px; left: ${L(S).left ?? ""}px`)), R("click", t, (e) => e.preventDefault()), B(e, t);
	};
	H(Ae, (e) => {
		l ? e(je) : L(x) && e(Me, 1);
	}), E(Te), Ui(Te, (e) => j(b, e), () => L(b)), I((e, t, n) => {
		De = W(Ee, 1, "cp-swatch svelte-zxiloo", null, De, {
			linked: e,
			"cp-empty": o() && !r()
		}), Oi(Ee, `background: ${t ?? ""}${l ? `; anchor-name: ${u}` : ""}`), q(Ee, "title", n), q(Ee, "popovertarget", l ? d : void 0), q(Ee, "aria-label", a());
	}, [
		() => m(),
		() => r() ? p() : "transparent",
		() => m() ? J("cp.linkedTitle", {
			label: a(),
			token: m()
		}) : a()
	]), R("click", Ee, function(...e) {
		(l ? void 0 : () => L(x) ? me() : fe())?.apply(this, e);
	}), B(e, Te), tt();
}
Nr([
	"pointerdown",
	"input",
	"change",
	"click"
]);
//#endregion
//#region src/lib/previewBridge.js
function Fa(e, t = {}) {
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
var Ia = 400;
function La({ prepare: e, onHeight: t, title: n }) {
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
			}, clearTimeout(a), a = setTimeout(l, Ia);
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
var Ra = [
	"forEach",
	"isDisjointFrom",
	"isSubsetOf",
	"isSupersetOf"
], za = [
	"difference",
	"intersection",
	"symmetricDifference",
	"union"
], Ba = !1, Va = class e extends Set {
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ A(0);
	#n = /* @__PURE__ */ A(0);
	#r = dr || -1;
	constructor(e) {
		if (super(), e) {
			for (var t of e) super.add(t);
			this.#n.v = super.size;
		}
		Ba || this.#a();
	}
	#i(e) {
		return dr === this.#r ? /* @__PURE__ */ A(e) : $t(e);
	}
	#a() {
		Ba = !0;
		var t = e.prototype, n = Set.prototype;
		for (let e of Ra) t[e] = function(...t) {
			return L(this.#t), n[e].apply(this, t);
		};
		for (let r of za) t[r] = function(...t) {
			L(this.#t);
			var i = n[r].apply(this, t);
			return new e(i);
		};
	}
	has(e) {
		var t = super.has(e), n = this.#e, r = n.get(e);
		if (r === void 0) {
			if (!t) return L(this.#t), !1;
			r = this.#i(!0), n.set(e, r);
		}
		return L(r), t;
	}
	add(e) {
		return super.has(e) || (super.add(e), j(this.#n, super.size), on(this.#t)), this;
	}
	delete(e) {
		var t = super.delete(e), n = this.#e, r = n.get(e);
		return r !== void 0 && (n.delete(e), j(r, !1)), t && (j(this.#n, super.size), on(this.#t)), t;
	}
	clear() {
		if (super.size !== 0) {
			super.clear();
			var e = this.#e;
			for (var t of e.values()) j(t, !1);
			e.clear(), j(this.#n, 0), on(this.#t);
		}
	}
	keys() {
		return this.values();
	}
	values() {
		return L(this.#t), super.values();
	}
	entries() {
		return L(this.#t), super.entries();
	}
	[Symbol.iterator]() {
		return this.keys();
	}
	get size() {
		return L(this.#n);
	}
}, Ha = "urd-quick-row", Ua = ["fit", "phone"], Wa = {
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
function Ga(e) {
	return [...Wa[e] ?? [], ...Ua];
}
var Ka = Object.freeze({
	pinned: [],
	removed: []
});
function qa(e) {
	let t = (e) => Array.isArray(e) ? [...new Set(e.filter((e) => typeof e == "string" && e))] : [];
	return {
		pinned: t(e?.pinned),
		removed: t(e?.removed)
	};
}
function Ja(e, t, n) {
	let r = Ga(e).filter((e) => !t.removed.includes(e));
	for (let e of t.pinned) r.includes(e) || r.push(e);
	return r.filter((e) => n.has(e));
}
function Ya(e, t, n) {
	return Ga(e).includes(n) ? !t.removed.includes(n) : t.pinned.includes(n);
}
function Xa(e, t, n) {
	let r = Ga(e).includes(n);
	return Ya(e, t, n) ? r ? {
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
function Za(e) {
	return e.pinned.length > 0 || e.removed.length > 0;
}
function Qa(e) {
	try {
		let t = JSON.parse(e.getItem("urd-quick-row") ?? "{}");
		return !t || typeof t != "object" || Array.isArray(t) ? {} : Object.fromEntries(Object.entries(t).map(([e, t]) => [e, qa(t)]));
	} catch {
		return {};
	}
}
function $a(e, t) {
	let n = Object.fromEntries(Object.entries(t).filter(([, e]) => Za(e)));
	try {
		e.setItem(Ha, JSON.stringify(n));
	} catch {}
}
//#endregion
//#region src/menu/state.svelte.js
var eo = "urd-admin-menu-width", to = cn({
	widthPref: localStorage.getItem(eo) === "narrow" ? "narrow" : "wide",
	wide: localStorage.getItem(eo) !== "narrow",
	min: 8,
	room: Infinity,
	menuQuery: "",
	propsQuery: "",
	tab: "content"
});
function no() {
	return to.wide && to.room >= 740;
}
function ro(e) {
	to.widthPref = e === "narrow" ? "narrow" : "wide", to.wide = to.widthPref === "wide", to.widthPref === "narrow" ? localStorage.setItem(eo, "narrow") : localStorage.removeItem(eo);
}
function io(e) {
	to.min = Math.round(e) + 8, to.room = window.innerWidth - to.min - 8;
}
var ao = new Va(), oo = cn({ choices: Qa(localStorage) });
function so(e) {
	return oo.choices[e] ?? Ka;
}
function co(e, t) {
	oo.choices = {
		...oo.choices,
		[e]: t
	}, $a(localStorage, Ke(oo.choices));
}
function lo(e, t) {
	co(e, Xa(e, so(e), t));
}
//#endregion
//#region src/menu/options.js
var uo = () => [["on", J("common.on")], ["off", J("common.off")]], fo = () => [
	["canvas", J("opt.ribbonWidth.content")],
	["page", J("opt.ribbonWidth.page")],
	["content", J("opt.ribbonWidth.own")]
], po = (e) => e === "canvas" || e === "page" ? e : "content", mo = () => [
	["roll", J("opt.ribbonMotion.roll")],
	["sway", J("opt.ribbonMotion.sway")],
	["step", J("opt.ribbonMotion.step")],
	["none", J("opt.ribbonMotion.none")]
], ho = () => [
	["text", J("opt.ribbonStripe.text")],
	["marks", J("opt.ribbonStripe.marks")],
	["plain", J("opt.ribbonStripe.plain")]
], go = () => [["none", J("common.none")], ...ho()], _o = () => [
	["dot", J("opt.ribbonSep.dot")],
	["dash", J("opt.ribbonSep.dash")],
	["slash", J("opt.ribbonSep.slash")],
	["star", J("opt.ribbonSep.star")],
	["none", J("common.none")],
	["custom", J("opt.ribbonSep.custom")]
], vo = (e) => e.color || (e.variant === "plain" ? "text" : "accent-text"), yo = (e) => `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">${e}</svg>`, bo = {
	dot: yo("<circle cx=\"12\" cy=\"12\" r=\"3\"/>"),
	dash: yo("<rect x=\"3\" y=\"10.6\" width=\"18\" height=\"2.8\" rx=\"1.4\"/>"),
	slash: yo("<path d=\"M15.5 3.5L8.5 20.5\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\" fill=\"none\"/>"),
	star: yo("<path d=\"M12 2.8l2.3 6.1 6.5.4-5 4.1 1.6 6.3-5.4-3.5-5.4 3.5 1.6-6.3-5-4.1 6.5-.4z\"/>"),
	none: yo("<path d=\"M5 12h14\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\" opacity=\"0.35\"/><path d=\"M6 6l12 12\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>"),
	custom: yo("<path d=\"M5 8h14M5 12h9M5 16h12\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>")
}, xo = () => [
	["line", J("shape.line")],
	["arrow", J("shape.arrow")],
	["circle", J("shape.circle")],
	["rect", J("shape.rect")],
	["triangle", J("shape.triangle")]
], So = () => [
	["accent", J("color.accent")],
	["text", J("color.text")],
	["surface", J("color.surface")],
	["bg", J("color.bg")]
], Co = [
	["top-left", "opt.dock.topLeft"],
	["top-center", "opt.dock.topCenter"],
	["top-right", "opt.dock.topRight"],
	["middle-left", "opt.dock.middleLeft"],
	["middle-center", "opt.dock.middleCenter"],
	["middle-right", "opt.dock.middleRight"],
	["bottom-left", "opt.dock.bottomLeft"],
	["bottom-center", "opt.dock.bottomCenter"],
	["bottom-right", "opt.dock.bottomRight"]
], wo = /* @__PURE__ */ z("<span aria-hidden=\"true\"><svg viewBox=\"0 0 16 16\" width=\"1em\" height=\"1em\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"svelte-vtocc6\"><path d=\"M3.5 6l4.5 4.5L12.5 6\"></path></svg></span>"), To = /* @__PURE__ */ z("<span class=\"dd-note svelte-vtocc6\"> </span>"), Eo = /* @__PURE__ */ z("<button type=\"button\"> <!></button>"), Do = /* @__PURE__ */ z("<button type=\"button\"><span class=\"dd-value svelte-vtocc6\"> </span> <!></button> <div class=\"dd-pop dd-anchored svelte-vtocc6\" popover=\"auto\"><!></div>", 1), Oo = /* @__PURE__ */ z("<div class=\"dd-pop svelte-vtocc6\"></div>"), ko = /* @__PURE__ */ z("<button type=\"button\"><span class=\"dd-value svelte-vtocc6\"> </span> <!></button> <!>", 1), Ao = /* @__PURE__ */ z("<span class=\"dd svelte-vtocc6\"><!></span>");
function Y(e, t) {
	et(t, !0);
	let n = (e) => {
		var t = wo();
		let n;
		I(() => n = W(t, 1, "dd-caret svelte-vtocc6", null, n, { "dd-caret-open": L(f) })), B(e, t);
	}, r = qi(t, "value", 3, null), i = qi(t, "options", 19, () => []), a = qi(t, "title", 3, null), o = qi(t, "disabled", 3, !1), s = qi(t, "filled", 3, !1), c = qi(t, "compact", 3, !1), l = _a(), u = ya("urd-dd"), d = u.slice(2), f = /* @__PURE__ */ A(!1), p = /* @__PURE__ */ A(null), m = /* @__PURE__ */ A(null), g = /* @__PURE__ */ A(cn({
		top: 0,
		left: 0,
		width: 160
	})), _ = () => i().find(([e]) => `${e ?? ""}` == `${r() ?? ""}`)?.[1] ?? "";
	function v() {
		let e = L(p).getBoundingClientRect(), t = Math.min(320, i().reduce((e, t) => e + (t[2] ? 76 : 32), 12)), n = Math.max(e.width, 160), r = e.bottom + t + 8 <= window.innerHeight;
		j(g, {
			top: r ? e.bottom + 4 : Math.max(8, e.top - t - 4),
			left: Math.max(8, Math.min(e.left, window.innerWidth - n - 8)),
			width: n
		}, !0);
	}
	function y() {
		if (!o()) {
			if (L(f)) {
				j(f, !1);
				return;
			}
			v(), j(f, !0);
		}
	}
	function b(e) {
		l && L(m)?.hidePopover(), j(f, !1), t.onchange?.(e);
	}
	On(() => {
		if (!L(f)) return;
		let e = () => {
			l ? L(m)?.hidePopover() : j(f, !1);
		};
		if (window.addEventListener("blur", e), l) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			L(p) && !L(p).contains(e.target) && j(f, !1);
		}, n = (e) => {
			e.key === "Escape" && j(f, !1);
		}, r = (e) => {
			L(p) && e.target instanceof Node && !L(p).contains(e.target) && v();
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var x = Ao(), S = M(x), C = (e) => {
		var t = Do(), l = N(t);
		let p;
		var g = M(l), v = P(g, !0), y = F(g, 2);
		n(y), E(l);
		var x = F(l, 2), S = M(x), C = (e) => {
			var t = Hr();
			ri(N(t), 17, i, ([e, t, n]) => `${e ?? ""}`, (e, t) => {
				var n = /* @__PURE__ */ k(() => h(L(t), 3));
				let i = () => L(n)[0], a = () => L(n)[1], o = () => L(n)[2];
				var s = Eo();
				let c;
				var l = M(s, !0), u = F(l), d = (e) => {
					var t = To(), n = P(t, !0);
					I(() => V(n, o())), B(e, t);
				};
				H(u, (e) => {
					o() && e(d);
				}), E(s), I(() => {
					c = W(s, 1, "dd-opt svelte-vtocc6", null, c, { selected: `${i() ?? ""}` == `${r() ?? ""}` }), V(l, a());
				}), R("click", s, () => b(i())), B(e, s);
			}), B(e, t);
		};
		H(S, (e) => {
			L(f) && e(C);
		}), E(x), Ui(x, (e) => j(m, e), () => L(m)), I((e) => {
			p = W(l, 1, "dd-btn svelte-vtocc6", null, p, {
				"dd-filled": s(),
				"dd-compact": c()
			}), q(l, "title", a()), l.disabled = o(), q(l, "popovertarget", d), Oi(l, `anchor-name: ${u ?? ""}`), V(v, e), q(x, "id", d), Oi(x, `position-anchor: ${u ?? ""}`);
		}, [() => _()]), Mr("toggle", x, (e) => {
			j(f, e.newState === "open");
		}), B(e, t);
	}, w = (e) => {
		var t = ko(), l = N(t);
		let u;
		var d = M(l), p = P(d, !0), m = F(d, 2);
		n(m), E(l);
		var v = F(l, 2), x = (e) => {
			var t = Oo();
			ri(t, 21, i, ([e, t, n]) => `${e ?? ""}`, (e, t) => {
				var n = /* @__PURE__ */ k(() => h(L(t), 3));
				let i = () => L(n)[0], a = () => L(n)[1], o = () => L(n)[2];
				var s = Eo();
				let c;
				var l = M(s, !0), u = F(l), d = (e) => {
					var t = To(), n = P(t, !0);
					I(() => V(n, o())), B(e, t);
				};
				H(u, (e) => {
					o() && e(d);
				}), E(s), I(() => {
					c = W(s, 1, "dd-opt svelte-vtocc6", null, c, { selected: `${i() ?? ""}` == `${r() ?? ""}` }), V(l, a());
				}), R("click", s, () => b(i())), B(e, s);
			}), E(t), I(() => Oi(t, `top: ${L(g).top ?? ""}px; left: ${L(g).left ?? ""}px; min-width: ${L(g).width ?? ""}px`)), B(e, t);
		};
		H(v, (e) => {
			L(f) && e(x);
		}), I((e) => {
			u = W(l, 1, "dd-btn svelte-vtocc6", null, u, {
				"dd-filled": s(),
				"dd-compact": c()
			}), q(l, "title", a()), l.disabled = o(), V(p, e);
		}, [() => _()]), R("click", l, y), B(e, t);
	};
	H(S, (e) => {
		l ? e(C) : e(w, -1);
	}), E(x), Ui(x, (e) => j(p, e), () => L(p)), B(e, x), tt();
}
Nr(["click"]);
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
}, jo = /* @__PURE__ */ z("<button type=\"button\"></button>");
function Mo(e, t) {
	et(t, !0);
	let n = Qe("urd-editor"), r = /* @__PURE__ */ k(() => n.selectedBlock.type), i = /* @__PURE__ */ k(() => Ya(L(r), so(L(r)), t.id));
	var a = jo();
	let o;
	U(a, () => L(i) ? X.pinOn : X.pin, !0), E(a), I((e, t) => {
		o = W(a, 1, "menu-pin", null, o, { on: L(i) }), q(a, "aria-pressed", L(i)), q(a, "title", e), q(a, "aria-label", t);
	}, [() => L(i) ? J("menu.unpin") : J("menu.pin"), () => L(i) ? J("menu.unpin") : J("menu.pin")]), R("click", a, () => lo(L(r), t.id)), B(e, a), tt();
}
Nr(["click"]);
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
var Vc = /* @__PURE__ */ z("<i class=\"menu-group-dot\" aria-hidden=\"true\"></i>"), Hc = /* @__PURE__ */ z("<button type=\"button\" class=\"linkish menu-group-reset\"> </button>"), Uc = /* @__PURE__ */ z("<details class=\"group menu-group\"><summary><!><span class=\"menu-group-title\"> </span><span class=\"menu-group-value\"> </span></summary> <div class=\"group-items\"><!> <!></div></details>");
function Wc(e, t) {
	et(t, !0);
	let n = qi(t, "reset", 3, null);
	var r = Uc(), i = M(r), a = M(i), o = (e) => {
		B(e, Vc());
	};
	H(a, (e) => {
		n() && e(o);
	});
	var s = F(a), c = P(s, !0), l = P(F(s), !0);
	E(i);
	var u = F(i, 2), d = M(u);
	li(d, () => t.children);
	var f = F(d, 2), p = (e) => {
		var t = Hc(), r = P(t, !0);
		I((e) => V(r, e), [() => J("menu.reset")]), R("click", t, function(...e) {
			n()?.apply(this, e);
		}), B(e, t);
	};
	H(f, (e) => {
		n() && e(p);
	}), E(u), E(r), I((e) => {
		r.open = e, V(c, t.title), V(l, t.value);
	}, [() => ao.has(t.id)]), Mr("toggle", r, (e) => {
		e.currentTarget.closest(".emenu-search") || (e.currentTarget.open ? ao.add(t.id) : ao.delete(t.id));
	}), B(e, r), tt();
}
Nr(["click"]);
//#endregion
//#region src/menu/Placement.svelte
var Gc = /* @__PURE__ */ z("<div class=\"frame-grid\"><label> <input type=\"number\"/></label> <label> <input type=\"number\"/></label></div>"), Kc = /* @__PURE__ */ z("<div class=\"ctl-row\"><span class=\"mini-label\"> </span> <input type=\"range\" step=\"5\"/> <span class=\"gridmenu-value\"> </span> <!></div> <!>", 1), qc = /* @__PURE__ */ z("<div class=\"ctl-row\"><span class=\"mini-label\"> </span> <input type=\"range\" min=\"1\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div>"), Jc = /* @__PURE__ */ z("<div class=\"pin-line\"><label> <!></label> <!></div> <!>", 1), Yc = /* @__PURE__ */ z("<label> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\"/></label> <label> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\"/></label>", 1), Xc = /* @__PURE__ */ z("<label> <!></label> <!> <label> <!></label>", 1), Zc = /* @__PURE__ */ z("<label> <input type=\"number\" min=\"0\" max=\"400\"/></label>"), Qc = /* @__PURE__ */ z("<label> <!></label>"), $c = /* @__PURE__ */ z("<label> <!></label> <!> <!>", 1), el = /* @__PURE__ */ z("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!>", 1), tl = /* @__PURE__ */ z("<div class=\"frame-grid\"><label> <input type=\"number\" step=\"0.5\"/></label> <label> <input type=\"number\" step=\"1\"/></label> <label> <input type=\"number\" step=\"0.5\" min=\"1\"/></label> <label> <input type=\"number\" step=\"1\" min=\"1\"/></label> <label> <input type=\"number\" step=\"1\"/></label> <label> <input type=\"number\" step=\"1\"/></label></div>"), nl = /* @__PURE__ */ z("<!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), rl = /* @__PURE__ */ z("<label> <!></label> <!>", 1), il = /* @__PURE__ */ z("<!> <!> <!> <div class=\"pin-line\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div> <!> <!> <!>", 1);
function al(e, t) {
	et(t, !0);
	let n = (e) => {
		var t = Kc(), n = N(t), r = M(n), i = P(r, !0), a = F(r, 2);
		G(a);
		var o = F(a, 2), l = P(o);
		Mo(F(o, 2), { id: "size" }), E(n);
		var u = F(n, 2), d = (e) => {
			var t = Gc(), n = M(t), r = M(n, !0), i = F(r);
			G(i), E(n);
			var a = F(n, 2), o = M(a, !0), s = F(o);
			G(s), E(a), E(t), I((e, t, c, l, u, d) => {
				q(n, "title", e), V(r, t), q(i, "min", wc.min), q(i, "max", wc.max), K(i, c), q(a, "title", l), V(o, u), q(s, "min", wc.min), q(s, "max", wc.max), K(s, d);
			}, [
				() => J("tip.scaleMin"),
				() => J("lbl.scaleMin"),
				() => Ec(L(c)).min,
				() => J("tip.scaleMax"),
				() => J("lbl.scaleMax"),
				() => Ec(L(c)).max
			]), R("change", i, (e) => g("sizeMin", e.target.value)), R("change", s, (e) => g("sizeMax", e.target.value)), B(e, t);
		}, f = /* @__PURE__ */ k(() => Tc(L(c)) !== 1);
		H(u, (e) => {
			L(f) && e(d);
		}), I((e, t, r, o, s) => {
			q(n, "title", e), V(i, t), q(a, "min", Cc.min * 100), q(a, "max", Cc.max * 100), K(a, r), q(a, "aria-label", o), V(l, `${s ?? ""} %`);
		}, [
			() => J("tip.scale"),
			() => J("lbl.scale"),
			() => Math.round(Tc(L(c)) * 100),
			() => J("lbl.scale"),
			() => Math.round(Tc(L(c)) * 100)
		]), R("input", a, (e) => h(e.target.valueAsNumber / 100)), R("change", a, function(...e) {
			s.endSizeGesture?.apply(this, e);
		}), B(e, t);
	}, r = (e) => {
		var t = Jc(), n = N(t), r = M(n), i = M(r), a = F(i);
		{
			let e = /* @__PURE__ */ k(() => L(c).fit ?? "wrap"), t = /* @__PURE__ */ k(() => xc.has(L(c).type) ? [["wrap", J("opt.fit.fluid")], ["shrink", J("opt.fit.floor")]] : [
				["wrap", J("opt.fit.wrap")],
				...ne() || L(c).fit === "shrink" ? [["shrink", J("opt.fit.shrink")]] : [],
				["both", J("opt.fit.both")]
			]);
			Y(a, {
				get value() {
					return L(e);
				},
				get options() {
					return L(t);
				},
				onchange: (e) => p(e)
			});
		}
		E(r), Mo(F(r, 2), { id: "fit" }), E(n);
		var o = F(n, 2), s = (e) => {
			var t = qc(), n = M(t), r = P(n, !0), i = F(n, 2);
			G(i);
			var a = P(F(i, 2));
			E(t), I((e, n, o, s) => {
				q(t, "title", e), V(r, n), K(i, o), V(a, `${s ?? ""} %`);
			}, [
				() => J("tip.fitMin"),
				() => J("lbl.fitMin"),
				() => Math.round((L(c).fitMin ?? .6) * 100),
				() => Math.round((L(c).fitMin ?? .6) * 100)
			]), R("input", i, (e) => m(e.target.valueAsNumber / 100)), B(e, t);
		};
		H(o, (e) => {
			L(c).fit && e(s);
		}), I((e, t) => {
			q(r, "title", e), V(i, `${t ?? ""} `);
		}, [() => J("tip.fit"), () => J("lbl.fit")]), B(e, t);
	}, i = (e) => {
		var t = Xc(), n = N(t), r = M(n), i = F(r);
		{
			let e = /* @__PURE__ */ k(() => T(L(c).animation) ? L(c).animation.type : ""), t = /* @__PURE__ */ k(ee);
			Y(i, {
				get value() {
					return L(e);
				},
				get options() {
					return L(t);
				},
				onchange: (e) => S(e || null)
			});
		}
		E(n);
		var a = F(n, 2), o = (e) => {
			var t = Yc(), n = N(t), r = M(n), i = F(r);
			G(i), E(n);
			var a = F(n, 2), o = M(a), s = F(o);
			G(s), E(a), I((e, t) => {
				V(r, `${e ?? ""} `), K(i, L(c).animation.props.duration), V(o, `${t ?? ""} `), K(s, L(c).animation.props.delay);
			}, [() => J("lbl.durationMs"), () => J("lbl.delayMs")]), R("change", i, (e) => w("duration", Number(e.target.value))), R("change", s, (e) => w("delay", Number(e.target.value))), B(e, t);
		}, s = /* @__PURE__ */ k(() => T(L(c).animation));
		H(a, (e) => {
			L(s) && e(o);
		});
		var l = F(a, 2), u = M(l), d = F(u);
		{
			let e = /* @__PURE__ */ k(() => L(c).hover?.type ?? (L(c).animation && !T(L(c).animation) ? L(c).animation.type : "")), t = /* @__PURE__ */ k(te);
			Y(d, {
				get value() {
					return L(e);
				},
				get options() {
					return L(t);
				},
				onchange: (e) => C(e || null)
			});
		}
		E(l), I((e, t, i, a) => {
			q(n, "title", e), V(r, `${t ?? ""} `), q(l, "title", i), V(u, `${a ?? ""} `);
		}, [
			() => J("tip.props.blockAnim"),
			() => J("lbl.animIn"),
			() => J("tip.props.blockHover"),
			() => J("lbl.onHover")
		]), B(e, t);
	}, a = (e) => {
		var t = Hr(), n = N(t), r = (e) => {
			var t = el(), n = N(t), r = M(n);
			G(r);
			var i = F(r);
			E(n);
			var a = F(n, 2), o = (e) => {
				var t = $c(), n = N(t), r = M(n), i = F(r);
				{
					let e = /* @__PURE__ */ k(() => L(c).sticky.mode ?? "scroll"), t = /* @__PURE__ */ k(() => [["scroll", J("opt.sticky.modeScroll")], ["screen", J("opt.sticky.modeScreen")]]);
					Y(i, {
						get value() {
							return L(e);
						},
						get options() {
							return L(t);
						},
						onchange: (e) => d(`edit:${L(c).blockId}`, (t) => {
							t.sticky = {
								...t.sticky,
								mode: e
							};
						})
					});
				}
				E(n);
				var a = F(n, 2), o = (e) => {
					var t = Zc(), n = M(t), r = F(n);
					G(r), E(t), I((e, i) => {
						q(t, "title", e), V(n, `${i ?? ""} `), K(r, L(c).sticky.offset ?? 16);
					}, [() => L(c).sticky.mode === "screen" ? J("tip.stickyEdge") : J("tip.stickyOffset"), () => L(c).sticky.mode === "screen" ? J("lbl.stickyEdge") : J("lbl.stickyOffset")]), R("change", r, (e) => d(`edit:${L(c).blockId}`, (t) => {
						t.sticky = {
							...t.sticky,
							offset: Math.max(0, Number(e.target.value) || 0)
						};
					})), B(e, t);
				};
				H(a, (e) => {
					(L(c).sticky.mode !== "screen" || (L(c).sticky.dock ?? "bottom-right") !== "middle-center") && e(o);
				});
				var s = F(a, 2), l = (e) => {
					var t = Qc(), n = M(t), r = F(n);
					{
						let e = /* @__PURE__ */ k(() => L(c).sticky.dock ?? "bottom-right"), t = /* @__PURE__ */ k(() => Co.map(([e, t]) => [e, J(t)]));
						Y(r, {
							get value() {
								return L(e);
							},
							get options() {
								return L(t);
							},
							onchange: (e) => d(`edit:${L(c).blockId}`, (t) => {
								t.sticky = {
									...t.sticky,
									dock: e
								};
							})
						});
					}
					E(t), I((e, r) => {
						q(t, "title", e), V(n, `${r ?? ""} `);
					}, [() => J("tip.stickyDock"), () => J("lbl.stickyDock")]), B(e, t);
				}, u = (e) => {
					var t = Qc(), n = M(t), r = F(n);
					{
						let e = /* @__PURE__ */ k(() => L(c).sticky.until ?? ""), t = /* @__PURE__ */ k(ie);
						Y(r, {
							get value() {
								return L(e);
							},
							get options() {
								return L(t);
							},
							onchange: (e) => d(`edit:${L(c).blockId}`, (t) => {
								t.sticky = {
									...t.sticky,
									until: e || null
								};
							})
						});
					}
					E(t), I((e, r) => {
						q(t, "title", e), V(n, `${r ?? ""} `);
					}, [() => J("tip.stickyUntil"), () => J("lbl.stickyUntil")]), B(e, t);
				};
				H(s, (e) => {
					L(c).sticky.mode === "screen" ? e(l) : e(u, -1);
				}), I((e, t) => {
					q(n, "title", e), V(r, `${t ?? ""} `);
				}, [() => J("tip.stickyMode"), () => J("lbl.stickyMode")]), B(e, t);
			};
			H(a, (e) => {
				L(c).sticky && e(o);
			}), I((e, t, a) => {
				q(n, "title", e), Ni(r, t), V(i, ` ${a ?? ""}`);
			}, [
				() => J("tip.sticky"),
				() => !!L(c).sticky,
				() => J("lbl.sticky")
			]), R("change", r, (e) => d(`edit:${L(c).blockId}`, (t) => {
				t.sticky = e.target.checked ? {
					offset: 16,
					until: null
				} : null;
			})), B(e, t);
		};
		H(n, (e) => {
			L(l) === "desktop" && e(r);
		}), B(e, t);
	}, o = (e) => {
		var t = nl(), n = N(t), r = (e) => {
			var t = tl(), n = M(t), r = M(n, !0), i = F(r);
			G(i), E(n);
			var a = F(n, 2), o = M(a, !0), s = F(o);
			G(s), E(a);
			var l = F(a, 2), u = M(l, !0), d = F(u);
			G(d), E(l);
			var p = F(l, 2), m = M(p, !0), h = F(m);
			G(h), E(p);
			var g = F(p, 2), _ = M(g, !0), v = F(_);
			G(v), E(g);
			var y = F(g, 2), b = M(y, !0), x = F(b);
			G(x), E(y), E(t), I((e, t, n, a, l, f, p) => {
				V(r, e), K(i, L(c).frame.x), V(o, t), K(s, L(c).frame.y), V(u, n), K(d, L(c).frame.w), V(m, a), K(h, L(c).frame.h), q(g, "title", l), V(_, f), K(v, L(c).frame.z ?? 1), V(b, p), K(x, L(c).frame.rot ?? 0);
			}, [
				() => J("frame.x"),
				() => J("frame.y"),
				() => J("frame.w"),
				() => J("frame.h"),
				() => J("tip.frameZ"),
				() => J("frame.z"),
				() => J("frame.rot")
			]), R("change", i, (e) => f("x", Number(e.target.value))), R("change", s, (e) => f("y", Number(e.target.value))), R("change", d, (e) => f("w", Number(e.target.value))), R("change", h, (e) => f("h", Number(e.target.value))), R("change", v, (e) => f("z", Number(e.target.value))), R("change", x, (e) => f("rot", Number(e.target.value))), B(e, t);
		};
		H(n, (e) => {
			L(l) === "desktop" && e(r);
		});
		var i = F(n, 2), a = M(i);
		G(a);
		var o = F(a);
		E(i), I((e, t) => {
			q(i, "title", e), Ni(a, L(c).decor), V(o, ` ${t ?? ""}`);
		}, [() => J("tip.decor"), () => J("lbl.decor")]), R("change", a, (e) => x(e.target.checked)), B(e, t);
	}, s = Qe("urd-editor"), c = /* @__PURE__ */ k(() => s.selectedBlock), l = /* @__PURE__ */ k(() => s.viewMode), u = /* @__PURE__ */ k(() => s.sections), { mutateBlock: d, setBlockFrame: f, setBlockFit: p, setBlockFitMin: m, setBlockSize: h, setBlockSizeBound: g, setBlockHeightMode: _, setBlockHeightAlign: v, canStretch: y, setBlockHideMobile: b, setBlockDecor: x, setBlockAnimation: S, setBlockHover: C, setBlockAnimProp: w, isEntrance: T, blockEntranceOptions: ee, hoverOptions: te, designWidth: ne } = s;
	function re() {
		let e = T(L(c).animation) ? L(c).animation.type : L(c).hover?.type, t = e ? [...ee(), ...te()].find(([t]) => t === e) : null;
		return t ? t[1] : J("common.none");
	}
	function ie() {
		let e = L(u).findIndex((e) => e.id === L(c)?.sectionId);
		return e < 0 ? [["", J("opt.sticky.ownSection")]] : [["", J("opt.sticky.ownSection")], ...L(u).slice(e + 1).map((t, n) => [t.id, J("opt.sticky.atSection", { n: e + 2 + n })])];
	}
	var ae = il(), oe = N(ae), se = (e) => {
		var t = rl(), n = N(t), r = M(n), i = F(r);
		{
			let e = /* @__PURE__ */ k(() => L(c).height?.mode === "own" ? "own" : "content"), t = /* @__PURE__ */ k(() => [["content", J("opt.height.content")], ["own", J("opt.height.own")]]);
			Y(i, {
				get value() {
					return L(e);
				},
				get options() {
					return L(t);
				},
				onchange: (e) => _(e)
			});
		}
		E(n);
		var a = F(n, 2), o = (e) => {
			let t = /* @__PURE__ */ k(() => [
				"middle",
				"bottom",
				"stretch"
			].includes(L(c).height.align) ? L(c).height.align : "top");
			var n = Qc(), r = M(n), i = F(r);
			{
				let e = /* @__PURE__ */ k(() => [
					["top", J("opt.heightAlign.top")],
					["middle", J("opt.heightAlign.middle")],
					["bottom", J("opt.heightAlign.bottom")],
					...y() || L(t) === "stretch" ? [["stretch", J("opt.heightAlign.stretch")]] : []
				]);
				Y(i, {
					get value() {
						return L(t);
					},
					get options() {
						return L(e);
					},
					onchange: (e) => v(e)
				});
			}
			E(n), I((e, t) => {
				q(n, "title", e), V(r, `${t ?? ""} `);
			}, [() => J("tip.heightAlign"), () => J("lbl.heightAlign")]), B(e, n);
		};
		H(a, (e) => {
			L(c).height?.mode === "own" && e(o);
		}), I((e, t) => {
			q(n, "title", e), V(r, `${t ?? ""} `);
		}, [() => J("tip.height"), () => J("lbl.height")]), B(e, t);
	}, ce = /* @__PURE__ */ k(() => _c.has(L(c).type));
	H(oe, (e) => {
		L(ce) && e(se);
	});
	var le = F(oe, 2), ue = (e) => {
		n(e);
	}, de = /* @__PURE__ */ k(() => !Sc.has(L(c).type));
	H(le, (e) => {
		L(de) && e(ue);
	});
	var fe = F(le, 2);
	r(fe);
	var pe = F(fe, 2), me = M(pe), he = M(me);
	G(he);
	var ge = F(he);
	E(me), Mo(F(me, 2), { id: "phone" }), E(pe);
	var _e = F(pe, 2);
	a(_e);
	var ve = F(_e, 2);
	{
		let e = /* @__PURE__ */ k(() => J("group.motion")), t = /* @__PURE__ */ k(re);
		Wc(ve, {
			id: "motion",
			get title() {
				return L(e);
			},
			get value() {
				return L(t);
			},
			children: (e, t) => {
				i(e);
			},
			$$slots: { default: !0 }
		});
	}
	var ye = F(ve, 2);
	{
		let e = /* @__PURE__ */ k(() => J("group.placement")), t = /* @__PURE__ */ k(() => L(l) === "desktop" ? `${L(c).frame.w} % × ${L(c).frame.h}` : "");
		Wc(ye, {
			id: "frame",
			get title() {
				return L(e);
			},
			get value() {
				return L(t);
			},
			children: (e, t) => {
				o(e);
			},
			$$slots: { default: !0 }
		});
	}
	I((e, t) => {
		q(me, "title", e), Ni(he, L(c).hideMobile), V(ge, ` ${t ?? ""}`);
	}, [() => J("tip.hideMobile"), () => J("lbl.hideMobile")]), R("change", he, (e) => b(e.target.checked)), B(e, ae), tt();
}
Nr(["input", "change"]);
//#endregion
//#region src/menu/BoxStyle.svelte
var ol = /* @__PURE__ */ z("<label> <!></label>"), sl = /* @__PURE__ */ z("<label> <!></label> <label> <span class=\"num-stepper\"><button type=\"button\">−</button> <input type=\"number\" min=\"1\" max=\"12\" step=\"1\"/> <button type=\"button\">+</button></span></label>", 1), cl = /* @__PURE__ */ z("<label> <!></label> <label> <!></label> <!> <label> <!></label> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1);
function ll(e, t) {
	et(t, !0);
	let n = Qe("urd-editor"), r = /* @__PURE__ */ k(() => n.selectedBlock), { setBoxStyle: i, themeSwatches: a } = n, o = /* @__PURE__ */ k(() => L(r).props.boxStyle ?? {});
	var s = cl(), c = N(s), l = M(c), u = F(l);
	{
		let e = /* @__PURE__ */ k(() => L(o).bg ?? ""), t = /* @__PURE__ */ k(a), n = /* @__PURE__ */ k(() => J("tip.box.bg"));
		Pa(u, {
			get value() {
				return L(e);
			},
			get tokens() {
				return L(t);
			},
			allowClear: !0,
			get label() {
				return L(n);
			},
			onchange: (e) => i({ bg: e || null })
		});
	}
	E(c);
	var d = F(c, 2), f = M(d), p = F(f);
	{
		let e = /* @__PURE__ */ k(() => L(o).shadow ?? ""), t = /* @__PURE__ */ k(() => [
			["", J("common.none")],
			["soft", J("opt.shadow.soft")],
			["strong", J("opt.shadow.strong")]
		]);
		Y(p, {
			get value() {
				return L(e);
			},
			get options() {
				return L(t);
			},
			onchange: (e) => i({ shadow: e || null })
		});
	}
	E(d);
	var m = F(d, 2), h = (e) => {
		var t = ol(), n = M(t), r = F(n);
		{
			let e = /* @__PURE__ */ k(() => L(o).shadowColor ?? ""), t = /* @__PURE__ */ k(a), n = /* @__PURE__ */ k(() => J("tip.box.shadowColor"));
			Pa(r, {
				get value() {
					return L(e);
				},
				get tokens() {
					return L(t);
				},
				allowClear: !0,
				get label() {
					return L(n);
				},
				onchange: (e) => i({ shadowColor: e || null })
			});
		}
		E(t), I((e) => V(n, `${e ?? ""} `), [() => J("lbl.shadowColor")]), B(e, t);
	};
	H(m, (e) => {
		L(o).shadow && e(h);
	});
	var g = F(m, 2), _ = M(g), v = F(_);
	{
		let e = /* @__PURE__ */ k(() => L(o).border === "none" ? "none" : L(o).border ? "custom" : ""), t = /* @__PURE__ */ k(() => [
			["", J("opt.border.theme")],
			["none", J("common.none")],
			["custom", J("opt.border.custom")]
		]);
		Y(v, {
			get value() {
				return L(e);
			},
			get options() {
				return L(t);
			},
			onchange: (e) => i({ border: e === "custom" ? {
				color: "accent",
				width: 1
			} : e || null })
		});
	}
	E(g);
	var y = F(g, 2), b = (e) => {
		let t = /* @__PURE__ */ k(() => typeof L(o).border == "object" ? L(o).border : {
			color: "text",
			width: 1
		});
		var n = sl(), r = N(n), s = M(r), c = F(s);
		{
			let e = /* @__PURE__ */ k(a), n = /* @__PURE__ */ k(() => J("tip.box.borderColor"));
			Pa(c, {
				get value() {
					return L(t).color;
				},
				get tokens() {
					return L(e);
				},
				get label() {
					return L(n);
				},
				onchange: (e) => i({ border: {
					...L(t),
					color: e
				} })
			});
		}
		E(r);
		var l = F(r, 2), u = M(l), d = F(u), f = M(d), p = F(f, 2);
		G(p);
		var m = F(p, 2);
		E(d), E(l), I((e, n, r, i, a, o) => {
			V(s, `${e ?? ""} `), V(u, `${n ?? ""} `), q(f, "title", r), q(f, "aria-label", i), K(p, L(t).width), q(m, "title", a), q(m, "aria-label", o);
		}, [
			() => J("lbl.borderColor"),
			() => J("lbl.thicknessPx"),
			() => J("tip.thinner"),
			() => J("tip.thinner"),
			() => J("tip.thicker"),
			() => J("tip.thicker")
		]), R("click", f, () => i({ border: {
			...L(t),
			width: Math.max(1, L(t).width - 1)
		} })), R("change", p, (e) => i({ border: {
			...L(t),
			width: Math.min(12, Math.max(1, Number(e.target.value) || 1))
		} })), R("click", m, () => i({ border: {
			...L(t),
			width: Math.min(12, L(t).width + 1)
		} })), B(e, n);
	};
	H(y, (e) => {
		L(o).border !== "none" && e(b);
	});
	var x = F(y, 2), S = M(x);
	G(S);
	var C = F(S);
	E(x), I((e, t, n, r, i, a) => {
		V(l, `${e ?? ""} `), V(f, `${t ?? ""} `), V(_, `${n ?? ""} `), q(x, "title", r), Ni(S, i), V(C, ` ${a ?? ""}`);
	}, [
		() => J("lbl.blockColor"),
		() => J("lbl.shadow"),
		() => J("lbl.border"),
		() => J("tip.box.glass"),
		() => !!L(o).glass,
		() => J("lbl.glass")
	]), R("change", S, (e) => i({ glass: e.target.checked || null })), B(e, s), tt();
}
Nr(["click", "change"]);
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
var dl = /* @__PURE__ */ z("<p class=\"panel-hint\"> </p>"), fl = /* @__PURE__ */ z("<div class=\"pin-line\"><label> <!></label> <!></div>"), pl = /* @__PURE__ */ z("<div class=\"pin-line\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div> <!>", 1), ml = /* @__PURE__ */ z("<!> <!>", 1);
function hl(e, t) {
	et(t, !0);
	let n = Qe("urd-editor"), r = /* @__PURE__ */ k(() => n.selectedBlock), { setBlockProp: i, setBlockProps: a } = n, { groupReset: o, groupChanged: s } = ul(() => L(r).props, a);
	var c = Hr(), l = N(c), u = (e) => {
		var t = dl(), n = P(t, !0);
		I((e) => V(n, e), [() => J("hint.textInline")]), B(e, t);
	}, d = (e) => {
		let t = (e) => {
			var t = fl(), n = M(t), a = M(n), o = F(a);
			{
				let e = /* @__PURE__ */ k(() => L(r).props.align ?? "left"), t = /* @__PURE__ */ k(() => [
					["left", J("common.left")],
					["center", J("common.center")],
					["right", J("common.right")]
				]);
				Y(o, {
					get value() {
						return L(e);
					},
					get options() {
						return L(t);
					},
					onchange: (e) => i("align", e)
				});
			}
			E(n), Mo(F(n, 2), { id: "align" }), E(t), I((e) => V(a, `${e ?? ""} `), [() => J("lbl.align")]), B(e, t);
		}, n = (e) => {
			var t = pl(), n = N(t), a = M(n), o = M(a);
			G(o);
			var s = F(o);
			E(a), Mo(F(a, 2), { id: "textBox" }), E(n);
			var c = F(n, 2), l = (e) => {
				ll(e, {});
			};
			H(c, (e) => {
				L(r).props.box && e(l);
			}), I((e, t) => {
				Ni(o, e), V(s, ` ${t ?? ""}`);
			}, [() => !!L(r).props.box, () => J("lbl.textBoxToggle")]), R("change", o, (e) => i("box", e.target.checked)), B(e, t);
		};
		var a = ml(), s = N(a);
		{
			let e = /* @__PURE__ */ k(() => J("lbl.align")), n = /* @__PURE__ */ k(() => ({
				left: J("common.left"),
				center: J("common.center"),
				right: J("common.right")
			})[L(r).props.align ?? "left"]), i = /* @__PURE__ */ k(() => o("text-align", { align: "left" }));
			Wc(s, {
				id: "text-align",
				get title() {
					return L(e);
				},
				get value() {
					return L(n);
				},
				get reset() {
					return L(i);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var c = F(s, 2);
		{
			let e = /* @__PURE__ */ k(() => J("group.textBox")), t = /* @__PURE__ */ k(() => L(r).props.box ? J("common.on") : J("common.off")), i = /* @__PURE__ */ k(() => o("text-box", {
				box: !1,
				boxStyle: null
			}));
			Wc(c, {
				id: "text-box",
				get title() {
					return L(e);
				},
				get value() {
					return L(t);
				},
				get reset() {
					return L(i);
				},
				children: (e, t) => {
					n(e);
				},
				$$slots: { default: !0 }
			});
		}
		B(e, a);
	};
	H(l, (e) => {
		t.area === "content" ? e(u) : t.area === "style" && e(d, 1);
	}), B(e, c), tt();
}
Nr(["change"]);
//#endregion
//#region src/menu/families/Button.svelte
var gl = /* @__PURE__ */ z("<input/>"), _l = /* @__PURE__ */ z("<label> <input/></label> <div class=\"pin-line\"><label> <!></label> <!></div> <!>", 1), vl = /* @__PURE__ */ z("<div class=\"pin-line\"><label> <!></label> <!></div>");
function yl(e, t) {
	et(t, !0);
	let n = Qe("urd-editor"), r = /* @__PURE__ */ k(() => n.selectedBlock), { setBlockProp: i, setBlockProps: a, buttonTargets: o, setButtonTarget: s } = n, { groupReset: c, groupChanged: l } = ul(() => L(r).props, a);
	var u = Hr(), d = N(u), f = (e) => {
		let t = (e) => {
			var t = _l(), n = N(t), a = M(n), c = F(a);
			G(c), E(n);
			var l = F(n, 2), u = M(l), d = M(u), f = F(d);
			{
				let e = /* @__PURE__ */ k(() => L(r).props.page ?? "__href"), t = /* @__PURE__ */ k(o);
				Y(f, {
					get value() {
						return L(e);
					},
					get options() {
						return L(t);
					},
					get onchange() {
						return s;
					}
				});
			}
			E(u), Mo(F(u, 2), { id: "goesTo" }), E(l);
			var p = F(l, 2), m = (e) => {
				var t = gl();
				G(t), I((e) => {
					q(t, "placeholder", e), K(t, L(r).props.href === "#" ? "" : L(r).props.href ?? "");
				}, [() => J("ph.url")]), R("change", t, (e) => i("href", e.target.value || null)), B(e, t);
			};
			H(p, (e) => {
				L(r).props.page || e(m);
			}), I((e, t) => {
				V(a, `${e ?? ""} `), K(c, L(r).props.label), V(d, `${t ?? ""} `);
			}, [() => J("blocks.text"), () => J("lbl.goesTo")]), R("change", c, (e) => i("label", e.target.value)), B(e, t);
		};
		{
			let n = /* @__PURE__ */ k(() => J("group.textLink")), i = /* @__PURE__ */ k(() => o().find(([e]) => e === (L(r).props.page ?? "__href"))?.[1] ?? "");
			Wc(e, {
				id: "btn-link",
				get title() {
					return L(n);
				},
				get value() {
					return L(i);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	}, p = (e) => {
		let t = (e) => {
			var t = vl(), n = M(t), a = M(n), o = F(a);
			{
				let e = /* @__PURE__ */ k(() => [["primary", J("opt.btn.primary")], ["secondary", J("opt.btn.secondary")]]);
				Y(o, {
					get value() {
						return L(r).props.style;
					},
					get options() {
						return L(e);
					},
					onchange: (e) => i("style", e)
				});
			}
			E(n), Mo(F(n, 2), { id: "btnStyle" }), E(t), I((e) => V(a, `${e ?? ""} `), [() => J("lbl.style")]), B(e, t);
		};
		{
			let n = /* @__PURE__ */ k(() => J("group.appearance")), i = /* @__PURE__ */ k(() => L(r).props.style === "secondary" ? J("opt.btn.secondary") : J("opt.btn.primary")), a = /* @__PURE__ */ k(() => c("btn-look", { style: "primary" }));
			Wc(e, {
				id: "btn-look",
				get title() {
					return L(n);
				},
				get value() {
					return L(i);
				},
				get reset() {
					return L(a);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	};
	H(d, (e) => {
		t.area === "content" ? e(f) : t.area === "style" && e(p, 1);
	}), B(e, u), tt();
}
Nr(["change"]);
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
var Ul = /* @__PURE__ */ z("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <label> <input/></label>", 1), Wl = /* @__PURE__ */ z("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), Gl = /* @__PURE__ */ z("<label> <input/></label> <!>", 1), Kl = /* @__PURE__ */ z("<!> <!>", 1), ql = /* @__PURE__ */ z("<div class=\"pin-line\"><label> <!></label> <!></div> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.01\"/> <button type=\"button\" class=\"linkish\"> </button>", 1), Jl = /* @__PURE__ */ z("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.01\"/>", 1), Yl = /* @__PURE__ */ z("<div class=\"pin-line\"><label> <!></label> <!></div>"), Xl = /* @__PURE__ */ z("<!> <!> <!>", 1);
function Zl(e, t) {
	et(t, !0);
	let n = Qe("urd-editor"), r = /* @__PURE__ */ k(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, setBlockProps: o, openImageEditor: s, compressOrTrim: c, imageErrorText: l, setStatus: u } = n, { groupReset: d, groupChanged: f } = ul(() => L(r).props, o);
	async function p(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await c(t);
			i(`edit:${L(r).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || Vl(t.name).replaceAll("-", " ");
			});
		} catch (e) {
			u(l(e), "error");
		}
	}
	var m = Hr(), h = N(m), g = (e) => {
		let t = (e) => {
			var t = Ul(), n = N(t), i = M(n), o = F(i);
			E(n);
			var s = F(n, 2), c = M(s), l = F(c);
			G(l), E(s), I((e, t, n) => {
				V(i, `${e ?? ""} `), V(c, `${t ?? ""} `), K(l, L(r).props.alt ?? ""), q(l, "placeholder", n);
			}, [
				() => J("ui.changeImage"),
				() => J("lbl.description"),
				() => J("ph.altText")
			]), R("change", o, p), R("change", l, (e) => a("alt", e.target.value)), B(e, t);
		}, n = (e) => {
			var t = Gl(), n = N(t), i = M(n), o = F(i);
			G(o), E(n);
			var s = F(n, 2), c = (e) => {
				var t = Wl(), n = M(t);
				G(n);
				var i = F(n);
				E(t), I((e, r, a) => {
					q(t, "title", e), Ni(n, r), V(i, ` ${a ?? ""}`);
				}, [
					() => J("tip.lightbox"),
					() => !!L(r).props.lightbox,
					() => J("lbl.lightbox")
				]), R("change", n, (e) => a("lightbox", e.target.checked)), B(e, t);
			};
			H(s, (e) => {
				L(r).props.href || e(c);
			}), I((e, t) => {
				V(i, `${e ?? ""} `), K(o, L(r).props.href ?? ""), q(o, "placeholder", t);
			}, [() => J("lbl.link"), () => J("ph.optionalImageLink")]), R("change", o, (e) => a("href", e.target.value || null)), B(e, t);
		};
		var i = Kl(), o = N(i);
		{
			let e = /* @__PURE__ */ k(() => J("blocks.image")), n = /* @__PURE__ */ k(() => L(r).props.alt || J("menu.noAlt"));
			Wc(o, {
				id: "img-image",
				get title() {
					return L(e);
				},
				get value() {
					return L(n);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var s = F(o, 2);
		{
			let e = /* @__PURE__ */ k(() => J("group.linkClick")), t = /* @__PURE__ */ k(() => L(r).props.href || (L(r).props.lightbox ? J("menu.lightboxShort") : J("common.none"))), i = /* @__PURE__ */ k(() => d("img-link", {
				href: null,
				lightbox: !1
			}));
			Wc(s, {
				id: "img-link",
				get title() {
					return L(e);
				},
				get value() {
					return L(t);
				},
				get reset() {
					return L(i);
				},
				children: (e, t) => {
					n(e);
				},
				$$slots: { default: !0 }
			});
		}
		B(e, i);
	}, _ = (e) => {
		let t = (e) => {
			var t = ql(), n = N(t), i = M(n), o = M(i), c = F(o);
			{
				let e = /* @__PURE__ */ k(() => L(r).props.fit ?? "cover"), t = /* @__PURE__ */ k(() => [["cover", J("opt.fitFrame.cover")], ["contain", J("opt.fitFrame.contain")]]);
				Y(c, {
					get value() {
						return L(e);
					},
					get options() {
						return L(t);
					},
					onchange: (e) => a("fit", e)
				});
			}
			E(i), Mo(F(i, 2), { id: "imgFit" }), E(n);
			var l = F(n, 2), u = M(l), d = P(F(u));
			E(l);
			var f = F(l, 2);
			G(f);
			var p = F(f, 2), m = M(p), h = P(F(m));
			E(p);
			var g = F(p, 2);
			G(g);
			var _ = F(g, 2), v = M(_), y = P(F(v));
			E(_);
			var b = F(_, 2);
			G(b);
			var x = F(b, 2), S = P(x, !0);
			I((e, t, n, i, a, s, c, l, p) => {
				V(o, `${e ?? ""} `), V(u, `${t ?? ""} `), V(d, `${n ?? ""}%`), K(f, L(r).props.x ?? .5), V(m, `${i ?? ""} `), V(h, `${a ?? ""}%`), K(g, L(r).props.y ?? .5), q(_, "title", s), V(v, `${c ?? ""} `), V(y, `${l ?? ""}x`), K(b, L(r).props.zoom ?? 1), V(S, p);
			}, [
				() => J("lbl.imageFit"),
				() => J("lbl.focusX"),
				() => Math.round((L(r).props.x ?? .5) * 100),
				() => J("lbl.focusY"),
				() => Math.round((L(r).props.y ?? .5) * 100),
				() => J("tip.zoomCrop"),
				() => J("lbl.zoom"),
				() => (L(r).props.zoom ?? 1).toFixed(2),
				() => J("ui.openImageEditor")
			]), R("input", f, (e) => a("x", Number(e.target.value))), R("input", g, (e) => a("y", Number(e.target.value))), R("input", b, (e) => a("zoom", Number(e.target.value))), R("click", x, s), B(e, t);
		}, n = (e) => {
			var t = Jl(), n = N(t), i = M(n), o = P(F(i));
			E(n);
			var s = F(n, 2);
			G(s);
			var c = F(s, 2), l = M(c), u = P(F(l));
			E(c);
			var d = F(c, 2);
			G(d);
			var f = F(d, 2), p = M(f), m = P(F(p));
			E(f);
			var h = F(f, 2);
			G(h), I((e, t, n, a, c, f) => {
				V(i, `${e ?? ""} `), V(o, `${t ?? ""}%`), K(s, L(r).props.brightness ?? 1), V(l, `${n ?? ""} `), V(u, `${a ?? ""}%`), K(d, L(r).props.contrast ?? 1), V(p, `${c ?? ""} `), V(m, `${f ?? ""}%`), K(h, L(r).props.saturate ?? 1);
			}, [
				() => J("lbl.brightness"),
				() => Math.round((L(r).props.brightness ?? 1) * 100),
				() => J("lbl.contrast"),
				() => Math.round((L(r).props.contrast ?? 1) * 100),
				() => J("lbl.saturate"),
				() => Math.round((L(r).props.saturate ?? 1) * 100)
			]), R("input", s, (e) => a("brightness", Number(e.target.value))), R("input", d, (e) => a("contrast", Number(e.target.value))), R("input", h, (e) => a("saturate", Number(e.target.value))), B(e, t);
		}, i = (e) => {
			var t = Yl(), n = M(t), i = M(n), o = F(i);
			{
				let e = /* @__PURE__ */ k(() => L(r).props.radius ?? ""), t = /* @__PURE__ */ k(() => [
					["", J("common.none")],
					["sm", J("opt.size.sm")],
					["md", J("opt.radius.md")]
				]);
				Y(o, {
					get value() {
						return L(e);
					},
					get options() {
						return L(t);
					},
					onchange: (e) => a("radius", e || null)
				});
			}
			E(n), Mo(F(n, 2), { id: "radius" }), E(t), I((e) => V(i, `${e ?? ""} `), [() => J("lbl.radius")]), B(e, t);
		}, o = /* @__PURE__ */ k(() => f({
			fit: "cover",
			x: .5,
			y: .5,
			zoom: 1
		})), c = /* @__PURE__ */ k(() => f({
			brightness: 1,
			contrast: 1,
			saturate: 1
		}));
		var l = Xl(), u = N(l);
		{
			let e = /* @__PURE__ */ k(() => J("group.crop")), n = /* @__PURE__ */ k(() => L(o) ? J("menu.changed", { n: L(o) }) : J("menu.standard")), r = /* @__PURE__ */ k(() => d("img-crop", {
				fit: "cover",
				x: .5,
				y: .5,
				zoom: 1
			}));
			Wc(u, {
				id: "img-crop",
				get title() {
					return L(e);
				},
				get value() {
					return L(n);
				},
				get reset() {
					return L(r);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var p = F(u, 2);
		{
			let e = /* @__PURE__ */ k(() => J("group.filters")), t = /* @__PURE__ */ k(() => L(c) ? J("menu.changed", { n: L(c) }) : J("menu.standard")), r = /* @__PURE__ */ k(() => d("img-filters", {
				brightness: 1,
				contrast: 1,
				saturate: 1
			}));
			Wc(p, {
				id: "img-filters",
				get title() {
					return L(e);
				},
				get value() {
					return L(t);
				},
				get reset() {
					return L(r);
				},
				children: (e, t) => {
					n(e);
				},
				$$slots: { default: !0 }
			});
		}
		var m = F(p, 2);
		{
			let e = /* @__PURE__ */ k(() => J("group.corners")), t = /* @__PURE__ */ k(() => ({
				"": J("common.none"),
				sm: J("opt.size.sm"),
				md: J("opt.radius.md")
			})[L(r).props.radius ?? ""]), n = /* @__PURE__ */ k(() => d("img-corners", { radius: "md" }));
			Wc(m, {
				id: "img-corners",
				get title() {
					return L(e);
				},
				get value() {
					return L(t);
				},
				get reset() {
					return L(n);
				},
				children: (e, t) => {
					i(e);
				},
				$$slots: { default: !0 }
			});
		}
		B(e, l);
	};
	H(h, (e) => {
		t.area === "content" ? e(g) : t.area === "style" && e(_, 1);
	}), B(e, m), tt();
}
Nr([
	"change",
	"input",
	"click"
]);
//#endregion
//#region src/lib/Choice.svelte
var Ql = /* @__PURE__ */ z("<button type=\"button\"> </button>"), $l = /* @__PURE__ */ z("<div><span class=\"choice-label svelte-1ehof1c\"> </span> <div class=\"choice-seg svelte-1ehof1c\" role=\"group\"></div></div>");
function eu(e, t) {
	et(t, !0);
	let n = qi(t, "title", 3, void 0), r = /* @__PURE__ */ k(() => t.options.length > 3 || t.options.reduce((e, [, t]) => e + `${t}`.length, 0) > 14), i = (e) => `${e ?? ""}`;
	var a = $l();
	let o;
	var s = M(a), c = P(s, !0), l = F(s, 2);
	ri(l, 21, () => t.options, ([e, t]) => i(e), (e, n) => {
		var r = /* @__PURE__ */ k(() => h(L(n), 2));
		let a = () => L(r)[0], o = () => L(r)[1];
		var s = Ql();
		let c;
		var l = P(s, !0);
		I((e, t) => {
			q(s, "aria-pressed", e), c = W(s, 1, "svelte-1ehof1c", null, c, { on: t }), V(l, o());
		}, [() => i(a()) === i(t.value), () => i(a()) === i(t.value)]), R("click", s, () => t.onchange(a())), B(e, s);
	}), E(l), E(a), I(() => {
		o = W(a, 1, "choice svelte-1ehof1c", null, o, { stacked: L(r) }), q(a, "title", n()), V(c, t.label), q(l, "aria-label", t.label);
	}), B(e, a), tt();
}
Nr(["click"]);
//#endregion
//#region src/menu/families/Video.svelte
var tu = /* @__PURE__ */ z("<label> </label> <input/>", 1), nu = /* @__PURE__ */ z("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"video/mp4,video/webm\"/></label> <label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label>", 1), ru = /* @__PURE__ */ z("<div class=\"pin-line\"><!> <!></div> <!>", 1), iu = /* @__PURE__ */ z("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), au = /* @__PURE__ */ z("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!>", 1), ou = /* @__PURE__ */ z("<label> <input/></label>"), su = /* @__PURE__ */ z("<!> <!> <!>", 1);
function cu(e, t) {
	et(t, !0);
	let n = Qe("urd-editor"), r = /* @__PURE__ */ k(() => n.selectedBlock), { setBlockProp: i, setBlockProps: a, setBlockVideoFile: o, setBlockVideoPoster: s } = n, { groupReset: c, groupChanged: l } = ul(() => L(r).props, a);
	var u = Hr(), d = N(u), f = (e) => {
		let t = (e) => {
			var t = ru(), n = N(t), a = M(n);
			{
				let e = /* @__PURE__ */ k(() => J("lbl.videoSource")), t = /* @__PURE__ */ k(() => [["embed", J("opt.videoSource.embed")], ["file", J("opt.videoSource.file")]]);
				eu(a, {
					get label() {
						return L(e);
					},
					get value() {
						return L(u);
					},
					get options() {
						return L(t);
					},
					onchange: (e) => i("source", e)
				});
			}
			Mo(F(a, 2), { id: "videoSource" }), E(n);
			var c = F(n, 2), l = (e) => {
				var t = tu(), n = N(t), a = P(n, !0), o = F(n, 2);
				G(o), I((e, t, i) => {
					q(n, "title", e), V(a, t), K(o, L(r).props.url ?? ""), q(o, "placeholder", i);
				}, [
					() => J("hint.video"),
					() => J("lbl.videoUrl"),
					() => J("ph.videoUrl")
				]), R("change", o, (e) => i("url", e.target.value)), B(e, t);
			}, d = (e) => {
				var t = nu(), n = N(t), i = M(n), a = F(i);
				E(n);
				var c = F(n, 2), l = M(c), u = F(l);
				E(c), I((e, t, r, a) => {
					q(n, "title", e), V(i, `${t ?? ""} `), q(c, "title", r), V(l, `${a ?? ""} `);
				}, [
					() => J("tip.video.file"),
					() => L(r).props.src ? J("ui.changeVideo") : J("ui.chooseVideo"),
					() => J("tip.bg.poster"),
					() => L(r).props.poster ? J("ui.changeImage") : J("ui.choosePoster")
				]), R("change", a, o), R("change", u, s), B(e, t);
			};
			H(c, (e) => {
				L(u) === "embed" ? e(l) : e(d, -1);
			}), B(e, t);
		}, n = (e) => {
			var t = au(), n = N(t), o = M(n);
			G(o);
			var s = F(o);
			E(n);
			var c = F(n, 2), l = M(c);
			G(l);
			var u = F(l);
			E(c);
			var d = F(c, 2), f = (e) => {
				var t = iu(), n = M(t);
				G(n);
				var a = F(n);
				E(t), I((e, i) => {
					q(t, "title", e), Ni(n, L(r).props.autoplay === !0), V(a, ` ${i ?? ""}`);
				}, [() => J("tip.video.autoplay"), () => J("lbl.videoAutoplay")]), R("change", n, (e) => i("autoplay", e.target.checked)), B(e, t);
			};
			H(d, (e) => {
				L(r).props.muted === !0 && e(f);
			}), I((e, t) => {
				Ni(o, L(r).props.loop === !0), V(s, ` ${e ?? ""}`), Ni(l, L(r).props.muted === !0), V(u, ` ${t ?? ""}`);
			}, [() => J("lbl.videoLoop"), () => J("lbl.videoMuted")]), R("change", o, (e) => i("loop", e.target.checked)), R("change", l, (e) => a("muted", e.target.checked ? { muted: !0 } : {
				muted: !1,
				autoplay: !1
			})), B(e, t);
		}, l = (e) => {
			var t = ou(), n = M(t), a = F(n);
			G(a), E(t), I((e) => {
				V(n, `${e ?? ""} `), K(a, L(r).props.title ?? "");
			}, [() => J("lbl.videoTitle")]), R("change", a, (e) => i("title", e.target.value)), B(e, t);
		}, u = /* @__PURE__ */ k(() => L(r).props.source === "file" ? "file" : "embed");
		var d = su(), f = N(d);
		{
			let e = /* @__PURE__ */ k(() => J("lbl.videoSource")), n = /* @__PURE__ */ k(() => L(u) === "file" ? J("opt.videoSource.file") : J("opt.videoSource.embed"));
			Wc(f, {
				id: "video-source",
				get title() {
					return L(e);
				},
				get value() {
					return L(n);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var p = F(f, 2), m = (e) => {
			let t = /* @__PURE__ */ k(() => [
				L(r).props.loop === !0,
				L(r).props.muted === !0,
				L(r).props.autoplay === !0
			].filter(Boolean).length);
			{
				let r = /* @__PURE__ */ k(() => J("group.playback")), i = /* @__PURE__ */ k(() => L(t) ? J("menu.onCount", { n: L(t) }) : J("common.off")), a = /* @__PURE__ */ k(() => c("video-play", {
					loop: !1,
					muted: !1,
					autoplay: !1
				}));
				Wc(e, {
					id: "video-play",
					get title() {
						return L(r);
					},
					get value() {
						return L(i);
					},
					get reset() {
						return L(a);
					},
					children: (e, t) => {
						n(e);
					},
					$$slots: { default: !0 }
				});
			}
		};
		H(p, (e) => {
			L(u) === "file" && e(m);
		});
		var h = F(p, 2);
		{
			let e = /* @__PURE__ */ k(() => J("group.accessibility")), t = /* @__PURE__ */ k(() => L(r).props.title || J("menu.noTitle"));
			Wc(h, {
				id: "video-a11y",
				get title() {
					return L(e);
				},
				get value() {
					return L(t);
				},
				children: (e, t) => {
					l(e);
				},
				$$slots: { default: !0 }
			});
		}
		B(e, d);
	};
	H(d, (e) => {
		t.area === "content" && e(f);
	}), B(e, u), tt();
}
Nr(["change"]);
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
var wu = /* @__PURE__ */ z("<button type=\"button\"><span class=\"gp-svg svelte-15ln1c3\"></span></button>"), Tu = /* @__PURE__ */ z("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), Eu = /* @__PURE__ */ z("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"><!> <!></div>", 1), Du = /* @__PURE__ */ z("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), Ou = /* @__PURE__ */ z("<button type=\"button\"> </button>"), ku = /* @__PURE__ */ z("<div class=\"gp-group svelte-15ln1c3\"> </div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\"> </button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\"> </p>", 1), Au = /* @__PURE__ */ z("<!> <!> <!> <!>", 1), ju = /* @__PURE__ */ z("<img class=\"gp-own svelte-15ln1c3\"/>"), Mu = /* @__PURE__ */ z("<span class=\"gp-svg svelte-15ln1c3\"></span>"), Nu = /* @__PURE__ */ z("<div class=\"gp-pop gp-anchored svelte-15ln1c3\" popover=\"auto\"><!></div>"), Pu = /* @__PURE__ */ z("<div class=\"gp-pop svelte-15ln1c3\"><!></div>"), Fu = /* @__PURE__ */ z("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"><!></button> <!></span>");
function Iu(e, t) {
	et(t, !0);
	let n = (e) => {
		var n = Au(), a = N(n), o = (e) => {
			var t = Eu(), n = N(t), r = P(n, !0), a = F(n, 2), o = M(a);
			ri(o, 16, () => L(d), (e) => e, (e, t) => {
				var n = wu();
				let r;
				var a = M(n);
				U(a, () => Cu(t), !0), E(a), E(n), I((e) => {
					r = W(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, r, { active: t === i() }), q(n, "title", e);
				}, [() => J(xu[t].labelKey)]), R("click", n, () => C(t)), B(e, n);
			}), ri(F(o, 2), 16, () => L(u), (e) => e, (e, t) => {
				var n = Tu(), r = P(n, !0);
				I(() => V(r, t)), R("click", n, () => S(t)), B(e, n);
			}), E(a), I((e) => V(r, e), [() => J("common.recent")]), B(e, t);
		};
		H(a, (e) => {
			(L(u).length || L(d).length) && e(o);
		});
		var s = F(a, 2), c = (e) => {
			var t = Hr();
			ri(N(t), 17, () => Su, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ k(() => h(L(t), 2));
				let r = () => L(n)[0], a = () => L(n)[1];
				var o = Du(), s = N(o), c = P(s, !0), l = F(s, 2);
				ri(l, 20, a, (e) => e, (e, t) => {
					var n = wu();
					let r;
					var a = M(n);
					U(a, () => Cu(t), !0), E(a), E(n), I((e) => {
						r = W(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, r, { active: t === i() }), q(n, "title", e);
					}, [() => J(xu[t].labelKey)]), R("click", n, () => C(t)), B(e, n);
				}), E(l), I((e) => V(c, e), [() => J(r())]), B(e, o);
			}), B(e, t);
		};
		H(s, (e) => {
			t.onicon && e(c);
		});
		var l = F(s, 2);
		ri(l, 17, () => du, ([e, t]) => e, (e, t) => {
			var n = /* @__PURE__ */ k(() => h(L(t), 2));
			let i = () => L(n)[0], a = () => L(n)[1];
			var o = Du(), s = N(o), c = P(s, !0), l = F(s, 2);
			ri(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var n = Ou();
				let i;
				var a = P(n, !0);
				I(() => {
					i = W(n, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === r() }), V(a, t);
				}), R("click", n, () => S(t)), B(e, n);
			}), E(l), I((e) => V(c, e), [() => J(i())]), B(e, o);
		});
		var f = F(l, 2), p = (e) => {
			var t = ku(), n = N(t), r = P(n, !0), i = F(n, 2), a = P(i, !0), o = F(i, 2);
			Ui(o, (e) => j(m, e), () => L(m));
			var s = P(F(o, 2), !0);
			I((e, t, n) => {
				V(r, e), V(a, t), V(s, n);
			}, [
				() => J("gp.ownIcon"),
				() => J("gp.upload"),
				() => J("gp.uploadHint")
			]), R("click", i, () => L(m).click()), R("change", o, w), B(e, t);
		};
		H(f, (e) => {
			t.onimage && e(p);
		}), B(e, n);
	}, r = qi(t, "value", 3, "★"), i = qi(t, "icon", 3, null), a = qi(t, "image", 3, null), o = qi(t, "label", 19, () => J("gp.pickGlyph")), s = _a(), c = ya("urd-gp"), l = c.slice(2), u = /* @__PURE__ */ A(cn([])), d = /* @__PURE__ */ A(cn([])), f = /* @__PURE__ */ A(null), p = /* @__PURE__ */ A(null), m = /* @__PURE__ */ A(null), g = /* @__PURE__ */ A(!1), _ = /* @__PURE__ */ A(cn({
		top: 0,
		left: 0
	}));
	function v() {
		j(u, hu(), !0), j(d, t.onicon ? _u().filter((e) => xu[e]) : [], !0);
	}
	function y(e) {
		j(g, e.newState === "open"), ba(L(f), L(g)), L(g) && v();
	}
	function b() {
		s && L(p)?.hidePopover(), j(g, !1);
	}
	function x() {
		v();
		let e = L(f).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		j(_, {
			top: n,
			left: t
		}, !0), j(g, !0);
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
	On(() => {
		if (!L(g)) return;
		let e = () => b();
		if (window.addEventListener("blur", e), s) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			L(f) && !L(f).contains(e.target) && j(g, !1);
		}, n = (e) => {
			e.key === "Escape" && j(g, !1);
		}, r = (e) => {
			L(f) && e.target instanceof Node && !L(f).contains(e.target) && j(g, !1);
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var T = Fu(), ee = M(T), te = M(ee), ne = (e) => {
		var t = ju();
		I((e) => {
			q(t, "src", a()), q(t, "alt", e);
		}, [() => J("gp.ownIcon")]), B(e, t);
	}, re = (e) => {
		var t = Mu();
		U(t, () => Cu(i()), !0), E(t), B(e, t);
	}, ie = (e) => {
		var t = Vr();
		I(() => V(t, r() || "★")), B(e, t);
	};
	H(te, (e) => {
		a() ? e(ne) : i() && xu[i()] ? e(re, 1) : e(ie, -1);
	}), E(ee);
	var ae = F(ee, 2), oe = (e) => {
		var t = Nu(), r = M(t), i = (e) => {
			n(e);
		};
		H(r, (e) => {
			L(g) && e(i);
		}), E(t), Ui(t, (e) => j(p, e), () => L(p)), I(() => {
			q(t, "id", l), Oi(t, `position-anchor: ${c ?? ""}`);
		}), Mr("toggle", t, y), B(e, t);
	}, se = (e) => {
		var t = Pu(), r = M(t);
		n(r), E(t), I(() => Oi(t, `top: ${L(_).top ?? ""}px; left: ${L(_).left ?? ""}px`)), B(e, t);
	};
	H(ae, (e) => {
		s ? e(oe) : L(g) && e(se, 1);
	}), E(T), Ui(T, (e) => j(f, e), () => L(f)), I(() => {
		q(ee, "title", o()), q(ee, "aria-label", o()), q(ee, "popovertarget", s ? l : void 0), Oi(ee, s ? `anchor-name: ${c}` : void 0);
	}), R("click", ee, function(...e) {
		(s ? void 0 : () => L(g) ? j(g, !1) : x())?.apply(this, e);
	}), B(e, T), tt();
}
Nr(["click", "change"]);
//#endregion
//#region src/menu/families/Icon.svelte
var Lu = /* @__PURE__ */ z("<input class=\"token-input\" maxlength=\"4\"/>"), Ru = /* @__PURE__ */ z("<button class=\"ghost\"> </button>"), zu = /* @__PURE__ */ z("<span class=\"toolbar-row\"><img class=\"site-icon-preview\"/> <button class=\"ghost\"> </button></span>"), Bu = /* @__PURE__ */ z("<label> <span class=\"toolbar-row\"><!> <!></span></label> <!>", 1), Vu = /* @__PURE__ */ z("<div class=\"pin-line\"><label> <input type=\"number\" min=\"8\" max=\"400\"/></label> <!></div> <div class=\"pin-line\"><label> <!></label> <!></div>", 1);
function Hu(e, t) {
	et(t, !0);
	let n = Qe("urd-editor"), r = /* @__PURE__ */ k(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, setBlockProps: o, themeSwatches: s } = n, { groupReset: c, groupChanged: l } = ul(() => L(r).props, o);
	var u = Hr(), d = N(u), f = (e) => {
		let t = (e) => {
			var t = Bu(), n = N(t), o = M(n), s = F(o), c = M(s);
			{
				let e = /* @__PURE__ */ k(() => L(r).props.glyph ?? "★"), t = /* @__PURE__ */ k(() => L(r).props.icon ?? null), n = /* @__PURE__ */ k(() => L(r).props.image ?? null);
				Iu(c, {
					get value() {
						return L(e);
					},
					get icon() {
						return L(t);
					},
					get image() {
						return L(n);
					},
					onpick: (e) => i(`edit:${L(r).blockId}`, (t) => {
						t.props.glyph = e, t.props.icon = null, t.props.image = null;
					}),
					onicon: (e) => i(`edit:${L(r).blockId}`, (t) => {
						t.props.icon = e, t.props.image = null;
					}),
					onimage: (e) => a("image", e)
				});
			}
			var l = F(c, 2), u = (e) => {
				var t = Lu();
				G(t), I((e) => {
					K(t, L(r).props.glyph ?? ""), q(t, "title", e);
				}, [() => J("tip.icon.typeGlyph")]), R("change", t, (e) => a("glyph", e.target.value || "★")), B(e, t);
			}, d = (e) => {
				var t = Ru(), n = P(t, !0);
				I((e, r) => {
					q(t, "title", e), V(n, r);
				}, [() => J("tip.icon.backToGlyph"), () => J("ui.removeDrawnIcon")]), R("click", t, () => a("icon", null)), B(e, t);
			};
			H(l, (e) => {
				L(r).props.icon ? e(d, -1) : e(u);
			}), E(s), E(n);
			var f = F(n, 2), p = (e) => {
				var t = zu(), n = M(t), i = F(n, 2), o = P(i, !0);
				E(t), I((e, i, a) => {
					q(t, "title", e), q(n, "src", L(r).props.image), q(n, "alt", i), V(o, a);
				}, [
					() => J("hint.icon.ownImage"),
					() => J("gp.ownIcon"),
					() => J("ui.removeOwnIcon")
				]), R("click", i, () => a("image", null)), B(e, t);
			};
			H(f, (e) => {
				L(r).props.image && e(p);
			}), I((e) => V(o, `${e ?? ""} `), [() => J("blocks.icon")]), B(e, t);
		};
		{
			let n = /* @__PURE__ */ k(() => J("blocks.icon")), i = /* @__PURE__ */ k(() => L(r).props.image ? J("gp.ownIcon") : L(r).props.icon ? J("menu.drawnIcon") : L(r).props.glyph ?? "★");
			Wc(e, {
				id: "icon-icon",
				get title() {
					return L(n);
				},
				get value() {
					return L(i);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	}, p = (e) => {
		let t = (e) => {
			var t = Vu(), n = N(t), i = M(n), o = M(i), c = F(o);
			G(c), E(i), Mo(F(i, 2), { id: "iconSize" }), E(n);
			var l = F(n, 2), u = M(l), d = M(u), f = F(d);
			{
				let e = /* @__PURE__ */ k(() => L(r).props.color ?? "accent"), t = /* @__PURE__ */ k(s);
				Pa(f, {
					get value() {
						return L(e);
					},
					get tokens() {
						return L(t);
					},
					onchange: (e) => a("color", e)
				});
			}
			E(u), Mo(F(u, 2), { id: "iconColor" }), E(l), I((e, t, n) => {
				V(o, `${e ?? ""} `), K(c, L(r).props.size ?? 48), q(u, "title", t), V(d, `${n ?? ""} `);
			}, [
				() => J("lbl.sizePx"),
				() => J("hint.icon.color"),
				() => J("lbl.color")
			]), R("change", c, (e) => a("size", Number(e.target.value))), B(e, t);
		};
		{
			let n = /* @__PURE__ */ k(() => J("group.appearance")), i = /* @__PURE__ */ k(() => `${L(r).props.size ?? 48} px`), a = /* @__PURE__ */ k(() => c("icon-look", {
				size: 48,
				color: "accent"
			}));
			Wc(e, {
				id: "icon-look",
				get title() {
					return L(n);
				},
				get value() {
					return L(i);
				},
				get reset() {
					return L(a);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	};
	H(d, (e) => {
		t.area === "content" ? e(f) : t.area === "style" && e(p, 1);
	}), B(e, u), tt();
}
Nr(["change", "click"]);
//#endregion
//#region src/menu/families/Shape.svelte
var Uu = /* @__PURE__ */ z("<label> <input/></label>"), Wu = /* @__PURE__ */ z("<label> <!></label> <!>", 1), Gu = /* @__PURE__ */ z("<div class=\"pin-line\"><label> <!></label> <!></div> <div class=\"pin-line\"><label> <input type=\"number\" min=\"1\" max=\"40\"/></label> <!></div> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), Ku = /* @__PURE__ */ z("<label> <input type=\"number\" min=\"4\" step=\"1\"/></label>"), qu = /* @__PURE__ */ z("<label> <input type=\"number\" min=\"1\" step=\"0.5\"/></label>"), Ju = /* @__PURE__ */ z("<!> <!>", 1);
function Yu(e, t) {
	et(t, !0);
	let n = Qe("urd-editor"), r = /* @__PURE__ */ k(() => n.selectedBlock), { setBlockProp: i, setBlockProps: a, setBlockFrame: o, designWidth: s, shapePx: c, setShapeSizePx: l } = n, { groupReset: u, groupChanged: d } = ul(() => L(r).props, a);
	var f = Hr(), p = N(f), m = (e) => {
		let t = (e) => {
			var t = Wu(), n = N(t), a = M(n), o = F(a);
			{
				let e = /* @__PURE__ */ k(xo);
				Y(o, {
					get value() {
						return L(r).props.kind;
					},
					get options() {
						return L(e);
					},
					onchange: (e) => i("kind", e)
				});
			}
			E(n);
			var s = F(n, 2), c = (e) => {
				var t = Uu(), n = M(t), a = F(n);
				G(a), E(t), I((e, i) => {
					q(t, "title", e), V(n, `${i ?? ""} `), K(a, L(r).props.label ?? "");
				}, [() => J("tip.shape.label"), () => J("lbl.shapeLabel")]), R("change", a, (e) => i("label", e.target.value.trim() || void 0)), B(e, t);
			};
			H(s, (e) => {
				L(r).props.kind === "line" && e(c);
			}), I((e) => V(a, `${e ?? ""} `), [() => J("blocks.shape")]), B(e, t);
		};
		{
			let n = /* @__PURE__ */ k(() => J("blocks.shape")), i = /* @__PURE__ */ k(() => xo().find(([e]) => e === L(r).props.kind)?.[1] ?? "");
			Wc(e, {
				id: "shape-shape",
				get title() {
					return L(n);
				},
				get value() {
					return L(i);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	}, h = (e) => {
		let t = (e) => {
			var t = Gu(), n = N(t), a = M(n), o = M(a), s = F(o);
			{
				let e = /* @__PURE__ */ k(So);
				Y(s, {
					get value() {
						return L(r).props.color;
					},
					get options() {
						return L(e);
					},
					onchange: (e) => i("color", e)
				});
			}
			E(a), Mo(F(a, 2), { id: "shapeColor" }), E(n);
			var c = F(n, 2), l = M(c), u = M(l), d = F(u);
			G(d), E(l), Mo(F(l, 2), { id: "thickness" }), E(c);
			var f = F(c, 2), p = M(f);
			G(p);
			var m = F(p);
			E(f), I((e, t, n, i, a) => {
				V(o, `${e ?? ""} `), V(u, `${t ?? ""} `), K(d, L(r).props.thickness), q(f, "title", n), Ni(p, i), V(m, ` ${a ?? ""}`);
			}, [
				() => J("lbl.color"),
				() => J("lbl.thickness"),
				() => J("tip.shape.fill"),
				() => !!L(r).props.fill,
				() => J("lbl.filled")
			]), R("change", d, (e) => i("thickness", Number(e.target.value))), R("change", p, (e) => i("fill", e.target.checked ? L(r).props.color : null)), B(e, t);
		}, n = (e) => {
			var t = Hr(), n = N(t), i = (e) => {
				var t = Ku(), n = M(t), i = F(n);
				G(i), E(t), I((e, r, a, o) => {
					q(t, "title", e), V(n, `${r ?? ""} `), q(i, "max", a), K(i, o);
				}, [
					() => J("tip.shapeSize"),
					() => J("lbl.length"),
					() => c(100 - L(r).frame.x),
					() => c(L(r).frame.w)
				]), R("change", i, (e) => l(Number(e.target.value), !1)), B(e, t);
			}, a = /* @__PURE__ */ k(() => (L(r).props.kind === "line" || L(r).props.kind === "arrow") && s()), u = (e) => {
				var t = qu(), n = M(t), i = F(n);
				G(i), E(t), I((e, t) => {
					V(n, `${e ?? ""} `), q(i, "max", t), K(i, L(r).frame.w);
				}, [() => J("lbl.length"), () => Math.max(1, Math.round(100 - L(r).frame.x))]), R("change", i, (e) => o("w", Math.max(1, Math.min(Number(e.target.value), 100 - L(r).frame.x)))), B(e, t);
			}, d = (e) => {
				var t = Ku(), n = M(t), i = F(n);
				G(i), E(t), I((e, r, a, o) => {
					q(t, "title", e), V(n, `${r ?? ""} `), q(i, "max", a), K(i, o);
				}, [
					() => J("tip.shapeSize"),
					() => J("lbl.sizePx"),
					() => c(100 - L(r).frame.x),
					() => c(L(r).frame.w)
				]), R("change", i, (e) => l(Number(e.target.value), !0)), B(e, t);
			};
			H(n, (e) => {
				L(a) ? e(i) : L(r).props.kind === "line" || L(r).props.kind === "arrow" ? e(u, 1) : e(d, -1);
			}), B(e, t);
		}, a = /* @__PURE__ */ k(() => L(r).props.kind === "line" || L(r).props.kind === "arrow");
		var d = Ju(), f = N(d);
		{
			let e = /* @__PURE__ */ k(() => J("group.strokeFill")), n = /* @__PURE__ */ k(() => `${So().find(([e]) => e === L(r).props.color)?.[1] ?? ""} · ${L(r).props.thickness ?? 2} px`), i = /* @__PURE__ */ k(() => u("shape-stroke", {
				color: "accent",
				thickness: 2,
				fill: null
			}));
			Wc(f, {
				id: "shape-stroke",
				get title() {
					return L(e);
				},
				get value() {
					return L(n);
				},
				get reset() {
					return L(i);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var p = F(f, 2), m = (e) => {
			{
				let t = /* @__PURE__ */ k(() => J("group.measures")), i = /* @__PURE__ */ k(() => s() ? `${c(L(r).frame.w)} px` : `${L(r).frame.w} %`);
				Wc(e, {
					id: "shape-size",
					get title() {
						return L(t);
					},
					get value() {
						return L(i);
					},
					children: (e, t) => {
						n(e);
					},
					$$slots: { default: !0 }
				});
			}
		}, h = /* @__PURE__ */ k(() => L(a) || s());
		H(p, (e) => {
			L(h) && e(m);
		}), B(e, d);
	};
	H(p, (e) => {
		t.area === "content" ? e(m) : t.area === "style" && e(h, 1);
	}), B(e, f), tt();
}
Nr(["change"]);
//#endregion
//#region src/menu/families/Gallery.svelte
var Xu = /* @__PURE__ */ z("<div class=\"bg-layer\"><span class=\"toolbar-row\"><img class=\"site-icon-preview\" alt=\"\"/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span> <label> <input/></label> <label> <input/></label></div>"), Zu = /* @__PURE__ */ z("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\" multiple=\"\"/></label> <!>", 1), Qu = /* @__PURE__ */ z("<div class=\"pin-line\"><label> <input type=\"number\" min=\"1\" max=\"6\"/></label> <!></div> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\"/>", 1), $u = /* @__PURE__ */ z("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" step=\"10\"/> <span class=\"gridmenu-value\"> </span></div> <button type=\"button\" class=\"ghost action\"><!> </button>", 1), ed = /* @__PURE__ */ z("<button type=\"button\" class=\"ghost action\"><!> </button>"), td = /* @__PURE__ */ z("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div> <!> <label> <!></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), nd = /* @__PURE__ */ z("<label> <input type=\"number\" min=\"2\" max=\"60\"/></label>"), rd = /* @__PURE__ */ z("<div class=\"pin-line\"><label> <!></label> <!></div> <!> <!> <!> <!> <!>", 1), id = /* @__PURE__ */ z("<!> <!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"10\" max=\"300\" step=\"5\"/> <span class=\"gridmenu-value\"> </span></div> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"60\" max=\"800\" step=\"10\"/> <span class=\"gridmenu-value\"> </span></div> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\"/> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), ad = /* @__PURE__ */ z("<label> <!></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), od = /* @__PURE__ */ z("<!> <!> <!>", 1);
function sd(e, t) {
	et(t, !0);
	let n = Qe("urd-editor"), r = /* @__PURE__ */ k(() => n.selectedBlock), { setBlockProp: i, setBlockProps: a, setBlockFrame: o, addGalleryImages: s, moveGalleryImage: c, removeGalleryImage: l, setGalleryImageField: u, themeSwatches: d, newSeed: f } = n, { groupReset: p, groupChanged: m } = ul(() => L(r).props, a);
	var h = Hr(), g = N(h), _ = (e) => {
		let t = (e) => {
			var t = Zu(), n = N(t), i = M(n), a = F(i);
			E(n), ri(F(n, 2), 17, () => L(r).props.images ?? [], $r, (e, t, n) => {
				var i = Xu(), a = M(i), o = M(a), s = F(o, 2), d = M(s);
				d.disabled = n === 0, U(d, () => X.up, !0), E(d);
				var f = F(d, 2);
				U(f, () => X.down, !0), E(f);
				var p = F(f, 2);
				U(p, () => X.cross, !0), E(p), E(s), E(a);
				var m = F(a, 2), h = M(m), g = F(h);
				G(g), E(m);
				var _ = F(m, 2), v = M(_), y = F(v);
				G(y), E(_), E(i), I((e, i, s, c, l, u) => {
					q(a, "title", e), q(o, "src", L(t).src), f.disabled = n === L(r).props.images.length - 1, q(p, "title", i), V(h, `${s ?? ""} `), K(g, L(t).alt ?? ""), q(g, "placeholder", c), V(v, `${l ?? ""} `), K(y, L(t).href ?? ""), q(y, "placeholder", u);
				}, [
					() => J("hint.gallery"),
					() => J("tip.removeImage"),
					() => J("lbl.description"),
					() => J("ph.altShort"),
					() => J("lbl.link"),
					() => J("ph.galleryHref")
				]), R("click", d, () => c(n, -1)), R("click", f, () => c(n, 1)), R("click", p, () => l(n)), R("change", g, (e) => u(n, "alt", e.target.value)), R("change", y, (e) => u(n, "href", e.target.value || null)), B(e, i);
			}), I((e, t) => {
				q(n, "title", e), V(i, `${t ?? ""} `);
			}, [() => J("tip.gallery.addImages"), () => J("ui.addImages")]), R("change", a, s), B(e, t);
		};
		{
			let n = /* @__PURE__ */ k(() => J("group.images")), i = /* @__PURE__ */ k(() => J("menu.imageCount", { n: L(r).props.images?.length ?? 0 }));
			Wc(e, {
				id: "gallery-images",
				get title() {
					return L(n);
				},
				get value() {
					return L(i);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
	}, v = (e) => {
		let t = (e) => {
			var t = rd(), n = N(t), a = M(n), o = M(a), c = F(o);
			{
				let e = /* @__PURE__ */ k(() => lc.map((e) => [e, J(`opt.galleryView.${e}`)]));
				Y(c, {
					get value() {
						return L(s);
					},
					get options() {
						return L(e);
					},
					onchange: (e) => i("view", e)
				});
			}
			E(a), Mo(F(a, 2), { id: "galleryView" }), E(n);
			var l = F(n, 2), u = (e) => {
				{
					let t = /* @__PURE__ */ k(() => J("lbl.ribbonWidth")), n = /* @__PURE__ */ k(() => po(L(r).props.width)), a = /* @__PURE__ */ k(fo);
					eu(e, {
						get label() {
							return L(t);
						},
						get value() {
							return L(n);
						},
						get options() {
							return L(a);
						},
						onchange: (e) => i("width", e)
					});
				}
			};
			H(l, (e) => {
				L(s) === "ribbon" && e(u);
			});
			var p = F(l, 2), m = (e) => {
				var t = Qu(), n = N(t), a = M(n), o = M(a), s = F(o);
				G(s), E(a), Mo(F(a, 2), { id: "columns" }), E(n);
				var c = F(n, 2), l = M(c), u = P(F(l));
				E(c);
				var d = F(c, 2);
				G(d), I((e, t) => {
					V(o, `${e ?? ""} `), K(s, L(r).props.columns ?? 3), V(l, `${t ?? ""} `), V(u, `${L(r).props.gap ?? 12 ?? ""} px`), K(d, L(r).props.gap ?? 12);
				}, [() => J("lbl.columns"), () => J("lbl.imageGap")]), R("change", s, (e) => i("columns", Number(e.target.value))), R("input", d, (e) => i("gap", Number(e.target.value))), B(e, t);
			}, h = /* @__PURE__ */ k(() => uc.includes(L(s)));
			H(p, (e) => {
				L(h) && e(m);
			});
			var g = F(p, 2), _ = (e) => {
				var t = $u(), n = N(t), a = M(n), o = P(a, !0), s = F(a, 2);
				G(s);
				var c = P(F(s, 2));
				E(n);
				var l = F(n, 2), u = M(l);
				U(u, () => X.shuffle);
				var d = F(u);
				E(l), I((e, t, i, a) => {
					q(n, "title", e), V(o, t), q(s, "min", dc.min), q(s, "max", dc.max), K(s, L(r).props.rowHeight ?? dc.dflt), V(c, `${L(r).props.rowHeight ?? dc.dflt ?? ""} px`), q(l, "title", i), V(d, ` ${a ?? ""}`);
				}, [
					() => J("tip.gallery.rowHeight"),
					() => J("lbl.galleryRowHeight"),
					() => J("tip.gallery.shuffleMosaic"),
					() => J("ui.shufflePhotos")
				]), R("input", s, (e) => i("rowHeight", e.target.valueAsNumber)), R("click", l, () => i("seed", f())), B(e, t);
			};
			H(g, (e) => {
				L(s) === "mosaic" && e(_);
			});
			var v = F(g, 2), y = (e) => {
				var t = td(), n = N(t), a = M(n), o = P(a, !0), s = F(a, 2);
				G(s);
				var c = P(F(s, 2));
				E(n);
				var l = F(n, 2), u = (e) => {
					var t = ed(), n = M(t);
					U(n, () => X.shuffle);
					var r = F(n);
					E(t), I((e, n) => {
						q(t, "title", e), V(r, ` ${n ?? ""}`);
					}, [() => J("tip.gallery.shuffleTilt"), () => J("ui.shufflePhotos")]), R("click", t, () => i("seed", f())), B(e, t);
				};
				H(l, (e) => {
					(L(r).props.tilt ?? fc.dflt) > 0 && e(u);
				});
				var p = F(l, 2), m = M(p), h = F(m);
				{
					let e = /* @__PURE__ */ k(() => L(r).props.frameColor || "#ffffff"), t = /* @__PURE__ */ k(d), n = /* @__PURE__ */ k(() => J("tip.gallery.frameColor"));
					Pa(h, {
						get value() {
							return L(e);
						},
						get tokens() {
							return L(t);
						},
						allowClear: !0,
						get label() {
							return L(n);
						},
						onchange: (e) => i("frameColor", e ?? "")
					});
				}
				E(p);
				var g = F(p, 2), _ = M(g);
				G(_);
				var v = F(_);
				E(g), I((e, t, i, a, l, u) => {
					q(n, "title", e), V(o, t), q(s, "min", fc.min), q(s, "max", fc.max), K(s, L(r).props.tilt ?? fc.dflt), V(c, `${L(r).props.tilt ?? fc.dflt ?? ""}°`), q(p, "title", i), V(m, `${a ?? ""} `), q(g, "title", l), Ni(_, L(r).props.captions === !0), V(v, ` ${u ?? ""}`);
				}, [
					() => J("tip.gallery.tilt"),
					() => J("lbl.polaroidTilt"),
					() => J("tip.gallery.frameColor"),
					() => J("lbl.frameColor"),
					() => J("tip.gallery.captions"),
					() => J("lbl.galleryCaptions")
				]), R("input", s, (e) => i("tilt", e.target.valueAsNumber)), R("change", _, (e) => i("captions", e.target.checked)), B(e, t);
			};
			H(v, (e) => {
				L(s) === "polaroid" && e(y);
			});
			var b = F(v, 2), x = (e) => {
				var t = nd(), n = M(t), a = F(n);
				G(a), E(t), I((e) => {
					V(n, `${e ?? ""} `), K(a, L(r).props.interval ?? 5);
				}, [() => J("lbl.secondsPerImage")]), R("change", a, (e) => i("interval", Number(e.target.value))), B(e, t);
			};
			H(b, (e) => {
				L(s) === "slides" && e(x);
			}), I((e) => V(o, `${e ?? ""} `), [() => J("lbl.view")]), B(e, t);
		}, n = (e) => {
			var t = id(), n = N(t);
			{
				let e = /* @__PURE__ */ k(() => J("lbl.ribbonRows")), t = /* @__PURE__ */ k(() => String(L(r).props.rows ?? 1)), a = /* @__PURE__ */ k(() => [["1", J("opt.ribbonRows.one")], ["2", J("opt.ribbonRows.two")]]);
				eu(n, {
					get label() {
						return L(e);
					},
					get value() {
						return L(t);
					},
					get options() {
						return L(a);
					},
					onchange: (e) => i("rows", Number(e))
				});
			}
			var a = F(n, 2);
			{
				let e = /* @__PURE__ */ k(() => J("lbl.ribbonDirection")), t = /* @__PURE__ */ k(() => L(r).props.direction ?? "left"), n = /* @__PURE__ */ k(() => [["left", J("opt.ribbonDir.left")], ["right", J("opt.ribbonDir.right")]]);
				eu(a, {
					get label() {
						return L(e);
					},
					get value() {
						return L(t);
					},
					get options() {
						return L(n);
					},
					onchange: (e) => i("direction", e)
				});
			}
			var s = F(a, 2), c = M(s), l = P(c, !0), u = F(c, 2);
			G(u);
			var d = P(F(u, 2), !0);
			E(s);
			var f = F(s, 2), p = M(f), m = P(p, !0), h = F(p, 2);
			G(h);
			var g = P(F(h, 2));
			E(f);
			var _ = F(f, 2), v = M(_), y = P(F(v));
			E(_);
			var b = F(_, 2);
			G(b);
			var x = F(b, 2), S = M(x);
			G(S);
			var C = F(S);
			E(x);
			var w = F(x, 2), T = M(w);
			G(T);
			var ee = F(T);
			E(w), I((e, t, n, i, a, o, c, p, _) => {
				q(s, "title", e), V(l, t), K(u, L(r).props.speed ?? 60), V(d, L(r).props.speed ?? 60), q(f, "title", n), V(m, i), K(h, L(r).frame.h), V(g, `${L(r).frame.h ?? ""} px`), V(v, `${a ?? ""} `), V(y, `${L(r).props.gap ?? 12 ?? ""} px`), K(b, L(r).props.gap ?? 12), q(x, "title", o), Ni(S, L(r).props.pauseOnHover !== !1), V(C, ` ${c ?? ""}`), q(w, "title", p), Ni(T, L(r).props.fade !== !1), V(ee, ` ${_ ?? ""}`);
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
			]), R("input", u, (e) => i("speed", e.target.valueAsNumber)), R("input", h, (e) => o("h", e.target.valueAsNumber)), R("input", b, (e) => i("gap", Number(e.target.value))), R("change", S, (e) => i("pauseOnHover", e.target.checked)), R("change", T, (e) => i("fade", e.target.checked)), B(e, t);
		}, a = (e) => {
			var t = ad(), n = N(t), a = M(n), o = F(a);
			{
				let e = /* @__PURE__ */ k(() => L(r).props.radius ?? ""), t = /* @__PURE__ */ k(() => [
					["", J("common.none")],
					["sm", J("opt.size.sm")],
					["md", J("opt.radius.md")]
				]);
				Y(o, {
					get value() {
						return L(e);
					},
					get options() {
						return L(t);
					},
					onchange: (e) => i("radius", e || null)
				});
			}
			E(n);
			var s = F(n, 2), c = M(s);
			G(c);
			var l = F(c);
			E(s), I((e, t, n) => {
				V(a, `${e ?? ""} `), q(s, "title", t), Ni(c, L(r).props.lightbox !== !1), V(l, ` ${n ?? ""}`);
			}, [
				() => J("lbl.radius"),
				() => J("tip.lightbox"),
				() => J("lbl.lightbox")
			]), R("change", c, (e) => i("lightbox", e.target.checked)), B(e, t);
		}, s = /* @__PURE__ */ k(() => pc(L(r).props.view));
		var c = od(), l = N(c);
		{
			let e = /* @__PURE__ */ k(() => J("lbl.view")), n = /* @__PURE__ */ k(() => J(`opt.galleryView.${L(s)}`)), r = /* @__PURE__ */ k(() => p("gallery-view", {
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
					return L(e);
				},
				get value() {
					return L(n);
				},
				get reset() {
					return L(r);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var u = F(l, 2), m = (e) => {
			{
				let t = /* @__PURE__ */ k(() => J("lbl.ribbonMotion")), i = /* @__PURE__ */ k(() => `${L(r).props.speed ?? 60} px/s`), a = /* @__PURE__ */ k(() => p("gallery-roll", {
					rows: void 0,
					direction: void 0,
					speed: void 0,
					pauseOnHover: void 0,
					fade: void 0
				}));
				Wc(e, {
					id: "gallery-roll",
					get title() {
						return L(t);
					},
					get value() {
						return L(i);
					},
					get reset() {
						return L(a);
					},
					children: (e, t) => {
						n(e);
					},
					$$slots: { default: !0 }
				});
			}
		};
		H(u, (e) => {
			L(s) === "ribbon" && e(m);
		});
		var h = F(u, 2);
		{
			let e = /* @__PURE__ */ k(() => J("group.galleryImages")), t = /* @__PURE__ */ k(() => ({
				"": J("common.none"),
				sm: J("opt.size.sm"),
				md: J("opt.radius.md")
			})[L(r).props.radius ?? ""]), n = /* @__PURE__ */ k(() => p("gallery-look", {
				radius: "md",
				lightbox: !0
			}));
			Wc(h, {
				id: "gallery-look",
				get title() {
					return L(e);
				},
				get value() {
					return L(t);
				},
				get reset() {
					return L(n);
				},
				children: (e, t) => {
					a(e);
				},
				$$slots: { default: !0 }
			});
		}
		B(e, c);
	};
	H(g, (e) => {
		t.area === "content" ? e(_) : t.area === "style" && e(v, 1);
	}), B(e, h), tt();
}
Nr([
	"change",
	"click",
	"input"
]);
//#endregion
//#region src/menu/families/Ribbon.svelte
var cd = /* @__PURE__ */ z("<span class=\"nav-line\"><input/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span>"), ld = /* @__PURE__ */ z("<!> <button class=\"ghost action\"> </button>", 1), ud = /* @__PURE__ */ z("<button type=\"button\"></button>"), dd = /* @__PURE__ */ z("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <input class=\"field-filled\"/></label>"), fd = /* @__PURE__ */ z("<div class=\"ctl-field\"><span class=\"mini-label\"> </span> <div class=\"tile-grid cols-6\" role=\"group\"></div></div> <!>", 1), pd = /* @__PURE__ */ z("<!> <!>", 1), md = /* @__PURE__ */ z("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"0.5\" max=\"10\" step=\"0.5\"/> <span class=\"gridmenu-value\"> </span></div>"), hd = /* @__PURE__ */ z("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"10\" max=\"300\" step=\"5\"/> <span class=\"gridmenu-value\"> </span> <!></div>"), gd = /* @__PURE__ */ z("<button class=\"ghost action\"> </button> <!> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), _d = /* @__PURE__ */ z("<div class=\"pin-line\"><!> <!></div> <!>", 1), vd = /* @__PURE__ */ z("<label> <!></label>"), yd = /* @__PURE__ */ z("<!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"2\" max=\"40\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div>", 1), bd = /* @__PURE__ */ z("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <!> <label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <!> <!>", 1), xd = /* @__PURE__ */ z("<!> <!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"-10\" max=\"10\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div>", 1), Sd = /* @__PURE__ */ z("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"8\" max=\"120\" step=\"2\"/> <span class=\"gridmenu-value\"> </span></div>", 1), Cd = /* @__PURE__ */ z("<div class=\"swatch-cell\"><!> <span class=\"mini-label\"> </span></div>"), wd = /* @__PURE__ */ z("<div class=\"swatch-row\"><!> <div class=\"swatch-cell\"><!> <span class=\"mini-label\"> </span></div></div>"), Td = /* @__PURE__ */ z("<!> <!> <!> <!> <!>", 1);
function Ed(e, t) {
	et(t, !0);
	let n = Qe("urd-editor"), r = /* @__PURE__ */ k(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, setBlockProps: o, themeSwatches: s } = n, { groupReset: c, groupChanged: l } = ul(() => L(r).props, o);
	function u(e, t) {
		i(`edit:${L(r).blockId}:ribbon${e}`, (n) => {
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
	var m = Hr(), g = N(m), _ = (e) => {
		let t = (e) => {
			var t = ld(), n = N(t);
			ri(n, 17, () => L(r).props.items ?? [], $r, (e, t, n) => {
				var i = cd(), a = M(i);
				G(a);
				var o = F(a, 2), s = M(o);
				s.disabled = n === 0, U(s, () => X.up, !0), E(s);
				var c = F(s, 2);
				U(c, () => X.down, !0), E(c);
				var l = F(c, 2);
				U(l, () => X.cross, !0), E(l), E(o), E(i), I((e, i, o, u) => {
					K(a, L(t)), q(a, "title", e), q(s, "title", i), q(c, "title", o), c.disabled = n === (L(r).props.items?.length ?? 0) - 1, q(l, "title", u);
				}, [
					() => J("tip.ribbon.item"),
					() => J("tip.moveUp"),
					() => J("tip.moveDown"),
					() => J("tip.ribbon.remove")
				]), R("change", a, (e) => u(n, e.target.value)), R("click", s, () => p(n, -1)), R("click", c, () => p(n, 1)), R("click", l, () => f(n)), B(e, i);
			});
			var i = F(n, 2), a = P(i, !0);
			I((e) => V(a, e), [() => J("ui.addRibbonItem")]), R("click", i, d), B(e, t);
		}, n = (e) => {
			var t = fd(), n = N(t), i = M(n), o = P(i, !0), s = F(i, 2);
			ri(s, 21, _o, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ k(() => h(L(t), 2));
				let i = () => L(n)[0], o = () => L(n)[1];
				var s = ud();
				let c;
				U(s, () => bo[i()], !0), E(s), I(() => {
					c = W(s, 1, "tile", null, c, { on: (L(r).props.sep ?? "dot") === i() }), q(s, "aria-pressed", (L(r).props.sep ?? "dot") === i()), q(s, "title", o());
				}), R("click", s, () => a("sep", i())), B(e, s);
			}), E(s), E(n);
			var c = F(n, 2), l = (e) => {
				var t = dd(), n = M(t), i = P(n, !0), o = F(n, 2);
				G(o), E(t), I((e, n) => {
					q(t, "title", e), V(i, n), K(o, L(r).props.sepText ?? "");
				}, [() => J("tip.ribbon.sepText"), () => J("lbl.ribbonSepText")]), R("change", o, (e) => a("sepText", e.target.value)), B(e, t);
			};
			H(c, (e) => {
				L(r).props.sep === "custom" && e(l);
			}), I((e, t) => {
				V(o, e), q(s, "aria-label", t);
			}, [() => J("lbl.ribbonSep"), () => J("lbl.ribbonSep")]), B(e, t);
		};
		var i = pd(), o = N(i);
		{
			let e = /* @__PURE__ */ k(() => J("lbl.ribbonItems")), n = /* @__PURE__ */ k(() => J("menu.wordCount", { n: L(r).props.items?.length ?? 0 }));
			Wc(o, {
				id: "ribbon-words",
				get title() {
					return L(e);
				},
				get value() {
					return L(n);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var s = F(o, 2);
		{
			let e = /* @__PURE__ */ k(() => J("lbl.ribbonSep")), t = /* @__PURE__ */ k(() => _o().find(([e]) => e === (L(r).props.sep ?? "dot"))?.[1] ?? ""), i = /* @__PURE__ */ k(() => c("ribbon-sep", {
				sep: "dot",
				sepText: void 0
			}));
			Wc(s, {
				id: "ribbon-sep",
				get title() {
					return L(e);
				},
				get value() {
					return L(t);
				},
				get reset() {
					return L(i);
				},
				children: (e, t) => {
					n(e);
				},
				$$slots: { default: !0 }
			});
		}
		B(e, i);
	}, v = (e) => {
		let t = (e) => {
			var t = _d(), i = N(t), o = M(i);
			{
				let e = /* @__PURE__ */ k(mo);
				Y(o, {
					filled: !0,
					get value() {
						return L(f);
					},
					get options() {
						return L(e);
					},
					onchange: (e) => a("motion", e)
				});
			}
			Mo(F(o, 2), { id: "ribbonMotion" }), E(i);
			var s = F(i, 2), c = (e) => {
				var t = gd(), i = N(t), o = P(i, !0), s = F(i, 2);
				{
					let e = /* @__PURE__ */ k(() => J("lbl.ribbonDirection")), t = /* @__PURE__ */ k(() => L(r).props.direction ?? "left"), n = /* @__PURE__ */ k(() => [["left", J("opt.ribbonDir.left")], ["right", J("opt.ribbonDir.right")]]);
					eu(s, {
						get label() {
							return L(e);
						},
						get value() {
							return L(t);
						},
						get options() {
							return L(n);
						},
						onchange: (e) => a("direction", e)
					});
				}
				var c = F(s, 2), l = (e) => {
					var t = md(), n = M(t), i = P(n, !0), o = F(n, 2);
					G(o);
					var s = P(F(o, 2));
					E(t), I((e, n) => {
						q(t, "title", e), V(i, n), K(o, L(r).props.dwell ?? 2.5), V(s, `${L(r).props.dwell ?? 2.5 ?? ""} s`);
					}, [() => J("tip.ribbon.dwell"), () => J("lbl.ribbonDwell")]), R("input", o, (e) => a("dwell", e.target.valueAsNumber)), B(e, t);
				}, u = (e) => {
					var t = hd(), n = M(t), i = P(n, !0), o = F(n, 2);
					G(o);
					var s = F(o, 2), c = P(s, !0);
					Mo(F(s, 2), { id: "speed" }), E(t), I((e, n) => {
						q(t, "title", e), V(i, n), K(o, L(r).props.speed ?? 60), V(c, L(r).props.speed ?? 60);
					}, [() => J("tip.ribbon.speed"), () => J("lbl.ribbonSpeed")]), R("input", o, (e) => a("speed", e.target.valueAsNumber)), B(e, t);
				};
				H(c, (e) => {
					L(f) === "step" ? e(l) : e(u, -1);
				});
				var d = F(c, 2), p = M(d);
				G(p);
				var m = F(p);
				E(d);
				var h = F(d, 2), g = M(h);
				G(g);
				var _ = F(g);
				E(h), I((e, t, n, a, s, c) => {
					q(i, "title", e), V(o, t), q(d, "title", n), Ni(p, L(r).props.pauseOnHover !== !1), V(m, ` ${a ?? ""}`), q(h, "title", s), Ni(g, L(r).props.fade !== !1), V(_, ` ${c ?? ""}`);
				}, [
					() => J("tip.ribbon.play"),
					() => J("ui.ribbonPlay"),
					() => J("tip.ribbon.pause"),
					() => J("lbl.ribbonPause"),
					() => J("tip.ribbon.fade"),
					() => J("lbl.ribbonFade")
				]), R("click", i, () => n.bridge?.sendDemoMotion()), R("change", p, (e) => a("pauseOnHover", e.target.checked)), R("change", g, (e) => a("fade", e.target.checked)), B(e, t);
			};
			H(s, (e) => {
				L(f) !== "none" && e(c);
			}), B(e, t);
		}, i = (e) => {
			var t = bd(), n = N(t), i = M(n), o = P(i, !0), c = F(i, 2);
			{
				let e = /* @__PURE__ */ k(() => L(r).props.above ?? "none"), t = /* @__PURE__ */ k(go);
				Y(c, {
					filled: !0,
					get value() {
						return L(e);
					},
					get options() {
						return L(t);
					},
					onchange: (e) => a("above", e)
				});
			}
			E(n);
			var l = F(n, 2), u = (e) => {
				var t = vd(), n = M(t), i = F(n);
				{
					let e = /* @__PURE__ */ k(() => L(r).props.aboveColor ?? vo(L(r).props)), t = /* @__PURE__ */ k(s), n = /* @__PURE__ */ k(() => J("tip.ribbon.stripeColor"));
					Pa(i, {
						get value() {
							return L(e);
						},
						get tokens() {
							return L(t);
						},
						get label() {
							return L(n);
						},
						onchange: (e) => a("aboveColor", e)
					});
				}
				E(t), I((e, r) => {
					q(t, "title", e), V(n, `${r ?? ""} `);
				}, [() => J("tip.ribbon.stripeColor"), () => J("lbl.colour")]), B(e, t);
			};
			H(l, (e) => {
				(L(r).props.above ?? "none") !== "none" && e(u);
			});
			var d = F(l, 2), f = M(d), p = P(f, !0), m = F(f, 2);
			{
				let e = /* @__PURE__ */ k(() => L(r).props.main ?? "text"), t = /* @__PURE__ */ k(ho);
				Y(m, {
					filled: !0,
					get value() {
						return L(e);
					},
					get options() {
						return L(t);
					},
					onchange: (e) => a("main", e)
				});
			}
			E(d);
			var h = F(d, 2), g = M(h), _ = P(g, !0), v = F(g, 2);
			{
				let e = /* @__PURE__ */ k(() => L(r).props.below ?? "none"), t = /* @__PURE__ */ k(go);
				Y(v, {
					filled: !0,
					get value() {
						return L(e);
					},
					get options() {
						return L(t);
					},
					onchange: (e) => a("below", e)
				});
			}
			E(h);
			var y = F(h, 2), b = (e) => {
				var t = vd(), n = M(t), i = F(n);
				{
					let e = /* @__PURE__ */ k(() => L(r).props.belowColor ?? vo(L(r).props)), t = /* @__PURE__ */ k(s), n = /* @__PURE__ */ k(() => J("tip.ribbon.stripeColor"));
					Pa(i, {
						get value() {
							return L(e);
						},
						get tokens() {
							return L(t);
						},
						get label() {
							return L(n);
						},
						onchange: (e) => a("belowColor", e)
					});
				}
				E(t), I((e, r) => {
					q(t, "title", e), V(n, `${r ?? ""} `);
				}, [() => J("tip.ribbon.stripeColor"), () => J("lbl.colour")]), B(e, t);
			};
			H(y, (e) => {
				(L(r).props.below ?? "none") !== "none" && e(b);
			});
			var x = F(y, 2), S = (e) => {
				var t = yd(), n = N(t);
				{
					let e = /* @__PURE__ */ k(() => J("lbl.ribbonStripePlace")), t = /* @__PURE__ */ k(() => J("tip.ribbon.stripePlace")), i = /* @__PURE__ */ k(() => L(r).props.stripePlace ?? "stack"), o = /* @__PURE__ */ k(() => [["stack", J("opt.ribbonPlace.stack")], ["edge", J("opt.ribbonPlace.edge")]]);
					eu(n, {
						get label() {
							return L(e);
						},
						get title() {
							return L(t);
						},
						get value() {
							return L(i);
						},
						get options() {
							return L(o);
						},
						onchange: (e) => a("stripePlace", e)
					});
				}
				var i = F(n, 2), o = M(i), s = P(o, !0), c = F(o, 2);
				G(c);
				var l = P(F(c, 2));
				E(i), I((e, t) => {
					q(i, "title", e), V(s, t), K(c, L(r).props.thickness ?? 8), V(l, `${L(r).props.thickness ?? 8 ?? ""} px`);
				}, [() => J("tip.ribbon.thickness"), () => J("lbl.ribbonThickness")]), R("input", c, (e) => a("thickness", e.target.valueAsNumber)), B(e, t);
			};
			H(x, (e) => {
				((L(r).props.above ?? "none") !== "none" || (L(r).props.below ?? "none") !== "none") && e(S);
			}), I((e, t, r, i, a, s) => {
				q(n, "title", e), V(o, t), q(d, "title", r), V(p, i), q(h, "title", a), V(_, s);
			}, [
				() => J("tip.ribbon.above"),
				() => J("lbl.ribbonAbove"),
				() => J("tip.ribbon.main"),
				() => J("lbl.ribbonMain"),
				() => J("tip.ribbon.below"),
				() => J("lbl.ribbonBelow")
			]), B(e, t);
		}, o = (e) => {
			var t = xd(), n = N(t);
			{
				let e = /* @__PURE__ */ k(() => J("lbl.ribbonWidth")), t = /* @__PURE__ */ k(() => po(L(r).props.width)), i = /* @__PURE__ */ k(fo);
				eu(n, {
					get label() {
						return L(e);
					},
					get value() {
						return L(t);
					},
					get options() {
						return L(i);
					},
					onchange: (e) => a("width", e)
				});
			}
			var i = F(n, 2);
			{
				let e = /* @__PURE__ */ k(() => J("lbl.ribbonVariant")), t = /* @__PURE__ */ k(() => L(r).props.variant ?? "band"), n = /* @__PURE__ */ k(() => [["band", J("opt.ribbonVariant.band")], ["plain", J("opt.ribbonVariant.plain")]]);
				eu(i, {
					get label() {
						return L(e);
					},
					get value() {
						return L(t);
					},
					get options() {
						return L(n);
					},
					onchange: (e) => a("variant", e)
				});
			}
			var o = F(i, 2), s = M(o), c = P(s, !0), l = F(s, 2);
			G(l);
			var u = P(F(l, 2));
			E(o), I((e, t) => {
				q(o, "title", e), V(c, t), K(l, L(r).props.tilt ?? 0), V(u, `${L(r).props.tilt ?? 0 ?? ""}°`);
			}, [() => J("tip.ribbon.tilt"), () => J("lbl.ribbonTilt")]), R("input", l, (e) => a("tilt", e.target.valueAsNumber)), B(e, t);
		}, u = (e) => {
			var t = Sd(), n = N(t), i = M(n), o = P(i, !0), s = F(i, 2);
			{
				let e = /* @__PURE__ */ k(() => L(r).props.size ?? "md"), t = /* @__PURE__ */ k(() => [
					["sm", J("opt.size.sm")],
					["md", J("opt.size.md")],
					["lg", J("opt.size.lg")],
					["xl", J("opt.size.xl")]
				]);
				Y(s, {
					filled: !0,
					get value() {
						return L(e);
					},
					get options() {
						return L(t);
					},
					onchange: (e) => a("size", e)
				});
			}
			E(n);
			var c = F(n, 2), l = M(c);
			G(l);
			var u = F(l);
			E(c);
			var d = F(c, 2), f = M(d);
			G(f);
			var p = F(f);
			E(d);
			var m = F(d, 2), h = M(m);
			G(h);
			var g = F(h);
			E(m);
			var _ = F(m, 2), v = M(_), y = P(v, !0), b = F(v, 2);
			G(b);
			var x = P(F(b, 2));
			E(_), I((e, t, n, i, a, s, v, S, C) => {
				V(o, e), q(c, "title", t), Ni(l, L(r).props.caps === !0), V(u, ` ${n ?? ""}`), q(d, "title", i), Ni(f, L(r).props.weight === "bold"), V(p, ` ${a ?? ""}`), q(m, "title", s), Ni(h, L(r).props.outline === !0), V(g, ` ${v ?? ""}`), q(_, "title", S), V(y, C), K(b, L(r).props.gap ?? 40), V(x, `${L(r).props.gap ?? 40 ?? ""} px`);
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
			]), R("change", l, (e) => a("caps", e.target.checked)), R("change", f, (e) => a("weight", e.target.checked ? "bold" : "normal")), R("change", h, (e) => a("outline", e.target.checked)), R("input", b, (e) => a("gap", e.target.valueAsNumber)), B(e, t);
		}, d = (e) => {
			var t = wd(), n = M(t), i = (e) => {
				var t = Cd(), n = M(t);
				{
					let e = /* @__PURE__ */ k(() => L(r).props.bg ?? "accent"), t = /* @__PURE__ */ k(s), i = /* @__PURE__ */ k(() => J("tip.ribbon.bg"));
					Pa(n, {
						get value() {
							return L(e);
						},
						get tokens() {
							return L(t);
						},
						get label() {
							return L(i);
						},
						onchange: (e) => a("bg", e)
					});
				}
				var i = P(F(n, 2), !0);
				E(t), I((e, n) => {
					q(t, "title", e), V(i, n);
				}, [() => J("tip.ribbon.bg"), () => J("lbl.background")]), B(e, t);
			};
			H(n, (e) => {
				(L(r).props.variant ?? "band") !== "plain" && e(i);
			});
			var o = F(n, 2), c = M(o);
			{
				let e = /* @__PURE__ */ k(() => L(r).props.color ?? ((L(r).props.variant ?? "band") === "plain" ? "text" : "accent-text")), t = /* @__PURE__ */ k(s), n = /* @__PURE__ */ k(() => J("tip.ribbon.color"));
				Pa(c, {
					get value() {
						return L(e);
					},
					get tokens() {
						return L(t);
					},
					get label() {
						return L(n);
					},
					onchange: (e) => a("color", e)
				});
			}
			var l = P(F(c, 2), !0);
			E(o), E(t), I((e, t) => {
				q(o, "title", e), V(l, t);
			}, [() => J("tip.ribbon.color"), () => J("lbl.textColor")]), B(e, t);
		}, f = /* @__PURE__ */ k(() => L(r).props.motion ?? "roll"), p = /* @__PURE__ */ k(() => [L(r).props.above ?? "none", L(r).props.below ?? "none"].filter((e) => e !== "none").length), m = /* @__PURE__ */ k(() => l({
			bg: void 0,
			color: void 0
		}));
		var h = Td(), g = N(h);
		{
			let e = /* @__PURE__ */ k(() => J("lbl.ribbonMotion")), n = /* @__PURE__ */ k(() => mo().find(([e]) => e === L(f))?.[1] ?? ""), r = /* @__PURE__ */ k(() => c("ribbon-motion", {
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
					return L(e);
				},
				get value() {
					return L(n);
				},
				get reset() {
					return L(r);
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var _ = F(g, 2);
		{
			let e = /* @__PURE__ */ k(() => J("lbl.ribbonStripes")), t = /* @__PURE__ */ k(() => L(p) ? J("menu.onCount", { n: L(p) }) : J("common.off")), n = /* @__PURE__ */ k(() => c("ribbon-stripes", {
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
					return L(e);
				},
				get value() {
					return L(t);
				},
				get reset() {
					return L(n);
				},
				children: (e, t) => {
					i(e);
				},
				$$slots: { default: !0 }
			});
		}
		var v = F(_, 2);
		{
			let e = /* @__PURE__ */ k(() => J("lbl.ribbonShape")), t = /* @__PURE__ */ k(() => fo().find(([e]) => e === po(L(r).props.width))?.[1] ?? ""), n = /* @__PURE__ */ k(() => c("ribbon-shape", {
				width: "canvas",
				variant: "band",
				tilt: 0
			}));
			Wc(v, {
				id: "ribbon-shape",
				get title() {
					return L(e);
				},
				get value() {
					return L(t);
				},
				get reset() {
					return L(n);
				},
				children: (e, t) => {
					o(e);
				},
				$$slots: { default: !0 }
			});
		}
		var y = F(v, 2);
		{
			let e = /* @__PURE__ */ k(() => J("lbl.ribbonText")), t = /* @__PURE__ */ k(() => ({
				sm: J("opt.size.sm"),
				md: J("opt.size.md"),
				lg: J("opt.size.lg"),
				xl: J("opt.size.xl")
			})[L(r).props.size ?? "md"]), n = /* @__PURE__ */ k(() => c("ribbon-text", {
				size: "md",
				caps: !1,
				weight: "normal",
				outline: !1,
				gap: 40
			}));
			Wc(y, {
				id: "ribbon-text",
				get title() {
					return L(e);
				},
				get value() {
					return L(t);
				},
				get reset() {
					return L(n);
				},
				children: (e, t) => {
					u(e);
				},
				$$slots: { default: !0 }
			});
		}
		var b = F(y, 2);
		{
			let e = /* @__PURE__ */ k(() => J("group.navColours")), t = /* @__PURE__ */ k(() => L(m) ? J("menu.changed", { n: L(m) }) : J("menu.standard")), n = /* @__PURE__ */ k(() => c("ribbon-colours", {
				bg: void 0,
				color: void 0
			}));
			Wc(b, {
				id: "ribbon-colours",
				get title() {
					return L(e);
				},
				get value() {
					return L(t);
				},
				get reset() {
					return L(n);
				},
				children: (e, t) => {
					d(e);
				},
				$$slots: { default: !0 }
			});
		}
		B(e, h);
	};
	H(g, (e) => {
		t.area === "content" ? e(_) : t.area === "style" && e(v, 1);
	}), B(e, m), tt();
}
Nr([
	"change",
	"click",
	"input"
]);
//#endregion
//#region src/lib/MarkPicker.svelte
var Dd = /* @__PURE__ */ z("<span class=\"mp-count svelte-1y5ipgc\"> </span>"), Od = /* @__PURE__ */ z("<div class=\"mp-tabs svelte-1y5ipgc\" role=\"group\"><button type=\"button\"> </button> <button type=\"button\"> <!></button></div>"), kd = /* @__PURE__ */ z("<button type=\"button\"><span class=\"mp-svg svelte-1y5ipgc\"></span></button>"), Ad = /* @__PURE__ */ z("<p class=\"mp-hint svelte-1y5ipgc\"> </p>"), jd = /* @__PURE__ */ z("<input class=\"mp-search svelte-1y5ipgc\" type=\"search\"/> <div class=\"mp-scroll svelte-1y5ipgc\"><div class=\"mp-grid svelte-1y5ipgc\"><button type=\"button\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" aria-hidden=\"true\" class=\"svelte-1y5ipgc\"><circle cx=\"12\" cy=\"12\" r=\"8.5\"></circle><path d=\"M6 18L18 6\"></path></svg></button> <!></div> <!></div>", 1), Md = /* @__PURE__ */ z("<button type=\"button\"><img alt=\"\" class=\"svelte-1y5ipgc\"/></button>"), Nd = /* @__PURE__ */ z("<div class=\"mp-scroll svelte-1y5ipgc\"><div class=\"mp-grid mp-grid-img svelte-1y5ipgc\"><button type=\"button\" class=\"mp-cell mp-upload svelte-1y5ipgc\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" aria-hidden=\"true\" class=\"svelte-1y5ipgc\"><path d=\"M12 5v14\"></path><path d=\"M5 12h14\"></path></svg> <span> </span></button> <!></div> <p class=\"mp-hint svelte-1y5ipgc\"> </p></div>"), Pd = /* @__PURE__ */ z("<!> <!>", 1), Fd = /* @__PURE__ */ z("<img class=\"mp-own svelte-1y5ipgc\" alt=\"\"/>"), Id = /* @__PURE__ */ z("<span class=\"mp-svg svelte-1y5ipgc\"></span>"), Ld = /* @__PURE__ */ z("<span class=\"mp-empty svelte-1y5ipgc\" aria-hidden=\"true\">+</span>"), Rd = /* @__PURE__ */ z("<div class=\"mp-pop mp-anchored svelte-1y5ipgc\" popover=\"auto\"><!></div>"), zd = /* @__PURE__ */ z("<div class=\"mp-pop svelte-1y5ipgc\"><!></div>"), Bd = /* @__PURE__ */ z("<span class=\"mp svelte-1y5ipgc\"><button type=\"button\"><!></button> <!> <input type=\"file\" accept=\"image/*\" hidden=\"\"/></span>");
function Vd(e, t) {
	et(t, !0);
	let n = (e) => {
		var t = Pd(), n = N(t), a = (e) => {
			var t = Od(), n = M(t);
			let r;
			var i = P(n, !0), a = F(n, 2);
			let s;
			var c = M(a, !0), l = F(c), u = (e) => {
				var t = Dd(), n = P(t, !0);
				I(() => V(n, L(S).length)), B(e, t);
			};
			H(l, (e) => {
				L(S).length && e(u);
			}), E(a), E(t), I((e, l) => {
				q(t, "aria-label", o()), r = W(n, 1, "mp-tab svelte-1y5ipgc", null, r, { on: L(_) === "icons" }), q(n, "aria-pressed", L(_) === "icons"), V(i, e), s = W(a, 1, "mp-tab svelte-1y5ipgc", null, s, { on: L(_) === "images" }), q(a, "aria-pressed", L(_) === "images"), V(c, l);
			}, [() => J("mp.icons"), () => J("mp.images")]), R("click", n, () => j(_, "icons")), R("click", a, () => j(_, "images")), B(e, t);
		};
		H(n, (e) => {
			l() || e(a);
		});
		var c = F(n, 2), u = (e) => {
			var t = jd(), n = N(t);
			G(n);
			var a = F(n, 2), o = M(a), c = M(o);
			let l;
			ri(F(c, 2), 17, () => L(x), ({ id: e }) => e, (e, t) => {
				let n = () => L(t).id;
				var a = kd();
				let o;
				var s = M(a);
				U(s, () => Cu(n()), !0), E(s), E(a), I((e, t) => {
					o = W(a, 1, "mp-cell svelte-1y5ipgc", null, o, { active: n() === r() && !i() }), q(a, "title", e), q(a, "aria-label", t);
				}, [() => J(xu[n()].labelKey), () => J(xu[n()].labelKey)]), R("click", a, () => te(n())), B(e, a);
			}), E(o);
			var u = F(o, 2), d = (e) => {
				var t = Ad(), n = P(t, !0);
				I((e) => V(n, e), [() => J("mp.noHits")]), B(e, t);
			};
			H(u, (e) => {
				L(x).length || e(d);
			}), E(a), I((e, t) => {
				q(n, "placeholder", e), q(n, "aria-label", t), l = W(c, 1, "mp-cell mp-none svelte-1y5ipgc", null, l, { active: !r() && !i() }), q(c, "title", s()), q(c, "aria-label", s());
			}, [() => J("mp.search"), () => J("mp.search")]), Li(n, () => L(v), (e) => j(v, e)), R("click", c, re), B(e, t);
		}, d = (e) => {
			var t = Nd(), n = M(t), r = M(n), a = P(F(M(r), 2), !0);
			E(r), ri(F(r, 2), 16, () => L(S), (e) => e, (e, t) => {
				var n = Md();
				let r;
				var a = P(n);
				I(() => {
					r = W(n, 1, "mp-cell mp-img svelte-1y5ipgc", null, r, { active: t === i() }), q(a, "src", t);
				}), R("click", n, () => ne(t)), B(e, n);
			}), E(n);
			var o = P(F(n, 2), !0);
			E(t), I((e, t) => {
				V(a, e), V(o, t);
			}, [() => J("mp.upload"), () => J("mp.imagesHint")]), R("click", r, oe), B(e, t);
		};
		H(c, (e) => {
			L(_) === "icons" ? e(u) : e(d, -1);
		}), B(e, t);
	}, r = qi(t, "icon", 3, ""), i = qi(t, "image", 3, ""), a = qi(t, "images", 19, () => []), o = qi(t, "label", 19, () => J("mp.pickMark")), s = qi(t, "noneLabel", 19, () => J("common.none")), c = qi(t, "klass", 3, ""), l = qi(t, "iconsOnly", 3, !1), u = _a(), d = ya("urd-mp"), f = d.slice(2), p = /* @__PURE__ */ A(null), m = /* @__PURE__ */ A(null), h = /* @__PURE__ */ A(null), g = /* @__PURE__ */ A(!1), _ = /* @__PURE__ */ A("icons"), v = /* @__PURE__ */ A(""), y = /* @__PURE__ */ A(cn({
		top: 0,
		left: 0
	})), b = Su.flatMap(([e, t]) => t.map((t) => ({
		id: t,
		cat: e
	}))), x = /* @__PURE__ */ k(() => {
		let e = L(v).trim().toLowerCase();
		return e ? b.filter(({ id: t }) => {
			let n = J(xu[t].labelKey) || xu[t].label;
			return t.includes(e) || n.toLowerCase().includes(e);
		}) : b;
	}), S = /* @__PURE__ */ k(() => [...new Set(a().filter(Boolean))]);
	function C() {
		j(v, ""), j(ie, !1), j(_, i() && !l() ? "images" : "icons", !0);
	}
	function w(e) {
		j(g, e.newState === "open"), ba(L(p), L(g)), L(g) && C();
	}
	function T() {
		u && L(m)?.hidePopover(), j(g, !1);
	}
	function ee() {
		C();
		let e = L(p).getBoundingClientRect();
		j(y, {
			left: Math.max(8, Math.min(e.left, window.innerWidth - 286 - 8)),
			top: e.bottom + 332 + 8 > window.innerHeight ? Math.max(8, e.top - 332 - 8) : e.bottom + 6
		}, !0), j(g, !0);
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
	let ie = /* @__PURE__ */ A(!1);
	function ae(e) {
		j(ie, !1);
		let n = e.target.files?.[0];
		e.target.value = "", n && t.onfile?.(n);
	}
	function oe() {
		j(ie, !0), L(h).click();
	}
	On(() => {
		if (!L(g)) return;
		let e = () => {
			L(ie) || T();
		};
		if (window.addEventListener("blur", e), u) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			L(p) && !L(p).contains(e.target) && j(g, !1);
		}, n = (e) => {
			e.key === "Escape" && j(g, !1);
		}, r = (e) => {
			L(p) && e.target instanceof Node && !L(p).contains(e.target) && j(g, !1);
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var se = Bd(), ce = M(se), le = M(ce), ue = (e) => {
		var n = Hr();
		li(N(n), () => t.children), B(e, n);
	}, de = (e) => {
		var t = Fd();
		I(() => q(t, "src", i())), B(e, t);
	}, fe = (e) => {
		var t = Id();
		U(t, () => Cu(r()), !0), E(t), B(e, t);
	}, pe = (e) => {
		B(e, Ld());
	};
	H(le, (e) => {
		t.children ? e(ue) : i() ? e(de, 1) : r() && xu[r()] ? e(fe, 2) : e(pe, -1);
	}), E(ce);
	var me = F(ce, 2), he = (e) => {
		var t = Rd(), r = M(t), i = (e) => {
			n(e);
		};
		H(r, (e) => {
			L(g) && e(i);
		}), E(t), Ui(t, (e) => j(m, e), () => L(m)), I(() => {
			q(t, "id", f), Oi(t, `position-anchor: ${d ?? ""}`);
		}), Mr("toggle", t, w), B(e, t);
	}, ge = (e) => {
		var t = zd(), r = M(t);
		n(r), E(t), I(() => Oi(t, `top: ${L(y).top ?? ""}px; left: ${L(y).left ?? ""}px`)), B(e, t);
	};
	H(me, (e) => {
		u ? e(he) : L(g) && e(ge, 1);
	});
	var _e = F(me, 2);
	Ui(_e, (e) => j(h, e), () => L(h)), E(se), Ui(se, (e) => j(p, e), () => L(p)), I(() => {
		W(ce, 1, `mp-trigger ${c() ?? ""}`, "svelte-1y5ipgc"), q(ce, "title", o()), q(ce, "aria-label", o()), q(ce, "popovertarget", u ? f : void 0), Oi(ce, u ? `anchor-name: ${d}` : void 0);
	}), R("click", ce, function(...e) {
		(u ? void 0 : () => L(g) ? j(g, !1) : ee())?.apply(this, e);
	}), R("change", _e, ae), Mr("cancel", _e, () => j(ie, !1)), B(e, se), tt();
}
Nr(["click", "change"]);
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
], Ud = (e) => e ? e.startsWith("#") ? e : `var(--urd-color-${e})` : "var(--urd-color-accent)", Wd = /* @__PURE__ */ A("title"), Gd = /* @__PURE__ */ z("<div class=\"bg-layer\"><span class=\"toolbar-row\"><span class=\"cal-ref-swatch\" aria-hidden=\"true\"></span> <span> </span> <button class=\"ghost row-tool\"></button></span></div>"), Kd = /* @__PURE__ */ z("<div class=\"bg-layer\"><span class=\"toolbar-row\"><input class=\"tb-grow\" spellcheck=\"false\"/> <button class=\"ghost row-tool\"></button></span> <span class=\"toolbar-row\"><input class=\"tb-grow\"/> <!></span> <button type=\"button\" class=\"ghost action\"> </button></div>"), qd = /* @__PURE__ */ z("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), Jd = /* @__PURE__ */ z("<span class=\"gridmenu-value\"> </span>"), Yd = /* @__PURE__ */ z("<!> <button type=\"button\" class=\"ghost action\"><!> </button> <span class=\"mini-label\"> </span> <!> <!> <button type=\"button\" class=\"linkish\"> </button>", 1), Xd = /* @__PURE__ */ z("<label> <!></label>"), Zd = /* @__PURE__ */ z("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <!></div> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <!></div>", 1), Qd = /* @__PURE__ */ z("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <!>", 1), $d = /* @__PURE__ */ z("<div class=\"pin-line\"><label> <input type=\"number\" min=\"1\" max=\"50\"/></label> <!></div> <!>", 1), ef = /* @__PURE__ */ z("<!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"0\" max=\"10\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div>", 1), tf = /* @__PURE__ */ z("<!> <!> <!> <!> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <!> <!>", 1), nf = /* @__PURE__ */ z("<label> <input placeholder=\"/program\" spellcheck=\"false\"/></label>"), rf = /* @__PURE__ */ z("<!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <div class=\"pin-line\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <!>", 1), af = /* @__PURE__ */ z("<label> <input/></label> <label> <!></label>", 1), of = /* @__PURE__ */ z("<label class=\"field-stack\"> <textarea rows=\"3\"></textarea></label>"), sf = /* @__PURE__ */ z("<!> <label> <input/></label> <!> <label> <input placeholder=\"https://\" spellcheck=\"false\"/></label>", 1), cf = /* @__PURE__ */ z("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!>", 1), lf = /* @__PURE__ */ z("<button type=\"button\" class=\"ghost action\"> </button>"), uf = /* @__PURE__ */ z("<!> <!> <!> <!> <!> <!>", 1), df = /* @__PURE__ */ z("<label> <input type=\"number\" min=\"0\" max=\"24\"/></label>"), ff = /* @__PURE__ */ z("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <!></div>"), pf = /* @__PURE__ */ z("<span class=\"mini-label\"> </span>"), mf = /* @__PURE__ */ z("<div class=\"cal-slot\"><!> <span class=\"mini-label\"> </span></div>"), hf = /* @__PURE__ */ z("<!> <div class=\"cal-slots\"></div>", 1), gf = /* @__PURE__ */ z("<!> <label> <!></label> <label> <input type=\"number\"/></label> <!> <span class=\"toolbar-row\"><button type=\"button\"><i> </i></button> <button type=\"button\"><u> </u></button> <!></span>", 1), _f = /* @__PURE__ */ z("<div class=\"pin-line\"><button type=\"button\" class=\"menu-row cal-design-row\"><span class=\"menu-group-title\"> </span><span class=\"menu-group-value\"> </span></button> <!></div>   <!> <!> <!> <!>", 1);
function vf(e, t) {
	et(t, !0);
	let n = Qe("urd-editor"), r = /* @__PURE__ */ k(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, setBlockProps: o, siteCalendars: s, siteCalendarById: c, addSiteCalendar: l, themeSwatches: u } = n, d = {
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
		let n = { ...L(r).props.options ?? {} };
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
		return L(r)?.props.fieldStyle?.[L(Wd)] ?? {};
	}
	function g(e) {
		let t = L(r).props.texts?.[e];
		return typeof t == "string" ? new DOMParser().parseFromString(t.replace(/<br\s*\/?>/gi, "\n"), "text/html").body.textContent.trim() : "";
	}
	function _(e, t) {
		let n = t.trim(), i = { ...L(r).props.texts ?? {} };
		n ? i[e] = n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>") : delete i[e], a("texts", Object.keys(i).length ? i : void 0);
	}
	function v(e, t) {
		let n = { ...L(r).props.colors ?? {} };
		t ? n[e] = t : delete n[e], a("colors", Object.keys(n).length ? n : void 0);
	}
	function y(e) {
		let t = {
			...L(r).props.stripe ?? {},
			...e
		};
		for (let e of Object.keys(t)) t[e] === void 0 && delete t[e];
		a("stripe", Object.keys(t).length ? t : void 0);
	}
	function b(e) {
		let t = { ...L(r).props.fieldStyle ?? {} }, n = {
			...t[L(Wd)] ?? {},
			...e
		};
		for (let e of Object.keys(n)) n[e] === void 0 && delete n[e];
		Object.keys(n).length ? t[L(Wd)] = n : delete t[L(Wd)], a("fieldStyle", Object.keys(t).length ? t : void 0);
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
	} : t, C = () => new Set((L(r).props.sources ?? []).map((e) => x(e).ref).filter(Boolean));
	function w(e, t) {
		let n = Ke(L(r).props.sources ?? []).filter((t) => x(t).ref !== e);
		a("sources", t ? [...n, { calendar: e }] : n);
	}
	function T(e) {
		let t = Ke(L(r).props.sources ?? []), { url: n, name: i, color: o } = x(t[e]), s = l({
			url: n.trim(),
			...i ? { name: i } : {},
			...o ? { color: o } : {}
		});
		a("sources", t.map((t, n) => n === e ? { calendar: s } : t));
	}
	function ee(e, t) {
		i(`edit:${L(r).blockId}:source${e}`, (n) => {
			let r = [...n.props.sources ?? []];
			r[e] = S({
				...x(r[e]),
				...t
			}), n.props.sources = r;
		});
	}
	function te() {
		a("sources", [...Ke(L(r).props.sources ?? []), ""]);
	}
	function ne(e) {
		a("sources", Ke(L(r).props.sources ?? []).filter((t, n) => n !== e));
	}
	function re() {
		let e = L(r).props, t = ts(e.design), n = (e, t) => () => o(e, t), i = ns(e), a = i === "agenda" ? 8 : 6, s = i === "next" ? 3 : void 0, l = e.switcher === !0 || e.switcherViews != null || e.toolsSize != null || e.description != null || e.showMore === !1 || (e.limit ?? 6) !== a || e.nextCount !== s || e.laterCount !== s || e.showCancelled === !1 || e.structuredData === !1 || e.clock != null || e.weekStart != null, u = [
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
			view: J(d[ns(e)]),
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
			stripe: cs(t, e.stripe).show ? J("common.on") : J("common.off"),
			stripeReset: e.stripe ? n("cal-stripe", { stripe: void 0 }) : null,
			fields: g ? J("menu.changed", { n: g }) : J("menu.standard"),
			fieldsReset: g ? n("cal-fields", { fieldStyle: void 0 }) : null
		};
	}
	var ie = Hr(), ae = N(ie), oe = (e) => {
		let t = (e) => {
			var t = Yd(), i = N(t);
			ri(i, 17, () => L(r).props.sources ?? [], $r, (e, t, n) => {
				let r = /* @__PURE__ */ k(() => x(L(t)));
				var i = Hr(), a = N(i), o = (e) => {
					let t = /* @__PURE__ */ k(() => c(L(r).ref));
					var i = Gd(), a = M(i), o = M(a);
					let s;
					var l = F(o, 2);
					let u;
					var d = P(l, !0), f = F(l, 2);
					U(f, () => X.cross, !0), E(f), E(a), E(i), I((e, n, r) => {
						s = Oi(o, "", s, { background: e }), u = W(l, 1, "tb-grow cal-ref-name", null, u, { muted: !L(t) }), V(d, n), q(f, "title", r);
					}, [
						() => Ud(L(t)?.color),
						() => L(t) ? L(t).name || L(t).url : J("calendar.refMissing"),
						() => J("ui.remove")
					]), R("click", f, () => ne(n)), B(e, i);
				}, s = (e) => {
					var t = Kd(), i = M(t), a = M(i);
					G(a);
					var o = F(a, 2);
					U(o, () => X.cross, !0), E(o), E(i);
					var s = F(i, 2), c = M(s);
					G(c);
					var l = F(c, 2);
					{
						let e = /* @__PURE__ */ k(() => L(r).color || "accent"), t = /* @__PURE__ */ k(u), i = /* @__PURE__ */ k(() => J("tip.calendar.sourceColor"));
						Pa(l, {
							get value() {
								return L(e);
							},
							get tokens() {
								return L(t);
							},
							allowClear: !0,
							get label() {
								return L(i);
							},
							onchange: (e) => ee(n, { color: e ?? "" })
						});
					}
					E(s);
					var d = F(s, 2), f = P(d, !0);
					E(t), I((e, t, n, i, s, l, u, p) => {
						K(a, L(r).url), q(a, "placeholder", e), q(a, "title", t), q(o, "title", n), K(c, L(r).name), q(c, "placeholder", i), q(c, "title", s), q(d, "title", l), d.disabled = u, V(f, p);
					}, [
						() => J("calendar.sourcesPh"),
						() => J("calendar.sourceUrl"),
						() => J("ui.remove"),
						() => J("calendar.sourceName"),
						() => J("tip.calendar.sourceName"),
						() => J("tip.calendar.saveToSite"),
						() => !L(r).url.trim(),
						() => J("calendar.saveToSite")
					]), R("change", a, (e) => ee(n, { url: e.target.value.trim() })), R("click", o, () => ne(n)), R("change", c, (e) => ee(n, { name: e.target.value.trim() })), R("click", d, () => T(n)), B(e, t);
				};
				H(a, (e) => {
					L(r).ref ? e(o) : e(s, -1);
				}), B(e, i);
			});
			var a = F(i, 2), o = M(a);
			U(o, () => X.plus);
			var l = F(o);
			E(a);
			var d = F(a, 2), f = P(d, !0), p = F(d, 2);
			ri(p, 17, s, (e) => e.id, (e, t) => {
				var n = qd(), r = M(n);
				G(r);
				var i = F(r);
				E(n), I((e) => {
					Ni(r, e), V(i, ` ${(L(t).name || L(t).url) ?? ""}`);
				}, [() => C().has(L(t).id)]), R("change", r, (e) => w(L(t).id, e.target.checked)), B(e, n);
			});
			var m = F(p, 2), h = (e) => {
				var t = Jd(), n = P(t, !0);
				I((e) => V(n, e), [() => J("calendar.siteSourcesNone")]), B(e, t);
			}, g = /* @__PURE__ */ k(() => !s().length);
			H(m, (e) => {
				L(g) && e(h);
			});
			var _ = F(m, 2), v = P(_, !0);
			I((e, t, n, r) => {
				V(l, ` ${e ?? ""}`), q(d, "title", t), V(f, n), V(v, r);
			}, [
				() => J("ui.addCalendar"),
				() => J("tip.calendar.siteSources"),
				() => J("calendar.siteSources"),
				() => J("calendar.editSiteCalendars")
			]), R("click", a, te), R("click", _, () => n.openPanel("site", { calendars: !0 })), B(e, t);
		}, i = (e) => {
			var t = tf(), n = N(t), i = (e) => {
				var t = Xd(), n = M(t), i = F(n);
				{
					let e = /* @__PURE__ */ k(() => L(r).props.view ?? "list"), t = /* @__PURE__ */ k(() => [
						["list", J("calendar.viewList")],
						["cards", J("calendar.viewCards")],
						["month", J("calendar.viewMonth")],
						["agenda", J("calendar.viewAgenda")],
						["next", J("calendar.viewNext")]
					]);
					Y(i, {
						get value() {
							return L(e);
						},
						get options() {
							return L(t);
						},
						onchange: (e) => a("view", e)
					});
				}
				E(t), I((e) => V(n, `${e ?? ""} `), [() => J("lbl.view")]), B(e, t);
			}, o = /* @__PURE__ */ k(() => !ts(L(r).props.design).view);
			H(n, (e) => {
				L(o) && e(i);
			});
			var s = F(n, 2), c = (e) => {
				var t = Qd(), n = N(t), i = M(n);
				G(i);
				var o = F(i);
				E(n);
				var s = F(n, 2), c = (e) => {
					let t = /* @__PURE__ */ k(() => Yo(L(r).props));
					var n = Zd(), i = N(n), o = M(i), s = P(o, !0), c = F(o, 2);
					{
						let e = /* @__PURE__ */ k(() => qo.map((e) => [e, J(`calendar.design.${e}`)]));
						Y(c, {
							get value() {
								return L(t).week;
							},
							get options() {
								return L(e);
							},
							onchange: (e) => a("switcherViews", {
								...L(r).props.switcherViews ?? {},
								week: e
							})
						});
					}
					E(i);
					var l = F(i, 2), u = M(l), d = P(u, !0), f = F(u, 2);
					{
						let e = /* @__PURE__ */ k(() => Jo.map((e) => [e, J(e === "month" ? "calendar.viewMonth" : `calendar.design.${e}`)]));
						Y(f, {
							get value() {
								return L(t).month;
							},
							get options() {
								return L(e);
							},
							onchange: (e) => a("switcherViews", {
								...L(r).props.switcherViews ?? {},
								month: e
							})
						});
					}
					E(l), I((e, t, n, r) => {
						q(i, "title", e), V(s, t), q(l, "title", n), V(d, r);
					}, [
						() => J("tip.calendar.switchWeek"),
						() => J("calendar.switchWeek"),
						() => J("tip.calendar.switchMonth"),
						() => J("calendar.switchMonth")
					]), B(e, n);
				};
				H(s, (e) => {
					L(r).props.switcher === !0 && e(c);
				});
				var l = F(s, 2);
				{
					let e = /* @__PURE__ */ k(() => J("calendar.toolsSize")), t = /* @__PURE__ */ k(() => J("tip.calendar.toolsSize")), n = /* @__PURE__ */ k(() => ["s", "l"].includes(L(r).props.toolsSize) ? L(r).props.toolsSize : "m"), i = /* @__PURE__ */ k(() => [
						["s", J("calendar.toolsSize.s")],
						["m", J("calendar.toolsSize.m")],
						["l", J("calendar.toolsSize.l")]
					]);
					eu(l, {
						get label() {
							return L(e);
						},
						get title() {
							return L(t);
						},
						get value() {
							return L(n);
						},
						get options() {
							return L(i);
						},
						onchange: (e) => a("toolsSize", e === "m" ? void 0 : e)
					});
				}
				I((e, t) => {
					q(n, "title", e), Ni(i, L(r).props.switcher === !0), V(o, ` ${t ?? ""}`);
				}, [() => J("tip.calendar.switcher"), () => J("calendar.switcher")]), R("change", i, (e) => a("switcher", e.target.checked || void 0)), B(e, t);
			}, l = /* @__PURE__ */ k(() => rs.includes(ns(L(r).props)));
			H(s, (e) => {
				L(l) && e(c);
			});
			var u = F(s, 2), d = (e) => {
				var t = qd(), n = M(t);
				G(n);
				var i = F(n);
				E(t), I((e, a) => {
					q(t, "title", e), Ni(n, L(r).props.phoneDesign !== !1), V(i, ` ${a ?? ""}`);
				}, [() => J("tip.calendar.phoneDesign"), () => J("calendar.phoneDesign")]), R("change", n, (e) => a("phoneDesign", e.target.checked ? void 0 : !1)), B(e, t);
			}, f = /* @__PURE__ */ k(() => ts(L(r).props.design).phone === "switch");
			H(u, (e) => {
				L(f) && e(d);
			});
			var p = F(u, 2), m = (e) => {
				{
					let t = /* @__PURE__ */ k(() => J("calendar.opt.description")), n = /* @__PURE__ */ k(() => J("tip.calendar.opt.description")), i = /* @__PURE__ */ k(() => Xo(L(r).props)), o = /* @__PURE__ */ k(() => [["rows", J("calendar.descriptionRows")], ["card", J("calendar.descriptionCard")]]);
					eu(e, {
						get label() {
							return L(t);
						},
						get title() {
							return L(n);
						},
						get value() {
							return L(i);
						},
						get options() {
							return L(o);
						},
						onchange: (e) => a("description", e === "rows" ? void 0 : e)
					});
				}
			}, h = /* @__PURE__ */ k(() => Zo(L(r).props));
			H(p, (e) => {
				L(h) && e(m);
			});
			var g = F(p, 2), _ = (e) => {
				var t = $d(), n = N(t), i = M(n), o = M(i), s = F(o);
				G(s), E(i), Mo(F(i, 2), { id: "limit" }), E(n);
				var c = F(n, 2), l = (e) => {
					var t = qd(), n = M(t);
					G(n);
					var i = F(n);
					E(t), I((e, a) => {
						q(t, "title", e), Ni(n, L(r).props.showMore !== !1), V(i, ` ${a ?? ""}`);
					}, [() => J("tip.calendar.showMore"), () => J("calendar.showMore")]), R("change", n, (e) => a("showMore", e.target.checked ? void 0 : !1)), B(e, t);
				}, u = /* @__PURE__ */ k(() => ns(L(r).props) === "list" && ts(L(r).props.design).module !== "more");
				H(c, (e) => {
					L(u) && e(l);
				}), I((e, t) => {
					q(i, "title", e), V(o, `${t ?? ""} `), K(s, L(r).props.limit ?? 6);
				}, [() => J("tip.collection.limit"), () => J("lbl.maxCount")]), R("change", s, (e) => a("limit", Math.max(1, Math.min(50, Number(e.target.value) || 6)))), B(e, t);
			}, v = /* @__PURE__ */ k(() => [
				"list",
				"cards",
				"agenda"
			].includes(L(r).props.view ?? "list"));
			H(g, (e) => {
				L(v) && e(_);
			});
			var y = F(g, 2), b = M(y);
			G(b);
			var x = F(b);
			E(y);
			var S = F(y, 2), C = M(S);
			G(C);
			var w = F(C);
			E(S);
			var T = F(S, 2);
			{
				let e = /* @__PURE__ */ k(() => J("calendar.clock")), t = /* @__PURE__ */ k(() => J("tip.calendar.clock")), n = /* @__PURE__ */ k(() => L(r).props.clock === "12" ? "12" : "24"), i = /* @__PURE__ */ k(() => [["24", J("calendar.clock.24")], ["12", J("calendar.clock.12")]]);
				eu(T, {
					get label() {
						return L(e);
					},
					get title() {
						return L(t);
					},
					get value() {
						return L(n);
					},
					get options() {
						return L(i);
					},
					onchange: (e) => a("clock", e === "12" ? "12" : void 0)
				});
			}
			var ee = F(T, 2), te = (e) => {
				{
					let t = /* @__PURE__ */ k(() => J("calendar.weekStart")), n = /* @__PURE__ */ k(() => J("tip.calendar.weekStart")), i = /* @__PURE__ */ k(() => ["mon", "sun"].includes(L(r).props.weekStart) ? L(r).props.weekStart : "auto"), o = /* @__PURE__ */ k(() => [
						["auto", J("calendar.weekStart.auto")],
						["mon", J("calendar.weekStart.mon")],
						["sun", J("calendar.weekStart.sun")]
					]);
					eu(e, {
						get label() {
							return L(t);
						},
						get title() {
							return L(n);
						},
						get value() {
							return L(i);
						},
						get options() {
							return L(o);
						},
						onchange: (e) => a("weekStart", e === "auto" ? void 0 : e)
					});
				}
			}, ne = /* @__PURE__ */ k(() => [
				"month",
				"week",
				"year",
				"agenda"
			].includes(ns(L(r).props)) || L(r).props.design === "bento" || L(r).props.switcher === !0);
			H(ee, (e) => {
				L(ne) && e(te);
			});
			var re = F(ee, 2), ie = (e) => {
				var t = ef(), n = N(t);
				{
					let e = /* @__PURE__ */ k(() => J("calendar.nextCount")), t = /* @__PURE__ */ k(() => J("tip.calendar.nextCount")), i = /* @__PURE__ */ k(() => String(Math.min(3, Math.max(1, Number(L(r).props.nextCount) || 1))));
					eu(n, {
						get label() {
							return L(e);
						},
						get title() {
							return L(t);
						},
						get value() {
							return L(i);
						},
						options: [
							["1", "1"],
							["2", "2"],
							["3", "3"]
						],
						onchange: (e) => a("nextCount", Number(e))
					});
				}
				var i = F(n, 2), o = M(i), s = P(o, !0), c = F(o, 2);
				G(c);
				var l = P(F(c, 2), !0);
				E(i), I((e, t) => {
					q(i, "title", e), V(s, t), K(c, L(r).props.laterCount ?? 0), V(l, L(r).props.laterCount ?? 0);
				}, [() => J("tip.calendar.laterCount"), () => J("calendar.laterCount")]), R("input", c, (e) => a("laterCount", e.target.valueAsNumber)), B(e, t);
			};
			H(re, (e) => {
				L(r).props.view === "next" && e(ie);
			}), I((e, t, n, i) => {
				q(y, "title", e), Ni(b, L(r).props.showCancelled !== !1), V(x, ` ${t ?? ""}`), q(S, "title", n), Ni(C, L(r).props.structuredData !== !1), V(w, ` ${i ?? ""}`);
			}, [
				() => J("tip.calendar.showCancelled"),
				() => J("calendar.showCancelled"),
				() => J("tip.calendar.structuredData"),
				() => J("calendar.structuredData")
			]), R("change", b, (e) => a("showCancelled", e.target.checked ? void 0 : !1)), R("change", C, (e) => a("structuredData", e.target.checked ? void 0 : !1)), B(e, t);
		}, o = (e) => {
			var t = rf(), n = N(t), i = (e) => {
				var t = qd(), n = M(t);
				G(n);
				var i = F(n);
				E(t), I((e, a) => {
					q(t, "title", e), Ni(n, L(r).props.showCategories === !0), V(i, ` ${a ?? ""}`);
				}, [() => J("tip.calendar.showCategories"), () => J("calendar.showCategories")]), R("change", n, (e) => a("showCategories", e.target.checked)), B(e, t);
			}, o = /* @__PURE__ */ k(() => !ts(L(r).props.design).ownFilter);
			H(n, (e) => {
				L(o) && e(i);
			});
			var s = F(n, 2), c = M(s);
			G(c);
			var l = F(c);
			E(s);
			var u = F(s, 2), d = (e) => {
				var t = qd(), n = M(t);
				G(n);
				var i = F(n);
				E(t), I((e, a) => {
					q(t, "title", e), Ni(n, L(r).props.showEarlier === !0), V(i, ` ${a ?? ""}`);
				}, [() => J("tip.calendar.showEarlier"), () => J("calendar.showEarlier")]), R("change", n, (e) => a("showEarlier", e.target.checked ? !0 : void 0)), B(e, t);
			}, f = /* @__PURE__ */ k(() => ![
				"month",
				"week",
				"day",
				"year"
			].includes(ns(L(r).props)));
			H(u, (e) => {
				L(f) && e(d);
			});
			var p = F(u, 2), m = M(p), h = M(m);
			G(h);
			var g = F(h);
			E(m), Mo(F(m, 2), { id: "subscribe" }), E(p);
			var _ = F(p, 2), v = M(_);
			G(v);
			var y = F(v);
			E(_);
			var b = F(_, 2), x = M(b);
			G(x);
			var S = F(x);
			E(b);
			var C = F(b, 2), w = (e) => {
				var t = qd(), n = M(t);
				G(n);
				var i = F(n);
				E(t), I((e, a) => {
					q(t, "title", e), Ni(n, L(r).props.showOpen !== !1), V(i, ` ${a ?? ""}`);
				}, [() => J("tip.calendar.showOpen"), () => J("calendar.showOpen")]), R("change", n, (e) => a("showOpen", e.target.checked ? void 0 : !1)), B(e, t);
			}, T = /* @__PURE__ */ k(() => ts(L(r).props.design).open);
			H(C, (e) => {
				L(T) && e(w);
			});
			var ee = F(C, 2), te = (e) => {
				var t = nf(), n = M(t), i = F(n);
				G(i), E(t), I((e, a) => {
					q(t, "title", e), V(n, `${a ?? ""} `), K(i, L(r).props.programHref ?? "");
				}, [() => J("tip.calendar.programHref"), () => J("calendar.programHref")]), R("change", i, (e) => a("programHref", e.target.value.trim() || void 0)), B(e, t);
			}, ne = /* @__PURE__ */ k(() => ts(L(r).props.design).program);
			H(ee, (e) => {
				L(ne) && e(te);
			}), I((e, t, n, i, a, o) => {
				q(s, "title", e), Ni(c, L(r).props.showSearch === !0), V(l, ` ${t ?? ""}`), Ni(h, L(r).props.showSubscribe !== !1), V(g, ` ${n ?? ""}`), Ni(v, L(r).props.showSignup === !0), V(y, ` ${i ?? ""}`), q(b, "title", a), Ni(x, L(r).props.showAdd !== !1), V(S, ` ${o ?? ""}`);
			}, [
				() => J("tip.calendar.showSearch"),
				() => J("calendar.showSearch"),
				() => J("calendar.showSubscribe"),
				() => J("calendar.showSignup"),
				() => J("tip.calendar.showAdd"),
				() => J("calendar.showAdd")
			]), R("change", c, (e) => a("showSearch", e.target.checked ? !0 : void 0)), R("change", h, (e) => a("showSubscribe", e.target.checked)), R("change", v, (e) => a("showSignup", e.target.checked)), R("change", x, (e) => a("showAdd", e.target.checked ? void 0 : !1)), B(e, t);
		}, l = (e) => {
			var t = af(), n = N(t), i = M(n), o = F(i);
			G(o), E(n);
			var s = F(n, 2), c = M(s), l = F(c);
			{
				let e = /* @__PURE__ */ k(() => L(r).props.emptyIcon === "none" ? "" : L(r).props.emptyIcon ?? "calendar"), t = /* @__PURE__ */ k(() => J("tip.calendar.emptyIcon"));
				Vd(l, {
					iconsOnly: !0,
					get icon() {
						return L(e);
					},
					klass: "lbtn-mark",
					get label() {
						return L(t);
					},
					onpick: (e) => a("emptyIcon", e.icon || "none"),
					children: (e, t) => {
						var n = Hr(), i = N(n), a = (e) => {
							var t = Hr();
							U(N(t), () => Cu(L(r).props.emptyIcon ?? "calendar") || Cu("calendar")), B(e, t);
						};
						H(i, (e) => {
							L(r).props.emptyIcon !== "none" && e(a);
						}), B(e, n);
					},
					$$slots: { default: !0 }
				});
			}
			E(s), I((e, t, a, l, u) => {
				q(n, "title", e), V(i, `${t ?? ""} `), K(o, L(r).props.emptyText ?? ""), q(o, "placeholder", a), q(s, "title", l), V(c, `${u ?? ""} `);
			}, [
				() => J("tip.calendar.emptyText"),
				() => J("calendar.emptyText"),
				() => J("calendar.emptyPh"),
				() => J("tip.calendar.emptyIcon"),
				() => J("calendar.emptyIcon")
			]), R("change", o, (e) => a("emptyText", e.target.value.trim() || void 0)), B(e, t);
		}, d = (e) => {
			var t = Hr(), n = N(t), i = (e) => {
				var t = cf(), n = N(t), i = M(n);
				G(i);
				var o = F(i);
				E(n);
				var s = F(n, 2), c = (e) => {
					var t = sf(), n = N(t), i = (e) => {
						{
							let t = /* @__PURE__ */ k(() => J("calendar.noticeAs")), n = /* @__PURE__ */ k(() => J("tip.calendar.noticeAs")), i = /* @__PURE__ */ k(() => L(r).props.notice?.as === "band" ? "band" : "note"), o = /* @__PURE__ */ k(() => [["note", J("calendar.noticeAsNote")], ["band", J("calendar.noticeAsBand")]]);
							eu(e, {
								get label() {
									return L(t);
								},
								get title() {
									return L(n);
								},
								get value() {
									return L(i);
								},
								get options() {
									return L(o);
								},
								onchange: (e) => a("notice", {
									...L(r).props.notice ?? {},
									as: e === "band" ? "band" : void 0
								})
							});
						}
					}, o = /* @__PURE__ */ k(() => ts(L(r).props.design).noticeBand);
					H(n, (e) => {
						L(o) && e(i);
					});
					var s = F(n, 2), c = M(s), l = F(c);
					G(l), E(s);
					var u = F(s, 2), d = (e) => {
						var t = of(), n = M(t), r = F(n);
						pt(r), E(t), I((e, i, a) => {
							q(t, "title", e), V(n, `${i ?? ""} `), K(r, a);
						}, [
							() => J("tip.calendar.noticeBody"),
							() => J("calendar.noticeBody"),
							() => g("noticeText")
						]), R("change", r, (e) => _("noticeText", e.target.value)), B(e, t);
					}, f = /* @__PURE__ */ k(() => L(r).props.notice?.as !== "band" || !ts(L(r).props.design).noticeBand);
					H(u, (e) => {
						L(f) && e(d);
					});
					var p = F(u, 2), m = M(p), h = F(m);
					G(h), E(p), I((e, t, n, i, a, o) => {
						q(s, "title", e), V(c, `${t ?? ""} `), K(l, n), q(l, "placeholder", i), q(p, "title", a), V(m, `${o ?? ""} `), K(h, L(r).props.notice?.href ?? "");
					}, [
						() => J("tip.calendar.noticeHeading"),
						() => J("calendar.noticeHeading"),
						() => g("noticeTitle"),
						() => J("calendar.noticeTitleHint"),
						() => J("tip.calendar.noticeHref"),
						() => J("calendar.noticeHref")
					]), R("change", l, (e) => _("noticeTitle", e.target.value)), R("change", h, (e) => a("notice", {
						...L(r).props.notice ?? {},
						href: e.target.value.trim() || void 0
					})), B(e, t);
				};
				H(s, (e) => {
					L(r).props.notice?.show === !0 && e(c);
				}), I((e, t) => {
					q(n, "title", e), Ni(i, L(r).props.notice?.show === !0), V(o, ` ${t ?? ""}`);
				}, [() => J("tip.calendar.showNotice"), () => J("calendar.showNotice")]), R("change", i, (e) => a("notice", {
					...L(r).props.notice ?? {},
					show: e.target.checked
				})), B(e, t);
			}, o = /* @__PURE__ */ k(() => ts(L(r).props.design).notice);
			H(n, (e) => {
				L(o) && e(i);
			}), B(e, t);
		}, f = /* @__PURE__ */ k(re);
		var p = uf(), m = N(p);
		{
			let e = /* @__PURE__ */ k(() => J("calendar.sources"));
			Wc(m, {
				id: "cal-sources",
				get title() {
					return L(e);
				},
				get value() {
					return L(f).sources;
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var h = F(m, 2);
		{
			let e = /* @__PURE__ */ k(() => J("calendar.group.view"));
			Wc(h, {
				id: "cal-view",
				get title() {
					return L(e);
				},
				get value() {
					return L(f).view;
				},
				get reset() {
					return L(f).viewReset;
				},
				children: (e, t) => {
					i(e);
				},
				$$slots: { default: !0 }
			});
		}
		var v = F(h, 2);
		{
			let e = /* @__PURE__ */ k(() => J("calendar.group.buttons"));
			Wc(v, {
				id: "cal-buttons",
				get title() {
					return L(e);
				},
				get value() {
					return L(f).buttons;
				},
				get reset() {
					return L(f).buttonsReset;
				},
				children: (e, t) => {
					o(e);
				},
				$$slots: { default: !0 }
			});
		}
		var y = F(v, 2);
		{
			let e = /* @__PURE__ */ k(() => J("calendar.group.empty"));
			Wc(y, {
				id: "cal-empty",
				get title() {
					return L(e);
				},
				get value() {
					return L(f).empty;
				},
				get reset() {
					return L(f).emptyReset;
				},
				children: (e, t) => {
					l(e);
				},
				$$slots: { default: !0 }
			});
		}
		var b = F(y, 2), S = (e) => {
			{
				let t = /* @__PURE__ */ k(() => J("calendar.group.notice"));
				Wc(e, {
					id: "cal-notice",
					get title() {
						return L(t);
					},
					get value() {
						return L(f).notice;
					},
					get reset() {
						return L(f).noticeReset;
					},
					children: (e, t) => {
						d(e);
					},
					$$slots: { default: !0 }
				});
			}
		}, ie = /* @__PURE__ */ k(() => ts(L(r).props.design).notice);
		H(b, (e) => {
			L(ie) && e(S);
		});
		var ae = F(b, 2), oe = (e) => {
			var t = lf(), n = P(t, !0);
			I((e, r) => {
				q(t, "title", e), V(n, r);
			}, [() => J("tip.calendar.resetTexts"), () => J("calendar.resetTexts")]), R("click", t, () => a("texts", ps(L(r).props.texts))), B(e, t);
		}, se = /* @__PURE__ */ k(() => fs(ts(L(r).props.design), L(r).props.texts));
		H(ae, (e) => {
			L(se) && e(oe);
		}), B(e, p);
	}, se = (e) => {
		let t = (e) => {
			var t = Hr(), n = N(t), i = (e) => {
				let t = /* @__PURE__ */ k(() => $o(L(r).props));
				var n = Hr();
				ri(N(n), 17, () => Qo(L(r).props.design).filter((e) => es(e, L(t))), (e) => e.key, (e, n) => {
					var r = Hr(), i = N(r), a = (e) => {
						var r = qd(), i = M(r);
						G(i);
						var a = F(i);
						E(r), I((e) => {
							Ni(i, L(t)[L(n).key]), V(a, ` ${e ?? ""}`);
						}, [() => J(L(n).labelKey)]), R("change", i, (e) => f(L(n), e.target.checked)), B(e, r);
					}, o = (e) => {
						var r = df(), i = M(r), a = F(i);
						G(a), E(r), I((e, o, s) => {
							q(r, "title", e), V(i, `${o ?? ""} `), K(a, L(t)[L(n).key] ?? ""), q(a, "placeholder", s);
						}, [
							() => J("tip.calendar.opt.hours"),
							() => J(L(n).labelKey),
							() => J("calendar.opt.columns.auto")
						]), R("change", a, (e) => f(L(n), e.target.value === "" ? null : Math.max(0, Math.min(24, Math.round(Number(e.target.value)) || 0)))), B(e, r);
					}, s = (e) => {
						var r = ff(), i = M(r), a = P(i, !0), o = F(i, 2);
						{
							let e = /* @__PURE__ */ k(() => L(n).values.map((e) => [e, p(L(n), e)]));
							Y(o, {
								get value() {
									return L(t)[L(n).key];
								},
								get options() {
									return L(e);
								},
								onchange: (e) => f(L(n), e)
							});
						}
						E(r), I((e) => V(a, e), [() => J(L(n).labelKey)]), B(e, r);
					}, c = (e) => {
						{
							let r = /* @__PURE__ */ k(() => J(L(n).labelKey)), i = /* @__PURE__ */ k(() => L(n).values.map((e) => [e, p(L(n), e)]));
							eu(e, {
								get label() {
									return L(r);
								},
								get value() {
									return L(t)[L(n).key];
								},
								get options() {
									return L(i);
								},
								onchange: (e) => f(L(n), e)
							});
						}
					};
					H(i, (e) => {
						L(n).kind === "switch" ? e(a) : L(n).kind === "hour" ? e(o, 1) : L(n).values.length > 4 ? e(s, 2) : e(c, -1);
					}), B(e, r);
				}), B(e, n);
			}, a = /* @__PURE__ */ k(() => Qo(L(r).props.design).length);
			H(n, (e) => {
				L(a) && e(i);
			}), B(e, t);
		}, i = (e) => {
			var t = Hr();
			ri(N(t), 19, () => m(L(s)), (e) => e.section, (e, t, n) => {
				var i = hf(), a = N(i), o = (e) => {
					var n = pf(), r = P(n, !0);
					I((e) => V(r, e), [() => J(`calendar.section.${L(t).section}`)]), B(e, n);
				};
				H(a, (e) => {
					L(n) > 0 && e(o);
				});
				var s = F(a, 2);
				ri(s, 21, () => L(t).slots, (e) => e.key, (e, t) => {
					var n = mf(), i = M(n);
					{
						let e = /* @__PURE__ */ k(() => L(r).props.colors?.[L(t).key] ?? ""), n = /* @__PURE__ */ k(u), a = /* @__PURE__ */ k(() => J(L(t).labelKey));
						Pa(i, {
							get value() {
								return L(e);
							},
							get tokens() {
								return L(n);
							},
							allowClear: !0,
							get label() {
								return L(a);
							},
							onchange: (e) => v(L(t).key, e || "")
						});
					}
					var a = P(F(i, 2), !0);
					E(n), I((e, t) => {
						q(n, "title", e), V(a, t);
					}, [() => J("tip.calendar.slot"), () => J(L(t).labelKey)]), B(e, n);
				}), E(s), B(e, i);
			}), B(e, t);
		}, a = (e) => {
			var t = cf(), n = N(t), i = M(n);
			G(i);
			var a = F(i);
			E(n);
			var o = F(n, 2), c = (e) => {
				var t = ff(), n = M(t), i = P(n, !0), a = F(n, 2);
				{
					let e = /* @__PURE__ */ k(() => L(r).props.stripe?.color ?? ""), t = /* @__PURE__ */ k(u), n = /* @__PURE__ */ k(() => J("calendar.stripeColor"));
					Pa(a, {
						get value() {
							return L(e);
						},
						get tokens() {
							return L(t);
						},
						allowClear: !0,
						get label() {
							return L(n);
						},
						onchange: (e) => y({ color: e || void 0 })
					});
				}
				E(t), I((e, n) => {
					q(t, "title", e), V(i, n);
				}, [() => J("tip.calendar.stripeColor"), () => J("calendar.stripeColor")]), B(e, t);
			}, l = /* @__PURE__ */ k(() => cs(L(s), L(r).props.stripe).show);
			H(o, (e) => {
				L(l) && e(c);
			}), I((e, t, r) => {
				q(n, "title", e), Ni(i, t), V(a, ` ${r ?? ""}`);
			}, [
				() => J("tip.calendar.stripe"),
				() => cs(L(s), L(r).props.stripe).show,
				() => J("calendar.stripe")
			]), R("change", i, (e) => y({ show: e.target.checked })), B(e, t);
		}, o = (e) => {
			var t = gf(), n = N(t);
			{
				let e = /* @__PURE__ */ k(() => Po.map((e) => [e, J(`calendar.field.${e}`)]));
				Y(n, {
					get value() {
						return L(Wd);
					},
					get options() {
						return L(e);
					},
					onchange: (e) => j(Wd, e, !0)
				});
			}
			var r = F(n, 2), i = M(r), a = F(i);
			{
				let e = /* @__PURE__ */ k(() => h().font ?? ""), t = /* @__PURE__ */ k(() => [["", J("common.inherit")], ...Hd.map(([e, t]) => [t, J(e)])]);
				Y(a, {
					get value() {
						return L(e);
					},
					get options() {
						return L(t);
					},
					onchange: (e) => b({ font: e || void 0 })
				});
			}
			E(r);
			var o = F(r, 2), s = M(o), c = F(s);
			G(c), E(o);
			var l = F(o, 2);
			{
				let e = /* @__PURE__ */ k(() => J("calendar.fieldWeight")), t = /* @__PURE__ */ k(() => h().bold === !0 ? "bold" : h().bold === !1 ? "normal" : ""), n = /* @__PURE__ */ k(() => [
					["", J("common.inherit")],
					["bold", J("format.bold")],
					["normal", J("calendar.fieldNormal")]
				]);
				eu(l, {
					get label() {
						return L(e);
					},
					get value() {
						return L(t);
					},
					get options() {
						return L(n);
					},
					onchange: (e) => b({ bold: e === "bold" || e !== "normal" && void 0 })
				});
			}
			var d = F(l, 2), f = M(d);
			let p;
			var m = P(M(f), !0);
			E(f);
			var g = F(f, 2);
			let _;
			var v = P(M(g), !0);
			E(g);
			var y = F(g, 2);
			{
				let e = /* @__PURE__ */ k(() => h().color ?? ""), t = /* @__PURE__ */ k(u), n = /* @__PURE__ */ k(() => J("calendar.fieldColor"));
				Pa(y, {
					get value() {
						return L(e);
					},
					get tokens() {
						return L(t);
					},
					allowClear: !0,
					get label() {
						return L(n);
					},
					onchange: (e) => b({ color: e || void 0 })
				});
			}
			E(d), I((e, t, n, r, a, l, u, d, h, y, b) => {
				V(i, `${e ?? ""} `), q(o, "title", t), V(s, `${n ?? ""} `), q(c, "min", ls.min), q(c, "max", ls.max), K(c, r), q(c, "placeholder", a), p = W(f, 1, "tbtn", null, p, { active: l }), q(f, "title", u), V(m, d), _ = W(g, 1, "tbtn", null, _, { active: h }), q(g, "title", y), V(v, b);
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
			]), R("change", c, (e) => b({ size: e.target.value === "" ? void 0 : Math.max(ls.min, Math.min(ls.max, Number(e.target.value) || ls.min)) })), R("click", f, () => b({ italic: !h().italic || void 0 })), R("click", g, () => b({ underline: !h().underline || void 0 })), B(e, t);
		}, s = /* @__PURE__ */ k(() => ts(L(r).props.design)), c = /* @__PURE__ */ k(re);
		var l = _f(), d = N(l), g = M(d), _ = M(g), x = P(_, !0), S = P(F(_), !0);
		E(g), Mo(F(g, 2), { id: "design" }), E(d);
		var C = F(d, 2);
		{
			let e = /* @__PURE__ */ k(() => J("calendar.section.options"));
			Wc(C, {
				id: "cal-opts",
				get title() {
					return L(e);
				},
				get value() {
					return L(c).opts;
				},
				get reset() {
					return L(c).optsReset;
				},
				children: (e, n) => {
					t(e);
				},
				$$slots: { default: !0 }
			});
		}
		var w = F(C, 2);
		{
			let e = /* @__PURE__ */ k(() => J("calendar.colors"));
			Wc(w, {
				id: "cal-colors",
				get title() {
					return L(e);
				},
				get value() {
					return L(c).colors;
				},
				get reset() {
					return L(c).colorsReset;
				},
				children: (e, t) => {
					i(e);
				},
				$$slots: { default: !0 }
			});
		}
		var T = F(w, 2);
		{
			let e = /* @__PURE__ */ k(() => J("calendar.stripe"));
			Wc(T, {
				id: "cal-stripe",
				get title() {
					return L(e);
				},
				get value() {
					return L(c).stripe;
				},
				get reset() {
					return L(c).stripeReset;
				},
				children: (e, t) => {
					a(e);
				},
				$$slots: { default: !0 }
			});
		}
		var ee = F(T, 2);
		{
			let e = /* @__PURE__ */ k(() => J("calendar.fieldStyle"));
			Wc(ee, {
				id: "cal-fields",
				get title() {
					return L(e);
				},
				get value() {
					return L(c).fields;
				},
				get reset() {
					return L(c).fieldsReset;
				},
				children: (e, t) => {
					o(e);
				},
				$$slots: { default: !0 }
			});
		}
		I((e, t, n) => {
			q(g, "title", e), V(x, t), V(S, n);
		}, [
			() => J("tip.calendar.design"),
			() => J("calendar.design"),
			() => J(L(s).labelKey)
		]), R("click", g, function(...e) {
			n.openDesignPicker?.apply(this, e);
		}), B(e, l);
	};
	H(ae, (e) => {
		t.area === "content" ? e(oe) : t.area === "style" && e(se, 1);
	}), B(e, ie), tt();
}
Nr([
	"click",
	"change",
	"input"
]);
//#endregion
//#region src/menu/families/Form.svelte
var yf = /* @__PURE__ */ z("<label> <input/></label>"), bf = /* @__PURE__ */ z("<label> <input/></label> <label> <input/></label>", 1), xf = /* @__PURE__ */ z("<input/>"), Sf = /* @__PURE__ */ z("<span class=\"nav-line\"><input/> <!> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!>", 1), Cf = /* @__PURE__ */ z("<label> <!></label> <!> <p class=\"panel-strong\"> </p> <!> <button class=\"ghost action\"> </button> <label> <input/></label> <label> <input/></label>", 1);
function wf(e, t) {
	et(t, !0);
	let n = Qe("urd-editor"), r = /* @__PURE__ */ k(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a } = n, o = [
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
		i(`edit:${L(r).blockId}:field${e}`, (n) => {
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
	var m = Hr(), h = N(m), g = (e) => {
		var t = Cf(), n = N(t), i = M(n), c = F(i);
		{
			let e = /* @__PURE__ */ k(() => L(r).props.mode ?? "mailto"), t = /* @__PURE__ */ k(() => [["mailto", J("form.modeMailto")], ["endpoint", J("form.modeEndpoint")]]);
			Y(c, {
				get value() {
					return L(e);
				},
				get options() {
					return L(t);
				},
				onchange: (e) => a("mode", e)
			});
		}
		E(n);
		var m = F(n, 2), h = (e) => {
			var t = yf(), n = M(t), i = F(n);
			G(i), E(t), I((e, a, o) => {
				q(t, "title", e), V(n, `${a ?? ""} `), K(i, L(r).props.endpoint ?? ""), q(i, "placeholder", o);
			}, [
				() => J("form.endpointNote"),
				() => J("form.endpoint"),
				() => J("form.endpointPh")
			]), R("change", i, (e) => a("endpoint", e.target.value.trim())), B(e, t);
		}, g = (e) => {
			var t = bf(), n = N(t), i = M(n), o = F(i);
			G(o), E(n);
			var s = F(n, 2), c = M(s), l = F(c);
			G(l), E(s), I((e, t, n, a) => {
				V(i, `${e ?? ""} `), K(o, L(r).props.recipient ?? ""), q(o, "placeholder", t), V(c, `${n ?? ""} `), K(l, L(r).props.subject ?? ""), q(l, "placeholder", a);
			}, [
				() => J("form.recipient"),
				() => J("form.recipientPh"),
				() => J("form.subject"),
				() => J("form.subjectPh")
			]), R("change", o, (e) => a("recipient", e.target.value.trim())), R("change", l, (e) => a("subject", e.target.value.trim())), B(e, t);
		};
		H(m, (e) => {
			(L(r).props.mode ?? "mailto") === "endpoint" ? e(h) : e(g, -1);
		});
		var _ = F(m, 2), v = P(_, !0), y = F(_, 2);
		ri(y, 19, () => L(r).props.fields ?? [], (e, t) => e.id ?? t, (e, t, n) => {
			var i = Sf(), a = N(i), c = M(a);
			G(c);
			var d = F(c, 2);
			{
				let e = /* @__PURE__ */ k(() => L(t).type ?? "text"), r = /* @__PURE__ */ k(() => o.map((e) => [e, J(`form.type${e[0].toUpperCase()}${e.slice(1)}`)]));
				Y(d, {
					get value() {
						return L(e);
					},
					get options() {
						return L(r);
					},
					onchange: (e) => l(L(n), { type: e })
				});
			}
			var m = F(d, 2), h = M(m);
			U(h, () => X.up, !0), E(h);
			var g = F(h, 2);
			U(g, () => X.down, !0), E(g);
			var _ = F(g, 2);
			U(_, () => X.cross, !0), E(_), E(m), E(a);
			var v = F(a, 2), y = M(v);
			G(y);
			var b = F(y);
			E(v);
			var x = F(v, 2), S = (e) => {
				var r = xf();
				G(r), I((e, t) => {
					K(r, e), q(r, "placeholder", t);
				}, [() => (L(t).options ?? []).join(", "), () => J("form.optionsPh")]), R("change", r, (e) => u(L(n), e.target.value)), B(e, r);
			}, C = /* @__PURE__ */ k(() => s.has(L(t).type));
			H(x, (e) => {
				L(C) && e(S);
			}), I((e, i, a) => {
				K(c, L(t).label), q(c, "placeholder", e), h.disabled = L(n) === 0, g.disabled = L(n) === (L(r).props.fields?.length ?? 0) - 1, q(_, "title", i), Ni(y, L(t).required === !0), V(b, ` ${a ?? ""}`);
			}, [
				() => J("form.fieldNamePh"),
				() => J("form.removeField"),
				() => J("form.required")
			]), R("change", c, (e) => l(L(n), { label: e.target.value.trim() || J("form.fieldFallback") })), R("click", h, () => p(L(n), -1)), R("click", g, () => p(L(n), 1)), R("click", _, () => f(L(n))), R("change", y, (e) => l(L(n), { required: e.target.checked })), B(e, i);
		});
		var b = F(y, 2), x = P(b, !0), S = F(b, 2), C = M(S), w = F(C);
		G(w), E(S);
		var T = F(S, 2), ee = M(T), te = F(ee);
		G(te), E(T), I((e, t, a, o, s, c, l, u) => {
			q(n, "title", e), V(i, `${t ?? ""} `), V(v, a), V(x, o), V(C, `${s ?? ""} `), K(w, L(r).props.submitLabel ?? ""), q(w, "placeholder", c), V(ee, `${l ?? ""} `), K(te, L(r).props.successText ?? ""), q(te, "placeholder", u);
		}, [
			() => J("form.modeTitle"),
			() => J("form.mode"),
			() => J("form.fields"),
			() => J("form.addField"),
			() => J("lbl.buttonText"),
			() => J("form.sendDefault"),
			() => J("form.receipt"),
			() => J("form.thanksDefault")
		]), R("click", b, d), R("change", w, (e) => a("submitLabel", e.target.value.trim() || J("form.sendDefault"))), R("change", te, (e) => a("successText", e.target.value.trim() || J("form.thanksDefault"))), B(e, t);
	};
	H(h, (e) => {
		t.area === "content" && e(g);
	}), B(e, m), tt();
}
Nr(["change", "click"]);
//#endregion
//#region src/menu/families/Faq.svelte
var Tf = /* @__PURE__ */ z("<span class=\"nav-line\"><input/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span>"), Ef = /* @__PURE__ */ z("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <p class=\"panel-strong\"> </p> <!> <button class=\"ghost action\"> </button>", 1), Df = /* @__PURE__ */ z("<p class=\"panel-strong\"> </p> <!>", 1), Of = /* @__PURE__ */ z("<!> <!> <hr class=\"gridmenu-divider\"/>", 1);
function kf(e, t) {
	et(t, !0);
	let n = Qe("urd-editor"), r = /* @__PURE__ */ k(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a } = n, o = ["cards", "list"];
	function s(e, t) {
		i(`edit:${L(r).blockId}:faq${e}`, (n) => {
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
	var d = Hr(), f = N(d), p = (e) => {
		var t = Ef(), n = N(t), i = M(n);
		G(i);
		var o = F(i);
		E(n);
		var d = F(n, 2), f = P(d, !0), p = F(d, 2);
		ri(p, 17, () => L(r).props.items ?? [], $r, (e, t, n) => {
			var i = Tf(), a = M(i);
			G(a);
			var o = F(a, 2), c = M(o);
			c.disabled = n === 0, U(c, () => X.up, !0), E(c);
			var d = F(c, 2);
			U(d, () => X.down, !0), E(d);
			var f = F(d, 2);
			U(f, () => X.cross, !0), E(f), E(o), E(i), I((e, i) => {
				K(a, L(t).q), q(a, "title", e), d.disabled = n === (L(r).props.items?.length ?? 0) - 1, q(f, "title", i);
			}, [() => J("tip.faq.question"), () => J("tip.faq.remove")]), R("change", a, (e) => s(n, { q: e.target.value })), R("click", c, () => u(n, -1)), R("click", d, () => u(n, 1)), R("click", f, () => l(n)), B(e, i);
		});
		var m = F(p, 2), h = P(m, !0);
		I((e, t, r, a, s) => {
			q(n, "title", e), Ni(i, t), V(o, ` ${r ?? ""}`), V(f, a), V(h, s);
		}, [
			() => J("tip.faq.multi"),
			() => !!L(r).props.multi,
			() => J("lbl.faqMulti"),
			() => J("lbl.questions"),
			() => J("ui.addQuestion")
		]), R("change", i, (e) => a("multi", e.target.checked)), R("click", m, c), B(e, t);
	}, m = (e) => {
		var t = Of(), n = N(t);
		{
			let e = /* @__PURE__ */ k(() => J("lbl.variant")), t = /* @__PURE__ */ k(() => L(r).props.variant === "list" ? "list" : "cards"), i = /* @__PURE__ */ k(() => o.map((e) => [e, J(`opt.faqVariant.${e}`)]));
			eu(n, {
				get label() {
					return L(e);
				},
				get value() {
					return L(t);
				},
				get options() {
					return L(i);
				},
				onchange: (e) => a("variant", e)
			});
		}
		var i = F(n, 2), s = (e) => {
			var t = Df(), n = N(t), r = P(n, !0);
			ll(F(n, 2), {}), I((e) => V(r, e), [() => J("lbl.cardStyle")]), B(e, t);
		};
		H(i, (e) => {
			L(r).props.variant !== "list" && e(s);
		}), ke(2), B(e, t);
	};
	H(f, (e) => {
		t.area === "content" ? e(p) : t.area === "style" && e(m, 1);
	}), B(e, d), tt();
}
Nr(["change", "click"]);
//#endregion
//#region src/menu/families/Timeline.svelte
var Af = /* @__PURE__ */ z("<span class=\"nav-line\"><input class=\"tl-year\"/> <input/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span> <input/>", 1), jf = /* @__PURE__ */ z("<p class=\"panel-strong\"> </p> <!> <button class=\"ghost action\"> </button>", 1), Mf = /* @__PURE__ */ z("<label> <!></label> <label> <!></label> <label> <!></label> <hr class=\"gridmenu-divider\"/>", 1);
function Nf(e, t) {
	et(t, !0);
	let n = Qe("urd-editor"), r = /* @__PURE__ */ k(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, themeSwatches: o } = n;
	function s(e, t) {
		i(`edit:${L(r).blockId}:tl${e}`, (n) => {
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
	var d = Hr(), f = N(d), p = (e) => {
		var t = jf(), n = N(t), i = P(n, !0), a = F(n, 2);
		ri(a, 17, () => L(r).props.items ?? [], $r, (e, t, n) => {
			var i = Af(), a = N(i), o = M(a);
			G(o);
			var c = F(o, 2);
			G(c);
			var d = F(c, 2), f = M(d);
			f.disabled = n === 0, U(f, () => X.up, !0), E(f);
			var p = F(f, 2);
			U(p, () => X.down, !0), E(p);
			var m = F(p, 2);
			U(m, () => X.cross, !0), E(m), E(d), E(a);
			var h = F(a, 2);
			G(h), I((e, i, a, s, l, u) => {
				K(o, L(t).year), q(o, "placeholder", e), q(o, "title", i), K(c, L(t).title), q(c, "title", a), p.disabled = n === (L(r).props.items?.length ?? 0) - 1, q(m, "title", s), K(h, L(t).text), q(h, "placeholder", l), q(h, "title", u);
			}, [
				() => J("ph.tlYear"),
				() => J("tip.timeline.year"),
				() => J("tip.timeline.title"),
				() => J("tip.timeline.remove"),
				() => J("ph.tlText"),
				() => J("tip.timeline.text")
			]), R("change", o, (e) => s(n, { year: e.target.value })), R("change", c, (e) => s(n, { title: e.target.value })), R("click", f, () => u(n, -1)), R("click", p, () => u(n, 1)), R("click", m, () => l(n)), R("change", h, (e) => s(n, { text: e.target.value })), B(e, i);
		});
		var o = F(a, 2), d = P(o, !0);
		I((e, t) => {
			V(i, e), V(d, t);
		}, [() => J("lbl.timelineItems"), () => J("ui.addTlItem")]), R("click", o, c), B(e, t);
	}, m = (e) => {
		var t = Mf(), n = N(t), i = M(n), s = F(i);
		{
			let e = /* @__PURE__ */ k(() => L(r).props.variant ?? "left"), t = /* @__PURE__ */ k(() => [["left", J("opt.timeline.left")], ["alternating", J("opt.timeline.alternating")]]);
			Y(s, {
				get value() {
					return L(e);
				},
				get options() {
					return L(t);
				},
				onchange: (e) => a("variant", e)
			});
		}
		E(n);
		var c = F(n, 2), l = M(c), u = F(l);
		{
			let e = /* @__PURE__ */ k(() => L(r).props.marker ?? "filled"), t = /* @__PURE__ */ k(() => [["filled", J("opt.timeline.filled")], ["ring", J("opt.timeline.ring")]]);
			Y(u, {
				get value() {
					return L(e);
				},
				get options() {
					return L(t);
				},
				onchange: (e) => a("marker", e)
			});
		}
		E(c);
		var d = F(c, 2), f = M(d), p = F(f);
		{
			let e = /* @__PURE__ */ k(() => L(r).props.accent ?? "accent"), t = /* @__PURE__ */ k(o);
			Pa(p, {
				get value() {
					return L(e);
				},
				get tokens() {
					return L(t);
				},
				onchange: (e) => a("accent", e === "accent" ? null : e)
			});
		}
		E(d), ke(2), I((e, t, n) => {
			V(i, `${e ?? ""} `), V(l, `${t ?? ""} `), V(f, `${n ?? ""} `);
		}, [
			() => J("lbl.variant"),
			() => J("lbl.timelineMarker"),
			() => J("lbl.color")
		]), B(e, t);
	};
	H(f, (e) => {
		t.area === "content" ? e(p) : t.area === "style" && e(m, 1);
	}), B(e, d), tt();
}
Nr(["change", "click"]);
//#endregion
//#region src/menu/families/Quote.svelte
var Pf = /* @__PURE__ */ z("<label> <input/></label> <label> <input/></label> <label> <input/></label>", 1), Ff = /* @__PURE__ */ z("<button class=\"ghost\"> </button>"), If = /* @__PURE__ */ z("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <!>", 1), Lf = /* @__PURE__ */ z("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), Rf = /* @__PURE__ */ z("<label> <!></label> <!> <label> <!></label> <hr class=\"gridmenu-divider\"/>", 1);
function zf(e, t) {
	et(t, !0);
	let n = Qe("urd-editor"), r = /* @__PURE__ */ k(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, compressOrTrim: o, imageErrorText: s, setStatus: c, themeSwatches: l } = n;
	async function u(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await o(t);
			i(`edit:${L(r).blockId}`, (t) => {
				t.props.image = e.dataUrl;
			});
		} catch (e) {
			c(s(e), "error");
		}
	}
	var d = Hr(), f = N(d), p = (e) => {
		var t = Pf(), n = N(t), i = M(n), o = F(i);
		G(o), E(n);
		var s = F(n, 2), c = M(s), l = F(c);
		G(l), E(s);
		var u = F(s, 2), d = M(u), f = F(d);
		G(f), E(u), I((e, t, n) => {
			V(i, `${e ?? ""} `), K(o, L(r).props.text ?? ""), V(c, `${t ?? ""} `), K(l, L(r).props.attribution ?? ""), V(d, `${n ?? ""} `), K(f, L(r).props.role ?? "");
		}, [
			() => J("lbl.quoteText"),
			() => J("lbl.quoteName"),
			() => J("lbl.quoteRole")
		]), R("change", o, (e) => a("text", e.target.value)), R("change", l, (e) => a("attribution", e.target.value)), R("change", f, (e) => a("role", e.target.value)), B(e, t);
	}, m = (e) => {
		var t = Rf(), n = N(t), i = M(n), o = F(i);
		{
			let e = /* @__PURE__ */ k(() => L(r).props.variant ?? "large"), t = /* @__PURE__ */ k(() => [["large", J("opt.quote.large")], ["short", J("opt.quote.short")]]);
			Y(o, {
				get value() {
					return L(e);
				},
				get options() {
					return L(t);
				},
				onchange: (e) => a("variant", e)
			});
		}
		E(n);
		var s = F(n, 2), c = (e) => {
			var t = If(), n = N(t), i = M(n), o = F(i);
			E(n);
			var s = F(n, 2), c = (e) => {
				var t = Ff(), n = P(t, !0);
				I((e) => V(n, e), [() => J("ui.quotePortraitRemove")]), R("click", t, () => a("image", "")), B(e, t);
			};
			H(s, (e) => {
				L(r).props.image && e(c);
			}), I((e) => V(i, `${e ?? ""} `), [() => J("ui.quotePortrait")]), R("change", o, u), B(e, t);
		}, d = (e) => {
			var t = Lf(), n = M(t);
			G(n);
			var i = F(n);
			E(t), I((e, a) => {
				q(t, "title", e), Ni(n, L(r).props.card === !0), V(i, ` ${a ?? ""}`);
			}, [() => J("tip.quote.card"), () => J("lbl.quoteCard")]), R("change", n, (e) => a("card", e.target.checked)), B(e, t);
		};
		H(s, (e) => {
			L(r).props.variant === "short" ? e(c) : e(d, -1);
		});
		var f = F(s, 2), p = M(f), m = F(p);
		{
			let e = /* @__PURE__ */ k(() => L(r).props.accent ?? "accent"), t = /* @__PURE__ */ k(l);
			Pa(m, {
				get value() {
					return L(e);
				},
				get tokens() {
					return L(t);
				},
				onchange: (e) => a("accent", e === "accent" ? null : e)
			});
		}
		E(f), ke(2), I((e, t) => {
			V(i, `${e ?? ""} `), V(p, `${t ?? ""} `);
		}, [() => J("lbl.variant"), () => J("lbl.color")]), B(e, t);
	};
	H(f, (e) => {
		t.area === "content" ? e(p) : t.area === "style" && e(m, 1);
	}), B(e, d), tt();
}
Nr(["change", "click"]);
//#endregion
//#region src/menu/families/Stats.svelte
var Bf = /* @__PURE__ */ z("<label> <input/></label> <label> <input/></label> <label> <input/></label> <label> <input/></label>", 1), Vf = /* @__PURE__ */ z("<!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <hr class=\"gridmenu-divider\"/>", 1);
function Hf(e, t) {
	et(t, !0);
	let n = Qe("urd-editor"), r = /* @__PURE__ */ k(() => n.selectedBlock), { setBlockProp: i } = n, a = [
		"plain",
		"cards",
		"band"
	];
	var o = Hr(), s = N(o), c = (e) => {
		var t = Bf(), n = N(t), a = M(n), o = F(a);
		G(o), E(n);
		var s = F(n, 2), c = M(s), l = F(c);
		G(l), E(s);
		var u = F(s, 2), d = M(u), f = F(d);
		G(f), E(u);
		var p = F(u, 2), m = M(p), h = F(m);
		G(h), E(p), I((e, t, n, i, s) => {
			V(a, `${e ?? ""} `), K(o, L(r).props.value ?? ""), q(o, "title", t), V(c, `${n ?? ""} `), K(l, L(r).props.prefix ?? ""), V(d, `${i ?? ""} `), K(f, L(r).props.suffix ?? ""), V(m, `${s ?? ""} `), K(h, L(r).props.label ?? "");
		}, [
			() => J("lbl.statValue"),
			() => J("tip.stat.value"),
			() => J("lbl.statPrefix"),
			() => J("lbl.statSuffix"),
			() => J("lbl.statLabel")
		]), R("change", o, (e) => i("value", e.target.value)), R("change", l, (e) => i("prefix", e.target.value)), R("change", f, (e) => i("suffix", e.target.value)), R("change", h, (e) => i("label", e.target.value)), B(e, t);
	}, l = (e) => {
		var t = Vf(), n = N(t);
		{
			let e = /* @__PURE__ */ k(() => J("lbl.variant")), t = /* @__PURE__ */ k(() => a.includes(L(r).props.variant) ? L(r).props.variant : "plain"), o = /* @__PURE__ */ k(() => a.map((e) => [e, J(`opt.statVariant.${e}`)]));
			eu(n, {
				get label() {
					return L(e);
				},
				get value() {
					return L(t);
				},
				get options() {
					return L(o);
				},
				onchange: (e) => i("variant", e)
			});
		}
		var o = F(n, 2), s = M(o);
		G(s);
		var c = F(s);
		E(o), ke(2), I((e, t) => {
			q(o, "title", e), Ni(s, L(r).props.countUp !== !1), V(c, ` ${t ?? ""}`);
		}, [() => J("tip.stat.countUp"), () => J("lbl.statCountUp")]), R("change", s, (e) => i("countUp", e.target.checked)), B(e, t);
	};
	H(s, (e) => {
		t.area === "content" ? e(c) : t.area === "style" && e(l, 1);
	}), B(e, o), tt();
}
Nr(["change"]);
//#endregion
//#region src/menu/families/Table.svelte
var Uf = /* @__PURE__ */ z("<span class=\"toolbar-row\"><button class=\"ghost\"> </button> <button class=\"ghost\"> </button></span> <span class=\"toolbar-row\"><button class=\"ghost\"> </button> <button class=\"ghost\"> </button></span> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), Wf = /* @__PURE__ */ z("<label> <!></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <hr class=\"gridmenu-divider\"/>", 1);
function Gf(e, t) {
	et(t, !0);
	let n = Qe("urd-editor"), r = /* @__PURE__ */ k(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a } = n;
	function o(e, t) {
		i(`edit:${L(r).blockId}:table-form`, (n) => {
			let r = (Array.isArray(n.props.rows) && n.props.rows.length ? n.props.rows : [[""]]).map((e) => Array.isArray(e) ? e.map((e) => String(e ?? "")) : [""]), i = Math.max(1, ...r.map((e) => e.length));
			r = r.map((e) => [...e, ...Array(i - e.length).fill("")]), e > 0 ? r.push(Array(i).fill("")) : e < 0 && r.length > 1 && r.pop(), t > 0 ? r = r.map((e) => [...e, ""]) : t < 0 && i > 1 && (r = r.map((e) => e.slice(0, i - 1))), n.props.rows = r;
		});
	}
	var s = Hr(), c = N(s), l = (e) => {
		var t = Uf(), n = N(t), i = M(n), s = P(i, !0), c = F(i, 2), l = P(c, !0);
		E(n);
		var u = F(n, 2), d = M(u), f = P(d, !0), p = F(d, 2), m = P(p, !0);
		E(u);
		var h = F(u, 2), g = M(h);
		G(g);
		var _ = F(g);
		E(h), I((e, t, n, i, a, o) => {
			V(s, e), V(l, t), V(f, n), V(m, i), q(h, "title", a), Ni(g, L(r).props.header !== !1), V(_, ` ${o ?? ""}`);
		}, [
			() => J("ui.addRow"),
			() => J("ui.removeRow"),
			() => J("ui.addColumn"),
			() => J("ui.removeColumn"),
			() => J("tip.table.header"),
			() => J("lbl.tableHeader")
		]), R("click", i, () => o(1, 0)), R("click", c, () => o(-1, 0)), R("click", d, () => o(0, 1)), R("click", p, () => o(0, -1)), R("change", g, (e) => a("header", e.target.checked)), B(e, t);
	}, u = (e) => {
		var t = Wf(), n = N(t), i = M(n), o = F(i);
		{
			let e = /* @__PURE__ */ k(() => L(r).props.lines ?? "rows"), t = /* @__PURE__ */ k(() => [
				["rows", J("opt.table.rows")],
				["grid", J("opt.table.grid")],
				["none", J("common.none")]
			]);
			Y(o, {
				get value() {
					return L(e);
				},
				get options() {
					return L(t);
				},
				onchange: (e) => a("lines", e)
			});
		}
		E(n);
		var s = F(n, 2), c = M(s);
		G(c);
		var l = F(c);
		E(s), ke(2), I((e, t, n) => {
			V(i, `${e ?? ""} `), Ni(c, t), V(l, ` ${n ?? ""}`);
		}, [
			() => J("lbl.tableLines"),
			() => !!L(r).props.striped,
			() => J("lbl.tableStriped")
		]), R("change", c, (e) => a("striped", e.target.checked)), B(e, t);
	};
	H(c, (e) => {
		t.area === "content" ? e(l) : t.area === "style" && e(u, 1);
	}), B(e, s), tt();
}
Nr(["click", "change"]);
//#endregion
//#region src/menu/families/Share.svelte
var Kf = /* @__PURE__ */ z("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), qf = /* @__PURE__ */ z("<label> <!></label> <label> <input type=\"number\" min=\"24\" max=\"64\"/></label> <label> <!></label> <hr class=\"gridmenu-divider\"/>", 1);
function Jf(e, t) {
	et(t, !0);
	let n = Qe("urd-editor"), r = /* @__PURE__ */ k(() => n.selectedBlock), { mutateBlock: i, setBlockProp: a, themeSwatches: o } = n;
	function s(e, t) {
		i(`edit:${L(r).blockId}:share`, (n) => {
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
	var c = Hr(), l = N(c), u = (e) => {
		var t = Hr();
		ri(N(t), 17, () => [
			["facebook", "Facebook"],
			["x", "X"],
			["linkedin", "LinkedIn"],
			["whatsapp", "WhatsApp"],
			["email", J("opt.share.email")],
			["copy", J("opt.share.copy")]
		], ([e, t]) => e, (e, t) => {
			var n = /* @__PURE__ */ k(() => h(L(t), 2));
			let i = () => L(n)[0], a = () => L(n)[1];
			var o = Kf(), c = M(o);
			G(c);
			var l = F(c);
			E(o), I((e) => {
				Ni(c, e), V(l, ` ${a() ?? ""}`);
			}, [() => (L(r).props.services ?? []).includes(i())]), R("change", c, (e) => s(i(), e.target.checked)), B(e, o);
		}), B(e, t);
	}, d = (e) => {
		var t = qf(), n = N(t), i = M(n), s = F(i);
		{
			let e = /* @__PURE__ */ k(() => L(r).props.variant ?? "icons"), t = /* @__PURE__ */ k(() => [["icons", J("opt.share.icons")], ["labels", J("opt.share.labels")]]);
			Y(s, {
				get value() {
					return L(e);
				},
				get options() {
					return L(t);
				},
				onchange: (e) => a("variant", e)
			});
		}
		E(n);
		var c = F(n, 2), l = M(c), u = F(l);
		G(u), E(c);
		var d = F(c, 2), f = M(d), p = F(f);
		{
			let e = /* @__PURE__ */ k(() => L(r).props.color || "accent"), t = /* @__PURE__ */ k(o);
			Pa(p, {
				get value() {
					return L(e);
				},
				get tokens() {
					return L(t);
				},
				onchange: (e) => a("color", e === "accent" ? "" : e)
			});
		}
		E(d), ke(2), I((e, t, n) => {
			V(i, `${e ?? ""} `), V(l, `${t ?? ""} `), K(u, L(r).props.size ?? 38), V(f, `${n ?? ""} `);
		}, [
			() => J("lbl.variant"),
			() => J("lbl.size"),
			() => J("lbl.color")
		]), R("change", u, (e) => a("size", Number(e.target.value) || 38)), B(e, t);
	};
	H(l, (e) => {
		t.area === "content" ? e(u) : t.area === "style" && e(d, 1);
	}), B(e, c), tt();
}
Nr(["change"]);
//#endregion
//#region src/menu/families/Countdown.svelte
var Yf = /* @__PURE__ */ z("<label> <input type=\"datetime-local\"/></label> <label> <input/></label>", 1), Xf = /* @__PURE__ */ z("<label> <!></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <hr class=\"gridmenu-divider\"/>", 1);
function Zf(e, t) {
	et(t, !0);
	let n = Qe("urd-editor"), r = /* @__PURE__ */ k(() => n.selectedBlock), { setBlockProp: i } = n;
	var a = Hr(), o = N(a), s = (e) => {
		var t = Yf(), n = N(t), a = M(n), o = F(a);
		G(o), E(n);
		var s = F(n, 2), c = M(s), l = F(c);
		G(l), E(s), I((e, t, n) => {
			V(a, `${e ?? ""} `), K(o, L(r).props.target ?? ""), q(s, "title", t), V(c, `${n ?? ""} `), K(l, L(r).props.doneText ?? "");
		}, [
			() => J("lbl.countdownTarget"),
			() => J("tip.countdown.done"),
			() => J("lbl.countdownDone")
		]), R("change", o, (e) => i("target", e.target.value)), R("change", l, (e) => i("doneText", e.target.value)), B(e, t);
	}, c = (e) => {
		var t = Xf(), n = N(t), a = M(n), o = F(a);
		{
			let e = /* @__PURE__ */ k(() => L(r).props.variant ?? "boxes"), t = /* @__PURE__ */ k(() => [["boxes", J("opt.countdown.boxes")], ["plain", J("opt.countdown.plain")]]);
			Y(o, {
				get value() {
					return L(e);
				},
				get options() {
					return L(t);
				},
				onchange: (e) => i("variant", e)
			});
		}
		E(n);
		var s = F(n, 2), c = M(s);
		G(c);
		var l = F(c);
		E(s), ke(2), I((e, t) => {
			V(a, `${e ?? ""} `), Ni(c, L(r).props.showSeconds !== !1), V(l, ` ${t ?? ""}`);
		}, [() => J("lbl.variant"), () => J("lbl.countdownSeconds")]), R("change", c, (e) => i("showSeconds", e.target.checked)), B(e, t);
	};
	H(o, (e) => {
		t.area === "content" ? e(s) : t.area === "style" && e(c, 1);
	}), B(e, a), tt();
}
Nr(["change"]);
//#endregion
//#region src/menu/families/Audio.svelte
var Qf = /* @__PURE__ */ z("<button class=\"ghost\"> </button>"), $f = /* @__PURE__ */ z("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"audio/*\"/></label> <!> <label> <input/></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1);
function ep(e, t) {
	et(t, !0);
	let n = Qe("urd-editor"), r = /* @__PURE__ */ k(() => n.selectedBlock), { setBlockProp: i, setStatus: a } = n;
	function o(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		let n = new FileReader();
		n.onload = () => {
			i("src", String(n.result ?? "")), t.size > 4e5 && a(J("status.audioLarge", { kb: Math.round(t.size / 1024) }), "error");
		}, n.onerror = () => a(J("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	var s = Hr(), c = N(s), l = (e) => {
		var t = $f(), n = N(t), a = M(n), s = F(a);
		E(n);
		var c = F(n, 2), l = (e) => {
			var t = Qf(), n = P(t, !0);
			I((e) => V(n, e), [() => J("ui.removeAudio")]), R("click", t, () => i("src", "")), B(e, t);
		};
		H(c, (e) => {
			L(r).props.src && e(l);
		});
		var u = F(c, 2), d = M(u), f = F(d);
		G(f), E(u);
		var p = F(u, 2), m = M(p);
		G(m);
		var h = F(m);
		E(p), I((e, t, i, o, s) => {
			q(n, "title", e), V(a, `${t ?? ""} `), V(d, `${i ?? ""} `), K(f, L(r).props.title ?? ""), Ni(m, o), V(h, ` ${s ?? ""}`);
		}, [
			() => J("tip.blocks.audioFile"),
			() => J("ui.chooseAudio"),
			() => J("lbl.audioTitle"),
			() => !!L(r).props.loop,
			() => J("lbl.audioLoop")
		]), R("change", s, o), R("change", f, (e) => i("title", e.target.value)), R("change", m, (e) => i("loop", e.target.checked)), B(e, t);
	};
	H(c, (e) => {
		t.area === "content" && e(l);
	}), B(e, s), tt();
}
Nr(["change", "click"]);
//#endregion
//#region src/menu/families/Collection.svelte
var tp = /* @__PURE__ */ z("<label> <!></label> <label> <input type=\"number\" min=\"0\" max=\"100\"/></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), np = /* @__PURE__ */ z("<label> <!></label> <hr class=\"gridmenu-divider\"/>", 1);
function rp(e, t) {
	et(t, !0);
	let n = Qe("urd-editor"), r = /* @__PURE__ */ k(() => n.selectedBlock), i = /* @__PURE__ */ k(() => n.collectionIds), a = /* @__PURE__ */ k(() => n.collectionsView), { setBlockProp: o } = n;
	var s = Hr(), c = N(s), l = (e) => {
		var t = tp(), n = N(t), s = M(n), c = F(s);
		{
			let e = /* @__PURE__ */ k(() => L(r).props.collection ?? ""), t = /* @__PURE__ */ k(() => [["", J("common.choose")], ...L(i).map((e) => [e, L(a)[e]?.name ?? e])]);
			Y(c, {
				get value() {
					return L(e);
				},
				get options() {
					return L(t);
				},
				onchange: (e) => o("collection", e || null)
			});
		}
		E(n);
		var l = F(n, 2), u = M(l), d = F(u);
		G(d), E(l);
		var f = F(l, 2), p = M(f);
		G(p);
		var m = F(p);
		E(f), I((e, t, i, a, o) => {
			q(n, "title", e), V(s, `${t ?? ""} `), q(l, "title", i), V(u, `${a ?? ""} `), K(d, L(r).props.limit ?? 6), Ni(p, L(r).props.newestFirst !== !1), V(m, ` ${o ?? ""}`);
		}, [
			() => J("tip.collection.source"),
			() => J("blocks.collection"),
			() => J("tip.collection.limit"),
			() => J("lbl.maxCount"),
			() => J("lbl.newestFirst")
		]), R("change", d, (e) => o("limit", Number(e.target.value))), R("change", p, (e) => o("newestFirst", e.target.checked)), B(e, t);
	}, u = (e) => {
		var t = np(), n = N(t), i = M(n), a = F(i);
		{
			let e = /* @__PURE__ */ k(() => L(r).props.view ?? "cards"), t = /* @__PURE__ */ k(() => [
				["cards", J("opt.collectionView.cards")],
				["list", J("opt.collectionView.list")],
				["archive", J("opt.collectionView.archive")]
			]);
			Y(a, {
				get value() {
					return L(e);
				},
				get options() {
					return L(t);
				},
				onchange: (e) => o("view", e)
			});
		}
		E(n), ke(2), I((e) => V(i, `${e ?? ""} `), [() => J("lbl.view")]), B(e, t);
	};
	H(c, (e) => {
		t.area === "content" ? e(l) : t.area === "style" && e(u, 1);
	}), B(e, s), tt();
}
Nr(["change"]);
//#endregion
//#region src/menu/families/Product.svelte
var ip = /* @__PURE__ */ z("<span class=\"toolbar-row\"><button class=\"ghost action\"> </button> <button class=\"ghost action\"> </button></span>"), ap = /* @__PURE__ */ z("<button class=\"ghost action\"> </button>"), op = /* @__PURE__ */ z("<label> <!></label> <!> <label> <input type=\"number\" min=\"0\" max=\"100\"/></label> <label> <input/></label>", 1), sp = /* @__PURE__ */ z("<label> <input type=\"number\" min=\"0\" max=\"6\"/></label> <hr class=\"gridmenu-divider\"/>", 1);
function cp(e, t) {
	et(t, !0);
	let n = Qe("urd-editor"), r = /* @__PURE__ */ k(() => n.selectedBlock), i = /* @__PURE__ */ k(() => n.collectionIds), a = /* @__PURE__ */ k(() => n.collectionsView), { setBlockProp: o, addCollectionEntry: s, createCatalogForBlock: c } = n;
	var l = Hr(), u = N(l), d = (e) => {
		var t = op(), l = N(t), u = M(l), d = F(u);
		{
			let e = /* @__PURE__ */ k(() => L(r).props.collection ?? ""), t = /* @__PURE__ */ k(() => [["", J("common.choose")], ...L(i).filter((e) => L(a)[e]?.kind === "products").map((e) => [e, L(a)[e]?.name ?? e])]);
			Y(d, {
				get value() {
					return L(e);
				},
				get options() {
					return L(t);
				},
				onchange: (e) => o("collection", e || null)
			});
		}
		E(l);
		var f = F(l, 2), p = (e) => {
			var t = ip(), i = M(t), a = P(i, !0), o = F(i, 2), c = P(o, !0);
			E(t), I((e, t, n, r) => {
				q(i, "title", e), V(a, t), q(o, "title", n), V(c, r);
			}, [
				() => J("tip.product.addProduct"),
				() => J("ui.addProduct"),
				() => J("tip.product.editCatalog"),
				() => J("ui.editCatalog")
			]), R("click", i, () => s(L(r).props.collection)), R("click", o, () => n.openCollection(L(r).props.collection)), B(e, t);
		}, m = (e) => {
			var t = ap(), n = P(t, !0);
			I((e, r) => {
				q(t, "title", e), V(n, r);
			}, [() => J("tip.product.createCatalog"), () => J("ui.createCatalog")]), R("click", t, c), B(e, t);
		}, h = /* @__PURE__ */ k(() => !L(i).some((e) => L(a)[e]?.kind === "products"));
		H(f, (e) => {
			L(r).props.collection && L(a)[L(r).props.collection]?.kind === "products" ? e(p) : L(h) && e(m, 1);
		});
		var g = F(f, 2), _ = M(g), v = F(_);
		G(v), E(g);
		var y = F(g, 2), b = M(y), x = F(b);
		G(x), E(y), I((e, t, n, i, a, o) => {
			q(l, "title", e), V(u, `${t ?? ""} `), q(g, "title", n), V(_, `${i ?? ""} `), K(v, L(r).props.limit ?? 0), q(y, "title", a), V(b, `${o ?? ""} `), K(x, L(r).props.currency ?? "kr");
		}, [
			() => J("tip.product.source"),
			() => J("blocks.collection"),
			() => J("tip.collection.limit"),
			() => J("lbl.maxCount"),
			() => J("tip.product.currency"),
			() => J("lbl.currency")
		]), R("change", v, (e) => o("limit", Number(e.target.value))), R("change", x, (e) => o("currency", e.target.value)), B(e, t);
	}, f = (e) => {
		var t = sp(), n = N(t), i = M(n), a = F(i);
		G(a), E(n), ke(2), I((e, t) => {
			q(n, "title", e), V(i, `${t ?? ""} `), K(a, L(r).props.columns ?? 0);
		}, [() => J("tip.product.columns"), () => J("lbl.columns")]), R("change", a, (e) => o("columns", Number(e.target.value))), B(e, t);
	};
	H(u, (e) => {
		t.area === "content" ? e(d) : t.area === "style" && e(f, 1);
	}), B(e, l), tt();
}
Nr(["click", "change"]);
//#endregion
//#region src/menu/families/Cart.svelte
var lp = /* @__PURE__ */ z("<label> <!></label> <label> <input/></label>", 1), up = /* @__PURE__ */ z("<label> <!></label> <hr class=\"gridmenu-divider\"/>", 1);
function dp(e, t) {
	et(t, !0);
	let n = Qe("urd-editor"), r = /* @__PURE__ */ k(() => n.selectedBlock), i = /* @__PURE__ */ k(() => n.siteDraft), { setBlockProp: a } = n;
	var o = Hr(), s = N(o), c = (e) => {
		var t = lp(), n = N(t), o = M(n), s = F(o);
		{
			let e = /* @__PURE__ */ k(() => L(r).props.href ?? ""), t = /* @__PURE__ */ k(() => [["", J("common.none")], ...L(i).pages.map((e) => [e.path, e.title])]);
			Y(s, {
				get value() {
					return L(e);
				},
				get options() {
					return L(t);
				},
				onchange: (e) => a("href", e)
			});
		}
		E(n);
		var c = F(n, 2), l = M(c), u = F(l);
		G(u), E(c), I((e, t, i, a) => {
			q(n, "title", e), V(o, `${t ?? ""} `), q(c, "title", i), V(l, `${a ?? ""} `), K(u, L(r).props.currency ?? "kr");
		}, [
			() => J("tip.cart.checkout"),
			() => J("lbl.checkoutPage"),
			() => J("tip.product.currency"),
			() => J("lbl.currency")
		]), R("change", u, (e) => a("currency", e.target.value)), B(e, t);
	}, l = (e) => {
		var t = up(), n = N(t), i = M(n), o = F(i);
		{
			let e = /* @__PURE__ */ k(() => L(r).props.variant ?? "button"), t = /* @__PURE__ */ k(() => [["button", J("opt.cart.button")], ["icon", J("opt.cart.icon")]]);
			Y(o, {
				get value() {
					return L(e);
				},
				get options() {
					return L(t);
				},
				onchange: (e) => a("variant", e)
			});
		}
		E(n), ke(2), I((e) => V(i, `${e ?? ""} `), [() => J("lbl.view")]), B(e, t);
	};
	H(s, (e) => {
		t.area === "content" ? e(c) : t.area === "style" && e(l, 1);
	}), B(e, o), tt();
}
Nr(["change"]);
//#endregion
//#region src/menu/families/Checkout.svelte
var fp = /* @__PURE__ */ z("<label> <input type=\"email\"/></label> <label> <input type=\"url\"/></label> <label> <input/></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label> <input/></label>", 1);
function pp(e, t) {
	et(t, !0);
	let n = Qe("urd-editor"), r = /* @__PURE__ */ k(() => n.selectedBlock), { setBlockProp: i } = n;
	var a = Hr(), o = N(a), s = (e) => {
		var t = fp(), n = N(t), a = M(n), o = F(a);
		G(o), E(n);
		var s = F(n, 2), c = M(s), l = F(c);
		G(l), E(s);
		var u = F(s, 2), d = M(u), f = F(d);
		G(f), E(u);
		var p = F(u, 2), m = M(p);
		G(m);
		var h = F(m);
		E(p);
		var g = F(p, 2), _ = M(g), v = F(_);
		G(v), E(g), I((e, t, i, y, b, x, S, C, w, T) => {
			q(n, "title", e), V(a, `${t ?? ""} `), K(o, L(r).props.recipient ?? ""), q(s, "title", i), V(c, `${y ?? ""} `), K(l, L(r).props.endpoint ?? ""), q(u, "title", b), V(d, `${x ?? ""} `), K(f, L(r).props.vipps ?? ""), q(p, "title", S), Ni(m, L(r).props.vippsCheckout === !0), V(h, ` ${C ?? ""}`), q(g, "title", w), V(_, `${T ?? ""} `), K(v, L(r).props.currency ?? "kr");
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
		]), R("change", o, (e) => i("recipient", e.target.value.trim())), R("change", l, (e) => i("endpoint", e.target.value.trim())), R("change", f, (e) => i("vipps", e.target.value.trim())), R("change", m, (e) => i("vippsCheckout", e.target.checked)), R("change", v, (e) => i("currency", e.target.value)), B(e, t);
	};
	H(o, (e) => {
		t.area === "content" && e(s);
	}), B(e, a), tt();
}
Nr(["change"]);
//#endregion
//#region src/menu/families/Fields.svelte
var mp = cn({}), hp = cn({}), gp = /* @__PURE__ */ A(!1), _p = /* @__PURE__ */ z("<p> </p>"), vp = /* @__PURE__ */ z("<label> <input type=\"text\"/></label> <button class=\"ghost\"> </button> <!>", 1), yp = /* @__PURE__ */ z("<label> <input type=\"number\"/></label>"), bp = /* @__PURE__ */ z("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), xp = /* @__PURE__ */ z("<label> <!></label>"), Sp = /* @__PURE__ */ z("<label> <input type=\"text\"/></label>"), Cp = /* @__PURE__ */ z("<button class=\"ghost\"> </button>");
function wp(e, t) {
	et(t, !0);
	let n = Qe("urd-editor"), r = /* @__PURE__ */ k(() => n.selectedBlock), i = /* @__PURE__ */ k(() => n.pluginBlocks), { setBlockProp: a, setBlockProps: o } = n, s = (e, t) => (Number.isFinite(t) || (t = e.min ?? 0), e.min != null && (t = Math.max(e.min, t)), e.max != null && (t = Math.min(e.max, t)), t);
	async function c(e) {
		let t = L(r).blockId, n = `${t}:${e.key}`, i = (mp[n] ?? L(r).props[e.key] ?? "").trim();
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
		j(gp, !0), hp[n] = {
			text: J("props.place.searching"),
			err: !1
		};
		try {
			let a = await fetch(`/api/geocode?q=${encodeURIComponent(i)}`), s = await a.json().catch(() => null);
			if (L(r)?.blockId !== t) return;
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
			j(gp, !1);
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
	var u = Hr(), d = N(u), f = (e) => {
		let t = /* @__PURE__ */ k(() => l[L(r).type] ?? L(i).find((e) => e.type === L(r).type)?.fields ?? []);
		var o = Hr(), u = N(o), d = (e) => {
			var n = Hr();
			ri(N(n), 17, () => L(t), (e) => e.key, (e, t) => {
				var n = Hr(), i = N(n), o = (e) => {
					let n = /* @__PURE__ */ k(() => `${L(r).blockId}:${L(t).key}`);
					var i = vp(), a = N(i), o = M(a), s = F(o);
					G(s), E(a);
					var l = F(a, 2), u = P(l, !0), d = F(l, 2), f = (e) => {
						var t = _p();
						let r;
						var i = P(t, !0);
						I(() => {
							r = W(t, 1, "panel-hint", null, r, { "place-error": hp[L(n)].err }), V(i, hp[L(n)].text);
						}), B(e, t);
					};
					H(d, (e) => {
						hp[L(n)] && e(f);
					}), I((e) => {
						V(o, `${L(t).label ?? ""} `), q(s, "placeholder", L(t).placeholder), K(s, mp[L(n)] ?? L(r).props[L(t).key] ?? ""), l.disabled = L(gp), V(u, e);
					}, [() => J("props.place.search")]), R("input", s, (e) => {
						mp[L(n)] = e.target.value;
					}), R("keydown", s, (e) => {
						e.key === "Enter" && c(L(t));
					}), R("click", l, () => c(L(t))), B(e, i);
				}, l = (e) => {
					var n = yp(), i = M(n), o = F(i);
					G(o), E(n), I(() => {
						V(i, `${L(t).label ?? ""} `), q(o, "min", L(t).min), q(o, "max", L(t).max), q(o, "step", L(t).step ?? 1), K(o, L(r).props[L(t).key]);
					}), R("change", o, (e) => a(L(t).key, s(L(t), Number(e.target.value)))), B(e, n);
				}, u = (e) => {
					var n = bp(), i = M(n);
					G(i);
					var o = F(i);
					E(n), I((e) => {
						Ni(i, e), V(o, ` ${L(t).label ?? ""}`);
					}, [() => !!L(r).props[L(t).key]]), R("change", i, (e) => a(L(t).key, e.target.checked)), B(e, n);
				}, d = (e) => {
					var n = xp(), i = M(n), o = F(i);
					{
						let e = /* @__PURE__ */ k(() => (L(t).options ?? []).map((e) => [e.value, e.label]));
						Y(o, {
							get value() {
								return L(r).props[L(t).key];
							},
							get options() {
								return L(e);
							},
							onchange: (e) => a(L(t).key, e)
						});
					}
					E(n), I(() => V(i, `${L(t).label ?? ""} `)), B(e, n);
				}, f = (e) => {
					var n = Sp(), i = M(n), o = F(i);
					G(o), E(n), I(() => {
						V(i, `${L(t).label ?? ""} `), q(o, "placeholder", L(t).placeholder), K(o, L(r).props[L(t).key] ?? "");
					}), R("change", o, (e) => a(L(t).key, e.target.value)), B(e, n);
				};
				H(i, (e) => {
					L(t).type === "place" ? e(o) : L(t).type === "number" ? e(l, 1) : L(t).type === "toggle" ? e(u, 2) : L(t).type === "select" ? e(d, 3) : e(f, -1);
				}), B(e, n);
			}), B(e, n);
		}, f = (e) => {
			var t = Cp(), i = P(t, !0);
			I((e, n) => {
				q(t, "title", e), V(i, n);
			}, [() => J("hint.pluginBlock"), () => J("ui.settings")]), R("click", t, () => n.bridge?.sendOpenConfig(L(r).blockId)), B(e, t);
		};
		H(u, (e) => {
			L(t).length ? e(d) : e(f, -1);
		}), B(e, o);
	};
	H(d, (e) => {
		t.area === "content" && e(f);
	}), B(e, u), tt();
}
Nr([
	"input",
	"keydown",
	"click",
	"change"
]);
//#endregion
//#region src/menu/ElementMenu.svelte
var Tp = (e) => {
	al(e, {});
}, Ep = /* @__PURE__ */ z("<button type=\"button\" class=\"menu-quick-open\"> </button>"), Dp = /* @__PURE__ */ z("<input type=\"number\"/>"), Op = /* @__PURE__ */ z("<button type=\"button\"> </button>"), kp = /* @__PURE__ */ z("<span class=\"seg\" role=\"group\"></span>"), Ap = /* @__PURE__ */ z("<div class=\"menu-quick-item\"><span class=\"menu-quick-head\"><span class=\"mini-label\"> </span><!></span> <!></div>"), jp = /* @__PURE__ */ z("<button type=\"button\" class=\"linkish menu-quick-reset\"> </button>"), Mp = /* @__PURE__ */ z("<div class=\"menu-quick\"><!> <!></div>"), Np = /* @__PURE__ */ z("<div><section class=\"emenu-col\"><p class=\"panel-strong emenu-title\"> </p><!><p class=\"emenu-none\"> </p></section> <section class=\"emenu-col\"><p class=\"panel-strong emenu-title\"> </p><!><p class=\"emenu-none\"> </p></section> <section class=\"emenu-col\"><p class=\"panel-strong emenu-title\"> </p><!><p class=\"emenu-none\"> </p></section></div>"), Pp = /* @__PURE__ */ z("<div class=\"emenu-cols\"><section class=\"emenu-col\"><p class=\"panel-strong\"> </p><!></section> <section class=\"emenu-col\"><p class=\"panel-strong\"> </p><!></section> <section class=\"emenu-col\"><p class=\"panel-strong\"> </p><!></section></div>"), Fp = /* @__PURE__ */ z("<div class=\"props-tabs\"><span class=\"seg\"><button type=\"button\"> </button> <button type=\"button\"> </button> <button type=\"button\"> </button></span></div> <!>", 1), Ip = /* @__PURE__ */ z("<!> <!>", 1);
function Lp(e, t) {
	et(t, !0);
	let n = (e) => {
		var t = Hr();
		ui(N(t), () => L(_), (e, t) => {
			t(e, { area: "content" });
		}), B(e, t);
	}, r = (e) => {
		var t = Hr();
		ui(N(t), () => L(_), (e, t) => {
			t(e, { area: "style" });
		}), B(e, t);
	}, i = Qe("urd-editor"), a = /* @__PURE__ */ k(() => i.selectedBlock), { setBlockProp: o, setBlockFit: s, setBlockSize: c, endSizeGesture: l, setBlockHideMobile: u, designWidth: d, buttonTargets: f, setButtonTarget: p, themeSwatches: m } = i, g = {
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
	}, _ = /* @__PURE__ */ k(() => g[L(a).type] ?? wp), v = qi(t, "query", 3, "");
	function y() {
		let e = so(L(a).type), t = new Map(b().map((e) => [e.id, e]));
		return Ja(L(a).type, e, new Set(t.keys())).map((e) => t.get(e));
	}
	function b() {
		let e = L(a), t = [];
		e.type === "calendar" && (t.push({
			id: "design",
			label: J("calendar.design"),
			kind: "open",
			value: J(ts(e.props.design).labelKey),
			run: i.openDesignPicker
		}), [
			"list",
			"cards",
			"agenda"
		].includes(ns(e.props)) && t.push({
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
		let n = xc.has(e.type);
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
			options: uo(),
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
			let e = pc(r.view);
			t.push({
				id: "galleryView",
				label: J("lbl.view"),
				kind: "select",
				value: e,
				options: lc.map((e) => [e, J(`opt.galleryView.${e}`)]),
				set: (e) => o("view", e)
			}), uc.includes(e) && t.push({
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
				options: mo(),
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
			options: So(),
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
		return Sc.has(e.type) || t.push({
			id: "size",
			label: J("lbl.scale"),
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
	var x = Ip(), S = N(x), C = (e) => {
		var t = Mp(), n = M(t);
		ri(n, 17, y, (e) => e.id, (e, t) => {
			var n = Ap(), r = M(n), i = M(r), a = P(i, !0);
			Mo(F(i), { get id() {
				return L(t).id;
			} }), E(r);
			var o = F(r, 2), s = (e) => {
				var n = Ep(), r = P(n, !0);
				I(() => V(r, L(t).value)), R("click", n, function(...e) {
					L(t).run?.apply(this, e);
				}), B(e, n);
			}, c = (e) => {
				var n = Dp();
				G(n), I(() => {
					q(n, "min", L(t).min), q(n, "max", L(t).max), q(n, "step", L(t).step ?? 1), K(n, L(t).value), q(n, "aria-label", L(t).label);
				}), R("change", n, (e) => L(t).set(e.target.value)), B(e, n);
			}, l = (e) => {
				Y(e, {
					get value() {
						return L(t).value;
					},
					get options() {
						return L(t).options;
					},
					get title() {
						return L(t).label;
					},
					compact: !0,
					onchange: (e) => L(t).set(e)
				});
			}, u = (e) => {
				{
					let n = /* @__PURE__ */ k(m);
					Pa(e, {
						get value() {
							return L(t).value;
						},
						get tokens() {
							return L(n);
						},
						get label() {
							return L(t).label;
						},
						onchange: (e) => L(t).set(e)
					});
				}
			}, d = (e) => {
				var n = kp();
				ri(n, 21, () => L(t).options, ([e, t]) => e, (e, n) => {
					var r = /* @__PURE__ */ k(() => h(L(n), 2));
					let i = () => L(r)[0], a = () => L(r)[1];
					var o = Op();
					let s;
					var c = P(o, !0);
					I(() => {
						q(o, "aria-pressed", L(t).value === i()), s = W(o, 1, "", null, s, { on: L(t).value === i() }), V(c, a());
					}), R("click", o, () => L(t).set(i())), B(e, o);
				}), E(n), I(() => q(n, "aria-label", L(t).label)), B(e, n);
			};
			H(o, (e) => {
				L(t).kind === "open" ? e(s) : L(t).kind === "number" ? e(c, 1) : L(t).kind === "select" ? e(l, 2) : L(t).kind === "color" ? e(u, 3) : e(d, -1);
			}), E(n), I(() => V(a, L(t).label)), B(e, n);
		});
		var r = F(n, 2), i = (e) => {
			var t = jp(), n = P(t, !0);
			I((e) => V(n, e), [() => J("menu.quickReset")]), R("click", t, () => co(L(a).type, Ka)), B(e, t);
		}, o = /* @__PURE__ */ k(() => Za(so(L(a).type)));
		H(r, (e) => {
			L(o) && e(i);
		}), E(t), B(e, t);
	}, w = /* @__PURE__ */ k(() => !v().trim());
	H(S, (e) => {
		L(w) && e(C);
	});
	var T = F(S, 2), ee = (e) => {
		var i = Np();
		let a;
		var o = M(i), s = M(o), c = P(s, !0), l = F(s);
		n(l);
		var u = P(F(l), !0);
		E(o);
		var d = F(o, 2), f = M(d), p = P(f, !0), m = F(f);
		r(m);
		var h = P(F(m), !0);
		E(d);
		var g = F(d, 2), _ = M(g), y = P(_, !0), b = F(_);
		Tp(b);
		var x = P(F(b), !0);
		E(g), E(i), xi(i, () => Bc(v(), Mc)), I((e, n, r, o, s, l) => {
			a = W(i, 1, "emenu-cols emenu-search", null, a, { stacked: !t.wide }), V(c, e), V(u, n), V(p, r), V(h, o), V(y, s), V(x, l);
		}, [
			() => J("props.tabContent"),
			() => J("menu.noMatch"),
			() => J("props.tabStyle"),
			() => J("menu.noMatch"),
			() => J("props.tabPlacement"),
			() => J("menu.noMatch")
		]), B(e, i);
	}, te = /* @__PURE__ */ k(() => v().trim()), ne = (e) => {
		var t = Pp(), i = M(t), a = M(i), o = P(a, !0), s = F(a);
		n(s), E(i);
		var c = F(i, 2), l = M(c), u = P(l, !0), d = F(l);
		r(d), E(c);
		var f = F(c, 2), p = M(f), m = P(p, !0);
		Tp(F(p)), E(f), E(t), I((e, t, n) => {
			V(o, e), V(u, t), V(m, n);
		}, [
			() => J("props.tabContent"),
			() => J("props.tabStyle"),
			() => J("props.tabPlacement")
		]), B(e, t);
	}, re = (e) => {
		var t = Fp(), i = N(t), a = M(i), o = M(a);
		let s;
		var c = P(o, !0), l = F(o, 2);
		let u;
		var d = P(l, !0), f = F(l, 2);
		let p;
		var m = P(f, !0);
		E(a), E(i);
		var h = F(i, 2), g = (e) => {
			n(e);
		}, _ = (e) => {
			r(e);
		}, v = (e) => {
			Tp(e);
		};
		H(h, (e) => {
			to.tab === "content" ? e(g) : to.tab === "style" ? e(_, 1) : e(v, -1);
		}), I((e, t, n) => {
			s = W(o, 1, "", null, s, { on: to.tab === "content" }), V(c, e), u = W(l, 1, "", null, u, { on: to.tab === "style" }), V(d, t), p = W(f, 1, "", null, p, { on: to.tab === "placement" }), V(m, n);
		}, [
			() => J("props.tabContent"),
			() => J("props.tabStyle"),
			() => J("props.tabPlacement")
		]), R("click", o, () => to.tab = "content"), R("click", l, () => to.tab = "style"), R("click", f, () => to.tab = "placement"), B(e, t);
	};
	H(T, (e) => {
		L(te) ? e(ee) : t.wide ? e(ne, 1) : e(re, -1);
	}), B(e, x), tt();
}
Nr(["click", "change"]);
//#endregion
//#region src/menu/SearchField.svelte
var Rp = /* @__PURE__ */ z("<input type=\"search\" class=\"menu-search\"/>");
function zp(e, t) {
	et(t, !0);
	var n = Rp();
	G(n), I((e, t, r) => {
		q(n, "placeholder", e), q(n, "aria-label", t), q(n, "title", r);
	}, [
		() => J("menu.search"),
		() => J("menu.search"),
		() => J("tip.menu.search")
	]), R("keydown", n, (e) => {
		e.key === "Escape" && t.get() && (e.stopPropagation(), t.set(""));
	}), Li(n, t.get, t.set), B(e, n), tt();
}
Nr(["keydown"]);
//#endregion
//#region src/menu/FloatingMenu.svelte
var Bp = /* @__PURE__ */ z("<div><header class=\"block-menu-head\"><span class=\"block-menu-title\"> </span> <!> <button class=\"ghost row-tool menu-width\"></button> <button class=\"ghost row-tool\"></button></header> <div class=\"panel-body block-menu-body\"><!></div></div>");
function Vp(e, t) {
	et(t, !0);
	let n = Qe("urd-editor"), r = /* @__PURE__ */ k(() => n.selectedBlock);
	var i = Bp();
	let a;
	var o = M(i), s = M(o), c = P(s, !0), l = F(s, 2);
	zp(l, {
		get: () => to.menuQuery,
		set: (e) => to.menuQuery = e
	});
	var u = F(l, 2);
	U(u, () => to.wide ? "<svg viewBox=\"0 0 18 18\" width=\"14\" height=\"14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M2 4l4 5-4 5M16 4l-4 5 4 5\"/></svg>" : "<svg viewBox=\"0 0 18 18\" width=\"14\" height=\"14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M6 4L2 9l4 5M12 4l4 5-4 5\"/></svg>", !0), E(u);
	var d = F(u, 2);
	U(d, () => X.cross, !0), E(d), E(o);
	var f = F(o, 2), p = M(f);
	{
		let e = /* @__PURE__ */ k(no);
		Lp(p, {
			get wide() {
				return L(e);
			},
			get query() {
				return to.menuQuery;
			}
		});
	}
	E(f), E(i), I((e, n, r, o, s) => {
		a = W(i, 1, "block-menu", null, a, { wide: e }), Oi(i, `--menu-left: ${t.pos.left ?? ""}px; --menu-top: ${t.pos.top ?? ""}px; --menu-min: ${to.min ?? ""}px`), V(c, n), q(u, "title", r), q(u, "aria-label", o), q(d, "title", s);
	}, [
		() => no(),
		() => J("blocks.suffix", { label: n.blockLabel(L(r).type) }),
		() => to.wide ? J("menu.toNarrow") : J("menu.toWide"),
		() => to.wide ? J("menu.toNarrow") : J("menu.toWide"),
		() => J("tip.closeEsc")
	]), R("click", u, () => to.wide = !to.wide), R("click", d, function(...e) {
		t.onclose?.apply(this, e);
	}), B(e, i), tt();
}
Nr(["click"]);
//#endregion
//#region ../template/assets/engine/0.7.4/preset-thumb.js
var Hp = /^#[0-9a-fA-F]{3,8}$/, Up = /^[a-z][a-z0-9-]*$/, Wp = "#171c26", Gp = "#232a38", Kp = "#98a1b3", qp = "#7c5cff", Jp = (e, t) => `var(--urd-color-${e}, ${t})`;
function Yp(e, t) {
	return typeof e == "string" ? Hp.test(e) ? e : Up.test(e) ? Jp(e, t) : t : t;
}
function Xp(e, t = 800) {
	let n = Number.parseFloat(e);
	return !Number.isFinite(n) || n <= 0 ? 400 : typeof e == "string" && e.trim().endsWith("vh") ? n / 100 * t : n;
}
var Zp = (e) => Math.round(e * 10) / 10, Qp = (e, t, n) => Math.min(n, Math.max(t, e)), $p = (e, t, n, r, i, a = "") => `<rect x="${Zp(e)}" y="${Zp(t)}" width="${Zp(Math.max(n, 1))}" height="${Zp(Math.max(r, 1))}" fill="${i}"${a}/>`;
function em(e) {
	if (e?.theme) return e.theme === "inverse" || e.theme === "deep" ? Jp("text", Kp) : e.theme === "accent" ? Jp("accent", qp) : Jp("surface", Gp);
	for (let t of e?.background?.layers ?? []) {
		if (t.type === "color") return Yp(t.props?.value, Wp);
		if (t.type === "gradient") return Yp(Array.isArray(t.props?.stops) ? t.props.stops[0] : null, Wp);
	}
	return Jp("bg", Wp);
}
function tm(e, t, n, r, i) {
	let a = /<h[1-3]/.test(String(i?.html ?? "")), o = i?.align === "center", s = Jp("text", Kp), c = [];
	i?.box && c.push($p(e, t, n, r, Jp("surface", Gp), " rx=\"1.5\""));
	let l = i?.box ? Math.min(2, n * .06) : 0, u = e + l, d = n - l * 2, f = [
		.72,
		.9,
		.5
	], p = [
		a ? 4 : 2.2,
		2.2,
		2.2
	], m = Qp(r / (p[0] + p[1] + p[2] + 4.8 + 2), 0, 1), h = t + l + Math.min(1, r * .08);
	for (let e = 0; e < 3; e++) {
		let n = Math.min(Math.max(e === 0 ? a ? 1.4 : 1 : .8, p[e] * m), Math.max(r, 1));
		if (e > 0 && h + n > t + r - l) break;
		let i = d * f[e], g = o ? u + (d - i) / 2 : u;
		c.push($p(g, h, i, n, s, ` opacity="${e === 0 ? .8 : .4}" rx="${Zp(Math.min(1, n / 2))}"`)), h += n + Math.max(.8, 2.4 * m);
	}
	return c.join("");
}
function nm(e, t, n, r, i = !1) {
	let a = Jp("text", Kp), o = [];
	i ? (o.push($p(e, t, n, r, Jp("surface", Gp), " rx=\"1.5\" opacity=\"0.35\"")), o.push(`<rect x="${Zp(e + .4)}" y="${Zp(t + .4)}" width="${Zp(Math.max(n - .8, 1))}" height="${Zp(Math.max(r - .8, 1))}" fill="none" stroke="${a}" stroke-width="0.6" stroke-dasharray="2 2" opacity="0.35" rx="1.5"/>`)) : o.push($p(e, t, n, r, Jp("surface", Gp), " rx=\"1.5\""));
	let s = i ? .15 : .4, c = (t) => Zp(e + n * t), l = (e) => Zp(t + r * e);
	return o.push(`<polygon points="${c(.08)},${l(.9)} ${c(.42)},${l(.38)} ${c(.62)},${l(.68)} ${c(.75)},${l(.5)} ${c(.92)},${l(.9)}" fill="${a}" opacity="${s}"/>`), o.push(`<circle cx="${c(.28)}" cy="${l(.26)}" r="${Zp(Math.max(1, Math.min(n, r) * .1))}" fill="${a}" opacity="${Zp(s + .1)}"/>`), o.join("");
}
function rm(e, t, n, r, i) {
	let a = !(Array.isArray(i?.images) && i.images.length), o = Math.max(1, n * .03), s = (n - o * 2) / 3, c = [];
	for (let n = 0; n < 3; n++) c.push(nm(e + n * (s + o), t, s, r, a));
	return c.join("");
}
function im(e, t, n, r) {
	let i = Math.max(1, n * .03), a = (n - i * 2) / 3, o = [];
	for (let n = 0; n < 3; n++) {
		let s = e + n * (a + i);
		o.push($p(s, t, a, r * .55, Jp("surface", Gp), " rx=\"1.5\"")), o.push($p(s, t + r * .62, a * .8, 2, Jp("text", Kp), " opacity=\"0.5\" rx=\"1\""));
	}
	return o.join("");
}
function am(e, t, n, r, i) {
	let a = Yp(i?.color, qp), o = i?.kind;
	return o === "circle" ? `<ellipse cx="${Zp(e + n / 2)}" cy="${Zp(t + r / 2)}" rx="${Zp(Math.max(n / 2, 1))}" ry="${Zp(Math.max(r / 2, 1))}" fill="${a}" opacity="0.8"/>` : o === "triangle" ? `<polygon points="${Zp(e)},${Zp(t + r)} ${Zp(e + n / 2)},${Zp(t)} ${Zp(e + n)},${Zp(t + r)}" fill="${a}" opacity="0.8"/>` : o === "line" || o === "arrow" ? $p(e, t + r / 2 - .75, n, 1.5, a, " opacity=\"0.85\" rx=\"0.75\"") : $p(e, t, n, r, a, " opacity=\"0.8\" rx=\"1\"");
}
function om(e, t, n, r, i, a) {
	if (e === "text") return tm(t, n, r, i, a);
	if (e === "image") return nm(t, n, r, i, !a?.src);
	if (e === "gallery") return rm(t, n, r, i, a);
	if (e === "collection") return im(t, n, r, i);
	if (e === "faq") {
		let e = Qp(Math.floor(i / 5), 2, 3), a = Math.max(.6, i * .04), o = (i - a * (e - 1)) / e, s = [];
		for (let i = 0; i < e; i += 1) {
			let e = n + i * (o + a);
			s.push($p(t, e, r, o, Jp("surface", Gp), " rx=\"1\"")), s.push($p(t + r * .06, e + o / 2 - .7, r * .55, 1.4, Jp("text", Kp), " opacity=\"0.5\" rx=\"0.7\"")), s.push(`<circle cx="${Zp(t + r * .92)}" cy="${Zp(e + o / 2)}" r="0.9" fill="${Jp("text", Kp)}" opacity="0.4"/>`);
		}
		return s.join("");
	}
	if (e === "shape") return am(t, n, r, i, a);
	if (e === "button") return $p(t, n, r, i, Jp("accent", qp), ` rx="${Zp(Math.min(i / 2, 4))}"`);
	if (e === "icon") {
		let e = Math.max(1.2, Math.min(r, i) / 2);
		return `<circle cx="${Zp(t + r / 2)}" cy="${Zp(n + i / 2)}" r="${Zp(e)}" fill="${Jp("accent", qp)}" opacity="0.85"/>`;
	}
	if (e === "video") {
		let e = [$p(t, n, r, i, Jp("surface", Gp), " rx=\"1.5\"")], a = t + r / 2, o = n + i / 2, s = Math.max(1.5, Math.min(r, i) * .22);
		return e.push(`<polygon points="${Zp(a - s / 2)},${Zp(o - s)} ${Zp(a - s / 2)},${Zp(o + s)} ${Zp(a + s)},${Zp(o)}" fill="${Jp("text", Kp)}" opacity="0.6"/>`), e.join("");
	}
	if (e === "timeline") {
		let e = [$p(t + 1, n, 1.4, i, Jp("accent", qp), " opacity=\"0.7\" rx=\"0.7\"")];
		for (let a = 0; a < 3; a += 1) {
			let o = n + i * (.18 + a * .32);
			e.push(`<circle cx="${Zp(t + 1.7)}" cy="${Zp(o)}" r="1.6" fill="${Jp("accent", qp)}"/>`), e.push($p(t + 5, o - 1, r * .5, 2, Jp("text", Kp), " opacity=\"0.5\" rx=\"1\""));
		}
		return e.join("");
	}
	if (e === "quote") return [
		`<text x="${Zp(t + r / 2)}" y="${Zp(n + i * .34)}" text-anchor="middle" font-size="${Zp(Math.min(r, i) * .5)}" font-family="Georgia, serif" fill="${Jp("accent", qp)}">“</text>`,
		$p(t + r * .15, n + i * .48, r * .7, 2, Jp("text", Kp), " opacity=\"0.6\" rx=\"1\""),
		$p(t + r * .25, n + i * .62, r * .5, 2, Jp("text", Kp), " opacity=\"0.6\" rx=\"1\""),
		$p(t + r * .35, n + i * .82, r * .3, 1.6, Jp("text", Kp), " opacity=\"0.35\" rx=\"0.8\"")
	].join("");
	if (e === "ribbon") return [
		$p(t, n + i * .3, r, i * .4, Jp("accent", qp), " opacity=\"0.85\" rx=\"1\""),
		$p(t + r * .08, n + i * .46, r * .18, 1.8, Jp("bg", Wp), " opacity=\"0.9\" rx=\"0.9\""),
		$p(t + r * .34, n + i * .46, r * .24, 1.8, Jp("bg", Wp), " opacity=\"0.9\" rx=\"0.9\""),
		$p(t + r * .66, n + i * .46, r * .2, 1.8, Jp("bg", Wp), " opacity=\"0.9\" rx=\"0.9\"")
	].join("");
	if (e === "stats") return [$p(t + r * .28, n + i * .15, r * .44, i * .42, Jp("accent", qp), " opacity=\"0.85\" rx=\"1\""), $p(t + r * .32, n + i * .72, r * .36, 1.6, Jp("text", Kp), " opacity=\"0.4\" rx=\"0.8\"")].join("");
	if (e === "table") {
		let e = Math.max(1.6, i * .22), a = [$p(t, n, r, e, Jp("accent", qp), " opacity=\"0.5\" rx=\"0.8\"")], o = Qp(Math.floor((i - e) / 3.2), 1, 3);
		for (let s = 0; s < o; s += 1) a.push($p(t, n + e + 1 + s * ((i - e - 1) / o), r, 1, Jp("text", Kp), " opacity=\"0.3\""));
		return a.push($p(t + r * .33, n, .6, i, Jp("text", Kp), " opacity=\"0.2\"")), a.push($p(t + r * .66, n, .6, i, Jp("text", Kp), " opacity=\"0.2\"")), a.join("");
	}
	if (e === "share") {
		let e = Math.max(1.2, Math.min(i / 2, r / 9)), a = [];
		for (let r = 0; r < 4; r += 1) a.push(`<circle cx="${Zp(t + e + r * (e * 2 + 1.5))}" cy="${Zp(n + i / 2)}" r="${Zp(e)}" fill="${Jp("accent", qp)}" opacity="0.8"/>`);
		return a.join("");
	}
	if (e === "countdown") {
		let e = Math.max(.8, r * .03), a = (r - e * 3) / 4, o = [];
		for (let r = 0; r < 4; r += 1) {
			let s = t + r * (a + e);
			o.push($p(s, n, a, i, Jp("surface", Gp), " rx=\"1\"")), o.push($p(s + a * .25, n + i * .2, a * .5, i * .35, Jp("accent", qp), " opacity=\"0.85\" rx=\"0.8\""));
		}
		return o.join("");
	}
	if (e === "audio") {
		let e = [$p(t, n, r, i, Jp("surface", Gp), " rx=\"1.5\"")], a = n + i / 2, o = Math.max(1.2, i * .28);
		return e.push(`<polygon points="${Zp(t + r * .06)},${Zp(a - o)} ${Zp(t + r * .06)},${Zp(a + o)} ${Zp(t + r * .06 + o * 1.4)},${Zp(a)}" fill="${Jp("accent", qp)}" opacity="0.85"/>`), e.push($p(t + r * .2, a - .6, r * .7, 1.2, Jp("text", Kp), " opacity=\"0.35\" rx=\"0.6\"")), e.join("");
	}
	if (e === "product") {
		let e = Math.max(.8, r * .03), a = (r - e * 2) / 3, o = [];
		for (let r = 0; r < 3; r += 1) {
			let s = t + r * (a + e);
			o.push($p(s, n, a, i, Jp("surface", Gp), " rx=\"1\"")), o.push($p(s + a * .08, n + i * .06, a * .84, i * .42, Jp("text", Kp), " opacity=\"0.15\" rx=\"0.8\"")), o.push($p(s + a * .08, n + i * .56, a * .6, 1.4, Jp("text", Kp), " opacity=\"0.5\" rx=\"0.7\"")), o.push($p(s + a * .08, n + i * .72, a * .35, 1.4, Jp("accent", qp), " opacity=\"0.85\" rx=\"0.7\"")), o.push($p(s + a * .08, n + i * .84, a * .84, i * .1, Jp("accent", qp), " opacity=\"0.6\" rx=\"1\""));
		}
		return o.join("");
	}
	if (e === "cart") {
		let e = Math.max(1.5, Math.min(r, i) / 2.4), a = t + r / 2, o = n + i / 2;
		return [
			`<circle cx="${Zp(a)}" cy="${Zp(o)}" r="${Zp(e)}" fill="${Jp("surface", Gp)}"/>`,
			$p(a - e * .5, o - e * .25, e, e * .55, Jp("text", Kp), " opacity=\"0.5\" rx=\"0.4\""),
			`<circle cx="${Zp(a + e * .75)}" cy="${Zp(o - e * .75)}" r="${Zp(Math.max(.9, e * .35))}" fill="${Jp("accent", qp)}"/>`
		].join("");
	}
	return e === "checkout" ? [
		$p(t, n, r * .7, 1.2, Jp("text", Kp), " opacity=\"0.5\" rx=\"0.6\""),
		$p(t, n + i * .12, r * .5, 1.2, Jp("text", Kp), " opacity=\"0.35\" rx=\"0.6\""),
		$p(t, n + i * .3, r, i * .14, Jp("surface", Gp), " rx=\"1\""),
		$p(t, n + i * .5, r, i * .14, Jp("surface", Gp), " rx=\"1\""),
		$p(t, n + i * .78, r * .45, i * .16, Jp("accent", qp), " opacity=\"0.85\" rx=\"1.2\"")
	].join("") : $p(t, n, r, i, Jp("surface", Gp), " rx=\"1.5\"");
}
function sm(e, t, n) {
	let r = Array.isArray(e?.blocks) ? e.blocks : [], i = r.map((e) => (e.frames?.desktop?.y ?? 0) + (e.frames?.desktop?.h ?? 0)), a = n / Math.max(Xp(e?.size?.minHeight), i.length ? Math.max(...i) + 16 : 0), o = [$p(0, 0, t, n, em(e))];
	for (let r of e?.background?.layers ?? []) {
		if (r.type !== "glow") continue;
		let e = r.props ?? {};
		o.push(`<circle cx="${Zp(Qp(e.x ?? .5, 0, 1) * t)}" cy="${Zp(Qp(e.y ?? .3, 0, 1) * n)}" r="${Zp(t * Qp(e.radius ?? .5, .1, 1) * .5)}" fill="${Yp(e.color, qp)}" opacity="${Zp(Qp(e.opacity ?? .3, 0, .5))}"/>`);
	}
	for (let r of e?.background?.layers ?? []) {
		if (r.type !== "slideshow") continue;
		let e = r.props ?? {}, i = e.style ?? "floating", a = Jp("surface", Gp);
		if (i === "floating") {
			let r = e.look === "polaroid", s = t * (r ? .17 : .13), c = s / (r ? .84 : 1.35);
			for (let r of ac(e.images, {
				...e,
				seed: e.seed || 1,
				style: i
			})) {
				let e = r.x / 100 * t - s / 2, i = r.y / 100 * n - c / 2, l = ` rx="1" opacity="0.75" transform="rotate(${Zp(r.rot)} ${Zp(e + s / 2)} ${Zp(i + c / 2)})"`;
				o.push($p(e, i, s, c, a, l));
			}
		} else if (i === "band") {
			let r = Number(e.rows) === 1 ? 1 : 2, i = n * (r === 1 ? .4 : .3), s = i * 1.33;
			for (let e = 0; e < r; e += 1) {
				let c = r === 1 ? (n - i) / 2 : n * .1 + e * (i + n * .1);
				for (let n = -s * (e * .5); n < t; n += s + 3) o.push($p(n, c, s, i, a, " rx=\"1\" opacity=\"0.75\""));
			}
		} else if (i === "mosaic") {
			let r = (t - 10) / 4, i = n / 3.4, s = 0, c = 0;
			for (let t of cc(e.count, e.seed || 1)) {
				s + t.cols > 4 && (s = 0, c += 1);
				let e = 2 + c * (i + 2);
				if (e > n) break;
				o.push($p(2 + s * (r + 2), e, r * t.cols + 2 * (t.cols - 1), i * t.rows + 2 * (t.rows - 1), a, " rx=\"1\" opacity=\"0.75\"")), s += t.cols, s >= 4 && (s = 0, c += 1);
			}
		}
	}
	let s = t * .06, c = t - s * 2;
	for (let e of r) {
		let r = e.frames?.desktop;
		if (!r) continue;
		let i = Qp(s + (r.x ?? 0) * (c / 100), 0, t - 2), l = Qp((r.y ?? 0) * a, 0, n - 2), u = Qp((r.w ?? 10) * (c / 100), 2, t - i), d = Qp((r.h ?? 20) * a, 2, n - l);
		o.push(om(e.type, i, l, u, d, e.props));
	}
	return o.join("");
}
function cm(e, { w: t = 96, h: n = 116, max: r = 6 } = {}) {
	let i = (Array.isArray(e?.sections) ? e.sections : []).slice(0, r);
	if (!i.length) return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${$p(0, 0, t, n, Jp("bg", Wp))}</svg>`;
	let a = i.map((e) => Qp(Xp(e?.size?.minHeight), 160, 900)), o = a.reduce((e, t) => e + t, 0), s = n - 1 * (i.length - 1), c = [], l = 0;
	for (let e = 0; e < i.length; e += 1) {
		let n = Math.max(6, a[e] / o * s);
		c.push(`<g transform="translate(0 ${Zp(l)})">${sm(i[e], t, n)}</g>`), l += n + 1;
	}
	return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${c.join("")}</svg>`;
}
//#endregion
//#region ../template/assets/engine/0.7.4/blocks/form.js
var lm = () => [
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
];
//#endregion
//#region ../template/assets/engine/0.7.4/sections/presets.js
function um(e) {
	return typeof crypto < "u" && crypto.randomUUID ? `${e}-${crypto.randomUUID().slice(0, 8)}` : `${e}-${[...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4))].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
var dm = () => ({ mobile: {
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
}), fm = (e, t, n = {}) => ({
	id: um("blk"),
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
}), pm = (e, t = {}) => ({
	id: um("blk"),
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
}), mm = (e, t, n = {}) => ({
	id: um("blk"),
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
}), hm = (e, t, n = 40) => ({
	id: um("blk"),
	type: "icon",
	version: 1,
	props: {
		glyph: t,
		color: "accent",
		size: n
	},
	animation: null,
	frames: e
}), gm = (e, t = {}) => ({
	id: um("blk"),
	type: "map",
	version: 2,
	props: {
		location: "",
		zoom: 15,
		...t
	},
	animation: null,
	frames: e
}), _m = (e, t = {}) => ({
	id: um("blk"),
	type: "form",
	version: 1,
	props: {
		recipient: "",
		subject: "",
		mode: "mailto",
		endpoint: "",
		submitLabel: J("form.sendDefault"),
		successText: J("form.thanksDefault"),
		fields: lm(),
		...t
	},
	animation: null,
	frames: e
}), vm = (e, t = {}) => ({
	id: um("blk"),
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
}), ym = () => ({
	type: "hover-lift",
	version: 1,
	props: {}
}), bm = (e, t, n = {}) => ({
	id: um("blk"),
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
}), xm = (e, t = {}) => ({
	id: um("blk"),
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
}), Sm = (e, t = {}) => ({
	id: um("blk"),
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
}), Cm = (e, t = {}) => ({
	id: um("blk"),
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
}), wm = (e, t = {}) => ({
	id: um("blk"),
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
}), Tm = (e, t) => ({
	id: um("blk"),
	type: "faq",
	version: 1,
	props: {
		items: t,
		multi: !1
	},
	animation: null,
	frames: e
}), Em = (e, t = {}) => ({
	id: um("blk"),
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
}), Dm = (e, t) => ({
	id: um("blk"),
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
}), Om = (e, t = {}) => ({
	id: um("blk"),
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
}), km = (...e) => ({
	version: 1,
	layers: e
}), Am = (e) => ({
	type: "color",
	version: 1,
	props: { value: e }
}), jm = (e, t, n, r = .5) => ({
	type: "glow",
	version: 1,
	props: {
		x: e,
		y: t,
		color: "accent",
		radius: r,
		opacity: n
	}
}), Mm = (e) => Math.max(0, ...e.blocks.map((e) => e.frames.desktop.y + e.frames.desktop.h)), Nm = (e, t, n, r, i, a) => ({
	x: n + e % t * r,
	y: i + Math.floor(e / t) * a
}), Pm = (e, t, n, r, i, a, o, s, c = 0) => {
	let l = (t) => e.blocks.some((e) => {
		let n = e.frames.desktop;
		return n.x < t.x + t.w - .01 && t.x < n.x + n.w - .01 && n.y < t.y + t.h - .01 && t.y < n.y + n.h - .01;
	});
	for (let e = 0; e < 60; e++) {
		let u = Nm(e, t, n, r, i, a);
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
		y: Mm(e) + 16,
		n: 0
	};
}, Fm = (e, t, n) => e + t * .1 + n * .01, Im = (e, t, n, r, i = null) => ({
	id: um("sec"),
	version: 1,
	preset: e,
	size: { minHeight: t },
	grid: i,
	background: n,
	blocks: r,
	responsive: dm()
});
function Lm(e) {
	e.sections.define("blank", {
		label: "Empty section",
		labelKey: "preset.blank.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "A blank canvas to build on freely",
		hintKey: "preset.blank.hint",
		create: () => Im("blank", "40vh", km(Am("bg")), [])
	}), e.sections.define("hero", {
		label: "Hero",
		labelKey: "preset.hero.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Large opening with gradient and glow, left-aligned",
		hintKey: "preset.hero.hint",
		create: () => Im("hero", "70vh", {
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
				jm(.7, .2, .35),
				{
					type: "grain",
					version: 1,
					props: { opacity: .06 }
				}
			]
		}, [
			fm(Q(8.33, 40, 50, 38), J("seed.hero.title")),
			fm(Q(8.33, 84, 41.67, 26), J("seed.hero.intro")),
			mm(Q(8.33, 118, 20, 32), J("seed.readMore"))
		])
	}), e.sections.define("hero-centered", {
		label: "Hero, centred",
		labelKey: "preset.hero-centered.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Centred opening with two buttons",
		hintKey: "preset.hero-centered.hint",
		create: () => Im("hero-centered", "60vh", km(Am("bg")), [
			fm(Q(15, 64, 70, 44), J("seed.heroCenter.title"), { align: "center" }),
			fm(Q(25, 116, 50, 26), J("seed.heroCenter.intro"), { align: "center" }),
			mm(Q(31.5, 160, 17, 40), J("seed.join")),
			mm(Q(51.5, 160, 17, 40), J("seed.readMore"), { style: "secondary" })
		])
	}), e.sections.define("hero-image", {
		label: "Hero over a photo",
		labelKey: "preset.hero-image.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Opening over a photo that creeps slowly, with a veil under the text",
		hintKey: "preset.hero-image.hint",
		create: () => {
			let e = Im("hero-image", "70vh", {
				version: 1,
				layers: [
					Am("bg"),
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
				fm(Q(8.33, 40, 50, 38), J("seed.hero.title")),
				fm(Q(8.33, 84, 41.67, 26), J("seed.hero.intro")),
				mm(Q(8.33, 118, 20, 32), J("seed.readMore"))
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
			let e = Im("hero-photos", "70vh", {
				version: 1,
				layers: [
					Am("bg"),
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
				fm(Q(15, 64, 70, 44), J("seed.heroCenter.title"), { align: "center" }),
				fm(Q(25, 116, 50, 26), J("seed.heroCenter.intro"), { align: "center" }),
				mm(Q(41.5, 160, 17, 40), J("seed.readMore"))
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
		create: () => Im("images", "360px", km(Am("bg")), [
			fm(Q(4, 24, 50, 32), J("seed.images.title")),
			pm(Q(4, 72, 28, 220)),
			pm(Q(36, 72, 28, 220)),
			pm(Q(68, 72, 28, 220))
		]),
		itemLabel: "image",
		itemLabelKey: "item.image",
		item: (e) => {
			let { x: t, y: n } = Pm(e, 3, 4, 32, 72, 244, 28, 220);
			return {
				blocks: [pm(Q(t, n, 28, 220))],
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
		create: () => Im("gallery", "440px", km(Am("bg")), [fm(Q(4, 24, 50, 32), J("seed.gallery.title")), wm(Q(4, 72, 92, 320))])
	}), e.sections.define("find-us", {
		label: "Find us",
		labelKey: "preset.find-us.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Map with your address (privacy-friendly OpenStreetMap)",
		hintKey: "preset.find-us.hint",
		create: () => Im("find-us", "480px", km(Am("bg")), [fm(Q(6, 40, 60, 70), J("seed.findUs.title")), gm(Q(6, 120, 88, 360, 2))])
	}), e.sections.define("whats-on", {
		label: "What is on",
		labelKey: "preset.whats-on.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Event list from a subscribable calendar (iCal/Google)",
		hintKey: "preset.whats-on.hint",
		create: () => Im("whats-on", "520px", km(Am("bg")), [fm(Q(6, 40, 60, 70), J("seed.whatsOn.title")), vm(Q(6, 130, 88, 320, 2), { limit: 5 })])
	});
	let t = (t, n, r) => e.sections.define(t, {
		label: `What is on: ${t.slice(9)}`,
		labelKey: `preset.${t}.label`,
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Events from a subscribable calendar (iCal/Google)",
		hintKey: `preset.${t}.hint`,
		create: () => Im(t, n, km(Am("bg")), [fm(Q(6, 40, 60, 70), J("seed.whatsOn.title")), r()])
	});
	t("whats-on-cards", "560px", () => vm(Q(6, 130, 88, 360, 2), {
		view: "cards",
		limit: 6
	})), t("whats-on-month", "720px", () => vm(Q(6, 130, 88, 520, 2), { view: "month" })), t("whats-on-week", "560px", () => vm(Q(6, 130, 88, 360, 2), {
		view: "week",
		design: "weekStrip"
	})), t("whats-on-next", "460px", () => vm(Q(6, 130, 48, 260, 2), {
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
		create: () => Im("contact-form", "520px", km(Am("bg")), [fm(Q(6, 40, 60, 120), J("seed.contactForm.intro")), _m(Q(6, 180, 60, 380, 2))])
	}), e.sections.define("contact", {
		label: "Contact",
		labelKey: "preset.contact.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Contact details in a card with an email button",
		hintKey: "preset.contact.hint",
		create: () => Im("contact", "320px", km(Am("surface"), jm(.2, .8, .2)), [
			fm(Q(10, 32, 40, 36), J("seed.contact.title")),
			fm(Q(10, 84, 36, 130), J("seed.contact.info"), { box: !0 }),
			mm(Q(60, 100, 22, 40), J("seed.contact.button"), { href: `mailto:${J("seed.email")}` })
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
				let i = hm(Q(e + 10.5, 88, 4, 52), n), a = fm(Q(e, 152, 25, 200), J("seed.features.card", { title: r }), {
					align: "center",
					box: !0
				});
				return a.animation = ym(), i.mobileOrder = Fm(88, t, 0), a.mobileOrder = Fm(88, t, 1), [i, a];
			};
			return Im("feature-cards", "420px", km(Am("bg")), [
				fm(Q(6, 28, 60, 38), J("seed.features.title")),
				...e(6, 0, "✦", J("seed.features.card1")),
				...e(37.5, 1, "★", J("seed.features.card2")),
				...e(69, 2, "✓", J("seed.features.card3"))
			]);
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = Pm(e, 3, 6, 31.5, 152, 296, 25, 264, -64), i = hm(Q(t + 10.5, n - 64, 4, 52), "✦"), a = fm(Q(t, n, 25, 200), J("seed.features.card", { title: J("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return a.animation = ym(), i.mobileOrder = Fm(88, r, 0), a.mobileOrder = Fm(88, r, 1), {
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
				let r = fm(Q(e, 88, 25, 200), J("seed.features.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.animation = ym(), r.mobileOrder = Fm(88, t, 0), r;
			};
			return Im("feature-cards-simple", "360px", km(Am("bg")), [
				fm(Q(6, 28, 60, 38), J("seed.features.title")),
				e(6, 0, J("seed.features.card1")),
				e(37.5, 1, J("seed.features.card2")),
				e(69, 2, J("seed.features.card3"))
			]);
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = Pm(e, 3, 6, 31.5, 88, 232, 25, 200), i = fm(Q(t, n, 25, 200), J("seed.features.card", { title: J("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.animation = ym(), i.mobileOrder = Fm(88, r, 0), {
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
				let n = pm(Q(e, 88, 25, 160)), r = fm(Q(e, 256, 25, 160), J("seed.news.card"));
				return n.mobileOrder = Fm(88, t, 0), r.mobileOrder = Fm(88, t, 1), [n, r];
			};
			return Im("news", "460px", km(Am("bg")), [
				fm(Q(6, 28, 50, 38), J("seed.news.title")),
				mm(Q(78, 30, 16, 36), J("seed.news.seeAll"), { style: "secondary" }),
				...e(6, 0),
				...e(37.5, 1),
				...e(69, 2)
			]);
		},
		itemLabel: "story",
		itemLabelKey: "item.story",
		item: (e) => {
			let { x: t, y: n, n: r } = Pm(e, 3, 6, 31.5, 88, 344, 25, 328), i = pm(Q(t, n, 25, 160)), a = fm(Q(t, n + 168, 25, 160), J("seed.news.card"));
			return i.mobileOrder = Fm(88, r, 0), a.mobileOrder = Fm(88, r, 1), {
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
		create: () => Im("news-collection", "300px", km(Am("bg")), [fm(Q(6, 28, 50, 38), J("seed.news.title")), bm(Q(6, 88, 88, 180), "cards")])
	}), e.sections.define("noticeboard", {
		label: "Noticeboard",
		labelKey: "preset.noticeboard.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Dated list from a collection (notices/announcements)",
		hintKey: "preset.noticeboard.hint",
		create: () => Im("noticeboard", "300px", km(Am("surface")), [fm(Q(6, 28, 50, 38), J("seed.noticeboard.title")), bm(Q(6, 88, 88, 180), "list", { limit: 8 })])
	}), e.sections.define("publication-archive", {
		label: "Publication archive",
		labelKey: "preset.publication-archive.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Year-grouped archive from a collection (issues, minutes, reports)",
		hintKey: "preset.publication-archive.hint",
		create: () => Im("publication-archive", "300px", km(Am("bg")), [fm(Q(6, 28, 60, 38), J("seed.archive.title")), bm(Q(6, 88, 88, 180), "archive", { limit: 0 })])
	}), e.sections.define("events", {
		label: "Events",
		labelKey: "preset.events.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Three rows with date badge and sign-up button",
		hintKey: "preset.events.hint",
		create: () => {
			let e = (e, t, n, r) => [
				fm(Q(6, e, 8, 88), J("seed.events.dateBadge", {
					day: t,
					month: n
				}), {
					align: "center",
					box: !0
				}),
				fm(Q(16, e, 58, 88), J("seed.events.row", { title: r })),
				mm(Q(78, e + 24, 16, 40), J("seed.events.signup"), { style: "secondary" })
			];
			return Im("events", "440px", km(Am("surface")), [
				fm(Q(6, 28, 50, 38), J("seed.events.title")),
				...e(88, "11", J("seed.events.monthAug"), J("seed.events.row1")),
				...e(196, "25", J("seed.events.monthAug"), J("seed.events.row2")),
				...e(304, "8", J("seed.events.monthSep"), J("seed.events.row3"))
			]);
		},
		itemLabel: "row",
		itemLabelKey: "item.row",
		item: (e) => {
			let t = Mm(e) + 16;
			return {
				blocks: [
					fm(Q(6, t, 8, 88), J("seed.events.newBadge"), {
						align: "center",
						box: !0
					}),
					fm(Q(16, t, 58, 88), J("seed.events.row", { title: J("seed.events.newTitle") })),
					mm(Q(78, t + 24, 16, 40), J("seed.events.signup"), { style: "secondary" })
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
				let r = pm(Q(e, 80, 22, 180), { alt: J("seed.team.alt") }), i = fm(Q(e, 268, 22, 84), J("seed.team.member", { role: n }), { align: "center" });
				return r.mobileOrder = Fm(80, t, 0), i.mobileOrder = Fm(80, t, 1), [r, i];
			};
			return Im("team", "420px", km(Am("surface")), [
				fm(Q(6, 24, 50, 32), J("seed.team.title")),
				...e(7.5, 0, J("seed.team.role1")),
				...e(39, 1, J("seed.team.role2")),
				...e(70.5, 2, J("seed.team.role3"))
			]);
		},
		itemLabel: "person",
		itemLabelKey: "item.person",
		item: (e) => {
			let { x: t, y: n, n: r } = Pm(e, 3, 7.5, 31.5, 80, 288, 22, 272), i = pm(Q(t, n, 22, 180), { alt: J("seed.team.alt") }), a = fm(Q(t, n + 188, 22, 84), J("seed.team.member", { role: J("seed.team.roleNew") }), { align: "center" });
			return i.mobileOrder = Fm(80, r, 0), a.mobileOrder = Fm(80, r, 1), {
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
		create: () => Im("faq", "520px", km(Am("bg")), [
			fm(Q(25, 24, 50, 36), J("seed.faq.title"), { align: "center" }),
			Tm(Q(20, 80, 60, 320), [
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
			fm(Q(20, 416, 60, 32), J("seed.faq.more"), { align: "center" })
		])
	}), e.sections.define("timeline", {
		label: "Timeline",
		labelKey: "preset.timeline.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Your story as events along a line",
		hintKey: "preset.timeline.hint",
		create: () => Im("timeline", "480px", km(Am("bg")), [fm(Q(25, 24, 50, 36), J("seed.timeline.title"), { align: "center" }), Dm(Q(25, 88, 50, 330), [
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
				let r = fm(Q(e, 88, 25, 72), `<h3>${t + 1}</h3>`, {
					align: "center",
					size: 44
				}), i = fm(Q(e, 168, 25, 160), J("seed.steps.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.mobileOrder = Fm(88, t, 0), i.mobileOrder = Fm(88, t, 1), [r, i];
			};
			return Im("steps", "400px", km(Am("bg")), [
				fm(Q(6, 28, 60, 38), J("seed.steps.title")),
				...e(6, 0, J("seed.steps.s1")),
				...e(37.5, 1, J("seed.steps.s2")),
				...e(69, 2, J("seed.steps.s3"))
			]);
		},
		itemLabel: "step",
		itemLabelKey: "item.step",
		item: (e) => {
			let { x: t, y: n, n: r } = Pm(e, 3, 6, 31.5, 88, 272, 25, 240), i = fm(Q(t, n, 25, 72), `<h3>${r + 1}</h3>`, {
				align: "center",
				size: 44
			}), a = fm(Q(t, n + 80, 25, 160), J("seed.steps.card", { title: J("seed.steps.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.mobileOrder = Fm(88, r, 0), a.mobileOrder = Fm(88, r, 1), {
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
				pm(Q(6, 40, 55, 300)),
				fm(Q(6, 348, 55, 108), J("seed.feature.main")),
				mm(Q(6, 464, 14, 38), J("seed.readMore"), { style: "secondary" }),
				pm(Q(66, 40, 28, 120)),
				fm(Q(66, 164, 28, 60), J("seed.feature.small1")),
				pm(Q(66, 244, 28, 120)),
				fm(Q(66, 368, 28, 60), J("seed.feature.small2"))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = Fm(40, t < 3 ? 0 : 1, t);
			}), Im("lead-story", "540px", km(Am("bg")), e);
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
					pm(Q(e, 88, 25, 200)),
					fm(Q(e, 296, 25, 76), J("seed.products.card", {
						name: n,
						price: r
					}), { align: "center" }),
					mm(Q(e + 5, 380, 15, 40), J("seed.products.buy"))
				];
				return i.forEach((e, n) => {
					e.mobileOrder = Fm(88, t, n);
				}), i;
			};
			return Im("products", "470px", km(Am("bg")), [
				fm(Q(6, 28, 50, 38), J("seed.products.title")),
				...e(6, 0, J("seed.products.name"), J("seed.products.price1")),
				...e(37.5, 1, J("seed.products.name"), J("seed.products.price2")),
				...e(69, 2, J("seed.products.name"), J("seed.products.price3"))
			]);
		},
		itemLabel: "product",
		itemLabelKey: "item.product",
		item: (e) => {
			let { x: t, y: n, n: r } = Pm(e, 3, 6, 31.5, 88, 348, 25, 332), i = [
				pm(Q(t, n, 25, 200)),
				fm(Q(t, n + 208, 25, 76), J("seed.products.card", {
					name: J("seed.products.name"),
					price: J("seed.products.price1")
				}), { align: "center" }),
				mm(Q(t + 5, n + 292, 15, 40), J("seed.products.buy"))
			];
			return i.forEach((e, t) => {
				e.mobileOrder = Fm(88, r, t);
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
		create: () => Im("shop", "544px", km(Am("bg")), [
			fm(Q(6, 28, 50, 38), J("seed.shop.title")),
			Sm(Q(78, 88, 16, 48)),
			xm(Q(6, 176, 88, 320))
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
				fm(Q(6, 48, 52, 96), J("seed.shopHero.title")),
				fm(Q(6, 152, 40, 48), J("seed.shopHero.sub")),
				mm(Q(6, 216, 17, 42), J("seed.shopHero.cta")),
				pm(Q(62, 40, 32, 300))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = Fm(48, t < 3 ? 0 : 1, t);
			}), Im("shop-hero", "400px", {
				version: 1,
				layers: [
					Am("bg"),
					jm(.8, .25, .28, .6),
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
				let r = pm(Q(e, 88, 21, 170)), i = fm(Q(e, 266, 21, 34), J("seed.shopCategories.tile", { name: n }), { align: "center" });
				return r.mobileOrder = Fm(88, t, 0), i.mobileOrder = Fm(88, t, 1), [r, i];
			}, t = Im("shop-categories", "360px", km(Am("bg")), [
				fm(Q(6, 28, 60, 38), J("seed.shopCategories.title")),
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
			let { x: t, y: n, n: r } = Pm(e, 4, 6, 23.5, 88, 220, 21, 212), i = pm(Q(t, n, 21, 170)), a = fm(Q(t, n + 178, 21, 34), J("seed.shopCategories.tile", { name: J("seed.shopCategories.newCat") }), { align: "center" });
			return i.mobileOrder = Fm(88, r, 0), a.mobileOrder = Fm(88, r, 1), {
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
				let i = hm(Q(e + 10.5, 88, 4, 52), r, 44), a = fm(Q(e, 148, 25, 96), J(n), { align: "center" });
				return i.mobileOrder = Fm(88, t, 0), a.mobileOrder = Fm(88, t, 1), [i, a];
			}, t = Im("shop-trust", "300px", km(Am("bg")), [
				fm(Q(6, 28, 60, 38), J("seed.shopTrust.title")),
				...e(6, 0, "seed.shopTrust.t1", "✓"),
				...e(37.5, 1, "seed.shopTrust.t2", "↻"),
				...e(69, 2, "seed.shopTrust.t3", "✉")
			]);
			return t.theme = "muted", t;
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = Pm(e, 3, 6, 31.5, 148, 216, 25, 156, -60), i = hm(Q(t + 10.5, n - 60, 4, 52), "✓", 44), a = fm(Q(t, n, 25, 96), J("seed.shopTrust.newItem"), { align: "center" });
			return i.mobileOrder = Fm(88, r, 0), a.mobileOrder = Fm(88, r, 1), {
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
				fm(Q(6, 56, 52, 100), J("seed.shopShowcase.title")),
				fm(Q(6, 164, 42, 56), J("seed.shopShowcase.text")),
				mm(Q(6, 236, 18, 42), J("seed.shopShowcase.cta")),
				pm(Q(62, 48, 32, 240))
			];
			e.forEach((e, t) => {
				e.mobileOrder = Fm(56, t < 3 ? 0 : 1, t);
			});
			let t = Im("shop-showcase", "340px", km(Am("bg")), e);
			return t.theme = "deep", t;
		}
	}), e.sections.define("checkout", {
		label: "Checkout",
		labelKey: "preset.checkout.label",
		group: "Shop",
		groupKey: "presetGroup.shop",
		hint: "Order form that sends the basket as an email or to an endpoint",
		hintKey: "preset.checkout.hint",
		create: () => Im("checkout", "560px", km(Am("bg")), [fm(Q(6, 28, 50, 38), J("seed.checkout.title")), Cm(Q(25, 96, 50, 430))])
	}), e.sections.define("cta", {
		label: "CTA banner",
		labelKey: "preset.cta.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Full width with one clear action",
		hintKey: "preset.cta.hint",
		create: () => Im("cta", "280px", km(Am("surface"), jm(.5, .5, .3, .7)), [
			fm(Q(20, 56, 60, 40), J("seed.cta.title"), { align: "center" }),
			fm(Q(25, 104, 50, 26), J("seed.cta.sub"), { align: "center" }),
			mm(Q(42, 148, 16, 42), J("seed.join"))
		])
	}), e.sections.define("quote", {
		label: "Quote",
		labelKey: "preset.quote.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Large quote with attribution",
		hintKey: "preset.quote.hint",
		create: () => Im("quote", "300px", km(Am("bg")), [Em(Q(20, 56, 60, 190), {
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
				let a = Om(Q(e, 76, 25, 120), {
					value: n,
					suffix: r,
					label: i
				});
				return a.mobileOrder = Fm(76, t, 0), a;
			};
			return Im("stats", "260px", km(Am("surface")), [
				e(6, 0, "120", "+", J("seed.stats.l1")),
				e(37.5, 1, "25", "", J("seed.stats.l2")),
				e(69, 2, "1981", "", J("seed.stats.l3"))
			]);
		},
		itemLabel: "number",
		itemLabelKey: "item.number",
		item: (e) => {
			let { x: t, y: n, n: r } = Pm(e, 3, 6, 31.5, 76, 140, 25, 120), i = Om(Q(t, n, 25, 120), {
				value: "42",
				label: J("seed.stats.newLabel")
			});
			return i.mobileOrder = Fm(76, r, 0), {
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
			let e = (e) => pm(Q(e, 108, 18.5, 100), {
				alt: J("seed.sponsors.alt"),
				fit: "contain",
				radius: null,
				saturate: 0
			});
			return Im("sponsors", "280px", km(Am("bg")), [
				fm(Q(6, 28, 60, 36), J("seed.sponsors.title")),
				e(5.5),
				e(29),
				e(52.5),
				e(76)
			]);
		},
		itemLabel: "logo",
		itemLabelKey: "item.logo",
		item: (e) => {
			let { x: t, y: n } = Pm(e, 4, 5.5, 23.5, 108, 124, 18.5, 100);
			return {
				blocks: [pm(Q(t, n, 18.5, 100), {
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
		create: () => Im("membership", "500px", km(Am("surface")), [
			fm(Q(6, 28, 50, 38), J("seed.membership.title")),
			fm(Q(14, 88, 32, 250), J("seed.membership.tier1"), {
				align: "center",
				box: !0
			}),
			fm(Q(54, 88, 32, 250), J("seed.membership.tier2"), {
				align: "center",
				box: !0
			}),
			mm(Q(42, 358, 16, 42), J("seed.join")),
			fm(Q(25, 414, 50, 30), J("seed.membership.vipps"), { align: "center" })
		])
	});
}
var Rm = 24, zm = {
	"oppsett-byttet": "layout-changed",
	"blokk-endret": "block-edited",
	"desktop-endret-etter-mobil": "desktop-changed-after-mobile",
	seksjonshøyde: "section-height",
	"blokk-flyttet": "block-moved",
	"blokk-slettet": "block-deleted",
	"blokk-lagt-til": "block-added"
};
function Bm(e, t) {
	if (!e || !("y" in e || "h" in e)) return e ?? null;
	if (t && e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h) return null;
	let n = {
		x: e.x,
		w: e.w
	};
	return Number.isFinite(e.y) && (n.row = Math.max(1, Math.round((e.y - Rm) / 8) + 1), n.rows = Number.isFinite(e.h) ? Math.max(1, Math.ceil(e.h / 8)) : 1), Number.isFinite(e.z) && e.z !== 1 && (n.z = e.z), e.rot && (n.rot = e.rot), n;
}
var Vm = {
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
}, Hm = { bildegalleri: "slideshow" }, Um = {
	flate: "surface",
	aksent: "accent",
	invers: "inverse",
	dus: "soft",
	dempet: "muted",
	dyp: "deep",
	uthevet: "highlighted"
}, Wm = {
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
function Gm(e) {
	let t = Array.isArray(e) ? e : e.blocks ?? [];
	for (let e of t) Vm[e.type] && (e.type = Vm[e.type]);
	if (!Array.isArray(e)) {
		for (let t of e.background?.layers ?? []) Hm[t.type] && (t.type = Hm[t.type]);
		Um[e.theme] && (e.theme = Um[e.theme]), Wm[e.preset] && (e.preset = Wm[e.preset]);
	}
	return e;
}
var Km = 26;
function qm(e) {
	for (let t of e?.blocks ?? []) {
		if (t.type !== "calendar" || !t.props || !("scale" in t.props)) continue;
		let e = Tc({
			type: "calendar",
			size: t.props.scale
		});
		delete t.props.scale, e !== 1 && (t.size = e);
	}
}
function Jm(e) {
	for (let t of e?.blocks ?? []) {
		if (t.type !== "map" && t.type !== "kart" || !Number.isFinite(t.props?.height)) continue;
		let n = t.frames?.desktop;
		if (n && Number.isFinite(n.h)) {
			let r = Math.max(n.h, Math.round(t.props.height + Km)), i = Oc(e.blocks, t.id, r);
			n.h = r;
			for (let t of e.blocks) {
				let e = i.get(t.id);
				Number.isFinite(e) && t.frames?.desktop && (t.frames.desktop.y = e);
			}
		}
		delete t.props.height;
	}
}
function Ym(e, t = !1) {
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
var Xm = {
	1: (e) => {
		for (let t of e.sections ?? []) {
			let e = t.responsive?.mobile;
			for (let e of t.blocks ?? []) e.decor && (e.hideMobile = !0), e.frames?.mobile && (e.frames.mobile = Bm(e.frames.mobile, e.frames.desktop));
			e?.mode === "manual" && (e.mode = "auto");
			let n = e?.attention?.reason;
			n && zm[n] && (e.attention.reason = zm[n]);
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) Gm(t);
		return e;
	},
	3: (e) => {
		for (let t of e.sections ?? []) Gm(t);
		return e;
	},
	4: (e) => {
		for (let t of e.sections ?? []) Jm(t);
		return e;
	},
	5: (e) => {
		for (let t of e.sections ?? []) qm(t);
		return e;
	},
	6: (e) => {
		for (let t of e.sections ?? []) Ym(t, !0);
		return e;
	}
}, Zm = {
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
function Qm(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 4;) {
		let r = Zm[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function $m(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 7;) {
		let i = Xm[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/page-presets.js
var eh = /* @__PURE__ */ new Map();
Lm({ sections: { define: (e, t) => eh.set(e, t) } });
var th = [
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
function nh(e, { pageId: t, title: n }) {
	let r = th.find((t) => t.id === e);
	return r ? {
		schemaVersion: 7,
		meta: {
			id: t,
			title: n
		},
		sections: r.sections.map((e) => eh.get(e).create())
	} : null;
}
//#endregion
//#region ../template/assets/engine/0.7.4/theme.js
function rh(e, t, n) {
	return t === "light" || t === "dark" ? t : n ? "dark" : "light";
}
function ih(e, t) {
	let n = e.tokens || {}, r = e.scheme === "dark" ? "dark" : "light";
	if (!e.alt?.tokens || t === r) return n;
	let i = {};
	for (let t of /* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(e.alt.tokens)])) i[t] = {
		...n[t],
		...e.alt.tokens[t]
	};
	return i;
}
var ah = /^[a-zA-Z0-9#%.,()'"\s+\-*/]+$/;
function oh(e) {
	return typeof e == "string" && ah.test(e) && !/url\(|\/\*|\*\/|expression/i.test(e);
}
function sh(e) {
	let t = e.tokens || {}, n = ih(e, "light"), r = ih(e, "dark"), i = e.scheme === "dark" ? "dark" : "light", a = [], o = [], s = [], c = /* @__PURE__ */ new Set([
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
			oh(c) && (a.push(`  --urd-${e}-${l}: ${c};`), i && a.push(`  --urd-base-${l}: ${c};`)), u !== d && (i && oh(u) && oh(d) ? o.push({
				name: l,
				lv: u,
				dv: d
			}) : !i && oh(u) && oh(d) && s.push({
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
	].some((e) => oh(e.color?.["accent-text"])) && oh(t.color?.accent);
	u && oh(t.color?.bg) && (a.push(`  --urd-color-accent-text: ${t.color.bg};`), a.push(`  --urd-base-accent-text: ${t.color.bg};`));
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
function ch(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
var lh = {
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
}, uh = {
	surface: "sectionTheme.surface",
	accent: "sectionTheme.accent",
	inverse: "sectionTheme.inverse",
	soft: "sectionTheme.soft",
	muted: "sectionTheme.muted",
	deep: "sectionTheme.deep",
	highlighted: "sectionTheme.highlighted"
};
[...new Set(Object.values(lh).flatMap(Object.keys))];
function dh(e) {
	return lh[e] ?? {};
}
function fh(e) {
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
function ph(e, t) {
	let n = fh(e), r = fh(t);
	return n == null || r == null ? null : (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
//#endregion
//#region src/panels/PagesPanel.svelte
var mh = /* @__PURE__ */ z("<span class=\"page-path\">/</span>"), hh = /* @__PURE__ */ z("<input class=\"page-slug\"/>"), gh = /* @__PURE__ */ z("<span class=\"seo-warn\"></span>"), _h = /* @__PURE__ */ z("<button class=\"ghost danger\"><!> </button>"), vh = /* @__PURE__ */ z("<div class=\"page-menu\"><button class=\"ghost\"><!> </button> <!></div>"), yh = /* @__PURE__ */ z("<div><input class=\"page-title\"/> <!> <!> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <span class=\"page-menu-wrap\"><button class=\"ghost row-tool\"></button> <!></span></span></div>"), bh = /* @__PURE__ */ z("<img class=\"site-icon-preview\"/>"), xh = /* @__PURE__ */ z("<button class=\"ghost row-tool\"></button>"), Sh = /* @__PURE__ */ z("<div><button class=\"page-template-pick\"><span class=\"page-template-thumb\"></span> <span class=\"page-template-name\"> </span></button></div>"), Ch = /* @__PURE__ */ z("<div><button class=\"page-template-pick\"><span class=\"page-template-thumb\"></span> <span class=\"page-template-name\"> </span></button> <button class=\"page-template-del\"></button></div>"), wh = /* @__PURE__ */ z("<span class=\"mini-label\"> </span> <div class=\"page-template-grid\"></div>", 1), Th = /* @__PURE__ */ z("<div class=\"panel-body\"><!> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><label> <textarea rows=\"2\"></textarea></label> <label> <input/></label> <label> <textarea rows=\"2\"></textarea></label> <label> <!></label> <span class=\"toolbar-row\"><label class=\"ghost filepick tb-grow\"> <input type=\"file\" accept=\"image/*\"/></label> <!></span> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label></div></details> <hr class=\"gridmenu-divider\"/> <input/> <button class=\"ghost action\"> </button> <span class=\"mini-label\"> </span> <div class=\"page-template-grid\"><div><button class=\"page-template-pick\"><span class=\"page-template-thumb\"></span> <span class=\"page-template-name\"> </span></button></div> <!></div> <!></div>");
function Eh(e, t) {
	et(t, !0);
	let n = Qe("urd-editor"), r = /* @__PURE__ */ k(() => n.missingSeo), i = /* @__PURE__ */ k(() => n.pageId), a = /* @__PURE__ */ k(() => n.seoDraft), o = /* @__PURE__ */ k(() => n.siteDraft), s = /* @__PURE__ */ k(() => n.templateIds), { addPage: c, deletePage: l, handleDeleteTemplate: u, renamePage: d, savePageAsTemplate: f, selectPage: p, setPageNoindex: m, setPageSeo: h, setPageSlug: g, templateStores: _, uploadOgImage: v } = n, y = Object.fromEntries(th.map((e) => [e.id, cm(nh(e.id, {
		pageId: "preview",
		title: ""
	}))])), b = /* @__PURE__ */ k(() => {
		let e = L(o)?.theme?.tokens?.color ?? {};
		return [
			"bg",
			"surface",
			"text",
			"accent"
		].filter((t) => typeof e[t] == "string" && oh(e[t])).map((t) => `--urd-color-${t}: ${e[t]};`).join(" ");
	});
	var x = Th(), S = M(x);
	ri(S, 17, () => L(o).pages, (e) => e.id, (e, t) => {
		var a = yh();
		let o;
		var s = M(a);
		G(s);
		var c = F(s, 2), u = (e) => {
			var t = mh();
			I((e) => q(t, "title", e), [() => J("tip.pages.homeLocked")]), B(e, t);
		}, m = (e) => {
			var n = hh();
			G(n), I((e, t) => {
				K(n, e), q(n, "title", t);
			}, [() => L(t).path.slice(1), () => J("tip.pages.slug")]), R("change", n, (e) => g(L(t), e.target.value)), B(e, n);
		};
		H(c, (e) => {
			L(t).path === "/" ? e(u) : e(m, -1);
		});
		var h = F(c, 2), _ = (e) => {
			var t = gh();
			U(t, () => X.warn, !0), E(t), I((e) => q(t, "title", e), [() => J("tip.pages.missingDescription")]), B(e, t);
		};
		H(h, (e) => {
			L(r)[L(t).id] && e(_);
		});
		var v = F(h, 2), y = M(v);
		U(y, () => X.right, !0), E(y);
		var b = F(y, 2), x = M(b);
		U(x, () => X.kebab, !0), E(x);
		var S = F(x, 2), C = (e) => {
			var r = vh(), i = M(r), a = M(i);
			U(a, () => X.bookmark);
			var o = F(a);
			E(i);
			var s = F(i, 2), c = (e) => {
				var r = _h(), i = M(r);
				U(i, () => X.cross);
				var a = F(i);
				E(r), I((e, t) => {
					q(r, "title", e), V(a, ` ${t ?? ""}`);
				}, [() => J("tip.pages.delete"), () => J("ui.deletePage")]), R("click", r, () => {
					n.pageMenuFor = null, l(L(t));
				}), B(e, r);
			};
			H(s, (e) => {
				L(t).path !== "/" && e(c);
			}), E(r), I((e) => V(o, ` ${e ?? ""}`), [() => J("ui.savePageTemplate")]), R("click", i, () => f(L(t))), B(e, r);
		};
		H(S, (e) => {
			n.pageMenuFor === L(t).id && e(C);
		}), E(b), E(v), E(a), I((e, n, r) => {
			o = W(a, 1, "page-row", null, o, { current: L(t).id === L(i) }), K(s, L(t).title), q(s, "title", e), q(y, "title", n), y.disabled = L(t).id === L(i), q(x, "title", r);
		}, [
			() => J("tip.pages.title"),
			() => J("tip.pages.open"),
			() => J("tip.pages.menu")
		]), R("change", s, (e) => d(L(t), e.target.value)), R("click", y, () => p(L(t).id)), R("click", x, () => n.pageMenuFor = n.pageMenuFor === L(t).id ? null : L(t).id), B(e, a);
	});
	var C = F(S, 2), w = M(C), T = P(w, !0), ee = F(w, 2), te = M(ee), ne = M(te), re = F(ne);
	pt(re), E(te);
	var ie = F(te, 2), ae = M(ie), oe = F(ae);
	G(oe), E(ie);
	var se = F(ie, 2), ce = M(se), le = F(ce);
	pt(le), E(se);
	var ue = F(se, 2), de = M(ue), fe = F(de), pe = (e) => {
		var t = bh();
		I((e) => {
			q(t, "src", L(a).ogImage), q(t, "alt", e);
		}, [() => J("lbl.ogImage")]), B(e, t);
	};
	H(fe, (e) => {
		L(a).ogImage && e(pe);
	}), E(ue);
	var me = F(ue, 2), he = M(me), ge = M(he), _e = F(ge);
	E(he);
	var ve = F(he, 2), ye = (e) => {
		var t = xh();
		U(t, () => X.cross, !0), E(t), I((e) => q(t, "title", e), [() => J("tip.seo.removeOgImage")]), R("click", t, () => h("ogImage", "")), B(e, t);
	};
	H(ve, (e) => {
		L(a).ogImage && e(ye);
	}), E(me);
	var be = F(me, 2), xe = M(be);
	G(xe);
	var Se = F(xe);
	E(be), E(ee), E(C);
	var Ce = F(C, 4);
	G(Ce);
	var we = F(Ce, 2), Te = P(we, !0), Ee = F(we, 2), De = P(Ee, !0), Oe = F(Ee, 2), ke = M(Oe);
	let Ae;
	var je = M(ke), Me = M(je);
	U(Me, () => cm({ sections: [] }), !0), E(Me);
	var Ne = P(F(Me, 2), !0);
	E(je), E(ke), ri(F(ke, 2), 17, () => th, (e) => e.id, (e, t) => {
		var r = Sh();
		let i;
		var a = M(r), o = M(a);
		U(o, () => y[L(t).id], !0), E(o);
		var s = P(F(o, 2), !0);
		E(a), E(r), I((e, o) => {
			i = W(r, 1, "page-template-card", null, i, { picked: n.newPageTemplate === `preset:${L(t).id}` }), q(a, "title", e), V(s, o);
		}, [() => J("tip.pages.templatePick", { name: J(L(t).labelKey) }), () => J(L(t).labelKey)]), R("click", a, () => n.newPageTemplate = n.newPageTemplate === `preset:${L(t).id}` ? null : `preset:${L(t).id}`), B(e, r);
	}), E(Oe);
	var Pe = F(Oe, 2), D = (e) => {
		var t = wh(), r = N(t), i = P(r, !0), a = F(r, 2);
		ri(a, 20, () => L(s).filter((e) => _[e]?.data?.mal?.kind === "page"), (e) => e, (e, t) => {
			var r = Ch();
			let i;
			var a = M(r), o = M(a);
			U(o, () => cm(_[t].data.page), !0), E(o);
			var s = P(F(o, 2), !0);
			E(a);
			var c = F(a, 2);
			U(c, () => X.cross, !0), E(c), E(r), I((e, o) => {
				i = W(r, 1, "page-template-card", null, i, { picked: n.newPageTemplate === t }), q(a, "title", e), V(s, _[t].data.mal.name), q(c, "title", o);
			}, [() => J("tip.pages.templatePick", { name: _[t].data.mal.name }), () => J("canvas.deleteTemplate")]), R("click", a, () => n.newPageTemplate = n.newPageTemplate === t ? null : t), R("click", c, () => u({ id: t })), B(e, r);
		}), E(a), I((e) => {
			V(i, e), Oi(a, L(b));
		}, [() => J("canvas.tabMyTemplates")]), B(e, t);
	}, Fe = /* @__PURE__ */ k(() => L(s).some((e) => _[e]?.data?.mal?.kind === "page"));
	H(Pe, (e) => {
		L(Fe) && e(D);
	}), E(x), I((e, t, r, i, o, s, c, l, u, d, f, p, m, h, g, _, v, y, x, S, C, w) => {
		V(T, e), q(te, "title", t), V(ne, `${r ?? ""} `), K(re, L(a).description), q(ie, "title", i), V(ae, `${o ?? ""} `), K(oe, L(a).ogTitle), q(oe, "placeholder", s), q(se, "title", c), V(ce, `${l ?? ""} `), K(le, L(a).ogDescription), q(le, "placeholder", L(a).description), q(ue, "title", u), V(de, `${d ?? ""} `), q(he, "title", f), V(ge, `${p ?? ""} `), q(be, "title", m), Ni(xe, h), V(Se, ` ${g ?? ""}`), q(Ce, "placeholder", _), q(we, "title", v), we.disabled = y, V(Te, x), V(De, S), Oi(Oe, L(b)), Ae = W(ke, 1, "page-template-card", null, Ae, { picked: n.newPageTemplate === null }), q(je, "title", C), V(Ne, w);
	}, [
		() => J("ui.seoGroup", { page: L(o).pages.find((e) => e.id === L(i))?.title ?? "" }),
		() => J("tip.seo.description"),
		() => J("lbl.seoDescription"),
		() => J("tip.seo.ogTitle"),
		() => J("lbl.ogTitle"),
		() => L(o).pages.find((e) => e.id === L(i))?.title ?? "",
		() => J("tip.seo.ogDescription"),
		() => J("lbl.ogDescription"),
		() => J("tip.seo.ogImage"),
		() => J("lbl.ogImage"),
		() => J("tip.seo.ogImage"),
		() => L(a).ogImage ? J("ui.changeImage") : J("ui.chooseImage"),
		() => J("tip.seo.hideFromSearch"),
		() => L(o).pages.find((e) => e.id === L(i))?.noindex === !0,
		() => J("lbl.hideFromSearch"),
		() => J("ph.newPageName"),
		() => J("hint.pages.autoMenu"),
		() => !n.newPageTitle.trim(),
		() => J("ui.createPage"),
		() => J("canvas.tabPresets"),
		() => J("tip.pages.blankPick"),
		() => J("ui.blankPage")
	]), R("change", re, (e) => h("description", e.target.value)), R("change", oe, (e) => h("ogTitle", e.target.value)), R("change", le, (e) => h("ogDescription", e.target.value)), R("change", _e, v), R("change", xe, (e) => m(e.target.checked)), R("keydown", Ce, (e) => e.key === "Enter" && c()), Li(Ce, () => n.newPageTitle, (e) => n.newPageTitle = e), R("click", we, c), R("click", je, () => n.newPageTemplate = null), B(e, x), tt();
}
Nr([
	"change",
	"click",
	"keydown"
]);
//#endregion
//#region src/lib/nav-size.js
var Dh = {
	min: 0,
	max: 64,
	step: 1
}, Oh = {
	min: 12,
	max: 28,
	step: 1
}, kh = {
	min: 0,
	max: 80,
	step: 1
}, Ah = {
	min: 0,
	max: 64,
	step: 1
}, jh = {
	min: 480,
	max: 1920,
	step: 20
}, Mh = {
	min: .3,
	max: .8,
	step: .05
}, Nh = {
	min: 0,
	max: 400,
	step: 10
}, Ph = {
	min: 0,
	max: 1200,
	step: 20
}, Fh = {
	min: 0,
	max: 64,
	step: 1
}, Ih = {
	min: 180,
	max: 400,
	step: 1
}, Lh = {
	min: 12,
	max: 128,
	step: 1
}, Rh = {
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
}, zh = [
	"sm",
	"md",
	"lg",
	"xl"
], Bh = .67;
function Vh(e) {
	return e === "floating" || e === "floating-square" || e === "floating-tab";
}
function Hh(e, { min: t, max: n, step: r = 1 }, i) {
	let a = Number(e);
	if (e == null || e === "" || !Number.isFinite(a)) return i;
	let o = Math.round(a / r) * r, s = Math.min(n, Math.max(t, o));
	return r < 1 ? Math.round(s * 100) / 100 : s;
}
function Uh(e, t) {
	if (e?.padY != null && e.padY !== "") return Hh(e.padY, Dh, Rh.md.padY);
	let n = Rh[e?.size] ?? Rh.md;
	return Math.round(n.padY * (Vh(t) ? Bh : 1));
}
function Wh(e) {
	if (e?.textSize != null && e.textSize !== "") return Hh(e.textSize, Oh, Rh.md.textSize);
	let t = Rh[e?.size] ?? Rh.md;
	return Math.round(t.textSize);
}
function Gh(e) {
	return e?.padY != null && e.padY !== "" || e?.textSize != null && e.textSize !== "" ? null : zh.includes(e?.size) ? e.size : "md";
}
//#endregion
//#region ../template/assets/engine/0.7.4/nav-model.js
var Kh = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/api\/photo\?[^\s"'<>\\]{1,2048}|\/(?!\/)[\w%./-]*)$/;
function qh(e) {
	return typeof e == "string" && Kh.test(e);
}
var Jh = /^(?:https?:\/\/|mailto:|tel:)[^\s]+$/i;
function Yh(e) {
	return typeof e == "string" && Jh.test(e.trim());
}
var Xh = /^(?:\/(?![/\\])[^\s\\]*|#[^\s]*)$/;
function Zh(e) {
	return Yh(e) || typeof e == "string" && Xh.test(e.trim());
}
var Qh = [
	"launcher",
	"cart",
	"theme"
];
function $h(e = {}) {
	let t = Array.isArray(e.tools?.order) ? e.tools.order : [], n = [];
	for (let e of t) Qh.includes(e) && !n.includes(e) && n.push(e);
	for (let e of Qh) n.includes(e) || n.push(e);
	return n;
}
//#endregion
//#region src/panels/NavPanel.svelte
var eg = /* @__PURE__ */ z("<input/> <span class=\"toolbar-row\"><!> <input type=\"number\" class=\"tb-num\" min=\"8\" max=\"96\" placeholder=\"px\"/> <button><b> </b></button> <button><i> </i></button></span>", 1), tg = /* @__PURE__ */ z("<img alt=\"\"/>"), ng = /* @__PURE__ */ z("<span class=\"logo-file\"> </span>"), rg = /* @__PURE__ */ z("<div class=\"logo-pick\"><span class=\"logo-thumb\"><!></span> <span class=\"logo-pick-col\"><label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <!></span></div> <div class=\"ctl-triple\"><div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\" min=\"12\" max=\"128\"/></div> <div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\"/></div> <div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\" min=\"0\" max=\"64\"/></div></div>", 1), ig = /* @__PURE__ */ z("<button type=\"button\"><!><span> </span></button>"), ag = /* @__PURE__ */ z("<span class=\"toolbar-row\"><span class=\"mini-label tb-grow\"> </span> <input type=\"number\" class=\"tb-num\" placeholder=\"1100\"/></span>"), og = /* @__PURE__ */ z("<!> <!> <span class=\"toolbar-row\"><span class=\"mini-label tb-grow\"> </span> <input type=\"number\" class=\"tb-num\"/></span>", 1), sg = /* @__PURE__ */ z("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), cg = /* @__PURE__ */ z("<!> <span class=\"toolbar-row\"><span class=\"mini-label tb-grow\"> </span> <input type=\"number\" class=\"tb-num\"/></span>", 1), lg = /* @__PURE__ */ z("<button> </button>"), ug = /* @__PURE__ */ z("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\"/> <input type=\"number\" class=\"tb-num\"/></div>"), dg = /* @__PURE__ */ z("<div class=\"ctl-pair\"><div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\"/></div> <div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\"/></div></div>"), fg = /* @__PURE__ */ z("<span class=\"toolbar-row ctl-end\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\" min=\"1\" max=\"8\"/> <span class=\"mini-label\"> </span> <!></span>"), pg = /* @__PURE__ */ z("<div class=\"ctl-field\"><span class=\"mini-label\"> </span> <div class=\"tile-grid cols-5\" role=\"group\"></div></div> <!>", 1), mg = /* @__PURE__ */ z("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), hg = /* @__PURE__ */ z("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"30\" max=\"80\" step=\"5\"/> <span class=\"gridmenu-value\"> </span></div> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"0\" max=\"400\" step=\"10\"/> <span class=\"gridmenu-value\"> </span></div> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"0\" max=\"1200\" step=\"20\"/> <span class=\"gridmenu-value\"> </span></div> <!>", 1), gg = /* @__PURE__ */ z("<!> <!>", 1), _g = /* @__PURE__ */ z("<div class=\"mini-card\"><span class=\"mini-label\"> </span> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label></div>"), vg = /* @__PURE__ */ z("<div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\"/></div>"), yg = /* @__PURE__ */ z("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label>"), bg = /* @__PURE__ */ z("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <!> <!> <!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <!> <input type=\"range\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label> <!></label>", 1), xg = /* @__PURE__ */ z("<button type=\"button\"><span> </span><span> </span></button>"), Sg = /* @__PURE__ */ z("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\"/> <span class=\"gridmenu-value\"> </span></div>"), Cg = /* @__PURE__ */ z("<div class=\"swatch-cell\"><!> <span class=\"mini-label\"> </span></div>"), wg = /* @__PURE__ */ z("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <input type=\"text\" class=\"field-filled\" placeholder=\"https://\"/></label>"), Tg = /* @__PURE__ */ z("<button class=\"ghost\"> </button>"), Eg = /* @__PURE__ */ z("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <input type=\"text\" class=\"field-filled\"/></label> <label> <!></label> <!> <!> <!> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <label> <!></label> <label> <!></label>", 1), Dg = /* @__PURE__ */ z("<span class=\"tool-move\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span>"), Og = /* @__PURE__ */ z("<div class=\"mini-card\"><span class=\"tool-head\"><span class=\"mini-label\"> </span><!></span> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label></div>"), kg = /* @__PURE__ */ z("<div class=\"mini-card\"><span class=\"tool-head\"><span class=\"mini-label\"> </span><!></span> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div>"), Ag = /* @__PURE__ */ z("<label class=\"field-stack\"><span class=\"mini-label\"> </span> <input type=\"text\" class=\"field-filled\"/></label>"), jg = /* @__PURE__ */ z("<span class=\"lrow-warn\"></span>"), Mg = /* @__PURE__ */ z("<span class=\"lrow-tile-mark\"><!></span> <span class=\"lrow-tile-name\"> </span>", 1), Ng = /* @__PURE__ */ z("<span class=\"bad-target-note\"> </span>"), Pg = /* @__PURE__ */ z("<div class=\"lrow-body\"><!> <div class=\"lrow-fields\"><input class=\"field-filled\"/> <input/> <!> <span class=\"lrow-actions\"><!> <button class=\"linkish danger\"> </button></span></div></div>"), Fg = /* @__PURE__ */ z("<div><div class=\"lrow-head\" role=\"button\" tabindex=\"0\"><span class=\"lrow-mark\" aria-hidden=\"true\"><!></span> <span class=\"lrow-name\"> </span> <!> <span class=\"row-tools\" role=\"none\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span> <span class=\"lrow-chev\" aria-hidden=\"true\"></span></div> <!></div>"), Ig = /* @__PURE__ */ z("<div class=\"ctl-field\"><span class=\"mini-label\"> </span> <div class=\"tile-grid cols-3\" role=\"group\"></div></div> <!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" min=\"1\" max=\"24\" step=\"1\"/> <span class=\"gridmenu-value\"> </span></div> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <div class=\"mini-card\"><span class=\"mini-label\"> </span> <span class=\"lbtn-pick\"><!> <span class=\"lbtn-name\"><!></span></span></div> <!> <button class=\"ghost action\"> </button>", 1), Lg = /* @__PURE__ */ z("<details class=\"group sub-fold\"><summary><span class=\"tool-head\"> <!></span></summary> <div class=\"group-items\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div></details>"), Rg = /* @__PURE__ */ z("<label> <!></label>"), zg = /* @__PURE__ */ z("<div aria-hidden=\"true\"><span class=\"nav-grip\"></span> <div class=\"nav-item-main\"><span class=\"nav-item-name ghost-name\"> </span> <span class=\"ghost-target\"> </span></div></div>"), Bg = /* @__PURE__ */ z("<input class=\"nav-item-href\"/>"), Vg = /* @__PURE__ */ z("<span class=\"nav-item-sub\"></span>"), Hg = /* @__PURE__ */ z("<!> <div><span class=\"nav-grip\" draggable=\"true\"></span> <div class=\"nav-item-main\"><input class=\"nav-item-name\"/> <div class=\"nav-item-target\"><!> <!></div></div> <span class=\"nav-actions\"><button class=\"ghost nav-act\"></button> <button class=\"ghost nav-act\"></button> <button class=\"ghost nav-act\"></button></span> <button class=\"ghost row-tool nav-more\"></button></div> <!>", 1), Ug = /* @__PURE__ */ z("<!> <div><span class=\"nav-grip\" draggable=\"true\"></span> <div class=\"nav-item-main\"><input class=\"nav-item-name\"/> <div class=\"nav-item-target\"><!> <!></div></div> <!> <span class=\"nav-actions\"><button class=\"ghost nav-act\"></button> <button class=\"ghost nav-act\"></button> <button class=\"ghost nav-act\"></button> <button class=\"ghost nav-act\"></button></span> <button class=\"ghost row-tool nav-more\"></button></div> <!> <!> <!>", 1), Wg = /* @__PURE__ */ z("<div class=\"panel-body\"><details class=\"group\"><summary> </summary> <div class=\"group-items\"><!> <!> <!> <!></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><div class=\"ctl-field\"><span class=\"mini-label\"> </span> <div class=\"tile-grid cols-3\" role=\"group\"></div></div> <!> <!> <!> <!> <!></div></details> <hr class=\"gridmenu-divider\"/> <details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><div class=\"seg cw-seg\"></div> <details class=\"sub-inset\"><summary> </summary> <div class=\"sub-inset-body\"><!> <div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\"/> <input type=\"number\" class=\"tb-num\"/></div> <!></div></details></div></details> <hr class=\"gridmenu-divider\"/> <details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><!> <!></div></details> <hr class=\"gridmenu-divider\"/> <details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><!></div></details> <hr class=\"gridmenu-divider\"/> <details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><div class=\"ctl-pair\"><!> <div class=\"ctl-field\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\"/></div></div> <div class=\"ctl-pair\"><label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label></div> <div class=\"ctl-pair\"><label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <!></div> <div class=\"ctl-pair\"><label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label></div> <!> <div class=\"ctl-pair\"><label class=\"field-stack\"><span class=\"mini-label\"> </span> <!></label> <!></div> <!> <!></div></details> <hr class=\"gridmenu-divider\"/> <details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><div class=\"ctl-field\"><span class=\"mini-label\"> </span> <div class=\"tile-grid cols-5\" role=\"group\"></div></div> <!> <div class=\"swatch-row\"><!> <div class=\"swatch-cell\"><!> <span class=\"mini-label\"> </span></div> <div class=\"swatch-cell\"><!> <span class=\"mini-label\"> </span></div></div> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label></div></details> <hr class=\"gridmenu-divider\"/> <details class=\"group frame-group sub-fold\"><summary> </summary> <div class=\"group-items\"><!></div></details></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><!>  <!></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><div class=\"ctl-field\"><span class=\"mini-label\"> </span> <div role=\"group\"></div></div> <!> <!> <label> <input type=\"number\" min=\"1\" max=\"4\"/></label></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><div class=\"nav-list\" role=\"list\"></div> <button class=\"ghost action\"> </button> <span class=\"toolbar-row\"><input class=\"tb-grow\"/> <button class=\"ghost action\"> </button></span></div></details></div>");
function Gg(e, t) {
	et(t, !0);
	let n = Qe("urd-editor"), r = /* @__PURE__ */ k(() => n.siteDraft), { addPage: i, bridge: a, compressOrTrim: o, navBgCtx: s, setStatus: c, siteMutate: l, themeSwatches: u } = n, d = (e) => `<svg width="40" height="26" viewBox="0 0 40 26" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${e}</svg>`, p = {
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
	}, y = /* @__PURE__ */ A("");
	function b() {
		L(y).trim() && (n.newPageTitle = L(y), n.newPageTemplate = null, i() !== !1 && j(y, ""));
	}
	function x(e) {
		l("edit:nav-logo", () => {
			L(r).nav.logo = {
				type: "text",
				value: "",
				...L(r).nav.logo,
				...e
			};
		});
	}
	function S(e) {
		l("nav", () => {
			L(r).nav.logo ??= {
				type: "text",
				value: L(r).site.title
			};
			let t = L(r).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = L(r).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = L(r).site.title), delete t.image), t.type = e;
		});
	}
	async function C(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await o(t);
			l("nav", () => {
				let t = L(r).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			c(J("status.imageReadErrorSvg"), "error");
		}
	}
	function w(e) {
		l("nav", () => {
			L(r).nav.layout = e;
		});
	}
	let T = (e) => e !== "theme" || !!L(r).theme?.alt?.tokens, ee = /* @__PURE__ */ k(() => $h(L(r)?.nav?.style ?? {}).filter(T));
	function te(e, t) {
		let n = $h(L(r).nav.style ?? {}), i = n.indexOf(e), a = i + t;
		for (; a >= 0 && a < n.length && !T(n[a]);) a += t;
		i < 0 || a < 0 || a >= n.length || ([n[i], n[a]] = [n[a], n[i]], ne("order", n));
	}
	function ne(e, t) {
		l(`edit:nav-tools-${e}`, () => {
			L(r).nav.style ??= {};
			let n = { ...L(r).nav.style.tools ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? L(r).nav.style.tools = n : delete L(r).nav.style.tools;
		});
	}
	function re(e, t) {
		l(`edit:nav-style-${e}`, () => {
			L(r).nav.style ??= {}, t === void 0 ? delete L(r).nav.style[e] : L(r).nav.style[e] = t;
		});
	}
	let ie = /* @__PURE__ */ k(() => L(r)?.nav?.variant === "side-left" || L(r)?.nav?.variant === "side-right"), ae = /* @__PURE__ */ k(() => [
		"floating",
		"floating-square",
		"floating-tab"
	].includes(L(r)?.nav?.variant)), oe = /* @__PURE__ */ k(() => Gh(L(r)?.nav?.style)), se = /* @__PURE__ */ k(() => Uh(L(r)?.nav?.style, L(r)?.nav?.variant)), ce = /* @__PURE__ */ k(() => Wh(L(r)?.nav?.style));
	function le(e) {
		l("nav", () => {
			L(r).nav.style ??= {}, e === "md" ? delete L(r).nav.style.size : L(r).nav.style.size = e, delete L(r).nav.style.padY, delete L(r).nav.style.textSize;
		});
	}
	function ue(e, t, n) {
		let i = e.target.value;
		re(t, i === "" ? void 0 : Hh(i, n, void 0)), e.target.value = L(r).nav.style?.[t] ?? "";
	}
	function de(e, t) {
		l(`edit:nav-mobile-${e}`, () => {
			L(r).nav.style ??= {};
			let n = { ...L(r).nav.style.mobile ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? L(r).nav.style.mobile = n : delete L(r).nav.style.mobile;
		});
	}
	let fe = (e) => {
		let t = L(r)?.nav?.style?.mobile?.[e];
		return t === void 0 ? "" : t ? "on" : "off";
	}, pe = (e, t) => de(e, t === "" ? void 0 : t === "on"), me = (e) => de("border", e ? {
		...L(r).nav.style?.mobile?.border ?? {},
		side: e
	} : void 0);
	function he(e, t) {
		l(`edit:nav-announce-${e}`, () => {
			let n = { ...L(r).nav.announcement ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? L(r).nav.announcement = n : delete L(r).nav.announcement;
		});
	}
	let ge = "<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"currentColor\" aria-hidden=\"true\">" + [
		6,
		12,
		18
	].flatMap((e) => [
		6,
		12,
		18
	].map((t) => `<circle cx="${t}" cy="${e}" r="1.6"/>`)).join("") + "</svg>", _e = /* @__PURE__ */ A(null);
	function ve() {
		let e = L(r).nav?.launcher;
		return [e?.image, ...(e?.links ?? []).map((e) => e.image)].filter(Boolean);
	}
	function ye(e, t) {
		l("nav", () => {
			L(r).nav.launcher ??= { links: [] };
			let n = e === null ? L(r).nav.launcher : L(r).nav.launcher.links[e];
			t.image ? n.image = t.image : delete n.image, t.icon ? n.icon = t.icon : delete n.icon;
		});
	}
	function be(e, t) {
		l(`edit:nav-launcher-${e}`, () => {
			L(r).nav.launcher ??= { links: [] }, t === void 0 ? delete L(r).nav.launcher[e] : L(r).nav.launcher[e] = t;
		});
	}
	function xe() {
		l("nav", () => {
			L(r).nav.launcher ??= { links: [] }, L(r).nav.launcher.links ??= [], L(r).nav.launcher.links.push({
				label: J("seed.link"),
				href: "",
				icon: "globe"
			});
		});
	}
	function Se(e) {
		l("nav", () => {
			L(r).nav.launcher.links.splice(e, 1);
		});
	}
	function Ce(e, t) {
		l("nav", () => {
			let n = L(r).nav.launcher.links, i = e + t;
			i < 0 || i >= n.length || ([n[e], n[i]] = [n[i], n[e]]);
		});
	}
	function we(e, t, n) {
		l(`edit:nav-launcher-${t}-${e}`, () => {
			L(r).nav.launcher.links[e][t] = n;
		});
	}
	async function Te(e, t) {
		if (e) try {
			let n = await o(e);
			l("nav", () => {
				L(r).nav.launcher ??= { links: [] }, t === null ? L(r).nav.launcher.image = n.dataUrl : L(r).nav.launcher.links[t].image = n.dataUrl;
			});
		} catch {
			c(J("status.imageReadErrorSvg"), "error");
		}
	}
	function Ee(e, t) {
		l(`edit:nav-sheet-${e}`, () => {
			L(r).nav.style ??= {};
			let n = { ...L(r).nav.style.sheet ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? L(r).nav.style.sheet = n : delete L(r).nav.style.sheet;
		});
	}
	function De(e, t, n) {
		let r = e.target.value;
		re(t, r === "" ? void 0 : Hh(r, n, void 0)), e.target.value = L(t === "padY" ? se : ce);
	}
	function Oe(e, t, n) {
		let i = e.target.value;
		de(t, i === "" ? void 0 : Hh(i, n, void 0)), e.target.value = L(r).nav.style?.mobile?.[t] ?? "";
	}
	function Ae(e) {
		let t = Hh(e / 100, Mh, .5);
		re("shrinkTo", t === .5 ? void 0 : t);
	}
	function je(e) {
		let t = Hh(e, Nh, 80);
		re("shrinkAt", t === 80 ? void 0 : t);
	}
	function Me(e) {
		let t = Hh(e, Ph, 220);
		re("shrinkMs", t === 220 ? void 0 : t);
	}
	let Ne = {
		underline: [J("hoverColor.underline.label"), J("hoverColor.underline.title")],
		pill: [J("hoverColor.pill.label"), J("hoverColor.pill.title")],
		lift: [J("hoverColor.lift.label"), J("hoverColor.lift.title")]
	}, Pe = /* @__PURE__ */ k(() => Ne[L(r)?.nav?.style?.hover] ?? null), D = /* @__PURE__ */ k(() => [
		["grid", J("opt.launcherView.grid")],
		["list", J("opt.launcherView.list")],
		["cover", J("opt.launcherView.cover")]
	]), Fe = /* @__PURE__ */ k(() => L(ie) ? [
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
	function Ie(e) {
		(L(r).nav.variant ?? "bar") !== e && l("nav", () => {
			e === "bar" ? delete L(r).nav.variant : L(r).nav.variant = e, L(r).nav.style && delete L(r).nav.style.radius;
		});
	}
	function O(e) {
		l("nav", () => {
			L(r).nav.style ??= {}, e ? L(r).nav.style.glow = !0 : delete L(r).nav.style.glow;
		});
	}
	function Le(e) {
		l("nav", () => {
			L(r).nav.style ??= {}, e ? delete L(r).nav.style.topGap : L(r).nav.style.topGap = !1;
		});
	}
	function Re(e) {
		l("nav", () => {
			L(r).nav.style ??= {}, e === "standard" ? delete L(r).nav.style.hover : L(r).nav.style.hover = e;
		});
	}
	function ze(e, t) {
		l(`edit:nav-label-${e}`, () => {
			L(r).nav.items[e].label = t;
		});
	}
	function Be(e, t) {
		l("nav", () => {
			let n = L(r).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function Ve(e, t) {
		l(`edit:nav-href-${e}`, () => {
			L(r).nav.items[e].href = t;
		});
	}
	function He(e, t) {
		let n = e + t, i = L(r).nav.items;
		n < 0 || n >= i.length || l("nav", () => {
			[i[e], i[n]] = [i[n], i[e]];
		});
	}
	function Ue(e) {
		l("nav", () => {
			L(r).nav.items.splice(e, 1);
		});
	}
	let We = /* @__PURE__ */ A(""), Ge = /* @__PURE__ */ A(""), Ke = /* @__PURE__ */ A(null);
	function qe(e) {
		let [t, n] = e.split(".").map(Number), i = L(r).nav.items;
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
	function Je(e, t, n, r) {
		if (!L(Ge) || L(Ge) === t) return null;
		let i = e.getBoundingClientRect(), a = (r - i.top) / i.height, o = n - i.left, s = qe(L(Ge)), c = qe(t), l = s.list[s.index], u;
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
		}, Ye(u, l, s);
	}
	function Ye(e, t, n) {
		let i = qe(e.key);
		if (i.parent) {
			if (i.parent === t) return null;
			t.children?.length && (e = {
				key: e.key.split(".")[0],
				pos: "after"
			}, i = qe(e.key));
		}
		let a = i.list[i.index];
		if (e.pos === "into") {
			let n = a.children ?? [];
			return n.length && n[n.length - 1] === t ? null : e;
		}
		let o = i.parent ? i.parent.children : L(r).nav.items, s = o.filter((e) => e !== t).indexOf(a) + +(e.pos === "after");
		return o === n.list && s === n.index ? null : e;
	}
	function Xe() {
		if (!L(Ge)) return {
			label: "",
			target: ""
		};
		let e = qe(L(Ge)), t = e.list[e.index], n = t.page ? L(r).pages.find((e) => e.id === t.page) : null;
		return {
			label: t.label,
			target: n ? n.title : t.href ?? J("opt.noLink")
		};
	}
	function Ze(e) {
		L(Ke) && e?.dataTransfer?.dropEffect !== "none" && rt(L(Ke).key), j(Ge, ""), j(Ke, null);
	}
	On(() => {
		if (!L(Ge)) return;
		let e = (e) => e.preventDefault();
		return window.addEventListener("dragover", e), window.addEventListener("drop", e), () => {
			window.removeEventListener("dragover", e), window.removeEventListener("drop", e);
		};
	});
	let $e = "application/x-urd-nav-row";
	function nt(e) {
		if (!L(Ge)) return;
		let t = [...e.currentTarget.querySelectorAll(".nav-item:not(.ghost)")];
		if (!t.length) return;
		let n = t.find((t) => {
			let n = t.getBoundingClientRect();
			return e.clientY >= n.top && e.clientY <= n.bottom;
		}), r = null;
		if (n) r = Je(n, n.dataset.key, e.clientX, e.clientY);
		else {
			let n = qe(L(Ge)), i = n.list[n.index], a = t.find((t) => {
				let n = t.getBoundingClientRect();
				return n.top + n.height / 2 > e.clientY;
			});
			if (a) r = a.dataset.key === L(Ge) ? null : Ye({
				key: a.dataset.key,
				pos: "before"
			}, i, n);
			else {
				let e = [...t].reverse().find((e) => !e.classList.contains("child"));
				r = e.dataset.key === L(Ge) ? null : Ye({
					key: e.dataset.key,
					pos: "after"
				}, i, n);
			}
		}
		if (!r) {
			j(Ke, null);
			return;
		}
		e.preventDefault(), (L(Ke)?.key !== r.key || L(Ke)?.pos !== r.pos) && j(Ke, r, !0);
	}
	function rt(e) {
		let t = L(Ge), n = L(Ke);
		if (j(Ge, ""), j(Ke, null), t && n && n.key === e && t !== e) {
			{
				let r = qe(t), i = qe(e), a = r.list[r.index];
				if (i.parent && (i.parent === a || a.children?.length) || n.pos === "into" && a.children?.length) return;
			}
			l("nav", () => {
				let i = L(r).nav.items, a = qe(t), o = qe(e), s = a.list[a.index], c = o.list[o.index];
				if (s !== c) {
					if (a.list.splice(a.index, 1), a.parent && a.parent.children.length === 0 && (delete a.parent.children, !a.parent.page && !a.parent.href && (a.parent.page = L(r).pages[0].id)), n.pos === "into") c.children ??= [], c.children.push(s);
					else {
						let e = o.parent ? o.parent.children : i, t = e.indexOf(c) + +(n.pos === "after");
						e.splice(t, 0, s);
					}
					!s.page && s.href == null && !s.children?.length && (s.page = L(r).pages[0].id);
				}
			}), j(We, "");
		}
	}
	let it = "<svg width=\"10\" height=\"16\" viewBox=\"0 0 10 16\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"3\" cy=\"3\" r=\"1.3\"/><circle cx=\"7\" cy=\"3\" r=\"1.3\"/><circle cx=\"3\" cy=\"8\" r=\"1.3\"/><circle cx=\"7\" cy=\"8\" r=\"1.3\"/><circle cx=\"3\" cy=\"13\" r=\"1.3\"/><circle cx=\"7\" cy=\"13\" r=\"1.3\"/></svg>";
	function at() {
		l("nav", () => {
			L(r).nav.items.push({
				label: J("seed.link"),
				page: L(r).pages[0].id
			});
		});
	}
	function ot(e) {
		l("nav", () => {
			let t = L(r).nav.items[e];
			t.children ??= [], t.children.push({
				label: J("seed.link"),
				page: L(r).pages[0].id
			});
		});
	}
	function st(e, t, n) {
		l(`edit:nav-child-label-${e}-${t}`, () => {
			L(r).nav.items[e].children[t].label = n;
		});
	}
	function ct(e, t, n) {
		l("nav", () => {
			let i = L(r).nav.items[e].children[t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function lt(e, t, n) {
		l(`edit:nav-child-href-${e}-${t}`, () => {
			L(r).nav.items[e].children[t].href = n;
		});
	}
	function ut(e, t, n) {
		let i = t + n, a = L(r).nav.items[e].children;
		i < 0 || i >= a.length || l("nav", () => {
			[a[t], a[i]] = [a[i], a[t]];
		});
	}
	function dt(e, t) {
		l("nav", () => {
			let n = L(r).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = L(r).pages[0].id));
		});
	}
	var ft = Wg(), pt = M(ft), mt = M(pt), ht = P(mt, !0), gt = F(mt, 2), _t = M(gt);
	{
		let e = /* @__PURE__ */ k(() => J("common.type")), t = /* @__PURE__ */ k(() => L(r).nav.logo?.type ?? "text"), n = /* @__PURE__ */ k(() => [
			["text", J("blocks.text")],
			["image", J("blocks.image")],
			["both", J("opt.logo.both")]
		]);
		eu(_t, {
			get label() {
				return L(e);
			},
			get value() {
				return L(t);
			},
			get options() {
				return L(n);
			},
			onchange: (e) => S(e)
		});
	}
	var vt = F(_t, 2), yt = (e) => {
		var t = eg(), n = N(t);
		G(n);
		var i = F(n, 2), a = M(i);
		{
			let e = /* @__PURE__ */ k(() => J("tip.nav.logoFont")), t = /* @__PURE__ */ k(() => L(r).nav.logo?.font ?? ""), n = /* @__PURE__ */ k(() => [["", J("common.inherit")], ...Hd.map(([e, t]) => [t, J(e)])]);
			Y(a, {
				get title() {
					return L(e);
				},
				get value() {
					return L(t);
				},
				get options() {
					return L(n);
				},
				onchange: (e) => x({ font: e || void 0 })
			});
		}
		var o = F(a, 2);
		G(o);
		var s = F(o, 2);
		let c;
		var l = P(M(s), !0);
		E(s);
		var u = F(s, 2);
		let d;
		var f = P(M(u), !0);
		E(u), E(i), I((e, t, i, a, p, m, h) => {
			K(n, L(r).nav.logo?.value ?? ""), q(n, "placeholder", e), q(o, "title", t), K(o, L(r).nav.logo?.textSize ?? ""), c = W(s, 1, "tbtn", null, c, { active: L(r).nav.logo?.bold !== !1 }), q(s, "title", i), V(l, a), d = W(u, 1, "tbtn", null, d, { active: p }), q(u, "title", m), V(f, h);
		}, [
			() => J("ph.nav.logoName"),
			() => J("tip.nav.textSize"),
			() => J("format.bold"),
			() => J("format.boldLetter"),
			() => !!L(r).nav.logo?.italic,
			() => J("format.italic"),
			() => J("format.italicLetter")
		]), R("input", n, (e) => x({ value: e.target.value })), R("change", o, (e) => x({ textSize: e.target.value ? Number(e.target.value) : void 0 })), R("click", s, () => x({ bold: L(r).nav.logo?.bold === !1 })), R("click", u, () => x({ italic: !L(r).nav.logo?.italic })), B(e, t);
	};
	H(vt, (e) => {
		(L(r).nav.logo?.type ?? "text") !== "image" && e(yt);
	});
	var bt = F(vt, 2), xt = (e) => {
		let t = /* @__PURE__ */ k(() => L(r).nav.logo?.type === "image" ? L(r).nav.logo?.value : L(r).nav.logo?.image);
		var n = rg(), i = N(n), a = M(i), o = M(a), s = (e) => {
			var n = tg();
			I(() => q(n, "src", L(t))), B(e, n);
		};
		H(o, (e) => {
			L(t) && e(s);
		}), E(a);
		var c = F(a, 2), l = M(c), u = M(l), d = F(u);
		E(l);
		var f = F(l, 2), p = (e) => {
			var n = ng(), r = P(n, !0);
			I((e) => V(r, e), [() => L(t).split("/").pop()]), B(e, n);
		};
		H(f, (e) => {
			L(t) && e(p);
		}), E(c), E(i);
		var m = F(i, 2), h = M(m), g = M(h), _ = P(g, !0), v = F(g, 2);
		G(v), E(h);
		var y = F(h, 2), b = M(y), S = P(b, !0), w = F(b, 2);
		G(w), E(y);
		var T = F(y, 2), ee = M(T), te = P(ee, !0), ne = F(ee, 2);
		G(ne), E(T), E(m), I((e, t, n, i, a, o, s, c, d) => {
			q(l, "title", e), V(u, `${t ?? ""} `), q(h, "title", n), V(_, i), K(v, L(r).nav.logo?.size ?? 32), q(y, "title", a), V(S, o), q(w, "min", Lh.min), q(w, "max", Lh.max), q(w, "placeholder", s), K(w, L(r).nav.logo?.mobileSize ?? ""), q(T, "title", c), V(te, d), K(ne, L(r).nav.logo?.radius ?? 0);
		}, [
			() => J("tip.webpAuto"),
			() => L(t) ? J("ui.changeImage") : J("ui.chooseImage"),
			() => J("tip.nav.logoHeight"),
			() => J("lbl.height"),
			() => J("tip.nav.logoHeightMobile"),
			() => J("lbl.onMobile"),
			() => J("lbl.navSameAsDesktop"),
			() => J("tip.nav.logoRadius"),
			() => J("lbl.rounding")
		]), R("change", d, C), R("change", v, (e) => x({ size: Number(e.target.value) })), R("change", w, (e) => {
			let t = e.target.value;
			x({ mobileSize: t === "" ? void 0 : Hh(t, Lh, void 0) }), e.target.value = L(r).nav.logo?.mobileSize ?? "";
		}), R("change", ne, (e) => x({ radius: Number(e.target.value) })), B(e, n);
	};
	H(bt, (e) => {
		(L(r).nav.logo?.type ?? "text") !== "text" && e(xt);
	});
	var St = F(bt, 2), Ct = (e) => {
		{
			let t = /* @__PURE__ */ k(() => J("lbl.order")), n = /* @__PURE__ */ k(() => L(r).nav.logo?.order ?? "image-first"), i = /* @__PURE__ */ k(() => [["image-first", J("opt.logo.imageFirst")], ["text-first", J("opt.logo.textFirst")]]);
			eu(e, {
				get label() {
					return L(t);
				},
				get value() {
					return L(n);
				},
				get options() {
					return L(i);
				},
				onchange: (e) => x({ order: e })
			});
		}
	};
	H(St, (e) => {
		L(r).nav.logo?.type === "both" && e(Ct);
	}), E(gt), E(pt);
	var wt = F(pt, 2), Tt = M(wt), Et = P(Tt, !0), Dt = F(Tt, 2), Ot = M(Dt), kt = M(Ot), At = P(kt, !0), jt = F(kt, 2), Mt = M(jt), Nt = M(Mt), Pt = P(Nt, !0), Ft = F(Nt, 2);
	ri(Ft, 21, () => [
		["bar", J("opt.navVariant.bar")],
		["floating", J("opt.navVariant.floating")],
		["floating-square", J("opt.navVariant.floatingSquare")],
		["floating-tab", J("opt.navVariant.floatingTab")],
		["side-left", J("opt.navVariant.sideLeft")],
		["side-right", J("opt.navVariant.sideRight")]
	], ([e, t]) => e, (e, t) => {
		var n = /* @__PURE__ */ k(() => h(L(t), 2));
		let i = () => L(n)[0], a = () => L(n)[1];
		var o = ig();
		let s;
		var c = M(o);
		U(c, () => p[i()]);
		var l = P(F(c), !0);
		E(o), I(() => {
			s = W(o, 1, "tile", null, s, { on: (L(r).nav.variant ?? "bar") === i() }), q(o, "aria-pressed", (L(r).nav.variant ?? "bar") === i()), V(l, a());
		}), R("click", o, () => Ie(i())), B(e, o);
	}), E(Ft), E(Mt);
	var It = F(Mt, 2), Lt = (e) => {
		var t = og(), n = N(t);
		{
			let e = /* @__PURE__ */ k(() => J("lbl.navPillWidth")), t = /* @__PURE__ */ k(() => J("tip.nav.pillWidth")), i = /* @__PURE__ */ k(() => L(r).nav.style?.pillWidth === "content" ? "content" : "custom"), a = /* @__PURE__ */ k(() => [["content", J("opt.pillWidth.content")], ["custom", J("opt.pillWidth.custom")]]);
			eu(n, {
				get label() {
					return L(e);
				},
				get title() {
					return L(t);
				},
				get value() {
					return L(i);
				},
				get options() {
					return L(a);
				},
				onchange: (e) => re("pillWidth", e === "content" ? "content" : void 0)
			});
		}
		var i = F(n, 2), a = (e) => {
			var t = ag(), n = M(t), i = P(n, !0), a = F(n, 2);
			G(a), E(t), I((e, n) => {
				q(t, "title", e), V(i, n), q(a, "min", jh.min), q(a, "max", jh.max), q(a, "step", jh.step), K(a, typeof L(r).nav.style?.pillWidth == "number" ? L(r).nav.style.pillWidth : "");
			}, [() => J("tip.nav.pillWidthPx"), () => J("lbl.navPillWidthPx")]), R("change", a, (e) => ue(e, "pillWidth", jh)), B(e, t);
		};
		H(i, (e) => {
			L(r).nav.style?.pillWidth !== "content" && e(a);
		});
		var o = F(i, 2), s = M(o), c = P(s, !0), l = F(s, 2);
		G(l), E(o), I((e, t) => {
			q(o, "title", e), V(c, t), q(l, "min", Fh.min), q(l, "max", Fh.max), q(l, "step", Fh.step), q(l, "placeholder", L(r).nav.variant === "floating-square" ? "0" : ""), K(l, typeof L(r).nav.style?.radius == "number" ? L(r).nav.style.radius : "");
		}, [() => J("tip.nav.radius"), () => J("lbl.navRadius")]), R("change", l, (e) => ue(e, "radius", Fh)), B(e, t);
	};
	H(It, (e) => {
		L(ae) && e(Lt);
	});
	var Rt = F(It, 2), zt = (e) => {
		{
			let t = /* @__PURE__ */ k(() => J("lbl.navPlacement")), n = /* @__PURE__ */ k(() => L(r).nav.style?.sidePlacement ?? "top"), i = /* @__PURE__ */ k(() => [
				["top", J("opt.place.top")],
				["middle", J("opt.place.middle")],
				["bottom", J("opt.place.bottom")]
			]);
			eu(e, {
				get label() {
					return L(t);
				},
				get value() {
					return L(n);
				},
				get options() {
					return L(i);
				},
				onchange: (e) => re("sidePlacement", e === "top" ? void 0 : e)
			});
		}
	}, Bt = (e) => {
		{
			let t = /* @__PURE__ */ k(() => J("lbl.navPlacement")), n = /* @__PURE__ */ k(() => J("opt.layout.leftAfterLogo")), i = /* @__PURE__ */ k(() => L(r).nav.layout ?? "right"), a = /* @__PURE__ */ k(() => [
				["left", J("common.left")],
				["center", J("common.center")],
				["right", J("common.right")]
			]);
			eu(e, {
				get label() {
					return L(t);
				},
				get title() {
					return L(n);
				},
				get value() {
					return L(i);
				},
				get options() {
					return L(a);
				},
				onchange: (e) => w(e)
			});
		}
	};
	H(Rt, (e) => {
		L(ie) ? e(zt) : e(Bt, -1);
	});
	var Vt = F(Rt, 2), Ht = (e) => {
		var t = sg(), n = N(t), i = M(n);
		G(i);
		var a = F(i);
		E(n);
		var o = F(n, 2), s = M(o);
		G(s);
		var c = F(s);
		E(o), I((e, t, l, u) => {
			q(n, "title", e), Ni(i, L(r).nav.style?.glow === !0), V(a, ` ${t ?? ""}`), q(o, "title", l), Ni(s, L(r).nav.style?.topGap !== !1), V(c, ` ${u ?? ""}`);
		}, [
			() => J("tip.nav.glow"),
			() => J("lbl.navGlow"),
			() => J("tip.nav.topGap"),
			() => J("lbl.navTopGap")
		]), R("change", i, (e) => O(e.target.checked)), R("change", s, (e) => Le(e.target.checked)), B(e, t);
	};
	H(Vt, (e) => {
		L(ae) && e(Ht);
	});
	var Ut = F(Vt, 2), Wt = (e) => {
		var t = sg(), n = N(t), i = M(n);
		G(i);
		var a = F(i);
		E(n);
		var o = F(n, 2), s = M(o);
		G(s);
		var c = F(s);
		E(o), I((e, t, l, u) => {
			q(n, "title", e), Ni(i, L(r).nav.overlay === !0), V(a, ` ${t ?? ""}`), q(o, "title", l), Ni(s, L(r).nav.style?.inset !== !1), V(c, ` ${u ?? ""}`);
		}, [
			() => J("tip.nav.overlay"),
			() => J("lbl.navOverlay"),
			() => J("tip.nav.inset"),
			() => J("lbl.navInset")
		]), R("change", i, (e) => l("nav", () => {
			e.target.checked ? L(r).nav.overlay = !0 : delete L(r).nav.overlay;
		})), R("change", s, (e) => re("inset", e.target.checked ? void 0 : !1)), B(e, t);
	};
	H(Ut, (e) => {
		!L(ae) && !L(ie) && e(Wt);
	});
	var Gt = F(Ut, 2), Kt = (e) => {
		var t = cg(), n = N(t);
		{
			let e = /* @__PURE__ */ k(() => J("lbl.textAlign")), t = /* @__PURE__ */ k(() => J("tip.nav.sideAlign")), i = /* @__PURE__ */ k(() => L(r).nav.style?.sideAlign ?? "left"), a = /* @__PURE__ */ k(() => [
				["left", J("common.left")],
				["center", J("common.center")],
				["right", J("common.right")]
			]);
			eu(n, {
				get label() {
					return L(e);
				},
				get title() {
					return L(t);
				},
				get value() {
					return L(i);
				},
				get options() {
					return L(a);
				},
				onchange: (e) => re("sideAlign", e === "left" ? void 0 : e)
			});
		}
		var i = F(n, 2), a = M(i), o = P(a, !0), s = F(a, 2);
		G(s), E(i), I((e, t) => {
			q(i, "title", e), V(o, t), q(s, "min", Ih.min), q(s, "max", Ih.max), K(s, L(r).nav.style?.width ?? 250);
		}, [() => J("tip.nav.colWidth"), () => J("lbl.navColWidth")]), R("change", s, (e) => {
			let t = Hh(e.target.value, Ih, 250);
			re("width", t === 250 ? void 0 : t), e.target.value = L(r).nav.style?.width ?? 250;
		}), B(e, t);
	};
	H(Gt, (e) => {
		L(ie) && e(Kt);
	}), E(jt), E(Ot);
	var qt = F(Ot, 4), Jt = M(qt), Yt = P(Jt, !0), Xt = F(Jt, 2), Zt = M(Xt);
	ri(Zt, 20, () => zh, (e) => e, (e, t) => {
		var n = lg();
		let r;
		var i = P(n, !0);
		I((e) => {
			r = W(n, 1, "", null, r, { on: L(oe) === t }), V(i, e);
		}, [() => J(`opt.size.${t}`)]), R("click", n, () => le(t)), B(e, n);
	}), E(Zt);
	var Qt = F(Zt, 2), $t = M(Qt), en = P($t, !0), tn = F($t, 2), nn = M(tn), rn = (e) => {
		var t = ug(), n = M(t), r = P(n, !0), i = F(n, 2);
		G(i);
		var a = F(i, 2);
		G(a), E(t), I((e, n) => {
			q(t, "title", e), V(r, n), q(i, "min", Dh.min), q(i, "max", Dh.max), q(i, "step", Dh.step), K(i, L(se)), q(a, "min", Dh.min), q(a, "max", Dh.max), K(a, L(se));
		}, [() => J("tip.nav.thickness"), () => J("lbl.navThickness")]), R("input", i, (e) => re("padY", e.target.valueAsNumber)), R("change", a, (e) => De(e, "padY", Dh)), B(e, t);
	};
	H(nn, (e) => {
		L(ie) || e(rn);
	});
	var an = F(nn, 2), on = M(an), sn = P(on, !0), cn = F(on, 2);
	G(cn);
	var ln = F(cn, 2);
	G(ln), E(an);
	var un = F(an, 2), dn = (e) => {
		var t = dg(), n = M(t), i = M(n), a = P(i, !0), o = F(i, 2);
		G(o), E(n);
		var s = F(n, 2), c = M(s), l = P(c, !0), u = F(c, 2);
		G(u), E(s), E(t), I((e, t, i, c, d, f) => {
			q(n, "title", e), V(a, t), q(o, "min", kh.min), q(o, "max", kh.max), q(o, "placeholder", i), K(o, L(r).nav.style?.padX ?? ""), q(s, "title", c), V(l, d), q(u, "min", Ah.min), q(u, "max", Ah.max), q(u, "placeholder", f), K(u, L(r).nav.style?.gap ?? "");
		}, [
			() => J("tip.nav.padX"),
			() => J("lbl.navPadX"),
			() => J("common.auto"),
			() => J("tip.nav.gap"),
			() => J("lbl.navGap"),
			() => J("common.auto")
		]), R("change", o, (e) => ue(e, "padX", kh)), R("change", u, (e) => ue(e, "gap", Ah)), B(e, t);
	};
	H(un, (e) => {
		L(ie) || e(dn);
	}), E(tn), E(Qt), E(Xt), E(qt);
	var fn = F(qt, 4), pn = M(fn), mn = P(pn, !0), hn = F(pn, 2), gn = M(hn), _n = (e) => {
		var t = pg(), n = N(t), i = M(n), a = P(i, !0), o = F(i, 2);
		ri(o, 21, () => [
			["", J("common.none")],
			["bottom", J("opt.navBorder.bottom")],
			["top", J("opt.navBorder.top")],
			["both", J("opt.navBorder.both")],
			["all", J("opt.navBorder.all")]
		], ([e, t]) => e, (e, t) => {
			var n = /* @__PURE__ */ k(() => h(L(t), 2));
			let i = () => L(n)[0], a = () => L(n)[1];
			var o = ig();
			let s;
			var c = M(o);
			U(c, () => m[i()]);
			var l = P(F(c), !0);
			E(o), I(() => {
				s = W(o, 1, "tile", null, s, { on: (L(r).nav.style?.border?.side ?? "") === i() }), q(o, "aria-pressed", (L(r).nav.style?.border?.side ?? "") === i()), V(l, a());
			}), R("click", o, () => re("border", i() ? {
				...L(r).nav.style?.border ?? {},
				side: i()
			} : void 0)), B(e, o);
		}), E(o), E(n);
		var s = F(n, 2), c = (e) => {
			var t = fg(), n = M(t), i = P(n, !0), a = F(n, 2);
			G(a);
			var o = F(a, 2), s = P(o, !0), c = F(o, 2);
			{
				let e = /* @__PURE__ */ k(() => L(r).nav.style.border.color ?? "text"), t = /* @__PURE__ */ k(u), n = /* @__PURE__ */ k(() => J("tip.nav.borderColorPick"));
				Pa(c, {
					get value() {
						return L(e);
					},
					get tokens() {
						return L(t);
					},
					get label() {
						return L(n);
					},
					onchange: (e) => re("border", {
						...L(r).nav.style.border,
						color: e
					})
				});
			}
			E(t), I((e, t, c, l, u) => {
				q(n, "title", e), V(i, t), q(a, "title", c), K(a, L(r).nav.style.border.width ?? 1), q(o, "title", l), V(s, u);
			}, [
				() => J("tip.nav.borderWidth"),
				() => J("lbl.navBorderWidth"),
				() => J("tip.nav.borderWidth"),
				() => J("tip.nav.borderColorPick"),
				() => J("lbl.navBorderColor")
			]), R("change", a, (e) => {
				let t = Hh(e.target.value, {
					min: 1,
					max: 8
				}, 1), n = { ...L(r).nav.style.border };
				t === 1 ? delete n.width : n.width = t, re("border", n), e.target.value = L(r).nav.style.border.width ?? 1;
			}), B(e, t);
		};
		H(s, (e) => {
			L(r).nav.style?.border?.side && e(c);
		}), I((e, t, r) => {
			q(n, "title", e), V(a, t), q(o, "aria-label", r);
		}, [
			() => J("tip.nav.border"),
			() => J("lbl.navBorder"),
			() => J("lbl.navBorder")
		]), B(e, t);
	};
	H(gn, (e) => {
		L(ie) || e(_n);
	});
	var vn = F(gn, 2), yn = (e) => {
		{
			let t = /* @__PURE__ */ k(() => J("lbl.navShadow")), n = /* @__PURE__ */ k(() => J("tip.nav.shadow")), i = /* @__PURE__ */ k(() => L(r).nav.style?.shadow ?? ""), a = /* @__PURE__ */ k(() => [
				["", J("common.none")],
				["soft", J("opt.navShadow.soft")],
				["strong", J("opt.navShadow.strong")]
			]);
			eu(e, {
				get label() {
					return L(t);
				},
				get title() {
					return L(n);
				},
				get value() {
					return L(i);
				},
				get options() {
					return L(a);
				},
				onchange: (e) => re("shadow", e || void 0)
			});
		}
	};
	H(vn, (e) => {
		!L(ae) && !L(ie) && e(yn);
	}), E(hn), E(fn);
	var bn = F(fn, 4), xn = M(bn), Sn = P(xn, !0), Cn = F(xn, 2), wn = M(Cn), Tn = (e) => {
		var t = _g(), n = M(t), i = P(n, !0), a = F(n, 2), o = M(a);
		G(o);
		var s = F(o);
		E(a);
		var c = F(a, 2), u = (e) => {
			var t = gg(), n = N(t);
			{
				let e = /* @__PURE__ */ k(() => J("lbl.navScroll")), t = /* @__PURE__ */ k(() => J("tip.nav.scroll")), i = /* @__PURE__ */ k(() => L(r).nav.scroll ?? "none"), a = /* @__PURE__ */ k(() => [
					["none", J("opt.scroll.none")],
					["shrink", J("opt.scroll.shrink")],
					["hide", J("opt.scroll.hide")]
				]);
				eu(n, {
					get label() {
						return L(e);
					},
					get title() {
						return L(t);
					},
					get value() {
						return L(i);
					},
					get options() {
						return L(a);
					},
					onchange: (e) => l("nav", () => {
						e === "none" ? delete L(r).nav.scroll : L(r).nav.scroll = e;
					})
				});
			}
			var i = F(n, 2), a = (e) => {
				var t = hg(), n = N(t), i = M(n), a = P(i, !0), o = F(i, 2);
				G(o);
				var s = P(F(o, 2));
				E(n);
				var c = F(n, 2), l = M(c), u = P(l, !0), d = F(l, 2);
				G(d);
				var f = P(F(d, 2));
				E(c);
				var p = F(c, 2), m = M(p), h = P(m, !0), g = F(m, 2);
				G(g);
				var _ = P(F(g, 2));
				E(p);
				var v = F(p, 2), y = (e) => {
					var t = mg(), n = M(t);
					G(n);
					var i = F(n);
					E(t), I((e, a) => {
						q(t, "title", e), Ni(n, L(r).nav.style?.shrinkLogo === !0), V(i, ` ${a ?? ""}`);
					}, [() => J("tip.nav.shrinkLogo"), () => J("lbl.navShrinkLogo")]), R("change", n, (e) => re("shrinkLogo", e.target.checked ? !0 : void 0)), B(e, t);
				};
				H(v, (e) => {
					(L(r).nav.logo?.type ?? "text") !== "text" && e(y);
				}), I((e, t, i, l, m, v, y, b) => {
					q(n, "title", e), V(a, t), K(o, i), V(s, `${l ?? ""}%`), q(c, "title", m), V(u, v), K(d, L(r).nav.style?.shrinkAt ?? 80), V(f, `${L(r).nav.style?.shrinkAt ?? 80 ?? ""} px`), q(p, "title", y), V(h, b), K(g, L(r).nav.style?.shrinkMs ?? 220), V(_, `${L(r).nav.style?.shrinkMs ?? 220 ?? ""} ms`);
				}, [
					() => J("tip.nav.shrinkTo"),
					() => J("lbl.navShrinkTo"),
					() => Math.round((L(r).nav.style?.shrinkTo ?? .5) * 100),
					() => Math.round((L(r).nav.style?.shrinkTo ?? .5) * 100),
					() => J("tip.nav.shrinkAt"),
					() => J("lbl.navShrinkAt"),
					() => J("tip.nav.shrinkMs"),
					() => J("lbl.navShrinkMs")
				]), R("input", o, (e) => Ae(e.target.valueAsNumber)), R("input", d, (e) => je(e.target.valueAsNumber)), R("input", g, (e) => Me(e.target.valueAsNumber)), B(e, t);
			};
			H(i, (e) => {
				L(r).nav.scroll === "shrink" && e(a);
			}), B(e, t);
		};
		H(c, (e) => {
			L(r).nav.sticky !== !1 && e(u);
		});
		var d = F(c, 2), f = M(d);
		G(f);
		var p = F(f);
		E(d), E(t), I((e, t, n, c, l) => {
			V(i, e), q(a, "title", t), Ni(o, L(r).nav.sticky !== !1), V(s, ` ${n ?? ""}`), q(d, "title", c), Ni(f, L(r).nav.style?.atTop === "clear"), V(p, ` ${l ?? ""}`);
		}, [
			() => J("group.navScrolling"),
			() => J("tip.nav.sticky"),
			() => J("lbl.navSticky"),
			() => J("tip.nav.atTop"),
			() => J("lbl.navAtTop")
		]), R("change", o, (e) => l("nav", () => {
			L(r).nav.sticky = e.target.checked;
		})), R("change", f, (e) => re("atTop", e.target.checked ? "clear" : void 0)), B(e, t);
	};
	H(wn, (e) => {
		L(ie) || e(Tn);
	}), E(Cn), E(bn);
	var En = F(bn, 4), Dn = M(En), kn = P(Dn, !0), An = F(Dn, 2), jn = M(An), Mn = M(jn), Nn = (e) => {
		var t = vg(), n = M(t), i = P(n, !0), a = F(n, 2);
		G(a), E(t), I((e, n, o) => {
			q(t, "title", e), V(i, n), q(a, "min", Dh.min), q(a, "max", Dh.max), q(a, "placeholder", o), K(a, L(r).nav.style?.mobile?.padY ?? "");
		}, [
			() => J("tip.nav.thickness"),
			() => J("lbl.navThickness"),
			() => J("lbl.navSameAsDesktop")
		]), R("change", a, (e) => Oe(e, "padY", Dh)), B(e, t);
	};
	H(Mn, (e) => {
		L(ie) || e(Nn);
	});
	var Pn = F(Mn, 2), Fn = M(Pn), In = P(Fn, !0), Ln = F(Fn, 2);
	G(Ln), E(Pn), E(jn);
	var Rn = F(jn, 2), zn = M(Rn), Bn = M(zn), Vn = P(Bn, !0), Hn = F(Bn, 2);
	{
		let e = /* @__PURE__ */ k(() => L(r).nav.style?.mobile?.size ?? ""), t = /* @__PURE__ */ k(() => [["", J("lbl.navSameAsDesktop")], ...zh.map((e) => [e, J(`opt.size.${e}`)])]);
		Y(Hn, {
			filled: !0,
			get value() {
				return L(e);
			},
			get options() {
				return L(t);
			},
			onchange: (e) => de("size", e || void 0)
		});
	}
	E(zn);
	var Un = F(zn, 2), Wn = M(Un), Gn = P(Wn, !0), Kn = F(Wn, 2);
	{
		let e = /* @__PURE__ */ k(() => L(r).nav.style?.mobile?.layout ?? ""), t = /* @__PURE__ */ k(() => [
			["", J("lbl.navSameAsDesktop")],
			["left", J("common.left")],
			["center", J("common.center")],
			["right", J("common.right")]
		]);
		Y(Kn, {
			filled: !0,
			get value() {
				return L(e);
			},
			get options() {
				return L(t);
			},
			onchange: (e) => de("layout", e || void 0)
		});
	}
	E(Un), E(Rn);
	var qn = F(Rn, 2), Jn = M(qn), Yn = M(Jn), Xn = P(Yn, !0), Zn = F(Yn, 2);
	{
		let e = /* @__PURE__ */ k(() => L(r).nav.style?.mobile?.tools?.side ?? ""), t = /* @__PURE__ */ k(() => [
			["", J("lbl.navSameAsDesktop")],
			["start", J("common.left")],
			["end", J("common.right")]
		]);
		Y(Zn, {
			filled: !0,
			get value() {
				return L(e);
			},
			get options() {
				return L(t);
			},
			onchange: (e) => de("tools", e ? { side: e } : void 0)
		});
	}
	E(Jn);
	var Qn = F(Jn, 2), $n = (e) => {
		var t = yg(), n = M(t), r = P(n, !0), i = F(n, 2);
		{
			let e = /* @__PURE__ */ k(() => fe("overlay")), t = /* @__PURE__ */ k(() => [
				["", J("lbl.navSameAsDesktop")],
				["on", J("common.on")],
				["off", J("common.off")]
			]);
			Y(i, {
				filled: !0,
				get value() {
					return L(e);
				},
				get options() {
					return L(t);
				},
				onchange: (e) => pe("overlay", e)
			});
		}
		E(t), I((e, n) => {
			q(t, "title", e), V(r, n);
		}, [() => J("tip.nav.mobileOverlay"), () => J("lbl.navOverlay")]), B(e, t);
	};
	H(Qn, (e) => {
		!L(ae) && !L(ie) && e($n);
	}), E(qn);
	var er = F(qn, 2), tr = M(er), nr = M(tr), rr = P(nr, !0), ir = F(nr, 2);
	{
		let e = /* @__PURE__ */ k(() => L(r).nav.style?.mobile?.border?.side ?? ""), t = /* @__PURE__ */ k(() => [
			["", J("lbl.navSameAsDesktop")],
			["none", J("common.none")],
			["bottom", J("opt.navBorder.bottom")],
			["top", J("opt.navBorder.top")],
			["both", J("opt.navBorder.both")],
			["all", J("opt.navBorder.all")]
		]);
		Y(ir, {
			filled: !0,
			get value() {
				return L(e);
			},
			get options() {
				return L(t);
			},
			onchange: (e) => me(e)
		});
	}
	E(tr), E(er);
	var ar = F(er, 2), or = (e) => {
		var t = fg(), n = M(t), i = P(n, !0), a = F(n, 2);
		G(a);
		var o = F(a, 2), s = P(o, !0), c = F(o, 2);
		{
			let e = /* @__PURE__ */ k(() => L(r).nav.style.mobile.border.color ?? "text"), t = /* @__PURE__ */ k(u), n = /* @__PURE__ */ k(() => J("tip.nav.borderColorPick"));
			Pa(c, {
				get value() {
					return L(e);
				},
				get tokens() {
					return L(t);
				},
				get label() {
					return L(n);
				},
				onchange: (e) => de("border", {
					...L(r).nav.style.mobile.border,
					color: e
				})
			});
		}
		E(t), I((e, t, c, l, u) => {
			q(n, "title", e), V(i, t), q(a, "title", c), K(a, L(r).nav.style.mobile.border.width ?? 1), q(o, "title", l), V(s, u);
		}, [
			() => J("tip.nav.borderWidth"),
			() => J("lbl.navBorderWidth"),
			() => J("tip.nav.borderWidth"),
			() => J("tip.nav.borderColorPick"),
			() => J("lbl.navBorderColor")
		]), R("change", a, (e) => {
			let t = Hh(e.target.value, {
				min: 1,
				max: 8
			}, 1), n = { ...L(r).nav.style.mobile.border };
			t === 1 ? delete n.width : n.width = t, de("border", n), e.target.value = L(r).nav.style.mobile.border.width ?? 1;
		}), B(e, t);
	};
	H(ar, (e) => {
		L(r).nav.style?.mobile?.border?.side && L(r).nav.style.mobile.border.side !== "none" && e(or);
	});
	var sr = F(ar, 2), cr = M(sr), lr = M(cr), ur = P(lr, !0), dr = F(lr, 2);
	{
		let e = /* @__PURE__ */ k(() => L(r).nav.style?.mobileMenu ?? "dropdown"), t = /* @__PURE__ */ k(() => [["dropdown", J("opt.mobileMenu.dropdown")], ["sheet", J("opt.mobileMenu.sheet")]]);
		Y(dr, {
			filled: !0,
			get value() {
				return L(e);
			},
			get options() {
				return L(t);
			},
			onchange: (e) => re("mobileMenu", e === "dropdown" ? void 0 : e)
		});
	}
	E(cr);
	var fr = F(cr, 2), pr = (e) => {
		var t = yg(), n = M(t), i = P(n, !0), a = F(n, 2);
		{
			let e = /* @__PURE__ */ k(() => L(r).nav.style?.sheetMotion ?? "top"), t = /* @__PURE__ */ k(() => [
				"top",
				"bottom",
				"left",
				"right",
				"fade",
				"none"
			].map((e) => [e, J(`opt.sheetMotion.${e}`)]));
			Y(a, {
				filled: !0,
				get value() {
					return L(e);
				},
				get options() {
					return L(t);
				},
				onchange: (e) => re("sheetMotion", e === "top" ? void 0 : e)
			});
		}
		E(t), I((e, n) => {
			q(t, "title", e), V(i, n);
		}, [() => J("tip.nav.sheetMotion"), () => J("lbl.sheetMotion")]), B(e, t);
	};
	H(fr, (e) => {
		L(r).nav.style?.mobileMenu === "sheet" && e(pr);
	}), E(sr);
	var mr = F(sr, 2), hr = (e) => {
		var t = bg(), n = N(t), i = M(n);
		G(i);
		var a = F(i);
		E(n);
		var o = F(n, 2), s = (e) => {
			var t = mg(), n = M(t);
			G(n);
			var i = F(n);
			E(t), I((e, a) => {
				q(t, "title", e), Ni(n, L(r).nav.style?.sheetTheme === !0), V(i, ` ${a ?? ""}`);
			}, [() => J("tip.nav.sheetTheme"), () => J("lbl.sheetTheme")]), R("change", n, (e) => re("sheetTheme", e.target.checked ? !0 : void 0)), B(e, t);
		};
		H(o, (e) => {
			L(r).theme?.alt?.tokens && L(r).nav.style?.tools?.theme !== !1 && e(s);
		});
		var c = F(o, 2), l = (e) => {
			var t = mg(), n = M(t);
			G(n);
			var i = F(n);
			E(t), I((e, a) => {
				q(t, "title", e), Ni(n, L(r).nav.style?.sheetCart === !0), V(i, ` ${a ?? ""}`);
			}, [() => J("tip.nav.sheetCart"), () => J("lbl.sheetCart")]), R("change", n, (e) => re("sheetCart", e.target.checked ? !0 : void 0)), B(e, t);
		};
		H(c, (e) => {
			L(r).nav.cart?.show && e(l);
		});
		var d = F(c, 2), f = (e) => {
			var t = mg(), n = M(t);
			G(n);
			var i = F(n);
			E(t), I((e, a) => {
				q(t, "title", e), Ni(n, L(r).nav.style?.sheetAnnounce === !0), V(i, ` ${a ?? ""}`);
			}, [() => J("tip.nav.sheetAnnounce"), () => J("lbl.sheetAnnounce")]), R("change", n, (e) => re("sheetAnnounce", e.target.checked ? !0 : void 0)), B(e, t);
		};
		H(d, (e) => {
			L(r).nav.announcement?.show && e(f);
		});
		var p = F(d, 2), m = (e) => {
			var t = mg(), n = M(t);
			G(n);
			var i = F(n);
			E(t), I((e, a) => {
				q(t, "title", e), Ni(n, L(r).nav.style?.sheetToolLabels === !0), V(i, ` ${a ?? ""}`);
			}, [() => J("tip.nav.sheetToolLabels"), () => J("lbl.sheetToolLabels")]), R("change", n, (e) => re("sheetToolLabels", e.target.checked ? !0 : void 0)), B(e, t);
		};
		H(p, (e) => {
			(L(r).nav.style?.sheetTheme || L(r).nav.style?.sheetCart) && e(m);
		});
		var h = F(p, 2), g = M(h), _ = P(g, !0), v = F(g, 2);
		{
			let e = /* @__PURE__ */ k(() => L(r).nav.style?.sheet?.bg ?? "surface"), t = /* @__PURE__ */ k(u), n = /* @__PURE__ */ k(() => J("tip.nav.sheetBg"));
			Pa(v, {
				get value() {
					return L(e);
				},
				get tokens() {
					return L(t);
				},
				get label() {
					return L(n);
				},
				onchange: (e) => Ee("bg", e)
			});
		}
		var y = F(v, 2);
		G(y);
		var b = P(F(y, 2));
		E(h);
		var x = F(h, 2), S = M(x);
		G(S);
		var C = F(S);
		E(x);
		var w = F(x, 2), T = M(w), ee = F(T);
		{
			let e = /* @__PURE__ */ k(() => L(r).nav.style?.sheet?.textColor ?? L(r).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ k(u), n = /* @__PURE__ */ k(() => J("tip.nav.sheetTextColorPick"));
			Pa(ee, {
				get value() {
					return L(e);
				},
				get tokens() {
					return L(t);
				},
				get label() {
					return L(n);
				},
				onchange: (e) => Ee("textColor", e)
			});
		}
		E(w), I((e, t, o, s, c, l, u, d, f, p) => {
			q(n, "title", e), Ni(i, L(r).nav.style?.sheetLogo === !0), V(a, ` ${t ?? ""}`), q(h, "title", o), V(_, s), q(y, "title", c), K(y, l), V(b, `${u ?? ""}%`), q(x, "title", d), Ni(S, L(r).nav.style?.sheet?.blur ?? L(r).nav.style?.blur !== !1), V(C, ` ${f ?? ""}`), V(T, `${p ?? ""} `);
		}, [
			() => J("tip.nav.sheetLogo"),
			() => J("lbl.sheetLogo"),
			() => J("tip.nav.sheetBg"),
			() => J("lbl.background"),
			() => J("tip.nav.sheetOpacity"),
			() => Math.round((L(r).nav.style?.sheet?.bgOpacity ?? .85) * 100),
			() => Math.round((L(r).nav.style?.sheet?.bgOpacity ?? .85) * 100),
			() => J("tip.nav.sheetBlur"),
			() => J("lbl.sheetBlur"),
			() => J("lbl.textColor")
		]), R("change", i, (e) => re("sheetLogo", e.target.checked ? !0 : void 0)), R("input", y, (e) => Ee("bgOpacity", e.target.valueAsNumber / 100)), R("change", S, (e) => Ee("blur", e.target.checked)), B(e, t);
	};
	H(mr, (e) => {
		L(r).nav.style?.mobileMenu === "sheet" && e(hr);
	});
	var gr = F(mr, 2), _r = (e) => {
		var t = yg(), n = M(t), i = P(n, !0), a = F(n, 2);
		{
			let e = /* @__PURE__ */ k(() => L(r).nav.style?.mobileSubs ?? "collapsed"), t = /* @__PURE__ */ k(() => [["collapsed", J("opt.mobileSubs.collapsed")], ["expanded", J("opt.mobileSubs.expanded")]]);
			Y(a, {
				filled: !0,
				get value() {
					return L(e);
				},
				get options() {
					return L(t);
				},
				onchange: (e) => re("mobileSubs", e === "collapsed" ? void 0 : e)
			});
		}
		E(t), I((e, n) => {
			q(t, "title", e), V(i, n);
		}, [() => J("tip.nav.mobileSubs"), () => J("lbl.mobileSubs")]), B(e, t);
	}, vr = /* @__PURE__ */ k(() => L(r).nav.items?.some((e) => e.children?.length));
	H(gr, (e) => {
		L(vr) && e(_r);
	}), E(An), E(En);
	var yr = F(En, 4), br = M(yr), xr = P(br, !0), Sr = F(br, 2), Cr = M(Sr), wr = M(Cr), Tr = P(wr, !0), Er = F(wr, 2);
	ri(Er, 21, () => [
		["standard", J("opt.hover.standard")],
		["underline", J("opt.hover.underline")],
		["pill", J("opt.hover.pill")],
		["lift-plain", J("opt.hover.liftPlain")],
		["lift", J("opt.hover.lift")]
	], ([e, t]) => e, (e, t) => {
		var n = /* @__PURE__ */ k(() => h(L(t), 2));
		let i = () => L(n)[0], a = () => L(n)[1];
		var o = xg();
		let s;
		var c = M(o), l = P(c, !0), u = P(F(c), !0);
		E(o), I((e) => {
			s = W(o, 1, "tile hover-tile", null, s, { on: (L(r).nav.style?.hover ?? "standard") === i() }), q(o, "aria-pressed", (L(r).nav.style?.hover ?? "standard") === i()), W(c, 1, `hover-sample hover-${i() ?? ""}`), V(l, e), V(u, a());
		}, [() => J("seed.home")]), R("click", o, () => Re(i())), B(e, o);
	}), E(Er), E(Cr);
	var Dr = F(Cr, 2), Or = (e) => {
		var t = Sg(), n = M(t), i = P(n, !0), a = F(n, 2);
		G(a);
		var o = P(F(a, 2));
		E(t), I((e, n, s) => {
			q(t, "title", e), V(i, n), K(a, L(r).nav.style?.hoverGlow ?? .6), V(o, `${s ?? ""}%`);
		}, [
			() => J("tip.nav.hoverGlow"),
			() => J("lbl.glowStrength"),
			() => Math.round((L(r).nav.style?.hoverGlow ?? .6) * 100)
		]), R("input", a, (e) => re("hoverGlow", Number(e.target.value))), B(e, t);
	};
	H(Dr, (e) => {
		L(r).nav.style?.hover === "lift" && e(Or);
	});
	var kr = F(Dr, 2), Ar = M(kr), jr = (e) => {
		var t = Cg(), n = M(t);
		{
			let e = /* @__PURE__ */ k(() => L(r).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ k(u);
			Pa(n, {
				get value() {
					return L(e);
				},
				get tokens() {
					return L(t);
				},
				get label() {
					return L(Pe)[1];
				},
				onchange: (e) => re("hoverColor", e)
			});
		}
		var i = P(F(n, 2), !0);
		E(t), I(() => {
			q(t, "title", L(Pe)[1]), V(i, L(Pe)[0]);
		}), B(e, t);
	};
	H(Ar, (e) => {
		L(Pe) && e(jr);
	});
	var Nr = F(Ar, 2), Pr = M(Nr);
	{
		let e = /* @__PURE__ */ k(() => L(r).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ k(u), n = /* @__PURE__ */ k(() => J("tip.nav.hoverTextColorPick"));
		Pa(Pr, {
			get value() {
				return L(e);
			},
			get tokens() {
				return L(t);
			},
			get label() {
				return L(n);
			},
			onchange: (e) => re("hoverTextColor", e)
		});
	}
	var Fr = P(F(Pr, 2), !0);
	E(Nr);
	var Ir = F(Nr, 2), Lr = M(Ir);
	{
		let e = /* @__PURE__ */ k(() => L(r).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ k(u), n = /* @__PURE__ */ k(() => J("tip.nav.textColorPick"));
		Pa(Lr, {
			get value() {
				return L(e);
			},
			get tokens() {
				return L(t);
			},
			get label() {
				return L(n);
			},
			onchange: (e) => re("textColor", e)
		});
	}
	var Rr = P(F(Lr, 2), !0);
	E(Ir), E(kr);
	var zr = F(kr, 2), Br = M(zr);
	G(Br);
	var z = F(Br);
	E(zr), E(Sr), E(yr);
	var Ur = F(yr, 4), Wr = M(Ur), Gr = P(Wr, !0), Kr = F(Wr, 2);
	li(M(Kr), () => t.backgroundLayers, () => s, () => L(r).nav?.style?.background?.layers ?? []), E(Kr), E(Ur), E(Dt), E(wt);
	var qr = F(wt, 2), Jr = M(qr), Yr = P(Jr, !0), Xr = F(Jr, 2), Zr = M(Xr), Qr = M(Zr);
	G(Qr);
	var ei = F(Qr);
	E(Zr);
	var ti = F(Zr, 2), ni = (e) => {
		var t = Eg(), n = N(t), i = M(n), o = P(i, !0), s = F(i, 2);
		G(s), E(n);
		var c = F(n, 2), d = M(c), f = F(d);
		{
			let e = /* @__PURE__ */ k(() => L(r).nav.announcement?.page ?? (L(r).nav.announcement?.href === void 0 ? "" : "custom")), t = /* @__PURE__ */ k(() => [
				["", J("common.none")],
				...L(r).pages.map((e) => [e.id, e.title]),
				["custom", J("opt.announceLink.custom")]
			]);
			Y(f, {
				get value() {
					return L(e);
				},
				get options() {
					return L(t);
				},
				onchange: (e) => l("edit:nav-announce-link", () => {
					let t = { ...L(r).nav.announcement ?? {} };
					delete t.page, delete t.href, e === "custom" ? t.href = "" : e && (t.page = e), L(r).nav.announcement = t;
				})
			});
		}
		E(c);
		var p = F(c, 2), m = (e) => {
			var t = wg(), n = M(t), i = P(n, !0), a = F(n, 2);
			G(a), E(t), I((e, n) => {
				q(t, "title", e), V(i, n), K(a, L(r).nav.announcement?.href ?? "");
			}, [() => J("tip.nav.announceHref"), () => J("lbl.announceHref")]), R("change", a, (e) => he("href", e.target.value.trim())), B(e, t);
		};
		H(p, (e) => {
			L(r).nav.announcement?.href !== void 0 && !L(r).nav.announcement?.page && e(m);
		});
		var h = F(p, 2), g = (e) => {
			var t = mg(), n = M(t);
			G(n);
			var i = F(n);
			E(t), I((e, a) => {
				q(t, "title", e), Ni(n, L(r).nav.announcement?.sticky !== !1), V(i, ` ${a ?? ""}`);
			}, [() => J("tip.nav.announceSticky"), () => J("lbl.announceSticky")]), R("change", n, (e) => he("sticky", e.target.checked ? void 0 : !1)), B(e, t);
		};
		H(h, (e) => {
			L(r).nav.sticky !== !1 && !L(ae) && !L(ie) && !L(r).nav.overlay && e(g);
		});
		var _ = F(h, 2), v = (e) => {
			var t = mg(), n = M(t);
			G(n);
			var i = F(n);
			E(t), I((e, a) => {
				q(t, "title", e), Ni(n, L(r).nav.announcement?.followNav === !0), V(i, ` ${a ?? ""}`);
			}, [() => J("tip.nav.announceFollowNav"), () => J("lbl.announceFollowNav")]), R("change", n, (e) => he("followNav", e.target.checked ? !0 : void 0)), B(e, t);
		};
		H(_, (e) => {
			L(r).nav.scroll === "hide" && L(r).nav.sticky !== !1 && !L(ie) && L(r).nav.announcement?.sticky !== !1 && e(v);
		});
		var y = F(_, 2), b = (e) => {
			{
				let t = /* @__PURE__ */ k(() => J("lbl.announcePlace")), n = /* @__PURE__ */ k(() => J("tip.nav.announcePlace")), i = /* @__PURE__ */ k(() => L(r).nav.announcement?.place ?? "nav"), a = /* @__PURE__ */ k(() => [
					["nav", J("opt.announcePlace.nav")],
					["page", J("opt.announcePlace.page")],
					["content", J("opt.announcePlace.content")]
				]);
				eu(e, {
					get label() {
						return L(t);
					},
					get title() {
						return L(n);
					},
					get value() {
						return L(i);
					},
					get options() {
						return L(a);
					},
					onchange: (e) => he("place", e === "nav" ? void 0 : e)
				});
			}
		};
		H(y, (e) => {
			L(ie) && e(b);
		});
		var x = F(y, 2), S = M(x);
		G(S);
		var C = F(S);
		E(x);
		var w = F(x, 2), T = (e) => {
			var t = Tg(), n = P(t, !0);
			I((e, r) => {
				q(t, "title", e), V(n, r);
			}, [() => J("tip.nav.announceShowAgain"), () => J("lbl.announceShowAgain")]), R("click", t, () => a?.sendAnnounceReset()), B(e, t);
		};
		H(w, (e) => {
			L(r).nav.announcement?.dismiss !== !1 && e(T);
		});
		var ee = F(w, 2), te = M(ee), ne = F(te);
		{
			let e = /* @__PURE__ */ k(() => L(r).nav.announcement?.color ?? "accent"), t = /* @__PURE__ */ k(u), n = /* @__PURE__ */ k(() => J("tip.nav.announceColor"));
			Pa(ne, {
				get value() {
					return L(e);
				},
				get tokens() {
					return L(t);
				},
				get label() {
					return L(n);
				},
				onchange: (e) => he("color", e)
			});
		}
		E(ee);
		var re = F(ee, 2), oe = M(re), se = F(oe);
		{
			let e = /* @__PURE__ */ k(() => L(r).nav.announcement?.textColor ?? "accent-text"), t = /* @__PURE__ */ k(u), n = /* @__PURE__ */ k(() => J("tip.nav.announceTextColor"));
			Pa(se, {
				get value() {
					return L(e);
				},
				get tokens() {
					return L(t);
				},
				get label() {
					return L(n);
				},
				onchange: (e) => he("textColor", e)
			});
		}
		E(re), I((e, t, i, a, l, u, f, p, m, h) => {
			q(n, "title", e), V(o, t), K(s, L(r).nav.announcement?.text ?? ""), q(c, "title", i), V(d, `${a ?? ""} `), q(x, "title", l), Ni(S, L(r).nav.announcement?.dismiss !== !1), V(C, ` ${u ?? ""}`), q(ee, "title", f), V(te, `${p ?? ""} `), q(re, "title", m), V(oe, `${h ?? ""} `);
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
		]), R("change", s, (e) => he("text", e.target.value.trim() || void 0)), R("change", S, (e) => he("dismiss", e.target.checked ? void 0 : !1)), B(e, t);
	};
	H(ti, (e) => {
		L(r).nav.announcement?.show && e(ni);
	}), E(Xr), E(qr);
	var ii = F(qr, 2), ai = M(ii), oi = P(ai, !0), si = F(ai, 2);
	{
		let e = (e, t = f, n = f) => {
			var r = Dg(), i = M(r);
			U(i, () => X.up, !0), E(i);
			var a = F(i, 2);
			U(a, () => X.down, !0), E(a), E(r), I((e, t) => {
				q(i, "title", e), i.disabled = n() === 0, q(a, "title", t), a.disabled = n() === L(ee).length - 1;
			}, [() => J("tip.moveUp"), () => J("tip.moveDown")]), R("click", i, (e) => {
				e.preventDefault(), e.stopPropagation(), te(t(), -1);
			}), R("click", a, (e) => {
				e.preventDefault(), e.stopPropagation(), te(t(), 1);
			}), B(e, r);
		};
		var ci = M(si), ui = (e) => {
			var t = gg(), n = N(t);
			{
				let e = /* @__PURE__ */ k(() => J("lbl.toolsSide")), t = /* @__PURE__ */ k(() => J("tip.nav.toolsSideColumn")), i = /* @__PURE__ */ k(() => L(r).nav.style?.tools?.side ?? "end"), a = /* @__PURE__ */ k(() => [["start", J("opt.toolsSide.top")], ["end", J("opt.toolsSide.bottom")]]);
				eu(n, {
					get label() {
						return L(e);
					},
					get title() {
						return L(t);
					},
					get value() {
						return L(i);
					},
					get options() {
						return L(a);
					},
					onchange: (e) => ne("side", e === "start" ? "start" : void 0)
				});
			}
			var i = F(n, 2);
			{
				let e = /* @__PURE__ */ k(() => J("lbl.toolsAlign")), t = /* @__PURE__ */ k(() => J("tip.nav.toolsAlign")), n = /* @__PURE__ */ k(() => L(r).nav.style?.tools?.align ?? "center"), a = /* @__PURE__ */ k(() => [
					["start", J("opt.toolsAlign.start")],
					["center", J("opt.toolsAlign.center")],
					["end", J("opt.toolsAlign.end")],
					["spread", J("opt.toolsAlign.spread")]
				]);
				eu(i, {
					get label() {
						return L(e);
					},
					get title() {
						return L(t);
					},
					get value() {
						return L(n);
					},
					get options() {
						return L(a);
					},
					onchange: (e) => ne("align", e === "center" ? void 0 : e)
				});
			}
			B(e, t);
		}, di = (e) => {
			{
				let t = /* @__PURE__ */ k(() => J("lbl.toolsSide")), n = /* @__PURE__ */ k(() => J("tip.nav.toolsSide")), i = /* @__PURE__ */ k(() => L(r).nav.style?.tools?.side ?? "end"), a = /* @__PURE__ */ k(() => [["start", J("opt.toolsSide.start")], ["end", J("opt.toolsSide.end")]]);
				eu(e, {
					get label() {
						return L(t);
					},
					get title() {
						return L(n);
					},
					get value() {
						return L(i);
					},
					get options() {
						return L(a);
					},
					onchange: (e) => ne("side", e === "start" ? "start" : void 0)
				});
			}
		};
		H(ci, (e) => {
			L(ie) ? e(ui) : e(di, -1);
		}), ri(F(ci, 2), 18, () => L(ee), (e) => e, (t, n, i) => {
			var a = Hr(), o = N(a), s = (t) => {
				var a = Hr(), o = N(a), s = (t) => {
					var a = Og(), o = M(a), s = M(o), c = P(s, !0), l = F(s);
					e(l, () => n, () => L(i)), E(o);
					var u = F(o, 2), d = M(u);
					G(d);
					var f = F(d);
					E(u), E(a), I((e, t, n) => {
						V(c, e), q(u, "title", t), Ni(d, L(r).nav.style?.tools?.theme !== !1), V(f, ` ${n ?? ""}`);
					}, [
						() => J("lbl.themeToggle"),
						() => J("tip.nav.themeToggle"),
						() => J("lbl.showInMenu")
					]), R("change", d, (e) => ne("theme", e.target.checked ? void 0 : !1)), B(t, a);
				};
				H(o, (e) => {
					L(r).theme?.alt?.tokens && e(s);
				}), B(t, a);
			}, c = (t) => {
				var a = kg(), o = M(a), s = M(o), c = P(s, !0), u = F(s);
				e(u, () => n, () => L(i)), E(o);
				var d = F(o, 2), f = M(d);
				G(f);
				var p = F(f);
				E(d);
				var m = F(d, 2), h = (e) => {
					var t = yg(), n = M(t), i = P(n, !0), a = F(n, 2);
					{
						let e = /* @__PURE__ */ k(() => L(r).nav.cart?.href ?? ""), t = /* @__PURE__ */ k(() => [["", J("common.none")], ...L(r).pages.map((e) => [e.path, e.title])]);
						Y(a, {
							filled: !0,
							get value() {
								return L(e);
							},
							get options() {
								return L(t);
							},
							onchange: (e) => l("nav", () => {
								e ? L(r).nav.cart.href = e : delete L(r).nav.cart.href;
							})
						});
					}
					E(t), I((e, n) => {
						q(t, "title", e), V(i, n);
					}, [() => J("tip.cart.checkout"), () => J("lbl.checkoutPage")]), B(e, t);
				};
				H(m, (e) => {
					L(r).nav.cart?.show && e(h);
				}), E(a), I((e, t, n) => {
					V(c, e), q(d, "title", t), Ni(f, L(r).nav.cart?.show === !0), V(p, ` ${n ?? ""}`);
				}, [
					() => J("lbl.cart"),
					() => J("tip.nav.cart"),
					() => J("lbl.showInMenu")
				]), R("change", f, (e) => l("nav", () => {
					e.target.checked ? L(r).nav.cart = {
						...L(r).nav.cart ?? {},
						show: !0
					} : delete L(r).nav.cart;
				})), B(t, a);
			}, u = (t) => {
				var a = Lg(), o = M(a), s = M(o), c = M(s, !0), l = F(c);
				e(l, () => n, () => L(i)), E(s), E(o);
				var u = F(o, 2), d = M(u), f = M(d);
				G(f);
				var p = F(f);
				E(d);
				var m = F(d, 2), g = (e) => {
					var t = Ig(), n = N(t), i = M(n), a = P(i, !0), o = F(i, 2);
					ri(o, 21, () => L(D), ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ k(() => h(L(t), 2));
						let i = () => L(n)[0], a = () => L(n)[1];
						var o = ig();
						let s;
						var c = M(o);
						U(c, () => v[i()]);
						var l = P(F(c), !0);
						E(o), I(() => {
							s = W(o, 1, "tile", null, s, { on: (L(r).nav.launcher?.view ?? "grid") === i() }), q(o, "aria-pressed", (L(r).nav.launcher?.view ?? "grid") === i()), V(l, a());
						}), R("click", o, () => be("view", i() === "grid" ? void 0 : i())), B(e, o);
					}), E(o), E(n);
					var s = F(n, 2);
					{
						let e = /* @__PURE__ */ k(() => J("lbl.launcherMobileView")), t = /* @__PURE__ */ k(() => J("tip.nav.launcherMobileView")), n = /* @__PURE__ */ k(() => L(r).nav.launcher?.mobileView ?? ""), i = /* @__PURE__ */ k(() => [["", J("lbl.navSameAsDesktop")], ...L(D)]);
						eu(s, {
							get label() {
								return L(e);
							},
							get title() {
								return L(t);
							},
							get value() {
								return L(n);
							},
							get options() {
								return L(i);
							},
							onchange: (e) => be("mobileView", e || void 0)
						});
					}
					var c = F(s, 2), l = M(c), u = P(l, !0), d = F(l, 2);
					G(d);
					var f = P(F(d, 2), !0);
					E(c);
					var p = F(c, 2), m = M(p);
					G(m);
					var g = F(m);
					E(p);
					var _ = F(p, 2), y = (e) => {
						var t = Ag(), n = M(t), i = P(n, !0), a = F(n, 2);
						G(a), E(t), I((e, n, o) => {
							q(t, "title", e), V(i, n), q(a, "placeholder", o), K(a, L(r).nav.launcher?.title ?? "");
						}, [
							() => J("tip.nav.launcherTitleText"),
							() => J("lbl.launcherTitle"),
							() => J("ph.launcherTitle")
						]), R("change", a, (e) => be("title", e.target.value.trim() || void 0)), B(e, t);
					};
					H(_, (e) => {
						L(r).nav.launcher?.showTitle !== !1 && e(y);
					});
					var b = F(_, 2), x = M(b), S = P(x, !0), C = F(x, 2), w = M(C);
					{
						let e = /* @__PURE__ */ k(() => L(r).nav.launcher?.icon ?? ""), t = /* @__PURE__ */ k(() => L(r).nav.launcher?.image ?? ""), n = /* @__PURE__ */ k(ve), i = /* @__PURE__ */ k(() => J("opt.launcherDots")), a = /* @__PURE__ */ k(() => J("tip.nav.launcherIcon"));
						Vd(w, {
							get icon() {
								return L(e);
							},
							get image() {
								return L(t);
							},
							get images() {
								return L(n);
							},
							klass: "lbtn-mark",
							get noneLabel() {
								return L(i);
							},
							get label() {
								return L(a);
							},
							onpick: (e) => ye(null, e),
							onfile: (e) => Te(e, null),
							children: (e, t) => {
								var n = Hr(), i = N(n), a = (e) => {
									var t = tg();
									I(() => q(t, "src", L(r).nav.launcher.image)), B(e, t);
								}, o = (e) => {
									var t = Hr();
									U(N(t), () => Cu(L(r).nav.launcher.icon) || ""), B(e, t);
								}, s = (e) => {
									var t = Hr();
									U(N(t), () => ge), B(e, t);
								};
								H(i, (e) => {
									L(r).nav.launcher?.image ? e(a) : L(r).nav.launcher?.icon ? e(o, 1) : e(s, -1);
								}), B(e, n);
							},
							$$slots: { default: !0 }
						});
					}
					var T = F(w, 2), ee = M(T), te = (e) => {
						var t = Vr();
						I((e) => V(t, e), [() => J("mp.ownImage")]), B(e, t);
					}, ne = (e) => {
						var t = Vr();
						I((e) => V(t, e), [() => J(xu[L(r).nav.launcher.icon]?.labelKey ?? "common.none")]), B(e, t);
					}, re = (e) => {
						var t = Vr();
						I((e) => V(t, e), [() => J("opt.launcherDots")]), B(e, t);
					};
					H(ee, (e) => {
						L(r).nav.launcher?.image ? e(te) : L(r).nav.launcher?.icon ? e(ne, 1) : e(re, -1);
					}), E(T), E(C), E(b);
					var ie = F(b, 2);
					ri(ie, 17, () => L(r).nav.launcher?.links ?? [], $r, (e, t, n) => {
						let i = /* @__PURE__ */ k(() => !Zh(L(t).href ?? ""));
						var a = Fg();
						let o;
						var s = M(a), c = M(s), l = M(c), u = (e) => {
							var n = tg();
							I(() => q(n, "src", L(t).image)), B(e, n);
						}, d = (e) => {
							var n = Hr();
							U(N(n), () => Cu(L(t).icon) || ""), B(e, n);
						};
						H(l, (e) => {
							L(t).image ? e(u) : e(d, -1);
						}), E(c);
						var f = F(c, 2), p = P(f, !0), m = F(f, 2), h = (e) => {
							var t = jg();
							U(t, () => X.warn, !0), E(t), I((e) => q(t, "title", e), [() => J("tip.badTarget")]), B(e, t);
						};
						H(m, (e) => {
							L(i) && e(h);
						});
						var g = F(m, 2), _ = M(g);
						_.disabled = n === 0, U(_, () => X.up, !0), E(_);
						var v = F(_, 2);
						U(v, () => X.down, !0), E(v), E(g);
						var y = F(g, 2);
						U(y, () => X.caret, !0), E(y), E(s);
						var b = F(s, 2), x = (e) => {
							var r = Pg(), a = M(r);
							{
								let e = /* @__PURE__ */ k(() => L(t).icon ?? ""), r = /* @__PURE__ */ k(() => L(t).image ?? ""), i = /* @__PURE__ */ k(ve), o = /* @__PURE__ */ k(() => J("mp.pickMark"));
								Vd(a, {
									get icon() {
										return L(e);
									},
									get image() {
										return L(r);
									},
									get images() {
										return L(i);
									},
									klass: "lrow-tile",
									get label() {
										return L(o);
									},
									onpick: (e) => ye(n, e),
									onfile: (e) => Te(e, n),
									children: (e, n) => {
										var r = Mg(), i = N(r), a = M(i), o = (e) => {
											var n = tg();
											I(() => q(n, "src", L(t).image)), B(e, n);
										}, s = (e) => {
											var n = Hr();
											U(N(n), () => Cu(L(t).icon) || ""), B(e, n);
										};
										H(a, (e) => {
											L(t).image ? e(o) : L(t).icon && e(s, 1);
										}), E(i);
										var c = P(F(i, 2), !0);
										I((e) => V(c, e), [() => L(t).label || J("seed.link")]), B(e, r);
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
								var t = Ng(), n = P(t, !0);
								I((e) => V(n, e), [() => J("ui.badTarget")]), B(e, t);
							};
							H(u, (e) => {
								L(i) && e(d);
							});
							var f = F(u, 2), p = M(f);
							{
								let e = /* @__PURE__ */ k(() => L(t).icon ?? ""), r = /* @__PURE__ */ k(() => L(t).image ?? ""), i = /* @__PURE__ */ k(ve), a = /* @__PURE__ */ k(() => J("mp.pickMark"));
								Vd(p, {
									get icon() {
										return L(e);
									},
									get image() {
										return L(r);
									},
									get images() {
										return L(i);
									},
									klass: "linkish",
									get label() {
										return L(a);
									},
									onpick: (e) => ye(n, e),
									onfile: (e) => Te(e, n),
									children: (e, t) => {
										ke();
										var n = Vr();
										I((e) => V(n, e), [() => J("mp.changeMark")]), B(e, n);
									},
									$$slots: { default: !0 }
								});
							}
							var m = F(p, 2), h = P(m, !0);
							E(f), E(o), E(r), I((e, n, r, a, o, u) => {
								K(s, L(t).label), q(s, "title", e), q(s, "placeholder", n), l = W(c, 1, "field-filled", null, l, { "bad-target": L(i) }), K(c, L(t).href ?? ""), q(c, "placeholder", r), q(c, "title", a), q(m, "title", o), V(h, u);
							}, [
								() => J("tip.nav.launcherLabel"),
								() => J("lbl.text"),
								() => J("ph.hrefAnchor"),
								() => L(i) ? J("tip.badTarget") : J("tip.hrefAnchor"),
								() => J("tip.removeLink"),
								() => J("ui.remove")
							]), R("change", s, (e) => we(n, "label", e.target.value)), R("change", c, (e) => we(n, "href", e.target.value)), R("click", m, () => Se(n)), B(e, r);
						};
						H(b, (e) => {
							L(_e) === n && e(x);
						}), E(a), I((e, t, i) => {
							o = W(a, 1, "lrow", null, o, { open: L(_e) === n }), V(p, e), q(_, "title", t), q(v, "title", i), v.disabled = n === L(r).nav.launcher.links.length - 1;
						}, [
							() => L(t).label || J("seed.link"),
							() => J("tip.moveUp"),
							() => J("tip.moveDown")
						]), R("click", s, () => j(_e, L(_e) === n ? null : n, !0)), R("keydown", s, (e) => {
							(e.key === "Enter" || e.key === " ") && (e.preventDefault(), j(_e, L(_e) === n ? null : n, !0));
						}), R("click", g, (e) => e.stopPropagation()), R("keydown", g, (e) => e.stopPropagation()), R("click", _, () => Ce(n, -1)), R("click", v, () => Ce(n, 1)), B(e, a);
					});
					var ae = F(ie, 2), oe = P(ae, !0);
					I((e, t, n, i, s, l, h, _) => {
						V(a, e), q(o, "aria-label", t), q(c, "title", n), V(u, i), K(d, L(r).nav.launcher?.mobileMax ?? 6), V(f, L(r).nav.launcher?.mobileMax ?? 6), q(p, "title", s), Ni(m, L(r).nav.launcher?.showTitle !== !1), V(g, ` ${l ?? ""}`), V(S, h), V(oe, _);
					}, [
						() => J("lbl.design"),
						() => J("lbl.design"),
						() => J("tip.nav.launcherMobileMax"),
						() => J("lbl.launcherMobileMax"),
						() => J("tip.nav.launcherTitle"),
						() => J("lbl.launcherShowTitle"),
						() => J("lbl.launcherButton"),
						() => J("ui.addLauncherLink")
					]), R("input", d, (e) => be("mobileMax", e.target.valueAsNumber === 6 ? void 0 : e.target.valueAsNumber)), R("change", m, (e) => be("showTitle", e.target.checked ? void 0 : !1)), R("click", ae, xe), B(e, t);
				};
				H(m, (e) => {
					L(r).nav.launcher?.show === !0 && e(g);
				}), E(u), E(a), I((e, t, n, i) => {
					q(o, "title", e), V(c, t), q(d, "title", n), Ni(f, L(r).nav.launcher?.show === !0), V(p, ` ${i ?? ""}`);
				}, [
					() => J("tip.nav.launcher"),
					() => J("group.launcher"),
					() => J("tip.nav.launcher"),
					() => J("lbl.showInMenu")
				]), R("change", f, (e) => be("show", e.target.checked ? !0 : void 0)), B(t, a);
			};
			H(o, (e) => {
				n === "theme" ? e(s) : n === "cart" ? e(c, 1) : e(u, -1);
			}), B(t, a);
		}), E(si);
	}
	E(ii);
	var fi = F(ii, 2), pi = M(fi), mi = P(pi, !0), hi = F(pi, 2), gi = M(hi), _i = M(gi), vi = P(_i, !0), yi = F(_i, 2);
	let bi;
	ri(yi, 21, () => L(Fe), ([e, t]) => e, (e, t) => {
		var n = /* @__PURE__ */ k(() => h(L(t), 2));
		let i = () => L(n)[0], a = () => L(n)[1];
		var o = ig();
		let s;
		var c = M(o);
		U(c, () => _[i()]);
		var l = P(F(c), !0);
		E(o), I(() => {
			s = W(o, 1, "tile", null, s, { on: (L(r).nav.style?.subStyle ?? "card") === i() }), q(o, "aria-pressed", (L(r).nav.style?.subStyle ?? "card") === i()), V(l, a());
		}), R("click", o, () => re("subStyle", i() === "card" ? void 0 : i())), B(e, o);
	}), E(yi), E(gi);
	var xi = F(gi, 2), Si = (e) => {
		var t = gg(), n = N(t), i = (e) => {
			var t = gg(), n = N(t);
			{
				let e = /* @__PURE__ */ k(() => J("lbl.sideSubs")), t = /* @__PURE__ */ k(() => J("tip.nav.sideSubs")), i = /* @__PURE__ */ k(() => L(r).nav.style?.sideSubs ?? "collapsed"), a = /* @__PURE__ */ k(() => [["collapsed", J("opt.mobileSubs.collapsed")], ["expanded", J("opt.mobileSubs.expanded")]]);
				eu(n, {
					get label() {
						return L(e);
					},
					get title() {
						return L(t);
					},
					get value() {
						return L(i);
					},
					get options() {
						return L(a);
					},
					onchange: (e) => re("sideSubs", e === "collapsed" ? void 0 : e)
				});
			}
			var i = F(n, 2), a = (e) => {
				var t = mg(), n = M(t);
				G(n);
				var i = F(n);
				E(t), I((e, a) => {
					q(t, "title", e), Ni(n, L(r).nav.style?.sideSubArrow === !0), V(i, ` ${a ?? ""}`);
				}, [() => J("tip.nav.sideSubArrow"), () => J("lbl.sideSubArrow")]), R("change", n, (e) => re("sideSubArrow", e.target.checked ? !0 : void 0)), B(e, t);
			};
			H(i, (e) => {
				L(r).nav.style?.sideSubs === "expanded" && e(a);
			}), B(e, t);
		};
		H(n, (e) => {
			L(ie) && e(i);
		});
		var a = F(n, 2), o = (e) => {
			{
				let t = /* @__PURE__ */ k(() => J("lbl.subOpen")), n = /* @__PURE__ */ k(() => J("tip.nav.subOpen")), i = /* @__PURE__ */ k(() => L(r).nav.style?.subOpen ?? "hover"), a = /* @__PURE__ */ k(() => [
					["hover", J("opt.subOpen.hover")],
					["stay", J("opt.subOpen.stay")],
					["click", J("opt.subOpen.click")]
				]);
				eu(e, {
					get label() {
						return L(t);
					},
					get title() {
						return L(n);
					},
					get value() {
						return L(i);
					},
					get options() {
						return L(a);
					},
					onchange: (e) => re("subOpen", e === "hover" ? void 0 : e)
				});
			}
		};
		H(a, (e) => {
			(!L(ie) || L(r).nav.style?.sideSubs !== "expanded") && e(o);
		}), B(e, t);
	}, Ci = /* @__PURE__ */ k(() => L(r).nav.items?.some((e) => e.children?.length));
	H(xi, (e) => {
		L(Ci) && e(Si);
	});
	var wi = F(xi, 2), Ti = (e) => {
		var t = Rg(), n = M(t), i = F(n);
		{
			let e = /* @__PURE__ */ k(() => L(r).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ k(u), n = /* @__PURE__ */ k(() => J("tip.nav.subPillColorPick"));
			Pa(i, {
				get value() {
					return L(e);
				},
				get tokens() {
					return L(t);
				},
				get label() {
					return L(n);
				},
				onchange: (e) => re("subPillColor", e)
			});
		}
		E(t), I((e, r) => {
			q(t, "title", e), V(n, `${r ?? ""} `);
		}, [() => J("tip.nav.subPillColor"), () => J("lbl.subPillColor")]), B(e, t);
	};
	H(wi, (e) => {
		L(r).nav.style?.subStyle === "pills" && e(Ti);
	});
	var Ei = F(wi, 2), Di = M(Ei), Oi = F(Di);
	G(Oi), E(Ei), E(hi), E(fi);
	var ki = F(fi, 2), Ai = M(ki), ji = P(Ai, !0), Mi = F(Ai, 2);
	{
		let e = (e, t = f) => {
			let n = /* @__PURE__ */ k(Xe);
			var r = zg();
			let i;
			var a = M(r);
			U(a, () => it, !0), E(a);
			var o = F(a, 2), s = M(o), c = P(s, !0), l = P(F(s, 2), !0);
			E(o), E(r), I(() => {
				i = W(r, 1, "nav-item ghost", null, i, { child: t() }), V(c, L(n).label), V(l, L(n).target);
			}), B(e, r);
		};
		var Pi = M(Mi);
		ri(Pi, 21, () => L(r).nav.items, $r, (t, n, i) => {
			let a = /* @__PURE__ */ k(() => `${i}`);
			var o = Ug(), s = N(o), c = (t) => {
				e(t, () => !1);
			};
			H(s, (e) => {
				L(Ke)?.key === L(a) && L(Ke).pos === "before" && e(c);
			});
			var l = F(s, 2);
			let u;
			var d = M(l);
			U(d, () => it, !0), E(d);
			var f = F(d, 2), p = M(f);
			G(p);
			var m = F(p, 2), h = M(m);
			{
				let e = /* @__PURE__ */ k(() => L(n).page ?? (L(n).href == null ? "__none" : "__href")), t = /* @__PURE__ */ k(() => J("tip.linkTarget")), a = /* @__PURE__ */ k(() => [
					...L(r).pages.map((e) => [e.id, e.title]),
					["__href", J("opt.linkHref")],
					...L(n).children ? [["__none", J("opt.noLink")]] : []
				]);
				Y(h, {
					compact: !0,
					get value() {
						return L(e);
					},
					get title() {
						return L(t);
					},
					get options() {
						return L(a);
					},
					onchange: (e) => Be(i, e)
				});
			}
			var g = F(h, 2), _ = (e) => {
				var t = Bg();
				G(t), I((e, r) => {
					K(t, L(n).href), q(t, "placeholder", e), q(t, "title", r);
				}, [() => J("ph.hrefAnchor"), () => J("tip.hrefAnchor")]), R("change", t, (e) => Ve(i, e.target.value)), B(e, t);
			};
			H(g, (e) => {
				!L(n).page && L(n).href != null && e(_);
			}), E(m), E(f);
			var v = F(f, 2), y = (e) => {
				var t = Vg();
				U(t, () => "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M6 9l6 6 6-6\"/></svg>", !0), E(t), I((e) => q(t, "title", e), [() => J("tip.nav.hasSubmenu")]), B(e, t);
			};
			H(v, (e) => {
				L(n).children?.length && e(y);
			});
			var b = F(v, 2), x = M(b);
			U(x, () => X.plus, !0), E(x);
			var S = F(x, 2);
			S.disabled = i === 0, U(S, () => X.up, !0), E(S);
			var C = F(S, 2);
			U(C, () => X.cross, !0), E(C);
			var w = F(C, 2);
			U(w, () => X.down, !0), E(w), E(b);
			var T = F(b, 2);
			U(T, () => X.kebab, !0), E(T), E(l);
			var ee = F(l, 2);
			ri(ee, 17, () => L(n).children ?? [], $r, (t, a, o) => {
				let s = /* @__PURE__ */ k(() => `${i}.${o}`);
				var c = Hg(), l = N(c), u = (t) => {
					e(t, () => !0);
				};
				H(l, (e) => {
					L(Ke)?.key === L(s) && L(Ke).pos === "before" && e(u);
				});
				var d = F(l, 2);
				let f;
				var p = M(d);
				U(p, () => it, !0), E(p);
				var m = F(p, 2), h = M(m);
				G(h);
				var g = F(h, 2), _ = M(g);
				{
					let e = /* @__PURE__ */ k(() => L(a).page ?? "__href"), t = /* @__PURE__ */ k(() => J("tip.linkTarget")), n = /* @__PURE__ */ k(() => [...L(r).pages.map((e) => [e.id, e.title]), ["__href", J("opt.linkHref")]]);
					Y(_, {
						compact: !0,
						get value() {
							return L(e);
						},
						get title() {
							return L(t);
						},
						get options() {
							return L(n);
						},
						onchange: (e) => ct(i, o, e)
					});
				}
				var v = F(_, 2), y = (e) => {
					var t = Bg();
					G(t), I((e, n) => {
						K(t, L(a).href ?? ""), q(t, "placeholder", e), q(t, "title", n);
					}, [() => J("ph.hrefAnchor"), () => J("tip.hrefAnchor")]), R("change", t, (e) => lt(i, o, e.target.value)), B(e, t);
				};
				H(v, (e) => {
					L(a).page || e(y);
				}), E(g), E(m);
				var b = F(m, 2), x = M(b);
				x.disabled = o === 0, U(x, () => X.up, !0), E(x);
				var S = F(x, 2);
				U(S, () => X.cross, !0), E(S);
				var C = F(S, 2);
				U(C, () => X.down, !0), E(C), E(b);
				var w = F(b, 2);
				U(w, () => X.kebab, !0), E(w), E(d);
				var T = F(d, 2), ee = (t) => {
					e(t, () => !0);
				};
				H(T, (e) => {
					L(Ke)?.key === L(s) && L(Ke).pos === "after" && e(ee);
				}), I((e, t, r, i, c, l, u) => {
					f = W(d, 1, "nav-item child", null, f, {
						selected: L(We) === L(s),
						dragging: L(Ge) === L(s)
					}), q(d, "data-key", L(s)), q(p, "title", e), K(h, L(a).label), q(h, "title", t), q(x, "title", r), q(S, "title", i), q(C, "title", c), C.disabled = o === L(n).children.length - 1, q(w, "title", l), q(w, "aria-label", u);
				}, [
					() => J("tip.nav.dragItem"),
					() => J("tip.nav.childLabel"),
					() => J("tip.moveUp"),
					() => J("tip.nav.removeChild"),
					() => J("tip.moveDown"),
					() => J("tip.nav.itemActions"),
					() => J("tip.nav.itemActions")
				]), R("click", d, (e) => {
					e.stopPropagation(), j(We, L(s));
				}), Mr("dragstart", p, (e) => {
					e.stopPropagation(), j(Ge, L(s)), e.dataTransfer?.setData($e, L(s));
				}), Mr("dragend", p, Ze), R("input", h, (e) => st(i, o, e.target.value)), R("click", x, () => ut(i, o, -1)), R("click", S, () => dt(i, o)), R("click", C, () => ut(i, o, 1)), R("click", w, (e) => {
					e.stopPropagation(), j(We, L(s));
				}), B(t, c);
			});
			var te = F(ee, 2), ne = (t) => {
				e(t, () => !0);
			};
			H(te, (e) => {
				L(Ke)?.key === L(a) && L(Ke).pos === "into" && e(ne);
			});
			var re = F(te, 2), ie = (t) => {
				e(t, () => !1);
			};
			H(re, (e) => {
				L(Ke)?.key === L(a) && L(Ke).pos === "after" && e(ie);
			}), I((e, t, o, s, c, f, m, h) => {
				u = W(l, 1, "nav-item", null, u, {
					selected: L(We) === L(a),
					dragging: L(Ge) === L(a),
					"drop-target": L(Ke)?.key === L(a) && L(Ke).pos === "into"
				}), q(l, "data-key", L(a)), q(d, "title", e), K(p, L(n).label), q(p, "title", t), q(x, "title", o), q(S, "title", s), q(C, "title", c), q(w, "title", f), w.disabled = i === L(r).nav.items.length - 1, q(T, "title", m), q(T, "aria-label", h);
			}, [
				() => J("tip.nav.dragItem"),
				() => J("tip.nav.itemLabel"),
				() => J("tip.nav.addChild"),
				() => J("tip.moveUp"),
				() => J("tip.nav.removeItem"),
				() => J("tip.moveDown"),
				() => J("tip.nav.itemActions"),
				() => J("tip.nav.itemActions")
			]), R("click", l, () => {
				j(We, L(a));
			}), Mr("dragstart", d, (e) => {
				j(Ge, L(a)), e.dataTransfer?.setData($e, L(a));
			}), Mr("dragend", d, Ze), R("input", p, (e) => ze(i, e.target.value)), R("click", x, () => ot(i)), R("click", S, () => He(i, -1)), R("click", C, () => Ue(i)), R("click", w, () => He(i, 1)), R("click", T, () => {
				j(We, L(a));
			}), B(t, o);
		}), E(Pi);
		var Fi = F(Pi, 2), Ii = P(Fi, !0), Ri = F(Fi, 2), zi = M(Ri);
		G(zi);
		var Bi = F(zi, 2), Vi = P(Bi, !0);
		E(Ri), E(Mi), I((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, ee, te, ne, re, ie, ae, oe, se, ce, le, ue, de, fe, pe, me, he, ge, _e, ve, ye, be, xe, Se, Ce, we, Te, Ee, De, Oe, E, ke, Ae) => {
			V(Ii, De), q(Ri, "title", Oe), q(zi, "placeholder", E), Bi.disabled = ke, V(Vi, Ae);
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
			() => !L(y).trim(),
			() => J("ui.newPageAsItem")
		]), Mr("dragover", Pi, nt), Mr("drop", Pi, (e) => {
			e.preventDefault(), rt(L(Ke)?.key ?? "");
		}), R("click", Fi, at), R("keydown", zi, (e) => {
			e.key === "Enter" && b();
		}), Li(zi, () => L(y), (e) => j(y, e)), R("click", Bi, b);
	}
	E(ki), E(ft), I((e, t, n, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, ee, te, ne, re, ae, oe, se, le, ue, de, fe, pe, me, he, ge, _e, ve, ye, be, xe, Se, Ce, we, Te, Ee, De, Oe, E, ke, Ae, je, Me, Ne) => {
		q(mt, "title", e), V(ht, t), V(Et, n), V(At, i), q(Mt, "title", a), V(Pt, o), q(Ft, "aria-label", s), q(Jt, "title", c), V(Yt, l), q(Zt, "title", u), V(en, d), q(an, "title", f), V(sn, p), q(cn, "min", Oh.min), q(cn, "max", Oh.max), q(cn, "step", Oh.step), K(cn, L(ce)), q(ln, "min", Oh.min), q(ln, "max", Oh.max), K(ln, L(ce)), V(mn, m), V(Sn, h), q(Dn, "title", g), V(kn, _), q(Pn, "title", v), V(In, y), q(Ln, "min", Oh.min), q(Ln, "max", Oh.max), q(Ln, "placeholder", b), K(Ln, L(r).nav.style?.mobile?.textSize ?? ""), q(zn, "title", x), V(Vn, S), q(Un, "title", C), V(Gn, w), q(Jn, "title", T), V(Xn, ee), q(tr, "title", te), V(rr, ne), q(cr, "title", re), V(ur, ae), V(xr, oe), V(Tr, se), q(Er, "aria-label", le), q(Nr, "title", ue), V(Fr, de), q(Ir, "title", fe), V(Rr, pe), q(zr, "title", me), Ni(Br, L(r).nav.style?.blur !== !1), V(z, ` ${he ?? ""}`), V(Gr, ge), q(Jr, "title", _e), V(Yr, ve), q(Zr, "title", ye), Ni(Qr, L(r).nav.announcement?.show === !0), V(ei, ` ${be ?? ""}`), q(ai, "title", xe), V(oi, Se), V(mi, Ce), V(vi, we), bi = W(yi, 1, "tile-grid", null, bi, {
			"cols-5": !L(ie),
			"cols-3": L(ie)
		}), q(yi, "aria-label", Te), q(Ei, "title", Ee), V(Di, `${De ?? ""} `), K(Oi, L(r).nav.style?.subColumns ?? 1), q(Ai, "title", Oe), V(ji, E);
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
		() => !L(y).trim(),
		() => J("ui.newPageAsItem")
	]), R("input", cn, (e) => re("textSize", e.target.valueAsNumber)), R("change", ln, (e) => De(e, "textSize", Oh)), R("change", Ln, (e) => Oe(e, "textSize", Oh)), R("change", Br, (e) => re("blur", e.target.checked)), R("change", Qr, (e) => he("show", e.target.checked ? !0 : void 0)), R("change", Oi, (e) => re("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), B(e, ft), tt();
}
Nr([
	"input",
	"change",
	"click",
	"keydown"
]);
var Kg = 1920, qg = [
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
], Jg = [
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
], Yg = [
	1920,
	1536,
	1366
];
function Xg(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 1440;
	let n = Math.round(t / 20) * 20;
	return Math.min(Kg, Math.max(960, n));
}
function Zg(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 6;
	let n = Math.round(t / 1) * 1;
	return Math.min(12, Math.max(0, n));
}
function Qg(e, t) {
	if (e === "full") return 0;
	let n = Math.min(49, Math.max(0, Number(t) || 0));
	return Math.ceil(Number(e) / (1 - 2 * n / 100));
}
function $g(e, t, n) {
	let r = Math.max(0, Number(t) || 0) / 100 * n, i = Math.max(0, n - 2 * r), a = e !== "full" && Number(e) < i, o = a ? Number(e) : i;
	return {
		width: o,
		margin: Math.round((n - o) / 2),
		pct: n > 0 ? o / n * 100 : 0,
		bound: a
	};
}
function e_(e) {
	return Jg.find((t) => t.width === e)?.id ?? null;
}
//#endregion
//#region ../template/assets/engine/0.7.4/calendar-format.js
function t_(e) {
	if (typeof e != "string" || !e.trim()) return !1;
	try {
		return new Intl.DateTimeFormat("en", { timeZone: e.trim() }), !0;
	} catch {
		return !1;
	}
}
//#endregion
//#region ../template/assets/engine/0.7.4/map-links.js
var n_ = {
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
}, r_ = Object.keys(n_);
function i_(e) {
	let t = e?.site?.mapService;
	return Object.hasOwn(n_, t) ? t : "osm";
}
//#endregion
//#region ../template/assets/engine/0.7.4/meeting-links.js
var a_ = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/;
function o_(e) {
	let t = Array.isArray(e) ? e : String(e ?? "").split(/[\s,;]+/), n = [];
	for (let e of t) {
		let t = String(e ?? "").trim().toLowerCase();
		if (!t) continue;
		let r = "";
		try {
			r = new URL(/^[a-z][a-z0-9+.-]*:\/\//.test(t) ? t : `https://${t}`).hostname;
		} catch {}
		a_.test(r) && !n.includes(r) && n.push(r);
	}
	return n;
}
//#endregion
//#region src/panels/SitePanel.svelte
var s_ = /* @__PURE__ */ z("<p class=\"panel-hint place-error\"> </p>"), c_ = /* @__PURE__ */ z("<span class=\"site-cal-color\"><!> <span> </span></span>"), l_ = /* @__PURE__ */ z("<div><button type=\"button\" class=\"site-cal-head\"><span class=\"site-cal-dot\" aria-hidden=\"true\"></span> <span class=\"site-cal-text\"><span class=\"site-cal-name\"> </span> <span class=\"site-cal-addr\"> </span></span> <span class=\"site-cal-chev\" aria-hidden=\"true\"></span></button> <div class=\"site-cal-body\"><div class=\"site-cal-clip\"><div class=\"site-cal-fields\"><span class=\"mini-label site-cal-section\"> </span> <label class=\"site-cal-field\"> <input/></label> <label class=\"site-cal-field\"> <input spellcheck=\"false\"/></label> <label class=\"site-cal-field\"> <input/></label> <span class=\"mini-label site-cal-section\"> </span> <div class=\"site-cal-colors\"><span class=\"site-cal-color\"><!> <span> </span></span> <!></div> <span class=\"mini-label site-cal-section\"> </span> <label class=\"site-cal-field\"> <input placeholder=\"https://\" spellcheck=\"false\"/></label> <label class=\"site-cal-field\"> <input/></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <div class=\"site-cal-foot\"><span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span> <button type=\"button\" class=\"site-cal-remove\"> </button></div></div></div></div></div>"), u_ = /* @__PURE__ */ z("<div class=\"site-cal-list\"></div>"), d_ = /* @__PURE__ */ z("<div class=\"cw-row\"><span class=\"mini-label cw-screen\"> </span> <span><span class=\"cw-fill\"></span></span> <span class=\"gridmenu-value cw-margin\"> </span></div>"), f_ = /* @__PURE__ */ z("<div class=\"mini-label cw-binds\"> </div>"), p_ = /* @__PURE__ */ z("<button> </button>"), m_ = /* @__PURE__ */ z("<div class=\"ctl-row\"><span class=\"mini-label\"> </span> <input type=\"range\"/> <span class=\"gridmenu-value\"> </span></div>"), h_ = /* @__PURE__ */ z("<img class=\"site-icon-preview\"/>"), g_ = /* @__PURE__ */ z("<button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button>", 1), __ = /* @__PURE__ */ z("<div class=\"panel-body\"><label> <input/></label> <label> <input/></label> <label> <!></label> <label> <input placeholder=\"Europe/Oslo\" spellcheck=\"false\"/></label> <!> <label> <!></label> <label> <input placeholder=\"meet.example.org\" spellcheck=\"false\"/></label> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><button type=\"button\" class=\"site-cal-add\"><!> </button> <!></div></details> <hr class=\"gridmenu-divider\"/> <p class=\"panel-strong\"> </p> <div class=\"sample cw-sample\"><!> <div class=\"cw-legend\"><span class=\"mini-label\"> </span> <span class=\"mini-label\"> </span></div> <!></div> <div class=\"seg cw-seg\"></div> <!> <p class=\"mini-label\"> </p> <div class=\"seg cw-seg\"></div> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><div class=\"ctl-row\"><span class=\"mini-label\"> </span> <input type=\"range\"/> <span class=\"gridmenu-value\"> </span></div></div></details> <hr class=\"gridmenu-divider\"/> <label> <!></label> <span class=\"toolbar-row\"><label class=\"ghost filepick tb-grow\"> <input type=\"file\" accept=\"image/*\"/></label> <!></span></div>");
function v_(e, t) {
	et(t, !0);
	let n = Qe("urd-editor"), r = /* @__PURE__ */ k(() => n.bindsFrom), i = /* @__PURE__ */ k(() => n.layoutGutter), a = /* @__PURE__ */ k(() => n.layoutWidth), o = /* @__PURE__ */ k(() => n.siteDraft), { addSiteCalendar: s, setStatus: c, siteCalendars: l, siteLangOptions: u, siteLangValue: d, siteMutate: f, svgAutoTrim: p, themeSwatches: m } = n;
	async function g(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		if (t.type === "image/svg+xml" || /\.svg$/i.test(t.name || "")) {
			try {
				let e = await p(t);
				n.iconEditorImage = e.dataUrl;
			} catch {
				c(J("status.imageReadErrorSvg"), "error");
			}
			return;
		}
		let r = new FileReader();
		r.onload = () => {
			n.iconEditorImage = String(r.result);
		}, r.onerror = () => c(J("status.imageReadError"), "error"), r.readAsDataURL(t);
	}
	function _() {
		f("edit:site-icon", () => {
			delete L(o).site.icon;
		});
	}
	function v(e) {
		f("edit:site-title", () => {
			L(o).site.title = e;
		});
	}
	function y(e) {
		f("edit:site-desc", () => {
			L(o).site.description = e;
		});
	}
	let b = /* @__PURE__ */ k(() => e_(L(a))), x = /* @__PURE__ */ k(() => qg.find((e) => e.gutter === L(i))?.id ?? null), S = /* @__PURE__ */ A(!1), C = /* @__PURE__ */ k(() => L(a) === "full" ? Kg : Xg(L(a))), w = /* @__PURE__ */ k(() => Yg.map((e) => ({
		screen: e,
		...$g(L(a), L(i), e)
	})));
	function T(e, t) {
		f(t, () => {
			let t = {
				...L(o).layout ?? {},
				contentWidth: L(a),
				gutter: L(i),
				...e
			};
			for (let e of Object.keys(t)) t[e] === void 0 && delete t[e];
			L(o).layout = t;
		});
	}
	let ee = (e) => T({ contentWidth: e === "full" ? "full" : Xg(e) }, "edit:site-width"), te = (e) => T({ gutter: Zg(e) }, "edit:site-gutter");
	function ne(e) {
		f("site", () => {
			L(o).site.lang = e;
		});
	}
	function re(e) {
		let t = o_(e);
		f("site", () => {
			t.length ? L(o).site.meetingHosts = t : delete L(o).site.meetingHosts;
		});
	}
	function ie(e) {
		f("site", () => {
			L(o).site.calendars[e]?.id === n.openSiteCalendar && (n.openSiteCalendar = null), L(o).site.calendars.splice(e, 1), L(o).site.calendars.length || delete L(o).site.calendars;
		});
	}
	function ae(e, t) {
		f("site", () => {
			let n = L(o).site.calendars, r = e + t;
			r < 0 || r >= n.length || ([n[e], n[r]] = [n[r], n[e]]);
		});
	}
	function oe(e, t, n, r = !1) {
		let i = String(n ?? "").trim();
		f(`edit:site-cal-${e}-${t}`, () => {
			let n = L(o).site.calendars[e];
			i || r ? n[t] = i : delete n[t];
		});
	}
	function se(e, t, n) {
		f("site", () => {
			let r = L(o).site.calendars[e];
			n ? delete r[t] : r[t] = !1;
		});
	}
	function ce(e) {
		f("site", () => {
			e && e !== "osm" ? L(o).site.mapService = e : delete L(o).site.mapService;
		});
	}
	function le(e) {
		let t = e.trim();
		n.siteZoneBad = t !== "" && !t_(t), !n.siteZoneBad && f("site", () => {
			t ? L(o).site.timeZone = t : delete L(o).site.timeZone;
		});
	}
	var ue = __(), de = M(ue), fe = M(de), pe = F(fe);
	G(pe), E(de);
	var me = F(de, 2), he = M(me), ge = F(he);
	G(ge), E(me);
	var _e = F(me, 2), ve = M(_e), ye = F(ve);
	{
		let e = /* @__PURE__ */ k(d), t = /* @__PURE__ */ k(u);
		Y(ye, {
			get value() {
				return L(e);
			},
			get options() {
				return L(t);
			},
			onchange: (e) => ne(e)
		});
	}
	E(_e);
	var be = F(_e, 2), xe = M(be), Se = F(xe);
	G(Se);
	let Ce;
	E(be);
	var we = F(be, 2), Te = (e) => {
		var t = s_(), n = P(t, !0);
		I((e) => V(n, e), [() => J("settings.timeZoneBad")]), B(e, t);
	};
	H(we, (e) => {
		n.siteZoneBad && e(Te);
	});
	var Ee = F(we, 2), De = M(Ee), Oe = F(De);
	{
		let e = /* @__PURE__ */ k(() => i_(L(o))), t = /* @__PURE__ */ k(() => r_.map((e) => [
			e,
			J(`mapService.${e}`),
			J(`mapService.${e}.note`)
		]));
		Y(Oe, {
			get value() {
				return L(e);
			},
			get options() {
				return L(t);
			},
			onchange: (e) => ce(e)
		});
	}
	E(Ee);
	var ke = F(Ee, 2), Ae = M(ke), je = F(Ae);
	G(je), E(ke);
	var Me = F(ke, 2), Ne = M(Me), Pe = P(Ne, !0), D = F(Ne, 2), Fe = M(D), Ie = M(Fe);
	U(Ie, () => X.plus);
	var O = F(Ie);
	E(Fe);
	var Le = F(Fe, 2), Re = (e) => {
		var t = u_();
		ri(t, 23, l, (e) => e.id, (e, t, r) => {
			let i = /* @__PURE__ */ k(() => n.openSiteCalendar === L(t).id);
			var a = l_();
			let o;
			var s = M(a), c = M(s);
			let u;
			var d = F(c, 2), f = M(d), p = P(f, !0), g = P(F(f, 2), !0);
			E(d);
			var _ = F(d, 2);
			U(_, () => X.down, !0), E(_), E(s);
			var v = F(s, 2), y = M(v), b = M(y), x = M(b), S = P(x, !0), C = F(x, 2), w = M(C), T = F(w);
			G(T), E(C);
			var ee = F(C, 2), te = M(ee), ne = F(te);
			G(ne), E(ee);
			var re = F(ee, 2), ce = M(re), le = F(ce);
			G(le), E(re);
			var ue = F(re, 2), de = P(ue, !0), fe = F(ue, 2), pe = M(fe), me = M(pe);
			{
				let e = /* @__PURE__ */ k(() => L(t).color || "accent"), n = /* @__PURE__ */ k(m), i = /* @__PURE__ */ k(() => J("siteCal.colorMain"));
				Pa(me, {
					get value() {
						return L(e);
					},
					get tokens() {
						return L(n);
					},
					get label() {
						return L(i);
					},
					onchange: (e) => oe(L(r), "color", e ?? "")
				});
			}
			var he = P(F(me, 2), !0);
			E(pe), ri(F(pe, 2), 16, () => [
				["colorText", "siteCal.colorText"],
				["colorBox", "siteCal.colorBox"],
				["colorChip", "siteCal.colorChip"]
			], ([e, t]) => e, (e, n) => {
				var i = /* @__PURE__ */ k(() => h(n, 2));
				let a = () => L(i)[0], o = () => L(i)[1];
				var s = c_(), c = M(s);
				{
					let e = /* @__PURE__ */ k(() => L(t)[a()] || ""), n = /* @__PURE__ */ k(m), i = /* @__PURE__ */ k(() => J(o()));
					Pa(c, {
						get value() {
							return L(e);
						},
						get tokens() {
							return L(n);
						},
						allowClear: !0,
						get label() {
							return L(i);
						},
						onchange: (e) => oe(L(r), a(), e ?? "")
					});
				}
				var l = P(F(c, 2), !0);
				E(s), I((e, t) => {
					q(s, "title", e), V(l, t);
				}, [() => J(`tip.${o()}`), () => J(o())]), B(e, s);
			}), E(fe);
			var ge = F(fe, 2), _e = P(ge, !0), ve = F(ge, 2), ye = M(ve), be = F(ye);
			G(be), E(ve);
			var xe = F(ve, 2), Se = M(xe), Ce = F(Se);
			G(Ce), E(xe);
			var we = F(xe, 2), Te = M(we);
			G(Te);
			var Ee = F(Te);
			E(we);
			var De = F(we, 2), Oe = M(De);
			G(Oe);
			var ke = F(Oe);
			E(De);
			var Ae = F(De, 2), je = M(Ae), Me = M(je);
			U(Me, () => X.up, !0), E(Me);
			var Ne = F(Me, 2);
			U(Ne, () => X.down, !0), E(Ne), E(je);
			var Pe = F(je, 2), D = P(Pe, !0);
			E(Ae), E(b), E(y), E(v), E(a), I((e, n, l, d, f, m, h, _, y, b, x, C, ee, ie, ae, oe, se, ue, fe, me, ge, E, Ae, je, Fe, Ie) => {
				o = W(a, 1, "site-cal-row", null, o, { open: L(i) }), q(s, "aria-expanded", L(i)), u = Oi(c, "", u, { background: e }), V(p, n), V(g, l), v.inert = !L(i), V(S, d), V(w, `${f ?? ""} `), K(T, L(t).name ?? ""), q(T, "placeholder", m), q(T, "title", h), q(T, "data-cal-name", L(t).id), V(te, `${_ ?? ""} `), K(ne, L(t).url), q(ne, "placeholder", y), q(re, "title", b), V(ce, `${x ?? ""} `), K(le, L(t).description ?? ""), V(de, C), q(pe, "title", ee), V(he, ie), V(_e, ae), q(ve, "title", oe), V(ye, `${se ?? ""} `), K(be, L(t).link ?? ""), q(xe, "title", ue), V(Se, `${fe ?? ""} `), K(Ce, L(t).organizer ?? ""), q(we, "title", me), Ni(Te, L(t).subscribable !== !1), V(Ee, ` ${ge ?? ""}`), q(De, "title", E), Ni(Oe, L(t).inFilter !== !1), V(ke, ` ${Ae ?? ""}`), Me.disabled = L(r) === 0, Ne.disabled = je, q(Pe, "title", Fe), V(D, Ie);
			}, [
				() => Ud(L(t).color),
				() => L(t).name || L(t).url || J("ui.addSiteCalendar"),
				() => L(t).url || J("calendar.sourceUrl"),
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
				() => L(r) === l().length - 1,
				() => J("tip.site.removeCalendar"),
				() => J("siteCal.remove")
			]), R("click", s, () => n.openSiteCalendar = L(i) ? null : L(t).id), R("change", T, (e) => oe(L(r), "name", e.target.value)), R("change", ne, (e) => oe(L(r), "url", e.target.value, !0)), R("change", le, (e) => oe(L(r), "description", e.target.value)), R("change", be, (e) => oe(L(r), "link", e.target.value)), R("change", Ce, (e) => oe(L(r), "organizer", e.target.value)), R("change", Te, (e) => se(L(r), "subscribable", e.target.checked)), R("change", Oe, (e) => se(L(r), "inFilter", e.target.checked)), R("click", Me, () => ae(L(r), -1)), R("click", Ne, () => ae(L(r), 1)), R("click", Pe, () => ie(L(r))), B(e, a);
		}), E(t), B(e, t);
	}, ze = /* @__PURE__ */ k(() => l().length);
	H(Le, (e) => {
		L(ze) && e(Re);
	}), E(D), E(Me);
	var Be = F(Me, 4), Ve = P(Be, !0), He = F(Be, 2), Ue = M(He);
	ri(Ue, 17, () => L(w), (e) => e.screen, (e, t) => {
		var n = d_(), r = M(n), i = P(r, !0), a = F(r, 2);
		let o;
		var s = P(a), c = P(F(a, 2), !0);
		E(n), I(() => {
			V(i, L(t).screen), o = W(a, 1, "cw-bar", null, o, { fluid: !L(t).bound }), Oi(s, `width:${L(t).pct ?? ""}%`), V(c, L(t).bound ? `${L(t).margin}` : "-");
		}), B(e, n);
	});
	var We = F(Ue, 2), Ge = M(We), Ke = P(Ge, !0), qe = P(F(Ge, 2), !0);
	E(We);
	var Je = F(We, 2), Ye = (e) => {
		var t = f_(), n = P(t, !0);
		I((e) => V(n, e), [() => J("lbl.bindsFrom", { n: L(r) })]), B(e, t);
	};
	H(Je, (e) => {
		L(a) !== "full" && e(Ye);
	}), E(He);
	var Xe = F(He, 2);
	ri(Xe, 21, () => Jg, (e) => e.id, (e, t) => {
		var n = p_();
		let r;
		var i = P(n, !0);
		I((e) => {
			r = W(n, 1, "", null, r, { on: L(b) === L(t).id }), V(i, e);
		}, [() => J(`lbl.width.${L(t).id}`)]), R("click", n, () => ee(L(t).width)), B(e, n);
	}), E(Xe);
	var Ze = F(Xe, 2), $e = (e) => {
		var t = m_(), n = M(t), r = P(n, !0), i = F(n, 2);
		G(i);
		var a = P(F(i, 2));
		E(t), I((e, n) => {
			q(t, "title", e), V(r, n), q(i, "min", 960), q(i, "max", Kg), q(i, "step", 20), K(i, L(C)), V(a, `${L(C) ?? ""} px`);
		}, [() => J("tip.site.contentWidthFree"), () => J("lbl.widthFree")]), R("input", i, (e) => ee(e.target.valueAsNumber)), B(e, t);
	};
	H(Ze, (e) => {
		L(a) !== "full" && e($e);
	});
	var nt = F(Ze, 2), rt = P(nt, !0), it = F(nt, 2);
	ri(it, 21, () => qg, (e) => e.id, (e, t) => {
		var n = p_();
		let r;
		var i = P(n, !0);
		I((e) => {
			r = W(n, 1, "", null, r, { on: L(x) === L(t).id }), V(i, e);
		}, [() => J(`lbl.gutter.${L(t).id}`)]), R("click", n, () => te(L(t).gutter)), B(e, n);
	}), E(it);
	var at = F(it, 2), ot = M(at), st = P(ot, !0), ct = F(ot, 2), lt = M(ct), ut = M(lt), dt = P(ut, !0), ft = F(ut, 2);
	G(ft);
	var pt = P(F(ft, 2));
	E(lt), E(ct), E(at);
	var mt = F(at, 4), ht = M(mt), gt = F(ht), _t = (e) => {
		var t = h_();
		I((e) => {
			q(t, "src", L(o).site.icon), q(t, "alt", e);
		}, [() => J("lbl.siteIcon")]), B(e, t);
	};
	H(gt, (e) => {
		L(o).site.icon && e(_t);
	}), E(mt);
	var vt = F(mt, 2), yt = M(vt), bt = M(yt), xt = F(bt);
	E(yt);
	var St = F(yt, 2), Ct = (e) => {
		var t = g_(), r = N(t);
		U(r, () => X.pencil ?? "✎", !0), E(r);
		var i = F(r, 2);
		U(i, () => X.cross, !0), E(i), I((e, t) => {
			q(r, "title", e), q(i, "title", t);
		}, [() => J("tip.site.editIcon"), () => J("tip.site.removeIcon")]), R("click", r, () => n.iconEditorImage = L(o).site.icon), R("click", i, _), B(e, t);
	};
	H(St, (e) => {
		L(o).site.icon && e(Ct);
	}), E(vt), E(ue), I((e, t, r, a, s, c, l, u, d, f, p, m, h, g, _, v, y, b, C, w, T, ee, te, ne, re, ie, ae, oe, se, ce) => {
		q(de, "title", e), V(fe, `${t ?? ""} `), K(pe, L(o).site.title ?? ""), q(pe, "placeholder", r), q(me, "title", a), V(he, `${s ?? ""} `), K(ge, L(o).site.description ?? ""), q(ge, "placeholder", c), q(_e, "title", l), V(ve, `${u ?? ""} `), q(be, "title", d), V(xe, `${f ?? ""} `), K(Se, L(o).site.timeZone ?? ""), Ce = W(Se, 1, "", null, Ce, { "place-error": n.siteZoneBad }), q(Ee, "title", p), V(De, `${m ?? ""} `), q(ke, "title", h), V(Ae, `${g ?? ""} `), K(je, _), q(Ne, "title", v), V(Pe, y), V(O, ` ${b ?? ""}`), q(Be, "title", C), V(Ve, w), V(Ke, T), V(qe, ee), q(nt, "title", te), V(rt, ne), at.open = L(x) === null || L(S), V(st, re), q(lt, "title", ie), V(dt, ae), q(ft, "min", 0), q(ft, "max", 12), q(ft, "step", 1), K(ft, L(i)), V(pt, `${L(i) ?? ""} vw`), V(ht, `${oe ?? ""} `), q(yt, "title", se), V(bt, `${ce ?? ""} `);
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
		() => (L(o).site.meetingHosts ?? []).join(", "),
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
		() => L(o).site.icon ? J("ui.changeIcon") : J("ui.chooseIcon")
	]), R("input", pe, (e) => v(e.target.value)), R("input", ge, (e) => y(e.target.value)), R("change", Se, (e) => le(e.target.value)), R("change", je, (e) => re(e.target.value)), R("click", Fe, () => s()), Wi("open", "toggle", Me, (e) => n.siteCalendarsOpen = e, () => n.siteCalendarsOpen), Mr("toggle", at, (e) => j(S, e.currentTarget.open, !0)), R("input", ft, (e) => te(e.target.valueAsNumber)), R("change", xt, g), B(e, ue), tt();
}
Nr([
	"input",
	"change",
	"click"
]);
//#endregion
//#region src/panels/ThemePanel.svelte
var y_ = /* @__PURE__ */ z("<div class=\"mini-label tpv-cap\"> </div>"), b_ = /* @__PURE__ */ z("<div class=\"theme-pvw\"><!> <div class=\"tpv-demo\"><div class=\"tpv-h\"> </div> <div class=\"tpv-card\"> </div> <div class=\"tpv-row\"><span class=\"tpv-btn\"> </span><span class=\"tpv-lnk\"> </span></div></div></div>"), x_ = /* @__PURE__ */ z("<button type=\"button\"><span class=\"tp-band\"><i></i><i></i><i></i><i></i></span> <small> </small></button>"), S_ = /* @__PURE__ */ z("<div class=\"ctl-row autorow\"><span class=\"autolbl\"> </span> <span class=\"seg\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div>"), C_ = /* @__PURE__ */ z("<span class=\"mini-label\"> </span>"), w_ = /* @__PURE__ */ z("<div class=\"palcol\"><!> <span class=\"palcap\"> </span> <b class=\"palhex\"> </b></div>"), T_ = /* @__PURE__ */ z("<div class=\"ctl-row palhead\"><span class=\"mini-label\"> </span> <button type=\"button\"> </button></div> <div></div>", 1), E_ = /* @__PURE__ */ z("<div class=\"panel-body\"><p class=\"panel-strong\"> </p> <div class=\"theme-presets\"></div> <p class=\"panel-strong\"> </p> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <div class=\"ctl-row palhead\"><!> <button type=\"button\"> </button></div> <div class=\"palcells\"></div> <!> <div class=\"ctl-row palauto-row\"><span class=\"mini-label ctl-name\"> </span> <button type=\"button\"> </button></div> <div class=\"theme-previews\"><!> <!></div> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><label> <!></label> <label> <!></label> <div class=\"sample typo-sample\"><div class=\"ts-h\"> </div> <div class=\"ts-b\"> </div></div></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><div class=\"sample form-prev\"><span class=\"fp-btn\"> </span> <span class=\"fp-card\"> </span></div> <label class=\"ctl-row\"> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"24\" step=\"1\"/> <label class=\"ctl-row\"> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"40\" step=\"1\"/></div></details></div>");
function D_(e, t) {
	et(t, !0);
	let n = Qe("urd-editor"), r = /* @__PURE__ */ k(() => n.activeThemePreset), i = /* @__PURE__ */ k(() => n.siteDraft), { THEME_PRESETS: a, applyThemePreset: o, readableOn: s, siteMutate: c, suggestAltColors: l, themeHex: u, themeSwatches: d } = n, p = [
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
	], m = /* @__PURE__ */ k(() => !!L(i)?.theme.alt), g = /* @__PURE__ */ k(() => L(i)?.theme.alt?.auto === !0), _ = /* @__PURE__ */ k(() => L(i)?.theme.scheme === "dark" ? "dark" : "light"), v = /* @__PURE__ */ k(() => L(i)?.theme.tokens.color ?? {}), y = /* @__PURE__ */ k(() => ({
		...L(i)?.theme.tokens.color ?? {},
		...L(i)?.theme.alt?.tokens?.color ?? {}
	}));
	function b(e, t) {
		c(`edit:theme-color-${e}`, () => {
			L(i).theme.tokens.color[e] = t, L(i).theme.alt?.auto && (L(i).theme.alt.tokens.color = l());
		});
	}
	function x(e, t) {
		return e === "accent-text" ? s(u(t.accent ?? "#000000", t)) : t.bg;
	}
	let S = /* @__PURE__ */ k(() => !L(i)?.theme?.tokens?.color?.["accent-text"] && !L(i)?.theme?.alt?.tokens?.color?.["accent-text"]);
	function C(e) {
		c("edit:theme-color-accent-text", () => {
			e ? (delete L(i).theme.tokens.color["accent-text"], L(i).theme.alt?.tokens?.color && delete L(i).theme.alt.tokens.color["accent-text"]) : (L(i).theme.tokens.color["accent-text"] = x("accent-text", L(v)), L(i).theme.alt?.auto && (L(i).theme.alt.tokens.color = l()));
		});
	}
	function w(e, t) {
		c("theme", () => {
			L(i).theme.tokens.font[e] = t;
		});
	}
	function T(e, t) {
		c("theme", () => {
			L(i).theme.tokens.radius[e] = t;
		});
	}
	function ee(e, t) {
		c(`edit:theme-alt-${e}`, () => {
			L(i).theme.alt.tokens.color[e] = t, L(i).theme.alt.auto = !1;
		});
	}
	function te(e) {
		c("theme", () => {
			e === "light" ? delete L(i).theme.scheme : L(i).theme.scheme = e;
		});
	}
	function ne(e) {
		c("theme", () => {
			e ? L(i).theme.alt = {
				auto: !0,
				tokens: { color: l() }
			} : delete L(i).theme.alt;
		});
	}
	function re(e) {
		c("theme", () => {
			L(i).theme.alt ??= { tokens: { color: l() } }, L(i).theme.alt.auto = e, e && (L(i).theme.alt.tokens.color = l());
		});
	}
	function ie(e) {
		let t = L(i).theme.tokens.font[e];
		return [...Hd.some(([, e]) => e === t) ? [] : [[t, J("opt.customFont")]], ...Hd.map(([e, t]) => [t, J(e)])];
	}
	let ae = (e) => parseInt(e, 10) || 0;
	function oe(e, t) {
		T(e, `${t}px`);
	}
	var se = E_();
	{
		let e = (e, t = f, n = f) => {
			var r = b_(), i = M(r), a = (e) => {
				var t = y_(), r = P(t, !0);
				I(() => V(r, n())), B(e, t);
			};
			H(i, (e) => {
				n() && e(a);
			});
			var o = F(i, 2), c = M(o), l = P(c, !0), d = F(c, 2), p = P(d, !0), m = F(d, 2), h = M(m), g = P(h, !0), _ = P(F(h), !0);
			E(m), E(o), E(r), I((e, t, n, r, i, a, s, c, u) => {
				Oi(o, `--tv-bg:${e ?? ""};--tv-surface:${t ?? ""};--tv-text:${n ?? ""};--tv-accent:${r ?? ""};--tv-accent-ink:${i ?? ""}`), V(l, a), V(p, s), V(g, c), V(_, u);
			}, [
				() => u(t().bg, t()),
				() => u(t().surface, t()),
				() => u(t().text, t()),
				() => u(t().accent, t()),
				() => u(t()["accent-text"] ?? s(u(t().accent ?? "#000000", t())), t()),
				() => J("preview.heading"),
				() => J("preview.cardBody"),
				() => J("preview.button"),
				() => J("preview.link")
			]), B(e, r);
		};
		var ce = M(se), le = P(ce, !0), ue = F(ce, 2);
		ri(ue, 21, () => a, (e) => e.id, (e, t) => {
			var n = x_();
			let i;
			var a = M(n), s = M(a), c = F(s), l = F(c), u = F(l);
			E(a);
			var d = P(F(a, 2), !0);
			E(n), I(() => {
				i = W(n, 1, "theme-preset", null, i, { sel: L(r) === L(t).id }), q(n, "title", `${L(t).name} - ${L(t).note}`), Oi(s, `background:${L(t).light.bg ?? ""}`), Oi(c, `background:${L(t).light.surface ?? ""}`), Oi(l, `background:${L(t).light.accent ?? ""}`), Oi(u, `background:${L(t).light.text ?? ""}`), V(d, L(t).name);
			}), R("click", n, () => o(L(t))), B(e, n);
		}), E(ue);
		var de = F(ue, 2), fe = P(de, !0), pe = F(de, 2), me = M(pe);
		G(me);
		var he = F(me);
		E(pe);
		var ge = F(pe, 2), _e = (e) => {
			var t = S_(), n = M(t), r = P(n, !0), i = F(n, 2), a = M(i);
			let o;
			var s = P(a, !0), c = F(a, 2);
			let l;
			var u = P(c, !0);
			E(i), E(t), I((e, t, n, i) => {
				V(r, e), q(a, "title", t), o = W(a, 1, "", null, o, { on: L(g) }), V(s, n), l = W(c, 1, "", null, l, { on: !L(g) }), V(u, i);
			}, [
				() => J("lbl.darkColors"),
				() => J("hint.theme.autoDark"),
				() => J("opt.auto"),
				() => J("opt.custom")
			]), R("click", a, () => re(!0)), R("click", c, () => re(!1)), B(e, t);
		};
		H(ge, (e) => {
			L(m) && e(_e);
		});
		var ve = F(ge, 2), ye = M(ve), be = (e) => {
			var t = C_(), n = P(t, !0);
			I((e) => V(n, e), [() => J("lbl.light")]), B(e, t);
		};
		H(ye, (e) => {
			L(m) && e(be);
		});
		var xe = F(ye, 2);
		let t;
		var Se = P(xe, !0);
		E(ve);
		var Ce = F(ve, 2);
		ri(Ce, 21, () => p, ([e, t, n]) => e, (e, t) => {
			var n = /* @__PURE__ */ k(() => h(L(t), 3));
			let r = () => L(n)[0], a = () => L(n)[1], o = () => L(n)[2];
			var s = w_(), c = M(s);
			{
				let e = /* @__PURE__ */ k(() => L(i).theme.tokens.color[r()] ?? x(r(), L(v))), t = /* @__PURE__ */ k(d);
				Pa(c, {
					get value() {
						return L(e);
					},
					get tokens() {
						return L(t);
					},
					get label() {
						return a();
					},
					onchange: (e) => b(r(), e)
				});
			}
			var l = F(c, 2), f = P(l, !0), p = P(F(l, 2), !0);
			E(s), I((e) => {
				V(f, o()), V(p, e);
			}, [() => u(L(i).theme.tokens.color[r()] ?? x(r(), L(v)), L(v))]), B(e, s);
		}), E(Ce);
		var we = F(Ce, 2), Te = (e) => {
			var t = T_(), n = N(t), r = M(n), a = P(r, !0), o = F(r, 2);
			let s;
			var c = P(o, !0);
			E(n);
			var l = F(n, 2);
			let f;
			ri(l, 21, () => p, ([e, t, n]) => e, (e, t) => {
				var n = /* @__PURE__ */ k(() => h(L(t), 3));
				let r = () => L(n)[0], a = () => L(n)[1], o = () => L(n)[2];
				var s = w_(), c = M(s);
				{
					let e = /* @__PURE__ */ k(() => L(i).theme.alt.tokens.color[r()] ?? L(y)[r()] ?? x(r(), L(y))), t = /* @__PURE__ */ k(d), n = /* @__PURE__ */ k(() => J("theme.darkColorLabel", { name: a() }));
					Pa(c, {
						get value() {
							return L(e);
						},
						get tokens() {
							return L(t);
						},
						get label() {
							return L(n);
						},
						onchange: (e) => ee(r(), e)
					});
				}
				var l = F(c, 2), f = P(l, !0), p = P(F(l, 2), !0);
				E(s), I((e) => {
					V(f, o()), V(p, e);
				}, [() => u(L(i).theme.alt.tokens.color[r()] ?? L(y)[r()] ?? x(r(), L(y)), L(y))]), B(e, s);
			}), E(l), I((e, t, n) => {
				V(a, e), s = W(o, 1, "chip", null, s, { accent: L(_) === "dark" }), q(o, "title", t), V(c, n), f = W(l, 1, "palcells", null, f, { autopal: L(g) });
			}, [
				() => J("lbl.dark"),
				() => J("tip.theme.darkDefault"),
				() => J("common.standard")
			]), R("click", o, () => te("dark")), B(e, t);
		};
		H(we, (e) => {
			L(m) && e(Te);
		});
		var Ee = F(we, 2), De = M(Ee), Oe = P(De, !0), ke = F(De, 2);
		let n;
		var Ae = P(ke, !0);
		E(Ee);
		var je = F(Ee, 2), Me = M(je);
		{
			let t = /* @__PURE__ */ k(() => L(m) ? J("lbl.light") : "");
			e(Me, () => L(v), () => L(t));
		}
		var Ne = F(Me, 2), Pe = (t) => {
			{
				let n = /* @__PURE__ */ k(() => J("lbl.dark"));
				e(t, () => L(y), () => L(n));
			}
		};
		H(Ne, (e) => {
			L(m) && e(Pe);
		}), E(je);
		var D = F(je, 2), Fe = M(D), Ie = P(Fe, !0), O = F(Fe, 2), Le = M(O), Re = M(Le), ze = F(Re);
		{
			let e = /* @__PURE__ */ k(() => ie("heading"));
			Y(ze, {
				get value() {
					return L(i).theme.tokens.font.heading;
				},
				get options() {
					return L(e);
				},
				onchange: (e) => w("heading", e)
			});
		}
		E(Le);
		var Be = F(Le, 2), Ve = M(Be), He = F(Ve);
		{
			let e = /* @__PURE__ */ k(() => ie("body"));
			Y(He, {
				get value() {
					return L(i).theme.tokens.font.body;
				},
				get options() {
					return L(e);
				},
				onchange: (e) => w("body", e)
			});
		}
		E(Be);
		var Ue = F(Be, 2), We = M(Ue), Ge = P(We, !0), Ke = F(We, 2), qe = P(Ke, !0);
		E(Ue), E(O), E(D);
		var Je = F(D, 2), Ye = M(Je), Xe = P(Ye, !0), Ze = F(Ye, 2), $e = M(Ze), nt = M($e), rt = P(nt, !0), it = P(F(nt, 2), !0);
		E($e);
		var at = F($e, 2), ot = M(at, !0), st = P(F(ot), !0);
		E(at);
		var ct = F(at, 2);
		G(ct);
		var lt = F(ct, 2), ut = M(lt, !0), dt = P(F(ut), !0);
		E(lt);
		var ft = F(lt, 2);
		G(ft), E(Ze), E(Je), E(se), I((e, r, a, o, s, c, l, u, d, f, p, h, g, v, y, b, x, C, w, T, ee) => {
			V(le, e), V(fe, r), q(pe, "title", a), Ni(me, L(m)), V(he, ` ${o ?? ""}`), t = W(xe, 1, "chip", null, t, { accent: L(_) === "light" }), q(xe, "title", s), V(Se, c), q(Ee, "title", l), V(Oe, u), n = W(ke, 1, "chip palauto", null, n, { accent: L(S) }), V(Ae, d), V(Ie, f), V(Re, `${p ?? ""} `), V(Ve, `${h ?? ""} `), Oi(We, `font-family:${L(i).theme.tokens.font.heading ?? ""}`), V(Ge, g), Oi(Ke, `font-family:${L(i).theme.tokens.font.body ?? ""}`), V(qe, v), V(Xe, y), Oi($e, `--r-sm:${L(i).theme.tokens.radius.sm ?? ""};--r-md:${L(i).theme.tokens.radius.md ?? ""}`), V(rt, b), V(it, x), V(ot, C), V(st, L(i).theme.tokens.radius.sm), K(ct, w), V(ut, T), V(dt, L(i).theme.tokens.radius.md), K(ft, ee);
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
			() => ae(L(i).theme.tokens.radius.sm),
			() => J("lbl.largeCorners"),
			() => ae(L(i).theme.tokens.radius.md)
		]), R("change", me, (e) => ne(e.target.checked)), R("click", xe, () => te("light")), R("click", ke, () => C(!L(S))), R("input", ct, (e) => oe("sm", Number(e.target.value))), R("input", ft, (e) => oe("md", Number(e.target.value)));
	}
	B(e, se), tt();
}
Nr([
	"click",
	"change",
	"input"
]);
//#endregion
//#region src/panels/GridPanel.svelte
var O_ = /* @__PURE__ */ z("<div class=\"panel-body\"><label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\"/> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label></div>");
function k_(e, t) {
	et(t, !0);
	let n = Qe("urd-editor"), r = /* @__PURE__ */ k(() => n.grid), { setGrid: i } = n;
	var a = O_(), o = M(a), s = M(o), c = P(F(s));
	E(o);
	var l = F(o, 2);
	G(l);
	var u = F(l, 2), d = M(u);
	G(d);
	var f = F(d);
	E(u), E(a), I((e, t) => {
		V(s, `${e ?? ""} `), V(c, `${L(r).size ?? ""} px`), K(l, L(r).size), Ni(d, L(r).snap !== !1), V(f, ` ${t ?? ""}`);
	}, [() => J("lbl.gridSize"), () => J("lbl.gridSnap")]), R("input", l, (e) => i("size", Number(e.target.value))), R("change", d, (e) => i("snap", e.target.checked)), B(e, a), tt();
}
Nr(["input", "change"]);
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/glow.js
var A_ = {
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
		let n = ch(t.color), r = t.x ?? .5, i = t.y ?? .3, a = t.radius ?? .5;
		e.style.background = `radial-gradient(circle at ${r * 100}% ${i * 100}%, ${n} 0%, transparent ${a * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, j_ = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", M_ = {
	version: 1,
	label: "Grain",
	labelKey: "bgLayer.grain",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = j_, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
};
//#endregion
//#region ../template/assets/engine/0.7.4/footer-thumb.js
function N_(e = {}) {
	let t = "#2fd6b6", n = "#5c6b64", r = e.mega ? "#16221d" : "#0e1512", i = e.cols ?? 0, a = e.social ?? 0, o = `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${r}"/>`;
	if (e.mega && (o += `<circle cx="20" cy="6" r="34" fill="${t}" opacity="0.18"/>`), e.bigcta) return o += `<rect x="45" y="18" width="70" height="8" rx="3" fill="${n}" opacity="0.85"/>`, o += `<rect x="56" y="32" width="48" height="4" rx="2" fill="${n}" opacity="0.5"/>`, o += `<rect x="62" y="43" width="36" height="10" rx="3" fill="${t}"/>`, o += P_(n, e.baselineLinks), o + "</svg>";
	if (e.chapters) {
		o += `<rect x="12" y="10" width="20" height="6" rx="2" fill="${t}"/>`, o += `<rect x="12" y="20" width="46" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		let r = i || 3, a = (136 - (r - 1) * 8) / r;
		for (let e = 0; e < r; e++) {
			let r = 12 + e * (a + 8);
			o += `<line x1="${r}" y1="30" x2="${r + a}" y2="30" stroke="${n}" stroke-width="0.8" opacity="0.7"/>`, o += `<rect x="${r}" y="34" width="9" height="6" rx="1.5" fill="${t}"/>`;
			for (let e = 0; e < 3; e++) o += `<rect x="${r}" y="${44 + e * 6}" width="${a * .7}" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		}
		return o += P_(n, e.baselineLinks), o + "</svg>";
	}
	if (e.split) {
		o += `<rect x="8" y="8" width="70" height="52" rx="4" fill="${t}" opacity="0.16"/>`, o += `<rect x="16" y="16" width="20" height="6" rx="2" fill="${t}"/>`, o += `<rect x="16" y="26" width="46" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`, o += `<rect x="16" y="36" width="26" height="9" rx="3" fill="${t}"/>`;
		let r = i || 2;
		for (let e = 0; e < r; e++) {
			let r = 90 + e * 32;
			o += `<rect x="${r}" y="14" width="16" height="3" rx="1.5" fill="${t}" opacity="0.8"/>`;
			for (let e = 0; e < 4; e++) o += `<rect x="${r}" y="${22 + e * 7}" width="22" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		}
		return o += P_(n, e.baselineLinks), o + "</svg>";
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
	return o += P_(n, e.baselineLinks), o + "</svg>";
}
function P_(e, t = 0) {
	let n = `<line x1="8" y1="66" x2="152" y2="66" stroke="${e}" stroke-width="0.6" opacity="0.5"/>`;
	return n += `<rect x="8" y="70" width="40" height="3" rx="1.5" fill="${e}" opacity="0.6"/>`, t && (n += `<g fill="${e}" opacity="0.6">` + Array.from({ length: t }, (e, t) => `<rect x="${120 - t * 16}" y="70" width="12" height="3" rx="1.5"/>`).join("") + "</g>"), n;
}
//#endregion
//#region src/panels/FooterPanel.svelte
var F_ = /* @__PURE__ */ z("<input class=\"nav-target\"/>"), I_ = /* @__PURE__ */ z("<div class=\"nav-row nav-sub-row\"><input/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span> <span class=\"nav-target\"><!></span> <!></div>"), L_ = /* @__PURE__ */ z("<label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>"), R_ = /* @__PURE__ */ z("<details class=\"group\"><summary> </summary> <div class=\"group-items\"></div></details>"), z_ = /* @__PURE__ */ z("<button class=\"footer-tp\"><span class=\"footer-tp-thumb\"></span> <span class=\"footer-tp-name\"> </span></button>"), B_ = /* @__PURE__ */ z("<button class=\"ghost row-tool\"></button>"), V_ = /* @__PURE__ */ z("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"16\" max=\"160\" step=\"2\"/>", 1), H_ = /* @__PURE__ */ z("<span class=\"toolbar-row\"><label class=\"ghost filepick tb-grow\"> <input type=\"file\" accept=\"image/*\"/></label> <!></span> <!>", 1), U_ = /* @__PURE__ */ z("<div class=\"nav-row\"><input/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></div> <!>", 1), W_ = /* @__PURE__ */ z("<div class=\"nav-row\"><span class=\"nav-line\"><span class=\"footer-soc-preview\" aria-hidden=\"true\"></span> <!></span> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span> <input class=\"nav-target\"/></div>"), G_ = /* @__PURE__ */ z("<input/>"), K_ = /* @__PURE__ */ z("<label> <!></label> <!>", 1), q_ = /* @__PURE__ */ z("<label> <input/></label> <label> <input/></label> <label> <input/></label>", 1), J_ = /* @__PURE__ */ z("<label> <!></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label> <input/></label> <label> <input/></label> <label> <input/></label> <!>", 1), Y_ = /* @__PURE__ */ z("<label> <!></label> <hr class=\"gridmenu-divider\"/>", 1), X_ = /* @__PURE__ */ z("<div class=\"panel-body\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><div class=\"footer-tpick\"></div></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><label> <input/></label> <label> <input/></label> <label> <!></label> <!></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><!> <button class=\"ghost action\"> </button> <label> <!></label></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><!> <button class=\"ghost action\"> </button></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><!> <button class=\"ghost action\"> </button></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><!> <p class=\"panel-strong\"> </p> <!></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><label> <input/></label> <p class=\"panel-strong\"> </p> <!> <button class=\"ghost action\"> </button></div></details></div>");
function Z_(e, t) {
	et(t, !0);
	let n = (e, t = f, n = f) => {
		var r = Hr();
		ri(N(r), 17, n, $r, (e, r, a) => {
			var o = I_(), s = M(o);
			G(s);
			var c = F(s, 2), l = M(c);
			l.disabled = a === 0, U(l, () => X.up, !0), E(l);
			var u = F(l, 2);
			U(u, () => X.down, !0), E(u);
			var d = F(u, 2);
			U(d, () => X.cross, !0), E(d), E(c);
			var f = F(c, 2), p = M(f);
			{
				let e = /* @__PURE__ */ k(() => L(r).page ?? "__href"), n = /* @__PURE__ */ k(() => J("tip.linkTarget")), o = /* @__PURE__ */ k(() => [...L(i).pages.map((e) => [e.id, e.title]), ["__href", J("opt.linkHref")]]);
				Y(p, {
					get value() {
						return L(e);
					},
					get title() {
						return L(n);
					},
					get options() {
						return L(o);
					},
					onchange: (e) => C(t(), a, e)
				});
			}
			E(f);
			var m = F(f, 2), h = (e) => {
				var n = F_();
				G(n), I((e, t) => {
					K(n, L(r).href ?? ""), q(n, "placeholder", e), q(n, "title", t);
				}, [() => J("ph.hrefAnchor"), () => J("tip.hrefAnchor")]), R("change", n, (e) => w(t(), a, e.target.value)), B(e, n);
			};
			H(m, (e) => {
				L(r).page || e(h);
			}), E(o), I((e, t) => {
				K(s, L(r).label), q(s, "title", e), u.disabled = a === n().length - 1, q(d, "title", t);
			}, [() => J("tip.linkLabel"), () => J("tip.removeLink")]), R("input", s, (e) => S(t(), a, e.target.value)), R("click", l, () => x(t(), a, -1)), R("click", u, () => x(t(), a, 1)), R("click", d, () => b(t(), a)), B(e, o);
		}), B(e, r);
	}, r = Qe("urd-editor"), i = /* @__PURE__ */ k(() => r.siteDraft), { compressOrTrim: a, footerBgCtx: o, footerMutate: s, setStatus: c } = r;
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
			c(J("status.imageReadErrorSvg"), "error");
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
	function _(e) {
		let t = J("seed.orgName"), n = L(i).pages ?? [], r = (e) => n.slice(0, e).map((e) => ({
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
			baseline: [o(J("seed.footer.privacy"), "#")]
		} : e === "centered" ? {
			align: "center",
			brand: { title: t },
			linkRow: r(5),
			social: a([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: `${s} · ${J("seed.footer.madeWith")}`
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
						o(J("seed.footer.about"), "#"),
						o(J("seed.join"), "#"),
						o(J("seed.footer.press"), "#")
					]
				},
				{
					title: J("seed.footer.colResources"),
					links: [
						o(J("seed.footer.bylaws"), "#"),
						o(J("seed.footer.privacy"), "#"),
						o(J("seed.footer.contact"), "#")
					]
				}
			],
			social: a([
				"facebook",
				"instagram",
				"linkedin"
			]),
			copyright: s,
			baseline: [o(J("seed.footer.privacy"), "#"), o(J("seed.footer.terms"), "#")]
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
						o(J("seed.footer.home"), "#"),
						o(J("seed.footer.events"), "#"),
						o(J("seed.footer.gallery"), "#"),
						o(J("seed.footer.blog"), "#")
					]
				},
				{
					title: J("seed.footer.colCompany"),
					links: [
						o(J("seed.footer.about"), "#"),
						o(J("seed.footer.history"), "#"),
						o(J("seed.footer.press"), "#"),
						o(J("seed.footer.contact"), "#")
					]
				},
				{
					title: J("seed.footer.colSupport"),
					links: [
						o(J("seed.join"), "#"),
						o(J("seed.footer.faq"), "#"),
						o(J("seed.footer.help"), "#")
					]
				},
				{
					title: J("seed.footer.colLegal"),
					links: [
						o(J("seed.footer.privacy"), "#"),
						o(J("seed.footer.terms"), "#"),
						o(J("seed.footer.bylaws"), "#")
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
				o(J("seed.footer.privacy"), "#"),
				o(J("seed.footer.terms"), "#"),
				o(J("seed.footer.cookies"), "#")
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
					o(J("seed.footer.about"), "#"),
					o(J("seed.footer.contact"), "#"),
					o(J("seed.footer.privacy"), "#")
				]
			}],
			social: a(["facebook", "instagram"]),
			copyright: s,
			baseline: [o(J("seed.footer.privacy"), "#")]
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
			social: a([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: s,
			baseline: [o(J("seed.footer.privacy"), "#"), o(J("seed.footer.terms"), "#")]
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
						o(J("seed.footer.address"), "#"),
						o(J("seed.email"), `mailto:${J("seed.email")}`),
						o(J("seed.phone"), `tel:${J("seed.phone").replace(/\s+/g, "")}`)
					]
				},
				{
					title: J("seed.footer.colHours"),
					links: [o(J("seed.footer.hours1"), "#"), o(J("seed.footer.hours2"), "#")]
				},
				{
					title: J("seed.footer.colPages"),
					links: r(4)
				}
			],
			social: a(["facebook", "instagram"]),
			copyright: s,
			baseline: [o(J("seed.footer.privacy"), "#")]
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
						o(J("seed.footer.about"), "#"),
						o(J("seed.footer.history"), "#"),
						o(J("seed.footer.contact"), "#")
					]
				},
				{
					title: J("seed.footer.colSupport"),
					links: [
						o(J("seed.join"), "#"),
						o(J("seed.footer.faq"), "#"),
						o(J("seed.footer.help"), "#")
					]
				}
			],
			copyright: s,
			baseline: [o(J("seed.footer.privacy"), "#"), o(J("seed.footer.terms"), "#")]
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
					o(J("seed.footer.about"), "#"),
					o(J("seed.footer.contact"), "#"),
					o(J("seed.footer.privacy"), "#")
				]
			}],
			social: a(["facebook", "instagram"]),
			copyright: s,
			baseline: [o(J("seed.footer.privacy"), "#")]
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
				links: [o(J("seed.footer.newsletter"), "#"), o(J("seed.email"), `mailto:${J("seed.email")}`)]
			}],
			social: a([
				"facebook",
				"instagram",
				"linkedin",
				"youtube"
			]),
			copyright: s,
			baseline: [o(J("seed.footer.privacy"), "#"), o(J("seed.footer.madeWith"), "#")],
			background: {
				version: 1,
				layers: [{
					type: "glow",
					version: A_.version ?? 1,
					props: {
						...A_.defaults(),
						color: "accent",
						x: .12,
						y: 0,
						radius: .6,
						opacity: .45
					}
				}, {
					type: "grain",
					version: M_.version ?? 1,
					props: {
						...M_.defaults(),
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
			t[e] ??= [], t[e].push(L(i).pages[0] ? {
				label: J("seed.link"),
				page: L(i).pages[0].id
			} : {
				label: J("seed.link"),
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
	function ee(e) {
		s("footer", (t) => {
			e ? t.cta ??= {
				kind: "button",
				label: J("seed.join")
			} : delete t.cta;
		});
	}
	function te(e, t) {
		s(`edit:footer-cta-${e}`, (n) => {
			n.cta ??= {}, t === "" || t == null || t === !1 ? delete n.cta[e] : n.cta[e] = t;
		});
	}
	function ne(e) {
		s("footer", (t) => {
			t.cta ??= {}, e === "__href" ? (delete t.cta.page, t.cta.href = t.cta.href ?? "https://") : (t.cta.page = e, delete t.cta.href);
		});
	}
	function re(e, t) {
		s("footer", (n) => {
			let r = new Set(n.hideOn ?? []);
			t ? r.delete(e) : r.add(e), r.size ? n.hideOn = [...r] : delete n.hideOn;
		});
	}
	function ie() {
		s("footer", (e) => {
			e.columns ??= [], e.columns.push({
				title: J("seed.column"),
				links: [{
					label: J("seed.link"),
					page: L(i).pages[0].id
				}]
			});
		});
	}
	function ae(e) {
		s("footer", (t) => {
			t.columns.splice(e, 1), t.columns.length || delete t.columns;
		});
	}
	function oe(e, t) {
		s("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.columns.length || ([n.columns[e], n.columns[r]] = [n.columns[r], n.columns[e]]);
		});
	}
	function se(e, t) {
		s(`edit:footer-col-title-${e}`, (n) => {
			n.columns[e].title = t;
		});
	}
	function ce(e) {
		s("footer", (t) => {
			t.columns[e].links ??= [], t.columns[e].links.push({
				label: J("seed.link"),
				page: L(i).pages[0].id
			});
		});
	}
	function le(e, t) {
		s("footer", (n) => {
			n.columns[e].links.splice(t, 1);
		});
	}
	function ue(e, t, n) {
		s("footer", (r) => {
			let i = r.columns[e].links, a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function de(e, t, n) {
		s(`edit:footer-link-label-${e}-${t}`, (r) => {
			r.columns[e].links[t].label = n;
		});
	}
	function fe(e, t, n) {
		s("footer", (r) => {
			let i = r.columns[e].links[t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function pe(e, t, n) {
		s(`edit:footer-link-href-${e}-${t}`, (r) => {
			r.columns[e].links[t].href = n;
		});
	}
	function me() {
		s("footer", (e) => {
			e.social ??= [], e.social.push({
				icon: "facebook",
				url: "https://"
			});
		});
	}
	function he(e) {
		s("footer", (t) => {
			t.social.splice(e, 1), t.social.length || delete t.social;
		});
	}
	function ge(e, t) {
		s("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.social.length || ([n.social[e], n.social[r]] = [n.social[r], n.social[e]]);
		});
	}
	function _e(e, t) {
		s("footer", (n) => {
			n.social[e].icon = t;
		});
	}
	function ve(e, t) {
		s(`edit:footer-social-url-${e}`, (n) => {
			n.social[e].url = t;
		});
	}
	let ye = Su.filter(([e]) => e === "iconCat.social" || e === "iconCat.communication").flatMap(([, e]) => e.map((e) => [e, J(xu[e].labelKey)]));
	var be = X_(), xe = M(be), Se = M(xe);
	G(Se);
	var Ce = F(Se);
	E(xe);
	var we = F(xe, 2), Te = (e) => {
		var t = R_(), n = M(t), r = P(n, !0), a = F(n, 2);
		ri(a, 21, () => L(i).pages ?? [], (e) => e.id, (e, t) => {
			var n = L_(), r = M(n);
			G(r);
			var a = F(r);
			E(n), I((e, i) => {
				q(n, "title", e), Ni(r, i), V(a, ` ${(L(t).title || L(t).id) ?? ""}`);
			}, [() => J("tip.footer.hideOnPage"), () => !(L(i).footer?.hideOn ?? []).includes(L(t).id)]), R("change", r, (e) => re(L(t).id, e.target.checked)), B(e, n);
		}), E(a), E(t), I((e) => V(r, e), [() => J("group.showOnPages")]), B(e, t);
	};
	H(we, (e) => {
		L(i).footer?.show && e(Te);
	});
	var Ee = F(we, 2), De = M(Ee), Oe = P(De, !0), Ae = F(De, 2), je = M(Ae);
	ri(je, 21, () => g, (e) => e.id, (e, t) => {
		var n = z_(), r = M(n);
		U(r, () => N_(L(t).thumb), !0), E(r);
		var i = P(F(r, 2), !0);
		E(n), I((e) => {
			q(n, "title", e), V(i, L(t).label);
		}, [() => J("tip.footer.template", { label: L(t).label })]), R("click", n, () => v(L(t).id)), B(e, n);
	}), E(je), E(Ae), E(Ee);
	var Me = F(Ee, 2), Ne = M(Me), Pe = P(Ne, !0), D = F(Ne, 2), Fe = M(D), Ie = M(Fe), O = F(Ie);
	G(O), E(Fe);
	var Le = F(Fe, 2), Re = M(Le), ze = F(Re);
	G(ze), E(Le);
	var Be = F(Le, 2), Ve = M(Be), He = F(Ve);
	{
		let e = /* @__PURE__ */ k(() => L(i).footer?.brand?.mode ?? "text"), t = /* @__PURE__ */ k(() => [
			["text", J("blocks.text")],
			["image", J("opt.brand.image")],
			["both", J("opt.brand.both")]
		]);
		Y(He, {
			get value() {
				return L(e);
			},
			get options() {
				return L(t);
			},
			onchange: (e) => u(e)
		});
	}
	E(Be);
	var Ue = F(Be, 2), We = (e) => {
		var t = H_(), n = N(t), r = M(n), a = M(r), o = F(a);
		E(r);
		var s = F(r, 2), c = (e) => {
			var t = B_();
			U(t, () => X.cross, !0), E(t), I((e) => q(t, "title", e), [() => J("tip.footer.removeLogo")]), R("click", t, p), B(e, t);
		};
		H(s, (e) => {
			L(i).footer?.brand?.logo && e(c);
		}), E(n);
		var l = F(n, 2), u = (e) => {
			var t = V_(), n = N(t), r = M(n), a = P(F(r));
			E(n);
			var o = F(n, 2);
			G(o), I((e) => {
				V(r, `${e ?? ""} `), V(a, `${L(i).footer?.brand?.logoHeight ?? 40 ?? ""} px`), K(o, L(i).footer?.brand?.logoHeight ?? 40);
			}, [() => J("lbl.logoHeight")]), R("input", o, (e) => m(e.target.value)), B(e, t);
		};
		H(l, (e) => {
			L(i).footer?.brand?.logo && e(u);
		}), I((e, t) => {
			q(r, "title", e), V(a, `${t ?? ""} `);
		}, [() => J("tip.webpAutoPublish"), () => L(i).footer?.brand?.logo ? J("ui.changeLogo") : J("ui.uploadLogo")]), R("change", o, d), B(e, t);
	};
	H(Ue, (e) => {
		(L(i).footer?.brand?.mode ?? "text") !== "text" && e(We);
	}), E(D), E(Me);
	var Ge = F(Me, 2), Ke = M(Ge), qe = P(Ke, !0), Je = F(Ke, 2), Ye = M(Je);
	ri(Ye, 17, () => L(i).footer?.columns ?? [], $r, (e, t, n) => {
		var r = U_(), a = N(r), o = M(a);
		G(o);
		var s = F(o, 2), c = M(s);
		U(c, () => X.plus, !0), E(c);
		var l = F(c, 2);
		l.disabled = n === 0, U(l, () => X.up, !0), E(l);
		var u = F(l, 2);
		U(u, () => X.down, !0), E(u);
		var d = F(u, 2);
		U(d, () => X.cross, !0), E(d), E(s), E(a), ri(F(a, 2), 17, () => L(t).links ?? [], $r, (e, r, a) => {
			var o = I_(), s = M(o);
			G(s);
			var c = F(s, 2), l = M(c);
			l.disabled = a === 0, U(l, () => X.up, !0), E(l);
			var u = F(l, 2);
			U(u, () => X.down, !0), E(u);
			var d = F(u, 2);
			U(d, () => X.cross, !0), E(d), E(c);
			var f = F(c, 2), p = M(f);
			{
				let e = /* @__PURE__ */ k(() => L(r).page ?? "__href"), t = /* @__PURE__ */ k(() => J("tip.linkTarget")), o = /* @__PURE__ */ k(() => [...L(i).pages.map((e) => [e.id, e.title]), ["__href", J("opt.linkHref")]]);
				Y(p, {
					get value() {
						return L(e);
					},
					get title() {
						return L(t);
					},
					get options() {
						return L(o);
					},
					onchange: (e) => fe(n, a, e)
				});
			}
			E(f);
			var m = F(f, 2), h = (e) => {
				var t = F_();
				G(t), I((e, n) => {
					K(t, L(r).href ?? ""), q(t, "placeholder", e), q(t, "title", n);
				}, [() => J("ph.hrefAnchor"), () => J("tip.hrefAnchor")]), R("change", t, (e) => pe(n, a, e.target.value)), B(e, t);
			};
			H(m, (e) => {
				L(r).page || e(h);
			}), E(o), I((e, n) => {
				K(s, L(r).label), q(s, "title", e), u.disabled = a === L(t).links.length - 1, q(d, "title", n);
			}, [() => J("tip.linkLabel"), () => J("tip.removeLink")]), R("input", s, (e) => de(n, a, e.target.value)), R("click", l, () => ue(n, a, -1)), R("click", u, () => ue(n, a, 1)), R("click", d, () => le(n, a)), B(e, o);
		}), I((e, r, a) => {
			K(o, L(t).title), q(o, "title", e), q(c, "title", r), u.disabled = n === L(i).footer.columns.length - 1, q(d, "title", a);
		}, [
			() => J("tip.footer.columnTitle"),
			() => J("tip.footer.addLink"),
			() => J("tip.footer.removeColumn")
		]), R("input", o, (e) => se(n, e.target.value)), R("click", c, () => ce(n)), R("click", l, () => oe(n, -1)), R("click", u, () => oe(n, 1)), R("click", d, () => ae(n)), B(e, r);
	});
	var Xe = F(Ye, 2), Ze = P(Xe, !0), $e = F(Xe, 2), nt = M($e), rt = F(nt);
	{
		let e = /* @__PURE__ */ k(() => L(i).footer?.columnsAlign ?? "left"), t = /* @__PURE__ */ k(() => [["left", J("common.left")], ["center", J("common.center")]]);
		Y(rt, {
			get value() {
				return L(e);
			},
			get options() {
				return L(t);
			},
			onchange: (e) => T(e)
		});
	}
	E($e), E(Je), E(Ge);
	var it = F(Ge, 2), at = M(it), ot = P(at, !0), st = F(at, 2), ct = M(st);
	ri(ct, 17, () => L(i).footer?.social ?? [], $r, (e, t, n) => {
		var r = W_(), a = M(r), o = M(a);
		U(o, () => Cu(L(t).icon) || "", !0), E(o);
		var s = F(o, 2);
		{
			let e = /* @__PURE__ */ k(() => J("blocks.icon"));
			Y(s, {
				get value() {
					return L(t).icon;
				},
				get title() {
					return L(e);
				},
				get options() {
					return ye;
				},
				onchange: (e) => _e(n, e)
			});
		}
		E(a);
		var c = F(a, 2), l = M(c);
		l.disabled = n === 0, U(l, () => X.up, !0), E(l);
		var u = F(l, 2);
		U(u, () => X.down, !0), E(u);
		var d = F(u, 2);
		U(d, () => X.cross, !0), E(d), E(c);
		var f = F(c, 2);
		G(f), E(r), I((e, r) => {
			u.disabled = n === L(i).footer.social.length - 1, q(d, "title", e), K(f, L(t).url), q(f, "placeholder", r);
		}, [() => J("tip.removeLink"), () => J("ph.hrefMailto")]), R("click", l, () => ge(n, -1)), R("click", u, () => ge(n, 1)), R("click", d, () => he(n)), R("change", f, (e) => ve(n, e.target.value)), B(e, r);
	});
	var lt = F(ct, 2), ut = P(lt, !0);
	E(st), E(it);
	var dt = F(it, 2), ft = M(dt), pt = P(ft, !0), mt = F(ft, 2), ht = M(mt), gt = M(ht);
	G(gt);
	var _t = F(gt);
	E(ht);
	var vt = F(ht, 2), yt = (e) => {
		let t = /* @__PURE__ */ k(() => L(i).footer.cta);
		var n = J_(), r = N(n), a = M(r), o = F(a);
		{
			let e = /* @__PURE__ */ k(() => L(t).kind ?? "button"), n = /* @__PURE__ */ k(() => [["button", J("opt.cta.button")], ["newsletter", J("opt.cta.newsletter")]]);
			Y(o, {
				get value() {
					return L(e);
				},
				get options() {
					return L(n);
				},
				onchange: (e) => te("kind", e)
			});
		}
		E(r);
		var s = F(r, 2), c = M(s);
		G(c);
		var l = F(c);
		E(s);
		var u = F(s, 2), d = M(u), f = F(d);
		G(f), E(u);
		var p = F(u, 2), m = M(p), h = F(m);
		G(h), E(p);
		var g = F(p, 2), _ = M(g), v = F(_);
		G(v), E(g);
		var y = F(g, 2), b = (e) => {
			var n = K_(), r = N(n), a = M(r), o = F(a);
			{
				let e = /* @__PURE__ */ k(() => L(t).page ?? "__href"), n = /* @__PURE__ */ k(() => [...L(i).pages.map((e) => [e.id, e.title]), ["__href", J("opt.linkHrefMailto")]]);
				Y(o, {
					get value() {
						return L(e);
					},
					get options() {
						return L(n);
					},
					onchange: (e) => ne(e)
				});
			}
			E(r);
			var s = F(r, 2), c = (e) => {
				var n = G_();
				G(n), I((e, r) => {
					K(n, L(t).href ?? ""), q(n, "placeholder", e), q(n, "title", r);
				}, [() => J("ph.hrefMailtoAnchor"), () => J("tip.hrefAnchor")]), R("change", n, (e) => te("href", e.target.value)), B(e, n);
			};
			H(s, (e) => {
				L(t).page || e(c);
			}), I((e, t) => {
				q(r, "title", e), V(a, `${t ?? ""} `);
			}, [() => J("tip.footer.ctaTarget"), () => J("lbl.buttonTarget")]), B(e, n);
		}, x = (e) => {
			var n = q_(), r = N(n), i = M(r), a = F(i);
			G(a), E(r);
			var o = F(r, 2), s = M(o), c = F(s);
			G(c), E(o);
			var l = F(o, 2), u = M(l), d = F(u);
			G(d), E(l), I((e, n, f, p, m, h, g, _, v) => {
				q(r, "title", e), V(i, `${n ?? ""} `), K(a, L(t).endpoint ?? ""), q(a, "placeholder", f), q(o, "title", p), V(s, `${m ?? ""} `), K(c, L(t).recipient ?? ""), q(c, "placeholder", h), q(l, "title", g), V(u, `${_ ?? ""} `), K(d, L(t).success ?? ""), q(d, "placeholder", v);
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
			]), R("change", a, (e) => te("endpoint", e.target.value)), R("change", c, (e) => te("recipient", e.target.value)), R("input", d, (e) => te("success", e.target.value)), B(e, n);
		};
		H(y, (e) => {
			(L(t).kind ?? "button") === "button" ? e(b) : e(x, -1);
		}), I((e, n, i, o, y, b, x, S, C, w, T, ee) => {
			q(r, "title", e), V(a, `${n ?? ""} `), q(s, "title", i), Ni(c, L(t).big === !0), V(l, ` ${o ?? ""}`), q(u, "title", y), V(d, `${b ?? ""} `), K(f, L(t).heading ?? ""), q(f, "placeholder", x), q(p, "title", S), V(m, `${C ?? ""} `), K(h, L(t).sub ?? ""), q(g, "title", w), V(_, `${T ?? ""} `), K(v, L(t).label ?? ""), q(v, "placeholder", ee);
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
		]), R("change", c, (e) => te("big", e.target.checked)), R("input", f, (e) => te("heading", e.target.value)), R("input", h, (e) => te("sub", e.target.value)), R("input", v, (e) => te("label", e.target.value)), B(e, n);
	};
	H(vt, (e) => {
		L(i).footer?.cta && e(yt);
	}), E(mt), E(dt);
	var bt = F(dt, 2), xt = M(bt), St = P(xt, !0), Ct = F(xt, 2), wt = M(Ct);
	n(wt, () => "linkRow", () => L(i).footer?.linkRow ?? []);
	var Tt = F(wt, 2), Et = P(Tt, !0);
	E(Ct), E(bt);
	var Dt = F(bt, 2), Ot = M(Dt), kt = P(Ot, !0), At = F(Ot, 2), jt = M(At), Mt = (e) => {
		var t = Y_(), n = N(t), r = M(n), a = F(r);
		{
			let e = /* @__PURE__ */ k(() => L(i).footer?.align ?? "left"), t = /* @__PURE__ */ k(() => [
				["left", J("common.left")],
				["center", J("common.center")],
				["right", J("common.right")]
			]);
			Y(a, {
				get value() {
					return L(e);
				},
				get options() {
					return L(t);
				},
				onchange: (e) => s("footer", (t) => {
					t.align = e;
				})
			});
		}
		E(n), ke(2), I((e, t) => {
			q(n, "title", e), V(r, `${t ?? ""} `);
		}, [() => J("tip.footer.align"), () => J("lbl.align")]), B(e, t);
	};
	H(jt, (e) => {
		L(i).footer?.cta?.big !== !0 && e(Mt);
	});
	var Nt = F(jt, 2), Pt = P(Nt, !0);
	li(F(Nt, 2), () => t.backgroundLayers, () => o, () => L(i).footer?.background?.layers ?? []), E(At), E(Dt);
	var Ft = F(Dt, 2), It = M(Ft), Lt = P(It, !0), Rt = F(It, 2), zt = M(Rt), Bt = M(zt), Vt = F(Bt);
	G(Vt), E(zt);
	var Ht = F(zt, 2), Ut = P(Ht, !0), Wt = F(Ht, 2);
	n(Wt, () => "baseline", () => L(i).footer?.baseline ?? []);
	var Gt = F(Wt, 2), Kt = P(Gt, !0);
	E(Rt), E(Ft), E(be), I((e, t, n, r, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, ee, te, ne, re, ie, ae, oe) => {
		q(xe, "title", e), Ni(Se, t), V(Ce, ` ${n ?? ""}`), V(Oe, r), V(Pe, a), q(Fe, "title", o), V(Ie, `${s ?? ""} `), K(O, L(i).footer?.brand?.title ?? ""), q(O, "placeholder", c), q(Le, "title", l), V(Re, `${u ?? ""} `), K(ze, L(i).footer?.brand?.tagline ?? ""), q(Be, "title", d), V(Ve, `${f ?? ""} `), V(qe, p), V(Ze, m), q($e, "title", h), V(nt, `${g ?? ""} `), V(ot, _), V(ut, v), V(pt, y), q(ht, "title", b), Ni(gt, x), V(_t, ` ${S ?? ""}`), V(St, C), V(Et, w), V(kt, T), V(Pt, ee), V(Lt, te), q(zt, "title", ne), V(Bt, `${re ?? ""} `), K(Vt, L(i).footer?.copyright ?? ""), q(Vt, "placeholder", ie), V(Ut, ae), V(Kt, oe);
	}, [
		() => J("tip.footer.show"),
		() => !!L(i).footer?.show,
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
		() => !!L(i).footer?.cta,
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
	]), R("change", Se, (e) => s("footer", (t) => {
		t.show = e.target.checked;
	})), R("input", O, (e) => l("title", e.target.value)), R("input", ze, (e) => l("tagline", e.target.value)), R("click", Xe, ie), R("click", lt, me), R("change", gt, (e) => ee(e.target.checked)), R("click", Tt, () => y("linkRow")), R("input", Vt, (e) => h(e.target.value)), R("click", Gt, () => y("baseline")), B(e, be), tt();
}
Nr([
	"input",
	"click",
	"change"
]);
//#endregion
//#region src/lib/preview-scale.js
function Q_(e, t) {
	return !(e > 0) || !(t > 0) ? 1 : e / t;
}
function $_(e, t, n, r = 0, i = 0) {
	if (n === "full") return 1;
	let a = i > 0 ? Q_(r, i) : Infinity;
	return Math.max(.1, Math.min(1, Q_(e, t), a));
}
//#endregion
//#region src/lib/deploy-wait.js
function ev(e, { max: t = 8 } = {}) {
	let n = (e ?? []).filter((e) => e && typeof e.path == "string" && typeof e.content == "string" && e.encoding === "utf-8" && !e.delete && (e.path.startsWith("content/") || e.path === "plugins/plugins.json"));
	return n.sort((e, t) => (e.path === "content/site.json" ? -1 : 0) - (t.path === "content/site.json" ? -1 : 0)), n.slice(0, t).map(({ path: e, content: t }) => ({
		path: e,
		content: t
	}));
}
async function tv(e, { fetchFn: t = fetch, delayMs: n = 1e4, attempts: r = 18, sleep: i = (e) => new Promise((t) => setTimeout(t, e)) } = {}) {
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
var nv = 3840, rv = 2400, iv = (e, t, n) => Math.min(n, Math.max(t, e));
function av({ innerWidth: e = 0, screenWidth: t = 0 } = {}) {
	let n = e > 0 ? e : t;
	return Math.max(1, Math.round(n > 0 ? n : 1));
}
function ov(e) {
	return !e || typeof e.innerWidth != "number" ? null : av({
		innerWidth: e.innerWidth,
		screenWidth: e.screen?.width ?? 0
	});
}
function sv(e, t) {
	let n = e && typeof e == "object" && !Array.isArray(e) ? e : {}, r = n.mode === "custom" ? "custom" : "own", i = Number(n.width), a = iv(Number.isFinite(i) && i > 0 ? i : t, 640, nv), o = Number(n.height), s = Number.isFinite(o) && o > 0 ? iv(o, 480, rv) : 0;
	return {
		mode: r,
		width: Math.round(a),
		height: Math.round(s)
	};
}
function cv(e, t) {
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
var lv = /* @__PURE__ */ z("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\"> </h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\"></canvas> <p class=\"ie-hint svelte-e7sog7\"> </p></div> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"ghost svelte-e7sog7\"> </button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"primary svelte-e7sog7\"> </button></span></div></div>");
function uv(e, t) {
	et(t, !0);
	let n = qi(t, "image", 3, ""), r = /* @__PURE__ */ A(null), i = /* @__PURE__ */ A(null), a = /* @__PURE__ */ A(1), o = /* @__PURE__ */ A(.5), s = /* @__PURE__ */ A(.5), c = /* @__PURE__ */ A(1), l = /* @__PURE__ */ A(1), u = /* @__PURE__ */ A(1);
	On(() => {
		if (!n()) return;
		let e = new Image();
		e.onload = () => {
			j(i, e, !0);
		}, e.src = n();
	});
	function d(e, t) {
		if (e.clearRect(0, 0, t, t), !L(i)) return;
		e.filter = `brightness(${L(c)}) contrast(${L(l)}) saturate(${L(u)})`;
		let n = Math.max(t / L(i).width, t / L(i).height) * L(a), r = L(i).width * n, d = L(i).height * n, f = t / 2 - L(o) * r, p = t / 2 - L(s) * d;
		f = Math.min(0, Math.max(t - r, f)), p = Math.min(0, Math.max(t - d, p)), e.drawImage(L(i), f, p, r, d), e.filter = "none";
	}
	On(() => {
		L(i), L(a), L(o), L(s), L(c), L(l), L(u), L(r) && d(L(r).getContext("2d"), 220);
	});
	function f(e) {
		if (!L(i)) return;
		e.preventDefault();
		let t = e.clientX, n = e.clientY, r = Math.max(220 / L(i).width, 220 / L(i).height) * L(a), c = L(i).width * r, l = L(i).height * r, u = (e) => {
			j(o, Math.min(1, Math.max(0, L(o) - (e.clientX - t) / c)), !0), j(s, Math.min(1, Math.max(0, L(s) - (e.clientY - n) / l)), !0), t = e.clientX, n = e.clientY;
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
	var h = lv(), g = M(h), _ = M(g), v = P(_, !0), y = F(_, 2), b = M(y);
	q(b, "width", 220), q(b, "height", 220), Ui(b, (e) => j(r, e), () => L(r));
	var x = P(F(b, 2), !0);
	E(y);
	var S = F(y, 2), C = M(S), w = P(F(C));
	E(S);
	var T = F(S, 2);
	G(T);
	var ee = F(T, 2), te = M(ee), ne = P(F(te));
	E(ee);
	var re = F(ee, 2);
	G(re);
	var ie = F(re, 2), ae = M(ie), oe = P(F(ae));
	E(ie);
	var se = F(ie, 2);
	G(se);
	var ce = F(se, 2), le = M(ce), ue = P(F(le));
	E(ce);
	var de = F(ce, 2);
	G(de);
	var fe = F(de, 2), pe = M(fe), me = P(pe, !0), he = F(pe, 2), ge = P(he, !0);
	E(fe);
	var _e = F(fe, 2), ve = M(_e), ye = P(ve, !0), be = F(ve, 2), xe = P(be, !0);
	E(_e), E(g), E(h), I((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) => {
		V(v, e), q(b, "title", t), V(x, n), V(C, `${r ?? ""} `), V(w, `${i ?? ""}x`), V(te, `${a ?? ""} `), V(ne, `${o ?? ""}%`), V(ae, `${s ?? ""} `), V(oe, `${c ?? ""}%`), V(le, `${l ?? ""} `), V(ue, `${u ?? ""}%`), V(me, d), V(ge, f), V(ye, p), V(xe, m);
	}, [
		() => J("ie.title"),
		() => J("ie.dragTip"),
		() => J("ie.hint"),
		() => J("lbl.zoom"),
		() => L(a).toFixed(2),
		() => J("lbl.brightness"),
		() => Math.round(L(c) * 100),
		() => J("lbl.contrast"),
		() => Math.round(L(l) * 100),
		() => J("lbl.saturate"),
		() => Math.round(L(u) * 100),
		() => J("ie.grayscale"),
		() => J("common.reset"),
		() => J("confirm.cancel"),
		() => J("common.apply")
	]), R("pointerdown", b, f), Li(T, () => L(a), (e) => j(a, e)), Li(re, () => L(c), (e) => j(c, e)), Li(se, () => L(l), (e) => j(l, e)), Li(de, () => L(u), (e) => j(u, e)), R("click", pe, () => j(u, 0)), R("click", he, p), R("click", ve, () => t.oncancel?.()), R("click", be, m), B(e, h), tt();
}
Nr(["pointerdown", "click"]);
//#endregion
//#region ../template/assets/engine/0.7.4/calendar-thumb.js
var dv = "#0e1512", fv = "#2fd6b6", pv = "#5c6b64", mv = "#22302a", hv = "#e8efe9", gv = "#16221d", _v = "#1c2340", vv = "#f3ecd8", yv = "#d0a74a", bv = (e) => e < 1 ? ` opacity="${e}"` : "", $ = (e, t, n, r, i, a = 1, o = 2) => `<rect x="${e}" y="${t}" width="${n}" height="${r}" rx="${o}" fill="${i}"${bv(a)}/>`, xv = (e, t, n, r, i = 1) => `<circle cx="${e}" cy="${t}" r="${n}" fill="${r}"${bv(i)}/>`, Sv = (e, t, n, r, i, a = 1, o = 1) => `<line x1="${e}" y1="${t}" x2="${n}" y2="${r}" stroke="${i}" stroke-width="${a}"${bv(o)}/>`, Cv = (e, t, n, r) => Array.from({ length: e }, (e, i) => r(t + i * n, i)).join(""), wv = (e, t = dv) => `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${t}"/>${e}</svg>`;
function Tv(e, t, n, r, i, a = pv) {
	let o = "", s = n / 7, c = r / 4;
	for (let n = 0; n < 28; n++) {
		let r = e + n % 7 * s + s / 2, l = t + Math.floor(n / 7) * c + c / 2;
		o += xv(r, l, 1.6, i.includes(n) ? fv : a, i.includes(n) ? 1 : .55);
	}
	return o;
}
var Ev = {
	plain: () => Cv(3, 12, 20, (e) => $(14, e, 14, 14, mv, 1, 3) + $(34, e + 2, 70, 4, pv, .9) + $(34, e + 9, 46, 3, pv, .5)),
	timeline: () => Sv(50, 10, 50, 70, pv, 1.2, .7) + Cv(3, 16, 22, (e, t) => $(18, e - 3, 24, 5, pv, .9) + xv(50, e, 3.4, t ? pv : fv) + $(60, e - 3, 62, 4, pv, .9) + $(60, e + 4, 40, 3, pv, .5)),
	table: () => $(12, 10, 136, 10, fv, 1, 3) + Cv(4, 26, 12, (e, t) => (t % 2 ? $(12, e - 3, 136, 12, mv, .8, 0) : "") + $(16, e, 20, 3, pv, .9) + $(44, e, 14, 3, pv, .5) + $(66, e, 44, 3, pv, .9) + $(118, e, 24, 3, pv, .5)),
	booklet: () => $(12, 8, 136, 64, hv, 1, 2) + $(20, 14, 40, 7, gv) + Sv(20, 26, 140, 26, gv, 1.4) + [20, 84].map((e) => Cv(3, 32, 12, (t) => $(e, t, 8, 8, fv, 1, 1) + $(e + 12, t, 36, 3, gv, .85) + $(e + 12, t + 5, 26, 2.5, gv, .4))).join(""),
	numbered: () => Cv(3, 12, 20, (e) => Sv(14, e - 3, 146, e - 3, pv, .8, .6) + $(14, e, 14, 12, fv, 1, 2) + $(36, e + 1, 64, 4, pv, .9) + $(36, e + 8, 44, 3, pv, .5) + $(120, e + 3, 24, 4, fv, .7)),
	apList: () => Cv(3, 10, 21, (e) => $(12, e, 136, 17, _v, 1, 2) + $(18, e + 4, 10, 9, yv, 1, 1) + Sv(34, e + 3, 34, e + 14, yv, .8, .5) + $(40, e + 4, 26, 3, yv, .8) + $(40, e + 10, 56, 3.5, vv, .9)),
	glass: () => xv(30, 14, 34, "#ff8a65", .55) + xv(132, 70, 36, "#7fd1c4", .55) + xv(100, 10, 20, "#ffd36b", .4) + Cv(3, 12, 20, (e) => $(14, e, 132, 15, "#ffffff", .32, 6) + $(20, e + 4, 9, 7, hv, .9, 1) + $(36, e + 4, 50, 3, hv, .9) + $(36, e + 9, 34, 2.5, hv, .5)),
	posters: () => $(12, 10, 62, 60, fv, 1, 4) + $(20, 30, 18, 20, gv, .9, 2) + $(20, 56, 40, 4, gv, .8) + $(80, 10, 32, 28, hv, 1, 4) + $(86, 16, 10, 10, gv, .8, 1) + $(116, 10, 32, 28, "#bfe9df", 1, 4) + $(122, 16, 10, 10, gv, .8, 1) + $(80, 42, 32, 28, mv, 1, 4) + $(86, 48, 10, 10, fv, 1, 1) + $(116, 42, 32, 28, mv, .5, 4),
	tickets: () => Cv(3, 10, 21, (e) => $(12, e, 136, 17, mv, 1, 4) + $(12, e, 30, 17, fv, 1, 4) + $(20, e + 4, 12, 9, gv, .85, 1) + Sv(42, e + 1, 42, e + 16, dv, 1.6) + $(50, e + 4, 50, 3.5, pv, .95) + $(50, e + 10, 34, 2.5, pv, .55) + $(120, e + 5, 22, 7, fv, .85)),
	carousel: () => [
		12,
		50,
		88,
		126
	].map((e, t) => $(e, 14, 34, 54, t ? mv : fv, 1, 4) + $(e + 6, 22, 12, 14, t ? fv : gv, .9, 1) + $(e + 6, 50, 22, 3, t ? pv : gv, .9) + $(e + 6, 56, 14, 2.5, t ? pv : gv, .5)).join(""),
	photo: () => [
		12,
		60,
		108
	].map((e) => $(e, 12, 40, 56, mv, 1, 4) + $(e, 12, 40, 26, fv, .45, 4) + $(e + 4, 16, 12, 6, hv, .95, 1) + $(e + 5, 44, 28, 3.5, pv, .95) + $(e + 5, 51, 20, 2.5, pv, .5) + $(e + 5, 58, 14, 5, fv, .9)).join(""),
	apGrid: () => [
		12,
		60,
		108
	].map((e) => $(e, 12, 40, 56, vv, 1, 2) + $(e, 12, 40, 16, _v, 1, 2) + Sv(e, 28, e + 40, 28, yv, 1.4) + $(e + 4, 16, 8, 8, yv, 1, 1) + $(e + 22, 18, 14, 4, yv, .9) + $(e + 5, 36, 28, 4, _v, .9) + $(e + 5, 44, 18, 2.5, _v, .55) + $(e + 5, 52, 24, 2.5, _v, .4)).join(""),
	bento: () => $(12, 10, 66, 40, hv, 1, 6) + $(18, 14, 16, 5, fv, 1, 2) + $(18, 28, 14, 14, gv, .9, 1) + $(36, 38, 34, 4, gv, .8) + $(82, 10, 31, 18, mv, 1, 5) + $(117, 10, 31, 18, mv, 1, 5) + $(82, 32, 66, 18, mv, 1, 5) + Tv(86, 34, 58, 14, [
		9,
		12,
		19
	]) + $(12, 54, 31, 18, hv, 1, 5) + $(47, 54, 31, 18, fv, .4, 5) + $(82, 54, 66, 18, mv, 1, 5) + $(88, 60, 30, 4, pv, .9),
	weekStrip: () => $(60, 8, 40, 5, pv, .9) + Array.from({ length: 7 }, (e, t) => $(12 + t * 19.6, 20, 17, 50, t === 3 ? fv : mv, t === 3 ? .25 : 1, 3) + $(15 + t * 19.6, 24, 6, 5, pv, .9, 1) + ([
		1,
		3,
		5
	].includes(t) ? $(14 + t * 19.6, 36, 13, 7, fv, 1, 2) : "")).join(""),
	weekPlan: () => $(12, 8, 136, 64, mv, .6, 3) + Cv(4, 22, 12, (e) => Sv(12, e, 148, e, pv, .6, .6)) + Array.from({ length: 7 }, (e, t) => Sv(30 + t * 17, 14, 30 + t * 17, 72, pv, .6, .6)).join("") + $(82, 14, 16, 58, fv, .14, 0) + $(49, 36, 13, 10, fv, .9, 2) + $(83, 48, 13, 14, fv, .9, 2) + $(117, 24, 13, 9, hv, .7, 2),
	layers: () => $(12, 8, 136, 64, mv, .6, 3) + $(70, 12, 22, 6, fv, .9, 3) + $(96, 12, 22, 6, hv, .7, 3) + $(122, 12, 22, 6, pv, .6, 3) + Cv(3, 26, 15, (e, t) => Sv(12, e - 2, 148, e - 2, pv, .6, .6) + $(16, e + 3, 16, 3, pv, .9) + $([
		44,
		62,
		100
	][t], e + 1, [
		46,
		22,
		40
	][t], 8, [
		fv,
		hv,
		"#7fd1c4"
	][t], .9, 3)),
	sidepanel: () => $(12, 8, 136, 64, mv, .6, 3) + Tv(18, 18, 76, 48, [
		5,
		10,
		17,
		24
	]) + $(100, 8, 48, 64, mv, 1, 3) + $(106, 14, 26, 5, hv, .9) + Cv(2, 26, 16, (e) => $(106, e, 36, 12, dv, 1, 2) + Sv(106, e, 106, e + 12, fv, 2) + $(111, e + 3, 24, 3, pv, .9)),
	apMonth: () => $(12, 8, 136, 64, vv, 1, 2) + Sv(12, 8, 148, 8, yv, 2.4) + $(58, 13, 44, 5, _v, .9) + Cv(4, 26, 12, (e) => Sv(12, e, 148, e, yv, .6, .5)) + Array.from({ length: 6 }, (e, t) => Sv(31.4 + t * 19.4, 26, 31.4 + t * 19.4, 72, yv, .6, .5)).join("") + $(54, 40, 14, 5, yv, .6, 0) + Sv(54, 40, 54, 45, yv, 2) + $(112, 52, 14, 5, yv, .6, 0) + Sv(112, 52, 112, 57, yv, 2) + xv(98, 32, 3.4, yv),
	dayPlan: () => $(34, 6, 92, 68, mv, .6, 5) + $(42, 12, 40, 5, hv, .9) + Array.from({ length: 7 }, (e, t) => $(42 + t * 11, 22, 8, 9, t === 2 ? fv : mv, 1, 2)).join("") + Cv(4, 38, 9, (e) => Sv(34, e, 126, e, pv, .6, .6)) + $(56, 39, 62, 7, hv, .5, 2) + $(56, 57, 62, 7, fv, .5, 2) + Sv(48, 51, 126, 51, fv, 1.4) + xv(48, 51, 2.2, fv),
	yearWheel: () => `<circle cx="46" cy="40" r="24" fill="none" stroke="${mv}" stroke-width="9"/><circle cx="46" cy="40" r="24" fill="none" stroke="${pv}" stroke-width="9" stroke-dasharray="100 151" transform="rotate(-90 46 40)"${bv(.8)}/><circle cx="46" cy="40" r="24" fill="none" stroke="${fv}" stroke-width="9" stroke-dasharray="13 151" stroke-dashoffset="-100" transform="rotate(-90 46 40)"/>` + xv(24, 32, 2, hv) + xv(26, 50, 2, hv) + xv(60, 60, 2, hv, .5) + $(38, 37, 16, 6, hv, .9) + $(88, 20, 20, 4, fv) + Cv(3, 30, 13, (e) => $(88, e, 56, 9, mv, 1, 2) + $(92, e + 3, 34, 3, pv, .9)),
	heatmap: () => $(12, 8, 136, 64, mv, .6, 3) + Array.from({ length: 3 }, (e, t) => Array.from({ length: 28 }, (e, n) => $(18 + t * 44 + n % 7 * 5.4, 16 + Math.floor(n / 7) * 5.4, 4.2, 4.2, [
		3,
		11,
		16,
		24
	].includes((n + t * 5) % 28) ? fv : pv, [
		3,
		11,
		16,
		24
	].includes((n + t * 5) % 28) ? 1 : (n * 7 + t) % 5 == 0 ? .6 : .28, 1)).join("")).join("") + $(18, 46, 124, 9, dv, .8, 2) + $(22, 49, 30, 3, hv, .8),
	billboard: () => $(34, 6, 92, 68, gv, 1, 6) + xv(42, 14, 2, fv) + $(48, 12, 24, 4, fv, .9) + $(42, 22, 60, 7, hv, .95) + [
		42,
		70,
		98
	].map((e) => $(e, 36, 22, 16, mv, 1, 3) + $(e + 6, 40, 10, 7, hv, .9, 1)).join("") + $(42, 58, 78, 9, fv, 1, 3),
	stacked: () => $(54, 10, 70, 44, mv, .7, 5) + $(46, 16, 70, 44, mv, 1, 5) + $(38, 22, 70, 44, hv, 1, 5) + $(44, 28, 22, 6, fv, 1, 3) + $(44, 40, 44, 5, gv, .9) + $(44, 49, 30, 3, gv, .5) + $(44, 56, 20, 6, fv, 1, 2),
	noticeboard: () => $(34, 6, 92, 68, "#8a5a3c", 1, 5) + $(42, 14, 64, 28, "#fff7cc", 1, 0) + xv(74, 14, 3, "#d33a2c") + $(48, 22, 40, 5, gv, .9) + $(48, 31, 28, 3, gv, .5) + $(48, 46, 58, 20, "#d9ecff", 1, 0) + xv(54, 46, 2.6, "#2f6fd6") + $(54, 53, 36, 4, gv, .85) + $(54, 60, 44, 2.5, gv, .45),
	split: () => $(16, 10, 128, 60, mv, 1, 6) + $(16, 10, 44, 42, fv, 1, 6) + $(24, 22, 20, 22, gv, .9, 2) + $(68, 16, 20, 5, pv, .7, 2) + $(68, 26, 58, 6, hv, .95) + $(68, 36, 40, 3, pv, .7) + Sv(16, 52, 144, 52, pv, .6, .6) + $(24, 58, 60, 3, pv, .8) + $(24, 64, 44, 2.5, pv, .5),
	band: () => $(8, 30, 144, 20, fv, 1, 0) + $(8, 30, 40, 20, gv, 1, 0) + xv(16, 40, 2, fv) + $(22, 38, 20, 4, hv, .9) + $(56, 38, 34, 4, gv, .85) + xv(96, 40, 1.8, gv) + $(102, 38, 34, 4, gv, .85) + xv(142, 40, 1.8, gv),
	oneLine: () => Cv(3, 12, 20, (e, t) => $(12, e, 136, 15, mv, t ? .7 : 1, 4) + Sv(12, e + 1, 12, e + 14, t ? pv : fv, 3) + xv(22, e + 7.5, 2.4, t ? pv : fv) + $(30, e + 5.5, 20, 4, t ? pv : fv, .9) + $(56, e + 5.5, 54, 4, pv, .9) + (t ? "" : $(124, e + 4, 18, 7, fv, 1, 2))),
	ring: () => $(30, 6, 100, 68, mv, 1, 8) + `<circle cx="58" cy="34" r="15" fill="none" stroke="${pv}" stroke-width="5"${bv(.5)}/><circle cx="58" cy="34" r="15" fill="none" stroke="${fv}" stroke-width="5" stroke-linecap="round" stroke-dasharray="70 94" transform="rotate(-90 58 34)"/>` + $(53, 31, 10, 6, hv, .9, 1) + $(82, 24, 38, 6, hv, .95) + $(82, 35, 28, 3, pv, .8) + Sv(38, 56, 122, 56, pv, .6, .6) + $(38, 61, 50, 3, pv, .7) + $(38, 67, 40, 3, pv, .5),
	darkGlass: () => $(34, 6, 92, 68, "#121216", 1, 7) + xv(112, 16, 22, fv, .45) + xv(46, 68, 20, "#3fb8a4", .35) + xv(42, 14, 2, fv) + $(48, 12, 22, 4, fv, .9) + $(42, 22, 56, 6, hv, .95) + $(42, 34, 76, 3, pv, .6, 1.5) + $(42, 34, 60, 3, fv, 1, 1.5) + $(42, 42, 36, 9, hv, 1, 3) + $(82, 42, 36, 9, hv, .18, 3) + $(42, 56, 76, 14, hv, .1, 3) + $(47, 61, 40, 3, hv, .7),
	nextBento: () => $(40, 8, 80, 26, fv, 1, 6) + $(46, 13, 22, 4, gv, .8) + $(46, 23, 44, 5, gv, .9) + $(40, 38, 38, 16, mv, 1, 5) + $(82, 38, 38, 16, mv, 1, 5) + $(40, 58, 38, 16, hv, 1, 5) + $(82, 58, 38, 16, fv, .4, 5) + $(46, 42, 8, 7, hv, .9, 1) + $(88, 42, 8, 7, hv, .9, 1) + $(46, 62, 8, 7, gv, .9, 1),
	apNow: () => $(40, 6, 80, 68, vv, 1, 5) + $(40, 6, 80, 12, _v, 1, 5) + xv(47, 12, 1.8, yv) + $(52, 10, 22, 4, yv, .9) + $(46, 24, 14, 14, _v, 1, 2) + $(50, 28, 6, 6, yv, 1, 1) + $(66, 25, 44, 5, _v, .9) + $(66, 34, 32, 3, _v, .5) + $(40, 46, 80, 28, "#eae1c7", 1, 0) + Sv(48, 54, 48, 66, yv, 1) + xv(48, 54, 1.8, yv) + xv(48, 66, 1.8, yv) + $(54, 52, 40, 3.5, _v, .8) + $(54, 64, 34, 3.5, _v, .8),
	apNavy: () => $(40, 6, 80, 68, _v, 1, 5) + xv(47, 13, 1.8, yv) + $(52, 11, 22, 4, yv, .9) + $(46, 20, 68, 22, vv, 1, 3) + $(51, 25, 8, 10, yv, 1, 1) + $(64, 25, 40, 5, _v, .9) + $(64, 34, 26, 3, _v, .5) + `<rect x="46" y="46" width="68" height="14" rx="3" fill="#262e4f" stroke="${yv}" stroke-width="0.8"/>` + $(51, 50, 7, 6, yv, 1, 1) + $(64, 51, 36, 4, vv, .85) + $(46, 66, 50, 3, vv, .6),
	apSeries: () => $(12, 8, 136, 64, "#f5efdd", 1, 2) + Sv(20, 17, 34, 17, yv, 1) + $(38, 15, 26, 3.5, yv, .9) + $(20, 24, 58, 8, "#7a1a1a") + $(20, 38, 64, 3, _v, .6) + $(20, 44, 52, 3, _v, .6) + [
		20,
		46,
		72
	].map((e) => $(e, 54, 12, 2.5, yv, .9) + $(e, 60, 20, 3.5, _v, .8)).join("") + Sv(100, 14, 100, 66, yv, .8, .6) + $(108, 18, 30, 8, "#7a1a1a", .85) + $(108, 32, 32, 2.5, _v, .5) + $(108, 38, 26, 2.5, _v, .5),
	mobileAgenda: () => $(50, 4, 60, 72, "#121216", 1, 8) + $(56, 10, 22, 4, hv, .9) + Array.from({ length: 7 }, (e, t) => $(56 + t * 7.1, 18, 5.6, 9, t === 2 ? fv : mv, 1, 2)).join("") + Cv(3, 32, 14, (e) => $(56, e, 48, 11, "#1c1c22", 1, 3) + Sv(67, e + 2, 67, e + 9, fv, 1.4) + $(58, e + 4, 6, 3, pv, .8) + $(70, e + 3, 26, 3, hv, .85))
};
Object.keys(Ev);
function Dv(e) {
	let t = Ev[e] ?? Ev.plain, n = ["booklet"].includes(e);
	return wv(t(), n ? "#1a2620" : dv);
}
//#endregion
//#region src/lib/DesignPicker.svelte
var Ov = /* @__PURE__ */ z("<button type=\"button\"> </button>"), kv = /* @__PURE__ */ z("<img alt=\"\" loading=\"lazy\" decoding=\"async\" class=\"svelte-wurosr\"/>"), Av = /* @__PURE__ */ z("<span class=\"dp-mark svelte-wurosr\"> </span>"), jv = /* @__PURE__ */ z("<button type=\"button\"><span class=\"dp-pic svelte-wurosr\"><!></span> <span class=\"dp-name svelte-wurosr\"> </span> <!></button>"), Mv = /* @__PURE__ */ z("<section class=\"dp-family svelte-wurosr\"><h3 class=\"svelte-wurosr\"> </h3> <div class=\"dp-grid svelte-wurosr\"></div></section>"), Nv = /* @__PURE__ */ z("<p class=\"dp-none svelte-wurosr\"> </p>"), Pv = /* @__PURE__ */ z("<span class=\"dp-side-view svelte-wurosr\"> </span>"), Fv = /* @__PURE__ */ z("<dialog class=\"dp-overlay svelte-wurosr\"><div class=\"dp-card svelte-wurosr\"><div class=\"dp-head svelte-wurosr\"><h2 class=\"svelte-wurosr\"> </h2> <input class=\"dp-search svelte-wurosr\" type=\"search\"/> <span class=\"dp-count svelte-wurosr\"> </span> <button type=\"button\" class=\"dp-close svelte-wurosr\"><svg viewBox=\"0 0 16 16\" width=\"16\" height=\"16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" aria-hidden=\"true\"><path d=\"M3 3l10 10M13 3L3 13\"></path></svg></button></div> <div class=\"dp-views svelte-wurosr\" role=\"group\"><button type=\"button\"> </button> <!></div> <div class=\"dp-body svelte-wurosr\"><div class=\"dp-list svelte-wurosr\"><!> <!></div> <aside class=\"dp-side svelte-wurosr\"><div class=\"dp-side-head svelte-wurosr\"><strong> </strong> <!></div> <div class=\"dp-preview svelte-wurosr\"><div class=\"dp-stage svelte-wurosr\"><iframe src=\"/?preview=1\" class=\"svelte-wurosr\"></iframe></div></div> <button type=\"button\" class=\"dp-use svelte-wurosr\"> </button></aside></div></div></dialog>");
function Iv(e, t) {
	et(t, !0);
	let n = qi(t, "current", 3, null), r = qi(t, "mode", 3, "set"), i = qi(t, "site", 3, null), a = qi(t, "page", 3, null), o = {
		list: "calendar.viewList",
		cards: "calendar.viewCards",
		month: "calendar.viewMonth",
		agenda: "calendar.viewAgenda",
		next: "calendar.viewNext",
		week: "calendar.viewWeek",
		day: "calendar.viewDay",
		year: "calendar.viewYear"
	}, s = 1040, c = /* @__PURE__ */ A(""), l = /* @__PURE__ */ A(""), u = /* @__PURE__ */ A(cn(n() ?? "plain")), d = /* @__PURE__ */ A(cn(/* @__PURE__ */ new Set())), f = /* @__PURE__ */ A(null), p = /* @__PURE__ */ A(0), m = /* @__PURE__ */ A(!1), h = /* @__PURE__ */ A(600), g = /* @__PURE__ */ A(null), _ = /* @__PURE__ */ A(null), v = (e) => !L(l) || e.view === null || e.view === L(l), y = (e) => v(e) && (!L(c).trim() || J(e.labelKey).toLowerCase().includes(L(c).trim().toLowerCase())), b = /* @__PURE__ */ k(() => Vo().map((e) => ({
		...e,
		designs: e.designs.filter(y)
	})).filter((e) => e.designs.length)), x = /* @__PURE__ */ k(() => L(b).reduce((e, t) => e + t.designs.length, 0)), S = /* @__PURE__ */ k(() => ts(L(u))), C = /* @__PURE__ */ k(() => L(p) ? Math.min(1, L(p) / s) : .4);
	On(() => {
		L(_) && !L(_).open && L(_).showModal(), L(g)?.focus();
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
	let T = (e) => L(f)?.contentWindow?.postMessage(e, location.origin);
	function ee() {
		let e = L(f)?.contentDocument, t = e?.querySelector(".urd-block[data-block-id=\"design-picker-cal\"]");
		if (!t) return;
		let n = t.getBoundingClientRect().bottom + (e.defaultView?.scrollY ?? 0), r = Math.max(160, Math.ceil(n + 24));
		r !== L(h) && j(h, r, !0);
	}
	let te = null, ne = null;
	function re() {
		te?.disconnect(), te = null;
		let e = L(f)?.contentWindow;
		if (!e?.ResizeObserver) return;
		let t = 0, n = () => {
			let r = e.document.querySelector(".urd-block[data-block-id=\"design-picker-cal\"]");
			r && r !== ne ? (ne = r, te = new e.ResizeObserver(ee), te.observe(r), ee()) : t++ < 300 && e.requestAnimationFrame(n);
		};
		n();
	}
	function ie() {
		T({
			type: "urd-preview-full",
			pageId: "design-picker",
			page: w(L(u))
		}), re();
	}
	function ae(e) {
		if (e.origin !== location.origin || e.source !== L(f)?.contentWindow || e.data?.type !== "urd-ready") return;
		let t = L(f)?.contentDocument;
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
		}), j(m, !0);
	}
	On(() => {
		L(u), L(m) && ie();
	}), On(() => () => te?.disconnect());
	function oe() {
		t.onclose?.();
	}
	function se(e) {
		j(d, /* @__PURE__ */ new Set([...L(d), e]), !0);
	}
	var ce = Fv();
	Mr("message", ln, ae);
	var le = M(ce), ue = M(le), de = M(ue), fe = P(de, !0), pe = F(de, 2);
	G(pe), Ui(pe, (e) => j(g, e), () => L(g));
	var me = F(pe, 2), he = P(me, !0), ge = F(me, 2);
	E(ue);
	var _e = F(ue, 2), ve = M(_e);
	let ye;
	var be = P(ve, !0);
	ri(F(ve, 2), 16, () => No, (e) => e, (e, t) => {
		var n = Ov();
		let r;
		var i = P(n, !0);
		I((e) => {
			q(n, "aria-pressed", L(l) === t), r = W(n, 1, "svelte-wurosr", null, r, { on: L(l) === t }), V(i, e);
		}, [() => J(o[t])]), R("click", n, () => j(l, t, !0)), B(e, n);
	}), E(_e);
	var xe = F(_e, 2), Se = M(xe), Ce = M(Se);
	ri(Ce, 17, () => L(b), (e) => e.family, (e, r) => {
		var i = Mv(), a = M(i), o = P(a, !0), s = F(a, 2);
		ri(s, 21, () => L(r).designs, (e) => e.id, (e, r) => {
			var i = jv();
			let a;
			var o = M(i), s = M(o), c = (e) => {
				var t = Hr();
				U(N(t), () => Dv(L(r).id)), B(e, t);
			}, l = /* @__PURE__ */ k(() => L(d).has(L(r).id)), f = (e) => {
				var t = kv();
				I(() => q(t, "src", `/admin/designs/${L(r).id}.webp`)), Mr("error", t, () => se(L(r).id)), Ar(t), B(e, t);
			};
			H(s, (e) => {
				L(l) ? e(c) : e(f, -1);
			}), E(o);
			var p = F(o, 2), m = P(p, !0), h = F(p, 2), g = (e) => {
				var t = Av(), n = P(t, !0);
				I((e) => V(n, e), [() => J("calendar.picker.current")]), B(e, t);
			};
			H(h, (e) => {
				n() !== null && L(r).id === n() && e(g);
			}), E(i), I((e, t) => {
				a = W(i, 1, "dp-tile svelte-wurosr", null, a, {
					on: L(r).id === L(u),
					current: n() !== null && L(r).id === n()
				}), q(i, "aria-pressed", L(r).id === L(u)), q(i, "title", e), V(m, t);
			}, [() => J(L(r).labelKey), () => J(L(r).labelKey)]), R("click", i, () => j(u, L(r).id, !0)), R("dblclick", i, () => t.onpick?.(L(r).id)), B(e, i);
		}), E(s), E(i), I((e) => V(o, e), [() => J(L(r).labelKey)]), B(e, i);
	});
	var we = F(Ce, 2), Te = (e) => {
		var t = Nv(), n = P(t, !0);
		I((e) => V(n, e), [() => J("calendar.picker.none")]), B(e, t);
	};
	H(we, (e) => {
		L(b).length || e(Te);
	}), E(Se);
	var Ee = F(Se, 2), De = M(Ee), Oe = M(De), ke = P(Oe, !0), Ae = F(Oe, 2), je = (e) => {
		var t = Pv(), n = P(t, !0);
		I((e) => V(n, e), [() => J(o[L(S).view])]), B(e, t);
	};
	H(Ae, (e) => {
		L(S).view && e(je);
	}), E(De);
	var Me = F(De, 2), Ne = M(Me), Pe = M(Ne);
	Ui(Pe, (e) => j(f, e), () => L(f)), E(Ne), E(Me);
	var D = F(Me, 2), Fe = P(D, !0);
	E(Ee), E(xe), E(le), E(ce), Ui(ce, (e) => j(_, e), () => L(_)), I((e, t, n, r, i, a, o, c, u, d, f) => {
		q(ce, "aria-label", e), V(fe, t), q(pe, "placeholder", n), q(pe, "aria-label", r), V(he, i), q(ge, "aria-label", a), q(ge, "title", o), q(ve, "aria-pressed", L(l) === ""), ye = W(ve, 1, "svelte-wurosr", null, ye, { on: L(l) === "" }), V(be, c), V(ke, u), Oi(Ne, `width:${s * L(C)}px; height:${L(h) * L(C)}px`), q(Pe, "title", d), Oi(Pe, `width:1040px; height:${L(h) ?? ""}px; transform:scale(${L(C) ?? ""}); transform-origin:top left`), V(Fe, f);
	}, [
		() => J("calendar.picker.title"),
		() => J("calendar.picker.title"),
		() => J("calendar.picker.search"),
		() => J("calendar.picker.search"),
		() => J("calendar.picker.count", { n: L(x) }),
		() => J("ui.close"),
		() => J("ui.close"),
		() => J("calendar.picker.all"),
		() => J(L(S).labelKey),
		() => J("calendar.picker.preview", { name: J(L(S).labelKey) }),
		() => r() === "add" ? J("calendar.picker.add") : J("calendar.picker.use")
	]), Mr("close", ce, oe), Li(pe, () => L(c), (e) => j(c, e)), R("click", ge, () => t.onclose?.()), R("click", ve, () => j(l, "")), Vi(Me, "clientWidth", (e) => j(p, e)), R("click", D, () => t.onpick?.(L(u))), B(e, ce), tt();
}
Nr(["click", "dblclick"]);
//#endregion
//#region ../template/assets/engine/0.7.4/plugins.js
function Lv(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var Rv = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function zv(e, t) {
	let n = Lv(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = Lv(t[2]), a = Rv(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var Bv = /^[a-z0-9][a-z0-9-]*$/;
function Vv(e) {
	let t = [];
	if (!e || typeof e != "object") return ["the manifest is not an object"];
	Bv.test(e.id ?? "") || t.push("id is missing or invalid"), (typeof e.name != "string" || !e.name) && t.push("name is missing"), Lv(e.version ?? "") || t.push("version is not semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine is missing");
	let n = Array.isArray(e.languages) && e.languages.length > 0;
	return (e.entry !== void 0 || !n) && (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry is missing or is not a .js file"), (e.provides !== void 0 || !n) && (!e.provides || typeof e.provides != "object") && t.push("provides is missing"), e.languages !== void 0 && t.push(...ea(e.languages)), e.locales !== void 0 && typeof e.locales != "boolean" && t.push("locales must be a boolean"), e.names !== void 0 && (typeof e.names != "object" || e.names === null || Array.isArray(e.names) || Object.values(e.names).some((e) => typeof e != "string" || !e)) && t.push("names must be an object mapping language code to name"), t;
}
Promise.resolve();
//#endregion
//#region ../template/assets/engine/0.7.4/templates-model.js
var Hv = [
	"section",
	"blocks",
	"page"
];
function Uv(e) {
	return Vl(String(e ?? ""), "");
}
function Wv(e, t, { id: n, title: r }) {
	let i = structuredClone(e);
	i.meta = {
		...i.meta,
		id: n,
		title: r
	};
	for (let e of i.sections ?? []) {
		e.id = t("sec");
		for (let n of e.blocks ?? []) n.id = t("blk");
		Jm(e), qm(e), Ym(e);
	}
	return i;
}
//#endregion
//#region ../template/assets/engine/0.7.4/collections-csv.js
var Gv = [
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
function Kv(e) {
	let t = String(e ?? "");
	return /[",\n\r]/.test(t) ? `"${t.replaceAll("\"", "\"\"")}"` : t;
}
function qv(e, t) {
	return t === "sizes" ? (e.sizes ?? []).join("|") : t === "colors" ? (e.colors ?? []).map((e) => e.name).join("|") : e[t] ?? "";
}
function Jv(e) {
	let t = [Gv.join(",")];
	for (let n of e ?? []) t.push(Gv.map((e) => Kv(qv(n, e))).join(","));
	return t.join("\n") + "\n";
}
function Yv(e) {
	let t = [], n = [], r = "", i = !1, a = String(e ?? "");
	for (let e = 0; e < a.length; e += 1) {
		let o = a[e];
		i ? o === "\"" && a[e + 1] === "\"" ? (r += "\"", e += 1) : o === "\"" ? i = !1 : r += o : o === "\"" ? i = !0 : o === "," ? (n.push(r), r = "") : o === "\n" || o === "\r" ? (o === "\r" && a[e + 1] === "\n" && (e += 1), n.push(r), t.push(n), n = [], r = "") : r += o;
	}
	return (r !== "" || n.length) && (n.push(r), t.push(n)), t.filter((e) => e.some((e) => e.trim() !== ""));
}
var Xv = (e) => String(e ?? "").split("|").map((e) => e.trim()).filter(Boolean);
function Zv(e) {
	let t = Yv(e);
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
		let s = Xv(t.sizes);
		s.length && (o.sizes = s);
		let c = Xv(t.colors);
		c.length && (o.colors = c.map((e) => ({ name: e }))), r.push(o);
	}
	return {
		entries: r,
		skipped: i
	};
}
//#endregion
//#region ../template/assets/engine/0.7.4/feeds.js
function Qv(e) {
	return String(e ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&apos;");
}
function $v(e, t) {
	let n = String(t ?? "").replace(/\/+$/, "");
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${(e ?? []).filter((e) => !e.noindex).map((e) => `  <url><loc>${Qv(n + (e.path === "/" ? "/" : e.path))}</loc></url>`).join("\n")}\n</urlset>\n`;
}
function ey(e) {
	return `User-agent: *\nDisallow: /admin/\n\nSitemap: ${String(e ?? "").replace(/\/+$/, "")}/sitemap.xml\n`;
}
var ty = [
	"news",
	"notices",
	"publications"
];
function ny(e) {
	let t = String(e.origin ?? "").replace(/\/+$/, ""), n = (e.items ?? []).map((n) => {
		let r = n.href ? new URL(n.href, t + "/").href : t + "/", i = n.date ? new Date(n.date) : null, a = i && !Number.isNaN(i.getTime()) ? `\n      <pubDate>${i.toUTCString()}</pubDate>` : "", o = n.text ? `\n      <description>${Qv(n.text)}</description>` : "";
		return `    <item>\n      <title>${Qv(n.title)}</title>\n      <link>${Qv(r)}</link>\n      <guid isPermaLink="false">${Qv(`${e.path}#${n.id ?? n.title}`)}</guid>${o}${a}\n    </item>`;
	}).join("\n");
	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${Qv(e.title)}</title>\n    <link>${Qv(t + "/")}</link>\n    <description>${Qv(e.description ?? e.title)}</description>\n${n}${n ? "\n" : ""}  </channel>\n</rss>\n`;
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/color.js
var ry = {
	version: 1,
	label: "Colour",
	labelKey: "bgLayer.color",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = ch(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, iy = {
	linear: [
		"pan",
		"pan-loop",
		"rotate"
	],
	radial: ["pulse", "orbit"]
};
function ay(e) {
	let t = Array.isArray(e) && e.length ? e : [{ color: "#0b0e14" }, { color: "#1a1030" }], n = t.map((e) => Math.max(0, Number(e?.share) || 0)), r = n.reduce((e, t) => e + t, 0), i = r <= 0, a = i ? t.length : r, o = 0;
	return t.map((e, t) => {
		let r = i ? 1 : n[t], s = (o + r / 2) / a * 100;
		return o += r, {
			color: e?.color ?? "#0b0e14",
			at: Math.round(s * 100) / 100
		};
	});
}
function oy(e) {
	let t = (e) => Math.round(e * 100) / 100, n = e[0]?.at ?? 0;
	return [...e.map((e) => ({
		color: e.color,
		at: t(e.at - n)
	})), {
		color: e[0]?.color ?? "#0b0e14",
		at: 100
	}];
}
function sy(e, t, n, r = .5) {
	let i = n % 360 * Math.PI / 180, a = (e) => Math.round(e * 100) / 100 || 0, o = (Math.abs(e * Math.sin(i)) + Math.abs(t * Math.cos(i))) / (1 - Math.min(Math.max(r, 0), .9));
	return {
		period: a(o),
		dx: a(Math.sin(i) * o),
		dy: a(-Math.cos(i) * o)
	};
}
function cy(e, t, n) {
	return `repeating-linear-gradient(${t}deg, ${e.map((e) => `${ch(e.color)} ${Math.round(e.at / 100 * n * 100) / 100}px`).join(", ")})`;
}
function ly(e) {
	let t = e.kind === "radial" ? "radial" : "linear", n = (iy[t] ?? []).includes(e.animation) ? e.animation : null, r = ay(e.stops), i = r.map((e) => `${ch(e.color)} ${e.at}%`).join(", "), a = {}, o;
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
					stops: oy(r),
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
var uy = /* @__PURE__ */ new Set(), dy = !1;
function fy(e) {
	uy.add(e), !(dy || typeof window > "u") && (dy = !0, window.addEventListener("resize", () => {
		for (let e of [...uy]) e() || uy.delete(e);
	}));
}
var py = !1;
function my() {
	if (!py) {
		py = !0;
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
var hy = {
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
		let n = ly(t);
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
					let e = sy(r, i, n.loop.angle, n.loop.maxShare);
					t.style.inset = `${-Math.ceil(e.period)}px`, t.style.background = cy(n.loop.stops, n.loop.angle, e.period), t.style.setProperty("--urd-loop-dx", `${e.dx}px`), t.style.setProperty("--urd-loop-dy", `${e.dy}px`);
				}
				return !0;
			};
			requestAnimationFrame(r), fy(r);
			return;
		}
		if (n.runner) {
			e.classList.add("urd-bg-loop-host");
			let t = document.createElement("div");
			t.className = n.runner.className, t.style.background = n.runner.background, n.runner.left != null && (t.style.left = n.runner.left), n.runner.top != null && (t.style.top = n.runner.top), e.appendChild(t);
			return;
		}
		e.style.background = n.background, n.className && (e.classList.add(n.className), n.className === "urd-bg-rotate" && my());
	}
}, gy = [
	"dots",
	"grid",
	"diagonal",
	"checks",
	"waves",
	"zigzag",
	"plus",
	"triangles"
], _y = {
	min: 8,
	max: 160,
	dflt: 28
}, vy = .12, yy = {
	dots: "<circle cx=\"12\" cy=\"12\" r=\"3\"/>",
	grid: "<rect width=\"24\" height=\"1.6\"/><rect width=\"1.6\" height=\"24\"/>",
	diagonal: "<path d=\"M-6 6L6 -6M0 24L24 0M18 30L30 18\" fill=\"none\" stroke=\"#000\" stroke-width=\"4\"/>",
	checks: "<rect width=\"12\" height=\"12\"/><rect x=\"12\" y=\"12\" width=\"12\" height=\"12\"/>",
	waves: "<path d=\"M0 12Q6 4 12 12T24 12\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\"/>",
	zigzag: "<path d=\"M0 16L6 8L12 16L18 8L24 16\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\"/>",
	plus: "<path d=\"M12 7V17M7 12H17\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\" stroke-linecap=\"round\"/>",
	triangles: "<path d=\"M0 24L12 4L24 24Z\"/>"
};
function by(e) {
	return gy.includes(e) ? e : "dots";
}
function xy(e) {
	let t = Number(e);
	return !Number.isFinite(t) || t <= 0 ? _y.dflt : Math.min(_y.max, Math.max(_y.min, Math.round(t)));
}
function Sy(e) {
	let t = Number(e);
	return Number.isFinite(t) ? (Math.round(t) % 360 + 360) % 360 : 0;
}
function Cy(e) {
	let t = Number(e);
	return e == null || e === "" || !Number.isFinite(t) ? vy : Math.min(1, Math.max(0, t));
}
function wy(e = {}) {
	let t = xy(e.size), n = Sy(e.rotation), r = yy[by(e.pattern)], i = `<pattern id="p" width="${t}" height="${t}" patternUnits="userSpaceOnUse"${n ? ` patternTransform="rotate(${n})"` : ""}><g transform="scale(${t / 24})">${r}</g></pattern>`, a = "<rect width=\"100%\" height=\"100%\" fill=\"url(#p)\"/>";
	return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><defs>${i}</defs>${e.invert === !0 ? `<mask id="m"><rect width="100%" height="100%" fill="#fff"/>${a}</mask><rect width="100%" height="100%" mask="url(#m)"/>` : a}</svg>`;
}
var Ty = () => typeof CSS < "u" && typeof CSS.supports == "function" && (CSS.supports("mask-image", "none") || CSS.supports("-webkit-mask-image", "none")), Ey = {
	version: 1,
	label: "Pattern",
	labelKey: "bgLayer.pattern",
	defaults: () => ({
		pattern: "dots",
		color: "text",
		size: _y.dflt,
		opacity: vy,
		rotation: 0,
		invert: !1
	}),
	migrations: {},
	render(e, t) {
		if (!Ty()) return;
		let n = `url("data:image/svg+xml,${encodeURIComponent(wy(t))}")`;
		e.style.backgroundColor = ch(t.color ?? "text"), e.style.opacity = String(Cy(t.opacity));
		for (let t of ["webkitMask", "mask"]) e.style[`${t}Image`] = n, e.style[`${t}Size`] = "100% 100%", e.style[`${t}Repeat`] = "no-repeat";
	}
}, Dy = [
	"wave",
	"tilt",
	"curve",
	"triangle",
	"zigzag"
], Oy = {
	min: 16,
	max: 240,
	dflt: 64
}, ky = .4, Ay = [
	"none",
	"kenburns",
	"drift"
], jy = {
	min: 6,
	max: 60,
	dflt: 20
};
function My(e) {
	return Ay.includes(e) ? e : "none";
}
function Ny(e) {
	let { min: t, max: n, dflt: r } = jy, i = Number(e);
	return !Number.isFinite(i) || i <= 0 ? r : Math.min(n, Math.max(t, i));
}
function Py(e, t) {
	return `${(e ?? .5) * 100}% ${(t ?? .5) * 100}%`;
}
function Fy(e, t) {
	return e === "contain" ? "contain" : e === "cover" ? "cover" : `${Math.max(0, t ?? 1) * 100}%`;
}
function Iy(e) {
	let t = "-9999px";
	return e === "up" ? `inset(${t} 0 0 0)` : e === "down" ? `inset(0 0 ${t} 0)` : e === "both" ? `inset(${t} 0 ${t} 0)` : "inset(0)";
}
function Ly(e, t, n, r = .18) {
	let i = Math.max(0, Math.min(1, n)) * ky * t;
	return Math.round(Math.min(i, r * e));
}
function Ry(e, t, n, r, i) {
	let a = e + t / 2, o = (n / 2 - a) * Math.max(0, Math.min(1, r)) * ky, s = i ?? Ly(t, n, r);
	return Math.max(-s, Math.min(s, o)) || 0;
}
var zy = /* @__PURE__ */ new Set(), By = !1, Vy = 0;
function Hy() {
	Vy = 0;
	for (let e of [...zy]) e() || zy.delete(e);
}
function Uy() {
	Vy ||= requestAnimationFrame(Hy);
}
function Wy(e) {
	zy.add(e), e(), !(By || typeof window > "u") && (By = !0, window.addEventListener("scroll", Uy, { passive: !0 }), window.addEventListener("resize", Uy, { passive: !0 }));
}
function Gy(e, t, n, r) {
	let i = r === "cover" || r === "tile" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement, o = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
	e.style.willChange = "transform";
	let s = (t) => {
		e.style.top = `-${t}px`, e.style.bottom = `-${t}px`;
	}, c = () => {
		if (!e.isConnected) return !1;
		if (o || document.body.classList.contains("urd-mobile")) return s(n), e.style.transform = "", !0;
		let r = (a ?? e).getBoundingClientRect(), c = window.innerHeight || document.documentElement.clientHeight, l = Ly(r.height, c, t, i ? .18 : .6);
		s(i ? Math.max(n, l) : n);
		let u = Ry(r.top, r.height, c, t, l);
		return e.style.transform = `translateY(${u.toFixed(1)}px)`, !0;
	};
	Wy(c), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(c));
}
function Ky() {
	return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("animation-timeline", "view()");
}
var qy = /* @__PURE__ */ new Set(), Jy = !1, Yy = 0;
function Xy() {
	Yy = 0;
	for (let e of [...qy]) e() || qy.delete(e);
}
function Zy() {
	!Yy && typeof requestAnimationFrame == "function" && (Yy = requestAnimationFrame(Xy));
}
function Qy(e) {
	qy.add(e), e(), !(Jy || typeof window > "u") && (Jy = !0, window.addEventListener("resize", Zy, { passive: !0 }));
}
function $y(e, t, n, r) {
	let i = r === "cover" || r === "tile" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement;
	e.style.willChange = "transform", e.classList.add("urd-parallax-css");
	let o = () => {
		if (!e.isConnected) return !1;
		let r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || document.body.classList.contains("urd-mobile"), o = (a ?? e).getBoundingClientRect(), s = window.innerHeight || document.documentElement.clientHeight, c = Ly(o.height, s, t, i ? .18 : .6), l = i && !r ? Math.max(n, c) : n;
		return e.style.setProperty("--urd-px-shift", `${c}px`), e.style.top = `-${l}px`, e.style.bottom = `-${l}px`, !0;
	};
	Qy(o), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(o));
}
var eb = {
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
		motionSpeed: jy.dflt
	}),
	migrations: {
		1: (e) => ({
			...e,
			fit: e.fit === "vanlig" ? "plain" : e.fit === "flislegg" ? "tile" : e.fit === "egen" ? "custom" : e.fit
		}),
		2: (e) => ({
			motion: "none",
			motionSpeed: jy.dflt,
			...e
		})
	},
	render(e, t) {
		let n = !qh(t.src);
		n && e.classList.add("urd-bg-demo");
		let r = n ? Fs(0) : t.src;
		e.style.opacity = String(t.opacity ?? 1), e.style.clipPath = Iy(t.bleed), e.style.zIndex = t.bleed === "down" || t.bleed === "both" ? "1" : "";
		let i = document.createElement("div");
		i.className = "urd-bg-image", i.style.position = "absolute", i.style.left = "0", i.style.right = "0", i.style.top = "0", i.style.bottom = "0";
		let a = My(t.motion), o = a === "none" ? i : document.createElement("div");
		o !== i && (o.className = `urd-bg-motion urd-bg-motion-${a}`, o.style.position = "absolute", o.style.left = "0", o.style.right = "0", o.style.top = "0", o.style.bottom = "0", o.style.animationDuration = `${Ny(t.motionSpeed)}s`, i.appendChild(o));
		let s = t.fit === "tile" || t.fit === "repeat";
		o.style.backgroundImage = `url("${r}")`, o.style.backgroundSize = Fy(t.fit, t.size), o.style.backgroundRepeat = s ? "repeat" : "no-repeat", o.style.backgroundPosition = Py(t.x, t.y);
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
		e.appendChild(i), t.parallax > 0 && tb(i, t.parallax, o === i ? c : 0, t.fit ?? "cover");
	}
};
function tb(e, t, n, r) {
	Ky() ? $y(e, t, n, r) : Gy(e, t, n, r);
}
//#endregion
//#region ../template/assets/engine/0.7.4/photo-source.js
var nb = [
	"drive",
	"gphotos",
	"nextcloud",
	"json"
], rb = {
	min: 1,
	max: 60,
	dflt: 24
}, ib = [
	"name",
	"newest",
	"random"
], ab = [
	480,
	800,
	1200,
	1600,
	2e3
], ob = /^[A-Za-z0-9_-]{10,128}$/, sb = /^(?!\d+(?:\.\d+)*$)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/;
function cb(e) {
	let t = Number(e);
	return !Number.isFinite(t) || t <= 0 ? rb.dflt : Math.min(rb.max, Math.max(rb.min, Math.round(t)));
}
function lb(e) {
	let t = typeof e == "string" ? e.trim() : "";
	if (!t) return null;
	if (ob.test(t) && !t.includes(".")) return {
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
		return ob.test(t) ? {
			provider: "drive",
			id: t
		} : null;
	}
	if (r === "photos.google.com") {
		let e = /^\/share\/([A-Za-z0-9_-]{10,256})\/?$/.exec(n.pathname), t = n.searchParams.get("key") ?? "";
		return e ? {
			provider: "gphotos",
			id: e[1],
			...ob.test(t) ? { host: t } : {}
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
	return i && sb.test(r) ? {
		provider: "nextcloud",
		id: i[1],
		host: r
	} : /\.json$/i.test(n.pathname) && sb.test(r) ? {
		provider: "json",
		url: n.href
	} : null;
}
function ub(e) {
	return ib.includes(e) ? e : "name";
}
var db = (e) => ub(e) === "newest" ? "newest" : "name";
function fb(e, t) {
	if (!e || !nb.includes(e.provider)) return null;
	let n = new URLSearchParams({
		p: e.provider,
		sort: db(t),
		max: "200"
	});
	return e.id && n.set("id", e.id), e.host && n.set("host", e.host), e.url && n.set("url", e.url), `/api/photos?${n.toString()}`;
}
function pb(e, t = 200) {
	return (Array.isArray(e?.photos) ? e.photos : []).filter((e) => typeof e?.src == "string" && e.src.startsWith("/api/photo?")).slice(0, Math.max(1, Math.min(200, Number(t) || 200))).map((e) => ({
		src: e.src,
		name: typeof e.name == "string" ? e.name : ""
	}));
}
function mb(e) {
	let t = e >>> 0;
	return () => {
		t = t + 1831565813 >>> 0;
		let e = t;
		return e = Math.imul(e ^ e >>> 15, e | 1), e ^= e + Math.imul(e ^ e >>> 7, e | 61), ((e ^ e >>> 14) >>> 0) / 4294967296;
	};
}
function hb(e, t) {
	let n = [...e], r = mb(Number(t) || 0);
	for (let e = n.length - 1; e > 0; e--) {
		let t = Math.floor(r() * (e + 1));
		[n[e], n[t]] = [n[t], n[e]];
	}
	return n;
}
function gb(e, t, n) {
	return ub(t) === "random" ? hb(e, n) : [...e];
}
var _b = 0;
function vb() {
	return _b ||= typeof crypto < "u" && crypto.getRandomValues ? crypto.getRandomValues(/* @__PURE__ */ new Uint32Array(1))[0] || 1 : Date.now() >>> 0 || 1, _b;
}
function yb(e, t = 1) {
	let n = (Number(e) || 0) * Math.min(3, Math.max(1, Number(t) || 1));
	return ab.find((e) => e >= n) ?? ab[ab.length - 1];
}
function bb(e, t) {
	if (typeof e != "string" || !e.startsWith("/api/photo?")) return e;
	let n = new URLSearchParams(e.slice(11));
	return n.set("w", String(t)), `/api/photo?${n.toString()}`;
}
var xb = 6e5, Sb = 3e4, Cb = /* @__PURE__ */ new Map(), wb = /* @__PURE__ */ new Map();
function Tb(e) {
	return e?.source === "folder" && typeof e.folder == "string" ? e.folder.trim() : "";
}
function Eb(e, t) {
	let n = fb(lb(e), t);
	return n ? Db(Cb.get(n)) : null;
}
function Db(e) {
	if (!e) return null;
	let t = e.value.photos.length ? xb : Sb;
	return Date.now() - e.at < t ? e.value : null;
}
function Ob(e, t, { force: n = !1 } = {}) {
	let r = fb(lb(e), t);
	if (!r) return Promise.resolve({
		photos: [],
		error: "badAddress",
		code: "photoFolderUnknown"
	});
	if (!n) {
		let e = Db(Cb.get(r));
		if (e) return Promise.resolve(e);
		if (wb.has(r)) return wb.get(r);
	}
	let i = (async () => {
		let e;
		try {
			let t = await fetch(r), n = await t.json().catch(() => null);
			e = t.ok ? {
				photos: pb(n),
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
		return Cb.set(r, {
			at: Date.now(),
			value: e
		}), wb.delete(r), e;
	})();
	return wb.set(r, i), i;
}
function kb(e) {
	let t = Tb(e), n = t ? Eb(t, e.order) : null;
	return n?.photos.length ? gb(n.photos, e.order, vb()).slice(0, cb(e.folderMax)) : e.images ?? [];
}
function Ab(e, t, n) {
	let r = Tb(t);
	r && !Eb(r, t.order) && Ob(r, t.order).then((r) => {
		e.isConnected && r.photos.length && (e.textContent = "", e.removeAttribute("style"), e.className = "urd-bg-layer", n(e, t));
	}), n(e, t);
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/slideshow.js
var jb = {
	source: "upload",
	folder: "",
	order: "random",
	folderMax: rb.dflt,
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
}, Mb = {
	version: 2,
	label: "Image gallery",
	labelKey: "bgLayer.slideshow",
	defaults: () => ({
		images: [],
		fit: "cover",
		opacity: .85,
		blur: 0,
		...jb
	}),
	migrations: { 1: (e) => ({
		...jb,
		style: "fill",
		motion: "none",
		interval: 6,
		opacity: 1,
		...e
	}) },
	render(e, t) {
		Ab(e, t, Pb);
	}
}, Nb = (e, t) => {
	let n = document.createElement(e);
	return n.className = t, n;
};
function Pb(e, t) {
	let n = zs(t.style), r = kb(t).filter((e) => qh(e?.src)), i = qs(t.shape), a = Js(t.look);
	e.classList.add("urd-bg-slideshow", `urd-gallery-${n}`, `urd-gallery-tone-${Ys(t.tone)}`), n !== "fill" && e.classList.add(`urd-gallery-shape-${i}`, `urd-gallery-look-${a}`), e.style.setProperty("--urd-frame-radius", `${tc(t.radius)}px`), r.length || e.classList.add("urd-bg-demo"), e.style.opacity = String(t.opacity ?? .85);
	let o = Ks(a, t.frameColor);
	o && e.style.setProperty("--urd-frame-color", ch(o));
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
		seed: ic(t.seed, vb()),
		time: nc(t.motionSpeed),
		dwell: Qs(t.interval),
		dpr: window.devicePixelRatio || 1
	};
	Gb[n](d), c && (e.style.top = n === "fill" && t.blur > 0 ? `calc(${c} - ${t.blur * 2}px)` : c);
}
function Fb(e, t, n, r, i) {
	let a = t[n];
	e.style.backgroundImage = `url("${a ? bb(a.src, r) : Fs(i)}")`, e.style.backgroundPosition = a ? Py(a.x, a.y) : "";
}
function Ib({ el: e, props: t, images: n, motion: r, reduced: i, dpr: a, dwell: o }) {
	let s = !n.length, c = s ? Is(3) : n, l = yb(window.innerWidth, a);
	t.blur > 0 && (e.style.filter = `blur(${t.blur}px)`, e.style.inset = `-${t.blur * 2}px`);
	let u = Math.max(0, Number(t.fade) || 0);
	e.style.setProperty("--urd-bgg-fade", `${u}s`);
	let d = My(r === "drift" ? "drift" : r === "kenburns" ? "kenburns" : "none"), f = (e) => {
		let n = Nb("div", e ? "urd-bg-slide on" : "urd-bg-slide");
		return d !== "none" && (n.classList.add("urd-bg-motion", `urd-bg-motion-${d}`), n.style.animationDuration = `${Ny(t.motionSpeed)}s`), n;
	}, p = (e, n) => {
		e.style.backgroundImage = `url("${s ? n.src : bb(n.src, l)}")`, e.style.backgroundSize = s ? "240px auto" : Fy(t.fit), e.style.backgroundRepeat = s ? "repeat" : "no-repeat", e.style.backgroundPosition = s ? "" : Py(n.x, n.y);
	}, m = new Image();
	if (m.src = s ? c[0].src : bb(c[0].src, l), !m.complete) {
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
		t.src = s ? c[e].src : bb(c[e].src, l);
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
function Lb(e, t, n, r, i) {
	let a = Nb("div", "urd-gallery-skin"), o = Nb("div", "urd-gallery-face");
	return Fb(o, t, n, r, i), a.appendChild(o), e.appendChild(a), {
		skin: a,
		face: o
	};
}
function Rb(e, t) {
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
function zb({ frame: e, skin: t, face: n }, r, i, a) {
	let { motion: o, moves: s, time: c } = a;
	if (!s) return;
	let l = `-${(r.phase * c).toFixed(2)}s`;
	if (o === "drift" || o === "rise") {
		e.classList.add("urd-gallery-travel");
		let t = Rb(r, o);
		e.style.setProperty("--tx0", t.tx0), e.style.setProperty("--ty0", t.ty0), e.style.setProperty("--tx1", t.tx1), e.style.setProperty("--ty1", t.ty1), e.style.animationDuration = `${c}s`, e.style.animationDelay = l;
	} else if (o === "kenburns") e.classList.add("urd-gallery-kenburns"), e.style.animationDuration = `${c}s`, e.style.animationDelay = l;
	else if (o === "bounce") {
		e.style.left = "0", e.style.top = "0", e.style.translate = "0 0", e.classList.add("urd-gallery-bounce-x"), t.classList.add("urd-gallery-bounce-y");
		let n = c * (.8 + r.heading * .4), i = c * (.5 + r.phase * .35);
		e.style.animationDuration = `${n.toFixed(2)}s`, e.style.animationDelay = `-${(r.phase * n).toFixed(2)}s`, t.style.animationDuration = `${i.toFixed(2)}s`, t.style.animationDelay = `-${(r.heading * i).toFixed(2)}s`;
	}
}
function Bb(e, t, n) {
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
			a >= 0 && (Fb(t.face, r, a, t.width, i), c[i] = a, l[a] = ++u), n && (f += 1, Vb(t, n(i, f, e.filter((e) => e !== t))));
		});
	});
}
function Vb(e, t) {
	let n = t.w / 2 * 1.15, r = t.w / e.aspect / 2 * 1.15;
	e.frame.style.left = `clamp(${n.toFixed(1)}px, ${t.x}%, calc(100% - ${n.toFixed(1)}px))`, e.frame.style.top = `clamp(${r.toFixed(1)}px, ${t.y}%, calc(100% - ${r.toFixed(1)}px))`, e.frame.style.width = `${t.w}px`, e.frame.style.rotate = `${t.rot}deg`, e.x = t.x, e.y = t.y;
}
function Hb(e) {
	let { el: t, props: n, style: r, images: i, seed: a, aspect: o, dpr: s } = e, c = {
		count: n.count,
		seed: a,
		size: n.size,
		spread: n.spread,
		tilt: n.tilt,
		style: r,
		repeat: n.repeat === !0
	};
	Bb(ac(i, c).map((n, r) => {
		let a = Nb("div", "urd-gallery-box urd-gallery-frame" + (n.index < 0 ? " urd-gallery-frame-empty" : ""));
		a.style.aspectRatio = String(o);
		let c = yb(n.w, s), { skin: l, face: u } = Lb(a, i, n.index, c, r);
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
		return Vb(d, n), zb(d, n, r, e), d;
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
function Ub(e) {
	let { el: t, props: n, images: r, moves: i, time: a, aspect: o, dpr: s } = e, c = rc(n.rows), l = Ws(n.size, "band");
	t.style.setProperty("--urd-band-h", `${l}px`);
	let u = r.length || 8, d = yb(l * o, s);
	for (let e = 0; e < c; e += 1) {
		let s = Nb("div", "urd-gallery-band-row");
		i || s.classList.add("urd-ribbon-still");
		let c = Nb("div", "urd-ribbon-track");
		n.direction === "right" != (e === 1) && c.classList.add("urd-ribbon-right"), c.style.setProperty("--urd-ribbon-ms", `${a * 1e3}ms`), e === 1 && (c.style.animationDelay = `-${(a / 3).toFixed(1)}s`);
		let l = (e) => {
			for (let t = 0; t < u; t += 1) {
				let n = Nb("div", "urd-gallery-box urd-gallery-band-tile" + (r.length ? "" : " urd-gallery-frame-empty"));
				n.style.aspectRatio = String(o), Lb(n, r, r.length ? t : -1, d, t), e.appendChild(n);
			}
		}, f = Nb("div", "urd-ribbon-run");
		l(f);
		let p = Nb("div", "urd-ribbon-run");
		p.setAttribute("aria-hidden", "true"), l(p), c.append(f, p), s.appendChild(c), t.appendChild(s);
	}
}
function Wb(e) {
	let { el: t, props: n, images: r, seed: i, dpr: a, motion: o, moves: s, time: c } = e, l = cc(n.count, i, r.length, n.repeat === !0);
	t.style.setProperty("--urd-mosaic-row", `${Ws(n.size, "mosaic")}px`);
	let u = yb(Ws(n.size, "mosaic") * 2.2, a);
	Bb(l.map((e, n) => {
		let i = Nb("div", "urd-gallery-box urd-gallery-tile" + (r.length ? "" : " urd-gallery-frame-empty"));
		i.style.gridColumn = `span ${e.cols}`, i.style.gridRow = `span ${e.rows}`;
		let a = r.length ? n % r.length : -1, { face: l } = Lb(i, r, a, u, n);
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
var Gb = {
	fill: Ib,
	floating: Hb,
	band: Ub,
	mosaic: Wb
}, Kb = /^(?:data:video\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/media\/[\w%./-]+\.(?:mp4|webm))$/i;
function qb(e) {
	return typeof e == "string" && Kb.test(e);
}
var Jb = null;
function Yb(e) {
	Jb ??= new IntersectionObserver((e) => {
		for (let t of e) {
			if (!t.target.isConnected) {
				Jb.unobserve(t.target);
				continue;
			}
			t.isIntersecting ? t.target.play().catch(() => {}) : t.target.pause();
		}
	}, { threshold: 0 }), Jb.observe(e);
}
var Xb = (e, t, n, r) => {
	e.style.position = "absolute", e.style.inset = "0", e.style.width = "100%", e.style.height = "100%", e.style.objectFit = t === "contain" ? "contain" : "cover", e.style.objectPosition = Py(n, r);
}, Zb = {
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
		if (!qb(t.src)) return;
		if (e.style.opacity = String(t.opacity ?? 1), window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
			if (!qh(t.poster)) return;
			let n = document.createElement("img");
			n.className = "urd-bg-video-poster", n.alt = "", n.setAttribute("aria-hidden", "true"), n.src = t.poster, Xb(n, t.fit, t.x, t.y), e.appendChild(n);
			return;
		}
		let n = document.createElement("video");
		n.className = "urd-bg-video", n.muted = !0, n.setAttribute("muted", ""), n.loop = !0, n.playsInline = !0, n.setAttribute("playsinline", ""), n.preload = "metadata", n.disablePictureInPicture = !0, n.setAttribute("aria-hidden", "true"), qh(t.poster) && (n.poster = t.poster), n.src = t.src, Xb(n, t.fit, t.x, t.y), e.appendChild(n), Yb(n), t.parallax > 0 && tb(n, t.parallax, 0, t.fit === "contain" ? "contain" : "cover");
	}
}, Qb = () => ({
	duration: 600,
	delay: 0
}), $b = 90, ex = {
	"fade-in": {
		version: 1,
		label: "Fade in",
		labelKey: "anim.fadeIn",
		entrance: !0,
		defaults: Qb,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Slide up",
		labelKey: "anim.slideUp",
		entrance: !0,
		defaults: Qb,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom in",
		labelKey: "anim.zoomIn",
		entrance: !0,
		defaults: Qb,
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
			step: $b,
			effect: "slide-up",
			pattern: "sequence"
		}),
		migrations: {}
	}
};
//#endregion
//#region ../template/assets/engine/0.7.4/place.js
function tx(e) {
	let t = (e) => Math.round(e * 100) / 100, n = Math.max(0, t(100 - e.w)), r = Math.min(n, Math.max(0, t(e.x - e.w / 2))), i = Math.max(0, e.y - e.h / 2), a = e.snap === !1 || e.grid?.snap === !1, o = e.grid?.size || 8;
	return i = a ? Math.round(i) : Math.round(i / o) * o, {
		x: r,
		y: Math.max(0, i)
	};
}
//#endregion
//#region src/App.svelte
var nx = /* @__PURE__ */ z("<span class=\"toolbar-row\"><img class=\"site-icon-preview\" alt=\"\"/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/>", 1), rx = /* @__PURE__ */ z("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\" multiple=\"\"/></label> <!>", 1), ix = /* @__PURE__ */ z("<p> </p>"), ax = /* @__PURE__ */ z("<label> <input type=\"text\" placeholder=\"https://drive.google.com/drive/folders/...\"/></label> <label> <!></label> <label> <input type=\"number\" min=\"1\" max=\"60\"/></label> <button type=\"button\" class=\"ghost action\"><!> </button> <!>", 1), ox = /* @__PURE__ */ z("<label> <!></label> <!>", 1), sx = /* @__PURE__ */ z("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"6\" max=\"60\" step=\"1\"/>", 1), cx = /* @__PURE__ */ z("<label> <!></label> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\"/>", 1), lx = /* @__PURE__ */ z("<button class=\"ghost row-tool\"></button>"), ux = /* @__PURE__ */ z("<span><span class=\"grad-grip\"><svg viewBox=\"0 0 16 16\" width=\"14\" height=\"14\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"13\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"13\" r=\"1.4\"></circle></svg></span> <!> <input type=\"range\" class=\"tb-grow\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value\"> </span> <!></span>"), dx = /* @__PURE__ */ z("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/>", 1), fx = /* @__PURE__ */ z("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\"/>", 1), px = /* @__PURE__ */ z("<label> <!></label> <!> <button class=\"ghost action\"> </button> <!> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\"/> <label> <!></label>", 1), mx = /* @__PURE__ */ z("<label> <!></label> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\"/>", 1), hx = /* @__PURE__ */ z("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/>", 1), gx = /* @__PURE__ */ z("<label> <!></label> <label> <!></label> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" step=\"2\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"180\" step=\"5\"/> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), _x = /* @__PURE__ */ z("<div class=\"sizefill\"><button type=\"button\" class=\"ghost\"> </button> <button type=\"button\" class=\"ghost\"> </button></div> <label> </label> <div class=\"focalpad\"><span class=\"focaldot\"></span></div> <label class=\"sub\"> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\"/> <label class=\"sub\"> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\"/>", 1), vx = /* @__PURE__ */ z("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\"/> <label> <!></label>", 1), yx = /* @__PURE__ */ z("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <label> <!></label> <label> </label> <div class=\"sizestep\"><button type=\"button\">−</button> <input type=\"number\" min=\"10\" max=\"400\"/> <span class=\"sizeunit\">%</span> <button type=\"button\">+</button></div> <!> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\"/> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!>", 1), bx = /* @__PURE__ */ z("<label> <!></label> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.5\" max=\"90\" step=\"0.5\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\"/>", 1), xx = /* @__PURE__ */ z("<label> <!></label> <label> <!></label>", 1), Sx = /* @__PURE__ */ z("<button type=\"button\" class=\"ghost action\"><!> </button>"), Cx = /* @__PURE__ */ z("<label> <input type=\"number\" max=\"20\"/></label> <label> <!></label> <label> <!></label> <!>", 1), wx = /* @__PURE__ */ z("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"15\" step=\"1\"/>", 1), Tx = /* @__PURE__ */ z("<label> <!></label>"), Ex = /* @__PURE__ */ z("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"48\" step=\"1\"/>", 1), Dx = /* @__PURE__ */ z("<!> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"60\" max=\"400\" step=\"2\"/> <!> <label> <!></label> <label> <!></label> <!> <!>", 1), Ox = /* @__PURE__ */ z("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.5\" max=\"90\" step=\"0.5\"/>", 1), kx = /* @__PURE__ */ z("<label><input type=\"checkbox\"/> </label>"), Ax = /* @__PURE__ */ z("<!> <!> <label> <!></label> <!> <label> <!></label> <!> <!> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\"/>", 1), jx = /* @__PURE__ */ z("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\"/>", 1), Mx = /* @__PURE__ */ z("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"video/mp4,video/webm\"/></label> <label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <label> <!></label> <label class=\"sub\"> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label class=\"sub\"> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"/> <label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\"/> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!>", 1), Nx = /* @__PURE__ */ z("<div class=\"bg-layer\"><span class=\"nav-line\"><!> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span> <!></div>"), Px = /* @__PURE__ */ z("<!> <label> <!></label> <button class=\"ghost action\"> </button>", 1), Fx = /* @__PURE__ */ z("<button class=\"chrome-restore\"><!> </button>"), Ix = /* @__PURE__ */ z("<button><!> </button>"), Lx = /* @__PURE__ */ z("<div class=\"tool-pop\"></div>"), Rx = /* @__PURE__ */ z("<span class=\"toolmenu\"><button><!><!></button> <!></span>"), zx = /* @__PURE__ */ z("<button></button>"), Bx = /* @__PURE__ */ z("<span class=\"tool-cap\"> </span> <span class=\"viewswitch toolgrp\"></span>", 1), Vx = /* @__PURE__ */ z("<div class=\"tool-pop\"><div class=\"tool-pop-row\"><button class=\"ghost\"></button> <span class=\"zoom-readout\"> </span> <button class=\"ghost\"></button></div> <button><!> </button></div>"), Hx = /* @__PURE__ */ z("<span class=\"toolmenu\"><button><span class=\"zoom-cap\"> </span><!></button> <!></span>"), Ux = /* @__PURE__ */ z("<span class=\"tool-cap\"> </span> <span class=\"zoomswitch toolgrp\"><button class=\"ghost\"></button> <span class=\"zoom-readout\"> </span> <button class=\"ghost\"></button> <button></button></span>", 1), Wx = /* @__PURE__ */ z("<div class=\"tool-pop\"><button><!> </button> <button><!> </button></div>"), Gx = /* @__PURE__ */ z("<span class=\"tool-cap\"> </span> <span class=\"toolgrp\"><button></button> <button></button></span>", 1), Kx = /* @__PURE__ */ z("<button class=\"ghost page-btn\"> </button> <span class=\"toolset\"><!> <!> <!></span>", 1), qx = /* @__PURE__ */ z("<button class=\"badge attention\"><!> <span class=\"btn-label\"> </span> <span class=\"badge-mini\"> </span></button>"), Jx = /* @__PURE__ */ z("<button class=\"discard-confirm\"><!> </button>"), Yx = /* @__PURE__ */ z("<span class=\"draft-cluster\"><span class=\"chip draft-chip\"><span class=\"chip-full\" aria-hidden=\"true\"> </span> <span class=\"chip-mini\" aria-hidden=\"true\">!</span></span>  <span class=\"discard-wrap\"><button><!><span class=\"discard-label\"> </span></button> <!></span></span>"), Xx = /* @__PURE__ */ z("<!> <span class=\"btn-label\"> </span>", 1), Zx = /* @__PURE__ */ z("<span class=\"who\"><!> </span>"), Qx = /* @__PURE__ */ z("<a class=\"ghost\" href=\"/api/github/login\"> </a>"), $x = /* @__PURE__ */ z("<button class=\"ghost\"><!></button> <!> <a class=\"ghost\" target=\"_blank\" rel=\"noopener\"><!> <span class=\"btn-label\"> </span></a> <button class=\"primary\"> </button>", 1), eS = /* @__PURE__ */ z("<button> </button>"), tS = /* @__PURE__ */ z("<span class=\"rail-group\"> </span> <!>", 1), nS = /* @__PURE__ */ z("<div class=\"ctl-row\"><span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\" step=\"10\"/> <span class=\"mini-label\"> </span> <input type=\"number\" class=\"tb-num\" min=\"0\" step=\"10\" placeholder=\"0\"/></div>"), rS = /* @__PURE__ */ z("<p class=\"mini-label\"> </p> <label> <input type=\"text\" spellcheck=\"false\"/></label>", 1), iS = /* @__PURE__ */ z("<div class=\"settings-pop\"><p class=\"panel-strong\"> </p> <label> <!></label> <label> <!></label> <label> <!></label> <label> <!></label> <label> <!></label> <p class=\"mini-label\"> </p> <div class=\"seg\"><button type=\"button\"> </button> <button type=\"button\"> </button></div> <!> <!></div>"), aS = /* @__PURE__ */ z("<button type=\"button\"></button>"), oS = /* @__PURE__ */ z("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label>"), sS = /* @__PURE__ */ z("<label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\" multiple=\"\"/></label>"), cS = /* @__PURE__ */ z("<button class=\"ghost\"> </button>"), lS = /* @__PURE__ */ z("<p class=\"panel-hint\"> </p>"), uS = /* @__PURE__ */ z("<details class=\"group\"><summary> </summary> <div class=\"group-items\"></div></details>"), dS = /* @__PURE__ */ z("<details class=\"group\"><summary> </summary> <div class=\"group-items\"><button class=\"ghost\"> </button> <button class=\"ghost\"> </button></div></details> <button class=\"ghost\"> </button> <label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><button class=\"ghost\"> </button> <label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\" multiple=\"\"/></label></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button></div> <div class=\"group-items\"><button class=\"ghost\"> </button></div></details> <details class=\"group\"><summary> </summary> <div class=\"group-items\"><button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button> <button class=\"ghost\"> </button></div></details> <!> <!>", 1), fS = /* @__PURE__ */ z("<div><input type=\"text\"/> <!></div>"), pS = /* @__PURE__ */ z("<p class=\"panel-strong\"> </p> <!> <!>", 1), mS = /* @__PURE__ */ z("<label> <span class=\"gridmenu-value\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\"/>", 1), hS = /* @__PURE__ */ z("<button><span class=\"rs-sample\"><i class=\"rs-line\"></i> <i class=\"rs-chip\"></i> <i class=\"rs-dot\"></i></span> <span class=\"rs-name\"> </span></button>"), gS = /* @__PURE__ */ z("<div class=\"ctl-row\"><span class=\"mini-label ctl-name\"> </span> <input type=\"range\" step=\"4\"/> <span class=\"gridmenu-value\"> </span></div> <label> <!></label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label>", 1), _S = /* @__PURE__ */ z("<label> <!></label> <label> <input type=\"number\" min=\"0\" max=\"1000\" step=\"10\"/></label> <label> <!></label>", 1), vS = /* @__PURE__ */ z("<label> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\"/></label> <label> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\"/></label> <!>", 1), yS = /* @__PURE__ */ z("<p class=\"panel-strong\"> </p> <label> <input class=\"token-input\"/></label> <hr class=\"gridmenu-divider\"/> <label class=\"gridmenu-snap\"><input type=\"checkbox\"/> </label> <!> <hr class=\"gridmenu-divider\"/> <p class=\"panel-strong\"> </p> <div class=\"rs-grid\"></div> <label> <span class=\"row-tools\"><span class=\"gridmenu-value\"> </span> <button class=\"ghost row-tool\"></button></span></label> <hr class=\"gridmenu-divider\"/> <p class=\"panel-strong\"> </p> <!> <hr class=\"gridmenu-divider\"/> <p class=\"panel-strong\"> </p> <!> <hr class=\"gridmenu-divider\"/> <label> <!></label> <!> <label> <!></label>", 1), bS = /* @__PURE__ */ z("<div class=\"panel-body\"><!></div>"), xS = /* @__PURE__ */ z("<label> <input type=\"date\"/></label>"), SS = /* @__PURE__ */ z("<label> <input/></label>"), CS = /* @__PURE__ */ z("<img class=\"site-icon-preview\" alt=\"\"/> <button class=\"ghost row-tool\"></button>", 1), wS = /* @__PURE__ */ z("<img class=\"site-icon-preview\" alt=\"\"/>"), TS = /* @__PURE__ */ z("<span class=\"toolbar-row\"><input/> <label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <!> <button class=\"ghost row-tool\"></button></span>"), ES = /* @__PURE__ */ z("<label> <input type=\"number\" min=\"0\" step=\"0.01\"/></label> <label> <input type=\"number\" min=\"0\" step=\"0.01\"/></label> <label> <input/></label> <label> <input/></label> <!> <button class=\"ghost action\"> </button>", 1), DS = /* @__PURE__ */ z("<details class=\"group collection-entry\"><summary> </summary> <div class=\"group-items\"><span class=\"toolbar-row\"><input/> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button> <button class=\"ghost row-tool\"></button></span></span> <!> <textarea rows=\"3\"></textarea> <!> <span class=\"toolbar-row\"><label class=\"ghost filepick\"> <input type=\"file\" accept=\"image/*\"/></label> <!></span> <!></div></details>"), OS = /* @__PURE__ */ z("<span class=\"toolbar-row\"><button class=\"ghost action\"> </button> <button class=\"ghost action\"> </button> <label class=\"ghost filepick\"> <input type=\"file\" accept=\".csv,text/csv\"/></label> <button class=\"ghost row-tool\"></button></span> <!> <!> <hr class=\"gridmenu-divider\"/>", 1), kS = /* @__PURE__ */ z("<div class=\"panel-body\"><!> <!> <label> <input/></label> <label> <!></label> <button class=\"ghost action\"> </button></div>"), AS = /* @__PURE__ */ z("<span class=\"plugin-meta\"> </span>"), jS = /* @__PURE__ */ z("<p class=\"panel-hint plugin-warn\"> </p>"), MS = /* @__PURE__ */ z("<div><span class=\"plugin-head\"><span class=\"plugin-name\"> </span> <!> <span class=\"row-tools\"><label class=\"gridmenu-snap plugin-toggle\"><input type=\"checkbox\"/> </label> <button class=\"ghost row-tool\"></button></span></span> <!> <!></div>"), NS = /* @__PURE__ */ z("<div class=\"plugin-row\"><span class=\"plugin-head\"><span class=\"plugin-name\"> </span> <!> <span class=\"row-tools\"><button class=\"ghost row-tool\"></button></span></span></div>"), PS = /* @__PURE__ */ z("<hr class=\"gridmenu-divider\"/> <p class=\"panel-strong\"> </p> <!>", 1), FS = /* @__PURE__ */ z("<hr class=\"gridmenu-divider\"/> <input/> <button class=\"ghost action\"> </button> <!>", 1), IS = /* @__PURE__ */ z("<div class=\"panel-body\"><!> <!> <!> <!></div>"), LS = /* @__PURE__ */ z("<div><span class=\"history-msg\"> </span> <span class=\"history-meta\"> </span></div>"), RS = /* @__PURE__ */ z("<button class=\"ghost\"> </button> <!>", 1), zS = /* @__PURE__ */ z("<!> <!>", 1), BS = /* @__PURE__ */ z("<p class=\"panel-hint\"> </p> <button class=\"ghost\"> </button>", 1), VS = /* @__PURE__ */ z("<span class=\"update-arrow\"></span> <span class=\"badge\"> </span>", 1), HS = /* @__PURE__ */ z("<details class=\"group\"><summary> </summary> <div class=\"group-items\"><p class=\"update-notes\"> </p></div></details>"), US = /* @__PURE__ */ z("<details class=\"group\"><summary><span class=\"update-warn\"></span> </summary> <div class=\"group-items\"><pre class=\"update-headers\"> </pre></div></details>"), WS = /* @__PURE__ */ z("<span class=\"chip\"> </span>"), GS = /* @__PURE__ */ z("<div class=\"update-row\"><span class=\"update-path\"> </span> <span class=\"update-flags\"><!> <span class=\"update-warn\"></span></span></div>"), KS = /* @__PURE__ */ z("<div class=\"update-row\"><span class=\"update-path\"> </span> <!></div>"), qS = /* @__PURE__ */ z("<span class=\"update-warn\"></span>"), JS = /* @__PURE__ */ z("<div class=\"update-row\"><span> </span> <span class=\"update-flags\"><!> <!> <input type=\"checkbox\"/></span></div>"), YS = /* @__PURE__ */ z("<div class=\"ctl-row update-opt-head\"><p class=\"panel-strong\"> </p> <span class=\"mini-label\"> </span></div> <!>", 1), XS = /* @__PURE__ */ z("<p class=\"update-summary\"> </p> <!> <!> <!> <details class=\"group\"><summary> </summary> <div class=\"group-items\"></div></details> <!> <button class=\"primary update-run\"> </button>", 1), ZS = /* @__PURE__ */ z("<div class=\"update-versions\"><span class=\"update-from\"> </span> <!></div> <!>", 1), QS = /* @__PURE__ */ z("<aside><div class=\"panel-head\"><h2> </h2> <!></div> <!></aside>"), $S = /* @__PURE__ */ z("<div class=\"workspace\"><nav><!> <span class=\"rail-settings\"><span class=\"rail-brand\" title=\"Urd\"><svg class=\"brand-mark\" viewBox=\"10.3 8.3 19.4 25.4\" aria-hidden=\"true\"><path d=\"M12 32V10l16 6.5V32\" fill=\"none\" stroke=\"var(--urd-brand)\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg> <span class=\"brand-word\">Urd</span></span> <button></button> <!></span></nav> <!> <div><div class=\"stage\"><iframe></iframe></div></div></div>"), eC = /* @__PURE__ */ z("<p class=\"loading\"> </p>"), tC = /* @__PURE__ */ z("<p class=\"panel-hint confirm-line\"> </p>"), nC = /* @__PURE__ */ z("<input/>"), rC = /* @__PURE__ */ z("<div class=\"setup-overlay\"><div class=\"setup-card\"><h2> </h2> <!> <!> <span class=\"setup-actions\"><button class=\"ghost\"> </button> <button class=\"primary\"> </button></span></div></div>"), iC = /* @__PURE__ */ z("<div class=\"setup-overlay\"><div class=\"setup-card\"><h2> </h2> <p class=\"panel-hint\"> </p> <label> <input/></label> <label> <!></label> <label> <!></label> <p class=\"panel-hint\"> </p> <span class=\"setup-actions\"><button class=\"ghost\"> </button> <button class=\"primary\"> </button></span></div></div>"), aC = /* @__PURE__ */ z("<div><span> </span> <button class=\"toast-x\">×</button></div>"), oC = /* @__PURE__ */ z("<div class=\"editor\"><!> <header><span class=\"topbar-group\"><!> <!></span> <span class=\"topbar-group topbar-draft\"><!></span> <span class=\"topbar-group topbar-right\"><!></span></header> <!> <!> <!> <!> <!> <!></div>   <!>", 1);
function sC(e, t) {
	et(t, !0);
	let n = (e, t = f, n = f, r = f) => {
		var i = Hr(), a = N(i), o = (e) => {
			var i = rx(), a = N(i), o = M(a), s = F(o);
			E(a), ri(F(a, 2), 17, () => r().props.images ?? [], $r, (e, i, a) => {
				var o = nx(), s = N(o), c = M(s), l = F(c, 2), u = M(l);
				u.disabled = a === 0, U(u, () => X.up, !0), E(u);
				var d = F(u, 2);
				U(d, () => X.down, !0), E(d);
				var f = F(d, 2);
				U(f, () => X.cross, !0), E(f), E(l), E(s);
				var p = F(s, 2), m = M(p), h = P(F(m));
				E(p);
				var g = F(p, 2);
				G(g);
				var _ = F(g, 2), v = M(_), y = P(F(v));
				E(_);
				var b = F(_, 2);
				G(b), I((e, t, n, o, s) => {
					q(c, "src", L(i).src), d.disabled = a === r().props.images.length - 1, q(f, "title", e), V(m, `${t ?? ""} `), V(h, `${n ?? ""}%`), K(g, L(i).x ?? .5), V(v, `${o ?? ""} `), V(y, `${s ?? ""}%`), K(b, L(i).y ?? .5);
				}, [
					() => J("tip.removeImage"),
					() => J("lbl.focusX"),
					() => Math.round((L(i).x ?? .5) * 100),
					() => J("lbl.focusY"),
					() => Math.round((L(i).y ?? .5) * 100)
				]), R("click", u, () => Nr(t(), n(), a, -1)), R("click", d, () => Nr(t(), n(), a, 1)), R("click", f, () => Pr(t(), n(), a)), R("input", g, (e) => Fr(t(), n(), a, "x", Number(e.target.value))), R("input", b, (e) => Fr(t(), n(), a, "y", Number(e.target.value))), B(e, o);
			}), I((e, t) => {
				q(a, "title", e), V(o, `${t ?? ""} `);
			}, [() => J("tip.bg.addImages"), () => J("ui.addImages")]), R("change", s, (e) => jr(t(), n(), e)), B(e, i);
		};
		H(a, (e) => {
			(r().props.source ?? "upload") !== "folder" && e(o);
		}), B(e, i);
	}, r = (e, t = f, n = f, r = f) => {
		let i = /* @__PURE__ */ k(() => Ga(r()));
		var a = ox(), o = N(a), s = M(o), c = F(s);
		{
			let e = /* @__PURE__ */ k(() => L(i).source ?? "upload"), r = /* @__PURE__ */ k(() => [["upload", J("opt.photoSource.upload")], ["folder", J("opt.photoSource.folder")]]);
			Y(c, {
				get value() {
					return L(e);
				},
				get options() {
					return L(r);
				},
				onchange: (e) => Zn(t(), n(), "source", e)
			});
		}
		E(o);
		var l = F(o, 2), u = (e) => {
			let a = /* @__PURE__ */ k(() => lb(L(i).folder ?? "")), o = /* @__PURE__ */ k(() => !L(a) || L(a).provider === "drive" || L(a).provider === "nextcloud");
			var s = ax(), c = N(s), l = M(c), u = F(l);
			G(u);
			let d;
			E(c);
			var f = F(c, 2), p = M(f), m = F(p);
			{
				let e = /* @__PURE__ */ k(() => L(o) || L(i).order === "random" ? L(i).order ?? "name" : "name"), r = /* @__PURE__ */ k(() => L(o) ? [
					["name", J("opt.folderOrder.name")],
					["newest", J("opt.folderOrder.newest")],
					["random", J("opt.folderOrder.random")]
				] : [["name", J("opt.folderOrder.listed")], ["random", J("opt.folderOrder.random")]]);
				Y(m, {
					get value() {
						return L(e);
					},
					get options() {
						return L(r);
					},
					onchange: (e) => Zn(t(), n(), "order", e)
				});
			}
			E(f);
			var h = F(f, 2), g = M(h), _ = F(g);
			G(_), E(h);
			var v = F(h, 2), y = M(v);
			U(y, () => X.eye);
			var b = F(y);
			E(v);
			var x = F(v, 2), S = (e) => {
				var r = ix();
				let i;
				var a = P(r, !0);
				I((e, t) => {
					i = W(r, 1, "folder-status", null, i, { err: e }), V(a, t);
				}, [() => Er[Dr(t(), n())].err, () => Er[Dr(t(), n())].text]), B(e, r);
			}, C = /* @__PURE__ */ k(() => Er[Dr(t(), n())]);
			H(x, (e) => {
				L(C) && e(S);
			}), I((e, t, n, r, o, s, m, y) => {
				q(c, "title", e), V(l, `${t ?? ""} `), K(u, L(i).folder ?? ""), d = W(u, 1, "", null, d, { "bad-target": n }), q(f, "title", r), V(p, `${o ?? ""} `), q(h, "title", s), V(g, `${m ?? ""} `), K(_, L(i).folderMax ?? 24), v.disabled = !L(a), V(b, ` ${y ?? ""}`);
			}, [
				() => J("tip.bg.photoFolder"),
				() => J("lbl.photoFolder"),
				() => (L(i).folder ?? "").trim() && !L(a),
				() => J("tip.bg.folderOrder"),
				() => J("lbl.folderOrder"),
				() => J("tip.bg.folderMax"),
				() => J("lbl.folderMax"),
				() => J("ui.checkFolder")
			]), R("change", u, (e) => Zn(t(), n(), "folder", e.target.value.trim())), R("change", _, (e) => Zn(t(), n(), "folderMax", Number(e.target.value))), R("click", v, () => kr(t(), n(), r())), B(e, s);
		};
		H(l, (e) => {
			(L(i).source ?? "upload") === "folder" && e(u);
		}), I((e, t) => {
			q(o, "title", e), V(s, `${t ?? ""} `);
		}, [() => J("tip.bg.photoSource"), () => J("lbl.photoSource")]), B(e, a);
	}, i = (e, t = f, n = f, r = f) => {
		var i = ox(), a = N(i), o = M(a), s = F(o);
		{
			let e = /* @__PURE__ */ k(() => r().props.motion ?? "none"), i = /* @__PURE__ */ k(() => [
				["none", J("common.none")],
				["kenburns", J("opt.bgMotion.kenburns")],
				["drift", J("opt.bgMotion.drift")]
			]);
			Y(s, {
				get value() {
					return L(e);
				},
				get options() {
					return L(i);
				},
				onchange: (e) => Zn(t(), n(), "motion", e)
			});
		}
		E(a);
		var c = F(a, 2), l = (e) => {
			var i = sx(), a = N(i), o = M(a), s = P(F(o));
			E(a);
			var c = F(a, 2);
			G(c), I((e) => {
				V(o, `${e ?? ""} `), V(s, `${r().props.motionSpeed ?? 20 ?? ""} s`), K(c, r().props.motionSpeed ?? 20);
			}, [() => J("lbl.motionSpeed")]), R("input", c, (e) => Zn(t(), n(), "motionSpeed", Number(e.target.value))), B(e, i);
		};
		H(c, (e) => {
			(r().props.motion ?? "none") !== "none" && e(l);
		}), I((e, t) => {
			q(a, "title", e), V(o, `${t ?? ""} `);
		}, [() => J("tip.bg.imageMotion"), () => J("lbl.motion")]), B(e, i);
	}, a = (e, t = f, a = f) => {
		var s = Px(), c = N(s);
		ri(c, 17, a, $r, (e, s, c) => {
			var l = Nx(), u = M(l), d = M(u);
			{
				let e = /* @__PURE__ */ k(() => J("tip.bg.changeType")), n = /* @__PURE__ */ k(() => o.map(([e, t]) => [e, t.labelKey ? J(t.labelKey) : t.label]));
				Y(d, {
					get value() {
						return L(s).type;
					},
					get title() {
						return L(e);
					},
					get options() {
						return L(n);
					},
					onchange: (e) => mr(t(), c, e)
				});
			}
			var f = F(d, 2), p = M(f);
			p.disabled = c === 0, U(p, () => X.up, !0), E(p);
			var m = F(p, 2);
			U(m, () => X.down, !0), E(m);
			var h = F(m, 2);
			U(h, () => X.cross, !0), E(h), E(f), E(u);
			var g = F(u, 2), _ = (e) => {
				var n = cx(), r = N(n), i = M(r), a = F(i);
				{
					let e = /* @__PURE__ */ k(Ur), n = /* @__PURE__ */ k(() => J("tip.bg.layerColor"));
					Pa(a, {
						get value() {
							return L(s).props.value;
						},
						get tokens() {
							return L(e);
						},
						get label() {
							return L(n);
						},
						onchange: (e) => Zn(t(), c, "value", e)
					});
				}
				E(r);
				var o = F(r, 2), l = M(o), u = P(F(l));
				E(o);
				var d = F(o, 2);
				G(d), I((e, t, n) => {
					V(i, `${e ?? ""} `), V(l, `${t ?? ""} `), V(u, `${n ?? ""}%`), K(d, L(s).props.opacity ?? 1);
				}, [
					() => J("lbl.color"),
					() => J("lbl.strength"),
					() => Math.round((L(s).props.opacity ?? 1) * 100)
				]), R("input", d, (e) => Zn(t(), c, "opacity", Number(e.target.value))), B(e, n);
			}, v = (e) => {
				let n = /* @__PURE__ */ k(() => rr(L(s))), r = /* @__PURE__ */ k(() => L(n).stops.reduce((e, t) => e + Math.max(0, Number(t.share) || 0), 0));
				var i = px(), a = N(i), o = M(a), l = F(o);
				{
					let e = /* @__PURE__ */ k(() => L(n).kind ?? "linear"), r = /* @__PURE__ */ k(() => [["linear", J("opt.grad.linear")], ["radial", J("opt.grad.radial")]]);
					Y(l, {
						get value() {
							return L(e);
						},
						get options() {
							return L(r);
						},
						onchange: (e) => sr(t(), c, e)
					});
				}
				E(a);
				var u = F(a, 2);
				ri(u, 17, () => L(n).stops, $r, (e, i, a) => {
					var o = ux();
					let s;
					var l = M(o), u = F(l, 2);
					{
						let e = /* @__PURE__ */ k(Ur), n = /* @__PURE__ */ k(() => J("tip.bg.stopColor"));
						Pa(u, {
							get value() {
								return L(i).color;
							},
							get tokens() {
								return L(e);
							},
							get label() {
								return L(n);
							},
							onchange: (e) => cr(t(), c, a, { color: e })
						});
					}
					var d = F(u, 2);
					G(d);
					var f = F(d, 2), p = P(f), m = F(f, 2), h = (e) => {
						var n = lx();
						U(n, () => X.cross, !0), E(n), I((e) => q(n, "title", e), [() => J("tip.bg.removeStop")]), R("click", n, () => ur(t(), c, a)), B(e, n);
					};
					H(m, (e) => {
						L(n).stops.length > 2 && e(h);
					}), E(o), I((e, t, r) => {
						s = W(o, 1, "nav-line grad-stop", null, s, {
							dragging: L(fr)?.layer === c && L(fr).from === a,
							"drop-above": L(fr)?.layer === c && L(fr).insert === a,
							"drop-below": L(fr)?.layer === c && L(fr).insert === L(n).stops.length && a === L(n).stops.length - 1
						}), q(l, "title", e), K(d, L(i).share ?? 50), q(d, "title", t), V(p, `${r ?? ""}%`);
					}, [
						() => J("tip.bg.dragStop"),
						() => J("tip.bg.stopShare"),
						() => L(r) > 0 ? Math.round(Math.max(0, Number(L(i).share) || 0) / L(r) * 100) : Math.round(100 / L(n).stops.length)
					]), R("pointerdown", l, (e) => pr(t(), e, c, a)), R("input", d, (e) => cr(t(), c, a, { share: Number(e.target.value) })), B(e, o);
				});
				var d = F(u, 2), f = P(d, !0), p = F(d, 2), m = (e) => {
					var r = dx(), i = N(r), a = M(i), o = P(F(a));
					E(i);
					var s = F(i, 2);
					G(s);
					var l = F(s, 2), u = M(l), d = P(F(u));
					E(l);
					var f = F(l, 2);
					G(f), I((e, t, r, i) => {
						V(a, `${e ?? ""} `), V(o, `${t ?? ""}%`), K(s, L(n).x ?? .5), V(u, `${r ?? ""} `), V(d, `${i ?? ""}%`), K(f, L(n).y ?? .5);
					}, [
						() => J("lbl.centerX"),
						() => Math.round((L(n).x ?? .5) * 100),
						() => J("lbl.centerY"),
						() => Math.round((L(n).y ?? .5) * 100)
					]), R("input", s, (e) => ar(t(), c, "x", Number(e.target.value))), R("input", f, (e) => ar(t(), c, "y", Number(e.target.value))), B(e, r);
				}, h = (e) => {
					var r = fx(), i = N(r), a = M(i), o = P(F(a));
					E(i);
					var s = F(i, 2);
					G(s), I((e) => {
						V(a, `${e ?? ""} `), V(o, `${L(n).angle ?? ""}°`), K(s, L(n).angle);
					}, [() => J("lbl.angle")]), R("input", s, (e) => ar(t(), c, "angle", Number(e.target.value))), B(e, r);
				};
				H(p, (e) => {
					(L(n).kind ?? "linear") === "radial" ? e(m) : e(h, -1);
				});
				var g = F(p, 2), _ = M(g), v = P(F(_));
				E(g);
				var y = F(g, 2);
				G(y);
				var b = F(y, 2), x = M(b), S = F(x);
				{
					let e = /* @__PURE__ */ k(() => L(n).animation ?? "none");
					Y(S, {
						get value() {
							return L(e);
						},
						get options() {
							return or[(L(n).kind ?? "linear") === "radial" ? "radial" : "linear"];
						},
						onchange: (e) => ar(t(), c, "animation", e)
					});
				}
				E(b), I((e, t, r, i, a, s, c) => {
					V(o, `${e ?? ""} `), q(d, "title", t), V(f, r), V(_, `${i ?? ""} `), V(v, `${a ?? ""}%`), K(y, L(n).opacity ?? 1), q(b, "title", s), V(x, `${c ?? ""} `);
				}, [
					() => J("blocks.shape"),
					() => J("tip.bg.addStop"),
					() => J("ui.addStop"),
					() => J("lbl.strength"),
					() => Math.round((L(n).opacity ?? 1) * 100),
					() => J("tip.bg.motion"),
					() => J("lbl.motion")
				]), R("click", d, () => lr(t(), c)), R("input", y, (e) => ar(t(), c, "opacity", Number(e.target.value))), B(e, i);
			}, y = (e) => {
				var n = mx(), r = N(n), i = M(r), a = F(i);
				{
					let e = /* @__PURE__ */ k(Ur), n = /* @__PURE__ */ k(() => J("tip.bg.glowColor"));
					Pa(a, {
						get value() {
							return L(s).props.color;
						},
						get tokens() {
							return L(e);
						},
						get label() {
							return L(n);
						},
						onchange: (e) => Zn(t(), c, "color", e)
					});
				}
				E(r);
				var o = F(r, 2), l = M(o), u = P(F(l));
				E(o);
				var d = F(o, 2);
				G(d);
				var f = F(d, 2), p = M(f), m = P(F(p));
				E(f);
				var h = F(f, 2);
				G(h);
				var g = F(h, 2), _ = M(g), v = P(F(_));
				E(g);
				var y = F(g, 2);
				G(y);
				var b = F(y, 2), x = M(b), S = P(F(x));
				E(b);
				var C = F(b, 2);
				G(C), I((e, t, n, r, a, o, c, f, g) => {
					V(i, `${e ?? ""} `), V(l, `${t ?? ""} `), V(u, `${n ?? ""}%`), K(d, L(s).props.x), V(p, `${r ?? ""} `), V(m, `${a ?? ""}%`), K(h, L(s).props.y), V(_, `${o ?? ""} `), V(v, `${c ?? ""}%`), K(y, L(s).props.radius), V(x, `${f ?? ""} `), V(S, `${g ?? ""}%`), K(C, L(s).props.opacity);
				}, [
					() => J("lbl.color"),
					() => J("lbl.posX"),
					() => Math.round(L(s).props.x * 100),
					() => J("lbl.posY"),
					() => Math.round(L(s).props.y * 100),
					() => J("lbl.size"),
					() => Math.round(L(s).props.radius * 100),
					() => J("lbl.strength"),
					() => Math.round(L(s).props.opacity * 100)
				]), R("input", d, (e) => Zn(t(), c, "x", Number(e.target.value))), R("input", h, (e) => Zn(t(), c, "y", Number(e.target.value))), R("input", y, (e) => Zn(t(), c, "radius", Number(e.target.value))), R("input", C, (e) => Zn(t(), c, "opacity", Number(e.target.value))), B(e, n);
			}, b = (e) => {
				var n = hx(), r = N(n), i = M(r), a = P(F(i));
				E(r);
				var o = F(r, 2);
				G(o), I((e, t) => {
					V(i, `${e ?? ""} `), V(a, `${t ?? ""}%`), K(o, L(s).props.opacity);
				}, [() => J("lbl.strength"), () => Math.round(L(s).props.opacity * 100)]), R("input", o, (e) => Zn(t(), c, "opacity", Number(e.target.value))), B(e, n);
			}, x = (e) => {
				var n = gx(), r = N(n), i = M(r), a = F(i);
				{
					let e = /* @__PURE__ */ k(() => by(L(s).props.pattern)), n = /* @__PURE__ */ k(() => gy.map((e) => [e, J(`opt.bgPattern.${e}`)]));
					Y(a, {
						get value() {
							return L(e);
						},
						get options() {
							return L(n);
						},
						onchange: (e) => Zn(t(), c, "pattern", e)
					});
				}
				E(r);
				var o = F(r, 2), l = M(o), u = F(l);
				{
					let e = /* @__PURE__ */ k(() => L(s).props.color ?? "text"), n = /* @__PURE__ */ k(Ur), r = /* @__PURE__ */ k(() => J("lbl.color"));
					Pa(u, {
						get value() {
							return L(e);
						},
						get tokens() {
							return L(n);
						},
						get label() {
							return L(r);
						},
						onchange: (e) => Zn(t(), c, "color", e)
					});
				}
				E(o);
				var d = F(o, 2), f = M(d), p = P(F(f));
				E(d);
				var m = F(d, 2);
				G(m);
				var h = F(m, 2), g = M(h), _ = P(F(g));
				E(h);
				var v = F(h, 2);
				G(v);
				var y = F(v, 2), b = M(y), x = P(F(b));
				E(y);
				var S = F(y, 2);
				G(S);
				var C = F(S, 2), w = M(C);
				G(w);
				var T = F(w);
				E(C), I((e, t, n, r, a, o, c, u) => {
					V(i, `${e ?? ""} `), V(l, `${t ?? ""} `), V(f, `${n ?? ""} `), V(p, `${L(s).props.size ?? _y.dflt ?? ""} px`), q(m, "min", _y.min), q(m, "max", _y.max), K(m, L(s).props.size ?? _y.dflt), V(g, `${r ?? ""} `), V(_, `${a ?? ""}%`), K(v, L(s).props.opacity ?? .12), V(b, `${o ?? ""} `), V(x, `${L(s).props.rotation ?? 0 ?? ""}°`), K(S, L(s).props.rotation ?? 0), q(C, "title", c), Ni(w, L(s).props.invert === !0), V(T, ` ${u ?? ""}`);
				}, [
					() => J("lbl.bgPattern"),
					() => J("lbl.color"),
					() => J("lbl.size"),
					() => J("lbl.strength"),
					() => Math.round((L(s).props.opacity ?? .12) * 100),
					() => J("lbl.patternRotation"),
					() => J("tip.bg.patternInvert"),
					() => J("lbl.patternInvert")
				]), R("input", m, (e) => Zn(t(), c, "size", Number(e.target.value))), R("input", v, (e) => Zn(t(), c, "opacity", Number(e.target.value))), R("input", S, (e) => Zn(t(), c, "rotation", Number(e.target.value))), R("change", w, (e) => Zn(t(), c, "invert", e.target.checked)), B(e, n);
			}, S = (e) => {
				let n = /* @__PURE__ */ k(() => L(s).props.fit === "tile" || L(s).props.fit === "repeat");
				var r = yx(), a = N(r), o = M(a), l = F(o);
				E(a);
				var u = F(a, 2), d = M(u), f = F(d);
				{
					let e = /* @__PURE__ */ k(() => L(n) ? "tile" : "plain"), r = /* @__PURE__ */ k(() => [["plain", J("opt.img.plain")], ["tile", J("opt.img.tile")]]);
					Y(f, {
						get value() {
							return L(e);
						},
						get options() {
							return L(r);
						},
						onchange: (e) => Zn(t(), c, "fit", e)
					});
				}
				E(u);
				var p = F(u, 2), m = P(p, !0), h = F(p, 2), g = M(h), _ = F(g, 2);
				G(_);
				var v = F(_, 4);
				E(h);
				var y = F(h, 2), b = (e) => {
					var n = _x(), r = N(n), i = M(r), a = P(i, !0), o = F(i, 2), l = P(o, !0);
					E(r);
					var u = F(r, 2), d = P(u, !0), f = F(u, 2), p = F(f, 2), m = M(p), h = P(F(m));
					E(p);
					var g = F(p, 2);
					G(g);
					var _ = F(g, 2), v = M(_), y = P(F(v));
					E(_);
					var b = F(_, 2);
					G(b), I((e, t, n, r, c, p, _, x, S, C, w, T) => {
						q(i, "title", e), V(a, t), q(o, "title", n), V(l, r), q(u, "title", c), V(d, p), Oi(f, `--fx:${_ ?? ""}%; --fy:${x ?? ""}%`), V(m, `${S ?? ""} `), V(h, `${C ?? ""}%`), K(g, L(s).props.x ?? .5), V(v, `${w ?? ""} `), V(y, `${T ?? ""}%`), K(b, L(s).props.y ?? .5);
					}, [
						() => J("tip.bg.cover"),
						() => J("ui.cover"),
						() => J("opt.fitFrame.contain"),
						() => J("opt.fit.contain"),
						() => J("tip.bg.position"),
						() => J("lbl.position"),
						() => Math.max(0, Math.min(1, L(s).props.x ?? .5)) * 100,
						() => Math.max(0, Math.min(1, L(s).props.y ?? .5)) * 100,
						() => J("lbl.horizontal"),
						() => Math.round((L(s).props.x ?? .5) * 100),
						() => J("lbl.vertical"),
						() => Math.round((L(s).props.y ?? .5) * 100)
					]), R("click", i, () => nr(t(), c, L(s), "cover")), R("click", o, () => nr(t(), c, L(s), "contain")), R("pointerdown", f, (e) => Qn(e, t(), c, "xy")), R("input", g, (e) => Zn(t(), c, "x", Number(e.target.value))), R("input", b, (e) => Zn(t(), c, "y", Number(e.target.value))), B(e, n);
				};
				H(y, (e) => {
					L(n) || e(b);
				});
				var x = F(y, 2), S = M(x), C = P(F(S));
				E(x);
				var w = F(x, 2);
				G(w);
				var T = F(w, 2), ee = M(T), te = P(F(ee));
				E(T);
				var ne = F(T, 2);
				G(ne);
				var re = F(ne, 2);
				i(re, t, () => c, () => L(s));
				var ie = F(re, 2), ae = M(ie);
				G(ae);
				var oe = F(ae);
				E(ie);
				var se = F(ie, 2), ce = (e) => {
					var n = vx(), r = N(n), i = M(r), a = P(F(i));
					E(r);
					var o = F(r, 2);
					G(o);
					var l = F(o, 2), u = M(l), d = F(u);
					{
						let e = /* @__PURE__ */ k(() => L(s).props.bleed ?? "none"), n = /* @__PURE__ */ k(() => [
							["none", J("common.none")],
							["up", J("opt.bleed.up")],
							["down", J("opt.bleed.down")],
							["both", J("opt.brand.both")]
						]);
						Y(d, {
							get value() {
								return L(e);
							},
							get options() {
								return L(n);
							},
							onchange: (e) => Zn(t(), c, "bleed", e)
						});
					}
					E(l), I((e, t, n, r) => {
						V(i, `${e ?? ""} `), V(a, `${t ?? ""}%`), K(o, L(s).props.parallax ?? .3), q(l, "title", n), V(u, `${r ?? ""} `);
					}, [
						() => J("lbl.parallaxStrength"),
						() => Math.round((L(s).props.parallax ?? 0) * 100),
						() => J("tip.bg.bleed"),
						() => J("lbl.bleed")
					]), R("input", o, (e) => Zn(t(), c, "parallax", Number(e.target.value))), B(e, n);
				};
				H(se, (e) => {
					(L(s).props.parallax ?? 0) > 0 && e(ce);
				}), I((e, t, n, r, i, c, l, f, h, y, b, x, T, re) => {
					q(a, "title", e), V(o, `${t ?? ""} `), q(u, "title", n), V(d, `${r ?? ""} `), q(p, "title", i), V(m, c), q(g, "title", l), K(_, f), q(v, "title", h), V(S, `${y ?? ""} `), V(C, `${L(s).props.blur ?? 0 ?? ""} px`), K(w, L(s).props.blur ?? 0), V(ee, `${b ?? ""} `), V(te, `${x ?? ""}%`), K(ne, L(s).props.opacity ?? 1), q(ie, "title", T), Ni(ae, (L(s).props.parallax ?? 0) > 0), V(oe, ` ${re ?? ""}`);
				}, [
					() => J("tip.webpAuto"),
					() => L(s).props.src ? J("ui.changeImage") : J("ui.chooseImage"),
					() => J("tip.bg.fit"),
					() => J("lbl.imageFit"),
					() => J("tip.bg.size"),
					() => J("lbl.size"),
					() => J("tip.smaller"),
					() => Math.round((L(s).props.size ?? 1) * 100),
					() => J("tip.larger"),
					() => J("lbl.blur"),
					() => J("lbl.strength"),
					() => Math.round((L(s).props.opacity ?? 1) * 100),
					() => J("tip.bg.parallax"),
					() => J("lbl.parallax")
				]), R("change", l, (e) => Cr(t(), c, e)), R("click", g, () => er(t(), c, L(s).props.size ?? 1, -.05)), R("change", _, (e) => tr(t(), c, e.target.value)), R("click", v, () => er(t(), c, L(s).props.size ?? 1, .05)), R("input", w, (e) => Zn(t(), c, "blur", Number(e.target.value))), R("input", ne, (e) => Zn(t(), c, "opacity", Number(e.target.value))), R("change", ae, (e) => Zn(t(), c, "parallax", e.target.checked ? .3 : 0)), B(e, r);
			}, C = (e) => {
				let i = /* @__PURE__ */ k(() => Ga(L(s))), a = /* @__PURE__ */ k(() => L(i).style ?? "floating"), o = /* @__PURE__ */ k(() => Bs(L(a), L(i).motion)), l = /* @__PURE__ */ k(() => (L(i).seed ?? 0) > 0);
				var u = Ax(), d = N(u);
				r(d, t, () => c, () => L(s));
				var f = F(d, 2);
				n(f, t, () => c, () => L(s));
				var p = F(f, 2), m = M(p), h = F(m);
				{
					let e = /* @__PURE__ */ k(() => hs.map((e) => [e, J(`opt.galleryStyle.${e}`)]));
					Y(h, {
						get value() {
							return L(a);
						},
						get options() {
							return L(e);
						},
						onchange: (e) => Zn(t(), c, "style", e)
					});
				}
				E(p);
				var g = F(p, 2), _ = (e) => {
					var n = bx(), r = N(n), a = M(r), o = F(a);
					{
						let e = /* @__PURE__ */ k(() => L(i).fit ?? "cover"), n = /* @__PURE__ */ k(() => [["cover", J("opt.fit.cover")], ["contain", J("opt.fit.contain")]]);
						Y(o, {
							get value() {
								return L(e);
							},
							get options() {
								return L(n);
							},
							onchange: (e) => Zn(t(), c, "fit", e)
						});
					}
					E(r);
					var s = F(r, 2), l = M(s), u = P(F(l));
					E(s);
					var d = F(s, 2);
					G(d);
					var f = F(d, 2), p = M(f), m = P(F(p));
					E(f);
					var h = F(f, 2);
					G(h);
					var g = F(h, 2), _ = M(g), v = P(F(_));
					E(g);
					var y = F(g, 2);
					G(y), I((e, t, n, r, o) => {
						V(a, `${e ?? ""} `), V(l, `${t ?? ""} `), V(u, `${L(i).interval ?? 12 ?? ""} s`), K(d, L(i).interval ?? 12), V(p, `${n ?? ""} `), V(m, `${r ?? ""} s`), K(h, L(i).fade ?? 1.5), V(_, `${o ?? ""} `), V(v, `${L(i).blur ?? 0 ?? ""} px`), K(y, L(i).blur ?? 0);
					}, [
						() => J("lbl.imageFit"),
						() => J("lbl.secondsPerImage"),
						() => J("lbl.transition"),
						() => (L(i).fade ?? 1.5).toFixed(1),
						() => J("lbl.blur")
					]), R("input", d, (e) => Zn(t(), c, "interval", Number(e.target.value))), R("input", h, (e) => Zn(t(), c, "fade", Number(e.target.value))), R("input", y, (e) => Zn(t(), c, "blur", Number(e.target.value))), B(e, n);
				}, v = (e) => {
					var n = Dx(), r = N(n), o = (e) => {
						var n = xx(), r = N(n), a = M(r), o = F(a);
						{
							let e = /* @__PURE__ */ k(() => String(L(i).rows ?? 2));
							Y(o, {
								get value() {
									return L(e);
								},
								options: [["1", "1"], ["2", "2"]],
								onchange: (e) => Zn(t(), c, "rows", Number(e))
							});
						}
						E(r);
						var s = F(r, 2), l = M(s), u = F(l);
						{
							let e = /* @__PURE__ */ k(() => L(i).direction ?? "left"), n = /* @__PURE__ */ k(() => [["left", J("opt.ribbonDir.left")], ["right", J("opt.ribbonDir.right")]]);
							Y(u, {
								get value() {
									return L(e);
								},
								get options() {
									return L(n);
								},
								onchange: (e) => Zn(t(), c, "direction", e)
							});
						}
						E(s), I((e, t) => {
							V(a, `${e ?? ""} `), V(l, `${t ?? ""} `);
						}, [() => J("lbl.galleryRows"), () => J("lbl.photoDirection")]), B(e, n);
					}, s = (e) => {
						var n = Cx(), r = N(n), o = M(r), s = F(o);
						G(s), E(r);
						var u = F(r, 2), d = M(u), f = F(d);
						{
							let e = /* @__PURE__ */ k(() => L(i).repeat === !0 ? "repeat" : "once"), n = /* @__PURE__ */ k(() => [["once", J("opt.galleryRepeat.once")], ["repeat", J("opt.galleryRepeat.repeat")]]);
							Y(f, {
								get value() {
									return L(e);
								},
								get options() {
									return L(n);
								},
								onchange: (e) => Zn(t(), c, "repeat", e === "repeat")
							});
						}
						E(u);
						var p = F(u, 2), m = M(p), h = F(m);
						{
							let e = /* @__PURE__ */ k(() => L(l) ? "fixed" : "random"), n = /* @__PURE__ */ k(() => [["random", J("opt.galleryPlace.random")], ["fixed", J("opt.galleryPlace.fixed")]]);
							Y(h, {
								get value() {
									return L(e);
								},
								get options() {
									return L(n);
								},
								onchange: (e) => Zn(t(), c, "seed", e === "fixed" ? Or() : 0)
							});
						}
						E(p);
						var g = F(p, 2), _ = (e) => {
							var n = Sx(), r = M(n);
							U(r, () => X.shuffle);
							var i = F(r);
							E(n), I((e, t) => {
								q(n, "title", e), V(i, ` ${t ?? ""}`);
							}, [() => J("tip.bg.photoSeed"), () => J("ui.shufflePhotos")]), R("click", n, () => Zn(t(), c, "seed", Or())), B(e, n);
						};
						H(g, (e) => {
							L(l) && e(_);
						}), I((e, t, n, c, l, f) => {
							q(r, "title", e), V(o, `${t ?? ""} `), q(s, "min", L(a) === "mosaic" ? 4 : 1), K(s, L(i).count ?? (L(a) === "mosaic" ? 12 : 8)), q(u, "title", n), V(d, `${c ?? ""} `), q(p, "title", l), V(m, `${f ?? ""} `);
						}, [
							() => J("tip.bg.photoCount"),
							() => J("lbl.photoCount"),
							() => J("tip.bg.galleryRepeat"),
							() => J("lbl.galleryRepeat"),
							() => J("tip.bg.galleryPlace"),
							() => J("lbl.galleryPlace")
						]), R("change", s, (e) => Zn(t(), c, "count", Number(e.target.value))), B(e, n);
					};
					H(r, (e) => {
						L(a) === "band" ? e(o) : e(s, -1);
					});
					var u = F(r, 2), d = M(u), f = P(F(d));
					E(u);
					var p = F(u, 2);
					G(p);
					var m = F(p, 2), h = (e) => {
						var n = wx(), r = N(n), a = M(r), o = P(F(a));
						E(r);
						var s = F(r, 2);
						G(s);
						var l = F(s, 2), u = M(l), d = P(F(u));
						E(l);
						var f = F(l, 2);
						G(f), I((e, t, n, c) => {
							q(r, "title", e), V(a, `${t ?? ""} `), V(o, `${n ?? ""}%`), K(s, L(i).spread ?? .85), V(u, `${c ?? ""} `), V(d, `${L(i).tilt ?? 5 ?? ""}°`), K(f, L(i).tilt ?? 5);
						}, [
							() => J("tip.bg.photoSpread"),
							() => J("lbl.photoSpread"),
							() => Math.round((L(i).spread ?? .85) * 100),
							() => J("lbl.photoTilt")
						]), R("input", s, (e) => Zn(t(), c, "spread", Number(e.target.value))), R("input", f, (e) => Zn(t(), c, "tilt", Number(e.target.value))), B(e, n);
					};
					H(m, (e) => {
						L(a) === "floating" && e(h);
					});
					var g = F(m, 2), _ = M(g), v = F(_);
					{
						let e = /* @__PURE__ */ k(() => L(i).shape ?? "rect"), n = /* @__PURE__ */ k(() => gs.map((e) => [e, J(`opt.galleryShape.${e}`)]));
						Y(v, {
							get value() {
								return L(e);
							},
							get options() {
								return L(n);
							},
							onchange: (e) => Zn(t(), c, "shape", e)
						});
					}
					E(g);
					var y = F(g, 2), b = M(y), x = F(b);
					{
						let e = /* @__PURE__ */ k(() => L(i).look ?? "shadow"), n = /* @__PURE__ */ k(() => _s.map((e) => [e, J(`opt.galleryLook.${e}`)]));
						Y(x, {
							get value() {
								return L(e);
							},
							get options() {
								return L(n);
							},
							onchange: (e) => Zn(t(), c, "look", e)
						});
					}
					E(y);
					var S = F(y, 2), C = (e) => {
						var n = Tx(), r = M(n), a = F(r);
						{
							let e = /* @__PURE__ */ k(() => Ks(L(i).look, L(i).frameColor)), n = /* @__PURE__ */ k(Ur), r = /* @__PURE__ */ k(() => J("tip.bg.frameColor"));
							Pa(a, {
								get value() {
									return L(e);
								},
								get tokens() {
									return L(n);
								},
								allowClear: !0,
								get label() {
									return L(r);
								},
								onchange: (e) => Zn(t(), c, "frameColor", e ?? "")
							});
						}
						E(n), I((e) => V(r, `${e ?? ""} `), [() => J("lbl.frameColor")]), B(e, n);
					}, w = /* @__PURE__ */ k(() => Gs(L(i).look));
					H(S, (e) => {
						L(w) && e(C);
					});
					var T = F(S, 2), ee = (e) => {
						var n = Ex(), r = N(n), a = M(r), o = P(F(a));
						E(r);
						var s = F(r, 2);
						G(s), I((e) => {
							V(a, `${e ?? ""} `), V(o, `${L(i).radius ?? 5 ?? ""} px`), K(s, L(i).radius ?? 5);
						}, [() => J("lbl.rounding")]), R("input", s, (e) => Zn(t(), c, "radius", Number(e.target.value))), B(e, n);
					}, te = /* @__PURE__ */ k(() => Zs(L(i).shape) && (L(i).look ?? "shadow") !== "polaroid");
					H(T, (e) => {
						L(te) && e(ee);
					}), I((e, t, n, r, i, a, o) => {
						V(d, `${e ?? ""} `), V(f, `${t ?? ""} px`), K(p, n), q(g, "title", r), V(_, `${i ?? ""} `), q(y, "title", a), V(b, `${o ?? ""} `);
					}, [
						() => J("lbl.size"),
						() => Ws(L(i).size, L(a)),
						() => Ws(L(i).size, L(a)),
						() => J("tip.bg.galleryShape"),
						() => J("lbl.galleryShape"),
						() => J("tip.bg.galleryLook"),
						() => J("lbl.galleryLook")
					]), R("input", p, (e) => Zn(t(), c, "size", Number(e.target.value))), B(e, n);
				};
				H(g, (e) => {
					L(a) === "fill" ? e(_) : e(v, -1);
				});
				var y = F(g, 2), b = M(y), x = F(b);
				{
					let e = /* @__PURE__ */ k(() => L(i).tone ?? "natural"), n = /* @__PURE__ */ k(() => vs.map((e) => [e, J(`opt.galleryTone.${e}`)]));
					Y(x, {
						get value() {
							return L(e);
						},
						get options() {
							return L(n);
						},
						onchange: (e) => Zn(t(), c, "tone", e)
					});
				}
				E(y);
				var S = F(y, 2), C = (e) => {
					var n = Tx(), r = M(n), i = F(r);
					{
						let e = /* @__PURE__ */ k(() => Vs(L(a)).map((e) => [e, J(e === "none" ? "common.none" : `opt.galleryMotion.${e}`)]));
						Y(i, {
							get value() {
								return L(o);
							},
							get options() {
								return L(e);
							},
							onchange: (e) => Zn(t(), c, "motion", e)
						});
					}
					E(n), I((e, t) => {
						q(n, "title", e), V(r, `${t ?? ""} `);
					}, [() => J("tip.bg.photoMotion"), () => J("lbl.motion")]), B(e, n);
				}, w = /* @__PURE__ */ k(() => Vs(L(a)).length > 1);
				H(S, (e) => {
					L(w) && e(C);
				});
				var T = F(S, 2), ee = (e) => {
					var n = Ox(), r = N(n), a = M(r), o = P(F(a));
					E(r);
					var s = F(r, 2);
					G(s), I((e) => {
						V(a, `${e ?? ""} `), V(o, `${L(i).interval ?? 12 ?? ""} s`), K(s, L(i).interval ?? 12);
					}, [() => J("lbl.secondsPerImage")]), R("input", s, (e) => Zn(t(), c, "interval", Number(e.target.value))), B(e, n);
				}, te = (e) => {
					var n = Ox(), r = N(n), a = M(r), o = P(F(a));
					E(r);
					var s = F(r, 2);
					G(s), I((e) => {
						V(a, `${e ?? ""} `), V(o, `${L(i).motionSpeed ?? 30 ?? ""} s`), K(s, L(i).motionSpeed ?? 30);
					}, [() => J("lbl.motionSpeed")]), R("input", s, (e) => Zn(t(), c, "motionSpeed", Number(e.target.value))), B(e, n);
				};
				H(T, (e) => {
					L(o) === "crossfade" && L(a) !== "fill" ? e(ee) : (L(o) !== "none" || L(a) === "band") && e(te, 1);
				});
				var ne = F(T, 2), re = M(ne);
				G(re);
				var ie = F(re);
				E(ne);
				var ae = F(ne, 2), oe = (e) => {
					var n = kx();
					let r;
					var a = M(n);
					G(a);
					var o = F(a);
					E(n), I((e, t) => {
						r = W(n, 1, "gridmenu-snap", null, r, { muted: L(i).underNav === !1 }), q(n, "title", e), Ni(a, L(i).underAnnounce === !0), a.disabled = L(i).underNav === !1, V(o, ` ${t ?? ""}`);
					}, [() => J("tip.bg.underAnnounce"), () => J("lbl.underAnnounce")]), R("change", a, (e) => e.target.checked ? Xn(t(), c, {
						underAnnounce: !0,
						underNav: !0
					}) : Zn(t(), c, "underAnnounce", !1)), B(e, n);
				};
				H(ae, (e) => {
					L(O).nav?.announcement?.text && e(oe);
				});
				var se = F(ae, 2), ce = M(se), le = P(F(ce));
				E(se);
				var ue = F(se, 2);
				G(ue), I((e, t, n, r, a, o, s, c) => {
					q(p, "title", e), V(m, `${t ?? ""} `), q(y, "title", n), V(b, `${r ?? ""} `), q(ne, "title", a), Ni(re, L(i).underNav !== !1), V(ie, ` ${o ?? ""}`), V(ce, `${s ?? ""} `), V(le, `${c ?? ""}%`), K(ue, L(i).opacity ?? .85);
				}, [
					() => J("tip.bg.galleryStyle"),
					() => J("lbl.galleryStyle"),
					() => J("tip.bg.galleryTone"),
					() => J("lbl.galleryTone"),
					() => J("tip.bg.underNav"),
					() => J("lbl.underNav"),
					() => J("lbl.strength"),
					() => Math.round((L(i).opacity ?? .85) * 100)
				]), R("change", re, (e) => e.target.checked ? Zn(t(), c, "underNav", !0) : Xn(t(), c, {
					underNav: !1,
					underAnnounce: !1
				})), R("input", ue, (e) => Zn(t(), c, "opacity", Number(e.target.value))), B(e, u);
			}, w = (e) => {
				var n = Mx(), r = N(n), i = M(r), a = F(i);
				E(r);
				var o = F(r, 2), l = M(o), u = F(l);
				E(o);
				var d = F(o, 2), f = M(d), p = F(f);
				{
					let e = /* @__PURE__ */ k(() => L(s).props.fit ?? "cover"), n = /* @__PURE__ */ k(() => [["cover", J("opt.fit.cover")], ["contain", J("opt.fit.contain")]]);
					Y(p, {
						get value() {
							return L(e);
						},
						get options() {
							return L(n);
						},
						onchange: (e) => Zn(t(), c, "fit", e)
					});
				}
				E(d);
				var m = F(d, 2), h = M(m), g = P(F(h));
				E(m);
				var _ = F(m, 2);
				G(_);
				var v = F(_, 2), y = M(v), b = P(F(y));
				E(v);
				var x = F(v, 2);
				G(x);
				var S = F(x, 2), C = M(S), w = P(F(C));
				E(S);
				var T = F(S, 2);
				G(T);
				var ee = F(T, 2), te = M(ee);
				G(te);
				var ne = F(te);
				E(ee);
				var re = F(ee, 2), ie = (e) => {
					var n = jx(), r = N(n), i = M(r), a = P(F(i));
					E(r);
					var o = F(r, 2);
					G(o), I((e, t) => {
						V(i, `${e ?? ""} `), V(a, `${t ?? ""}%`), K(o, L(s).props.parallax ?? .3);
					}, [() => J("lbl.parallaxStrength"), () => Math.round((L(s).props.parallax ?? 0) * 100)]), R("input", o, (e) => Zn(t(), c, "parallax", Number(e.target.value))), B(e, n);
				};
				H(re, (e) => {
					(L(s).props.parallax ?? 0) > 0 && e(ie);
				}), I((e, t, n, a, c, u, p, m, v, S, re, ie, ae, oe) => {
					q(r, "title", e), V(i, `${t ?? ""} `), q(o, "title", n), V(l, `${a ?? ""} `), q(d, "title", c), V(f, `${u ?? ""} `), V(h, `${p ?? ""} `), V(g, `${m ?? ""}%`), K(_, L(s).props.x ?? .5), V(y, `${v ?? ""} `), V(b, `${S ?? ""}%`), K(x, L(s).props.y ?? .5), V(C, `${re ?? ""} `), V(w, `${ie ?? ""}%`), K(T, L(s).props.opacity ?? 1), q(ee, "title", ae), Ni(te, (L(s).props.parallax ?? 0) > 0), V(ne, ` ${oe ?? ""}`);
				}, [
					() => J("tip.bg.videoFile"),
					() => L(s).props.src ? J("ui.changeVideo") : J("ui.chooseVideo"),
					() => J("tip.bg.poster"),
					() => L(s).props.poster ? J("ui.changeImage") : J("ui.choosePoster"),
					() => J("tip.bg.fit"),
					() => J("lbl.imageFit"),
					() => J("lbl.horizontal"),
					() => Math.round((L(s).props.x ?? .5) * 100),
					() => J("lbl.vertical"),
					() => Math.round((L(s).props.y ?? .5) * 100),
					() => J("lbl.strength"),
					() => Math.round((L(s).props.opacity ?? 1) * 100),
					() => J("tip.bg.parallax"),
					() => J("lbl.parallax")
				]), R("change", a, (e) => wr(t(), c, e)), R("change", u, (e) => Tr(t(), c, e)), R("input", _, (e) => Zn(t(), c, "x", Number(e.target.value))), R("input", x, (e) => Zn(t(), c, "y", Number(e.target.value))), R("input", T, (e) => Zn(t(), c, "opacity", Number(e.target.value))), R("change", te, (e) => Zn(t(), c, "parallax", e.target.checked ? .3 : 0)), B(e, n);
			};
			H(g, (e) => {
				L(s).type === "color" ? e(_) : L(s).type === "gradient" ? e(v, 1) : L(s).type === "glow" ? e(y, 2) : L(s).type === "grain" ? e(b, 3) : L(s).type === "pattern" ? e(x, 4) : L(s).type === "image" ? e(S, 5) : L(s).type === "slideshow" ? e(C, 6) : L(s).type === "video" && e(w, 7);
			}), E(l), I((e, t, n) => {
				q(p, "title", e), q(m, "title", t), m.disabled = c === a().length - 1, q(h, "title", n);
			}, [
				() => J("hint.bg.order"),
				() => J("hint.bg.order"),
				() => J("tip.bg.removeLayer")
			]), R("click", p, () => Yn(t(), c, -1)), R("click", m, () => Yn(t(), c, 1)), R("click", h, () => Jn(t(), c)), B(e, l);
		});
		var l = F(c, 2), u = M(l), d = F(u);
		{
			let e = /* @__PURE__ */ k(() => o.map(([e, t]) => [e, t.labelKey ? J(t.labelKey) : t.label]));
			Y(d, {
				get value() {
					return L(Kn);
				},
				get options() {
					return L(e);
				},
				onchange: (e) => j(Kn, e, !0)
			});
		}
		E(l);
		var p = F(l, 2), m = P(p, !0);
		I((e, t) => {
			V(u, `${e ?? ""} `), V(m, t);
		}, [() => J("lbl.newLayer"), () => J("ui.addLayer")]), R("click", p, () => qn(t(), L(Kn))), B(e, s);
	}, o = [
		["color", ry],
		["gradient", hy],
		["glow", A_],
		["image", eb],
		["slideshow", Mb],
		["video", Zb],
		["pattern", Ey],
		["grain", M_]
	], s = Object.fromEntries(o), c = [
		["purple", J("adminTheme.purple")],
		["well", J("adminTheme.well")],
		["gold", J("adminTheme.gold")],
		["grey", J("adminTheme.grey")],
		["aurora", J("adminTheme.aurora")],
		["dusk", J("adminTheme.dusk")],
		["ember", J("adminTheme.ember")]
	], l = {
		lilla: "purple",
		bronn: "well",
		gull: "gold",
		graa: "grey",
		nordlys: "aurora",
		skumring: "dusk",
		glo: "ember"
	}, u = /* @__PURE__ */ A(cn((() => {
		let e = localStorage.getItem("urd-admin-theme");
		return l[e] ?? e ?? "grey";
	})()));
	On(() => {
		document.documentElement.dataset.adminTheme = L(u), localStorage.setItem("urd-admin-theme", L(u)), d();
	});
	function d() {
		let e = getComputedStyle(document.documentElement), t = e.getPropertyValue("--urd-color-accent").trim();
		Ie?.sendAdminTheme({
			bg: e.getPropertyValue("--urd-color-bg").trim(),
			surface: e.getPropertyValue("--urd-color-surface").trim(),
			accent: t,
			text: e.getPropertyValue("--urd-color-text").trim(),
			"accent-text": p(t)
		});
	}
	function p(e) {
		return fh(e) == null || (ph(e, "#ffffff") ?? 0) >= (ph(e, "#0b0e14") ?? 0) ? "#ffffff" : "#0b0e14";
	}
	let m = /* @__PURE__ */ A(null), g = /* @__PURE__ */ A(null), _ = /* @__PURE__ */ A(!1), v = /* @__PURE__ */ A(""), y = /* @__PURE__ */ A("info"), b = 0;
	function x(e, t = "info") {
		j(v, e, !0), j(y, t, !0);
		let n = ++b;
		t === "ok" && setTimeout(() => {
			b === n && (j(v, ""), j(y, "info"));
		}, 8e3);
	}
	function S() {
		x(J("status.storageFull"), "error");
	}
	function C(e, t) {
		try {
			localStorage.setItem(e, t);
		} catch {
			S();
		}
	}
	let w = /* @__PURE__ */ A(null), T = /* @__PURE__ */ A(null), ee = /* @__PURE__ */ A(cn({
		size: 16,
		snap: !0
	})), te = /* @__PURE__ */ A(!0), ne = /* @__PURE__ */ A(cn(ov(typeof window < "u" ? window : null) ?? 1920)), re = "urd-admin-screen";
	function ie() {
		let e = null;
		try {
			e = JSON.parse(localStorage.getItem(re) ?? "null");
		} catch {
			e = null;
		}
		return sv(e, L(ne));
	}
	let ae = /* @__PURE__ */ A(cn(ie()));
	function oe(e) {
		j(ae, sv({
			...Ke(L(ae)),
			...e
		}, L(ne)), !0);
		try {
			localStorage.setItem(re, JSON.stringify(L(ae)));
		} catch {}
	}
	let se = /* @__PURE__ */ k(() => cv(L(ae), L(ne))), ce = [
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
	], le = /* @__PURE__ */ k(() => [{
		id: "desktop",
		width: L(se).width,
		height: L(se).height || null,
		viewport: "desktop"
	}, ...ce]);
	function ue(e) {
		let t = $g(L(Aa), L(ja), e.width).width;
		return J(e.id === "desktop" ? L(ae).mode === "own" ? "tip.view.desktop" : e.height ? "tip.view.desktopSizeH" : "tip.view.desktopSize" : `tip.view.${e.id}`, {
			w: e.width,
			h: e.height ?? 0,
			c: t
		});
	}
	let de = /* @__PURE__ */ A("desktop"), fe = /* @__PURE__ */ k(() => L(le).find((e) => e.id === L(de)) ?? L(le)[0]), pe = /* @__PURE__ */ k(() => L(fe).viewport === "mobile" || L(fe).width <= (L(O)?.breakpoints?.mobile ?? 640) ? "mobile" : "desktop"), me = /* @__PURE__ */ A(null), he = /* @__PURE__ */ A(0), ge = /* @__PURE__ */ A(0), _e = /* @__PURE__ */ A("fit"), ve = /* @__PURE__ */ A(1), ye = /* @__PURE__ */ k(() => Qg(L(Aa), L(ja))), be = /* @__PURE__ */ k(() => L(fe).width), xe = /* @__PURE__ */ k(() => L(fe).height ?? 0), Se = /* @__PURE__ */ k(() => L(_e) === "manual" ? L(ve) : $_(L(he), L(be), "fit", L(ge), L(xe)));
	function Ce(e) {
		let t = Math.min(400, Math.max(10, (Math.round(Math.round(L(Se) * 100) / 10) + e) * 10));
		j(ve, t / 100), j(_e, "manual");
	}
	let we = /* @__PURE__ */ k(() => L(xe) > 0 ? L(xe) : L(Se) > 0 ? L(ge) / L(Se) : L(ge)), Te = /* @__PURE__ */ k(() => L(be) * L(Se)), Ee = /* @__PURE__ */ k(() => L(xe) > 0 ? L(xe) * L(Se) : L(ge)), De = /* @__PURE__ */ k(() => L(Te) > L(he) + 1 || L(Ee) > L(ge) + 1);
	On(() => {
		let e = () => Ie?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), On(() => {
		let e = L(pe);
		Ie?.sendViewport(e);
	}), On(() => {
		let e = L(Se);
		Ie?.sendZoom(e);
	}), On(() => {
		let e = () => {
			j(ne, ov(window) ?? L(ne), !0);
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}), On(() => {
		let e = L(me);
		if (!e || typeof ResizeObserver > "u") return;
		let t = () => {
			j(he, e.clientWidth, !0), j(ge, e.clientHeight, !0);
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	});
	let Oe = /* @__PURE__ */ A(0);
	function Ae() {
		j(Oe, D?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function je() {
		let e = D?.data.sections.find((e) => e.responsive?.mobile?.attention?.needed);
		j(de, "mobile"), e && setTimeout(() => Ie?.sendScrollSection(e.id), 0);
	}
	function Me(e) {
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
			}, Pe(t, "layout-changed"), e.sectionId === L(An) && j(Mn, e.minHeight, !0), L(Lt)?.sectionId === e.sectionId && zt(), D.save(), Ve(), Ie?.sendSection(L(g), t);
		}
	}
	function Ne(e) {
		return e?.blocks?.some((e) => e.frames?.mobile) ?? !1;
	}
	function Pe(e, t) {
		e && Ne(e) && (e.responsive?.mobile?.attention?.needed || (e.responsive = {
			...e.responsive ?? {},
			mobile: {
				...e.responsive?.mobile ?? { mode: "auto" },
				attention: {
					needed: !0,
					reason: t,
					since: (/* @__PURE__ */ new Date()).toISOString()
				}
			}
		}, Ae(), Ie?.sendAttention(e.id, !0)));
	}
	let D = null, Fe = null, Ie = null, O = /* @__PURE__ */ A(null);
	function Le() {
		j(O, Fe.data, !0), Fe.replace(L(O));
	}
	function Re() {
		Ie?.sendSite(Ke(L(O)));
	}
	let ze = /* @__PURE__ */ new Set(), Be = () => L(O).pages.find((e) => e.id === L(g));
	function Ve() {
		let e = L(O)?.pages?.some((e) => !ze.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = Ka?.hasDraft() || Object.values(qa).some((e) => e.hasDraft()), n = ao?.hasDraft() || Object.values(oo).some((e) => e.hasDraft());
		j(_, e || D?.hasDraft() && !ze.has(L(g)) || Fe?.hasDraft() || Z?.hasDraft() || t || n || !1, !0);
	}
	let He = [], Ue = [], We = null;
	function Ge() {
		return JSON.stringify({
			pageId: L(g),
			page: D.data,
			site: Fe.data,
			collectionsIndex: Ya ? Ka.data : null,
			collections: Ya ? Object.fromEntries(Object.entries(qa).map(([e, t]) => [e, t.data])) : {},
			templatesIndex: co ? ao.data : null,
			templates: co ? Object.fromEntries(Object.entries(oo).map(([e, t]) => [e, t.data])) : {},
			plugins: Z?.data ?? null
		});
	}
	function qe(e) {
		(e !== We || !e.startsWith("edit:") && !e.startsWith("grid:")) && (He.push(Ge()), He.length > 50 && He.shift(), Ue.length = 0, We = e);
	}
	function Je(e) {
		let { pageId: t, page: n, site: r, collectionsIndex: i, collections: a, templatesIndex: o, templates: s, plugins: c } = JSON.parse(e);
		if (Fe.replace(r), Le(), Fe.save(), j(ee, {
			snap: !0,
			...L(O).grid
		}, !0), Re(), Ye(i, a ?? {}), Xe(o, s ?? {}), Ze(c), t && t !== L(g) && L(O).pages.some((e) => e.id === t)) {
			C(`urd-draft-${t}`, JSON.stringify(n)), zi(t, { keepHistory: !0 }), Ve();
			return;
		}
		D.replace(n), D.save(), Ve(), Ae(), zt(), Rn(D.data.sections.find((e) => e.id === L(An))), L(O).pages.some((e) => e.id === L(g)) ? Ie?.sendPage(L(g), D.data) : zi(L(O).pages[0].id, { keepHistory: !0 });
	}
	function Ye(e, t) {
		if (Ka && e && JSON.stringify({
			index: Ka.data,
			collections: Object.fromEntries(Object.entries(qa).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			collections: t
		})) {
			Ka.replace(e), Ka.save();
			for (let e of Object.keys(qa)) e in t || (localStorage.removeItem(`urd-draft-collection-${e}`), localStorage.removeItem(`urd-draft-samling-${e}`), delete qa[e]);
			for (let [e, n] of Object.entries(t)) {
				if (!qa[e]) {
					let t = Ja[e] ?? null;
					qa[e] = ga(`urd-draft-collection-${e}`, () => t, S, `urd-draft-samling-${e}`);
				}
				qa[e].replace(n), qa[e].save();
			}
			j(Xa, [...e.samlinger ?? []], !0), L(Qa) && !L(Xa).includes(L(Qa)) && j(Qa, null), yo();
		}
	}
	function Xe(e, t) {
		if (ao && e && JSON.stringify({
			index: ao.data,
			templates: Object.fromEntries(Object.entries(oo).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			templates: t
		})) {
			ao.replace(e), ao.save();
			for (let e of Object.keys(oo)) e in t || (localStorage.removeItem(`urd-draft-template-${e}`), localStorage.removeItem(`urd-draft-mal-${e}`), delete oo[e]);
			for (let [e, n] of Object.entries(t)) oo[e] || (oo[e] = ga(`urd-draft-template-${e}`, () => so[e] ?? null, S, `urd-draft-mal-${e}`)), oo[e].replace(n), oo[e].save();
			j(lo, [...e.maler ?? []], !0), Ve(), fo();
		}
	}
	function Ze(e) {
		Z && e && JSON.stringify(Z.data) !== JSON.stringify(e) && (Z.replace(e), Z.save(), $o(), ds());
	}
	function Qe() {
		He.length && (dn(), Ue.push(Ge()), Je(He.pop()), We = null, x(J("status.undone")));
	}
	function nt() {
		Ue.length && (dn(), He.push(Ge()), Je(Ue.pop()), We = null, x(J("status.redone")));
	}
	function rt(e) {
		L(Vt) && (e.target instanceof Element && e.target.closest(".block-menu") || j(Vt, null));
	}
	function it(e) {
		if (e.key === "Escape" && L(Vt)) {
			j(Vt, null);
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
			].includes(t.type)) || !L(Lt) || L(pe) === "mobile") return;
			e.preventDefault(), Ie?.sendDuplicate();
			return;
		}
		if (t !== "z" && t !== "y") return;
		let n = e.target;
		n instanceof HTMLElement && (n.isContentEditable || n.tagName === "TEXTAREA" || n.tagName === "INPUT" && ![
			"number",
			"checkbox",
			"range",
			"color"
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? nt() : Qe());
	}
	async function at() {
		j(m, Qm(await (await fetch("/content/site.json")).json()), !0), Fe = ga("urd-draft-site", () => L(m), S), (Fe.data.schemaVersion ?? 1) > 4 && (console.warn(`Urd: the site draft has schemaVersion ${Fe.data.schemaVersion} (the engine has 4) and is discarded`), Fe.replace(Ke(L(m)))), Fe.replace(Qm(Fe.data)), Fe.save(), Le(), j(ee, {
			snap: !0,
			...L(O).grid
		}, !0), await zi(new URLSearchParams(location.search).get("page") ?? L(O).pages[0].id), await os(), await vo(), await uo(), await di(), L(T) && pi(), It(), L(O).site.setup === !0 && !localStorage.getItem("urd-setup-done") && (j(mt, L(O).site.title, !0), j(ht, L(O).theme.tokens.color.accent, !0), j(gt, L(O).theme.tokens.color.bg, !0), j(dt, !0));
	}
	let ot = /* @__PURE__ */ A(null);
	function st({ title: e, lines: t = [], okLabel: n = J("confirm.ok"), cancelLabel: r = J("confirm.cancel") }) {
		return new Promise((i) => {
			j(ot, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function ct({ title: e, lines: t = [], value: n = "", placeholder: r = "", okLabel: i = J("confirm.ok"), cancelLabel: a = J("confirm.cancel") }) {
		return new Promise((o) => {
			j(ot, {
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
	function lt(e) {
		L(ot)?.resolve(L(ot).prompt ? e ? L(ot).value : null : e), j(ot, null);
	}
	let ut = !1;
	On(() => {
		if (!L(ot)) return;
		let e = (e) => {
			e.key === "Escape" && (e.stopPropagation(), lt(!1));
		};
		return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
	});
	let dt = /* @__PURE__ */ A(!1), mt = /* @__PURE__ */ A(""), ht = /* @__PURE__ */ A("#7c5cff"), gt = /* @__PURE__ */ A("#0b0e14");
	function _t() {
		localStorage.setItem("urd-setup-done", "1"), j(dt, !1);
	}
	function vt() {
		let e = L(mt).trim();
		e && (na("setup", () => {
			L(O).site.title = e, L(O).nav.logo = {
				type: "text",
				value: e
			}, L(O).theme.tokens.color.accent = L(ht), L(O).theme.tokens.color.bg = L(gt), delete L(O).site.setup;
		}), _t(), x(J("status.setupDone"), "ok"));
	}
	let yt = "urd-admin-panels", bt = "urd-admin-panel-open", xt = /* @__PURE__ */ A(cn(localStorage.getItem(yt) === "reset" ? "reset" : "remember"));
	function St(e) {
		j(xt, e === "reset" ? "reset" : "remember", !0), L(xt) === "reset" ? localStorage.setItem(yt, "reset") : localStorage.removeItem(yt);
	}
	let Ct = /* @__PURE__ */ A(cn(L(xt) === "reset" ? null : localStorage.getItem(bt))), wt = [
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
	], Tt = [
		"rail.thisPage",
		"rail.site",
		"rail.system"
	], Et = Object.fromEntries(wt.flat().map((e) => [e, J(`panel.${e}`)]));
	L(Ct) && !Et[L(Ct)] && j(Ct, null), On(() => {
		if (L(xt) === "reset") {
			localStorage.removeItem(bt);
			return;
		}
		L(Ct) ? localStorage.setItem(bt, L(Ct)) : localStorage.removeItem(bt);
	});
	let Dt = {
		pages: ["hint.pages.drafts"],
		blocks: ["hint.blocks.intro"],
		grid: ["hint.grid.intro", "hint.grid.section"],
		collections: ["hint.collections.intro"],
		plugins: ["hint.plugins.intro"],
		history: ["hint.history.intro"]
	}, Ot = [
		["se", "Davvisámegiella"],
		["en-GB", "English (UK)"],
		["nb", "Norsk bokmål"],
		["nn", "Norsk nynorsk"],
		["tr", "Türkçe"]
	], kt = (e) => [...e].sort((e, t) => e[1].localeCompare(t[1]));
	function At(e, t) {
		let n = [];
		for (let r of e) for (let e of Go[r]?.languages ?? []) e?.[t] === !0 && typeof e.code == "string" && typeof e.name == "string" && e.name && (Ot.some(([t]) => t === e.code) || n.some(([t]) => t === e.code) || n.push([e.code, e.name]));
		return n;
	}
	function jt() {
		let e = kt([...Ot, ...At(L(Xo), "admin")]);
		return Nt === "auto" || e.some(([e]) => e === Nt) ? e : [[Nt, Nt], ...e];
	}
	let Mt = () => At(L(Wo)?.enabled ?? [], "site"), Nt = localStorage.getItem("urd-admin-lang") ?? "auto";
	function Pt(e) {
		e !== Nt && (e === "auto" ? localStorage.removeItem("urd-admin-lang") : localStorage.setItem("urd-admin-lang", e), location.reload());
	}
	function Ft(e) {
		j(Ct, L(Ct) === e ? null : e, !0), It();
	}
	function It() {
		L(Ct) === "history" && vi(), L(Ct) === "update" && !L(ki) && ji();
	}
	let Lt = /* @__PURE__ */ A(null);
	function Rt(e, t) {
		let n = D?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function zt() {
		if (!L(Lt)) return;
		let { block: e } = Rt(L(Lt).sectionId, L(Lt).blockId);
		if (!e) {
			j(Lt, null);
			return;
		}
		j(Lt, {
			sectionId: L(Lt).sectionId,
			blockId: L(Lt).blockId,
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
	function Bt(e) {
		if (j(Vt, null), !e.blockId) {
			j(Lt, null);
			return;
		}
		j(Lt, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), e.sectionId && j(An, e.sectionId, !0), zt();
	}
	let Vt = /* @__PURE__ */ A(null);
	function Ht() {
		io(L(me)?.getBoundingClientRect().left ?? 0);
	}
	On(() => {
		if (L(Vt)) return Ht(), window.addEventListener("resize", Ht), () => window.removeEventListener("resize", Ht);
	});
	let Ut = /* @__PURE__ */ A(null);
	On(() => {
		L(Ut)?.mode === "set" && L(Lt)?.type !== "calendar" && j(Ut, null);
	});
	let Wt = null;
	On(() => {
		let e = L(Lt)?.blockId ?? null;
		e !== Wt && (Wt = e, to.menuQuery = "", to.propsQuery = "");
	}), On(() => {
		L(Vt) || (to.menuQuery = "");
	});
	let Gt = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	function Kt(e) {
		if (Bt(e), !L(Lt)) return;
		Ht();
		let t = Math.min(to.wide && to.room >= 740 ? 740 : 400, window.innerWidth - 16), n = L(w)?.getBoundingClientRect();
		if (!n) return;
		let r = n.left + L(Se) * e.rect.right + 12;
		r + t > window.innerWidth - 8 && (r = Math.max(8, n.left + L(Se) * e.rect.left - t - 12));
		let i = window.innerHeight - Math.min(window.innerHeight * .7, 560) - 8, a = Math.min(Math.max(8, n.top + L(Se) * e.rect.top), Math.max(8, i));
		j(Vt, {
			left: r,
			top: a
		}, !0);
	}
	function qt(e, t) {
		let { section: n, block: r } = Rt(L(Lt)?.sectionId, L(Lt)?.blockId);
		r && (e && qe(e), t(r, n), Pe(n, "block-edited"), D.save(), Ve(), Ie?.sendSection(L(g), n), zt(), nn(n.id, r));
	}
	function Jt(e, t) {
		qt(`edit:${L(Lt).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function Yt(e, t) {
		qt(`edit:${L(Lt).blockId}:${e}`, (e) => {
			Object.assign(e.props, t);
		});
	}
	function Xt() {
		return [...L(O).pages.map((e) => [e.id, e.title]), ["__href", J("opt.externalLink")]];
	}
	function Zt(e) {
		let t = e === "__href" ? null : e;
		qt(`edit:${L(Lt).blockId}`, (e) => {
			e.props.page = t, t && (e.props.href = null);
		});
	}
	function Qt() {
		Ie?.sendOpenImageEditor(L(Lt).blockId), j(Vt, null);
	}
	let $t = /* @__PURE__ */ new Map(), en = /* @__PURE__ */ new Map(), tn = 0;
	function nn(e, t) {
		if (sn(e, t), L(pe) !== "desktop" || !vc(t)) return;
		clearTimeout($t.get(t.id));
		let n = ++tn;
		en.set(t.id, n), $t.set(t.id, setTimeout(() => Ie?.sendFitBlock(e, t.id, n), 60));
	}
	let rn = /* @__PURE__ */ new Map(), an = null, on = "";
	function sn(e, t) {
		if (!yc.has(t.type) || !vc(t)) return;
		an ??= La({
			title: () => J("canvas.phoneMeasure"),
			prepare: (e, t) => {
				let n = Ke(L(Wo))?.enabled ?? [], r = JSON.stringify(n);
				(t || r !== on) && e({
					type: "urd-plugins",
					enabled: n
				}), on = r, e({
					type: "urd-site",
					site: Ke(L(O))
				}), e({
					type: "urd-collections",
					collections: Ke(L(Za)) ?? {}
				});
			},
			onHeight: un
		});
		let n = ++tn;
		rn.set(t.id, n), an.request(L(g), Ke(D.data), e, t.id, n);
	}
	function un(e, t, n, r) {
		if (e !== L(g) || r !== rn.get(t)) return;
		let i = D.data.sections.flatMap((e) => e.blocks).find((e) => e.id === t), a = Math.round(n);
		i && a > 0 && i.mobileHeight !== a && (i.mobileHeight = a, D.save(), Ve());
	}
	function dn() {
		for (let e of $t.values()) clearTimeout(e);
		$t.clear(), en.clear(), rn.clear(), an?.cancel();
	}
	function fn(e) {
		let t = ts(e), n = t.view === "next" ? {
			nextCount: L(Lt).props.nextCount ?? 3,
			laterCount: L(Lt).props.laterCount ?? 3
		} : {}, r = t.id === "plain" && ![
			"list",
			"cards",
			"month",
			"agenda",
			"next"
		].includes(ns(L(Lt).props)) ? { view: "list" } : {};
		Yt("design", {
			design: t.id === "plain" ? void 0 : t.id,
			...t.view ? { view: t.view } : {},
			...r,
			...n
		});
	}
	function pn(e) {
		qt(`edit:${L(Lt).blockId}:fit`, (t) => {
			e === "shrink" || e === "both" ? (t.fit = e, t.fitMin ??= .6) : (delete t.fit, delete t.fitMin);
		});
	}
	function mn(e) {
		qt(`edit:${L(Lt).blockId}:fitMin`, (t) => {
			t.fitMin = e;
		});
	}
	let hn = null;
	function gn(e) {
		qt(`edit:${L(Lt).blockId}:size`, (t, n) => {
			hn?.blockId !== t.id && (hn = {
				blockId: t.id,
				size: Tc(t),
				frame: { ...t.frames.desktop },
				ys: new Map(n.blocks.filter((e) => e.frames?.desktop).map((e) => [e.id, e.frames.desktop.y]))
			}), e === 1 ? (delete t.size, delete t.sizeMin, delete t.sizeMax) : t.size = e;
			let r = hn;
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
	function _n(e, t) {
		let n = e === "sizeMin" ? wc.minDefault : wc.maxDefault;
		qt(`edit:${L(Lt).blockId}:${e}`, (r) => {
			let i = Math.round(Number(t));
			Number.isFinite(i) && i > 0 && i !== n ? r[e] = Math.min(wc.max, Math.max(wc.min, i)) : delete r[e];
		});
	}
	function vn(e) {
		qt(`edit:${L(Lt).blockId}:height`, (t) => {
			e === "own" ? t.height = { mode: "own" } : delete t.height;
		});
	}
	function yn(e) {
		qt(`edit:${L(Lt).blockId}:heightAlign`, (t) => {
			t.height = { mode: "own" }, e !== "top" && (t.height.align = e);
		});
	}
	function bn() {
		let e = L(Lt);
		if (bc.has(e.type)) return !0;
		if (e.type !== "calendar") return !1;
		let t = ts(e.props.design);
		return !t.module && ["list", "cards"].includes(t.view);
	}
	function xn(e, t) {
		Number.isFinite(t) && qt(`edit:frame-${L(Lt).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function Sn() {
		let e = D.data.sections.find((e) => e.id === L(Lt)?.sectionId)?.size?.maxWidth, t = typeof L(Aa) == "number" ? L(Aa) : 0;
		return e === "full" ? 0 : e ? /^\d+(\.\d+)?px$/.test(e) ? Math.min(parseFloat(e), t || Infinity) : 0 : t;
	}
	function Cn(e) {
		return Math.round(e / 100 * Sn());
	}
	function wn(e, t) {
		let n = Sn();
		if (!Number.isFinite(e) || e < 4 || !(n > 0)) return;
		let { x: r, w: i, h: a } = L(Lt).frame, o = Math.max(.5, Math.min(Math.round(e / n * 200) / 2, Math.round((100 - r) * 2) / 2)), s = t ? Math.max(1, Math.round(o / i * a)) : a;
		Number.isFinite(o) && Number.isFinite(s) && qt(`edit:frame-${L(Lt).blockId}:size`, (e) => {
			e.frames.desktop = {
				...e.frames.desktop,
				w: o,
				h: s
			};
		});
	}
	function Tn(e) {
		qt(`edit:${L(Lt).blockId}:boxStyle`, (t) => {
			let n = {
				...t.props.boxStyle ?? {},
				...e
			};
			for (let e of Object.keys(n)) n[e] ?? delete n[e];
			Object.keys(n).length ? t.props.boxStyle = n : delete t.props.boxStyle;
		});
	}
	function En(e) {
		qt("decor", (t) => {
			t.decor = e;
		});
	}
	function Dn(e) {
		let { section: t, block: n } = Rt(L(Lt)?.sectionId, L(Lt)?.blockId);
		n && (qe("hide-mobile"), n.hideMobile = e, D.save(), Ve(), Ie?.sendSection(L(g), t), zt());
	}
	let kn = {
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
	}, An = /* @__PURE__ */ A(null), jn = /* @__PURE__ */ A(null), Mn = /* @__PURE__ */ A(""), Nn = /* @__PURE__ */ A(cn([])), Pn = /* @__PURE__ */ A(null), Fn = /* @__PURE__ */ A(null), In = /* @__PURE__ */ A(""), Ln = /* @__PURE__ */ A(cn({}));
	function Rn(e) {
		j(jn, e?.grid ? { ...e.grid } : null, !0), j(Mn, e?.size?.minHeight ?? "", !0), j(Nn, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), j(Pn, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0), j(Fn, e?.hover ? JSON.parse(JSON.stringify(e.hover)) : null, !0), j(In, e?.theme ?? "", !0), j(Ln, e?.divider ? JSON.parse(JSON.stringify(e.divider)) : {}, !0);
	}
	let zn = /* @__PURE__ */ A(null), Bn = cn({});
	function Vn() {
		try {
			let e = ((L(w)?.contentDocument)?.querySelector(`.urd-section[data-section-id="${L(An)}"]`))?.getBoundingClientRect();
			j(zn, e && e.width ? {
				w: e.width,
				h: e.height
			} : null, !0);
		} catch {
			j(zn, null);
		}
	}
	On(() => {
		L(An), L(Nn), requestAnimationFrame(() => requestAnimationFrame(Vn));
	}), On(() => {
		let e = L(w);
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(() => Vn());
		return t.observe(e), () => t.disconnect();
	}), On(() => {
		for (let e of L(Nn)) {
			let t = e?.props?.src;
			if (e?.type === "image" && t && !Bn[t]) {
				let e = new Image();
				e.onload = () => {
					Bn[t] = {
						w: e.naturalWidth,
						h: e.naturalHeight
					};
				}, e.src = t;
			}
		}
	});
	function Hn(e) {
		Gn("section-theme", (t) => {
			e ? t.theme = e : delete t.theme;
		});
	}
	function Un(e) {
		let t = L(Vr), n = (e) => e.replaceAll("var(--urd-base-bg)", t.bg).replaceAll("var(--urd-base-surface)", t.surface).replaceAll("var(--urd-base-text)", t.text).replaceAll("var(--urd-base-accent)", t.accent).replaceAll("var(--urd-base-accent-text)", t["accent-text"] ?? p(ks(t.accent ?? "#000000", t))), r = dh(e);
		return {
			bg: r["--urd-color-bg"] ? n(r["--urd-color-bg"]) : t.bg,
			surface: r["--urd-color-surface"] ? n(r["--urd-color-surface"]) : t.surface,
			text: r["--urd-color-text"] ? n(r["--urd-color-text"]) : t.text,
			accent: r["--urd-color-accent"] ? n(r["--urd-color-accent"]) : t.accent
		};
	}
	function Wn(e) {
		j(An, e.sectionId, !0), Rn(D?.data.sections.find((t) => t.id === e.sectionId));
	}
	function Gn(e, t) {
		let n = D.data.sections.find((e) => e.id === L(An));
		n && (qe(e), t(n), D.save(), Ve(), Ie?.sendSection(L(g), n), Rn(n));
	}
	let Kn = /* @__PURE__ */ A("color");
	function qn(e, t) {
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
	function Jn(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers.splice(t, 1), e.background.layers.length || delete e.background;
		});
	}
	function Yn(e, t, n) {
		let r = t + n;
		e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers;
			r < 0 || r >= n.length || ([n[t], n[r]] = [n[r], n[t]]);
		});
	}
	function Xn(e, t, n) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${Object.keys(n).join("+")}`, (e) => {
			Object.assign(e.background.layers[t].props, n);
		});
	}
	function Zn(e, t, n, r) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e.background.layers[t].props[n] = r;
		});
	}
	function Qn(e, t, n, r = "xy") {
		e.preventDefault();
		let i = e.currentTarget;
		i.setPointerCapture?.(e.pointerId);
		let a = (e) => {
			let a = i.getBoundingClientRect();
			if (r.includes("x")) {
				let r = Math.min(1, Math.max(0, (e.clientX - a.left) / a.width));
				Zn(t, n, "x", Math.round(r * 100) / 100);
			}
			if (r.includes("y")) {
				let r = Math.min(1, Math.max(0, (e.clientY - a.top) / a.height));
				Zn(t, n, "y", Math.round(r * 100) / 100);
			}
		};
		a(e);
		let o = () => {
			i.removeEventListener("pointermove", a), i.removeEventListener("pointerup", o), i.removeEventListener("pointercancel", o);
		};
		i.addEventListener("pointermove", a), i.addEventListener("pointerup", o), i.addEventListener("pointercancel", o);
	}
	let $n = (e) => Math.min(4, Math.max(.1, e));
	function er(e, t, n, r) {
		Zn(e, t, "size", $n(Math.round((n + r) * 100) / 100));
	}
	function tr(e, t, n) {
		let r = Number(n);
		Number.isFinite(r) && Zn(e, t, "size", $n(r / 100));
	}
	function nr(e, t, n, r) {
		let i = Bn[n.props.src];
		if (!i?.w || !i?.h || !L(zn)?.w || !L(zn)?.h) return;
		let a = L(zn).h * i.w / (L(zn).w * i.h), o = r === "cover" ? Math.max(1, a) : Math.min(1, a);
		(n.props.fit === "tile" || n.props.fit === "repeat") && Zn(e, t, "fit", "plain"), Zn(e, t, "size", $n(Math.round(o * 100) / 100));
	}
	function rr(e) {
		return e.props;
	}
	function ir(e, t, n, r) {
		e.mutate(n, (e) => {
			r(e.background.layers[t].props);
		});
	}
	function ar(e, t, n, r) {
		ir(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e[n] = r;
		});
	}
	let or = {
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
	function sr(e, t, n) {
		ir(e, t, e.keyPrefix, (e) => {
			e.kind = n, or[n].some(([t]) => t === (e.animation ?? "none")) || (e.animation = "none");
		});
	}
	function cr(e, t, n, r) {
		ir(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-stop${n}`, (e) => {
			e.stops[n] = {
				...e.stops[n],
				...r
			};
		});
	}
	function lr(e, t) {
		ir(e, t, e.keyPrefix, (e) => {
			let t = Math.round(e.stops.reduce((e, t) => e + (Number(t.share) || 0), 0) / e.stops.length) || 50;
			e.stops.push({
				color: e.stops[e.stops.length - 1]?.color ?? "#ffffff",
				share: t
			});
		});
	}
	function ur(e, t, n) {
		ir(e, t, e.keyPrefix, (e) => {
			e.stops.length > 2 && e.stops.splice(n, 1);
		});
	}
	function dr(e, t, n, r) {
		ir(e, t, e.keyPrefix, (e) => {
			let [t] = e.stops.splice(n, 1);
			e.stops.splice(r, 0, t);
		});
	}
	let fr = /* @__PURE__ */ A(null);
	function pr(e, t, n, r) {
		if (t.button !== 0) return;
		t.preventDefault();
		let i = t.currentTarget.closest(".bg-layer"), a = t.currentTarget.closest(".grad-stop");
		j(fr, {
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
			j(fr, {
				...L(fr),
				insert: n
			}, !0);
		}, u = () => {
			window.removeEventListener("pointermove", l), window.removeEventListener("pointerup", u), c.remove();
			let t = L(fr);
			if (j(fr, null), !t) return;
			let n = t.insert > t.from ? t.insert - 1 : t.insert;
			n !== t.from && dr(e, t.layer, t.from, n);
		};
		window.addEventListener("pointermove", l), window.addEventListener("pointerup", u);
	}
	function mr(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].type !== n && (e.background.layers[t] = {
				type: n,
				version: s[n].version ?? 1,
				props: s[n].defaults()
			});
		});
	}
	async function hr(e, t) {
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
	async function gr(e) {
		let t = await e.text(), n = Ll(t), r = zl(t);
		if (!r) return n;
		let i = await hr(n.dataUrl, r);
		if (!i) return n;
		let a = Rl(t, i);
		if (a === t) return n;
		try {
			return Ll(a);
		} catch {
			return n;
		}
	}
	async function _r(e) {
		if (e.type === "image/svg+xml" || /\.svg$/i.test(e.name || "")) return gr(e);
		let t = await Pl(e);
		return t.animated && t.bytes > 1e6 && x(J("status.animatedLarge", { mb: (t.bytes / 1e6).toFixed(1) }), "error"), t;
	}
	function vr(e) {
		return e?.code === "animatedTooLarge" ? J("status.animatedTooLarge", {
			mb: (e.bytes / 1e6).toFixed(1),
			max: Math.round(wl / 1e6)
		}) : J("status.imageReadError");
	}
	function yr(e, t, n) {
		if (!["video/mp4", "video/webm"].includes(e.type)) {
			x(J(t), "error");
			return;
		}
		if (e.size > 15e6) {
			x(J("status.videoTooLarge", {
				mb: (e.size / 1e6).toFixed(1),
				max: Math.round(Cl / 1e6)
			}), "error");
			return;
		}
		let r = new FileReader();
		r.onload = () => {
			n(String(r.result ?? "")), e.size > 4e6 && x(J("status.videoLarge", { mb: (e.size / 1e6).toFixed(1) }), "error");
		}, r.onerror = () => x(J("status.imageReadError"), "error"), r.readAsDataURL(e);
	}
	function br(e) {
		let t = e.target.files?.[0];
		e.target.value = "", t && yr(t, "status.videoFileFormat", (e) => Jt("src", e));
	}
	async function Sr(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			Jt("poster", (await _r(t)).dataUrl);
		} catch (e) {
			x(vr(e), "error");
		}
	}
	async function Cr(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			Zn(e, t, "src", (await _r(r)).dataUrl);
		} catch (e) {
			x(vr(e), "error");
		}
	}
	function wr(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && yr(r, "status.videoFormat", (n) => Zn(e, t, "src", n));
	}
	async function Tr(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			Zn(e, t, "poster", (await _r(r)).dataUrl);
		} catch (e) {
			x(vr(e), "error");
		}
	}
	let Er = cn({}), Dr = (e, t) => `${e.keyPrefix}-${e.keyId}-${t}`, Or = () => 1 + crypto.getRandomValues(/* @__PURE__ */ new Uint32Array(1))[0] % 1e6;
	async function kr(e, t, n) {
		let r = Dr(e, t);
		Er[r] = {
			text: J("status.folderChecking"),
			err: !1
		};
		let i = await Ob(n.props.folder, n.props.order, { force: !0 });
		Er[r] = i.photos.length ? {
			text: sa("status.folderFound", i.photos.length, { count: i.photos.length }),
			err: !1
		} : {
			text: ca(i) ?? J("status.folderNone"),
			err: !0
		};
	}
	async function jr(e, t, n) {
		let r = [...n.target.files ?? []];
		if (n.target.value = "", !r.length) return;
		x(J("status.compressingImages"));
		let { images: i, failed: a, big: o } = await _c(r);
		i.length && e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers[t].props;
			n.images ??= [], n.images.push(...i.map(({ src: e }) => ({
				src: e,
				x: .5,
				y: .5
			})));
		}), xc(i.length, a, o);
	}
	function Nr(e, t, n, r) {
		e.mutate(e.keyPrefix, (e) => {
			let i = e.background.layers[t].props.images, a = n + r;
			a < 0 || a >= i.length || ([i[n], i[a]] = [i[a], i[n]]);
		});
	}
	function Pr(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].props.images.splice(n, 1);
		});
	}
	function Fr(e, t, n, r, i) {
		e.mutate(`edit:${e.keyPrefix}g-${e.keyId}-${t}-${n}-${r}`, (e) => {
			e.background.layers[t].props.images[n][r] = i;
		});
	}
	function Ir(e, t) {
		na(e, () => {
			L(O).nav.style ??= {}, t(L(O).nav.style);
		});
	}
	let Lr = /* @__PURE__ */ k(() => ({
		mutate: Gn,
		keyPrefix: "bg",
		keyId: L(An)
	})), Rr = {
		mutate: Ir,
		keyPrefix: "navbg",
		keyId: "nav"
	}, zr = {
		mutate: ys,
		keyPrefix: "footerbg",
		keyId: "footer"
	}, Br = () => {
		let e = null;
		try {
			e = localStorage.getItem("urd-theme-mode");
		} catch {}
		return rh(L(O)?.theme?.scheme, e, window.matchMedia("(prefers-color-scheme: dark)").matches);
	}, z = /* @__PURE__ */ A("light");
	On(() => {
		j(z, Br(), !0);
		let e = window.matchMedia("(prefers-color-scheme: dark)"), t = (e) => {
			e instanceof StorageEvent && e.key && e.key !== "urd-theme-mode" || j(z, Br(), !0);
		};
		return e.addEventListener("change", t), window.addEventListener("storage", t), () => {
			e.removeEventListener("change", t), window.removeEventListener("storage", t);
		};
	});
	let Vr = /* @__PURE__ */ k(() => L(O)?.theme ? ih(L(O).theme, L(z)).color ?? {} : {}), Ur = () => Object.entries(L(Vr));
	function Wr(e) {
		return {
			type: e,
			version: ex[e].version,
			props: ex[e].defaults()
		};
	}
	let Gr = (e) => !!(e && ex[e.type]?.entrance), Kr = [["", J("common.none")], ...Object.entries(ex).filter(([, e]) => e.entrance).map(([e, t]) => [e, t.labelKey ? J(t.labelKey) : t.label])], qr = Kr.filter(([e]) => !ex[e]?.group), Jr = [["", J("common.none")], ...Object.entries(ex).filter(([, e]) => !e.entrance).map(([e, t]) => [e, t.labelKey ? J(t.labelKey) : t.label])];
	function Yr(e) {
		e.animation && !Gr(e.animation) && (e.hover ??= e.animation, e.animation = null);
	}
	function Xr(e) {
		qt(`edit:anim-${L(Lt).blockId}`, (t) => {
			Yr(t), t.animation = e ? Wr(e) : null;
		}), L(Lt) && Ie?.sendDemoAnim(L(Lt).sectionId, L(Lt).blockId);
	}
	function Zr(e) {
		qt(`edit:hover-${L(Lt).blockId}`, (t) => {
			Yr(t), t.hover = e ? Wr(e) : null;
		});
	}
	function Qr(e, t) {
		Number.isFinite(t) && (qt(`edit:anim-${L(Lt).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), L(Lt) && Ie?.sendDemoAnim(L(Lt).sectionId, L(Lt).blockId));
	}
	function ei(e) {
		Gn("section-anim", (t) => {
			Yr(t), t.animation = e ? Wr(e) : null;
		}), Ie?.sendDemoAnim(L(An));
	}
	function ti(e, t, n) {
		Gn(`section-divider-${e}-${t}`, (r) => {
			let i = { ...r.divider ?? {} };
			if (t === "shape" && !n) delete i[e];
			else {
				let r = { ...i[e] ?? { shape: "wave" } };
				n === void 0 || n === !1 || n === "" ? delete r[t] : r[t] = n, i[e] = r;
			}
			Object.keys(i).length ? r.divider = i : delete r.divider;
		});
	}
	function ni(e) {
		Gn("section-hover", (t) => {
			Yr(t), t.hover = e ? Wr(e) : null;
		});
	}
	function ii(e, t) {
		Number.isFinite(t) && (Gn("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), Ie?.sendDemoAnim(L(An)));
	}
	function ai(e, t) {
		Gn("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), Ie?.sendDemoAnim(L(An));
	}
	function oi(e) {
		let t = D.data.sections.find((e) => e.id === L(An));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		qe("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, j(Mn, r, !0), D.save(), Ve(), Ie?.sendSection(L(g), t);
	}
	function si() {
		return D.data.sections.find((e) => e.id === L(An)) ?? D.data.sections[0];
	}
	function ci(e) {
		let t = D.data.sections.find((e) => e.id === L(An));
		t && (qe("grid:section"), t.grid = e ? { ...Fe.data.grid } : null, j(jn, t.grid ? { ...t.grid } : null, !0), D.save(), Ve(), Ie?.sendSection(L(g), t), L($i) && Ie?.sendShowGrid(!0));
	}
	function li(e, t) {
		let n = D.data.sections.find((e) => e.id === L(An));
		n?.grid && (qe("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, j(jn, { ...n.grid }, !0), D.save(), Ve(), Ie?.sendSection(L(g), n), L($i) && Ie?.sendShowGrid(!0));
	}
	function ui(e, t) {
		qe("grid:site"), j(ee, {
			...L(ee),
			[e]: t
		}, !0), Fe.data.grid = {
			...Fe.data.grid,
			[e]: t
		}, Fe.save(), Ve(), Re(), L($i) && Ie?.sendShowGrid(!0);
	}
	async function di() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? j(T, await e.json(), !0) : e.status !== 503 && j(T, null);
		} catch {
			j(T, null);
		}
	}
	let fi = null;
	async function pi() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (fi = (await e.json()).head ?? null);
		} catch {}
	}
	async function mi(e) {
		if (!fi) return await pi(), {
			ok: await st({
				title: J("confirm.conflictUnknown.title"),
				lines: [J("confirm.conflictUnknown.body"), J("confirm.conflictUnknown.warning")],
				okLabel: J("confirm.publishAnyway"),
				cancelLabel: J("confirm.cancel")
			}),
			head: fi
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${fi}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === fi) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? [J("confirm.conflict.truncated")] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await st({
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
	let hi = /* @__PURE__ */ A(null), gi = /* @__PURE__ */ A(""), _i = /* @__PURE__ */ A(!1);
	async function vi() {
		j(gi, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? j(hi, (await e.json()).commits, !0) : e.status === 401 ? (j(hi, [], !0), j(gi, J("status.historyLoginRequired"), !0)) : (j(hi, [], !0), j(gi, ca(await e.json().catch(() => null)) ?? J("status.historyFetchFailed"), !0));
		} catch {
			j(hi, [], !0), j(gi, J("status.historyUnavailable"), !0);
		}
	}
	let bi = (() => {
		let e = {
			dateStyle: "short",
			timeStyle: "short"
		};
		try {
			return new Intl.DateTimeFormat(la(), e);
		} catch {
			return new Intl.DateTimeFormat(void 0, e);
		}
	})(), xi = !1;
	async function Si() {
		let e = L(hi)?.[0];
		if (e && !L(_i) && await st({
			title: J("confirm.revert.title"),
			lines: [`«${e.message}»`, J("confirm.revert.body")],
			okLabel: J("confirm.revert.ok"),
			cancelLabel: J("confirm.cancel")
		})) {
			j(_i, !0), x(J("status.reverting"));
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? fi = e : pi(), xi = !0, x(J("status.revertDone"), "ok"), Ci();
				} else t.status === 409 ? x(J("status.revertConflict"), "error") : x(ca(await t.json().catch(() => null)) ?? J("status.revertFailed"), "error");
			} catch {
				x(J("status.publishLayerUnreachable"), "error");
			}
			j(_i, !1), vi();
		}
	}
	async function Ci() {
		let e = ["/content/site.json", ...L(O).pages.map((e) => `/${e.file}`)], t = async () => {
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
				x(J("status.revertDeployed"), "ok");
				for (let e of Object.keys(localStorage).filter((e) => e.startsWith("urd-draft-"))) localStorage.removeItem(e);
				await new Promise((e) => setTimeout(e, 800)), location.reload();
				return;
			}
		}
		x(J("status.revertDeployTimeout"), "error");
	}
	let wi = 0;
	async function Ti(e) {
		let t = ++wi, n = b, r = await tv(ev(e));
		t === wi && n === b && (r ? x(J("status.publishLive"), "ok") : x(J("status.publishDeployTimeout"), "error"));
	}
	let Ei = /* @__PURE__ */ A(null), Di = /* @__PURE__ */ A(null), ki = /* @__PURE__ */ A(!1), Ai = /* @__PURE__ */ A(cn(/* @__PURE__ */ new Set()));
	async function ji() {
		j(ki, !0), j(Di, null), j(Ei, null);
		try {
			let e = await fetch("/api/github/update"), t = await e.json().catch(() => null);
			e.ok ? (j(Ei, t, !0), j(Ai, /* @__PURE__ */ new Set(), !0)) : j(Di, ca(t) ?? J("update.checkFailed"), !0);
		} catch {
			j(Di, J("status.publishLayerUnreachable"), !0);
		}
		j(ki, !1);
	}
	function Mi(e) {
		let t = new Set(L(Ai));
		t.has(e) ? t.delete(e) : t.add(e), j(Ai, t, !0);
	}
	async function Pi() {
		if (!L(Ei) || L(Ei).upToDate || L(ki)) return;
		let e = [...L(Ai)], t = L(Ei).changes.filter((e) => !L(Ai).has(e.path)), n = t.filter((e) => e.atom && e.conflict);
		if (await st({
			title: J("confirm.update.title"),
			lines: [J("confirm.update.body", {
				target: L(Ei).target,
				writes: t.filter((e) => e.action === "write").length,
				deletes: t.filter((e) => e.action === "delete").length
			}), ...n.length > 0 ? [J("confirm.update.warnEdited", { paths: n.map((e) => e.path).join(", ") })] : []],
			okLabel: J("confirm.update.ok"),
			cancelLabel: J("confirm.cancel")
		})) {
			j(ki, !0), x(J("update.running", { target: L(Ei).target }));
			try {
				let t = await fetch("/api/github/update", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						to: L(Ei).target,
						expect: L(Ei).head,
						skip: e
					})
				}), n = await t.json().catch(() => null);
				t.ok ? (x(J("update.committed", { target: L(Ei).target }), "ok"), await Fi(L(Ei).target.replace(/^v/, ""))) : t.status === 409 ? (x(ca(n) ?? J("update.checkFailed"), "error"), await ji()) : x(ca(n) ?? J("update.failed"), "error");
			} catch {
				x(J("status.publishLayerUnreachable"), "error");
			}
			j(ki, !1);
		}
	}
	async function Fi(e) {
		for (let t = 0; t < 18; t++) {
			await new Promise((e) => setTimeout(e, 1e4));
			try {
				if ((await (await fetch("/urd.json", { cache: "no-store" })).json())?.engine === e) {
					x(J("update.deployed"), "ok"), await new Promise((e) => setTimeout(e, 800)), location.reload();
					return;
				}
			} catch {}
		}
		x(J("update.deployTimeout"), "error");
	}
	let Ii = null;
	function Ri(e) {
		return {
			schemaVersion: 7,
			meta: {
				id: e.id,
				title: e.title
			},
			sections: [{
				id: um("sec"),
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
	async function zi(e, { keepHistory: t = !1 } = {}) {
		j(g, e, !0), Ii = (async () => {
			let n = Be(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = $m(await e.json(), Fe.data));
			} catch {}
			r ? ze.delete(e) : r = Ri(n), D = ga(`urd-draft-${e}`, () => r, S), (D.data.schemaVersion ?? 1) > 7 && (console.warn(`Urd: the draft for '${e}' has schemaVersion ${D.data.schemaVersion} (the engine has 7) and is discarded`), D.replace(structuredClone(r))), D.replace($m(D.data, Fe.data)), D.save(), t || (We = null), j(An, null), j(jn, null), Ve(), _a(), Ae(), j(v, "");
		})(), await Ii;
	}
	function Bi() {
		Ie?.destroy(), L(w)?.contentDocument?.addEventListener("pointerdown", () => {
			L(Vt) && j(Vt, null);
		}, !0), Ie = Fa(L(w), {
			onEdit: Is,
			onMove: Ls,
			onGrow: Rs,
			onDelete: tc,
			onAddSection: Ys,
			onMoveSection: Xs,
			onDeleteSection: Qs,
			onSectionSize: $s,
			onUndo: (e) => e.redo ? nt() : Qe(),
			onSelectSection: Wn,
			onSelectBlock: Bt,
			onBlockMenu: Kt,
			onReady: Vi,
			onNavigate: ta,
			onAddBlock: (e) => ac(e.sectionId, e.block),
			onAddBlocks: (e) => oc(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: hc,
			onMoveBlockSection: ec,
			onMobileReset: Hs,
			onMobileOrder: Us,
			onReviewDone: qs,
			onBlockFlag: Js,
			onCollectionEdit: To,
			onCollectionAdd: So,
			onSaveTemplate: po,
			onStickyGroup: ho,
			onStickyDock: mo,
			onDeleteTemplate: _o,
			onApplyLayout: Me,
			onPluginBlocks: (e) => {
				j(uc, e.blocks ?? [], !0);
			},
			onNavWidth: (e) => na("edit:nav-width", () => {
				L(O).nav.style ??= {}, L(O).nav.style.width = e.width;
			})
		});
	}
	async function Vi() {
		await Ii, await Uo, Ie?.sendPlugins(Ke(L(Wo))?.enabled ?? []), Ie?.sendViewport(L(pe)), Ie?.sendZoom(L(Se)), bo(), fo(), Fe.hasDraft() && Re();
		let e = !L(m).pages.some((e) => e.id === L(g));
		(D.hasDraft() || e) && Ie?.sendPage(L(g), D.data), L(te) || Ie?.sendChrome(!1), L($i) && Ie?.sendShowGrid(!0), L(Hi) && Ie?.sendShowGuides(!0), d();
	}
	let Hi = /* @__PURE__ */ A(localStorage.getItem("urd-guides") === "1"), Wi = /* @__PURE__ */ A(!1), Gi = /* @__PURE__ */ A(cn(localStorage.getItem("urd-layout-picker") === "menu" ? "menu" : "strip"));
	function Ki(e) {
		j(Gi, e === "menu" ? "menu" : "strip", !0), L(Gi) === "menu" ? localStorage.setItem("urd-layout-picker", "menu") : localStorage.removeItem("urd-layout-picker");
	}
	let qi = /* @__PURE__ */ A(null);
	On(() => {
		if (!L(Wi)) return;
		let e = (e) => {
			L(qi)?.contains(e.target) || j(Wi, !1);
		}, t = (e) => {
			e.key === "Escape" && j(Wi, !1);
		}, n = () => {
			j(Wi, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let Ji = {
		view: 1079,
		device: 999,
		zoom: 919
	}, Yi = /* @__PURE__ */ A(null), Xi = /* @__PURE__ */ A(null), Zi = cn({
		view: !1,
		device: !1,
		zoom: !1
	});
	On(() => {
		let e = Object.entries(Ji).map(([e, t]) => {
			let n = window.matchMedia(`(max-width: ${t}px)`), r = () => {
				Zi[e] = n.matches;
			};
			return r(), n.addEventListener("change", r), () => n.removeEventListener("change", r);
		});
		return () => e.forEach((e) => e());
	}), On(() => {
		L(Yi) && !Zi[L(Yi)] && j(Yi, null);
	}), On(() => {
		if (!L(Yi)) return;
		let e = (e) => {
			L(Xi)?.contains(e.target) || j(Yi, null);
		}, t = (e) => {
			e.key === "Escape" && j(Yi, null);
		}, n = () => {
			j(Yi, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	function Qi() {
		j(Hi, !L(Hi)), localStorage.setItem("urd-guides", L(Hi) ? "1" : "0"), Ie?.sendShowGuides(L(Hi));
	}
	let $i = /* @__PURE__ */ A(localStorage.getItem("urd-grid-overlay") === "1");
	function ea() {
		j($i, !L($i)), localStorage.setItem("urd-grid-overlay", L($i) ? "1" : "0"), Ie?.sendShowGrid(L($i));
	}
	function ta(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = L(O).pages.find((e) => e.path === t);
		n && n.id !== L(g) && zi(n.id);
	}
	function na(e, t) {
		qe(e), t(), Fe.save(), Ve(), Re();
	}
	let ra = /* @__PURE__ */ A(""), ia = /* @__PURE__ */ A(null), aa = /* @__PURE__ */ A(null);
	On(() => {
		if (!L(aa)) return;
		let e = (e) => {
			e.target.closest?.(".page-menu-wrap") || j(aa, null);
		}, t = (e) => {
			e.key === "Escape" && j(aa, null);
		}, n = () => {
			j(aa, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let oa = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions",
		"readme"
	];
	function ua(e, t = null) {
		return e ? oa.includes(e) ? J("error.reservedName", { slug: e }) : L(O).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? J("error.pageExists") : null : J("error.pageNeedsName");
	}
	function da() {
		let e = L(ra).trim(), t = Vl(e), n = ua(t);
		if (n) return x(n, "error"), !1;
		let r = L(ia) && !L(ia).startsWith("preset:") ? oo[L(ia)]?.data?.page : null, i = L(ia)?.startsWith("preset:") ? nh(L(ia).slice(7), {
			pageId: t,
			title: e
		}) ?? Ri({
			id: t,
			title: e
		}) : r ? Wv($m(JSON.parse(JSON.stringify(r)), Fe.data), um, {
			id: t,
			title: e
		}) : Ri({
			id: t,
			title: e
		});
		na("pages", () => {
			L(O).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), L(O).nav.items.push({
				label: e,
				page: t
			});
		}), C(`urd-draft-${t}`, JSON.stringify(i)), Ve(), j(ra, ""), j(ia, null), zi(t);
	}
	async function fa(e) {
		j(aa, null), await go("page", e.id === L(g) ? JSON.parse(JSON.stringify(D.data)) : await Ca(e));
	}
	function pa(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		na("pages", () => {
			e.title = n;
			for (let t of L(O).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === L(g) ? (D.data.meta.title = n, D.save(), Ve(), Ie?.sendPage(L(g), D.data)) : wa(e, (e) => {
			e.meta.title = n;
		});
	}
	let ma = /* @__PURE__ */ A(cn({
		description: "",
		ogTitle: "",
		ogDescription: "",
		ogImage: ""
	}));
	function _a() {
		let e = D?.data?.meta ?? {};
		j(ma, {
			description: e.description ?? "",
			ogTitle: e.og?.title ?? "",
			ogDescription: e.og?.description ?? "",
			ogImage: e.og?.image ?? ""
		}, !0);
	}
	function va(e, t) {
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
		D.save(), Ve(), _a();
		let r = L(O).pages.find((e) => e.id === L(g));
		L(ba)[L(g)] = !r?.noindex && !D.data.meta.description;
	}
	function ya(e) {
		let t = L(O).pages.find((e) => e.id === L(g));
		t && (na("edit:page-noindex", () => {
			e ? t.noindex = !0 : delete t.noindex;
		}), L(ba)[L(g)] = !e && !D?.data?.meta?.description);
	}
	let ba = /* @__PURE__ */ A(cn({}));
	async function xa() {
		let e = {};
		for (let t of L(O).pages) {
			if (t.noindex) continue;
			if (t.id === L(g)) {
				e[t.id] = !D?.data?.meta?.description;
				continue;
			}
			let n = await Ca(t);
			e[t.id] = !n?.meta?.description;
		}
		j(ba, e, !0);
	}
	On(() => {
		L(Ct) === "pages" && L(g) && xa();
	});
	async function Sa(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			va("ogImage", (await _r(t)).dataUrl);
		} catch (e) {
			x(vr(e), "error");
		}
	}
	async function Ca(e) {
		let t = localStorage.getItem(`urd-draft-${e.id}`);
		if (t) try {
			return JSON.parse(t);
		} catch {}
		try {
			let t = await fetch(`/${e.file}`);
			if (t.ok) return $m(await t.json(), Fe.data);
		} catch {}
		return Ri(e);
	}
	async function wa(e, t) {
		let n = await Ca(e);
		t(n), C(`urd-draft-${e.id}`, JSON.stringify(n)), Ve();
	}
	function Ta(e, t) {
		let n = Vl(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = ua(n, e.id);
		if (r) {
			x(r, "error");
			return;
		}
		na("pages", () => {
			e.path = `/${n}`;
		});
	}
	function Ea(e) {
		e.path !== "/" && (na("pages", () => {
			L(O).pages = L(O).pages.filter((t) => t.id !== e.id), L(O).nav.items = L(O).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of L(O).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			L(O).nav.items = L(O).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === L(g) && zi(L(O).pages[0].id), x(J("status.pageRemoved")));
	}
	let Da = /* @__PURE__ */ A(null);
	function Oa(e) {
		na("edit:site-icon", () => {
			L(O).site.icon = e;
		}), j(Da, null);
	}
	function ka(e) {
		let t = String(e ?? "").trim();
		na("edit:site-analytics", () => {
			t ? L(O).analytics = { token: t } : delete L(O).analytics;
		});
	}
	let Aa = /* @__PURE__ */ k(() => L(O)?.layout?.contentWidth ?? 1440), ja = /* @__PURE__ */ k(() => L(O)?.layout?.gutter ?? 6);
	function Ma() {
		let e = L(O).site.lang ?? "no";
		return e === "no" ? "nb" : e;
	}
	function Na() {
		let e = Ma(), t = kt([...Ot, ...Mt()]);
		return [...t.some(([t]) => t === e) ? [] : [[e, e]], ...t];
	}
	let Ia = /* @__PURE__ */ A(!1), Ra = /* @__PURE__ */ A(null), za = /* @__PURE__ */ A(null);
	On(() => {
		let e = L(za);
		e && (j(za, null), xr().then(() => document.querySelector(`[data-cal-name="${e}"]`)?.focus()));
	});
	let Ba = () => L(O)?.site?.calendars ?? [], Va = (e) => Ba().find((t) => t.id === e) ?? null;
	function Ha(e = {}) {
		let t = {
			id: um("cal"),
			url: "",
			...e
		};
		return na("site", () => {
			(L(O).site.calendars ??= []).unshift(t);
		}), j(Ra, t.id, !0), j(za, t.id, !0), j(Ia, !0), t.id;
	}
	let Ua = /* @__PURE__ */ A(!1), Wa = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	On(() => {
		if (!L(O)?.site) return;
		let e = L(O).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 49.6V14.4l25.6 10.4V49.6' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
				return;
			}
			Wa.test(e) && (t.href = e);
		}
	});
	let Ga = (e) => (e.version ?? 1) < Mb.version ? Mb.migrations[1](e.props ?? {}) : e.props ?? {}, Ka = null, qa = {}, Ja = {}, Ya = !1, Xa = /* @__PURE__ */ A(cn([])), Za = /* @__PURE__ */ A(cn({})), Qa = /* @__PURE__ */ A(null), $a = /* @__PURE__ */ A(""), eo = /* @__PURE__ */ A("news"), no = [
		["news", J("collectionKind.news")],
		["notices", J("collectionKind.notices")],
		["publications", J("collectionKind.publications")],
		["products", J("collectionKind.products")],
		["custom", J("collectionKind.custom")]
	], ao = null, oo = {}, so = {}, co = !1, lo = /* @__PURE__ */ A(cn([]));
	async function uo() {
		let e = {
			version: 1,
			maler: []
		};
		try {
			e = await (await fetch("/content/maler.json")).json();
		} catch {}
		ao = ga("urd-draft-templates", () => e, S, "urd-draft-maler"), j(lo, [...ao.data.maler ?? []], !0);
		for (let e of L(lo)) {
			let t = null;
			try {
				t = await (await fetch(`/content/maler/${e}.json`)).json();
			} catch {}
			so[e] = t, oo[e] = ga(`urd-draft-template-${e}`, () => t, S, `urd-draft-mal-${e}`), (oo[e].data?.schemaVersion ?? 1) > 1 && oo[e].reset();
		}
		co = !0, fo();
	}
	function fo() {
		let e = L(lo).map((e) => oo[e]?.data ? {
			id: e,
			...JSON.parse(JSON.stringify(oo[e].data))
		} : null).filter(Boolean).map(({ id: e, mal: t, section: n, blocks: r, page: i }) => ({
			id: e,
			name: t.name,
			kind: t.kind,
			section: n,
			blocks: r,
			page: i
		}));
		Ie?.sendTemplates(e);
	}
	function po(e) {
		let t = Hv.includes(e.kind) ? e.kind : "section";
		return go(t, e[t]);
	}
	function mo(e) {
		let { section: t, block: n } = Rt(e.sectionId, e.blockId);
		t && n?.sticky && Co.some(([t]) => t === e.dock) && (qe(`sticky-dock:${e.blockId}`), n.sticky = {
			...n.sticky,
			dock: e.dock
		}, D.save(), Ve(), Ie?.sendSection(L(g), t), zt());
	}
	function ho(e) {
		let t = e.blockIds ?? [], { section: n } = Rt(e.sectionId, t[0]);
		if (!n || !t.length) return;
		qe(`sticky-group:${e.sectionId}`);
		let r = e.on ? um("stk") : null;
		for (let e of n.blocks) t.includes(e.id) && (e.sticky = r ? {
			offset: 16,
			until: null,
			...e.sticky,
			group: r
		} : null);
		Pe(n, "block-edited"), D.save(), Ve(), Ie?.sendSection(L(g), n), zt(), x(J(e.on ? "status.stickyGrouped" : "status.stickyUngrouped"));
	}
	async function go(e, t) {
		if (!t || !ao) return;
		let n = (await ct({
			title: J("canvas.templateNamePrompt"),
			placeholder: J("ph.templateName")
		}))?.trim();
		if (!n) return;
		let r = Uv(n);
		if (!r) {
			x(J("status.invalidName"), "error");
			return;
		}
		if (L(lo).includes(r)) {
			x(J("status.templateExists"), "error");
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
		oo[r] = ga(`urd-draft-template-${r}`, () => null, S, `urd-draft-mal-${r}`), oo[r].replace(i), oo[r].save(), ao.data.maler = [...L(lo), r], ao.save(), j(lo, [...L(lo), r], !0), x(J("status.templateSaved", { name: n }), "ok"), Ve(), fo();
	}
	async function _o(e) {
		let t = oo[e.id]?.data?.mal;
		t && await st({ title: J("confirm.deleteTemplate", { name: t.name }) }) && (qe("templates"), L(ia) === e.id && j(ia, null), localStorage.removeItem(`urd-draft-template-${e.id}`), localStorage.removeItem(`urd-draft-mal-${e.id}`), delete oo[e.id], ao.data.maler = L(lo).filter((t) => t !== e.id), ao.save(), j(lo, L(lo).filter((t) => t !== e.id), !0), Ve(), fo());
	}
	async function vo() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/collections.json")).json();
		} catch {}
		Ka = ga("urd-draft-collections", () => e, S, "urd-draft-samlinger"), j(Xa, [...Ka.data.samlinger ?? []], !0);
		for (let e of L(Xa)) {
			let t = null;
			try {
				t = await (await fetch(`/content/samlinger/${e}.json`)).json();
			} catch {}
			Ja[e] = t, qa[e] = ga(`urd-draft-collection-${e}`, () => t, S, `urd-draft-samling-${e}`), !t && !qa[e].data && (qa[e].replace({
				schemaVersion: 1,
				id: e,
				name: e,
				kind: "custom",
				entries: []
			}), qa[e].save());
		}
		Ya = !0, yo();
	}
	function yo(e = !0) {
		let t = {};
		for (let e of L(Xa)) qa[e] && (t[e] = JSON.parse(JSON.stringify(qa[e].data)));
		j(Za, t, !0), e && bo();
	}
	function bo() {
		Ie?.sendCollections(Ke(L(Za)) ?? {});
	}
	function xo(e, t, n, r = !0) {
		let i = qa[e];
		i && (qe(t), n(i.data), i.save(), Ve(), yo(r));
	}
	function So(e) {
		qa[e.collection] && Ao(e.collection);
	}
	function wo(e) {
		return (new DOMParser().parseFromString(String(e ?? ""), "text/html").body.textContent ?? "").trim();
	}
	function To(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r !== "title" || wo(i)) && xo(t, `edit:collection:${t}:${n}:${r}`, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image");
	}
	function Eo(e, t, n) {
		let r = {
			schemaVersion: 1,
			id: e,
			name: t,
			kind: n,
			entries: []
		};
		qa[e] = ga(`urd-draft-collection-${e}`, () => null, S, `urd-draft-samling-${e}`), qa[e].replace(r), qa[e].save(), Ka.data.samlinger = [...L(Xa), e], Ka.save(), j(Xa, [...L(Xa), e], !0), j(Qa, e, !0), Ve(), yo();
	}
	function Do() {
		let e = L($a).trim();
		if (!e) return;
		let t = Vl(e);
		if (!t || L(Xa).includes(t)) {
			x(J(t ? "status.collectionExists" : "status.invalidName"), "error");
			return;
		}
		qe("collections"), Eo(t, e, L(eo)), j($a, "");
	}
	function Oo() {
		let e = J("seed.productCatalogName"), t = Vl(e) || "collection", n = t;
		for (let e = 2; L(Xa).includes(n); e += 1) n = `${t}-${e}`;
		qe("collections"), Eo(n, e, "products"), qt(null, (e) => {
			e.props.collection = n;
		});
	}
	function ko(e) {
		qe("collections"), localStorage.removeItem(`urd-draft-collection-${e}`), localStorage.removeItem(`urd-draft-samling-${e}`), delete qa[e], Ka.data.samlinger = L(Xa).filter((t) => t !== e), Ka.save(), j(Xa, L(Xa).filter((t) => t !== e), !0), L(Qa) === e && j(Qa, null), Ve(), yo();
	}
	function Ao(e) {
		xo(e, `collection:${e}:add-entry`, (e) => {
			e.kind === "products" ? e.entries.push({
				id: um("entry"),
				title: J("seed.newProduct"),
				text: ""
			}) : e.entries.unshift({
				id: um("entry"),
				title: J("seed.newEntry"),
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function jo(e, t, n, r) {
		xo(e, `edit:collection:${e}:${t}:${n}`, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function Mo(e, t, n) {
		xo(e, `collection:${e}:move-entry`, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function No(e, t) {
		xo(e, `collection:${e}:remove-entry`, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function Po(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && jo(e, t, "image", (await _r(r)).dataUrl);
	}
	function Fo(e, t, n) {
		let r = n.split(",").map((e) => e.trim()).filter(Boolean);
		jo(e, t, "sizes", r.length ? r : "");
	}
	function Io(e, t) {
		xo(e, `collection:${e}:${t}:colors`, (e) => {
			let n = e.entries.find((e) => e.id === t);
			n && (n.colors = [...n.colors ?? [], { name: J("ph.colorName") }]);
		});
	}
	function Lo(e, t, n, r, i) {
		xo(e, `edit:collection:${e}:${t}:color:${n}:${r}`, (e) => {
			let a = e.entries.find((e) => e.id === t)?.colors?.[n];
			a && (r === "image" && !i ? delete a.image : i && (a[r] = i));
		});
	}
	async function Ro(e, t, n, r) {
		let i = r.target.files?.[0];
		r.target.value = "", i && Lo(e, t, n, "image", (await _r(i)).dataUrl);
	}
	function zo(e, t, n) {
		xo(e, `collection:${e}:${t}:colors`, (e) => {
			let r = e.entries.find((e) => e.id === t);
			r?.colors && (r.colors = r.colors.filter((e, t) => t !== n), r.colors.length || delete r.colors);
		});
	}
	function Bo(e) {
		let t = qa[e]?.data;
		if (!t) return;
		let n = URL.createObjectURL(new Blob([Jv(t.entries)], { type: "text/csv" })), r = document.createElement("a");
		r.href = n, r.download = `${e}.csv`, r.click(), URL.revokeObjectURL(n);
	}
	async function Vo(e, t) {
		let n = t.target.files?.[0];
		if (t.target.value = "", !n) return;
		let r = Zv(await n.text());
		if (!r) {
			x(J("status.csvInvalid"), "error");
			return;
		}
		let i = /* @__PURE__ */ new Set();
		for (let e of r.entries) (!/^[a-z0-9][a-z0-9-]*$/.test(e.id) || i.has(e.id)) && (e.id = um("entry")), i.add(e.id);
		xo(e, `collection:${e}:import`, (e) => {
			e.entries = r.entries;
		}), x(J("status.csvImported", { count: String(r.entries.length) }), "ok");
	}
	let Z = null, Ho, Uo = new Promise((e) => {
		Ho = e;
	}), Wo = /* @__PURE__ */ A(null), Go = cn({}), Ko = /* @__PURE__ */ A("0.0.0"), qo = /* @__PURE__ */ A(""), Jo = /* @__PURE__ */ A(""), Yo = /* @__PURE__ */ A(cn([])), Xo = /* @__PURE__ */ A(cn([])), Zo = /* @__PURE__ */ A("pending"), Qo = () => [.../* @__PURE__ */ new Set([...L(Wo)?.enabled ?? [], ...L(Wo)?.disabled ?? []])];
	function $o() {
		j(Wo, JSON.parse(JSON.stringify(Z.data)), !0);
	}
	let es = /* @__PURE__ */ A(null);
	async function rs() {
		try {
			let e = (await fetch("/urd.json", { cache: "no-store" })).headers.get("content-security-policy");
			if (!e) {
				j(es, { unknown: !0 }, !0);
				return;
			}
			let t = (t) => new Set((e.split(";").map((e) => e.trim()).find((e) => e.startsWith(`${t} `)) ?? "").split(/\s+/).slice(1));
			j(es, {
				frameSrc: t("frame-src"),
				connectSrc: t("connect-src"),
				scriptSrc: t("script-src")
			}, !0);
		} catch {
			j(es, { unknown: !0 }, !0);
		}
	}
	function as(e) {
		let t = [
			...(e.scriptSrc ?? []).map((e) => ["script-src", e]),
			...(e.connectSrc ?? []).map((e) => ["connect-src", e]),
			...(e.frameSrc ?? []).map((e) => ["frame-src", e])
		];
		if (!L(es) || L(es).unknown) return [];
		let n = {
			"script-src": L(es).scriptSrc,
			"connect-src": L(es).connectSrc,
			"frame-src": L(es).frameSrc
		};
		return t.filter(([e, t]) => !n[e]?.has(t)).map(([e, t]) => `${e} ${t}`);
	}
	async function os() {
		rs();
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		j(Xo, e.enabled ?? [], !0), Z = ga("urd-draft-plugins", () => e, S), $o();
		try {
			j(Ko, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of Qo()) ls(e);
		ss(), Ho(), Ie?.sendPlugins(Ke(L(Wo))?.enabled ?? []);
	}
	async function ss() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				cs();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), j(Yo, (t ?? []).filter((e) => !Qo().includes(e)), !0);
			for (let e of L(Yo)) ls(e);
			j(Zo, "ok");
		} catch {
			cs();
		}
	}
	function cs() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				j(Yo, e.filter((e) => !Qo().includes(e)), !0);
				for (let e of L(Yo)) ls(e);
				j(Zo, "ok");
				return;
			}
		} catch {}
		j(Zo, "unavailable");
	}
	async function ls(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = Vv(t);
			Go[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && zv(L(Ko), t.requiresEngine)
			};
		} catch {
			Go[e] = {
				name: e,
				errors: [J("plugin.manifestNotFound", { id: e })],
				satisfied: !1
			};
		}
	}
	function us(e, t) {
		qe("plugins");
		let n = Z.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), Z.save(), Ve(), $o(), ds();
	}
	function ds() {
		L(w) && (L(w).src = L(w).src);
	}
	function fs(e) {
		qe("plugins");
		let t = Z.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), Z.save(), Ve(), $o(), ds();
	}
	async function ps() {
		j(Jo, "");
		let e = L(qo).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			j(Jo, J("plugin.invalidId"), !0);
			return;
		}
		if (Qo().includes(e)) {
			j(Jo, J("plugin.alreadyListed"), !0);
			return;
		}
		if (await ls(e), Go[e].errors.length) {
			j(Jo, J("plugin.invalidManifest", { errors: Go[e].errors.join("; ") }), !0);
			return;
		}
		us(e, !0), j(qo, "");
	}
	function ms(e) {
		j(Yo, L(Yo).filter((t) => t !== e), !0), us(e, !0);
	}
	function ys(e, t) {
		na(e, () => {
			L(O).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(L(O).footer);
		});
	}
	let bs = /* @__PURE__ */ A(null), xs = /* @__PURE__ */ A(!1), Ss = /* @__PURE__ */ A(!1), Cs = (e) => e.length > 0 && [...e].every((e) => e.open);
	function ws() {
		let e = L(bs)?.querySelectorAll("details.group") ?? [];
		j(xs, e.length > 0), j(Ss, Cs(e), !0);
	}
	On(() => {
		L(Ct), xr().then(ws);
	});
	function Ts() {
		let e = !L(Ss);
		L(bs)?.querySelectorAll("details.group").forEach((t) => {
			t.open = e;
		}), ws();
	}
	function Es(e) {
		for (let t of e.querySelectorAll("details.group")) {
			let e = t.querySelector(":scope > summary");
			if (!e || e.querySelector(".fold-sub")) continue;
			let n = () => t.querySelectorAll(":scope > .group-items details.group");
			if (!n().length) continue;
			let r = document.createElement("button");
			r.type = "button", r.className = "fold-sub fold-toggle", r.innerHTML = X.foldToggle;
			let i = () => {
				let e = Cs(n());
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
	On(() => {
		let e = L(bs);
		if (!e) return;
		let t = new MutationObserver(() => {
			Es(e), ws();
		});
		return t.observe(e, {
			childList: !0,
			subtree: !0
		}), e.addEventListener("toggle", ws, !0), Es(e), () => {
			t.disconnect(), e.removeEventListener("toggle", ws, !0);
		};
	});
	function Ds(e) {
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
	function Os() {
		return Object.fromEntries(Object.entries(L(O).theme.tokens.color).map(([e, t]) => [e, Ds(t)]));
	}
	let ks = (e, t) => e && t && t[e] ? t[e] : e, As = [
		"bg",
		"surface",
		"text",
		"accent",
		"accent-text"
	], js = [
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
	function Ms(e) {
		na("theme", () => {
			let t = e.scheme === "dark", n = t ? e.dark : e.light, r = t ? e.light : e.dark;
			for (let e of As) L(O).theme.tokens.color[e] = n[e];
			t ? L(O).theme.scheme = "dark" : delete L(O).theme.scheme, L(O).theme.alt = { tokens: { color: { ...r } } };
		});
	}
	let Ns = /* @__PURE__ */ k(() => {
		if (!L(O)) return null;
		let e = L(O).theme.tokens.color, t = L(O).theme.alt?.tokens?.color ?? {}, n = L(O).theme.scheme === "dark";
		return js.find((r) => {
			let i = n ? r.dark : r.light, a = n ? r.light : r.dark;
			return As.every((n) => e[n] === i[n] && t[n] === a[n]);
		})?.id ?? null;
	}), Ps = 0;
	async function Fs() {
		L(te) && (Ps = L(bs)?.scrollTop ?? 0), j(te, !L(te)), Ie?.sendChrome(L(te)), L(te) || j(Vt, null), L(te) && (await xr(), requestAnimationFrame(() => {
			L(bs) && (L(bs).scrollTop = Ps);
		}));
	}
	function Is(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (qe(`edit:${e.blockId}`), n.props = e.props, D.save(), Ve(), L(Lt)?.blockId === e.blockId && zt(), e.rerender && Ie?.sendSection(L(g), t), j(v, ""), nn(t.id, n));
	}
	function Ls(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		qe(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop", i = n.frames.desktop?.w;
		n.frames[r] = e.frame, r === "desktop" && Pe(t, "desktop-changed-after-mobile"), D.save(), Ve(), L(Lt)?.blockId === e.blockId && zt(), r === "desktop" && e.frame?.w !== i ? nn(t.id, n) : r === "mobile" && sn(t.id, n);
	}
	function Rs(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (n?.frames?.desktop && n.frames.desktop.h !== e.h) {
			if (e.fit) {
				L(pe) === "desktop" && e.seq === en.get(e.blockId) && zs(t, n, e.h);
				return;
			}
			D.amendBaseline((t) => {
				let n = t.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
				n?.frames?.desktop && (n.frames.desktop.h = e.h);
			}), D.hasDraft() && qe(`edit:${e.blockId}`), n.frames.desktop.h = e.h, D.save(), Ve(), L(Lt)?.blockId === e.blockId && zt();
		}
	}
	function zs(e, t, n) {
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
		Pe(e, "block-edited"), D.save(), Ve(), L(Lt)?.blockId === t.id && zt(), Ie?.sendFrames(e.id, Ke(i));
	}
	function Hs(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			if (qe("mobile-reset"), e.blockId) {
				let n = t.blocks.find((t) => t.id === e.blockId);
				n && (n.frames.mobile = null);
			} else for (let e of t.blocks) e.frames.mobile = null;
			!Ne(t) && t.responsive?.mobile && (t.responsive.mobile.attention = null), D.save(), Ve(), Ae(), Ie?.sendSection(L(g), t);
		}
	}
	function Us(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && typeof e.mobileOrder == "number" && (qe("mobile-order"), n.mobileOrder = e.mobileOrder, D.save(), Ve(), Ie?.sendSection(L(g), t));
	}
	function qs(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (qe("review-done"), t.responsive.mobile.attention = null, D.save(), Ve(), Ae());
	}
	function Js(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (qe("block-flag"), typeof e.decor == "boolean" && (n.decor = e.decor), typeof e.hideMobile == "boolean" && (n.hideMobile = e.hideMobile), D.save(), Ve(), typeof e.hideMobile == "boolean" && L(pe) === "mobile" && Ie?.sendSection(L(g), t), L(Lt)?.blockId === e.blockId && zt());
	}
	function Ys(e) {
		qe("add-section"), e.section.id || (e.section.id = um("sec")), D.data.sections.splice(e.index, 0, e.section), D.save(), Ve(), Ie?.sendPage(L(g), D.data), j(An, e.section.id, !0), Rn(e.section), j(Ct, "properties");
	}
	function Xs(e) {
		let t = D.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (qe("move-section"), [t[n], t[r]] = [t[r], t[n]], D.save(), Ve(), Ie?.sendPage(L(g), D.data));
	}
	function Qs(e) {
		qe("delete-section"), e.sectionId === L(An) && (j(An, null), j(jn, null)), L(Lt)?.sectionId === e.sectionId && j(Lt, null), D.data.sections = D.data.sections.filter((t) => t.id !== e.sectionId), D.save(), Ve(), Ie?.sendPage(L(g), D.data);
	}
	function $s(e) {
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
			e.moves?.length && (Pe(t, "section-height"), L(Lt)?.sectionId === e.sectionId && zt()), e.sectionId === L(An) && j(Mn, e.minHeight, !0), D.save(), Ve();
		}
	}
	function ec(e) {
		let t = D.data.sections.find((t) => t.id === e.fromSectionId), n = D.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		t && n && r && (qe(e.groupKey ? `edit:${e.groupKey}` : "move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), Pe(t, "block-moved"), Pe(n, "block-moved"), D.save(), Ve(), Ae(), Ie?.sendSection(L(g), t), Ie?.sendSection(L(g), n), L(Lt)?.blockId === e.blockId && (j(Lt, {
			...L(Lt),
			sectionId: e.toSectionId
		}, !0), zt()));
	}
	function tc(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		if (!t) return;
		let n = e.blockIds ?? [e.blockId];
		qe("delete-block"), t.blocks = t.blocks.filter((e) => !n.includes(e.id)), n.includes(L(Lt)?.blockId) && j(Lt, null), Pe(t, "block-deleted"), D.save(), Ve(), Ie?.sendSection(L(g), t);
	}
	let nc = {
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
				fields: lm()
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
	function rc(e) {
		let t = nc[e];
		return t ? {
			id: um("blk"),
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
	function ic(e) {
		Ie ? Ie.sendPlaceBlock(e) : ac(si()?.id, e);
	}
	function ac(e, t) {
		let n = D.data.sections.find((t) => t.id === e) ?? D.data.sections[0];
		if (!n) return;
		qe("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), Pe(n, "block-added"), D.save(), Ve(), Ie?.sendSection(L(g), n), nn(n.id, t);
	}
	function oc(e, t, n, r) {
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
		}), Pe(i, "block-added"), D.save(), Ve(), Ie?.sendSection(L(g), i);
	}
	function sc(e) {
		ic(rc(e));
	}
	let cc = {
		list: "calendar",
		cards: "calendar-cards",
		month: "calendar-month",
		next: "calendar-next",
		agenda: "calendar-agenda",
		week: "calendar-month",
		day: "calendar",
		year: "calendar-month"
	};
	function lc(e) {
		let t = ts(e), n = rc(cc[t.view] ?? "calendar");
		n && (n.props = {
			...n.props,
			...t.view ? { view: t.view } : {},
			...t.id === "plain" ? {} : { design: t.id },
			...t.view === "next" ? {
				nextCount: 3,
				laterCount: 3
			} : {}
		}, ic(n));
	}
	let uc = /* @__PURE__ */ A(cn([]));
	function dc(e, t = {}) {
		let n = Ke(e);
		ic({
			id: um("blk"),
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
	let fc = /* @__PURE__ */ A("");
	function pc() {
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
			...is().flatMap((e) => e.designs).filter((e) => e.id !== "plain").map((e) => ({
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
		for (let t of L(lo)) {
			let n = oo[t]?.data?.mal;
			n?.kind === "blocks" && e.push({
				label: n.name,
				act: "template",
				id: t
			});
		}
		for (let t of L(uc)) if (t.variants?.length) for (let n of t.variants) e.push({
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
	function mc(e) {
		e.act === "block" ? sc(e.kind) : e.act === "calendarDesign" ? lc(e.design) : e.act === "plugin" ? dc(e.entry, e.props ?? {}) : e.act === "template" && Ie?.sendInsertTemplate(e.id);
	}
	function hc(e) {
		let t = rc(e.kind);
		if (t) {
			if (e.at && typeof e.at.x == "number" && typeof e.at.y == "number") {
				let n = D.data.sections.find((t) => t.id === e.sectionId)?.grid ?? L(O).grid, r = tx({
					x: e.at.x,
					y: e.at.y,
					w: t.frames.desktop.w,
					h: t.frames.desktop.h,
					grid: n
				});
				t.frames.desktop.x = r.x, t.frames.desktop.y = r.y;
			} else t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40;
			ac(e.sectionId, t), Ie?.sendSelect(t.id), e.kind === "image" && x(J("status.imageBlockAdded")), e.kind === "gallery" && x(J("status.galleryBlockAdded"));
		}
	}
	async function gc(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		x(J("status.compressingImage"));
		let n;
		try {
			n = await _r(t);
		} catch (e) {
			x(vr(e), "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (L(w)?.clientWidth ?? 1280));
		ic({
			id: um("blk"),
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
		}), n.bytes > 4e5 ? x(J("status.imageLarge", { kb: Math.round(n.bytes / 1024) }), "error") : x("");
	}
	async function _c(e) {
		let t = [], n = 0, r = 0;
		for (let i of e) try {
			let e = await _r(i);
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
	function xc(e, t, n) {
		t ? x(J("status.imagesReadFailed", { n: t }), "error") : n ? x(J("status.imagesLarge", { n }), "error") : x(e ? "" : J("status.noImagesAdded"));
	}
	async function Sc(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		x(J("status.compressingImages"));
		let { images: n, failed: r, big: i } = await _c(t);
		n.length && qt("gallery-add", (e) => {
			e.props.images.push(...n);
		}), xc(n.length, r, i);
	}
	async function Cc(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		x(J("status.compressingImages"));
		let { images: n, failed: r, big: i } = await _c(t);
		if (!n.length) {
			xc(0, r, i);
			return;
		}
		let a = rc("gallery");
		a.props.images = n, ic(a), xc(n.length, r, i);
	}
	function Ec(e, t) {
		qt("gallery-move", (n) => {
			let r = e + t;
			r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
		});
	}
	function Dc(e) {
		qt("gallery-remove", (t) => {
			t.props.images.splice(e, 1);
		});
	}
	function kc(e, t, n) {
		qt(`edit:${L(Lt).blockId}:img${e}-${t}`, (r) => {
			r.props.images[e][t] = n;
		});
	}
	function Ac(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/") && !i?.startsWith("data:audio/") && !i?.startsWith("data:video/")) return;
		let a = i.split(",", 2)[1], o = `media/${Vl(n || "image")}-${Hl(a)}.${Bl(i)}`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function jc(e, t) {
		Ac(e, "image", e.title, t);
		for (let n of e.colors ?? []) Ac(n, "image", `${e.title}-${n.name}`, t);
	}
	function Mc(e, t) {
		for (let n of e?.layers ?? []) {
			if (n.type === "image" && Ac(n.props, "src", "background", t), n.type === "slideshow") for (let e of n.props.images ?? []) Ac(e, "src", "background", t);
			n.type === "video" && (Ac(n.props, "src", "video", t), Ac(n.props, "poster", "plakat", t));
		}
	}
	function Pc(e, t) {
		if (e.type === "image" && Ac(e.props, "src", e.props.alt, t), e.type === "icon" && Ac(e.props, "image", "ikon", t), e.type === "gallery") for (let n of e.props.images ?? []) Ac(n, "src", n.alt || "gallery", t);
		e.type === "audio" && Ac(e.props, "src", e.props.title || "lyd", t), e.type === "video" && (Ac(e.props, "src", e.props.title || "video", t), Ac(e.props, "poster", "poster", t));
	}
	function Fc(e, t) {
		Mc(e.background, t);
		for (let n of e.blocks) Pc(n, t);
	}
	function Ic(e) {
		let t = [];
		e.meta?.og && Ac(e.meta.og, "image", "share", t);
		for (let n of e.sections) Fc(n, t);
		return t;
	}
	function Lc(e) {
		let t = [], n = e.nav?.logo;
		if (n?.type === "image" && Ac(n, "value", "logo", t), n?.type === "both" && Ac(n, "image", "logo", t), e.nav?.style && Ac(e.nav.style, "image", "menu", t), Mc(e.nav?.style?.background, t), Mc(e.footer?.background, t), e.footer?.brand && Ac(e.footer.brand, "logo", "footer-logo", t), e.nav?.launcher) {
			Ac(e.nav.launcher, "image", "snarvei", t);
			for (let n of e.nav.launcher.links ?? []) Ac(n, "image", "snarvei", t);
		}
		return Ac(e.site, "icon", "ikon", t), t;
	}
	let Rc = /* @__PURE__ */ A(!1), zc = /* @__PURE__ */ A(null);
	function Bc() {
		j(Rc, !L(Rc));
	}
	function Vc() {
		j(Rc, !1);
		try {
			Hc(), x(J("ui.discarded"), "info");
		} catch (e) {
			console.error("Urd: discard failed", e), x(String(e?.message ?? e), "error");
		}
	}
	On(() => {
		if (!L(Rc)) return;
		let e = (e) => {
			if (!L(zc)?.contains(e.target)) {
				j(Rc, !1);
				return;
			}
			e.target instanceof Element && e.target.closest(".discard-confirm") && (e.preventDefault(), e.stopPropagation(), Vc());
		}, t = (e) => {
			e.key === "Escape" && j(Rc, !1);
		}, n = !1, r = (e) => {
			n = !!L(zc)?.contains(e.target);
		}, i = () => {
			n = !1;
		}, a = () => {
			n || j(Rc, !1);
		};
		return window.addEventListener("pointerdown", r, !0), window.addEventListener("pointerup", i, !0), window.addEventListener("click", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", a), () => {
			window.removeEventListener("pointerdown", r, !0), window.removeEventListener("pointerup", i, !0), window.removeEventListener("click", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", a);
		};
	});
	function Hc() {
		qe("discard");
		for (let e of L(O).pages) e.id !== L(g) && !ze.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = D.reset();
		if (Fe.reset(), Z && (Z.reset(), $o()), Ka) {
			Ka.reset(), j(Xa, [...Ka.data.samlinger ?? []], !0);
			for (let e of Object.keys(qa)) L(Xa).includes(e) ? qa[e].reset() : delete qa[e];
			yo();
		}
		if (ao) {
			ao.reset(), j(lo, [...ao.data.maler ?? []], !0);
			for (let e of Object.keys(oo)) L(lo).includes(e) ? oo[e].reset() : (localStorage.removeItem(`urd-draft-template-${e}`), localStorage.removeItem(`urd-draft-mal-${e}`), delete oo[e]);
			fo();
		}
		Le(), j(ee, {
			snap: !0,
			...L(O).grid
		}, !0), Ve(), j(v, ""), Re(), L(O).pages.some((e) => e.id === L(g)) ? Ie?.sendPage(L(g), e) : zi(L(O).pages[0].id);
	}
	async function Uc() {
		if (xi) {
			x(J("status.revertReloadBeforePublish"), "error");
			return;
		}
		if (L(ki)) {
			x(J("update.publishBlocked"), "error");
			return;
		}
		x(J("status.publishing"));
		let e = [], t = [], n = [], r = [];
		for (let i of L(O).pages) {
			let a = `urd-draft-${i.id}`, o = ze.has(i.id) || !L(m).pages.some((e) => e.id === i.id), s = null;
			if (i.id === L(g) && (D.hasDraft() || o)) s = D.data;
			else if (i.id !== L(g)) {
				let e = localStorage.getItem(a);
				if (e) try {
					s = $m(JSON.parse(e), Fe.data);
				} catch {}
			}
			if (!s && o && (s = Ri(i)), !s) continue;
			let c = JSON.parse(JSON.stringify(s));
			e.push(...Ic(c)), e.push({
				path: i.file,
				content: JSON.stringify(c, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (Fe.hasDraft()) {
			let r = JSON.parse(JSON.stringify(L(O)));
			e.push(...Lc(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), e.push({
				path: "content/theme.css",
				content: sh(r.theme),
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(L(m).theme, L(O).theme) || t.push(J("publish.part.theme")), i(L(m).nav, L(O).nav) || t.push(J("publish.part.nav")), i(L(m).footer, L(O).footer) || t.push(J("publish.part.footer")), i(L(m).pages, L(O).pages) || t.push(J("publish.part.pages")), i(L(m).grid, L(O).grid) || t.push(J("publish.part.grid")), (L(m).site.icon ?? null) !== (L(O).site.icon ?? null) && t.push(J("publish.part.icon"));
			let { icon: a, ...o } = L(m).site, { icon: s, ...c } = L(O).site;
			i(o, c) || t.push(J("publish.part.siteInfo"));
		}
		let i = Object.entries(qa).filter(([, e]) => e.hasDraft());
		if (i.length || Ka?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) jc(t, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), ty.includes(i.kind) && e.push({
					path: `content/samlinger/${t}.xml`,
					content: ny({
						title: i.name ?? t,
						origin: location.origin,
						path: `/content/samlinger/${t}.xml`,
						items: i.entries.map((e) => ({
							id: e.id,
							title: wo(e.title),
							text: wo(e.text),
							date: e.date,
							href: e.href
						}))
					}),
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (Ka?.hasDraft()) {
				e.push({
					path: "content/collections.json",
					content: JSON.stringify(Ka.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-collections", "urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/collections.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!L(Xa).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push(J("publish.part.collections"));
		}
		let a = Object.entries(oo).filter(([, e]) => e.hasDraft());
		if (a.length || ao?.hasDraft()) {
			for (let [t, r] of a) {
				let i = JSON.parse(JSON.stringify(r.data));
				i.section && Fc(i.section, e);
				for (let t of i.blocks ?? []) Pc(t, e);
				for (let t of i.page?.sections ?? []) Fc(t, e);
				e.push({
					path: `content/maler/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-mal-${t}`);
			}
			if (ao?.hasDraft()) {
				e.push({
					path: "content/maler.json",
					content: JSON.stringify(ao.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-templates", "urd-draft-maler");
				let t = { maler: [] };
				try {
					t = await (await fetch("/content/maler.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.maler ?? []) {
					let t = `content/maler/${n}.json`;
					!L(lo).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push(J("publish.part.templates"));
		}
		Z?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(Z.data, null, 2) + "\n",
			encoding: "utf-8"
		}), n.push("urd-draft-plugins"), t.push(J("publish.part.plugins")));
		try {
			let t = await (await fetch("/index.html")).text();
			for (let n of L(O).pages) n.path !== "/" && e.push({
				path: `${n.path.slice(1)}/index.html`,
				content: t,
				encoding: "utf-8"
			});
		} catch {}
		e.push({
			path: "sitemap.xml",
			content: $v(L(O).pages, location.origin),
			encoding: "utf-8"
		}), e.push({
			path: "robots.txt",
			content: ey(location.origin),
			encoding: "utf-8"
		});
		let o = new Set(e.map((e) => e.path)), s = (t) => {
			o.has(t) || e.push({
				path: t,
				delete: !0
			});
		};
		for (let e of L(m).pages) {
			let t = L(O).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && s(`${e.path.slice(1)}/index.html`) : (s(e.file), e.path !== "/" && s(`${e.path.slice(1)}/index.html`));
		}
		let c = await mi(e);
		if (!c.ok) {
			x(J("status.publishAborted"), "error");
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
			t ? fi = t : pi(), Ic(D.data), Lc(L(O));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) ze.add(e);
			if (j(m, JSON.parse(JSON.stringify(L(O))), !0), Fe = ga("urd-draft-site", () => L(m), S), Le(), Z) {
				let e = JSON.parse(JSON.stringify(Z.data));
				Z = ga("urd-draft-plugins", () => e, S), $o();
			}
			if (Ka) {
				for (let e of Object.values(qa)) for (let t of e.data.entries) jc(t, []);
				let e = JSON.parse(JSON.stringify(Ka.data));
				Ka = ga("urd-draft-collections", () => e, S, "urd-draft-samlinger"), Ja = {};
				for (let e of L(Xa)) {
					if (!qa[e]) continue;
					let t = JSON.parse(JSON.stringify(qa[e].data));
					Ja[e] = t, qa[e] = ga(`urd-draft-collection-${e}`, () => t, S, `urd-draft-samling-${e}`);
				}
				yo();
			}
			if (ao) {
				for (let e of Object.values(oo)) {
					e.data?.section && Fc(e.data.section, []);
					for (let t of e.data?.blocks ?? []) Pc(t, []);
					for (let t of e.data?.page?.sections ?? []) Fc(t, []);
				}
				let e = JSON.parse(JSON.stringify(ao.data));
				ao = ga("urd-draft-templates", () => e, S, "urd-draft-maler"), so = {};
				for (let e of L(lo)) {
					if (!oo[e]) continue;
					let t = JSON.parse(JSON.stringify(oo[e].data));
					so[e] = t, oo[e] = ga(`urd-draft-template-${e}`, () => t, S, `urd-draft-mal-${e}`);
				}
				fo();
			}
			j(ee, {
				snap: !0,
				...L(O).grid
			}, !0);
			let i = JSON.parse(JSON.stringify(D.data));
			D = ga(`urd-draft-${L(g)}`, () => i, S), ze.has(L(g)) && C(`urd-draft-${L(g)}`, JSON.stringify(i)), Ve(), x(J("status.published"), "info"), Ti(e);
		} else if (u?.status === 401) {
			let e = await u.json().catch(() => null);
			x(e?.code === "loginExpired" ? J("status.loginExpired") : J("status.loginRequired", { reason: ca(e) ?? J("status.unknownReason") }), "error"), await di();
		} else u?.status === 403 ? x(ca(await u.json().catch(() => null)) ?? J("status.noPublishAccess"), "error") : u?.status === 409 ? x(J("status.publishRace"), "error") : x(u ? ca(await u.json().catch(() => null)) ?? J("status.publishFailed") : J("status.publishUnavailable"), "error");
	}
	at();
	function Wc() {
		hn = null;
	}
	$e("urd-editor", {
		get selectedBlock() {
			return L(Lt);
		},
		get siteDraft() {
			return L(O);
		},
		get viewMode() {
			return L(pe);
		},
		get sections() {
			return D?.data.sections ?? [];
		},
		get collectionIds() {
			return L(Xa);
		},
		get collectionsView() {
			return L(Za);
		},
		get pluginBlocks() {
			return L(uc);
		},
		get bridge() {
			return Ie;
		},
		blockLabel: (e) => kn[e] ?? e,
		blockEntranceOptions: () => qr,
		hoverOptions: () => Jr,
		isEntrance: Gr,
		themeSwatches: Ur,
		siteCalendars: Ba,
		siteCalendarById: Va,
		addSiteCalendar: Ha,
		newSeed: Or,
		setStatus: x,
		mutateBlock: qt,
		setBlockProp: Jt,
		setBlockProps: Yt,
		setBlockFrame: xn,
		setBlockFit: pn,
		setBlockFitMin: mn,
		setBlockSize: gn,
		endSizeGesture: Wc,
		setBlockSizeBound: _n,
		setBlockHeightMode: vn,
		setBlockHeightAlign: yn,
		canStretch: bn,
		setBlockHideMobile: Dn,
		setBlockDecor: En,
		setBlockAnimation: Xr,
		setBlockHover: Zr,
		setBlockAnimProp: Qr,
		designWidth: Sn,
		shapePx: Cn,
		setShapeSizePx: wn,
		setBoxStyle: Tn,
		buttonTargets: Xt,
		setButtonTarget: Zt,
		openImageEditor: Qt,
		compressOrTrim: _r,
		imageErrorText: vr,
		setBlockVideoFile: br,
		setBlockVideoPoster: Sr,
		addGalleryImages: Sc,
		moveGalleryImage: Ec,
		removeGalleryImage: Dc,
		setGalleryImageField: kc,
		addCollectionEntry: Ao,
		createCatalogForBlock: Oo,
		openPanel: (e, t = {}) => {
			t.calendars && j(Ia, !0), j(Ct, e, !0);
		},
		openCollection: (e) => {
			j(Qa, e, !0), j(Ct, "collections");
		},
		openDesignPicker: () => {
			j(Ut, { mode: "set" }, !0);
		},
		get activePanel() {
			return L(Ct);
		},
		get missingSeo() {
			return L(ba);
		},
		get pageId() {
			return L(g);
		},
		get seoDraft() {
			return L(ma);
		},
		get templateIds() {
			return L(lo);
		},
		get newPageTemplate() {
			return L(ia);
		},
		set newPageTemplate(e) {
			j(ia, e, !0);
		},
		get newPageTitle() {
			return L(ra);
		},
		set newPageTitle(e) {
			j(ra, e, !0);
		},
		get pageMenuFor() {
			return L(aa);
		},
		set pageMenuFor(e) {
			j(aa, e, !0);
		},
		addPage: da,
		deletePage: Ea,
		handleDeleteTemplate: _o,
		renamePage: pa,
		savePageAsTemplate: fa,
		selectPage: zi,
		setPageNoindex: ya,
		setPageSeo: va,
		setPageSlug: Ta,
		templateStores: oo,
		uploadOgImage: Sa,
		get grid() {
			return L(ee);
		},
		navBgCtx: Rr,
		siteMutate: na,
		get bindsFrom() {
			return L(ye);
		},
		get layoutGutter() {
			return L(ja);
		},
		get layoutWidth() {
			return L(Aa);
		},
		get site() {
			return L(m);
		},
		get iconEditorImage() {
			return L(Da);
		},
		set iconEditorImage(e) {
			j(Da, e, !0);
		},
		get openSiteCalendar() {
			return L(Ra);
		},
		set openSiteCalendar(e) {
			j(Ra, e, !0);
		},
		get siteCalendarsOpen() {
			return L(Ia);
		},
		set siteCalendarsOpen(e) {
			j(Ia, e, !0);
		},
		get siteZoneBad() {
			return L(Ua);
		},
		set siteZoneBad(e) {
			j(Ua, e, !0);
		},
		siteLangOptions: Na,
		siteLangValue: Ma,
		svgAutoTrim: gr,
		get activeThemePreset() {
			return L(Ns);
		},
		THEME_PRESETS: js,
		applyThemePreset: Ms,
		readableOn: p,
		suggestAltColors: Os,
		themeHex: ks,
		setGrid: ui,
		footerBgCtx: zr,
		footerMutate: ys
	});
	var Gc = oC();
	Mr("keydown", ln, it), Mr("pointerdown", ln, rt);
	var Kc = N(Gc), qc = M(Kc), Jc = (e) => {
		var t = Fx(), n = M(t);
		U(n, () => X.pencil);
		var r = F(n);
		E(t), I((e, n) => {
			q(t, "title", e), V(r, ` ${n ?? ""}`);
		}, [() => J("tip.backToEdit"), () => J("ui.edit")]), R("click", t, Fs), B(e, t);
	};
	H(qc, (e) => {
		L(te) || e(Jc);
	});
	var Yc = F(qc, 2);
	let Xc;
	var Zc = M(Yc), Qc = M(Zc), $c = (e) => {
		var t = Kx(), n = N(t), r = P(n, !0), i = F(n, 2), a = M(i), o = (e) => {
			var t = Rx(), n = M(t);
			let r;
			var i = M(n);
			U(i, () => X[`device_${L(de)}`]), U(F(i), () => X.caret), E(n);
			var a = F(n, 2), o = (e) => {
				var t = Lx();
				ri(t, 21, () => L(le), (e) => e.id, (e, t) => {
					var n = Ix();
					let r;
					var i = M(n);
					U(i, () => X[`device_${L(t).id}`]);
					var a = F(i);
					E(n), I((e, i) => {
						r = W(n, 1, "ghost", null, r, { active: L(de) === L(t).id }), q(n, "title", e), V(a, ` ${i ?? ""}`);
					}, [() => ue(L(t)), () => J(`lbl.device.${L(t).id}`)]), R("click", n, () => {
						j(de, L(t).id, !0), j(Yi, null);
					}), B(e, n);
				}), E(t), B(e, t);
			};
			H(a, (e) => {
				L(Yi) === "device" && e(o);
			}), E(t), I((e) => {
				r = W(n, 1, "ghost", null, r, { active: L(Yi) === "device" }), q(n, "title", e);
			}, [() => J("lbl.group.device")]), R("click", n, () => j(Yi, L(Yi) === "device" ? null : "device", !0)), B(e, t);
		}, s = (e) => {
			var t = Bx(), n = N(t), r = P(n, !0), i = F(n, 2);
			ri(i, 21, () => L(le), (e) => e.id, (e, t) => {
				var n = zx();
				let r;
				U(n, () => X[`device_${L(t).id}`], !0), E(n), I((e) => {
					r = W(n, 1, "ghost", null, r, { active: L(de) === L(t).id }), q(n, "title", e);
				}, [() => ue(L(t))]), R("click", n, () => j(de, L(t).id, !0)), B(e, n);
			}), E(i), I((e) => V(r, e), [() => J("lbl.group.device")]), B(e, t);
		};
		H(a, (e) => {
			Zi.device ? e(o) : e(s, -1);
		});
		var c = F(a, 2), l = (e) => {
			var t = Hx(), n = M(t);
			let r;
			var i = M(n), a = P(i);
			U(F(i), () => X.caret), E(n);
			var o = F(n, 2), s = (e) => {
				var t = Vx(), n = M(t), r = M(n);
				U(r, () => X.minus, !0), E(r);
				var i = F(r, 2), a = P(i), o = F(i, 2);
				U(o, () => X.plus, !0), E(o), E(n);
				var s = F(n, 2);
				let c;
				var l = M(s);
				U(l, () => X.fit);
				var u = F(l);
				E(s), E(t), I((e, t, n, l, d, f) => {
					q(r, "title", e), q(i, "title", t), V(a, `${n ?? ""}%`), q(o, "title", l), c = W(s, 1, "ghost", null, c, { active: L(_e) === "fit" }), q(s, "title", d), V(u, ` ${f ?? ""}`);
				}, [
					() => J("tip.zoomOut"),
					() => J("tip.zoomCurrent"),
					() => Math.round(L(Se) * 100),
					() => J("tip.zoomIn"),
					() => J("tip.zoomFit"),
					() => J("lbl.zoom.fit")
				]), R("click", r, () => Ce(-1)), R("click", o, () => Ce(1)), R("click", s, () => j(_e, "fit")), B(e, t);
			};
			H(o, (e) => {
				L(Yi) === "zoom" && e(s);
			}), E(t), I((e, t) => {
				r = W(n, 1, "ghost", null, r, { active: L(Yi) === "zoom" }), q(n, "title", e), V(a, `${t ?? ""}%`);
			}, [() => J("lbl.group.zoom"), () => Math.round(L(Se) * 100)]), R("click", n, () => j(Yi, L(Yi) === "zoom" ? null : "zoom", !0)), B(e, t);
		}, u = (e) => {
			var t = Ux(), n = N(t), r = P(n, !0), i = F(n, 2), a = M(i);
			U(a, () => X.minus, !0), E(a);
			var o = F(a, 2), s = P(o), c = F(o, 2);
			U(c, () => X.plus, !0), E(c);
			var l = F(c, 2);
			let u;
			U(l, () => X.fit, !0), E(l), E(i), I((e, t, n, i, d, f) => {
				V(r, e), q(a, "title", t), q(o, "title", n), V(s, `${i ?? ""}%`), q(c, "title", d), u = W(l, 1, "ghost", null, u, { active: L(_e) === "fit" }), q(l, "title", f);
			}, [
				() => J("lbl.group.zoom"),
				() => J("tip.zoomOut"),
				() => J("tip.zoomCurrent"),
				() => Math.round(L(Se) * 100),
				() => J("tip.zoomIn"),
				() => J("tip.zoomFit")
			]), R("click", a, () => Ce(-1)), R("click", c, () => Ce(1)), R("click", l, () => j(_e, "fit")), B(e, t);
		};
		H(c, (e) => {
			Zi.zoom ? e(l) : e(u, -1);
		});
		var d = F(c, 2), f = (e) => {
			var t = Rx(), n = M(t);
			let r;
			var i = M(n);
			U(i, () => X.gridToggle), U(F(i), () => X.caret), E(n);
			var a = F(n, 2), o = (e) => {
				var t = Wx(), n = M(t);
				let r;
				var i = M(n);
				U(i, () => X.gridToggle);
				var a = F(i);
				E(n);
				var o = F(n, 2);
				let s;
				var c = M(o);
				U(c, () => X.guides);
				var l = F(c);
				E(o), E(t), I((e, t, i, c) => {
					r = W(n, 1, "ghost", null, r, { active: L($i) }), q(n, "title", e), V(a, ` ${t ?? ""}`), s = W(o, 1, "ghost", null, s, { active: L(Hi) }), q(o, "title", i), V(l, ` ${c ?? ""}`);
				}, [
					() => J("tip.gridToggle"),
					() => J("lbl.view.grid"),
					() => J("tip.guides"),
					() => J("lbl.view.guides")
				]), R("click", n, ea), R("click", o, Qi), B(e, t);
			};
			H(a, (e) => {
				L(Yi) === "view" && e(o);
			}), E(t), I((e) => {
				r = W(n, 1, "ghost", null, r, { active: L(Yi) === "view" || L($i) || L(Hi) }), q(n, "title", e);
			}, [() => J("lbl.group.view")]), R("click", n, () => j(Yi, L(Yi) === "view" ? null : "view", !0)), B(e, t);
		}, p = (e) => {
			var t = Gx(), n = N(t), r = P(n, !0), i = F(n, 2), a = M(i);
			let o;
			U(a, () => X.gridToggle, !0), E(a);
			var s = F(a, 2);
			let c;
			U(s, () => X.guides, !0), E(s), E(i), I((e, t, n) => {
				V(r, e), o = W(a, 1, "ghost", null, o, { active: L($i) }), q(a, "title", t), c = W(s, 1, "ghost", null, c, { active: L(Hi) }), q(s, "title", n);
			}, [
				() => J("lbl.group.view"),
				() => J("tip.gridToggle"),
				() => J("tip.guides")
			]), R("click", a, ea), R("click", s, Qi), B(e, t);
		};
		H(d, (e) => {
			Zi.view ? e(f) : e(p, -1);
		}), E(i), Ui(i, (e) => j(Xi, e), () => L(Xi)), I((e, t) => {
			q(n, "title", e), V(r, t);
		}, [() => J("tip.switchPage"), () => Be()?.title ?? ""]), R("click", n, () => Ft("pages")), B(e, t);
	};
	H(Qc, (e) => {
		L(m) && e($c);
	});
	var el = F(Qc, 2), tl = (e) => {
		var t = qx(), n = M(t);
		U(n, () => X.phone);
		var r = F(n, 2), i = P(r, !0), a = P(F(r, 2), !0);
		E(t), I((e, n) => {
			q(t, "title", e), V(i, n), V(a, L(Oe));
		}, [() => J("tip.attention"), () => J(L(Oe) === 1 ? "ui.attentionOne" : "ui.attentionMany", { n: L(Oe) })]), R("click", t, je), B(e, t);
	};
	H(el, (e) => {
		L(Oe) > 0 && e(tl);
	}), E(Zc);
	var nl = F(Zc, 2), rl = M(nl), il = (e) => {
		var t = Yx(), n = M(t), r = P(M(n), !0);
		ke(2), E(n);
		var i = F(n, 2), a = M(i);
		let o;
		var s = M(a);
		U(s, () => X.restore);
		var c = P(F(s), !0);
		E(a);
		var l = F(a, 2), u = (e) => {
			var t = Jx(), n = M(t);
			U(n, () => X.restore);
			var r = F(n);
			E(t), I((e, n) => {
				q(t, "title", e), V(r, ` ${n ?? ""}`);
			}, [() => J("tip.discardArmed"), () => J("ui.discardConfirm")]), R("click", t, Vc), B(e, t);
		};
		H(l, (e) => {
			L(Rc) && e(u);
		}), E(i), Ui(i, (e) => j(zc, e), () => L(zc)), E(t), I((e, t, i, s, l) => {
			q(n, "title", e), q(n, "aria-label", t), V(r, i), o = W(a, 1, "discard-dot", null, o, { armed: L(Rc) }), q(a, "title", s), V(c, l);
		}, [
			() => J("ui.unpublished"),
			() => J("ui.unpublished"),
			() => J("ui.unpublished"),
			() => L(Rc) ? J("tip.discardArmed") : J("tip.discard"),
			() => J("ui.discard")
		]), R("click", a, Bc), yi(2, t, () => ha, () => ({
			x: 24,
			duration: Gt ? 0 : 150
		})), B(e, t);
	};
	H(rl, (e) => {
		L(_) && e(il);
	}), E(nl);
	var al = F(nl, 2), ol = M(al), sl = (e) => {
		var t = $x(), n = N(t), r = M(n), i = (e) => {
			var t = Xx(), n = N(t);
			U(n, () => X.eye);
			var r = P(F(n, 2), !0);
			I((e) => V(r, e), [() => J("ui.cleanView")]), B(e, t);
		}, a = (e) => {
			var t = Xx(), n = N(t);
			U(n, () => X.pencil);
			var r = P(F(n, 2), !0);
			I((e) => V(r, e), [() => J("ui.edit")]), B(e, t);
		};
		H(r, (e) => {
			L(te) ? e(i) : e(a, -1);
		}), E(n);
		var o = F(n, 2), s = (e) => {
			var t = Zx(), n = M(t), r = (e) => {
				var t = Hr();
				U(N(t), () => X.warn), B(e, t);
			};
			H(n, (e) => {
				L(T).allowed || e(r);
			});
			var i = F(n, 1, !0);
			E(t), I((e) => {
				q(t, "title", e), V(i, L(T).login);
			}, [() => L(T).allowed ? J("tip.hasPublishAccess") : J("tip.noPublishAccess")]), B(e, t);
		}, c = (e) => {
			var t = Qx(), n = P(t, !0);
			I((e) => V(n, e), [() => J("ui.loginGitHub")]), B(e, t);
		};
		H(o, (e) => {
			L(T)?.loggedIn ? e(s) : L(T) && e(c, 1);
		});
		var l = F(o, 2), u = M(l);
		U(u, () => X.external);
		var d = P(F(u, 2), !0);
		E(l);
		var f = F(l, 2), p = P(f, !0);
		I((e, t, r, i, a) => {
			q(n, "title", e), q(l, "href", t), q(l, "title", r), V(d, i), f.disabled = !L(_), V(p, a);
		}, [
			() => L(te) ? J("tip.chromeHide") : J("tip.chromeShow"),
			() => Be()?.path ?? "/",
			() => J("ui.viewSite"),
			() => J("ui.viewSite"),
			() => J("ui.publish")
		]), R("click", n, Fs), R("click", f, Uc), B(e, t);
	};
	H(ol, (e) => {
		L(m) && e(sl);
	}), E(al), E(Yc);
	var cl = F(Yc, 2), ll = (e) => {
		var t = $S(), n = M(t);
		let r;
		var i = M(n);
		ri(i, 17, () => wt, $r, (e, t, n) => {
			var r = tS(), i = N(r), a = P(i, !0);
			ri(F(i, 2), 16, () => L(t), (e) => e, (e, t) => {
				var n = eS();
				let r;
				var i = P(n, !0);
				I(() => {
					r = W(n, 1, "", null, r, { active: L(Ct) === t }), V(i, Et[t]);
				}), R("click", n, () => Ft(t)), B(e, n);
			}), I((e) => V(a, e), [() => J(Tt[n])]), B(e, r);
		});
		var o = F(i, 2), s = F(M(o), 2);
		let l;
		U(s, () => X.gear, !0), E(s);
		var d = F(s, 2), f = (e) => {
			var t = iS(), n = M(t), r = P(n, !0), i = F(n, 2), a = M(i);
			Y(F(a), {
				get value() {
					return L(u);
				},
				get options() {
					return c;
				},
				onchange: (e) => j(u, e, !0)
			}), E(i);
			var o = F(i, 2), s = M(o), l = F(s);
			{
				let e = /* @__PURE__ */ k(() => [["auto", J("lang.auto")], ...jt()]);
				Y(l, {
					get value() {
						return Nt;
					},
					get options() {
						return L(e);
					},
					onchange: Pt
				});
			}
			E(o);
			var d = F(o, 2), f = M(d), p = F(f);
			{
				let e = /* @__PURE__ */ k(() => [["strip", J("settings.layoutPickerStrip")], ["menu", J("settings.layoutPickerMenu")]]);
				Y(p, {
					get value() {
						return L(Gi);
					},
					get options() {
						return L(e);
					},
					onchange: Ki
				});
			}
			E(d);
			var m = F(d, 2), h = M(m), g = F(h);
			{
				let e = /* @__PURE__ */ k(() => [["wide", J("settings.menuWide")], ["narrow", J("settings.menuNarrow")]]);
				Y(g, {
					get value() {
						return to.widthPref;
					},
					get options() {
						return L(e);
					},
					get onchange() {
						return ro;
					}
				});
			}
			E(m);
			var _ = F(m, 2), v = M(_), y = F(v);
			{
				let e = /* @__PURE__ */ k(() => [["remember", J("settings.panelsRemember")], ["reset", J("settings.panelsReset")]]);
				Y(y, {
					get value() {
						return L(xt);
					},
					get options() {
						return L(e);
					},
					onchange: St
				});
			}
			E(_);
			var b = F(_, 2), x = P(b, !0), S = F(b, 2), C = M(S);
			let w;
			var T = P(C, !0), ee = F(C, 2);
			let te;
			var ne = P(ee, !0);
			E(S);
			var re = F(S, 2), ie = (e) => {
				var t = nS(), n = M(t), r = P(n, !0), i = F(n, 2);
				G(i);
				var a = F(i, 2), o = P(a, !0), s = F(a, 2);
				G(s), E(t), I((e, t, n, a) => {
					V(r, e), q(i, "min", 640), q(i, "max", nv), q(i, "title", t), K(i, L(ae).width), V(o, n), q(s, "max", rv), q(s, "title", a), K(s, L(ae).height || "");
				}, [
					() => J("lbl.screen.w"),
					() => J("tip.screen.width", {
						min: 640,
						max: nv
					}),
					() => J("lbl.screen.h"),
					() => J("tip.screen.height", {
						min: 480,
						max: rv
					})
				]), R("change", i, (e) => {
					oe({ width: Number(e.target.value) }), e.target.value = L(ae).width;
				}), R("change", s, (e) => {
					oe({ height: Number(e.target.value) }), e.target.value = L(ae).height || "";
				}), B(e, t);
			};
			H(re, (e) => {
				L(ae).mode === "custom" && e(ie);
			});
			var se = F(re, 2), ce = (e) => {
				var t = rS(), n = N(t), r = P(n, !0), i = F(n, 2), a = M(i), o = F(a);
				G(o), E(i), I((e, t, s, c, l) => {
					q(n, "title", e), V(r, t), q(i, "title", s), V(a, `${c ?? ""} `), q(o, "placeholder", l), K(o, L(O).analytics?.token ?? "");
				}, [
					() => J("tip.analytics"),
					() => J("settings.analytics"),
					() => J("tip.analytics"),
					() => J("lbl.analyticsToken"),
					() => J("ph.analyticsToken")
				]), R("change", o, (e) => ka(e.target.value)), B(e, t);
			};
			H(se, (e) => {
				L(O) && e(ce);
			}), E(t), I((e, t, n, c, l, u, p, g, y, re, ie, oe, se, ce, le, ue) => {
				V(r, e), q(i, "title", t), V(a, `${n ?? ""} `), q(o, "title", c), V(s, `${l ?? ""} `), q(d, "title", u), V(f, `${p ?? ""} `), q(m, "title", g), V(h, `${y ?? ""} `), q(_, "title", re), V(v, `${ie ?? ""} `), q(b, "title", oe), V(x, se), q(S, "title", ce), w = W(C, 1, "", null, w, { on: L(ae).mode === "own" }), V(T, le), te = W(ee, 1, "", null, te, { on: L(ae).mode === "custom" }), V(ne, ue);
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
			]), R("click", C, () => oe({ mode: "own" })), R("click", ee, () => oe({ mode: "custom" })), B(e, t);
		};
		H(d, (e) => {
			L(Wi) && e(f);
		}), E(o), Ui(o, (e) => j(qi, e), () => L(qi)), E(n);
		var p = F(n, 2), m = (e) => {
			var t = QS();
			let n;
			var r = M(t), i = M(r), o = P(i, !0), s = F(i, 2), c = (e) => {
				var t = aS();
				let n;
				U(t, () => X.foldToggle, !0), E(t), I((e, r) => {
					n = W(t, 1, "fold-all fold-toggle", null, n, { collapse: L(Ss) }), q(t, "title", e), q(t, "aria-label", r);
				}, [() => J(L(Ss) ? "ui.collapseAll" : "ui.expandAll"), () => J(L(Ss) ? "ui.collapseAll" : "ui.expandAll")]), R("click", t, Ts), B(e, t);
			};
			H(s, (e) => {
				L(xs) && e(c);
			}), E(r);
			var l = F(r, 2), u = (e) => {
				Eh(e, {});
			}, d = (e) => {
				Gg(e, { get backgroundLayers() {
					return a;
				} });
			}, f = (e) => {
				v_(e, {});
			}, p = (e) => {
				D_(e, {});
			}, m = (e) => {
				var t = fS();
				let n;
				var r = M(t);
				G(r);
				var i = F(r, 2), a = (e) => {
					var t = Hr();
					ri(N(t), 17, () => Nc(pc(), L(fc), (e) => e.label), (e) => e.label, (e, t) => {
						var n = Hr(), r = N(n), i = (e) => {
							var n = oS(), r = M(n), i = F(r);
							E(n), I((e) => {
								q(n, "title", e), V(r, `${L(t).label ?? ""} `);
							}, [() => J("tip.webpAuto")]), R("change", i, gc), B(e, n);
						}, a = (e) => {
							var n = sS(), r = M(n), i = F(r);
							E(n), I((e) => {
								q(n, "title", e), V(r, `${L(t).label ?? ""} `);
							}, [() => J("tip.blocks.galleryImages")]), R("change", i, Cc), B(e, n);
						}, o = (e) => {
							var n = cS(), r = P(n, !0);
							I(() => V(r, L(t).label)), R("click", n, () => mc(L(t))), B(e, n);
						};
						H(r, (e) => {
							L(t).act === "image" ? e(i) : L(t).act === "galleryImages" ? e(a, 1) : e(o, -1);
						}), B(e, n);
					}, (e) => {
						var t = lS(), n = P(t, !0);
						I((e) => V(n, e), [() => J("canvas.searchEmpty")]), B(e, t);
					}), B(e, t);
				}, o = /* @__PURE__ */ k(() => L(fc).trim()), s = (e) => {
					var t = dS(), n = N(t), r = M(n), i = P(r, !0), a = F(r, 2), o = M(a), s = P(o, !0), c = F(o, 2), l = P(c, !0);
					E(a), E(n);
					var u = F(n, 2), d = P(u, !0), f = F(u, 2), p = M(f), m = F(p);
					E(f);
					var h = F(f, 2), g = P(h, !0), _ = F(h, 2), v = P(_, !0), y = F(_, 2), b = P(y, !0), x = F(y, 2), S = P(x, !0), C = F(x, 2), w = P(C, !0), T = F(C, 2), ee = P(T, !0), te = F(T, 2), ne = P(te, !0), re = F(te, 2), ie = P(re, !0), ae = F(re, 2), oe = P(ae, !0), se = F(ae, 2), ce = P(se, !0), le = F(se, 2), ue = P(le, !0), de = F(le, 2), fe = P(de, !0), pe = F(de, 2), me = P(pe, !0), he = F(pe, 2), ge = P(he, !0), _e = F(he, 2), ve = P(_e, !0), ye = F(_e, 2), be = P(ye, !0), xe = F(ye, 2), Se = P(xe, !0), Ce = F(xe, 2), we = M(Ce), Te = P(we, !0), Ee = F(we, 2), De = M(Ee), Oe = P(De, !0), ke = F(De, 2), Ae = M(ke), je = F(Ae);
					E(ke), E(Ee), E(Ce);
					var Me = F(Ce, 2), Ne = M(Me), Pe = P(Ne, !0), D = F(Ne, 2), Fe = M(D), O = P(Fe, !0), Le = F(Fe, 2), Re = P(Le, !0), ze = F(Le, 2), Be = P(ze, !0), Ve = F(ze, 2), He = P(Ve, !0), Ue = F(Ve, 2), We = P(Ue, !0);
					E(D);
					var Ge = F(D, 2), Ke = M(Ge), qe = P(Ke, !0);
					E(Ge), E(Me);
					var Je = F(Me, 2), Ye = M(Je), Xe = P(Ye, !0), Ze = F(Ye, 2), Qe = M(Ze), $e = P(Qe, !0), et = F(Qe, 2), tt = P(et, !0), nt = F(et, 2), rt = P(nt, !0), it = F(nt, 2), at = P(it, !0), ot = F(it, 2), st = P(ot, !0);
					E(Ze), E(Je);
					var ct = F(Je, 2), lt = (e) => {
						let t = /* @__PURE__ */ k(() => L(lo).filter((e) => oo[e]?.data?.mal?.kind === "blocks"));
						var n = uS(), r = M(n), i = P(r, !0), a = F(r, 2);
						ri(a, 20, () => L(t), (e) => e, (e, t) => {
							var n = cS(), r = P(n, !0);
							I((e) => {
								q(n, "title", e), V(r, oo[t].data.mal.name);
							}, [() => J("canvas.insertGroup")]), R("click", n, () => Ie?.sendInsertTemplate(t)), B(e, n);
						}), E(a), E(n), I((e) => V(i, e), [() => J("canvas.tabMyTemplates")]), B(e, n);
					}, ut = /* @__PURE__ */ k(() => L(lo).some((e) => oo[e]?.data?.mal?.kind === "blocks"));
					H(ct, (e) => {
						L(ut) && e(lt);
					});
					var dt = F(ct, 2), ft = (e) => {
						var t = uS(), n = M(t), r = P(n, !0), i = F(n, 2);
						ri(i, 21, () => L(uc), (e) => e.type, (e, t) => {
							var n = Hr(), r = N(n), i = (e) => {
								var n = uS(), r = M(n), i = P(r, !0), a = F(r, 2);
								ri(a, 21, () => L(t).variants, (e) => e.label, (e, n) => {
									var r = cS(), i = P(r, !0);
									I((e) => {
										q(r, "title", e), V(i, L(n).label);
									}, [() => J("tip.blocks.fromPlugin", { plugin: L(t).plugin })]), R("click", r, () => dc(L(t), L(n).props)), B(e, r);
								}), E(a), E(n), I(() => V(i, L(t).label)), B(e, n);
							}, a = (e) => {
								var n = cS(), r = P(n, !0);
								I((e) => {
									q(n, "title", e), V(r, L(t).label);
								}, [() => J("tip.blocks.fromPlugin", { plugin: L(t).plugin })]), R("click", n, () => dc(L(t))), B(e, n);
							};
							H(r, (e) => {
								L(t).variants?.length ? e(i) : e(a, -1);
							}), B(e, n);
						}), E(i), E(t), I((e) => V(r, e), [() => J("panel.plugins")]), B(e, t);
					};
					H(dt, (e) => {
						L(uc).length && e(ft);
					}), I((e, t, n, r, a, o, u, m, Ce, we, Ee, E, je, Me, Ne, D, Ie, Ge, Je, Ye, Ze, Qe, et, nt, it, ot, ct, lt, ut, dt, ft, pt, mt, ht, gt, _t, vt, yt, bt, xt, St, Ct, wt, k, Tt, Et, Dt, Ot, kt, At, jt, Mt, Nt, Pt, Ft, It, Lt, Rt, zt, Bt, Vt, Ht, Ut, Wt, Gt) => {
						V(i, e), V(s, t), q(c, "title", n), V(l, r), V(d, a), q(f, "title", o), V(p, `${u ?? ""} `), q(h, "title", m), V(g, Ce), q(_, "title", we), V(v, Ee), q(y, "title", E), V(b, je), q(x, "title", Me), V(S, Ne), q(C, "title", D), V(w, Ie), q(T, "title", Ge), V(ee, Je), q(te, "title", Ye), V(ne, Ze), q(re, "title", Qe), V(ie, et), q(ae, "title", nt), V(oe, it), q(se, "title", ot), V(ce, ct), q(le, "title", lt), V(ue, ut), q(de, "title", dt), V(fe, ft), q(pe, "title", pt), V(me, mt), q(he, "title", ht), V(ge, gt), q(_e, "title", _t), V(ve, vt), q(ye, "title", yt), V(be, bt), q(xe, "title", xt), V(Se, St), V(Te, Ct), q(De, "title", wt), V(Oe, k), q(ke, "title", Tt), V(Ae, `${Et ?? ""} `), V(Pe, Dt), q(Fe, "title", Ot), V(O, kt), q(Le, "title", At), V(Re, jt), q(ze, "title", Mt), V(Be, Nt), q(Ve, "title", Pt), V(He, Ft), q(Ue, "title", It), V(We, Lt), q(Ke, "title", Rt), V(qe, zt), V(Xe, Bt), V($e, Vt), V(tt, Ht), V(rt, Ut), V(at, Wt), V(st, Gt);
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
					]), R("click", o, () => sc("text")), R("click", c, () => sc("text-box")), R("click", u, () => sc("button")), R("change", m, gc), R("click", h, () => sc("video")), R("click", _, () => sc("icon")), R("click", y, () => sc("map")), R("click", x, () => sc("form")), R("click", C, () => sc("collection")), R("click", T, () => sc("faq")), R("click", te, () => sc("timeline")), R("click", re, () => sc("quote")), R("click", ae, () => sc("stats")), R("click", se, () => sc("ribbon")), R("click", le, () => sc("table")), R("click", de, () => sc("share")), R("click", pe, () => sc("countdown")), R("click", he, () => sc("audio")), R("click", _e, () => sc("product")), R("click", ye, () => sc("cart")), R("click", xe, () => sc("checkout")), R("click", De, () => sc("gallery")), R("change", je, Cc), R("click", Fe, () => sc("calendar")), R("click", Le, () => sc("calendar-cards")), R("click", ze, () => sc("calendar-month")), R("click", Ve, () => sc("calendar-next")), R("click", Ue, () => sc("calendar-agenda")), R("click", Ke, () => j(Ut, { mode: "add" }, !0)), R("click", Qe, () => sc("shape-line")), R("click", et, () => sc("shape-arrow")), R("click", nt, () => sc("shape-circle")), R("click", it, () => sc("shape-rect")), R("click", ot, () => sc("shape-triangle")), B(e, t);
				};
				H(i, (e) => {
					L(o) ? e(a) : e(s, -1);
				}), E(t), I((e, i, a) => {
					n = W(t, 1, "panel-body", null, n, { locked: L(pe) === "mobile" }), q(t, "title", e), q(r, "placeholder", i), q(r, "title", a);
				}, [
					() => L(pe) === "mobile" ? J("tip.blocks.mobileLocked") : void 0,
					() => J("canvas.searchBlocks"),
					() => J("canvas.searchBlocks")
				]), Li(r, () => L(fc), (e) => j(fc, e)), B(e, t);
			}, g = (e) => {
				k_(e, {});
			}, _ = (e) => {
				var t = bS(), n = M(t), r = (e) => {
					var t = pS(), n = N(t), r = P(n, !0), i = F(n, 2);
					zp(i, {
						get: () => to.propsQuery,
						set: (e) => to.propsQuery = e
					}), Lp(F(i, 2), {
						wide: !1,
						get query() {
							return to.propsQuery;
						}
					}), I((e) => V(r, e), [() => J("blocks.suffix", { label: kn[L(Lt).type] ?? L(Lt).type })]), B(e, t);
				}, i = (e) => {
					var t = yS(), n = N(t), r = P(n, !0), i = F(n, 2), o = M(i), s = F(o);
					G(s), E(i);
					var c = F(i, 4), l = M(c);
					G(l);
					var u = F(l);
					E(c);
					var d = F(c, 2), f = (e) => {
						var t = mS(), n = N(t), r = M(n), i = P(F(r));
						E(n);
						var a = F(n, 2);
						G(a), I((e) => {
							V(r, `${e ?? ""} `), V(i, `${L(jn).size ?? ""} px`), K(a, L(jn).size);
						}, [() => J("lbl.gridSize")]), R("input", a, (e) => li("size", Number(e.target.value))), B(e, t);
					};
					H(d, (e) => {
						L(jn) && e(f);
					});
					var p = F(d, 4), m = P(p, !0), g = F(p, 2);
					ri(g, 21, () => [["", "common.standard"], ...Object.entries(uh)], ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ k(() => h(L(t), 2));
						let r = () => L(n)[0], i = () => L(n)[1], a = /* @__PURE__ */ k(() => Un(r()));
						var o = hS();
						let s;
						var c = M(o), l = M(c), u = F(l, 2), d = F(u, 2);
						E(c);
						var f = P(F(c, 2), !0);
						E(o), I((e, t) => {
							s = W(o, 1, "rs-card", null, s, { on: L(In) === r() }), q(o, "title", e), Oi(c, `background: ${L(a).bg ?? ""}`), Oi(l, `background: ${L(a).text ?? ""}`), Oi(u, `background: ${L(a).surface ?? ""}`), Oi(d, `background: ${L(a).accent ?? ""}`), V(f, t);
						}, [() => J("tip.props.sectionTheme"), () => J(i())]), R("click", o, () => Hn(r())), B(e, o);
					}), E(g);
					var _ = F(g, 2), v = M(_), y = F(v), b = M(y), x = P(b), S = F(b, 2);
					U(S, () => X.copy, !0), E(S), E(y), E(_);
					var C = F(_, 4), w = P(C, !0), T = F(C, 2);
					a(T, () => L(Lr), () => L(Nn));
					var ee = F(T, 4), te = P(ee, !0), ne = F(ee, 2);
					ri(ne, 16, () => [["top", "lbl.dividerTop"], ["bottom", "lbl.dividerBottom"]], ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ k(() => h(t, 2));
						let r = () => L(n)[0], i = () => L(n)[1], a = /* @__PURE__ */ k(() => L(Ln)[r()]);
						var o = ox(), s = N(o), c = M(s), l = F(c);
						{
							let e = /* @__PURE__ */ k(() => L(a)?.shape ?? ""), t = /* @__PURE__ */ k(() => [["", J("common.none")], ...Dy.map((e) => [e, J(`opt.divider.${e}`)])]);
							Y(l, {
								get value() {
									return L(e);
								},
								get options() {
									return L(t);
								},
								onchange: (e) => ti(r(), "shape", e)
							});
						}
						E(s);
						var u = F(s, 2), d = (e) => {
							var t = gS(), n = N(t), i = M(n), o = P(i, !0), s = F(i, 2);
							G(s);
							var c = P(F(s, 2));
							E(n);
							var l = F(n, 2), u = M(l), d = F(u);
							{
								let e = /* @__PURE__ */ k(() => L(a).color ?? "bg"), t = /* @__PURE__ */ k(Ur), n = /* @__PURE__ */ k(() => J("tip.divider.color"));
								Pa(d, {
									get value() {
										return L(e);
									},
									get tokens() {
										return L(t);
									},
									get label() {
										return L(n);
									},
									onchange: (e) => ti(r(), "color", e)
								});
							}
							E(l);
							var f = F(l, 2), p = M(f);
							G(p);
							var m = F(p);
							E(f);
							var h = F(f, 2), g = M(h);
							G(g);
							var _ = F(g);
							E(h), I((e, t, n, r, i, d, v) => {
								V(o, e), q(s, "min", Oy.min), q(s, "max", Oy.max), K(s, L(a).height ?? Oy.dflt), V(c, `${L(a).height ?? Oy.dflt ?? ""} px`), q(l, "title", t), V(u, `${n ?? ""} `), q(f, "title", r), Ni(p, L(a).flip === !0), V(m, ` ${i ?? ""}`), q(h, "title", d), Ni(g, L(a).invert === !0), V(_, ` ${v ?? ""}`);
							}, [
								() => J("lbl.height"),
								() => J("tip.divider.color"),
								() => J("lbl.color"),
								() => J("tip.divider.flip"),
								() => J("lbl.dividerFlip"),
								() => J("tip.divider.invert"),
								() => J("lbl.patternInvert")
							]), R("input", s, (e) => ti(r(), "height", e.target.valueAsNumber)), R("change", p, (e) => ti(r(), "flip", e.target.checked)), R("change", g, (e) => ti(r(), "invert", e.target.checked)), B(e, t);
						};
						H(u, (e) => {
							L(a)?.shape && e(d);
						}), I((e, t) => {
							q(s, "title", e), V(c, `${t ?? ""} `);
						}, [() => J("tip.props.dividers"), () => J(i())]), B(e, o);
					});
					var re = F(ne, 4), ie = M(re), ae = F(ie);
					{
						let e = /* @__PURE__ */ k(() => Gr(L(Pn)) ? L(Pn).type : "");
						Y(ae, {
							get value() {
								return L(e);
							},
							get options() {
								return Kr;
							},
							onchange: (e) => ei(e || null)
						});
					}
					E(re);
					var oe = F(re, 2), se = (e) => {
						var t = vS(), n = N(t), r = M(n), i = F(r);
						G(i), E(n);
						var a = F(n, 2), o = M(a), s = F(o);
						G(s), E(a);
						var c = F(a, 2), l = (e) => {
							var t = _S(), n = N(t), r = M(n), i = F(r);
							{
								let e = /* @__PURE__ */ k(() => L(Pn).props.effect ?? "slide-up"), t = /* @__PURE__ */ k(() => [
									["fade-in", J("anim.fadeIn")],
									["slide-up", J("anim.slideUp")],
									["zoom-in", J("anim.zoomIn")]
								]);
								Y(i, {
									get value() {
										return L(e);
									},
									get options() {
										return L(t);
									},
									onchange: (e) => ai("effect", e)
								});
							}
							E(n);
							var a = F(n, 2), o = M(a), s = F(o);
							G(s), E(a);
							var c = F(a, 2), l = M(c), u = F(l);
							{
								let e = /* @__PURE__ */ k(() => L(Pn).props.pattern ?? "sequence"), t = /* @__PURE__ */ k(() => [
									["sequence", J("opt.stagger.sequence")],
									["columns", J("opt.stagger.columns")],
									["rows", J("opt.stagger.rows")],
									["center", J("opt.stagger.center")]
								]);
								Y(u, {
									get value() {
										return L(e);
									},
									get options() {
										return L(t);
									},
									onchange: (e) => ai("pattern", e)
								});
							}
							E(c), I((e, t, i, u, d, f) => {
								q(n, "title", e), V(r, `${t ?? ""} `), q(a, "title", i), V(o, `${u ?? ""} `), K(s, L(Pn).props.step ?? 90), q(c, "title", d), V(l, `${f ?? ""} `);
							}, [
								() => J("tip.props.staggerEffect"),
								() => J("lbl.staggerEffect"),
								() => J("tip.props.staggerStep"),
								() => J("lbl.stepMs"),
								() => J("tip.props.staggerPattern"),
								() => J("lbl.pattern")
							]), R("change", s, (e) => ii("step", Number(e.target.value))), B(e, t);
						};
						H(c, (e) => {
							L(Pn).type === "stagger" && e(l);
						}), I((e, t) => {
							V(r, `${e ?? ""} `), K(i, L(Pn).props.duration), V(o, `${t ?? ""} `), K(s, L(Pn).props.delay ?? 0);
						}, [() => J("lbl.durationMs"), () => J("lbl.delayMs")]), R("change", i, (e) => ii("duration", Number(e.target.value))), R("change", s, (e) => ii("delay", Number(e.target.value))), B(e, t);
					}, ce = /* @__PURE__ */ k(() => Gr(L(Pn)));
					H(oe, (e) => {
						L(ce) && e(se);
					});
					var le = F(oe, 2), ue = M(le), de = F(ue);
					{
						let e = /* @__PURE__ */ k(() => L(Fn)?.type ?? (L(Pn) && !Gr(L(Pn)) ? L(Pn).type : ""));
						Y(de, {
							get value() {
								return L(e);
							},
							get options() {
								return Jr;
							},
							onchange: (e) => ni(e || null)
						});
					}
					E(le), I((e, t, n, a, c, d, f, h, g, y, b, C, T, ne, ae, oe, se) => {
						V(r, e), q(i, "title", t), V(o, `${n ?? ""} `), K(s, L(Mn)), q(s, "placeholder", a), Ni(l, L(jn) !== null), V(u, ` ${c ?? ""}`), q(p, "title", d), V(m, f), q(_, "title", h), V(v, `${g ?? ""} `), V(x, `#${L(An) ?? ""}`), q(S, "title", y), V(w, b), q(ee, "title", C), V(te, T), q(re, "title", ne), V(ie, `${ae ?? ""} `), q(le, "title", oe), V(ue, `${se ?? ""} `);
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
					]), R("change", s, (e) => oi(e.target.value)), R("change", l, (e) => ci(e.target.checked)), R("click", S, () => navigator.clipboard?.writeText(`#${L(An)}`)), B(e, t);
				}, o = (e) => {
					var t = lS(), n = P(t, !0);
					I((e) => V(n, e), [() => J("hint.props.empty")]), B(e, t);
				};
				H(n, (e) => {
					L(Lt) ? e(r) : L(An) ? e(i, 1) : e(o, -1);
				}), E(t), B(e, t);
			}, v = (e) => {
				Z_(e, { get backgroundLayers() {
					return a;
				} });
			}, y = (e) => {
				var t = kS(), n = M(t), r = (e) => {
					var t = Tx(), n = M(t), r = F(n);
					{
						let e = /* @__PURE__ */ k(() => L(Qa) ?? ""), t = /* @__PURE__ */ k(() => [["", J("common.choose")], ...L(Xa).map((e) => [e, L(Za)[e]?.name ?? e])]);
						Y(r, {
							get value() {
								return L(e);
							},
							get options() {
								return L(t);
							},
							onchange: (e) => j(Qa, e || null, !0)
						});
					}
					E(t), I((e) => V(n, `${e ?? ""} `), [() => J("blocks.collection")]), B(e, t);
				};
				H(n, (e) => {
					L(Xa).length && e(r);
				});
				var i = F(n, 2), a = (e) => {
					let t = /* @__PURE__ */ k(() => L(Za)[L(Qa)]);
					var n = OS(), r = N(n), i = M(r), a = P(i, !0), o = F(i, 2), s = P(o, !0), c = F(o, 2), l = M(c), u = F(l);
					E(c);
					var d = F(c, 2);
					U(d, () => X.cross, !0), E(d), E(r);
					var f = F(r, 2);
					ri(f, 19, () => L(t).entries, (e) => e.id, (e, n, r) => {
						var i = DS(), a = M(i), o = P(a), s = F(a, 2), c = M(s), l = M(c);
						G(l);
						var u = F(l, 2), d = M(u);
						U(d, () => X.up, !0), E(d);
						var f = F(d, 2);
						U(f, () => X.down, !0), E(f);
						var p = F(f, 2);
						U(p, () => X.cross, !0), E(p), E(u), E(c);
						var m = F(c, 2), h = (e) => {
							var t = xS(), r = M(t), i = F(r);
							G(i), E(t), I((e) => {
								V(r, `${e ?? ""} `), K(i, L(n).date ?? "");
							}, [() => J("lbl.date")]), R("change", i, (e) => jo(L(Qa), L(n).id, "date", e.target.value)), B(e, t);
						};
						H(m, (e) => {
							L(t).kind !== "products" && e(h);
						});
						var g = F(m, 2);
						pt(g);
						var _ = F(g, 2), v = (e) => {
							var t = SS(), r = M(t), i = F(r);
							G(i), E(t), I((e, t) => {
								V(r, `${e ?? ""} `), K(i, L(n).href ?? ""), q(i, "placeholder", t);
							}, [() => J("lbl.link"), () => J("ph.collections.href")]), R("change", i, (e) => jo(L(Qa), L(n).id, "href", e.target.value)), B(e, t);
						};
						H(_, (e) => {
							L(t).kind !== "products" && e(v);
						});
						var y = F(_, 2), b = M(y), x = M(b), S = F(x);
						E(b);
						var C = F(b, 2), w = (e) => {
							var t = CS(), r = N(t), i = F(r, 2);
							U(i, () => X.cross, !0), E(i), I((e) => {
								q(r, "src", L(n).image), q(i, "title", e);
							}, [() => J("tip.removeImage")]), R("click", i, () => jo(L(Qa), L(n).id, "image", "")), B(e, t);
						};
						H(C, (e) => {
							L(n).image && e(w);
						}), E(y);
						var T = F(y, 2), ee = (e) => {
							var t = ES(), r = N(t), i = M(r), a = F(i);
							G(a), E(r);
							var o = F(r, 2), s = M(o), c = F(s);
							G(c), E(o);
							var l = F(o, 2), u = M(l), d = F(u);
							G(d), E(l);
							var f = F(l, 2), p = M(f), m = F(p);
							G(m), E(f);
							var h = F(f, 2);
							ri(h, 17, () => L(n).colors ?? [], $r, (e, t, r) => {
								var i = TS(), a = M(i);
								G(a);
								var o = F(a, 2), s = M(o), c = F(s);
								E(o);
								var l = F(o, 2), u = (e) => {
									var n = wS();
									I(() => q(n, "src", L(t).image)), B(e, n);
								};
								H(l, (e) => {
									L(t).image && e(u);
								});
								var d = F(l, 2);
								U(d, () => X.cross, !0), E(d), E(i), I((e, n) => {
									K(a, L(t).name), q(a, "placeholder", e), V(s, `${n ?? ""} `);
								}, [() => J("ph.colorName"), () => L(t).image ? J("ui.changeImage") : J("ui.addImage")]), R("change", a, (e) => Lo(L(Qa), L(n).id, r, "name", e.target.value)), R("change", c, (e) => Ro(L(Qa), L(n).id, r, e)), R("click", d, () => zo(L(Qa), L(n).id, r)), B(e, i);
							});
							var g = F(h, 2), _ = P(g, !0);
							I((e, t, r, h, v, y, b, x, S, C, w) => {
								V(i, `${e ?? ""} `), K(a, L(n).price ?? ""), q(o, "title", t), V(s, `${r ?? ""} `), K(c, L(n).memberPrice ?? ""), q(l, "title", h), V(u, `${v ?? ""} `), K(d, L(n).badge ?? ""), q(f, "title", y), V(p, `${b ?? ""} `), K(m, x), q(m, "placeholder", S), q(g, "title", C), V(_, w);
							}, [
								() => J("lbl.price"),
								() => J("tip.entry.memberPrice"),
								() => J("lbl.memberPrice"),
								() => J("tip.entry.badge"),
								() => J("lbl.productBadge"),
								() => J("tip.entry.sizes"),
								() => J("lbl.sizes"),
								() => (L(n).sizes ?? []).join(", "),
								() => J("ph.sizes"),
								() => J("tip.entry.colors"),
								() => J("ui.addColor")
							]), R("change", a, (e) => jo(L(Qa), L(n).id, "price", e.target.value === "" ? "" : Number(e.target.value))), R("change", c, (e) => jo(L(Qa), L(n).id, "memberPrice", e.target.value === "" ? "" : Number(e.target.value))), R("change", d, (e) => jo(L(Qa), L(n).id, "badge", e.target.value)), R("change", m, (e) => Fo(L(Qa), L(n).id, e.target.value)), R("click", g, () => Io(L(Qa), L(n).id)), B(e, t);
						};
						H(T, (e) => {
							L(t).kind === "products" && e(ee);
						}), E(s), E(i), I((e, i, a, s, c) => {
							V(o, `${e ?? ""}${L(t).kind === "products" ? L(n).price == null ? "" : ` · ${L(n).price}` : L(n).date ? ` · ${L(n).date}` : ""}`), K(l, L(n).title), q(l, "title", i), d.disabled = L(r) === 0, f.disabled = L(r) === L(t).entries.length - 1, q(p, "title", a), q(g, "placeholder", s), K(g, L(n).text ?? ""), V(x, `${c ?? ""} `);
						}, [
							() => wo(L(n).title),
							() => J("lbl.title"),
							() => J("tip.collections.deleteEntry"),
							() => J("ph.collections.text"),
							() => L(n).image ? J("ui.changeImage") : J("ui.addImage")
						]), R("change", l, (e) => jo(L(Qa), L(n).id, "title", e.target.value || J("ui.untitled"))), R("click", d, () => Mo(L(Qa), L(r), -1)), R("click", f, () => Mo(L(Qa), L(r), 1)), R("click", p, () => No(L(Qa), L(n).id)), R("change", g, (e) => jo(L(Qa), L(n).id, "text", e.target.value)), R("change", S, (e) => Po(L(Qa), L(n).id, e)), B(e, i);
					});
					var p = F(f, 2), m = (e) => {
						var t = lS(), n = P(t, !0);
						I((e) => V(n, e), [() => J("hint.collections.empty")]), B(e, t);
					};
					H(p, (e) => {
						L(t).entries.length || e(m);
					}), ke(2), I((e, t, n, r, i, u) => {
						V(a, e), q(o, "title", t), V(s, n), q(c, "title", r), V(l, `${i ?? ""} `), q(d, "title", u);
					}, [
						() => J("ui.addEntry"),
						() => J("tip.collections.exportCsv"),
						() => J("ui.exportCsv"),
						() => J("tip.collections.importCsv"),
						() => J("ui.importCsv"),
						() => J("tip.collections.deleteCollection")
					]), R("click", i, () => Ao(L(Qa))), R("click", o, () => Bo(L(Qa))), R("change", u, (e) => Vo(L(Qa), e)), R("click", d, () => ko(L(Qa))), B(e, n);
				};
				H(i, (e) => {
					L(Qa) && L(Za)[L(Qa)] && e(a);
				});
				var o = F(i, 2), s = M(o), c = F(s);
				G(c), E(o);
				var l = F(o, 2), u = M(l);
				Y(F(u), {
					get value() {
						return L(eo);
					},
					get options() {
						return no;
					},
					onchange: (e) => j(eo, e, !0)
				}), E(l);
				var d = F(l, 2), f = P(d, !0);
				E(t), I((e, t, n, r, i) => {
					V(s, `${e ?? ""} `), q(c, "placeholder", t), V(u, `${n ?? ""} `), d.disabled = r, V(f, i);
				}, [
					() => J("lbl.newCollectionName"),
					() => J("ph.collections.name"),
					() => J("common.type"),
					() => !L($a).trim(),
					() => J("ui.createCollection")
				]), R("keydown", c, (e) => e.key === "Enter" && Do()), Li(c, () => L($a), (e) => j($a, e)), R("click", d, Do), B(e, t);
			}, b = (e) => {
				var t = IS(), n = M(t), r = (e) => {
					var t = lS(), n = P(t, !0);
					I((e) => V(n, e), [() => J("hint.plugins.empty")]), B(e, t);
				}, i = /* @__PURE__ */ k(() => !Qo().length);
				H(n, (e) => {
					L(i) && e(r);
				});
				var a = F(n, 2);
				ri(a, 16, Qo, (e) => e, (e, t) => {
					let n = /* @__PURE__ */ k(() => Go[t]), r = /* @__PURE__ */ k(() => (L(Wo)?.enabled ?? []).includes(t));
					var i = MS();
					let a;
					var o = M(i), s = M(o), c = P(s, !0), l = F(s, 2), u = (e) => {
						var t = AS(), r = P(t);
						I(() => V(r, `v${L(n).version ?? ""}`)), B(e, t);
					};
					H(l, (e) => {
						L(n)?.version && e(u);
					});
					var d = F(l, 2), f = M(d), p = M(f);
					G(p);
					var m = F(p);
					E(f);
					var h = F(f, 2);
					U(h, () => X.cross, !0), E(h), E(d), E(o);
					var g = F(o, 2), _ = (e) => {
						var t = jS(), r = P(t, !0);
						I((e) => V(r, e), [() => L(n).errors.join("; ")]), B(e, t);
					}, v = (e) => {
						var t = jS(), r = P(t, !0);
						I((e) => V(r, e), [() => J("plugin.engineMismatch", {
							required: L(n).requiresEngine,
							current: L(Ko)
						})]), B(e, t);
					}, y = (e) => {
						var t = jS(), r = P(t, !0);
						I((e) => V(r, e), [() => J("plugin.cspNeeded", { list: as(L(n).csp).join(", ") })]), B(e, t);
					}, b = /* @__PURE__ */ k(() => L(n)?.csp && as(L(n).csp).length);
					H(g, (e) => {
						L(n)?.errors?.length ? e(_) : L(n) && !L(n).satisfied ? e(v, 1) : L(b) && e(y, 2);
					});
					var x = F(g, 2), S = (e) => {
						var t = lS(), r = P(t, !0);
						I((e) => V(r, e), [() => J("plugin.languages", { list: L(n).languages.map((e) => e.name).join(", ") })]), B(e, t);
					};
					H(x, (e) => {
						L(n)?.languages?.length && e(S);
					}), E(i), I((e, t, o, s, l) => {
						a = W(i, 1, "plugin-row", null, a, { "plugin-broken": L(n)?.errors?.length }), V(c, e), q(f, "title", t), Ni(p, L(r)), p.disabled = o, V(m, ` ${s ?? ""}`), q(h, "title", l);
					}, [
						() => L(n)?.names?.[la()] ?? L(n)?.name ?? t,
						() => L(r) ? J("tip.plugins.on") : J("tip.plugins.off"),
						() => !!L(n)?.errors?.length,
						() => L(r) ? J("ui.on") : J("ui.off"),
						() => J("tip.plugins.remove")
					]), R("change", p, (e) => us(t, e.target.checked)), R("click", h, () => fs(t)), B(e, i);
				});
				var o = F(a, 2), s = (e) => {
					var t = PS(), n = F(N(t), 2), r = P(n, !0);
					ri(F(n, 2), 16, () => L(Yo), (e) => e, (e, t) => {
						var n = NS(), r = M(n), i = M(r), a = P(i, !0), o = F(i, 2), s = (e) => {
							var n = AS(), r = P(n);
							I(() => V(r, `v${Go[t].version ?? ""}`)), B(e, n);
						};
						H(o, (e) => {
							Go[t]?.version && e(s);
						});
						var c = F(o, 2), l = M(c);
						U(l, () => X.right, !0), E(l), E(c), E(r), E(n), I((e, t) => {
							V(a, e), q(l, "title", t);
						}, [() => Go[t]?.names?.[la()] ?? Go[t]?.name ?? t, () => J("tip.plugins.addFound")]), R("click", l, () => ms(t)), B(e, n);
					}), I((e) => V(r, e), [() => J("hint.plugins.found")]), B(e, t);
				};
				H(o, (e) => {
					L(Yo).length && e(s);
				});
				var c = F(o, 2), l = (e) => {
					var t = Hr(), n = N(t), r = (e) => {
						var t = lS(), n = P(t, !0);
						I((e) => V(n, e), [() => J("hint.plugins.autoDiscover")]), B(e, t);
					};
					H(n, (e) => {
						L(Yo).length || e(r);
					}), B(e, t);
				}, u = (e) => {
					var t = FS(), n = F(N(t), 2);
					G(n);
					var r = F(n, 2), i = P(r, !0), a = F(r, 2), o = (e) => {
						var t = jS(), n = P(t, !0);
						I(() => V(n, L(Jo))), B(e, t);
					};
					H(a, (e) => {
						L(Jo) && e(o);
					}), I((e, t, a) => {
						q(n, "placeholder", e), r.disabled = t, V(i, a);
					}, [
						() => J("ph.plugins.folder"),
						() => !L(qo).trim(),
						() => J("ui.addPlugin")
					]), R("keydown", n, (e) => e.key === "Enter" && ps()), Li(n, () => L(qo), (e) => j(qo, e)), R("click", r, ps), B(e, t);
				};
				H(c, (e) => {
					L(Zo) === "ok" ? e(l) : e(u, -1);
				}), E(t), B(e, t);
			}, x = (e) => {
				var t = bS(), n = M(t), r = (e) => {
					var t = lS(), n = P(t, !0);
					I((e) => V(n, e), [() => J("hint.history.loading")]), B(e, t);
				}, i = (e) => {
					var t = zS(), n = N(t), r = (e) => {
						var t = lS(), n = P(t, !0);
						I(() => V(n, L(gi))), B(e, t);
					};
					H(n, (e) => {
						L(gi) && e(r);
					});
					var i = F(n, 2), a = (e) => {
						var t = RS(), n = N(t), r = P(n, !0);
						ri(F(n, 2), 19, () => L(hi), (e) => e.sha, (e, t, n) => {
							var r = LS();
							let i;
							var a = M(r), o = P(a, !0), s = P(F(a, 2));
							E(r), I((e) => {
								i = W(r, 1, "history-row", null, i, { head: L(n) === 0 }), q(a, "title", L(t).sha), V(o, L(t).message), V(s, `${L(t).author ?? ""}${e ?? ""}`);
							}, [() => L(t).date ? ` · ${bi.format(new Date(L(t).date))}` : ""]), B(e, r);
						}), I((e, t) => {
							n.disabled = L(_i) || !L(T)?.allowed, q(n, "title", e), V(r, t);
						}, [() => L(T)?.allowed ? J("tip.history.revert") : J("tip.history.needsAccess"), () => J("ui.revertLast")]), R("click", n, Si), B(e, t);
					};
					H(i, (e) => {
						L(hi).length > 0 && e(a);
					}), B(e, t);
				};
				H(n, (e) => {
					L(hi) === null ? e(r) : e(i, -1);
				}), E(t), B(e, t);
			}, S = (e) => {
				var t = bS(), n = M(t), r = (e) => {
					var t = lS(), n = P(t, !0);
					I((e) => V(n, e), [() => J("update.checking")]), B(e, t);
				}, i = (e) => {
					var t = BS(), n = N(t), r = P(n, !0), i = F(n, 2), a = P(i, !0);
					I((e) => {
						V(r, L(Di)), V(a, e);
					}, [() => J("update.retry")]), R("click", i, ji), B(e, t);
				}, a = (e) => {
					var t = ZS(), n = N(t), r = M(n), i = P(r, !0), a = F(r, 2), o = (e) => {
						var t = VS(), n = N(t);
						U(n, () => X.right, !0), E(n);
						var r = P(F(n, 2), !0);
						I(() => V(r, L(Ei).target)), B(e, t);
					};
					H(a, (e) => {
						L(Ei).upToDate || e(o);
					}), E(n);
					var s = F(n, 2), c = (e) => {
						var t = lS(), n = P(t, !0);
						I((e) => V(n, e), [() => J("update.upToDate")]), B(e, t);
					}, l = (e) => {
						var t = XS(), n = N(t), r = P(n, !0), i = F(n, 2), a = (e) => {
							var t = HS(), n = M(t), r = P(n, !0), i = F(n, 2), a = P(M(i), !0);
							E(i), E(t), I((e) => {
								V(r, e), V(a, L(Ei).notes);
							}, [() => J("update.aboutVersion", { target: L(Ei).target })]), B(e, t);
						};
						H(i, (e) => {
							L(Ei).notes && e(a);
						});
						var o = F(i, 2), s = (e) => {
							var t = US(), n = M(t), r = M(n);
							U(r, () => X.warn, !0), E(r);
							var i = F(r);
							E(n);
							var a = F(n, 2), o = P(M(a), !0);
							E(a), E(t), I((e, t) => {
								q(n, "title", e), V(i, ` ${t ?? ""}`), V(o, L(Ei).headers.upstream);
							}, [() => J("update.headersManual"), () => J("update.headersTitle")]), B(e, t);
						};
						H(o, (e) => {
							L(Ei).headers?.upstream && e(s);
						});
						var c = F(o, 2);
						ri(c, 17, () => L(Ei).changes.filter((e) => e.atom && e.conflict), (e) => e.path, (e, t) => {
							var n = GS(), r = M(n), i = P(r, !0), a = F(r, 2), o = M(a), s = (e) => {
								var t = WS(), n = P(t, !0);
								I((e) => V(n, e), [() => J("update.actionDelete")]), B(e, t);
							};
							H(o, (e) => {
								L(t).action === "delete" && e(s);
							});
							var c = F(o, 2);
							U(c, () => X.warn, !0), E(c), E(a), E(n), I((e) => {
								q(r, "title", L(t).path), V(i, L(t).path), q(c, "title", e);
							}, [() => J(`update.conflict.${L(t).conflict}`)]), B(e, n);
						});
						var l = F(c, 2), u = M(l), d = P(u), f = F(u, 2);
						ri(f, 21, () => L(Ei).changes.filter((e) => e.atom && !e.conflict), (e) => e.path, (e, t) => {
							var n = KS(), r = M(n), i = P(r, !0), a = F(r, 2), o = (e) => {
								var t = WS(), n = P(t, !0);
								I((e) => V(n, e), [() => J("update.actionDelete")]), B(e, t);
							};
							H(a, (e) => {
								L(t).action === "delete" && e(o);
							}), E(n), I(() => {
								q(r, "title", L(t).path), V(i, L(t).path);
							}), B(e, n);
						}), E(f), E(l);
						var p = F(l, 2), m = (e) => {
							var t = YS(), n = N(t), r = M(n), i = P(r, !0), a = P(F(r, 2), !0);
							E(n), ri(F(n, 2), 17, () => L(Ei).changes.filter((e) => !e.atom), (e) => e.path, (e, t) => {
								var n = JS(), r = M(n);
								let i;
								var a = P(r, !0), o = F(r, 2), s = M(o), c = (e) => {
									var t = WS(), n = P(t, !0);
									I((e) => V(n, e), [() => J("update.actionDelete")]), B(e, t);
								};
								H(s, (e) => {
									L(t).action === "delete" && e(c);
								});
								var l = F(s, 2), u = (e) => {
									var n = qS();
									U(n, () => X.warn, !0), E(n), I((e) => q(n, "title", e), [() => J(`update.conflict.${L(t).conflict}`)]), B(e, n);
								};
								H(l, (e) => {
									L(t).conflict && e(u);
								});
								var d = F(l, 2);
								G(d), E(o), E(n), I((e, n, o, s) => {
									i = W(r, 1, "update-path", null, i, { skipped: e }), q(r, "title", L(t).path), V(a, L(t).path), Ni(d, n), q(d, "title", o), q(d, "aria-label", s);
								}, [
									() => L(Ai).has(L(t).path),
									() => L(Ai).has(L(t).path),
									() => J("update.keepMine.title"),
									() => J("update.keepMine")
								]), R("change", d, () => Mi(L(t).path)), B(e, n);
							}), I((e, t) => {
								V(i, e), V(a, t);
							}, [() => J("update.optionalTitle"), () => J("update.keepMine")]), B(e, t);
						}, h = /* @__PURE__ */ k(() => L(Ei).changes.some((e) => !e.atom));
						H(p, (e) => {
							L(h) && e(m);
						});
						var g = F(p, 2), _ = P(g, !0);
						I((e, t, n, i, a, o) => {
							V(r, e), q(u, "title", t), V(d, `${n ?? ""} · ${i ?? ""}`), g.disabled = L(ki) || !L(T)?.allowed, q(g, "title", a), V(_, o);
						}, [
							() => J("update.summary", {
								writes: L(Ei).changes.filter((e) => e.action === "write").length,
								deletes: L(Ei).changes.filter((e) => e.action === "delete").length
							}),
							() => J("update.atomGroup.title"),
							() => J("update.atomTitle"),
							() => L(Ei).changes.filter((e) => e.atom).length,
							() => L(T)?.allowed ? J("update.run.title") : J("tip.history.needsAccess"),
							() => J("update.run", { target: L(Ei).target })
						]), R("click", g, Pi), B(e, t);
					};
					H(s, (e) => {
						L(Ei).upToDate ? e(c) : e(l, -1);
					}), I((e) => V(i, e), [() => J("update.current", { version: L(Ei).current })]), B(e, t);
				};
				H(n, (e) => {
					L(ki) && !L(Ei) ? e(r) : L(Di) ? e(i, 1) : L(Ei) && e(a, 2);
				}), E(t), B(e, t);
			};
			H(l, (e) => {
				L(Ct) === "pages" ? e(u) : L(Ct) === "nav" ? e(d, 1) : L(Ct) === "site" ? e(f, 2) : L(Ct) === "theme" ? e(p, 3) : L(Ct) === "blocks" ? e(m, 4) : L(Ct) === "grid" ? e(g, 5) : L(Ct) === "properties" ? e(_, 6) : L(Ct) === "footer" ? e(v, 7) : L(Ct) === "collections" ? e(y, 8) : L(Ct) === "plugins" ? e(b, 9) : L(Ct) === "history" ? e(x, 10) : L(Ct) === "update" && e(S, 11);
			}), E(t), Ui(t, (e) => j(bs, e), () => L(bs)), I((e) => {
				n = W(t, 1, "panel", null, n, { hidden: !L(te) }), q(i, "title", e), V(o, Et[L(Ct)]);
			}, [() => Dt[L(Ct)]?.map((e) => J(e)).join("\n")]), B(e, t);
		};
		H(p, (e) => {
			L(Ct) && e(m);
		});
		var _ = F(p, 2);
		let v;
		var y = M(_), b = M(y);
		Ui(b, (e) => j(w, e), () => L(w)), E(y), E(_), Ui(_, (e) => j(me, e), () => L(me)), E(t), I((e, t) => {
			r = W(n, 1, "rail", null, r, { hidden: !L(te) }), l = W(s, 1, "rail-gear", null, l, { active: L(Wi) }), q(s, "title", e), v = W(_, 1, "frame-wrap", null, v, {
				mobile: L(pe) === "mobile",
				pan: L(De),
				fold: L(xe) > 0
			}), Oi(y, `width:${L(Te) ?? ""}px; height:${L(Ee) ?? ""}px`), q(b, "title", t), q(b, "src", `/?page=${L(g)}&preview=1`), Oi(b, `width:${L(be) ?? ""}px; height:${L(we) ?? ""}px; transform:scale(${L(Se) ?? ""}); transform-origin:top left`);
		}, [() => J("settings.title"), () => J("ui.previewTitle")]), R("click", s, () => j(Wi, !L(Wi))), Mr("load", b, Bi), Ar(b), B(e, t);
	}, ul = (e) => {
		var t = eC(), n = P(t, !0);
		I((e) => V(n, e), [() => J("ui.loading")]), B(e, t);
	};
	H(cl, (e) => {
		L(m) ? e(ll) : e(ul, -1);
	});
	var dl = F(cl, 2), fl = (e) => {
		uv(e, {
			get image() {
				return L(Da);
			},
			onapply: Oa,
			oncancel: () => j(Da, null)
		});
	};
	H(dl, (e) => {
		L(Da) && e(fl);
	});
	var pl = F(dl, 2), ml = (e) => {
		{
			let t = /* @__PURE__ */ k(() => L(Ut).mode === "set" ? ts(L(Lt)?.props.design).id : null), n = /* @__PURE__ */ k(() => L(O) ? Ke(L(O)) : null), r = /* @__PURE__ */ k(() => D?.data ? Ke(D.data) : null);
			Iv(e, {
				get mode() {
					return L(Ut).mode;
				},
				get current() {
					return L(t);
				},
				get site() {
					return L(n);
				},
				get page() {
					return L(r);
				},
				onpick: (e) => {
					L(Ut).mode === "add" ? lc(e) : fn(e), j(Ut, null);
				},
				onclose: () => j(Ut, null)
			});
		}
	};
	H(pl, (e) => {
		L(Ut) && e(ml);
	});
	var hl = F(pl, 2), gl = (e) => {
		var t = rC(), n = M(t), r = M(n), i = P(r, !0), a = F(r, 2);
		ri(a, 16, () => L(ot).lines, (e) => e, (e, t) => {
			var n = tC(), r = P(n, !0);
			I(() => V(r, t)), B(e, n);
		});
		var o = F(a, 2), s = (e) => {
			var t = nC();
			G(t), ft(t, !0), I(() => q(t, "placeholder", L(ot).placeholder)), R("keydown", t, (e) => e.key === "Enter" && L(ot).value.trim() && lt(!0)), Li(t, () => L(ot).value, (e) => L(ot).value = e), B(e, t);
		};
		H(o, (e) => {
			L(ot).prompt && e(s);
		});
		var c = F(o, 2), l = M(c), u = P(l, !0), d = F(l, 2), f = P(d, !0);
		E(c), E(n), E(t), I(() => {
			V(i, L(ot).title), V(u, L(ot).cancelLabel), V(f, L(ot).okLabel);
		}), R("pointerdown", t, (e) => ut = e.target === e.currentTarget), R("click", t, (e) => ut && e.target === e.currentTarget && lt(!1)), R("click", l, () => lt(!1)), R("click", d, () => lt(!0)), B(e, t);
	};
	H(hl, (e) => {
		L(ot) && e(gl);
	});
	var _l = F(hl, 2), vl = (e) => {
		var t = iC(), n = M(t), r = M(n), i = P(r, !0), a = F(r, 2), o = P(a, !0), s = F(a, 2), c = M(s), l = F(c);
		G(l), E(s);
		var u = F(s, 2), d = M(u), f = F(d);
		{
			let e = /* @__PURE__ */ k(() => J("setup.accentPick"));
			Pa(f, {
				get value() {
					return L(ht);
				},
				get label() {
					return L(e);
				},
				onchange: (e) => j(ht, e, !0)
			});
		}
		E(u);
		var p = F(u, 2), m = M(p), h = F(m);
		{
			let e = /* @__PURE__ */ k(() => J("setup.bgLabel"));
			Pa(h, {
				get value() {
					return L(gt);
				},
				get label() {
					return L(e);
				},
				onchange: (e) => j(gt, e, !0)
			});
		}
		E(p);
		var g = F(p, 2), _ = P(g, !0), v = F(g, 2), y = M(v), b = P(y, !0), x = F(y, 2), S = P(x, !0);
		E(v), E(n), E(t), I((e, t, n, r, a, s, u, f, p, h) => {
			V(i, e), V(o, t), V(c, `${n ?? ""} `), q(l, "placeholder", r), V(d, `${a ?? ""} `), V(m, `${s ?? ""} `), V(_, u), V(b, f), x.disabled = p, V(S, h);
		}, [
			() => J("setup.title"),
			() => J("setup.intro"),
			() => J("setup.nameLabel"),
			() => J("ph.setup.name"),
			() => J("setup.accentLabel"),
			() => J("setup.bgLabel"),
			() => J("setup.outro"),
			() => J("setup.skip"),
			() => !L(mt).trim(),
			() => J("setup.start")
		]), R("keydown", l, (e) => e.key === "Enter" && vt()), Li(l, () => L(mt), (e) => j(mt, e)), R("click", y, _t), R("click", x, vt), B(e, t);
	};
	H(_l, (e) => {
		L(dt) && e(vl);
	});
	var yl = F(_l, 2), bl = (e) => {
		var t = aC();
		let n;
		var r = M(t), i = P(r, !0), a = F(r, 2);
		E(t), I((e) => {
			n = W(t, 1, "toast", null, n, {
				ok: L(y) === "ok",
				error: L(y) === "error"
			}), V(i, L(v)), q(a, "title", e);
		}, [() => J("ui.close")]), R("click", a, () => x("")), B(e, t);
	};
	H(yl, (e) => {
		L(v) && e(bl);
	}), E(Kc);
	var xl = F(Kc, 2), Sl = (e) => {
		Vp(e, {
			get pos() {
				return L(Vt);
			},
			onclose: () => j(Vt, null)
		});
	};
	H(xl, (e) => {
		L(Vt) && L(Lt) && e(Sl);
	}), I(() => Xc = W(Yc, 1, "topbar", null, Xc, { hidden: !L(te) })), B(e, Gc), tt();
}
//#endregion
//#region src/main.js
Nr([
	"change",
	"click",
	"input",
	"pointerdown",
	"keydown"
]), document.documentElement.lang = await fa();
var cC = Jr(sC, { target: document.getElementById("urd-admin") });
//#endregion
export { cC as default };
